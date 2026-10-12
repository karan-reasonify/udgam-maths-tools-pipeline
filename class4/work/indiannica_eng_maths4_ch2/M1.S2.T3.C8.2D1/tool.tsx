/* ═══ M1.S2.T3.C8.2D1 · carry_lab · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists: header + its three controls, canvas, slot + pad, bubble + mascot,
   phase dots (user / AI mode), window.toolApi, sounds, the synced voice, scoring, the events,
   idle and restart. NO imports in this file; only the five host hooks. Follow docs/LAYOUT.md;
   the reference tool is work/indiannica_eng_maths4_ch1/M1.S1.T2.C4.2D1/tool.tsx.
   Edit, never rewrite. Built by `node cli.mjs scaffold`; concepts are verbatim (check compares them). */

const TOOL_ID = "carry_lab";
const MEDIA_ID = "M1.S2.T3.C8.2D1";
const TOOL_NAME = "Carry Lab";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
const VOICE = {"rate":0.92,"pitch":1.06};

/* spoken before phase 1's teach lines only (the plan's opening voice line) */
const OPENING = ["A column that holds more than nine will not close. Watch what leaves it."];
/* the whole-tool line: spoken on the summary page */
const FINISH_LINE = "Every column kept one digit, and every trade landed in the circle it belonged in.";
/* said when the child opens Free play from the summary page (the plan's free-play voice line) */
const FREE_LINE = "Free play. Two numbers or three, slow trade on or off, tokens whenever you want them.";

/* Hindi and Gujarati, keyed by the English line exactly (runtime r13+: `lineFor(line, lang, TR)`); the
   English stays what the checks read. NCERT class 4 terms: इकाई दहाई सैकड़ा हज़ार / એકમ દશક શતક હજાર,
   हासिल / વદી (carry), योज्य / ઉમેરણ (addend), खाना / ખાનું (column). Digits stay digits: the runtime
   speaks them in the language in use. A first draft; wants a native speaker's read. */
