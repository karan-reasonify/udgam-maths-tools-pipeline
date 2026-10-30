/* ═══ M1.S1.T2.C9.2D1 · read_the_clock · tool-specific part ═══════════════════════════════
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

const TOOL_ID = "read_the_clock";
const MEDIA_ID = "M1.S1.T2.C9.2D1";
const TOOL_NAME = "Read the Clock";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
/* kept for the tool object's shape (and the sidecar); nothing speaks from r30 */
const VOICE = {"rate":0.92,"pitch":1.06};

/* printed on the bubble before phase 1's teach lines only (the plan's opening line; not shown when phase 1 has steps) */
const OPENING = ["A wall clock and a digital clock, both waiting for the hands to move."];
/* the whole-tool line: printed on the summary page */
const FINISH_LINE = "You said every time by counting the minutes.";
/* printed when the child opens Free play (the plan's free-play line); its LAST piece stays on the bubble */
const FREE_LINE = "Move the hands to set any time you like.";

/* THE START PAGE (runtime r28; docs/LAYOUT.md §1c, docs/PATTERNS.md §14): the first thing a child sees in user mode.
   START_HOOK is ONE printed question to wonder at (it needs a TR entry, and never gives an answer away); StartArt is
   the object the lesson is about, drawn in a 1200 x 340 box ({ box, C, lang, tx }; plain shapes in the chrome and content
   colours, a <Skin> over them when the image agent made one). This stub is a dashed outline: draw the real object. */
const START_HOOK = "Two hands go round a clock: which one tells the hour?";
function StartArt({ box, C, lang, tx = (v: any) => v }: any) {
  /* the wall clock and its digital clock, at 6:25 (a time no question uses; the long hand is on the 5, the short hand just past the 6,
     so the picture never backs the "long hand tells the hour" mix-up the hook asks about) */
  const cx = 470, cy = 170, R = 150, t = 385;
  return (
    <g>
      {rcDial(cx, cy, R, {})}
      {rcHands(cx, cy, R, t, {})}
      {rcNumerals(cx, cy, R)}
      {rcDigital(660, 70, 360, 200, t, { lang, tx })}
    </g>
  );
}

/* Hindi and Gujarati (docs/PATTERNS.md §11): every line above and below stays English, exactly as the checks
   read it; this table is keyed by that English, byte for byte, and the runtime looks each printed or drawn line
   up in it (Work draws its own words through tx("...")). Fill it AFTER the English is final and reviewed:
   `check` (tr-coverage) lists every printed line still missing. Nothing is baked: the lesson is silent.
   Empty = the tool runs in English only. */
/* Terms (one per idea, for the native speaker to read first): hour hand घंटे की सुई / કલાક કાંટો · minute hand मिनट की सुई / મિનિટ કાંટો ·
   short hand छोटी सुई / નાનો કાંટો · long hand बड़ी सुई / મોટો કાંટો · o'clock बजे / વાગ્યા · minutes past "बजकर ... मिनट" / "વાગીને ... મિનિટ"
   · minutes to "बजने में ... मिनट" / "વાગવામાં ... મિનિટ" · quarter past सवा / સવા · half past साढ़े / સાડા · quarter to पौने / પોણા ·
   Step कदम / પગલું · Round पूरा चक्कर / પૂરો ચક્કર. The child is तुम / તમે. */
