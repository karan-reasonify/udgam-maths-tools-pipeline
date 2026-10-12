/* ═══ M1.S1.T2.C4.2D1 · place_value_builder · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx is prepended at build, so everything outside the working area already
   exists (header, canvas, slot + pad, bubble, phase bar, sounds, voice, scoring,
   finished/idle/restart). NO imports in this file; only the five host hooks.
   Edit, never rewrite: change the smallest block that does the job.
   Concepts, ids, teach lines, closings and the opening/finish lines are the plan's, verbatim. */

const TOOL_ID = "place_value_builder";
const MEDIA_ID = "M1.S1.T2.C4.2D1";
const TOOL_NAME = "Place Value Builder";
const CHROME = { dim: "#9AA4AC", ink: "#2B2B2B", rule: "#C9BCA6", panel: "#F2E4CE", paper: "#FFFDF7", accent: "#5B6770" };
const VOICE = { rate: 0.92, pitch: 1.06 };

/* spoken before phase 1's teach lines only (the plan's opening voice line) */
const OPENING = ["A chart, a tray of tokens, and one more to drop in."];
/* the whole-tool line: spoken only when the LAST phase finishes */
const FINISH_LINE = "You grew the chart three times, and named every place that opened.";
/* said when the child opens Free play from the summary page (the plan's free-play voice line) */
const FREE_LINE = "Free play. Any tokens, any number, commas on or off.";

/* Hindi and Gujarati, keyed by the English line exactly (runtime r13: `lineFor(line, lang, TR)`); the
   English above and below stays what the checks read. NCERT class 4 terms: इकाई दहाई सैकड़ा हज़ार /
   એકમ દશક શતક હજાર, हासिल / વદી for a carry, आवर्त / આવર્ત for a period. Digits stay digits: the
   runtime speaks them in the language in use. A first draft; wants a native speaker's read. */
