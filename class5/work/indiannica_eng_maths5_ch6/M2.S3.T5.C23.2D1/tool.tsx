/* ═══ M2.S3.T5.C23.2D1 · per_cent_back · tool-specific part ═══════════════════════════════
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

const TOOL_ID = "per_cent_back";
const MEDIA_ID = "M2.S3.T5.C23.2D1";
const TOOL_NAME = "Per Cent Unpacker";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
/* kept for the tool object's shape (and the sidecar); nothing speaks from r30 */
const VOICE = {"rate":0.92,"pitch":1.06};

/* printed on the bubble before phase 1's teach lines only (the plan's opening line; not shown when phase 1 has steps) */
const OPENING = ["A per cent, ready to be written over a hundred."];
/* the whole-tool line: printed on the summary page */
const FINISH_LINE = "Every per cent went back to hundredths, then to its new form.";
/* printed when the child opens Free play (the plan's free-play line); its LAST piece stays on the bubble */
const FREE_LINE = "Free play. Tap the per cent card for a new one, then tap Unpack.";

/* THE START PAGE (runtime r28; docs/LAYOUT.md §1c, docs/PATTERNS.md §14): the first thing a child sees in user mode.
   START_HOOK is ONE printed question to wonder at (it needs a TR entry, and never gives an answer away); StartArt is
   the object the lesson is about, drawn in a 1200 x 340 box ({ box, C, lang, tx }; plain shapes in the chrome and content
   colours, a <Skin> over them when the image agent made one). This stub is a dashed outline: draw the real object. */