const TR: any = {
  hi: {
    "Read the Clock": "घड़ी पढ़ो",
    "A wall clock and a digital clock, both waiting for the hands to move.": "एक दीवार घड़ी और एक डिजिटल घड़ी, दोनों सुइयों के चलने का इंतज़ार कर रही हैं।",
    "You said every time by counting the minutes.": "तुमने हर समय मिनट गिनकर बताया।",
    "Move the hands to set any time you like.": "सुइयाँ घुमाकर अपनी मर्ज़ी का कोई भी समय बनाओ।",
    "Move a hand first.": "पहले कोई सुई घुमाओ।",
    "Tap one of the hands first.": "पहले किसी एक सुई को दबाओ।",
    "For this question, count the fives yourself.": "इस सवाल में पाँच-पाँच खुद गिनो।",
    "Two hands go round a clock: which one tells the hour?": "घड़ी में दो सुइयाँ घूमती हैं: कौन-सी घंटा बताती है?",
    "Two hands: the hour hand and the minute hand": "दो सुइयाँ: घंटे की सुई और मिनट की सुई",
    "Watch the digital clock as each hand turns.": "हर सुई घूमते समय डिजिटल घड़ी देखो।",
    "Drag the short hand round the clock and watch the digital clock.": "छोटी सुई को घड़ी पर घुमाओ और डिजिटल घड़ी देखो।",
    "Hold the short hand and move it.": "छोटी सुई पकड़कर घुमाओ।",
    "Now drag the long hand and watch the digital clock again.": "अब बड़ी सुई घुमाओ और फिर से डिजिटल घड़ी देखो।",
    "Hold the long hand this time.": "इस बार बड़ी सुई पकड़ो।",
    "Each hand changes its own box of the digital clock.": "हर सुई डिजिटल घड़ी का अपना खाना बदलती है।",
    "The hour is the number the hour hand points to or has just passed.": "घंटे की सुई जिस संख्या पर है या जिसे अभी पार किया, वही घंटा है।",
    "The short hand tells the hour and the long hand tells the minutes.": "छोटी सुई घंटा बताती है और बड़ी सुई मिनट बताती है।",
    "You learned: the hour hand is short, the minute hand is long.": "तुमने सीखा: घंटे की सुई छोटी, मिनट की सुई बड़ी होती है।",
    "The library clock has its long hand on the 12: what hour does it show?": "पुस्तकालय की घड़ी में बड़ी सुई 12 पर है: घड़ी कितने बजे दिखाती है?",
    "What hour is it?": "कितने बजे हैं?",
    "The long hand tells the minutes, not the hour.": "बड़ी सुई मिनट बताती है, घंटा नहीं।",
    "Look at the short hand to find the hour.": "घंटा जानने के लिए छोटी सुई देखो।",
    "Read the number that the short hand points to.": "छोटी सुई जिस संख्या की ओर है, वह पढ़ो।",
    "Yes, it is 2 o'clock.": "हाँ, 2 बजे हैं।",
    "The alarm clock shows 5:20: set this clock to show 5:20 too.": "अलार्म घड़ी 5:20 दिखा रही है: इस घड़ी में भी 5:20 बनाओ।",
    "Show 5:20": "5:20 दिखाओ",
    "Turn one hand at a time and watch which digits change.": "एक बार में एक सुई घुमाओ और देखो कौन-से अंक बदलते हैं।",
    "Make the hour digits match the alarm clock and keep the minutes.": "घंटे के अंक अलार्म घड़ी जैसे बनाओ, मिनट वैसे ही रखो।",
    "Keep the long hand on the 4 and move only the short hand.": "बड़ी सुई 4 पर रहने दो और केवल छोटी सुई घुमाओ।",
    "Yes, the 5 is the hour and the 20 is the minutes.": "हाँ, 5 घंटा है और 20 मिनट हैं।",
    "Two friends argue about which hand tells the hour: tap the one that does.": "दो दोस्त बहस कर रहे हैं कि घंटा कौन-सी सुई बताती है: वही सुई दबाओ।",
    "Which hand tells the hour?": "घंटा कौन-सी सुई बताती है?",
    "That hand moved the minute digits when you turned it.": "उस सुई को घुमाने पर मिनट के अंक बदले थे।",
    "Think of the hand that moved the hour digits.": "सोचो, किस सुई से घंटे के अंक बदले थे।",
    "The hour hand moves slowly, only one number in an hour.": "घंटे की सुई धीरे चलती है, एक घंटे में केवल एक संख्या।",
    "Yes, well spotted: now you can settle the friends' argument.": "हाँ, बहुत बढ़िया: अब तुम दोस्तों की बहस सुलझा सकते हो।",
    "Five minutes from one number to the next": "एक संख्या से अगली तक पाँच मिनट",
    "Count the minutes in fives as the minute hand moves.": "मिनट की सुई चलते समय मिनट पाँच-पाँच करके गिनो।",
    "Tap Step to move the minute hand from the 12 to the 1.": "मिनट की सुई को 12 से 1 तक ले जाने के लिए कदम दबाओ।",
    "Tap the Step key beside the clock.": "घड़ी के पास वाला कदम बटन दबाओ।",
    "Tap Step again: from the 1 to the 2 is 5 more minutes.": "फिर से कदम दबाओ: 1 से 2 तक 5 मिनट और।",
    "One tap moves the minute hand one number.": "एक बार दबाने से मिनट की सुई एक संख्या आगे जाती है।",
    "Tap Step once more to move the minute hand on to the 3.": "मिनट की सुई को 3 तक ले जाने के लिए एक बार और कदम दबाओ।",
    "Tap Step to move on one more number.": "एक संख्या और आगे जाने के लिए कदम दबाओ।",
    "Tap Step again and watch the minutes on the digital clock.": "फिर से कदम दबाओ और डिजिटल घड़ी पर मिनट देखो।",
    "Keep going with the Step key.": "कदम बटन से आगे बढ़ते रहो।",
    "Five minutes for every number: count in fives.": "हर संख्या के पाँच मिनट: पाँच-पाँच करके गिनो।",
    "Count on in fives from where the minute hand started.": "मिनट की सुई जहाँ से चली, वहाँ से पाँच-पाँच करके गिनो।",
    "The minute hand takes 5 minutes from one number to the next.": "मिनट की सुई एक संख्या से अगली तक 5 मिनट लेती है।",
    "You learned: each number is 5 minutes, and one round is 60 minutes.": "तुमने सीखा: हर संख्या 5 मिनट, और पूरा चक्कर 60 मिनट।",
    "Step the minute hand from the 5 to the 8: how many minutes have passed?": "मिनट की सुई को 5 से 8 तक कदम से ले जाओ: कितने मिनट बीते?",
    "Minutes passed?": "कितने मिनट बीते?",
    "Each number the minute hand passes is 5 minutes, not 1.": "मिनट की सुई हर संख्या पर 5 मिनट चलती है, 1 नहीं।",
    "Count the blue steps: 5 for each one.": "नीले कदम गिनो: हर कदम 5 मिनट।",
    "Say 5 for the first blue step, 10 for the next, then go on.": "पहले नीले कदम पर 5, अगले पर 10 बोलो, फिर आगे गिनो।",
    "Yes, 3 steps of 5 minutes make 15 minutes.": "हाँ, 5 मिनट के 3 कदम से 15 मिनट बनते हैं।",
    "Step the kitchen clock's minute hand to the 7: how many minutes past?": "रसोई की घड़ी की मिनट की सुई 7 तक ले जाओ: पिछले घंटे के बाद कितने मिनट हुए?",
    "Minutes past?": "कितने मिनट हुए?",
    "The 7 is where the hand stops: count 5 for every number from the 12.": "सुई 7 पर रुकती है: 12 से हर संख्या पर 5 गिनो।",
    "Touch each blue step from the 12 and say the fives out loud.": "12 से हर नीले कदम को छुओ और पाँच-पाँच ज़ोर से बोलो।",
    "Keep counting in fives until you reach the minute hand.": "मिनट की सुई तक पहुँचने तक पाँच-पाँच गिनते रहो।",
    "Yes, 7 steps of 5 make 35 minutes past the hour.": "हाँ, 5 के 7 कदम से घंटे के बाद 35 मिनट हुए।",
    "Tap Round to send the minute hand once round: how many minutes does it take?": "पूरा चक्कर दबाओ: मिनट की सुई एक चक्कर में कितने मिनट लेती है?",
    "Minutes in a round?": "एक चक्कर में कितने मिनट?",
    "The hand passes 12 numbers, and each step is 5 minutes.": "सुई 12 संख्याएँ पार करती है, और हर कदम 5 मिनट है।",
    "Count every blue step in fives, all the way back to the 12.": "हर नीले कदम को पाँच-पाँच करके 12 तक वापस गिनो।",
    "Do not stop at the 11: the last step ends at the 12.": "11 पर मत रुको: आखिरी कदम 12 पर खत्म होता है।",
    "Yes, 12 steps of 5 make 60 minutes, and that is one hour.": "हाँ, 5 के 12 कदम से 60 मिनट बनते हैं, यानी एक घंटा।",
    "Now tap Step and watch the minute hand move.": "अब कदम दबाओ और मिनट की सुई को चलते देखो।",
    "Now tap Round and watch the minute hand go round.": "अब पूरा चक्कर दबाओ और मिनट की सुई को घूमते देखो।",
    "Minutes past and minutes to the hour": "बजकर मिनट और बजने में मिनट",
    "Which side is the minute hand on? Say minutes past or minutes to.": "मिनट की सुई किस तरफ है? बजकर या बजने में बोलो।",
    "Tap Past and to to colour the two halves of the clock.": "घड़ी के दोनों आधे भाग रँगने के लिए बजकर / बजने में दबाओ।",
    "Tap the key that says Past and to.": "बजकर / बजने में वाला बटन दबाओ।",
    "Move the minute hand to the 3: a quarter of the way round is quarter past.": "मिनट की सुई 3 पर ले जाओ: चौथाई चक्कर पर सवा होता है।",
    "Drag or tap the minute hand to the 3.": "मिनट की सुई 3 तक खींचो या दबाओ।",
    "Now move it on to the 6: halfway round is half past.": "अब उसे 6 तक ले जाओ: आधे चक्कर पर साढ़े होता है।",
    "Keep the minute hand going to the 6.": "मिनट की सुई को 6 तक ले चलो।",
    "Move it on to the 9: with a quarter left to go we say quarter to.": "उसे 9 तक ले जाओ: चौथाई बाकी हो तो पौने कहते हैं।",
    "Stop the minute hand on the 9.": "मिनट की सुई 9 पर रोको।",
    "Count in fives from the 12 on that side.": "उस तरफ 12 से पाँच-पाँच करके गिनो।",
    "On the right we count on from the 12; on the left we count back to it.": "दाईं ओर 12 से आगे गिनते हैं; बाईं ओर 12 तक बचे मिनट गिनते हैं।",
    "Yes, 7:45 is quarter to 8, so 15 minutes are left until 8.": "हाँ, 7:45 पौने 8 है: 8 बजने में 15 मिनट बाकी हैं।",
    "You learned: minutes past, minutes to, half past and the quarters.": "तुमने सीखा: बजकर, बजने में, साढ़े, सवा और पौने।",
    "At the bus stop the minute hand is on the 2: what time does the clock show?": "बस स्टॉप पर मिनट की सुई 2 पर है: घड़ी में कितने बजे हैं?",
    "What time is it?": "क्या समय है?",
    "The minute hand on the 2 is not 2 minutes: count in fives from the 12.": "2 पर मिनट की सुई का मतलब 2 मिनट नहीं: 12 से पाँच-पाँच गिनो।",
    "The minute hand is on the blue past side of the clock.": "मिनट की सुई घड़ी की नीली बजकर वाली तरफ है।",
    "Count 5 for the 1, then one more five for the 2.": "1 के लिए 5 गिनो, फिर 2 के लिए एक और पाँच।",
    "Yes, it is 10 minutes past 4, which we write 4:10.": "हाँ, 4 बजकर 10 मिनट हुए हैं, जिसे 4:10 लिखते हैं।",
    "hours": "घंटे",
    "minutes": "मिनट",
    "The bus leaves with the minute hand on the 8: how many minutes to the hour?": "मिनट की सुई 8 पर आते ही बस चलती है: अगला घंटा पूरा होने में कितने मिनट बाकी हैं?",
    "Minutes to the hour?": "अगले घंटे में कितने मिनट बाकी?",
    "Minutes to the hour are the minutes left before it, not the minutes gone past.": "बजने में मिनट यानी घंटे से पहले बचे मिनट, बीते मिनट नहीं।",
    "Count back in fives from the 12 to the minute hand.": "12 से मिनट की सुई तक पाँच-पाँच करके उल्टा गिनो।",
    "Say 5 at the 11, 10 at the 10, and keep going to the 8.": "11 पर 5, 10 पर 10 बोलो, और 8 तक गिनते रहो।",
    "Yes, it is 20 minutes to 10, which we write 9:40.": "हाँ, 10 बजने में 20 मिनट हैं, जिसे 9:40 लिखते हैं।",
    "Dinner is at quarter to 8: set the kitchen clock's hands to show that time.": "रात का खाना पौने 8 बजे है: रसोई की घड़ी में यही समय बनाओ।",
    "Show quarter to 8": "पौने 8 दिखाओ",
    "Look at the hour hand: at quarter to 8, has it reached the 8 yet?": "घंटे की सुई देखो: पौने 8 पर क्या वह 8 तक पहुँची है?",
    "Quarter to 8 means 15 minutes are still left before 8 o'clock.": "पौने 8 का मतलब है 8 बजने में अभी 15 मिनट बाकी हैं।",
    "The hour hand sits just before the 8, not after it.": "घंटे की सुई 8 से ठीक पहले होती है, बाद में नहीं।",
    "Yes, quarter to 8 is 7:45, with the minute hand on the 9.": "हाँ, पौने 8 यानी 7:45, मिनट की सुई 9 पर।",
    "Past": "बजकर",
    "To": "बजने में",
    "Step": "कदम",
    "Round": "पूरा चक्कर",
    "Plain": "सादा",
    "Minutes": "मिनट",
    "Past and to": "बजकर / बजने में",
    "1 hour": "1 घंटा",
  },
  gu: {
    "Read the Clock": "ઘડિયાળ વાંચો",
    "A wall clock and a digital clock, both waiting for the hands to move.": "એક દીવાલ ઘડિયાળ અને એક ડિજિટલ ઘડિયાળ, બંને કાંટા ફરવાની રાહ જુએ છે.",
    "You said every time by counting the minutes.": "તમે દરેક સમય મિનિટ ગણીને કહ્યો.",
    "Move the hands to set any time you like.": "કાંટા ફેરવો અને ગમે તે સમય ગોઠવો.",
    "Move a hand first.": "પહેલાં કોઈ કાંટો ફેરવો.",
    "Tap one of the hands first.": "પહેલાં કોઈ એક કાંટો દબાવો.",
    "For this question, count the fives yourself.": "આ સવાલમાં પાંચ-પાંચ જાતે ગણો.",
    "Two hands go round a clock: which one tells the hour?": "ઘડિયાળમાં બે કાંટા ફરે છે: કયો કલાક બતાવે છે?",
    "Two hands: the hour hand and the minute hand": "બે કાંટા: કલાક કાંટો અને મિનિટ કાંટો",
    "Watch the digital clock as each hand turns.": "દરેક કાંટો ફરે ત્યારે ડિજિટલ ઘડિયાળ જુઓ.",
    "Drag the short hand round the clock and watch the digital clock.": "નાના કાંટાને ઘડિયાળ પર ફેરવો અને ડિજિટલ ઘડિયાળ જુઓ.",
    "Hold the short hand and move it.": "નાનો કાંટો પકડીને ફેરવો.",
    "Now drag the long hand and watch the digital clock again.": "હવે મોટો કાંટો ફેરવો અને ફરી ડિજિટલ ઘડિયાળ જુઓ.",
    "Hold the long hand this time.": "આ વખતે મોટો કાંટો પકડો.",
    "Each hand changes its own box of the digital clock.": "દરેક કાંટો ડિજિટલ ઘડિયાળનું પોતાનું ખાનું બદલે છે.",
    "The hour is the number the hour hand points to or has just passed.": "કલાક કાંટો જે સંખ્યા પર છે કે જે હમણાં વટાવી, તે જ કલાક છે.",
    "The short hand tells the hour and the long hand tells the minutes.": "નાનો કાંટો કલાક બતાવે છે અને મોટો કાંટો મિનિટ બતાવે છે.",
    "You learned: the hour hand is short, the minute hand is long.": "તમે શીખ્યા: કલાક કાંટો નાનો, મિનિટ કાંટો મોટો હોય છે.",
    "The library clock has its long hand on the 12: what hour does it show?": "પુસ્તકાલયની ઘડિયાળમાં મોટો કાંટો 12 પર છે: ઘડિયાળ કેટલા વાગ્યા બતાવે છે?",
    "What hour is it?": "કેટલા વાગ્યા છે?",
    "The long hand tells the minutes, not the hour.": "મોટો કાંટો મિનિટ બતાવે છે, તે કલાક બતાવતો નથી.",
    "Look at the short hand to find the hour.": "કલાક જાણવા નાનો કાંટો જુઓ.",
    "Read the number that the short hand points to.": "નાનો કાંટો જે સંખ્યા તરફ છે, તે વાંચો.",
    "Yes, it is 2 o'clock.": "હા, 2 વાગ્યા છે.",
    "The alarm clock shows 5:20: set this clock to show 5:20 too.": "અલાર્મ ઘડિયાળ 5:20 બતાવે છે: આ ઘડિયાળમાં પણ 5:20 ગોઠવો.",
    "Show 5:20": "5:20 બતાવો",
    "Turn one hand at a time and watch which digits change.": "એક વારમાં એક કાંટો ફેરવો અને જુઓ કયા અંક બદલાય છે.",
    "Make the hour digits match the alarm clock and keep the minutes.": "કલાકના અંક અલાર્મ ઘડિયાળ જેવા કરો, મિનિટ એમ જ રાખો.",
    "Keep the long hand on the 4 and move only the short hand.": "મોટો કાંટો 4 પર રહેવા દો અને ફક્ત નાનો કાંટો ફેરવો.",
    "Yes, the 5 is the hour and the 20 is the minutes.": "હા, 5 કલાક છે અને 20 મિનિટ છે.",
    "Two friends argue about which hand tells the hour: tap the one that does.": "બે મિત્રો દલીલ કરે છે કે કલાક કયો કાંટો બતાવે છે: એ જ કાંટો દબાવો.",
    "Which hand tells the hour?": "કલાક કયો કાંટો બતાવે છે?",
    "That hand moved the minute digits when you turned it.": "તે કાંટો ફેરવતાં મિનિટના અંક બદલાયા હતા.",
    "Think of the hand that moved the hour digits.": "વિચારો, કયા કાંટાથી કલાકના અંક બદલાયા હતા.",
    "The hour hand moves slowly, only one number in an hour.": "કલાક કાંટો ધીમે ચાલે છે, એક કલાકમાં ફક્ત એક સંખ્યા.",
    "Yes, well spotted: now you can settle the friends' argument.": "હા, સરસ: હવે તમે મિત્રોની દલીલ ઉકેલી શકો છો.",
    "Five minutes from one number to the next": "એક સંખ્યાથી બીજી સુધી પાંચ મિનિટ",
    "Count the minutes in fives as the minute hand moves.": "મિનિટ કાંટો ચાલે ત્યારે મિનિટ પાંચ-પાંચ કરીને ગણો.",
    "Tap Step to move the minute hand from the 12 to the 1.": "મિનિટ કાંટાને 12 થી 1 સુધી લઈ જવા પગલું દબાવો.",
    "Tap the Step key beside the clock.": "ઘડિયાળ પાસેનું પગલું બટન દબાવો.",
    "Tap Step again: from the 1 to the 2 is 5 more minutes.": "ફરી પગલું દબાવો: 1 થી 2 સુધી બીજી 5 મિનિટ.",
    "One tap moves the minute hand one number.": "એક વાર દબાવતાં મિનિટ કાંટો એક સંખ્યા આગળ જાય છે.",
    "Tap Step once more to move the minute hand on to the 3.": "મિનિટ કાંટાને 3 સુધી લઈ જવા વધુ એક વાર પગલું દબાવો.",
    "Tap Step to move on one more number.": "બીજી સંખ્યા સુધી જવા પગલું દબાવો.",
    "Tap Step again and watch the minutes on the digital clock.": "ફરી પગલું દબાવો અને ડિજિટલ ઘડિયાળ પર મિનિટ જુઓ.",
    "Keep going with the Step key.": "પગલું બટનથી આગળ વધતા રહો.",
    "Five minutes for every number: count in fives.": "દરેક સંખ્યાની પાંચ મિનિટ: પાંચ-પાંચ કરીને ગણો.",
    "Count on in fives from where the minute hand started.": "મિનિટ કાંટો જ્યાંથી ચાલ્યો ત્યાંથી પાંચ-પાંચ કરીને ગણો.",
    "The minute hand takes 5 minutes from one number to the next.": "મિનિટ કાંટો એક સંખ્યાથી બીજી સુધી 5 મિનિટ લે છે.",
    "You learned: each number is 5 minutes, and one round is 60 minutes.": "તમે શીખ્યા: દરેક સંખ્યા 5 મિનિટ, અને પૂરો ચક્કર 60 મિનિટ.",
    "Step the minute hand from the 5 to the 8: how many minutes have passed?": "મિનિટ કાંટાને 5 થી 8 સુધી પગલાંથી લઈ જાઓ: કેટલી મિનિટ વીતી?",
    "Minutes passed?": "કેટલી મિનિટ વીતી?",
    "Each number the minute hand passes is 5 minutes, not 1.": "મિનિટ કાંટો દરેક સંખ્યાએ 5 મિનિટ ચાલે છે, 1 નહીં.",
    "Count the blue steps: 5 for each one.": "વાદળી પગલાં ગણો: દરેકના 5.",
    "Say 5 for the first blue step, 10 for the next, then go on.": "પહેલા વાદળી પગલે 5, પછીના પર 10 બોલો, પછી આગળ ગણો.",
    "Yes, 3 steps of 5 minutes make 15 minutes.": "હા, 5 મિનિટનાં 3 પગલાં મળીને 15 મિનિટ થાય છે.",
    "Step the kitchen clock's minute hand to the 7: how many minutes past?": "રસોડાની ઘડિયાળનો મિનિટ કાંટો 7 સુધી લઈ જાઓ: કલાક પછી કેટલી મિનિટ?",
    "Minutes past?": "કેટલી મિનિટ થઈ?",
    "The 7 is where the hand stops: count 5 for every number from the 12.": "કાંટો 7 પર અટકે છે: 12 થી દરેક સંખ્યાના 5 ગણો.",
    "Touch each blue step from the 12 and say the fives out loud.": "12 થી દરેક વાદળી પગલાને અડો અને પાંચ-પાંચ મોટેથી બોલો.",
    "Keep counting in fives until you reach the minute hand.": "મિનિટ કાંટા સુધી પહોંચો ત્યાં સુધી પાંચ-પાંચ ગણતા રહો.",
    "Yes, 7 steps of 5 make 35 minutes past the hour.": "હા, 5 નાં 7 પગલાંથી કલાક પછી 35 મિનિટ થઈ.",
    "Tap Round to send the minute hand once round: how many minutes does it take?": "પૂરો ચક્કર દબાવો: મિનિટ કાંટો એક ચક્કરમાં કેટલી મિનિટ લે છે?",
    "Minutes in a round?": "એક ચક્કરમાં કેટલી મિનિટ?",
    "The hand passes 12 numbers, and each step is 5 minutes.": "કાંટો 12 સંખ્યા વટાવે છે, અને દરેક પગલું 5 મિનિટ છે.",
    "Count every blue step in fives, all the way back to the 12.": "દરેક વાદળી પગલું પાંચ-પાંચ કરીને પાછા 12 સુધી ગણો.",
    "Do not stop at the 11: the last step ends at the 12.": "11 પર ન અટકો: છેલ્લું પગલું 12 પર પૂરું થાય છે.",
    "Yes, 12 steps of 5 make 60 minutes, and that is one hour.": "હા, 5 નાં 12 પગલાં 60 મિનિટ થાય, એટલે એક કલાક.",
    "Now tap Step and watch the minute hand move.": "હવે પગલું દબાવો અને મિનિટ કાંટો ચાલતો જુઓ.",
    "Now tap Round and watch the minute hand go round.": "હવે પૂરો ચક્કર દબાવો અને મિનિટ કાંટો ફરતો જુઓ.",
    "Minutes past and minutes to the hour": "વાગીને મિનિટ અને વાગવામાં મિનિટ",
    "Which side is the minute hand on? Say minutes past or minutes to.": "મિનિટ કાંટો કઈ બાજુ છે? વાગીને કે વાગવામાં બોલો.",
    "Tap Past and to to colour the two halves of the clock.": "ઘડિયાળના બંને અડધા ભાગ રંગવા વાગીને / વાગવામાં દબાવો.",
    "Tap the key that says Past and to.": "વાગીને / વાગવામાં બટન દબાવો.",
    "Move the minute hand to the 3: a quarter of the way round is quarter past.": "પા ચક્કરે સવા થાય: મિનિટ કાંટો 3 પર લઈ જાઓ.",
    "Drag or tap the minute hand to the 3.": "મિનિટ કાંટો 3 પર ખેંચો અથવા દબાવો.",
    "Now move it on to the 6: halfway round is half past.": "અડધા ચક્કરે સાડા થાય: હવે કાંટો 6 સુધી લઈ જાઓ.",
    "Keep the minute hand going to the 6.": "મિનિટ કાંટો 6 સુધી લઈ જતા રહો.",
    "Move it on to the 9: with a quarter left to go we say quarter to.": "પા બાકી રહે ત્યારે પોણા કહીએ: કાંટો 9 સુધી લઈ જાઓ.",
    "Stop the minute hand on the 9.": "મિનિટ કાંટો 9 પર રોકો.",
    "Count in fives from the 12 on that side.": "તે બાજુ 12 થી પાંચ-પાંચ કરીને ગણો.",
    "On the right we count on from the 12; on the left we count back to it.": "જમણી બાજુ 12 થી આગળ ગણીએ; ડાબી બાજુ 12 સુધી બાકી મિનિટ ગણીએ.",
    "Yes, 7:45 is quarter to 8, so 15 minutes are left until 8.": "હા, 7:45 એટલે પોણા 8: 8 વાગવામાં 15 મિનિટ બાકી છે.",
    "You learned: minutes past, minutes to, half past and the quarters.": "તમે શીખ્યા: વાગીને, વાગવામાં, સાડા, સવા અને પોણા.",
    "At the bus stop the minute hand is on the 2: what time does the clock show?": "બસ સ્ટોપ પર મિનિટ કાંટો 2 પર છે: ઘડિયાળમાં કેટલા વાગ્યા છે?",
    "What time is it?": "કેટલો સમય થયો છે?",
    "The minute hand on the 2 is not 2 minutes: count in fives from the 12.": "2 પર મિનિટ કાંટો એટલે 2 મિનિટ નહીં: 12 થી પાંચ-પાંચ ગણો.",
    "The minute hand is on the blue past side of the clock.": "મિનિટ કાંટો ઘડિયાળની વાદળી વાગીને વાળી બાજુ છે.",
    "Count 5 for the 1, then one more five for the 2.": "1 માટે 5 ગણો, પછી 2 માટે બીજા પાંચ.",
    "Yes, it is 10 minutes past 4, which we write 4:10.": "હા, 4 વાગીને 10 મિનિટ થઈ છે, જેને 4:10 લખીએ.",
    "hours": "કલાક",
    "minutes": "મિનિટ",
    "The bus leaves with the minute hand on the 8: how many minutes to the hour?": "મિનિટ કાંટો 8 પર આવતાં બસ ઉપડે છે: કલાક વાગવામાં કેટલી મિનિટ?",
    "Minutes to the hour?": "વાગવામાં કેટલી મિનિટ?",
    "Minutes to the hour are the minutes left before it, not the minutes gone past.": "વાગવામાં મિનિટ એટલે કલાક પહેલાં બાકી મિનિટ, વીતેલી મિનિટ નહીં.",
    "Count back in fives from the 12 to the minute hand.": "12 થી મિનિટ કાંટા સુધી પાંચ-પાંચ કરીને ઊંધું ગણો.",
    "Say 5 at the 11, 10 at the 10, and keep going to the 8.": "11 પર 5, 10 પર 10 બોલો, અને 8 સુધી ગણતા રહો.",
    "Yes, it is 20 minutes to 10, which we write 9:40.": "હા, 10 વાગવામાં 20 મિનિટ છે, જેને 9:40 લખીએ.",
    "Dinner is at quarter to 8: set the kitchen clock's hands to show that time.": "રાતનું જમવાનું પોણા 8 વાગ્યે છે: રસોડાની ઘડિયાળમાં એ જ સમય ગોઠવો.",
    "Show quarter to 8": "પોણા 8 બતાવો",
    "Look at the hour hand: at quarter to 8, has it reached the 8 yet?": "કલાક કાંટો જુઓ: પોણા 8 વાગ્યે શું તે 8 સુધી પહોંચ્યો છે?",
    "Quarter to 8 means 15 minutes are still left before 8 o'clock.": "પોણા 8 એટલે 8 વાગવામાં હજી 15 મિનિટ બાકી છે.",
    "The hour hand sits just before the 8, not after it.": "કલાક કાંટો 8 ની બરાબર પહેલાં હોય છે, પછી નહીં.",
    "Yes, quarter to 8 is 7:45, with the minute hand on the 9.": "હા, પોણા 8 એટલે 7:45, મિનિટ કાંટો 9 પર.",
    "Past": "વાગીને",
    "To": "વાગવામાં",
    "Step": "પગલું",
    "Round": "પૂરો ચક્કર",
    "Plain": "સાદું",
    "Minutes": "મિનિટ",
    "Past and to": "વાગીને / વાગવામાં",
    "1 hour": "1 કલાક",
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
/* Item fields of this tool (besides the runtime's): kind (readHour | setHour | pick | count | round | read | readTo | set), t0 (the clock's
   time when the question opens, in minutes after 12 o'clock, 0 to 719), need (count / round: the five-minute steps the long hand walks),
   near (the item's misconception, judge rejects it), win (the one-sentence win line, said at the right answer), scene (the prop skin beside
   the clock: backpack | bus | pot), given / words (the target a set question names: the oracle re-derives it from the answer). */
const PHASES = [
  {
    n: 1,
    concept: "Two hands: the hour hand and the minute hand",
    conceptId: "M1.S1.T2.C6", objectiveIds: ["O1"],
    says: ["Watch the digital clock as each hand turns."],
    /* the warm-up: the clock at 12 o'clock; the child turns each hand and watches its own box of the digital clock light up */
    steps: [
      { say: "Drag the short hand round the clock and watch the digital clock.", on: "hour", hint: "Hold the short hand and move it." },
      { say: "Now drag the long hand and watch the digital clock again.", on: "minute", hint: "Hold the long hand this time." },
    ],
    /* tries, as the plan writes it: First rung: point to the short hand and say its name. Second rung: move only the short hand and watch which box of the digital clock changes. Third rung: the same task with the long hand on the twelve, before it moves. */
    ladder: ["Each hand changes its own box of the digital clock.", "The hour is the number the hour hand points to or has just passed."],
    closing: "The short hand tells the hour and the long hand tells the minutes.",
    /* the summary page's row: "You learned: ..." in at most 72 characters */
    learned: "You learned: the hour hand is short, the minute hand is long.",
    /* the traceback for a miss, in one line (it goes into the sidecar) */
    traceback: "The hand that was mixed up glows and lights its own box of the digital clock in its colour; the child then reads or sets the other hand.",
    items: [
      /* learn RC1: answer in the plan = The short hand is the hour hand. It is 2 o'clock. */
      /* plan question: The wall clock in the school library has its short hand pointing to the 2 and its long hand pointing to the 12. Which hand is the hour hand, and what hour is it? (the 2 is left out of the bubble: it is the answer) */
      { qid: "M1.S1.T2.C6:RC1", kind: "readHour", t0: 120, scene: "backpack", answer: 2, near: 12,
        say: "The library clock has its long hand on the 12: what hour does it show?", ask: "What hour is it?",
        miss: "The long hand tells the minutes, not the hour.",
        ladder: ["Look at the short hand to find the hour.", "Read the number that the short hand points to."],
        win: "Yes, it is 2 o'clock.", winMs: 3000 },
      /* practice 1: answer in the plan = The 5 is the hour and the 20 is the minutes (set here: only the short hand moves the hour) */
      /* plan question: The digital alarm clock in the bedroom shows 5:20. Which number is the hour, and which is the minutes? */
      { qid: "M1.S1.T2.C6:1", kind: "setHour", t0: 20, scene: "backpack", pad: "enter", answer: [5, 20], near: "12|25", given: "5:20",
        say: "The alarm clock shows 5:20: set this clock to show 5:20 too.", ask: "Show 5:20",
        miss: "Turn one hand at a time and watch which digits change.",
        ladder: ["Make the hour digits match the alarm clock and keep the minutes.", "Keep the long hand on the 4 and move only the short hand."],
        win: "Yes, the 5 is the hour and the 20 is the minutes.", winMs: 5800 },
      /* practice 5: answer in the plan = No. The long hand is the minute hand. The short hand is the hour hand and it tells the hour */
      /* plan question: At the bus stop a child says the long hand of the clock is the hour hand because it is longer. Is the child right? Which hand tells the hour? (answered by tapping the hand) */
      { qid: "M1.S1.T2.C6:5", kind: "pick", t0: 220, scene: "backpack", pad: "enter", answer: "short", near: "long",
        say: "Two friends argue about which hand tells the hour: tap the one that does.", ask: "Which hand tells the hour?",
        miss: "That hand moved the minute digits when you turned it.",
        ladder: ["Think of the hand that moved the hour digits.", "The hour hand moves slowly, only one number in an hour."],
        win: "Yes, well spotted: now you can settle the friends' argument.", winMs: 5000 },
    ],
  },
  {
    n: 2,
    concept: "Five minutes from one number to the next",
    conceptId: "M1.S1.T2.C7", objectiveIds: ["O1"],
    says: ["Count the minutes in fives as the minute hand moves."],
    /* the warm-up: the clock at 8 o'clock; each Step walks the minute hand one number on and shades that step blue with its 5.
       Four steps end on 8:20 (none of the phase's answers 15, 35, 60) */
    steps: [
      { say: "Tap Step to move the minute hand from the 12 to the 1.", on: "step", hint: "Tap the Step key beside the clock." },
      { say: "Tap Step again: from the 1 to the 2 is 5 more minutes.", on: "step", hint: "One tap moves the minute hand one number." },
      { say: "Tap Step once more to move the minute hand on to the 3.", on: "step", hint: "Tap Step to move on one more number." },
      { say: "Tap Step again and watch the minutes on the digital clock.", on: "step", hint: "Keep going with the Step key." },
    ],
    /* tries, as the plan writes it: First rung: count the numbers the hand passes. Second rung: count in fives as the hand is walked step by step. Third rung: the same task with one step only, before more steps are added. */
    ladder: ["Five minutes for every number: count in fives.", "Count on in fives from where the minute hand started."],
    closing: "The minute hand takes 5 minutes from one number to the next.",
    learned: "You learned: each number is 5 minutes, and one round is 60 minutes.",
    traceback: "The minute hand glows; the blue steps are counted in fives from where it started, a running count written by each number, stopping one five before the end.",
    items: [
      /* learn RC2: answer in the plan = 15 minutes */
      /* plan question: The clock above the school bell has its minute hand on the 5. A little later the minute hand is on the 8. How many minutes have passed? */
      { qid: "M1.S1.T2.C7:RC2", kind: "count", t0: 625, need: 3, answer: 15, near: 3,
        say: "Step the minute hand from the 5 to the 8: how many minutes have passed?", ask: "Minutes passed?",
        miss: "Each number the minute hand passes is 5 minutes, not 1.",
        ladder: ["Count the blue steps: 5 for each one.", "Say 5 for the first blue step, 10 for the next, then go on."],
        win: "Yes, 3 steps of 5 minutes make 15 minutes.", winMs: 4600 },
      /* practice 2: answer in the plan = 35 minutes, counting 5, 10, 15, 20, 25, 30, 35 */
      /* plan question: A kitchen clock has its minute hand on the 7. Count in fives from the 12. How many minutes past the hour is that? */
      { qid: "M1.S1.T2.C7:2", kind: "count", t0: 60, need: 7, answer: 35, near: 7,
        say: "Step the kitchen clock's minute hand to the 7: how many minutes past?", ask: "Minutes past?",
        miss: "The 7 is where the hand stops: count 5 for every number from the 12.",
        ladder: ["Touch each blue step from the 12 and say the fives out loud.", "Keep counting in fives until you reach the minute hand."],
        win: "Yes, 7 steps of 5 make 35 minutes past the hour.", winMs: 5400 },
      /* authored (the plan's practice 8, rounds from midnight to noon, is not used: the third question checks the round of 60 minutes) */
      { qid: null, kind: "round", t0: 240, need: 12, answer: 60, near: 12,
        say: "Tap Round to send the minute hand once round: how many minutes does it take?", ask: "Minutes in a round?",
        miss: "The hand passes 12 numbers, and each step is 5 minutes.",
        ladder: ["Count every blue step in fives, all the way back to the 12.", "Do not stop at the 11: the last step ends at the 12."],
        win: "Yes, 12 steps of 5 make 60 minutes, and that is one hour.", winMs: 6200 },
    ],
  },
  {
    n: 3,
    concept: "Minutes past and minutes to the hour",
    conceptId: "M1.S1.T2.C8", objectiveIds: ["O2"],
    says: ["Which side is the minute hand on? Say minutes past or minutes to."],
    /* the warm-up (the plan's phases 3 and 4 folded, the owner 2026-10-28): the clock at 9 o'clock; the two halves coloured, then the minute
       hand sent to the 3, the 6 and the 9 while the words card says quarter past, half past and quarter to */
    steps: [
      { say: "Tap Past and to to colour the two halves of the clock.", on: "pastto", hint: "Tap the key that says Past and to." },
      { say: "Move the minute hand to the 3: a quarter of the way round is quarter past.", on: "minute", hint: "Drag or tap the minute hand to the 3." },
      { say: "Now move it on to the 6: halfway round is half past.", on: "minute", hint: "Keep the minute hand going to the 6." },
      { say: "Move it on to the 9: with a quarter left to go we say quarter to.", on: "minute", hint: "Stop the minute hand on the 9." },
    ],
    stepHold: 2200,
    /* tries, as the plan writes it: First rung: say which side of the clock the long hand is on. Second rung: count in fives from the 12 on that side. Third rung: the same task with the long hand on the right side only, before the left side returns. */
    ladder: ["Count in fives from the 12 on that side.", "On the right we count on from the 12; on the left we count back to it."],
    closing: "Yes, 7:45 is quarter to 8, so 15 minutes are left until 8.",
    learned: "You learned: minutes past, minutes to, half past and the quarters.",
    traceback: "The hand that was read wrong glows; the side the minute hand is on is coloured, past or to, and the minutes are counted in fives from the 12 on that side, stopping one five before the minute hand.",
    items: [
      /* learn RC3: answer in the plan = 10 minutes past 4, which is 4:10 (the plan's football ground is the bus stop here: the slot's picture) */
      /* plan question: At football practice the clock on the pavilion wall has its long hand on the 2 and its short hand just past the 4. How many minutes past the hour is it, and what time is that? */
      { qid: "M1.S1.T2.C8:RC3", kind: "read", t0: 250, scene: "bus", parts: [{ label: "hours" }, { label: "minutes" }], answer: [4, 10], near: "4|2",
        say: "At the bus stop the minute hand is on the 2: what time does the clock show?", ask: "What time is it?",
        miss: "The minute hand on the 2 is not 2 minutes: count in fives from the 12.",
        ladder: ["The minute hand is on the blue past side of the clock.", "Count 5 for the 1, then one more five for the 2."],
        win: "Yes, it is 10 minutes past 4, which we write 4:10.", winMs: 5400 },
      /* practice 3: answer in the plan = The left side. It is 20 minutes to the next hour, because the 8 is 40 minutes past */
      /* plan question: The clock at the railway station has its long hand on the 8. Is the long hand on the left or the right side, and how many minutes is it to the next hour? */
      { qid: "M1.S1.T2.C8:3", kind: "readTo", t0: 580, scene: "bus", answer: 20, near: 40,
        say: "The bus leaves with the minute hand on the 8: how many minutes to the hour?", ask: "Minutes to the hour?",
        miss: "Minutes to the hour are the minutes left before it, not the minutes gone past.",
        ladder: ["Count back in fives from the 12 to the minute hand.", "Say 5 at the 11, 10 at the 10, and keep going to the 8."],
        win: "Yes, it is 20 minutes to 10, which we write 9:40.", winMs: 5400 },
      /* authored (the plan's phase-4 practice 7 idea, quarter to, with a new time: its own id belongs to the dropped phase) */
      { qid: null, kind: "set", t0: 180, scene: "pot", pad: "enter", answer: [7, 45], near: "8|45", words: "quarter to 8",
        say: "Dinner is at quarter to 8: set the kitchen clock's hands to show that time.", ask: "Show quarter to 8",
        miss: "Look at the hour hand: at quarter to 8, has it reached the 8 yet?",
        ladder: ["Quarter to 8 means 15 minutes are still left before 8 o'clock.", "The hour hand sits just before the 8, not after it."],
        win: "Yes, quarter to 8 is 7:45, with the minute hand on the 9.", winMs: 6200 },
    ],
  },
];

/* The numbers, rows, sizes and targets the working area needs (they go into the sidecar too). */
const MODEL = {
  clock: { cx: 252, cy: 252, R: 200, hourGrip: 72, minuteGrip: 177, numerals: "1 to 12 at 0.72 R", minuteTicks: 60 },
  digital: { x: 548, y: 18, w: 340, h: 168 }, words: { x: 548, y: 200, w: 340, h: 100 },
  colours: { hourHand: "#E5531A", minuteHand: "#1F4E9C", past: "#5BB8E8", to: "#F2A531", reached: "#2E9E5B" },
  snap: "the long hand snaps to 5 minutes; the short hand creeps (its angle is (hour + minutes / 60) x 30 degrees)",
  views: ["plain", "minutes", "pastto"],
};

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* a time on the clock: minutes after 12 o'clock, 0 to 719 */
const rcN = (t: number) => ((Math.round(t) % 720) + 720) % 720;
const rcH = (t: number) => { const h = Math.floor(rcN(t) / 60); return h === 0 ? 12 : h; };
const rcM = (t: number) => rcN(t) % 60;
const rcT = (h: number, m: number) => rcN((h % 12) * 60 + m);
const rc2 = (m: number) => (m < 10 ? "0" + m : String(m));
/* an hours-and-minutes answer, from [5, 20], "5|20" or "5:20" */
const rcHM = (v: any) => {
  if (Array.isArray(v)) return [Number(v[0]), Number(v[1])];
  const p = String(v == null ? "" : v).split(/[|:]/);
  return [parseInt(p[0], 10), parseInt(p[1], 10)];
};
/* the time in words, as the book says it (the words card; digits stay digits). Built at run time, so Hindi and Gujarati have their own
   templates here (TR cannot list them): बजे / वाग्या (o'clock), सवा / સવા (quarter past), साढ़े / સાડા (half past; डेढ़ / દોઢ at 1:30,
   ढाई / અઢી at 2:30), पौने / પોણા (quarter to), "4 बजकर 10 मिनट" / "4 વાગીને 10 મિનિટ" (minutes past), "10 बजने में 20 मिनट" /
   "10 વાગવામાં 20 મિનિટ" (minutes to) */
const rcWords = (t: number, lang: string = "en") => {
  const h = rcH(t), m = rcM(t), nh = h === 12 ? 1 : h + 1;
  if (lang === "hi") {
    if (m === 0) return `${h} बजे`;
    if (m === 15) return `सवा ${h} बजे`;
    if (m === 30) return h === 1 ? "डेढ़ बजे" : h === 2 ? "ढाई बजे" : `साढ़े ${h} बजे`;
    if (m === 45) return `पौने ${nh} बजे`;
    if (m < 30) return `${h} बजकर|${m} मिनट`;
    return `${nh} बजने में|${60 - m} मिनट`;
  }
  if (lang === "gu") {
    /* one o'clock takes the singular verb (1 વાગ્યો); the rest the plural (વાગ્યા) */
    const v = (k: number) => (k === 1 ? "વાગ્યો" : "વાગ્યા");
    if (m === 0) return `${h} ${v(h)}`;
    if (m === 15) return `સવા ${h} ${v(h)}`;
    if (m === 30) return h === 1 ? "દોઢ વાગ્યો" : h === 2 ? "અઢી વાગ્યા" : `સાડા ${h} વાગ્યા`;
    if (m === 45) return `પોણા ${nh} ${v(nh)}`;
    if (m < 30) return `${h} વાગીને|${m} મિનિટ`;
    return `${nh} વાગવામાં|${60 - m} મિનિટ`;
  }
  if (m === 0) return `${h} o'clock`;
  if (m === 15) return `quarter past ${h}`;
  if (m === 30) return `half past ${h}`;
  if (m === 45) return `quarter to ${nh}`;
  if (m < 30) return `${m} ${m === 1 ? "minute" : "minutes"} past ${h}`;
  return `${60 - m} ${60 - m === 1 ? "minute" : "minutes"} to ${nh}`;
};

/* judge: is this value right for this item? (numbers compare as numbers) */
const judge = (item: any, v: any) => {
  if (item.kind === "pick") return String(v == null ? "" : v).trim().toLowerCase() === item.answer;
  if (item.pad === "enter") { const [h, m] = rcHM(v); return h === item.answer[0] && m === item.answer[1]; }
  if (item.parts) return judgeSlotParts(item, v);
  return leadNumber(v) === item.answer;
};
/* oracle: every answer re-derived by a second route that shares no code with judge or Work: the angles of the two hands */
const oracle = () => PHASES.every((p: any) => p.items.every((it: any) => {
  const hourDeg = (t: number) => (((t % 720) + 720) % 720) / 2;             /* 0.5 degree a minute: the short hand creeps */
  const minDeg = (t: number) => ((t % 60) + 60) % 60 * 6;                    /* 6 degrees a minute */
  const hourOf = (t: number) => Math.floor(hourDeg(t) / 30) || 12;           /* the number the short hand has passed */
  const minOf = (t: number) => Math.round(minDeg(t) / 6);
  const gaps = (a: number, b: number) => Math.round((((b - a) % 360) + 360) % 360 / 30);   /* number-to-number gaps the long hand turns */
  switch (it.kind) {
    case "readHour": return minOf(it.t0) === 0 && it.answer === hourOf(it.t0);
    case "count": { const a = minDeg(it.t0), b = minDeg(it.t0 + it.need * 5); return gaps(a, b) === it.need && it.answer === 5 * gaps(a, b); }
    case "round": return it.need === 12 && it.answer === 12 * 5;
    case "read": return it.answer[0] === hourOf(it.t0) && it.answer[1] === minOf(it.t0);
    case "readTo": return minDeg(it.t0) > 180 && it.answer === (360 - minDeg(it.t0)) / 6;
    case "setHour": { const [h, m] = String(it.given).split(":").map(Number); return it.answer[0] === h && it.answer[1] === m; }
    case "set": { const [h, m] = it.answer, nh = h === 12 ? 1 : h + 1;
      const said = m === 45 ? `quarter to ${nh}` : m === 30 ? `half past ${h}` : m === 15 ? `quarter past ${h}` : m === 0 ? `${h} o'clock` : "";
      return said === it.words; }
    case "pick": { const lenHour = 118, lenMinute = 186; return it.answer === (lenHour < lenMinute ? "short" : "long"); }
    default: return false;
  }
}));
/* the most likely wrong answer (the misconception); judge must reject it */
const nearMiss = (item: any) => item.near;
/* the forms of an answer that no question, hint or ladder line may print. A set question NAMES its time (it is the question,
   like a build target); a pick names its hand only in the sentence that says which hand tells the hour. */
const answerForms = (item: any) => (item.pad === "enter" && item.kind !== "pick" ? []
  : item.kind === "pick" ? ["short hand tells", "short hand is the hour"]
  : item.parts ? item.answer.filter((x: number) => x >= 10).flatMap((x: number) => [String(x), indian(x), words(x)])
  : [String(item.answer), indian(item.answer), words(item.answer)]);
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => item.answer;

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => (T.state().stage === "demo" ? HOOK.demo && HOOK.demo() : T.submit(item.answer));
/* the agent's answer() for an item made on the working area: set it as a child would; undefined = type it */
const answer = (item: any, v: any) => (item.pad === "enter" && HOOK.set ? HOOK.set(v) : undefined);
/* the agent's check() before Enter: e.g. drop a token that waits; undefined = press Enter. In a guide-steps phase
   (stage "demo") it must return undefined, so the agent's check() reaches api.onEnter and performs the current step:
   set HOOK.check only while a question is open */
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
/* ── the clock family (the owner, 2026-10-28: Read the Clock is the reference for Morning or Night and Time Converter) ── */
/* the vermilion leans a little to orange (hue 17): a pure vermilion (#E34234, hue 5) reads as a red mark after a miss (wrong-is-unmarked) */
const RC = { hour: "#E5531A", minute: "#1F4E9C", past: "#5BB8E8", to: "#F2A531", ok: "#2E9E5B", face: "#FFFDF4", rim: "#2B2B2B", num: "#1E1E1E" };
const RC_GEO = { cx: 252, cy: 252, R: 200 };
const RC_HOUR_GRIP = 0.36, RC_MIN_GRIP = 0.885;   /* the grips' radii (x R): 105 apart, so their 76-unit finger boxes never overlap */
const rcPol = (cx: number, cy: number, r: number, deg: number) => ({ x: cx + r * Math.sin((deg * Math.PI) / 180), y: cy - r * Math.cos((deg * Math.PI) / 180) });
const rcAng = (cx: number, cy: number, x: number, y: number) => ((Math.atan2(x - cx, -(y - cy)) * 180) / Math.PI + 360) % 360;
/* a band of the face between two radii and two angles (clockwise from the 12) */
const rcBand = (cx: number, cy: number, r1: number, r2: number, a1: number, a2: number) => {
  const p1 = rcPol(cx, cy, r2, a1), p2 = rcPol(cx, cy, r2, a2), p3 = rcPol(cx, cy, r1, a2), p4 = rcPol(cx, cy, r1, a1), lg = a2 - a1 > 180 ? 1 : 0;
  return `M ${p1.x} ${p1.y} A ${r2} ${r2} 0 ${lg} 1 ${p2.x} ${p2.y} L ${p3.x} ${p3.y} A ${r1} ${r1} 0 ${lg} 0 ${p4.x} ${p4.y} Z`;
};
/* the right half (past) or the left half (to) of the face */
const rcHalf = (cx: number, cy: number, r: number, side: string) => (side === "past"
  ? `M ${cx} ${cy - r} A ${r} ${r} 0 0 1 ${cx} ${cy + r} Z` : `M ${cx} ${cy + r} A ${r} ${r} 0 0 1 ${cx} ${cy - r} Z`);
/* "Past" in one row under the right half, "To" under the left half, clear of the rim in every language: no hand ever covers them */
const rcSideLabel = (cx: number, cy: number, R: number, side: string, tx: any) => {
  const p = { x: cx + (side === "past" ? 0.45 : -0.45) * R, y: cy + R + 37 };
  return <text x={p.x} y={p.y + 11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={shade(side === "past" ? RC.past : RC.to, 0.6)} style={{ fontFamily: "inherit" }}>{tx(side === "past" ? "Past" : "To")}</text>;
};
/* which side the long hand is on: past (right), to (left), or neither (on the 12 or the 6) */
const rcSide = (t: number) => { const m = rcM(t); return m > 0 && m < 30 ? "past" : m > 30 ? "to" : ""; };

/* the dial: rim, face, the two coloured halves (o.tint), the lit marks (o.marks), 60 minute marks, the twelve numbers and the
   minutes round the edge (o.ring). Numbers that are always printed sit in data-scale groups. Drawing helpers are CALLED. */
function rcDial(cx: number, cy: number, R: number, o: any = {}) {
  const tx = o.tx || ((v: any) => v), fs = Math.round(R * 0.22);
  return (
    <g pointerEvents="none">
      {/* Wall clock soft depth shadow */}
      <circle cx={cx} cy={cy + 8} r={R + 6} fill="#000000" fillOpacity={0.08} />
      <circle cx={cx} cy={cy + 4} r={R + 4} fill="#000000" fillOpacity={0.06} />

      {/* Main clock frame & face */}
      <circle cx={cx} cy={cy} r={R} fill={RC.face} stroke={RC.rim} strokeWidth={R * 0.055} />
      <circle cx={cx} cy={cy} r={R * 0.96} fill="none" stroke="#E0D2B8" strokeWidth={2.5} />
      <circle cx={cx} cy={cy} r={R * 0.945} fill="none" stroke="#FFFFFF" strokeWidth={1.5} strokeOpacity={0.8} />

      {o.tint && (
        <g>
          <path d={rcHalf(cx, cy, R * 0.94, "past")} fill={RC.past} fillOpacity={o.side === "past" ? 0.42 : 0.2} />
          <path d={rcHalf(cx, cy, R * 0.94, "to")} fill={RC.to} fillOpacity={o.side === "to" ? 0.5 : 0.3} />
          <line x1={cx} y1={cy - R * 0.94} x2={cx} y2={cy + R * 0.94} stroke={RC.rim} strokeOpacity={0.35} strokeWidth={2.5} strokeDasharray="8 8" />
          {rcSideLabel(cx, cy, R, "past", tx)}
          {rcSideLabel(cx, cy, R, "to", tx)}
        </g>
      )}
      {(o.marks || []).map((k: number) => {
        const p = rcPol(cx, cy, R * 0.74, k * 30);
        return (
          <g key={"mk" + k}>
            <circle cx={p.x} cy={p.y} r={fs * 0.82} fill={tint(RC.ok, 0.75)} stroke={RC.ok} strokeWidth={3} />
            <circle cx={p.x} cy={p.y} r={fs * 0.82 - 3} fill="none" stroke="#FFFFFF" strokeWidth={1.5} strokeOpacity={0.6} />
          </g>
        );
      })}
      {Array.from({ length: 60 }, (_, i) => {
        const five = i % 5 === 0, a = rcPol(cx, cy, R * (five ? 0.83 : 0.89), i * 6), b = rcPol(cx, cy, R * 0.94, i * 6);
        return <line key={"tk" + i} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={five ? RC.rim : "#5A5A5A"} strokeWidth={five ? 4 : 2} strokeLinecap="round" />;
      })}
      {/* the twelve numbers are drawn ABOVE the hands (rcNumerals, called after rcHands), so no hand or grip ever hides one */}
      {o.ring && (
        <g data-scale="minutes">
          {Array.from({ length: 12 }, (_, i) => { const k = i + 1, p = rcPol(cx, cy, R + 31, k * 30);
            return <text key={"mn" + k} x={p.x} y={p.y + 11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={RC.minute} style={{ fontFamily: "inherit" }}>{5 * k}</text>; })}
        </g>
      )}
    </g>
  );
}

/* the twelve numbers, over the hands, each on a halo of the face colour so a hand passing under it never hides it */
function rcNumerals(cx: number, cy: number, R: number) {
  const fs = Math.round(R * 0.22);
  return (
    <g data-scale="dial" pointerEvents="none">
      {Array.from({ length: 12 }, (_, i) => { const k = i + 1, p = rcPol(cx, cy, R * 0.72, k * 30);
        return <text key={"nm" + k} x={p.x} y={p.y + fs * 0.36} textAnchor="middle" fontSize={fs} fontWeight={700} fill={RC.num}
          stroke={RC.face} strokeWidth={Math.max(4, fs * 0.16)} strokeLinejoin="round" paintOrder="stroke" style={{ fontFamily: "inherit" }}>{k}</text>; })}
    </g>
  );
}

/* the two hands: the hour hand vermilion and short, the minute hand deep blue and long, no arrowheads; the hour hand creeps
   (its angle is the whole time, half a degree a minute). o.glow lights one hand ("h" | "m"); o.picked rings the chosen grip. */
function rcHands(cx: number, cy: number, R: number, t: number, o: any = {}) {
  const hd = rcN(t) / 2, md = rcM(t) * 6;
  /* tw: the half-width near the tip as a share of the base (the hour hand stays broad, so a vermilion band reads on both sides of
     the minute hand even when the two lie on one another, as at 12:00) */
  const hand = (deg: number, len: number, w0: number, col: string, glow: boolean, role: string, tw: number = 0.32) => {
    /* straight sides narrowing a little, and a ROUND end: no arrowhead (the brief), so neither hand reads as a pencil or a spear */
    const rt = w0 * tw, d = `M ${cx - w0 / 2} ${cy + R * 0.1} L ${cx - rt} ${cy - len + rt} A ${rt} ${rt} 0 0 1 ${cx + rt} ${cy - len + rt} L ${cx + w0 / 2} ${cy + R * 0.1} Z`;
    return (
    <g transform={`rotate(${deg} ${cx} ${cy})`} data-role={role}>
      {glow && <line x1={cx} y1={cy} x2={cx} y2={cy - len} stroke={col} strokeOpacity={0.35} strokeWidth={w0 + 28} strokeLinecap="round" />}
      {/* Hand drop shadow */}
      <g transform="translate(2, 4)" opacity={0.2}>
        <path d={d} fill="#000000" />
      </g>
      <path d={d} fill={col} stroke={shade(col, 0.35)} strokeWidth={2.5} strokeLinejoin="round" />
      <line x1={cx} y1={cy - R * 0.05} x2={cx} y2={cy - len + w0 * 1.2} stroke="#FFFFFF" strokeOpacity={0.35} strokeWidth={2} strokeLinecap="round" />
    </g>
    );
  };
  const gh = rcPol(cx, cy, R * RC_HOUR_GRIP, hd), gm = rcPol(cx, cy, R * RC_MIN_GRIP, md), gr = Math.max(9, R * 0.065);
  return (
    <g pointerEvents="none">
      {hand(hd, R * 0.57, R * 0.125, RC.hour, o.glow === "h", "hour-hand", 0.42)}
      {hand(md, R * 0.92, R * 0.046, RC.minute, o.glow === "m", "minute-hand")}
      <circle cx={gh.x} cy={gh.y + 2} r={gr} fill="#000000" fillOpacity={0.15} />
      <circle cx={gh.x} cy={gh.y} r={gr} fill="#FFFFFF" stroke={RC.hour} strokeWidth={5} />
      <circle cx={gh.x} cy={gh.y} r={gr * 0.4} fill={RC.hour} />

      <circle cx={gm.x} cy={gm.y + 2} r={gr} fill="#000000" fillOpacity={0.15} />
      <circle cx={gm.x} cy={gm.y} r={gr} fill="#FFFFFF" stroke={RC.minute} strokeWidth={5} />
      <circle cx={gm.x} cy={gm.y} r={gr * 0.4} fill={RC.minute} />

      {o.picked && <circle cx={o.picked === "short" ? gh.x : gm.x} cy={o.picked === "short" ? gh.y : gm.y} r={gr * 2.2} fill="none" stroke={RC.rim} strokeWidth={5} strokeDasharray="6 4" />}
      <circle cx={cx} cy={cy + 2} r={R * 0.062} fill="#000000" fillOpacity={0.18} />
      <circle cx={cx} cy={cy} r={R * 0.062} fill={RC.rim} />
      <circle cx={cx} cy={cy} r={R * 0.035} fill="#DED2BA" />
      <circle cx={cx} cy={cy} r={R * 0.018} fill={RC.rim} />
    </g>
  );
}

/* the digital clock: hours vermilion, a near-black colon, minutes deep blue; o.lit lights a box in its hand's colour; o.cover hides the
   digits behind a "?" while a question asks for them, and o.reveal draws them (data-reveals) once the right answer is in */
function rcDigital(x: number, y: number, w: number, h: number, t: number, o: any = {}) {
  const tx = o.tx || ((v: any) => v);
  /* the hours / minutes captions are last-bench labels (34; "minutes" at 36 touched the card's edge), so the boxes take a little less height */
  const pad = w * 0.065, colW = w * 0.1, bw = (w - 2 * pad - colW) / 2, bh = h * 0.5, by = y + h * 0.1;
  const hx = x + pad, mx = hx + bw + colW, fs = Math.round(Math.min(bh * 0.82, bw * 0.6)), ls = Math.max(T.label, Math.round(h * 0.17));
  const hourInk = shade(RC.hour, 0.28);
  const digits = (
    <g>
      <text x={hx + bw / 2} y={by + bh / 2 + fs * 0.36} textAnchor="middle" fontSize={fs} fontWeight={700} fill={hourInk} style={{ fontFamily: "inherit" }}>{rcH(t)}</text>
      <text x={mx + bw / 2} y={by + bh / 2 + fs * 0.36} textAnchor="middle" fontSize={fs} fontWeight={700} fill={RC.minute} style={{ fontFamily: "inherit" }}>{rc2(rcM(t))}</text>
    </g>
  );
  const box = (bx: number, on: boolean, col: string) => (
    <g>
      <rect x={bx} y={by + 2} width={bw} height={bh} rx={12} fill="#000000" fillOpacity={0.06} />
      <rect x={bx} y={by} width={bw} height={bh} rx={12} fill={on ? tint(col, 0.8) : "#FFFFFF"} stroke={on ? col : "#C9CFC4"} strokeWidth={on ? 5 : 2} />
    </g>
  );
  return (
    <g data-role="digital" pointerEvents="none">
      <rect x={x} y={y + 5} width={w} height={h} rx={h * 0.13} fill="#000000" fillOpacity={0.12} />
      <rect x={x} y={y} width={w} height={h} rx={h * 0.13} fill="#3A4046" stroke="#262B30" strokeWidth={2} />
      <rect x={x + 8} y={y + 8} width={w - 16} height={h - 16} rx={h * 0.09} fill="#F6FAF2" stroke="#E1E8DC" strokeWidth={1.5} />
      {box(hx, o.lit === "h", RC.hour)}
      {box(mx, o.lit === "m", RC.minute)}
      <circle cx={hx + bw + colW / 2} cy={by + bh * 0.34} r={colW * 0.15} fill={RC.rim} />
      <circle cx={hx + bw + colW / 2} cy={by + bh * 0.68} r={colW * 0.15} fill={RC.rim} />
      {!o.cover ? digits : o.reveal ? <g data-reveals="answer">{digits}</g> : (
        <g>
          <text x={hx + bw / 2} y={by + bh / 2 + fs * 0.36} textAnchor="middle" fontSize={fs} fontWeight={700} fill="#767676" style={{ fontFamily: "inherit" }}>?</text>
          <text x={mx + bw / 2} y={by + bh / 2 + fs * 0.36} textAnchor="middle" fontSize={fs} fontWeight={700} fill="#767676" style={{ fontFamily: "inherit" }}>?</text>
        </g>
      )}
      <text x={hx + bw / 2} y={by + bh + ls + 2} textAnchor="middle" fontSize={ls} fontWeight={600} fill={hourInk} style={{ fontFamily: "inherit" }}>{tx("hours")}</text>
      <text x={mx + bw / 2} y={by + bh + ls + 2} textAnchor="middle" fontSize={ls} fontWeight={600} fill={RC.minute} style={{ fontFamily: "inherit" }}>{tx("minutes")}</text>
    </g>
  );
}

/* the words card: the time as the book says it ("10 minutes past 4", "quarter to 8"); "?" while a question asks for it */
function rcWordsCard(x: number, y: number, w: number, h: number, text: string, o: any = {}) {
  /* a "|" in the text marks where a long phrase breaks ("10 बजने में|20 मिनट"), so a phrase is never split inside itself */
  const raw = String(text), mark = raw.indexOf("|"), flat = raw.replace("|", " ");
  const fs = T.label + 2, words = flat.split(" ");
  let lines = [flat];
  if (flat.length > 17 && mark > 0) lines = [raw.slice(0, mark), raw.slice(mark + 1)];
  else if (flat.length > 17 && words.length > 1) {
    let best = 1, bd = 1e9;
    for (let k = 1; k < words.length; k++) { const d = Math.abs(words.slice(0, k).join(" ").length - words.slice(k).join(" ").length); if (d < bd) { bd = d; best = k; } }
    lines = [words.slice(0, best).join(" "), words.slice(best).join(" ")];
  }
  const y0 = y + h / 2 - ((lines.length - 1) * (fs + 6)) / 2 + fs * 0.36;
  const said = <g>{lines.map((l, i) => <text key={"wl" + i} x={x + w / 2} y={y0 + i * (fs + 6)} textAnchor="middle" fontSize={fs} fontWeight={700} fill={RC.num} style={{ fontFamily: "inherit" }}>{l}</text>)}</g>;
  return (
    <g data-role="words" pointerEvents="none">
      <rect x={x} y={y + 3} width={w} height={h} rx={16} fill="#000000" fillOpacity={0.08} />
      <rect x={x} y={y} width={w} height={h} rx={16} fill="#FFFFFF" stroke={o.reached ? RC.ok : "#C9BCA6"} strokeWidth={o.reached ? 5 : 3} />
      {!o.cover ? said : o.reveal ? <g data-reveals="answer">{said}</g>
        : <text x={x + w / 2} y={y + h / 2 + 20} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill="#767676" style={{ fontFamily: "inherit" }}>?</text>}
    </g>
  );
}

function Work({ phase, n, item, index, stage, wrong, typed, api, MODEL, step, stepOn, box, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();     /* the traceback */
  const th = useTimeline();     /* a hand turning by itself: a tap, a Step, a Round */
  const { cx, cy, R } = RC_GEO;
  /* the picture is laid out for the 900 the area keeps with the keypad open, and centred in the room while it is shut (never under
     the key's corner) */
  const kx = box && box.key ? box.key.x - 12 : box ? box.w : 900;
  const ox = box ? Math.round(Math.max(0, Math.min((box.w - 900) / 2, kx - 896))) : 0;
  const P = phase || {};
  const free = stage === "free";
  /* a phase opens on "teach" for one frame before "demo": the warm-up board for both (PATTERNS 18) */
  const warm = !free && (stage === "demo" || stage === "teach") && !!(P.steps && P.steps.length);
  const it: any = !free && !warm && item ? item : null;
  const kind = free ? "free" : warm ? "warm" + n : it ? it.kind : "none";
  const asking = stage === "ask";
  const shown = !!it && (stage === "win" || stage === "idle");   /* the right answer is in: the readouts uncover */
  const isCount = !!it && (it.kind === "count" || it.kind === "round");

  /* the board belongs to the ENTRY of a question (PATTERNS 18): a new question key rebuilds it, also after an away-and-back */
  const bk = free ? "free" : warm ? "w" + n : "q" + n + "." + index;
  const bkRef = useRef(""), entryRef = useRef(0);
  if (bkRef.current !== bk) { bkRef.current = bk; entryRef.current += 1; }
  const entry = entryRef.current;
  /* the warm-ups: phase 1 at 4:00 (the two hands apart, so neither hides the other), phase 2 at 8:00, phase 3 at 9:00 */
  const t0Of = () => (free ? 180 : warm ? (n === 1 ? 240 : n === 2 ? 480 : 540) : it ? it.t0 : 0);
  const fresh = () => { const t0 = t0Of(); return { e: entryRef.current, t: t0, s0: rcM(t0), steps: 0, picked: null, moved: false, everMoved: false, lit: null }; };
  const [raw, setRaw] = useState<any>(null);
  const S = raw && raw.e === entry ? raw : fresh();
  const liveS = useRef<any>(null);
  if (!liveS.current || liveS.current.e !== entry) liveS.current = S;
  const cur = () => (liveS.current && liveS.current.e === entryRef.current ? liveS.current : fresh());
  const put = (f: any) => { const b = cur(); const nx = { ...b, ...f(b), e: entryRef.current }; if (nx.moved) nx.everMoved = true; liveS.current = nx; setRaw(nx); };
  const busyRef = useRef(false);

  /* the view keys (phase 3 and free play): plain dial, the minutes round the edge, the two halves past and to */
  const [vw, setVw] = useState<any>({ k: "", v: "plain" });
  const vk = free ? "free" : "p" + n;
  const viewKeys = free || n === 3;
  const readQ = !!it && (it.kind === "read" || it.kind === "readTo");
  const view0 = vw.k === vk ? vw.v : "plain";
  const view = !viewKeys ? "scene" : readQ && view0 === "minutes" ? "plain" : view0;

  /* the correction layer, keyed to the entry */
  const [trRaw, setTr] = useState<any>(null);
  const tr = trRaw && trRaw.e === entry ? trRaw : null;

  /* the answer gate (PATTERNS 19): a counting question keeps the Answer key and the keypad off until the long hand has been stepped
     to its mark, once the child has touched the board for real in this phase (the agent never touches, so it is never gated) */
  const [touch, setTouch] = useState<any>({ n: 0, c: 0 });
  const touched = touch.n === n && touch.c > 0;
  const touchOn = () => { setTouch((p: any) => (p.n === n ? { n, c: p.c + 1 } : { n, c: 1 })); if (trRaw) setTr(null); };
  const reached = isCount ? S.steps >= it.need : true;
  /* a set or pick question (answered on the clock, judged on Enter) is gated the same way until a hand has first moved (not again
     after a miss: then Enter waits for a new move and says so) */
  const padQ = !!it && it.pad === "enter";
  const gateOn = asking && touched && ((isCount && !reached) || (padQ && !S.everMoved));
  const gateRef = useRef(false);
  useEffect(() => {
    if (gateOn && !gateRef.current) { gateRef.current = true; api.lock(true); }
    else if (!gateOn && gateRef.current) { gateRef.current = false; api.lock(false); }
  }, [gateOn]);
  useEffect(() => () => { if (gateRef.current) { gateRef.current = false; api.lock(false); } }, []);
  /* a REAL Enter on a guide step is the child's touch too (a keyboard-only child, a teacher on Enter), so the gate arms for them; the
     agent's check() and toolApi send no key, so AI mode is never gated. The same listener times the physical Enter, so a doubled Enter
     (50 to 300 ms apart) performs ONE guide step, never two. */
  const keyEnterAt = useRef(0), keyStepAt = useRef(0);
  useEffect(() => {
    const onKey = (e: any) => {
      if (!e.isTrusted || e.key !== "Enter") return;
      keyEnterAt.current = Date.now();
      if (stage === "demo") touchOn();
    };
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  }, [stage, n]);
  /* NUDGES (PATTERNS 18-19): while the gate holds, a tap on the locked key, a typed digit or Enter says which act is waiting (never a
     number); Enter on a set or pick question whose hands have not moved since the miss says so too; a tap on the Minutes key that is off
     for a read question says why. The question comes back on the child's next press. */
  const nudgeAt = useRef(0);
  /* a miss's hint stays on the bubble until the child's next act, and a line said over it is not drawn: when a hint is up, the
     runtime's own openAnswer clears it (the keyOnly rule: a tap on the Answer key brings the question back), so the nudge is seen.
     On a question answered on the clock (pad "enter") it draws no panel; on a typed question the keypad opens, ready for the count. */
  const clearHint = () => {
    try {
      const g = (window as any).toolApi && (window as any).toolApi.getState();
      if (g && g.hint && g.hintKind !== "type" && api.openAnswer) api.openAnswer();
    } catch (e) { /* no hint to clear */ }
  };
  const nudge = () => {
    if (!it) return;
    clearHint();
    nudgeAt.current = Date.now();
    if (it.kind === "round") api.say("Now tap Round and watch the minute hand go round.");
    else if (it.kind === "count") api.say("Now tap Step and watch the minute hand move.");
    else if (it.kind === "pick") api.say("Tap one of the hands first.");
    else api.say("Move a hand first.");
  };
  useEffect(() => {
    if (!asking || !it) return;
    const back = () => { if (nudgeAt.current && Date.now() - nudgeAt.current > 300) { nudgeAt.current = 0; api.say(it.say); } };
    const onKey = (e: any) => {
      if (!e.isTrusted) return;
      if (gateOn && (/^[0-9]$/.test(String(e.key)) || e.key === "Enter")) { nudge(); return; }
      back();
    };
    const onDown = (e: any) => {
      if (!e.isTrusted) return;
      const onAnswerKey = e.target && e.target.closest ? e.target.closest('[data-control="answer-open"]') : null;
      if (gateOn && onAnswerKey) { nudge(); return; }
      back();
    };
    window.addEventListener("keydown", onKey, true);
    document.addEventListener("pointerdown", onDown, true);
    return () => { window.removeEventListener("keydown", onKey, true); document.removeEventListener("pointerdown", onDown, true); };
  }, [gateOn, asking, entry]);
  /* a question entered again starts clean: stop what was turning or correcting */
  useEffect(() => () => { tl.stop(); th.stop(); busyRef.current = false; }, [entry]);

  /* which hands are live now */
  const demoLive = stage === "demo" && !!stepOn;
  const setQ = !!it && (it.kind === "setHour" || it.kind === "set");
  const liveHour = (demoLive && n !== 2) || free || (asking && (setQ || (!!it && it.kind === "pick")));
  const liveMin = demoLive || free || (asking && (setQ || (!!it && it.kind === "pick") || (isCount && !reached)));
  /* a drag turns the hand freely only here; elsewhere a drag counts as a tap (a Step, a Round, a pick) */
  const dragTurns = kind === "warm1" || kind === "warm3" || kind === "free" || setQ;
  const stepTarget = () => (kind === "warm3" && stepOn === "minute" ? [null, 15, 30, 45][step] ?? null : null);

  /* the hand under the finger: the hour hand snaps to an hour (the minutes stay), the long hand snaps to five minutes and carries
     the hour when it passes the 12 (unwrapped along the drag) */
  const accRef = useRef<any>(null);
  const dragT = (name: string, x: number, y: number) => {
    const b = cur(), a = rcAng(cx + ox, cy, x, y);
    if (name === "hour") { const m = rcM(b.t), h = ((Math.round(a / 30 - m / 60) % 12) + 12) % 12; return h * 60 + m; }
    const m1 = (Math.round(a / 30) * 5) % 60;
    let r = accRef.current;
    if (!r || r.e !== entryRef.current) r = accRef.current = { e: entryRef.current, t: b.t, last: rcM(b.t) };
    let d = m1 - r.last;
    if (d > 30) d -= 60;
    if (d < -30) d += 60;
    if (d) { r.t += d; r.last = m1; }
    return r.t;
  };

  /* a hand turning by itself, one minute a beat (the hour hand creeps with it) */
  const turnBy = (k: number, ms: number, each: any, done: any, dir: number = 1) => {
    const e0 = entryRef.current;
    busyRef.current = true;
    const seq: any[] = [];
    for (let j = 1; j <= k; j++) seq.push([ms, () => { if (entryRef.current === e0) put((b: any) => ({ t: b.t + dir, ...(each ? each(j, b) : {}) })); }]);
    th.run(seq, () => { busyRef.current = false; if (entryRef.current !== e0) return; put((b: any) => ({ t: rcN(b.t) })); if (done) done(); });
  };
  const doStep = () => {
    if (busyRef.current || (isCount && reached)) return;
    turnBy(5, 60, null, () => { put((b: any) => ({ steps: b.steps + 1, moved: true, lit: "m" })); api.sfx.tick(); if (warm) api.did("step"); });
  };
  const doRound = () => {
    if (busyRef.current || reached) return;
    turnBy(60, 35, (j: number) => ({ steps: Math.floor(j / 5) }), () => { put(() => ({ steps: 12, moved: true })); api.sfx.settle(); });
  };
  const tapHand = (name: string) => {
    if (busyRef.current) return;
    if (kind === "warm2" || kind === "count") { if (name === "minute") doStep(); return; }
    if (kind === "round") { if (name === "minute") doRound(); return; }
    if (kind === "pick") { put(() => ({ picked: name === "hour" ? "short" : "long", moved: true })); api.sfx.tick(); return; }
    if (kind === "warm3" && name === "minute") {
      const tg = stepTarget();
      if (tg === null) { api.did("minute-off"); return; }
      const k = (tg - rcM(cur().t) + 60) % 60;
      if (!k) { api.did("minute"); return; }
      turnBy(k, 30, null, () => { put(() => ({ lit: "m", moved: true })); api.sfx.settle(); api.did("minute"); });
      return;
    }
    if (name === "hour") { put((b: any) => ({ t: rcN(b.t + 60), moved: true, lit: "h" })); api.sfx.tick(); if (warm) api.did("hour"); return; }
    turnBy(5, 50, null, () => { put(() => ({ moved: true, lit: "m" })); api.sfx.tick(); if (warm) api.did("minute"); });
  };
  /* the keyboard's way back (Shift+Space, the left or down arrow): the hour hand an hour back, the long hand five minutes back; only
     where a hand turns freely (the warm-ups of phases 1 and 3, a set question, free play) */
  const turnBack = (name: string) => {
    if (busyRef.current || !dragTurns) return;
    if (name === "hour") { put((b: any) => ({ t: rcN(b.t - 60), moved: true, lit: "h" })); api.sfx.tick(); if (warm) api.did(kind === "warm3" ? "hour" : "hour"); return; }
    turnBy(5, 50, null, () => { put(() => ({ moved: true, lit: "m" })); api.sfx.tick(); if (warm) api.did(kind === "warm3" ? "minute-off" : "minute"); }, -1);
  };
  const drag = useDrag((name: any, p: any, moved: boolean) => {
    touchOn();
    if (busyRef.current) { accRef.current = null; return; }
    if (!moved || !dragTurns) { accRef.current = null; tapHand(name); return; }
    const tNew = rcN(dragT(name, p.x, p.y));
    accRef.current = null;
    put(() => ({ t: tNew, moved: true, lit: name === "hour" ? "h" : "m" }));
    api.sfx.tick();
    if (kind === "warm3" && name === "minute") { const tg = stepTarget(); api.did(tg !== null && rcM(tNew) === tg ? "minute" : "minute-off"); return; }
    if (warm) api.did(name);
  });
  const dg = drag.drag;
  let tShow = S.t, lit = S.lit;
  if (dg && (dg.payload === "hour" || dg.payload === "minute") && dragTurns && !busyRef.current) {
    tShow = rcN(dragT(dg.payload, dg.x, dg.y));
    lit = dg.payload === "hour" ? "h" : "m";
  } else if (!dg) accRef.current = null;

  /* the view keys and the Step / Round key */
  const pickView = (v: string) => {
    setVw({ k: vk, v });
    api.sfx.tick();
    if (warm) api.did(v === "pastto" ? "pastto" : v === "minutes" ? "view-minutes" : "view-plain");
  };

  /* GUIDE STEPS: Enter, the agent's check() and the dev solve() perform the current step, the same act as the child's tap */
  const act = (on: any) => {
    if (busyRef.current) return;
    /* a physical Enter (timed by the listener above) performs one step per 400 ms; check() and solve() send no key and are not slowed */
    const now = Date.now();
    if (now - keyEnterAt.current < 60) {
      if (now - keyStepAt.current < 400) return;
      keyStepAt.current = now;
    }
    if (on === "hour" || on === "minute") tapHand(on);
    else if (on === "step") doStep();
    else if (on === "pastto") pickView("pastto");
  };
  /* a time set or a hand picked on the clock is judged on the berry Enter key, never on release (the owner, 2026-10-28) */
  const enterAnswer = () => {
    const s = cur();
    if (busyRef.current || !it) return;
    if (!s.moved) { nudge(); return; }   /* Enter before a hand has moved (or since the miss): say what to do, never a silent key */
    api.submit(it.kind === "pick" ? s.picked : `${rcH(s.t)}|${rcM(s.t)}`);
  };
  api.onEnter(stage === "demo" && stepOn ? () => act(stepOn) : asking && it && it.pad === "enter" ? enterAnswer : null);
  useEffect(() => { if (asking && it && it.pad === "enter") api.answerReady(!!S.moved); }, [asking, S.moved, entry]);

  /* the agent's hooks: set the hands (or pick a hand) as a child would; walk the counting act at once */
  HOOK.set = asking && it && it.pad === "enter" ? (v: any) => {
    if (it.kind === "pick") { put(() => ({ picked: String(v), moved: true })); return true; }
    const [h, m] = rcHM(v);
    if (!isFinite(h) || !isFinite(m)) return false;
    put(() => ({ t: rcT(h, m), moved: true }));
    return true;
  } : null;
  HOOK.check = asking && isCount && !reached ? () => { th.stop(); busyRef.current = false; put(() => ({ t: it.t0 + it.need * 5, steps: it.need, moved: true })); return undefined; } : null;

  /* the traceback (MISS HIDES THE ANSWER): it shows on the clock what went wrong and stops one step before the answer; the
     child's own hands never move. A demo layer, cleared by the child's next act. */
  useEffect(() => {
    if (!wrong || stage !== "ask" || !it) return;
    api.lock(true);
    put(() => ({ moved: false }));
    const e0 = entryRef.current;
    let st: any = { e: e0 };
    const T = (o: any) => { st = { ...st, ...o }; setTr(st); };
    T({});
    const seq: any[] = [];
    const [wh, wm] = rcHM(wrong.value);
    const s = cur();
    /* the relevant hand glows first (the owner: "highlight the relevant hand"): the minute hand when the minutes are wrong, the hour
       hand when the hour is; then the working, one step short */
    switch (it.kind) {
      case "readHour": seq.push([900, () => T({ glow: "m" })], [900, () => T({ glow: "h" })]); break;
      case "setHour":
        if (rcM(s.t) !== it.answer[1]) seq.push([900, () => T({ glow: "m" })]);
        if (rcH(s.t) !== it.answer[0]) seq.push([900, () => T({ glow: "h" })]);
        if (!seq.length) seq.push([900, () => T({ glow: "h" })]);
        break;
      case "pick": seq.push([1000, () => T({ glow: "m" })]); break;
      case "count": case "round":
        seq.push([800, () => T({ glow: "m" })]);
        for (let k = 1; k < it.need; k++) { const kk = k; seq.push([it.kind === "round" ? 260 : 420, () => T({ count: kk, dir: 1 })]); }
        break;
      case "read": {
        if (wh !== it.answer[0]) seq.push([900, () => T({ glow: "h" })]);
        if (wm !== it.answer[1]) seq.push([800, () => T({ glow: "m" })]);
        seq.push([700, () => T({ side: "past" })]);
        for (let k = 1; k < it.answer[1] / 5; k++) { const kk = k; seq.push([520, () => T({ count: kk, dir: 1 })]); }
        break;
      }
      case "readTo": case "set": {
        const left = it.kind === "readTo" ? it.answer : 60 - it.answer[1];
        if (it.kind === "set" && rcH(s.t) !== it.answer[0]) seq.push([900, () => T({ glow: "h" })]);
        if (it.kind === "readTo" || rcM(s.t) !== it.answer[1]) seq.push([800, () => T({ glow: "m" })]);
        seq.push([700, () => T({ side: "to" })]);
        for (let k = 1; k < left / 5; k++) { const kk = k; seq.push([520, () => T({ count: kk, dir: -1 })]); }
        break;
      }
      default: seq.push([600, () => {}]);
    }
    tl.run(seq, () => api.lock(false));
  }, [wrong]);

  /* the win line: one sentence, said at the right answer (a phase's last one is replaced by its closing) */
  useEffect(() => { if (stage === "win" && it && it.win) api.say(it.win); }, [stage, entry]);

  /* what the host and the agent read back: never the time a question asks the child to read */
  const secret = !!it && ["readHour", "read", "readTo", "count", "round"].includes(it.kind) && !shown;
  api.share({ view, ...(secret ? {} : { hour: rcH(tShow), minute: rcM(tShow) }), complete: stage === "idle" });

  /* ── drawing ── */
  const covDigits = !!it && ["readHour", "read", "readTo", "count", "round"].includes(it.kind);
  const tintOn = view === "pastto";
  const side = rcSide(tShow);
  const marks = kind === "warm3" ? [3, 6, 9] : [];
  const sceneName = n === 1 && !free ? "backpack" : n === 3 && !free && view !== "plain" ? (it && it.scene) || "bus" : "";
  const wide = ox >= 270;
  const showGaps = kind === "warm2" || isCount;
  const gapR = R + 31;
  const glowNow = tr && tr.glow ? tr.glow : null;
  const litNow = glowNow || lit;
  /* the grips: finger boxes 76 across, centred on each hand's grip */
  const gh = rcPol(cx, cy, R * RC_HOUR_GRIP, rcN(tShow) / 2), gm = rcPol(cx, cy, R * RC_MIN_GRIP, rcM(tShow) * 6);
  const grip = (name: string, g: any, live: boolean) => {
    const id = name, label = name === "hour" ? "short hand (hour hand)" : "long hand (minute hand)";
    const keys = live ? drag.keys(name) : null;
    const onKey = (e: any) => {
      /* the keyboard (PATTERNS 5b): on a set question Space turns a focused hand and Enter always passes to the window, where it
         answers; on the pick question Enter picks a hand that is not picked yet and passes once that hand is the one picked */
      if (e.key === "Enter" && asking && setQ) return;
      if (e.key === "Enter" && asking && it && it.kind === "pick" && cur().picked === (name === "hour" ? "short" : "long")) return;
      /* turning both ways from the keyboard: Space or the right / up arrow turns on, Shift+Space or the left / down arrow turns back
         (Tab is never caught, so there is no keyboard trap) */
      const fwd = e.key === "ArrowRight" || e.key === "ArrowUp", bwd = e.key === "ArrowLeft" || e.key === "ArrowDown" || (e.key === " " && e.shiftKey);
      if (keys && (fwd || bwd)) {
        e.preventDefault(); e.stopPropagation();
        if (e.repeat && busyRef.current) return;
        touchOn();
        if (bwd) turnBack(name); else tapHand(name);
        return;
      }
      if (keys) keys.onKeyDown(e);
    };
    return live ? (
      <g key={"grip-" + name} {...control(id, label)} {...drag.bind(name)} onKeyDown={onKey} style={{ cursor: "grab" } as any}>
        <circle cx={g.x} cy={g.y} r={38} fill="transparent" />
      </g>
    ) : (
      <g key={"grip-" + name} data-control={id} role="button" aria-label={label} aria-disabled="true" tabIndex={-1}>
        <circle cx={g.x} cy={g.y} r={38} fill="transparent" />
      </g>
    );
  };
  const KX = 548, KW = 340;
  const actKey = kind === "warm2" || isCount ? (it && it.kind === "round" ? "round" : "step") : "";
  const actLive = actKey && ((demoLive && stepOn === "step") || (asking && isCount && !reached));
  const viewDis = (v: string) => v === "view-minutes" && readQ;
  const VIEWS = [
    { id: "view-minutes", v: "minutes", label: "Minutes", x: KX, y: 316, w: 166 },
    { id: "view-plain", v: "plain", label: "Plain", x: KX + 174, y: 316, w: 166 },
    { id: "pastto", v: "pastto", label: "Past and to", x: KX, y: 402, w: KW },
  ];
  const inviteOn = demoLive ? stepOn : asking && isCount && !reached ? actKey : null;

  return (
    <g transform={`translate(${ox},0)`}>
      {/* the scene's one prop, set beside the clock and never over it, always in the same place: left of the dial, while the keypad is
          shut (left out in the Plain dial view) */}
      {sceneName === "backpack" && wide && (
        <g pointerEvents="none">
          <rect x={-ox + 90} y={362} width={101} height={132} rx={22} fill={tint("#C98A3D", 0.55)} stroke={shade("#C98A3D", 0.2)} strokeWidth={3} />
          <Skin name="backpack" x={-ox + 90} y={362} w={101} h={132} />
        </g>
      )}
      {sceneName === "bus" && wide && (
        <g pointerEvents="none">
          <rect x={-ox + 56} y={432} width={170} height={62} rx={12} fill={tint("#E8B923", 0.55)} stroke={shade("#E8B923", 0.25)} strokeWidth={3} />
          <Skin name="bus" x={-ox + 56} y={432} w={170} h={62} />
        </g>
      )}
      {sceneName === "pot" && wide && (
        <g pointerEvents="none">
          <rect x={-ox + 60} y={372} width={160} height={120} rx={18} fill={tint("#B8673A", 0.55)} stroke={shade("#B8673A", 0.25)} strokeWidth={3} />
          <Skin name="pot" x={-ox + 60} y={372} w={160} h={120} />
        </g>
      )}

      {rcDial(cx, cy, R, { tint: tintOn, side, marks, ring: view === "minutes" && !(tr && tr.count), tx })}

      {/* phase 2: each five-minute gap the long hand has walked lights up with its 5 */}
      {showGaps && (
        <g pointerEvents="none">
          {Array.from({ length: Math.min(S.steps, 12) }, (_, i) => {
            const a1 = ((S.s0 + 5 * i) % 60) * 6, a2 = a1 + 30, mid = rcPol(cx, cy, gapR, a1 + 15);
            return (
              <g key={"gap" + i}>
                <path d={rcBand(cx, cy, R * 0.8, R * 0.955, a1, a2)} fill={RC.past} fillOpacity={0.45} stroke={RC.minute} strokeWidth={2} />
                <text x={mid.x} y={mid.y + 11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={RC.minute} style={{ fontFamily: "inherit" }}>5</text>
              </g>
            );
          })}
          {asking && isCount && !reached && it.kind === "count" && (() => { const p = rcPol(cx, cy, R * 0.9, ((S.s0 + it.need * 5) % 60) * 6);
            return <circle cx={p.x} cy={p.y} r={18} fill="none" stroke={RC.minute} strokeWidth={5} strokeDasharray="6 5" />; })()}
        </g>
      )}

      {/* the correction: the side coloured, the fives counted, one step short of the answer */}
      {tr && (
        <g pointerEvents="none" data-role="correction">
          {tr.side && <path d={rcHalf(cx, cy, R * 0.95, tr.side)} fill={tr.side === "past" ? RC.past : RC.to} fillOpacity={0.4} />}
          {tr.side && !tintOn && rcSideLabel(cx, cy, R, tr.side, tx)}
          {Array.from({ length: tr.count || 0 }, (_, i) => {
            const k = i + 1, mm = tr.dir < 0 ? 60 - 5 * k : (isCount ? S.s0 : 0) + 5 * k, p = rcPol(cx, cy, gapR, (mm % 60) * 6);
            return <text key={"tc" + k} x={p.x} y={p.y + 11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={tr.dir < 0 ? shade(RC.to, 0.55) : RC.minute} style={{ fontFamily: "inherit" }}>{5 * k}</text>;
          })}
        </g>
      )}

      {rcHands(cx, cy, R, tShow, { glow: glowNow, picked: kind === "pick" ? S.picked : null })}
      {rcNumerals(cx, cy, R)}

      {/* the win: the count and the round, in green */}
      {shown && isCount && (() => { const mm = (S.s0 + it.need * 5) % 60, q = rcPol(cx, cy, gapR, mm * 6), p = { x: q.x, y: Math.max(q.y, 34) };   /* the "60" at the 12 kept clear of the card's top */
        return (
          <g data-reveals="answer" pointerEvents="none">
            <circle cx={p.x} cy={p.y} r={26} fill="#FFFFFF" stroke={RC.ok} strokeWidth={4} />
            <text x={p.x} y={p.y + 11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={shade(RC.ok, 0.3)} style={{ fontFamily: "inherit" }}>{it.answer}</text>
            {it.kind === "round" && <g>
              <rect x={618} y={436} width={200} height={64} rx={32} fill={tint(RC.ok, 0.8)} stroke={RC.ok} strokeWidth={4} />
              <text x={718} y={479} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={shade(RC.ok, 0.35)} style={{ fontFamily: "inherit" }}>{tx("1 hour")}</text>
            </g>}
          </g>
        );
      })()}

      {/* the two grips the child turns (finger boxes 76 across) */}
      {grip("hour", gh, !!liveHour)}
      {grip("minute", gm, !!liveMin)}
      {inviteOn === "hour" && <Invite x={gh.x} y={gh.y} r={44} C={C} />}
      {inviteOn === "minute" && <Invite x={gm.x} y={gm.y} r={44} C={C} />}

      {rcDigital(KX, 18, KW, 168, tShow, { lit: litNow, cover: covDigits, reveal: shown, tx })}
      {/* the words card belongs to phase 3 (past, to, half and quarters) and free play: phases 1 and 2 never say a time in words */}
      {/* in the phase-3 warm-up only the quarter forms it teaches print (o'clock, quarter past, half past, quarter to): any other time
          would print a question's answer (3.1, 3.2) before it is asked */}
      {(n === 3 || free) && rcWordsCard(KX, 200, KW, 100, rcWords(tShow, lang), { cover: !!it || (kind === "warm3" && rcM(tShow) % 15 !== 0), reveal: shown, reached: shown })}

      {actKey && (
        <g>
          <Key id={actKey} label={actKey === "round" ? "Round" : "Step"} x={618} y={330} w={200} h={84} C={C} tone="key" disabled={!actLive}
            onClick={() => { touchOn(); if (actKey === "round") doRound(); else doStep(); }}>
            <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={actLive ? toneInk("key", C.ink) : "#6B6B6B"} style={{ fontFamily: "inherit" }}>{tx(actKey === "round" ? "Round" : "Step")}</text>
          </Key>
          {inviteOn === actKey && <Invite x={718} y={372} w={200} h={84} C={C} />}
        </g>
      )}
      {viewKeys && VIEWS.map((b) => (
        <g key={"vk-" + b.id}>
          <Key id={b.id} label={b.label} x={b.x} y={b.y} w={b.w} h={76} C={C} tone="key" disabled={viewDis(b.id)}
            onClick={() => { touchOn(); pickView(b.v); }}>
            {/* a key that is off this question (Minutes on a read question) keeps a readable grey label on its quiet face */}
            <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={viewDis(b.id) ? "#6B6B6B" : toneInk("key", C.ink)} style={{ fontFamily: "inherit" }}>{tx(b.label)}</text>
          </Key>
          {view === b.v && <rect x={b.x - 6} y={b.y - 6} width={b.w + 12} height={76 + 12 + EDGE} rx={RAD.key + 6} fill="none" stroke={RC.rim} strokeWidth={4} pointerEvents="none" />}
          {/* the Minutes key is off on a read question (its ring would print the minutes); a tap on it says why, and changes nothing */}
          {viewDis(b.id) && asking && <Hit id="minutes-off" x={b.x} y={b.y} w={b.w} h={76} label="Minutes (off for this question)"
            onPress={() => { clearHint(); nudgeAt.current = Date.now(); api.say("For this question, count the fives yourself."); }} />}
          {inviteOn === b.id && <Invite x={b.x + b.w / 2} y={b.y + 38} w={b.w} h={76} C={C} />}
        </g>
      ))}
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase: a small clock at that time and its digits.
   result.last = { value, answer, kind, item (the INDEX), it (the item), shared } */
function Thumb({ result, it, C, w, h, lang = "en", tx = (v: any) => v }: any) {
  const last = result && result.last;
  const item = it || (last && last.it) || null;
  if (!last || !item) return null;
  const v = last.value;
  let t = item.t0, label = "";
  if (item.kind === "pick") label = rcH(t) + ":" + rc2(rcM(t));   /* the clock the child read the hands on */
  else if (item.pad === "enter") { const [hh, mm] = rcHM(v); t = rcT(hh, mm); label = hh + ":" + rc2(mm); }
  else if (item.parts) { const [hh, mm] = slotPartsOf(v, 2).map(Number); t = rcT(hh, mm); label = hh + ":" + rc2(mm); }
  else if (item.kind === "count" || item.kind === "round") { t = item.t0 + item.need * 5; label = String(v); }
  else if (item.kind === "readHour") label = v + ":00";
  else label = String(v);
  const r = Math.min(h / 2 - 4, 40), ccx = r + 8, ccy = h / 2;
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      <circle cx={ccx} cy={ccy} r={r} fill={RC.face} stroke={RC.rim} strokeWidth={3} />
      {[0, 3, 6, 9].map((k) => { const p = rcPol(ccx, ccy, r * 0.82, k * 30); return <circle key={"tm" + k} cx={p.x} cy={p.y} r={2.5} fill={RC.rim} />; })}
      <line x1={ccx} y1={ccy} x2={rcPol(ccx, ccy, r * 0.5, rcN(t) / 2).x} y2={rcPol(ccx, ccy, r * 0.5, rcN(t) / 2).y} stroke={RC.hour} strokeWidth={item.kind === "pick" ? 8 : 5} strokeLinecap="round" />
      <line x1={ccx} y1={ccy} x2={rcPol(ccx, ccy, r * 0.82, rcM(t) * 6).x} y2={rcPol(ccx, ccy, r * 0.82, rcM(t) * 6).y} stroke={RC.minute} strokeWidth={3.5} strokeLinecap="round" />
      {item.kind === "pick" && <circle cx={rcPol(ccx, ccy, r * 0.5, rcN(t) / 2).x} cy={rcPol(ccx, ccy, r * 0.5, rcN(t) / 2).y} r={9} fill="none" stroke={RC.rim} strokeWidth={3} />}
      {label && <text x={w - 16} y={h / 2 + 12} textAnchor="end" fontSize={T.label} fontWeight={700} fill={C.ink} style={{ fontFamily: "inherit" }}>{label}</text>}
    </g>
  );
}

function ReadTheClock(props: any) {
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

export default ReadTheClock;