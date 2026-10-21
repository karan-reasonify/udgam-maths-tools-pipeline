/* ═══ M1.S1.T2.C5.2D1 · divide_ladder · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists: header + its three controls, canvas, bubble + mascot, phase dots, window.toolApi,
   the sound effects, the printed bubble, scoring, the events, idle and restart. THE LESSON IS SILENT (runtime r30+):
   every line is printed on the bubble, which is the guide; nothing moves on unless the child acts.
   THE NEW LOOK (docs/LAYOUT.md §1d-§1e, docs/PATTERNS.md §15-§16): keyOnly + navDots, one sentence a screen, every act
   performed on screen through api.act (the hand taps each row as the tray is shared out, and carries a card to the pen).
   The working area is `box` ({ w, h, open, key }): everything is laid out from it on every render. */

const TOOL_ID = "divide_ladder";
const MEDIA_ID = "M1.S1.T2.C5.2D1";
const TOOL_NAME = "Divide Ladder";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
/* kept for the tool object's shape (and the sidecar); nothing speaks from r30 */
const VOICE = {"rate":0.92,"pitch":1.06};

/* printed on the bubble before phase 1's teach lines only (not shown when phase 1 has steps) */
const OPENING = ["A tray of things up at the top, and a ladder of rungs under it."];
/* the whole-tool line: printed on the summary page */
const FINISH_LINE = "Every rung tried in order, every failure still showing, and the pen full.";
/* printed when the child opens Free play (the plan's free-play line); its LAST piece stays on the bubble */
const FREE_LINE = "Free play. Pick a number for the tray, then climb the ladder and watch the pen and the repeat light.";

/* THE START PAGE: START_HOOK is ONE printed question to wonder at; StartArt is the object the lesson is about
   (1200 x 340, no digit, no sentence): a ladder, a tray of counters, walled rows and an empty pen of blank cards. */
const START_HOOK = "Which rungs share the tray out with nothing left over?";
function StartArt({ box, C: C0, lang, tx }: any) {
  const { C, wood, pan } = dlFrame(C0);
  const ys = [76, 142, 208, 274];
  /* the counters are apples here too (24 on the page, inside the 40-a-screen budget): the plain dot first, the apple over it */
  const dots = (x0: number, y0: number, c: number, r: number) => Array.from({ length: c }, (_, i) => {
    const cx = x0 + r + i * (r * 2.5);
    return (
      <g key={"d" + x0 + "_" + y0 + "_" + i}>
        <circle cx={cx} cy={y0} r={r * 0.78} fill="url(#gTen)" stroke={shade(CONTENT.ten, 0.25)} strokeWidth={1.4} />
        <Skin name="apple" x={cx - r * 1.05 * 0.96} y={y0 - r * 1.05} w={r * 2.1 * 0.96} h={r * 2.1} fit="stretch" />
      </g>
    );
  });
  return (
    <g>
      <rect x={70} y={10} width={14} height={324} rx={7} fill={wood} />
      <rect x={246} y={10} width={14} height={324} rx={7} fill={wood} />
      {ys.map((y, i) => (
        <rect key={"r" + i} x={84} y={y - 24} width={162} height={48} rx={14} fill={i === 0 ? "url(#gHundred)" : "#FFFFFF"} stroke={i === 0 ? shade(CONTENT.hundred, 0.2) : wood} strokeWidth={3} />
      ))}
      <rect x={330} y={12} width={820} height={72} rx={18} fill={pan} stroke={C.rule} strokeWidth={2} />
      {dots(354, 48, 12, 15)}
      {[0, 1, 2].map((j) => (
        <g key={"w" + j}>
          <rect x={330} y={104 + j * 58} width={500} height={50} rx={14} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} />
          {dots(352, 129 + j * 58, 4, 14)}
        </g>
      ))}
      <rect x={330} y={284} width={500} height={50} rx={14} fill={tint(C.panel, 0.5)} stroke={C.rule} strokeWidth={2} />
      <rect x={880} y={110} width={270} height={224} rx={18} fill={tint(C.panel, 0.35)} stroke={C.rule} strokeWidth={2} />
      <rect x={880} y={110} width={12} height={224} rx={6} fill={wood} />
      <rect x={1138} y={110} width={12} height={224} rx={6} fill={wood} />
      {[0, 1, 2].map((j) => <rect key={"c" + j} x={908 + j * 74} y={170} width={62} height={76} rx={10} fill="#FFFFFF" stroke={CONTENT.hundred} strokeWidth={3} />)}
    </g>
  );
}

/* Hindi and Gujarati (docs/PATTERNS.md §11): every line stays English, exactly as the checks read it; this table is
   keyed by that English, byte for byte. Filled by the language pass, once the English is final. Empty = English only. */
