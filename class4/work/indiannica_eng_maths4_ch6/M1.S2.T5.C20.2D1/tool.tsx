/* ═══ M1.S2.T5.C20.2D1 · fact_both_ways · tool-specific part ═══════════════════════════════════
   Runtime r28 (silent, keyOnly + navDots, nextKey, bigPad, api.act). runtime/runtime.tsx is prepended at build; this file is
   the working area only. NO imports; only the five host hooks. Docs: LAYOUT.md §1d-§1e, PATTERNS.md §15-§18.
   The question lives only in the bubble (each item's `say`); Work draws a picture 860 wide (it fits x 64 to 964 with the
   wide keypad open), centred in the room the working area has, and keeps every element out of the key's corner. */

const TOOL_ID = "fact_both_ways";
const MEDIA_ID = "M1.S2.T5.C20.2D1";
const TOOL_NAME = "Fact Both Ways";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
/* kept for the tool object's shape (and the sidecar); nothing speaks from r30 */
const VOICE = {"rate":0.92,"pitch":1.06};

const OPENING = ["One division on a card. It has another face, and both of them are true."];
const FINISH_LINE = "Every card turned, and never once a word left hanging with no number on it.";
const FREE_LINE = "Free play: turn any card, hop along the rail, and try a new card.";
const START_HOOK = "Can one division tell two true things?";

/* content roles (the plan's colours): divides exactly = deep blue, built by multiplying = green, in both lists = rose,
   left over or a trial that fails = vermilion, the total in hand = amber */
const FB_F = CONTENT.hundred, FB_M = CONTENT.one, FB_B = CONTENT.bead, FB_O = CONTENT.pointer, FB_T = CONTENT.ten;
const fbInk = (c: string) => shade(c, 0.25);
const fbWait = (ms: number) => new Promise((r) => setTimeout(r, reducedMotion() ? 0 : ms));
const FB_W = 860;

/* the start page: the object the whole tool is about, a card with its two readings either side */
function StartArt({ box, C, lang, tx = (v: any) => v }: any) {
  const cx = box.w / 2;
  return (
    <g>
      <rect x={cx - 230} y={70} width={460} height={150} rx={28} fill="url(#gCard)" stroke={C.rule} strokeWidth={3} filter="url(#fShadowSoft)" />
      <text x={cx} y={168} textAnchor="middle" fontSize={T.display} fontWeight={700} fill={C.ink}>
        <tspan fill={fbInk(FB_M)}>30</tspan><tspan dx={18}>÷</tspan><tspan dx={18} fill={fbInk(FB_F)}>6</tspan><tspan dx={18}>=</tspan><tspan dx={18}>5</tspan>
      </text>
      <rect x={30} y={110} width={260} height={80} rx={18} fill={tint(FB_F, 0.86)} stroke={FB_F} strokeWidth={4} />
      <text x={160} y={162} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={fbInk(FB_F)}>{tx("factor")}</text>
      <rect x={box.w - 290} y={110} width={260} height={80} rx={18} fill={tint(FB_M, 0.86)} stroke={FB_M} strokeWidth={4} />
      <text x={box.w - 160} y={162} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={fbInk(FB_M)}>{tx("multiple")}</text>
      <path d={`M ${cx - 240} 150 H 300`} stroke={C.rule} strokeWidth={5} strokeDasharray="10 10" fill="none" />
      <path d={`M ${cx + 240} 150 H ${box.w - 300}`} stroke={C.rule} strokeWidth={5} strokeDasharray="10 10" fill="none" />
    </g>
  );
}

