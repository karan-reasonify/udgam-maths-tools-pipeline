/* ═══ M1.S2.T3.C13.2D1 · day_dial · tool-specific part ═══════════════════════════════
   runtime (r30, SILENT: the bubble is the guide) is prepended at build. The new look: keyOnly, navDots, board, bigPad,
   nextKey, cardAnswer (the a.m. / p.m. choice keys stand in the key's corner). NO imports; only the five host hooks.
   The picture: a geared wall clock over a strip of the whole day (sky blue a.m. half, amber p.m. half, a moon on each
   midnight post, the sun on the noon post), a marker pin with its time tag, a hopper that draws each hop as a green arc.
   Runtime gap (NOTES.md): r30 cannot take Hours | Minutes AND a.m./p.m. in one answer, so the hops write the digits on the
   tag and the child answers the label with two choice keys; the full time with its label shows at the win. */

const TOOL_ID = "day_dial";
const MEDIA_ID = "M1.S2.T3.C13.2D1";
const TOOL_NAME = "Day Dial";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
/* kept for the tool object's shape (and the sidecar); nothing speaks from r30 */
const VOICE = {"rate":0.92,"pitch":1.06};

/* printed on the bubble before phase 1's teach lines only (not shown: phase 1 has steps) */
const OPENING = ["A whole day on one strip, and a clock above it. Which half of the day are you in?"];
/* the whole-tool line (not shown from r44; kept for the sidecar) */
const FINISH_LINE = "Each card in its half, and each label changed on the hop that crossed a post.";
/* printed when the child opens Free play; its LAST piece stays on the bubble */
const FREE_LINE = "Free play: hop the marker on or back, past noon and past midnight.";

/* THE START PAGE: the clock and the day strip, nothing that answers a question */
const START_HOOK = "Which half of the day are you in?";
function StartArt({ box, C, lang, tx = (v: any) => v }: any) {
  const cx = 190, cy = 170, R = 140;
  const x0 = 420, x1 = (box ? box.w : 1472) - 60, xm = (x0 + x1) / 2, sy = 150, sh = 80;
  const bw = (x1 - x0) / 24;
  return (
    <g>
      <defs>
        <clipPath id="dd-start-clock"><circle cx={cx} cy={cy} r={R} /></clipPath>
        <filter id="dd-shadow-start" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#2B2B2B" floodOpacity="0.15" />
        </filter>
        <linearGradient id="dd-am-grad-start" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#BCE4FA" />
          <stop offset="100%" stopColor="#80C4EE" />
        </linearGradient>
        <linearGradient id="dd-pm-grad-start" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FDE3B2" />
          <stop offset="100%" stopColor="#F5B650" />
        </linearGradient>
        <linearGradient id="dd-post-grad-start" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#1F2937" />
          <stop offset="50%" stopColor="#4B5563" />
          <stop offset="100%" stopColor="#1F2937" />
        </linearGradient>
      </defs>

      {/* Clock Outer Rim & Case */}
      <circle cx={cx} cy={cy} r={R + 6} fill="#2B2B2B" opacity={0.12} />
      <circle cx={cx} cy={cy} r={R} fill="#8B5A2B" stroke="#5C3A1E" strokeWidth={4} filter="url(#dd-shadow-start)" />
      <circle cx={cx} cy={cy} r={R * 0.82} fill="#FFF8E7" />
      <Skin name="wall_clock" x={cx - R} y={cy - R} w={2 * R} h={2 * R} clip="url(#dd-start-clock)" />
      
      {Array.from({ length: 12 }, (_, k) => {
        const a = ((k + 1) * 30 * Math.PI) / 180;
        return (
          <text key={k} x={cx + Math.sin(a) * R * 0.62} y={cy - Math.cos(a) * R * 0.62 + 10} textAnchor="middle" fontSize={T.label} fontWeight={700} fill="#2B2B2B" stroke="#FFF8E7" strokeWidth={5} paintOrder="stroke">{k + 1}</text>
        );
      })}
      {/* the hands stop short of the numbers, so no hand covers a numeral */}
      <line x1={cx} y1={cy} x2={cx} y2={cy - R * 0.44} stroke="#0072B2" strokeWidth={7} strokeLinecap="round" />
      <line x1={cx} y1={cy} x2={cx + R * 0.32} y2={cy} stroke="#D55E00" strokeWidth={11} strokeLinecap="round" />
      <circle cx={cx} cy={cy} r={10} fill="#2B2B2B" />
      <circle cx={cx} cy={cy} r={4} fill="#FFF8E7" />

      {/* Day Strip */}
      <g filter="url(#dd-shadow-start)">
        {Array.from({ length: 24 }, (_, k) => (
          <rect key={k} x={x0 + k * bw} y={sy} width={bw} height={sh} fill={k < 12 ? "url(#dd-am-grad-start)" : "url(#dd-pm-grad-start)"} stroke="#2B2B2B" strokeWidth={2} />
        ))}
        {/* Strip Halves Labels */}
        <text x={(x0 + xm) / 2} y={sy + sh / 2 + 12} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill="#1F3A4D">{tx("a.m.")}</text>
        <text x={(xm + x1) / 2} y={sy + sh / 2 + 12} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill="#5A3A00">{tx("p.m.")}</text>
      </g>

      {/* Midnight & Noon Posts */}
      {[x0, xm, x1].map((x, k) => (
        <rect key={k} x={x - 5} y={sy - 28} width={10} height={sh + 52} rx={4} fill="url(#dd-post-grad-start)" stroke="#111827" strokeWidth={1.5} />
      ))}

      {/* Celestial Post Icons */}
      {[x0, x1].map((x, k) => (
        <g key={k}>
          <circle cx={x} cy={sy - 52} r={32} fill="#FEF08A" opacity={0.3} />
          <circle cx={x} cy={sy - 52} r={28} fill="#F3E3A0" stroke="#B89B3C" strokeWidth={2} />
          <Skin name="moon" x={x - 28} y={sy - 80} w={56} h={56} />
        </g>
      ))}
      <g>
        <circle cx={xm} cy={sy - 52} r={36} fill="#FDE047" opacity={0.35} />
        <circle cx={xm} cy={sy - 52} r={30} fill="#F6B21B" stroke="#D97706" strokeWidth={2} />
        <Skin name="sun" x={xm - 32} y={sy - 84} w={64} h={64} />
      </g>

      {/* Post Labels */}
      <text x={x0} y={sy + sh + 56} textAnchor="start" fontSize={T.label} fontWeight={700} fill="#2B2B2B">{tx("midnight")}</text>
      <text x={xm} y={sy + sh + 56} textAnchor="middle" fontSize={T.label} fontWeight={700} fill="#2B2B2B">{tx("noon")}</text>
      <text x={x1} y={sy + sh + 56} textAnchor="end" fontSize={T.label} fontWeight={700} fill="#2B2B2B">{tx("midnight")}</text>
    </g>
  );
}

