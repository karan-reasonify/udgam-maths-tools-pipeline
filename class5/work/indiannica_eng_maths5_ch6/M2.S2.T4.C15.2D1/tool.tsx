/* ═══ M2.S2.T4.C15.2D1 · decimal_to_per_cent · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ mascot, kits) is prepended at build: the header, canvas, key, bubble, mascot, phase dots,
   toolApi, scoring and events already exist. THE LESSON IS SILENT and action-driven; the new look (keyOnly + navDots,
   docs/LAYOUT.md §1d-§1e, docs/PATTERNS.md §15-§16): the question lives only in the bubble, every act is performed
   on screen (api.act). NO imports in this file; only the five host hooks.
   The route the page teaches: decimal -> hundredths -> per cent, the % sign kept. A per cent answer is a one-box `parts`
   slot with the % PRINTED (unit "%", chapter 6 decision 1); the % tile on the working area is how the warm-up teaches
   that without the sign the number would mean wholes. */

const TOOL_ID = "decimal_to_per_cent";
const MEDIA_ID = "M2.S2.T4.C15.2D1";
const TOOL_NAME = "Decimal to Per Cent";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
/* kept for the tool object's shape (and the sidecar); nothing speaks from r30 */
const VOICE = {"rate":0.92,"pitch":1.06};

/* printed on the bubble before phase 1's teach lines only (not shown: phase 1 has steps) */
const OPENING = ["A decimal, and hundred grids waiting to be filled."];
/* the whole-tool line (not shown from r44) */
const FINISH_LINE = "Every decimal became hundredths, and every answer kept its sign.";
/* printed when the child opens Free play; it promises only what the free branch of Work offers */
const FREE_LINE = "Free play: read each decimal as hundredths, keep the % sign, then tap New.";

/* THE START PAGE (docs/LAYOUT.md §1c): a decimal card, its hundred grid and a per cent card still to be written */
const START_HOOK = "How can 0.47 be written as a per cent?";
function StartArt({ box, C, lang, tx = (v: any) => v }: any) {
  const g = { x: 450, y: 14, s: 312 }, c = g.s / 10;
  let d = "";
  for (let k = 1; k < 10; k++) d += `M${g.x + k * c} ${g.y}V${g.y + g.s}M${g.x} ${g.y + k * c}h${g.s}`;
  return (
    <g>
      <rect x={70} y={92} width={300} height={156} rx={RAD.panel} fill={C.paper} stroke={C.rule} strokeWidth={3} />
      <text x={220} y={136} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{tx("Decimal")}</text>
      <text x={220} y={222} textAnchor="middle" fontSize={T.display} fontWeight={700} fill={shade(CONTENT.hundred, 0.25)}>0.47</text>
      <path d="M384 170 H428 M416 156 L432 170 L416 184" stroke={C.ink} strokeWidth={5} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {/* the same chocolate whole as the lesson's grids, shaded by the same rule */}
      <defs><clipPath id="dpc-start"><rect x={g.x} y={g.y} width={g.s} height={g.s} /></clipPath></defs>
      <rect x={g.x} y={g.y} width={g.s} height={g.s} fill={DP_CHOC} />
      <Skin name="whole" x={g.x} y={g.y} w={g.s} h={g.s} fit="stretch" clip="url(#dpc-start)" />
      <rect x={g.x + 4 * c} y={g.y + 7 * c} width={c} height={3 * c} fill={DP_WASH} fillOpacity={0.74} />
      <rect x={g.x + 5 * c} y={g.y} width={5 * c} height={g.s} fill={DP_WASH} fillOpacity={0.74} />
      <rect x={g.x} y={g.y} width={4 * c} height={g.s} fill={DP_DEEP} fillOpacity={0.95} />
      <rect x={g.x + 4 * c} y={g.y} width={c} height={7 * c} fill={DP_DEEP} fillOpacity={0.95} />
      <path d={d} stroke="#FFF3DC" strokeOpacity={0.6} strokeWidth={3.8} fill="none" />
      <path d={d} stroke={C.ink} strokeWidth={2.2} fill="none" />
      <rect x={g.x} y={g.y} width={g.s} height={g.s} fill="none" stroke={C.ink} strokeWidth={4.5} />
      <path d="M778 170 H822 M810 156 L826 170 L810 184" stroke={C.ink} strokeWidth={5} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <rect x={844} y={92} width={286} height={156} rx={RAD.panel} fill={C.paper} stroke={C.rule} strokeWidth={3} />
      <text x={987} y={136} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{tx("Per cent")}</text>
      <text x={987} y={222} textAnchor="middle" fontSize={T.display} fontWeight={700} fill={C.ink}>?%</text>
    </g>
  );
}

/* Hindi and Gujarati (docs/PATTERNS.md §11), keyed by the English byte for byte. One term per idea: per cent प्रतिशत / ટકા,
   decimal दशमलव / દશાંશ, hundredth सौवाँ भाग / સોમો ભાગ, tenth दसवाँ भाग / દસમો ભાગ, whole पूर्ण / પૂર્ણ, column स्तंभ / સ્તંભ,
   cell खाना / ખાનું, grid ग्रिड / ગ્રિડ, sign चिह्न / ચિહ્ન, tile टाइल / ટાઇલ; the child is तुम / તમે. */