/* Hindi and Gujarati (PATTERNS §11): keyed by the exact English; filled in the language pass, once the English is final */
const TR: any = {
  hi: {
    "Fact Both Ways": "एक बात, दो तरह से",
    "One division on a card. It has another face, and both of them are true.": "कार्ड पर भाग का एक सवाल है। उसकी दूसरी तरफ़ भी एक बात है, और दोनों सच हैं।",
    "Every card turned, and never once a word left hanging with no number on it.": "हर कार्ड पलटा गया, और एक भी शब्द अपनी संख्या के बिना अधूरा नहीं छूटा।",
    "Free play: turn any card, hop along the rail, and try a new card.": "मुक्त खेल: कोई भी कार्ड पलटो, पट्टी पर कूदो, और नया कार्ड आज़माओ।",
    "Can one division tell two true things?": "क्या एक भाग दो सच्ची बातें बता सकता है?",
    "Two words for the two ends of one division": "भाग के एक सवाल के दो सिरों के दो शब्द",
    "Which one is the factor and which is the multiple? One division tells you both.": "गुणनखंड कौन-सा है और गुणज कौन-सा? एक भाग से दोनों पता चल जाते हैं।",
    "Tap the card to turn it over.": "कार्ड को पलटने के लिए छुओ।",
    "It is the big card in the middle.": "यह बीच का बड़ा कार्ड है।",
    "Now tap Hop to jump along the rail in threes.": "अब पट्टी पर तीन-तीन के कदम कूदने के लिए 'कूदो' छुओ।",
    "Use the key at the bottom to start the hops.": "कूदना शुरू करने के लिए नीचे की कुंजी छुओ।",
    "Which number is being divided, and what is it to the other one?": "किस संख्या को भाग दिया जा रहा है, और दूसरी संख्या के लिए वह क्या है?",
    "Take 12 divided by 3: then 3 is a factor of 12 and 12 is a multiple of 3.": "12 ÷ 3 लो: तब 3, 12 का गुणनखंड है और 12, 3 का गुणज है।",
    "One exact division makes the smaller a factor and the bigger a multiple.": "एक पूरा-पूरा भाग छोटी संख्या को गुणनखंड और बड़ी को गुणज बनाता है।",
    "You learned: one exact division gives a factor and a multiple.": "तुमने सीखा: एक पूरे भाग से गुणनखंड और गुणज मिलते हैं।",
    "6 divides 78 exactly, so which number is the factor of which?": "6, 78 को पूरा-पूरा भाग देता है, तो कौन-सी संख्या किसका गुणनखंड है?",
    "Which is the factor?": "गुणनखंड कौन-सा है?",
    "Which of the two numbers is doing the dividing?": "दोनों में से कौन-सी संख्या भाग दे रही है?",
    "6 is a factor of 78, and 78 is a multiple of 6.": "6, 78 का गुणनखंड है, और 78, 6 का गुणज है।",
    "Which number is the multiple here, since 7 divides 77 exactly?": "7, 77 को पूरा-पूरा भाग देता है, तो यहाँ गुणज कौन-सी संख्या है?",
    "Which is the multiple?": "गुणज कौन-सा है?",
    "Which number holds the other exactly, with nothing left over?": "किस संख्या में दूसरी पूरी-पूरी जाती है, बिना कुछ बचे?",
    "7 goes into 77 exactly, so 77 is its multiple.": "7, 77 में पूरा-पूरा जाता है, इसलिए 77 उसका गुणज है।",
    "In the multiplication 8 times 9 is 72, which number is the multiple?": "8 × 9 = 72 में कौन-सी संख्या गुणज है?",
    "Which one is the multiple?": "इनमें गुणज कौन है?",
    "Which number did the multiplying build?": "गुणा करने से कौन-सी संख्या बनी?",
    "The multiple is the number that both of the others go into.": "गुणज वह संख्या है जिसमें बाकी दोनों पूरी-पूरी जाती हैं।",
    "Think small: 2 times 3 is 6, so 6 is the multiple of 2 and of 3.": "छोटी संख्याओं से सोचो: 2 × 3 = 6, तो 6, 2 और 3 का गुणज है।",
    "72 is a multiple of 8 and of 9.": "72, 8 और 9 दोनों का गुणज है।",
    "A factor pair and the number it builds": "गुणनखंडों का जोड़ा और उससे बनी संख्या",
    "These two are a pair. What is the number they build to them?": "ये दोनों एक जोड़ा हैं। इनसे बनी संख्या इनकी क्या है?",
    "Tap Lay rows to lay out 4 rows of 6 counters.": "6 गोटियों की 4 पंक्तियाँ बिछाने के लिए 'पंक्ति बिछाओ' छुओ।",
    "Use the key at the bottom to lay the rows.": "पंक्तियाँ बिछाने के लिए नीचे की कुंजी छुओ।",
    "Now tap the card to see what the rows build.": "अब कार्ड को छुओ और देखो कि पंक्तियाँ क्या बनाती हैं।",
    "It is the empty card on the right.": "यह दाईं ओर का खाली कार्ड है।",
    "Does each of them divide what they built?": "क्या दोनों में से हर एक, अपनी बनाई संख्या को भाग देता है?",
    "Think small: 2 rows of 3 make 6, and both 2 and 3 go into 6.": "छोटी संख्याओं से सोचो: 3 की 2 पंक्तियाँ 6 हैं, और 2, 3 दोनों 6 में जाते हैं।",
    "The product of a factor pair is a multiple of both numbers in the pair.": "गुणनखंडों के जोड़े का गुणनफल, जोड़े की दोनों संख्याओं का गुणज होता है।",
    "You learned: multiply a factor pair to get what both go into.": "तुमने सीखा: गुणनखंडों के जोड़े का गुणा करने से उनका गुणज मिलता है।",
    "2 and 23 are a factor pair, so which number do they build?": "2 और 23 गुणनखंडों का जोड़ा हैं, तो वे कौन-सी संख्या बनाते हैं?",
    "What do 2 and 23 build?": "2 और 23 क्या बनाते हैं?",
    "One row is not what the pair builds, so count both rows.": "एक पंक्ति वह नहीं जो जोड़ा बनाता है, इसलिए दोनों पंक्तियाँ गिनो।",
    "That makes 46 counters.": "इससे 46 गोटियाँ बनती हैं।",
    "3 and 19 are a factor pair of 57, so what is 57 to them?": "3 और 19, 57 के गुणनखंडों का जोड़ा हैं, तो 57 उनका क्या है?",
    "What is 57 to 3 and 19?": "57, 3 और 19 का क्या है?",
    "What do those two numbers build?": "वे दोनों संख्याएँ मिलकर क्या बनाती हैं?",
    "57 is the multiple that 3 and 19 both go into.": "57 वह गुणज है जिसमें 3 और 19 दोनों जाते हैं।",
    "Find the factor pairs of 20 by tapping the numbers that fit.": "जो संख्याएँ ठीक बैठें उन्हें छूकर 20 के गुणनखंडों के जोड़े ढूँढो।",
    "Find the pairs of 20": "20 के जोड़े ढूँढो",
    "Try each number from 1 up and keep the rows that leave none over.": "1 से आगे हर संख्या आज़माओ और वे पंक्तियाँ रखो जिनमें कुछ नहीं बचता।",
    "A number makes a pair only when its rows come out exactly equal.": "संख्या तभी जोड़ा बनाती है जब उसकी पंक्तियाँ ठीक बराबर आएँ।",
    "Think small: 6 makes the pairs 1 and 6, and 2 and 3.": "छोटी संख्याओं से सोचो: 6 से जोड़े बनते हैं 1 और 6, तथा 2 और 3।",
    "20 is the multiple of every one of those pairs.": "20 उन सभी जोड़ों का गुणज है।",
    "A factor is never the bigger one": "गुणनखंड दोनों में बड़ा कभी नहीं होता",
    "Try the bigger one as the factor. Look at the rail and say what goes wrong.": "बड़ी संख्या को गुणनखंड बनाकर देखो। पट्टी देखो और बताओ क्या गलत होता है।",
    "Tap Try 12 to put 12 in the factor slot of 8.": "8 के गुणनखंड की जगह में 12 रखने के लिए '12 आज़माओ' छुओ।",
    "Use the key at the bottom to push the longer bar in.": "लंबी पट्टी अंदर धकेलने के लिए नीचे की कुंजी छुओ।",
    "Now tap Try 4 to put 4 in the same slot.": "अब उसी जगह में 4 रखने के लिए '4 आज़माओ' छुओ।",
    "Push the shorter bar in with the same key.": "उसी कुंजी से छोटी पट्टी अंदर धकेलो।",
    "Can a bigger number go into a smaller one even once?": "क्या बड़ी संख्या छोटी संख्या में एक बार भी जा सकती है?",
    "Think small: 5 can never go into 2, so a longer number never fits inside.": "छोटी संख्याओं से सोचो: 5, 2 में कभी नहीं जाता, तो लंबी संख्या नहीं समाती।",
    "A factor is never greater than the number it belongs to, though it may equal it.": "गुणनखंड अपनी संख्या से बड़ा नहीं होता, बराबर हो सकता है।",
    "You learned: a factor fits inside its number, or matches it exactly.": "तुमने सीखा: गुणनखंड अपनी संख्या में समाता है, या उसके बराबर होता है।",
    "Could 35 be a factor of 21?": "क्या 35, 21 का गुणनखंड है?",
    "Which of the two numbers is the bigger?": "दोनों में से कौन-सी संख्या बड़ी है?",
    "No, 35 is greater than 21, so it cannot be a factor of 21.": "नहीं, 35, 21 से बड़ा है, इसलिए वह 21 का गुणनखंड नहीं हो सकता।",
    "Is 88 a factor of 44?": "क्या 88, 44 का गुणनखंड है?",
    "Which number fits inside the other on the rail?": "पट्टी पर कौन-सी संख्या दूसरी के अंदर समाती है?",
    "No, a factor is never bigger than the number it divides.": "नहीं, गुणनखंड उस संख्या से कभी बड़ा नहीं होता जिसे वह भाग देता है।",
    "Which number is a factor of both 6 and 9?": "कौन-सी संख्या 6 और 9 दोनों का गुणनखंड है?",
    "A factor of 6 and 9?": "6 और 9 का गुणनखंड?",
    "Does each tile go into 6 and into 9?": "क्या हर टाइल 6 में भी जाती है और 9 में भी?",
    "3 is a factor of both 6 and 9, but 9 cannot fit inside 6.": "3, 6 और 9 दोनों का गुणनखंड है, पर 9, 6 के अंदर नहीं समाता।",
    "A number stands at both ends of its own list": "संख्या अपनी सूची के दोनों सिरों पर खड़ी है",
    "Fill the pen, then the track, and see where the number sits in each.": "बाड़ा भरो, फिर रास्ता, और देखो कि संख्या हर एक में कहाँ बैठती है।",
    "Tap Fill pen to list the factors of 8.": "8 के गुणनखंड लिखने के लिए 'बाड़ा भरो' छुओ।",
    "Use the key at the bottom to fill the pen.": "बाड़ा भरने के लिए नीचे की कुंजी छुओ।",
    "Now tap Fill track to list the multiples of 8.": "अब 8 के गुणज लिखने के लिए 'रास्ता भरो' छुओ।",
    "The same key now runs the track.": "वही कुंजी अब रास्ता चलाती है।",
    "Last, tap Show 8.": "आख़िर में '8 दिखाओ' छुओ।",
    "That key shows the 8.": "वह कुंजी 8 को दिखाती है।",
    "Count from one step of the number: where does it land?": "संख्या का एक कदम गिनो: वह कहाँ पहुँचता है?",
    "Think small: the factors of 4 are 1, 2 and 4, and its multiples start 4, 8.": "छोटी संख्याओं से सोचो: 4 के गुणनखंड 1, 2, 4 हैं और गुणज 4, 8 से शुरू होते हैं।",
    "A number is its own greatest factor and its own smallest multiple.": "हर संख्या खुद ही अपना सबसे बड़ा गुणनखंड और अपना सबसे छोटा गुणज है।",
    "You learned: a number ends its factors and starts its multiples.": "तुमने सीखा: संख्या गुणनखंड खत्म और गुणज शुरू करती है।",
    "Where does 17 belong: in its factors, in its multiples, or in both?": "17 कहाँ आता है: अपने गुणनखंडों में, गुणजों में, या दोनों में?",
    "Where does 17 go?": "17 कहाँ जाएगा?",
    "Test 17 in each list, one at a time.": "17 को हर सूची में एक-एक करके जाँचो।",
    "17 ends its factor list and starts its multiples.": "17 अपने गुणनखंडों की सूची खत्म करता है और गुणजों की शुरू।",
    "Name the greatest factor of 34 and the smallest multiple of 34.": "34 का सबसे बड़ा गुणनखंड और सबसे छोटा गुणज बताओ।",
    "Factor, then multiple of 34": "34 का गुणनखंड, फिर गुणज",
    "Test 34 itself against its own pen and track.": "34 को उसी के बाड़े और रास्ते में जाँचो।",
    "Both answers are 34 itself.": "दोनों उत्तर खुद 34 ही हैं।",
    "Tap every factor of 65 into the pen, then press Enter.": "65 का हर गुणनखंड छूकर बाड़े में रखो, फिर 'दर्ज करें' दबाओ।",
    "Tap the factors of 65": "65 के गुणनखंड छुओ",
    "Test each card: does it go into 65 with nothing left over?": "हर कार्ड जाँचो: क्या वह 65 में बिना कुछ बचे जाता है?",
    "A card that leaves some over does not divide 65, so it stays out.": "जिस कार्ड से कुछ बच जाए वह 65 को भाग नहीं देता, इसलिए बाहर रहता है।",
    "Think small: the factors of 6 are 1, 2, 3 and 6, each going into 6 exactly.": "छोटी संख्याओं से सोचो: 6 के गुणनखंड 1, 2, 3, 6 हैं, हर एक 6 में पूरा जाता है।",
    "The factors of 65 are 1, 5, 13 and 65 itself.": "65 के गुणनखंड 1, 5, 13 और खुद 65 हैं।",
    "factor": "गुणनखंड",
    "multiple": "गुणज",
    "Yes": "हाँ",
    "No": "नहीं",
    "Only factors": "केवल गुणनखंड",
    "Only multiples": "केवल गुणज",
    "Both lists": "दोनों सूचियाँ",
    "greatest": "सबसे बड़ा",
    "smallest": "सबसे छोटा",
    "and": "और",
    "Hop": "कूदो",
    "Try 12": "12 आज़माओ",
    "Try 4": "4 आज़माओ",
    "Lay rows": "पंक्ति बिछाओ",
    "Fill pen": "बाड़ा भरो",
    "Fill track": "रास्ता भरो",
    "Show 8": "8 दिखाओ",
    "New card": "नया कार्ड",
    "too long": "बहुत लंबा",
    "left over": "बचे हुए",
  },
  gu: {
    "Fact Both Ways": "એક વાત, બે રીતે",
    "One division on a card. It has another face, and both of them are true.": "કાર્ડ પર એક ભાગાકાર છે. તેની બીજી બાજુ પણ છે, અને બંને સાચી છે.",
    "Every card turned, and never once a word left hanging with no number on it.": "દરેક કાર્ડ ફેરવાયું, અને એક પણ શબ્દ તેની સંખ્યા વગર અધૂરો ન રહ્યો.",
    "Free play: turn any card, hop along the rail, and try a new card.": "મુક્ત રમત: કોઈ પણ કાર્ડ ફેરવો, પટ્ટી પર કૂદો, અને નવું કાર્ડ અજમાવો.",
    "Can one division tell two true things?": "શું એક ભાગાકાર બે સાચી વાતો કહી શકે?",
    "Two words for the two ends of one division": "એક ભાગાકારના બે છેડાના બે શબ્દો",
    "Which one is the factor and which is the multiple? One division tells you both.": "અવયવ કયો અને ગુણિત કયો? એક ભાગાકારથી બંને જાણી શકાય છે.",
    "Tap the card to turn it over.": "કાર્ડ ફેરવવા તેને દબાવો.",
    "It is the big card in the middle.": "તે વચ્ચેનું મોટું કાર્ડ છે.",
    "Now tap Hop to jump along the rail in threes.": "હવે પટ્ટી પર ત્રણ-ત્રણના કૂદકા મારવા 'કૂદો' દબાવો.",
    "Use the key at the bottom to start the hops.": "કૂદકા શરૂ કરવા નીચેની કી દબાવો.",
    "Which number is being divided, and what is it to the other one?": "કઈ સંખ્યાને ભાગવામાં આવે છે, અને તે બીજી સંખ્યા માટે શું છે?",
    "Take 12 divided by 3: then 3 is a factor of 12 and 12 is a multiple of 3.": "12 ÷ 3 લો: તો 3 એ 12નો અવયવ છે અને 12 એ 3નો ગુણિત છે.",
    "One exact division makes the smaller a factor and the bigger a multiple.": "એક પૂરેપૂરો ભાગાકાર નાની સંખ્યાને અવયવ અને મોટીને ગુણિત બનાવે છે.",
    "You learned: one exact division gives a factor and a multiple.": "તમે શીખ્યા: એક પૂરા ભાગાકારથી અવયવ અને ગુણિત મળે છે.",
    "6 divides 78 exactly, so which number is the factor of which?": "6 એ 78ને પૂરેપૂરા ભાગે છે, તો કઈ સંખ્યા કોનો અવયવ છે?",
    "Which is the factor?": "અવયવ કયો છે?",
    "Which of the two numbers is doing the dividing?": "બેમાંથી કઈ સંખ્યા વડે ભાગ થાય છે?",
    "6 is a factor of 78, and 78 is a multiple of 6.": "6 એ 78નો અવયવ છે, અને 78 એ 6નો ગુણિત છે.",
    "Which number is the multiple here, since 7 divides 77 exactly?": "7 એ 77ને પૂરેપૂરા ભાગે છે, તો અહીં ગુણિત કઈ સંખ્યા છે?",
    "Which is the multiple?": "ગુણિત કયો છે?",
    "Which number holds the other exactly, with nothing left over?": "કઈ સંખ્યામાં બીજી સંખ્યા બરાબર સમાય છે, કંઈ વધ્યા વગર?",
    "7 goes into 77 exactly, so 77 is its multiple.": "7 એ 77માં પૂરેપૂરો જાય છે, એટલે 77 તેનો ગુણિત છે.",
    "In the multiplication 8 times 9 is 72, which number is the multiple?": "ગુણાકાર 8 × 9 = 72માં કઈ સંખ્યા ગુણિત છે?",
    "Which one is the multiple?": "આમાં ગુણિત કયો છે?",
    "Which number did the multiplying build?": "ગુણાકાર કરવાથી કઈ સંખ્યા બની?",
    "The multiple is the number that both of the others go into.": "ગુણિત એ સંખ્યા છે જેમાં બીજી બંને પૂરેપૂરી જાય છે.",
    "Think small: 2 times 3 is 6, so 6 is the multiple of 2 and of 3.": "નાની સંખ્યાઓથી વિચારો: 2 × 3 = 6, તો 6 એ 2 અને 3નો ગુણિત છે.",
    "72 is a multiple of 8 and of 9.": "72 એ 8 અને 9 બંનેનો ગુણિત છે.",
    "A factor pair and the number it builds": "અવયવની જોડ અને તેનાથી બનતી સંખ્યા",
    "These two are a pair. What is the number they build to them?": "આ બંને એક જોડ છે. તેમનાથી બનેલી સંખ્યા તેમની શું છે?",
    "Tap Lay rows to lay out 4 rows of 6 counters.": "6 કૂકરીની 4 હાર ગોઠવવા 'હાર ગોઠવો' દબાવો.",
    "Use the key at the bottom to lay the rows.": "હાર ગોઠવવા નીચેની કી દબાવો.",
    "Now tap the card to see what the rows build.": "હવે કાર્ડ દબાવો અને જુઓ કે હાર શું બનાવે છે.",
    "It is the empty card on the right.": "તે જમણી બાજુનું ખાલી કાર્ડ છે.",
    "Does each of them divide what they built?": "શું બંનેમાંથી દરેક, પોતે બનાવેલી સંખ્યાને ભાગે છે?",
    "Think small: 2 rows of 3 make 6, and both 2 and 3 go into 6.": "નાની સંખ્યાઓથી વિચારો: 3ની 2 હાર 6 થાય, અને 2, 3 બંને 6માં જાય છે.",
    "The product of a factor pair is a multiple of both numbers in the pair.": "અવયવની જોડનો ગુણાકાર, જોડની બંને સંખ્યાઓનો ગુણિત છે.",
    "You learned: multiply a factor pair to get what both go into.": "તમે શીખ્યા: જોડનો ગુણાકાર કરો, તો એવી સંખ્યા મળે જેમાં બંને જાય છે.",
    "2 and 23 are a factor pair, so which number do they build?": "2 અને 23 અવયવની જોડ છે, તો તેઓ કઈ સંખ્યા બનાવે છે?",
    "What do 2 and 23 build?": "2 અને 23 શું બનાવે છે?",
    "One row is not what the pair builds, so count both rows.": "જોડ જે બનાવે છે તે એક હાર નથી, એટલે બંને હાર ગણો.",
    "That makes 46 counters.": "તેથી 46 કૂકરી બને છે.",
    "3 and 19 are a factor pair of 57, so what is 57 to them?": "3 અને 19 એ 57ના અવયવની જોડ છે, તો 57 તેમનો શું છે?",
    "What is 57 to 3 and 19?": "57 એ 3 અને 19નો શું છે?",
    "What do those two numbers build?": "તે બે સંખ્યાઓ મળીને શું બનાવે છે?",
    "57 is the multiple that 3 and 19 both go into.": "57 એ ગુણિત છે જેમાં 3 અને 19 બંને જાય છે.",
    "Find the factor pairs of 20 by tapping the numbers that fit.": "જે સંખ્યાઓ બંધબેસતી હોય તે દબાવીને 20ની અવયવની જોડ શોધો.",
    "Find the pairs of 20": "20ની જોડ શોધો",
    "Try each number from 1 up and keep the rows that leave none over.": "1થી આગળ દરેક સંખ્યા અજમાવો અને જે હારમાં કંઈ ન વધે તે રાખો.",
    "A number makes a pair only when its rows come out exactly equal.": "સંખ્યા ત્યારે જ જોડ બનાવે જ્યારે તેની હાર બરાબર સરખી આવે.",
    "Think small: 6 makes the pairs 1 and 6, and 2 and 3.": "નાની સંખ્યાઓથી વિચારો: 6ની જોડ છે 1 અને 6, તથા 2 અને 3.",
    "20 is the multiple of every one of those pairs.": "20 એ તે બધી જોડનો ગુણિત છે.",
    "A factor is never the bigger one": "અવયવ બેમાંથી મોટો ક્યારેય નથી હોતો",
    "Try the bigger one as the factor. Look at the rail and say what goes wrong.": "મોટી સંખ્યાને અવયવ બનાવી જુઓ. પટ્ટી જુઓ અને કહો શું ખોટું થાય છે.",
    "Tap Try 12 to put 12 in the factor slot of 8.": "8ના અવયવની જગ્યામાં 12 મૂકવા '12 અજમાવો' દબાવો.",
    "Use the key at the bottom to push the longer bar in.": "લાંબી પટ્ટી અંદર ધકેલવા નીચેની કી દબાવો.",
    "Now tap Try 4 to put 4 in the same slot.": "હવે એ જ જગ્યામાં 4 મૂકવા '4 અજમાવો' દબાવો.",
    "Push the shorter bar in with the same key.": "એ જ કીથી ટૂંકી પટ્ટી અંદર ધકેલો.",
    "Can a bigger number go into a smaller one even once?": "શું મોટી સંખ્યા નાની સંખ્યામાં એક વાર પણ જઈ શકે?",
    "Think small: 5 can never go into 2, so a longer number never fits inside.": "નાની સંખ્યાઓથી વિચારો: 5, 2માં ક્યારેય ન જાય, તો લાંબી સંખ્યા ન સમાય.",
    "A factor is never greater than the number it belongs to, though it may equal it.": "અવયવ તેની સંખ્યાથી ક્યારેય મોટો નથી હોતો, પણ તેના જેટલો હોઈ શકે.",
    "You learned: a factor fits inside its number, or matches it exactly.": "તમે શીખ્યા: અવયવ તેની સંખ્યામાં સમાય છે, અથવા તેના જેટલો હોય છે.",
    "Could 35 be a factor of 21?": "શું 35 એ 21નો અવયવ હોઈ શકે?",
    "Which of the two numbers is the bigger?": "બેમાંથી કઈ સંખ્યા મોટી છે?",
    "No, 35 is greater than 21, so it cannot be a factor of 21.": "ના, 35 એ 21 કરતાં મોટો છે, એટલે તે 21નો અવયવ ન હોઈ શકે.",
    "Is 88 a factor of 44?": "શું 88 એ 44નો અવયવ છે?",
    "Which number fits inside the other on the rail?": "પટ્ટી પર કઈ સંખ્યા બીજીની અંદર સમાય છે?",
    "No, a factor is never bigger than the number it divides.": "ના, અવયવ જેને ભાગે તે સંખ્યાથી ક્યારેય મોટો નથી હોતો.",
    "Which number is a factor of both 6 and 9?": "કઈ સંખ્યા 6 અને 9 બંનેનો અવયવ છે?",
    "A factor of 6 and 9?": "6 અને 9નો અવયવ?",
    "Does each tile go into 6 and into 9?": "શું દરેક ટાઇલ 6માં પણ જાય છે અને 9માં પણ?",
    "3 is a factor of both 6 and 9, but 9 cannot fit inside 6.": "3 એ 6 અને 9 બંનેનો અવયવ છે, પણ 9 એ 6ની અંદર ન સમાય.",
    "A number stands at both ends of its own list": "સંખ્યા પોતાની યાદીના બંને છેડે ઊભી છે",
    "Fill the pen, then the track, and see where the number sits in each.": "વાડો ભરો, પછી રસ્તો, અને જુઓ કે સંખ્યા દરેકમાં ક્યાં બેસે છે.",
    "Tap Fill pen to list the factors of 8.": "8ના અવયવ લખવા 'વાડો ભરો' દબાવો.",
    "Use the key at the bottom to fill the pen.": "વાડો ભરવા નીચેની કી દબાવો.",
    "Now tap Fill track to list the multiples of 8.": "હવે 8ના ગુણિત લખવા 'રસ્તો ભરો' દબાવો.",
    "The same key now runs the track.": "એ જ કી હવે રસ્તો ચલાવે છે.",
    "Last, tap Show 8.": "છેલ્લે '8 બતાવો' દબાવો.",
    "That key shows the 8.": "એ કી 8 બતાવે છે.",
    "Count from one step of the number: where does it land?": "સંખ્યાનું એક પગલું ગણો: તે ક્યાં પહોંચે છે?",
    "Think small: the factors of 4 are 1, 2 and 4, and its multiples start 4, 8.": "નાની સંખ્યાઓથી વિચારો: 4ના અવયવ 1, 2, 4 છે અને ગુણિત 4, 8થી શરૂ થાય છે.",
    "A number is its own greatest factor and its own smallest multiple.": "દરેક સંખ્યા પોતે જ પોતાનો સૌથી મોટો અવયવ અને સૌથી નાનો ગુણિત છે.",
    "You learned: a number ends its factors and starts its multiples.": "તમે શીખ્યા: સંખ્યા અવયવ પૂરા કરે છે અને ગુણિત શરૂ કરે છે.",
    "Where does 17 belong: in its factors, in its multiples, or in both?": "17 ક્યાં આવે: તેના અવયવમાં, ગુણિતમાં, કે બંનેમાં?",
    "Where does 17 go?": "17 ક્યાં જશે?",
    "Test 17 in each list, one at a time.": "17ને દરેક યાદીમાં એક-એક કરીને તપાસો.",
    "17 ends its factor list and starts its multiples.": "17 તેના અવયવની યાદી પૂરી કરે છે અને ગુણિતની શરૂ કરે છે.",
    "Name the greatest factor of 34 and the smallest multiple of 34.": "34નો સૌથી મોટો અવયવ અને સૌથી નાનો ગુણિત કહો.",
    "Factor, then multiple of 34": "34નો અવયવ, પછી ગુણિત",
    "Test 34 itself against its own pen and track.": "34ને તેના જ વાડા અને રસ્તામાં તપાસો.",
    "Both answers are 34 itself.": "બંને જવાબ ખુદ 34 જ છે.",
    "Tap every factor of 65 into the pen, then press Enter.": "65નો દરેક અવયવ દબાવીને વાડામાં મૂકો, પછી 'દાખલ કરો' દબાવો.",
    "Tap the factors of 65": "65ના અવયવ દબાવો",
    "Test each card: does it go into 65 with nothing left over?": "દરેક કાર્ડ તપાસો: શું તે 65માં કંઈ વધ્યા વગર જાય છે?",
    "A card that leaves some over does not divide 65, so it stays out.": "જે કાર્ડથી કંઈ વધે તે 65ને ભાગતું નથી, એટલે બહાર રહે છે.",
    "Think small: the factors of 6 are 1, 2, 3 and 6, each going into 6 exactly.": "નાની સંખ્યાઓથી વિચારો: 6ના અવયવ 1, 2, 3, 6 છે, દરેક 6માં પૂરેપૂરો જાય છે.",
    "The factors of 65 are 1, 5, 13 and 65 itself.": "65ના અવયવ 1, 5, 13 અને ખુદ 65 છે.",
    "factor": "અવયવ",
    "multiple": "ગુણિત",
    "Yes": "હા",
    "No": "ના",
    "Only factors": "ફક્ત અવયવ",
    "Only multiples": "ફક્ત ગુણિત",
    "Both lists": "બંને યાદી",
    "greatest": "સૌથી મોટો",
    "smallest": "સૌથી નાનો",
    "and": "અને",
    "Hop": "કૂદો",
    "Try 12": "12 અજમાવો",
    "Try 4": "4 અજમાવો",
    "Lay rows": "હાર ગોઠવો",
    "Fill pen": "વાડો ભરો",
    "Fill track": "રસ્તો ભરો",
    "Show 8": "8 બતાવો",
    "New card": "નવું કાર્ડ",
    "too long": "બહુ લાંબો",
    "left over": "વધેલા",
  },
};

