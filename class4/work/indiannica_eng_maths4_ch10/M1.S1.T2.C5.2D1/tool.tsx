/* ═══ M1.S1.T2.C5.2D1 · pattern_strip · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists: header + its three controls, canvas, slot + pad, bubble + mascot,
   phase dots (user / AI mode), window.toolApi, the sound effects, the printed bubble, scoring, the
   events, idle and restart. THE LESSON IS SILENT (runtime r30): nothing is spoken; every line is
   printed on the bubble, which is the guide. The lesson is action-driven: nothing moves on unless the
   child acts. The new look (keyOnly + navDots, one sentence a screen, every act through api.act).
   NO imports in this file; only the five host hooks. Follow docs/LAYOUT.md and docs/PATTERNS.md.
   Every English line the tool prints, in its data or drawn by Work (tx("...")), has a Hindi and a
   Gujarati entry in TR once the English is final (check's tr-coverage row lists what is missing). */

const TOOL_ID = "pattern_strip";
const MEDIA_ID = "M1.S1.T2.C5.2D1";
const TOOL_NAME = "Pattern Strip";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
/* kept for the tool object's shape (and the sidecar); nothing speaks from r30 */
const VOICE = {"rate":0.92,"pitch":1.06};

/* printed on the bubble before phase 1's teach lines only (the plan's opening line; not shown when phase 1 has steps) */
const OPENING = ["A strip of shapes, and some cells still empty. Find what comes round again."];
/* the whole-tool line: printed on the summary page */
const FINISH_LINE = "Every row carried on, and every order brought round to its start.";
/* printed when the child opens Free play: the Draw key and the ring are what free play offers */
const FREE_LINE = "Free play. Draw a number, then tap the ring round from it.";

/* THE START PAGE: START_HOOK is ONE printed question to wonder at; StartArt is the object the lesson is about, drawn in a
   1200 x 340 box: a strip of shapes that comes round again, with its last cell empty. */
const START_HOOK = "What comes next in a pattern that goes round and round?";
function StartArt({ box, C, lang, tx }: any) {
  const kinds = ["star", "moon", "star", "moon", "star"];
  const cell = 150, gap = 22, total = 6 * cell + 5 * gap, x0 = Math.round((box.w - total) / 2), y0 = Math.round((box.h - cell) / 2);
  return (
    <g>
      {Array.from({ length: 6 }, (_, i) => i).map((i) => {
        const x = x0 + i * (cell + gap), cx = x + cell / 2, cy = y0 + cell / 2;
        return (
          <g key={i}>
            <rect x={x} y={y0} width={cell} height={cell} rx={RAD.panel} fill={i < 5 ? "url(#gCard)" : C.paper} stroke={i < 5 ? C.rule : psLine(C)} strokeWidth={4}
              strokeDasharray={i < 5 ? undefined : "14 12"} />
            {i < 5 && <Skin name="cell" x={x} y={y0} w={cell} h={cell} fit="stretch" />}
            {i < 5 && <PsFace pic="shape" kind={kinds[i]} cx={cx} cy={cy} r={50} paint={i % 2 ? CONTENT.ten : CONTENT.hundred}
              ink={shade(i % 2 ? CONTENT.ten : CONTENT.hundred, 0.4)} />}
          </g>
        );
      })}
    </g>
  );
}

/* Hindi and Gujarati (docs/PATTERNS.md §11): every line stays English, exactly as the checks read it; this table is keyed by that
   English, byte for byte. Filled AFTER the English is final and reviewed (the language pass). */