/* Hindi and Gujarati: filled in the language pass, once the English is final */
const TR: any = {
  hi: {
    "Day Dial": "दिन की घड़ी",
    "A whole day on one strip, and a clock above it. Which half of the day are you in?": "एक पट्टी पर पूरा दिन, ऊपर एक घड़ी। तुम दिन के किस आधे में हो?",
    "Free play: hop the marker on or back, past noon and past midnight.": "खुला खेल: निशान को आगे या पीछे छलाँग लगवाओ, दोपहर और आधी रात के पार।",
    "Which half of the day are you in?": "तुम दिन के किस आधे में हो?",
    "a.m.": "पूर्वाह्न",
    "p.m.": "अपराह्न",
    "Twice round in a day": "दिन में दो चक्कर",
    "Tap Hop to move the marker on by one hour.": "छलाँग दबाओ, निशान एक घंटा आगे जाएगा।",
    "Tap the Hop key under the strip.": "पट्टी के नीचे छलाँग दबाओ।",
    "Hop again and watch the hour hand move to the next number.": "फिर छलाँग दबाओ और घंटे की सुई को अगली संख्या पर जाते देखो।",
    "The Hop key moves the marker one hour.": "छलाँग निशान को एक घंटा आगे ले जाती है।",
    "Each clock time comes once before noon and once after noon, every day.": "घड़ी का हर समय रोज़ एक बार दोपहर से पहले और एक बार दोपहर के बाद आता है।",
    "You learned: the hour hand goes round twice in one day.": "तुमने सीखा: घंटे की सुई एक दिन में दो चक्कर लगाती है।",
    "Hours to noon?": "दोपहर तक घंटे?",
    "Slide the marker from midnight to noon: how many hours does it pass?": "निशान को आधी रात से दोपहर तक खिसकाओ: वह कितने घंटे पार करता है?",
    "Count the hour blocks the marker passed, one block for each hour.": "निशान ने जो घंटे के खाने पार किए, उन्हें गिनो, हर घंटे का एक खाना।",
    "Right, midnight to noon is 12 hours, one lap of the hour hand.": "सही, आधी रात से दोपहर तक 12 घंटे हैं, घंटे की सुई का एक चक्कर।",
    "hours": "घंटे",
    "laps": "चक्कर",
    "lap": "चक्कर",
    "Hours and laps?": "घंटे और चक्कर?",
    "Slide through a whole day: count its hours and the laps of the hour hand.": "पूरे दिन भर खिसकाओ: उसके घंटे और घंटे की सुई के चक्कर गिनो।",
    "Count the hour blocks of the whole strip, then the laps of the hand.": "पूरी पट्टी के घंटे के खाने गिनो, फिर सुई के चक्कर।",
    "Right, a day has 24 hours and the hour hand goes round twice.": "सही, एक दिन में 24 घंटे होते हैं और घंटे की सुई दो चक्कर लगाती है।",
    "Yes": "हाँ",
    "No": "नहीं",
    "Can the clock alone tell?": "क्या सिर्फ़ घड़ी बता सकती है?",
    "Find both sevens: can the clock alone tell you if it is morning or evening?": "दोनों सात ढूँढो: क्या सिर्फ़ घड़ी बता सकती है कि सुबह है या शाम?",
    "Look at the clock face at both places: does it change?": "दोनों जगह घड़ी का चेहरा देखो: क्या वह बदलता है?",
    "Right, the clock alone cannot tell, because seven o'clock comes twice a day.": "सही, सिर्फ़ घड़ी नहीं बता सकती, क्योंकि सात बजे दिन में दो बार आते हैं।",
    "Before noon and after noon": "दोपहर से पहले और दोपहर के बाद",
    "wake up": "जागना",
    "Waking up at 6:10 is before noon, so tap the sky blue half of the strip.": "6:10 पर जागना दोपहर से पहले है, तो पट्टी का आसमानी आधा दबाओ।",
    "Tap the sky blue half, before the sun.": "सूरज से पहले वाला आसमानी आधा दबाओ।",
    "Times from midnight to noon are a.m., and times from noon to midnight are p.m.": "आधी रात से दोपहर तक पूर्वाह्न है, और दोपहर से आधी रात तक अपराह्न।",
    "You learned: midnight to noon is a.m., and noon to midnight is p.m.": "तुमने सीखा: आधी रात से दोपहर पूर्वाह्न, दोपहर से आधी रात अपराह्न।",
    "lunch": "दिन का खाना",
    "Lunch at 1:15?": "1:15 पर दिन का खाना?",
    "A child eats lunch at 1:15: tap its half of the strip, then choose the label.": "एक बच्चा 1:15 पर दिन का खाना खाता है: पट्टी में उसका आधा छुओ, फिर लेबल चुनो।",
    "Does lunch come before noon or after noon?": "दिन का खाना दोपहर से पहले है या बाद में?",
    "Right, lunch at 1:15 is after noon, so it is 1:15 p.m.": "सही, 1:15 पर दिन का खाना दोपहर के बाद है, तो यह 1:15 अपराह्न है।",
    "shop opens": "दुकान खुली",
    "Shop at 10:30?": "10:30 पर दुकान?",
    "The shop opens at half past ten in the morning: which half, which label?": "दुकान सुबह साढ़े दस बजे खुलती है: कौन सा आधा, कौन सा लेबल?",
    "Is the morning before the sun or after it?": "सुबह सूरज से पहले है या बाद में?",
    "Right, half past ten in the morning is 10:30 a.m.": "सही, सुबह साढ़े दस बजे 10:30 पूर्वाह्न है।",
    "dinner": "रात का खाना",
    "Dinner at 8:35?": "8:35 पर रात का खाना?",
    "A family eats dinner at 8:35 in the evening: put the card in its half and pick.": "एक परिवार शाम 8:35 पर रात का खाना खाता है: कार्ड उसके आधे में रखो और चुनो।",
    "Is the evening in the sky blue half or the amber half?": "शाम आसमानी आधे में है या नारंगी आधे में?",
    "Right, dinner at 8:35 in the evening is 8:35 p.m.": "सही, शाम 8:35 पर रात का खाना 8:35 अपराह्न है।",
    "Counting past noon": "दोपहर के पार गिनना",
    "Tap Hop to move the marker on one hour, from 10:30 to 11:30.": "छलाँग दबाओ, निशान 10:30 से 11:30 पर एक घंटा आगे जाएगा।",
    "Hop once more and watch the tag as the marker passes the sun.": "एक बार फिर छलाँग दबाओ और निशान के सूरज पार करते समय पर्ची देखो।",
    "Tap Hop to cross the noon post.": "दोपहर का खंभा पार करने को छलाँग दबाओ।",
    "Past 12 noon the label turns to p.m., and back past noon it turns to a.m.": "दोपहर 12 बजे के पार लेबल अपराह्न बनता है, और पीछे पार करने पर पूर्वाह्न।",
    "You learned: crossing 12 noon turns the label to p.m., or back to a.m.": "तुमने सीखा: दोपहर 12 बजे पार करने पर लेबल अपराह्न, लौटने पर पूर्वाह्न।",
    "6 hours after 8:25?": "8:25 के 6 घंटे बाद?",
    "Hop six hours on from 8:25 a.m., then choose the label of the new time.": "8:25 पूर्वाह्न से छह घंटे आगे छलाँग लगाओ, फिर नए समय का लेबल चुनो।",
    "Which of your hops passes the sun on the noon post?": "तुम्हारी कौन सी छलाँग दोपहर के खंभे का सूरज पार करती है?",
    "Right, six hours on from 8:25 lands on 2:25 p.m.": "सही, 8:25 से छह घंटे आगे 2:25 अपराह्न आता है।",
    "3 hours after 10:50?": "10:50 के 3 घंटे बाद?",
    "Now three hours on from 10:50 a.m.: which label does the landing get?": "अब 10:50 पूर्वाह्न से तीन घंटे आगे: पहुँचने की जगह को कौन सा लेबल मिलता है?",
    "Count the hops one by one: which one passes the sun?": "छलाँगें एक-एक करके गिनो: कौन सी सूरज पार करती है?",
    "Right, three hours on from 10:50 lands on 1:50 p.m.": "सही, 10:50 से तीन घंटे आगे 1:50 अपराह्न आता है।",
    "4 hours before 2:35?": "2:35 के 4 घंटे पहले?",
    "This time hop back four hours from 2:35 p.m.: which label does it land on?": "इस बार 2:35 अपराह्न से चार घंटे पीछे छलाँग लगाओ: कौन सा लेबल आता है?",
    "Hopping back, which hop passes the sun?": "पीछे जाते हुए कौन सी छलाँग सूरज पार करती है?",
    "Right, four hours back from 2:35 lands on 10:35 a.m.": "सही, 2:35 से चार घंटे पीछे 10:35 पूर्वाह्न आता है।",
    "Just after midnight": "आधी रात के ठीक बाद",
    "Tap Hop to move the marker on one hour, from 10:20 to 11:20 at night.": "छलाँग दबाओ, निशान रात 10:20 से 11:20 पर एक घंटा आगे जाएगा।",
    "Hop once more and watch the marker pass the midnight post.": "एक बार फिर छलाँग दबाओ और निशान को आधी रात का खंभा पार करते देखो।",
    "Tap Hop to cross midnight.": "आधी रात पार करने को छलाँग दबाओ।",
    "Past 12 midnight the label turns to a.m., and a new day begins.": "रात 12 बजे के पार लेबल पूर्वाह्न बनता है, और नया दिन शुरू होता है।",
    "You learned: past 12 midnight the label is a.m., in a new day.": "तुमने सीखा: रात 12 बजे के बाद लेबल पूर्वाह्न है, नए दिन में।",
    "2 hours after 11:35?": "11:35 के 2 घंटे बाद?",
    "Hop two hours on from 11:35 p.m., then choose the label of the new time.": "11:35 अपराह्न से दो घंटे आगे छलाँग लगाओ, फिर नए समय का लेबल चुनो।",
    "Which post does the count cross?": "गिनती कौन सा खंभा पार करती है?",
    "Right, two hours on from 11:35 at night is 1:35 a.m., the next day.": "सही, रात 11:35 से दो घंटे आगे अगले दिन 1:35 पूर्वाह्न है।",
    "after noon": "दोपहर के बाद",
    "after midnight": "आधी रात के बाद",
    "12:25 a.m.?": "12:25 पूर्वाह्न?",
    "Is the time 12:25 a.m., just after noon or just after midnight?": "12:25 पूर्वाह्न दोपहर के ठीक बाद है या आधी रात के ठीक बाद?",
    "In which half of the strip are the times marked a.m.?": "पट्टी के किस आधे में पूर्वाह्न वाले समय हैं?",
    "Right, it is 25 minutes after midnight, at the start of a new day.": "सही, यह आधी रात के 25 मिनट बाद है, नए दिन की शुरुआत में।",
    "1 hour before 12:40?": "12:40 के 1 घंटा पहले?",
    "Now hop back one hour from 12:40 a.m.: which label does it land on?": "अब 12:40 पूर्वाह्न से एक घंटा पीछे छलाँग लगाओ: कौन सा लेबल आता है?",
    "Which way does this count go, and which post does it cross?": "यह गिनती किस ओर जाती है, और कौन सा खंभा पार करती है?",
    "Right, one hour back from 12:40 at night lands on 11:40 p.m.": "सही, रात 12:40 से एक घंटा पीछे 11:40 अपराह्न आता है।",
    "Hop back": "पीछे छलाँग",
    "Hop": "छलाँग",
    "Slide": "खिसकाओ",
    "Find": "ढूँढो",
    "Slide from one midnight to the next. How many times does the hour hand go round?": "एक आधी रात से अगली तक खिसकाओ। घंटे की सुई कितनी बार घूमती है?",
    "How many hours does one lap of the hour hand take?": "घंटे की सुई के एक चक्कर में कितने घंटे लगते हैं?",
    "One lap of the hour hand passes every number on the face once.": "घंटे की सुई का एक चक्कर घड़ी की हर संख्या को एक बार पार करता है।",
    "Is one seven in the sky blue half and one in the amber half?": "क्या एक सात आसमानी आधे में और एक नारंगी आधे में है?",
    "Look at the two sevens you found: is the clock face different?": "जो दो सात तुमने ढूँढे, उन्हें देखो: क्या घड़ी का चेहरा अलग है?",
    "Does this happen before noon or after noon? Put it in that half.": "यह दोपहर से पहले होता है या बाद में? इसे उसी आधे में रखो।",
    "Which half of the strip is that, before the sun or after it?": "वह पट्टी का कौन सा आधा है, सूरज से पहले या बाद?",
    "Sky blue runs from midnight to noon, and amber from noon to midnight.": "आसमानी आधी रात से दोपहर तक है, और नारंगी दोपहर से आधी रात तक।",
    "Hop one hour at a time. What happens to the label when you pass noon?": "एक-एक घंटा छलाँग लगाओ। दोपहर पार करने पर लेबल का क्या होता है?",
    "Is the marker now on the same side of the sun as where it started?": "क्या निशान अब सूरज की उसी ओर है जहाँ से शुरू हुआ था?",
    "Sky blue is before noon and amber is after noon: where did the marker land?": "आसमानी दोपहर से पहले है और नारंगी बाद में: निशान कहाँ पहुँचा?",
    "Hop past midnight and see which half of the day the new time is in.": "आधी रात के पार छलाँग लगाओ और देखो नया समय दिन के किस आधे में है।",
    "Which post did your hops cross?": "तुम्हारी छलाँगों ने कौन सा खंभा पार किया?",
    "Look at what is printed on the half the marker landed in.": "निशान जिस आधे में पहुँचा, उस पर क्या लिखा है, देखो।",
    "Which post is 25 minutes before the time 12:25 a.m.?": "12:25 पूर्वाह्न से 25 मिनट पहले कौन सा खंभा है?",
    "Look at where the strip starts: what is printed on its first half?": "देखो पट्टी कहाँ से शुरू होती है: उसके पहले आधे पर क्या लिखा है?",
    "Which half lies just before the midnight post?": "आधी रात के खंभे से ठीक पहले कौन सा आधा है?",
    "Look at the end of the strip: what is printed there?": "पट्टी के आखिर में देखो: वहाँ क्या लिखा है?",
    "midnight": "आधी रात",
    "noon": "दोपहर",
    "12 noon": "दोपहर 12 बजे",
    "12 midnight": "रात 12 बजे",
    "hops": "छलाँगें",
    "next day": "अगला दिन",
    "day before": "पिछला दिन",
    "today": "आज",
    "clock alone: No": "सिर्फ़ घड़ी: नहीं",
    "the sky blue half, before noon": "आसमानी आधा, दोपहर से पहले",
    "the amber half, after noon": "नारंगी आधा, दोपहर के बाद",
  },
  gu: {
    "Day Dial": "દિવસની ઘડિયાળ",
    "A whole day on one strip, and a clock above it. Which half of the day are you in?": "એક પટ્ટી પર આખો દિવસ, ઉપર એક ઘડિયાળ. તમે દિવસના કયા અડધા ભાગમાં છો?",
    "Free play: hop the marker on or back, past noon and past midnight.": "મુક્ત રમત: નિશાનને આગળ કે પાછળ કૂદાવો, બપોર અને મધ્યરાત્રિની પાર.",
    "Which half of the day are you in?": "તમે દિવસના કયા અડધા ભાગમાં છો?",
    "a.m.": "પૂર્વાહ્ન",
    "p.m.": "અપરાહ્ન",
    "Twice round in a day": "દિવસમાં બે ચક્કર",
    "Tap Hop to move the marker on by one hour.": "કૂદકો દબાવો, નિશાન એક કલાક આગળ જશે.",
    "Tap the Hop key under the strip.": "પટ્ટી નીચે કૂદકો દબાવો.",
    "Hop again and watch the hour hand move to the next number.": "ફરી કૂદકો દબાવો અને કલાક કાંટાને આગલા અંક પર જતો જુઓ.",
    "The Hop key moves the marker one hour.": "કૂદકો નિશાનને એક કલાક આગળ લઈ જાય છે.",
    "Each clock time comes once before noon and once after noon, every day.": "ઘડિયાળનો દરેક સમય રોજ એક વાર બપોર પહેલાં અને એક વાર બપોર પછી આવે છે.",
    "You learned: the hour hand goes round twice in one day.": "તમે શીખ્યા: કલાક કાંટો એક દિવસમાં બે ચક્કર લગાવે છે.",
    "Hours to noon?": "બપોર સુધી કલાક?",
    "Slide the marker from midnight to noon: how many hours does it pass?": "નિશાનને મધ્યરાત્રિથી બપોર સુધી સરકાવો: તે કેટલા કલાક પાર કરે છે?",
    "Count the hour blocks the marker passed, one block for each hour.": "નિશાને પાર કરેલાં કલાકનાં ખાનાં ગણો, દરેક કલાકનું એક ખાનું.",
    "Right, midnight to noon is 12 hours, one lap of the hour hand.": "સાચું, મધ્યરાત્રિથી બપોર સુધી 12 કલાક છે, કલાક કાંટાનો એક ચક્કર.",
    "hours": "કલાક",
    "laps": "ચક્કર",
    "lap": "ચક્કર",
    "Hours and laps?": "કલાક અને ચક્કર?",
    "Slide through a whole day: count its hours and the laps of the hour hand.": "આખા દિવસમાં સરકાવો: તેના કલાક અને કલાક કાંટાના ચક્કર ગણો.",
    "Count the hour blocks of the whole strip, then the laps of the hand.": "આખી પટ્ટીનાં કલાકનાં ખાનાં ગણો, પછી કાંટાના ચક્કર.",
    "Right, a day has 24 hours and the hour hand goes round twice.": "સાચું, એક દિવસમાં 24 કલાક હોય છે અને કલાક કાંટો બે ચક્કર લગાવે છે.",
    "Yes": "હા",
    "No": "ના",
    "Can the clock alone tell?": "શું ફક્ત ઘડિયાળ કહી શકે?",
    "Find both sevens: can the clock alone tell you if it is morning or evening?": "બંને સાત શોધો: શું ફક્ત ઘડિયાળ કહી શકે કે સવાર છે કે સાંજ?",
    "Look at the clock face at both places: does it change?": "બંને જગ્યાએ ઘડિયાળનો ચહેરો જુઓ: શું તે બદલાય છે?",
    "Right, the clock alone cannot tell, because seven o'clock comes twice a day.": "સાચું, ફક્ત ઘડિયાળ કહી ન શકે, કારણ કે સાત વાગ્યા દિવસમાં બે વાર આવે છે.",
    "Before noon and after noon": "બપોર પહેલાં અને બપોર પછી",
    "wake up": "ઊઠવું",
    "Waking up at 6:10 is before noon, so tap the sky blue half of the strip.": "6:10 એ ઊઠવું બપોર પહેલાં છે, તો પટ્ટીનો આસમાની અડધો ભાગ દબાવો.",
    "Tap the sky blue half, before the sun.": "સૂરજ પહેલાંનો આસમાની ભાગ દબાવો.",
    "Times from midnight to noon are a.m., and times from noon to midnight are p.m.": "મધ્યરાત્રિથી બપોર સુધી પૂર્વાહ્ન છે, અને બપોરથી મધ્યરાત્રિ સુધી અપરાહ્ન.",
    "You learned: midnight to noon is a.m., and noon to midnight is p.m.": "તમે શીખ્યા: મધ્યરાત્રિથી બપોર પૂર્વાહ્ન, બપોરથી મધ્યરાત્રિ અપરાહ્ન.",
    "lunch": "બપોરનું જમણ",
    "Lunch at 1:15?": "1:15 એ બપોરનું જમણ?",
    "A child eats lunch at 1:15: tap its half of the strip, then choose the label.": "એક બાળક 1:15 એ બપોરે જમે છે: પટ્ટીમાં તેનો ભાગ દબાવો, પછી લેબલ પસંદ કરો.",
    "Does lunch come before noon or after noon?": "બપોરનું જમણ બપોર પહેલાં આવે કે પછી?",
    "Right, lunch at 1:15 is after noon, so it is 1:15 p.m.": "સાચું, 1:15 નું જમણ બપોર પછી છે, તો તે 1:15 અપરાહ્ન છે.",
    "shop opens": "દુકાન ખૂલે",
    "Shop at 10:30?": "10:30 એ દુકાન?",
    "The shop opens at half past ten in the morning: which half, which label?": "દુકાન સવારે સાડા દસે ખૂલે છે: કયો ભાગ, કયું લેબલ?",
    "Is the morning before the sun or after it?": "સવાર સૂરજ પહેલાં છે કે પછી?",
    "Right, half past ten in the morning is 10:30 a.m.": "સાચું, સવારે સાડા દસ એટલે 10:30 પૂર્વાહ્ન.",
    "dinner": "રાતનું જમણ",
    "Dinner at 8:35?": "8:35 એ રાતનું જમણ?",
    "A family eats dinner at 8:35 in the evening: put the card in its half and pick.": "એક કુટુંબ સાંજે 8:35 એ જમે છે: કાર્ડ તેના ભાગમાં મૂકો અને પસંદ કરો.",
    "Is the evening in the sky blue half or the amber half?": "સાંજ આસમાની ભાગમાં છે કે નારંગી ભાગમાં?",
    "Right, dinner at 8:35 in the evening is 8:35 p.m.": "સાચું, સાંજે 8:35 નું જમણ 8:35 અપરાહ્ન છે.",
    "Counting past noon": "બપોરની પાર ગણવું",
    "Tap Hop to move the marker on one hour, from 10:30 to 11:30.": "કૂદકો દબાવો, નિશાન 10:30 થી 11:30 એક કલાક આગળ જશે.",
    "Hop once more and watch the tag as the marker passes the sun.": "ફરી કૂદકો દબાવો અને નિશાન સૂરજ પાર કરે ત્યારે ચિઠ્ઠી જુઓ.",
    "Tap Hop to cross the noon post.": "બપોરનો થાંભલો પાર કરવા કૂદકો દબાવો.",
    "Past 12 noon the label turns to p.m., and back past noon it turns to a.m.": "બપોરે 12 પછી લેબલ અપરાહ્ન બને છે, અને પાછળ પાર કરતાં પૂર્વાહ્ન.",
    "You learned: crossing 12 noon turns the label to p.m., or back to a.m.": "તમે શીખ્યા: બપોરે 12 પાર કરતાં લેબલ અપરાહ્ન, પાછા ફરતાં પૂર્વાહ્ન.",
    "6 hours after 8:25?": "8:25 પછી 6 કલાક?",
    "Hop six hours on from 8:25 a.m., then choose the label of the new time.": "8:25 પૂર્વાહ્નથી છ કલાક આગળ કૂદો, પછી નવા સમયનું લેબલ પસંદ કરો.",
    "Which of your hops passes the sun on the noon post?": "તમારો કયો કૂદકો બપોરના થાંભલાનો સૂરજ પાર કરે છે?",
    "Right, six hours on from 8:25 lands on 2:25 p.m.": "સાચું, 8:25 થી છ કલાક આગળ 2:25 અપરાહ્ન આવે છે.",
    "3 hours after 10:50?": "10:50 પછી 3 કલાક?",
    "Now three hours on from 10:50 a.m.: which label does the landing get?": "હવે 10:50 પૂર્વાહ્નથી ત્રણ કલાક આગળ: પહોંચેલી જગ્યાને કયું લેબલ મળે?",
    "Count the hops one by one: which one passes the sun?": "કૂદકા એક-એક કરીને ગણો: કયો સૂરજ પાર કરે છે?",
    "Right, three hours on from 10:50 lands on 1:50 p.m.": "સાચું, 10:50 થી ત્રણ કલાક આગળ 1:50 અપરાહ્ન આવે છે.",
    "4 hours before 2:35?": "2:35 પહેલાં 4 કલાક?",
    "This time hop back four hours from 2:35 p.m.: which label does it land on?": "આ વખતે 2:35 અપરાહ્નથી ચાર કલાક પાછળ કૂદો: કયું લેબલ આવે છે?",
    "Hopping back, which hop passes the sun?": "પાછળ જતાં કયો કૂદકો સૂરજ પાર કરે છે?",
    "Right, four hours back from 2:35 lands on 10:35 a.m.": "સાચું, 2:35 થી ચાર કલાક પાછળ 10:35 પૂર્વાહ્ન આવે છે.",
    "Just after midnight": "મધ્યરાત્રિ પછી તરત",
    "Tap Hop to move the marker on one hour, from 10:20 to 11:20 at night.": "કૂદકો દબાવો, નિશાન રાત્રે 10:20 થી 11:20 એક કલાક આગળ જશે.",
    "Hop once more and watch the marker pass the midnight post.": "ફરી કૂદકો દબાવો અને નિશાનને મધ્યરાત્રિનો થાંભલો પાર કરતું જુઓ.",
    "Tap Hop to cross midnight.": "મધ્યરાત્રિ પાર કરવા કૂદકો દબાવો.",
    "Past 12 midnight the label turns to a.m., and a new day begins.": "રાત્રે 12 પછી લેબલ પૂર્વાહ્ન બને છે, અને નવો દિવસ શરૂ થાય છે.",
    "You learned: past 12 midnight the label is a.m., in a new day.": "તમે શીખ્યા: રાત્રે 12 પછી લેબલ પૂર્વાહ્ન છે, નવા દિવસમાં.",
    "2 hours after 11:35?": "11:35 પછી 2 કલાક?",
    "Hop two hours on from 11:35 p.m., then choose the label of the new time.": "11:35 અપરાહ્નથી બે કલાક આગળ કૂદો, પછી નવા સમયનું લેબલ પસંદ કરો.",
    "Which post does the count cross?": "ગણતરી કયો થાંભલો પાર કરે છે?",
    "Right, two hours on from 11:35 at night is 1:35 a.m., the next day.": "સાચું, રાત્રે 11:35 થી બે કલાક આગળ બીજા દિવસે 1:35 પૂર્વાહ્ન છે.",
    "after noon": "બપોર પછી",
    "after midnight": "મધ્યરાત્રિ પછી",
    "12:25 a.m.?": "12:25 પૂર્વાહ્ન?",
    "Is the time 12:25 a.m., just after noon or just after midnight?": "12:25 પૂર્વાહ્ન બપોર પછી તરત છે કે મધ્યરાત્રિ પછી તરત?",
    "In which half of the strip are the times marked a.m.?": "પટ્ટીના કયા ભાગમાં પૂર્વાહ્નના સમય છે?",
    "Right, it is 25 minutes after midnight, at the start of a new day.": "સાચું, આ મધ્યરાત્રિ પછી 25 મિનિટ છે, નવા દિવસની શરૂઆતમાં.",
    "1 hour before 12:40?": "12:40 પહેલાં 1 કલાક?",
    "Now hop back one hour from 12:40 a.m.: which label does it land on?": "હવે 12:40 પૂર્વાહ્નથી એક કલાક પાછળ કૂદો: કયું લેબલ આવે છે?",
    "Which way does this count go, and which post does it cross?": "આ ગણતરી કઈ તરફ જાય છે, અને કયો થાંભલો પાર કરે છે?",
    "Right, one hour back from 12:40 at night lands on 11:40 p.m.": "સાચું, રાત્રે 12:40 થી એક કલાક પાછળ 11:40 અપરાહ્ન આવે છે.",
    "Hop back": "પાછળ કૂદકો",
    "Hop": "કૂદકો",
    "Slide": "સરકાવો",
    "Find": "શોધો",
    "Slide from one midnight to the next. How many times does the hour hand go round?": "એક મધ્યરાત્રિથી બીજી સુધી સરકાવો. કલાક કાંટો કેટલી વાર ફરે છે?",
    "How many hours does one lap of the hour hand take?": "કલાક કાંટાના એક ચક્કરમાં કેટલા કલાક લાગે છે?",
    "One lap of the hour hand passes every number on the face once.": "કલાક કાંટાનો એક ચક્કર ઘડિયાળના દરેક અંકને એક વાર પાર કરે છે.",
    "Is one seven in the sky blue half and one in the amber half?": "શું એક સાત આસમાની ભાગમાં અને એક નારંગી ભાગમાં છે?",
    "Look at the two sevens you found: is the clock face different?": "તમે શોધેલા બે સાત જુઓ: શું ઘડિયાળનો ચહેરો જુદો છે?",
    "Does this happen before noon or after noon? Put it in that half.": "આ બપોર પહેલાં થાય છે કે પછી? તેને તે જ ભાગમાં મૂકો.",
    "Which half of the strip is that, before the sun or after it?": "તે પટ્ટીનો કયો ભાગ છે, સૂરજ પહેલાં કે પછી?",
    "Sky blue runs from midnight to noon, and amber from noon to midnight.": "આસમાની મધ્યરાત્રિથી બપોર સુધી છે, અને નારંગી બપોરથી મધ્યરાત્રિ સુધી.",
    "Hop one hour at a time. What happens to the label when you pass noon?": "એક-એક કલાક કૂદો. બપોર પાર કરતાં લેબલનું શું થાય છે?",
    "Is the marker now on the same side of the sun as where it started?": "શું નિશાન હવે સૂરજની એ જ બાજુ છે જ્યાંથી શરૂ થયું હતું?",
    "Sky blue is before noon and amber is after noon: where did the marker land?": "આસમાની બપોર પહેલાં અને નારંગી પછી છે: નિશાન ક્યાં પહોંચ્યું?",
    "Hop past midnight and see which half of the day the new time is in.": "મધ્યરાત્રિની પાર કૂદો અને જુઓ નવો સમય દિવસના કયા ભાગમાં છે.",
    "Which post did your hops cross?": "તમારા કૂદકાએ કયો થાંભલો પાર કર્યો?",
    "Look at what is printed on the half the marker landed in.": "નિશાન જે ભાગમાં પહોંચ્યું, તેના પર શું લખ્યું છે તે જુઓ.",
    "Which post is 25 minutes before the time 12:25 a.m.?": "12:25 પૂર્વાહ્નથી 25 મિનિટ પહેલાં કયો થાંભલો છે?",
    "Look at where the strip starts: what is printed on its first half?": "જુઓ પટ્ટી ક્યાંથી શરૂ થાય છે: તેના પહેલા ભાગ પર શું લખ્યું છે?",
    "Which half lies just before the midnight post?": "મધ્યરાત્રિના થાંભલા પહેલાં તરત કયો ભાગ છે?",
    "Look at the end of the strip: what is printed there?": "પટ્ટીના છેડે જુઓ: ત્યાં શું લખ્યું છે?",
    "midnight": "મધ્યરાત્રિ",
    "noon": "બપોર",
    "12 noon": "બપોરે 12",
    "12 midnight": "રાત્રે 12",
    "hops": "કૂદકા",
    "next day": "બીજો દિવસ",
    "day before": "આગલો દિવસ",
    "today": "આજે",
    "clock alone: No": "ફક્ત ઘડિયાળ: ના",
    "the sky blue half, before noon": "આસમાની ભાગ, બપોર પહેલાં",
    "the amber half, after noon": "નારંગી ભાગ, બપોર પછી",
  },
};

