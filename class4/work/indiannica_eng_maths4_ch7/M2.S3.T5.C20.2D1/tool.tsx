/* ═══ M2.S3.T5.C20.2D1 · same_amount_bench · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the working area already exists
   (header, canvas, key corner, bubble, Kiko, phase dots, window.toolApi, sounds, scoring). THE LESSON IS SILENT (r28): the bubble is
   the guide, one sentence a screen, nothing moves on unless the child acts. Every act is performed on screen with api.act.
   THE NEW LOOK: keyOnly + navDots + cardAnswer + bigPad + nextKey. The scene is 900 wide (the open-panel room) and is centred
   while the panel is shut; every fraction answer is typed ON a card the picture draws (answer-open / part-1 / part-2).
   Edit, never rewrite. Concepts are verbatim (check compares them). */

const TOOL_ID = "same_amount_bench";
const MEDIA_ID = "M2.S3.T5.C20.2D1";
const TOOL_NAME = "Same Amount Bench";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
/* kept for the tool object's shape (and the sidecar); nothing speaks from r30 */
const VOICE = {"rate":0.92,"pitch":1.06};

/* printed on the bubble before phase 1's teach lines only (the plan's opening line; not shown when phase 1 has steps) */
const OPENING = ["Two strips of one length, both starting at the same edge. Fill each from its own fraction."];
/* the whole-tool line: printed on the summary page */
const FINISH_LINE = "One amount wearing a great many names, and a test that still works with the pictures put away.";
/* printed when the child opens Free play; its LAST piece stays on the bubble. It names only what free play wires. */
const FREE_LINE = "Free play. Set any fraction, multiply or divide it, and run the multiples.";

/* THE START PAGE: the object the lesson is about (two strips from one edge, the colour stopping together) and one question */
const START_HOOK = "Can two fractions look different and be the same amount?";
function StartArt({ box, C, lang, tx }: any) {
  const x0 = 130, len = 900, h = 100, y1 = 56, y2 = 186;
  return (
    <g>
      <rect x={x0 - 22} y={y1 - 22} width={9} height={y2 - y1 + h + 44} rx={4.5} fill={SAB_LINE} />
      <SabStrip x={x0} w={len} y={y1} h={h} n={2} a={1} />
      <SabStrip x={x0} w={len} y={y2} h={h} n={4} a={2} />
    </g>
  );
}

/* Hindi and Gujarati (docs/PATTERNS.md §11), keyed by the English line byte for byte. Digits stay Latin. Terms: fraction भिन्न / અપૂર્ણાંક,
   upper number ऊपर की संख्या / ઉપરની સંખ્યા, lower number नीचे की संख्या / નીચેની સંખ્યા (अंश / हर, અંશ / છેદ only where the English says numerator / denominator), equivalent fraction तुल्य भिन्न / સમાન અપૂર્ણાંક, product गुणनफल / ગુણનફળ, cross multiply
   तिरछा गुणा / ત્રાંસો ગુણાકાર, multiples गुणज / ગુણિત, amount मात्रा / માત્રા. A first draft that wants a native speaker's read. */
