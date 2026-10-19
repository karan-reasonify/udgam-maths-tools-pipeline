/* ═══ M2.S3.T6.C25.2D1 · overlap_rings · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists: header + its three controls, canvas, key corner, bubble + mascot,
   phase dots, window.toolApi, the sound effects, the printed bubble, scoring, the events, idle and restart.
   SILENT runtime (r28), the new look: keyOnly + navDots, one sentence a screen in Kiko's bubble, every act performed
   on screen through api.act. NO imports in this file; only the five host hooks. Follow docs/LAYOUT.md and docs/PATTERNS.md.
   Every English line the tool prints, in its data or drawn by Work (tx("...")), gets a Hindi and a Gujarati entry in TR
   at the language pass (check's tr-coverage row lists what is missing). Edit, never rewrite. */

const TOOL_ID = "overlap_rings";
const MEDIA_ID = "M2.S3.T6.C25.2D1";
const TOOL_NAME = "Overlap Rings";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
/* kept for the tool object's shape (and the sidecar); nothing speaks */
const VOICE = {"rate":0.92,"pitch":1.06};

/* printed on the bubble before phase 1's teach lines only (not shown when phase 1 has steps) */
const OPENING = ["Two rings, overlapping in the middle. Something is going to end up in there."];
const FINISH_LINE = "One overlap you could count, and one that kept on catching new numbers.";
/* printed when the child opens Free play; every control it names is drawn in the free branch of Work */
const FREE_LINE = "Free play: change numbers, switch factors and multiples, and divide.";

/* THE START PAGE: two empty rings, the lens glowing once; no digit that any question answers */
const START_HOOK = "What can stand in both rings at once?";
function StartArt({ box, C, lang, tx }: any) {
  const a = 330, b = 150, d = 1.1 * a, cxA = box.w / 2 - d / 2, cxB = cxA + d, cy = box.h / 2;
  const cord = shade(C.rule, 0.38), hl = b * Math.sqrt(1 - (d / (2 * a)) * (d / (2 * a))), xm = box.w / 2;
  const tag = (cx: number, v: string) => (
    <g>
      <rect x={cx - 52} y={cy - b + 14} width={104} height={56} rx={14} fill="#FFFFFF" stroke={cord} strokeWidth={3} />
      <text x={cx} y={cy - b + 54} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={C.ink}>{v}</text>
    </g>
  );
  return (
    <g>
      <path d={`M ${xm} ${cy - hl} A ${a} ${b} 0 0 1 ${xm} ${cy + hl} A ${a} ${b} 0 0 1 ${xm} ${cy - hl} Z`} fill={tint(CONTENT.bead, 0.8)} />
      <ellipse cx={cxA} cy={cy} rx={a} ry={b} fill="none" stroke={cord} strokeWidth={7} />
      <ellipse cx={cxB} cy={cy} rx={a} ry={b} fill="none" stroke={cord} strokeWidth={7} />
      {tag(cxA - 110, "4")}
      {tag(cxB + 110, "6")}
    </g>
  );
}

/* Hindi and Gujarati (docs/PATTERNS.md §11): keyed by the exact English, byte for byte. Terms: गुणनखंड / અવયવ (factor), गुणज / અવયવી (multiple),
   सार्व / સામાન્ય (common), भागफल / ભાગફળ, शेषफल / શેષ. Digits stay Latin. A first draft for a native speaker. */