/* the choice keys (ids appear in no printed line) */
const DD_AMPM = [{ id: "lab-am", label: "a.m." }, { id: "lab-pm", label: "p.m." }];

/* One entry per phase = one mount. `warm` is the board the guide steps work on (never a question's own item).
   Item fields of this tool: kind (slide | find | card | hop | read), goal (slide: minutes to reach), t (card: its true time,
   minutes after midnight), word (card), start + hops (hop: minutes, signed whole hours), win (the one-sentence win line). */
const PHASES = [
  {
    n: 1,
    concept: "Twice round in a day",
    conceptId: "M1.S2.T3.C10", objectiveIds: ["O3"],
    says: ["Slide from one midnight to the next. How many times does the hour hand go round?"],
    warm: { kind: "slide", warm: true, t0: 0 },
    steps: [
      { say: "Tap Hop to move the marker on by one hour.", on: "hop", hint: "Tap the Hop key under the strip." },
      { say: "Hop again and watch the hour hand move to the next number.", on: "hop", hint: "The Hop key moves the marker one hour." },
    ],
    ladder: ["How many hours does one lap of the hour hand take?", "One lap of the hour hand passes every number on the face once."],
    closing: "Each clock time comes once before noon and once after noon, every day.",
    learned: "You learned: the hour hand goes round twice in one day.",
    traceback: "The marker slides again hour by hour, the hour hand turning, and the hours and laps are written in a green chip.",
    items: [
      /* authored: the plan has two questions for this concept; this one tests one lap = one half of the day */
      { qid: null, kind: "slide", goal: 720, answer: 12, ask: "Hours to noon?",
        say: "Slide the marker from midnight to noon: how many hours does it pass?",
        miss: "Count the hour blocks the marker passed, one block for each hour.",
        win: "Right, midnight to noon is 12 hours, one lap of the hour hand.", winMs: 4600 },
      /* practice 1: answer in the plan = Twenty-four hours, and the hour hand goes round twice */
      { qid: "M1.S2.T3.C10:1", kind: "slide", goal: 1440, parts: [{ label: "hours" }, { label: "laps" }], answer: [24, 2], ask: "Hours and laps?",
        say: "Slide through a whole day: count its hours and the laps of the hour hand.",
        miss: "Count the hour blocks of the whole strip, then the laps of the hand.",
        win: "Right, a day has 24 hours and the hour hand goes round twice.", winMs: 4500 },
      /* learn ML1: answer in the plan = No. The hour hand goes round twice a day, so the clock shows seven o'clock once in the morning and once in the evening */
      { qid: "M1.S2.T3.C10:ML1", kind: "find", choices: [{ id: "ans-yes", label: "Yes" }, { id: "ans-no", label: "No" }], answer: "ans-no", ask: "Can the clock alone tell?",
        say: "Find both sevens: can the clock alone tell you if it is morning or evening?",
        miss: "Look at the clock face at both places: does it change?",
        ladder: ["Is one seven in the sky blue half and one in the amber half?", "Look at the two sevens you found: is the clock face different?"],
        win: "Right, the clock alone cannot tell, because seven o'clock comes twice a day." },
    ],
  },
  {
    n: 2,
    concept: "Before noon and after noon",
    conceptId: "M1.S2.T3.C11", objectiveIds: ["O3"],
    says: ["Does this happen before noon or after noon? Put it in that half."],
    warm: { kind: "card", warm: true, word: "wake up", t: 370 },
    steps: [
      { say: "Waking up at 6:10 is before noon, so tap the sky blue half of the strip.", on: "half-am", hint: "Tap the sky blue half, before the sun." },
    ],
    ladder: ["Which half of the strip is that, before the sun or after it?", "Sky blue runs from midnight to noon, and amber from noon to midnight."],
    closing: "Times from midnight to noon are a.m., and times from noon to midnight are p.m.",
    learned: "You learned: midnight to noon is a.m., and noon to midnight is p.m.",
    traceback: "The card's own time lights in its true half with its label, beside where the child put it.",
    items: [
      /* learn ML2: answer in the plan = 6:10 a.m. and 1:15 p.m. (the 6:10 wake-up is the guide steps' warm-up; this item asks the lunch) */
      { qid: "M1.S2.T3.C11:ML2", kind: "card", word: "lunch", t: 795, choices: DD_AMPM, answer: "lab-pm", ask: "Lunch at 1:15?",
        say: "A child eats lunch at 1:15: tap its half of the strip, then choose the label.",
        miss: "Does lunch come before noon or after noon?",
        win: "Right, lunch at 1:15 is after noon, so it is 1:15 p.m.", winMs: 4100 },
      /* practice 2: answer in the plan = 10:30 a.m. */
      { qid: "M1.S2.T3.C11:2", kind: "card", word: "shop opens", t: 630, choices: DD_AMPM, answer: "lab-am", ask: "Shop at 10:30?",
        say: "The shop opens at half past ten in the morning: which half, which label?",
        miss: "Is the morning before the sun or after it?",
        win: "Right, half past ten in the morning is 10:30 a.m.", winMs: 3800 },
      /* practice 3: answer in the plan = 8:35 p.m. */
      { qid: "M1.S2.T3.C11:3", kind: "card", word: "dinner", t: 1235, choices: DD_AMPM, answer: "lab-pm", ask: "Dinner at 8:35?",
        say: "A family eats dinner at 8:35 in the evening: put the card in its half and pick.",
        miss: "Is the evening in the sky blue half or the amber half?",
        win: "Right, dinner at 8:35 in the evening is 8:35 p.m." },
    ],
  },
  {
    n: 3,
    concept: "Counting past noon",
    conceptId: "M1.S2.T3.C12", objectiveIds: ["O4"],
    says: ["Hop one hour at a time. What happens to the label when you pass noon?"],
    warm: { kind: "hop", warm: true, start: 630, hops: 2 },
    steps: [
      { say: "Tap Hop to move the marker on one hour, from 10:30 to 11:30.", on: "hop", hint: "Tap the Hop key under the strip." },
      { say: "Hop once more and watch the tag as the marker passes the sun.", on: "hop", hint: "Tap Hop to cross the noon post." },
    ],
    ladder: ["Is the marker now on the same side of the sun as where it started?", "Sky blue is before noon and amber is after noon: where did the marker land?"],
    closing: "Past 12 noon the label turns to p.m., and back past noon it turns to a.m.",
    learned: "You learned: crossing 12 noon turns the label to p.m., or back to a.m.",
    traceback: "The hops run again one at a time, the noon post lights as one crosses it, and the landing tag shows the time with its label; a pale pin shows the child's label.",
    items: [
      /* learn ML3: answer in the plan = 2:25 p.m. */
      { qid: "M1.S2.T3.C12:ML3", kind: "hop", start: 505, hops: 6, choices: DD_AMPM, answer: "lab-pm", ask: "6 hours after 8:25?",
        say: "Hop six hours on from 8:25 a.m., then choose the label of the new time.",
        miss: "Which of your hops passes the sun on the noon post?",
        win: "Right, six hours on from 8:25 lands on 2:25 p.m.", winMs: 3700 },
      /* practice 4: answer in the plan = 1:50 p.m., because the count passes 12 noon */
      { qid: "M1.S2.T3.C12:4", kind: "hop", start: 650, hops: 3, choices: DD_AMPM, answer: "lab-pm", ask: "3 hours after 10:50?",
        say: "Now three hours on from 10:50 a.m.: which label does the landing get?",
        miss: "Count the hops one by one: which one passes the sun?",
        win: "Right, three hours on from 10:50 lands on 1:50 p.m.", winMs: 3900 },
      /* practice 5: answer in the plan = 10:35 a.m., because counting back past 12 noon changes p.m. to a.m. */
      { qid: "M1.S2.T3.C12:5", kind: "hop", start: 875, hops: -4, choices: DD_AMPM, answer: "lab-am", ask: "4 hours before 2:35?",
        say: "This time hop back four hours from 2:35 p.m.: which label does it land on?",
        miss: "Hopping back, which hop passes the sun?",
        win: "Right, four hours back from 2:35 lands on 10:35 a.m." },
    ],
  },
  {
    n: 4,
    concept: "Just after midnight",
    conceptId: "M1.S2.T3.C13", objectiveIds: ["O4"],
    says: ["Hop past midnight and see which half of the day the new time is in."],
    warm: { kind: "hop", warm: true, start: 1340, hops: 2 },
    steps: [
      { say: "Tap Hop to move the marker on one hour, from 10:20 to 11:20 at night.", on: "hop", hint: "Tap the Hop key under the strip." },
      { say: "Hop once more and watch the marker pass the midnight post.", on: "hop", hint: "Tap Hop to cross midnight." },
    ],
    ladder: ["Which post did your hops cross?", "Look at what is printed on the half the marker landed in."],
    closing: "Past 12 midnight the label turns to a.m., and a new day begins.",
    learned: "You learned: past 12 midnight the label is a.m., in a new day.",
    traceback: "The hops run again, the midnight post lights as one crosses it and the day changes, and the landing tag shows the time with its label; a pale pin shows the child's label.",
    items: [
      /* learn ML4: answer in the plan = 1:35 a.m. on the next day */
      { qid: "M1.S2.T3.C13:ML4", kind: "hop", start: 1415, hops: 2, choices: DD_AMPM, answer: "lab-am", ask: "2 hours after 11:35?",
        say: "Hop two hours on from 11:35 p.m., then choose the label of the new time.",
        miss: "Which post does the count cross?",
        win: "Right, two hours on from 11:35 at night is 1:35 a.m., the next day.", winMs: 4900 },
      /* practice 6: answer in the plan = Just after midnight. It is twenty-five minutes into a new day (no act: ungated) */
      { qid: "M1.S2.T3.C13:6", kind: "read", choices: [{ id: "lab-noon", label: "after noon" }, { id: "lab-mid", label: "after midnight" }], answer: "lab-mid", ask: "12:25 a.m.?",
        say: "Is the time 12:25 a.m., just after noon or just after midnight?",
        miss: "In which half of the strip are the times marked a.m.?",
        ladder: ["Which post is 25 minutes before the time 12:25 a.m.?", "Look at where the strip starts: what is printed on its first half?"],
        win: "Right, it is 25 minutes after midnight, at the start of a new day.", winMs: 4800 },
      /* practice 8: answer in the plan = 11:40 p.m. on the day before, because counting back past midnight changes a.m. to p.m. */
      { qid: "M1.S2.T3.C13:8", kind: "hop", start: 40, hops: -1, choices: DD_AMPM, answer: "lab-pm", ask: "1 hour before 12:40?",
        say: "Now hop back one hour from 12:40 a.m.: which label does it land on?",
        miss: "Which way does this count go, and which post does it cross?",
        ladder: ["Which half lies just before the midnight post?", "Look at the end of the strip: what is printed there?"],
        win: "Right, one hour back from 12:40 at night lands on 11:40 p.m." },
    ],
  },
];

