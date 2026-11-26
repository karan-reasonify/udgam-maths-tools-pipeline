/* ═══ M2.S3.T7.C31.2D1 · part_squares · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists. THE LESSON IS SILENT (runtime r30): the bubble is the guide.
   THE NEW LOOK (keyOnly, navDots, nextKey; docs/LAYOUT.md §1d-§1e, docs/PATTERNS.md §15-§16).
   NO imports in this file; only the five host hooks. Follow docs/LAYOUT.md and docs/PATTERNS.md.

   Part Squares: a traced outline on squared paper (1 square = 1 sq. cm). Phase 1 numbers the whole squares (the pencil
   writes each number), phase 2 marks each edge square M (more than half inside) or L (less than half, left out), phase 3
   pairs the half squares (H) with the pencil's bracket, phase 4 adds the tally of a fully marked shape and says about.
   Every outline is real geometry: PS_SHEETS holds each outline (cell units) and the kind of every square it touches,
   worked out from the outline's exact area in that square (W whole, M more than half, H half, L less than half). The
   oracle works the kinds out again from the outline by its own route and checks every answer against them.
   Marks are letters (M, H, L), with the words on the tally card: a 72-unit square cannot hold "More than half" at the
   type floor, and the letters go through tx so Hindi and Gujarati can give their own. */

const TOOL_ID = "part_squares";
const MEDIA_ID = "M2.S3.T7.C31.2D1";
const TOOL_NAME = "Part Squares";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
/* kept for the tool object's shape (and the sidecar); nothing speaks from r30 */
const VOICE = {"rate":0.92,"pitch":1.06};

/* printed on the bubble before phase 1's teach lines only (not shown: phase 1 has steps) */
const OPENING = ["A traced shape on squared paper."];
/* not shown from r44; kept for the sidecar */
const FINISH_LINE = "You estimated an area, and said about.";
/* printed when the child opens Free play; every control it names is in the free branch of Work */
const FREE_LINE = "Free play. Pick a shape and tap its squares: once M, twice H, three times L.";

/* THE START PAGE (docs/LAYOUT.md §1c): a traced leaf on squared paper, nothing counted */
const START_HOOK = "How many squares does a traced leaf cover?";
function StartArt({ box, C, lang, tx }: any) {
  const sh = PS_SHEETS.la, s = 50, w = sh.c * s, h = sh.r * s, x0 = (box.w - w) / 2, y0 = (box.h - h) / 2;
  const d = psPath(PS_OUT.la, x0, y0, s), bb = psBox(PS_OUT.la, x0, y0, s);
  return (
    <g>
      <defs>
        <clipPath id="ps-sa-clip"><path d={d} /></clipPath>
        <filter id="ps-sa-shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="6" stdDeviation="10" floodColor="#2B2B2B" floodOpacity="0.12" />
        </filter>
      </defs>
      <rect x={x0 - 12} y={y0 - 12} width={w + 24} height={h + 24} rx={20} fill="#FFFDF7" filter="url(#ps-sa-shadow)" stroke={PS_C.grid} strokeWidth={2} />
      <rect x={x0} y={y0} width={w} height={h} fill={PS_C.paper} />
      <path d={d} fill={PS_LOOK.leaf.fill} opacity={0.9} />
      <Skin name="leaf" x={bb.x - Math.min(bb.w * 0.16, bb.x - x0)} y={bb.y} w={bb.w + Math.min(bb.w * 0.16, bb.x - x0)} h={bb.h} fit="stretch" clip="url(#ps-sa-clip)" />
      {psGrid(sh, x0, y0, s)}
      <path d={d} fill="none" stroke={PS_C.ink} strokeWidth={4.5} strokeLinejoin="round" />
    </g>
  );
}