const TR: any = {
  hi: {
    "Carry Lab": "हासिल प्रयोगशाला",
    "A column that holds more than nine will not close. Watch what leaves it.": "जिस खाने में नौ से ज़्यादा हों, वह बंद नहीं होता। देखो उसमें से क्या निकलता है।",
    "Every column kept one digit, and every trade landed in the circle it belonged in.": "हर खाने ने एक अंक रखा, और हर बदलाव अपने सही गोले में पहुँचा।",
    "Free play. Two numbers or three, slow trade on or off, tokens whenever you want them.": "मुक्त खेल। दो या तीन संख्याएँ, धीमा बदलाव चालू या बंद, जब चाहो तब टोकन।",
    "Ten of one place make one of the next": "एक स्थान के दस, अगले स्थान का एक",
    "Ten of these make one of those. Say the trade out loud.": "इनके दस मिलकर उसका एक बनाते हैं। यह बदलाव ज़ोर से बोलो।",
    "Now move each full ten to the next column.": "अब हर पूरे दस को अगले खाने में ले जाओ।",
    "How many of them does it take to tie one of the next kind?": "अगले प्रकार का एक बाँधने में इनमें से कितने लगते हैं?",
    "Count out ten and tie them. How many are still standing?": "दस गिनकर उन्हें बाँधो। कितने अब भी खड़े हैं?",
    "Ten of any place trade for one of the place on its left, and that trade is regrouping.": "किसी भी स्थान के दस, बाईं ओर के स्थान के एक से बदलते हैं, इसे पुनर्समूहन कहते हैं।",
    "You learned: ten of any place trade for one of the place on its left.": "तुमने सीखा: किसी भी स्थान के दस, बाईं ओर के स्थान का एक बनते हैं।",
    "Hundreds that stay?": "कितने सैकड़े बचते हैं?",
    "A hundreds column comes to 16 hundreds. Write that as thousands and hundreds. How many hundreds stay?": "सैकड़े के खाने में 16 सैकड़े हैं। इसे हज़ार और सैकड़ों में लिखो। कितने सैकड़े बचते हैं?",
    "How many tokens are standing in the column?": "खाने में कितने टोकन खड़े हैं?",
    "Hundreds left over?": "कितने सैकड़े बचे?",
    "How many thousands are 13 hundreds, and how many hundreds are left over? Type the hundreds left over.": "13 सैकड़े कितने हज़ार हैं, और कितने सैकड़े बचते हैं? बचे हुए सैकड़े लिखो।",
    "After you tie ten hundreds, how many are left?": "दस सैकड़े बाँधने के बाद कितने बचते हैं?",
    "How many ten thousands?": "कितने दस हज़ार?",
    "Write 24 thousands as ten thousands and thousands. How many ten thousands?": "24 हज़ार को दस हज़ार और हज़ार में लिखो। कितने दस हज़ार बनते हैं?",
    "How many full tens of thousands can you tie?": "हज़ारों के कितने पूरे दस बाँध सकते हो?",
    "A column can only keep one digit": "एक खाने में सिर्फ़ एक अंक रहता है",
    "Only one digit fits in a column. What has to leave?": "एक खाने में सिर्फ़ एक अंक आता है। किसे बाहर जाना होगा?",
    "Now move the full ten to the next column.": "अब पूरे दस को अगले खाने में ले जाओ।",
    "Which digit of the total stays in it?": "जोड़ का कौन सा अंक उसमें रहता है?",
    "Tie ten of the tokens. What is still standing in the column?": "दस टोकन बाँधो। खाने में अब भी क्या खड़ा है?",
    "A column keeps its right hand digit and the rest goes into the circle above the next column.": "खाना दाईं ओर का अंक रखता है, और बाकी अगले खाने के ऊपर वाले गोले में जाता है।",
    "You learned: a column keeps its right hand digit; the rest is carried.": "तुमने सीखा: खाना दाईं ओर का अंक रखता है; बाकी हासिल जाता है।",
    "Which digit stays?": "कौन सा अंक रहता है?",
    "Add 38,476 and 24,158, and say what happens in the ones column. Which digit stays there?": "38,476 और 24,158 जोड़ो, और बताओ इकाई के खाने में क्या होता है। वहाँ कौन सा अंक रहता है?",
    "How many squares does a column have?": "एक खाने में कितने डिब्बे होते हैं?",
    "Which digit is written?": "कौन सा अंक लिखा जाता है?",
    "A tens column comes to 15. Which digit is written and which is carried?": "दहाई के खाने में 15 होते हैं। कौन सा अंक लिखा जाता है और कौन सा हासिल जाता है?",
    "Which part of fifteen fits in the square, and which part moves left?": "पंद्रह का कौन सा हिस्सा डिब्बे में आता है, और कौन सा बाईं ओर जाता है?",
    "Which digit stays here?": "यहाँ कौन सा अंक रहता है?",
    "Add 56,847 and 28,375. Type the digit that stays in each column, ones first.": "56,847 और 28,375 जोड़ो। हर खाने में रहने वाला अंक लिखो, पहले इकाई।",
    "Which digit of that column's total do you keep?": "उस खाने के जोड़ का कौन सा अंक तुम रखते हो?",
    "The carried digit joins the next column": "हासिल अगले खाने में जुड़ता है",
    "You carried one. Put it in the next column before you add, not after.": "तुमने एक हासिल लिया। जोड़ने से पहले उसे अगले खाने में रखो, बाद में नहीं।",
    "Has it been counted in yet?": "क्या उसे अभी तक गिना गया है?",
    "Count the circle in with the column's own tokens, then tie ten.": "गोले को खाने के अपने टोकनों के साथ गिनो, फिर दस बाँधो।",
    "The carried digit is added in with its own column, before that column is closed.": "हासिल को उसके अपने खाने के साथ जोड़ा जाता है, खाना बंद होने से पहले।",
    "You learned: the carried digit is added in with its own column.": "तुमने सीखा: हासिल अपने खाने के साथ जोड़ा जाता है।",
    "Add 47,689 and 35,247, and say where each carried digit is added.": "47,689 और 35,247 जोड़ो, और बताओ हर हासिल कहाँ जुड़ता है।",
    "What is standing in the circle above this column?": "इस खाने के ऊपर वाले गोले में क्या है?",
    "Add 1,48,657 and 2,73,486.": "1,48,657 और 2,73,486 जोड़ो।",
    "Did you count the carried one in with this column?": "क्या तुमने हासिल के एक को इस खाने के साथ गिना?",
    "Add 62,958 and 19,647, and say how many columns had to carry.": "62,958 और 19,647 जोड़ो, और बताओ कितने खानों में हासिल गया।",
    "Did the carry join the next column, or was it added at the end?": "क्या हासिल अगले खाने में जुड़ा, या आखिर में जोड़ा गया?",
    "Three addends carry in the same way": "तीन योज्यों में भी हासिल ऐसे ही",
    "Three numbers now. Can the carry be bigger than one?": "अब तीन संख्याएँ। क्या हासिल एक से बड़ा हो सकता है?",
    "How many tens are inside that total?": "उस जोड़ में कितने दस हैं?",
    "Tie ten, then ten again if you can. Count what is left standing.": "दस बाँधो, हो सके तो फिर दस। जो खड़ा बचे उसे गिनो।",
    "Three addends change how big the carried digit can be and nothing else at all.": "तीन योज्यों से सिर्फ़ हासिल का आकार बदलता है, और कुछ भी नहीं।",
    "You learned: with three addends the carried digit can be two.": "तुमने सीखा: तीन योज्यों में हासिल दो भी हो सकता है।",
    "Add 23,478; 14,256; and 31,895.": "23,478; 14,256; और 31,895 जोड़ो।",
    "What did this column come to?": "इस खाने का जोड़ कितना हुआ?",
    "Add 35,216; 42,738; and 11,459.": "35,216; 42,738; और 11,459 जोड़ो।",
    "Did you add all three digits in this column?": "क्या तुमने इस खाने के तीनों अंक जोड़े?",
    "Four goods routes measure 1,428 km, 2,065 km, 1,739 km and 2,214 km. What is their total length?": "माल ढुलाई के चार रास्ते 1,428, 2,065, 1,739 और 2,214 किलोमीटर लंबे हैं। उनकी कुल लंबाई कितनी है?",
    "Did you add all four numbers in each column?": "क्या तुमने हर खाने में चारों संख्याओं के अंक जोड़े?",
    /* the working area's own words */
    "ones": "इकाई", "tens": "दहाई", "hundreds": "सैकड़ा", "thousands": "हज़ार", "ten thousands": "दस हज़ार", "lakhs": "लाख",
    "carried": "हासिल", "closed": "पूरे",
    "Slow trade": "धीमा बदलाव", "Slow trade on": "धीमा बदलाव चालू", "Slow trade off": "धीमा बदलाव बंद",
    "2 numbers": "2 संख्याएँ", "3 numbers": "3 संख्याएँ", "Two numbers": "दो संख्याएँ", "Three numbers": "तीन संख्याएँ",
    "Clear": "मिटाओ", "Clear the answer": "उत्तर मिटाओ",
  },
  gu: {
    "Carry Lab": "વદી પ્રયોગશાળા",
    "A column that holds more than nine will not close. Watch what leaves it.": "જે ખાનામાં નવથી વધુ હોય, તે બંધ થતું નથી. જુઓ તેમાંથી શું નીકળે છે.",
    "Every column kept one digit, and every trade landed in the circle it belonged in.": "દરેક ખાનાએ એક અંક રાખ્યો, અને દરેક બદલાવ પોતાના સાચા વર્તુળમાં પહોંચ્યો.",
    "Free play. Two numbers or three, slow trade on or off, tokens whenever you want them.": "મુક્ત રમત. બે કે ત્રણ સંખ્યા, ધીમો બદલાવ ચાલુ કે બંધ, જ્યારે જોઈએ ત્યારે ટોકન.",
    "Ten of one place make one of the next": "એક સ્થાનના દસ, આગલા સ્થાનનો એક",
    "Ten of these make one of those. Say the trade out loud.": "આના દસ મળીને તેનો એક બને છે. આ બદલાવ મોટેથી બોલો.",
    "Now move each full ten to the next column.": "હવે દરેક પૂરા દસને આગલા ખાનામાં લઈ જાઓ.",
    "How many of them does it take to tie one of the next kind?": "આગલા પ્રકારનો એક બાંધવા આમાંથી કેટલા જોઈએ?",
    "Count out ten and tie them. How many are still standing?": "દસ ગણીને તેમને બાંધો. હજી કેટલા ઊભા છે?",
    "Ten of any place trade for one of the place on its left, and that trade is regrouping.": "કોઈ પણ સ્થાનના દસ, ડાબી બાજુના સ્થાનના એક સાથે બદલાય છે, તેને પુનઃસમૂહન કહે છે.",
    "You learned: ten of any place trade for one of the place on its left.": "તમે શીખ્યા: કોઈ પણ સ્થાનના દસ, ડાબી બાજુના સ્થાનનો એક બને છે.",
    "Hundreds that stay?": "કેટલા શતક રહે છે?",
    "A hundreds column comes to 16 hundreds. Write that as thousands and hundreds. How many hundreds stay?": "શતકના ખાનામાં 16 શતક છે. તેને હજાર અને શતકમાં લખો. કેટલા શતક રહે છે?",
    "How many tokens are standing in the column?": "ખાનામાં કેટલા ટોકન ઊભા છે?",
    "Hundreds left over?": "કેટલા શતક વધ્યા?",
    "How many thousands are 13 hundreds, and how many hundreds are left over? Type the hundreds left over.": "13 શતક કેટલા હજાર છે, અને કેટલા શતક વધે છે? વધેલા શતક લખો.",
    "After you tie ten hundreds, how many are left?": "દસ શતક બાંધ્યા પછી કેટલા વધે છે?",
    "How many ten thousands?": "કેટલા દસ હજાર?",
    "Write 24 thousands as ten thousands and thousands. How many ten thousands?": "24 હજારને દસ હજાર અને હજારમાં લખો. કેટલા દસ હજાર થાય?",
    "How many full tens of thousands can you tie?": "હજારના કેટલા પૂરા દસ બાંધી શકો?",
    "A column can only keep one digit": "એક ખાનામાં ફક્ત એક અંક રહે છે",
    "Only one digit fits in a column. What has to leave?": "એક ખાનામાં ફક્ત એક અંક સમાય છે. શું બહાર જવું પડશે?",
    "Now move the full ten to the next column.": "હવે પૂરા દસને આગલા ખાનામાં લઈ જાઓ.",
    "Which digit of the total stays in it?": "સરવાળાનો કયો અંક તેમાં રહે છે?",
    "Tie ten of the tokens. What is still standing in the column?": "દસ ટોકન બાંધો. ખાનામાં હજી શું ઊભું છે?",
    "A column keeps its right hand digit and the rest goes into the circle above the next column.": "ખાનું જમણી બાજુનો અંક રાખે છે, અને બાકીનું આગલા ખાના ઉપરના વર્તુળમાં જાય છે.",
    "You learned: a column keeps its right hand digit; the rest is carried.": "તમે શીખ્યા: ખાનું જમણી બાજુનો અંક રાખે છે; બાકીની વદી જાય છે.",
    "Which digit stays?": "કયો અંક રહે છે?",
    "Add 38,476 and 24,158, and say what happens in the ones column. Which digit stays there?": "38,476 અને 24,158 ઉમેરો, અને કહો એકમના ખાનામાં શું થાય છે. ત્યાં કયો અંક રહે છે?",
    "How many squares does a column have?": "એક ખાનામાં કેટલા ચોરસ હોય છે?",
    "Which digit is written?": "કયો અંક લખાય છે?",
    "A tens column comes to 15. Which digit is written and which is carried?": "દશકના ખાનામાં 15 થાય છે. કયો અંક લખાય છે અને કયો વદી જાય છે?",
    "Which part of fifteen fits in the square, and which part moves left?": "પંદરનો કયો ભાગ ચોરસમાં સમાય છે, અને કયો ડાબી બાજુ જાય છે?",
    "Which digit stays here?": "અહીં કયો અંક રહે છે?",
    "Add 56,847 and 28,375. Type the digit that stays in each column, ones first.": "56,847 અને 28,375 ઉમેરો. દરેક ખાનામાં રહેતો અંક લખો, પહેલાં એકમ.",
    "Which digit of that column's total do you keep?": "તે ખાનાના સરવાળાનો કયો અંક તમે રાખો છો?",
    "The carried digit joins the next column": "વદી આગલા ખાનામાં ઉમેરાય છે",
    "You carried one. Put it in the next column before you add, not after.": "તમે એક વદી લીધી. ઉમેરતાં પહેલાં તેને આગલા ખાનામાં મૂકો, પછી નહીં.",
    "Has it been counted in yet?": "શું તે હજી સુધી ગણાઈ છે?",
    "Count the circle in with the column's own tokens, then tie ten.": "વર્તુળને ખાનાના પોતાના ટોકન સાથે ગણો, પછી દસ બાંધો.",
    "The carried digit is added in with its own column, before that column is closed.": "વદી પોતાના ખાના સાથે ઉમેરાય છે, ખાનું બંધ થાય તે પહેલાં.",
    "You learned: the carried digit is added in with its own column.": "તમે શીખ્યા: વદી પોતાના ખાના સાથે ઉમેરાય છે.",
    "Add 47,689 and 35,247, and say where each carried digit is added.": "47,689 અને 35,247 ઉમેરો, અને કહો દરેક વદી ક્યાં ઉમેરાય છે.",
    "What is standing in the circle above this column?": "આ ખાના ઉપરના વર્તુળમાં શું છે?",
    "Add 1,48,657 and 2,73,486.": "1,48,657 અને 2,73,486 ઉમેરો.",
    "Did you count the carried one in with this column?": "શું તમે વદીનો એક આ ખાના સાથે ગણ્યો?",
    "Add 62,958 and 19,647, and say how many columns had to carry.": "62,958 અને 19,647 ઉમેરો, અને કહો કેટલાં ખાનાંમાં વદી ગઈ.",
    "Did the carry join the next column, or was it added at the end?": "શું વદી આગલા ખાનામાં ઉમેરાઈ, કે છેલ્લે ઉમેરાઈ?",
    "Three addends carry in the same way": "ત્રણ ઉમેરણમાં પણ વદી એ જ રીતે",
    "Three numbers now. Can the carry be bigger than one?": "હવે ત્રણ સંખ્યા. શું વદી એકથી મોટી હોઈ શકે?",
    "How many tens are inside that total?": "તે સરવાળામાં કેટલા દસ છે?",
    "Tie ten, then ten again if you can. Count what is left standing.": "દસ બાંધો, થઈ શકે તો ફરી દસ. જે ઊભું રહે તે ગણો.",
    "Three addends change how big the carried digit can be and nothing else at all.": "ત્રણ ઉમેરણથી ફક્ત વદી કેટલી મોટી થાય તે બદલાય છે, બીજું કંઈ નહીં.",
    "You learned: with three addends the carried digit can be two.": "તમે શીખ્યા: ત્રણ ઉમેરણમાં વદી બે પણ હોઈ શકે.",
    "Add 23,478; 14,256; and 31,895.": "23,478; 14,256; અને 31,895 ઉમેરો.",
    "What did this column come to?": "આ ખાનાનો સરવાળો કેટલો થયો?",
    "Add 35,216; 42,738; and 11,459.": "35,216; 42,738; અને 11,459 ઉમેરો.",
    "Did you add all three digits in this column?": "શું તમે આ ખાનાના ત્રણેય અંક ઉમેર્યા?",
    "Four goods routes measure 1,428 km, 2,065 km, 1,739 km and 2,214 km. What is their total length?": "માલ લઈ જવાના ચાર રસ્તા 1,428, 2,065, 1,739 અને 2,214 કિલોમીટર લાંબા છે. તેમની કુલ લંબાઈ કેટલી છે?",
    "Did you add all four numbers in each column?": "શું તમે દરેક ખાનામાં ચારેય સંખ્યાના અંક ઉમેર્યા?",
    /* the working area's own words */
    "ones": "એકમ", "tens": "દશક", "hundreds": "શતક", "thousands": "હજાર", "ten thousands": "દસ હજાર", "lakhs": "લાખ",
    "carried": "વદી", "closed": "પૂરાં",
    "Slow trade": "ધીમો બદલાવ", "Slow trade on": "ધીમો બદલાવ ચાલુ", "Slow trade off": "ધીમો બદલાવ બંધ",
    "2 numbers": "2 સંખ્યા", "3 numbers": "3 સંખ્યા", "Two numbers": "બે સંખ્યા", "Three numbers": "ત્રણ સંખ્યા",
    "Clear": "ભૂંસો", "Clear the answer": "જવાબ ભૂંસો",
  },
};