const TR: any = {
  hi: {
    "Overlap Rings": "साझा घेरे",
    "Free play: change numbers, switch factors and multiples, and divide.": "मुक्त खेल: संख्याएँ बदलो, गुणनखंड और गुणज बदलो, और भाग दो।",
    "What can stand in both rings at once?": "दोनों घेरों में एक साथ क्या आ सकता है?",
    "Numbers that divide both": "दोनों को भाग देने वाली संख्याएँ",
    "Tap Fill to write the factors of 6 and of 9 in the rings.": "6 और 9 के गुणनखंड घेरों में लिखने के लिए भरो पर टैप करो।",
    "Tap the Fill key at the bottom.": "नीचे वाले भरो बटन पर टैप करो।",
    "Tap a number that is written in both rings.": "ऐसी संख्या पर टैप करो जो दोनों घेरों में लिखी है।",
    "Look for a number that appears twice.": "वह संख्या ढूँढो जो दो बार आई है।",
    "Lift the other number that is written in both rings.": "दोनों घेरों में लिखी दूसरी संख्या भी बीच में लाओ।",
    "One more number appears in both rings.": "एक और संख्या दोनों घेरों में आई है।",
    "A common factor must divide the first number and the second number.": "सार्व गुणनखंड पहली और दूसरी, दोनों संख्याओं को भाग देता है।",
    "Lift only the numbers written in both rings and leave the others.": "सिर्फ़ दोनों घेरों में लिखी संख्याएँ बीच में लाओ, बाकी छोड़ दो।",
    "A common factor divides both numbers, and 1 goes into every number.": "सार्व गुणनखंड दोनों संख्याओं को भाग देता है, और 1 हर संख्या को भाग देता है।",
    "You learned: a common factor divides both numbers.": "तुमने सीखा: सार्व गुणनखंड दोनों संख्याओं को भाग देता है।",
    "Lift the numbers that are factors of both 42 and 70 into the middle.": "42 और 70, दोनों के गुणनखंड बीच में लाओ।",
    "Factors of both 42 and 70?": "42 और 70 दोनों के गुणनखंड?",
    "Test each card in the middle: does it go into 42 and into 70 exactly?": "बीच के हर कार्ड को जाँचो: क्या वह 42 और 70 को पूरा भाग देता है?",
    "Lift the common factors of 20 and 34 into the middle.": "20 और 34 के सार्व गुणनखंड बीच में लाओ।",
    "Factors of both 20 and 34?": "20 और 34 दोनों के गुणनखंड?",
    "Did every card in the middle go into 20 and into 34?": "क्या बीच का हर कार्ड 20 और 34 को भाग देता है?",
    "Change the numbers, then lift the card that is always in both rings.": "संख्याएँ बदलो, फिर वह कार्ड बीच में लाओ जो हमेशा दोनों घेरों में होता है।",
    "In both rings, every time?": "हर बार दोनों घेरों में?",
    "Which card goes into every number exactly, whatever the number is?": "कौन सा कार्ड हर संख्या को पूरा भाग देता है, संख्या चाहे जो हो?",
    "Change the numbers and watch which card keeps turning up in both rings.": "संख्याएँ बदलो और देखो कौन सा कार्ड हर बार दोनों घेरों में आता है।",
    "Watch one card: does it ever leave a ring when you change the numbers?": "एक कार्ड देखो: संख्याएँ बदलने पर क्या वह कभी किसी घेरे से हटता है?",
    "Meeting points that never stop": "कभी न रुकने वाले मिलन बिंदु",
    "Tap Run on to send both tracks further along.": "आगे चलाओ पर टैप करो, दोनों पटरियाँ और आगे जाएँगी।",
    "Tap the Run on key at the bottom.": "नीचे वाले आगे चलाओ बटन पर टैप करो।",
    "Tap a number that has a flag on both tracks.": "ऐसी संख्या पर टैप करो जिसका झंडा दोनों पटरियों पर है।",
    "Compare the numbers on the top flags with the bottom flags.": "ऊपर के झंडों की संख्याएँ नीचे के झंडों से मिलाओ।",
    "Catch the next meeting in the band too.": "अगला मिलन भी साझा पट्टी में ले लो।",
    "The next meeting is further along the tracks.": "अगला मिलन पटरियों पर और आगे है।",
    "Take one more step on each track and see if both land together.": "हर पटरी पर एक कदम और बढ़ो, देखो दोनों साथ पहुँचती हैं या नहीं।",
    "A meeting is a number that both tracks land on.": "मिलन वह संख्या है जिस पर दोनों पटरियाँ पहुँचती हैं।",
    "Common multiples never run out, but common factors always do.": "सार्व गुणज कभी ख़त्म नहीं होते, पर सार्व गुणनखंड ख़त्म हो जाते हैं।",
    "You learned: common multiples never run out.": "तुमने सीखा: सार्व गुणज कभी ख़त्म नहीं होते।",
    "The multiples of 4 and 6 meet at 12, 24 and 36, so tap the next three meetings.": "4 और 6 के गुणज 12, 24 और 36 पर मिलते हैं, अगले तीन मिलन चुनो।",
    "The next three meetings?": "अगले तीन मिलन?",
    "Run the tracks on past 36: which numbers have a flag on each track?": "पटरियों को 36 के आगे चलाओ: किन संख्याओं का झंडा दोनों पर है?",
    "Tap the first four numbers where the tracks of 4 and 10 meet.": "वे पहली चार संख्याएँ चुनो जहाँ 4 और 10 की पटरियाँ मिलती हैं।",
    "First four meetings of 4 and 10?": "4 और 10 के पहले चार मिलन?",
    "Does each number in the band have a flag on the 4 track and on the 10 track?": "क्या साझा पट्टी की हर संख्या का झंडा 4 और 10 दोनों पटरियों पर है?",
    "Do the common factors of 4 and 10 end, or go on for ever?": "क्या 4 और 10 के सार्व गुणनखंड ख़त्म होते हैं, या हमेशा चलते हैं?",
    "Common factors of 4 and 10?": "4 और 10 के सार्व गुणनखंड?",
    "Think about how a list of factors differs from a list of multiples.": "सोचो, गुणनखंडों की सूची गुणजों की सूची से कैसे अलग है।",
    "List the factors of 4 and the factors of 10: where does each list end?": "4 और 10 के गुणनखंड लिखो: हर सूची कहाँ ख़त्म होती है?",
    "Every common factor must divide 4, so how big can one be?": "हर सार्व गुणनखंड 4 को भाग देता है, तो वह कितना बड़ा हो सकता है?",
    "they stop": "रुकते हैं",
    "never stop": "नहीं रुकते",
    "One division instead of two lists": "दो सूचियों की जगह एक भाग",
    "Tap Divide to share 24 into equal rows of 6.": "24 को हर पंक्ति में 6 रखकर बाँटने के लिए भाग दो पर टैप करो।",
    "Tap the Divide key at the bottom.": "नीचे वाले भाग दो बटन पर टैप करो।",
    "Tap Count to number the rows the gate made.": "द्वार की बनाई पंक्तियाँ गिनने के लिए गिनो पर टैप करो।",
    "Tap the Count key at the bottom.": "नीचे वाले गिनो बटन पर टैप करो।",
    "Put the bigger number in the gate and divide it by the smaller.": "बड़ी संख्या को द्वार में डालो और छोटी संख्या से भाग दो।",
    "The full rows are the quotient and the shelf holds the remainder.": "पूरी पंक्तियाँ भागफल हैं और शेल्फ़ पर शेषफल है।",
    "Divide the bigger number by the smaller: nothing left over means a multiple.": "बड़ी संख्या को छोटी से भाग दो: कुछ न बचे तो वह गुणज है।",
    "You learned: one division shows if a number is a multiple of another.": "तुमने सीखा: एक भाग से पता चलता है कि संख्या गुणज है या नहीं।",
    "To test if 112 is a multiple of 8, divide and give the quotient and remainder.": "जाँचो कि 112, 8 का गुणज है या नहीं: भाग दो, भागफल और शेषफल बताओ।",
    "112 ÷ 8: quotient and remainder?": "112 ÷ 8: भागफल और शेषफल?",
    "Share 112 into rows of 8: how many full rows, and what is left?": "112 को हर पंक्ति में 8 रखकर बाँटो: कितनी पूरी पंक्तियाँ, और कितना बचा?",
    "quotient": "भागफल",
    "remainder": "शेषफल",
    "Rows of 5 from 45: type the quotient and the remainder.": "45 में 5 की पंक्तियाँ: भागफल और शेषफल लिखो।",
    "45 ÷ 5: quotient and remainder?": "45 ÷ 5: भागफल और शेषफल?",
    "Count the full rows of 5, then count what sits on the shelf.": "5 की पूरी पंक्तियाँ गिनो, फिर शेल्फ़ पर रखा गिनो।",
    "Divide to find out whether 126 is a multiple of 7.": "भाग देकर पता करो कि 126, 7 का गुणज है या नहीं।",
    "Is 126 a multiple of 7?": "क्या 126, 7 का गुणज है?",
    "Look at the shelf after the division: is anything left over?": "भाग के बाद शेल्फ़ देखो: क्या कुछ बचा है?",
    "Share 126 into rows of 7 and watch what lands on the shelf.": "126 को हर पंक्ति में 7 रखकर बाँटो, और देखो शेल्फ़ पर क्या आता है।",
    "An empty shelf means the bigger number is a multiple.": "शेल्फ़ खाली हो तो बड़ी संख्या गुणज है।",
    "yes, it is": "हाँ, है",
    "no, it is not": "नहीं, नहीं है",
    "What a remainder rules out": "शेषफल क्या ग़लत साबित करता है",
    "Tap Divide to share 26 into rows of 6.": "26 को हर पंक्ति में 6 रखकर बाँटने के लिए भाग दो पर टैप करो।",
    "Tap Write it to write down what the leftover tells you.": "बचा हुआ क्या बताता है, यह लिखने के लिए लिखो पर टैप करो।",
    "Tap the Write it key at the bottom.": "नीचे वाले लिखो बटन पर टैप करो।",
    "What does anything left on the shelf say about these two numbers?": "शेल्फ़ पर कुछ भी बचे, तो वह इन दो संख्याओं के बारे में क्या बताता है?",
    "With nothing on the shelf the bigger is a multiple; otherwise it is not.": "शेल्फ़ खाली हो तो बड़ी संख्या गुणज है, नहीं तो नहीं।",
    "A remainder says the bigger is not a multiple and the smaller is not a factor.": "शेषफल बताता है कि बड़ी संख्या गुणज नहीं और छोटी संख्या गुणनखंड नहीं है।",
    "You learned: a remainder rules out the multiple and the factor.": "तुमने सीखा: शेषफल गुणज और गुणनखंड को ग़लत साबित करता है।",
    "Divide 74 by 9 and see what the leftover tells you.": "74 को 9 से भाग दो और देखो बचा हुआ क्या बताता है।",
    "What does the leftover of 74 ÷ 9 say?": "74 ÷ 9 का बचा हुआ क्या कहता है?",
    "A leftover settles more than the multiple question: what else does it settle?": "बचा हुआ सिर्फ़ गुणज का सवाल हल नहीं करता: वह और क्या तय करता है?",
    "74 isn't a multiple of 9": "74, 9 का गुणज नहीं",
    "9 isn't a factor of 74": "9, 74 का गुणनखंड नहीं",
    "both of these": "ये दोनों",
    "Divide 135 by 8, then give the quotient and the remainder.": "135 को 8 से भाग दो, फिर भागफल और शेषफल लिखो।",
    "135 ÷ 8: quotient and remainder?": "135 ÷ 8: भागफल और शेषफल?",
    "Count the full rows of 8, then count the counters left on the shelf.": "8 की पूरी पंक्तियाँ गिनो, फिर शेल्फ़ पर बची गोटियाँ गिनो।",
    "You may land only on a multiple of your throw: divide 57 by 4 to see.": "तुम सिर्फ़ पासे की संख्या के गुणज पर रुक सकते हो: 57 को 4 से भाग दो।",
    "May you move onto 57?": "क्या तुम 57 पर जा सकते हो?",
    "How many counters sit on the shelf, and does a small leftover still count?": "शेल्फ़ पर कितनी गोटियाँ हैं, और क्या थोड़ा बचा भी गिना जाता है?",
    "yes, I may": "हाँ",
    "no, I may not": "नहीं",
    "Those four go into both 42 and 70 exactly.": "ये चारों 42 और 70, दोनों को पूरा भाग देते हैं।",
    "Only 1 and 2 go into both 20 and 34.": "सिर्फ़ 1 और 2 ही 20 और 34, दोनों को भाग देते हैं।",
    "1 goes into every number, so it is in both rings every time.": "1 हर संख्या को भाग देता है, इसलिए वह हर बार दोनों घेरों में है।",
    "The next meetings are 48, 60 and 72, and the tracks keep meeting.": "अगले मिलन 48, 60 और 72 हैं, और पटरियाँ मिलती ही रहती हैं।",
    "The tracks of 4 and 10 meet at 20, 40, 60 and 80.": "4 और 10 की पटरियाँ 20, 40, 60 और 80 पर मिलती हैं।",
    "The factors run out, but the multiples keep on going.": "गुणनखंड ख़त्म हो जाते हैं, पर गुणज चलते ही रहते हैं।",
    "Nothing is left over, so 112 is a multiple of 8.": "कुछ नहीं बचा, इसलिए 112, 8 का गुणज है।",
    "Nine full rows and an empty shelf show that 45 is a multiple of 5.": "नौ पूरी पंक्तियाँ और खाली शेल्फ़ बताते हैं कि 45, 5 का गुणज है।",
    "An empty shelf shows that 7 goes into 126 with nothing over.": "खाली शेल्फ़ बताता है कि 7, 126 को पूरा भाग देता है।",
    "74 is not a multiple of 9, and 9 is not a factor of 74.": "74, 9 का गुणज नहीं है, और 9, 74 का गुणनखंड नहीं है।",
    "Seven counters stay on the shelf, so 8 does not divide 135 exactly.": "शेल्फ़ पर सात गोटियाँ बचीं, इसलिए 8 से 135 पूरा भाग नहीं होता।",
    "57 is not a multiple of 4, so you may not land on it.": "57, 4 का गुणज नहीं है, इसलिए तुम वहाँ नहीं रुक सकते।",
    "Tap Change first, then lift the card in both rings.": "पहले बदलो पर टैप करो, फिर दोनों घेरों वाला कार्ड बीच में लाओ।",
    "left": "बचे",
    "multiples": "गुणज",
    "of": "के",
    "factors": "गुणनखंड",
    "in both": "साझा",
    "no end": "अंत नहीं",
    "share out": "बाँटो",
    "rows of": "हर पंक्ति में",
    "left over": "बचे हुए",
    "no full row": "पूरी पंक्ति नहीं",
    "is a multiple of": "का गुणज है",
    "isn't a multiple of": "का गुणज नहीं है",
    "is a factor of": "का गुणनखंड है",
    "isn't a factor of": "का गुणनखंड नहीं है",
    "so you may": "इसलिए जा सकते हो",
    "so you may not": "इसलिए नहीं जा सकते",
    "between two numbers": ",",
    "Fill": "भरो",
    "Change": "बदलो",
    "Multiples": "गुणज",
    "Factors": "गुणनखंड",
    "Divide": "भाग दो",
    "Go back": "पीछे जाओ",
    "Run on": "आगे चलाओ",
    "Count": "गिनो",
    "Write it": "लिखो",
    "stop": "रुकते हैं",
    "never": "नहीं रुकते",
    "yes": "हाँ",
    "no": "नहीं",
    "factor": "गुणनखंड",
    "multiple": "गुणज",
    "both": "दोनों",
  },
  gu: {
    "Overlap Rings": "સહિયારાં વર્તુળ",
    "Free play: change numbers, switch factors and multiples, and divide.": "મુક્ત રમત: સંખ્યાઓ બદલો, અવયવ અને અવયવી બદલો, અને ભાગો.",
    "What can stand in both rings at once?": "બંને વર્તુળમાં એકસાથે શું આવી શકે?",
    "Numbers that divide both": "બંનેને ભાગતી સંખ્યાઓ",
    "Tap Fill to write the factors of 6 and of 9 in the rings.": "6 અને 9 ના અવયવ વર્તુળમાં લખવા ભરો પર ટૅપ કરો.",
    "Tap the Fill key at the bottom.": "નીચેના ભરો બટન પર ટૅપ કરો.",
    "Tap a number that is written in both rings.": "એવી સંખ્યા પર ટૅપ કરો જે બંને વર્તુળમાં લખેલી છે.",
    "Look for a number that appears twice.": "જે સંખ્યા બે વાર આવી છે તે શોધો.",
    "Lift the other number that is written in both rings.": "બંને વર્તુળમાં લખેલી બીજી સંખ્યા પણ વચ્ચે લાવો.",
    "One more number appears in both rings.": "એક વધુ સંખ્યા બંને વર્તુળમાં આવી છે.",
    "A common factor must divide the first number and the second number.": "સામાન્ય અવયવ પહેલી અને બીજી, બંને સંખ્યાને ભાગે છે.",
    "Lift only the numbers written in both rings and leave the others.": "ફક્ત બંને વર્તુળમાં લખેલી સંખ્યાઓ વચ્ચે લાવો, બાકીની રહેવા દો.",
    "A common factor divides both numbers, and 1 goes into every number.": "સામાન્ય અવયવ બંને સંખ્યાને ભાગે છે, અને 1 દરેક સંખ્યાને ભાગે છે.",
    "You learned: a common factor divides both numbers.": "તમે શીખ્યા: સામાન્ય અવયવ બંને સંખ્યાને ભાગે છે.",
    "Lift the numbers that are factors of both 42 and 70 into the middle.": "42 અને 70, બંનેના અવયવ વચ્ચે લાવો.",
    "Factors of both 42 and 70?": "42 અને 70 બંનેના અવયવ?",
    "Test each card in the middle: does it go into 42 and into 70 exactly?": "વચ્ચેના દરેક કાર્ડને તપાસો: શું તે 42 અને 70 ને પૂરેપૂરું ભાગે છે?",
    "Lift the common factors of 20 and 34 into the middle.": "20 અને 34 ના સામાન્ય અવયવ વચ્ચે લાવો.",
    "Factors of both 20 and 34?": "20 અને 34 બંનેના અવયવ?",
    "Did every card in the middle go into 20 and into 34?": "શું વચ્ચેનું દરેક કાર્ડ 20 અને 34 ને ભાગે છે?",
    "Change the numbers, then lift the card that is always in both rings.": "સંખ્યાઓ બદલો, પછી એ કાર્ડ વચ્ચે લાવો જે હંમેશાં બંને વર્તુળમાં હોય છે.",
    "In both rings, every time?": "દર વખતે બંને વર્તુળમાં?",
    "Which card goes into every number exactly, whatever the number is?": "કયું કાર્ડ દરેક સંખ્યાને પૂરેપૂરું ભાગે છે, સંખ્યા ગમે તે હોય?",
    "Change the numbers and watch which card keeps turning up in both rings.": "સંખ્યાઓ બદલો અને જુઓ કયું કાર્ડ દર વખતે બંને વર્તુળમાં આવે છે.",
    "Watch one card: does it ever leave a ring when you change the numbers?": "એક કાર્ડ જુઓ: સંખ્યાઓ બદલતાં શું તે ક્યારેય કોઈ વર્તુળમાંથી હટે છે?",
    "Meeting points that never stop": "ક્યારેય ન અટકતાં મિલન બિંદુ",
    "Tap Run on to send both tracks further along.": "બંને પાટા આગળ મોકલવા આગળ ચલાવો પર ટૅપ કરો.",
    "Tap the Run on key at the bottom.": "નીચેના આગળ ચલાવો બટન પર ટૅપ કરો.",
    "Tap a number that has a flag on both tracks.": "એવી સંખ્યા પર ટૅપ કરો જેનો ઝંડો બંને પાટા પર છે.",
    "Compare the numbers on the top flags with the bottom flags.": "ઉપરના ઝંડાની સંખ્યાઓ નીચેના ઝંડા સાથે સરખાવો.",
    "Catch the next meeting in the band too.": "પછીનું મિલન પણ પટ્ટીમાં લઈ લો.",
    "The next meeting is further along the tracks.": "પછીનું મિલન પાટા પર હજી આગળ છે.",
    "Take one more step on each track and see if both land together.": "દરેક પાટા પર એક પગલું વધુ ભરો, જુઓ બંને સાથે પહોંચે છે કે નહીં.",
    "A meeting is a number that both tracks land on.": "મિલન એ સંખ્યા છે જેના પર બંને પાટા પહોંચે છે.",
    "Common multiples never run out, but common factors always do.": "સામાન્ય અવયવી ક્યારેય ખૂટતા નથી, પણ સામાન્ય અવયવ ખૂટી જાય છે.",
    "You learned: common multiples never run out.": "તમે શીખ્યા: સામાન્ય અવયવી ક્યારેય ખૂટતા નથી.",
    "The multiples of 4 and 6 meet at 12, 24 and 36, so tap the next three meetings.": "4 અને 6 ના અવયવી 12, 24 અને 36 પર મળે છે, પછીનાં ત્રણ મિલન પસંદ કરો.",
    "The next three meetings?": "પછીનાં ત્રણ મિલન?",
    "Run the tracks on past 36: which numbers have a flag on each track?": "પાટાને 36 પછી ચલાવો: કઈ સંખ્યાનો ઝંડો બંને પર છે?",
    "Tap the first four numbers where the tracks of 4 and 10 meet.": "જ્યાં 4 અને 10 ના પાટા મળે એવી પહેલી ચાર સંખ્યા પસંદ કરો.",
    "First four meetings of 4 and 10?": "4 અને 10 ના પહેલાં ચાર મિલન?",
    "Does each number in the band have a flag on the 4 track and on the 10 track?": "શું પટ્ટીની દરેક સંખ્યાનો ઝંડો 4 અને 10 બંને પાટા પર છે?",
    "Do the common factors of 4 and 10 end, or go on for ever?": "શું 4 અને 10 ના સામાન્ય અવયવ ખૂટે છે, કે હંમેશાં ચાલે છે?",
    "Common factors of 4 and 10?": "4 અને 10 ના સામાન્ય અવયવ?",
    "Think about how a list of factors differs from a list of multiples.": "વિચારો, અવયવની યાદી અવયવીની યાદીથી કેવી રીતે અલગ છે.",
    "List the factors of 4 and the factors of 10: where does each list end?": "4 અને 10 ના અવયવ લખો: દરેક યાદી ક્યાં પૂરી થાય છે?",
    "Every common factor must divide 4, so how big can one be?": "દરેક સામાન્ય અવયવ 4 ને ભાગે છે, તો તે કેટલો મોટો હોઈ શકે?",
    "they stop": "અટકી જાય છે",
    "never stop": "અટકતા નથી",
    "One division instead of two lists": "બે યાદીને બદલે એક ભાગાકાર",
    "Tap Divide to share 24 into equal rows of 6.": "24 ને દરેક હારમાં 6 મૂકીને વહેંચવા ભાગો પર ટૅપ કરો.",
    "Tap the Divide key at the bottom.": "નીચેના ભાગો બટન પર ટૅપ કરો.",
    "Tap Count to number the rows the gate made.": "દરવાજાએ બનાવેલી હાર ગણવા ગણો પર ટૅપ કરો.",
    "Tap the Count key at the bottom.": "નીચેના ગણો બટન પર ટૅપ કરો.",
    "Put the bigger number in the gate and divide it by the smaller.": "મોટી સંખ્યાને દરવાજામાં મૂકો અને નાની સંખ્યાથી ભાગો.",
    "The full rows are the quotient and the shelf holds the remainder.": "પૂરી હાર ભાગફળ છે અને છાજલી પર શેષ છે.",
    "Divide the bigger number by the smaller: nothing left over means a multiple.": "મોટી સંખ્યાને નાનીથી ભાગો: કંઈ ન વધે તો તે અવયવી છે.",
    "You learned: one division shows if a number is a multiple of another.": "તમે શીખ્યા: એક ભાગાકારથી ખબર પડે કે સંખ્યા અવયવી છે કે નહીં.",
    "To test if 112 is a multiple of 8, divide and give the quotient and remainder.": "112, 8 નો અવયવી છે કે નહીં તે ચકાસો: ભાગો, ભાગફળ અને શેષ કહો.",
    "112 ÷ 8: quotient and remainder?": "112 ÷ 8: ભાગફળ અને શેષ?",
    "Share 112 into rows of 8: how many full rows, and what is left?": "112 ને દરેક હારમાં 8 મૂકીને વહેંચો: કેટલી પૂરી હાર, અને કેટલું વધ્યું?",
    "quotient": "ભાગફળ",
    "remainder": "શેષ",
    "Rows of 5 from 45: type the quotient and the remainder.": "45 માં 5 ની હાર: ભાગફળ અને શેષ લખો.",
    "45 ÷ 5: quotient and remainder?": "45 ÷ 5: ભાગફળ અને શેષ?",
    "Count the full rows of 5, then count what sits on the shelf.": "5 ની પૂરી હાર ગણો, પછી છાજલી પર જે છે તે ગણો.",
    "Divide to find out whether 126 is a multiple of 7.": "ભાગીને શોધો કે 126, 7 નો અવયવી છે કે નહીં.",
    "Is 126 a multiple of 7?": "શું 126, 7 નો અવયવી છે?",
    "Look at the shelf after the division: is anything left over?": "ભાગ પછી છાજલી જુઓ: શું કંઈ વધ્યું છે?",
    "Share 126 into rows of 7 and watch what lands on the shelf.": "126 ને દરેક હારમાં 7 મૂકીને વહેંચો, અને જુઓ છાજલી પર શું આવે છે.",
    "An empty shelf means the bigger number is a multiple.": "છાજલી ખાલી હોય તો મોટી સંખ્યા અવયવી છે.",
    "yes, it is": "હા, છે",
    "no, it is not": "ના, નથી",
    "What a remainder rules out": "શેષ શું ખોટું સાબિત કરે છે",
    "Tap Divide to share 26 into rows of 6.": "26 ને દરેક હારમાં 6 મૂકીને વહેંચવા ભાગો પર ટૅપ કરો.",
    "Tap Write it to write down what the leftover tells you.": "વધેલું શું કહે છે તે લખવા લખો પર ટૅપ કરો.",
    "Tap the Write it key at the bottom.": "નીચેના લખો બટન પર ટૅપ કરો.",
    "What does anything left on the shelf say about these two numbers?": "છાજલી પર કંઈ પણ વધે, તો તે આ બે સંખ્યા વિશે શું કહે છે?",
    "With nothing on the shelf the bigger is a multiple; otherwise it is not.": "છાજલી ખાલી હોય તો મોટી સંખ્યા અવયવી છે, નહીંતર નહીં.",
    "A remainder says the bigger is not a multiple and the smaller is not a factor.": "શેષ કહે છે કે મોટી સંખ્યા અવયવી નથી અને નાની સંખ્યા અવયવ નથી.",
    "You learned: a remainder rules out the multiple and the factor.": "તમે શીખ્યા: શેષ અવયવી અને અવયવને ખોટા સાબિત કરે છે.",
    "Divide 74 by 9 and see what the leftover tells you.": "74 ને 9 થી ભાગો અને જુઓ વધેલું શું કહે છે.",
    "What does the leftover of 74 ÷ 9 say?": "74 ÷ 9 નું વધેલું શું કહે છે?",
    "A leftover settles more than the multiple question: what else does it settle?": "વધેલું ફક્ત અવયવીનો સવાલ નથી ઉકેલતું: તે બીજું શું નક્કી કરે છે?",
    "74 isn't a multiple of 9": "74, 9 નો અવયવી નથી",
    "9 isn't a factor of 74": "9, 74 નો અવયવ નથી",
    "both of these": "આ બંને",
    "Divide 135 by 8, then give the quotient and the remainder.": "135 ને 8 થી ભાગો, પછી ભાગફળ અને શેષ લખો.",
    "135 ÷ 8: quotient and remainder?": "135 ÷ 8: ભાગફળ અને શેષ?",
    "Count the full rows of 8, then count the counters left on the shelf.": "8 ની પૂરી હાર ગણો, પછી છાજલી પર વધેલી કૂકરીઓ ગણો.",
    "You may land only on a multiple of your throw: divide 57 by 4 to see.": "તમે ફક્ત પાસાની સંખ્યાના અવયવી પર ઊતરી શકો: 57 ને 4 થી ભાગો.",
    "May you move onto 57?": "શું તમે 57 પર જઈ શકો?",
    "How many counters sit on the shelf, and does a small leftover still count?": "છાજલી પર કેટલી કૂકરીઓ છે, અને શું થોડું વધેલું પણ ગણાય?",
    "yes, I may": "હા",
    "no, I may not": "ના",
    "Those four go into both 42 and 70 exactly.": "આ ચારેય 42 અને 70, બંનેને પૂરેપૂરા ભાગે છે.",
    "Only 1 and 2 go into both 20 and 34.": "ફક્ત 1 અને 2 જ 20 અને 34, બંનેને ભાગે છે.",
    "1 goes into every number, so it is in both rings every time.": "1 દરેક સંખ્યાને ભાગે છે, એટલે તે દર વખતે બંને વર્તુળમાં છે.",
    "The next meetings are 48, 60 and 72, and the tracks keep meeting.": "પછીનાં મિલન 48, 60 અને 72 છે, અને પાટા મળતા જ રહે છે.",
    "The tracks of 4 and 10 meet at 20, 40, 60 and 80.": "4 અને 10 ના પાટા 20, 40, 60 અને 80 પર મળે છે.",
    "The factors run out, but the multiples keep on going.": "અવયવ ખૂટી જાય છે, પણ અવયવી ચાલતા જ રહે છે.",
    "Nothing is left over, so 112 is a multiple of 8.": "કંઈ વધ્યું નહીં, એટલે 112, 8 નો અવયવી છે.",
    "Nine full rows and an empty shelf show that 45 is a multiple of 5.": "નવ પૂરી હાર અને ખાલી છાજલી બતાવે છે કે 45, 5 નો અવયવી છે.",
    "An empty shelf shows that 7 goes into 126 with nothing over.": "ખાલી છાજલી બતાવે છે કે 7, 126 ને પૂરેપૂરો ભાગે છે.",
    "74 is not a multiple of 9, and 9 is not a factor of 74.": "74, 9 નો અવયવી નથી, અને 9, 74 નો અવયવ નથી.",
    "Seven counters stay on the shelf, so 8 does not divide 135 exactly.": "છાજલી પર સાત કૂકરીઓ વધી, એટલે 8 થી 135 પૂરો ભાગ થતો નથી.",
    "57 is not a multiple of 4, so you may not land on it.": "57, 4 નો અવયવી નથી, એટલે તમે ત્યાં ઊતરી ન શકો.",
    "Tap Change first, then lift the card in both rings.": "પહેલાં બદલો પર ટૅપ કરો, પછી બંને વર્તુળવાળું કાર્ડ વચ્ચે લાવો.",
    "left": "વધ્યા",
    "multiples": "અવયવી",
    "of": "ના",
    "factors": "અવયવ",
    "in both": "બંનેમાં",
    "no end": "અંત નથી",
    "share out": "વહેંચો",
    "rows of": "દરેક હારમાં",
    "left over": "વધેલા",
    "no full row": "કોઈ હાર પૂરી નથી",
    "is a multiple of": "નો અવયવી છે",
    "isn't a multiple of": "નો અવયવી નથી",
    "is a factor of": "નો અવયવ છે",
    "isn't a factor of": "નો અવયવ નથી",
    "so you may": "એટલે જઈ શકાય",
    "so you may not": "એટલે ન જઈ શકાય",
    "between two numbers": "એ",
    "Fill": "ભરો",
    "Change": "બદલો",
    "Multiples": "અવયવી",
    "Factors": "અવયવ",
    "Divide": "ભાગો",
    "Go back": "પાછળ જાઓ",
    "Run on": "આગળ ચલાવો",
    "Count": "ગણો",
    "Write it": "લખો",
    "stop": "અટકી જાય છે",
    "never": "અટકતા નથી",
    "yes": "હા",
    "no": "ના",
    "factor": "અવયવ",
    "multiple": "અવયવી",
    "both": "બંને",
  },
};