const TR: any = {
  hi: {
    "Divide Ladder": "भाग की सीढ़ी",
    "A tray of things up at the top, and a ladder of rungs under it.": "ऊपर थाली में चीज़ें हैं, और उसके नीचे पायदानों की सीढ़ी है।",
    "Every rung tried in order, every failure still showing, and the pen full.": "हर पायदान क्रम से आज़माया, हर असफल कोशिश अब भी दिख रही है, और बाड़ा भरा है।",
    "Free play. Pick a number for the tray, then climb the ladder and watch the pen and the repeat light.": "मुक्त खेल। थाली के लिए एक संख्या चुनो, फिर सीढ़ी चढ़ो और बाड़े व दोहराव की बत्ती को देखो।",
    "Which rungs share the tray out with nothing left over?": "किन पायदानों पर थाली बाँटने पर कुछ नहीं बचता?",
    /* phase 1 */
    "What makes a number a factor": "कोई संख्या गुणनखंड कब होती है",
    "Tap rung 3 to share the 12 into 3 equal rows.": "पायदान 3 छुओ और 12 को 3 बराबर पंक्तियों में बाँटो।",
    "Tap the lower rung.": "नीचे वाला पायदान छुओ।",
    "Now tap rung 5: a factor divides exactly, with nothing left over.": "अब पायदान 5 छुओ: गुणनखंड से पूरा भाग जाता है और कुछ नहीं बचता।",
    "Tap the rung that is still plain.": "जो पायदान अभी सादा है, उसे छुओ।",
    "Is anything left over after this rung?": "इस पायदान के बाद क्या कुछ बचा?",
    "Count what is left over once the rows are full.": "पंक्तियाँ भरने के बाद जो बचा है, उसे गिनो।",
    "A factor divides a number exactly, with nothing left over.": "गुणनखंड से संख्या पूरी भाग जाती है, कुछ नहीं बचता।",
    "You learned: a factor divides a number exactly, with nothing left over.": "तुमने सीखा: गुणनखंड से संख्या पूरी भाग जाती है, कुछ नहीं बचता।",
    "Which of the two rungs is a factor of 20?": "दोनों में से कौन-सा पायदान 20 का गुणनखंड है?",
    "Which is a factor of 20?": "20 का गुणनखंड कौन-सा है?",
    "Which rung shares every counter out, with nothing left over?": "कौन-सा पायदान हर गोटी बाँट देता है और कुछ नहीं बचता?",
    "Rung 4 shares 20 out with nothing left over.": "पायदान 4 पर 20 बँट जाते हैं और कुछ नहीं बचता।",
    "Is 8 a factor of 68?": "क्या 68 का गुणनखंड 8 है?",
    "After 8 rows, how many are left over?": "8 पंक्तियों के बाद कितने बचे?",
    "Some are left over, so 8 is not a factor of 68.": "कुछ बच गए, इसलिए 8, 68 का गुणनखंड नहीं है।",
    "Now the tray holds 78: is 6 a factor of it?": "अब थाली में 78 हैं: क्या 6 उसका गुणनखंड है?",
    "Is 6 a factor of 78?": "क्या 78 का गुणनखंड 6 है?",
    "Did every one of the 78 find a place in a row?": "क्या 78 में से हर एक को किसी पंक्ति में जगह मिली?",
    "Nothing is left over, so 6 is a factor of 78.": "कुछ नहीं बचा, इसलिए 6, 78 का गुणनखंड है।",
    "yes": "हाँ", "no": "नहीं",
    "4 is a factor": "4 गुणनखंड है", "not a factor": "गुणनखंड नहीं", "6 is a factor": "6 गुणनखंड है",
    /* phase 2 */
    "Working up through the numbers in order": "संख्याओं में क्रम से ऊपर चढ़ना",
    "Try to jump: tap rung 4 now.": "कूदकर देखो: अभी पायदान 4 छुओ।",
    "Tap rung 4, high up the ladder.": "पायदान 4 छुओ, जो सीढ़ी में ऊपर है।",
    "The ladder lit the rung you must take: tap it.": "सीढ़ी ने वह पायदान चमकाया है जो तुम्हें लेना है: उसे छुओ।",
    "Tap the rung with the glow.": "चमकता हुआ पायदान छुओ।",
    "Now tap the next rung up.": "अब अगला ऊपर वाला पायदान छुओ।",
    "Tap the rung just above the first.": "पहले के ठीक ऊपर वाला पायदान छुओ।",
    "Can you be sure about a number you never tried?": "जिस संख्या को आज़माया ही नहीं, उसके बारे में पक्का कैसे कहोगे?",
    "Climb from the first rung, skip none, and note what is left over.": "पहले पायदान से चढ़ो, कोई न छोड़ो, और देखो कितना बचता है।",
    "Try every whole number from one, and keep the ones that fail.": "एक से हर संख्या आज़माओ, और जो न बँटें, उन्हें भी रखो।",
    "You learned: try every number in order and keep the failures.": "तुमने सीखा: हर संख्या क्रम से आज़माओ और असफल को भी रखो।",
    "Climb the ladder for 40 and name the first rung that fails.": "40 के लिए सीढ़ी चढ़ो और पहला असफल पायदान बताओ।",
    "First rung that fails?": "पहला असफल पायदान?",
    "Look down the ladder: which is the first rung with something left over?": "सीढ़ी में देखो: पहला पायदान कौन-सा है जिसमें कुछ बचता है?",
    "Rung 3 is the first to leave something over.": "पायदान 3 पर सबसे पहले कुछ बचता है।",
    "Find every factor of 92 by climbing, then press Enter.": "चढ़कर 92 के सारे गुणनखंड ढूँढो, फिर ‘दर्ज करें’ दबाओ।",
    "Every factor of 92": "92 के सारे गुणनखंड",
    "Is any rung on the ladder still blank?": "क्या सीढ़ी का कोई पायदान अभी भी खाली है?",
    "The pen holds every factor of 92.": "बाड़े में 92 के सारे गुणनखंड हैं।",
    "The repeat light is on, so the list is finished.": "दोहराव की बत्ती जल गई है, इसलिए सूची पूरी हो गई।",
    "Two rungs were skipped for 70: is either one a factor?": "70 के लिए दो पायदान छूट गए: क्या उनमें कोई गुणनखंड है?",
    "Is a skipped rung a factor?": "क्या छूटा पायदान गुणनखंड है?",
    "What did each skipped rung leave over?": "हर छूटे पायदान पर क्या बचा?",
    "Both skipped rungs leave something over, so neither is a factor.": "दोनों छूटे पायदानों पर कुछ बचता है, इसलिए कोई गुणनखंड नहीं।",
    "3 only": "सिर्फ़ 3", "4 only": "सिर्फ़ 4", "both": "दोनों", "neither": "कोई नहीं",
    "3 fails first": "3 सबसे पहले असफल", "every factor of 92": "92 के सारे गुणनखंड", "neither is a factor": "इनमें से कोई गुणनखंड नहीं",
    /* phase 3 */
    "Every exact division hands you two": "बिना शेष के भाग देने पर तुम्हें दो मिलते हैं",
    "A rung came out: tap its card to send it to the pen.": "एक पायदान पूरा बँटा: उसका कार्ड छूकर बाड़े में भेजो।",
    "Tap the card marked rows.": "जिस कार्ड पर पंक्तियाँ लिखा है, उसे छुओ।",
    "The same division left a second card: tap it too.": "उसी भाग से दूसरा कार्ड भी मिला: उसे भी छुओ।",
    "Tap the card marked in each.": "जिस कार्ड पर हर पंक्ति में लिखा है, उसे छुओ।",
    "When a division works, its answer is a factor too.": "जब भाग पूरा बँटता है, तो उसका उत्तर भी गुणनखंड होता है।",
    "Rows times the number in each row gives the whole tray back.": "पंक्तियों को हर पंक्ति की संख्या से गुणा करो, तो पूरी थाली मिलती है।",
    "An exact division gives you both numbers as factors.": "पूरा भाग जाने पर दोनों संख्याएँ गुणनखंड बन जाती हैं।",
    "You learned: one exact division hands you both its factors.": "तुमने सीखा: एक पूरा भाग दोनों गुणनखंड दे देता है।",
    "27 shared into 3 rows: what other factor does this one division hand you?": "27 को 3 पंक्तियों में बाँटा: इस भाग से और कौन-सा गुणनखंड मिलता है?",
    "The other factor?": "दूसरा गुणनखंड?",
    "How many counters sit in each row?": "हर पंक्ति में कितनी गोटियाँ हैं?",
    "One division gave the factors 3 and 9.": "एक भाग से गुणनखंड 3 और 9 मिले।",
    "Factors 3 and 9": "गुणनखंड 3 और 9",
    "51 divided by 3 is 17: put the factors this division gives into the pen.": "51 को 3 से भाग देने पर 17 आता है: इस भाग से मिले गुणनखंड बाड़े में रखो।",
    "Factors in the pen": "बाड़े में गुणनखंड",
    "Name the number you divided by and the number you got.": "जिससे भाग दिया और जो मिला, वे दोनों संख्याएँ बताओ।",
    "Both 3 and 17 are factors of 51.": "3 और 17 दोनों 51 के गुणनखंड हैं।",
    "both are factors": "दोनों गुणनखंड हैं",
    "62 divided by 2 is 31: how many factors has 62 in all?": "62 को 2 से भाग देने पर 31 आता है: 62 के कुल कितने गुणनखंड हैं?",
    "How many factors of 62?": "62 के कितने गुणनखंड?",
    "Did both cards from rung 2 reach the pen?": "क्या पायदान 2 के दोनों कार्ड बाड़े में पहुँचे?",
    "The factors of 62 are 1, 2, 31 and 62.": "62 के गुणनखंड 1, 2, 31 और 62 हैं।",
    "4 factors in all": "कुल 4 गुणनखंड",
    /* phase 4 */
    "Knowing when to stop dividing": "भाग देना कब रोकना है, यह जानना",
    "Tap rung 5 and watch two cards go to the pen.": "पायदान 5 छुओ और दो कार्ड बाड़े में जाते देखो।",
    "Tap the next rung up.": "अगला ऊपर वाला पायदान छुओ।",
    "Now tap rung 6 and see where its cards land.": "अब पायदान 6 छुओ और देखो उसके कार्ड कहाँ जाते हैं।",
    "Tap the rung after the one you took.": "जो पायदान लिया, उसके बाद वाला छुओ।",
    "Is that number already standing in the pen?": "क्या वह संख्या पहले से बाड़े में खड़ी है?",
    "A pair that only repeats cards you already have adds nothing new.": "जो जोड़ा वही कार्ड दोहराए जो तुम्हारे पास हैं, वह कुछ नया नहीं जोड़ता।",
    "Stop when the answers repeat what is already in the pen.": "जब उत्तर वही दोहराने लगें जो बाड़े में है, तब रुक जाओ।",
    "You learned: stop when the answers start to repeat.": "तुमने सीखा: उत्तर दोहराने लगें, तब रुक जाओ।",
    "Climb the ladder for 45 and say at which rung the answers begin to repeat.": "45 के लिए सीढ़ी चढ़ो और बताओ किस पायदान पर उत्तर दोहराने लगते हैं।",
    "Rung where answers repeat?": "किस पायदान पर उत्तर दोहराते हैं?",
    "Which answer has just come out of the division?": "भाग से अभी कौन-सा उत्तर निकला है?",
    "At that rung the answer is already in the pen.": "उस पायदान पर उत्तर पहले से बाड़े में है।",
    "repeat at 9": "9 पर दोहराव",
    "Now the tray holds 76: at which rung do the answers start to repeat?": "अब थाली में 76 हैं: किस पायदान पर उत्तर दोहराने लगते हैं?",
    "Climb on and watch the repeat light.": "ऊपर चढ़ते रहो और दोहराव की बत्ती देखो।",
    "Rung 19 sends the card 4, which the pen already holds.": "पायदान 19 कार्ड 4 भेजता है, जो बाड़े में पहले से है।",
    "repeat at 19": "19 पर दोहराव",
    "A child says 100 has an odd number of factors: is that right?": "एक बच्चा कहता है कि 100 के गुणनखंडों की गिनती विषम है: क्या यह सही है?",
    "Odd number of factors?": "गुणनखंडों की गिनती विषम?",
    "What happens when the rows and the number in each row match?": "जब पंक्तियाँ और हर पंक्ति की संख्या बराबर हों, तब क्या होता है?",
    "Count the cards in the pen once the repeat light is on.": "दोहराव की बत्ती जलने पर बाड़े के कार्ड गिनो।",
    "10 times 10 makes 100, so rung 10 adds just one new card.": "10 गुना 10 है 100, इसलिए पायदान 10 सिर्फ़ एक नया कार्ड जोड़ता है।",
    "Yes, the run stops at 10 and the pen holds an odd number of cards.": "हाँ, गिनती 10 पर रुकती है और बाड़े में विषम कार्ड हैं।",
    "100 has 9 factors": "100 के 9 गुणनखंड",
    /* the working area's own words */
    "left over": "बचा हुआ", "over": "बचे", "try": "आज़माओ", "rows": "पंक्तियाँ", "in each": "हर पंक्ति में",
    "factor pen": "गुणनखंड बाड़ा", "repeat": "दोहराव", "Rung": "पायदान", "Card in each row": "हर पंक्ति वाला कार्ड", "Card for the rows": "पंक्तियों वाला कार्ड",
  },
  gu: {
    "Divide Ladder": "ભાગાકારની સીડી",
    "A tray of things up at the top, and a ladder of rungs under it.": "ઉપર થાળીમાં વસ્તુઓ છે, અને તેની નીચે પગથિયાંની સીડી છે.",
    "Every rung tried in order, every failure still showing, and the pen full.": "દરેક પગથિયું ક્રમથી અજમાવ્યું. દરેક નિષ્ફળ પ્રયત્ન હજી દેખાય છે, અને વાડો ભરેલો છે.",
    "Free play. Pick a number for the tray, then climb the ladder and watch the pen and the repeat light.": "મુક્ત રમત. થાળી માટે એક સંખ્યા પસંદ કરો, પછી સીડી ચડો અને વાડા તથા ફરી આવ્યાની બત્તીને જુઓ.",
    "Which rungs share the tray out with nothing left over?": "કયાં પગથિયાં પર થાળી વહેંચતાં કંઈ વધતું નથી?",
    /* phase 1 */
    "What makes a number a factor": "કોઈ સંખ્યા અવયવ ક્યારે બને છે",
    "Tap rung 3 to share the 12 into 3 equal rows.": "પગથિયું 3 અડો અને 12 ને 3 સરખી હારમાં વહેંચો.",
    "Tap the lower rung.": "નીચેનું પગથિયું અડો.",
    "Now tap rung 5: a factor divides exactly, with nothing left over.": "હવે પગથિયું 5 અડો: અવયવથી પૂરો ભાગ જાય છે અને કંઈ વધતું નથી.",
    "Tap the rung that is still plain.": "જે પગથિયું હજી સાદું છે તે અડો.",
    "Is anything left over after this rung?": "આ પગથિયા પછી શું કંઈ વધ્યું?",
    "Count what is left over once the rows are full.": "હાર ભરાયા પછી જે વધ્યું છે તે ગણો.",
    "A factor divides a number exactly, with nothing left over.": "અવયવથી સંખ્યા પૂરી ભાગાય છે, કંઈ વધતું નથી.",
    "You learned: a factor divides a number exactly, with nothing left over.": "તમે શીખ્યા: અવયવથી સંખ્યા પૂરી ભાગાય છે, કંઈ વધતું નથી.",
    "Which of the two rungs is a factor of 20?": "બેમાંથી કયું પગથિયું 20 નો અવયવ છે?",
    "Which is a factor of 20?": "20 નો અવયવ કયો છે?",
    "Which rung shares every counter out, with nothing left over?": "કયું પગથિયું દરેક ગોટી વહેંચી દે છે અને કંઈ વધતું નથી?",
    "Rung 4 shares 20 out with nothing left over.": "પગથિયું 4 પર 20 વહેંચાય છે અને કંઈ વધતું નથી.",
    "Is 8 a factor of 68?": "શું 8 એ 68 નો અવયવ છે?",
    "After 8 rows, how many are left over?": "8 હાર પછી કેટલા વધ્યા?",
    "Some are left over, so 8 is not a factor of 68.": "કેટલાક વધ્યા, તેથી 8 એ 68 નો અવયવ નથી.",
    "Now the tray holds 78: is 6 a factor of it?": "હવે થાળીમાં 78 છે: શું 6 તેનો અવયવ છે?",
    "Is 6 a factor of 78?": "શું 6 એ 78 નો અવયવ છે?",
    "Did every one of the 78 find a place in a row?": "શું 78 માંથી દરેકને કોઈ હારમાં જગ્યા મળી?",
    "Nothing is left over, so 6 is a factor of 78.": "કંઈ વધ્યું નહીં, તેથી 6 એ 78 નો અવયવ છે.",
    "yes": "હા", "no": "ના",
    "4 is a factor": "4 અવયવ છે", "not a factor": "અવયવ નથી", "6 is a factor": "6 અવયવ છે",
    /* phase 2 */
    "Working up through the numbers in order": "સંખ્યાઓમાં ક્રમથી ઉપર ચડવું",
    "Try to jump: tap rung 4 now.": "કૂદીને જુઓ: હમણાં પગથિયું 4 અડો.",
    "Tap rung 4, high up the ladder.": "પગથિયું 4 અડો, જે સીડીમાં ઉપર છે.",
    "The ladder lit the rung you must take: tap it.": "સીડીએ જે પગથિયું ચમકાવ્યું છે તે લેવાનું છે: તેને અડો.",
    "Tap the rung with the glow.": "ચમકતું પગથિયું અડો.",
    "Now tap the next rung up.": "હવે પછીનું ઉપરનું પગથિયું અડો.",
    "Tap the rung just above the first.": "પહેલાની ઠીક ઉપરનું પગથિયું અડો.",
    "Can you be sure about a number you never tried?": "જે સંખ્યા અજમાવી જ નથી, તેના વિશે પાકું કેમ કહેશો?",
    "Climb from the first rung, skip none, and note what is left over.": "પહેલા પગથિયાથી ચડો, કોઈ ન છોડો, અને જુઓ કેટલું વધે છે.",
    "Try every whole number from one, and keep the ones that fail.": "એકથી દરેક સંખ્યા અજમાવો, અને જે ન ભાગાય તેને પણ રાખો.",
    "You learned: try every number in order and keep the failures.": "તમે શીખ્યા: દરેક સંખ્યા ક્રમથી અજમાવો અને નિષ્ફળને પણ રાખો.",
    "Climb the ladder for 40 and name the first rung that fails.": "40 માટે સીડી ચડો અને પહેલું નિષ્ફળ પગથિયું કહો.",
    "First rung that fails?": "પહેલું નિષ્ફળ પગથિયું?",
    "Look down the ladder: which is the first rung with something left over?": "સીડીમાં જુઓ: કયું પહેલું પગથિયું છે જેમાં કંઈ વધે છે?",
    "Rung 3 is the first to leave something over.": "પગથિયું 3 પર સૌથી પહેલાં કંઈ વધે છે.",
    "Find every factor of 92 by climbing, then press Enter.": "ચડીને 92 ના બધા અવયવ શોધો, પછી ‘દાખલ કરો’ દબાવો.",
    "Every factor of 92": "92 ના બધા અવયવ",
    "Is any rung on the ladder still blank?": "શું સીડીનું કોઈ પગથિયું હજી ખાલી છે?",
    "The pen holds every factor of 92.": "વાડામાં 92 ના બધા અવયવ છે.",
    "The repeat light is on, so the list is finished.": "ફરી આવ્યાની બત્તી ચાલુ છે, તેથી યાદી પૂરી થઈ ગઈ.",
    "Two rungs were skipped for 70: is either one a factor?": "70 માટે બે પગથિયાં છૂટી ગયાં: શું તેમાંથી કોઈ અવયવ છે?",
    "Is a skipped rung a factor?": "શું છૂટેલું પગથિયું અવયવ છે?",
    "What did each skipped rung leave over?": "દરેક છૂટેલા પગથિયા પર શું વધ્યું?",
    "Both skipped rungs leave something over, so neither is a factor.": "બંને છૂટેલાં પગથિયાં પર કંઈ વધે છે, તેથી કોઈ અવયવ નથી.",
    "3 only": "ફક્ત 3", "4 only": "ફક્ત 4", "both": "બંને", "neither": "કોઈ નહીં",
    "3 fails first": "3 સૌથી પહેલાં નિષ્ફળ", "every factor of 92": "92 ના બધા અવયવ", "neither is a factor": "બેમાંથી એક પણ અવયવ નથી",
    /* phase 3 */
    "Every exact division hands you two": "શેષ વગરનો દરેક ભાગાકાર તમને બે આપે છે",
    "A rung came out: tap its card to send it to the pen.": "એક પગથિયું પૂરું વહેંચાયું: તેનું કાર્ડ અડીને વાડામાં મોકલો.",
    "Tap the card marked rows.": "જેના પર હાર લખ્યું છે તે કાર્ડ અડો.",
    "The same division left a second card: tap it too.": "એ જ ભાગાકારથી બીજું કાર્ડ પણ મળ્યું: તેને પણ અડો.",
    "Tap the card marked in each.": "જેના પર દરેક હારમાં લખ્યું છે તે કાર્ડ અડો.",
    "When a division works, its answer is a factor too.": "જ્યારે ભાગાકાર પૂરો ભાગાય, ત્યારે તેનો જવાબ પણ અવયવ છે.",
    "Rows times the number in each row gives the whole tray back.": "હારને દરેક હારની સંખ્યા વડે ગુણો, તો આખી થાળી પાછી મળે છે.",
    "An exact division gives you both numbers as factors.": "પૂરો ભાગાકાર થાય, ત્યારે બંને સંખ્યાઓ અવયવ બને છે.",
    "You learned: one exact division hands you both its factors.": "તમે શીખ્યા: એક પૂરો ભાગાકાર બંને અવયવ આપે છે.",
    "27 shared into 3 rows: what other factor does this one division hand you?": "27 ને 3 હારમાં વહેંચ્યા: આ ભાગાકારથી બીજો કયો અવયવ મળે છે?",
    "The other factor?": "બીજો અવયવ?",
    "How many counters sit in each row?": "દરેક હારમાં કેટલી ગોટીઓ છે?",
    "One division gave the factors 3 and 9.": "એક ભાગાકારથી અવયવ 3 અને 9 મળ્યા.",
    "Factors 3 and 9": "અવયવ 3 અને 9",
    "51 divided by 3 is 17: put the factors this division gives into the pen.": "51 ને 3 વડે ભાગતાં 17 આવે છે: આ ભાગાકારથી મળેલા અવયવ વાડામાં મૂકો.",
    "Factors in the pen": "વાડામાં અવયવ",
    "Name the number you divided by and the number you got.": "જેનાથી ભાગ્યું અને જે મળ્યું, તે બંને સંખ્યા કહો.",
    "Both 3 and 17 are factors of 51.": "3 અને 17 બંને 51 ના અવયવ છે.",
    "both are factors": "બંને અવયવ છે",
    "62 divided by 2 is 31: how many factors has 62 in all?": "62 ને 2 વડે ભાગતાં 31 આવે છે: 62 ના કુલ કેટલા અવયવ છે?",
    "How many factors of 62?": "62 ના કેટલા અવયવ?",
    "Did both cards from rung 2 reach the pen?": "શું પગથિયા 2 નાં બંને કાર્ડ વાડામાં પહોંચ્યાં?",
    "The factors of 62 are 1, 2, 31 and 62.": "62 ના અવયવ 1, 2, 31 અને 62 છે.",
    "4 factors in all": "કુલ 4 અવયવ",
    /* phase 4 */
    "Knowing when to stop dividing": "ભાગાકાર ક્યારે અટકાવવો, તે જાણવું",
    "Tap rung 5 and watch two cards go to the pen.": "પગથિયું 5 અડો અને બે કાર્ડ વાડામાં જતાં જુઓ.",
    "Tap the next rung up.": "પછીનું ઉપરનું પગથિયું અડો.",
    "Now tap rung 6 and see where its cards land.": "હવે પગથિયું 6 અડો અને જુઓ તેનાં કાર્ડ ક્યાં જાય છે.",
    "Tap the rung after the one you took.": "જે પગથિયું લીધું તેના પછીનું અડો.",
    "Is that number already standing in the pen?": "શું એ સંખ્યા પહેલેથી વાડામાં ઊભી છે?",
    "A pair that only repeats cards you already have adds nothing new.": "જે જોડ તમારી પાસે છે તે જ કાર્ડ ફરી લાવે, તે કંઈ નવું ઉમેરતી નથી.",
    "Stop when the answers repeat what is already in the pen.": "જવાબો વાડામાં પહેલેથી છે તે જ ફરી આવવા લાગે, ત્યારે અટકો.",
    "You learned: stop when the answers start to repeat.": "તમે શીખ્યા: જવાબો ફરી આવવા લાગે, ત્યારે અટકો.",
    "Climb the ladder for 45 and say at which rung the answers begin to repeat.": "45 માટે સીડી ચડો અને કહો કયા પગથિયે જવાબો ફરી આવવા લાગે છે.",
    "Rung where answers repeat?": "કયા પગથિયે જવાબ ફરી આવે?",
    "Which answer has just come out of the division?": "ભાગાકારમાંથી હમણાં કયો જવાબ નીકળ્યો છે?",
    "At that rung the answer is already in the pen.": "એ પગથિયે જવાબ પહેલેથી વાડામાં છે.",
    "repeat at 9": "9 પર ફરી આવ્યું",
    "Now the tray holds 76: at which rung do the answers start to repeat?": "હવે થાળીમાં 76 છે: કયા પગથિયે જવાબો ફરી આવવા લાગે છે?",
    "Climb on and watch the repeat light.": "ઉપર ચડતા રહો અને ફરી આવ્યાની બત્તી જુઓ.",
    "Rung 19 sends the card 4, which the pen already holds.": "પગથિયું 19 કાર્ડ 4 મોકલે છે, જે વાડામાં પહેલેથી છે.",
    "repeat at 19": "19 પર ફરી આવ્યું",
    "A child says 100 has an odd number of factors: is that right?": "એક બાળક કહે છે કે 100 ના અવયવોની સંખ્યા એકી છે: શું તે સાચું છે?",
    "Odd number of factors?": "અવયવોની સંખ્યા એકી?",
    "What happens when the rows and the number in each row match?": "જ્યારે હાર અને દરેક હારની સંખ્યા સરખી થાય, ત્યારે શું થાય છે?",
    "Count the cards in the pen once the repeat light is on.": "ફરી આવ્યાની બત્તી ચાલુ થાય ત્યારે વાડાનાં કાર્ડ ગણો.",
    "10 times 10 makes 100, so rung 10 adds just one new card.": "10 ગુણ્યા 10 એટલે 100, તેથી પગથિયું 10 ફક્ત એક નવું કાર્ડ ઉમેરે છે.",
    "Yes, the run stops at 10 and the pen holds an odd number of cards.": "હા, ગણતરી 10 પર અટકે છે અને વાડામાં એકી સંખ્યામાં કાર્ડ છે.",
    "100 has 9 factors": "100 ના 9 અવયવ",
    /* the working area's own words */
    "left over": "વધેલું", "over": "વધ્યા", "try": "અજમાવો", "rows": "હાર", "in each": "દરેક હારમાં",
    "factor pen": "અવયવ વાડો", "repeat": "ફરી", "Rung": "પગથિયું", "Card in each row": "દરેક હારનું કાર્ડ", "Card for the rows": "હારનું કાર્ડ",
  },
};