/* One entry per phase = one mount. Item kinds (Work, judge and oracle switch on them):
   sent   a sentence "[ ] is a factor of [ ]" (or "multiple"): two gaps filled with number tiles, "a|b"
   sent1  one gap: "[ ] is a factor of 6 and 9", the number
   word   a word choice: what the built number is to the pair
   build  the built number, typed on the pad
   pairs  every factor pair, marked on the working area: "1×20,2×10,4×5" (any order)
   yn     yes or no
   both   which of its own lists the number belongs to: "both" | "factors" | "multiples"
   ends   two boxes: the greatest factor and the smallest multiple
   list   every factor, marked on the working area: "1,5,13,65" (any order)
   `win` is the one-sentence line said at the right answer; `forms` the sentences no question, hint or ladder line may print */
const PHASES = [
  {
    n: 1,
    concept: "Two words for the two ends of one division",
    conceptId: "M1.S2.T5.C20", objectiveIds: ["O7"],
    says: ["Which one is the factor and which is the multiple? One division tells you both."],
    steps: [
      { say: "Tap the card to turn it over.", on: "turn", hint: "It is the big card in the middle." },
      { say: "Now tap Hop to jump along the rail in threes.", on: "hop", hint: "Use the key at the bottom to start the hops." },
    ],
    ladder: ["Which number is being divided, and what is it to the other one?",
      "Take 12 divided by 3: then 3 is a factor of 12 and 12 is a multiple of 3."],
    closing: "One exact division makes the smaller a factor and the bigger a multiple.",
    learned: "You learned: one exact division gives a factor and a multiple.",
    traceback: "The rail draws both numbers to scale and the smaller one hops along it, landing exactly on the bigger; then the right sentence stands up under the child's own.",
    items: [
      /* learn ML1: answer in the plan = 6 is a factor of 78, and 78 is a multiple of 6 */
      { qid: "M1.S2.T5.C20:ML1", kind: "sent", face: "factor", card: [78, "÷", 6, 13], tiles: [78, 6], pad: "enter", winMs: 2600,
        say: "6 divides 78 exactly, so which number is the factor of which?",
        ask: "Which is the factor?", answer: "6|78", near: "78|6",
        forms: ["6 is a factor of 78", "78 is a multiple of 6"],
        miss: "Which of the two numbers is doing the dividing?",
        win: "6 is a factor of 78, and 78 is a multiple of 6." },
      /* practice 1: answer in the plan = 7 is a factor of 77, and 77 is a multiple of 7 */
      { qid: "M1.S2.T5.C20:1", kind: "sent", face: "multiple", card: [77, "÷", 7, 11], tiles: [7, 77], pad: "enter", winMs: 2600,
        say: "Which number is the multiple here, since 7 divides 77 exactly?",
        ask: "Which is the multiple?", answer: "77|7", near: "7|77",
        forms: ["77 is a multiple of 7", "7 is a factor of 77"],
        miss: "Which number holds the other exactly, with nothing left over?",
        win: "7 goes into 77 exactly, so 77 is its multiple." },
      /* practice 3: answer in the plan = 72, and 8 and 9 are its factors (72 of 8 or 72 of 9 both read it) */
      { qid: "M1.S2.T5.C20:3", kind: "sent", face: "multiple", card: [8, "×", 9, 72], tiles: [8, 9, 72], pad: "enter", winMs: 2600,
        say: "In the multiplication 8 times 9 is 72, which number is the multiple?",
        ask: "Which one is the multiple?", answer: "72|8", accept: ["72|8", "72|9"], near: "8|72",
        forms: ["72 is a multiple of 8", "72 is a multiple of 9", "72 is the multiple"],
        miss: "Which number did the multiplying build?",
        ladder: ["The multiple is the number that both of the others go into.",
          "Think small: 2 times 3 is 6, so 6 is the multiple of 2 and of 3."],
        win: "72 is a multiple of 8 and of 9." },
    ],
  },
  {
    n: 2,
    concept: "A factor pair and the number it builds",
    conceptId: "M1.S2.T5.C21", objectiveIds: ["O7"],
    says: ["These two are a pair. What is the number they build to them?"],
    steps: [
      { say: "Tap Lay rows to lay out 4 rows of 6 counters.", on: "lay", hint: "Use the key at the bottom to lay the rows." },
      { say: "Now tap the card to see what the rows build.", on: "name", hint: "It is the empty card on the right." },
    ],
    ladder: ["Does each of them divide what they built?",
      "Think small: 2 rows of 3 make 6, and both 2 and 3 go into 6."],
    closing: "The product of a factor pair is a multiple of both numbers in the pair.",
    learned: "You learned: multiply a factor pair to get what both go into.",
    traceback: "The rows are laid out again one at a time and counted at their ends, and the built card is named for both numbers of the pair.",
    items: [
      /* practice 2, FIRST on purpose: the pad-shape check (tried in the plan order, ML2 first: it FAILED) samples only the first question of a phase and needs one typed on the keypad; answer in the plan = 46, and 46 is a multiple of both 2 and 23 */
      { qid: "M1.S2.T5.C21:2", kind: "build", pair: [2, 23], winMs: 2600,
        say: "2 and 23 are a factor pair, so which number do they build?",
        ask: "What do 2 and 23 build?", answer: 46, near: 23,
        forms: ["46", "forty-six", "multiple of 2 and 23"],
        miss: "One row is not what the pair builds, so count both rows.",
        win: "That makes 46 counters." },
      /* learn ML2: answer in the plan = Their multiple: 57 is a multiple of 3 and a multiple of 19 */
      { qid: "M1.S2.T5.C21:ML2", kind: "word", pair: [3, 19], built: 57, winMs: 2400,
        say: "3 and 19 are a factor pair of 57, so what is 57 to them?",
        ask: "What is 57 to 3 and 19?",
        choices: [{ id: "factor", label: "factor" }, { id: "multiple", label: "multiple" }], answer: "multiple", near: "factor",
        forms: ["57 is a multiple", "their multiple", "multiple of 3 and", "multiple of both"],
        miss: "What do those two numbers build?",
        win: "57 is the multiple that 3 and 19 both go into." },
      /* practice 5: answer in the plan = 1 and 20, 2 and 10, and 4 and 5. 20 is the multiple of every one of those pairs */
      { qid: "M1.S2.T5.C21:5", kind: "pairs", whole: 20, tiles: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], pad: "enter", winMs: 2600,
        say: "Find the factor pairs of 20 by tapping the numbers that fit.",
        ask: "Find the pairs of 20", answer: "1×20,2×10,4×5", near: "2×10,4×5",
        forms: ["1 × 20", "1×20", "2 × 10", "2×10", "4 × 5", "4×5"],
        miss: "Try each number from 1 up and keep the rows that leave none over.",
        ladder: ["A number makes a pair only when its rows come out exactly equal.",
          "Think small: 6 makes the pairs 1 and 6, and 2 and 3."],
        win: "20 is the multiple of every one of those pairs." },
    ],
  },
  {
    n: 3,
    concept: "A factor is never the bigger one",
    conceptId: "M1.S2.T5.C22", objectiveIds: ["O8"],
    says: ["Try the bigger one as the factor. Look at the rail and say what goes wrong."],
    steps: [
      { say: "Tap Try 12 to put 12 in the factor slot of 8.", on: "try", hint: "Use the key at the bottom to push the longer bar in." },
      { say: "Now tap Try 4 to put 4 in the same slot.", on: "try", hint: "Push the shorter bar in with the same key." },
    ],
    ladder: ["Can a bigger number go into a smaller one even once?",
      "Think small: 5 can never go into 2, so a longer number never fits inside."],
    closing: "A factor is never greater than the number it belongs to, though it may equal it.",
    learned: "You learned: a factor fits inside its number, or matches it exactly.",
    traceback: "The rail offers each number to the factor slot in turn: a smaller one settles, a bigger one is turned back with its extra length left drawn.",
    items: [
      /* learn ML3: answer in the plan = No, because 35 is greater than 21 */
      { qid: "M1.S2.T5.C22:ML3", kind: "yn", claim: [35, 21], winMs: 2800,
        say: "Could 35 be a factor of 21?", ask: "Could 35 be a factor of 21?",
        choices: [{ id: "yes", label: "Yes" }, { id: "no", label: "No" }], answer: "no", near: "yes",
        forms: ["35 is greater than 21", "35 is bigger than 21", "not a factor of 21"],
        miss: "Which of the two numbers is the bigger?",
        win: "No, 35 is greater than 21, so it cannot be a factor of 21." },
      /* practice 4: answer in the plan = No. 88 is greater than 44, and a factor is never greater than the number it divides. 44 is a factor of 88 instead */
      { qid: "M1.S2.T5.C22:4", kind: "yn", claim: [88, 44], winMs: 2800,
        say: "Is 88 a factor of 44?", ask: "Is 88 a factor of 44?",
        choices: [{ id: "yes", label: "Yes" }, { id: "no", label: "No" }], answer: "no", near: "yes",
        forms: ["88 is greater than 44", "88 is bigger than 44", "not a factor of 44"],
        miss: "Which number fits inside the other on the rail?",
        win: "No, a factor is never bigger than the number it divides." },
      /* practice 7: answer in the plan = 9 is greater than 6, so it cannot divide 6 exactly. What is true is that 3 is a factor of both 6 and 9 */
      { qid: "M1.S2.T5.C22:7", kind: "sent1", face: "factor", of: [6, 9], card: ["6", "and", "9"], pins: [6, 9], tiles: [9, 3], pad: "enter", winMs: 2800,
        say: "Which number is a factor of both 6 and 9?",
        ask: "A factor of 6 and 9?", answer: "3", near: "9",
        forms: ["3 is a factor of 6", "3 is a factor of 9", "3 is a factor of both"],
        miss: "Does each tile go into 6 and into 9?",
        win: "3 is a factor of both 6 and 9, but 9 cannot fit inside 6." },
    ],
  },
  {
    n: 4,
    concept: "A number stands at both ends of its own list",
    conceptId: "M1.S2.T5.C23", objectiveIds: ["O8"],
    says: ["Fill the pen, then the track, and see where the number sits in each."],
    steps: [
      { say: "Tap Fill pen to list the factors of 8.", on: "pen", hint: "Use the key at the bottom to fill the pen." },
      { say: "Now tap Fill track to list the multiples of 8.", on: "track", hint: "The same key now runs the track." },
      { say: "Last, tap Show 8.", on: "show", hint: "That key shows the 8." },
    ],
    ladder: ["Count from one step of the number: where does it land?",
      "Think small: the factors of 4 are 1, 2 and 4, and its multiples start 4, 8."],
    closing: "A number is its own greatest factor and its own smallest multiple.",
    learned: "You learned: a number ends its factors and starts its multiples.",
    traceback: "The number stands at the shut end of its pen and the first step of its track at once, a hairline joins the two, and each list is read up to it.",
    items: [
      /* learn ML4: answer in the plan = At the top of one and the foot of the other: 17 is the greatest factor of 17 and the smallest multiple of 17 */
      { qid: "M1.S2.T5.C23:ML4", kind: "both", num: 17, pen: [1], track: [34, 51, 68, 85], winMs: 2800,
        say: "Where does 17 belong: in its factors, in its multiples, or in both?",
        ask: "Where does 17 go?",
        choices: [{ id: "factors", label: "Only factors" }, { id: "multiples", label: "Only multiples" }, { id: "both", label: "Both lists" }], answer: "both", near: "factors",
        forms: ["in both lists", "in both of its lists", "17 is the greatest factor of 17"],
        miss: "Test 17 in each list, one at a time.",
        win: "17 ends its factor list and starts its multiples." },
      /* practice 6: answer in the plan = Both of them are 34 itself */
      { qid: "M1.S2.T5.C23:6", kind: "ends", num: 34, pen: [1, 2, 17], track: [68, 102, 136, 170], parts: [{ label: "greatest" }, { label: "smallest" }], winMs: 2800,
        say: "Name the greatest factor of 34 and the smallest multiple of 34.",
        ask: "Factor, then multiple of 34", answer: [34, 34], near: [17, 68],
        forms: ["34 is the greatest factor", "34 is its own greatest factor", "the smallest multiple of 34 is 34"],
        miss: "Test 34 itself against its own pen and track.",
        win: "Both answers are 34 itself." },
      /* practice 8: answer in the plan = 65 itself, and its factors are 1, 5, 13 and 65 */
      { qid: "M1.S2.T5.C23:8", kind: "list", num: 65, cands: [1, 2, 3, 5, 10, 13, 15, 25, 65], pad: "enter", winMs: 2800,
        say: "Tap every factor of 65 into the pen, then press Enter.",
        ask: "Tap the factors of 65", answer: "1,5,13,65", near: "1,5,13",
        forms: ["1, 5, 13, 65", "1, 5, 13 and 65", "5 and 13", "5 × 13"],
        miss: "Test each card: does it go into 65 with nothing left over?",
        ladder: ["A card that leaves some over does not divide 65, so it stays out.",
          "Think small: the factors of 6 are 1, 2, 3 and 6, each going into 6 exactly."],
        win: "The factors of 65 are 1, 5, 13 and 65 itself." },
    ],
  },
];

