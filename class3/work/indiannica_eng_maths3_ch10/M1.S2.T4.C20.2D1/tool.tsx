/* ═══ M1.S2.T4.C20.2D1 · time_converter · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists: header + its three controls, canvas, slot + pad, bubble + mascot,
   phase dots (user / AI mode), window.toolApi, the sound effects, the printed bubble, scoring, the
   events, idle and restart. THE LESSON IS SILENT (runtime r30): nothing is spoken; every line is
   printed on the bubble, which is the guide (it instructs; after a wrong act or answer the hint shows UNDER the
   pinned instruction and stays until the child acts again; r34). The lesson is action-driven: nothing moves
   on unless the child acts (a tap, a key, an answer); after a right answer the next question follows its
   short celebration by itself. The header's Hint key (r35) shows the hint on demand.
   THE NEW LOOK (the owner, 2026-10-16; docs/LAYOUT.md §1d-§1e, docs/PATTERNS.md §15-§16): no question bar (only the blinking key at the top
   right), four small clickable phase dots, a big ONE-sentence bubble, digits as written, every act performed on screen (api.act). The question
   lives ONLY in the bubble: each item's `say` is the whole question in one sentence.
   Three phases (the owner, 2026-10-28): 1 hours into minutes (the minute hand and twelve five-minute tiles), 2 days into hours (the day wheel
   and 24 hour tiles), 3 how long and when it ends (a bar laid on a day strip, across noon; the plan's phases 3 and 4 folded into one).
   Edit, never rewrite. Built by `node cli.mjs scaffold`; concepts are verbatim (check compares them). */

const TOOL_ID = "time_converter";
const MEDIA_ID = "M1.S2.T4.C20.2D1";
const TOOL_NAME = "Time Converter";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
/* kept for the tool object's shape (and the sidecar); nothing speaks from r30 */
const VOICE = {"rate":0.92,"pitch":1.06};

/* printed on the bubble before phase 1's teach lines only (the plan's opening line; not shown when phase 1 has steps) */
const OPENING = ["A clock, a stopwatch and a day strip. Let us count the time."];
/* the whole-tool line: printed on the summary page */
const FINISH_LINE = "You counted the time with the hour filling and the day turning.";
/* printed when the child opens Free play; its LAST piece stays on the bubble */
const FREE_LINE = "Free play: type hours or days, turn the dial and slide the bar.";

/* the clock family look (the owner, 2026-10-28): hour vermilion, minute deep blue, a.m. sky blue, p.m. amber, reached / answer / duration green */
const TC_HOUR = "#E5531A", TC_MIN = "#1F4E9C", TC_AM = "#5BB8E8", TC_PM = "#F2A531", TC_GO = "#2E9E5B";
/* the strip shows 6 a.m. to 6 p.m. (noon in the middle): 72 units an hour, a bar snaps to a quarter of an hour */
const TC_WS = 360, TC_WE = 1080, TC_PX = 1.2, TC_X0 = 18;
const tcSx = (m: number) => TC_X0 + (m - TC_WS) * TC_PX;
const tcMin = (x: number) => TC_WS + (x - TC_X0) / TC_PX;
const tcSnap = (m: number) => Math.round(m / 15) * 15;
const tcClamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));
/* the strip's rows (working-area units, laid out for the 900-wide open room) */
const TC_B = { mini: 2, miniH: 36, lab: 86, lenY: 132, barY: 142, barH: 52, tY: 202, tH: 70, labY: 310, linesY: 350, linesPitch: 39, outY: 400, keyY: 440 };
/* the tile rows: hours (12 five-minute tiles a row) and days (24 hour tiles a row) */
const TC_G1 = { x0: 332, pitch: 42, w: 38, h: 56, y0: 56, py: 74, bx: 306 };
const TC_G2 = { x0: 56, pitch: 33, w: 30, h: 30, y0: 330, py: 37, bx: 28 };
const TC_CLK = { cx: 150, cy: 178, r: 130 };
const TC_WHL = { cx: 172, cy: 165, r: 121 };
const TC_MODE = { hours: "Hours", days: "Days", bar: "Bar" };

/* THE START PAGE (runtime r28; docs/LAYOUT.md §1c): the object the lesson is about, in a 1200 x 340 box */
const START_HOOK = "How long is an hour? How long is a day?";
function StartArt({ box, C, lang, tx }: any) {
  const row: any[] = [];
  for (let j = 0; j < 12; j++) row.push(<rect key={"a" + j} x={400 + j * 63} y={30} width={58} height={64} rx={8} fill={j < 6 ? "url(#tc-grad-min)" : tint(C.panel, 0.55)} stroke={C.ink} strokeWidth={3} filter="url(#tc-shadow)" />);
  const strip: any[] = [];
  for (let j = 0; j < 24; j++) strip.push(<rect key={"b" + j} x={400 + j * 31.5} y={140} width={30} height={56} rx={4} fill={j < 12 ? "url(#tc-grad-am)" : "url(#tc-grad-pm)"} stroke={C.ink} strokeWidth={2} />);
  return (
    <g>
      <defs>
        <filter id="tc-shadow-start" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#000000" floodOpacity="0.18" />
        </filter>
        <linearGradient id="tc-grad-min" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3169C6" />
          <stop offset="100%" stopColor="#183D7C" />
        </linearGradient>
        <linearGradient id="tc-grad-am" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7CD0F7" />
          <stop offset="100%" stopColor="#419ECE" />
        </linearGradient>
        <linearGradient id="tc-grad-pm" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F8BC58" />
          <stop offset="100%" stopColor="#D98A1B" />
        </linearGradient>
        <linearGradient id="tc-grad-go" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3BD87C" />
          <stop offset="100%" stopColor="#22884B" />
        </linearGradient>
      </defs>
      {tcClockFace({ cx: 170, cy: 170, r: 150, A: 180, C })}
      {row}
      {strip}
      <rect x={400 + 9 * 31.5} y={112} width={5 * 31.5} height={22} rx={6} fill="url(#tc-grad-go)" stroke={C.ink} strokeWidth={3} filter="url(#tc-shadow-start)" />
      <circle cx={1082} cy={270} r={42} fill="#E8C86A" stroke={C.ink} strokeWidth={4} filter="url(#tc-shadow-start)" />
      <circle cx={1082} cy={270} r={32} fill="#FFF9EC" stroke={C.ink} strokeWidth={3} />
      <Skin name="stopwatch" x={1040} y={220} w={84} h={100} />
      <rect x={1070} y={206} width={24} height={12} rx={3} fill={TC_HOUR} stroke={C.ink} strokeWidth={2} />
    </g>
  );
}

/* Hindi and Gujarati (docs/PATTERNS.md §11): every line stays English, exactly as the checks read it; this table is keyed by that
   English, byte for byte, and is filled AFTER the English is final and reviewed (the language pass). Empty = English only. */