const YES_NO = [{ id: "yes", label: "yes" }, { id: "no", label: "no" }];
const SKIP_CHOICES = [{ id: "3 only", label: "3 only" }, { id: "4 only", label: "4 only" }, { id: "both", label: "both" }, { id: "neither", label: "neither" }];

/* One entry per phase = one mount.
   cards   what an exact rung does with its two numbers: "none" (phase 1 has no pen), "auto" (they fly into the pen),
           "wait" (they wait on the board for the child to carry them); lamp = the repeat light
   warm    the guide steps' own practice board (a number that is none of the phase's answers), so question 1 opens fresh
   items   three a phase. kind: pick (the offered rung that is a factor) · judge (yes or no) · first (the first rung that
           fails) · list (climb, fill the pen, Enter) · skip (were the skipped rungs factors) · new (how many factors one
           division gives) · pair (carry both cards, Enter) · count (how many factors in all) · repeat (the rung where the
           answers begin to repeat).
           n = the tray; offer = the rungs offered, else top = the ladder's height; done = rungs tried when it opens;
           waitRung = the rung whose cards wait; rowCard = only its own card waits; stop = where a count's climb ends;
           near = the misconception; verdict + tone = the label that ends the correction (never shown before a first answer);
           win = the one-sentence win line */
const PHASES = [
  {
    n: 1,
    concept: "What makes a number a factor",
    conceptId: "M1.S1.T2.C5", objectiveIds: ["O1"],
    cards: "none", lamp: false,
    warm: { n: 12, offer: [3, 5] },
    steps: [
      { say: "Tap rung 3 to share the 12 into 3 equal rows.", on: "rung-3", hint: "Tap the lower rung." },
      { say: "Now tap rung 5: a factor divides exactly, with nothing left over.", on: "rung-5", hint: "Tap the rung that is still plain." },
    ],
    ladder: ["Is anything left over after this rung?", "Count what is left over once the rows are full."],
    closing: "A factor divides a number exactly, with nothing left over.",
    learned: "You learned: a factor divides a number exactly, with nothing left over.",
    traceback: "The tray is shared again at walking pace on each rung; what will not fit goes to the left over place and stays, the rows are counted, and the rung with nothing left over is named.",
    items: [
      /* learn ML1: answer in the plan = 4 is a factor of 20 and 6 is not */
      { qid: "M1.S1.T2.C5:ML1", kind: "pick", n: 20, offer: [4, 6], answer: 4, near: 6, verdict: "4 is a factor", tone: "blue", winMs: 2400,
        say: "Which of the two rungs is a factor of 20?", ask: "Which is a factor of 20?",
        miss: "Which rung shares every counter out, with nothing left over?", win: "Rung 4 shares 20 out with nothing left over." },
      /* practice 1: answer in the plan = No, because 68 divided by 8 is 8 with 4 left over */
      { qid: "M1.S1.T2.C5:1", kind: "judge", n: 68, offer: [8], answer: "no", near: "yes", choices: YES_NO, verdict: "not a factor", tone: "verm", winMs: 2400,
        say: "Is 8 a factor of 68?", ask: "Is 8 a factor of 68?",
        miss: "After 8 rows, how many are left over?", win: "Some are left over, so 8 is not a factor of 68." },
      /* practice 2: answer in the plan = Yes, because 78 divided by 6 is 13 with nothing over */
      { qid: "M1.S1.T2.C5:2", kind: "judge", n: 78, offer: [6], answer: "yes", near: "no", choices: YES_NO, verdict: "6 is a factor", tone: "blue", winMs: 2400,
        say: "Now the tray holds 78: is 6 a factor of it?", ask: "Is 6 a factor of 78?",
        miss: "Did every one of the 78 find a place in a row?", win: "Nothing is left over, so 6 is a factor of 78." },
    ],
  },
  {
    n: 2,
    concept: "Working up through the numbers in order",
    conceptId: "M1.S1.T2.C6", objectiveIds: ["O1","O2"],
    cards: "auto", lamp: false,
    warm: { n: 12, top: 6 },
    steps: [
      { say: "Try to jump: tap rung 4 now.", on: "rung-4", hint: "Tap rung 4, high up the ladder." },
      { say: "The ladder lit the rung you must take: tap it.", on: "rung-1", hint: "Tap the rung with the glow." },
      { say: "Now tap the next rung up.", on: "rung-2", hint: "Tap the rung just above the first." },
    ],
    ladder: ["Can you be sure about a number you never tried?", "Climb from the first rung, skip none, and note what is left over."],
    closing: "Try every whole number from one, and keep the ones that fail.",
    learned: "You learned: try every number in order and keep the failures.",
    traceback: "The ladder climbs itself from the lowest blank rung, each try keeping its rows or its remainder, and the rung the question asks about is named.",
    items: [
      /* learn ML2: answer in the plan = 1, 2, 4, 5, 8, 10, 20 and 40, and the first division that fails is 3 */
      { qid: "M1.S1.T2.C6:ML2", kind: "first", n: 40, top: 6, answer: 3, near: 6, verdict: "3 fails first", tone: "verm", winMs: 2400,
        say: "Climb the ladder for 40 and name the first rung that fails.", ask: "First rung that fails?",
        miss: "Look down the ladder: which is the first rung with something left over?", win: "Rung 3 is the first to leave something over." },
      /* practice 4: answer in the plan = 1, 2, 4, 23, 46 and 92 (the child climbs; the pen is the answer) */
      { qid: "M1.S1.T2.C6:4", kind: "list", n: 92, top: 9, answer: [1, 2, 4, 23, 46, 92], near: "1,2,46,92", pad: "enter", verdict: "every factor of 92", tone: "blue", winMs: 2600,
        say: "Find every factor of 92 by climbing, then press Enter.", ask: "Every factor of 92",
        miss: "Is any rung on the ladder still blank?", win: "The pen holds every factor of 92." },
      /* practice 5: answer in the plan = 3 and 4 were skipped; 70 divided by 3 leaves 1 over and by 4 leaves 2 over, so neither is a factor */
      { qid: "M1.S1.T2.C6:5", kind: "skip", n: 70, top: 5, done: [1, 2, 5], answer: "neither", near: "both", choices: SKIP_CHOICES, verdict: "neither is a factor", tone: "verm", winMs: 2600,
        say: "Two rungs were skipped for 70: is either one a factor?", ask: "Is a skipped rung a factor?",
        miss: "What did each skipped rung leave over?", win: "Both skipped rungs leave something over, so neither is a factor." },
    ],
  },
  {
    n: 3,
    concept: "Every exact division hands you two",
    conceptId: "M1.S1.T2.C7", objectiveIds: ["O2"],
    cards: "wait", lamp: false,
    warm: { n: 35, offer: [5], done: [5], waitRung: 5 },
    steps: [
      { say: "A rung came out: tap its card to send it to the pen.", on: "card-a", hint: "Tap the card marked rows." },
      { say: "The same division left a second card: tap it too.", on: "card-b", hint: "Tap the card marked in each." },
    ],
    ladder: ["When a division works, its answer is a factor too.", "Rows times the number in each row gives the whole tray back."],
    closing: "An exact division gives you both numbers as factors.",
    learned: "You learned: one exact division hands you both its factors.",
    traceback: "The cards still waiting travel into the pen one at a time, the rest of the ladder is climbed, and the pen is counted card by card.",
    items: [
      /* learn ML3: answer in the plan = Two of them, 3 and 9 (the question asks for the PARTNER factor, read off a row, so the count is never on screen first; only the rung's own card waits) */
      { qid: "M1.S1.T2.C7:ML3", kind: "new", n: 27, offer: [3], done: [3], waitRung: 3, rowCard: true, answer: 9, near: 3, verdict: "Factors 3 and 9", tone: "blue", winMs: 2600,
        say: "27 shared into 3 rows: what other factor does this one division hand you?", ask: "The other factor?",
        miss: "How many counters sit in each row?", win: "One division gave the factors 3 and 9." },
      /* practice 3: answer in the plan = 3 and 17 (both cards into the pen; Enter sends it) */
      { qid: "M1.S1.T2.C7:3", kind: "pair", n: 51, offer: [3], done: [3], waitRung: 3, answer: [3, 17], near: "3", pad: "enter", verdict: "both are factors", tone: "blue", winMs: 2600,
        say: "51 divided by 3 is 17: put the factors this division gives into the pen.", ask: "Factors in the pen",
        miss: "Name the number you divided by and the number you got.", win: "Both 3 and 17 are factors of 51." },
      /* practice 6: answer in the plan = 2 and 31, and 62 has four factors: 1, 2, 31 and 62 (the checked answer is the count) */
      { qid: "M1.S1.T2.C7:6", kind: "count", n: 62, top: 7, done: [2], waitRung: 2, answer: 4, near: 3, verdict: "4 factors in all", tone: "ink", winMs: 2800,
        say: "62 divided by 2 is 31: how many factors has 62 in all?", ask: "How many factors of 62?",
        miss: "Did both cards from rung 2 reach the pen?", win: "The factors of 62 are 1, 2, 31 and 62." },
    ],
  },
  {
    n: 4,
    concept: "Knowing when to stop dividing",
    conceptId: "M1.S1.T2.C8", objectiveIds: ["O1","O2"],
    cards: "auto", lamp: true,
    warm: { n: 30, top: 8, done: [1, 2, 3, 4] },
    steps: [
      { say: "Tap rung 5 and watch two cards go to the pen.", on: "rung-5", hint: "Tap the next rung up." },
      { say: "Now tap rung 6 and see where its cards land.", on: "rung-6", hint: "Tap the rung after the one you took." },
    ],
    ladder: ["Is that number already standing in the pen?", "A pair that only repeats cards you already have adds nothing new."],
    closing: "Stop when the answers repeat what is already in the pen.",
    learned: "You learned: stop when the answers start to repeat.",
    traceback: "The ladder climbs on rung by rung until a card lands on its twin in the pen; the repeat light comes on and the pen is read as finished.",
    items: [
      /* learn ML4: answer in the plan = At 9, because its answer 5 is already in the pen, and the factors are 1, 3, 5, 9, 15 and 45 */
      { qid: "M1.S1.T2.C8:ML4", kind: "repeat", n: 45, top: 24, done: [1, 2, 3], answer: 9, near: 45, verdict: "repeat at 9", tone: "rose", winMs: 2800,
        say: "Climb the ladder for 45 and say at which rung the answers begin to repeat.", ask: "Rung where answers repeat?",
        miss: "Which answer has just come out of the division?", win: "At that rung the answer is already in the pen." },
      /* practice 7: answer in the plan = 1, 2, 4, 19, 38 and 76, and they begin to repeat at 19, whose answer 4 is already on the list */
      { qid: "M1.S1.T2.C8:7", kind: "repeat", n: 76, top: 24, done: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14], answer: 19, near: 76, verdict: "repeat at 19", tone: "rose", winMs: 3200,
        say: "Now the tray holds 76: at which rung do the answers start to repeat?", ask: "Rung where answers repeat?",
        miss: "Climb on and watch the repeat light.", win: "Rung 19 sends the card 4, which the pen already holds." },
      /* practice 8: answer in the plan = Yes. 100 has nine factors, 1, 2, 4, 5, 10, 20, 25, 50 and 100, and the run stops at 10 because 10 tens make 100 (the why is in the miss and the question's own ladder) */
      { qid: "M1.S1.T2.C8:8", kind: "odd", n: 100, top: 24, done: [1, 2, 3, 4], stop: 10, answer: "yes", near: "no", choices: YES_NO, verdict: "100 has 9 factors", tone: "ink", winMs: 3000,
        say: "A child says 100 has an odd number of factors: is that right?", ask: "Odd number of factors?",
        miss: "What happens when the rows and the number in each row match?",
        ladder: ["Count the cards in the pen once the repeat light is on.", "10 times 10 makes 100, so rung 10 adds just one new card."],
        win: "Yes, the run stops at 10 and the pen holds an odd number of cards." },
    ],
  },
];