/* the warm-ups the guide steps work on: none of their numbers is a question's answer */
const FB_WARM: any = {
  1: { card: [21, "÷", 3, 7] },
  2: { pair: [4, 6] },
  3: { zone: 8, max: 12, tries: [12, 4] },
  4: { num: 8, pen: [1, 2, 4, 8], track: [8, 16, 24, 32, 40] },
};
/* free play: exact divisions for the card (dividend, divisor); every one hops in 13 steps or fewer */
const FB_FREE = [[78, 6], [77, 7], [20, 4], [65, 5], [34, 17], [88, 44], [72, 8], [30, 6]];

const MODEL = {
  roles: { factor: FB_F, multiple: FB_M, inBothLists: FB_B, leftOverOrRefused: FB_O, total: FB_T },
  rail: { from: 0, to: "the greatest number shown", factorSlot: "from 0 to the number it belongs to" },
  gate: "a sentence is sent only when every gap holds a number; an open gap lights, nothing is marked",
  freeCards: FB_FREE,
};

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* reading what the working area sends */
const fbPair = (v: any) => { const m = /^\s*(\d+)\s*\|\s*(\d+)\s*$/.exec(String(v ?? "")); return m ? [Number(m[1]), Number(m[2])] : null; };
const fbList = (v: any) => String(v ?? "").split(/[,\s|]+/).filter(Boolean).map(Number).filter((x) => isFinite(x));
const fbPairs = (v: any) => String(v ?? "").split(/[,\s|]+/).filter(Boolean).map((p) => p.split(/[×x*]/).map(Number))
  .filter((p) => p.length === 2 && p.every((x) => isFinite(x) && x > 0));
const fbNum = (a: number, b: number) => a - b;

/* judge: is this value right for this item? (lists and pairs in any order) */
const judge = (item: any, v: any) => {
  if (item.parts) return judgeSlotParts(item, v);
  const s = String(v ?? "").trim();
  if (item.kind === "sent") { const p = fbPair(s); return !!p && (item.accept || [item.answer]).includes(p.join("|")); }
  if (item.kind === "sent1" || item.kind === "build") return /^\d+$/.test(s) && Number(s) === Number(item.answer);
  if (item.kind === "pairs") {
    const norm = (x: any) => [...new Set(fbPairs(x).map((p) => p.slice().sort(fbNum).join("x")))].sort();
    const a = norm(s), b = norm(item.answer);
    return a.length === b.length && a.every((x, i) => x === b[i]);
  }
  if (item.kind === "list") {
    const a = [...new Set(fbList(s))].sort(fbNum).join(","), b = fbList(item.answer).sort(fbNum).join(",");
    return a === b;
  }
  return s.toLowerCase() === String(item.answer).trim().toLowerCase();
};

/* oracle: every answer re-derived from the item's own numbers by repeated subtraction and counting,
   sharing no code with judge() or the picture */
const fbGoes = (d: number, n: number) => { let r = n; while (r >= d && d > 0) r -= d; return r === 0; };
const oracle = () => PHASES.every((p: any) => p.items.every((it: any) => {
  const keys = it.accept || [it.answer];
  if (it.kind === "sent") {
    const ok: string[] = [];
    for (const a of it.tiles) for (const b of it.tiles) {
      if (a === b) continue;
      if (it.face === "factor" && a < b && fbGoes(a, b)) ok.push(a + "|" + b);
      if (it.face === "multiple" && a > b && fbGoes(b, a)) ok.push(a + "|" + b);
    }
    return ok.length > 0 && ok.length === keys.length && ok.every((x) => keys.includes(x));
  }
  if (it.kind === "sent1") {
    const ok = it.tiles.filter((t: number) => it.of.every((m: number) => t < m && fbGoes(t, m)));
    return ok.length === 1 && String(ok[0]) === String(it.answer);
  }
  if (it.kind === "word") return fbGoes(it.pair[0], it.built) && fbGoes(it.pair[1], it.built) && it.built > it.pair[1] && it.answer === "multiple";
  if (it.kind === "build") { let s = 0; for (let r = 0; r < it.pair[0]; r++) s += it.pair[1]; return s === it.answer; }
  if (it.kind === "pairs") {
    const got: string[] = [];
    for (let d = 1; d * d <= it.whole; d++) if (fbGoes(d, it.whole)) { let q = 0, r = it.whole; while (r > 0) { r -= d; q++; } got.push(d + "×" + q); }
    return got.join(",") === it.answer;
  }
  if (it.kind === "yn") return (it.claim[0] <= it.claim[1] && fbGoes(it.claim[0], it.claim[1]) ? "yes" : "no") === it.answer;
  if (it.kind === "both") return fbGoes(it.num, it.num) && it.pen.every((f: any) => f === null || fbGoes(f, it.num)) && it.answer === "both";
  if (it.kind === "ends") {
    const f: number[] = [];
    for (let d = 1; d <= it.num; d++) if (fbGoes(d, it.num)) f.push(d);
    return f[f.length - 1] === it.answer[0] && it.num === it.answer[1];
  }
  if (it.kind === "list") {
    const f: number[] = [];
    for (let d = 1; d <= it.num; d++) if (fbGoes(d, it.num)) f.push(d);
    return f.join(",") === it.answer && f.every((x) => it.cands.includes(x));
  }
  return false;
}));
/* the most likely wrong answer (the misconception); judge must reject it */
const nearMiss = (item: any) => item.near;
/* the forms of an answer that no question, hint or ladder line may print */
const answerForms = (item: any) => item.forms || [String(item.answer)];
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => item.answer;

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T0: any) => {
  /* the working area takes the answer at once (its ref), so Enter can follow in the same tick */
  if (item.pad === "enter" && HOOK.set) { HOOK.set(agentKey(item)); if (HOOK.enter) HOOK.enter(); return; }
  return T0.submit(agentKey(item));
};
/* the agent's answer() for an item made on the working area: set it as a child would; undefined = type it */
const answer = (item: any, v: any) => (item.pad === "enter" && HOOK.set ? HOOK.set(v) : undefined);
/* the agent's check() before Enter: nothing waits here (a guide step reaches api.onEnter), so Enter */
const check = () => undefined;

/* ── the working area ────────────────────────────────────────────────────────────────────────
   box = { w, h: 520, open, key }: the picture is FB_W wide and centred in the room left of the key's corner. */

const FB_CSS = `
.fb-t{transition:transform 460ms cubic-bezier(.3,.7,.25,1)}
.fb-in{animation:fbIn 480ms ease-out both}
@keyframes fbIn{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}
.fb-flip{transform-box:fill-box;transform-origin:center;animation:fbFlip 560ms ease-in-out both}
@keyframes fbFlip{0%{transform:scaleX(1)}50%{transform:scaleX(0.05)}100%{transform:scaleX(1)}}
.fb-grow{transform-box:fill-box;transform-origin:left center;animation:fbGrow 620ms ease-out both}
@keyframes fbGrow{from{transform:scaleX(0.02)}to{transform:scaleX(1)}}
.fb-lit{animation:fbLit 380ms ease-in-out 3}
@keyframes fbLit{50%{stroke-opacity:.3}}
@media (prefers-reduced-motion:reduce){.fb-in,.fb-flip,.fb-grow,.fb-lit{animation:none}}`;

/* a board derived from the question's entry key in render (no stale frame), updated by patches; a late patch from an
   earlier question is dropped */
function useFbBoard(qk: string, fresh: () => any) {
  const [raw, setRaw] = useState(() => ({ qk, ...fresh() }));
  const S = raw.qk === qk ? raw : { qk, ...fresh() };
  const qr = useRef(qk); qr.current = qk;
  const SR = useRef(S); SR.current = S;
  /* the ref takes the patch at once too: the agent's answer() and the physical Enter that follows it in the same tick read it */
  const set = (patch: any) => { const k = qk; if (qr.current === k) SR.current = { ...SR.current, ...patch }; setRaw((p: any) => (qr.current !== k ? p : { ...(p.qk === k ? p : { qk: k, ...fresh() }), ...patch })); };
  return [S, set, SR];
}
/* a guard for async acts and corrections: busy, an epoch that a new question bumps, a 400 ms double-tap guard for the keys */
function useFbRun(qk: string, api: any) {
  const ep = useRef(0), busy = useRef(false), tb = useRef(false), last = useRef(0), taps = useRef<any>({});
  useEffect(() => () => { ep.current++; busy.current = false; if (tb.current) { tb.current = false; api.lock(false); } }, [qk]);
  const once = (fn: any) => () => { const t = Date.now(); if (t - last.current < 400) return; last.current = t; fn(); };
  /* a repeat on the same tile / pair tile / list card inside 400 ms is one tap (a double tap must not toggle it back) */
  const tap = (id: string, fn: any) => () => { const t = Date.now(); if (t - (taps.current[id] || 0) < 400) return; taps.current[id] = t; fn(); };
  /* one act at a time; the flag is reset in a finally (a cancelled act still resolves) and only by its own question's epoch;
     undefined = busy, nothing was done */
  const hold = async (fn: any) => {
    if (busy.current) return undefined;
    const my = ep.current; busy.current = true;
    try { return await fn(); } finally { if (ep.current === my) busy.current = false; }
  };
  return { ep, busy, tb, ok: (my: number) => ep.current === my, once, tap, hold };
}

/* a key at the bottom centre */
function FbKey({ id, label, x, y, w = 260, h = 76, C, onClick }: any) {
  return (
    <Key id={id} label={label} x={x} y={y} w={w} h={h} C={C} tone="key" onClick={onClick}>
      <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={toneInk("key", C.ink)}>{label}</text>
    </Key>
  );
}

/* a number tile: white, with its number in ink (coloured only once the fact is known) */
function FbTile({ x, y, w = 116, h = 80, v, col, C }: any) {
  const fs = String(v).length >= 3 ? T.prompt : T.xl;
  return (
    <g filter="url(#fShadowSoft)">
      <rect x={x} y={y} width={w} height={h} rx={16} fill="url(#gKey)" stroke={C.rule} strokeWidth={2} />
      <text x={x + w / 2} y={y + h / 2 + fs * 0.36} textAnchor="middle" fontSize={fs} fontWeight={700} fill={col ? fbInk(col) : C.ink}>{v}</text>
    </g>
  );
}

/* a gap in a sentence (dashed while open) or a number already named in it */
const FB_BW = 100, FB_BH = 76, FB_SG = 16;
function FbBox({ x, y, v, col, lit, dash, C }: any) {
  const has = v !== null && v !== undefined && v !== "";
  const fs = String(v ?? "").length >= 3 ? T.prompt : T.xl;
  return (
    <g>
      <rect className={lit ? "fb-lit" : undefined} x={x} y={y} width={FB_BW} height={FB_BH} rx={14}
        fill={has ? (dash ? tint(C.panel, 0.55) : "#FFFFFF") : tint(C.panel, 0.35)} stroke={lit ? C.accent : has ? (col || C.ink) : C.dim}
        strokeWidth={lit ? 5 : has ? 3 : 2.5} strokeDasharray={has ? (dash ? "8 6" : undefined) : "9 7"} />
      {has && <text x={x + FB_BW / 2} y={y + FB_BH / 2 + fs * 0.36} textAnchor="middle" fontSize={fs} fontWeight={700} fill={col ? fbInk(col) : C.ink}>{v}</text>}
    </g>
  );
}
/* the parts of a sentence: { b: k } a gap, { n: v } a named number, { t, kw } words */
/* Hindi and Gujarati keep the book's own sentence and word order: "6, 78 का गुणनखंड है" / "6 એ 78નો અવયવ છે" (English never comes here) */
const FB_KW: any = { hi: { factor: "गुणनखंड", multiple: "गुणज" }, gu: { factor: "અવયવ", multiple: "ગુણિત" } };
const fbFace = (face: string, of?: number[], lang = "en") => {
  const k = FB_KW[lang] && FB_KW[lang][face];
  if (lang === "hi") return of ? [{ b: 0 }, { t: "," }, { t: `${of[0]} और ${of[1]} का ${k} है`, kw: k, face }] : [{ b: 0 }, { t: "," }, { b: 1 }, { t: `का ${k} है`, kw: k, face }];
  if (lang === "gu") return of ? [{ b: 0 }, { t: "એ" }, { t: `${of[0]} અને ${of[1]}નો ${k} છે`, kw: k, face }] : [{ b: 0 }, { t: "એ" }, { b: 1 }, { t: `નો ${k} છે`, kw: k, face }];
  return face === "factor"
    ? [{ b: 0 }, { t: "is a factor of", kw: "factor", face }, ...(of ? [{ n: of[0] }, { t: "and" }, { n: of[1] }] : [{ b: 1 }])]
    : [{ b: 0 }, { t: "is a multiple of", kw: "multiple", face }, { b: 1 }];
};
/* the words round a number that carry a count: one builder a language */
const FB_LB: any = {
  en: { factorsOf: (n: any) => `factors of ${n}`, multiplesOf: (n: any) => `multiples of ${n}`, rows: (r: number, per: number) => `${r} ${r === 1 ? "row" : "rows"} of ${per}`, counters: (n: number) => `${n} counters` },
  hi: { factorsOf: (n: any) => `${n} के गुणनखंड`, multiplesOf: (n: any) => `${n} के गुणज`, rows: (r: number, per: number) => `${per} की ${r} ${r === 1 ? "पंक्ति" : "पंक्तियाँ"}`, counters: (n: number) => `${n} गोटियाँ` },
  gu: { factorsOf: (n: any) => `${n}ના અવયવ`, multiplesOf: (n: any) => `${n}ના ગુણિત`, rows: (r: number, per: number) => `${per}ની ${r} હાર`, counters: (n: number) => `${n} કૂકરી` },
};
const fbLb = (lang: string) => FB_LB[lang] || FB_LB.en;
/* a word cell is as wide as the text measured (SVG getComputedTextLength, re-measured when the fonts land), left-anchored so
   every gap in the row is the same FB_SG; a Gujarati "નો" hugs the number before it, as the book writes "78નો" */
