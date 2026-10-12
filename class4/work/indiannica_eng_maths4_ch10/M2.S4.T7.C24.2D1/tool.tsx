/* ═══ M2.S4.T7.C24.2D1 · tile_bench · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists: header + its three controls, canvas, slot + pad, bubble + mascot,
   phase dots (user / AI mode), window.toolApi, sounds, the synced voice, scoring, the events,
   idle and restart. NO imports in this file; only the five host hooks. Follow docs/LAYOUT.md.
   Edit, never rewrite. Built by `node cli.mjs scaffold`; concepts are verbatim (check compares them). */

const TOOL_ID = "tile_bench";
const MEDIA_ID = "M2.S4.T7.C24.2D1";
const TOOL_NAME = "Tile Bench";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
const VOICE = {"rate":0.92,"pitch":1.06};

/* spoken before phase 1's teach lines only (the plan's opening voice line) */
const OPENING = ["A bench of dotted paper and a tray of shapes. Lay the first copy down."];
/* the whole-tool line: spoken on the summary page */
const FINISH_LINE = "Every patch tested for gaps and for overlaps, and a pattern of your own laid out.";
/* said when the child opens Free play from the summary page (the plan's free-play voice line) */
const FREE_LINE = "Free play. Any shape, any things from the tray, with both finders open.";

/* Hindi and Gujarati, keyed by the English line exactly (runtime r21: `lineFor(line, lang, TR)`); the English
   everywhere else stays what the checks read. NCERT class 4 patterns: पैटर्न / પેટર્ન, टाइल / ટાઇલ,
   आकृति / આકૃતિ, खाली जगह / ખાલી જગ્યા (a gap), ओवरलैप / ઓવરલેપ, खोजक / શોધક (a finder),
   टेसेलेशन / ટેસેલેશન, समूह / સમૂહ (a group), कतार / હરોળ (a row), खाने / ખાનાં (squares of a domino),
   बिछावट / ગોઠવણી (a laid patch). The lower-case keys ("yes", "gap", "fits", "tessellation") are what the
   answer slot shows for a chosen word. Digits stay digits: the runtime speaks them in the language in use.
   A first draft; wants a native speaker's read. */