/* The numbers the working area needs (they go into the sidecar too). */
const MODEL = {
  dayMinutes: 1440, halfMinutes: 720, hourMinutes: 60, blocks: 24,
  colours: { am: "#9BD3F2", pm: "#F5C26B", hop: "#009E73", hourHand: "#D55E00", minuteHand: "#0072B2", post: "#2B2B2B" },
  unused: ["M1.S2.T3.C12:7"],
  /* the answer gate (PATTERNS §20): the act each question waits for before its Answer key and keys are live (user mode, after a real touch) */
  answerGate: "P1 Q1 Slide to noon, Q2 Slide twice to the next midnight, Q3 Find both sevens; P2 every question: tap a half of the strip (the card is carried there); P3 every question: every hop (6, 3, 4 back); P4 Q1 two hops, Q3 one hop back; P4 Q2 (12:25 a.m., a reading) is ungated.",
};

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* judge: is this value right for this item? */
const judge = (item: any, v: any) => {
  if (item.parts) return judgeSlotParts(item, v);
  if (typeof item.answer === "number") return leadNumber(v) === item.answer;
  return String(v).trim().toLowerCase() === String(item.answer).trim().toLowerCase();
};
/* oracle: every answer re-derived by plain arithmetic on the item's own numbers */
const oracle = () => PHASES.every((p: any) => p.items.every((it: any) => {
  if (it.kind === "slide") return it.goal === 720 ? it.answer === 720 / 60 : it.answer[0] === 24 * 60 / 60 && it.answer[1] === 1440 / 720;
  if (it.kind === "find") return (7 * 60) % 720 === (19 * 60) % 720 && it.answer === "ans-no";
  if (it.kind === "card") return it.answer === (it.t >= 720 ? "lab-pm" : "lab-am");
  if (it.kind === "hop") { let m = (it.start + it.hops * 60) % 1440; if (m < 0) m += 1440; return it.answer === (m >= 720 ? "lab-pm" : "lab-am"); }
  if (it.kind === "read") return it.answer === (12 * 60 + 25 - 720 < 720 ? "lab-mid" : "lab-noon");
  return false;
}));
/* the most likely wrong answer (the misconception); judge must reject it */
const DD_OTHER: any = { "lab-am": "lab-pm", "lab-pm": "lab-am", "lab-noon": "lab-mid", "lab-mid": "lab-noon", "ans-yes": "ans-no", "ans-no": "ans-yes" };
const nearMiss = (item: any) => (item.choices ? DD_OTHER[item.answer]
  : item.parts ? item.answer[0] + "|1" : typeof item.answer === "number" ? 1 : "~");
