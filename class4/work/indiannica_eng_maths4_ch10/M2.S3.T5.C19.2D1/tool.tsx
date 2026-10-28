/* ═══ M2.S3.T5.C19.2D1 · code_wheel · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists: header + its three controls, canvas, answer panel, bubble + mascot,
   phase dots (user / AI mode), window.toolApi, the sound effects, the printed bubble, scoring, the
   events, idle and restart. THE LESSON IS SILENT (runtime r30): nothing is spoken; every line is
   printed on the bubble, which is the guide. The lesson is action-driven: nothing moves on unless the
   child acts. THE NEW LOOK (keyOnly + navDots + bigPad): the question lives only in the bubble, one
   sentence; every act is performed on screen (api.act); nothing under the key's corner (box.key).
   NO imports in this file; only the five host hooks. Follow docs/LAYOUT.md and docs/PATTERNS.md.
   Every English line the tool prints has a Hindi and a Gujarati entry in TR (the language pass fills it).
   Edit, never rewrite. Built by `node cli.mjs scaffold`; concepts are verbatim (check compares them). */

const TOOL_ID = "code_wheel";
const MEDIA_ID = "M2.S3.T5.C19.2D1";
const TOOL_NAME = "Code Wheel";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
/* kept for the tool object's shape (and the sidecar); nothing speaks from r30 */
const VOICE = {"rate":0.92,"pitch":1.06};

/* printed on the bubble before phase 1's teach lines only (not shown when phase 1 has steps) */
const OPENING = ["Two rings of letters, one inside the other. Turn the inner ring to set a key."];
/* the whole-tool line (not shown from r44) */
const FINISH_LINE = "Words written in code and read back out, and every key named.";
/* printed when the child opens Free play; every control it names is drawn in the free branch of Work */
const FREE_LINE = "Free play. Turn the ring to any key, then tap Next word for a new word.";

/* THE START PAGE */
const START_HOOK = "What happens when one ring turns inside the other?";
function StartArt({ box, C, lang, tx }: any) {
  const cx = 300, cy = 170, ink = mix(C.ink, C.paper, 0.2);
  const ring = (i: number, r: number) => { const a = ((i / 26) * 360 - 90) * Math.PI / 180; return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) }; };
  const code = [["C", "D"], ["A", "B"], ["T", "U"]];
  return (
    <g>
      <circle cx={cx} cy={cy} r={160} fill={tint(C.panel, 0.3)} stroke={C.rule} strokeWidth={2} />
      <Skin name="wheel" x={cx - 160} y={cy - 160} w={320} h={320} />
      <circle cx={cx} cy={cy} r={112} fill={tint(C.panel, 0.55)} stroke={C.ink} strokeWidth={3} />
      <Skin name="wheel" x={cx - 112} y={cy - 112} w={224} h={224} />
      <circle cx={cx} cy={cy} r={112} fill="none" stroke={C.ink} strokeWidth={3} />
      <circle cx={cx} cy={cy} r={62} fill={C.paper} stroke={C.rule} strokeWidth={2} />
      {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((ch, i) => {
        const p = ring(i, 136);
        return <text key={"a" + ch} x={p.x} y={p.y + 10} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={ink}>{ch}</text>;
      })}
      <path d={"M " + ring(-0.2, 98).x.toFixed(1) + " " + ring(-0.2, 98).y.toFixed(1) + " A 98 98 0 0 1 " + ring(0.9, 98).x.toFixed(1) + " " + ring(0.9, 98).y.toFixed(1)}
        fill="none" stroke={CONTENT.pointer} strokeWidth={7} strokeLinecap="round" />
      <path d="M 0 0 L -18 -10 L -18 10 Z" fill={CONTENT.pointer}
        transform={"translate(" + ring(1.1, 98).x.toFixed(1) + "," + ring(1.1, 98).y.toFixed(1) + ") rotate(" + (((1.1 / 26) * 360)).toFixed(1) + ")"} />
      <line x1={ring(-0.5, 62).x} y1={ring(-0.5, 62).y} x2={ring(-0.5, 160).x} y2={ring(-0.5, 160).y} stroke={CONTENT.bead} strokeWidth={6} strokeLinecap="round" />
      {code.map((c, k) => (
        <g key={"s" + k}>
          <rect x={700 + k * 130} y={70} width={110} height={90} rx={RAD.panel} fill={tint(C.panel, 0.62)} stroke={C.rule} strokeWidth={2} />
          <text x={755 + k * 130} y={134} textAnchor="middle" fontSize={T.display} fontWeight={700} fill={shade(CONTENT.hundred, 0.25)}>{c[0]}</text>
          <rect x={710 + k * 130} y={176} width={90} height={90} rx={12} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} />
          <text x={755 + k * 130} y={242} textAnchor="middle" fontSize={T.display} fontWeight={700} fill={shade(CONTENT.one, 0.25)}>{c[1]}</text>
        </g>
      ))}
    </g>
  );
}

/* Hindi and Gujarati (docs/PATTERNS.md §11): keyed by the English, byte for byte. The language pass fills it once the
   English is final; `check` (tr-coverage) lists every printed line still missing. Empty = the tool runs in English only. */
