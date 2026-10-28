/* ═══ M1.S2.T4.C16.2D1 · weigh_it · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists: header + its three controls, canvas, slot + pad, bubble + mascot,
   phase dots (user / AI mode), window.toolApi, the sound effects, the printed bubble, scoring, the
   events, idle and restart. THE LESSON IS SILENT (runtime r30): nothing is spoken; every line is
   printed on the bubble, which is the guide. The lesson is action-driven: nothing moves on unless the
   child acts. THE NEW LOOK (keyOnly, navDots; docs/LAYOUT.md §1d-§1e, docs/PATTERNS.md §15-§16).
   NO imports in this file; only the five host hooks. Follow docs/LAYOUT.md and docs/PATTERNS.md.

   WEIGH IT (the owner's description, 2026-10-28, wins over the plan brief's phase titles):
   1 grams or kilograms for familiar things (each weighed against a 1 kg iron weight)
   2 balance a thing with standard weights and type its weight (the unit beside the box)
   3 four equal 250 g packets make 1 kg: two make half a kilogram, one a quarter
   4 weight comparisons with two new things (a big LIGHT pillow, a small HEAVY brick), fewer hints
   The beam tilts by the true difference of the grams on its two pans, never by size. */

const TOOL_ID = "weigh_it";
const MEDIA_ID = "M1.S2.T4.C16.2D1";
const TOOL_NAME = "Weigh It";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
/* kept for the tool object's shape (and the sidecar); nothing speaks from r30 */
const VOICE = {"rate":0.92,"pitch":1.06};

/* printed on the bubble before phase 1's teach lines only (the plan's opening line; not shown when phase 1 has steps) */
const OPENING = ["A balance, some iron weights and a table of real things. What shall we weigh first?"];
/* the whole-tool line (not shown from r44; kept for the sidecar) */
const FINISH_LINE = "You made the beam level, and you told heavy things from light things.";
/* printed when the child opens Free play: every thing and every weight is on the shelf there */
const FREE_LINE = "Free play. Put anything on the pan and add any weights you like.";

/* THE START PAGE (docs/LAYOUT.md §1c): a level balance with real things beside it; no digit, no sentence */
const START_HOOK = "Is a bigger thing always a heavier thing?";
function StartArt({ box, C, lang, tx }: any) {
  const cx = box.w / 2, cy = 70, half = 150, cord = 170;
  return (
    <g>
      <defs>
        <linearGradient id="wiBrass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F8E090" />
          <stop offset="35%" stopColor="#D4A238" />
          <stop offset="75%" stopColor="#B37E22" />
          <stop offset="100%" stopColor="#6E480A" />
        </linearGradient>
        <linearGradient id="wiWood" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E2B176" />
          <stop offset="25%" stopColor="#C99A62" />
          <stop offset="80%" stopColor="#A2723C" />
          <stop offset="100%" stopColor="#754E22" />
        </linearGradient>
        <linearGradient id="wiIron" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5C636B" />
          <stop offset="30%" stopColor="#3E444B" />
          <stop offset="85%" stopColor="#24282D" />
          <stop offset="100%" stopColor="#14171A" />
        </linearGradient>
        <filter id="wiShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#1E2124" floodOpacity="0.18" />
        </filter>
      </defs>
      {/* Table top */}
      <rect x={2} y={box.h - 38} width={box.w - 4} height={34} rx={12} fill="url(#wiWood)" stroke="#6B451B" strokeWidth={3} filter="url(#wiShadow)" />
      <rect x={12} y={box.h - 38} width={box.w - 24} height={6} rx={3} fill="#FFF" fillOpacity={0.2} pointerEvents="none" />
      
      {/* Post & Base */}
      <rect x={cx - 12} y={cy} width={24} height={box.h - 38 - cy - 22} rx={8} fill="url(#wiBrass)" stroke="#5E4008" strokeWidth={2} />
      <path d={`M ${cx - 70} ${box.h - 38} L ${cx - 44} ${box.h - 64} L ${cx + 44} ${box.h - 64} L ${cx + 70} ${box.h - 38} Z`} fill="url(#wiBrass)" stroke="#5E4008" strokeWidth={2} />
      
      {/* Beam */}
      <rect x={cx - half - 10} y={cy - 9} width={2 * half + 20} height={18} rx={9} fill="url(#wiBrass)" stroke="#5E4008" strokeWidth={2.5} />
      <rect x={cx - half - 6} y={cy - 6} width={2 * half + 12} height={4} rx={2} fill="#FFF" fillOpacity={0.35} pointerEvents="none" />
      
      {/* Cords & Pans */}
      {[-1, 1].map((sd) => (
        <g key={sd}>
          <line x1={cx + sd * half} y1={cy} x2={cx + sd * half - 86} y2={cy + cord} stroke="#4A3824" strokeWidth={3.5} strokeLinecap="round" />
          <line x1={cx + sd * half} y1={cy} x2={cx + sd * half + 86} y2={cy + cord} stroke="#4A3824" strokeWidth={3.5} strokeLinecap="round" />
          <path d={`M ${cx + sd * half - 95} ${cy + cord} L ${cx + sd * half + 95} ${cy + cord} Q ${cx + sd * half + 75} ${cy + cord + 26} ${cx + sd * half} ${cy + cord + 26} Q ${cx + sd * half - 75} ${cy + cord + 26} ${cx + sd * half - 95} ${cy + cord} Z`} fill="url(#wiBrass)" stroke="#5E4008" strokeWidth={2.5} />
          <ellipse cx={cx + sd * half} cy={cy + cord} rx={95} ry={7} fill="#F8E090" fillOpacity={0.4} stroke="#5E4008" strokeWidth={1.5} />
        </g>
      ))}
      <circle cx={cx} cy={cy} r={14} fill="url(#wiBrass)" stroke="#5E4008" strokeWidth={2} />
      <circle cx={cx} cy={cy} r={5} fill="#3A2805" />

      {/* Standard real objects waiting on table */}
      {wiObjArt("watermelon", cx - 595, box.h - 38 - 137, 190, 137, "sa1")}
      {wiObjArt("pillow", cx - 400, box.h - 38 - 160, 146, 160, "sa2")}
      {wiObjArt("brick", cx + 262, box.h - 38 - 67, 128, 67, "sa3")}
      {wiObjArt("mango", cx + 400, box.h - 38 - 84, 100, 84, "sa4")}
      {wiObjArt("sack", cx + 510, box.h - 38 - 100, 75, 100, "sa5")}
    </g>
  );
}