const TR: any = {
  hi: {
    "Tile Bench": "टाइल बेंच",
    "A bench of dotted paper and a tray of shapes. Lay the first copy down.": "बिंदुओं वाले कागज़ की एक बेंच और आकृतियों की एक ट्रे। पहली टाइल रखो।",
    "Every patch tested for gaps and for overlaps, and a pattern of your own laid out.": "हर बिछावट में खाली जगह और ओवरलैप जाँचे गए। तुमने अपना एक पैटर्न भी बनाया।",
    "Free play. Any shape, any things from the tray, with both finders open.": "मुक्त खेल। कोई भी आकृति या चीज़ रखो और दोनों खोजक आज़माओ।",

    "Copies that fit with no gaps": "बिना खाली जगह वाली टाइलें",
    "Lay the copies side by side. Is anything left uncovered? Is anything doubled?": "टाइलें साथ-साथ रखो। क्या कोई जगह खाली रह गई? क्या कोई हिस्सा दो बार ढका है?",
    "Does any copy lie over another?": "क्या कोई टाइल दूसरी के ऊपर रखी है?",
    "Run both finders once more, and read what each one shows.": "दोनों खोजक फिर चलाओ और देखो कि हर एक क्या दिखाता है।",
    "Copies of one shape set side by side with no gaps and no overlaps make a tessellation.": "एक आकृति की टाइलें बिना खाली जगह और ओवरलैप के जुड़ें। तब टेसेलेशन बनता है।",
    "You learned: no gaps and no overlaps makes a tessellation.": "तुमने सीखा: खाली जगह और ओवरलैप न हो, तो टेसेलेशन बनता है।",
    "A brick wall has rows of bricks, each row moved along by half a brick. Is the wall a tessellation?": "ईंटों की दीवार में ईंटों की कतारें हैं। हर कतार आधी ईंट खिसकी हुई है। क्या यह दीवार टेसेलेशन है?",
    "Tessellation?": "टेसेलेशन?",
    "Yes": "हाँ",
    "No": "नहीं",
    "yes": "हाँ",
    "no": "नहीं",
    "Look along each row. Does a brick sit right against the next one?": "हर कतार देखो। क्या हर ईंट अगली ईंट से सटी है?",
    "Round coins lie touching each other on the table. Is this a tessellation?": "गोल सिक्के मेज़ पर एक-दूसरे से सटे रखे हैं। क्या यह टेसेलेशन है?",
    "Push the coins as close as you like. Look at the space between four of them.": "सिक्कों को जितना चाहो पास खिसकाओ। चार सिक्कों के बीच की जगह देखो।",
    "One square tile lies half over another. Nothing between them is left uncovered. Is it a tessellation?": "एक वर्ग टाइल दूसरी के आधे हिस्से पर रखी है। उनके बीच कुछ भी खाली नहीं है। क्या यह टेसेलेशन है?",
    "Run the second finder over the pair. Is any part covered twice?": "दूसरा खोजक इस जोड़ी पर चलाओ। क्या कोई हिस्सा दो बार ढका है?",

    "A gap or only the edge": "खाली जगह या सिर्फ़ किनारा",
    "Is this space closed in by tiles all round? Or is it where the tiling stops?": "क्या यह जगह चारों ओर से टाइलों से घिरी है? या यहीं टाइलें खत्म हो जाती हैं?",
    "Look at the outline. Where it stops, the bench is open.": "बाहरी रेखा देखो। जहाँ वह रुकती है, वहाँ बेंच खुली है।",
    "Look for tiles on every side of the space.": "उस जगह के चारों ओर टाइलें ढूँढो।",
    "A gap is a space with tiles closed round it on every side. The bumpy outer edge is only where the tiling stops.": "खाली जगह वह है जिसके चारों ओर टाइलें घिरी हों। ऊबड़-खाबड़ बाहरी किनारा तो बस वहाँ है जहाँ टाइलें खत्म होती हैं।",
    "You learned: a gap is closed in; the outer edge is not.": "तुमने सीखा: खाली जगह घिरी होती है, बाहरी किनारा नहीं।",
    "The triangles make a bumpy top edge with notches all along it. No space is shut in. Is it a tessellation?": "त्रिभुज ऊपर ऊबड़-खाबड़ किनारा बनाते हैं। उसमें जगह-जगह खाँचे हैं। कोई जगह घिरी नहीं है। क्या यह टेसेलेशन है?",
    "Try to run a finger from a notch out to the open bench.": "खाँचे से उँगली चलाकर खुली बेंच तक जाने की कोशिश करो।",
    "This patch of diamonds has saw teeth down both sides. Are the teeth gaps, or only the edge?": "हीरे वाली टाइलों की इस बिछावट में दोनों ओर आरी जैसे दाँते हैं। क्या दाँते खाली जगह हैं, या सिर्फ़ किनारा?",
    "Gap or edge?": "खाली जगह या किनारा?",
    "A gap": "खाली जगह",
    "Only the edge": "सिर्फ़ किनारा",
    "gap": "खाली जगह",
    "edge": "सिर्फ़ किनारा",
    "A tooth opens straight out to the bench. Nothing shuts it in.": "हर दाँता सीधा बेंच की ओर खुलता है। उसे कुछ नहीं घेरता।",
    "Circles are packed in rows. A little curved space sits between every four of them. Gap, or only the edge?": "वृत्त कतारों में सजे हैं। हर चार वृत्तों के बीच एक छोटी गोल-सी जगह है। खाली जगह है या सिर्फ़ किनारा?",
    "Circles close round that little space on every side.": "वृत्त उस छोटी जगह को चारों ओर से घेरे हुए हैं।",

    "Carrying a tiling on": "बिछावट को आगे बढ़ाना",
    "Where does the next one go? Which way must it face?": "अगली टाइल कहाँ जाएगी? उसे किस ओर घुमाकर रखना है?",
    "Where does the next copy touch the last one?": "अगली टाइल पिछली से कहाँ छूती है?",
    "Run the overlap finder. Does the new copy lie over the last?": "ओवरलैप खोजक चलाओ। क्या नई टाइल पिछली के ऊपर चढ़ी है?",
    "A tiling is carried on by repeating the same shape the same way, with no gap and no overlap.": "एक ही आकृति को एक ही तरह दोहराने से बिछावट आगे बढ़ती है। न खाली जगह रहती है, न ओवरलैप।",
    "You learned: repeat the same shape the same way.": "तुमने सीखा: उसी आकृति को उसी तरह दोहराओ।",
    "Take a copy from the tray. Turn it the right way for its place, then set it down.": "ट्रे से एक टाइल लो। उसे उसकी जगह के हिसाब से सही ओर घुमाओ, फिर रख दो।",
    "Set it down": "इसे रखो",
    "fits": "ठीक बैठी",
    "apart": "ठीक नहीं",
    "Look at the copy just before it. Which way is that one facing?": "इससे ठीक पहले वाली टाइल देखो। वह किस ओर है?",
    "Each domino is two squares long. Four are down. Lay three more. How many squares long is the row then?": "हर डोमिनो दो खाने लंबा है। चार रखे हैं। तीन और रखो। तब कतार कितने खाने लंबी होगी?",
    "Squares in all": "कुल खाने",
    "Count the squares on one domino, then count the dominoes.": "एक डोमिनो के खाने गिनो, फिर डोमिनो गिनो।",
    "The first triangle points up, and they take turns after that. Which way does the tenth one point?": "पहला त्रिभुज ऊपर की ओर है। उसके बाद वे बारी-बारी से आते हैं। दसवें त्रिभुज की नोक किस ओर होगी?",
    "The tenth one": "दसवाँ",
    "Up": "ऊपर",
    "Down": "नीचे",
    "up": "ऊपर",
    "down": "नीचे",
    "Carry the row on and count the copies as they land.": "कतार को आगे बढ़ाओ और टाइलें रखते हुए गिनो।",

    "Patterns made from things around you": "आस-पास की चीज़ों से पैटर्न",
    "Make a pattern of your own. Which group comes round again?": "अपना एक पैटर्न बनाओ। कौन सा समूह बार-बार आता है?",
    "How many things are in one group?": "एक समूह में कितनी चीज़ें हैं?",
    "Read each card again, and match it to what you can see.": "हर कार्ड फिर पढ़ो और उसे जो दिख रहा है उससे मिलाओ।",
    "Everyday things make a pattern when a group of them repeats.": "रोज़ की चीज़ों का एक समूह दोहराया जाए, तो पैटर्न बनता है।",
    "You learned: things make a pattern when a group repeats.": "तुमने सीखा: समूह दोहराने से चीज़ों का पैटर्न बनता है।",
    "This toran repeats marigold, leaf, leaf, rose along its string. Twelve pieces hang on it. How many marigolds?": "इस तोरण की डोरी पर गेंदा, पत्ता, पत्ता, गुलाब बार-बार आते हैं। उस पर 12 टुकड़े लटके हैं। कितने गेंदे हैं?",
    "Marigolds?": "गेंदे?",
    "Use the group key. Watch the bracket light every copy along the string.": "समूह वाला बटन दबाओ। देखो, ब्रैकेट डोरी के हर समूह को चमकाता है।",
    "Coins and caps fill three rows of five, swapping like a chessboard. The first row starts with a coin. Lay the third row, then count the coins.": "सिक्के और ढक्कन पाँच-पाँच की तीन कतारें भरते हैं। वे शतरंज के बोर्ड की तरह बदलते हैं। पहली कतार सिक्के से शुरू होती है। तीसरी कतार रखो, फिर सिक्के गिनो।",
    "Coins in all": "कुल सिक्के",
    "Look down a column. Coin, cap, coin: what must come next?": "एक स्तंभ में ऊपर से नीचे देखो। सिक्का, ढक्कन, सिक्का: आगे क्या आएगा?",
    "Here is a word for a floor of tiles with no gaps and no overlaps. Pick its card.": "टाइलों का एक फर्श है, जिसमें न खाली जगह है, न ओवरलैप। उसके शब्द का कार्ड चुनो।",
    "Which word?": "कौन सा शब्द?",
    "Copies of one shape, side by side, cover the bench. Which card names that?": "एक आकृति की टाइलें साथ-साथ पूरी बेंच ढकती हैं। कौन सा कार्ड इसका नाम बताता है?",

    "Things": "चीज़ें",
    "Copies": "टाइलें",
    "{a} of {b}": "{b} में से {a}",
    "Gap finder": "खाली जगह खोजक",
    "Overlap finder": "ओवरलैप खोजक",
    "Carry on": "आगे बढ़ाओ",
    "Group": "समूह",
    "Turn": "घुमाओ",
    "A tessellation": "टेसेलेशन है",
    "Not a tessellation": "टेसेलेशन नहीं",
    "It fits": "ठीक बैठती है",
    "Points down": "नोक नीचे की ओर",
    "Number pattern": "संख्या पैटर्न",
    "Numbers that repeat": "दोहराती संख्याएँ",
    "Series": "क्रम",
    "A list in order": "क्रम से लगी सूची",
    "Secret code": "गुप्त कोड",
    "Read with a key": "कुंजी से पढ़ें",
    "Tessellation": "टेसेलेशन",
    "No gaps, no overlaps": "न खाली जगह, न ओवरलैप",
    "pattern": "संख्या पैटर्न",
    "series": "क्रम",
    "code": "गुप्त कोड",
    "tessellation": "टेसेलेशन",
    "Lay copies": "टाइलें रखो",
    "Find a gap": "खाली जगह ढूँढो",
    "Carry it on": "आगे बढ़ाओ",
    "Make a pattern": "पैटर्न बनाओ",
  },
  gu: {
    "Tile Bench": "ટાઇલ બેન્ચ",
    "A bench of dotted paper and a tray of shapes. Lay the first copy down.": "ટપકાંવાળા કાગળની એક બેન્ચ અને આકૃતિઓની એક ટ્રે. પહેલી ટાઇલ મૂકો.",
    "Every patch tested for gaps and for overlaps, and a pattern of your own laid out.": "દરેક ગોઠવણીમાં ખાલી જગ્યા અને ઓવરલેપ તપાસાયા. તમે તમારી પોતાની એક પેટર્ન પણ બનાવી.",
    "Free play. Any shape, any things from the tray, with both finders open.": "મુક્ત રમત. કોઈ પણ આકૃતિ કે વસ્તુ મૂકો અને બંને શોધક અજમાવો.",

    "Copies that fit with no gaps": "ખાલી જગ્યા વગરની ટાઇલો",
    "Lay the copies side by side. Is anything left uncovered? Is anything doubled?": "ટાઇલો બાજુ બાજુમાં મૂકો. શું કોઈ જગ્યા ખાલી રહી? શું કોઈ ભાગ બે વાર ઢંકાયો?",
    "Does any copy lie over another?": "શું કોઈ ટાઇલ બીજી ટાઇલ ઉપર છે?",
    "Run both finders once more, and read what each one shows.": "બંને શોધક ફરી ચલાવો અને જુઓ કે દરેક શું બતાવે છે.",
    "Copies of one shape set side by side with no gaps and no overlaps make a tessellation.": "એક આકૃતિની ટાઇલો ખાલી જગ્યા અને ઓવરલેપ વગર જોડાય. ત્યારે ટેસેલેશન બને છે.",
    "You learned: no gaps and no overlaps makes a tessellation.": "તમે શીખ્યા: ખાલી જગ્યા અને ઓવરલેપ ન હોય તો ટેસેલેશન બને.",
    "A brick wall has rows of bricks, each row moved along by half a brick. Is the wall a tessellation?": "ઇંટની દીવાલમાં ઇંટોની હરોળ છે. દરેક હરોળ અડધી ઇંટ ખસેલી છે. શું આ દીવાલ ટેસેલેશન છે?",
    "Tessellation?": "ટેસેલેશન?",
    "Yes": "હા",
    "No": "ના",
    "yes": "હા",
    "no": "ના",
    "Look along each row. Does a brick sit right against the next one?": "દરેક હરોળ જુઓ. શું દરેક ઇંટ બાજુની ઇંટને અડીને છે?",
    "Round coins lie touching each other on the table. Is this a tessellation?": "ગોળ સિક્કા ટેબલ પર એકબીજાને અડીને પડ્યા છે. શું આ ટેસેલેશન છે?",
    "Push the coins as close as you like. Look at the space between four of them.": "સિક્કાઓને ગમે તેટલા નજીક ખસેડો. ચાર સિક્કા વચ્ચેની જગ્યા જુઓ.",
    "One square tile lies half over another. Nothing between them is left uncovered. Is it a tessellation?": "એક ચોરસ ટાઇલ બીજી ટાઇલ પર અડધી ચડેલી છે. તેમની વચ્ચે કંઈ ખાલી નથી. શું આ ટેસેલેશન છે?",
    "Run the second finder over the pair. Is any part covered twice?": "બીજો શોધક આ જોડી પર ચલાવો. શું કોઈ ભાગ બે વાર ઢંકાયો છે?",

    "A gap or only the edge": "ખાલી જગ્યા કે ફક્ત કિનારો",
    "Is this space closed in by tiles all round? Or is it where the tiling stops?": "શું આ જગ્યા ચારે બાજુ ટાઇલોથી ઘેરાયેલી છે? કે અહીં ટાઇલો પૂરી થાય છે?",
    "Look at the outline. Where it stops, the bench is open.": "બહારની રેખા જુઓ. જ્યાં તે અટકે છે, ત્યાં બેન્ચ ખુલ્લી છે.",
    "Look for tiles on every side of the space.": "તે જગ્યાની ચારે બાજુ ટાઇલો શોધો.",
    "A gap is a space with tiles closed round it on every side. The bumpy outer edge is only where the tiling stops.": "ખાલી જગ્યા એટલે એવી જગ્યા, જેની ચારે બાજુ ટાઇલો ઘેરાયેલી હોય. ઊબડખાબડ બહારનો કિનારો તો ફક્ત ત્યાં છે, જ્યાં ટાઇલો પૂરી થાય છે.",
    "You learned: a gap is closed in; the outer edge is not.": "તમે શીખ્યા: ખાલી જગ્યા ઘેરાયેલી હોય, બહારનો કિનારો નહીં.",
    "The triangles make a bumpy top edge with notches all along it. No space is shut in. Is it a tessellation?": "ત્રિકોણ ઉપર ઊબડખાબડ કિનારો બનાવે છે. તેમાં ઠેર ઠેર ખાંચા છે. કોઈ જગ્યા ઘેરાયેલી નથી. શું આ ટેસેલેશન છે?",
    "Try to run a finger from a notch out to the open bench.": "ખાંચામાંથી આંગળી ચલાવીને ખુલ્લી બેન્ચ સુધી જવાનો પ્રયત્ન કરો.",
    "This patch of diamonds has saw teeth down both sides. Are the teeth gaps, or only the edge?": "હીરાની ટાઇલોની આ ગોઠવણીમાં બંને બાજુ કરવત જેવા દાંતા છે. શું દાંતા ખાલી જગ્યા છે, કે ફક્ત કિનારો?",
    "Gap or edge?": "ખાલી જગ્યા કે કિનારો?",
    "A gap": "ખાલી જગ્યા",
    "Only the edge": "ફક્ત કિનારો",
    "gap": "ખાલી જગ્યા",
    "edge": "ફક્ત કિનારો",
    "A tooth opens straight out to the bench. Nothing shuts it in.": "દરેક દાંતો સીધો બેન્ચ તરફ ખુલે છે. તેને કંઈ ઘેરતું નથી.",
    "Circles are packed in rows. A little curved space sits between every four of them. Gap, or only the edge?": "વર્તુળો હરોળમાં ગોઠવેલા છે. દરેક ચાર વર્તુળ વચ્ચે એક નાની ગોળ જેવી જગ્યા છે. ખાલી જગ્યા છે કે ફક્ત કિનારો?",
    "Circles close round that little space on every side.": "વર્તુળો તે નાની જગ્યાને ચારે બાજુથી ઘેરે છે.",

    "Carrying a tiling on": "ગોઠવણીને આગળ વધારવી",
    "Where does the next one go? Which way must it face?": "આગળની ટાઇલ ક્યાં જશે? તેને કઈ તરફ ફેરવીને મૂકવી?",
    "Where does the next copy touch the last one?": "આગળની ટાઇલ પાછલી ટાઇલને ક્યાં અડે છે?",
    "Run the overlap finder. Does the new copy lie over the last?": "ઓવરલેપ શોધક ચલાવો. શું નવી ટાઇલ પાછલી ટાઇલ પર ચડી છે?",
    "A tiling is carried on by repeating the same shape the same way, with no gap and no overlap.": "એક જ આકૃતિને એક જ રીતે દોહરાવવાથી ગોઠવણી આગળ વધે છે. ન ખાલી જગ્યા રહે, ન ઓવરલેપ.",
    "You learned: repeat the same shape the same way.": "તમે શીખ્યા: એ જ આકૃતિને એ જ રીતે દોહરાવો.",
    "Take a copy from the tray. Turn it the right way for its place, then set it down.": "ટ્રેમાંથી એક ટાઇલ લો. તેને તેની જગ્યા પ્રમાણે સાચી તરફ ફેરવો, પછી મૂકો.",
    "Set it down": "તેને મૂકો",
    "fits": "બરાબર બેઠી",
    "apart": "બરાબર નહીં",
    "Look at the copy just before it. Which way is that one facing?": "તેની તરત પહેલાંની ટાઇલ જુઓ. તે કઈ તરફ છે?",
    "Each domino is two squares long. Four are down. Lay three more. How many squares long is the row then?": "દરેક ડોમિનો બે ખાનાં લાંબો છે. ચાર મૂક્યા છે. ત્રણ વધુ મૂકો. ત્યારે હરોળ કેટલા ખાનાં લાંબી થશે?",
    "Squares in all": "કુલ ખાનાં",
    "Count the squares on one domino, then count the dominoes.": "એક ડોમિનોના ખાનાં ગણો, પછી ડોમિનો ગણો.",
    "The first triangle points up, and they take turns after that. Which way does the tenth one point?": "પહેલો ત્રિકોણ ઉપર તરફ છે. તે પછી તે વારાફરતી આવે છે. દસમા ત્રિકોણની ટોચ કઈ તરફ હશે?",
    "The tenth one": "દસમો",
    "Up": "ઉપર",
    "Down": "નીચે",
    "up": "ઉપર",
    "down": "નીચે",
    "Carry the row on and count the copies as they land.": "હરોળ આગળ વધારો અને ટાઇલો મૂકતાં ગણો.",

    "Patterns made from things around you": "આસપાસની વસ્તુઓથી પેટર્ન",
    "Make a pattern of your own. Which group comes round again?": "તમારી પોતાની એક પેટર્ન બનાવો. કયો સમૂહ ફરી ફરી આવે છે?",
    "How many things are in one group?": "એક સમૂહમાં કેટલી વસ્તુઓ છે?",
    "Read each card again, and match it to what you can see.": "દરેક કાર્ડ ફરી વાંચો અને જે દેખાય છે તેની સાથે મેળવો.",
    "Everyday things make a pattern when a group of them repeats.": "રોજની વસ્તુઓનો એક સમૂહ દોહરાય, તો પેટર્ન બને છે.",
    "You learned: things make a pattern when a group repeats.": "તમે શીખ્યા: સમૂહ દોહરાય ત્યારે વસ્તુઓની પેટર્ન બને છે.",
    "This toran repeats marigold, leaf, leaf, rose along its string. Twelve pieces hang on it. How many marigolds?": "આ તોરણની દોરી પર ગલગોટો, પાન, પાન, ગુલાબ ફરી ફરી આવે છે. તેના પર 12 ટુકડા લટકે છે. કેટલા ગલગોટા છે?",
    "Marigolds?": "ગલગોટા?",
    "Use the group key. Watch the bracket light every copy along the string.": "સમૂહ વાળું બટન દબાવો. જુઓ, બ્રેકેટ દોરી પરના દરેક સમૂહને ચમકાવે છે.",
    "Coins and caps fill three rows of five, swapping like a chessboard. The first row starts with a coin. Lay the third row, then count the coins.": "સિક્કા અને ઢાંકણાં પાંચ-પાંચની ત્રણ હરોળ ભરે છે. તે ચેસના બોર્ડની જેમ વારાફરતી આવે છે. પહેલી હરોળ સિક્કાથી શરૂ થાય છે. ત્રીજી હરોળ મૂકો, પછી સિક્કા ગણો.",
    "Coins in all": "કુલ સિક્કા",
    "Look down a column. Coin, cap, coin: what must come next?": "એક સ્તંભમાં ઉપરથી નીચે જુઓ. સિક્કો, ઢાંકણ, સિક્કો: આગળ શું આવશે?",
    "Here is a word for a floor of tiles with no gaps and no overlaps. Pick its card.": "ટાઇલોનું એક ફર્શ છે, જેમાં ન ખાલી જગ્યા છે, ન ઓવરલેપ. તેના શબ્દનું કાર્ડ પસંદ કરો.",
    "Which word?": "કયો શબ્દ?",
    "Copies of one shape, side by side, cover the bench. Which card names that?": "એક આકૃતિની ટાઇલો બાજુ બાજુમાં આખી બેન્ચને ઢાંકે છે. કયું કાર્ડ તેનું નામ આપે છે?",

    "Things": "વસ્તુઓ",
    "Copies": "ટાઇલો",
    "{a} of {b}": "{b} માંથી {a}",
    "Gap finder": "ખાલી જગ્યા શોધક",
    "Overlap finder": "ઓવરલેપ શોધક",
    "Carry on": "આગળ વધારો",
    "Group": "સમૂહ",
    "Turn": "ફેરવો",
    "A tessellation": "ટેસેલેશન છે",
    "Not a tessellation": "ટેસેલેશન નથી",
    "It fits": "બરાબર બેસે છે",
    "Points down": "ટોચ નીચે તરફ",
    "Number pattern": "સંખ્યા પેટર્ન",
    "Numbers that repeat": "દોહરાતી સંખ્યાઓ",
    "Series": "ક્રમ",
    "A list in order": "ક્રમમાં યાદી",
    "Secret code": "ગુપ્ત સંકેત",
    "Read with a key": "ચાવીથી વાંચો",
    "Tessellation": "ટેસેલેશન",
    "No gaps, no overlaps": "ન ખાલી, ન ઓવરલેપ",
    "pattern": "સંખ્યા પેટર્ન",
    "series": "ક્રમ",
    "code": "ગુપ્ત સંકેત",
    "tessellation": "ટેસેલેશન",
    "Lay copies": "ટાઇલો મૂકો",
    "Find a gap": "જગ્યા શોધો",
    "Carry it on": "આગળ વધારો",
    "Make a pattern": "પેટર્ન બનાવો",
  },
};