const TR: any = {
  hi: {
    "Code Wheel": "कोड चक्र",
    "What happens when one ring turns inside the other?": "जब एक छल्ला दूसरे के अंदर घूमता है, तो क्या होता है?",
    "Free play. Turn the ring to any key, then tap Next word for a new word.": "मुक्त खेल। छल्ले को किसी भी कुंजी पर घुमाओ, फिर नए शब्द के लिए 'नया शब्द' टैप करो।",
    "A key says what each letter stands for": "कुंजी बताती है कि हर अक्षर क्या दर्शाता है",
    "Tap Count to count round the band from A to C.": "A से C तक पट्टी पर गिनने के लिए 'गिनो' टैप करो।",
    "Tap the Count key.": "'गिनो' कुंजी टैप करो।",
    "Which letter does the band start at?": "पट्टी किस अक्षर से शुरू होती है?",
    "Count on from the nearest marked number.": "सबसे पास की लिखी संख्या से आगे गिनो।",
    "A key says what every letter stands for, such as A as one up to Z as twenty-six.": "कुंजी बताती है कि हर अक्षर क्या दर्शाता है, जैसे A को 1 से Z को 26 तक।",
    "You learned: a key gives every letter its own number.": "तुमने सीखा: कुंजी हर अक्षर को उसकी अपनी संख्या देती है।",
    "With A as 1 and Z as 26, write the word KITE in code.": "A को 1 और Z को 26 मानकर शब्द KITE को कोड में लिखो।",
    "KITE in code": "KITE का कोड",
    "A is one, not nothing, so start your counting there.": "A की संख्या एक है, शून्य नहीं, इसलिए वहीं से गिनना शुरू करो।",
    "Yes, each letter has just one number on the band.": "हाँ, पट्टी पर हर अक्षर की बस एक ही संख्या है।",
    "Using the same band, write the word SUN in code.": "उसी पट्टी से शब्द SUN को कोड में लिखो।",
    "SUN in code": "SUN का कोड",
    "S sits far round the ring, so keep counting past the middle.": "S चक्र पर काफ़ी आगे है, इसलिए बीच से आगे तक गिनते जाओ।",
    "Yes, the same letter always gets the same number.": "हाँ, एक ही अक्षर को हमेशा एक ही संख्या मिलती है।",
    "A key swaps A with Z, C with X, D with W and so on; how is FLY written?": "कुंजी A को Z से, C को X से, D को W से बदलती है; FLY कैसे लिखेंगे?",
    "FLY in code": "FLY का कोड",
    "A pairs with Z, so which letter pairs with F?": "A का जोड़ीदार Z है, तो F का जोड़ीदार कौन सा अक्षर है?",
    "Yes, a swap key gives every letter one partner.": "हाँ, अदला-बदली वाली कुंजी हर अक्षर को एक जोड़ीदार देती है।",
    "F is the sixth letter, so look for the sixth from the end.": "F छठा अक्षर है, इसलिए अंत से छठा अक्षर देखो।",
    "Z is first from the end, then Y, then X, and so on.": "अंत से पहला Z है, फिर Y, फिर X, और इसी तरह।",
    "U O B": "U O B",
    "V P C": "V P C",
    "T N A": "T N A",
    "U O Y": "U O Y",
    "K": "K",
    "I": "I",
    "T": "T",
    "E": "E",
    "S": "S",
    "U": "U",
    "N": "N",
    "Moving each letter along": "हर अक्षर को आगे बढ़ाना",
    "Tap On to turn the ring one place.": "छल्ले को एक स्थान घुमाने के लिए 'आगे' टैप करो।",
    "Tap the On key.": "'आगे' कुंजी टैप करो।",
    "Tap On once more and look at the letter under Z.": "'आगे' एक बार और टैप करो और Z के नीचे का अक्षर देखो।",
    "Tap the same key again.": "वही कुंजी फिर से टैप करो।",
    "Where does the ring take the last letter?": "छल्ला आख़िरी अक्षर को कहाँ ले जाता है?",
    "Count the turns before you read a letter.": "अक्षर पढ़ने से पहले घुमाव गिनो।",
    "Every letter moves the same places on, and Z comes round to A.": "हर अक्षर उतने ही स्थान आगे जाता है, और Z घूमकर A पर आता है।",
    "You learned: a key moves every letter on, and Z comes round to A.": "तुमने सीखा: कुंजी हर अक्षर को आगे ले जाती है, Z के बाद A आता है।",
    "A key moves every letter three places on, so A becomes D; write ZOO in code.": "कुंजी हर अक्षर को 3 स्थान आगे ले जाती है, A से D बनता है; ZOO का कोड लिखो।",
    "ZOO in code": "ZOO का कोड",
    "Z has nowhere left to go, so where does the ring take it?": "Z के आगे कोई जगह नहीं बची, तो छल्ला उसे कहाँ ले जाता है?",
    "Yes, the ring carried Z straight on round the circle.": "हाँ, छल्ला Z को घुमाकर आगे ले गया।",
    "What comes after Z on the ring?": "छल्ले पर Z के बाद क्या आता है?",
    "Turn the ring three places and read the letter under Z.": "छल्ले को 3 स्थान घुमाओ और Z के नीचे का अक्षर पढ़ो।",
    "Now the key moves every letter four places on; write the word PEN in code.": "अब कुंजी हर अक्षर को 4 स्थान आगे ले जाती है; शब्द PEN का कोड लिखो।",
    "PEN in code": "PEN का कोड",
    "Count the places you turn, not the letter you start on.": "जितने स्थान घुमाए उन्हें गिनो, जिस अक्षर से चले उसे नहीं।",
    "Yes, every letter moved the same four places.": "हाँ, हर अक्षर उतने ही 4 स्थान आगे गया।",
    "How many times must you tap On?": "'आगे' को कितनी बार टैप करना होगा?",
    "Tap On four times, then read under each letter.": "'आगे' 4 बार टैप करो, फिर हर अक्षर के नीचे पढ़ो।",
    "Back to three places on, write the word YES in this code.": "फिर 3 स्थान आगे, इस कोड में शब्द YES लिखो।",
    "YES in code": "YES का कोड",
    "Y is near the end, so follow it on past Z.": "Y अंत के पास है, उसे Z के आगे तक ले जाओ।",
    "Yes, Y went past Z and came round the ring.": "हाँ, Y, Z के आगे गया और छल्ले पर घूम आया।",
    "What sits next to Z on the ring?": "छल्ले पर Z के बगल में क्या है?",
    "Turn three places on and read under Y, E and S.": "3 स्थान आगे घुमाओ और Y, E, S के नीचे पढ़ो।",
    "Decoding means undoing the key": "कोड खोलने का मतलब है कुंजी को उलटना",
    "Tap Back to turn the ring one place back.": "छल्ले को एक स्थान पीछे घुमाने के लिए 'पीछे' टैप करो।",
    "Tap the Back key.": "'पीछे' कुंजी टैप करो।",
    "Tap Back again and see which way the letters go.": "'पीछे' फिर टैप करो और देखो अक्षर किधर जाते हैं।",
    "Did the key move the letters on or back?": "क्या कुंजी ने अक्षरों को आगे बढ़ाया था, या पीछे?",
    "Turn the ring the other way and count the turns again.": "छल्ले को उलटी ओर घुमाओ और घुमाव फिर गिनो।",
    "Decoding moves each letter back as far as the key moved it on.": "कोड खोलने पर हर अक्षर उतना ही पीछे जाता है जितना कुंजी ने आगे बढ़ाया।",
    "You learned: to decode, move every letter back by the key.": "तुमने सीखा: कोड खोलने के लिए अक्षर को कुंजी जितना पीछे ले जाओ।",
    "A key moved every letter three places on, so what word does F D N H hide?": "कुंजी ने हर अक्षर को 3 स्थान आगे किया, तो F D N H में कौन सा शब्द छिपा है?",
    "The word?": "शब्द?",
    "The key pushed the letters on, so pull them back.": "कुंजी ने अक्षरों को आगे धकेला था, अब उन्हें पीछे खींचो।",
    "Yes, undoing the key took each letter home.": "हाँ, कुंजी उलटने से हर अक्षर घर लौट आया।",
    "Which way must the ring turn to undo three places on?": "3 स्थान आगे को उलटने के लिए छल्ला किधर घूमे?",
    "Turn the ring back three places and read under each code letter.": "छल्ले को 3 स्थान पीछे घुमाओ और हर कोड अक्षर के नीचे पढ़ो।",
    "This key moved letters four places on; which word was hidden in F S S O?": "इस कुंजी ने अक्षरों को 4 स्थान आगे किया; F S S O में कौन सा शब्द छिपा था?",
    "Which word?": "कौन सा शब्द?",
    "Turn the ring back four places before you read.": "पढ़ने से पहले छल्ले को 4 स्थान पीछे घुमाओ।",
    "Yes, going back four places found the word.": "हाँ, 4 स्थान पीछे जाने से शब्द मिल गया।",
    "Which way did this key take the letters?": "इस कुंजी ने अक्षरों को किधर ले जाया था?",
    "Tap Back four times, then read under F, S, S and O.": "'पीछे' 4 बार टैप करो, फिर F, S, S, O के नीचे पढ़ो।",
    "The key here moved letters five places on, so find the word in D F P.": "यहाँ कुंजी ने अक्षरों को 5 स्थान आगे किया, तो D F P का शब्द ढूँढो।",
    "What was it?": "वह क्या था?",
    "Going back past A does not stop, it carries on from Z.": "A के पार पीछे जाने पर रुकना नहीं है, गिनती Z से आगे चलती है।",
    "Yes, going back past A came round from Z.": "हाँ, A के पार पीछे जाने पर गिनती Z से आई।",
    "What sits before A on the ring?": "छल्ले पर A से पहले क्या है?",
    "Turn back five places and read under D, F and P.": "5 स्थान पीछे घुमाओ और D, F, P के नीचे पढ़ो।",
    "Without the key the code stays locked": "कुंजी के बिना कोड बंद रहता है",
    "Tap Back to set a key of one place back.": "एक स्थान पीछे की कुंजी लगाने के लिए 'पीछे' टैप करो।",
    "Tap Try this key to write what that key reads.": "वह कुंजी क्या पढ़ती है, यह लिखने के लिए 'यह कुंजी आज़माओ' टैप करो।",
    "Tap Try this key, under the letters.": "अक्षरों के नीचे 'यह कुंजी आज़माओ' टैप करो।",
    "Which keys have you tried so far?": "अब तक तुमने कौन सी कुंजियाँ आज़माई हैं?",
    "Write out what each key gives, then look again.": "हर कुंजी जो देती है उसे लिखो, फिर दोबारा देखो।",
    "Without the key one code reads two ways, so a friend must be told the key.": "कुंजी के बिना एक कोड दो तरह से पढ़ा जाता है, इसलिए दोस्त को कुंजी बतानी होगी।",
    "You learned: without the key a code can be read more than one way.": "तुमने सीखा: कुंजी के बिना कोड कई तरह से पढ़ा जा सकता है।",
    "Try A as 1, then A as 26: are you sure what 4 15 7 says?": "A को पहले 1, फिर 26 मानो: क्या तुम पक्का बता सकते हो कि 4 15 7 में क्या है?",
    "Sure?": "पक्का?",
    "Do the two rows read the same word?": "क्या दोनों पंक्तियाँ एक ही शब्द पढ़ती हैं?",
    "Yes, with no key the code reads two ways.": "हाँ, कुंजी के बिना कोड दो तरह से पढ़ा जाता है।",
    "Could another key read it too?": "क्या कोई दूसरी कुंजी भी इसे पढ़ सकती है?",
    "Look at both rows: does anything pick one of them?": "दोनों पंक्तियाँ देखो: क्या कुछ उनमें से एक को चुनता है?",
    "Try one key, then another: are you sure which word K D W meant?": "एक कुंजी आज़माओ, फिर दूसरी: क्या तुम पक्का बता सकते हो कि K D W का शब्द क्या था?",
    "Another key may give another word, so does the code itself choose?": "दूसरी कुंजी दूसरा शब्द दे सकती है, तो क्या कोड खुद चुनता है?",
    "Yes, only the key tells you which word was meant.": "हाँ, कौन सा शब्द था यह सिर्फ़ कुंजी बताती है।",
    "Could another key give a word too?": "क्या कोई दूसरी कुंजी भी शब्द दे सकती है?",
    "Look at both rows: which one did the sender mean?": "दोनों पंक्तियाँ देखो: भेजने वाले का मतलब कौन सा था?",
    "Set the key six places on and write ANT in code.": "कुंजी 6 स्थान आगे लगाओ और ANT को कोड में लिखो।",
    "ANT in code": "ANT का कोड",
    "Count the six places you turn, not the letter you start on.": "जो 6 स्थान घुमाओ उन्हें गिनो, जिस अक्षर से चले उसे नहीं।",
    "Yes, and your friend needs the key, six places on, to read it.": "हाँ, और इसे पढ़ने के लिए दोस्त को कुंजी, 6 स्थान आगे, चाहिए।",
    "How many times must you tap On to make six places?": "6 स्थान बनाने के लिए 'आगे' कितनी बार टैप करना होगा?",
    "Tap On six times, then read under A, N and T.": "'आगे' 6 बार टैप करो, फिर A, N, T के नीचे पढ़ो।",
    "Sure": "पक्का",
    "Cannot be sure": "पक्का नहीं है",
    "Back": "पीछे",
    "On": "आगे",
    "Count": "गिनो",
    "Try this key": "यह कुंजी आज़माओ",
    "Flip band": "पट्टी पलटो",
    "Next word": "नया शब्द",
    "no turn yet": "घुमाया नहीं",
    "on": "आगे",
    "back": "पीछे",
    "Fill every box first.": "पहले हर खाना भरो।",
    "Three tries are enough.": "तीन कोशिशें काफ़ी हैं।",
    "A is 1": "A = 1",
    "A is 26": "A = 26",
    "key?": "कुंजी?",
    "the band counts round from A to each letter of the word, lighting it, and the whole code is written out under the word": "पट्टी A से शब्द के हर अक्षर तक गिनती है, उसे जगाती है, और पूरा कोड शब्द के नीचे लिख दिया जाता है",
    "the ring turns to the key one place at a time and each letter is carried round to its partner, on past Z": "छल्ला एक-एक स्थान घूमकर कुंजी तक पहुँचता है और हर अक्षर Z के आगे घूमकर अपने जोड़ीदार तक जाता है",
    "the child's word is coded again through the key (it does not come back to the code), then the ring turns back by the key and each coded letter is carried home, round from Z when it passes A": "बच्चे का शब्द कुंजी से फिर कोड होता है (वह कोड पर वापस नहीं आता), फिर छल्ला कुंजी जितना पीछे घूमता है और हर कोड अक्षर घर लौटता है, A के पार जाने पर Z से घूमकर",
    "each key is tried in a row of its own and the words stand side by side, none of them marked; the typed question redraws the ring turned to the key": "हर कुंजी अपनी पंक्ति में आज़माई जाती है और शब्द साथ-साथ खड़े रहते हैं, कोई चिह्नित नहीं; लिखकर उत्तर वाला प्रश्न छल्ले को कुंजी पर घुमाकर फिर बनाता है",
  },
  gu: {
    "Code Wheel": "સંકેત ચક્ર",
    "What happens when one ring turns inside the other?": "જ્યારે એક રિંગ બીજાની અંદર ફરે, ત્યારે શું થાય છે?",
    "Free play. Turn the ring to any key, then tap Next word for a new word.": "મુક્ત રમત. રિંગને કોઈ પણ ચાવી પર ફેરવો, પછી નવા શબ્દ માટે 'નવો શબ્દ' ટૅપ કરો.",
    "A key says what each letter stands for": "ચાવી કહે છે કે દરેક અક્ષર શું દર્શાવે છે",
    "Tap Count to count round the band from A to C.": "A થી C સુધી પટ્ટી પર ગણવા માટે 'ગણો' ટૅપ કરો.",
    "Tap the Count key.": "'ગણો' ચાવી ટૅપ કરો.",
    "Which letter does the band start at?": "પટ્ટી કયા અક્ષરથી શરૂ થાય છે?",
    "Count on from the nearest marked number.": "સૌથી નજીકની લખેલી સંખ્યાથી આગળ ગણો.",
    "A key says what every letter stands for, such as A as one up to Z as twenty-six.": "ચાવી કહે છે કે દરેક અક્ષર શું દર્શાવે છે, જેમ કે A ને 1 થી Z ને 26 સુધી.",
    "You learned: a key gives every letter its own number.": "તમે શીખ્યા: ચાવી દરેક અક્ષરને તેની પોતાની સંખ્યા આપે છે.",
    "With A as 1 and Z as 26, write the word KITE in code.": "A ને 1 અને Z ને 26 માનીને શબ્દ KITE ને સંકેતમાં લખો.",
    "KITE in code": "KITE નો સંકેત",
    "A is one, not nothing, so start your counting there.": "A ની સંખ્યા એક છે, શૂન્ય નથી, તેથી ત્યાંથી ગણવાનું શરૂ કરો.",
    "Yes, each letter has just one number on the band.": "હા, પટ્ટી પર દરેક અક્ષરની બસ એક જ સંખ્યા છે.",
    "Using the same band, write the word SUN in code.": "એ જ પટ્ટીથી શબ્દ SUN ને સંકેતમાં લખો.",
    "SUN in code": "SUN નો સંકેત",
    "S sits far round the ring, so keep counting past the middle.": "S ચક્ર પર ઘણો આગળ છે, તેથી વચ્ચેથી આગળ સુધી ગણતા જાઓ.",
    "Yes, the same letter always gets the same number.": "હા, એક જ અક્ષરને હંમેશાં એક જ સંખ્યા મળે છે.",
    "A key swaps A with Z, C with X, D with W and so on; how is FLY written?": "ચાવી A ને Z થી, C ને X થી, D ને W થી બદલે છે; FLY કેવી રીતે લખાશે?",
    "FLY in code": "FLY નો સંકેત",
    "A pairs with Z, so which letter pairs with F?": "A નો જોડીદાર Z છે, તો F નો જોડીદાર કયો અક્ષર છે?",
    "Yes, a swap key gives every letter one partner.": "હા, અદલાબદલીની ચાવી દરેક અક્ષરને એક જોડીદાર આપે છે.",
    "F is the sixth letter, so look for the sixth from the end.": "F છઠ્ઠો અક્ષર છે, તેથી અંતથી છઠ્ઠો અક્ષર જુઓ.",
    "Z is first from the end, then Y, then X, and so on.": "અંતથી પહેલો Z છે, પછી Y, પછી X, અને એમ આગળ.",
    "U O B": "U O B",
    "V P C": "V P C",
    "T N A": "T N A",
    "U O Y": "U O Y",
    "K": "K",
    "I": "I",
    "T": "T",
    "E": "E",
    "S": "S",
    "U": "U",
    "N": "N",
    "Moving each letter along": "દરેક અક્ષરને આગળ ખસેડવો",
    "Tap On to turn the ring one place.": "રિંગને એક સ્થાન ફેરવવા 'આગળ' ટૅપ કરો.",
    "Tap the On key.": "'આગળ' ચાવી ટૅપ કરો.",
    "Tap On once more and look at the letter under Z.": "'આગળ' ફરી એકવાર ટૅપ કરો અને Z નીચેનો અક્ષર જુઓ.",
    "Tap the same key again.": "એ જ ચાવી ફરી ટૅપ કરો.",
    "Where does the ring take the last letter?": "રિંગ છેલ્લા અક્ષરને ક્યાં લઈ જાય છે?",
    "Count the turns before you read a letter.": "અક્ષર વાંચતાં પહેલાં ફેરા ગણો.",
    "Every letter moves the same places on, and Z comes round to A.": "દરેક અક્ષર એટલા જ સ્થાન આગળ જાય છે, અને Z ફરીને A પર આવે છે.",
    "You learned: a key moves every letter on, and Z comes round to A.": "તમે શીખ્યા: ચાવી દરેક અક્ષરને આગળ લઈ જાય છે, Z પછી A આવે છે.",
    "A key moves every letter three places on, so A becomes D; write ZOO in code.": "ચાવી દરેક અક્ષરને 3 સ્થાન આગળ લઈ જાય છે, A નો D બને છે; ZOO નો સંકેત લખો.",
    "ZOO in code": "ZOO નો સંકેત",
    "Z has nowhere left to go, so where does the ring take it?": "Z ની આગળ કોઈ જગ્યા બચી નથી, તો રિંગ તેને ક્યાં લઈ જાય છે?",
    "Yes, the ring carried Z straight on round the circle.": "હા, રિંગ Z ને ફેરવીને આગળ લઈ ગઈ.",
    "What comes after Z on the ring?": "રિંગ પર Z પછી શું આવે છે?",
    "Turn the ring three places and read the letter under Z.": "રિંગને 3 સ્થાન ફેરવો અને Z નીચેનો અક્ષર વાંચો.",
    "Now the key moves every letter four places on; write the word PEN in code.": "હવે ચાવી દરેક અક્ષરને 4 સ્થાન આગળ લઈ જાય છે; શબ્દ PEN નો સંકેત લખો.",
    "PEN in code": "PEN નો સંકેત",
    "Count the places you turn, not the letter you start on.": "જેટલા સ્થાન ફેરવ્યા તે ગણો, જે અક્ષરથી શરૂ કર્યું તે નહીં.",
    "Yes, every letter moved the same four places.": "હા, દરેક અક્ષર એટલા જ 4 સ્થાન આગળ ગયો.",
    "How many times must you tap On?": "'આગળ' ને કેટલી વાર ટૅપ કરવું પડશે?",
    "Tap On four times, then read under each letter.": "'આગળ' 4 વાર ટૅપ કરો, પછી દરેક અક્ષર નીચે વાંચો.",
    "Back to three places on, write the word YES in this code.": "ફરી 3 સ્થાન આગળ, આ સંકેતમાં શબ્દ YES લખો.",
    "YES in code": "YES નો સંકેત",
    "Y is near the end, so follow it on past Z.": "Y અંતની નજીક છે, તેને Z ની આગળ સુધી લઈ જાઓ.",
    "Yes, Y went past Z and came round the ring.": "હા, Y Z ની આગળ ગયો અને રિંગ પર ફરી આવ્યો.",
    "What sits next to Z on the ring?": "રિંગ પર Z ની બાજુમાં શું છે?",
    "Turn three places on and read under Y, E and S.": "3 સ્થાન આગળ ફેરવો અને Y, E, S નીચે વાંચો.",
    "Decoding means undoing the key": "સંકેત ખોલવાનો અર્થ ચાવીને ઉલટાવવી",
    "Tap Back to turn the ring one place back.": "રિંગને એક સ્થાન પાછળ ફેરવવા 'પાછળ' ટૅપ કરો.",
    "Tap the Back key.": "'પાછળ' ચાવી ટૅપ કરો.",
    "Tap Back again and see which way the letters go.": "'પાછળ' ફરી ટૅપ કરો અને જુઓ અક્ષર કઈ તરફ જાય છે.",
    "Did the key move the letters on or back?": "શું ચાવીએ અક્ષરોને આગળ ખસેડ્યા હતા, કે પાછળ?",
    "Turn the ring the other way and count the turns again.": "રિંગને ઉલટી તરફ ફેરવો અને ફેરા ફરી ગણો.",
    "Decoding moves each letter back as far as the key moved it on.": "સંકેત ખોલતાં દરેક અક્ષર એટલો જ પાછળ જાય છે જેટલો ચાવીએ આગળ ખસેડ્યો.",
    "You learned: to decode, move every letter back by the key.": "તમે શીખ્યા: સંકેત ખોલવા અક્ષરને ચાવી જેટલો પાછળ લઈ જાઓ.",
    "A key moved every letter three places on, so what word does F D N H hide?": "ચાવીએ દરેક અક્ષરને 3 સ્થાન આગળ કર્યો, તો F D N H માં કયો શબ્દ છુપાયેલો છે?",
    "The word?": "શબ્દ?",
    "The key pushed the letters on, so pull them back.": "ચાવીએ અક્ષરોને આગળ ધકેલ્યા હતા, હવે તેમને પાછા ખેંચો.",
    "Yes, undoing the key took each letter home.": "હા, ચાવી ઉલટાવતાં દરેક અક્ષર ઘરે પાછો આવ્યો.",
    "Which way must the ring turn to undo three places on?": "3 સ્થાન આગળને ઉલટાવવા રિંગ કઈ તરફ ફરે?",
    "Turn the ring back three places and read under each code letter.": "રિંગને 3 સ્થાન પાછળ ફેરવો અને દરેક સંકેત અક્ષર નીચે વાંચો.",
    "This key moved letters four places on; which word was hidden in F S S O?": "આ ચાવીએ અક્ષરોને 4 સ્થાન આગળ કર્યા; F S S O માં કયો શબ્દ છુપાયેલો હતો?",
    "Which word?": "કયો શબ્દ?",
    "Turn the ring back four places before you read.": "વાંચતાં પહેલાં રિંગને 4 સ્થાન પાછળ ફેરવો.",
    "Yes, going back four places found the word.": "હા, 4 સ્થાન પાછળ જતાં શબ્દ મળી ગયો.",
    "Which way did this key take the letters?": "આ ચાવી અક્ષરોને કઈ તરફ લઈ ગઈ હતી?",
    "Tap Back four times, then read under F, S, S and O.": "'પાછળ' 4 વાર ટૅપ કરો, પછી F, S, S, O નીચે વાંચો.",
    "The key here moved letters five places on, so find the word in D F P.": "અહીં ચાવીએ અક્ષરોને 5 સ્થાન આગળ કર્યા, તો D F P નો શબ્દ શોધો.",
    "What was it?": "તે શું હતું?",
    "Going back past A does not stop, it carries on from Z.": "A ની પાર પાછળ જતાં અટકવાનું નથી, ગણતરી Z થી આગળ ચાલે છે.",
    "Yes, going back past A came round from Z.": "હા, A ની પાર પાછળ જતાં ગણતરી Z થી આવી.",
    "What sits before A on the ring?": "રિંગ પર A પહેલાં શું છે?",
    "Turn back five places and read under D, F and P.": "5 સ્થાન પાછળ ફેરવો અને D, F, P નીચે વાંચો.",
    "Without the key the code stays locked": "ચાવી વગર સંકેત બંધ રહે છે",
    "Tap Back to set a key of one place back.": "એક સ્થાન પાછળની ચાવી ગોઠવવા 'પાછળ' ટૅપ કરો.",
    "Tap Try this key to write what that key reads.": "તે ચાવી શું વાંચે છે તે લખવા 'આ ચાવી અજમાવો' ટૅપ કરો.",
    "Tap Try this key, under the letters.": "અક્ષરોની નીચે 'આ ચાવી અજમાવો' ટૅપ કરો.",
    "Which keys have you tried so far?": "અત્યાર સુધી તમે કઈ ચાવીઓ અજમાવી છે?",
    "Write out what each key gives, then look again.": "દરેક ચાવી જે આપે તે લખો, પછી ફરી જુઓ.",
    "Without the key one code reads two ways, so a friend must be told the key.": "ચાવી વગર એક સંકેત બે રીતે વંચાય છે, તેથી મિત્રને ચાવી જણાવવી પડશે.",
    "You learned: without the key a code can be read more than one way.": "તમે શીખ્યા: ચાવી વગર સંકેત ઘણી રીતે વંચાય છે.",
    "Try A as 1, then A as 26: are you sure what 4 15 7 says?": "A ને પહેલાં 1, પછી 26 માનો: શું તમે પાકું કહી શકો કે 4 15 7 માં શું છે?",
    "Sure?": "પાકું?",
    "Do the two rows read the same word?": "શું બંને હાર એક જ શબ્દ વાંચે છે?",
    "Yes, with no key the code reads two ways.": "હા, ચાવી વગર સંકેત બે રીતે વંચાય છે.",
    "Could another key read it too?": "શું બીજી ચાવી પણ તેને વાંચી શકે?",
    "Look at both rows: does anything pick one of them?": "બંને હાર જુઓ: શું કંઈ તેમાંથી એકને પસંદ કરે છે?",
    "Try one key, then another: are you sure which word K D W meant?": "એક ચાવી અજમાવો, પછી બીજી: શું તમે પાકું કહી શકો કે K D W નો શબ્દ કયો હતો?",
    "Another key may give another word, so does the code itself choose?": "બીજી ચાવી બીજો શબ્દ આપી શકે, તો શું સંકેત પોતે પસંદ કરે છે?",
    "Yes, only the key tells you which word was meant.": "હા, કયો શબ્દ હતો તે ફક્ત ચાવી જણાવે છે.",
    "Could another key give a word too?": "શું બીજી ચાવી પણ શબ્દ આપી શકે?",
    "Look at both rows: which one did the sender mean?": "બંને હાર જુઓ: મોકલનારનો અર્થ કયો હતો?",
    "Set the key six places on and write ANT in code.": "ચાવી 6 સ્થાન આગળ ગોઠવો અને ANT ને સંકેતમાં લખો.",
    "ANT in code": "ANT નો સંકેત",
    "Count the six places you turn, not the letter you start on.": "જે 6 સ્થાન ફેરવો તે ગણો, જે અક્ષરથી શરૂ કર્યું તે નહીં.",
    "Yes, and your friend needs the key, six places on, to read it.": "હા, અને તેને વાંચવા મિત્રને ચાવી, 6 સ્થાન આગળ, જોઈએ.",
    "How many times must you tap On to make six places?": "6 સ્થાન બનાવવા 'આગળ' કેટલી વાર ટૅપ કરવું પડશે?",
    "Tap On six times, then read under A, N and T.": "'આગળ' 6 વાર ટૅપ કરો, પછી A, N, T નીચે વાંચો.",
    "Sure": "પાકું",
    "Cannot be sure": "પાકી ખાતરી નથી",
    "Back": "પાછળ",
    "On": "આગળ",
    "Count": "ગણો",
    "Try this key": "આ ચાવી અજમાવો",
    "Flip band": "પટ્ટી પલટો",
    "Next word": "નવો શબ્દ",
    "no turn yet": "ફેરવ્યું નથી",
    "on": "આગળ",
    "back": "પાછળ",
    "Fill every box first.": "પહેલાં દરેક ખાનું ભરો.",
    "Three tries are enough.": "ત્રણ પ્રયાસ પૂરતા છે.",
    "A is 1": "A = 1",
    "A is 26": "A = 26",
    "key?": "ચાવી?",
    "the band counts round from A to each letter of the word, lighting it, and the whole code is written out under the word": "પટ્ટી A થી શબ્દના દરેક અક્ષર સુધી ગણે છે, તેને ચમકાવે છે, અને આખો સંકેત શબ્દની નીચે લખાય છે",
    "the ring turns to the key one place at a time and each letter is carried round to its partner, on past Z": "રિંગ એક એક સ્થાન ફરીને ચાવી સુધી પહોંચે છે અને દરેક અક્ષર Z ની આગળ ફરીને પોતાના જોડીદાર સુધી જાય છે",
    "the child's word is coded again through the key (it does not come back to the code), then the ring turns back by the key and each coded letter is carried home, round from Z when it passes A": "બાળકનો શબ્દ ચાવીથી ફરી સંકેતમાં લખાય છે (તે સંકેત પર પાછો આવતો નથી), પછી રિંગ ચાવી જેટલી પાછળ ફરે છે અને દરેક સંકેત અક્ષર ઘરે પાછો આવે છે, A ની પાર જતાં Z થી ફરીને",
    "each key is tried in a row of its own and the words stand side by side, none of them marked; the typed question redraws the ring turned to the key": "દરેક ચાવી પોતાની હારમાં અજમાવાય છે અને શબ્દો સાથે સાથે ઊભા રહે છે, કોઈ ચિહ્નિત નથી; લખીને જવાબ આપવાનો પ્રશ્ન રિંગને ચાવી પર ફેરવીને ફરી દોરે છે",
  },
};