const fbSentLay = (parts: any[], cx: number, lang = "en", mw: any = {}) => {
  const em = lang === "gu" ? 22 : lang === "hi" ? 19 : 17;
  const ws = parts.map((p, i) => (p.t !== undefined ? (mw[i] || Math.max(p.t.length <= 2 ? 28 : 48, p.t.length * em)) : FB_BW));
  const gap = (p: any) => (lang === "gu" && p.t !== undefined && p.t.startsWith("નો") ? 4 : p.t === "," ? 2 : FB_SG);
  const total = ws.reduce((a, b) => a + b, 0) + parts.reduce((a, p, i) => a + (i ? gap(p) : 0), 0);
  let x = cx - total / 2;
  return parts.map((p, i) => { if (i) x += gap(p); const o = { ...p, x, w: ws[i] }; x += ws[i]; return o; });
};
function FbSentRow({ parts, cx, y, vals, dashed, cols, lit, C, live, onClear, tag, lang = "en", ring = false }: any) {
  const [mw, setMw] = useState<any>({});
  const refs = useRef<any>({});
  const sig = lang + "|" + parts.map((p: any) => (p.t !== undefined ? p.t : "#")).join("¦");
  useEffect(() => {
    const m = () => { const o: any = {}; Object.keys(refs.current).forEach((k) => { const el = refs.current[k]; const w = el && el.getComputedTextLength ? el.getComputedTextLength() : 0; if (w > 0) o[k] = Math.ceil(w); }); setMw((p: any) => (JSON.stringify(p) === JSON.stringify(o) ? p : o)); };
    m(); const f = (document as any).fonts; if (f && f.ready) f.ready.then(m);
  }, [sig]);
  const lay = fbSentLay(parts, cx, lang, mw);
  const first = ring ? lay.find((p: any) => p.b !== undefined && (vals[p.b] === null || vals[p.b] === undefined)) : null;
  return (
    <g>
      {lay.map((p: any, i: number) => {
        if (p.t !== undefined) {
          const k = p.kw && cols ? p.t.indexOf(p.kw) : -1;
          return (
            <text key={i} ref={(el: any) => { refs.current[i] = el; }} x={p.x} y={y + FB_BH / 2 + T.prompt * 0.36} textAnchor="start" fontSize={T.prompt} fontWeight={600} fill={C.ink}>
              {k < 0 ? p.t : [p.t.slice(0, k), <tspan key="k" fill={fbInk(p.face === "factor" ? FB_F : FB_M)} fontWeight={700}>{p.kw}</tspan>, p.t.slice(k + p.kw.length)]}
            </text>
          );
        }
        const v = p.n !== undefined ? p.n : vals[p.b];
        return (
          <g key={i}>
            <FbBox x={p.x} y={y} v={v} col={p.n !== undefined ? null : cols ? cols[p.b] : null} lit={p.b !== undefined && (lit || []).includes(p.b)} dash={dashed && p.b !== undefined} C={C} />
            {live && p.b !== undefined && vals[p.b] !== null && vals[p.b] !== undefined && (
              <Hit id={`${tag}-${p.b + 1}`} label={"Take " + vals[p.b] + " out"} x={p.x - 2} y={y - 2} w={FB_BW + 4} h={FB_BH + 4} onPress={() => onClear(p.b)} />
            )}
          </g>
        );
      })}
      {first && <Invite x={first.x + FB_BW / 2} y={y + FB_BH / 2} w={FB_BW + 8} h={FB_BH + 8} rx={16} C={C} />}
    </g>
  );
}

/* a turn arrow for the card's corner */
function FbTurnIcon({ x, y, C }: any) {
  return (
    <g stroke={C.accent} strokeWidth={5} fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d={`M ${x - 18} ${y + 6} A 19 19 0 1 1 ${x + 4} ${y + 18}`} />
      <path d={`M ${x - 26} ${y - 2} L ${x - 18} ${y + 8} L ${x - 7} ${y + 1}`} />
    </g>
  );
}

/* the size rail: every number drawn at its own distance from 0. A factor slot of a number is the band from 0 to it; a bar
   offered to it settles inside, or runs past its end and is turned back. hops: arcs of f landing on the multiples of f */
function FbRailDraw({ x = 50, w = 760, y, max, marks = [], zone = null, zoneLabel = "", bar = null, ghosts = [], hops = null, tip = null, big = false, C }: any) {
  const X = (v: number) => x + (v / max) * w;
  const bandH = big ? 84 : 44;
  return (
    <g data-role="rail">
      {zone !== null && (
        <g key={"z" + zone} className="fb-in">
          <rect x={X(0)} y={y - bandH / 2} width={X(zone) - X(0)} height={bandH} rx={12} fill={tint(FB_F, 0.86)} stroke={FB_F} strokeWidth={2} strokeDasharray="8 6" />
          {zoneLabel && <text x={(X(0) + X(zone)) / 2} y={y + bandH / 2 + 66} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={fbInk(FB_F)}>{zoneLabel}</text>}
        </g>
      )}
      <line x1={X(0)} y1={y} x2={X(max)} y2={y} stroke={C.ink} strokeWidth={3} strokeLinecap="round" />
      <text x={X(0) - 12} y={y + 10} textAnchor="end" fontSize={T.label} fontWeight={600} fill={C.ink}>0</text>
      {ghosts.map((g: any, i: number) => (
        <g key={"g" + i + g.v}>
          <rect x={X(0)} y={y + bandH / 2 + 8} width={X(g.v) - X(0)} height={12} rx={6} fill="none" stroke={fbInk(FB_F)} strokeWidth={2} strokeDasharray="6 5" />
          <rect x={X(g.past)} y={y + bandH / 2 + 8} width={X(g.v) - X(g.past)} height={12} rx={6} fill={FB_O} fillOpacity={0.55} />
        </g>
      ))}
      {bar && (
        <g key={"b" + bar.v} className="fb-grow" filter="url(#fShadowSoft)">
          <rect x={X(0)} y={y - 12} width={X(bar.v) - X(0)} height={24} rx={12} fill="url(#gHundred)" />
          {zone !== null && bar.v > zone && <rect x={X(zone)} y={y - 12} width={X(bar.v) - X(zone)} height={24} rx={12} fill="url(#gPointer)" />}
        </g>
      )}
      {hops && Array.from({ length: hops.upto }).map((_, k) => {
        const x1 = X(k * hops.f), x2 = X((k + 1) * hops.f);
        return (
          <g key={"h" + k} className="fb-in">
            <path d={`M ${x1} ${y} Q ${(x1 + x2) / 2} ${y - 40} ${x2} ${y}`} fill="none" stroke={FB_F} strokeWidth={4} strokeLinecap="round" />
            <text x={x2} y={y - 28} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={fbInk(FB_M)} stroke="#FFFFFF" strokeWidth={5} paintOrder="stroke">{(k + 1) * hops.f}</text>
          </g>
        );
      })}
      {marks.map((m: any) => (
        <g key={"m" + m.v}>
          <line x1={X(m.v)} y1={y - 16} x2={X(m.v)} y2={y + 16} stroke={m.col || C.ink} strokeWidth={4} strokeLinecap="round" />
          <text x={X(m.v)} y={big ? y - 54 : y + 52} textAnchor="middle" fontSize={big ? T.display : T.label} fontWeight={700} fill={m.col ? fbInk(m.col) : C.ink}>{m.v}</text>
        </g>
      ))}
      {tip && <text className="fb-in" x={X(tip.v)} y={y + bandH / 2 + 66} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={fbInk(FB_O)}>{tip.text}</text>}
    </g>
  );
}

/* the card: one exact division, its numbers ink until the fact is known, then the factor blue and the multiple green */
const FB_CARD = { x: 210, y: 12, w: 440, h: 88 };
const fbCardSpans = (c: any[], colored: boolean, tx: any = (v: any) => v) => {
  if (c.length === 3) return c.map((v, k) => <tspan key={k} dx={k ? 16 : 0}>{tx(String(v))}</tspan>);
  const div = c[1] === "÷";
  const colOf = (k: number) => (!colored ? null : div ? (k === 0 ? FB_M : k === 2 ? FB_F : null) : k === 3 ? FB_M : k === 0 || k === 2 ? FB_F : null);
  const part = (v: any, k: number, dx: number) => { const col = colOf(k); return <tspan key={k} dx={dx} fill={col ? fbInk(col) : undefined}>{String(v)}</tspan>; };
  return [part(c[0], 0, 0), part(c[1], 1, 16), part(c[2], 2, 16), part("=", 9, 16), part(c[3], 3, 16)];
};
const fbCardStr = (c: any[]) => (c ? (c.length === 3 ? c.join(" ") : `${c[0]} ${c[1]} ${c[2]} = ${c[3]}`) : null);
function FbCardDraw({ card, colored, flip, turnable, C, tx }: any) {
  const k = FB_CARD;
  return (
    <g key={"card" + flip} className={flip ? "fb-flip" : undefined}>
      <rect x={k.x} y={k.y} width={k.w} height={k.h} rx={22} fill="url(#gCard)" stroke={C.rule} strokeWidth={2} filter="url(#fShadowSoft)" />
      <text x={k.x + (turnable ? (k.w - 76) / 2 : k.w / 2)} y={k.y + k.h / 2 + T.xl * 0.36} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={C.ink}>{fbCardSpans(card, colored, tx)}</text>
      {turnable && <FbTurnIcon x={k.x + k.w - 50} y={k.y + k.h / 2 - 4} C={C} />}
    </g>
  );
}

/* ── phases 1 and 3 (sentences): the card, the sentence the child builds, the other face, the rail ── */
const FB_ROWA = 110, FB_ROWB = 206, FB_RH = 88, FB_RAILY = 362, FB_TILEY = 428;

function FbFacts(props: any) {
  const { n, item, index, stage, wrong, api, stepOn, ox, lang = "en", tx = (v: any) => v } = props;
  const C = api.C;
  const warm = stage === "demo" || stage === "teach";
  const won = stage === "win" || stage === "idle";
  const nb = !warm && item.kind === "sent1" ? 1 : 2;
  const qk = n + "." + index + (warm ? "w" : "");
  const run = useFbRun(qk, api);
  const [S, set, SR] = useFbBoard(qk, () => ({ fill: Array(nb).fill(null), lit: [], ghost: null, other: false, turned: false, flip: 0, hops: 0, rail: null, tb: false, stale: false, acted: false }));
  const live = stage === "ask" && !S.tb;
  const liveRef = useRef(live); liveRef.current = live;
  const W1 = FB_WARM[1].card;
  const face = warm ? "factor" : item.face || "factor";
  const card = warm ? W1 : item.card;
  const cols = face === "factor" ? [FB_F, FB_M] : [FB_M, FB_F];
  const otherFace = face === "factor" ? "multiple" : "factor";
  const railX = (max: number, v: number) => 50 + (v / max) * 760;

  /* the guide steps: turn the card, then hop along the rail */
  const doTurn = async () => {
    if (SR.current.turned) { api.did("turn"); return; }
    const ok = await run.hold(() => api.act({ tool: "hand", moves: "tap", at: [{ x: ox + FB_CARD.x + FB_CARD.w / 2, y: FB_CARD.y + FB_CARD.h / 2 }] }));
    if (!ok) return;
    set({ turned: true, flip: SR.current.flip + 1 }); api.sfx.tick(); api.did("turn");
  };
  const hopPts = (max: number, f: number) => Array.from({ length: Math.round(max / f) }, (_, k) => ({ x: ox + railX(max, (k + 1) * f), y: FB_RAILY - 14 }));
  const doHop = async () => {
    if (SR.current.hops >= W1[0] / W1[2]) { api.did("hop"); return; }
    const ok = await run.hold(() => api.act({ tool: "hand", moves: "tap", at: hopPts(W1[0], W1[2]), onPoint: (i: number) => set({ hops: i + 1 }) }));
    if (!ok) return;
    set({ hops: W1[0] / W1[2] }); api.sfx.settle(); api.did("hop");
  };
  const act = (on: any) => { if (on === "turn") doTurn(); else if (on === "hop") doHop(); };

  /* the child's sentence: a tile goes into the next open gap; after a miss the first tile starts the sentence again */
  const put = (v: number) => {
    if (!liveRef.current) return;
    const s = SR.current;
    const f = s.stale ? Array(nb).fill(null) : s.fill.slice();
    const at = f.findIndex((x: any) => x === null);
    if (at < 0) return;
    f[at] = v;
    set({ fill: f, lit: [], ghost: null, other: false, rail: null, acted: true, stale: false });
    api.sfx.tick();
  };
  const clear = (k: number) => {
    if (!liveRef.current) return;
    const f = SR.current.fill.slice(); f[k] = null;
    set({ fill: f, lit: [], ghost: null, other: false, rail: null, acted: true, stale: false });
  };
  /* the name-it gate: a sentence with an open gap lights it, nothing is marked */
  const enterFn = () => {
    if (!liveRef.current) return;
    const s = SR.current;
    if (s.stale && !s.acted) return;
    const open = s.fill.map((x: any, i: number) => (x === null ? i : -1)).filter((i: number) => i >= 0);
    if (open.length) { set({ lit: open }); return; }
    api.submit(s.fill.join("|"));
  };
  api.onEnter(warm ? (stepOn ? () => act(stepOn) : null) : stage === "ask" ? enterFn : null);
  HOOK.enter = enterFn;
  HOOK.set = (v: any) => {
    const p = nb === 1 ? (/^\d+$/.test(String(v)) ? [Number(v)] : null) : fbPair(v);
    if (!p) return false;
    set({ fill: p, lit: [], ghost: null, other: false, acted: true, stale: false });
    return true;
  };
  const ready = live && S.fill.every((x: any) => x !== null) && !(S.stale && !S.acted);
  useEffect(() => { if (!warm) api.answerReady(ready); }, [ready, qk, S.acted, S.stale]);

  /* the traceback: the rail draws both numbers to scale and the factor hops along it, landing exactly on the multiple; then
     the right sentence and the other face stand up as a layer over the child's own (their gaps come back on their next tile) */
  useEffect(() => {
    if (!wrong || stage !== "ask" || warm) return;
    const my = ++run.ep.current; run.tb.current = true;
    (async () => {
      api.lock(true);
      const right = nb === 1 ? [Number(item.answer)] : (fbPair(item.answer) as number[]);
      const max = nb === 1 ? Math.max(...item.of) : Math.max(...right);
      const f = nb === 1 ? right[0] : Math.min(...right);
      const pins = item.pins || [max];
      set({ tb: true, stale: true, acted: false, lit: [], rail: { max, f, hops: 0, pins } });
      await fbWait(700); if (!run.ok(my)) return;
      const pts = Array.from({ length: Math.round(max / f) }, (_, k) => ({ x: ox + railX(max, (k + 1) * f), y: FB_RAILY - 14 }));
      await api.act({ tool: "hand", moves: "tap", at: pts, onPoint: (i: number) => set({ rail: { max, f, hops: i + 1, pins } }) });
      if (!run.ok(my)) return;
      await fbWait(450); if (!run.ok(my)) return;
      set({ ghost: right, other: true });
      await fbWait(700); if (!run.ok(my)) return;
      set({ tb: false }); run.tb.current = false; api.lock(false);
    })();
  }, [wrong]);

  /* what is drawn */
  const aVals = warm ? (S.turned ? [W1[2], W1[0]] : [null, null]) : S.fill;
  const ghostB = !warm && !!S.ghost;
  const colored = warm ? S.turned : won || !!S.ghost;
  const showB = warm ? S.turned : !ghostB && nb === 2 && won && S.fill.every((x: any) => x !== null);
  const bVals = warm ? [W1[0], W1[2]] : [aVals[1], aVals[0]];
  const railNow = warm
    ? (S.turned ? { max: W1[0], f: W1[2], hops: S.hops, pins: [W1[0]] } : null)
    : S.rail || (item.pins ? { max: Math.max(...item.pins), f: 0, hops: 0, pins: item.pins } : null);
  const tiles: number[] = warm ? [] : item.tiles;
  const tw = 116, tg = 40, tx0 = (FB_W - (tiles.length * tw + (tiles.length - 1) * tg)) / 2;
  const frame = (y: number, filled: boolean) => (
    <rect x={0} y={y} width={FB_W} height={FB_RH} rx={22} fill={filled ? "#FFFFFF" : "none"} stroke={C.rule} strokeWidth={2} strokeDasharray={filled ? undefined : "10 10"} />
  );
  const cy = (y: number) => y + (FB_RH - FB_BH) / 2;
  const joined = warm ? S.turned : S.other || won || ghostB;
  api.share({ division: fbCardStr(card), faceUp: warm ? S.turned : true, bothHeld: !!showB, namedNumber: S.fill.filter((x: any) => x !== null),
    railOrder: railNow ? railNow.pins.slice().sort(fbNum) : null, builtNumber: null, complete: stage === "idle" });

  return (
    <g transform={`translate(${ox},0)`}>
      <style>{FB_CSS}</style>
      <FbCardDraw card={card} colored={colored} flip={S.flip} turnable={warm && !S.turned} C={C} tx={tx} />
      {warm && !S.turned && <Hit id="turn" label={tx("Turn the card")} x={FB_CARD.x} y={FB_CARD.y} w={FB_CARD.w} h={FB_CARD.h} onPress={doTurn} />}
      {frame(FB_ROWA, won || aVals.some((x: any) => x !== null))}
      {(nb === 2 || ghostB) && frame(FB_ROWB, !!showB || ghostB)}
      {(nb === 2 || ghostB) && <line x1={FB_W / 2} y1={FB_ROWA + FB_RH} x2={FB_W / 2} y2={FB_ROWB} stroke={joined ? FB_B : C.rule} strokeWidth={joined ? 6 : 2} />}
      {(!warm || S.turned) && (
        <g key={"a" + S.flip} className={warm ? "fb-in" : undefined}>
          <FbSentRow parts={fbFace(face, nb === 1 ? item.of : undefined, lang)} cx={FB_W / 2} y={cy(FB_ROWA)} vals={aVals} cols={warm ? (S.turned ? cols : null) : won ? cols : null} lit={S.lit} C={C} live={live} onClear={(k: number) => run.tap("clr" + k, () => clear(k))()} tag="gap" lang={lang} ring={live && !S.acted && !S.stale} />
        </g>
      )}
      {(showB || ghostB) && (
        <g key={"b" + S.flip + (ghostB ? "g" : "")} className="fb-in">
          <FbSentRow parts={fbFace(ghostB ? face : otherFace, ghostB && nb === 1 ? item.of : undefined, lang)} cx={FB_W / 2} y={cy(FB_ROWB)} vals={ghostB ? S.ghost : bVals} dashed={ghostB} cols={ghostB ? cols : face === "factor" ? [FB_M, FB_F] : [FB_F, FB_M]} C={C} tag="other" lang={lang} />
        </g>
      )}
      {railNow && <FbRailDraw y={FB_RAILY} max={railNow.max} marks={railNow.pins.map((v: number) => ({ v, col: warm || railNow.hops > 0 || won ? FB_M : null }))} hops={railNow.f ? { f: railNow.f, upto: railNow.hops } : null} C={C} />}
      {tiles.map((v, i) => (
        <g key={"t" + i} opacity={won && !S.fill.includes(v) ? 0.3 : 1}>
          <FbTile x={tx0 + i * (tw + tg)} y={FB_TILEY + 6} v={v} col={won ? (S.fill.includes(v) ? cols[S.fill.indexOf(v)] : null) : null} C={C} />
          {live && <Hit id={"tile-" + v} label={"Number " + v} x={tx0 + i * (tw + tg)} y={FB_TILEY + 6} w={tw} h={80} onPress={run.tap("tile-" + v, () => put(v))} />}
        </g>
      ))}
      {warm && S.turned && <FbKey id="hop" label={tx("Hop")} x={(FB_W - 260) / 2} y={FB_TILEY} C={C} onClick={run.once(() => doHop())} />}
      {warm && stepOn === "turn" && !S.turned && <Invite x={FB_CARD.x + FB_CARD.w / 2} y={FB_CARD.y + FB_CARD.h / 2} w={FB_CARD.w} h={FB_CARD.h} rx={22} C={C} />}
      {warm && stepOn === "hop" && <Invite x={FB_W / 2} y={FB_TILEY + 38} w={260} h={76} C={C} />}
    </g>
  );
}