/* Hindi and Gujarati (docs/PATTERNS.md §11): filled at the language pass, once the English is final. */
const TR: any = {
  hi: {
    "Part Squares": "अधूरे वर्ग",
    "How many squares does a traced leaf cover?": "पत्ती की आकृति कितने वर्ग घेरती है?",
    "A traced shape on squared paper.": "वर्गांकित कागज़ पर बनी एक आकृति।",
    "Free play. Pick a shape and tap its squares: once M, twice H, three times L.": "खुला खेल। आकृति चुनो और वर्ग छुओ: एक बार अ, दो बार आ, तीन बार क।",
    "You estimated an area, and said about.": "तुमने क्षेत्रफल का अनुमान लगाया और लगभग कहा।",
    "Trace and count": "आकृति बनाओ और गिनो",
    "More than half or less than half": "आधे से अधिक या आधे से कम",
    "Two halves make one": "दो आधे मिलकर एक",
    "An estimate, not exact": "अनुमान, सटीक नहीं",
    "Tap each whole square once. Give it a number as you go.": "हर पूरे वर्ग को एक बार छुओ। साथ-साथ उस पर संख्या लिखो।",
    "Tap a whole square inside this leaf, and the pencil numbers it.": "पत्ती के अंदर एक पूरा वर्ग छुओ, पेंसिल उस पर संख्या लिखेगी।",
    "Tap a square that is all inside the line.": "ऐसा वर्ग छुओ जो पूरा रेखा के अंदर हो।",
    "Tap the next whole square to give it the next number.": "अगला पूरा वर्ग छुओ, उसे अगली संख्या मिलेगी।",
    "Pick a whole square that has no number yet.": "वह पूरा वर्ग चुनो जिस पर अभी संख्या नहीं है।",
    "Tap the last whole square, so each whole square has a number.": "आखिरी पूरा वर्ग छुओ, ताकि हर पूरे वर्ग पर संख्या हो।",
    "Find the whole square still without a number.": "बिना संख्या वाला पूरा वर्ग ढूँढो।",
    "Point at each pencil number in turn, starting from 1.": "1 से शुरू करके हर पेंसिल संख्या पर बारी-बारी उँगली रखो।",
    "Find the biggest number the pencil wrote on the leaf.": "पत्ती पर पेंसिल की लिखी सबसे बड़ी संख्या ढूँढो।",
    "Number the whole squares first, so no square is counted twice.": "पहले पूरे वर्गों पर संख्या लिखो, ताकि कोई वर्ग दो बार न गिना जाए।",
    "You learned: number the whole squares first, so none is counted twice.": "तुमने सीखा: पहले पूरे वर्गों पर संख्या लिखो, ताकि दोबारा न गिनें।",
    "How many whole squares does this leaf hold, if you number each as you tap it?": "हर वर्ग छूते समय संख्या लिखो, तो इस पत्ती में कितने पूरे वर्ग हैं?",
    "How many whole squares?": "कितने पूरे वर्ग?",
    "Count only the squares that have a pencil number.": "सिर्फ़ उन वर्गों को गिनो जिन पर पेंसिल की संख्या है।",
    "Yes, 18 whole squares, each numbered once.": "हाँ, 18 पूरे वर्ग, हर एक पर एक बार संख्या।",
    "How many whole squares does this second leaf hold?": "इस दूसरी पत्ती में कितने पूरे वर्ग हैं?",
    "Whole squares here?": "यहाँ पूरे वर्ग?",
    "The squares the line cuts have no number, so leave them out.": "रेखा से कटे वर्गों पर संख्या नहीं है, उन्हें छोड़ दो।",
    "Yes, 14 whole squares.": "हाँ, 14 पूरे वर्ग।",
    "How many whole squares are inside this small leaf?": "इस छोटी पत्ती के अंदर कितने पूरे वर्ग हैं?",
    "Whole squares inside?": "अंदर पूरे वर्ग?",
    "Count the numbers on this small leaf row by row.": "इस छोटी पत्ती की संख्याएँ पंक्ति-दर-पंक्ति गिनो।",
    "Yes, 12 whole squares.": "हाँ, 12 पूरे वर्ग।",
    "Tap every whole square first.": "पहले हर पूरा वर्ग छुओ।",
    "Is more than half of this square inside the line?": "क्या इस वर्ग का आधे से अधिक भाग रेखा के अंदर है?",
    "Tap the square the leaf covers most, and it reads M for more than half.": "पत्ती से सबसे ज़्यादा ढका वर्ग छुओ, उस पर अ आएगा: आधे से अधिक।",
    "Tap the square that is mostly inside the line.": "वह वर्ग छुओ जो ज़्यादातर रेखा के अंदर है।",
    "Now tap a sliver square once, and it reads M.": "अब ज़रा-सा ढका वर्ग एक बार छुओ, उस पर अ आएगा।",
    "Tap the sliver square the ring is on.": "घेरे वाला ज़रा-सा ढका वर्ग छुओ।",
    "Tap it again for L, less than half.": "उसे फिर से छुओ तो क आएगा: आधे से कम।",
    "Tap the same square again.": "वही वर्ग फिर से छुओ।",
    "Look again at each square you marked L: is most of it outside?": "क वाले हर वर्ग को फिर देखो: क्या उसका ज़्यादातर भाग बाहर है?",
    "Put a finger on each M square and count.": "हर अ वाले वर्ग पर उँगली रखकर गिनो।",
    "More than half inside counts as whole, and less than half is left out.": "आधे से अधिक अंदर हो तो पूरा गिनो, आधे से कम हो तो छोड़ दो।",
    "You learned: more than half counts as whole; less than half is left out.": "तुमने सीखा: आधे से अधिक पूरा गिनते हैं, आधे से कम छोड़ते हैं।",
    "Tap once for M, twice for L; how many whole squares do the M squares add?": "वर्ग को एक बार छुओ तो अ, दो बार तो क; अ वाले वर्ग कितने पूरे वर्ग जोड़ते हैं?",
    "Edge squares add?": "किनारे के वर्ग कितने?",
    "Look at the edge squares the leaf only just touches.": "उन किनारे के वर्गों को देखो जिन्हें पत्ती बस छूती है।",
    "Yes, the 7 M squares add 7 whole squares.": "हाँ, अ वाले 7 वर्ग 7 पूरे वर्ग जोड़ते हैं।",
    "How many whole squares is the ringed square counted as?": "घेरे वाला वर्ग कितने पूरे वर्ग गिना जाता है?",
    "Ringed square counts?": "घेरे वाला वर्ग?",
    "Look at the ringed square again.": "घेरे वाले वर्ग को फिर से देखो।",
    "Is the leaf in more than half of the ringed square?": "क्या पत्ती घेरे वाले वर्ग के आधे से अधिक भाग में है?",
    "Look at the letter in the ringed square.": "घेरे वाले वर्ग का अक्षर देखो।",
    "Yes, it counts as 1 whole square.": "हाँ, यह 1 पूरा वर्ग गिना जाता है।",
    "How many whole squares do the edge squares round this traced cup count for?": "कप की आकृति के किनारे के वर्ग कितने पूरे वर्ग गिने जाते हैं?",
    "Cup edge squares add?": "कप के किनारे के वर्ग?",
    "Look at the squares round the cup that the line cuts.": "कप के चारों ओर रेखा से कटे वर्ग देखो।",
    "Yes, the cup's edge squares add 9.": "हाँ, कप के किनारे के वर्ग 9 जोड़ते हैं।",
    "Mark every edge square first.": "पहले हर किनारे वाला वर्ग चिह्नित करो।",
    "Two halves make one whole. Pair them up.": "दो आधे मिलकर एक पूरा बनाते हैं। उनकी जोड़ी बनाओ।",
    "Tap the square cut straight across, side to side, and it reads H.": "एक ओर से दूसरी ओर सीधा कटा वर्ग छुओ, उस पर आ आएगा।",
    "Tap the square split by the straight edge.": "सीधी रेखा से बँटा वर्ग छुओ।",
    "Tap the square cut from corner to corner; it is a half too.": "कोने से कोने तक कटा वर्ग छुओ, वह भी आधा है।",
    "Tap the square the slanting line crosses.": "तिरछी रेखा वाला वर्ग छुओ।",
    "Tap Pair to join the two halves into a whole square.": "दोनों आधों को पूरा वर्ग बनाने के लिए जोड़ी छुओ।",
    "Tap the Pair key under the tally.": "तालिका के नीचे जोड़ी बटन छुओ।",
    "Point at each bracket and count it.": "हर जोड़ने वाली रेखा पर उँगली रखकर गिनो।",
    "Halve the number on the Half line of the tally.": "तालिका की आधे वाली पंक्ति की संख्या का आधा करो।",
    "Two halves make a whole, even when the cut runs corner to corner.": "दो आधे मिलकर पूरा बनते हैं, चाहे कटान कोने से कोने तक हो।",
    "You learned: two halves make a whole, even when cut corner to corner.": "तुमने सीखा: दो आधे मिलकर पूरा, कोने से कोने कटे हों तब भी।",
    "How many whole squares do the half squares of this shape make?": "इस आकृति के आधे वर्ग कितने पूरे वर्ग बनाते हैं?",
    "Halves make?": "आधे मिलकर?",
    "Join the halves two at a time.": "आधों को दो-दो करके जोड़ो।",
    "Yes, 5 pairs make 5 whole squares.": "हाँ, 5 जोड़ियाँ 5 पूरे वर्ग बनाती हैं।",
    "This outline cuts 14 squares in half, so how many whole squares is that?": "यह रेखा 14 वर्गों को आधा काटती है, तो यह कितने पूरे वर्ग हुए?",
    "14 halves make?": "14 आधे मिलकर?",
    "The tally says how many halves; how many pairs is that?": "तालिका आधों की गिनती बताती है, उनकी कितनी जोड़ियाँ बनेंगी?",
    "Yes, 14 halves make 7 whole squares.": "हाँ, 14 आधे 7 पूरे वर्ग बनाते हैं।",
    "How many whole squares do these 6 corner to corner halves come to?": "कोने से कोने कटे ये 6 आधे कितने पूरे वर्ग बनते हैं?",
    "Corner cuts make?": "कोने से कटे वर्ग?",
    "Fold a corner-cut square along its cut in your mind.": "मन में कोने से कटे वर्ग को उसकी कटान पर मोड़ो।",
    "Yes, 6 halves make 3 whole squares.": "हाँ, 6 आधे 3 पूरे वर्ग बनाते हैं।",
    "Pair the halves first.": "पहले आधों की जोड़ी बनाओ।",
    "Each square is one square centimetre.": "हर वर्ग 1 वर्ग सेंटीमीटर है।",
    "Part squares are only rounded, so the total is about, not exact.": "अधूरे वर्ग सिर्फ़ अंदाज़े से गिने जाते हैं, इसलिए कुल लगभग है, सटीक नहीं।",
    "Add the Whole line and the More than half line first.": "पहले पूरे और आधे से अधिक वाली पंक्तियाँ जोड़ो।",
    "Then add the Half pairs line, never the Left out line.": "फिर आधों की जोड़ियाँ जोड़ो, छोड़े गए वर्ग कभी नहीं।",
    "So an area found from part squares is an estimate.": "इसलिए अधूरे वर्गों से निकला क्षेत्रफल एक अनुमान है।",
    "You learned: add the kinds by the rules and say about: an estimate.": "तुमने सीखा: नियम से जोड़ो और लगभग कहो, यह अनुमान है।",
    "After pairing the halves, what is the area of this traced hand in squares?": "आधों की जोड़ी बनाकर बताओ, हाथ की आकृति का क्षेत्रफल कितने वर्ग है?",
    "Area of the hand?": "हाथ का क्षेत्रफल?",
    "Look at the Left out line: does it belong in the total?": "छोड़े गए वर्गों की पंक्ति देखो: क्या वह कुल में आती है?",
    "Yes, the hand covers about 33 squares.": "हाँ, हाथ लगभग 33 वर्ग घेरता है।",
    "Once its halves are paired, roughly what area does this leaf cover?": "आधों की जोड़ी बनने पर यह पत्ती लगभग कितना क्षेत्रफल घेरती है?",
    "Area of the leaf?": "पत्ती का क्षेत्रफल?",
    "Is the Half line counted as halves, or as pairs?": "आधे वाली पंक्ति आधों में गिनी, या जोड़ियों में?",
    "Yes, the leaf covers about 20 squares.": "हाँ, पत्ती लगभग 20 वर्ग घेरती है।",
    "About how many squares does this traced stone cover?": "पत्थर की यह आकृति लगभग कितने वर्ग घेरती है?",
    "Area of the stone?": "पत्थर का क्षेत्रफल?",
    "Check each line of the tally against the squares.": "तालिका की हर पंक्ति को वर्गों से मिलाकर देखो।",
    "Yes, the stone covers about 26 squares.": "हाँ, पत्थर लगभग 26 वर्ग घेरता है।",
    "Whole": "पूरे",
    "More than half": "आधे से अधिक",
    "Half": "आधे",
    "Half pairs": "आधों की जोड़ी",
    "Less than half": "आधे से कम",
    "Left out": "छोड़े गए",
    "Ringed square": "घेरे वाला वर्ग",
    "about": "लगभग",
    "sq. cm": "वर्ग सेमी",
    "estimate": "अनुमान",
    "Pair": "जोड़ी",
    "Leaf": "पत्ती",
    "Cup": "कप",
    "Stone": "पत्थर",
    "Grid": "जाली",
    "M": "अ",
    "H": "आ",
    "L": "क",
    "Tap once for M,": "एक बार छुओ: अ,",
    "tap twice for L.": "दो बार छुओ: क।",
  },
  gu: {
    "Part Squares": "અધૂરા ચોરસ",
    "How many squares does a traced leaf cover?": "પાંદડાની આકૃતિ કેટલા ચોરસ રોકે છે?",
    "A traced shape on squared paper.": "ચોરસવાળા કાગળ પર દોરેલી એક આકૃતિ.",
    "Free play. Pick a shape and tap its squares: once M, twice H, three times L.": "મુક્ત રમત. આકૃતિ પસંદ કરો અને ચોરસ સ્પર્શો: એક વાર વ, બે વાર અ, ત્રણ વાર ઓ.",
    "You estimated an area, and said about.": "તમે ક્ષેત્રફળનો અંદાજ કાઢ્યો અને આશરે કહ્યું.",
    "Trace and count": "આકૃતિ દોરો અને ગણો",
    "More than half or less than half": "અડધાથી વધુ કે અડધાથી ઓછું",
    "Two halves make one": "બે અડધા મળીને એક",
    "An estimate, not exact": "અંદાજ, ચોક્કસ નહીં",
    "Tap each whole square once. Give it a number as you go.": "દરેક પૂરા ચોરસને એક વાર સ્પર્શો. સાથે સાથે તેના પર સંખ્યા લખો.",
    "Tap a whole square inside this leaf, and the pencil numbers it.": "પાંદડાની અંદર એક પૂરો ચોરસ સ્પર્શો, પેન્સિલ તેના પર સંખ્યા લખશે.",
    "Tap a square that is all inside the line.": "એવો ચોરસ સ્પર્શો જે આખો રેખાની અંદર હોય.",
    "Tap the next whole square to give it the next number.": "આગળનો પૂરો ચોરસ સ્પર્શો, તેને આગળની સંખ્યા મળશે.",
    "Pick a whole square that has no number yet.": "જે પૂરા ચોરસ પર હજી સંખ્યા નથી તે પસંદ કરો.",
    "Tap the last whole square, so each whole square has a number.": "છેલ્લો પૂરો ચોરસ સ્પર્શો, જેથી દરેક પૂરા ચોરસ પર સંખ્યા હોય.",
    "Find the whole square still without a number.": "સંખ્યા વગરનો પૂરો ચોરસ શોધો.",
    "Point at each pencil number in turn, starting from 1.": "1 થી શરૂ કરીને દરેક પેન્સિલ સંખ્યા પર વારાફરતી આંગળી મૂકો.",
    "Find the biggest number the pencil wrote on the leaf.": "પાંદડા પર પેન્સિલે લખેલી સૌથી મોટી સંખ્યા શોધો.",
    "Number the whole squares first, so no square is counted twice.": "પહેલાં પૂરા ચોરસ પર સંખ્યા લખો, જેથી કોઈ ચોરસ બે વાર ન ગણાય.",
    "You learned: number the whole squares first, so none is counted twice.": "તમે શીખ્યા: પહેલાં પૂરા ચોરસ પર સંખ્યા લખો, જેથી બે વાર ન ગણાય.",
    "How many whole squares does this leaf hold, if you number each as you tap it?": "દરેક ચોરસ સ્પર્શતાં સંખ્યા લખો, તો આ પાંદડામાં કેટલા પૂરા ચોરસ છે?",
    "How many whole squares?": "કેટલા પૂરા ચોરસ?",
    "Count only the squares that have a pencil number.": "ફક્ત પેન્સિલની સંખ્યાવાળા ચોરસ ગણો.",
    "Yes, 18 whole squares, each numbered once.": "હા, 18 પૂરા ચોરસ, દરેક પર એક જ વાર સંખ્યા.",
    "How many whole squares does this second leaf hold?": "આ બીજા પાંદડામાં કેટલા પૂરા ચોરસ છે?",
    "Whole squares here?": "અહીં પૂરા ચોરસ?",
    "The squares the line cuts have no number, so leave them out.": "રેખાથી કપાયેલા ચોરસ પર સંખ્યા નથી, તેમને છોડી દો.",
    "Yes, 14 whole squares.": "હા, 14 પૂરા ચોરસ.",
    "How many whole squares are inside this small leaf?": "આ નાના પાંદડાની અંદર કેટલા પૂરા ચોરસ છે?",
    "Whole squares inside?": "અંદર પૂરા ચોરસ?",
    "Count the numbers on this small leaf row by row.": "આ નાના પાંદડાની સંખ્યાઓ હરોળ પ્રમાણે ગણો.",
    "Yes, 12 whole squares.": "હા, 12 પૂરા ચોરસ.",
    "Tap every whole square first.": "પહેલાં દરેક પૂરો ચોરસ સ્પર્શો.",
    "Is more than half of this square inside the line?": "શું આ ચોરસનો અડધાથી વધુ ભાગ રેખાની અંદર છે?",
    "Tap the square the leaf covers most, and it reads M for more than half.": "પાંદડાથી સૌથી વધુ ઢંકાયેલો ચોરસ સ્પર્શો, તેના પર વ આવશે: અડધાથી વધુ.",
    "Tap the square that is mostly inside the line.": "જે ચોરસ મોટે ભાગે રેખાની અંદર છે તે સ્પર્શો.",
    "Now tap a sliver square once, and it reads M.": "હવે થોડો જ ઢંકાયેલો ચોરસ એક વાર સ્પર્શો, તેના પર વ આવશે.",
    "Tap the sliver square the ring is on.": "રિંગવાળો થોડો જ ઢંકાયેલો ચોરસ સ્પર્શો.",
    "Tap it again for L, less than half.": "તેને ફરી સ્પર્શો તો ઓ આવશે: અડધાથી ઓછું.",
    "Tap the same square again.": "એ જ ચોરસ ફરી સ્પર્શો.",
    "Look again at each square you marked L: is most of it outside?": "ઓ વાળા દરેક ચોરસને ફરી જુઓ: શું તેનો મોટો ભાગ બહાર છે?",
    "Put a finger on each M square and count.": "દરેક વ વાળા ચોરસ પર આંગળી મૂકીને ગણો.",
    "More than half inside counts as whole, and less than half is left out.": "અડધાથી વધુ અંદર હોય તો આખો ગણો, અડધાથી ઓછો હોય તો છોડી દો.",
    "You learned: more than half counts as whole; less than half is left out.": "તમે શીખ્યા: અડધાથી વધુ આખો ગણાય, અડધાથી ઓછો છોડાય.",
    "Tap once for M, twice for L; how many whole squares do the M squares add?": "ચોરસને એક વાર સ્પર્શો તો વ, બે વાર તો ઓ; વ વાળા ચોરસ કેટલા પૂરા ચોરસ ઉમેરે છે?",
    "Edge squares add?": "કિનારાના ચોરસ કેટલા?",
    "Look at the edge squares the leaf only just touches.": "પાંદડું જેને માંડ અડે છે તે કિનારાના ચોરસ જુઓ.",
    "Yes, the 7 M squares add 7 whole squares.": "હા, વ વાળા 7 ચોરસ 7 પૂરા ચોરસ ઉમેરે છે.",
    "How many whole squares is the ringed square counted as?": "વર્તુળવાળો ચોરસ કેટલા પૂરા ચોરસ ગણાય છે?",
    "Ringed square counts?": "વર્તુળવાળો ચોરસ?",
    "Look at the ringed square again.": "વર્તુળવાળા ચોરસને ફરી જુઓ.",
    "Is the leaf in more than half of the ringed square?": "શું પાંદડું વર્તુળવાળા ચોરસના અડધાથી વધુ ભાગમાં છે?",
    "Look at the letter in the ringed square.": "વર્તુળવાળા ચોરસનો અક્ષર જુઓ.",
    "Yes, it counts as 1 whole square.": "હા, તે 1 પૂરો ચોરસ ગણાય છે.",
    "How many whole squares do the edge squares round this traced cup count for?": "કપની આકૃતિના કિનારાના ચોરસ કેટલા પૂરા ચોરસ ગણાય છે?",
    "Cup edge squares add?": "કપના કિનારાના ચોરસ?",
    "Look at the squares round the cup that the line cuts.": "કપની આસપાસ રેખાથી કપાયેલા ચોરસ જુઓ.",
    "Yes, the cup's edge squares add 9.": "હા, કપના કિનારાના ચોરસ 9 ઉમેરે છે.",
    "Mark every edge square first.": "પહેલાં દરેક કિનારાનો ચોરસ ચિહ્નિત કરો.",
    "Two halves make one whole. Pair them up.": "બે અડધા મળીને એક આખો બને છે. તેમની જોડી બનાવો.",
    "Tap the square cut straight across, side to side, and it reads H.": "એક બાજુથી બીજી બાજુ સીધો કપાયેલો ચોરસ સ્પર્શો, તેના પર અ આવશે.",
    "Tap the square split by the straight edge.": "સીધી રેખાથી વહેંચાયેલો ચોરસ સ્પર્શો.",
    "Tap the square cut from corner to corner; it is a half too.": "ખૂણાથી ખૂણા સુધી કપાયેલો ચોરસ સ્પર્શો, તે પણ અડધો છે.",
    "Tap the square the slanting line crosses.": "ત્રાંસી રેખાવાળો ચોરસ સ્પર્શો.",
    "Tap Pair to join the two halves into a whole square.": "બંને અડધાને આખો ચોરસ બનાવવા જોડી સ્પર્શો.",
    "Tap the Pair key under the tally.": "કોષ્ટક નીચે જોડી બટન સ્પર્શો.",
    "Point at each bracket and count it.": "દરેક જોડતી રેખા પર આંગળી મૂકીને ગણો.",
    "Halve the number on the Half line of the tally.": "કોષ્ટકની અડધા હરોળની સંખ્યાનું અડધું કરો.",
    "Two halves make a whole, even when the cut runs corner to corner.": "બે અડધા મળીને આખો બને, ભલે કાપ ખૂણાથી ખૂણા સુધી હોય.",
    "You learned: two halves make a whole, even when cut corner to corner.": "તમે શીખ્યા: બે અડધા મળી આખો, ખૂણેથી ખૂણે કપાયા હોય તોય.",
    "How many whole squares do the half squares of this shape make?": "આ આકૃતિના અડધા ચોરસ કેટલા પૂરા ચોરસ બનાવે છે?",
    "Halves make?": "અડધા મળીને?",
    "Join the halves two at a time.": "અડધાને બે-બે કરીને જોડો.",
    "Yes, 5 pairs make 5 whole squares.": "હા, 5 જોડી 5 પૂરા ચોરસ બનાવે છે.",
    "This outline cuts 14 squares in half, so how many whole squares is that?": "આ રેખા 14 ચોરસને અડધા કાપે છે, તો તે કેટલા પૂરા ચોરસ થયા?",
    "14 halves make?": "14 અડધા મળીને?",
    "The tally says how many halves; how many pairs is that?": "કોષ્ટક અડધાની ગણતરી કહે છે, તેની કેટલી જોડી બને?",
    "Yes, 14 halves make 7 whole squares.": "હા, 14 અડધા 7 પૂરા ચોરસ બનાવે છે.",
    "How many whole squares do these 6 corner to corner halves come to?": "ખૂણાથી ખૂણે કપાયેલા આ 6 અડધા કેટલા પૂરા ચોરસ થાય?",
    "Corner cuts make?": "ખૂણેથી કપાયેલા?",
    "Fold a corner-cut square along its cut in your mind.": "મનમાં ખૂણેથી કપાયેલા ચોરસને તેના કાપ પર વાળો.",
    "Yes, 6 halves make 3 whole squares.": "હા, 6 અડધા 3 પૂરા ચોરસ બનાવે છે.",
    "Pair the halves first.": "પહેલાં અડધાની જોડી બનાવો.",
    "Each square is one square centimetre.": "દરેક ચોરસ 1 ચોરસ સેન્ટિમીટર છે.",
    "Part squares are only rounded, so the total is about, not exact.": "અધૂરા ચોરસ ફક્ત અંદાજે ગણાય છે, તેથી કુલ આશરે છે, ચોક્કસ નહીં.",
    "Add the Whole line and the More than half line first.": "પહેલાં પૂરા અને અડધાથી વધુ વાળી હરોળ ઉમેરો.",
    "Then add the Half pairs line, never the Left out line.": "પછી અડધાની જોડી ઉમેરો, છોડેલા ચોરસ ક્યારેય નહીં.",
    "So an area found from part squares is an estimate.": "તેથી અધૂરા ચોરસથી મળેલું ક્ષેત્રફળ અંદાજ છે.",
    "You learned: add the kinds by the rules and say about: an estimate.": "તમે શીખ્યા: નિયમથી ઉમેરો અને આશરે કહો, તે અંદાજ છે.",
    "After pairing the halves, what is the area of this traced hand in squares?": "અડધાની જોડી બનાવીને કહો, હાથની આકૃતિનું ક્ષેત્રફળ કેટલા ચોરસ છે?",
    "Area of the hand?": "હાથનું ક્ષેત્રફળ?",
    "Look at the Left out line: does it belong in the total?": "છોડેલા ચોરસની હરોળ જુઓ: શું તે કુલમાં આવે?",
    "Yes, the hand covers about 33 squares.": "હા, હાથ આશરે 33 ચોરસ રોકે છે.",
    "Once its halves are paired, roughly what area does this leaf cover?": "અડધાની જોડી બને પછી આ પાંદડું આશરે કેટલું ક્ષેત્રફળ રોકે છે?",
    "Area of the leaf?": "પાંદડાનું ક્ષેત્રફળ?",
    "Is the Half line counted as halves, or as pairs?": "અડધા હરોળને અડધા તરીકે ગણી કે જોડી તરીકે?",
    "Yes, the leaf covers about 20 squares.": "હા, પાંદડું આશરે 20 ચોરસ રોકે છે.",
    "About how many squares does this traced stone cover?": "પથ્થરની આ આકૃતિ આશરે કેટલા ચોરસ રોકે છે?",
    "Area of the stone?": "પથ્થરનું ક્ષેત્રફળ?",
    "Check each line of the tally against the squares.": "કોષ્ટકની દરેક હરોળને ચોરસ સાથે સરખાવો.",
    "Yes, the stone covers about 26 squares.": "હા, પથ્થર આશરે 26 ચોરસ રોકે છે.",
    "Whole": "પૂરા",
    "More than half": "અડધાથી વધુ",
    "Half": "અડધા",
    "Half pairs": "અડધાની જોડી",
    "Less than half": "અડધાથી ઓછા",
    "Left out": "છોડેલા",
    "Ringed square": "વર્તુળવાળો ચોરસ",
    "about": "આશરે",
    "sq. cm": "ચો. સેમી",
    "estimate": "અંદાજ",
    "Pair": "જોડી",
    "Leaf": "પાંદડું",
    "Cup": "કપ",
    "Stone": "પથ્થર",
    "Grid": "જાળી",
    "M": "વ",
    "H": "અ",
    "L": "ઓ",
    "Tap once for M,": "એક વાર સ્પર્શો: વ,",
    "tap twice for L.": "બે વાર સ્પર્શો: ઓ.",
  },
};

