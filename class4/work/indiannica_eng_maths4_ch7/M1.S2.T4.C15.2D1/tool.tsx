/* ═══ M1.S2.T4.C15.2D1 · lowest_terms_ladder · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists: header + its three controls, canvas, key corner, bubble + mascot,
   phase dots, window.toolApi, the sound effects, the printed bubble, scoring, the events, idle and
   restart. THE LESSON IS SILENT (runtime r30+): every line is printed on the bubble, which is the guide.
   THE NEW LOOK (keyOnly, navDots): no question bar; the question lives only in the bubble.

   The ladder runs left to right across the top: a rung is a stacked fraction on a card with its value
   strip beside it, and a short arrow from each old number to its new one carries the factor. Under it
   the factors of the current rung's two numbers stand in two rows; the shared ones above one are
   offered as tiles in the tray. Tapping or dropping a tile divides BOTH numbers by it, and a pencil
   writes the marks and the next rung. A fraction question is answered ON the next rung: when the
   last tile has been used the pencil writes only the divide marks, and the child types the rung.
   Everything is laid out for the open keypad (900 wide) and stays put when the keypad is shut. */

const TOOL_ID = "lowest_terms_ladder";
const MEDIA_ID = "M1.S2.T4.C15.2D1";
const TOOL_NAME = "Lowest Terms Ladder";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
/* kept for the tool object's shape (and the sidecar); nothing speaks from r30 */
const VOICE = {"rate":0.92,"pitch":1.06};

/* phase 1 has guide steps, so the opening line is never shown */
const OPENING: string[] = [];
/* the whole-tool line: kept for the sidecar (the summary page says its own line) */
const FINISH_LINE = "Every ladder walked down to its last rung, and the strip beside it never moved at all.";
/* printed when the child opens Free play; its LAST piece stays on the bubble */
const FREE_LINE = "Free play. Step any fraction down with the tiles, then try a new one.";

/* THE START PAGE: the object the lesson is about, a short ladder 30 over 36, 10 over 12, 5 over 6 (no question's answer) */
const START_HOOK = "How far can a fraction step down the ladder?";
function StartArt({ box, C, lang, tx }: any) {
  const g = LG.std, sc = 1.7, u = g.unit * sc, gap = 150;
  const total = 3 * u + 2 * gap, ox = (box.w - total) / 2, oy = (box.h - g.h * sc) / 2;
  const rs = [[30, 36], [10, 12], [5, 6]], lay = ltLay(g.h);
  return (
    <g>
      {rs.map((r, i) => (
        <g key={i} transform={`translate(${ox + i * (u + gap)},${oy}) scale(${sc})`}>
          <LtRung x={0} y={0} g={g} n={r[0]} d={r[1]} sh={3} filled C={C} />
        </g>
      ))}
      {[0, 1].map((i) => (
        <LtStep key={"a" + i} x1={ox + i * (u + gap) + u + 8} x2={ox + (i + 1) * (u + gap) - 8} y1={oy + lay.numC * sc} y2={oy + lay.denC * sc} f={i === 0 ? 3 : 2} mk={2} sz={T.speech} C={C} />
      ))}
    </g>
  );
}