const TR: any = {
  hi: {
    "Pattern Strip": "पैटर्न पट्टी",
    "Fill every box first.": "पहले हर खाना भरो।",
    "Free play. Draw a number, then tap the ring round from it.": "मुक्त खेल। एक संख्या निकालो, फिर उससे शुरू करके चक्र पर बारी-बारी छुओ।",
    "What comes next in a pattern that goes round and round?": "जो पैटर्न घूम-घूमकर दोहराता है, उसमें आगे क्या आएगा?",
    "A strip of shapes, and some cells still empty. Find what comes round again.": "आकृतियों की एक पट्टी है, कुछ खाने अभी खाली हैं। देखो, क्या फिर से आता है।",
    "Every row carried on, and every order brought round to its start.": "हर पंक्ति आगे बढ़ाई, और हर क्रम घूमकर अपनी शुरुआत पर आया।",
    "Copy light": "नकल चमकाओ",
    "Turn": "घुमाओ",
    "Count": "गिनो",
    "One fewer": "एक कम",
    "Draw": "निकालो",
    "Team 1": "टीम 1",
    "Team 2": "टीम 2",
    "last": "आखिरी",
    "The group that repeats": "दोहराने वाला समूह",
    "Which shapes come round again? Put a bracket over them.": "कौन-सी आकृतियाँ फिर आती हैं? उन पर कोष्ठक लगाओ।",
    "Tap Copy light to see where the first shape comes again.": "'नकल चमकाओ' दबाओ और देखो पहली आकृति कहाँ फिर आती है।",
    "The key at the bottom is Copy light.": "नीचे का बटन 'नकल चमकाओ' है।",
    "Now tap the fourth box to bracket four boxes.": "अब चौथे खाने को छुओ, ताकि चार खानों पर कोष्ठक लगे।",
    "Tap the box where you want the bracket to end.": "जिस खाने पर कोष्ठक खत्म करना है, उसे छुओ।",
    "Tap Copy light again, and see if every copy matches.": "'नकल चमकाओ' फिर दबाओ और देखो हर नकल मेल खाती है या नहीं।",
    "Press Copy light once more.": "'नकल चमकाओ' एक बार और दबाओ।",
    "Does every copy of your group match?": "क्या तुम्हारे समूह की हर नकल मेल खाती है?",
    "Bracket until the same shapes come round in the same order.": "तब तक कोष्ठक बढ़ाओ जब तक वही आकृतियाँ उसी क्रम में फिर न आ जाएँ।",
    "The smallest group that repeats fills every blank.": "सबसे छोटा दोहराने वाला समूह हर खाली खाना भर देता है।",
    "You learned: the smallest group that repeats fills every blank.": "तुमने सीखा: सबसे छोटा समूह हर खाली खाना भरता है।",
    "Which beads go in the two boxes?": "दोनों खानों में कौन-से मोती आएँगे?",
    "Which two beads?": "कौन-से दो मोती?",
    "Red, then blue": "लाल, फिर नीला",
    "Blue, then blue": "नीला, फिर नीला",
    "Blue, then red": "नीला, फिर लाल",
    "Red, then red": "लाल, फिर लाल",
    "Bracket the beads that come round again.": "जो मोती फिर-फिर आते हैं, उन पर कोष्ठक लगाओ।",
    "Yes, red comes first and blue second.": "हाँ, पहले लाल आता है और फिर नीला।",
    "What goes in the empty box?": "खाली खाने में क्या आएगा?",
    "Which shape next?": "अगली कौन-सी आकृति?",
    "Star": "तारा",
    "Moon": "चाँद",
    "Say the shapes in a row, and see where it starts over.": "पंक्ति की आकृतियाँ बोलो और देखो कहाँ से फिर शुरू होती है।",
    "Yes, the star and moon take turns.": "हाँ, तारा और चाँद बारी-बारी से आते हैं।",
    "What goes there, and what is the group that repeats?": "वहाँ क्या आएगा, और दोहराने वाला समूह कौन-सा है?",
    "Shape and group?": "आकृति और समूह?",
    "Square, group\u00A0of\u00A03": "वर्ग, 3 का समूह",
    "Circle, group\u00A0of\u00A02": "वृत्त, 2 का समूह",
    "Square, group\u00A0of\u00A02": "वर्ग, 2 का समूह",
    "Circle, group\u00A0of\u00A03": "वृत्त, 3 का समूह",
    "A shape can show up twice inside one group.": "एक आकृति एक समूह में दो बार आ सकती है।",
    "Yes, square, square, circle comes round.": "हाँ, वर्ग, वर्ग, वृत्त बार-बार आता है।",
    "A quarter turn at every step": "हर चरण पर चौथाई घुमाव",
    "How far did it turn each time? Make the same turn again.": "हर बार वह कितना घूमा? वही घुमाव फिर से करो।",
    "Tap Turn for one quarter turn, the way a clock's hands go.": "घड़ी की सुइयों की दिशा में एक चौथाई घुमाव के लिए 'घुमाओ' दबाओ।",
    "The key at the bottom is Turn.": "नीचे का बटन 'घुमाओ' है।",
    "Turn it a second time.": "इसे दूसरी बार घुमाओ।",
    "Tap the same key again.": "वही बटन फिर दबाओ।",
    "Turn it a third time, and watch the ring.": "इसे तीसरी बार घुमाओ और चक्र को देखो।",
    "The ring needs another quarter.": "चक्र को एक चौथाई और चाहिए।",
    "Turn it once more, and the ring closes.": "एक बार और घुमाओ, चक्र पूरा बंद हो जाएगा।",
    "One last quarter fills the ring.": "आखिरी एक चौथाई चक्र को भर देता है।",
    "Which way do a clock's hands go?": "घड़ी की सुइयाँ किस दिशा में चलती हैं?",
    "Four quarter turns bring the arrow home, so count in fours.": "चार चौथाई घुमाव तीर को वापस ले आते हैं, इसलिए चार-चार गिनो।",
    "The same quarter turn each step brings the arrow round again.": "हर चरण पर वही चौथाई घुमाव तीर को फिर घुमाकर ले आता है।",
    "You learned: four quarter turns make one full turn.": "तुमने सीखा: चार चौथाई घुमाव मिलकर एक पूरा घुमाव।",
    "It makes a quarter turn clockwise each step: which way after each of four steps?": "हर चरण पर घड़ी की दिशा में चौथाई घुमाव: चार चरणों में तीर किधर होगा?",
    "Four steps?": "चार चरण?",
    "Press Turn to see the move between the two arrows.": "दोनों तीरों के बीच का घुमाव देखने के लिए 'घुमाओ' दबाओ।",
    "Yes, each arrow is one quarter further round.": "हाँ, हर तीर एक चौथाई आगे घूमा हुआ है।",
    "The dot goes to the next arm of the plus, clockwise: where does it end up?": "बिंदु घड़ी की दिशा में प्लस की अगली भुजा पर जाता है: वह कहाँ पहुँचेगा?",
    "Where next?": "आगे कहाँ?",
    "Up": "ऊपर",
    "Right": "दाएँ",
    "Down": "नीचे",
    "Left": "बाएँ",
    "Follow the dot with your finger, the way a clock goes.": "बिंदु को उँगली से घड़ी की दिशा में चलाकर देखो।",
    "Yes, one more quarter turn puts it there.": "हाँ, एक और चौथाई घुमाव उसे वहाँ पहुँचा देता है।",
    "After eight more quarter turns clockwise, which way does the arrow point?": "घड़ी की दिशा में आठ चौथाई घुमाव और, तीर किधर होगा?",
    "After eight turns?": "आठ घुमाव बाद?",
    "How many quarter turns make one full turn?": "कितने चौथाई घुमाव मिलकर एक पूरा घुमाव बनाते हैं?",
    "Yes, two full turns bring it back round.": "हाँ, दो पूरे घुमाव उसे वापस वहीं ले आते हैं।",
    "One side fewer, then start again": "एक भुजा कम, फिर शुरू",
    "Count the sides of each one. What happens after three?": "हर एक की भुजाएँ गिनो। तीन के बाद क्या होता है?",
    "Tap Count to write the sides under each shape.": "'गिनो' दबाओ और हर आकृति के नीचे भुजाएँ लिखो।",
    "The key at the bottom is Count.": "नीचे का बटन 'गिनो' है।",
    "Tap One fewer to draw the next shape.": "अगली आकृति बनाने के लिए 'एक कम' दबाओ।",
    "The key now reads One fewer.": "अब बटन पर 'एक कम' लिखा है।",
    "Tap One fewer once more, and look at the picture.": "'एक कम' फिर दबाओ और चित्र को देखो।",
    "Press One fewer again.": "'एक कम' फिर दबाओ।",
    "Can a closed shape with straight sides have fewer than three?": "क्या सीधी भुजाओं वाली बंद आकृति की तीन से कम भुजाएँ हो सकती हैं?",
    "Say the side counts out loud, and listen for the jump.": "भुजाओं की गिनती ज़ोर से बोलो और देखो कहाँ छलाँग लगती है।",
    "A row can lose or gain a side each step, then starts again.": "पंक्ति हर चरण पर एक भुजा खो या पा सकती है, फिर दोबारा शुरू होती है।",
    "You learned: a row gains or loses a side, then starts again.": "तुमने सीखा: पंक्ति एक भुजा पाती या खोती है, फिर शुरू।",
    "The row loses one side each step: how many shapes before it must start again?": "पंक्ति हर चरण एक भुजा खोती है: फिर शुरू होने से पहले कितनी आकृतियाँ?",
    "How many shapes?": "कितनी आकृतियाँ?",
    "Lay each shape with the key, and stop where it cannot go on.": "बटन से हर आकृति बनाओ और जहाँ आगे न बढ़े, वहाँ रुक जाओ।",
    "Yes, the row has that many shapes.": "हाँ, पंक्ति में उतनी ही आकृतियाँ हैं।",
    "How many sides do the shapes in the two empty boxes have?": "दोनों खाली खानों की आकृतियों की कितनी-कितनी भुजाएँ हैं?",
    "Sides of the two?": "दोनों की भुजाएँ?",
    "3, then 5": "3, फिर 5",
    "3, then 2": "3, फिर 2",
    "3, then 4": "3, फिर 4",
    "5, then 4": "5, फिर 4",
    "Read the side counts along the row, one at a time.": "पंक्ति में भुजाओं की गिनती एक-एक करके पढ़ो।",
    "Yes, the counts start over after three.": "हाँ, तीन के बाद गिनती फिर शुरू होती है।",
    "What shape goes in the empty box of this row?": "इस पंक्ति के खाली खाने में कौन-सी आकृति आएगी?",
    "Triangle": "त्रिभुज",
    "Square": "वर्ग",
    "Pentagon": "पंचभुज",
    "Hexagon": "षट्भुज",
    "Look at where the counts begin again.": "देखो गिनती कहाँ से फिर शुरू होती है।",
    "Yes, the climb ends on five sides.": "हाँ, बढ़त पाँच भुजाओं पर रुकती है।",
    "After the last comes the first": "आखिरी के बाद पहला आता है",
    "Who goes first? Now go round. Who comes after the last one?": "पहले कौन जाता है? अब घूमते चलो। आखिरी के बाद कौन आता है?",
    "Tap Draw to find out who goes first.": "'निकालो' दबाओ और जानो कि पहले कौन जाएगा।",
    "The key at the bottom is Draw.": "नीचे का बटन 'निकालो' है।",
    "Tap the player who comes after the flag.": "झंडे के बाद आने वाले खिलाड़ी को छुओ।",
    "Go round the ring, the way a clock goes.": "चक्र पर घड़ी की दिशा में आगे बढ़ो।",
    "Tap the next player round the ring.": "चक्र पर अगले खिलाड़ी को छुओ।",
    "Keep going to the next number.": "अगली संख्या की ओर बढ़ते जाओ।",
    "Keep going, past the highest number, and tap the next player.": "सबसे बड़ी संख्या के बाद भी चलते रहो और अगले खिलाड़ी को छुओ।",
    "Look for where the numbers start again.": "देखो संख्याएँ कहाँ से फिर शुरू होती हैं।",
    "Who comes next when the numbers run out?": "संख्याएँ खत्म होने पर अगला कौन आता है?",
    "A ring has no end, so it carries on from its first number.": "चक्र का कोई अंत नहीं होता, इसलिए वह पहली संख्या से चलता रहता है।",
    "Whoever is drawn goes first, and the ring comes back to the start.": "जिसका नाम निकले वह पहले जाता है, और चक्र शुरुआत पर लौट आता है।",
    "You learned: after the last number on a ring comes the first.": "तुमने सीखा: चक्र में आखिरी के बाद पहली आती है।",
    "Child 4 bats first, going round: tap all five in batting order.": "बच्चा 4 पहले खेलता है: पाँचों को खेलने के क्रम में छुओ।",
    "Whole order?": "पूरा क्रम?",
    "Read the ring from the flag, one number at a time.": "झंडे से चक्र पढ़ो, एक-एक संख्या करके।",
    "Yes, it goes round from 4 and back to 1.": "हाँ, यह 4 से घूमकर वापस 1 पर आता है।",
    "One draw of 3 starts both teams: tap each team's order on its own ring.": "3 की एक पर्ची दोनों टीमें शुरू करती है: हर टीम का क्रम अपने चक्र पर छुओ।",
    "Both orders?": "दोनों क्रम?",
    "Both rings begin at the number drawn.": "दोनों चक्र निकाली गई संख्या से शुरू होते हैं।",
    "Yes, both teams share one starting number.": "हाँ, दोनों टीमों की शुरुआत की संख्या एक ही है।",
    "Six players take turns going round: if player 2 goes last, who went first?": "छह खिलाड़ी बारी-बारी जाते हैं: खिलाड़ी 2 आखिरी में जाए तो पहले कौन गया?",
    "Who went first?": "पहले कौन गया?",
    "Go round from the player who went last.": "आखिर में गए खिलाड़ी से आगे घूमो।",
    "Yes, player 3 went first.": "हाँ, खिलाड़ी 3 पहले गया।",
  },
  gu: {
    "Pattern Strip": "પેટર્ન પટ્ટી",
    "Fill every box first.": "પહેલા દરેક ખાનું ભરો.",
    "Free play. Draw a number, then tap the ring round from it.": "મુક્ત રમત. એક સંખ્યા કાઢો, પછી ચક્ર પર તેનાથી શરૂ કરીને ટેપ કરો.",
    "What comes next in a pattern that goes round and round?": "ફરી ફરીને આવતી પેટર્નમાં આગળ શું આવશે?",
    "A strip of shapes, and some cells still empty. Find what comes round again.": "આકૃતિઓની એક પટ્ટી છે, કેટલાંક ખાનાં હજી ખાલી છે. જુઓ, શું ફરી આવે છે.",
    "Every row carried on, and every order brought round to its start.": "દરેક હરોળ આગળ વધારી, અને દરેક ક્રમ ફરીને શરૂઆત પર આવ્યો.",
    "Copy light": "નકલ ચમકાવો",
    "Turn": "ફેરવો",
    "Count": "ગણો",
    "One fewer": "એક ઓછી",
    "Draw": "કાઢો",
    "Team 1": "ટીમ 1",
    "Team 2": "ટીમ 2",
    "last": "છેલ્લો",
    "The group that repeats": "ફરી ફરી આવતું જૂથ",
    "Which shapes come round again? Put a bracket over them.": "કઈ આકૃતિઓ ફરી આવે છે? તેમના પર કૌંસ મૂકો.",
    "Tap Copy light to see where the first shape comes again.": "'નકલ ચમકાવો' દબાવો અને જુઓ પહેલી આકૃતિ ક્યાં ફરી આવે છે.",
    "The key at the bottom is Copy light.": "નીચેનું બટન 'નકલ ચમકાવો' છે.",
    "Now tap the fourth box to bracket four boxes.": "હવે ચોથા ખાનાને ટેપ કરો, જેથી ચાર ખાના પર કૌંસ લાગે.",
    "Tap the box where you want the bracket to end.": "જ્યાં કૌંસ પૂરો કરવો હોય તે ખાનું ટેપ કરો.",
    "Tap Copy light again, and see if every copy matches.": "'નકલ ચમકાવો' ફરી દબાવો અને જુઓ દરેક નકલ મેળ ખાય છે કે નહીં.",
    "Press Copy light once more.": "'નકલ ચમકાવો' ફરી એક વાર દબાવો.",
    "Does every copy of your group match?": "શું તમારા જૂથની દરેક નકલ મેળ ખાય છે?",
    "Bracket until the same shapes come round in the same order.": "જ્યાં સુધી એ જ આકૃતિઓ એ જ ક્રમમાં ફરી ન આવે ત્યાં સુધી કૌંસ વધારો.",
    "The smallest group that repeats fills every blank.": "સૌથી નાનું ફરી આવતું જૂથ દરેક ખાલી ખાનું ભરી દે છે.",
    "You learned: the smallest group that repeats fills every blank.": "તમે શીખ્યા: સૌથી નાનું જૂથ દરેક ખાલી ખાનું ભરે છે.",
    "Which beads go in the two boxes?": "બંને ખાનામાં કયા મણકા આવશે?",
    "Which two beads?": "કયા બે મણકા?",
    "Red, then blue": "લાલ, પછી વાદળી",
    "Blue, then blue": "વાદળી, પછી વાદળી",
    "Blue, then red": "વાદળી, પછી લાલ",
    "Red, then red": "લાલ, પછી લાલ",
    "Bracket the beads that come round again.": "જે મણકા ફરી ફરી આવે છે તેમના પર કૌંસ મૂકો.",
    "Yes, red comes first and blue second.": "હા, પહેલા લાલ આવે છે અને પછી વાદળી.",
    "What goes in the empty box?": "ખાલી ખાનામાં શું આવશે?",
    "Which shape next?": "આગળ કઈ આકૃતિ?",
    "Star": "તારો",
    "Moon": "ચંદ્ર",
    "Say the shapes in a row, and see where it starts over.": "હરોળની આકૃતિઓ બોલો અને જુઓ ક્યાંથી ફરી શરૂ થાય છે.",
    "Yes, the star and moon take turns.": "હા, તારો અને ચંદ્ર વારાફરતી આવે છે.",
    "What goes there, and what is the group that repeats?": "ત્યાં શું આવશે, અને ફરી આવતું જૂથ કયું છે?",
    "Shape and group?": "આકૃતિ અને જૂથ?",
    "Square, group\u00A0of\u00A03": "ચોરસ, 3નું જૂથ",
    "Circle, group\u00A0of\u00A02": "વર્તુળ, 2નું જૂથ",
    "Square, group\u00A0of\u00A02": "ચોરસ, 2નું જૂથ",
    "Circle, group\u00A0of\u00A03": "વર્તુળ, 3નું જૂથ",
    "A shape can show up twice inside one group.": "એક આકૃતિ એક જૂથમાં બે વાર આવી શકે છે.",
    "Yes, square, square, circle comes round.": "હા, ચોરસ, ચોરસ, વર્તુળ ફરી ફરી આવે છે.",
    "A quarter turn at every step": "દરેક પગલે ચોથા ભાગનો ફેરો",
    "How far did it turn each time? Make the same turn again.": "દરેક વખતે તે કેટલું ફર્યું? એ જ ફેરો ફરી કરો.",
    "Tap Turn for one quarter turn, the way a clock's hands go.": "ઘડિયાળના કાંટાની દિશામાં ચોથા ભાગના ફેરા માટે 'ફેરવો' દબાવો.",
    "The key at the bottom is Turn.": "નીચેનું બટન 'ફેરવો' છે.",
    "Turn it a second time.": "તેને બીજી વાર ફેરવો.",
    "Tap the same key again.": "એ જ બટન ફરી દબાવો.",
    "Turn it a third time, and watch the ring.": "તેને ત્રીજી વાર ફેરવો અને ચક્ર જુઓ.",
    "The ring needs another quarter.": "ચક્રને વધુ એક ચોથો ભાગ જોઈએ.",
    "Turn it once more, and the ring closes.": "ફરી એક વાર ફેરવો, ચક્ર પૂરું બંધ થશે.",
    "One last quarter fills the ring.": "છેલ્લો ચોથો ભાગ ચક્ર ભરી દે છે.",
    "Which way do a clock's hands go?": "ઘડિયાળના કાંટા કઈ દિશામાં ફરે છે?",
    "Four quarter turns bring the arrow home, so count in fours.": "ચાર ચોથા ભાગના ફેરા તીરને પાછું લાવે છે, એટલે ચાર-ચારની ગણતરી કરો.",
    "The same quarter turn each step brings the arrow round again.": "દરેક પગલે એ જ ચોથા ભાગનો ફેરો તીરને ફરી ફેરવીને પાછું લાવે છે.",
    "You learned: four quarter turns make one full turn.": "તમે શીખ્યા: ચાર ચોથા ભાગના ફેરા મળીને એક પૂરો ફેરો.",
    "It makes a quarter turn clockwise each step: which way after each of four steps?": "દરેક પગલે ઘડિયાળની દિશામાં ચોથા ભાગનો ફેરો: ચાર પગલે તીર ક્યાં?",
    "Four steps?": "ચાર પગલાં?",
    "Press Turn to see the move between the two arrows.": "બંને તીર વચ્ચેનો ફેરો જોવા 'ફેરવો' દબાવો.",
    "Yes, each arrow is one quarter further round.": "હા, દરેક તીર એક ચોથો ભાગ આગળ ફરેલું છે.",
    "The dot goes to the next arm of the plus, clockwise: where does it end up?": "બિંદુ ઘડિયાળની દિશામાં પ્લસની આગળની ભુજા પર જાય છે: તે ક્યાં પહોંચશે?",
    "Where next?": "આગળ ક્યાં?",
    "Up": "ઉપર",
    "Right": "જમણે",
    "Down": "નીચે",
    "Left": "ડાબે",
    "Follow the dot with your finger, the way a clock goes.": "બિંદુને આંગળીથી ઘડિયાળની દિશામાં ફેરવીને જુઓ.",
    "Yes, one more quarter turn puts it there.": "હા, વધુ એક ચોથા ભાગનો ફેરો તેને ત્યાં પહોંચાડે છે.",
    "After eight more quarter turns clockwise, which way does the arrow point?": "ઘડિયાળની દિશામાં આઠ ચોથા ભાગના ફેરા પછી તીર કઈ તરફ હશે?",
    "After eight turns?": "આઠ ફેરા પછી?",
    "How many quarter turns make one full turn?": "કેટલા ચોથા ભાગના ફેરા મળીને એક પૂરો ફેરો થાય?",
    "Yes, two full turns bring it back round.": "હા, બે પૂરા ફેરા તેને પાછું ત્યાં લાવે છે.",
    "One side fewer, then start again": "એક બાજુ ઓછી, પછી ફરી શરૂ",
    "Count the sides of each one. What happens after three?": "દરેકની બાજુઓ ગણો. ત્રણ પછી શું થાય છે?",
    "Tap Count to write the sides under each shape.": "'ગણો' દબાવો અને દરેક આકૃતિ નીચે બાજુઓ લખો.",
    "The key at the bottom is Count.": "નીચેનું બટન 'ગણો' છે.",
    "Tap One fewer to draw the next shape.": "આગળની આકૃતિ દોરવા 'એક ઓછી' દબાવો.",
    "The key now reads One fewer.": "હવે બટન પર 'એક ઓછી' લખ્યું છે.",
    "Tap One fewer once more, and look at the picture.": "'એક ઓછી' ફરી દબાવો અને ચિત્ર જુઓ.",
    "Press One fewer again.": "'એક ઓછી' ફરી દબાવો.",
    "Can a closed shape with straight sides have fewer than three?": "શું સીધી બાજુઓવાળી બંધ આકૃતિની ત્રણથી ઓછી બાજુઓ હોઈ શકે?",
    "Say the side counts out loud, and listen for the jump.": "બાજુઓની ગણતરી મોટેથી બોલો અને કૂદકો સાંભળો.",
    "A row can lose or gain a side each step, then starts again.": "હરોળ દરેક પગલે એક બાજુ ગુમાવી કે મેળવી શકે છે, પછી ફરી શરૂ થાય છે.",
    "You learned: a row gains or loses a side, then starts again.": "તમે શીખ્યા: હરોળ એક બાજુ મેળવે કે ગુમાવે, પછી ફરી શરૂ.",
    "The row loses one side each step: how many shapes before it must start again?": "હરોળ દરેક પગલે એક બાજુ ગુમાવે છે: ફરી શરૂ થતા પહેલાં કેટલી આકૃતિઓ?",
    "How many shapes?": "કેટલી આકૃતિઓ?",
    "Lay each shape with the key, and stop where it cannot go on.": "બટનથી દરેક આકૃતિ બનાવો અને જ્યાં આગળ ન વધે ત્યાં અટકો.",
    "Yes, the row has that many shapes.": "હા, હરોળમાં એટલી જ આકૃતિઓ છે.",
    "How many sides do the shapes in the two empty boxes have?": "બંને ખાલી ખાનાંની આકૃતિઓની કેટલી કેટલી બાજુઓ છે?",
    "Sides of the two?": "બંનેની બાજુઓ?",
    "3, then 5": "3, પછી 5",
    "3, then 2": "3, પછી 2",
    "3, then 4": "3, પછી 4",
    "5, then 4": "5, પછી 4",
    "Read the side counts along the row, one at a time.": "હરોળમાં બાજુઓની ગણતરી એક એક કરીને વાંચો.",
    "Yes, the counts start over after three.": "હા, ત્રણ પછી ગણતરી ફરી શરૂ થાય છે.",
    "What shape goes in the empty box of this row?": "આ હરોળના ખાલી ખાનામાં કઈ આકૃતિ આવશે?",
    "Triangle": "ત્રિકોણ",
    "Square": "ચોરસ",
    "Pentagon": "પંચકોણ",
    "Hexagon": "ષટ્કોણ",
    "Look at where the counts begin again.": "જુઓ ગણતરી ક્યાંથી ફરી શરૂ થાય છે.",
    "Yes, the climb ends on five sides.": "હા, વધારો પાંચ બાજુ પર અટકે છે.",
    "After the last comes the first": "છેલ્લા પછી પહેલું આવે છે",
    "Who goes first? Now go round. Who comes after the last one?": "પહેલા કોણ જાય છે? હવે ફરતા જાઓ. છેલ્લા પછી કોણ આવે છે?",
    "Tap Draw to find out who goes first.": "'કાઢો' દબાવો અને જાણો કે પહેલા કોણ જશે.",
    "The key at the bottom is Draw.": "નીચેનું બટન 'કાઢો' છે.",
    "Tap the player who comes after the flag.": "ઝંડા પછી આવનાર ખેલાડીને ટેપ કરો.",
    "Go round the ring, the way a clock goes.": "ચક્ર પર ઘડિયાળની દિશામાં આગળ વધો.",
    "Tap the next player round the ring.": "ચક્ર પર આગળના ખેલાડીને ટેપ કરો.",
    "Keep going to the next number.": "આગળની સંખ્યા તરફ વધતા જાઓ.",
    "Keep going, past the highest number, and tap the next player.": "સૌથી મોટી સંખ્યા પછી પણ ચાલતા રહો અને આગળના ખેલાડીને ટેપ કરો.",
    "Look for where the numbers start again.": "જુઓ સંખ્યાઓ ક્યાંથી ફરી શરૂ થાય છે.",
    "Who comes next when the numbers run out?": "સંખ્યાઓ પૂરી થાય ત્યારે આગળ કોણ આવે છે?",
    "A ring has no end, so it carries on from its first number.": "ચક્રનો કોઈ અંત નથી, એટલે તે પહેલી સંખ્યાથી આગળ ચાલે છે.",
    "Whoever is drawn goes first, and the ring comes back to the start.": "જેનું નામ નીકળે તે પહેલા જાય છે, અને ચક્ર શરૂઆત પર પાછું આવે છે.",
    "You learned: after the last number on a ring comes the first.": "તમે શીખ્યા: ચક્રમાં છેલ્લા પછી પહેલી આવે છે.",
    "Child 4 bats first, going round: tap all five in batting order.": "બાળક 4 પહેલા રમે છે: પાંચેયને રમવાના ક્રમમાં ટેપ કરો.",
    "Whole order?": "આખો ક્રમ?",
    "Read the ring from the flag, one number at a time.": "ઝંડાથી ચક્ર વાંચો, એક એક સંખ્યા કરીને.",
    "Yes, it goes round from 4 and back to 1.": "હા, તે 4 થી ફરીને પાછું 1 પર આવે છે.",
    "One draw of 3 starts both teams: tap each team's order on its own ring.": "3 ની ચિઠ્ઠી બંને ટીમ શરૂ કરે છે: દરેકનો ક્રમ પોતાના ચક્ર પર ટેપ કરો.",
    "Both orders?": "બંને ક્રમ?",
    "Both rings begin at the number drawn.": "બંને ચક્ર કાઢેલી સંખ્યાથી શરૂ થાય છે.",
    "Yes, both teams share one starting number.": "હા, બંને ટીમની શરૂઆતની સંખ્યા એક જ છે.",
    "Six players take turns going round: if player 2 goes last, who went first?": "છ ખેલાડી વારાફરતી જાય છે: ખેલાડી 2 છેલ્લે જાય તો પહેલા કોણ ગયો?",
    "Who went first?": "પહેલા કોણ ગયો?",
    "Go round from the player who went last.": "છેલ્લે ગયેલા ખેલાડીથી આગળ ફરો.",
    "Yes, player 3 went first.": "હા, ખેલાડી 3 પહેલા ગયો.",
  },
};