/* One entry per phase = one mount. Every guide step is ONE click of ONE control (data-control = `on`) and works a WARM-UP
   (CW_WARM below), never question 1. Every instruction, hint, miss and ladder rung is ONE sentence. */
const PHASES = [
  {
    n: 1,
    concept: "A key says what each letter stands for",
    conceptId: "M2.S3.T5.C20", objectiveIds: ["O7"],
    says: ["Find each letter on the ring, then read its number off the band."],
    steps: [{ say: "Tap Count to count round the band from A to C.", on: "count", hint: "Tap the Count key." }],
    ladder: ["Which letter does the band start at?", "Count on from the nearest marked number."],
    closing: "A key says what every letter stands for, such as A as one up to Z as twenty-six.",
    learned: "You learned: a key gives every letter its own number.",
    traceback: "the band counts round from A to each letter of the word, lighting it, and the whole code is written out under the word",
    items: [
      /* learn ML1: answer in the plan = 11 9 20 5 */
      { qid: "M2.S3.T5.C20:ML1", kind: "num", word: "KITE", parts: [{ label: "K" }, { label: "I" }, { label: "T" }, { label: "E" }], answer: [11, 9, 20, 5], winMs: 2800,
        say: "With A as 1 and Z as 26, write the word KITE in code.", ask: "KITE in code",
        miss: "A is one, not nothing, so start your counting there.", win: "Yes, each letter has just one number on the band." },
      /* practice 1: answer in the plan = 19 21 14 */
      { qid: "M2.S3.T5.C20:1", kind: "num", word: "SUN", parts: [{ label: "S" }, { label: "U" }, { label: "N" }], answer: [19, 21, 14], winMs: 2800,
        say: "Using the same band, write the word SUN in code.", ask: "SUN in code",
        miss: "S sits far round the ring, so keep counting past the middle.", win: "Yes, the same letter always gets the same number." },
      /* practice 2: answer in the plan = U O B */
      { qid: "M2.S3.T5.C20:2", kind: "swap", word: "FLY", answer: "uob", winMs: 2800,
        choices: [{ id: "uob", label: "U O B" }, { id: "vpc", label: "V P C" }, { id: "tna", label: "T N A" }, { id: "uoy", label: "U O Y" }],
        say: "A key swaps A with Z, C with X, D with W and so on; how is FLY written?", ask: "FLY in code",
        miss: "A pairs with Z, so which letter pairs with F?", win: "Yes, a swap key gives every letter one partner.",
        ladder: ["F is the sixth letter, so look for the sixth from the end.", "Z is first from the end, then Y, then X, and so on."] },
    ],
  },
  {
    n: 2,
    concept: "Moving each letter along",
    conceptId: "M2.S3.T5.C21", objectiveIds: ["O7"],
    says: ["Move each letter the same number of places, and see what comes after the last letter."],
    steps: [
      { say: "Tap On to turn the ring one place.", on: "turn", hint: "Tap the On key." },
      { say: "Tap On once more and look at the letter under Z.", on: "turn", hint: "Tap the same key again." },
    ],
    ladder: ["Where does the ring take the last letter?", "Count the turns before you read a letter."],
    closing: "Every letter moves the same places on, and Z comes round to A.",
    learned: "You learned: a key moves every letter on, and Z comes round to A.",
    traceback: "the ring turns to the key one place at a time and each letter is carried round to its partner, on past Z",
    items: [
      /* learn ML2: answer in the plan = C R R */
      { qid: "M2.S3.T5.C21:ML2", kind: "code", word: "ZOO", shift: 3, pad: "enter", answer: "CRR", winMs: 2800,
        say: "A key moves every letter three places on, so A becomes D; write ZOO in code.", ask: "ZOO in code",
        miss: "Z has nowhere left to go, so where does the ring take it?", win: "Yes, the ring carried Z straight on round the circle.",
        ladder: ["What comes after Z on the ring?", "Turn the ring three places and read the letter under Z."] },
      /* practice 3: answer in the plan = T I R */
      { qid: "M2.S3.T5.C21:3", kind: "code", word: "PEN", shift: 4, pad: "enter", answer: "TIR", winMs: 2800,
        say: "Now the key moves every letter four places on; write the word PEN in code.", ask: "PEN in code",
        miss: "Count the places you turn, not the letter you start on.", win: "Yes, every letter moved the same four places.",
        ladder: ["How many times must you tap On?", "Tap On four times, then read under each letter."] },
      /* practice 4: answer in the plan = B H V, because Y goes round past Z to B */
      { qid: "M2.S3.T5.C21:4", kind: "code", word: "YES", shift: 3, pad: "enter", answer: "BHV", winMs: 2800,
        say: "Back to three places on, write the word YES in this code.", ask: "YES in code",
        miss: "Y is near the end, so follow it on past Z.", win: "Yes, Y went past Z and came round the ring.",
        ladder: ["What sits next to Z on the ring?", "Turn three places on and read under Y, E and S."] },
    ],
  },
  {
    n: 3,
    concept: "Decoding means undoing the key",
    conceptId: "M2.S3.T5.C22", objectiveIds: ["O8"],
    says: ["The key moved each letter on, so ask which way you go to undo it."],
    steps: [
      { say: "Tap Back to turn the ring one place back.", on: "back", hint: "Tap the Back key." },
      { say: "Tap Back again and see which way the letters go.", on: "back", hint: "Tap the same key again." },
    ],
    ladder: ["Did the key move the letters on or back?", "Turn the ring the other way and count the turns again."],
    closing: "Decoding moves each letter back as far as the key moved it on.",
    learned: "You learned: to decode, move every letter back by the key.",
    traceback: "the child's word is coded again through the key (it does not come back to the code), then the ring turns back by the key and each coded letter is carried home, round from Z when it passes A",
    items: [
      /* learn ML3: answer in the plan = CAKE */
      { qid: "M2.S3.T5.C22:ML3", kind: "decode", code: "FDNH", shift: 3, pad: "enter", answer: "CAKE", winMs: 2800,
        say: "A key moved every letter three places on, so what word does F D N H hide?", ask: "The word?",
        miss: "The key pushed the letters on, so pull them back.", win: "Yes, undoing the key took each letter home.",
        ladder: ["Which way must the ring turn to undo three places on?", "Turn the ring back three places and read under each code letter."] },
      /* practice 5: answer in the plan = BOOK */
      { qid: "M2.S3.T5.C22:5", kind: "decode", code: "FSSO", shift: 4, pad: "enter", answer: "BOOK", winMs: 2800,
        say: "This key moved letters four places on; which word was hidden in F S S O?", ask: "Which word?",
        miss: "Turn the ring back four places before you read.", win: "Yes, going back four places found the word.",
        ladder: ["Which way did this key take the letters?", "Tap Back four times, then read under F, S, S and O."] },
      /* practice 6: answer in the plan = YAK, because D goes back five places, past A and round from Z, to Y */
      { qid: "M2.S3.T5.C22:6", kind: "decode", code: "DFP", shift: 5, pad: "enter", answer: "YAK", winMs: 2800,
        say: "The key here moved letters five places on, so find the word in D F P.", ask: "What was it?",
        miss: "Going back past A does not stop, it carries on from Z.", win: "Yes, going back past A came round from Z.",
        ladder: ["What sits before A on the ring?", "Turn back five places and read under D, F and P."] },
    ],
  },
  {
    n: 4,
    concept: "Without the key the code stays locked",
    conceptId: "M2.S3.T5.C23", objectiveIds: ["O8"],
    says: ["Try a key, then another, and ask which one the sender used."],
    steps: [
      { say: "Tap Back to set a key of one place back.", on: "back", hint: "Tap the Back key." },
      { say: "Tap Try this key to write what that key reads.", on: "try", hint: "Tap Try this key, under the letters." },
    ],
    ladder: ["Which keys have you tried so far?", "Write out what each key gives, then look again."],
    closing: "Without the key one code reads two ways, so a friend must be told the key.",
    learned: "You learned: without the key a code can be read more than one way.",
    traceback: "each key is tried in a row of its own and the words stand side by side, none of them marked; the typed question redraws the ring turned to the key",
    items: [
      /* learn ML4: answer in the plan = With A as 1 it reads DOG, and with A as 26 it reads W L T. Without the key you cannot be sure which was meant */
      { qid: "M2.S3.T5.C23:ML4", kind: "lock", nums: [4, 15, 7], answer: "unsure", winMs: 2800,
        choices: [{ id: "sure", label: "Sure" }, { id: "unsure", label: "Cannot be sure" }],
        say: "Try A as 1, then A as 26: are you sure what 4 15 7 says?", ask: "Sure?",
        miss: "Do the two rows read the same word?", win: "Yes, with no key the code reads two ways.",
        ladder: ["Could another key read it too?", "Look at both rows: does anything pick one of them?"] },
      /* practice 7: answer in the plan = Not for certain. 3 back reads HAT, 9 back reads BUN: two words, and only the key tells which was meant */
      { qid: "M2.S3.T5.C23:7", kind: "lock", code: "KDW", answer: "unsure", winMs: 2800,
        choices: [{ id: "sure", label: "Sure" }, { id: "unsure", label: "Cannot be sure" }],
        say: "Try one key, then another: are you sure which word K D W meant?", ask: "Sure?",
        miss: "Another key may give another word, so does the code itself choose?", win: "Yes, only the key tells you which word was meant.",
        ladder: ["Could another key give a word too?", "Look at both rows: which one did the sender mean?"] },
      /* practice 8: answer in the plan = G T Z; the friend must also be told the key, six places on, so they can move each letter six places back (the win line says it) */
      { qid: "M2.S3.T5.C23:8", kind: "code", word: "ANT", shift: 6, pad: "enter", answer: "GTZ", winMs: 2800,
        say: "Set the key six places on and write ANT in code.", ask: "ANT in code",
        miss: "Count the six places you turn, not the letter you start on.", win: "Yes, and your friend needs the key, six places on, to read it.",
        ladder: ["How many times must you tap On to make six places?", "Tap On six times, then read under A, N and T."] },
    ],
  },
];