/* One entry per phase = one mount. A steps phase opens on a warm-up (OR_WARM, never a question's numbers), then three questions.
   Items carry the numbers their picture needs: rings a, b · tracks p, q (given = meetings the question already names) · gate big, small.
   near = the item's misconception, the wrong answer judge must reject. */
const PHASES = [
  {
    n: 1,
    concept: "Numbers that divide both",
    conceptId: "M2.S3.T6.C25", objectiveIds: ["O9"],
    says: ["Fill both rings, then lift what stands in both into the middle."],
    steps: [
      { say: "Tap Fill to write the factors of 6 and of 9 in the rings.", on: "fill", hint: "Tap the Fill key at the bottom." },
      { say: "Tap a number that is written in both rings.", on: "lift", hint: "Look for a number that appears twice." },
      { say: "Lift the other number that is written in both rings.", on: "lift", hint: "One more number appears in both rings." },
    ],
    ladder: ["A common factor must divide the first number and the second number.", "Lift only the numbers written in both rings and leave the others."],
    closing: "A common factor divides both numbers, and 1 goes into every number.",
    learned: "You learned: a common factor divides both numbers.",
    traceback: "Each card the child moved wrongly is tested on both numbers beside the rings; a card that divides only one goes back to its ring, a shared card left out travels into the middle, and the middle is read again.",
    items: [
      /* learn ML1: answer in the plan = 1, 2, 7 and 14 */
      { qid: "M2.S3.T6.C25:ML1", kind: "common", a: 42, b: 70, answer: "1, 2, 7, 14", near: "1, 2, 3, 5, 6, 7, 10", pad: "enter", winMs: 2200,
        say: "Lift the numbers that are factors of both 42 and 70 into the middle.",
        ask: "Factors of both 42 and 70?",
        miss: "Test each card in the middle: does it go into 42 and into 70 exactly?" },
      /* practice 1: answer in the plan = 1 and 2 */
      { qid: "M2.S3.T6.C25:1", kind: "common", a: 20, b: 34, answer: "1, 2", near: "2", pad: "enter", winMs: 2200,
        say: "Lift the common factors of 20 and 34 into the middle.",
        ask: "Factors of both 20 and 34?",
        miss: "Did every card in the middle go into 20 and into 34?" },
      /* practice 2: answer in the plan = Because 1 is a factor of every number, so it has to appear in both lists */
      { qid: "M2.S3.T6.C25:2", kind: "always", a: 12, b: 18, answer: "1", near: "2", pad: "enter", winMs: 2800,
        say: "Change the numbers, then lift the card that is always in both rings.",
        ask: "In both rings, every time?",
        miss: "Which card goes into every number exactly, whatever the number is?",
        ladder: ["Change the numbers and watch which card keeps turning up in both rings.", "Watch one card: does it ever leave a ring when you change the numbers?"] },
      /* practice 6 (common factors of 30, 45 and 75) is left out: exactly three questions a phase */
    ],
  },
  {
    n: 2,
    concept: "Meeting points that never stop",
    conceptId: "M2.S3.T6.C26", objectiveIds: ["O9"],
    says: ["Run both tracks on and watch the band catch the numbers they share."],
    steps: [
      { say: "Tap Run on to send both tracks further along.", on: "runon", hint: "Tap the Run on key at the bottom." },
      { say: "Tap a number that has a flag on both tracks.", on: "catch", hint: "Compare the numbers on the top flags with the bottom flags." },
      { say: "Catch the next meeting in the band too.", on: "catch", hint: "The next meeting is further along the tracks." },
    ],
    ladder: ["Take one more step on each track and see if both land together.", "A meeting is a number that both tracks land on."],
    closing: "Common multiples never run out, but common factors always do.",
    learned: "You learned: common multiples never run out.",
    traceback: "The tracks run on step by step; a number with a flag on only one track goes back, each missing meeting is caught as two flags slide together into the band, and the band's list is read out; for the factor question the lists shut at both ends while the band keeps catching.",
    items: [
      /* learn ML2: answer in the plan = No. There are infinitely many, and 48, 60 and 72 come next */
      { qid: "M2.S3.T6.C26:ML2", kind: "next3", p: 4, q: 6, given: [12, 24, 36], answer: "48, 60, 72", near: "42, 48, 54", pad: "enter", winMs: 2200,
        say: "The multiples of 4 and 6 meet at 12, 24 and 36, so tap the next three meetings.",
        ask: "The next three meetings?",
        miss: "Run the tracks on past 36: which numbers have a flag on each track?" },
      /* practice 4: answer in the plan = 20, 40, 60 and 80 */
      { qid: "M2.S3.T6.C26:4", kind: "first4", p: 4, q: 10, given: [], answer: "20, 40, 60, 80", near: "10, 20, 30, 40", pad: "enter", winMs: 2200,
        say: "Tap the first four numbers where the tracks of 4 and 10 meet.",
        ask: "First four meetings of 4 and 10?",
        miss: "Does each number in the band have a flag on the 4 track and on the 10 track?" },
      /* authored (the plan has two questions here): the phase's second misconception, that common factors must go on for ever too */
      { qid: null, kind: "stops", p: 4, q: 10, answer: "stop", near: "never", winMs: 2600,
        choices: [{ id: "stop", label: "they stop" }, { id: "never", label: "never stop" }],
        say: "Do the common factors of 4 and 10 end, or go on for ever?",
        ask: "Common factors of 4 and 10?",
        miss: "Think about how a list of factors differs from a list of multiples.",
        ladder: ["List the factors of 4 and the factors of 10: where does each list end?", "Every common factor must divide 4, so how big can one be?"] },
    ],
  },
  {
    n: 3,
    concept: "One division instead of two lists",
    conceptId: "M2.S3.T6.C27", objectiveIds: ["O10"],
    says: ["One division can do the work of two long lists."],
    steps: [
      { say: "Tap Divide to share 24 into equal rows of 6.", on: "divide", hint: "Tap the Divide key at the bottom." },
      { say: "Tap Count to number the rows the gate made.", on: "count", hint: "Tap the Count key at the bottom." },
    ],
    ladder: ["Put the bigger number in the gate and divide it by the smaller.", "The full rows are the quotient and the shelf holds the remainder."],
    closing: "Divide the bigger number by the smaller: nothing left over means a multiple.",
    learned: "You learned: one division shows if a number is a multiple of another.",
    traceback: "The gate deals the bigger number into rows of the smaller again, counting each row, and sets what is left on the shelf; if the child divided the smaller by the bigger, that board is drawn first (no full row, all of it on the shelf); it ends on the quotient and the remainder.",
    items: [
      /* learn ML3: answer in the plan = Yes, because 112 divided by 8 is 14 with nothing over */
      { qid: "M2.S3.T6.C27:ML3", kind: "gate", big: 112, small: 8, answer: [14, 0], near: [0, 8], winMs: 3200,
        parts: [{ label: "quotient" }, { label: "remainder" }],
        say: "To test if 112 is a multiple of 8, divide and give the quotient and remainder.",
        ask: "112 ÷ 8: quotient and remainder?",
        miss: "Share 112 into rows of 8: how many full rows, and what is left?" },
      /* practice 3: answer in the plan = Yes, because 45 divided by 5 is 9 with nothing over */
      { qid: "M2.S3.T6.C27:3", kind: "gate", big: 45, small: 5, answer: [9, 0], near: [0, 5], winMs: 3200,
        parts: [{ label: "quotient" }, { label: "remainder" }],
        say: "Rows of 5 from 45: type the quotient and the remainder.",
        ask: "45 ÷ 5: quotient and remainder?",
        miss: "Count the full rows of 5, then count what sits on the shelf." },
      /* practice 5: answer in the plan = Yes, because 126 divided by 7 is 18 with nothing over */
      { qid: "M2.S3.T6.C27:5", kind: "mult", big: 126, small: 7, answer: "yes", near: "no", winMs: 3200,
        choices: [{ id: "yes", label: "yes, it is" }, { id: "no", label: "no, it is not" }],
        say: "Divide to find out whether 126 is a multiple of 7.",
        ask: "Is 126 a multiple of 7?",
        miss: "Look at the shelf after the division: is anything left over?",
        ladder: ["Share 126 into rows of 7 and watch what lands on the shelf.", "An empty shelf means the bigger number is a multiple."] },
    ],
  },
  {
    n: 4,
    concept: "What a remainder rules out",
    conceptId: "M2.S3.T6.C28", objectiveIds: ["O10"],
    says: ["Read the shelf: what is left over says two things at once."],
    steps: [
      { say: "Tap Divide to share 26 into rows of 6.", on: "divide", hint: "Tap the Divide key at the bottom." },
      { say: "Tap Write it to write down what the leftover tells you.", on: "say", hint: "Tap the Write it key at the bottom." },
    ],
    ladder: ["What does anything left on the shelf say about these two numbers?", "With nothing on the shelf the bigger is a multiple; otherwise it is not."],
    closing: "A remainder says the bigger is not a multiple and the smaller is not a factor.",
    learned: "You learned: a remainder rules out the multiple and the factor.",
    traceback: "The gate deals the rows again, counting each, and drops the leftover onto the shelf one at a time; the multiple statement and the factor statement are then written under it, one after the other.",
    items: [
      /* learn ML4: the plan's answer names what the division rules OUT = that 74 is a multiple of 9, and that 9 is a factor of 74 */
      { qid: "M2.S3.T6.C28:ML4", kind: "rule", big: 74, small: 9, answer: "both", near: "multiple", winMs: 3200,
        choices: [{ id: "multiple", label: "74 isn't a multiple of 9" }, { id: "factor", label: "9 isn't a factor of 74" }, { id: "both", label: "both of these" }],
        say: "Divide 74 by 9 and see what the leftover tells you.",
        ask: "What does the leftover of 74 ÷ 9 say?",
        miss: "A leftover settles more than the multiple question: what else does it settle?" },
      /* practice 7: answer in the plan = 135 divided by 8 is 16 with 7 left over, so 135 is not a multiple of 8 and 8 is not a factor of 135 */
      { qid: "M2.S3.T6.C28:7", kind: "gate", big: 135, small: 8, answer: [16, 7], near: [17, 0], winMs: 3200,
        parts: [{ label: "quotient" }, { label: "remainder" }],
        say: "Divide 135 by 8, then give the quotient and the remainder.",
        ask: "135 ÷ 8: quotient and remainder?",
        miss: "Count the full rows of 8, then count the counters left on the shelf." },
      /* practice 8: answer in the plan = No. 57 divided by 4 is 14 with 1 left over, so 57 is not a multiple of 4 */
      { qid: "M2.S3.T6.C28:8", kind: "game", big: 57, small: 4, answer: "no", near: "yes", winMs: 3200,
        choices: [{ id: "yes", label: "yes, I may" }, { id: "no", label: "no, I may not" }],
        say: "You may land only on a multiple of your throw: divide 57 by 4 to see.",
        ask: "May you move onto 57?",
        miss: "How many counters sit on the shelf, and does a small leftover still count?" },
    ],
  },
];