/* One entry per phase = one mount. Each phase opens on guide steps (a WARM-UP on a strip that is none of the questions' own),
   then three questions. The picture carries each row; a line points at it, so no line prints an answer. Fields of an item:
     mk      the key of its picture in MODEL.items          win   the one-sentence line said when it is answered right
     near    the item's own misconception (judge rejects it) forms  the words no line may print                        */
const PHASES = [
  {
    n: 1,
    concept: "The group that repeats",
    conceptId: "M1.S1.T2.C5", objectiveIds: ["O1"],
    says: ["Which shapes come round again? Put a bracket over them."],
    steps: [
      { say: "Tap Copy light to see where the first shape comes again.", on: "copy", hint: "The key at the bottom is Copy light." },
      { say: "Now tap the fourth box to bracket four boxes.", on: "bracket", hint: "Tap the box where you want the bracket to end." },
      { say: "Tap Copy light again, and see if every copy matches.", on: "copy", hint: "Press Copy light once more." },
    ],
    ladder: ["Does every copy of your group match?", "Bracket until the same shapes come round in the same order."],
    closing: "The smallest group that repeats fills every blank.",
    learned: "You learned: the smallest group that repeats fills every blank.",
    traceback: "The smallest group is bracketed, every copy of it lights along the strip, and the blanks fill with the box one whole group before.",
    items: [
      { qid: "M1.S1.T2.C5:ML1", kind: "group", mk: "1.1", say: "Which beads go in the two boxes?", ask: "Which two beads?",
        choices: [{ id: "rb", label: "Red, then blue" }, { id: "bb", label: "Blue, then blue" }, { id: "br", label: "Blue, then red" }, { id: "rr", label: "Red, then red" }],
        answer: "rb", near: "bb", forms: ["red, then blue"], miss: "Bracket the beads that come round again.",
        win: "Yes, red comes first and blue second." },
      { qid: "M1.S1.T2.C5:1", kind: "group", mk: "1.2", say: "What goes in the empty box?", ask: "Which shape next?",
        choices: [{ id: "star", label: "Star" }, { id: "moon", label: "Moon" }],
        answer: "moon", near: "star", forms: ["moon"], miss: "Say the shapes in a row, and see where it starts over.",
        win: "Yes, the star and moon take turns." },
      { qid: "M1.S1.T2.C5:2", kind: "group", mk: "1.3", say: "What goes there, and what is the group that repeats?", ask: "Shape and group?",
        choices: [{ id: "sq3", label: "Square, group\u00A0of\u00A03" }, { id: "ci2", label: "Circle, group\u00A0of\u00A02" }, { id: "sq2", label: "Square, group\u00A0of\u00A02" }, { id: "ci3", label: "Circle, group\u00A0of\u00A03" }],
        answer: "sq3", near: "ci2", forms: ["square, group of 3"], miss: "A shape can show up twice inside one group.",
        win: "Yes, square, square, circle comes round." },
    ],
  },
  {
    n: 2,
    concept: "A quarter turn at every step",
    conceptId: "M1.S1.T2.C6", objectiveIds: ["O1"],
    says: ["How far did it turn each time? Make the same turn again."],
    steps: [
      { say: "Tap Turn for one quarter turn, the way a clock's hands go.", on: "turn", hint: "The key at the bottom is Turn." },
      { say: "Turn it a second time.", on: "turn", hint: "Tap the same key again." },
      { say: "Turn it a third time, and watch the ring.", on: "turn", hint: "The ring needs another quarter." },
      { say: "Turn it once more, and the ring closes.", on: "turn", hint: "One last quarter fills the ring." },
    ],
    ladder: ["Which way do a clock's hands go?", "Four quarter turns bring the arrow home, so count in fours."],
    closing: "The same quarter turn each step brings the arrow round again.",
    learned: "You learned: four quarter turns make one full turn.",
    traceback: "The dial replays the quarter turn from the last arrow, the way a clock's hands go, and the row fills with the arrows that turn makes.",
    items: [
      { qid: "M1.S1.T2.C6:ML2", kind: "turn", mk: "2.1", say: "It makes a quarter turn clockwise each step: which way after each of four steps?", ask: "Four steps?",
        pad: "enter", answer: "up right down left", near: "down right up left", forms: ["up right down left"], miss: "Press Turn to see the move between the two arrows.",
        win: "Yes, each arrow is one quarter further round." },
      { qid: "M1.S1.T2.C6:3", kind: "turn", mk: "2.2", say: "The dot goes to the next arm of the plus, clockwise: where does it end up?", ask: "Where next?",
        choices: [{ id: "up", label: "Up" }, { id: "right", label: "Right" }, { id: "down", label: "Down" }, { id: "left", label: "Left" }],
        answer: "right", near: "left", forms: ["right"], miss: "Follow the dot with your finger, the way a clock goes.",
        win: "Yes, one more quarter turn puts it there." },
      { qid: "M1.S1.T2.C6:4", kind: "turn", mk: "2.3", say: "After eight more quarter turns clockwise, which way does the arrow point?", ask: "After eight turns?",
        choices: [{ id: "up", label: "Up" }, { id: "right", label: "Right" }, { id: "down", label: "Down" }, { id: "left", label: "Left" }],
        answer: "down", near: "right", forms: ["down"], miss: "How many quarter turns make one full turn?",
        win: "Yes, two full turns bring it back round." },
    ],
  },
  {
    n: 3,
    concept: "One side fewer, then start again",
    conceptId: "M1.S1.T2.C7", objectiveIds: ["O2"],
    says: ["Count the sides of each one. What happens after three?"],
    steps: [
      { say: "Tap Count to write the sides under each shape.", on: "count", hint: "The key at the bottom is Count." },
      { say: "Tap One fewer to draw the next shape.", on: "fewer", hint: "The key now reads One fewer." },
      { say: "Tap One fewer once more, and look at the picture.", on: "fewer", hint: "Press One fewer again." },
    ],
    ladder: ["Can a closed shape with straight sides have fewer than three?", "Say the side counts out loud, and listen for the jump."],
    closing: "A row can lose or gain a side each step, then starts again.",
    learned: "You learned: a row gains or loses a side, then starts again.",
    traceback: "The side counts are read along the row, the spot where they turn back is marked, and the shapes the row makes fill the blanks.",
    items: [
      { qid: "M1.S1.T2.C7:6", kind: "count", mk: "3.1", say: "The row loses one side each step: how many shapes before it must start again?", ask: "How many shapes?",
        answer: 5, near: 6, miss: "Lay each shape with the key, and stop where it cannot go on.",
        win: "Yes, the row has that many shapes." },
      { qid: "M1.S1.T2.C7:ML3", kind: "sides", mk: "3.2", say: "How many sides do the shapes in the two empty boxes have?", ask: "Sides of the two?",
        choices: [{ id: "tp", label: "3, then 5" }, { id: "tl", label: "3, then 2" }, { id: "ts", label: "3, then 4" }, { id: "ps", label: "5, then 4" }],
        answer: "tp", near: "tl", forms: ["3, then 5"], miss: "Read the side counts along the row, one at a time.",
        win: "Yes, the counts start over after three." },
      { qid: "M1.S1.T2.C7:5", kind: "sides", mk: "3.3", say: "What shape goes in the empty box of this row?", ask: "Which shape next?",
        choices: [{ id: "triangle", label: "Triangle" }, { id: "square", label: "Square" }, { id: "pentagon", label: "Pentagon" }, { id: "hexagon", label: "Hexagon" }],
        answer: "pentagon", near: "square", forms: ["pentagon"], miss: "Look at where the counts begin again.",
        win: "Yes, the climb ends on five sides." },
    ],
  },
  {
    n: 4,
    concept: "After the last comes the first",
    conceptId: "M1.S1.T2.C8", objectiveIds: ["O2"],
    says: ["Who goes first? Now go round. Who comes after the last one?"],
    steps: [
      { say: "Tap Draw to find out who goes first.", on: "draw", hint: "The key at the bottom is Draw." },
      { say: "Tap the player who comes after the flag.", on: "place", hint: "Go round the ring, the way a clock goes." },
      { say: "Tap the next player round the ring.", on: "place", hint: "Keep going to the next number." },
      { say: "Keep going, past the highest number, and tap the next player.", on: "place", hint: "Look for where the numbers start again." },
    ],
    ladder: ["Who comes next when the numbers run out?", "A ring has no end, so it carries on from its first number."],
    closing: "Whoever is drawn goes first, and the ring comes back to the start.",
    learned: "You learned: after the last number on a ring comes the first.",
    traceback: "The ring is walked from the drawn number, each number lights as it is passed, and an arc joins the last number back to the first.",
    items: [
      { qid: "M1.S1.T2.C8:ML4", kind: "order", mk: "4.1", pad: "enter", say: "Child 4 bats first, going round: tap all five in batting order.", ask: "Whole order?",
        answer: "4 5 1 2 3", near: "4 5", miss: "Read the ring from the flag, one number at a time.",
        win: "Yes, it goes round from 4 and back to 1." },
      { qid: "M1.S1.T2.C8:7", kind: "order", mk: "4.2", pad: "enter", say: "One draw of 3 starts both teams: tap each team's order on its own ring.", ask: "Both orders?",
        answer: "3 4 5 1 2", near: "3 4 5", miss: "Both rings begin at the number drawn.",
        win: "Yes, both teams share one starting number." },
      { qid: "M1.S1.T2.C8:8", kind: "first", mk: "4.3", say: "Six players take turns going round: if player 2 goes last, who went first?", ask: "Who went first?",
        answer: 3, near: 1, miss: "Go round from the player who went last.",
        win: "Yes, player 3 went first." },
    ],
  },
];