/* Hindi and Gujarati (docs/PATTERNS.md §11): filled in the language pass, once the English is final and reviewed. */
const TR: any = {
  hi: {
    "Weigh It": "इसे तौलो",
    "A balance, some iron weights and a table of real things. What shall we weigh first?": "एक तराज़ू, कुछ लोहे के बाट और मेज़ पर असली चीज़ें। पहले क्या तौलें?",
    "You made the beam level, and you told heavy things from light things.": "तुमने डंडी को बराबर किया और भारी-हल्की चीज़ों को पहचाना।",
    "Free play. Put anything on the pan and add any weights you like.": "मुक्त खेल। पलड़े पर कुछ भी रखो और जितने चाहो बाट जोड़ो।",
    "Is a bigger thing always a heavier thing?": "क्या बड़ी चीज़ हमेशा ज़्यादा भारी होती है?",
    "Heavy and light: kilograms and grams": "भारी और हल्का: किलोग्राम और ग्राम",
    "Weigh each thing against 1 kg and pick the unit that fits it.": "हर चीज़ को 1 किग्रा के बाट से तौलो और उसके लिए सही इकाई चुनो।",
    "Tap the 1 kg weight to put it on a pan.": "पलड़े पर रखने के लिए 1 किग्रा का बाट छुओ।",
    "Tap the iron weight marked 1 kg.": "1 किग्रा लिखा लोहे का बाट छुओ।",
    "Now tap the tray of gram weights to put 1,000 g on the other pan.": "अब दूसरे पलड़े पर 1,000 ग्राम रखने के लिए ग्राम वाले बाटों की ट्रे छुओ।",
    "Tap the tray with four small weights.": "चार छोटे बाटों वाली ट्रे छुओ।",
    "Weigh the thing against the iron weight.": "चीज़ को लोहे के बाट से तौलो।",
    "Watch which pan goes lower.": "देखो कौन-सा पलड़ा नीचे जाता है।",
    "We weigh heavy things in kilograms and light things in grams.": "भारी चीज़ें किलोग्राम में और हल्की चीज़ें ग्राम में तौली जाती हैं।",
    "You learned: heavy things in kilograms, light in grams; 1 kg = 1,000 g": "तुमने सीखा: भारी चीज़ें किलोग्राम में, हल्की ग्राम में; 1 किग्रा = 1,000 ग्राम",
    "Put the watermelon on the pan, then choose grams or kilograms for its weight.": "तरबूज़ पलड़े पर रखो, फिर उसके वज़न की इकाई चुनो: ग्राम या किलोग्राम।",
    "Grams or kilograms?": "ग्राम या किलोग्राम?",
    "grams": "ग्राम",
    "kilograms": "किलोग्राम",
    "Look at the beam: which side did the watermelon pull down?": "डंडी को देखो: तरबूज़ ने किस तरफ़ का पलड़ा नीचे खींचा?",
    "The watermelon is heavier than the 1 kg weight on the other pan.": "तरबूज़ दूसरे पलड़े के 1 किग्रा के बाट से भारी है।",
    "A thing heavier than 1 kg is weighed in the bigger unit.": "1 किग्रा से भारी चीज़ बड़ी इकाई में तौली जाती है।",
    "Yes, kilograms: the watermelon pulled its pan below the 1 kg weight.": "हाँ, किलोग्राम: तरबूज़ का पलड़ा 1 किग्रा के बाट से नीचे चला गया।",
    "Now put the pencil on the pan: which unit fits its weight, grams or kilograms?": "अब पेंसिल पलड़े पर रखो: उसके वज़न के लिए ग्राम या किलोग्राम?",
    "Unit for a pencil?": "पेंसिल के लिए इकाई?",
    "Did the pencil lift the 1 kg weight, or did the 1 kg side go down?": "क्या पेंसिल ने 1 किग्रा का बाट उठाया, या 1 किग्रा वाला पलड़ा नीचे गया?",
    "The 1 kg side went down, so the pencil is much lighter than 1 kg.": "1 किग्रा वाला पलड़ा नीचे गया, इसलिए पेंसिल 1 किग्रा से बहुत हल्की है।",
    "1 kg is 1,000 g, so a pencil weighs only a few of the small units.": "1 किग्रा में 1,000 ग्राम होते हैं: पेंसिल बस कुछ छोटी इकाइयों की है।",
    "Yes, grams: the pencil is far lighter than 1 kg.": "हाँ, ग्राम: पेंसिल 1 किग्रा से बहुत ज़्यादा हल्की है।",
    "Weigh the mango and the bag of rice: which one do we weigh in kilograms?": "आम और चावल की बोरी को तौलो: किसे हम किलोग्राम में तौलेंगे?",
    "Which in kilograms?": "किसे किलोग्राम में?",
    "mango": "आम",
    "bag of rice": "चावल की बोरी",
    "Put each one on the pan and see if it is heavier than the 1 kg weight.": "हर चीज़ को पलड़े पर रखो और देखो कि वह 1 किग्रा के बाट से भारी है या नहीं।",
    "The heavy thing is the one that pulls its pan down.": "भारी चीज़ वही है जो अपना पलड़ा नीचे खींचती है।",
    "Weigh the mango, then the rice: which one lifts the 1 kg weight?": "पहले आम को, फिर चावल को तौलो: कौन-सी चीज़ 1 किग्रा के बाट को ऊपर उठाती है?",
    "Yes, the bag of rice goes in kilograms and the mango in grams.": "हाँ, चावल की बोरी को किलोग्राम में और आम को ग्राम में तौलते हैं।",
    "A balance and standard weights": "तराज़ू और मानक बाट",
    "Add weights to the other pan until the beam is level.": "दूसरे पलड़े में बाट जोड़ो, जब तक डंडी बराबर न हो जाए।",
    "Tap the 1 kg weight to put it on the empty pan.": "खाली पलड़े पर रखने के लिए 1 किग्रा का बाट छुओ।",
    "Tap the iron weight with 1 kg on it.": "जिस लोहे के बाट पर 1 किग्रा लिखा है, उसे छुओ।",
    "The bag is still heavier, so tap that 1 kg weight to take it off.": "बैग अब भी भारी है, इसलिए उतारने के लिए उस 1 किग्रा के बाट को छुओ।",
    "Tap the weight sitting on the pan.": "पलड़े पर रखा बाट छुओ।",
    "Now put the 2 kg weight on the pan and watch the beam.": "अब 2 किग्रा का बाट पलड़े पर रखो और डंडी को देखो।",
    "Tap the biggest iron weight.": "सबसे बड़ा लोहे का बाट छुओ।",
    "Look at the needle at the top of the post.": "खंभे के ऊपर लगे काँटे को देखो।",
    "A straight needle means the beam is level.": "काँटा सीधा हो तो डंडी बराबर है।",
    "When the beam is level, both pans hold the same weight.": "डंडी बराबर हो तो दोनों पलड़ों में एक जितना वज़न होता है।",
    "You learned: when the beam is level, the weights tell the thing's weight": "तुमने सीखा: डंडी बराबर हो, तो बाटों से चीज़ का वज़न पता चलता है",
    "Add weights until the beam is level, then type what the watermelon weighs.": "डंडी बराबर होने तक बाट जोड़ो, फिर लिखो कि तरबूज़ का वज़न कितना है।",
    "Watermelon weighs?": "तरबूज़ का वज़न?",
    "Add every weight on the pan, not only the biggest one.": "पलड़े के सारे बाट जोड़ो, सिर्फ़ सबसे बड़ा नहीं।",
    "Two weights balance the watermelon: read both labels.": "दो बाट मिलकर तरबूज़ को बराबर करते हैं: दोनों पर लिखा पढ़ो।",
    "Start at 2 kg and count on the other weight.": "2 किग्रा से शुरू करो और दूसरे बाट को आगे गिनो।",
    "The balance is level, and 2 kg and 1 kg make 3 kg.": "तराज़ू बराबर है, और 2 किग्रा तथा 1 किग्रा मिलकर 3 किग्रा होते हैं।",
    "weight": "वज़न",
    "kg": "किग्रा",
    "Balance the mango with gram weights, then type its weight.": "आम को ग्राम वाले बाटों से बराबर करो, फिर उसका वज़न लिखो।",
    "Mango weighs?": "आम का वज़न?",
    "The mango needs the small weight as well as the 200 g one.": "आम के लिए 200 ग्राम के बाट के साथ छोटा बाट भी चाहिए।",
    "The beam is level, so the mango weighs as much as both weights together.": "डंडी बराबर है, इसलिए आम का वज़न दोनों बाटों के कुल वज़न के बराबर है।",
    "Add 200 g and 100 g.": "200 ग्राम और 100 ग्राम जोड़ो।",
    "Level again: 200 g and 100 g make 300 g.": "फिर से बराबर: 200 ग्राम और 100 ग्राम मिलकर 300 ग्राम होते हैं।",
    "g": "ग्राम",
    "The parcel is 1 kg: add one weight to level the pans, then type that weight.": "पार्सल 1 किग्रा का है: एक बाट जोड़कर पलड़े बराबर करो और वह बाट लिखो।",
    "Weight added?": "जोड़ा गया वज़न?",
    "Type only the weight you added, not the ones already on the pan.": "सिर्फ़ वही वज़न लिखो जो तुमने जोड़ा है, पलड़े पर पहले से रखे बाटों का नहीं।",
    "1 kg is 1,000 g, and the pan had 500 g, 200 g and 200 g before.": "1 किग्रा में 1,000 ग्राम हैं: पलड़े पर पहले 500, 200 और 200 ग्राम थे।",
    "How many grams take 900 g up to 1,000 g?": "900 ग्राम को 1,000 ग्राम बनाने के लिए कितने ग्राम चाहिए?",
    "Yes, 900 g and 100 g make 1,000 g, the same as 1 kg.": "हाँ, 900 ग्राम और 100 ग्राम मिलकर 1,000 ग्राम होते हैं, यानी 1 किग्रा।",
    "added": "जोड़ा",
    "Half a kilogram and a quarter of a kilogram": "आधा किलोग्राम और चौथाई किलोग्राम",
    "Four equal packets of sugar make 1 kg.": "चीनी के चार बराबर पैकेट मिलकर 1 किग्रा होते हैं।",
    "Tap a packet of sugar to put it on the pan.": "पलड़े पर रखने के लिए चीनी का एक पैकेट छुओ।",
    "Tap one of the four sugar packets.": "चीनी के चार पैकेटों में से एक छुओ।",
    "Tap the tray to put the other three packets on the pan too.": "बाकी तीन पैकेट भी पलड़े पर रखने के लिए ट्रे छुओ।",
    "Tap the blue 1 kg strip of the tray.": "ट्रे की नीली 1 किग्रा वाली पट्टी छुओ।",
    "Look at the tray of four equal packets.": "चार बराबर पैकेटों की ट्रे को देखो।",
    "The four packets together balance the 1 kg weight.": "चारों पैकेट मिलकर 1 किग्रा के बाट के बराबर हैं।",
    "Each of four equal packets is a quarter of a kilogram.": "चार बराबर पैकेटों में से हर एक चौथाई किलोग्राम का है।",
    "You learned: 4 equal packets make 1 kg, so 2 make half and 1 a quarter": "तुमने सीखा: 4 बराबर पैकेट से 1 किग्रा बनता है; 2 से आधा और 1 से चौथाई",
    "Balance the 500 g weight with two packets: how much do two packets weigh?": "दो पैकेट से 500 ग्राम का बाट बराबर करो: दो पैकेट कितने भारी हैं?",
    "Two packets weigh?": "दो पैकेट का वज़न?",
    "a quarter of a kilogram": "चौथाई किलोग्राम",
    "half a kilogram": "आधा किलोग्राम",
    "1 kilogram": "1 किलोग्राम",
    "Four packets make 1 kg: what part of the four is on the pan?": "चार पैकेट मिलकर 1 किग्रा होते हैं: चारों का कितना भाग पलड़े पर है?",
    "Count the empty places in the tray: how many of the four are gone?": "ट्रे की खाली जगहें गिनो: चार में से कितने पैकेट गए?",
    "The 500 g weight balances them, and 1 kg is 1,000 g.": "500 ग्राम का बाट उन्हें बराबर करता है, और 1 किग्रा 1,000 ग्राम का होता है।",
    "Yes, two packets make half a kilogram, and half a kilogram is 500 g.": "हाँ, दो पैकेट मिलकर आधा किलोग्राम होते हैं, और आधा किलोग्राम 500 ग्राम होता है।",
    "Put one packet on the pan, balance it with weights and type its weight.": "एक पैकेट पलड़े पर रखो, उसे बाटों से बराबर करो और उसका वज़न लिखो।",
    "One packet weighs?": "एक पैकेट का वज़न?",
    "Add the grams of the weights that made the beam level.": "जिन बाटों से डंडी बराबर हुई, उनके ग्राम जोड़ो।",
    "Read the bigger weight first, then add the smaller one to it.": "पहले बड़े बाट को पढ़ो, फिर उसमें छोटे बाट को जोड़ो।",
    "Count on from 200 g by the grams of the small weight.": "200 ग्राम से आगे छोटे बाट के ग्राम जितना गिनो।",
    "Yes, 200 g and 50 g make 250 g for one packet.": "हाँ, एक पैकेट के लिए 200 ग्राम और 50 ग्राम मिलकर 250 ग्राम होते हैं।",
    "Put loaves on the pan one by one: about how many loaves weigh 1 kg?": "ब्रेड को एक-एक करके पलड़े पर रखो: लगभग कितनी ब्रेड का वज़न 1 किग्रा होगा?",
    "Loaves for 1 kg?": "1 किग्रा के लिए ब्रेड?",
    "Watch the beam as each loaf goes on: when is it nearly level?": "हर ब्रेड रखते समय डंडी को देखो: वह कब लगभग बराबर होती है?",
    "With one loaf the 1 kg side stays down, so try another loaf.": "एक ब्रेड से 1 किग्रा वाला पलड़ा नीचे ही रहता है, इसलिए दूसरी ब्रेड रखकर देखो।",
    "Each loaf weighs about half a kilogram: how many halves make 1 kg?": "हर ब्रेड का वज़न लगभग आधा किलोग्राम है: कितने आधे मिलकर 1 किग्रा बनाते हैं?",
    "Yes, about 2 loaves weigh 1 kg.": "हाँ, लगभग 2 ब्रेड का वज़न 1 किग्रा होता है।",
    "how many": "कितनी",
    "loaves": "ब्रेड",
    "More than or less than one kilogram": "एक किलोग्राम से ज़्यादा या कम",
    "Now weigh the things on your own and let the beam decide.": "अब चीज़ों को खुद तौलो और डंडी को फ़ैसला करने दो।",
    "Put the thing on a pan and watch the needle.": "चीज़ को पलड़े पर रखो और काँटे को देखो।",
    "The heavier side goes down.": "भारी वाला पलड़ा नीचे जाता है।",
    "A thing is more than 1 kg when it pulls the beam down against the 1 kg weight.": "जब कोई चीज़ 1 किग्रा के बाट के सामने डंडी को नीचे खींचे, तो वह 1 किग्रा से ज़्यादा होती है।",
    "You learned: a thing over 1 kg pulls the beam down against 1 kg": "तुमने सीखा: 1 किग्रा से भारी चीज़ 1 किग्रा के सामने डंडी को नीचे खींचती है",
    "Weigh the school bag and the pencil: which one weighs more than 1 kg?": "स्कूल बैग और पेंसिल को तौलो: किसका वज़न 1 किग्रा से ज़्यादा है?",
    "More than 1 kg?": "1 किग्रा से ज़्यादा?",
    "school bag": "स्कूल बैग",
    "pencil": "पेंसिल",
    "Weigh both things, one after the other, against the 1 kg weight.": "दोनों चीज़ों को बारी-बारी से 1 किग्रा के बाट के सामने तौलो।",
    "Which thing sinks lower than the 1 kg weight?": "कौन-सी चीज़ 1 किग्रा के बाट से नीचे जाती है?",
    "When the 1 kg weight rises, the thing on the other pan is heavier.": "जब 1 किग्रा का बाट ऊपर उठे, तो दूसरे पलड़े की चीज़ ज़्यादा भारी होती है।",
    "Yes, the school bag is heavier than 1 kg.": "हाँ, स्कूल बैग 1 किग्रा से भारी है।",
    "Put the pillow on one pan and the brick on the other: which one is heavier?": "तकिये को एक पलड़े पर और ईंट को दूसरे पलड़े पर रखो: कौन ज़्यादा भारी है?",
    "Which is heavier?": "कौन ज़्यादा भारी है?",
    "pillow": "तकिया",
    "brick": "ईंट",
    "Put the pillow and the brick on the two pans and watch the beam.": "तकिये और ईंट को दोनों पलड़ों पर रखकर डंडी को देखो।",
    "Which way does the beam lean?": "डंडी किस ओर झुकती है?",
    "Look at which pan is lower.": "देखो कौन-सा पलड़ा नीचे है।",
    "Yes, the small brick is heavier than the big pillow.": "हाँ, छोटी ईंट बड़े तकिये से भारी है।",
    "Weigh the school bag, the pillow and the watermelon: how many are over 1 kg?": "स्कूल बैग, तकिये और तरबूज़ को तौलो: कितनी चीज़ें 1 किग्रा से ज़्यादा हैं?",
    "How many over 1 kg?": "1 किग्रा से ज़्यादा कितनी?",
    "Each thing must go on the pan before you count.": "गिनने से पहले हर चीज़ को पलड़े पर रखना होगा।",
    "Count only the things that pull their own pan down.": "सिर्फ़ उन चीज़ों को गिनो जो अपना पलड़ा नीचे खींचती हैं।",
    "Put the pillow back on: does the 1 kg side go up or down?": "तकिये को फिर से रखो: क्या 1 किग्रा वाला पलड़ा ऊपर जाता है या नीचे?",
    "Yes, the school bag and the watermelon are more than 1 kg.": "हाँ, स्कूल बैग और तरबूज़ 1 किग्रा से ज़्यादा हैं।",
    "things": "चीज़ें",
    "Answer": "उत्तर",
    "Given": "दिया है",
    "1 kg": "1 किग्रा",
    "1,000 g": "1,000 ग्राम",
    "1 kg in all": "कुल 1 किग्रा",
    "3 kg": "3 किग्रा",
    "300 g": "300 ग्राम",
    "100 g": "100 ग्राम",
    "250 g": "250 ग्राम",
    "half a kg": "आधा किग्रा",
    "2 loaves": "2 ब्रेड",
    "2 things": "2 चीज़ें",
    "over 1 kg": "1 किग्रा से अधिक",
    "under 1 kg": "1 किग्रा से कम",
    "went up": "ऊपर गया",
    "Add": "जोड़ो",
    "every weight": "सारे बाट",
    "Pan had": "पलड़े पर पहले",
    "900 g": "900 ग्राम",
    "On the pan": "पलड़े पर",
    "2 of 4 parts": "4 में से 2 भाग",
    "1 loaf, about": "1 ब्रेड, लगभग",
    "watermelon": "तरबूज़",
    "parcel": "पार्सल",
    "packet": "पैकेट",
    "loaf": "ब्रेड",
    "2 kg": "2 किग्रा",
    "500 g": "500 ग्राम",
    "200 g": "200 ग्राम",
    "50 g": "50 ग्राम",
    "10 g": "10 ग्राम",
    "2 kg weight": "2 किग्रा का बाट",
    "1 kg weight": "1 किग्रा का बाट",
    "500 g weight": "500 ग्राम का बाट",
    "200 g weight": "200 ग्राम का बाट",
    "100 g weight": "100 ग्राम का बाट",
    "50 g weight": "50 ग्राम का बाट",
    "10 g weight": "10 ग्राम का बाट",
    "tray of gram weights": "ग्राम वाले बाटों की ट्रे",
    "tray of packets": "पैकेटों की ट्रे",
    "packet of sugar": "चीनी का पैकेट",
  },
  gu: {
    "Weigh It": "તેને તોલો",
    "A balance, some iron weights and a table of real things. What shall we weigh first?": "એક ત્રાજવું, થોડાં લોખંડનાં કાટલાં અને ટેબલ પર અસલી વસ્તુઓ. પહેલાં શું તોલીએ?",
    "You made the beam level, and you told heavy things from light things.": "તમે દાંડી સમતોલ કરી અને ભારે-હળવી વસ્તુઓ ઓળખી.",
    "Free play. Put anything on the pan and add any weights you like.": "મુક્ત રમત. પલ્લા પર કંઈ પણ મૂકો અને ગમે તેટલાં કાટલાં ઉમેરો.",
    "Is a bigger thing always a heavier thing?": "શું મોટી વસ્તુ હંમેશાં વધુ ભારે હોય છે?",
    "Heavy and light: kilograms and grams": "ભારે અને હળવું: કિલોગ્રામ અને ગ્રામ",
    "Weigh each thing against 1 kg and pick the unit that fits it.": "દરેક વસ્તુને 1 કિગ્રાના કાટલા સાથે તોલો અને તેને બંધબેસતો એકમ પસંદ કરો.",
    "Tap the 1 kg weight to put it on a pan.": "પલ્લા પર મૂકવા 1 કિગ્રાના કાટલાને સ્પર્શ કરો.",
    "Tap the iron weight marked 1 kg.": "1 કિગ્રા લખેલા લોખંડના કાટલાને સ્પર્શ કરો.",
    "Now tap the tray of gram weights to put 1,000 g on the other pan.": "હવે બીજા પલ્લા પર 1,000 ગ્રામ મૂકવા ગ્રામના કાટલાંની ટ્રેને સ્પર્શ કરો.",
    "Tap the tray with four small weights.": "ચાર નાનાં કાટલાંવાળી ટ્રેને સ્પર્શ કરો.",
    "Weigh the thing against the iron weight.": "વસ્તુને લોખંડના કાટલા સાથે તોલો.",
    "Watch which pan goes lower.": "જુઓ કયું પલ્લું નીચે જાય છે.",
    "We weigh heavy things in kilograms and light things in grams.": "ભારે વસ્તુઓ કિલોગ્રામમાં અને હળવી વસ્તુઓ ગ્રામમાં તોલાય છે.",
    "You learned: heavy things in kilograms, light in grams; 1 kg = 1,000 g": "તમે શીખ્યા: ભારે વસ્તુઓ કિલોગ્રામમાં, હળવી ગ્રામમાં; 1 કિગ્રા = 1,000 ગ્રામ",
    "Put the watermelon on the pan, then choose grams or kilograms for its weight.": "તડબૂચને પલ્લા પર મૂકો, પછી તેના વજન માટે ગ્રામ કે કિલોગ્રામ પસંદ કરો.",
    "Grams or kilograms?": "ગ્રામ કે કિલોગ્રામ?",
    "grams": "ગ્રામ",
    "kilograms": "કિલોગ્રામ",
    "Look at the beam: which side did the watermelon pull down?": "દાંડી જુઓ: તડબૂચે કઈ બાજુનું પલ્લું નીચે ખેંચ્યું?",
    "The watermelon is heavier than the 1 kg weight on the other pan.": "તડબૂચ બીજા પલ્લા પરના 1 કિગ્રાના કાટલા કરતાં ભારે છે.",
    "A thing heavier than 1 kg is weighed in the bigger unit.": "1 કિગ્રા કરતાં ભારે વસ્તુ મોટા એકમમાં તોલાય છે.",
    "Yes, kilograms: the watermelon pulled its pan below the 1 kg weight.": "હા, કિલોગ્રામ: તડબૂચનું પલ્લું 1 કિગ્રાના કાટલા કરતાં નીચે ગયું.",
    "Now put the pencil on the pan: which unit fits its weight, grams or kilograms?": "હવે પેન્સિલને પલ્લા પર મૂકો: તેના વજન માટે કયો એકમ યોગ્ય છે, ગ્રામ કે કિલોગ્રામ?",
    "Unit for a pencil?": "પેન્સિલ માટે એકમ?",
    "Did the pencil lift the 1 kg weight, or did the 1 kg side go down?": "શું પેન્સિલે 1 કિગ્રાનું કાટલું ઉપર ઉઠાવ્યું, કે 1 કિગ્રાવાળું પલ્લું નીચે ગયું?",
    "The 1 kg side went down, so the pencil is much lighter than 1 kg.": "1 કિગ્રાવાળું પલ્લું નીચે ગયું, એટલે પેન્સિલ 1 કિગ્રા કરતાં ઘણી હળવી છે.",
    "1 kg is 1,000 g, so a pencil weighs only a few of the small units.": "1 કિગ્રામાં 1,000 ગ્રામ છે: પેન્સિલનું વજન નાના એકમમાં થોડુંક જ છે.",
    "Yes, grams: the pencil is far lighter than 1 kg.": "હા, ગ્રામ: પેન્સિલ 1 કિગ્રા કરતાં ઘણી જ હળવી છે.",
    "Weigh the mango and the bag of rice: which one do we weigh in kilograms?": "કેરી અને ચોખાની ગૂણને તોલો: કોને આપણે કિલોગ્રામમાં તોલીએ?",
    "Which in kilograms?": "કોને કિલોગ્રામમાં?",
    "mango": "કેરી",
    "bag of rice": "ચોખાની ગૂણ",
    "Put each one on the pan and see if it is heavier than the 1 kg weight.": "દરેકને પલ્લા પર મૂકો અને જુઓ કે તે 1 કિગ્રાના કાટલા કરતાં ભારે છે કે નહીં.",
    "The heavy thing is the one that pulls its pan down.": "ભારે વસ્તુ એ છે જે પોતાનું પલ્લું નીચે ખેંચે છે.",
    "Weigh the mango, then the rice: which one lifts the 1 kg weight?": "પહેલાં કેરીને, પછી ચોખાને તોલો: કઈ વસ્તુ 1 કિગ્રાના કાટલાને ઉપર ઉઠાવે છે?",
    "Yes, the bag of rice goes in kilograms and the mango in grams.": "હા, ચોખાની ગૂણ કિલોગ્રામમાં અને કેરી ગ્રામમાં તોલાય છે.",
    "A balance and standard weights": "ત્રાજવું અને પ્રમાણિત કાટલાં",
    "Add weights to the other pan until the beam is level.": "બીજા પલ્લામાં કાટલાં ઉમેરો, જ્યાં સુધી દાંડી સમતોલ ન થાય.",
    "Tap the 1 kg weight to put it on the empty pan.": "ખાલી પલ્લા પર મૂકવા 1 કિગ્રાના કાટલાને સ્પર્શ કરો.",
    "Tap the iron weight with 1 kg on it.": "જેના પર 1 કિગ્રા લખ્યું છે તે લોખંડના કાટલાને સ્પર્શ કરો.",
    "The bag is still heavier, so tap that 1 kg weight to take it off.": "બૅગ હજી ભારે છે, એટલે ઉતારવા તે 1 કિગ્રાના કાટલાને સ્પર્શ કરો.",
    "Tap the weight sitting on the pan.": "પલ્લા પર મૂકેલા કાટલાને સ્પર્શ કરો.",
    "Now put the 2 kg weight on the pan and watch the beam.": "હવે 2 કિગ્રાનું કાટલું પલ્લા પર મૂકો અને દાંડી જુઓ.",
    "Tap the biggest iron weight.": "સૌથી મોટા લોખંડના કાટલાને સ્પર્શ કરો.",
    "Look at the needle at the top of the post.": "થાંભલા ઉપરના કાંટાને જુઓ.",
    "A straight needle means the beam is level.": "કાંટો સીધો હોય તો દાંડી સમતોલ છે.",
    "When the beam is level, both pans hold the same weight.": "દાંડી સમતોલ હોય ત્યારે બંને પલ્લાંમાં સરખું વજન હોય છે.",
    "You learned: when the beam is level, the weights tell the thing's weight": "તમે શીખ્યા: દાંડી સમતોલ હોય ત્યારે કાટલાં વસ્તુનું વજન બતાવે છે",
    "Add weights until the beam is level, then type what the watermelon weighs.": "દાંડી સમતોલ થાય ત્યાં સુધી કાટલાં ઉમેરો, પછી તડબૂચનું વજન લખો.",
    "Watermelon weighs?": "તડબૂચનું વજન?",
    "Add every weight on the pan, not only the biggest one.": "પલ્લા પરનાં બધાં કાટલાં ઉમેરો, ફક્ત સૌથી મોટું નહીં.",
    "Two weights balance the watermelon: read both labels.": "બે કાટલાં મળીને તડબૂચને સમતોલ કરે છે: બંને પર લખેલું વાંચો.",
    "Start at 2 kg and count on the other weight.": "2 કિગ્રાથી શરૂ કરો અને બીજા કાટલા જેટલું આગળ ગણો.",
    "The balance is level, and 2 kg and 1 kg make 3 kg.": "ત્રાજવું સમતોલ છે, અને 2 કિગ્રા અને 1 કિગ્રા મળીને 3 કિગ્રા થાય છે.",
    "weight": "વજન",
    "kg": "કિગ્રા",
    "Balance the mango with gram weights, then type its weight.": "કેરીને ગ્રામના કાટલાંથી સમતોલ કરો, પછી તેનું વજન લખો.",
    "Mango weighs?": "કેરીનું વજન?",
    "The mango needs the small weight as well as the 200 g one.": "કેરી માટે 200 ગ્રામના કાટલા સાથે નાનું કાટલું પણ જોઈએ.",
    "The beam is level, so the mango weighs as much as both weights together.": "દાંડી સમતોલ છે, એટલે કેરીનું વજન બંને કાટલાંના કુલ વજન જેટલું છે.",
    "Add 200 g and 100 g.": "200 ગ્રામ અને 100 ગ્રામ ઉમેરો.",
    "Level again: 200 g and 100 g make 300 g.": "ફરી સમતોલ: 200 ગ્રામ અને 100 ગ્રામ મળીને 300 ગ્રામ થાય છે.",
    "g": "ગ્રામ",
    "The parcel is 1 kg: add one weight to level the pans, then type that weight.": "પાર્સલ 1 કિગ્રાનું છે: એક કાટલું ઉમેરી પલ્લાં સમતોલ કરો અને તે કાટલું લખો.",
    "Weight added?": "ઉમેરેલું વજન?",
    "Type only the weight you added, not the ones already on the pan.": "ફક્ત તમે ઉમેરેલું વજન લખો, પલ્લા પર પહેલેથી રહેલાં કાટલાંનું નહીં.",
    "1 kg is 1,000 g, and the pan had 500 g, 200 g and 200 g before.": "1 કિગ્રામાં 1,000 ગ્રામ છે: પલ્લા પર પહેલાં 500, 200 અને 200 ગ્રામ હતાં.",
    "How many grams take 900 g up to 1,000 g?": "900 ગ્રામથી 1,000 ગ્રામ થવા કેટલા ગ્રામ જોઈએ?",
    "Yes, 900 g and 100 g make 1,000 g, the same as 1 kg.": "હા, 900 ગ્રામ અને 100 ગ્રામ મળીને 1,000 ગ્રામ થાય છે, એટલે કે 1 કિગ્રા.",
    "added": "ઉમેર્યું",
    "Half a kilogram and a quarter of a kilogram": "અડધો કિલોગ્રામ અને પા કિલોગ્રામ",
    "Four equal packets of sugar make 1 kg.": "ખાંડનાં ચાર સરખાં પૅકેટ મળીને 1 કિગ્રા થાય છે.",
    "Tap a packet of sugar to put it on the pan.": "પલ્લા પર મૂકવા ખાંડના એક પૅકેટને સ્પર્શ કરો.",
    "Tap one of the four sugar packets.": "ખાંડનાં ચાર પૅકેટમાંથી એકને સ્પર્શ કરો.",
    "Tap the tray to put the other three packets on the pan too.": "બાકીનાં ત્રણ પૅકેટ પણ પલ્લા પર મૂકવા ટ્રેને સ્પર્શ કરો.",
    "Tap the blue 1 kg strip of the tray.": "ટ્રેની વાદળી 1 કિગ્રાવાળી પટ્ટીને સ્પર્શ કરો.",
    "Look at the tray of four equal packets.": "ચાર સરખાં પૅકેટની ટ્રે જુઓ.",
    "The four packets together balance the 1 kg weight.": "ચારેય પૅકેટ મળીને 1 કિગ્રાના કાટલા જેટલાં થાય છે.",
    "Each of four equal packets is a quarter of a kilogram.": "ચાર સરખાં પૅકેટમાંથી દરેક પા કિલોગ્રામનું છે.",
    "You learned: 4 equal packets make 1 kg, so 2 make half and 1 a quarter": "તમે શીખ્યા: 4 સરખાં પૅકેટથી 1 કિગ્રા બને છે; 2 થી અડધો અને 1 થી પા",
    "Balance the 500 g weight with two packets: how much do two packets weigh?": "બે પૅકેટથી 500 ગ્રામનું કાટલું સમતોલ કરો: બે પૅકેટનું વજન કેટલું?",
    "Two packets weigh?": "બે પૅકેટનું વજન?",
    "a quarter of a kilogram": "પા કિલોગ્રામ",
    "half a kilogram": "અડધો કિલોગ્રામ",
    "1 kilogram": "1 કિલોગ્રામ",
    "Four packets make 1 kg: what part of the four is on the pan?": "ચાર પૅકેટ મળીને 1 કિગ્રા થાય છે: ચારનો કેટલો ભાગ પલ્લા પર છે?",
    "Count the empty places in the tray: how many of the four are gone?": "ટ્રેની ખાલી જગ્યાઓ ગણો: ચારમાંથી કેટલાં પૅકેટ ગયાં?",
    "The 500 g weight balances them, and 1 kg is 1,000 g.": "500 ગ્રામનું કાટલું તેમને સમતોલ કરે છે, અને 1 કિગ્રા એટલે 1,000 ગ્રામ.",
    "Yes, two packets make half a kilogram, and half a kilogram is 500 g.": "હા, બે પૅકેટ મળીને અડધો કિલોગ્રામ થાય છે, અને અડધો કિલોગ્રામ એટલે 500 ગ્રામ.",
    "Put one packet on the pan, balance it with weights and type its weight.": "એક પૅકેટ પલ્લા પર મૂકો, તેને કાટલાંથી સમતોલ કરો અને તેનું વજન લખો.",
    "One packet weighs?": "એક પૅકેટનું વજન?",
    "Add the grams of the weights that made the beam level.": "જે કાટલાંથી દાંડી સમતોલ થઈ, તેમના ગ્રામ ઉમેરો.",
    "Read the bigger weight first, then add the smaller one to it.": "પહેલાં મોટું કાટલું વાંચો, પછી તેમાં નાનું કાટલું ઉમેરો.",
    "Count on from 200 g by the grams of the small weight.": "200 ગ્રામથી આગળ નાના કાટલાના ગ્રામ જેટલું ગણો.",
    "Yes, 200 g and 50 g make 250 g for one packet.": "હા, એક પૅકેટ માટે 200 ગ્રામ અને 50 ગ્રામ મળીને 250 ગ્રામ થાય છે.",
    "Put loaves on the pan one by one: about how many loaves weigh 1 kg?": "બ્રેડને એક પછી એક પલ્લા પર મૂકો: લગભગ કેટલી બ્રેડનું વજન 1 કિગ્રા થાય?",
    "Loaves for 1 kg?": "1 કિગ્રા માટે બ્રેડ?",
    "Watch the beam as each loaf goes on: when is it nearly level?": "દરેક બ્રેડ મૂકતી વખતે દાંડી જુઓ: તે ક્યારે લગભગ સમતોલ થાય છે?",
    "With one loaf the 1 kg side stays down, so try another loaf.": "એક બ્રેડથી 1 કિગ્રાવાળું પલ્લું નીચે જ રહે છે, એટલે બીજી બ્રેડ મૂકી જુઓ.",
    "Each loaf weighs about half a kilogram: how many halves make 1 kg?": "દરેક બ્રેડનું વજન લગભગ અડધો કિલોગ્રામ છે: કેટલા અડધા મળીને 1 કિગ્રા થાય?",
    "Yes, about 2 loaves weigh 1 kg.": "હા, લગભગ 2 બ્રેડનું વજન 1 કિગ્રા થાય છે.",
    "how many": "કેટલી",
    "loaves": "બ્રેડ",
    "More than or less than one kilogram": "એક કિલોગ્રામથી વધુ કે ઓછું",
    "Now weigh the things on your own and let the beam decide.": "હવે વસ્તુઓને જાતે તોલો અને દાંડીને નક્કી કરવા દો.",
    "Put the thing on a pan and watch the needle.": "વસ્તુને પલ્લા પર મૂકો અને કાંટાને જુઓ.",
    "The heavier side goes down.": "ભારે બાજુ નીચે જાય છે.",
    "A thing is more than 1 kg when it pulls the beam down against the 1 kg weight.": "જ્યારે કોઈ વસ્તુ 1 કિગ્રાના કાટલા સામે દાંડીને નીચે ખેંચે, ત્યારે તે 1 કિગ્રા કરતાં વધુ હોય છે.",
    "You learned: a thing over 1 kg pulls the beam down against 1 kg": "તમે શીખ્યા: 1 કિગ્રા કરતાં ભારે વસ્તુ 1 કિગ્રા સામે દાંડીને નીચે ખેંચે છે",
    "Weigh the school bag and the pencil: which one weighs more than 1 kg?": "સ્કૂલ બૅગ અને પેન્સિલને તોલો: કોનું વજન 1 કિગ્રા કરતાં વધુ છે?",
    "More than 1 kg?": "1 કિગ્રા કરતાં વધુ?",
    "school bag": "સ્કૂલ બૅગ",
    "pencil": "પેન્સિલ",
    "Weigh both things, one after the other, against the 1 kg weight.": "બંને વસ્તુઓને એક પછી એક 1 કિગ્રાના કાટલા સામે તોલો.",
    "Which thing sinks lower than the 1 kg weight?": "કઈ વસ્તુ 1 કિગ્રાના કાટલા કરતાં નીચે જાય છે?",
    "When the 1 kg weight rises, the thing on the other pan is heavier.": "જ્યારે 1 કિગ્રાનું કાટલું ઉપર જાય, ત્યારે બીજા પલ્લાની વસ્તુ વધુ ભારે હોય છે.",
    "Yes, the school bag is heavier than 1 kg.": "હા, સ્કૂલ બૅગ 1 કિગ્રા કરતાં ભારે છે.",
    "Put the pillow on one pan and the brick on the other: which one is heavier?": "ઓશીકું એક પલ્લા પર અને ઈંટ બીજા પલ્લા પર મૂકો: કોણ વધુ ભારે છે?",
    "Which is heavier?": "કોણ વધુ ભારે છે?",
    "pillow": "ઓશીકું",
    "brick": "ઈંટ",
    "Put the pillow and the brick on the two pans and watch the beam.": "ઓશીકું અને ઈંટને બંને પલ્લાં પર મૂકીને દાંડી જુઓ.",
    "Which way does the beam lean?": "દાંડી કઈ તરફ નમે છે?",
    "Look at which pan is lower.": "જુઓ કયું પલ્લું નીચે છે.",
    "Yes, the small brick is heavier than the big pillow.": "હા, નાની ઈંટ મોટા ઓશીકા કરતાં ભારે છે.",
    "Weigh the school bag, the pillow and the watermelon: how many are over 1 kg?": "સ્કૂલ બૅગ, ઓશીકું અને તડબૂચને તોલો: કેટલી વસ્તુઓ 1 કિગ્રા કરતાં વધુ છે?",
    "How many over 1 kg?": "1 કિગ્રા કરતાં વધુ કેટલી?",
    "Each thing must go on the pan before you count.": "ગણતાં પહેલાં દરેક વસ્તુ પલ્લા પર મૂકવી પડશે.",
    "Count only the things that pull their own pan down.": "ફક્ત એવી વસ્તુઓ ગણો જે પોતાનું પલ્લું નીચે ખેંચે છે.",
    "Put the pillow back on: does the 1 kg side go up or down?": "ઓશીકું ફરી મૂકો: શું 1 કિગ્રાવાળું પલ્લું ઉપર જાય છે કે નીચે?",
    "Yes, the school bag and the watermelon are more than 1 kg.": "હા, સ્કૂલ બૅગ અને તડબૂચ 1 કિગ્રા કરતાં વધુ છે.",
    "things": "વસ્તુઓ",
    "Answer": "જવાબ",
    "Given": "આપેલું",
    "1 kg": "1 કિગ્રા",
    "1,000 g": "1,000 ગ્રામ",
    "1 kg in all": "કુલ 1 કિગ્રા",
    "3 kg": "3 કિગ્રા",
    "300 g": "300 ગ્રામ",
    "100 g": "100 ગ્રામ",
    "250 g": "250 ગ્રામ",
    "half a kg": "અડધો કિગ્રા",
    "2 loaves": "2 બ્રેડ",
    "2 things": "2 વસ્તુઓ",
    "over 1 kg": "1 કિગ્રાથી વધુ",
    "under 1 kg": "1 કિગ્રાથી ઓછું",
    "went up": "ઉપર ગયું",
    "Add": "ઉમેરો",
    "every weight": "બધાં કાટલાં",
    "Pan had": "પલ્લા પર પહેલાં",
    "900 g": "900 ગ્રામ",
    "On the pan": "પલ્લા પર",
    "2 of 4 parts": "4 માંથી 2 ભાગ",
    "1 loaf, about": "1 બ્રેડ, લગભગ",
    "watermelon": "તડબૂચ",
    "parcel": "પાર્સલ",
    "packet": "પૅકેટ",
    "loaf": "બ્રેડ",
    "2 kg": "2 કિગ્રા",
    "500 g": "500 ગ્રામ",
    "200 g": "200 ગ્રામ",
    "50 g": "50 ગ્રામ",
    "10 g": "10 ગ્રામ",
    "2 kg weight": "2 કિગ્રાનું કાટલું",
    "1 kg weight": "1 કિગ્રાનું કાટલું",
    "500 g weight": "500 ગ્રામનું કાટલું",
    "200 g weight": "200 ગ્રામનું કાટલું",
    "100 g weight": "100 ગ્રામનું કાટલું",
    "50 g weight": "50 ગ્રામનું કાટલું",
    "10 g weight": "10 ગ્રામનું કાટલું",
    "tray of gram weights": "ગ્રામના કાટલાંની ટ્રે",
    "tray of packets": "પૅકેટની ટ્રે",
    "packet of sugar": "ખાંડનું પૅકેટ",
  },
};

