/* ═══ M1.S1.T2.C8.2D1 · per_cent_grid · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists: header + its three controls, canvas, slot + pad, bubble + mascot,
   phase dots (user / AI mode), window.toolApi, the sound effects, the printed bubble, scoring, the
   events, idle and restart. THE LESSON IS SILENT (runtime r30): nothing is spoken; every line is
   printed on the bubble, which is the guide. The lesson is action-driven: nothing moves on unless the
   child acts. THE NEW LOOK (keyOnly, navDots; docs/LAYOUT.md §1d-§1e, docs/PATTERNS.md §15-§16): the
   question lives only in the bubble, every act is performed on screen (api.act).
   NO imports in this file; only the five host hooks. Follow docs/LAYOUT.md and docs/PATTERNS.md.
   Every English line the tool prints, in its data or drawn by Work (tx("...")), has a Hindi and a
   Gujarati entry in TR once the English is final (check's tr-coverage row lists what is missing).
   Edit, never rewrite. Built by `node cli.mjs scaffold`; concepts are verbatim (check compares them). */

const TOOL_ID = "per_cent_grid";
const MEDIA_ID = "M1.S1.T2.C8.2D1";
const TOOL_NAME = "Per Cent Grid";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
/* kept for the tool object's shape (and the sidecar); nothing speaks from r30 */
const VOICE = {"rate":0.92,"pitch":1.06};

/* printed on the bubble before phase 1's teach lines only (not shown: phase 1 has steps) */
const OPENING = ["A hundred equal cells, waiting to be shaded."];
const FINISH_LINE = "You counted out of a hundred every time.";
/* printed when the child opens Free play: the grid takes drags, Scatter and Fold are both there */
const FREE_LINE = "Free play. Shade, scatter and fold, then start a new grid.";

/* THE START PAGE (runtime r28; docs/LAYOUT.md §1c): one printed question to wonder at, and the object the lesson is about */
const START_HOOK = "What does the little sign % really mean?";

/* ── Per Cent Grid: the picture, in Work coordinates. Everything stays inside x 0 to 900 at ONE size and place whether
   the keypad is open or shut (LAYOUT §3: a grid is the biggest square beside the OPEN keypad, bigPad), far from box.key. */
const PC_BLUE = "#0072B2", PC_GREEN = "#009E73", PC_AMBER = "#E69F00", PC_LINE = "#2B2B2B", PC_PAPER = "#FFFDF7";
/* a DARK skin (milk chocolate, IMAGES §7): an uncounted cell wears a pale cream wash over the skin (the chocolate still shows), a
   counted cell a deep blue, at least 3:1 apart in brightness, and every cell a near-black outline that reads on both */
const PC_CREAM = "#FFF4E2", PC_DEEP = "#0072B2", PC_EDGE = "#141414";
const pcPaint = (v: any) => (v ? { fill: PC_DEEP, fillOpacity: 0.95 } : { fill: PC_CREAM, fillOpacity: 0.82 });
/* the stretched skin is drawn a little larger than its square and clipped to it, so most of its bevel rim stays outside (the bleed
   keeps the picture inside the working area); under it a plain chocolate sheet, so a rounded corner shows chocolate, never a notch */
const PC_BLEED = 0.035, PC_CHOC = "#7A4A2E";
/* the grid layout: the hundred grid at the left; the counter, the two cards and the act key in a column at its right */
const PCG = { x: 24, y: 64, cs: 44, lblY: 46, rx: 520, rw: 360, ctrY: 64, ctrH: 108, titleY: 250, cardY: 262, cardW: 170, cardH: 160, fracX: 520, pctX: 710, keyY: 432 };
/* the strip layout (phase 4 after Fold): the strip of ten across the top, the counter and the two cards under it */
const PCS = { x: 24, y: 60, w: 860, h: 124, lblY: 44, ctrX: 24, ctrY: 250, ctrW: 300, titleY: 226, cardY: 238, fracX: 360, pctX: 560, keyX: 425, keyY: 420 };
/* two grids side by side (phase 2's two fractions, phase 3's two children) */
const PC2 = { cs: 30, gx: [24, 444], y: 58, lblY: 44, cardY: 376, cardW: 140, cardH: 136, pctOff: 160 };
/* index = column * 10 + row: a tidy shading fills full columns first, top to bottom */
const pcTidy = (k: number) => Array.from({ length: 100 }, (_, i) => i < k);
const pcRow = () => Array.from({ length: 10 }, () => false);
const pcCount = (sh: any) => sh.reduce((a: number, b: any) => a + (b ? 1 : 0), 0);
const pcCols = (sh: any) => { let c = 0; for (let i = 0; i < 10; i++) { let f = true; for (let r = 0; r < 10; r++) if (!sh[i * 10 + r]) f = false; if (f) c++; } return c; };
/* the same number of cells in other places (a seeded shuffle, so every run draws the same picture) */
function pcScatter(k: number, seed: number) {
  let s = (seed * 7919) % 233280;
  const rnd = () => (s = (s * 9301 + 49297) % 233280) / 233280;
  const order = Array.from({ length: 100 }, (_, i) => i);
  for (let i = 99; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); const t = order[i]; order[i] = order[j]; order[j] = t; }
  const out = Array.from({ length: 100 }, () => false);
  order.slice(0, k).forEach((i) => { out[i] = true; });
  return out;
}
const PC_RAVI = pcScatter(38, 11);
const PC_WARM_SCATTER = pcScatter(20, 7);

/* the chocolate over one square (a grid, a strip cell): drawn PC_BLEED larger and clipped to the square (called, never mounted) */
const pcSkin = (id: string, x: number, y: number, w: number, h: number, opacity = 1) => (
  <g key={id}>
    <clipPath id={id}><rect x={x} y={y} width={w} height={h} /></clipPath>
    <Skin name="piece" x={x - w * PC_BLEED} y={y - h * PC_BLEED} w={w * (1 + 2 * PC_BLEED)} h={h * (1 + 2 * PC_BLEED)} fit="stretch" clip={"url(#" + id + ")"} opacity={opacity} />
  </g>
);

function StartArt({ box, C, lang, tx = (v: any) => v }: any) {
  const cs = 30, gx = 190, gy = 20, sh = pcTidy(25), sx = 560, sy = 120, cw = 42;
  return (
    <g>
      <rect x={gx} y={gy} width={10 * cs} height={10 * cs} fill={PC_CHOC} />
      {pcSkin("pcsa-g", gx, gy, 10 * cs, 10 * cs)}
      {sh.map((v: boolean, i: number) => <rect key={i} x={gx + Math.floor(i / 10) * cs} y={gy + (i % 10) * cs} width={cs} height={cs} {...pcPaint(v)} stroke={PC_EDGE} strokeWidth={2.2} />)}
      <rect x={gx} y={gy} width={10 * cs} height={10 * cs} fill="none" stroke={PC_EDGE} strokeWidth={4.5} />
      {Array.from({ length: 10 }, (_, i) => (
        <g key={"s" + i}>
          <rect x={sx + i * cw} y={sy} width={cw} height={100} fill={PC_CHOC} />
          {pcSkin("pcsa-s" + i, sx + i * cw, sy, cw, 100)}
          <rect x={sx + i * cw} y={sy} width={cw} height={100} {...pcPaint(i < 4)} stroke={PC_EDGE} strokeWidth={3} />
        </g>
      ))}
      <rect x={sx} y={sy} width={10 * cw} height={100} fill="none" stroke={PC_EDGE} strokeWidth={4.5} />
      <text x={1100} y={222} textAnchor="middle" fontSize={T.display * 2} fontWeight={700} fill={shade(PC_BLUE, 0.25)}>%</text>
    </g>
  );
}

/* Hindi and Gujarati (docs/PATTERNS.md §11): keyed by the English, byte for byte. Terms: प्रतिशत / ટકા (per cent),
   भिन्न / અપૂર્ણાંક (fraction), शतांश / શતાંશ (hundredth), खाना / ખાનું (cell), स्तंभ / સ્તંભ (column), पट्टी / પટ્ટી (strip),
   ग्रिड / ગ્રિડ (grid), दहाई इकाई / દશક એકમ (tens, ones), प्रतिशतता / ટકાવારી (percentage); the child is तुम / તમે. */
