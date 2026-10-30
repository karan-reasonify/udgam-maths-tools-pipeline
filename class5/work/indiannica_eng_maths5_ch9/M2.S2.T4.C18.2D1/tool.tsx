/* ═══ M2.S2.T4.C18.2D1 · bigger_to_smaller · tool-specific part ═══════════════════════════════
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

const TOOL_ID = "bigger_to_smaller";
const MEDIA_ID = "M2.S2.T4.C18.2D1";
const TOOL_NAME = "Right Hop Converter";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
/* kept for the tool object's shape (and the sidecar); nothing speaks from r30 */
const VOICE = {"rate":0.92,"pitch":1.06};

/* printed on the bubble before phase 1's teach lines only (the plan's opening line; not shown when phase 1 has steps) */
const OPENING = ["A measure on the chart, and a pin on its unit."];
/* the whole-tool line: printed on the summary page */
const FINISH_LINE = "You hopped right to a smaller unit and kept every place.";
/* printed when the child opens Free play (the plan's free-play line); its LAST piece stays on the bubble */
const FREE_LINE = "Free play: pin any unit to the right and hop the point there.";

/* THE START PAGE (runtime r28; docs/LAYOUT.md §1c, docs/PATTERNS.md §14): the first thing a child sees in user mode.
   START_HOOK is ONE printed question to wonder at (it needs a TR entry, and never gives an answer away); StartArt is
   the object the lesson is about, drawn in a 1200 x 340 box ({ box, C, lang, tx }; plain shapes in the chrome and content
   colours, a <Skin> over them when the image agent made one). This stub is a dashed outline: draw the real object. */
const START_HOOK = "Why does a measure get a bigger number in a smaller unit?";
function StartArt({ box, C, lang, tx = (v: any) => v }: any) {
  /* one row of the unit chart: 4 in kg, the point hopped two places, a × 10 under each hop (no question's answer) */
  const cols = RH_ROWS.weight, cw = 150, x0 = (box.w - 7 * cw) / 2, hy = 60, cy = 82, ch = 130;
  const gx = (i: number) => x0 + (i + 1) * cw;
  return (
    <g>
      {cols.map((u: string, i: number) => (
        <g key={i}>
          <rect x={x0 + i * cw} y={cy} width={cw} height={ch} fill={i === 0 ? tint(RH.given, 0.86) : i <= 2 ? tint(RH.now, 0.8) : "#FFFFFF"} stroke={C.ink} strokeWidth={2.5} />
          <text x={x0 + i * cw + cw / 2} y={hy} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={shade(RH.unit, 0.2)}>{tx(u)}</text>
        </g>
      ))}
      <text x={x0 + cw / 2} y={cy + ch / 2 + 26} textAnchor="middle" fontSize={T.display} fontWeight={700} fill={shade(RH.given, 0.25)}>4</text>
      {[0, 1].map((k) => (
        <g key={k}>
          <path d={`M ${gx(k) + 8} ${cy + ch + 14} Q ${gx(k) + cw / 2} ${cy + ch + 56} ${gx(k + 1) - 8} ${cy + ch + 14}`} fill="none" stroke={RH.move} strokeWidth={5} strokeLinecap="round" />
          <path d={`M ${gx(k + 1) - 8} ${cy + ch + 14} l -20 4 l 10 14 z`} fill={RH.move} />
          <text x={gx(k) + cw / 2} y={cy + ch + 98} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={shade(RH.move, 0.3)}>× 10</text>
        </g>
      ))}
      <circle cx={gx(2)} cy={cy + ch - 18} r={13} fill={C.ink} stroke="#FFFFFF" strokeWidth={3} />
    </g>
  );
}

/* the chapter's content colours (brief): the given measure deep blue, the answer green, the move vermilion, the unit names
   violet, the column worked on now amber, a zero that holds a place grey */
const RH: any = { given: "#0072B2", answer: "#009E73", move: "#D55E00", unit: "#7B3FA0", now: "#E69F00", hold: "#767676" };
/* one row of the unit chart, kilo to milli; a road reads in km with its other digits in plain columns to the left */
const RH_ROWS: any = {
  weight: ["kg", "hg", "dag", "g", "dg", "cg", "mg"],
  length: ["km", "hm", "dam", "m", "dm", "cm", "mm"],
  capacity: ["kL", "hL", "daL", "L", "dL", "cL", "mL"],
  road: ["", "", "", "km", "hm", "dam", "m"],
};
/* the picture's layout, in the 900-wide group (the working area with the wide panel open) */
const RH_G = { W: 900, x0: 16, cw: 124, cardH: 96, tagY: 106, tagH: 50, headY: 168, headH: 54, cellY: 226, cellH: 112, arcY: 348, lab: 66, keyY: 434, keyH: 76 };
/* a road: the two road signs are plaques of about 1.65 : 1 (280 x 170: the longest number, "4,11,200 डेकामी", fits the cream face
   with 16 to spare each side), so the chart sits lower and a little shorter */
const RH_GS = { ...RH_G, cardH: 170, tagY: 176, tagH: 50, headY: 238, headH: 52, cellY: 290, cellH: 84, arcY: 378, lab: 54, keyY: 446, keyH: 72 };
const RH_SIGN = { w: 340, h: 170, face: 13 };   /* widened (the skin stretches): the hi/gu unit + "over" line reaches 32 on one line */
/* a line's width in em, to fit a size to a box: Latin and digits as Poppins draws them; a Devanagari or Gujarati letter wider, a
   spacing vowel sign (ा ि ी ो ौ) narrow, a sign above or below (े ु ् ़ ...) nearly nothing */
