/* ═══ M1.S2.T3.C10.2D1 · step_track · tool-specific part (REMAKE on r28, silent, the new class 4 look) ═══════════
   runtime/runtime.tsx is prepended at build: header, canvas, answer panel, bubble, Kiko, dots, toolApi, sounds, scoring.
   Pictures: a track of stepping stones with a jump arc over every pair of neighbours (numbers, letters), a pairing tray with an
   even / odd card, a rule maker (free play). Every act goes through api.act (a hand taps the arcs, the stones, the counters).
   Geometry: laid out for the OPEN width (900, bigPad) and centred in the shut width, so nothing jumps while the child types. */

const TOOL_ID = "step_track";
const MEDIA_ID = "M1.S2.T3.C10.2D1";
const TOOL_NAME = "Step Track";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
const VOICE = {"rate":0.92,"pitch":1.06};

const OPENING = ["A track of stones, with a jump between each pair. How far is every jump?"];
const FINISH_LINE = "Every jump labelled, and every series carried on by its own rule.";
const FREE_LINE = "Free play. Choose a start and a rule, and watch the track fill.";

/* ── the track's own numbers (Work coordinates; the column is 900 wide and centred in the room) ───────────────── */
const ST = { w: 96, h: 96, pitch: 108, y: 214 };
const STRIP = { x: 8, pitch: 34, w: 32, y: 350, h: 58 };
const TRAY = { x: 24, y: 76, w: 852, h: 240 };
const KEYROW = { y: 438, w: 280, h: 72 };
const ALPHA = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const RULES = [
  { id: "step", a: "add a", b: "step" },
  { id: "away", a: "take a step", b: "away" },
  { id: "self", a: "add it to", b: "itself" },
  { id: "two", a: "add the two", b: "before" },
];
const ACT_LABEL: any = { jumps: "Find jumps", compare: "Compare", match: "Match", arcs: "Show arcs", count: "Count jumps", pair: "Pair them" };

/* the start page: the track the lesson is about, still, with the last stone waiting */
const START_HOOK = "How far is every jump?";
function StartArt({ box, C, lang, tx }: any) {
  const n = 6, sw = 128, gap = 56, top = 150, x0 = Math.round((box.w - (n * sw + (n - 1) * gap)) / 2);
  const mid = (i: number) => x0 + i * (sw + gap) + sw / 2;
  const vals = [3, 6, 9, 12, 15];
  const ink = shade(CONTENT.pointer, 0.25);
  return (
    <g>
      {Array.from({ length: n - 1 }).map((_, i) => (
        <g key={"a" + i}>
          <path d={`M ${mid(i)} ${top} C ${mid(i)} 20, ${mid(i + 1)} 20, ${mid(i + 1)} ${top}`} fill="none" stroke={CONTENT.pointer} strokeWidth={6} strokeDasharray={i === n - 2 ? "12 10" : undefined} />
          {i < n - 2 && (
            <g>
              <rect x={(mid(i) + mid(i + 1)) / 2 - 48} y={32} width={96} height={52} rx={26} fill="#FFFFFF" stroke={CONTENT.pointer} strokeWidth={4} />
              <text x={(mid(i) + mid(i + 1)) / 2} y={70} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={ink}>+3</text>
            </g>
          )}
        </g>
      ))}
      {Array.from({ length: n }).map((_, i) => (
        <g key={"s" + i}>
          <rect x={mid(i) - sw / 2} y={top} width={sw} height={sw} rx={30}
            fill={i < n - 1 ? tint(CONTENT.hundred, 0.82) : "#FFFFFF"} stroke={i < n - 1 ? CONTENT.hundred : C.ink} strokeWidth={i < n - 1 ? 6 : 4} strokeDasharray={i < n - 1 ? undefined : "14 10"} />
          <Skin name="stone" x={mid(i) - sw / 2} y={top} w={sw} h={sw} fit="stretch" />
          <rect x={mid(i) - sw / 2} y={top} width={sw} height={sw} rx={30} fill={i < n - 1 ? CONTENT.hundred : "#FFFDF7"} fillOpacity={i < n - 1 ? 0.3 : 0.5}
            stroke={i < n - 1 ? CONTENT.hundred : C.ink} strokeWidth={i < n - 1 ? 6 : 4} strokeDasharray={i < n - 1 ? undefined : "14 10"} />
          {i < n - 1 && <text x={mid(i)} y={top + 82} textAnchor="middle" fontSize={T.display} fontWeight={700} fill={shade(CONTENT.hundred, 0.3)} stroke="#FFFFFF" strokeWidth={9} strokeLinejoin="round" paintOrder="stroke">{vals[i]}</text>}
        </g>
      ))}
    </g>
  );
}