/* Hindi and Gujarati (docs/PATTERNS.md §11): filled AFTER the English is final (the language pass). */
const TR: any = {
  hi: {
    "Dividing both numbers by the same thing": "दोनों संख्याओं को एक ही संख्या से भाग देना",
    "Tap the upper number to try dividing just that one.": "ऊपर की संख्या को अकेले भाग देने के लिए उस पर टैप करो।",
    "Tap the upper number above the line.": "रेखा के ऊपर की संख्या पर टैप करो।",
    "Now tap the tile.": "अब टाइल पर टैप करो।",
    "The tile is under the lists.": "टाइल सूचियों के नीचे है।",
    "Both numbers must be divided by the same factor, or the amount changes.": "दोनों संख्याओं को एक ही गुणनखंड से भाग दो, वरना मात्रा बदल जाती है।",
    "You learned: divide both numbers by the same common factor.": "तुमने सीखा: दोनों संख्याओं को एक ही साझा गुणनखंड से भाग दो।",
    "Divide both numbers of this fraction by the same factor to reduce it.": "इस भिन्न को सरल करने के लिए दोनों संख्याओं को एक ही गुणनखंड से भाग दो।",
    "Step it down": "नीचे उतारो",
    "Which number is drawn in the same colour in both lists?": "तुम्हारी दोनों सूचियों में कौन सी संख्या एक ही रंग की है?",
    "Both numbers got smaller together, and the strip stayed where it was.": "दोनों संख्याएँ साथ-साथ छोटी हुईं, और पट्टी वहीं की वहीं रही।",
    "Reduce this fraction to its lowest terms.": "इस भिन्न को सरलतम रूप में लिखो।",
    "Lowest terms?": "सरलतम रूप?",
    "Did the upper and the lower number both get divided by one number?": "क्या ऊपर और नीचे, दोनों को एक ही संख्या से भाग दिया?",
    "The fraction is simpler now, and its strip has not moved.": "भिन्न अब सरल है, और उसकी पट्टी नहीं हिली।",
    "Now bring this one down to lowest terms the same way.": "अब इसे भी इसी तरह सरलतम रूप तक लाओ।",
    "All the way down": "आखिर तक उतारो",
    "Find the tile that fits both numbers, then use it.": "दोनों संख्याओं में आने वाली टाइल ढूँढो, फिर उसे लगाओ।",
    "Same amount, simpler writing.": "मात्रा वही, लिखावट सरल।",
    "Knowing when to stop": "कब रुकना है, यह जानना",
    "Tap Factors to list what goes into each number.": "हर संख्या के गुणनखंड सूचीबद्ध करने के लिए गुणनखंड पर टैप करो।",
    "Tap the Factors key.": "गुणनखंड कुंजी पर टैप करो।",
    "Tap the shared tile to step down again.": "फिर से नीचे उतरने के लिए साझा टाइल पर टैप करो।",
    "Tap the tile that goes into both.": "जो टाइल दोनों में आती है, उस पर टैप करो।",
    "A fraction is finished only when its two numbers share no factor bigger than 1.": "भिन्न तब पूरा होता है जब दोनों संख्याओं में 1 से बड़ा साझा गुणनखंड न हो।",
    "You learned: stop when the two numbers share nothing but 1.": "तुमने सीखा: जब दोनों संख्याओं में 1 के सिवा कुछ साझा न रहे, तब रुको।",
    "finished": "पूरा हुआ",
    "not yet": "अभी नहीं",
    "A child stopped at the last rung; is the work finished?": "एक बच्चा आखिरी पायदान पर रुक गया; क्या काम पूरा हुआ?",
    "Is it finished?": "क्या यह पूरा हुआ?",
    "Open the factor lists for that last rung and compare them.": "उस आखिरी पायदान की गुणनखंड सूचियाँ खोलो और मिलाओ।",
    "Not yet. Six and nine still share three.": "अभी नहीं। 6 और 9 में अब भी 3 साझा है।",
    "yes": "हाँ",
    "no": "नहीं",
    "Another child stopped at the last rung; is it in lowest terms?": "दूसरा बच्चा आखिरी पायदान पर रुक गया; क्या यह सरलतम रूप है?",
    "In lowest terms?": "सरलतम रूप में?",
    "Does any factor bigger than 1 stand in both lists of that rung?": "क्या 1 से बड़ा कोई गुणनखंड उस पायदान की दोनों सूचियों में है?",
    "No. Nine and twelve still share three.": "नहीं। 9 और 12 में अब भी 3 साझा है।",
    "Reduce this fraction until nothing but one is shared.": "इस भिन्न को तब तक सरल करो जब तक 1 के सिवा कुछ साझा न बचे।",
    "Down to the last": "आखिरी तक",
    "After each step, check the lists again for a shared tile.": "हर कदम के बाद सूचियाँ फिर देखो कि कोई साझा टाइल बची है या नहीं।",
    "Nothing but one is shared now, so the ladder stops.": "अब 1 के सिवा कुछ साझा नहीं, इसलिए सीढ़ी यहीं रुकती है।",
    "The long way and the short way": "लंबा रास्ता और छोटा रास्ता",
    "Tap the first tile of ladder one for a small step.": "छोटे कदम के लिए सीढ़ी 1 की पहली टाइल पर टैप करो।",
    "Look for the tile tagged one.": "1 लिखे टैग वाली टाइल ढूँढो।",
    "Tap its next tile for another small step.": "एक और छोटे कदम के लिए उसकी अगली टाइल पर टैप करो।",
    "Ladder one still has a tile waiting.": "सीढ़ी 1 की एक टाइल अब भी बाकी है।",
    "Now tap the tile of ladder two for one big step.": "अब एक बड़े कदम के लिए सीढ़ी 2 की टाइल पर टैप करो।",
    "Look for the tile tagged two.": "2 लिखे टैग वाली टाइल ढूँढो।",
    "A bigger shared factor takes fewer steps, and every route ends on the same rung.": "बड़ा साझा गुणनखंड कम कदम लेता है, और हर रास्ता एक ही पायदान पर पहुँचता है।",
    "You learned: every route down ends on the same lowest terms.": "तुमने सीखा: हर रास्ता उसी सरलतम रूप पर पहुँचता है।",
    "Both ladders start from one fraction; do they end on the same rung?": "दोनों सीढ़ियाँ एक ही भिन्न से चलती हैं; क्या वे एक पायदान पर पहुँचेंगी?",
    "Do they agree?": "क्या दोनों एक जैसे निकले?",
    "Check each step of the long ladder: did any step change the amount?": "लंबी सीढ़ी का हर कदम जाँचो: क्या किसी कदम ने मात्रा बदली?",
    "Small steps and one big step land on the same rung.": "छोटे कदम और एक बड़ा कदम, दोनों एक ही पायदान पर पहुँचे।",
    "Take both ladders down, then write the rung where they end.": "दोनों सीढ़ियाँ नीचे उतारो, फिर जहाँ वे मिलती हैं वह पायदान लिखो।",
    "Where do both land?": "दोनों कहाँ पहुँचती हैं?",
    "Does the same factor still go into both numbers on ladder one?": "क्या सीढ़ी 1 की दोनों संख्याएँ अब भी उसी गुणनखंड से बँटती हैं?",
    "Again, both ladders end on the same fraction.": "फिर से, दोनों सीढ़ियाँ एक ही भिन्न पर खत्म हुईं।",
    "Bring this fraction down to its lowest terms in just one step.": "इस भिन्न को बस एक कदम में सरलतम रूप तक लाओ।",
    "One step down": "एक कदम में नीचे",
    "The question wants one step, so one tile must do it all.": "सवाल को एक ही कदम चाहिए, इसलिए एक टाइल को ही सब करना है।",
    "Which tile is the biggest that goes into both numbers?": "दोनों संख्याओं में आने वाली सबसे बड़ी टाइल कौन सी है?",
    "Divide both by that tile in one step.": "दोनों को उसी टाइल से एक कदम में भाग दो।",
    "The biggest shared tile finished the whole ladder at once.": "सबसे बड़ी साझा टाइल ने पूरी सीढ़ी एक बार में उतार दी।",
    "The amount does not move": "मात्रा नहीं बदलती",
    "Tap Colour bars to fill the strip beside each rung.": "हर पायदान के पास की पट्टी भरने के लिए पट्टियाँ रंगो पर टैप करो।",
    "Tap the Colour bars key.": "पट्टियाँ रंगो कुंजी पर टैप करो।",
    "Now tap Guide line to run a line across the strips.": "अब पट्टियों के आर-पार रेखा खींचने के लिए मार्गदर्शक रेखा पर टैप करो।",
    "Tap the Guide line key.": "मार्गदर्शक रेखा कुंजी पर टैप करो।",
    "The numbers shrink down the ladder, but the amount never moves.": "सीढ़ी में संख्याएँ छोटी होती हैं, पर मात्रा कभी नहीं बदलती।",
    "You learned: reducing changes the writing, never the amount.": "तुमने सीखा: सरल करने से लिखावट बदलती है, मात्रा नहीं।",
    "less": "कम",
    "more": "ज़्यादा",
    "the same": "बराबर",
    "Is the amount on the last rung less than the first, more than it, or the same?": "क्या आखिरी पायदान की मात्रा पहले से कम है, ज़्यादा है या बराबर?",
    "Less, more or same?": "कम, ज़्यादा या बराबर?",
    "Look at the top of the colour on the first strip.": "पहली पट्टी में रंग का ऊपरी सिरा देखो।",
    "The strips end in the same place.": "पट्टियाँ एक ही जगह रुकती हैं।",
    "bigger": "ज़्यादा",
    "smaller": "कम",
    "Is the amount on rung one bigger than on rung two, smaller, or the same?": "क्या पायदान 1 की मात्रा पायदान 2 से ज़्यादा है, कम है या बराबर?",
    "Bigger or smaller?": "ज़्यादा या कम?",
    "Put one finger on top of each strip's colour; where do the two fingers sit?": "हर पट्टी के रंग के ऊपरी सिरे पर एक उँगली रखो; दोनों उँगलियाँ कहाँ हैं?",
    "They are the same amount written two ways.": "ये एक ही मात्रा है, दो तरह से लिखी गई।",
    "Reduce this fraction and watch whether the strip moves on the way down.": "इस भिन्न को सरल करो और देखो कि नीचे आते समय पट्टी हिलती है या नहीं।",
    "Down to lowest terms": "सरलतम रूप तक नीचे",
    "Did the tile take away from both numbers, or divide both?": "क्या टाइल ने दोनों संख्याओं में से घटाया, या दोनों को भाग दिया?",
    "The strip never moved, only the writing got simpler.": "पट्टी कभी नहीं हिली, बस लिखावट सरल हुई।",
    "What happens to the other number when you use that one?": "उसे लगाने पर दूसरी संख्या का क्या होता है?",
    "Divide the upper and the lower number by the very same shared factor.": "ऊपर और नीचे की संख्या को ठीक उसी साझा गुणनखंड से भाग दो।",
    "Write the factors of each number on the last rung.": "आखिरी पायदान की हर संख्या के गुणनखंड लिखो।",
    "Check every factor of the upper number against the lower number's list.": "ऊपर की संख्या का हर गुणनखंड नीचे की संख्या की सूची में देखो।",
    "What is written on the last rung of each ladder?": "हर सीढ़ी के आखिरी पायदान पर क्या लिखा है?",
    "Count each ladder's steps, then compare the two last rungs.": "हर सीढ़ी के कदम गिनो, फिर दोनों आखिरी पायदान मिलाओ।",
    "Compare where the colour ends on the first and last strips.": "पहली और आखिरी पट्टी में रंग कहाँ रुकता है, तुलना करो।",
    "Use the guide line from the first strip to measure the others.": "पहली पट्टी की मार्गदर्शक रेखा से बाकी पट्टियाँ नापो।",
    "84 − 12 = 72, 108 − 12 = 96: took 12 away": "84 − 12 = 72, 108 − 12 = 96: 12 घटाए",
    "84 ÷ 12 = 7, 108 ÷ 12 = 9: divided by 12": "84 ÷ 12 = 7, 108 ÷ 12 = 9: 12 से भाग दिया",
    "Lowest Terms Ladder": "सरलतम रूप की सीढ़ी",
    "Free play. Step any fraction down with the tiles, then try a new one.": "मुक्त खेल। टाइलों से कोई भी भिन्न नीचे उतारो, फिर नया आज़माओ।",
    "How far can a fraction step down the ladder?": "भिन्न सीढ़ी पर कितना नीचे उतर सकता है?",
    "step": "कदम",
    "steps": "कदम",
    "Factors": "गुणनखंड",
    "Colour bars": "पट्टियाँ रंगो",
    "Guide line": "मार्गदर्शक रेखा",
    "New fraction": "नया भिन्न",
  },
  gu: {
    "Dividing both numbers by the same thing": "બંને સંખ્યાઓને એક જ સંખ્યાથી ભાગવી",
    "Tap the upper number to try dividing just that one.": "ઉપરની સંખ્યાને એકલી ભાગવા માટે તેના પર ટેપ કરો.",
    "Tap the upper number above the line.": "રેખાની ઉપરની સંખ્યા પર ટેપ કરો.",
    "Now tap the tile.": "હવે ટાઇલ પર ટેપ કરો.",
    "The tile is under the lists.": "ટાઇલ યાદીઓની નીચે છે.",
    "Both numbers must be divided by the same factor, or the amount changes.": "બંને સંખ્યાઓને એક જ અવયવથી ભાગો, નહીંતર જથ્થો બદલાઈ જાય છે.",
    "You learned: divide both numbers by the same common factor.": "તમે શીખ્યા: બંને સંખ્યાઓને એક જ સામાન્ય અવયવથી ભાગો.",
    "Divide both numbers of this fraction by the same factor to reduce it.": "આ અપૂર્ણાંકને સાદો કરવા બંને સંખ્યાઓને એક જ અવયવથી ભાગો.",
    "Step it down": "નીચે ઉતારો",
    "Which number is drawn in the same colour in both lists?": "તમારી બંને યાદીમાં કઈ સંખ્યા એક જ રંગની છે?",
    "Both numbers got smaller together, and the strip stayed where it was.": "બંને સંખ્યાઓ સાથે નાની થઈ, અને પટ્ટી ત્યાંની ત્યાં જ રહી.",
    "Reduce this fraction to its lowest terms.": "આ અપૂર્ણાંકને સૌથી સાદા રૂપમાં લખો.",
    "Lowest terms?": "સૌથી સાદું રૂપ?",
    "Did the upper and the lower number both get divided by one number?": "શું ઉપર અને નીચે, બંનેને એક જ સંખ્યાથી ભાગ્યા?",
    "The fraction is simpler now, and its strip has not moved.": "અપૂર્ણાંક હવે સાદો છે, અને તેની પટ્ટી હલી નથી.",
    "Now bring this one down to lowest terms the same way.": "હવે આને પણ આ જ રીતે સૌથી સાદા રૂપ સુધી લાવો.",
    "All the way down": "છેલ્લે સુધી ઉતારો",
    "Find the tile that fits both numbers, then use it.": "બંને સંખ્યાઓમાં બેસતી ટાઇલ શોધો, પછી તેનો ઉપયોગ કરો.",
    "Same amount, simpler writing.": "જથ્થો એ જ, લખાણ સાદું.",
    "Knowing when to stop": "ક્યારે અટકવું તે જાણવું",
    "Tap Factors to list what goes into each number.": "દરેક સંખ્યાના અવયવ લખવા માટે અવયવ પર ટેપ કરો.",
    "Tap the Factors key.": "અવયવ કી પર ટેપ કરો.",
    "Tap the shared tile to step down again.": "ફરી નીચે ઉતરવા સામાન્ય ટાઇલ પર ટેપ કરો.",
    "Tap the tile that goes into both.": "જે ટાઇલ બંનેમાં આવે છે તેના પર ટેપ કરો.",
    "A fraction is finished only when its two numbers share no factor bigger than 1.": "અપૂર્ણાંક ત્યારે પૂરો થાય જ્યારે બંને સંખ્યાઓમાં 1 થી મોટો સામાન્ય અવયવ ન હોય.",
    "You learned: stop when the two numbers share nothing but 1.": "તમે શીખ્યા: જ્યારે બંને સંખ્યાઓમાં 1 સિવાય કંઈ સામાન્ય ન રહે, ત્યારે અટકો.",
    "finished": "પૂરું થયું",
    "not yet": "હજી નહીં",
    "A child stopped at the last rung; is the work finished?": "એક બાળક છેલ્લા પગથિયા પર અટકી ગયું; શું કામ પૂરું થયું?",
    "Is it finished?": "શું આ પૂરું થયું?",
    "Open the factor lists for that last rung and compare them.": "તે છેલ્લા પગથિયાની અવયવ યાદીઓ ખોલો અને સરખાવો.",
    "Not yet. Six and nine still share three.": "હજી નહીં. 6 અને 9 માં હજી 3 સામાન્ય છે.",
    "yes": "હા",
    "no": "ના",
    "Another child stopped at the last rung; is it in lowest terms?": "બીજું બાળક છેલ્લા પગથિયા પર અટકી ગયું; શું આ સૌથી સાદું રૂપ છે?",
    "In lowest terms?": "સૌથી સાદા રૂપમાં?",
    "Does any factor bigger than 1 stand in both lists of that rung?": "શું 1 થી મોટો કોઈ અવયવ તે પગથિયાની બંને યાદીમાં છે?",
    "No. Nine and twelve still share three.": "ના. 9 અને 12 માં હજી 3 સામાન્ય છે.",
    "Reduce this fraction until nothing but one is shared.": "આ અપૂર્ણાંકને ત્યાં સુધી સાદો કરો જ્યાં સુધી 1 સિવાય કંઈ સામાન્ય ન રહે.",
    "Down to the last": "છેલ્લા સુધી",
    "After each step, check the lists again for a shared tile.": "દરેક પગલા પછી યાદીઓ ફરી જુઓ, કોઈ સામાન્ય ટાઇલ બાકી છે?",
    "Nothing but one is shared now, so the ladder stops.": "હવે 1 સિવાય કંઈ સામાન્ય નથી, એટલે નિસરણી અહીં અટકે છે.",
    "The long way and the short way": "લાંબો રસ્તો અને ટૂંકો રસ્તો",
    "Tap the first tile of ladder one for a small step.": "નાના પગલા માટે નિસરણી 1 ની પહેલી ટાઇલ પર ટેપ કરો.",
    "Look for the tile tagged one.": "1 ના ટેગવાળી ટાઇલ શોધો.",
    "Tap its next tile for another small step.": "બીજા નાના પગલા માટે તેની આગલી ટાઇલ પર ટેપ કરો.",
    "Ladder one still has a tile waiting.": "નિસરણી 1 ની એક ટાઇલ હજી બાકી છે.",
    "Now tap the tile of ladder two for one big step.": "હવે એક મોટા પગલા માટે નિસરણી 2 ની ટાઇલ પર ટેપ કરો.",
    "Look for the tile tagged two.": "2 ના ટેગવાળી ટાઇલ શોધો.",
    "A bigger shared factor takes fewer steps, and every route ends on the same rung.": "મોટો સામાન્ય અવયવ ઓછાં પગલાં લે છે, અને દરેક રસ્તો એક જ પગથિયા પર પહોંચે છે.",
    "You learned: every route down ends on the same lowest terms.": "તમે શીખ્યા: દરેક રસ્તો એ જ સૌથી સાદા રૂપ પર પહોંચે છે.",
    "Both ladders start from one fraction; do they end on the same rung?": "બંને નિસરણી એક જ અપૂર્ણાંકથી શરૂ થાય છે; શું તે એક જ પગથિયા પર પહોંચશે?",
    "Do they agree?": "શું બંને એકસરખા આવ્યા?",
    "Check each step of the long ladder: did any step change the amount?": "લાંબી નિસરણીનું દરેક પગલું તપાસો: શું કોઈ પગલાએ જથ્થો બદલ્યો?",
    "Small steps and one big step land on the same rung.": "નાનાં પગલાં અને એક મોટું પગલું, બંને એક જ પગથિયા પર પહોંચ્યા.",
    "Take both ladders down, then write the rung where they end.": "બંને નિસરણી નીચે ઉતારો, પછી જ્યાં તે મળે તે પગથિયું લખો.",
    "Where do both land?": "બંને ક્યાં પહોંચે છે?",
    "Does the same factor still go into both numbers on ladder one?": "શું નિસરણી 1 ની બંને સંખ્યાઓ હજી એ જ અવયવથી ભાગી શકાય છે?",
    "Again, both ladders end on the same fraction.": "ફરી, બંને નિસરણી એક જ અપૂર્ણાંક પર પૂરી થઈ.",
    "Bring this fraction down to its lowest terms in just one step.": "આ અપૂર્ણાંકને માત્ર એક પગલામાં સૌથી સાદા રૂપ સુધી લાવો.",
    "One step down": "એક પગલામાં નીચે",
    "The question wants one step, so one tile must do it all.": "પ્રશ્નમાં એક જ પગલું જોઈએ, એટલે એક ટાઇલે જ બધું કરવું પડે.",
    "Which tile is the biggest that goes into both numbers?": "બંને સંખ્યાઓમાં આવતી સૌથી મોટી ટાઇલ કઈ છે?",
    "Divide both by that tile in one step.": "બંનેને એ જ ટાઇલથી એક પગલામાં ભાગો.",
    "The biggest shared tile finished the whole ladder at once.": "સૌથી મોટી સામાન્ય ટાઇલે આખી નિસરણી એક જ વારમાં ઉતારી દીધી.",
    "The amount does not move": "જથ્થો બદલાતો નથી",
    "Tap Colour bars to fill the strip beside each rung.": "દરેક પગથિયા પાસેની પટ્ટી ભરવા પટ્ટીઓ રંગો પર ટેપ કરો.",
    "Tap the Colour bars key.": "પટ્ટીઓ રંગો કી પર ટેપ કરો.",
    "Now tap Guide line to run a line across the strips.": "હવે પટ્ટીઓ પર રેખા દોરવા માર્ગદર્શક રેખા પર ટેપ કરો.",
    "Tap the Guide line key.": "માર્ગદર્શક રેખા કી પર ટેપ કરો.",
    "The numbers shrink down the ladder, but the amount never moves.": "નિસરણીમાં સંખ્યાઓ નાની થાય છે, પણ જથ્થો ક્યારેય બદલાતો નથી.",
    "You learned: reducing changes the writing, never the amount.": "તમે શીખ્યા: સાદું કરવાથી લખાણ બદલાય છે, જથ્થો નહીં.",
    "less": "ઓછો",
    "more": "વધુ",
    "the same": "સરખો",
    "Is the amount on the last rung less than the first, more than it, or the same?": "શું છેલ્લા પગથિયાનો જથ્થો પહેલા કરતાં ઓછો છે, વધુ છે કે સરખો?",
    "Less, more or same?": "ઓછો, વધુ કે સરખો?",
    "Look at the top of the colour on the first strip.": "પહેલી પટ્ટીમાં રંગનો ઉપરનો છેડો જુઓ.",
    "The strips end in the same place.": "પટ્ટીઓ એક જ જગ્યાએ અટકે છે.",
    "bigger": "મોટો",
    "smaller": "નાનો",
    "Is the amount on rung one bigger than on rung two, smaller, or the same?": "શું પગથિયા 1 નો જથ્થો પગથિયા 2 કરતાં મોટો છે, નાનો છે કે સરખો?",
    "Bigger or smaller?": "મોટો કે નાનો?",
    "Put one finger on top of each strip's colour; where do the two fingers sit?": "દરેક પટ્ટીના રંગના ઉપરના છેડે એક આંગળી મૂકો; બંને આંગળીઓ ક્યાં છે?",
    "They are the same amount written two ways.": "આ એ જ જથ્થો છે, બે રીતે લખેલો.",
    "Reduce this fraction and watch whether the strip moves on the way down.": "આ અપૂર્ણાંકને સાદો કરો અને જુઓ કે નીચે આવતાં પટ્ટી હલે છે કે નહીં.",
    "Down to lowest terms": "સૌથી સાદા રૂપ સુધી નીચે",
    "Did the tile take away from both numbers, or divide both?": "શું ટાઇલે બંને સંખ્યાઓમાંથી બાદ કર્યું, કે બંનેને ભાગ્યા?",
    "The strip never moved, only the writing got simpler.": "પટ્ટી ક્યારેય હલી નહીં, ફક્ત લખાણ સાદું થયું.",
    "What happens to the other number when you use that one?": "તેનો ઉપયોગ કરતાં બીજી સંખ્યાનું શું થાય છે?",
    "Divide the upper and the lower number by the very same shared factor.": "ઉપર અને નીચેની સંખ્યાને બરાબર એ જ સામાન્ય અવયવથી ભાગો.",
    "Write the factors of each number on the last rung.": "છેલ્લા પગથિયાની દરેક સંખ્યાના અવયવ લખો.",
    "Check every factor of the upper number against the lower number's list.": "ઉપરની સંખ્યાનો દરેક અવયવ નીચેની સંખ્યાની યાદીમાં જુઓ.",
    "What is written on the last rung of each ladder?": "દરેક નિસરણીના છેલ્લા પગથિયા પર શું લખ્યું છે?",
    "Count each ladder's steps, then compare the two last rungs.": "દરેક નિસરણીનાં પગલાં ગણો, પછી બંને છેલ્લાં પગથિયાં સરખાવો.",
    "Compare where the colour ends on the first and last strips.": "પહેલી અને છેલ્લી પટ્ટીમાં રંગ ક્યાં અટકે છે તે સરખાવો.",
    "Use the guide line from the first strip to measure the others.": "પહેલી પટ્ટીની માર્ગદર્શક રેખાથી બાકીની પટ્ટીઓ માપો.",
    "84 − 12 = 72, 108 − 12 = 96: took 12 away": "84 − 12 = 72, 108 − 12 = 96: 12 બાદ કર્યા",
    "84 ÷ 12 = 7, 108 ÷ 12 = 9: divided by 12": "84 ÷ 12 = 7, 108 ÷ 12 = 9: 12 થી ભાગ્યા",
    "Lowest Terms Ladder": "સૌથી સાદા રૂપની નિસરણી",
    "Free play. Step any fraction down with the tiles, then try a new one.": "મુક્ત રમત. ટાઇલોથી કોઈ પણ અપૂર્ણાંક નીચે ઉતારો, પછી નવો અજમાવો.",
    "How far can a fraction step down the ladder?": "અપૂર્ણાંક નિસરણી પર કેટલો નીચે ઉતરી શકે?",
    "step": "પગલું",
    "steps": "પગલાં",
    "Factors": "અવયવ",
    "Colour bars": "પટ્ટીઓ રંગો",
    "Guide line": "માર્ગદર્શક રેખા",
    "New fraction": "નવો અપૂર્ણાંક",
  },
};