/* ── the squared paper: every outline, in cell units, and the kind of each square it touches ────────────────────
   k: one string a row, one letter a square: W whole, M more than half, H half, L less than half, "." untouched.
   sp: control points of a smooth closed curve (Catmull-Rom); pg: a polygon; el: an ellipse [cx, cy, rx, ry, n points]. */
const PS_SHEETS: any = {
  w1: { c: 5, r: 3, look: "leaf", sp: [[4.507, 1.165],[4.54, 1.435],[4.398, 1.721],[4.05, 2.001],[3.466, 2.217],[2.714, 2.321],[1.93, 2.262],[1.254, 2.078],[0.771, 1.807],[0.532, 1.487],[0.536, 1.165],[0.724, 0.871],[1.074, 0.623],[1.55, 0.437],[2.122, 0.337],[2.714, 0.329],[3.258, 0.404],[3.716, 0.538],[4.076, 0.715],[4.344, 0.924]],
    k: "LMMML/LWWWL/.LLL." },
  la: { c: 9, r: 6, look: "leaf", sp: [[8.209, 3.045],[7.96, 3.591],[7.629, 4.088],[7.37, 4.62],[6.86, 5.08],[6.078, 5.319],[5.292, 5.469],[4.49, 5.493],[3.699, 5.435],[2.955, 5.243],[2.338, 4.906],[1.847, 4.499],[1.482, 4.044],[1.188, 3.565],[0.951, 3.045],[0.623, 2.436],[0.791, 1.816],[1.693, 1.506],[2.503, 1.327],[3.182, 1.172],[3.768, 0.863],[4.49, 0.544],[5.313, 0.558],[6.081, 0.766],[6.71, 1.125],[7.291, 1.505],[7.94, 1.94],[8.21, 2.45]],
    k: "...LLLL../LLMMWWML./LWWWWWWWL/LMWWWWWML/.LMWWWWL./..LLLLL.." },
  lb: { c: 8, r: 5, look: "leaf", sp: [[7.64, 2.929],[7.442, 3.423],[7.13, 3.9],[6.62, 4.23],[5.985, 4.424],[5.376, 4.563],[4.777, 4.625],[4.196, 4.622],[3.634, 4.57],[3.086, 4.466],[2.548, 4.307],[2.024, 4.084],[1.533, 3.784],[1.146, 3.393],[0.915, 2.929],[0.86, 2.43],[1, 1.97],[1.645, 1.573],[2.157, 1.225],[2.708, 0.869],[3.405, 0.62],[4.196, 0.493],[5.027, 0.503],[5.828, 0.67],[6.511, 0.994],[7.058, 1.407],[7.447, 1.885],[7.644, 2.404]],
    k: "..LLMLL./.LMWWWML/LWWWWWWM/LMWWWWWL/.LLMMML." },
  lc: { c: 7, r: 6, look: "leaf", sp: [[5.955, 2.935],[5.856, 3.499],[5.573, 4.017],[5.141, 4.451],[4.606, 4.782],[4.007, 4.998],[3.384, 5.103],[2.765, 5.103],[2.171, 5.018],[1.621, 4.835],[1.15, 4.555],[0.782, 4.2],[0.538, 3.793],[0.444, 3.359],[0.484, 2.935],[0.631, 2.545],[0.819, 2.185],[1.023, 1.824],[1.254, 1.419],[1.582, 0.97],[2.125, 0.691],[2.765, 0.582],[3.43, 0.605],[4.068, 0.77],[4.626, 1.068],[5.117, 1.435],[5.534, 1.868],[5.827, 2.376]],
    k: ".LLLL../LMWWML./LWWWWM./MWWWWM./LMWWML./..LL..." },
  w2: { c: 4, r: 3, look: "leaf", el: [1.5, 1.5, 0.74, 0.48, 48],
    k: "..../LML./...." },
  ld: { c: 7, r: 3, look: "leaf", sp: [[6.38, 1.5],[6, 2],[5, 2.55],[4.4, 2.74],[3.5, 2.78],[2.6, 2.76],[2, 2.72],[1.3, 2],[1.15, 1.5],[1.3, 1],[2, 0.28],[2.6, 0.24],[3.5, 0.22],[4.4, 0.26],[5, 0.45],[6, 1]],
    k: ".LMMML./.MWWWWL/.LMMML." },
  cup: { c: 5, r: 5, look: "cup", el: [2.5, 2.825, 2.3, 2.162, 72],
    k: ".LLL./LMWML/MWWWM/MWWWM/LMMML" },
  w3: { h: 1, c: 4, r: 3, look: "plain", pg: [[1, 1],[3.5, 1],[3.5, 2],[2, 2]],
    k: "..../.HWH/...." },
  t10: { h: 1, c: 6, r: 4, look: "plain", pg: [[1, 0.5],[5, 0.5],[5, 3.5],[1, 3.5],[1, 3],[0, 2],[1, 1]],
    k: ".HHHH./HWWWW./HWWWW./.HHHH." },
  t14: { h: 1, c: 7, r: 4, look: "plain", pg: [[1, 0.5],[6, 0.5],[6, 1],[7, 2],[6, 3],[6, 3.5],[1, 3.5],[1, 3],[0, 2],[1, 1]],
    k: ".HHHHH./HWWWWWH/HWWWWWH/.HHHHH." },
  x6: { h: 1, c: 5, r: 4, look: "plain", pg: [[1, 0],[3, 0],[5, 2],[3, 4],[1, 4],[0, 3],[0, 1]],
    k: "HWWH./WWWWH/WWWWH/HWWH." },
  hand: { h: 1, c: 7, r: 9, look: "hand", sp: [[2, 0.5],[3, 0.27],[4, 0.28],[4.9, 0.45],[5.28, 1.1],[5.3, 2.3],[5.3, 3.5],[5.3, 5],[5.45, 5.9],[5.5, 6.6],[5.5, 7.8],[5.5, 8.5],[4, 8.5],[2.6, 8.5],[1.1, 8.5],[1.1, 8],[1.15, 7.4],[1.3, 6.5],[1.3, 5.85],[0.75, 5.5],[0.45, 4.9],[0.55, 4.35],[0.95, 4.3],[1.4, 4.65],[1.28, 3.4],[1.25, 2.3],[1.78, 1.4]],
    k: ".LMMML./.LWWWL./.MWWWL./.MWWWL./LMWWWL./LMWWWL./.MWWWH./.MWWWH./.HHHHL." },
  lf: { h: 1, c: 7, r: 5, look: "leaf", sp: [[0.35, 2.45],[0.9, 1.6],[1.7, 0.9],[2.5, 0.55],[3.5, 0.32],[4.5, 0.35],[5.35, 0.6],[6, 1],[6.5, 2.5],[6, 4],[5.4, 4.52],[4.5, 4.72],[3.5, 4.74],[2.6, 4.45],[2, 4],[1.75, 3.5],[1, 3],[0.55, 2.85]],
    k: ".LHMML./LMWWWWL/HWWWWWH/.LWWWWL/..LMMH." },
  stone: { h: 1, c: 7, r: 6, look: "stone", sp: [[2.5, 0.5],[3.5, 0.3],[4.5, 0.5],[5.4, 0.95],[5.97, 2],[6.3, 2.6],[6.45, 3.5],[6.2, 4.4],[5.5, 5],[4.5, 5.45],[3.5, 5.7],[2.6, 5.58],[2, 5],[1.3, 4.62],[0.5, 4],[0.2, 3.3],[0.5, 2.45],[0.9, 1.6],[1.6, 0.95]],
    k: ".LHMHL./LMWWWM./HWWWWWL/MWWWWWH/LMWWWML/..HMHL." },
  rect: { c: 6, r: 5, look: "plain", pg: [[1, 1],[5, 1],[5, 4],[1, 4]],
    k: "....../.WWWW./.WWWW./.WWWW./......" },
};
/* the half squares joined by each press of Pair, in order: [[c, r], [c, r]] */
const PS_PAIRS: any = {
  w3: [[[3, 1], [1, 1]]],
  t10: [[[1, 0], [2, 0]], [[3, 0], [4, 0]], [[0, 1], [0, 2]], [[1, 3], [2, 3]], [[3, 3], [4, 3]]],
  t14: [[[1, 0], [2, 0]], [[3, 0], [4, 0]], [[5, 0], [6, 1]], [[0, 1], [0, 2]], [[6, 2], [5, 3]], [[4, 3], [3, 3]], [[2, 3], [1, 3]]],
  x6: [[[3, 0], [4, 1]], [[4, 2], [3, 3]], [[0, 0], [0, 3]]],
  hand: [[[1, 8], [2, 8]], [[3, 8], [4, 8]], [[5, 6], [5, 7]]],
  lf: [[[2, 0], [0, 2]], [[6, 2], [5, 4]]],
  stone: [[[2, 0], [0, 2]], [[4, 0], [6, 3]], [[2, 5], [4, 5]]],
};

/* ── the picture's own geometry (the oracle has its own, further down) ─────────────────────────────────────────── */
const PS_C = { violet: "#6B4FA0", vFill: "#8F7BF0", rose: "#A8325F", rFill: "#E38AAD", pale: "#F4C3D5", amber: "#E69F00", amberInk: "#7A4F00",
  green: "#1E7F4F", blue: "#1F5FA8", ink: "#2B2B2B", paper: "#FFFDF7", grid: "#3A3A3A", roseInk: "#8A1F4A" };
const PS_LOOK: any = { leaf: { fill: "#E2B857", skin: "leaf" }, hand: { fill: "#E9BE95", skin: "hand" }, cup: { fill: "#F3E6CF", skin: "" },
  stone: { fill: "#D8C3A2", skin: "" }, plain: { fill: "#FBEFD6", skin: "" } };