/* Hindi and Gujarati: filled AFTER the English is final (check's tr-coverage lists what is missing). */
const TR: any = {
  hi: {
    "Step Track": "चरणों का रास्ता",
    "A track of stones, with a jump between each pair. How far is every jump?": "पत्थरों का एक रास्ता है। हर दो पत्थरों के बीच एक छलाँग है। हर छलाँग कितनी बड़ी है?",
    "Every jump labelled, and every series carried on by its own rule.": "हर छलाँग पर माप लिखी। हर क्रम अपने नियम से आगे बढ़ा।",
    "Free play. Choose a start and a rule, and watch the track fill.": "मुक्त खेल। शुरुआत और नियम चुनो, और रास्ता भरते देखो।",
    "How far is every jump?": "हर छलाँग कितनी बड़ी है?",
    "Find jumps": "छलाँग ढूँढो",
    "Compare": "तुलना करो",
    "Match": "मिलान करो",
    "Show arcs": "चाप दिखाओ",
    "Count jumps": "छलाँग गिनो",
    "Pair them": "जोड़ी बनाओ",
    "even": "सम",
    "odd": "विषम",
    "start": "शुरुआत",
    "step size": "चरण की माप",
    "second start": "दूसरी शुरुआत",
    "next": "अगला",
    "end": "आख़िरी",
    "add a": "एक चरण",
    "step": "जोड़ो",
    "take a step": "एक चरण",
    "away": "घटाओ",
    "add it to": "उसे खुद में",
    "itself": "जोड़ो",
    "add the two": "पिछली दो",
    "before": "संख्याएँ जोड़ो",
    "K": "K",
    "L": "L",
    "M": "M",
    "N": "N",
    "The step between neighbours": "पास-पास की संख्याओं के बीच का चरण",
    "Tap Find jumps to measure each jump in this series, a list in order.": "इस क्रम (सजी हुई सूची) की हर छलाँग नापने के लिए 'छलाँग ढूँढो' पर टैप करो।",
    "Tap the Find jumps key at the bottom.": "नीचे 'छलाँग ढूँढो' बटन पर टैप करो।",
    "Tap the empty stone to land the next term, the next number in the list.": "खाली पत्थर पर टैप करो और अगला पद पाओ, यानी सूची की अगली संख्या।",
    "Tap the empty stone on the track.": "रास्ते पर खाली पत्थर पर टैप करो।",
    "Is every jump the same size?": "क्या हर छलाँग की माप एक ही है?",
    "Use that same jump again from the last stone with a number.": "संख्या वाले आख़िरी पत्थर से वही छलाँग फिर लगाओ।",
    "Check every pair for the same step, and a count down stops at zero.": "हर जोड़ी में एक ही चरण जाँचो, और उलटी गिनती शून्य पर रुकती है।",
    "You learned: find the step, check every jump, and stop at zero.": "तुमने सीखा: चरण ढूँढो, हर छलाँग जाँचो, और शून्य पर रुको।",
    "Next stone?": "अगला पत्थर?",
    "What number lands on the next stone after 7, 12, 17, 22?": "7, 12, 17, 22 के बाद अगले पत्थर पर कौन सी संख्या आएगी?",
    "What is the jump from the first stone to the second?": "पहले पत्थर से दूसरे पत्थर तक की छलाँग कितनी है?",
    "Every jump is 5, so 27 lands next.": "हर छलाँग 5 की है, इसलिए अगला पत्थर 27 है।",
    "Which number fills the empty stone after 5, 11, 17, 23?": "5, 11, 17, 23 के बाद खाली पत्थर में कौन सी संख्या आएगी?",
    "Check the jump between the middle stones too.": "बीच वाले पत्थरों की छलाँग भी जाँचो।",
    "Every jump is 6, so 29 fills the stone.": "हर छलाँग 6 की है, इसलिए पत्थर में 29 आता है।",
    "Where does it stop?": "यह कहाँ रुकता है?",
    "It counts down, so what goes on the next stone after 32 and on the end stone?": "यह उलटी गिनती है, तो 32 के बाद अगले पत्थर पर और आख़िरी पत्थर पर क्या आएगा?",
    "Start at the stone on the right and find the jump to its neighbour.": "दाईं ओर के पत्थर से शुरू करो और पड़ोसी तक की छलाँग ढूँढो।",
    "Take that same jump away again and again, moving left.": "वही छलाँग बार-बार घटाते हुए बाईं ओर चलो।",
    "Stop at the bar: the end stone is where the count ends.": "पट्टी पर रुको: आख़िरी पत्थर पर गिनती खत्म होती है।",
    "Each jump takes 8 away, so 24 is next and the count ends at 0.": "हर छलाँग में 8 घटता है, इसलिए अगला 24 है और गिनती 0 पर खत्म होती है।",
    "Letters can step too": "अक्षर भी चरणों में बढ़ते हैं",
    "Tap Count jumps to hop along the letters.": "'छलाँग गिनो' पर टैप करो और अक्षरों पर कूदते चलो।",
    "Tap the Count jumps key at the bottom.": "नीचे 'छलाँग गिनो' बटन पर टैप करो।",
    "Now tap the empty stone to land the next letter.": "अब खाली पत्थर पर टैप करो और अगला अक्षर पाओ।",
    "Letters step along the alphabet just as numbers step along counting.": "अक्षर वर्णमाला में वैसे ही चलते हैं जैसे संख्याएँ गिनती में।",
    "You learned: letters step along the alphabet, each with its place.": "तुमने सीखा: अक्षर वर्णमाला में चलते हैं, हर एक का अपना स्थान है।",
    "Next place?": "अगला स्थान?",
    "B is at 2, D at 4, F at 6, H at 8, so which place comes next?": "B का स्थान 2, D का 4, F का 6, H का 8 है, तो आगे कौन सा स्थान आएगा?",
    "How many landings does one jump take?": "हर छलाँग में कितने पड़ाव?",
    "Count the landings from B to D.": "B से D तक के पड़ाव गिनो।",
    "Add that many places to the last place you can see.": "जितने पड़ाव गिने, उतने स्थान आख़िरी दिखते स्थान में जोड़ो।",
    "Each jump is 2 places, so J at 10 comes next.": "हर छलाँग 2 स्थान की है, इसलिए 10 पर J आता है।",
    "Next letter?": "अगला अक्षर?",
    "Which letter follows J in A, D, G, J?": "A, D, G, J में J के बाद कौन सा अक्षर आएगा?",
    "How many landings is it from A to D?": "A से D तक कितने पड़ाव हैं?",
    "Count B, C, D: one jump is that many landings.": "B, C, D गिनो: एक छलाँग में उतने ही पड़ाव होते हैं।",
    "Walk the strip from J and count that many landings.": "J से पट्टी पर चलो और उतने ही पड़ाव गिनो।",
    "Each jump is 3 places, so M comes after J.": "हर छलाँग 3 स्थान की है, इसलिए J के बाद M आता है।",
    "Y is at 25, V at 22, S at 19, so what is the next place in this series?": "Y का स्थान 25, V का 22, S का 19 है, तो इस क्रम में अगला स्थान क्या है?",
    "These letters go backwards, so think which way the place goes.": "ये अक्षर पीछे की ओर जाते हैं, तो सोचो स्थान किस ओर जाएगा।",
    "Count the landings from Y back to V.": "Y से V तक पीछे के पड़ाव गिनो।",
    "Take that many places away from the last place.": "उतने स्थान आख़िरी स्थान में से घटाओ।",
    "Each jump goes back 3 places, so P at 16 is next.": "हर छलाँग 3 स्थान पीछे जाती है, इसलिए अगला P है, स्थान 16।",
    "Paired or one left over": "जोड़ी बनी या एक बचा",
    "Tap Pair them to put the counters in twos.": "'जोड़ी बनाओ' पर टैप करो और गोटियों को दो-दो में रखो।",
    "Tap the Pair them key at the bottom.": "नीचे 'जोड़ी बनाओ' बटन पर टैप करो।",
    "Now tap the counter that has no partner.": "अब उस गोटी पर टैप करो जिसका कोई साथी नहीं।",
    "Tap the counter standing on its own.": "अकेली खड़ी गोटी पर टैप करो।",
    "Think in twos and see if anything gets left over.": "दो-दो में सोचो और देखो कि कुछ बचता है या नहीं।",
    "Odd and even take turns, all the way along.": "विषम और सम बारी-बारी से आते हैं, आगे तक।",
    "No counter left over means even, and one left over means odd.": "कोई गोटी न बचे तो सम, और एक बचे तो विषम।",
    "You learned: pairing with none over is even, one over is odd.": "तुमने सीखा: कुछ न बचे तो सम, एक बचे तो विषम।",
    "Even or odd?": "सम या विषम?",
    "Pair up these 11 buttons, then say if they are even or odd.": "इन 11 बटनों की जोड़ियाँ बनाओ, फिर बताओ कि वे सम हैं या विषम।",
    "Count again at the end of the row and see if anyone is alone.": "पंक्ति के आख़िर में फिर गिनो और देखो कि कोई अकेला है या नहीं।",
    "Five pairs and one button left over, so 11 is odd.": "पाँच जोड़ियाँ और एक बटन बचा, इसलिए 11 विषम है।",
    "Pair the 14 socks: is 14 even or odd?": "14 मोज़ों की जोड़ियाँ बनाओ: 14 सम है या विषम?",
    "Do not go by the first digit, but lay all 14 out.": "पहले अंक को देखकर मत बताओ, सभी 14 बिछा दो।",
    "Seven pairs and none left over, so 14 is even.": "सात जोड़ियाँ बनीं और कुछ नहीं बचा, इसलिए 14 सम है।",
    "Which number lands next after 31, 33, 35, 37?": "31, 33, 35, 37 के बाद अगली संख्या कौन सी आएगी?",
    "Look at the jump between the stones you can see.": "जो पत्थर दिख रहे हैं, उनके बीच की छलाँग देखो।",
    "Each stone has one counter left over, so add a whole pair.": "हर पत्थर पर एक गोटी बची है, इसलिए पूरी एक जोड़ी जोड़ो।",
    "Every jump is 2 and every term is odd, so 39 is next.": "हर छलाँग 2 की है और हर पद विषम है, इसलिए अगला 39 है।",
    "When the steps are not equal": "जब चरण बराबर न हों",
    "Tap Match to see where each jump comes from.": "'मिलान करो' पर टैप करो और देखो कि हर छलाँग कहाँ से आती है।",
    "Tap the Match key at the bottom.": "नीचे 'मिलान करो' बटन पर टैप करो।",
    "Now tap the empty stone to land the next jump.": "अब खाली पत्थर पर टैप करो और अगली छलाँग लगाओ।",
    "When steps are not equal, each new number is made from the ones before it.": "जब चरण बराबर न हों, तो हर नई संख्या पिछली संख्याओं से बनती है।",
    "You learned: when jumps differ, see where each one comes from.": "तुमने सीखा: छलाँगें अलग हों, तो देखो हर एक किससे बनी।",
    "The jumps go 6, then 12, then 24, so what lands after 48?": "छलाँगें 6, फिर 12, फिर 24 हैं, तो 48 के बाद क्या आएगा?",
    "Are the jumps all the same size?": "क्या सभी छलाँगें एक ही माप की हैं?",
    "Look at the stones behind the jump.": "छलाँग के पीछे के पत्थर देखो।",
    "Put each jump beside the stone it starts from.": "हर छलाँग को उसके शुरुआती पत्थर के पास रखो।",
    "Each number is added to itself, and 48 and 48 make 96.": "हर संख्या में वही संख्या जुड़ती है, और 48 और 48 मिलकर 96 बनते हैं।",
    "What fills the empty stone after 9, 18, 36, 72?": "9, 18, 36, 72 के बाद खाली पत्थर में क्या आएगा?",
    "Do the jumps grow or stay the same?": "क्या छलाँगें बढ़ती हैं या एक जैसी रहती हैं?",
    "Compare the first jump with the last one.": "पहली छलाँग की तुलना आख़िरी छलाँग से करो।",
    "Check each jump against the stone it leaves.": "हर छलाँग को उस पत्थर से मिलाओ जिसे वह छोड़ती है।",
    "The jump from 72 is 72, so 72 and 72 make 144.": "72 से छलाँग 72 की है, इसलिए 72 और 72 मिलकर 144 बनते हैं।",
    "Each new number is the sum of the two before it: 3, 4, 7, so what comes next?": "हर नई संख्या पिछली दो संख्याओं का जोड़ है: 3, 4, 7, तो आगे क्या आएगा?",
    "Which two stones does this jump come out of?": "यह छलाँग किन दो पत्थरों से बनती है?",
    "Look at the two stones just before the empty one.": "खाली पत्थर से ठीक पहले के दो पत्थर देखो।",
    "Add those two stones together.": "उन दोनों पत्थरों की संख्याएँ जोड़ो।",
    "11 comes from adding the 4 and the 7 before it.": "11, पिछले 4 और 7 को जोड़ने से आता है।",
  },
  gu: {
    "Step Track": "પગલાંનો રસ્તો",
    "A track of stones, with a jump between each pair. How far is every jump?": "પથ્થરોનો એક રસ્તો છે. દરેક બે પથ્થર વચ્ચે એક કૂદકો છે. દરેક કૂદકો કેટલો મોટો છે?",
    "Every jump labelled, and every series carried on by its own rule.": "દરેક કૂદકા પર માપ લખ્યું. દરેક ક્રમ પોતાના નિયમથી આગળ વધ્યો.",
    "Free play. Choose a start and a rule, and watch the track fill.": "મુક્ત રમત. શરૂઆત અને નિયમ પસંદ કરો, અને રસ્તો ભરાતો જુઓ.",
    "How far is every jump?": "દરેક કૂદકો કેટલો મોટો છે?",
    "Find jumps": "કૂદકા શોધો",
    "Compare": "સરખાવો",
    "Match": "મેળવો",
    "Show arcs": "ચાપ બતાવો",
    "Count jumps": "કૂદકા ગણો",
    "Pair them": "જોડી બનાવો",
    "even": "બેકી",
    "odd": "એકી",
    "start": "શરૂઆત",
    "step size": "પગલાનું માપ",
    "second start": "બીજી શરૂઆત",
    "next": "આગળનો",
    "end": "છેલ્લો",
    "add a": "એક પગલું",
    "step": "ઉમેરો",
    "take a step": "એક પગલું",
    "away": "બાદ કરો",
    "add it to": "તેને પોતામાં",
    "itself": "ઉમેરો",
    "add the two": "પાછલી બે",
    "before": "ઉમેરો",
    "K": "K",
    "L": "L",
    "M": "M",
    "N": "N",
    "The step between neighbours": "બાજુ-બાજુની સંખ્યાઓ વચ્ચેનું પગલું",
    "Tap Find jumps to measure each jump in this series, a list in order.": "આ ક્રમ (ગોઠવેલી યાદી) નો દરેક કૂદકો માપવા ‘કૂદકા શોધો’ પર ટૅપ કરો.",
    "Tap the Find jumps key at the bottom.": "નીચે ‘કૂદકા શોધો’ બટન પર ટૅપ કરો.",
    "Tap the empty stone to land the next term, the next number in the list.": "ખાલી પથ્થર પર ટૅપ કરો અને આગળનું પદ મેળવો, એટલે યાદીની આગળની સંખ્યા.",
    "Tap the empty stone on the track.": "રસ્તા પરના ખાલી પથ્થર પર ટૅપ કરો.",
    "Is every jump the same size?": "શું દરેક કૂદકાનું માપ એકસરખું છે?",
    "Use that same jump again from the last stone with a number.": "સંખ્યાવાળા છેલ્લા પથ્થરથી એ જ કૂદકો ફરી લગાવો.",
    "Check every pair for the same step, and a count down stops at zero.": "દરેક જોડીમાં એક જ પગલું તપાસો, અને ઊલટી ગણતરી શૂન્ય પર અટકે છે.",
    "You learned: find the step, check every jump, and stop at zero.": "તમે શીખ્યા: પગલું શોધો, દરેક કૂદકો તપાસો, અને શૂન્ય પર અટકો.",
    "Next stone?": "આગળનો પથ્થર?",
    "What number lands on the next stone after 7, 12, 17, 22?": "7, 12, 17, 22 પછી આગળના પથ્થર પર કઈ સંખ્યા આવશે?",
    "What is the jump from the first stone to the second?": "પહેલા પથ્થરથી બીજા પથ્થર સુધીનો કૂદકો કેટલો છે?",
    "Every jump is 5, so 27 lands next.": "દરેક કૂદકો 5 નો છે, તેથી આગળ 27 આવે છે.",
    "Which number fills the empty stone after 5, 11, 17, 23?": "5, 11, 17, 23 પછી ખાલી પથ્થરમાં કઈ સંખ્યા આવશે?",
    "Check the jump between the middle stones too.": "વચ્ચેના પથ્થરોનો કૂદકો પણ તપાસો.",
    "Every jump is 6, so 29 fills the stone.": "દરેક કૂદકો 6 નો છે, તેથી પથ્થરમાં 29 આવે છે.",
    "Where does it stop?": "તે ક્યાં અટકે છે?",
    "It counts down, so what goes on the next stone after 32 and on the end stone?": "આ ઊલટી ગણતરી છે, તો 32 પછી આગળના પથ્થર પર અને છેલ્લા પથ્થર પર શું આવશે?",
    "Start at the stone on the right and find the jump to its neighbour.": "જમણી બાજુના પથ્થરથી શરૂ કરો અને પાડોશી સુધીનો કૂદકો શોધો.",
    "Take that same jump away again and again, moving left.": "એ જ કૂદકો વારંવાર બાદ કરતાં ડાબી તરફ ચાલો.",
    "Stop at the bar: the end stone is where the count ends.": "પટ્ટી પર અટકો: છેલ્લા પથ્થર પર ગણતરી પૂરી થાય છે.",
    "Each jump takes 8 away, so 24 is next and the count ends at 0.": "દરેક કૂદકામાં 8 ઘટે છે, તેથી આગળ 24 છે અને ગણતરી 0 પર પૂરી થાય છે.",
    "Letters can step too": "અક્ષરો પણ પગલાંમાં આગળ વધે છે",
    "Tap Count jumps to hop along the letters.": "‘કૂદકા ગણો’ પર ટૅપ કરો અને અક્ષરો પર કૂદતા ચાલો.",
    "Tap the Count jumps key at the bottom.": "નીચે ‘કૂદકા ગણો’ બટન પર ટૅપ કરો.",
    "Now tap the empty stone to land the next letter.": "હવે ખાલી પથ્થર પર ટૅપ કરો અને આગળનો અક્ષર મેળવો.",
    "Letters step along the alphabet just as numbers step along counting.": "અક્ષરો વર્ણમાળામાં એમ જ ચાલે છે જેમ સંખ્યાઓ ગણતરીમાં.",
    "You learned: letters step along the alphabet, each with its place.": "તમે શીખ્યા: અક્ષરો વર્ણમાળામાં ચાલે છે, દરેકનું પોતાનું સ્થાન છે.",
    "Next place?": "આગળનું સ્થાન?",
    "B is at 2, D at 4, F at 6, H at 8, so which place comes next?": "B નું સ્થાન 2, D નું 4, F નું 6, H નું 8 છે, તો આગળ કયું સ્થાન આવશે?",
    "How many landings does one jump take?": "એક કૂદકામાં કેટલા પડાવ આવે છે?",
    "Count the landings from B to D.": "B થી D સુધીના પડાવ ગણો.",
    "Add that many places to the last place you can see.": "જેટલા પડાવ ગણ્યા તેટલા સ્થાન છેલ્લા દેખાતા સ્થાનમાં ઉમેરો.",
    "Each jump is 2 places, so J at 10 comes next.": "દરેક કૂદકો 2 સ્થાનનો છે, તેથી 10 પર J આવે છે.",
    "Next letter?": "આગળનો અક્ષર?",
    "Which letter follows J in A, D, G, J?": "A, D, G, J માં J પછી કયો અક્ષર આવશે?",
    "How many landings is it from A to D?": "A થી D સુધી કેટલા પડાવ છે?",
    "Count B, C, D: one jump is that many landings.": "B, C, D ગણો: એક કૂદકામાં એટલા જ પડાવ હોય છે.",
    "Walk the strip from J and count that many landings.": "J થી પટ્ટી પર ચાલો અને એટલા જ પડાવ ગણો.",
    "Each jump is 3 places, so M comes after J.": "દરેક કૂદકો 3 સ્થાનનો છે, તેથી J પછી M આવે છે.",
    "Y is at 25, V at 22, S at 19, so what is the next place in this series?": "Y નું સ્થાન 25, V નું 22, S નું 19 છે, તો આ ક્રમમાં આગળનું સ્થાન કયું છે?",
    "These letters go backwards, so think which way the place goes.": "આ અક્ષરો પાછળ જાય છે, તો વિચારો સ્થાન કઈ તરફ જશે.",
    "Count the landings from Y back to V.": "Y થી V સુધી પાછળના પડાવ ગણો.",
    "Take that many places away from the last place.": "એટલા સ્થાન છેલ્લા સ્થાનમાંથી બાદ કરો.",
    "Each jump goes back 3 places, so P at 16 is next.": "દરેક કૂદકો 3 સ્થાન પાછળ જાય છે, તેથી આગળ P છે, સ્થાન 16.",
    "Paired or one left over": "જોડી બની કે એક વધ્યો",
    "Tap Pair them to put the counters in twos.": "‘જોડી બનાવો’ પર ટૅપ કરો અને ગોટીઓને બે-બેમાં ગોઠવો.",
    "Tap the Pair them key at the bottom.": "નીચે ‘જોડી બનાવો’ બટન પર ટૅપ કરો.",
    "Now tap the counter that has no partner.": "હવે જે ગોટીને જોડીદાર નથી તેના પર ટૅપ કરો.",
    "Tap the counter standing on its own.": "એકલી ઊભેલી ગોટી પર ટૅપ કરો.",
    "Think in twos and see if anything gets left over.": "બે-બેમાં વિચારો અને જુઓ કે કંઈ વધે છે કે નહીં.",
    "Odd and even take turns, all the way along.": "એકી અને બેકી વારાફરતી આવે છે, છેક સુધી.",
    "No counter left over means even, and one left over means odd.": "કોઈ ગોટી ન વધે તો બેકી, અને એક વધે તો એકી.",
    "You learned: pairing with none over is even, one over is odd.": "તમે શીખ્યા: કંઈ ન વધે તો બેકી, એક વધે તો એકી.",
    "Even or odd?": "બેકી કે એકી?",
    "Pair up these 11 buttons, then say if they are even or odd.": "આ 11 બટનની જોડીઓ બનાવો, પછી કહો કે તે બેકી છે કે એકી.",
    "Count again at the end of the row and see if anyone is alone.": "હારના છેડે ફરી ગણો અને જુઓ કે કોઈ એકલું છે કે નહીં.",
    "Five pairs and one button left over, so 11 is odd.": "પાંચ જોડી અને એક બટન વધ્યું, તેથી 11 એકી છે.",
    "Pair the 14 socks: is 14 even or odd?": "14 મોજાંની જોડીઓ બનાવો: 14 બેકી છે કે એકી?",
    "Do not go by the first digit, but lay all 14 out.": "પહેલા અંક પરથી ન કહો, બધા 14 પાથરી દો.",
    "Seven pairs and none left over, so 14 is even.": "સાત જોડી બની અને કંઈ ન વધ્યું, તેથી 14 બેકી છે.",
    "Which number lands next after 31, 33, 35, 37?": "31, 33, 35, 37 પછી આગળ કઈ સંખ્યા આવશે?",
    "Look at the jump between the stones you can see.": "જે પથ્થરો દેખાય છે તેમની વચ્ચેનો કૂદકો જુઓ.",
    "Each stone has one counter left over, so add a whole pair.": "દરેક પથ્થર પર એક ગોટી વધી છે, તેથી આખી એક જોડી ઉમેરો.",
    "Every jump is 2 and every term is odd, so 39 is next.": "દરેક કૂદકો 2 નો છે અને દરેક પદ એકી છે, તેથી આગળ 39 છે.",
    "When the steps are not equal": "જ્યારે પગલાં સરખાં ન હોય",
    "Tap Match to see where each jump comes from.": "‘મેળવો’ પર ટૅપ કરો અને જુઓ કે દરેક કૂદકો ક્યાંથી આવે છે.",
    "Tap the Match key at the bottom.": "નીચે ‘મેળવો’ બટન પર ટૅપ કરો.",
    "Now tap the empty stone to land the next jump.": "હવે ખાલી પથ્થર પર ટૅપ કરો અને આગળનો કૂદકો લગાવો.",
    "When steps are not equal, each new number is made from the ones before it.": "જ્યારે પગલાં સરખાં ન હોય, ત્યારે દરેક નવી સંખ્યા પાછલી સંખ્યાઓમાંથી બને છે.",
    "You learned: when jumps differ, see where each one comes from.": "તમે શીખ્યા: કૂદકા અલગ હોય, તો જુઓ દરેક ક્યાંથી બન્યો.",
    "The jumps go 6, then 12, then 24, so what lands after 48?": "કૂદકા 6, પછી 12, પછી 24 છે, તો 48 પછી શું આવશે?",
    "Are the jumps all the same size?": "શું બધા કૂદકા એક જ માપના છે?",
    "Look at the stones behind the jump.": "કૂદકાની પાછળના પથ્થરો જુઓ.",
    "Put each jump beside the stone it starts from.": "દરેક કૂદકાને તેના શરૂઆતના પથ્થર પાસે મૂકો.",
    "Each number is added to itself, and 48 and 48 make 96.": "દરેક સંખ્યામાં તે જ સંખ્યા ઉમેરાય છે, અને 48 અને 48 મળીને 96 થાય છે.",
    "What fills the empty stone after 9, 18, 36, 72?": "9, 18, 36, 72 પછી ખાલી પથ્થરમાં શું આવશે?",
    "Do the jumps grow or stay the same?": "શું કૂદકા વધે છે કે એકસરખા રહે છે?",
    "Compare the first jump with the last one.": "પહેલા કૂદકાની સરખામણી છેલ્લા કૂદકા સાથે કરો.",
    "Check each jump against the stone it leaves.": "દરેક કૂદકાને તે જે પથ્થર છોડે છે તેની સાથે મેળવો.",
    "The jump from 72 is 72, so 72 and 72 make 144.": "72 પરથી કૂદકો 72 નો છે, તેથી 72 અને 72 મળીને 144 થાય છે.",
    "Each new number is the sum of the two before it: 3, 4, 7, so what comes next?": "દરેક નવી સંખ્યા પાછલી બે સંખ્યાઓનો સરવાળો છે: 3, 4, 7, તો આગળ શું આવશે?",
    "Which two stones does this jump come out of?": "આ કૂદકો કયા બે પથ્થરોથી બને છે?",
    "Look at the two stones just before the empty one.": "ખાલી પથ્થરની તરત પહેલાંના બે પથ્થર જુઓ.",
    "Add those two stones together.": "એ બંને પથ્થરોની સંખ્યાઓ ઉમેરો.",
    "11 comes from adding the 4 and the 7 before it.": "11, પાછલા 4 અને 7 ને ઉમેરવાથી આવે છે.",
  },
};