const TR: any = {
  hi: {
    "Same Amount Bench": "बराबर मात्रा बेंच",
    "Free play. Set any fraction, multiply or divide it, and run the multiples.": "मुक्त खेल। कोई भी भिन्न चुनो, उसे गुणा या भाग करो, और गुणज दिखाओ।",
    "Can two fractions look different and be the same amount?": "क्या दो भिन्न अलग दिखें और फिर भी बराबर मात्रा हों?",
    "Same amount, different writing": "बराबर मात्रा, अलग लिखावट",
    "Tap the top strip to cut it into parts and fill them.": "ऊपर वाली पट्टी पर टैप करो, उसे काटो और भरो।",
    "Tap the strip at the top.": "सबसे ऊपर वाली पट्टी पर टैप करो।",
    "Now tap the strip underneath it.": "अब उसके नीचे वाली पट्टी पर टैप करो।",
    "Tap the lower strip.": "नीचे वाली पट्टी पर टैप करो।",
    "Tap Guide to drop a line from the end of the first colour.": "गाइड पर टैप करो और पहले रंग के सिरे से रेखा खींचो।",
    "Tap the Guide key at the side.": "बगल की गाइड कुंजी पर टैप करो।",
    "Fractions that look different can be the same amount and are called equivalent.": "अलग दिखने वाले भिन्न भी बराबर मात्रा हो सकते हैं और तुल्य भिन्न कहलाते हैं।",
    "You learned: fractions that look different can be the same amount.": "तुमने सीखा: अलग दिखने वाले भिन्न भी बराबर मात्रा हो सकते हैं।",
    "all three the same": "तीनों बराबर",
    "Which of these three strips of one length shows the most?": "एक ही लंबाई की इन तीन पट्टियों में कौन सबसे ज़्यादा दिखाती है?",
    "Which shows the most?": "सबसे ज़्यादा कौन?",
    "top strip": "ऊपर की पट्टी",
    "middle strip": "बीच की पट्टी",
    "Bigger numbers do not mean more, so lay all three strips and look.": "बड़ी संख्याओं का मतलब ज़्यादा नहीं, तीनों पट्टियाँ भरकर देखो।",
    "All three colours stop in one place, so they hold the same amount.": "तीनों रंग एक ही जगह रुकते हैं, इसलिए मात्रा बराबर है।",
    "the same amount": "बराबर मात्रा",
    "Two children eat bars of one size, as the strips show: who ate more?": "दो बच्चों ने बराबर आकार की पट्टियाँ खाईं: किसने ज़्यादा खाया?",
    "Who ate more?": "किसने ज़्यादा खाया?",
    "lower strip": "निचली पट्टी",
    "neither": "कोई नहीं",
    "An eighth is smaller than a quarter, and two are taken: where does each stop?": "आठवाँ भाग चौथाई से छोटा है, पर दो लिए हैं: प्रत्येक रंग कहाँ रुकता है?",
    "Two eighths fill what one quarter fills, so neither ate more.": "दो आठवें भाग एक चौथाई के बराबर हैं, इसलिए किसी ने ज़्यादा नहीं खाया।",
    "Do the two strips show the same amount?": "क्या दोनों पट्टियाँ बराबर मात्रा दिखाती हैं?",
    "The same amount?": "बराबर मात्रा?",
    "yes": "हाँ",
    "no": "नहीं",
    "Lay both strips and see whether the two colours stop together.": "दोनों पट्टियाँ भरो और देखो कि दोनों रंग साथ रुकते हैं या नहीं।",
    "Yes, the colours stop together, so it is one amount written two ways.": "हाँ, रंग साथ रुकते हैं, यानी एक ही मात्रा दो तरह से लिखी है।",
    "Building one by multiplying": "गुणा करके नया भिन्न बनाना",
    "Tap ×2 to double both numbers of the fraction on the first strip.": "×2 पर टैप करके पहली पट्टी के भिन्न की दोनों संख्याएँ दुगुनी करो।",
    "Tap the ×2 key under the strips.": "पट्टियों के नीचे ×2 कुंजी दबाओ।",
    "Now tap ×3 to multiply both numbers by three.": "अब ×3 पर टैप करके दोनों संख्याओं को तीन से गुणा करो।",
    "The ×3 key is the one beside it.": "×3 कुंजी उसके बगल में है।",
    "You learned: multiply both numbers by one number; the amount stays.": "तुमने सीखा: दोनों संख्याओं को एक ही संख्या से गुणा करो; मात्रा वही रहती है।",
    "Multiply both numbers by one number to build an equivalent fraction.": "दोनों संख्याओं को एक ही संख्या से गुणा करके तुल्य भिन्न बनाओ।",
    "Build an equivalent fraction": "तुल्य भिन्न बनाओ",
    "What did you multiply the upper number by, and the lower one?": "तुमने ऊपर की संख्या को किससे गुणा किया, और नीचे की को?",
    "Both numbers grew together, and the colour stopped in the very same place.": "दोनों संख्याएँ साथ बढ़ीं और रंग ठीक उसी जगह रुका।",
    "Now multiply both numbers by three and write what you get.": "अब दोनों संख्याओं को तीन से गुणा करो और जो मिले लिखो।",
    "Both numbers times three": "दोनों संख्याएँ तीन गुनी",
    "Do the upper and the lower number get the same multiplier?": "क्या ऊपर और नीचे की संख्या को एक ही संख्या से गुणा किया?",
    "Three times each number made a new name for the same amount.": "प्रत्येक संख्या को तीन से गुणा करने पर उसी मात्रा का नया नाम मिला।",
    "This time choose your own number and build an equivalent fraction.": "इस बार अपनी संख्या चुनो और तुल्य भिन्न बनाओ।",
    "Another equivalent fraction": "एक और तुल्य भिन्न",
    "Pick one number and use it on the upper and the lower number.": "एक संख्या चुनो और उसे ऊपर और नीचे की संख्या दोनों पर लगाओ।",
    "More cuts, the same colour: another name for the same amount.": "ज़्यादा कट, वही रंग: उसी मात्रा का एक और नाम।",
    "Hitting a numerator or a denominator you are given": "दिए गए अंश या हर तक पहुँचना",
    "The upper number grew from 3 to 9, so tap × for times.": "ऊपर की संख्या 3 से 9 हुई, इसलिए गुणा के लिए × दबाओ।",
    "Tap the × key on the left.": "बाईं ओर की × कुंजी दबाओ।",
    "Now tap the number that turns 3 into 9.": "अब वह संख्या दबाओ जो 3 को 9 बनाती है।",
    "Three times what makes nine?": "3 को किससे गुणा करें कि 9 बने?",
    "This time the lower number went from 16 to 4, so tap ÷ for divided by.": "इस बार नीचे की संख्या 16 से 4 हुई, इसलिए भाग के लिए ÷ दबाओ।",
    "Tap the ÷ key beside it.": "उसके बगल की ÷ कुंजी दबाओ।",
    "Tap the number that turns 16 into 4.": "वह संख्या दबाओ जो 16 को 4 बनाती है।",
    "Sixteen divided by what makes four?": "16 को किससे भाग दें कि 4 मिले?",
    "You learned: find the factor from the given number, then use it again.": "तुमने सीखा: दी गई संख्या से गुणक ढूँढो, फिर उसे दोबारा लगाओ।",
    "Make an equivalent fraction whose upper number is 20.": "ऐसा तुल्य भिन्न बनाओ जिसकी ऊपर की संख्या 20 हो।",
    "Its upper number is 20": "ऊपर की संख्या 20 है",
    "What did the 5 become 20 by, and does the 6 get the same?": "5 से 20 किससे बना, और क्या 6 के साथ भी वही हुआ?",
    "Four times the 5 is 20, and four times the 6 is 24.": "5 का चार गुना 20 है, और 6 का चार गुना 24।",
    "Now the upper number must be 24: what fraction do you get?": "अब ऊपर की संख्या 24 होनी चाहिए: कौन-सा भिन्न मिलेगा?",
    "Its upper number is 24": "ऊपर की संख्या 24 है",
    "The 4 became 24 by multiplying, not by adding.": "4 से 24 गुणा करने से बना, जोड़ने से नहीं।",
    "Six times the 4 is 24, and six times the 7 is 42.": "4 का छह गुना 24 है, और 7 का छह गुना 42।",
    "Last one: the lower number is given as 8, so write the whole fraction.": "आख़िरी: नीचे की संख्या 8 दी है, इसलिए पूरा भिन्न लिखो।",
    "Its lower number is 8": "नीचे की संख्या 8 है",
    "What divides the 72 to make 8, and does the 45 get the same?": "72 को किससे भाग दें कि 8 मिले, और 45 के साथ भी वही?",
    "Nine goes into 72 eight times and into 45 five times.": "72 में 9 आठ बार और 45 में 9 पाँच बार जाता है।",
    "Testing a pair without building anything": "कुछ बनाए बिना जोड़ी की जाँच",
    "Tap the upper number of the first fraction to draw its line across.": "पहले भिन्न की ऊपर की संख्या पर टैप करो, उसकी तिरछी रेखा खिंचेगी।",
    "Tap the upper number on the left.": "बाईं ओर की ऊपर की संख्या दबाओ।",
    "Tap the second upper number: each line multiplies the two numbers it joins.": "दूसरी ऊपर की संख्या पर टैप करो: प्रत्येक रेखा अपनी दो संख्याओं का गुणा करती है।",
    "Tap the upper number on the right.": "दाईं ओर की ऊपर की संख्या दबाओ।",
    "Cross multiply both ways: equal products mean the two fractions are equivalent.": "दोनों तरफ़ से तिरछा गुणा करो: गुणनफल बराबर हों तो भिन्न तुल्य हैं।",
    "You learned: equal crossing products mean equivalent fractions.": "तुमने सीखा: तिरछे गुणनफल बराबर हों तो भिन्न तुल्य होते हैं।",
    "Cross multiply the pair: are the two fractions equivalent?": "जोड़ी का तिरछा गुणा करो: क्या दोनों भिन्न तुल्य हैं?",
    "Are they equivalent?": "क्या तुल्य हैं?",
    "Both products are 126, so the two fractions are equivalent.": "दोनों गुणनफल 126 हैं, इसलिए दोनों भिन्न तुल्य हैं।",
    "Cross this new pair the same way: are they equivalent?": "इस नई जोड़ी का भी वैसे ही तिरछा गुणा करो: क्या तुल्य हैं?",
    "Equivalent?": "तुल्य?",
    "Tap both upper numbers, then compare the two products.": "दोनों ऊपर की संख्याओं पर टैप करो, फिर दोनों गुणनफल मिलाओ।",
    "Equal products again, so these two are equivalent too.": "गुणनफल फिर बराबर हैं, इसलिए ये दोनों भी तुल्य हैं।",
    "Last pair: are these two fractions equivalent?": "आख़िरी जोड़ी: क्या ये दोनों भिन्न तुल्य हैं?",
    "The products are not equal, so these are not the same amount.": "गुणनफल बराबर नहीं हैं, इसलिए ये बराबर मात्रा नहीं हैं।",
    "Drop the guide line and see which colours reach it.": "गाइड रेखा खींचो और देखो कौन-से रंग उस तक पहुँचते हैं।",
    "The number of cuts does not matter, only where the colour stops.": "कट कितने हैं यह नहीं, रंग कहाँ रुकता है यह मायने रखता है।",
    "Whatever you do to the upper number, do to the lower number too.": "ऊपर की संख्या के साथ जो करो, नीचे की संख्या के साथ भी वही करो।",
    "A right fraction makes the colour stop on the guide line.": "सही भिन्न का रंग गाइड रेखा पर रुकता है।",
    "Ask what the given number was multiplied or divided by.": "पूछो कि दी गई संख्या किससे गुणा या भाग हुई।",
    "Do exactly the same thing to the number beside it.": "उसके बगल की संख्या के साथ ठीक वही करो।",
    "Cross each upper number with the lower number of the other fraction.": "प्रत्येक ऊपर की संख्या का दूसरे भिन्न की नीचे की संख्या से तिरछा गुणा करो।",
    "Equal products mean the fractions are equivalent, and unequal ones do not.": "गुणनफल बराबर हों तो भिन्न तुल्य हैं, बराबर न हों तो नहीं।",
    "Guide": "गाइड",
    "more than one whole": "एक पूर्ण से बड़ा",
    "equivalent": "तुल्य",
    "not": "नहीं",
    "filled": "भरा",
    "cuts": "कट",
    "multiples": "गुणज",
    "last strip": "आख़िरी पट्टी",
    "none": "कोई नहीं",
    "Yes": "हाँ",
    "No": "नहीं",
    "Multiply both numbers by the same number and the amount stays.": "दोनों संख्याओं को एक ही संख्या से गुणा करो तो मात्रा वही रहती है।",
    "Find the factor from the given number and use it on its partner.": "दी गई संख्या से गुणक ढूँढो और उसे साथी संख्या पर लगाओ।",
    "Tap the upper numbers to draw the lines, then read the two products.": "ऊपर की संख्याओं पर टैप करके रेखाएँ खींचो, फिर दोनों गुणनफल पढ़ो।",
    "Draw both lines, then compare the two products digit by digit.": "दोनों रेखाएँ खींचो, फिर दोनों गुणनफल अंक-अंक करके मिलाओ।",
  },
  gu: {
    "Same Amount Bench": "સરખી માત્રા બેન્ચ",
    "Free play. Set any fraction, multiply or divide it, and run the multiples.": "મુક્ત રમત. કોઈ પણ અપૂર્ણાંક પસંદ કરો, ગુણો કે ભાગો, અને ગુણિત બતાવો.",
    "Can two fractions look different and be the same amount?": "શું બે અપૂર્ણાંક જુદા દેખાય અને છતાં સરખી માત્રા હોય?",
    "Same amount, different writing": "સરખી માત્રા, અલગ લખાવટ",
    "Tap the top strip to cut it into parts and fill them.": "ઉપરની પટ્ટી પર ટૅપ કરો, તેને કાપો અને ભરો.",
    "Tap the strip at the top.": "સૌથી ઉપરની પટ્ટી પર ટૅપ કરો.",
    "Now tap the strip underneath it.": "હવે તેની નીચેની પટ્ટી પર ટૅપ કરો.",
    "Tap the lower strip.": "નીચેની પટ્ટી પર ટૅપ કરો.",
    "Tap Guide to drop a line from the end of the first colour.": "ગાઈડ પર ટૅપ કરો અને પહેલા રંગના છેડાથી રેખા ખેંચો.",
    "Tap the Guide key at the side.": "બાજુની ગાઈડ કી પર ટૅપ કરો.",
    "Fractions that look different can be the same amount and are called equivalent.": "જુદા દેખાતા અપૂર્ણાંક પણ સરખી માત્રા હોઈ શકે અને સમાન અપૂર્ણાંક કહેવાય છે.",
    "You learned: fractions that look different can be the same amount.": "તમે શીખ્યા: જુદા દેખાતા અપૂર્ણાંક પણ સરખી માત્રા હોઈ શકે.",
    "all three the same": "ત્રણેય સરખા",
    "Which of these three strips of one length shows the most?": "એક જ લંબાઈની આ ત્રણ પટ્ટીઓમાં કઈ સૌથી વધુ દર્શાવે છે?",
    "Which shows the most?": "સૌથી વધુ કઈ?",
    "top strip": "ઉપરની પટ્ટી",
    "middle strip": "વચ્ચેની પટ્ટી",
    "Bigger numbers do not mean more, so lay all three strips and look.": "મોટી સંખ્યાનો અર્થ વધુ નથી, ત્રણેય પટ્ટીઓ ભરીને જુઓ.",
    "All three colours stop in one place, so they hold the same amount.": "ત્રણેય રંગ એક જ જગ્યાએ અટકે છે, તેથી માત્રા સરખી છે.",
    "the same amount": "સરખી માત્રા",
    "Two children eat bars of one size, as the strips show: who ate more?": "બે બાળકોએ સરખા કદની પટ્ટીઓ ખાધી: કોણે વધુ ખાધી?",
    "Who ate more?": "કોણે વધુ ખાધી?",
    "lower strip": "નીચલી પટ્ટી",
    "neither": "કોઈ નહીં",
    "An eighth is smaller than a quarter, and two are taken: where does each stop?": "આઠમો ભાગ ચોથા ભાગથી નાનો છે, પણ બે લીધા છે: દરેક રંગ ક્યાં અટકે છે?",
    "Two eighths fill what one quarter fills, so neither ate more.": "બે આઠમા ભાગ એક ચોથા ભાગ જેટલા છે, તેથી કોઈએ વધુ ખાધું નથી.",
    "Do the two strips show the same amount?": "શું બંને પટ્ટીઓ સરખી માત્રા દર્શાવે છે?",
    "The same amount?": "સરખી માત્રા?",
    "yes": "હા",
    "no": "ના",
    "Lay both strips and see whether the two colours stop together.": "બંને પટ્ટીઓ ભરો અને જુઓ કે બંને રંગ સાથે અટકે છે કે નહીં.",
    "Yes, the colours stop together, so it is one amount written two ways.": "હા, રંગ સાથે અટકે છે, એટલે એક જ માત્રા બે રીતે લખી છે.",
    "Building one by multiplying": "ગુણાકારથી નવો અપૂર્ણાંક બનાવવો",
    "Tap ×2 to double both numbers of the fraction on the first strip.": "×2 પર ટૅપ કરીને પહેલી પટ્ટીના અપૂર્ણાંકની બંને સંખ્યા બમણી કરો.",
    "Tap the ×2 key under the strips.": "પટ્ટીઓની નીચે ×2 કી દબાવો.",
    "Now tap ×3 to multiply both numbers by three.": "હવે ×3 પર ટૅપ કરીને બંને સંખ્યાને ત્રણથી ગુણો.",
    "The ×3 key is the one beside it.": "×3 કી તેની બાજુમાં છે.",
    "You learned: multiply both numbers by one number; the amount stays.": "તમે શીખ્યા: બંને સંખ્યાને એક જ સંખ્યાથી ગુણો; માત્રા એ જ રહે છે.",
    "Multiply both numbers by one number to build an equivalent fraction.": "બંને સંખ્યાને એક જ સંખ્યાથી ગુણીને સમાન અપૂર્ણાંક બનાવો.",
    "Build an equivalent fraction": "સમાન અપૂર્ણાંક બનાવો",
    "What did you multiply the upper number by, and the lower one?": "તમે ઉપરની સંખ્યાને શેનાથી ગુણી, અને નીચેની ને?",
    "Both numbers grew together, and the colour stopped in the very same place.": "બંને સંખ્યા સાથે વધી અને રંગ બરાબર એ જ જગ્યાએ અટક્યો.",
    "Now multiply both numbers by three and write what you get.": "હવે બંને સંખ્યાને ત્રણથી ગુણો અને જે મળે તે લખો.",
    "Both numbers times three": "બંને સંખ્યા ત્રણ ગણી",
    "Do the upper and the lower number get the same multiplier?": "શું ઉપરની અને નીચેની સંખ્યાને એક જ સંખ્યાથી ગુણી?",
    "Three times each number made a new name for the same amount.": "દરેક સંખ્યાને ત્રણથી ગુણતાં એ જ માત્રાનું નવું નામ મળ્યું.",
    "This time choose your own number and build an equivalent fraction.": "આ વખતે તમારી પોતાની સંખ્યા પસંદ કરો અને સમાન અપૂર્ણાંક બનાવો.",
    "Another equivalent fraction": "બીજો સમાન અપૂર્ણાંક",
    "Pick one number and use it on the upper and the lower number.": "એક સંખ્યા પસંદ કરો અને ઉપરની અને નીચેની સંખ્યા બંને પર લગાવો.",
    "More cuts, the same colour: another name for the same amount.": "વધુ કાપા, એ જ રંગ: એ જ માત્રાનું બીજું નામ.",
    "Hitting a numerator or a denominator you are given": "આપેલા અંશ કે છેદ સુધી પહોંચવું",
    "The upper number grew from 3 to 9, so tap × for times.": "ઉપરની સંખ્યા 3 માંથી 9 થઈ, તેથી ગુણાકાર માટે × દબાવો.",
    "Tap the × key on the left.": "ડાબી બાજુની × કી દબાવો.",
    "Now tap the number that turns 3 into 9.": "હવે 3 ને 9 બનાવે તે સંખ્યા દબાવો.",
    "Three times what makes nine?": "3 ને શેનાથી ગુણીએ કે 9 થાય?",
    "This time the lower number went from 16 to 4, so tap ÷ for divided by.": "આ વખતે નીચેની સંખ્યા 16 માંથી 4 થઈ, તેથી ભાગાકાર માટે ÷ દબાવો.",
    "Tap the ÷ key beside it.": "તેની બાજુની ÷ કી દબાવો.",
    "Tap the number that turns 16 into 4.": "16 ને 4 બનાવે તે સંખ્યા દબાવો.",
    "Sixteen divided by what makes four?": "16 ને શેનાથી ભાગીએ કે 4 મળે?",
    "You learned: find the factor from the given number, then use it again.": "તમે શીખ્યા: આપેલી સંખ્યા પરથી ગુણક શોધો, પછી એ જ ફરી વાપરો.",
    "Make an equivalent fraction whose upper number is 20.": "એવો સમાન અપૂર્ણાંક બનાવો જેની ઉપરની સંખ્યા 20 હોય.",
    "Its upper number is 20": "ઉપરની સંખ્યા 20 છે",
    "What did the 5 become 20 by, and does the 6 get the same?": "5 માંથી 20 શેનાથી બન્યું, અને શું 6 સાથે પણ એ જ થયું?",
    "Four times the 5 is 20, and four times the 6 is 24.": "5 નું ચાર ગણું 20 છે, અને 6 નું ચાર ગણું 24.",
    "Now the upper number must be 24: what fraction do you get?": "હવે ઉપરની સંખ્યા 24 હોવી જોઈએ: કયો અપૂર્ણાંક મળશે?",
    "Its upper number is 24": "ઉપરની સંખ્યા 24 છે",
    "The 4 became 24 by multiplying, not by adding.": "4 માંથી 24 ગુણાકારથી બન્યું, સરવાળાથી નહીં.",
    "Six times the 4 is 24, and six times the 7 is 42.": "4 નું છ ગણું 24 છે, અને 7 નું છ ગણું 42.",
    "Last one: the lower number is given as 8, so write the whole fraction.": "છેલ્લો: નીચેની સંખ્યા 8 આપી છે, તેથી આખો અપૂર્ણાંક લખો.",
    "Its lower number is 8": "નીચેની સંખ્યા 8 છે",
    "What divides the 72 to make 8, and does the 45 get the same?": "72 ને શેનાથી ભાગીએ કે 8 મળે, અને 45 સાથે પણ એ જ?",
    "Nine goes into 72 eight times and into 45 five times.": "72 માં 9 આઠ વાર અને 45 માં 9 પાંચ વાર જાય છે.",
    "Testing a pair without building anything": "કંઈ બનાવ્યા વિના જોડીની ચકાસણી",
    "Tap the upper number of the first fraction to draw its line across.": "પહેલા અપૂર્ણાંકની ઉપરની સંખ્યા પર ટૅપ કરો, તેની ત્રાંસી રેખા દોરાશે.",
    "Tap the upper number on the left.": "ડાબી બાજુની ઉપરની સંખ્યા દબાવો.",
    "Tap the second upper number: each line multiplies the two numbers it joins.": "બીજી ઉપરની સંખ્યા પર ટૅપ કરો: દરેક રેખા પોતે જોડેલી બે સંખ્યાનો ગુણાકાર કરે છે.",
    "Tap the upper number on the right.": "જમણી બાજુની ઉપરની સંખ્યા દબાવો.",
    "Cross multiply both ways: equal products mean the two fractions are equivalent.": "બંને બાજુથી ત્રાંસો ગુણાકાર કરો: ગુણનફળ સરખા હોય તો અપૂર્ણાંક સમાન છે.",
    "You learned: equal crossing products mean equivalent fractions.": "તમે શીખ્યા: ત્રાંસા ગુણનફળ સરખા હોય તો અપૂર્ણાંક સમાન હોય.",
    "Cross multiply the pair: are the two fractions equivalent?": "જોડીનો ત્રાંસો ગુણાકાર કરો: શું બંને અપૂર્ણાંક સમાન છે?",
    "Are they equivalent?": "શું સમાન છે?",
    "Both products are 126, so the two fractions are equivalent.": "બંને ગુણનફળ 126 છે, તેથી બંને અપૂર્ણાંક સમાન છે.",
    "Cross this new pair the same way: are they equivalent?": "આ નવી જોડીનો પણ એ જ રીતે ત્રાંસો ગુણાકાર કરો: શું સમાન છે?",
    "Equivalent?": "સમાન?",
    "Tap both upper numbers, then compare the two products.": "બંને ઉપરની સંખ્યા પર ટૅપ કરો, પછી બંને ગુણનફળ સરખાવો.",
    "Equal products again, so these two are equivalent too.": "ગુણનફળ ફરી સરખા છે, તેથી આ બંને પણ સમાન છે.",
    "Last pair: are these two fractions equivalent?": "છેલ્લી જોડી: શું આ બંને અપૂર્ણાંક સમાન છે?",
    "The products are not equal, so these are not the same amount.": "ગુણનફળ સરખા નથી, તેથી આ સરખી માત્રા નથી.",
    "Drop the guide line and see which colours reach it.": "ગાઈડ રેખા ખેંચો અને જુઓ કયા રંગ ત્યાં સુધી પહોંચે છે.",
    "The number of cuts does not matter, only where the colour stops.": "કાપા કેટલા છે તે નહીં, રંગ ક્યાં અટકે છે તે મહત્વનું છે.",
    "Whatever you do to the upper number, do to the lower number too.": "ઉપરની સંખ્યા સાથે જે કરો, નીચેની સંખ્યા સાથે પણ એ જ કરો.",
    "A right fraction makes the colour stop on the guide line.": "સાચા અપૂર્ણાંકનો રંગ ગાઈડ રેખા પર અટકે છે.",
    "Ask what the given number was multiplied or divided by.": "પૂછો કે આપેલી સંખ્યા શેનાથી ગુણાઈ કે ભાગાઈ.",
    "Do exactly the same thing to the number beside it.": "તેની બાજુની સંખ્યા સાથે બરાબર એ જ કરો.",
    "Cross each upper number with the lower number of the other fraction.": "દરેક ઉપરની સંખ્યાનો બીજા અપૂર્ણાંકની નીચેની સંખ્યા સાથે ત્રાંસો ગુણાકાર કરો.",
    "Equal products mean the fractions are equivalent, and unequal ones do not.": "ગુણનફળ સરખા હોય તો અપૂર્ણાંક સમાન છે, સરખા ન હોય તો નથી.",
    "Guide": "ગાઈડ",
    "more than one whole": "એક આખા કરતાં મોટું",
    "equivalent": "સમાન",
    "not": "નથી",
    "filled": "ભરેલા",
    "cuts": "કાપા",
    "multiples": "ગુણિત",
    "last strip": "છેલ્લી પટ્ટી",
    "none": "કોઈ નહીં",
    "Yes": "હા",
    "No": "ના",
    "Multiply both numbers by the same number and the amount stays.": "બંને સંખ્યાને એક જ સંખ્યાથી ગુણો તો માત્રા એ જ રહે છે.",
    "Find the factor from the given number and use it on its partner.": "આપેલી સંખ્યા પરથી ગુણક શોધો અને તેને સાથી સંખ્યા પર લગાવો.",
    "Tap the upper numbers to draw the lines, then read the two products.": "ઉપરની સંખ્યા પર ટૅપ કરીને રેખાઓ દોરો, પછી બંને ગુણનફળ વાંચો.",
    "Draw both lines, then compare the two products digit by digit.": "બંને રેખાઓ દોરો, પછી બંને ગુણનફળ અંક-અંક સરખાવો.",
  },
};

