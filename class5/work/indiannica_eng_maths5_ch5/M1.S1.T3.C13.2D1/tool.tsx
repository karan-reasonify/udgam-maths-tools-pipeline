/* ═══ M1.S1.T3.C13.2D1 · hundred_grid · tool-specific part (runtime r55: silent, the new look) ═══════════════
   The runtime is prepended at build (header, key corner, bubble, Kiko, nav dots, keypad drawer, toolApi, sounds,
   scoring, the start page, the action kit). This file draws ONLY the working area (64,108, 1472 x 520 with the keypad
   shut, 900 wide with it open: bigPad) and lays the picture out for the OPEN keypad, so nothing moves when it opens.
   NO imports; only the five host hooks. docs/LAYOUT.md §1d-§3, docs/PATTERNS.md §9b, §9e, §15-§16.
   A hundred grid is a square of paper cut in 10 x 10 unit squares: square q = column * 10 + row, so a full column is
   q = 10c .. 10c + 9 and "full columns first" reads straight off the numbering. */

const TOOL_ID = "hundred_grid";
const MEDIA_ID = "M1.S1.T3.C13.2D1";
const TOOL_NAME = "Hundred Grid Shader";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
/* kept for the tool object's shape (and the sidecar); nothing speaks from r30 */
const VOICE = {"rate":0.92,"pitch":1.06};

const OPENING = ["A hundred small squares, all the same size."];
const FINISH_LINE = "Tenths into hundredths, and hundredths into thousandths.";
const FREE_LINE = "Free play. Shade, scatter and zoom as you like.";
const START_HOOK = "What part of the whole is one small square?";

/* Hindi and Gujarati (docs/PATTERNS.md §11), keyed by the English byte for byte. Terms, one per idea: tenth दशांश / દશાંશ,
   hundredth शतांश / શતાંશ, thousandth सहस्रांश / સહસ્રાંશ, decimal (number) दशमलव संख्या / દશાંશ સંખ્યા, fraction भिन्न / અપૂર્ણાંક,
   the point दशमलव बिंदु / દશાંશ ચિહ્ન, column स्तंभ / સ્તંભ, square वर्ग / ચોરસ, slice पट्टी / પટ્ટી, whole पूर्ण / પૂર્ણ;
   the child is तुम / તમે; the names Asha and Bina are written आशा, बीना / આશા, બીના. */