/* The numbers, rows, sizes and targets the working area needs (they go into the sidecar too). */
const MODEL = {
  ladder: { rungsInView: 6, numberedFrom: 1, record: "each tried rung keeps its leftover, 0 over lit blue", noSkipping: "a rung above the lowest untried one is refused and the untried rung is lit" },
  tray: "the number as counters, tens tied into rods", pen: { order: "ascending", twins: "a repeat lands on its twin and the repeat light comes on" },
  colours: { factor: CONTENT.hundred, tray: CONTENT.ten, leftover: CONTENT.pointer, repeat: CONTENT.bead },
};

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

const dlNums = (v: any): number[] => (Array.isArray(v) ? v.map(Number) : (String(v ?? "").match(/\d+/g) || []).map(Number));

/* judge: a list is judged in any order; numbers compare as numbers; words as words */
const judge = (item: any, v: any) => {
  if (item.parts) return judgeSlotParts(item, v);
  if (Array.isArray(item.answer)) {
    const got = Array.from(new Set(dlNums(v))).sort((a, b) => a - b), want = item.answer.slice().sort((a: number, b: number) => a - b);
    return got.length === want.length && got.every((x, i) => x === want[i]);
  }
  if (typeof item.answer === "number") return leadNumber(v) === item.answer;
  return String(v).trim().toLowerCase() === String(item.answer).trim().toLowerCase();
};
/* oracle: every answer re-derived by multiplying (k × d = n), sharing no code with judge or the sharing picture */
const oracle = () => PHASES.every((p: any) => p.items.every((it: any) => {
  const n = it.n;
  const partner = (d: number) => { for (let k = 1; k * d <= n; k++) if (k * d === n) return k; return 0; };
  const all: number[] = [];
  for (let d = 1; d <= n; d++) if (partner(d)) all.push(d);
  const same = (a: number[], b: number[]) => a.length === b.length && a.slice().sort((x, y) => x - y).every((x, i) => x === b.slice().sort((x2, y2) => x2 - y2)[i]);
  if (it.kind === "pick") return it.offer.filter((d: number) => partner(d)).length === 1 && it.offer.includes(it.answer) && partner(it.answer) > 0;
  if (it.kind === "judge") return (partner(it.offer[0]) ? "yes" : "no") === it.answer;
  if (it.kind === "first") { let d = 1; while (partner(d)) d++; return d === it.answer; }
  if (it.kind === "list") return same(it.answer, all);
  if (it.kind === "skip") {
    const skipped: number[] = [];
    for (let d = 1; d <= it.top; d++) if (!it.done.includes(d)) skipped.push(d);
    const f = skipped.filter((d) => partner(d));
    return it.answer === (f.length === 0 ? "neither" : f.length === skipped.length ? "both" : f[0] + " only");
  }
  if (it.kind === "new") { const d = it.waitRung, k = partner(d); return k > 0 && it.answer === k; }
  if (it.kind === "pair") { const d = it.waitRung, k = partner(d); return k > 0 && same(it.answer, [d, k]); }
  if (it.kind === "count") return it.answer === all.length;
  if (it.kind === "odd") return (all.length % 2 === 1 ? "yes" : "no") === it.answer;
  if (it.kind === "repeat") { let d = 1; while (d <= n && !(partner(d) && partner(d) <= d)) d++; return d === it.answer; }
  return false;
}));
/* the most likely wrong answer (the misconception); judge must reject it */
const nearMiss = (item: any) => item.near;
/* the forms of an answer that no question, hint or ladder line may print. A pair's numbers ARE its question
   ("51 divided by 3 is 17"); a list keeps its inner members out of the lines */
const answerForms = (item: any) => {
  if (item.kind === "pair") return [];
  if (Array.isArray(item.answer)) return item.answer.filter((x: number) => x !== 1 && x !== item.n && x >= 10).flatMap((x: number) => [String(x), words(x)]);
  if (typeof item.answer === "number") return [String(item.answer), indian(item.answer), words(item.answer)];
  return [String(item.answer)];
};
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => (Array.isArray(item.answer) ? item.answer.join(",") : item.answer);

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => {
  if (T.state().stage === "demo") return HOOK.demo && HOOK.demo();
  if (item.pad === "enter") { if (HOOK.set) HOOK.set(agentKey(item)); setTimeout(() => HOOK.enter && HOOK.enter(), 40); return; }
  return T.submit(item.answer);
};
/* the agent's answer() for an item made on the working area: set it as a child would; undefined = type it */
const answer = (item: any, v: any) => (item.pad === "enter" && HOOK.set ? HOOK.set(v) : undefined);
/* the agent's check() before Enter: in a guide step it must return undefined so the agent reaches api.onEnter */
const check = () => undefined;

/* ── the working area's pieces ─────────────────────────────────────────────────────────── */

const DL_BLUE = CONTENT.hundred;   /* a number that divides exactly: a lit rung, a factor card */
const DL_AMBER = CONTENT.ten;      /* the number in hand: the tray's counters */
const DL_VERM = CONTENT.pointer;   /* what is left over, and a trial that fails */
const DL_ROSE = CONTENT.bead;      /* a number standing twice: the repeat */
const DL_INK: Record<string, string> = { blue: shade(DL_BLUE, 0.25), verm: shade(DL_VERM, 0.25), rose: shade(DL_ROSE, 0.25) };
const DL_WOOD = "#A08C70";
/* the frame colours follow the keypad THEME (the apple's olive family): the panel and its hairline, the ladder's rails and rung edges, the
   pen walls, and the attention ring (the theme's Enter berry, the colour the Invite ring already wears). With no theme: the chrome's own tan. */
