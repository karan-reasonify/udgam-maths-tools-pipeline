/* ═══ M2.S2.T3.C10.2D1 · smaller_to_bigger · tool-specific part ═══════════════════════════════
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

const TOOL_ID = "smaller_to_bigger";
const MEDIA_ID = "M2.S2.T3.C10.2D1";
const TOOL_NAME = "Left Hop Converter";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
/* kept for the tool object's shape (and the sidecar); nothing speaks from r30 */
const VOICE = {"rate":0.92,"pitch":1.06};

/* printed on the bubble before phase 1's teach lines only (the plan's opening line; not shown when phase 1 has steps) */
const OPENING = ["A measure on the chart, and a pin on its unit."];
/* the whole-tool line: printed on the summary page */
const FINISH_LINE = "You hopped left to a bigger unit, and named it.";
/* printed when the child opens Free play (the plan's free-play line); its LAST piece stays on the bubble */
const FREE_LINE = "Free play: pin a unit, hop the point to it, or tap New for another measure.";

/* THE START PAGE (runtime r28; docs/LAYOUT.md §1c, docs/PATTERNS.md §14): the first thing a child sees in user mode.
   START_HOOK is ONE printed question to wonder at (it needs a TR entry, and never gives an answer away); StartArt is
   the object the lesson is about, drawn in a 1200 x 340 box ({ box, C, lang, tx }; plain shapes in the chrome and content
   colours, a <Skin> over them when the image agent made one). This stub is a dashed outline: draw the real object. */