/* ── the column mat ─────────────────────────────────────────────────────────────────────
   The book's column sum: a heading over every column, the addends in deep blue, a rule, and one
   square per column under it for the answer in green. Above every column but the ones sits a small
   circle for the carried digit, in vermilion, with a carry lane under the circles. The column being
   worked stands its tokens from the floor up in ten-frames: a full frame is a ten, and it has to
   leave. Ten tie into one token of the next place, which walks left along the lane into the circle
   above the next column. */
const PLACES = ["ones", "tens", "hundreds", "thousands", "ten thousands", "lakhs"];
const ADDEND = CONTENT.hundred;   /* a number being added: deep blue */
const ANSWER = CONTENT.one;       /* the answer under the rule: green */
const CARRY = CONTENT.pointer;    /* a carried digit: vermilion */
const AMBER = CONTENT.ten;        /* the column or digit under discussion */
const ZERO = "#767676";           /* a zero holding a place open */
const inkOf = (c: string) => shade(c, 0.25);

/* geometry in working-area units (1086 x 528); the ones column is pinned right */
const CW = 160;
const RIGHT = 1066;
const colX = (k: number) => RIGHT - (k + 1) * CW;
const colC = (k: number) => colX(k) + CW / 2;
const CIRC = { y: 30, r: 23 };
const LANE = { y: 64, h: 12 };
const HEAD_TOP = 74;
const SUM_H = 60;
const FGAP = 6;
const range = (a: number, b: number) => Array.from({ length: Math.max(0, b - a) }, (_, i) => a + i);
const digitAt = (v: number, k: number) => Math.floor(v / Math.pow(10, k)) % 10;
const lenOf = (v: number) => String(Math.max(0, Math.trunc(v))).length;
const ownCount = (rows: number[], k: number) => rows.reduce((a, r) => a + digitAt(r, k), 0);

/* rows of the mat for R addends over `cols` columns (free play keeps rows a finger tall) */
const geo = (cols: number, R: number, free = false) => {
  const headH = cols >= 5 ? 58 : 38;
  const rowTop = HEAD_TOP + headH + 4;
  const RH = R === 0 ? 0 : free ? 72 : R <= 2 ? 60 : R === 3 ? 50 : 44;
  const digit = R >= 3 && !free ? T.speech : T.xl;
  const ruleY = rowTop + R * RH + 4;
  const sumTop = R ? ruleY + 10 : rowTop;
  const tokTop = sumTop + SUM_H + 8;
  const floor = R ? 522 : 500;
  const pitch = Math.max(14, Math.min(28, Math.floor((floor - tokTop - 2 * FGAP) / 6)));
  return { cols, R, headH, rowTop, RH, digit, ruleY, sumTop, tokTop, floor, pitch };
};
/* token i of column k: ten-frames of 2 x 5 stacked from the floor, the bottom row of each first */
const tokPos = (g: any, k: number, i: number) => {
  const f = Math.floor(i / 10), j = i % 10, p = g.pitch;
  return { x: colC(k) + ((j % 5) - 2) * p, y: g.floor - f * (2 * p + FGAP) - Math.floor(j / 5) * p - p / 2 };
};
const frameBox = (g: any, k: number, f: number) => {
  const p = g.pitch, top = g.floor - f * (2 * p + FGAP) - 2 * p;
  return { x: colC(k) - 2.5 * p - 5, y: top - 4, w: 5 * p + 10, h: 2 * p + 8 };
};

/* the mat's state, as plain data: the tokens standing in the current column, one square per column
   ({ d, st: "written" by the child | "shown" by a correction }), one circle per column ({ v, st:
   "empty" | "full" (not counted in yet) | "in" (counted into its column) }) and the tally */
const withOwn = (m: any, k: number, count?: number) => ({ ...m, cur: k, stack: range(0, count ?? ownCount(m.rows, k)).map((i) => ({ id: k + "-" + i })) });
const dropIn = (m: any, k: number) => {
  const c = m.circ[k];
  if (!c || !c.v || c.st !== "full") return m;
  const circ = m.circ.slice();
  circ[k] = { ...c, st: "in" };
  return { ...m, circ, stack: [...m.stack, ...range(0, c.v).map((i) => ({ id: "c" + k + "-" + i, carry: true }))] };
};
const tieTen = (m: any) => ({ ...m, stack: m.stack.slice(10) });
const land = (m: any, k: number) => {
  const circ = m.circ.slice();
  circ[k] = { v: (circ[k] ? circ[k].v : 0) + 1, st: "full" };
  return { ...m, circ };
};
const writeDigit = (m: any, k: number, st: string, traded: boolean, keep = false) => {
  const sq = m.sq.slice(), was = sq[k];
  sq[k] = { d: m.stack.length, st };
  return { ...m, sq, stack: keep ? m.stack : [], carried: m.carried + (traded && !was ? 1 : 0), closed: m.closed + (was ? 0 : 1) };
};
const markWritten = (m: any, k: number) => {
  const sq = m.sq.slice();
  sq[k] = { ...sq[k], st: "written" };
  return { ...m, sq };
};
/* a column closed at once (the win motion after a whole sum typed right) */
const quickClose = (m: any, k: number) => {
  if (m.sq[k]) return { ...markWritten(m, k), cur: k + 1 };
  const c = m.circ[k] && m.circ[k].st === "full" ? m.circ[k].v : 0;
  const t = (k === m.cur ? m.stack.length : ownCount(m.rows, k)) + c;
  const circ = m.circ.slice(), sq = m.sq.slice();
  if (c) circ[k] = { ...circ[k], st: "in" };
  if (t >= 10) circ[k + 1] = { v: Math.floor(t / 10), st: "full" };
  sq[k] = { d: t % 10, st: "written" };
  return { ...m, circ, sq, stack: [], cur: k + 1, carried: m.carried + (t >= 10 ? 1 : 0), closed: m.closed + 1 };
};
const setupOf = (it: any) => {
  if (it.kind === "free") return { kind: "free", cols: 4, rows: it.rows, R: it.rows.length, place: 0, auto: true };
  if (it.kind === "trade") {
    const rows = it.rows || [];
    return { kind: "trade", cols: it.cols || Math.max(...rows.map(lenOf)), rows, R: rows.length, place: it.place,
      n: rows.length ? ownCount(rows, it.place) : it.n, want: it.want, auto: true };
  }
  return { kind: "sum", cols: Math.max(lenOf(it.answer), ...it.rows.map(lenOf)), rows: it.rows, R: it.rows.length, place: 0, auto: !!it.auto };
};
const startMat = (s: any) => withOwn({ cols: s.cols, rows: s.rows, cur: s.place, stack: [], sq: range(0, s.cols).map(() => null),
  circ: range(0, s.cols + 1).map(() => ({ v: 0, st: "empty" })), carried: 0, closed: 0 }, s.place, s.kind === "trade" ? s.n : undefined);
const sumOf = (m: any) => m.sq.map((q: any) => (q ? String(q.d) : "")).reverse().join("");
const FREE_START = { kind: "free", rows: [587, 658] };

/* the misconception of a sum: "drop" forgets every carry, "cap" never carries more than one */
const slipSum = (rows: number[], slip: string) => {
  let carry = 0, out = 0;
  for (let k = 0; k <= Math.max(...rows.map(lenOf)); k++) {
    const t = ownCount(rows, k) + carry;
    out += (t % 10) * Math.pow(10, k);
    carry = slip === "drop" ? 0 : Math.min(1, Math.floor(t / 10));
  }
  return out;
};

/* One entry per phase = one mount.
   says    the teach run, said before anything is asked (numbers are turned into words for the voice)
   ladder  rungs 2 and 3 of the hint ladder (rung 1 is each item's own miss line); never the answer
   closing one closing line for this phase, said once when it goes idle
   learned the summary page's row for this phase: "You learned: ..." (at most 72 characters)
   traceback what the working area redraws after a miss, in one line (for the sidecar)
   armLine said once the child's prediction is set and the full ten waits to be moved (trade items)
   items   kinds: trade  a column already past nine: type what stays (or how many of the next place),
                         Enter, then move the full ten left (a tap moves every ten)
                  sum    a whole column sum worked on the mat: type the digit that stays in each
                         column, ones first (Enter closes the column and the carry walks left); the
                         whole sum typed at once is taken too
                  auto   the carry drops into its column by itself (phase 2); from phase 3 it waits
                         in the circle until it is counted in (a tap on the circle, or the right digit) */