/* One entry per phase = one mount. (Field notes: see the scaffold header in docs/BUILD_CARD.md §4.)
   kind    verdict · space · place · count · facing · string · rows · card  (Work, judge and the
           traceback switch on it)
   lay     which tiling the bench draws; pre = copies already on the bench, all = copies in the patch
   near    the item's own misconception, the answer judge must reject
   badge   the plate the traceback ends on, for the items whose answer is not a number */
const PHASES = [
  {
    n: 1,
    concept: "Copies that fit with no gaps",
    conceptId: "M2.S4.T7.C24", objectiveIds: ["O11"],
    says: ["Lay the copies side by side. Is anything left uncovered? Is anything doubled?"],
    ladder: ["Does any copy lie over another?", "Run both finders once more, and read what each one shows."],
    closing: "Copies of one shape set side by side with no gaps and no overlaps make a tessellation.",
    learned: "You learned: no gaps and no overlaps makes a tessellation.",
    traceback: "Both finders run over the child's own patch and the patch is named on a plate.",
    items: [
      /* learn ML1: answer in the plan = Yes. The bricks fit side by side with no gaps and no overlaps, so the wall is a tessellation */
      { qid: "M2.S4.T7.C24:ML1", kind: "verdict", lay: "brick", pre: 12, all: 15, badge: "A tessellation",
        say: "A brick wall has rows of bricks, each row moved along by half a brick. Is the wall a tessellation?",
        ask: "Tessellation?", answer: "yes", near: "no",
        choices: [{ id: "yes", label: "Yes" }, { id: "no", label: "No" }],
        miss: "Look along each row. Does a brick sit right against the next one?" },
      /* practice 1: answer in the plan = No. Circles leave gaps between them, however they are pushed together */
      { qid: "M2.S4.T7.C24:1", kind: "verdict", lay: "disc", pre: 15, all: 18, badge: "Not a tessellation",
        say: "Round coins lie touching each other on the table. Is this a tessellation?",
        ask: "Tessellation?", answer: "no", near: "yes",
        choices: [{ id: "yes", label: "Yes" }, { id: "no", label: "No" }],
        miss: "Push the coins as close as you like. Look at the space between four of them." },
      /* practice 2: answer in the plan = No. There are no gaps, but one tile overlaps the other, and a tessellation needs no gaps and no overlaps */
      { qid: "M2.S4.T7.C24:2", kind: "verdict", lay: "lap", pre: 2, all: 5, badge: "Not a tessellation",
        say: "One square tile lies half over another. Nothing between them is left uncovered. Is it a tessellation?",
        ask: "Tessellation?", answer: "no", near: "yes",
        choices: [{ id: "yes", label: "Yes" }, { id: "no", label: "No" }],
        miss: "Run the second finder over the pair. Is any part covered twice?" },
    ],
  },
  {
    n: 2,
    concept: "A gap or only the edge",
    conceptId: "M2.S4.T7.C25", objectiveIds: ["O11"],
    says: ["Is this space closed in by tiles all round? Or is it where the tiling stops?"],
    ladder: ["Look at the outline. Where it stops, the bench is open.", "Look for tiles on every side of the space."],
    closing: "A gap is a space with tiles closed round it on every side. The bumpy outer edge is only where the tiling stops.",
    learned: "You learned: a gap is closed in; the outer edge is not.",
    traceback: "The wash pours over the patch, a tracer runs from the space, and the plate names it.",
    items: [
      /* learn ML2: answer in the plan = Yes. The notches are only where the tiling stops, so they are not a gap, and nothing inside the patch is left uncovered */
      { qid: "M2.S4.T7.C25:ML2", kind: "verdict", lay: "spike", pre: 13, all: 13, badge: "A tessellation",
        say: "The triangles make a bumpy top edge with notches all along it. No space is shut in. Is it a tessellation?",
        ask: "Tessellation?", answer: "yes", near: "no",
        choices: [{ id: "yes", label: "Yes" }, { id: "no", label: "No" }],
        miss: "Try to run a finger from a notch out to the open bench.",
        tracer: "M 262 208 L 262 132 L 262 118", tracerTip: [262, 118] },
      /* practice 3: answer in the plan = No. The saw-tooth outline is only where the tiling stops, so it is not a gap */
      { qid: "M2.S4.T7.C25:3", kind: "space", lay: "dia", pre: 20, all: 20, badge: "Only the edge",
        say: "This patch of diamonds has saw teeth down both sides. Are the teeth gaps, or only the edge?",
        ask: "Gap or edge?", answer: "edge", near: "gap",
        choices: [{ id: "gap", label: "A gap" }, { id: "edge", label: "Only the edge" }],
        miss: "A tooth opens straight out to the bench. Nothing shuts it in.",
        tracer: "M 84 224 L 44 224 L 26 224", tracerTip: [26, 224] },
      /* practice 4: answer in the plan = A gap, because circles close round it on every side, so the circles are not a tessellation */
      { qid: "M2.S4.T7.C25:4", kind: "space", lay: "disc", pre: 18, all: 18, badge: "A gap",
        say: "Circles are packed in rows. A little curved space sits between every four of them. Gap, or only the edge?",
        ask: "Gap or edge?", answer: "gap", near: "edge",
        choices: [{ id: "gap", label: "A gap" }, { id: "edge", label: "Only the edge" }],
        miss: "Circles close round that little space on every side.",
        tracer: "M 130 224 a 10 10 0 1 0 20 0 a 10 10 0 1 0 -20 0", tracerTip: [150, 224] },
    ],
  },
  {
    n: 3,
    concept: "Carrying a tiling on",
    conceptId: "M2.S4.T7.C26", objectiveIds: ["O12"],
    says: ["Where does the next one go? Which way must it face?"],
    ladder: ["Where does the next copy touch the last one?", "Run the overlap finder. Does the new copy lie over the last?"],
    closing: "A tiling is carried on by repeating the same shape the same way, with no gap and no overlap.",
    learned: "You learned: repeat the same shape the same way.",
    traceback: "The next copy is set down the right way up on a demo layer, with both finders empty.",
    items: [
      /* learn ML3: answer in the plan = Point down, point up, point down.
         Taken as one act: the child turns the copy and sets it down, and the bench says whether it fits. */
      { qid: "M2.S4.T7.C26:ML3", kind: "place", lay: "tri", pre: 3, all: 4, pad: "enter", badge: "It fits",
        say: "Take a copy from the tray. Turn it the right way for its place, then set it down.",
        ask: "Set it down", answer: "fits", near: "apart",
        miss: "Look at the copy just before it. Which way is that one facing?" },
      /* practice 5: answer in the plan = 14 squares, because seven dominoes each two squares long make 14 */
      { qid: "M2.S4.T7.C26:5", kind: "count", lay: "domino", pre: 4, all: 7,
        say: "Each domino is two squares long. Four are down. Lay three more. How many squares long is the row then?",
        ask: "Squares in all", answer: 14, near: 7,
        miss: "Count the squares on one domino, then count the dominoes." },
      /* practice 6: answer in the plan = Down. The odd-numbered triangles point up and the even-numbered ones point down, and ten is even */
      { qid: "M2.S4.T7.C26:6", kind: "facing", lay: "tri", pre: 3, all: 10,
        say: "The first triangle points up, and they take turns after that. Which way does the tenth one point?",
        ask: "The tenth one", answer: "down", near: "up",
        choices: [{ id: "up", label: "Up" }, { id: "down", label: "Down" }],
        miss: "Carry the row on and count the copies as they land." },
    ],
  },
  {
    n: 4,
    concept: "Patterns made from things around you",
    conceptId: "M2.S4.T7.C27", objectiveIds: ["O12"],
    says: ["Make a pattern of your own. Which group comes round again?"],
    ladder: ["How many things are in one group?", "Read each card again, and match it to what you can see."],
    closing: "Everyday things make a pattern when a group of them repeats.",
    learned: "You learned: things make a pattern when a group repeats.",
    traceback: "The bracket lights every copy of the group, and the count is drawn beside it.",
    items: [
      /* learn ML4: answer in the plan = Three, because the group of four repeats three times in twelve pieces */
      { qid: "M2.S4.T7.C27:ML4", kind: "string", pre: 0, all: 12,
        say: "This toran repeats marigold, leaf, leaf, rose along its string. Twelve pieces hang on it. How many marigolds?",
        ask: "Marigolds?", answer: 3, near: 6,
        miss: "Use the group key. Watch the bracket light every copy along the string." },
      /* practice 7: answer in the plan = Blue starts the third row, and 8 buttons are blue.
         Told by shape, not colour: coins and caps, so the reading survives without the colour. */
      { qid: "M2.S4.T7.C27:7", kind: "rows", pre: 10, all: 15,
        say: "Coins and caps fill three rows of five, swapping like a chessboard. The first row starts with a coin. Lay the third row, then count the coins.",
        ask: "Coins in all", answer: 8, near: 7,
        miss: "Look down a column. Coin, cap, coin: what must come next?" },
      /* practice 8: answer in the plan = A tessellation; a secret code; a series, whose rule is its number pattern.
         One of the three is asked; all four chapter words stand on the bench as cards. */
      { qid: "M2.S4.T7.C27:8", kind: "card", pre: 8, all: 8, pad: "enter",
        say: "Here is a word for a floor of tiles with no gaps and no overlaps. Pick its card.",
        ask: "Which word?", answer: "tessellation", near: "series",
        miss: "Copies of one shape, side by side, cover the bench. Which card names that?" },
    ],
  },
];