/* the forms of an answer that no question, hint or ladder line may print */
const answerForms = (item: any) => (item.choices ? [String(item.answer)].concat(item.answer === "lab-am" ? ["a.m."] : item.answer === "lab-pm" ? ["p.m."] : [])
  : item.parts ? item.answer.filter((x: number) => x >= 10).flatMap((x: number) => [String(x), indian(x), words(x)])
  : typeof item.answer === "number" ? [String(item.answer), indian(item.answer), words(item.answer)] : [String(item.answer)]);
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => item.answer;

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => (T.state().stage === "demo" ? HOOK.demo && HOOK.demo() : T.submit(item.answer));
const answer = (item: any, v: any) => (item.pad === "enter" && HOOK.set ? HOOK.set(v) : undefined);
/* the agent's check(): performs the question's act at once (so AI mode is never gated); undefined in the demo stage */
const check = () => (HOOK.check ? HOOK.check() : undefined);

/* ── helpers of this tool (dd*: never a runtime name) ── */
const DD_AM = "#9BD3F2", DD_PM = "#F5C26B", DD_INK = "#2B2B2B", DD_HOP = "#009E73", DD_HOUR = "#D55E00", DD_MIN = "#0072B2";
const ddPos = (t: number) => ((t % 1440) + 1440) % 1440;
const ddClock = (t: number) => { const p = ddPos(t); const h = Math.floor(p / 60) % 12; return (h === 0 ? 12 : h) + ":" + String(p % 60).padStart(2, "0"); };
const ddHalf = (t: number) => (ddPos(t) < 720 ? "a.m." : "p.m.");
/* the strip's geometry, from the room the working area has */
const ddGeo = (box: any, oy = 0) => {
  const w = box ? box.w : 1086;
  /* the clock stands at the left at one size and place (open or shut); the strip takes the room to its right, under the key's corner
     (y 0 to 88); the tag lane sits above the sun and the moons, the post labels clear below the posts' feet */
  const x0 = 400, x1 = w - 64;
  return { w, x0, x1, xm: (x0 + x1) / 2, sy: 292 + oy, sh: 70, cx: 168, cy: 222 + oy, R: 150, ty: 156 + oy, th: 64, ky: 440, ly: 422 + oy, tl: 342 };
};
/* a time's place on the strip: p is minutes after the left-hand midnight post, 0 to 1440 */
const ddX = (g: any, p: number) => g.x0 + (p / 1440) * (g.x1 - g.x0);
/* a hop's lift (the arc's control height; the marker peaks at half of it): higher when it jumps over the noon post
   (a midnight crossing is two legs that each end or start on an edge post, so only noon can lie inside one) */
const ddLift = (pa: number, pb: number) => (Math.min(pa, pb) < 720 && Math.max(pa, pb) > 720 ? 190 : 132);
/* the strip segments of one hop from a to b (minutes): two across midnight (to the edge post, then in from the other end) */
const ddSegs = (a: number, b: number, edge?: boolean): number[][] => {
  if (edge) return [[Math.min(1440, a), Math.min(1440, b)]];
  if (Math.floor(a / 1440) === Math.floor(b / 1440)) return [[ddPos(a), ddPos(b)]];
  return b > a ? [[ddPos(a), 1440], [0, ddPos(b)]] : [[ddPos(a), 0], [1440, ddPos(b)]];
};
/* a width estimate that counts Devanagari / Gujarati spacing signs and skips the zero-advance marks (PATTERNS §18) */
const ddTextW = (s: string, size: number) => {
  let em = 0;
  for (const ch of String(s)) {
    const c = ch.codePointAt(0) || 0;
    const zero = (c >= 0x900 && c <= 0x902) || c === 0x93c || (c >= 0x941 && c <= 0x948) || c === 0x94d || (c >= 0x951 && c <= 0x957) || (c >= 0x962 && c <= 0x963)
      || (c >= 0xa81 && c <= 0xa82) || c === 0xabc || (c >= 0xac1 && c <= 0xac8) || c === 0xacd || (c >= 0xae2 && c <= 0xae3);
    em += zero ? 0 : c >= 0x900 && c <= 0xaff ? 0.62 : ch === " " ? 0.3 : 0.58;
  }
  return em * size;
};