function psOutline(sh: any) {
  if (sh.el) {
    const [cx, cy, rx, ry, m] = sh.el, out: any[] = [];
    for (let i = 0; i < m; i++) { const t = (i / m) * 2 * Math.PI; out.push([cx + rx * Math.cos(t), cy + ry * Math.sin(t)]); }
    return out;
  }
  if (sh.pg) return sh.pg;
  const P = sh.sp, N = P.length, out: any[] = [];
  const f = (a: number, b: number, c: number, d: number, t: number) => 0.5 * (2 * b + (-a + c) * t + (2 * a - 5 * b + 4 * c - d) * t * t + (-a + 3 * b - 3 * c + d) * t * t * t);
  for (let i = 0; i < N; i++) {
    const a = P[(i - 1 + N) % N], b = P[i], c = P[(i + 1) % N], d = P[(i + 2) % N];
    for (let k = 0; k < 12; k++) out.push([f(a[0], b[0], c[0], d[0], k / 12), f(a[1], b[1], c[1], d[1], k / 12)]);
  }
  return out;
}
const PS_OUT: any = {};
Object.keys(PS_SHEETS).forEach((id) => { PS_OUT[id] = psOutline(PS_SHEETS[id]); });
const psPath = (pts: any[], x0: number, y0: number, s: number) => "M" + pts.map((p: any) => (x0 + p[0] * s).toFixed(1) + " " + (y0 + p[1] * s).toFixed(1)).join("L") + "Z";
function psBox(pts: any[], x0: number, y0: number, s: number) {
  let a = 1e9, b = 1e9, c = -1e9, d = -1e9;
  pts.forEach((p: any) => { a = Math.min(a, p[0]); b = Math.min(b, p[1]); c = Math.max(c, p[0]); d = Math.max(d, p[1]); });
  return { x: x0 + a * s, y: y0 + b * s, w: (c - a) * s, h: (d - b) * s };
}
/* is a point (cell units) inside the outline: used to find which way a half square is cut */
function psInside(pts: any[], x: number, y: number) {
  let inn = false;
  for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) {
    const [xi, yi] = pts[i], [xj, yj] = pts[j];
    if ((yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inn = !inn;
  }
  return inn;
}
const psKind = (sh: any, c: number, r: number) => sh.k.split("/")[r][c];
function psCells(sh: any) {
  const out: any[] = [];
  sh.k.split("/").forEach((row: string, r: number) => [...row].forEach((k: string, c: number) => out.push({ c, r, k, id: c + "," + r })));
  return out;
}
/* the grid: every square with a dark outline, a heavier edge round the sheet */
function psGrid(sh: any, x0: number, y0: number, s: number) {
  const out: any[] = [];
  for (let r = 0; r < sh.r; r++) for (let c = 0; c < sh.c; c++)
    out.push(<rect key={"g" + c + "." + r} x={x0 + c * s} y={y0 + r * s} width={s} height={s} fill="none" stroke={PS_C.grid} strokeWidth={2.4} />);
  out.push(<rect key="gb" x={x0} y={y0} width={sh.c * s} height={sh.r * s} fill="none" stroke={PS_C.ink} strokeWidth={4.5} rx={4} />);
  return out;
}
/* where the sheet sits: the biggest squares that fit left of the tally card, the same with the keypad open or shut */
const PS_TW = 360, PS_M = 12, PS_GAP = 50, PS_OPEN = 1086;
function psLay(sh: any, H: number) {
  const gw = PS_OPEN - 2 * PS_M - PS_TW - PS_GAP, gh = H - 2 * PS_M;
  const s = Math.min(104, Math.floor(gw / sh.c), Math.floor(gh / sh.r));
  const gx = PS_M + Math.round((gw - s * sh.c) / 2), gy = PS_M + Math.round((gh - s * sh.r) / 2);
  /* the tally card is centred in the room between the paper and the open keypad, never pressed against either */
  const right = gx + s * sh.c + 10;
  return { s, gx, gy, tx: Math.round(right + (PS_OPEN - PS_M - right - PS_TW) / 2) };
}
/* where a mark's letter sits: the point of the part of the square it names (the inside part of an M or H square, the
   outside part of an L square) farthest from the traced line, kept off the square's own edges, so the line never runs
   through or against the letter */
const PS_CEN: any = {};
function psCen(sid: string, c: number, r: number, inside: boolean) {
  const k = sid + ":" + c + "," + r + ":" + (inside ? 1 : 0);
  if (PS_CEN[k]) return PS_CEN[k];
  const pts = PS_OUT[sid], n = pts.length;
  const segD = (x: number, y: number) => {
    let best = 1e9;
    for (let i = 0; i < n; i++) {
      const a = pts[i], b = pts[(i + 1) % n], dx = b[0] - a[0], dy = b[1] - a[1], L2 = dx * dx + dy * dy || 1e-9;
      const t = Math.max(0, Math.min(1, ((x - a[0]) * dx + (y - a[1]) * dy) / L2)), ex = a[0] + t * dx - x, ey = a[1] + t * dy - y;
      best = Math.min(best, ex * ex + ey * ey);
    }
    return Math.sqrt(best);
  };
  let bu = 0.5, bv = 0.5, bs = -1;
  for (let i = 0; i < 15; i++) for (let j = 0; j < 15; j++) {
    const u = 0.2 + (0.6 * i) / 14, v = 0.2 + (0.6 * j) / 14;
    if (psInside(pts, c + u, r + v) !== inside) continue;
    const sc = Math.min(segD(c + u, r + v), Math.min(u, 1 - u, v, 1 - v) + 0.06);
    if (sc > bs) { bs = sc; bu = u; bv = v; }
  }
  return (PS_CEN[k] = [bu, bv]);
}
/* a letter's or chip's box (bw x bh px, centre returned in cell units): the place in its part of the square whose box
   stays farthest from the traced line AND from the board's own frame, measured from the box's edge, not its centre */
const PS_SPOT: any = {};
/* how: "chip" a correction chip (balanced, 3 px off the grid lines); "mark" a letter that stays in its own part (balanced,
   8 px off the grid lines); "free" a letter that keeps the frame clear first and may use its square's clearer side */
function psSpot(sid: string, c: number, r: number, inside: boolean, bw: number, bh: number, s: number, how = "mark", avoid: any = null, tight = false): any {
  const flip = how === "free";
  const k = [sid, c, r, inside ? 1 : 0, Math.round(bw), Math.round(bh), Math.round(s), how, avoid ? avoid.map((x: number) => Math.round(x * 100)).join(",") : "", tight ? 1 : 0].join(":");
  if (PS_SPOT[k]) return PS_SPOT[k];
  const sh = PS_SHEETS[sid], pts = PS_OUT[sid], n = pts.length;
  const dOut = (x: number, y: number) => {
    let best = 1e9;
    for (let i = 0; i < n; i++) {
      const a = pts[i], b = pts[(i + 1) % n], dx = b[0] - a[0], dy = b[1] - a[1], L2 = dx * dx + dy * dy || 1e-9;
      const t = Math.max(0, Math.min(1, ((x - a[0]) * dx + (y - a[1]) * dy) / L2)), ex = a[0] + t * dx - x, ey = a[1] + t * dy - y;
      best = Math.min(best, ex * ex + ey * ey);
    }
    return Math.sqrt(best);
  };
  /* letters keep 8 px off the thin grid lines; a chip, or a letter whose part has no clear place at 8, may come to 3 */
  const hw = bw / 2 / s, hh = bh / 2 / s, m = (how === "chip" || tight ? 3 : 8) / s;
  let bu = 0.5, bv = 0.5, bs = -1e9, au = 0.5, av = 0.5, as = -1e9;
  for (let i = 0; i < 13; i++) for (let j = 0; j < 13; j++) {
    const u = hw + m + ((1 - 2 * hw - 2 * m) * i) / 12, v = hh + m + ((1 - 2 * hh - 2 * m) * j) / 12;
    const side = psInside(pts, c + u, r + v), own = side === inside;
    if (!own && !flip) continue;
    /* the box's clearance from the traced line and from the board's frame, in px */
    let dO = 1e9, dF = 1e9, cross = false;
    /* a chip keeps clear of the child's own (wrong) letter in the same square: dA, the gap between the two boxes in px */
    const dA = avoid ? Math.hypot(Math.max(0, avoid[0] - (u + hw), (u - hw) - avoid[2]), Math.max(0, avoid[1] - (v + hh), (v - hh) - avoid[3])) * s : 1e9;
    for (const [ex, ey] of [[-1, -1], [0, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [0, 1], [1, 1], [0, 0]]) {
      const x = c + u + ex * hw, y = r + v + ey * hh;
      dF = Math.min(dF, Math.min(x, sh.c - x, y, sh.r - y) * s);
      /* a box the line runs through is never a place for a letter */
      if (psInside(pts, x, y) !== side) cross = true;
      dO = Math.min(dO, dOut(x, y) * s);
    }
    /* 15 from the frame's centre line is 12 clear of its 4.5 stroke; where both clearances cannot be had, the two are balanced */
    /* where every box the part allows is crossed by the line (a part thinner than the letter), the frame is kept clear */
    const sc = flip
      /* a letter keeps the board's frame clear first (a frame line under a halo reads as a broken board), then the traced line */
      ? (dF >= 15 ? (cross ? 500 + Math.min(dF, 40) : dO >= 12 ? 2000 + dO : 1000 + dO) : cross ? -100 + dF : Math.min(dO, dF - 3))
      : cross ? (how === "mark" ? -100 + dOut(c + u, r + v) * s : -100 + Math.min(dF - 3, 20))
      : dF >= 17 && dO >= 12 && dA >= 15 ? 1000 + Math.min(dO, dF - 5, dA - 3) : Math.min(dO, dF - 5, dA - 3);
    /* (a letter in a part thinner than itself sits as deep in its part as it can: on a wrong mark that keeps it away from the chip) */
    if (own && sc > bs) { bs = sc; bu = u; bv = v; }
    if (sc > as) { as = sc; au = u; av = v; }
  }
  /* no place in its own part could even hold the box's centre (a corner sliver): the middle of that part, kept in the square */
  if (bs === -1e9 && !flip) {
    let su = 0, sv = 0, sn = 0;
    for (let i = 0; i < 24; i++) for (let j = 0; j < 24; j++) { const u = (i + 0.5) / 24, v = (j + 0.5) / 24; if (psInside(pts, c + u, r + v) === inside) { su += u; sv += v; sn++; } }
    if (sn) { bu = Math.max(hw, Math.min(1 - hw, su / sn)); bv = Math.max(hh, Math.min(1 - hh, sv / sn)); }
  }
  /* a letter whose own part is too small to hold it (a sliver, a thin half) goes to the clearest place in its square */
  let res: any = flip && bs < 1000 && as > bs ? [au, av, as] : [bu, bv, bs];
  if (!tight && how !== "chip" && bs < (flip ? 2012 : 12)) {
    const t2 = psSpot(sid, c, r, inside, bw, bh, s, how, avoid, true);
    if (t2[2] > res[2] + 3) res = t2;   /* only for a real gain: the grid line keeps its 8 px otherwise */
  }
  return (PS_SPOT[k] = res);
}
const psCount = (sh: any, k: string) => sh.k.split("").filter((x: string) => x === k).length;

/* One entry per phase = one mount. `act` names what the child does on the squared paper; `warm` is the guide steps' own
   small outline (never question 1's); each item names its `sheet`, its misconception's number (`near`) and its win line. */
const PHASES = [
  {
    n: 1,
    concept: "Trace and count",
    conceptId: "M2.S3.T7.C30", objectiveIds: ["O11"],
    act: "count", warm: "w1", nudge: "Tap every whole square first.",
    says: ["Tap each whole square once. Give it a number as you go."],
    steps: [
      { say: "Tap a whole square inside this leaf, and the pencil numbers it.", on: "count", hint: "Tap a square that is all inside the line.", at: [1, 1] },
      { say: "Tap the next whole square to give it the next number.", on: "count", hint: "Pick a whole square that has no number yet.", at: [2, 1] },
      { say: "Tap the last whole square, so each whole square has a number.", on: "count", hint: "Find the whole square still without a number.", at: [3, 1] },
    ],
    ladder: ["Point at each pencil number in turn, starting from 1.", "Find the biggest number the pencil wrote on the leaf."],
    closing: "Number the whole squares first, so no square is counted twice.",
    learned: "You learned: number the whole squares first, so none is counted twice.",
    traceback: "each row of whole squares is lit in turn with its count, and the Whole line of the tally ends on the total",
    items: [
      /* learn PS1: answer in the plan = 18 whole squares (a traced leaf with rows of 2, 7, 5 and 4 whole squares) */
      { qid: "M2.S3.T7.C30:PS1", kind: "count", sheet: "la", near: 19, win: "Yes, 18 whole squares, each numbered once.",
        say: "How many whole squares does this leaf hold, if you number each as you tap it?", ask: "How many whole squares?",
        answer: 18, miss: "Count only the squares that have a pencil number." },
      /* practice 1: answer in the plan = 3 + 6 + 5 = 14, so 14 whole squares (rows of 3, 6 and 5) */
      { qid: "M2.S3.T7.C30:1", kind: "count", sheet: "lb", near: 15, win: "Yes, 14 whole squares.",
        say: "How many whole squares does this second leaf hold?", ask: "Whole squares here?",
        answer: 14, miss: "The squares the line cuts have no number, so leave them out." },
      /* authored (the plan has two phase-1 questions): a smaller leaf, rows of 2, 4, 4 and 2 = 12 whole squares */
      { qid: null, kind: "count", sheet: "lc", near: 13, win: "Yes, 12 whole squares.",
        say: "How many whole squares are inside this small leaf?", ask: "Whole squares inside?",
        answer: 12, miss: "Count the numbers on this small leaf row by row." },
    ],
  },
  {
    n: 2,
    concept: "More than half or less than half",
    conceptId: "M2.S3.T7.C31", objectiveIds: ["O11"],
    act: "mark", warm: "w2", nudge: "Mark every edge square first.",
    says: ["Is more than half of this square inside the line?"],
    steps: [
      { say: "Tap the square the leaf covers most, and it reads M for more than half.", on: "mark", hint: "Tap the square that is mostly inside the line.", at: [1, 1] },
      { say: "Now tap a sliver square once, and it reads M.", on: "mark", hint: "Tap the sliver square the ring is on.", at: [2, 1] },
      { say: "Tap it again for L, less than half.", on: "mark", hint: "Tap the same square again.", at: [2, 1] },
    ],
    ladder: ["Look again at each square you marked L: is most of it outside?", "Put a finger on each M square and count."],
    closing: "More than half inside counts as whole, and less than half is left out.",
    learned: "You learned: more than half counts as whole; less than half is left out.",
    traceback: "each edge square shows the part inside the line against a half line, and gets its right letter; the M count ends the tally",
    items: [
      /* learn PS2: answer in the plan = 7 (7 squares more than half covered, the rest less than half) */
      { qid: "M2.S3.T7.C31:PS2", kind: "mark", sheet: "ld", near: 12, win: "Yes, the 7 M squares add 7 whole squares.",
        say: "Tap once for M, twice for L; how many whole squares do the M squares add?", ask: "Edge squares add?",
        answer: 7, miss: "Look at the edge squares the leaf only just touches." },
      /* practice 2: answer in the plan = As 1 whole square */
      { qid: "M2.S3.T7.C31:2", kind: "ring", sheet: "ld", ring: [3, 0], near: 0, win: "Yes, it counts as 1 whole square.",
        say: "How many whole squares is the ringed square counted as?", ask: "Ringed square counts?",
        answer: 1, miss: "Look at the ringed square again.",
        ladder: ["Is the leaf in more than half of the ringed square?", "Look at the letter in the ringed square."] },
      /* practice 4: answer in the plan = 9. The 9 count as 9, and the less-than-half squares are left out */
      { qid: "M2.S3.T7.C31:4", kind: "mark", sheet: "cup", near: 16, win: "Yes, the cup's edge squares add 9.",
        say: "How many whole squares do the edge squares round this traced cup count for?", ask: "Cup edge squares add?",
        answer: 9, miss: "Look at the squares round the cup that the line cuts." },
    ],
  },
  {
    n: 3,
    concept: "Two halves make one",
    conceptId: "M2.S3.T7.C32", objectiveIds: ["O12"],
    act: "half", warm: "w3", nudge: "Pair the halves first.",
    says: ["Two halves make one whole. Pair them up."],
    steps: [
      { say: "Tap the square cut straight across, side to side, and it reads H.", on: "half", hint: "Tap the square split by the straight edge.", at: [3, 1] },
      { say: "Tap the square cut from corner to corner; it is a half too.", on: "half", hint: "Tap the square the slanting line crosses.", at: [1, 1] },
      { say: "Tap Pair to join the two halves into a whole square.", on: "pair", hint: "Tap the Pair key under the tally." },
    ],
    ladder: ["Point at each bracket and count it.", "Halve the number on the Half line of the tally."],
    closing: "Two halves make a whole, even when the cut runs corner to corner.",
    learned: "You learned: two halves make a whole, even when cut corner to corner.",
    traceback: "a corner-cut square folds along its cut onto its other half, then the pairs are bracketed in turn and the Half pairs line ends on the total",
    items: [
      /* learn PS3: answer in the plan = 5 (an outline cuts 10 squares exactly in half) */
      { qid: "M2.S3.T7.C32:PS3", kind: "half", sheet: "t10", near: 10, win: "Yes, 5 pairs make 5 whole squares.",
        say: "How many whole squares do the half squares of this shape make?", ask: "Halves make?",
        answer: 5, miss: "Join the halves two at a time." },
      /* practice 3: answer in the plan = 7, because two half squares make 1 whole square */
      { qid: "M2.S3.T7.C32:3", kind: "half", sheet: "t14", near: 14, win: "Yes, 14 halves make 7 whole squares.",
        say: "This outline cuts 14 squares in half, so how many whole squares is that?", ask: "14 halves make?",
        answer: 7, miss: "The tally says how many halves; how many pairs is that?" },
      /* practice 5, as a number: the plan asks how a square cut from corner to corner is counted (as a half square);
         here six such squares are paired, so the answer is whole */
      { qid: "M2.S3.T7.C32:5", kind: "half", sheet: "x6", near: 6, win: "Yes, 6 halves make 3 whole squares.",
        say: "How many whole squares do these 6 corner to corner halves come to?", ask: "Corner cuts make?",
        answer: 3, miss: "Fold a corner-cut square along its cut in your mind." },
    ],
  },
  {
    n: 4,
    concept: "An estimate, not exact",
    conceptId: "M2.S3.T7.C33", objectiveIds: ["O12"],
    act: "total", nudge: "Pair the halves first.",
    says: ["Each square is one square centimetre.", "Part squares are only rounded, so the total is about, not exact."],
    ladder: ["Add the Whole line and the More than half line first.", "Then add the Half pairs line, never the Left out line."],
    closing: "So an area found from part squares is an estimate.",
    learned: "You learned: add the kinds by the rules and say about: an estimate.",
    traceback: "the Left out line dims, and the total is rebuilt in steps from the Whole, More than half and Half pairs lines",
    items: [
      /* learn PS4: answer in the plan = About 33 sq. cm (21 whole, 9 more than half, 6 half) */
      { qid: "M2.S3.T7.C33:PS4", kind: "total", sheet: "hand", near: 44, win: "Yes, the hand covers about 33 squares.",
        say: "After pairing the halves, what is the area of this traced hand in squares?", ask: "Area of the hand?",
        answer: 33, miss: "Look at the Left out line: does it belong in the total?" },
      /* practice 6: answer in the plan = The 4 half squares make 2. 13 + 5 + 2 = 20, so the leaf is about 20 sq. cm */
      { qid: "M2.S3.T7.C33:6", kind: "total", sheet: "lf", near: 27, win: "Yes, the leaf covers about 20 squares.",
        say: "Once its halves are paired, roughly what area does this leaf cover?", ask: "Area of the leaf?",
        answer: 20, miss: "Is the Half line counted as halves, or as pairs?" },
      /* practice 8: answer in the plan = 16 + 7 + 3 = 26, so the stone is about 26 sq. cm (the less-than-half squares left out).
         practice 7 (is it exact? No) is not used: it has no whole-number answer, and the phase keeps three questions */
      { qid: "M2.S3.T7.C33:8", kind: "total", sheet: "stone", near: 33, win: "Yes, the stone covers about 26 squares.",
        say: "About how many squares does this traced stone cover?", ask: "Area of the stone?",
        answer: 26, miss: "Check each line of the tally against the squares." },
    ],
  },
];

/* The numbers the working area needs (they go into the sidecar too): 1 square = 1 sq. cm */
/* answerGate: the sidecar's note on the answer gate (PATTERNS 19). The Answer key and the keypad stay shut, in user mode after
   the child's first real tap on a square or the Pair key, until the question's act is done; a missed answer counts as done. */
const MODEL = { unit: "1 square = 1 sq. cm", sheets: PS_SHEETS, pairs: PS_PAIRS,
  answerGate: {
    acts: {
      "phase 1, questions 1-3": "number every whole square (a tap on each; the pencil writes its number)",
      "phase 2, questions 1 and 3": "mark every edge square M or L (a tap on each)",
      "phase 3, questions 1-3": "pair every half square (the Pair key, once a pair)",
      "phase 4, questions 1-3": "pair every half square (the Pair key, once a pair)",
    },
    ungated: ["phase 2, question 2 (C31:2): a recall about the ringed square, nothing to do on the paper"],
    nudge: "while shut the bubble says the phase's nudge line once, and the question again when the act is done",
    agent: "the agent's check() does the act at once, so AI mode and toolApi runs are never gated",
  } };

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */
const judge = (item: any, v: any) => leadNumber(v) === item.answer;
/* oracle: a second route. It works out every square's kind again from the outline itself (its own curve, its own
   exact square-by-square area, no code shared with the picture or judge), checks it against the sheet, then counts
   each answer from those kinds by the textbook's rules. */
function orPoints(sh: any) {
  if (sh.pg) return sh.pg.map((p: any) => [p[0], p[1]]);
  const out: any[] = [];
  if (sh.el) { for (let i = 0; i < sh.el[4]; i++) { const a = (2 * Math.PI * i) / sh.el[4]; out.push([sh.el[0] + sh.el[2] * Math.cos(a), sh.el[1] + sh.el[3] * Math.sin(a)]); } return out; }
  const q = sh.sp, m = q.length;
  for (let i = 0; i < m; i++) for (let k = 0; k < 16; k++) {
    const t = k / 16, t2 = t * t, t3 = t2 * t;
    const w = [-0.5 * t3 + t2 - 0.5 * t, 1.5 * t3 - 2.5 * t2 + 1, -1.5 * t3 + 2 * t2 + 0.5 * t, 0.5 * t3 - 0.5 * t2];
    let x = 0, y = 0;
    for (let j = 0; j < 4; j++) { const p = q[(i - 1 + j + m) % m]; x += w[j] * p[0]; y += w[j] * p[1]; }
    out.push([x, y]);
  }
  return out;
}
function orArea(poly: any[], x0: number, y0: number) {
  let P = poly;
  const cut = (inside: (p: any) => boolean, hit: (a: any, b: any) => any) => {
    const R: any[] = [];
    P.forEach((b: any, i: number) => { const a = P[(i + P.length - 1) % P.length]; if (inside(b)) { if (!inside(a)) R.push(hit(a, b)); R.push(b); } else if (inside(a)) R.push(hit(a, b)); });
    P = R;
  };
  const atX = (X: number) => (a: any, b: any) => [X, a[1] + ((b[1] - a[1]) * (X - a[0])) / (b[0] - a[0])];
  const atY = (Y: number) => (a: any, b: any) => [a[0] + ((b[0] - a[0]) * (Y - a[1])) / (b[1] - a[1]), Y];
  cut((p) => p[0] >= x0, atX(x0)); if (P.length) cut((p) => p[0] <= x0 + 1, atX(x0 + 1));
  if (P.length) cut((p) => p[1] >= y0, atY(y0)); if (P.length) cut((p) => p[1] <= y0 + 1, atY(y0 + 1));
  let s = 0; P.forEach((b: any, i: number) => { const a = P[(i + P.length - 1) % P.length]; s += a[0] * b[1] - b[0] * a[1]; });
  return Math.abs(s) / 2;
}
function orKinds(sh: any) {
  const poly = orPoints(sh), rows: string[] = [];
  for (let r = 0; r < sh.r; r++) {
    let row = "";
    for (let c = 0; c < sh.c; c++) {
      const a = orArea(poly, c, r);
      row += a >= 0.995 ? "W" : a <= 0.002 ? "." : sh.h && Math.abs(a - 0.5) <= 0.1 ? "H" : a > 0.5 ? "M" : "L";
    }
    rows.push(row);
  }
  return rows.join("/");
}
const oracle = () => {
  const n = (k: string, sh: any) => sh.k.split("").filter((x: string) => x === k).length;
  const sheetsOk = Object.keys(PS_SHEETS).every((id) => orKinds(PS_SHEETS[id]) === PS_SHEETS[id].k);
  const pairsOk = Object.keys(PS_PAIRS).every((id) => PS_PAIRS[id].length * 2 === n("H", PS_SHEETS[id]) &&
    PS_PAIRS[id].every((pr: any) => pr.every((q: any) => PS_SHEETS[id].k.split("/")[q[1]][q[0]] === "H")));
  const answersOk = PHASES.every((p: any) => p.items.length === 3 && p.items.every((it: any) => {
    const sh = PS_SHEETS[it.sheet];
    if (it.kind === "count") return it.answer === n("W", sh);
    if (it.kind === "mark") return it.answer === n("M", sh);
    if (it.kind === "ring") return sh.k.split("/")[it.ring[1]][it.ring[0]] === "M" && it.answer === 1;
    if (it.kind === "half") return it.answer * 2 === n("H", sh);
    return it.answer === n("W", sh) + n("M", sh) + n("H", sh) / 2;
  }));
  /* the plan's own row sums and counts, typed in from the plan: 2+7+5+4, 3+6+5, 21+9+6/2, 13+5+4/2, 16+7+6/2 */
  const plan = (2 + 7 + 5 + 4 === PHASES[0].items[0].answer) && (3 + 6 + 5 === PHASES[0].items[1].answer) &&
    (21 + 9 + 6 / 2 === PHASES[3].items[0].answer) && (13 + 5 + 4 / 2 === PHASES[3].items[1].answer) && (16 + 7 + 6 / 2 === PHASES[3].items[2].answer);
  return sheetsOk && pairsOk && answersOk && plan;
};
/* the misconception: counting a square twice (phase 1), counting every touched square (2), a half as a whole (3),
   adding the Left out squares (4) */
const nearMiss = (item: any) => (item.near !== undefined ? item.near : item.answer + 1);
const answerForms = (item: any) => [String(item.answer), indian(item.answer), words(item.answer)];
const agentKey = (item: any) => item.answer;

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => (T.state().stage === "demo" ? HOOK.demo && HOOK.demo() : T.submit(item.answer));
const answer = (item: any, v: any) => undefined;
/* the agent's check(): does the question's act at once (numbers, marks, pairs), then Enter */
const check = () => (HOOK.check ? HOOK.check() : undefined);

/* ── the working area ──────────────────────────────────────────────────────────────────────── */
const PS_FREE = [{ id: "la", label: "Leaf" }, { id: "cup", label: "Cup" }, { id: "stone", label: "Stone" }, { id: "rect", label: "Grid" }];
const PS_CYCLE: any = { "": "M", M: "H", H: "L", L: "" };
function Work({ phase, n, item, index, stage, wrong, typed, api, step, stepOn, box, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();
  const P = PHASES[n - 1] as any;
  const free = stage === "free";
  const warm = !free && !!P.steps && (stage === "demo" || stage === "teach");
  const it: any = warm || free ? null : item;
  const mode = free ? "free" : warm ? P.act : it.kind === "ring" ? "ring" : P.act;
  const [freeId, setFreeId] = useState("la");
  const sid = free ? freeId : warm ? P.warm : it.sheet;
  const sh = PS_SHEETS[sid], pts = PS_OUT[sid], look = PS_LOOK[sh.look];
  const cells = psCells(sh);
  const pairs = PS_PAIRS[sid] || [];
  const given = mode === "total" || mode === "ring";
  const qk = n + "|" + (free ? "free:" + freeId : warm ? "warm" : index);
  const fresh = () => ({ qk, nums: {} as any, seq: 0, marks: {} as any, pairs: 0, grow: 0, flash: null as any, last: null as any, touched: false, tr: 0, missed: false, acting: false, fixed: [] as any[] });
  const [raw, setRaw] = useState<any>(null);
  const S = raw && raw.qk === qk ? raw : fresh();
  const put = (f: any) => setRaw((p: any) => f(p && p.qk === qk ? p : fresh()));
  const busy = useRef(false);
  const tracing = useRef(false);
  /* a second tap on the same control within 400 ms is one tap (a double tap, or reduced motion where an act ends at once) */
  const lastTap = useRef({ id: "", t: 0 });
  const openAt = useRef(0);
  /* a square takes a second tap 150 ms on (only a bounce is one tap: "tap twice for L" must work at a child's pace); Pair keeps 600 ms */
  const dbl = (id: string) => { const t = Date.now(), o = lastTap.current; lastTap.current = { id, t }; return o.id === id && t - o.t < (id === "pair" ? 600 : 150); };

  const H = box && box.h ? box.h : 520;
  /* the guide steps' small outline is drawn on the question's own squared paper, at its size and place */
  const ref = warm ? PS_SHEETS[P.items[0].sheet] : sh;
  const L = psLay(ref, H), s = L.s, fx = L.gx, fy = L.gy;
  const gx = fx + Math.floor((ref.c - sh.c) / 2) * s, gy = fy + Math.floor((ref.r - sh.r) / 2) * s;
  const cx = (c: number) => gx + (c + 0.5) * s, cy = (r: number) => gy + (r + 0.5) * s;
  const d = psPath(pts, gx, gy, s);
  const nW = psCount(sh, "W"), nM = psCount(sh, "M"), nH = psCount(sh, "H"), nL = psCount(sh, "L");
  /* a figure along the grid lines has no part squares: its count is its area, with no "about" */
  const exact = !/[MHL]/.test(sh.k);
  const edge = cells.filter((q: any) => q.k === "M" || q.k === "L");
  const wCells = cells.filter((q: any) => q.k === "W");
  const markOf = (q: any) => (given ? (q.k === "W" || q.k === "." ? "" : q.k) : S.marks[q.id] || "");
  const nNum = Object.keys(S.nums).length;
  const actDone = mode === "count" ? nNum >= nW : mode === "mark" ? edge.every((q: any) => S.marks[q.id]) : mode === "half" || mode === "total" ? S.pairs >= pairs.length : true;
  const progress = nNum * 1000 + Object.keys(S.marks).length * 10 + S.pairs;
  const won = !free && !warm && (stage === "win" || stage === "idle");
  const trN = mode === "count" ? sh.k.split("/").filter((row: string) => row.includes("W")).length + 1
    : mode === "mark" ? edge.length + 1 : mode === "ring" ? 2 : mode === "half" ? pairs.length + 2 : 5;
  const showTr = !free && !warm && !!wrong && stage === "ask" && S.tr > 0;
  const trEnd = showTr && S.tr >= trN;
  const trPlaying = showTr && !trEnd;
  const fsz = Math.max(T.micro, Math.round(s * 0.36));
  const numSize = Math.max(T.micro, Math.round(s * 0.5));

  /* the acts: the pencil writes a number, the hand taps a mark in, the pencil draws a pair's bracket */
  const writeNum = (q: any) => {
    if (busy.current) return;
    busy.current = true;
    const k = S.seq + 1;
    put((b: any) => ({ ...b, acting: true }));
    api.act({ tool: "pencil", moves: "write", text: String(k), at: [{ x: cx(q.c), y: cy(q.r) + numSize * 0.36 }], size: numSize, align: "middle" })
      .then((ok: boolean) => {
        busy.current = false;
        put((b: any) => ({ ...b, acting: false }));
        if (!ok) return;
        put((b: any) => (b.nums[q.id] ? { ...b, touched: true } : { ...b, touched: true, seq: b.seq + 1, nums: { ...b.nums, [q.id]: b.seq + 1 } }));
        if (warm) api.did("count");
      });
  };
  /* the M / L (free play: M, H, L) cycle answers each tap at once, with no hand act: a hand act takes the board away for about a second,
     and a child's double tap (150 to 400 ms) then lost its second tap, so "tap twice for L" did not work */
  const cycleMark = (q: any, next: (cur: string) => string, name: string) => {
    put((b: any) => { const m = { ...b.marks }, to = next(m[q.id] || ""); if (to) m[q.id] = to; else delete m[q.id]; return { ...b, marks: m, last: q.id, touched: true }; });
    api.sfx.tick();
    if (warm) api.did(name);
  };
  const tapMark = (q: any, to: string, name: string) => {
    if (busy.current) return;
    busy.current = true;
    put((b: any) => ({ ...b, acting: true }));
    api.act({ tool: "hand", moves: "tap", at: [{ x: cx(q.c), y: cy(q.r) }] }).then((ok: boolean) => {
      busy.current = false;
      put((b: any) => ({ ...b, acting: false }));
      if (!ok) return;
      put((b: any) => { const m = { ...b.marks }; if (to) m[q.id] = to; else delete m[q.id]; return { ...b, marks: m, last: q.id, touched: true }; });
      if (warm) api.did(name);
    });
  };
  const bracket = (pr: any) => {
    const [a, b] = pr, ax = cx(a[0]), ay = cy(a[1]), bx = cx(b[0]), by = cy(b[1]);
    const mx = (ax + bx) / 2, my = (ay + by) / 2, ox = gx + (sh.c * s) / 2, oy = gy + (sh.r * s) / 2;
    let nx = -(by - ay), ny = bx - ax;
    const len = Math.hypot(nx, ny) || 1;
    nx /= len; ny /= len;
    if ((mx - ox) * nx + (my - oy) * ny < 0) { nx = -nx; ny = -ny; }
    const k = s * 0.32, qx = mx + nx * k, qy = my + ny * k, out: any[] = [];
    for (let i = 0; i <= 8; i++) { const t = i / 8; out.push([(1 - t) * (1 - t) * ax + 2 * (1 - t) * t * qx + t * t * bx, (1 - t) * (1 - t) * ay + 2 * (1 - t) * t * qy + t * t * by]); }
    return out;
  };
  const pressPair = (real = false) => {
    if (real && dbl("pair")) return;
    /* a Pair tap in the first 700 ms of a question is the tail of a double tap from before it opened */
    if (real && !warm && !free && Date.now() - openAt.current < 700) return;
    if (tracing.current) return;
    if (warm) {
      if (stepOn !== "pair") { api.did("pair"); return; }
    }
    if (busy.current || S.pairs >= pairs.length || trPlaying || pairOff) return;
    busy.current = true;
    put((b: any) => ({ ...b, grow: 0, acting: true, tr: 0 }));
    const pr = pairs[S.pairs], line = bracket(pr);
    api.act({ tool: "pencil", moves: "draw", marks: true, at: line.map((p: any) => ({ x: p[0], y: p[1] })),
      onPoint: (i: number) => put((b: any) => ({ ...b, grow: i + 1 })) })
      .then((ok: boolean) => {
        busy.current = false;
        if (!ok) { put((b: any) => ({ ...b, grow: 0, acting: false })); return; }
        put((b: any) => {
          const m = { ...b.marks };
          pr.forEach((q: any) => { m[q[0] + "," + q[1]] = "H"; });
          return { ...b, marks: m, pairs: b.pairs + 1, grow: 0, acting: false, touched: true };
        });
        api.sfx.trade();
        if (warm) api.did("pair");
      });
  };
  const tapCell = (q: any, real = false) => {
    if (real && dbl(q.id)) return;
    if (busy.current || trPlaying || tracing.current || won) return;
    /* a tap after the correction has played clears its layer, and the square takes the tap as usual */
    if (showTr) put((b: any) => ({ ...b, tr: 0 }));
    /* in a guide step only the square the step names takes the act; any other square shows the step's hint */
    if (warm && (mode === "mark" || mode === "half")) {
      const t = stepCell();
      if (!t || t.id !== q.id) { api.did("other-square"); return; }
    }
    if (free) {
      if (q.k === "W") { if (!S.nums[q.id]) writeNum(q); return; }
      cycleMark(q, (cur: string) => PS_CYCLE[cur], "free");
      return;
    }
    if (mode === "count") {
      if (q.k !== "W") { put((b: any) => ({ ...b, touched: !warm || b.touched, flash: { id: q.id, kind: "edge" } })); if (warm) api.did("edge"); return; }
      if (S.nums[q.id]) { put((b: any) => ({ ...b, touched: !warm || b.touched, flash: { id: q.id, kind: "again" } })); if (warm) api.did("again"); return; }
      writeNum(q);
      return;
    }
    if (mode === "mark") { cycleMark(q, (cur: string) => (cur === "M" ? "L" : "M"), "mark"); return; }
    if (mode === "half") {
      if (S.marks[q.id] === "H") { if (warm) api.did("again"); return; }
      tapMark(q, "H", "half");
    }
  };
  /* the guide steps' target square, and the act Enter / check() / solve() performs for a step */
  const stepCell = () => {
    const st = P.steps && P.steps[step];
    if (!st || !st.at) return null;
    const at = st.at === "last" ? (S.last ? S.last.split(",").map(Number) : [2, 1]) : st.at;
    return cells.find((q: any) => q.c === at[0] && q.r === at[1]) || null;
  };
  const act = (on: any) => {
    if (on === "pair") { pressPair(); return; }
    let q = stepCell();
    if (on === "count" && (!q || S.nums[q.id])) q = wCells.find((w: any) => !S.nums[w.id]) || null;
    if (q) tapCell(q);
  };
  /* the gate (PATTERNS 19): shut after the child's first real tap until the act is done; a missed answer counts as done */
  const shut = stage === "ask" && !warm && !free && S.touched && !actDone && !S.missed;
  api.onEnter(stage === "demo" && stepOn ? () => act(stepOn) : shut && !S.acting ? () => api.say(P.nudge) : null);
  HOOK.demo = () => act(stepOn);
  /* the agent (never gated): the question's act at once, then Enter */
  HOOK.check = stage === "ask" && !warm ? () => {
    if (!actDone) put((b: any) => {
      if (mode === "count") { const nums = { ...b.nums }; let seq = b.seq; wCells.forEach((w: any) => { if (!nums[w.id]) nums[w.id] = ++seq; }); return { ...b, nums, seq }; }
      if (mode === "mark") { const m = { ...b.marks }; edge.forEach((q: any) => { m[q.id] = q.k; }); return { ...b, marks: m }; }
      const m = { ...b.marks }; pairs.forEach((pr: any) => pr.forEach((q: any) => { m[q[0] + "," + q[1]] = "H"; }));
      return { ...b, marks: m, pairs: pairs.length };
    });
    return undefined;
  } : null;

  /* the answer waits for the act (PATTERNS 19): locked only after the child has touched the board, until the act is done */
  const nudged = useRef(""), reasked = useRef("");
  useEffect(() => {
    if (stage !== "ask" || warm || free || tracing.current) return;
    /* a missed answer counts as the act: its correction drew the whole answer, so the pad is never left shut with nothing to do */
    api.lock(shut);
    /* the slot is emptied when the pad shuts, so a digit typed before the first tap never joins the answer */
    if (shut && nudged.current !== qk) {
      nudged.current = qk;
      /* runtime gap: a hint on show (the Hint key's rung) would stay over the nudge, and a hardware Enter never reaches the
         tool while the pad is shut. The runtime's own openAnswer clears a keyOnly hint; the lock hides the panel at once,
         and closeAnswer 330 ms later empties the built-in "type" line too, so getState().hint matches the bubble */
      const g = (window as any).toolApi && (window as any).toolApi.getState ? (window as any).toolApi.getState() : null;
      if (g && g.hint) {
        api.openAnswer();
        api.lock(true);
        setTimeout(() => { if (nudged.current === qk) api.closeAnswer(); }, 330);
      }
      api.setTyped("");
      api.say(P.nudge);
    }
    if (!shut && actDone && nudged.current === qk && reasked.current !== qk) { reasked.current = qk; api.say(it.say); }
  }, [stage, qk, S.touched, actDone, progress, S.missed]);
  /* a refused tap shows its picture for a moment */
  useEffect(() => {
    if (!S.flash) return;
    const t = setTimeout(() => put((b: any) => ({ ...b, flash: null })), 1500);
    return () => clearTimeout(t);
  }, [S.flash]);
  /* the win line (the phase's last one gives way to the closing line) */
  useEffect(() => {
    if (stage !== "win" || !it) return;
    /* the win always ends on the true working: every whole square numbered, every edge square carrying its TRUE letter
       (a wrong mark is corrected and ringed), every half paired, whatever the child left undone or wrong */
    const fixed = mode === "mark" ? edge.filter((q: any) => S.marks[q.id] && S.marks[q.id] !== q.k).map((q: any) => q.id) : [];
    put((b: any) => {
      if (mode === "count") { const nums = { ...b.nums }; let seq = b.seq; wCells.forEach((w: any) => { if (!nums[w.id]) nums[w.id] = ++seq; }); return { ...b, nums, seq, tr: 0 }; }
      if (mode === "mark") { const m = { ...b.marks }; edge.forEach((q: any) => { m[q.id] = q.k; }); return { ...b, marks: m, fixed, tr: 0 }; }
      if (mode === "half" || mode === "total") { const m = { ...b.marks }; pairs.forEach((pr: any) => pr.forEach((q: any) => { m[q[0] + "," + q[1]] = "H"; })); return { ...b, marks: m, pairs: pairs.length, tr: 0 }; }
      return { ...b, tr: 0 };
    });
    if (it.win) api.say(it.win);
  }, [stage]);
  /* the traceback: the maths redrawn in steps, ending on the whole answer; misses 1 and 2 get the bubble's clue only (the owner, 2026-11-18) */
  useEffect(() => {
    if (!wrong || wrong.tries < 3 || stage !== "ask" || warm || free) return;
    tracing.current = true;
    api.lock(true);
    put((b: any) => ({ ...b, tr: 0, missed: true }));
    const steps: any[] = [[300, null]];
    for (let i = 1; i <= trN; i++) steps.push([mode === "mark" ? 380 : 700, () => put((b: any) => ({ ...b, tr: i }))]);
    tl.run(steps, () => { tracing.current = false; api.lock(false); });
  }, [wrong]);
  useEffect(() => { openAt.current = Date.now(); return () => { tl.stop(); tracing.current = false; }; }, [qk]);

  api.share({ outline: sid, marks: Object.keys(S.marks).length, numbered: nNum, pairs: S.pairs,
    whole: won ? nW : null, more_than_half: won ? nM : null, half: won ? nH : null, left_out: won ? nL : null });

  /* ── drawing ── */
  const counted = (q: any) => {
    if (q.k === "W") return mode === "count" || mode === "free" ? !!S.nums[q.id] || (mode === "count" && won) : true;
    const m = markOf(q);
    return m === "M" || m === "H";
  };
  const tiles = cells.filter(counted);
  const skins = tiles.length <= 40;
  const fillOf = (q: any) => (q.k === "W" && (mode !== "free" || S.nums[q.id]) ? PS_C.vFill : markOf(q) === "H" ? PS_C.pale : PS_C.rFill);
  const ringQ = mode === "ring" ? cells.find((q: any) => q.c === it.ring[0] && q.r === it.ring[1]) : null;
  const flashQ = S.flash ? cells.find((q: any) => q.id === S.flash.id) : null;
  const live = (q: any) => !won && (free ? q.k !== "." : mode === "count" ? q.k !== "." : mode === "mark" ? q.k === "M" || q.k === "L" : mode === "half" ? q.k === "H" : false);
  /* a mark's letter sits in the part of its square it names (psCen), clear of the traced line */
  /* phase 2's own marks are drawn at the 28 floor, so a wrong mark and its correction chip both fit in one square */
  const markSz = mode === "mark" || mode === "ring" ? T.micro : fsz;
  /* a correction chip is on show for this square (phase 2's correction, drawn one square at a time) */
  const chipOn = (q: any) => showTr && (mode === "mark" || mode === "ring") && (mode === "ring" ? ringQ && ringQ.id === q.id : edge.findIndex((e: any) => e.id === q.id) < S.tr && edge.some((e: any) => e.id === q.id));
  const letterAt = (q: any, m: string, bw: number, bh: number, how = "mark", avoid: any = null) => { const p = psSpot(sid, q.c, q.r, m !== "L", bw, bh, s, how, avoid); return [gx + (q.c + p[0]) * s, gy + (q.r + p[1]) * s]; };
  /* a glyph's ink box at size sz (Devanagari and Gujarati letters are wider and taller than M, H, L) */
  const glyphBox = (sz: number) => (lang === "en" ? [sz * 0.78, sz * 0.76] : lang === "hi" ? [sz * 1.1, sz * 1.0] : [sz * 1.1, sz * 1.12]);
  const inviteQ = warm && stepOn && stepOn !== "pair" ? (stepOn === "count" ? wCells.find((w: any) => !S.nums[w.id]) : stepCell()) : null;

  /* the cut direction of a half square: its other half is the mirror image across the cut */
  const foldOf = (q: any) => {
    const t = (u: number, v: number) => psInside(pts, q.c + u, q.r + v);
    const X = cx(q.c), Y = cy(q.r);
    if (t(0.2, 0.5) !== t(0.8, 0.5)) return `matrix(-1,0,0,1,${2 * X},0)`;
    if (t(0.5, 0.2) !== t(0.5, 0.8)) return `matrix(1,0,0,-1,0,${2 * Y})`;
    if (t(0.15, 0.85) !== t(0.85, 0.15)) return `matrix(0,1,1,0,${X - Y},${Y - X})`;
    return `matrix(0,-1,-1,0,${X + Y},${X + Y})`;
  };
  const diag = (q: any) => { const t = (u: number, v: number) => psInside(pts, q.c + u, q.r + v); return t(0.2, 0.5) === t(0.8, 0.5) && t(0.5, 0.2) === t(0.5, 0.8); };

  /* traceback layer */
  const trace = (layer = "front") => {
    if (!showTr) return null;
    const out: any[] = [];
    if (mode === "count" && layer === "front") {
      const rows = sh.k.split("/").map((row: string, r: number) => ({ r, w: [...row].map((k, c) => (k === "W" ? c : -1)).filter((c) => c >= 0) })).filter((o: any) => o.w.length);
      rows.slice(0, Math.min(S.tr, rows.length)).forEach((o: any, j: number) => {
        const c0 = o.w[0], c1 = o.w[o.w.length - 1], here = j === S.tr - 1 && S.tr <= rows.length;
        out.push(<rect key={"tr" + j} x={gx + c0 * s + 3} y={gy + o.r * s + 3} width={(c1 - c0 + 1) * s - 6} height={s - 6} rx={8} fill={PS_C.amber} fillOpacity={here ? 0.35 : 0.16} stroke={PS_C.amber} strokeWidth={here ? 5 : 3} />);
        const bx = gx + (c1 + 1) * s - 4, by = cy(o.r);
        out.push(<g key={"tc" + j}>
          <rect x={bx - 62} y={by - 24} width={56} height={48} rx={12} fill={PS_C.paper} stroke={PS_C.amber} strokeWidth={3} filter="url(#ps-shadow)" />
          <text x={bx - 34} y={by + 11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={PS_C.amberInk}>{o.w.length}</text>
        </g>);
      });
    }
    if (mode === "mark" || mode === "ring") {
      const list = mode === "ring" ? [ringQ] : edge;
      list.slice(0, Math.min(S.tr, list.length)).forEach((q: any, j: number) => {
        const x = gx + q.c * s, y = gy + q.r * s, bw = lang === "gu" ? 38 : lang === "hi" ? 34 : 30, bh = lang === "gu" ? 34 : 30;
        /* a wrong mark's letter stays where the child's letter is drawn; the chip is placed clear of it */
        const cm = mode === "mark" ? S.marks[q.id] : "";
        let av: any = null;
        if (cm && cm !== q.k) { const gb = glyphBox(markSz), w = letterAt(q, cm, gb[0], gb[1]); const u = (w[0] - gx) / s - q.c, v = (w[1] - gy) / s - q.r; av = [u - gb[0] / 2 / s, v - gb[1] / 2 / s, u + gb[0] / 2 / s, v + gb[1] / 2 / s]; }
        const lp = letterAt(q, q.k, bw, bh, "chip", av);
        if (layer === "back") out.push(<g key={"tm" + j}>
          <rect x={x} y={y} width={s} height={s} fill={PS_C.amber} fillOpacity={0.55} mask="url(#ps-out)" />
          {q.k === "M" && <rect x={x} y={y} width={s} height={s} fill={PS_C.rFill} fillOpacity={0.6} clipPath="url(#ps-clip)" />}
          <line x1={x + 4} y1={y + s / 2} x2={x + s - 4} y2={y + s / 2} stroke={PS_C.ink} strokeWidth={3} strokeDasharray="8 6" />
        </g>);
        else out.push(<g key={"tc" + j}>
          <rect x={lp[0] - bw / 2} y={lp[1] - bh / 2} width={bw} height={bh} rx={8} fill={q.k === "M" ? PS_C.pale : PS_C.paper} stroke={q.k === "M" ? PS_C.rose : PS_C.ink} strokeWidth={2.5} />
          <text x={lp[0]} y={lp[1] + (lang === "gu" ? 11 : 9)} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={q.k === "M" ? PS_C.roseInk : PS_C.ink}>{tx(q.k)}</text>
        </g>);
      });
    }
    if ((mode === "half" || mode === "total") && layer === "front") {
      const shift = mode === "half" ? 1 : 0;
      if (mode === "half") {
        const dq = cells.find((q: any) => q.k === "H" && diag(q)) || cells.find((q: any) => q.k === "H");
        if (dq && S.tr === 1) {
          const x = gx + dq.c * s, y = gy + dq.r * s;
          out.push(<g key="fold">
            <rect x={x} y={y} width={s} height={s} fill={PS_C.amber} fillOpacity={0.5} mask="url(#ps-out)" />
            <g transform={foldOf(dq)}><rect x={x} y={y} width={s} height={s} fill={PS_C.amber} fillOpacity={0.5} stroke="none" mask="url(#ps-out)" /></g>
            <rect x={x} y={y} width={s} height={s} fill="none" stroke={PS_C.amber} strokeWidth={5} />
          </g>);
        }
      }
      if (mode === "half") pairs.slice(0, Math.max(0, Math.min(S.tr - shift, pairs.length))).forEach((pr: any, j: number) => {
        pr.forEach((q: any, k: number) => out.push(<rect key={"tp" + j + "." + k} x={gx + q[0] * s} y={gy + q[1] * s} width={s} height={s} fill={PS_C.amber} fillOpacity={0.45} clipPath="url(#ps-clip)" />));
        out.push(<polyline key={"tb" + j} points={bracket(pr).map((p: any) => p.join(",")).join(" ")} fill="none" stroke={PS_C.amberInk} strokeWidth={5} strokeLinecap="round" />);
      });
    }
    return <g pointerEvents="none">{out}</g>;
  };

  /* the tally card: the legend of the marks, the givens, and what the working reaches */
  const end = won || trEnd;
  const rowsOf = () => {
    const nPaired = mode === "total" || mode === "half" ? S.pairs : 0;
    if (mode === "free") {
      const cnt = (k: string) => Object.values(S.marks).filter((m: any) => m === k).length;
      const t = nNum + cnt("M") + Math.floor(cnt("H") / 2);
      return [{ ch: "W", lab: "Whole", v: nNum }, { ch: "M", lab: "More than half", v: cnt("M") }, { ch: "H", lab: "Half", v: cnt("H") },
        { ch: "L", lab: "Left out", v: cnt("L") }, { ch: "T", v: t }];
    }
    if (mode === "count") return [{ ch: "W", lab: "Whole", v: end ? nW : null, tone: "ans" }];
    if (mode === "ring") return [{ ch: "M", lab: "Ringed square", v: end ? 1 : null, tone: "ans" }];
    if (mode === "mark") return [{ ch: "W", lab: "Whole", v: nW, tone: "given" }, { ch: "M", lab: "More than half", v: end ? nM : null, tone: "ans" },
      { ch: "L", lab: "Less than half", v: end ? nL : null }];
    if (mode === "half") return [{ ch: "h", lab: "Half", v: nH, tone: "given" }, { ch: "P", lab: "Half pairs", v: end ? pairs.length : null, tone: "ans" }];
    const dimL = showTr;
    return [{ ch: "W", lab: "Whole", v: nW, tone: "given" }, { ch: "M", lab: "More than half", v: nM, tone: "given" }, { ch: "H", lab: "Half", v: nH, tone: "given" },
      { ch: "P", lab: "Half pairs", v: end ? pairs.length : nPaired || null }, { ch: "L", lab: "Left out", v: nL, tone: "given", dim: dimL },
      { ch: "T", v: end ? nW + nM + nH / 2 : null }];
  };
  const rows = rowsOf();
  /* Pair is off during a phase's teach lines, while a correction plays, once every half is paired, and after the win */
  const pairOff = S.pairs >= pairs.length || trPlaying || tracing.current || won || stage === "teach" || (!free && !warm && stage !== "ask");
  const RH = mode === "total" ? 48 : 54, TH = mode === "total" ? 140 : 76, TX = L.tx;
  /* the letter chips: Gujarati's ઓ and અ are wider than M, H, L */
  const chipW = lang === "gu" ? 46 : 40;
  /* phase 2: a tap marks M and a second tap turns it to L, so the card says so in two short lines under its rows */
  const cycleNote = mode === "mark";
  const cardH = 18 + rows.reduce((a: number, r: any) => a + (r.ch === "T" ? TH : RH), 0) + 12 + (cycleNote ? 100 : 0);
  const keyY = 12 + cardH + 18;
  const chip = (ch: string, x: number, y: number) => {
    if (ch === "W") return <g>
      <rect x={x} y={y} width={34} height={34} rx={8} fill={PS_C.vFill} stroke={PS_C.violet} strokeWidth={2.5} />
      <rect x={x + 2} y={y + 2} width={30} height={13} rx={5} fill="#FFFFFF" fillOpacity={0.25} />
    </g>;
    if (ch === "P") return <g>
      <rect x={x} y={y} width={34} height={34} rx={8} fill={PS_C.pale} stroke={PS_C.rose} strokeWidth={2.5} />
      <rect x={x + 2} y={y + 2} width={30} height={13} rx={5} fill="#FFFFFF" fillOpacity={0.35} />
      <path d={`M ${x + 6} ${y + 26} Q ${x + 17} ${y + 6} ${x + 28} ${y + 26}`} fill="none" stroke={PS_C.ink} strokeWidth={3} strokeLinecap="round" />
    </g>;
    if (ch === "h") return <g>
      <rect x={x} y={y} width={34} height={34} rx={6} fill={PS_C.paper} stroke={PS_C.ink} strokeWidth={2.5} />
      <path d={`M ${x + 2} ${y + 32} L ${x + 32} ${y + 2} L ${x + 32} ${y + 32} Z`} fill={PS_C.pale} stroke={PS_C.rose} strokeWidth={2} />
    </g>;
    return <g>
      <rect x={x - 2} y={y} width={chipW} height={34} rx={8} fill={ch === "L" ? PS_C.paper : PS_C.pale} stroke={ch === "L" ? PS_C.ink : PS_C.rose} strokeWidth={2.5} />
      {ch !== "L" && <rect x={x} y={y + 2} width={chipW - 4} height={13} rx={5} fill="#FFFFFF" fillOpacity={0.35} />}
      <text x={x - 2 + chipW / 2} y={y + 26} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={ch === "L" ? PS_C.ink : PS_C.roseInk}>{tx(ch)}</text>
    </g>;
  };
  const totalSteps = () => {
    /* phase 4's traceback writes the total from the three lines: 21, + 9, + 3, = 33 */
    const parts = [String(nW), "+ " + nM, "+ " + nH / 2, "= " + (nW + nM + nH / 2)];
    return parts.slice(0, Math.max(0, Math.min(4, S.tr - 1)));
  };
  const tally = () => {
    let y = 12 + 18;
    const out: any[] = [
      <g key="card-base">
        <rect x={TX} y={12} width={PS_TW} height={cardH} rx={20} fill={PS_C.paper} filter="url(#ps-card-shadow)" stroke={C.rule} strokeWidth={2.5} />
        <rect x={TX + 3} y={15} width={PS_TW - 6} height={cardH - 6} rx={17} fill="none" stroke="#FFFFFF" strokeWidth={1.5} opacity={0.8} />
      </g>
    ];
    rows.forEach((r: any, j: number) => {
      if (r.ch === "T") {
        const tone = end ? PS_C.green : PS_C.ink;
        const txt = r.v === null || r.v === undefined ? "" : String(r.v);
        const sum = showTr && mode === "total" ? totalSteps() : null;
        out.push(<g key={"t" + j}>
          <line x1={TX + 16} y1={y} x2={TX + PS_TW - 16} y2={y} stroke={PS_C.rule} strokeWidth={2} strokeDasharray="4 4" />
          {!exact && <text x={TX + 16} y={y + 46} fontSize={T.label} fontWeight={700} fill={tone}>{tx("about")}</text>}
          {txt ? <text x={TX + 168} y={y + 48} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={tone}>{txt}</text>
            : <rect x={TX + 132} y={y + 12} width={72} height={46} rx={10} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} />}
          <text x={TX + PS_TW - 16} y={y + 46} textAnchor="end" fontSize={T.label} fontWeight={700} fill={tone}>{tx("sq. cm")}</text>
          {sum ? <g>{sum.map((p: string, k: number) => <text key={k} x={TX + 50 + k * 80} y={y + 86} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={trEnd ? PS_C.green : PS_C.amberInk}>{p}</text>)}</g>
            : null}
          {(won || trEnd) && mode === "total" && <text x={TX + PS_TW / 2} y={y + (sum ? 126 : 92)} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={PS_C.green}>{tx("estimate")}</text>}
        </g>);
        y += TH;
        return;
      }
      const ink = r.dim ? tint(PS_C.ink, 0.5) : r.tone === "given" ? PS_C.blue : r.tone === "ans" && r.v !== null ? PS_C.green : PS_C.ink;
      out.push(<g key={"r" + j} opacity={r.dim ? 0.5 : 1}>
        {chip(r.ch, TX + 16, y + 6)}
        <text x={TX + 14 + chipW + 10} y={y + 32} fontSize={T.label} fontWeight={600} fill={PS_C.ink}>{tx(r.lab)}</text>
        {r.v !== null && r.v !== undefined ? <text x={TX + PS_TW - 12} y={y + 34} textAnchor="end" fontSize={T.prompt} fontWeight={700} fill={ink}>{r.v}</text>
          : <rect x={TX + PS_TW - 12 - 34} y={y + 5} width={34} height={38} rx={8} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} />}
      </g>);
      y += RH;
    });
    if (cycleNote) out.push(<g key="note">
      <line x1={TX + 16} y1={y + 6} x2={TX + PS_TW - 16} y2={y + 6} stroke={C.rule} strokeWidth={2} strokeDasharray="4 4" />
      <text x={TX + 16} y={y + 44} fontSize={T.micro} fontWeight={600} fill={PS_C.ink}>{tx("Tap once for M,")}</text>
      <text x={TX + 16} y={y + 84} fontSize={T.micro} fontWeight={600} fill={PS_C.ink}>{tx("tap twice for L.")}</text>
    </g>);
    return out;
  };
  const keys = () => {
    if (free) return PS_FREE.map((f, j) => {
      const kw = (PS_TW - 14) / 2, x = TX + (j % 2) * (kw + 14), y = keyY + Math.floor(j / 2) * 88;
      return <Key key={"fk" + j} id={"pick-" + f.id} label={tx(f.label)} x={x} y={y} w={kw} h={76} C={C} tone="key" onClick={() => setFreeId(f.id)}>
        <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={toneInk("key", C.ink)}>{tx(f.label)}</text>
      </Key>;
    });
    if (mode !== "half" && mode !== "total") return null;
    const kw = 240, x = TX + (PS_TW - kw) / 2, y = Math.min(keyY, H - 12 - 76), off = pairOff;
    return <g>
      <Key id="pair" label={tx("Pair")} x={x} y={y} w={kw} h={76} C={C} tone="key" disabled={off} onClick={() => pressPair(true)}>
        <text y={12} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={off ? tint(C.ink, 0.45) : toneInk("key", C.ink)}>{tx("Pair")}</text>
      </Key>
      {warm && stepOn === "pair" && <Invite x={x + kw / 2} y={y + 38} w={kw} h={76} rx={RAD.key} C={C} />}
    </g>;
  };

  return (
    <g>
      <defs>
        <clipPath id="ps-clip"><path d={d} /></clipPath>
        <mask id="ps-out" maskUnits="userSpaceOnUse" x={fx - 4} y={fy - 4} width={ref.c * s + 8} height={ref.r * s + 8}>
          <rect x={fx - 4} y={fy - 4} width={ref.c * s + 8} height={ref.r * s + 8} fill="#FFFFFF" />
          <path d={d} fill="#000000" />
        </mask>
        <filter id="ps-shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#1E2022" floodOpacity="0.1" />
        </filter>
        <filter id="ps-card-shadow" x="-5%" y="-5%" width="110%" height="110%">
          <feDropShadow dx="0" dy="6" stdDeviation="10" floodColor="#2B2B2B" floodOpacity="0.08" />
        </filter>
      </defs>
      {/* the squared paper background card */}
      <rect x={fx - 10} y={fy - 10} width={ref.c * s + 20} height={ref.r * s + 20} rx={16} fill="#FFFDF7" filter="url(#ps-shadow)" stroke={PS_C.grid} strokeWidth={1.5} />
      <rect x={fx} y={fy} width={ref.c * s} height={ref.r * s} fill={PS_C.paper} />
      <path d={d} fill={look.fill} opacity={0.95} />
      {look.skin && (() => { const bb = psBox(pts, gx, gy, s), ext = look.skin === "leaf" ? Math.min(bb.w * 0.16, bb.x - gx) : 0;
        /* the hand photo is mirrored so its thumb lies on the same side as the traced thumb */
        if (look.skin === "hand") return <g clipPath="url(#ps-clip)"><g transform={`matrix(-1,0,0,1,${2 * bb.x + bb.w},0)`}>
          <Skin name="hand" x={bb.x} y={bb.y} w={bb.w} h={bb.h} fit="stretch" /></g></g>;
        return <Skin name={look.skin} x={bb.x - ext} y={bb.y} w={bb.w + ext} h={bb.h} fit="stretch" clip="url(#ps-clip)" />; })()}
      {/* the counted squares: a tile in the kind's colour (a whole square violet, more than half rose, a half pale rose) */}
      {tiles.map((q: any) => {
        const x = gx + q.c * s, y = gy + q.r * s, f = fillOf(q), half = markOf(q) === "H";
        /* the tile is the kind's colour at 0.82 over the floor tile and the photo, so a whole square reads VIOLET and a part
           square ROSE (rule 3); a half square is tinted only on its inside half */
        return <g key={"t" + q.id} clipPath={half ? "url(#ps-clip)" : undefined}>
          {skins && <Skin name="cell" x={x + 2} y={y + 2} w={s - 4} h={s - 4} fit="stretch" />}
          <rect x={x} y={y} width={s} height={s} fill={f} fillOpacity={0.92} />
        </g>;
      })}
      {psGrid(ref, fx, fy, s)}
      <path d={d} fill="none" stroke={PS_C.ink} strokeWidth={4.5} strokeLinejoin="round" />
      {/* the pairs' brackets, the one being drawn growing with the pencil's tip */}
      {pairs.slice(0, S.pairs).map((pr: any, j: number) => <polyline key={"br" + j} points={bracket(pr).map((p: any) => p.join(",")).join(" ")} fill="none" stroke={PS_C.ink} strokeWidth={4.5} strokeLinecap="round" />)}
      {S.grow > 1 && S.pairs < pairs.length && <polyline points={bracket(pairs[S.pairs]).slice(0, S.grow).map((p: any) => p.join(",")).join(" ")} fill="none" stroke={PS_C.ink} strokeWidth={4.5} strokeLinecap="round" />}
      {/* a refused tap: the square shows how much of it is inside, the rest lit amber; a second tap lights its number */}
      {flashQ && S.flash.kind === "edge" && <g pointerEvents="none">
        <rect x={gx + flashQ.c * s} y={gy + flashQ.r * s} width={s} height={s} fill="#D9730D" fillOpacity={0.75} mask="url(#ps-out)" />
        <rect x={gx + flashQ.c * s + 2} y={gy + flashQ.r * s + 2} width={s - 4} height={s - 4} fill="none" stroke={PS_C.ink} strokeWidth={4} />
      </g>}
      {/* while the pencil or the hand is acting the squares wait: a light wash says so */}
      {S.acting && <rect x={fx} y={fy} width={ref.c * s} height={ref.r * s} fill={PS_C.paper} fillOpacity={0.22} pointerEvents="none" />}
      {inviteQ && <Invite x={cx(inviteQ.c)} y={cy(inviteQ.r)} w={s - 10} h={s - 10} rx={8} C={C} />}
      {flashQ && S.flash.kind === "again" && <circle cx={cx(flashQ.c)} cy={cy(flashQ.r)} r={s * 0.42} fill={PS_C.amber} fillOpacity={0.45} pointerEvents="none" />}
      {trace("back")}
      {/* the numbers the pencil wrote, and the letters of the marks */}
      {cells.map((q: any) => {
        if (S.nums[q.id]) return <PencilText key={"n" + q.id} text={String(S.nums[q.id])} x={cx(q.c)} y={cy(q.r) + numSize * 0.36} size={numSize} align="middle" />;
        const m = markOf(q);
        if (!m) return null;
        /* in a correction, a square whose chip is on show and whose letter is already right shows the chip alone (one box) */
        if (chipOn(q) && m === q.k) return null;
        const sz = m === "H" ? Math.max(T.micro, Math.min(fsz, Math.round(s * (lang === "en" ? 0.32 : 0.28)))) : markSz, gb = glyphBox(sz);
        /* phase 2's letters stay in their own part, opposite a wrong mark's chip; the hand, stone and free play may use the clearer side */
        const lp = letterAt(q, m, gb[0], gb[1], mode === "total" || mode === "free" ? "free" : "mark");
        return <text key={"m" + q.id} x={lp[0]} y={lp[1] + sz * 0.36} textAnchor="middle" fontSize={sz} fontWeight={700} fill={m === "L" ? PS_C.ink : PS_C.roseInk}
          stroke={PS_C.paper} strokeWidth={8} paintOrder="stroke" strokeLinejoin="round">{tx(m)}</text>;
      })}
      {/* at the win, a mark the child had wrong is shown corrected and ringed */}
      {won && S.fixed.map((id: string) => { const q = cells.find((c: any) => c.id === id); return q ? <rect key={"fx" + id} x={gx + q.c * s + 4} y={gy + q.r * s + 4} width={s - 8} height={s - 8} rx={10} fill="none" stroke={PS_C.amber} strokeWidth={6} pointerEvents="none" /> : null; })}
      {ringQ && <rect x={gx + ringQ.c * s + 3} y={gy + ringQ.r * s + 3} width={s - 6} height={s - 6} rx={10} fill="none" stroke={PS_C.amber} strokeWidth={7} pointerEvents="none" />}
      {trace()}
      {/* the squares the child taps */}
      {cells.filter(live).map((q: any) => <Hit key={"h" + q.id} id={"sq-" + q.c + "-" + q.r} x={gx + q.c * s} y={gy + q.r * s} w={s} h={s} label={"square " + (q.c + 1) + ", " + (q.r + 1)} enabled={!trPlaying && !S.acting} onPress={() => tapCell(q, true)} />)}
      {tally()}
      {keys()}
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase */
function Thumb({ result, it, C, w, h, lang = "en", tx = (v: any) => v }: any) {
  const v = result && result.last ? result.last.value : null;
  if (v === null || v === undefined) return null;
  const item = it || result.last.it || {};
  const sh = PS_SHEETS[item.sheet] || PS_SHEETS.la, pts = PS_OUT[item.sheet] || PS_OUT.la;
  /* the child's own last shape, small: its squares in their kind's colour (whole violet, more than half rose, half pale rose) */
  const s = Math.min((w - 96) / sh.c, (h - 12) / sh.r), x0 = 12, y0 = (h - sh.r * s) / 2;
  const fill: any = { W: PS_C.vFill, M: PS_C.rFill, H: PS_C.pale };
  const cellsT: any[] = [];
  sh.k.split("/").forEach((row: string, r: number) => [...row].forEach((k: string, c: number) =>
    cellsT.push(<rect key={c + "." + r} x={x0 + c * s} y={y0 + r * s} width={s} height={s} fill={fill[k] || "#FFFFFF"} stroke={PS_C.grid} strokeWidth={1} />)));
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      {cellsT}
      <path d={psPath(pts, x0, y0, s)} fill="none" stroke={PS_C.ink} strokeWidth={2} strokeLinejoin="round" />
      <text x={w - 14} y={h / 2 + 12} textAnchor="end" fontSize={T.label} fontWeight={700} fill={PS_C.green}>{String(leadNumber(v))}</text>
    </g>
  );
}

function PartSquares(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, fitHost: () => null,
      board: true,
      keyOnly: true,
      /* the standard 372-wide panel: the squared paper plus the tally card need the full 1086 with the keypad open */
      bigPad: false,
      nextKey: true,
      navDots: true,
      StartArt, START_HOOK,
      }} />
  );
}

export default PartSquares;