const TR: any = {
  hi: {
    "Time Converter": "समय बदलो",
    "Free play: type hours or days, turn the dial and slide the bar.": "मुक्त खेल: घंटे या दिन लिखो, सुई घुमाओ और पट्टी खिसकाओ।",
    "How long is an hour? How long is a day?": "एक घंटा कितना लंबा होता है? एक दिन कितना लंबा?",
    "Sixty minutes make an hour": "साठ मिनट का एक घंटा होता है",
    "Turn the blue minute hand once all the way round the clock.": "नीली मिनट वाली सुई को घड़ी में एक पूरा चक्कर घुमाओ।",
    "Turn it round once more, and watch the hour hand creep.": "इसे एक चक्कर और घुमाओ और घंटे की सुई को खिसकते देखो।",
    "The minute hand turns round once for every hour.": "हर घंटे में मिनट की सुई एक चक्कर घूमती है।",
    "Change each hour into minutes first, then add what is left over.": "पहले हर घंटे को मिनट में बदलो, फिर बचे हुए मिनट जोड़ो।",
    "One hour is sixty minutes, so hours change into minutes by multiplying by sixty.": "एक घंटा 60 मिनट का होता है, इसलिए घंटों को 60 से गुणा करते हैं।",
    "You learned: 1 hour is 60 minutes, so hours times 60 make minutes.": "तुमने सीखा: 1 घंटा = 60 मिनट, इसलिए घंटे × 60 = मिनट।",
    "A train journey takes 4 hours, so how many minutes is that?": "ट्रेन का सफ़र 4 घंटे का है, तो यह कितने मिनट हुआ?",
    "Minutes in all?": "कुल कितने मिनट?",
    "The hours must be changed into minutes, one round of the minute hand each.": "घंटों को मिनट में बदलना है, हर घंटा मिनट की सुई का एक चक्कर है।",
    "One round fills twelve tiles, and that row ends at sixty minutes.": "एक चक्कर में बारह टाइलें भरती हैं और पंक्ति साठ मिनट पर पूरी होती है।",
    "Four rounds make four rows of sixty, so add the rows.": "चार चक्कर यानी साठ की चार पंक्तियाँ, इसलिए पंक्तियाँ जोड़ो।",
    "A school sports day lasts 2 hours 30 minutes: how many minutes in all?": "स्कूल का खेल दिवस 2 घंटे 30 मिनट चलता है: कुल कितने मिनट?",
    "Two hours are two rounds of sixty before the 30 minutes.": "दो घंटे यानी साठ के दो चक्कर, फिर 30 मिनट।",
    "Turn the hand twice: each full turn is worth sixty minutes.": "सुई को दो बार घुमाओ: हर पूरा चक्कर साठ मिनट का है।",
    "Put the minutes of the two rounds first, then add the 30 minutes after them.": "पहले दोनों चक्करों के मिनट रखो, फिर उनके बाद 30 मिनट जोड़ो।",
    "How many minutes does a holiday bus ride of 1 hour 25 minutes take?": "छुट्टी में बस की 1 घंटे 25 मिनट की सवारी कितने मिनट की है?",
    "Change the 1 hour into minutes before you add the 25.": "25 जोड़ने से पहले 1 घंटे को मिनट में बदलो।",
    "A full round of the minute hand is sixty minutes, and the 25 comes after it.": "मिनट की सुई का पूरा चक्कर साठ मिनट है, उसके बाद 25 आता है।",
    "Count on from sixty, five minutes for each tile of the last row.": "साठ से आगे गिनो, आखिरी पंक्ति की हर टाइल पाँच मिनट की है।",
    "Twenty-four hours make a day": "चौबीस घंटे का एक दिन होता है",
    "Turn the day wheel once all the way round.": "दिन के पहिये को एक पूरा चक्कर घुमाओ।",
    "Turn it round once more for a second day.": "दूसरे दिन के लिए इसे एक चक्कर और घुमाओ।",
    "One turn of the wheel fills one day of hour tiles.": "पहिये का एक चक्कर घंटे की टाइलों का एक दिन भरता है।",
    "Count the turns, then add the hours of each day.": "चक्कर गिनो, फिर हर दिन के घंटे जोड़ो।",
    "One day is 24 hours, so days times 24 make hours.": "एक दिन 24 घंटे का होता है, इसलिए दिन × 24 = घंटे।",
    "You learned: 1 day is 24 hours, so days times 24 make hours.": "तुमने सीखा: 1 दिन = 24 घंटे, इसलिए दिन × 24 = घंटे।",
    "A holiday lasts 3 days, so how many hours is that?": "छुट्टी 3 दिन की है, तो यह कितने घंटे हुए?",
    "Hours in all?": "कुल कितने घंटे?",
    "Each day is one full turn of the wheel.": "हर दिन पहिये का एक पूरा चक्कर है।",
    "One turn fills a row of sky blue and amber hour tiles.": "एक चक्कर आसमानी और पीली घंटे की टाइलों की एक पंक्ति भरता है।",
    "Take the hours of one turn and use them for each of the 3 days.": "एक चक्कर के घंटे लो और उन्हें 3 दिनों में से हर एक के लिए इस्तेमाल करो।",
    "A school camp lasts 4 days: how many hours in all?": "स्कूल का शिविर 4 दिन का है: कुल कितने घंटे?",
    "One row of tiles is twelve sky blue ones and twelve amber ones.": "टाइलों की एक पंक्ति में बारह आसमानी और बारह पीली हैं।",
    "Four days mean four equal rows, so put the rows together.": "चार दिन यानी चार बराबर पंक्तियाँ, उन्हें साथ मिलाओ।",
    "How many hours does a train tour of 5 days take?": "5 दिन की ट्रेन यात्रा में कितने घंटे लगते हैं?",
    "Look at the wheel and count the hours in one whole day.": "पहिये को देखो और एक पूरे दिन के घंटे गिनो।",
    "The sky blue half and the amber half together make one day.": "आसमानी आधा और पीला आधा मिलकर एक दिन बनता है।",
    "A tour of 5 days is five of those days, one after another.": "5 दिन की यात्रा ऐसे पाँच दिन हैं, एक के बाद एक।",
    "How long did it take?": "कितना समय लगा?",
    "Drag the bar's round handle along the strip to the flag.": "पट्टी के गोल बटन को खींचकर झंडे तक ले जाओ।",
    "Now tap Add to join the two pieces of the bar.": "अब 'जोड़ो' पर टैप करके पट्टी के दो टुकड़े जोड़ो।",
    "Tap the Add key.": "जोड़ो कुंजी पर टैप करो।",
    "The bar splits at noon, so count each piece and add them.": "पट्टी दोपहर पर बँट जाती है, हर टुकड़ा गिनो और जोड़ो।",
    "For an end time, slide on by the hours first, then by the minutes.": "अंत का समय पाने के लिए पहले घंटे, फिर मिनट आगे बढ़ाओ।",
    "Count to noon and from noon, then add; for an end time add hours first.": "दोपहर तक और उसके बाद गिनो, फिर जोड़ो। अंत का समय: पहले घंटे जोड़ो।",
    "You learned: count to noon, then on from noon, and add.": "तुमने सीखा: दोपहर तक गिनो, फिर दोपहर से आगे गिनो और जोड़ो।",
    "A train leaves at 9:30 a.m., reaches at 1:45 p.m.: how long?": "ट्रेन 9:30 पूर्वाह्न चली, 1:45 अपराह्न पहुँची: कितनी देर?",
    "How long?": "कितनी देर?",
    "Add both pieces, and turn 60 of the minutes into one more hour.": "दोनों टुकड़े जोड़ो और 60 मिनट को एक और घंटा बना लो।",
    "Add the hours of both pieces, then the minutes of both pieces.": "दोनों टुकड़ों के घंटे जोड़ो, फिर दोनों के मिनट जोड़ो।",
    "hours": "घंटे",
    "minutes": "मिनट",
    "A bus runs 2 hours 45 minutes from 10:30 a.m.: when does it end?": "बस 10:30 पूर्वाह्न से 2 घंटे 45 मिनट चलती है: कब पहुँचेगी?",
    "When does it end?": "यह कब पहुँचेगी?",
    "Slide the bar on by the hours first, then by the minutes.": "पट्टी को पहले घंटों से, फिर मिनटों से आगे खिसकाओ।",
    "Move the end on two hours from 10:30 before you think of the minutes.": "मिनट सोचने से पहले छोर को 10:30 से दो घंटे आगे ले जाओ।",
    "After the two hours, add the minutes and see which side of noon you are on.": "दो घंटे के बाद मिनट जोड़ो और देखो दोपहर के किस ओर हो।",
    "Art class starts at 2:15 p.m., ends at 4:45 p.m.: how long?": "कला कक्षा 2:15 अपराह्न शुरू, 4:45 अपराह्न खत्म: कितनी देर?",
    "Both times are after noon, so count straight along the bar.": "दोनों समय दोपहर के बाद के हैं, इसलिए पट्टी पर सीधे गिनो।",
    "Count on one hour at a time from 2:15, and see what is left.": "2:15 से एक-एक घंटा आगे गिनो और देखो क्या बचा।",
    "Then count the minutes that are left, in quarters of an hour.": "फिर बचे हुए मिनट गिनो, घंटे के चौथाई हिस्सों में।",
    "Yes, 4 hours make 240 minutes.": "हाँ, 4 घंटे के 240 मिनट होते हैं।",
    "Yes, that is 150 minutes in all.": "हाँ, कुल 150 मिनट हुए।",
    "Yes, 60 and 25 make 85 minutes.": "हाँ, 60 और 25 मिलकर 85 मिनट होते हैं।",
    "Yes, 3 days make 72 hours.": "हाँ, 3 दिन के 72 घंटे होते हैं।",
    "Yes, 96 hours fit in 4 days.": "हाँ, 4 दिन में 96 घंटे होते हैं।",
    "Yes, a 5 day tour lasts 120 hours.": "हाँ, 5 दिन की यात्रा 120 घंटे की है।",
    "Yes, it is 1:15 p.m.": "हाँ, यह 1:15 अपराह्न है।",
    "Yes, the class lasts 2 hours 30 minutes.": "हाँ, कक्षा 2 घंटे 30 मिनट की है।",
    "A clock, a stopwatch and a day strip. Let us count the time.": "एक घड़ी, एक स्टॉपवॉच और दिन की पट्टी। चलो समय गिनें।",
    "You counted the time with the hour filling and the day turning.": "तुमने घंटा भरकर और दिन घुमाकर समय गिना।",
    "h": "घं.",
    "min": "मि.",
    "noon": "दोपहर",
    "midnight": "आधी रात",
    "a.m.": "पूर्वाह्न",
    "p.m.": "अपराह्न",
    "Hours": "घंटे",
    "Days": "दिन",
    "Bar": "पट्टी",
    "Add": "जोड़ो",
    "days": "दिन",
    "Slide the handle to the flag.": "बटन को झंडे तक खिसकाओ।",
    "Count the tiles in one row: that is the hours of one day.": "एक पंक्ति की टाइलें गिनो: वही एक दिन के घंटे हैं।",
    "Count the part before noon, then the part after noon.": "दोपहर से पहले का हिस्सा गिनो, फिर दोपहर के बाद का।",
    "Yes, it is 4 hours 15 minutes.": "हाँ, यह 4 घंटे 15 मिनट है।",
    "Turn the hand some more.": "सुई को थोड़ा और घुमाओ।",
    "Turn the wheel some more.": "पहिये को थोड़ा और घुमाओ।",
    "Not at the flag yet: slide the handle to it.": "अभी झंडे पर नहीं पहुँचे: बटन को वहाँ तक खिसकाओ।",
    "Keep turning the way a clock goes.": "घड़ी की सुइयों की दिशा में घुमाते रहो।",
    "Go on turning the way a clock goes.": "आगे भी घड़ी की दिशा में घुमाओ।",
    "Slide the end of the bar first.": "पहले पट्टी का छोर खिसकाओ।",
    "Up to 6 hours.": "6 घंटे तक।",
    "Up to 5 days.": "5 दिन तक।",
  },
  gu: {
    "Time Converter": "સમય બદલો",
    "Free play: type hours or days, turn the dial and slide the bar.": "મુક્ત રમત: કલાક કે દિવસ લખો, કાંટો ફેરવો અને પટ્ટી સરકાવો.",
    "How long is an hour? How long is a day?": "એક કલાક કેટલો લાંબો? એક દિવસ કેટલો લાંબો?",
    "Sixty minutes make an hour": "સાઠ મિનિટનો એક કલાક થાય",
    "Turn the blue minute hand once all the way round the clock.": "ભૂરા મિનિટ કાંટાને ઘડિયાળમાં એક આખું ચક્કર ફેરવો.",
    "Turn it round once more, and watch the hour hand creep.": "તેને ફરી એક ચક્કર ફેરવો અને કલાકના કાંટાને સરકતો જુઓ.",
    "The minute hand turns round once for every hour.": "દર કલાકે મિનિટનો કાંટો એક ચક્કર ફરે છે.",
    "Change each hour into minutes first, then add what is left over.": "પહેલાં દરેક કલાકને મિનિટમાં બદલો, પછી બાકીની મિનિટ ઉમેરો.",
    "One hour is sixty minutes, so hours change into minutes by multiplying by sixty.": "એક કલાક સાઠ મિનિટનો છે, તેથી કલાકને સાઠથી ગુણતાં મિનિટ મળે છે.",
    "You learned: 1 hour is 60 minutes, so hours times 60 make minutes.": "તમે શીખ્યા: 1 કલાક = 60 મિનિટ, તેથી કલાક × 60 = મિનિટ.",
    "A train journey takes 4 hours, so how many minutes is that?": "ટ્રેનની મુસાફરી 4 કલાકની છે, તો તે કેટલી મિનિટ થઈ?",
    "Minutes in all?": "કુલ કેટલી મિનિટ?",
    "The hours must be changed into minutes, one round of the minute hand each.": "કલાકને મિનિટમાં બદલવા છે, દરેક કલાક એટલે મિનિટના કાંટાનું એક ચક્કર.",
    "One round fills twelve tiles, and that row ends at sixty minutes.": "એક ચક્કરમાં બાર ટાઇલ ભરાય છે અને લીટી સાઠ મિનિટે પૂરી થાય છે.",
    "Four rounds make four rows of sixty, so add the rows.": "ચાર ચક્કર એટલે સાઠની ચાર લીટીઓ, તેથી લીટીઓ ઉમેરો.",
    "A school sports day lasts 2 hours 30 minutes: how many minutes in all?": "શાળાનો રમત દિવસ 2 કલાક 30 મિનિટ ચાલે છે: કુલ કેટલી મિનિટ?",
    "Two hours are two rounds of sixty before the 30 minutes.": "બે કલાક એટલે સાઠના બે ચક્કર, પછી 30 મિનિટ.",
    "Turn the hand twice: each full turn is worth sixty minutes.": "કાંટાને બે વાર ફેરવો: દરેક આખું ચક્કર સાઠ મિનિટનું છે.",
    "Put the minutes of the two rounds first, then add the 30 minutes after them.": "પહેલાં બંને ચક્કરની મિનિટ મૂકો, પછી તેમાં 30 મિનિટ ઉમેરો.",
    "How many minutes does a holiday bus ride of 1 hour 25 minutes take?": "રજામાં બસની 1 કલાક 25 મિનિટની સવારી કેટલી મિનિટની છે?",
    "Change the 1 hour into minutes before you add the 25.": "25 ઉમેરતાં પહેલાં 1 કલાકને મિનિટમાં બદલો.",
    "A full round of the minute hand is sixty minutes, and the 25 comes after it.": "મિનિટના કાંટાનું આખું ચક્કર સાઠ મિનિટ છે, તેના પછી 25 આવે છે.",
    "Count on from sixty, five minutes for each tile of the last row.": "સાઠથી આગળ ગણો, છેલ્લી લીટીની દરેક ટાઇલ પાંચ મિનિટની છે.",
    "Twenty-four hours make a day": "ચોવીસ કલાકનો એક દિવસ થાય",
    "Turn the day wheel once all the way round.": "દિવસના પૈડાને એક આખું ચક્કર ફેરવો.",
    "Turn it round once more for a second day.": "બીજા દિવસ માટે તેને ફરી એક ચક્કર ફેરવો.",
    "One turn of the wheel fills one day of hour tiles.": "પૈડાનું એક ચક્કર કલાકની ટાઇલનો એક દિવસ ભરે છે.",
    "Count the turns, then add the hours of each day.": "ચક્કર ગણો, પછી દરેક દિવસના કલાક ઉમેરો.",
    "One day is 24 hours, so days times 24 make hours.": "એક દિવસ 24 કલાકનો છે, તેથી દિવસ × 24 = કલાક.",
    "You learned: 1 day is 24 hours, so days times 24 make hours.": "તમે શીખ્યા: 1 દિવસ = 24 કલાક, તેથી દિવસ × 24 = કલાક.",
    "A holiday lasts 3 days, so how many hours is that?": "રજા 3 દિવસની છે, તો તે કેટલા કલાક થયા?",
    "Hours in all?": "કુલ કેટલા કલાક?",
    "Each day is one full turn of the wheel.": "દરેક દિવસ એટલે પૈડાનું એક આખું ચક્કર.",
    "One turn fills a row of sky blue and amber hour tiles.": "એક ચક્કર આસમાની અને પીળી કલાકની ટાઇલની એક લીટી ભરે છે.",
    "Take the hours of one turn and use them for each of the 3 days.": "એક ચક્કરના કલાક લો અને 3 દિવસમાંથી દરેક માટે વાપરો.",
    "A school camp lasts 4 days: how many hours in all?": "શાળાનો શિબિર 4 દિવસનો છે: કુલ કેટલા કલાક?",
    "One row of tiles is twelve sky blue ones and twelve amber ones.": "ટાઇલની એક લીટીમાં બાર આસમાની અને બાર પીળી છે.",
    "Four days mean four equal rows, so put the rows together.": "ચાર દિવસ એટલે ચાર સરખી લીટીઓ, તેમને ભેગી કરો.",
    "How many hours does a train tour of 5 days take?": "5 દિવસના ટ્રેન પ્રવાસમાં કેટલા કલાક થાય?",
    "Look at the wheel and count the hours in one whole day.": "પૈડાને જુઓ અને એક આખા દિવસના કલાક ગણો.",
    "The sky blue half and the amber half together make one day.": "આસમાની અડધું અને પીળું અડધું મળીને એક દિવસ બને.",
    "A tour of 5 days is five of those days, one after another.": "5 દિવસનો પ્રવાસ એવા પાંચ દિવસ છે, એક પછી એક.",
    "How long did it take?": "કેટલો સમય લાગ્યો?",
    "Drag the bar's round handle along the strip to the flag.": "પટ્ટીના ગોળ બટનને ખેંચીને ધ્વજ સુધી લઈ જાઓ.",
    "Now tap Add to join the two pieces of the bar.": "હવે 'ઉમેરો' પર ટેપ કરીને પટ્ટીના બે ટુકડા જોડો.",
    "Tap the Add key.": "ઉમેરો કી પર ટેપ કરો.",
    "The bar splits at noon, so count each piece and add them.": "પટ્ટી બપોરે વહેંચાય છે, દરેક ટુકડો ગણો અને ઉમેરો.",
    "For an end time, slide on by the hours first, then by the minutes.": "અંતનો સમય મેળવવા પહેલાં કલાક, પછી મિનિટ આગળ વધારો.",
    "Count to noon and from noon, then add; for an end time add hours first.": "બપોર સુધી અને તેના પછી ગણો, પછી ઉમેરો; અંતનો સમય મેળવવા પહેલાં કલાક ઉમેરો.",
    "You learned: count to noon, then on from noon, and add.": "તમે શીખ્યા: બપોર સુધી ગણો, પછી બપોરથી આગળ ગણો અને ઉમેરો.",
    "A train leaves at 9:30 a.m., reaches at 1:45 p.m.: how long?": "ટ્રેન 9:30 પૂર્વાહ્ન નીકળી, 1:45 અપરાહ્ન પહોંચી: કેટલી વાર?",
    "How long?": "કેટલી વાર?",
    "Add both pieces, and turn 60 of the minutes into one more hour.": "બંને ટુકડા ઉમેરો અને 60 મિનિટને એક વધુ કલાક બનાવો.",
    "Add the hours of both pieces, then the minutes of both pieces.": "બંને ટુકડાના કલાક ઉમેરો, પછી બંનેની મિનિટ ઉમેરો.",
    "hours": "કલાક",
    "minutes": "મિનિટ",
    "A bus runs 2 hours 45 minutes from 10:30 a.m.: when does it end?": "બસ 10:30 પૂર્વાહ્નથી 2 કલાક 45 મિનિટ ચાલે છે: ક્યારે પહોંચશે?",
    "When does it end?": "તે ક્યારે પહોંચશે?",
    "Slide the bar on by the hours first, then by the minutes.": "પટ્ટીને પહેલાં કલાકથી, પછી મિનિટથી આગળ સરકાવો.",
    "Move the end on two hours from 10:30 before you think of the minutes.": "મિનિટ વિચારતાં પહેલાં છેડાને 10:30થી બે કલાક આગળ લઈ જાઓ.",
    "After the two hours, add the minutes and see which side of noon you are on.": "બે કલાક પછી મિનિટ ઉમેરો અને જુઓ બપોરની કઈ બાજુ છો.",
    "Art class starts at 2:15 p.m., ends at 4:45 p.m.: how long?": "કલા વર્ગ 2:15 અપરાહ્ન શરૂ, 4:45 અપરાહ્ન પૂરો: કેટલી વાર?",
    "Both times are after noon, so count straight along the bar.": "બંને સમય બપોર પછીના છે, તેથી પટ્ટી પર સીધું ગણો.",
    "Count on one hour at a time from 2:15, and see what is left.": "2:15થી એક-એક કલાક આગળ ગણો અને જુઓ શું બાકી રહ્યું.",
    "Then count the minutes that are left, in quarters of an hour.": "પછી બાકીની મિનિટ ગણો, કલાકના ચોથા ભાગમાં.",
    "Yes, 4 hours make 240 minutes.": "હા, 4 કલાકની 240 મિનિટ થાય છે.",
    "Yes, that is 150 minutes in all.": "હા, કુલ 150 મિનિટ થઈ.",
    "Yes, 60 and 25 make 85 minutes.": "હા, 60 અને 25 મળીને 85 મિનિટ થાય છે.",
    "Yes, 3 days make 72 hours.": "હા, 3 દિવસના 72 કલાક થાય છે.",
    "Yes, 96 hours fit in 4 days.": "હા, 4 દિવસમાં 96 કલાક થાય છે.",
    "Yes, a 5 day tour lasts 120 hours.": "હા, 5 દિવસનો પ્રવાસ 120 કલાકનો છે.",
    "Yes, it is 1:15 p.m.": "હા, તે 1:15 અપરાહ્ન છે.",
    "Yes, the class lasts 2 hours 30 minutes.": "હા, વર્ગ 2 કલાક 30 મિનિટનો છે.",
    "A clock, a stopwatch and a day strip. Let us count the time.": "એક ઘડિયાળ, એક સ્ટોપવૉચ અને દિવસની પટ્ટી. ચાલો સમય ગણીએ.",
    "You counted the time with the hour filling and the day turning.": "તમે કલાક ભરીને અને દિવસ ફેરવીને સમય ગણ્યો.",
    "h": "ક.",
    "min": "મિ.",
    "noon": "બપોર",
    "midnight": "અડધી રાત",
    "a.m.": "પૂર્વાહ્ન",
    "p.m.": "અપરાહ્ન",
    "Hours": "કલાક",
    "Days": "દિવસ",
    "Bar": "પટ્ટી",
    "Add": "ઉમેરો",
    "days": "દિવસ",
    "Slide the handle to the flag.": "બટનને ધ્વજ સુધી સરકાવો.",
    "Count the tiles in one row: that is the hours of one day.": "એક લીટીની ટાઇલ ગણો: તે જ એક દિવસના કલાક છે.",
    "Count the part before noon, then the part after noon.": "બપોર પહેલાનો ભાગ ગણો, પછી બપોર પછીનો.",
    "Yes, it is 4 hours 15 minutes.": "હા, તે 4 કલાક 15 મિનિટ છે.",
    "Turn the hand some more.": "કાંટાને થોડો વધુ ફેરવો.",
    "Turn the wheel some more.": "પૈડાને થોડું વધુ ફેરવો.",
    "Not at the flag yet: slide the handle to it.": "હજી ધ્વજ પર નથી: બટનને ત્યાં સુધી સરકાવો.",
    "Keep turning the way a clock goes.": "ઘડિયાળના કાંટાની દિશામાં ફેરવતા રહો.",
    "Go on turning the way a clock goes.": "આગળ પણ ઘડિયાળની દિશામાં ફેરવો.",
    "Slide the end of the bar first.": "પહેલાં પટ્ટીનો છેડો સરકાવો.",
    "Up to 6 hours.": "6 કલાક સુધી.",
    "Up to 5 days.": "5 દિવસ સુધી.",
  },
};