const TR: any = {
  hi: {
    "A chart, a tray of tokens, and one more to drop in.": "एक चार्ट, टोकन की एक ट्रे, और डालने के लिए एक और।",
    "You grew the chart three times, and named every place that opened.": "तुमने चार्ट को तीन बार बढ़ाया, और खुलने वाले हर स्थान का नाम बताया।",
    "Free play. Any tokens, any number, commas on or off.": "मुक्त खेल। कोई भी टोकन, कोई भी संख्या, अल्पविराम चालू या बंद।",
    "Add one more. Watch every column, not just the last one.": "एक और जोड़ो। सिर्फ़ आखिरी खाना नहीं, हर खाना देखो।",
    "Nine ones and one more make ten, so the ones column empties and one goes to the tens.": "नौ इकाई और एक और मिलकर दस बनते हैं, इसलिए इकाई का खाना खाली होता है और एक दहाई में जाता है।",
    "The same thing happens at the tens, the hundreds and then the thousands.": "यही दहाई, सैकड़े और फिर हज़ार पर भी होता है।",
    "The last carry has no column to go to, so a ten thousands place opens.": "आखिरी हासिल के लिए कोई खाना नहीं है, इसलिए दस हज़ार का स्थान खुलता है।",
    "What happens to a column the moment it reaches ten?": "जब किसी खाने में दस हो जाते हैं, तब क्या होता है?",
    "Watch it slowly. Count each column up to ten.": "धीरे से देखो। हर खाने को दस तक गिनो।",
    "When the last place is full, adding one more opens a new place.": "जब आखिरी स्थान भर जाता है, तो एक और जोड़ने से नया स्थान खुलता है।",
    "You learned: when the last place is full, one more opens a new place.": "तुमने सीखा: आखिरी स्थान भरने पर एक और से नया स्थान खुलता है।",
    "What will it read?": "यह क्या दिखाएगा?",
    "The chart holds 9999 again. Type what one more will make, then drop it in.": "चार्ट में फिर से 9999 है। एक और से क्या बनेगा, वह लिखो, फिर उसे डालो।",
    "How many tokens are in the ones column now?": "अब इकाई के खाने में कितने टोकन हैं?",
    "Now it holds 9899. What will one more make?": "अब इसमें 9899 है। एक और से क्या बनेगा?",
    "Which columns are full, and which one is not?": "कौन से खाने भरे हैं, और कौन सा नहीं?",
    "A ten drops in. It reads?": "एक दहाई गिरी। अब क्या?",
    "It holds 9990, and this time a ten drops in. What will it read?": "इसमें 9990 है, और इस बार एक दहाई गिरती है। यह क्या दिखाएगा?",
    "Which column does a ten land in?": "एक दहाई किस खाने में आती है?",
    "Build it with the tokens you have.": "तुम्हारे पास जो टोकन हैं, उनसे इसे बनाओ।",
    "How many of those make one of the place to its left?": "इनमें से कितने मिलकर बाईं ओर के स्थान का एक बनाते हैं?",
    "Look at your number and the target, one column at a time.": "अपनी संख्या और लक्ष्य को देखो, एक-एक खाना करके।",
    "A big number is still built out of ones, tens, hundreds and thousands.": "बड़ी संख्या भी इकाई, दहाई, सैकड़ा और हज़ार से ही बनती है।",
    "You learned: a big number is still ones, tens, hundreds and thousands.": "तुमने सीखा: बड़ी संख्या भी इकाई, दहाई, सैकड़ा और हज़ार है।",
    "Build 10,512": "10,512 बनाओ",
    "Build 10,512 with the tokens, then press enter.": "टोकन से 10,512 बनाओ, फिर एंटर दबाओ।",
    "What is the biggest tile in the tray?": "ट्रे में सबसे बड़ी टाइल कौन सी है?",
    "Thousand tiles in 10,000?": "10,000 में हज़ार की टाइलें?",
    "How many thousand tokens did that take?": "इसमें हज़ार के कितने टोकन लगे?",
    "How many can one column hold before it bundles?": "गड्डी बनने से पहले एक खाने में कितने आ सकते हैं?",
    "Build 11,007": "11,007 बनाओ",
    "Build 11,007 with the tokens.": "टोकन से 11,007 बनाओ।",
    "Which places have nothing in them?": "किन स्थानों में कुछ भी नहीं है?",
    "One more again. What is this new place called?": "फिर से एक और। इस नए स्थान का नाम क्या है?",
    "What is written in the next heading to the left?": "बाईं ओर के अगले शीर्षक में क्या लिखा है?",
    "Read the headings from the right, one at a time.": "दाईं ओर से शीर्षक एक-एक करके पढ़ो।",
    "Every rollover opens exactly one new place, and that place has its own name.": "हर बार पलटने पर ठीक एक नया स्थान खुलता है, और उस स्थान का अपना नाम होता है।",
    "You learned: every rollover opens one new place, with its own name.": "तुमने सीखा: हर बार पलटने पर अपने नाम वाला एक नया स्थान खुलता है।",
    "Which place opens?": "कौन सा स्थान खुलेगा?",
    "The chart holds 99,999. Pick the place that will open, then drop the one in.": "चार्ट में 99,999 है। जो स्थान खुलेगा उसे चुनो, फिर एक को डालो।",
    "Count the places from the right. Which comes after ten thousands?": "दाईं ओर से स्थान गिनो। दस हज़ार के बाद कौन सा आता है?",
    "Now it holds 9,99,999. Which place will open this time?": "अब इसमें 9,99,999 है। इस बार कौन सा स्थान खुलेगा?",
    "Which place comes after lakhs?": "लाख के बाद कौन सा स्थान आता है?",
    "It holds 9,99,999 again. What is one more?": "इसमें फिर से 9,99,999 है। एक और से क्या बनेगा?",
    "How many nines will turn over?": "कितने नौ पलट जाएँगे?",
    "Read it in chunks, not digit by digit. Say the name of each chunk.": "इसे अंक-अंक करके नहीं, हिस्सों में पढ़ो। हर हिस्से का नाम बोलो।",
    "How many digits go in the next group?": "अगले समूह में कितने अंक आते हैं?",
    "Look at the bands. Write one comma at each band edge.": "पट्टियों को देखो। हर पट्टी के किनारे पर एक अल्पविराम लगाओ।",
    "Commas mark the periods, and the periods are how a number is read.": "अल्पविराम आवर्त दिखाते हैं, और आवर्तों से ही संख्या पढ़ी जाती है।",
    "You learned: commas mark the periods, and periods are how we read.": "तुमने सीखा: अल्पविराम आवर्त दिखाते हैं, और आवर्तों से हम पढ़ते हैं।",
    "Put in the commas": "अल्पविराम लगाओ",
    "Tap between the columns to put the commas into this number, then press enter.": "इस संख्या में अल्पविराम लगाने के लिए खानों के बीच टैप करो, फिर एंटर दबाओ।",
    "Count three digits in from the right.": "दाईं ओर से तीन अंक गिनो।",
    "Now mark the periods in this number.": "अब इस संख्या में आवर्त चिह्नित करो।",
    "Which three digits make the ones period?": "कौन से तीन अंक इकाई का आवर्त बनाते हैं?",
    "Write it in numerals": "अंकों में लिखो",
    "Write eighty-nine thousand eight hundred ninety in numerals.": "नवासी हज़ार आठ सौ नब्बे को अंकों में लिखो।",
    "Which period does eighty-nine belong to?": "नवासी किस आवर्त में आता है?",
    /* the working area's own words */
    "Place Value Builder": "स्थानीय मान बनाओ",
    "One more than the biggest four digit number": "चार अंकों की सबसे बड़ी संख्या से एक अधिक",
    "Showing a big number with tokens": "टोकन से बड़ी संख्या दिखाना",
    "The chart grows a new place each time": "चार्ट में हर बार एक नया स्थान जुड़ता है",
    "Commas split a number into periods": "अल्पविराम संख्या को आवर्तों में बाँटते हैं",
    "ones": "इकाई", "tens": "दहाई", "hundreds": "सैकड़ा", "thousands": "हज़ार", "ten thousands": "दस हज़ार",
    "lakhs": "लाख", "ten lakhs": "दस लाख", "target": "लक्ष्य", "Periods": "आवर्त", "Commas": "अल्पविराम",
    "Periods on": "आवर्त चालू", "Periods off": "आवर्त बंद", "Commas on": "अल्पविराम चालू", "Commas off": "अल्पविराम बंद",
  },
  gu: {
    "A chart, a tray of tokens, and one more to drop in.": "એક ચાર્ટ, ટોકનની એક ટ્રે, અને નાખવા માટે એક વધુ.",
    "You grew the chart three times, and named every place that opened.": "તમે ચાર્ટને ત્રણ વાર વધાર્યો, અને ખૂલેલા દરેક સ્થાનનું નામ આપ્યું.",
    "Free play. Any tokens, any number, commas on or off.": "મુક્ત રમત. કોઈ પણ ટોકન, કોઈ પણ સંખ્યા, અલ્પવિરામ ચાલુ કે બંધ.",
    "Add one more. Watch every column, not just the last one.": "એક વધુ ઉમેરો. ફક્ત છેલ્લું ખાનું નહીં, દરેક ખાનું જુઓ.",
    "Nine ones and one more make ten, so the ones column empties and one goes to the tens.": "નવ એકમ અને એક વધુ મળીને દસ થાય, તેથી એકમનું ખાનું ખાલી થાય અને એક દશકમાં જાય.",
    "The same thing happens at the tens, the hundreds and then the thousands.": "આવું જ દશક, શતક અને પછી હજારમાં પણ થાય છે.",
    "The last carry has no column to go to, so a ten thousands place opens.": "છેલ્લી વદી માટે કોઈ ખાનું નથી, તેથી દસ હજારનું સ્થાન ખૂલે છે.",
    "What happens to a column the moment it reaches ten?": "કોઈ ખાનામાં દસ થઈ જાય ત્યારે શું થાય છે?",
    "Watch it slowly. Count each column up to ten.": "ધીમેથી જુઓ. દરેક ખાનાને દસ સુધી ગણો.",
    "When the last place is full, adding one more opens a new place.": "જ્યારે છેલ્લું સ્થાન ભરાઈ જાય, ત્યારે એક વધુ ઉમેરવાથી નવું સ્થાન ખૂલે છે.",
    "You learned: when the last place is full, one more opens a new place.": "તમે શીખ્યા: છેલ્લું સ્થાન ભરાય ત્યારે એક વધુથી નવું સ્થાન ખૂલે.",
    "What will it read?": "તે શું બતાવશે?",
    "The chart holds 9999 again. Type what one more will make, then drop it in.": "ચાર્ટમાં ફરી 9999 છે. એક વધુથી શું બનશે તે લખો, પછી તેને નાખો.",
    "How many tokens are in the ones column now?": "હવે એકમના ખાનામાં કેટલા ટોકન છે?",
    "Now it holds 9899. What will one more make?": "હવે તેમાં 9899 છે. એક વધુથી શું બનશે?",
    "Which columns are full, and which one is not?": "કયા ખાનાં ભરેલાં છે, અને કયું નથી?",
    "A ten drops in. It reads?": "એક દશક પડ્યો. હવે શું?",
    "It holds 9990, and this time a ten drops in. What will it read?": "તેમાં 9990 છે, અને આ વખતે એક દશક પડે છે. તે શું બતાવશે?",
    "Which column does a ten land in?": "એક દશક કયા ખાનામાં આવે છે?",
    "Build it with the tokens you have.": "તમારી પાસેના ટોકનથી તેને બનાવો.",
    "How many of those make one of the place to its left?": "આમાંથી કેટલા મળીને ડાબી બાજુના સ્થાનનો એક બને?",
    "Look at your number and the target, one column at a time.": "તમારી સંખ્યા અને લક્ષ્યને જુઓ, એક પછી એક ખાનું.",
    "A big number is still built out of ones, tens, hundreds and thousands.": "મોટી સંખ્યા પણ એકમ, દશક, શતક અને હજારથી જ બને છે.",
    "You learned: a big number is still ones, tens, hundreds and thousands.": "તમે શીખ્યા: મોટી સંખ્યા પણ એકમ, દશક, શતક અને હજાર છે.",
    "Build 10,512": "10,512 બનાવો",
    "Build 10,512 with the tokens, then press enter.": "ટોકનથી 10,512 બનાવો, પછી એન્ટર દબાવો.",
    "What is the biggest tile in the tray?": "ટ્રેમાં સૌથી મોટી ટાઇલ કઈ છે?",
    "Thousand tiles in 10,000?": "10,000 માં હજારની ટાઇલ?",
    "How many thousand tokens did that take?": "તેમાં હજારના કેટલા ટોકન લાગ્યા?",
    "How many can one column hold before it bundles?": "બંડલ બનતા પહેલાં એક ખાનામાં કેટલા રહી શકે?",
    "Build 11,007": "11,007 બનાવો",
    "Build 11,007 with the tokens.": "ટોકનથી 11,007 બનાવો.",
    "Which places have nothing in them?": "કયાં સ્થાનોમાં કશું નથી?",
    "One more again. What is this new place called?": "ફરી એક વધુ. આ નવા સ્થાનનું નામ શું છે?",
    "What is written in the next heading to the left?": "ડાબી બાજુના આગળના મથાળામાં શું લખ્યું છે?",
    "Read the headings from the right, one at a time.": "જમણી બાજુથી મથાળાં એક પછી એક વાંચો.",
    "Every rollover opens exactly one new place, and that place has its own name.": "દરેક વખતે ફરી જતાં બરાબર એક નવું સ્થાન ખૂલે છે, અને તે સ્થાનનું પોતાનું નામ હોય છે.",
    "You learned: every rollover opens one new place, with its own name.": "તમે શીખ્યા: દરેક વખતે પોતાના નામવાળું એક નવું સ્થાન ખૂલે છે.",
    "Which place opens?": "કયું સ્થાન ખૂલશે?",
    "The chart holds 99,999. Pick the place that will open, then drop the one in.": "ચાર્ટમાં 99,999 છે. જે સ્થાન ખૂલશે તે પસંદ કરો, પછી એકને નાખો.",
    "Count the places from the right. Which comes after ten thousands?": "જમણી બાજુથી સ્થાન ગણો. દસ હજાર પછી કયું આવે?",
    "Now it holds 9,99,999. Which place will open this time?": "હવે તેમાં 9,99,999 છે. આ વખતે કયું સ્થાન ખૂલશે?",
    "Which place comes after lakhs?": "લાખ પછી કયું સ્થાન આવે છે?",
    "It holds 9,99,999 again. What is one more?": "તેમાં ફરી 9,99,999 છે. એક વધુથી શું બનશે?",
    "How many nines will turn over?": "કેટલા નવ ફરી જશે?",
    "Read it in chunks, not digit by digit. Say the name of each chunk.": "તેને અંક-અંક નહીં, ભાગમાં વાંચો. દરેક ભાગનું નામ બોલો.",
    "How many digits go in the next group?": "આગળના જૂથમાં કેટલા અંક આવે છે?",
    "Look at the bands. Write one comma at each band edge.": "પટ્ટીઓ જુઓ. દરેક પટ્ટીની કિનારીએ એક અલ્પવિરામ મૂકો.",
    "Commas mark the periods, and the periods are how a number is read.": "અલ્પવિરામ આવર્ત બતાવે છે, અને આવર્તથી જ સંખ્યા વંચાય છે.",
    "You learned: commas mark the periods, and periods are how we read.": "તમે શીખ્યા: અલ્પવિરામ આવર્ત બતાવે છે, અને આવર્તથી આપણે વાંચીએ છીએ.",
    "Put in the commas": "અલ્પવિરામ મૂકો",
    "Tap between the columns to put the commas into this number, then press enter.": "આ સંખ્યામાં અલ્પવિરામ મૂકવા ખાનાંની વચ્ચે ટૅપ કરો, પછી એન્ટર દબાવો.",
    "Count three digits in from the right.": "જમણી બાજુથી ત્રણ અંક ગણો.",
    "Now mark the periods in this number.": "હવે આ સંખ્યામાં આવર્ત દર્શાવો.",
    "Which three digits make the ones period?": "કયા ત્રણ અંક એકમનો આવર્ત બનાવે છે?",
    "Write it in numerals": "અંકોમાં લખો",
    "Write eighty-nine thousand eight hundred ninety in numerals.": "નેવ્યાસી હજાર આઠસો નેવુંને અંકોમાં લખો.",
    "Which period does eighty-nine belong to?": "નેવ્યાસી કયા આવર્તમાં આવે છે?",
    /* the working area's own words */
    "Place Value Builder": "સ્થાનકિંમત બનાવો",
    "One more than the biggest four digit number": "ચાર અંકની સૌથી મોટી સંખ્યાથી એક વધુ",
    "Showing a big number with tokens": "ટોકનથી મોટી સંખ્યા દર્શાવવી",
    "The chart grows a new place each time": "ચાર્ટમાં દર વખતે એક નવું સ્થાન ઉમેરાય છે",
    "Commas split a number into periods": "અલ્પવિરામ સંખ્યાને આવર્તમાં વહેંચે છે",
    "ones": "એકમ", "tens": "દશક", "hundreds": "શતક", "thousands": "હજાર", "ten thousands": "દસ હજાર",
    "lakhs": "લાખ", "ten lakhs": "દસ લાખ", "target": "લક્ષ્ય", "Periods": "આવર્ત", "Commas": "અલ્પવિરામ",
    "Periods on": "આવર્ત ચાલુ", "Periods off": "આવર્ત બંધ", "Commas on": "અલ્પવિરામ ચાલુ", "Commas off": "અલ્પવિરામ બંધ",
  },
};