/* ── the bench: one left edge, strips of one length ─────────────────────────────────────
   deep blue = the parts a fraction counts · amber = the parts of that whole it leaves · green = a strip still whole
   rose = a second writing of an amount already on the bench · near-black = every cut and edge */
const SAB_BLUE = CONTENT.hundred;
const SAB_AMBER = CONTENT.ten;
const SAB_WHOLE = CONTENT.one;
const SAB_LINE = CONTENT.line;
const SAB_ROSE_INK = shade(CONTENT.bead, 0.25);
const SAB_TINT = "#0047A8";   /* the taken parts over the light-gold ribbon: a deep blue, darker than the sheet blue, at least 3:1 on the gold */
const SX = 44, SW = 560, LX = 690;          /* the common left edge, a strip's length, the labels' centre (scene coordinates) */
const SCENE_W = 900;                         /* the room the working area has with the wide keypad OPEN */

const sabEnd = (a: number, b: number) => SX + SW * Math.min(Math.max(a / b, 0), 1);
/* a fraction typed into the card ("15|27"), given as [15, 27], or written out */
const sabPair = (v: any): number[] | null => {
  const ps = slotPartsOf(v, 2);
  if (ps[0] === "" || ps[1] === "") return null;
  return [Number(ps[0]), Number(ps[1])];
};
/* a/b is base built by multiplying both numbers by a whole number bigger than one */
const sabMade = (base: number[], a: number, b: number) => b > base[1] && b % base[1] === 0 && a === base[0] * (b / base[1]);
const sabForms = (x: number) => (x >= 10 ? [String(x), indian(x), words(x)] : []);
const sabSet = (arr: any[], i: number, v: any) => arr.map((x, j) => (j === i ? v : x));
const sabSame = (p: number[], q: number[]) => p[0] === q[0] && p[1] === q[1];
const sabWait = (ms: number) => new Promise((res) => setTimeout(res, reducedMotion() ? 30 : ms));

/* One entry per phase = one mount.
   steps   the guide steps (one click each, a hint each); `warm` is the pair/fraction the steps work on (never question 1's own)
   items   three a phase; kinds: choice (a word answer, keys in the bar) · build (any a x k over b x k) · times (both numbers
           times a given k) · target (one number is given: name the factor, then write the fraction) · verdict (draw the crossing
           lines, read the products the bench writes, answer Yes or No) */
const PHASES = [
  {
    n: 1,
    concept: "Same amount, different writing",
    conceptId: "M2.S3.T5.C20", objectiveIds: ["O7"],
    says: ["Two children ate these shares of the same size. Who ate more?"],
    warm: [[1, 2], [2, 4]],
    steps: [
      { say: "Tap the top strip to cut it into parts and fill them.", on: "lay-1", hint: "Tap the strip at the top." },
      { say: "Now tap the strip underneath it.", on: "lay-2", hint: "Tap the lower strip." },
      { say: "Tap Guide to drop a line from the end of the first colour.", on: "guide", hint: "Tap the Guide key at the side." },
    ],
    stepHold: 2200,
    ladder: ["Drop the guide line and see which colours reach it.", "The number of cuts does not matter, only where the colour stops."],
    closing: "Fractions that look different can be the same amount and are called equivalent.",
    learned: "You learned: fractions that look different can be the same amount.",
    traceback: "Every strip is laid from the one edge, the guide line drops through the fills, the parts taken are counted out and the verdict is written under the line.",
    items: [
      /* learn ML1: answer in the plan = None of them. All three hold the same amount */
      { qid: "M2.S3.T5.C20:ML1", kind: "choice", strips: [[1, 3], [2, 6], [3, 9]], near: "bottom", tag: "all three the same", winMs: 3600,
        say: "Which of these three strips of one length shows the most?", ask: "Which shows the most?", answer: "none",
        choices: [{ id: "top", label: "top strip" }, { id: "middle", label: "middle strip" }, { id: "bottom", label: "last strip" }, { id: "none", label: "none" }],
        miss: "Bigger numbers do not mean more, so lay all three strips and look.",
        win: "All three colours stop in one place, so they hold the same amount." },
      /* practice 1: answer in the plan = Neither, because 2/8 is the same amount as 1/4 */
      { qid: "M2.S3.T5.C20:1", kind: "choice", strips: [[1, 4], [2, 8]], near: "lower", tag: "the same amount", winMs: 3600,
        say: "Two children eat bars of one size, as the strips show: who ate more?", ask: "Who ate more?", answer: "neither",
        choices: [{ id: "top", label: "top strip" }, { id: "lower", label: "lower strip" }, { id: "neither", label: "neither" }],
        miss: "An eighth is smaller than a quarter, and two are taken: where does each stop?",
        win: "Two eighths fill what one quarter fills, so neither ate more." },
      /* practice 2: answer in the plan = Yes, because multiplying both numbers of 1/5 by three gives 3/15 */
      { qid: "M2.S3.T5.C20:2", kind: "choice", strips: [[1, 5], [3, 15]], near: "no", tag: "the same amount", winMs: 3600,
        say: "Do the two strips show the same amount?", ask: "The same amount?", answer: "yes",
        choices: [{ id: "yes", label: "yes" }, { id: "no", label: "no" }],
        miss: "Lay both strips and see whether the two colours stop together.",
        win: "Yes, the colours stop together, so it is one amount written two ways." },
    ],
  },
  {
    n: 2,
    concept: "Building one by multiplying",
    conceptId: "M2.S3.T5.C21", objectiveIds: ["O7"],
    says: ["Double both numbers. Watch the cuts, and watch where the colour stops."],
    warm: [1, 3],
    steps: [
      { say: "Tap ×2 to double both numbers of the fraction on the first strip.", on: "times-2", hint: "Tap the ×2 key under the strips." },
      { say: "Now tap ×3 to multiply both numbers by three.", on: "times-3", hint: "The ×3 key is the one beside it." },
    ],
    stepHold: 2400,
    ladder: ["Whatever you do to the upper number, do to the lower number too.", "A right fraction makes the colour stop on the guide line."],
    closing: "Multiply both numbers by the same number and the amount stays.",
    learned: "You learned: multiply both numbers by one number; the amount stays.",
    traceback: "The child's fraction is cut on a strip against the guide line, then the same multiplier on both numbers is built below and lands on it.",
    items: [
      /* learn ML2: answer in the plan = 4/14, 6/21 and 8/28 (one of them is typed; the multiples row runs at the win) */
      { qid: "M2.S3.T5.C21:ML2", kind: "build", base: [2, 7], parts: SLOT_FRACTION, answer: [4, 14], winMs: 4200,
        say: "Multiply both numbers by one number to build an equivalent fraction.", ask: "Build an equivalent fraction",
        miss: "What did you multiply the upper number by, and the lower one?",
        win: "Both numbers grew together, and the colour stopped in the very same place." },
      /* practice 3: answer in the plan = 15/27 */
      { qid: "M2.S3.T5.C21:3", kind: "times", base: [5, 9], k: 3, parts: SLOT_FRACTION, answer: [15, 27], winMs: 4200,
        say: "Now multiply both numbers by three and write what you get.", ask: "Both numbers times three",
        miss: "Do the upper and the lower number get the same multiplier?",
        win: "Three times each number made a new name for the same amount." },
      /* practice 4: answer in the plan = 10/24, 15/36 and 20/48 */
      { qid: "M2.S3.T5.C21:4", kind: "build", base: [5, 12], parts: SLOT_FRACTION, answer: [10, 24], winMs: 4200,
        say: "This time choose your own number and build an equivalent fraction.", ask: "Another equivalent fraction",
        miss: "Pick one number and use it on the upper and the lower number.",
        win: "More cuts, the same colour: another name for the same amount." },
    ],
  },
  {
    n: 3,
    concept: "Hitting a numerator or a denominator you are given",
    conceptId: "M2.S3.T5.C22", objectiveIds: ["O8"],
    says: ["One number is already there. What was it multiplied by to get it?"],
    /* two warm beats (never question 1's own): the upper number is given and multiplied (steps 1-2), the lower number is given and divided (steps 3-4) */
    warm: [{ base: [3, 4], at: "top", given: 9, op: "×", f: 3, answer: [9, 12] }, { base: [12, 16], at: "bottom", given: 4, op: "÷", f: 4, answer: [3, 4] }],
    steps: [
      { say: "The upper number grew from 3 to 9, so tap × for times.", on: "op-times", hint: "Tap the × key on the left." },
      { say: "Now tap the number that turns 3 into 9.", on: "f-3", hint: "Three times what makes nine?" },
      { say: "This time the lower number went from 16 to 4, so tap ÷ for divided by.", on: "op-divide", hint: "Tap the ÷ key beside it." },
      { say: "Tap the number that turns 16 into 4.", on: "f-4", hint: "Sixteen divided by what makes four?" },
    ],
    stepHold: 3000,
    ladder: ["Ask what the given number was multiplied or divided by.", "Do exactly the same thing to the number beside it."],
    closing: "Find the factor from the given number and use it on its partner.",
    learned: "You learned: find the factor from the given number, then use it again.",
    traceback: "The factor goes on both arrows, the child's fraction and the right one are cut from the common edge, and the blank is filled in.",
    items: [
      /* learn ML3: answer in the plan = 20/24 and 3/5 (the bench takes its first half) */
      { qid: "M2.S3.T5.C22:ML3", kind: "target", base: [5, 6], at: "top", given: 20, op: "×", f: 4, parts: SLOT_FRACTION, answer: [20, 24], winMs: 4200,
        say: "Make an equivalent fraction whose upper number is 20.", ask: "Its upper number is 20",
        miss: "What did the 5 become 20 by, and does the 6 get the same?",
        win: "Four times the 5 is 20, and four times the 6 is 24." },
      /* practice 5: answer in the plan = 24/42, because four was multiplied by six */
      { qid: "M2.S3.T5.C22:5", kind: "target", base: [4, 7], at: "top", given: 24, op: "×", f: 6, parts: SLOT_FRACTION, answer: [24, 42], winMs: 4200,
        say: "Now the upper number must be 24: what fraction do you get?", ask: "Its upper number is 24",
        miss: "The 4 became 24 by multiplying, not by adding.",
        win: "Six times the 4 is 24, and six times the 7 is 42." },
      /* practice 6: answer in the plan = 5/8, because seventy-two was divided by nine */
      { qid: "M2.S3.T5.C22:6", kind: "target", base: [45, 72], at: "bottom", given: 8, op: "÷", f: 9, parts: SLOT_FRACTION, answer: [5, 8], winMs: 4200,
        say: "Last one: the lower number is given as 8, so write the whole fraction.", ask: "Its lower number is 8",
        miss: "What divides the 72 to make 8, and does the 45 get the same?",
        win: "Nine goes into 72 eight times and into 45 five times." },
    ],
  },
  {
    n: 4,
    concept: "Testing a pair without building anything",
    conceptId: "M2.S3.T5.C23", objectiveIds: ["O8"],
    says: ["Put the pictures away. Cross the pair both ways and compare what you get."],
    warm: { p: [1, 2], q: [3, 6] },
    steps: [
      { say: "Tap the upper number of the first fraction to draw its line across.", on: "num-a", hint: "Tap the upper number on the left." },
      { say: "Tap the second upper number: each line multiplies the two numbers it joins.", on: "num-c", hint: "Tap the upper number on the right." },
    ],
    stepHold: 2400,
    ladder: ["Cross each upper number with the lower number of the other fraction.", "Equal products mean the fractions are equivalent, and unequal ones do not."],
    closing: "Cross multiply both ways: equal products mean the two fractions are equivalent.",
    learned: "You learned: equal crossing products mean equivalent fractions.",
    traceback: "After a wrong No the straight pair (upper times upper, lower times lower) is written lightly in a row below, then the crossing lines are drawn heavier with the true products; after a wrong Yes it goes straight to the heavy lines. The verdict (= or ≠, equivalent or not) is written.",
    items: [
      /* learn ML4: answer in the plan = Yes. Both products are 126, so the two fractions are equivalent */
      { qid: "M2.S3.T5.C23:ML4", kind: "verdict", p: [6, 9], q: [14, 21], answer: "yes", pad: "enter", winMs: 4200,
        say: "Cross multiply the pair: are the two fractions equivalent?", ask: "Are they equivalent?",
        miss: "Tap the upper numbers to draw the lines, then read the two products.",
        win: "Both products are 126, so the two fractions are equivalent." },
      /* practice 7: answer in the plan = Yes. Both products are 60 */
      { qid: "M2.S3.T5.C23:7", kind: "verdict", p: [3, 5], q: [12, 20], answer: "yes", pad: "enter", winMs: 4200,
        say: "Cross this new pair the same way: are they equivalent?", ask: "Equivalent?",
        miss: "Tap both upper numbers, then compare the two products.",
        win: "Equal products again, so these two are equivalent too." },
      /* practice 8: answer in the plan = No. The products are 189 and 196, and they are not equal */
      { qid: "M2.S3.T5.C23:8", kind: "verdict", p: [7, 9], q: [21, 28], answer: "no", pad: "enter", winMs: 4200,
        say: "Last pair: are these two fractions equivalent?", ask: "Equivalent?",
        miss: "Draw both lines, then compare the two products digit by digit.",
        win: "The products are not equal, so these are not the same amount." },
    ],
  },
];