/* One entry per phase = one mount. steps = the warm-up (one click each, a hint each); the three questions follow.
   Plan teach lines (kept for the sidecar, replaced by the steps): P1 "How far is each jump? Check every one before you go on." ·
   P2 "How many letters does it jump? Jump the same again." · P3 "Put them in pairs. Is anyone left without a partner?" ·
   P4 "The jumps are not the same. Where does each jump come from?"
   The graded value of a "next three terms" question is its FIRST blank (as in v2): the step is the same all along, and the
   win fills every blank stone, one jump at a time. */
const PHASES = [
  {
    n: 1,
    concept: "The step between neighbours",
    conceptId: "M1.S2.T3.C10", objectiveIds: ["O3"],
    says: [],
    steps: [
      { say: "Tap Find jumps to measure each jump in this series, a list in order.", on: "jumps", hint: "Tap the Find jumps key at the bottom." },
      { say: "Tap the empty stone to land the next term, the next number in the list.", on: "stone", hint: "Tap the empty stone on the track." },
    ],
    ladder: ["Is every jump the same size?", "Use that same jump again from the last stone with a number."],
    closing: "Check every pair for the same step, and a count down stops at zero.",
    learned: "You learned: find the step, check every jump, and stop at zero.",
    traceback: "every arc is labelled again from the left, and the empty stones fill one jump at a time",
    items: [
      /* learn ML1: answer in the plan = 27, 32, 37 */
      { qid: "M1.S2.T3.C10:ML1", kind: "track", answer: 27, slip: 26, winMs: 2800,
        track: { series: [7, 12, 17, 22, 27, 32, 37], given: 4 },
        ask: "Next stone?", say: "What number lands on the next stone after 7, 12, 17, 22?",
        miss: "What is the jump from the first stone to the second?", win: "Every jump is 5, so 27 lands next." },
      /* practice 1: answer in the plan = 29, 35, 41 */
      { qid: "M1.S2.T3.C10:1", kind: "track", answer: 29, slip: 28, winMs: 2800,
        track: { series: [5, 11, 17, 23, 29, 35, 41], given: 4 },
        ask: "Next stone?", say: "Which number fills the empty stone after 5, 11, 17, 23?",
        miss: "Check the jump between the middle stones too.", win: "Every jump is 6, so 29 fills the stone." },
      /* practice 2: answer in the plan = 24, 16, 8 and 0. The step takes away 8 each time, and the count stops at zero */
      { qid: "M1.S2.T3.C10:2", kind: "track", answer: [24, 0], slip: "24|8", winMs: 2800,
        track: { series: [56, 48, 40, 32, 24, 16, 8, 0], given: 4, down: true, ansAt: 7 },
        parts: [{ label: "next" }, { label: "end" }],
        ask: "Where does it stop?", say: "It counts down, so what goes on the next stone after 32 and on the end stone?",
        miss: "Start at the stone on the right and find the jump to its neighbour.",
        ladder: ["Take that same jump away again and again, moving left.", "Stop at the bar: the end stone is where the count ends."],
        win: "Each jump takes 8 away, so 24 is next and the count ends at 0." },
    ],
  },
  {
    n: 2,
    concept: "Letters can step too",
    conceptId: "M1.S2.T3.C11", objectiveIds: ["O3"],
    says: [],
    steps: [
      { say: "Tap Count jumps to hop along the letters.", on: "count", hint: "Tap the Count jumps key at the bottom." },
      { say: "Now tap the empty stone to land the next letter.", on: "stone", hint: "Tap the empty stone on the track." },
    ],
    ladder: [],
    closing: "Letters step along the alphabet just as numbers step along counting.",
    learned: "You learned: letters step along the alphabet, each with its place.",
    traceback: "the hand counts landing by landing along the alphabet and the letter lights with its place written under it",
    items: [
      /* learn ML2: answer in the plan = J10, L12, N14 */
      { qid: "M1.S2.T3.C11:ML2", kind: "letter", answer: 10, slip: 9, winMs: 2800,
        letters: { seq: ["B", "D", "F", "H", "J", "L", "N"], given: 4 },
        ask: "Next place?", say: "B is at 2, D at 4, F at 6, H at 8, so which place comes next?",
        miss: "How many landings does one jump take?",
        ladder: ["Count the landings from B to D.", "Add that many places to the last place you can see."], win: "Each jump is 2 places, so J at 10 comes next." },
      /* practice 3: answer in the plan = M and P, because each letter is three places on from the one before */
      { qid: "M1.S2.T3.C11:3", kind: "letter", answer: "M", slip: "L", winMs: 2800,
        choices: [{ id: "K", label: "K" }, { id: "L", label: "L" }, { id: "M", label: "M" }, { id: "N", label: "N" }],
        letters: { seq: ["A", "D", "G", "J", "M", "P"], given: 4, hidePlace: true },
        ask: "Next letter?", say: "Which letter follows J in A, D, G, J?",
        miss: "How many landings is it from A to D?",
        ladder: ["Count B, C, D: one jump is that many landings.", "Walk the strip from J and count that many landings."], win: "Each jump is 3 places, so M comes after J." },
      /* practice 4: answer in the plan = P16, M13, J10, because each letter goes three places back and its number is its place in the alphabet */
      { qid: "M1.S2.T3.C11:4", kind: "letter", answer: 16, slip: 17, winMs: 2800,
        letters: { seq: ["Y", "V", "S", "P", "M", "J"], given: 3, down: true },
        ask: "Next place?", say: "Y is at 25, V at 22, S at 19, so what is the next place in this series?",
        miss: "These letters go backwards, so think which way the place goes.",
        ladder: ["Count the landings from Y back to V.", "Take that many places away from the last place."], win: "Each jump goes back 3 places, so P at 16 is next." },
    ],
  },
  {
    n: 3,
    concept: "Paired or one left over",
    conceptId: "M1.S2.T3.C12", objectiveIds: ["O4"],
    says: [],
    steps: [
      { say: "Tap Pair them to put the counters in twos.", on: "pair", hint: "Tap the Pair them key at the bottom." },
      { say: "Now tap the counter that has no partner.", on: "leftover", hint: "Tap the counter standing on its own." },
    ],
    ladder: ["Think in twos and see if anything gets left over.", "Odd and even take turns, all the way along."],
    closing: "No counter left over means even, and one left over means odd.",
    learned: "You learned: pairing with none over is even, one over is odd.",
    traceback: "the counters are set out two by two again, any counter left over stands apart, and the card turns to the right word",
    items: [
      /* learn ML3: answer in the plan = Five pairs with one button left over, so eleven is odd */
      { qid: "M1.S2.T3.C12:ML3", kind: "pair", answer: "odd", slip: "even", winMs: 2800, heap: 11, thing: "button",
        choices: [{ id: "even", label: "even" }, { id: "odd", label: "odd" }],
        ask: "Even or odd?", say: "Pair up these 11 buttons, then say if they are even or odd.",
        miss: "Count again at the end of the row and see if anyone is alone.", win: "Five pairs and one button left over, so 11 is odd." },
      /* practice 5: answer in the plan = Even, because fourteen socks make seven pairs with none left over */
      { qid: "M1.S2.T3.C12:5", kind: "pair", answer: "even", slip: "odd", winMs: 2800, heap: 14, thing: "sock",
        choices: [{ id: "even", label: "even" }, { id: "odd", label: "odd" }],
        ask: "Even or odd?", say: "Pair the 14 socks: is 14 even or odd?",
        miss: "Do not go by the first digit, but lay all 14 out.", win: "Seven pairs and none left over, so 14 is even." },
      /* practice 6: answer in the plan = 39, 41 and 43. Each is odd, because adding two adds one more pair and the one left over stays */
      { qid: "M1.S2.T3.C12:6", kind: "track", answer: 39, slip: 38, winMs: 2800,
        track: { series: [31, 33, 35, 37, 39, 41, 43], given: 4, leftover: true },
        ask: "Next stone?", say: "Which number lands next after 31, 33, 35, 37?",
        miss: "Look at the jump between the stones you can see.", win: "Every jump is 2 and every term is odd, so 39 is next.",
        ladder: ["Is every jump the same size?", "Each stone has one counter left over, so add a whole pair."] },
    ],
  },
  {
    n: 4,
    concept: "When the steps are not equal",
    conceptId: "M1.S2.T3.C13", objectiveIds: ["O4"],
    says: [],
    steps: [
      { say: "Tap Match to see where each jump comes from.", on: "match", hint: "Tap the Match key at the bottom." },
      { say: "Now tap the empty stone to land the next jump.", on: "stone", hint: "Tap the empty stone on the track." },
    ],
    ladder: [],
    closing: "When steps are not equal, each new number is made from the ones before it.",
    learned: "You learned: when jumps differ, see where each one comes from.",
    traceback: "each jump is laid as a bar beside the stone it starts from, and the next stone fills",
    items: [
      /* learn ML4: answer in the plan = Each step is the number already reached, so 96 comes next */
      { qid: "M1.S2.T3.C13:ML4", kind: "track", answer: 96, slip: 72, winMs: 2800,
        track: { series: [6, 12, 24, 48, 96], given: 4, arcsGiven: true },
        ask: "Next stone?", say: "The jumps go 6, then 12, then 24, so what lands after 48?",
        miss: "Are the jumps all the same size?",
        ladder: ["Look at the stones behind the jump.", "Put each jump beside the stone it starts from."],
        win: "Each number is added to itself, and 48 and 48 make 96." },
      /* practice 7: answer in the plan = 144 and 288. The steps 9, 18 and 36 are not equal. Each step is the number already reached */
      { qid: "M1.S2.T3.C13:7", kind: "track", answer: 144, slip: 108, winMs: 2800,
        track: { series: [9, 18, 36, 72, 144, 288], given: 4, arcsGiven: true },
        ask: "Next stone?", say: "What fills the empty stone after 9, 18, 36, 72?",
        miss: "Do the jumps grow or stay the same?",
        ladder: ["Compare the first jump with the last one.", "Check each jump against the stone it leaves."],
        win: "The jump from 72 is 72, so 72 and 72 make 144." },
      /* practice 8: answer in the plan = 7, 11, 18 and 29, because 3 + 4 = 7, 4 + 7 = 11, 7 + 11 = 18 and 11 + 18 = 29 */
      { qid: "M1.S2.T3.C13:8", kind: "maker", answer: 11, slip: 10, winMs: 2800,
        track: { series: [3, 4, 7, 11, 18, 29], given: 3, two: true },
        ask: "Next stone?", say: "Each new number is the sum of the two before it: 3, 4, 7, so what comes next?",
        miss: "Which two stones does this jump come out of?",
        ladder: ["Look at the two stones just before the empty one.", "Add those two stones together."], win: "11 comes from adding the 4 and the 7 before it." },
    ],
  },
];