/* ── the place value chart ─────────────────────────────────────────────────────────── */

const PLACES = ["ones", "tens", "hundreds", "thousands", "ten thousands", "lakhs", "ten lakhs"];
const PLACE_CHOICES = PLACES.map((p) => ({ id: p, label: p }));

/* The chapter's own content colours (its writeup.stage departs from the one-colour-per-block
   rule, and says so): a place takes its PERIOD's colour, ones deep blue, thousands green,
   lakhs vermilion. Amber marks what is under discussion; grey is a zero holding a place. */
const PERIODS = [
  { name: "ones", color: CONTENT.hundred, paint: "gHundred", places: [0, 1, 2] },
  { name: "thousands", color: CONTENT.one, paint: "gOne", places: [3, 4] },
  { name: "lakhs", color: CONTENT.pointer, paint: "gPointer", places: [5, 6] },
];
const PERIOD_OF = [0, 0, 0, 1, 1, 2, 2];
const AMBER = CONTENT.ten;
const ZERO = "#767676";
const paintOf = (k: number) => PERIODS[PERIOD_OF[Math.min(k, 6)]].paint;
const colorOf = (k: number) => PERIODS[PERIOD_OF[Math.min(k, 6)]].color;
/* numerals and words take a deeper ink of their period colour, so they read at 4.5:1 on white and on
   the panel; counters, bands and tiles keep the true Okabe-Ito colour */
const inkOf = (k: number) => shade(colorOf(k), 0.25);
const periodInk = (pi: number) => shade(PERIODS[pi].color, 0.25);

/* geometry in working-area units (1086 × 528). Columns are 150 wide so every place name fits
   at the type floor; the ones column is pinned right and new places open to the left. */
const CW = 150;
const colX = (k: number) => W.w - (k + 1) * CW;
const colC = (k: number) => colX(k) + CW / 2;
/* nine counters stand in a 3 × 3 grid, filled from the floor; a tenth has nowhere to stand */
const cell = (k: number, i: number) => ({ x: colC(k) + ((i % 3) - 1) * 44, y: 232 - Math.floor(i / 3) * 40 });
const G = { period: 22, headTop: 30, headH: 58, bodyTop: 104, lane: 99, extra: 116, digit: 298, bottom: 300 };
const TRAY = { y: 314, h: 132, mid: 380 };
const STRIP = { y: 462, h: 66 };
const TILE_PLACE: Record<string, number> = { one: 0, ten: 1, hundred: 2, thousand: 3 };
const TILE_OF = ["one", "ten", "hundred", "thousand"];
const ADD_OF: Record<string, number> = { one: 1, ten: 10 };

const digitsOf = (v: number) => String(Math.max(0, Math.trunc(v))).length;
const countsOf = (v: number) => {
  const c = [0, 0, 0, 0, 0, 0, 0];
  String(Math.max(0, Math.trunc(v))).split("").reverse().forEach((d, k) => { if (k < 7) c[k] = Number(d); });
  return c;
};
const numberOf = (c: number[]) => c.reduce((s, d, k) => s + d * Math.pow(10, k), 0);
/* gap g sits between place g+1 (left) and place g (right); Indian commas: 3, then every 2 */
const indianGaps = (v: number) => { const out: number[] = []; for (let g = 2; g < digitsOf(v) - 1; g += 2) out.push(g); return out; };
const withCommas = (v: number, gaps: number[]) => {
  const s = String(v); let out = "";
  for (let i = 0; i < s.length; i++) { const k = s.length - 1 - i; out += s[i]; if (k >= 1 && gaps.includes(k - 1)) out += ","; }
  return out;
};
const readingParts = (v: number, lang = "en") => {
  /* the number read out one period at a time, in the language in use (wordsIn, BIG_WORDS: runtime r13) */
  const [TH, LK] = lang === "hi" || lang === "gu" ? [BIG_WORDS[lang][1], BIG_WORDS[lang][2]] : ["thousand", "lakh"];
  const c = countsOf(v), parts: { text: string; color: string }[] = [];
  const lakh = c[5] + 10 * c[6], thou = c[3] + 10 * c[4], ones = c[0] + 10 * c[1] + 100 * c[2];
  if (lakh) parts.push({ text: wordsIn(lakh, lang) + " " + LK, color: periodInk(2) });
  if (thou) parts.push({ text: wordsIn(thou, lang) + " " + TH, color: periodInk(1) });
  if (ones) parts.push({ text: wordsIn(ones, lang), color: periodInk(0) });
  return parts;
};