const dlFrame = (C: any) => {
  const T: any = THEME;
  if (!T || !T.panel || !T.key || !T.enter) return { C, wood: DL_WOOD, pan: "url(#gPanel)" };
  return { C: { ...C, panel: T.panel[1], rule: mix(T.panel[1], T.key[1], 0.45), accent: T.enter[1] }, wood: T.slot || T.key[1], pan: "url(#gTpanel)" };
};
const DL_CSS = `
.dl-move{transition:transform 400ms cubic-bezier(.3,.7,.25,1)}
.dl-slide{transition:transform 320ms ease}
@media (prefers-reduced-motion:reduce){.dl-move,.dl-slide{transition:none}}
`;
const DL_FREE_PH = { cards: "auto", lamp: true };
const DL_FREE_IT = { n: 36, top: 24 };
/* free play's lines, built at run time, so each carries its own Hindi and Gujarati: the instruction again (after a plain number), a number
   below 2, a number past 100, and a number stepped down so that the repeat light can come on */
const DL_SAY: any = {
  pick: { en: "Pick a number for the tray, then climb the ladder and watch the pen and the repeat light.", hi: "थाली के लिए एक संख्या चुनो, फिर सीढ़ी चढ़ो और बाड़े व दोहराव की बत्ती को देखो।", gu: "થાળી માટે એક સંખ્યા પસંદ કરો, પછી સીડી ચડો અને વાડા તથા ફરી આવ્યાની બત્તીને જુઓ." },
  none: { en: "The tray needs a number from 2 to 100.", hi: "थाली के लिए 2 से 100 तक की संख्या चाहिए।", gu: "થાળી માટે 2 થી 100 સુધીની સંખ્યા જોઈએ." },
  big: { en: "The tray holds at most 100, so it holds 100.", hi: "थाली में ज़्यादा से ज़्यादा 100 आते हैं, इसलिए उसमें 100 हैं।", gu: "થાળીમાં વધુમાં વધુ 100 આવે, તેથી તેમાં 100 છે." },
  down: (m: number) => ({ en: "The ladder reaches rung 24, so the tray holds " + m + ".", hi: "सीढ़ी 24 पायदान तक जाती है, इसलिए थाली में " + m + " हैं।", gu: "સીડી 24 પગથિયાં સુધી જાય છે, તેથી થાળીમાં " + m + " છે." }),
};

/* how a tray of n shares into d rows: q in each row and r left over (the picture's own route) */
const dlShare = (n: number, d: number) => { const q = Math.floor(n / d); return { q, r: n - q * d }; };
/* a line of c counters drawn as tens rods and loose ones, measured in counter widths */
const dlUnits = (c: number) => Math.floor(c / 10) * 10.5 + (c % 10);
const dlRange = (a: number, b: number) => { const out: number[] = []; for (let k = a; k <= b; k++) out.push(k); return out; };
/* the rung where a number's answers begin to repeat: the first divisor whose partner is not above it */
const dlRepeatAt = (v: number) => { for (let d = 1; d <= v; d++) if (v % d === 0 && v / d <= d) return d; return v; };
/* cards land in the pen in order; a number already there takes a twin (and, where there is a lamp, lights it) */
const dlLand = (pen: any[], vs: number[], lamp: boolean) => {
  let out = pen, rep = false;
  vs.forEach((v) => {
    const i = out.findIndex((c: any) => c.v === v);
    if (i >= 0) { out = out.map((c: any, j: number) => (j === i ? { ...c, tw: c.tw + 1 } : c)); if (lamp) rep = true; }
    else out = [...out, { v, tw: 0 }].sort((a: any, b: any) => a.v - b.v);
  });
  return { pen: out, rep };
};

/* the state an item opens on: its tray, the rungs already tried, the pen they filled, the cards that wait */
const dlInit = (ph: any, it: any) => {
  const n = it.n || 36, offer = it.offer || null;
  const top = offer ? null : Math.min(it.top || 24, n);
  const cards = ph.cards || "none", done = it.done || [], tried: any = {};
  done.forEach((k: number) => { tried[k] = dlShare(n, k); });
  let pen: any[] = [];
  if (cards !== "none") done.forEach((k: number) => { if (tried[k].r === 0 && k !== it.waitRung) pen = dlLand(pen, [k, tried[k].q], false).pen; });
  const wr = it.waitRung || null;
  const waiting = wr ? (it.rowCard ? [{ v: wr, role: 0 }] : [{ v: wr, role: 0 }, { v: n / wr, role: 1 }]) : [];
  const shown = wr || null;
  return { n, offer, top, mode: offer ? "offer" : "run", cards, lamp: !!ph.lamp, waitRung: wr, tried, pen, waiting, shown,
    dealt: shown ? shown : 0, shelf: !!shown, fly: [], ghost: [], gtried: {}, refused: null, verdict: null, tone: "ink", repeatOn: false,
    hlRow: null, hlShelf: false, carrying: null, touched: false, draft: null };
};
/* the lowest rung not tried yet (on an offered ladder, the lowest offered one) */
const dlNext = (st: any) => {
  if (st.mode === "offer") { const ks = st.offer.slice().sort((a: number, b: number) => a - b); const k = ks.find((x: number) => !st.tried[x]); return k === undefined ? null : k; }
  for (let k = 1; k <= st.top; k++) if (!st.tried[k]) return k;
  return null;
};

/* the room: board column, tray, rows, shelf and pen, from the working area's own box (never a constant width) */
const dlGeo = (box: any, hasPen: boolean, hasWait: boolean) => {
  const w = box ? box.w : 900, H = box ? box.h : 520;
  const kx = box && box.key ? box.key.x - 12 : w;
  const bx0 = 282, bx1 = Math.min(w - 8, 1120, kx);
  const ry0 = 72, ry1 = hasPen ? 296 : 372;
  /* the shelf stands 10 under the rows, and 12 or more units of air stand between it and the factor pen's caption (a Devanagari hook rises 9 above the line) */
  return { w, H, bx0, bx1, rowsX1: hasWait ? bx1 - 190 : bx1, ry0, ry1, sy0: ry1 + 10, shh: 56, py0: H - 104, ph: 96 };
};
/* where each rung stands. A tried rung is a compact plate (a record, never a control, never cleared) and an untried rung a full finger-sized plate; the stack
   starts at rung 1 and goes up while it fits, so every failure stays in view. Only a long run (past ten tried rungs) folds its oldest rungs into one chip. */
const DL_CP = 40, DL_LP = 80, DL_BUD = 508;
const dlLadder = (S: any, H: number) => {
  const yc = (i: number) => H - 46 - i * 80;
  if (S.mode === "offer") {
    const ks = S.offer.slice().sort((a: number, b: number) => a - b);
    const idx = ks.length === 1 ? [1] : ks.map((_: any, j: number) => 1 + j * 2);
    return { ks, y: (k: number) => yc(idx[ks.indexOf(k)]), compact: (_k: number) => false, fold: null as any, railTop: yc(idx[idx.length - 1]) - 58 };
  }
  const nx = dlNext(S);
  /* a tried rung is a compact record; so is a rung only the correction's ghost climb tried, except the next rung the child must really take, which stays a full plate with its finger box */
  const isT = (k: number) => !!S.tried[k] || (!!S.gtried[k] && k !== nx);
  const hOf = (k: number) => (isT(k) ? DL_CP : DL_LP);
  const span = (from: number) => { let used = from > 1 ? DL_CP : 0, e = from - 1; while (e < S.top && used + hOf(e + 1) <= DL_BUD) { used += hOf(e + 1); e++; } return e; };
  let a = 1, b = 1;
  for (a = 1; a <= S.top; a++) { b = span(a); if (nx === null ? b === S.top : b >= nx) break; }
  if (a > S.top) { a = S.top; b = S.top; }
  const base = H - 6, pos: any = {}, ks: number[] = [];
  let yy = base - (a > 1 ? DL_CP : 0);
  for (let k = a; k <= b; k++) { const h = hOf(k); pos[k] = yy - h / 2; yy -= h; ks.push(k); }
  return { ks, y: (k: number) => pos[k], compact: isT, fold: a > 1 ? { to: a - 1, y: base - DL_CP / 2 } : (null as any), railTop: Math.max(6, yy - 6) };
};
/* the board's rows for rung d: more than ten rows stand in two or three blocks side by side, so every row stays countable */
const dlRows = (S: any, d: number, G: any) => {
  const cols = d > 10 ? Math.ceil(d / 10) : 1, per = Math.ceil(d / cols), gap = 14;
  const colW = (G.rowsX1 - G.bx0 - gap * (cols - 1)) / cols, rp = Math.min(70, (G.ry1 - G.ry0) / per);
  const q = Math.floor(S.n / d);
  const cell = Math.max(3, Math.min(40, (colW - 30) / Math.max(dlUnits(q), 1), rp * 0.8));
  return { cols, per, colW, rp, q, cell, x: (j: number) => G.bx0 + Math.floor(j / per) * (colW + gap), top: (j: number) => G.ry0 + (j % per) * rp, y: (j: number) => G.ry0 + (j % per) * rp + rp / 2 };
};
/* the pen's slots, read left to right */
const dlPen = (G: any, cnt: number) => {
  const pitch = Math.min(70, (G.bx1 - G.bx0 - 32) / Math.max(cnt, 1));
  return { pitch, cw: Math.min(64, pitch - 2), x: (i: number) => G.bx0 + 16 + i * pitch };
};

/* counters: whole tens tied into a rod of ten, the rest loose; every counter is its own circle */
function DlCounters({ c, x, y, cell, paint, base, skin }: any) {
  const t = Math.floor(c / 10), o = c % 10, out: any[] = [], edge = shade(base, 0.25);
  let cx = x;
  const h = Math.max(cell * 0.86, 4), sz = cell * 0.9;
  /* a counter: the plain circle first (the fallback; smaller under a skin, so its rim never rings the transparent apple), the apple's picture
     over it in a NEAR-SQUARE box (the tile is 92 x 96: its own shape, never a pill) */
  const apple = (key: string, px: number) => (
    <g key={key}>
      <circle cx={px} cy={y} r={cell * (skin ? 0.3 : 0.4)} fill={`url(#${paint})`} stroke={edge} strokeWidth={1.2} />
      {skin && <Skin name="apple" x={px - sz * 0.48} y={y - sz / 2} w={sz * 0.96} h={sz} fit="stretch" />}
    </g>
  );
  for (let i = 0; i < t; i++) {
    out.push(<rect key={"rod" + i} x={cx - 1} y={y - h / 2 - 1.5} width={cell * 10 + 2} height={h + 3} rx={Math.min(h / 2, 7)} fill={tint(base, 0.78)} stroke={edge} strokeWidth={1.4} />);
    for (let j = 0; j < 10; j++) out.push(apple("c" + i + "_" + j, cx + cell * (j + 0.5)));
    cx += cell * 10.5;
  }
  for (let i = 0; i < o; i++) out.push(apple("o" + i, cx + cell * (i + 0.5)));
  return <g>{out}</g>;
}
/* a factor card: white face, blue edge, the number in deep blue (v null = a card under its twin, no label) */
function DlCard({ x, y, v, w = 62, h = 76, edge, ring, ghost }: any) {
  return (
    <g data-role={ghost ? "ghost-card" : undefined}>
      {ring && <rect x={x - 6} y={y - 6} width={w + 12} height={h + 12} rx={14} fill="none" stroke={ring} strokeWidth={4} />}
      <rect x={x} y={y} width={w} height={h} rx={10} fill="#FFFFFF" stroke={edge || DL_BLUE} strokeWidth={3}
        strokeDasharray={ghost ? "8 6" : undefined} filter={ghost ? undefined : "url(#fShadowSoft)"} />
      {v !== null && v !== undefined && (
        <text x={x + w / 2} y={y + h / 2 + 11} textAnchor="middle" fontSize={String(v).length >= 3 && w < 62 ? T.micro : T.label} fontWeight={700} fill={DL_INK.blue}>{v}</text>
      )}
    </g>
  );
}

/* ── the working area ────────────────────────────────────────────────────────────────────────
   box = { w, h, open, key }: 1472 x 520 with the answer panel shut, 900 wide with it open (bigPad). Everything is laid out from it.
   Left: the ladder, rungs numbered from 1 at the foot; a tried rung keeps its record ("0 over" lit blue, "3 over" in vermilion)
   and is never cleared. Right: the tray (the number as counters), the walled rows it is shared into, the leftover shelf outside
   the rows, and the factor pen with a wall at each end. One tap on a rung: the hand taps each row and the rows fill. */