const TR: any = {
  hi: {
    "Per Cent Grid": "प्रतिशत ग्रिड",
    "A hundred equal cells, waiting to be shaded.": "सौ बराबर खाने, रंगे जाने की राह में।",
    "You counted out of a hundred every time.": "तुमने हर बार सौ में से गिना।",
    "Free play. Shade, scatter and fold, then start a new grid.": "मुक्त खेल। रंगो, बिखेरो, मोड़ो, फिर नया ग्रिड लो।",
    "What does the little sign % really mean?": "छोटा-सा चिह्न % असल में क्या बताता है?",
    "Per cent means out of a hundred": "प्रतिशत का अर्थ है सौ में से",
    "A hundred equal cells. Count the shaded ones. How many out of a hundred?": "सौ बराबर खाने। रंगे खाने गिनो। सौ में से कितने?",
    "Tap Count to count the cells of the grid, a column of 10 at a time.": "गिनो कुंजी दबाओ और खाने 10-10 के स्तंभ में गिनो।",
    "Tap the Count key beside the grid.": "ग्रिड के पास की गिनो कुंजी दबाओ।",
    "Each full column holds 10 cells, so count the full columns in tens.": "हर पूरे स्तंभ में 10 खाने हैं, तो उन्हें दहाई में गिनो।",
    "After the full columns, add the single blue cells one at a time.": "पूरे स्तंभों के बाद अकेले नीले खाने एक-एक जोड़ो।",
    "So the number of shaded cells out of 100 is the per cent.": "तो 100 में से रंगे खानों की संख्या ही प्रतिशत है।",
    "You learned that per cent means out of a hundred.": "तुमने सीखा कि प्रतिशत का अर्थ है सौ में से।",
    "What per cent of the hundred grid is shaded?": "सौ खानों के ग्रिड का कितना प्रतिशत रंगा है?",
    "Shaded part as a per cent?": "रंगा भाग कितना प्रतिशत?",
    "Count only the blue cells, the shaded ones.": "सिर्फ़ नीले, यानी रंगे खाने गिनो।",
    "Yes, 63 shaded cells make 63%.": "हाँ, 63 रंगे खाने यानी 63%।",
    "10": "10",
    "100": "100",
    "1,000": "1,000",
    "Per cent means out of how many?": "प्रतिशत का अर्थ है कितने में से?",
    "Out of how many?": "कितने में से?",
    "Look at the whole grid and all of its equal cells.": "पूरे ग्रिड और उसके सब बराबर खानों को देखो।",
    "The grid has 10 columns, and each column has 10 cells.": "ग्रिड में 10 स्तंभ हैं, हर स्तंभ में 10 खाने।",
    "Think of how many cells all ten columns make together.": "सोचो, दसों स्तंभ मिलकर कितने खाने बनाते हैं।",
    "Yes, per cent means out of 100.": "हाँ, प्रतिशत यानी 100 में से।",
    "Count again: what per cent of this grid is shaded?": "फिर गिनो: इस ग्रिड का कितना प्रतिशत रंगा है?",
    "Shaded per cent?": "रंगा प्रतिशत?",
    "Look at the blue part, which is most of this grid.": "नीला भाग देखो, जो ग्रिड का ज़्यादातर हिस्सा है।",
    "Yes, 94 shaded cells make 94%.": "हाँ, 94 रंगे खाने यानी 94%।",
    "Hundredths as per cents": "शतांश प्रतिशत के रूप में",
    "The bottom number is already a hundred. The top number is the per cent.": "नीचे की संख्या पहले से सौ है। ऊपर की संख्या ही प्रतिशत है।",
    "Tap Shade to shade as many cells as the top number on the card.": "रंगो कुंजी दबाकर कार्ड की ऊपर की संख्या जितने खाने रंगो।",
    "Tap the Shade key beside the grid.": "ग्रिड के पास की रंगो कुंजी दबाओ।",
    "The bottom number is 100, so the top number counts the hundredths.": "नीचे की संख्या 100 है, तो ऊपर की संख्या शतांश गिनती है।",
    "Each hundredth is 1 per cent, so the hundredths make the per cent.": "हर शतांश 1 प्रतिशत है, तो शतांश मिलकर प्रतिशत बनते हैं।",
    "So the top number of a fraction over 100 is its per cent.": "तो 100 वाली भिन्न की ऊपर की संख्या ही उसका प्रतिशत है।",
    "You learned that hundredths are written as per cents.": "तुमने सीखा कि शतांश को प्रतिशत में लिखते हैं।",
    "Write the fraction on the card as a per cent.": "कार्ड की भिन्न को प्रतिशत में लिखो।",
    "This fraction as a per cent?": "यह भिन्न कितना प्रतिशत?",
    "The per cent is not the bottom number of the card.": "प्रतिशत कार्ड की नीचे की संख्या नहीं है।",
    "Yes, 71 hundredths is 71%.": "हाँ, 71 शतांश यानी 71%।",
    "Now write this new fraction as a per cent.": "अब इस नई भिन्न को प्रतिशत में लिखो।",
    "New fraction as a per cent?": "नई भिन्न कितना प्रतिशत?",
    "Look at the top number of the new card.": "नए कार्ड की ऊपर की संख्या देखो।",
    "Yes, 57 hundredths is 57%.": "हाँ, 57 शतांश यानी 57%।",
    "Write each fraction, the left one and the right one, as a per cent.": "बाईं और दाईं, दोनों भिन्नों को प्रतिशत में लिखो।",
    "Each as a per cent?": "दोनों कितने प्रतिशत?",
    "Write the top number of each card in its own box.": "हर कार्ड की ऊपर की संख्या उसके अपने डिब्बे में लिखो।",
    "Yes, they are 5% and 50%.": "हाँ, ये 5% और 50% हैं।",
    "Shading a per cent": "प्रतिशत रंगना",
    "Shade the right number of cells. Does it matter which ones?": "सही संख्या में खाने रंगो। क्या फ़र्क पड़ता है कि कौन-से?",
    "Tap Scatter to move the 20 shaded cells to new places.": "बिखेरो कुंजी दबाकर 20 रंगे खाने नई जगह ले जाओ।",
    "Tap the Scatter key beside the grid.": "ग्रिड के पास की बिखेरो कुंजी दबाओ।",
    "Each full column is 10 cells, so shade the tens as full columns first.": "हर पूरा स्तंभ 10 खाने है, तो पहले दहाई पूरे स्तंभों में रंगो।",
    "Shade full columns for the tens, then single cells for the ones.": "दहाई के लिए पूरे स्तंभ, फिर इकाई के लिए अकेले खाने रंगो।",
    "Any cells of the right count show the per cent.": "सही गिनती के कोई भी खाने प्रतिशत दिखाते हैं।",
    "You learned that a percentage is an amount written as a per cent.": "तुमने सीखा कि प्रतिशत में लिखी मात्रा प्रतिशतता है।",
    "Drag across the grid to shade 34%, then tap Enter.": "ग्रिड पर उँगली खींचकर 34% रंगो, फिर दर्ज करें दबाओ।",
    "Shade 34%": "34% रंगो",
    "Look at the counter beside the grid and compare it with 34.": "ग्रिड के पास की गिनती देखो और उसे 34 से मिलाओ।",
    "Yes, 34 cells show 34%.": "हाँ, 34 खाने 34% दिखाते हैं।",
    "Now shade 16% of the grid.": "अब ग्रिड का 16% रंगो।",
    "Shade 16%": "16% रंगो",
    "Count your blue cells and match them to the per cent in the question.": "अपने नीले खाने गिनो और सवाल के प्रतिशत से मिलाओ।",
    "Yes, 16 cells show 16%.": "हाँ, 16 खाने 16% दिखाते हैं।",
    "Asha": "आशा",
    "Ravi": "रवि",
    "Both": "दोनों",
    "Asha shades 3 columns and 8 cells, and Ravi 38 scattered cells; who shows 38%?": "आशा ने 3 स्तंभ और 8 खाने रंगे, रवि ने 38 बिखरे खाने; 38% कौन दिखाता है?",
    "Who shows 38%?": "38% कौन दिखाता है?",
    "Count the cells each child shaded, not where they sit.": "हर बच्चे के रंगे खाने गिनो, उनकी जगह नहीं।",
    "Ravi's cells are scattered, yet there are still 38 of them.": "रवि के खाने बिखरे हैं, फिर भी वे 38 ही हैं।",
    "Which cells are shaded does not matter, only how many are shaded.": "कौन-से खाने रंगे हैं, इससे फ़र्क नहीं पड़ता, बस कितने रंगे हैं।",
    "Yes, both are right.": "हाँ, दोनों सही हैं।",
    "A strip of ten": "दस खानों की पट्टी",
    "Ten columns fold into ten equal cells. What per cent is one cell?": "दस स्तंभ मुड़कर दस बराबर खाने बनते हैं। एक खाना कितना प्रतिशत है?",
    "Tap Fold to fold the ten columns into a strip of ten equal cells.": "मोड़ो कुंजी दबाकर दस स्तंभों से दस खानों की पट्टी बनाओ।",
    "Tap the Fold key beside the grid.": "ग्रिड के पास की मोड़ो कुंजी दबाओ।",
    "Now tap one cell of the strip to shade it.": "अब पट्टी का एक खाना छूकर उसे रंगो।",
    "Tap any one of the ten strip cells.": "पट्टी के दस खानों में से कोई एक छुओ।",
    "Each strip cell is one whole column of 10 cells, so it is 10%.": "पट्टी का हर खाना 10 खानों का पूरा स्तंभ है, तो वह 10% है।",
    "Count the shaded strip cells in tens, one ten for each cell.": "पट्टी के रंगे खाने दहाई में गिनो, हर खाने का एक दस।",
    "A strip of ten equal cells is the whole, and each cell is 10%.": "दस बराबर खानों की पट्टी पूरी है, और हर खाना 10% है।",
    "You learned that each cell of a strip of ten is 10%.": "तुमने सीखा कि दस खानों की पट्टी का हर खाना 10% है।",
    "What per cent of the strip is shaded?": "पट्टी का कितना प्रतिशत रंगा है?",
    "Shaded part of the strip?": "पट्टी का रंगा भाग?",
    "Look at one strip cell: it was a whole column of the grid.": "पट्टी का एक खाना देखो: वह ग्रिड का पूरा स्तंभ था।",
    "Yes, 3 cells of the strip are 30%.": "हाँ, पट्टी के 3 खाने 30% हैं।",
    "What per cent of the strip are these 2 cells?": "ये 2 खाने पट्टी का कितना प्रतिशत हैं?",
    "2 cells as a per cent?": "2 खाने कितना प्रतिशत?",
    "Look at what each shaded cell was before the grid folded.": "देखो, ग्रिड मुड़ने से पहले हर रंगा खाना क्या था।",
    "Yes, 2 cells are 20% of the strip.": "हाँ, 2 खाने पट्टी का 20% हैं।",
    "Shade the strip to show 90%, then tap Enter.": "पट्टी में 90% रंगो, फिर दर्ज करें दबाओ।",
    "Show 90%": "90% दिखाओ",
    "Look at how many cells of your strip are shaded now.": "देखो, अभी तुम्हारी पट्टी के कितने खाने रंगे हैं।",
    "Yes, 9 cells of the strip show 90%.": "हाँ, पट्टी के 9 खाने 90% दिखाते हैं।",
    "shaded": "रंगा", "per cent": "प्रतिशत", "left": "बायाँ", "right": "दायाँ", "%": "%",
    "Whole": "पूरा", "fraction": "भिन्न", "column": "स्तंभ", "columns": "स्तंभ", "cell": "खाना", "cells": "खाने",
    "out of 10": "10 में से", "both show 38%": "दोनों 38% दिखाते हैं", "out of 100 cells": "100 खानों में से",
    "Count": "गिनो", "Shade": "रंगो", "Scatter": "बिखेरो", "Fold": "मोड़ो", "New grid": "नया ग्रिड",
  },
  gu: {
    "Per Cent Grid": "ટકા ગ્રિડ",
    "A hundred equal cells, waiting to be shaded.": "સો સરખાં ખાનાં, રંગાવાની રાહમાં.",
    "You counted out of a hundred every time.": "તમે દર વખતે સોમાંથી ગણ્યું.",
    "Free play. Shade, scatter and fold, then start a new grid.": "મુક્ત રમત. રંગો, વિખેરો, વાળો, પછી નવું ગ્રિડ લો.",
    "What does the little sign % really mean?": "નાનું ચિહ્ન % ખરેખર શું કહે છે?",
    "Per cent means out of a hundred": "ટકા એટલે સોમાંથી",
    "A hundred equal cells. Count the shaded ones. How many out of a hundred?": "સો સરખાં ખાનાં. રંગેલાં ખાનાં ગણો. સોમાંથી કેટલાં?",
    "Tap Count to count the cells of the grid, a column of 10 at a time.": "ગણો કી દબાવો અને ખાનાં 10-10ના સ્તંભમાં ગણો.",
    "Tap the Count key beside the grid.": "ગ્રિડની બાજુની ગણો કી દબાવો.",
    "Each full column holds 10 cells, so count the full columns in tens.": "દરેક પૂરા સ્તંભમાં 10 ખાનાં છે, તેથી તેને દશકમાં ગણો.",
    "After the full columns, add the single blue cells one at a time.": "પૂરા સ્તંભ પછી એકલાં વાદળી ખાનાં એક-એક ઉમેરો.",
    "So the number of shaded cells out of 100 is the per cent.": "તો 100માંથી રંગેલાં ખાનાંની સંખ્યા જ ટકા છે.",
    "You learned that per cent means out of a hundred.": "તમે શીખ્યા કે ટકા એટલે સોમાંથી.",
    "What per cent of the hundred grid is shaded?": "સો ખાનાંના ગ્રિડના કેટલા ટકા રંગેલા છે?",
    "Shaded part as a per cent?": "રંગેલો ભાગ કેટલા ટકા?",
    "Count only the blue cells, the shaded ones.": "ફક્ત વાદળી, એટલે કે રંગેલાં ખાનાં ગણો.",
    "Yes, 63 shaded cells make 63%.": "હા, 63 રંગેલાં ખાનાં એટલે 63%.",
    "10": "10",
    "100": "100",
    "1,000": "1,000",
    "Per cent means out of how many?": "ટકા એટલે કેટલામાંથી?",
    "Out of how many?": "કેટલામાંથી?",
    "Look at the whole grid and all of its equal cells.": "આખું ગ્રિડ અને તેનાં બધાં સરખાં ખાનાં જુઓ.",
    "The grid has 10 columns, and each column has 10 cells.": "ગ્રિડમાં 10 સ્તંભ છે, દરેક સ્તંભમાં 10 ખાનાં.",
    "Think of how many cells all ten columns make together.": "વિચારો, દસેય સ્તંભ મળીને કેટલાં ખાનાં બનાવે છે.",
    "Yes, per cent means out of 100.": "હા, ટકા એટલે 100માંથી.",
    "Count again: what per cent of this grid is shaded?": "ફરી ગણો: આ ગ્રિડના કેટલા ટકા રંગેલા છે?",
    "Shaded per cent?": "રંગેલા ટકા?",
    "Look at the blue part, which is most of this grid.": "વાદળી ભાગ જુઓ, જે ગ્રિડનો મોટો ભાગ છે.",
    "Yes, 94 shaded cells make 94%.": "હા, 94 રંગેલાં ખાનાં એટલે 94%.",
    "Hundredths as per cents": "શતાંશ ટકા તરીકે",
    "The bottom number is already a hundred. The top number is the per cent.": "નીચેની સંખ્યા પહેલેથી સો છે. ઉપરની સંખ્યા જ ટકા છે.",
    "Tap Shade to shade as many cells as the top number on the card.": "રંગો કી દબાવી કાર્ડની ઉપરની સંખ્યા જેટલાં ખાનાં રંગો.",
    "Tap the Shade key beside the grid.": "ગ્રિડની બાજુની રંગો કી દબાવો.",
    "The bottom number is 100, so the top number counts the hundredths.": "નીચેની સંખ્યા 100 છે, તેથી ઉપરની સંખ્યા શતાંશ ગણે છે.",
    "Each hundredth is 1 per cent, so the hundredths make the per cent.": "દરેક શતાંશ 1 ટકો છે, તેથી શતાંશ મળીને ટકા બને છે.",
    "So the top number of a fraction over 100 is its per cent.": "તો 100વાળા અપૂર્ણાંકની ઉપરની સંખ્યા જ તેના ટકા છે.",
    "You learned that hundredths are written as per cents.": "તમે શીખ્યા કે શતાંશને ટકામાં લખાય છે.",
    "Write the fraction on the card as a per cent.": "કાર્ડ પરના અપૂર્ણાંકને ટકામાં લખો.",
    "This fraction as a per cent?": "આ અપૂર્ણાંક કેટલા ટકા?",
    "The per cent is not the bottom number of the card.": "ટકા કાર્ડની નીચેની સંખ્યા નથી.",
    "Yes, 71 hundredths is 71%.": "હા, 71 શતાંશ એટલે 71%.",
    "Now write this new fraction as a per cent.": "હવે આ નવા અપૂર્ણાંકને ટકામાં લખો.",
    "New fraction as a per cent?": "નવો અપૂર્ણાંક કેટલા ટકા?",
    "Look at the top number of the new card.": "નવા કાર્ડની ઉપરની સંખ્યા જુઓ.",
    "Yes, 57 hundredths is 57%.": "હા, 57 શતાંશ એટલે 57%.",
    "Write each fraction, the left one and the right one, as a per cent.": "ડાબો અને જમણો, બંને અપૂર્ણાંકને ટકામાં લખો.",
    "Each as a per cent?": "બંને કેટલા ટકા?",
    "Write the top number of each card in its own box.": "દરેક કાર્ડની ઉપરની સંખ્યા તેના પોતાના બૉક્સમાં લખો.",
    "Yes, they are 5% and 50%.": "હા, તે 5% અને 50% છે.",
    "Shading a per cent": "ટકા રંગવા",
    "Shade the right number of cells. Does it matter which ones?": "સાચી સંખ્યામાં ખાનાં રંગો. કયાં ખાનાં, તેનાથી ફરક પડે?",
    "Tap Scatter to move the 20 shaded cells to new places.": "વિખેરો કી દબાવી 20 રંગેલાં ખાનાં નવી જગ્યાએ લઈ જાઓ.",
    "Tap the Scatter key beside the grid.": "ગ્રિડની બાજુની વિખેરો કી દબાવો.",
    "Each full column is 10 cells, so shade the tens as full columns first.": "દરેક પૂરો સ્તંભ 10 ખાનાં છે, તેથી પહેલાં દશક પૂરા સ્તંભમાં રંગો.",
    "Shade full columns for the tens, then single cells for the ones.": "દશક માટે પૂરા સ્તંભ, પછી એકમ માટે એકલાં ખાનાં રંગો.",
    "Any cells of the right count show the per cent.": "સાચી ગણતરીનાં કોઈ પણ ખાનાં ટકા બતાવે છે.",
    "You learned that a percentage is an amount written as a per cent.": "તમે શીખ્યા કે ટકામાં લખેલી રકમ ટકાવારી છે.",
    "Drag across the grid to shade 34%, then tap Enter.": "ગ્રિડ પર આંગળી ખેંચી 34% રંગો, પછી દાખલ કરો દબાવો.",
    "Shade 34%": "34% રંગો",
    "Look at the counter beside the grid and compare it with 34.": "ગ્રિડની બાજુની ગણતરી જુઓ અને તેને 34 સાથે સરખાવો.",
    "Yes, 34 cells show 34%.": "હા, 34 ખાનાં 34% બતાવે છે.",
    "Now shade 16% of the grid.": "હવે ગ્રિડના 16% રંગો.",
    "Shade 16%": "16% રંગો",
    "Count your blue cells and match them to the per cent in the question.": "તમારાં વાદળી ખાનાં ગણો અને પ્રશ્નના ટકા સાથે સરખાવો.",
    "Yes, 16 cells show 16%.": "હા, 16 ખાનાં 16% બતાવે છે.",
    "Asha": "આશા",
    "Ravi": "રવિ",
    "Both": "બંને",
    "Asha shades 3 columns and 8 cells, and Ravi 38 scattered cells; who shows 38%?": "આશાએ 3 સ્તંભ અને 8 ખાનાં રંગ્યાં, રવિએ 38 વિખરાયેલાં ખાનાં; 38% કોણ બતાવે છે?",
    "Who shows 38%?": "38% કોણ બતાવે છે?",
    "Count the cells each child shaded, not where they sit.": "દરેક બાળકે રંગેલાં ખાનાં ગણો, તેમની જગ્યા નહીં.",
    "Ravi's cells are scattered, yet there are still 38 of them.": "રવિનાં ખાનાં વિખરાયેલાં છે, છતાં તે 38 જ છે.",
    "Which cells are shaded does not matter, only how many are shaded.": "કયાં ખાનાં રંગેલાં છે તે મહત્ત્વનું નથી, ફક્ત કેટલાં રંગેલાં છે.",
    "Yes, both are right.": "હા, બંને સાચાં છે.",
    "A strip of ten": "દસ ખાનાંની પટ્ટી",
    "Ten columns fold into ten equal cells. What per cent is one cell?": "દસ સ્તંભ વળીને દસ સરખાં ખાનાં બને છે. એક ખાનું કેટલા ટકા છે?",
    "Tap Fold to fold the ten columns into a strip of ten equal cells.": "વાળો કી દબાવી દસ સ્તંભમાંથી દસ ખાનાંની પટ્ટી બનાવો.",
    "Tap the Fold key beside the grid.": "ગ્રિડની બાજુની વાળો કી દબાવો.",
    "Now tap one cell of the strip to shade it.": "હવે પટ્ટીનું એક ખાનું સ્પર્શી તેને રંગો.",
    "Tap any one of the ten strip cells.": "પટ્ટીનાં દસ ખાનાંમાંથી કોઈ એક સ્પર્શો.",
    "Each strip cell is one whole column of 10 cells, so it is 10%.": "પટ્ટીનું દરેક ખાનું 10 ખાનાંનો આખો સ્તંભ છે, તેથી તે 10% છે.",
    "Count the shaded strip cells in tens, one ten for each cell.": "પટ્ટીનાં રંગેલાં ખાનાં દશકમાં ગણો, દરેક ખાનાનો એક દસ.",
    "A strip of ten equal cells is the whole, and each cell is 10%.": "દસ સરખાં ખાનાંની પટ્ટી આખી છે, અને દરેક ખાનું 10% છે.",
    "You learned that each cell of a strip of ten is 10%.": "તમે શીખ્યા કે દસ ખાનાંની પટ્ટીનું દરેક ખાનું 10% છે.",
    "What per cent of the strip is shaded?": "પટ્ટીના કેટલા ટકા રંગેલા છે?",
    "Shaded part of the strip?": "પટ્ટીનો રંગેલો ભાગ?",
    "Look at one strip cell: it was a whole column of the grid.": "પટ્ટીનું એક ખાનું જુઓ: તે ગ્રિડનો આખો સ્તંભ હતો.",
    "Yes, 3 cells of the strip are 30%.": "હા, પટ્ટીનાં 3 ખાનાં 30% છે.",
    "What per cent of the strip are these 2 cells?": "આ 2 ખાનાં પટ્ટીના કેટલા ટકા છે?",
    "2 cells as a per cent?": "2 ખાનાં કેટલા ટકા?",
    "Look at what each shaded cell was before the grid folded.": "જુઓ, ગ્રિડ વળ્યા પહેલાં દરેક રંગેલું ખાનું શું હતું.",
    "Yes, 2 cells are 20% of the strip.": "હા, 2 ખાનાં પટ્ટીના 20% છે.",
    "Shade the strip to show 90%, then tap Enter.": "પટ્ટીમાં 90% રંગો, પછી દાખલ કરો દબાવો.",
    "Show 90%": "90% બતાવો",
    "Look at how many cells of your strip are shaded now.": "જુઓ, હમણાં તમારી પટ્ટીનાં કેટલાં ખાનાં રંગેલાં છે.",
    "Yes, 9 cells of the strip show 90%.": "હા, પટ્ટીનાં 9 ખાનાં 90% બતાવે છે.",
    "shaded": "રંગેલું", "per cent": "ટકા", "left": "ડાબું", "right": "જમણું", "%": "%",
    "Whole": "આખું", "fraction": "અપૂર્ણાંક", "column": "સ્તંભ", "columns": "સ્તંભ", "cell": "ખાનું", "cells": "ખાનાં",
    "out of 10": "10માંથી", "both show 38%": "બંને 38% બતાવે છે", "out of 100 cells": "100 ખાનાંમાંથી",
    "Count": "ગણો", "Shade": "રંગો", "Scatter": "વિખેરો", "Fold": "વાળો", "New grid": "નવું ગ્રિડ",
  },
};