/* ── phases ─────────────────────────────────────────────────────────────────────────────
   kinds: predict (type what one more makes, then drop the token and watch) · place (name the
          place that will open, then drop) · build (make the number from tray tiles, Enter
          commits) · count (typed) · commas (tap the gaps, Enter commits) · numeral (typed) */

const PHASES = [
  {
    n: 1,
    concept: "One more than the biggest four digit number",
    conceptId: "M1.S1.T2.C4", objectiveIds: ["O1"],
    says: ["Add one more. Watch every column, not just the last one."],
    /* the worked example: the child drops the one onto 9999 and watches (the plan's delight) */
    demo: { start: 9999, add: "one" },
    demoLines: ["Nine ones and one more make ten, so the ones column empties and one goes to the tens.",
      "The same thing happens at the tens, the hundreds and then the thousands.",
      "The last carry has no column to go to, so a ten thousands place opens."],
    ladder: ["What happens to a column the moment it reaches ten?", "Watch it slowly. Count each column up to ten."],
    closing: "When the last place is full, adding one more opens a new place.",
    learned: "You learned: when the last place is full, one more opens a new place.",
    traceback: "The token drops again, slowly: each full column ties its ten and carries it left, and the new place opens.",
    items: [
      { qid: "M1.S1.T2.C4:ML1", kind: "predict", start: 9999, add: "one", answer: 10000, winMs: 1400, ask: "What will it read?",
        say: "The chart holds 9999 again. Type what one more will make, then drop it in.", miss: "How many tokens are in the ones column now?" },
      { kind: "predict", start: 9899, add: "one", answer: 9900, winMs: 1400, ask: "What will it read?",
        say: "Now it holds 9899. What will one more make?", miss: "Which columns are full, and which one is not?" },
      { kind: "predict", start: 9990, add: "ten", answer: 10000, winMs: 1400, ask: "A ten drops in. It reads?",
        say: "It holds 9990, and this time a ten drops in. What will it read?", miss: "Which column does a ten land in?" },
    ],
  },
  {
    n: 2,
    concept: "Showing a big number with tokens",
    conceptId: "M1.S1.T2.C5", objectiveIds: ["O1"],
    says: ["Build it with the tokens you have."],
    ladder: ["How many of those make one of the place to its left?", "Look at your number and the target, one column at a time."],
    closing: "A big number is still built out of ones, tens, hundreds and thousands.",
    learned: "You learned: a big number is still ones, tens, hundreds and thousands.",
    traceback: "The target is laid under the chart and every place that does not match yet is lit; a count replays ten thousands bundling.",
    items: [
      { kind: "build", start: 0, answer: 10512, pad: "enter", winMs: 1800, ask: "Build 10,512",
        say: "Build 10,512 with the tokens, then press enter.", miss: "What is the biggest tile in the tray?" },
      { qid: "M1.S1.T2.C5:ML2", kind: "count", start: 10512, answer: 10, winMs: 5600, ask: "Thousand tiles in 10,000?",
        say: "How many thousand tokens did that take?", miss: "How many can one column hold before it bundles?" },
      { kind: "build", start: 0, answer: 11007, pad: "enter", winMs: 1800, ask: "Build 11,007",
        say: "Build 11,007 with the tokens.", miss: "Which places have nothing in them?" },
    ],
  },
  {
    n: 3,
    concept: "The chart grows a new place each time",
    conceptId: "M1.S1.T2.C6", objectiveIds: ["O2"],
    says: ["One more again. What is this new place called?"],
    ladder: ["What is written in the next heading to the left?", "Read the headings from the right, one at a time."],
    closing: "Every rollover opens exactly one new place, and that place has its own name.",
    learned: "You learned: every rollover opens one new place, with its own name.",
    traceback: "The one drops again, slowly, and the headings light from the right up to the place that opens.",
    items: [
      { qid: "M1.S1.T2.C6:ML3", kind: "place", start: 99999, add: "one", answer: "lakhs", choices: PLACE_CHOICES, winMs: 1600, ask: "Which place opens?",
        say: "The chart holds 99,999. Pick the place that will open, then drop the one in.", miss: "Count the places from the right. Which comes after ten thousands?" },
      { kind: "place", start: 999999, add: "one", answer: "ten lakhs", choices: PLACE_CHOICES, winMs: 1600, ask: "Which place opens?",
        say: "Now it holds 9,99,999. Which place will open this time?", miss: "Which place comes after lakhs?" },
      { qid: "M1.S1.T2.C6:5", kind: "predict", start: 999999, add: "one", answer: 1000000, winMs: 1400, ask: "What will it read?",
        say: "It holds 9,99,999 again. What is one more?", miss: "How many nines will turn over?" },
    ],
  },
  {
    n: 4,
    concept: "Commas split a number into periods",
    conceptId: "M1.S1.T2.C7", objectiveIds: ["O2"],
    says: ["Read it in chunks, not digit by digit. Say the name of each chunk."],
    ladder: ["How many digits go in the next group?", "Look at the bands. Write one comma at each band edge."],
    closing: "Commas mark the periods, and the periods are how a number is read.",
    learned: "You learned: commas mark the periods, and periods are how we read.",
    traceback: "The period bands slide in and each band edge is counted out where a comma belongs; a numeral is written back into the chart.",
    items: [
      { qid: "M1.S1.T2.C7:ML4", kind: "commas", start: 738000, answer: 738000, pad: "enter", winMs: 3600, ask: "Put in the commas",
        say: "Tap between the columns to put the commas into this number, then press enter.", miss: "Count three digits in from the right." },
      { qid: "M1.S1.T2.C7:7", kind: "commas", start: 456923, answer: 456923, pad: "enter", winMs: 3600, ask: "Put in the commas",
        say: "Now mark the periods in this number.", miss: "Which three digits make the ones period?" },
      { qid: "M1.S1.T2.C7:8", kind: "numeral", start: 0, answer: 89890, winMs: 4200, ask: "Write it in numerals",
        say: "Write eighty-nine thousand eight hundred ninety in numerals.", miss: "Which period does eighty-nine belong to?" },
    ],
  },
];

/* The numbers the working area needs, kept for the sidecar. */
const MODEL = { columnWidth: CW, places: PLACES, periods: PERIODS.map((p) => ({ name: p.name, places: p.places })) };

/* judge: a comma answer must match the Indian grouping exactly; numbers compare as numbers */
const judge = (item: any, v: any) => {
  if (item.kind === "commas") return String(v) === indian(item.answer);
  if (typeof item.answer === "number") return leadNumber(v) === item.answer;
  return String(v).trim().toLowerCase() === String(item.answer).trim().toLowerCase();
};

/* the round table checked by a second route that shares no code with the chart or judge() */
const oracle = () => PHASES.every((p: any) => p.items.every((it: any) => {
  if (it.kind === "predict") return it.answer === it.start + ADD_OF[it.add];
  if (it.kind === "place") {
    const before = String(it.start).length, after = String(it.start + ADD_OF[it.add]).length;
    return after === before + 1 && PLACES[after - 1] === it.answer;
  }
  if (it.kind === "build") return it.answer > 0 && it.answer < 1e7;
  if (it.kind === "count") return it.answer * 1000 === 10000;
  if (it.kind === "commas") {
    const s = String(it.answer), head = s.slice(0, -3);
    let out = "";
    for (let i = 0; i < head.length; i++) { out += head[i]; const rest = head.length - 1 - i; if (rest > 0 && rest % 2 === 0) out += ","; }
    return indian(it.answer) === (head ? out + "," : "") + s.slice(-3);
  }
  if (it.kind === "numeral") return String(it.say).includes(words(it.answer));
  return false;
}));

/* the driver reaches the working area through here: dev contract only, never a control */
const HOOK: any = {};