const TR: any = {
  hi: {
    "Hundred Grid Shader": "सौ वर्गों का ग्रिड",
    "A hundred small squares, all the same size.": "सौ छोटे वर्ग, सब एक जैसे नाप के।",
    "Tenths into hundredths, and hundredths into thousandths.": "दशांश से शतांश, और शतांश से सहस्रांश।",
    "Free play. Shade, scatter and zoom as you like.": "खुला खेल। जैसे चाहो रंगो, बिखेरो और ज़ूम करो।",
    "What part of the whole is one small square?": "एक छोटा वर्ग पूरे का कौन-सा भाग है?",
    /* phase 1 */
    "One hundredth": "एक शतांश",
    "A column of the grid is one of its tenths.": "ग्रिड का एक स्तंभ उसका एक दशांश है।",
    "One column is one tenth, so tap Cut to cut it out of the grid.": "एक स्तंभ एक दशांश है, उसे ग्रिड से काटने के लिए काटो पर टैप करो।",
    "Tap the Cut key.": "काटो बटन पर टैप करो।",
    "Look at the cut column and the grid again.": "कटे स्तंभ और ग्रिड को फिर से देखो।",
    "Every small square of the grid is the same size.": "ग्रिड का हर छोटा वर्ग एक जैसे नाप का है।",
    "So 10 hundredths make 1 tenth.": "तो 10 शतांश मिलकर 1 दशांश बनाते हैं।",
    "You learned: a tenth cuts into 10 hundredths": "तुमने सीखा: एक दशांश 10 शतांश में कटता है",
    "Each square is one hundredth, so how many hundredths make the cut column?": "हर वर्ग एक शतांश है, तो कटे स्तंभ में कितने शतांश हैं?",
    "Hundredths in the column?": "स्तंभ में कितने शतांश?",
    "Count the squares in the cut column.": "कटे स्तंभ के वर्ग गिनो।",
    "Touch each square of the column as you count it.": "गिनते समय स्तंभ के हर वर्ग को छुओ।",
    "The column is as tall as the grid, one square for each row.": "स्तंभ ग्रिड जितना ऊँचा है, हर पंक्ति का एक वर्ग।",
    "Shade as many hundredths as make one tenth, then press Enter.": "जितने शतांश से एक दशांश बनता है उतने रंगो, फिर दर्ज करें दबाओ।",
    "Shade one tenth": "एक दशांश रंगो",
    "Count the squares you shaded.": "अपने रंगे हुए वर्ग गिनो।",
    "One tenth is one whole column of the grid.": "एक दशांश ग्रिड का एक पूरा स्तंभ है।",
    "Shade every square of one column, top to bottom.": "एक स्तंभ के सभी वर्ग ऊपर से नीचे तक रंगो।",
    "3 squares of the grid are shaded, so what decimal is that?": "ग्रिड के 3 वर्ग रंगे हैं, तो यह कौन-सी दशमलव संख्या है?",
    "3 squares as a decimal?": "3 वर्ग दशमलव संख्या में?",
    "Three single squares are far fewer than a tenth.": "तीन अकेले वर्ग एक दशांश से बहुत कम हैं।",
    "It takes a hundred squares to fill the grid.": "ग्रिड भरने के लिए सौ वर्ग लगते हैं।",
    "Hundredths take two places after the point.": "शतांश दशमलव बिंदु के बाद दो स्थान लेते हैं।",
    "Yes, ten hundredths fill the cut column.": "हाँ, दस शतांश कटे स्तंभ को भरते हैं।",
    "Yes, those ten squares are one tenth of the grid.": "हाँ, वे दस वर्ग ग्रिड का एक दशांश हैं।",
    /* phase 2 */
    "Reading a hundred grid": "सौ वर्गों का ग्रिड पढ़ना",
    "A grid is read by its full columns and its single squares.": "ग्रिड को पूरे स्तंभों और अकेले वर्गों से पढ़ते हैं।",
    "Tap Count columns to count the full columns first.": "पहले पूरे स्तंभ गिनने के लिए स्तंभ गिनो पर टैप करो।",
    "Tap the Count columns key.": "स्तंभ गिनो बटन पर टैप करो।",
    "Now tap Count squares for the single squares left over.": "अब बचे हुए अकेले वर्गों के लिए वर्ग गिनो पर टैप करो।",
    "Tap the Count squares key.": "वर्ग गिनो बटन पर टैप करो।",
    "Look for the columns that are full to the bottom.": "वे स्तंभ खोजो जो नीचे तक भरे हैं।",
    "Every square of the grid is one hundredth.": "ग्रिड का हर वर्ग एक शतांश है।",
    "Read full columns first, then single squares, over 100.": "पहले पूरे स्तंभ पढ़ो, फिर अकेले वर्ग, 100 में से।",
    "You learned: read full columns, then single squares, over 100": "तुमने सीखा: पहले पूरे स्तंभ, फिर अकेले वर्ग, 100 में से",
    "What decimal does the shaded part of this grid show?": "इस ग्रिड का रंगा भाग कौन-सी दशमलव संख्या दिखाता है?",
    "Shaded part as a decimal?": "रंगा भाग दशमलव संख्या में?",
    "A full column is ten hundredths, not one whole.": "एक पूरा स्तंभ दस शतांश है, एक पूर्ण नहीं।",
    "Count the full columns in tens, then add the single squares.": "पूरे स्तंभ दस-दस करके गिनो, फिर अकेले वर्ग जोड़ो।",
    "Write the hundredths you counted with two places after the point.": "गिने हुए शतांश दशमलव बिंदु के बाद दो स्थानों में लिखो।",
    "Now write this new shading as a decimal.": "अब इस नए रंगे भाग को दशमलव संख्या में लिखो।",
    "This one as a decimal?": "यह दशमलव संख्या में?",
    "Each column holds ten squares, so it is not one hundredth.": "हर स्तंभ में दस वर्ग हैं, इसलिए वह एक शतांश नहीं है।",
    "Skip-count the full columns: 10, 20, and on.": "पूरे स्तंभ दस-दस करके गिनो: 10, 20 और आगे।",
    "Each full column is one tenth, the first place after the point.": "हर पूरा स्तंभ एक दशांश है, दशमलव बिंदु के बाद पहला स्थान।",
    "Which fraction of the whole grid is shaded?": "पूरे ग्रिड का कौन-सा भिन्न रंगा है?",
    "Shaded part as a fraction?": "रंगा भाग भिन्न में?",
    "The bottom number counts every square of the grid.": "नीचे की संख्या ग्रिड के सभी वर्ग गिनती है।",
    "The top number counts every shaded square.": "ऊपर की संख्या सभी रंगे वर्ग गिनती है।",
    "Two full columns are 20 squares, so add the single squares to 20.": "दो पूरे स्तंभ 20 वर्ग हैं, अब अकेले वर्ग 20 में जोड़ो।",
    "Yes, 53 hundredths is written 0.53.": "हाँ, 53 शतांश को 0.53 लिखते हैं।",
    "Yes, six full columns make 0.6.": "हाँ, छह पूरे स्तंभ 0.6 बनाते हैं।",
    /* phase 3 */
    "Shading hundredths": "शतांश रंगना",
    "Which squares are shaded may change while their number stays.": "कौन-से वर्ग रंगे हैं यह बदल सकता है, गिनती वही रहती है।",
    "Shade one more square so the grid shows 0.06.": "एक और वर्ग रंगो ताकि ग्रिड 0.06 दिखाए।",
    "Tap a white square of the grid.": "ग्रिड के किसी सफ़ेद वर्ग पर टैप करो।",
    "Now tap Scatter and watch the Decimal card.": "अब बिखेरो पर टैप करो और दशमलव कार्ड देखो।",
    "Tap the Scatter key.": "बिखेरो बटन पर टैप करो।",
    "Look at how many squares are shaded, not where.": "देखो कितने वर्ग रंगे हैं, यह नहीं कि कहाँ।",
    "Each square you shade is one hundredth.": "तुम्हारा रंगा हर वर्ग एक शतांश है।",
    "Any squares of the right count show the same hundredths.": "सही गिनती के कोई भी वर्ग वही शतांश दिखाते हैं।",
    "You learned: any squares of the right count show hundredths": "तुमने सीखा: सही गिनती के कोई भी वर्ग शतांश दिखाते हैं",
    "Shade squares on the grid to show 0.04, then press Enter.": "ग्रिड पर 0.04 दिखाने के लिए वर्ग रंगो, फिर दर्ज करें दबाओ।",
    "Shade 0.04": "0.04 रंगो",
    "Count the squares you shaded, each one a hundredth.": "रंगे हुए वर्ग गिनो, हर एक एक शतांश है।",
    "A full column is 0.1, far more than 0.04.": "एक पूरा स्तंभ 0.1 है, 0.04 से बहुत ज़्यादा।",
    "The two digits after the point count the hundredths.": "दशमलव बिंदु के बाद के दो अंक शतांश गिनते हैं।",
    "Now show 0.21 on the grid the same way.": "अब इसी तरह ग्रिड पर 0.21 दिखाओ।",
    "Shade 0.21": "0.21 रंगो",
    "Compare your squares with the digits after the point.": "अपने वर्गों को दशमलव बिंदु के बाद के अंकों से मिलाओ।",
    "Each full column is one tenth, which is 0.1.": "हर पूरा स्तंभ एक दशांश है, यानी 0.1 है।",
    "Shade full columns for the tenths, then single squares.": "दशांश के लिए पूरे स्तंभ रंगो, फिर अकेले वर्ग।",
    "Asha shades a column and 4 squares, Bina 14 scattered squares: who shows 0.14?": "आशा एक स्तंभ और 4 वर्ग रंगती है, बीना 14 बिखरे वर्ग: 0.14 कौन दिखाती है?",
    "Who shows 0.14?": "0.14 कौन दिखाती है?",
    "Count the shaded squares on each grid.": "हर ग्रिड के रंगे वर्ग गिनो।",
    "Count Asha's full column as ten, then add her single squares.": "आशा का पूरा स्तंभ दस गिनो, फिर उसके अकेले वर्ग जोड़ो।",
    "Compare how many squares are shaded on the two grids.": "दोनों ग्रिड पर रंगे वर्गों की गिनती की तुलना करो।",
    "Yes, your 4 squares are 4 hundredths.": "हाँ, तुम्हारे 4 वर्ग 4 शतांश हैं।",
    "Yes, 21 hundredths, wherever the squares sit.": "हाँ, 21 शतांश, वर्ग कहीं भी हों।",
    "Asha": "आशा", "Bina": "बीना", "Both": "दोनों", "None": "कोई नहीं",
    "Both show 0.14": "दोनों 0.14 दिखाती हैं",
    "You chose": "तुमने चुना",
    "Shade some squares first.": "पहले कुछ वर्ग रंगो।",
    "Asha shows 0.14": "आशा 0.14 दिखाती है", "Bina shows 0.14": "बीना 0.14 दिखाती है",
    /* phase 4 */
    "Thousandths": "सहस्रांश",
    "Each thin slice of a square is one thousandth.": "वर्ग की हर पतली पट्टी एक सहस्रांश है।",
    "Tap Zoom to look closely at the outlined square.": "घेरे हुए वर्ग को पास से देखने के लिए ज़ूम पर टैप करो।",
    "Tap the Zoom key.": "ज़ूम बटन पर टैप करो।",
    "Now tap Cut to cut that square into thousandths.": "अब उस वर्ग को सहस्रांश में काटने के लिए काटो पर टैप करो।",
    "Tap the Cut key to cut the big square.": "बड़ा वर्ग काटने के लिए काटो बटन पर टैप करो।",
    "Tap one thin slice to shade it.": "एक पतली पट्टी को रंगने के लिए उस पर टैप करो।",
    "Tap a slice of the big square.": "बड़े वर्ग की किसी पट्टी पर टैप करो।",
    "Look closely at the big square and its slices.": "बड़े वर्ग और उसकी पट्टियों को ध्यान से देखो।",
    "Every slice of the big square is the same size.": "बड़े वर्ग की हर पट्टी एक जैसे नाप की है।",
    "So 10 thousandths make 1 hundredth.": "तो 10 सहस्रांश मिलकर 1 शतांश बनाते हैं।",
    "You learned: a hundredth cuts into 10 thousandths": "तुमने सीखा: एक शतांश 10 सहस्रांश में कटता है",
    "How many thousandths make one hundredth?": "कितने सहस्रांश मिलकर एक शतांश बनाते हैं?",
    "Thousandths in a hundredth?": "एक शतांश में कितने सहस्रांश?",
    "Count the thin slices of the big square.": "बड़े वर्ग की पतली पट्टियाँ गिनो।",
    "Touch each slice from left to right as you count.": "गिनते समय बाएँ से दाएँ हर पट्टी को छुओ।",
    "The big square is one hundredth, and each slice is one thousandth.": "बड़ा वर्ग एक शतांश है और हर पट्टी एक सहस्रांश है।",
    "3 of the 10 slices of this hundredth are shaded: what decimal is that?": "इस शतांश की 10 में से 3 पट्टियाँ रंगी हैं: यह कौन-सी दशमलव संख्या है?",
    "These slices are thousandths, not hundredths.": "ये पट्टियाँ सहस्रांश हैं, शतांश नहीं।",
    "Thousandths need three places after the point.": "सहस्रांश को दशमलव बिंदु के बाद तीन स्थान चाहिए।",
    "Zeros hold the tenths and hundredths places when they are empty.": "खाली दशांश और शतांश के स्थानों पर शून्य लिखा जाता है।",
    "Write 41 thousandths as a fraction.": "41 सहस्रांश को भिन्न में लिखो।",
    "41 thousandths as a fraction?": "41 सहस्रांश भिन्न में?",
    "The bottom number says how many parts make one whole.": "नीचे की संख्या बताती है कि कितने भाग मिलकर एक पूर्ण बनाते हैं।",
    "Each thin slice is one thousandth of the whole grid.": "हर पतली पट्टी पूरे ग्रिड का एक सहस्रांश है।",
    "Ten slices make a square, and the grid has 100 squares.": "दस पट्टियों से एक वर्ग बनता है और ग्रिड में 100 वर्ग हैं।",
    "Yes, the big square holds 10 thousandths.": "हाँ, बड़े वर्ग में 10 सहस्रांश हैं।",
    "Yes, 3 thousandths is written 0.003.": "हाँ, 3 सहस्रांश को 0.003 लिखते हैं।",
    /* drawn in the working area (tx) */
    "Whole": "पूर्ण", "1 tenth": "1 दशांश", "1 hundredth": "1 शतांश", "1 thousandth": "1 सहस्रांश",
    "Fraction": "भिन्न", "Decimal": "दशमलव",
    "hundredth": "शतांश", "hundredths": "शतांश", "thousandth": "सहस्रांश", "thousandths": "सहस्रांश",
    "square": "वर्ग", "squares": "वर्ग", "column": "स्तंभ", "columns": "स्तंभ",
    "Cut": "काटो", "Count columns": "स्तंभ गिनो", "Count squares": "वर्ग गिनो", "Scatter": "बिखेरो", "Zoom": "ज़ूम",
    "100 × 10 = 1,000": "100 × 10 = 1,000",
    /* aria labels */
    "Hundred grid: tap or drag to shade squares": "सौ वर्गों का ग्रिड: वर्ग रंगने के लिए टैप करो या खींचो",
    "Big square: tap a thin slice to shade it": "बड़ा वर्ग: पट्टी रंगने के लिए उस पर टैप करो",
    "Decimal card: tap to answer": "दशमलव कार्ड: उत्तर देने के लिए टैप करो",
    "Fraction card: tap to answer": "भिन्न कार्ड: उत्तर देने के लिए टैप करो",
    "Whole part": "पूर्ण भाग", "Decimal part": "दशमलव भाग", "Top number": "ऊपर की संख्या", "Bottom number": "नीचे की संख्या",
  },
  gu: {
    "Hundred Grid Shader": "સો ચોરસની ગ્રિડ",
    "A hundred small squares, all the same size.": "સો નાના ચોરસ, બધા સરખા માપના.",
    "Tenths into hundredths, and hundredths into thousandths.": "દશાંશથી શતાંશ, અને શતાંશથી સહસ્રાંશ.",
    "Free play. Shade, scatter and zoom as you like.": "મુક્ત રમત. ગમે તેમ રંગો, વિખેરો અને ઝૂમ કરો.",
    "What part of the whole is one small square?": "એક નાનો ચોરસ આખાનો કયો ભાગ છે?",
    /* phase 1 */
    "One hundredth": "એક શતાંશ",
    "A column of the grid is one of its tenths.": "ગ્રિડનો એક સ્તંભ તેનો એક દશાંશ છે.",
    "One column is one tenth, so tap Cut to cut it out of the grid.": "એક સ્તંભ એક દશાંશ છે, તેને ગ્રિડમાંથી કાપવા કાપો પર ટેપ કરો.",
    "Tap the Cut key.": "કાપો બટન પર ટેપ કરો.",
    "Look at the cut column and the grid again.": "કાપેલા સ્તંભ અને ગ્રિડને ફરી જુઓ.",
    "Every small square of the grid is the same size.": "ગ્રિડનો દરેક નાનો ચોરસ સરખા માપનો છે.",
    "So 10 hundredths make 1 tenth.": "તો 10 શતાંશ મળીને 1 દશાંશ બને છે.",
    "You learned: a tenth cuts into 10 hundredths": "તમે શીખ્યા: એક દશાંશના 10 શતાંશ બને છે",
    "Each square is one hundredth, so how many hundredths make the cut column?": "દરેક ચોરસ એક શતાંશ છે, તો કાપેલા સ્તંભમાં કેટલા શતાંશ છે?",
    "Hundredths in the column?": "સ્તંભમાં કેટલા શતાંશ?",
    "Count the squares in the cut column.": "કાપેલા સ્તંભના ચોરસ ગણો.",
    "Touch each square of the column as you count it.": "ગણતી વખતે સ્તંભના દરેક ચોરસને અડો.",
    "The column is as tall as the grid, one square for each row.": "સ્તંભ ગ્રિડ જેટલો ઊંચો છે, દરેક હરોળનો એક ચોરસ.",
    "Shade as many hundredths as make one tenth, then press Enter.": "એક દશાંશ બને એટલા શતાંશ રંગો, પછી દાખલ કરો દબાવો.",
    "Shade one tenth": "એક દશાંશ રંગો",
    "Count the squares you shaded.": "તમે રંગેલા ચોરસ ગણો.",
    "One tenth is one whole column of the grid.": "એક દશાંશ એટલે ગ્રિડનો એક આખો સ્તંભ.",
    "Shade every square of one column, top to bottom.": "એક સ્તંભના બધા ચોરસ ઉપરથી નીચે સુધી રંગો.",
    "3 squares of the grid are shaded, so what decimal is that?": "ગ્રિડના 3 ચોરસ રંગેલા છે, તો તે કઈ દશાંશ સંખ્યા છે?",
    "3 squares as a decimal?": "3 ચોરસ દશાંશ સંખ્યામાં?",
    "Three single squares are far fewer than a tenth.": "ત્રણ છૂટા ચોરસ એક દશાંશ કરતાં ઘણા ઓછા છે.",
    "It takes a hundred squares to fill the grid.": "ગ્રિડ ભરવા સો ચોરસ જોઈએ.",
    "Hundredths take two places after the point.": "શતાંશ દશાંશ ચિહ્ન પછી બે સ્થાન લે છે.",
    "Yes, ten hundredths fill the cut column.": "હા, દસ શતાંશ કાપેલા સ્તંભને ભરે છે.",
    "Yes, those ten squares are one tenth of the grid.": "હા, તે દસ ચોરસ ગ્રિડનો એક દશાંશ છે.",
    /* phase 2 */
    "Reading a hundred grid": "સો ચોરસની ગ્રિડ વાંચવી",
    "A grid is read by its full columns and its single squares.": "ગ્રિડ આખા સ્તંભો અને છૂટા ચોરસથી વંચાય છે.",
    "Tap Count columns to count the full columns first.": "પહેલાં આખા સ્તંભ ગણવા સ્તંભ ગણો પર ટેપ કરો.",
    "Tap the Count columns key.": "સ્તંભ ગણો બટન પર ટેપ કરો.",
    "Now tap Count squares for the single squares left over.": "હવે બાકી રહેલા છૂટા ચોરસ માટે ચોરસ ગણો પર ટેપ કરો.",
    "Tap the Count squares key.": "ચોરસ ગણો બટન પર ટેપ કરો.",
    "Look for the columns that are full to the bottom.": "નીચે સુધી ભરેલા સ્તંભ શોધો.",
    "Every square of the grid is one hundredth.": "ગ્રિડનો દરેક ચોરસ એક શતાંશ છે.",
    "Read full columns first, then single squares, over 100.": "પહેલાં આખા સ્તંભ વાંચો, પછી છૂટા ચોરસ, 100માંથી.",
    "You learned: read full columns, then single squares, over 100": "તમે શીખ્યા: પહેલાં આખા સ્તંભ, પછી છૂટા ચોરસ, 100માંથી",
    "What decimal does the shaded part of this grid show?": "આ ગ્રિડનો રંગેલો ભાગ કઈ દશાંશ સંખ્યા બતાવે છે?",
    "Shaded part as a decimal?": "રંગેલો ભાગ દશાંશ સંખ્યામાં?",
    "A full column is ten hundredths, not one whole.": "એક આખો સ્તંભ દસ શતાંશ છે, એક પૂર્ણ નહીં.",
    "Count the full columns in tens, then add the single squares.": "આખા સ્તંભ દસ-દસ કરીને ગણો, પછી છૂટા ચોરસ ઉમેરો.",
    "Write the hundredths you counted with two places after the point.": "ગણેલા શતાંશ દશાંશ ચિહ્ન પછી બે સ્થાનમાં લખો.",
    "Now write this new shading as a decimal.": "હવે આ નવો રંગેલો ભાગ દશાંશ સંખ્યામાં લખો.",
    "This one as a decimal?": "આ દશાંશ સંખ્યામાં?",
    "Each column holds ten squares, so it is not one hundredth.": "દરેક સ્તંભમાં દસ ચોરસ છે, તેથી તે એક શતાંશ નથી.",
    "Skip-count the full columns: 10, 20, and on.": "આખા સ્તંભ દસ-દસ કરીને ગણો: 10, 20 અને આગળ.",
    "Each full column is one tenth, the first place after the point.": "દરેક આખો સ્તંભ એક દશાંશ છે, દશાંશ ચિહ્ન પછીનું પહેલું સ્થાન.",
    "Which fraction of the whole grid is shaded?": "આખી ગ્રિડનો કયો અપૂર્ણાંક રંગેલો છે?",
    "Shaded part as a fraction?": "રંગેલો ભાગ અપૂર્ણાંકમાં?",
    "The bottom number counts every square of the grid.": "નીચેની સંખ્યા ગ્રિડના બધા ચોરસ ગણે છે.",
    "The top number counts every shaded square.": "ઉપરની સંખ્યા બધા રંગેલા ચોરસ ગણે છે.",
    "Two full columns are 20 squares, so add the single squares to 20.": "બે આખા સ્તંભ 20 ચોરસ છે, હવે છૂટા ચોરસ 20માં ઉમેરો.",
    "Yes, 53 hundredths is written 0.53.": "હા, 53 શતાંશને 0.53 લખાય.",
    "Yes, six full columns make 0.6.": "હા, છ આખા સ્તંભ 0.6 બનાવે છે.",
    /* phase 3 */
    "Shading hundredths": "શતાંશ રંગવા",
    "Which squares are shaded may change while their number stays.": "કયા ચોરસ રંગેલા છે તે બદલાય, પણ તેમની સંખ્યા એ જ રહે.",
    "Shade one more square so the grid shows 0.06.": "એક વધુ ચોરસ રંગો જેથી ગ્રિડ 0.06 બતાવે.",
    "Tap a white square of the grid.": "ગ્રિડના કોઈ સફેદ ચોરસ પર ટેપ કરો.",
    "Now tap Scatter and watch the Decimal card.": "હવે વિખેરો પર ટેપ કરો અને દશાંશ સંખ્યાનું કાર્ડ જુઓ.",
    "Tap the Scatter key.": "વિખેરો બટન પર ટેપ કરો.",
    "Look at how many squares are shaded, not where.": "કેટલા ચોરસ રંગેલા છે તે જુઓ, ક્યાં છે તે નહીં.",
    "Each square you shade is one hundredth.": "તમે રંગેલો દરેક ચોરસ એક શતાંશ છે.",
    "Any squares of the right count show the same hundredths.": "સાચી સંખ્યાના કોઈ પણ ચોરસ એ જ શતાંશ બતાવે છે.",
    "You learned: any squares of the right count show hundredths": "તમે શીખ્યા: સાચી સંખ્યાના કોઈ પણ ચોરસ શતાંશ બતાવે છે",
    "Shade squares on the grid to show 0.04, then press Enter.": "ગ્રિડ પર 0.04 બતાવવા ચોરસ રંગો, પછી દાખલ કરો દબાવો.",
    "Shade 0.04": "0.04 રંગો",
    "Count the squares you shaded, each one a hundredth.": "રંગેલા ચોરસ ગણો, દરેક એક શતાંશ છે.",
    "A full column is 0.1, far more than 0.04.": "એક આખો સ્તંભ 0.1 છે, 0.04 કરતાં ઘણો વધારે.",
    "The two digits after the point count the hundredths.": "દશાંશ ચિહ્ન પછીના બે અંક શતાંશ ગણે છે.",
    "Now show 0.21 on the grid the same way.": "હવે આ જ રીતે ગ્રિડ પર 0.21 બતાવો.",
    "Shade 0.21": "0.21 રંગો",
    "Compare your squares with the digits after the point.": "તમારા ચોરસને દશાંશ ચિહ્ન પછીના અંકો સાથે સરખાવો.",
    "Each full column is one tenth, which is 0.1.": "દરેક આખો સ્તંભ એક દશાંશ છે, એટલે કે 0.1 છે.",
    "Shade full columns for the tenths, then single squares.": "દશાંશ માટે આખા સ્તંભ રંગો, પછી છૂટા ચોરસ.",
    "Asha shades a column and 4 squares, Bina 14 scattered squares: who shows 0.14?": "આશા એક સ્તંભ અને 4 ચોરસ રંગે, બીના 14 છૂટાછવાયા ચોરસ: 0.14 કોણ બતાવે છે?",
    "Who shows 0.14?": "0.14 કોણ બતાવે છે?",
    "Count the shaded squares on each grid.": "દરેક ગ્રિડના રંગેલા ચોરસ ગણો.",
    "Count Asha's full column as ten, then add her single squares.": "આશાનો આખો સ્તંભ દસ ગણો, પછી તેના છૂટા ચોરસ ઉમેરો.",
    "Compare how many squares are shaded on the two grids.": "બંને ગ્રિડ પર કેટલા ચોરસ રંગેલા છે તેની સરખામણી કરો.",
    "Yes, your 4 squares are 4 hundredths.": "હા, તમારા 4 ચોરસ 4 શતાંશ છે.",
    "Yes, 21 hundredths, wherever the squares sit.": "હા, 21 શતાંશ, ચોરસ ગમે ત્યાં હોય.",
    "Asha": "આશા", "Bina": "બીના", "Both": "બંને", "None": "કોઈ નહીં",
    "Both show 0.14": "બંને 0.14 બતાવે છે",
    "You chose": "તમે પસંદ કર્યું",
    "Shade some squares first.": "પહેલાં થોડા ચોરસ રંગો.",
    "Asha shows 0.14": "આશા 0.14 બતાવે છે", "Bina shows 0.14": "બીના 0.14 બતાવે છે",
    /* phase 4 */
    "Thousandths": "સહસ્રાંશ",
    "Each thin slice of a square is one thousandth.": "ચોરસની દરેક પાતળી પટ્ટી એક સહસ્રાંશ છે.",
    "Tap Zoom to look closely at the outlined square.": "ઘેરેલા ચોરસને નજીકથી જોવા ઝૂમ પર ટેપ કરો.",
    "Tap the Zoom key.": "ઝૂમ બટન પર ટેપ કરો.",
    "Now tap Cut to cut that square into thousandths.": "હવે તે ચોરસને સહસ્રાંશમાં કાપવા કાપો પર ટેપ કરો.",
    "Tap the Cut key to cut the big square.": "મોટો ચોરસ કાપવા કાપો બટન પર ટેપ કરો.",
    "Tap one thin slice to shade it.": "એક પાતળી પટ્ટી રંગવા તેના પર ટેપ કરો.",
    "Tap a slice of the big square.": "મોટા ચોરસની કોઈ પટ્ટી પર ટેપ કરો.",
    "Look closely at the big square and its slices.": "મોટા ચોરસ અને તેની પટ્ટીઓને ધ્યાનથી જુઓ.",
    "Every slice of the big square is the same size.": "મોટા ચોરસની દરેક પટ્ટી સરખા માપની છે.",
    "So 10 thousandths make 1 hundredth.": "તો 10 સહસ્રાંશ મળીને 1 શતાંશ બને છે.",
    "You learned: a hundredth cuts into 10 thousandths": "તમે શીખ્યા: એક શતાંશના 10 સહસ્રાંશ બને છે",
    "How many thousandths make one hundredth?": "કેટલા સહસ્રાંશ મળીને એક શતાંશ બને?",
    "Thousandths in a hundredth?": "એક શતાંશમાં કેટલા સહસ્રાંશ?",
    "Count the thin slices of the big square.": "મોટા ચોરસની પાતળી પટ્ટીઓ ગણો.",
    "Touch each slice from left to right as you count.": "ગણતી વખતે ડાબેથી જમણે દરેક પટ્ટીને અડો.",
    "The big square is one hundredth, and each slice is one thousandth.": "મોટો ચોરસ એક શતાંશ છે અને દરેક પટ્ટી એક સહસ્રાંશ છે.",
    "3 of the 10 slices of this hundredth are shaded: what decimal is that?": "આ શતાંશની 10માંથી 3 પટ્ટીઓ રંગેલી છે: તે કઈ દશાંશ સંખ્યા છે?",
    "These slices are thousandths, not hundredths.": "આ પટ્ટીઓ સહસ્રાંશ છે, શતાંશ નહીં.",
    "Thousandths need three places after the point.": "સહસ્રાંશને દશાંશ ચિહ્ન પછી ત્રણ સ્થાન જોઈએ.",
    "Zeros hold the tenths and hundredths places when they are empty.": "ખાલી દશાંશ અને શતાંશના સ્થાને શૂન્ય લખાય છે.",
    "Write 41 thousandths as a fraction.": "41 સહસ્રાંશને અપૂર્ણાંકમાં લખો.",
    "41 thousandths as a fraction?": "41 સહસ્રાંશ અપૂર્ણાંકમાં?",
    "The bottom number says how many parts make one whole.": "નીચેની સંખ્યા કહે છે કે કેટલા ભાગ મળીને એક પૂર્ણ બને.",
    "Each thin slice is one thousandth of the whole grid.": "દરેક પાતળી પટ્ટી આખી ગ્રિડનો એક સહસ્રાંશ છે.",
    "Ten slices make a square, and the grid has 100 squares.": "દસ પટ્ટીઓથી એક ચોરસ બને અને ગ્રિડમાં 100 ચોરસ છે.",
    "Yes, the big square holds 10 thousandths.": "હા, મોટા ચોરસમાં 10 સહસ્રાંશ છે.",
    "Yes, 3 thousandths is written 0.003.": "હા, 3 સહસ્રાંશને 0.003 લખાય.",
    /* drawn in the working area (tx) */
    "Whole": "પૂર્ણ", "1 tenth": "1 દશાંશ", "1 hundredth": "1 શતાંશ", "1 thousandth": "1 સહસ્રાંશ",
    "Fraction": "અપૂર્ણાંક", "Decimal": "દશાંશ સંખ્યા",
    "hundredth": "શતાંશ", "hundredths": "શતાંશ", "thousandth": "સહસ્રાંશ", "thousandths": "સહસ્રાંશ",
    "square": "ચોરસ", "squares": "ચોરસ", "column": "સ્તંભ", "columns": "સ્તંભ",
    "Cut": "કાપો", "Count columns": "સ્તંભ ગણો", "Count squares": "ચોરસ ગણો", "Scatter": "વિખેરો", "Zoom": "ઝૂમ",
    "100 × 10 = 1,000": "100 × 10 = 1,000",
    /* aria labels */
    "Hundred grid: tap or drag to shade squares": "સો ચોરસની ગ્રિડ: ચોરસ રંગવા ટેપ કરો કે ખેંચો",
    "Big square: tap a thin slice to shade it": "મોટો ચોરસ: પટ્ટી રંગવા તેના પર ટેપ કરો",
    "Decimal card: tap to answer": "દશાંશ સંખ્યાનું કાર્ડ: જવાબ આપવા ટેપ કરો",
    "Fraction card: tap to answer": "અપૂર્ણાંકનું કાર્ડ: જવાબ આપવા ટેપ કરો",
    "Whole part": "પૂર્ણ ભાગ", "Decimal part": "દશાંશ ભાગ", "Top number": "ઉપરની સંખ્યા", "Bottom number": "નીચેની સંખ્યા",
  },
};