/* ── the bench, in working-area units (the working area is 1086 x 528) ───────────────────── */
const BENCH = { x: 0, y: 104, w: 760, h: 320 };
const TRAY = { x: 0, y: 4, w: 760, h: 90 };
const SIDE = { x: 778, y: 4, w: 300, h: 420 };
const CANDO = { x: 0, y: 446, w: 1086, h: 72 };
const DOT = 40;                     /* the dotted paper: a dot every 40 in both directions */
const CELL = 8;                     /* the finders read the bench on a lattice this fine */
const CANDO_LINES = ["Lay copies", "Find a gap", "Carry it on", "Make a pattern"];
const CARDS = [
  { id: "pattern", w: "Number pattern", m: "Numbers that repeat" },
  { id: "series", w: "Series", m: "A list in order" },
  { id: "code", w: "Secret code", m: "Read with a key" },
  { id: "tessellation", w: "Tessellation", m: "No gaps, no overlaps" },
];
const TORAN = ["marigold", "leaf", "leaf", "rose", "marigold", "leaf", "leaf", "rose", "marigold", "leaf", "leaf", "rose"];
const FREE_SHAPES = [
  { id: "sqr", label: "Square" }, { id: "brick", label: "Brick" }, { id: "tri", label: "Triangle" },
  { id: "dia", label: "Diamond" }, { id: "disc", label: "Circle" }, { id: "ell", label: "L shape" },
];
/* Free play: how many copies of each shape the bench holds before it starts again, so a tiling
   always stops above the pattern shelf along the foot of the bench. */
const FREE_MAX: any = { sqr: 8, brick: 20, tri: 15, dia: 20, disc: 12, ell: 20 };
const FREE_THINGS = ["marigold", "leaf", "rose", "coin", "cap"];

/* The numbers, rows, sizes and targets the working area needs (they go into the sidecar too). */
const MODEL = { bench: BENCH, tray: TRAY, side: SIDE, cando: CANDO, dot: DOT, cell: CELL,
  toran: TORAN, cards: CARDS.map((c) => c.id), rowsPattern: "coin and cap, swapping like a chessboard" };

/* seat i of a tiling: where the next copy goes, and which way it faces if nothing turns it */
const seatOf = (lay: string, i: number, f?: string) => {
  if (lay === "brick") { const r = Math.floor(i / 5), c = i % 5; return { k: "rect", x: 60 + c * 80 + (r % 2) * 40, y: 164 + r * 40, w: 80, h: 40 }; }
  if (lay === "disc") { const r = Math.floor(i / 6), c = i % 6; return { k: "disc", x: 60 + c * 80, y: 144 + r * 80, w: 80, h: 80 }; }
  if (lay === "lap") return { k: "rect", x: 80 + i * 40, y: 184, w: 80, h: 80 };
  if (lay === "domino") return { k: "rect", x: 60 + i * 80, y: 224, w: 80, h: 40, split: true };
  if (lay === "sqr") { const r = Math.floor(i / 4), c = i % 4; return { k: "rect", x: 100 + c * 80, y: 164 + r * 80, w: 80, h: 80 }; }
  if (lay === "dia") { const r = Math.floor(i / 5), c = i % 5; return { k: "dia", x: 60 + c * 80 + (r % 2) * 40, y: 144 + r * 40, w: 80, h: 80 }; }
  /* two L shapes of three joined squares fill one block of six, so the L tessellates */
  if (lay === "ell") { const p = Math.floor(i / 2);
    return { k: "ell", x: 60 + (p % 5) * 120, y: 144 + Math.floor(p / 5) * 80, u: 40, w: 120, h: 80, f: i % 2 ? "b" : "a" }; }
  if (lay === "spike") {
    if (i < 9) return { k: "tri", x: 100 + i * 40, y: 224, w: 80, h: 80, f: i % 2 ? "down" : "up" };
    return { k: "tri", x: 100 + (i - 9) * 80, y: 144, w: 80, h: 80, f: "up" };
  }
  return { k: "tri", x: 100 + i * 40, y: 204, w: 80, h: 80, f: f || (i % 2 ? "down" : "up") };
};

/* one tile as an SVG path: the same outline the finders read */
const tilePath = (t: any) => {
  if (t.k === "rect") return `M ${t.x} ${t.y} H ${t.x + t.w} V ${t.y + t.h} H ${t.x} Z`;
  if (t.k === "dia") { const cx = t.x + t.w / 2, cy = t.y + t.h / 2, a = t.w / 2; return `M ${cx} ${cy - a} L ${cx + a} ${cy} L ${cx} ${cy + a} L ${cx - a} ${cy} Z`; }
  if (t.k === "ell") { const u = t.u || 40, x = t.x, y = t.y;
    return t.f === "b" ? `M ${x + u} ${y} H ${x + 3 * u} V ${y + 2 * u} H ${x + 2 * u} V ${y + u} H ${x + u} Z`
      : `M ${x} ${y} H ${x + u} V ${y + u} H ${x + 2 * u} V ${y + 2 * u} H ${x} Z`; }
  if (t.k === "tri") { const a = t.x, b = t.x + t.w, m = t.x + t.w / 2;
    return t.f === "down" ? `M ${a} ${t.y} H ${b} L ${m} ${t.y + t.h} Z` : `M ${a} ${t.y + t.h} H ${b} L ${m} ${t.y} Z`; }
  const cx = t.x + t.w / 2, cy = t.y + t.h / 2, r = t.w / 2;
  return `M ${cx - r} ${cy} a ${r} ${r} 0 1 0 ${2 * r} 0 a ${r} ${r} 0 1 0 ${-2 * r} 0 Z`;
};
/* a loose copy of a shape, drawn round a point (the tray) */
const shapeTileAt = (shape: string, cx: number, cy: number, f?: string) =>
  shape === "tri" ? { k: "tri", x: cx - 34, y: cy - 34, w: 68, h: 68, f: f || "up" }
  : shape === "brick" || shape === "domino" ? { k: "rect", x: cx - 36, y: cy - 18, w: 72, h: 36 }
  : shape === "dia" ? { k: "dia", x: cx - 34, y: cy - 34, w: 68, h: 68 }
  : shape === "disc" ? { k: "disc", x: cx - 32, y: cy - 32, w: 64, h: 64 }
  : shape === "ell" ? { k: "ell", x: cx - 39, y: cy - 26, u: 26, w: 78, h: 52, f: f === "b" ? "b" : "a" }
  : { k: "rect", x: cx - 32, y: cy - 32, w: 64, h: 64 };