const START_HOOK = "What does a per cent look like as a fraction or a decimal?";
function StartArt({ box, C, lang, tx = (v: any) => v }: any) {
  /* the per cent card, its hundred grid, and the two forms it unpacks into (empty: nothing here answers a question) */
  const s = 300, gx = 420, gy = 20;
  const forms = [{ t: "Fraction", x: 820 }, { t: "Decimal", x: 1020 }];
  return (
    <g>
      <rect x={60} y={90} width={260} height={170} rx={RAD.card} fill={PU_BLUE} stroke={shade(PU_BLUE, 0.3)} strokeWidth={3} />
      <text x={190} y={205} textAnchor="middle" fontSize={T.display} fontWeight={700} fill="#FFFFFF">45%</text>
      {puGridDraw(gx, gy, s, 45, 0, "sa")}
      <path d={`M ${gx + s + 24} ${gy + s / 2} H ${forms[0].x - 24}`} stroke={C.ink} strokeWidth={5} strokeLinecap="round" />
      <path d={`M ${forms[0].x - 40} ${gy + s / 2 - 14} L ${forms[0].x - 24} ${gy + s / 2} L ${forms[0].x - 40} ${gy + s / 2 + 14}`} fill="none" stroke={C.ink} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />
      {forms.map((f) => (
        <g key={f.t}>
          <rect x={f.x} y={70} width={170} height={210} rx={RAD.card} fill="#FFFFFF" stroke={PU_GREEN} strokeWidth={4} />
          <text x={f.x + 85} y={118} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={PU_GREEN_INK}>{tx(f.t)}</text>
          {f.t === "Fraction" ? (
            <g>
              <rect x={f.x + 45} y={134} width={80} height={52} rx={10} fill={tint(C.panel, 0.6)} stroke={C.rule} strokeWidth={2} />
              <path d={`M ${f.x + 35} 200 H ${f.x + 135}`} stroke={C.ink} strokeWidth={4} />
              <rect x={f.x + 45} y={214} width={80} height={52} rx={10} fill={tint(C.panel, 0.6)} stroke={C.rule} strokeWidth={2} />
            </g>
          ) : (
            <g>
              <rect x={f.x + 18} y={160} width={56} height={70} rx={10} fill={tint(C.panel, 0.6)} stroke={C.rule} strokeWidth={2} />
              <circle cx={f.x + 86} cy={222} r={6} fill={C.ink} />
              <rect x={f.x + 98} y={160} width={56} height={70} rx={10} fill={tint(C.panel, 0.6)} stroke={C.rule} strokeWidth={2} />
            </g>
          )}
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
/* terms, one per idea: per cent प्रतिशत / ટકા · fraction भिन्न / અપૂર્ણાંક · decimal दशमलव / દશાંશ સંખ્યા · decimal point दशमलव बिंदु /
   દશાંશ ચિહ્ન · lowest terms सरलतम रूप / અતિસંક્ષિપ્ત સ્વરૂપ · HCF म॰स॰प॰ / ગુ૰સા૰અ૰ · numerator, denominator अंश, हर / અંશ, છેદ ·
   ones, tenths, hundredths, thousandths इकाई, दशांश, शतांश, सहस्रांश / એકમ, દશાંશ, શતાંશ, સહસ્ત્રાંશ · whole पूरा / આખું ·
   whole number पूर्ण संख्या / પૂર્ણ સંખ્યા · chart सारणी / કોઠો · column स्तंभ / સ્તંભ (Hindi never uses "हर" for "each": it is the denominator) */
const TR: any = {
  hi: {
    "Per Cent Unpacker": "प्रतिशत खोलो",
    "Free play. Tap the per cent card for a new one, then tap Unpack.": "खुला खेल। नए प्रतिशत के लिए कार्ड दबाओ, फिर 'खोलो' दबाओ।",
    "What does a per cent look like as a fraction or a decimal?": "प्रतिशत भिन्न या दशमलव में कैसा दिखता है?",
    "Back to a fraction": "वापस भिन्न में",
    "Tap Over 100 to write 35% as a fraction.": "35% को भिन्न में लिखने के लिए '100 पर लिखो' दबाओ।",
    "Tap the Over 100 key under the bar.": "पट्टी के नीचे '100 पर लिखो' कुंजी दबाओ।",
    "Now tap Divide by HCF to reach lowest terms.": "अब सरलतम रूप के लिए 'म॰स॰प॰ से भाग दो' दबाओ।",
    "The same key now says Divide by HCF.": "वही कुंजी अब 'म॰स॰प॰ से भाग दो' कहती है।",
    "The HCF is the biggest number that divides both terms.": "म॰स॰प॰ वह सबसे बड़ी संख्या है जो अंश और हर दोनों को भाग दे।",
    "Divide the top and the bottom by the HCF, then check nothing else divides both.": "अंश और हर को म॰स॰प॰ से भाग दो, फिर देखो कोई और संख्या दोनों को भाग न दे।",
    "A per cent goes over 100, then both terms are divided by the HCF.": "प्रतिशत को 100 पर लिखो, फिर अंश और हर को म॰स॰प॰ से भाग दो।",
    "You learned: write a per cent over 100, then divide by the HCF.": "तुमने सीखा: प्रतिशत को 100 पर लिखो, फिर म॰स॰प॰ से भाग दो।",
    "Write 36% as a fraction in lowest terms.": "36% को सरलतम रूप में भिन्न लिखो।",
    "36% in lowest terms?": "36% सरलतम रूप में?",
    "Write 36 over 100, then simplify both terms together.": "36 को 100 पर लिखो, फिर अंश और हर को साथ-साथ सरल करो।",
    "Now write 90% as a fraction in lowest terms.": "अब 90% को सरलतम रूप में भिन्न लिखो।",
    "90% in lowest terms?": "90% सरलतम रूप में?",
    "Both terms end in zero, so try a number bigger than 2.": "अंश और हर दोनों के अंत में शून्य है, तो 2 से बड़ी संख्या आज़माओ।",
    "Write 44% in lowest terms too.": "44% को भी सरलतम रूप में लिखो।",
    "44% in lowest terms?": "44% सरलतम रूप में?",
    "Keep dividing until only 1 divides both terms.": "तब तक भाग देते रहो जब तक केवल 1 ही दोनों को भाग दे।",
    "Very large and very small per cents": "बहुत बड़े और बहुत छोटे प्रतिशत",
    "Tap Over 100 to write 175% as a fraction.": "175% को भिन्न में लिखने के लिए '100 पर लिखो' दबाओ।",
    "Tap the Over 100 key under the bars.": "पट्टियों के नीचे '100 पर लिखो' कुंजी दबाओ।",
    "The key now says Divide by HCF.": "कुंजी पर अब 'म॰स॰प॰ से भाग दो' लिखा है।",
    "Now 1/2%: tap Split to cut one hundredth in half.": "अब 1/2%: एक शतांश को आधा करने के लिए 'काटो' दबाओ।",
    "Tap Split to cut the small part.": "छोटे भाग को काटने के लिए 'काटो' दबाओ।",
    "Divide both terms by their HCF, even when the top is bigger.": "अंश बड़ा हो तब भी, अंश और हर को उनके म॰स॰प॰ से भाग दो।",
    "Each full bar is one whole, and the last bar shows the part left.": "प्रत्येक भरी पट्टी एक पूरा है, और आखिरी पट्टी बचा भाग दिखाती है।",
    "A fraction of one per cent is that fraction of one hundredth.": "एक प्रतिशत का कोई भाग, एक शतांश का उतना ही भाग होता है।",
    "You learned: 175% is more than one whole, and 1/2% is 1/200.": "तुमने सीखा: 175% एक पूरे से ज़्यादा है, और 1/2% = 1/200 है।",
    "Write 240% as a fraction in lowest terms.": "240% को सरलतम रूप में भिन्न लिखो।",
    "240% in lowest terms?": "240% सरलतम रूप में?",
    "Per cent means out of 100, so 240 goes over 100.": "प्रतिशत का अर्थ है 100 में से, तो 240 को 100 पर लिखो।",
    "Write 300% as a whole number.": "300% को पूर्ण संख्या में लिखो।",
    "300% as a whole number?": "300% पूर्ण संख्या में?",
    "Look at how many bars are full.": "देखो कितनी पट्टियाँ पूरी भरी हैं।",
    "Write 1/8% as a fraction.": "1/8% को भिन्न में लिखो।",
    "1/8% as a fraction?": "1/8% भिन्न में?",
    "1/8% is 1/8 of one hundredth, not 1/8 of the whole.": "1/8% एक शतांश का 1/8 है, पूरे का 1/8 नहीं।",
    "Multiply 1/8 by 1/100.": "1/8 को 1/100 से गुणा करो।",
    "Cut each of the 100 parts into 8, then count the parts in one whole.": "100 भागों में से प्रत्येक को 8 में काटो, फिर एक पूरे के भाग गिनो।",
    "Per cents as decimals": "प्रतिशत दशमलव में",
    "Tap Hundredths to pour 73% into the chart.": "73% को सारणी में डालने के लिए 'शतांश' दबाओ।",
    "Tap the Hundredths key beside the grid.": "ग्रिड के पास 'शतांश' कुंजी दबाओ।",
    "Count the full columns as tenths and the single cells as hundredths.": "भरे स्तंभों को दशांश और अकेले खानों को शतांश गिनो।",
    "Tenths go just after the point, and hundredths after them.": "दशांश दशमलव बिंदु के ठीक बाद आते हैं, और शतांश उनके बाद।",
    "A whole-number per cent is that many hundredths, written as a decimal.": "पूर्ण संख्या वाला प्रतिशत उतने ही शतांश है, जिसे दशमलव में लिखते हैं।",
    "You learned: 37% is 37 hundredths, written 0.37.": "तुमने सीखा: 37% यानी 37 शतांश, जो 0.37 लिखा जाता है।",
    "Write 83% as a decimal.": "83% को दशमलव में लिखो।",
    "83% as a decimal?": "83% दशमलव में?",
    "83% means 83 hundredths, so find the Hundredths column in the chart.": "83% यानी 83 शतांश, तो सारणी में शतांश का स्तंभ ढूँढो।",
    "Now write 58% as a decimal.": "अब 58% को दशमलव में लिखो।",
    "58% as a decimal?": "58% दशमलव में?",
    "Look at the full columns of the grid first.": "पहले ग्रिड के भरे स्तंभ देखो।",
    "Write 306% as a decimal.": "306% को दशमलव में लिखो।",
    "306% as a decimal?": "306% दशमलव में?",
    "Each full grid is one whole, so the wholes go before the point.": "प्रत्येक भरा ग्रिड एक पूरा है, तो पूरे दशमलव बिंदु से पहले आते हैं।",
    "Per cents with a point": "दशमलव बिंदु वाले प्रतिशत",
    "Tap Split hundredths to cut each hundredth into ten slices.": "प्रत्येक शतांश को दस टुकड़ों में काटने के लिए 'शतांश काटो' दबाओ।",
    "Tap the Split hundredths key.": "'शतांश काटो' कुंजी दबाओ।",
    "Now tap Count to put the slices in the chart.": "अब टुकड़ों को सारणी में रखने के लिए 'गिनो' दबाओ।",
    "The key now says Count.": "कुंजी पर अब 'गिनो' लिखा है।",
    "Count each whole hundredth as ten slices.": "प्रत्येक पूरे शतांश को दस टुकड़े गिनो।",
    "Write the thousandths with three places after the point.": "सहस्रांश को दशमलव बिंदु के बाद तीन स्थानों में लिखो।",
    "A per cent with a point is read as thousandths, three places after the point.": "दशमलव बिंदु वाला प्रतिशत सहस्रांश में पढ़ते हैं, बिंदु के बाद तीन स्थान।",
    "You learned: 4.5% is 45 thousandths, written 0.045.": "तुमने सीखा: 4.5% यानी 45 सहस्रांश, जो 0.045 लिखा जाता है।",
    "Write 6.5% as a decimal.": "6.5% को दशमलव में लिखो।",
    "6.5% as a decimal?": "6.5% दशमलव में?",
    "6.5 hundredths is how many thousandths?": "6.5 शतांश कितने सहस्रांश हैं?",
    "Now write 3.5% as a decimal.": "अब 3.5% को दशमलव में लिखो।",
    "3.5% as a decimal?": "3.5% दशमलव में?",
    "Count the slices of one split hundredth.": "एक कटे शतांश के टुकड़े गिनो।",
    "Write 12.4% as a decimal.": "12.4% को दशमलव में लिखो।",
    "12.4% as a decimal?": "12.4% दशमलव में?",
    "Look at the full column and the single cells of the grid.": "ग्रिड का भरा स्तंभ और अकेले खाने देखो।",
    "Yes, 36 over 100 is 9 over 25 in lowest terms.": "हाँ, 36/100 सरलतम रूप में 9/25 है।",
    "Yes, dividing both terms by 10 gives 9 over 10.": "हाँ, अंश और हर को 10 से भाग देने पर 9/10 मिलता है।",
    "Yes, 240% is 12 over 5, more than two wholes.": "हाँ, 240% = 12/5, दो पूरे से ज़्यादा।",
    "Yes, 300% is 3 wholes.": "हाँ, 300% यानी 3 पूरे।",
    "Yes, 83 hundredths is written 0.83.": "हाँ, 83 शतांश को 0.83 लिखते हैं।",
    "Yes, 5 tenths and 8 hundredths make 0.58.": "हाँ, 5 दशांश और 8 शतांश मिलकर 0.58 बनाते हैं।",
    "Yes, 65 thousandths is written 0.065.": "हाँ, 65 सहस्रांश को 0.065 लिखते हैं।",
    "Yes, 35 thousandths is written 0.035.": "हाँ, 35 सहस्रांश को 0.035 लिखते हैं।",
    /* the words the picture draws (tx), the key labels and the card's boxes */
    "Given": "दिया है", "Answer": "उत्तर", "Whole": "पूरा", "Part": "भाग", "1 hundredth": "1 शतांश",
    "800 in 1 whole": "1 पूरे में 800", "200 in 1 whole": "1 पूरे में 200", "New per cent": "नया प्रतिशत", "Unpack": "खोलो",
    "Fraction": "भिन्न", "Decimal": "दशमलव", "Place holder": "स्थानधारक",
    "Ones": "इकाई", "Tenths": "दशांश", "Hundredths": "शतांश", "Thousandths": "सहस्रांश",
    "Over 100": "100 पर लिखो", "Divide by HCF": "म॰स॰प॰ से भाग दो", "Count": "गिनो", "Split": "काटो", "Split hundredths": "शतांश काटो",
    "numerator": "अंश", "denominator": "हर", "whole": "पूर्ण", "decimal": "दशमलव भाग",
  },
  gu: {
    "Per Cent Unpacker": "ટકા ખોલો",
    "Free play. Tap the per cent card for a new one, then tap Unpack.": "મુક્ત રમત. નવા ટકા માટે કાર્ડ દબાવો, પછી 'ખોલો' દબાવો.",
    "What does a per cent look like as a fraction or a decimal?": "અપૂર્ણાંક કે દશાંશ સંખ્યામાં ટકા કેવા દેખાય?",
    "Back to a fraction": "પાછા અપૂર્ણાંકમાં",
    "Tap Over 100 to write 35% as a fraction.": "35% ને અપૂર્ણાંકમાં લખવા 'છેદ 100' દબાવો.",
    "Tap the Over 100 key under the bar.": "પટ્ટી નીચે 'છેદ 100' કી દબાવો.",
    "Now tap Divide by HCF to reach lowest terms.": "હવે અતિસંક્ષિપ્ત સ્વરૂપ માટે 'ગુ૰સા૰અ૰ વડે ભાગો' દબાવો.",
    "The same key now says Divide by HCF.": "એ જ કી પર હવે 'ગુ૰સા૰અ૰ વડે ભાગો' લખ્યું છે.",
    "The HCF is the biggest number that divides both terms.": "ગુ૰સા૰અ૰ એ અંશ અને છેદ બંનેને ભાગી શકે તેવી સૌથી મોટી સંખ્યા છે.",
    "Divide the top and the bottom by the HCF, then check nothing else divides both.": "અંશ અને છેદને ગુ૰સા૰અ૰ વડે ભાગો, પછી જુઓ કે બીજી કોઈ સંખ્યા બંનેને ન ભાગે.",
    "A per cent goes over 100, then both terms are divided by the HCF.": "ટકાને 100 ના છેદ પર લખો, પછી અંશ અને છેદને ગુ૰સા૰અ૰ વડે ભાગો.",
    "You learned: write a per cent over 100, then divide by the HCF.": "તમે શીખ્યા: ટકાને 100 ના છેદ પર લખો, પછી ગુ૰સા૰અ૰ વડે ભાગો.",
    "Write 36% as a fraction in lowest terms.": "36% ને અતિસંક્ષિપ્ત સ્વરૂપમાં અપૂર્ણાંક તરીકે લખો.",
    "36% in lowest terms?": "36% અતિસંક્ષિપ્ત સ્વરૂપમાં?",
    "Write 36 over 100, then simplify both terms together.": "36 ને 100 ના છેદ પર લખો, પછી અંશ અને છેદને સાથે સાદું રૂપ આપો.",
    "Now write 90% as a fraction in lowest terms.": "હવે 90% ને અતિસંક્ષિપ્ત સ્વરૂપમાં અપૂર્ણાંક તરીકે લખો.",
    "90% in lowest terms?": "90% અતિસંક્ષિપ્ત સ્વરૂપમાં?",
    "Both terms end in zero, so try a number bigger than 2.": "અંશ અને છેદ બંનેને અંતે શૂન્ય છે, તો 2 થી મોટી સંખ્યા અજમાવો.",
    "Write 44% in lowest terms too.": "44% ને પણ અતિસંક્ષિપ્ત સ્વરૂપમાં લખો.",
    "44% in lowest terms?": "44% અતિસંક્ષિપ્ત સ્વરૂપમાં?",
    "Keep dividing until only 1 divides both terms.": "ફક્ત 1 જ બંનેને ભાગે ત્યાં સુધી ભાગતા રહો.",
    "Very large and very small per cents": "ખૂબ મોટા અને ખૂબ નાના ટકા",
    "Tap Over 100 to write 175% as a fraction.": "175% ને અપૂર્ણાંકમાં લખવા 'છેદ 100' દબાવો.",
    "Tap the Over 100 key under the bars.": "પટ્ટીઓ નીચે 'છેદ 100' કી દબાવો.",
    "The key now says Divide by HCF.": "કી પર હવે 'ગુ૰સા૰અ૰ વડે ભાગો' લખ્યું છે.",
    "Now 1/2%: tap Split to cut one hundredth in half.": "હવે 1/2%: એક શતાંશને અડધો કરવા 'કાપો' દબાવો.",
    "Tap Split to cut the small part.": "નાના ભાગને કાપવા 'કાપો' દબાવો.",
    "Divide both terms by their HCF, even when the top is bigger.": "અંશ મોટો હોય તો પણ, અંશ અને છેદને તેમના ગુ૰સા૰અ૰ વડે ભાગો.",
    "Each full bar is one whole, and the last bar shows the part left.": "દરેક ભરેલી પટ્ટી એક આખું છે, અને છેલ્લી પટ્ટી બાકીનો ભાગ બતાવે છે.",
    "A fraction of one per cent is that fraction of one hundredth.": "એક ટકાનો કોઈ ભાગ, એક શતાંશનો એટલો જ ભાગ હોય છે.",
    "You learned: 175% is more than one whole, and 1/2% is 1/200.": "તમે શીખ્યા: 175% એક આખા કરતાં વધુ છે, અને 1/2% એ 1/200 છે.",
    "Write 240% as a fraction in lowest terms.": "240% ને અતિસંક્ષિપ્ત સ્વરૂપમાં અપૂર્ણાંક તરીકે લખો.",
    "240% in lowest terms?": "240% અતિસંક્ષિપ્ત સ્વરૂપમાં?",
    "Per cent means out of 100, so 240 goes over 100.": "ટકા એટલે 100 માંથી, તો 240 ને 100 ના છેદ પર લખો.",
    "Write 300% as a whole number.": "300% ને પૂર્ણ સંખ્યા તરીકે લખો.",
    "300% as a whole number?": "300% પૂર્ણ સંખ્યામાં?",
    "Look at how many bars are full.": "જુઓ કેટલી પટ્ટીઓ પૂરી ભરેલી છે.",
    "Write 1/8% as a fraction.": "1/8% ને અપૂર્ણાંક તરીકે લખો.",
    "1/8% as a fraction?": "1/8% અપૂર્ણાંકમાં?",
    "1/8% is 1/8 of one hundredth, not 1/8 of the whole.": "1/8% એ એક શતાંશનો 1/8 છે, આખાનો 1/8 નહીં.",
    "Multiply 1/8 by 1/100.": "1/8 ને 1/100 વડે ગુણો.",
    "Cut each of the 100 parts into 8, then count the parts in one whole.": "100 ભાગમાંથી દરેકને 8 માં કાપો, પછી એક આખાના ભાગ ગણો.",
    "Per cents as decimals": "ટકા દશાંશ સંખ્યામાં",
    "Tap Hundredths to pour 73% into the chart.": "73% ને કોઠામાં મૂકવા 'શતાંશ' દબાવો.",
    "Tap the Hundredths key beside the grid.": "ગ્રિડ પાસે 'શતાંશ' કી દબાવો.",
    "Count the full columns as tenths and the single cells as hundredths.": "ભરેલા સ્તંભને દશાંશ અને એકલાં ખાનાંને શતાંશ ગણો.",
    "Tenths go just after the point, and hundredths after them.": "દશાંશ ચિહ્ન પછી તરત દશાંશ આવે, અને તેના પછી શતાંશ.",
    "A whole-number per cent is that many hundredths, written as a decimal.": "પૂર્ણ સંખ્યાવાળા ટકા એટલા જ શતાંશ છે, જે દશાંશ સંખ્યામાં લખાય છે.",
    "You learned: 37% is 37 hundredths, written 0.37.": "તમે શીખ્યા: 37% એટલે 37 શતાંશ, જે 0.37 લખાય છે.",
    "Write 83% as a decimal.": "83% ને દશાંશ સંખ્યા તરીકે લખો.",
    "83% as a decimal?": "83% દશાંશ સંખ્યામાં?",
    "83% means 83 hundredths, so find the Hundredths column in the chart.": "83% એટલે 83 શતાંશ, તો કોઠામાં શતાંશનો સ્તંભ શોધો.",
    "Now write 58% as a decimal.": "હવે 58% ને દશાંશ સંખ્યા તરીકે લખો.",
    "58% as a decimal?": "58% દશાંશ સંખ્યામાં?",
    "Look at the full columns of the grid first.": "પહેલાં ગ્રિડના ભરેલા સ્તંભ જુઓ.",
    "Write 306% as a decimal.": "306% ને દશાંશ સંખ્યા તરીકે લખો.",
    "306% as a decimal?": "306% દશાંશ સંખ્યામાં?",
    "Each full grid is one whole, so the wholes go before the point.": "દરેક ભરેલી ગ્રિડ એક આખું છે, તો આખાં દશાંશ ચિહ્ન પહેલાં આવે.",
    "Per cents with a point": "દશાંશ ચિહ્નવાળા ટકા",
    "Tap Split hundredths to cut each hundredth into ten slices.": "દરેક શતાંશના દસ ટુકડા કરવા 'શતાંશ કાપો' દબાવો.",
    "Tap the Split hundredths key.": "'શતાંશ કાપો' કી દબાવો.",
    "Now tap Count to put the slices in the chart.": "હવે ટુકડાને કોઠામાં મૂકવા 'ગણો' દબાવો.",
    "The key now says Count.": "કી પર હવે 'ગણો' લખ્યું છે.",
    "Count each whole hundredth as ten slices.": "દરેક આખા શતાંશને દસ ટુકડા ગણો.",
    "Write the thousandths with three places after the point.": "સહસ્ત્રાંશને દશાંશ ચિહ્ન પછી ત્રણ સ્થાનમાં લખો.",
    "A per cent with a point is read as thousandths, three places after the point.": "દશાંશ ચિહ્નવાળા ટકા સહસ્ત્રાંશમાં વંચાય, ચિહ્ન પછી ત્રણ સ્થાન.",
    "You learned: 4.5% is 45 thousandths, written 0.045.": "તમે શીખ્યા: 4.5% એટલે 45 સહસ્ત્રાંશ, જે 0.045 લખાય છે.",
    "Write 6.5% as a decimal.": "6.5% ને દશાંશ સંખ્યા તરીકે લખો.",
    "6.5% as a decimal?": "6.5% દશાંશ સંખ્યામાં?",
    "6.5 hundredths is how many thousandths?": "6.5 શતાંશ એટલે કેટલા સહસ્ત્રાંશ?",
    "Now write 3.5% as a decimal.": "હવે 3.5% ને દશાંશ સંખ્યા તરીકે લખો.",
    "3.5% as a decimal?": "3.5% દશાંશ સંખ્યામાં?",
    "Count the slices of one split hundredth.": "એક કાપેલા શતાંશના ટુકડા ગણો.",
    "Write 12.4% as a decimal.": "12.4% ને દશાંશ સંખ્યા તરીકે લખો.",
    "12.4% as a decimal?": "12.4% દશાંશ સંખ્યામાં?",
    "Look at the full column and the single cells of the grid.": "ગ્રિડનો ભરેલો સ્તંભ અને એકલાં ખાનાં જુઓ.",
    "Yes, 36 over 100 is 9 over 25 in lowest terms.": "હા, 36/100 નું અતિસંક્ષિપ્ત સ્વરૂપ 9/25 છે.",
    "Yes, dividing both terms by 10 gives 9 over 10.": "હા, અંશ અને છેદને 10 વડે ભાગતાં 9/10 મળે છે.",
    "Yes, 240% is 12 over 5, more than two wholes.": "હા, 240% એટલે 12/5, બે આખા કરતાં વધુ.",
    "Yes, 300% is 3 wholes.": "હા, 300% એટલે 3 આખા.",
    "Yes, 83 hundredths is written 0.83.": "હા, 83 શતાંશ 0.83 લખાય છે.",
    "Yes, 5 tenths and 8 hundredths make 0.58.": "હા, 5 દશાંશ અને 8 શતાંશ મળીને 0.58 બને છે.",
    "Yes, 65 thousandths is written 0.065.": "હા, 65 સહસ્ત્રાંશ 0.065 લખાય છે.",
    "Yes, 35 thousandths is written 0.035.": "હા, 35 સહસ્ત્રાંશ 0.035 લખાય છે.",
    "Given": "આપેલું", "Answer": "જવાબ", "Whole": "આખું", "Part": "ભાગ", "1 hundredth": "1 શતાંશ",
    "800 in 1 whole": "1 આખામાં 800", "200 in 1 whole": "1 આખામાં 200", "New per cent": "નવા ટકા", "Unpack": "ખોલો",
    "Fraction": "અપૂર્ણાંક", "Decimal": "દશાંશ સંખ્યા", "Place holder": "સ્થાનધારક",
    "Ones": "એકમ", "Tenths": "દશાંશ", "Hundredths": "શતાંશ", "Thousandths": "સહસ્ત્રાંશ",
    "Over 100": "છેદ 100", "Divide by HCF": "ગુ૰સા૰અ૰ વડે ભાગો", "Count": "ગણો", "Split": "કાપો", "Split hundredths": "શતાંશ કાપો",
    "numerator": "અંશ", "denominator": "છેદ", "whole": "પૂર્ણ", "decimal": "દશાંશ ભાગ",
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
/* a whole number on the Answer card: one box (300% as a whole number) */
const PU_WHOLE = [{ label: "whole", at: "whole" }];
const PHASES = [
  {
    n: 1,
    concept: "Back to a fraction",
    conceptId: "M2.S3.T5.C20", objectiveIds: ["O7"],
    says: ["Per cent means out of a hundred. Write it over a hundred, then simplify."],
    /* the warm-up works on 35% (HCF 5, 7/20: no question's HCF or answer): Over 100, then Divide by HCF (one key, its label follows the act) */
    steps: [
      { say: "Tap Over 100 to write 35% as a fraction.", on: "over", hint: "Tap the Over 100 key under the bar." },
      { say: "Now tap Divide by HCF to reach lowest terms.", on: "hcf", hint: "The same key now says Divide by HCF." },
    ],
    stepHold: 2200,
    /* tries, as the plan writes it: First rung: write the per cent over one hundred. Second rung: find one number that divides both terms. Third rung: the same task with a per cent that is a count of tens, before the question's own returns. */
    ladder: ["The HCF is the biggest number that divides both terms.", "Divide the top and the bottom by the HCF, then check nothing else divides both."],
    closing: "A per cent goes over 100, then both terms are divided by the HCF.",
    learned: "You learned: write a per cent over 100, then divide by the HCF.",
    traceback: "the per cent over 100, both terms divided by their HCF (vermilion), the bar regrouped with its shaded length unchanged, the lowest terms on the Answer card in green",
    items: [
      /* learn PB1: answer in the plan = 9/25 */
      { qid: "M2.S3.T5.C20:PB1", kind: "frac", pc: "36", parts: SLOT_FRACTION, answer: [9, 25], near: "18|50", cardName: "Answer",
        say: "Write 36% as a fraction in lowest terms.", ask: "36% in lowest terms?", miss: "Write 36 over 100, then simplify both terms together." },
      /* practice 1: answer in the plan = 9/10, because 90/100 = 9/10 */
      { qid: "M2.S3.T5.C20:1", kind: "frac", pc: "90", parts: SLOT_FRACTION, answer: [9, 10], near: "45|50", cardName: "Answer",
        say: "Now write 90% as a fraction in lowest terms.", ask: "90% in lowest terms?", miss: "Both terms end in zero, so try a number bigger than 2." },
      /* practice 4: answer in the plan = 11/25. The HCF of 44 and 100 is 4 */
      { qid: "M2.S3.T5.C20:4", kind: "frac", pc: "44", parts: SLOT_FRACTION, answer: [11, 25], near: "22|50", cardName: "Answer",
        say: "Write 44% in lowest terms too.", ask: "44% in lowest terms?", miss: "Keep dividing until only 1 divides both terms." },
    ],
  },
  {
    n: 2,
    concept: "Very large and very small per cents",
    conceptId: "M2.S3.T5.C21", objectiveIds: ["O7"],
    says: ["Is this more than one whole? And how big is half of one per cent?"],
    /* the warm-up: 175% over two bars (Over 100, Divide by HCF 25, 7/4), then 1/2%: one hundredth cut in half (Split) */
    steps: [
      { say: "Tap Over 100 to write 175% as a fraction.", on: "over", hint: "Tap the Over 100 key under the bars." },
      { say: "Now tap Divide by HCF to reach lowest terms.", on: "hcf", hint: "The key now says Divide by HCF." },
      { say: "Now 1/2%: tap Split to cut one hundredth in half.", on: "split", hint: "Tap Split to cut the small part." },
    ],
    stepHold: 2200,
    /* tries, as the plan writes it: First rung: shade the first whole grid. Second rung: shade the part of the next grid. Third rung: the same task with a per cent just above one hundred, before the question's own returns. */
    ladder: ["Divide both terms by their HCF, even when the top is bigger.", "Each full bar is one whole, and the last bar shows the part left."],
    closing: "A fraction of one per cent is that fraction of one hundredth.",
    learned: "You learned: 175% is more than one whole, and 1/2% is 1/200.",
    traceback: "the bars of the per cent, labelled Whole and Part, regrouped by the HCF, the improper fraction or whole number on the Answer card in green; 1/8% as one hundredth cut into 8, 1/800",
    items: [
      /* learn PB2: answer in the plan = 12/5, which is 2 2/5 (the question asks the fraction: 12/5, the improper fraction) */
      { qid: "M2.S3.T5.C21:PB2", kind: "big", pc: "240", parts: SLOT_FRACTION, answer: [12, 5], near: "240|1", cardName: "Answer",
        say: "Write 240% as a fraction in lowest terms.", ask: "240% in lowest terms?", miss: "Per cent means out of 100, so 240 goes over 100." },
      /* practice 3: answer in the plan = 3, because 300/100 = 3 */
      { qid: "M2.S3.T5.C21:3", kind: "big", pc: "300", parts: PU_WHOLE, answer: [3], near: "300", cardName: "Answer",
        say: "Write 300% as a whole number.", ask: "300% as a whole number?", miss: "Look at how many bars are full." },
      /* practice 5: answer in the plan = 1/800. 1/8% means 1/8 out of 100: 1/8 x 1/100 = 1/800 */
      { qid: "M2.S3.T5.C21:5", kind: "tiny", pc: "1/8", parts: SLOT_FRACTION, answer: [1, 800], near: "1|8", cardName: "Answer",
        say: "Write 1/8% as a fraction.", ask: "1/8% as a fraction?", miss: "1/8% is 1/8 of one hundredth, not 1/8 of the whole.",
        ladder: ["Multiply 1/8 by 1/100.", "Cut each of the 100 parts into 8, then count the parts in one whole."] },
    ],
  },
  {
    n: 3,
    concept: "Per cents as decimals",
    conceptId: "M2.S3.T5.C22", objectiveIds: ["O8"],
    says: ["How many hundredths? Write them after the point."],
    /* the warm-up: 73% poured from the grid into the chart (Hundredths) */
    steps: [
      { say: "Tap Hundredths to pour 73% into the chart.", on: "hundredths", hint: "Tap the Hundredths key beside the grid." },
    ],
    stepHold: 2400,
    /* tries, as the plan writes it: First rung: count the full columns as tenths. Second rung: count the single cells as hundredths. Third rung: the same task with a per cent under ten, before the question's own returns. */
    ladder: ["Count the full columns as tenths and the single cells as hundredths.", "Tenths go just after the point, and hundredths after them."],
    closing: "A whole-number per cent is that many hundredths, written as a decimal.",
    learned: "You learned: 37% is 37 hundredths, written 0.37.",
    traceback: "the grid poured into the chart: whole grids as ones, full columns as tenths, single cells as hundredths, a grey 0 holding an empty place, the decimal on the Answer card in green",
    items: [
      /* learn PB3: answer in the plan = 0.83 */
      { qid: "M2.S3.T5.C22:PB3", kind: "dec", pc: "83", parts: SLOT_DECIMAL, answer: ["0", "83"], near: "8|3", cardName: "Answer",
        say: "Write 83% as a decimal.", ask: "83% as a decimal?", miss: "83% means 83 hundredths, so find the Hundredths column in the chart." },
      /* practice 2: answer in the plan = 0.58, because 58% is 58 hundredths */
      { qid: "M2.S3.T5.C22:2", kind: "dec", pc: "58", parts: SLOT_DECIMAL, answer: ["0", "58"], near: "5|8", cardName: "Answer",
        say: "Now write 58% as a decimal.", ask: "58% as a decimal?", miss: "Look at the full columns of the grid first." },
      /* practice 6: answer in the plan = 3.06, because 306/100 is 3 wholes and 6 hundredths */
      { qid: "M2.S3.T5.C22:6", kind: "dec", pc: "306", parts: SLOT_DECIMAL, answer: ["3", "06"], near: "30|6", cardName: "Answer",
        say: "Write 306% as a decimal.", ask: "306% as a decimal?", miss: "Each full grid is one whole, so the wholes go before the point." },
    ],
  },
  {
    n: 4,
    concept: "Per cents with a point",
    conceptId: "M2.S3.T5.C23", objectiveIds: ["O8"],
    says: ["Cut each hundredth into ten. How many thousandths is it?"],
    /* the warm-up: 2.4% (Split hundredths, then Count) */
    steps: [
      { say: "Tap Split hundredths to cut each hundredth into ten slices.", on: "split", hint: "Tap the Split hundredths key." },
      { say: "Now tap Count to put the slices in the chart.", on: "count", hint: "The key now says Count." },
    ],
    stepHold: 2400,
    /* tries, as the plan writes it: First rung: count the slices of one split hundredth. Second rung: count each whole hundredth as ten slices. Third rung: the same task with a per cent under one, before the question's own returns. */
    ladder: ["Count each whole hundredth as ten slices.", "Write the thousandths with three places after the point."],
    closing: "A per cent with a point is read as thousandths, three places after the point.",
    learned: "You learned: 4.5% is 45 thousandths, written 0.045.",
    traceback: "each shaded hundredth split into ten slices, the part of a hundredth zoomed, the chart filled to the Thousandths column with grey place holders, the decimal on the Answer card in green",
    items: [
      /* learn PB4: answer in the plan = 0.065 */
      { qid: "M2.S3.T5.C23:PB4", kind: "point", pc: "6.5", parts: SLOT_DECIMAL, answer: ["0", "065"], near: "0|65", cardName: "Answer",
        say: "Write 6.5% as a decimal.", ask: "6.5% as a decimal?", miss: "6.5 hundredths is how many thousandths?" },
      /* practice 7: answer in the plan = 0.035, because 3.5 hundredths is 35 thousandths */
      { qid: "M2.S3.T5.C23:7", kind: "point", pc: "3.5", parts: SLOT_DECIMAL, answer: ["0", "035"], near: "0|35", cardName: "Answer",
        say: "Now write 3.5% as a decimal.", ask: "3.5% as a decimal?", miss: "Count the slices of one split hundredth." },
      /* practice 8: answer in the plan = 0.124, because 12.4 hundredths is 124 thousandths */
      { qid: "M2.S3.T5.C23:8", kind: "point", pc: "12.4", parts: SLOT_DECIMAL, answer: ["0", "124"], near: "1|24", cardName: "Answer",
        say: "Write 12.4% as a decimal.", ask: "12.4% as a decimal?", miss: "Look at the full column and the single cells of the grid." },
    ],
  },
];

/* ── the tool's own helpers (pu*: never named like the runtime's) ─────────────────────────── */
const PU_BLUE = CONTENT.hundred, PU_BLUE_INK = shade(CONTENT.hundred, 0.25);      /* Given */
const PU_GREEN = CONTENT.one, PU_GREEN_INK = shade(CONTENT.one, 0.3);             /* Answer */
const PU_VERM_INK = shade(CONTENT.pointer, 0.25);                                  /* Both terms */
const PU_AMBER = CONTENT.ten;                                                       /* now */
const PU_GREY = "#767676";                                                          /* Place holder */
const PU_PAPER = "#FFFDF7";
const PU_TINT = 0.8;   /* a counted part: the deep-blue tint over the (golden) ribbon skin */
/* on the dark chocolate piece: an uncounted cell a pale cream wash (the chocolate still shows), a counted one deep blue */
const PU_CREAM = "#FFF4DC", PU_WASH = 0.8, PU_DEEP = 0.94;
/* the plain square under the piece skin is milk-chocolate brown, so where the skin's rounded corners leave a gap the cell still reads
   as chocolate under its wash: the grid's corners are square. (An oversized skin under the clip would square them too, but its box
   then reaches past the working area's edge for a grid drawn at x 0, y 0: the zones and skins checks.) */
const PU_CHOC = "#6B3A1F";
const puGcd = (a: number, b: number): number => (b ? puGcd(b, a % b) : Math.abs(a));
/* a per cent written over 100 (over 1000 when it has a point); "1/8" is 1 over 800 */
const puOver = (pc: string): number[] => {
  if (pc.includes("/")) { const [n, d] = pc.split("/").map(Number); return [n, d * 100]; }
  const [i, f = ""] = pc.split(".");
  return f ? [Number(i + f), 100 * Math.pow(10, f.length)] : [Number(i), 100];
};
const puLow = (pc: string) => { const [a, b] = puOver(pc); const g = puGcd(a, b); return { a: a / g, b: b / g, g }; };
/* a per cent as a decimal [whole, decimal part]: the point moves two places to the left */
const puDec = (pc: string): string[] => {
  const [i, f = ""] = pc.split(".");
  const places = 2 + f.length, digits = (i + f).padStart(places + 1, "0");
  return [String(Number(digits.slice(0, digits.length - places))), digits.slice(digits.length - places)];
};
/* the chart's four digits (Ones, Tenths, Hundredths, Thousandths) of a per cent; "" where nothing goes */
const puChartOf = (pc: string): string[] => { const [w, d] = puDec(pc); return [w.slice(-1), d[0] || "", d[1] || "", d[2] || ""]; };
/* the hundred grid: column by column (a column is a tenth), a part of a cell shaded from its left; slices cut each shaded cell in ten */
function puGridDraw(x: number, y: number, s: number, cells: number, slice: number, key: string, ring = -1) {
  /* the grid is one milk-chocolate piece: the plain square first (the fallback), the skin stretched over it and clipped to the
     square (no rounded-corner notch), then the hundred cells in code: an uncounted cell a pale cream wash over the skin, a counted
     cell deep blue (IMAGES §7: at least 3:1 apart on a dark skin), a dark outline on every one */
  const c = s / 10, out: any[] = [<rect key={key + "p"} x={x} y={y} width={s} height={s} fill={PU_CHOC} />,
    <clipPath key={key + "q"} id={"pu-grid-" + key}><rect x={x} y={y} width={s} height={s} /></clipPath>,
    <Skin key={key + "k"} name="piece" x={x} y={y} w={s} h={s} fit="stretch" clip={"url(#pu-grid-" + key + ")"} />];
  for (let col = 0; col < 10; col++) for (let row = 0; row < 10; row++) {
    const k = col * 10 + row, f = Math.max(0, Math.min(1, cells - k)), cx = x + col * c, cy = y + row * c;
    if (f < 1) out.push(<rect key={key + "w" + k} x={cx + c * f} y={cy} width={c * (1 - f)} height={c} fill={PU_CREAM} fillOpacity={PU_WASH} />);
    if (f > 0) out.push(<rect key={key + "f" + k} x={cx} y={cy} width={c * f} height={c} fill={PU_BLUE} fillOpacity={PU_DEEP} />);
    out.push(<rect key={key + "c" + k} x={cx} y={cy} width={c} height={c} fill="none" stroke={CONTENT.line} strokeWidth={2.4} />);
    if (slice > k && f > 0) for (let j = 1; j < 10; j++) out.push(<line key={key + "s" + k + "." + j} x1={cx + (c * j) / 10} y1={cy + 2} x2={cx + (c * j) / 10} y2={cy + c - 2} stroke={f * 10 > j ? tint(PU_BLUE, 0.4) : CONTENT.line} strokeOpacity={0.75} strokeWidth={1} />);
  }
  out.push(<rect key={key + "o"} x={x} y={y} width={s} height={s} fill="none" stroke={CONTENT.line} strokeWidth={4.5} />);
  if (ring >= 0) out.push(<rect key={key + "r"} x={x + Math.floor(ring / 10) * c - 3} y={y + (ring % 10) * c - 3} width={c + 6} height={c + 6} rx={4} fill="none" stroke={PU_AMBER} strokeWidth={5} />);
  return out;
}

/* The numbers, rows, sizes and targets the working area needs (they go into the sidecar too). */
const MODEL = {
  warmUps: { 1: ["35%"], 2: ["175%", "1/2%"], 3: ["73%"], 4: ["2.4%"] },
  freePerCents: ["45", "25", "35", "8", "4.5", "12.5", "75", "0.5"],
  picture: "x 0 to 900 in the working area, the same open or shut (bigPad); fraction route: per cent card, over 100, the HCF, Answer card, bars of 100 parts; decimal route: hundred grid 360, per cent card, Answer card, place value chart Ones . Tenths Hundredths Thousandths",
};
const PU_FREE = MODEL.freePerCents;

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* judge: is this value right for this item?
   phases 1-2: the fraction in lowest terms, exactly (18/50 for 36% is the misconception, a miss; 240% is 12/5, the improper
   fraction the phase is about), 300% the whole number 3; phases 3-4: the decimal, its decimal part digit for digit */
const judge = (item: any, v: any) => (item.parts === SLOT_DECIMAL ? judgeSlotDecimal(item, v) : judgeSlotParts(item, v));
/* oracle: a second route that shares no code with judge or Work: the smallest denominator that makes the per cent a whole
   count of parts (fractions), and plain arithmetic on the per cent (decimals) */
const oracle = () => PHASES.every((p: any) => p.items.every((it: any) => {
  if (it.parts === SLOT_DECIMAL) {
    const m = String(it.pc).match(/^(\d+)(?:\.(\d))?$/);
    if (!m) return false;
    const got = Number(it.answer[0] + "." + it.answer[1]), want = Number(it.pc) / 100;
    return Math.abs(got - want) < 1e-9 && it.answer[1].length === 2 + (m[2] ? 1 : 0);
  }
  const fr = String(it.pc).split("/"), top = Number(fr[0]), bottom = 100 * (fr[1] ? Number(fr[1]) : 1);
  let d = 1;
  while ((top * d) % bottom !== 0) d++;
  const n = (top * d) / bottom;
  return d === 1 ? it.answer.length === 1 && it.answer[0] === n : it.answer.length === 2 && it.answer[0] === n && it.answer[1] === d;
}));
/* the most likely wrong answer (the misconception, the brief's): judge must reject it */
const nearMiss = (item: any) => item.near;
/* the forms of an answer that no question, hint or ladder line may print */
const answerForms = (item: any) => {
  const a = item.answer;
  if (item.parts === SLOT_DECIMAL) return [a[0] + "." + a[1]];
  if (a.length === 1) return [String(a[0])];
  return a[0] > a[1] ? [a[0] + "/" + a[1], Math.floor(a[0] / a[1]) + " " + (a[0] % a[1]) + "/" + a[1]] : [a[0] + "/" + a[1]];
};
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
/* the two routes in Work units. The picture keeps to x 0..900 (bigPad) at ONE size and place whether the keypad is open or shut, so
   nothing runs under the panel or under the key's corner (box.key, x 1190 on). Fraction route (phases 1-2): the per cent card, the
   per cent over 100, the HCF both terms are divided by, the Answer card, bars of 100 parts. Decimal route (phases 3-4, free play):
   the hundred grid, the per cent card, the Answer card, the place value chart across the foot. */
const PU_F = { card: { x: 0, y: 20, w: 240, h: 160 }, ocx: 385, obar: 108, ans: { x: 620, y: 0, w: 270, h: 240 }, key: { x: 290, y: 426, w: 320, h: 80 } };
const PU_D = { grid: 360, card: { x: 400, y: 0, w: 240, h: 140 }, card4: { x: 400, y: 0, w: 180, h: 140 }, zoom: { x: 670, y: 0, w: 210, h: 92 },
  zoomDemo: { x: 520, y: 180, w: 210, h: 92 }, ans: { x: 400, y: 162, w: 490, h: 192 }, key: { x: 485, y: 236, w: 320, h: 80 },
  qkey: { x: 600, y: 28, w: 290, h: 84 }, fkey: { x: 660, y: 30, w: 230, h: 84 }, cy: 374, h1: 54, h2: 92, cols: [215, 215, 215, 235] };
const PU_COLS = ["Ones", "Tenths", "Hundredths", "Thousandths"];
const PU_COLX = [107.5, 322.5, 537.5, 762.5];   /* the chart's column centres */
const PU_DIGIT_BASE = 54;   /* the chart's digits sit on one baseline, this far into the digit row; "Place holder" under them */
const PU_KEY: any = { over: "Over 100", hcf: "Divide by HCF", hundredths: "Hundredths", count: "Count" };

function Work({ phase, n, item, index, stage, wrong, typed, part, api, step, stepOn, box, answerOn, lang = "en", tx = (v: any) => v }: any) {
  const dev = lang === "hi" || lang === "gu";   /* Devanagari and Gujarati rise above the line: labels sit a little lower in their boxes */
  const C = api.C;
  const tl = useTimeline();
  const free = stage === "free";
  const demo = stage === "demo" || stage === "teach";
  const done = stage === "win" || stage === "idle" || stage === "summary";
  /* the warm-up's own state (Work mounts again at every phase), the traceback's level, free play's per cent */
  const [s, setS] = useState<any>({ over: false, div: 0, cut: false, fill: 0, slice: 0, zoom: false });
  const put = (o: any) => setS((p: any) => ({ ...p, ...o }));
  const [tr, setTr] = useState(0);
  const [tracing, setTracing] = useState(false);
  const [fp, setFp] = useState<any>({ i: 0, fill: 0, shown: false });
  /* a question's own optional act (Over 100 in phases 1-2, Split hundredths in phase 4): it draws working only, never the answer */
  const [q, setQ] = useState<any>({ over: false, slice: 0 });
  const busy = useRef(false);
  const lastKey = useRef(0);

  const it = free ? {} : item || {};
  const exPc = n === 1 ? "35" : n === 2 ? (step >= 2 || s.cut ? "1/2" : "175") : n === 3 ? "73" : "2.4";
  const pc = free ? PU_FREE[fp.i] : demo ? exPc : String(it.pc || exPc);
  const fracRoute = !free && n <= 2;
  const tiny = pc.includes("/");
  const low = puLow(pc), over = puOver(pc);
  const pval = tiny ? 0 : Number(pc);
  const parts = it.parts || (n <= 2 ? SLOT_FRACTION : SLOT_DECIMAL);
  const np = parts.length;
  const asked = stage === "ask";
  /* after a miss the correction's answer stands on the card until the child types something new (its working stays) */
  const untouched = !!wrong && slotPartsOf(typed, np).join("|") === slotPartsOf(wrong.value, np).join("|");
  const shownWork = done || (asked && tr >= 1);
  const ansGreen = demo ? (tiny ? s.cut : n <= 2 ? s.div >= 2 : false) : done || (asked && tr >= 2 && untouched);
  const div = demo ? s.div : shownWork ? 2 : 0;
  const digits = puChartOf(pc);
  const fillN = free ? fp.fill : demo ? s.fill : done || (asked && tr >= 2) ? 4 : asked && tr >= 1 ? 2 : 0;
  const pointPc = !tiny && pc.includes(".");
  const sliceN = !pointPc ? 0 : free ? (fp.shown ? 99 : 0) : demo ? s.slice : shownWork ? 99 : q.slice;
  /* phase 1 traceback from the child's own fraction: an equal fraction not yet in lowest terms (18/50) is divided again by the
     factor both its terms still share (amber), ending on the lowest terms */
  const wv = n === 1 && wrong ? slotPartsOf(wrong.value, 2).map(Number) : null;
  const fromChild = !!wv && asked && tr >= 1 && wv[0] > 0 && wv[1] > 0 && puGcd(wv[0], wv[1]) > 1 && wv[0] * low.b === wv[1] * low.a;
  const zoomOn = !free && n === 4 && (demo ? s.zoom : shownWork);

  /* what the card shows: the warm-up's result, the correction's answer, or what the child types */
  const ansVals = (it.answer || []).map((x: any) => (x === null || x === undefined ? "" : String(x)));
  const exVals = n <= 2 ? [String(low.a), String(low.b)] : puDec(pc);
  /* what each box keeps: a whole 3 digits, a decimal part 3 (thousandths), a fraction's terms 4; a longer typing is trimmed at
     once (the state) and never drawn past the cap (the frame before the trim), so no digit or caret leaves its box */
  const caps = parts === SLOT_DECIMAL ? [3, 3] : np === 1 ? [3] : [4, 4];
  const typedVals = slotPartsOf(typed, np).map((v: string, j: number) => v.slice(0, caps[j]));
  useEffect(() => {
    if (stage !== "ask") return;
    const raw = slotPartsOf(typed, np);
    if (raw.some((v: string, j: number) => v.length > caps[j])) api.setTyped(typedVals.join("|"));
  }, [typed]);
  const cardVals = demo ? (ansGreen ? exVals : parts.map(() => "")) : done ? (typedVals.some(Boolean) ? typedVals : ansVals) : ansGreen ? ansVals : typedVals;

  useEffect(() => { setTr(0); setTracing(false); setQ({ over: false, slice: 0 }); }, [index, n]);
  /* THE WIN LINE: one sentence a question (literals, so their TR entries can be listed); at a phase's last right answer the
     runtime puts the phase's closing line in its place (keyOnly, one sentence a screen) */
  useEffect(() => {
    if (stage !== "win" || free || !it.pc) return;
    if (phase && phase.items && index === phase.items.length - 1) { api.say(phase.closing); return; }
    const p = it.pc;
    if (p === "36") api.say("Yes, 36 over 100 is 9 over 25 in lowest terms.");
    else if (p === "90") api.say("Yes, dividing both terms by 10 gives 9 over 10.");
    else if (p === "240") api.say("Yes, 240% is 12 over 5, more than two wholes.");
    else if (p === "300") api.say("Yes, 300% is 3 wholes.");
    else if (p === "83") api.say("Yes, 83 hundredths is written 0.83.");
    else if (p === "58") api.say("Yes, 5 tenths and 8 hundredths make 0.58.");
    else if (p === "6.5") api.say("Yes, 65 thousandths is written 0.065.");
    else if (p === "3.5") api.say("Yes, 35 thousandths is written 0.035.");
  }, [stage, index]);
  /* THE TRACEBACK: the working is redrawn (the HCF on both terms and the bars regrouped, or the grid poured into the chart),
     then the whole right answer on the Answer card; nothing marked, the child's answer kept in the slot */
  useEffect(() => {
    if (!wrong || stage !== "ask") return;
    api.lock(true); setTracing(true); setTr(0);
    tl.run([[500, null], [1200, () => { setTr(1); api.sfx.settle(); }], [1000, () => { setTr(2); api.sfx.trade(); }]],
      () => { setTracing(false); api.lock(false); });
  }, [wrong]);

  /* THE ACTS (guide steps; every one performed on screen by api.act, the state changing as the tool passes) */
  /* the step moves on; the key keeps its place but takes the next act's data-control, so a keyboard child's focus is moved to it */
  const nextOn = phase && phase.steps && phase.steps[step + 1] ? String(phase.steps[step + 1].on) : null;
  const refocus = () => { if (nextOn) setTimeout(() => { const el: any = document.querySelector('[data-control="' + nextOn + '"]'); if (el && document.activeElement !== el) el.focus(); }, 60); };
  const hold = (on: string) => {
    if (n === 2 && on === "hcf") tl.run([[900, null]], () => { busy.current = false; api.did(on); refocus(); });
    else { busy.current = false; api.did(on); refocus(); }
  };
  const doAct = (on: string) => {
    if (busy.current || !on) return;
    busy.current = true;
    let o: any = null, end: any = null;
    if (on === "over") {
      o = { tool: "pencil", moves: "draw", from: { x: PU_F.ocx - 64, y: PU_F.obar }, at: [{ x: PU_F.ocx + 64, y: PU_F.obar }], onPoint: () => put({ over: true }) };
      end = () => put({ over: true });
    } else if (on === "hcf") {
      o = { tool: "hand", moves: "tap", at: [{ x: PU_F.ocx, y: PU_F.obar - 44 }, { x: PU_F.ocx, y: PU_F.obar + 46 }], onPoint: (i: number) => put({ div: i + 1 }) };
      end = () => { put({ div: 2 }); api.sfx.trade(); };
    } else if (on === "split" && n === 2) {
      o = { tool: "knife", moves: "slice", at: [{ x: 134, y: 280 }], onPoint: () => put({ cut: true }) };
      end = () => put({ cut: true });
    } else if (on === "hundredths") {
      o = { tool: "hand", moves: "carry", from: { x: 180, y: 180 }, at: [0, 1, 2].map((k) => ({ x: PU_COLX[k], y: 474 })), onPoint: (i: number) => put({ fill: i + 1 }) };
      end = () => put({ fill: 3 });
    } else if (on === "split") {
      const cells = Math.ceil(Number(exPc)), c = PU_D.grid / 10;
      o = { tool: "knife", moves: "slice", at: Array.from({ length: cells }, (_, k) => ({ x: Math.floor(k / 10) * c + c / 2, y: (k % 10) * c + c / 2 })), onPoint: (i: number) => put({ slice: i + 1 }) };
      end = () => put({ slice: 99, zoom: true });
    } else if (on === "count") {
      o = { tool: "hand", moves: "tap", at: [0, 1, 2, 3].map((k) => ({ x: PU_COLX[k], y: 474 })), onPoint: (i: number) => put({ fill: i + 1 }) };
      end = () => put({ fill: 4 });
    }
    if (!o) { busy.current = false; return; }
    api.act(o).then((ok: boolean) => { if (!ok) { busy.current = false; return; } end(); hold(on); });
  };
  const pressKey = (on: string) => {
    const t = Date.now();
    if (t - lastKey.current < 400) return;
    lastKey.current = t;
    doAct(on);
  };
  api.onEnter(stage === "demo" && stepOn ? () => doAct(stepOn) : null);
  HOOK.demo = () => { if (stepOn) doAct(stepOn); };
  /* a question's optional act: Over 100 writes N over 100, Split hundredths cuts the shaded cells into slices; the child still counts */
  const qOn = asked && !tracing && !shownWork ? (n <= 2 && !tiny && !q.over ? "over" : n === 4 && !q.slice ? "split" : null) : null;
  const qAct = (on: string) => {
    const t = Date.now();
    if (busy.current || t - lastKey.current < 400) return;
    lastKey.current = t; busy.current = true;
    const c = PU_D.grid / 10;
    const o = on === "over"
      ? { tool: "pencil", moves: "draw", from: { x: PU_F.ocx - 64, y: PU_F.obar }, at: [{ x: PU_F.ocx + 64, y: PU_F.obar }], onPoint: () => setQ((p: any) => ({ ...p, over: true })) }
      : { tool: "knife", moves: "slice", at: Array.from({ length: Math.ceil(pval) }, (_, k) => ({ x: Math.floor(k / 10) * c + c / 2, y: (k % 10) * c + c / 2 })),
        onPoint: (i: number) => setQ((p: any) => ({ ...p, slice: i + 1 })) };
    api.act(o).then((ok: boolean) => { busy.current = false; if (ok) setQ((p: any) => (on === "over" ? { ...p, over: true } : { ...p, slice: 99 })); });
  };

  /* free play: a new per cent from the card, then Unpack pours it into the chart and writes both forms */
  const nextPc = () => { if (busy.current) return; api.sfx.tick(); setFp((p: any) => ({ i: (p.i + 1) % PU_FREE.length, fill: 0, shown: false })); };
  const unpack = () => {
    const t = Date.now();
    if (busy.current || t - lastKey.current < 400) return;
    lastKey.current = t; busy.current = true;
    const k = digits[3] ? 4 : 3;
    api.act({ tool: "hand", moves: "carry", from: { x: 180, y: 180 }, at: PU_COLX.slice(0, k).map((x) => ({ x, y: 474 })), onPoint: (i: number) => setFp((p: any) => ({ ...p, fill: i + 1 })) })
      .then((ok: boolean) => { busy.current = false; if (ok) setFp((p: any) => ({ ...p, fill: 4, shown: true })); });
  };

  /* what the host and the agent read back (toolApi.getState): never the answer before it is given */
  api.share({ phase: n, per_cent: pc + "%", numerator: fracRoute && !tiny ? over[0] : null, denominator: fracRoute && !tiny ? over[1] : null,
    hcf: fracRoute && !tiny && div >= 2 ? low.g : null, chart: !fracRoute && fillN > 0 ? digits.slice(0, fillN).join("") : null,
    split: sliceN > 0, answer: done ? it.answer || null : null, complete: stage === "idle" });

  const accent = (THEME && THEME.enter && THEME.enter[1]) || C.accent;
  const ink = C.ink;
  const txt = (x: number, y: number, v: any, size: number, fill: string, anchor = "middle", weight = 700, key?: string) => (
    <text key={key} x={x} y={y} textAnchor={anchor} fontSize={size} fontWeight={weight} fill={fill}>{v}</text>);
  /* a stacked fraction: top over a bar over bottom, the bar at y */
  const stack = (cx: number, y: number, a: any, b: any, size: number, fill: string, half: number) => (
    <g>
      {txt(cx, y - size * 0.32, a, size, fill)}
      <line x1={cx - half} y1={y} x2={cx + half} y2={y} stroke={ink} strokeWidth={4} strokeLinecap="round" />
      {txt(cx, y + size * 1.04, b, size, fill)}
    </g>);
  /* the per cent card (Given, deep blue) */
  const pcCard = (r: any) => {
    const cx = r.x + r.w / 2, base = r.y + r.h - 24;
    const [ta, tb] = pc.split("/");
    return (
      <g>
        <rect x={r.x} y={r.y} width={r.w} height={r.h} rx={RAD.card} fill={PU_BLUE} stroke={shade(PU_BLUE, 0.3)} strokeWidth={3} />
        {txt(cx, r.y + 42, tx("Given"), T.label, "#FFFFFF", "middle", 600)}
        {tiny ? (
          <g>
            {txt(cx - 34, base - 46, ta, T.speech, "#FFFFFF")}
            <line x1={cx - 58} y1={base - 34} x2={cx - 10} y2={base - 34} stroke="#FFFFFF" strokeWidth={4} strokeLinecap="round" />
            {txt(cx - 34, base + 10, tb, T.speech, "#FFFFFF")}
            {txt(cx + 34, base, "%", T.display, "#FFFFFF")}
          </g>
        ) : txt(cx, base - (r.w < 200 ? 6 : 0), pc + "%", r.w < 200 ? T.xl : T.display, "#FFFFFF")}
      </g>);
  };
  /* one box of the Answer card: the active one solid, with the caret */
  const cardBox = (b: any, j: number, v: string, green: boolean, size: number) => {
    const on = asked && box.open && part === j && !tracing;
    const w = v.length * size * 0.6;
    return (
      <g key={"bx" + j}>
        <rect x={b.x} y={b.y} width={b.w} height={b.h} rx={12} fill={on ? "#FFFFFF" : tint(C.panel, 0.6)} stroke={on ? accent : C.rule} strokeWidth={on ? 4 : 2} />
        {v !== "" && txt(b.x + b.w / 2, b.y + b.h / 2 + size * 0.36, v, size, green ? PU_GREEN_INK : ink)}
        {on && <line x1={b.x + b.w / 2 + w / 2 + 6} y1={b.y + 14} x2={b.x + b.w / 2 + w / 2 + 6} y2={b.y + b.h - 14} stroke={accent} strokeWidth={4} strokeLinecap="round" />}
      </g>);
  };
  /* the Answer card: a tap opens the keypad (it blinks while it waits); with the keypad open each box is its own finger box */
  const answerCard = (R: any, boxes: any[], size: number, extra: any) => {
    const live = asked && answerOn === "card" && !tracing;
    const green = demo || done || ansGreen;
    return (
      <g>
        <rect x={R.x} y={R.y} width={R.w} height={R.h} rx={RAD.card} fill="#FFFFFF" stroke={PU_GREEN} strokeWidth={4} />
        {txt(fracRoute ? R.x + R.w / 2 : R.x + 30, R.y + (dev ? 46 : 40), tx("Answer"), T.label, PU_GREEN_INK, fracRoute ? "middle" : "start")}
        {extra}
        {boxes.map((b, j) => cardBox(b, j, cardVals[j] || "", green, size))}
        {live && !box.open && <BlinkRing x={R.x} y={R.y} w={R.w} h={R.h} rx={RAD.card} C={C} />}
        {live && !box.open && <SlotPartBox id="answer-open" label={tx("Answer")} x={R.x} y={R.y} w={R.w} h={R.h} on={false} enabled onPick={api.openAnswer} />}
        {live && box.open && boxes.map((b, j) => <SlotPartBox key={"pb" + j} id={"part-" + (j + 1)} label={tx(parts[j].label)} x={b.x} y={b.y} w={b.w} h={b.h}
          on={part === j} enabled onPick={() => api.pickPart(j)} />)}
      </g>);
  };
  /* a bar of 100 parts, `filled` of them shaded; regrouped by g (both terms divided), its shaded length never moves */
  /* the bar is a golden ribbon: the plain strip first (the fallback), the ribbon skin over it, the counted part a blue tint */
  const bar = (x: number, y: number, w: number, h: number, filled: number, g: number, key: string) => {
    const out: any[] = [<rect key={key + "b"} x={x} y={y} width={w} height={h} fill={PU_PAPER} />,
      <clipPath key={key + "c"} id={"pu-bar-" + key}><rect x={x} y={y} width={w} height={h} /></clipPath>,
      <Skin key={key + "s"} name="ribbon" x={x} y={y} w={w} h={h} clip={"url(#pu-bar-" + key + ")"} />];
    if (filled > 0) out.push(<rect key={key + "f"} x={x} y={y} width={(w * filled) / 100} height={h} fill={PU_BLUE} fillOpacity={PU_TINT} />);
    for (let i = 1; i < 100; i++) out.push(<line key={key + "l" + i} x1={x + (w * i) / 100} y1={y} x2={x + (w * i) / 100} y2={y + h} stroke={i < filled ? "#FFFFFF" : CONTENT.line} strokeOpacity={0.55} strokeWidth={1} />);
    if (g > 0 && g < 100) for (let i = g; i < 100; i += g) out.push(<line key={key + "g" + i} x1={x + (w * i) / 100} y1={y - 6} x2={x + (w * i) / 100} y2={y + h + 6} stroke={CONTENT.line} strokeWidth={3.5} />);
    out.push(<rect key={key + "o"} x={x} y={y} width={w} height={h} fill="none" stroke={CONTENT.line} strokeWidth={3.5} />);
    return out;
  };

  /* the one key of the warm-up: its label and its data-control follow the act it waits for */
  /* (at a question the same key, lit but optional and with no invite: the blinking Answer card is the thing to do) */
  const keyOn = demo ? stepOn : qOn;
  const kb = fracRoute ? PU_F.key : n === 4 ? PU_D.qkey : PU_D.key;   /* phase 4's key keeps one place, warm-up and question alike */
  const keyLabel = keyOn === "split" ? (n === 2 ? "Split" : "Split hundredths") : PU_KEY[keyOn] || "";
  const stepKey = keyOn && keyLabel ? (
    <g>
      <Key key="actkey" id={keyOn} label={tx(keyLabel)} x={kb.x} y={kb.y} w={kb.w} h={kb.h} C={C} tone="key" onClick={() => (demo ? pressKey(keyOn) : qAct(keyOn))}>
        <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={demo ? 700 : 600} fill={toneInk("key", ink)}>{tx(keyLabel)}</text>
      </Key>
      {demo && <Invite x={kb.x + kb.w / 2} y={kb.y + kb.h / 2} w={kb.w} h={kb.h + EDGE} C={C} />}
    </g>) : null;

  if (fracRoute) {
    const F = PU_F, A = F.ans;
    /* a fraction: the numerator box over a bar over the denominator box; a whole number (300%): one box */
    const boxes = np === 2
      ? [{ x: A.x + 60, y: A.y + 62, w: 150, h: 72 }, { x: A.x + 60, y: A.y + 162, w: 150, h: 72 }]
      : [{ x: A.x + 75, y: A.y + 78, w: 120, h: 120 }];
    const cardBar = np === 2 ? <line x1={A.x + 50} y1={A.y + 148} x2={A.x + 220} y2={A.y + 148} stroke={ink} strokeWidth={5} strokeLinecap="round" /> : null;
    /* the per cent over 100 is written by the Over 100 key (the warm-up's step, or a question's optional tap) and by the
       traceback; a part of one per cent shows its product, its slices and its count only in the traceback (or the warm-up's Split) */
    const showOver = tiny ? (demo ? s.cut : shownWork) : demo ? s.over : q.over || shownWork;
    const nb = tiny ? 1 : Math.max(1, Math.ceil(pval / 100));
    /* the bar's groups follow the working on show: from the child's own fraction, its own denominator's parts first (18/50: 50 parts),
       then the lowest terms' at the end of the trace */
    const childG = fromChild && tr < 2 ? (100 % wv![1] === 0 ? 100 / wv![1] : 0) : -1;
    const g = childG >= 0 ? childG : div >= 2 && !tiny ? low.g : 0;
    const zk = tiny ? (demo ? (s.cut ? 2 : 0) : shownWork ? 8 : 0) : 0;
    const [ta, tb] = pc.split("/");
    const fac = fromChild ? wv![0] / low.a : 0;   /* the factor the child's own fraction still shares */
    const BY = 258, BH = 42, BP = 50;             /* phase 2's bars: up to three, 18 under the Answer card, 26 clear of the key below */
    const chip = (y: number) => (
      <g>
        <rect x={489} y={y - 34} width={88} height={46} rx={10} fill={tint(PU_AMBER, 0.45)} stroke={PU_AMBER} strokeWidth={3} />
        {txt(533, y, "÷ " + fac, T.prompt, ink)}
      </g>);
    return (
      <g>
        {pcCard(F.card)}
        {txt(262, 128, "=", T.xl, ink)}
        {/* the per cent over 100 (or, for a part of one per cent, that part of one hundredth); in the traceback of a fraction that
            is not yet in lowest terms, the child's own fraction */}
        {!showOver && <rect x={F.ocx - 66} y={34} width={132} height={152} rx={14} fill="none" stroke={C.rule} strokeWidth={3} strokeDasharray="10 10" />}
        {showOver && !tiny && !fromChild && stack(F.ocx, F.obar, over[0], over[1], 64, PU_BLUE_INK, 64)}
        {fromChild && stack(F.ocx, F.obar, wv![0], wv![1], 64, ink, 64)}
        {showOver && tiny && (
          <g>
            {stack(F.ocx - 70, F.obar, ta, tb, 52, PU_BLUE_INK, 26)}
            {txt(F.ocx - 18, F.obar + 16, "×", T.speech, ink)}
            {stack(F.ocx + 44, F.obar, 1, 100, 52, PU_BLUE_INK, 50)}
          </g>)}
        {/* both terms divided by the HCF (vermilion); from the child's fraction, by the factor its terms still share (amber) */}
        {!tiny && div >= 1 && (
          <g>
            <line x1={470} y1={128} x2={596} y2={128} stroke={fromChild ? shade(PU_AMBER, 0.2) : PU_VERM_INK} strokeWidth={4} strokeLinecap="round" />
            <path d="M 584 118 L 598 128 L 584 138" fill="none" stroke={fromChild ? shade(PU_AMBER, 0.2) : PU_VERM_INK} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" />
            {fromChild ? chip(86) : txt(533, 86, "÷ " + low.g, T.prompt, PU_VERM_INK)}
            {div >= 2 && (fromChild ? chip(180) : txt(533, 180, "÷ " + low.g, T.prompt, PU_VERM_INK))}
          </g>)}
        {tiny && (ansGreen || shownWork) && txt(560, 146, "=", T.xl, ink)}
        {answerCard(A, boxes, 52, cardBar)}
        {/* the bars: one hundred parts each; Whole and Part named in the warm-up and the traceback (at a question they would
            count the wholes for the child) */}
        {n === 1 && bar(0, 280, 880, 100, pval, g, "p1")}
        {n === 2 && !tiny && Array.from({ length: nb }, (_, k) => {
          const f = Math.max(0, Math.min(100, pval - 100 * k)), y = BY + BP * k;
          return (
            <g key={"bar" + k}>
              {(demo || shownWork) && txt(0, y + 33, tx(f >= 100 ? "Whole" : "Part"), T.label, ink, "start")}
              {bar(130, y, 750, BH, f, g, "b" + k)}
            </g>);
        })}
        {tiny && (
          <g>
            {txt(0, BY + 33, tx("Whole"), T.label, ink, "start")}
            {bar(130, BY, 750, BH, 0, 0, "bt")}
            <rect x={128} y={BY - 2} width={11.5} height={BH + 4} fill="none" stroke={PU_AMBER} strokeWidth={4} />
            {zk === 0 && txt(130, BY + BH + 42, tx("1 hundredth"), T.label, ink, "start")}
            {zk > 0 && (
              <g>
                <path d={`M 130 ${BY + BH} L 137.5 ${BY + BH} L 530 330 L 130 330 Z`} fill={tint(PU_AMBER, 0.55)} />
                <clipPath id="pu-zoom2"><rect x={130} y={330} width={400} height={76} /></clipPath>
                <rect x={130} y={330} width={400} height={76} fill={PU_PAPER} />
                <Skin name="ribbon" x={130} y={330} w={400} h={76} clip="url(#pu-zoom2)" />
                {Array.from({ length: zk }, (_, j) => (
                  <rect key={"z" + j} x={130 + (400 * j) / zk} y={330} width={400 / zk} height={76} fill={j === 0 ? PU_BLUE : "none"} fillOpacity={PU_TINT} stroke={CONTENT.line} strokeWidth={3} />))}
                <rect x={130} y={330} width={400} height={76} fill="none" stroke={PU_AMBER} strokeWidth={5} />
                {txt(560, 362, tx("1 hundredth"), T.label, ink, "start")}
                {(ansGreen || shownWork) && txt(560, 404, tx(zk === 8 ? "800 in 1 whole" : "200 in 1 whole"), T.label, PU_GREEN_INK, "start")}
              </g>)}
          </g>)}
        {stepKey}
      </g>
    );
  }

  /* the decimal route */
  const D = PU_D, DA = D.ans;
  const boxes = [{ x: DA.x + 30, y: DA.y + 64, w: 150, h: 106 }, { x: DA.x + 244, y: DA.y + 64, w: 220, h: 106 }];
  const frac = pval - Math.floor(pval), k10 = Math.round(frac * 10);
  /* the enlarged hundredth: beside the key in a question's correction, under it in the warm-up (the key stays in one place) */
  const ZM = demo ? D.zoomDemo : D.zoom;
  /* Gujarati's glyphs run small in the device font: its chart words are drawn about a sixth bigger, to the Hindi size */
  const headSz = lang === "gu" ? 37 : T.label, holdSz = lang === "gu" ? 32 : T.micro;
  const grids = pval > 100 ? Array.from({ length: Math.ceil(pval / 100) }, (_, k) => ({ x: (k % 2) * 188, y: Math.floor(k / 2) * 188, s: 172, f: Math.min(100, pval - 100 * k) }))
    : [{ x: 0, y: 0, s: D.grid, f: pval }];
  let cx0 = 0;
  const cols = D.cols.map((w, k) => { const c = { x: cx0, w, k }; cx0 += w; return c; });
  const lit = digits[3] !== "" && fillN >= 4;
  const fl = free ? puLow(pc) : null;
  const fd = free ? puDec(pc) : null;
  return (
    <g>
      {grids.map((G, k) => <g key={"gr" + k}>{puGridDraw(G.x, G.y, G.s, G.f, sliceN, "g" + k, zoomOn ? Math.floor(pval) : -1)}</g>)}
      {pcCard(n === 4 && !free ? D.card4 : D.card)}
      {free && <Hit id="next-per-cent" x={D.card.x} y={D.card.y} w={D.card.w} h={D.card.h} onPress={nextPc} label={tx("New per cent")} />}
      {/* the part of one hundredth lifted out, ten times as big (a chocolate piece), cut into its ten slices */}
      {zoomOn && k10 > 0 && (
        <g>
          <rect x={ZM.x} y={ZM.y} width={ZM.w} height={ZM.h} fill={PU_CHOC} />
          <clipPath id="pu-zoom4"><rect x={ZM.x} y={ZM.y} width={ZM.w} height={ZM.h} /></clipPath>
          <Skin name="piece" x={ZM.x} y={ZM.y} w={ZM.w} h={ZM.h} fit="stretch" clip="url(#pu-zoom4)" />
          {Array.from({ length: 10 }, (_, j) => (
            <rect key={"zs" + j} x={ZM.x + (ZM.w * j) / 10} y={ZM.y} width={ZM.w / 10} height={ZM.h} fill={j < k10 ? PU_BLUE : PU_CREAM}
              fillOpacity={j < k10 ? PU_DEEP : PU_WASH} stroke={CONTENT.line} strokeWidth={2} />))}
          <rect x={ZM.x} y={ZM.y} width={ZM.w} height={ZM.h} fill="none" stroke={PU_AMBER} strokeWidth={5} />
          {txt(ZM.x + ZM.w / 2, ZM.y + ZM.h + 40, tx("1 hundredth"), T.label, ink)}
        </g>)}
      {/* the Answer card (a question), or free play's two forms */}
      {!free && !demo && answerCard(DA, boxes, 64, <circle cx={DA.x + 212} cy={DA.y + 150} r={8} fill={ink} />)}
      {free && (
        <g>
          <Key key="unpack" id="unpack" label={tx("Unpack")} x={D.fkey.x} y={D.fkey.y} w={D.fkey.w} h={D.fkey.h} C={C} tone="key" onClick={unpack}>
            <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={toneInk("key", ink)}>{tx("Unpack")}</text>
          </Key>
          <rect x={400} y={162} width={230} height={192} rx={RAD.card} fill="#FFFFFF" stroke={PU_GREEN} strokeWidth={4} />
          {txt(515, dev ? 209 : 202, tx("Fraction"), T.label, PU_GREEN_INK)}
          {fp.shown && fl && stack(515, 278, fl.a, fl.b, 48, PU_GREEN_INK, 56)}
          <rect x={650} y={162} width={240} height={192} rx={RAD.card} fill="#FFFFFF" stroke={PU_GREEN} strokeWidth={4} />
          {txt(770, dev ? 209 : 202, tx("Decimal"), T.label, PU_GREEN_INK)}
          {fp.shown && fd && txt(770, 292, fd[0] + "." + fd[1], T.xl, PU_GREEN_INK)}
        </g>)}
      {/* the place value chart: Ones . Tenths Hundredths Thousandths; a 0 holding a place is grey */}
      {cols.map((c) => (
        <g key={"col" + c.k}>
          <rect x={c.x} y={D.cy} width={c.w} height={D.h1} fill={c.k === 3 && lit ? tint(PU_AMBER, 0.55) : tint(C.panel, 0.35)} stroke={CONTENT.line} strokeWidth={2.5} />
          {txt(c.x + c.w / 2, D.cy + (dev ? 41 : 38), tx(PU_COLS[c.k]), headSz, ink)}
          <rect x={c.x} y={D.cy + D.h1} width={c.w} height={D.h2} fill="#FFFFFF" stroke={CONTENT.line} strokeWidth={2.5} />
          {/* every digit on one baseline (the point sits on it, between Ones and Tenths); a grey 0 is told by its words too */}
          {c.k < fillN && digits[c.k] !== "" && txt(c.x + c.w / 2, D.cy + D.h1 + PU_DIGIT_BASE, digits[c.k], T.xl, digits[c.k] === "0" ? PU_GREY : PU_GREEN_INK)}
          {c.k < fillN && digits[c.k] === "0" && txt(c.x + c.w / 2, D.cy + D.h1 + D.h2 - 9, tx("Place holder"), holdSz, ink, "middle", 600)}
        </g>))}
      <rect x={0} y={D.cy} width={cx0} height={D.h1 + D.h2} fill="none" stroke={CONTENT.line} strokeWidth={4} />
      <rect x={D.cols[0] - 11} y={D.cy + D.h1 + PU_DIGIT_BASE - 19} width={22} height={24} fill="#FFFFFF" />
      <circle cx={D.cols[0]} cy={D.cy + D.h1 + PU_DIGIT_BASE - 6} r={7} fill={ink} />
      {stepKey}
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase: the per cent and the form it became */
function Thumb({ result, it, n, C, w, h }: any) {
  const last = result && result.last;
  if (!last) return null;
  const item = it || last.it || (PHASES[(n || 1) - 1] || PHASES[0]).items[last.item] || {};
  const parts = item.parts || SLOT_FRACTION, np = parts.length;
  const v = slotPartsOf(last.value, np);
  const pcs = String(item.pc || "");
  const [ta, tb] = pcs.split("/");
  const cy = h / 2, sz = T.micro;
  const st = (cx: number, a: any, b: any, fill: string) => (
    <g>
      <text x={cx} y={cy - 6} textAnchor="middle" fontSize={sz} fontWeight={700} fill={fill}>{a}</text>
      <line x1={cx - 24} y1={cy + 2} x2={cx + 24} y2={cy + 2} stroke={C.ink} strokeWidth={3} />
      <text x={cx} y={cy + 30} textAnchor="middle" fontSize={sz} fontWeight={700} fill={fill}>{b}</text>
    </g>);
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      {tb ? <g>{st(30, ta, tb, PU_BLUE_INK)}<text x={60} y={cy + 10} fontSize={sz} fontWeight={700} fill={PU_BLUE_INK}>%</text></g>
        : <text x={12} y={cy + 10} fontSize={sz} fontWeight={700} fill={PU_BLUE_INK}>{pcs + "%"}</text>}
      <text x={118} y={cy + 10} textAnchor="middle" fontSize={sz} fontWeight={700} fill={C.ink}>=</text>
      {parts === SLOT_DECIMAL ? <text x={w - 14} y={cy + 10} textAnchor="end" fontSize={sz} fontWeight={700} fill={PU_GREEN_INK}>{v[0] + "." + v[1]}</text>
        : np === 1 ? <text x={w - 30} y={cy + 10} textAnchor="end" fontSize={sz} fontWeight={700} fill={PU_GREEN_INK}>{v[0]}</text>
        : st(w - 40, v[0], v[1], PU_GREEN_INK)}
    </g>
  );
}

function PerCentBack(props: any) {
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
      /* answering on the card (PATTERNS.md 9e): every question is a fraction or a decimal, typed into the green Answer card */
      cardAnswer: true,
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

export default PerCentBack;