/* phase 3, question 3: Asha shades a full column and 4 squares, Bina 14 squares scattered about (q = column * 10 + row) */
const HG_B = [3, 17, 22, 28, 35, 41, 46, 53, 59, 64, 72, 77, 85, 91];
const HG_CHOICES = [{ id: "asha", label: "Asha" }, { id: "bina", label: "Bina" }, { id: "both", label: "Both" }, { id: "neither", label: "None" }];

/* One entry per phase = one mount. Every phase opens on guide steps (one click each, PATTERNS §9b) done through the
   one act key or a tap on the picture; each question carries its own ladder (rungs 2 and 3), its miss is rung 1.
   kind: cut · tenth · one (phase 1) · read · readf (2) · shade · who (3) · count10 · thou · thouf (4)
   near: the item's misconception (judge rejects it) · forms: the answer forms no line may print where the default
   would flag the question's own given number (0.04 holds a 4, "41 thousandths" asks for 1000 below the bar) */
const PHASES = [
  {
    n: 1,
    concept: "One hundredth",
    conceptId: "M1.S1.T3.C10", objectiveIds: ["O3"],
    says: ["A column of the grid is one of its tenths."],
    steps: [{ say: "One column is one tenth, so tap Cut to cut it out of the grid.", on: "cut", hint: "Tap the Cut key." }],
    stepHold: 2000,
    ladder: ["Look at the cut column and the grid again.", "Every small square of the grid is the same size."],
    closing: "So 10 hundredths make 1 tenth.",
    learned: "You learned: a tenth cuts into 10 hundredths",
    traceback: "The cut column's squares are numbered one by one under 1 tenth, ending on 10 hundredths; a tenth shaded in hundredths fills one column, numbered; one square is ringed beside its column and the cards end on 1/100 and 0.01.",
    items: [
      /* learn HG1: answer in the plan = 10 hundredths, so 1/10 = 10/100 */
      { qid: "M1.S1.T3.C10:HG1", kind: "cut", say: "Each square is one hundredth, so how many hundredths make the cut column?",
        ask: "Hundredths in the column?", answer: 10, near: 1, miss: "Count the squares in the cut column.",
        ladder: ["Touch each square of the column as you count it.", "The column is as tall as the grid, one square for each row."] },
      /* practice 1: answer in the plan = 10 hundredths (made on the grid: any 10 squares are one tenth) */
      { qid: "M1.S1.T3.C10:1", kind: "tenth", pad: "enter", say: "Shade as many hundredths as make one tenth, then press Enter.",
        ask: "Shade one tenth", answer: 10, near: 1, miss: "Count the squares you shaded.",
        ladder: ["One tenth is one whole column of the grid.", "Shade every square of one column, top to bottom."] },
      /* authored (the plan has two questions for this concept): 3 shaded squares as a decimal, after the cards showed 1/100 and
         0.01 beside the cut column; the near miss reads the squares as tenths */
      { qid: null, kind: "one", k: 3, parts: SLOT_DECIMAL, say: "3 squares of the grid are shaded, so what decimal is that?",
        ask: "3 squares as a decimal?", answer: ["0", "03"], near: "0|3", miss: "Three single squares are far fewer than a tenth.",
        ladder: ["It takes a hundred squares to fill the grid.", "Hundredths take two places after the point."] },
    ],
  },
  {
    n: 2,
    concept: "Reading a hundred grid",
    conceptId: "M1.S1.T3.C11", objectiveIds: ["O3"],
    says: ["A grid is read by its full columns and its single squares."],
    steps: [
      { say: "Tap Count columns to count the full columns first.", on: "columns", hint: "Tap the Count columns key." },
      { say: "Now tap Count squares for the single squares left over.", on: "squares", hint: "Tap the Count squares key." },
    ],
    stepHold: 2600,
    ladder: ["Look for the columns that are full to the bottom.", "Every square of the grid is one hundredth."],
    closing: "Read full columns first, then single squares, over 100.",
    learned: "You learned: read full columns, then single squares, over 100",
    traceback: "Each full column is lit and labelled 10 as the counter adds in tens, the single squares join one by one, and the cards end on the hundredths as a fraction and a decimal.",
    items: [
      /* learn HG2: answer in the plan = 53/100, which is 0.53 (asked as the decimal; the cards show both at the win) */
      { qid: "M1.S1.T3.C11:HG2", kind: "read", cols: 5, ones: 3, parts: SLOT_DECIMAL, answer: ["0", "53"], near: "5|3",
        say: "What decimal does the shaded part of this grid show?", ask: "Shaded part as a decimal?",
        miss: "A full column is ten hundredths, not one whole.",
        ladder: ["Count the full columns in tens, then add the single squares.", "Write the hundredths you counted with two places after the point."] },
      /* practice 2: answer in the plan = 60 of the 100 squares, 60/100, which is 0.60 or 0.6 (both taken) */
      { qid: "M1.S1.T3.C11:2", kind: "read", cols: 6, ones: 0, parts: SLOT_DECIMAL, answer: ["0", "6"], alt: ["0", "60"], near: "0|06",
        say: "Now write this new shading as a decimal.", ask: "This one as a decimal?",
        miss: "Each column holds ten squares, so it is not one hundredth.",
        ladder: ["Skip-count the full columns: 10, 20, and on.", "Each full column is one tenth, the first place after the point."] },
      /* practice 4: answer in the plan = 29/100, which is 0.29 (asked as the fraction; the cards show both at the win) */
      { qid: "M1.S1.T3.C11:4", kind: "readf", cols: 2, ones: 9, parts: SLOT_FRACTION, answer: [29, 100], near: "29|10",
        say: "Which fraction of the whole grid is shaded?", ask: "Shaded part as a fraction?",
        miss: "The bottom number counts every square of the grid.",
        ladder: ["The top number counts every shaded square.", "Two full columns are 20 squares, so add the single squares to 20."] },
    ],
  },
  {
    n: 3,
    concept: "Shading hundredths",
    conceptId: "M1.S1.T3.C12", objectiveIds: ["O3"],
    says: ["Which squares are shaded may change while their number stays."],
    steps: [
      { say: "Shade one more square so the grid shows 0.06.", on: "shade", hint: "Tap a white square of the grid." },
      { say: "Now tap Scatter and watch the Decimal card.", on: "scatter", hint: "Tap the Scatter key." },
    ],
    stepHold: 2800,
    ladder: ["Look at how many squares are shaded, not where.", "Each square you shade is one hundredth."],
    closing: "Any squares of the right count show the same hundredths.",
    learned: "You learned: any squares of the right count show hundredths",
    traceback: "The counter reads the child's shading in hundredths, a second grid shades the asked number of single squares beside it, and the cards end on the asked hundredths; for the two children each grid is counted to 14.",
    items: [
      /* learn HG3: answer in the plan = Any 4 squares of the 100 shaded */
      { qid: "M1.S1.T3.C12:HG3", kind: "shade", dec: "0.04", pad: "enter", answer: 4, near: 40, forms: ["four"],
        say: "Shade squares on the grid to show 0.04, then press Enter.", ask: "Shade 0.04",
        miss: "Count the squares you shaded, each one a hundredth.",
        ladder: ["A full column is 0.1, far more than 0.04.", "The two digits after the point count the hundredths."] },
      /* practice 3: answer in the plan = Any 21 squares */
      { qid: "M1.S1.T3.C12:3", kind: "shade", dec: "0.21", pad: "enter", answer: 21, near: 30, forms: ["twenty-one"],
        say: "Now show 0.21 on the grid the same way.", ask: "Shade 0.21",
        miss: "Compare your squares with the digits after the point.",
        ladder: ["Each full column is one tenth, which is 0.1.", "Shade full columns for the tenths, then single squares."] },
      /* practice 8: answer in the plan = Both are right. Each shaded 14 of the 100 squares, and which squares does not matter */
      { qid: "M1.S1.T3.C12:8", kind: "who", aCols: 1, aOnes: 4, choices: HG_CHOICES, answer: "both", near: "asha",
        say: "Asha shades a column and 4 squares, Bina 14 scattered squares: who shows 0.14?", ask: "Who shows 0.14?",
        miss: "Count the shaded squares on each grid.",
        ladder: ["Count Asha's full column as ten, then add her single squares.", "Compare how many squares are shaded on the two grids."] },
    ],
  },
  {
    n: 4,
    concept: "Thousandths",
    conceptId: "M1.S1.T3.C13", objectiveIds: ["O4"],
    says: ["Each thin slice of a square is one thousandth."],
    steps: [
      { say: "Tap Zoom to look closely at the outlined square.", on: "zoom", hint: "Tap the Zoom key." },
      { say: "Now tap Cut to cut that square into thousandths.", on: "cut", hint: "Tap the Cut key to cut the big square." },
      { say: "Tap one thin slice to shade it.", on: "slice", hint: "Tap a slice of the big square." },
    ],
    stepHold: 2400,
    ladder: ["Look closely at the big square and its slices.", "Every slice of the big square is the same size."],
    closing: "So 10 thousandths make 1 hundredth.",
    learned: "You learned: a hundredth cuts into 10 thousandths",
    traceback: "The zoomed square's slices are numbered, the decimal card lights its third place after the point in amber with grey zeros holding the places, and the cards end on the thousandths.",
    items: [
      /* practice 6: answer in the plan = 10 thousandths */
      { qid: "M1.S1.T3.C13:6", kind: "count10", answer: 10, near: 100, say: "How many thousandths make one hundredth?",
        ask: "Thousandths in a hundredth?", miss: "Count the thin slices of the big square.",
        ladder: ["Touch each slice from left to right as you count.", "The big square is one hundredth, and each slice is one thousandth."] },
      /* learn HG4: answer in the plan = 3/1000, which is 0.003 (asked as the decimal; the cards show both at the win) */
      { qid: "M1.S1.T3.C13:HG4", kind: "thou", th: 3, parts: SLOT_DECIMAL, answer: ["0", "003"], near: "0|03",
        say: "3 of the 10 slices of this hundredth are shaded: what decimal is that?", ask: "Shaded part as a decimal?",
        miss: "These slices are thousandths, not hundredths.",
        ladder: ["Thousandths need three places after the point.", "Zeros hold the tenths and hundredths places when they are empty."] },
      /* practice 7: answer in the plan = 41/1000, which is 0.041 (asked as the fraction; the cards show both at the win) */
      { qid: "M1.S1.T3.C13:7", kind: "thouf", th: 41, parts: SLOT_FRACTION, answer: [41, 1000], near: "41|100", forms: ["1000", "1,000", "one thousand"],
        say: "Write 41 thousandths as a fraction.", ask: "41 thousandths as a fraction?",
        miss: "The bottom number says how many parts make one whole.",
        ladder: ["Each thin slice is one thousandth of the whole grid.", "Ten slices make a square, and the grid has 100 squares."] },
    ],
  },
];