const solve = (item: any, T: any) => {
  if (T.state().stage === "demo") return HOOK.demo && HOOK.demo();
  if (item.kind === "predict" || item.kind === "place") {
    HOOK.enter(item.answer);
    setTimeout(() => HOOK.drop && HOOK.drop(), 60);
    return;
  }
  if (item.kind === "build") { HOOK.build(item.answer); setTimeout(() => HOOK.enter(), 40); return; }
  if (item.kind === "commas") { HOOK.commas(indianGaps(item.answer)); setTimeout(() => HOOK.enter(), 40); return; }
  return T.submit(item.answer);
};

const nearMiss = (item: any) => {
  if (item.kind === "place") return PLACES[Math.max(0, PLACES.indexOf(item.answer) - 1)];
  if (item.kind === "commas") return intl(item.answer); /* threes all the way along: the misconception */
  if (item.kind === "count") return 9;
  return Number(item.answer) + 1;
};

/* comma positions written in a string ("7,38,000" -> gaps 2 and 4), counted from the right */
const gapsOf = (s: string) => {
  const out: number[] = [];
  let d = 0;
  for (let i = s.length - 1; i >= 0; i--) { if (s[i] === ",") out.push(d - 1); else if (/\d/.test(s[i])) d++; }
  return out;
};

/* the teacher agent (toolApi.answer / check) acts on the working area exactly as a child would */
const answer = (item: any, v: any) => {
  if (item.kind === "build") { const x = leadNumber(v); if (x === null || x < 0 || x > 9999999) return false; HOOK.build(x); return true; }
  if (item.kind === "commas") { HOOK.commas(gapsOf(String(v ?? ""))); return true; }
  return undefined;
};
const check = () => (HOOK.check ? HOOK.check() : undefined);
/* the answer as the agent gives it (and the sidecar lists it): commas are written in */
const agentKey = (item: any) => (item.kind === "commas" ? indian(item.answer) : item.answer);

/* for the checks: the forms of an answer that no question, hint or ladder line may print */
const answerForms = (item: any) =>
  item.kind === "build" ? [] /* the target number IS the question */
    : item.kind === "numeral" ? [String(item.answer), indian(item.answer)] /* the words are the question */
      : item.kind === "commas" ? [indian(item.answer)]
        : item.kind === "place" ? [item.answer]
          : [String(item.answer), indian(item.answer), words(item.answer)];

const setupOf = (it: any) => {
  const k = it.kind;
  const start = k === "build" || k === "numeral" || k === "free" ? 0 : it.start || 0;
  const cols = k === "commas" || k === "numeral" ? 6 : Math.max(4, digitsOf(start));
  const tray = k === "predict" || k === "place" || k === "demo" ? "loose" : k === "build" || k === "count" || k === "free" ? "stacks" : "none";
  return { kind: k, start, cols, tray, add: it.add || null };
};

const PVB_CSS = `
.pvb-move{transition:transform 470ms cubic-bezier(.3,.7,.25,1)}
.pvb-new{animation:pvbIn 800ms ease-out both}
@keyframes pvbIn{from{opacity:0;transform:translateX(-30px)}to{opacity:1;transform:none}}
.pvb-tie{stroke-dasharray:820;stroke-dashoffset:820;animation:pvbTie 380ms ease-out forwards}
@keyframes pvbTie{to{stroke-dashoffset:0}}
.pvb-lift{transition:transform 260ms ease}
.pvb-grab{cursor:grab}
.pvb-tap{cursor:pointer}
@media (prefers-reduced-motion:reduce){.pvb-move,.pvb-lift{transition:none}.pvb-new,.pvb-tie{animation:none}.pvb-tie{stroke-dashoffset:0}}
`;

/* a comma 40 tall: a round head at (x, y) and a tail curling down to the left */
const Comma = ({ x, y, color }: any) => (
  <path d={`M ${x + 8} ${y} A 8 8 0 1 0 ${x - 2} ${y + 7.7} C ${x} ${y + 14} ${x - 3} ${y + 23} ${x - 10} ${y + 30} C ${x + 3} ${y + 25} ${x + 9} ${y + 14} ${x + 8} ${y} Z`} fill={color} />
);

/* ── the working area ─────────────────────────────────────────────────────────────────── */