/* ── phase 3: the rail (the warm-up, and the yes / no question) ── */
const FB_RB = 250;
function FbRails(props: any) {
  const { n, item, index, stage, wrong, api, stepOn, ox, lang = "en", tx = (v: any) => v } = props;
  const C = api.C;
  const warm = stage === "demo" || stage === "teach";
  const won = stage === "win" || stage === "idle";
  const W3 = FB_WARM[3];
  const zone = warm ? W3.zone : item.claim[1];
  const max = warm ? W3.max : item.claim[0];
  const qk = n + "." + index + (warm ? "w" : "");
  const run = useFbRun(qk, api);
  const [S, set, SR] = useFbBoard(qk, () => ({ bar: null, ghosts: [], tried: 0, tb: false }));
  const X = (v: number) => 60 + (v / max) * 740;

  /* offer a number to the factor slot: the hand pushes the bar in; a longer one runs past the end and is turned back */
  const tryOne = async (v: number) => {
    const ok = await run.hold(() => {
      set({ bar: null, ghosts: [] });
      return api.act({ tool: "hand", moves: "push", from: { x: ox + X(0), y: FB_RB }, at: [{ x: ox + X(0) + 24, y: FB_RB }, { x: ox + X(v), y: FB_RB }],
        onPoint: (i: number) => { if (i === 0) set({ bar: { v } }); } });
    });
    if (!ok) return false;
    if (v > zone) { await fbWait(600); set({ bar: null, ghosts: [{ v, past: zone }] }); }
    api.sfx.settle();
    return true;
  };
  const doTry = async () => {
    const v = W3.tries[SR.current.tried];
    if (v === undefined) { api.did("try"); return; }
    const ok = await tryOne(v);
    if (!ok) return;
    set({ tried: SR.current.tried + 1 }); api.did("try");
  };
  api.onEnter(warm && stepOn ? () => doTry() : null);

  /* the traceback: the claimed number is offered to the slot and turned back, its extra length left drawn */
  useEffect(() => {
    if (!wrong || stage !== "ask" || warm) return;
    const my = ++run.ep.current; run.tb.current = true;
    (async () => {
      api.lock(true);
      await fbWait(300); if (!run.ok(my)) return;
      await tryOne(item.claim[0]); if (!run.ok(my)) return;
      await fbWait(500); if (!run.ok(my)) return;
      run.tb.current = false; api.lock(false);
    })();
  }, [wrong]);

  const ghosts = warm || S.ghosts.length ? S.ghosts : won ? [{ v: item.claim[0], past: item.claim[1] }] : [];
  const bar = S.bar;
  const marks = warm ? [{ v: W3.zone, col: S.tried >= 2 ? FB_M : null }, { v: W3.max, col: S.tried >= 1 ? FB_O : null }] : [{ v: item.claim[1], col: null }, { v: item.claim[0], col: null }];  /* ink: nothing is painted before the answer */
  const tryLabel = W3.tries[S.tried] !== undefined ? tx("Try " + W3.tries[S.tried]) : "";
  api.share({ division: null, faceUp: null, bothHeld: false, namedNumber: null, railOrder: marks.map((m: any) => m.v).sort(fbNum), builtNumber: null, complete: stage === "idle" });

  return (
    <g transform={`translate(${ox},0)`}>
      <style>{FB_CSS}</style>
      <FbRailDraw x={60} w={740} y={FB_RB} max={max} marks={marks} zone={zone} zoneLabel={fbLb(lang).factorsOf(zone)} bar={bar} ghosts={ghosts}
        tip={ghosts.length ? { v: zone + (max - zone) / 2, text: tx("too long") } : null} big C={C} />
      {warm && tryLabel && <FbKey id="try" label={tryLabel} x={(FB_W - 260) / 2} y={FB_TILEY} C={C} onClick={run.once(() => doTry())} />}
      {warm && tryLabel && stepOn === "try" && <Invite x={FB_W / 2} y={FB_TILEY + 38} w={260} h={76} C={C} />}
    </g>
  );
}

/* ── phase 2: the pair bay, a pair laid out as equal rows, and the number they build ── */
const FB_BH2 = 292;
function fbRowPos(rows: number, cols: number, i: number) {
  const px = Math.min(70, (FB_W - 40) / cols), py = Math.min(90, 250 / rows);
  return { x: (FB_W - cols * px) / 2 + px / 2 + (i % cols) * px, y: (FB_BH2 - rows * py) / 2 + py / 2 + Math.floor(i / cols) * py, r: Math.min(28, px * 0.4, py * 0.4), over: false };
}
/* the 20 counters of the pairs question: a heap (t = 0), or t rows with the leftovers on the shelf at the right */
function fbPairPos(i: number, t: number, whole: number) {
  if (!t) { const r = 25 * Math.sqrt(i + 0.5), a = i * 2.39996; return { x: 400 + r * Math.cos(a), y: 146 + r * Math.sin(a), r: 20, over: false }; }
  const per = Math.floor(whole / t), used = per * t;
  if (i < used) { const px = Math.min(70, (FB_W - 230) / per), py = Math.min(90, 250 / t); return { x: 40 + px / 2 + (i % per) * px, y: (FB_BH2 - t * py) / 2 + py / 2 + Math.floor(i / per) * py, r: Math.min(28, px * 0.4, py * 0.4), over: false }; }
  const j = i - used;
  return { x: FB_W - 160 + (j % 4) * 44, y: 100 + Math.floor(j / 4) * 44, r: 18, over: true };
}