/* the answer slot's one box: the child types the number, the % sign is PRINTED (BUILD_CARD §7, 2026-10-17 ch 6) */
const PC_SHADED = [{ label: "shaded", unit: "%" }];
const PC_PER = [{ label: "per cent", unit: "%" }];

const PHASES = [
  {
    n: 1,
    concept: "Per cent means out of a hundred",
    conceptId: "M1.S1.T2.C5", objectiveIds: ["O1"],
    says: ["A hundred equal cells. Count the shaded ones. How many out of a hundred?"],
    steps: [{ say: "Tap Count to count the cells of the grid, a column of 10 at a time.", on: "count", hint: "Tap the Count key beside the grid." }],
    /* the plan's rungs: count the full columns only; then the single cells only */
    ladder: ["Each full column holds 10 cells, so count the full columns in tens.", "After the full columns, add the single blue cells one at a time."],
    closing: "So the number of shaded cells out of 100 is the per cent.",
    learned: "You learned that per cent means out of a hundred.",
    traceback: "each full shaded column lights amber in turn and the counter adds it, then the single cells; the cards end on the count over 100 and the per cent",
    items: [
      /* learn PG1: answer in the plan = 63% (the plan's question names the 63; here the grid shows it and the child counts) */
      { qid: "M1.S1.T2.C5:PG1", kind: "read", cols: 6, cells: 3, parts: PC_SHADED, answer: [63], near: "37",
        say: "What per cent of the hundred grid is shaded?", ask: "Shaded part as a per cent?",
        miss: "Count only the blue cells, the shaded ones.", win: "Yes, 63 shaded cells make 63%." },
      /* practice 1: answer in the plan = Out of a hundred (three keys, the answer in the middle) */
      { qid: "M1.S1.T2.C5:1", kind: "mean", choices: [{ id: "ten", label: "10" }, { id: "hundred", label: "100" }, { id: "thousand", label: "1,000" }], answer: "hundred", near: "ten",
        say: "Per cent means out of how many?", ask: "Out of how many?",
        miss: "Look at the whole grid and all of its equal cells.",
        ladder: ["The grid has 10 columns, and each column has 10 cells.", "Think of how many cells all ten columns make together."],
        win: "Yes, per cent means out of 100." },
      /* practice 5: answer in the plan = 94%, because 9 columns are 90 cells and 4 more make 94 of the 100 */
      { qid: "M1.S1.T2.C5:5", kind: "read", cols: 9, cells: 4, parts: PC_SHADED, answer: [94], near: "6",
        say: "Count again: what per cent of this grid is shaded?", ask: "Shaded per cent?",
        miss: "Look at the blue part, which is most of this grid.", win: "Yes, 94 shaded cells make 94%." },
    ],
  },
  {
    n: 2,
    concept: "Hundredths as per cents",
    conceptId: "M1.S1.T2.C6", objectiveIds: ["O1"],
    says: ["The bottom number is already a hundred. The top number is the per cent."],
    steps: [{ say: "Tap Shade to shade as many cells as the top number on the card.", on: "shade", hint: "Tap the Shade key beside the grid." }],
    /* the plan's rungs: read the bottom number and check it is one hundred; read the top number */
    ladder: ["The bottom number is 100, so the top number counts the hundredths.", "Each hundredth is 1 per cent, so the hundredths make the per cent."],
    closing: "So the top number of a fraction over 100 is its per cent.",
    learned: "You learned that hundredths are written as per cents.",
    traceback: "the grid shades the top number of cells, full columns first, and the per cent card ends on that number with the % sign",
    items: [
      /* learn PG2: answer in the plan = 71% */
      { qid: "M1.S1.T2.C6:PG2", kind: "frac", num: 71, parts: PC_PER, answer: [71], near: "100",
        say: "Write the fraction on the card as a per cent.", ask: "This fraction as a per cent?",
        miss: "The per cent is not the bottom number of the card.", win: "Yes, 71 hundredths is 71%." },
      /* practice 2: answer in the plan = 57% */
      { qid: "M1.S1.T2.C6:2", kind: "frac", num: 57, parts: PC_PER, answer: [57], near: "100",
        say: "Now write this new fraction as a per cent.", ask: "New fraction as a per cent?",
        miss: "Look at the top number of the new card.", win: "Yes, 57 hundredths is 57%." },
      /* practice 6: answer in the plan = 5% and 50% (two boxes, the left card and the right card) */
      { qid: "M1.S1.T2.C6:6", kind: "two", nums: [5, 50], parts: [{ label: "left", unit: "%" }, { label: "right", unit: "%" }], answer: [5, 50], near: "100|100",
        say: "Write each fraction, the left one and the right one, as a per cent.", ask: "Each as a per cent?",
        miss: "Write the top number of each card in its own box.", win: "Yes, they are 5% and 50%." },
    ],
  },
  {
    n: 3,
    concept: "Shading a per cent",
    conceptId: "M1.S1.T2.C7", objectiveIds: ["O2"],
    says: ["Shade the right number of cells. Does it matter which ones?"],
    steps: [{ say: "Tap Scatter to move the 20 shaded cells to new places.", on: "scatter", hint: "Tap the Scatter key beside the grid." }],
    /* the plan's rungs: shade the full columns only; add the single cells one at a time */
    ladder: ["Each full column is 10 cells, so shade the tens as full columns first.", "Shade full columns for the tens, then single cells for the ones."],
    closing: "Any cells of the right count show the per cent.",
    learned: "You learned that a percentage is an amount written as a per cent.",
    traceback: "the right count is shaded on a demo layer, full columns first, and the cards end on it; the child's own shading comes back at the next act",
    items: [
      /* learn PG3: answer in the plan = Any 34 cells of the 100 (a build target: the per cent IS the question) */
      { qid: "M1.S1.T2.C7:PG3", kind: "shade", pct: 34, pad: "enter", answer: 34, near: 43,
        say: "Drag across the grid to shade 34%, then tap Enter.", ask: "Shade 34%",
        miss: "Look at the counter beside the grid and compare it with 34.", win: "Yes, 34 cells show 34%." },
      /* practice 3: answer in the plan = Any 16 cells */
      { qid: "M1.S1.T2.C7:3", kind: "shade", pct: 16, pad: "enter", answer: 16, near: 61,
        say: "Now shade 16% of the grid.", ask: "Shade 16%",
        miss: "Count your blue cells and match them to the per cent in the question.", win: "Yes, 16 cells show 16%." },
      /* practice 7: answer in the plan = Both are right. Each shaded 38 of the 100 cells, and which cells does not matter */
      { qid: "M1.S1.T2.C7:7", kind: "who", a: [3, 8], b: 38, choices: [{ id: "asha", label: "Asha" }, { id: "ravi", label: "Ravi" }, { id: "both", label: "Both" }], answer: "both", near: "asha",
        say: "Asha shades 3 columns and 8 cells, and Ravi 38 scattered cells; who shows 38%?", ask: "Who shows 38%?",
        miss: "Count the cells each child shaded, not where they sit.",
        ladder: ["Ravi's cells are scattered, yet there are still 38 of them.", "Which cells are shaded does not matter, only how many are shaded."],
        win: "Yes, both are right." },
    ],
  },
  {
    n: 4,
    concept: "A strip of ten",
    conceptId: "M1.S1.T2.C8", objectiveIds: ["O2"],
    says: ["Ten columns fold into ten equal cells. What per cent is one cell?"],
    steps: [
      { say: "Tap Fold to fold the ten columns into a strip of ten equal cells.", on: "fold", hint: "Tap the Fold key beside the grid." },
      { say: "Now tap one cell of the strip to shade it.", on: "shade", hint: "Tap any one of the ten strip cells." },
    ],
    /* the plan's rungs: shade one cell of the strip and read the card; shade one more and read it again */
    ladder: ["Each strip cell is one whole column of 10 cells, so it is 10%.", "Count the shaded strip cells in tens, one ten for each cell."],
    closing: "A strip of ten equal cells is the whole, and each cell is 10%.",
    learned: "You learned that each cell of a strip of ten is 10%.",
    traceback: "each shaded strip cell is labelled with the running per cent in tens, and the cards end on the per cent",
    items: [
      /* learn PG4: answer in the plan = 30% */
      { qid: "M1.S1.T2.C8:PG4", kind: "strip", lit: 3, parts: PC_SHADED, answer: [30], near: "3",
        say: "What per cent of the strip is shaded?", ask: "Shaded part of the strip?",
        miss: "Look at one strip cell: it was a whole column of the grid.", win: "Yes, 3 cells of the strip are 30%." },
      /* practice 4: answer in the plan = 20%, because each cell is 10% */
      { qid: "M1.S1.T2.C8:4", kind: "strip", lit: 2, parts: PC_SHADED, answer: [20], near: "2",
        say: "What per cent of the strip are these 2 cells?", ask: "2 cells as a per cent?",
        miss: "Look at what each shaded cell was before the grid folded.", win: "Yes, 2 cells are 20% of the strip." },
      /* practice 8: answer in the plan = 9 cells, because each cell is 10% */
      { qid: "M1.S1.T2.C8:8", kind: "stripShade", pct: 90, pad: "enter", answer: 9, near: 1,
        say: "Shade the strip to show 90%, then tap Enter.", ask: "Show 90%",
        miss: "Look at how many cells of your strip are shaded now.", win: "Yes, 9 cells of the strip show 90%." },
    ],
  },
];