/* The strips, rows and rings the working area draws (they go into the sidecar too). "n.0" is the warm-up of phase n (its guide
   steps), "n.k" the picture of question k. strip/given are what the stage hands over; blanks are the cells the row still owes. */
const MODEL = {
  items: {
    "1.0": { pic: "shape", strip: ["square", "circle", "triangle", "circle", "square", "circle", "triangle", "circle"], blanks: 0, group: 4 },
    "1.1": { pic: "bead", strip: ["red", "blue", "blue", "red", "blue", "blue"], blanks: 2, group: 3 },
    "1.2": { pic: "shape", strip: ["star", "moon", "star", "moon", "star"], blanks: 1, group: 2 },
    "1.3": { pic: "shape", strip: ["square", "square", "circle", "square", "square", "circle", "square"], blanks: 1, group: 3 },
    "2.0": { pic: "arrow", given: ["right"], blanks: 1 },
    "2.1": { pic: "arrow", given: ["down", "left"], blanks: 4, tray: true },
    "2.2": { pic: "plus", given: ["down", "left", "up"], blanks: 1 },
    "2.3": { pic: "arrow", given: ["right", "down"], blanks: 8 },
    "3.0": { counts: [6, 5, 4], blanks: 2, lay: true, hidden: true },
    "3.1": { counts: [7], blanks: 7, lay: true },
    "3.2": { counts: [5, 4, 3, 5, 4], blanks: 2 },
    "3.3": { counts: [3, 4, 5, 3, 4], blanks: 1 },
    "4.0": { ring: 4, drawn: 2, warm: true },
    "4.1": { ring: 5, drawn: 4, teams: 1 },
    "4.2": { ring: 5, drawn: 3, teams: 2 },
    "4.3": { ring: 6, last: 2 },
    "4.f": { ring: 5, free: true },
  },
};

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

const PS_DIRS = ["up", "right", "down", "left"];
/* the arrows of the tray stand in a fixed order that is neither the answer nor a way round */
const PS_TRAY = ["up", "down", "left", "right"];
const PS_NAME: any = { 2: "lines", 3: "triangle", 4: "square", 5: "pentagon", 6: "hexagon", 7: "heptagon" };

/* judge: is this value right for this item? (a number compares as a number, a choice or an order as its text) */
const judge = (item: any, v: any) => {
  if (typeof item.answer === "number") return leadNumber(v) === item.answer;
  return String(v).trim().toLowerCase() === String(item.answer).trim().toLowerCase();
};
/* oracle: every answer re-derived by a second route that shares no code with judge or Work.
   group  the smallest period of the strip read as a cycle, then the strip carried on that period
   turn   a unit vector turned ninety degrees a step, read back off its cosine and sine
   sides  the side counts as a cycle (the next count is the one a whole cycle back); the count of a row that loses a side
   order  a circular walk built by following each place's neighbour round the ring                                      */
const oracle = () => {
  const M = MODEL.items;
  const period = (a: any[]) => { for (let p = 1; p <= a.length; p++) { let ok = true; for (let i = p; i < a.length; i++) if (a[i] !== a[i - p]) { ok = false; break; } if (ok) return p; } return a.length; };
  const carry = (a: any[], k: number) => { const s = a.slice(), p = period(a); for (let j = 0; j < k; j++) s.push(s[s.length - p]); return s.slice(a.length); };
  const spin = (d0: string, steps: number) => {
    const i0 = PS_DIRS.indexOf(d0);
    let x = Math.round(Math.sin(i0 * Math.PI / 2)), y = -Math.round(Math.cos(i0 * Math.PI / 2));
    for (let s = 0; s < steps; s++) { const nx = -y, ny = x; x = nx; y = ny; }
    return x === 0 && y === -1 ? "up" : x === 1 ? "right" : y === 1 ? "down" : "left";
  };
  const walk = (size: number, from: number) => { const out: number[] = []; let at = from; for (let k = 0; k < size; k++) { out.push(at); at = at === size ? 1 : at + 1; } return out; };
  const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
  const labelOf = (it: any, id: any) => String((it.choices.find((c: any) => c.id === id) || {}).label || "").replace(/\u00A0/g, " ").toLowerCase();
  const want: any = {};
  const P1 = (k: string) => carry(M[k].strip, M[k].blanks);
  want["1.1"] = P1("1.1").join(", then ");
  want["1.2"] = P1("1.2").join(", then ");
  want["1.3"] = P1("1.3").join(", then ") + ", group of " + period(M["1.3"].strip);
  const lastOf = (k: string) => M[k].given[M[k].given.length - 1];
  want["2.1"] = [1, 2, 3, 4].map((s) => spin(lastOf("2.1"), s)).join(" ");
  want["2.2"] = spin(lastOf("2.2"), 1);
  want["2.3"] = spin(lastOf("2.3"), 8);
  const names = (c: number[], k: number) => carry(c, k).map((x) => PS_NAME[x]);
  const sides = (c: number[], k: number) => carry(c, k).join(", then ");
  let run = 0; for (let s = M["3.1"].counts[0]; s >= 3; s--) run++;
  want["3.1"] = run;
  want["3.2"] = sides(M["3.2"].counts, 2);
  want["3.3"] = names(M["3.3"].counts, 1).join(", then ");
  want["4.1"] = walk(M["4.1"].ring, M["4.1"].drawn).join(" ");
  want["4.2"] = walk(M["4.2"].ring, M["4.2"].drawn).join(" ");
  want["4.3"] = walk(M["4.3"].ring, M["4.3"].last)[1];
  return PHASES.every((p: any, k: number) => p.items.every((it: any, j: number) => {
    const w = want[`${k + 1}.${j + 1}`];
    const got = it.choices ? labelOf(it, it.answer) : String(it.answer);
    return got === String(w).toLowerCase() || (it.choices && labelOf(it, it.answer) === cap(String(w)).toLowerCase());
  }));
};
/* the most likely wrong answer (the item's own misconception); judge must reject it */
const nearMiss = (item: any) => item.near;
/* the forms of an answer that no question, hint or ladder line may print */
const answerForms = (item: any) => (item.forms ? item.forms : typeof item.answer === "number" ? [String(item.answer), words(item.answer)] : [String(item.answer)]);
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => item.answer;

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => (T.state().stage === "demo" ? HOOK.demo && HOOK.demo() : T.submit(item.answer));
/* the agent's answer() for an item made on the working area (the orders on the ring): set it as a child would; undefined = type it */
const answer = (item: any, v: any) => (item.pad === "enter" && HOOK.set ? HOOK.set(v) : undefined);
/* the agent's check() before Enter: in a guide-steps phase (stage "demo") it must return undefined */
const check = () => (HOOK.check ? HOOK.check() : undefined);

/* ── the working area: 1472 x 520 with the panel shut, 900 x 520 open (bigPad); origin at its top-left ────────── */

const PS_GAP = 8;
const PS_RED = "#C45C5C";   /* a muted red: the checks fail a saturated red on screen after a miss */
const PS_INK = { blue: CONTENT.hundred, amber: CONTENT.ten, made: CONTENT.one, step: CONTENT.pointer, look: CONTENT.bead };
/* the line of every empty box, ring, track and rim: dark ink at 3:1 or more on paper (the rule tan was 1.3 to 1.8:1) */
const psLine = (C: any) => mix(C.ink, "#FFFFFF", 0.3);

/* the row of cells: sized from the room the working area has just now (1472 wide shut, 900 open), so the picture uses the room */
const psGeo = (count: number, box: any, top: number, cap = 136) => {
  const avail = box.w - 40;
  const cell = Math.max(72, Math.min(cap, Math.floor((avail - (count - 1) * PS_GAP) / count)));
  const total = count * cell + (count - 1) * PS_GAP, pitch = cell + PS_GAP;
  const x0 = Math.round((box.w - total) / 2);
  return { cell, pitch, total, x0, top, bot: top + cell, x: (i: number) => x0 + i * pitch, cx: (i: number) => x0 + i * pitch + cell / 2, cy: top + cell / 2 };
};
/* every copy of the first k boxes along the strip, the short one at the end too, and the first box in each that breaks the match.
   A lone block (the bracket covers the whole strip) has nothing to match, so it is never lit. */
const psBlocks = (given: any[], k: number) => {
  const out: any[] = [];
  if (k < 1) return out;
  for (let s = 0; s < given.length; s += k) {
    const len = Math.min(k, given.length - s);
    let bad = -1;
    for (let t = 0; t < len; t++) if (given[s + t] !== given[t]) { bad = s + t; break; }
    out.push({ s, k: len, ok: bad < 0, bad });
  }
  if (out.length === 1) out[0] = { ...out[0], ok: false, bad: -1 };
  return out;
};
const psPeriod = (a: any[]) => { for (let p = 1; p <= a.length; p++) { let ok = true; for (let i = p; i < a.length; i++) if (a[i] !== a[i - p]) { ok = false; break; } if (ok) return p; } return a.length; };
/* what the rule puts in the blanks of a strip, a turning row or a row of side counts (the child never sees this before the answer) */
const psRight = (md: any): string[] => {
  const out: string[] = [];
  if (md.strip) { const s = md.strip.slice(); for (let j = 0; j < md.blanks; j++) s.push(s[s.length - md.group]); return s.slice(md.strip.length); }
  if (md.given) { let d = PS_DIRS.indexOf(md.given[md.given.length - 1]); for (let j = 0; j < md.blanks; j++) { d = (d + 1) % 4; out.push(PS_DIRS[d]); } return out; }
  if (md.lay) { for (let s = md.counts[0] - 1; s >= 3; s--) out.push(String(s)); return out; }
  const c = md.counts.slice(), p = psPeriod(c);
  for (let j = 0; j < md.blanks; j++) c.push(c[c.length - p]);
  return c.slice(md.counts.length).map(String);
};
const psRound = (size: number, from: number) => { const out: number[] = []; for (let k = 0; k < size; k++) out.push(((from - 1 + k) % size) + 1); return out; };

/* ── little pictures ───────────────────────────────────────────────────────────────────── */