/* ── the alphabet round a circle ─────────────────────────────────────────────────────────── */
const CW_ALPHA = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const cwPlace = (ch: any) => CW_ALPHA.indexOf(String(ch).toUpperCase()) + 1;      /* A = 1 */
const cwLetter = (p: number) => CW_ALPHA[(((p - 1) % 26) + 26) % 26];
const cwCarry = (ch: any, k: number) => cwLetter(cwPlace(ch) + k);
/* the places the band prints (A and every fifth letter) */
const CW_MARKS = [1, 5, 10, 15, 20, 25];
/* the warm-up each phase's guide steps work (never a question's own word) */
const CW_WARM: any[] = [
  { mode: "band", given: ["C", "A", "B"] },
  { mode: "kb", given: ["B", "A", "D"] },
  { mode: "kb", given: ["E", "G", "I"] },
  { mode: "ringlock", given: ["M", "J", "Q"], code: "MJQ" },
];
const CW_WORDS = ["CAT", "SUN", "KITE", "BOOK", "YES", "PLAY"];

/* The numbers, rows, sizes and targets the working area needs (they go into the sidecar too). */
const MODEL = {
  alphabet: CW_ALPHA,
  bandMarks: CW_MARKS,
  wheel: { cx: 236, cy: 258, rim: 232, out: 204, mid: 174, inn: 150, hub: 96 },
  region: { x: 500, wide: 700, narrow: 404 },
  keys: { turn: { w: 150, h: 72 }, letter: { w: 72, h: 72, gap: 8 } },
};
const CW = MODEL.wheel;
/* a point on the wheel: place index i (A = 0, at the top), radius r */
const cwPt = (i: number, r: number) => {
  const a = ((i / 26) * 360 - 90) * Math.PI / 180;
  return { x: CW.cx + r * Math.cos(a), y: CW.cy + r * Math.sin(a) };
};
/* an arc along the wheel from place i, k places on (k may be negative) */
const cwArc = (i: number, k: number, r: number) => {
  const a = cwPt(i, r), b = cwPt(i + k, r);
  return "M " + a.x.toFixed(1) + " " + a.y.toFixed(1) + " A " + r + " " + r + " 0 " + (Math.abs(k) > 13 ? 1 : 0) + " " + (k >= 0 ? 1 : 0) + " " + b.x.toFixed(1) + " " + b.y.toFixed(1);
};