/* the warm-up of each phase: a board that is none of the phase's answers */
const WARM: any[] = [
  { kind: "track", track: { series: [2, 6, 10, 14, 18], given: 4 } },
  { kind: "letter", letters: { seq: ["C", "G", "K", "O", "S"], given: 4 } },
  { kind: "pair", heap: 9, thing: "button" },
  { kind: "track", track: { series: [4, 5, 7, 10, 14], given: 4, arcsGiven: true } },
];

const MODEL = {
  stone: ST, strip: STRIP, tray: TRAY, rules: RULES,
  free: { stones: 6, start: 3, second: 2, min: 1, max: 20 },
};

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

const judge = (item: any, v: any) => {
  if (item.parts) return judgeSlotParts(item, v);
  if (typeof item.answer === "number") return leadNumber(v) === item.answer;
  return String(v).trim().toLowerCase() === String(item.answer).trim().toLowerCase();
};
/* oracle: every answer re-derived by a second route (carrying the step on, counting down, reading the alphabet as a string,
   pairing by remainder) that shares no code with judge or Work */
const oracle = () => {
  const carry = (a: number, b: number) => b + (b - a);
  const at = (L: string) => ALPHA.indexOf(L) + 1;
  let low = 32; low = low - 8; const first = low; while (low > 0) low = low - 8;
  const rows: any[] = [
    [1, 0, carry(17, 22)], [1, 1, carry(17, 23)], [1, 2, [first, low]],
    [2, 0, at("H") + (at("H") - at("F"))], [2, 1, ALPHA.charAt(at("J") - 1 + (at("J") - at("G")))], [2, 2, at("S") - (at("V") - at("S"))],
    [3, 0, 11 % 2 === 0 ? "even" : "odd"], [3, 1, 14 % 2 === 0 ? "even" : "odd"], [3, 2, carry(35, 37)],
    [4, 0, 48 + 48], [4, 1, 72 + 72], [4, 2, 4 + 7],
  ];
  const same = rows.every((r: any) => String(PHASES[r[0] - 1].items[r[1]].answer) === String(r[2]));
  /* and the picture's own series agrees with the answer table */
  const drawn = PHASES.every((p: any) => p.items.every((it: any) => {
    if (it.track) { const t = it.track, hit = t.series[t.ansAt != null ? t.ansAt : t.given]; return Array.isArray(it.answer) ? String(it.answer) === String([t.series[t.given], hit]) : hit === it.answer; }
    if (it.letters) { const c = it.letters.seq[it.letters.given]; return typeof it.answer === "string" ? c === it.answer : ALPHA.indexOf(c) + 1 === it.answer; }
    return true;
  }));
  return same && drawn;
};
const nearMiss = (item: any) => (item.slip !== undefined ? item.slip : typeof item.answer === "number" ? item.answer + 1 : "~");
const answerForms = (item: any) => (item.choices ? []
  : item.parts ? item.answer.filter((x: number) => x >= 10).flatMap((x: number) => [String(x), indian(x), words(x)])
  : typeof item.answer === "number" ? [String(item.answer), indian(item.answer), words(item.answer)]
  : [String(item.answer)]);