/* the warm-up of each steps phase: numbers that are none of its questions' answers */
const OR_WARM: any[] = [
  { kind: "common", a: 6, b: 9 },
  { kind: "next3", p: 3, q: 5, given: [] },
  { kind: "gate", big: 24, small: 6 },
  { kind: "gate", big: 26, small: 6 },
];

/* ── the picture's numbers ──────────────────────────────────────────────────────────────── */
const orFactors = (n: number) => { const out: number[] = []; for (let d = 1; d <= n; d++) if (n % d === 0) out.push(d); return out; };
const orNums = (v: any): number[] => (Array.isArray(v) ? v.map(Number) : (String(v ?? "").match(/\d+/g) || []).map(Number)).filter((x: number) => isFinite(x));
const orSet = (xs: number[]) => Array.from(new Set(xs)).sort((a, b) => a - b);
const orJoin = (xs: number[]) => orSet(xs).join(", ");
const orAnd = (xs: number[]) => { const s = orSet(xs); return s.length > 1 ? s.slice(0, -1).join(", ") + " and " + s[s.length - 1] : String(s[0] ?? ""); };
const orLcm = (p: number, q: number) => { let m = Math.max(p, q); while (m % p || m % q) m += Math.max(p, q); return m; };

const OR_BLUE = CONTENT.hundred, OR_ROSE = CONTENT.bead, OR_GREEN = CONTENT.one, OR_AMBER = CONTENT.ten, OR_VERM = CONTENT.pointer;
const OR_KEY_Y = 442, OR_KEY_H = 72;
/* pairs with no common factor but 1 (phase 1, last question) and the pairs free play cycles through */
const OR_COPRIME = [[9, 16], [8, 15], [10, 21], [14, 25], [6, 35], [12, 25]];
const OR_FREE = [[12, 18], [4, 12], [8, 12], [5, 10], [6, 9], [20, 30], [16, 24], [15, 25], [14, 21], [10, 15], [4, 10]];
/* the gate: a tray column, a ruled board of two columns of nine rows, a leftover shelf (working-area units; 896 wide) */
const OR_G = { w: 896, tray: 190, bx: 206, bw: 690, cols: [224, 580], top: 6, pitch: 38, step: 31, r: 14, rows: 9, shelfY: 358, shelfH: 70 };

/* The numbers, rows, sizes and targets the working area needs (they go into the sidecar too). */
const MODEL = {
  rings: { ellipses: "two rings of cord, the lists curving inside; the shared middle is the lens they make", cardSize: 72, middleCap: 7 },
  tracks: { flagPitch: 84, runStep: "a whole number of lowest common multiples, so meetings keep their places", band: "open at the right, like the tracks" },
  gate: { rowsPerColumn: OR_G.rows, columns: 2, shelf: "outside the rows, full strength", bead: OR_G.step },
  warmups: OR_WARM,
};

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* judge: a list is right in any order; two parts compare box by box; a word by its id */
const judge = (item: any, v: any) => {
  if (item.parts) return judgeSlotParts(item, v);
  if (item.pad === "enter") return orJoin(orNums(v)) === orJoin(orNums(item.answer));
  if (typeof item.answer === "number") return leadNumber(v) === item.answer;
  return String(v).trim().toLowerCase() === String(item.answer).trim().toLowerCase();
};
/* oracle: every answer re-derived by a second route that shares no code with judge or Work:
   factors by MULTIPLYING (a × b = n), meetings by walking two lists of multiples upwards,
   quotient and remainder by taking the smaller away again and again */
const oracle = () => {
  const mul = (n: number) => { const f: number[] = []; for (let a = 1; a <= n; a++) for (let b = n; b >= 1; b--) if (a * b === n) { f.push(a); break; } return f; };
  const list = (s: any) => String(s).split(",").map((t) => parseInt(t, 10));
  const sub = (big: number, small: number) => { let r = big, q = 0; while (r >= small) { r -= small; q++; } return [q, r]; };
  const walk = (p: number, q: number, above: number, count: number) => {
    const out: number[] = []; let a = p, b = q;
    while (out.length < count) { if (a === b) { if (a > above) out.push(a); a += p; b += q; } else if (a < b) a += p; else b += q; }
    return out;
  };
  return PHASES.every((p: any) => p.items.every((it: any) => {
    switch (it.kind) {
      case "common": { const fb = mul(it.b); return list(it.answer).join(",") === mul(it.a).filter((x) => fb.indexOf(x) >= 0).join(","); }
      case "always": {
        let keep = mul(2);
        for (let n = 3; n <= 100; n++) { const f = mul(n); keep = keep.filter((x) => f.indexOf(x) >= 0); }
        const fb = mul(it.b), fa = mul(it.a);
        /* the opening pair shares more than 1 (so Change is needed); every pair Change gives shares only the answer */
        return keep.length === 1 && String(keep[0]) === String(it.answer) && fa.filter((x) => fb.indexOf(x) >= 0).length > 1
          && OR_COPRIME.every((pr) => { const g = mul(pr[1]); return mul(pr[0]).filter((x) => g.indexOf(x) >= 0).join(",") === String(it.answer); });
      }
      case "next3": return walk(it.p, it.q, 0, 3).join(",") === it.given.join(",") && list(it.answer).join(",") === walk(it.p, it.q, it.given[it.given.length - 1], 3).join(",");
      case "first4": return list(it.answer).join(",") === walk(it.p, it.q, 0, 4).join(",");
      case "stops": { const fb = mul(it.q), c = mul(it.p).filter((x) => fb.indexOf(x) >= 0); return it.answer === (c.length > 0 && c.every((x) => x <= Math.min(it.p, it.q)) ? "stop" : "never"); }
      case "gate": { const [q, r] = sub(it.big, it.small); return it.answer[0] === q && it.answer[1] === r; }
      case "rule": { const r = sub(it.big, it.small)[1]; return it.answer === (r > 0 ? "both" : "factor"); }
      case "game": case "mult": { const r = sub(it.big, it.small)[1]; return it.answer === (r === 0 ? "yes" : "no"); }
    }
    return false;
  }));
};
/* the most likely wrong answer (the misconception); judge must reject it */
const nearMiss = (item: any) => item.near;
/* the forms of an answer that no question, hint or ladder line may print */
const answerForms = (item: any) => {
  if (item.parts) return item.answer.filter((x: number) => x >= 10).flatMap((x: number) => [String(x), indian(x), words(x)]);
  if (item.pad === "enter") { const xs = orNums(item.answer); return [orJoin(xs), orAnd(xs)]; }
  if (item.choices) { const c = item.choices.find((x: any) => x.id === item.answer); return [c ? c.label : String(item.answer), String(item.answer)]; }
  if (typeof item.answer === "number") return [String(item.answer), words(item.answer)];
  return [String(item.answer)];
};
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
/* a single card answer is given as words so the keyboard check does not take it for a number typed on the pad (it is lifted on the picture) */
const agentKey = (item: any) => (item.kind === "always" ? "just " + item.answer : item.answer);
/* the slot shows a list the child made (it is echoed to getState().typed); one too long keeps its first numbers and its last */
const format = (v: any) => {
  const s = String(v ?? "");
  if (s.length <= 14 || !/^\d+(, \d+)+$/.test(s)) return s;
  const xs = s.split(", ");
  for (let k = xs.length - 2; k >= 1; k--) { const t = `${xs.slice(0, k).join(", ")}, …, ${xs[xs.length - 1]}`; if (t.length <= 14) return t; }
  return `${xs[0]}, …`;
};

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => {
  if (T.state().stage === "demo") return HOOK.demo && HOOK.demo();
  if (item.pad === "enter") { if (HOOK.set) HOOK.set(item.answer); if (HOOK.enter) HOOK.enter(); return; }
  return T.submit(item.answer);
};
/* the agent's answer() for an item made on the working area: set it as a child would; undefined = type it */
const answer = (item: any, v: any) => (item.pad === "enter" && HOOK.set ? HOOK.set(v) : undefined);
/* the agent's check() before Enter: nothing waits on this working area, so Enter answers (undefined in the demo stage) */
const check = () => (HOOK.check ? HOOK.check() : undefined);

/* the gate's win line, one literal call per question (every line is one sentence) */
const orWinSay = (api: any, qid: any) => {
  switch (qid) {
    case "M2.S3.T6.C25:ML1": return api.say("Those four go into both 42 and 70 exactly.");
    case "M2.S3.T6.C25:1": return api.say("Only 1 and 2 go into both 20 and 34.");
    case "M2.S3.T6.C25:2": return api.say("1 goes into every number, so it is in both rings every time.");
    case "M2.S3.T6.C26:ML2": return api.say("The next meetings are 48, 60 and 72, and the tracks keep meeting.");
    case "M2.S3.T6.C26:4": return api.say("The tracks of 4 and 10 meet at 20, 40, 60 and 80.");
    case null: return api.say("The factors run out, but the multiples keep on going.");
    case "M2.S3.T6.C27:ML3": return api.say("Nothing is left over, so 112 is a multiple of 8.");
    case "M2.S3.T6.C27:3": return api.say("Nine full rows and an empty shelf show that 45 is a multiple of 5.");
    case "M2.S3.T6.C27:5": return api.say("An empty shelf shows that 7 goes into 126 with nothing over.");
    case "M2.S3.T6.C28:ML4": return api.say("74 is not a multiple of 9, and 9 is not a factor of 74.");
    case "M2.S3.T6.C28:7": return api.say("Seven counters stay on the shelf, so 8 does not divide 135 exactly.");
    case "M2.S3.T6.C28:8": return api.say("57 is not a multiple of 4, so you may not land on it.");
  }
};

/* ── state of one board (one entry = one question, or the warm-up, or free play) ───────────── */

const orBase = () => ({ mid: [], caught: [], given: [], lit: [], view: 0, touched: false, glow: false, board: false, test: null, readout: null, frame: null, cap: false,
  demoMid: null, demoCaught: null, needAct: false, filled: true, fillN: 0, countN: 0, said: 0, rev: null, ringNote: false, bandNote: false, lists: false, changed: false, fres: null, free: false, pair: 0 });
const orSetup = (it: any, warm: boolean) => {
  const base: any = orBase();
  if (it.kind === "common" || it.kind === "always") return { ...base, mode: "rings", a: it.a, b: it.b, filled: !warm, pair: -1 };
  if (it.kind === "next3" || it.kind === "first4") return { ...base, mode: "tracks", p: it.p, q: it.q, given: (it.given || []).slice() };
  if (it.kind === "stops") { const L = orLcm(it.p, it.q); return { ...base, mode: "both", a: it.p, b: it.q, p: it.p, q: it.q, given: [L, 2 * L] }; }
  return { ...base, mode: "gate", big: it.big, small: it.small, tray: it.big, per: it.small, dealt: 0, shelf: 0, ran: false, count: false };
};
const orFreeSetup = () => ({ ...orBase(), mode: "rings", free: true, a: OR_FREE[0][0], b: OR_FREE[0][1], p: OR_FREE[0][0], q: OR_FREE[0][1] });

/* the tracks' window: a whole run step keeps the meetings where they were */
const orTrackU = (p: number, q: number, pitch = 84) => pitch / Math.min(p, q);
const orSpan = (p: number, q: number, px: number) => px / orTrackU(p, q);
const orRunStep = (p: number, q: number, px: number) => {
  const L = orLcm(p, q), m = Math.min(p, q), span = orSpan(p, q, px);
  return L <= span * 0.6 ? L * Math.max(1, Math.floor((span * 0.6) / L)) : m * Math.max(1, Math.floor((span * 0.5) / m));
};
const orViewFor = (x: any, v: number, px: number) => {
  const st = orRunStep(x.p, x.q, px), span = orSpan(x.p, x.q, px) - 1;
  if (v >= x.view + 0.01 && v <= x.view + span) return x.view;
  if (v < x.view) return Math.max(0, Math.floor(v / st) * st);
  return Math.max(0, Math.ceil((v - span) / st) * st);
};

/* ── the rings: two ellipses of cord, the lists curving inside them, the lens they make is the middle ── */
const orSq = (dy: number, b: number) => Math.sqrt(Math.max(0, 1 - (dy / b) * (dy / b)));
function orRingGeom(x0: number, y0: number, w: number, h: number, cs: number) {
  const a = Math.min(360, (w - 28) / 3.1), b = Math.min(200, h / 2 - 4), d = 1.1 * a;
  const cxA = x0 + w / 2 - d / 2, cxB = cxA + d, cy = y0 + h / 2;
  const st = cs + 10, half = cs / 2, kmax = b >= 1.9 * st ? 3 : 2;
  /* where a row of cards centred dyc from the rings' middle may run: the ring's own width over the whole height of the card, so no card leaves the cord */
  const boxAt = (dyc: number, which: string) => {
    const dmax = Math.abs(dyc) + half, dmin = Math.max(0, Math.abs(dyc) - half);
    const smax = a * orSq(dmax, b), smin = a * orSq(dmin, b), y = cy + dyc - half;
    return which === "M" ? { y, left: cxB - smax + 8, right: cxA + smax - 8 }
      : which === "A" ? { y, left: cxA - smax + 10, right: cxB - smin - 8 }
        : { y, left: cxA + smin + 8, right: cxB + smax - 10 };
  };
  const rowsFor = (k: number) => (k === 1 ? [0] : k === 2 ? [-st / 2, st / 2] : [-st, 0, st]);
  return { a, b, d, cxA, cxB, cy, cs, kmax, boxAt, rowsFor };
}
/* how many cards a region holds in its fullest layout */
function orCapTotal(G: any, which: string) {
  const pitch = G.cs + 8;
  return G.rowsFor(G.kmax).reduce((s: number, dyc: number) => { const bx = G.boxAt(dyc, which); return s + Math.max(0, Math.floor((bx.right - bx.left + 8) / pitch)); }, 0);
}
/* n cards in the fewest rows that hold them, the rows centred on the rings' middle, the cards balanced across the rows */
function orPlace(G: any, n: number, which: string) {
  const pitch = G.cs + 8;
  const capOf = (dyc: number) => { const bx = G.boxAt(dyc, which); return Math.max(0, Math.floor((bx.right - bx.left + 8) / pitch)); };
  let k = 1;
  while (k < G.kmax && G.rowsFor(k).reduce((s: number, dyc: number) => s + capOf(dyc), 0) < n) k++;
  const offs = G.rowsFor(k), caps = offs.map(capOf), cnt = offs.map(() => 0);
  let left = n, guard = 0;
  while (left > 0 && guard++ < 200) {
    let moved = false;
    offs.forEach((_: any, i: number) => { if (left > 0 && cnt[i] < caps[i]) { cnt[i]++; left--; moved = true; } });
    if (!moved) break;
  }
  const out: any[] = [];
  offs.forEach((dyc: number, i: number) => {
    const c = cnt[i];
    if (!c) return;
    const bx = G.boxAt(dyc, which), wd = c * pitch - 8, sx = (bx.left + bx.right) / 2 - wd / 2;
    for (let j = 0; j < c; j++) out.push({ x: sx + j * pitch, y: bx.y });
  });
  return out;
}