const psPoly = (k: number, cx: number, cy: number, r: number) => {
  const pts: string[] = [], off = k === 4 ? Math.PI / 4 : 0;
  for (let i = 0; i < k; i++) { const t = -Math.PI / 2 + off + (i * 2 * Math.PI) / k; pts.push(`${(cx + r * Math.cos(t)).toFixed(1)},${(cy + r * Math.sin(t)).toFixed(1)}`); }
  return pts.join(" ");
};
const psStar = (cx: number, cy: number, r: number) => {
  const pts: string[] = [];
  for (let i = 0; i < 10; i++) { const rr = i % 2 ? r * 0.44 : r, t = -Math.PI / 2 + (i * Math.PI) / 5; pts.push(`${(cx + rr * Math.cos(t)).toFixed(1)},${(cy + rr * Math.sin(t)).toFixed(1)}`); }
  return pts.join(" ");
};
/* a filled crescent with two tips: the big circle less a smaller one set to its right */
const psMoon = (cx: number, cy: number, r: number) => {
  const ox = cx + r * 0.19, px = ox + r * 0.615, h = r * 0.789, r2 = r * 0.8;
  return `M ${px.toFixed(1)} ${(cy - h).toFixed(1)} A ${r} ${r} 0 1 0 ${px.toFixed(1)} ${(cy + h).toFixed(1)} A ${r2} ${r2} 0 1 1 ${px.toFixed(1)} ${(cy - h).toFixed(1)} Z`;
};
const psPlus = (cx: number, cy: number, r: number) => {
  const a = r * 0.34;
  return `M ${cx - a} ${cy - r} H ${cx + a} V ${cy - a} H ${cx + r} V ${cy + a} H ${cx + a} V ${cy + r} H ${cx - a} V ${cy + a} H ${cx - r} V ${cy - a} H ${cx - a} Z`;
};
const psArrow = (cx: number, cy: number, r: number) =>
  `M ${cx} ${cy - r} L ${cx + r * 0.62} ${cy - r * 0.1} L ${cx + r * 0.24} ${cy - r * 0.1} L ${cx + r * 0.24} ${cy + r} L ${cx - r * 0.24} ${cy + r} L ${cx - r * 0.24} ${cy - r * 0.1} L ${cx - r * 0.62} ${cy - r * 0.1} Z`;
/* a clockwise arc of q quarters on a circle of radius r, starting at direction index `from` (0 = up) */
const psArc = (cx: number, cy: number, r: number, from: number, q: number) => {
  const a0 = (from - 1) * Math.PI / 2, a1 = a0 + q * Math.PI / 2;
  const x0 = cx + r * Math.cos(a0), y0 = cy + r * Math.sin(a0), x1 = cx + r * Math.cos(a1), y1 = cy + r * Math.sin(a1);
  return `M ${x0.toFixed(1)} ${y0.toFixed(1)} A ${r} ${r} 0 ${q > 2 ? 1 : 0} 1 ${x1.toFixed(1)} ${y1.toFixed(1)}`;
};

/* a turn drawn as an arc with an arrowhead: a0 to a1 (radians, SVG angles), clockwise unless ccw; the head's tip lands on the end */
const psTurn = (cx: number, cy: number, r: number, a0: number, a1: number, ccw: boolean, col: string, key: any) => {
  const len = 20, d = len / r, s = ccw ? 1 : -1;
  const e = a1 + s * d;                        /* the arc stops where the head starts */
  const [p, q] = ccw ? [e, a0] : [a0, e];      /* the path is always drawn clockwise */
  const x = (a: number) => (cx + r * Math.cos(a)).toFixed(1), y = (a: number) => (cy + r * Math.sin(a)).toFixed(1);
  const t = ccw ? -1 : 1, tx = -Math.sin(e) * t, ty = Math.cos(e) * t, nx = Math.cos(e), ny = Math.sin(e), px = cx + r * Math.cos(e), py = cy + r * Math.sin(e);
  return (
    <g key={key}>
      <path d={`M ${x(p)} ${y(p)} A ${r} ${r} 0 0 1 ${x(q)} ${y(q)}`} fill="none" stroke={col} strokeWidth={8} strokeLinecap="round" />
      <polygon points={`${(px + tx * len).toFixed(1)},${(py + ty * len).toFixed(1)} ${(px + nx * 12).toFixed(1)},${(py + ny * 12).toFixed(1)} ${(px - nx * 12).toFixed(1)},${(py - ny * 12).toFixed(1)}`} fill={col} />
    </g>
  );
};

/** one face: a bead, a shape, an arrow, a dot on a plus, or a straight-sided shape (kind "2" is two lines that cannot close) */
function PsFace({ pic, kind, cx, cy, r, paint, ink, sw = 4 }: any) {
  if (pic === "bead") {
    const col = kind === "red" ? PS_RED : CONTENT.hundred;
    return (<g><circle cx={cx} cy={cy} r={r} fill={col} stroke={shade(col, 0.3)} strokeWidth={3} />
      <circle cx={cx - r * 0.34} cy={cy - r * 0.36} r={r * 0.2} fill="#FFFFFF" fillOpacity={0.5} /></g>);
  }
  if (pic === "arrow") return <path d={psArrow(cx, cy, r)} transform={`rotate(${PS_DIRS.indexOf(kind) * 90} ${cx} ${cy})`} fill={paint} stroke={ink} strokeWidth={sw} strokeLinejoin="round" />;
  if (pic === "plus") {
    const d = [[0, -r * 0.7], [r * 0.7, 0], [0, r * 0.7], [-r * 0.7, 0]][Math.max(0, PS_DIRS.indexOf(kind))];
    return (<g><path d={psPlus(cx, cy, r)} fill="none" stroke={ink} strokeWidth={sw} strokeLinejoin="round" /><circle cx={cx + d[0]} cy={cy + d[1]} r={r * 0.26} fill={paint} /></g>);
  }
  if (pic === "sided") {
    const k = +kind;
    if (k <= 2) return <path d={`M ${cx - r} ${cy + r * 0.62} L ${cx} ${cy - r * 0.72} L ${cx + r} ${cy + r * 0.62}`} fill="none" stroke={ink} strokeWidth={5} strokeLinejoin="round" strokeLinecap="round" />;
    return <polygon points={psPoly(k, cx, cy, r)} fill={paint} stroke={ink} strokeWidth={sw} strokeLinejoin="round" />;
  }
  if (kind === "circle") return <circle cx={cx} cy={cy} r={r} fill={paint} stroke={ink} strokeWidth={sw} />;
  if (kind === "square") return <rect x={cx - r * 0.88} y={cy - r * 0.88} width={r * 1.76} height={r * 1.76} rx={Math.min(RAD.piece, r * 0.22)} fill={paint} stroke={ink} strokeWidth={sw} />;
  if (kind === "triangle") return <polygon points={psPoly(3, cx, cy + r * 0.12, r * 1.08)} fill={paint} stroke={ink} strokeWidth={sw} strokeLinejoin="round" />;
  if (kind === "star") return <polygon points={psStar(cx, cy, r)} fill={paint} stroke={ink} strokeWidth={sw} strokeLinejoin="round" />;
  if (kind === "moon") return <path d={psMoon(cx, cy, r)} fill={paint} stroke={ink} strokeWidth={sw} strokeLinejoin="round" />;
  return null;
}

/** one box of a row: a floor tile (the plain card is its fallback) when it holds something, a dashed outline while it is empty; `made` = the rule made it */
function PsCell({ x, y, s, filled, made, C }: any) {
  return (
    <g>
      <rect x={x} y={y} width={s} height={s} rx={RAD.panel} fill={filled ? "url(#gCard)" : C.paper}
        stroke={made ? shade(PS_INK.made, 0.25) : filled ? C.rule : psLine(C)} strokeWidth={made ? 5 : 3} strokeDasharray={filled ? undefined : "10 10"} />
      {filled && <Skin name="cell" x={x} y={y} w={s} h={s} fit="stretch" />}
      {filled && made && <rect x={x} y={y} width={s} height={s} rx={RAD.panel} fill="none" stroke={shade(PS_INK.made, 0.25)} strokeWidth={5} />}
    </g>
  );
}

/* the child's state, one question at a time */
const psFresh = (key: string, n: number, md: any) => {
  if (n === 1) return { key, k: 1, touched: false, lit: null, demo: null };
  if (n === 2) return { key, dial: PS_DIRS.indexOf(md.given[md.given.length - 1]), turns: 0, replay: false, fills: [], demo: null };
  if (n === 3) return { key, counted: 0, laid: [], demo: null };
  return { key, drawn: md.free || md.warm ? null : md.drawn || null, order: [], order2: [], bend: 0, demo: null };
};
const psOrderValue = (S: any, md: any) => {
  const a = S.order.join(" "), b = S.order2.join(" ");
  if (!a && !b) return "";
  return (md.teams || 1) > 1 && a !== b ? a + " / " + b : a;
};