/* what the strip is given, for an item, a warm-up or free play */
const cwBoard = (it: any, pn: number, warm: boolean, free: boolean, wi: number): any => {
  if (free) { const w = CW_WORDS[wi % CW_WORDS.length]; return { mode: "free", kind: "free", given: w.split(""), right: w.split("") }; }
  if (warm) { const z = CW_WARM[pn - 1] || CW_WARM[0]; return { mode: z.mode, kind: "warm", given: z.given, code: z.code, right: null }; }
  const k = it.kind, w = String(it.word || it.code || "").split("");
  if (k === "num") return { mode: "band", kind: k, given: w, right: w.map((c: string) => String(cwPlace(c))) };
  if (k === "swap") return { mode: "band", kind: k, given: w, right: w.map((c: string) => cwLetter(27 - cwPlace(c))) };
  if (k === "code") return { mode: "kb", kind: k, given: w, shift: it.shift, right: w.map((c: string) => cwCarry(c, it.shift)) };
  if (k === "decode") return { mode: "kb", kind: k, given: w, shift: it.shift, right: w.map((c: string) => cwCarry(c, -it.shift)) };
  if (k === "lock" && it.nums) return { mode: "bandlock", kind: k, nums: it.nums, given: it.nums.map(String), right: null };
  if (k === "lock") return { mode: "ringlock", kind: k, code: it.code, given: w, right: null };
  return { mode: "band", kind: k, given: w, right: null };
};
/* the reading of a locked message under the key now set */
const cwReading = (b: any, turn: number, flip: boolean) => {
  if (b.nums) return b.nums.map((x: number) => cwLetter(flip ? 27 - x : x));
  return String(b.code || "").split("").map((c: string) => cwCarry(c, turn));
};
const cwKeyWord = (turn: number) => (turn === 0 ? "no turn yet" : Math.abs(turn) + (turn > 0 ? " on" : " back"));
/* a key label as drawn in the language in use ("3 back" -> "3 पीछे"): short, so it never reaches the letters of its row; the label itself stays English in the state */
const cwKeyShow = (k: string, lang: string, tx: any) => {
  const m = /^(\d+) (on|back)$/.exec(String(k));
  return m ? m[1] + " " + tx(m[2]) : tx(k);
};
const cwFresh = (qk: string) => ({ qk, turn: 0, flip: false, cells: [] as string[], rows: [] as any[], lit: 0, demo: null as any, stale: false, dirty: false, wi: 0, tryAt: null as any, hiRow: null as any, nudge: false });

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

const cwTidy = (v: any) => String(v ?? "").toUpperCase().replace(/[^A-Z]/g, "");

/* judge: is this value right for this item? (numbers compare as numbers) */
const judge = (item: any, v: any) => {
  if (item.parts) return judgeSlotParts(item, v);
  if (item.choices) return String(v ?? "").trim().toLowerCase() === String(item.answer).trim().toLowerCase();
  return cwTidy(v) === cwTidy(item.answer);
};

/* oracle: every answer re-derived by a second route (character codes and modular arithmetic),
   sharing no code with judge or with the working area */
const oracle = () => {
  const up = (s: any) => String(s).toUpperCase();
  const code = (ch: string) => ch.charCodeAt(0) - 64;                       /* A = 1 */
  const chr = (p: number) => String.fromCharCode(65 + (((p - 1) % 26) + 26) % 26);
  const word = (s: any, f: (p: number) => number) => up(s).split("").map((c: string) => chr(f(code(c)))).join("");
  let fine = true;
  for (const p of PHASES) for (const it of p.items as any[]) {
    if (it.kind === "num") {
      fine = fine && up(it.word).split("").map((c: string) => code(c)).join(",") === it.answer.join(",");
    } else if (it.kind === "swap") {
      const want = word(it.word, (q: number) => 27 - q);
      const got = it.choices.filter((c: any) => c.id === it.answer);
      fine = fine && got.length === 1 && got[0].label.replace(/ /g, "") === want;
    } else if (it.kind === "code") {
      fine = fine && word(it.word, (q: number) => q + it.shift) === it.answer;
    } else if (it.kind === "decode") {
      fine = fine && word(it.code, (q: number) => q - it.shift) === it.answer;
    } else if (it.kind === "lock") {
      /* two honest keys give two different readings, so no reading can be certain */
      const a = it.nums ? it.nums.map((x: number) => chr(x)).join("") : word(it.code, (q: number) => q - 3);
      const b = it.nums ? it.nums.map((x: number) => chr(27 - x)).join("") : word(it.code, (q: number) => q - 9);
      fine = fine && a !== b && it.answer === "unsure";
    }
    if (it.choices) fine = fine && it.choices.filter((c: any) => c.id === it.answer).length === 1;
  }
  return fine;
};

/* the most likely wrong answer (the misconception); judge must reject it */
const nearMiss = (item: any) => {
  if (item.parts) return String(item.word).split("").map((c: string) => cwPlace(c) - 1).join("|");            /* counts from zero */
  if (item.choices) return (item.choices.filter((c: any) => c.id !== item.answer)[0] || {}).id || "~";
  if (item.kind === "decode") return String(item.code).split("").map((c: string) => cwCarry(c, item.shift)).join("");   /* moves on again */
  return String(item.word).split("").map((c: string) => cwCarry(c, item.shift - 1)).join("");                  /* counts the start as a place */
};

/* the forms of an answer that no question, hint or ladder line may print */
const answerForms = (item: any) => {
  if (item.parts) return item.answer.filter((x: number) => x >= 10).flatMap((x: number) => [String(x), indian(x), words(x)]);
  if (item.choices) { const c = item.choices.filter((x: any) => x.id === item.answer)[0]; return c ? [c.label, c.label.replace(/ /g, "")] : [String(item.answer)]; }
  const a = String(item.answer);
  return [a, a.split("").join(" ")];
};

/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => item.answer;

/* choice ids never show in the slot: the slot prints the word the child pressed */
const CHOICE_LABEL: any = {};
PHASES.forEach((p: any) => p.items.forEach((it: any) => (it.choices || []).forEach((c: any) => { CHOICE_LABEL[c.id] = c.label; })));
const format = (v: any, i: any, o: any) => { const l = CHOICE_LABEL[String(v)]; return l ? (o && o.tx ? o.tx(l) : l) : String(v ?? ""); };

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => {
  if (T.state().stage === "demo") return HOOK.demo && HOOK.demo();
  if (item.pad === "enter" && HOOK.set) HOOK.set(item, item.answer);
  return T.submit(item.answer);
};
/* the agent's answer() for an item made on the working area: set it as a child would; undefined = type it */
const answer = (item: any, v: any) => (item.pad === "enter" && HOOK.set ? HOOK.set(item, v) : undefined);
/* the agent's check() before Enter. In a guide-steps phase (stage "demo") it must return undefined, so the agent's check()
   reaches api.onEnter and performs the current step: HOOK.check is set only while a working-area question is open */
const check = () => (HOOK.check ? HOOK.check() : undefined);

/* ── the working area ────────────────────────────────────────────────────────────────────────
   keyOnly: 64,108, 1472 x 520 with the panel shut; 900 wide when the answer panel is open (bigPad). box.key = { x, y, w, h } is the
   key's corner in THIS area's coordinates: nothing of mine stands there (the wheel is at the left, the right region stops at 1252 below
   y 94). The wheel is at one place and size in every state; the right region (cards, keys, rows) is laid out for the open panel
   (x 500 to 904) except the letter keyboard, which only a working-area question draws (it never opens the panel).
   Every act is performed through api.act (the hand counts, the pencil writes a trial row); turning the ring is the child's own
   gesture on the wheel (the inner letters slide one place a tap).
   The board is keyed to the ENTRY (phase, question, warm-up or question), never to a timer. */