/* One entry per phase = one mount. Item kinds (Work, judge and oracle switch on them):
   reduce  from [n, d]: the tray offers the shared factors; the answer is the lowest terms, typed on the next rung
   stop    rungs: a story child's ladder, stopped; choices: finished or not
   routes  from + routes: two ladders walked tile by tile; choices, or the rung where both end
   same    rungs: a written ladder with empty strips; choices: less, more or the same
   near    the item's misconception (nearMiss) */
const PHASES = [
  {
    n: 1,
    concept: "Dividing both numbers by the same thing",
    conceptId: "M1.S2.T4.C15", objectiveIds: ["O5"],
    steps: [
      { say: "Tap the upper number to try dividing just that one.", on: "alone", hint: "Tap the upper number above the line." },
      { say: "Now tap the tile.", on: "divide", hint: "The tile is under the lists." },
    ],
    stepHold: 2400,
    ladder: ["What happens to the other number when you use that one?", "Divide the upper and the lower number by the very same shared factor."],
    closing: "Both numbers must be divided by the same factor, or the amount changes.",
    learned: "You learned: divide both numbers by the same common factor.",
    traceback: "The shared factor divides both numbers; your fraction is drawn on a rung of its own beside the guide line.",
    items: [
      /* learn ML1: answer in the plan = 2/3 */
      { qid: "M1.S2.T4.C15:ML1", kind: "reduce", from: [14, 21], parts: SLOT_FRACTION, answer: [2, 3], near: "2|21", winMs: 3000,
        say: "Divide both numbers of this fraction by the same factor to reduce it.", ask: "Step it down",
        miss: "Which number is drawn in the same colour in both lists?",
        win: "Both numbers got smaller together, and the strip stayed where it was." },
      /* practice 1: answer in the plan = 2/5 */
      { qid: "M1.S2.T4.C15:1", kind: "reduce", from: [6, 15], parts: SLOT_FRACTION, answer: [2, 5], near: "2|15", winMs: 3000,
        say: "Reduce this fraction to its lowest terms.", ask: "Lowest terms?",
        miss: "Did the upper and the lower number both get divided by one number?",
        win: "The fraction is simpler now, and its strip has not moved." },
      /* practice 2: answer in the plan = 2/5 */
      { qid: "M1.S2.T4.C15:2", kind: "reduce", from: [10, 25], parts: SLOT_FRACTION, answer: [2, 5], near: "2|25", winMs: 3000,
        say: "Now bring this one down to lowest terms the same way.", ask: "All the way down",
        miss: "Find the tile that fits both numbers, then use it.",
        win: "Same amount, simpler writing." },
    ],
  },
  {
    n: 2,
    concept: "Knowing when to stop",
    conceptId: "M1.S2.T4.C16", objectiveIds: ["O5"],
    steps: [
      { say: "Tap Factors to list what goes into each number.", on: "factors", hint: "Tap the Factors key." },
      { say: "Tap the shared tile to step down again.", on: "divide", hint: "Tap the tile that goes into both." },
    ],
    stepHold: 2200,
    ladder: ["Write the factors of each number on the last rung.", "Check every factor of the upper number against the lower number's list."],
    closing: "A fraction is finished only when its two numbers share no factor bigger than 1.",
    learned: "You learned: stop when the two numbers share nothing but 1.",
    traceback: "Both factor lists open under the last rung, the shared factor lights in both, and the tray offers it again.",
    items: [
      /* learn ML2: answer in the plan = No. Six and nine still share three, so it goes on to 2/3 */
      { qid: "M1.S2.T4.C16:ML2", kind: "stop", rungs: [[24, 36], [6, 9]], answer: "not yet", near: "finished", winMs: 3000,
        choices: [{ id: "finished", label: "finished" }, { id: "not yet", label: "not yet" }],
        say: "A child stopped at the last rung; is the work finished?", ask: "Is it finished?",
        miss: "Open the factor lists for that last rung and compare them.",
        win: "Not yet. Six and nine still share three." },
      /* practice 3: answer in the plan = No, because nine and twelve still share three, so it goes on to 3/4 */
      { qid: "M1.S2.T4.C16:3", kind: "stop", rungs: [[18, 24], [9, 12]], answer: "no", near: "yes", winMs: 3000,
        choices: [{ id: "yes", label: "yes" }, { id: "no", label: "no" }],
        say: "Another child stopped at the last rung; is it in lowest terms?", ask: "In lowest terms?",
        miss: "Does any factor bigger than 1 stand in both lists of that rung?",
        win: "No. Nine and twelve still share three." },
      /* practice 4: answer in the plan = 3/4, and you stop because three and four share no factor except one */
      { qid: "M1.S2.T4.C16:4", kind: "reduce", from: [42, 56], parts: SLOT_FRACTION, answer: [3, 4], near: "6|8", winMs: 3000,
        say: "Reduce this fraction until nothing but one is shared.", ask: "Down to the last",
        miss: "After each step, check the lists again for a shared tile.",
        win: "Nothing but one is shared now, so the ladder stops." },
    ],
  },
  {
    n: 3,
    concept: "The long way and the short way",
    conceptId: "M1.S2.T4.C17", objectiveIds: ["O6"],
    steps: [
      { say: "Tap the first tile of ladder one for a small step.", on: "divide", hint: "Look for the tile tagged one." },
      { say: "Tap its next tile for another small step.", on: "divide", hint: "Ladder one still has a tile waiting." },
      { say: "Now tap the tile of ladder two for one big step.", on: "divide", hint: "Look for the tile tagged two." },
    ],
    stepHold: 2200,
    ladder: ["What is written on the last rung of each ladder?", "Count each ladder's steps, then compare the two last rungs."],
    closing: "A bigger shared factor takes fewer steps, and every route ends on the same rung.",
    learned: "You learned: every route down ends on the same lowest terms.",
    traceback: "Both ladders are walked to their ends, a ring joins the two last rungs and each step count is written.",
    items: [
      /* learn ML3: answer in the plan = Yes. Both routes end at 2/3 */
      { qid: "M1.S2.T4.C17:ML3", kind: "routes", from: [32, 48], routes: [[2, 2, 4], [16]], answer: "yes", near: "no", winMs: 3000,
        choices: [{ id: "yes", label: "yes" }, { id: "no", label: "no" }],
        say: "Both ladders start from one fraction; do they end on the same rung?", ask: "Do they agree?",
        miss: "Check each step of the long ladder: did any step change the amount?",
        win: "Small steps and one big step land on the same rung." },
      /* practice 5: answer in the plan = 3/5 both ways */
      { qid: "M1.S2.T4.C17:5", kind: "routes", from: [27, 45], routes: [[3, 3], [9]], parts: SLOT_FRACTION, answer: [3, 5], near: "9|45", winMs: 3000,
        say: "Take both ladders down, then write the rung where they end.", ask: "Where do both land?",
        miss: "Does the same factor still go into both numbers on ladder one?",
        win: "Again, both ladders end on the same fraction." },
      /* practice 6: answer in the plan = Twelve, and it gives 5/7 */
      { qid: "M1.S2.T4.C17:6", kind: "reduce", from: [60, 84], parts: SLOT_FRACTION, answer: [5, 7], near: "30|42", fromStart: true, winMs: 3000,
        say: "Bring this fraction down to its lowest terms in just one step.", ask: "One step down",
        miss: "The question wants one step, so one tile must do it all.",
        ladder: ["Which tile is the biggest that goes into both numbers?", "Divide both by that tile in one step."],
        win: "The biggest shared tile finished the whole ladder at once." },
    ],
  },
  {
    n: 4,
    concept: "The amount does not move",
    conceptId: "M1.S2.T4.C18", objectiveIds: ["O6"],
    steps: [
      { say: "Tap Colour bars to fill the strip beside each rung.", on: "colour", hint: "Tap the Colour bars key." },
      { say: "Now tap Guide line to run a line across the strips.", on: "line", hint: "Tap the Guide line key." },
    ],
    stepHold: 2200,
    ladder: ["Compare where the colour ends on the first and last strips.", "Use the guide line from the first strip to measure the others."],
    closing: "The numbers shrink down the ladder, but the amount never moves.",
    learned: "You learned: reducing changes the writing, never the amount.",
    traceback: "Every strip is coloured and the guide line is drawn across them, so the colour stops in the same place on each.",
    items: [
      /* learn ML4: answer in the plan = The same amount */
      { qid: "M1.S2.T4.C18:ML4", kind: "same", rungs: [[20, 32], [10, 16], [5, 8]], answer: "same", near: "less", winMs: 3000,
        choices: [{ id: "less", label: "less" }, { id: "more", label: "more" }, { id: "same", label: "the same" }],
        say: "Is the amount on the last rung less than the first, more than it, or the same?", ask: "Less, more or same?",
        miss: "Look at the top of the colour on the first strip.",
        win: "The strips end in the same place." },
      /* practice 7: answer in the plan = The same, because dividing both numbers of 22/33 by eleven gives 2/3 */
      { qid: "M1.S2.T4.C18:7", kind: "same", rungs: [[22, 33], [2, 3]], answer: "same", near: "bigger", winMs: 3000,
        choices: [{ id: "bigger", label: "bigger" }, { id: "smaller", label: "smaller" }, { id: "same", label: "the same" }],
        say: "Is the amount on rung one bigger than on rung two, smaller, or the same?", ask: "Bigger or smaller?",
        miss: "Put one finger on top of each strip's colour; where do the two fingers sit?",
        win: "They are the same amount written two ways." },
      /* practice 8: answer in the plan = 7/9, and the amount did not change at all, only the way it is written */
      { qid: "M1.S2.T4.C18:8", kind: "reduce", from: [84, 108], parts: SLOT_FRACTION, answer: [7, 9], near: "72|96", fromStart: true, winMs: 3000,
        say: "Reduce this fraction and watch whether the strip moves on the way down.", ask: "Down to lowest terms",
        miss: "Did the tile take away from both numbers, or divide both?",
        moves: ["84 − 12 = 72, 108 − 12 = 96: took 12 away", "84 ÷ 12 = 7, 108 ÷ 12 = 9: divided by 12"],
        win: "The strip never moved, only the writing got simpler." },
    ],
  },
];