const inTile = (t: any, px: number, py: number) => {
  if (t.k === "rect") return px >= t.x && px < t.x + t.w && py >= t.y && py < t.y + t.h;
  if (t.k === "ell") { const u = t.u || 40, x = t.x, y = t.y;
    return t.f === "b" ? ((px >= x + u && px < x + 3 * u && py >= y && py < y + u) || (px >= x + 2 * u && px < x + 3 * u && py >= y + u && py < y + 2 * u))
      : ((px >= x && px < x + u && py >= y && py < y + 2 * u) || (px >= x + u && px < x + 2 * u && py >= y + u && py < y + 2 * u)); }
  if (t.k === "disc") { const dx = px - (t.x + t.w / 2), dy = py - (t.y + t.h / 2); return dx * dx + dy * dy <= (t.w / 2) * (t.w / 2); }
  if (t.k === "dia") { const a = t.w / 2; return Math.abs(px - (t.x + a)) / a + Math.abs(py - (t.y + a)) / a <= 1; }
  if (py < t.y || py >= t.y + t.h) return false;
  const up = t.f !== "down", g = up ? (py - t.y) / t.h : 1 - (py - t.y) / t.h;
  return Math.abs(px - (t.x + t.w / 2)) <= g * (t.w / 2);
};

/* the two finders, measured: every space with tiles closed round it on every side, and every part
   covered by more than one copy. The lattice is sampled off the whole numbers, so a shared edge is
   never read as a doubled part. */
const scanBench = (tiles: any[]) => {
  const cols = Math.ceil(BENCH.w / CELL), rows = Math.ceil(BENCH.h / CELL);
  const cnt = new Uint8Array(cols * rows);
  for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) {
    const px = BENCH.x + i * CELL + 3.7, py = BENCH.y + j * CELL + 4.1;
    let c = 0;
    for (let k = 0; k < tiles.length && c < 2; k++) if (inTile(tiles[k], px, py)) c++;
    cnt[j * cols + i] = c;
  }
  const out = new Uint8Array(cols * rows), stack: number[] = [];
  const open = (i: number, j: number) => { const p = j * cols + i; if (i < 0 || j < 0 || i >= cols || j >= rows || out[p] || cnt[p]) return; out[p] = 1; stack.push(p); };
  for (let i = 0; i < cols; i++) { open(i, 0); open(i, rows - 1); }
  for (let j = 0; j < rows; j++) { open(0, j); open(cols - 1, j); }
  while (stack.length) { const p = stack.pop() as number, i = p % cols, j = (p - i) / cols; open(i - 1, j); open(i + 1, j); open(i, j - 1); open(i, j + 1); }
  const runs = (pick: (p: number) => boolean) => {
    const r: any[] = [];
    for (let j = 0; j < rows; j++) { let s = -1;
      for (let i = 0; i <= cols; i++) { const on = i < cols && pick(j * cols + i);
        if (on && s < 0) s = i;
        else if (!on && s >= 0) { r.push({ x: BENCH.x + s * CELL, y: BENCH.y + j * CELL, w: (i - s) * CELL, h: CELL }); s = -1; } } }
    return r;
  };
  const gaps = runs((p) => cnt[p] === 0 && !out[p]);
  const laps = runs((p) => cnt[p] > 1);
  return { gaps, laps, nGap: gaps.length, nLap: laps.length };
};

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* judge: is this value right for this item? (numbers compare as numbers) */
const judge = (item: any, v: any) => {
  if (typeof item.answer === "number") return leadNumber(v) === item.answer;
  return String(v).trim().toLowerCase() === String(item.answer).trim().toLowerCase();
};
/* oracle: every answer re-derived by a second route that shares no code with judge or Work.
   Nothing here reads the lattice the finders use: the verdicts come from area arithmetic and from
   tangency, and the numbers from repeated addition, parity and walking the pattern out. */
const oracle = () => {
  const d: any = {};
  /* 15 bricks of 80 by 40 = 48,000, and the three unbroken rows they make measure the same,
     so nothing is doubled and nothing is left uncovered */
  d["M2.S4.T7.C24:ML1"] = 15 * 80 * 40 === 3 * (5 * 80) * 40 ? "yes" : "no";
  /* 18 circles of radius 40 stand in the 480 by 240 box their centres fill, and cover less of it */
  d["M2.S4.T7.C24:1"] = 18 * Math.PI * 40 * 40 < 480 * 240 ? "no" : "yes";
  /* five 80-squares each set 40 further along cover a strip only 240 by 80: more tile than strip */
  d["M2.S4.T7.C24:2"] = 5 * 80 * 80 > (4 * 40 + 80) * 80 ? "no" : "yes";
  /* 13 triangles of half of 80 by 80 = 41,600, and the band (320 by 80) with four spikes and two
     end halves measures the same, so nothing is doubled; every notch has open bench straight above
     it (the spikes all stop at the same height), so no space is shut in */
  const triArea = 13 * (80 * 80 / 2), triUnion = 320 * 80 + 4 * (80 * 80 / 2) + 2 * (80 * 80 / 4);
  d["M2.S4.T7.C25:ML2"] = triArea === triUnion ? "yes" : "no";
  /* the diamond rows start 40 apart, so each tooth of the outline has bench straight beside it */
  d["M2.S4.T7.C25:3"] = 40 !== 0 ? "edge" : "gap";
  /* the four circles round the little space are 80 apart and their radii add to 80: they touch,
     so the ring closes and nothing can reach that space from outside */
  d["M2.S4.T7.C25:4"] = 40 + 40 >= 80 ? "gap" : "edge";
  /* the fourth copy sits at seat three; the row takes turns from seat zero pointing up */
  let face = "up"; for (let i = 1; i <= 3; i++) face = face === "up" ? "down" : "up";
  d["M2.S4.T7.C26:ML3"] = face === "down" ? "fits" : "apart";
  /* seven dominoes, two squares each, counted on by twos */
  let sq = 0; for (let i = 0; i < 7; i++) sq += 2;
  d["M2.S4.T7.C26:5"] = sq;
  /* the tenth triangle: turn the facing over nine times from the first */
  let f2 = "up"; for (let i = 1; i < 10; i++) f2 = f2 === "up" ? "down" : "up";
  d["M2.S4.T7.C26:6"] = f2;
  /* walk the twelve pieces of the toran and count the marigolds */
  d["M2.S4.T7.C27:ML4"] = TORAN.filter((t) => t === "marigold").length;
  /* three rows of five, a coin wherever the row and the place are both odd or both even */
  let coins = 0; for (let r = 0; r < 3; r++) for (let c = 0; c < 5; c++) if ((r + c) % 2 === 0) coins++;
  d["M2.S4.T7.C27:7"] = coins;
  /* the one card whose meaning is about gaps and overlaps */
  d["M2.S4.T7.C27:8"] = (CARDS.filter((c) => /gaps/.test(c.m))[0] || { id: "" }).id;
  return PHASES.every((p: any) => p.items.every((it: any) => String(d[it.qid]) === String(it.answer)));
};
/* the most likely wrong answer (the misconception); judge must reject it */
const nearMiss = (item: any) => item.near;
/* the forms of an answer that no question, hint or ladder line may print.
   A word-choice item bans nothing: the pad prints every choice, so naming one gives nothing away. */
const answerForms = (item: any) => (item.choices ? []
  : typeof item.answer === "number" ? [String(item.answer), indian(item.answer), words(item.answer)]
  : [String(item.answer)]);
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => item.answer;

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => (T.state().stage === "demo" ? HOOK.demo && HOOK.demo() : T.submit(item.answer));
/* the agent's answer() for an item made on the working area: set it as a child would; undefined = type it */
const answer = (item: any, v: any) => (item.pad === "enter" && HOOK.set ? HOOK.set(v) : undefined);
/* the agent's check() before Enter: e.g. drop a token that waits; undefined = press Enter */
const check = () => (HOOK.check ? HOOK.check() : undefined);