function FbPairs(props: any) {
  const { n, item, index, stage, wrong, api, stepOn, ox, lang = "en", tx = (v: any) => v } = props;
  const C = api.C;
  const warm = stage === "demo" || stage === "teach";
  const won = stage === "win" || stage === "idle";
  const kind = warm ? "warm" : item.kind;
  const pair: number[] = warm ? FB_WARM[2].pair : item.pair || [0, 0];
  const whole = kind === "pairs" ? item.whole : pair[0] * pair[1];
  const [a, b] = pair;
  const qk = n + "." + index + (warm ? "w" : "");
  const run = useFbRun(qk, api);
  const [S, set, SR] = useFbBoard(qk, () => ({ rows: kind === "word" ? a : 0, shown: false, named: false, lay: 0, marks: [], ghost: null, tb: false, stale: false, acted: false, gate: 0 }));
  const live = stage === "ask" && !S.tb;
  const liveRef = useRef(live); liveRef.current = live;

  const rowPts = () => Array.from({ length: a }, (_, i) => { const p = fbRowPos(a, b, i * b); return { x: ox + p.x, y: p.y }; });
  const doLay = async () => {
    if (SR.current.rows >= a) { if (warm) api.did("lay"); return; }
    const ok = await run.hold(() => api.act({ tool: "hand", moves: "tap", at: rowPts(), onPoint: (i: number) => set({ rows: i + 1 }) }));
    if (!ok) return;
    set({ rows: a }); api.sfx.settle(); if (warm) api.did("lay");
  };
  const builtBox = { x: 560, y: 304, w: 300, h: 118 };
  const doName = async () => {
    if (SR.current.named) { api.did("name"); return; }
    const ok = await run.hold(() => api.act({ tool: "hand", moves: "tap", at: [{ x: ox + builtBox.x + builtBox.w / 2, y: builtBox.y + builtBox.h / 2 }] }));
    if (!ok) return;
    set({ shown: true, named: true }); api.sfx.tick(); api.did("name");
  };
  const act = (on: any) => { if (on === "lay") doLay(); else if (on === "name") doName(); };

  /* the pairs question: tap a number to lay the 20 counters in that many rows; a tap only ADDS its pair (when nothing is left
     over), so 2 and 10, or 4 and 5, make the one pair; a pair is taken out again by tapping its chip */
  const tapTile = (t: number) => {
    if (!liveRef.current) return;
    const s = SR.current, k = Math.min(t, whole / t);
    set({ lay: t, ghost: null, acted: true, stale: false, marks: whole % t === 0 && !s.marks.includes(k) ? [...s.marks, k].sort(fbNum) : s.marks });
    api.sfx.tick();
  };
  const dropPair = (k: number) => {
    if (!liveRef.current) return;
    set({ marks: SR.current.marks.filter((x: number) => x !== k), ghost: null, acted: true, stale: false });
    api.sfx.tick();
  };
  const pairsText = (m: number[]) => m.slice().sort(fbNum).map((k) => `${k}×${whole / k}`).join(",");
  const enterFn = kind === "pairs" ? () => {
    if (!liveRef.current) return;
    const s = SR.current;
    if (s.stale && !s.acted) return;
    if (!s.marks.length) { set({ gate: s.gate + 1 }); return; }
    api.submit(pairsText(s.marks));
  } : null;
  api.onEnter(warm ? (stepOn ? () => act(stepOn) : null) : stage === "ask" ? enterFn : null);
  HOOK.enter = enterFn;
  HOOK.set = (v: any) => {
    if (kind !== "pairs") return false;
    /* the value AS GIVEN (a wrong list is a miss, never trimmed to the true divisors); a pair the board cannot draw
       (its product is not this number) is not representable: false */
    const ps = fbPairs(v);
    if (!ps.length || ps.some((p) => p[0] * p[1] !== whole)) return false;
    const m = [...new Set(ps.map((p) => Math.min(p[0], p[1])))].sort(fbNum);
    set({ ghost: null, marks: m, lay: m.length ? m[m.length - 1] : 0, acted: true, stale: false });
    return true;
  };
  const ready = kind === "pairs" && live && S.marks.length > 0 && !(S.stale && !S.acted);
  useEffect(() => { if (!warm) api.answerReady(ready); }, [ready, qk, S.acted, S.stale]);

  /* the traceback: the rows are laid again one at a time and counted, then the built card is named; for the pairs question
     every pair is laid out in turn, into a layer of its own over the child's marks */
  useEffect(() => {
    if (!wrong || stage !== "ask" || warm) return;
    const my = ++run.ep.current; run.tb.current = true;
    (async () => {
      api.lock(true);
      set({ tb: true, stale: true, acted: false });
      if (kind === "pairs") {
        const all: number[] = [];
        for (let d = 1; d * d <= whole; d++) if (whole % d === 0) all.push(d);
        const cx = (t: number) => ({ x: ox + 14 + (t - 1) * 84 + 38, y: FB_TILEY + 38 });
        set({ ghost: [], lay: 0 });
        await fbWait(400); if (!run.ok(my)) return;
        await api.act({ tool: "hand", moves: "tap", at: all.map(cx), onPoint: (i: number) => set({ lay: all[i], ghost: all.slice(0, i + 1) }) });
        if (!run.ok(my)) return;
      } else {
        set({ rows: 0, shown: false, named: false });
        await fbWait(400); if (!run.ok(my)) return;
        await api.act({ tool: "hand", moves: "tap", at: rowPts(), onPoint: (i: number) => set({ rows: i + 1 }) });
        if (!run.ok(my)) return;
        await fbWait(400); if (!run.ok(my)) return;
        set({ shown: true, named: true });
      }
      await fbWait(600); if (!run.ok(my)) return;
      set({ tb: false }); run.tb.current = false; api.lock(false);
    })();
  }, [wrong]);

  /* what is drawn */
  const rows = won && kind !== "pairs" ? a : S.rows;
  /* at most 40 skins on a screen, and never buttons mixed with plain counters on one board: a board is all buttons when all its
     counters fit the 40, otherwise all plain */
  const skinned = kind === "pairs" || a * b <= 40;
  const numShown = kind === "word" || S.shown || (won && kind !== "pairs");
  const nameShown = S.named || (won && kind !== "pairs");
  const counters: any[] = [];
  if (kind === "pairs") {
    for (let i = 0; i < whole; i++) counters.push({ ...fbPairPos(i, S.lay, whole), k: i });
  } else {
    for (let i = 0; i < rows * b; i++) counters.push({ ...fbRowPos(a, b, i), k: i });
  }
  const left = kind === "pairs" && S.lay ? whole - Math.floor(whole / S.lay) * S.lay : 0;
  const label = kind === "pairs" ? (S.lay ? fbLb(lang).rows(S.lay, Math.floor(whole / S.lay)) : fbLb(lang).counters(whole))
    : rows ? fbLb(lang).rows(rows, b) : "";
  const chips = kind === "pairs" ? (S.ghost ? S.ghost : S.marks) : [];
  const tw = 76, tg = 8, tx0 = (FB_W - (10 * tw + 9 * tg)) / 2;
  api.share({ division: null, faceUp: null, bothHeld: false, namedNumber: kind === "pairs" ? S.marks.map((k: number) => [k, whole / k]) : null, railOrder: null,
    builtNumber: (kind === "build" || kind === "warm") && numShown ? a * b : kind === "word" && won ? item.built : null, complete: stage === "idle" });

  return (
    <g transform={`translate(${ox},0)`}>
      <style>{FB_CSS}</style>
      <rect x={0} y={0} width={FB_W} height={FB_BH2} rx={22} fill={tint(C.panel, 0.4)} stroke={C.rule} strokeWidth={2} />
      {kind !== "pairs" && Array.from({ length: a }).map((_, r) => {
        const p = fbRowPos(a, b, r * b);
        return <line key={"l" + r} x1={20} y1={p.y} x2={FB_W - 20} y2={p.y} stroke={tint(C.rule, 0.4)} strokeWidth={2} />;
      })}
      <g filter="url(#fShadowSoft)">
        {counters.map((p: any) => (
          <g key={"c" + p.k} className={kind === "pairs" ? "fb-t" : "fb-in"} style={kind === "pairs" ? ({ transform: `translate(${p.x}px, ${p.y}px)` } as any) : undefined}>
            <Disc x={kind === "pairs" ? 0 : p.x} y={kind === "pairs" ? 0 : p.y} r={p.r} paint={p.over ? "gPointer" : "gTen"} flat />
            {skinned && <Skin name="button" x={(kind === "pairs" ? 0 : p.x) - p.r} y={(kind === "pairs" ? 0 : p.y) - p.r} w={2 * p.r} h={2 * p.r} fit="stretch" />}
            {p.over && <circle cx={0} cy={0} r={p.r + 3} fill="none" stroke={C.ink} strokeWidth={3} />}
          </g>
        ))}
      </g>
      {left > 0 && <text x={FB_W - 100} y={64} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={fbInk(FB_O)}>{tx("left over")}</text>}
      {label && <text x={8} y={366} fontSize={T.label} fontWeight={700} fill={C.ink}>{label}</text>}

      {/* the built number: a card that names what the rows come to */}
      {kind !== "pairs" && (
        <g>
          <rect x={builtBox.x} y={builtBox.y} width={builtBox.w} height={builtBox.h} rx={22} fill="url(#gCard)" stroke={nameShown ? FB_M : C.rule} strokeWidth={nameShown ? 5 : 2} filter="url(#fShadowSoft)" />
          <text x={builtBox.x + builtBox.w / 2} y={builtBox.y + 62} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={nameShown ? fbInk(FB_M) : C.ink}>
            {numShown ? (kind === "word" ? item.built : a * b) : "?"}
          </text>
          {nameShown && <text className="fb-in" x={builtBox.x + builtBox.w / 2} y={builtBox.y + 106} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={fbInk(FB_M)}>{tx("multiple")}</text>}
        </g>
      )}
      {warm && !S.named && S.rows >= a && <Hit id="name" label={tx("Name the number")} x={builtBox.x} y={builtBox.y} w={builtBox.w} h={builtBox.h} onPress={doName} />}
      {warm && stepOn === "name" && !S.named && <Invite x={builtBox.x + builtBox.w / 2} y={builtBox.y + builtBox.h / 2} w={builtBox.w} h={builtBox.h} rx={22} C={C} />}

      {/* the pairs found (the question asks for every one) */}
      {kind === "pairs" && chips.map((k: number, j: number) => (
        <g key={"p" + k} className="fb-in">
          <rect x={250 + j * 182} y={312} width={170} height={76} rx={16} fill={tint(FB_F, 0.88)} stroke={FB_F} strokeWidth={S.ghost ? 3 : 4} strokeDasharray={S.ghost ? "8 6" : undefined} />
          <text x={250 + j * 182 + 85} y={312 + 38 + T.label * 0.36} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={fbInk(FB_F)}>{`${k} × ${whole / k}`}</text>
          {live && !S.ghost && <Hit id={"pair-" + k} label={"Take out " + k + " times " + whole / k} x={250 + j * 182} y={312} w={170} h={76} onPress={run.tap("pair-" + k, () => dropPair(k))} />}
        </g>
      ))}

      {/* the key that lays the rows, and the numbers to try */}
      {(warm || kind === "build") && S.rows < a && <FbKey id="lay" label={tx("Lay rows")} x={(FB_W - 260) / 2} y={FB_TILEY} C={C} onClick={run.once(() => doLay())} />}
      {warm && stepOn === "lay" && S.rows < a && <Invite x={FB_W / 2} y={FB_TILEY + 38} w={260} h={76} C={C} />}
      {kind === "pairs" && (item.tiles as number[]).map((v, i) => (
        <g key={"t" + v}>
          <rect x={tx0 + i * (tw + tg)} y={FB_TILEY} width={tw} height={tw} rx={16} fill={S.marks.includes(Math.min(v, whole / v)) && whole % v === 0 ? tint(FB_F, 0.82) : "url(#gKey)"} stroke={S.lay === v ? C.accent : C.rule} strokeWidth={S.lay === v ? 5 : 2} filter="url(#fShadowSoft)" />
          <text x={tx0 + i * (tw + tg) + tw / 2} y={FB_TILEY + tw / 2 + T.prompt * 0.36} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={C.ink}>{v}</text>
          {live && <Hit id={"tile-" + v} label={"Rows of " + v} x={tx0 + i * (tw + tg)} y={FB_TILEY} w={tw} h={tw} onPress={run.tap("tile-" + v, () => tapTile(v))} />}
        </g>
      ))}
      {kind === "pairs" && S.gate > 0 && !S.marks.length && <rect key={"gate" + S.gate} className="fb-lit" x={tx0 - 6} y={FB_TILEY - 6} width={10 * tw + 9 * tg + 12} height={tw + 12} rx={20} fill="none" stroke={C.accent} strokeWidth={5} pointerEvents="none" />}
    </g>
  );
}

/* ── phase 4: a number stands at both ends of its own list: the pen (factors) and the track (multiples) ── */
const FB_PEN = { x: 0, y: 82, w: 380, h: 140 }, FB_TRK = { x: 420, y: 82, w: 440, h: 140 };
const fbPenX = (i: number) => 24 + i * 84, fbTrkX = (i: number) => 436 + i * 80, FB_CY = 104;
/* the list question after a miss: the pen opens a second row for the whole right list, the cards below slide down to clear it */
const FB_CY2 = 216, FB_PEN2_H = 242, FB_CDY = 44;
function FbCard({ x, y, v, col, lit, dash, big, C }: any) {
  const w = big ? 130 : 72, h = big ? 112 : 96, has = v !== null && v !== undefined;
  const fs = big ? T.display : String(v).length >= 3 ? T.label : T.prompt;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={14} fill={!has ? tint(C.panel, 0.35) : lit ? tint(FB_B, 0.82) : "#FFFFFF"} stroke={lit ? FB_B : has ? col || C.ink : C.dim}
        strokeWidth={lit ? 5 : has ? 3 : 2.5} strokeDasharray={!has || dash ? "9 7" : undefined} className={lit ? "fb-lit" : undefined} />
      {has && <text x={x + w / 2} y={y + h / 2 + fs * 0.36} textAnchor="middle" fontSize={fs} fontWeight={700} fill={col ? fbInk(col) : C.ink}>{v}</text>}
    </g>
  );
}