/* One entry per phase = one mount.
   items carry the numbers the picture draws: kind "hm" (H hours, M minutes), "days" (D days, d0 the first date), "dur" (s start, e end, in
   minutes after midnight, a quarter hour apart), "end" (s start, len length, answered on the bar: pad "enter", the answer is minutes
   after midnight). `win` is the one sentence said at a right answer. */
const PHASES = [
  {
    n: 1,
    concept: "Sixty minutes make an hour",
    conceptId: "M1.S2.T4.C17", objectiveIds: ["O5"],
    says: ["One round of the minute hand fills an hour. How many minutes are in it?"],
    /* a warm-up on a different journey (2 hours): the two steps turn the minute hand round once and once more */
    steps: [
      { say: "Turn the blue minute hand once all the way round the clock.", on: "hand", hint: "Keep turning the way a clock goes." },
      { say: "Turn it round once more, and watch the hour hand creep.", on: "hand", hint: "Go on turning the way a clock goes." },
    ],
    stepHold: 2400,
    ladder: ["The minute hand turns round once for every hour.", "Change each hour into minutes first, then add what is left over."],
    closing: "One hour is sixty minutes, so hours change into minutes by multiplying by sixty.",
    learned: "You learned: 1 hour is 60 minutes, so hours times 60 make minutes.",
    traceback: "The hour rows light one after another, each worth sixty, then the extra minutes; the working stops before the total.",
    items: [
      { qid: null, kind: "hm", H: 4, M: 0, say: "A train journey takes 4 hours, so how many minutes is that?", ask: "Minutes in all?", answer: 240,
        miss: "The hours must be changed into minutes, one round of the minute hand each.",
        ladder: ["One round fills twelve tiles, and that row ends at sixty minutes.", "Four rounds make four rows of sixty, so add the rows."],
        win: "Yes, 4 hours make 240 minutes.", winMs: 3800 },
      { qid: null, kind: "hm", H: 2, M: 30, say: "A school sports day lasts 2 hours 30 minutes: how many minutes in all?", ask: "Minutes in all?", answer: 150,
        miss: "Two hours are two rounds of sixty before the 30 minutes.",
        ladder: ["Turn the hand twice: each full turn is worth sixty minutes.", "Put the minutes of the two rounds first, then add the 30 minutes after them."],
        win: "Yes, that is 150 minutes in all.", winMs: 3700 },
      { qid: null, kind: "hm", H: 1, M: 25, say: "How many minutes does a holiday bus ride of 1 hour 25 minutes take?", ask: "Minutes in all?", answer: 85,
        miss: "Change the 1 hour into minutes before you add the 25.",
        ladder: ["A full round of the minute hand is sixty minutes, and the 25 comes after it.", "Count on from sixty, five minutes for each tile of the last row."],
        win: "Yes, 60 and 25 make 85 minutes.", winMs: 3800 },
    ],
  },
  {
    n: 2,
    concept: "Twenty-four hours make a day",
    conceptId: "M1.S2.T4.C18", objectiveIds: ["O5"],
    says: ["The wheel turns once for one day. How many hours is that? Now for each day."],
    steps: [
      { say: "Turn the day wheel once all the way round.", on: "wheel", hint: "Keep turning the way a clock goes." },
      { say: "Turn it round once more for a second day.", on: "wheel", hint: "Go on turning the way a clock goes." },
    ],
    stepHold: 2400,
    ladder: ["One turn of the wheel fills one day of hour tiles.", "Count the turns, then add the hours of each day."],
    closing: "One day is 24 hours, so days times 24 make hours.",
    learned: "You learned: 1 day is 24 hours, so days times 24 make hours.",
    traceback: "The day rows light one after another, each worth twenty-four; the working stops before the total.",
    items: [
      { qid: null, kind: "days", D: 3, d0: 6, say: "A holiday lasts 3 days, so how many hours is that?", ask: "Hours in all?", answer: 72,
        miss: "Each day is one full turn of the wheel.",
        ladder: ["One turn fills a row of sky blue and amber hour tiles.", "Take the hours of one turn and use them for each of the 3 days."],
        win: "Yes, 3 days make 72 hours.", winMs: 3000 },
      { qid: null, kind: "days", D: 4, d0: 15, say: "A school camp lasts 4 days: how many hours in all?", ask: "Hours in all?", answer: 96,
        miss: "Count the tiles in one row: that is the hours of one day.",
        ladder: ["One row of tiles is twelve sky blue ones and twelve amber ones.", "Four days mean four equal rows, so put the rows together."],
        win: "Yes, 96 hours fit in 4 days.", winMs: 3000 },
      { qid: null, kind: "days", D: 5, d0: 3, say: "How many hours does a train tour of 5 days take?", ask: "Hours in all?", answer: 120,
        miss: "Look at the wheel and count the hours in one whole day.",
        ladder: ["The sky blue half and the amber half together make one day.", "A tour of 5 days is five of those days, one after another."],
        win: "Yes, a 5 day tour lasts 120 hours.", winMs: 3600 },
    ],
  },
  {
    n: 3,
    concept: "How long did it take?",
    conceptId: "M1.S2.T4.C19", objectiveIds: ["O6"],
    says: ["Lay the bar from the start to the end. Count to noon, then on from noon."],
    steps: [
      { say: "Drag the bar's round handle along the strip to the flag.", on: "bar", hint: "Slide the handle to the flag." },
      { say: "Now tap Add to join the two pieces of the bar.", on: "add", hint: "Tap the Add key." },
    ],
    stepHold: 2400,
    ladder: ["The bar splits at noon, so count each piece and add them.", "For an end time, slide on by the hours first, then by the minutes."],
    closing: "Count to noon and from noon, then add; for an end time add hours first.",
    learned: "You learned: count to noon, then on from noon, and add.",
    traceback: "The bar's pieces light one after another and are counted (the minutes carry shows as steps); the working stops before the total or the end time.",
    items: [
      /* a journey across noon with a carry: 2 h 30 min before noon + 1 h 45 min after = 3 h 75 min = 4 h 15 min (near = the carry forgotten);
         the start is 9:30, not 9:15, so no number in the question lines equals the answer's 15 */
      { qid: null, kind: "dur", s: 570, e: 825, train: true, near: "3|75", parts: [{ label: "hours" }, { label: "minutes" }], answer: [4, 15],
        say: "A train leaves at 9:30 a.m., reaches at 1:45 p.m.: how long?", ask: "How long?",
        miss: "Count the part before noon, then the part after noon.",
        ladder: ["Add the hours of both pieces, then the minutes of both pieces.", "Add both pieces, and turn 60 of the minutes into one more hour."],
        win: "Yes, it is 4 hours 15 minutes.", winMs: 8500 },
      /* near 675 = 11:15 a.m. (630 + 45: the minutes added, the hours lost) */
      { qid: null, kind: "end", s: 630, len: 165, near: 675, pad: "enter", answer: 795,
        say: "A bus runs 2 hours 45 minutes from 10:30 a.m.: when does it end?", ask: "When does it end?",
        miss: "Slide the bar on by the hours first, then by the minutes.",
        ladder: ["Move the end on two hours from 10:30 before you think of the minutes.", "After the two hours, add the minutes and see which side of noon you are on."],
        win: "Yes, it is 1:15 p.m.", winMs: 6000 },
      /* near 3|0 = the three tiles the bar touches */
      { qid: null, kind: "dur", s: 855, e: 1005, near: "3|0", parts: [{ label: "hours" }, { label: "minutes" }], answer: [2, 30],
        say: "Art class starts at 2:15 p.m., ends at 4:45 p.m.: how long?", ask: "How long?",
        miss: "Both times are after noon, so count straight along the bar.",
        ladder: ["Count on one hour at a time from 2:15, and see what is left.", "Then count the minutes that are left, in quarters of an hour."],
        win: "Yes, the class lasts 2 hours 30 minutes.", winMs: 7000 },
    ],
  },
];