/* ── the ladder's own helpers (lt… names: tools and the runtime share one scope) ───────────── */
const ltGcd = (a: number, b: number): number => (b ? ltGcd(b, a % b) : a);
const ltFactors = (x: number): number[] => { const o: number[] = []; for (let k = 1; k <= x; k++) if (x % k === 0) o.push(k); return o; };
/* prime factors with multiplicity: the most steps a fraction can take (one step a prime) */
const ltOmega = (x: number) => { let m = x, c = 0; for (let p = 2; p <= m; p++) while (m % p === 0) { m /= p; c++; } return c; };
const ltSharedOf = (n: number, d: number) => ltFactors(n).filter((f) => f > 1 && d % f === 0);
const ltLowest = (r: any) => ltGcd(r.n, r.d) === 1;
const ltLast = (lk: any) => lk.rungs[lk.rungs.length - 1];
/* the last rung the pencil has finished: the lists and the tray read this one */
const ltSettled = (lk: any) => { const r = lk.rungs, l = r[r.length - 1]; return l.sh >= 3 ? l : (r[r.length - 2] || l); };
/* free play's fractions: every one reaches lowest terms in at most three steps (four rungs) */
const LT_FREE = [[12, 18], [24, 36], [20, 32], [42, 56], [16, 40], [60, 84], [18, 24], [45, 60]];
/* the warm-up board of each phase's guide steps: none of them is a question's answer */
const LT_WARM: any = {
  1: { kind: "reduce", from: [9, 12] },
  2: { kind: "reduce", from: [10, 15], keyLists: true },
  3: { kind: "routes", from: [20, 30], routes: [[2, 5], [10]], seq: [0, 0, 1] },
  4: { kind: "same", rungs: [[18, 24], [9, 12], [3, 4]] },
};

/* geometry (work coordinates). The layout is made for the OPEN keypad: 900 wide, and it stays put when the keypad is shut.
   A rung is a card (cw x h) with its value strip (bw wide, bg away) beside it; the ladder is drawn big when it has at most
   three rungs, standard for four, and compact (two ladders) for the routes. */
const LG = { area: 900, trayS: 80, trayP: 90,
  std: { cw: 112, bw: 30, bg: 8, unit: 150, h: 166 },
  big: { cw: 136, bw: 36, bg: 10, unit: 182, h: 200 },
  cmp: { cw: 112, bw: 30, bg: 8, unit: 150, h: 140 },
  /* stop / same questions and the guide steps of phases 2 and 4: a ladder about 1.25 times as big (card 170 x 250, digits 64) */
  huge: { cw: 170, bw: 44, bg: 12, unit: 226, h: 250 } };
/* where the numerator box, the bar and the denominator box of a card of height h sit (the two boxes are the finger boxes of the
   answer card, at least 72 tall) */
const ltBoxes = (h: number) => { const bh = (h - 22) / 2; return [{ y: 8, h: bh }, { y: 14 + bh, h: bh }]; };
const ltLay = (h: number) => { const b = ltBoxes(h), bh = b[0].h; return { numC: 8 + bh / 2, barY: 8 + bh, denC: 14 + bh + bh / 2 }; };
/* the rungs a ladder can hold (the landing rung included) */
const ltCap = (it: any) => (it.kind === "routes" ? 1 + Math.max(...it.routes.map((r: number[]) => r.length))
  : it.kind === "stop" || it.kind === "same" ? it.rungs.length
    : 1 + ltOmega(ltGcd(it.from[0], it.from[1])));

/* a fresh board for an item: the ladders, the lists and what the child has opened */
const ltFresh = (it: any, ek: string) => {
  const rung = (n: number, d: number, f: any) => ({ n, d, f, sh: 3, mk: 2 });
  let L: any[];
  if (it.kind === "stop" || it.kind === "same") L = [{ rungs: it.rungs.map((r: number[], k: number) => rung(r[0], r[1], k ? it.rungs[k - 1][0] / r[0] : null)), route: null, used: 0, pend: null }];
  else if (it.kind === "routes") L = it.routes.map((rt: number[]) => ({ rungs: [rung(it.from[0], it.from[1], null)], route: rt, used: 0, pend: null }));
  else L = [{ rungs: [rung(it.from[0], it.from[1], null)], route: null, used: 0, pend: null }];
  const lists = (it.kind === "reduce" || it.kind === "free") && !it.keyLists;
  return { ek, fk: 0, L, lists, listN: lists ? 999 : 0, lit: false, col: it.kind === "same" ? 0 : 999, lineN: it.kind === "same" ? 0 : 999,
    join: false, alone: null, scratch: null, uroute: null, work: null, tr: false };
};

/* The numbers, rows, sizes and targets the working area needs (they go into the sidecar too). */
const MODEL = { rung: { w: LG.std.cw, h: LG.std.h }, bar: { w: LG.std.bw, h: LG.std.h }, maxRungs: 4, tile: { box: LG.trayS, pitch: LG.trayP }, freeFractions: LT_FREE };

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* judge: a lowest-terms question wants exactly its lowest terms; a word answer its choice */
const judge = (item: any, v: any) => {
  if (item.parts) return judgeSlotParts(item, v);
  return String(v).trim().toLowerCase() === String(item.answer).trim().toLowerCase();
};
/* oracle: a second route, sharing nothing with judge or Work: the common measure found by repeated subtraction,
   routes multiplied out, a stopped rung tried against every number, amounts compared by cross-multiplying */
const oracle = () => PHASES.every((p: any) => p.items.every((it: any) => {
  const measure = (a: number, b: number) => { while (a !== b) { if (a > b) a -= b; else b -= a; } return a; };
  if (it.kind === "reduce") {
    const m = measure(it.from[0], it.from[1]);
    return it.answer[0] === it.from[0] / m && it.answer[1] === it.from[1] / m;
  }
  if (it.kind === "routes") {
    const m = measure(it.from[0], it.from[1]), low = [it.from[0] / m, it.from[1] / m];
    const ends = it.routes.map((rt: number[]) => { const prod = rt.reduce((s: number, f: number) => s * f, 1); return [it.from[0] / prod, it.from[1] / prod]; });
    const agree = ends.every((e: number[]) => e[0] === low[0] && e[1] === low[1]);
    return it.parts ? agree && it.answer[0] === low[0] && it.answer[1] === low[1] : it.answer === (agree ? "yes" : "no");
  }
  if (it.kind === "stop") {
    const [a, b] = it.rungs[it.rungs.length - 1];
    let more = false;
    for (let t = 2; t <= Math.min(a, b); t++) if (a % t === 0 && b % t === 0) more = true;
    return it.answer === it.choices[more ? 1 : 0].id;
  }
  if (it.kind === "same") {
    const [a, b] = it.rungs[0], [c, e] = it.rungs[it.rungs.length - 1];
    const chain = it.rungs.every((r: number[], k: number) => k === 0 || (it.rungs[k - 1][0] * r[1] === it.rungs[k - 1][1] * r[0]));
    return chain && a * e === b * c && it.answer === "same";
  }
  return false;
}));
/* the item's misconception: the top divided alone, a stop too soon, a route doubted, smaller numbers read as a smaller amount */
const nearMiss = (item: any) => item.near;
/* the forms of an answer that no question, hint or ladder line may print (a word choice is the question's own list of options) */
const answerForms = (item: any) => (item.parts ? item.answer.filter((x: number) => x >= 10).flatMap((x: number) => [String(x), indian(x), words(x)]) : []);
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => item.answer;

/* the dev driver (stripped at port): every answer is typed on the card or chosen on the keys */
const HOOK: any = {};
const solve = (item: any, T: any) => (T.state().stage === "demo" ? HOOK.demo && HOOK.demo() : T.submit(item.answer));
const answer = (item: any, v: any) => undefined;
const check = () => (HOOK.check ? HOOK.check() : undefined);

/* ── drawing pieces ──────────────────────────────────────────────────────────────────────── */

/* the value strip: a strip of fixed length cut into d parts (up to 40 cuts), n of them filled deep blue from the bottom,
   the rest amber; white until it is drawn. A dark outline and dark cuts. */
function LtBar({ x, y, g, n, d, filled, ghost }: any) {
  const w = g.bw, h = g.h, fh = Math.max(0, Math.min(h, (h * n) / Math.max(d, 1)));
  const cuts = d > 1 && d <= 40 ? Array.from({ length: d - 1 }, (_, k) => y + h - (h * (k + 1)) / d) : [];
  /* an answer strip not yet filled: a dashed empty outline (an all-amber strip would read as zero) */
  if (ghost && !filled) return <rect x={x} y={y} width={w} height={h} rx={4} fill="none" stroke={CONTENT.line} strokeWidth={3} strokeDasharray="9 7" />;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill={filled ? tint(CONTENT.ten, 0.55) : "#FFFFFF"} />
      {filled && <rect x={x} y={y + h - fh} width={w} height={fh} fill="url(#gHundred)" />}
      {/* the golden satin ribbon (the plain strip above is the fallback), turned upright; the counted part is a deep blue over it */}
      <g transform={`translate(${x},${y + h}) rotate(-90)`}><Skin name="ribbon" x={0} y={0} w={h} h={w} /></g>
      {filled && fh > 0 && <rect x={x} y={y + h - fh} width={w} height={fh} fill={shade(CONTENT.hundred, 0.25)} fillOpacity={0.85} />}
      {filled && cuts.map((cy, k) => <line key={k} x1={x} x2={x + w} y1={cy} y2={cy} stroke={CONTENT.line} strokeWidth={1.4} strokeOpacity={0.7} />)}
      <rect x={x} y={y} width={w} height={h} fill="none" stroke={CONTENT.line} strokeWidth={3.5} />
    </g>
  );
}