/* ── the working area: 1086 x 528, origin at its top-left ──────────────────────────────── */
function Work({ phase, n, item, index, stage, wrong, api, MODEL, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();
  const free = stage === "free";
  const kind = free ? "free" : item.kind;

  /* the child's own copies and things; a ref beside each, so Enter reads them the moment they land */
  const own = useRef<any[]>([]);
  const face = useRef("up");
  const ellFace = useRef("a");      /* the L of joined squares: "a" or its half-turn "b" */
  const picked = useRef<string | null>(null);
  const row3 = useRef<string[]>([]);
  const group = useRef(0);
  const freeKind = useRef("sqr");
  const freeThings = useRef<string[]>([]);
  const [tick, bump] = useState(0);
  const redraw = () => bump((v: number) => v + 1);
  const [gapOn, setGapOn] = useState(false);
  const [lapOn, setLapOn] = useState(false);
  const [wash, setWash] = useState(2);
  const [demo, setDemo] = useState<any>(null);
  const [done, setDone] = useState(false);

  /* a fresh question: the bench is set again and nothing of the last one is left standing */
  useEffect(() => {
    own.current = []; face.current = "up"; ellFace.current = "a"; picked.current = null; row3.current = []; group.current = 0;
    freeKind.current = "sqr"; freeThings.current = [];
    setGapOn(false); setLapOn(false); setWash(2); setDemo(null); redraw();
  }, [n, index, free]);
  useEffect(() => { setDone(false); }, [n]);
  useEffect(() => { if (stage === "win") setDone(true); }, [stage]);

  /* a correction stands only until the child's next act, and never writes into their own pieces */
  const clearDemo = () => { if (demo) setDemo(null); };

  const lay = free ? freeKind.current : item.lay;
  const max = free ? (FREE_MAX[lay] || 12) : Math.max(0, (item.all || 0) - (item.pre || 0));
  const busy = tl.busy;
  const canAct = (stage === "ask" || free) && !busy;

  /* every tile standing on the bench: what the question gave, what the child laid, what a
     correction is showing right now (its own layer, cleared by the next act) */
  const tiles = useMemo(() => {
    const out: any[] = [];
    if (kind === "card") { for (let i = 0; i < 8; i++) out.push({ ...seatOf("sqr", i), own: "given" }); return out; }
    if (kind === "string" || kind === "rows" || kind === "free") {
      if (kind !== "free") return out;
      for (let i = 0; i < own.current.length; i++) out.push({ ...seatOf(lay, own.current[i].seat, own.current[i].f), own: "laid" });
      return out;
    }
    for (let i = 0; i < (item.pre || 0); i++) out.push({ ...seatOf(lay, i), own: "given" });
    for (const o of own.current) out.push({ ...seatOf(lay, o.seat, o.f), own: "laid" });
    if (demo && demo.copies) for (const o of demo.copies) out.push({ ...seatOf(lay, o.seat, o.f), own: "demo" });
    return out;
  }, [kind, lay, item, tick, demo]);

  const scan = useMemo(() => scanBench(tiles), [tiles]);
  const showGap = (gapOn || !!(demo && demo.gap)) && kind !== "string" && kind !== "rows" && kind !== "card";
  const showLap = (lapOn || !!(demo && demo.lap)) && kind !== "string" && kind !== "rows" && kind !== "card";

  /* the wash pours from the top of the bench, runs off every notch, and settles in the shut-in spaces */
  const pour = (turnOn: () => void) => {
    setWash(0); turnOn();
    tl.run([[90, () => setWash(0.25)], [90, () => setWash(0.5)], [90, () => setWash(0.75)], [120, () => setWash(1)], [0, () => setWash(2)]]);
  };
  const tapGap = () => { clearDemo(); if (gapOn) { setGapOn(false); return; } pour(() => setGapOn(true)); };
  const tapLap = () => { clearDemo(); setLapOn(!lapOn); };

  /* laying a copy: it takes the next place in this tiling, so the child never has to aim */
  const layCopy = (f?: string) => {
    if (!canAct) return;
    const base = free ? 0 : item.pre || 0;
    if (free && freeKind.current === "ell") {
      /* an L goes to the next block with room for its own turn: "a" fills a block's left, "b" its right,
         so two Ls turned opposite ways lock into one block of six squares */
      const fe = ellFace.current, same = own.current.filter((o: any) => o.f === fe).length;
      const at = 2 * same + (fe === "b" ? 1 : 0);
      own.current = same >= (FREE_MAX.ell / 2) ? [{ seat: fe === "b" ? 1 : 0, f: fe }] : own.current.concat([{ seat: at, f: fe }]);
      api.sfx.tick(); redraw();
      return;
    }
    const seat = base + own.current.length;
    if (own.current.length >= max) {
      if (kind !== "place" && !free) return;
      own.current = [{ seat: base, f: f || face.current }];        /* a full bench starts again from one copy */
    } else own.current = own.current.concat([{ seat, f: f || face.current }]);
    api.sfx.tick(); redraw();
  };
  const carryOn = () => {
    clearDemo();
    if (!canAct || own.current.length >= max) return;
    const seat = (item.pre || 0) + own.current.length;
    own.current = own.current.concat([{ seat, f: seat % 2 ? "down" : "up" }]);
    api.sfx.tick(); redraw();
  };
  /* Turn turns every piece in the tray that has a way round: the triangle, and the L */
  const turn = () => {
    clearDemo(); if (!canAct) return;
    face.current = face.current === "up" ? "down" : "up";
    ellFace.current = ellFace.current === "a" ? "b" : "a";
    redraw();
  };
  const putThing = (k: string) => {
    clearDemo();
    if (!canAct) return;
    if (free) { freeThings.current = freeThings.current.length >= 10 ? [k] : freeThings.current.concat([k]); }
    else { if (row3.current.length >= 5) return; row3.current = row3.current.concat([k]); }
    api.sfx.tick(); redraw();
  };
  const stepGroup = () => { clearDemo(); if (!canAct) return; group.current = group.current >= 6 ? 0 : group.current + 1; redraw(); };
  const pickCard = (id: string) => { clearDemo(); if (!canAct) return; picked.current = id; api.sfx.tick(); redraw(); };

  const drag = useDrag((p: any, at: any) => {
    clearDemo();
    if (!canAct) return;
    if (p.thing) { putThing(p.thing); return; }
    if (p.shape) { if (freeKind.current !== p.shape) { freeKind.current = p.shape; own.current = []; } layCopy(); return; }
    const inBench = !(at && isFinite(at.x)) || (at.x >= BENCH.x && at.x <= BENCH.x + BENCH.w && at.y >= BENCH.y - 40 && at.y <= BENCH.y + BENCH.h);
    if (inBench) layCopy();
  });

  /* Enter, while the working area holds the answer */
  const verdict = () => {
    const o = own.current[0];
    if (!o) return null;
    return o.f === ((item.pre || 0) % 2 ? "down" : "up") ? "fits" : "apart";
  };
  api.onEnter(!free && item.pad === "enter" && stage === "ask" ? () => {
    if (kind === "place") { const v = verdict(); if (v) api.submit(v); return; }
    if (kind === "card") { if (picked.current) api.submit(picked.current); return; }
  } : null);
  HOOK.set = (v: any) => {
    if (kind === "place") { own.current = [{ seat: item.pre || 0, f: String(v) === "fits" ? "down" : "up" }]; redraw(); return true; }
    if (kind === "card") { picked.current = String(v); redraw(); return true; }
    return undefined;
  };

  /* the traceback: the maths redrawn on a demo layer, ending on the whole right answer */
  useEffect(() => {
    if (!wrong || stage !== "ask") return;
    api.lock(true);
    const steps: any[] = [];
    if (kind === "verdict" || kind === "space") {
      steps.push([120, () => { setWash(0); setDemo({ gap: true }); }]);
      steps.push([100, () => setWash(0.4)], [100, () => setWash(0.8)], [140, () => setWash(2)]);
      steps.push([700, () => setDemo({ gap: true, lap: true })]);
      steps.push([700, () => setDemo({ gap: true, lap: true, tracer: true })]);
      steps.push([600, () => setDemo({ gap: true, lap: true, tracer: true, badge: item.badge })]);
    } else if (kind === "place") {
      const right = [{ seat: item.pre, f: (item.pre % 2) ? "down" : "up" }];
      steps.push([1100, () => setDemo({ gap: true, lap: true })]);
      steps.push([700, () => setDemo({ ghosts: right })]);
      steps.push([700, () => setDemo({ ghosts: right, badge: item.badge })]);
    } else if (kind === "count") {
      const rest: any[] = [];
      for (let i = item.pre + own.current.length; i < item.all; i++) rest.push({ seat: i, f: "up" });
      steps.push([600, () => setDemo({ copies: rest })]);
      for (let k = 2; k <= 14; k += 2) { const q = k; steps.push([180, () => setDemo({ copies: rest, lit: q })]); }
      steps.push([600, () => setDemo({ copies: rest, lit: 14, num: 14 })]);
    } else if (kind === "facing") {
      const all: any[] = [];
      for (let i = item.pre; i < item.all; i++) all.push({ seat: i, f: i % 2 ? "down" : "up" });
      steps.push([500, () => setDemo({ ghosts: all })]);
      steps.push([800, () => setDemo({ ghosts: all, tenth: true })]);
      steps.push([600, () => setDemo({ ghosts: all, tenth: true, badge: "Points down" })]);
    } else if (kind === "string") {
      steps.push([700, () => setDemo({ bracket: 4 })]);
      steps.push([800, () => setDemo({ bracket: 4, lit: true })]);
      steps.push([600, () => setDemo({ bracket: 4, lit: true, num: 3 })]);
    } else if (kind === "rows") {
      steps.push([700, () => setDemo({ row3: ["coin", "cap", "coin", "cap", "coin"] })]);
      steps.push([800, () => setDemo({ row3: ["coin", "cap", "coin", "cap", "coin"], lit: true })]);
      steps.push([600, () => setDemo({ row3: ["coin", "cap", "coin", "cap", "coin"], lit: true, num: 8 })]);
    } else if (kind === "card") {
      steps.push([800, () => setDemo({ card: "tessellation" })]);
      steps.push([700, () => setDemo({ card: "tessellation", meaning: true })]);
    }
    tl.run(steps, () => api.lock(false));
  }, [wrong]);

  /* what the host and the agent read back (toolApi.getState): only what is on the bench */
  api.share({
    tiles: tiles.length, gaps: showGap ? scan.nGap : null, overlaps: showLap ? scan.nLap : null,
    edgeTraced: showGap, carried: own.current.length, objects: row3.current.length,
    ticked: done || stage === "idle" ? n : 0,
  });

  const ink = C.ink, quiet = mix(C.ink, C.panel, 0.55);
  const bead = CONTENT.bead, step = shade(CONTENT.pointer, 0.25);
  const paintOf = (t: any) => (t.own === "given" ? "url(#gHundred)" : "url(#gOne)");
  const edgeOf = (t: any) => (t.own === "given" ? shade(CONTENT.hundred, 0.25) : shade(CONTENT.one, 0.25));

  const dots = useMemo(() => {
    let d = "";
    for (let x = BENCH.x + 20; x < BENCH.x + BENCH.w; x += DOT)
      for (let y = BENCH.y + 20; y < BENCH.y + BENCH.h; y += DOT) d += `M ${x - 2.4} ${y} a 2.4 2.4 0 1 0 4.8 0 a 2.4 2.4 0 1 0 -4.8 0 `;
    return d;
  }, []);

  /* ── the things of the fourth phase ─────────────────────────────────────────────── */
  const thingPaint: any = { marigold: CONTENT.ten, leaf: CONTENT.one, rose: shade(CONTENT.pointer, 0.1), coin: CONTENT.hundred, cap: CONTENT.ten };
  const drawThing = (k: string, cx: number, cy: number, r: number, key: any, lit?: boolean) => {
    const col = thingPaint[k];
    const parts: any[] = [];
    if (lit) parts.push(<circle key="lit" cx={cx} cy={cy} r={r + 9} fill="none" stroke={shade(CONTENT.one, 0.25)} strokeWidth={5} />);
    if (k === "marigold" || k === "cap") {
      let d = "";
      const np = k === "marigold" ? 8 : 10, pr = k === "marigold" ? r * 0.46 : r * 0.2;
      for (let i = 0; i < np; i++) { const a = (i / np) * Math.PI * 2, px = cx + Math.cos(a) * r * 0.62, py = cy + Math.sin(a) * r * 0.62;
        d += `M ${px - pr} ${py} a ${pr} ${pr} 0 1 0 ${2 * pr} 0 a ${pr} ${pr} 0 1 0 ${-2 * pr} 0 `; }
      parts.push(<path key="p" d={d} fill={col} />);
      parts.push(<circle key="c" cx={cx} cy={cy} r={r * 0.46} fill={k === "marigold" ? shade(col, 0.3) : col} stroke={shade(col, 0.35)} strokeWidth={2} />);
    } else if (k === "leaf") {
      parts.push(<path key="p" d={`M ${cx - r} ${cy} Q ${cx} ${cy - r * 0.95} ${cx + r} ${cy} Q ${cx} ${cy + r * 0.95} ${cx - r} ${cy} Z`} fill={col} stroke={shade(col, 0.3)} strokeWidth={2} />);
      parts.push(<path key="v" d={`M ${cx - r * 0.7} ${cy} H ${cx + r * 0.7}`} stroke={shade(col, 0.45)} strokeWidth={2.5} fill="none" />);
    } else if (k === "rose") {
      parts.push(<circle key="c" cx={cx} cy={cy} r={r} fill={col} stroke={shade(col, 0.3)} strokeWidth={2} />);
      parts.push(<path key="s" d={`M ${cx} ${cy - r * 0.55} a ${r * 0.55} ${r * 0.55} 0 1 1 ${-r * 0.55} ${r * 0.55} a ${r * 0.3} ${r * 0.3} 0 1 0 ${r * 0.3} ${-r * 0.3}`} fill="none" stroke={shade(col, 0.45)} strokeWidth={3} />);
    } else {
      parts.push(<circle key="c" cx={cx} cy={cy} r={r} fill={col} stroke={shade(col, 0.3)} strokeWidth={2} />);
      parts.push(<circle key="i" cx={cx} cy={cy} r={r * 0.55} fill="none" stroke={shade(col, 0.45)} strokeWidth={3} />);
    }
    return <g key={key}>{parts}</g>;
  };

  /* ── pieces the child takes ─────────────────────────────────────────────────────── */
  const shapePiece = (shape: string, cx: number, cy: number, id: string, label: string, pay: any) => {
    const t = shapeTileAt(shape, cx, cy, shape === "ell" ? ellFace.current : face.current);
    const body = (
      <g>
        <rect x={cx - 42} y={cy - 42} width={84} height={84} rx={12} fill="transparent" />
        <path d={tilePath(t)} fill="url(#gOne)" stroke={shade(CONTENT.one, 0.25)} strokeWidth={2.5} />
      </g>
    );
    if (!canAct) return <g key={id}>{body}</g>;
    return <g key={id} {...control(id, label)} {...drag.bind(pay)} {...drag.keys(pay)}>{body}</g>;
  };
  const thingPiece = (k: string, cx: number, cy: number) => {
    const body = (
      <g>
        <rect x={cx - 48} y={cy - 48} width={96} height={96} rx={14} fill="transparent" />
        <rect x={cx - 40} y={cy - 40} width={80} height={80} rx={14} fill="url(#gPanel)" stroke={C.rule} strokeWidth={2} />
        {drawThing(k, cx, cy, 26, "t")}
      </g>
    );
    const pay = { thing: k };
    if (!canAct) return <g key={k}>{body}</g>;
    return <g key={k} {...control("thing-" + k, k)} {...drag.bind(pay)} {...drag.keys(pay)}>{body}</g>;
  };
  const panelKey = (id: string, label: string, y: number, on: () => void, off?: boolean) => (
    <Key key={id} id={id} label={label} x={SIDE.x} y={y} w={SIDE.w} h={96} C={C} disabled={!!off || !canAct} onClick={on}>
      <text textAnchor="middle" y={11} fontSize={T.label} fontWeight={600} fill={off || !canAct ? quiet : ink}>{tx(label)}</text>
    </Key>
  );

  /* ── the bench ──────────────────────────────────────────────────────────────────── */
  const benchArt = (
    <g>
      <rect x={BENCH.x} y={BENCH.y} width={BENCH.w} height={BENCH.h} rx={RAD.panel} fill={C.paper} stroke={C.rule} strokeWidth={2} />
      <path d={dots} fill="#767676" />
      {showGap && <g>{tiles.map((t: any, i: number) => <path key={"rim" + i} d={tilePath(t)} fill="none" stroke={ink} strokeWidth={12} strokeLinejoin="round" />)}</g>}
      {tiles.map((t: any, i: number) => (
        <g key={"t" + i}>
          <path d={tilePath(t)} fill={paintOf(t)} fillOpacity={t.own === "demo" ? 0.82 : 1}
            stroke={t.own === "demo" ? ink : edgeOf(t)} strokeWidth={t.own === "demo" ? 3 : 2}
            strokeDasharray={t.own === "demo" ? "9 7" : undefined} />
          {t.split && <path d={`M ${t.x + 40} ${t.y} V ${t.y + t.h}`} stroke={edgeOf(t)} strokeWidth={2} fill="none" />}
        </g>
      ))}
      {showGap && wash >= 2 && scan.gaps.map((g: any, i: number) => <rect key={"g" + i} x={g.x} y={g.y} width={g.w} height={g.h} fill={bead} fillOpacity={0.95} />)}
      {showLap && scan.laps.map((g: any, i: number) => <rect key={"l" + i} x={g.x} y={g.y} width={g.w} height={g.h} fill="url(#tbHatch)" />)}
      {showGap && wash < 2 && <rect x={BENCH.x + 2} y={BENCH.y + 2} width={BENCH.w - 4} height={Math.max(2, (BENCH.h - 4) * wash)} rx={RAD.panel} fill={bead} fillOpacity={0.22} />}
      {demo && demo.ghosts && demo.ghosts.map((o: any, i: number) => (
        <path key={"gh" + i} d={tilePath(seatOf(lay, o.seat, o.f))} fill={CONTENT.one} fillOpacity={0.34} stroke={ink} strokeWidth={4} strokeDasharray="10 8" />
      ))}
      {demo && demo.tracer && item.tracer && (
        <g>
          <path d={item.tracer} fill="none" stroke={step} strokeWidth={5} strokeLinecap="round" />
          <circle cx={item.tracerTip[0]} cy={item.tracerTip[1]} r={8} fill={step} />
        </g>
      )}
      {demo && demo.lit && kind === "count" && (
        <g>{Array.from({ length: demo.lit }).map((_, k) => {
          const t = seatOf(lay, Math.floor(k / 2), undefined);
          return <rect key={k} x={t.x + (k % 2) * 40 + 4} y={t.y + 4} width={32} height={32} rx={6} fill="none" stroke={shade(CONTENT.one, 0.25)} strokeWidth={4} />;
        })}</g>
      )}
      {demo && demo.tenth && (
        <g>
          <path d={tilePath(seatOf(lay, 9, "down"))} fill="none" stroke={shade(CONTENT.one, 0.25)} strokeWidth={6} />
        </g>
      )}
      {demo && demo.num !== undefined && (
        <text x={BENCH.x + BENCH.w - 40} y={BENCH.y + 66} textAnchor="end" fontSize={T.xl} fontWeight={700} fill={shade(CONTENT.one, 0.25)}>{demo.num}</text>
      )}
      {free && freeThings.current.map((k: string, i: number) => drawThing(k, BENCH.x + 62 + i * 64, BENCH.y + 288, 22, "ft" + i))}
      {demo && demo.badge && (
        <g>
          <rect x={BENCH.x + BENCH.w / 2 - 170} y={BENCH.y + BENCH.h - 84} width={340} height={64} rx={16} fill="url(#gPanel)" stroke={C.rule} strokeWidth={2} filter="url(#fShadowSoft)" />
          <text x={BENCH.x + BENCH.w / 2} y={BENCH.y + BENCH.h - 40} textAnchor="middle" fontSize={T.prompt} fontWeight={600} fill={ink}>{tx(demo.badge)}</text>
        </g>
      )}
    </g>
  );

  /* ── the string of things ───────────────────────────────────────────────────────── */
  const gLen = (demo && demo.bracket) || group.current;
  const period = gLen > 0 && TORAN.every((k, i) => k === TORAN[i % gLen]);
  const stringArt = (
    <g>
      <rect x={BENCH.x} y={BENCH.y} width={BENCH.w} height={BENCH.h} rx={RAD.panel} fill={C.paper} stroke={C.rule} strokeWidth={2} />
      <path d={`M ${BENCH.x + 24} ${BENCH.y + 104} Q ${BENCH.x + BENCH.w / 2} ${BENCH.y + 128} ${BENCH.x + BENCH.w - 24} ${BENCH.y + 104}`} fill="none" stroke={ink} strokeWidth={4} />
      {TORAN.map((k, i) => {
        const cx = BENCH.x + 62 + i * 56, lit = !!(demo && demo.lit) && k === "marigold";
        return <g key={i}>
          <path d={`M ${cx} ${BENCH.y + 118} V ${BENCH.y + 142}`} stroke={ink} strokeWidth={2.5} fill="none" />
          {drawThing(k, cx, BENCH.y + 168, 24, "th" + i, lit)}
        </g>;
      })}
      {gLen > 0 && Array.from({ length: period ? Math.floor(12 / gLen) : 1 }).map((_, b) => {
        const x0 = BENCH.x + 62 + b * gLen * 56 - 28, x1 = x0 + gLen * 56;
        return <path key={"b" + b} d={`M ${x0} ${BENCH.y + 228} V ${BENCH.y + 246} H ${x1} V ${BENCH.y + 228}`} fill="none"
          stroke={b === 0 ? step : shade(CONTENT.one, 0.25)} strokeWidth={5} strokeLinecap="round" />;
      })}
      {demo && demo.num !== undefined && (
        <text x={BENCH.x + BENCH.w - 40} y={BENCH.y + 306} textAnchor="end" fontSize={T.xl} fontWeight={700} fill={shade(CONTENT.one, 0.25)}>{demo.num}</text>
      )}
    </g>
  );

  /* ── the three rows of things ───────────────────────────────────────────────────── */
  const rowsGiven = ["coin", "cap", "coin", "cap", "coin", "cap", "coin", "cap", "coin", "cap"];
  const rowThird = (demo && demo.row3) || row3.current;
  const rowsArt = (
    <g>
      <rect x={BENCH.x} y={BENCH.y} width={BENCH.w} height={BENCH.h} rx={RAD.panel} fill={C.paper} stroke={C.rule} strokeWidth={2} />
      <path d={dots} fill="#767676" />
      {rowsGiven.map((k, i) => {
        const r = Math.floor(i / 5), c = i % 5, cx = BENCH.x + 130 + c * 120, cy = BENCH.y + 66 + r * 84;
        return drawThing(k, cx, cy, 28, "r" + i, !!(demo && demo.lit) && k === "coin");
      })}
      {Array.from({ length: 5 }).map((_, c) => {
        const cx = BENCH.x + 130 + c * 120, cy = BENCH.y + 234, k = rowThird[c];
        if (!k) return <circle key={"e" + c} cx={cx} cy={cy} r={28} fill="none" stroke={C.rule} strokeWidth={3} strokeDasharray="9 7" />;
        return drawThing(k, cx, cy, 28, "e" + c, !!(demo && demo.lit) && k === "coin");
      })}
      {demo && demo.num !== undefined && (
        <text x={BENCH.x + BENCH.w - 40} y={BENCH.y + 300} textAnchor="end" fontSize={T.xl} fontWeight={700} fill={shade(CONTENT.one, 0.25)}>{demo.num}</text>
      )}
    </g>
  );

  /* ── what stands in the tray and down the side ──────────────────────────────────── */
  const trayShown = kind === "verdict" || kind === "space" ? item.pre < item.all
    : kind === "place" || kind === "count" || kind === "facing" || kind === "free";
  const sideKeys: any[] = [];
  if (kind === "verdict" || kind === "space") {
    sideKeys.push(panelKey("gap-finder", "Gap finder", 108, tapGap));
    sideKeys.push(panelKey("lap-finder", "Overlap finder", 224, tapLap));
  } else if (kind === "place" || kind === "count" || kind === "facing") {
    sideKeys.push(panelKey("gap-finder", "Gap finder", 50, tapGap));
    sideKeys.push(panelKey("lap-finder", "Overlap finder", 166, tapLap));
    sideKeys.push(panelKey("carry-on", "Carry on", 282, carryOn, kind === "place"));
  } else if (kind === "free") {
    sideKeys.push(panelKey("gap-finder", "Gap finder", 4, tapGap));
    sideKeys.push(panelKey("lap-finder", "Overlap finder", 116, tapLap));
  } else if (kind === "string") {
    sideKeys.push(panelKey("group", "Group", 166, stepGroup));
  }

  const invite = (() => {
    if (stage !== "ask" || busy || demo) return null;
    if (kind === "verdict" || kind === "space") {
      if (trayShown && own.current.length === 0) return { x: 80, y: 48, r: 42 };
      if (!gapOn && !lapOn) return { x: SIDE.x + SIDE.w / 2, y: (kind === "verdict" || kind === "space" ? 108 : 50) + 48, r: 56 };
      return null;
    }
    if (kind === "place" || kind === "count" || kind === "facing") return own.current.length === 0 ? { x: 80, y: 48, r: 42 } : null;
    if (kind === "string") return group.current === 0 ? { x: SIDE.x + SIDE.w / 2, y: 214, r: 56 } : null;
    if (kind === "rows") return row3.current.length === 0 ? { x: SIDE.x + 80, y: 120, r: 56 } : null;
    if (kind === "card") return picked.current === null ? { x: SIDE.x + SIDE.w / 2, y: 52, r: 44 } : null;
    return null;
  })();

  const runsLabel = kind === "string" || kind === "rows" ? "Things" : "Copies";
  const runsNow = kind === "string" ? TORAN.length : kind === "rows" ? 10 + row3.current.length
    : kind === "card" ? 8 : kind === "free" ? own.current.length + freeThings.current.length : (item.pre || 0) + own.current.length;
  const runsAll = kind === "string" ? TORAN.length : kind === "rows" ? 15 : kind === "card" ? 8 : kind === "free" ? max + 10 : item.all;

  return (
    <g>
      <defs>
        <pattern id="tbHatch" width={14} height={14} patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect x={0} y={0} width={14} height={14} fill={bead} fillOpacity={0.2} />
          <path d="M 0 0 V 14" stroke={bead} strokeWidth={6} />
        </pattern>
      </defs>

      {/* the running count: the copies laid against the copies this phase asks for */}
      <g data-zone="runs">
        <rect x={0} y={lang === "en" ? -94 : -98} width={330} height={lang === "en" ? 76 : 80} rx={RAD.panel} fill="url(#gPanel)" stroke={C.rule} strokeWidth={2} />
        <text x={18} y={lang === "en" ? -62 : -68} fontSize={T.micro} fontWeight={600} fill={ink}>{tx(runsLabel)}</text>
        <text x={18} y={lang === "en" ? -28 : -26} fontSize={T.label} fontWeight={700} fill={ink}>{tx("{a} of {b}").replace("{a}", String(runsNow)).replace("{b}", String(runsAll))}</text>
      </g>

      {/* the tray of copies along the top edge */}
      {trayShown && (
        <g>
          <rect x={TRAY.x} y={TRAY.y} width={TRAY.w} height={TRAY.h} rx={RAD.panel} fill="url(#gPanel)" stroke={C.rule} strokeWidth={2} />
          {kind === "free"
            ? FREE_SHAPES.map((s, i) => shapePiece(s.id, 52 + i * 96, 48, "shape-" + s.id, s.label, { shape: s.id }))
            : shapePiece(lay === "spike" ? "tri" : lay === "lap" ? "sqr" : lay, 80, 48, "copy", "Copy", { copy: true })}
          {(kind === "free" || kind === "place" || kind === "facing") && (
            <Key id="turn" label="Turn" x={kind === "free" ? 606 : 180} y={12} w={kind === "free" ? 132 : 170} h={72} C={C} disabled={!canAct} onClick={turn}>
              <text textAnchor="middle" y={10} fontSize={T.label} fontWeight={600} fill={canAct ? step : quiet}>{tx("Turn")}</text>
            </Key>
          )}
          {kind !== "free" && [0, 1, 2].map((i) => {
            if ((item.pre || 0) + own.current.length + i + 1 >= (item.all || 0)) return null;
            const shape = lay === "spike" ? "tri" : lay === "lap" ? "sqr" : lay;
            return <path key={"gh" + i} d={tilePath(shapeTileAt(shape, 420 + i * 100, 48, "up"))}
              fill="none" stroke={C.rule} strokeWidth={3} strokeDasharray="9 7" />;
          })}
        </g>
      )}

      {/* the bench */}
      {kind === "string" ? stringArt : kind === "rows" ? rowsArt : benchArt}

      {/* down the side: the finders, or the tray of things, or the four word cards */}
      <g>
        {sideKeys}
        {kind === "rows" && (
          <g>
            <rect x={SIDE.x} y={SIDE.y} width={SIDE.w} height={240} rx={RAD.panel} fill="url(#gPanel)" stroke={C.rule} strokeWidth={2} />
            {thingPiece("coin", SIDE.x + 80, 120)}
            {thingPiece("cap", SIDE.x + 214, 120)}
          </g>
        )}
        {/* Free play: the object tray the free-play line promises, under the two finders */}
        {kind === "free" && (
          <g>
            <rect x={SIDE.x} y={228} width={SIDE.w} height={200} rx={RAD.panel} fill="url(#gPanel)" stroke={C.rule} strokeWidth={2} />
            {FREE_THINGS.map((k, i) => thingPiece(k, SIDE.x + 50 + (i % 3) * 100, 280 + Math.floor(i / 3) * 100))}
          </g>
        )}
        {kind === "card" && CARDS.map((c, i) => {
          const y = 6 + i * 106, on = (demo && demo.card === c.id) || picked.current === c.id;
          const lit = on && canAct;
          const turned = (demo && demo.meaning && demo.card === c.id) || (picked.current === c.id && (stage === "win" || stage === "idle"));
          return (
            <Key key={c.id} id={"card-" + c.id} label={c.w} x={SIDE.x} y={y} w={SIDE.w} h={92} C={C} primary={lit} disabled={!canAct} onClick={() => pickCard(c.id)}>
              <text textAnchor="middle" y={turned ? (lang === "en" ? -8 : -3) : 10} fontSize={T.label} fontWeight={600} fill={lit ? "#FFFFFF" : ink}>{tx(c.w)}</text>
              {turned && <text textAnchor="middle" y={lang === "en" ? 26 : 28} fontSize={T.micro} fontWeight={500} fill={lit ? "#FFFFFF" : ink}>{tx(c.m)}</text>}
            </Key>
          );
        })}
      </g>

      {/* the can do list along the foot: a statement is ticked against work standing on the bench */}
      <g>
        <rect x={CANDO.x} y={CANDO.y} width={CANDO.w} height={CANDO.h} rx={RAD.panel} fill="url(#gPanel)" stroke={C.rule} strokeWidth={2} />
        {CANDO_LINES.map((s, i) => {
          const x = CANDO.x + 24 + i * 268, got = free || i + 1 < n || (i + 1 === n && (done || stage === "idle"));
          return (
            <g key={i}>
              <rect x={x} y={CANDO.y + 16} width={40} height={40} rx={8} fill={C.paper} stroke={got ? shade(CONTENT.one, 0.25) : C.rule} strokeWidth={3} />
              {got && <path d={`M ${x + 9} ${CANDO.y + 36} l 8 9 l 15 -18`} fill="none" stroke={shade(CONTENT.one, 0.25)} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />}
              <text x={x + 54} y={CANDO.y + 46} fontSize={T.micro} fontWeight={600} fill={ink}>{tx(s)}</text>
            </g>
          );
        })}
      </g>

      {invite && <Invite x={invite.x} y={invite.y} r={invite.r} C={C} />}
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase */
function Thumb({ result, C, w, h, lang = "en", tx = (v: any) => v }: any) {
  const last = result && result.last ? result.last : null;
  if (!last) return null;
  const v = last.value, num = typeof last.answer === "number";
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      <path d={`M 16 ${h - 16} h 36 v -36 h -36 Z M 52 ${h - 16} h 36 v -36 h -36 Z M 16 ${h - 52} h 36 v -36 h -36 Z`}
        fill={CONTENT.hundred} fillOpacity={0.25} stroke={shade(CONTENT.hundred, 0.25)} strokeWidth={1.5} />
      <text x={w - 14} y={h / 2 + 12} textAnchor="end" fontSize={num ? T.speech : T.label} fontWeight={700} fill={C.ink}>{tx(String(v))}</text>
    </g>
  );
}

function TileBench(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, fitHost: () => null }} />
  );
}

export default TileBench;
