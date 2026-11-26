/* ═══ M1.S2.T4.C18.2D1 · time_unit_ladder · tool-specific part ═══════════════════════════════
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

const TOOL_ID = "time_unit_ladder";
const MEDIA_ID = "M1.S2.T4.C18.2D1";
const TOOL_NAME = "Time Unit Ladder";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
/* kept for the tool object's shape (and the sidecar); nothing speaks from r30 */
const VOICE = {"rate":0.92,"pitch":1.06};

/* printed on the bubble before phase 1's teach lines only (the plan's opening line; not shown when phase 1 has steps) */
const OPENING = ["A ladder of units, from days down to seconds. How many of each make the next?"];
/* the whole-tool line: printed on the summary page */
const FINISH_LINE = "Each tile opened into the right number, the part already there added on, and each answer given its unit.";
/* printed when the child opens Free play (the plan's free-play line); its LAST piece stays on the bubble */
const FREE_LINE = "Free play: tap a rung to put tiles on it, then step them down the ladder.";

/* THE START PAGE (runtime r28; docs/LAYOUT.md §1c, docs/PATTERNS.md §14): the first thing a child sees in user mode.
   START_HOOK is ONE printed question to wonder at (it needs a TR entry, and never gives an answer away); StartArt is
   the object the lesson is about, drawn in a 1200 x 340 box ({ box, C, lang, tx }; plain shapes in the chrome and content
   colours, a <Skin> over them when the image agent made one). This stub is a dashed outline: draw the real object. */