/* the numeral size of a card: 3-digit numbers a size down */
const ltSize = (g: any, n: any, d: any) => (Math.max(String(n).length, String(d).length) >= 3 ? (g.h > 180 ? 52 : T.speech) : (g.h > 180 ? 64 : g.h > 150 ? T.xl : T.speech));

/* one rung: its card with the stacked fraction (written top to bottom as sh grows 1, 2, 3) and its strip beside it */
function LtRung({ x, y, g, n, d, sh = 3, filled = true, ring, dashed, C }: any) {
  const lay = ltLay(g.h), cx = x + g.cw / 2, size = ltSize(g, n, d);
  const bw = Math.min(g.cw - 20, Math.max(String(n).length, String(d).length) * size * 0.62 + 26);
  return (
    <g>
      <rect x={x} y={y} width={g.cw} height={g.h} rx={22} fill="#FFFFFF" stroke={dashed ? C.ink : C.rule} strokeWidth={dashed ? 3 : 2.5}
        strokeDasharray={dashed ? "10 8" : undefined} filter={dashed ? undefined : "url(#fShadowSoft)"} />
      {sh >= 1 && <text x={cx} y={y + lay.numC + size * 0.36} textAnchor="middle" fontSize={size} fontWeight={700} fill={C.ink}>{n}</text>}
      {sh >= 2 && <rect x={cx - bw / 2} y={y + lay.barY} width={bw} height={6} rx={3} fill={C.ink} />}
      {sh >= 3 && <text x={cx} y={y + lay.denC + size * 0.36} textAnchor="middle" fontSize={size} fontWeight={700} fill={C.ink}>{d}</text>}
      {sh >= 3 && <LtBar x={x + g.cw + g.bg} y={y} g={g} n={n} d={d} filled={filled} />}
      {ring && <rect x={x - 8} y={y - 8} width={g.cw + 16} height={g.h + 16} rx={28} fill="none" stroke={C.accent} strokeWidth={5} pointerEvents="none" />}
    </g>
  );
}

/* the step between two rungs: an arrow from each old number to its new one, the factor printed ONCE, between the two arrows
   (mk = how many the pencil has drawn: 0, 1 or 2) */
function LtStep({ x1, x2, y1, y2, f, mk = 2, sz = T.label, C }: any) {
  const ink = shade(CONTENT.bead, 0.25), mid = (x1 + x2) / 2;
  const one = (y: number, k: number) => (mk > k ? (
    <g key={k}>
      <line x1={x1} y1={y} x2={x2 - 14} y2={y} stroke={ink} strokeWidth={4} strokeLinecap="round" />
      <path d={`M ${x2 - 4} ${y} l -16 -10 v 20 z`} fill={ink} />
    </g>
  ) : null);
  return (
    <g pointerEvents="none">
      {one(y1, 0)}{one(y2, 1)}
      {mk >= 1 && <text x={mid} y={(y1 + y2) / 2 + sz * 0.36} textAnchor="middle" fontSize={sz} fontWeight={700} fill={ink}>{"÷" + f}</text>}
    </g>
  );
}

/* a ladder's last step into the answer card where two ladders meet: the usual PAIR of arrows, one to the numerator box and one
   to the denominator box, the factor printed once between them near their start */
function LtPair({ x1, y1a, y1b, x2, y2a, y2b, f, mk = 2, C }: any) {
  if (mk < 1) return null;
  const ink = shade(CONTENT.bead, 0.25), fr = 0.3;
  const arrow = (ya: number, yb: number, k: number) => {
    const a = Math.atan2(yb - ya, x2 - x1);
    return (
      <g key={k}>
        <line x1={x1} y1={ya} x2={x2 - 14 * Math.cos(a)} y2={yb - 14 * Math.sin(a)} stroke={ink} strokeWidth={4} strokeLinecap="round" />
        <path d="M 0 0 l -16 -10 v 20 z" transform={`translate(${x2},${yb}) rotate(${(a * 180) / Math.PI})`} fill={ink} />
      </g>
    );
  };
  const lx = x1 + (x2 - x1) * fr, ly = (y1a + (y2a - y1a) * fr + y1b + (y2b - y1b) * fr) / 2;
  return (
    <g pointerEvents="none">
      {arrow(y1a, y2a, 0)}{arrow(y1b, y2b, 1)}
      <text x={lx} y={ly + T.label * 0.36} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={ink}>{"÷" + f}</text>
    </g>
  );
}

/* a factor tile of the tray: rose, a toy key edge; quiet (white) when it is not the next one to use */
function LtTile({ x, y, f, quiet, ghost, C }: any) {
  const s = LG.trayS, size = String(f).length > 2 ? T.micro : T.label;
  return (
    <g filter={ghost ? "url(#fLift)" : undefined}>
      <rect x={x} y={y + 4} width={s} height={s} rx={16} fill={quiet ? C.rule : shade(CONTENT.bead, 0.15)} />
      <rect x={x} y={y} width={s} height={s} rx={16} fill={quiet ? "#FFFFFF" : tint(CONTENT.bead, 0.5)} stroke={quiet ? C.rule : shade(CONTENT.bead, 0.15)} strokeWidth={3} />
      <text x={x + s / 2} y={y + s / 2 + size * 0.36} textAnchor="middle" fontSize={size} fontWeight={700} fill={C.ink}>{f}</text>
    </g>
  );
}