/* the warm-ups the guide steps work on: their results are none of the phase's answers */
const WARM: any = {
  1: { kind: "hm", H: 2, M: 0 },
  2: { kind: "days", D: 2, d0: 5 },
  3: { kind: "dur", s: 660, e: 840 },
};
const FREE_ITEM: any = { kind: "free", s: 600 };

/* The numbers, rows, sizes and targets the working area needs (they go into the sidecar too). */
const MODEL = { window: [TC_WS, TC_WE], snapMinutes: 15, minutesInHour: 60, hoursInDay: 24, tilesInHour: 12, tilesInDay: 24, maxFreeRows: 4 };

/* ── time helpers ─────────────────────────────────────────────────────────────────────────── */
const tcClock = (m: number) => {
  const h = Math.floor(m / 60) % 24;
  return { h: h % 12 === 0 ? 12 : h % 12, h24: h, m: m % 60, w: m === 720 ? "noon" : m % 1440 === 0 ? "midnight" : h < 12 ? "a.m." : "p.m." };
};
const tcPad = (v: number) => String(v).padStart(2, "0");
const tcStr = (m: number) => { const c = tcClock(m); return c.w === "noon" || c.w === "midnight" ? "12 " + c.w : c.h + ":" + tcPad(c.m) + " " + c.w; };
const tcForms = (m: number) => { const c = tcClock(m); return [String(m), c.h + ":" + tcPad(c.m), tcStr(m), c.h24 + ":" + tcPad(c.m)]; };

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* judge: is this value right for this item? (numbers compare as numbers) */
const judge = (item: any, v: any) => {
  if (item.parts) return judgeSlotParts(item, v);
  if (typeof item.answer === "number") return leadNumber(v) === item.answer;
  return String(v).trim().toLowerCase() === String(item.answer).trim().toLowerCase();
};
/* oracle: every answer re-derived by a second route that shares no code with judge or Work */
const oracle = () => PHASES.every((p: any) => p.items.every((it: any) => {
  if (it.kind === "hm") return it.answer === it.H * 60 + it.M && it.M % 5 === 0;
  if (it.kind === "days") return it.answer === it.D * 24;
  if (it.kind === "dur") { const d = it.e - it.s; return it.answer[0] === (d - (d % 60)) / 60 && it.answer[1] === d % 60 && it.e % 15 === 0 && it.s % 15 === 0; }
  if (it.kind === "end") return it.answer === it.s + it.len && it.len % 60 !== 0;
  return false;
}));
/* the most likely wrong answer (the misconception); judge must reject it: hours and minutes joined (or the hours left unconverted when there are
   no minutes), days times 60, and in phase 3 each item's own `near` (the carry forgotten, the hours lost, the tiles the bar touches) */
const nearMiss = (item: any) => (item.near !== undefined ? item.near
  : item.kind === "hm" ? (item.M ? Number("" + item.H + item.M) : item.H)
  : item.kind === "days" ? item.D * 60 : "~");
/* the forms of an answer that no question, hint or ladder line may print */
const answerForms = (item: any) => (item.kind === "end" ? tcForms(item.answer)
  : item.parts ? item.answer.filter((x: number) => x >= 10).flatMap((x: number) => [String(x), indian(x), words(x)])
  : typeof item.answer === "number" ? [String(item.answer), indian(item.answer), words(item.answer)] : [String(item.answer)]);
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => item.answer;

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => (T.state().stage === "demo" ? HOOK.demo && HOOK.demo() : T.submit(item.answer));
/* the agent's answer() for an item made on the working area (the bar's end): set it as a child would; undefined = type it */
const answer = (item: any, v: any) => (item.pad === "enter" && HOOK.set ? HOOK.set(v) : undefined);
/* the agent's check() before Enter: finish the act at once (fill the tiles, lay the bar); undefined = press Enter. In a guide-steps phase
   (stage "demo") it must return undefined, so HOOK.check is set only while a question is open */
const check = () => (HOOK.check ? HOOK.check() : undefined);

/* ── drawing helpers (pure: called, never mounted) ───────────────────────────────────────── */
function tcPt(cx: number, cy: number, r: number, deg: number) {
  const a = deg * Math.PI / 180;
  return { x: cx + r * Math.sin(a), y: cy - r * Math.cos(a) };
}
function tcWedge(cx: number, cy: number, r: number, a: number, w: number) {
  const p1 = tcPt(cx, cy, r, a), p2 = tcPt(cx, cy, r, a + w);
  return "M" + cx + "," + cy + " L" + p1.x.toFixed(2) + "," + p1.y.toFixed(2) + " A" + r + "," + r + " 0 " + (w > 180 ? 1 : 0) + " 1 " + p2.x.toFixed(2) + "," + p2.y.toFixed(2) + " Z";
}
/* the wall clock: A is the minute hand's turned angle in degrees (it may run past 360); the hour hand creeps A / 12 */
function tcClockFace({ cx, cy, r, A, C }: any) {
  const mA = A % 360, hA = (A / 12) % 360, out: any[] = [];
  /* no filter on the hands: a filter on a vertical or horizontal line has an empty box and draws nothing (BUILD_CARD §6) */
  out.push(<circle key="f-bg" cx={cx} cy={cy} r={r + 8} fill={C.rule || "#C9BCA6"} filter="url(#tc-shadow)" />);
  out.push(<circle key="f" cx={cx} cy={cy} r={r} fill="#FFF9EC" stroke={C.ink} strokeWidth={5} />);
  for (let i = 0; i < 60; i++) {
    const big = i % 5 === 0, p1 = tcPt(cx, cy, r - 5, i * 6), p2 = tcPt(cx, cy, r - (big ? 20 : 11), i * 6);
    out.push(<line key={"t" + i} x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke={C.ink} strokeWidth={big ? 4 : 2} strokeLinecap="round" />);
  }
  const hp = tcPt(cx, cy, r * 0.42, hA), ht = tcPt(cx, cy, -14, hA), mp = tcPt(cx, cy, r * 0.84, mA), mt = tcPt(cx, cy, -16, mA);
  out.push(<line key="hh" x1={ht.x} y1={ht.y} x2={hp.x} y2={hp.y} stroke={TC_HOUR} strokeWidth={17} strokeLinecap="round" />);
  out.push(<line key="mh" x1={mt.x} y1={mt.y} x2={mp.x} y2={mp.y} stroke={TC_MIN} strokeWidth={6} strokeLinecap="round" />);
  out.push(<circle key="cap-bg" cx={cx} cy={cy} r={11} fill={C.ink} />);
  out.push(<circle key="cap" cx={cx} cy={cy} r={6} fill="#E8C86A" />);
  /* the numbers are drawn over the hands, with a cream halo, so a hand never hides one */
  for (let k = 1; k <= 12; k++) {
    const p = tcPt(cx, cy, r * 0.64, k * 30);
    out.push(<text key={"n" + k} x={p.x} y={p.y + 12} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink} stroke="#FFF9EC" strokeWidth={6} paintOrder="stroke">{k}</text>);
  }
  return <g>{out}</g>;
}
/* the tile rows: kind 1 = hours (five-minute tiles, a row an hour), kind 2 = days (hour tiles, a row a day). tiles = how many are filled,
   hiN = how many rows the correction has lit, ghost = tiles the correction fills in a demo-only way */
function tcRowsPic({ g, N, per, tiles, kind, hiN, ghost, C, tx }: any) {
  const rows = Math.ceil(N / per), out: any[] = [], tN = Math.max(tiles, ghost || 0);
  for (let k = 0; k < rows; k++) {
    const y = g.y0 + k * g.py, cnt = Math.min(per, N - k * per), partial = cnt < per, done = tN >= k * per + cnt;
    const cells: any[] = [];
    for (let j = 0; j < cnt; j++) {
      const on = k * per + j < tN, x = g.x0 + j * g.pitch;
      const base = kind === 1 ? "url(#tc-grad-min)" : j < 12 ? "url(#tc-grad-am)" : "url(#tc-grad-pm)";
      const flatBase = kind === 1 ? TC_MIN : j < 12 ? TC_AM : TC_PM;
      cells.push(
        <rect key={"c" + j} x={x} y={y} width={g.w} height={g.h} rx={6}
          fill={on ? base : kind === 1 ? tint(C.panel, 0.55) : tint(flatBase, 0.72)}
          stroke={C.ink} strokeWidth={on ? 3 : 2.4}
          filter={on ? "url(#tc-shadow)" : undefined} />
      );
      if (kind === 1 && on && g.h >= 36) {
        cells.push(
          <text key={"d" + j} x={x + g.w / 2} y={y + g.h / 2 + 10} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill="#FFFFFF" stroke={C.ink} strokeWidth={1.5} paintOrder="stroke">
            {(j + 1) * 5}
          </text>
        );
      }
    }
    /* tight: free play's 4 or 5 day rows packed above the keys; the badges shrink to plain dots so they never run into each other */
    const tight = kind === 2 && g.py < 34;
    const bc = partial ? TC_MIN : kind === 1 ? TC_HOUR : C.ink, by = y + g.h / 2, br = tight ? Math.max(6, Math.floor(g.py / 2) - 2) : kind === 2 ? 15 : 22, bf = kind === 2 ? T.micro : T.label;
    out.push(
      <g key={"row" + k}>
        {k < hiN && <rect x={g.x0 - 7} y={y - 7} width={cnt * g.pitch + 9} height={g.h + 14} rx={10} fill="none" stroke={partial ? TC_MIN : TC_HOUR} strokeWidth={6} />}
        {cells}
        {done
          ? <g filter="url(#tc-shadow)"><circle cx={g.bx} cy={by} r={br} fill={bc} stroke={C.ink} strokeWidth={3} />{!tight && <text x={g.bx} y={by + (kind === 2 ? 9 : 11)} textAnchor="middle" fontSize={bf} fontWeight={700} fill={partial ? C.ink : "#FFFFFF"}>{partial ? "+" : k + 1}</text>}</g>
          : <circle cx={g.bx} cy={by} r={br} fill="none" stroke={C.ink} strokeWidth={2.4} strokeDasharray="5 6" />}
        {kind === 2 && done && g.py >= 34 && <text x={g.x0 + per * g.pitch + 8} y={by + 11} fontSize={T.label} fontWeight={700} fill={C.ink}>24</text>}
      </g>
    );
  }
  return out;
}
/* a time, written the clock family's way: hour vermilion, minutes deep blue, a.m. sky blue, p.m. amber */
function tcTime({ x, y, size, m, anchor = "middle", tx, C, ink, noWord }: any) {
  const c = tcClock(m), noon = c.w === "noon" || c.w === "midnight";
  const wc = c.w === "a.m." ? shade(TC_AM, 0.5) : c.w === "p.m." ? shade(TC_PM, 0.5) : C.ink;
  return (
    <text x={x} y={y} textAnchor={anchor} fontSize={size} fontWeight={700} fill={ink || C.ink} stroke={C.paper} strokeWidth={6} paintOrder="stroke">
      {noon
        ? [<tspan key="a" fill={shade(TC_HOUR, 0.25)}>12</tspan>, <tspan key="b" fill={wc}>{" " + tx(c.w)}</tspan>]
        : [<tspan key="a" fill={shade(TC_HOUR, 0.25)}>{c.h}</tspan>, <tspan key="b" fill={C.ink}>:</tspan>, <tspan key="c" fill={shade(TC_MIN, 0.1)}>{tcPad(c.m)}</tspan>, noWord ? null : <tspan key="d" fill={wc}>{" " + tx(c.w)}</tspan>]}
    </text>
  );
}
/* a length of time: "2 h 30 min", the hours vermilion and the minutes deep blue */
function tcDurText({ x, y, size, mins, anchor = "middle", tx, C }: any) {
  const h = Math.floor(mins / 60), m = mins % 60, parts: any[] = [];
  if (h > 0) parts.push(<tspan key="h" fill={shade(TC_HOUR, 0.25)}>{h}</tspan>, <tspan key="hu" fill={C.ink}>{" " + tx("h")}</tspan>);
  if (m > 0 || h === 0) parts.push(<tspan key="m" dx={h > 0 ? 8 : 0} fill={shade(TC_MIN, 0.1)}>{m}</tspan>, <tspan key="mu" fill={C.ink}>{" " + tx("min")}</tspan>);
  return <text x={x} y={y} textAnchor={anchor} fontSize={size} fontWeight={700} stroke={C.paper} strokeWidth={6} paintOrder="stroke">{parts}</text>;
}
/* how many steps the correction takes for an item (it lights the working and stops before the answer) */
function tcTraceLen(it: any) {
  if (!it) return 1;
  if (it.kind === "hm") return it.H + (it.M ? 1 : 0);
  if (it.kind === "days") return it.D;
  if (it.kind === "dur") return it.s < 720 && it.e > 720 ? 2 : Math.max(1, Math.floor((it.e - it.s) / 60));
  if (it.kind === "end") return Math.max(1, Math.floor(it.len / 60));
  return 1;
}
/* a length as "2 h 30 min" (units through tx) */
const tcDurStr = (mins: number, tx: any) => { const h = Math.floor(mins / 60), m = mins % 60; return (h > 0 ? h + " " + tx("h") : "") + (h > 0 && m > 0 ? " " : "") + (m > 0 || h === 0 ? m + " " + tx("min") : ""); };
/* the step-by-step working of a duration or end-time item, as short written lines (each at most four items: labels-short). In the correction
   (win false) it stops one step before the answer: across noon the hours are added and, when the minutes carry, the minutes are added (the carry
   is left for the child); on a straight bar or for an end time the whole hours are counted on. At the win the lines go on to the answer. */