/* The numbers, rows, sizes and targets the working area needs (they go into the sidecar too). */
const MODEL = { grid: { cols: 10, rows: 10, cell: PCG.cs }, strip: { cells: 10, cell: PCS.w / 10 }, warmUp: { shadePhase2: 25, scatterPhase3: 20 } };

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* judge: is this value right for this item? (numbers compare as numbers) */
const judge = (item: any, v: any) => {
  if (item.parts) return judgeSlotParts(item, v);
  if (typeof item.answer === "number") return leadNumber(v) === item.answer;
  return String(v).trim().toLowerCase() === String(item.answer).trim().toLowerCase();
};
/* oracle: every answer re-derived from the item's own picture data, by a route that shares no code with judge or Work */
const oracle = () => PHASES.every((p: any) => p.items.every((it: any) => {
  const want = it.kind === "read" ? [it.cols * 10 + it.cells] : it.kind === "frac" ? [it.num] : it.kind === "two" ? it.nums.slice()
    : it.kind === "strip" ? [it.lit * 100 / 10] : it.kind === "shade" ? it.pct : it.kind === "stripShade" ? it.pct / (100 / 10)
    : it.kind === "mean" ? (10 * 10 === 100 ? "hundred" : "ten") : it.kind === "who" ? (it.a[0] * 10 + it.a[1] === it.b ? "both" : "asha") : null;
  return JSON.stringify(want) === JSON.stringify(it.answer);
}));
/* the most likely wrong answer (the misconception: the white cells, the denominator, the digits swapped, a cell as 1%) */
const nearMiss = (item: any) => item.near;
/* the forms of an answer that no question, hint or ladder line may print (a build target and a choice are exempt) */
const answerForms = (item: any) => (item.choices || item.kind === "shade" ? []
  : item.parts ? item.answer.filter((x: number) => x >= 10).flatMap((x: number) => [String(x), indian(x), words(x)])
  : typeof item.answer === "number" ? [String(item.answer), indian(item.answer), words(item.answer)] : [String(item.answer)]);
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => item.answer;

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => (T.state().stage === "demo" ? HOOK.demo && HOOK.demo() : T.submit(item.answer));
/* the agent's answer() for an item made on the working area: set it as a child would; undefined = type it */
const answer = (item: any, v: any) => (item.pad === "enter" && HOOK.set ? HOOK.set(v) : undefined);
/* the agent's check() before Enter: nothing waits on the working area, so Enter is pressed (and a step is performed) */
const check = () => (HOOK.check ? HOOK.check() : undefined);