/* The numbers, rows, sizes and targets the working area needs (they go into the sidecar too). */
const MODEL = {
  strip: { leftEdge: SX, length: SW, labelAt: LX },
  colours: { counted: "hundred", left: "ten", whole: "one", secondWriting: "bead", cuts: "line" },
  verdict: { straight: "upper x upper, lower x lower (the misconception, drawn lightly in a row below)", crossing: "upper x the other lower (heavier)" },
  freePlay: { fraction: "any", cuts: "2 to 12", multiplier: "2 to 5", row: "times two, three and four" },
};

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* judge: a word answer matches its choice; a built fraction must come from multiplying BOTH numbers by one whole number
   (any k); every other fraction is exact; the two crossing products may be given in either order */
const judge = (item: any, v: any) => {
  if (item.kind === "choice" || item.kind === "verdict") return String(v).trim().toLowerCase() === String(item.answer).trim().toLowerCase();
  if (item.kind === "build") {
    const p = sabPair(v);
    return !!p && sabMade(item.base, p[0], p[1]);
  }
  return judgeSlotParts(item, v);
};
/* oracle: every answer re-derived by a second route that shares no code with judge or Work
   (decimal values for equivalence, repeated addition for the crossing products) */
const oracle = () => PHASES.every((p: any) => p.items.every((it: any) => {
  if (it.kind === "choice") {
    const v0 = it.strips[0][0] / it.strips[0][1];
    const same = it.strips.every((s: number[]) => Math.abs(s[0] / s[1] - v0) < 1e-9);
    const word: any = { none: true, neither: true, yes: true };
    return same === (word[it.answer] === true) && it.tag.length > 0 && it.choices.some((c: any) => c.id === it.answer);
  }
  if (it.kind === "build" || it.kind === "times") {
    const k = it.kind === "times" ? it.k : it.answer[1] / it.base[1];
    return k >= 2 && Number.isInteger(k) && it.answer[0] === it.base[0] * k && it.answer[1] === it.base[1] * k
      && Math.abs(it.answer[0] / it.answer[1] - it.base[0] / it.base[1]) < 1e-9;
  }
  if (it.kind === "target") {
    const [a, b] = it.answer;
    const hit = it.at === "top" ? a === it.given : b === it.given;
    const step = it.op === "×" ? it.base[1] * it.f === b && it.base[0] * it.f === a : it.base[1] / it.f === b && it.base[0] / it.f === a;
    return hit && step && Math.abs(a / b - it.base[0] / it.base[1]) < 1e-9;
  }
  if (it.kind === "verdict") {
    let s1 = 0, s2 = 0;
    for (let i = 0; i < it.q[1]; i++) s1 += it.p[0];
    for (let i = 0; i < it.p[1]; i++) s2 += it.q[0];
    const equal = Math.abs(it.p[0] / it.p[1] - it.q[0] / it.q[1]) < 1e-9;
    return (s1 === s2) === equal && equal === (it.answer === "yes") && it.pad === "enter";
  }
  return false;
}));
/* the most likely wrong answer (the misconception); judge must reject it */
const nearMiss = (item: any) => {
  if (item.kind === "choice") return item.near;                                   /* the biggest numbers */
  if (item.kind === "verdict") return item.answer === "yes" ? "no" : "yes";        /* the products are read the wrong way round */
  if (item.kind === "build" || item.kind === "times") {
    const k = item.kind === "times" ? item.k : 2;
    return [item.base[0] * k, item.base[1]].join("|");                            /* only the top multiplied */
  }
  if (item.kind === "target") {
    if (item.op === "×") {
      const gap = item.given - item.base[item.at === "top" ? 0 : 1];               /* the difference added on */
      return item.at === "top" ? [item.given, item.base[1] + gap].join("|") : [item.base[0] + gap, item.given].join("|");
    }
    return item.at === "top" ? [item.given, item.base[1]].join("|") : [item.base[0], item.given].join("|"); /* only the asked number */
  }
  return "~";
};
/* the forms of an answer that no question, hint or ladder line may print (a number the question itself gives is the
   question, not the answer) */
const answerForms = (item: any) => {
  if (item.kind === "choice" || item.kind === "verdict") return [String(item.answer)];
  if (item.kind === "build") return [2, 3, 4].flatMap((k: number) => {
    const a = item.base[0] * k, b = item.base[1] * k;
    return [a + "/" + b, ...sabForms(a), ...sabForms(b)];
  });
  if (item.kind === "target") {
    const hidden = item.at === "top" ? item.answer[1] : item.answer[0];
    return [item.answer.join("/"), ...sabForms(hidden)];
  }
  return [item.answer.join("/"), ...item.answer.flatMap(sabForms)];
};
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => item.answer;

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => {
  if (T.state().stage === "demo") return HOOK.demo && HOOK.demo();
  if (item.kind === "target" && HOOK.nameFactor) HOOK.nameFactor();   /* the bay is named before it is written */
  return T.submit(item.answer);
};
/* the agent's answer() for an item made on the working area (phase 4's Yes / No): it sets the verdict as a child would, and check() then presses Enter */
const answer = (item: any, v: any) => (item.pad === "enter" && HOOK.set ? HOOK.set(v) : undefined);
/* the agent's check() before Enter: phase 3 names the factor as a child does; undefined = press Enter. In a guide-steps
   phase (stage "demo") it returns undefined, so the agent's check() reaches api.onEnter and performs the current step */
const check = () => (HOOK.check ? HOOK.check() : undefined);

/* ── the pieces the bench is drawn from ──────────────────────────────────────────────────── */

/* one strip: n equal parts with a filled, cut with near-black score lines.
   shown  how many of the coarse cut lines are drawn so far (the scissors passing along it); blank = a strip still whole.
   fk/ff/ft  the fine lines: each coarse part divided fk ways, the lines numbered in order and drawn from ff to ft
             (a multiply raises ft with the knife; a divide raises ff with the eraser), while the filled length never moves. */
function SabStrip({ y, h, n, a, fk = 1, ff = 0, ft = 0, blank, count = 0, x = SX, w = SW, shown, skin = true, cutsOn, lw }: any) {
  /* the golden satin ribbon (one texture across the whole strip, cut in code at any count): the rest of the strip IS the skin;
     the plain amber and blue under it are the fallback, and the taken parts wear a deep blue over it */
  const ribbon = skin ? <Skin name="ribbon" x={x} y={y} w={w} h={h} /> : null;
  if (blank || !n || n < 1) return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill={SAB_WHOLE} />
      {ribbon}
      <rect x={x} y={y} width={w} height={h} fill="none" stroke={SAB_LINE} strokeWidth={2.4} />
    </g>
  );
  const pw = w / n, fw = w * Math.min(Math.max(a / n, 0), 1);
  const lim = shown === undefined ? n - 1 : Math.min(shown, n - 1);
  const cuts: number[] = [], fine: number[] = [];
  if (cutsOn === undefined ? pw >= 4 : cutsOn) for (let i = 1; i <= lim; i++) cuts.push(x + pw * i);
  if (fk > 1 && pw / fk >= 3) {
    let idx = 0;
    for (let i = 0; i < n; i++) for (let j = 1; j < fk; j++) { if (idx >= ff && idx < ft) fine.push(x + pw * (i + j / fk)); idx++; }
  }
  const sw = lw || (pw < 10 ? 1 : pw < 22 ? 1.6 : 2.4);
  const numbered = count > 0 && pw >= 40 && h >= 40;
  const ns = Math.min(40, Math.max(T.micro, Math.round(h * 0.4)));   /* the counting numbers: 40 on a tall strip */
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill={SAB_AMBER} />
      {fw > 0 && <rect x={x} y={y} width={fw} height={h} fill={SAB_BLUE} />}
      {ribbon}
      {fw > 0 && <rect x={x} y={y} width={fw} height={h} fill={SAB_TINT} fillOpacity={0.72} />}
      {fine.map((fx, i) => <line key={"f" + i} x1={fx} y1={y} x2={fx} y2={y + h} stroke={SAB_LINE} strokeWidth={Math.max(1, sw - 1)} />)}
      {cuts.map((cx, i) => <line key={"c" + i} x1={cx} y1={y} x2={cx} y2={y + h} stroke={SAB_LINE} strokeWidth={sw} />)}
      <rect x={x} y={y} width={w} height={h} fill="none" stroke={SAB_LINE} strokeWidth={2.4} />
      {numbered && Array.from({ length: Math.min(count, Math.min(a, n)) }).map((_, j) => (
        <text key={"n" + j} x={x + pw * (j + 0.5)} y={y + h / 2 + ns * 0.35} textAnchor="middle" fontSize={ns} fontWeight={700} fill="#FFFFFF">{j + 1}</text>
      ))}
    </g>
  );
}

/* a fraction is always written stacked: the upper number over a level bar over the lower number */
function SabFrac({ cx, y, a, b, size = T.label, fill = SAB_LINE, C }: any) {
  const gap = Math.max(6, Math.round(size * 0.13));
  const wide = (v: any) => String(v).length * size * 0.62;
  const none = (v: any) => v === null || v === undefined;
  const bw = Math.max(none(a) ? size * 1.25 : wide(a), none(b) ? size * 1.25 : wide(b)) + size * 0.4;
  const topBase = y - gap, botBase = y + gap + size * 0.74;
  const blank = (base: number) => (
    <rect x={cx - size * 0.63} y={base - size * 0.74} width={size * 1.26} height={size * 0.78} rx={7}
      fill="#FFFFFF" stroke={(C && C.dim) || "#9AA4AC"} strokeWidth={2.5} strokeDasharray="8 6" />
  );
  const digits = (v: any, base: number) => (
    <text x={cx} y={base} textAnchor="middle" fontSize={size} fontWeight={700} fill={fill}>{v}</text>
  );
  return (
    <g>
      {none(a) ? blank(topBase) : digits(a, topBase)}
      <rect x={cx - bw / 2} y={y - 2} width={bw} height={4} rx={2} fill={fill} />
      {none(b) ? blank(botBase) : digits(b, botBase)}
    </g>
  );
}

/* the drawn left edge every strip starts from, and the guide line that drops from a filled end (p = how far it has dropped) */
const SabEdge = ({ y1, y2 }: any) => <rect x={SX - 8} y={y1} width={6} height={Math.max(0, y2 - y1)} rx={3} fill={SAB_LINE} />;
const SabGuide = ({ x, y1, y2, p = 1 }: any) => (p > 0 ? <line x1={x} y1={y1} x2={x} y2={y1 + (y2 - y1) * Math.min(p, 1)} stroke={SAB_LINE} strokeWidth={3} strokeDasharray="9 8" /> : null);

/* one writing in the multiples row: the fraction stacked, with a small strip of its own cut differently */
function SabWriting({ cx, top, p, C, cutsOn }: any) {
  return (
    <g>
      {!p && <rect x={cx - 100} y={top} width={200} height={136} rx={18} fill="none" stroke={C.rule} strokeWidth={2} strokeDasharray="10 8" />}
      {p && <SabFrac cx={cx} y={top + 44} a={p[0]} b={p[1]} size={T.prompt} fill={SAB_ROSE_INK} C={C} />}
      {p && <SabStrip x={cx - 80} w={160} y={top + 100} h={28} n={p[1]} a={p[0]} cutsOn={cutsOn} lw={1.2} />}
    </g>
  );
}

/* a fraction card: a white card with a numerator box over a bar over a denominator box. When it is the card a question is
   answered on (answerable) it is the whole answer path of docs/PATTERNS.md §9e: one tap target over the card while the
   keypad is shut (answer-open, with the blinking ring when ready), and part-1 / part-2 finger boxes with the typed digits
   shown in the card's own boxes while the keypad is open. vals = the two strings it shows; dim = a box showing a given
   number rather than a typed one. */
const CARD = { w: 148, h: 164, bh: 68 };
function SabCard({ cx, cy, vals, on, open, answerable, ready, api, C, ink = SAB_LINE, dim = [false, false], lockBox = -1 }: any) {
  const { w, h, bh } = CARD, bx = cx - w / 2, by = cy - h / 2;
  const cell = (j: number) => ({ x: bx + 12, y: j === 0 ? by + 8 : by + h - 8 - bh, w: w - 24, h: bh });
  return (
    <g data-role="fraction-card">
      <rect x={bx} y={by} width={w} height={h} rx={18} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} />
      {[0, 1].map((j) => {
        const c = cell(j), v = String(vals[j] || ""), act = answerable && open && on === j;
        return (
          <g key={j}>
            <rect x={c.x} y={c.y} width={c.w} height={c.h} rx={12} fill="#FFFFFF" stroke={act ? C.accent : C.rule} strokeWidth={act ? 4 : 2} strokeDasharray={v || act || !answerable ? undefined : "8 6"} />
            {v ? <text x={cx} y={c.y + c.h / 2 + 17} textAnchor="middle" fontSize={v.length > 2 ? 44 : T.xl} fontWeight={700} fill={dim[j] ? C.accent : ink}>{v}</text> : null}
            {act && <rect className="c4-caret" x={cx + (v ? v.length * (v.length > 2 ? 13 : 17) + 6 : -2)} y={c.y + 14} width={4} height={c.h - 28} rx={2} fill={C.accent} />}
          </g>
        );
      })}
      <rect x={bx + 18} y={cy - 3} width={w - 36} height={6} rx={3} fill={SAB_LINE} />
      {answerable && open && [0, 1].map((j) => (
        <SlotPartBox key={j} id={"part-" + (j + 1)} label={j === 0 ? "Upper number" : "Lower number"} x={bx} y={j === 0 ? by : cy} w={w} h={h / 2} on={on === j} enabled={j !== lockBox} onPick={() => api.pickPart(j)} />
      ))}
      {answerable && !open && ready !== false && <SlotPartBox id="answer-open" label="Write the fraction" x={bx} y={by} w={w} h={h} enabled onPick={() => api.openAnswer()} />}
      {answerable && !open && ready && <BlinkRing x={bx} y={by} w={w} h={h} rx={18} C={C} />}
    </g>
  );
}