const TR: any = {
  hi: {
    "Decimal to Per Cent": "दशमलव से प्रतिशत",
    "A decimal, and hundred grids waiting to be filled.": "एक दशमलव, और भरने को तैयार सौ खानों वाले ग्रिड।",
    "Every decimal became hundredths, and every answer kept its sign.": "हर दशमलव सौवें भाग बना, और हर उत्तर में चिह्न रहा।",
    "Free play: read each decimal as hundredths, keep the % sign, then tap New.": "खुला खेल: दशमलव को सौवें भागों में पढ़ो, % रखो, नया दबाओ।",
    "How can 0.47 be written as a per cent?": "0.47 को प्रतिशत में कैसे लिखें?",
    "Decimal": "दशमलव", "Hundredths": "सौवें भाग", "Per cent": "प्रतिशत", "per cent": "प्रतिशत", "wholes": "पूर्ण",
    "Read": "पढ़ो", "Split": "काटो", "Fill": "भरो", "New": "नया", "% sign": "% चिह्न", "%": "%", "0.2": "0.2", "0.02": "0.02",
    "Hundredths are per cents": "सौवें भाग प्रतिशत हैं",
    "Tap Read to shade 0.62 on the grid as hundredths.": "0.62 को सौवें भागों में रंगने के लिए पढ़ो दबाओ।",
    "Tap the Read key under the grid.": "ग्रिड के नीचे पढ़ो बटन दबाओ।",
    "Without a % sign, 62 means 62 wholes, so tap the % tile.": "% चिह्न के बिना 62 का अर्थ 62 पूर्ण है, इसलिए % टाइल दबाओ।",
    "The % tile waits at the bottom.": "% टाइल नीचे रखी है।",
    "The second digit after the point counts the single cells in the next column.": "बिंदु के बाद का दूसरा अंक अगले स्तंभ के अकेले खाने गिनता है।",
    "The count of shaded hundredths is the per cent, and the % sign is already there.": "रंगे सौवें भागों की गिनती ही प्रतिशत है, % चिह्न पहले से लगा है।",
    "A decimal is a number of hundredths, and that number is the per cent.": "दशमलव कुछ सौवें भाग है, और वही संख्या प्रतिशत है।",
    "You learned: a decimal's hundredths are its per cent.": "तुमने सीखा: दशमलव के सौवें भाग ही उसका प्रतिशत हैं।",
    "Write 0.39 as a per cent.": "0.39 को प्रतिशत में लिखो।",
    "0.39 as a per cent?": "0.39 प्रतिशत में?",
    "The 3 after the point is 3 full columns of 10 hundredths.": "बिंदु के बाद का 3 मतलब 3 पूरे स्तंभ, हर एक में 10 सौवें भाग।",
    "Yes, 0.39 is 39 hundredths, which is 39%.": "हाँ, 0.39 यानी 39 सौवें भाग, जो 39% है।",
    "Now write 0.56 as a per cent.": "अब 0.56 को प्रतिशत में लिखो।",
    "0.56 as a per cent?": "0.56 प्रतिशत में?",
    "Each shaded column holds 10 hundredths, and each single cell is 1.": "हर रंगे स्तंभ में 10 सौवें भाग हैं, और हर अकेला खाना 1 है।",
    "Yes, 0.56 is 56 hundredths, so it is 56%.": "हाँ, 0.56 यानी 56 सौवें भाग, इसलिए 56%।",
    "What per cent is 0.07?": "0.07 कितने प्रतिशत है?",
    "0.07 as a per cent?": "0.07 प्रतिशत में?",
    "The 0 holds the tenths place, so no column is full.": "0 दसवें भाग का स्थान रखता है, इसलिए कोई स्तंभ पूरा नहीं।",
    "Yes, 0.07 is 7 hundredths, which is 7%.": "हाँ, 0.07 यानी 7 सौवें भाग, जो 7% है।",
    "Tenths as per cents": "दसवें भाग प्रतिशत में",
    "Each shaded column is one tenth, so tap Split to cut each into ten.": "हर रंगा स्तंभ एक दसवाँ भाग है, इसे दस में काटने को काटो दबाओ।",
    "Tap the Split key under the grid.": "ग्रिड के नीचे काटो बटन दबाओ।",
    "50 hundredths need the % sign, so tap the % tile.": "50 सौवें भागों को % चिह्न चाहिए, इसलिए % टाइल दबाओ।",
    "The % tile is at the bottom of the board.": "% टाइल बोर्ड के नीचे है।",
    "Picture each shaded column cut into ten cells, and count them all.": "हर रंगे स्तंभ को दस खानों में कटा सोचो, और सब गिनो।",
    "Each tenth is 10 hundredths, so the number of tenths times ten is the per cent.": "हर दसवाँ भाग 10 सौवें भाग, तो प्रतिशत दसवें भागों का दस गुना।",
    "Each tenth is ten hundredths, so tenths become hundredths as ten times as many.": "हर दसवाँ भाग दस सौवें भाग है, तो सौवें भाग दस गुना हो जाते हैं।",
    "You learned: each tenth is 10 hundredths, ten times as many.": "तुमने सीखा: हर दसवाँ भाग 10 सौवें भाग है, दस गुना।",
    "What per cent is 0.9?": "0.9 कितने प्रतिशत है?",
    "0.9 as a per cent?": "0.9 प्रतिशत में?",
    "Each shaded column is a tenth, which is 10 hundredths, not 1.": "हर रंगा स्तंभ एक दसवाँ भाग है, यानी 10 सौवें भाग, 1 नहीं।",
    "Yes, 0.9 is 9 tenths, which is 90 hundredths, so 90%.": "हाँ, 0.9 यानी 9 दसवें भाग, जो 90 सौवें भाग हैं, इसलिए 90%।",
    "Now write 0.4 as a per cent.": "अब 0.4 को प्रतिशत में लिखो।",
    "0.4 as a per cent?": "0.4 प्रतिशत में?",
    "Count the shaded columns, and give each one 10 hundredths.": "रंगे स्तंभ गिनो, और हर एक को 10 सौवें भाग दो।",
    "Yes, 0.4 is 40 hundredths, so it is 40%.": "हाँ, 0.4 यानी 40 सौवें भाग, इसलिए 40%।",
    "Write 0.2 and 0.02 as per cents.": "0.2 और 0.02 को प्रतिशत में लिखो।",
    "0.2 and 0.02?": "0.2 और 0.02?",
    "In 0.2 the 2 counts tenths, but in 0.02 it counts hundredths.": "0.2 में 2 दसवें भाग गिनता है, पर 0.02 में सौवें भाग।",
    "Yes, 0.2 is 20% and 0.02 is 2%.": "हाँ, 0.2 है 20% और 0.02 है 2%।",
    "Decimals greater than one": "एक से बड़े दशमलव",
    "Tap Read to fill 1.7 as hundredths, grid after grid.": "ग्रिड दर ग्रिड 1.7 को सौवें भागों में भरने के लिए पढ़ो दबाओ।",
    "Tap the Read key under the grids.": "ग्रिडों के नीचे पढ़ो बटन दबाओ।",
    "170 hundredths is more than one whole, so tap the % tile.": "170 सौवें भाग एक पूर्ण से ज़्यादा है, इसलिए % टाइल दबाओ।",
    "The % tile waits below the grids.": "% टाइल ग्रिडों के नीचे है।",
    "Count 100 for each full grid, then count on into the part grid.": "हर पूरे ग्रिड के लिए 100 गिनो, फिर अधूरे ग्रिड में आगे गिनो।",
    "Put the hundredths of every grid together, and that number is the per cent.": "सब ग्रिडों के सौवें भाग जोड़ो, वही संख्या प्रतिशत है।",
    "Each whole is 100 hundredths, so an amount above one whole is above 100%.": "एक पूर्ण 100 सौवें भाग है, तो एक से ऊपर 100% से ऊपर है।",
    "You learned: each whole is 100 hundredths, so above one is above 100%.": "तुमने सीखा: एक पूर्ण 100 सौवें भाग है, एक से ऊपर 100% से ऊपर।",
    "What per cent is 2.08?": "2.08 कितने प्रतिशत है?",
    "2.08 as a per cent?": "2.08 प्रतिशत में?",
    "The 0 holds the tenths place, so the last grid has no full column.": "दसवें स्थान पर 0 है, तो आखिरी ग्रिड में पूरा स्तंभ नहीं।",
    "Yes, 2.08 is 208 hundredths, so it is 208%.": "हाँ, 2.08 यानी 208 सौवें भाग, इसलिए 208%।",
    "Write 1.35 as a per cent.": "1.35 को प्रतिशत में लिखो।",
    "1.35 as a per cent?": "1.35 प्रतिशत में?",
    "A full grid is 100 hundredths, not 1.": "पूरा ग्रिड 100 सौवें भाग है, 1 नहीं।",
    "Yes, 1.35 is 135 hundredths, which is 135%.": "हाँ, 1.35 यानी 135 सौवें भाग, जो 135% है।",
    "And 3.6 is what per cent?": "और 3.6 कितने प्रतिशत है?",
    "3.6 as a per cent?": "3.6 प्रतिशत में?",
    "Each shaded column of the part grid is a tenth, worth 10 hundredths.": "अधूरे ग्रिड का हर रंगा स्तंभ एक दसवाँ भाग, यानी 10 सौवें भाग है।",
    "Yes, 3.6 is 360 hundredths, so 360%.": "हाँ, 3.6 यानी 360 सौवें भाग, इसलिए 360%।",
    "Whole numbers as per cents": "पूर्ण संख्याएँ प्रतिशत में",
    "Tap Fill to fill one grid for each of the 5 wholes.": "5 पूर्णों में से हर एक के लिए एक ग्रिड भरने को भरो दबाओ।",
    "Tap the Fill key under the grids.": "ग्रिडों के नीचे भरो बटन दबाओ।",
    "Each full grid is 100%, so tap the % tile to finish.": "हर पूरा ग्रिड 100% है, पूरा करने के लिए % टाइल दबाओ।",
    "Count 100% for each full grid, one grid at a time.": "हर पूरे ग्रिड के लिए 100% गिनो, एक-एक ग्रिड करके।",
    "Multiply the number of wholes by 100, and the % sign is already there.": "पूर्णों की संख्या को 100 से गुणा करो, % चिह्न पहले से लगा है।",
    "A whole number is that many lots of 100%.": "पूर्ण संख्या उतनी ही बार 100% है।",
    "You learned: a whole number is that many lots of 100%.": "तुमने सीखा: पूर्ण संख्या उतनी ही बार 100% है।",
    "What per cent is 7?": "7 कितने प्रतिशत है?",
    "7 as a per cent?": "7 प्रतिशत में?",
    "Each whole grid is 100%, not 1%.": "हर पूरा ग्रिड 100% है, 1% नहीं।",
    "Yes, 7 wholes are 7 lots of 100%, which is 700%.": "हाँ, 7 पूर्ण यानी 7 बार 100%, जो 700% है।",
    "Write 3 as a per cent.": "3 को प्रतिशत में लिखो।",
    "3 as a per cent?": "3 प्रतिशत में?",
    "Count 100 for every whole, not for just one.": "हर पूर्ण के लिए 100 गिनो, सिर्फ़ एक के लिए नहीं।",
    "Yes, 3 is 3 lots of 100%, so it is 300%.": "हाँ, 3 यानी 3 बार 100%, इसलिए 300%।",
    "And 12 is what per cent?": "और 12 कितने प्रतिशत है?",
    "12 as a per cent?": "12 प्रतिशत में?",
    "12 wholes are 12 full grids, and each grid is 100%.": "12 पूर्ण यानी 12 पूरे ग्रिड, और हर ग्रिड 100% है।",
    "Yes, 12 wholes are 12 lots of 100%, so 1,200%.": "हाँ, 12 पूर्ण यानी 12 बार 100%, इसलिए 1,200%।",
  },
  gu: {
    "Decimal to Per Cent": "દશાંશથી ટકા",
    "A decimal, and hundred grids waiting to be filled.": "એક દશાંશ સંખ્યા, અને ભરાવા તૈયાર સો ખાનાંવાળા ગ્રિડ.",
    "Every decimal became hundredths, and every answer kept its sign.": "દરેક દશાંશ સોમા ભાગ બની, અને દરેક જવાબમાં ચિહ્ન રહ્યું.",
    "Free play: read each decimal as hundredths, keep the % sign, then tap New.": "મુક્ત રમત: દશાંશને સોમા ભાગમાં વાંચો, % રાખો, નવું દબાવો.",
    "How can 0.47 be written as a per cent?": "0.47 ને ટકામાં કેવી રીતે લખાય?",
    "Decimal": "દશાંશ", "Hundredths": "સોમા ભાગ", "Per cent": "ટકા", "per cent": "ટકા", "wholes": "પૂર્ણ",
    "Read": "વાંચો", "Split": "કાપો", "Fill": "ભરો", "New": "નવું", "% sign": "% ચિહ્ન", "%": "%", "0.2": "0.2", "0.02": "0.02",
    "Hundredths are per cents": "સોમા ભાગ ટકા છે",
    "Tap Read to shade 0.62 on the grid as hundredths.": "0.62 ને સોમા ભાગમાં રંગવા વાંચો દબાવો.",
    "Tap the Read key under the grid.": "ગ્રિડ નીચે વાંચો બટન દબાવો.",
    "Without a % sign, 62 means 62 wholes, so tap the % tile.": "% ચિહ્ન વગર 62 એટલે 62 પૂર્ણ, તેથી % ટાઇલ દબાવો.",
    "The % tile waits at the bottom.": "% ટાઇલ નીચે છે.",
    "The second digit after the point counts the single cells in the next column.": "બિંદુ પછીનો બીજો અંક આગળના સ્તંભનાં એકલાં ખાનાં ગણે છે.",
    "The count of shaded hundredths is the per cent, and the % sign is already there.": "રંગેલા સોમા ભાગની ગણતરી જ ટકા છે, % ચિહ્ન પહેલેથી છે.",
    "A decimal is a number of hundredths, and that number is the per cent.": "દશાંશ સંખ્યા અમુક સોમા ભાગ છે, અને એ જ સંખ્યા ટકા છે.",
    "You learned: a decimal's hundredths are its per cent.": "તમે શીખ્યા: દશાંશના સોમા ભાગ જ તેના ટકા છે.",
    "Write 0.39 as a per cent.": "0.39 ને ટકામાં લખો.",
    "0.39 as a per cent?": "0.39 ટકામાં?",
    "The 3 after the point is 3 full columns of 10 hundredths.": "બિંદુ પછીનો 3 એટલે 3 પૂરા સ્તંભ, દરેકમાં 10 સોમા ભાગ.",
    "Yes, 0.39 is 39 hundredths, which is 39%.": "હા, 0.39 એટલે 39 સોમા ભાગ, જે 39% છે.",
    "Now write 0.56 as a per cent.": "હવે 0.56 ને ટકામાં લખો.",
    "0.56 as a per cent?": "0.56 ટકામાં?",
    "Each shaded column holds 10 hundredths, and each single cell is 1.": "દરેક રંગેલા સ્તંભમાં 10 સોમા ભાગ છે, અને દરેક એકલું ખાનું 1 છે.",
    "Yes, 0.56 is 56 hundredths, so it is 56%.": "હા, 0.56 એટલે 56 સોમા ભાગ, તેથી 56%.",
    "What per cent is 0.07?": "0.07 કેટલા ટકા છે?",
    "0.07 as a per cent?": "0.07 ટકામાં?",
    "The 0 holds the tenths place, so no column is full.": "0 દસમા ભાગનું સ્થાન રાખે છે, તેથી કોઈ સ્તંભ પૂરો નથી.",
    "Yes, 0.07 is 7 hundredths, which is 7%.": "હા, 0.07 એટલે 7 સોમા ભાગ, જે 7% છે.",
    "Tenths as per cents": "દસમા ભાગ ટકામાં",
    "Each shaded column is one tenth, so tap Split to cut each into ten.": "દરેક રંગેલો સ્તંભ એક દસમો ભાગ છે, તેને દસમાં કાપવા કાપો દબાવો.",
    "Tap the Split key under the grid.": "ગ્રિડ નીચે કાપો બટન દબાવો.",
    "50 hundredths need the % sign, so tap the % tile.": "50 સોમા ભાગને % ચિહ્ન જોઈએ, તેથી % ટાઇલ દબાવો.",
    "The % tile is at the bottom of the board.": "% ટાઇલ બોર્ડની નીચે છે.",
    "Picture each shaded column cut into ten cells, and count them all.": "દરેક રંગેલા સ્તંભને દસ ખાનાંમાં કપાયેલો વિચારો, અને બધાં ગણો.",
    "Each tenth is 10 hundredths, so the number of tenths times ten is the per cent.": "દરેક દસમો ભાગ 10 સોમા ભાગ છે, તેથી દસમા ભાગની સંખ્યાના દસ ગણા ટકા છે.",
    "Each tenth is ten hundredths, so tenths become hundredths as ten times as many.": "દરેક દસમો ભાગ દસ સોમા ભાગ છે, તેથી સોમા ભાગ દસ ગણા થાય છે.",
    "You learned: each tenth is 10 hundredths, ten times as many.": "તમે શીખ્યા: દરેક દસમો ભાગ 10 સોમા ભાગ છે, દસ ગણા.",
    "What per cent is 0.9?": "0.9 કેટલા ટકા છે?",
    "0.9 as a per cent?": "0.9 ટકામાં?",
    "Each shaded column is a tenth, which is 10 hundredths, not 1.": "દરેક રંગેલો સ્તંભ એક દસમો ભાગ છે, એટલે 10 સોમા ભાગ, 1 નહીં.",
    "Yes, 0.9 is 9 tenths, which is 90 hundredths, so 90%.": "હા, 0.9 એટલે 9 દસમા ભાગ, જે 90 સોમા ભાગ છે, તેથી 90%.",
    "Now write 0.4 as a per cent.": "હવે 0.4 ને ટકામાં લખો.",
    "0.4 as a per cent?": "0.4 ટકામાં?",
    "Count the shaded columns, and give each one 10 hundredths.": "રંગેલા સ્તંભ ગણો, અને દરેકને 10 સોમા ભાગ આપો.",
    "Yes, 0.4 is 40 hundredths, so it is 40%.": "હા, 0.4 એટલે 40 સોમા ભાગ, તેથી 40%.",
    "Write 0.2 and 0.02 as per cents.": "0.2 અને 0.02 ને ટકામાં લખો.",
    "0.2 and 0.02?": "0.2 અને 0.02?",
    "In 0.2 the 2 counts tenths, but in 0.02 it counts hundredths.": "0.2 માં 2 દસમા ભાગ ગણે છે, પણ 0.02 માં સોમા ભાગ.",
    "Yes, 0.2 is 20% and 0.02 is 2%.": "હા, 0.2 એટલે 20% અને 0.02 એટલે 2%.",
    "Decimals greater than one": "એકથી મોટી દશાંશ સંખ્યાઓ",
    "Tap Read to fill 1.7 as hundredths, grid after grid.": "ગ્રિડ પછી ગ્રિડ 1.7 ને સોમા ભાગમાં ભરવા વાંચો દબાવો.",
    "Tap the Read key under the grids.": "ગ્રિડની નીચે વાંચો બટન દબાવો.",
    "170 hundredths is more than one whole, so tap the % tile.": "170 સોમા ભાગ એક પૂર્ણથી વધુ છે, તેથી % ટાઇલ દબાવો.",
    "The % tile waits below the grids.": "% ટાઇલ ગ્રિડની નીચે છે.",
    "Count 100 for each full grid, then count on into the part grid.": "દરેક પૂરા ગ્રિડ માટે 100 ગણો, પછી અધૂરા ગ્રિડમાં આગળ ગણો.",
    "Put the hundredths of every grid together, and that number is the per cent.": "બધા ગ્રિડના સોમા ભાગ ભેગા કરો, એ જ સંખ્યા ટકા છે.",
    "Each whole is 100 hundredths, so an amount above one whole is above 100%.": "દરેક પૂર્ણ 100 સોમા ભાગ છે, તેથી એક પૂર્ણથી વધુ એટલે 100% થી વધુ.",
    "You learned: each whole is 100 hundredths, so above one is above 100%.": "તમે શીખ્યા: એક પૂર્ણ 100 સોમા ભાગ છે, એકથી વધુ એટલે 100% થી વધુ.",
    "What per cent is 2.08?": "2.08 કેટલા ટકા છે?",
    "2.08 as a per cent?": "2.08 ટકામાં?",
    "The 0 holds the tenths place, so the last grid has no full column.": "0 દસમા ભાગનું સ્થાન રાખે છે, તેથી છેલ્લા ગ્રિડમાં કોઈ પૂરો સ્તંભ નથી.",
    "Yes, 2.08 is 208 hundredths, so it is 208%.": "હા, 2.08 એટલે 208 સોમા ભાગ, તેથી 208%.",
    "Write 1.35 as a per cent.": "1.35 ને ટકામાં લખો.",
    "1.35 as a per cent?": "1.35 ટકામાં?",
    "A full grid is 100 hundredths, not 1.": "પૂરો ગ્રિડ 100 સોમા ભાગ છે, 1 નહીં.",
    "Yes, 1.35 is 135 hundredths, which is 135%.": "હા, 1.35 એટલે 135 સોમા ભાગ, જે 135% છે.",
    "And 3.6 is what per cent?": "અને 3.6 કેટલા ટકા છે?",
    "3.6 as a per cent?": "3.6 ટકામાં?",
    "Each shaded column of the part grid is a tenth, worth 10 hundredths.": "અધૂરા ગ્રિડનો દરેક રંગેલો સ્તંભ એક દસમો ભાગ, એટલે 10 સોમા ભાગ છે.",
    "Yes, 3.6 is 360 hundredths, so 360%.": "હા, 3.6 એટલે 360 સોમા ભાગ, તેથી 360%.",
    "Whole numbers as per cents": "પૂર્ણ સંખ્યાઓ ટકામાં",
    "Tap Fill to fill one grid for each of the 5 wholes.": "5 પૂર્ણમાંથી દરેક માટે એક ગ્રિડ ભરવા ભરો દબાવો.",
    "Tap the Fill key under the grids.": "ગ્રિડની નીચે ભરો બટન દબાવો.",
    "Each full grid is 100%, so tap the % tile to finish.": "દરેક પૂરો ગ્રિડ 100% છે, પૂરું કરવા % ટાઇલ દબાવો.",
    "Count 100% for each full grid, one grid at a time.": "દરેક પૂરા ગ્રિડ માટે 100% ગણો, એક એક ગ્રિડ કરીને.",
    "Multiply the number of wholes by 100, and the % sign is already there.": "પૂર્ણની સંખ્યાને 100 વડે ગુણો, % ચિહ્ન પહેલેથી છે.",
    "A whole number is that many lots of 100%.": "પૂર્ણ સંખ્યા એટલી વાર 100% છે.",
    "You learned: a whole number is that many lots of 100%.": "તમે શીખ્યા: પૂર્ણ સંખ્યા એટલી વાર 100% છે.",
    "What per cent is 7?": "7 કેટલા ટકા છે?",
    "7 as a per cent?": "7 ટકામાં?",
    "Each whole grid is 100%, not 1%.": "દરેક પૂરો ગ્રિડ 100% છે, 1% નહીં.",
    "Yes, 7 wholes are 7 lots of 100%, which is 700%.": "હા, 7 પૂર્ણ એટલે 7 વાર 100%, જે 700% છે.",
    "Write 3 as a per cent.": "3 ને ટકામાં લખો.",
    "3 as a per cent?": "3 ટકામાં?",
    "Count 100 for every whole, not for just one.": "દરેક પૂર્ણ માટે 100 ગણો, ફક્ત એક માટે નહીં.",
    "Yes, 3 is 3 lots of 100%, so it is 300%.": "હા, 3 એટલે 3 વાર 100%, તેથી 300%.",
    "And 12 is what per cent?": "અને 12 કેટલા ટકા છે?",
    "12 as a per cent?": "12 ટકામાં?",
    "12 wholes are 12 full grids, and each grid is 100%.": "12 પૂર્ણ એટલે 12 પૂરા ગ્રિડ, અને દરેક ગ્રિડ 100% છે.",
    "Yes, 12 wholes are 12 lots of 100%, so 1,200%.": "હા, 12 પૂર્ણ એટલે 12 વાર 100%, તેથી 1,200%.",
  },
};