/* ── the model: every weight in whole grams (the owner's table, 2026-10-28), the same in every phase ──────────────── */
/* things: their grams and the box they are drawn in on a pan (each box in its picture's own aspect) */
const WI_OBJ: any = {
  watermelon: { g: 3000, w: 190, h: 137, skin: "watermelon", name: "watermelon" },
  mango: { g: 300, w: 130, h: 109, skin: "mango", name: "mango" },
  pencil: { g: 10, w: 212, h: 28, skin: "pencil", name: "pencil" },
  sack: { g: 5000, w: 132, h: 176, skin: "sack", name: "bag of rice" },
  backpack: { g: 2000, w: 120, h: 177, skin: "backpack", name: "school bag" },
  pillow: { g: 600, w: 164, h: 180, skin: "pillow", name: "pillow" },
  brick: { g: 3000, w: 128, h: 67, skin: "brick", name: "brick" },
  parcel: { g: 1000, w: 150, h: 112, skin: "", name: "parcel" },
  packet: { g: 250, w: 80, h: 96, skin: "", name: "packet" },
  loaf: { g: 480, w: 160, h: 70, skin: "", name: "loaf" },
};
/* the standard iron weights (the owner: 10 g, 50 g, 100 g, 200 g, 500 g, 1 kg, 2 kg), each a box as big as it is heavy */
const WI_WD: any = { 2000: [116, 96], 1000: [108, 88], 500: [108, 82], 200: [104, 76], 100: [104, 74], 50: [92, 72], 10: [92, 72] };
const wiLab = (g: number) => (g >= 1000 ? g / 1000 + " kg" : g + " g");
/* the balance, in the frame's own units (the frame is 900 wide: it fits beside the open keypad) */
const WB = { cx: 322, cy: 104, half: 196, cord: 214, table: 478, colX: 656, dish: 120 };
/* the role colours of the chapter: the given reading, the answer (only at the win), the unit fact, a step of the working */
const WI_C = { given: "#0072B2", answer: "#009E73", unit: "#D55E00", step: "#E69F00" };
/* every board: what stands on the shelf (col: things, tray, gram set), the rack of weights (a fresh copy on every take),
   what is already on each pan and cannot be moved (L, R), whether a thing may go on either pan (two) */