/* the two operation signs, drawn (a lone "×" typed on a key reads as a cross mark to the checks; the signs beside a number stay text) */
const SabOp = ({ op, col }: any) => (op === "×"
  ? <g stroke={col} strokeWidth={8} strokeLinecap="round"><line x1={-14} y1={-14} x2={14} y2={14} /><line x1={-14} y1={14} x2={14} y2={-14} /></g>
  : <g><line x1={-18} y1={0} x2={18} y2={0} stroke={col} strokeWidth={8} strokeLinecap="round" /><circle cx={0} cy={-19} r={5.5} fill={col} /><circle cx={0} cy={19} r={5.5} fill={col} /></g>);
/* the plan of a strip built by x k (or divided by k) from base [a, b]: coarse parts n, each cut k ways, `total` fine lines */
const sabPlan = (op: string, base: number[], k: number) => (op === "÷"
  ? { n: base[1] / k, a: base[0] / k, k, total: (base[1] / k) * (k - 1) }
  : { n: base[1], a: base[0], k, total: base[1] * (k - 1) });
const sabFirst = (op: string, plan: any) => ({ n: plan.n, k: plan.k, a: plan.a, ff: 0, ft: op === "÷" ? plan.total : 0 });
/* the same, as timeline steps (a traceback is not an act the child triggers): the fine lines appear (x) or pair off (÷) one coarse part at a time */
const sabSplitSteps = (op: string, plan: any, set: any, api: any) => {
  const S: any[] = [[60, () => set(sabFirst(op, plan))], [260, () => {}]];
  for (let i = 1; i <= plan.n; i++) {
    const ii = i, cnt = ii * (plan.k - 1);
    S.push([Math.max(60, Math.round(900 / plan.n)), () => {
      set(op === "÷" ? { n: plan.n, k: plan.k, a: plan.a, ff: cnt, ft: plan.total } : { n: plan.n, k: plan.k, a: plan.a, ff: 0, ft: cnt });
      api.sfx.tick();
    }]);
  }
  return S;
};
/* ... and as an act: a knife slices each fine line in turn (x), an eraser rubs each one out (÷) */
const sabSplitAct = (op: string, plan: any, y: number, h: number, off: number, set: any, api: any): Promise<boolean> => {
  const pw = SW / plan.n, at: any[] = [], step = Math.max(1, Math.ceil(plan.total / 120));   /* a very long pass is thinned: the tool still sweeps the whole strip */
  let idx = 0;
  for (let i = 0; i < plan.n; i++) for (let j = 1; j < plan.k; j++) { if (idx % step === 0) at.push({ x: off + SX + pw * (i + j / plan.k), y: y + h / 2 }); idx++; }
  set(sabFirst(op, plan));
  return api.act({
    tool: op === "÷" ? "eraser" : "knife", moves: op === "÷" ? "rub" : "slice", at, ms: 1100,
    onPoint: (t: number) => { const c = Math.min(plan.total, (t + 1) * step); set(op === "÷" ? { n: plan.n, k: plan.k, a: plan.a, ff: c, ft: plan.total } : { n: plan.n, k: plan.k, a: plan.a, ff: 0, ft: c }); },
  });
};

/* a board that is keyed to the ENTRY of a question (not to the question): a late timer of an old question never writes into the
   new one, and leaving a question and coming back opens it fresh (PATTERNS.md §18) */
function useSabBoard(qk: string, fresh: () => any) {
  const entry = useRef<any>({ k: qk, n: 0 });
  if (entry.current.k !== qk) entry.current = { k: qk, n: entry.current.n + 1 };
  const ek = qk + "#" + entry.current.n;
  const [raw, setRaw] = useState<any>(() => ({ ek, ...fresh() }));
  const S = raw.ek === ek ? raw : { ek, ...fresh() };
  const ref = useRef<any>(S); ref.current = S;
  const put = (patch: any) => setRaw((p: any) => {
    const base = p.ek === ek ? p : { ek, ...fresh() };
    return { ...base, ...(typeof patch === "function" ? patch(base) : patch) };
  });
  return [S, put, ek, ref];
}
/* the lock a traceback holds, released when the question changes under it */
function useSabLock(api: any, tl: any, ek: string, busy: any) {
  const mine = useRef(false);
  const lockOn = () => { mine.current = true; api.lock(true); };
  const lockOff = () => { if (mine.current) { mine.current = false; api.lock(false); } };
  useEffect(() => { tl.stop(); busy.current = false; lockOff(); }, [ek]);
  useEffect(() => () => { tl.stop(); lockOff(); }, []);
  return [lockOn, lockOff];
}

/* ── phase 1: the same amount, written differently ───────────────────────────────────────── */

const P1_ROW = [104, 220, 336], P1_H = 100;
const P1_KEY = { x: 776, y: 234, w: 120, h: 72 };

function SabSame({ phase, item, index, stage, wrong, api, off, stepOn, tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();
  const warm = stage === "demo" || stage === "teach";
  const strips: number[][] = warm ? phase.warm : item.strips;
  const busy = useRef(false);
  const [S, put, ek, ref] = useSabBoard("p1:" + (warm ? "w" : index), () => ({
    cut: strips.map(() => 0), fill: strips.map(() => 0), laid: strips.map(() => false), counted: strips.map(() => 0),
    guide: 0, lit: null, tag: null, touched: false }));
  const [lockOn, lockOff] = useSabLock(api, tl, ek, busy);

  const bottom = P1_ROW[strips.length - 1] + P1_H;
  const gx = sabEnd(strips[0][0], strips[0][1]);
  const gy1 = P1_ROW[0] - 8, gy2 = bottom + 12;
  const allLaid = S.laid.every(Boolean);

  /* laying a strip: the scissors snip along every cut line (an act), then the colour fills one part at a time */
  const lay = async (i: number) => {
    if (ref.current.laid[i]) { api.did("lay-" + (i + 1)); return; }
    if (busy.current) return;
    busy.current = true;
    const n = strips[i][1], a = strips[i][0], y = P1_ROW[i] + P1_H / 2;
    const at = Array.from({ length: n - 1 }, (_, j) => ({ x: off + SX + (SW * (j + 1)) / n, y }));
    const ok = await api.act({ tool: "scissors", moves: "snip", at, ms: 900, onPoint: (j: number) => put((q: any) => ({ cut: sabSet(q.cut, i, j + 1) })) });
    if (!ok) { busy.current = false; return; }
    const steps: any[] = [[40, () => { put((q: any) => ({ cut: sabSet(q.cut, i, n - 1) })); api.sfx.settle(); }]];
    for (let j = 1; j <= a; j++) { const jj = j; steps.push([140, () => put((q: any) => ({ fill: sabSet(q.fill, i, jj) }))]); }
    steps.push([120, () => {}]);
    tl.run(steps, () => { put((q: any) => ({ laid: sabSet(q.laid, i, true) })); busy.current = false; api.did("lay-" + (i + 1)); });
  };
  /* the guide: a pencil draws it down from the end of the first colour through every strip */
  const drop = async () => {
    if (ref.current.guide > 0) { api.did("guide"); return; }
    if (busy.current || !ref.current.laid.every(Boolean)) return;
    busy.current = true;
    const x = off + gx, N = 7;
    const at = Array.from({ length: N }, (_, j) => ({ x, y: gy1 + ((gy2 - gy1) * (j + 1)) / (N + 1) }));
    const ok = await api.act({ tool: "pencil", moves: "draw", from: { x, y: gy1 }, at, to: { x, y: gy2 }, ms: 1000, onPoint: (j: number) => put({ guide: (j + 1) / N }) });
    busy.current = false;
    if (!ok) return;
    put({ guide: 1 });
    api.did("guide");
  };
  /* every click is reported: a click that is not the awaited act only shows the step's hint */
  const press = (id: string) => {
    if (!(stage === "ask" || warm)) return;
    put({ touched: true });
    if (warm && stepOn && stepOn !== id) { api.did(id); return; }
    if (id === "guide") drop(); else lay(Number(id.slice(4)) - 1);
  };
  api.onEnter(stage === "demo" && stepOn ? () => press(stepOn) : null);

  /* the strips still unlaid, laid by the bench itself (the traceback and the win) */
  const restSteps = (slow = 1) => {
    const s = ref.current, out: any[] = [];
    strips.forEach((st, i) => {
      if (s.laid[i]) return;
      const n = st[1], a = st[0];
      if (s.cut[i] < n - 1) out.push([110 * slow, () => { put((q: any) => ({ cut: sabSet(q.cut, i, n - 1) })); api.sfx.tick(); }]);
      for (let j = (s.fill[i] || 0) + 1; j <= a; j++) { const jj = j; out.push([150 * slow, () => put((q: any) => ({ fill: sabSet(q.fill, i, jj) }))]); }
      out.push([60, () => put((q: any) => ({ laid: sabSet(q.laid, i, true) }))]);
    });
    return out;
  };
  /* the traceback: every strip laid from the one edge, the guide line dropped through the fills, the parts taken counted out,
     and the whole right answer written under the line. The child's pick stays lit where it was made. */
  useEffect(() => {
    if (!wrong || stage !== "ask") return;
    lockOn(); busy.current = true;
    const pick = ({ top: 0, middle: 1, lower: 1, bottom: 2 } as any)[String(wrong.value)];
    const out: any[] = [[400, () => {}], ...restSteps(0.8)];
    if (pick !== undefined && pick < strips.length) out.push([500, () => put({ lit: pick })]);
    out.push([300, () => put({ guide: 1 })]);
    strips.forEach((s, i) => {
      for (let j = 1; j <= s[0]; j++) { const jj = j; out.push([260, () => { put((q: any) => ({ counted: sabSet(q.counted, i, jj) })); api.sfx.tick(); }]); }
    });
    out.push([500, () => put({ tag: item.tag })]);
    out.push([400, () => {}]);
    tl.run(out, () => { busy.current = false; lockOff(); });
  }, [wrong]);
  useEffect(() => {
    if (stage !== "win") return;
    api.say(item.win);
    tl.run([...restSteps(0.7), [100, () => put({ guide: 1 })], [300, () => put({ tag: item.tag })]]);
  }, [stage]);

  const invite = (() => {
    if (warm && stepOn) {
      if (stepOn === "guide") return { x: P1_KEY.x + P1_KEY.w / 2, y: P1_KEY.y + P1_KEY.h / 2, w: P1_KEY.w, h: P1_KEY.h };
      const i = Number(stepOn.slice(4)) - 1;
      return { x: SX + SW / 2, y: P1_ROW[i] + P1_H / 2, w: SW, h: P1_H };
    }
    if (stage === "ask" && !S.touched && !busy.current && S.cut.every((c: number) => c === 0)) return { x: SX + SW / 2, y: P1_ROW[0] + P1_H / 2, w: SW, h: P1_H };
    return null;
  })();
  const tagT = S.tag ? tx(S.tag) : "";
  const tagW = S.tag ? Math.max(260, tagT.length * 19 + 48) : 0;
  const tagX = S.tag ? Math.min(Math.max(gx - tagW / 2, SX), SX + SW - tagW) : 0;

  api.share({ phase: 1, strips, laid: S.laid.filter(Boolean).length, verdict: S.tag ? item.answer : null });

  return (
    <g>
      <SabEdge y1={P1_ROW[0] - 8} y2={bottom + 12} />
      {strips.map((st, i) => (
        <g key={i}>
          <SabStrip y={P1_ROW[i]} h={P1_H} n={st[1]} a={S.fill[i]} count={S.counted[i]} shown={S.cut[i]} blank={S.cut[i] === 0} />
          <SabFrac cx={LX} y={P1_ROW[i] + P1_H / 2} a={st[0]} b={st[1]} size={60} C={C} />
          {S.lit === i && <rect x={LX - 72} y={P1_ROW[i] - 4} width={144} height={P1_H + 8} rx={16} fill="none" stroke={C.accent} strokeWidth={4} pointerEvents="none" />}
          <Hit id={"lay-" + (i + 1)} label={"Cut and fill strip " + (i + 1)} x={SX} y={P1_ROW[i]} w={SW} h={P1_H} onPress={() => press("lay-" + (i + 1))} />
        </g>
      ))}
      <SabGuide x={gx} y1={gy1} y2={gy2} p={S.guide} />
      {S.tag && (
        <g pointerEvents="none">
          <rect x={tagX} y={bottom + 16} width={tagW} height={60} rx={18} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} />
          <text x={tagX + tagW / 2} y={bottom + 56} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={SAB_LINE}>{tagT}</text>
        </g>
      )}
      <Key id="guide" label="Drop a guide line" x={P1_KEY.x} y={P1_KEY.y} w={P1_KEY.w} h={P1_KEY.h} C={C} disabled={!allLaid || S.guide > 0 || !(stage === "ask" || warm)} onClick={() => press("guide")}>
        <text y={12} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={allLaid && S.guide === 0 ? C.ink : mix(C.ink, C.panel, 0.5)}>{tx("Guide")}</text>
      </Key>
      {invite && <Invite x={invite.x} y={invite.y} w={invite.w} h={invite.h} C={C} />}
    </g>
  );
}

/* ── phase 2: building another writing by multiplying both numbers ───────────────────────── */

const B2 = { top: 24, low: 146, third: 268, h: 100, rowTop: 300, keyY: 440 };