/* One entry per phase = one mount. Each phase opens on its WARM-UP number (the brief's Screen: 0.62, 0.5, 1.7, 5; none of them
   is a question) and two guide steps: the act that reads it as hundredths (Read, Split or Fill, performed on screen), then the %
   tile carried onto the per cent card. Every question then shows its decimal already read as hundredths on the grids; the
   Hundredths and Per cent cards stay blank until the answer. item.dec: the decimal(s) of the question (the picture). */
const PHASES = [
  {
    n: 1,
    concept: "Hundredths are per cents",
    conceptId: "M2.S2.T4.C15", objectiveIds: ["O5"],
    says: [],
    steps: [
      { say: "Tap Read to shade 0.62 on the grid as hundredths.", on: "read", hint: "Tap the Read key under the grid." },
      { say: "Without a % sign, 62 means 62 wholes, so tap the % tile.", on: "sign", hint: "The % tile waits at the bottom." },
    ],
    ladder: ["The second digit after the point counts the single cells in the next column.", "The count of shaded hundredths is the per cent, and the % sign is already there."],
    closing: "A decimal is a number of hundredths, and that number is the per cent.",
    learned: "You learned: a decimal's hundredths are its per cent.",
    traceback: "Each shaded column is counted 10 and each single cell 1, in amber, until the Hundredths and Per cent cards show the answer.",
    items: [
      /* learn DP1: answer in the plan = 39% */
      { qid: "M2.S2.T4.C15:DP1", kind: "read", dec: ["0.39"], parts: [{ label: "per cent", unit: "%" }], answer: [39], near: "3",
        say: "Write 0.39 as a per cent.", ask: "0.39 as a per cent?",
        miss: "The 3 after the point is 3 full columns of 10 hundredths.", win: "Yes, 0.39 is 39 hundredths, which is 39%." },
      /* practice 1: answer in the plan = 56%, because 0.56 is 56 hundredths */
      { qid: "M2.S2.T4.C15:1", kind: "read", dec: ["0.56"], parts: [{ label: "per cent", unit: "%" }], answer: [56], near: "11",
        say: "Now write 0.56 as a per cent.", ask: "0.56 as a per cent?",
        miss: "Each shaded column holds 10 hundredths, and each single cell is 1.", win: "Yes, 0.56 is 56 hundredths, so it is 56%." },
      /* practice 4: answer in the plan = 7%, because 0.07 is 7 hundredths */
      { qid: "M2.S2.T4.C15:4", kind: "read", dec: ["0.07"], parts: [{ label: "per cent", unit: "%" }], answer: [7], near: "70",
        say: "What per cent is 0.07?", ask: "0.07 as a per cent?",
        miss: "The 0 holds the tenths place, so no column is full.", win: "Yes, 0.07 is 7 hundredths, which is 7%." },
    ],
  },
  {
    n: 2,
    concept: "Tenths as per cents",
    conceptId: "M2.S2.T4.C16", objectiveIds: ["O5"],
    says: [],
    steps: [
      { say: "Each shaded column is one tenth, so tap Split to cut each into ten.", on: "split", hint: "Tap the Split key under the grid." },
      { say: "50 hundredths need the % sign, so tap the % tile.", on: "sign", hint: "The % tile is at the bottom of the board." },
    ],
    ladder: ["Picture each shaded column cut into ten cells, and count them all.","Each tenth is 10 hundredths, so the number of tenths times ten is the per cent."],
    closing: "Each tenth is ten hundredths, so tenths become hundredths as ten times as many.",
    learned: "You learned: each tenth is 10 hundredths, ten times as many.",
    traceback: "Each shaded tenth is split into ten cells and counted ten at a time in amber, ending on the hundredths and the per cent.",
    items: [
      /* learn DP2: answer in the plan = 90% */
      { qid: "M2.S2.T4.C16:DP2", kind: "tenths", dec: ["0.9"], parts: [{ label: "per cent", unit: "%" }], answer: [90], near: "9",
        say: "What per cent is 0.9?", ask: "0.9 as a per cent?",
        miss: "Each shaded column is a tenth, which is 10 hundredths, not 1.", win: "Yes, 0.9 is 9 tenths, which is 90 hundredths, so 90%." },
      /* practice 2: answer in the plan = 40%, because 0.4 is 4 tenths, which is 40 hundredths */
      { qid: "M2.S2.T4.C16:2", kind: "tenths", dec: ["0.4"], parts: [{ label: "per cent", unit: "%" }], answer: [40], near: "4",
        say: "Now write 0.4 as a per cent.", ask: "0.4 as a per cent?",
        miss: "Count the shaded columns, and give each one 10 hundredths.", win: "Yes, 0.4 is 40 hundredths, so it is 40%." },
      /* practice 6: answer in the plan = 0.2 is 20 hundredths, so 20%. 0.02 is 2 hundredths, so 2% */
      { qid: "M2.S2.T4.C16:6", kind: "tenths", dec: ["0.2", "0.02"], parts: [{ label: "0.2", unit: "%" }, { label: "0.02", unit: "%" }], answer: [20, 2], near: "2|2",
        say: "Write 0.2 and 0.02 as per cents.", ask: "0.2 and 0.02?",
        miss: "In 0.2 the 2 counts tenths, but in 0.02 it counts hundredths.", win: "Yes, 0.2 is 20% and 0.02 is 2%." },
    ],
  },
  {
    n: 3,
    concept: "Decimals greater than one",
    conceptId: "M2.S2.T4.C17", objectiveIds: ["O5"],
    says: [],
    steps: [
      { say: "Tap Read to fill 1.7 as hundredths, grid after grid.", on: "read", hint: "Tap the Read key under the grids." },
      { say: "170 hundredths is more than one whole, so tap the % tile.", on: "sign", hint: "The % tile waits below the grids." },
    ],
    ladder: ["Count 100 for each full grid, then count on into the part grid.", "Put the hundredths of every grid together, and that number is the per cent."],
    closing: "Each whole is 100 hundredths, so an amount above one whole is above 100%.",
    learned: "You learned: each whole is 100 hundredths, so above one is above 100%.",
    traceback: "Each full grid is counted 100 in amber, then the part grid's columns and cells, ending on the hundredths and the per cent.",
    items: [
      /* learn DP3: answer in the plan = 208% */
      { qid: "M2.S2.T4.C17:DP3", kind: "wholes", dec: ["2.08"], parts: [{ label: "per cent", unit: "%" }], answer: [208], near: "280",
        say: "What per cent is 2.08?", ask: "2.08 as a per cent?",
        miss: "The 0 holds the tenths place, so the last grid has no full column.", win: "Yes, 2.08 is 208 hundredths, so it is 208%." },
      /* practice 5: answer in the plan = 135%, because 1.35 is 135 hundredths */
      { qid: "M2.S2.T4.C17:5", kind: "wholes", dec: ["1.35"], parts: [{ label: "per cent", unit: "%" }], answer: [135], near: "36",
        say: "Write 1.35 as a per cent.", ask: "1.35 as a per cent?",
        miss: "A full grid is 100 hundredths, not 1.", win: "Yes, 1.35 is 135 hundredths, which is 135%." },
      /* practice 7: answer in the plan = 360%, because 3 wholes are 300 hundredths and 6 tenths are 60 hundredths */
      { qid: "M2.S2.T4.C17:7", kind: "wholes", dec: ["3.6"], parts: [{ label: "per cent", unit: "%" }], answer: [360], near: "306",
        say: "And 3.6 is what per cent?", ask: "3.6 as a per cent?",
        miss: "Each shaded column of the part grid is a tenth, worth 10 hundredths.", win: "Yes, 3.6 is 360 hundredths, so 360%." },
    ],
  },
  {
    n: 4,
    concept: "Whole numbers as per cents",
    conceptId: "M2.S2.T4.C18", objectiveIds: ["O6"],
    says: [],
    steps: [
      { say: "Tap Fill to fill one grid for each of the 5 wholes.", on: "fill", hint: "Tap the Fill key under the grids." },
      { say: "Each full grid is 100%, so tap the % tile to finish.", on: "sign", hint: "The % tile waits below the grids." },
    ],
    ladder: ["Count 100% for each full grid, one grid at a time.", "Multiply the number of wholes by 100, and the % sign is already there."],
    closing: "A whole number is that many lots of 100%.",
    learned: "You learned: a whole number is that many lots of 100%.",
    traceback: "Each whole grid is ringed and counted 100% in turn, ending on (wholes × 100)% and the per cent.",
    items: [
      /* learn DP4: answer in the plan = 700% */
      { qid: "M2.S2.T4.C18:DP4", kind: "whole", dec: ["7"], parts: [{ label: "per cent", unit: "%" }], answer: [700], near: "7",
        say: "What per cent is 7?", ask: "7 as a per cent?",
        miss: "Each whole grid is 100%, not 1%.", win: "Yes, 7 wholes are 7 lots of 100%, which is 700%." },
      /* practice 3: answer in the plan = 300%, because each whole is 100% */
      { qid: "M2.S2.T4.C18:3", kind: "whole", dec: ["3"], parts: [{ label: "per cent", unit: "%" }], answer: [300], near: "100",
        say: "Write 3 as a per cent.", ask: "3 as a per cent?",
        miss: "Count 100 for every whole, not for just one.", win: "Yes, 3 is 3 lots of 100%, so it is 300%." },
      /* practice 8: answer in the plan = 1200%, because 12 wholes are 12 lots of 100% */
      { qid: "M2.S2.T4.C18:8", kind: "whole", dec: ["12"], parts: [{ label: "per cent", unit: "%" }], answer: [1200], near: "12",
        say: "And 12 is what per cent?", ask: "12 as a per cent?",
        miss: "12 wholes are 12 full grids, and each grid is 100%.", win: "Yes, 12 wholes are 12 lots of 100%, so 1,200%." },
    ],
  },
];