const agentKey = (item: any) => item.answer;

const HOOK: any = {};
const solve = (item: any, T: any) => (T.state().stage === "demo" ? HOOK.demo && HOOK.demo() : T.submit(item.answer));
const answer = (item: any, v: any) => (item.pad === "enter" && HOOK.set ? HOOK.set(v) : undefined);
const check = () => (HOOK.check ? HOOK.check() : undefined);

/* ── the working area ──────────────────────────────────────────────────────────────────────── */

const stMinus = (d: number) => (d < 0 ? "−" + Math.abs(d) : "+" + d);
/* the stones grow when the track is short (the last bench reads them): scale 1 for letters and free play, up to 1.4 */
const stGeo = (len: number, flat: boolean, ox: number, lift = 0) => {
  const sc = flat ? 1 : Math.max(1, Math.min(1.4, 852 / (len * 108 - 12))), w = Math.round(96 * sc), pitch = Math.round(108 * sc);
  return { sc, w, h: w, pitch, top: 214 - lift - Math.round(60 * (sc - 1)), x0: ox + Math.round((900 - (len * pitch - (pitch - w))) / 2), big: sc >= 1.3 };
};
/* a count down is laid from the right, so it runs towards its last stone at the left end */
const stCx = (i: number, len: number, down: boolean, geo: any) => geo.x0 + (down ? len - 1 - i : i) * geo.pitch + geo.w / 2;
/* an arc leaves the top of one stone and lands on the top of another; `rise` is how high its middle stands above them */
const stArc = (x1: number, x2: number, top: number, rise: number) => { const yc = top - rise / 0.75; return `M ${x1} ${top} C ${x1} ${yc}, ${x2} ${yc}, ${x2} ${top}`; };
const stCell = (c: number, ox: number) => ox + STRIP.x + c * STRIP.pitch + STRIP.w / 2;

/* the board an item (or a warm-up) draws */
const stBoard = (it: any) => {
  if (it.track) { const t = it.track; return { kind: "chain", terms: t.series, g: t.given, down: !!t.down, letter: false, two: !!t.two, arcsGiven: !!t.arcsGiven, bead: !!t.leftover, ansAt: t.ansAt != null ? t.ansAt : t.given }; }
  if (it.letters) { const l = it.letters; return { kind: "chain", terms: l.seq.map((c: string) => ALPHA.indexOf(c) + 1), g: l.given, down: !!l.down, letter: true, two: false, arcsGiven: false, hidePlace: !!l.hidePlace, ansAt: l.given }; }
  return { kind: "pair", heap: it.heap, thing: it.thing || "button" };
};
/* free play: a start and a rule make a series of your own */
const stFree = (s: number, rule: string, b: number) => {
  const out = [s];
  if (rule === "step") { for (let k = 1; k < 6; k++) out.push(out[k - 1] + b); }
  else if (rule === "away") { for (let k = 1; k < 6; k++) { const v = out[k - 1] - b; if (v < 0) break; out.push(v); } }
  else if (rule === "self") { for (let k = 1; k < 6; k++) out.push(out[k - 1] * 2); }
  else if (rule === "two") { out.push(b); for (let k = 2; k < 6; k++) out.push(out[k - 1] + out[k - 2]); }   /* two starts, then each term adds the two before */
  return out;
};
const stFresh = (qk: string) => ({ qk, labN: 0, fillN: 0, cmp: 0, matchN: 0, arcsN: 0, pairN: 0, cardUp: false, hops: [] as any[], demo: false, lone: 0, ghost: null as any,
  free: { start: 3, rule: "", b: 2 } });

/* the pairing tray: where counter k lies in the heap, and where it goes when it is paired */
const stHeapPt = (k: number, n: number, ox: number) => {
  const cols = Math.min(7, Math.ceil(n / 2)), rows = Math.ceil(n / cols);
  const s = [7, 5, 3, 1].find((q) => q === 1 || n % q !== 0) as number;
  const j = (k * s) % n, col = j % cols, row = Math.floor(j / cols);
  const x0 = ox + TRAY.x + TRAY.w / 2 - (cols * 92) / 2 + 46, y0 = 196 - ((rows - 1) * 80) / 2;
  return { x: x0 + col * 92 + Math.sin(k * 12.9898) * 12, y: y0 + row * 80 + Math.cos(k * 78.233) * 6 };
};
const stPairPitch = (P: number) => Math.min(86, 740 / (P + 1));
const stPairPt = (k: number, ox: number, P: number) => ({ x: ox + TRAY.x + 64 + Math.floor(k / 2) * stPairPitch(P), y: k % 2 === 0 ? 148 : 238 });
const stAlonePt = (ox: number, P: number) => ({ x: ox + TRAY.x + 64 + P * stPairPitch(P) + 34, y: 193 });