/* a factor card: blue in its ring, rose once it stands in the middle */
function OrCard({ id, x, y, s, v, mid, lit, glow, live, onPress, fast, C, label, plain }: any) {
  const p = usePress(onPress, !!live);
  const col = mid ? OR_ROSE : OR_BLUE;
  return (
    <g style={{ transform: `translate(${x}px,${y}px)`, transition: fast ? "none" : "transform 420ms ease" } as any}>
      <g transform={p.down ? "translate(0,3)" : undefined}>
        {(lit || glow) && <rect x={-4} y={-4} width={s + 8} height={s + 8} rx={19} fill="none" stroke={lit ? C.accent : shade(col, 0.1)} strokeWidth={4} />}
        <rect width={s} height={s} rx={16} fill={tint(col, mid ? 0.64 : 0.8)} stroke={shade(col, 0.08)} strokeWidth={3} filter="url(#fShadowSoft)" />
        <rect x={7} y={5} width={s - 14} height={s * 0.28} rx={10} fill="#FFFFFF" fillOpacity={0.4} />
        <text x={s / 2} y={s / 2 + (s >= 72 ? 14 : 11)} textAnchor="middle" fontSize={s >= 72 ? T.prompt : T.label} fontWeight={700} fill={C.ink}>{v}</text>
      </g>
      {live && !plain && <rect className="c4-hit" data-control={id} role="button" tabIndex={0} aria-label={label}
        width={s} height={s} fill="transparent" {...p.bind()} onKeyDown={p.keys} />}
    </g>
  );
}

/* a flag on a track: a stick and a cloth, the number written on the cloth. The plain stick and cloth are the fallback; the flag skin
   (a butter cloth on a wooden stick, cloth blank) goes over them and the content colour is tinted over its cloth in code */
function OrFlag({ x, y, v, fw, fh, col, fs, fast, C }: any) {
  const sx = -fw / 2, x0 = sx + 0.09 * fw, cw = 0.91 * fw - 1, y0 = -fh / 2 + 0.06 * fh, ch = 0.46 * fh;
  return (
    <g style={{ transform: `translate(${x}px,${y}px)`, transition: fast ? "none" : "transform 460ms ease" } as any}>
      <path d={`M ${sx + 3} ${-fh / 2} V ${fh / 2}`} stroke={shade("#B08A5A", 0.12)} strokeWidth={5} strokeLinecap="round" />
      <rect x={x0} y={y0} width={cw} height={ch} rx={3} fill={tint(col, 0.8)} stroke={shade(col, 0.1)} strokeWidth={2} />
      <Skin name="flag" x={sx} y={-fh / 2} w={fw} h={fh} fit="stretch" />
      <rect x={x0} y={y0} width={cw} height={ch} rx={3} fill={col} fillOpacity={0.5} stroke={shade(col, 0.2)} strokeWidth={2} />
      <text x={x0 + cw / 2} y={y0 + ch / 2 + fs * 0.36} textAnchor="middle" fontSize={fs} fontWeight={700} fill={C.ink}>{v}</text>
    </g>
  );
}

/* a number held in the shared band (rose) */
function OrBand({ x, y, v, w, h, fast, C, glow, fs }: any) {
  return (
    <g style={{ transform: `translate(${x}px,${y}px)`, transition: fast ? "none" : "transform 460ms ease" } as any}>
      {glow && <rect x={-w / 2 - 4} y={-h / 2 - 4} width={w + 8} height={h + 8} rx={14} fill="none" stroke={shade(OR_ROSE, 0.1)} strokeWidth={4} />}
      <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={10} fill={tint(OR_ROSE, 0.62)} stroke={shade(OR_ROSE, 0.1)} strokeWidth={2.5} />
      <text y={fs * 0.36} textAnchor="middle" fontSize={fs} fontWeight={700} fill={C.ink}>{v}</text>
    </g>
  );
}

/* a number chip in a statement: amber for the number shared out, blue for the one it is divided by */
function OrChip({ x, y, v, big }: any) {
  const w = 30 + String(v).length * 20, col = big ? OR_AMBER : OR_BLUE;
  return (
    <g>
      <rect x={x} y={y - 30} width={w} height={40} rx={10} fill={tint(col, 0.8)} stroke={shade(col, 0.1)} strokeWidth={2.5} />
      <text x={x + w / 2} y={y} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={"#2B2B2B"}>{v}</text>
    </g>
  );
}

/* ── the working area ──────────────────────────────────────────────────────────────────────
   keyOnly: the area is 64,108 · 1472 x 520 shut, 900 x 520 open (bigPad); box.key is the key's corner (nothing under it).
   Rings and tracks are answered on the picture (pad "enter": no panel, so the full width); the gate and the choice questions open the
   panel, so the gate is laid out for 896 wide and centred while the panel is shut. */