function SabBuild({ phase, item, index, stage, wrong, typed, part, box, api, off, stepOn, tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();
  const warm = stage === "demo" || stage === "teach";
  const base: number[] = warm ? phase.warm : item.base;
  const a0 = base[0], b0 = base[1];
  const busy = useRef(false);
  const lastTyped = useRef("");
  if (stage === "ask" && typed) lastTyped.current = String(typed);
  const [S, put, ek, ref] = useSabBoard("p2:" + (warm ? "w" : index), () => ({
    lower: null, lowLab: null, third: null, thirdLab: null, row: [], mult: warm ? null : item.kind === "times" ? item.k : null, corrected: false, trace: false }));
  const [lockOn, lockOff] = useSabLock(api, tl, ek, busy);
  useEffect(() => { lastTyped.current = ""; }, [ek]);

  const setLower = (o: any) => put({ lower: o });
  const addRow = (row: number[][], p: number[]) => (row.some((q) => sabSame(q, p)) ? row : [...row, p]);
  /* the builder: the knife passes each part of the lower strip and divides it k ways while the filled end never moves */
  const build = async (k: number) => {
    if (busy.current) return;
    busy.current = true;
    put({ lowLab: null, mult: k });
    const ok = await sabSplitAct("×", sabPlan("×", base, k), B2.low, B2.h, off, setLower, api);
    busy.current = false;
    if (!ok) return;
    api.sfx.settle();
    put((q: any) => ({ lowLab: { p: [a0 * k, b0 * k] }, row: addRow(q.row, [a0 * k, b0 * k]) }));
    api.did("times-" + k);
  };
  const press = (id: string) => {
    if (!warm) return;
    if (stepOn && stepOn !== id) { api.did(id); return; }
    build(Number(id.slice(6)));
  };
  api.onEnter(stage === "demo" && stepOn ? () => press(stepOn) : null);

  /* the traceback: the child's fraction is cut against the guide line, then the right multiplier is built below and lands on it */
  useEffect(() => {
    if (!wrong || stage !== "ask") return;
    lockOn(); busy.current = true;
    put({ trace: true });
    const p = sabPair(wrong.value);
    const k = item.kind === "times" ? item.k : 2;
    const out: any[] = [[300, () => put({ third: null, thirdLab: null })]];
    if (p && p[1] > 0 && p[1] <= 99) {
      out.push([700, () => put({ lower: { n: p[1], k: 1, a: p[0], ff: 0, ft: 0 }, lowLab: { p, own: true } })]);
      out.push([800, () => {}]);
    }
    out.push(...sabSplitSteps("×", sabPlan("×", base, k), (o: any) => put({ third: o }), api));
    out.push([300, () => put({ thirdLab: { p: [a0 * k, b0 * k] }, corrected: true, mult: k })]);
    out.push([400, () => {}]);
    tl.run(out, () => { busy.current = false; put({ trace: false }); lockOff(); });
  }, [wrong]);
  /* the win: the builder runs the child's multiplier on the lower strip, then the multiples row fills */
  useEffect(() => {
    if (stage !== "win") return;
    api.say(item.win);
    const p = sabPair(lastTyped.current) || item.answer;
    const k = Math.round(p[1] / b0);
    put({ third: null, thirdLab: null, mult: k });
    (async () => {
      busy.current = true;
      const ok = await sabSplitAct("×", sabPlan("×", base, k), B2.low, B2.h, off, setLower, api);
      busy.current = false;
      if (!ok) return;
      api.sfx.settle();
      put({ lowLab: { p: [a0 * k, b0 * k] } });
      tl.run([2, 3, 4].map((kk) => [380, () => { put((q: any) => ({ row: addRow(q.row, [a0 * kk, b0 * kk]) })); api.sfx.tick(); }]));
    })();
  }, [stage]);

  const gx = sabEnd(a0, b0);
  const deep = S.third ? B2.third + B2.h : B2.low + B2.h;
  const over = (st: any, lab: any) => lab && lab.own && lab.p[0] > lab.p[1];
  const tp = slotPartsOf(typed, 2);
  const stale = !!wrong && S.corrected && tp[0] === slotPartsOf(wrong.value, 2)[0] && tp[1] === slotPartsOf(wrong.value, 2)[1];
  const won = stage === "win" || stage === "idle";
  const rp = sabPair(lastTyped.current) || item.answer;
  const cardVals = won ? rp.map(String) : S.corrected && (stale || (!tp[0] && !tp[1])) ? item.answer.map(String) : tp;
  const asking = stage === "ask" && !warm;
  const showRow = warm || won || S.row.length > 0;
  const mult = S.mult;
  const keys = [2, 3, 4];

  api.share({ phase: 2, topFraction: base, bottomFraction: S.lowLab ? S.lowLab.p : null, multiplier: mult, multiplesRow: S.row });

  return (
    <g>
      <SabEdge y1={B2.top - 4} y2={deep + 10} />
      <SabStrip y={B2.top} h={B2.h} n={b0} a={a0} />
      <SabFrac cx={LX} y={B2.top + B2.h / 2} a={a0} b={b0} size={T.speech} C={C} />
      {S.lower ? <SabStrip y={B2.low} h={B2.h} n={S.lower.n} a={S.lower.a} fk={S.lower.k} ff={S.lower.ff} ft={S.lower.ft} /> : <SabStrip y={B2.low} h={B2.h} blank />}
      <SabFrac cx={LX} y={B2.low + B2.h / 2} a={S.lowLab ? S.lowLab.p[0] : null} b={S.lowLab ? S.lowLab.p[1] : null}
        size={T.speech} fill={S.lowLab && S.lowLab.own ? SAB_LINE : SAB_ROSE_INK} C={C} />
      {over(S.lower, S.lowLab) && <text x={SX + SW / 2} y={B2.low + B2.h / 2 + 10} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill="#FFFFFF">{tx("more than one whole")}</text>}
      {S.third && <SabStrip y={B2.third} h={B2.h} n={S.third.n} a={S.third.a} fk={S.third.k} ff={S.third.ff} ft={S.third.ft} />}
      {S.third && <SabFrac cx={LX} y={B2.third + B2.h / 2} a={S.thirdLab ? S.thirdLab.p[0] : null} b={S.thirdLab ? S.thirdLab.p[1] : null} size={T.speech} fill={SAB_ROSE_INK} C={C} />}
      <SabGuide x={gx} y1={B2.top - 6} y2={deep + 12} />

      {/* the builder: it works on both numbers at once */}
      <rect x={748} y={B2.top} width={148} height={76} rx={RAD.panel} fill="url(#gPanel)" stroke={C.rule} strokeWidth={2} />
      <text x={822} y={B2.top + 54} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={SAB_LINE}>{mult ? "× " + mult : "× ?"}</text>
      {asking && (
        <SabCard cx={822} cy={B2.top + 76 + 16 + CARD.h / 2} vals={cardVals} on={box.open ? part : -1} open={box.open} answerable ready={!S.trace} api={api} C={C}
          ink={stale || S.corrected && !tp[0] && !tp[1] ? SAB_ROSE_INK : SAB_LINE} />
      )}
      {won && <SabCard cx={822} cy={B2.top + 76 + 16 + CARD.h / 2} vals={cardVals} on={-1} open={false} api={api} C={C} ink={SAB_ROSE_INK} />}

      {showRow && [0, 1, 2].map((i) => <SabWriting key={i} cx={150 + i * 300} top={B2.rowTop} p={S.row[i] || null} C={C} cutsOn={S.row.every((q: number[]) => 160 / q[1] >= 4)} />)}
      {warm && keys.map((k, j) => (
        <Key key={k} id={"times-" + k} label={"Multiply both numbers by " + k} x={242 + j * 144} y={B2.keyY} w={128} h={72} C={C} onClick={() => press("times-" + k)}>
          <text y={12} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={C.ink}>{"× " + k}</text>
        </Key>
      ))}
      {warm && stepOn && <Invite x={242 + (Number(stepOn.slice(6)) - 2) * 144 + 64} y={B2.keyY + 36} w={128} h={72} C={C} />}
    </g>
  );
}

/* ── phase 3: the number you are given tells you the factor ──────────────────────────────── */

const P3 = { lx: 112, rx: 788, cy: 88, rowY: [48, 128], chipX: 450, chipW: 190, rows: [186, 272, 358], h: 62, keyY: 432 };

function SabTarget({ phase, item, index, stage, wrong, typed, part, box, api, off, step, stepOn, tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();
  const warm = stage === "demo" || stage === "teach";
  const wi = warm && step >= 2 ? 1 : 0;                        /* the warm beat: steps 1-2 multiply, steps 3-4 divide */
  const cfg = warm ? phase.warm[wi] : item;
  const base: number[] = cfg.base, a0 = base[0], b0 = base[1], want: number[] = cfg.answer;
  const gi = cfg.at === "top" ? 0 : 1;                         /* which box of the target card holds the given number */
  const busy = useRef(false);
  const lastTyped = useRef("");
  if (stage === "ask" && typed) lastTyped.current = String(typed);
  const nudge = useRef<any>(null);
  const [S, put, ek, ref] = useSabBoard("p3:" + (warm ? "w" + wi : index), () => ({
    sel: { op: null, f: null }, named: false, litPair: false, partner: null, partLab: false, child: null, corrected: false, trace: false, touched: false }));
  const [lockOn, lockOff] = useSabLock(api, tl, ek, busy);
  useEffect(() => { lastTyped.current = ""; clearTimeout(nudge.current); }, [ek]);
  useEffect(() => () => clearTimeout(nudge.current), []);

  const setPartner = (o: any) => put({ partner: o });
  const plan = sabPlan(cfg.op, base, cfg.f);
  const partnerY = P3.rows[1];
  /* the partner strip: a multiply spreads the cuts (a knife), a divide pairs them off (an eraser), and the colour holds */
  const runPartner = async () => {
    busy.current = true;
    const ok = await sabSplitAct(cfg.op, plan, partnerY, P3.h, off, setPartner, api);
    busy.current = false;
    if (ok) { api.sfx.settle(); put({ partLab: true }); }
    return ok;
  };
  const nameNow = () => put({ sel: { op: cfg.op, f: cfg.f }, named: true, litPair: false });
  HOOK.nameFactor = nameNow;
  HOOK.check = stage === "ask" ? () => { if (!ref.current.named) nameNow(); return undefined; } : undefined;

  /* tapping the operation and the factor: the factor is named before the blank is written */
  const pick = async (id: string) => {
    if (!(stage === "ask" || warm) || busy.current) return;
    if (warm && stepOn && stepOn !== id) { api.did(id); return; }
    if (ref.current.named) return;
    put({ touched: true });
    const sel = { ...ref.current.sel };
    if (id.startsWith("op-")) sel.op = id === "op-times" ? "×" : "÷"; else sel.f = Number(id.slice(2));
    if (sel.op && sel.f) {
      if (sel.op === cfg.op && sel.f === cfg.f) {
        api.sfx.tick();
        put({ sel, named: true, litPair: false });
        if (warm) { const ok = await runPartner(); if (!ok) return; }
        if (warm && wi === 0) await sabWait(1300);           /* the first beat's result stays on the bench a moment before the next beat opens */
        if (warm) api.did(id);
      } else {
        put({ sel: { op: null, f: null }, litPair: true });
        clearTimeout(nudge.current);
        nudge.current = setTimeout(() => put({ litPair: false }), 1500);
        if (warm) api.did(id);
      }
    } else {
      put({ sel });
      if (warm) api.did(id);
    }
  };
  api.onEnter(stage === "demo" && stepOn ? () => pick(stepOn) : null);
  /* the given number is already in its box (typed for the child) and the caret starts in the other box; the given box takes no tap, so a digit
     never replaces it, and after a miss (the runtime puts the caret back in box 1) the caret goes back to the box that is not given */
  const other = gi === 0 ? 1 : 0;
  const prefilled = useRef(false);
  useEffect(() => { prefilled.current = false; }, [ek]);
  useEffect(() => {
    if (stage !== "ask" || !S.named || wrong || prefilled.current) return;
    prefilled.current = true;
    api.setTyped(gi === 0 ? cfg.given + "|" : "|" + cfg.given);
    api.pickPart(other);
  }, [S.named, stage, ek]);
  useEffect(() => {
    if (stage !== "ask" || !wrong || S.trace) return;
    const t = setTimeout(() => api.pickPart(other), 150);
    return () => clearTimeout(t);
  }, [wrong, S.trace, stage]);
  /* the card waits for the factor: the picture first */
  const gate = stage === "ask" && !S.named;
  useEffect(() => { api.cardReady(!gate, gate); return () => api.cardReady(true); }, [gate, ek]);

  /* the traceback: the factor goes on the arrows, the child's fraction is cut against the guide line, and the right partner is built */
  useEffect(() => {
    if (!wrong || stage !== "ask") return;
    lockOn(); busy.current = true;
    put({ trace: true });
    const p = sabPair(wrong.value);
    const out: any[] = [[80, () => put({ sel: { op: cfg.op, f: cfg.f }, named: true, litPair: false })], [500, () => {}]];
    if (p && p[1] > 0 && p[1] <= 99) out.push([700, () => put({ child: p })]);
    out.push([800, () => {}]);
    out.push(...sabSplitSteps(cfg.op, plan, setPartner, api));
    out.push([300, () => put({ partLab: true, corrected: true })]);
    out.push([400, () => {}]);
    tl.run(out, () => { busy.current = false; put({ trace: false }); lockOff(); });
  }, [wrong]);
  useEffect(() => {
    if (stage !== "win") return;
    api.say(item.win);
    put({ sel: { op: cfg.op, f: cfg.f }, named: true, child: null });
    runPartner();
  }, [stage]);

  const gx = sabEnd(a0, b0);
  const deep = S.child ? P3.rows[2] + P3.h : P3.rows[1] + P3.h;
  const givenY = P3.rowY[gi];
  const tp = slotPartsOf(typed, 2);
  const stale = !!wrong && S.corrected && tp[0] === slotPartsOf(wrong.value, 2)[0] && tp[1] === slotPartsOf(wrong.value, 2)[1];
  const won = stage === "win" || stage === "idle";
  const shownRight = won || (S.corrected && (stale || (!tp[0] && !tp[1])));
  const cardVals = shownRight ? want.map(String) : [0, 1].map((j) => tp[j] || (j === gi ? String(cfg.given) : ""));
  const dim = shownRight ? [false, false] : [0, 1].map((j) => j === gi);
  const chipT = (S.named ? cfg.op + " " + cfg.f : (S.sel.op || "?") + " " + (S.sel.f || "?"));
  const chip = (y: number) => (
    <g>
      <rect x={P3.chipX - P3.chipW / 2} y={y - 30} width={P3.chipW} height={60} rx={16} fill="#FFFFFF" stroke={S.named ? SAB_LINE : C.rule} strokeWidth={S.named ? 3 : 2} />
      <text x={P3.chipX} y={y + 12} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={SAB_LINE}>{chipT}</text>
    </g>
  );
  const arrow = (y: number) => (
    <g stroke={SAB_LINE} strokeWidth={3} fill="none">
      <line x1={P3.lx + 84} y1={y} x2={P3.chipX - P3.chipW / 2 - 8} y2={y} />
      <line x1={P3.chipX + P3.chipW / 2 + 8} y1={y} x2={P3.rx - 100} y2={y} />
      <path d={"M " + (P3.rx - 116) + " " + (y - 11) + " L " + (P3.rx - 100) + " " + y + " L " + (P3.rx - 116) + " " + (y + 11)} strokeLinecap="round" strokeLinejoin="round" />
    </g>
  );
  const ring = (cx: number) => <rect x={cx - (CARD.w - 24) / 2 - 6} y={givenY - CARD.bh / 2 - 6} width={CARD.w - 24 + 12} height={CARD.bh + 12} rx={16} fill="none" stroke={C.accent} strokeWidth={5} pointerEvents="none" />;

  const ops = [{ id: "op-times", t: "×", label: "Multiplied by" }, { id: "op-divide", t: "÷", label: "Divided by" }];
  const fs = [2, 3, 4, 5, 6, 7, 8, 9];
  const lockedKeys = S.named || busy.current || !(stage === "ask" || warm);
  const keyOn = (id: string) => (S.sel.op && id === (S.sel.op === "×" ? "op-times" : "op-divide")) || id === "f-" + S.sel.f;
  const inviteKey = (id: string) => {
    const j = ops.findIndex((o) => o.id === id);
    if (j >= 0) return { x: 40 + j * 92 + 36, y: P3.keyY + 36 };
    return { x: 236 + (Number(id.slice(2)) - 2) * 80 + 36, y: P3.keyY + 36 };
  };
  const inv = warm && stepOn ? inviteKey(stepOn) : stage === "ask" && !S.touched && !S.named ? inviteKey(cfg.op === "×" ? "op-times" : "op-divide") : null;

  api.share({ phase: 3, topFraction: base, targetGiven: { at: cfg.at, value: cfg.given },
    multiplier: cfg.op === "×" && S.named ? cfg.f : null, divisor: cfg.op === "÷" && S.named ? cfg.f : null, bottomFraction: S.partLab ? want : null });

  return (
    <g>
      <SabCard cx={P3.lx} cy={P3.cy} vals={[String(a0), String(b0)]} on={-1} open={false} api={api} C={C} />
      <SabCard cx={P3.rx} cy={P3.cy} vals={cardVals} dim={dim} lockBox={gi} on={box.open ? part : -1} open={box.open} answerable={stage === "ask"} ready={!gate && !S.trace} api={api} C={C}
        ink={shownRight ? SAB_ROSE_INK : SAB_LINE} />
      {arrow(P3.rowY[0])}
      {arrow(P3.rowY[1])}
      {chip(P3.rowY[0])}
      {chip(P3.rowY[1])}
      {S.litPair && ring(P3.lx)}
      {S.litPair && ring(P3.rx)}

      <SabEdge y1={P3.rows[0] - 6} y2={deep + 8} />
      <SabStrip y={P3.rows[0]} h={P3.h} n={b0} a={a0} />
      <SabFrac cx={LX} y={P3.rows[0] + P3.h / 2} a={a0} b={b0} size={T.prompt} C={C} />
      {S.partner ? <SabStrip y={P3.rows[1]} h={P3.h} n={S.partner.n} a={S.partner.a} fk={S.partner.k} ff={S.partner.ff} ft={S.partner.ft} /> : <SabStrip y={P3.rows[1]} h={P3.h} blank />}
      <SabFrac cx={LX} y={P3.rows[1] + P3.h / 2} a={S.partLab ? want[0] : null} b={S.partLab ? want[1] : null} size={T.prompt} fill={SAB_ROSE_INK} C={C} />
      {S.child && <SabStrip y={P3.rows[2]} h={P3.h} n={S.child[1]} a={S.child[0]} />}
      {S.child && <SabFrac cx={LX} y={P3.rows[2] + P3.h / 2} a={S.child[0]} b={S.child[1]} size={T.prompt} C={C} />}
      {S.child && S.child[0] > S.child[1] && (
        <text x={SX + SW / 2} y={P3.rows[2] + P3.h / 2 + 10} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill="#FFFFFF">{tx("more than one whole")}</text>
      )}
      <SabGuide x={gx} y1={P3.rows[0] - 8} y2={deep + 10} />

      {ops.map((o, j) => (
        <Key key={o.id} id={o.id} label={o.label} x={40 + j * 92} y={P3.keyY} w={72} h={72} C={C} disabled={lockedKeys} onClick={() => pick(o.id)}>
          <SabOp op={o.t} col={lockedKeys ? mix(C.ink, C.panel, 0.5) : keyOn(o.id) ? shade(C.accent, 0.3) : C.ink} />
        </Key>
      ))}
      {fs.map((f, j) => (
        <Key key={f} id={"f-" + f} label={"The factor " + f} x={236 + j * 80} y={P3.keyY} w={72} h={72} C={C} disabled={lockedKeys} onClick={() => pick("f-" + f)}>
          <text y={14} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={lockedKeys ? mix(C.ink, C.panel, 0.5) : keyOn("f-" + f) ? shade(C.accent, 0.3) : C.ink}>{f}</text>
        </Key>
      ))}
      {inv && !lockedKeys && <Invite x={inv.x} y={inv.y} w={72} h={72} C={C} />}
    </g>
  );
}

/* ── phase 4: the cross bench, with every picture put away ───────────────────────────────── */

const P4 = { xf: [110, 530], bar: 118, numY: 82, denY: 154, rows: [266, 350], h: 62 };
const DY4 = 36;                              /* the bench sits a little lower, so the screen is balanced */

function SabCross({ phase, item, index, stage, wrong, api, off, stepOn, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();
  const warm = stage === "demo" || stage === "teach";
  const cfg = warm ? { p: phase.warm.p, q: phase.warm.q, answer: "yes" } : item;
  const busy = useRef(false);
  const [S, put, ek, ref] = useSabBoard("p4:" + (warm ? "w" : index), () => ({
    lines: [], grow: {}, prod: {}, straight: {}, sprod: {}, right: false, verdict: null, strips: false, touched: false, gateOff: false, sel: null, trace: false }));
  const [lockOn, lockOff] = useSabLock(api, tl, ek, busy);
  const nums: any = { a: cfg.p[0], b: cfg.p[1], c: cfg.q[0], d: cfg.q[1] };
  const yes = cfg.answer === "yes";

  const centre = (h: string) => ({ x: h === "a" || h === "b" ? P4.xf[0] : P4.xf[1], y: h === "a" || h === "c" ? P4.numY : P4.denY });
  const anchor = (h: string) => {
    const c = centre(h), half = String(nums[h]).length * T.display * 0.31 + 16;
    return { x: c.x + (h === "a" || h === "b" ? half : -half), y: c.y };
  };
  const crossOf: any = { a: "ad", d: "ad", b: "bc", c: "bc" };
  /* the four products: the two crossing ones, and the two straight ones (the misconception) */
  const prodOf = (k: string) => (k === "ad" ? cfg.p[0] * cfg.q[1] : k === "bc" ? cfg.q[0] * cfg.p[1] : k === "ac" ? cfg.p[0] * cfg.q[0] : cfg.p[1] * cfg.q[1]);
  /* where a product sits: out near the end of its own line, so the X in the middle stays in sight */
  const boxAt = (k: string) => {
    const A = anchor(k[0]), B = anchor(k[1]);
    const f = k === "ad" ? 0.78 : 0.22;
    return { x: A.x + (B.x - A.x) * f, y: A.y + (B.y - A.y) * f };
  };
  /* THE CROSS TEST FIRST: the verdict (Yes / No) is answered ON the bench and its two keys are not drawn until both products are written, so a
     guess cannot skip the test. They only select; the berry Enter key (answerReady) commits. A teacher agent's answer() selects too, and its
     check() writes the products at once, so every path reaches the same judge. */
  const selRef = useRef<any>(null);                           /* the chosen verdict, held synchronously (answer() then check() in one tick must commit) */
  const selAt = useRef(0);                                    /* when a KEY chose it: a held or repeated Enter on that key never also commits */
  const agentRun = useRef(false);
  useEffect(() => { selRef.current = null; selAt.current = 0; agentRun.current = false; }, [ek]);
  const pickVerdict = (v: string, byKey: boolean) => { selRef.current = v; selAt.current = byKey ? Date.now() : 0; put({ sel: v }); };
  HOOK.set = stage === "ask" ? (v: any) => {
    const w = String(v).trim().toLowerCase();
    if (w !== "yes" && w !== "no") return false;
    pickVerdict(w, false);
    return true;
  } : undefined;
  /* the teacher agent's check(): the pencil draws the lines it has not drawn and writes their products ON SCREEN (the class watches its turn),
     then the verdict it chose goes in. It returns true while that plays, so the runtime does not press Enter itself. */
  const playLines = async () => {
    if (agentRun.current) return;
    agentRun.current = true;
    for (const k of ["ad", "bc"].filter((q) => ref.current.lines.indexOf(q) < 0)) { const ok = await draw(k, true); if (!ok) break; }
    agentRun.current = false;
    const v = selRef.current;
    if (v) api.submit(v);
  };
  HOOK.check = stage === "ask" ? () => {
    if (ref.current.gateOff) return undefined;
    if (!busy.current) playLines();
    return true;
  } : undefined;
  useEffect(() => { if (stage === "ask") api.answerReady(!!S.sel); }, [S.sel, stage, ek]);
  /* tapping a number: the pencil draws that number's crossing line to the other fraction's opposite number, then the bench writes the
     product on the line, a digit at a time */
  const draw = async (key: string, fast?: boolean) => {
    if (busy.current) return false;
    busy.current = true;
    const A = anchor(key[0]), B = anchor(key[1]), N = 6;
    const at = Array.from({ length: N }, (_, j) => ({ x: off + A.x + ((B.x - A.x) * (j + 1)) / (N + 1), y: DY4 + A.y + ((B.y - A.y) * (j + 1)) / (N + 1) }));
    let ok = await api.act({ tool: "pencil", moves: "draw", from: { x: off + A.x, y: DY4 + A.y }, at, to: { x: off + B.x, y: DY4 + B.y }, ms: fast ? 600 : 1000,
      onPoint: (j: number) => put((q: any) => ({ grow: { ...q.grow, [key]: (j + 1) / N } })) });
    if (ok) {
      put((q: any) => ({ lines: q.lines.indexOf(key) >= 0 ? q.lines : [...q.lines, key], grow: { ...q.grow, [key]: 1 }, prod: { ...q.prod, [key]: "" } }));
      const txt = String(prodOf(key)), bx = boxAt(key), n = txt.length;
      const at2 = Array.from({ length: n }, (_, j) => ({ x: off + bx.x + (j - (n - 1) / 2) * 24, y: DY4 + bx.y }));
      ok = await api.act({ tool: "pencil", moves: "push", from: { x: off + bx.x - 44, y: DY4 + bx.y }, at: at2, to: { x: off + bx.x + 44, y: DY4 + bx.y }, ms: fast ? 500 : 700,
        onPoint: (j: number) => put((q: any) => ({ prod: { ...q.prod, [key]: txt.slice(0, j + 1) } })) });
      if (ok) {
        const done = { ...ref.current.prod, [key]: txt };
        put((q: any) => ({ prod: { ...q.prod, [key]: txt }, gateOff: String(done.ad) === String(prodOf("ad")) && String(done.bc) === String(prodOf("bc")) }));
      }
    }
    busy.current = false;
    return ok;
  };
  const press = async (id: string) => {
    if (!(stage === "ask" || warm)) return;
    put({ touched: true });
    if (warm && stepOn && stepOn !== id) { api.did(id); return; }
    const key = crossOf[id.slice(4)];
    if (ref.current.lines.indexOf(key) >= 0) { api.did(id); return; }
    const ok = await draw(key);
    if (ok) api.did(id);
  };
  api.onEnter(stage === "demo" && stepOn ? () => press(stepOn) : stage === "ask" ? () => {
    const v = selRef.current;
    if (v && Date.now() - selAt.current >= 400) api.submit(v);   /* the Enter that selected a key (held, repeated) is never the one that commits */
  } : null);

  /* the correction. After a wrong No on a pair that IS equivalent, the misconception comes first: the straight pair (upper times upper,
     lower times lower) is written lightly in a row below the bench and KEPT, never struck out. Then the crossing lines are drawn over
     the bench in the heavier weight with the true products, and the whole right verdict is written. After a wrong Yes it goes
     straight to the heavy lines. Nothing is marked. */
  useEffect(() => {
    if (!wrong || stage !== "ask") return;
    lockOn(); busy.current = true; put({ trace: true });
    const grow = (k: string, p: number) => put((q: any) => ({ straight: { ...q.straight, [k]: p } }));
    const write = (k: string) => put((q: any) => ({ sprod: { ...q.sprod, [k]: String(prodOf(k)) } }));
    const out: any[] = [[400, () => {}]];
    if (yes) out.push(
      [350, () => { grow("ac", 0.5); api.sfx.tick(); }], [350, () => grow("ac", 1)], [450, () => { write("ac"); api.sfx.tick(); }],
      [350, () => { grow("bd", 0.5); api.sfx.tick(); }], [350, () => grow("bd", 1)], [450, () => { write("bd"); api.sfx.tick(); }],
      [1000, () => {}]);
    out.push([500, () => { put({ right: true }); api.sfx.tick(); }], [800, () => put({ verdict: cfg.answer })], [500, () => {}]);
    tl.run(out, () => { busy.current = false; selRef.current = null; put({ sel: null, trace: false }); lockOff(); });
  }, [wrong]);
  useEffect(() => {
    if (stage !== "win") return;
    api.say(item.win);
    tl.run([[80, () => put({ right: true })], [600, () => put({ verdict: cfg.answer })], [500, () => put({ strips: true })]]);
  }, [stage]);

  const productBox = (k: string, text: string, kind: string) => {
    const at = boxAt(k);
    return (
      <g key={"p" + k + kind} pointerEvents="none">
        <rect x={at.x - 48} y={at.y - 28} width={96} height={56} rx={12} fill="#FFFFFF" stroke={kind === "strong" ? SAB_LINE : C.rule} strokeWidth={kind === "strong" ? 3 : 2} strokeDasharray={text ? undefined : "8 6"} />
        {text ? <text x={at.x} y={at.y + 14} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={SAB_LINE}>{text}</text> : null}
      </g>
    );
  };
  const lineOf = (k: string, p: number, kind: string) => {
    const A = anchor(k[0]), B = anchor(k[1]);
    return <line key={kind + k} x1={A.x} y1={A.y} x2={A.x + (B.x - A.x) * p} y2={A.y + (B.y - A.y) * p} stroke={SAB_LINE}
      strokeWidth={kind === "strong" ? 8 : 4} strokeLinecap="round" strokeDasharray={kind === "strong" ? "16 12" : undefined} pointerEvents="none" />;
  };
  /* the light row below the bench: one straight pair, [number]-line-[product]-line-[number], in the light weight */
  const lightRow = (k: string, i: number) => {
    const x0 = 40, y = 292 + i * 62, n1 = k === "ac" ? cfg.p[0] : cfg.p[1], n2 = k === "ac" ? cfg.q[0] : cfg.q[1], pr = S.straight[k] || 0;
    return (
      <g key={"lr" + k} pointerEvents="none">
        <text x={x0 + 16} y={y + 11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{n1}</text>
        <line x1={x0 + 46} y1={y} x2={x0 + 46 + 180 * pr} y2={y} stroke={C.dim} strokeWidth={3} strokeLinecap="round" />
        <text x={x0 + 256} y={y + 11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{n2}</text>
        {S.sprod[k] && <rect x={x0 + 90} y={y - 22} width={92} height={44} rx={12} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} />}
        {S.sprod[k] && <text x={x0 + 136} y={y + 11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{S.sprod[k]}</text>}
      </g>
    );
  };
  const vs = lang === "gu" ? 48 : lang === "hi" ? T.speech : T.label;   /* the verdict words: Gujarati glyphs run small, so 48; Hindi 44 with a 1.5 em line pitch */
  const deep = S.strips ? P4.rows[1] + P4.h : 0;
  const inv = warm && stepOn ? centre(stepOn.slice(4)) : stage === "ask" && !S.touched && S.lines.length === 0 ? centre("a") : null;

  api.share({ phase: 4, topFraction: cfg.p, bottomFraction: cfg.q, lines: S.lines,
    crossProducts: S.verdict ? [prodOf("ad"), prodOf("bc")] : null, verdict: S.verdict });

  return (
    <g transform={"translate(0," + DY4 + ")"}>
      {/* the bench: the pair written on it, and no picture at all */}
      <rect x={SX - 4} y={4} width={610} height={246} rx={22} fill="url(#gPanel)" stroke={C.rule} strokeWidth={2} pointerEvents="none" />
      <SabFrac cx={P4.xf[0]} y={P4.bar} a={cfg.p[0]} b={cfg.p[1]} size={T.display} C={C} />
      <SabFrac cx={P4.xf[1]} y={P4.bar} a={cfg.q[0]} b={cfg.q[1]} size={T.display} C={C} />

      {S.lines.map((k: string) => lineOf(k, 1, "thin"))}
      {Object.keys(S.grow).filter((k) => S.lines.indexOf(k) < 0).map((k) => lineOf(k, S.grow[k], "thin"))}
      {S.right && ["ad", "bc"].map((k) => lineOf(k, 1, "strong"))}
      {!S.strips && ["ac", "bd"].map((k, i) => (S.straight[k] ? lightRow(k, i) : null))}
      {["ad", "bc"].map((k) => (S.right ? productBox(k, String(prodOf(k)), "strong") : S.prod[k] !== undefined ? productBox(k, S.prod[k], "thin") : null))}

      {["a", "b", "c", "d"].map((h) => {
        const c = centre(h);
        return <Hit key={h} id={"num-" + h} label={"Draw the crossing line from the " + (h === "a" || h === "c" ? "upper" : "lower") + " number " + nums[h]}
          x={c.x - 64} y={h === "a" || h === "c" ? 44 : 118} w={128} h={74} onPress={() => press("num-" + h)} />;
      })}

      {/* the verdict, read off the products and never off the fractions */}
      <rect x={666} y={4} width={230} height={246} rx={20} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} strokeDasharray={S.verdict ? undefined : "11 9"} pointerEvents="none" />
      {stage === "ask" && S.gateOff && !S.trace && ["Yes", "No"].map((v, j) => (
        <g key={v}>
          <Key id={"verdict-" + v.toLowerCase()} label={v === "Yes" ? "Yes, they are equivalent" : "No, they are not equivalent"} x={706} y={264 + j * 90} w={150} h={72} C={C} tone="key"
            onClick={() => pickVerdict(v.toLowerCase(), true)}>
            <text y={lang === "en" ? 14 : 20} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={toneInk("key", C.ink)}>{tx(v)}</text>
          </Key>
          {!S.sel && <BlinkRing x={706} y={264 + j * 90} w={150} h={72 + EDGE} rx={RAD.key} C={C} />}
          {S.sel === v.toLowerCase() && <rect x={706 - 6} y={264 + j * 90 - 6} width={162} height={72 + EDGE + 12} rx={RAD.key + 6} fill="none" stroke={C.accent} strokeWidth={5} pointerEvents="none" />}
        </g>
      ))}
      {S.verdict && <text x={781} y={lang === "en" ? 108 : 98} textAnchor="middle" fontSize={T.display} fontWeight={700} fill={SAB_LINE}>{yes ? "=" : "≠"}</text>}
      {/* the words: English 32 over two lines; Hindi and Gujarati are short words, so 44 with a line pitch of 1.5 em; "not equivalent" puts the not
          first in English and last in Hindi and Gujarati ("तुल्य नहीं", "સમાન નથી") */}
      {S.verdict && yes && <text x={781} y={lang === "en" ? 178 : 190} textAnchor="middle" fontSize={vs} fontWeight={700} fill={SAB_ROSE_INK}>{tx("equivalent")}</text>}
      {S.verdict && !yes && <text x={781} y={lang === "en" ? 162 : lang === "gu" ? 164 : 172} textAnchor="middle" fontSize={vs} fontWeight={700} fill={SAB_ROSE_INK}>{tx(lang === "en" ? "not" : "equivalent")}</text>}
      {S.verdict && !yes && <text x={781} y={lang === "en" ? 202 : lang === "gu" ? 236 : 238} textAnchor="middle" fontSize={vs} fontWeight={700} fill={SAB_ROSE_INK}>{tx(lang === "en" ? "equivalent" : "not")}</text>}

      {S.strips && <SabEdge y1={P4.rows[0] - 8} y2={deep + 8} />}
      {S.strips && <SabStrip y={P4.rows[0]} h={P4.h} n={cfg.p[1]} a={cfg.p[0]} />}
      {S.strips && <SabFrac cx={LX} y={P4.rows[0] + P4.h / 2} a={cfg.p[0]} b={cfg.p[1]} size={T.speech} C={C} />}
      {S.strips && <SabStrip y={P4.rows[1]} h={P4.h} n={cfg.q[1]} a={cfg.q[0]} />}
      {S.strips && <SabFrac cx={LX} y={P4.rows[1] + P4.h / 2} a={cfg.q[0]} b={cfg.q[1]} size={T.speech} fill={SAB_ROSE_INK} C={C} />}
      {S.strips && <SabGuide x={sabEnd(cfg.p[0], cfg.p[1])} y1={P4.rows[0] - 8} y2={deep + 8} />}

      {inv && !busy.current && !wrong && !S.right && <Invite x={inv.x} y={inv.y + (inv.y === P4.numY ? 4 : 0)} w={128} h={74} C={C} />}
    </g>
  );
}

/* ── Free play: any fraction, any multiplier, the multiples row ───────────────────────────── */

function SabFree({ api, off, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();
  const [fa, setFa] = useState(2);
  const [fb, setFb] = useState(7);
  const [fk, setFk] = useState(2);
  const [lower, setLower] = useState<any>(null);
  const [lab, setLab] = useState<number[] | null>(null);
  const [row, setRow] = useState<number[][]>([]);
  const busy = useRef(false);
  const clear = () => { tl.stop(); busy.current = false; setLower(null); setLab(null); setRow([]); };
  const setTop = (a: number, b: number) => { if (busy.current) return; clear(); setFa(Math.max(1, Math.min(a, b))); setFb(b); };
  const run = async (op: string) => {
    if (busy.current) return;
    busy.current = true;
    setLab(null);
    const ok = await sabSplitAct(op, sabPlan(op, [fa, fb], fk), 92, 64, off, setLower, api);
    busy.current = false;
    if (!ok) return;
    api.sfx.settle();
    setLab(op === "÷" ? [fa / fk, fb / fk] : [fa * fk, fb * fk]);
  };
  const runRow = async () => {
    if (busy.current) return;
    busy.current = true;
    setRow([]);
    const at = [0, 1, 2].map((i) => ({ x: off + 150 + i * 220, y: 440 }));
    const ok = await api.act({ tool: "hand", moves: "tap", at, ms: 1000, onPoint: (i: number) => setRow((r: number[][]) => [...r, [fa * (i + 2), fb * (i + 2)]]) });
    busy.current = false;
    if (ok) api.sfx.settle();
  };
  const canShrink = fk > 1 && fa % fk === 0 && fb % fk === 0 && fb / fk >= 2;
  const glyph = (s: string) => <text y={14} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={C.ink}>{s}</text>;
  const small = (id: string, label: string, x: number, y: number, s: string, fn: any) => (
    <Key id={id} label={label} x={x} y={y} w={72} h={72} C={C} onClick={fn}>{glyph(s)}</Key>
  );

  api.share({ phase: "free", topFraction: [fa, fb], bottomFraction: lab, multiplier: fk, multiplesRow: row });

  return (
    <g>
      <SabEdge y1={6} y2={158} />
      <SabStrip y={14} h={64} n={fb} a={fa} />
      <SabFrac cx={LX} y={46} a={fa} b={fb} size={T.label} C={C} />
      {lower ? <SabStrip y={92} h={64} n={lower.n} a={lower.a} fk={lower.k} ff={lower.ff} ft={lower.ft} /> : <SabStrip y={92} h={64} blank />}
      <SabFrac cx={LX} y={124} a={lab ? lab[0] : null} b={lab ? lab[1] : null} size={T.label} fill={SAB_ROSE_INK} C={C} />
      <SabGuide x={sabEnd(fa, fb)} y1={4} y2={160} />

      <text x={40} y={206} fontSize={T.label} fontWeight={600} fill={C.ink}>{tx("filled")}</text>
      {small("top-less", "One filled part fewer", 40, 214, "−", () => setTop(fa - 1, fb))}
      {small("top-more", "One filled part more", 120, 214, "+", () => setTop(fa + 1, fb))}
      <text x={230} y={206} fontSize={T.label} fontWeight={600} fill={C.ink}>{tx("cuts")}</text>
      {small("cuts-less", "One cut fewer", 230, 214, "−", () => setTop(fa, Math.max(2, fb - 1)))}
      {small("cuts-more", "One cut more", 310, 214, "+", () => setTop(fa, Math.min(12, fb + 1)))}
      <text x={420} y={206} fontSize={T.label} fontWeight={600} fill={C.ink}>{lang === "hi" ? fk + " गुना" : lang === "gu" ? fk + " ગણું" : "times " + fk}</text>
      {small("by-less", "A smaller number", 420, 214, "−", () => { if (busy.current) return; clear(); setFk(Math.max(2, fk - 1)); })}
      {small("by-more", "A bigger number", 500, 214, "+", () => { if (busy.current) return; clear(); setFk(Math.min(5, fk + 1)); })}

      <Key id="grow" label={"Multiply both numbers by " + fk} x={40} y={306} w={170} h={72} C={C} primary onClick={() => run("×")}>
        <text y={14} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill="#FFFFFF">{"× " + fk}</text>
      </Key>
      <Key id="shrink" label={"Divide both numbers by " + fk} x={226} y={306} w={170} h={72} C={C} disabled={!canShrink} onClick={() => run("÷")}>
        <text y={14} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={canShrink ? C.ink : mix(C.ink, C.panel, 0.5)}>{"÷ " + fk}</text>
      </Key>
      <Key id="run-row" label="Run the multiples" x={412} y={306} w={220} h={72} C={C} onClick={runRow}>
        <text y={12} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={C.ink}>{tx("multiples")}</text>
      </Key>
      {[0, 1, 2].map((i) => <SabWriting key={i} cx={150 + i * 220} top={386} p={row[i] || null} C={C} cutsOn={row.every((q: number[]) => 160 / q[1] >= 4)} />)}
    </g>
  );
}

/* ── the working area: 64,108 · 1472 x 520 shut, 900 wide open (bigPad) ──────────────────── */
function Work(props: any) {
  const { stage, phase, api, box } = props;
  api.onEnter(null);
  HOOK.check = undefined; HOOK.nameFactor = undefined; HOOK.demo = undefined; HOOK.set = undefined;
  /* the scene is 900 wide (the room with the keypad open) and sits in the middle while the panel is shut; its right edge
     stays 8 short of the standard key corner, so it never runs under the key */
  const off = box ? Math.max(0, Math.min((box.w - SCENE_W) / 2, 1178 - SCENE_W - 8)) : 0;
  const P = { ...props, off };
  const scene = stage === "free" ? <SabFree {...P} /> : phase.n === 1 ? <SabSame {...P} /> : phase.n === 2 ? <SabBuild {...P} /> : phase.n === 3 ? <SabTarget {...P} /> : <SabCross {...P} />;
  return <g transform={"translate(" + off + ",0)"}>{scene}</g>;
}

/* the summary page's small drawing of the child's last right answer in a phase */
function Thumb({ result, it, C, w, h, lang = "en", tx = (v: any) => v }: any) {
  const L = (result && result.last) || {};
  const sh = L.shared || {};
  const frame = <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />;
  if (L.kind === "choice") {
    const list = sh.strips || [];
    const step = (h - 14) / Math.max(list.length, 1);
    return (
      <g>
        {frame}
        {list.map((s: number[], i: number) => <SabStrip key={i} x={14} w={w - 28} y={9 + i * step} h={Math.max(12, step - 7)} n={s[1]} a={s[0]} skin={false} />)}
      </g>
    );
  }
  if (L.kind === "verdict") {
    const q = it || L.it;
    if (!q || !q.p) return null;
    const x1 = q.p[0] * q.q[1], x2 = q.q[0] * q.p[1];
    return (
      <g>
        {frame}
        <text x={w / 2} y={h / 2 + 11} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={SAB_LINE}>{x1 + (x1 === x2 ? " = " : " ≠ ") + x2}</text>
      </g>
    );
  }
  const p = sabPair(L.value) || (Array.isArray(L.answer) ? L.answer : null);
  if (!p) return null;
  return (
    <g>
      {frame}
      <SabStrip x={14} w={140} y={h / 2 - 15} h={30} n={p[1]} a={p[0]} skin={false} />
      <SabFrac cx={w - 48} y={h / 2} a={p[0]} b={p[1]} size={T.micro} fill={SAB_ROSE_INK} C={C} />
    </g>
  );
}

function SameAmountBench(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, fitHost: () => null,
      /* the board layout (LAYOUT.md §1b): the working area is the whole card until the child taps a card or Answer */
      board: true,
      /* KEY ONLY (the new look; LAYOUT.md §1d, PATTERNS.md §16): no question bar, only its blinking key at the top right; the question lives only in the bubble */
      keyOnly: true,
      /* the wide keypad: the picture has x 64 to 964 while the panel is open (the scene is exactly 900 wide) */
      bigPad: true,
      /* the Next key: nothing moves on by itself */
      nextKey: true,
      /* NAV DOTS: one small clickable dot per phase */
      navDots: true,
      /* ANSWERING ON THE CARD (PATTERNS.md §9e): a fraction is typed ON the card the picture draws */
      cardAnswer: true,
      StartArt, START_HOOK,
      }} />
  );
}

export default SameAmountBench;