/* ── the working area ────────────────────────────────────────────────────────────────────────
   keyOnly: 64,108, 1472 x 520 with the panel shut, 900 x 520 open (bigPad); the picture is laid out once in x 0 to 900.
   Phase 1 reads a shaded grid; phase 2 reads a fraction card; phase 3 shades by dragging on the grid (full columns first:
   the drop point fills every cell up to it, column by column) and scatters; phase 4 folds the grid into a strip of ten. */
function Work({ phase, n, item, index, stage, wrong, typed, api, MODEL, step, stepOn, box, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();
  const tl2 = useTimeline();   /* the fold's glide: its own timeline, so a correction can play it inside its own run */
  const it: any = item || {};
  /* a phase opens on "teach" for one frame before its guide steps: draw the warm-up then too, never question 1's board (ch 9 trap) */
  const free = stage === "free", demo = stage === "demo" || stage === "teach", ask = stage === "ask";
  const won = stage === "win" || stage === "idle";
  const kind = free ? "free" : demo ? "demo" : it.kind || "";
  const bInk = shade(PC_BLUE, 0.25), gInk = shade(PC_GREEN, 0.25), aInk = shade(PC_AMBER, 0.45);
  const G = PCG, S = PCS, cw = S.w / 10;

  const [ownS, setOwn] = useState<any>(() => pcTidy(0));      /* the child's own shading of the grid */
  const [cellsS, setCells] = useState<any>(() => pcRow());     /* the child's own cells of the strip */
  const [warmS, setWarm] = useState<any>({ counted: 0, shaded: 0, scattered: false, lit: -1 });
  const [foldS, setFold] = useState(0);                         /* 0 the grid, 1 the strip, between: the glide */
  const [tbS, setTb] = useState<any>(null);                     /* the correction's progress (a demo-only layer); null = none */
  /* the board belongs to its question: until the reset below has run for a new question, phase or mode, draw (and report) a fresh
     board, never the old one for a frame (ch 9 trap) */
  const qk = n + ":" + index + ":" + (demo ? "d" : "") + (free ? "f" : "");
  const boardKey = useRef(qk);
  const fresh = boardKey.current !== qk;
  const own = fresh ? pcTidy(0) : ownS, cells = fresh ? pcRow() : cellsS, tb = fresh ? null : tbS;
  const warm = fresh ? { counted: 0, shaded: 0, scattered: false, lit: -1 } : warmS;
  const fold = fresh ? (n === 4 && !demo && !free ? 1 : 0) : foldS;
  const [busy, setBusy] = useState(false);
  const [tbOn, setTbOn] = useState(false);                      /* a correction is playing: the grid and the strip take no act */
  const playing = useRef(false), lastKey = useRef(0), lastTap = useRef<any>({ at: "", t: 0 }), seed = useRef(5), cntRef = useRef(0), tbRun = useRef(false), hinted = useRef(false);

  /* a fresh picture for every question, the warm-up and free play */
  useEffect(() => {
    boardKey.current = qk;
    tl.stop(); tl2.stop();
    if (tbRun.current) { tbRun.current = false; api.lock(false); }
    setTbOn(false); hinted.current = false;
    setTb(null); setOwn(pcTidy(0)); setCells(pcRow());
    setWarm({ counted: 0, shaded: 0, scattered: false, lit: -1 });
    setFold(n === 4 && !demo && !free ? 1 : 0);
  }, [n, index, demo, free]);

  /* every act through a real tool on screen (PATTERNS §15): the state changes as it passes, the step moves on at its end */
  const perform = (o: any, done: () => void) => {
    if (playing.current) return;
    playing.current = true; setBusy(true);
    Promise.resolve(api.act(o)).then((ok: any) => { playing.current = false; setBusy(false); if (ok) done(); });
  };
  const glide = (to: number) => tl2.run(Array.from({ length: 12 }, (_, i) => [40, () => setFold(to ? (i + 1) / 12 : 1 - (i + 1) / 12)]));
  const colMid = (i: number) => ({ x: G.x + (i + 0.5) * G.cs, y: G.y + 5 * G.cs });
  const mid = { x: G.x + 5 * G.cs, y: G.y + 5 * G.cs };

  /* the shading rules, the same for the grid (100 cells, column by column) and the strip (10 cells):
     a tap on a TIDY shading fills every cell up to the tapped one (a tap on the last one clears it), a tap on a SCATTER toggles
     that one cell and keeps the scatter; a drag fills up to where it ends; a key adds or takes away one cell */
  const isPrefix = (a: any) => { const c = a.filter(Boolean).length; return a.every((v: any, i: number) => !!v === i < c); };
  const fillTo = (a: any, i: number) => a.map((_: any, j: number) => j <= i);
  const tapTo = (a: any, i: number) => {
    if (!isPrefix(a)) return a.map((v: any, j: number) => (j === i ? !v : v));
    const c = a.filter(Boolean).length;
    return a.map((_: any, j: number) => j < (c === i + 1 ? i : i + 1));
  };
  const stepCells = (a: any, d: number) => {
    const c = a.filter(Boolean).length;
    if (isPrefix(a)) return a.map((_: any, i: number) => i < Math.max(0, Math.min(a.length, c + d)));
    let j = -1;
    if (d > 0) j = a.findIndex((v: any) => !v); else a.forEach((v: any, i: number) => { if (v) j = i; });
    return j < 0 ? a : a.map((v: any, i: number) => (i === j ? d > 0 : v));
  };
  /* free play's strip: each strip cell is a whole column of the grid */
  const colsOf = (o: any) => Array.from({ length: 10 }, (_, c) => o.slice(c * 10, c * 10 + 10).every(Boolean));
  const fromCols = (cs: any) => Array.from({ length: 100 }, (_, j) => !!cs[Math.floor(j / 10)]);
  /* the hint the child is on (the miss, then the ladder), shown again when Enter has nothing new to send */
  const rung = () => {
    const t = (wrong && wrong.tries) || 0, lad = (it.ladder && it.ladder.length ? it.ladder : (PHASES[n - 1] || {}).ladder) || [];
    return t <= 1 ? it.miss : lad[Math.min(t - 2, lad.length - 1)] || it.miss;
  };
  /* the child acts on the picture: a hint Work showed gives way to the question again */
  const acted = () => { setTb(null); if (hinted.current) { hinted.current = false; api.say(it.say); } };

  const act = (on: any) => {
    if (on === "count") {
      if (warm.counted >= 10) { api.did("count"); return; }
      perform({ tool: "hand", moves: "tap", at: Array.from({ length: 10 }, (_, i) => colMid(i)),
        onPoint: (i: number) => { setWarm((w: any) => ({ ...w, counted: i + 1 })); api.sfx.tick(); } },
      () => { setWarm((w: any) => ({ ...w, counted: 10 })); api.sfx.settle(); api.did("count"); });
    } else if (on === "shade" && n === 4) {
      setWarm((w: any) => ({ ...w, lit: 0 })); api.sfx.tick(); api.did("shade");
    } else if (on === "shade") {
      if (warm.shaded >= 25) { api.did("shade"); return; }
      const at = [colMid(0), colMid(1), ...[0, 1, 2, 3, 4].map((r) => ({ x: G.x + 2.5 * G.cs, y: G.y + (r + 0.5) * G.cs }))];
      perform({ tool: "pencil", moves: "draw", at, onPoint: (i: number) => setWarm((w: any) => ({ ...w, shaded: i < 2 ? (i + 1) * 10 : 19 + i })) },
        () => { setWarm((w: any) => ({ ...w, shaded: 25 })); api.sfx.settle(); api.did("shade"); });
    } else if (on === "scatter") {
      const k = demo ? 20 : pcCount(own);
      if (!k || (demo && warm.scattered)) { api.did("scatter"); return; }
      perform({ tool: "hand", moves: "sweep", from: { x: G.x - 10, y: mid.y }, at: [mid], to: { x: G.x + 10 * G.cs + 10, y: mid.y },
        onPoint: () => { if (demo) setWarm((w: any) => ({ ...w, scattered: true })); else { acted(); setOwn(pcScatter(k, seed.current++)); } api.sfx.trade(); } },
      () => { api.sfx.settle(); api.did("scatter"); });
    } else if (on === "fold") {
      if (fold >= 1) { api.did("fold"); return; }
      perform({ tool: "hand", moves: "push", from: { x: G.x + 10 * G.cs + 30, y: mid.y }, at: [{ x: G.x + 330, y: mid.y }], to: { x: G.x + 240, y: mid.y },
        onPoint: () => { glide(1); api.sfx.trade(); } },
      () => { setFold(1); api.sfx.settle(); api.did("fold"); });
    } else if (on === "newgrid") {
      /* free play after Fold: a fresh, empty grid (a new start, never an undo of the fold) */
      perform({ tool: "hand", moves: "sweep", from: { x: S.x - 10, y: S.y + S.h / 2 }, at: [{ x: S.x + S.w / 2, y: S.y + S.h / 2 }], to: { x: S.x + S.w + 10, y: S.y + S.h / 2 },
        onPoint: () => { tl2.stop(); setOwn(pcTidy(0)); setFold(0); api.sfx.trade(); } },
      () => { api.sfx.settle(); api.did("newgrid"); });
    }
  };
  /* one key, a 400 ms guard: one tap never also presses the next label */
  const pressKey = (on: string) => {
    const t = Date.now();
    if (t - lastKey.current < 400) return;
    lastKey.current = t;
    act(on);
  };

  /* the grid and the strip take a drag, a tap (a double tap is ONE tap) or a key; nothing while a correction or an act plays */
  const cellAt = (x: number, y: number) => Math.max(0, Math.min(9, Math.floor((x - G.x) / G.cs))) * 10 + Math.max(0, Math.min(9, Math.floor((y - G.y) / G.cs)));
  const stripAt = (x: number) => Math.max(0, Math.min(9, Math.floor((x - S.x) / cw)));
  const gridLive = (ask && (kind === "frac" || kind === "shade")) || (free && fold === 0);
  const stripLive = (ask && kind === "stripShade") || (demo && stepOn === "shade") || (free && fold >= 1);
  const busyNow = () => playing.current || tbRun.current;
  const drag = useDrag((payload: any, p: any, moved: boolean) => {
    const byKey = !p || Number.isNaN(p.x);
    /* a double tap is ONE tap: only a second tap on the SAME cell within 400 ms is dropped */
    if (!moved && !byKey) {
      const t = Date.now(), at = payload + ":" + (payload === "strip" ? stripAt(p.x) : cellAt(p.x, p.y));
      if (lastTap.current.at === at && t - lastTap.current.t < 400) return;
      lastTap.current = { at, t };
    }
    if (payload === "strip") {
      const i = byKey ? 0 : stripAt(p.x);
      if (demo) { if (stepOn === "shade") { setWarm((w: any) => ({ ...w, lit: i })); api.sfx.tick(); } api.did("shade"); return; }
      api.did("strip");
      if (!stripLive || busyNow()) return;
      const nextOf = (a: any) => (byKey ? stepCells(a, 1) : moved ? fillTo(a, i) : tapTo(a, i));
      if (free) setOwn((o: any) => fromCols(nextOf(colsOf(o))));
      else { acted(); setCells(nextOf); }
      api.sfx.tick();
      return;
    }
    if (payload !== "grid") return;
    api.did("grid");
    if (!gridLive || busyNow()) return;
    acted();
    setOwn((a: any) => (byKey ? stepCells(a, 1) : moved ? fillTo(a, cellAt(p.x, p.y)) : tapTo(a, cellAt(p.x, p.y))));
    api.sfx.tick();
  });
  /* the keyboard on a focused grid or strip: Backspace, ArrowLeft or ArrowDown take one cell away, Space, ArrowRight or ArrowUp add
     one; the focus stays; Enter passes to the window, so it answers */
  const keyAct = (which: string) => (e: any) => {
    const k = e.key, d = k === "Backspace" || k === "ArrowLeft" || k === "ArrowDown" ? -1 : k === " " || k === "ArrowRight" || k === "ArrowUp" ? 1 : 0;
    if (!d) return;
    e.preventDefault(); e.stopPropagation();
    if (which === "strip" && demo) { if (d > 0 && stepOn === "shade") { setWarm((w: any) => ({ ...w, lit: 0 })); api.did("shade"); } else api.did("strip"); return; }
    api.did(which);
    if (busyNow() || (which === "grid" ? !gridLive : !stripLive)) return;
    if (which === "grid") { acted(); setOwn((a: any) => stepCells(a, d)); }
    else if (free) setOwn((o: any) => fromCols(stepCells(colsOf(o), d)));
    else { acted(); setCells((a: any) => stepCells(a, d)); }
    api.sfx.tick();
  };
  const dragNow = drag.drag && drag.drag.moved && !tbOn ? drag.drag : null;
  const ownShown = dragNow && dragNow.payload === "grid" && gridLive ? fillTo(own, cellAt(dragNow.x, dragNow.y)) : own;
  const cellsShown = dragNow && dragNow.payload === "strip" && stripLive && !free && !demo ? fillTo(cells, stripAt(dragNow.x)) : cells;
  const ownCnt = pcCount(own), cellCnt = cells.filter(Boolean).length;
  const sk = free ? "free" : it.kind;
  cntRef.current = sk === "stripShade" ? cellCnt : ownCnt;

  /* the per cent boxes take 3 digits at most */
  useEffect(() => {
    if (!ask || !it.parts || typeof typed !== "string") return;
    const t2 = typed.split("|").map((s: string) => s.slice(0, 3)).join("|");
    if (t2 !== typed) api.setTyped(t2);
  }, [typed]);

  /* a question answered on the working area: the Enter key blinks once something is shaded (and no correction stands) */
  useEffect(() => { if (ask && it.pad === "enter") api.answerReady(cntRef.current > 0 && tb === null); }, [ask, index, ownCnt, cellCnt, tb]);

  /* Enter, the agent's check() and the dev solve() perform the current step; at a shading question Enter answers */
  HOOK.demo = () => act(stepOn);
  HOOK.set = (v: any) => {
    const c = Number(Array.isArray(v) ? v[0] : v);
    if (it.kind === "shade") { setTb(null); setOwn(pcTidy(c)); cntRef.current = c; return true; }
    if (it.kind === "stripShade") { setTb(null); setCells(Array.from({ length: 10 }, (_, i) => i < c)); cntRef.current = c; return true; }
    return undefined;
  };
  api.onEnter(demo && stepOn ? () => act(stepOn)
    : ask && it.pad === "enter" ? () => {
      if (busyNow()) return;
      if (cntRef.current > 0 && tb === null) { api.submit(cntRef.current); return; }
      /* nothing shaded, or the correction still stands untouched: the hint again, and no try is counted */
      hinted.current = true; api.say(rung());
    } : null);

  /* the traceback: the maths redrawn step by step on a demo-only layer, ending on the whole right answer, unmarked */
  const grow = (t: number) => { const c = Math.floor(t / 10), r = t % 10; return { c, r, end: c + (r ? 1 : 0) + 1 }; };
  const target = it.kind === "read" ? it.cols * 10 + it.cells : it.kind === "frac" ? it.num : it.kind === "shade" ? it.pct : it.kind === "mean" ? 100 : 0;
  const tbLen = it.kind === "two" ? 7 : it.kind === "who" ? 3 : it.kind === "strip" ? it.lit + 1 : it.kind === "stripShade" ? it.pct / 10 + 1 : grow(target).end;
  useEffect(() => {
    if (!wrong || stage !== "ask") return;
    api.lock(true); tbRun.current = true; setTbOn(true); setTb(0); hinted.current = false;
    const steps: any[] = [[300, null]];
    /* the strip runs back once: it opens into the grid, so each strip cell is seen to be a whole column, then closes again */
    if (it.kind === "strip") steps.push([1000, () => glide(0)], [800, () => glide(1)]);
    for (let s = 1; s <= tbLen; s++) steps.push([s === tbLen ? 300 : 380, () => setTb(s)]);
    tl.run(steps, () => { tbRun.current = false; setTbOn(false); api.lock(false); });
  }, [wrong]);

  /* when a question is answered right, the tool's own one-sentence line (the last one of a phase gives way to its closing) */
  useEffect(() => { if (stage === "win" && it.win) api.say(it.win); }, [stage === "win", n, index]);

  /* what the host and the agent read back: never the given picture's count before it is answered */
  /* ... and always what the picture shows: a correction's shading while it stands, the grid in free play */
  const mine = free || won || it.pad === "enter" || it.kind === "frac";
  const picSh = tb !== null && (sk === "shade" || sk === "frac") ? pcTidy(target) : own;
  const onStrip = sk === "stripShade";
  api.share({ shaded: mine ? (onStrip ? (tb !== null ? it.pct / 10 : cellCnt) : pcCount(picSh)) : null, columns: mine && !onStrip ? pcCols(picSh) : null,
    cells: mine && !onStrip ? pcCount(picSh) - 10 * pcCols(picSh) : null, folded: fold >= 1, complete: stage === "idle" });

  /* ── drawing helpers (called, never mounted) ── */
  const colsCells = (sh: any) => {
    const c = pcCols(sh), r = pcCount(sh) - 10 * c, cl = c + " " + tx(c === 1 ? "column" : "columns");
    return !c ? [r + " " + tx(r === 1 ? "cell" : "cells"), null] : !r ? [cl, null] : [cl, "+ " + r + " " + tx(r === 1 ? "cell" : "cells")];
  };
  const counted = (c: number) => [c + " " + tx(c === 1 ? "column" : "columns"), "= " + c * 10 + " " + tx("cells")];
  const stripCtr = (c: number) => [c + " " + tx(c === 1 ? "cell" : "cells"), tx("out of 10")];
  const range = (a: number, b: number) => Array.from({ length: Math.max(0, b - a) }, (_, i) => a + i);
  /* the running correction of a tidy count t at step s: the shading so far, the amber column or cells, the counter */
  const growAt = (t: number, s: number) => {
    const g = grow(t), sh = pcTidy(Math.min(s, g.c) * 10 + (s > g.c ? g.r : 0));
    const hi = s >= 1 && s <= g.c ? { cols: [s - 1] } : s === g.c + 1 && g.r ? { cells: range(g.c * 10, t) } : {};
    return { sh, hi, done: s >= g.end };
  };
  /* the correction's counter: whole columns so far with their total ("6 columns", "= 60 cells"); once the single cells are in,
     three lines ("6 columns", "+ 3 cells", "= 63 cells") */
  const runCtr = (t: number, s: number) => {
    const g = grow(t), c = Math.min(s, g.c), cl = c + " " + tx(c === 1 ? "column" : "columns");
    return s > g.c && g.r ? [cl, "+ " + g.r + " " + tx(g.r === 1 ? "cell" : "cells"), "= " + t + " " + tx("cells")] : [cl, "= " + c * 10 + " " + tx("cells")];
  };
  /* a choice correction ends on its answer in words, on the working area */
  const sayG = (key: string, x: number, y: number, s: string) => (
    <text key={key} x={x} y={y} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={gInk} stroke={PC_PAPER} strokeWidth={6} paintOrder="stroke">{tx(s)}</text>
  );

  const gridG = (key: string, x: number, y: number, cs: number, sh: any, hi: any = {}) => (
    <g key={key}>
      {/* the plain sheet (the fallback), the chocolate over the whole grid (clipped to its square), then the cells in code: cream
          wash or deep blue, every cell with its near-black outline */}
      <rect x={x} y={y} width={cs * 10} height={cs * 10} fill={PC_CHOC} />
      {pcSkin("pcg-" + key, x, y, cs * 10, cs * 10)}
      {sh.map((v: any, i: number) => <rect key={i} x={x + Math.floor(i / 10) * cs} y={y + (i % 10) * cs} width={cs} height={cs} {...pcPaint(v)} stroke={PC_EDGE} strokeWidth={2.4} />)}
      {(hi.cols || []).map((c: number) => <rect key={"hc" + c} x={x + c * cs + 3} y={y + 3} width={cs - 6} height={cs * 10 - 6} fill="none" stroke={PC_AMBER} strokeWidth={6} />)}
      {(hi.cells || []).map((i: number) => <rect key={"hx" + i} x={x + Math.floor(i / 10) * cs + 3} y={y + (i % 10) * cs + 3} width={cs - 6} height={cs - 6} fill="none" stroke={PC_AMBER} strokeWidth={5} />)}
      <rect x={x} y={y} width={cs * 10} height={cs * 10} fill="none" stroke={PC_EDGE} strokeWidth={4.5} />
    </g>
  );
  const stripG =(fillOf: (i: number) => number, label: (i: number) => any) => (
    <g key="strip">
      {Array.from({ length: 10 }, (_, i) => {
        const x = S.x + i * cw, f = fillOf(i), l = label(i);
        return (
          <g key={i}>
            <rect x={x} y={S.y} width={cw} height={S.h} fill={PC_CHOC} />
            {pcSkin("pcs-" + i, x, S.y, cw, S.h)}
            <rect x={x} y={S.y} width={cw} height={S.h} {...pcPaint(false)} />
            {f > 0 && <rect x={x} y={S.y} width={cw} height={S.h * f} {...pcPaint(true)} />}
            <rect x={x} y={S.y} width={cw} height={S.h} fill="none" stroke={PC_EDGE} strokeWidth={3} />
            {l && <text x={x + cw / 2} y={S.y + S.h / 2 + 11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={aInk} stroke={PC_PAPER} strokeWidth={6} paintOrder="stroke">{l}</text>}
          </g>
        );
      })}
      <rect x={S.x} y={S.y} width={S.w} height={S.h} fill="none" stroke={PC_EDGE} strokeWidth={4.5} />
    </g>
  );
  const wholeG = (y: number, x0: number, x1: number) => (
    <g key="whole">
      <text x={x0} y={y} fontSize={T.prompt} fontWeight={700} fill={PC_LINE}>{tx("Whole")}</text>
      <text x={x1} y={y} textAnchor="end" fontSize={T.prompt} fontWeight={700} fill={PC_LINE}>100%</text>
    </g>
  );
  const ctrG = (x: number, y: number, w: number, lines: any, ink: string) => lines && (
    <g key="ctr">
      {/* two lines at 40; three at 32 (a 128 box), so the card titles under it keep 20 units clear in Hindi too */}
      <rect x={x} y={y} width={w} height={lines[2] ? 128 : G.ctrH} rx={16} fill={tint(C.panel, 0.45)} stroke={C.rule} strokeWidth={2.5} />
      {lines.filter(Boolean).map((l: string, j: number) => (
        <text key={j} x={x + 20} y={lines[2] ? y + 38 + 38 * j : y + 46 + 48 * j} fontSize={lines[2] ? T.label : T.prompt} fontWeight={700} fill={ink}>{l}</text>
      ))}
    </g>
  );
  const cardBox = (x: number, y: number, w: number, h: number, tone: string) => (
    <rect x={x} y={y} width={w} height={h} rx={18} fill={tone === "answer" ? tint(PC_GREEN, 0.86) : "#FFFFFF"}
      stroke={tone === "given" ? PC_BLUE : tone === "answer" ? PC_GREEN : PC_LINE} strokeWidth={tone === "given" || tone === "answer" ? 4.5 : 3} />
  );
  const inkOf = (tone: string) => (tone === "given" ? bInk : tone === "answer" ? gInk : PC_LINE);
  const fracG = (key: string, x: number, y: number, w: number, h: number, num: any, tone: string, title: any, fs = 56) => {
    const cx = x + w / 2, bar = y + h / 2 + 4, ink = inkOf(tone);
    return (
      <g key={key}>
        {title && <text x={cx} y={y - 12} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={PC_LINE}>{tx(title)}</text>}
        {cardBox(x, y, w, h, tone)}
        {num === null ? <rect x={cx - 38} y={bar - 12 - fs * 0.86} width={76} height={fs * 0.8} rx={10} fill="none" stroke={PC_LINE} strokeWidth={2.5} strokeDasharray="8 7" />
          : <text x={cx} y={bar - 14} textAnchor="middle" fontSize={fs} fontWeight={700} fill={ink}>{num}</text>}
        <line x1={cx - w * 0.3} y1={bar} x2={cx + w * 0.3} y2={bar} stroke={ink} strokeWidth={5} strokeLinecap="round" />
        <text x={cx} y={bar + 14 + fs * 0.74} textAnchor="middle" fontSize={fs} fontWeight={700} fill={ink}>100</text>
      </g>
    );
  };
  const pctG = (key: string, x: number, y: number, w: number, h: number, val: any, tone: string, title: any, fs = 64) => {
    if (val !== null && val >= 100) fs = Math.round(fs * 0.86);   /* "100%" keeps a margin inside the card */
    const cx = x + w / 2, base = y + h / 2 + fs * 0.36, ink = inkOf(tone);
    return (
      <g key={key}>
        {title && <text x={cx} y={y - 12} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={PC_LINE}>{tx(title)}</text>}
        {cardBox(x, y, w, h, tone)}
        {val === null ? (
          <g>
            <rect x={cx - fs * 0.93} y={base - fs * 0.78} width={fs * 1.05} height={fs * 0.84} rx={10} fill="none" stroke={PC_LINE} strokeWidth={2.5} strokeDasharray="8 7" />
            <text x={cx + fs * 0.12 + 8} y={base} fontSize={fs} fontWeight={700} fill={PC_LINE}>%</text>
          </g>
        ) : <text x={cx} y={base} textAnchor="middle" fontSize={fs} fontWeight={700} fill={ink}>{val + "%"}</text>}
      </g>
    );
  };
  const keyG = (id: string, label: string, x: number, y: number, w: number, off = false) => (
    <Key key={"k" + x} id={id} label={tx(label)} x={x} y={y} w={w} h={80} C={C} tone="key" disabled={off} onClick={() => pressKey(id)}>
      <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={off ? PC_LINE : toneInk("key", C.ink)}>{tx(label)}</text>
    </Key>
  );

  const els: any[] = [];
  /* phase 4's second step (tap a strip cell) always draws the strip, whatever ended the Fold act */
  const stripMode = n === 4 && !free ? fold >= 1 || (demo && (step || 0) >= 1) : free && fold >= 1;
  /* the glide: the Fold act, and the strip correction's run-back to the grid and closing again */
  const folding = ((demo || free) && fold > 0 && fold < 1) || (n === 4 && !demo && !free && fold < 1);

  if (kind === "two" || kind === "who") {
    /* two grids side by side, each with its cards under it */
    const two = kind === "two", s = tb === null ? (won ? 99 : 0) : tb, cs = PC2.cs;
    const shs = two ? [pcTidy(s >= 1 ? 5 : 0), pcTidy(Math.max(0, Math.min(5, s - 1)) * 10)] : [pcTidy(it.a[0] * 10 + it.a[1]), PC_RAVI];
    const his = two && tb !== null ? [s === 1 ? { cells: range(0, 5) } : {}, s >= 2 && s <= 6 ? { cols: [s - 2] } : {}] : [{}, {}];
    [0, 1].forEach((j) => {
      const gx = PC2.gx[j];
      els.push(<text key={"t" + j} x={gx + 5 * cs} y={PC2.lblY} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={PC_LINE}>{tx(two ? (j ? "right" : "left") : j ? "Ravi" : "Asha")}</text>);
      els.push(gridG("g" + j, gx, PC2.y, cs, shs[j], his[j]));
      const v = two ? it.nums[j] : it.b, show = two ? s >= 7 : s >= j + 1;
      if (two) {
        els.push(fracG("f" + j, gx, PC2.cardY, PC2.cardW, PC2.cardH, v, "given", null, 46));
        els.push(pctG("p" + j, gx + PC2.pctOff, PC2.cardY, PC2.cardW, PC2.cardH, show ? v : null, show ? "answer" : "blank", null, 52));
      } else if (show) {
        /* the two children: a per cent card centred under each grid, and a row of their own for the words under them */
        els.push(pctG("p" + j, gx + 5 * cs - PC2.cardW / 2, PC2.cardY - 10, PC2.cardW, 90, v, "answer", null, 52));
      }
    });
    if (!two && s >= 3) els.push(sayG("both", (PC2.gx[0] + PC2.gx[1]) / 2 + 5 * cs, 506, "both show 38%"));
  } else if (stripMode) {
    /* the strip of ten: each cell is one whole column */
    let fillOf = (i: number) => 0, label = (i: number) => null as any, ctr: any = null, fr: any = [null, "blank"], pc: any = [null, "blank"], live = false, keys: any[] = [];
    if (kind === "demo") {
      const c = warm.lit >= 0 ? 1 : 0;
      fillOf = (i) => (i === warm.lit ? 1 : 0); ctr = stripCtr(c);
      if (c) { fr = [10, "live"]; pc = [10, "live"]; }
      live = stepOn === "shade";
    } else if (kind === "strip") {
      fillOf = (i) => (i < it.lit ? 1 : 0); ctr = stripCtr(it.lit);
      const s = tb === null ? (won ? 99 : 0) : tb;
      label = (i) => (i < Math.min(s, it.lit) ? (i + 1) * 10 + "%" : null);
      if (s > it.lit) { fr = [it.lit * 10, "answer"]; pc = [it.lit * 10, "answer"]; }
    } else if (kind === "stripShade") {
      const k9 = it.pct / 10;
      if (tb !== null) {
        const s = Math.min(tb, k9);
        fillOf = (i) => (i < s ? 1 : 0); label = (i) => (i < s ? (i + 1) * 10 + "%" : null); ctr = stripCtr(s);
        if (tb > k9) { fr = [it.pct, "answer"]; pc = [it.pct, "answer"]; }
      } else {
        fillOf = (i) => (cellsShown[i] ? 1 : 0); ctr = stripCtr(cellsShown.filter(Boolean).length); live = ask;
        if (won) { fr = [it.pct, "answer"]; pc = [it.pct, "answer"]; }
      }
    } else if (kind === "free") {
      fillOf = (i) => own.slice(i * 10, i * 10 + 10).filter(Boolean).length / 10; ctr = colsCells(own);
      fr = [ownCnt, "live"]; pc = [ownCnt, "live"]; live = !busy; keys = [["newgrid", "New grid", busy]];
    }
    els.push(wholeG(S.lblY, S.x, S.x + S.w));
    els.push(stripG(fillOf, label));
    if (live && stripLive) els.push(<rect key="stripctl" {...control("strip", "strip of ten")} {...drag.bind("strip")} onKeyDown={keyAct("strip")} x={S.x} y={S.y} width={S.w} height={S.h} fill="transparent" />);
    if (demo && stepOn === "shade") els.push(<Invite key="inv" x={S.x + cw / 2} y={S.y + S.h / 2} r={50} C={C} />);
    els.push(<g key="sctr">{ctrG(S.ctrX, S.ctrY, S.ctrW, ctr, PC_LINE)}</g>);
    els.push(fracG("fr", S.fracX, S.cardY, G.cardW, G.cardH, fr[0], fr[1], "fraction"));
    els.push(pctG("pc", S.pctX, S.cardY, G.cardW, G.cardH, pc[0], pc[1], "per cent"));
    keys.forEach((k: any) => els.push(keyG(k[0], k[1], S.keyX, S.keyY, 240, k[2])));
  } else if (folding) {
    /* the glide: every column closes up into one cell of the strip, its ten cells drawn as one */
    const f = fold, sh = free ? own : it.kind === "strip" && !demo ? pcTidy(it.lit * 10) : pcTidy(0);
    /* the whole keeps its name while it changes shape */
    els.push(wholeG(G.lblY + (S.lblY - G.lblY) * f, G.x, G.x + 10 * G.cs + (S.w - 10 * G.cs) * f));
    els.push(
      <g key="fold">
        {Array.from({ length: 10 }, (_, c) => {
          const x = G.x + c * G.cs + (S.x + c * cw - G.x - c * G.cs) * f, y = G.y + (S.y - G.y) * f, w = G.cs + (cw - G.cs) * f, h = 10 * G.cs + (S.h - 10 * G.cs) * f;
          return (
            <g key={c}>
              {/* the chocolate goes with each column: a slice of the grid's one piece (as the grid drew it), the strip cell's own piece
                  fading in as the column closes up, so neither end of the glide jumps */}
              <clipPath id={"pcfold" + c}><rect x={x} y={y} width={w} height={h} /></clipPath>
              <rect x={x} y={y} width={w} height={h} fill={PC_CHOC} />
              <Skin name="piece" x={x - c * w - 10 * w * PC_BLEED} y={y - h * PC_BLEED} w={10 * w * (1 + 2 * PC_BLEED)} h={h * (1 + 2 * PC_BLEED)} fit="stretch" clip={"url(#pcfold" + c + ")"} />
              <Skin name="piece" x={x - w * PC_BLEED} y={y - h * PC_BLEED} w={w * (1 + 2 * PC_BLEED)} h={h * (1 + 2 * PC_BLEED)} fit="stretch" clip={"url(#pcfold" + c + ")"} opacity={f} />
              {Array.from({ length: 10 }, (_, r) => <rect key={r} x={x} y={y + (r * h) / 10} width={w} height={h / 10} {...pcPaint(sh[c * 10 + r])} stroke={PC_EDGE} strokeOpacity={1 - f} strokeWidth={2} />)}
              <rect x={x} y={y} width={w} height={h} fill="none" stroke={PC_AMBER} strokeWidth={4} />
            </g>
          );
        })}
      </g>
    );
  } else {
    /* the grid layout */
    let sh: any = pcTidy(0), hi: any = {}, ctr: any = null, fr: any = [null, "blank"], pc: any = [null, "blank"], keys: any[] = [], lab = "";
    if (kind === "demo") {
      if (n === 1) { const c = warm.counted; hi = c > 0 && c < 10 ? { cols: [c - 1] } : {}; ctr = c ? counted(c) : null; if (c < 10) keys = [["count", "Count"]]; }
      if (n === 2) { sh = pcTidy(warm.shaded); ctr = warm.shaded ? colsCells(sh) : null; fr = [25, "given"]; if (warm.shaded >= 25) pc = [25, "live"]; else keys = [["shade", "Shade"]]; }
      if (n === 3) { sh = warm.scattered ? PC_WARM_SCATTER : pcTidy(20); ctr = colsCells(sh); fr = [20, "live"]; pc = [20, "live"]; if (!warm.scattered) keys = [["scatter", "Scatter"]]; }
      if (n === 4) { hi = { cols: range(0, 10) }; keys = [["fold", "Fold"]]; }
    } else if (kind === "read" || kind === "mean") {
      const t = target, s = tb === null ? (won ? 99 : -1) : tb;
      if (kind === "read") sh = pcTidy(t);
      if (s >= 0) {
        const g = growAt(t, s);
        if (kind === "mean") sh = g.sh;
        hi = tb === null ? {} : g.hi;
        const c = Math.min(s, grow(t).c);
        ctr = !s ? null : kind === "mean" ? counted(c) : runCtr(t, s);
        if (g.done) { fr = [t, "answer"]; pc = [t, "answer"]; }
        if (g.done && kind === "mean") lab = "out of 100 cells";
      }
    } else if (kind === "frac" || kind === "shade") {
      const t = target;
      if (kind === "frac") fr = [it.num, "given"];
      if (tb !== null) {
        const g = growAt(t, tb);
        sh = g.sh; hi = g.hi; ctr = tb ? runCtr(t, tb) : null;
        if (g.done) { if (kind === "shade") fr = [t, "answer"]; pc = [t, "answer"]; }
      } else if (won) {
        sh = kind === "frac" ? pcTidy(t) : own; ctr = kind === "frac" ? runCtr(t, 99) : colsCells(sh);
        if (kind === "shade") fr = [t, "answer"];
        pc = [t, "answer"];
      } else { sh = ownShown; ctr = pcCount(sh) ? colsCells(sh) : null; }
      if (kind === "shade" && ask) keys = [["scatter", "Scatter", busy || !ownCnt || tbOn]];
    } else if (kind === "free") {
      sh = ownShown; ctr = colsCells(sh); fr = [pcCount(sh), "live"]; pc = [pcCount(sh), "live"];
      keys = [["scatter", "Scatter", busy || !ownCnt], ["fold", "Fold", busy]];
    }
    els.push(wholeG(G.lblY, G.x, G.x + 10 * G.cs));
    els.push(gridG("grid", G.x, G.y, G.cs, sh, hi));
    if (lab) els.push(sayG("lab", G.rx + G.rw / 2, G.keyY + 52, lab));
    if (gridLive) els.push(<rect key="gridctl" {...control("grid", "hundred grid")} {...drag.bind("grid")} onKeyDown={keyAct("grid")} x={G.x} y={G.y} width={10 * G.cs} height={10 * G.cs} fill="transparent" />);
    els.push(<g key="gctr">{ctrG(G.rx, G.ctrY, G.rw, ctr, PC_LINE)}</g>);
    els.push(fracG("fr", G.fracX, G.cardY, G.cardW, G.cardH, fr[0], fr[1], "fraction"));
    els.push(pctG("pc", G.pctX, G.cardY, G.cardW, G.cardH, pc[0], pc[1], "per cent"));
    if (keys.length === 1) els.push(keyG(keys[0][0], keys[0][1], G.rx + (G.rw - 240) / 2, G.keyY, 240, keys[0][2]));
    else keys.forEach((k: any, j: number) => els.push(keyG(k[0], k[1], G.rx + j * 190, G.keyY, 170, k[2])));
    if (demo && stepOn && keys.length === 1 && keys[0][0] === stepOn) els.push(<Invite key="inv" x={G.rx + G.rw / 2} y={G.keyY + 40} w={240 - 12} h={80 - 12} rx={RAD.key - 6} C={C} />);   /* hugs the 240 x 80 key */
  }

  return <g>{els}</g>;
}

/* the summary page's small drawing of the child's last right answer in a phase (`it` is the item, r24) */
function Thumb({ n, result, it, C, w, h, lang = "en", tx = (v: any) => v }: any) {
  const last = result && result.last;
  if (!last || last.value === null || last.value === undefined) return null;
  const item: any = it || last.it || (PHASES[(n || 1) - 1] && PHASES[(n || 1) - 1].items[last.item]) || {};
  const strip = item.kind === "strip" || item.kind === "stripShade";
  let pct = 0, text = "";
  if (item.kind === "two") { const [a, b] = slotPartsOf(last.value, 2); pct = Number(b) || 0; text = a + "% · " + b + "%"; }
  else if (item.choices) { const ch = item.choices.find((c: any) => c.id === last.value) || item.choices[0]; pct = item.kind === "who" ? 38 : 100; text = tx(ch.label); }
  else if (item.kind === "stripShade") { pct = (Number(last.value) || 0) * 10; text = pct + "%"; }
  else { pct = Number(slotPartsOf(last.value, 1)[0]) || 0; text = pct + "%"; }
  const g = Math.max(36, Math.min(h - 12, 80)), y0 = (h - g) / 2, cs = g / 10;
  const mini = (x: number, sz: number, sh: any) => sh.map((v: any, i: number) => <rect key={x + "-" + i} x={x + Math.floor(i / 10) * (sz / 10)} y={(h - sz) / 2 + (i % 10) * (sz / 10)} width={sz / 10} height={sz / 10} fill={v ? PC_DEEP : PC_CREAM} stroke={PC_EDGE} strokeWidth={0.8} />);
  /* the two children's grids, tidy and scattered, both 38%: no word to translate */
  if (item.kind === "who") {
    const sz = Math.min(g, 64);
    return (
      <g>
        <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
        {mini(10, sz, pcTidy(38))}
        {mini(18 + sz, sz, PC_RAVI)}
        <text x={w - 12} y={h / 2 + 10} textAnchor="end" fontSize={T.micro} fontWeight={700} fill={C.ink}>{"38%"}</text>
      </g>
    );
  }
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      {/* the lesson's look: cream cells, deep blue counted ones, a dark outline on every cell */}
      {strip ? Array.from({ length: 10 }, (_, i) => <rect key={i} x={10 + i * 9} y={h / 2 - 18} width={9} height={36} fill={i < pct / 10 ? PC_DEEP : PC_CREAM} stroke={PC_EDGE} strokeWidth={1.2} />)
        : Array.from({ length: 100 }, (_, i) => <rect key={i} x={10 + Math.floor(i / 10) * cs} y={y0 + (i % 10) * cs} width={cs} height={cs} fill={i < pct ? PC_DEEP : PC_CREAM} stroke={PC_EDGE} strokeWidth={0.8} />)}
      <text x={w - 12} y={h / 2 + 10} textAnchor="end" fontSize={T.micro} fontWeight={700} fill={C.ink}>{text}</text>
    </g>
  );
}

function PerCentGrid(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, fitHost: () => null,
      /* the board layout (LAYOUT.md §1b) */
      board: true,
      /* KEY ONLY (the new look; LAYOUT.md §1d, PATTERNS.md §16): no question bar, the key in its corner, the question in the bubble */
      keyOnly: true,
      /* the wide keypad: the picture is laid out once in x 0 to 900, so it fits beside the 556-wide panel */
      bigPad: true,
      /* the Next key (PATTERNS.md 9d): nothing moves on by itself */
      nextKey: true,
      /* NAV DOTS (LAYOUT.md §1d): one small clickable dot per phase */
      navDots: true,
      /* the start page: the tool's name, StartArt, START_HOOK, a Start key */
      StartArt, START_HOOK,
      }} />
  );
}

export default PerCentGrid;