/* ── the working area: 900 x 520 in the open state, origin at its top-left ────────────────── */
function Work({ phase, n, item, index, stage, wrong, typed, part, answerOn, cardKind, api, MODEL, step, stepOn, box, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();
  const free = stage === "free";
  const warm = !free && (stage === "demo" || stage === "teach") && LT_WARM[n] ? LT_WARM[n] : null;
  const base = free ? { kind: "free", from: LT_FREE[0] } : warm || item;
  const qk = free ? "free" : warm ? "w" + n : n + ":" + index;
  /* the board is keyed to the ENTRY (a question entered again opens fresh), derived during render: PATTERNS 18 */
  const qkRef = useRef(""), entRef = useRef(0);
  if (qkRef.current !== qk) { qkRef.current = qk; entRef.current += 1; }
  const ek = qk + "#" + entRef.current;
  const ekRef = useRef(ek); ekRef.current = ek;
  const [raw, setRaw] = useState<any>(() => ltFresh(base, ek));
  const S = raw.ek === ek ? raw : ltFresh(base, ek);
  const Sref = useRef(S); Sref.current = S;
  const upd = (fn: any) => setRaw((p: any) => (ekRef.current !== ek ? p : fn(p.ek === ek ? p : ltFresh(base, ek))));
  const put = (patch: any) => upd((s: any) => ({ ...s, ...patch }));
  const it = free ? { kind: "free", from: LT_FREE[S.fk || 0] } : base;
  const kind = it.kind;

  const busy = useRef(false), traceRef = useRef(0), lastKey = useRef(0);
  const showCard = !free && !warm && cardKind === "fraction" && !!item.parts;
  const landing = showCard && kind === "reduce";          /* the answer is typed on the next rung of the ladder */
  const compact = kind === "routes";
  const routeCard = showCard && compact;                  /* two ladders meet on ONE answer card: neither writes its last rung */
  const R = ltCap(it);
  /* stop / same questions and the guide steps of phases 2 and 4 draw the ladder 1.25 times as big (and the same with the pad open or shut) */
  const huge = !free && !compact && R <= 3 && (kind === "stop" || kind === "same" || (!!warm && n === 2));
  const g = compact ? LG.cmp : huge ? LG.huge : (!free && R <= 3 ? LG.big : LG.std);
  const ch = g.h, lay = ltLay(ch), boxes = ltBoxes(ch);
  /* 8 clear above, so a ring round a card stays inside the zone; a huge ladder with no lists is centred above the key's row, one
     that is followed by the factor lists stands at 16 so the lists and the tray fit under it */
  const top = huge ? (kind === "same" || (warm && n === 4) ? Math.round((432 - ch) / 2) : 16) : 8, rowY = compact ? [top, top + 156] : [top];
  const lp = 0;
  void lp;
  const room = compact ? 832 : 860;
  const p = R > 1 ? Math.min(huge ? 340 : 264, (room - g.unit) / (R - 1)) : 0;
  const x0 = compact ? 52 + (832 - ((R - 1) * p + g.unit)) / 2 : (LG.area - ((R - 1) * p + g.unit)) / 2;
  const colX = (c: number) => x0 + c * p;
  const L = S.L;
  const cur0 = ltSettled(L[0]);
  const win = stage === "win" || stage === "idle";
  const corr = !!wrong && stage === "ask" && JSON.stringify(slotPartsOf(typed, 2)) === JSON.stringify(slotPartsOf(wrong.value, 2));

  /* the lists' geometry: the two rows of factors of the last settled rung, tiles as big as the longest row allows */
  const listRows = [cur0.n, cur0.d].map((m: number, r: number) => ({ m, r, fs: ltFactors(m) }));
  const maxCount = Math.max(...listRows.map((x: any) => x.fs.length));
  const lpitch = Math.min(88, Math.floor((LG.area - 84 - 16) / maxCount)), lw = lpitch - 4, lh = 52;
  const lfont = lw >= 70 ? T.label : T.micro;
  const listY = [top + ch + 16, top + ch + 24 + lh];
  const listW = 84 + maxCount * lpitch - 4, listX0 = Math.max(0, (LG.area - listW) / 2);
  const bandY = compact ? 322 : listY[1] + lh + 14;
  const trayX = 16 + LG.std.unit + 24, sg = LG.std, sl = ltLay(sg.h);
  const cardY = (rowY[0] + rowY[1] + ch) / 2 - sg.h / 2;     /* the meeting card, centred between the two ladders */

  /* where the rungs stand: ladder k, rung i */
  const colOf = (k: number, i: number, lk: any) => (lk.route && i === lk.route.length ? R - 1 : i);
  const nap = (ms: number) => new Promise<void>((r) => setTimeout(r, reducedMotion() ? Math.min(ms, 25) : ms));
  const setRung = (k: number, i: number, patch: any) => upd((s: any) => {
    const NL = s.L.map((l: any) => ({ ...l, rungs: l.rungs.map((r: any) => ({ ...r })) }));
    if (NL[k] && NL[k].rungs[i]) Object.assign(NL[k].rungs[i], patch);
    return { ...s, L: NL };
  });
  const setPend = (k: number, patch: any) => upd((s: any) => {
    const NL = s.L.map((l: any) => ({ ...l }));
    if (NL[k] && NL[k].pend) NL[k].pend = { ...NL[k].pend, ...patch };
    return { ...s, L: NL };
  });
  /* the pencil's three points on a card of the band or a row: its numerator, bar and denominator */
  const scrPts = [{ x: 16 + sg.cw / 2, y: bandY + sl.numC }, { x: 16 + sg.cw / 2, y: bandY + sl.barY + 3 }, { x: 16 + sg.cw / 2, y: bandY + sl.denC }];
  const writePts = (cx: number, y: number) => [{ x: cx, y: y + lay.numC }, { x: cx, y: y + lay.barY + 3 }, { x: cx, y: y + lay.denC }];

  /* ── the acts, every one performed on screen by the pencil (ms 700: the shortest, so an act ends well inside 2 s) ── */
  /* divide ladder k's last rung by f: the pencil writes the two marks and the next rung (or, when the answer is typed on
     the landing rung, only the marks) */
  const doDivide = async (k: number, f: number, fin: boolean) => {
    const lk = Sref.current.L[k];
    if (!lk) return;
    const cur = ltLast(lk);
    if (!(f > 0) || cur.n % f || cur.d % f) return;
    const i = lk.rungs.length, nn = cur.n / f, dd = cur.d / f;
    const lastUsed = lk.route && lk.used + 1 === lk.route.length;
    const colNew = lastUsed ? R - 1 : i;
    const colPrev = colOf(k, i - 1, lk);
    const ry = rowY[k], mx = (colX(colPrev) + g.unit + colX(colNew)) / 2, cx = colX(colNew) + g.cw / 2;
    /* two ladders meeting on the card: the pencil draws one arrow from the last written rung to the card */
    const sx = colX(colPrev) + g.unit + 6, ex = colX(R - 1) - 6;
    const n1 = { x: sx, y: ry + lay.numC }, d1 = { x: sx, y: ry + lay.denC }, n2 = { x: ex, y: cardY + sl.numC }, d2 = { x: ex, y: cardY + sl.denC };
    upd((s: any) => {
      const NL = s.L.map((l: any) => ({ ...l, rungs: l.rungs.slice() }));
      if (fin) NL[k].pend = { f, mk: 0 }; else NL[k].rungs.push({ n: nn, d: dd, f, sh: 0, mk: 0 });
      NL[k].used += 1;
      return { ...s, L: NL, alone: null, scratch: null };
    });
    const pts = fin && routeCard ? [{ x: (n1.x + n2.x) / 2, y: (n1.y + n2.y) / 2 }, { x: (d1.x + d2.x) / 2, y: (d1.y + d2.y) / 2 }]
      : [{ x: mx, y: ry + lay.numC }, { x: mx, y: ry + lay.denC }].concat(fin ? [] : writePts(cx, ry));
    await api.act({ ms: 700, tool: "pencil", moves: "push", at: pts, onPoint: (j: number) => {
      if (j < 2) { if (fin) setPend(k, { mk: j + 1 }); else setRung(k, i, { mk: j + 1 }); } else setRung(k, i, { sh: j - 1 });
    } });
    if (fin) setPend(k, { mk: 2 }); else setRung(k, i, { sh: 3, mk: 2 });
    api.sfx.tick();
  };
  /* guide steps: only the awaited act may happen; any other live control reports itself and shows the step's hint */
  const guardStep = (name: string) => {
    if (stage !== "demo") return true;
    if (!stepOn) return false;
    if (stepOn !== name) { api.did(name); return false; }
    return true;
  };
  const divideTap = async (k: number, f: number) => {
    if (busy.current || S.tr) return;
    if (!guardStep("divide")) return;
    /* a guide step names the ladder whose tile it waits for: the other ladder's tile is a wrong act */
    if (stage === "demo" && warm && warm.seq && k !== warm.seq[step || 0]) { api.did("elsewhere"); return; }
    const lk = Sref.current.L[k];
    if (!lk || lk.pend) return;
    const cur = ltLast(lk);
    if (cur.sh < 3 || ltLowest(cur) || cur.n % f || cur.d % f) return;
    if (lk.route && lk.route[lk.used] !== f) return;
    busy.current = true;
    const fin = (landing && !lk.route && ltGcd(cur.n, cur.d) === f) || (routeCard && lk.used + 1 === lk.route.length);
    try { await doDivide(k, f, fin); } finally { busy.current = false; }
    api.did("divide");
  };
  /* try to divide the top (or the bottom) number alone: the pencil writes what that would make on a scratch rung */
  const tryAlone = async (side: string) => {
    if (busy.current || S.tr) return;
    if (!guardStep("alone")) return;
    const cur = ltSettled(Sref.current.L[0]), sh = ltSharedOf(cur.n, cur.d);
    if (!sh.length) { api.did("alone"); return; }
    const f = sh[0], n2 = side === "top" ? cur.n / f : cur.n, d2 = side === "top" ? cur.d : cur.d / f;
    busy.current = true;
    put({ alone: { n: n2, d: d2, sh: 0 } });
    try {
      await api.act({ ms: 700, tool: "pencil", moves: "push", at: scrPts,
        onPoint: (j: number) => upd((s: any) => (s.alone ? { ...s, alone: { ...s.alone, sh: j + 1 } } : s)) });
      upd((s: any) => (s.alone ? { ...s, alone: { ...s.alone, sh: 3 } } : s));
      api.sfx.settle();
    } finally { busy.current = false; }
    api.did("alone");
  };
  /* the two factor lists of the last settled rung, written tile by tile */
  const doLists = async () => {
    const pts: any[] = [];
    listRows.forEach((row: any) => row.fs.forEach((f: number, j: number) => pts.push({ x: listX0 + 84 + j * lpitch + lw / 2, y: listY[row.r] + lh / 2 })));
    put({ lists: true, listN: 0 });
    await api.act({ ms: 700, tool: "pencil", moves: "push", at: pts, onPoint: (j: number) => put({ listN: j + 1 }) });
    put({ listN: 999 });
    api.sfx.settle();
  };
  const barXs = (lk: any, k: number) => lk.rungs.map((r: any, i: number) => ({ x: colX(colOf(k, i, lk)) + g.cw + g.bg, sh: r.sh }));
  const doColour = async () => {
    const xs = barXs(Sref.current.L[0], 0);
    await api.act({ ms: 700, tool: "pencil", moves: "push", at: xs.map((b: any) => ({ x: b.x + g.bw / 2, y: rowY[0] + ch * 0.55 })), onPoint: (j: number) => put({ col: j + 1 }) });
    put({ col: 999 });
    api.sfx.settle();
  };
  const doLine = async () => {
    const lk = Sref.current.L[0], xs = barXs(lk, 0), first = lk.rungs[0], gy = rowY[0] + ch - (ch * first.n) / first.d;
    const pts: any[] = [];
    xs.forEach((b: any) => { pts.push({ x: b.x - 6, y: gy }); pts.push({ x: b.x + g.bw + 6, y: gy }); });
    await api.act({ ms: 700, tool: "pencil", moves: "draw", at: pts, onPoint: (j: number) => put({ lineN: Math.floor(j / 2) + 1 }) });
    put({ lineN: 999 });
    api.sfx.settle();
  };
  const doNew = async () => {
    const fk = ((Sref.current.fk || 0) + 1) % LT_FREE.length, fr = LT_FREE[fk];
    const nb = ltFresh({ kind: "free", from: fr }, ek);
    nb.fk = fk; nb.L[0].rungs[0].sh = 0;
    upd((s: any) => ({ ...nb, ek: s.ek }));
    const R2 = ltCap({ kind: "free", from: fr }), p2 = R2 > 1 ? Math.min(264, (860 - LG.std.unit) / (R2 - 1)) : 0;
    const x2 = (LG.area - ((R2 - 1) * p2 + LG.std.unit)) / 2 + LG.std.cw / 2;
    await api.act({ ms: 700, tool: "pencil", moves: "push", at: writePts(x2, rowY[0]), onPoint: (j: number) => setRung(0, 0, { sh: j + 1 }) });
    setRung(0, 0, { sh: 3 });
  };
  /* a key at the bottom centre: its label follows the act (the one key of a sequence) */
  const nRungs = L[0].rungs.length;
  const keyId = free ? "new"
    : (kind === "stop" || (warm && warm.keyLists)) ? (S.lists ? null : "factors")
      : kind === "same" ? (S.col < nRungs ? "colour" : S.lineN < nRungs ? "line" : null)
        : null;
  const KEY_TXT: any = { factors: "Factors", colour: "Colour bars", line: "Guide line", new: "New fraction" };
  const runKey = async (id: string) => {
    if (busy.current || S.tr) return;
    if (!guardStep(id)) return;
    busy.current = true;
    try {
      if (id === "factors") await doLists(); else if (id === "colour") await doColour(); else if (id === "line") await doLine(); else if (id === "new") await doNew();
    } finally { busy.current = false; }
    api.did(id);
  };
  const pressKey = (id: string) => {
    const t = Date.now();
    if (t - lastKey.current < 400) return;
    lastKey.current = t;
    void runKey(id);
  };
  /* the waiting step's act: Enter, the agent's check() and the dev solve() perform it */
  const actStep = (on: string) => {
    if (on === "divide") {
      const k = warm && warm.seq ? warm.seq[step || 0] : 0, lk = L[k];
      const f = lk.route ? lk.route[lk.used] : ltSharedOf(cur0.n, cur0.d)[0];
      if (f) void divideTap(k, f);
    } else if (on === "alone") void tryAlone("top");
    else pressKey(on);
  };
  api.onEnter(stage === "demo" && stepOn ? () => actStep(stepOn) : null);
  HOOK.demo = stage === "demo" && stepOn ? () => actStep(stepOn) : null;

  /* ── the traceback: finish the ladder the child left, show what their fraction is worth, end on the right answer ── */
  const trace = async () => {
    const my = ++traceRef.current;
    const alive = () => traceRef.current === my;
    api.lock(true);
    busy.current = true;
    upd((s: any) => ({ ...s, tr: true, alone: null }));
    try {
      if (kind === "reduce") {
        const lk = Sref.current.L[0], first = lk.rungs[0];
        if (item.fromStart && lk.rungs.length > 1) {
          /* "in one step" / "divide, not take away": the child's own rungs stay; the step from the FIRST rung is drawn beside them
             (under the ladder, the lists making room), ending on the card */
          const f = ltGcd(first.n, first.d), yU = rowY[0] + ch + 44, x1 = colX(0) + g.cw / 2, x2 = colX(lk.rungs.length) + g.cw / 2;
          await nap(250); if (!alive()) return;
          put({ lists: false, uroute: { f, mk: 0 } });
          await api.act({ ms: 700, tool: "pencil", moves: "draw", at: [{ x: x1, y: yU }, { x: x2, y: yU }, { x: x2, y: rowY[0] + ch + 8 }],
            onPoint: (j: number) => upd((s: any) => (s.uroute ? { ...s, uroute: { ...s.uroute, mk: j + 1 } } : s)) });
          upd((s: any) => (s.uroute ? { ...s, uroute: { ...s.uroute, mk: 3 } } : s));
        } else if (!lk.pend) {
          const cur = ltSettled(lk);
          if (!ltLowest(cur)) { await nap(300); if (!alive()) return; await doDivide(0, ltGcd(cur.n, cur.d), landing); }
        }
        if (!alive()) return;
        const wv = slotPartsOf(wrong.value, 2).map(Number), a = item.answer;
        if (wv[0] > 0 && wv[1] > 0 && !(wv[0] === a[0] && wv[1] === a[1])) {
          await nap(400); if (!alive()) return;
          if (item.moves && String(item.near) === wv.join("|")) {
            /* the child took the number away instead of dividing: the two moves are written as working, each named in words */
            put({ work: { a: 0, b: 0 } });
            for (let j = 0; j < 2; j++) {
              const y = bandY + 40 + j * 58;
              await api.act({ ms: 700, tool: "pencil", moves: "push", at: [150, 320, 490, 660].map((x) => ({ x, y: y - 8 })),
                onPoint: (q: number) => upd((s: any) => (s.work ? { ...s, work: { ...s.work, [j === 0 ? "a" : "b"]: (q + 1) / 4 } } : s)) });
              upd((s: any) => (s.work ? { ...s, work: { ...s.work, [j === 0 ? "a" : "b"]: 1 } } : s));
            }
          } else {
            put({ scratch: { n: wv[0], d: wv[1], sh: 0 } });
            await api.act({ ms: 700, tool: "pencil", moves: "push", at: scrPts,
              onPoint: (j: number) => upd((s: any) => (s.scratch ? { ...s, scratch: { ...s.scratch, sh: j + 1 } } : s)) });
            upd((s: any) => (s.scratch ? { ...s, scratch: { ...s.scratch, sh: 3 } } : s));
          }
        }
      } else if (kind === "routes") {
        for (let k = 0; k < Sref.current.L.length; k++) {
          while (alive() && Sref.current.L[k].used < Sref.current.L[k].route.length) {
            await nap(250);
            if (!alive()) return;
            const lk = Sref.current.L[k];
            if (lk.used >= lk.route.length) break;
            await doDivide(k, lk.route[lk.used], routeCard && lk.used + 1 === lk.route.length);
          }
        }
        if (!alive()) return;
        if (!routeCard) put({ join: true });
      } else if (kind === "stop") {
        if (!Sref.current.lists) await doLists();
        if (!alive()) return;
        await nap(300);
        put({ lit: true });
      } else if (kind === "same") {
        if (Sref.current.col < 999) await doColour();
        if (!alive()) return;
        if (Sref.current.lineN < 999) await doLine();
      }
      await nap(1400);
    } finally {
      if (alive()) { upd((s: any) => ({ ...s, tr: false })); busy.current = false; api.lock(false); }
    }
  };
  /* at the right answer, work the child did not do is drawn at once, so the win line never describes what is not on screen */
  const quickStep = (k: number, f: number, fin: boolean) => upd((st: any) => {
    const NL = st.L.map((l: any) => ({ ...l, rungs: l.rungs.slice() }));
    const cur = NL[k].rungs[NL[k].rungs.length - 1];
    if (fin) NL[k].pend = { f, mk: 2 }; else NL[k].rungs.push({ n: cur.n / f, d: cur.d / f, f, sh: 3, mk: 2 });
    NL[k].used += 1;
    return { ...st, L: NL };
  });
  const winWork = async () => {
    const my = ++traceRef.current, alive = () => traceRef.current === my, s0 = Sref.current;
    if (kind === "reduce") {
      const lk = s0.L[0], cur = ltSettled(lk);
      if (!lk.pend && !ltLowest(cur)) quickStep(0, ltGcd(cur.n, cur.d), landing);
    } else if (kind === "routes") {
      for (let k = 0; k < s0.L.length; k++) {
        const rt = s0.L[k].route;
        for (let u = s0.L[k].used; u < rt.length; u++) { await nap(220); if (!alive()) return; quickStep(k, rt[u], routeCard && u + 1 === rt.length); }
      }
      if (!routeCard) put({ join: true });
    } else if (kind === "stop") {
      if (!s0.lists || !s0.lit) { put({ lists: true, listN: 999 }); await nap(250); if (!alive()) return; put({ lit: true }); }
    } else if (kind === "same") {
      if (s0.col < 999) put({ col: 999 });
      await nap(250); if (!alive()) return;
      if (s0.lineN < 999) put({ lineN: 999 });
    }
  };
  useEffect(() => { if (stage === "win" && !free && !warm) void winWork(); }, [stage, index]);
  useEffect(() => {
    if (!wrong || stage !== "ask") return;
    void trace();
  }, [wrong]);
  /* a new entry (a new question, a phase, free play) stops what the old one was doing and gives the pad back */
  useEffect(() => () => { traceRef.current++; tl.stop(); busy.current = false; api.lock(false); }, [ek]);

  /* the win line: said at the right answer; a phase's last one gives way to its closing (PATTERNS 18) */
  useEffect(() => { if (stage === "win" && item && item.win) api.say(item.win); }, [stage, index]);

  /* ── drag: a tile dropped on its ladder's last rung divides both numbers ── */
  const drag = useDrag((pay: any, pt: any, moved: boolean) => {
    if (!moved) { void divideTap(pay.k, pay.f); return; }
    const lk = Sref.current.L[pay.k], c = colOf(pay.k, lk.rungs.length - 1, lk), x = colX(c), y = rowY[pay.k];
    if (pt.x > x - 30 && pt.x < x + g.unit + 30 && pt.y > y - 30 && pt.y < y + ch + 30) void divideTap(pay.k, pay.f);
    else if (stage === "demo" && stepOn && !busy.current) api.did("elsewhere");   /* a drop that missed its rung (or left the canvas) is a wrong act: the step's hint shows */
  });
  const dragging = drag.drag && drag.drag.moved ? drag.drag.payload : null;

  /* the tray: the shared factors above one of the last settled rung (a route's tiles one after another on two ladders) */
  const runLive = !S.tr && (stage === "ask" || stage === "demo" || free);
  const trayF: number[] = (kind === "reduce" || kind === "free") && S.lists && !L[0].pend ? ltSharedOf(cur0.n, cur0.d) : [];
  const doneL = (kind === "reduce" || kind === "free") && S.lists && ltLowest(cur0) && !L[0].pend;
  const stepTileK = warm && warm.seq ? warm.seq[step || 0] : 0;

  api.share({
    numerator: cur0.n, denominator: cur0.d, rungs: L[0].rungs.length, factorsShown: !!S.lists,
    sharedFactors: kind === "stop" && !S.lit ? [] : trayF, secondLadder: L.length > 1, complete: stage === "idle",
  });

  /* ── pieces drawn from the state ── */
  const shown: string[] = (win || corr) && item && Array.isArray(item.answer) ? item.answer.map(String) : slotPartsOf(typed, 2);
  /* the answer card, a rung-sized card with two finger boxes of at least 72 (PATTERNS 9e); called, not mounted */
  const ansCard = (x: number, y: number, gg: any) => {
    const open = !!box.open, live = answerOn === "card" && !S.tr, active = open && live && !corr ? part : -1;
    const bx = x + 8, bw2 = gg.cw - 16, ly = ltLay(gg.h);
    const ansSz = Math.max(String(shown[0]).length, String(shown[1]).length) >= 3 ? Math.min(ltSize(gg, 100, 1), T.speech + 8) : ltSize(gg, 1, 1);
    const bs = ltBoxes(gg.h).map((b: any) => ({ y: y + b.y, h: b.h }));
    return (
      <g>
        <rect x={x} y={y} width={gg.cw} height={gg.h} rx={22} fill="#FFFFFF" stroke={live && !open ? C.accent : C.rule} strokeWidth={live && !open ? 4 : 2.5} filter="url(#fShadowSoft)" />
        {bs.map((b: any, j: number) => (
          <g key={j}>
            <rect x={bx} y={b.y} width={bw2} height={b.h} rx={12} fill={tint(C.panel, 0.55)} stroke={active === j ? C.accent : C.rule} strokeWidth={active === j ? 4 : 2} />
            <text x={x + gg.cw / 2} y={b.y + b.h / 2 + ansSz * 0.36} textAnchor="middle" fontSize={ansSz} fontWeight={700} fill={C.ink}>{shown[j]}</text>
            {active === j && <rect className="c4-caret" x={x + gg.cw / 2 + String(shown[j]).length * ansSz * 0.31 + 4} y={b.y + (b.h - ansSz * 0.8) / 2} width={4} height={ansSz * 0.8} rx={2} fill={C.accent} />}
          </g>
        ))}
        <rect x={bx + 6} y={y + ly.barY} width={bw2 - 12} height={6} rx={3} fill={C.ink} />
        {live && !open && <BlinkRing x={x} y={y} w={gg.cw} h={gg.h} rx={22} C={C} />}
        {live && !open && <SlotPartBox id="answer-open" label="Answer card" x={x} y={y} w={gg.cw} h={gg.h} enabled onPick={api.openAnswer} />}
        {live && open && <SlotPartBox id="part-1" label="numerator" x={bx} y={bs[0].y} w={bw2} h={bs[0].h} on={active === 0} enabled onPick={() => api.pickPart(0)} />}
        {live && open && <SlotPartBox id="part-2" label="denominator" x={bx} y={bs[1].y} w={bw2} h={bs[1].h} on={active === 1} enabled onPick={() => api.pickPart(1)} />}
      </g>
    );
  };

  /* the guide line: level with the first rung's fill, across every strip that is drawn */
  const guideSegs = (k: number, lk: any, extraX: number | null) => {
    const first = lk.rungs[0], gy = rowY[k] + ch - (ch * first.n) / first.d;
    const xs = barXs(lk, k).filter((b: any) => b.sh >= 3).map((b: any) => b.x);
    if (extraX !== null) xs.push(extraX);
    const upto = kind === "same" ? S.lineN : 999;
    return xs.map((bx: number, j: number) => (j < upto ? <line key={j} x1={bx - 7} x2={bx + g.bw + 7} y1={gy} y2={gy} stroke={CONTENT.line} strokeWidth={3} strokeDasharray="9 6" pointerEvents="none" /> : null));
  };

  /* the ladders: rungs, arrows, the landing rung, the guide line */
  const ladders = L.map((lk: any, k: number) => {
    const ry = rowY[k];
    const lastIdx = lk.rungs.length - 1;
    const landX = colX(colOf(k, lk.rungs.length, lk));
    const showLand = landing && k === 0;
    const bars = kind === "same" ? S.col : 999;
    return (
      <g key={"lad" + k}>
        {compact && (
          <g pointerEvents="none">
            <circle cx={26} cy={ry + ch / 2} r={22} fill={C.accent} />
            <text x={26} y={ry + ch / 2 + T.label * 0.36} textAnchor="middle" fontSize={T.label} fontWeight={700} fill="#FFFFFF">{k + 1}</text>
          </g>
        )}
        {compact && !routeCard && lk.route && lk.used < lk.route.length && lastIdx < R - 1 && (
          <rect x={colX(R - 1)} y={ry} width={g.cw} height={ch} rx={22} fill={tint(C.panel, 0.4)} stroke={C.rule} strokeWidth={2.5} strokeDasharray="12 10" pointerEvents="none" />
        )}
        {lk.rungs.map((r: any, i: number) => (i > 0 ? (
          <LtStep key={"s" + i} x1={colX(colOf(k, i - 1, lk)) + g.unit + 6} x2={colX(colOf(k, i, lk)) - 6} y1={ry + lay.numC} y2={ry + lay.denC} f={r.f} mk={r.mk} sz={T.label} C={C} />
        ) : null))}
        {lk.pend && !routeCard && <LtStep x1={colX(colOf(k, lastIdx, lk)) + g.unit + 6} x2={landX - 6} y1={ry + lay.numC} y2={ry + lay.denC} f={lk.pend.f} mk={lk.pend.mk} sz={T.label} C={C} />}
        {lk.pend && routeCard && <LtPair x1={colX(colOf(k, lastIdx, lk)) + g.unit + 6} y1a={ry + lay.numC} y1b={ry + lay.denC} x2={colX(R - 1) - 6} y2a={cardY + sl.numC} y2b={cardY + sl.denC} f={lk.pend.f} mk={lk.pend.mk} C={C} />}
        {lk.rungs.map((r: any, i: number) => (
          <LtRung key={"u" + i} x={colX(colOf(k, i, lk))} y={ry} g={g} n={r.n} d={r.d} sh={r.sh} filled={i < bars}
            ring={i === lastIdx && r.sh >= 3 && ((doneL && k === 0) || S.join)} C={C} />
        ))}
        {showLand && (
          <g>
            {ansCard(landX, ry, g)}
            <LtBar x={landX + g.cw + g.bg} y={ry} g={g} n={item.answer[0]} d={item.answer[1]} filled={win} ghost />
          </g>
        )}
        {guideSegs(k, lk, showLand && win ? landX + g.cw + g.bg : null)}
      </g>
    );
  });

  /* the factor lists of the last settled rung */
  const sharedSet = listRows[0].fs.filter((f: number) => listRows[1].fs.indexOf(f) >= 0);
  const hl = kind !== "stop" || S.lit;
  const showLists = (kind === "reduce" || kind === "free" || kind === "stop") && S.lists;
  let seen = 0;
  const listsJsx = showLists ? listRows.map((row: any) => (
    <g key={"row" + row.r}>
      <rect x={listX0} y={listY[row.r]} width={74} height={lh} rx={14} fill={tint(C.panel, 0.5)} stroke={C.rule} strokeWidth={2} />
      <text x={listX0 + 37} y={listY[row.r] + lh / 2 + T.label * 0.36} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{row.m}</text>
      {row.fs.map((f: number, j: number) => {
        const on = seen++ < S.listN, sh = hl && sharedSet.indexOf(f) >= 0;
        return on ? (
          <g key={f}>
            <rect x={listX0 + 84 + j * lpitch} y={listY[row.r]} width={lw} height={lh} rx={12}
              fill={sh ? tint(CONTENT.bead, 0.5) : "#FFFFFF"} stroke={sh ? shade(CONTENT.bead, 0.15) : C.rule} strokeWidth={sh ? 3 : 2} />
            <text x={listX0 + 84 + j * lpitch + lw / 2} y={listY[row.r] + lh / 2 + lfont * 0.36} textAnchor="middle" fontSize={lfont} fontWeight={700} fill={C.ink}>{f}</text>
          </g>
        ) : null;
      })}
    </g>
  )) : null;

  /* the tray and its tiles */
  const tileId = (k: number, f: number) => (stage === "demo" ? "divide" : "tile-" + k + "-" + f);
  const tileG = (k: number, f: number, x: number, y: number, live: boolean, soft?: boolean) => {
    const pay = { k, f };
    const hidden = dragging && dragging.k === k && dragging.f === f;
    return (
      <g key={"t" + k + "-" + f + "-" + x} className={live ? "c4-piece" : undefined} opacity={hidden ? 0.35 : 1}
        {...(live ? { ...control(tileId(k, f), "Divide both numbers by " + f), ...drag.bind(pay), ...drag.keys(pay) } : {})}>
        {live && <rect x={x} y={y} width={LG.trayS} height={LG.trayS} fill="transparent" />}
        <LtTile x={x} y={y} f={f} quiet={!live && !soft} C={C} />
      </g>
    );
  };
  let trayJsx: any = null, trayInvite: any = null;
  if (!compact) {
    const tiles = trayF.length ? trayF : (kind === "stop" && S.lit ? ltSharedOf(cur0.n, cur0.d) : []);
    const liveT = runLive && kind !== "stop";
    if (tiles.length) {
      trayJsx = (
        <g>
          <rect x={trayX - 10} y={bandY + 2} width={tiles.length * LG.trayP + 10} height={LG.trayS + 24} rx={20} fill={tint(C.panel, 0.5)} stroke={C.rule} strokeWidth={2} />
          {tiles.map((f: number, j: number) => tileG(0, f, trayX + j * LG.trayP, bandY + 14, liveT, kind === "stop"))}
        </g>
      );
      if (stage === "demo" && stepOn === "divide") trayInvite = { x: trayX + LG.trayS / 2, y: bandY + 14 + LG.trayS / 2, w: LG.trayS, h: LG.trayS };
    } else if (doneL && (warm || free || !landing)) {
      trayJsx = (
        <g pointerEvents="none">
          <rect x={trayX} y={bandY + 20} width={140} height={60} rx={30} fill={CONTENT.one} />
          <path d={`M ${trayX + 50} ${bandY + 50} l 14 14 l 28 -30`} fill="none" stroke="#FFFFFF" strokeWidth={9} strokeLinecap="round" strokeLinejoin="round" />
        </g>
      );
    }
  } else {
    trayJsx = (
      <g>
        {L.map((lk: any, k: number) => {
          const gy = bandY + k * 100, rest = lk.route.slice(lk.used);
          return (
            <g key={"grp" + k}>
              <circle cx={26} cy={gy + 40} r={22} fill={C.accent} />
              <text x={26} y={gy + 40 + T.label * 0.36} textAnchor="middle" fontSize={T.label} fontWeight={700} fill="#FFFFFF">{k + 1}</text>
              {rest.map((f: number, j: number) => tileG(k, f, 64 + j * LG.trayP, gy, j === 0 && runLive && !lk.pend))}
              {!rest.length && <text x={64} y={gy + 40 + T.speech * 0.36} fontSize={T.speech} fontWeight={700} fill={C.ink}>{lk.used + " " + tx(lk.used === 1 ? "step" : "steps")}</text>}
            </g>
          );
        })}
      </g>
    );
    if (stage === "demo" && stepOn === "divide") {
      const gy = bandY + stepTileK * 100;
      trayInvite = { x: 64 + LG.trayS / 2, y: gy + LG.trayS / 2, w: LG.trayS, h: LG.trayS };
    }
  }
  /* the ring that joins the two last rungs of the two ladders */
  const joinJsx = compact && S.join ? (
    <rect x={colX(R - 1) - 10} y={rowY[0] - 5} width={g.unit + 20} height={rowY[1] + ch - rowY[0] + 10} rx={26} fill="none" stroke={shade(CONTENT.bead, 0.2)} strokeWidth={5} pointerEvents="none" />
  ) : null;

  /* the child's own fraction on a scratch rung, with the guide level marked on its strip */
  const sc = S.alone || S.scratch;
  const first0 = L[0].rungs[0];
  /* a scratch rung (scaled k2) with the guide level dashed on its right and a solid tick at its own colour end on its left */
  const scrDraw = (x: number, o: any, k2: number, dashed: boolean) => (
    <g key={"scr" + x} transform={`translate(${x},${bandY}) scale(${k2})`}>
      <LtRung x={0} y={0} g={sg} n={o.n} d={o.d} sh={o.sh} filled dashed={dashed} C={C} />
      {o.sh >= 3 && (
        <g>
          <line x1={sg.cw + sg.bg - 7} x2={sg.cw + sg.bg + sg.bw + 7} y1={sg.h - (sg.h * first0.n) / first0.d} y2={sg.h - (sg.h * first0.n) / first0.d} stroke={CONTENT.line} strokeWidth={3} strokeDasharray="9 6" />
          <line x1={sg.cw + sg.bg - 18} x2={sg.cw + sg.bg} y1={sg.h - (sg.h * o.n) / o.d} y2={sg.h - (sg.h * o.n) / o.d} stroke={shade(CONTENT.bead, 0.3)} strokeWidth={5} strokeLinecap="round" />
        </g>
      )}
    </g>
  );
  const scratchJsx = sc && !compact ? (
    <g pointerEvents="none">{scrDraw(16, sc, 1, true)}</g>
  ) : null;
  /* the two moves of a take-away near miss, as working lines written under the lists (no strips to compare) */
  const workJsx = S.work && !compact ? (
    <g pointerEvents="none">
      {[0, 1].map((j: number) => {
        const w = j === 0 ? S.work.a : S.work.b, y = bandY + 40 + j * 58;
        return w > 0 ? (
          <g key={"wk" + j}>
            <clipPath id={"lt-wk-" + j}><rect x={0} y={y - 40} width={16 + w * 880} height={56} /></clipPath>
            <text x={16} y={y} fontSize={T.label} fontWeight={700} fill={C.ink} clipPath={"url(#lt-wk-" + j + ")"}>{tx(item.moves[j])}</text>
          </g>
        ) : null;
      })}
    </g>
  ) : null;
  /* the step from the first rung, drawn under the ladder beside the child's own rungs, into the card */
  const uJsx = S.uroute && landing ? (() => {
    const u = S.uroute, yU = rowY[0] + ch + 44, x1 = colX(0) + g.cw / 2, x2 = colX(L[0].rungs.length) + g.cw / 2, yT = rowY[0] + ch + 8, ink = shade(CONTENT.bead, 0.25);
    return (
      <g pointerEvents="none" stroke={ink} strokeWidth={4} strokeLinecap="round" fill="none">
        {u.mk >= 1 && <line x1={x1} y1={rowY[0] + ch + 6} x2={x1} y2={yU} />}
        {u.mk >= 2 && <line x1={x1} y1={yU} x2={x2} y2={yU} />}
        {u.mk >= 3 && <line x1={x2} y1={yU} x2={x2} y2={yT + 12} />}
        {u.mk >= 3 && <path d={`M ${x2} ${yT} l -10 16 h 20 z`} fill={ink} stroke="none" />}
        {u.mk >= 2 && <text x={(x1 + x2) / 2} y={yU - 12} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={ink} stroke="none">{"÷" + u.f}</text>}
      </g>
    );
  })() : null;
  /* both numbers of the rung light together while one alone is tried */
  const lastCol = colOf(0, L[0].rungs.length - 1, L[0]);
  const aloneRings = S.alone && !compact ? (
    <g pointerEvents="none">
      {boxes.map((b: any, j: number) => <rect key={j} x={colX(lastCol) + 6} y={rowY[0] + b.y} width={g.cw - 12} height={b.h} rx={14} fill="none" stroke={C.accent} strokeWidth={5} />)}
    </g>
  ) : null;
  /* the top and bottom number of the last rung are live: tapping one tries to divide it alone */
  const aloneOn = !compact && (free || (warm && n === 1)) && (kind === "reduce" || kind === "free") && S.lists && runLive && !L[0].pend && ltSharedOf(cur0.n, cur0.d).length > 0 && ltLast(L[0]).sh >= 3;
  const aloneHits = aloneOn ? (
    <g>
      <Hit id="alone" label="Top number alone" x={colX(lastCol) + 8} y={rowY[0] + boxes[0].y} w={g.cw - 16} h={boxes[0].h} onPress={() => void tryAlone("top")} />
      <Hit id="alone-bottom" label="Bottom number alone" x={colX(lastCol) + 8} y={rowY[0] + boxes[1].y} w={g.cw - 16} h={boxes[1].h} onPress={() => void tryAlone("bottom")} />
    </g>
  ) : null;
  const aloneInvite = stage === "demo" && stepOn === "alone" && aloneOn ? { x: colX(lastCol) + g.cw / 2, y: rowY[0] + boxes[0].y + boxes[0].h / 2, w: g.cw - 16, h: boxes[0].h } : null;

  /* the answer card of a routes question: where the two ladders meet, with its strip */
  const bandCard = routeCard ? (
    <g>
      {ansCard(colX(R - 1), cardY, sg)}
      <LtBar x={colX(R - 1) + sg.cw + sg.bg} y={cardY} g={sg} n={item.answer[0]} d={item.answer[1]} filled={win} ghost />
    </g>
  ) : null;

  /* the one key at the bottom centre */
  const keyW = 260, keyX = LG.area / 2 - keyW / 2, keyY = 440;
  const keyJsx = keyId ? (
    <Key id={keyId} label={tx(KEY_TXT[keyId])} x={keyX} y={keyY} w={keyW} h={72} C={C} tone="key" onClick={() => pressKey(keyId)}>
      <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={toneInk("key", C.ink)}>{tx(KEY_TXT[keyId])}</text>
    </Key>
  ) : null;
  const keyInvite = keyId && stage === "demo" && stepOn === keyId ? { x: keyX + keyW / 2, y: keyY + 36, w: keyW, h: 72 } : null;
  const inv = trayInvite || aloneInvite || keyInvite;

  return (
    <g>
      <style>{`.c4-piece{cursor:grab}`}</style>
      {ladders}
      {joinJsx}
      {aloneRings}
      {listsJsx}
      {trayJsx}
      {scratchJsx}
      {workJsx}
      {uJsx}
      {bandCard}
      {aloneHits}
      {keyJsx}
      {dragging && (
        <g pointerEvents="none">
          <LtTile x={Math.max(0, Math.min(LG.area - LG.trayS, drag.drag.x - LG.trayS / 2))} y={Math.max(0, Math.min(box.h - LG.trayS, drag.drag.y - LG.trayS / 2))} f={dragging.f} ghost C={C} />
        </g>
      )}
      {inv && <Invite x={inv.x} y={inv.y} w={inv.w} h={inv.h} C={C} />}
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase: the fraction the phase worked on and its
   lowest terms, one amount with two names */
function Thumb({ n, result, it, C, w, h, lang = "en", tx = (v: any) => v }: any) {
  const last = result && result.last;
  const item: any = it || (last && PHASES[(n || 1) - 1] ? PHASES[(n || 1) - 1].items[last.item] : null);
  if (!item) return null;
  const low = (a: number, b: number) => { const g = ltGcd(a, b); return [a / g, b / g]; };
  const pair = item.kind === "same" ? [item.rungs[0], item.rungs[item.rungs.length - 1]]
    : item.kind === "stop" ? [item.rungs[0], low(item.rungs[0][0], item.rungs[0][1])]
      : [item.from, low(item.from[0], item.from[1])];
  const frac = (cx: number, a: number, b: number) => (
    <g>
      <text x={cx} y={h / 2 - 8} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={C.ink}>{a}</text>
      <rect x={cx - 26} y={h / 2 - 2} width={52} height={4} rx={2} fill={C.ink} />
      <text x={cx} y={h / 2 + 30} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={C.ink}>{b}</text>
    </g>
  );
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      {frac(w * 0.28, pair[0][0], pair[0][1])}
      <text x={w / 2} y={h / 2 + 10} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>=</text>
      {frac(w * 0.72, pair[1][0], pair[1][1])}
    </g>
  );
}

function LowestTermsLadder(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, fitHost: () => null,
      /* the board layout (LAYOUT.md §1b) */
      board: true,
      /* the new look: no question bar, only the blinking key at the top right; the question lives only in the bubble */
      keyOnly: true,
      /* the wide keypad: the picture is laid out for x 0 to 900, so it fits beside the open panel */
      bigPad: true,
      /* the Next key: nothing moves on by itself */
      nextKey: true,
      /* the fraction answer is typed ON the card (the next rung of the ladder) */
      cardAnswer: true,
      /* one small clickable dot per phase */
      navDots: true,
      /* the start page: the tool's name, StartArt, START_HOOK, a Start key */
      StartArt, START_HOOK,
      }} />
  );
}

export default LowestTermsLadder;