function Work({ phase, item, index, stage, wrong, api, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();
  const init = setupOf(phase.demo ? { kind: "demo", ...phase.demo } : item);
  const [cfg, setCfg] = useState<any>(init);
  const [cnt, setCnt] = useState<number[]>(() => countsOf(init.start));
  const [cols, setCols] = useState(init.cols);
  const [fly, setFly] = useState<any>(null);          /* a counter or bundle in flight */
  const [tie, setTie] = useState<number | null>(null); /* the column whose ten are being tied */
  const [hl, setHl] = useState<number | null>(null);   /* the column under discussion */
  const [lit, setLit] = useState(-1);                  /* headings lit from the right, up to here */
  const [opening, setOpening] = useState<number | null>(null);
  const [looseOn, setLooseOn] = useState(true);
  const [armed, setArmed] = useState(false);           /* prediction made; the token waits to drop */
  const [pred, setPred] = useState<any>(null);
  const [revealed, setRevealed] = useState(false);     /* the consequence has been shown */
  const [commas, setCommas] = useState<number[]>([]);
  const [bands, setBands] = useState(false);
  const [strip, setStrip] = useState<any>(null);
  const [edgeHl, setEdgeHl] = useState<number | null>(null);
  const [lifted, setLifted] = useState<string | null>(null);
  const [touched, setTouched] = useState(false);
  const [commasOn, setCommasOn] = useState(false);     /* free play: the Indian commas shown or not */
  const free = stage === "free";
  const setupFor = useRef(phase.demo ? -1 : 0);
  const cntRef = useRef(cnt); cntRef.current = cnt;
  const commasRef = useRef(commas); commasRef.current = commas;
  const busy = tl.busy;
  const kind = cfg.kind;

  const reset = (it: any) => {
    tl.stop();
    const s = setupOf(it), c = countsOf(s.start);
    setCfg(s); setCnt(c); cntRef.current = c; setCols(s.cols);
    setFly(null); setTie(null); setHl(null); setLit(-1); setOpening(null);
    setLooseOn(true); setArmed(false); setPred(null); setRevealed(false);
    setCommas([]); commasRef.current = []; setBands(false); setStrip(null); setEdgeHl(null); setLifted(null); setTouched(false);
    api.lock(false);
  };

  useEffect(() => {
    if (stage === "ask" && setupFor.current !== index) { setupFor.current = index; reset(item); }
  }, [stage, index]);

  /* free play (the plan's freePlay): any tiles up to ten lakh, periods and commas switched on or off,
     nothing to get right */
  useEffect(() => {
    if (!free) return;
    setupFor.current = -2;
    reset({ kind: "free", start: 0 });
    setCommasOn(false);
  }, [free]);

  /* one counter lands in `place`; every column that reaches ten ties, turns into one of the
     next place and travels left; a carry with no column under it waits, and a place opens */
  const cascade = (c0: number[], cols0: number, place: number, from: any, slow = 1) => {
    const sim = c0.slice(), S: any[] = [];
    let cl = cols0;
    const s = (ms: number, fn: () => void) => S.push([ms * slow, fn]);
    if (from) {
      const f = { x: from.x, y: from.y };
      s(30, () => setFly({ ...f, paint: paintOf(place) }));
      s(520, () => setFly({ x: colC(place), y: G.extra, paint: paintOf(place) }));
    }
    sim[place] += 1;
    { const snap = sim.slice(); s(380, () => { setCnt(snap); setFly(null); api.sfx.tick(); }); }
    let p = place;
    while (sim[p] >= 10 && p < 6) {
      const q = p;
      s(420, () => { setTie(q); setHl(q); });
      sim[q] -= 10;
      { const snap = sim.slice(); s(320, () => { setCnt(snap); setTie(null); setFly({ x: colC(q), y: G.lane, paint: paintOf(q + 1) }); }); }
      if (q + 1 >= cl) {
        s(560, () => setFly({ x: colX(q) - 44, y: G.lane, paint: paintOf(q + 1) }));
        s(700, () => {});                                  /* it waits there a beat */
        cl += 1;
        const nc = cl;
        s(900, () => { setCols(nc); setOpening(q + 1); });  /* the chart draws itself one column wider */
      }
      s(560, () => { setFly({ x: colC(q + 1), y: G.lane, paint: paintOf(q + 1) }); setHl(q + 1); });
      sim[q + 1] += 1;
      { const snap = sim.slice(); s(360, () => { setCnt(snap); setFly(null); api.sfx.tick(); }); }
      p = q + 1;
    }
    s(250, () => { setHl(null); setOpening(null); });
    return { steps: S, counts: sim, cols: cl };
  };

  const looseLive = !busy && looseOn && (stage === "demo" || (stage === "ask" && armed && !revealed));
  const dropLoose = (at: any) => {
    if (!looseLive) return;
    const place = TILE_PLACE[cfg.add || "one"];
    const from = at || { x: colC(place), y: TRAY.mid };
    const wasDemo = stage === "demo", p = pred;
    setLooseOn(false); setTouched(true);
    const r = cascade(cntRef.current, cols, place, from);
    tl.run(r.steps, () => {
      cntRef.current = r.counts;
      setRevealed(true);
      if (wasDemo) api.demoDone(phase.demoLines);
      else api.submit(p);
    });
  };

  const canBuild = !busy && ((stage === "ask" && kind === "build") || (free && kind === "free"));
  const dropTile = (t: string, at: any) => {
    if (!canBuild) return;
    const place = TILE_PLACE[t];
    if (free && numberOf(cntRef.current) + Math.pow(10, place) > 1000000) return; /* free play goes as far as ten lakh */
    setTouched(true);
    const r = cascade(cntRef.current, cols, place, at || { x: colC(place), y: TRAY.mid }, 0.55);
    api.lock(true);
    tl.run(r.steps, () => { cntRef.current = r.counts; api.lock(false); });
  };
  const takeOut = (k: number) => {
    if (!canBuild || cntRef.current[k] <= 0) return;
    const c = cntRef.current.slice(); c[k] -= 1;
    const p0 = cell(k, Math.min(c[k], 8));
    tl.run([
      [20, () => { setCnt(c); cntRef.current = c; setFly({ x: p0.x, y: p0.y, paint: paintOf(k) }); }],
      [300, () => setFly({ x: colC(Math.min(k, 3)), y: TRAY.mid, paint: paintOf(k) })],
      [240, () => setFly(null)],
    ]);
  };

  const canComma = stage === "ask" && kind === "commas" && !busy;
  const toggleComma = (g: number) => {
    if (!canComma) return;
    setTouched(true);
    const next = commasRef.current.includes(g) ? commasRef.current.filter((x) => x !== g) : [...commasRef.current, g];
    commasRef.current = next; setCommas(next); api.sfx.tick();
  };

  const drag = useDrag((payload: any, p: any, moved: boolean) => {
    const overChart = p.y < G.bottom + 10;
    if (moved && !overChart) return; /* let go off the chart: it simply goes back */
    if (payload.src === "loose") dropLoose(moved ? p : null);
    else dropTile(payload.kind, moved ? p : null);
  });

  /* Enter and choice taps (in the demo, Enter drops the token) */
  const enterFn: any =
    stage === "demo" ? (looseLive ? () => dropLoose(null) : null)
      : stage !== "ask" || busy ? null
        : kind === "predict" || kind === "place" ? (v: any) => {
          const val = kind === "predict" ? leadNumber(v) : typeof v === "string" && PLACES.includes(v) ? v : null;
          if (val === null || val === undefined || v === "") return;
          api.setTyped(String(val));
          if (revealed) { api.submit(val); return; }     /* the consequence was shown; a retry commits directly */
          setPred(val); setArmed(true); api.lock(true);  /* the machine is set: now drop the token */
        }
          : kind === "build" ? () => api.submit(numberOf(cntRef.current))
            : kind === "commas" ? () => api.submit(withCommas(numberOf(cntRef.current), commasRef.current))
              : null;
  api.onEnter(enterFn);
  HOOK.enter = (v?: any) => enterFn && enterFn(v);
  HOOK.drop = () => dropLoose(null);
  HOOK.demo = () => dropLoose(null);
  /* the agent's check(): with the token waiting (the demo, or a prediction made), it drops it */
  HOOK.check = () => (looseLive ? (dropLoose(null), true) : undefined);
  HOOK.build = (v: number) => { const c = countsOf(v); cntRef.current = c; setCnt(c); setCols(Math.max(4, digitsOf(v))); };
  HOOK.commas = (gs: number[]) => { commasRef.current = gs; setCommas(gs); };

  /* ── win motions ── */
  const settleSteps = () => {
    const S: any[] = [];
    for (let k = digitsOf(numberOf(cntRef.current)) - 1; k >= 0; k--) { const j = k; S.push([230, () => setHl(j)]); }
    S.push([400, () => setHl(null)]);
    return S;
  };
  const unbundleSteps = (slow: number) => {
    const base = cntRef.current.slice();
    if (base[4] < 1) return [[400, () => {}]];
    const s1 = base.slice(); s1[4] -= 1;
    const s2 = s1.slice(); s2[3] += 10;
    const s3 = s2.slice(); s3[3] -= 10;
    return [
      [300 * slow, () => setHl(4)],
      [320 * slow, () => { setCnt(s1); setFly({ x: colC(4), y: G.lane, paint: paintOf(4) }); }],
      [560 * slow, () => { setFly({ x: colC(3), y: G.lane, paint: paintOf(4) }); setHl(3); }],
      [700 * slow, () => { setFly(null); setCnt(s2); api.sfx.tick(); }],
      [1000 * slow, () => setTie(3)],
      [420 * slow, () => { setCnt(s3); setTie(null); setFly({ x: colC(3), y: G.lane, paint: paintOf(4) }); }],
      [560 * slow, () => { setFly({ x: colC(4), y: G.lane, paint: paintOf(4) }); setHl(4); }],
      [360 * slow, () => { setFly(null); setCnt(base); cntRef.current = base; api.sfx.tick(); }],
      [300, () => setHl(null)],
    ];
  };
  const readSteps = (v: number) => {
    const parts = readingParts(v, lang), S: any[] = [[60, () => setBands(true)], [500, () => {}]];
    parts.forEach((_, i) => S.push([700, () => setStrip({ kind: "words", parts: parts.slice(0, i + 1) })]));
    S.push([500, () => {}]);
    return S;
  };
  const fillSteps = (v: number) => {
    const val = Math.min(Math.max(0, Math.trunc(v)), 9999999), target = countsOf(val), d = digitsOf(val);
    const zero = [0, 0, 0, 0, 0, 0, 0], acc = zero.slice();
    const S: any[] = [[60, () => { setCnt(zero); cntRef.current = zero; setCols(Math.max(6, d)); setCommas([]); setStrip(null); }]];
    for (let k = d - 1; k >= 0; k--) {
      acc[k] = target[k];
      const snap = acc.slice(), j = k;
      S.push([380, () => { setCnt(snap); cntRef.current = snap; if (snap[j]) api.sfx.tick(); }]);
    }
    S.push([300, () => { setCommas(indianGaps(val)); commasRef.current = indianGaps(val); }]);
    S.push([500, () => setStrip({ kind: "words", parts: readingParts(val, lang) })]);
    S.push([500, () => {}]);
    return S;
  };

  useEffect(() => {
    if (stage !== "win") return;
    if (kind === "build") tl.run(settleSteps());
    else if (kind === "count") tl.run(unbundleSteps(1));
    else if (kind === "commas") tl.run(readSteps(numberOf(cntRef.current)));
    else if (kind === "numeral") tl.run(fillSteps(item.answer));
    else if (kind === "place") tl.run([[60, () => setLit(PLACES.indexOf(item.answer))], [900, () => {}]]);
  }, [stage]);

  /* ── the traceback: the mathematics redrawn in steps; nothing marked, nothing cleared ── */
  useEffect(() => {
    if (!wrong || stage !== "ask") return;
    api.lock(true);
    setTouched(true);
    const done = () => api.lock(false);
    if (kind === "predict" || kind === "place") {
      const place = TILE_PLACE[cfg.add || "one"], start = countsOf(cfg.start);
      setCnt(start); cntRef.current = start; setCols(cfg.cols); setLooseOn(false); setArmed(false); setLit(-1);
      const r = cascade(start, cfg.cols, place, { x: colC(place), y: TRAY.mid }, 1.7);
      const heads: any[] = [];
      if (kind === "place" && wrong.tries >= 2) for (let i = 0; i <= PLACES.indexOf(item.answer); i++) { const j = i; heads.push([480, () => setLit(j)]); }
      tl.run([[400, () => {}], ...r.steps, ...heads], () => { cntRef.current = r.counts; setRevealed(true); done(); });
    } else if (kind === "build") {
      tl.run([[60, () => setStrip({ kind: "ghost", target: item.answer })], [300, () => {}]], done);
    } else if (kind === "count") {
      tl.run([...TILE_OF.map((t) => [380, () => setLifted(t)]), [300, () => setLifted(null)], ...unbundleSteps(1.6)], done);
    } else if (kind === "commas") {
      const S: any[] = [[80, () => setBands(true)], [700, () => {}]];
      indianGaps(numberOf(cntRef.current)).forEach((g) => S.push([650, () => setEdgeHl(g)]));
      S.push([500, () => setEdgeHl(null)]);
      tl.run(S, done);
    } else if (kind === "numeral") {
      tl.run(fillSteps(leadNumber(wrong.value) || 0), done);
    } else done();
  }, [wrong]);

  /* ── what the host can read back ── */
  const value = numberOf(cnt);
  const nd = digitsOf(value);
  api.share({ columns: cols, tokens: cnt.slice(0, cols), value, periodsShown: bands, commasShown: commas.length > 0, lineOpen: false, complete: stage === "idle" });

  /* ── drawing ── */
  /* phase 4 is about numerals: digits only, big, and no colour until the periods are shown
     (period-coloured counters would draw the commas for the child) */
  const counters = kind !== "commas" && kind !== "numeral";
  const shownCommas = kind === "free" ? (commasOn ? indianGaps(value) : []) : commas;
  const bodyBottom = counters ? G.bottom : 262;
  const digitY = counters ? G.digit : 214;
  const digitSize = counters ? T.xl : T.display;
  const commaY = counters ? 294 : digitY - 4;
  const coloursOn = kind !== "commas" || bands || stage === "win" || stage === "idle";
  const digitFill = (k: number) => (cnt[k] === 0 ? ZERO : coloursOn ? inkOf(k) : C.ink);
  const left = colX(cols - 1);
  const dragOver = drag.drag && drag.drag.moved && drag.drag.y < G.bottom + 10 ? TILE_PLACE[drag.drag.payload.kind] : null;
  const ghost = strip && strip.kind === "ghost" ? countsOf(strip.target) : null;

  /* the running count: the number as it stands, digits in their period colours, with Indian commas
     (not while placing the commas or writing the numeral is the question, and in free play only when switched on) */
  const bare = kind === "commas" || kind === "numeral" ? !(stage === "win" || stage === "idle") : kind === "free" ? !commasOn : false;
  const runsText = bare ? String(value) : indian(value);
  const placesLabel = lang === "hi" ? `${cols} स्थान` : lang === "gu" ? `${cols} સ્થાન` : `${cols} places`;
  const room = 330 - 44 - placesLabel.length * T.micro * 0.55;
  const runSize = [T.xl, T.speech, T.prompt].find((sz) => runsText.length * sz * 0.58 <= room) || T.prompt;
  const runChars: any[] = [];
  { let place = runsText.replace(/,/g, "").length - 1;
    for (const ch of runsText) {
      if (ch === ",") runChars.push({ ch, fill: C.ink });
      else { const k = place--; runChars.push({ ch, fill: value === 0 ? C.ink : ch === "0" ? ZERO : coloursOn ? inkOf(k) : C.ink }); }
    } }

  const invite =
    looseLive ? { x: colC(TILE_PLACE[cfg.add || "one"]), y: TRAY.mid, r: 64 }
      : stage === "ask" && kind === "build" && !touched && index === 0 && !busy ? { x: colC(3), y: TRAY.mid, r: 72 }
        : stage === "ask" && kind === "commas" && !touched && index === 0 ? { x: colX(2), y: commaY + 4, r: 34 }
          : null;

  return (
    <g>
      <style>{PVB_CSS}</style>

      {/* running count, in the runs zone (64,108) */}
      <g data-zone="runs">
        <rect x={0} y={-94} width={330} height={76} rx={RAD.panel} fill="url(#gPanel)" stroke={C.rule} strokeWidth={2} />
        <text x={18} y={-56 + runSize * 0.36} fontSize={runSize} fontWeight={700}>
          {runChars.map((c, i) => <tspan key={i} fill={c.fill}>{c.ch}</tspan>)}
        </text>
        <text x={316} y={-56 + T.micro * 0.36} textAnchor="end" fontSize={T.micro} fontWeight={500} fill={C.ink}>{placesLabel}</text>
      </g>

      {/* period bands, behind the columns */}
      {bands && PERIODS.map((P, pi) => {
        const ks = P.places.filter((k) => k < cols);
        if (!ks.length) return null;
        const x0 = colX(Math.max(...ks)), x1 = colX(Math.min(...ks)) + CW;
        return (
          <g key={pi} className="pvb-new">
            <rect x={x0 + 1} y={0} width={x1 - x0 - 2} height={bodyBottom + 6} rx={16} fill={P.color} fillOpacity={0.1} />
            <text x={(x0 + x1) / 2} y={G.period} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={periodInk(pi)}>{tx(P.name)}</text>
          </g>
        );
      })}

      {/* carry lane under the headings */}
      <rect x={left + 10} y={G.lane - 6} width={W.w - left - 20} height={12} rx={6} fill={tint(C.rule, 0.45)} />

      {/* the columns */}
      {Array.from({ length: cols }).map((_, k) => {
        const x = colX(k), n0 = cnt[k];
        const under = k <= lit || hl === k || dragOver === k;
        const two = lang === "en" && PLACES[k] === "ten thousands";   /* one line fits in hi/gu */
        return (
          <g key={k} className={opening === k ? "pvb-new" : ""}>
            <rect x={x + 4} y={G.headTop} width={CW - 8} height={G.headH} rx={14}
              fill={under ? tint(AMBER, 0.6) : tint(C.panel, 0.25)} stroke={under ? AMBER : C.rule} strokeWidth={under ? 3 : 1.5} />
            {two ? (
              <g>
                <text x={colC(k)} y={G.headTop + 25} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>ten</text>
                <text x={colC(k)} y={G.headTop + 51} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>thousands</text>
              </g>
            ) : (
              <text x={colC(k)} y={G.headTop + 39} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx(PLACES[k])}</text>
            )}
            <rect x={x + 4} y={G.bodyTop} width={CW - 8} height={bodyBottom - G.bodyTop} rx={14} fill="#FFFFFF" fillOpacity={0.92} stroke={C.rule} strokeWidth={1.5} />
            {counters && (
              <g filter="url(#fShadowSoft)">
                {Array.from({ length: Math.min(n0, 9) }).map((__, i) => { const p = cell(k, i); return <Disc key={i} x={p.x} y={p.y} r={18} paint={paintOf(k)} flat />; })}
              </g>
            )}
            {counters && n0 >= 10 && <Disc x={colC(k)} y={G.extra} r={18} paint={paintOf(k)} lift />}
            {ghost && k < digitsOf(strip.target) && ghost[k] !== n0 && (
              <rect x={colC(k) - 34} y={G.digit - 50} width={68} height={60} rx={12} fill="none" stroke={AMBER} strokeWidth={4} />
            )}
            {k < nd && n0 < 10 && (
              <text x={colC(k)} y={digitY} textAnchor="middle" fontSize={digitSize} fontWeight={700} fill={digitFill(k)}>{n0}</text>
            )}
            {canBuild && n0 > 0 && (
              <Hit id={"take-" + k} label={"Take one out of the " + PLACES[k]} x={x} y={G.bodyTop} w={CW} h={150} onPress={() => takeOut(k)} />
            )}
          </g>
        );
      })}

      {/* ten being tied into one */}
      {tie !== null && (
        <rect key={"tie" + tie} className="pvb-tie" x={colX(tie) + 8} y={G.lane - 4} width={CW - 16} height={G.digit - 44 - G.lane + 4}
          rx={20} fill={AMBER} fillOpacity={0.12} stroke={AMBER} strokeWidth={5} />
      )}

      {/* period band edges being counted out */}
      {edgeHl !== null && <rect x={colX(edgeHl) - 4} y={0} width={8} height={bodyBottom + 6} rx={4} fill={AMBER} />}

      {/* commas: written in the gap between two columns, never inside one */}
      {(kind === "commas" || shownCommas.length > 0) && Array.from({ length: Math.max(0, Math.min(cols, nd) - 1) }).map((_, g) => (
        <g key={"g" + g}>
          {!shownCommas.includes(g) && kind === "commas" && <circle cx={colX(g)} cy={commaY + 2} r={5} fill={C.rule} />}
          {shownCommas.includes(g) && <Comma x={colX(g)} y={commaY} color={C.ink} />}
          {canComma && <Hit id={"gap-" + g} label={"Comma between the " + PLACES[g + 1] + " and the " + PLACES[g]} x={colX(g) - 36} y={commaY - 80} w={72} h={104} onPress={() => toggleComma(g)} />}
        </g>
      ))}

      {/* the tray: as wide as the chart, and it grows with it */}
      {cfg.tray !== "none" && (
        <g>
          <rect x={left - 6} y={TRAY.y} width={W.w - left + 6} height={TRAY.h} rx={22} fill="url(#gPanel)" stroke={C.rule} strokeWidth={2} />
          {cfg.tray === "loose" && looseOn && !(drag.drag && drag.drag.moved) && (() => {
            const t = cfg.add || "one", pl = TILE_PLACE[t], bs = BLOCK_SIZE[t], cx = colC(pl);
            const pay = { src: "loose", kind: t };
            return (
              <g className={looseLive ? "pvb-grab c4-piece" : ""}
                {...(looseLive ? { ...control("loose", "Drop the " + t + " in"), ...drag.bind(pay), ...drag.keys(pay) } : {})}>
                <Block kind={t} x={cx - bs.w / 2} y={TRAY.mid - bs.h / 2} paint={paintOf(pl)} base={colorOf(pl)} />
                <rect x={cx - 56} y={TRAY.y + 6} width={112} height={TRAY.h - 12} fill="transparent" />
              </g>
            );
          })()}
          {cfg.tray === "stacks" && TILE_OF.map((t) => {
            const pl = TILE_PLACE[t], bs = BLOCK_SIZE[t], cx = colC(pl), x0 = cx - bs.w / 2, y0 = TRAY.mid - bs.h / 2;
            const pay = { src: "stack", kind: t };
            return (
              <g key={t} className={"pvb-lift" + (canBuild ? " pvb-grab c4-piece" : "")} style={{ transform: `translateY(${lifted === t ? -16 : 0}px)` } as any}
                {...(canBuild ? { ...control("stack-" + t, "Add a " + t), ...drag.bind(pay), ...drag.keys(pay) } : {})}>
                <Block kind={t} x={x0 + 6} y={y0 + 6} paint={paintOf(pl)} base={colorOf(pl)} label={false} />
                <Block kind={t} x={x0 + 3} y={y0 + 3} paint={paintOf(pl)} base={colorOf(pl)} label={false} />
                <Block kind={t} x={x0} y={y0} paint={paintOf(pl)} base={colorOf(pl)} />
                <rect x={cx - 64} y={TRAY.y + 4} width={128} height={TRAY.h - 8} fill="transparent" />
              </g>
            );
          })}
        </g>
      )}

      {/* reading strip: the number in words, one period at a time; or the target laid under the build */}
      {strip && strip.kind === "words" && (
        <g className="pvb-new" data-role="reading">
          <rect x={0} y={STRIP.y} width={W.w} height={STRIP.h} rx={18} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} />
          <text x={W.w / 2} y={STRIP.y + 44} textAnchor="middle" fontSize={T.label} fontWeight={700}>
            {strip.parts.map((p: any, i: number) => <tspan key={i} fill={p.color}>{(i ? "   " : "") + p.text}</tspan>)}
          </text>
        </g>
      )}
      {ghost && (
        <g className="pvb-new">
          <rect x={0} y={STRIP.y} width={W.w} height={STRIP.h} rx={18} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} />
          <text x={20} y={STRIP.y + 43} fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("target")}</text>
          {Array.from({ length: digitsOf(strip.target) }).map((_, k) => (
            <g key={k}>
              {ghost[k] !== cnt[k] && <rect x={colC(k) - 30} y={STRIP.y + 8} width={60} height={STRIP.h - 16} rx={12} fill={tint(AMBER, 0.55)} />}
              <text x={colC(k)} y={STRIP.y + 49} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={C.ink}>{ghost[k]}</text>
            </g>
          ))}
        </g>
      )}

      {/* a counter or bundle in flight */}
      {fly && (
        <g className="pvb-move" style={{ transform: `translate(${fly.x}px, ${fly.y}px)` } as any} pointerEvents="none">
          <Disc x={0} y={0} r={19} paint={fly.paint} lift ring={AMBER} />
        </g>
      )}

      {/* the tile under the finger */}
      {drag.drag && drag.drag.moved && (() => {
        const t = drag.drag.payload.kind, bs = BLOCK_SIZE[t], pl = TILE_PLACE[t];
        return <g pointerEvents="none"><Block kind={t} x={drag.drag.x - bs.w / 2} y={drag.drag.y - bs.h / 2} paint={paintOf(pl)} base={colorOf(pl)} lift /></g>;
      })()}

      {kind === "free" && (
        <g>
          <Key id="switch-periods" label={tx(bands ? "Periods off" : "Periods on")} x={0} y={456} w={210} h={67} C={C} primary={bands} onClick={() => setBands((b) => !b)}>
            <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={bands ? "#FFFFFF" : C.ink}>{tx("Periods")}</text>
          </Key>
          <Key id="switch-commas" label={tx(commasOn ? "Commas off" : "Commas on")} x={226} y={456} w={210} h={67} C={C} primary={commasOn} onClick={() => setCommasOn((b) => !b)}>
            <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={commasOn ? "#FFFFFF" : C.ink}>{tx("Commas")}</text>
          </Key>
        </g>
      )}

      {invite && <Invite x={invite.x} y={invite.y} r={invite.r} C={C} />}
    </g>
  );
}

/* the summary page's small drawing: the child's last right answer, as a number in its period inks */
function Thumb({ result, C, w, h }: any) {
  const L = (result && result.last) || {};
  const v = L.shared && typeof L.shared.value === "number" && L.shared.value > 0 ? L.shared.value : leadNumber(L.value);
  if (v === null || v === undefined) return null;
  const s = indian(v);
  let place = s.replace(/,/g, "").length - 1;
  const chars = s.split("").map((ch) => (ch === "," ? { ch, fill: C.ink } : { ch, fill: ch === "0" ? ZERO : inkOf(place) , k: place-- }));
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      <text x={w - 16} y={h / 2 + 12} textAnchor="end" fontSize={T.label} fontWeight={700}>
        {chars.map((c, i) => <tspan key={i} fill={c.fill}>{c.ch}</tspan>)}
      </text>
    </g>
  );
}

function PlaceValueBuilder(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, solve, nearMiss, oracle, answer, check, agentKey, answerForms, fitHost: () => null }} />
  );
}

export default PlaceValueBuilder;