const START_HOOK = "How can 347 cm and 3.47 m be the same length?";
/* the unit chart with 347 cm on it, the have and want pins, and the point hopped two places left (the textbook's example) */
function StartArt({ box, C, lang, tx = (v: any) => v }: any) {
  const U = LH_SETS.len, cw = 150, x0 = (box.w - 7 * cw) / 2;
  const cx = (c: number) => x0 + c * cw + cw / 2, gx = (c: number) => x0 + (c + 1) * cw;
  const dig: any = { 3: "3", 4: "4", 5: "7" };
  return (
    <g>
      {[[5, "Have", LH_GIVEN], [3, "Want", LH_ANS]].map(([c, lab, col]: any) => <g key={lab} transform={`translate(${cx(c)},${98})`}>{lhPin(tx(lab), col, C)}</g>)}
      {U.map((u: string, c: number) => (
        <g key={u}>
          <rect x={x0 + c * cw + 5} y={102} width={cw - 10} height={56} rx={14} fill={c === 3 ? tint(LH_NOW, 0.6) : tint(C.panel, 0.4)} stroke={C.rule} strokeWidth={2} />
          <text x={cx(c)} y={144} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={LH_UNIT_INK}>{tx(u)}</text>
          {dig[c] ? (
            <g>
              <rect x={x0 + c * cw + 18} y={166} width={cw - 36} height={100} rx={16} fill={tint(LH_GIVEN, 0.85)} stroke={LH_GIVEN} strokeWidth={3} />
              <text x={cx(c)} y={240} textAnchor="middle" fontSize={T.display} fontWeight={700} fill={shade(LH_GIVEN, 0.3)}>{dig[c]}</text>
            </g>
          ) : <rect x={x0 + c * cw + 18} y={166} width={cw - 36} height={100} rx={16} fill="none" stroke={C.rule} strokeWidth={2} strokeDasharray="8 8" />}
        </g>
      ))}
      <circle cx={gx(3)} cy={252} r={13} fill={C.ink} />
      {[5, 4].map((a) => (
        <g key={a}>
          <path d={`M ${gx(a) - 4} 274 C ${gx(a) - 12} 308, ${gx(a - 1) + 12} 308, ${gx(a - 1) + 4} 280`} fill="none" stroke={LH_MOVE} strokeWidth={5} strokeLinecap="round" />
          <path d={`M ${gx(a - 1) + 3} 272 l 2 20 l 15 -9 z`} fill={LH_MOVE} />
          <text x={cx(a)} y={336} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={shade(LH_MOVE, 0.3)}>{tx("÷ 10")}</text>
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
    "Left Hop Converter": "बाईं ओर छलांग",
    "A measure on the chart, and a pin on its unit.": "चार्ट पर एक माप, और उसकी इकाई पर एक पिन।",
    "Free play: pin a unit, hop the point to it, or tap New for another measure.": "मुक्त खेल: इकाई पर पिन लगाओ, बिंदु को वहाँ तक कुदाओ, या नया दबाओ।",
    "How can 347 cm and 3.47 m be the same length?": "347 सेमी और 3.47 मी एक ही लंबाई कैसे हो सकते हैं?",
    "Count the places": "स्थान गिनो",
    "A mixed measure as one decimal": "मिश्रित माप एक दशमलव में",
    "Into two units": "दो इकाइयों में",
    "A decimal names its unit": "दशमलव के साथ उसकी इकाई",
    "Tap m on the chart to pin the unit you want.": "चाहिए वाली इकाई पर पिन लगाने के लिए चार्ट पर मी दबाओ।",
    "The want pin goes on metres here.": "यहाँ चाहिए वाली पिन मीटर पर लगेगी।",
    "Tap Hop to move the point one place left.": "बिंदु को एक स्थान बाईं ओर ले जाने के लिए छलांग दबाओ।",
    "Hop is the key under the chart.": "छलांग चार्ट के नीचे वाला बटन है।",
    "Hop once more, so the point sits after m.": "एक छलांग और लगाओ, ताकि बिंदु मी के बाद आ जाए।",
    "The point must reach the want pin.": "बिंदु को चाहिए वाली पिन तक पहुँचना है।",
    "Each hop to the left divides the number by 10.": "बाईं ओर हर छलांग संख्या को 10 से भाग देती है।",
    "Count only the steps between the two pins, not the columns they stand on.": "केवल दोनों पिनों के बीच की छलांगें गिनो, उनके नीचे के खाने नहीं।",
    "Count the places to the unit you want; each hop left divides the number by 10.": "चाहिए वाली इकाई तक स्थान गिनो; हर बाईं छलांग 10 से भाग देती है।",
    "You learned: each place to the left divides the number by 10.": "तुमने सीखा: बाईं ओर हर स्थान संख्या को 10 से भाग देता है।",
    "A garden hose is 1,285 cm long; how long is it in metres?": "बगीचे का पाइप 1,285 सेमी लंबा है; मीटर में वह कितना लंबा है?",
    "1,285 cm in m?": "1,285 सेमी कितने मी?",
    "How many places to the left of cm does m stand?": "मी, सेमी से कितने स्थान बाईं ओर है?",
    "From cm to m is two places, so hop the point twice to the left.": "सेमी से मी तक दो स्थान हैं, इसलिए बिंदु को दो बार बाईं ओर कुदाओ।",
    "Two hops divide by 100: read the digits with the point after the m column.": "दो छलांगें 100 से भाग देती हैं: मी के खाने के बाद बिंदु रखकर पढ़ो।",
    "3 places left": "3 स्थान बाएँ",
    "3 places right": "3 स्थान दाएँ",
    "4 places left": "4 स्थान बाएँ",
    "2 places left": "2 स्थान बाएँ",
    "From mL to L on the chart, how many places is it, and which way?": "चार्ट पर मिली से ली तक कितने स्थान हैं, और किस ओर?",
    "mL to L?": "मिली से ली?",
    "Pin L, then count the hops from mL.": "ली पर पिन लगाओ, फिर मिली से छलांगें गिनो।",
    "Count the gaps between the two pins, not the columns.": "दोनों पिनों के बीच की छलांगें गिनो, खाने नहीं।",
    "A bigger unit always stands to the left, so the point hops left.": "बड़ी इकाई हमेशा बाईं ओर होती है, इसलिए बिंदु बाईं ओर कूदता है।",
    "Write 90 mm in centimetres.": "90 मिमी को सेंटीमीटर में लिखो।",
    "90 mm in cm?": "90 मिमी कितने सेमी?",
    "Where does cm stand on the chart, compared with mm?": "चार्ट पर सेमी, मिमी की तुलना में कहाँ है?",
    "mm and cm stand next to each other: one hop to the left.": "मिमी और सेमी पास-पास हैं: बाईं ओर एक छलांग।",
    "One hop divides by 10; read the measure in cm.": "एक छलांग 10 से भाग देती है; माप सेमी में पढ़ो।",
    "Tap the empty place to drop a zero into it.": "खाली स्थान दबाओ और उसमें शून्य डालो।",
    "The empty place is the box with no digit.": "खाली स्थान वह खाना है जिसमें कोई अंक नहीं।",
    "Now tap Hop to move the point one place towards m.": "अब बिंदु को मी की ओर एक स्थान ले जाने के लिए छलांग दबाओ।",
    "Hop moves the point; the digits stay put.": "छलांग बिंदु को हिलाती है; अंक अपनी जगह रहते हैं।",
    "Hop again, so the point sits right after m.": "फिर छलांग लगाओ, ताकि बिंदु ठीक मी के बाद आए।",
    "Stop when the point reaches the want pin.": "जब बिंदु चाहिए वाली पिन तक पहुँचे, तब रुको।",
    "Every digit stays in its own column while the point hops.": "बिंदु कूदता है तब हर अंक अपने ही खाने में रहता है।",
    "A zero must hold each empty place between the point and the digits.": "बिंदु और अंकों के बीच हर खाली स्थान में शून्य होना चाहिए।",
    "A mixed measure becomes one decimal, with zeros holding the empty places.": "मिश्रित माप एक दशमलव बन जाता है, खाली स्थानों में शून्य रहते हैं।",
    "You learned: a zero holds an empty place after the point.": "तुमने सीखा: बिंदु के बाद खाली स्थान में शून्य रहता है।",
    "Write 8 kg 36 g in kilograms.": "8 किग्रा 36 ग्रा को किलोग्राम में लिखो।",
    "8 kg 36 g in kg?": "8 किग्रा 36 ग्रा कितने किग्रा?",
    "Is every column between the point and the 6 filled?": "क्या बिंदु और 6 के बीच का हर खाना भरा है?",
    "Hop until the point sits after kg; that is three hops.": "बिंदु किग्रा के बाद आने तक कूदो; यह तीन छलांगें हैं।",
    "Read every digit after the point in order, the grey zero too.": "बिंदु के बाद हर अंक क्रम से पढ़ो, धूसर शून्य भी।",
    "Write 5 km 408 m in kilometres.": "5 किमी 408 मी को किलोमीटर में लिखो।",
    "5 km 408 m in km?": "5 किमी 408 मी कितने किमी?",
    "Where does km stand on the chart, compared with m?": "चार्ट पर किमी, मी की तुलना में कहाँ है?",
    "km stands three columns to the left of m.": "किमी, मी से तीन खाने बाईं ओर है।",
    "Each hop divides by 10, so three hops divide by 1,000.": "हर छलांग 10 से भाग देती है, इसलिए तीन छलांगें 1,000 से।",
    "Write 7 kL 45 L as a decimal in kilolitres.": "7 किली 45 ली को किलोलीटर में दशमलव से लिखो।",
    "7 kL 45 L in kL?": "7 किली 45 ली कितने किली?",
    "Look for a column with no digit before you read.": "पढ़ने से पहले बिना अंक वाला खाना खोजो।",
    "Drop a zero into the hL place, then hop to the kL pin.": "हेली के स्थान में शून्य डालो, फिर किली की पिन तक कूदो।",
    "Read the kL digit, the point, then all three digits after it.": "किली का अंक, बिंदु, फिर उसके बाद के तीनों अंक पढ़ो।",
    "Tap the gap after m to move the Cut handle there.": "काटने का हत्था वहाँ लाने के लिए मी के बाद की जगह दबाओ।",
    "Metres end at the gap right after m.": "मीटर, मी के ठीक बाद वाली जगह पर खत्म होते हैं।",
    "Tap Cut to split the measure into metres and centimetres.": "माप को मीटर और सेंटीमीटर में बाँटने के लिए काटो दबाओ।",
    "Cut is the key under the chart.": "काटो चार्ट के नीचे वाला बटन है।",
    "Read each part in the unit of its last column.": "हर हिस्से को उसके आखिरी खाने की इकाई में पढ़ो।",
    "The cut goes right after the column of the bigger unit.": "कटाई बड़ी इकाई के खाने के ठीक बाद होती है।",
    "A measure splits at a unit's column into a bigger and a smaller unit.": "माप किसी इकाई के खाने पर एक बड़ी और एक छोटी इकाई में बँटता है।",
    "You learned: a measure splits into two units at a unit's column.": "तुमने सीखा: माप किसी इकाई के खाने पर दो इकाइयों में बँटता है।",
    "A rope is 915 cm long; write its length in metres and centimetres.": "एक रस्सी 915 सेमी लंबी है; उसकी लंबाई मीटर और सेंटीमीटर में लिखो।",
    "915 cm in m and cm?": "915 सेमी कितने मी और सेमी?",
    "Cut where the metres end, then read both parts.": "जहाँ मीटर खत्म हों वहाँ काटो, फिर दोनों हिस्से पढ़ो।",
    "The left part is whole metres; the right part is what is left in centimetres.": "बायाँ हिस्सा पूरे मीटर है; दायाँ हिस्सा बचे हुए सेंटीमीटर है।",
    "Check it: metres times 100, plus the centimetres, is the whole rope.": "जाँचो: मीटर × 100 में सेंटीमीटर जोड़ो, तो पूरी रस्सी बनती है।",
    "Write 37 dm in metres and decimetres.": "37 डेमी को मीटर और डेसीमीटर में लिखो।",
    "37 dm in m and dm?": "37 डेमी कितने मी और डेमी?",
    "Cut after m and read the decimetres on their own.": "मी के बाद काटो और डेसीमीटर अलग से पढ़ो।",
    "Each part is read in the unit of its own last column.": "हर हिस्सा अपने ही आखिरी खाने की इकाई में पढ़ा जाता है।",
    "10 dm make 1 m, so the two parts together must give back the whole length.": "10 डेमी से 1 मी बनता है, इसलिए दोनों हिस्से मिलकर पूरी लंबाई देंगे।",
    "Write 2,064 g in kilograms and grams.": "2,064 ग्रा को किलोग्राम और ग्राम में लिखो।",
    "2,064 g in kg and g?": "2,064 ग्रा कितने किग्रा और ग्रा?",
    "Cut after kg; the grams are the digits on its right.": "किग्रा के बाद काटो; उसके दाईं ओर के अंक ग्राम हैं।",
    "After the cut, read the three gram digits as one number.": "काटने के बाद ग्राम के तीनों अंक एक संख्या की तरह पढ़ो।",
    "A zero at the front of a number does not change it.": "संख्या के आगे लगा शून्य उसे नहीं बदलता।",
    "Tap the tag of the unit this decimal is in.": "यह दशमलव जिस इकाई में है, उसकी पर्ची दबाओ।",
    "Look at the unit just before the point.": "बिंदु से ठीक पहले वाली इकाई देखो।",
    "Now clip the g tag to read the same digits in grams.": "अब वही अंक ग्राम में पढ़ने के लिए ग्रा की पर्ची लगाओ।",
    "The g tag waits in the tray below.": "ग्रा की पर्ची नीचे की ट्रे में है।",
    "The unit tells you which column the point sits after.": "इकाई बताती है कि बिंदु किस खाने के बाद है।",
    "Read from the point to the last digit, zeros included.": "बिंदु से आखिरी अंक तक पढ़ो, शून्य भी।",
    "Write the unit with every decimal; the digits alone do not say how much.": "हर दशमलव के साथ इकाई लिखो; केवल अंक मात्रा नहीं बताते।",
    "You learned: the unit tells which measure a decimal is.": "तुमने सीखा: इकाई बताती है कि दशमलव कौन-सा माप है।",
    "Write the 1 L 65 mL in the flask as a decimal in litres, with its unit tag.": "फ्लास्क के 1 ली 65 मिली को पर्ची सहित लीटर में दशमलव से लिखो।",
    "1 L 65 mL in L?": "1 ली 65 मिली कितने ली?",
    "Check the empty place and the unit tag, then type the number again.": "खाली स्थान और इकाई की पर्ची जाँचो, फिर संख्या दोबारा लिखो।",
    "Fill the empty place, then hop three times to the L pin.": "खाली स्थान भरो, फिर ली की पिन तक तीन बार कूदो।",
    "Read the litres digit, the point, then all three digits after it.": "लीटर का अंक, बिंदु, फिर उसके बाद के तीनों अंक पढ़ो।",
    "Write 3 kg 7 g as a decimal in kilograms, and name the unit.": "3 किग्रा 7 ग्रा को किलोग्राम में दशमलव से लिखो, और इकाई बताओ।",
    "3 kg 7 g in kg?": "3 किग्रा 7 ग्रा कितने किग्रा?",
    "Check the columns after kg and the unit tag, then type the number again.": "किग्रा के बाद के खाने और इकाई की पर्ची जाँचो, फिर संख्या दोबारा लिखो।",
    "Fill both empty places, then hop three times to the kg pin.": "दोनों खाली स्थान भरो, फिर किग्रा की पिन तक तीन बार कूदो।",
    "After the point there must be three digits: fill each empty place.": "बिंदु के बाद तीन अंक होने चाहिए: हर खाली स्थान भरो।",
    "Yes": "हाँ",
    "No": "नहीं",
    "Are 4.3 kg and 4.3 g the same weight?": "क्या 4.3 किग्रा और 4.3 ग्रा एक ही भार हैं?",
    "4.3 kg and 4.3 g?": "4.3 किग्रा और 4.3 ग्रा?",
    "Clip each tag and see where the digits go.": "हर पर्ची लगाओ और देखो अंक कहाँ जाते हैं।",
    "The g tag moves the digits three places to the right.": "ग्रा की पर्ची अंकों को तीन स्थान दाईं ओर ले जाती है।",
    "Three places to the right makes the measure 1,000 times smaller.": "तीन स्थान दाईं ओर जाने से माप 1,000 गुना छोटा हो जाता है।",
    "Clip the unit on first.": "पहले इकाई की पर्ची लगाओ।",
    "Tap a unit in the row first.": "पहले पंक्ति में एक इकाई दबाओ।",
    "Move the cut to a gap first.": "पहले काटने का हत्था किसी जगह पर ले जाओ।",
    "Yes, 1,285 cm is 12.85 m.": "हाँ, 1,285 सेमी 12.85 मी के बराबर है।",
    "Yes, from mL to L is 3 places to the left.": "हाँ, मिली से ली तक 3 स्थान बाईं ओर है।",
    "Yes, 90 mm is 9 cm.": "हाँ, 90 मिमी 9 सेमी के बराबर है।",
    "Yes, 8 kg 36 g is 8.036 kg.": "हाँ, 8 किग्रा 36 ग्रा 8.036 किग्रा के बराबर है।",
    "Yes, 5 km 408 m is 5.408 km.": "हाँ, 5 किमी 408 मी 5.408 किमी के बराबर है।",
    "Yes, 7 kL 45 L is 7.045 kL.": "हाँ, 7 किली 45 ली 7.045 किली के बराबर है।",
    "Yes, 915 cm is 9 m 15 cm.": "हाँ, 915 सेमी 9 मी 15 सेमी के बराबर है।",
    "Yes, 37 dm is 3 m 7 dm.": "हाँ, 37 डेमी 3 मी 7 डेमी के बराबर है।",
    "Yes, 2,064 g is 2 kg 64 g.": "हाँ, 2,064 ग्रा 2 किग्रा 64 ग्रा के बराबर है।",
    "Yes, 1 L 65 mL is 1.065 L.": "हाँ, 1 ली 65 मिली 1.065 ली के बराबर है।",
    "Yes, 3 kg 7 g is 3.007 kg.": "हाँ, 3 किग्रा 7 ग्रा 3.007 किग्रा के बराबर है।",
    "No, 4.3 kg is 1,000 times as heavy as 4.3 g.": "नहीं, 4.3 किग्रा, 4.3 ग्रा से 1,000 गुना भारी है।",
    "Have": "दिया",
    "Want": "चाहिए",
    "Hop": "छलांग",
    "Cut": "काटो",
    "New": "नया",
    "÷ 10": "÷ 10",
    "km": "किमी",
    "hm": "हेमी",
    "dam": "डेकामी",
    "m": "मी",
    "dm": "डेमी",
    "cm": "सेमी",
    "mm": "मिमी",
    "kg": "किग्रा",
    "hg": "हेग्रा",
    "dag": "डेकाग्रा",
    "g": "ग्रा",
    "dg": "डेग्रा",
    "cg": "सेग्रा",
    "mg": "मिग्रा",
    "kL": "किली",
    "hL": "हेली",
    "daL": "डेकाली",
    "L": "ली",
    "dL": "डेली",
    "cL": "सेली",
    "mL": "मिली",
  },
  gu: {
    "Left Hop Converter": "ડાબી તરફ કૂદકો",
    "A measure on the chart, and a pin on its unit.": "ચાર્ટ પર એક માપ, અને તેના એકમ પર એક પિન.",
    "Free play: pin a unit, hop the point to it, or tap New for another measure.": "મુક્ત રમત: એકમ પર પિન લગાવો, બિંદુને ત્યાં સુધી કુદાવો, અથવા નવું દબાવો.",
    "How can 347 cm and 3.47 m be the same length?": "347 સેમી અને 3.47 મી એક જ લંબાઈ કેવી રીતે હોઈ શકે?",
    "Count the places": "સ્થાન ગણો",
    "A mixed measure as one decimal": "મિશ્ર માપ એક દશાંશમાં",
    "Into two units": "બે એકમોમાં",
    "A decimal names its unit": "દશાંશ સાથે તેનો એકમ",
    "Tap m on the chart to pin the unit you want.": "જોઈતા એકમ પર પિન લગાવવા ચાર્ટ પર મી દબાવો.",
    "The want pin goes on metres here.": "અહીં જોઈએ વાળી પિન મીટર પર લાગશે.",
    "Tap Hop to move the point one place left.": "બિંદુને એક સ્થાન ડાબે ખસેડવા કૂદકો દબાવો.",
    "Hop is the key under the chart.": "કૂદકો ચાર્ટ નીચેનું બટન છે.",
    "Hop once more, so the point sits after m.": "હજી એક કૂદકો મારો, જેથી બિંદુ મી પછી આવે.",
    "The point must reach the want pin.": "બિંદુએ જોઈએ વાળી પિન સુધી પહોંચવાનું છે.",
    "Each hop to the left divides the number by 10.": "ડાબી બાજુનો દરેક કૂદકો સંખ્યાને 10 વડે ભાગે છે.",
    "Count only the steps between the two pins, not the columns they stand on.": "ફક્ત બે પિન વચ્ચેના કૂદકા ગણો, તેમની નીચેનાં ખાનાં નહીં.",
    "Count the places to the unit you want; each hop left divides the number by 10.": "જોઈતા એકમ સુધી સ્થાન ગણો; દરેક ડાબો કૂદકો 10 વડે ભાગે છે.",
    "You learned: each place to the left divides the number by 10.": "તમે શીખ્યા: ડાબી બાજુનું દરેક સ્થાન સંખ્યાને 10 વડે ભાગે છે.",
    "A garden hose is 1,285 cm long; how long is it in metres?": "બગીચાની પાઇપ 1,285 સેમી લાંબી છે; મીટરમાં તે કેટલી લાંબી છે?",
    "1,285 cm in m?": "1,285 સેમી કેટલા મી?",
    "How many places to the left of cm does m stand?": "મી, સેમીથી કેટલાં સ્થાન ડાબે છે?",
    "From cm to m is two places, so hop the point twice to the left.": "સેમીથી મી સુધી બે સ્થાન છે, તેથી બિંદુને બે વાર ડાબે કુદાવો.",
    "Two hops divide by 100: read the digits with the point after the m column.": "બે કૂદકા 100 વડે ભાગે છે: મીના ખાના પછી બિંદુ રાખીને વાંચો.",
    "3 places left": "3 સ્થાન ડાબે",
    "3 places right": "3 સ્થાન જમણે",
    "4 places left": "4 સ્થાન ડાબે",
    "2 places left": "2 સ્થાન ડાબે",
    "From mL to L on the chart, how many places is it, and which way?": "ચાર્ટ પર મિલિથી લિ સુધી કેટલાં સ્થાન છે, અને કઈ બાજુ?",
    "mL to L?": "મિલિથી લિ?",
    "Pin L, then count the hops from mL.": "લિ પર પિન લગાવો, પછી મિલિથી કૂદકા ગણો.",
    "Count the gaps between the two pins, not the columns.": "બે પિન વચ્ચેના કૂદકા ગણો, ખાનાં નહીં.",
    "A bigger unit always stands to the left, so the point hops left.": "મોટો એકમ હંમેશાં ડાબે હોય છે, તેથી બિંદુ ડાબે કૂદે છે.",
    "Write 90 mm in centimetres.": "90 મિમીને સેન્ટિમીટરમાં લખો.",
    "90 mm in cm?": "90 મિમી કેટલા સેમી?",
    "Where does cm stand on the chart, compared with mm?": "ચાર્ટ પર સેમી, મિમીની સરખામણીમાં ક્યાં છે?",
    "mm and cm stand next to each other: one hop to the left.": "મિમી અને સેમી બાજુબાજુમાં છે: ડાબે એક કૂદકો.",
    "One hop divides by 10; read the measure in cm.": "એક કૂદકો 10 વડે ભાગે છે; માપ સેમીમાં વાંચો.",
    "Tap the empty place to drop a zero into it.": "ખાલી સ્થાન દબાવો અને તેમાં શૂન્ય મૂકો.",
    "The empty place is the box with no digit.": "ખાલી સ્થાન એ ખાનું છે જેમાં કોઈ અંક નથી.",
    "Now tap Hop to move the point one place towards m.": "હવે બિંદુને મી તરફ એક સ્થાન ખસેડવા કૂદકો દબાવો.",
    "Hop moves the point; the digits stay put.": "કૂદકો બિંદુને ખસેડે છે; અંક પોતાની જગ્યાએ રહે છે.",
    "Hop again, so the point sits right after m.": "ફરી કૂદકો મારો, જેથી બિંદુ બરાબર મી પછી આવે.",
    "Stop when the point reaches the want pin.": "બિંદુ જોઈએ વાળી પિન સુધી પહોંચે ત્યારે અટકો.",
    "Every digit stays in its own column while the point hops.": "બિંદુ કૂદે ત્યારે દરેક અંક પોતાના જ ખાનામાં રહે છે.",
    "A zero must hold each empty place between the point and the digits.": "બિંદુ અને અંકો વચ્ચેના દરેક ખાલી સ્થાનમાં શૂન્ય હોવું જોઈએ.",
    "A mixed measure becomes one decimal, with zeros holding the empty places.": "મિશ્ર માપ એક દશાંશ બને છે, ખાલી સ્થાનોમાં શૂન્ય રહે છે.",
    "You learned: a zero holds an empty place after the point.": "તમે શીખ્યા: બિંદુ પછીના ખાલી સ્થાનમાં શૂન્ય રહે છે.",
    "Write 8 kg 36 g in kilograms.": "8 કિગ્રા 36 ગ્રાને કિલોગ્રામમાં લખો.",
    "8 kg 36 g in kg?": "8 કિગ્રા 36 ગ્રા કેટલા કિગ્રા?",
    "Is every column between the point and the 6 filled?": "શું બિંદુ અને 6 વચ્ચેનું દરેક ખાનું ભરેલું છે?",
    "Hop until the point sits after kg; that is three hops.": "બિંદુ કિગ્રા પછી આવે ત્યાં સુધી કૂદો; એ ત્રણ કૂદકા છે.",
    "Read every digit after the point in order, the grey zero too.": "બિંદુ પછીનો દરેક અંક ક્રમમાં વાંચો, રાખોડી શૂન્ય પણ.",
    "Write 5 km 408 m in kilometres.": "5 કિમી 408 મીને કિલોમીટરમાં લખો.",
    "5 km 408 m in km?": "5 કિમી 408 મી કેટલા કિમી?",
    "Where does km stand on the chart, compared with m?": "ચાર્ટ પર કિમી, મીની સરખામણીમાં ક્યાં છે?",
    "km stands three columns to the left of m.": "કિમી, મીથી ત્રણ ખાનાં ડાબે છે.",
    "Each hop divides by 10, so three hops divide by 1,000.": "દરેક કૂદકો 10 વડે ભાગે છે, તેથી ત્રણ કૂદકા 1,000 વડે.",
    "Write 7 kL 45 L as a decimal in kilolitres.": "7 કિલિ 45 લિને કિલોલિટરમાં દશાંશ તરીકે લખો.",
    "7 kL 45 L in kL?": "7 કિલિ 45 લિ કેટલા કિલિ?",
    "Look for a column with no digit before you read.": "વાંચતાં પહેલાં અંક વગરનું ખાનું શોધો.",
    "Drop a zero into the hL place, then hop to the kL pin.": "હેલિના સ્થાનમાં શૂન્ય મૂકો, પછી કિલિની પિન સુધી કૂદો.",
    "Read the kL digit, the point, then all three digits after it.": "કિલિનો અંક, બિંદુ, પછી તેના પછીના ત્રણેય અંક વાંચો.",
    "Tap the gap after m to move the Cut handle there.": "કાપવાનો હાથો ત્યાં લાવવા મી પછીની જગ્યા દબાવો.",
    "Metres end at the gap right after m.": "મીટર, મી પછીની જગ્યાએ પૂરા થાય છે.",
    "Tap Cut to split the measure into metres and centimetres.": "માપને મીટર અને સેન્ટિમીટરમાં વહેંચવા કાપો દબાવો.",
    "Cut is the key under the chart.": "કાપો ચાર્ટ નીચેનું બટન છે.",
    "Read each part in the unit of its last column.": "દરેક ભાગને તેના છેલ્લા ખાનાના એકમમાં વાંચો.",
    "The cut goes right after the column of the bigger unit.": "કાપ મોટા એકમના ખાના પછી તરત આવે છે.",
    "A measure splits at a unit's column into a bigger and a smaller unit.": "માપ કોઈ એકમના ખાના પાસે એક મોટા અને એક નાના એકમમાં વહેંચાય છે.",
    "You learned: a measure splits into two units at a unit's column.": "તમે શીખ્યા: માપ કોઈ એકમના ખાના પાસે બે એકમોમાં વહેંચાય છે.",
    "A rope is 915 cm long; write its length in metres and centimetres.": "એક દોરડું 915 સેમી લાંબું છે; તેની લંબાઈ મીટર અને સેન્ટિમીટરમાં લખો.",
    "915 cm in m and cm?": "915 સેમી કેટલા મી અને સેમી?",
    "Cut where the metres end, then read both parts.": "જ્યાં મીટર પૂરા થાય ત્યાં કાપો, પછી બંને ભાગ વાંચો.",
    "The left part is whole metres; the right part is what is left in centimetres.": "ડાબો ભાગ પૂરા મીટર છે; જમણો ભાગ બાકી રહેલા સેન્ટિમીટર છે.",
    "Check it: metres times 100, plus the centimetres, is the whole rope.": "ચકાસો: મીટર × 100 માં સેન્ટિમીટર ઉમેરો, તો આખું દોરડું બને.",
    "Write 37 dm in metres and decimetres.": "37 ડેમીને મીટર અને ડેસિમીટરમાં લખો.",
    "37 dm in m and dm?": "37 ડેમી કેટલા મી અને ડેમી?",
    "Cut after m and read the decimetres on their own.": "મી પછી કાપો અને ડેસિમીટર અલગથી વાંચો.",
    "Each part is read in the unit of its own last column.": "દરેક ભાગ પોતાના જ છેલ્લા ખાનાના એકમમાં વંચાય છે.",
    "10 dm make 1 m, so the two parts together must give back the whole length.": "10 ડેમીથી 1 મી બને છે, તેથી બંને ભાગ મળીને આખી લંબાઈ આપશે.",
    "Write 2,064 g in kilograms and grams.": "2,064 ગ્રાને કિલોગ્રામ અને ગ્રામમાં લખો.",
    "2,064 g in kg and g?": "2,064 ગ્રા કેટલા કિગ્રા અને ગ્રા?",
    "Cut after kg; the grams are the digits on its right.": "કિગ્રા પછી કાપો; તેની જમણી બાજુના અંક ગ્રામ છે.",
    "After the cut, read the three gram digits as one number.": "કાપ્યા પછી ગ્રામના ત્રણેય અંક એક સંખ્યા તરીકે વાંચો.",
    "A zero at the front of a number does not change it.": "સંખ્યાની આગળનું શૂન્ય તેને બદલતું નથી.",
    "Tap the tag of the unit this decimal is in.": "આ દશાંશ જે એકમમાં છે, તેની ચિઠ્ઠી દબાવો.",
    "Look at the unit just before the point.": "બિંદુની બરાબર પહેલાંનો એકમ જુઓ.",
    "Now clip the g tag to read the same digits in grams.": "હવે એ જ અંક ગ્રામમાં વાંચવા ગ્રાની ચિઠ્ઠી લગાવો.",
    "The g tag waits in the tray below.": "ગ્રાની ચિઠ્ઠી નીચેની ટ્રેમાં છે.",
    "The unit tells you which column the point sits after.": "એકમ કહે છે કે બિંદુ કયા ખાના પછી છે.",
    "Read from the point to the last digit, zeros included.": "બિંદુથી છેલ્લા અંક સુધી વાંચો, શૂન્ય સાથે.",
    "Write the unit with every decimal; the digits alone do not say how much.": "દરેક દશાંશ સાથે એકમ લખો; એકલા અંક કેટલું છે તે કહેતા નથી.",
    "You learned: the unit tells which measure a decimal is.": "તમે શીખ્યા: એકમ કહે છે કે દશાંશ કયું માપ છે.",
    "Write the 1 L 65 mL in the flask as a decimal in litres, with its unit tag.": "ફ્લાસ્કના 1 લિ 65 મિલિને લિટરમાં દશાંશ તરીકે લખો, એકમની ચિઠ્ઠી સાથે.",
    "1 L 65 mL in L?": "1 લિ 65 મિલિ કેટલા લિ?",
    "Check the empty place and the unit tag, then type the number again.": "ખાલી સ્થાન અને એકમની ચિઠ્ઠી તપાસો, પછી સંખ્યા ફરી લખો.",
    "Fill the empty place, then hop three times to the L pin.": "ખાલી સ્થાન ભરો, પછી લિની પિન સુધી ત્રણ વાર કૂદો.",
    "Read the litres digit, the point, then all three digits after it.": "લિટરનો અંક, બિંદુ, પછી તેના પછીના ત્રણેય અંક વાંચો.",
    "Write 3 kg 7 g as a decimal in kilograms, and name the unit.": "3 કિગ્રા 7 ગ્રાને કિલોગ્રામમાં દશાંશ તરીકે લખો, અને એકમ જણાવો.",
    "3 kg 7 g in kg?": "3 કિગ્રા 7 ગ્રા કેટલા કિગ્રા?",
    "Check the columns after kg and the unit tag, then type the number again.": "કિગ્રા પછીનાં ખાનાં અને એકમની ચિઠ્ઠી તપાસો, પછી સંખ્યા ફરી લખો.",
    "Fill both empty places, then hop three times to the kg pin.": "બંને ખાલી સ્થાન ભરો, પછી કિગ્રાની પિન સુધી ત્રણ વાર કૂદો.",
    "After the point there must be three digits: fill each empty place.": "બિંદુ પછી ત્રણ અંક હોવા જોઈએ: દરેક ખાલી સ્થાન ભરો.",
    "Yes": "હા",
    "No": "ના",
    "Are 4.3 kg and 4.3 g the same weight?": "શું 4.3 કિગ્રા અને 4.3 ગ્રા એકસરખું વજન છે?",
    "4.3 kg and 4.3 g?": "4.3 કિગ્રા અને 4.3 ગ્રા?",
    "Clip each tag and see where the digits go.": "દરેક ચિઠ્ઠી લગાવો અને જુઓ અંક ક્યાં જાય છે.",
    "The g tag moves the digits three places to the right.": "ગ્રાની ચિઠ્ઠી અંકોને ત્રણ સ્થાન જમણે લઈ જાય છે.",
    "Three places to the right makes the measure 1,000 times smaller.": "ત્રણ સ્થાન જમણે જવાથી માપ 1,000 ગણું નાનું થઈ જાય છે.",
    "Clip the unit on first.": "પહેલાં એકમની ચિઠ્ઠી લગાવો.",
    "Tap a unit in the row first.": "પહેલાં હરોળમાં એક એકમ દબાવો.",
    "Move the cut to a gap first.": "પહેલાં કાપવાનો હાથો કોઈ જગ્યાએ લઈ જાઓ.",
    "Yes, 1,285 cm is 12.85 m.": "હા, 1,285 સેમી બરાબર 12.85 મી.",
    "Yes, from mL to L is 3 places to the left.": "હા, મિલિથી લિ સુધી 3 સ્થાન ડાબે છે.",
    "Yes, 90 mm is 9 cm.": "હા, 90 મિમી બરાબર 9 સેમી.",
    "Yes, 8 kg 36 g is 8.036 kg.": "હા, 8 કિગ્રા 36 ગ્રા બરાબર 8.036 કિગ્રા.",
    "Yes, 5 km 408 m is 5.408 km.": "હા, 5 કિમી 408 મી બરાબર 5.408 કિમી.",
    "Yes, 7 kL 45 L is 7.045 kL.": "હા, 7 કિલિ 45 લિ બરાબર 7.045 કિલિ.",
    "Yes, 915 cm is 9 m 15 cm.": "હા, 915 સેમી બરાબર 9 મી 15 સેમી.",
    "Yes, 37 dm is 3 m 7 dm.": "હા, 37 ડેમી બરાબર 3 મી 7 ડેમી.",
    "Yes, 2,064 g is 2 kg 64 g.": "હા, 2,064 ગ્રા બરાબર 2 કિગ્રા 64 ગ્રા.",
    "Yes, 1 L 65 mL is 1.065 L.": "હા, 1 લિ 65 મિલિ બરાબર 1.065 લિ.",
    "Yes, 3 kg 7 g is 3.007 kg.": "હા, 3 કિગ્રા 7 ગ્રા બરાબર 3.007 કિગ્રા.",
    "No, 4.3 kg is 1,000 times as heavy as 4.3 g.": "ના, 4.3 કિગ્રા, 4.3 ગ્રા કરતાં 1,000 ગણું ભારે છે.",
    "Have": "આપેલ",
    "Want": "જોઈએ",
    "Hop": "કૂદકો",
    "Cut": "કાપો",
    "New": "નવું",
    "÷ 10": "÷ 10",
    "km": "કિમી",
    "hm": "હેમી",
    "dam": "ડેકામી",
    "m": "મી",
    "dm": "ડેમી",
    "cm": "સેમી",
    "mm": "મિમી",
    "kg": "કિગ્રા",
    "hg": "હેગ્રા",
    "dag": "ડેકાગ્રા",
    "g": "ગ્રા",
    "dg": "ડેગ્રા",
    "cg": "સેગ્રા",
    "mg": "મિગ્રા",
    "kL": "કિલિ",
    "hL": "હેલિ",
    "daL": "ડેકાલિ",
    "L": "લિ",
    "dL": "ડેલિ",
    "cL": "સેલિ",
    "mL": "મિલિ",
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
    concept: "Count the places",
    conceptId: "M2.S2.T3.C10", objectiveIds: ["O3"],
    says: ["Pin the unit you want. How many places away is it?"],
    /* the steps work a warm-up, 734 cm to m (LH_WARM[1]); question 1 then opens fresh */
    steps: [
      { say: "Tap m on the chart to pin the unit you want.", on: "col-m", hint: "The want pin goes on metres here." },
      { say: "Tap Hop to move the point one place left.", on: "hop", hint: "Hop is the key under the chart." },
      { say: "Hop once more, so the point sits after m.", on: "hop", hint: "The point must reach the want pin." },
    ],
    ladder: ["Each hop to the left divides the number by 10.", "Count only the steps between the two pins, not the columns they stand on."],
    closing: "Count the places to the unit you want; each hop left divides the number by 10.",
    learned: "You learned: each place to the left divides the number by 10.",
    traceback: "The pins light amber, the point goes back to the unit you have and hops left one place at a time to the want pin, ending on the measure in green.",
    items: [
      /* learn SB1: answer in the plan = 12.85 m. A garden hose is 1285 cm long. How long is it in metres? */
      { qid: "M2.S2.T3.C10:SB1", kind: "hop", set: "len", num: "1285", have: "cm", goal: "m", giv: [[1285, "cm"]], near: "128500",
        say: "A garden hose is 1,285 cm long; how long is it in metres?", ask: "1,285 cm in m?", answer: "12.85",
        miss: "How many places to the left of cm does m stand?",
        ladder: ["From cm to m is two places, so hop the point twice to the left.", "Two hops divide by 100: read the digits with the point after the m column."] },
      /* practice 1: answer in the plan = Three places to the left */
      { qid: "M2.S2.T3.C10:1", kind: "count", set: "cap", num: "", have: "mL", goal: "L", near: "3right",
        choices: [{ id: "3left", label: "3 places left" }, { id: "3right", label: "3 places right" }, { id: "4left", label: "4 places left" }, { id: "2left", label: "2 places left" }],
        say: "From mL to L on the chart, how many places is it, and which way?", ask: "mL to L?", answer: "3left",
        miss: "Pin L, then count the hops from mL.",
        ladder: ["Count the gaps between the two pins, not the columns.", "A bigger unit always stands to the left, so the point hops left."] },
      /* practice 2: answer in the plan = 9 cm */
      { qid: "M2.S2.T3.C10:2", kind: "hop", set: "len", num: "90", have: "mm", goal: "cm", giv: [[90, "mm"]], near: "900",
        say: "Write 90 mm in centimetres.", ask: "90 mm in cm?", answer: "9",
        miss: "Where does cm stand on the chart, compared with mm?",
        ladder: ["mm and cm stand next to each other: one hop to the left.", "One hop divides by 10; read the measure in cm."] },
    ],
  },
  {
    n: 2,
    concept: "A mixed measure as one decimal",
    conceptId: "M2.S2.T3.C11", objectiveIds: ["O3"],
    says: ["Where does the point go? Is any place empty?"],
    /* the steps work a warm-up, 6 m 4 cm to m (LH_WARM[2]); question 1 then opens fresh */
    steps: [
      { say: "Tap the empty place to drop a zero into it.", on: "fill-dm", hint: "The empty place is the box with no digit." },
      { say: "Now tap Hop to move the point one place towards m.", on: "hop", hint: "Hop moves the point; the digits stay put." },
      { say: "Hop again, so the point sits right after m.", on: "hop", hint: "Stop when the point reaches the want pin." },
    ],
    ladder: ["Every digit stays in its own column while the point hops.", "A zero must hold each empty place between the point and the digits."],
    closing: "A mixed measure becomes one decimal, with zeros holding the empty places.",
    learned: "You learned: a zero holds an empty place after the point.",
    traceback: "The pins light amber, the point hops from the smaller unit to the bigger one, a grey zero drops into each empty place, and the decimal turns green.",
    items: [
      /* learn SB2: answer in the plan = 8.036 kg. */
      { qid: "M2.S2.T3.C11:SB2", kind: "hop", set: "mass", num: "8036", have: "g", want0: "kg", goal: "kg", empty: ["hg"], giv: [[8, "kg"], [36, "g"]], near: "8.36",
        say: "Write 8 kg 36 g in kilograms.", ask: "8 kg 36 g in kg?", answer: "8.036",
        miss: "Is every column between the point and the 6 filled?",
        ladder: ["Hop until the point sits after kg; that is three hops.", "Read every digit after the point in order, the grey zero too."] },
      /* practice 4: answer in the plan = 5.408 km */
      { qid: "M2.S2.T3.C11:4", kind: "hop", set: "len", num: "5408", have: "m", want0: "km", goal: "km", giv: [[5, "km"], [408, "m"]], near: "54.08",
        say: "Write 5 km 408 m in kilometres.", ask: "5 km 408 m in km?", answer: "5.408",
        miss: "Where does km stand on the chart, compared with m?",
        ladder: ["km stands three columns to the left of m.", "Each hop divides by 10, so three hops divide by 1,000."] },
      /* practice 8: answer in the plan = 7.045 kL */
      { qid: "M2.S2.T3.C11:8", kind: "hop", set: "cap", num: "7045", have: "L", want0: "kL", goal: "kL", empty: ["hL"], giv: [[7, "kL"], [45, "L"]], near: "7.45",
        say: "Write 7 kL 45 L as a decimal in kilolitres.", ask: "7 kL 45 L in kL?", answer: "7.045",
        miss: "Look for a column with no digit before you read.",
        ladder: ["Drop a zero into the hL place, then hop to the kL pin.", "Read the kL digit, the point, then all three digits after it."] },
    ],
  },
  {
    n: 3,
    concept: "Into two units",
    conceptId: "M2.S2.T3.C12", objectiveIds: ["O4"],
    says: ["Cut it where the metres end. What is left in centimetres?"],
    /* the steps work a warm-up, 427 cm (LH_WARM[3]); question 1 then opens fresh */
    steps: [
      { say: "Tap the gap after m to move the Cut handle there.", on: "gap-m", hint: "Metres end at the gap right after m." },
      { say: "Tap Cut to split the measure into metres and centimetres.", on: "cut", hint: "Cut is the key under the chart." },
    ],
    ladder: ["Read each part in the unit of its last column.", "The cut goes right after the column of the bigger unit."],
    closing: "A measure splits at a unit's column into a bigger and a smaller unit.",
    learned: "You learned: a measure splits into two units at a unit's column.",
    traceback: "The Cut handle slides to the gap after the bigger unit's column, the row splits in two, and both parts turn green with their unit tags.",
    items: [
      /* learn SB3: answer in the plan = 9 m 15 cm. A rope is 915 cm long. Write its length in metres and centimetres. */
      { qid: "M2.S2.T3.C12:SB3", kind: "cut", set: "len", num: "915", have: "cm", goal: "m", giv: [[915, "cm"]], near: "91|5",
        parts: [{ label: "m" }, { label: "cm" }], answer: [9, 15],
        say: "A rope is 915 cm long; write its length in metres and centimetres.", ask: "915 cm in m and cm?",
        miss: "Cut where the metres end, then read both parts.",
        ladder: ["The left part is whole metres; the right part is what is left in centimetres.", "Check it: metres times 100, plus the centimetres, is the whole rope."] },
      /* practice 3: answer in the plan = 3 m 7 dm */
      { qid: "M2.S2.T3.C12:3", kind: "cut", set: "len", num: "37", have: "dm", goal: "m", giv: [[37, "dm"]], near: "0|37",
        parts: [{ label: "m" }, { label: "dm" }], answer: [3, 7],
        say: "Write 37 dm in metres and decimetres.", ask: "37 dm in m and dm?",
        miss: "Cut after m and read the decimetres on their own.",
        ladder: ["Each part is read in the unit of its own last column.", "10 dm make 1 m, so the two parts together must give back the whole length."] },
      /* practice 7: answer in the plan = 2 kg 64 g */
      { qid: "M2.S2.T3.C12:7", kind: "cut", set: "mass", num: "2064", have: "g", goal: "kg", giv: [[2064, "g"]], near: "206|4",
        parts: [{ label: "kg" }, { label: "g" }], answer: [2, 64],
        say: "Write 2,064 g in kilograms and grams.", ask: "2,064 g in kg and g?",
        miss: "Cut after kg; the grams are the digits on its right.",
        ladder: ["After the cut, read the three gram digits as one number.", "A zero at the front of a number does not change it."] },
    ],
  },
  {
    n: 4,
    concept: "A decimal names its unit",
    conceptId: "M2.S2.T3.C13", objectiveIds: ["O4"],
    says: ["Which unit is this decimal in? Clip it on."],
    /* the steps work on a built decimal (1.5 kg, the plan's own third rung): clip its tag, then the g tag moves the same digits */
    steps: [
      { say: "Tap the tag of the unit this decimal is in.", on: "tag-kg", hint: "Look at the unit just before the point." },
      { say: "Now clip the g tag to read the same digits in grams.", on: "tag-g", hint: "The g tag waits in the tray below." },
    ],
    stepHold: 2300,
    ladder: ["The unit tells you which column the point sits after.", "Read from the point to the last digit, zeros included."],
    closing: "Write the unit with every decimal; the digits alone do not say how much.",
    learned: "You learned: the unit tells which measure a decimal is.",
    traceback: "The point hops to the unit asked for, the empty places get their zeros and the unit tag clips on in green; for the two weights each tag is clipped in turn and the digits move three places.",
    items: [
      /* learn SB4: answer in the plan = 1.065 L. A flask holds 1 L 65 mL. Write it as a decimal in litres, and say why the unit must be written. */
      { qid: "M2.S2.T3.C13:SB4", kind: "hop", set: "cap", num: "1065", have: "mL", want0: "L", goal: "L", empty: ["dL"], tray: ["L", "mL"], tagged: true, giv: [[1, "L"], [65, "mL"]], near: "1.65",
        say: "Write the 1 L 65 mL in the flask as a decimal in litres, with its unit tag.", ask: "1 L 65 mL in L?", answer: "1.065",
        miss: "Check the empty place and the unit tag, then type the number again.",
        ladder: ["Fill the empty place, then hop three times to the L pin.", "Read the litres digit, the point, then all three digits after it."] },
      /* practice 5: answer in the plan = 3.007 kg */
      { qid: "M2.S2.T3.C13:5", kind: "hop", set: "mass", num: "3007", have: "g", want0: "kg", goal: "kg", empty: ["hg", "dag"], tray: ["kg", "g"], tagged: true, giv: [[3, "kg"], [7, "g"]], near: "3.007 g",
        say: "Write 3 kg 7 g as a decimal in kilograms, and name the unit.", ask: "3 kg 7 g in kg?", answer: "3.007",
        miss: "Check the columns after kg and the unit tag, then type the number again.",
        ladder: ["Fill both empty places, then hop three times to the kg pin.", "After the point there must be three digits: fill each empty place."] },
      /* practice 6: answer in the plan = No. 4.3 kg is 4300 g, but 4.3 g is a small pinch. The unit tells which */
      { qid: "M2.S2.T3.C13:6", kind: "tag", set: "mass", num: "43", last: "hg", pt: "kg", tray: ["kg", "g"], giv: [[4.3, "kg"], [4.3, "g"]], near: "yes",
        choices: [{ id: "yes", label: "Yes" }, { id: "no", label: "No" }],
        say: "Are 4.3 kg and 4.3 g the same weight?", ask: "4.3 kg and 4.3 g?", answer: "no",
        miss: "Clip each tag and see where the digits go.",
        ladder: ["The g tag moves the digits three places to the right.", "Three places to the right makes the measure 1,000 times smaller."] },
    ],
  },
];

/* The numbers, rows, sizes and targets the working area needs (they go into the sidecar too). */
/* the chart: seven columns, kilo to milli, the base unit in the middle (one set a measure) */
const LH_SETS: any = {
  len: ["km", "hm", "dam", "m", "dm", "cm", "mm"],
  mass: ["kg", "hg", "dag", "g", "dg", "cg", "mg"],
  cap: ["kL", "hL", "daL", "L", "dL", "cL", "mL"],
};
/* the oracle's own route: each unit's worth in the smallest unit of its set (never the column index Work uses) */
const LH_F: any = { km: 1e6, hm: 1e5, dam: 1e4, m: 1e3, dm: 100, cm: 10, mm: 1, kg: 1e6, hg: 1e5, dag: 1e4, g: 1e3, dg: 100, cg: 10, mg: 1,
  kL: 1e6, hL: 1e5, daL: 1e4, L: 1e3, dL: 100, cL: 10, mL: 1 };
/* the chapter's content colours: given (deep blue), answer (green), move (vermilion), unit (violet), now (amber), place holder (grey) */
const LH_GIVEN = "#0072B2", LH_ANS = "#009E73", LH_MOVE = "#D55E00", LH_UNIT = "#8A63B8", LH_UNIT_INK = "#4F2E7A", LH_NOW = "#E69F00", LH_HOLD = "#767676";
/* each phase's guide steps work a warm-up measure, never question 1's own (no warm-up is any question's answer):
   734 cm to m, 6 m 4 cm to m, 427 cm cut into m and cm, and a built 1.5 kg (the plan's own third rung: a decimal in kilograms) */
const LH_WARM: any = {
  1: { kind: "hop", set: "len", num: "734", have: "cm" },
  2: { kind: "hop", set: "len", num: "604", have: "cm", want0: "m", empty: ["dm"] },
  3: { kind: "cut", set: "len", num: "427", have: "cm" },
  4: { kind: "tag", set: "mass", num: "15", last: "hg", pt: "kg", tray: ["kg", "g"] },
};
/* free play: New brings the next measure */
const LH_FREE = [
  { kind: "hop", set: "len", num: "1285", have: "cm" },
  { kind: "hop", set: "mass", num: "8036", have: "g" },
  { kind: "hop", set: "cap", num: "2750", have: "mL" },
  { kind: "hop", set: "len", num: "5408", have: "m" },
];
const LH_KEY: any = { hop: "Hop", cut: "Cut", new: "New" };
const lhCol = (M: any, u: string) => LH_SETS[M.set].indexOf(u);
const lhLast = (M: any) => lhCol(M, M.last || M.have);
const lhPt0 = (M: any) => lhCol(M, M.pt || M.last || M.have);
/* the digit the measure puts in column c (null where it has none): its last digit stands in column lhLast */
const lhDigit = (M: any, c: number) => { const k = M.num.length - 1 - (lhLast(M) - c); return k >= 0 && k < M.num.length ? M.num[k] : null; };
const lhNum = (x: number) => (x >= 1000 ? indian(x) : String(x));
/* the measure the question gives, written out ("8 kg 36 g") */
function lhGiv(I: any, tx: any) {
  if (I.kind === "count") return tx(I.have) + " → " + tx(I.goal);
  return (I.giv || []).map(([x, u]: any) => lhNum(x) + " " + tx(u)).join(I.kind === "tag" ? " · " : " ");
}
/* the answer written out ("12.85 m", "9 m 15 cm", "3 places left"): the value given, or the item's own answer */
function lhShow(I: any, tx: any, v?: any) {
  const has = v !== undefined && v !== null && v !== "";
  if (I.parts) { const [a, b] = has ? slotPartsOf(v, 2) : I.answer.map(String); return a + " " + tx(I.parts[0].label) + " " + b + " " + tx(I.parts[1].label); }
  if (I.choices) { const id = has ? String(v) : I.answer; const c = I.choices.find((x: any) => x.id === id) || {}; return tx(c.label || ""); }
  return String(has ? v : I.answer) + " " + tx(I.goal);
}
/* the drawn pin, round its foot (0,0): a flag with its name on a stick */
function lhPin(label: string, col: string, C: any) {
  return (
    <g pointerEvents="none">
      <line x1={0} y1={-50} x2={0} y2={0} stroke={C.ink} strokeWidth={4} strokeLinecap="round" />
      <circle cx={0} cy={0} r={6} fill={C.ink} />
      <rect x={-54} y={-98} width={108} height={48} rx={12} fill={tint(col, 0.82)} stroke={col} strokeWidth={3} />
      <text x={0} y={-63} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={shade(col, 0.35)}>{label}</text>
    </g>
  );
}
/* a label's width: every letter and spacing vowel sign counts; only the zero-advance marks are skipped (PATTERNS §18) */
const LH_ZERO = /[ऀ-ं़ु-ै्॑-ॗॢॣઁં઼ુ-ૈ્ૢૣ]/g;
/* its width in em: a Devanagari letter or sign about 0.66, a Gujarati one about 0.46, anything else 0.62 (measured on the hi and gu
   heads in Poppins and the device's Gujarati) */
const lhEm = (t: any) => Array.from(String(t).replace(LH_ZERO, "")).reduce((a: number, ch: string) => {
  const c = ch.charCodeAt(0);
  return a + (c >= 0x0900 && c <= 0x097f ? 0.66 : c >= 0x0a80 && c <= 0x0aff ? 0.46 : 0.62);
}, 0);
/* the biggest size up to `max` at which `t` fits `w`, never under the 32 floor */
const lhFit = (t: any, w: number, max: number) => Math.max(T.label, Math.min(max, Math.floor(w / Math.max(0.62, lhEm(t)))));
/* a unit tag, round its centre */
function lhTag(label: string, col: string, ink: string) {
  return (
    <g pointerEvents="none">
      <rect x={-46} y={-30} width={92} height={60} rx={12} fill={tint(col, 0.85)} stroke={col} strokeWidth={3} />
      <text x={0} y={12} textAnchor="middle" fontSize={lhFit(label, 92 - 14, T.label + 4)} fontWeight={700} fill={ink}>{label}</text>
    </g>
  );
}
function lhInit(M: any, mk: string) {
  return { mk, want: M.want0 || null, pt: lhPt0(M), arrows: [] as number[], fills: {} as any, cut: lhLast(M), cutDone: false,
    tag: null as any, off: 0, lit: false, read: null as any, done: false, busy: null as any, told: false, trayLit: false };
}
/* the picture at the right answer (the win, and the end of a traceback) */
function lhRight(M: any, tx: any) {
  const read = M.answer !== undefined ? lhShow(M, tx) : null;
  if (M.kind === "cut") return { cut: lhCol(M, M.goal), cutDone: true, read, done: true };
  if (M.kind === "tag") return { read, done: true };
  const h = lhCol(M, M.have), g = lhCol(M, M.goal), arrows: number[] = [], fills: any = {};
  for (let a = h; a > g; a--) arrows.push(a);
  (M.empty || []).forEach((u: string) => { fills[u] = true; });
  if (M.tagged) return { want: M.goal, pt: g, arrows, fills, tag: M.goal, read, done: true };
  return { want: M.goal, pt: g, arrows, fills, read, done: true };
}

/* one win line a question, each a literal (so TR can carry it) */
function lhWin(api: any, q: string) {
  if (q === "M2.S2.T3.C10:SB1") api.say("Yes, 1,285 cm is 12.85 m.");
  else if (q === "M2.S2.T3.C10:1") api.say("Yes, from mL to L is 3 places to the left.");
  else if (q === "M2.S2.T3.C10:2") api.say("Yes, 90 mm is 9 cm.");
  else if (q === "M2.S2.T3.C11:SB2") api.say("Yes, 8 kg 36 g is 8.036 kg.");
  else if (q === "M2.S2.T3.C11:4") api.say("Yes, 5 km 408 m is 5.408 km.");
  else if (q === "M2.S2.T3.C11:8") api.say("Yes, 7 kL 45 L is 7.045 kL.");
  else if (q === "M2.S2.T3.C12:SB3") api.say("Yes, 915 cm is 9 m 15 cm.");
  else if (q === "M2.S2.T3.C12:3") api.say("Yes, 37 dm is 3 m 7 dm.");
  else if (q === "M2.S2.T3.C12:7") api.say("Yes, 2,064 g is 2 kg 64 g.");
  else if (q === "M2.S2.T3.C13:SB4") api.say("Yes, 1 L 65 mL is 1.065 L.");
  else if (q === "M2.S2.T3.C13:5") api.say("Yes, 3 kg 7 g is 3.007 kg.");
  else if (q === "M2.S2.T3.C13:6") api.say("No, 4.3 kg is 1,000 times as heavy as 4.3 g.");
}

const MODEL = { sets: LH_SETS, warmUp: LH_WARM, freePlay: LH_FREE };

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* judge: a decimal is right in any written form of the same number with digits both sides of the point
   (3.04 = 3.040, as the book says); two units through the boxes; a choice by its id */
const judge = (item: any, v: any) => {
  if (item.parts) return judgeSlotParts(item, v);
  if (item.choices) return String(v).trim().toLowerCase() === String(item.answer).toLowerCase();
  /* phase 4 sends the clipped tag with the number when it is not the unit asked for ("1.065 mL"): that is a miss */
  const m = /^(\d+(?:\.\d+)?)(?:\s+(\S+))?$/.exec(String(v ?? "").trim());
  return !!m && (!m[2] || m[2] === item.goal) && Math.abs(Number(m[1]) - Number(item.answer)) < 1e-9;
};
/* oracle: every answer re-derived from the given measure through each unit's worth (LH_F), not the chart's columns */
const oracle = () => PHASES.every((p: any) => p.items.every((it: any) => {
  const F = (u: string) => LH_F[u];
  if (it.kind === "count") {
    const k = Math.round(Math.log10(F(it.goal) / F(it.have)));
    return it.answer === Math.abs(k) + (k > 0 ? "left" : "right");
  }
  const tot = (it.giv || []).reduce((a: number, [x, u]: any) => a + x * F(u), 0);
  if (it.kind === "tag") return it.answer === (Math.abs(tot - 2 * it.giv[0][0] * F(it.giv[0][1])) < 1e-9 ? "yes" : "no");
  if (Math.abs(Number(it.num) * F(it.have) - tot) > 1e-9) return false;
  if (it.kind === "cut") {
    const big = Math.floor(tot / F(it.goal)), rest = (tot - big * F(it.goal)) / F(it.have);
    return it.answer[0] === big && it.answer[1] === rest;
  }
  return Math.abs(tot / F(it.goal) - Number(it.answer)) < 1e-9;
}));
/* the most likely wrong answer (the item's misconception: x 100 for / 100, the missing zero, a cut one gap off) */
const nearMiss = (item: any) => item.near;
/* the forms of an answer that no question, hint or ladder line may print */
const answerForms = (item: any) => (item.parts || item.kind === "count" ? [lhShow(item, (x: any) => x)]
  : item.choices ? []
  : /\./.test(String(item.answer)) ? [String(item.answer), speakable(item.answer)] : [lhShow(item, (x: any) => x)]);
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => item.answer;

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => (T.state().stage === "demo" ? HOOK.demo && HOOK.demo() : T.submit(item.answer));
/* the agent's answer(): a decimal in ONE box keeps its point (toolApi.answer strips it), so it is typed as written */
const answer = (item: any, v: any) => (!item.parts && !item.choices && HOOK.type ? (HOOK.type(String(v)), true) : undefined);
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
   stage === "free" is Free play (the plan's writeup.freePlay): no target, every control unlocked.
   Sound effects where the picture moves: api.sfx.cut() (a knife), settle() (pieces come to rest),
   trade() (pieces close into one), tick() (a snap); correct, wrong, win and cheer are the runtime's.
   step / stepOn: the guide step the child is on and the act it waits for (null outside a steps phase).
   nextKey: true (the ToolFrame below, runtime r48+): nothing moves on by itself. After a right answer the win picture
   stays on the board until the child presses the blinking Next key, so never reset it on a timer (PATTERNS.md 9d).
   A SKIN (docs/IMAGES.md, docs/PATTERNS.md §14): when the slot has an images.tsx, draw <Skin name x y w h clip /> over
   the plain shape the tool already draws for the object (the plain shape stays the fallback); never a raster tag of your own here (no-raster-in-tool).
   */
function Work({ phase, n, item, index, stage, wrong, typed, api, MODEL, step, stepOn, box, lang = "en", tx = (v: any) => v }: any) {
  /* every English word the picture draws goes through tx("...") */
  const C = api.C;
  const tl = useTimeline();
  const free = stage === "free", demo = stage === "demo";
  const [fi, setFi] = useState(0);
  /* a phase opens on "teach" for one frame before "demo": the warm-up is drawn from that frame on (PATTERNS §18) */
  const warm = (demo || stage === "teach") && LH_WARM[n];
  /* the measure on the chart: free play's own, the phase's warm-up during its steps, else the question's (fresh at ask) */
  const M: any = free ? LH_FREE[fi % LH_FREE.length] : warm ? LH_WARM[n] : item;
  const qk = free ? "free" + fi : warm ? "warm" + n : n + ":" + index;
  /* every ENTRY into a question gets a fresh board, also a question entered again (gotoStep, next, a dot): the key carries an
     entry count that moves on whenever the question key changes, decided during render so no frame shows the old board */
  const entry = useRef({ qk, n: 0 });
  if (entry.current.qk !== qk) entry.current = { qk, n: entry.current.n + 1 };
  const mk = qk + "#" + entry.current.n;
  const [st, setSt] = useState<any>(null);
  const s = st && st.mk === mk ? st : lhInit(M, mk);
  const setS = (p: any) => setSt((o: any) => { const b = o && o.mk === mk ? o : lhInit(M, mk); return { ...b, ...(typeof p === "function" ? p(b) : p) }; });
  const U = LH_SETS[M.set];
  const mode = free ? "hop" : M.kind;   /* hop | count | cut | tag */
  const last = lhLast(M), have = M.have ? lhCol(M, M.have) : -1;
  const won = !free && (stage === "win" || stage === "idle");
  const v: any = won ? { ...s, ...lhRight(M, tx) } : s;
  const live = (demo || stage === "ask" || free) && !tl.busy && !v.busy;
  const fast = reducedMotion();

  /* the layout: one size, set by the OPEN panel (bigPad: x 0 to 900); the chart stands in the middle of the room it has */
  const CW = 124, YH = 100, YT = 186, TH = 132, YP = 300, YA = 330, YB = 434;
  const X0 = Math.round((BOARD_OPEN_W_BIG - 7 * CW) / 2), XM = X0 + 420;   /* laid out for the open pad, so nothing moves when it opens */
  const cx = (c: number) => X0 + c * CW + CW / 2, gx = (c: number) => X0 + (c + 1) * CW;
  const off = mode === "tag" ? v.off : 0;
  const ptCol = mode === "tag" ? lhPt0(M) + off : v.pt;
  const firstCol = last - M.num.length + 1;
  const pinXY = (c: any) => (c === null || c < 0 ? { x: X0 + 62, y: 512 } : { x: cx(c), y: 98 });
  const canPin = (free || (n === 1 && (mode === "hop" || mode === "count")));
  const canHop = (mode === "hop" || mode === "count") && !!v.want && v.pt > lhCol(M, v.want);
  const canCut = mode === "cut" && v.cut < last && !v.cutDone;

  /* every act is performed on screen (api.act) and changes the picture only when it resolves true; in a guide step only the
     act the step waits for is performed, any other is reported (its hint shows) and moves nothing */
  const playing = useRef(false);
  const tbLock = useRef(false);
  /* a grey key that is tapped says what to do first; the next act, a typed digit or the opened keypad brings the question back */
  const nudged = useRef(false);
  const nudgePin = () => { nudged.current = true; api.say("Tap a unit in the row first."); };
  const nudgeCut = () => { nudged.current = true; api.say("Move the cut to a gap first."); };
  const back = () => { if (!nudged.current) return; nudged.current = false; if (free) api.say(FREE_LINE); else if (stage === "ask") api.say(M.say); };
  const lastKey = useRef(0);
  const perform = (on: string, o: any, done: () => void) => {
    if (demo && stepOn && on !== stepOn) { api.did(on); return; }
    if (playing.current || tl.busy) return;
    playing.current = true;
    setS({ busy: on, read: null, done: false, lit: false });
    api.act(o).then((ok: boolean) => {
      playing.current = false;
      setS({ busy: null });
      if (!ok) return;
      done();
      back();
      api.did(on);
    });
  };
  const pin = (u: string) => {
    const c = lhCol(M, u);
    perform("col-" + u, { tool: "hand", moves: "carry", from: pinXY(s.want ? lhCol(M, s.want) : null), at: [pinXY(c)], hold: lhPin(tx("Want"), LH_ANS, C) },
      () => setS({ want: u, pt: lhPt0(M), arrows: [] }));
  };
  const hop = () => {
    if (!canHop) { api.did("hop"); return; }
    perform("hop", { tool: "hand", moves: "push", from: { x: gx(s.pt), y: YP }, at: [{ x: gx(s.pt - 1), y: YP }], hold: <circle r={13} fill={C.ink} /> },
      () => setS((o: any) => ({ pt: o.pt - 1, arrows: [...o.arrows, o.pt] })));
  };
  const fill = (u: string) => perform("fill-" + u, { tool: "pencil", moves: "draw", at: [{ x: cx(lhCol(M, u)), y: YT + TH / 2 }] },
    () => setS((o: any) => ({ fills: { ...o.fills, [u]: true } })));
  const handle = <rect x={-6} y={-TH / 2 - 8} width={12} height={TH + 16} rx={6} fill={C.ink} />;
  const gap = (u: string) => {
    const c = lhCol(M, u);
    perform("gap-" + u, { tool: "hand", moves: "carry", from: { x: gx(s.cut), y: YT + TH / 2 }, at: [{ x: gx(c), y: YT + TH / 2 }], hold: handle },
      () => setS({ cut: c, cutDone: false }));
  };
  const cut = () => {
    if (!canCut) { api.did("cut"); return; }
    perform("cut", { tool: "scissors", moves: "snip", at: [{ x: gx(s.cut), y: YT + TH / 2 }] }, () => { setS({ cutDone: true }); api.sfx.settle(); });
  };
  const trayX = (j: number) => X0 + j * 116;
  /* phase 4's typed questions: the unit tag clips onto the decimal (the clip zone, right of the key) and must be on before
     Enter counts; tagRef is read by the Enter hold and set at once by the agent's check() */
  const tagged = !free && mode === "hop" && !!M.tagged;
  const tagRef = useRef<any>(null);
  tagRef.current = v.tag;
  const tag = (u: string) => {
    const j = M.tray.indexOf(u), c = lhCol(M, u);
    const to = mode === "tag" ? { x: cx(c), y: YA + 34 } : { x: X0 + 710, y: YB + 38 };
    perform("tag-" + u, { tool: "hand", moves: "carry", from: { x: trayX(j) + 50, y: YB + 38 }, at: [to], hold: lhTag(tx(u), LH_UNIT, LH_UNIT_INK) },
      () => {
        tagRef.current = u; setS(mode === "tag" ? { tag: u, off: c - lhPt0(M) } : { tag: u, trayLit: false });
        if (tagged && s.told && stage === "ask") api.say(M.say);   /* the hold's line gives the bubble back to the question */
      });
  };
  /* the decimal the tiles make with the point where it stands (null while an empty place still waits for its zero) */
  const reading = () => {
    if ((M.empty || []).some((u: string) => !v.fills[u])) return null;
    const k = ptCol - firstCol + 1, a = M.num.slice(0, k), b = M.num.slice(k);
    return k < 1 ? null : b ? a + "." + b : a;
  };
  const fresh = () => perform("new", { tool: "hand", moves: "sweep", from: { x: X0 + 40, y: YT + TH / 2 }, at: [{ x: X0 + 7 * CW - 40, y: YT + TH / 2 }] },
    () => setFi((k: number) => k + 1));
  const doAct = (on: string) => {
    if (on === "hop") return hop();
    if (on === "cut") return cut();
    if (on === "new") return fresh();
    const k = on.slice(0, on.indexOf("-")), u = on.slice(on.indexOf("-") + 1);
    if (k === "col") return pin(u);
    if (k === "fill") return fill(u);
    if (k === "gap") return gap(u);
    if (k === "tag") return tag(u);
  };
  const pressKey = (on: string) => { const t = Date.now(); if (t - lastKey.current < 400) return; lastKey.current = t; doAct(on); };
  /* Enter, the agent's check() and the dev solve() perform the CURRENT step */
  /* Enter, the agent's check() and the dev solve() perform the CURRENT step; in phase 4's typed questions no answer is taken
     until a unit tag is on it (no try is charged: one bubble line, then the tray lights amber); a tag that is not the unit
     asked for goes with the number, and judge counts it a miss */
  api.onEnter(demo && stepOn ? () => doAct(stepOn)
    : tagged && stage === "ask" ? (x: any) => {
      if (!String(x ?? "").trim()) return;
      const t = tagRef.current;
      if (!t) { if (!s.told) api.say("Clip the unit on first."); setS({ told: true, trayLit: true }); api.sfx.tick(); return; }
      api.submit(t === M.goal ? x : String(x).trim() + " " + t);
    }
    : null);
  HOOK.demo = () => (stepOn ? doAct(stepOn) : undefined);
  HOOK.type = (x: any) => api.setTyped(String(x));
  /* the agent's check(): the tag the question asks for goes on first (as a child would clip it), then Enter answers */
  HOOK.check = tagged && stage === "ask" ? () => { if (tagRef.current !== M.goal) { tagRef.current = M.goal; setS({ tag: M.goal, trayLit: false }); } return undefined; } : null;

  /* the traceback: the pins light amber, the maths is redone one step at a time, and it ends on the whole answer in green */
  useEffect(() => {
    if (!wrong || stage !== "ask") return;
    api.lock(true); tbLock.current = true;
    /* a wrong tag's reading (the same digits in that unit) stays on show a moment before the maths is redone */
    const steps: any[] = [[tagged && s.tag && s.tag !== M.goal ? 900 : 400, () => setS({ lit: true, read: null, done: false })]];
    if (M.kind === "hop" || M.kind === "count") {
      const h = lhCol(M, M.have), g = lhCol(M, M.goal);
      steps.push([450, () => setS(M.tagged ? { want: M.goal, pt: h, arrows: [], fills: {}, tag: null } : { want: M.goal, pt: h, arrows: [], fills: {} })]);
      for (let p = h; p > g; p--) steps.push([450, () => { setS((o: any) => ({ pt: o.pt - 1, arrows: [...o.arrows, o.pt] })); api.sfx.tick(); }]);
      if (M.empty && M.empty.length) steps.push([450, () => { setS({ fills: lhRight(M, tx).fills }); api.sfx.settle(); }]);
      if (M.tagged) steps.push([450, () => { tagRef.current = M.goal; setS({ tag: M.goal }); api.sfx.tick(); }]);
    } else if (M.kind === "cut") {
      steps.push([450, () => setS({ cut: last, cutDone: false })]);
      steps.push([500, () => setS({ cut: lhCol(M, M.goal) })]);
      steps.push([500, () => { setS({ cutDone: true }); api.sfx.cut(); }]);
    } else if (M.kind === "tag") {
      steps.push([800, () => setS({ tag: "kg", off: 0 })]);
      steps.push([800, () => setS({ tag: "g", off: lhCol(M, "g") - lhPt0(M) })]);
    }
    steps.push([300, () => setS({ read: lhShow(M, tx), lit: false, done: true })]);
    /* a miss on the unit tag alone ("1.065 mL"): the slot is cleared at the end, so the number is typed afresh with the
       right tag (the runtime keeps a missed answer stale until it is rewritten, and a rub-out would leave the unit in it) */
    const tagMiss = tagged && /\s\S+$/.test(String(wrong.value ?? "").trim());
    tl.run(steps, () => { tbLock.current = false; if (tagMiss) api.setTyped(""); api.lock(false); });
  }, [wrong]);
  /* a question change (Next, a dot, the agent's next() or gotoStep) stops a traceback still playing, so nothing it does lands on
     the next question, and gives back the lock it held */
  useEffect(() => () => {
    tl.stop(); playing.current = false; nudged.current = false;
    if (tbLock.current) { tbLock.current = false; api.lock(false); }
  }, [mk]);
  useEffect(() => { if (typed || (box && box.open)) back(); }, [typed, box && box.open]);

  /* the win line (at a phase's last question the runtime shows the closing in its place) */
  useEffect(() => { if (stage === "win" && !free && item) lhWin(api, item.qid); }, [stage, n, index]);

  /* what the host and the agent read back (toolApi.getState) */
  api.share({ row: M.set, digits: M.num, have: M.have || null, want: v.want, hops: v.arrows.length, point: U[ptCol] || null,
    cut: v.cutDone ? U[v.cut] : null, unit_tag: v.tag, complete: stage === "idle" });

  /* the one invite: on the control the guide step waits for */
  const inviteAt = (on: any) => {
    if (!on) return null;
    if (on === "hop" || on === "cut") return { x: XM, y: YB + 38 };
    const k = on.slice(0, on.indexOf("-")), c = lhCol(M, on.slice(on.indexOf("-") + 1));
    if (k === "col") return { x: cx(c), y: YH + 36 };
    if (k === "fill") return { x: cx(c), y: YT + TH / 2 };
    if (k === "gap") return { x: gx(c), y: YT + TH / 2 };
    if (k === "tag") return { x: trayX(M.tray.indexOf(on.slice(4))) + 50, y: YB + 38 };
    return null;
  };
  const inv = demo && live ? inviteAt(stepOn) : null;
  const lit = (c: number) => v.lit && (c === have || (M.goal && c === lhCol(M, M.goal)));
  /* the key waits (flat) until its act can be done and is gone once it is done (the point at the pin, the row cut) */
  const hopDone = !!v.want && !canHop, keyIds = free ? (hopDone ? ["new"] : ["hop", "new"])
    : won || mode === "tag" ? [] : mode === "cut" ? (v.cutDone ? [] : ["cut"]) : hopDone ? [] : ["hop"];
  const KW = keyIds.length > 1 ? 200 : 220, kx0 = XM - (keyIds.length * KW + (keyIds.length - 1) * 20) / 2;
  const cutAt = mode === "cut" && v.cutDone ? v.cut : null;
  const tileCol = v.done ? LH_ANS : LH_GIVEN;
  const fitTo = lhFit;
  /* one size for the whole row of unit names, set by its longest name in this language, 6 clear of each cell edge */
  const headFs = Math.min(...U.map((u: string) => fitTo(tx(u), CW - 2 - 12, T.prompt)));

  return (
    <g>
      {/* the pins: have (deep blue) over the unit you have, want (green) over the unit you want, or loose at the bottom left */}
      {(mode === "hop" || mode === "count") && have >= 0 && <g transform={`translate(${cx(have)},${98})`}>{lhPin(tx("Have"), LH_GIVEN, C)}</g>}
      {(mode === "hop" || mode === "count") && !String(v.busy || "").startsWith("col-") && (() => {
        const p = pinXY(v.want ? lhCol(M, v.want) : null);
        return <g transform={`translate(${p.x},${p.y})`}>{lhPin(tx("Want"), LH_ANS, C)}</g>;
      })()}
      {/* the unit names; the unit in use (the one the point sits after) is amber */}
      {U.map((u: string, c: number) => (
        <g key={"h" + c}>
          <rect x={X0 + c * CW + 1} y={YH} width={CW - 2} height={72} rx={14} fill={c === ptCol && mode !== "cut" ? tint(LH_NOW, 0.55) : tint(C.panel, 0.4)}
            stroke={lit(c) ? LH_NOW : C.rule} strokeWidth={lit(c) ? 6 : 2} />
          <text x={cx(c)} y={YH + 50} textAnchor="middle" fontSize={headFs} fontWeight={700} fill={LH_UNIT_INK}>{tx(u)}</text>
          {live && canPin && c < have && <Hit id={"col-" + u} x={X0 + c * CW + 4} y={YH - 2} w={CW - 8} h={76} label={"Pin " + u} onPress={() => pin(u)} />}
        </g>
      ))}
      {/* the empty columns of the row */}
      {U.map((u: string, c: number) => <rect key={"e" + c} x={X0 + c * CW + 14} y={YT} width={CW - 28} height={TH} rx={16} fill="none" stroke={C.rule} strokeWidth={2} strokeDasharray="8 8" />)}
      {/* the digit tiles, one to a column; an empty place waits to be filled with a grey zero */}
      {M.num.split("").map((d: string, k: number) => {
        const c0 = last - (M.num.length - 1 - k), c = c0 + off, u = U[c0];
        const emp = (M.empty || []).includes(u), filled = emp && v.fills[u];
        const dx = cutAt === null ? 0 : c <= cutAt ? -8 : 8;
        const x = X0 + c * CW + 14 + dx, w = CW - 28;
        return (
          <g key={"d" + k} style={{ transform: `translate(${x}px, ${YT}px)`, transition: mode === "tag" && !fast ? "transform 600ms ease" : "none" } as any}>
            {emp && !filled ? (
              /* exactly like the other empty columns until a miss (the child does the noticing); amber in the traceback */
              <rect x={0} y={0} width={w} height={TH} rx={16} fill={v.lit ? tint(LH_NOW, 0.85) : "none"} stroke={v.lit ? LH_NOW : C.rule}
                strokeWidth={v.lit ? 4 : 2} strokeDasharray={v.lit ? "12 8" : "8 8"} />
            ) : (
              <g>
                <rect x={0} y={0} width={w} height={TH} rx={16} fill={filled ? "#FFFFFF" : tint(tileCol, 0.85)} stroke={filled ? LH_HOLD : tileCol} strokeWidth={3} />
                <text x={w / 2} y={TH / 2 + 26} textAnchor="middle" fontSize={T.display} fontWeight={700} fill={filled ? LH_HOLD : shade(tileCol, 0.35)}>{filled ? "0" : d}</text>
              </g>
            )}
          </g>
        );
      })}
      {live && (mode === "hop") && (M.empty || []).filter((u: string) => !v.fills[u]).map((u: string) => (
        <Hit key={"f" + u} id={"fill-" + u} x={X0 + lhCol(M, u) * CW + 14} y={YT} w={CW - 28} h={TH} label={"Fill the empty " + u + " place"} onPress={() => fill(u)} />
      ))}
      {/* the point (and in phase 4 the clipped tag, hanging under the unit the point sits after) */}
      {v.busy !== "hop" && (
        <g style={{ transform: `translate(${gx(ptCol)}px, ${YP}px)`, transition: mode === "tag" && !fast ? "transform 600ms ease" : "none" } as any} pointerEvents="none">
          <circle r={13} fill={C.ink} />
          {mode === "tag" && v.tag && !(v.busy || "").startsWith("tag-") && (
            <g>
              <line x1={-4} y1={12} x2={-22} y2={36} stroke={LH_UNIT_INK} strokeWidth={3} />
              <g transform={`translate(${-CW / 2},${YA + 34 - YP})`}>{lhTag(tx(v.tag), v.done ? LH_ANS : LH_UNIT, v.done ? shade(LH_ANS, 0.4) : LH_UNIT_INK)}</g>
            </g>
          )}
        </g>
      )}
      {/* each hop: a vermilion arrow under the row, divide by 10 */}
      {v.arrows.map((a: number, k: number) => {
        const x1 = gx(a), x2 = gx(a - 1);
        return (
          <g key={"a" + k} pointerEvents="none">
            <path d={`M ${x1 - 4} ${YA} C ${x1 - 12} ${YA + 46}, ${x2 + 12} ${YA + 46}, ${x2 + 4} ${YA + 8}`} fill="none" stroke={LH_MOVE} strokeWidth={5} strokeLinecap="round" />
            <path d={`M ${x2 + 3} ${YA - 2} l 2 20 l 15 -9 z`} fill={LH_MOVE} />
            <text x={cx(a)} y={YA + 84} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={shade(LH_MOVE, 0.35)}>{tx("÷ 10")}</text>
          </g>
        );
      })}
      {/* phase 3: the Cut handle in its gap; after the cut, a frame round each part (green, with its unit tag, at the right answer) */}
      {mode === "cut" && cutAt === null && !String(v.busy || "").startsWith("gap-") && (
        <g pointerEvents="none">
          <g transform={`translate(${gx(v.cut)},${YT + TH / 2})`}>{handle}</g>
          <circle cx={gx(v.cut)} cy={YT + TH + 18} r={16} fill={C.ink} />
        </g>
      )}
      {mode === "cut" && cutAt !== null && (
        <g pointerEvents="none">
          <line x1={gx(cutAt)} y1={YT - 8} x2={gx(cutAt)} y2={YT + TH + 8} stroke={C.ink} strokeWidth={3} strokeDasharray="6 6" />
          {[[firstCol, cutAt, -8], [cutAt + 1, last, 8]].map(([a, b, dx]: any, j: number) => (
            <g key={"p" + j}>
              <rect x={X0 + a * CW + 6 + dx} y={YT - 8} width={(b - a + 1) * CW - 12} height={TH + 16} rx={22} fill="none" stroke={tileCol} strokeWidth={4} />
              {v.done && <g transform={`translate(${X0 + ((a + b + 1) / 2) * CW + dx},${YA + 38})`}>{lhTag(tx(U[b]), LH_ANS, shade(LH_ANS, 0.4))}</g>}
            </g>
          ))}
        </g>
      )}
      {live && mode === "cut" && U.map((u: string, c: number) => (c >= firstCol && c < last
        ? <Hit key={"g" + c} id={"gap-" + u} x={gx(c) - 36} y={YT} w={72} h={TH} label={"Cut after " + u} onPress={() => gap(u)} /> : null))}
      {/* phase 4: the tray of unit tags (lit amber when Enter came before a tag) */}
      {tagged && v.trayLit && !v.tag && <rect x={trayX(0) - 8} y={YB - 8} width={M.tray.length * 116} height={92} rx={18} fill="none" stroke={LH_NOW} strokeWidth={4} pointerEvents="none" />}
      {(mode === "tag" || tagged) && M.tray.map((u: string, j: number) => (
        <g key={"tr" + u}>
          <g transform={`translate(${trayX(j) + 50},${YB + 38})`}>{lhTag(tx(u), LH_UNIT, LH_UNIT_INK)}</g>
          {live && <Hit id={"tag-" + u} x={trayX(j)} y={YB} w={100} h={76} label={"Clip the " + u + " tag"} onPress={() => tag(u)} />}
        </g>
      ))}
      {/* the one key at the bottom centre; its label follows the act */}
      {keyIds.map((id: string, j: number) => {
        const en = live && (id === "hop" ? canHop : id === "cut" ? canCut : true);
        return (
          <Key key={"k" + j} id={id} label={tx(LH_KEY[id])} x={kx0 + j * (KW + 20)} y={YB} w={KW} h={76} C={C} tone="key" disabled={!en} onClick={() => pressKey(id)}>
            <text y={12} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={en ? toneInk("key", C.ink) : shade(C.dim, 0.45)}>{tx(LH_KEY[id])}</text>
          </Key>
        );
      })}
      {/* the grey Hop key before a unit is pinned, the grey Cut key before the handle moved: a tap says what to do first */}
      {keyIds.map((id: string, j: number) => {
        const why = !demo && !v.busy && (stage === "ask" || free) && (id === "hop" && !v.want ? nudgePin : id === "cut" && !v.cutDone && v.cut >= last ? nudgeCut : null);
        return why ? <Hit key={"w" + j} id={id + "-first"} x={kx0 + j * (KW + 20)} y={YB} w={KW} h={76} label={tx(LH_KEY[id])} onPress={why} /> : null;
      })}
      {/* phase 4's clip zone: the clipped tag; a tag that is not the unit the point sits after shows the same digits read in
          that unit, in amber (another measure) */}
      {tagged && v.tag && !v.read && !String(v.busy || "").startsWith("tag-") && (() => {
        const rd = reading(), other = !!wrong && rd !== null && v.tag !== U[ptCol];   /* the reading only after a miss: before it, the bare tag */
        return other ? (
          <g pointerEvents="none">
            <rect x={X0 + 570} y={YB} width={280} height={76} rx={18} fill={tint(LH_NOW, 0.82)} stroke={LH_NOW} strokeWidth={3} />
            <text x={X0 + 710} y={YB + 51} textAnchor="middle" fontSize={fitTo(rd + " " + tx(v.tag), 256, T.speech)} fontWeight={700} fill={shade(LH_NOW, 0.6)}>{rd + " " + tx(v.tag)}</text>
          </g>
        ) : <g transform={`translate(${X0 + 710},${YB + 38})`}>{lhTag(tx(v.tag), LH_UNIT, LH_UNIT_INK)}</g>;
      })()}
      {/* the answer, in green: at the right answer and at the end of a traceback only */}
      {v.read && (
        <g pointerEvents="none">
          <rect x={X0 + 570} y={YB} width={280} height={76} rx={18} fill={tint(LH_ANS, 0.82)} stroke={LH_ANS} strokeWidth={3} />
          <text x={X0 + 710} y={YB + 51} textAnchor="middle" fontSize={fitTo(v.read, 256, T.speech)} fontWeight={700} fill={shade(LH_ANS, 0.45)}>{v.read}</text>
        </g>
      )}
      {inv && <Invite x={inv.x} y={inv.y} r={inv.y > YB ? 44 : 56} C={C} />}
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase: the measure given (deep blue) and the
   answer (green) */
function Thumb({ result, it, C, w, h, lang = "en", tx = (v: any) => v }: any) {
  const last = result && result.last;
  const I = it || (last && last.it);
  if (!last || !I) return null;
  /* a word with no translation yet is left out rather than drawn in English */
  const tt = (x: any) => { const r = tx(x); return lang !== "en" && r === x ? "" : r; };
  const tidy = (t: string) => t.replace(/\s+/g, " ").replace(/\s*·\s*$/, "").trim();
  const top = tidy(lhGiv(I, tt)), bot = tidy(lhShow(I, tt, last.value));
  /* hi and gu rise and fall further than Latin, and two of their lines at the 28 floor do not fit a summary row's 66: one line,
     the answer, there */
  const one = lang !== "en";
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      {!one && <text x={w / 2} y={h * 0.46} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={shade(LH_GIVEN, 0.3)}>{top}</text>}
      <text x={w / 2} y={one ? h / 2 + 10 : h * 0.9} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={shade(LH_ANS, 0.45)}>{bot}</text>
    </g>
  );
}

function SmallerToBigger(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, fitHost: () => null,
      /* placing the point IS the lesson (the owner, 2026-10-17): the pad's point key, on every question */
      pointKey: true,
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

export default SmallerToBigger;