function Work({ phase, n, item, index, stage, wrong, typed, api, MODEL, step, stepOn, box, captured, lang = "en", tx = (v: any) => v }: any) {
  const { C, wood: WOOD, pan: PAN } = dlFrame(api.C);
  const tl = useTimeline();         /* the correction, the win and the quick replays */
  const tlf = useTimeline();         /* the child's own card flights: a miss or a new number never cancels them, so a flight always lands */
  const free = stage === "free";
  const demo = stage === "demo" || stage === "teach";
  const warm = demo && !!phase.warm;
  const it = warm ? { ...phase.warm, kind: "warm" } : item;
  const qk = phase.n + ":" + index + ":" + (free ? "f" : warm ? "w" : "q");
  const entry = useRef<any>({ qk: "", n: 0 });
  if (entry.current.qk !== qk) entry.current = { qk, n: entry.current.n + 1 };
  const ek = qk + "#" + entry.current.n;
  const [, setTick] = useState(0);
  const SR = useRef<any>(null);
  if (!SR.current || SR.current.ek !== ek) SR.current = { ek, ...dlInit(free ? DL_FREE_PH : phase, free ? DL_FREE_IT : it) };
  const S = SR.current;
  const put = (p: any) => { SR.current = { ...SR.current, ...p }; setTick((t: number) => t + 1); };
  const busy = useRef(false);        /* an act or a replay is playing */
  const corr = useRef(false);        /* the correction is playing */
  const acted = useRef(true);        /* has the child moved since the miss? Enter waits for that */
  const sent = useRef<string | null>(null);   /* the pen as it was last sent, so a miss is not re-sent unchanged */
  const seq = useRef(0);
  const queued = useRef<any>(null);            /* a tap that came while the cards of the last rung were still flying: it acts when they land */
  const pendingEnter = useRef(false);          /* Enter pressed while the cards were flying: the pen is sent when they have landed */
  const pressRef = useRef<any>(null), cardPressRef = useRef<any>(null), enterRef = useRef<any>(null);
  const noteT = useRef<any>(null);             /* the timer that brings the question back after the stop line */
  const L0 = useRef<any>({});
  L0.current = { stage, free };

  /* a new entry (a question, a warm-up, free play) opens on its own board: stop what was playing and release the lock */
  useEffect(() => {
    tl.stop(); tlf.stop(); busy.current = false; corr.current = false; sent.current = null; acted.current = true; queued.current = null; pendingEnter.current = false;
    if (noteT.current) { clearTimeout(noteT.current); noteT.current = null; }
    api.lock(false);
  }, [ek]);
  useEffect(() => () => { if (noteT.current) clearTimeout(noteT.current); }, []);

  const hasPen = free || phase.cards !== "none";
  const hasWait = !free && phase.cards === "wait";
  const G = dlGeo(box, hasPen, hasWait);
  const pace = (ms: number, p: number) => Math.max(20, Math.round(ms * p));
  const play = (steps: any[]) => new Promise<void>((res) => { tlf.run(steps, () => res()); });

  /* ── geometry helpers (read the live state, so a step that runs later sees the board as it is then) ── */
  const ladY = (k: number) => { const L = dlLadder(SR.current, G.H), y0 = L.y(k); return typeof y0 === "number" ? Math.max(40, Math.min(G.H - 46, y0)) : G.H / 2; };
  /* the cards stand in a column 190 wide at the board's right edge: the longest label (Hindi, Gujarati) is centred under its card inside it */
  const wcPos = (role: number) => ({ x: G.bx1 - 131, y: G.ry0 + role * 150 });
  const rowPts = (k: number) => { const R = dlRows(SR.current, k, G); return dlRange(0, k - 1).map((j) => ({ x: R.x(j) + 44, y: R.y(j) })); };
  const rowEnd = (k: number) => {
    const R = dlRows(SR.current, k, G);
    return { x: Math.min(R.x(0) + 14 + dlUnits(R.q) * R.cell + 6, R.x(0) + R.colW - 70), y: Math.max(G.ry0, R.y(0) - 38) };
  };
  const orderOf = (st: any, extra: number[] = []) => Array.from(new Set([...st.pen.map((c: any) => c.v), ...st.fly.filter((f: any) => !f.ghost).map((f: any) => f.v), ...st.ghost, ...extra])).sort((a: any, b: any) => a - b) as number[];
  const slotOf = (st: any, v: number, extra: number[] = [], twin = false) => {
    const o = orderOf(st, extra), i = Math.max(0, o.indexOf(v)), P = dlPen(G, o.length);
    return { x: P.x(i) + (twin ? 5 : 0), y: G.py0 + 10 - (twin ? 5 : 0), cw: P.cw };
  };

  /* ── the motions, as timeline steps (each step runs, then holds for its ms) ── */
  const dealSteps = (k: number, p: number, record: boolean, ghostly?: boolean) => {
    const sh = dlShare(SR.current.n, k);
    const frames = k <= 8 ? dlRange(1, k) : [Math.ceil(k / 4), Math.ceil(k / 2), Math.ceil((3 * k) / 4), k];
    const out: any[] = [[pace(90, p), () => put({ shown: k, dealt: 0, shelf: false, refused: null, hlShelf: false, hlRow: null })]];
    frames.forEach((f) => out.push([pace(110, p), () => put({ dealt: f })]));
    out.push([pace(320, p), () => {
      put({ dealt: k, shelf: true, ...(record ? (ghostly ? { gtried: { ...SR.current.gtried, [k]: sh } } : { tried: { ...SR.current.tried, [k]: sh } }) : {}) });
      if (sh.r > 0) api.sfx.tick();
    }]);
    return out;
  };
  /* cards flying into the pen; a card whose number is already there lands on its twin */
  const flySteps = (list: any[], p: number, ghostly?: boolean) => {
    const ids: number[] = [];
    let vs: number[] = [], twins: boolean[] = [];
    return [
      [20, () => {
        const st = SR.current, seen = new Set(st.pen.map((c: any) => c.v));
        const keep = list.filter((c: any) => ghostly || st.lamp || !seen.has(c.v));
        const fl = keep.map((c: any) => { const had = seen.has(c.v); seen.add(c.v); return { v: c.v, twin: !ghostly && had, ...c.from() }; });
        vs = fl.map((f: any) => f.v); twins = fl.map((f: any) => f.twin);
        fl.forEach(() => ids.push(++seq.current));
        put({ fly: [...st.fly, ...fl.map((f: any, i: number) => ({ id: ids[i], v: f.v, x: f.x, y: f.y, ghost: !!ghostly, twin: f.twin }))] });
      }],
      [pace(420, p), () => {
        const st = SR.current;
        put({ fly: st.fly.map((f: any) => { const j = ids.indexOf(f.id); if (j < 0) return f; const s = slotOf(st, f.v, [], twins[j]); return { ...f, x: s.x, y: s.y }; }) });
      }],
      [pace(60, p), () => {
        const st = SR.current;
        if (ghostly) put({ fly: st.fly.filter((f: any) => !ids.includes(f.id)), ghost: [...st.ghost, ...vs.filter((v) => !st.ghost.includes(v))] });
        else { const L = dlLand(st.pen, vs, st.lamp); put({ fly: st.fly.filter((f: any) => !ids.includes(f.id)), pen: L.pen, repeatOn: st.repeatOn || L.rep }); }
        api.sfx.tick();
      }],
    ];
  };
  /* what an exact rung does with its two numbers: send them to the pen, or leave them waiting on the board */
  const cardSteps = (k: number, p: number, ghostly?: boolean) => {
    const st = SR.current, sh = dlShare(st.n, k);
    if (sh.r !== 0 || st.cards === "none") return [];
    /* only the rung the question is about waits for the child's hand; any other exact rung sends its cards on its own */
    if (st.cards === "wait" && k === st.waitRung) return ghostly ? [] : [[pace(200, p), () => put({ waiting: [{ v: k, role: 0 }, { v: sh.q, role: 1 }] })]];
    return flySteps([{ v: k, from: () => ({ x: 70, y: ladY(k) - 38 }) }, { v: sh.q, from: () => rowEnd(k) }], p, ghostly);
  };

  /* ── the child's acts ── */
  /* the child steps on rung k: the hand taps each row, the rows fill, what will not fit goes to the shelf */
  /* when a step's cards have landed: a tap that waited acts now, then an Enter that waited sends the pen */
  const afterStep = () => {
    const q = queued.current;
    if (q) { queued.current = null; if (q.role === undefined) { if (pressRef.current) pressRef.current(q.k); } else if (cardPressRef.current) cardPressRef.current(q.role); }
    if (!busy.current && pendingEnter.current) { pendingEnter.current = false; if (enterRef.current) enterRef.current(); }
  };
  const doStep = async (k: number, on: string) => {
    const st0 = SR.current, sh = dlShare(st0.n, k), g = st0.ek;
    busy.current = true; if (!free) api.lock(true);
    acted.current = true; sent.current = null;
    put({ touched: true, ghost: [], gtried: {}, fly: [], shown: k, dealt: 0, shelf: false, refused: null, verdict: null, hlRow: null, hlShelf: false });
    const ok = await api.act({ tool: "hand", moves: "tap", at: rowPts(k), onPoint: (i: number) => put({ dealt: i + 1 }) });
    /* the pad is free the moment the act ends; busy still keeps the ladder still while the cards fly */
    if (!free) api.lock(false);
    if (SR.current.ek !== g) return;               /* the board was replaced while the hand moved */
    if (!ok) { busy.current = false; put({}); afterStep(); return; }
    put({ dealt: k, shelf: true, tried: { ...SR.current.tried, [k]: sh } });
    if (sh.r > 0) api.sfx.tick(); else api.sfx.settle();
    await play([[80, () => {}], ...cardSteps(k, 1), [40, () => {}]]);
    if (SR.current.ek !== g) return;
    busy.current = false; put({});
    if (demo) api.did(on);
    afterStep();
  };
  /* the child carries a waiting card to the pen */
  const carry = async (role: number, on: string) => {
    const st = SR.current, w = st.waiting.find((x: any) => x.role === role), g = st.ek;
    if (!w) { if (demo) api.did(on); return; }
    busy.current = true; if (!free) api.lock(true);
    acted.current = true; sent.current = null;
    const wp = wcPos(role), s = slotOf(st, w.v, [w.v], st.pen.some((c: any) => c.v === w.v));
    put({ touched: true, ghost: [], gtried: {}, carrying: role });
    const ok = await api.act({ tool: "hand", moves: "carry", from: { x: wp.x + 36, y: wp.y + 40 }, to: { x: s.x + s.cw / 2, y: s.y + 38 }, ms: 1100,
      hold: <DlCard x={-31} y={-38} v={w.v} w={62} h={76} /> });
    if (!free) api.lock(false);
    if (SR.current.ek !== g) return;
    busy.current = false;
    if (!ok) { put({ carrying: null }); afterStep(); return; }
    const cur = SR.current, L = dlLand(cur.pen, [w.v], cur.lamp);
    put({ carrying: null, waiting: cur.waiting.filter((x: any) => x.role !== role), pen: L.pen, repeatOn: cur.repeatOn || L.rep });
    api.sfx.tick();
    if (demo) api.did(on);
    afterStep();
  };
  /* the list is finished (the repeat light is on): a tap on a rung above says so, and the question comes back a moment later */
  const stopNote = () => {
    api.sfx.tick();
    api.say("The repeat light is on, so the list is finished.");
    if (noteT.current) clearTimeout(noteT.current);
    const e0 = SR.current.ek, q0 = item;
    noteT.current = setTimeout(() => { noteT.current = null; if (SR.current.ek === e0 && L0.current.stage === "ask" && !corr.current) api.say(q0.say); }, 3800);
  };
  /* a tap on rung k: a tried rung is shown again; a rung above a blank one is refused (the blank one lights). A tap that comes while the
     cards of the last rung are still flying waits for their landing instead of being lost */
  const press = (k: number) => {
    if (corr.current) return;
    if (busy.current) { queued.current = { k }; return; }
    const st = SR.current, on = "rung-" + k;
    if (st.draft !== null) { api.capture(null); put({ draft: null }); }      /* free play: a number still being typed is closed first */
    if (demo && stepOn && on !== stepOn) { api.did(on); return; }
    if (!free && st.repeatOn && !st.tried[k]) { stopNote(); if (demo) api.did(on); return; }
    const nx = dlNext(st);
    if (st.tried[k]) {
      if (st.shown !== k) put({ shown: k, dealt: k, shelf: true, refused: null, touched: true, ghost: [], gtried: {}, hlRow: null, hlShelf: false });
      if (demo) api.did(on);
      return;
    }
    if (st.mode === "run" && nx !== null && k > nx) { put({ refused: nx, touched: true }); api.sfx.tick(); if (demo) api.did(on); return; }
    if (st.mode === "offer" && !st.offer.includes(k)) return;
    doStep(k, on);
  };
  const cardPress = (role: number) => {
    if (corr.current) return;
    if (busy.current) { queued.current = { role }; return; }
    const on = role ? "card-b" : "card-a";
    if (demo && stepOn && on !== stepOn) { api.did(on); return; }
    carry(role, on);
  };
  pressRef.current = press; cardPressRef.current = cardPress;
  /* Enter, the agent's check() and the dev solve() perform the CURRENT guide step */
  const act = (on: string) => {
    if (on.indexOf("rung-") === 0) press(Number(on.slice(5)));
    else if (on === "card-a") cardPress(0);
    else if (on === "card-b") cardPress(1);
  };
  HOOK.demo = () => { if (stepOn) act(stepOn); };

  /* free play: tap the tray's number, type a new one on the pad, Enter */
  const startDraft = () => {
    if (busy.current) return;
    put({ draft: "", touched: true });
    api.capture((k: string) => {
      const d = SR.current.draft === null ? "" : SR.current.draft;
      if (k === "back") put({ draft: d.slice(0, -1) });
      else if (k === "clear") put({ draft: "" });
      else if (k === "enter") {
        const v = Number(d);
        api.capture(null);
        /* a number below 2 changes nothing and says so */
        if (!(v >= 2)) { put({ draft: null }); api.say(DL_SAY.none); return; }
        /* the ladder is 24 high: a number whose answers repeat above it (a prime past 24, 2 x a prime past 12) steps down to the
           nearest number below it that does, so the repeat light can always come on; past 100 the tray holds 100 */
        let m = Math.min(v, 100);
        while (m > 2 && dlRepeatAt(m) > 24) m--;
        tl.stop(); tlf.stop(); busy.current = false; queued.current = null; pendingEnter.current = false;
        put({ ...dlInit(DL_FREE_PH, { n: m, top: 24 }), touched: true });
        /* every new number replaces the line before it: the number that is in the tray, or the free-play instruction again */
        api.say(v > 100 ? DL_SAY.big : m < v ? DL_SAY.down(m) : DL_SAY.pick);
      } else if (/^\d$/.test(k) && d.length < 3) put({ draft: d === "" && k === "0" ? d : d + k });
    });
  };

  /* ── the correction: the maths redrawn in steps, ending on the whole right answer ── */
  const finishSteps = (q: any, p: number, replay: boolean) => {
    const st = SR.current, out: any[] = [];
    /* a miss on an answer made in the pen: the correction draws ghost cards and a ghost ladder record and leaves the child's own alone */
    const gh = replay && q.pad === "enter";
    let cur = st.shown;
    const show = (k: number) => {
      const done = !!st.tried[k];
      if (done && !replay && cur === k) return [];
      const steps = done ? dealSteps(k, p * 0.6, false) : [...dealSteps(k, p, true, gh), ...cardSteps(k, p, gh)];
      cur = k;
      return steps;
    };
    /* the ladder climbs itself from the lowest blank rung. A long run of failures is written onto the ladder rung by rung */
    const climbTo = (to: number) => {
      const s: any[] = [];
      const todo = dlRange(1, to).filter((k) => !st.tried[k] && (st.mode !== "offer" || st.offer.includes(k)));
      const sweep = todo.filter((k) => st.n % k !== 0).length > 3, ep = sweep ? p * 0.6 : p;
      todo.forEach((k) => {
        if (st.n % k === 0) { s.push(...dealSteps(k, ep, true, gh), ...cardSteps(k, ep, gh)); cur = k; }
        else if (sweep) s.push([replay ? 150 : 60, () => put({ refused: null, ...(gh ? { gtried: { ...SR.current.gtried, [k]: dlShare(SR.current.n, k) } } : { tried: { ...SR.current.tried, [k]: dlShare(SR.current.n, k) } }) })]);
        else { s.push(...dealSteps(k, p * 0.35, true, gh)); cur = k; }
      });
      return s;
    };
    const shelfBeat = replay ? [[pace(450, p), () => put({ hlShelf: true })], [pace(450, p), () => put({ hlShelf: false })]] : [];
    const rowSweep = (d: number) => (replay ? [...dlRange(0, d - 1).map((j) => [pace(190, p), () => put({ hlRow: j })]), [pace(240, p), () => put({ hlRow: null })]] : []);
    const flyWaiting = () => st.waiting.flatMap((w: any) => (gh
      ? flySteps([{ v: w.v, from: () => wcPos(w.role) }], p, true)
      : [[pace(80, p), () => put({ waiting: SR.current.waiting.filter((x: any) => x.role !== w.role) })], ...flySteps([{ v: w.v, from: () => wcPos(w.role) }], p, false)]));
    const flyRow = () => (q.rowCard && st.waitRung ? flySteps([{ v: st.n / st.waitRung, from: () => rowEnd(st.waitRung) }], p, gh) : []);
    if (q.kind === "pick") {
      if (replay) q.offer.filter((k: number) => k !== q.answer).forEach((k: number) => out.push(...show(k), ...shelfBeat));
      out.push(...show(q.answer), ...rowSweep(q.answer), ...shelfBeat);
    } else if (q.kind === "judge") out.push(...show(q.offer[0]), ...rowSweep(q.offer[0]), ...shelfBeat);
    else if (q.kind === "first" || q.kind === "repeat") {
      out.push(...climbTo(q.answer));
      if (cur !== q.answer) out.push(...show(q.answer));
      if (q.kind === "first") out.push(...shelfBeat); else out.push([pace(200, p), () => put({ repeatOn: true })]);
    } else if (q.kind === "list") out.push(...climbTo(st.top));
    else if (q.kind === "skip") dlRange(1, st.top).filter((k) => !st.tried[k]).forEach((k) => out.push(...show(k), ...shelfBeat));
    else if (q.kind === "new" || q.kind === "pair") out.push(...flyWaiting(), ...flyRow());
    else if (q.kind === "count" || q.kind === "odd") out.push(...flyWaiting(), ...climbTo(q.stop || st.top));
    return out;
  };

  /* a miss: lock, redraw the maths, name it, unlock. The child's answer stays in the slot and nothing is marked */
  useEffect(() => {
    if (!wrong || stage !== "ask" || free) return;
    api.lock(true); corr.current = true; acted.current = false;
    if (SR.current.draft !== null) put({ draft: null });
    put({ refused: null, touched: true, verdict: null });
    const q = item;
    tl.run([[350, () => {}], ...finishSteps(q, 1.2, true), [250, () => put({ verdict: q.verdict, tone: q.tone })], [500, () => {}]], () => { corr.current = false; api.lock(false); put({}); });
  }, [wrong]);
  /* the win: the picture is completed quickly and named, and the win line is said */
  useEffect(() => {
    if (stage !== "win" || free) return;
    const q = item;
    put({ refused: null, touched: true, ghost: [], gtried: {} });
    tl.run([...finishSteps(q, 0.25, false), [60, () => put({ verdict: q.verdict, tone: q.tone, ...(q.kind === "repeat" ? { repeatOn: true } : {}) })], [300, () => {}]]);
    api.say(q.win);
  }, [stage]);

  /* Enter sends the pen when the answer is made on the working area; a pen that has just missed is never sent again unchanged */
  const penList = () => SR.current.pen.map((c: any) => c.v).join(",");
  const enterFn: any = !free && stage === "ask" && item.pad === "enter" ? () => {
    if (busy.current) { pendingEnter.current = true; return; }      /* cards still flying: the pen is sent when they have landed */
    const v = penList();
    if (!v || !acted.current || v === sent.current) return;
    sent.current = v;
    api.submit(v);
  } : null;
  enterRef.current = enterFn;
  api.onEnter(demo && stepOn ? () => act(stepOn) : enterFn);
  HOOK.enter = () => enterFn && enterFn();
  HOOK.set = (v: any) => {
    const nums = Array.from(new Set(dlNums(v))).filter((x) => x > 0 && x <= 1000);
    if (!nums.length) return false;
    let pen: any[] = [];
    nums.sort((a, b) => a - b).forEach((x) => { pen = dlLand(pen, [x], false).pen; });
    acted.current = true;
    put({ pen, touched: true, ghost: [], gtried: {}, waiting: SR.current.waiting.filter((w: any) => !nums.includes(w.v)) });
    return true;
  };
  /* the Enter key blinks once the pen is a complete answer */
  const ready = !free && stage === "ask" && item.pad === "enter" && acted.current && (item.kind === "list" ? dlNext(S) === null : S.pen.length >= 2);
  useEffect(() => { if (item.pad === "enter") api.answerReady(!!ready); }, [ready]);

  /* ── what the host and the agent read back (toolApi.getState) ── */
  const d = S.shown || 0;
  const share = d ? dlShare(S.n, d) : null;
  api.share({ number: S.n, rung: S.shown, offered: S.offer, triedRungs: Object.keys(S.tried).map(Number).sort((a, b) => a - b),
    leftover: share && S.shelf ? share.r : null, penCards: S.pen.map((c: any) => c.v), cardsWaiting: S.waiting.map((w: any) => w.v),
    repeated: S.repeatOn, verdict: S.verdict, complete: stage === "idle" });

  /* ── drawing ── */
  const Lad = dlLadder(S, G.H);
  const nx = dlNext(S);
  const R = d ? dlRows(S, d, G) : null;
  /* the controls stay live while the cards fly (a tap then waits for their landing); the correction holds them, and the hand's own act takes no tap */
  const live = (stage === "ask" || stage === "demo" || free) && !corr.current;
  const tray = G.bx1 - G.bx0;
  const trayText = S.draft !== null ? S.draft : d ? S.n + " ÷ " + d : String(S.n);
  const count0 = G.bx0 + 18 + trayText.length * 19 + 18;
  const trayCell = Math.min(30, (G.bx1 - 14 - count0) / Math.max(dlUnits(S.n), 1));
  const inTray = d && share ? S.n - (S.dealt * share.q + (S.shelf ? share.r : 0)) : S.n;
  /* ONE look per board: the tray, the rows and the leftover shelf always hold the whole number between them, so they are all apples when
     that number fits the 40-picture budget and all plain dots when it does not (never apple leftovers beside dot rows) */
  const skinOn = S.n <= 40;
  const skShelf = skinOn, skRows = skinOn, skTray = skinOn;
  const toneInk = S.tone === "ink" ? C.ink : DL_INK[S.tone] || C.ink;
  const order = orderOf(S);
  const P = dlPen(G, order.length);
  const padDone = item.pad === "enter" && !!ready;
  /* the one invite: a guide step rings the control it waits for; once a question is open nothing in the picture pulses (the Answer key, or Enter,
     blinks), except the ONE control a working-area list needs before its first act. It never rings a candidate answer (a card) or a given number. */
  let inv: any = null;
  const twoOffered = S.mode === "offer" && S.offer.length === 2 && S.waiting.length === 0;
  if (live && !free && demo && stepOn && twoOffered) {
    /* two rungs are offered: ONE pulse rings both, so neither the pulse nor its place singles out the factor */
    const ya = Lad.y(Math.min(S.offer[0], S.offer[1])), yb = Lad.y(Math.max(S.offer[0], S.offer[1]));
    inv = { x: 134, y: (ya + yb) / 2, w: 224, h: Math.abs(ya - yb) + 72, rx: 18 };
  } else if (live && !free) {
    const target = demo && stepOn ? stepOn : !demo && item.pad === "enter" && item.kind === "list" && !S.touched && nx !== null ? "rung-" + nx : null;
    if (target && target.indexOf("rung-") === 0 && Lad.ks.indexOf(Number(target.slice(5))) >= 0) inv = { x: 134, y: Lad.y(Number(target.slice(5))), w: 224, h: 72, rx: 18 };
    else if (target === "card-a" || target === "card-b") { const wp = wcPos(target === "card-b" ? 1 : 0); inv = { x: wp.x + 36, y: wp.y + 40, w: 72, h: 80, rx: 12 }; }
  }
  /* free play: the ring hugs the tray's number only, never the apple row beside it */
  if (free && live && !S.touched && S.draft === null) { const tw = trayText.length * 19 + 22; inv = { x: G.bx0 + 6 + tw / 2, y: 30, w: tw, h: 52, rx: 14 }; }

  return (
    <g>
      <style>{DL_CSS}</style>

      {/* the ladder: two rails, a ground line, and a plate for every rung in view */}
      <g data-role="ladder">
        <rect x={6} y={Lad.railTop} width={12} height={G.H - Lad.railTop - 6} rx={6} fill={WOOD} />
        <rect x={238} y={Lad.railTop} width={12} height={G.H - Lad.railTop - 6} rx={6} fill={WOOD} />
        {/* a long run folds its oldest rungs into one chip (digits only) at the foot */}
        {Lad.fold && (
          <g data-role="ladder-fold">
            <rect x={24} y={Lad.fold.y - 17} width={208} height={34} rx={12} fill="#FFFFFF" stroke={C.dim} strokeWidth={2.5} strokeDasharray="8 6" />
            <text x={128} y={Lad.fold.y + 11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{Lad.fold.to === 1 ? "1" : "1-" + Lad.fold.to}</text>
          </g>
        )}
        {Lad.ks.map((k: number) => {
          const y = Lad.y(k), own = S.tried[k], gt = own ? null : S.gtried[k], t = own || gt, lit = !!own && own.r === 0;
          const ring = S.shown === k || S.refused === k;
          const cp = Lad.compact(k), stopped = !free && S.repeatOn && !t;
          const ph = cp ? 34 : 64;
          return (
            <g key={"rg" + k}>
              <rect x={24} y={y - ph / 2} width={208} height={ph} rx={cp ? 12 : 16} fill={lit ? "url(#gHundred)" : stopped ? tint(C.panel, 0.6) : "#FFFFFF"}
                stroke={ring ? C.accent : lit ? shade(DL_BLUE, 0.2) : t && t.r ? DL_VERM : stopped ? C.dim : WOOD} strokeWidth={ring ? 5 : cp ? 2.5 : 3} strokeDasharray={(gt && !ring) || stopped ? "8 6" : undefined} />
              <text x={62} y={cp ? y + 11 : y + 15} textAnchor="middle" fontSize={cp ? T.label : T.speech} fontWeight={700} fill={lit ? "#FFFFFF" : C.ink}>{k}</text>
              {t && <text x={100} y={y + 11} fontSize={T.label} fontWeight={700} fill={lit ? "#FFFFFF" : DL_INK.verm}>{t.r + " " + tx("over")}</text>}
              {!t && S.refused === k && <text x={100} y={y + 10} fontSize={T.micro} fontWeight={700} fill={shade(C.accent, 0.3)}>{tx("try") + " " + k}</text>}
            </g>
          );
        })}
      </g>

      {/* the tray: the number in hand, tens tied into rods */}
      <rect x={G.bx0} y={0} width={tray} height={60} rx={16} fill={PAN} stroke={C.rule} strokeWidth={2} />
      <text x={G.bx0 + 18} y={42} fontSize={T.label} fontWeight={700} fill={C.ink}>{trayText}</text>
      {S.draft !== null && <rect className="c4-caret" x={G.bx0 + 22 + trayText.length * 19} y={14} width={4} height={34} rx={2} fill={C.accent} />}
      {inTray > 0 && S.draft === null && <DlCounters c={inTray} x={count0} y={30} cell={trayCell} paint="gTen" base={DL_AMBER} skin={skTray} />}
      {S.verdict && <text x={G.bx1 - 16} y={42} textAnchor="end" fontSize={T.label} fontWeight={700} fill={toneInk}>{tx(S.verdict)}</text>}

      {/* the board: one walled row for every rung number, filled as the hand taps it */}
      {!R && <rect x={G.bx0} y={G.ry0} width={G.rowsX1 - G.bx0} height={G.ry1 - G.ry0} rx={18} fill="none" stroke={C.rule} strokeWidth={2} strokeDasharray="10 12" />}
      {R && dlRange(0, d - 1).map((j) => {
        const hl = S.hlRow === j;
        return (
          <g key={"row" + j}>
            <rect x={R.x(j)} y={R.top(j) + 1.5} width={R.colW} height={Math.max(R.rp - 3, 4)} rx={Math.min(10, (R.rp - 3) / 2)} fill="#FFFFFF" stroke={hl ? C.accent : C.rule} strokeWidth={hl ? 4 : 1.5} />
            {j < S.dealt && <DlCounters c={R.q} x={R.x(j) + 14} y={R.y(j)} cell={R.cell} paint="gTen" base={DL_AMBER} skin={skRows} />}
          </g>
        );
      })}

      {/* the leftover shelf: outside the rows, at full strength, countable */}
      <rect x={G.bx0} y={G.sy0} width={G.rowsX1 - G.bx0} height={G.shh} rx={16} fill={tint(C.panel, 0.5)} stroke={S.hlShelf ? C.accent : C.rule} strokeWidth={S.hlShelf ? 4 : 2} />
      {!(share && S.shelf) && <text x={G.bx0 + 18} y={G.sy0 + 38} fontSize={T.label} fontWeight={600} fill={C.ink}>{tx("left over")}</text>}
      {share && S.shelf && (
        <g>
          <text x={G.bx0 + 18} y={G.sy0 + 40} fontSize={T.label} fontWeight={700} fill={share.r ? DL_INK.verm : DL_INK.blue}>{share.r + " " + tx("over")}</text>
          {dlRange(1, share.r).map((j) => {
            const x0 = G.bx0 + 150, pitch = Math.min(36, (G.rowsX1 - 24 - x0) / Math.max(share.r, 1));
            const lx = x0 + (j - 0.5) * pitch, ly = G.sy0 + G.shh / 2, rr = Math.min(14, pitch * 0.42);
            /* a leftover apple: the plain vermilion circle (smaller under the picture, so it never rims the apple), the apple over it in a near-square
               box (92 x 96), and a dark ring, so "left over" is told by its place outside the rows, its ring and the "N over" label, never by tint */
            return (
              <g key={"lo" + j}>
                <circle cx={lx} cy={ly} r={skShelf ? rr * 0.72 : rr} fill="url(#gPointer)" stroke={DL_INK.verm} strokeWidth={1.2} />
                {skShelf && <Skin name="apple" x={lx - rr * 1.05 * 0.96} y={ly - rr * 1.05} w={rr * 2.1 * 0.96} h={rr * 2.1} fit="stretch" />}
                {skShelf && <circle cx={lx} cy={ly} r={rr * 1.05} fill="none" stroke={shade(DL_VERM, 0.4)} strokeWidth={3.5} />}
              </g>
            );
          })}
        </g>
      )}

      {/* the cards of an exact division, waiting on the board for the child to carry them into the pen (phase 3) */}
      {S.waiting.filter((w: any) => S.carrying !== w.role).map((w: any) => {
        const wp = wcPos(w.role);
        return (
          <g key={"wait" + w.role}>
            <DlCard x={wp.x} y={wp.y} v={w.v} w={72} h={80} />
            <text x={wp.x + 36} y={wp.y + 80 + 50} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={C.ink}>{tx(w.role ? "in each" : "rows")}</text>
          </g>
        );
      })}

      {/* the factor pen: a wall at each end, the cards in order between them */}
      {hasPen && (
        <g>
          <text x={G.bx0 + 6} y={G.py0 - 10} fontSize={T.label} fontWeight={600} fill={C.ink}>{tx("factor pen")}</text>
          {S.lamp && (
            <g data-role="repeat-light">
              <circle cx={G.bx1 - 182} cy={G.py0 - 20} r={14} fill={S.repeatOn ? "url(#gBead)" : "#FFFFFF"} stroke={S.repeatOn ? DL_INK.rose : C.dim} strokeWidth={3} />
              <text x={G.bx1 - 158} y={G.py0 - 10} fontSize={T.label} fontWeight={600} fill={S.repeatOn ? DL_INK.rose : C.ink}>{tx("repeat")}</text>
            </g>
          )}
          <rect x={G.bx0} y={G.py0} width={tray} height={G.ph} rx={18} fill={tint(C.panel, 0.35)} stroke={C.rule} strokeWidth={2} />
          <rect x={G.bx0} y={G.py0} width={12} height={G.ph} rx={6} fill={WOOD} />
          <rect x={G.bx1 - 12} y={G.py0} width={12} height={G.ph} rx={6} fill={WOOD} />
          {S.ghost.filter((v: number) => !S.pen.some((c: any) => c.v === v)).map((v: number) => {
            const i = order.indexOf(v);
            return (
              <g key={"ghost" + v} className="dl-slide" style={{ transform: `translate(${P.x(i)}px,${G.py0 + 10}px)` } as any}>
                <DlCard x={0} y={0} v={v} w={P.cw} ghost />
              </g>
            );
          })}
          {S.pen.map((c: any) => {
            const i = order.indexOf(c.v);
            return (
              <g key={"pen" + c.v} className="dl-slide" style={{ transform: `translate(${P.x(i)}px,${G.py0 + 10}px)` } as any}>
                {c.tw > 0 ? (
                  <g>
                    <DlCard x={0} y={0} v={null} w={P.cw} />
                    <DlCard x={5} y={-5} v={c.v} w={P.cw} edge={DL_ROSE} />
                  </g>
                ) : <DlCard x={0} y={0} v={c.v} w={P.cw} />}
              </g>
            );
          })}
        </g>
      )}

      {/* cards on their way */}
      {S.fly.map((f: any) => (
        <g key={"fly" + f.id} className="dl-move" style={{ transform: `translate(${f.x}px,${f.y}px)` } as any} pointerEvents="none">
          <DlCard x={0} y={0} v={f.v} w={62} ghost={f.ghost} />
        </g>
      ))}

      {/* the controls: one finger box a rung, one a waiting card, the tray's number in free play */}
      {/* a tried rung on a long ladder is a record, not a control: only the rungs still to try (and every offered rung) take a finger */}
      {Lad.ks.filter((k: number) => !Lad.compact(k) || S.mode === "offer").map((k: number) => (
        <Hit key={"hit" + k} id={"rung-" + k} label={tx("Rung") + " " + k} x={22} y={Lad.y(k) - 38} w={220} h={76}
          enabled={live && !padDone} onPress={() => press(k)} />
      ))}
      {S.waiting.filter((w: any) => S.carrying !== w.role).map((w: any) => {
        const wp = wcPos(w.role);
        return <Hit key={"hitc" + w.role} id={w.role ? "card-b" : "card-a"} label={tx(w.role ? "Card in each row" : "Card for the rows")} x={wp.x - 8} y={wp.y - 4} w={88} h={132}
          enabled={live} onPress={() => cardPress(w.role)} />;
      })}
      {free && S.draft === null && <Hit id="tray-number" label="Change the number in the tray" x={G.bx0} y={0} w={180} h={72} enabled={!captured && !busy.current} onPress={startDraft} />}

      {inv && !busy.current && <Invite x={inv.x} y={inv.y} w={inv.w} h={inv.h} rx={inv.rx} C={C} />}
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase: the number, and the cards that answered it */
function Thumb({ result, it, C: C0, w, h, lang = "en", tx = (v: any) => v }: any) {
  const C = dlFrame(C0).C;
  const L = (result && result.last) || {};
  if (L.value === null || L.value === undefined || L.value === "") return null;
  const q = it || {};
  const sh = L.shared || {};
  let vals: number[] = Array.isArray(sh.penCards) && sh.penCards.length ? sh.penCards.slice() : [];
  if (!vals.length) {
    if (q.kind === "pick") vals = [q.answer];
    else if (q.kind === "judge") vals = [q.offer[0]];
    else vals = dlNums(L.value);
  }
  vals = vals.slice(0, 3);
  const nTxt = String(q.n || sh.number || "");
  const x0 = 16 + nTxt.length * 17 + 14, pitch = (w - x0 - 12) / Math.max(vals.length, 1), cw = Math.min(54, pitch - 8), ch = Math.min(h - 18, 56);
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      <text x={16} y={h / 2 + 10} fontSize={T.micro} fontWeight={700} fill={C.ink}>{nTxt}</text>
      {vals.map((v, i) => <DlCard key={i} x={x0 + i * pitch} y={(h - ch) / 2} v={v} w={cw} h={ch} />)}
    </g>
  );
}

function DivideLadder(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, fitHost: () => null,
      /* the board layout (LAYOUT.md §1b): the working area is the whole card until the child taps Answer, then the panel slides in */
      board: true,
      /* KEY ONLY (the new look; LAYOUT.md §1d, PATTERNS.md §16): no question bar, only its blinking key at the top right; the question lives only in the bubble */
      keyOnly: true,
      /* the wide keypad: the picture has x 64 to 964 while the panel is open */
      bigPad: true,
      /* the Next key: nothing moves on by itself; the win picture waits for the child's tap on the blinking Next key */
      nextKey: true,
      /* NAV DOTS (the new look): one small clickable dot per phase, no text */
      navDots: true,
      /* the start page: the tool's name, StartArt, START_HOOK, a Start key */
      StartArt, START_HOOK,
      }} />
  );
}

export default DivideLadder;