/* the warm-up number of each phase, the free-play decimals, the act of each phase's first step, and the layout
   (laid out once for the 900-wide area with the wide keypad open, so the picture never moves when it opens) */
const DP_WARM = ["0.62", "0.5", "1.7", "5"];
const DP_FREE = ["0.45", "0.8", "1.25", "0.06", "2.5", "4"];
const DP_ACT = ["read", "split", "read", "fill"];
const DP_KEY: any = { read: "Read", split: "Split", fill: "Fill", next: "New" };
const DP_G = { gw: 550, gh: 420, cx: 580, cw: 320, key: { x: 155, y: 428, w: 240, h: 76 }, tile: { x: 420, y: 428, w: 84, h: 76 }, slot: { x: 786, y: 380, w: 84, h: 72 } };
const DP_BLUE = CONTENT.hundred, DP_GREEN = CONTENT.one, DP_AMBER = CONTENT.ten, DP_VERM = CONTENT.pointer, DP_ZERO = "#767676";
/* the grid on its chocolate skin: the chocolate (fallback), a cream wash on an uncounted cell, a deep blue on a counted one */
const DP_CHOC = "#7A4A2B", DP_WASH = "#FFF4E0", DP_DEEP = "#005A8E";
const MODEL = { warm: DP_WARM, free: DP_FREE, acts: DP_ACT, layout: DP_G };