/* ── the picture's model (working-area units; laid out for the OPEN keypad, 900 x 520) ── */
const HG_INK = "#2B2B2B", HG_WARM = "#FFFDF7", HG_GREY = "#767676";
const HG_GAP = 5;      /* phase 1: the gap a cut opens between two squares of the lifted column */
const HG_ZGAP = 3;     /* phase 4: the gap a cut opens between two slices */
const HG_ZQ = 90;      /* phase 4: the square that is zoomed (column 10, row 1: the top right corner) */
const HG_W2 = { kind: "w2", cols: 3, ones: 8 };   /* phase 2's warm-up grid: 3 full columns and 8 squares (the book's 0.38) */
const MODEL = { grid: { columns: 10, rows: 10, square: 39, at: [12, 54], numbering: "column * 10 + row" },
  zoom: { square: HG_ZQ, slices: 10, size: 200 }, warmup: { phase2: 38, phase3: 6, phase4: 1 }, childB: HG_B };

const hgRange = (a: number, b: number) => Array.from({ length: Math.max(0, b - a) }, (_, i) => a + i);
const hgFill = (list: number[], size = 100) => { const a = Array(size).fill(false); list.forEach((x) => { if (x >= 0 && x < size) a[x] = true; }); return a; };
const hgCount = (a: boolean[]) => a.reduce((t, v) => t + (v ? 1 : 0), 0);
const hgFull = (a: boolean[]) => hgRange(0, 10).filter((c) => hgRange(0, 10).every((r) => a[c * 10 + r])).length;
/* the shading a question gives (deep blue: given) */
const hgGiven = (it: any): boolean[] => {
  if (!it) return hgFill([]);
  if (it.kind === "one") return hgFill(hgRange(HG_ZQ, HG_ZQ + it.k));
  if (it.kind === "read" || it.kind === "readf" || it.kind === "w2") return hgFill(hgRange(0, it.cols * 10 + it.ones));
  if (it.kind === "who") return hgFill(hgRange(0, it.aCols * 10 + it.aOnes));
  if (it.kind === "thouf") return hgFill(hgRange(0, Math.floor(it.th / 10)));
  return hgFill([]);
};
const hgGivenSlices = (it: any) => hgFill(it && it.kind === "thou" ? hgRange(0, it.th) : it && it.kind === "thouf" ? hgRange(0, it.th % 10) : [], 10);
const hgStepsOf = (it: any) => (!it ? 0 : it.kind === "cut" || it.kind === "tenth" || it.kind === "count10" ? 11 : it.kind === "one" || it.kind === "who" ? 3
  : it.kind === "read" || it.kind === "readf" ? it.cols * 1 + it.ones + 1 : it.kind === "shade" ? it.answer + 2 : it.kind === "thou" ? it.th + 2 : it.kind === "thouf" ? 8 : 1);
const hgCellAt = (p: any, g: any) => {
  if (!p || !isFinite(p.x) || !isFinite(p.y)) return -1;
  const c = Math.floor((p.x - g.x) / g.s), r = Math.floor((p.y - g.y) / g.s);
  return c >= 0 && c < 10 && r >= 0 && r < 10 ? c * 10 + r : -1;
};

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* judge: a count made on the grid compares as a number; a typed count must be digits only; a decimal on the Decimal
   card digit for digit (0.6 and 0.60 both right where the plan takes both); a fraction box by box; a choice by id */
const judge = (item: any, v: any) => {
  if (item.parts === SLOT_DECIMAL) return judgeSlotDecimal(item, v) || (!!item.alt && judgeSlotDecimal({ ...item, answer: item.alt }, v));
  if (item.parts) return judgeSlotParts(item, v);
  if (item.choices) return String(v) === String(item.answer);
  if (item.pad === "enter") return Number(v) === item.answer;
  const s = String(v ?? "").trim();
  return /^\d+$/.test(s) && Number(s) === item.answer;
};
/* oracle: every answer re-derived from the item's own data by a second route (no judge, no picture code) */
const HG_ROUTE: any = {
  cut: () => 100 / 10, tenth: () => 100 / 10, count10: () => 1000 / 100,
  one: (it: any) => ["0", String(100 + it.k).slice(1)],
  read: (it: any) => (it.cols * 10 + it.ones) / 100,
  readf: (it: any) => [it.cols * 10 + it.ones, 100],
  shade: (it: any) => Math.round(parseFloat(it.dec) * 100),
  who: (it: any) => (it.aCols * 10 + it.aOnes === HG_B.length && Math.round(parseFloat("0.14") * 100) === HG_B.length ? "both" : "asha"),
  thou: (it: any) => it.th / 1000,
  thouf: (it: any) => [it.th, 1000],
};
const oracle = () => PHASES.every((p: any) => p.items.every((it: any) => {
  const r = HG_ROUTE[it.kind](it);
  if (it.kind === "read" || it.kind === "thou") return [it.answer, ...(it.alt ? [it.alt] : [])].every((a: any) => Math.abs(parseFloat(a.join(".")) - r) < 1e-9);
  return JSON.stringify(r) === JSON.stringify(it.answer);
}));
/* the most likely wrong answer (the misconception); judge must reject it */
const nearMiss = (item: any) => item.near;
/* the forms of an answer that no question, hint or ladder line may print */
const answerForms = (item: any) => (item.forms ? item.forms
  : item.choices ? [((item.choices.find((c: any) => c.id === item.answer) || {}) as any).label || String(item.answer)]
  : item.parts === SLOT_DECIMAL ? [item.answer.join("."), ...(item.alt ? [item.alt.join(".")] : [])]
  : item.parts ? item.answer.filter((x: number) => x >= 10).map((x: number) => String(x))
  : [String(item.answer), words(item.answer)]);
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => item.answer;

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => (T.state().stage === "demo" ? HOOK.demo && HOOK.demo()
  : (item.pad === "enter" && HOOK.set && HOOK.set(item.answer), T.submit(item.answer)));
/* the agent's answer(): a count made on the grid is shaded as a child would; the rest the runtime types */
const answer = (item: any, v: any) => (item.pad === "enter" ? (HOOK.set ? HOOK.set(v) : false) : undefined);
/* the agent's check() before Enter: undefined = press Enter (so in the warm-up it reaches api.onEnter: the step) */
const check = () => undefined;

/* ── drawing helpers (called, never mounted) ─────────────────────────────────────────────── */

/* a 10 x 10 grid of unit squares: a dark outline on every box (the empty ones too), a deeper fill on a shaded one */
function hgGridRects(key: string, g: any, on: boolean[], fill: string, skip?: (q: number) => boolean, edgeCols = 10) {
  const out: any[] = [];
  const tiny = g.s < 12;   /* a summary thumbnail: light hairlines, so the fill is what reads */
  const sw = g.s >= 30 ? 2.4 : tiny ? 0.6 : 1.6;
  for (let c = 0; c < 10; c++) for (let r = 0; r < 10; r++) {
    const q = c * 10 + r;
    if (skip && skip(q)) continue;
    out.push(<rect key={key + q} x={g.x + c * g.s} y={g.y + r * g.s} width={g.s} height={g.s} fill={on[q] ? fill : HG_WARM} stroke={tiny ? "#A9A9A9" : HG_INK} strokeWidth={sw} />);
  }
  out.push(<rect key={key + "edge"} x={g.x} y={g.y} width={edgeCols * g.s} height={10 * g.s} fill="none" stroke={HG_INK} strokeWidth={g.s >= 30 ? 4.5 : tiny ? 1.5 : 3} />);
  return out;
}

/* a last-bench label: bold, dark, one line, with a paper halo where it sits over a line or a colour */
function hgLab(key: string, x: number, y: number, s: string, size: number, fill: string, anchor = "middle") {
  return <text key={key} x={x} y={y} textAnchor={anchor} fontSize={size} fontWeight={700} fill={fill}
    stroke={HG_WARM} strokeWidth={7} strokeLinejoin="round" paintOrder="stroke">{s}</text>;
}

const hgEdge = (C: any, tone: string) => (tone === "result" ? CONTENT.one : tone === "given" ? CONTENT.hundred : C.rule);
const hgInk = (C: any, tone: string) => (tone === "result" ? shade(CONTENT.one, 0.25) : tone === "given" ? shade(CONTENT.hundred, 0.25) : C.ink);

/* the Fraction card (stacked: the top number over the bar over the bottom number). v = { t, b, tone } or null;
   o = { open, part, caret }: with the keypad open the box with the caret wears the accent edge */
function hgFracCard(C: any, tx: any, R: any, v: any, o: any) {
  const tone = v ? v.tone : "blank", ink = hgInk(C, tone), cx = R.x + R.w / 2, bx = R.x + 15, bw = R.w - 30;
  /* both numbers at ONE size, stepping down together for a four-digit number (1000) so it never touches its box */
  const fs = v && Math.max(String(v.t || "").length, String(v.b || "").length) * 0.62 * T.xl + 16 > bw ? T.speech : T.xl;
  const box = (j: number, y: number) => {
    const on = o.open && o.part === j;
    return <rect key={"fb" + j} x={bx} y={y} width={bw} height={60} rx={10} fill="#FFFFFF" stroke={on ? C.accent : C.rule} strokeWidth={on ? 4 : 2} />;
  };
  const dig = (j: number, s: string, y: number) => {
    const wd = String(s).length * 0.62 * fs;
    return (
      <g key={"fd" + j}>
        {s ? <text x={cx} y={y - (fs < T.xl ? 4 : 0)} textAnchor="middle" fontSize={fs} fontWeight={700} fill={ink}>{s}</text> : null}
        {o.open && o.part === j && o.caret && <line x1={cx + wd / 2 + 6} y1={y - 40} x2={cx + wd / 2 + 6} y2={y + 4} stroke={C.ink} strokeWidth={3} />}
      </g>
    );
  };
  return (
    <g>
      <rect x={R.x} y={R.y} width={R.w} height={R.h} rx={18} fill="#FFFFFF" stroke={hgEdge(C, tone)} strokeWidth={tone === "blank" ? 3 : 4.5} />
      <text x={R.x + 16} y={R.y + 42} fontSize={T.label} fontWeight={700} fill={C.ink}>{tx("Fraction")}</text>
      {box(0, R.y + 58)}{box(1, R.y + 142)}
      <line x1={R.x + 26} y1={R.y + 130} x2={R.x + R.w - 26} y2={R.y + 130} stroke={HG_INK} strokeWidth={5} strokeLinecap="round" />
      {dig(0, v ? v.t : "", R.y + 108)}{dig(1, v ? v.b : "", R.y + 192)}
    </g>
  );
}