const WI_FREE = { col: ["watermelon", "mango", "pencil", "pillow", "brick"], rack: [2000, 1000, 500, 200, 100, 50, 10], L: [], R: [], two: true, wBoth: true };

const MODEL = {
  grams: Object.fromEntries(Object.keys(WI_OBJ).map((k) => [k, WI_OBJ[k].g])),
  weights: [10, 50, 100, 200, 500, 1000, 2000],
  tilt: "the beam turns by the difference of the grams on its pans (left minus right): 0 only when they are equal, else 17 degrees times the square root of (difference / 5,000 g), so 750 g, 1 kg, 2 kg, 2.5 kg and 3 kg of difference each read at least 1 degree apart; the stop (17 degrees) is reached only past 5 kg",
  balance: { pivot: [WB.cx, WB.cy], halfBeam: WB.half, cord: WB.cord },
  /* the answer gate (PATTERNS 19): what the child must do on the board before the Answer key and the keys are live */
  answerGate: {
    "1.1": "put the watermelon on the pan", "1.2": "put the pencil on the pan", "1.3": "weigh both the mango and the bag of rice",
    "2.1": "make the beam level with weights", "2.2": "make the beam level with weights", "2.3": "add the weight that makes the beam level",
    "3.1": "balance the 500 g weight with two packets", "3.2": "put one packet on the pan and make the beam level", "3.3": "put a loaf on the pan",
    "4.1": "weigh one of the two things", "4.2": "put the pillow and the brick on the two pans", "4.3": "weigh all three things",
    rule: "locked only in user mode, after the child's first real touch, until the act is done; toolApi.check() performs the act, so AI mode is never gated",
  },
};

/* One entry per phase = one mount. Every item: board (the shelf and pans), gate (the act the answer waits for), sol (that act
   done, for the agent's check), win (one sentence at the right answer), tag (the green Answer tag, drawn only at the win). */
const PHASES: any[] = [
  {
    n: 1,
    concept: "Heavy and light: kilograms and grams",
    conceptId: "M1.S2.T4.C16", objectiveIds: ["O5"],
    says: ["Weigh each thing against 1 kg and pick the unit that fits it."],
    /* the warm-up: 1 kg of iron against 1,000 g of small weights, so the beam shows that 1 kg is 1,000 g */
    warm: { col: ["w1000", "gramset"], rack: [], L: [], R: [] },
    stepHold: 2200,
    steps: [
      { say: "Tap the 1 kg weight to put it on a pan.", on: "w1000", hint: "Tap the iron weight marked 1 kg." },
      { say: "Now tap the tray of gram weights to put 1,000 g on the other pan.", on: "gramset", hint: "Tap the tray with four small weights." },
    ],
    ladder: ["Weigh the thing against the iron weight.", "Watch which pan goes lower."],
    closing: "We weigh heavy things in kilograms and light things in grams.",
    learned: "You learned: heavy things in kilograms, light in grams; 1 kg = 1,000 g",
    traceback: "the thing on the pan and the 1 kg weight are ringed and the tag under the thing says over 1 kg or under 1 kg; the unit is left for the child",
    items: [
      /* learn WI1: answer in the plan = Kilograms */
      { qid: "M1.S2.T4.C16:WI1", kind: "unit", board: { col: ["watermelon"], rack: [], L: [], R: ["w1000"] }, gate: "on", sol: { L: ["watermelon"] },
        say: "Put the watermelon on the pan, then choose grams or kilograms for its weight.", ask: "Grams or kilograms?",
        choices: [{ id: "g", label: "grams" }, { id: "kg", label: "kilograms" }], answer: "kg", near: "g", forms: ["in kilograms"],
        miss: "Look at the beam: which side did the watermelon pull down?",
        ladder: ["The watermelon is heavier than the 1 kg weight on the other pan.", "A thing heavier than 1 kg is weighed in the bigger unit."],
        win: "Yes, kilograms: the watermelon pulled its pan below the 1 kg weight.", winMs: 4800, tag: "kilograms", tagSide: "L" },
      /* practice 1: answer in the plan = Grams, because a pen is very light (a pencil here: the owner's object, same 10 g) */
      { qid: "M1.S2.T4.C16:1", kind: "unit", board: { col: ["pencil"], rack: [], L: [], R: ["w1000"] }, gate: "on", sol: { L: ["pencil"] },
        say: "Now put the pencil on the pan: which unit fits its weight, grams or kilograms?", ask: "Unit for a pencil?",
        choices: [{ id: "g", label: "grams" }, { id: "kg", label: "kilograms" }], answer: "g", near: "kg", forms: ["in grams"],
        miss: "Did the pencil lift the 1 kg weight, or did the 1 kg side go down?",
        ladder: ["The 1 kg side went down, so the pencil is much lighter than 1 kg.", "1 kg is 1,000 g, so a pencil weighs only a few of the small units."],
        win: "Yes, grams: the pencil is far lighter than 1 kg.", winMs: 3400, tag: "grams", tagSide: "L" },
      /* practice 5: answer in the plan = The apple in grams and the sack of rice in kilograms (a mango here: the owner's object) */
      { qid: "M1.S2.T4.C16:5", kind: "which", board: { col: ["mango", "sack"], rack: [], L: [], R: ["w1000"] }, gate: "all", sol: { L: ["sack"], seen: ["mango", "sack"] },
        say: "Weigh the mango and the bag of rice: which one do we weigh in kilograms?", ask: "Which in kilograms?",
        choices: [{ id: "mango", label: "mango" }, { id: "rice", label: "bag of rice" }], answer: "rice", near: "mango", pick: { mango: "mango", rice: "sack" }, forms: ["rice is weighed in kilograms"],
        miss: "Put each one on the pan and see if it is heavier than the 1 kg weight.",
        ladder: ["The heavy thing is the one that pulls its pan down.", "Weigh the mango, then the rice: which one lifts the 1 kg weight?"],
        win: "Yes, the bag of rice goes in kilograms and the mango in grams.", tag: "bag of rice", tagSide: "L" },
    ],
  },
  {
    n: 2,
    concept: "A balance and standard weights",
    conceptId: "M1.S2.T4.C17", objectiveIds: ["O5"],
    says: ["Add weights to the other pan until the beam is level."],
    /* the warm-up: a 2 kg school bag; 1 kg is too light, so it comes off and the 2 kg weight makes the beam level */
    warm: { col: [], rack: [2000, 1000, 500], L: ["backpack"], R: [] },
    stepHold: 2200,
    steps: [
      { say: "Tap the 1 kg weight to put it on the empty pan.", on: "w1000", hint: "Tap the iron weight with 1 kg on it." },
      { say: "The bag is still heavier, so tap that 1 kg weight to take it off.", on: "pan-w1000", hint: "Tap the weight sitting on the pan." },
      { say: "Now put the 2 kg weight on the pan and watch the beam.", on: "w2000", hint: "Tap the biggest iron weight." },
    ],
    ladder: ["Look at the needle at the top of the post.", "A straight needle means the beam is level."],
    closing: "When the beam is level, both pans hold the same weight.",
    learned: "You learned: when the beam is level, the weights tell the thing's weight",
    traceback: "each weight on the pan is ringed in turn and an Add tag lists them; the total is left for the child",
    items: [
      /* learn WI2: answer in the plan = 3 kg (a 2 kg and a 1 kg weight; the owner's 3 kg thing is the watermelon) */
      { qid: "M1.S2.T4.C17:WI2", kind: "weigh", board: { col: [], rack: [2000, 1000, 500], L: ["watermelon"], R: [] }, gate: "level", sol: { R: [2000, 1000] },
        say: "Add weights until the beam is level, then type what the watermelon weighs.", ask: "Watermelon weighs?",
        parts: [{ label: "weight", unit: "kg" }], answer: [3], near: "2",
        miss: "Add every weight on the pan, not only the biggest one.",
        ladder: ["Two weights balance the watermelon: read both labels.", "Start at 2 kg and count on the other weight."],
        win: "The balance is level, and 2 kg and 1 kg make 3 kg.", winMs: 3600, tag: "3 kg", tagSide: "L" },
      /* authored: the plan's practice 2 (a 6 kg parcel, 5 kg + 1 kg) needs a 5 kg weight, which the owner's set has not */
      { qid: null, kind: "weigh", board: { col: [], rack: [500, 200, 100, 50], L: ["mango"], R: [] }, gate: "level", sol: { R: [200, 100] },
        say: "Balance the mango with gram weights, then type its weight.", ask: "Mango weighs?",
        parts: [{ label: "weight", unit: "g" }], answer: [300], near: "200",
        miss: "The mango needs the small weight as well as the 200 g one.",
        ladder: ["The beam is level, so the mango weighs as much as both weights together.", "Add 200 g and 100 g."],
        win: "Level again: 200 g and 100 g make 300 g.", winMs: 2900, tag: "300 g", tagSide: "L" },
      /* practice 8: answer in the plan = a 100 g weight (the right pan holds 900 g and 1 kg is 1,000 g) */
      { qid: "M1.S2.T4.C17:8", kind: "missing", board: { col: [], rack: [200, 100, 50, 10], L: ["parcel"], R: ["w500", "w200", "w200"] }, gate: "level", sol: { R: [100] },
        say: "The parcel is 1 kg: add one weight to level the pans, then type that weight.", ask: "Weight added?",
        parts: [{ label: "added", unit: "g" }], answer: [100], near: "900", given: "1 kg",
        miss: "Type only the weight you added, not the ones already on the pan.",
        ladder: ["1 kg is 1,000 g, and the pan had 500 g, 200 g and 200 g before.", "How many grams take 900 g up to 1,000 g?"],
        win: "Yes, 900 g and 100 g make 1,000 g, the same as 1 kg.", tag: "100 g", tagSide: "R" },
    ],
  },
  {
    n: 3,
    concept: "Half a kilogram and a quarter of a kilogram",
    conceptId: "M1.S2.T4.C18", objectiveIds: ["O6"],
    says: ["Four equal packets of sugar make 1 kg."],
    /* the warm-up: one packet, then the other three, against the 1 kg weight: four equal packets make 1 kg */
    warm: { col: ["tray"], rack: [], L: [], R: ["w1000"] },
    stepHold: 2200,
    steps: [
      { say: "Tap a packet of sugar to put it on the pan.", on: "packet", hint: "Tap one of the four sugar packets." },
      { say: "Tap the tray to put the other three packets on the pan too.", on: "tray", hint: "Tap the blue 1 kg strip of the tray." },
    ],
    ladder: ["Look at the tray of four equal packets.", "The four packets together balance the 1 kg weight."],
    closing: "Each of four equal packets is a quarter of a kilogram.",
    learned: "You learned: 4 equal packets make 1 kg, so 2 make half and 1 a quarter",
    traceback: "the four places of the tray and the packets on the pan are ringed, or the weights on the pan in turn, or one loaf is weighed alone; the answer is left for the child",
    items: [
      /* learn WI3: answer in the plan = Half a kilogram (four equal packets of sugar here: the owner's four 250 g packets). The coordinator's
         decision: two packets are balanced against the 500 g standard weight, and the child names the part of a kilogram */
      { qid: "M1.S2.T4.C18:WI3", kind: "packets", board: { col: ["tray"], rack: [], L: [], R: ["w500"] }, gate: "two", sol: { L: ["packet1", "packet2"] },
        say: "Balance the 500 g weight with two packets: how much do two packets weigh?", ask: "Two packets weigh?",
        choices: [{ id: "quarter", label: "a quarter of a kilogram" }, { id: "half", label: "half a kilogram" }, { id: "one", label: "1 kilogram" }],
        answer: "half", near: "quarter", forms: ["half a kilogram"],
        miss: "Four packets make 1 kg: what part of the four is on the pan?",
        ladder: ["Count the empty places in the tray: how many of the four are gone?", "The 500 g weight balances them, and 1 kg is 1,000 g."],
        win: "Yes, two packets make half a kilogram, and half a kilogram is 500 g.", winMs: 4800, tag: "half a kg", tagSide: "L" },
      /* authored: one packet, a quarter kilogram (the owner: select one, two or four packets); the plan's practice 7 (three bags) is unused */
      { qid: null, kind: "weigh1", board: { col: ["tray"], rack: [200, 100, 50, 10], L: [], R: [] }, gate: "one", sol: { L: ["packet1"], R: [200, 50] },
        say: "Put one packet on the pan, balance it with weights and type its weight.", ask: "One packet weighs?",
        parts: [{ label: "weight", unit: "g" }], answer: [250], near: "200",
        miss: "Add the grams of the weights that made the beam level.",
        ladder: ["Read the bigger weight first, then add the smaller one to it.", "Count on from 200 g by the grams of the small weight."],
        win: "Yes, 200 g and 50 g make 250 g for one packet.", winMs: 3300, tag: "250 g", tagSide: "L" },
      /* practice 3: answer in the plan = About 2 loaves, because two halves make one kilogram */
      { qid: "M1.S2.T4.C18:3", kind: "loaves", board: { col: ["loaf1", "loaf2", "loaf3"], rack: [], L: [], R: ["w1000"] }, gate: "loaf", sol: { L: ["loaf1", "loaf2"] },
        say: "Put loaves on the pan one by one: about how many loaves weigh 1 kg?", ask: "Loaves for 1 kg?",
        parts: [{ label: "how many", unit: "loaves" }], answer: [2], near: "1",
        miss: "Watch the beam as each loaf goes on: when is it nearly level?",
        ladder: ["With one loaf the 1 kg side stays down, so try another loaf.", "Each loaf weighs about half a kilogram: how many halves make 1 kg?"],
        win: "Yes, about 2 loaves weigh 1 kg.", tag: "2 loaves", tagSide: "L" },
    ],
  },
  {
    n: 4,
    concept: "More than or less than one kilogram",
    conceptId: "M1.S2.T4.C19", objectiveIds: ["O6"],
    says: ["Now weigh the things on your own and let the beam decide."],
    ladder: ["Put the thing on a pan and watch the needle.", "The heavier side goes down."],
    closing: "A thing is more than 1 kg when it pulls the beam down against the 1 kg weight.",
    learned: "You learned: a thing over 1 kg pulls the beam down against 1 kg",
    traceback: "the child's own pick is weighed against 1 kg (or the two pans are compared with a level line), and each thing's side is tagged over or under 1 kg; the choice or the count is left for the child",
    items: [
      /* learn WI4: answer in the plan = The backpack (a pencil here for the pen: the owner's object) */
      { qid: "M1.S2.T4.C19:WI4", kind: "which", board: { col: ["backpack", "pencil"], rack: [], L: [], R: ["w1000"] }, gate: "any", sol: { L: ["backpack"], seen: ["backpack"] },
        say: "Weigh the school bag and the pencil: which one weighs more than 1 kg?", ask: "More than 1 kg?",
        choices: [{ id: "backpack", label: "school bag" }, { id: "pencil", label: "pencil" }], answer: "backpack", near: "pencil", pick: { backpack: "backpack", pencil: "pencil" }, forms: ["school bag weighs more"],
        miss: "Weigh both things, one after the other, against the 1 kg weight.",
        ladder: ["Which thing sinks lower than the 1 kg weight?", "When the 1 kg weight rises, the thing on the other pan is heavier."],
        win: "Yes, the school bag is heavier than 1 kg.", winMs: 2900, tag: "school bag", tagSide: "L" },
      /* authored: the owner's light big thing against a heavy small one, one on each pan (the plan's practice 4 is unused) */
      { qid: null, kind: "pair", board: { col: ["pillow", "brick"], rack: [], L: [], R: [], two: true }, gate: "both", sol: { L: ["pillow"], Rob: ["brick"] },
        say: "Put the pillow on one pan and the brick on the other: which one is heavier?", ask: "Which is heavier?",
        choices: [{ id: "pillow", label: "pillow" }, { id: "brick", label: "brick" }], answer: "brick", near: "pillow", pick: { pillow: "pillow", brick: "brick" }, forms: ["brick is heavier"],
        miss: "Put the pillow and the brick on the two pans and watch the beam.",
        ladder: ["Which way does the beam lean?", "Look at which pan is lower."],
        win: "Yes, the small brick is heavier than the big pillow.", winMs: 3600, tag: "brick", tagSide: "B" },
      /* practice 6: answer in the plan = the watermelon and the bicycle (of a pen, a watermelon and a bicycle) weigh more than 1 kg: a count here,
         with a school bag and a pillow for the pen and the bicycle */
      { qid: "M1.S2.T4.C19:6", kind: "count", board: { col: ["backpack", "pillow", "watermelon"], rack: [], L: [], R: ["w1000"] }, gate: "all", sol: { L: ["watermelon"], seen: ["backpack", "pillow", "watermelon"] },
        say: "Weigh the school bag, the pillow and the watermelon: how many are over 1 kg?", ask: "How many over 1 kg?",
        parts: [{ label: "how many", unit: "things" }], answer: [2], near: "3",
        miss: "Each thing must go on the pan before you count.",
        ladder: ["Count only the things that pull their own pan down.", "Put the pillow back on: does the 1 kg side go up or down?"],
        win: "Yes, the school bag and the watermelon are more than 1 kg.", tag: "2 things", tagSide: "L" },
    ],
  },
];

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* judge: is this value right for this item? (a one-box answer through judgeSlotParts, a choice by its id) */
const judge = (item: any, v: any) => {
  if (item.parts) return judgeSlotParts(item, v);
  if (typeof item.answer === "number") return leadNumber(v) === item.answer;
  return String(v).trim().toLowerCase() === String(item.answer).trim().toLowerCase();
};
/* oracle: every answer re-derived from a table of its own (it shares no code or numbers with the items, judge or Work) */
const oracle = () => {
  const g: any = { watermelon: 3000, mango: 300, pencil: 10, sack: 5000, backpack: 2000, pillow: 600, brick: 3000, packet: 250, loaf: 480, parcel: 1000 };
  const kgOrG = (k: string) => (g[k] >= 1000 ? "kg" : "g");
  const heavier = (a: string, b: string) => (g[a] > g[b] ? a : b);
  const want: any[][] = [
    [kgOrG("watermelon"), kgOrG("pencil"), g.sack >= 1000 && g.mango < 1000 ? "rice" : "mango"],
    [[g.watermelon / 1000], [g.mango], [g.parcel - (500 + 200 + 200)]],
    [2 * g.packet === 1000 / 2 ? "half" : "?", [1000 / 4], [Math.round(1000 / g.loaf)]],
    [g.backpack > 1000 && g.pencil < 1000 ? "backpack" : "pencil", heavier("pillow", "brick"), [["backpack", "pillow", "watermelon"].filter((k) => g[k] > 1000).length]],
  ];
  return PHASES.every((p: any, i: number) => p.items.every((it: any, k: number) => JSON.stringify(it.answer) === JSON.stringify(want[i][k])));
};
/* the item's own misconception (only the biggest weight, the pan's total, a quarter for two packets, the longer thing ...) */
const nearMiss = (item: any) => item.near;
/* the forms of an answer that no question, hint or ladder line may print. A choice question must name both of its options,
   so a choice's forms are the giveaway sentences, not its label; a number is every number, under 10 too */