/* the picture's route: a decimal's hundredths (the oracle below takes another) */
const dpH = (d: string) => Math.round(parseFloat(d) * 100);
const dpGrids = (h: number) => Math.max(1, Math.ceil(h / 100));
/* the grids of every group laid out in the grid region, the biggest square that fits */
function dpLayout(counts: number[]) {
  const N = counts.reduce((a, b) => a + b, 0), lab = counts.length > 1 ? 56 : 0, gap = 16;
  const RW = DP_G.gw, RH = DP_G.gh - lab;
  let best = { s: 0, c: 1, r: 1 };
  for (let c = 1; c <= N; c++) {
    const r = Math.ceil(N / c), s = Math.min((RW - (c - 1) * gap) / c, (RH - (r - 1) * gap) / r);
    if (s > best.s) best = { s, c, r };
  }
  const s = Math.floor(best.s);
  const x0 = Math.round((RW - (best.c * s + (best.c - 1) * gap)) / 2), y0 = Math.round((RH - (best.r * s + (best.r - 1) * gap)) / 2);
  const cells: any[] = [];
  let i = 0;
  counts.forEach((cnt, g) => { for (let j = 0; j < cnt; j++, i++) cells.push({ g, j, s, x: x0 + (i % best.c) * (s + gap), y: y0 + Math.floor(i / best.c) * (s + gap) }); });
  return { cells, labY: y0 + best.r * s + (best.r - 1) * gap + 44 };
}
/* the correction's counting, chunk by chunk: the place-holder zero, each full grid (100), each tenth (split first in phase 2),
   each cell; `count` is the running count of that group */