const START_HOOK = "How many of each make the next?";
function StartArt({ box, C, lang, tx }: any) {
  return (
    <g>
      <defs>
        <filter id="tu-start-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="3" stdDeviation="3.5" floodColor="#000000" floodOpacity="0.16" />
        </filter>
      </defs>
      {tuClock(330, 170, 125, 168, 0, { ns: 32 })}
      {/* Ladder Rails */}
      <line x1={640} y1={14} x2={640} y2={326} stroke={TU_INK} strokeWidth={9} strokeLinecap="round" />
      <line x1={640} y1={14} x2={640} y2={326} stroke="#768B9B" strokeWidth={3} strokeLinecap="round" />
      <line x1={900} y1={14} x2={900} y2={326} stroke={TU_INK} strokeWidth={9} strokeLinecap="round" />
      <line x1={900} y1={14} x2={900} y2={326} stroke="#768B9B" strokeWidth={3} strokeLinecap="round" />
      {TU_NAME.map((nm, k) => (
        <g key={nm} filter="url(#tu-start-shadow)">
          <rect x={620} y={20 + k * 80} width={300} height={62} rx={14} fill={tint(TU_COL[k], 0.82)} stroke={shade(TU_COL[k], 0.25)} strokeWidth={3} />
          <rect x={623} y={23 + k * 80} width={294} height={26} rx={10} fill="#FFFFFF" fillOpacity={0.3} />
          <text x={770} y={51 + k * 80 + (lang === "en" ? 0 : 3)} textAnchor="middle" dominantBaseline="central" fontSize={lang === "en" ? T.label : Math.round(T.label * 1.15)} fontWeight={700} fill={TU_INK}>{tx(nm)}</text>
        </g>
      ))}
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
    "Time Unit Ladder": "समय इकाई सीढ़ी",
    "A ladder of units, from days down to seconds. How many of each make the next?": "इकाइयों की सीढ़ी, दिन से सेकंड तक। कितने मिलकर अगली इकाई बनाते हैं?",
    "Free play: tap a rung to put tiles on it, then step them down the ladder.": "खुला खेल: पायदान पर टैप कर टाइलें रखो, फिर उन्हें नीचे उतारो।",
    "How many of each make the next?": "कितने मिलकर अगली इकाई बनाते हैं?",
    "The second hand": "सेकंड की सुई",
    "Tap Go and watch the thin second hand move.": "चलाओ पर टैप करो और पतली सेकंड की सुई देखो।",
    "Tap the Go key beside the clock.": "घड़ी के पास चलाओ बटन दबाओ।",
    "The second hand goes round once every minute, so a minute is sixty seconds.": "सेकंड की सुई हर मिनट एक चक्कर लगाती है, इसलिए 1 मिनट 60 सेकंड का है।",
    "You learned: a lap of the second hand is a minute, 60 seconds.": "तुमने सीखा: सेकंड की सुई का एक चक्कर 1 मिनट, यानी 60 सेकंड है।",
    "Seconds in a minute?": "1 मिनट में सेकंड?",
    "Tap Go for a whole lap: how many seconds make a minute?": "चलाओ दबाकर पूरा चक्कर देखो: 1 मिनट में कितने सेकंड?",
    "How many marks are there round the face?": "घड़ी के चारों ओर कितने निशान हैं?",
    "Yes, 60 marks went by, so a minute is 60 seconds.": "हाँ, 60 निशान गुज़रे, यानी 1 मिनट 60 सेकंड का है।",
    "Marks it moves?": "कितने निशान खिसकी?",
    "Tap Go and watch the long hand: how many marks does it move in a lap?": "चलाओ दबाकर लंबी सुई देखो: एक चक्कर में वह कितने निशान खिसकती है?",
    "Watch the long blue hand as the lap ends.": "चक्कर पूरा होते समय लंबी नीली सुई देखो।",
    "Yes, a whole lap of the second hand moves the minute hand just 1 mark.": "हाँ, सेकंड की सुई का पूरा चक्कर मिनट की सुई को बस 1 निशान खिसकाता है।",
    "seconds": "सेकंड",
    "marks": "निशान",
    "mark": "निशान",
    "3 laps?": "3 चक्कर?",
    "Tap Go for 3 laps, then give the seconds and the long hand's marks.": "3 चक्कर चलाओ, फिर सेकंड और लंबी सुई के निशान बताओ।",
    "Each lap is a whole minute of seconds.": "हर चक्कर एक पूरे मिनट के सेकंड है।",
    "Yes, 3 laps are 180 seconds, and the minute hand moved 3 marks.": "हाँ, 3 चक्कर 180 सेकंड हैं, और मिनट की सुई 3 निशान खिसकी।",
    "Sixty, sixty and twenty-four": "साठ, साठ और चौबीस",
    "Tap the hour tile to open it into minutes.": "घंटे की टाइल पर टैप करके उसे मिनटों में खोलो।",
    "Tap the red hour tile.": "लाल घंटे वाली टाइल पर टैप करो।",
    "60 seconds make a minute, 60 minutes an hour, and 24 hours a day.": "60 सेकंड का 1 मिनट, 60 मिनट का 1 घंटा, और 24 घंटे का 1 दिन।",
    "You learned: 60 seconds, 60 minutes and 24 hours make the next unit.": "तुमने सीखा: 60 सेकंड, 60 मिनट और 24 घंटे से अगली इकाई बनती है।",
    "Smallest to largest": "सबसे छोटी से सबसे बड़ी",
    "Tap the four units from the smallest to the largest.": "चारों इकाइयों पर सबसे छोटी से सबसे बड़ी के क्रम में टैप करो।",
    "Which of these units is the smallest?": "इनमें सबसे छोटी इकाई कौन-सी है?",
    "Yes, a second, a minute, an hour, then a day.": "हाँ, सेकंड, मिनट, घंटा, फिर दिन।",
    "Hours in a day?": "1 दिन में घंटे?",
    "How many hours make a day?": "1 दिन में कितने घंटे होते हैं?",
    "Is a day made the same way as an hour?": "क्या दिन भी घंटे की तरह ही बनता है?",
    "Yes, 24 hours make a day, not 60.": "हाँ, 1 दिन 24 घंटे का होता है, 60 का नहीं।",
    "a minute": "मिनट",
    "an hour": "घंटा",
    "a second": "सेकंड",
    "Largest unit?": "सबसे बड़ी इकाई?",
    "Which is the largest of these units: a minute, an hour or a second?": "इनमें सबसे बड़ी इकाई कौन-सी है: मिनट, घंटा या सेकंड?",
    "Which unit takes the longest to pass?": "कौन-सी इकाई सबसे देर में बीतती है?",
    "Yes, an hour is the largest of the three.": "हाँ, तीनों में घंटा सबसे बड़ा है।",
    "Larger to smaller: multiply": "बड़ी से छोटी: गुणा करो",
    "Tap Step down to open the 4 minute tiles into seconds.": "4 मिनट की टाइलें सेकंड में खोलने के लिए नीचे उतारो दबाओ।",
    "Tap the Step down key beside the tiles.": "टाइलों के पास नीचे उतारो बटन दबाओ।",
    "To change to a smaller unit, multiply by the number between the rungs.": "छोटी इकाई में बदलने के लिए पायदानों के बीच की संख्या से गुणा करो।",
    "You learned: multiply by the number between the rungs.": "तुमने सीखा: पायदानों के बीच की संख्या से गुणा करो।",
    "9 days in hours?": "9 दिन, घंटों में?",
    "Tap Step down to open the 9 days, then find how many hours there are.": "नीचे उतारो दबाकर 9 दिन खोलो, फिर बताओ कितने घंटे हैं।",
    "Which rung are the tiles on, and which rung is below it?": "टाइलें किस पायदान पर हैं, और उसके नीचे कौन-सा पायदान है?",
    "Yes, 9 × 24 = 216 hours.": "हाँ, 9 × 24 = 216 घंटे।",
    "3 hours in minutes?": "3 घंटे, मिनटों में?",
    "Open the 3 hours the same way: how many minutes is that?": "3 घंटे भी ऐसे ही खोलो: वह कितने मिनट हैं?",
    "An hour is not 100 minutes, so look at one bar.": "1 घंटा 100 मिनट का नहीं होता, एक पट्टी देखो।",
    "Yes, 3 × 60 = 180 minutes.": "हाँ, 3 × 60 = 180 मिनट।",
    "14 minutes in seconds?": "14 मिनट, सेकंड में?",
    "How many seconds are there in 14 minutes?": "14 मिनट में कितने सेकंड होते हैं?",
    "Each minute tile opens into how many seconds?": "मिनट की एक टाइल कितने सेकंड में खुलती है?",
    "Yes, 14 × 60 = 840 seconds.": "हाँ, 14 × 60 = 840 सेकंड।",
    "Two units into one": "दो इकाइयाँ, एक में",
    "Tap Step down to open the hour into minutes.": "घंटे को मिनटों में खोलने के लिए नीचे उतारो दबाओ।",
    "Tap the Step down key beside the tile.": "टाइल के पास नीचे उतारो बटन दबाओ।",
    "Now tap Slide in to bring the 10 minutes beside it.": "अब 10 मिनट उसके पास लाने के लिए खिसकाओ दबाओ।",
    "Tap the Slide in key.": "खिसकाओ बटन दबाओ।",
    "Change the larger unit, then add the part already in the smaller unit.": "बड़ी इकाई बदलो, फिर छोटी इकाई में पहले से रखा भाग जोड़ो।",
    "You learned: change the larger unit, then add the part already there.": "तुमने सीखा: बड़ी इकाई बदलो, फिर पहले से रखा भाग जोड़ो।",
    "5 h 18 min in minutes?": "5 घंटे 18 मिनट, मिनटों में?",
    "Change 5 hours 18 minutes into minutes: step down, then slide in.": "5 घंटे 18 मिनट को मिनटों में बदलो: नीचे उतारो, फिर खिसकाओ।",
    "Which part of the time is in the larger unit?": "समय का कौन-सा भाग बड़ी इकाई में है?",
    "Yes, 5 hours 18 minutes is 318 minutes.": "हाँ, 5 घंटे 18 मिनट यानी 318 मिनट।",
    "9 min 25 s in seconds?": "9 मिनट 25 सेकंड, सेकंड में?",
    "Change 9 minutes 25 seconds into seconds.": "9 मिनट 25 सेकंड को सेकंड में बदलो।",
    "The 25 seconds are seconds already, so add them on.": "25 सेकंड पहले से सेकंड में हैं, उन्हें जोड़ दो।",
    "Yes, 9 minutes 25 seconds is 565 seconds.": "हाँ, 9 मिनट 25 सेकंड यानी 565 सेकंड।",
    "Film in minutes?": "फ़िल्म, मिनटों में?",
    "A film is 2 hours 52 minutes long: how many minutes is that?": "एक फ़िल्म 2 घंटे 52 मिनट की है: वह कितने मिनट है?",
    "Did you add the 52 minutes after changing the hours?": "क्या घंटे बदलने के बाद तुमने 52 मिनट जोड़े?",
    "Yes, the film is 172 minutes long.": "हाँ, फ़िल्म 172 मिनट की है।",
    "Watch the thin hand go all the way round. How many ticks is that? What did the minute hand do?": "पतली सुई का पूरा चक्कर देखो। कितनी टिक हुईं? मिनट की सुई ने क्या किया?",
    "How long does the second hand take to pass a single mark?": "सेकंड की सुई को एक निशान पार करने में कितना समय लगता है?",
    "From a number to the next there are 5 marks, so count in fives.": "एक अंक से अगले तक 5 निशान हैं, तो पाँच-पाँच गिनो।",
    "Does the long hand reach the next number, or stop before it?": "क्या लंबी सुई अगले अंक तक पहुँचती है, या पहले रुक जाती है?",
    "Count the marks between the top number and the long hand now.": "ऊपर वाले अंक और लंबी सुई के बीच के निशान गिनो।",
    "How many seconds does each lap take?": "हर चक्कर में कितने सेकंड लगते हैं?",
    "Add the seconds of a lap three times, and count the long hand's marks.": "एक चक्कर के सेकंड तीन बार जोड़ो, और लंबी सुई के निशान गिनो।",
    "How many of the smaller unit make one of the bigger one?": "छोटी इकाई के कितने मिलकर बड़ी इकाई का एक बनाते हैं?",
    "How many of the smaller unit make one of the next?": "छोटी इकाई के कितने मिलकर अगली का एक बनाते हैं?",
    "Think of the minute and the second first, then the hour and the day.": "पहले मिनट और सेकंड सोचो, फिर घंटा और दिन।",
    "Which unit is made of 60 seconds?": "कौन-सी इकाई 60 सेकंड से बनती है?",
    "Start with the one that is quickest to tick by.": "उससे शुरू करो जो सबसे जल्दी बीतती है।",
    "Think of the time from one sunrise to the next.": "एक सूर्योदय से अगले सूर्योदय तक का समय सोचो।",
    "Count the hours from one midnight to the next on the clock.": "घड़ी पर एक आधी रात से अगली आधी रात तक के घंटे गिनो।",
    "Which one could you cut into the other two?": "किसे काटकर बाकी दोनों बनाए जा सकते हैं?",
    "Put the three on the ladder: the largest goes at the top.": "तीनों को सीढ़ी पर रखो: सबसे बड़ी सबसे ऊपर जाती है।",
    "Each of these breaks into how many of the next? So how many are there in all?": "हर एक अगली इकाई के कितनों में टूटता है? तो कुल कितने हुए?",
    "Count one bar's rows of ten.": "एक पट्टी की दस-दस वाली पंक्तियाँ गिनो।",
    "Multiply the number of tiles by the cells in one bar.": "टाइलों की संख्या को एक पट्टी के खानों से गुणा करो।",
    "Break the hours into minutes first. Now, what about the minutes that were already there?": "पहले घंटों को मिनटों में खोलो। अब जो मिनट पहले से थे, उनका क्या?",
    "What happens to the part already in the smaller unit?": "छोटी इकाई में पहले से रखे भाग का क्या होता है?",
    "Which part must NOT be opened?": "कौन-सा भाग खोलना नहीं है?",
    "bars": "पट्टी",
    "Go": "चलाओ",
    "Laps": "चक्कर",
    "Lap": "चक्कर",
    "Minute hand": "मिनट की सुई",
    "hour": "घंटा",
    "hours": "घंटे",
    "minutes": "मिनट",
    "largest": "सबसे बड़ी",
    "Day": "दिन",
    "Hour": "घंटा",
    "Minute": "मिनट",
    "Second": "सेकंड",
    "Step down": "नीचे उतारो",
    "Slide in": "खिसकाओ",
  },
  gu: {
    "Time Unit Ladder": "સમય એકમ નિસરણી",
    "A ladder of units, from days down to seconds. How many of each make the next?": "એકમોની નિસરણી, દિવસથી સેકન્ડ સુધી. કેટલા મળીને આગળનો એકમ બને?",
    "Free play: tap a rung to put tiles on it, then step them down the ladder.": "મુક્ત રમત: પગથિયા પર ટેપ કરી ટાઇલ્સ મૂકો, પછી નીચે ઉતારો.",
    "How many of each make the next?": "કેટલા મળીને આગળનો એકમ બને?",
    "The second hand": "સેકન્ડ કાંટો",
    "Tap Go and watch the thin second hand move.": "ચલાવો પર ટેપ કરો અને પાતળો સેકન્ડ કાંટો જુઓ.",
    "Tap the Go key beside the clock.": "ઘડિયાળ પાસેનું ચલાવો બટન દબાવો.",
    "The second hand goes round once every minute, so a minute is sixty seconds.": "સેકન્ડ કાંટો દર મિનિટે એક ચક્કર ફરે છે, તેથી 1 મિનિટ 60 સેકન્ડની છે.",
    "You learned: a lap of the second hand is a minute, 60 seconds.": "તમે શીખ્યા: સેકન્ડ કાંટાનું એક ચક્કર 1 મિનિટ, એટલે 60 સેકન્ડ.",
    "Seconds in a minute?": "1 મિનિટમાં સેકન્ડ?",
    "Tap Go for a whole lap: how many seconds make a minute?": "ચલાવો દબાવી પૂરું ચક્કર જુઓ: 1 મિનિટમાં કેટલી સેકન્ડ?",
    "How many marks are there round the face?": "ઘડિયાળની ફરતે કેટલાં નિશાન છે?",
    "Yes, 60 marks went by, so a minute is 60 seconds.": "હા, 60 નિશાન પસાર થયા, એટલે 1 મિનિટ 60 સેકન્ડની છે.",
    "Marks it moves?": "કેટલાં નિશાન ખસ્યો?",
    "Tap Go and watch the long hand: how many marks does it move in a lap?": "ચલાવો દબાવી લાંબો કાંટો જુઓ: એક ચક્કરમાં તે કેટલાં નિશાન ખસે છે?",
    "Watch the long blue hand as the lap ends.": "ચક્કર પૂરું થાય ત્યારે લાંબો વાદળી કાંટો જુઓ.",
    "Yes, a whole lap of the second hand moves the minute hand just 1 mark.": "હા, સેકન્ડ કાંટાનું પૂરું ચક્કર મિનિટ કાંટાને ફક્ત 1 નિશાન ખસેડે છે.",
    "seconds": "સેકન્ડ",
    "marks": "નિશાન",
    "mark": "નિશાન",
    "3 laps?": "3 ચક્કર?",
    "Tap Go for 3 laps, then give the seconds and the long hand's marks.": "3 ચક્કર ચલાવો, પછી સેકન્ડ અને લાંબા કાંટાનાં નિશાન કહો.",
    "Each lap is a whole minute of seconds.": "દરેક ચક્કર એક આખી મિનિટની સેકન્ડ છે.",
    "Yes, 3 laps are 180 seconds, and the minute hand moved 3 marks.": "હા, 3 ચક્કર 180 સેકન્ડ છે, અને મિનિટ કાંટો 3 નિશાન ખસ્યો.",
    "Sixty, sixty and twenty-four": "સાઠ, સાઠ અને ચોવીસ",
    "Tap the hour tile to open it into minutes.": "કલાકની ટાઇલ પર ટેપ કરી તેને મિનિટમાં ખોલો.",
    "Tap the red hour tile.": "લાલ કલાકની ટાઇલ પર ટેપ કરો.",
    "60 seconds make a minute, 60 minutes an hour, and 24 hours a day.": "60 સેકન્ડની 1 મિનિટ, 60 મિનિટનો 1 કલાક, અને 24 કલાકનો 1 દિવસ.",
    "You learned: 60 seconds, 60 minutes and 24 hours make the next unit.": "તમે શીખ્યા: 60 સેકન્ડ, 60 મિનિટ અને 24 કલાકથી આગળનો એકમ બને.",
    "Smallest to largest": "સૌથી નાનાથી મોટા",
    "Tap the four units from the smallest to the largest.": "ચારેય એકમો પર નાનાથી મોટાના ક્રમમાં ટેપ કરો.",
    "Which of these units is the smallest?": "આમાં સૌથી નાનો એકમ કયો છે?",
    "Yes, a second, a minute, an hour, then a day.": "હા, સેકન્ડ, મિનિટ, કલાક, પછી દિવસ.",
    "Hours in a day?": "1 દિવસમાં કલાક?",
    "How many hours make a day?": "1 દિવસમાં કેટલા કલાક હોય?",
    "Is a day made the same way as an hour?": "શું દિવસ પણ કલાકની જેમ જ બને છે?",
    "Yes, 24 hours make a day, not 60.": "હા, 1 દિવસ 24 કલાકનો હોય, 60નો નહીં.",
    "a minute": "મિનિટ",
    "an hour": "કલાક",
    "a second": "સેકન્ડ",
    "Largest unit?": "સૌથી મોટો એકમ?",
    "Which is the largest of these units: a minute, an hour or a second?": "આમાં સૌથી મોટો એકમ કયો: મિનિટ, કલાક કે સેકન્ડ?",
    "Which unit takes the longest to pass?": "કયો એકમ પસાર થતાં સૌથી વધુ સમય લે?",
    "Yes, an hour is the largest of the three.": "હા, ત્રણેયમાં કલાક સૌથી મોટો છે.",
    "Larger to smaller: multiply": "મોટાથી નાનો: ગુણાકાર કરો",
    "Tap Step down to open the 4 minute tiles into seconds.": "4 મિનિટની ટાઇલ્સને સેકન્ડમાં ખોલવા નીચે ઉતારો દબાવો.",
    "Tap the Step down key beside the tiles.": "ટાઇલ્સ પાસેનું નીચે ઉતારો બટન દબાવો.",
    "To change to a smaller unit, multiply by the number between the rungs.": "નાના એકમમાં ફેરવવા પગથિયાં વચ્ચેની સંખ્યાથી ગુણાકાર કરો.",
    "You learned: multiply by the number between the rungs.": "તમે શીખ્યા: પગથિયાં વચ્ચેની સંખ્યાથી ગુણાકાર કરો.",
    "9 days in hours?": "9 દિવસ, કલાકમાં?",
    "Tap Step down to open the 9 days, then find how many hours there are.": "નીચે ઉતારો દબાવી 9 દિવસ ખોલો, પછી કહો કેટલા કલાક છે.",
    "Which rung are the tiles on, and which rung is below it?": "ટાઇલ્સ કયા પગથિયે છે, અને તેની નીચે કયું પગથિયું છે?",
    "Yes, 9 × 24 = 216 hours.": "હા, 9 × 24 = 216 કલાક.",
    "3 hours in minutes?": "3 કલાક, મિનિટમાં?",
    "Open the 3 hours the same way: how many minutes is that?": "3 કલાક પણ એમ જ ખોલો: તે કેટલી મિનિટ છે?",
    "An hour is not 100 minutes, so look at one bar.": "1 કલાક 100 મિનિટનો નથી, એક પટ્ટી જુઓ.",
    "Yes, 3 × 60 = 180 minutes.": "હા, 3 × 60 = 180 મિનિટ.",
    "14 minutes in seconds?": "14 મિનિટ, સેકન્ડમાં?",
    "How many seconds are there in 14 minutes?": "14 મિનિટમાં કેટલી સેકન્ડ હોય?",
    "Each minute tile opens into how many seconds?": "મિનિટની એક ટાઇલ કેટલી સેકન્ડમાં ખૂલે છે?",
    "Yes, 14 × 60 = 840 seconds.": "હા, 14 × 60 = 840 સેકન્ડ.",
    "Two units into one": "બે એકમ, એકમાં",
    "Tap Step down to open the hour into minutes.": "કલાકને મિનિટમાં ખોલવા નીચે ઉતારો દબાવો.",
    "Tap the Step down key beside the tile.": "ટાઇલ પાસેનું નીચે ઉતારો બટન દબાવો.",
    "Now tap Slide in to bring the 10 minutes beside it.": "હવે 10 મિનિટ તેની પાસે લાવવા ખસેડો દબાવો.",
    "Tap the Slide in key.": "ખસેડો બટન દબાવો.",
    "Change the larger unit, then add the part already in the smaller unit.": "મોટો એકમ બદલો, પછી નાના એકમમાં પહેલેથી રહેલો ભાગ ઉમેરો.",
    "You learned: change the larger unit, then add the part already there.": "તમે શીખ્યા: મોટો એકમ બદલો, પછી પહેલેથી રહેલો ભાગ ઉમેરો.",
    "5 h 18 min in minutes?": "5 કલાક 18 મિનિટ, મિનિટમાં?",
    "Change 5 hours 18 minutes into minutes: step down, then slide in.": "5 કલાક 18 મિનિટને મિનિટમાં ફેરવો: નીચે ઉતારો, પછી ખસેડો.",
    "Which part of the time is in the larger unit?": "સમયનો કયો ભાગ મોટા એકમમાં છે?",
    "Yes, 5 hours 18 minutes is 318 minutes.": "હા, 5 કલાક 18 મિનિટ એટલે 318 મિનિટ.",
    "9 min 25 s in seconds?": "9 મિનિટ 25 સેકન્ડ, સેકન્ડમાં?",
    "Change 9 minutes 25 seconds into seconds.": "9 મિનિટ 25 સેકન્ડને સેકન્ડમાં ફેરવો.",
    "The 25 seconds are seconds already, so add them on.": "25 સેકન્ડ પહેલેથી સેકન્ડમાં છે, તેને ઉમેરો.",
    "Yes, 9 minutes 25 seconds is 565 seconds.": "હા, 9 મિનિટ 25 સેકન્ડ એટલે 565 સેકન્ડ.",
    "Film in minutes?": "ફિલ્મ, મિનિટમાં?",
    "A film is 2 hours 52 minutes long: how many minutes is that?": "એક ફિલ્મ 2 કલાક 52 મિનિટની છે: તે કેટલી મિનિટ છે?",
    "Did you add the 52 minutes after changing the hours?": "કલાક ફેરવ્યા પછી શું તમે 52 મિનિટ ઉમેરી?",
    "Yes, the film is 172 minutes long.": "હા, ફિલ્મ 172 મિનિટની છે.",
    "Watch the thin hand go all the way round. How many ticks is that? What did the minute hand do?": "પાતળા કાંટાનું પૂરું ચક્કર જુઓ. કેટલી ટિક થઈ? મિનિટ કાંટાએ શું કર્યું?",
    "How long does the second hand take to pass a single mark?": "સેકન્ડ કાંટાને એક નિશાન પસાર કરતાં કેટલો સમય લાગે?",
    "From a number to the next there are 5 marks, so count in fives.": "એક અંકથી બીજા સુધી 5 નિશાન છે, તો પાંચ-પાંચ ગણો.",
    "Does the long hand reach the next number, or stop before it?": "લાંબો કાંટો આગળના અંક સુધી પહોંચે છે, કે પહેલાં અટકે છે?",
    "Count the marks between the top number and the long hand now.": "ઉપરના અંક અને લાંબા કાંટા વચ્ચેનાં નિશાન ગણો.",
    "How many seconds does each lap take?": "દરેક ચક્કરમાં કેટલી સેકન્ડ લાગે?",
    "Add the seconds of a lap three times, and count the long hand's marks.": "એક ચક્કરની સેકન્ડ ત્રણ વાર ઉમેરો, અને લાંબા કાંટાનાં નિશાન ગણો.",
    "How many of the smaller unit make one of the bigger one?": "નાના એકમના કેટલા મળીને મોટા એકમનો એક બને?",
    "How many of the smaller unit make one of the next?": "નાના એકમના કેટલા મળીને આગળનાનો એક બને?",
    "Think of the minute and the second first, then the hour and the day.": "પહેલાં મિનિટ અને સેકન્ડ વિચારો, પછી કલાક અને દિવસ.",
    "Which unit is made of 60 seconds?": "કયો એકમ 60 સેકન્ડથી બને છે?",
    "Start with the one that is quickest to tick by.": "જે સૌથી ઝડપથી પસાર થાય તેનાથી શરૂ કરો.",
    "Think of the time from one sunrise to the next.": "એક સૂર્યોદયથી બીજા સૂર્યોદય સુધીનો સમય વિચારો.",
    "Count the hours from one midnight to the next on the clock.": "ઘડિયાળ પર એક મધ્યરાત્રિથી બીજી મધ્યરાત્રિ સુધીના કલાક ગણો.",
    "Which one could you cut into the other two?": "કોને કાપીને બાકીના બે બનાવી શકાય?",
    "Put the three on the ladder: the largest goes at the top.": "ત્રણેયને નિસરણી પર મૂકો: સૌથી મોટો સૌથી ઉપર જાય.",
    "Each of these breaks into how many of the next? So how many are there in all?": "દરેક આગળના એકમના કેટલામાં તૂટે? તો કુલ કેટલા થયા?",
    "Count one bar's rows of ten.": "એક પટ્ટીની દસ-દસની હરોળ ગણો.",
    "Multiply the number of tiles by the cells in one bar.": "ટાઇલ્સની સંખ્યાને એક પટ્ટીનાં ખાનાંથી ગુણો.",
    "Break the hours into minutes first. Now, what about the minutes that were already there?": "પહેલાં કલાકને મિનિટમાં ખોલો. હવે જે મિનિટ પહેલેથી હતી, તેનું શું?",
    "What happens to the part already in the smaller unit?": "નાના એકમમાં પહેલેથી રહેલા ભાગનું શું થાય?",
    "Which part must NOT be opened?": "કયો ભાગ ખોલવાનો નથી?",
    "bars": "પટ્ટી",
    "Go": "ચલાવો",
    "Laps": "ચક્કર",
    "Lap": "ચક્કર",
    "Minute hand": "મિનિટ કાંટો",
    "hour": "કલાક",
    "hours": "કલાક",
    "minutes": "મિનિટ",
    "largest": "સૌથી મોટો",
    "Day": "દિવસ",
    "Hour": "કલાક",
    "Minute": "મિનિટ",
    "Second": "સેકન્ડ",
    "Step down": "નીચે ઉતારો",
    "Slide in": "ખસેડો",
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
const PHASES = [
  {
    n: 1,
    concept: "The second hand",
    conceptId: "M1.S2.T4.C15", objectiveIds: ["O5"],
    says: ["Watch the thin hand go all the way round. How many ticks is that? What did the minute hand do?"],
    /* warm-up: the thin hand runs from the 12 to the 1 only (5 marks light up), so no question's answer is shown */
    steps: [{ say: "Tap Go and watch the thin second hand move.", on: "go", hint: "Tap the Go key beside the clock." }],
    /* tries, as the plan writes it: A miss is answered three ways at once and none of them is the answer. First rung, from the item's own miss line: how many marks are there round the face? Second rung, the phase's: how long does the second hand take to pass one mark? Third rung: the clock is cut to one stretch from one number to the next, five ticks, before the whole lap comes back. The pad stays open behind all three rungs. */
    ladder: ["How long does the second hand take to pass a single mark?", "From a number to the next there are 5 marks, so count in fives."],
    closing: "The second hand goes round once every minute, so a minute is sixty seconds.",
    learned: "You learned: a lap of the second hand is a minute, 60 seconds.",
    traceback: "the lap runs again from the 12, the count is written at every number (5, 10 ... 60) and the minute hand's marks are lit",
    items: [
      /* practice 1: answer in the plan = Sixty seconds, counted by the thin second hand (its "which hand" half is the act itself: the thin hand is the one that counts) */
      { qid: "M1.S2.T4.C15:1", kind: "lap", laps: 1, ask: "Seconds in a minute?", answer: 60, near: 12, tuUnit: "seconds",
        say: "Tap Go for a whole lap: how many seconds make a minute?",
        miss: "How many marks are there round the face?",
        win: "Yes, 60 marks went by, so a minute is 60 seconds." },
      /* authored (the brief's second misconception: one lap moves the minute hand to the next number); no plan question asks it */
      { qid: null, kind: "lap", laps: 1, ask: "Marks it moves?", answer: 1, near: 5, tuUnit: "mark",
        say: "Tap Go and watch the long hand: how many marks does it move in a lap?",
        miss: "Watch the long blue hand as the lap ends.",
        ladder: ["Does the long hand reach the next number, or stop before it?", "Count the marks between the top number and the long hand now."],
        win: "Yes, a whole lap of the second hand moves the minute hand just 1 mark." },
      /* learn ML1: answer in the plan = One hundred and eighty seconds pass, and the minute hand moves three marks, which is three minutes */
      /* plan question: The second hand goes round the clock three times. How many seconds pass, and how far does the minute hand move? */
      { qid: "M1.S2.T4.C15:ML1", kind: "lap", laps: 3, parts: [{ label: "seconds" }, { label: "marks" }], answer: [180, 3], near: "180|15", ask: "3 laps?",
        say: "Tap Go for 3 laps, then give the seconds and the long hand's marks.",
        miss: "Each lap is a whole minute of seconds.",
        ladder: ["How many seconds does each lap take?", "Add the seconds of a lap three times, and count the long hand's marks."],
        win: "Yes, 3 laps are 180 seconds, and the minute hand moved 3 marks." },
    ],
  },
  {
    n: 2,
    concept: "Sixty, sixty and twenty-four",
    conceptId: "M1.S2.T4.C16", objectiveIds: ["O5"],
    says: ["How many of the smaller unit make one of the bigger one?"],
    /* warm-up: one hour tile opens into its 60 minute cells (the hour-minute exchange, which no question of this phase asks) */
    steps: [{ say: "Tap the hour tile to open it into minutes.", on: "open", hint: "Tap the red hour tile." }],
    /* tries, as the plan writes it: First rung, from the item: which of these units is the smallest? Second rung, the phase's: how many of the smaller unit make one of the next? Third rung: the ladder is cut to two rungs, minute and second, and the child fills their one tag before the other rungs come back. The word pad and the number pad stay open. */
    ladder: ["How many of the smaller unit make one of the next?", "Think of the minute and the second first, then the hour and the day."],
    closing: "60 seconds make a minute, 60 minutes an hour, and 24 hours a day.",
    learned: "You learned: 60 seconds, 60 minutes and 24 hours make the next unit.",
    traceback: "the right ladder is set out beside the child's, a day tile opens into 24 hour cells and a minute tile into 60 second cells, the tags are written",
    items: [
      /* learn ML2: answer in the plan = A second, a minute, an hour, a day. (the exchanges are asked by question 2) */
      /* plan question: Put these units in order from the smallest to the largest: an hour, a second, a day, a minute. Say how many of each make the next. */
      { qid: "M1.S2.T4.C16:ML2", kind: "order", pad: "enter", ask: "Smallest to largest", answer: "second,minute,hour,day", near: "minute,second,hour,day",
        say: "Tap the four units from the smallest to the largest.",
        miss: "Which of these units is the smallest?",
        ladder: ["Which unit is made of 60 seconds?", "Start with the one that is quickest to tick by."],
        win: "Yes, a second, a minute, an hour, then a day." },
      /* authored from ML2's second half ("say how many of each make the next"): the exchange the misconception gets wrong (60 for every step) */
      { qid: null, kind: "tags", answer: 24, near: 60, ask: "Hours in a day?", tuUnit: "hours",
        say: "How many hours make a day?",
        miss: "Is a day made the same way as an hour?",
        ladder: ["Think of the time from one sunrise to the next.", "Count the hours from one midnight to the next on the clock."],
        win: "Yes, 24 hours make a day, not 60." },
      /* practice 2: answer in the plan = An hour */
      { qid: "M1.S2.T4.C16:2", kind: "largest", choices: [{ id: "minute", label: "a minute" }, { id: "hour", label: "an hour" }, { id: "second", label: "a second" }],
        answer: "hour", near: "second", ask: "Largest unit?",
        say: "Which is the largest of these units: a minute, an hour or a second?",
        miss: "Which unit takes the longest to pass?",
        ladder: ["Which one could you cut into the other two?", "Put the three on the ladder: the largest goes at the top."],
        win: "Yes, an hour is the largest of the three." },
    ],
  },
  {
    n: 3,
    concept: "Larger to smaller: multiply",
    conceptId: "M1.S2.T4.C17", objectiveIds: ["O6"],
    says: ["Each of these breaks into how many of the next? So how many are there in all?"],
    /* warm-up: 4 minutes step down into 240 seconds (no item answers or near-misses 240; its factor 60 was met in phases 1-2; the coordinator's choice) */
    steps: [{ say: "Tap Step down to open the 4 minute tiles into seconds.", on: "step-down", hint: "Tap the Step down key beside the tiles." }],
    /* tries, as the plan writes it: First rung, from the item: which rung are the tiles on, and which rung is below it? Second rung, the phase's: how many cells does one tile open into? Third rung: the row is cut to one tile, and the child opens it and counts its cells before the full row comes back. The pad and the unit strip stay open. */
    ladder: ["Count one bar's rows of ten.", "Multiply the number of tiles by the cells in one bar."],
    closing: "To change to a smaller unit, multiply by the number between the rungs.",
    learned: "You learned: multiply by the number between the rungs.",
    traceback: "the tiles step down, each opens into one bar of the rung below, and the multiplication is written with its total",
    items: [
      /* learn ML3: answer in the plan = 216 hours */
      { qid: "M1.S2.T4.C17:ML3", kind: "conv", from: 0, tiles: 9, extra: 0, ask: "9 days in hours?", answer: 216, near: 540, tuUnit: "hours",
        say: "Tap Step down to open the 9 days, then find how many hours there are.",
        miss: "Which rung are the tiles on, and which rung is below it?",
        win: "Yes, 9 × 24 = 216 hours." },
      /* practice 3: answer in the plan = 180 minutes */
      { qid: "M1.S2.T4.C17:3", kind: "conv", from: 1, tiles: 3, extra: 0, ask: "3 hours in minutes?", answer: 180, near: 300, tuUnit: "minutes",
        say: "Open the 3 hours the same way: how many minutes is that?",
        miss: "An hour is not 100 minutes, so look at one bar.",
        win: "Yes, 3 × 60 = 180 minutes." },
      /* practice 4: answer in the plan = 840 seconds */
      { qid: "M1.S2.T4.C17:4", kind: "conv", from: 2, tiles: 14, extra: 0, ask: "14 minutes in seconds?", answer: 840, near: 1400, tuUnit: "seconds",
        say: "How many seconds are there in 14 minutes?",
        miss: "Each minute tile opens into how many seconds?",
        win: "Yes, 14 × 60 = 840 seconds." },
      /* practice 5 (unused: exactly three a phase; its two-step story is the same multiplication twice) */
    ],
  },
  {
    n: 4,
    concept: "Two units into one",
    conceptId: "M1.S2.T4.C18", objectiveIds: ["O6"],
    says: ["Break the hours into minutes first. Now, what about the minutes that were already there?"],
    /* warm-up: 1 hour 10 minutes becomes 70 minutes (no question of this phase asks 70) */
    steps: [
      { say: "Tap Step down to open the hour into minutes.", on: "step-down", hint: "Tap the Step down key beside the tile." },
      { say: "Now tap Slide in to bring the 10 minutes beside it.", on: "slide", hint: "Tap the Slide in key." },
    ],
    /* tries, as the plan writes it: First rung, from the item: which part of the time is in the larger unit? Second rung, the phase's: what happens to the part already in the smaller unit? Third rung: the time is cut to one hour and a few minutes, and the child opens the hour and slides the minutes in before the larger time comes back. The pad and the unit strip stay open. */
    ladder: ["What happens to the part already in the smaller unit?", "Which part must NOT be opened?"],
    closing: "Change the larger unit, then add the part already in the smaller unit.",
    learned: "You learned: change the larger unit, then add the part already there.",
    traceback: "the larger unit's tiles step down into bars, the side bay slides in beside them, and the sum is written with its total",
    items: [
      /* learn ML4: answer in the plan = 318 minutes */
      { qid: "M1.S2.T4.C18:ML4", kind: "conv", from: 1, tiles: 5, extra: 18, ask: "5 h 18 min in minutes?", answer: 318, near: 300, tuUnit: "minutes",
        say: "Change 5 hours 18 minutes into minutes: step down, then slide in.",
        miss: "Which part of the time is in the larger unit?",
        win: "Yes, 5 hours 18 minutes is 318 minutes." },
      /* practice 6: answer in the plan = 565 seconds */
      { qid: "M1.S2.T4.C18:6", kind: "conv", from: 2, tiles: 9, extra: 25, ask: "9 min 25 s in seconds?", answer: 565, near: 540, tuUnit: "seconds",
        say: "Change 9 minutes 25 seconds into seconds.",
        miss: "The 25 seconds are seconds already, so add them on.",
        win: "Yes, 9 minutes 25 seconds is 565 seconds." },
      /* practice 7: answer in the plan = 172 minutes, because 2 hours are 120 minutes and 52 more are added */
      /* plan question: A film is 2 hours 52 minutes long. How many minutes is that? */
      { qid: "M1.S2.T4.C18:7", kind: "conv", from: 1, tiles: 2, extra: 52, ask: "Film in minutes?", answer: 172, near: 252, tuUnit: "minutes",
        say: "A film is 2 hours 52 minutes long: how many minutes is that?",
        miss: "Did you add the 52 minutes after changing the hours?",
        win: "Yes, the film is 172 minutes long." },
      /* practice 8 (unused: exactly three a phase; its unit slip is met by every question naming its unit) */
    ],
  },
];

/* The numbers, rows, sizes and targets the working area needs (they go into the sidecar too). */
const MODEL = {
  units: ["day", "hour", "minute", "second"],
  exchange: [24, 60, 60],
  clock: { marks: 60, numbers: 12, start: "10:00:00" },
  barCols: 10,
  pile: ["hour", "second", "day", "minute"],
};

/* the ladder's own colours and words (brief: day olive, hour vermilion, minute deep blue, second reddish purple) */
const TU_NAME = ["Day", "Hour", "Minute", "Second"];
const TU_COL = ["#6E7F1A", "#D55E00", "#0072B2", "#CC79A7"];
const TU_EX = [24, 60, 60];
const TU_INK = "#2B2B2B";
const TU_PEN = "#3C3C3C";
/* seconds in one of each unit: the oracle's own route (shares nothing with TU_EX) */
const TU_SPU = [86400, 3600, 60, 1];
/* the guide steps' warm-ups: never a question's own numbers */
const TU_WARM: any[] = [{ kind: "lap", laps: 0 }, { kind: "warmopen" }, { kind: "conv", from: 2, tiles: 4, extra: 0 }, { kind: "conv", from: 1, tiles: 1, extra: 10 }];

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* judge: is this value right for this item? (numbers compare as numbers) */
const judge = (item: any, v: any) => {
  if (item.parts) return judgeSlotParts(item, v);
  if (typeof item.answer === "number") return leadNumber(v) === item.answer;
  return String(v).trim().toLowerCase() === String(item.answer).trim().toLowerCase();
};
/* oracle: every answer re-derived from the seconds in each unit, a route that shares no code with judge or Work */
const oracle = () => PHASES.every((p: any) => p.items.every((it: any) => {
  const U = MODEL.units, spu = (u: string) => TU_SPU[U.indexOf(u)];
  let want: any;
  if (it.kind === "lap") want = it.parts ? [it.laps * spu("minute"), it.laps] : it.tuUnit === "mark" ? it.laps : it.laps * spu("minute") / spu("second");
  else if (it.kind === "conv") want = (it.tiles * TU_SPU[it.from] + it.extra * TU_SPU[it.from + 1]) / TU_SPU[it.from + 1];
  else if (it.kind === "order") want = U.slice().sort((a, b) => spu(a) - spu(b)).join(",");
  else if (it.kind === "tags") want = spu("day") / spu("hour");
  else if (it.kind === "largest") want = it.choices.map((c: any) => c.id).sort((a: string, b: string) => spu(b) - spu(a))[0];
  return JSON.stringify(want) === JSON.stringify(it.answer);
}));
/* the most likely wrong answer (the misconception); judge must reject it */
const nearMiss = (item: any) => (item.near !== undefined ? item.near : item.parts ? item.answer.map((x: any, k: number, a: any[]) => (x !== null && a.slice(k + 1).every((y: any) => y === null) ? x + 1 : x ?? "")).join("|")
  : typeof item.answer === "number" ? item.answer + 1 : "~");
/* the forms of an answer that no question, hint or ladder line may print (a choice or an order names its options by design) */
const answerForms = (item: any) => (item.choices || item.kind === "order" ? []
  : item.parts ? item.answer.filter((x: number) => x >= 10).flatMap((x: number) => [String(x), indian(x), words(x)])
  : typeof item.answer === "number" ? [String(item.answer), indian(item.answer), words(item.answer)]
  : [String(item.answer)]);
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => item.answer;

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => (T.state().stage === "demo" ? HOOK.demo && HOOK.demo() : T.submit(item.answer));
/* the agent's answer() for an item made on the working area: set it as a child would; undefined = type it */
const answer = (item: any, v: any) => (item.pad === "enter" && HOOK.set ? HOOK.set(v) : undefined);
/* the agent's check() before Enter: performs a question's act at once (run the lap, step down, slide in); undefined in the demo stage */
const check = () => (HOOK.check ? HOOK.check() : undefined);

/* ── drawing helpers (called, never mounted) ─────────────────────────────────────────────── */
const tuPt = (cx: number, cy: number, r: number, deg: number) => [cx + r * Math.sin((deg * Math.PI) / 180), cy - r * Math.cos((deg * Math.PI) / 180)];
/* the clock: case (plain + the wall_clock skin), face, 60 marks, 12 numbers, the three hands. sec = ticks so far from 10:00:00 */
function tuClock(cx: number, cy: number, r: number, sr: number, sec: number, o: any = {}) {
  const laps = Math.floor(sec / 60), lit = o.lit ? (sec === 0 ? 0 : ((sec - 1) % 60) + 1) : 0;
  const sA = (sec % 60) * 6, mA = laps * 6 + (sec % 60) * 0.1, hA = 300 + (laps + (sec % 60) / 60) * 0.5;
  const hand = (a: number, len: number, wd: number, col: string, tail = 0) => {
    const [x1, y1] = tuPt(cx, cy, -tail, a), [x2, y2] = tuPt(cx, cy, len, a);
    return <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={col} strokeWidth={wd} strokeLinecap="round" />;
  };
  const ns = o.ns || 34;
  return (
    <g pointerEvents="none">
      <circle cx={cx} cy={cy} r={sr} fill="#8A5A2E" stroke={TU_INK} strokeWidth={3} />
      <circle cx={cx} cy={cy} r={r} fill="#FFF8E7" />
      <Skin name="wall_clock" x={cx - sr} y={cy - sr} w={2 * sr} h={2 * sr} />
      {Array.from({ length: 60 }).map((_, i) => {
        const big = i % 5 === 0, [x1, y1] = tuPt(cx, cy, r - (big ? 22 : 12), i * 6), [x2, y2] = tuPt(cx, cy, r - 3, i * 6);
        return <line key={"m" + i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={TU_INK} strokeWidth={big ? 4.5 : 2.2} strokeLinecap="round" />;
      })}
      {Array.from({ length: lit }).map((_, i) => {
        const [x, y] = tuPt(cx, cy, r - 30, (i + 1) * 6);
        return <circle key={"l" + i} cx={x} cy={y} r={5.5} fill={TU_COL[3]} stroke={shade(TU_COL[3], 0.35)} strokeWidth={1.2} />;
      })}
      {(o.minuteRing || 0) > 0 && Array.from({ length: o.minuteRing }).map((_, i) => {
        const [x, y] = tuPt(cx, cy, r - 8, (i + 1) * 6);
        return <circle key={"mr" + i} cx={x} cy={y} r={9} fill="none" stroke={shade(TU_COL[2], 0.1)} strokeWidth={3.5} />;
      })}
      {hand(hA, r * 0.5, 12, TU_COL[1])}
      {hand(mA, r * 0.8, 8, TU_COL[2])}
      {hand(sA, r * 0.9, 4, shade(TU_COL[3], 0.1), r * 0.18)}
      {/* the numerals sit ABOVE the hands and the lit dots, each on an ivory halo, so no hand or dot runs through a digit */}
      {Array.from({ length: 12 }).map((_, i) => {
        const [x, y] = tuPt(cx, cy, r * 0.68, (i + 1) * 30);
        return <text key={"n" + i} x={x} y={y} dominantBaseline="central" textAnchor="middle" fontSize={ns} fontWeight={700} fill={TU_INK} stroke="#FFF8E7" strokeWidth={8} paintOrder="stroke" strokeLinejoin="round">{i + 1}</text>;
      })}
      <circle cx={cx} cy={cy} r={10} fill={TU_INK} />
      <circle cx={cx} cy={cy} r={4} fill="#FFF8E7" />
    </g>
  );
}
/* a bar of `cells` unit cells in rows of 10 (60 = six rows of ten, 24 = two rows of ten and four), every cell dark-edged */
function tuBar(k: string, x: number, y: number, cells: number, c: number, col: string) {
  const rows = Math.ceil(cells / 10);
  return (
    <g key={k} pointerEvents="none">
      <rect x={x - 3} y={y - 3} width={10 * c + 6} height={rows * c + 6} rx={6} fill="#FFFFFF" stroke={TU_INK} strokeWidth={3} filter="url(#tu-shadow-sm)" />
      {Array.from({ length: cells }).map((_, i) => (
        <rect key={i} x={x + (i % 10) * c} y={y + Math.floor(i / 10) * c} width={c} height={c} fill={col} fillOpacity={0.88} stroke={TU_INK} strokeWidth={1.6} />
      ))}
    </g>
  );
}
const tuCell = (cells: number) => Math.min(32, Math.floor(100 / Math.ceil(cells / 10)));   /* as big as a rung allows: 24 cells at 32, 60 at 16 */
const tuBarH = (cells: number, c = tuCell(cells)) => Math.ceil(cells / 10) * c;
/* a label's width at size `sz`: Latin about 0.6 em a letter, Devanagari / Gujarati counted on letters and spacing signs only */
const tuTextW = (t: string, sz: number) => Array.from(String(t)).reduce((a, ch) => a + (/[\u0900-\u0902\u093C\u0941-\u0948\u094D\u0A81-\u0A82\u0ABC\u0AC1-\u0AC8\u0ACD]/.test(ch) ? 0 : ch === " " ? 0.3 : /[\u0900-\u097F\u0A80-\u0AFF]/.test(ch) ? 0.45 : 0.56), 0) * sz;
/* count bars of `cells` each on a rung centred at cy, from x: up to 3 drawn whole, more as a stack with its count */
function tuBars(count: number, cells: number, x: number, cy: number, col: string, tx: any, lf = 1, maxW = 530) {
  const m = Math.min(count - 1, 6), lab = indian(count) + " " + tx("bars"), lsz = Math.round(T.label * lf), lw = tuTextW(lab, lsz);
  const k = Math.min(count, 3), fit = count <= 3 ? (maxW - 14 * (k - 1)) / (10 * k) : (maxW - m * 6 - 16 - lw) / 10;
  const c = Math.max(10, Math.min(tuCell(cells), Math.floor(fit))), bw = 10 * c, bh = tuBarH(cells, c), y = cy - bh / 2;
  if (count <= 3) {
    return { c, end: x + count * bw + (count - 1) * 14, el: <g>{Array.from({ length: count }).map((_, j) => tuBar("b" + j, x + j * (bw + 14), y, cells, c, col))}</g> };
  }
  const lx = x + bw + m * 6 + 16;
  return {
    c,
    end: lx + lw,
    el: (
      <g pointerEvents="none">
        {Array.from({ length: m }).map((_, j) => (
          <rect key={"s" + j} x={x - 3 + (m - j) * 6} y={y - 3} width={bw + 6} height={bh + 6} rx={5} fill={tint(col, 0.55)} stroke={TU_INK} strokeWidth={3} filter="url(#tu-shadow-sm)" />
        ))}
        {tuBar("top", x, y, cells, c, col)}
        <text x={lx + lw} y={cy + (lf > 1 ? 3 : 0)} textAnchor="end" dominantBaseline="central" fontSize={lsz} fontWeight={700} fill={TU_INK}>{lab}</text>
      </g>
    ),
  };
}
/* a unit tile (plain on purpose: a unit, not an object) */
function tuTile(k: string, x: number, y: number, w: number, h: number, col: string) {
  return (
    <g key={k} pointerEvents="none">
      <rect x={x} y={y} width={w} height={h} rx={12} fill={col} stroke={shade(col, 0.35)} strokeWidth={3} filter="url(#tu-shadow-sm)" />
      <rect x={x + 3} y={y + 3} width={w - 6} height={h - 6} rx={9} fill="none" stroke="#FFFFFF" strokeOpacity={0.35} strokeWidth={1.5} />
      <path d={`M ${x + 12} ${y + 6} H ${x + w - 12}`} stroke="#FFFFFF" strokeOpacity={0.65} strokeWidth={3} strokeLinecap="round" />
    </g>
  );
}

/* ── the working area ────────────────────────────────────────────────────────────────────────
   keyOnly: the area is 64,108, 1472 x 520 (900 wide with the panel open, bigPad); the whole picture is laid out in a
   900-wide scene, centred while the panel is shut and kept left of box.key, so it sits at one size open or shut.
   Phase 1: the wall clock and its Go key. Phase 2: the hour tile (warm-up), the rung cards (order), the ladder with
   its tags, the three unit cards. Phases 3 and 4 and free play: the ladder of four rungs, tiles, Step down / Slide in. */
function Work({ phase, n, item, index, stage, wrong, typed, api, MODEL, step, stepOn, box, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();
  const mv = useTimeline();
  const P = PHASES[n - 1];
  const free = stage === "free";
  const demo = !free && !!P.steps && (stage === "demo" || stage === "teach");
  const it: any = free ? { kind: "free" } : demo ? TU_WARM[n - 1] : item || {};
  /* the board belongs to the ENTRY of a question (PATTERNS §18): a new entry is a fresh board */
  const base = free ? "free" : demo ? n + ":demo" : n + ":" + index;
  const ent = useRef({ k: "", c: 0 });
  if (ent.current.k !== base) ent.current = { k: base, c: ent.current.c + 1 };
  const qk = base + "#" + ent.current.c;
  const fresh = () => ({ qk, sec: 0, running: false, acted: false, opened: false, slid: false, order: [] as string[], demo: null as any, fly: null as any, tracing: false, pc: 0, fk: 0, fn: 1, fd: 0 });
  const [raw, setRaw] = useState<any>(fresh);
  const S = raw.qk === qk ? raw : fresh();
  const put = (o: any) => setRaw((p: any) => (ent.current.k + "#" + ent.current.c !== qk ? p : { ...(p.qk === qk ? p : fresh()), ...o }));
  const busy = useRef(false);
  const playing = useRef(false);
  const orderRef = useRef<string[]>([]);
  useEffect(() => { busy.current = false; playing.current = false; orderRef.current = []; return () => { tl.stop(); mv.stop(); playing.current = false; }; }, [qk]);

  const kx = box.key ? box.key.x - 12 : box.w;
  /* one size and one place, keypad open or shut (LAYOUT §3): the scene is laid out for the open width (900) and never moves */
  /* the pictures with no unit-box grid (the clock, the rung cards, the three units) centre in the room left of the key; the
     grids (bars, the ladder of tags, free play) keep ONE size and place, keypad open or shut (LAYOUT §3) */
  /* a non-grid picture (the clock with Go and Laps, the rung cards, the three unit cards) centres its drawn group in the free room left of
     the key's corner while the keypad is shut and moves to the left edge, at the SAME size, as the keypad opens. Content bounds per scene: */
  const bounds: any = free || it.kind === "conv" ? [4, 898] : it.kind === "lap" ? [98, 892] : it.kind === "order" ? [S.demo && S.demo.ghost ? 0 : 150, 894]
    : it.kind === "largest" ? [20, 855] : it.kind === "tags" ? [104, 806] : it.kind === "warmopen" ? [110, 640] : [0, 900];
  const room0 = Math.min(box.w, kx), gw = bounds[1] - bounds[0];
  /* the unit-box grids (bars, the tag ladder and its bar of 24, the warm-up's 60 cells, free play) keep ONE size and place, keypad open or
     shut (LAYOUT §3, PREFLIGHT 23-25): laid out once, as big as the room beside the OPEN keypad allows; only the non-grid pictures centre */
  const gridScene = free || it.kind === "conv" || it.kind === "tags" || it.kind === "warmopen";
  const X0 = gridScene ? 0 : Math.round(Math.max(-bounds[0], Math.min(kx - bounds[1], (room0 - gw) / 2 - bounds[0])));
  const cyR = (k: number) => 70 + k * 124;
  const CK = { x: 330, y: 260, r: 172, sr: 232 };
  const GO = { x: 656, y: 110, w: 236, h: 112 };
  /* Hindi and Gujarati letters sit lower and smaller than Latin capitals: the words the tool draws take 1.15x in hi / gu, 3 lower for the matras */
  const LF = lang === "en" ? 1 : 1.15, lab = (n: number) => Math.round(n * LF), md = lang === "en" ? 0 : 3;
  const WT = { x: 110, y: 185, w: 210, h: 150 };
  const AK = (k: number) => ({ x: 722, y: cyR(k) - 52, w: 176, h: 104 });   /* 12 clear of the rung panel, ring included */

  const needAct = it.kind === "lap" || it.kind === "conv";
  const twoActs = it.kind === "conv" && it.extra > 0;
  const doneActs = needAct ? !!S.acted : true;
  /* PLAYBOOK 10: a repeated act never re-locks. Once this question's lap has run, Go is drawn quiet and ignores taps until the
     question changes (S resets per entry); a replay would also reset the clock under the child's answer */
  const goSpent = !demo && !free && it.kind === "lap" && !!S.acted;
  const asking = !free && !demo && stage === "ask";
  const showTotal = demo || (S.demo && S.demo.total) || stage === "win" || stage === "idle";

  /* ── the acts: no hand is drawn (the owner, 2026-11-16): the clock runs, the tile opens, the row drops a rung and the side bay slides
     by itself; only the pencil (api.act) writes. S.fly holds a move in flight (the answer gate stays shut: the question's act is not done
     until the pencil has written); `mv` is the moves' own timeline, kept apart from the correction's `tl`; reduced motion lands at once ── */
  const runClock = (ticks: number, ms: number, done: () => void) => {
    const st: any[] = [];
    for (let t = 1; t <= ticks; t++) st.push([ms, () => { put({ sec: t }); if (t % 5 === 0) api.sfx.tick(); }]);
    tl.run(st, done);
  };
  const fly = (key: string, n: number, ms: number, land: () => void) => {
    playing.current = true;
    const end = () => { playing.current = false; put({ fly: null }); land(); };
    if (reducedMotion()) { end(); return; }
    mv.run(Array.from({ length: n }, (_, i) => [ms, () => put({ fly: { [key]: (i + 1) / n } })]), end);
  };
  const stopFly = () => { if (playing.current) { mv.stop(); playing.current = false; put({ fly: null }); } };
  const doGo = () => {
    if (busy.current || goSpent) return;
    busy.current = true;
    put({ sec: 0, running: true, demo: null });
    runClock(demo ? 5 : (it.laps || 1) * 60, demo ? 200 : 30, () => { busy.current = false; put({ running: false, acted: true }); api.sfx.settle(); api.did("go"); });
  };
  const doOpen = () => {
    if (busy.current) return;
    if (S.opened) { api.did("open"); return; }
    busy.current = true;
    /* 4 x 50 ms: the bar of 60 jumps out of the hour tile */
    fly("open", 4, 50, () => { busy.current = false; put({ opened: true }); api.sfx.trade(); api.did("open"); });
  };
  const freeStep = () => {
    const r = S.fk + S.fd;
    if (busy.current || r >= 3) return;
    busy.current = true;
    /* 4 x 50 ms: the lowest row jumps down one rung */
    const fd = S.fd + 1;
    fly("drop", 4, 50, () => { busy.current = false; put({ fd }); api.sfx.trade(); });
  };
  /* the pencil WRITES only what the child already has (PATTERNS §15): the tile count and the times sign, and the part already in the
     smaller unit; the factor stays "?" (the child reads it off one bar's cells) until the win, the traceback or the warm-up */
  const EXX = 800, EXS = 44;
  const exprToks = (): string[] => (it.kind !== "conv" ? [] : it.extra ? [it.tiles + " ×", "+ " + it.extra] : [it.tiles + " ×"]);
  const exprAl = ["end", "middle"];
  const exprXs = [EXX + 10, EXX];
  /* centred on the rung, but never past the working area's foot (free play writes four lines on the lowest rung) */
  const exprY = (r: number, j: number, L: number) => Math.min(cyR(r) - (L - 1) * 23 + 14, 492 - (L - 1) * 46) + j * 46;
  const writeExpr = async () => {
    const toks = exprToks(), r = it.from + 1, L = toks.length + 1;
    await api.act({ tool: "pencil", moves: "write", text: toks, at: toks.map((_, j) => ({ x: X0 + exprXs[j], y: exprY(r, j, L) })), size: EXS, align: toks.map((_, j) => exprAl[j]), onPoint: (i: number) => put({ pc: i + 1 }) });
    put({ pc: 999, acted: true });
  };
  const doStep = async () => {
    if (free) { freeStep(); return; }
    if (busy.current) return;
    if (S.opened) { api.did("step-down"); return; }
    busy.current = true;
    put({ demo: null });
    /* 4 x 50 ms: the tiles' row jumps down one rung and opens into bars there ("it should just jump"; the pencil starts within 300 ms of the tap) */
    fly("drop", 4, 50, async () => {
      put({ opened: true }); api.sfx.trade();
      if (!twoActs) await writeExpr();
      busy.current = false;
      api.did("step-down");
    });
  };
  const bayFrom = 722;
  const bayTo = () => tuBars(it.tiles || 1, TU_EX[it.from] || 60, 170, 0, "#000", tx, LF).end + 42;
  const doSlide = async () => {
    if (busy.current) return;
    if (S.slid || !S.opened) { api.did("slide"); return; }
    busy.current = true;
    /* 4 x 50 ms: the side bay's bar jumps in beside the bars, then the pencil writes */
    fly("slide", 4, 50, async () => {
      put({ slid: true }); api.sfx.settle();
      await writeExpr();
      busy.current = false;
      api.did("slide");
    });
  };
  /* a real tap on a key, tile or card: the answer gate counts from here (never from toolApi); 400 ms double-tap guard */
  const touchedRef = useRef(false);
  const demoRef = useRef(false);
  demoRef.current = demo;
  /* a REAL key press (Enter / Space on a guide step or a key) is a touch too (PATTERNS §20); the agent's toolApi.check() sends no DOM event,
     so it never arms the gate. The flag lives for this mount (a restart remounts Work); each question re-locks until ITS act is done */
  useEffect(() => {
    /* only on a guide step: an Enter at a question (moving between answer boxes, sending an answer) is not an act on the board; a key of
       the board pressed with Enter / Space arms it through pressKey */
    const onKey = (e: any) => { if (e.isTrusted && (e.key === "Enter" || e.key === " ") && demoRef.current) touchedRef.current = true; };
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  }, []);
  const lastKey = useRef(0);
  const pressKey = (id: string) => {
    const t = Date.now();
    if (t - lastKey.current < 400) return;
    lastKey.current = t;
    touchedRef.current = true;
    /* the gate shuts at once and holds through the move and the pencil (api.act used to hold it) */
    if (asking && needAct && !doneActs) api.lock(true);
    act(id);
  };
  const act = (on: any) => {
    if (on === "go") doGo();
    else if (on === "open") doOpen();
    else if (on === "step-down") doStep();
    else if (on === "slide") doSlide();
  };
  const freeRung = (r: number) => {
    if (busy.current) return;
    put(S.fk === r && S.fd === 0 ? { fn: Math.min(9, S.fn + 1) } : { fk: r, fn: 1, fd: 0 });
    api.sfx.tick();
  };
  const pick = (u: string) => {
    if (orderRef.current.includes(u) || orderRef.current.length >= 4) return;
    orderRef.current = [...orderRef.current, u];
    touchedRef.current = true;
    put({ order: orderRef.current, demo: null });
    api.sfx.tick(); api.did("card");
  };
  const unplace = (u: string) => {
    const i = orderRef.current.indexOf(u);
    if (i < 0) return;
    orderRef.current = i === 0 ? [] : orderRef.current.filter((x) => x !== u);
    touchedRef.current = true;
    put({ order: orderRef.current, demo: null });
    api.sfx.settle(); api.did("card");
  };

  /* Enter: in a steps phase it performs the current step; on the order question it sends the ladder the child built */
  api.onEnter(demo && stepOn ? () => act(stepOn)
    : asking && it.kind === "order" ? () => { if (orderRef.current.length === 4) api.submit(orderRef.current.join(",")); }
    : null);
  HOOK.demo = null;
  HOOK.check = asking && needAct && !doneActs ? () => { if (playing.current) { stopFly(); busy.current = false; } put(it.kind === "lap" ? { sec: (it.laps || 1) * 60, acted: true } : { opened: true, slid: true, pc: 999, acted: true }); return undefined; } : null;
  HOOK.set = asking && it.kind === "order" ? (v: any) => {
    const o = (Array.isArray(v) ? v : String(v).split(",")).map((x: any) => String(x).trim().toLowerCase()).filter(Boolean);
    orderRef.current = o; put({ order: o }); api.answerReady(o.length === 4); return undefined;
  } : null;

  /* the order question's Enter key blinks once all four units are on the ladder */
  useEffect(() => { if (asking && it.kind === "order") api.answerReady(S.order.length === 4); }, [S.order.length, stage, qk]);

  /* ANSWER GATED BY THE ACT (PATTERNS §20): after a real touch, the keys wait for the act (the lap, the step down and slide in) */
  const lockWanted = asking && (S.tracing || (touchedRef.current && needAct && (!doneActs || S.running)));
  useEffect(() => { api.lock(lockWanted); }, [lockWanted, qk]);

  /* the win line (a phase's last one gives way to its closing) */
  useEffect(() => { if (stage === "win" && !free && item && item.win) api.say(item.win); }, [stage, qk]);

  /* the traceback: redraws the maths and ends on the whole right answer, unmarked */
  useEffect(() => {
    if (!wrong || stage !== "ask" || free) return;
    stopFly();
    busy.current = true;
    api.lock(true);   /* at once, in the commit of the miss: the pad waits for the whole correction */
    const end = () => { busy.current = false; put({ tracing: false, acted: true }); api.lock(false); };
    if (it.kind === "lap") {
      const laps = it.laps || 1, st: any[] = [];
      put({ tracing: true, sec: 0, demo: { labels: 0, lines: 0, note: false } });
      for (let t = 1; t <= laps * 60; t++) st.push([30, () => put({ sec: t, demo: { labels: Math.floor(Math.min(t, 60) / 5), lines: Math.floor(t / 60), note: t === laps * 60 } })]);
      st.push([400, () => {}]);
      tl.run(st, end);
    } else if (it.kind === "conv") {
      const v = Number(leadNumber(wrong.value)), E = TU_EX[it.from];
      const child = isFinite(v) && v >= E ? { v, q: Math.floor(v / E), r: v % E } : null;
      put({ tracing: true, opened: false, slid: false, pc: 0, demo: child ? { child } : null });
      tl.run([[child ? 2200 : 300, () => {}], [800, () => { put({ demo: null, opened: true }); api.sfx.trade(); }], [700, () => { if (it.extra) { put({ slid: true }); api.sfx.settle(); } }],
        [500, () => put({ pc: 999, demo: { total: true } })]], end);
    } else if (it.kind === "order") {
      /* the right ladder stands beside the child's; then the child's cards go back to the pile (a miss empties the answer, the owner's
         r31 rule), so the ladder is built again from clean cards with the right order still shown */
      put({ tracing: true, demo: { ghost: true } });
      tl.run([[900, () => { orderRef.current = []; put({ order: [] }); api.sfx.settle(); }], [300, () => {}]], end);
    } else if (it.kind === "tags") {
      put({ tracing: true, demo: { tag: 0 } }); tl.run([[300, () => { put({ demo: { tag: 1 } }); api.sfx.trade(); }], [900, () => {}]], end);
    } else if (it.kind === "largest") {
      put({ tracing: true, demo: { ordered: true } }); tl.run([[800, () => {}]], end);
    } else end();
  }, [wrong]);

  /* what the host and the agent read back (toolApi.getState); never the answer before it is given */
  api.share({
    phase: n, rungs: it.kind === "order" ? S.order.slice() : MODEL.units, tiles: it.tiles || (free ? S.fn : 0), exchanges: n >= 3 || free ? TU_EX : null,
    opened: !!S.opened || (free && S.fd > 0), sideBay: it.extra || 0, slid: !!S.slid, unit: it.tuUnit || null, secondsTicked: stage === "win" || stage === "idle" ? S.sec : null, actDone: !!doneActs,
    complete: stage === "idle",
  });

  /* ── drawing ── */
  const ladder = (tags: (string | null)[], chipCtl = false) => (
    <g>
      {/* Ladder rails with 3D depth */}
      <line x1={16} y1={22} x2={16} y2={498} stroke={TU_INK} strokeWidth={9} strokeLinecap="round" pointerEvents="none" />
      <line x1={16} y1={22} x2={16} y2={498} stroke="#768B9B" strokeWidth={3} strokeLinecap="round" pointerEvents="none" />
      <line x1={136} y1={22} x2={136} y2={498} stroke={TU_INK} strokeWidth={9} strokeLinecap="round" pointerEvents="none" />
      <line x1={136} y1={22} x2={136} y2={498} stroke="#768B9B" strokeWidth={3} strokeLinecap="round" pointerEvents="none" />
      {[0, 1, 2, 3].map((k) => {
        const cy = cyR(k);
        return (
          <g key={"r" + k}>
            <rect x={156} y={cy - 56} width={548} height={112} rx={16} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={2} filter="url(#tu-shadow-sm)" pointerEvents="none" />
            <rect x={4} y={cy - 36} width={144} height={72} rx={14} fill={tint(TU_COL[k], 0.82)} stroke={shade(TU_COL[k], 0.25)} strokeWidth={3} filter="url(#tu-shadow-sm)" pointerEvents="none" />
            <rect x={7} y={cy - 33} width={138} height={33} rx={11} fill="#FFFFFF" fillOpacity={0.3} pointerEvents="none" />
            <text x={76} y={cy + md} textAnchor="middle" dominantBaseline="central" fontSize={lab(T.label)} fontWeight={700} fill={TU_INK} pointerEvents="none">{tx(TU_NAME[k])}</text>
            {chipCtl && k < 3 && <Hit id={"rung-" + MODEL.units[k]} x={4} y={cy - 36} w={144} h={72} label={tx(TU_NAME[k])} onPress={() => freeRung(k)} />}
          </g>
        );
      })}
      {tags.map((t, k) => (t === null ? null : (
        <g key={"t" + k} pointerEvents="none">
          <rect x={22} y={cyR(k) + 39} width={108} height={46} rx={10} fill="#FFFFFF" stroke={TU_INK} strokeWidth={2.5} filter="url(#tu-shadow-sm)" />
          <text x={76} y={cyR(k) + 62} textAnchor="middle" dominantBaseline="central" fontSize={T.label} fontWeight={700} fill={TU_INK}>{t}</text>
        </g>
      )))}
    </g>
  );
  const tilesOn = (k: number, cnt: number) => {
    const rows = cnt > 7 ? 2 : 1, per = Math.ceil(cnt / rows), tw = Math.min(96, (510 - (per - 1) * 10) / per), th = rows === 1 ? 84 : 46;
    const y0 = cyR(k) - (rows * th + (rows - 1) * 8) / 2;
    return <g>{Array.from({ length: cnt }).map((_, i) => tuTile("t" + i, 170 + (i % per) * (tw + 10), y0 + Math.floor(i / per) * (th + 8), tw, th, TU_COL[k]))}</g>;
  };
  const actionKey = (id: string, label: string, k: number) => {
    const b = AK(k);
    return (
      <g key={"ak-wrap-" + id}>
        <Key key={"ak" + k} id={id} label={tx(label)} x={b.x} y={b.y} w={b.w} h={b.h} C={C} tone="key" onClick={() => pressKey(id)}>
          <text y={10} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={toneInk("key", C.ink)}>{tx(label)}</text>
        </Key>
        {demo && stepOn === id && <Invite x={b.x + b.w / 2} y={b.y + b.h / 2} w={b.w} h={b.h} C={C} />}
      </g>
    );
  };
  /* free play's working, right-aligned at 894 and at 40, so even "= 86,400" stays 12 clear of the rung panel (ends 704) */
  const exprAt = (r: number, toks: string[], last: string, pc: number) => {
    const L = toks.length + 1, FX = 894, FS = T.prompt;
    return (
      <g pointerEvents="none">
        {toks.map((t, j) => <text key={"e" + j} x={FX} y={exprY(r, j, L)} textAnchor="end" fontSize={FS} fontWeight={500} fill={TU_PEN}>{t}</text>)}
        {pc >= toks.join("").length && <text x={FX} y={exprY(r, L - 1, L)} textAnchor="end" fontSize={FS} fontWeight={500} fill={TU_PEN}>{last}</text>}
      </g>
    );
  };

  const convExpr = (r: number, pc: number, E: number, total: number) => {
    const toks = exprToks(), L = toks.length + 1;
    let off = 0;
    return (
      <g pointerEvents="none">
        {toks.map((t, j) => { const ch = Math.max(0, Math.min(t.length, pc - off)); off += t.length; return <PencilText key={"e" + j} text={t} x={exprXs[j]} y={exprY(r, j, L)} size={EXS} align={exprAl[j]} chars={ch} />; })}
        {/* printed in the pencil's weight and graphite, so the written and the printed parts read as one line of working */}
        {pc >= toks[0].length && <text x={EXX + 22} y={exprY(r, 0, L)} fontSize={EXS} fontWeight={500} fill={TU_PEN}>{showTotal ? String(E) : "?"}</text>}
        {showTotal && pc >= toks.join("").length && <text x={EXX} y={exprY(r, L - 1, L)} textAnchor="middle" fontSize={EXS} fontWeight={500} fill={TU_PEN}>{"= " + indian(total)}</text>}
      </g>
    );
  };
  /* the traceback's first picture: the child's own number laid out in bars of the TRUE size (300 minutes runs to 5 bars, 5 hours) */
  const childRow = (r: number, c: any, E: number, col: string) => {
    const b = tuBars(c.q, E, 270, cyR(r), col, tx, LF, 704 - 270 - 90);
    return (
      <g pointerEvents="none">
        <rect x={164} y={cyR(r) - 26} width={96} height={52} rx={12} fill="#FFFFFF" stroke={TU_INK} strokeWidth={2.5} filter="url(#tu-shadow-sm)" />
        <text x={212} y={cyR(r)} textAnchor="middle" dominantBaseline="central" fontSize={T.label} fontWeight={700} fill={TU_INK}>{indian(c.v)}</text>
        {b.el}
        {c.r > 0 && <text x={b.end + 12} y={cyR(r)} dominantBaseline="central" fontSize={T.label} fontWeight={700} fill={TU_INK}>{"+ " + c.r}</text>}
      </g>
    );
  };

  const sceneLap = () => {
    const laps = Math.floor(S.sec / 60), D = S.demo;
    const tLaps = it.laps || 1;
    return (
      <g>
        {tuClock(CK.x, CK.y, CK.r, CK.sr, S.sec, { lit: true, minuteRing: D && D.note && (it.parts || it.tuUnit === "mark") ? tLaps : 0 })}
        {D && D.labels > 0 && (
          <g pointerEvents="none">
            {Array.from({ length: D.labels }).map((_, i) => {
              const [x, y] = tuPt(CK.x, CK.y, CK.r + 32, (i + 1) * 30);
              return (
                <g key={"c" + i}>
                  <rect x={x - 30} y={y - 21} width={60} height={42} rx={10} fill="#FFFFFF" stroke={shade(TU_COL[3], 0.3)} strokeWidth={2.5} filter="url(#tu-shadow-sm)" />
                  <text x={x} y={y} textAnchor="middle" dominantBaseline="central" fontSize={T.label} fontWeight={700} fill={shade(TU_COL[3], 0.3)}>{(i + 1) * 5}</text>
                </g>
              );
            })}
          </g>
        )}
        <g opacity={goSpent ? 0.45 : 1}>
          <Key id="go" label={tx("Go")} x={GO.x} y={GO.y} w={GO.w} h={GO.h} C={C} tone="key" onClick={() => pressKey("go")}>
            <text y={18} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={toneInk("key", C.ink)}>{tx("Go")}</text>
          </Key>
        </g>
        {demo && stepOn === "go" && <Invite x={GO.x + GO.w / 2} y={GO.y + GO.h / 2} w={GO.w} h={GO.h} C={C} />}
        {!demo && <text x={774} y={290 + md} textAnchor="middle" fontSize={lab(T.prompt)} fontWeight={700} fill={TU_INK} pointerEvents="none">{tx("Laps") + ": " + laps}</text>}
        {D && D.lines > 0 && (
          <g pointerEvents="none">
            {Array.from({ length: D.lines }).map((_, j) => (
              <text key={"ln" + j} x={774} y={348 + j * 42 + md} textAnchor="middle" fontSize={lab(T.label)} fontWeight={700} fill={shade(TU_COL[3], 0.3)}>{tx("Lap") + " " + (j + 1) + ": " + (j + 1) * 60}</text>
            ))}
          </g>
        )}
        {D && D.note && (it.parts || it.tuUnit === "mark") && (
          <g pointerEvents="none">
            <text x={774} y={476 + md} textAnchor="middle" fontSize={lab(T.micro)} fontWeight={700} fill={shade(TU_COL[2], 0.25)}>{tx("Minute hand") + ":"}</text>
            <text x={774} y={508 + md} textAnchor="middle" fontSize={lab(T.micro)} fontWeight={700} fill={shade(TU_COL[2], 0.25)}>{tLaps + " " + tx(tLaps === 1 ? "mark" : "marks")}</text>
          </g>
        )}
      </g>
    );
  };
  const sceneWarmOpen = () => (
    <g>
      <rect x={WT.x} y={WT.y} width={WT.w} height={WT.h} rx={18} fill={TU_COL[1]} stroke={shade(TU_COL[1], 0.35)} strokeWidth={4} filter="url(#tu-shadow-md)" pointerEvents="none" />
      <rect x={WT.x + 4} y={WT.y + 4} width={WT.w - 8} height={WT.h / 2 - 4} rx={14} fill="#FFFFFF" fillOpacity={0.25} pointerEvents="none" />
      <text x={WT.x + WT.w / 2} y={WT.y + WT.h / 2} textAnchor="middle" dominantBaseline="central" fontSize={T.speech} fontWeight={700} fill="#FFFFFF" stroke={shade(TU_COL[1], 0.4)} strokeWidth={4} paintOrder="stroke" pointerEvents="none">{"1 " + tx("hour")}</text>
      <Hit id="open" x={WT.x} y={WT.y} w={WT.w} h={WT.h} label={tx("hour")} onPress={() => pressKey("open")} />
      {stepOn === "open" && <Invite x={WT.x + WT.w / 2} y={WT.y + WT.h / 2} w={WT.w} h={WT.h} rx={18} C={C} />}
      {S.fly && S.fly.open != null && <g transform={`translate(${Math.round((1 - S.fly.open) * (WT.x - 400))},0)`} opacity={0.3 + 0.7 * S.fly.open}>{tuBar("wf", 400, 188, 60, 24, TU_COL[2])}</g>}
      {S.opened && tuBar("w", 400, 188, 60, 24, TU_COL[2])}
      {S.opened && <text x={520} y={392 + md} textAnchor="middle" fontSize={lab(T.prompt)} fontWeight={700} fill={TU_INK} pointerEvents="none">{"60 " + tx("minutes")}</text>}
    </g>
  );
  const card = (u: string, x: number, y: number, w: number, h: number, id: string, onPress: any) => {
    const k = MODEL.units.indexOf(u);
    return (
      <g key={id}>
        <rect x={x} y={y} width={w} height={h} rx={16} fill={tint(TU_COL[k], 0.76)} stroke={shade(TU_COL[k], 0.25)} strokeWidth={3.5} filter="url(#tu-shadow-sm)" pointerEvents="none" />
        <rect x={x + 4} y={y + 4} width={w - 8} height={h - 8} rx={13} fill="none" stroke="#FFFFFF" strokeOpacity={0.4} strokeWidth={1.5} pointerEvents="none" />
        <rect x={x + 12} y={y + h / 2 - 16} width={32} height={32} rx={8} fill={TU_COL[k]} stroke={shade(TU_COL[k], 0.35)} strokeWidth={2.5} pointerEvents="none" />
        <rect x={x + 14} y={y + h / 2 - 14} width={28} height={14} rx={6} fill="#FFFFFF" fillOpacity={0.25} pointerEvents="none" />
        <text x={x + 48 + (w - 52) / 2} y={y + h / 2 + md} textAnchor="middle" dominantBaseline="central" fontSize={lab(w >= 260 ? T.prompt : T.label)} fontWeight={700} fill={TU_INK} pointerEvents="none">{tx(TU_NAME[k])}</text>
        {onPress && <Hit id={id} x={x} y={y} w={w} h={h} label={tx(TU_NAME[k])} onPress={onPress} />}
      </g>
    );
  };
  const PILE = [{ x: 512, y: 60 }, { x: 708, y: 60 }, { x: 512, y: 300 }, { x: 708, y: 300 }];
  const sceneOrder = () => (
    <g>
      <line x1={162} y1={20} x2={162} y2={500} stroke={TU_INK} strokeWidth={9} strokeLinecap="round" pointerEvents="none" />
      <line x1={478} y1={20} x2={478} y2={500} stroke={TU_INK} strokeWidth={9} strokeLinecap="round" pointerEvents="none" />
      {[0, 1, 2, 3].map((k) => <rect key={"sl" + k} x={150} y={cyR(k) - 50} width={340} height={100} rx={16} fill={tint(C.panel, 0.4)} stroke={C.rule} strokeWidth={3} strokeDasharray="12 10" pointerEvents="none" />)}
      {S.order.map((u: string, j: number) => card(u, 150, cyR(3 - j) - 50, 340, 100, "placed-" + u, asking ? () => unplace(u) : null))}
      {MODEL.pile.map((u, j) => (S.order.includes(u) ? null : card(u, PILE[j].x, PILE[j].y, 186, 160, "card-" + u, asking ? () => pick(u) : null)))}
      {S.demo && S.demo.ghost && (
        <g pointerEvents="none">
          {[0, 1, 2, 3].map((k) => (
            <g key={"g" + k}>
              <rect x={0} y={cyR(k) - 36} width={136} height={72} rx={14} fill={tint(TU_COL[k], 0.78)} stroke={shade(TU_COL[k], 0.2)} strokeWidth={3} filter="url(#tu-shadow-sm)" />
              <text x={68} y={cyR(k) + md} textAnchor="middle" dominantBaseline="central" fontSize={lab(T.label) > 34 ? 34 : T.label} fontWeight={700} fill={TU_INK}>{tx(TU_NAME[k])}</text>
            </g>
          ))}
        </g>
      )}
    </g>
  );
  const sceneTags = () => {
    const t = (S.demo && S.demo.tag) || 0, won = stage === "win" || stage === "idle";
    return (
      <g transform="translate(100,0)">
        {ladder([t >= 1 || won ? "× 24" : "?", "× 60", "× 60", null])}
        {tuTile("d", 170, cyR(0) - 42, 96, 84, TU_COL[0])}
        {tuTile("h", 170, cyR(1) - 42, 96, 84, TU_COL[1])}
        {tuTile("m", 170, cyR(2) - 42, 96, 84, TU_COL[2])}
        {(t >= 1 || won) && tuBar("dh", 300, cyR(1) - tuBarH(24) / 2, 24, tuCell(24), TU_COL[1])}
        {(t >= 1 || won) && <text x={634} y={cyR(1)} dominantBaseline="central" fontSize={T.xl} fontWeight={700} fill={TU_INK} pointerEvents="none">24</text>}
      </g>
    );
  };
  const sceneLargest = () => {
    if (S.demo && S.demo.ordered) {
      return (
        <g pointerEvents="none">
          {[1, 2, 3].map((k, j) => (
            <g key={"o" + k}>
              <rect x={300} y={cyR(j) - 36} width={260} height={72} rx={14} fill={tint(TU_COL[k], 0.78)} stroke={shade(TU_COL[k], 0.2)} strokeWidth={3} filter="url(#tu-shadow-sm)" />
              <text x={430} y={cyR(j) + md} textAnchor="middle" dominantBaseline="central" fontSize={lab(T.label)} fontWeight={700} fill={TU_INK}>{tx(TU_NAME[k])}</text>
              {j < 2 && <rect x={376} y={cyR(j) + 39} width={108} height={46} rx={10} fill="#FFFFFF" stroke={TU_INK} strokeWidth={2.5} filter="url(#tu-shadow-sm)" />}
              {j < 2 && <text x={430} y={cyR(j) + 62} textAnchor="middle" dominantBaseline="central" fontSize={T.label} fontWeight={700} fill={TU_INK}>× 60</text>}
            </g>
          ))}
          <text x={590} y={cyR(0) + md} dominantBaseline="central" fontSize={lab(T.prompt)} fontWeight={700} fill={TU_INK}>{tx("largest")}</text>
        </g>
      );
    }
    return <g>{["minute", "hour", "second"].map((u, j) => card(u, 20 + j * 295, 180, 270, 160, "unit-" + u, null))}</g>;
  };
  const sceneConv = () => {
    const k = it.from, E = TU_EX[k], lowCol = TU_COL[k + 1];
    const bars = S.opened ? tuBars(it.tiles, E, 170, cyR(k + 1), lowCol, tx, LF) : null;
    const end = bars ? bars.end : 170, bc = bars ? bars.c : tuCell(E);
    /* a fixed 10 each side of the "+" (the stack's count ends exactly at `end`: it is drawn right-aligned there) */
    const bx = S.slid ? end + 42 : S.fly && S.fly.slide != null ? Math.round(bayFrom + S.fly.slide * (end + 42 - bayFrom)) : bayFrom, eh = tuBarH(it.extra || 0, bc);
    const keyId = !S.opened ? "step-down" : twoActs && !S.slid ? "slide" : null;
    const total = it.tiles * E + (it.extra || 0);
    return (
      <g>
        {ladder(TU_EX.map((e, j) => (j === k && showTotal ? "× " + e : "?")))}
        {tilesOn(k, it.tiles)}
        {S.fly && S.fly.drop != null && <g transform={`translate(0,${Math.round(S.fly.drop * 124)})`} opacity={1 - 0.5 * S.fly.drop} pointerEvents="none">{tilesOn(k, it.tiles)}</g>}
        {S.demo && S.demo.child && childRow(k + 1, S.demo.child, E, lowCol)}
        {bars && bars.el}
        {it.extra > 0 && !S.slid && <rect x={bayFrom - 12} y={cyR(k + 1) - 54} width={10 * bc + 24} height={108} rx={14} fill="none" stroke={TU_INK} strokeWidth={2.5} strokeDasharray="10 8" pointerEvents="none" />}
        {it.extra > 0 && tuBar("bay", bx, cyR(k + 1) - eh / 2, it.extra, bc, lowCol)}
        {it.extra > 0 && S.slid && <text x={end + 21} y={cyR(k + 1)} textAnchor="middle" dominantBaseline="central" fontSize={T.prompt} fontWeight={700} fill={TU_INK} pointerEvents="none">+</text>}
        {(!asking || !S.tracing) && keyId && stage !== "win" && stage !== "idle" && actionKey(keyId, keyId === "slide" ? "Slide in" : "Step down", k)}
        {S.pc > 0 && convExpr(k + 1, S.pc, E, total)}
      </g>
    );
  };
  const sceneFree = () => {
    const k = S.fk, d = S.fd;
    const rows: any[] = [];
    let cnt = S.fn;
    for (let j = 1; j <= d; j++) {
      const E = TU_EX[k + j - 1];
      rows.push(<g key={"f" + j}>{tuBars(cnt, E, 170, cyR(k + j), TU_COL[k + j], tx, LF).el}</g>);
      if (j < d) cnt = cnt * E;
    }
    const total = S.fn * TU_EX.slice(k, k + d).reduce((a, b) => a * b, 1);
    return (
      <g>
        {ladder(TU_EX.map((e) => "× " + e), true)}
        {tilesOn(k, S.fn)}
        {rows}
        {S.fly && S.fly.drop != null && <g transform={`translate(0,${Math.round(S.fly.drop * 124)})`} opacity={1 - 0.5 * S.fly.drop} pointerEvents="none">{d === 0 ? tilesOn(k, S.fn) : rows[d - 1]}</g>}
        {k + d < 3 && actionKey("step-down", "Step down", k)}
        {d > 0 && exprAt(k + d, [S.fn + " × " + TU_EX[k], ...TU_EX.slice(k + 1, k + d).map((e) => "× " + e)], "= " + indian(total), 999)}
      </g>
    );
  };

  const scene = free ? sceneFree() : it.kind === "lap" ? sceneLap() : it.kind === "warmopen" ? sceneWarmOpen() : it.kind === "order" ? sceneOrder()
    : it.kind === "tags" ? sceneTags() : it.kind === "largest" ? sceneLargest() : it.kind === "conv" ? sceneConv() : null;
  return (
    <g transform={`translate(${X0},0)`}>
      <defs>
        <filter id="tu-shadow-sm" x="-15%" y="-15%" width="130%" height="130%">
          <feDropShadow dx="0" dy="2" stdDeviation="2.5" floodColor="#000000" floodOpacity="0.14" />
        </filter>
        <filter id="tu-shadow-md" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#000000" floodOpacity="0.18" />
        </filter>
      </defs>
      {scene}
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase: the four unit colours and the answer */
function Thumb({ result, it, C, w, h, lang = "en", tx = (v: any) => v }: any) {
  const last = result && result.last;
  if (!last || last.value === null || last.value === undefined) return null;
  const item = it || last.it || {};
  /* a word shows only in the thumbnail's own language: an English word is left out of a hi / gu thumbnail until TR has it */
  const wd = (x: string) => { const t = tx(x); return lang !== "en" && t === x ? "" : t; };
  let cands: string[] = [];
  if (item.parts) { const ps = slotPartsOf(last.value, 2); cands = [ps[0] + " " + wd(item.parts[0].label) + ", " + ps[1] + " " + wd(item.parts[1].label), ps[0] + ", " + ps[1] + " " + wd(item.parts[1].label), ps[0] + " | " + ps[1]]; }
  else if (item.choices) { const c = item.choices.find((c: any) => c.id === String(last.value)); cands = [c ? wd(c.label) : ""]; }
  else if (item.kind === "order") cands = [String(last.value).split(",").map((u: string) => wd(TU_NAME[MODEL.units.indexOf(u)] || u)).join(", ")];
  else { const nv = indian(Number(leadNumber(last.value))); cands = [nv + " " + wd(item.tuUnit || ""), nv]; }
  const room = w - 20 - 12;   /* from x 20 to 12 short of the pill's right edge; measured 10 % wide to be safe */
  const line = (cands.map((c) => c.replace(/\s+/g, " ").trim()).find((c) => tuTextW(c, T.micro) * 1.1 <= room) || cands[cands.length - 1]).trim();
  /* the answer's own unit, as a tile: hour for "an hour", minutes for a number of minutes, seconds for a lap */
  const uName = item.choices ? String(last.value) : item.parts ? "second" : String(item.tuUnit || "").replace(/s$/, "");
  const uk = Math.max(0, MODEL.units.indexOf(uName));
  return (
    <g pointerEvents="none">
      <defs>
        <filter id="tu-thumb-shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="1.5" stdDeviation="1.5" floodColor="#000000" floodOpacity="0.1" />
        </filter>
      </defs>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} filter="url(#tu-thumb-shadow)" />
      <rect x={4} y={6} width={8} height={h - 12} rx={4} fill={TU_COL[uk]} />
      <text x={20} y={h / 2} dominantBaseline="central" fontSize={T.micro} fontWeight={700} fill={C.ink}>{line}</text>
    </g>
  );
}

function TimeUnitLadder(props: any) {
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

export default TimeUnitLadder;