function Work({ phase, n, item, index, stage, wrong, typed, api, MODEL, step, stepOn, box, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();
  const [, bump] = useState(0);
  const playing = useRef(false);
  const free = stage === "free";
  const warm = !free && (stage === "teach" || stage === "demo");
  /* the runtime clamps `item` to the phase's last question but passes `index` raw: clamp it too */
  const at = Math.max(0, Math.min(index || 0, ((phase.items || []).length || 1) - 1));
  const key = free ? "4.f" : warm ? `${n}.0` : `${n}.${at + 1}`;
  const md = MODEL.items[key] || MODEL.items[`${n}.1`];
  const stRef = useRef<any>(null);
  if (!stRef.current || stRef.current.key !== key) stRef.current = psFresh(key, free ? 4 : n, md);
  const S = stRef.current;
  const put = (o: any) => { stRef.current = { ...stRef.current, ...o }; bump((x: number) => x + 1); };
  const act = (o: any) => put({ ...o, demo: null, nudge: null });        /* the child's next act clears the demo layer and any nudge */
  const dput = (o: any) => put({ demo: { ...(stRef.current.demo || {}), ...o } });
  const won = !free && (stage === "win" || stage === "idle");
  /* the beat after the last guide step (the step's hold) takes no input: whatever was set then would be wiped when question 1 opens */
  const holding = stage === "demo" && (!stepOn || (phase.steps && step >= phase.steps.length));
  const stepping = stage === "demo" && !!stepOn && !holding;
  const live = (stage === "ask" || free || stepping) && !tl.busy && !won;
  const P = free ? 4 : n;
  const right = md.strip || md.given || md.counts ? psRight(md) : [];

  /* every click reports its act (api.did) during a guide step: the awaited one moves the step on, any other shows the hint */
  const press = (name: string, fn: () => void) => {
    if (stepping && name !== stepOn) { api.did(name); return; }
    const st = stepping;
    fn();
    if (st) api.did(name);
  };
  /* an act performed on screen by a real tool: the state changes when it ends */
  const perform = (name: string, spec: any, apply: () => void) => {
    if (stepping && name !== stepOn) { api.did(name); return; }
    if (playing.current) return;
    const st = stepping, k0 = stRef.current.key;
    playing.current = true;
    api.act(spec).then((ok: boolean) => {
      playing.current = false;
      if (!ok || stRef.current.key !== k0) return;
      apply();
      if (st) api.did(name);
    });
  };

  /* the geometry every phase shares: the row, and the one key at the bottom centre */
  const given: any[] = md.strip || md.given || (md.counts ? md.counts.map(String) : []);
  const g = psGeo(given.length + (md.blanks || 0), box, P === 1 ? 140 : P === 3 ? 130 : 108, P === 2 ? 112 : 136);
  const KW = 264, KH = 72, KX = Math.round((box.w - KW) / 2), KY = box.h - KH - EDGE - 8;
  const dcx = g.x0 + 104, dcy = g.bot + 102;

  /* phase 1: bracket and Copy light */
  const blocks = P === 1 ? psBlocks(given, S.k) : [];
  const setK = (k: number) => { act({ k, touched: true, lit: null }); api.sfx.tick(); };
  const copyLight = () => perform("copy", { tool: "hand", moves: "sweep", ms: 900,
    at: blocks.map((b: any) => ({ x: g.x(b.s) + (b.k * g.pitch - PS_GAP) / 2, y: g.bot + 44 })),
    onPoint: (i: number) => put({ lit: { k: S.k, shown: i + 1 } }) }, () => put({ lit: { k: S.k, shown: 999 } }));
  /* phase 2: Turn. In the warm-up the dial turns on, a quarter a press. In a question it only replays the move between the last two
     arrows the stage handed over, and rests on the last one: it never shows the next arrow. */
  const quest = P === 2 && !warm && !free;
  const lastG = md.given ? PS_DIRS.indexOf(md.given[md.given.length - 1]) : 0;
  const turn = () => perform("turn", { tool: "hand", moves: "tap", ms: 700, at: [{ x: dcx, y: dcy }] },
    () => {
      api.sfx.tick();
      if (quest) put({ replay: true, demo: null });
      else put({ dial: (stRef.current.dial + 1) % 4, turns: stRef.current.turns + 1, demo: null });
    });
  /* phase 3: Count, One fewer */
  const lastSides = S.laid && S.laid.length ? S.laid[S.laid.length - 1] : md.counts ? md.counts[md.counts.length - 1] : 0;
  const nextSides = lastSides - 1 >= 3 ? lastSides - 1 : 2;
  const count = () => perform("count", { tool: "pencil", moves: "push", ms: 700,
    at: md.counts ? md.counts.map((_: any, i: number) => ({ x: g.cx(i), y: g.bot + 36 })) : [],
    onPoint: (i: number) => put({ counted: i + 1 }) }, () => put({ counted: 999 }));
  const fewer = () => perform("fewer", { tool: "pencil", moves: "push", ms: 700,
    at: [{ x: g.cx(given.length + S.laid.length), y: g.cy }] },
    () => { api.sfx.settle(); put({ laid: [...stRef.current.laid, nextSides], demo: null }); });
  /* phase 4: Draw, and the places of the ring */
  const size = md.ring || 5;
  const ringStart = md.last ? (md.last % size) + 1 : S.drawn || md.drawn || 1;
  const draw = () => perform("draw", { tool: "hand", moves: "tap", ms: 700, at: [{ x: PsRingGeo(md, box).drum.x + 60, y: PsRingGeo(md, box).drum.y + 60 }] },
    () => { api.sfx.tick(); const d = free ? (stRef.current.drawn || 0) % size + 1 : md.drawn; act({ drawn: d, order: md.warm ? [d] : [], order2: [] }); });
  const expectNext = () => psRound(size, S.drawn || md.drawn || 1)[S.order.length];
  /* a second tap on the same number within 300 ms is ignored (a double tap must not add and then take away) */
  const lastTap = useRef({ w: -1, v: -1, t: 0 });
  const dbl = (w: number, v: number) => { const now = Date.now(), L = lastTap.current; if (L.w === w && L.v === v && now - L.t < 300) return true; lastTap.current = { w, v, t: now }; return false; };
  /* the nudge "Fill every box first." stays on the bubble until the child's next act, which brings the question back */
  const nudged = useRef(false);
  const unnudge = () => { if (nudged.current) { nudged.current = false; if (item && item.say) api.say(item.say); } };
  const tapPlace = (v: number, which: number) => {
    if (dbl(which, v)) return;
    const ord = which ? S.order2 : S.order, f = which ? "order2" : "order";
    if (stepping) {
      if (stepOn !== "place") { api.did("place"); return; }
      if (v !== expectNext() || !S.drawn) { api.did("not-this-place"); return; }
      put({ order: [...S.order, v], demo: null }); api.sfx.tick(); api.did("place");
      return;
    }
    unnudge();
    const k = ord.indexOf(v);
    const o = k >= 0 ? ord.slice(0, k) : [...ord, v];
    act({ [f]: o });
    api.sfx.tick();
    if (!free) api.setTyped(psOrderValue({ ...stRef.current, [f]: o }, md));
  };

  /* Enter and the agent's check() perform the CURRENT step; on an order question Enter sends what the ring holds */
  const doStep = (on: string) => {
    if (on === "copy") copyLight();
    else if (on === "bracket") press("bracket", () => setK(md.group));
    else if (on === "turn") turn();
    else if (on === "count") count();
    else if (on === "fewer") fewer();
    else if (on === "draw") draw();
    else if (on === "place") tapPlace(expectNext(), 0);
  };
  /* what the working area would send if Enter came now: the arrows laid in a row (phase 2) or the orders read off the ring (phase 4) */
  const padVal = (st: any) => (P === 2 ? st.fills.join(" ") : psOrderValue(st, md));
  api.onEnter(stepping ? () => doStep(stepOn) : stage === "ask" && item && item.pad === "enter" ? () => {
    const st = stRef.current, v = padVal(st);
    if (!v) return;
    /* a part-filled row is not an answer: nudge, and count nothing */
    const whole = P === 2 ? st.fills.length === md.blanks : st.order.length === size && ((md.teams || 1) < 2 || st.order2.length === size);
    if (!whole) { nudged.current = true; put({ nudge: "Fill every box first." }); api.say("Fill every box first."); return; }
    /* after a correction the old wrong row is not sent again: Enter waits until the row changes */
    if (st.wrongRow === v) return;
    api.submit(v);
  } : null);
  /* phase 2, the question answered on the row: a tap on an arrow lays it in the next empty cell, a tap on a laid arrow takes it and the ones after it away */
  const trayTap = (d: string) => {
    if (!live || S.fills.length >= md.blanks) return;
    unnudge();
    const f = [...S.fills, d];
    act({ fills: f }); api.sfx.tick(); api.setTyped(f.join(" "));
  };
  const trayUndo = (j: number) => { unnudge(); const f = S.fills.slice(0, j); act({ fills: f }); api.sfx.tick(); api.setTyped(f.join(" ")); };

  /* the agent sets the working area as a child would, then Enter sends it */
  HOOK.set = (v: any) => {
    if (P === 2) {
      const f = String(v).trim().toLowerCase().split(/[\s,]+/).filter((x: string) => PS_DIRS.indexOf(x) >= 0);
      put({ fills: f, demo: null }); api.setTyped(f.join(" "));
      return true;
    }
    const parts = String(v).split("/").map((s: string) => s.trim().split(/\s+/).map((x: string) => +x).filter((x: number) => x > 0));
    put({ drawn: md.drawn || null, order: parts[0] || [], order2: parts[1] || parts[0] || [], demo: null });
    api.setTyped(String(v));
    return true;
  };
  /* the answer on the ring is complete (both teams' lines full): the Enter key in the bar blinks */
  const padItem = !free && !warm && item && item.pad === "enter";
  const full = padItem && (P === 4 ? S.order.length === size && ((md.teams || 1) < 2 || S.order2.length === size) : P === 2 ? S.fills.length === md.blanks : false);
  useEffect(() => { if (api.answerReady) api.answerReady(!!full && stage === "ask"); }, [full, stage, key]);

  /* the delight: when the order is right the line lifts off and bends into a ring, its two ends meeting (about 1.5 s) */
  useEffect(() => {
    if (stage !== "win" || free || P !== 4 || (md.teams || 1) > 1 || md.last || !item || item.kind !== "order") return;
    const st: any[] = [];
    for (let i = 1; i <= 8; i++) st.push([i === 8 ? 100 : 190, () => put({ bend: i / 8 })]);
    tl.run(st);
  }, [stage, key]);
  /* the win line, one sentence, said when the answer is right */
  useEffect(() => { if (stage === "win" && item && item.win) api.say(item.win); }, [stage, key]);
  useEffect(() => () => tl.stop(), [key]);

  /* at the win the correction goes: the right answer's picture is the whole picture */
  useEffect(() => { if (stage === "win" && stRef.current.demo) put({ demo: null }); }, [stage, key]);
  /* the traceback: redraw the maths in steps, end on the whole right answer, never mark anything; the child's own pieces stay */
  useEffect(() => {
    if (!wrong || stage !== "ask") return;
    api.lock(true);
    put({ wrongRow: String(wrong.value == null ? "" : wrong.value) });
    let steps: any[];
    if (P === 2) {
      /* the dial replays the quarter turns one at a time and each fills its box; a child who turned the wrong way round gets that arc too */
      const wv = String(wrong.value == null ? "" : wrong.value).trim().toLowerCase();
      const ccwOf = (k: number) => PS_DIRS[(((lastG - k) % 4) + 4) % 4];
      const ccwVal = md.tray ? Array.from({ length: md.blanks }, (_, i) => ccwOf(i + 1)).join(" ") : md.blanks === 1 ? ccwOf(1) : "";
      steps = [[500, () => put({ demo: { step: 1, q: 0, ccw: !!ccwVal && wv === ccwVal } })]];
      for (let q = 1; q <= md.blanks; q++) steps.push([q === md.blanks ? 800 : md.blanks > 4 ? 420 : 650, () => dput({ q })]);
    } else if (P === 4 && !md.last) {
      /* the ring is walked from the drawn number, past the last, lighting one at a time; the child's own line stays */
      steps = [[500, () => put({ demo: { step: 1, walk: 0 } })]];
      for (let w = 1; w <= size; w++) steps.push([w === size ? 800 : 550, () => dput({ walk: w })]);
    } else {
      steps = [[500, () => put({ demo: { step: 1 } })], [1400, () => dput({ step: 2 })]];
      if (P === 1) steps.push([1400, () => dput({ step: 3 })]);
      steps.push([500, () => {}]);
    }
    tl.run(steps, () => api.lock(false));
  }, [wrong]);

  /* what the host and the agent read back (toolApi.getState) */
  api.share({ strip: P === 1 ? given : P === 2 ? given : null, bracket: P === 1 ? S.k : null, turns: P === 2 ? S.turns : null, fills: P === 2 && S.fills.length ? S.fills : null,
    sideCounts: P === 3 ? [...md.counts, ...(S.laid || [])] : null, ringSize: P === 4 ? size : null, drawn: P === 4 ? S.drawn || null : null,
    order: P === 4 && S.order && S.order.length ? S.order : null, nudge: S.nudge || null, complete: stage === "idle" });

  /* the one key at the bottom centre: its label follows the act */
  let keyId: any = null, keyLabel = "", keyOn: any = null, keyOff = false;
  if (!won && (stage === "ask" || stepping || free)) {
    if (P === 1 && !free) { keyId = "copy"; keyLabel = "Copy light"; keyOn = copyLight; keyOff = !stepping && !S.touched; }
    else if (P === 2 && !free) { keyId = "turn"; keyLabel = "Turn"; keyOn = turn; }
    else if (P === 3 && !free && md.lay) {
      if (md.hidden && S.counted < 1) { keyId = "count"; keyLabel = "Count"; keyOn = count; }
      else { keyId = "fewer"; keyLabel = "One fewer"; keyOn = fewer; keyOff = lastSides <= 2; }
    }
    else if (P === 4 && (md.warm || free) && (free || !S.drawn)) { keyId = "draw"; keyLabel = "Draw"; keyOn = draw; }
  }
  const lastKey = useRef(0);
  const pressKey = () => { const t = Date.now(); if (t - lastKey.current < 400) return; lastKey.current = t; if (live && keyOn) keyOn(); };

  const X = { C, S, md, n: P, box, tx, lang, won, live, stepping, stepOn, item, put, act, press, perform, g, right, blocks, given, setK, tapPlace, trayTap, trayUndo, api, free, warm, dcx, dcy, key };
  return (
    <g>
      {P === 4 ? PsRing({ X }) : PsRows({ X })}
      {keyId && (
        <Key id={keyId} label={tx(keyLabel)} x={KX} y={KY} w={KW} h={KH} C={C} tone="key" disabled={keyOff || !live} onClick={pressKey}>
          <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={keyOff || !live ? mix(C.ink, C.panel, 0.5) : toneInk("key", C.ink)}>{tx(keyLabel)}</text>
        </Key>
      )}
      {keyId && stepping && stepOn === keyId && !keyOff && <Invite x={KX + KW / 2} y={KY + KH / 2} w={KW} h={KH} C={C} />}
    </g>
  );
}

/* ── phases 1 to 3: a row of cells ─────────────────────────────────────────────────────── */

function PsRows({ X }: any) {
  const { C, S, md, n, box, tx, won, live, stepping, stepOn, put, act, press, g, right, blocks, given, setK, api, warm, trayTap, trayUndo } = X;
  const D = S.demo || (won ? { step: 9 } : null);
  const nb = md.blanks || 0;
  const pic = n === 3 ? "sided" : md.pic;
  const kinds: string[] = [];
  given.forEach((f: string) => { if (!kinds.includes(f)) kinds.push(f); });
  const paintOf = (f: string, made: boolean) => (made ? PS_INK.made : pic !== "shape" ? PS_INK.blue : kinds.indexOf(f) === 0 ? PS_INK.blue : kinds.indexOf(f) === 1 ? PS_INK.amber : CHROME.accent);
  const fillStep = n === 1 ? 3 : 2;
  /* phase 2: how many quarter turns the correction has replayed (all of them once the answer stands) */
  const q = D ? (D.q !== undefined ? D.q : nb) : 0;
  /* what blank j holds: the child's laid shapes, or (once the answer stands) what the rule makes */
  const blank = (j: number) => {
    if (md.lay) {
      if (S.laid[j] !== undefined) return String(S.laid[j]);
      return D && D.step >= 1 && j < right.length ? right[j] : null;
    }
    if (n === 2) {
      if (D && j < q && j < right.length) return right[j];
      return md.tray && S.fills[j] !== undefined ? S.fills[j] : null;
    }
    if (D && D.step >= fillStep && j < right.length) return right[j];
    return null;
  };
  const faceR = Math.round(g.cell * 0.34);
  const ln = psLine(C);
  /* where a row of side counts turns back (the given boxes and the ones the rule makes), the two boxes either side stand 16 further
     apart once the mark is drawn; the whole row stays centred */
  const fullChain: number[] = n === 3 && !md.lay ? [...md.counts, ...right.map(Number)] : [];
  const sgn = n === 3 && md.counts.length > 1 ? (Math.sign(md.counts[1] - md.counts[0]) || -1) : -1;
  const rIdxs: number[] = fullChain.map((k, i) => (i > 0 && (k - fullChain[i - 1]) * sgn < 0 ? i : -1)).filter((i) => i > 0);
  const sx = (i: number) => (D && rIdxs.length ? rIdxs.filter((r) => i >= r).length * 16 - rIdxs.length * 8 : 0);
  const gx = (i: number) => g.x(i) + sx(i), gcx = (i: number) => g.cx(i) + sx(i);
  const countAt = (i: number) => gcx(i);
  const cellKind = (i: number) => (i < given.length ? given[i] : blank(i - given.length));
  const showCount = (i: number) => (i < given.length ? !(md.hidden && i >= S.counted) : cellKind(i) !== null);
  const chain: number[] = [];
  if (n === 3) for (let i = 0; i < given.length + nb; i++) { const k = cellKind(i); if (k !== null) chain.push(+k); else break; }
  const sign = n === 3 && md.counts.length > 1 ? Math.sign(md.counts[1] - md.counts[0]) || -1 : -1;
  const restarts = n === 3 && !md.lay ? chain.map((k, i) => (i > 0 && (k - chain[i - 1]) * sign < 0 ? i : -1)).filter((i) => i > 0) : [];
  const lit = S.lit && S.lit.k === S.k ? psBlocks(given, S.lit.k) : [];
  const shown = S.lit ? S.lit.shown : 0;
  const rightGroup = md.group || 0, rb = n === 1 ? psBlocks(given, rightGroup) : [];
  const bx1 = g.x(0) - 4, bx2 = g.x(Math.max(0, S.k - 1)) + g.cell + 4, by = g.bot + 22;
  /* the dial: in the warm-up it turns on a quarter a press; in a question it rests on the last arrow handed over (a press replays the
     move between the last two); in the correction it turns quarter by quarter, as many as it has replayed */
  const lastG = n === 2 ? PS_DIRS.indexOf(md.given[md.given.length - 1]) : 0;
  const prevG = n === 2 && md.given.length > 1 ? PS_DIRS.indexOf(md.given[md.given.length - 2]) : -1;
  let dialDir = 0, arcFrom = -1, ringQ = 0;
  if (n === 2) {
    if (D) { dialDir = (lastG + q) % 4; arcFrom = q > 0 ? (lastG + q - 1) % 4 : -1; ringQ = q; }
    else if (warm) { dialDir = S.dial; arcFrom = S.turns > 0 ? (S.dial + 3) % 4 : -1; ringQ = S.turns; }
    else { dialDir = lastG; arcFrom = S.replay ? prevG : -1; ringQ = S.replay ? 1 : 0; }
  }
  const rcx = X.dcx + 168;
  const quarters = ringQ % 4, rounds = Math.floor(ringQ / 4);

  return (
    <g>
      {/* the cells */}
      {Array.from({ length: given.length + nb }, (_, i) => i).map((i) => {
        const k = cellKind(i), made = i >= given.length && k !== null;
        return (
          <g key={i}>
            <PsCell x={gx(i)} y={g.top} s={g.cell} filled={k !== null} made={made} C={C} />
            {k !== null && <PsFace pic={pic} kind={k} cx={gcx(i)} cy={g.cy} r={faceR} paint={paintOf(k, made)} ink={shade(paintOf(k, made), 0.4)} />}
            {n === 2 && md.tray && D && i >= given.length && S.fills[i - given.length] !== undefined && i - given.length < q && S.fills[i - given.length] !== right[i - given.length] && (
              <PsFace pic="arrow" kind={S.fills[i - given.length]} cx={g.x(i) + g.cell * 0.2} cy={g.top + g.cell * 0.2} r={g.cell * 0.12} paint={PS_INK.blue} ink={shade(PS_INK.blue, 0.4)} />
            )}
          </g>
        );
      })}

      {/* phase 3: the side counts under the row (big, so a sparse screen is read from the last bench) */}
      {n === 3 && Array.from({ length: given.length + nb }, (_, i) => i).map((i) => (showCount(i)
        ? <text key={"c" + i} x={countAt(i)} y={g.bot + 56} textAnchor="middle" fontSize={T.speech} fontWeight={700}
            fill={i >= given.length ? shade(PS_INK.made, 0.3) : C.ink}>{String(cellKind(i))}</text> : null))}
      {/* where the row turns back: a mark in the gap (the correction and the win) */}
      {D && restarts.map((i: number) => {
        const x = (gx(i - 1) + g.cell + gx(i)) / 2;
        return (
          <g key={"r" + i}>
            <path d={`M ${x} ${g.top - 8} V ${g.bot + 8}`} stroke={PS_INK.step} strokeWidth={7} strokeLinecap="round" />
            <path d={`M ${x + 30} ${g.top - 18} C ${x + 18} ${g.top - 44}, ${x - 18} ${g.top - 44}, ${x - 30} ${g.top - 18}`} fill="none" stroke={PS_INK.step} strokeWidth={7} strokeLinecap="round" />
            <path d={`M ${x - 42} ${g.top - 30} L ${x - 30} ${g.top - 18} L ${x - 16} ${g.top - 30}`} fill="none" stroke={PS_INK.step} strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" />
          </g>
        );
      })}
      {/* the open end of a figure that cannot close: ringed (it is noticed, never marked) */}
      {n === 3 && md.lay && S.laid.map((k: number, j: number) => (k <= 2
        ? <circle key={"o" + j} cx={gcx(given.length + j)} cy={g.cy + 20} r={Math.round(g.cell * 0.34)} fill="none" stroke={PS_INK.look} strokeWidth={5} /> : null))}

      {/* phase 1: the child's bracket on its rail, and the copies Copy light lights */}
      {n === 1 && (
        <g>
          <path d={`M ${bx1} ${by - 14} V ${by} H ${bx2} V ${by - 14}`} fill="none" stroke={C.ink} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" />
          {lit.slice(0, shown).map((b: any) => (b.ok ? <rect key={"l" + b.s} x={g.x(b.s) - 2} y={g.bot + 36} width={b.k * g.pitch - PS_GAP + 4} height={8} rx={4} fill={PS_INK.made} /> : null))}
          {(() => { const j = lit.findIndex((b: any) => !b.ok && b.bad >= 0); return j >= 0 && j < shown ? <circle cx={g.cx(lit[j].bad)} cy={g.cy} r={Math.round(g.cell * 0.6)} fill="none" stroke={PS_INK.look} strokeWidth={5} /> : null; })()}
          {/* the correction: the smallest group bracketed, every copy lit */}
          {D && D.step >= 1 && (
            <path d={`M ${g.x(0) - 4} ${g.bot + 70} V ${g.bot + 84} H ${g.x(rightGroup - 1) + g.cell + 4} V ${g.bot + 70}`} fill="none" stroke={shade(PS_INK.made, 0.3)} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" />
          )}
          {D && D.step >= 2 && rb.filter((b: any) => b.ok).map((b: any) => (
            <rect key={"d" + b.s} x={g.x(b.s) - 2} y={g.bot + 98} width={b.k * g.pitch - PS_GAP + 4} height={8} rx={4} fill={PS_INK.made} />
          ))}
          {/* the cells are the controls: a tap puts the bracket's end on that cell */}
          {live && given.map((f: string, i: number) => (
            <Hit key={"h" + i} id={`cell-${i + 1}`} x={g.x(i)} y={g.top} w={g.cell} h={g.cell} label={`bracket the first ${i + 1} boxes`}
              onPress={() => { if (stepping && stepOn === "bracket" && i + 1 !== md.group) { api.did("wrong-box"); return; } press("bracket", () => setK(i + 1)); }} />
          ))}
          {stepping && stepOn === "bracket" && <Invite x={g.cx(md.group - 1)} y={g.cy} w={g.cell} h={g.cell} C={C} />}
        </g>
      )}

      {/* phase 2: the dial, the turn it made, and the ring that closes at four */}
      {n === 2 && (
        <g>
          <circle cx={X.dcx} cy={X.dcy} r={84} fill="url(#gCard)" stroke={ln} strokeWidth={4} filter="url(#fShadowSoft)" />
          <PsFace pic={md.pic} kind={PS_DIRS[dialDir]} cx={X.dcx} cy={X.dcy} r={30} paint={PS_INK.blue} ink={shade(PS_INK.blue, 0.3)} />
          {arcFrom >= 0 && psTurn(X.dcx, X.dcy, 65, (arcFrom - 1) * Math.PI / 2, arcFrom * Math.PI / 2, false, PS_INK.step, "cw")}
          {D && D.ccw && !won && psTurn(X.dcx, X.dcy, 46, (lastG - 1) * Math.PI / 2, (lastG - 2) * Math.PI / 2, true, PS_INK.look, "ccw")}
          <circle cx={rcx} cy={X.dcy} r={40} fill={C.paper} stroke={ln} strokeWidth={4} />
          {quarters > 0 && <path d={psArc(rcx, X.dcy, 27, 0, quarters)} fill="none" stroke={PS_INK.step} strokeWidth={16} />}
          {ringQ > 0 && quarters === 0 && <circle cx={rcx} cy={X.dcy} r={27} fill="none" stroke={shade(PS_INK.made, 0.1)} strokeWidth={16} />}
        </g>
      )}

      {/* phase 2, the question answered on the row: four arrows to lay, and a tap on a laid one takes it back */}
      {n === 2 && md.tray && (() => {
        const tx0 = Math.min(X.dcx + 168 + 90, box.w - 20 - 4 * 92 - 3 * 14), ty0 = X.dcy - 46;
        return (
          <g>
            {PS_TRAY.map((d: string, j: number) => {
              const x = tx0 + j * 106;
              return (
                <g key={d}>
                  <rect x={x} y={ty0} width={92} height={92} rx={RAD.panel} fill="url(#gCard)" stroke={ln} strokeWidth={3} />
                  <PsFace pic="arrow" kind={d} cx={x + 46} cy={ty0 + 46} r={34} paint={PS_INK.blue} ink={shade(PS_INK.blue, 0.3)} />
                  {live && <Hit id={"arrow-" + d} x={x} y={ty0} w={92} h={92} label={d + " arrow"} onPress={() => trayTap(d)} />}
                </g>
              );
            })}
            {live && S.fills.map((f: string, j: number) => (
              <Hit key={"u" + j} id={"undo-" + (j + 1)} x={g.x(given.length + j)} y={g.top} w={g.cell} h={g.cell} label={`take back arrow ${j + 1}`} onPress={() => trayUndo(j)} />
            ))}
          </g>
        );
      })()}
      {/* phase 3: the cell the key lays next */}
      {n === 3 && md.lay && stepping && stepOn === "fewer" && S.laid.length < nb && <Invite x={g.cx(given.length + S.laid.length)} y={g.cy} w={g.cell} h={g.cell} C={C} />}
      {/* phase 3, the question that asks how many: the row stands, and the whole row is counted */}
      {n === 3 && md.lay && D && D.step >= 2 && (() => {
        const cnt = 1 + right.length;
        return (
          <g>
            <path d={`M ${g.x(0) - 4} ${g.bot + 82} V ${g.bot + 96} H ${g.x(cnt - 1) + g.cell + 4} V ${g.bot + 82}`} fill="none" stroke={shade(PS_INK.made, 0.3)} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" />
            <text x={(g.x(0) + g.x(cnt - 1) + g.cell) / 2} y={g.bot + 148} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={shade(PS_INK.made, 0.3)}>{String(cnt)}</text>
          </g>
        );
      })()}
    </g>
  );
}

/* ── phase 4: a ring of numbered places ────────────────────────────────────────────────── */

const PsRingGeo = (md: any, box: any) => {
  const size = md.ring || 5, two = (md.teams || 1) > 1, first = !!md.last;
  const R = first ? 132 : two ? 76 : 112, pr = first ? 44 : two ? 30 : 42, rw = 2 * (R + pr);
  const bw = two ? 60 : 80, bg = two ? 14 : 8, lineW = size * bw + (size - 1) * bg, blockW = two ? Math.max(rw, lineW) : rw;
  const rings: any[] = [];
  /* lineY is the child's line, corrY the line the correction writes under it (nothing of the child's is covered) */
  let drum = { x: 0, y: 0 }, lineY = 232, corrY = 372;
  if (first) { rings.push({ cx: Math.round(box.w / 2), cy: 100 + R + pr }); drum = { x: -999, y: -999 }; }
  else if (two) {
    const total = 120 + 24 + blockW + 24 + blockW, x0 = Math.max(10, Math.round((box.w - total) / 2));
    const ax = x0 + 144, bx = ax + blockW + 24, cy = 140 + rw / 2;
    rings.push({ cx: ax + blockW / 2, cy, lx: ax + (blockW - lineW) / 2 }, { cx: bx + blockW / 2, cy, lx: bx + (blockW - lineW) / 2 });
    drum = { x: x0, y: cy - 60 }; lineY = 358; corrY = 432;
  } else {
    const total = rw + 56 + Math.max(lineW, 120), x0 = Math.max(10, Math.round((box.w - total) / 2));
    rings.push({ cx: x0 + rw / 2, cy: 100 + rw / 2 });
    drum = { x: x0 + rw + 56 + Math.round((Math.max(lineW, 120) - 120) / 2), y: 100 };
    rings[0].lx = x0 + rw + 56;
  }
  return { size, two, first, R, pr, bw, bg, lineW, rings, drum, lineY, corrY };
};

function PsRing({ X }: any) {
  const { C, S, md, box, tx, won, live, stepping, stepOn, item, tapPlace, free, api } = X;
  const G = PsRingGeo(md, box);
  const { size, two, first, R, pr, bw, bg, lineW, rings, drum, lineY, corrY } = G;
  const D = S.demo || (won ? { step: 9 } : null);
  const ln = psLine(C);
  const dg = first ? 52 : two ? 40 : 48;        /* the digits of the ring */
  const start = first ? (md.last % size) + 1 : S.drawn || md.drawn || 1;
  const rightOrder = psRound(size, start);
  const flagAt = first ? 0 : S.drawn || 0;
  /* the correction walks the ring from the drawn number, one place lighting at a time */
  const walk = S.demo && !first ? S.demo.walk || 0 : 0;
  const walked = rightOrder.slice(0, walk);
  const at = (r: any, k: number) => { const t = -Math.PI / 2 + (k * 2 * Math.PI) / size; return { x: r.cx + R * Math.cos(t), y: r.cy + R * Math.sin(t) }; };
  /* the delight: the child's line lifts off and bends into a ring (a ring of boxes whose two ends meet) */
  const bend = !two && !first ? S.bend || 0 : 0;
  const og = two ? 40 : 48;                      /* the digits of the order line */

  return (
    <g>
      {rings.map((r: any, w: number) => {
        /* at the win the line is the right order whatever the path that got there, so the settled ring is whole and tidy */
        const mine = won && !S.demo && !first ? rightOrder : w ? S.order2 : S.order;
        const lit = S.demo ? (first ? (D.step >= 2 ? [start] : []) : walked) : first ? (D ? [start] : []) : mine;
        const now = S.demo && !first && walk > 0 ? rightOrder[walk - 1] : 0;
        return (
          <g key={w}>
            <circle cx={r.cx} cy={r.cy} r={R} fill="none" stroke={ln} strokeWidth={4} />
            {two && <text x={r.cx} y={r.cy - R - pr - 12} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{tx(w ? "Team 2" : "Team 1")}</text>}
            {Array.from({ length: size }, (_, k) => k).map((k) => {
              const p = at(r, k), v = k + 1, isStart = flagAt === v, inOrder = lit.indexOf(v) >= 0, isNow = now === v;
              return (
                <g key={k}>
                  <circle cx={p.x} cy={p.y} r={pr} fill={inOrder ? tint(PS_INK.made, 0.72) : isStart ? tint(PS_INK.blue, 0.72) : C.paper}
                    stroke={isNow ? PS_INK.step : inOrder ? shade(PS_INK.made, 0.3) : isStart ? shade(PS_INK.blue, 0.3) : ln} strokeWidth={isNow ? 7 : isStart || inOrder ? 5 : 3} />
                  <text x={p.x} y={p.y + Math.round(dg * 0.36)} textAnchor="middle" fontSize={dg} fontWeight={700}
                    fill={inOrder ? shade(PS_INK.made, 0.3) : isStart ? shade(PS_INK.blue, 0.3) : C.ink}>{String(v)}</text>
                  {first && md.last === v && (() => {
                    const ux = (p.x - r.cx) / R, uy = (p.y - r.cy) / R;
                    return <text x={p.x + ux * (pr + 12)} y={p.y + uy * (pr + 12) + (uy > 0.5 ? 36 : uy < -0.5 ? -8 : 14)} textAnchor={ux > 0.3 ? "start" : ux < -0.3 ? "end" : "middle"}
                      fontSize={T.prompt} fontWeight={700} fill={C.ink}>{tx("last")}</text>;
                  })()}
                  {first && S.demo && S.demo.step >= 1 && md.last === v && <circle cx={p.x} cy={p.y} r={pr + 9} fill="none" stroke={PS_INK.look} strokeWidth={4} />}
                  {isStart && (
                    <g>
                      <path d={`M ${p.x} ${p.y - pr - 2} V ${p.y - pr - 38}`} stroke={C.ink} strokeWidth={4} strokeLinecap="round" />
                      <path d={`M ${p.x} ${p.y - pr - 38} L ${p.x + 28} ${p.y - pr - 28} L ${p.x} ${p.y - pr - 18} Z`} fill={PS_INK.blue} stroke={shade(PS_INK.blue, 0.3)} strokeWidth={2} strokeLinejoin="round" />
                    </g>
                  )}
                  {S.demo && !first && v === start && <circle cx={p.x} cy={p.y} r={pr + 9} fill="none" stroke={PS_INK.look} strokeWidth={4} />}
                </g>
              );
            })}
            {first && D && D.step >= 2 && (() => {
              const off = 2 * Math.asin(Math.min(1, (pr + 6) / (2 * R)));
              const a0 = -Math.PI / 2 + ((md.last - 1) * 2 * Math.PI) / size + off, a1 = -Math.PI / 2 + ((start - 1) * 2 * Math.PI) / size - off;
              return psTurn(r.cx, r.cy, R, a0, a1, false, PS_INK.step, "walk");
            })()}
            {/* the order line: one box a number, filled as the ring is read off; the child's own line is never covered */}
            {!first && (() => {
              const lx = r.lx, ly = lineY;
              const full = mine.length === size && mine.every((v: number, i: number) => v === rightOrder[i]);
              const tcx = lx + lineW / 2, tcy = 386, rr = 92, bs = 58;
              const boxAt = (k: number) => {
                const sx = lx + k * (bw + bg) + bw / 2, sy = ly + bw / 2;
                if (!bend) return { cx: sx, cy: sy, s: bw };
                const t = -Math.PI / 2 + (k * 2 * Math.PI) / size, ex = tcx + rr * Math.cos(t), ey = tcy + rr * Math.sin(t);
                return { cx: sx + (ex - sx) * bend, cy: sy + (ey - sy) * bend, s: bw + (bs - bw) * bend };
              };
              /* every box first, then every digit, so a digit is never half covered by the box that passes over it */
              const rowOf = (vals: any[], y: number, id: string, withBoxAt: boolean) => {
                const bs0 = Array.from({ length: size }, (_, k) => (withBoxAt ? boxAt(k) : { cx: lx + k * (bw + bg) + bw / 2, cy: y + bw / 2, s: bw }));
                return [
                  ...bs0.map((b: any, k: number) => (
                    <rect key={id + "r" + k} x={b.cx - b.s / 2} y={b.cy - b.s / 2} width={b.s} height={b.s} rx={RAD.piece} fill={vals[k] ? "url(#gCard)" : C.paper}
                      stroke={vals[k] ? shade(PS_INK.made, 0.25) : ln} strokeWidth={vals[k] ? 4 : 3} strokeDasharray={vals[k] ? undefined : "9 9"} />
                  )),
                  ...bs0.map((b: any, k: number) => (vals[k]
                    ? <text key={id + "t" + k} x={b.cx} y={b.cy + Math.round(og * 0.36)} textAnchor="middle" fontSize={og} fontWeight={700} fill={shade(PS_INK.made, 0.3)} fillOpacity={withBoxAt && bend > 0 && bend < 1 ? 0 : 1}>{String(vals[k])}</text> : null)),
                ];
              };
              const arcOf = (y: number) => (
                <g>
                  <path d={`M ${lx + (size - 1) * (bw + bg) + bw / 2} ${y + bw + 6} C ${lx + (size - 1) * (bw + bg)} ${y + bw + 56}, ${lx + bw} ${y + bw + 56}, ${lx + bw / 2} ${y + bw + 6}`}
                    fill="none" stroke={PS_INK.step} strokeWidth={5} strokeLinecap="round" />
                  <path d={`M ${lx + bw / 2 - 12} ${y + bw + 22} L ${lx + bw / 2} ${y + bw + 4} L ${lx + bw / 2 + 12} ${y + bw + 22}`} fill="none" stroke={PS_INK.step} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />
                </g>
              );
              return (
                <g>
                  {bend > 0 && <circle cx={tcx} cy={tcy} r={rr} fill="none" stroke={ln} strokeWidth={4} strokeOpacity={bend} />}
                  {rowOf(mine, ly, "m", true)}
                  {bend >= 1 && (
                    <g>
                      <path d={`M ${tcx} ${tcy - rr - bs / 2 - 2} V ${tcy - rr - bs / 2 - 38}`} stroke={C.ink} strokeWidth={4} strokeLinecap="round" />
                      <path d={`M ${tcx} ${tcy - rr - bs / 2 - 38} L ${tcx + 28} ${tcy - rr - bs / 2 - 28} L ${tcx} ${tcy - rr - bs / 2 - 18} Z`} fill={PS_INK.blue} stroke={shade(PS_INK.blue, 0.3)} strokeWidth={2} strokeLinejoin="round" />
                    </g>
                  )}
                  {full && !two && !bend && arcOf(ly)}
                  {S.demo && rowOf(walked, corrY, "c", false)}
                  {S.demo && !two && walk >= size && arcOf(corrY)}
                </g>
              );
            })()}
          </g>
        );
      })}

      {/* the draw drum: a clay pot, the drawn number on a cream chip over its dark mouth */}
      {!first && (
        <g>
          <rect x={drum.x} y={drum.y} width={120} height={120} rx={RAD.panel} fill="url(#gPanel)" stroke={ln} strokeWidth={3} filter="url(#fShadowSoft)" />
          <Skin name="pot" x={drum.x} y={drum.y} w={120} h={120} />
          <rect x={drum.x + 21} y={drum.y + 28} width={78} height={64} rx={14} fill="#FFF4E0" stroke={C.rule} strokeWidth={2} />
          {S.drawn ? <text x={drum.x + 60} y={drum.y + 74} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={shade(PS_INK.blue, 0.3)}>{String(S.drawn)}</text>
            : <path d={`M ${drum.x + 42} ${drum.y + 60} h 36 M ${drum.x + 60} ${drum.y + 42} v 36`} stroke={C.dim} strokeWidth={6} strokeLinecap="round" />}
        </g>
      )}

      {/* the numbers of the ring are the controls (not on the question that is typed) */}
      {live && !first && rings.map((r: any, w: number) => Array.from({ length: size }, (_, k) => k).map((k) => {
        const p = at(r, k);
        return <Hit key={w + "-" + k} id={`ring${w + 1}-place-${k + 1}`} x={p.x - 38} y={p.y - 38} w={76} h={76} label={`number ${k + 1}`} onPress={() => tapPlace(k + 1, w)} />;
      }))}
      {stepping && stepOn === "place" && S.drawn && <Invite x={at(rings[0], rightOrder[S.order.length] - 1).x} y={at(rings[0], rightOrder[S.order.length] - 1).y} r={pr + 12} C={C} />}
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase:
   result.last = { item, it, value, answer, kind, shared } (it = the item, from r24) */
function Thumb({ n, result, it, C, w, h, lang = "en", tx = (v: any) => v }: any) {
  const last = result && result.last;
  if (!last || last.value === null || last.value === undefined) return null;
  const item = it || (PHASES[n - 1] && PHASES[n - 1].items[last.item]) || {};
  const md = MODEL.items[item.mk] || null;
  const cy = h / 2, ln = psLine(C);
  const box = (
    <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={ln} strokeWidth={1.5} />
  );
  if (!md) return <g>{box}</g>;
  if (md.ring) {
    /* a small ring, the start filled and the last number hollow, then the order as the child gave it */
    const list = String(last.value).split("/")[0].trim().split(/\s+/).filter((x: string) => x);
    const size = md.ring, rr = Math.min(26, h / 2 - 12), rx = 8 + rr + 8, start = +(list[0] || 1);
    return (
      <g>{box}
        <circle cx={rx} cy={cy} r={rr} fill="none" stroke={ln} strokeWidth={2.5} />
        {Array.from({ length: size }, (_, k) => {
          const t = -Math.PI / 2 + (k * 2 * Math.PI) / size, on = k + 1 === start;
          return <circle key={k} cx={rx + rr * Math.cos(t)} cy={cy + rr * Math.sin(t)} r={on ? 9 : 6} fill={on ? PS_INK.made : C.paper} stroke={md.last === k + 1 ? C.ink : on ? shade(PS_INK.made, 0.3) : ln} strokeWidth={2.5} />;
        })}
        <text x={rx + rr + 24} y={cy + 10} fontSize={T.micro} fontWeight={700} fill={shade(PS_INK.made, 0.3)}>{list.join(" ")}</text>
      </g>
    );
  }
  const pic = md.counts ? "sided" : md.pic;
  const given: string[] = md.strip || md.given || md.counts.map(String);
  const rt = psRight(md);
  /* the last of the stage's boxes and the ones the rule made (at most six boxes, so each is read at a glance) */
  const cells = [...given.slice(-2), ...rt.slice(-4)], madeFrom = Math.min(2, given.length);
  const kinds: string[] = [];
  given.forEach((f: string) => { if (!kinds.includes(f)) kinds.push(f); });
  const paintOf = (f: string, made: boolean) => (made ? PS_INK.made : pic !== "shape" ? PS_INK.blue : kinds.indexOf(f) === 0 ? PS_INK.blue : kinds.indexOf(f) === 1 ? PS_INK.amber : CHROME.accent);
  const s = Math.min(54, Math.floor((w - 16) / cells.length) - 4), x0 = Math.round((w - (cells.length * (s + 4) - 4)) / 2);
  return (
    <g>{box}{cells.map((k: string, i: number) => {
      const made = i >= madeFrom;
      return (
        <g key={i}>
          <rect x={x0 + i * (s + 4)} y={cy - s / 2} width={s} height={s} rx={8} fill={made ? "url(#gCard)" : C.paper} stroke={made ? shade(PS_INK.made, 0.25) : ln} strokeWidth={2} />
          <PsFace pic={pic} kind={k} cx={x0 + i * (s + 4) + s / 2} cy={cy} r={s * 0.4} paint={paintOf(k, made)} ink={shade(paintOf(k, made), 0.4)} sw={2.5} />
        </g>
      );
    })}
    </g>
  );
}

function PatternStrip(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, fitHost: () => null,
      /* the board layout (LAYOUT.md §1b): the working area is the whole card until the child taps Answer */
      board: true,
      /* KEY ONLY (the new look; LAYOUT.md §1d): no question bar, only its blinking key at the top right; the key's corner is props.box.key */
      keyOnly: true,
      /* the wide keypad: the answer panel is 556 wide and the picture has x 64 to 964 while it is open (a row of up to nine cells fits) */
      bigPad: true,
      /* the Next key: nothing moves on by itself; the win picture waits for the child's tap */
      nextKey: true,
      /* NAV DOTS (the new look): one small clickable dot per phase */
      navDots: true,
      /* the start page: the tool's name, StartArt, START_HOOK, a Start key */
      StartArt, START_HOOK,
      }} />
  );
}

export default PatternStrip;