/* the Decimal card: [whole] . [decimal], the point drawn. v = { w, d, tone, lit } or null; lit = the decimal place lit
   amber (a correction); a zero holding a place before the first other digit is grey */
function hgDecCard(C: any, tx: any, R: any, v: any, o: any) {
  const tone = v ? v.tone : "blank", ink = hgInk(C, tone);
  const wx = R.x + 14, ww = 72, dx = R.x + 114, dw = R.w - 128, by = R.y + 58, bh = 82, base = by + 59;
  const boxR = (j: number, x: number, w: number) => {
    const on = o.open && o.part === j;
    return <rect key={"db" + j} x={x} y={by} width={w} height={bh} rx={10} fill="#FFFFFF" stroke={on ? C.accent : C.rule} strokeWidth={on ? 4 : 2} />;
  };
  const d = v ? String(v.d || "") : "", first = d.search(/[1-9]/), pitch = 0.62 * 56, d0 = dx + dw / 2 - (d.length * pitch) / 2;
  const caret = (j: number, xr: number) => o.open && o.part === j && o.caret ? <line key={"dc" + j} x1={xr + 6} y1={base - 40} x2={xr + 6} y2={base + 4} stroke={C.ink} strokeWidth={3} /> : null;
  const wv = v ? String(v.w || "") : "";
  return (
    <g>
      <rect x={R.x} y={R.y} width={R.w} height={R.h} rx={18} fill="#FFFFFF" stroke={hgEdge(C, tone)} strokeWidth={tone === "blank" ? 3 : 4.5} />
      <text x={R.x + 16} y={R.y + 42} fontSize={T.label} fontWeight={700} fill={C.ink}>{tx("Decimal")}</text>
      {boxR(0, wx, ww)}{boxR(1, dx, dw)}
      <circle cx={R.x + 100} cy={by + bh - 18} r={6.5} fill={HG_INK} />
      {wv ? <text x={wx + ww / 2} y={base} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={ink}>{wv}</text> : null}
      {caret(0, wx + ww / 2 + (wv.length * pitch) / 2)}
      {/* one text (the box reads as "003"), a tspan a digit so a lit place and a grey place holder keep their own colour */}
      {d ? (
        <text x={dx + dw / 2} y={base} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={ink}>
          {d.split("").map((ch, i) => (
            <tspan key={"dd" + i} fill={v && v.lit === i ? shade(CONTENT.ten, 0.45) : tone !== "typed" && ch === "0" && (first < 0 || i < first) ? HG_GREY : ink}>{ch}</tspan>
          ))}
        </text>
      ) : null}
      {caret(1, d0 + d.length * pitch)}
    </g>
  );
}

/* ── the start page's picture: the hundred grid, a column cut out of it, and one square cut into thin slices ── */
function StartArt({ box, C }: any) {
  const s = 30, g = { x: 250, y: 18, s };
  const on = hgFill(hgRange(0, 38));
  const zx = 760, zy = 70, zs = 200;
  return (
    <g>
      {hgGridRects("sa", g, on, CONTENT.hundred, (q) => q >= 90, 9)}
      <rect x={g.x + 9 * s} y={g.y} width={s} height={10 * s} fill="none" stroke={HG_INK} strokeWidth={2} strokeDasharray="8 8" />
      {hgRange(0, 10).map((r) => <rect key={"sc" + r} x={g.x + 10 * s + 50} y={g.y + r * (s + 3)} width={s} height={s} fill={HG_WARM} stroke={HG_INK} strokeWidth={2.4} />)}
      {hgRange(0, 10).map((i) => <rect key={"ss" + i} x={zx + i * 22} y={zy} width={20} height={zs} fill={i < 3 ? CONTENT.hundred : HG_WARM} stroke={HG_INK} strokeWidth={2.4} />)}
      <line x1={g.x + 11 * s + 50} y1={g.y} x2={zx} y2={zy} stroke={HG_INK} strokeWidth={1.6} strokeDasharray="6 6" />
      <line x1={g.x + 11 * s + 50} y1={g.y + s} x2={zx} y2={zy + zs} stroke={HG_INK} strokeWidth={1.6} strokeDasharray="6 6" />
      <rect x={g.x + 10 * s + 50} y={g.y} width={s} height={s} fill="none" stroke={CONTENT.ten} strokeWidth={4} />
    </g>
  );
}

/* ── the working area ────────────────────────────────────────────────────────────────────────
   The grid (left) is shaded by a drag: a stroke that starts on a white square shades every square it crosses, one
   that starts on a shaded square clears them; a tap toggles one square; Space adds the next square, Backspace takes
   the last off. The cards stand at the right; the ONE act key (Cut · Count columns, Count squares · Scatter · Zoom,
   Cut) sits under them, its label following the act, and every act is done on screen by a tool (api.act). A miss draws
   its correction on a demo layer (pointer-events none) that clears on the child's next act. */