function dpChunks(decs: string[], tenths: boolean) {
  const out: any[] = [];
  decs.forEach((d, g) => {
    const h = dpH(d), full = Math.floor(h / 100), v = h % 100, cols = Math.floor(v / 10), cells = v % 10;
    if (/\.0\d/.test(d)) out.push({ g, kind: "zero", ms: 800 });
    for (let j = 0; j < full; j++) out.push({ g, kind: "grid", grid: j, count: 100 * (j + 1), ms: 440 });
    if (tenths) for (let k = 0; k < cols; k++) out.push({ g, kind: "split", grid: full, col: k, split: k + 1, ms: 220 });
    for (let k = 0; k < cols; k++) out.push({ g, kind: "col", grid: full, col: k, count: 100 * full + 10 * (k + 1), ms: 380 });
    for (let r = 0; r < cells; r++) out.push({ g, kind: "cell", grid: full, col: cols, row: r, count: 100 * full + 10 * cols + r + 1, ms: 260 });
  });
  return out;
}

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* judge: is this value right for this item? (the per cent box compares as a number) */
const judge = (item: any, v: any) => {
  if (item.parts) return judgeSlotParts(item, v);
  if (typeof item.answer === "number") return leadNumber(v) === item.answer;
  return String(v).trim().toLowerCase() === String(item.answer).trim().toLowerCase();
};
/* oracle: every answer re-derived by shifting the decimal's digits two places (no arithmetic on the decimal) */
const dpShift = (d: string) => { const [w, f = ""] = d.split("."); return Number(w + (f + "00").slice(0, 2)); };
const oracle = () => PHASES.every((p: any) => p.items.every((it: any) => it.dec.length === it.answer.length && it.dec.every((d: string, k: number) => dpShift(d) === it.answer[k])));
/* the item's own misconception (0.39 read as its tenths, 0.9 as 9 hundredths, 2.08 with the zero skipped, 7 as 7%) */
const nearMiss = (item: any) => item.near;
/* what would give the answer away. The decimal's own digits are the question (0.39 shows 39), so the bare number is
   listed only when the question does not already show it */
const answerForms = (it: any) => it.answer.flatMap((a: number) => {
  const inQ = it.dec.some((d: string) => new RegExp(`(^|[^\\d])${a}(?!\\d)`).test(d));
  return [`${a}%`, `${indian(a)}%`, `${a} hundredths`, `${indian(a)} hundredths`,`${a} per cent`, `${indian(a)} per cent`, `${a}/100`, ...(inQ ? [] : [String(a), indian(a), words(a)])];
});
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => item.answer;

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => (T.state().stage === "demo" ? HOOK.demo && HOOK.demo() : T.submit(item.answer));
const answer = (item: any, v: any) => undefined;
/* nothing waits on the working area at a question: the agent's check() presses Enter (in the demo it performs the step) */
const check = () => undefined;

/* ── the working area ────────────────────────────────────────────────────────────────────────
   Left: the hundred grids (x 0-550, y 0-420), one per whole. Right: the chain Decimal -> Hundredths -> Per cent
   (x 580-900). Bottom: the one act key (Read / Split / Fill; New in free play) and the % tile. Everything sits in
   x 0-900, so the picture is the same with the wide keypad open or shut and nothing reaches box.key. */