function tcLines(it: any, tx: any, win: boolean) {
  /* written close up ("2+1=3 h"): each line is at most four words (labels-short) and still reads as a sum */
  const U = tx("h"), Mn = tx("min"), t = (m: number) => { const c = tcClock(m); return c.h + ":" + tcPad(c.m); };
  if (!it) return [];
  if (it.kind === "end") {
    const H = Math.floor(it.len / 60), M = it.len % 60, mid = it.s + H * 60, e = it.s + it.len, L = [t(it.s) + "+" + H + " " + U + "=" + t(mid)];
    if (win) L.push(t(mid) + "+" + M + " " + Mn + "=" + t(e));
    return L;
  }
  if (it.kind !== "dur") return [];
  const d = it.e - it.s;
  if (it.s < 720 && it.e > 720) {
    const p1 = 720 - it.s, p2 = it.e - 720, h1 = Math.floor(p1 / 60), h2 = Math.floor(p2 / 60), m1 = p1 % 60, m2 = p2 % 60, hs = h1 + h2, ms = m1 + m2;
    const L = [h1 + "+" + h2 + "=" + hs + " " + U];
    if (ms >= 60 || win) L.push(m1 + "+" + m2 + "=" + ms + " " + Mn);
    if (win) {
      if (ms >= 60) { L.push(ms + " " + Mn + "=1 " + U + "+" + (ms - 60) + " " + Mn); L.push(hs + " " + U + "+1 " + U + "+" + (ms - 60) + " " + Mn); }
      else L.push(hs + " " + U + "+" + ms + " " + Mn);
      L.push("=" + tcDurStr(d, tx));
    }
    return L;
  }
  const H = Math.floor(d / 60), M = d % 60, mid = it.s + H * 60, L = [t(it.s) + "+" + H + " " + U + "=" + t(mid)];
  if (win) {
    if (M > 0) { L.push(t(mid) + "+" + M + " " + Mn + "=" + t(it.e)); L.push(H + " " + U + "+" + M + " " + Mn); }
    L.push("=" + tcDurStr(d, tx));
  }
  return L;
}
const tcFresh = (qk: string, it: any) => ({ qk, tiles: 0, touched: false, trace: -1, end: it && it.s != null ? it.s : 0, added: false, mode: "hours", H: 2, D: 2, a: 600, b: 780, capt: false, countTapped: false, countTyped: false, capNote: false });

/* ── the working area ────────────────────────────────────────────────────────────────────────
   keyOnly (LAYOUT.md §1d): 64,108, 1472 x 520 shut and 900 x 520 open (bigPad); nothing under box.key. The picture is laid out in a fixed 900-wide room
   (so it never jumps when the keypad opens) and centred in the room there is (ox). Every act goes through api.act. */