function Work({ n, item, index, stage, wrong, typed, part, api, stepOn, box, tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();
  const OW = typeof BOARD_OPEN_W_BIG === "number" ? BOARD_OPEN_W_BIG : 900;
  const H = box && box.h ? box.h : 520;
  const free = stage === "free";
  const warm = stage === "demo" || stage === "teach";
  const it: any = free || warm ? null : item;
  const kind = free ? "free" : warm ? "w" + n : item.kind;
  const k = free ? "free" : warm ? n + ":w" : n + ":" + index;
  const rm = reducedMotion();

  /* ── the layout, from the open keypad's width and the area's height (the same with the keypad shut) ── */
  /* phase 2 keeps a band above its grid for the tens chips (one over each counted column), so its grid is a little smaller */
  const p2Lay = kind === "w2" || kind === "read" || kind === "readf";
  const G = p2Lay ? { x: 12, y: 100, s: Math.max(30, Math.min(40, Math.floor((H - 170) / 10))) } : { x: 12, y: 54, s: Math.max(30, Math.min(40, Math.floor((H - 130) / 10))) };
  const gx = G.x + 5 * G.s, gBase = G.y + 10 * G.s + 52;            /* the centre of the grid; the counter's baseline */
  /* the two children's grids: as big as the room left of the four choice keys allows. The keys' corner is read once, when the
     question opens (it is widest in Gujarati), and kept for the question, so the grids never move when the keys leave at the win */
  const kxRef = useRef<any>({ k: "", x: OW });
  const kNow = n + ":" + index;
  if (stage === "ask" && box && box.key && box.key.w > 300 && kxRef.current.k !== kNow) kxRef.current = { k: kNow, x: box.key.x - 12 };
  const kx = kxRef.current.k === kNow ? kxRef.current.x : OW;
  const S2 = Math.max(28, Math.min(34, Math.floor((Math.min(OW, kx) - G.x - 24) / 20)));
  const GA = { x: G.x, y: G.y, s: S2 }, GB = { x: G.x + 10 * S2 + 24, y: G.y, s: S2 };
  const LX = G.x + 10 * G.s + 70;                                   /* phase 1: the lifted column (its counting numbers stand left of it) */
  const Z = { x: G.x + 10 * G.s + 44, y: 50, w: 400, h: kind === "free" ? 110 : 180 };   /* phase 4: the zoomed square, a strip of ten slices 40 wide (free play: shorter, its keys under it) */
  const SW = Z.w / 10;
  const MG = { x: G.x + 10 * G.s + 20, y: G.y, s: 20 };              /* phase 3: the second grid of a correction */
  const zoomLay = kind === "w4" || kind === "count10" || kind === "thou" || kind === "thouf" || kind === "free";
  const p1Lay = kind === "w1" || kind === "cut" || kind === "one";   /* phase 1: the cards sit lower, under the "1 hundredth" label */
  /* phase 4 (and free play): the strip across the top right, the two cards side by side under it, the wider Fraction card
     holding 1000 at full size */
  const FR = zoomLay ? { x: Z.x - 6, y: 300, w: 206, h: 214 } : { x: OW - 200, y: p1Lay ? 110 : 14, w: 180, h: 214 };
  const DE = zoomLay ? { x: OW - 240, y: 300, w: 240, h: 154 } : { x: OW - 254, y: p1Lay ? 340 : 250, w: 250, h: 154 };
  const sliceX = (i: number, opened: number) => Z.x + i * SW + Math.min(i, opened) * HG_ZGAP;
  const sliceAt = (p: any) => {
    if (!p || !isFinite(p.x) || !isFinite(p.y)) return -1;
    /* a tap in the band beside the last (or first) slice belongs to that slice */
    if (p.x < Z.x - 8 || p.x > sliceX(9, 9) + SW + 8 || p.y < Z.y - 16 || p.y > Z.y + Z.h + 16) return -1;
    return Math.max(0, Math.min(9, Math.floor((p.x - Z.x + HG_ZGAP / 2) / (SW + HG_ZGAP))));
  };
  const liftY = (r: number, sp: number) => G.y + r * G.s + Math.min(r, sp) * HG_GAP;
  const sqC = (g: any, q: number) => ({ x: g.x + (Math.floor(q / 10) + 0.5) * g.s, y: g.y + ((q % 10) + 0.5) * g.s });

  /* ── the child's own state, kept per question ── */
  const blank = (key: string) => ({ k: key, cells: key === "3:w" ? hgFill(hgRange(0, 5)) : hgFill([]), slices: hgFill([], 10), last: -1, fresh: true,
    lift: false, split: 0, cc: 0, cs: 0, zoom: 0, cutN: 0, fly: null as any });
  const [own0, setOwn] = useState<any>(() => blank(""));
  const ownRef = useRef<any>(own0);
  const own = own0.k === k ? own0 : blank(k);
  const cur = () => (ownRef.current.k === k ? ownRef.current : blank(k));
  const put = (o: any) => { const nx = { ...cur(), ...o, k }; ownRef.current = nx; setOwn(nx); };
  const [demo, setDemo] = useState<any>(null);
  const ds = demo && demo.k === k ? demo.step : 0;
  const rev = !free && !warm && (stage === "win" || stage === "idle");
  const sol = rev || (ds > 0 && ds >= hgStepsOf(it));
  /* the child's next act wipes the correction and makes a new answer */
  /* a nudge said with api.say stays until something replaces it (PATTERNS §18): the child's next shading act says the question again */
  const nudged = useRef("");
  const mine = (o: any) => {
    put({ ...o, fresh: true }); setDemo(null);
    if (nudged.current === k && stage === "ask" && it) { nudged.current = ""; api.say(it.say); }
  };

  /* ── acts performed on screen (PATTERNS §15): the state changes as the tool passes each point, and at its end ── */
  const playing = useRef(false);
  const [busy, setBusy] = useState(false);
  const perform = (o: any, done: () => void, fail?: () => void) => {
    if (playing.current) return;
    playing.current = true; setBusy(true);
    api.act(o).then((ok: boolean) => {
      playing.current = false; setBusy(false);
      if (!ok) { if (fail) fail(); return; }
      done();
      /* keyboard focus goes back to the live act key (the next label of the sequence), if one is left */
      setTimeout(() => {
        try {
          const el: any = document.querySelector(["cut", "columns", "squares", "scatter", "zoom"].map((i) => `[data-zone="work"] [data-control="${i}"]`).join(","));
          if (el && el.focus && el.getAttribute("aria-disabled") !== "true") el.focus();
        } catch (e) { /* no document: nothing to focus */ }
      }, 80);
    });
  };
  const cutColumn = () => {
    if (cur().split >= 9) { api.did("cut"); return; }
    put({ lift: true });
    perform({ tool: "scissors", moves: "snip", at: hgRange(1, 10).map((r) => ({ x: LX + G.s / 2, y: liftY(r, r - 1) })), onPoint: (i: number) => put({ split: i + 1 }) },
      () => { put({ split: 9 }); api.sfx.settle(); api.did("cut"); });
  };
  const countIt = (on: string) => {
    const o = cur();
    if (on === "columns") {
      if (o.cc >= 3) { api.did("columns"); return; }
      perform({ tool: "hand", moves: "tap", at: hgRange(0, 3).map((c) => ({ x: G.x + (c + 0.5) * G.s, y: G.y + 5 * G.s })), onPoint: (i: number) => put({ cc: i + 1 }) },
        () => { put({ cc: 3 }); api.did("columns"); });
    } else {
      if (o.cc < 3 || o.cs >= 8) { api.did("squares"); return; }
      perform({ tool: "hand", moves: "tap", at: hgRange(0, 8).map((r) => ({ x: G.x + 3.5 * G.s, y: G.y + (r + 0.5) * G.s })), onPoint: (i: number) => put({ cs: i + 1 }) },
        () => { put({ cs: 8 }); api.sfx.settle(); api.did("squares"); });
    }
  };
  /* Scatter: the same number of squares, new places; the cards do not move */
  const scatter = () => {
    const o = cur(), keep = (q: number) => !(o.zoom >= 2 && q === HG_ZQ);
    const from = hgRange(0, 100).filter((q) => o.cells[q] && keep(q));
    if (!from.length) { api.did("scatter"); return; }
    const mix = (a: number[]) => a.map((v) => [Math.random(), v]).sort((p, q) => p[0] - q[0]).map((p) => p[1]);
    const to = [...mix(hgRange(0, 100).filter((q) => !o.cells[q] && keep(q))), ...mix(from)].slice(0, from.length);
    put({ fly: { from, to, go: false } });
    setDemo(null);
    perform({ tool: "hand", moves: "sweep", from: { x: G.x - 20, y: G.y + 5 * G.s }, at: [{ x: gx, y: G.y + 5 * G.s }], to: { x: G.x + 10 * G.s + 20, y: G.y + 5 * G.s }, ms: 1400,
      onPoint: () => put({ fly: { from, to, go: true } }) },
      () => {
        const cells = cur().cells.slice();
        from.forEach((q) => { cells[q] = false; });
        to.forEach((q) => { cells[q] = true; });
        put({ cells, last: -1, fly: null, fresh: true }); api.sfx.settle(); api.did("scatter");
      },
      () => put({ fly: null }));
  };
  const zoomIn = () => {
    if (cur().zoom >= 1) { api.did("zoom"); return; }
    perform({ tool: "hand", moves: "tap", at: [sqC(G, HG_ZQ)] }, () => { put({ zoom: 1 }); api.sfx.settle(); api.did("zoom"); });
  };
  const cutSquare = () => {
    const o = cur();
    if (o.zoom !== 1) { api.did("cut"); return; }
    perform({ tool: "scissors", moves: "snip", at: hgRange(1, 10).map((i) => ({ x: sliceX(i, i - 1) - HG_ZGAP / 2, y: Z.y + Z.h / 2 })), onPoint: (i: number) => put({ cutN: i + 1 }) },
      () => { const c = cur(); put({ zoom: 2, cutN: 9, slices: hgFill(c.cells[HG_ZQ] ? hgRange(0, 10) : [], 10) }); api.sfx.settle(); api.did("cut"); });
  };
  /* one tap on the picture during a step (shade one more square, shade one slice) */
  const stepTap = (pl: string, q: number) => {
    const o = cur();
    if (pl === "grid") {
      if (stepOn !== "shade") { api.did("shade"); return; }
      if (q < 0) q = o.cells.findIndex((v: boolean) => !v);
      if (o.cells[q]) { api.did("unshade"); return; }
      const l = o.cells.slice(); l[q] = true; mine({ cells: l, last: q }); api.sfx.tick(); api.did("shade");
    } else {
      if (stepOn !== "slice") { api.did("slice"); return; }
      const l = o.slices.slice(); l[q < 0 ? 0 : q] = true; mine({ slices: l }); api.sfx.tick(); api.did("slice");
    }
  };
  const act = (on: any) => {
    if (on === "cut") return n === 1 && !free ? cutColumn() : cutSquare();
    if (on === "columns" || on === "squares") return countIt(on);
    if (on === "scatter") return scatter();
    if (on === "zoom") return zoomIn();
    if (on === "shade") return stepTap("grid", -1);
    if (on === "slice") return stepTap("slice", -1);
  };
  /* ONE key for a sequence (PATTERNS §16c): its label follows the act; a 400 ms guard so one tap never also presses the next label */
  const lastKey = useRef(0);
  const pressKey = (on: string) => {
    const t = Date.now();
    if (t - lastKey.current < 400) return;
    lastKey.current = t;
    if (warm && on !== stepOn) { api.did(on); return; }    /* during a guide step only that step's key acts; after the steps, none */
    act(on);
  };
  /* Enter performs ONE step: two Enters within 400 ms never finish two */
  const lastEnter = useRef(0);
  const enterStep = () => { const t = Date.now(); if (t - lastEnter.current < 400) return; lastEnter.current = t; if (stepOn) act(stepOn); };
  /* a second tap on the same piece within 350 ms (a double tap) is one tap */
  const lastTap = useRef<any>({ pl: "", q: -1, t: 0 });
  const tapTwice = (pl: string, q: number) => {
    const t = Date.now(), l = lastTap.current;
    lastTap.current = { pl, q, t };
    return l.pl === pl && l.q === q && t - l.t < 350;
  };

  /* ── shading by drag, tap and keys ── */
  const locked = tl.busy || busy || !!own.fly;
  const gridLive = !locked && (free || (stage === "ask" && (kind === "tenth" || kind === "shade")) || (warm && n === 3 && stepOn === "shade"));
  const sliceLive = !locked && ((free && own.zoom >= 2) || (warm && n === 4 && stepOn === "slice"));
  const setSlices = (list: boolean[]) => { const cells = cur().cells.slice(); if (free) cells[HG_ZQ] = list.every(Boolean); mine({ slices: list, cells }); };
  const listOf = (o: any, pl: string) => (pl === "grid" ? o.cells : o.slices);
  const cellOf = (pl: string, p: any) => (pl === "grid" ? hgCellAt(p, G) : sliceAt(p));
  const paint = (pl: string, a: any, b: any, on: boolean) => {
    const o = cur(), list = listOf(o, pl).slice();
    let last = o.last, changed = false;
    const n8 = Math.max(1, Math.ceil(Math.hypot(b.x - a.x, b.y - a.y) / 8));
    for (let i = 0; i <= n8; i++) {
      const q = cellOf(pl, { x: a.x + ((b.x - a.x) * i) / n8, y: a.y + ((b.y - a.y) * i) / n8 });
      if (q < 0 || list[q] === on || (pl === "grid" && free && o.zoom >= 2 && q === HG_ZQ)) continue;
      list[q] = on; changed = true;
      if (on && pl === "grid") last = q;
    }
    if (changed) { if (pl === "grid") mine({ cells: list, last }); else setSlices(list); }
  };
  const tapOne = (pl: string, q: number) => {
    if (q < 0) return;
    const o = cur();
    if (pl === "grid" && free && o.zoom >= 2 && q === HG_ZQ) { setSlices(hgFill(o.slices.every(Boolean) ? [] : hgRange(0, 10), 10)); api.sfx.tick(); return; }
    const list = listOf(o, pl).slice();
    list[q] = !list[q];
    if (pl === "grid") mine({ cells: list, last: list[q] ? q : o.last }); else setSlices(list);
    api.sfx.tick();
  };
  const stroke = useRef<any>(null);
  /* the drop handler is read through a ref, so a release always sees this render's flags (the step, live, locked) */
  const dropRef = useRef<any>(null);
  const drag = useDrag((pl: any, p: any, moved: boolean) => dropRef.current && dropRef.current(pl, p, moved));
  dropRef.current = (pl: any, p: any, moved: boolean) => {
    const s = stroke.current || { p0: p, last: p, mode: null };
    stroke.current = null;
    if (!(pl === "grid" ? gridLive : sliceLive)) return;
    if (warm) { const q0 = cellOf(pl, s.p0); if (!tapTwice(pl, q0)) stepTap(pl, q0); return; }
    if (moved) {
      if (s.mode === null) { const q0 = cellOf(pl, s.p0); s.mode = !(q0 >= 0 && listOf(cur(), pl)[q0]); }
      paint(pl, s.last, p, s.mode);
      api.sfx.tick();
      return;
    }
    const q = cellOf(pl, p);
    if (!tapTwice(pl, q)) tapOne(pl, q);
  };
  useEffect(() => {
    const d = drag.drag;
    if (!d || warm) return;
    if (!(d.payload === "grid" ? gridLive : sliceLive)) { stroke.current = null; return; }   /* a stroke still held at the win or the correction paints nothing */
    if (!stroke.current) stroke.current = { p0: { x: d.x, y: d.y }, last: { x: d.x, y: d.y }, mode: null };
    const s = stroke.current;
    if (!d.moved) return;
    if (s.mode === null) { const q0 = cellOf(d.payload, s.p0); s.mode = !(q0 >= 0 && listOf(cur(), d.payload)[q0]); }
    paint(d.payload, s.last, { x: d.x, y: d.y }, s.mode);
    s.last = { x: d.x, y: d.y };
  }, [drag.drag]);
  const keysOf = (pl: string) => (e: any) => {
    if (e.repeat && (e.key === " " || e.key === "Backspace" || e.key === "Delete")) { e.preventDefault(); e.stopPropagation(); return; }   /* a held key is one press */
    if (e.key === " ") {
      e.preventDefault(); e.stopPropagation();
      if (warm) { stepTap(pl, -1); return; }
      const q = listOf(cur(), pl).findIndex((v: boolean) => !v);
      if (q >= 0) tapOne(pl, q);
    } else if ((e.key === "Backspace" || e.key === "Delete") && !warm) {
      e.preventDefault(); e.stopPropagation();
      const l = listOf(cur(), pl);
      let q = l.length - 1;
      while (q >= 0 && !l[q]) q--;
      if (q >= 0) tapOne(pl, q);
    }
    /* Enter passes to the window: it answers a shading, or performs the waiting step (PATTERNS §5b) */
  };

  /* ── the correction: steps on the demo layer, ending on the whole right answer; the child's own picture stays ── */
  const [retyped, setRetyped] = useState(false);
  const ty0 = useRef<any>(null);
  useEffect(() => {
    if (!wrong || stage !== "ask") return;
    api.lock(true);
    put({ fresh: false });
    ty0.current = typed; setRetyped(false);
    const max = hgStepsOf(it), gap = Math.max(90, Math.min(420, Math.round(2400 / max)));
    const steps: any[] = [[300, null]];
    for (let i = 1; i <= max; i++) steps.push([i === max ? 700 : gap, () => setDemo({ k, step: i })]);
    tl.run(steps, () => api.lock(false));
  }, [wrong]);
  useEffect(() => { if (wrong && typed !== ty0.current) setRetyped(true); }, [typed]);

  /* the win line (keyOnly: the phase's closing line replaces the last one, so the last question has none) */
  useEffect(() => {
    if (stage !== "win" || free) return;
    const id = n + ":" + index;
    if (id === "1:0") api.say("Yes, ten hundredths fill the cut column.");
    else if (id === "1:1") api.say("Yes, those ten squares are one tenth of the grid.");
    else if (id === "2:0") api.say("Yes, 53 hundredths is written 0.53.");
    else if (id === "2:1") api.say("Yes, six full columns make 0.6.");
    else if (id === "3:0") api.say("Yes, your 4 squares are 4 hundredths.");
    else if (id === "3:1") api.say("Yes, 21 hundredths, wherever the squares sit.");
    else if (id === "4:0") api.say("Yes, the big square holds 10 thousandths.");
    else if (id === "4:1") api.say("Yes, 3 thousandths is written 0.003.");
    else if (index === 2) api.say(PHASES[n - 1].closing);   /* a phase's last win: the bubble holds only its closing line */
  }, [stage]);

  /* Enter, the agent's check() and the dev solve() perform the waiting step; at a shading question Enter answers it */
  const shadeAsk = !free && stage === "ask" && it && it.pad === "enter";
  api.onEnter(warm && stepOn ? enterStep : shadeAsk ? () => {
    const o = cur();
    if (hgCount(o.cells) === 0) { nudged.current = k; api.say("Shade some squares first."); return; }   /* r64 leaves this hint to the tool */
    if (o.fresh) api.submit(hgCount(o.cells));
  } : null);
  useEffect(() => { if (shadeAsk) api.answerReady(!!own.fresh && hgCount(own.cells) > 0); }, [shadeAsk, k, own.cells, own.fresh]);
  HOOK.demo = () => { if (stepOn) act(stepOn); };
  HOOK.set = (v: any) => {
    const m = Math.max(0, Math.min(100, Math.round(Number(v) || 0)));
    mine({ cells: hgFill(hgRange(0, m)), last: m - 1 });
    return true;
  };

  /* what the host and the agent read back (toolApi.getState) */
  const cnt = hgCount(own.cells), cols = hgFull(own.cells);
  api.share({ shaded: cnt, columns: cols, squares: cnt - 10 * cols, zoom: own.zoom, slices: hgCount(own.slices),
    answer: shadeAsk ? cnt : null, complete: stage === "idle" });

  /* ── the picture ── */
  const blue = CONTENT.hundred, green = CONTENT.one, amber = CONTENT.ten;
  const greenInk = shade(green, 0.25);
  const hund = (x: number) => x + " " + tx(x === 1 ? "hundredth" : "hundredths");
  const thou = (x: number) => x + " " + tx(x === 1 ? "thousandth" : "thousandths");
  const sqs = (x: number) => x + " " + tx(x === 1 ? "square" : "squares");
  const colsSq = (a: number, b: number) => [a > 0 ? a + " " + tx(a === 1 ? "column" : "columns") : "", b > 0 || a === 0 ? sqs(b) : ""].filter(Boolean).join(" ");
  const childGrid = kind === "tenth" || kind === "shade" || kind === "free" || kind === "w3";
  const onGrid = childGrid ? own.cells : kind === "w2" ? hgGiven(HG_W2) : hgGiven(it);
  const fly = own.fly;
  const shown = fly ? onGrid.map((v: boolean, q: number) => v && !fly.from.includes(q)) : onGrid;
  const gridFill = childGrid && rev ? green : blue;

  /* phase 1: the column cut out of the grid */
  const colOut = kind === "w1" || kind === "cut";
  const lift = kind === "cut" || (kind === "w1" && own.lift);
  const split = kind === "cut" ? 9 : own.split;
  const colX = lift ? LX : G.x + 9 * G.s;
  const tr = rm ? undefined : "transform 420ms cubic-bezier(.3,.1,.3,1)";

  /* phase 4: the zoomed square */
  const zState = kind === "w4" || kind === "free" ? own.zoom : zoomLay ? 2 : 0;
  const zCut = kind === "w4" || kind === "free" ? (own.zoom >= 2 ? 9 : own.cutN) : 9;
  const zSlices = kind === "w4" || kind === "free" ? own.slices : hgGivenSlices(it);

  /* the cards: fr = { t, b, tone }, de = { w, d, tone, lit } */
  let fr: any = null, de: any = null, cardsOn = false;
  if (kind === "one") { cardsOn = true; if (sol) { fr = { t: String(it.k), b: "100", tone: "result" }; de = { w: "0", d: String(it.k).padStart(2, "0"), tone: "result" }; } }
  else if ((kind === "w1" && own.split >= 9) || kind === "cut") { cardsOn = true; fr = { t: "1", b: "100", tone: "given" }; de = { w: "0", d: "01", tone: "given" }; }   /* one hundredth, beside its square */
  else if (kind === "read" || kind === "readf") {
    cardsOn = true;
    const h = it.cols * 10 + it.ones;
    if (sol) { fr = { t: String(h), b: "100", tone: "result" }; de = { w: "0", d: kind === "read" ? it.answer[1] : String(h).padStart(2, "0"), tone: "result" }; }
  } else if (kind === "shade") {
    cardsOn = true;
    de = { w: "0", d: it.dec.split(".")[1], tone: sol ? "result" : "given" };
    if (sol) fr = { t: String(it.answer), b: "100", tone: "result" };
  } else if (kind === "thou" || kind === "thouf") {
    cardsOn = true;
    const d3 = String(it.th).padStart(3, "0");
    if (sol) { fr = { t: String(it.th), b: "1000", tone: "result" }; de = { w: "0", d: d3, tone: "result" }; }
    else if (kind === "thou" && ds > it.th) de = { w: "0", d: d3, tone: "given", lit: 2 };
  } else if (kind === "w2") { cardsOn = true; if (own.cs >= 8) { fr = { t: "38", b: "100", tone: "given" }; de = { w: "0", d: "38", tone: "given" }; } }
  else if (kind === "w3") { cardsOn = true; de = { w: "0", d: "06", tone: "given" }; if (cnt >= 6) fr = { t: String(cnt), b: "100", tone: "given" }; }
  else if (kind === "w4") { cardsOn = own.zoom >= 2; const t = hgCount(own.slices); if (t > 0) { fr = { t: String(t), b: "1000", tone: "given" }; de = { w: "0", d: String(t).padStart(3, "0"), tone: "given" }; } }
  else if (kind === "free") {
    cardsOn = true;
    const base = hgCount(own.cells.map((v: boolean, q: number) => v && !(own.zoom >= 2 && q === HG_ZQ)));
    const t = own.zoom >= 2 ? base * 10 + hgCount(own.slices) : cnt * 10;
    if (t > 0 && t % 10 === 0) { const h = t / 10; fr = { t: String(h), b: "100", tone: "given" }; de = h >= 100 ? { w: "1", d: "00", tone: "given" } : { w: "0", d: String(h).padStart(2, "0"), tone: "given" }; }
    else if (t > 0) { fr = { t: String(t), b: "1000", tone: "given" }; de = { w: "0", d: String(t).padStart(3, "0"), tone: "given" }; }
  }
  /* answering ON the card (PATTERNS §9e): the asked card blinks; a tap opens the keypad; the digits fill its boxes */
  const asked = it && it.parts ? (it.parts === SLOT_DECIMAL ? "de" : "fr") : null;
  const askNow = !!asked && stage === "ask";
  const tp = askNow ? ((slotPartsOf(typed || "", 2) || []) as any[]).map((x: any) => (x === null || x === undefined ? "" : String(x))) : ["", ""];
  const open = !!(box && box.open);
  if (askNow && (!wrong || retyped)) {
    if (asked === "fr") fr = { t: tp[0] || "", b: tp[1] || "", tone: "typed" };
    else de = { w: tp[0] || "", d: tp[1] || "", tone: "typed" };
  }
  const AR = asked === "de" ? DE : FR;
  const tapCard = askNow && !locked && !open;
  const partsOpen = askNow && !locked && open;
  const pBoxes = asked === "fr" ? [{ x: FR.x, y: FR.y + 48, w: FR.w, h: 82 }, { x: FR.x, y: FR.y + 130, w: FR.w, h: FR.h - 130 }]
    : [{ x: DE.x, y: DE.y, w: 106, h: DE.h }, { x: DE.x + 106, y: DE.y, w: DE.w - 106, h: DE.h }];
  const cardO = (c: string) => ({ open: partsOpen && asked === c, part, caret: partsOpen && asked === c && (!wrong || retyped) });

  /* the counter under the grid: the shading read as full columns and single squares */
  let counter: string | null = null, counterInk = C.ink;
  const rd = kind === "read" || kind === "readf";
  const rMax = rd ? it.cols + it.ones + 1 : 0, rs = rd ? (sol ? rMax : ds) : 0;
  /* the "shade one tenth" question shows no counter while it is open ("1 column" at 10 would answer it); its correction does */
  if (kind === "free") counter = cnt > 0 ? colsSq(cols, cnt - 10 * cols) : null;
  if (kind === "shade" || kind === "w3") counter = cnt > 0 ? colsSq(cols, cnt - 10 * cols) : null;
  if (kind === "w2" && own.cc > 0) counter = colsSq(own.cc, own.cs);
  if ((kind === "tenth" && (rev || ds >= 11)) || (kind === "cut" && sol)) { counter = hund(10); counterInk = greenInk; }
  if (kind === "shade" && !rev && ds >= 1) counter = hund(cnt);
  if (kind === "shade" && rev) { counter = hund(it.answer); counterInk = greenInk; }
  if (rd && rs >= 1) {
    const t = Math.min(rs, it.cols) * 10 + Math.max(0, Math.min(rs - it.cols, it.ones));
    counter = rs >= rMax ? hund(it.cols * 10 + it.ones) : sqs(t);
    if (rs >= rMax) counterInk = greenInk;
  }
  if (kind === "thouf" && !sol && ds >= 1 && ds <= 4) counter = thou(10 * ds);
  if (kind === "thouf" && (sol || ds >= 5)) { counter = thou(it.th); counterInk = greenInk; }
  if (kind === "count10" && sol) { counter = thou(10); counterInk = greenInk; }

  /* the act keys: ONE key for a sequence, under the cards; in free play the two real choices */
  const keys: any[] = [];
  const K1 = { x: 560, y: H - 96, w: 220, h: 80 }, K2 = { x: 430, y: H - 96, w: 290, h: 80 }, K3 = { x: 430, y: H - 96, w: 220, h: 80 };
  const K4 = { x: Z.x, y: kind === "free" ? 186 : 250, w: 200, h: 72 }, KF = { x: Z.x + 220, y: 186, w: 200, h: 72 };   /* under the strip, clear above the cards */
  if (kind === "w1" && own.split < 9) keys.push({ id: "cut", label: "Cut", ...K1, on: true });
  if (kind === "w2" && own.cc < 3) keys.push({ id: "columns", label: "Count columns", ...K2, on: true });
  else if (kind === "w2" && own.cs < 8) keys.push({ id: "squares", label: "Count squares", ...K2, on: true });
  if (kind === "w3" && stepOn === "scatter") keys.push({ id: "scatter", label: "Scatter", ...K3, on: true });
  if ((kind === "w4" || kind === "free") && own.zoom < 2) keys.push({ id: own.zoom < 1 ? "zoom" : "cut", label: own.zoom < 1 ? "Zoom" : "Cut", ...K4, on: true });
  if (kind === "free") keys.push({ id: "scatter", label: "Scatter", ...KF, on: cnt > (own.zoom >= 2 && own.cells[HG_ZQ] ? 1 : 0) && !locked });

  const gridProps = gridLive ? { ...control("shade", tx("Hundred grid: tap or drag to shade squares")), ...drag.bind("grid"), onKeyDown: keysOf("grid") } : {};
  const sliceProps = sliceLive ? { ...control("slice", tx("Big square: tap a thin slice to shade it")), ...drag.bind("slice"), onKeyDown: keysOf("slice") } : {};
  const two = kind === "who";
  /* phase 2: the tens counted so far, one chip over the column it counts (never written on the squares). Neighbouring columns
     are 35 apart and a chip is 60 wide, so the chips stand in two staggered rows, each tied to its column by a short amber line */
  const tenChip = (j: number, s: string) => {
    const cx = G.x + (j + 0.5) * G.s, cy = j % 2 ? 52 : 6;
    return (
      <g key={"ch" + j}>
        <line x1={cx} y1={cy + 40} x2={cx} y2={G.y - 3} stroke={amber} strokeWidth={3} />
        <rect x={cx - 30} y={cy} width={60} height={40} rx={10} fill={HG_WARM} stroke={amber} strokeWidth={3} />
        <text x={cx} y={cy + 34} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={C.ink}>{s}</text>
      </g>
    );
  };
  const nums = (zCut >= 9) && ((kind === "count10" && (sol || ds > 0)) || (kind === "thou" && (sol || ds > 0)) || (kind === "thouf" && (sol || ds >= 5)));
  const slNum = (i: number, s: string) => (
    <text key={"sn" + i} x={sliceX(i, 9) + SW / 2} y={Z.y + Z.h + 44} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={HG_INK}>{s}</text>
  );

  return (
    <g>
      {/* the labels above the grid */}
      {two ? (
        <g>
          {/* the correction's verdict is in the label row: each child's name becomes "... shows 0.14" */}
          {hgLab("la", GA.x + 5 * GA.s, 36, tx(sol || ds >= 1 ? "Asha shows 0.14" : "Asha"), T.label, sol || ds >= 1 ? greenInk : C.ink)}
          {hgLab("lb", GB.x + 5 * GB.s, 36, tx(sol || ds >= 2 ? "Bina shows 0.14" : "Bina"), T.label, sol || ds >= 2 ? greenInk : C.ink)}
        </g>
      ) : p2Lay ? hgLab("lw", G.x + 10 * G.s, 40, tx("Whole"), T.label, C.ink, "end") : hgLab("lw", gx, 36, tx("Whole"), T.label, C.ink)}

      {/* the grid (a drag surface while the child shades it) */}
      {two ? (
        <g>
          {hgGridRects("ga", GA, hgGiven(it), blue)}
          {hgGridRects("gb", GB, hgFill(HG_B), blue)}
        </g>
      ) : (
        <g {...gridProps}>
          {hgGridRects("g", G, shown, gridFill, colOut ? (q: number) => q >= 90 : zoomLay && zState >= 2 ? (q: number) => q === HG_ZQ : undefined, colOut && lift ? 9 : 10)}
          {zoomLay && zState >= 2 && (
            <g>
              <rect x={G.x + 9 * G.s} y={G.y} width={G.s} height={G.s} fill={HG_WARM} stroke={HG_INK} strokeWidth={2.4} />
              {zSlices.map((v: boolean, i: number) => v && <rect key={"zm" + i} x={G.x + 9 * G.s + (i * G.s) / 10} y={G.y} width={G.s / 10} height={G.s} fill={blue} />)}
            </g>
          )}
        </g>
      )}

      {/* phase 1: the column of ten squares, cut out of the grid and spread apart */}
      {colOut && (
        <g pointerEvents="none">
          {lift && <rect x={G.x + 9 * G.s} y={G.y} width={G.s} height={10 * G.s} fill="none" stroke={HG_INK} strokeWidth={2} strokeDasharray="8 8" />}
          {hgRange(0, 10).map((r) => (
            <rect key={"lc" + r} x={0} y={0} width={G.s} height={G.s} fill={HG_WARM} stroke={HG_INK} strokeWidth={2.4}
              style={{ transform: `translate(${colX}px, ${liftY(r, split)}px)`, transition: tr } as any} />
          ))}
          {!lift && <rect x={G.x + 9 * G.s - 2} y={G.y - 2} width={G.s + 4} height={10 * G.s + 4} fill="none" stroke={amber} strokeWidth={5} />}
          <text x={0} y={0} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink} stroke={HG_WARM} strokeWidth={7} strokeLinejoin="round" paintOrder="stroke"
            style={{ transform: `translate(${colX + G.s / 2 + (lift ? 0 : -28)}px, 36px)`, transition: tr } as any}>{tx("1 tenth")}</text>
          {lift && split >= 9 && hgLab("lh", LX + G.s + 14, G.y + 30, tx("1 hundredth"), T.label, C.ink, "start")}
        </g>
      )}

      {/* phase 4: the outlined square, and the same square zoomed beside the grid, cut into thin slices */}
      {zoomLay && <rect x={G.x + 9 * G.s - 1} y={G.y - 1} width={G.s + 2} height={G.s + 2} fill="none" stroke={amber} strokeWidth={5} pointerEvents="none" />}
      {zoomLay && zState >= 1 && (
        <g>
          <line x1={G.x + 10 * G.s + 3} y1={G.y} x2={Z.x} y2={Z.y} stroke={HG_INK} strokeWidth={1.6} strokeDasharray="6 6" pointerEvents="none" />
          <line x1={G.x + 10 * G.s + 3} y1={G.y + G.s} x2={Z.x} y2={Z.y + Z.h} stroke={HG_INK} strokeWidth={1.6} strokeDasharray="6 6" pointerEvents="none" />
          {hgLab("zh", sliceX(9, zCut) + SW, 36, tx("1 hundredth"), T.label, C.ink, "end")}
          <g {...sliceProps}>
            {/* the gaps between the slices belong to the big square too, so a tap there still shades the nearest slice */}
            <rect x={Z.x - 6} y={Z.y - 6} width={sliceX(9, zCut) + SW - Z.x + 12} height={Z.h + 12} fill="transparent" />
            {hgRange(0, zCut + 1).map((p) => {
              const a = p, b = p < zCut ? p : 9, x = sliceX(a, zCut);
              return (
                <g key={"zp" + p}>
                  <rect x={x} y={Z.y} width={(b - a + 1) * SW} height={Z.h} fill={HG_WARM} />
                  {hgRange(a, b + 1).map((i) => zSlices[i] && <rect key={"zf" + i} x={x + (i - a) * SW} y={Z.y} width={SW} height={Z.h} fill={blue} />)}
                  <rect x={x} y={Z.y} width={(b - a + 1) * SW} height={Z.h} fill="none" stroke={HG_INK} strokeWidth={zCut ? 2.4 : 4.5} />
                </g>
              );
            })}
          </g>
          {zCut >= 9 && (
            <g pointerEvents="none">
              <line x1={Z.x + SW / 2} y1={40} x2={Z.x + SW / 2} y2={Z.y - 3} stroke={HG_INK} strokeWidth={3} />
              {hgLab("zt", Z.x, 36, tx("1 thousandth"), T.label, C.ink, "start")}
            </g>
          )}
        </g>
      )}

      {/* the cards, the asked one blinking until it is tapped */}
      {cardsOn && hgFracCard(C, tx, FR, fr, cardO("fr"))}
      {cardsOn && hgDecCard(C, tx, DE, de, cardO("de"))}
      {cardsOn && tapCard && (
        <g>
          <rect className="c4-nextblink" x={AR.x - 9} y={AR.y - 9} width={AR.w + 18} height={AR.h + 18} rx={26} fill="none" stroke={C.accent} strokeWidth={5} pointerEvents="none" />
          <Hit id="answer-open" x={AR.x} y={AR.y} w={AR.w} h={AR.h} onPress={() => api.openAnswer()} label={tx(asked === "de" ? "Decimal card: tap to answer" : "Fraction card: tap to answer")} />
        </g>
      )}
      {cardsOn && partsOpen && pBoxes.map((b, j) => (
        <Hit key={"pp" + j} id={"part-" + (j + 1)} x={b.x} y={b.y} w={b.w} h={b.h} enabled={part !== j} onPress={() => api.pickPart(j)}
          label={tx(asked === "de" ? (j ? "Decimal part" : "Whole part") : (j ? "Bottom number" : "Top number"))} />
      ))}

      {counter !== null && hgLab("ct", gx, gBase, counter, counter.length > 14 ? 34 : T.prompt, counterInk)}

      {/* the act keys */}
      {keys.map((b, j) => (
        <Key key={"act" + j} id={b.id} label={tx(b.label)} x={b.x} y={b.y} w={b.w} h={b.h} C={C} tone="key" disabled={!b.on} onClick={() => pressKey(b.id)}>
          {/* a key that cannot act now keeps a readable dark ink on its quiet face */}
          <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={b.on ? toneInk("key", C.ink) : "#55595C"}>{tx(b.label)}</text>
        </Key>
      ))}

      {/* the demo layer: worked steps, counts and lit places; never takes a press */}
      <g pointerEvents="none">
        {/* phase 2 warm-up: the columns and squares as the hand counts them */}
        {kind === "w2" && hgRange(0, own.cc).map((c) => <rect key={"wc" + c} x={G.x + c * G.s} y={G.y} width={G.s} height={10 * G.s} fill="none" stroke={amber} strokeWidth={5} />)}
        {/* the tens so far as the hand counts (10, 20, 30) */}
        {kind === "w2" && hgRange(0, own.cc).map((c) => tenChip(c, String((c + 1) * 10)))}
        {kind === "w2" && hgRange(0, own.cs).map((r) => <rect key={"wo" + r} x={G.x + 3 * G.s + 4} y={G.y + r * G.s + 4} width={G.s - 8} height={G.s - 8} fill="none" stroke={amber} strokeWidth={4} />)}

        {/* phase 1, Q1: the cut column's squares counted one by one */}
        {kind === "cut" && hgRange(0, sol ? 10 : Math.min(ds, 10)).map((r) => hgLab("ln" + r, LX - 10, liftY(r, 9) + G.s / 2 + 14, String(r + 1), T.prompt, HG_INK, "end"))}
        {/* phase 1, Q2: one column of the grid filled square by square: a tenth in hundredths */}
        {kind === "tenth" && !rev && ds > 0 && (
          <g>
            {hgRange(0, Math.min(ds, 10)).map((r) => <rect key={"tg" + r} x={G.x + 9 * G.s} y={G.y + r * G.s} width={G.s} height={G.s} fill={green} fillOpacity={0.55} />)}
            <rect x={G.x + 9 * G.s - 2} y={G.y - 2} width={G.s + 4} height={10 * G.s + 4} fill="none" stroke={amber} strokeWidth={5} />
            {hgRange(0, Math.min(ds, 10)).map((r) => hgLab("tn" + r, G.x + 10 * G.s + 12, G.y + r * G.s + G.s / 2 + 14, String(r + 1), T.prompt, HG_INK, "start"))}
            {ds >= 11 && hgLab("tt", G.x + 9.5 * G.s - 28, 36, tx("1 tenth"), T.label, C.ink)}
          </g>
        )}
        {/* phase 1, Q3: a square beside its column */}
        {kind === "one" && (sol || ds >= 1) && (
          <g>
            <rect x={G.x + 9 * G.s - 2} y={G.y - 2} width={G.s + 4} height={10 * G.s + 4} fill="none" stroke={amber} strokeWidth={5} />
            {hgLab("ot", G.x + 9.5 * G.s - 28, 36, tx("1 tenth"), T.label, C.ink)}
          </g>
        )}
        {kind === "one" && (sol || ds >= 2) && (
          <g>
            <rect x={G.x + 9 * G.s - 3} y={G.y - 3} width={G.s + 6} height={it.k * G.s + 6} fill="none" stroke={amber} strokeWidth={5} />
            {hgLab("oh", G.x + 10 * G.s + 14, G.y + 30, hund(it.k), T.label, C.ink, "start")}
          </g>
        )}

        {/* phase 2: full columns counted in tens, then the single squares */}
        {rd && hgRange(0, Math.min(rs, it.cols)).map((c) => (
          <g key={"rc" + c}>
            <rect x={G.x + c * G.s} y={G.y} width={G.s} height={10 * G.s} fill="none" stroke={amber} strokeWidth={5} />
            {tenChip(c, String((c + 1) * 10))}
          </g>
        ))}
        {rd && hgRange(0, Math.max(0, Math.min(rs - it.cols, it.ones))).map((j) => (
          <rect key={"ro" + j} x={G.x + it.cols * G.s + 4} y={G.y + j * G.s + 4} width={G.s - 8} height={G.s - 8} fill="none" stroke={amber} strokeWidth={4} />
        ))}

        {/* phase 3: a second grid with the asked number of single squares; the square one too many lit amber */}
        {kind === "shade" && !rev && ds >= 1 && cnt > it.answer && own.last >= 0 && (
          <rect x={G.x + Math.floor(own.last / 10) * G.s - 3} y={G.y + (own.last % 10) * G.s - 3} width={G.s + 6} height={G.s + 6} fill="none" stroke={amber} strokeWidth={5} />
        )}
        {kind === "shade" && !rev && ds >= 2 && (
          <g>
            {hgGridRects("mg", MG, hgFill(hgRange(0, Math.min(ds - 1, it.answer))), green)}
            {hgLab("ml", MG.x + 5 * MG.s, 36, hund(Math.min(ds - 1, it.answer)), T.label, greenInk)}
          </g>
        )}
        {/* phase 3, Q3: each grid counted */}
        {two && (sol || ds >= 1) && hgLab("wa", GA.x + 5 * GA.s, GA.y + 10 * GA.s + 54, sqs(10 * it.aCols + it.aOnes), T.label, greenInk)}
        {two && (sol || ds >= 2) && hgLab("wb", GB.x + 5 * GB.s, GB.y + 10 * GB.s + 54, sqs(HG_B.length), T.label, greenInk)}
        {two && (sol || ds >= 3) && (
          <g>
            <rect x={GA.x - 6} y={GA.y - 6} width={10 * GA.s + 12} height={10 * GA.s + 12} rx={8} fill="none" stroke={green} strokeWidth={6} />
            <rect x={GB.x - 6} y={GB.y - 6} width={10 * GB.s + 12} height={10 * GB.s + 12} rx={8} fill="none" stroke={green} strokeWidth={6} />
            {/* a tick on each grid's count line (off the grid), and the verdict line under both grids */}
            {[GA, GB].map((g, j) => (
              <path key={"tc" + j} d={`M ${g.x + 10} ${g.y + 10 * g.s + 38} l 10 10 l 20 -24`} fill="none" stroke={green} strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" />
            ))}
            {hgLab("wt", (GA.x + GB.x + 10 * GB.s) / 2, GA.y + 10 * GA.s + 100, tx("Both show 0.14"), T.label, greenInk)}
          </g>
        )}
        {/* the child's own choice, outlined like its key (plain ink: never marked), beside the grids while the correction stands */}
        {two && wrong && !rev && ds >= 1 && (() => {
          const ch: any = HG_CHOICES.find((c) => c.id === String(wrong.value));
          const cx = GB.x + 10 * GB.s + 40;
          return ch ? (
            <g>
              {hgLab("yc", cx, 150, tx("You chose"), T.label, C.ink, "start")}
              <rect x={cx} y={170} width={190} height={76} rx={18} fill={HG_WARM} stroke={C.ink} strokeWidth={4} />
              <text x={cx + 95} y={222} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={C.ink}>{tx(ch.label)}</text>
            </g>
          ) : null;
        })()}

        {/* phase 4: the slices numbered; tens of thousandths on the grid's squares */}
        {kind === "count10" && nums && hgRange(0, sol ? 10 : Math.min(ds, 10)).map((i) => slNum(i, String(i + 1)))}
        {kind === "thou" && nums && hgRange(0, sol ? it.th : Math.min(ds, it.th)).map((i) => slNum(i, String(i + 1)))}
        {/* the squares counted in tens are ringed, never written on; the running count is on the counter line */}
        {kind === "thouf" && hgRange(0, Math.floor(it.th / 10)).map((r) => (sol || ds > r) && (
          <rect key={"tf" + r} x={G.x + 3} y={G.y + r * G.s + 3} width={G.s - 6} height={G.s - 6} fill="none" stroke={amber} strokeWidth={4} />
        ))}
        {kind === "thouf" && nums && slNum(0, "1")}
        {/* why the whole is 1,000: 100 squares, 10 slices each, on one line under the strip */}
        {kind === "thouf" && (sol || ds >= 6) && hgLab("tx1", Z.x + 2 * SW + 24, Z.y + Z.h + 44, tx("100 × 10 = 1,000"), T.label, greenInk, "start")}
      </g>

      {/* Scatter: the shaded squares lift off and settle in new places */}
      {fly && (
        <g pointerEvents="none">
          {fly.from.map((q: number, i: number) => {
            const a = fly.go ? fly.to[i] : q;
            return (
              <rect key={"f" + i} x={0} y={0} width={G.s} height={G.s} fill={blue} stroke={HG_INK} strokeWidth={2.4} filter="url(#fLift)"
                style={{ transform: `translate(${G.x + Math.floor(a / 10) * G.s}px, ${G.y + (a % 10) * G.s}px)`, transition: rm ? undefined : "transform 950ms cubic-bezier(.3,.1,.3,1)" } as any} />
            );
          })}
        </g>
      )}

      {/* the one invite: on the key the step waits for, a white square, a slice, or the empty grid of a shading question */}
      {keys.length > 0 && warm && stepOn && keys[0].id === stepOn && !locked && <Invite x={keys[0].x + keys[0].w / 2} y={keys[0].y + keys[0].h / 2} w={keys[0].w} h={keys[0].h} rx={18} C={C} />}
      {warm && stepOn === "shade" && !locked && <Invite x={G.x + 1.5 * G.s} y={G.y + 0.5 * G.s} w={G.s} h={G.s} rx={4} C={C} />}
      {warm && stepOn === "slice" && !locked && <Invite x={Z.x + SW / 2} y={Z.y + Z.h / 2} w={SW} h={Z.h} rx={4} C={C} />}
      {shadeAsk && cnt === 0 && !locked && ds === 0 && <Invite x={G.x + G.s / 2} y={G.y + G.s / 2} w={G.s} h={G.s} rx={4} C={C} />}
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase */
function Thumb({ result, it, n, C, w, h, tx = (v: any) => v }: any) {
  const last = result && result.last;
  if (!last || last.value === null || last.value === undefined) return null;
  const item: any = it || last.it || ((PHASES[(n || 1) - 1] || PHASES[0]) as any).items[last.item] || {};
  const v = last.value;
  const s = Math.max(4, Math.min(7, Math.floor((h - 16) / 10))), x0 = 12, y0 = Math.round((h - 10 * s) / 2);
  const ink = shade(CONTENT.one, 0.25);
  let on = hgGiven(item);
  if (item.kind === "tenth" || item.kind === "shade") on = hgFill(hgRange(0, Number(v) || 0));
  if (item.kind === "cut") on = hgFill(hgRange(90, 100));
  const strip = item.kind === "count10" || item.kind === "thou";
  const sl = item.kind === "thou" ? hgFill(hgRange(0, item.th), 10) : hgFill([], 10);
  const pv = (slotPartsOf(v, 2) || []) as any[];
  const word = item.choices ? tx(((item.choices.find((c: any) => c.id === String(v)) || {}) as any).label || String(v)) : null;
  const txt = word || (item.parts === SLOT_DECIMAL ? pv[0] + "." + pv[1] : item.parts ? null : String(v));
  /* the two children's grids, side by side: both show 0.14 (no word, so no language can leave one in English) */
  if (item.kind === "who") return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      {hgGridRects("ta", { x: x0, y: y0, s }, on, CONTENT.one)}
      {hgGridRects("tb", { x: x0 + 10 * s + 20, y: y0, s }, hgFill(HG_B), CONTENT.one)}
    </g>
  );
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      {strip ? hgRange(0, 10).map((i) => <rect key={i} x={x0 + i * s} y={y0} width={s} height={10 * s} fill={sl[i] ? CONTENT.hundred : HG_WARM} stroke={HG_INK} strokeWidth={0.8} />)
        : hgGridRects("t", { x: x0, y: y0, s }, on, CONTENT.hundred)}
      {txt === null ? (
        <g>
          <text x={w - 70} y={h / 2 - 8} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={ink}>{String(pv[0])}</text>
          <line x1={w - 110} y1={h / 2} x2={w - 30} y2={h / 2} stroke={HG_INK} strokeWidth={3} strokeLinecap="round" />
          <text x={w - 70} y={h / 2 + 30} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={ink}>{String(pv[1])}</text>
        </g>
      ) : (
        <text x={w - 16} y={h / 2 + 11} textAnchor="end" fontSize={T.label} fontWeight={700} fill={ink}>{txt}</text>
      )}
    </g>
  );
}

function HundredGrid(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, fitHost: () => null,
      board: true,
      keyOnly: true,
      bigPad: true,
      nextKey: true,
      navDots: true,
      cardAnswer: true,
      StartArt, START_HOOK,
      }} />
  );
}

export default HundredGrid;