function Work({ phase, n, item, index, stage, wrong, typed, api, MODEL, step, stepOn, box, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();
  const mode = stage === "free" ? "free" : stage === "demo" || stage === "teach" ? "warm" : "q";
  /* a fresh picture for each warm-up, question and free play. The board is keyed by `rk` and derived in render (PATTERNS §18,
     ch 9): a state written for another board is never drawn, not even for the one frame before the reset effect runs */
  const rk = mode === "free" ? "free" : mode === "warm" ? "warm" + n : "q" + n + "-" + index;
  const fresh = { fill: 0, split: 0, sign: false, fi: 0, carry: false, rk };
  const [sRaw, setS] = useState(fresh as any);
  const s = sRaw.rk === rk ? sRaw : fresh;
  const put = (o: any) => setS((p: any) => ({ ...(p.rk === rk ? p : fresh), ...o }));
  const [trRaw, setTr] = useState(null as any);
  const tr = trRaw && trRaw.rk === rk ? trRaw : null;
  const playing = useRef(false);
  const tracing = useRef(false);
  const lastKey = useRef(0);
  /* a keyboard child who pressed Read (Split, Fill) with Enter carries on to the % tile: the key vanishes, so focus moves on */
  const viaKeys = useRef(false), wantTile = useRef(false);
  useEffect(() => {
    if (!wantTile.current) return;
    const el: any = document.querySelector('[data-zone="work"] [data-control="sign"]');
    if (el && el.getAttribute("aria-disabled") !== "true") { wantTile.current = false; el.focus(); }
  });

  /* a restart of the steps clears the warm-up */
  useEffect(() => {
    setS({ ...fresh }); setTr(null); playing.current = false;
    if (tracing.current) { tl.stop(); tracing.current = false; api.lock(false); }
  }, [rk]);
  useEffect(() => { if (mode === "warm" && step === 0) { setS({ ...fresh }); playing.current = false; } }, [step, mode]);

  const P2 = n === 2;
  const decs: string[] = mode === "free" ? [DP_FREE[s.fi % DP_FREE.length]] : mode === "warm" ? [DP_WARM[n - 1]] : (item && item.dec) || [DP_WARM[n - 1]];
  const H = decs.map(dpH);
  const L = dpLayout(H.map(dpGrids));
  const tenths = P2 && mode !== "free";
  const settled = mode === "q" && (stage === "win" || stage === "idle" || stage === "summary");
  const ended = settled || !!(tr && tr.end);
  const chunks = mode === "q" ? dpChunks(decs, tenths) : [];
  const cur = tr && tr.i >= 0 ? chunks[tr.i] : null;
  const warmDone = mode === "q" ? false : P2 && mode === "warm" ? s.split >= Math.floor(H[0] / 10) : s.fill >= H[0];
  /* the delight (phase 3): the first grid hops ONCE as the count rolls past 100; none under reduced motion */
  const [hop, setHop] = useState(false);
  const pastHundred = mode === "warm" && n === 3 && s.fill >= 100;
  useEffect(() => { if (!pastHundred || reducedMotion()) return; setHop(true); const t = setTimeout(() => setHop(false), 200); return () => clearTimeout(t); }, [pastHundred]);

  /* what each card shows */
  const shadedOf = (g: number) => (mode === "q" || (P2 && mode === "warm") ? H[g] : s.fill);
  const cutOf = (g: number) => (mode === "q" ? (ended ? 10 : tr ? tr.split[g] : 0) : P2 && mode === "warm" ? s.split : 10);
  const countOf = (g: number) => (mode === "q" ? (ended ? H[g] : tr && tr.count[g] > 0 ? tr.count[g] : null)
    : P2 && mode === "warm" ? (s.split > 0 ? s.split * 10 : null) : s.fill > 0 ? s.fill : null);
  const pcOf = (g: number) => (mode === "q" ? (ended ? H[g] : null) : warmDone ? H[0] : null);
  const signed = mode === "q" ? true : s.sign;
  const final = mode === "q" ? ended : warmDone && s.sign;
  const counting = mode === "q" ? !!(tr && !tr.end) : !warmDone && countOf(0) !== null;
  const whole = /^\d+$/.test(decs[0]);
  const caption = decs.length > 1 || pcOf(0) === null ? null : !signed ? "= " + indian(H[0]) + " " + tx("wholes") : whole && final ? "(" + decs[0] + " × 100)%" : null;

  /* the act key and the tile */
  const keyId = mode === "warm" ? (stepOn === DP_ACT[n - 1] ? stepOn : null) : mode === "free" ? (warmDone ? "next" : "read") : null;
  const tileShow = mode !== "q" && !s.sign && !s.carry;
  const tileOn = mode === "warm" || warmDone;
  const tileC = { x: DP_G.tile.x + DP_G.tile.w / 2, y: DP_G.tile.y + DP_G.tile.h / 2 };
  const slotC = { x: DP_G.slot.x + DP_G.slot.w / 2, y: DP_G.slot.y + DP_G.slot.h / 2 };
  const tileArt = () => (
    <g>
      <rect x={-40} y={-36} width={80} height={72} rx={16} fill="#FFFFFF" stroke={C.ink} strokeWidth={3} />
      <text x={0} y={16} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={C.ink}>%</text>
    </g>
  );

  /* where an act passes: column by column, then cell by cell (Read); each grid (Fill); each shaded tenth (Split) */
  const ptsFor = (on: string) => {
    const at: any[] = [], cum: number[] = [];
    const g0 = L.cells.filter((p: any) => p.g === 0);
    if (on === "fill") g0.forEach((p: any, j: number) => { at.push({ x: p.x + p.s / 2, y: p.y + p.s / 2 }); cum.push(Math.min(H[0], 100 * (j + 1))); });
    else if (on === "split") { const p = g0[0], c = p.s / 10; for (let k = 0; k < Math.floor(H[0] / 10); k++) { at.push({ x: p.x + (k + 0.5) * c, y: p.y + p.s / 2 }); cum.push(k + 1); } }
    else g0.forEach((p: any, j: number) => {
      const v = Math.min(100, H[0] - 100 * j), c = p.s / 10, full = Math.floor(v / 10);
      for (let k = 0; k < full; k++) { at.push({ x: p.x + (k + 0.5) * c, y: p.y + p.s / 2 }); cum.push(100 * j + 10 * (k + 1)); }
      for (let r = 0; r < v % 10; r++) { at.push({ x: p.x + (full + 0.5) * c, y: p.y + (r + 0.5) * c }); cum.push(100 * j + 10 * full + r + 1); }
    });
    return { at, cum };
  };
  /* every act: reported with api.did in the warm-up (a wrong one shows the step's hint), performed on screen by a real tool */
  const act = (on: string) => {
    if (mode === "warm") { if (on !== stepOn) { api.did(on); return; } }
    else if (mode !== "free") return;
    if (on === "next") { setS({ ...fresh, fi: s.fi + 1 }); return; }
    if (playing.current) return;
    if (on === "sign" && !tileOn) return;
    let o: any;
    if (on === "sign") { o = { tool: "hand", moves: "carry", from: tileC, at: [slotC], hold: tileArt() }; put({ carry: true }); }
    else {
      const P = ptsFor(on);
      o = { tool: on === "split" ? "knife" : on === "fill" ? "hand" : "pencil", moves: on === "split" ? "slice" : on === "fill" ? "tap" : "draw",
        at: P.at, onPoint: (i: number) => put(on === "split" ? { split: P.cum[i] } : { fill: P.cum[i] }) };
    }
    const m0 = mode, h0 = H[0];
    playing.current = true;
    api.act(o).then((ok: boolean) => {
      playing.current = false;
      if (!ok) { put(on === "sign" ? { carry: false } : on === "split" ? { split: 0 } : { fill: 0 }); return; }
      put(on === "sign" ? { sign: true, carry: false } : on === "split" ? { split: Math.floor(h0 / 10) } : { fill: h0 });
      if (on !== "sign" && viaKeys.current) wantTile.current = true;
      if (m0 === "warm") api.did(on);
    });
  };
  const press = (on: string) => { const t = Date.now(); if (t - lastKey.current < 400) return; lastKey.current = t; act(on); };
  api.onEnter(stage === "demo" && stepOn ? () => act(stepOn) : null);
  HOOK.demo = () => (stepOn ? act(stepOn) : undefined);

  /* the win line: the route, decimal -> hundredths -> per cent (a phase's last one is replaced by its closing) */
  useEffect(() => { if (stage === "win" && item && item.win) api.say(item.win); }, [stage, index, n]);

  /* the traceback: lock, count the decimal's hundredths chunk by chunk in amber, end on the hundredths and the per cent */
  useEffect(() => {
    if (!wrong || stage !== "ask" || !item) return;
    const ch = dpChunks(item.dec, n === 2);
    const z = item.dec.map(() => 0);
    api.lock(true); tracing.current = true;
    setTr({ i: -1, count: [...z], split: [...z], end: false, rk });
    tl.run([[300, () => {}], ...ch.map((c: any, i: number) => [c.ms, () => setTr((t: any) => {
      const count = [...t.count], split = [...t.split];
      if (c.count !== undefined) count[c.g] = c.count;
      if (c.split !== undefined) split[c.g] = c.split;
      return { ...t, i, count, split };
    })]), [300, () => setTr((t: any) => ({ ...t, i: -1, end: true }))]], () => { tracing.current = false; api.lock(false); });
  }, [wrong]);

  /* what the host and the agent read back: never the hundredths or the answer before it is given */
  api.share({ decimal: decs.join(" and "), grids: L.cells.length, hundredths: countOf(0), split: P2 && mode === "warm" ? s.split : 0,
    sign_placed: signed, answer: settled ? H.map((v) => v + "%").join(" and ") : null, complete: stage === "idle" });

  /* ── drawing helpers (called, never mounted) ── */
  const inkBlue = shade(DP_BLUE, 0.25), inkGreen = shade(DP_GREEN, 0.3), inkAmber = shade(DP_AMBER, 0.45);
  const grid = (p: any, h: number, cut: number) => {
    const S = p.s, c = S / 10, full = Math.floor(h / 10), rest = h % 10;
    const lw = Math.max(1.2, Math.min(2.4, c * 0.07)), ow = Math.max(2.5, Math.min(4.5, c * 0.12));
    let d = "";
    for (let k = 1; k < 10; k++) d += `M${p.x + k * c} ${p.y}V${p.y + S}`;
    for (let j = 0; j < 10; j++) { if (tenths && j >= cut && j < full) continue; for (let r = 1; r < 10; r++) d += `M${p.x + j * c} ${p.y + r * c}h${c}`; }
    return (
      <g key={"g" + p.g + "-" + p.j} style={{ transform: `translateY(${hop && p.j === 0 ? -14 : 0}px)`, transition: "transform 200ms ease-out" } as any}>
        <defs><clipPath id={"dpc-" + p.g + "-" + p.j}><rect x={p.x} y={p.y} width={S} height={S} /></clipPath></defs>
        {/* the whole is a square of chocolate (images.tsx), clipped to its square; the plain chocolate square is the fallback
            and fills the picture's rounded corners. Uncounted cells: a cream wash; counted: a deep blue (IMAGES §7, a dark skin) */}
        <rect x={p.x} y={p.y} width={S} height={S} fill={DP_CHOC} />
        <Skin name="whole" x={p.x} y={p.y} w={S} h={S} fit="stretch" clip={"url(#dpc-" + p.g + "-" + p.j + ")"} />
        {full < 10 && <rect x={p.x + full * c} y={p.y + rest * c} width={c} height={S - rest * c} fill={DP_WASH} fillOpacity={0.74} />}
        {full < 9 && <rect x={p.x + (full + 1) * c} y={p.y} width={(9 - full) * c} height={S} fill={DP_WASH} fillOpacity={0.74} />}
        {full > 0 && <rect x={p.x} y={p.y} width={full * c} height={S} fill={DP_DEEP} fillOpacity={0.95} />}
        {rest > 0 && <rect x={p.x + full * c} y={p.y} width={c} height={rest * c} fill={DP_DEEP} fillOpacity={0.95} />}
        {/* a light edge under the dark lines, so every box's outline reads on the chocolate and on the blue tint */}
        <path d={d} stroke="#FFF3DC" strokeOpacity={0.6} strokeWidth={lw + 1.6} fill="none" />
        <path d={d} stroke={C.ink} strokeWidth={lw} fill="none" />
        <rect x={p.x} y={p.y} width={S} height={S} fill="none" stroke={C.ink} strokeWidth={ow} />
      </g>
    );
  };
  /* a decimal written in its own digits: deep blue, the point in ink, a zero holding a place in grey; ringed in a correction */
  const decText = (d: string, cx: number, y: number, size: number, ring: boolean) => {
    const adv = (ch: string) => (ch === "." ? 0.34 : 0.66) * size;
    const wAll = [...d].reduce((a, ch) => a + adv(ch), 0);
    let x = cx - wAll / 2;
    const zi = d.search(/\.0\d/) >= 0 ? d.indexOf(".") + 1 : -1;
    return [...d].map((ch, i) => {
      const xc = x + adv(ch) / 2; x += adv(ch);
      return (
        <g key={"d" + i}>
          {ring && i === zi && <ellipse cx={xc} cy={y - size * 0.36} rx={size * 0.42} ry={size * 0.56} fill="none" stroke={DP_AMBER} strokeWidth={5} />}
          <text x={xc} y={y} textAnchor="middle" fontSize={size} fontWeight={700} fill={i === zi ? DP_ZERO : ch === "." || (i === 0 && ch === "0" && d[1] === ".") ? C.ink : inkBlue}>{ch}</text>
        </g>
      );
    });
  };
  const card = (y: number, h: number, title: string) => (
    <g>
      <rect x={DP_G.cx} y={y} width={DP_G.cw} height={h} rx={RAD.panel} fill={C.paper} stroke={C.rule} strokeWidth={3} />
      <text x={DP_G.cx + 20} y={y + 40} fontSize={T.label} fontWeight={700} fill={C.ink}>{tx(title)}</text>
    </g>
  );
  const arrow = (y: number) => <path d={`M${DP_G.cx + 160} ${y} V${y + 20} M${DP_G.cx + 150} ${y + 10} L${DP_G.cx + 160} ${y + 21} L${DP_G.cx + 170} ${y + 10}`} stroke={C.ink} strokeWidth={4} fill="none" strokeLinecap="round" strokeLinejoin="round" />;
  const frac = (num: any, cx: number, size: number) => (
    <g>
      <text x={cx} y={240} textAnchor="middle" fontSize={size} fontWeight={700} fill={num === null ? C.ink : counting ? inkAmber : final ? inkGreen : inkBlue}>{num === null ? "?" : String(num)}</text>
      <path d={`M${cx - 58} 251 H${cx + 58}`} stroke={C.ink} strokeWidth={4} strokeLinecap="round" />
      <text x={cx} y={292} textAnchor="middle" fontSize={size} fontWeight={700} fill={inkBlue}>100</text>
    </g>
  );
  const two = decs.length > 1;
  const halves = two ? [DP_G.cx + 80, DP_G.cx + 240] : [DP_G.cx + 160];
  const hi = cur ? (() => {
    const p = L.cells.find((q: any) => q.g === cur.g && q.j === cur.grid); if (!p) return null; const c = p.s / 10;
    if (cur.kind === "grid") return { x: p.x, y: p.y, w: p.s, h: p.s };
    if (cur.kind === "col" || cur.kind === "split") return { x: p.x + cur.col * c, y: p.y, w: c, h: p.s };
    if (cur.kind === "cell") return { x: p.x + cur.col * c, y: p.y + cur.row * c, w: c, h: c };
    return null;
  })() : null;
  /* full grids that have been counted wear a 100 chip (100% with whole numbers) */
  const chips = L.cells.filter((p: any) => {
    const v = countOf(p.g);
    return shadedOf(p.g) >= 100 * (p.j + 1) && v !== null && v >= 100 * (p.j + 1);
  });
  const k = keyId ? { ...DP_G.key, id: keyId } : null;

  return (
    <g>
      {/* the hundred grids */}
      {L.cells.map((p: any) => grid(p, Math.max(0, Math.min(100, shadedOf(p.g) - 100 * p.j)), cutOf(p.g)))}
      {two && decs.map((d, g) => { const p = L.cells.find((q: any) => q.g === g); return <g key={"lab" + g}>{decText(d, p.x + p.s / 2, L.labY, T.prompt, false)}</g>; })}
      {chips.map((p: any) => { const t = whole || mode === "q" && n === 4 ? "100%" : "100", w = t.length > 3 ? 112 : 92;
        return <g key={"chip" + p.g + "-" + p.j} pointerEvents="none">
          <rect x={p.x + p.s / 2 - w / 2} y={p.y + p.s / 2 - 26} width={w} height={52} rx={14} fill={C.paper} stroke={DP_AMBER} strokeWidth={3} />
          <text x={p.x + p.s / 2} y={p.y + p.s / 2 + 11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{t}</text>
        </g>; })}

      {/* the chain: Decimal -> Hundredths -> Per cent */}
      {card(0, 124, "Decimal")}
      {two ? decs.map((d, g) => <g key={"dc" + g}>{decText(d, halves[g], 108, T.xl, !!cur && cur.kind === "zero" && cur.g === g)}</g>)
        : decText(decs[0], DP_G.cx + 160, 112, T.display, !!cur && cur.kind === "zero")}
      {arrow(126)}
      {card(148, 156, "Hundredths")}
      {decs.map((d, g) => <g key={"fr" + g}>{frac(countOf(g), halves[g], two ? 40 : 44)}</g>)}
      {arrow(306)}
      {card(328, 188, "Per cent")}
      {two ? decs.map((d, g) => { const v = pcOf(g);
          return <text key={"pc" + g} x={halves[g]} y={448} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={v === null ? C.ink : inkGreen}>{(v === null ? "?" : indian(v)) + "%"}</text>; })
        : <g>
            {(pcOf(0) !== null || mode === "q") && <text x={DP_G.cx + 196} y={440} textAnchor="end" fontSize={indian(H[0]).length > 3 ? T.xl : T.display} fontWeight={700}
              fill={pcOf(0) === null ? C.ink : final ? inkGreen : C.ink}>{pcOf(0) === null ? "?" : indian(pcOf(0))}</text>}
            {signed ? <g transform={`translate(${slotC.x},${slotC.y})`}>{tileArt()}</g>
              : <rect x={DP_G.slot.x + 2} y={DP_G.slot.y + 2} width={DP_G.slot.w - 4} height={DP_G.slot.h - 4} rx={16} fill="none" stroke={C.ink} strokeWidth={3} strokeDasharray="10 8" />}
            {caption && <text x={DP_G.cx + 160} y={493} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={signed ? shade(DP_VERM, 0.3) : C.ink}>{caption}</text>}
          </g>}

      {/* the one act key (its label follows the act) and the % tile in its tray */}
      {k && <g onKeyDownCapture={(e: any) => { if (e.key === "Enter" || e.key === " ") viaKeys.current = true; }} onPointerDownCapture={() => { viaKeys.current = false; }}>
        <Key key="actkey" id={k.id} label={tx(DP_KEY[k.id])} x={k.x} y={k.y} w={k.w} h={k.h} C={C} tone="key" onClick={() => press(k.id)}>
          <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={toneInk("key", C.ink)}>{tx(DP_KEY[k.id])}</text>
        </Key>
        {mode === "warm" && <Invite x={k.x + k.w / 2} y={k.y + k.h / 2} w={k.w} h={k.h} C={C} />}
      </g>}
      {tileShow && <g>
        <Key key="tile" id="sign" label={tx("% sign")} x={DP_G.tile.x} y={DP_G.tile.y} w={DP_G.tile.w} h={DP_G.tile.h} C={C} tone="key" disabled={!tileOn} onClick={() => press("sign")}>
          {/* a tile still waiting (before the number is read) shows a half-strength dark %, never cream on cream */}
          <text y={16} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={tileOn ? toneInk("key", C.ink) : "#77736C"}>%</text>
        </Key>
        {mode === "warm" && stepOn === "sign" && <Invite x={tileC.x} y={tileC.y} w={DP_G.tile.w} h={DP_G.tile.h} C={C} />}
      </g>}

      {/* the correction's highlight, over the picture and never in the way of a tap */}
      {hi && <g pointerEvents="none">
        <rect x={hi.x} y={hi.y} width={hi.w} height={hi.h} fill={DP_AMBER} fillOpacity={cur.kind === "grid" ? 0.25 : 0.55} stroke={DP_AMBER} strokeWidth={5} />
      </g>}
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase: the decimal and its per cent */
function Thumb({ n, result, it, C, w, h }: any) {
  const item = it || (result && result.last && PHASES[n - 1] && PHASES[n - 1].items[result.last.item]);
  if (!item || !result || !result.last || !item.dec) return null;
  const v = slotPartsOf(result.last.value, item.dec.length);
  const rows = item.dec.map((d: string, k: number) => d + " = " + (v[k] ? indian(Number(v[k])) : "?") + "%");
  const fs = rows.length > 1 ? 28 : 32, gap = fs + 4, y0 = h / 2 - ((rows.length - 1) * gap) / 2 + fs * 0.36;
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      {rows.map((r: string, k: number) => <text key={k} x={w / 2} y={y0 + k * gap} textAnchor="middle" fontSize={fs} fontWeight={700} fill={shade(CONTENT.one, 0.3)}>{r}</text>)}
    </g>
  );
}

function DecimalToPerCent(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, fitHost: () => null,
      board: true,
      keyOnly: true,
      bigPad: true,
      nextKey: true,
      navDots: true,
      StartArt, START_HOOK,
      }} />
  );
}

export default DecimalToPerCent;