const PHASES = [
  {
    n: 1,
    concept: "Ten of one place make one of the next",
    conceptId: "M1.S2.T3.C8", objectiveIds: ["O3"],
    says: ["Ten of these make one of those. Say the trade out loud."],
    armLine: "Now move each full ten to the next column.",
    /* tries, as the plan writes it: A miss is answered three ways at once and none of them is the answer. First rung, from the item's own miss line: how many tokens are standing in the column? Second rung, the phase's: how many of them does it take to tie one of the next kind? Third rung: ten single tokens only are put in the ones column and the child runs the trade on those. The word pad of place names stays open behind all three. */
    ladder: ["How many of them does it take to tie one of the next kind?", "Count out ten and tie them. How many are still standing?"],
    closing: "Ten of any place trade for one of the place on its left, and that trade is regrouping.",
    /* the summary page's row: "You learned: ..." in at most 72 characters */
    learned: "You learned: ten of any place trade for one of the place on its left.",
    /* the traceback for a miss, in one line (it goes into the sidecar) */
    traceback: "The column stands full again, the child's number spills out of its one square, every token is counted out, ten tie into one of the next place and walk left into its circle, and what stays is written in.",
    items: [
      /* learn ML1: answer in the plan = 1 thousand and 6 hundreds (asked: the hundreds that stay; the thousand walks into its circle) */
      { qid: "M1.S2.T3.C8:ML1", kind: "trade", cols: 4, place: 2, n: 16, want: "stay", answer: 6, winMs: 1300, ask: "Hundreds that stay?",
        say: "A hundreds column comes to 16 hundreds. Write that as thousands and hundreds. How many hundreds stay?", miss: "How many tokens are standing in the column?" },
      /* practice 1: answer in the plan = 1 thousand and 3 hundreds (asked: the hundreds left over) */
      { qid: "M1.S2.T3.C8:1", kind: "trade", cols: 4, place: 2, n: 13, want: "stay", answer: 3, winMs: 1300, ask: "Hundreds left over?",
        say: "How many thousands are 13 hundreds, and how many hundreds are left over? Type the hundreds left over.", miss: "After you tie ten hundreds, how many are left?" },
      /* practice 2: answer in the plan = 2 ten thousands and 4 thousands (asked: the ten thousands) */
      { qid: "M1.S2.T3.C8:2", kind: "trade", cols: 5, place: 3, n: 24, want: "next", answer: 2, winMs: 1300, ask: "How many ten thousands?",
        say: "Write 24 thousands as ten thousands and thousands. How many ten thousands?", miss: "How many full tens of thousands can you tie?" },
    ],
  },
  {
    n: 2,
    concept: "A column can only keep one digit",
    conceptId: "M1.S2.T3.C9", objectiveIds: ["O3"],
    says: ["Only one digit fits in a column. What has to leave?"],
    armLine: "Now move the full ten to the next column.",
    /* tries, as the plan writes it: First rung, from the item: how many squares does a column have? Second rung, the phase's: which digit of the total stays in it? Third rung: a single column is left on the mat with a total past nine standing in tokens, and the child says what stays and what leaves. The number pad stays open. */
    ladder: ["Which digit of the total stays in it?", "Tie ten of the tokens. What is still standing in the column?"],
    closing: "A column keeps its right hand digit and the rest goes into the circle above the next column.",
    /* the summary page's row: "You learned: ..." in at most 72 characters */
    learned: "You learned: a column keeps its right hand digit; the rest is carried.",
    /* the traceback for a miss, in one line (it goes into the sidecar) */
    traceback: "The two digit total is written back under the rule and its left digit stands outside the column; the tokens are counted into a tie of ten, the ten walks into the next circle, and the right hand digit stays.",
    items: [
      /* learn ML2: answer in the plan = The ones column comes to 14, so 4 is written and 1 ten is carried, and the sum is 62,634 */
      { qid: "M1.S2.T3.C9:ML2", kind: "trade", rows: [38476, 24158], place: 0, want: "stay", answer: 4, winMs: 1300, ask: "Which digit stays?",
        say: "Add 38,476 and 24,158, and say what happens in the ones column. Which digit stays there?", miss: "How many squares does a column have?" },
      /* practice 3: answer in the plan = 5 is written in the tens column and 1 is carried to the hundreds */
      { qid: "M1.S2.T3.C9:3", kind: "trade", cols: 3, place: 1, n: 15, want: "stay", answer: 5, winMs: 1300, ask: "Which digit is written?",
        say: "A tens column comes to 15. Which digit is written and which is carried?", miss: "Which part of fifteen fits in the square, and which part moves left?" },
      /* practice 4: answer in the plan = 85,222 */
      { qid: "M1.S2.T3.C9:4", kind: "sum", rows: [56847, 28375], auto: true, slip: "drop", answer: 85222, winMs: 2400, ask: "Which digit stays here?",
        say: "Add 56,847 and 28,375. Type the digit that stays in each column, ones first.", miss: "Which digit of that column's total do you keep?" },
    ],
  },
  {
    n: 3,
    concept: "The carried digit joins the next column",
    conceptId: "M1.S2.T3.C10", objectiveIds: ["O4"],
    says: ["You carried one. Put it in the next column before you add, not after."],
    /* tries, as the plan writes it: First rung, from the item: what is standing in the circle above this column? Second rung, the phase's: has it been counted in yet? Third rung: one column is left on the mat with two digits under it and a filled circle above it, and the child counts the three of them. The number pad stays open. */
    ladder: ["Has it been counted in yet?", "Count the circle in with the column's own tokens, then tie ten."],
    closing: "The carried digit is added in with its own column, before that column is closed.",
    /* the summary page's row: "You learned: ..." in at most 72 characters */
    learned: "You learned: the carried digit is added in with its own column.",
    /* the traceback for a miss, in one line (it goes into the sidecar) */
    traceback: "The column will not close: its outline thickens, the circle above it holds amber, its carry drops in and every token is counted out with it, then ten tie and walk left and the right digit is shown.",
    items: [
      /* learn ML3: answer in the plan = 82,936, with each carried digit added into the next column along with its own digits */
      { qid: "M1.S2.T3.C10:ML3", kind: "sum", rows: [47689, 35247], slip: "drop", answer: 82936, winMs: 2400, ask: "Which digit stays here?",
        say: "Add 47,689 and 35,247, and say where each carried digit is added.", miss: "What is standing in the circle above this column?" },
      /* practice 5: answer in the plan = 4,22,143 */
      { qid: "M1.S2.T3.C10:5", kind: "sum", rows: [148657, 273486], slip: "drop", answer: 422143, winMs: 2400, ask: "Which digit stays here?",
        say: "Add 1,48,657 and 2,73,486.", miss: "Did you count the carried one in with this column?" },
      /* practice 6: answer in the plan = 82,605, and four columns carried (the running count tallies them) */
      { qid: "M1.S2.T3.C10:6", kind: "sum", rows: [62958, 19647], slip: "drop", answer: 82605, winMs: 2400, ask: "Which digit stays here?",
        say: "Add 62,958 and 19,647, and say how many columns had to carry.", miss: "Did the carry join the next column, or was it added at the end?" },
    ],
  },
  {
    n: 4,
    concept: "Three addends carry in the same way",
    conceptId: "M1.S2.T3.C11", objectiveIds: ["O4"],
    says: ["Three numbers now. Can the carry be bigger than one?"],
    /* tries, as the plan writes it: First rung, from the item: what did this column come to? Second rung, the phase's: how many tens are inside that total? Third rung: one column is left on the mat with three digits under it and the child ties its tokens with slow trade on. The number pad stays open. */
    ladder: ["How many tens are inside that total?", "Tie ten, then ten again if you can. Count what is left standing."],
    closing: "Three addends change how big the carried digit can be and nothing else at all.",
    /* the summary page's row: "You learned: ..." in at most 72 characters */
    learned: "You learned: with three addends the carried digit can be two.",
    /* the traceback for a miss, in one line (it goes into the sidecar) */
    traceback: "The sum is worked again column by column: every circle is counted in, ten tie and walk left, and ten again where the column still holds ten, so a circle can take a two; it ends on the whole sum.",
    items: [
      /* learn ML4: answer in the plan = 69,629, and the tens column carries 2 rather than 1 */
      { qid: "M1.S2.T3.C11:ML4", kind: "sum", rows: [23478, 14256, 31895], slip: "cap", answer: 69629, winMs: 2400, ask: "Which digit stays here?",
        say: "Add 23,478; 14,256; and 31,895.", miss: "What did this column come to?" },
      /* practice 7: answer in the plan = 89,413 */
      { qid: "M1.S2.T3.C11:7", kind: "sum", rows: [35216, 42738, 11459], slip: "cap", answer: 89413, winMs: 2400, ask: "Which digit stays here?",
        say: "Add 35,216; 42,738; and 11,459.", miss: "Did you add all three digits in this column?" },
      /* practice 8: answer in the plan = 7,446 km (four addends on the mat) */
      { qid: "M1.S2.T3.C11:8", kind: "sum", rows: [1428, 2065, 1739, 2214], slip: "cap", answer: 7446, winMs: 2400, ask: "Which digit stays here?",
        say: "Four goods routes measure 1,428 km, 2,065 km, 1,739 km and 2,214 km. What is their total length?", miss: "Did you add all four numbers in each column?" },
    ],
  },
];