const answerForms = (item: any) => (item.parts ? item.answer.flatMap((x: number) => [String(x), indian(x), words(x)]) : item.forms || []);
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => item.answer;

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => (T.state().stage === "demo" ? HOOK.demo && HOOK.demo() : (HOOK.solveAct && HOOK.solveAct(), T.submit(item.answer)));
/* every answer is typed or chosen: nothing is set on the working area */
const answer = (item: any, v: any) => undefined;
/* the agent's check() before Enter: at an open question it performs the act at once (the thing on the pan, the beam level),
   so the answer gate opens; in a guide step it returns undefined and api.onEnter performs the step */
const check = () => (HOOK.check ? HOOK.check() : undefined);

/* ── the board's pure helpers (no React) ─────────────────────────────────────────────────── */
const wiBase = (id: string) => String(id).replace(/\d+$/, "");
const wiThing = (e: any) => e.b !== "w" && e.b !== "set";
const wiMass = (list: any[]) => list.reduce((a: number, e: any) => a + e.g, 0);
/* the beam's turn in degrees (clockwise: the right pan down) from the grams, left minus right */
/* a smooth square-root law with no early stop: 40 g 1.5, 250 g 3.8, 500 g 5.4, 750 g 6.6, 1 kg 7.6, 2 kg 10.8, 2.5 kg 12.0, 3 kg 13.2,
   4 kg 15.2 degrees; it stops at 17 degrees only past 5 kg (free play), where the lower dish still clears the tags */