function Work({ phase, n, item, index, stage, wrong, typed, api, MODEL, step, stepOn, box, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();
  const mv = useTimeline();
  /* which board is up: the warm-up during the guide steps (and the one "teach" frame before them), else the question */
  const warmUp = (stage === "demo" || stage === "teach") && phase.warm;
  const it: any = stage === "free" ? { kind: "free" } : warmUp ? phase.warm : item;
  const k = it.kind;
  /* a board with no key at its foot (the cards, the reading) sits lower, so it fills the area */
  const g = ddGeo(box, k === "card" || k === "read" ? 40 : 0);
  const kx = box && box.key ? box.key.x - 12 : g.w;
  const midY = g.sy + g.sh / 2;
  const qk = stage === "free" ? "free" : warmUp ? n + ".warm" : n + "." + index;
  /* the board is keyed to the ENTRY (PATTERNS §18): a question entered again opens fresh */
  const entry = useRef({ qk: "", n: 0 });
  if (entry.current.qk !== qk) entry.current = { qk, n: entry.current.n + 1 };
  const ek = entry.current.n;
  const fresh = () => ({
    ek,
    t: k === "slide" ? (it.t0 || 0) : k === "find" ? 420 : k === "hop" ? it.start : k === "free" ? 480 : null,
    done: 0, arcs: [] as any[], lit: null as any, found: 0, placed: null as any, touched: false, fix: null as any, fly: null as any,
  });
  const [raw, setRaw] = useState<any>(null);
  const S = raw && raw.ek === ek ? raw : fresh();
  const put = (f: any) => setRaw((p: any) => {
    const base = p && p.ek === ek ? p : fresh();
    return { ...base, ...(typeof f === "function" ? f(base) : f) };
  });
  const playing = useRef(false);
  const lastKey = useRef(0);
  const fixing = useRef(false);
  const refocus = useRef<any>(null);
  /* a real touch in this mount (a tap on a key or a piece, or a physical Enter / Space on a guide step) arms the answer gate
     for every later question (PATTERNS §20); the agent's toolApi.check() makes no key event, so AI mode stays ungated */
  const everTouched = useRef(false);
  useEffect(() => {
    if (stage !== "demo" || typeof window === "undefined") return;
    /* only a key on the board counts: Enter with nothing focused, or on one of this tool's own controls (never the header's Hint,
       sound or restart, nor a phase dot) */
    const own = ["hop", "hop-back", "slide", "find", "half-am", "half-pm"];
    const kd = (e: any) => {
      if (e.key !== "Enter" && e.key !== " ") return;
      const c = e.target && e.target.closest ? e.target.closest("[data-control]") : null;
      if (c && own.indexOf(c.getAttribute("data-control")) < 0) return;
      everTouched.current = true;
    };
    window.addEventListener("keydown", kd, true);
    return () => window.removeEventListener("keydown", kd, true);
  }, [stage]);
  useEffect(() => () => { tl.stop(); mv.stop(); playing.current = false; fixing.current = false; }, [ek]);

  /* does this question still wait for its act? */
  const goalT = k === "slide" ? (it.warm ? 1440 : it.goal) : 0;
  const nHops = k === "hop" ? Math.abs(it.hops) : 0;
  const needAct = k === "slide" ? S.t < goalT : k === "find" ? S.found < 2 : k === "card" ? S.placed === null : k === "hop" ? S.done < nHops : false;
  const showAll = stage === "win" || stage === "idle" || stage === "free" || !!warmUp;

  /* ── the acts: each piece moves by itself (no hand is drawn, the owner 2026-11-16): the marker jumps, slides, the pins drop in,
     the card travels to its half. S.fly holds the move in flight and keeps the answer gate shut until it lands; under reduced
     motion the move lands at once. `mv` is the moves' own timeline (the traceback's `tl` would cancel it without its end) ── */
  const fly = (frames: any[], land: () => void) => {
    playing.current = true;
    const end = () => { playing.current = false; land(); };
    if (reducedMotion()) { end(); return; }
    mv.run(frames, end);
  };
  const hop = (dir: number, report: string) => {
    if (playing.current) return;
    const a = S.t, b = a + 60 * dir;
    const wrap = Math.floor(a / 1440) !== Math.floor(b / 1440);
    const noon = Math.floor((a - 720) / 1440) !== Math.floor((b - 720) / 1440);
    const segs = ddSegs(a, b, k === "slide");
    /* the clock's hands turn with the hop (ct = the clock time of each frame); across midnight the marker lands on the edge
       post, fades across to the other end's post (both posts lit), then makes a short second hop in */
    const te = segs.length > 1 ? Math.floor(Math.max(a, b) / 1440) * 1440 : b;
    const frames: any[] = [];
    const leg = (s: number[], n: number, t0: number, t1: number, prev?: number[]) => {
      if (s[0] === s[1]) return;
      for (let i = 1; i <= n; i++) frames.push([75, () => put({ fly: { hop: s, f: i / n, ct: t0 + (t1 - t0) * i / n, prev } })]);
    };
    leg(segs[0], 16, a, te);   /* 16 x 75 ms: the marker jumps along its green arc in 1.2 s */
    if (segs.length > 1) {
      const from = segs[0][1];
      /* 2 + 5 frames: the whole crossing stays within 1.5 x a normal hop (about 1.73 s) */
      for (let i = 1; i <= 2; i++) frames.push([75, () => put({ fly: { hop: segs[1], f: 0, ct: te, prev: segs[0], from, c: i / 2 } })]);
      leg(segs[1], 5, te, b, segs[0]);
    }
    fly(frames, () => {
      put((p: any) => ({ t: b, done: p.done + 1, arcs: [...p.arcs, ...segs.filter((s) => s[0] !== s[1])].slice(-8), lit: wrap ? (dir > 0 ? 2 : 0) : noon ? 1 : null, fly: null }));
      api.sfx.settle();
      api.did(report);
    });
  };
  const slide = () => {
    if (playing.current) return;
    const t0 = S.t, goal = t0 < 720 ? 720 : 1440;
    const n = Math.max(1, Math.round((goal - t0) / 60)), ms = Math.max(60, Math.round(1600 / n));
    /* the marker slides hour by hour to the post */
    fly([[ms, () => put({ fly: { slide: true } })], ...Array.from({ length: n }, (_, i) => [ms, () => put({ t: t0 + (i + 1) * 60 })])], () => {
      put({ t: goal, lit: goal === 720 ? 1 : 2, fly: null });
      api.sfx.settle();
      api.did("slide");
    });
  };
  const find = () => {
    if (playing.current) return;
    /* the first pin drops in at once (a press answers within about 60 ms), the second follows */
    fly([[60, () => put({ fly: { find: true }, found: 1 })], [600, () => put({ found: 2 })], [300, () => {}]], () => {
      put({ found: 2, fly: null });
      api.sfx.settle();
      api.did("find");
    });
  };
  /* the tray card: where it stands, and where it goes */
  const card = { x: g.x0, y: 0, w: Math.min(360, kx - g.x0 - 10, g.w - g.x0 - 10), h: 150 };
  const place = (half: string) => {
    if (playing.current || S.placed !== null) return;
    if (warmUp && half !== "am") { api.did("half-" + half); return; }
    const p = (it.t % 720) + (half === "pm" ? 720 : 0);
    const N = 16;   /* 16 x 75 ms: the card travels to the tapped half in 1.2 s */
    fly(Array.from({ length: N }, (_, i) => [75, () => put({ fly: { card: p, f: (i + 1) / N } })]), () => {
      put({ placed: p, fly: null });
      api.sfx.settle();
      api.did("half-" + half);
    });
  };
  /* the one key at the bottom centre: its label follows the act */
  const act = (on: any) => {
    if (on === "hop") hop(1, "hop");
    else if (on === "hop-back") hop(-1, "hop-back");
    else if (on === "slide") slide();
    else if (on === "find") find();
    else if (on === "half-am") place("am");
    else if (on === "half-pm") place("pm");
  };
  const press = (on: string) => {
    const now = Date.now();
    if (now - lastKey.current < 400) return;
    lastKey.current = now;
    everTouched.current = true;
    if (stage === "ask" && !S.touched) put({ touched: true });
    /* the gate holds through the act: a lock held before api.act stays when it ends */
    if (stage === "ask" && needAct && !fixing.current) api.lock(true);
    /* keyboard: Enter on the act key keeps the focus on it, and the Answer key gets it once the act is done */
    const ae: any = typeof document !== "undefined" ? document.activeElement : null;
    refocus.current = ae && ae.getAttribute && ae.getAttribute("data-control") === on ? on : null;
    act(on);
  };
  api.onEnter(stage === "demo" && stepOn ? () => act(stepOn) : null);
  HOOK.demo = () => act(stepOn);
  /* the agent's check(): the act at once, no animation (never in the demo stage) */
  HOOK.check = stage === "ask" && needAct ? () => {
    if (playing.current) { mv.stop(); playing.current = false; put({ fly: null }); }
    if (k === "slide") put({ t: goalT, lit: goalT === 720 ? 1 : 2 });
    else if (k === "find") put({ found: 2 });
    else if (k === "card") put({ placed: it.t });
    else if (k === "hop") {
      const arcs: any[] = [];
      let a = S.t;
      for (let j = S.done; j < nHops; j++) { const b = a + 60 * Math.sign(it.hops); arcs.push(...ddSegs(a, b).filter((s) => s[0] !== s[1])); a = b; }
      put((p: any) => ({ t: it.start + it.hops * 60, done: nHops, arcs: [...p.arcs, ...arcs].slice(-8) }));
    }
    return undefined;
  } : undefined;

  /* the answer gate (PATTERNS §20): the keys wait for the act once the child has touched the board */
  useEffect(() => {
    if (stage !== "ask" || fixing.current) return;
    /* a move in flight holds the gate until it lands (the last hop, slide or pin makes needAct false before then) */
    api.lock(!!((S.touched || everTouched.current) && (needAct || !!S.fly)));
  }, [stage, S.touched, needAct, ek, S.done, S.t, S.found, S.placed, S.fly]);

  useEffect(() => {
    const on = refocus.current;
    if (!on || typeof document === "undefined") return;
    const id = setTimeout(() => {
      if (playing.current) return;
      const q = (sel: string) => document.querySelector(sel) as any;
      const el = q('[data-control="' + on + '"]') || q('[data-zone="ask"] [data-control^="choice-"]') || q('[data-zone="ask"] [data-control="answer-open"]');
      if (el && el.focus) { el.focus(); refocus.current = null; }
    }, 60);
    return () => clearTimeout(id);
  }, [S.done, S.t, S.found, S.placed, ek]);

  /* the traceback: the maths again, ending on the whole right answer (a layer of its own, pointerEvents none) */
  useEffect(() => {
    if (!wrong || stage !== "ask") return;
    fixing.current = true;
    api.lock(true);
    const steps: any[] = [];
    if (k === "slide") { for (let m = 60; m <= it.goal; m += 60) steps.push([it.goal === 720 ? 110 : 70, () => put({ fix: { t: m } })]); }
    if (k === "hop") { for (let j = 1; j <= nHops; j++) steps.push([480, () => put({ fix: { j } })]); }
    if (k === "find") { steps.push([450, () => put({ fix: { found: 1 } })]); steps.push([450, () => put({ fix: { found: 2 } })]); }
    steps.push([500, () => put((p: any) => ({ fix: { ...(p.fix || {}), end: true } }))]);
    tl.run(steps, () => { fixing.current = false; api.lock(!!((S.touched || everTouched.current) && needAct)); });
  }, [wrong]);

  /* the win line: one sentence (the phase's closing takes the last one's place) */
  useEffect(() => { if (stage === "win" && item && item.win) api.say(item.win); }, [stage]);

  /* what the host and the agent read back (never the label before the child gave it) */
  const day = S.t === null ? 0 : Math.floor(S.t / 1440);
  api.share({
    phase: n, markerTime: S.t === null ? null : ddClock(S.t), half: showAll && S.t !== null ? ddHalf(S.t) : null,
    lap: k === "slide" ? Math.floor(Math.min(1440, S.t) / 720) : null, hops: S.done, dayCount: day,
    cardsPlaced: S.placed === null ? 0 : 1, complete: stage === "idle",
  });

  /* ── drawing ── */
  const F = S.fix;
  const LS = lang === "en" ? 1 : 1.12;   /* hi / gu: the same cap height as the English */
  const dev = lang !== "en";
  const clockT = S.fly && S.fly.hop ? S.fly.ct : F && k === "slide" && F.t !== undefined ? F.t : k === "card" ? it.t : k === "read" ? 25 : S.t === null ? 0 : S.t;
  const tagW = (s: string) => Math.max(120, ddTextW(s, T.label * LS) + 40);
  const tag = (x: number, s: string, tone: string, key: string, at?: number) => {
    const w = tagW(s);
    const tx0 = at !== undefined ? at : Math.max(g.tl, Math.min(g.w - w - 4, x - w / 2));
    const pale = tone === "pale";
    return (
      <g key={key} filter="url(#dd-card-shadow)">
        <rect x={tx0} y={g.ty} width={w} height={g.th} rx={14} fill={pale ? "#FFFFFF" : tone === "fix" ? "#E3F5EE" : "#FFFDF7"} stroke={pale ? "#9AA4AC" : tone === "fix" ? DD_HOP : DD_INK} strokeWidth={pale ? 2 : 3} strokeDasharray={pale ? "8 6" : undefined} />
        <text x={tx0 + w / 2} y={g.ty + (dev ? 46 : 43)} textAnchor="middle" fontSize={T.label * LS} fontWeight={700} fill={pale ? "#5E676E" : tone === "fix" ? "#00573F" : DD_INK}>{s}</text>
      </g>
    );
  };
  /* two tags side by side: if they would touch, they meet halfway between their pins (each still over its own pin) */
  const tags2 = (a: any[], b: any[]) => {
    const [A, B] = a[0] <= b[0] ? [a, b] : [b, a];
    const wa = tagW(A[1]), wb = tagW(B[1]);
    let ax = Math.max(g.tl, Math.min(g.w - wa - 4, A[0] - wa / 2)), bx = Math.max(g.tl, Math.min(g.w - wb - 4, B[0] - wb / 2));
    if (ax + wa + 18 > bx) {
      const mid = (A[0] + B[0]) / 2;
      ax = Math.max(g.tl, mid - 9 - wa); bx = Math.min(g.w - wb - 4, Math.max(ax + wa + 18, mid + 9));
    }
    return [tag(A[0], A[1], A[2], A[3], ax), tag(B[0], B[1], B[2], B[3], bx)];
  };
  const pinXs: number[] = [];
  const pin = (p: number, tone: string, key: string, short?: boolean) => {
    const x = ddX(g, p);
    pinXs.push(x);
    const col = tone === "pale" ? "#9AA4AC" : tone === "fix" ? DD_HOP : DD_INK;
    return (
      <g key={key}>
        <line x1={x} y1={short ? g.sy - 30 : g.ty + g.th} x2={x} y2={g.sy + g.sh} stroke={col} strokeWidth={tone === "pale" ? 4 : 6} strokeDasharray={tone === "pale" ? "8 6" : undefined} strokeLinecap="round" />
        <circle cx={x} cy={g.sy + g.sh} r={8} fill={col} stroke="#FFFDF7" strokeWidth={2} />
      </g>
    );
  };
  const full = (t: number, edge?: boolean) => {
    const p = edge ? Math.min(1440, t) : ddPos(t);
    if (p === 720) return tx("12 noon");
    if (p === 0 || p === 1440) return tx("12 midnight");
    return ddClock(t) + " " + tx(ddHalf(t));
  };
  const arc = (pa: number, pb: number, key: string, dash?: boolean) => {
    const a = ddX(g, pa), b = ddX(g, pb);
    const lift = ddLift(pa, pb);   /* the marker peaks at 95 over a post, else 66 */
    return <path key={key} d={`M ${a} ${g.sy} Q ${(a + b) / 2} ${g.sy - lift} ${b} ${g.sy}`} fill="none" stroke={DD_HOP} strokeWidth={5} strokeDasharray={dash ? "10 7" : undefined} strokeLinecap="round" />;
  };
  const chip = (x: number, y: number, w: number, s: string, key: string, fix?: boolean) => (
    <g key={key} filter="url(#dd-card-shadow)">
      <rect x={x} y={y} width={w} height={64} rx={14} fill={fix ? "#E3F5EE" : "#FFFDF7"} stroke={fix ? DD_HOP : C.rule} strokeWidth={3} />
      <text x={x + w / 2} y={y + (dev ? 45 : 44)} textAnchor="middle" fontSize={T.label * LS} fontWeight={700} fill={fix ? "#00573F" : DD_INK}>{s}</text>
    </g>
  );

  /* the clock, geared to the marker */
  const Clock = () => {
    const p = ddPos(clockT);
    const hd = ((p % 720) / 2) * Math.PI / 180, md = ((p % 60) * 6) * Math.PI / 180;
    const { cx, cy, R } = g;
    return (
      <g filter="url(#dd-card-shadow)">
        <defs><clipPath id="dd-clock"><circle cx={cx} cy={cy} r={R} /></clipPath></defs>
        <circle cx={cx} cy={cy} r={R + 5} fill="#2B2B2B" opacity={0.15} />
        <circle cx={cx} cy={cy} r={R} fill="#8B5A2B" stroke="#5C3A1E" strokeWidth={3} />
        <circle cx={cx} cy={cy} r={R * 0.82} fill="#FFF8E7" />
        <Skin name="wall_clock" x={cx - R} y={cy - R} w={2 * R} h={2 * R} clip="url(#dd-clock)" />
        {Array.from({ length: 60 }, (_, m) => {
          const a = (m * 6 * Math.PI) / 180, r1 = R * 0.8, r2 = m % 5 === 0 ? R * 0.72 : R * 0.76;
          return <line key={m} x1={cx + Math.sin(a) * r1} y1={cy - Math.cos(a) * r1} x2={cx + Math.sin(a) * r2} y2={cy - Math.cos(a) * r2} stroke={DD_INK} strokeWidth={m % 5 === 0 ? 3 : 1.5} />;
        })}
        <line x1={cx} y1={cy} x2={cx + Math.sin(md) * R * 0.4} y2={cy - Math.cos(md) * R * 0.4} stroke={DD_MIN} strokeWidth={7} strokeLinecap="round" />
        <line x1={cx} y1={cy} x2={cx + Math.sin(hd) * R * 0.31} y2={cy - Math.cos(hd) * R * 0.31} stroke={DD_HOUR} strokeWidth={12} strokeLinecap="round" />
        {Array.from({ length: 12 }, (_, m) => {
          const a = ((m + 1) * 30 * Math.PI) / 180;
          return <text key={m} x={cx + Math.sin(a) * R * 0.59} y={cy - Math.cos(a) * R * 0.59 + 11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={DD_INK} stroke="#FFF8E7" strokeWidth={6} paintOrder="stroke">{m + 1}</text>;
        })}
        <circle cx={cx} cy={cy} r={11} fill={DD_INK} />
        <circle cx={cx} cy={cy} r={4} fill="#FFF8E7" />
      </g>
    );
  };

  /* the day strip: 24 hour blocks, the posts, the sun and the moons */
  const Strip = () => {
    const bw = (g.x1 - g.x0) / 24;
    const lit = F && F.end && (k === "hop") ? null : S.lit;
    /* across midnight both edge posts glow while the marker passes from one to the other */
    const both = !!(S.fly && S.fly.hop && S.fly.prev);
    return (
      <g>
        <g filter="url(#dd-card-shadow)">
          {Array.from({ length: 24 }, (_, m) => (
            <rect key={m} x={g.x0 + m * bw} y={g.sy} width={bw} height={g.sh} fill={m < 12 ? "url(#dd-am-grad)" : "url(#dd-pm-grad)"} stroke={DD_INK} strokeWidth={2} />
          ))}
        </g>
        {[g.x0, g.xm, g.x1].map((x, j) => (
          <g key={j}>
            {(lit === j || (both && j !== 1)) && <rect x={x - 16} y={g.sy - 22} width={32} height={g.sh + 44} rx={12} fill="#FFE27A" fillOpacity={0.95} stroke="#F59E0B" strokeWidth={2} />}
            <rect x={x - 5} y={g.sy - 20} width={10} height={g.sh + 36} rx={4} fill="url(#dd-post-grad)" stroke="#111827" strokeWidth={1.5} />
          </g>
        ))}
        <text x={g.x0 - 8} y={g.ly} textAnchor="start" fontSize={T.label * LS} fontWeight={700} fill={DD_INK}>{tx("midnight")}</text>
        <text x={g.xm} y={g.ly} textAnchor="middle" fontSize={T.label * LS} fontWeight={700} fill={DD_INK}>{tx("noon")}</text>
        <text x={g.x1 + 8} y={g.ly} textAnchor="end" fontSize={T.label * LS} fontWeight={700} fill={DD_INK}>{tx("midnight")}</text>
      </g>
    );
  };

  /* the top layer: the sun, the moons and the a.m. / p.m. pills stand over every line and arc, and take no taps */
  const Sky = () => (
    <g pointerEvents="none">
        {[g.x0, g.x1].map((x, j) => (
          <g key={j}>
            <circle cx={x} cy={g.sy - 30} r={27} fill="#FEF08A" opacity={0.3} />
            <circle cx={x} cy={g.sy - 30} r={23} fill="#F3E3A0" stroke="#B89B3C" strokeWidth={2} />
            <Skin name="moon" x={x - 25} y={g.sy - 55} w={50} h={50} />
          </g>
        ))}
        <g>
          <circle cx={g.xm} cy={g.sy - 30} r={28} fill="#FDE047" opacity={0.35} />
          <circle cx={g.xm} cy={g.sy - 30} r={23} fill="#F6B21B" stroke="#D97706" strokeWidth={2} />
          <Skin name="sun" x={g.xm - 27} y={g.sy - 57} w={54} h={54} />
        </g>
        {[["a.m.", (g.x0 + g.xm) / 2, "#1F3A4D"], ["p.m.", (g.xm + g.x1) / 2, "#4A3000"]].map(([wd, cx0, ink]: any, j: number) => {
          let cxw = cx0;
          const half = (g.x1 - g.x0) / 2, fs0 = T.prompt;
          const fs = Math.max(T.label, Math.min(fs0, (half - 44) * fs0 / Math.max(1, ddTextW(tx(wd), fs0))));
          const pw = Math.min(half - 16, ddTextW(tx(wd), fs) + 28), ph = dev ? fs * 1.7 : fs * 1.2;
          /* the pill steps 14 clear of any pin in its half, staying inside the half */
          const lo = cxw - half / 2 + 6 + pw / 2, hi = cxw + half / 2 - 6 - pw / 2;
          let cx2 = cxw;
          for (const px of pinXs) {
            if (px > cx2 - pw / 2 - 14 && px < cx2 + pw / 2 + 14) {
              const left = px - 14 - pw / 2, right = px + 14 + pw / 2;
              cx2 = left >= lo && (cxw - left <= right - cxw || right > hi) ? left : right <= hi ? right : left >= lo ? left : cx2;
            }
          }
          cxw = cx2;
          return (
            <g key={"hw" + j} pointerEvents="none">
              <rect x={cxw - pw / 2} y={g.sy + g.sh / 2 - ph / 2} width={pw} height={ph} rx={ph / 2} fill="#FFFDF7" stroke={DD_INK} strokeWidth={1.5} />
              <text x={cxw} y={g.sy + g.sh / 2 + fs * (dev ? 0.32 : 0.36)} textAnchor="middle" fontSize={fs} fontWeight={700} fill={ink}>{tx(wd)}</text>
            </g>
          );
        })}
    </g>
  );

  /* the keys at the bottom centre */
  const keys: any[] = [];
  if (k === "free") keys.push({ id: "hop-back", label: "Hop back" }, { id: "hop", label: "Hop" });
  else if (warmUp) { if (stepOn === "hop") keys.push({ id: "hop", label: "Hop" }); }
  else if (stage === "ask" && k === "slide" && S.t < goalT) keys.push({ id: "slide", label: "Slide" });
  else if (stage === "ask" && k === "find" && S.found < 2) keys.push({ id: "find", label: "Find" });
  else if (stage === "ask" && k === "hop" && S.done < nHops) keys.push(it.hops > 0 ? { id: "hop", label: "Hop" } : { id: "hop-back", label: "Hop back" });
  const kw = 230, kgap = 28;
  const kx0 = g.w / 2 - (keys.length * kw + (keys.length - 1) * kgap) / 2;

  /* what the marker shows */
  const markerOn = S.t !== null && (k === "slide" || k === "hop" || k === "free");
  const mp = k === "slide" ? Math.min(1440, S.t) : S.t === null ? 0 : ddPos(S.t);
  const hopFly = S.fly && S.fly.hop ? S.fly : null;
  const markerTag = !markerOn || F || hopFly ? null : k === "slide" ? (showAll ? full(S.t, true) : null) : showAll ? full(S.t) : ddClock(S.t);
  const cardLabel = (p: number, withHalf: boolean) => tx(it.word) + " " + ddClock(p) + (withHalf ? " " + tx(ddHalf(p)) : "");
  const halvesLive = k === "card" && S.placed === null && (stage === "ask" || (warmUp && stepOn === "half-am"));
  const isLast = k === "slide" && !it.warm && it.goal === 1440;
  const cardEl = () => (
    <g filter="url(#dd-card-shadow)">
      <rect x={card.x} y={card.y} width={card.w} height={card.h} rx={18} fill="#FFFDF7" stroke={DD_INK} strokeWidth={3} />
      <text x={card.x + card.w / 2} y={card.y + (dev ? 62 : 54)} textAnchor="middle" fontSize={T.prompt * LS} fontWeight={700} fill={DD_INK}>{tx(it.word)}</text>
      <text x={card.x + card.w / 2} y={card.y + 130} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={DD_INK}>{ddClock(it.t)}</text>
    </g>
  );

  return (
    <g>
      <defs>
        <filter id="dd-card-shadow" x="-10%" y="-10%" width="125%" height="125%">
          <feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#2B2B2B" floodOpacity="0.12" />
        </filter>
        <linearGradient id="dd-am-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#BCE4FA" />
          <stop offset="100%" stopColor="#80C4EE" />
        </linearGradient>
        <linearGradient id="dd-pm-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FDE3B2" />
          <stop offset="100%" stopColor="#F5B650" />
        </linearGradient>
        <linearGradient id="dd-post-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#1F2937" />
          <stop offset="50%" stopColor="#4B5563" />
          <stop offset="100%" stopColor="#1F2937" />
        </linearGradient>
      </defs>

      {Clock()}
      {/* the counters (top row, right of the clock, clear of the key's corner) */}
      {k === "slide" && it.parts && (
        <g filter="url(#dd-card-shadow)">
          <rect x={g.x0} y={0} width={280} height={64} rx={14} fill="#FFFDF7" stroke={C.rule} strokeWidth={3} />
          <text x={g.x0 + 20} y={dev ? 45 : 44} fontSize={T.label * LS} fontWeight={700} fill={DD_INK}>{tx("laps") + ":"}</text>
          {Array.from({ length: Math.floor(mp / 720) }, (_, j) => <circle key={j} cx={g.x0 + 190 + j * 44} cy={32} r={16} fill={DD_HOUR} stroke={DD_INK} strokeWidth={2} />)}
        </g>
      )}
      {k === "hop" && !it.warm && chip(g.x0, 0, 220, tx("hops") + ": " + S.done, "hops")}
      {(n === 4 || k === "free") && markerOn && chip(k === "hop" && !it.warm ? g.x0 + 240 : g.x0, 0, Math.min(260, kx - (k === "hop" && !it.warm ? g.x0 + 250 : g.x0 + 10), g.w - (k === "hop" && !it.warm ? g.x0 + 250 : g.x0 + 10)), day > 0 ? tx("next day") : day < 0 ? tx("day before") : tx("today"), "day")}
      {k === "card" && S.placed === null && !(S.fly && S.fly.card !== undefined) && cardEl()}
      {Strip()}
      {S.arcs.map((a: any, j: number) => arc(a[0], a[1], "a" + j))}
      {/* phase 1, Find: the two places where the clock shows seven */}
      {k === "find" && S.found >= 1 && !F && pin(420, "ink", "f1")}
      {k === "find" && S.found >= 2 && !F && pin(1140, "ink", "f2")}
      {k === "find" && S.found === 1 && !F && tag(ddX(g, 420), showAll ? full(420) : "7:00", "ink", "ft1")}
      {k === "find" && S.found >= 2 && !F && tags2([ddX(g, 420), showAll ? full(420) : "7:00", "ink", "ft1"], [ddX(g, 1140), showAll ? full(1140) : "7:00", "ink", "ft2"])}
      {/* phase 2: the card where the child put it */}
      {k === "card" && S.placed !== null && pin(showAll ? it.t : S.placed, "ink", "cp")}
      {k === "card" && S.placed !== null && !(F && F.end && S.placed === it.t) && tag(ddX(g, showAll ? it.t : S.placed), cardLabel(showAll ? it.t : S.placed, showAll), "ink", "ct")}
      {/* phase 4, the read question: the time on the strip once the answer is in */}
      {k === "read" && (stage === "win" || stage === "idle") && pin(25, "ink", "rp")}
      {k === "read" && (stage === "win" || stage === "idle") && tag(ddX(g, 25), full(25), "ink", "rt")}
      {markerOn && !hopFly && pin(mp, "ink", "m", !markerTag)}
      {/* a hop in flight: its green arc, and the marker jumping along it (kept out of pinXs, so the pills hold still) */}
      {markerOn && hopFly && hopFly.prev && arc(hopFly.prev[0], hopFly.prev[1], "live0")}
      {markerOn && hopFly && arc(hopFly.hop[0], hopFly.hop[1], "live")}
      {markerOn && hopFly && (() => {
        const [pa, pb] = hopFly.hop, f = hopFly.f;
        const x = ddX(g, pa + (pb - pa) * f), up = ddLift(pa, pb) * 2 * f * (1 - f);
        const pole = (px: number, dy: number, o: number, key: string) => (
          <g key={key} transform={`translate(0 ${-dy})`} opacity={o}>
            <line x1={px} y1={g.sy - 30} x2={px} y2={g.sy + g.sh} stroke={DD_INK} strokeWidth={6} strokeLinecap="round" />
            <circle cx={px} cy={g.sy + g.sh} r={8} fill={DD_INK} stroke="#FFFDF7" strokeWidth={2} />
          </g>
        );
        /* across midnight: the marker on the edge post fades as it comes in at the other end's post */
        return hopFly.c !== undefined
          ? [pole(ddX(g, hopFly.from), 0, 1 - hopFly.c, "mo"), pole(x, 0, hopFly.c, "mi")]
          : pole(x, up, 1, "mf");
      })()}
      {/* the card in flight: it travels from the tray to the tapped half, shrinking to a pin's tag */}
      {k === "card" && S.placed === null && S.fly && S.fly.card !== undefined && (() => {
        const f = S.fly.f, e = f * f * (3 - 2 * f), sc = 1 - 0.55 * e;
        const cx0 = card.x + card.w / 2, cy0 = card.y + card.h / 2;
        const dx = (ddX(g, S.fly.card) - cx0) * e, dy = (midY - cy0) * e;
        return <g transform={`translate(${cx0 + dx} ${cy0 + dy}) scale(${sc}) translate(${-cx0} ${-cy0})`}>{cardEl()}</g>;
      })()}
      {markerTag && tag(ddX(g, mp), markerTag, "ink", "mt")}
      {(stage === "win" || stage === "idle") && k === "slide" && !it.warm && chip(g.x0 + (it.parts ? 300 : 0), 0, Math.min(460, Math.min(kx, g.w) - g.x0 - (it.parts ? 310 : 10)), isLast ? "24 " + tx("hours") + ", 2 " + tx("laps") : "12 " + tx("hours") + ", 1 " + tx("lap"), "win")}

      {/* the hit targets: the two halves of the strip (phase 2) */}
      {halvesLive && <Hit id="half-am" x={g.x0} y={g.sy - 4} w={g.xm - g.x0} h={72} label={tx("the sky blue half, before noon")} onPress={() => press("half-am")} />}
      {halvesLive && <Hit id="half-pm" x={g.xm} y={g.sy - 4} w={g.x1 - g.xm} h={72} label={tx("the amber half, after noon")} onPress={() => press("half-pm")} />}
      {warmUp && stepOn === "half-am" && halvesLive && <Invite x={(g.x0 + g.xm) / 2} y={midY} w={g.xm - g.x0} h={g.sh} rx={8} C={C} />}

      {keys.map((b, j) => {
        const x = kx0 + j * (kw + kgap);
        return (
          <g key={"key" + j}>
            <Key id={b.id} label={tx(b.label)} x={x} y={g.ky} w={kw} h={72} C={C} tone="key" onClick={() => press(b.id)}>
              <text y={dev ? 13 : 12} textAnchor="middle" fontSize={T.label * LS} fontWeight={700} fill={DD_INK}>{tx(b.label)}</text>
            </Key>
            {warmUp && stepOn === b.id && <Invite x={x + kw / 2} y={g.ky + 36} w={kw} h={72} rx={18} C={C} />}
          </g>
        );
      })}

      {/* the correction: the maths again, ending on the whole right answer; never marked, takes no taps */}
      {F && (
        <g pointerEvents="none">
          {k === "slide" && pin(F.t || 0, "fix", "xs")}
          {k === "slide" && F.end && chip(g.x0 + (it.parts ? 300 : 0), 0, Math.min(460, Math.min(kx, g.w) - g.x0 - (it.parts ? 310 : 10)), it.goal === 1440 ? "24 " + tx("hours") + ", 2 " + tx("laps") : "12 " + tx("hours") + ", 1 " + tx("lap"), "xc", true)}
          {k === "find" && F.found >= 1 && pin(420, "fix", "xf1")}
          {k === "find" && F.found === 1 && tag(ddX(g, 420), full(420), "fix", "xft1")}
          {k === "find" && F.found >= 2 && pin(1140, "fix", "xf2")}
          {k === "find" && F.found >= 2 && tags2([ddX(g, 420), full(420), "fix", "xft1"], [ddX(g, 1140), full(1140), "fix", "xft2"])}
          {k === "find" && F.end && chip(g.x0, 0, Math.min(460, Math.min(kx, g.w) - g.x0 - 10), tx("clock alone: No"), "xfc", true)}
          {k === "card" && !showAll && pin(it.t, "fix", "xcp")}
          {k === "card" && !showAll && !(S.placed === null && wrong) && tag(ddX(g, it.t), ddClock(it.t) + " " + tx(ddHalf(it.t)), "fix", "xct")}
          {k === "card" && !showAll && S.placed === null && wrong && pin((it.t + 720) % 1440, "pale", "xcq")}
          {k === "card" && !showAll && S.placed === null && wrong && tags2([ddX(g, it.t), ddClock(it.t) + " " + tx(ddHalf(it.t)), "fix", "xct"], [ddX(g, (it.t + 720) % 1440), ddClock(it.t) + " " + tx(ddHalf(it.t + 720)), "pale", "xcqt"])}
          {k === "read" && pin(25, "fix", "xrp")}
          {k === "read" && pin(745, "pale", "xrq")}
          {k === "read" && tags2([ddX(g, 25), full(25), "fix", "xrt"], [ddX(g, 745), full(745), "pale", "xrqt"])}
          {k === "hop" && (() => {
            const sgn = Math.sign(it.hops), j = Math.min(F.j || 0, nHops);
            const out: any[] = [];
            for (let h = 0; h < j; h++) {
              const a = it.start + sgn * 60 * h, b = a + sgn * 60;
              ddSegs(a, b).filter((s) => s[0] !== s[1]).forEach((s, q) => out.push(arc(s[0], s[1], "xa" + h + "." + q, true)));
            }
            const now = it.start + sgn * 60 * j;
            out.push(pin(ddPos(now), "fix", "xhp"));
            if (F.end && wrong) {
              const end = it.start + it.hops * 60, other = ddPos(end + 720);
              out.push(pin(other, "pale", "xhq"));
              out.push(...tags2([ddX(g, ddPos(now)), full(now), "fix", "xht"], [ddX(g, other), ddClock(end) + " " + tx(ddHalf(end + 720)), "pale", "xhqt"]));
            } else out.push(tag(ddX(g, ddPos(now)), full(now), "fix", "xht"));
            return out;
          })()}
        </g>
      )}
      {Sky()}
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase */
function Thumb({ result, it, C, w, h, lang = "en", tx = (v: any) => v }: any) {
  if (!result || !result.last) return null;
  const item = it || result.last.it || {};
  const k = item.kind;
  let p: number | null = null;
  let line = "", line2 = "";
  const lab = (v: string) => { const t = tx(v); return lang === "en" || t !== v ? " " + t : ""; };
  if (k === "slide" && item.parts) { const ps = slotPartsOf(result.last.value, 2); line = ps[0] + lab("hours"); line2 = ps[1] + lab("laps"); }
  else if (k === "slide") { line = String(result.last.value) + lab("hours"); p = 720; }
  else if (k === "find") { p = -1; }
  else if (k === "card") { p = item.t; line = ddClock(item.t) + lab(ddHalf(item.t)); }
  else if (k === "hop") { const e = item.start + item.hops * 60; p = ddPos(e); line = ddClock(e) + lab(ddHalf(e)); }
  else if (k === "read") { p = 25; line = "12:25" + lab("a.m."); }
  const sx = 12, sw = w - 24, sy = k === "find" ? 12 : 6, sh = Math.max(12, Math.min(20, h - 60));
  const noW = ddTextW(tx("No"), T.micro) + 26;
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill="#FFFDF7" stroke={C.rule} strokeWidth={1.5} />
      {!line2 && <rect x={sx} y={sy} width={sw / 2} height={sh} fill={DD_AM} stroke={DD_INK} strokeWidth={1.5} />}
      {!line2 && <rect x={sx + sw / 2} y={sy} width={sw / 2} height={sh} fill={DD_PM} stroke={DD_INK} strokeWidth={1.5} />}
      {line2 && <text x={w / 2} y={h / 2 - 6} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={DD_INK}>{line}</text>}
      {p === -1 && [420, 1140].map((q) => <line key={q} x1={sx + (q / 1440) * sw} y1={sy} x2={sx + (q / 1440) * sw} y2={sy + sh} stroke={DD_INK} strokeWidth={4} />)}
      {p === -1 && [420, 1140].map((q) => <text key={"t" + q} x={Math.max(sx + 36, Math.min(w - sx - 36, sx + (q / 1440) * sw))} y={h - 8} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={DD_INK}>7:00</text>)}
      {p === -1 && <rect x={w / 2 - noW / 2} y={sy + sh / 2 - 19} width={noW} height={38} rx={19} fill="#E3F5EE" stroke={DD_HOP} strokeWidth={2} />}
      {p === -1 && <text x={w / 2} y={sy + sh / 2 + (lang === "en" ? 10 : 12)} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill="#00573F">{tx("No")}</text>}
      {p !== null && p >= 0 && !line2 && <line x1={sx + (p / 1440) * sw} y1={sy} x2={sx + (p / 1440) * sw} y2={sy + sh} stroke={DD_INK} strokeWidth={4} />}
      {p !== -1 && <text x={w / 2} y={h - 8} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={DD_INK}>{line2 || line}</text>}
    </g>
  );
}

function DayDial(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, fitHost: () => null,
      board: true,
      keyOnly: true,
      /* bigPad off: the clock stands at the left and the day strip needs the 1086-wide area with the panel open */
      bigPad: false,
      nextKey: true,
      navDots: true,
      StartArt, START_HOOK,
      }} />
  );
}

export default DayDial;