/* The numbers, rows, sizes and targets the working area needs (they go into the sidecar too). */
const MODEL = {
  columnWidth: CW, places: PLACES,
  tokens: "ten-frames of 2 x 5 under the column being worked, each token the base-ten piece of its place (unit, rod, flat; cube, rod of cubes, flat of cubes; a ten thousand or lakh pile carries its value); a full frame ties into the Block of the next place, its value on its face, which walks into the circle",
  colours: { addend: ADDEND, answer: ANSWER, carry: CARRY, underDiscussion: AMBER, placeHoldingZero: ZERO },
  freePlay: { columns: 4, addends: "two or three numbers up to 999, a digit steps up when tapped", start: FREE_START.rows,
    close: "a tap on the lit column closes it; its carry drops in by itself", slowTrade: "on or off" },
};

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* judge: numbers compare as numbers (a sum typed with or without its commas) */
const judge = (item: any, v: any) => {
  if (v === null || v === undefined || typeof v === "object") return false;
  return leadNumber(v) === item.answer;
};
/* oracle: every answer re-derived by a second route that shares no code with judge or Work:
   a trade by place value (the column's worth, split at the next place), a sum by plain addition */
const oracle = () => PHASES.every((p: any) => p.items.every((it: any) => {
  if (it.kind === "trade") {
    const n = it.rows ? it.rows.reduce((a: number, r: number) => a + Number(String(r).padStart(12, "0").slice(11 - it.place, 12 - it.place)), 0) : it.n;
    const unit = Math.pow(10, it.place), worth = n * unit;
    const stay = Math.floor((worth % (unit * 10)) / unit), next = Math.floor(worth / (unit * 10));
    return it.answer === (it.want === "stay" ? stay : next);
  }
  if (it.kind === "sum") return it.answer === it.rows.reduce((a: number, b: number) => a + b, 0);
  return false;
}));
/* the most likely wrong answer (the misconception); judge must reject it:
   the whole count kept in one column; ten of a place renamed as ten of the next; a carry forgotten;
   a carry never bigger than one */
const nearMiss = (item: any) => {
  if (item.kind === "trade") {
    const n = item.rows ? ownCount(item.rows, item.place) : item.n;
    return item.want === "stay" ? n : Math.floor(n / 10) * 10;
  }
  return slipSum(item.rows, item.slip);
};
/* the forms of an answer that no question, hint or ladder line may print */
const answerForms = (item: any) => [String(item.answer), indian(item.answer), words(item.answer)];
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => item.answer;

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, drv: any) => {
  if (item.kind === "trade") { HOOK.enter(item.answer); setTimeout(() => HOOK.drop && HOOK.drop(), 60); return; }
  return drv.submit(item.answer);
};
/* the agent's answer(): every answer is typed (undefined = the runtime types it) */
const answer = (item: any, v: any) => undefined;
/* the agent's check() before Enter: with a prediction set, it moves every full ten; undefined = press Enter */
const check = () => (HOOK.check ? HOOK.check() : undefined);
/* the slot shows a typed sum with its Indian commas */
const format = (s: any) => (/^\d{4,}$/.test(String(s ?? "")) ? indian(Number(s)) : String(s ?? ""));

/* a token of place k, s across, centred on (0, 0), drawn as the book's base-ten pieces: the ones period
   flat (a unit, a rod of ten, a flat of a hundred), the thousands period the same three made of cubes
   (a cube, a rod of cubes, a flat of cubes). No shadow of its own: a pile shares one. */
function Mini({ k, s, carry, lit }: any) {
  const base = carry ? CARRY : ADDEND, face = carry ? "url(#gPointer)" : "url(#gHundred)";
  const edge = shade(base, 0.3), rule = tint(base, 0.4), h = s / 2;
  const grid = (x0: number, y0: number, w: number, hh: number, nx: number, ny: number) => (
    <g stroke={rule} strokeWidth={0.7}>
      {range(1, nx).map((i) => <line key={"v" + i} x1={x0 + (w * i) / nx} y1={y0} x2={x0 + (w * i) / nx} y2={y0 + hh} />)}
      {range(1, ny).map((i) => <line key={"h" + i} x1={x0} y1={y0 + (hh * i) / ny} x2={x0 + w} y2={y0 + (hh * i) / ny} />)}
    </g>
  );
  /* a piece with depth d: the front face, with its top and right side behind it */
  const box = (x0: number, y0: number, w: number, hh: number, d: number, nx: number, ny: number) => (
    <g>
      <path d={`M ${x0} ${y0 + d} L ${x0 + d} ${y0} L ${x0 + w} ${y0} L ${x0 + w - d} ${y0 + d} Z`} fill={tint(base, 0.35)} stroke={edge} strokeWidth={1.2} />
      <path d={`M ${x0 + w - d} ${y0 + d} L ${x0 + w} ${y0} L ${x0 + w} ${y0 + hh - d} L ${x0 + w - d} ${y0 + hh} Z`} fill={shade(base, 0.12)} stroke={edge} strokeWidth={1.2} />
      <rect x={x0} y={y0 + d} width={w - d} height={hh - d} fill={face} stroke={edge} strokeWidth={1.2} />
      {grid(x0, y0 + d, w - d, hh - d, nx, ny)}
    </g>
  );
  let body: any;
  if (k <= 0) body = <rect x={-h} y={-h} width={s} height={s} rx={Math.max(3, s * 0.2)} fill={face} stroke={edge} strokeWidth={1.5} />;
  else if (k === 1) { const w = s * 0.42; body = <g><rect x={-w / 2} y={-h} width={w} height={s} rx={2} fill={face} stroke={edge} strokeWidth={1.3} />{grid(-w / 2, -h, w, s, 1, 10)}</g>; }
  else if (k === 2) body = <g><rect x={-h} y={-h} width={s} height={s} rx={2} fill={face} stroke={edge} strokeWidth={1.3} />{grid(-h, -h, s, s, 10, 10)}</g>;
  else if (k === 3) body = box(-h, -h, s, s, s * 0.24, 10, 10);
  else if (k === 4) { const w = s * 0.52; body = box(-w / 2, -h, w, s, s * 0.2, 1, 10); }
  else body = box(-h, -s * 0.38, s, s * 0.76, s * 0.26, 10, 1);
  return (
    <g>
      {body}
      {lit && <rect x={-h - 2} y={-h - 2} width={s + 4} height={s + 4} rx={5} fill="none" stroke={AMBER} strokeWidth={3} />}
    </g>
  );
}
/* the one piece of the next place that ten tie into, with its value on its face: the runtime's Block
   (ten, hundred, thousand); a ten thousand and a lakh are tiles of the same kind */
function NextPiece({ k }: any) {
  if (k <= 3) {
    const kind = ["one", "ten", "hundred", "thousand"][Math.max(0, k)], b = BLOCK_SIZE[kind];
    return <Block kind={kind} x={-b.w / 2} y={-b.h / 2} paint="gPointer" base={CARRY} lift />;
  }
  const label = indian(Math.pow(10, k)), w = label.length * 17 + 36, hh = 52, d = 12, edge = shade(CARRY, 0.25);
  return (
    <g>
      <path d={`M ${-w / 2} ${-hh / 2 + d} L ${-w / 2 + d} ${-hh / 2} L ${w / 2} ${-hh / 2} L ${w / 2 - d} ${-hh / 2 + d} Z`} fill={tint(CARRY, 0.35)} stroke={edge} strokeWidth={2} />
      <path d={`M ${w / 2 - d} ${-hh / 2 + d} L ${w / 2} ${-hh / 2} L ${w / 2} ${hh / 2 - d} L ${w / 2 - d} ${hh / 2} Z`} fill={shade(CARRY, 0.12)} stroke={edge} strokeWidth={2} />
      <rect x={-w / 2} y={-hh / 2 + d} width={w - d} height={hh - d} fill="url(#gPointer)" stroke={edge} strokeWidth={2} />
      <text x={-d / 2} y={d / 2 + 10} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill="#FFFFFF" stroke={edge} strokeWidth={3} paintOrder="stroke">{label}</text>
    </g>
  );
}

const CL_CSS = `
.cl-tok{transition:transform 320ms cubic-bezier(.3,.7,.25,1)}
.cl-new{animation:clIn 360ms ease-out both}
@keyframes clIn{from{opacity:0;transform:translateY(-16px)}to{opacity:1;transform:none}}
.cl-tie{stroke-dasharray:900;stroke-dashoffset:900;animation:clTie 420ms ease-out forwards}
@keyframes clTie{to{stroke-dashoffset:0}}
.cl-grab{cursor:grab}
@media (prefers-reduced-motion:reduce){.cl-tok,.cl-fly{transition:none!important}.cl-new,.cl-tie{animation:none}.cl-tie{stroke-dashoffset:0}}
`;