const wiTilt = (d: number) => (d === 0 ? 0 : -Math.sign(d) * 17 * Math.min(1, Math.sqrt(Math.abs(d) / 5000)));
function wiFresh(spec: any, qk: string) {
  const fx = (s: string, side: string, k: number) => (/^w\d/.test(s) ? { id: side + "f" + k, b: "w", g: Number(s.slice(1)), fixed: true }
    : { id: s, b: wiBase(s), g: WI_OBJ[wiBase(s)].g, fixed: true });
  return { qk, L: (spec.L || []).map((s: string, k: number) => fx(s, "L", k)), R: (spec.R || []).map((s: string, k: number) => fx(s, "R", k)),
    seen: [] as string[], n: 0, gate: false, corr: null as any, moving: null as any, won: false };
}
const wiOn = (S: any, id: string) => S.L.some((e: any) => e.id === id) || S.R.some((e: any) => e.id === id);
/* put a piece from the shelf or the rack on a pan (side: where it was dropped; none: where it belongs). null = it cannot go there */
function wiPut(S: any, pl: string, spec: any, side?: string) {
  if (pl.startsWith("r:")) {
    /* ONE of each weight on the rack (the maths review): each total has exactly one set of weights, so every line stays true */
    const g = Number(pl.slice(2)), id = "w" + g;
    if (wiOn(S, id)) return null;
    /* free play: a tapped weight goes to the lighter pan, so a keyboard-only child can load either side */
    const to = side || (spec.wBoth && wiMass(S.L) < wiMass(S.R) ? "L" : "R");
    if (to !== "R" && !spec.wBoth) return null;
    const pan = S[to];
    if (pan.filter((e: any) => !wiThing(e)).length >= 5) return null;
    return { ...S, [to]: [...pan, { id, b: "w", g }] };
  }
  if (pl === "tray") {
    const left = [1, 2, 3, 4].map((k) => "packet" + k).filter((id) => !wiOn(S, id));
    if (!left.length || (side && side !== "L")) return null;
    return { ...S, L: [...S.L, ...left.map((id) => ({ id, b: "packet", g: WI_OBJ.packet.g }))], seen: [...S.seen, ...left] };
  }
  if (!pl.startsWith("c:")) return null;
  const id = pl.slice(2), b = wiBase(id);
  if (wiOn(S, id)) return null;
  if (b === "gramset") {
    if (side && side !== "L") return null;
    return { ...S, L: [...S.L, { id: "gramset", b: "set", g: 1000 }] };
  }
  if (b === "packet" || b === "loaf") {
    if (side && side !== "L") return null;
    if (S.L.filter((e: any) => e.b === b).length >= (b === "packet" ? 4 : 3)) return null;
    return { ...S, L: [...S.L, { id, b, g: WI_OBJ[b].g }], seen: S.seen.includes(id) ? S.seen : [...S.seen, id] };
  }
  const hasThing = (pan: any[]) => pan.some(wiThing);
  let to = side || (!hasThing(S.L) ? "L" : spec.two && !S.R.length ? "R" : "L");
  if (to === "R" && !spec.two) return null;
  const pan = S[to];
  if (pan.some((e: any) => wiThing(e) && e.fixed)) return null;
  if (to === "R" && pan.some((e: any) => !wiThing(e))) return null;
  const kept = pan.filter((e: any) => !wiThing(e));
  return { ...S, [to]: [...kept, { id, b, g: WI_OBJ[b].g }], seen: S.seen.includes(id) ? S.seen : [...S.seen, id] };
}
/* take a piece off a pan: back to the shelf or the rack */
const wiTake = (S: any, eid: string) => ({ ...S, L: S.L.filter((e: any) => e.fixed || e.id !== eid), R: S.R.filter((e: any) => e.fixed || e.id !== eid) });
/* move a piece from one pan to the other (a drag) */
function wiMove(S: any, eid: string, side: string, spec: any) {
  const e = [...S.L, ...S.R].find((x: any) => x.id === eid);
  if (!e || e.fixed || S[side].some((x: any) => x.id === eid)) return null;
  const off = wiTake(S, eid);
  return wiPut(off, e.b === "w" ? "r:" + e.g : e.b === "set" ? "c:gramset" : "c:" + e.id, spec, side);
}
/* the gate: has the child done the act this question asks for? */
function wiGateOk(S: any, it: any) {
  const lv = wiMass(S.L) === wiMass(S.R);
  const col = it.board.col;
  switch (it.gate) {
    case "on": return S.seen.includes(col[0]);
    case "all": return col.every((c: string) => S.seen.includes(c));
    case "any": return S.seen.length > 0;
    case "both": return S.L.some(wiThing) && S.R.some(wiThing);
    case "level": return lv && S.R.some((e: any) => e.b === "w" && !e.fixed);
    case "two": return S.L.filter((e: any) => e.b === "packet").length === 2;
    case "one": return lv && S.L.length === 1 && S.L[0].b === "packet";
    case "loaf": return S.seen.some((c: string) => c.startsWith("loaf"));
    default: return true;
  }
}
/* the act done at once (the agent's check, the dev driver) */
function wiSolved(S: any, it: any, spec: any) {
  const sol = it.sol || {};
  let r = wiFresh(spec, S.qk);
  for (const id of sol.L || []) r = wiPut(r, "c:" + id, spec, "L") || r;
  for (const id of sol.Rob || []) r = wiPut(r, "c:" + id, spec, "R") || r;
  for (const g of sol.R || []) r = wiPut(r, "r:" + g, spec, "R") || r;
  return { ...r, seen: Array.from(new Set([...(r.seen || []), ...(sol.seen || [])])), gate: true };
}
/* a text's width at a size (Poppins, semibold): the layout of tags and plates */
function wiW(s: string, fs: number) {
  let u = 0;
  /* Devanagari and Gujarati: the zero-advance marks take no width (PATTERNS 18), every other letter and spacing sign does */
  const zero = /[ऀ-ं़ु-ै्॑-ॗॢॣઁં઼ુ-ૈ્ૢૣ]/;
  const sign = /[ा-ीॉ-ौા-ીૉ-ૌ]/;   /* the spacing vowel signs are narrow */
  let prev = "";
  for (const ch of String(s)) {
    const guj = ch >= "઀" && ch <= "૿";
    /* a letter after a virama joins it (ग्र, ગ્ર): a narrow stroke, not a whole letter; Gujarati letters run wider than Devanagari */
    u += /[0-9]/.test(ch) ? 0.62 : ch === " " ? 0.28 : /[il.,:'|]/.test(ch) ? 0.3 : /[mwMW]/.test(ch) ? 0.86 : /[A-Z]/.test(ch) ? 0.7 : /[+=−]/.test(ch) ? 0.62
      : zero.test(ch) ? 0 : sign.test(ch) ? (guj ? 0.3 : 0.27) : (prev === "्" || prev === "્") ? 0.2 : ch.charCodeAt(0) > 0x8ff ? (guj ? 0.62 : 0.62) : 0.56;
    prev = ch;
  }
  return u * fs;
}
/* the shelf: things, the tray, the gram set and the rack, packed in rows into the room beside the balance */
function wiShelf(spec: any, W: number, H: number) {
  const items: any[] = [];
  for (const c of spec.col || []) {
    if (c === "tray") items.push({ key: "tray", kind: "tray", w: 200, h: 306 });
    else if (c === "gramset") items.push({ key: "c:gramset", kind: "set", w: 228, h: 182 });
    else if (/^w\d/.test(c)) items.push({ key: "r:" + c.slice(1), kind: "w", g: Number(c.slice(1)), w: WI_WD[c.slice(1)][0], h: WI_WD[c.slice(1)][1] });
    else { const o = WI_OBJ[wiBase(c)]; items.push({ key: "c:" + c, kind: "obj", b: wiBase(c), id: c, w: o.w, h: Math.max(o.h, 72) }); }
  }
  for (const g of spec.rack || []) items.push({ key: "r:" + g, kind: "w", g, w: WI_WD[g][0], h: WI_WD[g][1], rack: true });
  let best: any = null;
  for (let s = 1; s >= 0.5; s -= 0.04) {
    const sc = (it: any) => (it.kind === "w" ? Math.max(s, 0.92) : s);
    const rows: any[][] = [];
    let row: any[] = [], rw = 0, ok = true;
    for (const it of items) {
      const w = it.w * sc(it);
      if (w > W) { ok = false; break; }
      const brk = row.length && (rw + 12 + w > W || (it.rack && !row[row.length - 1].rack));
      if (brk) { rows.push(row); row = []; rw = 0; }
      row.push(it); rw += (row.length > 1 ? 12 : 0) + w;
    }
    if (row.length) rows.push(row);
    const hs = rows.map((r) => Math.max(...r.map((it) => it.h * sc(it))));
    const tot = hs.reduce((a, b) => a + b, 0) + 14 * Math.max(0, rows.length - 1);
    best = { s, rows, hs, tot, sc };
    if (ok && tot <= H) break;
  }
  const out: any = {};
  let y = Math.max(0, (H - best.tot) / 2);
  best.rows.forEach((r: any[], i: number) => {
    const ws = r.map((it) => it.w * best.sc(it)), rw = ws.reduce((a, b) => a + b, 0) + 12 * (r.length - 1);
    let x = (W - rw) / 2;
    r.forEach((it, j) => {
      const h = it.h * best.sc(it);
      out[it.key] = { ...it, x, y: y + (best.hs[i] - h), w: ws[j], h, s: best.sc(it) };
      x += ws[j] + 12;
    });
    y += best.hs[i] + 14;
  });
  return out;
}
/* what lies on a pan, in rows from the dish up (things first, then weights, heaviest first), in the pan's own units: the hook at 0,0 */
function wiPan(list: any[]) {
  const items: any[] = [];
  for (const e of list) {
    if (e.b === "set") [500, 200, 200, 100].forEach((g, k) => items.push({ e, g, w: WI_WD[g][0], h: WI_WD[g][1], kind: "w", sub: k }));
    else if (e.b === "w") items.push({ e, g: e.g, w: WI_WD[e.g][0], h: WI_WD[e.g][1], kind: "w" });
    else items.push({ e, w: WI_OBJ[e.b].w, h: WI_OBJ[e.b].h, kind: e.b });
  }
  items.sort((a, b) => (a.kind === "w" ? 1 : 0) - (b.kind === "w" ? 1 : 0) || (b.g || 0) - (a.g || 0));
  const rows: any[][] = [];
  let row: any[] = [], rw = 0;
  for (const it of items) {
    if (row.length && rw + 6 + it.w > 2 * WB.dish - 8) { rows.push(row); row = []; rw = 0; }
    row.push(it); rw += (row.length > 1 ? 6 : 0) + it.w;
  }
  if (row.length) rows.push(row);
  const hs = rows.map((r) => Math.max(...r.map((it) => it.h)));
  const tot = hs.reduce((a, b) => a + b, 0) + 4 * Math.max(0, rows.length - 1);
  const s = Math.min(1, (WB.cord - 8) / Math.max(1, tot));
  const out: any[] = [];
  let y = WB.cord + 2;
  rows.forEach((r, i) => {
    const rwid = (r.reduce((a, it) => a + it.w, 0) + 6 * (r.length - 1)) * s;
    let x = -rwid / 2;
    r.forEach((it) => { out.push({ ...it, x, y: y - it.h * s, w: it.w * s, h: it.h * s, s }); x += (it.w + 6) * s; });
    y -= (hs[i] + 4) * s;
  });
  return out;
}

/* ── drawing helpers (CALLED, never mounted) ─────────────────────────────────────────────── */
/* a real thing: the plain drawing (the whole drawing if no picture decodes), then its picture in the same box */
function wiObjArt(b: string, x: number, y: number, w: number, h: number, key: string) {
  const o = WI_OBJ[b] || {};
  const cx = x + w / 2, cy = y + h / 2;
  let plain: any = null;
  
  /* a thing with a picture: its plain drawing stays well inside the picture's own ink, so nothing of it peeks out round the photo */
  if (b === "watermelon") plain = (
    <g>
      <ellipse cx={cx} cy={cy} rx={w * 0.42} ry={h * 0.4} fill="#236B26" stroke="#123E14" strokeWidth={3} />
      {[-0.22, -0.07, 0.07, 0.22].map((f, k) => (
        <path key={k} d={`M ${cx + f * w} ${cy - h * 0.36} Q ${cx + f * w * 1.3} ${cy} ${cx + f * w} ${cy + h * 0.36}`} fill="none" stroke="#7CB342" strokeWidth={5} strokeLinecap="round" />
      ))}
      <ellipse cx={cx - w * 0.12} cy={cy - h * 0.15} rx={w * 0.18} ry={h * 0.12} fill="#FFF" fillOpacity={0.25} />
    </g>
  );
  else if (b === "mango") plain = (
    <g>
      <path d={`M ${cx - w * 0.35} ${cy - h * 0.1} Q ${cx - w * 0.2} ${cy - h * 0.42} ${cx + w * 0.1} ${cy - h * 0.38} Q ${cx + w * 0.42} ${cy - h * 0.2} ${cx + w * 0.35} ${cy + h * 0.2} Q ${cx + w * 0.2} ${cy + h * 0.45} ${cx - w * 0.15} ${cy + h * 0.35} Q ${cx - w * 0.42} ${cy + h * 0.15} ${cx - w * 0.35} ${cy - h * 0.1} Z`} fill="#FFB300" stroke="#B76E00" strokeWidth={3} />
      <path d={`M ${cx + w * 0.05} ${cy - h * 0.32} Q ${cx + w * 0.32} ${cy - h * 0.1} ${cx + w * 0.28} ${cy + h * 0.22}`} fill="none" stroke="#E65100" strokeWidth={8} strokeOpacity={0.4} strokeLinecap="round" />
      <path d={`M ${cx - w * 0.05} ${cy - h * 0.36} Q ${cx} ${cy - h * 0.46} ${cx + w * 0.08} ${cy - h * 0.42}`} fill="none" stroke="#33691E" strokeWidth={3} strokeLinecap="round" />
    </g>
  );
  else if (b === "pencil") plain = (
    <g>
      <rect x={x + w * 0.06} y={y + h * 0.2} width={w * 0.72} height={h * 0.6} rx={3} fill="#F57F17" stroke="#9A4D00" strokeWidth={2.5} />
      <line x1={x + w * 0.06} y1={y + h * 0.4} x2={x + w * 0.78} y2={y + h * 0.4} stroke="#FFB300" strokeWidth={2} />
      <path d={`M ${x + w * 0.78} ${y + h * 0.2} L ${x + w * 0.92} ${cy} L ${x + w * 0.78} ${y + h * 0.8} Z`} fill="#D7CCC8" stroke="#9A4D00" strokeWidth={2} />
      <path d={`M ${x + w * 0.88} ${cy - h * 0.1} L ${x + w * 0.92} ${cy} L ${x + w * 0.88} ${cy + h * 0.1} Z`} fill="#212121" />
    </g>
  );
  else if (b === "sack") plain = (
    <g>
      <path d={`M ${x + w * 0.32} ${y + h * 0.18} L ${x + w * 0.68} ${y + h * 0.18} Q ${x + w * 0.9} ${y + h * 0.5} ${x + w * 0.84} ${y + h * 0.92} L ${x + w * 0.16} ${y + h * 0.92} Q ${x + w * 0.1} ${y + h * 0.5} ${x + w * 0.32} ${y + h * 0.18} Z`} fill="#D7CCC8" stroke="#6D4C41" strokeWidth={3} />
      <rect x={x + w * 0.3} y={y + h * 0.12} width={w * 0.4} height={h * 0.08} rx={3} fill="#8D6E63" stroke="#4E342E" strokeWidth={2} />
      <line x1={x + w * 0.28} y1={y + h * 0.2} x2={x + w * 0.72} y2={y + h * 0.2} stroke="#3E2723" strokeWidth={3.5} />
    </g>
  );
  else if (b === "backpack") plain = (
    <g>
      <rect x={x + w * 0.12} y={y + h * 0.12} width={w * 0.76} height={h * 0.82} rx={22} fill="#FB8C00" stroke="#BF360C" strokeWidth={3} />
      <rect x={x + w * 0.22} y={y + h * 0.48} width={w * 0.56} height={h * 0.34} rx={12} fill="#EF6C00" stroke="#BF360C" strokeWidth={2.5} />
      <path d={`M ${x + w * 0.35} ${y + h * 0.12} Q ${cx} ${y + h * 0.02} ${x + w * 0.65} ${y + h * 0.12}`} fill="none" stroke="#BF360C" strokeWidth={4} />
    </g>
  );
  else if (b === "pillow") plain = (
    <g>
      <rect x={x + w * 0.12} y={y + h * 0.12} width={w * 0.76} height={h * 0.76} rx={28} fill="#FBC02D" stroke="#F57F17" strokeWidth={3} />
      <rect x={x + w * 0.2} y={y + h * 0.2} width={w * 0.6} height={h * 0.6} rx={20} fill="#FFF9C4" fillOpacity={0.5} />
    </g>
  );
  else if (b === "brick") plain = (
    <g>
      <rect x={x + w * 0.06} y={y + h * 0.12} width={w * 0.88} height={h * 0.76} rx={6} fill="#D84315" stroke="#4E342E" strokeWidth={3} />
      {[0.25, 0.5, 0.75].map((f, k) => <ellipse key={k} cx={x + w * f} cy={cy} rx={w * 0.08} ry={h * 0.18} fill="#BF360C" stroke="#4E342E" strokeWidth={2} />)}
    </g>
  );
  else if (b === "parcel") plain = (
    <g>
      <rect x={x + 4} y={y + 4} width={w - 8} height={h - 8} rx={10} fill="#BCAAA4" stroke="#4E342E" strokeWidth={3} />
      <line x1={cx} y1={y + 4} x2={cx} y2={y + h - 4} stroke="#6D4C41" strokeWidth={6} />
      <line x1={x + 4} y1={cy} x2={x + w - 4} y2={cy} stroke="#6D4C41" strokeWidth={6} />
    </g>
  );
  else if (b === "packet") plain = (
    <g>
      <path d={`M ${x + 6} ${y + 16} L ${x + 14} ${y + 4} L ${x + w - 14} ${y + 4} L ${x + w - 6} ${y + 16} L ${x + w - 6} ${y + h - 4} L ${x + 6} ${y + h - 4} Z`} fill="#FAFAFA" stroke="#455A64" strokeWidth={3} />
      <rect x={x + 6} y={y + h * 0.38} width={w - 12} height={h * 0.28} fill="#0288D1" />    </g>
  );
  else if (b === "loaf") plain = (
    <g>
      <path d={`M ${x + 4} ${y + h - 6} L ${x + 4} ${y + h * 0.45} Q ${x + 6} ${y + 4} ${cx} ${y + 4} Q ${x + w - 6} ${y + 4} ${x + w - 4} ${y + h * 0.45} L ${x + w - 4} ${y + h - 6} Z`} fill="#D78931" stroke="#5D3A1A" strokeWidth={3} />
      {[0.3, 0.5, 0.7].map((f, k) => <path key={k} d={`M ${x + w * f - 10} ${y + 14} Q ${x + w * f} ${y + 24} ${x + w * f + 10} ${y + 14}`} fill="none" stroke="#5D3A1A" strokeWidth={3} strokeLinecap="round" />)}
    </g>
  );
  /* the backpack's carrying loop shows a little white at the top of its picture: the top rows are cut off (the coordinator) */
  const clip = b === "backpack" ? "wi-bp-" + key : null;
  return (
    <g>
      {plain}
      {clip && <clipPath id={clip}><rect x={x} y={y + h * 0.05} width={w} height={h * 0.95} /></clipPath>}
      {o.skin ? <Skin name={o.skin} x={x} y={y} w={w} h={h} clip={clip ? "url(#" + clip + ")" : undefined} /> : null}
    </g>
  );
}
/* an iron standard weight: a knob, a dark hexagon-shouldered block and a cream plate with its stamped weight (an always-printed label) */
function wiIron(x: number, y: number, w: number, h: number, g: number, label = true, fs = 32, tx: any = (v: any) => v) {
  /* the stamped weight goes through tx (Hindi and Gujarati units); a gram label too wide for its plate takes the short form ग्रा / ગ્રા */
  let txt = tx(wiLab(g));
  if (wiW(txt, fs) + 10 > w - 4) txt = txt.replace("ग्राम", "ग्रा").replace("ગ્રામ", "ગ્રા");
  const kh = h * 0.2, by = y + kh, bh = h - kh, pw = Math.min(w - 4, wiW(txt, fs) + 12);
  return (
    <g>
      {/* Top Knob */}
      <rect x={x + w * 0.36} y={y + 1} width={w * 0.28} height={kh + 4} rx={6} fill="#4A4F55" stroke="#1A1D20" strokeWidth={2} />
      <rect x={x + w * 0.38} y={y + 3} width={w * 0.24} height={3} rx={1.5} fill="#FFF" fillOpacity={0.25} />
      {/* Metallic Body */}
      <path d={`M ${x + w * 0.12} ${by} L ${x + w * 0.88} ${by} L ${x + w} ${by + bh * 0.3} L ${x + w} ${y + h} L ${x} ${y + h} L ${x} ${by + bh * 0.3} Z`} fill="url(#wiIron)" stroke="#1A1D20" strokeWidth={2.5} />
      {/* Top Bevel Highlight */}
      <path d={`M ${x + w * 0.14} ${by + 3} L ${x + w * 0.86} ${by + 3}`} stroke="#FFF" strokeOpacity={0.3} strokeWidth={2} strokeLinecap="round" />
      {/* Label Stamp Plate */}
      {label && (
        <g data-scale="weight">
          <rect x={x + w / 2 - pw / 2} y={by + bh / 2 - 21} width={pw} height={42} rx={10} fill="#FFF9EE" stroke="#1A1D20" strokeWidth={2} />
          <text x={x + w / 2} y={by + bh / 2 + fs * 0.36} textAnchor="middle" fontSize={fs} fontWeight={700} fill="#1A1D20">{txt}</text>
        </g>
      )}
    </g>
  );
}
/* a row of words drawn one text each (a sum such as 2 kg + 1 kg is a label, never one long text) */
function wiRow(parts: string[], cx: number, y: number, fs: number, fill: string, tx: any) {
  const ws = parts.map((p) => wiW(tx(p), fs)), gap = fs * 0.3, tot = ws.reduce((a, b) => a + b, 0) + gap * (parts.length - 1);
  /* anchored on the browser's own measure, so a width estimate that runs high (Hindi, Gujarati) never pushes a word off its pill:
     one word is centred; "a = b" or "a + b" hangs both sides from its sign */
  const T = (k: number, x: number, a: string) => <text key={k} x={x} y={y} textAnchor={a} fontSize={fs} fontWeight={700} fill={fill}>{tx(parts[k])}</text>;
  if (parts.length === 1) return [T(0, cx, "middle")];
  if (parts.length === 3) {
    const xs = cx + (ws[0] - ws[2]) / 2, half = ws[1] / 2 + gap;
    return [T(0, xs - half, "end"), T(1, xs, "middle"), T(2, xs + half, "start")];
  }
  let x = cx - tot / 2;
  return parts.map((p, k) => { const t = <text key={k} x={x} y={y} fontSize={fs} fontWeight={700} fill={fill}>{tx(p)}</text>; x += ws[k] + gap; return t; });
}
/* a tag: a heading over a value, in a role colour (Given blue, Answer green, the working's amber, plain ink) */
function wiTag(cx: number, y: number, head: string, value: string[], col: string, tx: any, key: string, extra: any = {}, lo = 2, hi = 650) {
  const vw = value.reduce((a, p) => a + wiW(tx(p), 32), 0) + 32 * 0.3 * (value.length - 1);
  const w = Math.min(262, Math.max(wiW(tx(head), 28), vw) + 40);
  const x = Math.max(lo, Math.min(cx - w / 2, hi - w));
  return (
    <g key={key} {...extra}>
      <rect x={x} y={y} width={w} height={78} rx={16} fill={tint(col, 0.92)} stroke={col} strokeWidth={3} />
      <rect x={x + 3} y={y + 3} width={w - 6} height={26} rx={13} fill="#FFF" fillOpacity={0.5} pointerEvents="none" />
      <text x={x + w / 2} y={y + 28} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={shade(col, 0.45)}>{tx(head)}</text>
      {wiRow(value, x + w / 2, y + 64, 32, C_INK, tx)}
    </g>
  );
}
const C_INK = "#2B2B2B";

/* ── the working area ───────────────────────────────────────────────────────────────────────
   A frame 900 wide (it fits beside the open keypad, bigPad), at x 0 with the keypad open and 40 in with it shut: the balance at
   the left, the shelf of things and the rack of weights at the right, out of the key's corner. The pans hang from the beam; the
   beam turns by the grams (wiTilt) with one slow bounce (a CSS transition; none under reduced motion). A tap on a piece puts it
   where it belongs (a hand carries it: api.act); a drag puts it where it is dropped; a tap on a piece on a pan takes it back. */
function Work({ phase, n, item, index, stage, wrong, typed, api, MODEL, step, stepOn, box, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();
  const free = stage === "free";
  const warm = !free && !!phase.warm && (stage === "demo" || stage === "teach");
  const spec = free ? WI_FREE : warm ? phase.warm : item.board;
  /* the board belongs to an ENTRY of a question (PATTERNS 18): rebuilt whenever the question changes, kept while the keypad slides */
  const q = free ? "free" : n + ":" + (warm ? "w" : index);
  const ent = useRef({ q: "", e: 0 });
  if (ent.current.q !== q) ent.current = { q, e: ent.current.e + 1 };
  const qk = q + "#" + ent.current.e;
  const qkRef = useRef(qk);
  qkRef.current = qk;
  const [raw, setRaw] = useState<any>(() => wiFresh(spec, qk));
  const S = raw.qk === qk ? raw : wiFresh(spec, qk);
  const gateItem = free || warm || !item || !item.gate ? null : item;
  const upd = (fn: any, k = qk) => setRaw((p: any) => {
    if (k !== qkRef.current) return p;
    const b = p.qk === k ? p : wiFresh(spec, k);
    const r = fn(b);
    if (!r) return b;
    return gateItem && !r.gate && wiGateOk(r, gateItem) ? { ...r, gate: true } : r;
  });
  const acting = useRef(false), queued = useRef<any>(null), corrBusy = useRef(false), touched = useRef(false), lockedMine = useRef(false);
  const ctlBoxes = useRef<any[]>([]);
  ctlBoxes.current = [];
  const modeRef = useRef<any>(null), stageRef = useRef(stage);
  stageRef.current = stage;
  const live = (stage === "ask" || stage === "demo" || free) && !(stage === "ask" && S.won);

  /* the frame: x 0 with the keypad open, 40 in with it shut; the shelf takes the room left of the key's corner */
  const bw = box ? box.w : 1472;
  const kx = box && box.key ? box.key.x - 12 : bw;
  const ox = Math.round(40 * Math.max(0, Math.min(1, (bw - 900) / 572)));
  const Rr = Math.min(bw, kx) - ox;
  const colW = Math.max(220, Rr - WB.colX - 4);
  const shelf = wiShelf(spec, colW, 452);
  const sx = (it: any) => WB.colX + it.x, sy = (it: any) => 12 + it.y;

  /* what the pans show: the child's own, or the correction's replay (a demo layer, gone at the child's next act) */
  const corr = stage === "ask" && S.corr ? S.corr : null;
  /* a right answer typed before the act (the lock arms only after a real touch): the win shows the act done, the beam level under its line */
  const winNow = !free && item && (stage === "win" || (stage === "idle" && S.won));
  const SV = winNow && !S.gate && item.sol ? wiSolved(S, item, spec) : S;
  const D = corr && corr.pans ? corr.pans : SV;
  const mL = wiMass(D.L), mR = wiMass(D.R);
  const deg = wiTilt(mL - mR), rad = (deg * Math.PI) / 180;
  const hL = { x: WB.cx - WB.half * Math.cos(rad), y: WB.cy - WB.half * Math.sin(rad) };
  const hR = { x: WB.cx + WB.half * Math.cos(rad), y: WB.cy + WB.half * Math.sin(rad) };
  const anim = reducedMotion() ? "none" : "transform 950ms cubic-bezier(.34,1.32,.55,1)";
  const panL = wiPan(D.L), panR = wiPan(D.R);

  /* the name an act reports (api.did) and a step waits for */
  const nameOf = (pl: string) => {
    if (pl.startsWith("r:")) return "w" + pl.slice(2);
    if (pl === "tray") return "tray";
    if (pl.startsWith("c:")) return wiBase(pl.slice(2));
    const e = [...S.L, ...S.R].find((x: any) => "p:" + x.id === pl);
    return e ? "pan-" + (e.b === "w" ? "w" + e.g : e.b) : "pan";
  };
  /* where a piece is now (work units), for the hand that carries it */
  const posOf = (pl: string) => {
    if (pl.startsWith("p:")) {
      const eid = pl.slice(2);
      for (const [lst, h] of [[panL, hL], [panR, hR]] as any[]) {
        const it = lst.find((x: any) => x.e.id === eid);
        if (it) return { x: ox + h.x + it.x + it.w / 2, y: h.y + it.y + it.h / 2 };
      }
      return { x: ox + WB.cx, y: 300 };
    }
    if (pl.startsWith("c:packet")) {
      const t = shelf.tray, k = Number(pl.slice(8)) - 1;
      if (t) { const r = wiTrayGeo(sx(t), sy(t), t.s); return { x: ox + r.slots[k].x + r.slots[k].w / 2, y: r.slots[k].y + r.slots[k].h / 2 }; }
    }
    if (pl === "tray" && shelf.tray) { const t = shelf.tray; return { x: ox + sx(t) + t.w / 2, y: sy(t) + t.h * 0.35 }; }
    const it = shelf[pl] || (pl.startsWith("p:") ? null : null);
    if (it) return { x: ox + sx(it) + it.w / 2, y: sy(it) + it.h / 2 };
    return { x: ox + WB.colX + 100, y: 200 };
  };
  const backTo = (pl: string) => {
    const e = [...S.L, ...S.R].find((x: any) => "p:" + x.id === pl);
    if (!e) return posOf("tray");
    return posOf(e.b === "w" ? "r:" + e.g : e.b === "set" ? "c:gramset" : "c:" + e.id);
  };
  const panTarget = (side: string) => ({ x: ox + (side === "L" ? hL.x : hR.x), y: (side === "L" ? hL.y : hR.y) + WB.cord - 56 });
  /* the piece the hand carries: drawn round 0,0, with no printed text (the act layer prints none) */
  const holdOf = (pl: string) => {
    if (pl.startsWith("r:")) { const g = Number(pl.slice(2)), [w, h] = WI_WD[g]; return wiIron(-w / 2, -h / 2, w, h, g, false); }
    if (pl === "tray") return <g>{[0, 1, 2].map((k) => <g key={k}>{wiObjArt("packet", -130 + k * 88, -48, 80, 96, "hold" + k)}</g>)}</g>;
    let b = "";
    if (pl.startsWith("c:")) b = wiBase(pl.slice(2));
    else { const e = [...S.L, ...S.R].find((x: any) => "p:" + x.id === pl); b = e ? (e.b === "w" ? "" : e.b) : ""; if (e && e.b === "w") { const [w, h] = WI_WD[e.g]; return wiIron(-w / 2, -h / 2, w, h, e.g, false); } }
    if (b === "gramset") return <g>{wiIron(-104, -40, 108, 82, 500, false)}{wiIron(6, -34, 104, 76, 200, false)}</g>;
    const o = WI_OBJ[b];
    return o ? wiObjArt(b, -o.w / 2, -o.h / 2, o.w, o.h, "hold") : null;
  };

  /* a tap (or Enter / Space on a focused piece): put it where it belongs, or take it back off its pan; a hand does it */
  const onTapRef = useRef<any>(null);
  const onTap = (pl: string, real: boolean) => {
    if (!live) return;
    if (real) touched.current = true;
    if (corrBusy.current) return;                       /* the correction is replaying: taps wait for it to end */
    if (acting.current) { if (real) queued.current = pl; return; }   /* a real tap during an act is queued, never dropped */
    const name = nameOf(pl);
    if (stage === "demo" && name !== stepOn) { api.did(name); return; }
    const next = pl.startsWith("p:") ? wiTake(S, pl.slice(2)) : wiPut(S, pl, spec);
    if (!next || (pl.startsWith("p:") && next.L.length === S.L.length && next.R.length === S.R.length)) return;
    const k = qk, wasDemo = stage === "demo";
    const from = posOf(pl);
    const to = pl.startsWith("p:") ? backTo(pl) : (() => { const side = next.L.length > S.L.length ? "L" : "R"; return panTarget(side); })();
    acting.current = true;
    upd((p: any) => ({ ...p, corr: null, moving: pl }), k);
    api.act({ tool: "hand", moves: "carry", from, at: [to], hold: holdOf(pl),
      onPoint: () => upd((p: any) => {
        const r = pl.startsWith("p:") ? wiTake(p, pl.slice(2)) : wiPut(p, pl, spec);
        return r ? { ...r, moving: null } : { ...p, moving: null };
      }, k),
    }).then((ok: boolean) => {
      acting.current = false;
      upd((p: any) => ({ ...p, moving: null }), k);
      if (ok && wasDemo && k === qkRef.current) api.did(name);
      const qd = queued.current;
      queued.current = null;
      if (qd && k === qkRef.current) setTimeout(() => onTapRef.current && onTapRef.current(qd, false), 40);
    });
  };
  onTapRef.current = onTap;
  /* a drag: the piece goes where it is dropped (a pan), or back to the shelf; the child's own hand carried it */
  const zoneOf = (p: any) => {
    const x = p.x - ox;
    const inPan = (h: any) => x >= h.x - 140 && x <= h.x + 140 && p.y >= h.y - 30 && p.y <= h.y + WB.cord + 60;
    return inPan(hL) ? "L" : inPan(hR) ? "R" : null;
  };
  const onDrop = (pl: string, p: any) => {
    if (!live) return;
    touched.current = true;
    if (corrBusy.current || acting.current) return;
    const side = zoneOf(p), name = nameOf(pl);
    if (stage === "demo" && name !== stepOn) { api.did(name); return; }
    let next: any = null;
    if (pl.startsWith("p:")) next = side ? wiMove(S, pl.slice(2), side, spec) : wiTake(S, pl.slice(2));
    else if (side) next = wiPut(S, pl, spec, side);
    if (!next) return;
    if (stage === "demo" && pl.startsWith("p:") === !!side) return;   /* a step's act is a put (or, for pan-..., a take) */
    const k = qk;
    upd((b: any) => {
      const r = pl.startsWith("p:") ? (side ? wiMove(b, pl.slice(2), side, spec) : wiTake(b, pl.slice(2))) : wiPut(b, pl, spec, side || undefined);
      return r ? { ...r, corr: null } : b;
    }, k);
    api.sfx.settle();
    if (stage === "demo") api.did(name);
  };
  const drag = useDrag((pl: any, p: any, moved: boolean) => (moved ? onDrop(pl, p) : onTap(pl, true)));

  /* a guide step done by Enter, the agent's check() or the dev solve(): the same act as the child's tap */
  const performStep = (on: string) => {
    let pl = "";
    if (/^w\d/.test(on)) pl = "r:" + on.slice(1);
    else if (on === "gramset") pl = "c:gramset";
    else if (on === "tray") pl = "tray";
    else if (on === "packet") { const k = [1, 2, 3, 4].find((j) => !wiOn(S, "packet" + j)); pl = k ? "c:packet" + k : ""; }
    else if (on.startsWith("pan-w")) { const g = Number(on.slice(5)); const e = S.R.find((x: any) => !x.fixed && x.b === "w" && x.g === g) || S.L.find((x: any) => !x.fixed && x.b === "w" && x.g === g); pl = e ? "p:" + e.id : ""; }
    if (pl) onTap(pl, false);
  };
  api.onEnter(stage === "demo" && stepOn ? () => performStep(stepOn) : null);
  /* the agent's check() and the dev solve(): the act done at once, so the gate opens */
  const solveNow = () => {
    upd((p: any) => wiSolved(p, item, spec));
    if (lockedMine.current) { lockedMine.current = false; api.lock(false); }
    return undefined;
  };
  HOOK.demo = stage === "demo" && stepOn ? () => performStep(stepOn) : null;
  HOOK.check = stage === "ask" && !free && item && item.sol ? solveNow : null;
  HOOK.solveAct = HOOK.check;

  /* a real Enter on a guide step counts as a touch of the board (the gate's rule) */
  useEffect(() => {
    const h = (e: any) => { if (e.isTrusted && e.key === "Enter" && stageRef.current === "demo") touched.current = true; };
    window.addEventListener("keydown", h, true);
    return () => window.removeEventListener("keydown", h, true);
  }, []);
  /* a tap made while the hand is carrying is QUEUED, never dropped (the runtime turns the working area's pointer events off
     while an act plays, so the piece is found here by its box) */
  useEffect(() => {
    const h = (e: any) => {
      if (!acting.current || !e.isTrusted) return;
      const z: any = document.querySelector('[data-zone="work"]'), svg = z && z.ownerSVGElement;
      if (!svg || !svg.getScreenCTM) return;
      const pt = svg.createSVGPoint(); pt.x = e.clientX; pt.y = e.clientY;
      const p = pt.matrixTransform(svg.getScreenCTM().inverse()), x = p.x - W.x, y = p.y - W.y;
      const hit = ctlBoxes.current.find((b: any) => x >= b.x && x <= b.x + b.w && y >= b.y && y <= b.y + b.h);
      if (hit) { touched.current = true; queued.current = hit.pl; }
    };
    window.addEventListener("pointerup", h, true);
    return () => window.removeEventListener("pointerup", h, true);
  }, []);
  /* THE ANSWER GATE (PATTERNS 19): locked only in user mode, after a real touch, while the question's act is not yet done */
  useEffect(() => {
    if (modeRef.current === null) { try { const st = (window as any).toolApi && (window as any).toolApi.getState(); if (st && st.mode) modeRef.current = st.mode; } catch (e) { /* not ready */ } }
    const need = stage === "ask" && !free && !!gateItem && !S.gate && !S.won && touched.current && modeRef.current === "user";
    if (need) { lockedMine.current = true; api.lock(true); }
    else if (lockedMine.current && !acting.current) { lockedMine.current = false; api.lock(false); }
  });
  useEffect(() => () => { if (lockedMine.current) { lockedMine.current = false; api.lock(false); } }, []);
  /* a new entry: stop a replay or an act that belongs to the old question */
  useEffect(() => () => { tl.stop(); corrBusy.current = false; queued.current = null; }, [qk]);

  /* the win: the item's own line, and the green Answer tag (the runtime puts the phase's closing in place of the last one) */
  const winSaid = useRef("");
  useEffect(() => {
    if (stage === "win" && !free && item && winSaid.current !== qk) {
      winSaid.current = qk;
      upd((p: any) => ({ ...p, won: true, corr: null }));
      if (item.win) api.say(item.win);
    }
  }, [stage, qk]);

  /* THE CORRECTION (MISS HIDES THE ANSWER, PATTERNS 7): the working is replayed and stops one step before the answer. The pad is
     not locked (the board ignores taps while it plays); the slot is emptied by the runtime; nothing here names the answer. */
  useEffect(() => {
    if (!wrong || stage !== "ask" || free || !item) return;
    const k = qk;
    /* the child's own board when the act is done (the gate); else the act as the agent does it (item.sol), shown as a picture */
    const fixit = (r: any) => ({ ...r, L: r.L.map((e: any) => ({ ...e, fixed: true })), R: r.R.map((e: any) => ({ ...e, fixed: true })) });
    const cur = S.gate ? S : fixit(wiSolved(S, item, spec));
    const steps: any[] = [];
    const lvlRs = cur.R.filter((e: any) => e.b === "w" && !wiFresh(item.board, k).R.some((f: any) => f.id === e.id)).sort((a: any, b: any) => b.g - a.g);
    const cmp = (b: string) => (WI_OBJ[b].g > 1000 ? "over 1 kg" : "under 1 kg");
    const fixedR = wiFresh(item.board, k).R;
    /* the replay's own pieces are a picture only (fixed: no control), gone at the child's next act */
    const one = (id: string) => ({ id: "x" + id, b: wiBase(id), g: WI_OBJ[wiBase(id)].g, fixed: true });
    if (item.kind === "unit") {
      const b = item.board.col[0];
      const pans = { L: [one(b)], R: fixedR };
      steps.push({ pans, rings: ["L0", "R0"] });
      steps.push({ pans, rings: ["L0", "R0"], chips: [{ side: "L", head: WI_OBJ[b].name, value: [cmp(b)] }] });
    } else if (item.kind === "which") {
      const b = item.pick[String(wrong.value)] || item.board.col[0];
      const pans = { L: [one(b)], R: fixedR };
      steps.push({ pans });
      steps.push({ pans, chips: [{ side: "L", head: WI_OBJ[b].name, value: [cmp(b)] }] });
    } else if (item.kind === "pair") {
      const b = item.pick[String(wrong.value)] || "pillow";
      const side = cur.R.some((e: any) => e.b === b) ? "R" : "L", pans = { L: cur.L, R: cur.R };
      steps.push({ pans, level: true });
      steps.push({ pans, level: true, chips: [{ side, head: WI_OBJ[b].name, value: ["went up"] }] });
    } else if (item.kind === "count") {
      const marks: any = {};
      item.board.col.forEach((c: string) => {
        steps.push({ pans: { L: [one(c)], R: fixedR }, marks: { ...marks } });
        marks[c] = cmp(c);
        steps.push({ pans: { L: [one(c)], R: fixedR }, marks: { ...marks } });
      });
    } else if (item.kind === "weigh" || item.kind === "weigh1") {
      const pans = { L: cur.L, R: cur.R };
      lvlRs.forEach((_: any, i: number) => steps.push({ pans, ringR: lvlRs.slice(0, i + 1).map((e: any) => e.id) }));
      const terms = lvlRs.flatMap((e: any, i: number) => (i ? ["+", wiLab(e.g)] : [wiLab(e.g)]));
      const fits = lvlRs.length && lvlRs.length <= 3 && wiW(terms.join(" "), 32) <= 232;
      steps.push({ pans, ringR: lvlRs.map((e: any) => e.id), chips: [{ side: "R", head: "Add", value: fits ? terms : ["every weight"] }] });
    } else if (item.kind === "missing") {
      /* the parcel's 1 kg against the weights that were there before: the one the child added is not ringed and not named */
      const fixed = fixedR, pans = { L: cur.L, R: fixed };
      fixed.forEach((_: any, i: number) => steps.push({ pans, ringR: fixed.slice(0, i + 1).map((e: any) => e.id), unit: true }));
      steps.push({ pans, ringR: fixed.map((e: any) => e.id), unit: true, chips: [{ side: "R", head: "Pan had", value: [wiLab(wiMass(fixed))] }] });
    } else if (item.kind === "packets") {
      const pans = { L: [one("packet1"), one("packet2")], R: fixedR };
      [1, 2, 3, 4].forEach((j) => steps.push({ pans, slots: j }));
      steps.push({ pans, slots: 4, rings: ["L0", "L1"], chips: [{ side: "L", head: "On the pan", value: ["2 of 4 parts"] }] });
    } else if (item.kind === "loaves") {
      const pans = { L: [one("loaf1")], R: fixedR };
      steps.push({ pans });
      steps.push({ pans, chips: [{ side: "L", head: "1 loaf, about", value: ["half a kg"] }] });
    }
    if (!steps.length) return;
    corrBusy.current = true;
    tl.run(steps.map((st: any) => [750, () => upd((p: any) => ({ ...p, corr: st }), k)]), () => { corrBusy.current = false; });
  }, [wrong]);

  /* what the host and the agent read back (never a total, so nothing answers the question before it is given) */
  api.share({ thing: (S.L.find(wiThing) || {}).b || null, onLeft: S.L.length, onRight: S.R.length, level: mL === mR, weighed: S.seen.length,
    gate: !!S.gate, complete: stage === "idle" });

  /* ── drawing ── */
  const dg = drag.drag && drag.drag.moved ? drag.drag : null;
  const hidden = (pl: string) => (dg && dg.payload === pl) || S.moving === pl;
  const ctl = (pl: string, label: string, x: number, y: number, w: number, h: number, wx = ox, wy = 0) => {
    const name = nameOf(pl), cw = Math.max(72, w), ch = Math.max(72, h);
    if (!live) return null;
    ctlBoxes.current.push({ pl, x: wx + x + w / 2 - cw / 2, y: wy + y + h / 2 - ch / 2, w: cw, h: ch });
    return <rect className="c4-hit" {...control(name, tx(label))} {...drag.bind(pl)} {...drag.keys(pl)} x={x + w / 2 - cw / 2} y={y + h / 2 - ch / 2} width={cw} height={ch} fill="transparent" />;
  };
  const labelOf = (b: string) => (WI_OBJ[b] ? WI_OBJ[b].name : b);
  const inv = stage === "demo" && stepOn ? stepOn : null;
  let invBox: any = null;

  /* one pan: cords, dish, what lies on it (each piece a control unless fixed) */
  const drawPan = (side: string, h: any, items: any[]) => (
    <g key={side} style={{ transform: `translate(${h.x}px, ${h.y}px)`, transition: anim } as any}>
      <line x1={0} y1={0} x2={-WB.dish + 8} y2={WB.cord} stroke="#4A3824" strokeWidth={3.5} strokeLinecap="round" />
      <line x1={0} y1={0} x2={WB.dish - 8} y2={WB.cord} stroke="#4A3824" strokeWidth={3.5} strokeLinecap="round" />
      <circle cx={0} cy={4} r={8} fill="none" stroke="#5E4008" strokeWidth={4} />
      <path d={`M ${-WB.dish} ${WB.cord} L ${WB.dish} ${WB.cord} Q ${WB.dish - 24} ${WB.cord + 28} 0 ${WB.cord + 28} Q ${-WB.dish + 24} ${WB.cord + 28} ${-WB.dish} ${WB.cord} Z`} fill="url(#wiBrass)" stroke="#5E4008" strokeWidth={2.5} />
      <ellipse cx={0} cy={WB.cord} rx={WB.dish} ry={7} fill="#F8E090" fillOpacity={0.4} stroke="#5E4008" strokeWidth={2} />
      {items.map((it: any, i: number) => {
        const pl = "p:" + it.e.id, gone = hidden(pl);
        if (gone) return null;
        const art = it.kind === "w" ? wiIron(it.x, it.y, it.w, it.h, it.g, true, Math.max(28, Math.round(32 * it.s)), tx) : wiObjArt(it.e.b, it.x, it.y, it.w, it.h, side + i);
        const can = !it.e.fixed && it.e.b !== "set";
        const lbl = it.kind === "w" ? wiLab(it.g) + " weight" : labelOf(it.e.b);
        if (inv && can && nameOf(pl) === inv && !invBox) invBox = { x: ox + h.x + it.x + it.w / 2, y: h.y + it.y + it.h / 2, w: it.w, h: it.h };
        const ring = corr && ((corr.rings || []).includes(side + i) || (corr.ringR || []).includes(it.e.id));
        return (
          <g key={it.e.id + ":" + (it.sub ?? "")}>
            {art}
            {ring && <rect x={it.x - 7} y={it.y - 7} width={it.w + 14} height={it.h + 14} rx={14} fill="none" stroke={WI_C.step} strokeWidth={5} pointerEvents="none" />}
            {can && it.sub === undefined && ctl(pl, lbl, it.x, it.y, it.w, it.h, ox + h.x, h.y)}
          </g>
        );
      })}
    </g>
  );

  /* the shelf: things and the gram set (a dashed place when on a pan), the tray of packets, the rack */
  const shelfEls: any[] = [];
  for (const key of Object.keys(shelf)) {
    const it = shelf[key], x = sx(it), y = sy(it);
    if (it.kind === "tray") {
      const tg = wiTrayGeo(x, y, it.s);
      const els: any[] = [<rect key="tb" x={tg.x} y={tg.y} width={tg.w} height={tg.h} rx={18} fill="#E2C293" stroke="#7A562B" strokeWidth={3} />];
      tg.slots.forEach((sl: any, j: number) => {
        const id = "packet" + (j + 1), pl = "c:" + id, on = wiOn(S, id);
        const lit = corr && corr.slots && j < corr.slots;
        els.push(<rect key={"s" + j} x={sl.x - 3} y={sl.y - 3} width={sl.w + 6} height={sl.h + 6} rx={12} fill="#F6EBDB" stroke="#7A562B" strokeWidth={2} strokeDasharray={on ? "8 6" : undefined} />);
        if (!on && !hidden(pl)) {
          els.push(<g key={"p" + j}>{wiObjArt("packet", sl.x, sl.y, sl.w, sl.h, "tp" + j)}</g>);
          els.push(<g key={"c" + j}>{ctl(pl, "packet of sugar", sl.x, sl.y, sl.w, sl.h)}</g>);
          if (inv === "packet" && !invBox) invBox = { x: ox + sl.x + sl.w / 2, y: sl.y + sl.h / 2, w: sl.w, h: sl.h };
        }
        if (lit) els.push(<rect key={"r" + j} x={sl.x - 8} y={sl.y - 8} width={sl.w + 16} height={sl.h + 16} rx={14} fill="none" stroke={WI_C.step} strokeWidth={5} pointerEvents="none" />);
      });
      els.push(<g key="tag" data-scale="tray">
        <rect x={tg.strip.x} y={tg.strip.y} width={tg.strip.w} height={tg.strip.h} rx={14} fill={tint(WI_C.given, 0.88)} stroke={WI_C.given} strokeWidth={3} />
        {wiRow(["1 kg in all"], tg.strip.x + tg.strip.w / 2, tg.strip.y + 47, 32, C_INK, tx)}
      </g>);
      if (live) {
        ctlBoxes.current.push({ pl: "tray", x: ox + tg.strip.x, y: tg.strip.y, w: tg.strip.w, h: tg.strip.h });
        els.push(<Hit key="hit" id="tray" x={tg.strip.x} y={tg.strip.y} w={tg.strip.w} h={tg.strip.h} label={tx("tray of packets")} onPress={() => onTap("tray", true)} />);
      }
      if (inv === "tray") invBox = { x: ox + tg.strip.x + tg.strip.w / 2, y: tg.strip.y + tg.strip.h / 2, w: tg.strip.w, h: tg.strip.h };
      shelfEls.push(<g key={key}>{els}</g>);
      continue;
    }
    /* the correction's over / under 1 kg mark is drawn for every thing, on its shelf place, whether or not the thing is on a pan now */
    const mark = corr && corr.marks && it.kind === "obj" ? corr.marks[it.id] : null;
    const markEl = mark ? <g key={key + "m"} pointerEvents="none">{wiTag(x + it.w / 2, y + it.h / 2 - 39, labelOf(it.b), [mark], WI_C.step, tx, key + "mt", {}, WB.colX, WB.colX + colW)}</g> : null;
    const onPan = it.kind === "obj" ? wiOn(D, it.id) : it.kind === "set" ? wiOn(D, "gramset") : it.kind === "w" ? wiOn(D, "w" + it.g) : false;
    if (onPan || hidden(key)) {
      /* its place on the shelf or the rack stays, dashed, while it is on a pan (one of each weight: it comes back here) */
      shelfEls.push(<rect key={key} x={x + 4} y={y + 4} width={it.w - 8} height={it.h - 8} rx={14} fill="none" stroke={C.rule} strokeWidth={3} strokeDasharray="10 8" />);
      if (markEl) shelfEls.push(markEl);
      continue;
    }
    if (it.kind === "w") {
      shelfEls.push(<g key={key}>{wiIron(x, y, it.w, it.h, it.g, true, 32, tx)}{ctl(key, wiLab(it.g) + " weight", x, y, it.w, it.h)}</g>);
    } else if (it.kind === "set") {
      shelfEls.push(<g key={key}>
        <rect x={x} y={y} width={it.w} height={it.h} rx={16} fill="#E2C293" stroke="#7A562B" strokeWidth={3} />
        {wiIron(x + 8, y + 8, 108, 82, 500, true, 32, tx)}{wiIron(x + 120, y + 14, 104, 76, 200, true, 32, tx)}
        {wiIron(x + 8, y + 98, 104, 76, 200, true, 32, tx)}{wiIron(x + 120, y + 100, 104, 74, 100, true, 32, tx)}
        {ctl(key, "tray of gram weights", x, y, it.w, it.h)}
      </g>);
    } else {
      const o = WI_OBJ[it.b], oh = o.h * it.s, ow = o.w * it.s, oy = y + (it.h - oh) / 2;
      shelfEls.push(<g key={key}>{wiObjArt(it.b, x, oy, ow, oh, "sh" + it.id)}{ctl(key, labelOf(it.b), x, y, it.w, it.h)}</g>);
    }
    if (markEl) shelfEls.push(markEl);
    if (inv && !invBox && nameOf(key) === inv) invBox = { x: ox + x + it.w / 2, y: y + it.h / 2, w: it.w, h: it.h };
  }

  /* the tags under the pans: the given (blue), the unit fact (vermilion), the working (amber, after a miss), the answer (green, at the win) */
  const sideX = (sd: string) => (sd === "L" ? hL.x : sd === "R" ? hR.x : (S.R.find((e: any) => item && e.b === item.answer) ? hR.x : hL.x));
  const showUnit = !free && ((n === 1 && (stage !== "demo" && stage !== "teach" ? true : step >= 1 && wiOn(S, "gramset"))) || !!(corr && corr.unit));
  /* the unit fact's pill grows for a longer Hindi or Gujarati unit, and stops short of the needle's scale */
  const ufG = lang === "en" ? tx("1,000 g") : tx("1,000 g").replace("ग्राम", "ग्रा").replace("ગ્રામ", "ગ્રા");   /* the short gram form, as on the iron pills */
  const ufW = Math.min(282, Math.max(236,wiW(tx("1 kg"), 32) + wiW("=", 32) + wiW(ufG, 32) + 2 * 9.6 + 34));
  const tags: any[] = [];
  if (!free && !warm && item && item.given) tags.push(wiTag(WB.cx - WB.half, 400, "Given", [item.given], WI_C.given, tx, "given"));
  if (corr && corr.chips && !winNow) corr.chips.forEach((c: any, i: number) => tags.push(wiTag(c.side === "L" ? WB.cx - WB.half : WB.cx + WB.half, 400, c.head, c.value, WI_C.step, tx, "chip" + i, { pointerEvents: "none" })));
  if (winNow && item.tag) tags.push(wiTag(item.tagSide === "B" ? sideX("B") : item.tagSide === "R" ? WB.cx + WB.half : WB.cx - WB.half, 400, "Answer", [item.tag], WI_C.answer, tx, "ans", { "data-reveals": "answer" }));

  return (
    <g>
      <defs>
        <linearGradient id="wiBrass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F8E090" />
          <stop offset="35%" stopColor="#D4A238" />
          <stop offset="75%" stopColor="#B37E22" />
          <stop offset="100%" stopColor="#6E480A" />
        </linearGradient>
        <linearGradient id="wiIron" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5C636B" />
          <stop offset="30%" stopColor="#3E444B" />
          <stop offset="85%" stopColor="#24282D" />
          <stop offset="100%" stopColor="#14171A" />
        </linearGradient>
        <linearGradient id="wiWood" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E2B176" />
          <stop offset="25%" stopColor="#C99A62" />
          <stop offset="80%" stopColor="#A2723C" />
          <stop offset="100%" stopColor="#754E22" />
        </linearGradient>
        <filter id="wiCardShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#000" floodOpacity="0.08" />
        </filter>
      </defs>
      <g transform={`translate(${ox},0)`}>
        {/* the table the balance stands on, and the shelf beside it */}
        <rect x={0} y={WB.table} width={WB.colX - 14} height={36} rx={12} fill="url(#wiWood)" stroke="#6B451B" strokeWidth={3} filter="url(#wiCardShadow)" />
        <rect x={6} y={WB.table} width={WB.colX - 26} height={6} rx={3} fill="#FFF" fillOpacity={0.2} pointerEvents="none" />
        
        {/* Shelf panel card */}
        <rect x={WB.colX - 8} y={2} width={colW + 12} height={WB.table + 30} rx={22} fill="#F8EEDF" stroke={C.rule} strokeWidth={2} filter="url(#wiCardShadow)" />
        <rect x={WB.colX - 4} y={6} width={colW + 4} height={12} rx={6} fill="#FFF" fillOpacity={0.4} pointerEvents="none" />

        {/* the post, its foot and the needle's scale (marks only: where level is) */}
        <rect x={WB.cx - 11} y={WB.cy} width={22} height={WB.table - WB.cy - 26} rx={8} fill="url(#wiBrass)" stroke="#5E4008" strokeWidth={2} />
        <path d={`M ${WB.cx - 52} ${WB.table} L ${WB.cx - 32} ${WB.table - 30} L ${WB.cx + 32} ${WB.table - 30} L ${WB.cx + 52} ${WB.table} Z`} fill="url(#wiBrass)" stroke="#4E3912" strokeWidth={2} />
        <g data-scale="needle">
          <path d={`M ${WB.cx - 34} ${WB.cy - 86} Q ${WB.cx} ${WB.cy - 98} ${WB.cx + 34} ${WB.cy - 86}`} fill="none" stroke={C_INK} strokeWidth={3} />
          {[-12, -6, 0, 6, 12].map((a) => {
            const r = (a * Math.PI) / 180, r1 = a === 0 ? 102 : 94;
            const isZero = a === 0;
            return <line key={a} x1={WB.cx + 86 * Math.sin(r)} y1={WB.cy - 86 * Math.cos(r)} x2={WB.cx + r1 * Math.sin(r)} y2={WB.cy - r1 * Math.cos(r)} stroke={isZero ? WI_C.unit : C_INK} strokeWidth={isZero ? 5 : 3} strokeLinecap="round" />;
          })}
        </g>
        {/* the beam and its needle turn together about the pivot (a symmetric box keeps the turn centred) */}
        <g transform={`translate(${WB.cx},${WB.cy})`}>
          <g style={{ transform: `rotate(${deg}deg)`, transformBox: "fill-box", transformOrigin: "center", transition: anim } as any}>
            <rect x={-1} y={86} width={2} height={2} fill="none" pointerEvents="none" />
            <line x1={0} y1={-6} x2={0} y2={-80} stroke={WI_C.unit} strokeWidth={6} strokeLinecap="round" />
            <path d="M -8 -70 L 0 -88 L 8 -70 Z" fill={WI_C.unit} />
            <rect x={-WB.half - 10} y={-9} width={2 * WB.half + 20} height={18} rx={9} fill="url(#wiBrass)" stroke="#5E4008" strokeWidth={2.5} />
            <rect x={-WB.half - 6} y={-6} width={2 * WB.half + 12} height={4} rx={2} fill="#FFF" fillOpacity={0.35} pointerEvents="none" />
          </g>
          <circle cx={0} cy={0} r={14} fill="url(#wiBrass)" stroke="#4E3912" strokeWidth={2} />
          <circle cx={0} cy={0} r={5} fill="#3A2805" />
        </g>
        {corr && corr.level && <line x1={WB.cx - WB.half - 30} y1={WB.cy} x2={WB.cx + WB.half + 30} y2={WB.cy} stroke={C_INK} strokeWidth={2.5} strokeDasharray="10 8" pointerEvents="none" />}
        {drawPan("L", hL, panL)}
        {drawPan("R", hR, panR)}
        {showUnit && (
          <g data-scale="unit-fact" pointerEvents="none">
            <rect x={4} y={2} width={ufW} height={54} rx={27} fill="#FFFDF7" stroke={WI_C.unit} strokeWidth={corr && corr.unit ? 6 : 4} filter="url(#wiCardShadow)" />
            {wiRow([tx("1 kg"), "=", ufG], 4 + ufW / 2, 41, 32, C_INK, (v: any) => v)}
          </g>
        )}
        {tags}
        {shelfEls}
        {dg && <g pointerEvents="none" transform={`translate(${dg.x - ox},${dg.y})`} opacity={0.92}>{holdOf(dg.payload)}</g>}
      </g>
      {invBox && <Invite x={invBox.x} y={invBox.y} w={Math.max(72, invBox.w)} h={Math.max(72, invBox.h)} rx={14} C={C} />}
    </g>
  );
}
/* the tray of four packets: its four places (2 by 2) and its blue strip (the tray's control: "4 packets: 1 kg") */
function wiTrayGeo(x: number, y: number, s: number) {
  const pw = 80 * s, ph = 96 * s, g = 12 * s;
  const slots = [0, 1, 2, 3].map((k) => ({ x: x + g + (k % 2) * (pw + g), y: y + g + Math.floor(k / 2) * (ph + g), w: pw, h: ph }));
  const w = 2 * pw + 3 * g, h = 2 * ph + 3 * g;
  const tw = Math.max(w, 200 * s);
  return { x, y, w: tw, h, slots, strip: { x, y: y + h + 8, w: tw, h: 72 } };
}

/* the summary page's small drawing of the child's last right answer in a phase: an iron weight and the answer with its unit */
function Thumb({ n, result, it, C, w, h, lang = "en", tx = (v: any) => v }: any) {
  const last = result && result.last;
  if (!last) return null;
  const item = it || last.it || (PHASES[(n || 1) - 1] || { items: [] }).items[last.item] || {};
  /* a word is printed in English, or once its TR line exists (before the language pass a Hindi thumbnail shows no English word) */
  /* a word is printed in English, or in Hindi or Gujarati when TR has its entry (the units show in every language) */
  const word = (s: string) => (lang === "en" || !!(TR[lang] && TR[lang][s]) ? s : "");
  let said: string[] = [], thing = "";
  if (item.parts) { const v = slotPartsOf(last.value, 1)[0]; said = [v, word(item.parts[0].unit || "")].filter(Boolean); }
  else if (item.choices) {
    const c = item.choices.find((x: any) => x.id === String(last.value));
    thing = item.pick && item.pick[String(last.value)] ? item.pick[String(last.value)] : "";
    said = [word(c ? c.label : String(last.value))].filter(Boolean);
  }
  const fs = 32, tw = said.reduce((a, p) => a + wiW(tx(p), fs), 0) + fs * 0.3 * (said.length - 1);
  const size = tw > w - 100 ? 28 : fs;
  const o = thing ? WI_OBJ[thing] : null, k = o ? Math.min(60 / o.w, (h - 16) / o.h) : 1;
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={16} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={2} />
      {o ? wiObjArt(thing, 10, h / 2 - (o.h * k) / 2, o.w * k, o.h * k, "th" + thing) : wiIron(10, h / 2 - 26, 52, 52, 1000, false)}
      {wiRow([said.map((p) => tx(p)).join(" ")], 72 + (w - 72) / 2, h / 2 + size * 0.36, size, C.ink, tx)}
    </g>
  );
}

function WeighIt(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, fitHost: () => null,
      /* the board layout (LAYOUT.md §1b) */
      board: true,
      /* KEY ONLY (the new look; LAYOUT.md §1d, PATTERNS.md §16) */
      keyOnly: true,
      /* the wide keypad (LAYOUT.md §1b, PATTERNS.md 9g): the picture is laid out in a 900-wide frame */
      bigPad: true,
      /* the Next key (PATTERNS.md 9d): nothing moves on by itself */
      nextKey: true,
      /* NAV DOTS (the new look; LAYOUT.md §1d) */
      navDots: true,
      /* the start page: the tool's name, StartArt, START_HOOK, a Start key (above) */
      StartArt, START_HOOK,
      }} />
  );
}

export default WeighIt;