function Work({ phase, n, item, index, stage, wrong, typed, captured, api, MODEL, step, stepOn, box, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();
  const free = stage === "free";
  const warm = !free && (stage === "teach" || stage === "demo");
  const win = !free && !warm && (stage === "win" || stage === "idle");
  const st = stage === "teach" ? 0 : step || 0;
  const it: any = free ? FREE_ITEM : warm ? WARM[n] || item : item;
  const qk = free ? "free" : n + "." + (warm ? "w" : index);
  const [raw, setRaw] = useState<any>(() => tcFresh(qk, it));
  const S: any = raw.qk === qk ? raw : tcFresh(qk, it);
  const qkRef = useRef(qk); qkRef.current = qk;
  const Sref = useRef(S); Sref.current = S;
  const endRef = useRef(S.end); endRef.current = S.end;
  const busy = useRef(false);
  const gl = useRef(false);
  const dgr = useRef<any>({ on: false });
  /* every write goes through put: a late act of an old question writes nothing */
  const put = (patch: any) => {
    if (qkRef.current !== qk) return;
    setRaw((prev: any) => { const b = prev.qk === qk ? prev : tcFresh(qk, it); return { ...b, ...(typeof patch === "function" ? patch(b) : patch) }; });
  };

  /* the room: the picture keeps ONE place, the one it has with the keypad open (x 0 to 900), so it never jumps when the keypad opens or shuts
     (and a drag that locks the pad does not slide under the finger) */
  const ox = 0;
  const V = free ? S.mode : n === 1 ? "hours" : n === 2 ? "days" : "bar";
  const per = V === "hours" ? 12 : 24, sd = 360 / per;
  const dial = V === "hours" ? TC_CLK : TC_WHL, kr = V === "hours" ? dial.r * 0.84 : dial.r * 0.78;
  const N = V === "hours" ? (free ? S.H * 12 : it.H * 12 + (it.M || 0) / 5) : V === "days" ? (free ? S.D * 24 : it.D * 24) : 0;
  const capN = warm ? Math.min(N, (st + 1) * per) : N;
  const actName = V === "hours" ? "hand" : "wheel";
  const BAR_Y = TC_B.barY + TC_B.barH / 2;

  /* the drag (the minute hand, the wheel's handle, the bar's ends); a tap, Enter or Space arrives with NaN and does the act for the child */
  const dd = useDrag((payload: any, at: any, moved: boolean) => {
    if (qkRef.current !== qk) return;
    const ok = !!moved && isFinite(at.x) && isFinite(at.y);
    if (payload.id === "hand" || payload.id === "wheel") {
      const q = dgr.current;
      if (ok && q && q.on) {
        const A = q.base * sd + q.acc;
        const fin = Math.max(Sref.current.tiles, Math.min(capN, Math.floor((A + 4) / sd)));
        dgr.current = { on: false };
        if (fin > Sref.current.tiles) { put({ tiles: fin, touched: true }); api.sfx.settle(); reportTurn(fin); }
        if (warm && fin < (st + 1) * per) api.did("drag");   /* short or backward: the step's own hint */
        if (!warm && fin < N) nudgeSay();
        return;
      }
      dgr.current = { on: false };
      turnAuto();
    } else if (ok) setBarTo(payload.id, tcSnap(tcMin(at.x - ox)));
    else barTap(payload.id);
  });
  const dg = dd.drag;

  /* the dial's live turn: the cumulative angle of the pointer round the centre, forward only */
  let liveTiles = S.tiles, liveA = S.tiles * sd;
  if (V !== "bar" && dg && dg.payload && dg.payload.id === actName) {
    const th = Math.atan2(dg.x - ox - dial.cx, -(dg.y - dial.cy)) * 180 / Math.PI;
    if (!dgr.current.on) dgr.current = { on: true, last: th, acc: 0, base: S.tiles, k: "" };
    else {
      const q = dgr.current, kk = dg.x + "," + dg.y;
      if (q.k !== kk) { let d = th - q.last; d = ((((d + 540) % 360) + 360) % 360) - 180; q.acc += d; q.last = th; q.k = kk; }
    }
    const A = dgr.current.base * sd + dgr.current.acc;
    liveTiles = Math.max(S.tiles, Math.min(capN, Math.floor((A + 4) / sd)));
    liveA = Math.max(S.tiles * sd, Math.min(capN * sd, A));
  } else if (dgr.current.on) dgr.current = { on: false };
  /* the bar's live ends */
  let barA = free ? S.a : it.s, barB = free ? S.b : S.end;
  if (V === "bar" && dg && dg.payload) {
    const mv = tcSnap(tcMin(dg.x - ox));
    if (dg.payload.id === "bar") barB = tcClamp(mv, free ? S.a : it.s, TC_WE);
    else if (dg.payload.id === "bar-start") barA = tcClamp(mv, TC_WS, S.b);
  }
  /* at the win the picture holds the right answer whatever the agent did on the way */
  if (win && V === "bar") { if (it.kind === "dur") barB = it.e; else if (it.kind === "end") barB = it.s + it.len; }
  const shownTiles = win ? N : liveTiles;
  if (win && V !== "bar") liveA = N * sd;   /* the hands agree with the answer: 85 minutes leaves the minute hand on the 5 and the hour hand just past the 1 */

  /* ── the acts ── */
  const reportTurn = (t: number) => { if (warm && stepOn === actName && t >= (st + 1) * per) api.did(actName); };
  /* a tap on the hand or the wheel's handle turns it for the child, round to the end of the next row */
  const turnAuto = async () => {
    if (busy.current) return;
    const base = Sref.current.tiles, target = Math.min(capN, (Math.floor(base / per) + 1) * per);
    if (target <= base) { reportTurn(base); return; }
    busy.current = true; put({ touched: true });
    const pts: any[] = [];
    for (let t = base + 1; t <= target; t++) { const p = tcPt(dial.cx + ox, dial.cy, kr, t * sd); pts.push(p); }
    const p0 = tcPt(dial.cx + ox, dial.cy, kr, base * sd);
    const ok = await api.act({ tool: "hand", moves: "sweep", from: p0, at: pts, ms: 900, onPoint: (i: number) => put((p: any) => ({ tiles: Math.max(p.tiles, base + i + 1) })) });
    busy.current = false;
    if (!ok || qkRef.current !== qk) return;
    put({ tiles: target }); api.sfx.settle(); reportTurn(target);
    if (!warm && target < N) nudgeSay();
  };
  /* the bar: set an end to a minute (a drag's drop, an arrow key); the minute may come from the agent and is then not snapped */
  const setBarTo = (id: string, mv: number) => {
    const s0 = Sref.current;
    api.sfx.tick();
    if (free) { if (id === "bar-start") put({ a: tcClamp(mv, TC_WS, s0.b), touched: true }); else put({ b: tcClamp(mv, s0.a, TC_WE), touched: true }); return; }
    const v = tcClamp(mv, it.s, TC_WE);
    lastTry.current = null;
    put({ end: v, touched: true });
    if (it.kind === "dur" && v === it.e) { api.sfx.settle(); if (warm) api.did(stepOn === "bar" ? "bar" : "drag"); }
    else if (it.kind === "dur") { if (warm) api.did("drag"); else nudgeSay(); }
  };
  /* a tap on a handle lays a duration bar for the child; on an end time or in free play a tap does nothing (a drag or the arrow keys move it) */
  const barTap = (id: string) => { if (!free && it.kind === "dur") layAuto(); };
  const stepBar = (id: string, d: number) => {
    const s0 = Sref.current;
    setBarTo(id, (free ? (id === "bar-start" ? s0.a : s0.b) : s0.end) + d);
  };
  /* a tap on the end handle of a duration question lays the bar from the start to the flag for the child */
  const layAuto = async () => {
    if (busy.current) return;
    const cur = Sref.current.end, tgt = it.e;
    if (cur === tgt) { if (warm && stepOn === "bar") api.did("bar"); return; }
    busy.current = true; lastTry.current = null; put({ touched: true });
    const dir = tgt > cur ? 1 : -1, pts: any[] = [], ms: number[] = [];
    for (let m = cur + 15 * dir; dir > 0 ? m <= tgt : m >= tgt; m += 15 * dir) { pts.push({ x: ox + tcSx(m), y: BAR_Y }); ms.push(m); }
    const ok = await api.act({ tool: "hand", moves: "push", from: { x: ox + tcSx(cur), y: BAR_Y }, at: pts, ms: 900, onPoint: (i: number) => put({ end: ms[i] }) });
    busy.current = false;
    if (!ok || qkRef.current !== qk) return;
    put({ end: tgt }); api.sfx.settle(); if (warm && stepOn === "bar") api.did("bar");
  };
  /* the warm-up's second step: the hand joins the two pieces at the noon notch */
  const addAct = async () => {
    if (busy.current || Sref.current.added) return;
    busy.current = true;
    const ok = await api.act({ tool: "hand", moves: "tap", at: [{ x: ox + tcSx(720), y: BAR_Y }], ms: 800 });
    busy.current = false;
    if (!ok || qkRef.current !== qk) return;
    put({ added: true }); api.sfx.trade(); api.did("add");
  };
  const act = (on: any) => { if (on === "hand" || on === "wheel") turnAuto(); else if (on === "bar") layAuto(); else if (on === "add") addAct(); };
  /* a 400 ms guard for each key on its own (two different keys tapped 80 ms apart are both taken) */
  const keyGuard = useRef<any>({});
  const guarded = (id: string, fn: () => void) => () => { const t = Date.now(); if (t - (keyGuard.current[id] || 0) < 400) return; keyGuard.current[id] = t; fn(); };

  /* Enter: a guide step's act; at an end-time question it sends the bar's end once the end has moved off the start, never twice for the same
     place (a miss needs a new act first) and never while the correction plays */
  const lastTry = useRef<any>(null), traceBusy = useRef(false), nudgeOn = useRef(false);
  api.onEnter(warm && stepOn ? () => act(stepOn)
    : !free && !warm && stage === "ask" && it.kind === "end" ? () => {
      if (traceBusy.current) return;
      const v = endRef.current;
      if (v === it.s) { nudgeOn.current = true; api.say("Slide the end of the bar first."); return; }
      if (v === lastTry.current) return;
      lastTry.current = v; api.submit(v);
    } : null);
  useEffect(() => { if (!free && !warm && stage === "ask" && it.kind === "end") api.answerReady(S.end !== it.s); }, [S.end, stage, qk]);

  /* the agent: finish the act at once; set the bar's end as given */
  const needAct = !free && !warm && stage === "ask" && (it.kind === "hm" || it.kind === "days" ? S.tiles < N : it.kind === "dur" ? S.end !== it.e : false);
  HOOK.check = needAct ? () => { if (it.kind === "dur") put({ end: it.e, touched: true }); else put({ tiles: N, touched: true }); return undefined; } : null;
  HOOK.set = !free && !warm && stage === "ask" && it.kind === "end"
    ? (v: any) => { const m = Number(v); if (!isFinite(m)) return false; endRef.current = m; lastTry.current = null; put({ end: m, touched: true }); return true; } : null;
  /* the answer is gated by the act (PATTERNS 19): locked only in user mode once the child has really touched the board and the act is not done */
  useEffect(() => {
    const want = !!(needAct && S.touched);
    if (want === gl.current) return;
    gl.current = want;
    if (!traceBusy.current) api.lock(want);   /* during the correction the lock is the correction's; it takes gl.current when it ends */
  }, [needAct, S.touched, stage, qk]);
  useEffect(() => () => { tl.stop(); traceBusy.current = false; nudgeOn.current = false; lastTry.current = null; if (gl.current) { gl.current = false; api.lock(false); } }, [qk]);
  /* a nudge when the gate holds: said when a touch or a drag ended short of the act, and the question comes back once the act is done */
  const nudgeSay = () => {
    if (warm || free || stage !== "ask" || traceBusy.current) return;
    nudgeOn.current = true;
    if (V === "hours") api.say("Turn the hand some more.");
    else if (V === "days") api.say("Turn the wheel some more.");
    else api.say("Not at the flag yet: slide the handle to it.");
  };
  useEffect(() => { if (nudgeOn.current && stage === "ask" && !needAct && item && item.say) { nudgeOn.current = false; api.say(item.say); } }, [needAct, stage]);
  useEffect(() => { if (nudgeOn.current && !free && !warm && stage === "ask" && it.kind === "end" && S.end !== it.s && item && item.say) { nudgeOn.current = false; api.say(item.say); } }, [S.end]);

  /* the traceback: replay the working in steps, lit on the tiles or the strip, and stop one step before the answer */
  const trLen = tcTraceLen(free ? null : it);
  useEffect(() => {
    if (!wrong || stage !== "ask") return;
    api.lock(true); traceBusy.current = true; nudgeOn.current = false;
    put({ trace: 0 });
    const seq: any[] = [];
    for (let j = 1; j <= trLen; j++) seq.push([j === trLen ? 900 : 750, () => put({ trace: j })]);
    tl.run(seq, () => { traceBusy.current = false; api.lock(gl.current); });
  }, [wrong]);
  /* the correction stays until the child's next act or digit */
  useEffect(() => { if (typed && S.trace >= 0) put({ trace: -1 }); }, [typed]);
  const trOn = !free && !warm && stage === "ask" && S.trace >= 0;
  const trN = trOn ? S.trace : 0;

  /* the win line, one sentence, said once a right answer lands */
  useEffect(() => { if (stage === "win" && !free && item && item.win) { nudgeOn.current = false; api.say(item.win); } }, [stage]);
  /* free play: a tap on the count lends the pad to it; digits build the hours (1 to 6) or the days (1 to 5), a bigger number is held at the
     most the picture holds, 0 does nothing, rub out takes the last digit, and the tiles already turned stay (up to the new count) */
  const openCount = () => {
    api.capture((k: any) => {
      if (k === "enter" || k === "clear") { api.capture(null); put({ capt: false }); return; }
      const setCount = (p: any, v: number) => (p.mode === "days" ? { D: v, tiles: Math.min(p.tiles, v * 24), countTyped: true } : { H: v, tiles: Math.min(p.tiles, v * 12), countTyped: true });
      if (k === "back") { put((p: any) => ({ ...setCount(p, Math.max(1, Math.floor((p.mode === "days" ? p.D : p.H) / 10))), capNote: false })); return; }
      const d = parseInt(String(k), 10);
      if (!(d >= 0 && d <= 9)) return;
      put((p: any) => {
        const max = p.mode === "days" ? 5 : 6, cur = p.mode === "days" ? p.D : p.H, req = p.countTyped ? cur * 10 + d : d, v = Math.min(max, req);
        return v < 1 ? {} : { ...setCount(p, v), capNote: req > max };
      });
    });
    put({ capt: true, countTapped: true, countTyped: false });
  };
  useEffect(() => { if (liveTiles > S.tiles) api.sfx.tick(); }, [liveTiles]);

  /* what the host and the agent read back (toolApi.getState): the tiles drawn, the correction's ghost rows included */
  const drawnTiles = Math.max(shownTiles, !free && !warm && stage === "ask" && S.trace > 0 ? Math.min(N, S.trace * per) : 0);
  api.share({
    complete: stage === "idle",
    hours: V === "hours" ? Math.floor(drawnTiles / 12) : null, minutes: V === "hours" ? (drawnTiles % 12) * 5 : null, days: V === "days" ? Math.floor(drawnTiles / 24) : null,
    start: V === "bar" ? barA : null, end: V === "bar" ? barB : null,
  });

  /* the one invite: on the control a step waits for, and on the main piece while the gate holds (before the first touch the blinking Answer key
     is the invite, and two at once compete) */
  const inviteOn = warm ? stepOn : !free && stage === "ask" && S.touched && !trOn && needAct ? "main" : null;
  const touch = { onPointerDownCapture: () => { if (!S.touched || S.trace >= 0) put({ touched: true, trace: -1 }); } };

  /* ── hours: the wall clock, a stopwatch and rows of five-minute tiles ── */
  const drawHours = () => {
    const rowsN = Math.ceil(N / 12);
    const g = free && rowsN > 4 ? { ...TC_G1, py: Math.floor(300 / rowsN), h: Math.floor(300 / rowsN) - 10 } : TC_G1;
    const kp = tcPt(dial.cx, dial.cy, kr, liveA), rowsDone = Math.floor(shownTiles / 12);
    const popped = shownTiles > 0 && shownTiles % 12 === 0;
    const expr = it.kind === "hm" ? it.H + " × 60" + (it.M ? " + " + it.M : "") : "";
    return (
      <g>
        {tcClockFace({ cx: dial.cx, cy: dial.cy, r: dial.r, A: liveA, C })}
        {/* Stopwatch background plate and skin */}
        <g filter="url(#tc-shadow)">
          <circle cx={150} cy={404} r={38} fill="#E8C86A" stroke={C.ink} strokeWidth={4} />
          <circle cx={150} cy={404} r={29} fill="#FFF9EC" stroke={C.ink} strokeWidth={3} />
          <Skin name="stopwatch" x={108} y={350} w={84} h={100} />
          <rect x={138} y={popped ? 330 : 342} width={24} height={12} rx={3} fill={TC_HOUR} stroke={C.ink} strokeWidth={2} />
        </g>
        {tcRowsPic({ g, N, per: 12, tiles: shownTiles, kind: 1, hiN: trN, ghost: trOn ? Math.min(N, trN * 12) : 0, C, tx })}
        {warm && rowsDone > 0 && <text x={590} y={428} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={C.ink} stroke={C.paper} strokeWidth={4} paintOrder="stroke">{rowsDone + " × 60 = " + rowsDone * 60}</text>}
        {free && shownTiles > 0 && <text x={590} y={392} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={C.ink} stroke={C.paper} strokeWidth={4} paintOrder="stroke">{shownTiles * 5 + " " + tx("minutes")}</text>}
        {trOn && trN >= rowsN && <text x={590} y={428} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={C.ink} stroke={C.paper} strokeWidth={4} paintOrder="stroke">{expr}</text>}
        {win && <g data-reveals="answer"><text x={590} y={428} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={shade(TC_GO, 0.3)} stroke={C.paper} strokeWidth={4} paintOrder="stroke">{expr + " = " + item.answer}</text></g>}
        <g {...control("hand", "Minute hand")} {...dd.bind({ id: "hand" })} {...dd.keys({ id: "hand" })} {...touch} style={{ cursor: "grab" }}>
          <circle cx={kp.x} cy={kp.y} r={16} fill={TC_MIN} stroke="#FFFFFF" strokeWidth={4} filter="url(#tc-shadow)" />
          <circle cx={kp.x} cy={kp.y} r={6} fill="#FFFFFF" />
          <rect x={kp.x - 36} y={kp.y - 36} width={72} height={72} rx={18} fill="transparent" />
        </g>
        {inviteOn && <Invite x={kp.x} y={kp.y} r={44} C={C} />}
      </g>
    );
  };

  /* ── days: the day wheel (a.m. half sky blue, p.m. half amber) and rows of hour tiles, a row a day ── */
  const drawDays = () => {
    const { cx, cy, r } = dial, kp = tcPt(cx, cy, kr, liveA), cur = shownTiles > 0 && shownTiles % 24 === 0 ? 24 : shownTiles % 24;
    const fpy = free ? (S.D <= 3 ? 36 : Math.floor(112 / S.D)) : 36;
    const g = free ? { ...TC_G2, py: fpy, h: Math.max(14, fpy - 8) } : TC_G2;
    const wedges: any[] = [];
    for (let i = 0; i < 24; i++) {
      const baseGrad = i < 12 ? "url(#tc-grad-am)" : "url(#tc-grad-pm)";
      const flatBase = i < 12 ? TC_AM : TC_PM;
      const on = i < cur;
      wedges.push(<path key={"w" + i} d={tcWedge(cx, cy, r, i * 15, 15)} fill={on ? baseGrad : tint(flatBase, 0.72)} stroke={C.ink} strokeWidth={2} />);
    }
    const expr = !free ? it.D + " × 24" : "";
    const top = tcPt(cx, cy, r, 0), bot = tcPt(cx, cy, r, 180);
    /* the working line sits in the room right of the wheel, level with its centre (the owner, 2026-10-30: no calendar card, no suitcase) */
    const ex = Math.round((cx + r + 6 + 900) / 2), ey = cy + 20;
    return (
      <g>
        <g filter="url(#tc-shadow)">
          <circle cx={cx} cy={cy} r={r + 6} fill={C.rule || "#C9BCA6"} />
          {wedges}
          <circle cx={cx} cy={cy} r={r} fill="none" stroke={C.ink} strokeWidth={4} />
        </g>
        <polygon points={`${top.x - 9},${top.y - 12} ${top.x + 9},${top.y - 12} ${top.x},${top.y + 6}`} fill={C.ink} />
        <polygon points={`${bot.x - 9},${bot.y + 8} ${bot.x + 9},${bot.y + 8} ${bot.x},${bot.y - 6}`} fill={C.ink} />
        <text x={cx} y={cy - r - 18} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink} stroke={C.paper} strokeWidth={4} paintOrder="stroke">{tx("midnight")}</text>
        <text x={cx} y={cy + r + 32} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink} stroke={C.paper} strokeWidth={4} paintOrder="stroke">{tx("noon")}</text>
        <line x1={cx} y1={cy} x2={kp.x} y2={kp.y} stroke={C.ink} strokeWidth={7} strokeLinecap="round" />
        <circle cx={cx} cy={cy} r={9} fill={C.ink} />
        <circle cx={cx} cy={cy} r={4} fill="#FFFFFF" />
        {tcRowsPic({ g, N, per: 24, tiles: shownTiles, kind: 2, hiN: trN, ghost: trOn ? Math.min(N, trN * 24) : 0, C, tx })}
        {free && shownTiles > 0 && <text x={ex} y={ey} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={C.ink} stroke={C.paper} strokeWidth={5} paintOrder="stroke">{shownTiles + " " + tx("hours")}</text>}
        {warm && shownTiles >= 24 && <text x={ex} y={ey} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={C.ink} stroke={C.paper} strokeWidth={5} paintOrder="stroke">{Math.floor(shownTiles / 24) + " × 24 = " + Math.floor(shownTiles / 24) * 24}</text>}
        {trOn && trN >= it.D && <text x={ex} y={ey} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={C.ink} stroke={C.paper} strokeWidth={5} paintOrder="stroke">{expr}</text>}
        {win && <g data-reveals="answer"><text x={ex} y={ey} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={shade(TC_GO, 0.3)} stroke={C.paper} strokeWidth={5} paintOrder="stroke">{expr + " = " + item.answer}</text></g>}
        <g {...control("wheel", "Day wheel handle")} {...dd.bind({ id: "wheel" })} {...dd.keys({ id: "wheel" })} {...touch} style={{ cursor: "grab" }}>
          <circle cx={kp.x} cy={kp.y} r={17} fill="url(#tc-grad-go)" stroke={C.ink} strokeWidth={4} filter="url(#tc-shadow)" />
          <circle cx={kp.x} cy={kp.y} r={6} fill="#FFFFFF" />
          <rect x={kp.x - 36} y={kp.y - 36} width={72} height={72} rx={18} fill="transparent" />
        </g>
        {inviteOn && <Invite x={kp.x} y={kp.y} r={38} C={C} />}
      </g>
    );
  };

  /* ── the bar on the day strip (6 a.m. to 6 p.m., noon in the middle), with the whole day above it ── */
  const drawBar = () => {
    const B = TC_B, hasFlagE = !free && it.kind === "dur", isEnd = !free && it.kind === "end";
    /* a split at noon (two pieces, each with its length) belongs to a duration; an end time adds the hours first and then the minutes, so its
       bar stays one piece and only the hour blocks and the working lines tell the story. In a duration question the lengths are the child's work:
       they are written in the warm-up, in free play and at the win, and the correction writes them after a miss */
    const split = (free || warm || it.kind === "dur") && barA < 720 && barB > 720;
    const showLen = split && (free || warm || win);
    const xa = tcSx(barA), xb = tcSx(barB), xn = tcSx(720), done = hasFlagE && barB === it.e;
    const total = barB - barA;
    const showTotal = (warm && S.added) || (free && total > 0);
    const straight = !free && !warm && (isEnd || (it.kind === "dur" && !(it.s < 720 && it.e > 720)));
    const side = (a: number, b: number) => ((a + b) / 2 < 720 ? shade(TC_AM, 0.35) : TC_PM);
    /* widths for the little cream plates behind a word that crosses a line (an estimate by letters: Devanagari and Gujarati are narrower) */
    const wOf = (s: string, size: number) => String(s).length * size * 0.54;
    const timeW = (m: number, size: number, nw?: boolean) => { const c = tcClock(m), w = tx(c.w), word = c.w === "noon" || c.w === "midnight"; return (word ? 3 : String(c.h).length + 3) * size * 0.56 + (nw && !word ? 0 : 6 + wOf(w, size)); };
    const plate = (key: any, x: number, y: number, w: number, h: number) => <rect key={key} x={x} y={y} width={w} height={h} rx={h / 2} fill="#FFF9EC" />;
    const out: any[] = [];
    /* the whole day, small, with the window and the bar on it */
    for (let i = 0; i < 24; i++) out.push(<rect key={"m" + i} x={TC_X0 + i * 36} y={B.mini} width={36} height={B.miniH} fill={tint(i < 12 ? TC_AM : TC_PM, 0.35)} stroke={C.ink} strokeWidth={1.5} />);
    [["ma", 126, "a.m.", TC_AM], ["mp", 774, "p.m.", TC_PM]].forEach((q: any) => {
      const w = Math.max(70, wOf(tx(q[2]), T.micro) + 22);
      out.push(plate(q[0] + "p", q[1] - w / 2, B.mini + 2, w, B.miniH - 4));
      out.push(<text key={q[0]} x={q[1]} y={B.mini + 27} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={shade(q[3], 0.5)}>{tx(q[2])}</text>);
    });
    out.push(<path key="mw" d={`M${TC_X0 + 216},${B.mini + B.miniH + 3} v7 h432 v-7`} fill="none" stroke={C.ink} strokeWidth={3} />);
    if (barB > barA) out.push(<rect key="mb" x={TC_X0 + barA * 0.6} y={B.mini + 3} width={(barB - barA) * 0.6} height={B.miniH - 6} rx={2} fill="url(#tc-grad-go)" stroke={C.ink} strokeWidth={1.5} />);
    /* the day strip */
    for (let i = 0; i < 12; i++) {
      const x = tcSx((6 + i) * 60), flatBase = i < 6 ? TC_AM : TC_PM;
      out.push(<rect key={"s" + i} x={x} y={B.tY} width={72} height={B.tH} fill={tint(flatBase, 0.4)} stroke={C.ink} strokeWidth={2.4} />);
      for (let q = 1; q < 4; q++) out.push(<line key={"q" + i + "_" + q} x1={x + q * 18} y1={B.tY + B.tH - (q === 2 ? 20 : 12)} x2={x + q * 18} y2={B.tY + B.tH} stroke={C.ink} strokeWidth={2} strokeLinecap="round" />);
    }
    [["sa", 540, "a.m.", TC_AM], ["sp", 900, "p.m.", TC_PM]].forEach((q: any) => {
      const w = Math.max(96, wOf(tx(q[2]), T.label) + 28), cx = tcSx(q[1]);
      out.push(plate(q[0] + "p", cx - w / 2, B.tY + B.tH / 2 - 20, w, 40));
      out.push(<text key={q[0]} x={cx} y={B.tY + B.tH / 2 + 10} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={shade(q[3], 0.5)}>{tx(q[2])}</text>);
    });
    out.push(<line key="nl" x1={xn} y1={B.tY - 4} x2={xn} y2={B.tY + B.tH + 4} stroke={C.ink} strokeWidth={5} />);
    out.push(<polygon key="nn" points={`${xn - 11},${B.tY + B.tH + 14} ${xn + 11},${B.tY + B.tH + 14} ${xn},${B.tY + B.tH + 2}`} fill={C.ink} />);
    for (let h = 6; h <= 18; h++) out.push(<text key={"l" + h} x={tcSx(h * 60)} y={B.labY} textAnchor="middle" fontSize={h === 12 ? T.micro : T.label} fontWeight={700} fill={C.ink}>{h === 12 ? tx("noon") : h > 12 ? h - 12 : h}</text>);
    /* the train of the train story (one small picture under the strip's left end; the plain shape is its fallback) */
    if (!free && !warm && it.train) {
      out.push(<g key="train" filter="url(#tc-shadow)">
        <rect x={0} y={334} width={300} height={31} rx={7} fill="#6B7A86" stroke={C.ink} strokeWidth={2} />
        {[0, 1, 2, 3, 4, 5].map((k: number) => <rect key={k} x={14 + k * 47} y={340} width={30} height={14} rx={3} fill="#E9F1F6" stroke={C.ink} strokeWidth={1.5} />)}
        <Skin name="train" x={0} y={334} w={300} h={31.25} />
      </g>);
    }
    /* the flags, on ONE row of labels: the start label ends at its pole and the end label begins at its pole, so they never meet; the poles run
       down to the strip behind the bar and the cream plates */
    const LAB = B.lab, size = 36, polesTop = LAB + 8;
    const endM = hasFlagE ? it.e : barB > barA ? barB : null;
    const xe = endM !== null ? tcSx(endM) : 0, gapE = hasFlagE ? 34 : 8, szE = hasFlagE ? size : 40, inkE = hasFlagE ? undefined : shade(TC_GO, 0.3);
    /* where the two labels go: the start label ends at its pole, the end label begins at its pole (or ends there when it would pass the ruler's end) */
    const place = (nw: boolean) => {
      const wS = timeW(barA, size, nw);
      const S0 = xa - 8 - wS >= 2 ? { x: xa - 8, anchor: "end", l: xa - 8 - wS, r: xa - 8 } : { x: Math.max(2, xa + 8), anchor: "start", l: Math.max(2, xa + 8), r: Math.max(2, xa + 8) + wS };
      let E0: any = null;
      if (endM !== null) {
        const wE = timeW(endM, szE, nw);
        E0 = xe + gapE + wE <= 886 ? { x: xe + gapE, anchor: "start", l: xe + gapE, r: xe + gapE + wE } : { x: xe - 8, anchor: "end", l: xe - 8 - wE, r: xe - 8 };
      }
      return { S0, E0, hit: !!E0 && E0.l < S0.r + 16 && E0.r > S0.l - 16 };
    };
    let pl = place(false), nw = false;
    if (pl.hit) { pl = place(true); nw = true; }
    out.push(<line key="fs" x1={xa} y1={polesTop} x2={xa} y2={B.tY} stroke={C.ink} strokeWidth={3.5} strokeLinecap="round" />);
    out.push(<g key="fst">{tcTime({ x: pl.S0.x, y: LAB, size, m: barA, anchor: pl.S0.anchor, tx, C, noWord: nw })}</g>);
    if (endM !== null) {
      out.push(<line key="fe" x1={xe} y1={polesTop} x2={xe} y2={B.tY} stroke={hasFlagE ? C.ink : inkE} strokeWidth={3.5} strokeLinecap="round" />);
      if (hasFlagE) out.push(<polygon key="pen" points={`${xe},${LAB - 28} ${xe + 26},${LAB - 15} ${xe},${LAB - 2}`} fill="url(#tc-grad-go)" stroke={C.ink} strokeWidth={2.5} strokeLinejoin="round" />);
      out.push(<g key="fet">{tcTime({ x: pl.E0.x, y: LAB, size: szE, m: endM, anchor: pl.E0.anchor, tx, C, ink: inkE, noWord: nw })}</g>);
    }
    /* the bar, in one piece or two at noon, with each piece's length written over it when it crosses */
    const pieces = split ? [[barA, 720], [720, barB]] : [[barA, barB]];
    const lenLab = (key: any, j: number, mins: number) => {
      const s = tcDurStr(mins, tx), w = wOf(s, 34) + 18, x = j === 0 ? xn - 26 - w : xn + 26;
      return [plate(key + "p", x, B.lenY - 28, w, 38), <g key={key}>{tcDurText({ x: j === 0 ? xn - 26 - 9 : xn + 26 + 9, y: B.lenY, size: 34, mins, anchor: j === 0 ? "end" : "start", tx, C })}</g>];
    };
    pieces.forEach((p: any, j: number) => {
      if (p[1] <= p[0]) return;
      const x1 = tcSx(p[0]) + (split && j === 1 ? 3 : 0), x2 = tcSx(p[1]) - (split && j === 0 ? 3 : 0);
      out.push(
        <g key={"b" + j} filter="url(#tc-shadow)">
          <rect x={x1} y={B.barY} width={Math.max(2, x2 - x1)} height={B.barH} rx={8} fill="url(#tc-grad-go)" stroke={C.ink} strokeWidth={3} />
          <rect x={x1 + 2} y={B.barY + 3} width={Math.max(0, x2 - x1 - 4)} height={B.barH / 3} rx={4} fill="#FFFFFF" fillOpacity={0.25} />
        </g>
      );
      if (showLen) out.push(...lenLab("bl" + j, j, p[1] - p[0]));
    });
    if (showLen) out.push(<g key="plus">{plate("pluspl", xn - 17, B.lenY - 28, 34, 38)}<text x={xn} y={B.lenY} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>+</text></g>);
    /* the correction lays its own ghost of the working (the child's bar is never moved), lights it one step after another and stops one step
       before the answer: across noon the two pieces of a duration are lit and measured; on a straight bar, or for an end time, the whole hours
       are counted. An outline says the side of noon (sky blue before it, amber after it) */
    const ghostCross = trOn && it.kind === "dur" && it.s < 720 && it.e > 720;
    if (ghostCross) {
      [[it.s, 720], [720, it.e]].forEach((p: any, j: number) => {
        if (j >= trN) return;
        const x1 = tcSx(p[0]) + (j === 1 ? 3 : 0), x2 = tcSx(p[1]) - (j === 0 ? 3 : 0);
        out.push(<rect key={"gh" + j} x={x1} y={B.barY} width={x2 - x1} height={B.barH} rx={8} fill={TC_GO} fillOpacity={0.55} stroke={C.ink} strokeWidth={3} />);
        out.push(<rect key={"bh" + j} x={x1 - 5} y={B.barY - 5} width={x2 - x1 + 10} height={B.barH + 10} rx={12} fill="none" stroke={j === 0 ? shade(TC_AM, 0.35) : TC_PM} strokeWidth={6} />);
        out.push(...lenLab("gl" + j, j, p[1] - p[0]));
      });
    } else if ((trOn || win) && straight) {
      /* the hours counted on from the start, block by block (and at the win the minutes block after them) */
      const e2 = isEnd ? it.s + it.len : it.e, nb = win ? tcTraceLen(it) : Math.min(trN, tcTraceLen(it)), rest = (e2 - it.s) % 60;
      for (let j = 0; j < nb; j++) {
        const x1 = tcSx(it.s + j * 60), x2 = tcSx(it.s + (j + 1) * 60);
        out.push(<rect key={"th" + j} x={x1} y={B.barY - 5} width={x2 - x1} height={B.barH + 10} rx={10} fill={TC_GO} fillOpacity={0.4} stroke={side(it.s + j * 60, it.s + (j + 1) * 60)} strokeWidth={6} />);
        out.push(<text key={"tn" + j} x={(x1 + x2) / 2} y={B.lenY} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink} stroke={C.paper} strokeWidth={6} paintOrder="stroke">{j + 1}</text>);
      }
      if (win && rest > 0) {
        const m1 = it.s + tcTraceLen(it) * 60, x1 = tcSx(m1), x2 = tcSx(e2);
        out.push(<rect key="tm" data-reveals="answer" x={x1} y={B.barY - 5} width={x2 - x1} height={B.barH + 10} rx={10} fill={TC_GO} fillOpacity={0.4} stroke={side(m1, e2)} strokeWidth={6} />);
      }
    }
    /* the working as written lines under the strip: in the correction it stops one step before the answer, at the win it goes on to it */
    const wl = (trOn && trN >= trLen) || win ? tcLines(it, tx, win) : [];
    if (wl.length) out.push(<g key="wl" data-reveals={win ? "answer" : undefined}>{wl.map((ln: string, i: number) => <text key={i} x={450} y={B.linesY + i * B.linesPitch} textAnchor="middle" fontSize={T.micro} fontWeight={700} letterSpacing={1.5} fill={win ? shade(TC_GO, 0.3) : C.ink} stroke={C.paper} strokeWidth={5} paintOrder="stroke">{ln}</text>)}</g>);
    /* the totals (the warm-up after Add, and free play) */
    if (showTotal && total > 0) out.push(<g key="tot">{tcDurText({ x: 450, y: B.outY + 8, size: T.xl, mins: total, tx, C })}</g>);
    return <g>{out}</g>;
  };

  /* the handles (outside the pure picture: they are the controls) */
  const handles = () => {
    if (V !== "bar") return null;
    const hy = BAR_Y, xb = tcSx(barB), xa = tcSx(barA), isEnd = !free && it.kind === "end";
    const done = !free && it.kind === "dur" && barB === it.e;
    const kd = (id: string) => (e: any) => {
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") { e.preventDefault(); e.stopPropagation(); stepBar(id, e.key === "ArrowRight" ? 15 : -15); return; }
      if (isEnd || free) { if (e.key === " ") e.preventDefault(); return; }   /* Enter goes on to the window (it sends a placed end); Space does nothing */
      dd.keys({ id }).onKeyDown(e);
    };
    return (
      <g>
        <g {...control("bar", "Bar end")} {...dd.bind({ id: "bar" })} onKeyDown={kd("bar")} {...touch} style={{ cursor: "grab" }}>
          <circle cx={xb} cy={hy} r={23} fill={done ? shade(TC_GO, 0.25) : "#FFFFFF"} stroke={C.ink} strokeWidth={4} filter="url(#tc-shadow)" />
          <path d={`M${xb - 8},${hy - 11} l14,11 l-14,11`} fill="none" stroke={done ? "#FFFFFF" : C.ink} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />
          <rect x={free ? xb : xb - 36} y={hy - 36} width={72} height={72} rx={18} fill="transparent" />
        </g>
        {free && (
          <g {...control("bar-start", "Bar start")} {...dd.bind({ id: "bar-start" })} onKeyDown={kd("bar-start")} {...touch} style={{ cursor: "grab" }}>
            <circle cx={xa} cy={hy} r={23} fill="#FFFFFF" stroke={C.ink} strokeWidth={4} filter="url(#tc-shadow)" />
            <path d={`M${xa + 8},${hy - 11} l-14,11 l14,11`} fill="none" stroke={C.ink} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />
            <rect x={xa - 72} y={hy - 36} width={72} height={72} rx={18} fill="transparent" />
          </g>
        )}
        {inviteOn && <Invite x={xb} y={hy} r={46} C={C} />}
      </g>
    );
  };
  /* the keys: Add (the warm-up's second step) and the three free-play views */
  const keys = () => {
    if (free) {
      const cx0 = 690, cy0 = TC_B.keyY, cnt = V === "days" ? S.D : S.H, on = !!(S.capt && captured);
      return (
        <g>
          {(["hours", "days", "bar"] as any[]).map((id: string, j: number) => {
            const sel = S.mode === id;
            return (
              <Key key={id} id={"free-" + id} label={tx((TC_MODE as any)[id])} x={450 + (j - 1) * 144 - 65} y={cy0} w={130} h={72} C={C} tone={sel ? "enter" : "key"}
                onClick={guarded("m-" + id, () => { if (captured) api.capture(null); put({ mode: id, tiles: 0, trace: -1, capt: false, capNote: false }); api.sfx.tick(); })}>
                <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={toneInk(sel ? "enter" : "key", C.ink)}>{tx((TC_MODE as any)[id])}</text>
              </Key>
            );
          })}
          {V !== "bar" && (
            <g filter="url(#tc-shadow)">
              <rect x={cx0} y={cy0} width={190} height={72} rx={14} fill="#FFFFFF" stroke={on ? shade(C.accent, 0.3) : C.ink} strokeWidth={on ? 6 : 3} />
              <text x={cx0 + 34} y={cy0 + 54} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={C.ink}>{cnt}</text>
              <text x={cx0 + 66} y={cy0 + 48} fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx(V === "days" ? "days" : "hours")}</text>
              <Hit id="free-count" x={cx0} y={cy0} w={190} h={72} label="Number of hours or days" enabled={!captured} onPress={openCount} />
              {!S.countTapped && <Invite x={cx0 + 95} y={cy0 + 36} w={190} h={72} C={C} />}
              {S.capNote && <text x={cx0 + 95} y={cy0 - 10} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={C.ink} stroke={C.paper} strokeWidth={4} paintOrder="stroke">{tx(V === "days" ? "Up to 5 days." : "Up to 6 hours.")}</text>}
            </g>
          )}
        </g>
      );
    }
    if (warm && n === 3 && st >= 1 && !S.added) {
      return (
        <g>
          <Key id="add" label={tx("Add")} x={350} y={TC_B.keyY} w={200} h={72} C={C} tone="key" onClick={guarded("add", () => addAct())}>
            <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={toneInk("key", C.ink)}>{tx("Add")}</text>
          </Key>
          {inviteOn === "add" && <Invite x={450} y={TC_B.keyY + 36} w={200} h={72} C={C} />}
        </g>
      );
    }
    return null;
  };

  return (
    <g>
      <defs>
        <filter id="tc-shadow" x="-15%" y="-15%" width="130%" height="130%">
          <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#000000" floodOpacity="0.16" />
        </filter>
        <linearGradient id="tc-grad-go" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3BD87C" />
          <stop offset="100%" stopColor="#22884B" />
        </linearGradient>
        <linearGradient id="tc-grad-am" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7CD0F7" />
          <stop offset="100%" stopColor="#419ECE" />
        </linearGradient>
        <linearGradient id="tc-grad-pm" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F8BC58" />
          <stop offset="100%" stopColor="#D98A1B" />
        </linearGradient>
        <linearGradient id="tc-grad-min" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3169C6" />
          <stop offset="100%" stopColor="#183D7C" />
        </linearGradient>
      </defs>
      <g transform={`translate(${ox},0)`}>
        {V === "hours" && drawHours()}
        {V === "days" && drawDays()}
        {V === "bar" && <g><g pointerEvents="none">{drawBar()}</g>{handles()}</g>}
        {keys()}
      </g>
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase */
function Thumb({ n, result, it, C, w, h, lang = "en", tx = (v: any) => v }: any) {
  const item = it || (result && result.last && PHASES[n - 1].items[result.last.item]) || null;
  if (!item || !result || !result.last) return null;
  const v = result.last.value;
  const frame = <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />;
  if (item.kind === "hm" || item.kind === "days") {
    const per = item.kind === "hm" ? 12 : 24, N = item.kind === "hm" ? item.H * 12 + item.M / 5 : item.D * 24, rows = Math.ceil(N / per), tw = 90 / per;
    const cells: any[] = [];
    for (let k = 0; k < rows; k++) for (let j = 0; j < Math.min(per, N - k * per); j++) {
      const base = item.kind === "hm" ? TC_MIN : j < 12 ? TC_AM : TC_PM;
      cells.push(<rect key={k + "_" + j} x={14 + j * tw} y={(h - rows * 12) / 2 + k * 12} width={tw - 1.5} height={9} fill={base} stroke={C.ink} strokeWidth={0.8} />);
    }
    return (
      <g>{frame}{cells}
        <text x={w - 14} y={h / 2 + 11} textAnchor="end" fontSize={T.prompt} fontWeight={700} fill={shade(item.kind === "hm" ? TC_MIN : TC_GO, 0.2)}>{String(leadNumber(v))}</text>
      </g>
    );
  }
  /* the bar on the strip, and under it the length ("3 h 45 min") or the end time with its a.m. / p.m., written through tx */
  const mins = item.kind === "end" ? Number(v) - item.s : item.e - item.s, a = item.s, sw = w - 24;
  return (
    <g>{frame}
      <rect x={12} y={14} width={sw / 2} height={12} fill={tint(TC_AM, 0.4)} stroke={C.ink} strokeWidth={0.8} />
      <rect x={12 + sw / 2} y={14} width={sw / 2} height={12} fill={tint(TC_PM, 0.4)} stroke={C.ink} strokeWidth={0.8} />
      <rect x={12 + ((a - TC_WS) / 720) * sw} y={10} width={Math.max(4, (mins / 720) * sw)} height={20} rx={3} fill={TC_GO} stroke={C.ink} strokeWidth={1} />
      {item.kind === "end" ? tcTime({ x: w / 2, y: h - 14, size: T.label, m: Number(v), anchor: "middle", tx, C }) : tcDurText({ x: w / 2, y: h - 14, size: T.label, mins, anchor: "middle", tx, C })}
    </g>
  );
}

function TimeConverter(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, fitHost: () => null,
      /* the board layout (LAYOUT.md §1b): the working area the whole card until the child taps Answer, the keypad in a panel from the right */
      board: true,
      /* KEY ONLY (the new look; LAYOUT.md §1d, PATTERNS.md §16): no question bar, only its blinking key at the top right; the question lives only in the bubble */
      keyOnly: true,
      /* the wide keypad: the picture is laid out in x 0 to 900, which is what it has with the panel open */
      bigPad: true,
      /* the Next key (PATTERNS.md 9d): nothing moves on by itself; after a right answer the win picture waits for the child's tap on the blinking Next key */
      nextKey: true,
      /* NAV DOTS (the new look; LAYOUT.md §1d): one small clickable dot per phase */
      navDots: true,
      /* the start page: the tool's name, StartArt, START_HOOK, a Start key */
      StartArt, START_HOOK,
      }} />
  );
}

export default TimeConverter;