function Work({ phase, n, item, index, stage, wrong, typed, api, MODEL, step, stepOn, box, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();
  const free = stage === "free";
  const warm = !free && (stage === "demo" || stage === "teach");
  const pn = typeof n === "number" ? n : (phase && phase.n) || 1;
  const rm = reducedMotion();
  const qk = free ? "free" : pn + ":" + (index || 0) + ":" + (warm ? "w" : "q");
  /* the entry count: it goes up whenever the question key changes, so a question left and entered again (gotoStep, a phase dot, the agent)
     opens on a fresh board and never on the letters, rows or ring it was left with */
  const entry = useRef<any>({ q: qk, n: 0 });
  if (entry.current.q !== qk) entry.current = { q: qk, n: entry.current.n + 1 };
  const sk = qk + "#" + entry.current.n;
  const [raw, setRaw] = useState<any>(() => cwFresh(sk));
  const st: any = raw.qk === sk ? raw : cwFresh(sk);
  const stRef = useRef<any>(st); stRef.current = st;
  const qkRef = useRef(sk); qkRef.current = sk;
  const lastTurnAt = useRef(0);
  const lastWasWarm = useRef(false);
  const [busy, setBusy] = useState(false);
  const busyRef = useRef(false);
  const lockedRef = useRef(false);
  const pend = useRef<any>(null);
  const B: any = cwBoard(item || {}, pn, warm, free, st.wi);
  const itemRef = useRef<any>(item); itemRef.current = item;
  const boardRef = useRef<any>(B); boardRef.current = B;

  /* write into this entry's state, at once (a second tap before the next render sees the first) */
  const put = (patch: any) => {
    const cur = stRef.current.qk === qkRef.current ? stRef.current : cwFresh(qkRef.current);
    const next = { ...cur, ...(typeof patch === "function" ? patch(cur) : patch) };
    stRef.current = next;
    setRaw(next);
    return next;
  };
  const setBusyNow = (b: boolean) => { busyRef.current = b; setBusy(b); };

  const nC = B.given.length;
  const kb = B.mode === "kb";
  const lockM = B.mode === "bandlock" || B.mode === "ringlock";
  const band = B.mode === "band" || B.mode === "bandlock";
  const askLive = stage === "ask" && !busy;
  const ctlLive = (askLive || free || warm) && !busy;
  const kbLive = kb && askLive;
  const RX = MODEL.region.x;
  const RW = kb ? MODEL.region.wide : MODEL.region.narrow;
  const cardW = Math.max(72, Math.min(kb ? 136 : 128, Math.floor((RW - (nC - 1) * 12) / nC)));
  const L: any = kb ? { tY: 4, sY: 90, kY: 278 }
    : lockM ? { tY: 10, sY: 96, tryY: 184, rY: 272 }
    : B.mode === "band" ? { sY: 150, cY: 60 }
    : { tY: 40, sY: 130, wY: 316 };
  const madeInk = shade(CONTENT.one, 0.25), givenInk = shade(CONTENT.hundred, 0.25), stepInk = shade(CONTENT.pointer, 0.25);
  const quietInk = mix(C.ink, C.paper, 0.26);
  const kInk = toneInk("key", C.ink);            /* a live key's ink: the theme's own, so it reads on the key's face */
  const demo = st.demo;
  const cells = st.cells;
  const firstEmpty = (() => { for (let k = 0; k < nC; k++) if (!cells[k]) return k; return -1; })();
  const wonCards = (stage === "win" || stage === "idle") && !free && B.right ? B.right : null;
  const solved = (stage === "win" || stage === "idle") && !free;

  /* ── acts ── */
  /* the places count goes round mod 26: a wheel never stops (25 places on, one more, is no turn) */
  const turnBy = (d: number) => {
    const s = stRef.current;
    let t = s.turn + d;
    if (t > 25) t -= 26;
    if (t < -25) t += 26;
    api.sfx.tick();
    put({ turn: t, demo: null });
    return true;
  };
  /* one guide step takes one turn: a double tap on the key is one tap (a child's quick second tap in a question still counts) */
  const quickTap = () => {
    const now = Date.now();
    /* in a guide step, and just after the last one (the question may already be open): a quick second tap is the first tap again */
    if ((warm || lastWasWarm.current) && now - lastTurnAt.current < 400) return true;
    lastTurnAt.current = now;
    lastWasWarm.current = warm;
    return false;
  };
  /* Enter or Space on a focused key: the runtime blurs it after the press; this is the tool's own key, so the focus goes back to it */
  const keepFocus = (id: string) => {
    try {
      const a: any = document.activeElement;
      if (a && a.getAttribute && a.getAttribute("data-control") === id)
        setTimeout(() => { const e: any = document.querySelector('[data-control="' + id + '"]'); if (e && e.focus) e.focus(); }, 0);
    } catch (e) {}
  };
  const gate = (name: string) => { if (warm && stepOn && stepOn !== name) { api.did(name); return false; } return !!(warm ? stepOn : (stage === "ask" || free)); };
  const onTurn = () => { if (busyRef.current || !gate("turn") || quickTap()) return; keepFocus("turn"); turnBy(1); api.did("turn"); };
  const onBack = () => { if (busyRef.current || !gate("back") || quickTap()) return; keepFocus("back"); turnBy(-1); api.did("back"); };
  const onFlip = () => { if (busyRef.current || !gate("flip")) return; api.sfx.tick(); put((s: any) => ({ flip: !s.flip, demo: null })); api.did("flip"); };
  const onWord = () => { if (busyRef.current || !gate("word")) return; api.sfx.tick(); put((s: any) => ({ wi: (s.wi + 1) % CW_WORDS.length, demo: null })); api.did("word"); };

  /* COUNT: the hand taps A, B, C round the ring and the band writes 1, 2, 3 under each */
  const doCount = async () => {
    if (busyRef.current) return;
    const my = qkRef.current;
    setBusyNow(true);
    const pts = [0, 1, 2].map((i) => cwPt(i, CW.out));
    const ok = await api.act({ tool: "hand", moves: "tap", at: pts, ms: 700, onPoint: (i: number) => { if (qkRef.current === my) put({ lit: i + 1 }); } });
    if (qkRef.current === my) setBusyNow(false);
    if (ok && qkRef.current === my) api.did("count");
  };
  /* TRY KEY: the pencil writes what the key now set reads, a row at a time, letter by letter */
  const doTry = async () => {
    if (busyRef.current) return;
    const my = qkRef.current, s = stRef.current, b = boardRef.current;
    const label = b.nums ? (s.flip ? "A is 26" : "A is 1") : cwKeyWord(s.turn);
    const had = s.rows.findIndex((r: any) => r.key === label);
    if (had >= 0) {          /* this key is already written: its row lights again, nothing new is added */
      api.sfx.tick();
      put({ hiRow: had });
      setTimeout(() => { if (qkRef.current === my) put({ hiRow: null }); }, 900);
      api.did("try");
      return;
    }
    if (s.rows.length >= 3) { api.sfx.tick(); api.did("try"); return; }
    const cards = cwReading(b, s.turn, s.flip), row = s.rows.length;
    put({ rows: s.rows.concat([{ key: label, cards }]), tryAt: { row, n: 0 }, demo: null });
    setBusyNow(true);
    const ry = L.rY + row * 70;
    const pts = cards.map((_: any, j: number) => ({ x: RX + 202 + j * 64, y: ry + 34 }));
    const ok = await api.act({ tool: "pencil", moves: "push", at: pts, ms: 700, onPoint: (j: number) => { if (qkRef.current === my) put({ tryAt: { row, n: j + 1 } }); } });
    if (qkRef.current !== my) return;
    put({ tryAt: null });
    setBusyNow(false);
    if (ok) api.did("try");
  };
  const act = (on: any) => {
    if (on === "count") return doCount();
    if (on === "turn") return onTurn();
    if (on === "back") return onBack();
    if (on === "try") return doTry();
    if (on === "flip") return onFlip();
    return undefined;
  };

  /* the letter keyboard (a working-area question, pad "enter"): a letter fills the next empty box, rub out takes the last away */
  const sync = (arr: string[]) => {
    api.setTyped(arr.join(""));
    api.answerReady(arr.filter(Boolean).length === nC && nC > 0);
  };
  const typeLetter = (ch: string) => {
    const s = stRef.current;
    if (!kb || stage !== "ask" || busyRef.current) return;
    const arr: string[] = s.stale ? [] : s.cells.slice();
    let at = -1;
    for (let k = 0; k < nC; k++) if (!arr[k]) { at = k; break; }
    if (at < 0) return;
    unnudge();
    arr[at] = ch;
    api.sfx.tick();
    put({ cells: arr, stale: false, dirty: true, demo: null, nudge: false });
    sync(arr);
  };
  const rub = () => {
    const s = stRef.current;
    if (!kb || stage !== "ask" || busyRef.current) return;
    const arr: string[] = s.cells.slice();
    for (let k = nC - 1; k >= 0; k--) if (arr[k]) { arr[k] = ""; break; }
    unnudge();
    api.sfx.tick();
    put({ cells: arr, stale: false, dirty: true, demo: null, nudge: false });
    sync(arr);
  };
  const typeRef = useRef<any>(null); typeRef.current = { typeLetter, rub };
  useEffect(() => {
    if (!kbLive) return;
    const h = (e: any) => {
      if (e.ctrlKey || e.metaKey || e.altKey || e.repeat) return;      /* a held key types once */
      const k = String(e.key || "");
      const isLetter = /^[a-zA-Z]$/.test(k);
      if (isLetter || k === "Backspace") {
        /* the child has moved on from the ring's keys: Enter must answer, not turn the ring again */
        try { const a: any = document.activeElement, id = a && a.getAttribute ? a.getAttribute("data-control") : ""; if (id === "turn" || id === "back") a.blur(); } catch (er) {}
      }
      if (isLetter) typeRef.current.typeLetter(k.toUpperCase());
      else if (k === "Backspace") typeRef.current.rub();
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [kbLive, sk]);

  /* what has been built, as one answer */
  const built = (s: any) => { const a = []; for (let k = 0; k < nC; k++) a.push(s.cells[k] || ""); return a.every(Boolean) ? a.join("") : ""; };
  /* Enter is one function: the current guide step in a warm-up, the answer on a working-area question after the board changed */
  const nudged = useRef(false);
  const sendIt = () => {
    const s = stRef.current, v = built(s);
    if (!v) { api.sfx.tick(); api.say("Fill every box first."); nudged.current = true; put({ nudge: true }); return; }   /* an unfinished word: one line says why */
    if (!s.dirty) { api.sfx.tick(); return; }                                                         /* the same word again: a soft tick, nothing new */
    api.submit(v);
  };
  /* the child's next letter brings the question back in place of the nudge */
  const unnudge = () => { if (nudged.current) { nudged.current = false; const it = itemRef.current; if (it && it.say) api.say(it.say); } };
  api.onEnter(warm && stepOn ? () => act(stepOn) : (askLive && kb ? sendIt : null));

  /* a fresh entry: nothing built, the ring at rest */
  useEffect(() => {
    pend.current = null;
    api.answerReady(false);
  }, [sk]);
  /* the same question entered again with its slot cleared by the runtime (gotoStep to where it stands): the letters go too */
  useEffect(() => {
    const s0 = stRef.current;
    if (kb && stage === "ask" && !busyRef.current && typed === "" && s0.cells.some(Boolean)) { put({ cells: [], stale: false, dirty: false, demo: null }); api.answerReady(false); }
  }, [typed]);
  /* the child's next act clears the correction layer (a digit typed in the panel; a letter, a turn or a try clears it itself) */
  useEffect(() => { if (stRef.current.demo && stage === "ask" && !busyRef.current) put({ demo: null }); }, [typed]);
  /* leaving an entry stops its replay and gives the pad back */
  useEffect(() => () => { tl.stop(); busyRef.current = false; setBusy(false); if (lockedRef.current) { lockedRef.current = false; api.lock(false); } }, [sk]);

  /* the agent and the dev driver */
  HOOK.set = (it: any, v: any) => {
    const letters = cwTidy(v).split("");
    pend.current = letters.join("");
    api.setTyped(pend.current);
    put({ turn: it.kind === "decode" ? -it.shift : it.shift || 0, cells: letters, demo: null, stale: false, dirty: true });
    api.answerReady(true);
    return true;
  };
  HOOK.check = stage === "ask" && kb ? () => { api.submit(pend.current || built(stRef.current)); return true; } : null;

  /* the win line: one sentence, said at the right answer (a phase's last one is replaced by its closing) */
  useEffect(() => {
    if (stage === "win" && item && item.win) api.say(item.win);
  }, [stage, sk]);

  /* ── the correction: the maths redrawn, ending on the whole right answer, on a layer the child's next act clears ── */
  useEffect(() => {
    if (!wrong || stage !== "ask") return;
    const b = boardRef.current, it = itemRef.current, my = qkRef.current;
    api.lock(true); lockedRef.current = true; setBusyNow(true);
    put({ dirty: false, stale: true });
    const want: string[] = b.right || [];
    const steps: any[] = [];
    const setD = (o: any) => { if (qkRef.current === my) put((s: any) => ({ demo: Object.assign({}, s.demo || {}, o) })); };
    if (b.kind === "num") {
      /* the band counts from A again (1 at A), then round to each letter of the word, lighting it */
      steps.push([420, () => put({ demo: { cards: [], spokeCh: "A", nums: [] } })]);
      steps.push([700, () => setD({ spokeCh: "A" })]);
      want.forEach((_: any, k: number) => steps.push([560, () => setD({ cards: want.slice(0, k + 1), spokeCh: b.given[k], nums: b.given.slice(0, k + 1) })]));
      steps.push([420, () => setD({ spokeCh: null })]);
    } else if (b.kind === "swap") {
      steps.push([420, () => put({ demo: { cards: [], chords: 0 } })]);
      want.forEach((_: any, k: number) => steps.push([560, () => setD({ cards: want.slice(0, k + 1), chords: k + 1 })]));
      steps.push([420, () => setD({})]);
    } else if (b.kind === "code" || b.kind === "decode") {
      const target = b.kind === "decode" ? -b.shift : b.shift, one = target > 0 ? 1 : -1;
      const kid = (stRef.current.cells || []).slice(0, nC);
      steps.push([250, () => put({ turn: 0, demo: { cards: [], arcs: 0 } })]);
      if (b.kind === "decode" && kid.length === nC && kid.every(Boolean)) {
        /* first the child's word is coded again through the key: the ring slides on by the key in one step and the word written there
           does not come back to the code, so it was not the way back; then the ring slides back the other way and the code is carried home */
        steps.push([300, () => put({ turn: b.shift })]);
        steps.push([650, () => setD({ cards: kid.map((c: string) => cwCarry(c, b.shift)), again: true })]);
        steps.push([450, () => put({ turn: -b.shift })]);
        steps.push([250, () => setD({ cards: [], again: false })]);
      } else {
        for (let t = 1; t <= Math.abs(target); t++) steps.push([300, () => put({ turn: t * one })]);
      }
      want.forEach((_: any, k: number) => steps.push([b.kind === "decode" ? 400 : 560, () => setD({ cards: want.slice(0, k + 1), arcs: k + 1 })]));
      steps.push([b.kind === "decode" ? 200 : 420, () => setD({})]);
    } else {
      const rows = b.nums
        ? [{ key: "A is 1", cards: cwReading(b, 0, false) }, { key: "A is 26", cards: cwReading(b, 0, true) }]
        : [{ key: "3 back", cards: cwReading(b, -3, false) }, { key: "9 back", cards: cwReading(b, -9, false) }];
      /* the child's own tries stay unless there is no room for the two rows the correction writes */
      const have = stRef.current.rows, fresh = rows.filter((r: any) => !have.some((t: any) => t.key === r.key));
      steps.push([320, () => put(have.length + fresh.length > 3 ? { rows: [], demo: { rows: [] } } : { demo: { rows: [] } })]);
      rows.forEach((_: any, k: number) => steps.push([760, () => setD({ rows: rows.slice(0, k + 1) })]));
      steps.push([520, () => setD({ caption: CHOICE_LABEL[it.answer] || "" })]);
    }
    tl.run(steps, () => { if (qkRef.current !== my) return; lockedRef.current = false; api.lock(false); setBusyNow(false); });
  }, [wrong]);

  /* what the host and the teacher agent read back (toolApi.getState) */
  const encodes = B.kind === "code";
  api.share({
    keyType: B.mode === "band" ? (B.kind === "swap" ? "swap" : "number band") : B.mode === "bandlock" ? "number band" : "places on",
    places: st.turn,
    message: B.given.join(" "),
    coded: encodes ? cells.filter(Boolean).join(" ") : "",
    decoded: B.kind === "decode" ? cells.filter(Boolean).join(" ") : "",
    trials: st.rows.map((r: any) => r.key),
    nudge: st.nudge ? "Fill every box first." : "",
    complete: stage === "idle",
  });

  /* ── the picture ── */
  const hid = (p: number) => !B.nums && B.given.indexOf(cwLetter(p)) >= 0;     /* a mark never names a letter the child is working out */
  const bandNum = (pos: number) => (st.flip ? 26 - pos : pos + 1);              /* the number the band writes at place index pos */
  const arcsN = demo && demo.arcs !== undefined ? demo.arcs : (solved && B.mode === "kb" ? nC : 0);
  const headOf = (i: number, k: number, r: number) => {
    const end = cwPt(i + k, r), lead = cwPt(i + k - (k > 0 ? 0.6 : -0.6), r);
    return { end, ang: Math.atan2(end.y - lead.y, end.x - lead.x) * 180 / Math.PI };
  };
  const capLines = (label: string) => {
    const w = String(label).split(" ");
    if (label.length <= 9 || w.length < 2) return [label];
    let at = 1, most = 1e9;
    for (let i = 1; i < w.length; i++) { const m = Math.max(w.slice(0, i).join(" ").length, w.slice(i).join(" ").length); if (m < most) { at = i; most = m; } }
    return [w.slice(0, at).join(" "), w.slice(at).join(" ")];
  };

  const wheel = () => (
    <g>
      {/* the outer ring, then the inner one: the plain disc is the fallback, the card wheel is drawn over it (never tinted); the inner ring's
          rim has a near-black outline in code so the two same-coloured rings separate; the hub, band, boxes and rows stay plain */}
      <circle cx={CW.cx} cy={CW.cy} r={CW.rim} fill={tint(C.panel, 0.3)} stroke={C.rule} strokeWidth={2} />
      <Skin name="wheel" x={CW.cx - CW.rim} y={CW.cy - CW.rim} w={2 * CW.rim} h={2 * CW.rim} />
      <circle cx={CW.cx} cy={CW.cy} r={CW.mid + 2} fill={band ? C.paper : tint(C.panel, 0.5)} stroke={band ? C.rule : C.ink} strokeWidth={band ? 2 : 3} />
      {!band ? <Skin name="wheel" x={CW.cx - CW.mid - 2} y={CW.cy - CW.mid - 2} w={2 * (CW.mid + 2)} h={2 * (CW.mid + 2)} /> : null}
      {!band ? <circle cx={CW.cx} cy={CW.cy} r={CW.mid + 2} fill="none" stroke={C.ink} strokeWidth={3} /> : null}
      <circle cx={CW.cx} cy={CW.cy} r={CW.hub} fill={C.paper} stroke={C.rule} strokeWidth={2} />
      {/* where Z meets A, on the ring that does not move */}
      <line x1={cwPt(-0.5, CW.hub).x} y1={cwPt(-0.5, CW.hub).y} x2={cwPt(-0.5, CW.rim).x} y2={cwPt(-0.5, CW.rim).y} stroke={CONTENT.bead} strokeWidth={5} strokeLinecap="round" />
      {!band ? <g stroke={CONTENT.bead} strokeWidth={5} strokeLinecap="round">
        <line x1={cwPt(-0.5 - st.turn, CW.hub).x} y1={cwPt(-0.5 - st.turn, CW.hub).y} x2={cwPt(-0.5 - st.turn, CW.inn - 24).x} y2={cwPt(-0.5 - st.turn, CW.inn - 24).y} strokeDasharray="10 8" />
        <line x1={cwPt(-0.5 - st.turn, CW.inn + 24).x} y1={cwPt(-0.5 - st.turn, CW.inn + 24).y} x2={cwPt(-0.5 - st.turn, CW.mid + 2).x} y2={cwPt(-0.5 - st.turn, CW.mid + 2).y} />
      </g> : null}
      {/* the swap key's three examples are given in the question, so they are drawn from the start */}
      {B.kind === "swap" ? [0, 2, 3].map((i) => {
        const a = cwPt(i, CW.out - 18), b = cwPt(25 - i, CW.out - 18);
        return (
          <g key={"x" + i} pointerEvents="none">
            <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={C.paper} strokeWidth={10} strokeLinecap="round" strokeOpacity={0.85} />
            <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={CONTENT.pointer} strokeWidth={5} strokeLinecap="round" />
          </g>
        );
      }) : null}
      {/* the outer ring: fixed; the letters of the message stand out in blue, the next one to work out has a ring */}
      {CW_ALPHA.split("").map((ch, i) => {
        const p = cwPt(i, CW.out), inWord = !B.nums && B.given.indexOf(ch) >= 0;
        const next = kb && askLive && firstEmpty >= 0 && B.given[firstEmpty] === ch;
        return (
          <g key={"o" + ch}>
            {inWord ? <circle cx={p.x} cy={p.y} r={21} fill={tint(CONTENT.hundred, 0.84)} stroke={next ? C.accent : "none"} strokeWidth={4} /> : null}
            <text x={p.x} y={p.y + 11} textAnchor="middle" fontSize={T.label} fontWeight={inWord ? 700 : 600} fill={inWord ? givenInk : mix(C.ink, C.paper, 0.2)}>{ch}</text>
          </g>
        );
      })}
      {/* the band: only the marked places are printed, never a letter being worked out; the hand's count and the correction add theirs */}
      {band ? CW_MARKS.filter((p) => !hid(p) && !(B.nums && st.rows.length === 0 && B.nums.indexOf(st.flip ? 27 - p : p) >= 0)).map((p) => {
        const a = cwPt(p - 1, CW.inn);
        /* a paper halo: a swap chord passing a mark never strikes through its number */
        return <text key={"b" + p} x={a.x} y={a.y + 10} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={C.ink}
          stroke={B.kind === "swap" ? C.paper : "none"} strokeWidth={7} paintOrder="stroke" strokeLinejoin="round">{st.flip ? 27 - p : p}</text>;
      }) : null}
      {band && st.lit > 0 ? [0, 1, 2].slice(0, st.lit).map((i) => {
        const a = cwPt(i, CW.inn);
        return <text key={"l" + i} x={a.x} y={a.y + 10} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={stepInk}>{bandNum(i)}</text>;
      }) : null}
      {band && demo && demo.nums ? demo.nums.map((ch: string, k: number) => {
        const i = cwPlace(ch) - 1, a = cwPt(i, CW.inn);
        if (CW_MARKS.indexOf(i + 1) >= 0 && !hid(i + 1)) return null;           /* that number is already on the band */
        return <text key={"d" + k} x={a.x} y={a.y + 10} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={stepInk}>{bandNum(i)}</text>;
      }) : null}
      {/* the inner ring: what every letter becomes under the key now set; it slides one place a tap */}
      {!band ? CW_ALPHA.split("").map((ch, j) => {
        const p = cwPt(j - st.turn, CW.inn);
        return <text key={"i" + ch} x={0} y={11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={shade(CONTENT.one, 0.4)}
          style={{ transform: "translate(" + p.x.toFixed(1) + "px," + p.y.toFixed(1) + "px)", transition: rm ? "none" : "transform 340ms ease" } as any}>{ch}</text>;
      }) : null}
      {/* the carries: every letter moves the same way round, and one of them passes the tick. Three passes (all the pale underlays, then all the
          arcs, then all the heads) so no underlay or head ever paints over another letter's arc */}
      {!band && st.turn !== 0 ? (() => {
        const hops = B.given.slice(0, arcsN).map((ch: string) => { const i = cwPlace(ch) - 1; return { i, h: headOf(i, st.turn, CW.mid) }; });
        const tri = (h: any, k: number) => "translate(" + h.end.x.toFixed(1) + "," + h.end.y.toFixed(1) + ") rotate(" + h.ang.toFixed(1) + ") scale(" + k + ")";
        return (
          <g pointerEvents="none">
            {hops.map((o: any, k: number) => <path key={"au" + k} d={cwArc(o.i, st.turn, CW.mid)} fill="none" stroke={C.paper} strokeWidth={12} strokeOpacity={0.85} />)}
            {hops.map((o: any, k: number) => <path key={"hu" + k} d="M 3 0 L -18 -11 L -18 11 Z" fill={C.paper} fillOpacity={0.85} transform={tri(o.h, 1)} />)}
            {hops.map((o: any, k: number) => <path key={"a" + k} d={cwArc(o.i, st.turn, CW.mid)} fill="none" stroke={CONTENT.pointer} strokeWidth={5} />)}
            {hops.map((o: any, k: number) => <path key={"h" + k} d="M 0 0 L -15 -8 L -15 8 Z" fill={CONTENT.pointer} transform={tri(o.h, 1)} />)}
          </g>
        );
      })() : null}
      {/* the correction's spoke and chords */}
      {demo && demo.spokeCh ? (() => {
        const i = cwPlace(demo.spokeCh) - 1, a = cwPt(i, CW.hub), b = cwPt(i, CW.rim - 10);
        return (
          <g pointerEvents="none">
            <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={C.paper} strokeWidth={11} strokeLinecap="round" strokeOpacity={0.85} />
            <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={CONTENT.pointer} strokeWidth={5} strokeLinecap="round" />
          </g>
        );
      })() : null}
      {demo && demo.chords ? B.given.slice(0, demo.chords).map((ch: string, k: number) => {
        const i = cwPlace(ch) - 1, a = cwPt(i, CW.out - 18), b = cwPt(25 - i, CW.out - 18);
        return (
          <g key={"c" + k} pointerEvents="none">
            <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={C.paper} strokeWidth={12} strokeLinecap="round" strokeOpacity={0.85} />
            <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={CONTENT.pointer} strokeWidth={6} strokeLinecap="round" />
          </g>
        );
      }) : null}
      {/* the hub: how far the ring has turned, which way the band runs, or the fact the correction ends on */}
      {demo && demo.caption ? (
        <g>{capLines(tx(demo.caption)).map((t: string, k: number, a: string[]) => (
          <text key={"h" + k} x={CW.cx} y={CW.cy + 10 + (k - (a.length - 1) / 2) * (lang === "en" ? 34 : 46)} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={madeInk}>{t}</text>
        ))}</g>
      ) : B.kind === "swap" ? (
        /* the key here is the swap: A with Z, drawn, never a number */
        <g pointerEvents="none">
          <text x={CW.cx - 50} y={CW.cy + 11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={givenInk}>A</text>
          <text x={CW.cx + 50} y={CW.cy + 11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={givenInk}>Z</text>
          <path d={"M " + (CW.cx - 24) + " " + CW.cy + " H " + (CW.cx + 24) + " M " + (CW.cx - 24) + " " + CW.cy + " l 10 -8 M " + (CW.cx - 24) + " " + CW.cy + " l 10 8 M " + (CW.cx + 24) + " " + CW.cy + " l -10 -8 M " + (CW.cx + 24) + " " + CW.cy + " l -10 8"}
            fill="none" stroke={stepInk} strokeWidth={4} strokeLinecap="round" />
        </g>
      ) : B.mode === "bandlock" ? (
        /* the key is not known until a key has been tried: the rows say which key each reading is under */
        <text x={CW.cx} y={CW.cy + 11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={quietInk}>{tx("key?")}</text>
      ) : band ? (
        <text x={CW.cx} y={CW.cy + 11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={stepInk}>{tx(st.flip ? "A is 26" : "A is 1")}</text>
      ) : st.turn !== 0 ? (
        <g>
          <text x={CW.cx} y={CW.cy + 4} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={stepInk}>{(st.turn > 0 ? "+" : "−") + Math.abs(st.turn)}</text>
          <text x={CW.cx} y={CW.cy + 42} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={stepInk}>{tx(st.turn > 0 ? "on" : "back")}</text>
        </g>
      ) : (
        <text x={CW.cx} y={CW.cy + 10} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={quietInk}>{tx("no turn yet")}</text>
      )}
    </g>
  );

  /* one card of the strip: the given letter above, the box the child fills, and (in a correction) the right reading under it */
  const madeOf = (k: number) => {
    if (wonCards && !kb) return wonCards[k];
    if (B.mode === "free") return cwCarry(B.given[k], st.turn);
    if (kb) return cells[k] || "";
    if (B.kind === "num") return slotPartsOf(typed, nC)[k] || "";
    return "";
  };
  const card = (g: string, k: number, x: number, y: number) => {
    const compact = lockM, made = compact ? "" : madeOf(k);
    const rd = demo && demo.cards && demo.cards[k] !== undefined && !compact ? demo.cards[k] : null;
    const nextK = kb && askLive && k === firstEmpty;
    return (
      <g key={"c" + k}>
        <rect x={x} y={y} width={cardW} height={compact ? 72 : 58} rx={RAD.panel} fill={tint(C.panel, 0.62)} stroke={C.rule} strokeWidth={2} />
        <text x={x + cardW / 2} y={y + (compact ? 54 : 44)} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={givenInk}>{g}</text>
        {!compact ? <rect x={x + 6} y={y + 64} width={cardW - 12} height={56} rx={10} fill="#FFFFFF" stroke={nextK ? C.accent : C.rule} strokeWidth={nextK ? 4 : 2} /> : null}
        {!compact && made ? <text x={x + cardW / 2} y={y + 108} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={madeInk}>{made}</text> : null}
        {rd !== null ? (
          <g pointerEvents="none">
            <rect x={x + 6} y={y + 128} width={cardW - 12} height={44} rx={10} fill={tint(demo.again ? CONTENT.pointer : CONTENT.one, 0.86)} stroke={demo.again ? stepInk : madeInk} strokeWidth={2} />
            <text x={x + cardW / 2} y={y + 160} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={demo.again ? stepInk : madeInk}>{rd}</text>
          </g>
        ) : null}
      </g>
    );
  };

  /* the trial rows (a locked message): one reading to a row, none of them marked */
  const trialRows = () => {
    const base = st.rows;
    const all = demo && demo.rows ? base.concat(demo.rows.filter((r: any) => !base.some((t: any) => t.key === r.key))) : base;
    const shown = (solved && lockM && B.kind === "lock") ? (() => {
      const extra = B.nums
        ? [{ key: "A is 1", cards: cwReading(B, 0, false) }, { key: "A is 26", cards: cwReading(B, 0, true) }]
        : [{ key: "3 back", cards: cwReading(B, -3, false) }, { key: "9 back", cards: cwReading(B, -9, false) }];
      return base.concat(extra.filter((r: any) => !base.some((t: any) => t.key === r.key)));
    })() : all;
    return (
      <g>
        {[0, 1].map((k) => <rect key={"e" + k} x={RX} y={L.rY + k * 70} width={RW} height={62} rx={14} fill="none" stroke={C.rule} strokeWidth={2} strokeDasharray="10 10" />)}
        {shown.slice(0, 3).map((r: any, k: number) => {
          const ry = L.rY + k * 70, upTo = st.tryAt && st.tryAt.row === k ? st.tryAt.n : r.cards.length;
          return (
            <g key={"r" + k} pointerEvents="none">
              <rect x={RX} y={ry} width={RW} height={62} rx={14} fill="#FFFFFF" stroke={st.hiRow === k ? C.accent : C.rule} strokeWidth={st.hiRow === k ? 5 : 2} />
              <text x={RX + 16} y={ry + 40} fontSize={T.micro} fontWeight={600} fill={stepInk}>{cwKeyShow(r.key, lang, tx)}</text>
              {r.cards.slice(0, upTo).map((ch: string, j: number) => (
                <text key={j} x={RX + 202 + j * 64} y={ry + 43} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={madeInk}>{ch}</text>
              ))}
            </g>
          );
        })}
        {st.rows.length >= 3 ? <text x={RX + 4} y={L.rY + 3 * 70 + 24} fontSize={T.micro} fontWeight={600} fill={quietInk}>{tx("Three tries are enough.")}</text> : null}
      </g>
    );
  };

  /* ── controls ── */
  const keyBox = (name: string) => {
    const tY = L.tY !== undefined ? L.tY : 0;
    return ({
      back: { x: RX, y: tY, w: 170, h: 72 },
      turn: { x: RX + 186, y: tY, w: 170, h: 72 },
      flip: { x: RX, y: tY, w: 200, h: 72 },
      count: { x: RX, y: L.cY, w: 200, h: 72 },
      try: { x: RX, y: L.tryY, w: 300, h: 72 },
      word: { x: RX, y: L.wY, w: 200, h: 72 },
    } as any)[name] || null;
  };
  const backIcon = <g transform="translate(-58,0)"><path d="M 8 -11 A 12 12 0 1 0 8 11" fill="none" stroke={ctlLive ? kInk : quietInk} strokeWidth={4} strokeLinecap="round" /><path d="M 8 -17 L 8 -5 L -3 -11 Z" fill={ctlLive ? kInk : quietInk} /></g>;
  const onIcon = <g transform="translate(-48,0)"><path d="M -8 -11 A 12 12 0 1 1 -8 11" fill="none" stroke={ctlLive ? kInk : quietInk} strokeWidth={4} strokeLinecap="round" /><path d="M -8 -17 L -8 -5 L 3 -11 Z" fill={ctlLive ? kInk : quietInk} /></g>;
  const turnKeys = () => (
    <g>
      <Key id="back" label="Turn back" {...keyBox("back")} C={C} tone="key" disabled={!ctlLive} onClick={onBack}>
        {backIcon}
        <text x={20} y={11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={ctlLive ? kInk : quietInk}>{tx("Back")}</text>
      </Key>
      <Key id="turn" label="Turn on" {...keyBox("turn")} C={C} tone="key" disabled={!ctlLive} onClick={onTurn}>
        {onIcon}
        <text x={22} y={11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={ctlLive ? kInk : quietInk}>{tx("On")}</text>
      </Key>
    </g>
  );
  const wordKey = (id: string, text: string, on: any, k: string, off?: boolean) => (
    <Key id={id} label={text} {...keyBox(k)} C={C} tone="key" disabled={!ctlLive || !!off} onClick={on}>
      <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={ctlLive && !off ? kInk : quietInk}>{tx(text)}</text>
    </Key>
  );
  const tryOff = (B.mode === "ringlock" && st.turn === 0) || st.rows.length >= 3;
  const letterKeys = () => {
    const rows = ["ABCDEFGHI", "JKLMNOPQR", "STUVWXYZ"], out: any[] = [];
    rows.forEach((r, ri) => r.split("").forEach((ch, ci) => out.push(
      <Key key={"k" + ch} id={"ltr-" + ch} label={ch} x={RX + ci * 80} y={L.kY + ri * 80} w={72} h={72} C={C} tone="key" disabled={!kbLive} onClick={() => typeLetter(ch)}>
        <text y={14} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={kbLive ? kInk : quietInk}>{ch}</text>
      </Key>)));
    out.push(
      <Key key="rub" id="rub" label="Rub out" x={RX + 8 * 80} y={L.kY + 2 * 80} w={72} h={72} C={C} tone="key" disabled={!kbLive} onClick={rub}>
        <path d="M -22 0 L -8 -16 L 20 -16 L 20 16 L -8 16 Z" fill="none" stroke={kbLive ? kInk : quietInk} strokeWidth={4} strokeLinejoin="round" />
        <path d="M -2 -7 L 12 7 M 12 -7 L -2 7" fill="none" stroke={kbLive ? kInk : quietInk} strokeWidth={4} strokeLinecap="round" />
      </Key>);
    return out;
  };

  /* the one thing to touch */
  let inv: any = null;
  if (!busy && !demo) {
    if (warm && stepOn) inv = stepOn;
    else if (free) inv = st.turn === 0 ? "turn" : null;
    else if (stage === "ask") {
      /* a decode never blinks a direction (that is the question), and a locked message never names one either */
      if (kb) inv = st.turn === 0 && B.kind !== "decode" ? "turn" : null;
      else if (B.mode === "ringlock") inv = st.rows.length < 3 && st.turn !== 0 && !st.rows.some((r: any) => r.key === cwKeyWord(st.turn)) ? "try" : null;
      else if (B.mode === "bandlock") inv = st.rows.length === 0 ? "try" : st.rows.length === 1 ? (st.flip ? "try" : "flip") : null;
    }
  }
  const ib = inv ? keyBox(inv) : null;

  return (
    <g>
      {wheel()}

      {/* the message strip */}
      <g>{B.given.map((g: string, k: number) => card(g, k, RX + k * (cardW + 12), L.sY))}</g>

      {/* the keys that set the key, count, try or change the word */}
      {B.mode === "kb" || B.mode === "ringlock" || B.mode === "free" ? turnKeys() : null}
      {B.mode === "bandlock" ? wordKey("flip", "Flip band", onFlip, "flip") : null}
      {B.mode === "band" && warm ? wordKey("count", "Count", () => { if (gate("count")) doCount(); }, "count") : null}
      {lockM ? wordKey("try", "Try this key", () => { if (gate("try")) doTry(); }, "try", tryOff) : null}
      {free ? wordKey("word", "Next word", onWord, "word") : null}
      {lockM ? trialRows() : null}
      {kb ? letterKeys() : null}

      {ib ? <Invite x={ib.x + ib.w / 2} y={ib.y + ib.h / 2} w={ib.w} h={ib.h} C={C} /> : null}
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase: a ring, and what was written (letters in English,
   their places as digits in Hindi and Gujarati, so the picture carries no Latin letter there) */
function Thumb({ result, it, C, w, h, lang = "en", tx = (v: any) => v }: any) {
  const last = result && result.last ? result.last : null;
  if (!last) return null;
  const item = it || last.it || {};
  let cells: string[] = [];
  if (item.parts) cells = slotPartsOf(last.value, item.parts.length);
  else if (item.kind === "swap") cells = String(CHOICE_LABEL[String(last.value)] || "").replace(/ /g, "").split("");
  else if (item.kind === "code" || item.kind === "decode") cells = cwTidy(last.value).split("");
  if (cells.length && !item.parts && lang !== "en") cells = cells.map((c: string) => String(cwPlace(c)));
  const cx = 30, cy = h / 2;
  const ink = shade(CONTENT.one, 0.25);
  const bw = cells.length ? Math.min(46, (w - 76 - (cells.length - 1) * 6) / cells.length) : 0;
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      <circle cx={cx} cy={cy} r={20} fill={C.paper} stroke={C.rule} strokeWidth={2} />
      <circle cx={cx} cy={cy} r={10} fill={tint(CONTENT.one, 0.8)} stroke={ink} strokeWidth={2} />
      <line x1={cx} y1={cy - 20} x2={cx} y2={cy - 10} stroke={CONTENT.bead} strokeWidth={3} />
      {cells.length ? cells.map((c: string, k: number) => (
        <g key={k}>
          <rect x={64 + k * (bw + 6)} y={cy - 24} width={bw} height={48} rx={8} fill="#FFFFFF" stroke={C.rule} strokeWidth={1.5} />
          <text x={64 + k * (bw + 6) + bw / 2} y={cy + 10} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={ink}>{c}</text>
        </g>
      )) : (
        <g>
          <rect x={64} y={cy - 22} width={w - 100} height={18} rx={6} fill="#FFFFFF" stroke={C.rule} strokeWidth={1.5} />
          <rect x={64} y={cy + 4} width={w - 100} height={18} rx={6} fill="#FFFFFF" stroke={C.rule} strokeWidth={1.5} />
          <text x={w - 20} y={cy + 10} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={ink}>?</text>
        </g>
      )}
    </g>
  );
}

function CodeWheel(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, format, fitHost: () => null,
      /* the board layout (LAYOUT.md §1b): the working area the whole card until the child taps Answer, the answer box and keypad in a panel */
      board: true,
      /* KEY ONLY (the new look; LAYOUT.md §1d, PATTERNS.md §16): no question bar, only its blinking key at the top right; the question
         lives only in the bubble. Kept. */
      keyOnly: true,
      /* the wide keypad (PATTERNS.md 9g): the panel is 556 wide and the picture has x 64 to 964 while it is open; the right region here
         (cards, keys, rows) stops at x 904 for a question that opens the panel. Kept. */
      bigPad: true,
      /* the Next key (PATTERNS.md 9d): nothing moves on by itself */
      nextKey: true,
      /* NAV DOTS (the new look): one small clickable dot per phase */
      navDots: true,
      /* the start page: the tool's name, StartArt, START_HOOK, a Start key */
      StartArt, START_HOOK,
      }} />
  );
}

export default CodeWheel;