const rhEm = (str: string) => {
  let e = 0;
  for (const ch of String(str)) {
    const c = ch.codePointAt(0) || 0;
    if (c >= 0x0900 && c <= 0x097f) e += /[ािीोौ]/.test(ch) ? 0.33 : /[ऀ-ःऺ-ॏॢॣ]/.test(ch) ? 0.04 : 0.84;  /* measured on the review's frames: Devanagari runs wide */
    else if (c >= 0x0a80 && c <= 0x0aff) e += /[ાિીોૌ]/.test(ch) ? 0.25 : /[ઁ-ઃ઼-્ૢૣ]/.test(ch) ? 0.04 : 0.5;
    else e += /[0-9]/.test(ch) ? 0.62 : /[,.' ]/.test(ch) ? 0.3 : 0.6;
  }
  return e;
};
const rhFs = (str: string, w: number, max: number, min = 32) => Math.max(min, Math.min(max, Math.floor(w / Math.max(0.5, rhEm(str)))));
/* where each digit of a measure sits: its last digit in its unit's column */
function rhPlace(cols: string[], m: any, out: any[]) {
  if (!m) return out;
  const s = String(m[0]), c = cols.indexOf(m[1]);
  for (let k = 0; k < s.length; k++) out[c - (s.length - 1 - k)] = s[k];
  return out;
}
function rhLay(it: any) {
  const cols = RH_ROWS[it.row] || RH_ROWS.weight;
  return { cols, have: cols.indexOf(it.giv ? it.giv[1] : ""), want: cols.indexOf(it.to), dig: rhPlace(cols, it.giv, Array(7).fill(null)), pdig: rhPlace(cols, it.part, Array(7).fill(null)) };
}
/* the measure as a card prints it ("over 4,112 km", "4 L 615 mL") */
const rhNum = (v: number) => (v >= 1000 ? indian(v) : String(v));
/* "over" stands before the number in English and after it in Hindi ("4,112 किमी से अधिक") and Gujarati ("4,112 કિમીથી વધુ") */
const rhOver = (core: string, it: any, tx: any, lang: string) => {
  if (!it.over) return core;
  const o = tx("over");
  return lang === "en" || o === "over" ? o + " " + core : lang === "gu" ? core + o : core + " " + o;
};
const rhGiven = (it: any, tx: any, lang = "en") => rhOver(rhNum(it.giv[0]) + " " + tx(it.giv[1]) + (it.part ? " " + rhNum(it.part[0]) + " " + tx(it.part[1]) : ""), it, tx, lang);
const rhAnswer = (it: any, v: number, unit: string, tx: any, lang = "en") => rhOver(rhNum(v) + " " + tx(unit), it, tx, lang);
/* free play: its own measure, the book's 4 kg, every unit to the right open */
const RH_FREE = { kind: "hop", row: "weight", giv: [4, "kg"], to: "mg" };

/* Hindi and Gujarati (docs/PATTERNS.md §11): every line above and below stays English, exactly as the checks
   read it; this table is keyed by that English, byte for byte, and the runtime looks each printed or drawn line
   up in it (Work draws its own words through tx("...")). Fill it AFTER the English is final and reviewed:
   `check` (tr-coverage) lists every printed line still missing. Nothing is baked: the lesson is silent.
   Empty = the tool runs in English only. */
/* terms (one per idea, for a native speaker to read): unit इकाई / એકમ · column खाना / ખાનું · place स्थान / સ્થાન · point बिंदु / બિંદુ ·
   zero शून्य / શૂન્ય · digit अंक / અંક · part भाग / ભાગ · Hop छलाँग / કૂદકો · over से अधिक / થી વધુ (after the number) ·
   unit symbols as NCERT abbreviates them, no dots: किग्रा ग्रा मिग्रा, किमी मी सेमी मिमी, किली ली मिली (hecto हे-, deca डेका-, deci डेसी-, centi से-);
   Gujarati કિગ્રા ગ્રા મિગ્રા, કિમી મી સેમી મિમી, કિલિ લિ મિલિ (હે-, ડેકા-, ડેસી-, સે-) */
const TR: any = {
  hi: {
    "Right Hop Converter": "दाईं ओर छलाँग",
    "Free play: pin any unit to the right and hop the point there.": "खुला खेल: दाईं ओर कोई भी इकाई चुनो और बिंदु को वहाँ ले जाओ।",
    "Why does a measure get a bigger number in a smaller unit?": "छोटी इकाई में माप की संख्या बड़ी क्यों हो जाती है?",
    "Places to the right": "दाईं ओर स्थान",
    "To change 3 m into cm, tap the cm column to pin the unit you want.": "3 मी को सेमी में बदलने के लिए सेमी वाले खाने पर टैप करो।",
    "Find cm in the row of unit names.": "इकाइयों की पंक्ति में सेमी ढूँढो।",
    "Tap Hop to move the point one place to the right.": "छलाँग पर टैप करो, बिंदु एक स्थान दाईं ओर जाएगा।",
    "The Hop key is at the bottom.": "छलाँग का बटन नीचे है।",
    "Tap Hop again, so the point reaches cm.": "फिर से छलाँग पर टैप करो, ताकि बिंदु सेमी तक पहुँचे।",
    "The point has not reached cm yet.": "बिंदु अभी सेमी तक नहीं पहुँचा।",
    "Each place to the right multiplies the number by 10.": "दाईं ओर हर स्थान पर संख्या 10 से गुणा होती है।",
    "Every column the point passed with no digit gets a zero.": "बिंदु जिन खाली खानों से गुज़रा, उनमें शून्य आता है।",
    "Every hop to the right made the number 10 times bigger.": "दाईं ओर हर छलाँग ने संख्या को 10 गुना बड़ा किया।",
    "You learned: each place to the right multiplies the number by 10.": "तुमने सीखा: दाईं ओर हर स्थान संख्या को 10 से गुणा करता है।",
    "A packet of tea weighs 4 hg, so how many grams is that?": "चाय का पैकेट 4 हेग्रा का है, तो यह कितने ग्राम है?",
    "4 hg in grams?": "4 हेग्रा कितने ग्राम?",
    "Count the places from hg to g.": "हेग्रा से ग्रा तक स्थान गिनो।",
    "How many decimetres is 6 m?": "6 मी कितने डेसीमीटर है?",
    "6 m in dm?": "6 मी कितने डेसीमी?",
    "How many places is it from m to dm?": "मी से डेसीमी तक कितने स्थान हैं?",
    "How many millilitres is 4 hL?": "4 हेली कितने मिलीलीटर है?",
    "4 hL in mL?": "4 हेली कितने मिली?",
    "Count every place from hL to mL.": "हेली से मिली तक हर स्थान गिनो।",
    "A mixed measure in the smaller unit": "मिश्रित माप छोटी इकाई में",
    "To change 3 m 45 cm into cm, tap the cm column to pin it.": "3 मी 45 सेमी को सेमी में बदलने के लिए सेमी पर टैप करो।",
    "Tap Hop to change the metres part first.": "पहले मीटर वाला भाग बदलने के लिए छलाँग पर टैप करो।",
    "Hop once more, so the point reaches cm.": "एक छलाँग और, ताकि बिंदु सेमी तक पहुँचे।",
    "Now tap Add part to bring in the 45 cm.": "अब 45 सेमी लाने के लिए भाग जोड़ो पर टैप करो।",
    "Tap Add part to slide the card in.": "कार्ड लाने के लिए भाग जोड़ो पर टैप करो।",
    "Change the bigger part first, then add the smaller part.": "पहले बड़ा भाग बदलो, फिर छोटा भाग जोड़ो।",
    "The smaller part's digits fill the columns the point passed.": "छोटे भाग के अंक उन खानों में आते हैं जिनसे बिंदु गुज़रा।",
    "The bigger part changed first, and then the smaller part joined it.": "पहले बड़ा भाग बदला, फिर छोटा भाग उससे जुड़ा।",
    "You learned: change the bigger part first, then add the smaller part.": "तुमने सीखा: पहले बड़ा भाग बदलो, फिर छोटा भाग जोड़ो।",
    "A bucket holds 4 L 615 mL, so how many millilitres is that?": "बाल्टी में 4 ली 615 मिली है, तो यह कितने मिलीलीटर है?",
    "4 L 615 mL in mL?": "4 ली 615 मिली कितने मिली?",
    "Change only the 4 L into millilitres first.": "पहले सिर्फ़ 4 ली को मिलीलीटर में बदलो।",
    "How many centimetres is 2 m 58 cm?": "2 मी 58 सेमी कितने सेंटीमीटर है?",
    "2 m 58 cm in cm?": "2 मी 58 सेमी कितने सेमी?",
    "Change the 2 m into centimetres, then add.": "2 मी को सेंटीमीटर में बदलो, फिर जोड़ो।",
    "How many litres is 3 kL 260 L?": "3 किली 260 ली कितने लीटर है?",
    "3 kL 260 L in L?": "3 किली 260 ली कितने ली?",
    "How many litres is the 3 kL alone?": "अकेले 3 किली कितने लीटर है?",
    "A zero that holds a place": "स्थान रखने वाला शून्य",
    "To change 9 km 30 m into m, tap the m column to pin it.": "9 किमी 30 मी को मी में बदलने के लिए मी पर टैप करो।",
    "Find m in the row of unit names.": "इकाइयों की पंक्ति में मी ढूँढो।",
    "Tap Hop to change the kilometres part first.": "पहले किलोमीटर वाला भाग बदलने के लिए छलाँग पर टैप करो।",
    "Tap Hop again for the next place.": "अगले स्थान के लिए फिर से छलाँग पर टैप करो।",
    "The point has not reached m yet.": "बिंदु अभी मी तक नहीं पहुँचा।",
    "Hop once more, so the point reaches m.": "एक छलाँग और, ताकि बिंदु मी तक पहुँचे।",
    "One more hop is still to go.": "अभी एक छलाँग बाकी है।",
    "Now tap Add part, and look for a column left empty.": "अब भाग जोड़ो पर टैप करो और खाली छूटा खाना देखो।",
    "Tap Add part to slide the 30 m in.": "30 मी लाने के लिए भाग जोड़ो पर टैप करो।",
    "An empty column inside the number still needs a digit.": "संख्या के बीच के खाली खाने में भी एक अंक चाहिए।",
    "A zero holds the empty column, so every place is kept.": "शून्य खाली खाने को भरता है, ताकि हर स्थान बना रहे।",
    "The zero kept its place, so the measure stayed right.": "शून्य ने अपना स्थान रखा, इसलिए माप सही रहा।",
    "You learned: a zero holds an empty place inside the answer.": "तुमने सीखा: उत्तर के बीच का खाली स्थान शून्य से भरता है।",
    "A trail is 8 km 70 m long, so how many metres is that?": "एक पगडंडी 8 किमी 70 मी लंबी है, तो यह कितने मीटर है?",
    "8 km 70 m in m?": "8 किमी 70 मी कितने मी?",
    "Change the 8 km into metres before you add the 70 m.": "70 मी जोड़ने से पहले 8 किमी को मीटर में बदलो।",
    "How many grams is 5 kg 8 g?": "5 किग्रा 8 ग्रा कितने ग्राम है?",
    "5 kg 8 g in g?": "5 किग्रा 8 ग्रा कितने ग्रा?",
    "Which columns have no digit once the 8 g is in?": "8 ग्रा आने के बाद किन खानों में कोई अंक नहीं है?",
    "How many centimetres is 4 m 6 cm?": "4 मी 6 सेमी कितने सेंटीमीटर है?",
    "4 m 6 cm in cm?": "4 मी 6 सेमी कितने सेमी?",
    "Once the 6 cm is in, which place is still blank?": "6 सेमी आने के बाद कौन-सा स्थान अभी भी खाली है?",
    "A long road in metres": "लंबी सड़क मीटर में",
    "A road is over 9 km long, so tap m to pin the unit you want.": "एक सड़क 9 किमी से अधिक लंबी है, तो मी पर टैप करो।",
    "Tap Hop to move the road's length one place.": "सड़क की लंबाई एक स्थान ले जाने के लिए छलाँग पर टैप करो।",
    "Each hop multiplies the length by 10, and over stays with it.": "हर छलाँग लंबाई को 10 से गुणा करती है, और 'से अधिक' बना रहता है।",
    "Put a zero in every column the point hopped past.": "बिंदु जिन खानों को लाँघ गया, हर एक में शून्य रखो।",
    "A long road in km became a bigger number in m, and it was still over.": "किमी में लंबी सड़क मी में बड़ी संख्या बनी, और 'से अधिक' बना रहा।",
    "You learned: km to m is three places to the right, and over stays.": "तुमने सीखा: किमी से मी तीन स्थान दाईं ओर है, और 'से अधिक' रहता है।",
    "The road sign asks nothing, so we ask: over how many metres is NH44 long?": "बोर्ड कुछ नहीं पूछता, तो हम पूछें: NH44 कितने मीटर से अधिक लंबा है?",
    "Over 4,112 km in m?": "4,112 किमी से अधिक, कितने मी?",
    "Hop the length one place first, into hectometres.": "पहले लंबाई को एक स्थान, हेक्टोमीटर में ले जाओ।",
    "Now find the same road's length in decametres.": "अब इसी सड़क की लंबाई डेकामीटर में निकालो।",
    "Over 4,112 km in dam?": "4,112 किमी से अधिक, कितने डेकामी?",
    "How many places is it from km to dam?": "किमी से डेकामी तक कितने स्थान हैं?",
    "A short road is over 6 km long, so over how many metres is that?": "एक छोटी सड़क 6 किमी से अधिक लंबी है, तो यह कितने मीटर से अधिक है?",
    "Over 6 km in m?": "6 किमी से अधिक, कितने मी?",
    "Count the places from km to m for this road.": "इस सड़क के लिए किमी से मी तक स्थान गिनो।",
    "Yes, 4 hg is 400 g, two places to the right.": "हाँ, 4 हेग्रा 400 ग्रा है, दो स्थान दाईं ओर।",
    "Yes, 6 m is 60 dm, one place to the right.": "हाँ, 6 मी 60 डेसीमी है, एक स्थान दाईं ओर।",
    "Yes, 4,000 mL and 615 mL make 4,615 mL.": "हाँ, 4,000 मिली और 615 मिली मिलकर 4,615 मिली।",
    "Yes, 200 cm and 58 cm make 258 cm.": "हाँ, 200 सेमी और 58 सेमी मिलकर 258 सेमी।",
    "Yes, the zero holds the hundreds place in 8,070 m.": "हाँ, 8,070 मी में शून्य सैकड़े का स्थान रखता है।",
    "Yes, two zeros hold their places in 5,008 g.": "हाँ, 5,008 ग्रा में दो शून्य अपने स्थान रखते हैं।",
    "Yes, the road is over 41,12,000 m long.": "हाँ, सड़क 41,12,000 मी से अधिक लंबी है।",
    "Yes, NH44 is over 4,11,200 dam long.": "हाँ, NH44 4,11,200 डेकामी से अधिक लंबा है।",
    "Tap a unit in the row first.": "पहले पंक्ति में एक इकाई पर टैप करो।",
    /* the words the picture draws */
    "Given": "दिया गया", "Answer": "उत्तर", "Road": "सड़क", "have": "दी गई", "want": "चाहिए", "Hop": "छलाँग", "Add part": "भाग जोड़ो",
    "column": "खाना", "over": "से अधिक",
    "kg": "किग्रा", "hg": "हेग्रा", "dag": "डेकाग्रा", "g": "ग्रा", "dg": "डेसीग्रा", "cg": "सेग्रा", "mg": "मिग्रा",
    "km": "किमी", "hm": "हेमी", "dam": "डेकामी", "m": "मी", "dm": "डेसीमी", "cm": "सेमी", "mm": "मिमी",
    "kL": "किली", "hL": "हेली", "daL": "डेकाली", "L": "ली", "dL": "डेसीली", "cL": "सेली", "mL": "मिली",
  },
  gu: {
    "Right Hop Converter": "જમણી તરફ કૂદકો",
    "Free play: pin any unit to the right and hop the point there.": "મુક્ત રમત: જમણી તરફ કોઈ પણ એકમ પસંદ કરો અને બિંદુને ત્યાં લઈ જાઓ.",
    "Why does a measure get a bigger number in a smaller unit?": "નાના એકમમાં માપની સંખ્યા મોટી કેમ થઈ જાય છે?",
    "Places to the right": "જમણી તરફ સ્થાન",
    "To change 3 m into cm, tap the cm column to pin the unit you want.": "3 મીને સેમીમાં બદલવા સેમીના ખાના પર ટૅપ કરો.",
    "Find cm in the row of unit names.": "એકમોની હરોળમાં સેમી શોધો.",
    "Tap Hop to move the point one place to the right.": "કૂદકો પર ટૅપ કરો, બિંદુ એક સ્થાન જમણે જશે.",
    "The Hop key is at the bottom.": "કૂદકાનું બટન નીચે છે.",
    "Tap Hop again, so the point reaches cm.": "ફરી કૂદકો પર ટૅપ કરો, જેથી બિંદુ સેમી સુધી પહોંચે.",
    "The point has not reached cm yet.": "બિંદુ હજી સેમી સુધી પહોંચ્યું નથી.",
    "Each place to the right multiplies the number by 10.": "જમણી તરફ દરેક સ્થાને સંખ્યાનો 10 વડે ગુણાકાર થાય છે.",
    "Every column the point passed with no digit gets a zero.": "બિંદુ જે ખાલી ખાનાં પરથી ગયું, તેમાં શૂન્ય આવે છે.",
    "Every hop to the right made the number 10 times bigger.": "જમણી તરફ દરેક કૂદકાએ સંખ્યાને 10 ગણી મોટી કરી.",
    "You learned: each place to the right multiplies the number by 10.": "તમે શીખ્યા: જમણી તરફ દરેક સ્થાન સંખ્યાને 10 વડે ગુણે છે.",
    "A packet of tea weighs 4 hg, so how many grams is that?": "ચાનું પેકેટ 4 હેગ્રાનું છે, તો તે કેટલા ગ્રામ થાય?",
    "4 hg in grams?": "4 હેગ્રા કેટલા ગ્રામ?",
    "Count the places from hg to g.": "હેગ્રાથી ગ્રા સુધી સ્થાન ગણો.",
    "How many decimetres is 6 m?": "6 મી કેટલા ડેસીમીટર થાય?",
    "6 m in dm?": "6 મી કેટલા ડેસીમી?",
    "How many places is it from m to dm?": "મીથી ડેસીમી સુધી કેટલાં સ્થાન છે?",
    "How many millilitres is 4 hL?": "4 હેલિ કેટલા મિલિલિટર થાય?",
    "4 hL in mL?": "4 હેલિ કેટલા મિલિ?",
    "Count every place from hL to mL.": "હેલિથી મિલિ સુધી દરેક સ્થાન ગણો.",
    "A mixed measure in the smaller unit": "મિશ્ર માપ નાના એકમમાં",
    "To change 3 m 45 cm into cm, tap the cm column to pin it.": "3 મી 45 સેમીને સેમીમાં બદલવા સેમી પર ટૅપ કરો.",
    "Tap Hop to change the metres part first.": "પહેલાં મીટરનો ભાગ બદલવા કૂદકો પર ટૅપ કરો.",
    "Hop once more, so the point reaches cm.": "એક કૂદકો વધુ, જેથી બિંદુ સેમી સુધી પહોંચે.",
    "Now tap Add part to bring in the 45 cm.": "હવે 45 સેમી લાવવા ભાગ ઉમેરો પર ટૅપ કરો.",
    "Tap Add part to slide the card in.": "કાર્ડ લાવવા ભાગ ઉમેરો પર ટૅપ કરો.",
    "Change the bigger part first, then add the smaller part.": "પહેલાં મોટો ભાગ બદલો, પછી નાનો ભાગ ઉમેરો.",
    "The smaller part's digits fill the columns the point passed.": "નાના ભાગના અંક બિંદુ ગયું તે ખાનાંમાં આવે છે.",
    "The bigger part changed first, and then the smaller part joined it.": "પહેલાં મોટો ભાગ બદલાયો, પછી નાનો ભાગ તેમાં જોડાયો.",
    "You learned: change the bigger part first, then add the smaller part.": "તમે શીખ્યા: પહેલાં મોટો ભાગ બદલો, પછી નાનો ભાગ ઉમેરો.",
    "A bucket holds 4 L 615 mL, so how many millilitres is that?": "ડોલમાં 4 લિ 615 મિલિ છે, તો તે કેટલા મિલિલિટર થાય?",
    "4 L 615 mL in mL?": "4 લિ 615 મિલિ કેટલા મિલિ?",
    "Change only the 4 L into millilitres first.": "પહેલાં ફક્ત 4 લિને મિલિલિટરમાં બદલો.",
    "How many centimetres is 2 m 58 cm?": "2 મી 58 સેમી કેટલા સેન્ટિમીટર થાય?",
    "2 m 58 cm in cm?": "2 મી 58 સેમી કેટલા સેમી?",
    "Change the 2 m into centimetres, then add.": "2 મીને સેન્ટિમીટરમાં બદલો, પછી ઉમેરો.",
    "How many litres is 3 kL 260 L?": "3 કિલિ 260 લિ કેટલા લિટર થાય?",
    "3 kL 260 L in L?": "3 કિલિ 260 લિ કેટલા લિ?",
    "How many litres is the 3 kL alone?": "એકલા 3 કિલિ કેટલા લિટર થાય?",
    "A zero that holds a place": "સ્થાન સાચવતો શૂન્ય",
    "To change 9 km 30 m into m, tap the m column to pin it.": "9 કિમી 30 મીને મીમાં બદલવા મી પર ટૅપ કરો.",
    "Find m in the row of unit names.": "એકમોની હરોળમાં મી શોધો.",
    "Tap Hop to change the kilometres part first.": "પહેલાં કિલોમીટરનો ભાગ બદલવા કૂદકો પર ટૅપ કરો.",
    "Tap Hop again for the next place.": "આગળના સ્થાન માટે ફરી કૂદકો પર ટૅપ કરો.",
    "The point has not reached m yet.": "બિંદુ હજી મી સુધી પહોંચ્યું નથી.",
    "Hop once more, so the point reaches m.": "એક કૂદકો વધુ, જેથી બિંદુ મી સુધી પહોંચે.",
    "One more hop is still to go.": "હજી એક કૂદકો બાકી છે.",
    "Now tap Add part, and look for a column left empty.": "હવે ભાગ ઉમેરો પર ટૅપ કરો અને ખાલી રહેલું ખાનું જુઓ.",
    "Tap Add part to slide the 30 m in.": "30 મી લાવવા ભાગ ઉમેરો પર ટૅપ કરો.",
    "An empty column inside the number still needs a digit.": "સંખ્યાની વચ્ચેના ખાલી ખાનામાં પણ એક અંક જોઈએ.",
    "A zero holds the empty column, so every place is kept.": "શૂન્ય ખાલી ખાનું ભરે છે, જેથી દરેક સ્થાન સચવાય.",
    "The zero kept its place, so the measure stayed right.": "શૂન્યે પોતાનું સ્થાન સાચવ્યું, તેથી માપ સાચું રહ્યું.",
    "You learned: a zero holds an empty place inside the answer.": "તમે શીખ્યા: જવાબની વચ્ચેનું ખાલી સ્થાન શૂન્ય સાચવે છે.",
    "A trail is 8 km 70 m long, so how many metres is that?": "એક કેડી 8 કિમી 70 મી લાંબી છે, તો તે કેટલા મીટર થાય?",
    "8 km 70 m in m?": "8 કિમી 70 મી કેટલા મી?",
    "Change the 8 km into metres before you add the 70 m.": "70 મી ઉમેરતાં પહેલાં 8 કિમીને મીટરમાં બદલો.",
    "How many grams is 5 kg 8 g?": "5 કિગ્રા 8 ગ્રા કેટલા ગ્રામ થાય?",
    "5 kg 8 g in g?": "5 કિગ્રા 8 ગ્રા કેટલા ગ્રા?",
    "Which columns have no digit once the 8 g is in?": "8 ગ્રા આવ્યા પછી કયાં ખાનાંમાં કોઈ અંક નથી?",
    "How many centimetres is 4 m 6 cm?": "4 મી 6 સેમી કેટલા સેન્ટિમીટર થાય?",
    "4 m 6 cm in cm?": "4 મી 6 સેમી કેટલા સેમી?",
    "Once the 6 cm is in, which place is still blank?": "6 સેમી આવ્યા પછી કયું સ્થાન હજી ખાલી છે?",
    "A long road in metres": "લાંબો રસ્તો મીટરમાં",
    "A road is over 9 km long, so tap m to pin the unit you want.": "એક રસ્તો 9 કિમીથી વધુ લાંબો છે, તો મી પર ટૅપ કરો.",
    "Tap Hop to move the road's length one place.": "રસ્તાની લંબાઈ એક સ્થાન ખસેડવા કૂદકો પર ટૅપ કરો.",
    "Each hop multiplies the length by 10, and over stays with it.": "દરેક કૂદકો લંબાઈને 10 વડે ગુણે છે, અને 'થી વધુ' સાથે રહે છે.",
    "Put a zero in every column the point hopped past.": "બિંદુ જે ખાનાં કૂદી ગયું, દરેકમાં શૂન્ય મૂકો.",
    "A long road in km became a bigger number in m, and it was still over.": "કિમીમાં લાંબો રસ્તો મીમાં મોટી સંખ્યા બન્યો, અને 'થી વધુ' રહ્યું.",
    "You learned: km to m is three places to the right, and over stays.": "તમે શીખ્યા: કિમીથી મી ત્રણ સ્થાન જમણે છે, અને 'થી વધુ' રહે છે.",
    "The road sign asks nothing, so we ask: over how many metres is NH44 long?": "પાટિયું કંઈ પૂછતું નથી, તો આપણે પૂછીએ: NH44 કેટલા મીટરથી વધુ લાંબો છે?",
    "Over 4,112 km in m?": "4,112 કિમીથી વધુ, કેટલા મી?",
    "Hop the length one place first, into hectometres.": "પહેલાં લંબાઈને એક સ્થાન, હેક્ટોમીટરમાં લઈ જાઓ.",
    "Now find the same road's length in decametres.": "હવે આ જ રસ્તાની લંબાઈ ડેકામીટરમાં શોધો.",
    "Over 4,112 km in dam?": "4,112 કિમીથી વધુ, કેટલા ડેકામી?",
    "How many places is it from km to dam?": "કિમીથી ડેકામી સુધી કેટલાં સ્થાન છે?",
    "A short road is over 6 km long, so over how many metres is that?": "એક નાનો રસ્તો 6 કિમીથી વધુ લાંબો છે, તો તે કેટલા મીટરથી વધુ થાય?",
    "Over 6 km in m?": "6 કિમીથી વધુ, કેટલા મી?",
    "Count the places from km to m for this road.": "આ રસ્તા માટે કિમીથી મી સુધી સ્થાન ગણો.",
    "Yes, 4 hg is 400 g, two places to the right.": "હા, 4 હેગ્રા એટલે 400 ગ્રા, બે સ્થાન જમણે.",
    "Yes, 6 m is 60 dm, one place to the right.": "હા, 6 મી એટલે 60 ડેસીમી, એક સ્થાન જમણે.",
    "Yes, 4,000 mL and 615 mL make 4,615 mL.": "હા, 4,000 મિલિ અને 615 મિલિ મળીને 4,615 મિલિ.",
    "Yes, 200 cm and 58 cm make 258 cm.": "હા, 200 સેમી અને 58 સેમી મળીને 258 સેમી.",
    "Yes, the zero holds the hundreds place in 8,070 m.": "હા, 8,070 મીમાં શૂન્ય શતકનું સ્થાન સાચવે છે.",
    "Yes, two zeros hold their places in 5,008 g.": "હા, 5,008 ગ્રામાં બે શૂન્ય પોતાનાં સ્થાન સાચવે છે.",
    "Yes, the road is over 41,12,000 m long.": "હા, રસ્તો 41,12,000 મીથી વધુ લાંબો છે.",
    "Yes, NH44 is over 4,11,200 dam long.": "હા, NH44 4,11,200 ડેકામીથી વધુ લાંબો છે.",
    "Tap a unit in the row first.": "પહેલાં હરોળમાં એક એકમ પર ટૅપ કરો.",
    /* the words the picture draws */
    "Given": "આપેલું", "Answer": "જવાબ", "Road": "રસ્તો", "have": "આપેલ", "want": "જોઈએ", "Hop": "કૂદકો", "Add part": "ભાગ ઉમેરો",
    "column": "ખાનું", "over": "થી વધુ",
    "kg": "કિગ્રા", "hg": "હેગ્રા", "dag": "ડેકાગ્રા", "g": "ગ્રા", "dg": "ડેસીગ્રા", "cg": "સેગ્રા", "mg": "મિગ્રા",
    "km": "કિમી", "hm": "હેમી", "dam": "ડેકામી", "m": "મી", "dm": "ડેસીમી", "cm": "સેમી", "mm": "મિમી",
    "kL": "કિલિ", "hL": "હેલિ", "daL": "ડેકાલિ", "L": "લિ", "dL": "ડેસીલિ", "cL": "સેલિ", "mL": "મિલિ",
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
    concept: "Places to the right",
    conceptId: "M2.S2.T4.C15", objectiveIds: ["O5"],
    says: ["Pin the unit you want. Hop right once for each place."],
    /* the guide steps work a WARM-UP measure of their own (3 m into cm), never question 1's; the board starts fresh at the question */
    warm: { row: "length", giv: [3, "m"], to: "cm" },
    steps: [
      { say: "To change 3 m into cm, tap the cm column to pin the unit you want.", on: "pin", hint: "Find cm in the row of unit names." },
      { say: "Tap Hop to move the point one place to the right.", on: "hop", hint: "The Hop key is at the bottom." },
      { say: "Tap Hop again, so the point reaches cm.", on: "hop", hint: "The point has not reached cm yet." },
    ],
    /* tries, as the plan writes it: First rung: count the places between the pins without hopping. Second rung: hop once and read the measure. Third rung: the same task between two neighbouring units, before the question's own measure returns. */
    ladder: ["Each place to the right multiplies the number by 10.", "Every column the point passed with no digit gets a zero."],
    closing: "Every hop to the right made the number 10 times bigger.",
    learned: "You learned: each place to the right multiplies the number by 10.",
    traceback: "The pins light amber, the point hops right one place at a time with × 10 under each hop, grey zeros fill the empty columns, and the answer shows in green.",
    items: [
      /* learn BS1: answer in the plan = 400 g. */
      { qid: "M2.S2.T4.C15:BS1", kind: "hop", row: "weight", giv: [4, "hg"], to: "g", near: 4, winMs: 1700,
        say: "A packet of tea weighs 4 hg, so how many grams is that?", ask: "4 hg in grams?", answer: 400, miss: "Count the places from hg to g." },
      /* practice 1: answer in the plan = 60 dm */
      { qid: "M2.S2.T4.C15:1", kind: "hop", row: "length", giv: [6, "m"], to: "dm", near: 6, winMs: 1400,
        say: "How many decimetres is 6 m?", ask: "6 m in dm?", answer: 60, miss: "How many places is it from m to dm?" },
      /* practice 8: answer in the plan = 4,00,000 mL (practice 2, 4 cg = 40 mg, is unused: the same one-place hop as practice 1) */
      { qid: "M2.S2.T4.C15:8", kind: "hop", row: "capacity", giv: [4, "hL"], to: "mL", near: 40000, winMs: 2600,
        say: "How many millilitres is 4 hL?", ask: "4 hL in mL?", answer: 400000, miss: "Count every place from hL to mL." },
    ],
  },
  {
    n: 2,
    concept: "A mixed measure in the smaller unit",
    conceptId: "M2.S2.T4.C16", objectiveIds: ["O5"],
    says: ["Change the litres first. Then add the millilitres."],
    warm: { row: "length", giv: [3, "m"], part: [45, "cm"], to: "cm" },
    steps: [
      { say: "To change 3 m 45 cm into cm, tap the cm column to pin it.", on: "pin", hint: "Find cm in the row of unit names." },
      { say: "Tap Hop to change the metres part first.", on: "hop", hint: "The Hop key is at the bottom." },
      { say: "Hop once more, so the point reaches cm.", on: "hop", hint: "The point has not reached cm yet." },
      { say: "Now tap Add part to bring in the 45 cm.", on: "add", hint: "Tap Add part to slide the card in." },
    ],
    /* tries, as the plan writes it: First rung: change only the litres part. Second rung: add a millilitres part of three digits. Third rung: the same task on a length in metres and centimetres, before the question's own capacity returns. */
    ladder: ["Change the bigger part first, then add the smaller part.", "The smaller part's digits fill the columns the point passed."],
    closing: "The bigger part changed first, and then the smaller part joined it.",
    learned: "You learned: change the bigger part first, then add the smaller part.",
    traceback: "The bigger part hops into the smaller unit one place at a time, the smaller part's card slides into its columns, and the answer shows in green.",
    items: [
      /* learn BS2: answer in the plan = 4615 mL. */
      { qid: "M2.S2.T4.C16:BS2", kind: "hop", row: "capacity", giv: [4, "L"], part: [615, "mL"], to: "mL", near: 619,
        say: "A bucket holds 4 L 615 mL, so how many millilitres is that?", ask: "4 L 615 mL in mL?", answer: 4615, miss: "Change only the 4 L into millilitres first." },
      /* practice 3: answer in the plan = 258 cm */
      { qid: "M2.S2.T4.C16:3", kind: "hop", row: "length", giv: [2, "m"], part: [58, "cm"], to: "cm", near: 60,
        say: "How many centimetres is 2 m 58 cm?", ask: "2 m 58 cm in cm?", answer: 258, miss: "Change the 2 m into centimetres, then add." },
      /* practice 5: answer in the plan = 3260 L */
      { qid: "M2.S2.T4.C16:5", kind: "hop", row: "capacity", giv: [3, "kL"], part: [260, "L"], to: "L", near: 263,
        say: "How many litres is 3 kL 260 L?", ask: "3 kL 260 L in L?", answer: 3260, miss: "How many litres is the 3 kL alone?" },
    ],
  },
  {
    n: 3,
    concept: "A zero that holds a place",
    conceptId: "M2.S2.T4.C17", objectiveIds: ["O6"],
    says: ["Is any column empty? What goes there?"],
    warm: { row: "length", giv: [9, "km"], part: [30, "m"], to: "m" },
    steps: [
      { say: "To change 9 km 30 m into m, tap the m column to pin it.", on: "pin", hint: "Find m in the row of unit names." },
      { say: "Tap Hop to change the kilometres part first.", on: "hop", hint: "The Hop key is at the bottom." },
      { say: "Tap Hop again for the next place.", on: "hop", hint: "The point has not reached m yet." },
      { say: "Hop once more, so the point reaches m.", on: "hop", hint: "One more hop is still to go." },
      { say: "Now tap Add part, and look for a column left empty.", on: "add", hint: "Tap Add part to slide the 30 m in." },
    ],
    /* tries, as the plan writes it: First rung: change the kilometres part only. Second rung: add a metres part of three digits, with no empty column. Third rung: the same task on one kilometre and a few tens of metres, before the question's own length returns. */
    ladder: ["An empty column inside the number still needs a digit.", "A zero holds the empty column, so every place is kept."],
    closing: "The zero kept its place, so the measure stayed right.",
    learned: "You learned: a zero holds an empty place inside the answer.",
    traceback: "The bigger part hops into the smaller unit, the smaller part slides in, the empty column lights amber and a grey zero drops into it, and the answer shows in green.",
    items: [
      /* learn BS3: answer in the plan = 8070 m. */
      { qid: "M2.S2.T4.C17:BS3", kind: "hop", row: "length", giv: [8, "km"], part: [70, "m"], to: "m", near: 870, winMs: 1400,
        say: "A trail is 8 km 70 m long, so how many metres is that?", ask: "8 km 70 m in m?", answer: 8070, miss: "Change the 8 km into metres before you add the 70 m." },
      /* practice 4: answer in the plan = 5008 g */
      { qid: "M2.S2.T4.C17:4", kind: "hop", row: "weight", giv: [5, "kg"], part: [8, "g"], to: "g", near: 58, winMs: 1700,
        say: "How many grams is 5 kg 8 g?", ask: "5 kg 8 g in g?", answer: 5008, miss: "Which columns have no digit once the 8 g is in?" },
      /* practice 6: answer in the plan = 406 cm */
      { qid: "M2.S2.T4.C17:6", kind: "hop", row: "length", giv: [4, "m"], part: [6, "cm"], to: "cm", near: 46, winMs: 1400,
        say: "How many centimetres is 4 m 6 cm?", ask: "4 m 6 cm in cm?", answer: 406, miss: "Once the 6 cm is in, which place is still blank?" },
    ],
  },
  {
    n: 4,
    concept: "A long road in metres",
    conceptId: "M2.S2.T4.C18", objectiveIds: ["O6"],
    says: ["How long is the road in metres?"],
    warm: { row: "road", giv: [9, "km"], to: "m", over: true },
    steps: [
      { say: "A road is over 9 km long, so tap m to pin the unit you want.", on: "pin", hint: "Find m in the row of unit names." },
      { say: "Tap Hop to move the road's length one place.", on: "hop", hint: "The Hop key is at the bottom." },
      { say: "Tap Hop again for the next place.", on: "hop", hint: "The point has not reached m yet." },
      { say: "Hop once more, so the point reaches m.", on: "hop", hint: "One more hop is still to go." },
    ],
    /* tries, as the plan writes it: First rung: hop the road's length one place, into hectometres. Second rung: one more, into decametres. Third rung: the same task on a short road of a few kilometres, before the question's own road returns. */
    ladder: ["Each hop multiplies the length by 10, and over stays with it.", "Put a zero in every column the point hopped past."],
    closing: "A long road in km became a bigger number in m, and it was still over.",
    learned: "You learned: km to m is three places to the right, and over stays.",
    traceback: "The point hops the road's length right one place at a time with × 10 under each hop, grey zeros fill the empty columns, and a second sign reads the length in green, still with over.",
    items: [
      /* learn BS4: answer in the plan = Over 41,12,000 m. (the road box prints no question: said once, plainly, here) */
      { qid: "M2.S2.T4.C18:BS4", kind: "hop", row: "road", giv: [4112, "km"], to: "m", over: true, near: 411200, winMs: 2000,
        say: "The road sign asks nothing, so we ask: over how many metres is NH44 long?", ask: "Over 4,112 km in m?", answer: 4112000, miss: "Hop the length one place first, into hectometres." },
      /* practice 7: answer in the plan = Over 4,11,200 dam */
      { qid: "M2.S2.T4.C18:7", kind: "hop", row: "road", giv: [4112, "km"], to: "dam", over: true, near: 41120, winMs: 1700,
        say: "Now find the same road's length in decametres.", ask: "Over 4,112 km in dam?", answer: 411200, miss: "How many places is it from km to dam?" },
      /* AUTHORED (qid null): the plan gives this concept two questions and no other plan question is a road in metres; this is the
         plan's own third rung, "the same task on a short road of a few kilometres" */
      { qid: null, kind: "hop", row: "road", giv: [6, "km"], to: "m", over: true, near: 600, winMs: 2000,
        say: "A short road is over 6 km long, so over how many metres is that?", ask: "Over 6 km in m?", answer: 6000, miss: "Count the places from km to m for this road." },
    ],
  },
];

/* The numbers, rows, sizes and targets the working area needs (they go into the sidecar too). */
const MODEL = { rows: RH_ROWS, columnWidth: RH_G.cw, freePlay: RH_FREE,
  rule: "count the places from the unit you have to the unit you want; each place to the right multiplies the number by 10; a mixed measure: the bigger part first, then add the smaller part; a zero holds an empty place" };

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* judge: is this value right for this item? (numbers compare as numbers) */
const judge = (item: any, v: any) => {
  if (item.parts) return judgeSlotParts(item, v);
  if (typeof item.answer === "number") return leadNumber(v) === item.answer;
  return String(v).trim().toLowerCase() === String(item.answer).trim().toLowerCase();
};
/* oracle: every answer re-derived by a second route that shares no code with judge or Work */
/* the second route: each unit's power of ten from its prefix (kilo 3 ... milli -3), so a measure in the unit wanted is
   given x 10^(e have - e want) + part x 10^(e part - e want); no column arithmetic of Work's */
const RH_EXP: any = { k: 3, h: 2, da: 1, d: -1, c: -2, m: -3 };
const rhExp = (u: string) => { const base = ["g", "m", "L"].find((b) => u.endsWith(b) && u.length > b.length); return base ? RH_EXP[u.slice(0, u.length - base.length)] : 0; };
const rhOracle = (it: any) => { const e = rhExp(it.to), v = it.giv[0] * Math.pow(10, rhExp(it.giv[1]) - e) + (it.part ? it.part[0] * Math.pow(10, rhExp(it.part[1]) - e) : 0); return Math.round(v); };
const oracle = () => PHASES.every((p: any) => p.items.every((it: any) => rhOracle(it) === it.answer));
/* the most likely wrong answer (the misconception): the digit with no zeros, the parts added as they stand, the zero left out */
const nearMiss = (item: any) => item.near;
/* the forms of an answer that no question, hint or ladder line may print */
const answerForms = (item: any) => (item.parts ? item.answer.filter((x: number) => x >= 10).flatMap((x: number) => [String(x), indian(x), words(x)])
  : typeof item.answer === "number" ? [String(item.answer), indian(item.answer), words(item.answer)]
  : /^\d*\.\d+$/.test(String(item.answer)) ? [String(item.answer), speakable(item.answer)] : [String(item.answer)]);
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
  const C = api.C;
  const tl = useTimeline();
  const free = stage === "free";
  const demo = stage === "demo";
  const P: any = PHASES[n - 1] || PHASES[0];
  /* the guide steps work the phase's own warm-up measure; every question works its own. A phase opens on "teach" for a frame before
     "demo": that frame is the warm-up's too, so question 1's board never flashes */
  const warmUp = !free && (demo || stage === "teach") && !!P.warm;
  const it: any = free ? RH_FREE : warmUp ? P.warm : item || P.items[0];
  const G = it.row === "road" ? RH_GS : RH_G;
  const L = rhLay(it);
  const full = L.want - L.have;                                   /* the places from the unit you have to the unit you want */
  /* added: the part's card lies on its columns; merged: its digits have become tiles of the one number (the win and the correction only) */
  /* every question (and free play) opens furnished with nothing hopped; a phase that starts again starts clean; the warm-up's
     board is cleared when the steps end, so question 1 opens like questions 2 and 3. The reset happens DURING render (keyed by
     the question and the stage's kind), so no frame of a new question ever draws the old board */
  const qk = n + "|" + index + "|" + (free ? "free" : warmUp ? "demo" : "q");
  const stp = demo ? step || 0 : 0;
  const FRESH = { want: null, hops: 0, added: false, tb: null, tbRun: false, wz: 0, won: false, moving: false, k: qk, st: stp };
  const [s0, setS] = useState<any>(FRESH);
  let s: any = s0;
  if (s0.k !== qk || stp < s0.st) { s = FRESH; setS(FRESH); }
  else if (stp !== s0.st) { s = { ...s0, st: stp }; setS(s); }
  const put = (p: any) => setS((o: any) => ({ ...o, ...p }));
  const playing = useRef(false);
  const lastKey = useRef(0);
  const stRef = useRef(stage);
  stRef.current = stage;
  /* a new question or a restart also ends any timeline of the old one */
  useEffect(() => { tl.stop(); playing.current = false; nudged.current = false; }, [qk, stp === 0]);

  /* the room: the picture is laid out at the open keypad's width (900) and stays at that one place with the keypad shut too, so
     nothing moves while the child types (LAYOUT §3); it is clear of the key's corner in both states */
  const dx = 0;
  const colX = (i: number) => G.x0 + i * G.cw;
  const ccx = (i: number) => colX(i) + G.cw / 2;
  const gapX = (i: number) => colX(i) + G.cw;
  const ptY = G.cellY + G.cellH - 16;

  /* what a state of the chart holds: a digit of the measure (or of the added part), else an empty place */
  const digitAt = (i: number, w: any) => (L.dig[i] != null ? L.dig[i] : w.merged && L.pdig[i] != null ? L.pdig[i] : null);
  const emptiesOf = (w: any) => { const out: number[] = []; for (let i = L.have + 1; i <= L.have + w.hops; i++) if (digitAt(i, w) == null) out.push(i); return out; };
  const fullState = { hops: full, merged: !!it.part };
  const E0 = emptiesOf(fullState).length;
  const readOf = (w: any) => { let str = "", on = false; for (let i = 0; i <= L.have + w.hops; i++) { const d = digitAt(i, w); if (d != null) on = true; if (on) str += d == null ? "0" : d; } return Number(str || "0"); };

  /* what is drawn: the win, the correction's own layer, or the child's own chart */
  const own = { want: s.want, hops: s.hops, added: s.added, merged: false, zeros: free ? 9 : 0, lit: false, card: free && s.hops > 0, green: false };
  /* the win picture stays while the phase's closing line is read (the runtime is "idle" after a phase's last right answer) */
  const win = stage === "win" || (stage === "idle" && s.won);
  const v: any = win ? { want: L.want, hops: full, added: !!it.part, merged: !!it.part, zeros: s.wz, lit: false, card: s.wz >= E0, green: true } : s.tb || own;
  const pc = L.have + v.hops;
  const pcOwn = L.have + s.hops;

  /* every act is performed on screen (api.act): the hand taps the unit, pushes the point, carries the part's card */
  const viaAct = (o: any, done: () => void, always?: () => void) => {
    if (playing.current) return;
    playing.current = true;
    Promise.resolve(api.act ? api.act(o) : true).then((ok: any) => { playing.current = false; if (always) always(); if (ok) done(); });
  };
  /* a tap on the grey Hop key before a unit is pinned says what to do first; the pin then brings the question back */
  const nudged = useRef(false);
  const nudge = () => { nudged.current = true; api.say("Tap a unit in the row first."); };
  /* the child may answer without pinning: the first digit typed or the Answer key opened brings the question back too
     (a miss always follows typing, and the Hint key's hint shows over the line until the next tap) */
  const boxOpen = !!(box && box.open);
  useEffect(() => {
    if (!nudged.current) return;
    if (stage === "ask" && (typed || boxOpen)) { nudged.current = false; api.say(it.say); }
    else if (free && (typed || boxOpen)) { nudged.current = false; api.say(FREE_LINE); }
  }, [typed, boxOpen]);
  const pinAt = (i: number) => viaAct({ tool: "hand", moves: "tap", at: [{ x: dx + ccx(i), y: G.headY + G.headH / 2 }] }, () => {
    setS((o: any) => ({ ...o, want: i, hops: free && i <= L.have + o.hops ? 0 : o.hops, tb: null }));
    api.sfx.tick();
    if (stRef.current === "demo") api.did("pin");
    if (nudged.current) { nudged.current = false; api.say(free ? FREE_LINE : it.say); }
  });
  const hop = () => {
    const from = L.have + s.hops;
    if (from >= 6) return;
    let moved = false;
    const one = () => { if (moved) return; moved = true; setS((o: any) => ({ ...o, hops: o.hops + 1, want: o.want == null ? L.want : o.want, tb: null })); };
    viaAct({ tool: "hand", moves: "push", from: { x: dx + gapX(from) - 40, y: ptY }, at: [{ x: dx + gapX(from + 1), y: ptY }], onPoint: one },
      () => { one(); api.sfx.tick(); if (stRef.current === "demo") api.did("hop"); });
  };
  const PC = { x: G.x0, y: G.keyY, w: 260, h: G.keyH };          /* the smaller part's card, waiting */
  const partText = it.part ? rhNum(it.part[0]) + " " + tx(it.part[1]) : "";
  const partCard = (x: number, y: number) => (
    <g>
      <rect x={x} y={y} width={PC.w} height={PC.h} rx={16} fill={tint(RH.given, 0.86)} stroke={RH.given} strokeWidth={3} />
      <text x={x + PC.w / 2} y={y + PC.h / 2 + 16} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={shade(RH.given, 0.25)}>{partText}</text>
    </g>
  );
  const pcols = L.pdig.map((d: any, i: number) => (d != null ? i : -1)).filter((i: number) => i >= 0);
  const add = () => {
    if (!it.part || s.added) return;
    put({ moving: true });
    const to = { x: dx + (ccx(pcols[0]) + ccx(pcols[pcols.length - 1])) / 2, y: G.cellY + G.cellH / 2 };
    viaAct({ tool: "hand", moves: "carry", from: { x: dx + PC.x + PC.w / 2, y: PC.y + PC.h / 2 }, at: [to], hold: partCard(-PC.w / 2, -PC.h / 2) },
      () => { put({ added: true, tb: null }); api.sfx.settle(); if (stRef.current === "demo") api.did("add"); },
      () => put({ moving: false }));
  };
  const act = (on: any) => (on === "pin" ? pinAt(L.want) : on === "hop" ? hop() : on === "add" ? add() : undefined);
  /* Enter, the agent's check() and the dev solve() perform the CURRENT step */
  api.onEnter(demo && stepOn ? () => act(stepOn) : null);
  HOOK.demo = () => (stepOn ? act(stepOn) : undefined);

  /* the one key at the bottom centre: Hop, then Add part (its label follows the act) */
  let keyOn: any = null, keyLive = false;
  if (demo) {
    if (stepOn === "pin" || stepOn === "hop") { keyOn = "hop"; keyLive = stepOn === "hop"; }
    else if (stepOn === "add") { keyOn = "add"; keyLive = true; }
  } else if (stage === "ask" || free) {
    if (it.part && s.want != null && pcOwn === s.want && !s.added) { keyOn = "add"; keyLive = true; }
    else if (s.want == null || pcOwn < s.want) { keyOn = "hop"; keyLive = s.want != null; }
  }
  if (s.tb) keyOn = null;                       /* while the correction stands, the board is its picture; a tap on a column clears it */
  const pressKey = (on: string) => {
    const t = Date.now();
    if (t - lastKey.current < 400) return;
    lastKey.current = t;
    if (demo && on !== stepOn) { api.did(on); return; }
    act(on);
  };
  /* a column right of the point can take the want pin */
  const tapCol = (i: number) => {
    if (demo) { if (stepOn === "pin" && i === L.want) act("pin"); else api.did("unit"); return; }
    if (free ? i > L.have : i > pcOwn) pinAt(i);
  };
  const pinCols = (s.tbRun ? [] : [0, 1, 2, 3, 4, 5, 6]).filter((i) => (demo || free ? i > L.have : stage === "ask" ? i > pcOwn : false));

  /* the traceback: on its own layer (the child's pins and hops stay theirs), the pins lit amber, the point hopped one place at a
     time with × 10 under each hop, the part slid in, each empty column lit and filled with its grey zero, then the answer in green */
  useEffect(() => {
    if (!wrong || stage !== "ask") return;
    api.lock(true);
    const pt = !!it.part;
    const fr = (h: number, a: boolean, m: boolean, z: number, card: boolean) => ({ want: L.want, hops: h, added: a, merged: m, zeros: z, lit: true, card, green: card });
    const st: any[] = [[900, () => put({ tbRun: true, tb: fr(0, false, false, 0, false) })]];
    for (let k = 1; k <= full; k++) st.push([600, () => { api.sfx.tick(); put({ tb: fr(k, false, false, 0, false) }); }]);
    if (pt) st.push([800, () => { api.sfx.settle(); put({ tb: fr(full, true, false, 0, false) }); }]);
    if (pt) st.push([700, () => { api.sfx.trade(); put({ tb: fr(full, true, true, 0, false) }); }]);
    for (let z = 1; z <= E0; z++) st.push([500, () => { api.sfx.tick(); put({ tb: fr(full, pt, pt, z, false) }); }]);
    st.push([400, () => put({ tb: fr(full, pt, pt, E0, true) })]);
    tl.run(st, () => { put({ tbRun: false }); api.lock(false); });
  }, [wrong]);

  /* the win: the two parts meet in one row, the zeros drop in one after another, the number turns green and the answer card
     (a second road sign) comes; each question's winMs covers the drop */
  useEffect(() => {
    if (stage !== "win") return;
    put({ tb: null, tbRun: false, wz: 0, won: true });
    const st: any[] = [[300, () => {}]];
    for (let z = 1; z <= E0; z++) st.push([320, () => { api.sfx.tick(); put({ wz: z }); }]);
    tl.run(st);
    if (n === 1 && index === 0) api.say("Yes, 4 hg is 400 g, two places to the right.");
    if (n === 1 && index === 1) api.say("Yes, 6 m is 60 dm, one place to the right.");
    if (n === 2 && index === 0) api.say("Yes, 4,000 mL and 615 mL make 4,615 mL.");
    if (n === 2 && index === 1) api.say("Yes, 200 cm and 58 cm make 258 cm.");
    if (n === 3 && index === 0) api.say("Yes, the zero holds the hundreds place in 8,070 m.");
    if (n === 3 && index === 1) api.say("Yes, two zeros hold their places in 5,008 g.");
    if (n === 4 && index === 0) api.say("Yes, the road is over 41,12,000 m long.");
    if (n === 4 && index === 1) api.say("Yes, NH44 is over 4,11,200 dam long.");
    /* the last question of a phase: the runtime shows the phase's closing in place of the win line (keyOnly) */
    const P: any = PHASES[n - 1];
    if (P && index === P.items.length - 1) api.say(P.closing);
  }, [stage]);

  /* what the host and the agent read back (toolApi.getState): never the answer */
  api.share({ row: it.row, have: L.cols[L.have], want: s.want != null ? L.cols[s.want] : null, hops: s.hops, part_added: s.added,
    digits: L.dig.map((d: any) => (d == null ? "" : d)).join("|"), complete: stage === "idle" });

  /* drawing helpers (called, never mounted) */
  const fitFs = (str: string, w: number, max: number) => Math.max(40, Math.min(max, Math.floor(w / (Math.max(1, str.length) * 0.58))));
  const card = (x: number, w: number, cap: string, val: string, col: string) => {
    /* Devanagari and Gujarati rise higher over the baseline: a smaller value keeps it clear of the caption */
    const fs = fitFs(val, w - 32, lang === "en" ? 50 : 40);
    return (
      <g>
        <rect x={x} y={2} width={w} height={G.cardH} rx={16} fill={tint(col, 0.86)} stroke={shade(col, 0.2)} strokeWidth={3} />
        <text x={x + 16} y={32} fontSize={T.micro} fontWeight={600} fill={shade(col, 0.35)}>{cap}</text>
        <text x={x + w / 2} y={2 + G.cardH - 14} textAnchor="middle" fontSize={fs} fontWeight={700} fill={shade(col, 0.3)}>{val}</text>
      </g>
    );
  };
  /* a road sign: the plain plaque (the fallback), the wooden sign skin over it, and the words in deep ink on its cream face */
  const roadSign = (x: number, cap: string, num: number, unit: string, col: string) => {
    const S = RH_SIGN, ink = shade(col, 0.35), fw = S.w - 2 * S.face - 32;   /* the cream face, 16 clear each side */
    const en = lang === "en";
    /* English: caption / "over" / the number with its unit. Hindi and Gujarati: caption / the number alone / the unit with
       "से अधिक" / "થી વધુ" after it (the language's order), so no line carries a matra under the caption's foot */
    const l2 = en ? tx("over") : rhNum(num);
    const l3 = en ? rhNum(num) + " " + tx(unit) : rhOver(tx(unit), it, tx, lang);
    const f2 = en ? T.label : rhFs(l2, fw, T.speech), f3 = en ? rhFs(l3, fw, T.speech) : rhFs(l3, fw, T.label, 28);
    return (
      <g>
        <rect x={x} y={0} width={S.w} height={S.h} rx={18} fill="#B07A3A" stroke="#7A5020" strokeWidth={3} />
        <rect x={x + S.face} y={S.face} width={S.w - 2 * S.face} height={S.h - 2 * S.face} rx={10} fill="#FFF3C8" />
        <Skin name="sign" x={x} y={0} w={S.w} h={S.h} fit="stretch" />
        <text x={x + S.w / 2} y={48} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={ink}>{cap}</text>
        <text x={x + S.w / 2} y={en ? 92 : 98} textAnchor="middle" fontSize={f2} fontWeight={700} fill={ink}>{l2}</text>
        <text x={x + S.w / 2} y={en ? 146 : 144} textAnchor="middle" fontSize={f3} fontWeight={700} fill={ink}>{l3}</text>
      </g>
    );
  };
  /* the part's card laid on its own columns (not yet one number with the bigger part) */
  const laidCard = () => {
    const x1 = colX(pcols[0]) + 5, w = gapX(pcols[pcols.length - 1]) - 5 - x1;
    const fs = Math.max(32, Math.min(T.prompt, Math.floor((w - 16) / (Math.max(1, partText.length) * 0.54))));
    return (
      <g>
        <rect x={x1} y={G.cellY + 6} width={w} height={G.cellH - 12} rx={16} fill={tint(RH.given, 0.86)} stroke={RH.given} strokeWidth={3} />
        <text x={x1 + w / 2} y={G.cellY + G.cellH / 2 + 15} textAnchor="middle" fontSize={fs} fontWeight={700} fill={shade(RH.given, 0.25)}>{partText}</text>
      </g>
    );
  };
  const tag = (x: number, y: number, label: string, col: string, lit: boolean, point: boolean) => (
    <g>
      {lit && <rect x={x - 6} y={y - 6} width={116} height={G.tagH + 12} rx={16} fill="none" stroke={RH.now} strokeWidth={5} />}
      <rect x={x} y={y} width={104} height={G.tagH} rx={12} fill={shade(col, 0.25)} />
      {point && <path d={`M ${x + 40} ${y + G.tagH} L ${x + 52} ${y + G.tagH + 12} L ${x + 64} ${y + G.tagH} Z`} fill={shade(col, 0.25)} />}
      {/* Hindi and Gujarati: 28, set lower, so the matras rise inside the tag (about 4 clear of its top) */}
      <text x={x + 52} y={y + G.tagH / 2 + (lang === "en" ? 11 : 10)} textAnchor="middle" fontSize={lang === "en" ? T.label : T.micro} fontWeight={700} fill="#FFFFFF">{label}</text>
    </g>
  );
  const sign = it.row === "road";
  const signCap = it.giv[0] > 100 ? "NH44" : tx("Road");
  const GC = { x: G.x0, w: 400 };
  const AC = { x: G.x0 + 444, w: G.W - 2 * G.x0 - 444 };
  const ansVal = free ? readOf(v) : it.answer;
  const ansUnit = free ? L.cols[pc] : it.to;
  const zeroOrder = emptiesOf(v);
  const keyX = (G.W - 260) / 2;
  /* one size for the whole row of unit names, fitted in each language to the longest name (40 at most, 32 at least, 8 clear each
     side of the column); set so the ink sits in the middle of the band (Devanagari and Gujarati rise higher over the baseline) */
  const headFs = Math.min(...L.cols.map((u: string) => (u ? rhFs(String(tx(u)), G.cw - 16, T.prompt) : T.prompt)));
  const headBase = G.headY + G.headH / 2 + Math.round((lang === "en" ? 0.36 : lang === "hi" ? 0.5 : 0.42) * headFs);

  const chart = () => (
    <g pointerEvents={s.tb ? "none" : undefined}>
      {/* the measure given, and (once worked) the same measure in the unit wanted */}
      {sign ? roadSign(G.x0, signCap, it.giv[0], it.giv[1], RH.given) : card(GC.x, GC.w, tx("Given"), rhGiven(it, tx, lang), RH.given)}
      {v.card && <text x={sign ? G.x0 + RH_SIGN.w + 24 : GC.x + GC.w + 22} y={sign ? 104 : 62} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={C.ink}>=</text>}
      {v.card && (sign ? roadSign(G.x0 + RH_SIGN.w + 48, signCap, ansVal, ansUnit, RH.answer)
        : card(AC.x, AC.w, tx("Answer"), rhAnswer(it, ansVal, ansUnit, tx, lang), RH.answer))}
      {/* the pins: have over the unit you have; want over the unit pinned, or waiting at the top right */}
      {tag(ccx(L.have) - 52, G.tagY, tx("have"), RH.given, v.lit, true)}
      {v.want != null ? tag(ccx(v.want) - 52, G.tagY, tx("want"), RH.answer, v.lit, true) : tag(G.W - G.x0 - 104, 22, tx("want"), RH.answer, false, false)}
      {/* the row of unit names */}
      <rect x={colX(0)} y={G.headY} width={7 * G.cw} height={G.headH} fill={tint(RH.unit, 0.9)} />
      {L.cols.map((u: string, i: number) => (u ? <text key={"u" + i} x={ccx(i)} y={headBase} textAnchor="middle" fontSize={headFs} fontWeight={700} fill={shade(RH.unit, 0.2)}>{tx(u)}</text> : null))}
      {/* the row of places */}
      {L.cols.map((u: string, i: number) => {
        const d = digitAt(i, v), zi = zeroOrder.indexOf(i), passed = i > L.have && i <= pc;
        const zero = d == null && zi >= 0 && zi < v.zeros;
        const under = v.added && !v.merged && L.pdig[i] != null;          /* covered by the part's laid card */
        /* a passed place with no digit: a quiet ink slot in the child's own chart (finding the zero is the lesson), amber only in
           the correction, its grey zero only at the win */
        const slot = d == null && passed && !zero && !under, lit = slot && v.lit;
        const x = colX(i), y = G.cellY;
        return (
          <g key={"c" + i}>
            <rect x={x} y={y} width={G.cw} height={G.cellH} fill={lit ? tint(RH.now, 0.78) : "#FFFFFF"} stroke={C.ink} strokeWidth={2.4} />
            {slot && <rect x={x + 10} y={y + 10} width={G.cw - 20} height={G.cellH - 20} rx={12} fill="none" stroke={lit ? shade(RH.now, 0.3) : tint(C.ink, 0.6)} strokeWidth={lit ? 3 : 2} strokeDasharray="10 8" />}
            {d != null && <rect x={x + 8} y={y + 8} width={G.cw - 16} height={G.cellH - 16} rx={14} fill={tint(v.green ? RH.answer : RH.given, 0.84)} stroke={v.green ? RH.answer : RH.given} strokeWidth={2.5} />}
            {d != null && <text x={ccx(i)} y={y + G.cellH / 2 + 25} textAnchor="middle" fontSize={T.display} fontWeight={700} fill={shade(v.green ? RH.answer : RH.given, 0.3)}>{d}</text>}
            {zero && <text x={ccx(i)} y={y + G.cellH / 2 + 25} textAnchor="middle" fontSize={T.display} fontWeight={700} fill={RH.hold}>0</text>}
          </g>
        );
      })}
      <rect x={colX(0)} y={G.headY} width={7 * G.cw} height={G.cellY + G.cellH - G.headY} fill="none" stroke={C.ink} strokeWidth={4.5} />
      {it.part && v.added && !v.merged && pcols.length > 0 && laidCard()}
      {/* each hop: an arrow under the row, × 10 */}
      {Array.from({ length: v.hops }, (_, k) => {
        const a = gapX(L.have + k) + 8, b = gapX(L.have + k + 1) - 8, m = (a + b) / 2;
        return (
          <g key={"h" + k}>
            <path d={`M ${a} ${G.arcY} Q ${m} ${G.arcY + 40} ${b} ${G.arcY}`} fill="none" stroke={RH.move} strokeWidth={5} strokeLinecap="round" />
            <path d={`M ${b} ${G.arcY} l -18 2 l 7 14 z`} fill={RH.move} />
            <text x={m} y={G.arcY + G.lab} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={shade(RH.move, 0.3)}>× 10</text>
          </g>
        );
      })}
      {/* the point, in the gap after the unit it is read in */}
      <circle cx={gapX(pc)} cy={ptY} r={12} fill={C.ink} stroke="#FFFFFF" strokeWidth={3} />
      {/* the smaller part's card, waiting until Add part brings it in */}
      {it.part && !v.added && !s.moving && partCard(PC.x, PC.y)}
    </g>
  );

  return (
    <g transform={`translate(${dx},0)`}>
      {chart()}
      {pinCols.map((i) => (
        <Hit key={"p" + i} id={demo && stepOn === "pin" && i === L.want ? "pin" : "col-" + i} x={colX(i)} y={G.headY} w={G.cw} h={G.cellY + G.cellH - G.headY}
          label={(L.cols[i] ? tx(L.cols[i]) + " " : "") + tx("column")} onPress={() => tapCol(i)} />
      ))}
      {keyOn && (
        <Key key="act" id={keyOn} label={tx(keyOn === "add" ? "Add part" : "Hop")} x={keyX} y={G.keyY} w={260} h={G.keyH} C={C} tone="key" disabled={!keyLive}
          onClick={() => pressKey(keyOn)}>
          <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={keyLive ? toneInk("key", C.ink) : C.dim}>{tx(keyOn === "add" ? "Add part" : "Hop")}</text>
        </Key>
      )}
      {/* the grey Hop key before a unit is pinned: a tap says what to do first */}
      {keyOn === "hop" && !keyLive && !demo && s.want == null && (stage === "ask" || free) && (
        <Hit id="hop-first" x={keyX} y={G.keyY} w={260} h={G.keyH} label={tx("Hop")} onPress={nudge} />
      )}
      {/* the one invite on the unit to pin: an oval as wide as its column, so no name touches it */}
      {demo && stepOn === "pin" && (
        <ellipse className="c4-pulse" cx={ccx(L.want)} cy={G.headY + G.headH / 2} rx={G.cw / 2 - 4} ry={G.headH / 2 + 2} fill="none"
          stroke={(typeof THEME !== "undefined" && THEME && THEME.enter && THEME.enter[1]) || C.accent} strokeWidth={5} pointerEvents="none" />
      )}
      {demo && (stepOn === "hop" || stepOn === "add") && <Invite x={keyX + 130} y={G.keyY + G.keyH / 2} r={44} C={C} />}
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase: the measure given, and the child's answer */
function Thumb({ n, result, it, C, w, h, lang = "en", tx = (v: any) => v }: any) {
  const last = result && result.last;
  const item = it || (last && PHASES[n - 1] && PHASES[n - 1].items[last.item]);
  if (!item || !last) return null;
  const val = leadNumber(last.value);
  const a = rhGiven(item, tx, lang), b = "= " + rhAnswer(item, val == null ? item.answer : val, item.to, tx, lang);
  /* each line fitted to the box less 16 a side (squeezed only when it would run past) */
  /* a line too long for the box (16 clear a side) is narrowed word by word, each word to its own length, so the word gaps stay open;
     the type stays 28 */
  const line = (str: string, y: number, fill: string) => {
    const ws = String(str).split(" "), ems = ws.map(rhEm), sp = 0.3, tot = ems.reduce((p: number, q: number) => p + q, 0) + sp * (ws.length - 1);
    const k = (w - 32) / Math.max(1, tot * T.micro);
    if (k >= 1) return <text x={16} y={y} fontSize={T.micro} fontWeight={700} fill={fill}>{str}</text>;
    let xx = 16;
    return <g>{ws.map((wd: string, j: number) => { const len = ems[j] * T.micro * k, x0 = xx; xx += len + sp * T.micro * k;
      return <text key={j} x={x0} y={y} fontSize={T.micro} fontWeight={700} fill={fill} textLength={len} lengthAdjust="spacingAndGlyphs">{wd}</text>; })}</g>;
  };
  /* Hindi and Gujarati letters rise and fall further than two lines of 28 allow in the row: the child's answer alone, one line */
  if (lang !== "en") {
    const c = rhAnswer(item, val == null ? item.answer : val, item.to, tx, lang);
    return (
      <g>
        <rect x={0} y={0} width={w} height={h} rx={12} fill="#FFFFFF" stroke={C.rule} strokeWidth={1.5} />
        {line(c, h / 2 + 9, shade(RH.answer, 0.3))}
      </g>
    );
  }
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={12} fill="#FFFFFF" stroke={C.rule} strokeWidth={1.5} />
      {line(a, h / 2 - 6, shade(RH.given, 0.25))}
      {line(b, h / 2 + 26, shade(RH.answer, 0.3))}
    </g>
  );
}

function BiggerToSmaller(props: any) {
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

export default BiggerToSmaller;