function Work({ phase, n, item, index, stage, wrong, typed, api, MODEL, step, stepOn, box, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();
  const free = stage === "free";
  const warm = stage === "teach" || stage === "demo";
  const it: any = free ? {} : warm ? WARM[n - 1] : item;
  const qk = free ? "free" : warm ? "w" + n : n + ":" + index;
  const ox = Math.max(0, Math.round(((box ? box.w : 900) - 900) / 2));

  const [raw, setRaw] = useState(() => stFresh(qk));
  const S: any = raw.qk === qk ? raw : stFresh(qk);
  const upd = (fn: (b: any) => any) => setRaw((p: any) => { const b = p.qk === qk ? p : stFresh(qk); return { ...b, ...fn(b) }; });
  const busy = useRef(false);
  const lastKey = useRef(0);
  const tbRun = useRef(false);

  /* the board: a chain of stones (numbers or letters), or the pairing tray */
  const fr = S.free;
  const B: any = free
    ? (() => { const terms = fr.rule ? stFree(fr.start, fr.rule, fr.b) : [fr.start, 0, 0, 0, 0, 0];
        return { kind: "chain", terms, g: fr.rule === "two" ? 2 : 1, down: false, letter: false, two: fr.rule === "two", arcsGiven: false, ansAt: 1 }; })()
    : stBoard(it);
  const chain = B.kind === "chain";
  const terms: number[] = chain ? B.terms : [];
  const L = terms.length, g = chain ? B.g : 0, down = chain && B.down, two = chain && B.two, arcsGiven = chain && B.arcsGiven;
  const heap = chain ? 0 : B.heap, P = Math.floor(heap / 2), odd = heap % 2, pairTot = P + odd;
  const shown = (i: number) => i < g || i - g < S.fillN;
  const geo = stGeo(L, free || (chain && B.letter), ox, free ? 44 : 0);
  const cx = (i: number) => stCx(i, L, down, geo);
  const labelPt = (i: number) => ({ x: (cx(i) + cx(i + 1)) / 2, y: geo.top - 84 });
  const stoneMid = (i: number) => ({ x: cx(i), y: geo.top + geo.h / 2 });

  /* ── the acts: what is done, which key is next, what a tap on it performs ── */
  const doneOf = (a: string) => a === "jumps" ? S.labN >= g - 1 : a === "compare" ? !!S.cmp : a === "match" ? S.matchN >= 2 * (g - 1) : a === "arcs" ? !!S.arcsN
    : a === "count" ? S.labN >= g - 1 : a === "pair" ? S.pairN >= pairTot : a === "stone" ? S.fillN >= 1 : a === "leftover" ? S.cardUp : false;
  const acts: string[] = free ? [] : !chain ? ["pair"] : B.letter ? ["count"] : two ? ["arcs"] : arcsGiven ? ["match"] : warm ? ["jumps"] : ["jumps", "compare"];
  const curAct = acts.find((a) => !doneOf(a)) || "";

  const actFor = (on: string): any => {
    if (on === "jumps") return { tool: "hand", moves: "tap", at: Array.from({ length: g - 1 }, (_, i) => labelPt(i)), onPoint: (k: number) => upd(() => ({ labN: k + 1 })) };
    if (on === "compare") return { tool: "hand", moves: "tap", at: [labelPt(0), labelPt(g - 2)], onPoint: (k: number) => { if (k === 1) upd(() => ({ cmp: 1 })); } };
    if (on === "match") {
      const at: any[] = [];
      for (let i = 0; i < g - 1; i++) { at.push(stoneMid(i)); at.push(labelPt(i)); }
      return { tool: "hand", moves: "tap", at, onPoint: (k: number) => upd(() => ({ matchN: k + 1 })) };
    }
    if (on === "arcs") return { tool: "hand", moves: "tap", at: [stoneMid(g - 2), stoneMid(g - 1)], onPoint: (k: number) => { if (k === 1) upd(() => ({ arcsN: 1 })); } };
    if (on === "stone") return { tool: "hand", moves: "tap", at: [stoneMid(g)], onPoint: () => upd(() => ({ fillN: 1 })) };
    if (on === "count") {
      const at: any[] = [], meta: any[] = [];
      for (let j = 0; j < g - 1; j++) {
        const a = terms[j], b = terms[j + 1], dir = b > a ? 1 : -1, len = Math.abs(b - a);
        for (let m = 1; m <= len; m++) { const c = a - 1 + dir * m; at.push({ x: stCell(c, ox), y: STRIP.y + 30 }); meta.push({ cell: c, n: m, j, last: m === len }); }
      }
      return { tool: "hand", moves: "tap", at, onPoint: (k: number) => upd((b: any) => ({ hops: [...b.hops, { cell: meta[k].cell, n: meta[k].n }], labN: meta[k].last ? meta[k].j + 1 : b.labN })) };
    }
    if (on === "pair") {
      const at = Array.from({ length: pairTot }, (_, p) => (p < P ? { x: stPairPt(2 * p, ox, P).x, y: 193 } : stAlonePt(ox, P)));
      return { tool: "hand", moves: "tap", at, onPoint: (k: number) => upd(() => ({ pairN: k + 1 })) };
    }
    if (on === "leftover") return { tool: "hand", moves: "tap", at: [stAlonePt(ox, P)], onPoint: () => upd(() => ({ cardUp: true })) };
    return null;
  };
  /* one act: the hand does it on screen (api.act), the picture reacts, then the step moves on (api.did) */
  const perform = async (on: string) => {
    if (busy.current) return;
    if (stage === "demo" && stepOn && on !== stepOn) { api.did(on); return; }
    if (on === "leftover" && !warm) { api.sfx.tick(); upd(() => ({ lone: 1 })); api.did(on); return; }
    if (doneOf(on)) { api.did(on); return; }
    const o = actFor(on);
    if (!o) { api.did(on); return; }
    busy.current = true;
    const ok = await api.act(o);
    busy.current = false;
    if (!ok) return;
    api.sfx.settle();
    api.did(on);
  };
  const pressKey = (on: string) => {
    const t = Date.now();
    if (t - lastKey.current < 400) return;
    lastKey.current = t;
    perform(on);
  };
  api.onEnter(stage === "demo" && stepOn ? () => perform(stepOn) : null);

  /* free play: a start, a rule, and the track fills under the hand */
  const setFree = (patch: any) => upd(() => ({ free: { ...fr, ...patch, rule: "" }, fillN: 0 }));
  const runRule = async (id: string) => {
    if (busy.current) return;
    const series = stFree(fr.start, id, fr.b), g2 = id === "two" ? 2 : 1;
    upd(() => ({ free: { ...fr, rule: id }, fillN: 0 }));
    busy.current = true;
    const ok = await api.act({ tool: "hand", moves: "tap", at: series.slice(g2).map((_: number, i: number) => ({ x: stCx(i + g2, series.length, false, stGeo(series.length, true, ox, 44)), y: stGeo(series.length, true, ox, 44).top + ST.h / 2 })),
      onPoint: (k: number) => upd(() => ({ fillN: k + 1 })) });
    busy.current = false;
    if (ok) api.sfx.settle();
  };

  /* ── the traceback (a miss) and the win: the same steps, the miss slower and with the notice colour ── */
  const stepsOf = (tbk: boolean) => {
    const out: any[] = [];
    out.push([tbk ? 250 : 150, () => upd((b: any) => ({ demo: tbk, cardUp: false, pairN: tbk ? 0 : b.pairN, hops: tbk ? [] : b.hops }))]);
    if (chain) {
      if (B.letter) {
        if (tbk) {
          /* count the first jump landing by landing, then the same count from the last letter given */
          const walk = (from: number, to: number, j: number) => { const dir = to > from ? 1 : -1, len = Math.abs(to - from);
            for (let m = 1; m <= len; m++) out.push([420, () => { api.sfx.tick(); upd((b: any) => ({ hops: [...b.hops, { cell: from - 1 + dir * m, n: m }] })); }]);
            if (j >= 0) out.push([500, () => upd(() => ({ labN: j + 1 }))]); };
          walk(terms[0], terms[1], 0);
          out.push([700, () => upd(() => ({ hops: [], labN: g - 1 }))]);
          walk(terms[g - 1], terms[g], -1);
        } else out.push([150, () => upd(() => ({ labN: g - 1 }))]);
      } else if (arcsGiven) {
        if (tbk) {
          out.push([1100, () => upd(() => ({ cmp: 1 }))]);
          out.push([100, () => upd(() => ({ cmp: 0 }))]);
          for (let k = 1; k <= 2 * (g - 1); k++) out.push([300, () => upd(() => ({ matchN: k }))]);
        } else out.push([150, () => upd(() => ({ matchN: 2 * (g - 1) }))]);
      } else if (!two) {
        if (tbk) for (let k = 1; k <= g - 1; k++) out.push([380, () => upd(() => ({ labN: k }))]);
        else out.push([150, () => upd(() => ({ labN: g - 1 }))]);
      } else {
        const wv = tbk && wrong ? leadNumber(wrong.value) : null;
        if (wv !== null && wv === it.slip) out.push([1700, () => upd(() => ({ ghost: wv }))], [300, () => upd(() => ({ ghost: null }))]);
        out.push([500, () => upd(() => ({ arcsN: 1 }))]);
      }
      for (let j = 1; j <= L - g; j++) out.push([tbk ? 450 : 330, () => { api.sfx.tick(); upd(() => ({ fillN: j })); }]);
    } else {
      for (let p = 1; p <= pairTot; p++) out.push([tbk ? 430 : 300, () => { api.sfx.tick(); upd((b: any) => ({ pairN: Math.max(b.pairN, p) })); }]);
      out.push([500, () => upd(() => ({ cardUp: true }))]);
    }
    return out;
  };
  const won = !free && !warm && (stage === "win" || stage === "idle");
  useEffect(() => {
    if (!won) return;
    if (it && it.win) api.say(it.win);
    tl.run(stepsOf(false));
    return () => tl.stop();
  }, [won, qk]);
  useEffect(() => {
    if (!wrong || stage !== "ask" || free) return;
    tbRun.current = true;
    api.lock(true);
    tl.run(stepsOf(true), () => { tbRun.current = false; api.lock(false); });
    return () => { tl.stop(); if (tbRun.current) { tbRun.current = false; api.lock(false); } };
  }, [wrong]);
  /* a new question stops whatever the old one was still drawing */
  useEffect(() => () => { tl.stop(); if (tbRun.current) { tbRun.current = false; api.lock(false); } }, [qk]);

  /* what the host and the agent read back (toolApi.getState): only what is on the board, never the blank stones */
  const visible = chain ? terms.filter((_: number, i: number) => shown(i)) : [];
  api.share({
    terms: visible,
    arcs: chain ? visible.slice(1).map((v: number, i: number) => v - visible[i]).slice(0, Math.max(0, S.labN)) : [],
    letterTrack: chain && B.letter ? visible.map((v: number) => ALPHA.charAt(v - 1)) : [],
    paired: S.pairN, leftOver: !chain && odd && S.pairN >= pairTot ? 1 : 0,
    start: free ? fr.start : null, second: free ? fr.b : null, rule: free ? fr.rule : "",
    complete: stage === "idle",
  });

  /* ── drawing ── */
  const kcx = ox + 450, keyX = kcx - KEYROW.w / 2;
  const vInk = shade(CONTENT.pointer, 0.25), bInk = shade(CONTENT.hundred, 0.3), gInk = shade(CONTENT.one, 0.32), pInk = shade(CONTENT.bead, 0.3);

  const actKey = () => {
    if (!curAct) return null;
    return (
      <g key={"akey" + curAct}>
        <Key id={curAct} label={tx(ACT_LABEL[curAct])} x={keyX} y={KEYROW.y} w={KEYROW.w} h={KEYROW.h} C={C} tone="key" onClick={() => pressKey(curAct)}>
          <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={toneInk("key", C.ink)}>{tx(ACT_LABEL[curAct])}</text>
        </Key>
        {stepOn === curAct && <Invite x={kcx} y={KEYROW.y + KEYROW.h / 2} w={KEYROW.w} h={KEYROW.h} rx={RAD.key} C={C} />}
      </g>
    );
  };

  /* the bars under the track: two jumps side by side (Compare), or a stone beside the jump that leaves it (Match, the win) */
  const bars = () => {
    const rows: any[] = [];
    if (S.cmp) {
      const a = terms[1] - terms[0], b = terms[g - 1] - terms[g - 2];
      rows.push({ v: Math.abs(a), label: stMinus(a), col: CONTENT.pointer, ink: vInk }, { v: Math.abs(b), label: stMinus(b), col: CONTENT.pointer, ink: vInk });
    } else if (arcsGiven && (S.fillN >= 1 || S.matchN >= 2)) {
      const i = S.fillN >= 1 ? g - 1 : Math.min(g - 2, Math.floor((S.matchN - 1) / 2));
      rows.push({ v: Math.abs(terms[i]), label: String(terms[i]), col: CONTENT.hundred, ink: bInk }, { v: Math.abs(terms[i + 1] - terms[i]), label: stMinus(terms[i + 1] - terms[i]), col: CONTENT.pointer, ink: vInk });
    }
    if (!rows.length) return null;
    const bx = ox + 200, sc = 440 / Math.max(1, ...rows.map((r: any) => r.v)), y0 = geo.top + geo.h + 24;
    return (
      <g data-role="bars">
        {rows.map((r: any, k: number) => (
          <g key={"bar" + k}>
            <text x={bx - 16} y={y0 + 24 + k * 46} textAnchor="end" fontSize={T.label} fontWeight={700} fill={r.ink}>{r.label}</text>
            <rect x={bx} y={y0 + k * 46} width={Math.max(12, r.v * sc)} height={32} rx={8} fill={tint(r.col, 0.2)} stroke={shade(r.col, 0.25)} strokeWidth={3} />
            {r.v <= 40 && Array.from({ length: r.v - 1 }).map((_, u) => <line key={u} x1={bx + (u + 1) * sc} y1={y0 + 4 + k * 46} x2={bx + (u + 1) * sc} y2={y0 + 28 + k * 46} stroke="#FFFFFF" strokeWidth={2} />)}
          </g>
        ))}
      </g>
    );
  };

  const chainView = () => {
    const arcs: any[] = [];
    for (let i = 0; i < L - 1; i++) {
      if (two) continue;
      const lab = i + 1 < g ? (arcsGiven || i < S.labN) : i + 1 - g < S.fillN;
      arcs.push({ a: i, b: i + 1, rise: 84, label: lab ? stMinus(terms[i + 1] - terms[i]) : null });
    }
    if (two) for (let i = 2; i < L; i++) {
      if (i < g || i - g < S.fillN || (i === g && S.arcsN > 0)) { arcs.push({ a: i - 2, b: i, rise: 135, label: null }); arcs.push({ a: i - 1, b: i, rise: 84, label: null }); }
    }
    const dfsOf = (v: any) => geo.big ? (String(v).length > 2 ? T.xl : T.display) : (String(v).length > 2 ? T.speech : T.xl);
    const ringStone = (i: number) => arcsGiven && S.matchN > 0 && i < g - 1 && S.matchN > 2 * i;
    const ringLabel = (i: number) => arcsGiven && S.matchN > 0 && i < g - 1 && S.matchN > 2 * i + 1;
    return (
      <g data-role="track">
        {arcs.map((a: any, k: number) => {
          const x1 = cx(a.a), x2 = cx(a.b), lit = a.label != null || a.label === "", mx = (x1 + x2) / 2, my = geo.top - a.rise;
          return (
            <g key={"arc" + k} data-role="arc">
              <path d={stArc(x1, x2, geo.top, a.rise)} fill="none" stroke={a.label != null || two ? CONTENT.pointer : tint(CONTENT.pointer, 0.45)} strokeWidth={a.label != null || two ? 6 : 4} strokeDasharray={a.label != null || two ? undefined : "12 10"} strokeLinecap="round" />
              <polygon points={`${x2 - 10},${geo.top - 22} ${x2 + 10},${geo.top - 22} ${x2},${geo.top - 4}`} fill={a.label != null || two ? CONTENT.pointer : tint(CONTENT.pointer, 0.45)} />
              {a.label != null && (
                <g>
                  <rect x={mx - 44} y={my - 24} width={88} height={48} rx={24} fill="#FFFFFF" stroke={ringLabel(a.a) ? CONTENT.bead : CONTENT.pointer} strokeWidth={ringLabel(a.a) ? 8 : 4} />
                  <text x={mx} y={my + 11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={vInk}>{a.label}</text>
                </g>
              )}
            </g>
          );
        })}
        {down && terms[L - 1] === 0 && <rect x={cx(L - 1) - geo.w / 2 - 22} y={geo.top - 8} width={10} height={geo.h + 16} rx={5} fill={C.ink} />}
        {terms.map((v: number, i: number) => {
          const st = i < g ? "given" : i - g < S.fillN ? "filled" : "blank";
          const col = st === "given" ? CONTENT.hundred : CONTENT.one, x = cx(i) - geo.w / 2, dfs = geo.big ? (String(v).length > 2 ? T.xl : T.display) : (String(v).length > 2 ? T.speech : T.xl);
          const lit = S.demo && down && v === 0 && st === "filled";
          const txt = st === "given" ? bInk : gInk, placeOn = !B.hidePlace || S.fillN >= 1 || S.demo;
          return (
            <g key={"st" + i} data-role="stone">
              <rect x={x} y={geo.top} width={geo.w} height={geo.h} rx={Math.round(24 * geo.sc)} fill={st === "blank" ? "#FFFFFF" : tint(col, 0.82)} stroke={st === "blank" ? C.ink : col}
                strokeWidth={st === "blank" ? 3 : 5} strokeDasharray={st === "blank" ? "10 8" : undefined} />
              <Skin name="stone" x={x} y={geo.top} w={geo.w} h={geo.h} fit="stretch" />
              {/* over the picture: a given or filled stone is told by its label, outline and wash, a blank one is an empty outlined box */}
              <rect x={x} y={geo.top} width={geo.w} height={geo.h} rx={Math.round(24 * geo.sc)} fill={st === "blank" ? "#FFFDF7" : col} fillOpacity={st === "blank" ? 0.5 : 0.3}
                stroke={st === "blank" ? C.ink : col} strokeWidth={st === "blank" ? 3 : 5} strokeDasharray={st === "blank" ? "10 8" : undefined} />
              {(lit || ringStone(i)) && <rect x={x - 6} y={geo.top - 6} width={geo.w + 12} height={geo.h + 12} rx={Math.round(24 * geo.sc) + 4} fill="none" stroke={CONTENT.bead} strokeWidth={6} />}
              {st !== "blank" && !B.letter && <text x={x + geo.w / 2} y={geo.top + geo.h / 2 + Math.round(dfs * 0.35)} textAnchor="middle" fontSize={dfs} fontWeight={700} fill={txt} stroke="#FFFFFF" strokeWidth={8} strokeLinejoin="round" paintOrder="stroke">{v}</text>}
              {st !== "blank" && B.letter && (
                <g>
                  <text x={x + geo.w / 2} y={geo.top + (placeOn ? 58 : 68)} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={txt} stroke="#FFFFFF" strokeWidth={8} strokeLinejoin="round" paintOrder="stroke">{ALPHA.charAt(v - 1)}</text>
                  {placeOn && <text x={x + geo.w / 2} y={geo.top + 88} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={txt} stroke="#FFFFFF" strokeWidth={7} strokeLinejoin="round" paintOrder="stroke">{v}</text>}
                </g>
              )}
              {st !== "blank" && B.bead && <circle cx={x + geo.w / 2} cy={geo.top + geo.h - 10} r={8} fill="url(#gBead)" stroke={shade(CONTENT.bead, 0.25)} strokeWidth={1.5} />}
            </g>
          );
        })}
        {S.ghost != null && two && (
          <g data-role="ghost" pointerEvents="none">
            <path d={stArc(cx(0), cx(g), geo.top, 135)} fill="none" stroke={CONTENT.bead} strokeWidth={6} strokeLinecap="round" />
            <path d={stArc(cx(g - 1), cx(g), geo.top, 84)} fill="none" stroke={CONTENT.bead} strokeWidth={6} strokeLinecap="round" />
            <polygon points={`${cx(g) - 10},${geo.top - 22} ${cx(g) + 10},${geo.top - 22} ${cx(g)},${geo.top - 4}`} fill={CONTENT.bead} />
            <rect x={cx(g) - geo.w / 2} y={geo.top} width={geo.w} height={geo.h} rx={Math.round(24 * geo.sc)} fill={tint(CONTENT.bead, 0.8)} stroke={CONTENT.bead} strokeWidth={5} />
            <text x={cx(g)} y={geo.top + geo.h / 2 + Math.round(dfsOf(S.ghost) * 0.35)} textAnchor="middle" fontSize={dfsOf(S.ghost)} fontWeight={700} fill={pInk}>{S.ghost}</text>
          </g>
        )}
        {warm && S.fillN === 0 && (
          <g>
            <Hit id="stone" x={cx(g) - geo.w / 2} y={geo.top} w={geo.w} h={geo.h} label="Empty stone" onPress={() => perform("stone")} />
            {stepOn === "stone" && <Invite x={cx(g)} y={geo.top + geo.h / 2} w={geo.w} h={geo.h} rx={Math.round(24 * geo.sc)} C={C} />}
          </g>
        )}
        {B.letter && stripView()}
        {bars()}
      </g>
    );
  };

  /* the alphabet: twenty-six cells, the series lit, every landing of a count numbered above its cell */
  const stripView = () => {
    const given = new Set<number>(), found = new Set<number>(), hop = new Map<number, number>();
    terms.forEach((v: number, i: number) => { if (i < g) given.add(v - 1); else if (shown(i)) found.add(v - 1); });
    S.hops.forEach((h: any) => hop.set(h.cell, h.n));
    return (
      <g data-role="strip">
        {ALPHA.split("").map((ch: string, c: number) => {
          const col = given.has(c) ? CONTENT.hundred : found.has(c) ? CONTENT.one : hop.has(c) ? CONTENT.pointer : null;
          const x = ox + STRIP.x + c * STRIP.pitch;
          return (
            <g key={"cell" + c}>
              <rect x={x} y={STRIP.y} width={STRIP.w} height={STRIP.h} rx={8} fill={col ? tint(col, 0.78) : "#FFFFFF"} stroke={col || C.ink} strokeWidth={col ? 4 : 2.5} />
              <text x={x + STRIP.w / 2} y={STRIP.y + 39} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={col ? shade(col, 0.3) : C.ink}>{ch}</text>
              {hop.has(c) && <text x={x + STRIP.w / 2} y={STRIP.y - 12} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={vInk}>{hop.get(c)}</text>}
            </g>
          );
        })}
      </g>
    );
  };

  /* the tray: a heap of counters that two by two make pairs; what is left over stands apart; the card turns */
  const trayView = () => {
    const placed = (k: number) => k < 2 * P ? Math.floor(k / 2) < S.pairN : S.pairN >= pairTot;
    const aloneK = odd ? heap - 1 : -1;
    const standing = odd && S.pairN >= pairTot;
    const move = reducedMotion() ? "none" : "transform .55s ease";
    const word = odd ? "odd" : "even";
    const tenAndRest = heap > 10 && heap % 2 === 0 && heap % 10 !== 0 && S.pairN >= pairTot && (S.demo || S.cardUp);
    return (
      <g data-role="tray">
        <rect x={ox + TRAY.x} y={TRAY.y} width={TRAY.w} height={TRAY.h} rx={28} fill={tint(C.panel, 0.6)} stroke={C.rule} strokeWidth={3} />
        {Array.from({ length: heap }).map((_, k) => {
          const pt = placed(k) ? (k === aloneK ? stAlonePt(ox, P) : stPairPt(k, ox, P)) : stHeapPt(k, heap, ox);
          const lone = k === aloneK && placed(k);
          return (
            <g key={"cn" + k} data-role="counter" style={{ transform: `translate(${pt.x}px, ${pt.y}px)`, transition: move } as any}>
              {lone && <circle cx={0} cy={0} r={44} fill="none" stroke={CONTENT.bead} strokeWidth={S.lone ? 11 : 7} />}
              {B.thing === "button" && <Disc x={0} y={0} r={32} paint={lone ? "gBead" : "gHundred"} />}
              {B.thing === "button" && [[-9, -9], [9, -9], [-9, 9], [9, 9]].map(([hx, hy], h) => <circle key={h} cx={hx} cy={hy} r={4.5} fill="#00000040" />)}
              {B.thing !== "button" && (
                <g>
                  <path d="M -14 -34 H 12 V 2 Q 12 6 17 9 L 22 12 Q 28 16 26 26 Q 24 34 14 34 H -8 Q -18 34 -18 24 V -30 Q -18 -34 -14 -34 Z" fill={lone ? tint(CONTENT.bead, 0.5) : "#F5E9C9"} stroke="#9C8450" strokeWidth={2} />
                  <path d="M -18 -24 H 12" stroke="#9C8450" strokeWidth={2.5} />
                </g>
              )}
              {B.thing === "button" && <Skin name="button" x={-32} y={-32} w={64} h={64} fit="stretch" />}
              {B.thing === "sock" && <Skin name="sock" x={-26} y={-36} w={52} h={72} fit="stretch" />}
              {lone && (B.thing === "sock" ? <ellipse cx={0} cy={0} rx={26} ry={36} fill={CONTENT.bead} fillOpacity={0.4} /> : <circle cx={0} cy={0} r={32} fill={CONTENT.bead} fillOpacity={0.4} />)}
            </g>
          );
        })}
        {standing && (
          <g>
            <Hit id="leftover" x={stAlonePt(ox, P).x - 44} y={stAlonePt(ox, P).y - 44} w={88} h={88} label="Left over counter" onPress={() => perform("leftover")} />
            {stepOn === "leftover" && <Invite x={stAlonePt(ox, P).x} y={stAlonePt(ox, P).y} r={60} C={C} />}
          </g>
        )}
        {tenAndRest && (
          <g>
            {[[0, Math.floor(10 / 2) - 1, "10"], [Math.floor(10 / 2), P - 1, String(heap - 10)]].map(([a, z, lab]: any) => (
              <g key={"br" + a}>
                <line x1={stPairPt(2 * a, ox, P).x - 30} y1={284} x2={stPairPt(2 * z, ox, P).x + 30} y2={284} stroke={C.ink} strokeWidth={4} strokeLinecap="round" />
                <text x={(stPairPt(2 * a, ox, P).x + stPairPt(2 * z, ox, P).x) / 2} y={310} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={C.ink}>{lab}</text>
              </g>
            ))}
          </g>
        )}
        <g data-role="card">
          <rect x={ox + TRAY.x + TRAY.w - 230} y={332} width={230} height={92} rx={22} fill={S.cardUp ? tint(CONTENT.one, 0.8) : tint(C.panel, 0.5)} stroke={S.cardUp ? CONTENT.one : C.ink} strokeWidth={S.cardUp ? 5 : 3} />
          {S.cardUp
            ? <text x={ox + TRAY.x + TRAY.w - 115} y={392} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={gInk}>{tx(word)}</text>
            : <text x={ox + TRAY.x + TRAY.w - 115} y={396} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={C.ink}>?</text>}
        </g>
      </g>
    );
  };

  /* free play: a start (and a step, or a second start), a rule, and the track fills under the hand */
  const freeView = () => {
    const fx = ox + TRAY.x;
    const stepper = (sid: string, x: number, label: string, val: number, field: string) => (
      <g key={"stp" + sid}>
        <text x={x + 127} y={298} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{label}</text>
        <Key id={"minus" + sid} label={label + " down"} x={x} y={306} w={72} h={72} C={C} tone="soft" disabled={val <= MODEL.free.min} onClick={() => setFree({ [field]: Math.max(MODEL.free.min, val - 1) })}>
          <text y={14} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={toneInk("soft", C.ink)}>{"\u2212"}</text>
        </Key>
        <text x={x + 127} y={362} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={bInk}>{val}</text>
        <Key id={"plus" + sid} label={label + " up"} x={x + 182} y={306} w={72} h={72} C={C} tone="soft" disabled={val >= MODEL.free.max} onClick={() => setFree({ [field]: Math.min(MODEL.free.max, val + 1) })}>
          <text y={14} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={toneInk("soft", C.ink)}>+</text>
        </Key>
      </g>
    );
    return (
      <g data-role="rulemaker">
        {stepper("", ox + 60, tx("start"), fr.start, "start")}
        {fr.rule !== "self" && stepper("2", ox + 586, tx(fr.rule === "two" ? "second start" : "step size"), fr.b, "b")}
        {RULES.map((r: any, k: number) => {
          const on = fr.rule === r.id, x = fx + k * 214;
          return (
            <Key key={r.id} id={"rule-" + r.id} label={tx(r.a) + " " + tx(r.b)} x={x} y={400} w={202} h={100} C={C} tone={on ? "enter" : "key"} onClick={() => runRule(r.id)}>
              <text y={lang === "en" ? -6 : -14} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={toneInk(on ? "enter" : "key", C.ink)}>{tx(r.a)}</text>
              <text y={lang === "en" ? 24 : 30} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={toneInk(on ? "enter" : "key", C.ink)}>{tx(r.b)}</text>
            </Key>
          );
        })}
      </g>
    );
  };

  return (
    <g>
      {chain ? chainView() : trayView()}
      {free ? freeView() : actKey()}
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer: the stone before, the jump, the stone it lands on */
function Thumb({ n, result, it, C, w, h, lang = "en", tx = (v: any) => v }: any) {
  const item = it || (result && result.last && PHASES[n - 1].items[result.last.item]) || null;
  if (!item) return null;
  const frame = <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />;
  if (item.heap) {
    return (
      <g>
        {frame}
        <text x={w * 0.3} y={h / 2 + 12} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{item.heap}</text>
        <text x={w * 0.7} y={h / 2 + 11} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={shade(CONTENT.one, 0.32)}>{tx(String(item.answer))}</text>
      </g>
    );
  }
  const b = stBoard(item), z = b.terms[b.ansAt], a = b.terms[b.ansAt - 1];
  const sw = Math.min(76, (w - 90) / 2), sh = Math.min(56, h - 22), y = (h - sh) / 2 + 6;
  const stone = (x: number, v: number, col: string) => (
    <g>
      <rect x={x} y={y} width={sw} height={sh} rx={14} fill={tint(col, 0.82)} stroke={col} strokeWidth={3} />
      <text x={x + sw / 2} y={y + sh / 2 + 10} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={shade(col, 0.32)}>{v}</text>
    </g>
  );
  return (
    <g>
      {frame}
      <path d={`M ${12 + sw / 2} ${y} C ${12 + sw / 2} ${y - 22}, ${w - 12 - sw / 2} ${y - 22}, ${w - 12 - sw / 2} ${y}`} fill="none" stroke={CONTENT.pointer} strokeWidth={4} />
      {stone(12, a, CONTENT.hundred)}
      {stone(w - 12 - sw, z, CONTENT.one)}
    </g>
  );
}

function StepTrack(props: any) {
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

export default StepTrack;