function FbLists(props: any) {
  const { n, item, index, stage, wrong, api, stepOn, ox, lang = "en", tx = (v: any) => v } = props;
  const C = api.C;
  const warm = stage === "demo" || stage === "teach";
  const won = stage === "win" || stage === "idle";
  const W4 = FB_WARM[4];
  const kind = warm ? "warm" : item.kind;
  const num = warm ? W4.num : item.num;
  const qk = n + "." + index + (warm ? "w" : "");
  const run = useFbRun(qk, api);
  const [S, set, SR] = useFbBoard(qk, () => ({ penN: 0, trkN: 0, lit: false, gap: 0, picks: [], ghost: null, tb: false, stale: false, acted: false, gate: 0 }));
  const live = stage === "ask" && !S.tb;
  const liveRef = useRef(live); liveRef.current = live;
  const penArr: any[] = warm ? W4.pen : item.pen || [];
  const trkArr: any[] = warm ? W4.track : item.track || [];
  const penPt = (i: number) => ({ x: ox + fbPenX(i) + 36, y: FB_CY + 48 });
  const trkPt = (i: number) => ({ x: ox + fbTrkX(i) + 36, y: FB_CY + 48 });

  /* the guide steps: fill the pen, run the track, show the number in both */
  const doStep = async (on: string) => {
    if (run.busy.current) return;
    const s = SR.current;
    if ((on === "pen" && s.penN >= penArr.length) || (on === "track" && s.trkN >= trkArr.length) || (on === "show" && s.lit)) { api.did(on); return; }
    const ok = await run.hold(() => api.act(on === "pen" ? { tool: "hand", moves: "tap", at: penArr.map((_, i) => penPt(i)), onPoint: (i: number) => set({ penN: i + 1 }) }
      : on === "track" ? { tool: "hand", moves: "tap", at: trkArr.map((_, i) => trkPt(i)), onPoint: (i: number) => set({ trkN: i + 1 }) }
      : { tool: "hand", moves: "tap", at: [{ x: ox + (FB_W - 130) / 2 + 65, y: 346 }] }));
    if (!ok) return;
    if (on === "show") set({ lit: true }); else set(on === "pen" ? { penN: penArr.length } : { trkN: trkArr.length });
    api.sfx.tick(); api.did(on);
  };
  const act = (on: any) => { if (on === "pen" || on === "track" || on === "show") doStep(on); };

  /* the list question: tap a card to pen it, tap it again to take it out */
  const pick = (v: number) => {
    if (!liveRef.current) return;
    const s = SR.current;
    set({ picks: s.picks.includes(v) ? s.picks.filter((x: number) => x !== v) : [...s.picks, v].sort(fbNum), ghost: null, acted: true, stale: false });
    api.sfx.tick();
  };
  const enterFn = kind === "list" ? () => {
    if (!liveRef.current) return;
    const s = SR.current;
    if (s.stale && !s.acted) return;
    if (!s.picks.length) { set({ gate: s.gate + 1 }); return; }
    api.submit(s.picks.join(","));
  } : null;
  api.onEnter(warm ? (stepOn ? () => act(stepOn) : null) : stage === "ask" ? enterFn : null);
  HOOK.enter = enterFn;
  HOOK.set = (v: any) => {
    if (kind !== "list") return false;
    /* the value AS GIVEN (a wrong list is a miss); a value that is not a list of this question's cards cannot be drawn: false */
    const got = fbList(v);
    if (!got.length || got.some((x) => !(item.cands || []).includes(x))) return false;
    set({ picks: [...new Set(got)].sort(fbNum), ghost: null, acted: true, stale: false });
    return true;
  };
  const ready = kind === "list" && live && S.picks.length > 0 && !(S.stale && !S.acted);
  useEffect(() => { if (!warm) api.answerReady(ready); }, [ready, qk, S.acted, S.stale]);

  /* the traceback: the number stands at the shut end of the pen and the first step of the track at once, a hairline joins
     them; for the list question each right card is ringed in turn, over the child's own picks */
  useEffect(() => {
    if (!wrong || stage !== "ask" || warm) return;
    const my = ++run.ep.current; run.tb.current = true;
    (async () => {
      api.lock(true);
      set({ tb: true, stale: true, acted: false });
      await fbWait(400); if (!run.ok(my)) return;
      if (kind === "list") {
        const right = fbList(item.answer);
        set({ ghost: [] });
        await fbWait(500); if (!run.ok(my)) return;
        await api.act({ tool: "hand", moves: "tap", at: right.map((_v, j) => ({ x: ox + 30 + j * 94 + 36, y: FB_CY2 + 48 })), onPoint: (i: number) => set({ ghost: right.slice(0, i + 1) }) });
      } else {
        /* the number is put at the shut end of the pen, then at the first step of the track */
        await api.act({ tool: "hand", moves: "tap", at: [penPt(penArr.length), trkPt(0)], onPoint: (i: number) => set({ gap: i + 1 }) });
      }
      if (!run.ok(my)) return;
      await fbWait(700); if (!run.ok(my)) return;
      set({ tb: false }); run.tb.current = false; api.lock(false);
    })();
  }, [wrong]);

  /* what is drawn */
  const gap = won ? 2 : S.gap;
  const joined = warm ? S.lit : kind === "list" ? false : gap >= 2;
  /* the lists carry no empty card: the number joins the pen's end and the track's start only when it is put there */
  const penShown = warm ? penArr.slice(0, S.penN) : gap >= 1 ? [...penArr, num] : penArr;
  const trkShown = warm ? trkArr.slice(0, S.trkN) : gap >= 2 ? [num, ...trkArr] : trkArr;
  const penLen = warm ? penArr.length : penShown.length;
  const wallX = fbPenX(penLen) - 10;
  const cands: number[] = kind === "list" ? item.cands : [];
  const open2 = kind === "list" && !!S.ghost;
  const key = warm ? stepOn : null;
  const keyLabel = key === "pen" ? tx("Fill pen") : key === "track" ? tx("Fill track") : key === "show" ? tx("Show " + num) : "";
  api.share({ division: null, faceUp: null, bothHeld: joined, namedNumber: kind === "list" ? S.picks : null, railOrder: null, builtNumber: null, complete: stage === "idle" });

  return (
    <g transform={`translate(${ox},0)`}>
      <style>{FB_CSS}</style>
      {kind !== "list" && (
        <g>
          <text x={6} y={66} fontSize={T.label} fontWeight={700} fill={fbInk(FB_F)}>{fbLb(lang).factorsOf(num)}</text>
          <text x={FB_TRK.x + 150} y={66} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={fbInk(FB_M)}>{fbLb(lang).multiplesOf(num)}</text>
          <rect x={FB_PEN.x} y={FB_PEN.y} width={wallX + 22} height={FB_PEN.h} rx={20} fill={tint(FB_F, 0.92)} stroke={FB_F} strokeWidth={3} />
          <rect x={4} y={92} width={12} height={120} rx={5} fill={C.ink} />
          <rect x={wallX} y={92} width={12} height={120} rx={5} fill={C.ink} />
          <path d={`M ${FB_W} ${FB_TRK.y} H ${FB_TRK.x + 20} Q ${FB_TRK.x} ${FB_TRK.y} ${FB_TRK.x} ${FB_TRK.y + 20} V ${FB_TRK.y + FB_TRK.h - 20} Q ${FB_TRK.x} ${FB_TRK.y + FB_TRK.h} ${FB_TRK.x + 20} ${FB_TRK.y + FB_TRK.h} H ${FB_W}`}
            fill={tint(FB_M, 0.92)} stroke={FB_M} strokeWidth={3} />
          {penShown.map((v: any, i: number) => {
            const last = warm ? i === penArr.length - 1 && S.lit : gap >= 1 && i === penArr.length;
            return <g key={"p" + v} className="fb-t" style={{ transform: `translate(${fbPenX(i)}px, ${FB_CY}px)` } as any}><g className={warm || (gap >= 1 && i === penArr.length) ? "fb-in" : undefined}><FbCard x={0} y={0} v={v} col={FB_F} lit={last} C={C} /></g></g>;
          })}
          {trkShown.map((v: any, i: number) => {
            const first = warm ? i === 0 && S.lit : gap >= 2 && i === 0;
            return <g key={"k" + v} style={{ transform: `translate(${fbTrkX(i)}px, ${FB_CY}px)` } as any}><g className={warm || (gap >= 2 && i === 0) ? "fb-in" : undefined}><FbCard x={0} y={0} v={v} col={FB_M} lit={first} C={C} /></g></g>;
          })}
          {joined && <path className="fb-in" d={`M ${fbPenX(penLen - 1) + 36} ${FB_CY - 10} V ${FB_CY - 14} H ${fbTrkX(0) + 36} V ${FB_CY - 10}`} fill="none" stroke={FB_B} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" />}
          <path d={`M ${FB_W - 22} ${FB_CY + 40} L ${FB_W - 6} ${FB_CY + 48} L ${FB_W - 22} ${FB_CY + 56}`} fill="none" stroke={fbInk(FB_M)} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />
          <g opacity={joined ? 0.55 : 1}><FbCard x={(FB_W - 130) / 2} y={290} v={num} big dash={joined} lit={warm && S.lit} C={C} /></g>
        </g>
      )}
      {kind === "list" && (
        <g>
          <text x={12} y={66} fontSize={T.label} fontWeight={700} fill={fbInk(FB_F)}>{fbLb(lang).factorsOf(num)}</text>
          <rect x={0} y={FB_PEN.y} width={FB_W} height={open2 ? FB_PEN2_H : FB_PEN.h} rx={20} fill={tint(FB_F, 0.92)} stroke={FB_F} strokeWidth={3} style={{ transition: "height 460ms cubic-bezier(.3,.7,.25,1)" } as any} />
          <rect x={4} y={92} width={12} height={120} rx={5} fill={C.ink} />
          <rect x={24 + S.picks.length * 94 - 6} y={92} width={12} height={120} rx={5} fill={C.ink} />
          {S.picks.map((v: number, j: number) => <g key={"pk" + v} className="fb-in"><FbCard x={30 + j * 94} y={FB_CY} v={v} col={FB_F} C={C} /></g>)}
          {open2 && <rect x={4} y={206} width={12} height={112} rx={5} fill={C.ink} />}
          {open2 && <rect x={24 + fbList(item.answer).length * 94 - 6} y={206} width={12} height={112} rx={5} fill={C.ink} />}
          {open2 && S.ghost.map((v: number, j: number) => <g key={"gh" + v} className="fb-in"><FbCard x={30 + j * 94} y={FB_CY2} v={v} col={FB_F} dash C={C} /></g>)}
          <g className="fb-t" style={{ transform: `translate(0px, ${open2 ? FB_CDY : 0}px)` } as any}>
            {cands.map((v, i) => {
              const on = S.picks.includes(v), x = 7 + i * 94;
              return (
                <g key={"cd" + v}>
                  <rect x={x} y={300} width={86} height={104} rx={14} fill={on ? tint(C.panel, 0.4) : "#FFFFFF"} stroke={on ? C.dim : C.ink} strokeWidth={on ? 2.5 : 3} strokeDasharray={on ? "9 7" : undefined} />
                  {!on && <text x={x + 43} y={300 + 52 + T.prompt * 0.36} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={C.ink}>{v}</text>}
                  {live && <Hit id={"cand-" + v} label={"Card " + v} x={x} y={300} w={86} h={104} onPress={run.tap("cand-" + v, () => pick(v))} />}
                </g>
              );
            })}
          </g>
          {S.gate > 0 && !S.picks.length && <rect key={"gate" + S.gate} className="fb-lit" x={0} y={FB_PEN.y} width={FB_W} height={FB_PEN.h} rx={20} fill="none" stroke={C.accent} strokeWidth={5} pointerEvents="none" />}
        </g>
      )}
      {warm && keyLabel && <FbKey id={key} label={keyLabel} x={(FB_W - 260) / 2} y={FB_TILEY} C={C} onClick={run.once(() => doStep(key as string))} />}
      {warm && keyLabel && <Invite x={FB_W / 2} y={FB_TILEY + 38} w={260} h={76} C={C} />}
    </g>
  );
}

/* ── free play: any exact division on the card, the rail live ── */
function FbFree(props: any) {
  const { api, ox, lang = "en", tx = (v: any) => v } = props;
  const C = api.C;
  const run = useFbRun("free", api);
  const [S, set, SR] = useFbBoard("free", () => ({ k: 0, turned: false, flip: 0, hops: 0 }));
  api.onEnter(null);
  const [a, b] = FB_FREE[S.k % FB_FREE.length];
  const q = a / b;
  const railX = (v: number) => 50 + (v / a) * 760;
  const turn = async () => {
    const ok = await run.hold(() => api.act({ tool: "hand", moves: "tap", at: [{ x: ox + FB_CARD.x + FB_CARD.w / 2, y: FB_CARD.y + FB_CARD.h / 2 }] }));
    if (!ok) return;
    set({ turned: !SR.current.turned, flip: SR.current.flip + 1 }); api.sfx.tick();
  };
  const hop = async () => {
    const ok = await run.hold(() => {
      set({ hops: 0 });
      return api.act({ tool: "hand", moves: "tap", at: Array.from({ length: q }, (_, k) => ({ x: ox + railX((k + 1) * b), y: FB_RAILY - 14 })), onPoint: (i: number) => set({ hops: i + 1 }) });
    });
    if (!ok) return;
    set({ hops: q }); api.sfx.settle();
  };
  const next = () => set({ k: SR.current.k + 1, turned: false, hops: 0, flip: SR.current.flip + 1 });
  api.share({ division: `${a} ÷ ${b} = ${q}`, faceUp: S.turned, bothHeld: S.turned, namedNumber: null, railOrder: [b, a], builtNumber: null, complete: false });
  return (
    <g transform={`translate(${ox},0)`}>
      <style>{FB_CSS}</style>
      <FbCardDraw card={[a, "÷", b, q]} colored={S.turned} flip={S.flip} turnable C={C} tx={tx} />
      <Hit id="free-card" label={tx("Turn the card")} x={FB_CARD.x} y={FB_CARD.y} w={FB_CARD.w} h={FB_CARD.h} onPress={turn} />
      <rect x={0} y={FB_ROWA} width={FB_W} height={FB_RH} rx={22} fill={S.turned ? "#FFFFFF" : "none"} stroke={C.rule} strokeWidth={2} strokeDasharray={S.turned ? undefined : "10 10"} />
      <rect x={0} y={FB_ROWB} width={FB_W} height={FB_RH} rx={22} fill={S.turned ? "#FFFFFF" : "none"} stroke={C.rule} strokeWidth={2} strokeDasharray={S.turned ? undefined : "10 10"} />
      <line x1={FB_W / 2} y1={FB_ROWA + FB_RH} x2={FB_W / 2} y2={FB_ROWB} stroke={S.turned ? FB_B : C.rule} strokeWidth={S.turned ? 6 : 2} />
      {S.turned && (
        <g key={"f" + S.flip} className="fb-in">
          <FbSentRow parts={fbFace("factor", undefined, lang)} cx={FB_W / 2} y={FB_ROWA + (FB_RH - FB_BH) / 2} vals={[b, a]} cols={[FB_F, FB_M]} C={C} tag="ff" lang={lang} />
          <FbSentRow parts={fbFace("multiple", undefined, lang)} cx={FB_W / 2} y={FB_ROWB + (FB_RH - FB_BH) / 2} vals={[a, b]} cols={[FB_M, FB_F]} C={C} tag="fm" lang={lang} />
        </g>
      )}
      <FbRailDraw y={FB_RAILY} max={a} marks={[{ v: a, col: FB_M }, ...(S.hops ? [] : [{ v: b, col: FB_F }])]} hops={S.hops ? { f: b, upto: S.hops } : null} C={C} />
      <FbKey id="free-hop" label={tx("Hop")} x={FB_W / 2 - 270} y={FB_TILEY} w={250} C={C} onClick={run.once(hop)} />
      <FbKey id="free-next" label={tx("New card")} x={FB_W / 2 + 20} y={FB_TILEY} w={250} C={C} onClick={run.once(next)} />
    </g>
  );
}

/* the working area: one station a phase, and free play */
function Work(props: any) {
  const { stage, n, item, index, box, api } = props;
  const kx = box && box.key ? box.key.x - 12 : box ? box.w : 1472;
  const ox = Math.max(0, Math.round((Math.min(box ? box.w : 900, kx) - FB_W) / 2));
  /* the right answer's own one-sentence line (a phase's last one is replaced by its closing) */
  useEffect(() => { if (stage === "win" && item && item.win) api.say(item.win); }, [stage, index]);
  const P = { ...props, ox };
  if (stage === "free") return <FbFree {...P} />;
  const warm = stage === "demo" || stage === "teach";
  if (n === 1) return <FbFacts {...P} />;
  if (n === 2) return <FbPairs {...P} />;
  if (n === 3) return warm || item.kind === "yn" ? <FbRails {...P} /> : <FbFacts {...P} />;
  return <FbLists {...P} />;
}

/* the summary page's small drawing of the child's last right answer in a phase: two lines in a frame */
/* the same two lines in Hindi and Gujarati, in the book's word order (no Latin letter) */
const fbThumbIn = (lang: string, it: any, s: string, tx: any): string[] | null => {
  if (lang !== "hi" && lang !== "gu") return null;
  const hi = lang === "hi", F = FB_KW[lang].factor, M = FB_KW[lang].multiple;
  const of2 = (a: any, b: any) => (hi ? `${a} और ${b} का` : `${a} અને ${b}નો`);
  const is = (w: string) => (hi ? `${w} है` : `${w} છે`);
  const lead = (a: any, rest: string) => (hi ? `${a}, ${rest}` : `${a} એ ${rest}`);
  if (it.kind === "sent") { const p = fbPair(s) || fbPair(it.answer) || [0, 0]; return [lead(p[0], hi ? `${p[1]} का` : `${p[1]}નો`), is(it.face === "factor" ? F : M)]; }
  if (it.kind === "sent1") return [lead(s, of2(it.of[0], it.of[1])), is(F)];
  if (it.kind === "word") return [lead(it.built, of2(it.pair[0], it.pair[1])), is(tx(s))];
  if (it.kind === "build") return [lead(s, of2(it.pair[0], it.pair[1])), is(M)];
  if (it.kind === "yn") return [lead(it.claim[0], hi ? `${it.claim[1]} का ${F}` : `${it.claim[1]}નો ${F}`), hi ? "नहीं हो सकता" : "ન હોઈ શકે"];
  if (it.kind === "both") return hi ? [`${it.num} दोनों`, "सूचियों में है"] : [`${it.num} બંને`, "યાદીમાં છે"];
  if (it.kind === "ends") return hi ? [`${it.num}: सबसे बड़ा`, "और सबसे छोटा"] : [`${it.num}: સૌથી મોટો`, "અને સૌથી નાનો"];
  if (it.kind === "list") return [hi ? `${it.num} के गुणनखंड:` : `${it.num}ના અવયવ:`, fbList(s).join(", ")];
  return null;
};
const fbThumbLines = (it: any, v: any, tx: any, lang = "en"): string[] => {
  const s = String(v ?? "");
  const hl = fbThumbIn(lang, it, s, tx);
  if (hl) return hl;
  if (it.kind === "sent") { const p = fbPair(s) || fbPair(it.answer) || [0, 0]; return [`${p[0]} is a`, `${it.face} of ${p[1]}`]; }
  if (it.kind === "sent1") return [`${s} is a factor`, `of ${it.of.join(" and ")}`];
  if (it.kind === "word") return [`${it.built}: ${s}`, `of ${it.pair.join(" and ")}`];
  if (it.kind === "build") return [`${s}: multiple`, `of ${it.pair.join(" and ")}`];
  if (it.kind === "pairs") { const ps = fbPairs(s).map((p) => p.join("×")); return [`${it.whole} = ${ps[0] || ""}`, ps.slice(1).join(", ")]; }
  if (it.kind === "yn") return [`${it.claim[0]} cannot be a`, `factor of ${it.claim[1]}`];
  if (it.kind === "both") return [`${it.num} is in`, "both lists"];
  if (it.kind === "ends") return [`${it.num}: greatest`, "and smallest"];
  if (it.kind === "list") return [`factors of ${it.num}:`, fbList(s).join(", ")];
  return [s, ""];
};
function Thumb({ n, result, it, C, w, h, lang = "en", tx = (v: any) => v }: any) {
  const L = result && result.last;
  if (!L) return null;
  const item = it || (PHASES[(n || 1) - 1] || { items: [] }).items[L.item] || {};
  const [l1, l2] = fbThumbLines(item, L.value, tx, lang);
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      <text x={14} y={h / 2 - 6} fontSize={T.micro} fontWeight={700} fill={C.ink}>{l1}</text>
      <text x={14} y={h / 2 + 28} fontSize={T.micro} fontWeight={500} fill={C.ink}>{l2}</text>
    </g>
  );
}

function FactBothWays(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, fitHost: () => null,
      /* the board layout; KEY ONLY (the new look): no question bar, only its blinking key; the question lives in the bubble */
      board: true,
      keyOnly: true,
      /* the wide keypad: the picture is 860 wide, so it fits x 64 to 964 while the panel is open */
      bigPad: true,
      /* the Next key: nothing moves on by itself */
      nextKey: true,
      /* one small clickable dot per phase */
      navDots: true,
      StartArt, START_HOOK,
      }} />
  );
}

export default FactBothWays;