/* ── the working area: 1086 x 528, origin at its top-left ──────────────────────────────── */
function Work({ phase, n, item, index, stage, wrong, api, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();
  const free = stage === "free";
  const [cfg, setCfg] = useState<any>(() => setupOf(item));
  const [m, setM] = useState<any>(() => startMat(setupOf(item)));
  const mRef = useRef<any>(m);
  const put = (x: any) => { mRef.current = x; setM(x); };
  /* the mat as each column became the current one: a correction starts that column from here */
  const snapAt = useRef<any>(null);
  if (snapAt.current === null) snapAt.current = { [m.cur]: m };
  const [fly, setFly] = useState<any>(null);          /* a tied ten (or a carry) on its way */
  const [tie, setTie] = useState(false);               /* the band around the full ten */
  const [counted, setCounted] = useState(0);           /* tokens counted out so far (a correction) */
  const [thick, setThick] = useState(false);           /* the column that will not close */
  const [amber, setAmber] = useState(-1);              /* a circle not counted in yet */
  const [lit, setLit] = useState<number[]>([]);        /* headings lit */
  const [stray, setStray] = useState<any>(null);       /* the child's two digits, back under one column */
  const [armed, setArmed] = useState(false);           /* trade: the prediction is set, the ten waits */
  const [pred, setPred] = useState<any>(null);
  const [revealed, setRevealed] = useState(false);     /* trade: the trade has been shown */
  const [touched, setTouched] = useState(false);
  const [slowOn, setSlowOn] = useState(false);         /* free play: slow trade */
  const setupFor = useRef(0);
  const busy = tl.busy;
  const kind = cfg.kind;
  const g = geo(cfg.cols, cfg.R, kind === "free");
  const place = cfg.place;
  const mid = g.floor - g.pitch;                       /* the middle of the bottom frame */
  const tick = () => api.sfx.tick();
  const digitsIn = (v: any) => String(v ?? "").replace(/[^0-9]/g, "");

  const reset = (it: any) => {
    tl.stop();
    const s = setupOf(it), x = startMat(s);
    setCfg(s); put(x); snapAt.current = { [x.cur]: x };
    setFly(null); setTie(false); setCounted(0); setThick(false); setAmber(-1); setLit([]); setStray(null);
    setArmed(false); setPred(null); setRevealed(false); setTouched(false);
    api.lock(false);
  };
  useEffect(() => {
    if (stage === "ask" && setupFor.current !== index) { setupFor.current = index; reset(item); }
  }, [stage, index]);
  /* free play (the plan's freePlay): two or three numbers the child sets by tapping their digits, the
     columns closed one by one with a tap, carries dropping in by themselves; nothing to get right */
  useEffect(() => {
    if (!free) return;
    setupFor.current = -2;
    reset(FREE_START);
  }, [free]);

  /* ── motion, computed ahead as snapshots of the mat ── */
  /* the carry in the circle above column k drops into the column: it is counted in */
  const dropSteps = (x: any, k: number, sl: number) => {
    const c = x.circ[k], after = dropIn(x, k), top = tokPos(g, k, x.stack.length);
    return {
      S: [
        [40, () => setFly({ x: colC(k), y: CIRC.y, ms: 0, n: c.v, kind: k })],
        [Math.round(460 * sl), () => setFly({ x: colC(k), y: top.y, ms: Math.round(440 * sl), n: c.v, kind: k })],
        [60, () => { setFly(null); put(after); tick(); }],
      ], m: after,
    };
  };
  /* close column k: its carry in, then every full ten ties into one and walks left along the lane
     into the circle above the next column, and the digit that stays is written */
  const closeSteps = (x0: any, k: number, o: any) => {
    const sl = o.slow || 1, S: any[] = [];
    const s = (ms: number, fn: any) => S.push([Math.round(ms * sl), fn]);
    let x = x0;
    if (x.circ[k] && x.circ[k].st === "full" && x.circ[k].v > 0) { const d = dropSteps(x, k, sl); S.push(...d.S); x = d.m; }
    let traded = !!o.traded;
    while (x.stack.length >= 10) {
      traded = true;
      const tied = tieTen(x), landed = land(tied, k + 1);
      s(520, () => setTie(true));
      /* ten become one piece of the next place, which rises to the lane, walks one column left and
         settles into the circle there */
      s(420, () => { setTie(false); setCounted(0); put(tied); setFly({ x: colC(k), y: mid - 20, ms: 0, kind: k + 1, big: true }); });
      s(470, () => setFly({ x: colC(k), y: LANE.y + 40, ms: Math.round(450 * sl), kind: k + 1, big: true }));
      s(760, () => setFly({ x: colC(k + 1), y: LANE.y + 40, ms: Math.round(740 * sl), kind: k + 1, big: true }));
      s(380, () => setFly({ x: colC(k + 1), y: CIRC.y, ms: Math.round(360 * sl), kind: k + 1, big: true, sc: 0.4 }));
      s(200, () => { setFly(null); put(landed); tick(); });
      x = landed;
    }
    const w = writeDigit(x, k, o.st, traded, !!o.keep);
    s(420, () => { if (o.beforeWrite) o.beforeWrite(); put(w); tick(); });
    return { S, m: w };
  };
  /* column k becomes the current one: its own tokens stand (and, in phase 2, its carry drops in) */
  const fillSteps = (x0: any, k: number, auto: boolean, sl = 1) => {
    let x = withOwn(x0, k);
    const a = x, S: any[] = [[Math.round(320 * sl), () => { put(a); if (a.stack.length) tick(); }]];
    if (auto && x.circ[k] && x.circ[k].st === "full" && x.circ[k].v > 0) { const d = dropSteps(x, k, sl); S.push(...d.S); x = d.m; }
    snapAt.current[k] = x;
    return { S, m: x };
  };
  const countSteps = (nTok: number, ms: number) => range(1, nTok + 1).map((i) => [ms, () => setCounted(i)]);

  /* ── a sum: the child closes the columns one by one ── */
  const expectOf = (x: any, k: number) => (x.sq[k] ? x.sq[k].d : (ownCount(x.rows, k) + (x.circ[k] ? x.circ[k].v : 0)) % 10);
  const closeAndNext = (k: number) => {
    let x = mRef.current, S: any[] = [];
    const sl = kind === "free" && slowOn ? 1.9 : 1;
    if (x.sq[k]) { x = markWritten(x, k); const w = x; S.push([80, () => put(w)]); }
    else { const r = closeSteps(x, k, { st: "written", slow: sl }); S = r.S; x = r.m; }
    const nk = k + 1;
    const more = nk < x.cols && (ownCount(x.rows, nk) > 0 || (x.circ[nk] && x.circ[nk].v > 0) || !!x.sq[nk]);
    if (more && x.sq[nk]) { x = { ...x, cur: nk }; const w = x; S.push([60, () => put(w)]); }
    else if (more) { const f = fillSteps(x, nk, cfg.auto, sl); S.push(...f.S); x = f.m; }
    else x = { ...x, cur: x.cols };
    const end = x, isFree = kind === "free";
    setTouched(true); api.lock(true);
    tl.run(S, () => {
      put(end);
      if (isFree) return;
      api.setTyped("");
      if (end.cur >= end.cols) api.submit(sumOf(end));
      else api.lock(false);
    });
  };
  const inLive = kind === "sum" && !cfg.auto && stage === "ask" && !busy && m.cur < m.cols && !!m.circ[m.cur] && m.circ[m.cur].st === "full" && m.circ[m.cur].v > 0;
  const countIn = () => {
    if (!inLive) return;
    const d = dropSteps(mRef.current, mRef.current.cur, 1);
    setTouched(true); api.lock(true);
    tl.run(d.S, () => { put(d.m); api.lock(false); });
  };

  /* ── a trade: predict, then move the full ten ── */
  const looseLive = kind === "trade" && stage === "ask" && armed && !revealed && !busy && m.stack.length >= 10;
  const tradeAll = () => {
    if (!looseLive) return;
    const r = closeSteps(mRef.current, place, { st: "written", keep: true }), p = pred;
    api.lock(true);
    tl.run(r.S, () => { put(r.m); setRevealed(true); setArmed(false); api.submit(p); });
  };
  const tradeOne = (pt: any) => {
    if (!looseLive) return;
    const tied = tieTen(mRef.current), landed = land(tied, place + 1), p = pred;
    const S: any[] = [
      [300, () => { put(tied); setFly({ x: pt.x, y: pt.y, ms: 0, kind: place + 1, big: true }); }],
      [480, () => setFly({ x: colC(place + 1), y: LANE.y + 40, ms: 460, kind: place + 1, big: true })],
      [380, () => setFly({ x: colC(place + 1), y: CIRC.y, ms: 360, kind: place + 1, big: true, sc: 0.4 })],
      [80, () => { setFly(null); put(landed); tick(); }],
    ];
    let end = landed, last = false;
    if (landed.stack.length < 10) { const r = closeSteps(landed, place, { st: "written", keep: true, traded: true }); S.push(...r.S); end = r.m; last = true; }
    api.lock(true);
    tl.run(S, () => { put(end); if (last) { setRevealed(true); setArmed(false); api.submit(p); } });
  };
  const drag = useDrag((payload: any, p: any, moved: boolean) => {
    if (!payload || payload.src !== "ten") return;
    if (!moved) { tradeAll(); return; }                         /* a tap: every ten goes where it belongs */
    if (p.x < colC(place) - 50 || p.y < HEAD_TOP) tradeOne(p);   /* let go elsewhere: it simply goes back */
  });

  /* ── free play ── */
  const freeSet = (rows: number[]) => {
    if (busy) return;
    const s = { ...cfg, rows, R: rows.length }, x = startMat(s);
    setCfg(s); put(x); snapAt.current = { 0: x }; setTouched(true); tick();
  };
  const bump = (ri: number, k: number) => {
    const rows = cfg.rows.slice(), d = digitAt(rows[ri], k);
    rows[ri] += (((d + 1) % 10) - d) * Math.pow(10, k);
    freeSet(rows);
  };
  const freeClose = () => { if (!busy && kind === "free" && mRef.current.cur < mRef.current.cols) closeAndNext(mRef.current.cur); };

  /* Enter: a trade takes the prediction and waits for the ten to move; a sum takes one column's digit
     (or the whole sum at once) */
  const enterFn: any =
    stage !== "ask" ? null
      : kind === "trade" ? (v: any) => {
        const s = digitsIn(v);
        if (!s || busy) return;
        if (revealed) { api.submit(s); return; }              /* the trade was shown; a retry commits directly */
        if (armed) return;
        api.setTyped(s); setPred(s); setArmed(true); setTouched(true); api.lock(true);
        /* phase.armLine is one of api.say("Now move each full ten to the next column.") or
           api.say("Now move the full ten to the next column."), written out here so `node cli.mjs voice` bakes them */
        if (phase.armLine) api.say(phase.armLine);
      }
        : kind === "sum" ? (v: any) => {
          const s = digitsIn(v);
          if (!s || busy) return;
          if (s.length >= 3) { api.submit(s); return; }
          const x = mRef.current, k = x.cur;
          if (k >= x.cols || Number(s) !== expectOf(x, k)) { api.submit(s); return; }   /* a miss: the column is shown again */
          closeAndNext(k);
        }
          : null;
  api.onEnter(enterFn);
  HOOK.enter = (v?: any) => enterFn && enterFn(v);
  HOOK.drop = () => tradeAll();
  HOOK.check = () => (looseLive ? (tradeAll(), true) : undefined);

  /* ── the win: a sum typed whole is written into the mat, column by column ── */
  useEffect(() => {
    if (stage !== "win" || kind !== "sum") return;
    let x = mRef.current;
    const S: any[] = [];
    for (let k = 0; k < x.cols; k++) {
      if (x.sq[k] && x.sq[k].st === "written") continue;
      x = quickClose(x, k);
      const w = x;
      S.push([220, () => { put(w); tick(); }]);
    }
    if (S.length) tl.run(S);
  }, [stage]);

  /* ── the traceback: the mathematics redrawn in steps, ending on the whole right answer;
        nothing marked, nothing cleared, the child's answer stays in the slot ── */
  const tradeBack = (val: string) => {
    const x0 = startMat(cfg), k = place;
    const S: any[] = [[40, () => { put(x0); setFly(null); setTie(false); setCounted(0); }], [500, null]];
    if (cfg.want === "stay" && val.length >= 2)
      S.push([1300, () => { setStray({ k, s: val }); setLit(range(k + 1, Math.min(cfg.cols, k + val.length))); }]);
    S.push(...countSteps(x0.stack.length, 170), [500, null]);
    const r = closeSteps(x0, k, { st: "shown", keep: true, slow: 1.25, beforeWrite: () => { setStray(null); setLit([]); } });
    return [...S, ...r.S];
  };
  const columnBack = (k: number) => {
    const x0 = snapAt.current[k] || mRef.current;
    const S: any[] = [[40, () => { put(x0); setFly(null); setCounted(0); }], [300, () => setThick(true)]];
    let x = x0;
    if (x.circ[k] && x.circ[k].st === "full" && x.circ[k].v > 0) {
      S.push([700, () => setAmber(k)]);
      const d = dropSteps(x, k, 1.2);
      S.push(...d.S);
      x = d.m;
    }
    S.push(...countSteps(x.stack.length, 160), [500, null]);
    const r = closeSteps(x, k, { st: "shown", slow: 1.15, beforeWrite: () => { setThick(false); setAmber(-1); } });
    return [...S, ...r.S];
  };
  const wholeBack = () => {
    const now = mRef.current, k0 = Math.min(now.cur, now.cols - 1);
    let x = snapAt.current[k0] || now;
    const start = x, S: any[] = [[40, () => { put(start); setFly(null); setCounted(0); }], [500, null]];
    for (let k = k0; k < x.cols; k++) {
      if (x.sq[k] && x.sq[k].st === "written") continue;
      if (k !== k0 || !x.stack.length) {
        if (!ownCount(x.rows, k) && !(x.circ[k] && x.circ[k].v)) break;
        const f = fillSteps(x, k, false, 0.8);
        S.push(...f.S);
        x = f.m;
      }
      if (x.circ[k] && x.circ[k].st === "full" && x.circ[k].v > 0) {
        const kk = k, d = dropSteps(x, k, 0.9);
        S.push([420, () => setAmber(kk)], ...d.S, [120, () => setAmber(-1)]);
        x = d.m;
      }
      const r = closeSteps(x, k, { st: "shown", slow: 0.8 });
      S.push(...r.S);
      x = r.m;
    }
    const end = { ...x, cur: k0 };
    S.push([200, () => put(end)]);
    return S;
  };
  useEffect(() => {
    if (!wrong || stage !== "ask") return;
    api.lock(true);
    setTouched(true); setArmed(false);
    const val = digitsIn(wrong.value);
    const S = kind === "trade" ? tradeBack(val)
      : kind === "sum" ? (val.length > 0 && val.length <= 2 ? columnBack(Math.min(mRef.current.cur, cfg.cols - 1)) : wholeBack())
        : [];
    tl.run(S, () => {
      setThick(false); setAmber(-1); setCounted(0); setLit([]); setStray(null); setFly(null); setTie(false);
      if (kind === "trade") setRevealed(true);
      api.lock(false);
    });
  }, [wrong]);

  /* ── what the host and the agent read back (toolApi.getState); only what the child has written ── */
  const written: string[] = [];
  for (let k = 0; k < m.cols && m.sq[k] && m.sq[k].st === "written"; k++) written.unshift(String(m.sq[k].d));
  api.share({
    columns: m.cols, addends: cfg.rows, tokens: m.stack.length, current: m.cur < m.cols ? PLACES[m.cur] : null,
    carries: m.circ.slice(1, m.cols).map((c: any) => c.v), columnDone: m.sq.map((q: any) => !!(q && q.st === "written")),
    sum: written.length ? written.join("") : null, carryCount: m.carried, columnsClosed: m.closed, complete: stage === "idle",
  });

  /* ── drawing ── */
  const cols = m.cols;
  const left = colX(cols - 1);
  const curK = kind === "trade" ? place : m.cur;
  const showCur = curK < cols && stage !== "idle" && stage !== "summary";
  const circles = kind === "trade" ? [place + 1] : range(1, cols);
  const squares = kind === "trade" ? [place] : range(0, cols);
  const dragging = !!(drag.drag && drag.drag.moved && drag.drag.payload && drag.drag.payload.src === "ten");
  const bodyTop = HEAD_TOP + g.headH + 4;
  const frames = Math.max(1, Math.ceil(m.stack.length / 10));
  const rowBase = (ri: number) => g.rowTop + ri * g.RH + g.RH / 2 + g.digit * 0.36;
  const headText = (k: number) => (lang === "en" && PLACES[k] === "ten thousands" ? ["ten", "thousands"] : [tx(PLACES[k])]);   /* one line fits in hi/gu */
  const invite =
    looseLive && !dragging ? { x: colC(place), y: mid, r: Math.min(64, 526 - mid) }
      : inLive ? { x: colC(m.cur), y: CIRC.y, r: 28 }
        : free && !touched && !busy && m.cur < cols ? { x: colC(m.cur), y: mid, r: Math.min(64, 526 - mid) }
          : null;

  return (
    <g>
      <style>{CL_CSS}</style>

      {/* running count, in the runs zone (64,108): columns that carried, columns closed */}
      <g data-zone="runs">
        <rect x={0} y={-94} width={330} height={76} rx={RAD.panel} fill="url(#gPanel)" stroke={C.rule} strokeWidth={2} />
        <text x={20} y={-40} fontSize={T.speech} fontWeight={700} fill={C.ink}>{m.carried}</text>
        <text x={54} y={-45} fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("carried")}</text>
        <text x={182} y={-40} fontSize={T.speech} fontWeight={700} fill={C.ink}>{m.closed}</text>
        <text x={216} y={-45} fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("closed")}</text>
      </g>

      {/* the carry lane, under the circles */}
      <rect x={left + 14} y={LANE.y - LANE.h / 2} width={RIGHT - left - 28} height={LANE.h} rx={6} fill={tint(C.rule, 0.5)} />

      {/* the columns: heading and body */}
      {range(0, cols).map((k) => {
        const on = (showCur && k === curK) || lit.includes(k);
        const x = colX(k), lines = headText(k);
        const outline = showCur && k === curK ? (thick ? AMBER : shade(AMBER, 0.1)) : C.rule;
        return (
          <g key={"col" + k}>
            <rect x={x + 4} y={bodyTop} width={CW - 8} height={g.floor + 6 - bodyTop} rx={16} fill="#FFFFFF"
              stroke={outline} strokeWidth={showCur && k === curK ? (thick ? 8 : 3) : 1.5} />
            <rect x={x + 4} y={HEAD_TOP} width={CW - 8} height={g.headH} rx={12}
              fill={on ? tint(AMBER, 0.6) : tint(C.panel, 0.3)} stroke={on ? AMBER : C.rule} strokeWidth={on ? 3 : 1.5} />
            {lines.map((ln, j) => (
              <text key={j} x={colC(k)} y={HEAD_TOP + g.headH / 2 + 10 + (j - (lines.length - 1) / 2) * 26} textAnchor="middle"
                fontSize={T.micro} fontWeight={600} fill={C.ink}>{ln}</text>
            ))}
          </g>
        );
      })}

      {/* the addends, a digit to a column; the plus sign; the rule */}
      {cfg.rows.map((r: number, ri: number) => range(0, cols).map((k) => {
        if (!(kind === "free" ? k < 3 : k < lenOf(r))) return null;
        const d = digitAt(r, k);
        return (
          <text key={"a" + ri + "-" + k} x={colC(k)} y={rowBase(ri)} textAnchor="middle" fontSize={g.digit} fontWeight={700}
            fill={d === 0 ? ZERO : inkOf(ADDEND)}>{d}</text>
        );
      }))}
      {g.R >= 2 && <text x={left - 26} y={rowBase(g.R - 1)} textAnchor="middle" fontSize={g.digit} fontWeight={600} fill={C.ink}>+</text>}
      {g.R > 0 && <rect x={left - 52} y={g.ruleY} width={RIGHT - left + 44} height={6} rx={3} fill={C.ink} />}

      {/* one square per column for the digit that stays */}
      {squares.map((k) => {
        const q = m.sq[k], on = showCur && k === curK;
        return (
          <g key={"sq" + k}>
            <rect x={colC(k) - 30} y={g.sumTop + 1} width={60} height={SUM_H - 2} rx={12} fill="#FFFFFF" stroke={on ? C.accent : C.rule} strokeWidth={on ? 3 : 2} />
            {q && !(stray && stray.k === k) && (
              <text x={colC(k)} y={g.sumTop + SUM_H / 2 + T.xl * 0.36} textAnchor="middle" fontSize={T.xl} fontWeight={700}
                fill={q.d === 0 && k < cols - 1 ? ZERO : inkOf(ANSWER)}>{q.d}</text>
            )}
          </g>
        );
      })}

      {/* the child's number written back under one column: its left digits stand outside it */}
      {stray && String(stray.s).split("").reverse().map((ch: string, j: number) => {
        const k = stray.k + j;
        if (k >= cols) return null;
        return (
          <g key={"st" + j}>
            {j > 0 && <rect x={colC(k) - 30} y={g.sumTop + 1} width={60} height={SUM_H - 2} rx={12} fill="none" stroke={C.ink} strokeWidth={2} strokeDasharray="7 6" />}
            <text x={colC(k)} y={g.sumTop + SUM_H / 2 + T.xl * 0.36} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={C.ink}>{ch}</text>
          </g>
        );
      })}

      {/* the carry circles: none above the ones column, since nothing comes from its right */}
      {circles.map((k) => {
        const c = m.circ[k] || { v: 0, st: "empty" }, am = amber === k;
        return (
          <g key={"ci" + k}>
            <circle cx={colC(k)} cy={CIRC.y} r={CIRC.r} fill={c.st === "in" ? tint(CARRY, 0.86) : "#FFFFFF"}
              stroke={am ? AMBER : c.st === "full" ? CARRY : C.rule} strokeWidth={am ? 6 : c.st === "full" ? 3 : 2} strokeDasharray={c.v ? undefined : "5 5"} />
            {c.v > 0 && <text x={colC(k)} y={CIRC.y + 11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={inkOf(CARRY)}>{c.v}</text>}
          </g>
        );
      })}

      {/* the tokens standing in the column being worked, in ten-frames from the floor */}
      {showCur && range(0, frames).map((f) => {
        const b = frameBox(g, curK, f), full = f === 0 && m.stack.length >= 10;
        return <rect key={"fr" + f} x={b.x} y={b.y} width={b.w} height={b.h} rx={10} fill="none"
          stroke={full ? AMBER : C.rule} strokeWidth={full ? 3 : 2} strokeDasharray={f === 0 ? undefined : "6 6"} />;
      })}
      {curK < cols && (
        <g filter="url(#fShadowSoft)">
          {m.stack.map((t: any, i: number) => {
            if (dragging && i < 10) return null;
            const p = tokPos(g, curK, i);
            return (
              <g key={t.id} className="cl-tok" style={{ transform: `translate(${p.x}px, ${p.y}px)` } as any}>
                <g className="cl-new"><Mini k={curK} s={g.pitch - 5} carry={t.carry} lit={i < counted} /></g>
              </g>
            );
          })}
        </g>
      )}
      {/* a ten thousand or a lakh has no block of its own in the box: the pile's top carries its value */}
      {curK >= 4 && curK < cols && m.stack.length > 0 && (() => {
        const label = indian(Math.pow(10, curK)), base = tokPos(g, curK, m.stack.length - 1).y - g.pitch / 2 - 14, w = label.length * 14.5 + 20;
        if (base - 30 < g.sumTop + SUM_H + 6) return null;
        return (
          <g>
            <rect x={colC(curK) - w / 2} y={base - 30} width={w} height={40} rx={10} fill="#FFFFFF" stroke={shade(ADDEND, 0.1)} strokeWidth={2} />
            <text x={colC(curK)} y={base} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={inkOf(ADDEND)}>{label}</text>
          </g>
        );
      })()}
      {counted > 0 && curK < cols && (
        <text x={colC(curK) - 2.5 * g.pitch - 16} y={mid + 11} textAnchor="end" fontSize={T.label} fontWeight={700} fill={C.ink}>{counted}</text>
      )}

      {/* ten tie into one */}
      {tie && (() => { const b = frameBox(g, curK, 0); return (
        <rect className="cl-tie" x={b.x - 3} y={b.y - 3} width={b.w + 6} height={b.h + 6} rx={14} fill={AMBER} fillOpacity={0.14} stroke={AMBER} strokeWidth={5} />
      ); })()}

      {/* the full ten the child moves (a tap moves every ten) */}
      {looseLive && !dragging && (() => {
        const b = frameBox(g, place, 0), pay = { src: "ten" }, y0 = b.y - 10, y1 = Math.min(528, b.y + b.h + 8);
        return (
          <g className="cl-grab c4-piece" {...control("loose", "Move the full ten to the next column")} {...drag.bind(pay)} {...drag.keys(pay)}>
            <rect x={b.x - 6} y={y0} width={b.w + 12} height={Math.max(76, y1 - y0)} fill="transparent" />
          </g>
        );
      })()}
      {dragging && (() => {
        const d = drag.drag, p = Math.min(g.pitch, 26), sz = p - 5;
        return (
          <g pointerEvents="none" transform={`translate(${d.x},${d.y})`}>
            <rect x={-2.5 * p - 2} y={-p + 2} width={5 * p + 12} height={2 * p + 12} rx={12} fill={C.ink} fillOpacity={0.16} />
            <rect x={-2.5 * p - 6} y={-p - 6} width={5 * p + 12} height={2 * p + 12} rx={12} fill={tint(AMBER, 0.75)} stroke={AMBER} strokeWidth={4} />
            {range(0, 10).map((i) => (
              <g key={i} transform={`translate(${((i % 5) - 2) * p},${(Math.floor(i / 5) - 0.5) * p})`}><Mini k={place} s={sz} /></g>
            ))}
          </g>
        );
      })()}

      {/* a tied ten, or a carry, on its way */}
      {fly && (
        <g className="cl-fly" pointerEvents="none"
          style={{ transform: `translate(${fly.x}px, ${fly.y}px) scale(${fly.sc || 1})`, transition: `transform ${fly.ms || 0}ms ease-in-out` } as any}>
          {fly.big ? <NextPiece k={fly.kind} /> : range(0, fly.n || 1).map((j) => (
            <g key={j} transform={`translate(${(j - ((fly.n || 1) - 1) / 2) * 36},0)`}><Mini k={fly.kind} s={30} carry /></g>
          ))}
        </g>
      )}

      {/* phase 3 on: the carry waits in its circle until it is counted in */}
      {inLive && <Hit id="count-in" label="Count the carried digit in" x={colC(m.cur) - 36} y={0} w={72} h={72} onPress={countIn} />}

      {/* free play: tap a digit to step it up, tap the column to close it */}
      {kind === "free" && free && (
        <g>
          {cfg.rows.map((r: number, ri: number) => range(0, 3).map((k) => (
            <Hit key={"b" + ri + k} id={"digit-" + ri + "-" + k} label={"Change the " + PLACES[k] + " digit of number " + (ri + 1)}
              x={colX(k)} y={g.rowTop + ri * g.RH} w={CW} h={g.RH} onPress={() => bump(ri, k)} />
          )))}
          {!busy && m.cur < cols && (
            <Hit id="close" label={"Close the " + PLACES[m.cur] + " column"} x={colX(m.cur)} y={g.tokTop - 4} w={CW} h={g.floor + 4 - g.tokTop} onPress={freeClose} />
          )}
          <Key id="free-slow" label={tx(slowOn ? "Slow trade off" : "Slow trade on")} x={0} y={196} w={220} h={84} C={C} primary={slowOn}
            onClick={() => { setSlowOn((b) => !b); setTouched(true); }}>
            <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={slowOn ? "#FFFFFF" : C.ink}>{tx("Slow trade")}</text>
          </Key>
          <Key id="free-rows" label={tx(cfg.rows.length === 3 ? "Two numbers" : "Three numbers")} x={0} y={300} w={220} h={84} C={C}
            onClick={() => freeSet(cfg.rows.length === 3 ? cfg.rows.slice(0, 2) : [...cfg.rows, 239])}>
            <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={C.ink}>{tx(cfg.rows.length === 3 ? "2 numbers" : "3 numbers")}</text>
          </Key>
          <Key id="free-clear" label={tx("Clear the answer")} x={0} y={404} w={220} h={84} C={C} onClick={() => freeSet(cfg.rows)}>
            <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={C.ink}>{tx("Clear")}</text>
          </Key>
        </g>
      )}

      {invite && <Invite x={invite.x} y={invite.y} r={invite.r} C={C} />}
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase: the carry in its
   circle beside the digit that stays (a trade), or the sum with its biggest carry */
function Thumb({ n, result, C, w, h }: any) {
  const L = (result && result.last) || {};
  const it = PHASES[(n || 1) - 1] && PHASES[(n || 1) - 1].items[L.item];
  const v = leadNumber(L.value);
  if (!it || v === null) return null;
  let carry = 0, main = v;
  if (it.kind === "trade") {
    const cnt = it.rows ? ownCount(it.rows, it.place) : it.n;
    carry = Math.floor(cnt / 10); main = cnt % 10;
  } else {
    let c = 0;
    for (let k = 0; k < lenOf(it.answer); k++) { c = Math.floor((ownCount(it.rows, k) + c) / 10); carry = Math.max(carry, c); }
  }
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      {carry > 0 && (
        <g>
          <circle cx={38} cy={h / 2} r={22} fill="#FFFFFF" stroke={CARRY} strokeWidth={3} />
          <text x={38} y={h / 2 + 10} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={inkOf(CARRY)}>{carry}</text>
        </g>
      )}
      <text x={w - 18} y={h / 2 + 12} textAnchor="end" fontSize={T.label} fontWeight={700} fill={inkOf(ANSWER)}>{indian(main)}</text>
    </g>
  );
}

function CarryLab(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, format, fitHost: () => null }} />
  );
}

export default CarryLab;