function Work({ phase, n, item: item0, index, stage, wrong, typed, api, MODEL, step, stepOn, box, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();
  const fast = reducedMotion();
  const en = lang === "en";
  const free = stage === "free";
  const hasSteps = !!PHASES[n - 1].steps;
  const warm = (stage === "demo" || stage === "teach") && hasSteps;
  const item = warm ? OR_WARM[n - 1] : item0;
  const qk = free ? "free" : warm ? "w" + n : "q" + n + "." + index;
  /* the board belongs to its ENTRY: derived during render, never in a passive effect (PATTERNS 18) */
  const ent = useRef<any>({ qk: null, n: 0, S: null });
  if (ent.current.qk !== qk) ent.current = { qk, n: ent.current.n + 1, S: free ? orFreeSetup() : orSetup(item, warm) };
  const [, force] = useState(0);
  const cur = () => ent.current.S;
  const up = (nx: any) => { ent.current.S = nx; force((v: number) => v + 1); };
  const S = cur();
  const playing = useRef(false);
  const lastKey = useRef(0);
  const nudged = useRef(false);
  useEffect(() => () => { tl.stop(); playing.current = false; nudged.current = false; }, [qk]);

  const bw = box ? box.w : 1472;
  const kx = box && box.key ? box.key.x - 12 : Math.min(bw, 1178);
  const Wt = Math.min(bw, kx);
  const busy = tl.busy;
  const live = !busy && (stage === "ask" || stage === "demo" || free);
  const kind = item.kind;
  const listItem = stage === "ask" && item0 && item0.pad === "enter";

  /* what Enter sends for a list made here (and the slot echoes it as it is made) */
  const valueOf = (x: any) => (x.mode === "rings" ? orJoin(x.mid) : orJoin(x.caught));
  const echo = (x: any) => { if (listItem) api.setTyped(valueOf(x)); };
  const unDemo = (x: any) => (x.demoMid || x.demoCaught ? { ...x, demoMid: null, demoCaught: null, readout: null, lit: [], glow: false, board: false, test: null } : x);

  /* one act on screen at a time; the state, the sound and api.did(on) happen once, when it resolves true */
  const viaAct = (o: any, done: () => void) => {
    if (playing.current) return;
    const e0 = ent.current.n;
    playing.current = true;
    api.act(o).then((ok: boolean) => {
      playing.current = false;
      if (ok && ent.current.n === e0) done();
    });
  };
  /* in a guide step only the awaited act is performed; any other is reported (api.did shows the step's hint) and does nothing */
  const gated = (name: string) => {
    if (stage !== "demo") return true;
    if (name !== stepOn) { api.did(name); return false; }
    return true;
  };
  const pressKey = (fn: () => void) => { const t = Date.now(); if (t - lastKey.current < 400) return; lastKey.current = t; fn(); };

  /* ── the rings ── */
  const G = orRingGeom(10, 6, Wt - 20, 412, 72);
  const lA = orFactors(S.a || 1), lB = orFactors(S.b || 1);
  const vMid = S.demoMid || S.mid, vCaught = S.demoCaught || S.caught;
  const mids = orSet(vMid);
  const pA = S.mode === "rings" ? orPlace(G, lA.length, "A") : [], pB = S.mode === "rings" ? orPlace(G, lB.length, "B") : [], pM = S.mode === "rings" ? orPlace(G, mids.length, "M") : [];
  const capM = orCapTotal(G, "M");
  const common = (v: number) => S.a % v === 0 && S.b % v === 0;

  const lift = (v: number, wantIn: boolean) => {
    const x0 = cur();
    if (!live) return;
    const name = wantIn ? (common(v) ? "lift" : "lone") : "back";
    if (!gated(name)) return;
    const x = unDemo(x0), has = x.mid.indexOf(v) >= 0;
    /* where a card is drawn during a standing correction is the correction's picture, not the child's: the tap toggles the child's own answer */
    if (x0.demoMid) wantIn = !has;
    if (has === wantIn || (wantIn && x.mid.length >= capM)) { if (x !== x0) { up(x); api.sfx.tick(); } return; }
    const nx = { ...x, mid: wantIn ? [...x.mid, v] : x.mid.filter((m: number) => m !== v), touched: true, needAct: false };
    up(nx); api.sfx.tick(); echo(nx);
    if (stage === "demo") api.did(name);
  };
  const doFill = () => {
    const x = cur();
    if (x.filled || playing.current) return;
    const at = [...pA, ...pB].map((p: any) => ({ x: p.x + 36, y: p.y + 36 }));
    viaAct({ ms: 900, tool: "pencil", moves: "push", at, onPoint: (i: number) => up({ ...cur(), fillN: i + 1 }) }, () => {
      up({ ...cur(), filled: true, fillN: at.length }); api.sfx.settle(); api.did("fill");
    });
  };
  const doChange = () => {
    const x = cur();
    if (playing.current || (!free && kind !== "always")) return;
    const list = free ? OR_FREE : OR_COPRIME, k = (x.pair + 1) % list.length;
    viaAct({ ms: 800, tool: "hand", moves: "tap", at: [{ x: G.cxA - 40 + 6, y: G.cy - 160 + 30 }, { x: G.cxB + 40 + 6, y: G.cy - 160 + 30 }] }, () => {
      const y = unDemo(cur());
      const nx: any = { ...y, a: list[k][0], b: list[k][1], pair: k, mid: [], caught: [], view: 0, fres: null, touched: true, needAct: false, changed: true };
      nx.p = nx.a; nx.q = nx.b;
      up(nx); api.sfx.tick(); echo(nx);
      /* the nudge said at an early Enter is answered by Change: the question comes back (PATTERNS 18) */
      if (nudged.current && item0) { nudged.current = false; api.say(item0.say); }
      if (nx.mode === "tracks") autoCatch(nx);
    });
  };

  /* ── the tracks ── */
  /* the tracks at full size; T1 is the compact pair with the factor lists below it, T2 the same two tracks alone */
  const T0 = { headW: 190, yA: 108, yB: 338, fw: 80, fh: 120, bandTop: 170, bandBot: 276, lanes: [194, 252], cardH: 46, cardW: 72, fs: T.label, pitch: 84 };
  const T1 = { headW: 170, yA: 52, yB: 196, fw: 60, fh: 90, bandTop: 100, bandBot: 150, lanes: [125, 125], cardH: 44, cardW: 56, fs: T.micro, pitch: 60 };
  const T2 = { headW: 170, yA: 100, yB: 312, fw: 60, fh: 90, bandTop: 150, bandBot: 262, lanes: [180, 232], cardH: 46, cardW: 60, fs: T.label, pitch: 60 };
  const TP = S.mode === "both" ? (S.lists ? T1 : T2) : T0;
  const tw = Math.min(Wt, S.mode === "both" ? 900 : 1178);
  const X0 = TP.headW + 52, xMaxFlag = tw - 40, px = xMaxFlag - X0;
  const uu = S.mode === "rings" || S.mode === "gate" ? 1 : orTrackU(S.p, S.q, TP.pitch);
  const spanU = px / uu;
  const xOf = (v: number) => X0 + (v - S.view) * uu;
  const inView = (v: number) => { const X = xOf(v); return X >= X0 - 0.5 && X <= xMaxFlag; };
  const catchV = (v: number, wantIn: boolean) => {
    const x0 = cur();
    if (!live || x0.given.indexOf(v) >= 0) return;
    const isCommon = v % x0.p === 0 && v % x0.q === 0;
    const name = wantIn ? (isCommon ? "catch" : "lone") : "back";
    if (!gated(name)) return;
    const x = unDemo(x0), has = x.caught.indexOf(v) >= 0;
    if (x0.demoCaught) wantIn = !has;
    if (has === wantIn) { if (x !== x0) { up(x); api.sfx.tick(); } return; }
    const nx = { ...x, caught: wantIn ? [...x.caught, v] : x.caught.filter((c: number) => c !== v), touched: true, needAct: false };
    up(nx); api.sfx.tick(); echo(nx);
    if (stage === "demo") api.did(name);
  };
  /* free play: the band catches every meeting in view, flags sliding together one at a time */
  const autoCatch = (x: any) => {
    const L = orLcm(x.p, x.q), end = x.view + spanU + 0.001, Z: any[] = [];
    for (let v = L; v <= end; v += L) {
      if (v < x.view || x.caught.indexOf(v) >= 0) continue;
      const j = v;
      Z.push([280, () => { const y = cur(); if (y.caught.indexOf(j) < 0) { up({ ...y, caught: [...y.caught, j] }); api.sfx.tick(); } }]);
    }
    if (Z.length) tl.run(Z);
  };
  const doRun = (dir: number) => {
    const x = cur();
    if (playing.current) return;
    const name = dir > 0 ? "runon" : "goback";
    const view = Math.max(0, x.view + dir * orRunStep(x.p, x.q, px));
    if (view === x.view) return;
    if (!gated(name)) return;
    const ym = (TP.yA + TP.yB) / 2, from = dir > 0 ? xMaxFlag - 20 : X0 + 40, to = dir > 0 ? X0 + 40 : xMaxFlag - 20;
    viaAct({ ms: 800, tool: "hand", moves: "push", from: { x: from, y: ym }, at: [{ x: (from + to) / 2, y: ym }], to: { x: to, y: ym } }, () => {
      const nx = { ...unDemo(cur()), view, touched: true };
      up(nx); api.sfx.tick();
      if (free) autoCatch(nx);
      api.did(name);
    });
  };
  const flipMode = () => {
    const x = cur();
    if (!live || !free || playing.current) return;
    viaAct({ ms: 800, tool: "hand", moves: "tap", at: [{ x: Wt / 2, y: OR_KEY_Y + 36 }] }, () => {
      const y = cur();
      const nx = { ...unDemo(y), mode: y.mode === "rings" ? "tracks" : "rings", p: y.a, q: y.b, view: 0, caught: [], mid: [], fres: null };
      up(nx); api.sfx.tick();
      if (nx.mode === "tracks") autoCatch(nx);
    });
  };
  const freeDivide = () => {
    const x = cur();
    if (!live || !free || playing.current) return;
    viaAct({ ms: 800, tool: "hand", moves: "tap", at: [{ x: Wt / 2, y: OR_KEY_Y + 36 }] }, () => {
      const y = cur(), big = Math.max(y.a, y.b), small = Math.min(y.a, y.b);
      up({ ...y, fres: { big, small, q: Math.floor(big / small), r: big % small } }); api.sfx.tick();
    });
  };

  /* ── the gate ── */
  const gx = Math.max(0, (Wt - OR_G.w) / 2);
  const rowAt = (i: number) => ({ x: gx + OR_G.cols[i < OR_G.rows ? 0 : 1], y: OR_G.top + (i % OR_G.rows) * OR_G.pitch + OR_G.pitch / 2 - 3 });
  const doDivide = () => {
    const x = cur();
    if (x.ran || playing.current || (box && box.open)) return;
    if (!gated("divide")) return;
    const q = Math.floor(x.tray / x.per), r = x.tray % x.per, nRows = Math.min(q, 18);
    const at = Array.from({ length: nRows }, (_: any, i: number) => ({ x: rowAt(i).x + (x.per * OR_G.step) / 2, y: rowAt(i).y }));
    const shelf = { x: gx + OR_G.bx + 300, y: OR_G.shelfY + OR_G.shelfH / 2 };
    viaAct({ ms: 800, tool: "hand", moves: "push", from: { x: gx + OR_G.tray / 2, y: 120 }, at: at.length ? at : [shelf], to: shelf, onPoint: (i: number) => { if (at.length) up({ ...cur(), dealt: i + 1 }); } }, () => {
      up({ ...cur(), dealt: nRows, shelf: r, ran: true, touched: true }); api.sfx.settle(); api.did("divide");
    });
  };
  const doCount = () => {
    const x = cur();
    if (!x.ran || x.countN > 0 || playing.current) return;
    if (!gated("count")) return;
    const q = Math.min(Math.floor(x.tray / x.per), 18);
    const at = Array.from({ length: q }, (_: any, i: number) => ({ x: rowAt(i).x + x.per * OR_G.step + 22, y: rowAt(i).y }));
    viaAct({ ms: 800, tool: "hand", moves: "tap", at, onPoint: (i: number) => up({ ...cur(), countN: i + 1, count: true }) }, () => {
      up({ ...cur(), countN: q, count: true }); api.sfx.settle(); api.did("count");
    });
  };
  const doSay = () => {
    const x = cur();
    if (!x.ran || x.frame || playing.current) return;
    if (!gated("say")) return;
    const y1 = OR_KEY_Y + 20, y2 = OR_KEY_Y + 62, x0 = gx + 230;
    const at = [...Array.from({ length: 6 }, (_: any, i: number) => ({ x: x0 + i * 60, y: y1 })), ...Array.from({ length: 6 }, (_: any, i: number) => ({ x: x0 + i * 60, y: y2 }))];
    viaAct({ ms: 900, tool: "pencil", moves: "push", at, onPoint: (i: number) => up({ ...cur(), said: i + 1, frame: stmtRows(cur(), false).slice(0, i >= 9 ? 2 : i >= 3 ? 1 : 0) }) }, () => {
      up({ ...cur(), said: 12, frame: stmtRows(cur(), false) }); api.sfx.settle(); api.did("say");
    });
  };
  /* the two statements one division settles */
  const stmtRows = (x: any, game: boolean) => {
    const neg = x.big % x.small > 0;
    return [{ t: "stmt", a: x.big, b: x.small, rel: "multiple", neg, tail: game ? (neg ? "so you may not" : "so you may") : "" },
      { t: "stmt", a: x.small, b: x.big, rel: "factor", neg }];
  };

  /* one step of the warm-up performed for the agent's check(), Enter and the dev solve() */
  const act = (on: any) => {
    const x = cur();
    if (on === "fill") doFill();
    else if (on === "lift") {
      const v = orSet([...lA, ...lB]).find((c: number) => common(c) && x.mid.indexOf(c) < 0);
      if (v !== undefined) lift(v, true);
    } else if (on === "runon") doRun(1);
    else if (on === "catch") {
      const L = orLcm(x.p, x.q);
      for (let v = L; v < 4000; v += L) { if (x.caught.indexOf(v) < 0) { if (!inView(v)) { doRun(1); } else catchV(v, true); break; } }
    } else if (on === "divide") doDivide();
    else if (on === "count") doCount();
    else if (on === "say") doSay();
  };

  /* Enter goes here first while the working area owns the answer; in a steps phase it performs the CURRENT step */
  /* the 'always' question waits for Change: the opening pair shares more than 1, so the child must try another pair first */
  const enterFn: any = listItem ? () => {
    const x = cur();
    if (tl.busy || x.needAct) return;
    if (kind === "always" && !x.changed) { nudged.current = true; api.say("Tap Change first, then lift the card in both rings."); return; }
    const v = valueOf(x);
    if (v) api.submit(v);
  } : null;
  api.onEnter(stage === "demo" && stepOn ? () => act(stepOn) : enterFn);
  HOOK.enter = () => enterFn && enterFn();
  HOOK.set = (v: any) => {
    let x = cur();
    if (stage !== "ask" || tl.busy) return false;
    const xs = orSet(orNums(v));
    if (x.mode === "rings") {
      /* the agent's answer to the 'always' question changes the pair first, as a child must */
      if (kind === "always" && !x.changed) x = { ...x, a: OR_COPRIME[0][0], b: OR_COPRIME[0][1], pair: 0, mid: [], changed: true };
      const all = orSet([...orFactors(x.a), ...orFactors(x.b)]);
      const mid = xs.filter((m) => all.indexOf(m) >= 0).slice(0, capM);
      if (!mid.length) return false;
      const nx = { ...unDemo(x), mid, touched: true, needAct: false }; up(nx); echo(nx); return true;
    }
    if (x.mode === "tracks") {
      const caught = xs.filter((c) => c > 0 && (c % x.p === 0 || c % x.q === 0) && x.given.indexOf(c) < 0);
      if (!caught.length) return false;
      const nx = { ...unDemo(x), caught, touched: true, needAct: false }; up(nx); echo(nx); return true;
    }
    return false;
  };
  /* the Enter key in the corner blinks once the list has something in it */
  const listVal = listItem ? valueOf(S) : "";
  useEffect(() => { if (listItem) api.answerReady(!!listVal && !S.needAct && (kind !== "always" || S.changed)); return () => { if (listItem) api.answerReady(false); }; }, [listVal, listItem, S.needAct, S.changed, qk]);

  /* ── the traceback: the mathematics redrawn, ending on the whole right answer (nothing marked) ── */
  const tracebackSteps = (w: any) => {
    const x = cur(), Z: any[] = [];
    if (kind === "common" || kind === "always") {
      /* a miss on the 'always' question before any Change (only a dev submit gets there) is first moved to a pair that shares only 1 */
      const x1 = kind === "always" && !x.changed ? { ...x, a: OR_COPRIME[0][0], b: OR_COPRIME[0][1], pair: 0, mid: [], changed: true } : x;
      const sA = orFactors(x1.a), sB = orFactors(x1.b);
      /* the right middle is every card in both lists; the cards to test are the child's own lifts that are not in it, and the ones it lacks */
      const shared = kind === "always" ? [1] : sA.filter((v) => sB.indexOf(v) >= 0);
      const todo = orSet([...x1.mid, ...shared]).filter((v) => (x1.mid.indexOf(v) >= 0) !== (shared.indexOf(v) >= 0));
      Z.push([600, () => up({ ...x1, ...cur(), a: x1.a, b: x1.b, pair: x1.pair, changed: x1.changed, mid: x1.mid, board: true, readout: null, test: null, lit: [], glow: false, demoMid: x1.mid.slice(), needAct: true })]);
      todo.forEach((v) => {
        Z.push([1300, () => up({ ...cur(), lit: [v], test: v })]);
        Z.push([600, () => {
          const y = cur(), dm = y.demoMid || y.mid, both = y.a % v === 0 && y.b % v === 0;
          up({ ...y, demoMid: both ? orSet([...dm, v]) : dm.filter((m: number) => m !== v) }); api.sfx.tick();
        }]);
      });
      Z.push([400, () => up({ ...cur(), lit: [], glow: true })]);
      return Z;
    }
    if (kind === "next3" || kind === "first4") {
      const right = orNums(item.answer);
      const extra = x.caught.filter((v: number) => right.indexOf(v) < 0).sort((a: number, b: number) => a - b);
      const missing = right.filter((v) => x.caught.indexOf(v) < 0);
      Z.push([300, () => up({ ...cur(), readout: null, lit: [], demoCaught: x.caught.slice(), needAct: true })]);
      extra.forEach((v: number) => {
        Z.push([700, () => { const y = cur(); up({ ...y, view: orViewFor(y, v, px), lit: [v] }); }]);
        Z.push([700, () => { const y = cur(); up({ ...y, demoCaught: (y.demoCaught || y.caught).filter((c: number) => c !== v), lit: [] }); api.sfx.tick(); }]);
      });
      missing.forEach((v) => {
        Z.push([700, () => { const y = cur(); up({ ...y, view: orViewFor(y, v, px), lit: [v] }); }]);
        Z.push([700, () => { const y = cur(); up({ ...y, demoCaught: orSet([...(y.demoCaught || y.caught), v]), lit: [] }); api.sfx.tick(); }]);
      });
      Z.push([400, () => { const y = cur(); up({ ...y, view: orViewFor(y, right[right.length - 1], px), lit: right, readout: orJoin(right) }); }]);
      return Z;
    }
    if (kind === "stops") {
      /* the correction brings the factor lists in: each shut by a wall at both ends, the shared part shut with them, under the open tracks */
      Z.push([300, () => up({ ...cur(), lists: true, ringNote: false, bandNote: false })]);
      Z.push([1000, () => { up({ ...cur(), ringNote: true }); api.sfx.tick(); }]);
      Z.push([900, () => { up({ ...cur(), bandNote: true }); api.sfx.tick(); }]);
      return Z;
    }
    /* the gate (phases 3 and 4) */
    const parts = item.parts ? slotPartsOf(w && w.value, 2).map((t: string) => parseInt(t, 10)) : [NaN, NaN];
    const reversed = !!item.parts && parts[0] === 0 && parts[1] === x.small;
    const q = Math.floor(x.big / x.small), r = x.big % x.small;
    Z.push([300, () => up({ ...cur(), tray: x.big, per: x.small, dealt: 0, shelf: 0, ran: false, count: false, countN: 0, cap: false, frame: null, rev: null })]);
    if (reversed) {
      /* the smaller divided by the bigger: no full row at all, the whole of it on the shelf */
      Z.push([500, () => up({ ...cur(), tray: x.small, per: x.big })]);
      Z.push([900, () => { up({ ...cur(), shelf: x.small, ran: true }); api.sfx.tick(); }]);
      Z.push([1300, () => up({ ...cur(), rev: { a: x.small, b: x.big, r: x.small } })]);
      Z.push([1200, () => up({ ...cur(), tray: x.big, per: x.small, shelf: 0, ran: false, rev: null })]);
    }
    for (let i = 1; i <= Math.min(q, 18); i++) { const j = i; Z.push([i === 1 ? 500 : 260, () => { up({ ...cur(), dealt: j, count: true, countN: j }); api.sfx.tick(); }]); }
    for (let k = 1; k <= r; k++) { const j = k; Z.push([k === 1 ? 500 : 340, () => { up({ ...cur(), shelf: j }); api.sfx.tick(); }]); }
    Z.push([700, () => { up({ ...cur(), ran: true, cap: true }); if (!r) api.sfx.tick(); }]);
    if (r > 0 || kind === "game" || kind === "rule" || kind === "mult") {
      Z.push([900, () => up({ ...cur(), frame: stmtRows(cur(), kind === "game").slice(0, 1) })]);
      Z.push([1100, () => up({ ...cur(), frame: stmtRows(cur(), kind === "game") })]);
    }
    return Z;
  };
  useEffect(() => {
    if (!wrong || stage !== "ask") return;
    api.lock(true);
    tl.run(tracebackSteps(wrong), () => api.lock(false));
  }, [wrong]);

  /* ── the win: the maths moves once more, and the line is said ── */
  useEffect(() => {
    if (stage !== "win") return;
    const x = cur();
    if (x.mode === "gate") {
      /* the line is said at once (the phase's closing replaces it at the last question); the board then finishes its division */
      orWinSay(api, item0.qid);
      const fin = () => {
        const y = cur();
        up({ ...y, cap: true, rev: null, frame: stmtRows(y, item0.kind === "game") });
      };
      if (!x.ran || x.tray !== x.big) {
        const q = Math.floor(x.big / x.small), r = x.big % x.small, Z: any[] = [[100, () => up({ ...cur(), tray: x.big, per: x.small, dealt: 0, shelf: 0, ran: false })]];
        for (let i = 1; i <= Math.min(q, 18); i++) { const j = i; Z.push([45, () => up({ ...cur(), dealt: j })]); }
        Z.push([200, () => up({ ...cur(), shelf: r, ran: true })]);
        tl.run(Z, fin);
      } else fin();
    } else if (x.mode === "rings") { up({ ...x, glow: true, lit: [] }); orWinSay(api, item0.qid); }
    else if (x.mode === "tracks") { up({ ...x, glow: true, lit: [] }); orWinSay(api, item0.qid); }
    else if (x.mode === "both") { up({ ...x, lists: true, ringNote: true, bandNote: true, glow: true }); orWinSay(api, item0.qid); }
  }, [stage]);

  /* ── what the host and the agent read back (toolApi.getState) ── */
  const ringsOn = S.mode === "rings" || S.mode === "both";
  api.share({
    phase: n, picture: S.mode,
    numbers: S.mode === "gate" ? [S.big, S.small] : S.mode === "tracks" || S.mode === "both" ? [S.p, S.q] : [S.a, S.b],
    ringA: ringsOn ? orFactors(S.a) : null, ringB: ringsOn ? orFactors(S.b) : null, ringC: null,
    overlap: S.mode === "rings" ? orSet(vMid) : S.mode === "both" && S.lists ? orSet(orFactors(S.a).filter((v) => S.b % v === 0)) : null,
    band: S.mode === "tracks" || S.mode === "both" ? orSet([...S.given, ...vCaught]) : null,
    trackStart: S.mode === "tracks" || S.mode === "both" ? S.view : null,
    gateRemainder: S.mode === "gate" && S.ran ? S.shelf : null,
    complete: stage === "idle",
  });

  const cord = shade(C.rule, 0.38);
  const quiet = mix(C.ink, C.panel, 0.5);

  /* the action keys, one row at the bottom centre, labels following the act */
  const keyRow = (defs: any[]) => {
    if (!defs.length) return null;
    const cnt = defs.length, gap = 24, kw = Math.min(en ? 230 : 280, (Wt - 40 - gap * (cnt - 1)) / cnt);
    const x0 = Wt / 2 - (cnt * kw + gap * (cnt - 1)) / 2;
    return defs.map((d: any, i: number) => (
      <Key key={d.id} id={d.id} label={d.label} x={x0 + i * (kw + gap)} y={OR_KEY_Y} w={kw} h={OR_KEY_H} C={C} tone="key" onClick={() => pressKey(d.onClick)} disabled={d.disabled}>
        <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={d.disabled ? quiet : toneInk("key", C.ink)}>{tx(d.label)}</text>
      </Key>
    ));
  };
  const keyBox = (cnt: number, i: number) => {
    const gap = 24, kw = Math.min(en ? 230 : 280, (Wt - 40 - gap * (cnt - 1)) / cnt), x0 = Wt / 2 - (cnt * kw + gap * (cnt - 1)) / 2;
    return { x: x0 + i * (kw + gap), y: OR_KEY_Y, w: kw, h: OR_KEY_H };
  };

  /* ── drawing: the rings (factor mode) ── */
  const drawRings = () => {
    const nA = lA.length;
    const shown = (idx: number) => S.filled || idx < S.fillN;
    const hl = G.b * Math.sqrt(1 - (G.d / (2 * G.a)) * (G.d / (2 * G.a))), xm = (G.cxA + G.cxB) / 2;
    const lens = `M ${xm} ${G.cy - hl} A ${G.a} ${G.b} 0 0 1 ${xm} ${G.cy + hl} A ${G.a} ${G.b} 0 0 1 ${xm} ${G.cy - hl} Z`;
    const cards: any[] = [];
    lA.forEach((v, k) => { if (mids.indexOf(v) < 0 && pA[k] && shown(k)) cards.push({ key: "A-" + v, id: "fc-a-" + v, v, x: pA[k].x, y: pA[k].y, mid: false }); });
    lB.forEach((v, k) => { if (mids.indexOf(v) < 0 && pB[k] && shown(nA + k)) cards.push({ key: "B-" + v, id: "fc-b-" + v, v, x: pB[k].x, y: pB[k].y, mid: false }); });
    mids.forEach((v, j) => { if (pM[j]) cards.push({ key: (lA.indexOf(v) >= 0 ? "A-" : "B-") + v, id: "fc-m-" + v, v, x: pM[j].x, y: pM[j].y, mid: true }); });
    cards.sort((p: any, q: any) => (p.key < q.key ? -1 : 1));
    const tag = (cx: number, v: number, k: string) => (
      <g key={"tag" + k}>
        <rect x={cx - 56} y={G.cy - 160 - 28} width={112} height={60} rx={14} fill="#FFFFFF" stroke={cord} strokeWidth={3} />
        <text x={cx} y={G.cy - 160 + 14} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={C.ink}>{v}</text>
      </g>
    );
    const firstLift = S.filled ? cards.find((c: any) => !c.mid && common(c.v)) : null;
    const invite = live && !S.touched && !wrong && ((stage === "demo" && stepOn === "lift") || (stage === "ask"));
    return (
      <g>
        <path d={lens} fill={tint(OR_ROSE, 0.86)} />
        <ellipse cx={G.cxA} cy={G.cy} rx={G.a} ry={G.b} fill="none" stroke={cord} strokeWidth={6} />
        <ellipse cx={G.cxB} cy={G.cy} rx={G.a} ry={G.b} fill="none" stroke={cord} strokeWidth={6} />
        {tag(G.cxA - 40, S.a, "a")}
        {tag(G.cxB + 40, S.b, "b")}
        {cards.map((c: any) => (
          <OrCard key={c.key} id={c.id} x={c.x} y={c.y} s={72} v={c.v} mid={c.mid} C={C} fast={fast}
            lit={S.lit.indexOf(c.v) >= 0} glow={S.glow && c.mid} live={live && S.filled} onPress={() => lift(c.v, !c.mid)}
            label={c.mid ? `send ${c.v} back` : `lift ${c.v} into the middle`} />
        ))}
        {invite && firstLift && stage === "demo" && <Invite x={firstLift.x + 36} y={firstLift.y + 36} w={72} h={72} rx={16} C={C} />}
      </g>
    );
  };

  /* the board beside the rings: each card tested on both numbers (the correction), or free play's division */
  const drawBoard = () => {
    const bx = kx + 6, bwid = bw - bx - 10;
    if (bwid < 220) return null;
    const by = 104, bh = 330, cx = bx + bwid / 2, t = S.test;
    return (
      <g pointerEvents="none">
        <rect x={bx} y={by} width={bwid} height={bh} rx={RAD.panel} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={2} />
        {S.board && t !== null && (
          <g>
            <rect x={cx - 42} y={by + 20} width={84} height={84} rx={16} fill={tint(OR_BLUE, 0.8)} stroke={shade(OR_BLUE, 0.08)} strokeWidth={3} />
            <text x={cx} y={by + 76} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={C.ink}>{t}</text>
            {[S.a, S.b].map((N: number, k: number) => (
              <g key={k}>
                <text x={bx + 24} y={by + 160 + k * 100} fontSize={T.label} fontWeight={600} fill={C.ink}>{`${N} ÷ ${t}`}</text>
                <text x={bx + 24} y={by + 202 + k * 100} fontSize={T.label} fontWeight={700} fill={C.ink}>{en ? `${N % t} left` : `${N % t} ${tx("left")}`}</text>
              </g>
            ))}
          </g>
        )}
        {S.fres && (() => {
          const hi = lang === "hi", f = S.fres, m = f.r === 0, ln = (y: number, t: string, sz: number, w: number) => <text x={cx} y={by + y} textAnchor="middle" fontSize={sz} fontWeight={w} fill={C.ink}>{t}</text>;
          /* the one division settles both statements: the multiple and the factor */
          return (
            <g>
              {ln(56, `${f.big} ÷ ${f.small} =`, T.label, 600)}
              {ln(100, en ? `${f.q}, ${f.r} left` : `${f.q}, ${tx("remainder")} ${f.r}`, T.label, 700)}
              {en ? ln(156, `${f.big} ${m ? "is" : "isn't"} a`, T.micro, 600) : ln(156, `${f.big} ${hi ? "," : tx("between two numbers")} ${f.small}`, T.micro, 600)}
              {en ? ln(188, `multiple of ${f.small}`, T.micro, 600) : ln(188, tx(m ? "is a multiple of" : "isn't a multiple of"), T.micro, 600)}
              {en ? ln(240, `${f.small} ${m ? "is" : "isn't"} a`, T.micro, 600) : ln(240, `${f.small} ${hi ? "," : tx("between two numbers")} ${f.big}`, T.micro, 600)}
              {en ? ln(272, `factor of ${f.big}`, T.micro, 600) : ln(272, tx(m ? "is a factor of" : "isn't a factor of"), T.micro, 600)}
            </g>
          );
        })()}
      </g>
    );
  };

  /* ── drawing: the tracks (multiple mode) ── */
  const drawTracks = () => {
    const P = TP, cardW = P.cardW;
    const listIn = (step: number) => { const out: number[] = []; for (let v = Math.max(step, Math.ceil(S.view / step) * step); v < S.view + spanU + 2; v += step) if (inView(v)) out.push(v); return out; };
    const fa = listIn(S.p), fb = listIn(S.q);
    const band = orSet([...S.given, ...vCaught]).filter(inView);
    const onA = (v: number) => v % S.p === 0;
    const laneY = [P.lanes[0], P.lanes[1]], last = [-1e9, -1e9], at: Record<number, number> = {};
    band.forEach((v) => { const X = xOf(v); let k = [0, 1].find((j) => X - last[j] >= cardW + 6); if (k === undefined) k = 0; last[k] = X; at[v] = laneY[k]; });
    const flagsLive = live && S.mode === "tracks";
    const seen = band;
    const roomy = seen.filter((v) => S.given.indexOf(v) < 0 && seen.every((w) => w === v || Math.abs(xOf(w) - xOf(v)) >= 80));
    const head = (y: number, step: number, k: string) => (
      <g key={"head" + k}>
        {en ? <text x={12} y={y - 8} fontSize={P.fs} fontWeight={600} fill={C.ink}>{tx("multiples")}</text>
          : <text x={12} y={y + 36} fontSize={P.fs} fontWeight={600} fill={C.ink}>{tx("multiples")}</text>}
        {en ? <text x={12} y={y + 30} fontSize={P.fs} fontWeight={700} fill={shade(OR_GREEN, 0.3)}>{`of ${step}`}</text>
          : <text x={12} y={y - 8} fontSize={P.fs} fontWeight={700} fill={shade(OR_GREEN, 0.3)}>{`${step} ${tx("of")}`}</text>}
      </g>
    );
    const flags: any[] = [];
    fa.forEach((v) => { if (band.indexOf(v) < 0) flags.push({ key: "fA-" + v, v, x: xOf(v), y: P.yA, band: false }); });
    fb.forEach((v) => { if (band.indexOf(v) < 0) flags.push({ key: "fB-" + v, v, x: xOf(v), y: P.yB, band: false }); });
    band.forEach((v) => flags.push({ key: (onA(v) ? "fA-" : "fB-") + v, v, x: xOf(v), y: at[v], band: true }));
    flags.sort((p: any, q: any) => (p.key < q.key ? -1 : 1));
    const lineStart = S.view === 0 ? X0 - 40 : P.headW - 10;
    const tr = S.mode === "both" ? 900 : bw;
    return (
      <g>
        {/* the band between the tracks: open at the right, like the tracks */}
        <rect x={P.headW - 10} y={P.bandTop} width={tr - P.headW + 10} height={P.bandBot - P.bandTop} fill={tint(OR_ROSE, 0.86)} />
        <path d={`M ${P.headW - 10} ${P.bandTop} H ${tr} M ${P.headW - 10} ${P.bandBot} H ${tr}`} stroke={tint(OR_ROSE, 0.4)} strokeWidth={2} />
        <text x={12} y={(P.bandTop + P.bandBot) / 2 + 10} fontSize={P.fs} fontWeight={600} fill={shade(OR_ROSE, 0.35)}>{tx("in both")}</text>
        {S.bandNote && <text x={X0 - 8} y={P.bandBot - 8} fontSize={T.micro} fontWeight={700} fill={C.ink}>{tx("no end")}</text>}
        <path d={`M ${lineStart} ${P.yA} H ${tr} M ${lineStart} ${P.yB} H ${tr}`} stroke={cord} strokeWidth={8} strokeLinecap="butt" />
        {S.view === 0 && <path d={`M ${lineStart} ${P.yA - 16} V ${P.yA + 16} M ${lineStart} ${P.yB - 16} V ${P.yB + 16}`} stroke={cord} strokeWidth={6} strokeLinecap="round" />}
        {head(P.yA, S.p, "a")}
        {head(P.yB, S.q, "b")}
        {S.lit.filter(inView).map((v: number) => <rect key={"lt" + v} x={xOf(v) - 40} y={P.yA - P.fh / 2 - 4} width={80} height={P.yB - P.yA + P.fh + 8} rx={16} fill="none" stroke={C.accent} strokeWidth={4} pointerEvents="none" />)}
        {flags.map((f: any) => f.band
          ? <OrBand key={f.key} x={f.x} y={f.y} v={f.v} w={cardW} h={P.cardH} fast={fast} C={C} fs={P.fs} glow={S.glow} />
          : <OrFlag key={f.key} x={f.x} y={f.y} v={f.v} fw={P.fw} fh={P.fh} col={OR_GREEN} fs={P.fs} fast={fast} C={C} />)}
        {flagsLive && fa.filter((v) => S.given.indexOf(v) < 0 && band.indexOf(v) < 0).map((v) => <Hit key={"ha" + v} id={"flag-a-" + v} x={xOf(v) - 40} y={P.yA - P.fh / 2} w={80} h={P.fh} onPress={() => catchV(v, true)} label={`${v} on the track of ${S.p}`} />)}
        {flagsLive && fb.filter((v) => S.given.indexOf(v) < 0 && band.indexOf(v) < 0).map((v) => <Hit key={"hb" + v} id={"flag-b-" + v} x={xOf(v) - 40} y={P.yB - P.fh / 2} w={80} h={P.fh} onPress={() => catchV(v, true)} label={`${v} on the track of ${S.q}`} />)}
        {flagsLive && roomy.map((v: number) => <Hit key={"hc" + v} id={"band-" + v} x={xOf(v) - 36} y={at[v] - 36} w={72} h={72} onPress={() => catchV(v, false)} label={`send ${v} back to its track`} />)}
        {S.readout && orNums(S.readout).some((v: number) => !inView(v)) && (
          <g pointerEvents="none">
            <rect x={X0 - 40} y={P.yB + P.fh / 2 + 4} width={30 + String(S.readout).length * 19} height={48} rx={14} fill="#FFFFFF" stroke={shade(OR_ROSE, 0.1)} strokeWidth={3} />
            <text x={X0 - 25} y={P.yB + P.fh / 2 + 38} fontSize={T.label} fontWeight={700} fill={shade(OR_ROSE, 0.35)}>{S.readout}</text>
          </g>
        )}
      </g>
    );
  };

  /* the factor lists of 'both' mode, shut at both ends by a wall, under the tracks (the same frame, the same size) */
  const drawLists = () => {
    const y0 = 252, cs = 56, g = 8, Lx = 170, shared = orFactors(S.a).filter((v) => S.b % v === 0);
    /* "factors / of 4" in English; Hindi and Gujarati say the number first: "4 के / गुणनखंड" */
    const lh = (y: number, N: number) => (
      <g>
        {en ? <text x={12} y={y + 24} fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("factors")}</text>
          : <text x={12} y={y + 54} fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("factors")}</text>}
        {en ? <text x={12} y={y + 54} fontSize={T.micro} fontWeight={700} fill={shade(OR_BLUE, 0.3)}>{`of ${N}`}</text>
          : <text x={12} y={y + 24} fontSize={T.micro} fontWeight={700} fill={shade(OR_BLUE, 0.3)}>{`${N} ${tx("of")}`}</text>}
      </g>
    );
    const row = (y: number, list: number[], k: string, mk: (v: number) => boolean) => (
      <g key={"lr" + k}>
        {list.map((v, j) => <OrCard key={k + v} id={"lc-" + k + v} x={Lx + 14 + j * (cs + g)} y={y} s={cs} v={v} mid={mk(v)} C={C} fast={fast} live={false} glow={false} lit={false} plain label="" />)}
        <path d={`M ${Lx} ${y - 4} V ${y + cs + 4}`} stroke={cord} strokeWidth={8} strokeLinecap="round" />
        <path d={`M ${Lx + 14 + list.length * (cs + g) - g + 14} ${y - 4} V ${y + cs + 4}`} stroke={cord} strokeWidth={8} strokeLinecap="round" />
      </g>
    );
    return (
      <g>
        {lh(y0, S.a)}
        {row(y0, orFactors(S.a), "a", () => false)}
        <rect x={Lx - 6} y={y0 + 68} width={700} height={cs + 8} fill={tint(OR_ROSE, 0.86)} />
        <text x={12} y={y0 + 68 + 40} fontSize={T.micro} fontWeight={600} fill={shade(OR_ROSE, 0.35)}>{tx("in both")}</text>
        {row(y0 + 72, shared, "m", () => true)}
        {lh(y0 + 148, S.b)}
        {row(y0 + 144, orFactors(S.b), "b", () => false)}
        {S.ringNote && <text x={Lx + 330} y={y0 + 100} fontSize={T.micro} fontWeight={700} fill={C.ink}>{tx("they stop")}</text>}
      </g>
    );
  };

  /* ── drawing: the divide gate ── */
  const drawGate = () => {
    const q = S.dealt, per = S.per, st = OR_G.step;
    /* one look per board: the bead skin on every counter (rows and shelf) while the whole number fits the 40 skins a screen allows
       (rows and shelf together are S.big beads); a bigger number draws rows and shelf plain, the shelf told by its dark ring */
    const skinRows = S.big <= 40;
    const rowsDrawn: any[] = [];
    for (let r = 0; r < Math.min(q, 18); r++) {
      const col = r < OR_G.rows ? 0 : 1, y = OR_G.top + (r % OR_G.rows) * OR_G.pitch, x0 = OR_G.cols[col];
      rowsDrawn.push(
        <g key={"r" + r}>
          <rect x={x0 - 6} y={y} width={per * st + 10} height={OR_G.pitch - 6} rx={9} fill={tint(OR_AMBER, 0.85)} />
          {Array.from({ length: per }, (_: any, k: number) => (
            <g key={k}>
              <circle cx={x0 + st / 2 - 2 + k * st} cy={y + (OR_G.pitch - 6) / 2} r={skinRows ? 12 : OR_G.r} fill="url(#gTen)" stroke="#00000022" strokeWidth={1.5} />
              {skinRows && <Skin name="bead" x={x0 + st / 2 - 2 + k * st - 15} y={y + (OR_G.pitch - 6) / 2 - 15} w={30} h={30} fit="stretch" />}
            </g>
          ))}
          {S.count && r < S.countN && <text x={x0 + per * st + 12} y={y + OR_G.pitch - 9} fontSize={T.prompt} fontWeight={700} fill={C.ink}>{r + 1}</text>}
        </g>
      );
    }
    const stmtRow = (row: any, y: number, k: number) => {
      const rel = row.neg ? (row.rel === "multiple" ? "isn't a multiple of" : "isn't a factor of") : (row.rel === "multiple" ? "is a multiple of" : "is a factor of");
      const x0 = 230, w1 = 30 + String(row.a).length * 20, relX = x0 + w1 + 14, x2 = relX + rel.length * 15.4 + 12;
      if (!en) {
        /* Hindi and Gujarati put both numbers first: 74, 9 का गुणज नहीं है / 74 એ 9 નો અવયવી નથી */
        const hi = lang === "hi", jn = hi ? "," : tx("between two numbers"), jx = x0 + w1 + (hi ? 4 : 12);
        const bx = jx + (hi ? 14 : Math.max(34, jn.length * 13)) + 12, tX = bx + 30 + String(row.b).length * 20 + 16;
        return (
          <g key={k}>
            <OrChip x={x0} y={y} v={row.a} big={row.a === S.big} />
            <text x={jx} y={y} fontSize={T.label} fontWeight={600} fill={C.ink}>{jn}</text>
            <OrChip x={bx} y={y} v={row.b} big={row.b === S.big} />
            <text x={tX} y={y} fontSize={T.label} fontWeight={600} fill={C.ink}>{tx(rel)}{row.tail && <tspan fontWeight={700}>{", " + tx(row.tail)}</tspan>}</text>
          </g>
        );
      }
      return (
        <g key={k}>
          <OrChip x={x0} y={y} v={row.a} big={row.a === S.big} />
          <text x={relX} y={y} fontSize={T.label} fontWeight={600} fill={C.ink}>{tx(rel)}</text>
          <OrChip x={x2} y={y} v={row.b} big={row.b === S.big} />
          {row.tail && <text x={x2 + 30 + String(row.b).length * 20 + 18} y={y} fontSize={T.label} fontWeight={700} fill={C.ink}>{tx(row.tail)}</text>}
        </g>
      );
    };
    const frame = S.frame || [];
    return (
      <g transform={`translate(${gx},0)`}>
        {/* the mouth: what is shared out, and the size of each row */}
        <rect x={0} y={0} width={OR_G.tray} height={118} rx={RAD.panel} fill={tint(OR_AMBER, 0.82)} stroke={shade(OR_AMBER, 0.1)} strokeWidth={3} />
        <text x={OR_G.tray / 2} y={34} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("share out")}</text>
        <text x={OR_G.tray / 2} y={96} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={C.ink}>{S.tray}</text>
        <text x={OR_G.tray / 2} y={160} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={C.ink}>÷</text>
        <rect x={0} y={184} width={OR_G.tray} height={118} rx={RAD.panel} fill={tint(OR_BLUE, 0.82)} stroke={shade(OR_BLUE, 0.1)} strokeWidth={3} />
        <text x={OR_G.tray / 2} y={218} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("rows of")}</text>
        <text x={OR_G.tray / 2} y={280} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={C.ink}>{S.per}</text>
        {/* the ruled board: nine row places in each of two columns, a wall between every two */}
        <rect x={OR_G.bx} y={0} width={OR_G.bw} height={352} rx={RAD.panel} fill={tint(C.panel, 0.6)} stroke={C.rule} strokeWidth={2} />
        {OR_G.cols.map((x0: number, c: number) => Array.from({ length: OR_G.rows - 1 }, (_: any, r: number) => (
          <path key={c + "-" + r} d={`M ${x0 - 12} ${OR_G.top + (r + 1) * OR_G.pitch - 3} H ${x0 + 9 * st + 8}`} stroke={C.rule} strokeWidth={2} />
        )))}
        {rowsDrawn}
        {/* the leftover shelf: outside the rows, at full strength */}
        <rect x={OR_G.bx} y={OR_G.shelfY} width={OR_G.bw} height={OR_G.shelfH} rx={RAD.panel} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} />
        <text x={OR_G.bx + 20} y={OR_G.shelfY + 46} fontSize={T.label} fontWeight={600} fill={C.ink}>{tx("left over")}</text>
        {Array.from({ length: Math.min(S.shelf, 12) }, (_: any, k: number) => (
          <g key={"s" + k}>
            <circle cx={OR_G.bx + 210 + k * 38} cy={OR_G.shelfY + OR_G.shelfH / 2} r={skinRows ? 12 : OR_G.r} fill="url(#gPointer)" stroke="#00000022" strokeWidth={1.5} />
            {skinRows && <Skin name="bead" x={OR_G.bx + 210 + k * 38 - 16} y={OR_G.shelfY + OR_G.shelfH / 2 - 16} w={32} h={32} fit="stretch" />}
            <circle cx={OR_G.bx + 210 + k * 38} cy={OR_G.shelfY + OR_G.shelfH / 2} r={17} fill="none" stroke={C.ink} strokeWidth={2.5} />
          </g>
        ))}
        {S.cap && (
          <g>
            <text x={OR_G.bx + OR_G.bw - 20} y={OR_G.shelfY + 30} textAnchor="end" fontSize={T.micro} fontWeight={600} fill={C.ink}>{`${tx("quotient")} ${S.dealt}`}</text>
            <text x={OR_G.bx + OR_G.bw - 20} y={OR_G.shelfY + 62} textAnchor="end" fontSize={T.micro} fontWeight={600} fill={C.ink}>{`${tx("remainder")} ${S.shelf}`}</text>
          </g>
        )}
        {frame.map((row: any, k: number) => stmtRow(row, OR_KEY_Y + 22 + k * 42, k))}
        {S.rev && (
          <g>
            <text x={230} y={OR_KEY_Y + 22} fontSize={T.label} fontWeight={700} fill={C.ink}>{`${S.rev.a} ÷ ${S.rev.b}`}</text>
            <text x={330 + String(S.rev.a).length * 19 + String(S.rev.b).length * 19} y={OR_KEY_Y + 22} fontSize={T.label} fontWeight={600} fill={C.ink}>{en ? `no full row, ${S.rev.r} left` : `${tx("no full row")}, ${S.rev.r} ${tx("left")}`}</text>
          </g>
        )}
      </g>
    );
  };

  /* ── which keys stand at the bottom ── */
  const keys: any[] = [];
  const playingNow = busy;
  if (S.mode === "rings" || S.mode === "tracks") {
    if (S.mode === "rings" && !S.filled && stage !== "ask") keys.push({ id: "fill", label: "Fill", onClick: doFill, disabled: false });
    if ((kind === "always" && stage === "ask") || free) keys.push({ id: "change", label: "Change", onClick: doChange, disabled: false });
    if (free) keys.push({ id: "mode", label: S.mode === "rings" ? "Multiples" : "Factors", onClick: flipMode, disabled: false });
    if (free && S.mode === "rings") keys.push({ id: "freedivide", label: "Divide", onClick: freeDivide, disabled: false });
    if (S.mode === "tracks") {
      keys.push({ id: "goback", label: "Go back", onClick: () => doRun(-1), disabled: S.view === 0 });
      keys.push({ id: "runon", label: "Run on", onClick: () => doRun(1), disabled: false });
    }
  }
  if (S.mode === "gate" && !(box && box.open)) {
    if (!S.ran) keys.push({ id: "divide", label: "Divide", onClick: doDivide, disabled: false });
    else if (stage === "demo" && n === 3 && S.countN === 0) keys.push({ id: "count", label: "Count", onClick: doCount, disabled: false });
    else if (stage === "demo" && n === 4 && !S.frame) keys.push({ id: "say", label: "Write it", onClick: doSay, disabled: false });
  }
  /* the one invite goes on the control the step names (a key), else on the Divide / Run on key of a fresh question */
  const inviteKey = (() => {
    if (!live || wrong || (S.touched && !(kind === "always" && !S.changed))) return null;
    const want = stage === "demo" ? stepOn : S.mode === "gate" ? "divide" : S.mode === "tracks" ? "runon" : kind === "always" && !S.changed ? "change" : null;
    const ix = keys.findIndex((k: any) => k.id === want);
    if (ix < 0) return null;
    const kb = keyBox(keys.length, ix);
    return <Invite x={kb.x + kb.w / 2} y={kb.y + kb.h / 2} w={kb.w} h={kb.h} rx={RAD.key} C={C} />;
  })();
  void playingNow;

  return (
    <g>
      {S.mode === "rings" && drawRings()}
      {S.mode === "rings" && (S.board || S.fres) && drawBoard()}
      {S.mode === "tracks" && drawTracks()}
      {S.mode === "both" && <g transform={`translate(${Math.max(0, (Wt - 900) / 2)},0)`}>{drawTracks()}{S.lists && drawLists()}</g>}
      {S.mode === "gate" && drawGate()}
      {keyRow(keys)}
      {inviteKey}
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase */
function Thumb({ n, result, it, C, w, h, lang = "en", tx = (v: any) => v }: any) {
  const L = result && result.last;
  if (!L) return null;
  const item: any = it || PHASES[(n || 1) - 1].items[L.item];
  if (!item) return null;
  const mono = (s: string, x: number, y: number, size: number, anchor = "start") => <text x={x} y={y} textAnchor={anchor as any} fontSize={size} fontWeight={700} fill={C.ink}>{s}</text>;
  let body: any = null;
  /* digits and shapes only: nothing here needs a Hindi or Gujarati line */
  const top = 20, base = h - 8;
  if (item.kind === "common" || item.kind === "always") {
    body = (
      <g>
        <circle cx={34} cy={top} r={14} fill="none" stroke={OR_BLUE} strokeWidth={3} />
        <circle cx={52} cy={top} r={14} fill="none" stroke={OR_BLUE} strokeWidth={3} />
        <ellipse cx={43} cy={top} rx={5} ry={11} fill={tint(OR_ROSE, 0.4)} />
        {mono(String(L.value ?? item.answer), 16, base, T.micro)}
      </g>
    );
  } else if (item.kind === "next3" || item.kind === "first4") {
    body = (
      <g>
        <path d={`M 16 ${top - 8} H ${w - 16} M 16 ${top + 8} H ${w - 16}`} stroke={OR_GREEN} strokeWidth={4} />
        <rect x={34} y={top - 11} width={44} height={22} rx={8} fill={tint(OR_ROSE, 0.62)} stroke={shade(OR_ROSE, 0.1)} strokeWidth={2} />
        {mono(String(L.value ?? item.answer), 16, base, T.micro)}
      </g>
    );
  } else if (item.kind === "stops") {
    const fs = orFactors(item.p).filter((v: number) => item.q % v === 0);
    body = (
      <g>
        <path d={`M 20 ${top - 16} V ${top + 16} M ${w - 20} ${top - 16} V ${top + 16}`} stroke={C.ink} strokeWidth={5} strokeLinecap="round" />
        <path d={`M 20 ${top} H ${w - 20}`} stroke={OR_GREEN} strokeWidth={3} strokeDasharray="2 8" />
        {mono(fs.join(" "), 40, base, T.micro)}
      </g>
    );
  } else {
    const q = Math.floor(item.big / item.small), r = item.big % item.small, wq = 22 + String(q).length * 17;
    body = (
      <g>
        {mono(`${item.big} ÷ ${item.small}`, 16, 28, T.label)}
        <rect x={16} y={base - 26} width={wq} height={32} rx={9} fill={tint(OR_AMBER, 0.7)} stroke={shade(OR_AMBER, 0.1)} strokeWidth={2} />
        {mono(String(q), 16 + wq / 2, base - 2, T.micro, "middle")}
        <circle cx={16 + wq + 26} cy={base - 10} r={11} fill="url(#gPointer)" stroke="#00000022" strokeWidth={1.5} />
        {mono(String(r), 16 + wq + 46, base - 2, T.micro)}
      </g>
    );
  }
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      {body}
    </g>
  );
}

function OverlapRings(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, format, fitHost: () => null,
      /* the board layout (LAYOUT.md §1b) with the new look: no question bar, the key in its corner, the question only in the bubble */
      board: true,
      keyOnly: true,
      /* the wide keypad: the gate and the choice questions open the panel, and their picture fits x 64 to 964 */
      bigPad: true,
      /* nothing moves on by itself; the win picture waits for the blinking Next key */
      nextKey: true,
      /* one small clickable dot per phase */
      navDots: true,
      /* the start page: the tool's name, StartArt, START_HOOK, a Start key */
      StartArt, START_HOOK,
      }} />
  );
}

export default OverlapRings;
