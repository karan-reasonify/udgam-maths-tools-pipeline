/* ═══ M1.S2.T4.C12.2D1 · edge_walker · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists: header + its three controls, canvas, slot + pad, bubble + mascot,
   phase dots (user / AI mode), window.toolApi, sounds, the synced voice, scoring, the events,
   idle and restart. NO imports in this file; only the five host hooks. Follow docs/LAYOUT.md.
   Edit, never rewrite. Built by `node cli.mjs scaffold`; concepts are verbatim (check compares them). */

const TOOL_ID = "edge_walker";
const MEDIA_ID = "M1.S2.T4.C12.2D1";
const TOOL_NAME = "Edge Walker";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
const VOICE = {"rate":0.92,"pitch":1.06};

/* spoken before phase 1's teach lines only (the plan's opening voice line, cut before the first
   question's own words so the voice never says the same thing twice) */
const OPENING = ["A figure with its sides labelled, and a walker waiting at one corner."];
/* the whole-tool line: spoken on the summary page */
const FINISH_LINE = "Every side walked once, every missing side found, and every sum matching the string.";
/* said when the child opens Free play from the summary page (the plan's free-play voice line) */
const FREE_LINE = "Free play. Any figure, labelled or not, with the walker, the string and the bracket open.";

/* Hindi and Gujarati, keyed by the English line exactly (runtime r21: `lineFor(line, lang, TR)`); the English
   everywhere else stays what the checks read. NCERT class 4 geometry: परिमाप / પરિમિતિ (perimeter), भुजा / બાજુ
   (side), आकृति / આકૃતિ (figure), आयत / લંબચોરસ, वर्ग / ચોરસ, त्रिभुज / ત્રિકોણ, सीमा / સીમા (boundary), छूटी
   भुजा / ખૂટતી બાજુ (the side with no length). A "label" is the नाप / માપ written beside a side. Digits stay
   digits (the runtime speaks them in the language in use); units are words when spoken (सेंटीमीटर / સેન્ટિમીટર)
   and short when drawn (सेमी / સેમી). A first draft; wants a native speaker's read. */
const TR: any = {
  hi: {
    "Edge Walker": "किनारे पर चलो",
    "A figure with its sides labelled, and a walker waiting at one corner.": "एक आकृति है, जिसकी भुजाओं पर नाप लिखे हैं। एक कोने पर चलने वाला खड़ा है।",
    "Every side walked once, every missing side found, and every sum matching the string.": "हर भुजा पर एक बार चले। हर छूटी भुजा ढूँढी, और हर जोड़ धागे से मिला।",
    "Free play. Any figure, labelled or not, with the walker, the string and the bracket open.": "मुक्त खेल। कोई भी आकृति लो और चलने वाले, धागे व ब्रैकेट से खेलो।",

    "Add every side": "हर भुजा जोड़ो",
    "Walk all the way round. Add each side as you go. Does the string agree?": "पूरा चक्कर लगाओ। हर भुजा को जोड़ते चलो। क्या धागे से भी यही निकला?",
    "Which sides has the walker not walked yet?": "चलने वाला किन भुजाओं पर अभी नहीं चला?",
    "Walk a small rectangle, three by two, and count every side once.": "एक छोटा आयत लो: 3 लंबा, 2 चौड़ा। उसकी हर भुजा को एक बार गिनो।",
    "The perimeter is the length all the way round, every side of the boundary added once.": "परिमाप चारों ओर की लंबाई है। सीमा की हर भुजा एक बार जोड़ी जाती है।",
    "You learned: the perimeter is every side of the boundary added once.": "तुमने सीखा: परिमाप यानी सीमा की हर भुजा को एक बार जोड़ना।",
    "Perimeter in cm": "परिमाप (सेमी)",
    "A photo frame is twenty-five centimetres long and fifteen centimetres wide. How far is it all the way round?": "एक फ़ोटो फ़्रेम 25 सेंटीमीटर लंबा और 15 सेंटीमीटर चौड़ा है। उसके चारों ओर की लंबाई कितनी है?",
    "Two sides of this frame carry no number yet.": "इस फ़्रेम की दो भुजाओं पर अभी कोई संख्या नहीं है।",
    "A triangle has sides of four, six and seven centimetres. Find its perimeter.": "एक त्रिभुज की भुजाएँ 4, 6 और 7 सेंटीमीटर हैं। उसका परिमाप ढूँढो।",
    "Count the sides of this triangle, then add every one.": "इस त्रिभुज की भुजाएँ गिनो, फिर हर भुजा जोड़ो।",
    "A mat is sixty centimetres long and its width is half that. What is its perimeter?": "एक चटाई 60 सेंटीमीटर लंबी है और उसकी चौड़ाई उसकी आधी है। उसका परिमाप कितना है?",
    "Half of sixty gives the width. This mat has four sides.": "60 का आधा चौड़ाई है। इस चटाई की 4 भुजाएँ हैं।",

    "Four equal sides": "चार बराबर भुजाएँ",
    "Add the four sides. Now try four times one side. Is it the same?": "चारों भुजाएँ जोड़ो। अब एक भुजा का 4 गुना लो। क्या उत्तर वही है?",
    "How many sides does the walker cross to get home?": "घर पहुँचने तक चलने वाला कितनी भुजाएँ पार करता है?",
    "Try a square of side two and see what four twos make.": "2 भुजा वाला वर्ग लो। देखो, 2 को 4 बार जोड़ने से क्या बनता है?",
    "A square's four sides are equal, so its perimeter is four times its side.": "वर्ग की चारों भुजाएँ बराबर होती हैं। इसलिए उसका परिमाप एक भुजा का 4 गुना है।",
    "You learned: a square's perimeter is four times its side.": "तुमने सीखा: वर्ग का परिमाप एक भुजा का 4 गुना होता है।",
    "A square tile has sides of nine centimetres. What is its perimeter?": "एक वर्गाकार टाइल की हर भुजा 9 सेंटीमीटर की है। उसका परिमाप कितना है?",
    "All four sides of this tile are the same length.": "इस टाइल की चारों भुजाएँ एक ही लंबाई की हैं।",
    "A square has sides of twelve centimetres. Find the length all the way round.": "एक वर्ग की हर भुजा 12 सेंटीमीटर की है। चारों ओर की लंबाई ढूँढो।",
    "Count the sides of a square, then add that many twelves.": "वर्ग की भुजाएँ गिनो। फिर उतनी ही बार 12 जोड़ो।",
    "An equilateral triangle has all three sides equal. Each side is eight centimetres. How long is its boundary?": "समबाहु त्रिभुज की तीनों भुजाएँ बराबर होती हैं। हर भुजा 8 सेंटीमीटर की है। उसकी सीमा कितनी लंबी है?",
    "This triangle has three equal sides, not four.": "इस त्रिभुज की 3 बराबर भुजाएँ हैं, 4 नहीं।",

    "A side with no label still counts": "बिना नाप की भुजा भी गिनी जाती है",
    "This side has no label. Which sides face it? Stack them and find it.": "इस भुजा पर नाप नहीं लिखा है। इसके सामने कौन सी भुजाएँ हैं? उन्हें एक के ऊपर एक रखकर इसे ढूँढो।",
    "Which sides run the same way as it, and which long side faces them?": "कौन सी भुजाएँ इसी दिशा में जाती हैं? उनके सामने की लंबी भुजा कौन सी है?",
    "The short sides along one side add up to the long side facing them.": "एक दिशा की छोटी भुजाएँ जोड़ो। जोड़ सामने की लंबी भुजा के बराबर होता है।",
    "Every side belongs to the perimeter, labelled or not. On a stepped shape, the short sides add up to the side facing them.": "हर भुजा परिमाप में गिनी जाती है, नाप लिखा हो या नहीं। सीढ़ी जैसी आकृति में छोटी भुजाओं का जोड़ सामने की भुजा जितना है।",
    "You learned: a side with no label still belongs to the perimeter.": "तुमने सीखा: बिना नाप की भुजा भी परिमाप में गिनी जाती है।",
    "An L-shape has six sides, and one upright side carries no label. Find the perimeter.": "L के आकार की आकृति की 6 भुजाएँ हैं। उसकी एक खड़ी भुजा पर नाप नहीं लिखा है। परिमाप ढूँढो।",
    "The walker will not step along a side it does not know.": "जिस भुजा की लंबाई पता नहीं, उस पर चलने वाला नहीं चलेगा।",
    "Another L-shape has a left side of nine centimetres. One of its upright sides is blank. What is the perimeter?": "L के आकार की एक और आकृति है। उसकी बाईं भुजा 9 सेंटीमीटर की है। एक खड़ी भुजा खाली है। परिमाप कितना है?",
    "Which upright side faces the blank one?": "खाली भुजा के सामने कौन सी खड़ी भुजा है?",
    "A staircase shape has eight sides. One step going down has no number on it. Give the length all the way round.": "एक सीढ़ी जैसी आकृति की 8 भुजाएँ हैं। नीचे जाती एक सीढ़ी पर कोई संख्या नहीं है। चारों ओर की लंबाई बताओ।",
    "Three sides go down this staircase, and one of them is blank.": "इस सीढ़ी में 3 भुजाएँ नीचे जाती हैं, और उनमें से एक खाली है।",

    "A side from the perimeter": "परिमाप से एक भुजा",
    "The whole way round is written in the middle. Take off the sides you can see.": "बीच में चारों ओर की पूरी लंबाई लिखी है। जो भुजाएँ दिख रही हैं, उन्हें घटा दो।",
    "What do the given sides add up to?": "दी हुई भुजाओं का जोड़ कितना है?",
    "Take off one side at a time and watch what is left.": "एक बार में एक भुजा घटाओ और देखो कि क्या बचता है।",
    "A missing side is the perimeter less every side that is given.": "परिमाप में से दी हुई सभी भुजाएँ घटाओ। जो बचे, वही छूटी भुजा है।",
    "You learned: a missing side is the perimeter less the given sides.": "तुमने सीखा: परिमाप में से दी भुजाएँ घटाओ, छूटी भुजा मिलेगी।",
    "Missing side in m": "छूटी भुजा (मी)",
    "Missing side in cm": "छूटी भुजा (सेमी)",
    "A four-sided field has a perimeter of fifty metres. Three of its sides are ten, fifteen and twelve metres. How long is the fourth side?": "चार भुजाओं वाले एक खेत का परिमाप 50 मीटर है। उसकी तीन भुजाएँ 10, 15 और 12 मीटर की हैं। चौथी भुजा कितनी लंबी है?",
    "The three sides you can see are part of the fifty.": "दिख रही तीनों भुजाएँ 50 मीटर का ही हिस्सा हैं।",
    "The perimeter of this triangle is written in its middle. Two of its sides are marked. Find the third side.": "इस त्रिभुज का परिमाप उसके बीच में लिखा है। उसकी दो भुजाओं पर नाप लिखा है। तीसरी भुजा ढूँढो।",
    "The two marked sides do not reach the whole boundary.": "नाप लिखी दोनों भुजाएँ पूरी सीमा तक नहीं पहुँचतीं।",
    "This four-sided shape has a perimeter of forty centimetres. Three of its sides are marked on the figure. Find the side that is left.": "चार भुजाओं वाली इस आकृति का परिमाप 40 सेंटीमीटर है। आकृति पर 3 भुजाओं के नाप लिखे हैं। बची हुई भुजा ढूँढो।",
    "Only one of the three given sides has come off.": "तीन दी हुई भुजाओं में से अभी सिर्फ़ एक ही घटी है।",

    "Sides walked": "चली भुजाएँ",
    "Sides taken off": "घटाई भुजाएँ",
    "of": "में से",
    "all round": "चारों ओर",
    "string": "धागा",
    "cm": "सेमी",
    "m": "मी",
    "Next": "अगली",
    "shape": "आकृति",
    "Equal": "बराबर",
    "Opposite": "सामने की",
    "Facing": "सामने की",
    "sides": "भुजाएँ",
    "String": "धागा",
    "Take": "एक भुजा",
    "off": "घटाओ",
  },
  gu: {
    "Edge Walker": "કિનારે ચાલો",
    "A figure with its sides labelled, and a walker waiting at one corner.": "એક આકૃતિ છે, જેની બાજુઓ પર માપ લખ્યાં છે. એક ખૂણે ચાલનાર ઊભો છે.",
    "Every side walked once, every missing side found, and every sum matching the string.": "દરેક બાજુ પર એક વાર ચાલ્યા. દરેક ખૂટતી બાજુ શોધી, અને દરેક સરવાળો દોરીથી મળ્યો.",
    "Free play. Any figure, labelled or not, with the walker, the string and the bracket open.": "મુક્ત રમત. કોઈ પણ આકૃતિ લો અને ચાલનાર, દોરી તથા બ્રેકેટથી રમો.",

    "Add every side": "દરેક બાજુ ઉમેરો",
    "Walk all the way round. Add each side as you go. Does the string agree?": "આખું ચક્કર લગાવો. દરેક બાજુ ઉમેરતા જાઓ. શું દોરીથી પણ એ જ મળ્યું?",
    "Which sides has the walker not walked yet?": "ચાલનાર કઈ બાજુઓ પર હજી નથી ચાલ્યો?",
    "Walk a small rectangle, three by two, and count every side once.": "એક નાનો લંબચોરસ લો: 3 લાંબો, 2 પહોળો. તેની દરેક બાજુ એક વાર ગણો.",
    "The perimeter is the length all the way round, every side of the boundary added once.": "પરિમિતિ એટલે ચારે બાજુની લંબાઈ. સીમાની દરેક બાજુ એક વાર ઉમેરાય છે.",
    "You learned: the perimeter is every side of the boundary added once.": "તમે શીખ્યા: પરિમિતિ એટલે સીમાની દરેક બાજુનો એક વાર સરવાળો.",
    "Perimeter in cm": "પરિમિતિ (સેમી)",
    "A photo frame is twenty-five centimetres long and fifteen centimetres wide. How far is it all the way round?": "એક ફોટો ફ્રેમ 25 સેન્ટિમીટર લાંબી અને 15 સેન્ટિમીટર પહોળી છે. તેની ચારે બાજુની લંબાઈ કેટલી છે?",
    "Two sides of this frame carry no number yet.": "આ ફ્રેમની બે બાજુઓ પર હજી કોઈ સંખ્યા નથી.",
    "A triangle has sides of four, six and seven centimetres. Find its perimeter.": "એક ત્રિકોણની બાજુઓ 4, 6 અને 7 સેન્ટિમીટર છે. તેની પરિમિતિ શોધો.",
    "Count the sides of this triangle, then add every one.": "આ ત્રિકોણની બાજુઓ ગણો, પછી દરેક બાજુ ઉમેરો.",
    "A mat is sixty centimetres long and its width is half that. What is its perimeter?": "એક સાદડી 60 સેન્ટિમીટર લાંબી છે અને તેની પહોળાઈ તેનાથી અડધી છે. તેની પરિમિતિ કેટલી છે?",
    "Half of sixty gives the width. This mat has four sides.": "60 નો અડધો ભાગ પહોળાઈ છે. આ સાદડીને 4 બાજુઓ છે.",

    "Four equal sides": "ચાર સરખી બાજુઓ",
    "Add the four sides. Now try four times one side. Is it the same?": "ચારે બાજુ ઉમેરો. હવે એક બાજુના 4 ગણા લો. શું જવાબ એ જ છે?",
    "How many sides does the walker cross to get home?": "ઘરે પહોંચવા ચાલનાર કેટલી બાજુઓ પાર કરે છે?",
    "Try a square of side two and see what four twos make.": "2 બાજુવાળો ચોરસ લો. જુઓ, 2 ને 4 વાર ઉમેરતાં શું મળે છે?",
    "A square's four sides are equal, so its perimeter is four times its side.": "ચોરસની ચારે બાજુ સરખી હોય છે. એટલે તેની પરિમિતિ એક બાજુના 4 ગણી છે.",
    "You learned: a square's perimeter is four times its side.": "તમે શીખ્યા: ચોરસની પરિમિતિ એક બાજુના 4 ગણી હોય છે.",
    "A square tile has sides of nine centimetres. What is its perimeter?": "એક ચોરસ ટાઇલની દરેક બાજુ 9 સેન્ટિમીટર છે. તેની પરિમિતિ કેટલી છે?",
    "All four sides of this tile are the same length.": "આ ટાઇલની ચારે બાજુ એક જ લંબાઈની છે.",
    "A square has sides of twelve centimetres. Find the length all the way round.": "એક ચોરસની દરેક બાજુ 12 સેન્ટિમીટર છે. ચારે બાજુની લંબાઈ શોધો.",
    "Count the sides of a square, then add that many twelves.": "ચોરસની બાજુઓ ગણો. પછી એટલી વાર 12 ઉમેરો.",
    "An equilateral triangle has all three sides equal. Each side is eight centimetres. How long is its boundary?": "સમબાજુ ત્રિકોણની ત્રણેય બાજુ સરખી હોય છે. દરેક બાજુ 8 સેન્ટિમીટર છે. તેની સીમા કેટલી લાંબી છે?",
    "This triangle has three equal sides, not four.": "આ ત્રિકોણની 3 સરખી બાજુઓ છે, 4 નહીં.",

    "A side with no label still counts": "માપ વગરની બાજુ પણ ગણાય છે",
    "This side has no label. Which sides face it? Stack them and find it.": "આ બાજુ પર માપ લખ્યું નથી. તેની સામે કઈ બાજુઓ છે? તેમને એક ઉપર એક ગોઠવીને આ બાજુ શોધો.",
    "Which sides run the same way as it, and which long side faces them?": "કઈ બાજુઓ તેની જ દિશામાં જાય છે? તેમની સામેની લાંબી બાજુ કઈ છે?",
    "The short sides along one side add up to the long side facing them.": "એક દિશાની નાની બાજુઓ ઉમેરો. સરવાળો સામેની લાંબી બાજુ જેટલો થાય છે.",
    "Every side belongs to the perimeter, labelled or not. On a stepped shape, the short sides add up to the side facing them.": "દરેક બાજુ પરિમિતિમાં ગણાય છે, માપ લખ્યું હોય કે ન હોય. પગથિયાં જેવા આકારમાં નાની બાજુઓનો સરવાળો સામેની બાજુ જેટલો છે.",
    "You learned: a side with no label still belongs to the perimeter.": "તમે શીખ્યા: માપ વગરની બાજુ પણ પરિમિતિમાં ગણાય છે.",
    "An L-shape has six sides, and one upright side carries no label. Find the perimeter.": "L આકારની આકૃતિને 6 બાજુઓ છે. તેની એક ઊભી બાજુ પર માપ લખ્યું નથી. પરિમિતિ શોધો.",
    "The walker will not step along a side it does not know.": "જે બાજુની લંબાઈ ખબર નથી, તેના પર ચાલનાર નહીં ચાલે.",
    "Another L-shape has a left side of nine centimetres. One of its upright sides is blank. What is the perimeter?": "L આકારની બીજી આકૃતિ છે. તેની ડાબી બાજુ 9 સેન્ટિમીટર છે. એક ઊભી બાજુ ખાલી છે. પરિમિતિ કેટલી છે?",
    "Which upright side faces the blank one?": "ખાલી બાજુની સામે કઈ ઊભી બાજુ છે?",
    "A staircase shape has eight sides. One step going down has no number on it. Give the length all the way round.": "પગથિયાં જેવા આકારને 8 બાજુઓ છે. નીચે જતા એક પગથિયા પર કોઈ સંખ્યા નથી. ચારે બાજુની લંબાઈ જણાવો.",
    "Three sides go down this staircase, and one of them is blank.": "આ પગથિયાંમાં 3 બાજુઓ નીચે જાય છે, અને તેમાંથી એક ખાલી છે.",

    "A side from the perimeter": "પરિમિતિ પરથી એક બાજુ",
    "The whole way round is written in the middle. Take off the sides you can see.": "વચ્ચે ચારે બાજુની પૂરી લંબાઈ લખી છે. જે બાજુઓ દેખાય છે તેને બાદ કરો.",
    "What do the given sides add up to?": "આપેલી બાજુઓનો સરવાળો કેટલો થાય?",
    "Take off one side at a time and watch what is left.": "એક વારમાં એક બાજુ બાદ કરો અને જુઓ કે શું બચે છે.",
    "A missing side is the perimeter less every side that is given.": "ખૂટતી બાજુ એ છે જે પરિમિતિમાંથી બધી આપેલી બાજુઓ બાદ કરતાં બચે.",
    "You learned: a missing side is the perimeter less the given sides.": "તમે શીખ્યા: પરિમિતિમાંથી આપેલી બાજુઓ બાદ કરો, ખૂટતી બાજુ મળશે.",
    "Missing side in m": "ખૂટતી બાજુ (મી)",
    "Missing side in cm": "ખૂટતી બાજુ (સેમી)",
    "A four-sided field has a perimeter of fifty metres. Three of its sides are ten, fifteen and twelve metres. How long is the fourth side?": "ચાર બાજુવાળા એક ખેતરની પરિમિતિ 50 મીટર છે. તેની ત્રણ બાજુઓ 10, 15 અને 12 મીટર છે. ચોથી બાજુ કેટલી લાંબી છે?",
    "The three sides you can see are part of the fifty.": "દેખાતી ત્રણેય બાજુઓ 50 મીટરનો જ ભાગ છે.",
    "The perimeter of this triangle is written in its middle. Two of its sides are marked. Find the third side.": "આ ત્રિકોણની પરિમિતિ તેની વચ્ચે લખી છે. તેની બે બાજુઓ પર માપ લખ્યું છે. ત્રીજી બાજુ શોધો.",
    "The two marked sides do not reach the whole boundary.": "માપ લખેલી બંને બાજુઓ પૂરી સીમા સુધી પહોંચતી નથી.",
    "This four-sided shape has a perimeter of forty centimetres. Three of its sides are marked on the figure. Find the side that is left.": "ચાર બાજુવાળી આ આકૃતિની પરિમિતિ 40 સેન્ટિમીટર છે. આકૃતિ પર 3 બાજુઓનાં માપ લખ્યાં છે. બાકી રહેલી બાજુ શોધો.",
    "Only one of the three given sides has come off.": "આપેલી ત્રણ બાજુઓમાંથી હજી માત્ર એક જ બાદ થઈ છે.",

    "Sides walked": "ચાલેલી બાજુઓ",
    "Sides taken off": "બાદ કરેલી બાજુઓ",
    "of": "માંથી",
    "all round": "ચારે બાજુ",
    "string": "દોરી",
    "cm": "સેમી",
    "m": "મી",
    "Next": "આગળની",
    "shape": "આકૃતિ",
    "Equal": "સરખી",
    "Opposite": "સામેની",
    "Facing": "સામેની",
    "sides": "બાજુઓ",
    "String": "દોરી",
    "Take": "એક બાજુ",
    "off": "બાદ કરો",
  },
};

/* One entry per phase = one mount.
   says    the teach run, said before anything is asked
   ladder  rungs 2 and 3 of the hint ladder (rung 1 is each item's own miss line); never the answer
   closing one closing line for this phase, said once when it goes idle
   learned the summary page's row for this phase: "You learned: ..." (at most 72 characters)
   traceback what the working area redraws after a miss, in one line (for the sidecar)
   items   three a phase. fig = the figure drawn on the board; near = the item's own misconception */
const PHASES = [
  {
    n: 1,
    concept: "Add every side",
    conceptId: "M1.S2.T4.C12", objectiveIds: ["O5"],
    says: ["Walk all the way round. Add each side as you go. Does the string agree?"],
    ladder: ["Which sides has the walker not walked yet?", "Walk a small rectangle, three by two, and count every side once."],
    closing: "The perimeter is the length all the way round, every side of the boundary added once.",
    learned: "You learned: the perimeter is every side of the boundary added once.",
    traceback: "The walker walks every side of the boundary, the lengths stack up in the column, and the column ends on the perimeter.",
    items: [
      /* learn ML1: answer in the plan = Eighty centimetres */
      { qid: "M1.S2.T4.C12:ML1", kind: "walk", fig: "f1a", answer: 80, near: 40, winMs: 3200,
        ask: "Perimeter in cm",
        say: "A photo frame is twenty-five centimetres long and fifteen centimetres wide. How far is it all the way round?",
        miss: "Two sides of this frame carry no number yet." },
      /* practice 1: answer in the plan = Seventeen centimetres */
      { qid: "M1.S2.T4.C12:1", kind: "walk", fig: "f1b", answer: 17, near: 10, winMs: 3200,
        ask: "Perimeter in cm",
        say: "A triangle has sides of four, six and seven centimetres. Find its perimeter.",
        miss: "Count the sides of this triangle, then add every one." },
      /* practice 2: answer in the plan = One hundred eighty centimetres (the width is thirty) */
      { qid: "M1.S2.T4.C12:2", kind: "walk", fig: "f1c", answer: 180, near: 90, winMs: 3200,
        ask: "Perimeter in cm",
        say: "A mat is sixty centimetres long and its width is half that. What is its perimeter?",
        miss: "Half of sixty gives the width. This mat has four sides." },
    ],
  },
  {
    n: 2,
    concept: "Four equal sides",
    conceptId: "M1.S2.T4.C13", objectiveIds: ["O5"],
    says: ["Add the four sides. Now try four times one side. Is it the same?"],
    ladder: ["How many sides does the walker cross to get home?", "Try a square of side two and see what four twos make."],
    closing: "A square's four sides are equal, so its perimeter is four times its side.",
    learned: "You learned: a square's perimeter is four times its side.",
    traceback: "The walker walks all four equal sides, the column stacks them, and the times key lays the same side out four times.",
    items: [
      /* learn ML2: answer in the plan = Thirty-six centimetres */
      { qid: "M1.S2.T4.C13:ML2", kind: "walk", fig: "f2a", answer: 36, near: 18, winMs: 3200,
        ask: "Perimeter in cm",
        say: "A square tile has sides of nine centimetres. What is its perimeter?",
        miss: "All four sides of this tile are the same length." },
      /* practice 3: answer in the plan = Forty-eight centimetres, four times twelve */
      { qid: "M1.S2.T4.C13:3", kind: "walk", fig: "f2b", answer: 48, near: 24, winMs: 3200,
        ask: "Perimeter in cm",
        say: "A square has sides of twelve centimetres. Find the length all the way round.",
        miss: "Count the sides of a square, then add that many twelves." },
      /* practice 4: answer in the plan = Twenty-four centimetres, eight added three times */
      { qid: "M1.S2.T4.C13:4", kind: "walk", fig: "f2c", answer: 24, near: 32, winMs: 3200,
        ask: "Perimeter in cm",
        say: "An equilateral triangle has all three sides equal. Each side is eight centimetres. How long is its boundary?",
        miss: "This triangle has three equal sides, not four." },
    ],
  },
  {
    n: 3,
    concept: "A side with no label still counts",
    conceptId: "M1.S2.T4.C14", objectiveIds: ["O6"],
    says: ["This side has no label. Which sides face it? Stack them and find it."],
    ladder: ["Which sides run the same way as it, and which long side faces them?", "The short sides along one side add up to the long side facing them."],
    closing: "Every side belongs to the perimeter, labelled or not. On a stepped shape, the short sides add up to the side facing them.",
    learned: "You learned: a side with no label still belongs to the perimeter.",
    traceback: "The bracket stacks the short sides against the side facing them, the missing length drops onto the figure, and the walker finishes the round.",
    items: [
      /* learn ML3: answer in the plan = Thirty-four centimetres; the side with no label is five */
      { qid: "M1.S2.T4.C14:ML3", kind: "walk", fig: "f3a", answer: 34, near: 29, winMs: 3600,
        ask: "Perimeter in cm",
        say: "An L-shape has six sides, and one upright side carries no label. Find the perimeter.",
        miss: "The walker will not step along a side it does not know." },
      /* practice 5: answer in the plan = missing side five, perimeter forty-six centimetres */
      { qid: "M1.S2.T4.C14:5", kind: "walk", fig: "f3b", answer: 46, near: 41, winMs: 3600,
        ask: "Perimeter in cm",
        say: "Another L-shape has a left side of nine centimetres. One of its upright sides is blank. What is the perimeter?",
        miss: "Which upright side faces the blank one?" },
      /* practice 6: answer in the plan = missing step four, perimeter thirty-eight centimetres */
      { qid: "M1.S2.T4.C14:6", kind: "walk", fig: "f3c", answer: 38, near: 34, winMs: 3600,
        ask: "Perimeter in cm",
        say: "A staircase shape has eight sides. One step going down has no number on it. Give the length all the way round.",
        miss: "Three sides go down this staircase, and one of them is blank." },
    ],
  },
  {
    n: 4,
    concept: "A side from the perimeter",
    conceptId: "M1.S2.T4.C15", objectiveIds: ["O6"],
    says: ["The whole way round is written in the middle. Take off the sides you can see."],
    ladder: ["What do the given sides add up to?", "Take off one side at a time and watch what is left."],
    closing: "A missing side is the perimeter less every side that is given.",
    learned: "You learned: a missing side is the perimeter less the given sides.",
    traceback: "The bay lays the perimeter out as one bar, takes each given side off it, and the length left drops onto the blank side.",
    items: [
      /* learn ML4: answer in the plan = Thirteen metres */
      { qid: "M1.S2.T4.C15:ML4", kind: "bay", fig: "f4a", answer: 13, near: 87, winMs: 3600,
        ask: "Missing side in m",
        say: "A four-sided field has a perimeter of fifty metres. Three of its sides are ten, fifteen and twelve metres. How long is the fourth side?",
        miss: "The three sides you can see are part of the fifty." },
      /* practice 7: answer in the plan = Seven centimetres, twenty-seven less twenty */
      { qid: "M1.S2.T4.C15:7", kind: "bay", fig: "f4b", answer: 7, near: 18, winMs: 3600,
        ask: "Missing side in cm",
        say: "The perimeter of this triangle is written in its middle. Two of its sides are marked. Find the third side.",
        miss: "The two marked sides do not reach the whole boundary." },
      /* practice 8: answer in the plan = Six centimetres (forty less thirty-four). The plan's own
         rectangle would print the answer on the side opposite the blank one, so the figure is an
         irregular four-sided shape: 16, 8 and 10 given, none of them equal to the 6 that is missing */
      { qid: "M1.S2.T4.C15:8", kind: "bay", fig: "f4c", answer: 6, near: 24, winMs: 3600,
        ask: "Missing side in cm",
        say: "This four-sided shape has a perimeter of forty centimetres. Three of its sides are marked on the figure. Find the side that is left.",
        miss: "Only one of the three given sides has come off." },
    ],
  },
];

/* The boards, bands and figures the working area draws (they go into the sidecar too).
   A figure is a closed run of points in figure units (y downwards) with its side lengths in order:
   side k runs from pts[k] to pts[k+1]. show[k] = its length is printed on the figure at the start.
   miss = the side with no label · brk = the facing-sides rule for it (face and the sides running the
   same way) · perim = a perimeter written in the middle (phase 4) · equal = every side the same. */
const MODEL = {
  board: { x: 0, y: 0, w: 660, h: 380 },
  plot: { x: 66, y: 64, w: 528, h: 258 },
  band: { x: 0, y: 392, w: 660, h: 136 },
  col: { x: 676, y: 0, w: 150, h: 380 },
  key: { x: 862, w: 200, h: 72, ys: [40, 136, 232] },
  figs: {
    f1a: { unit: "cm", pts: [[0, 15], [25, 15], [25, 0], [0, 0]], lens: [25, 15, 25, 15], show: [1, 1, 0, 0], opp: true, ruler: true },
    f1b: { unit: "cm", pts: [[0, 3.4218], [7, 3.4218], [2.0714, 0]], lens: [7, 6, 4], show: [1, 1, 1], ruler: true },
    f1c: { unit: "cm", pts: [[0, 30], [60, 30], [60, 0], [0, 0]], lens: [60, 30, 60, 30], show: [1, 0, 0, 0], opp: true, ruler: true },
    f2a: { unit: "cm", pts: [[0, 9], [9, 9], [9, 0], [0, 0]], lens: [9, 9, 9, 9], show: [1, 0, 0, 0], equal: true },
    f2b: { unit: "cm", pts: [[0, 12], [12, 12], [12, 0], [0, 0]], lens: [12, 12, 12, 12], show: [1, 0, 0, 0], equal: true },
    f2c: { unit: "cm", pts: [[0, 6.9282], [8, 6.9282], [4, 0]], lens: [8, 8, 8], show: [1, 0, 0], equal: true },
    f3a: { unit: "cm", pts: [[0, 8], [0, 0], [3, 0], [3, 5], [9, 5], [9, 8]], lens: [8, 3, 5, 6, 3, 9], show: [1, 1, 0, 1, 1, 1], miss: 2, brk: { face: 0, run: [4] } },
    f3b: { unit: "cm", pts: [[0, 9], [0, 0], [6, 0], [6, 5], [14, 5], [14, 9]], lens: [9, 6, 5, 8, 4, 14], show: [1, 1, 0, 1, 1, 1], miss: 2, brk: { face: 0, run: [4] } },
    f3c: { unit: "cm", pts: [[0, 7], [0, 0], [4, 0], [4, 2], [8, 2], [8, 5], [12, 5], [12, 7]], lens: [7, 4, 2, 4, 3, 4, 2, 12], show: [1, 1, 1, 1, 0, 1, 1, 1], miss: 4, brk: { face: 0, run: [2, 6] } },
    f4a: { unit: "m", pts: [[0, 12], [15, 12], [15, 0], [5, 0]], lens: [15, 12, 10, 13], show: [1, 1, 1, 0], miss: 3, perim: 50 },
    f4b: { unit: "cm", pts: [[0, 5.71278], [11, 5.71278], [6.954545, 0]], lens: [11, 7, 9], show: [1, 0, 1], miss: 1, perim: 27 },
    f4c: { unit: "cm", pts: [[0, 6], [16, 6], [16, 0], [8, 0]], lens: [16, 6, 8, 10], show: [1, 0, 1, 1], miss: 1, perim: 40 },
  },
  free: ["f1a", "f2a", "f3a", "f4a"],
};

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* judge: is this value right for this item? (every answer here is a length in whole units) */
const judge = (item: any, v: any) => leadNumber(v) === item.answer;

/* oracle: a second route that shares no code with judge or the picture. It never reads the authored
   answer table to find the answer: it measures the drawn figure point to point, checks every drawn
   side against the number printed beside it, and adds the boundary again (or takes the given sides
   off the perimeter written in the middle). */
const oracle = () => {
  const span = (a: any, b: any) => Math.sqrt((a[0] - b[0]) * (a[0] - b[0]) + (a[1] - b[1]) * (a[1] - b[1]));
  const near = (a: number, b: number) => Math.abs(a - b) < 0.02;
  return PHASES.every((p: any) => p.items.every((it: any) => {
    const f = (MODEL.figs as any)[it.fig];
    if (!f) return false;
    const edge = f.pts.map((q: any, k: number) => span(q, f.pts[(k + 1) % f.pts.length]));
    if (!edge.every((e: number, k: number) => near(e, f.lens[k]))) return false;   /* drawn to scale */
    const round = edge.reduce((a: number, b: number) => a + b, 0);
    if (f.perim === undefined) return near(round, it.answer);
    if (!near(round, f.perim)) return false;
    const given = edge.filter((_: any, k: number) => k !== f.miss).reduce((a: number, b: number) => a + b, 0);
    return near(f.perim - given, it.answer);
  }));
};

/* the most likely wrong answer (this item's own misconception); judge must reject it */
const nearMiss = (item: any) => item.near;
/* the forms of an answer that no question, hint or ladder line may print */
const answerForms = (item: any) => [String(item.answer), indian(item.answer), words(item.answer)];
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => item.answer;

const solve = (item: any, T: any) => T.submit(item.answer);
/* every answer is typed on the number pad: the agent types it and presses Enter */
const answer = () => undefined;
const check = () => undefined;

/* ── the working area: 1086 x 528, origin at its top-left ──────────────────────────────── */

/* the figure's own inks: the boundary deep blue, a corner vermilion, a length amber, guides near-black */
const INK_FIG = CONTENT.hundred;
const INK_LEN = shade(CONTENT.ten, 0.45);
const INK_BAR = CONTENT.ten;
const INK_WALK = CONTENT.pointer;
const INK_GUIDE = CONTENT.line;

/* A blank side's tap target. While the cell holds the pad (captured) it binds nothing, so Enter
   goes to the window and the typed number is taken, instead of re-opening the cell. */
function CellHit({ id, x, y, w, h, onPress, label, live }: any) {
  const p = usePress(onPress, !!live);
  return (
    <rect className="c4-hit" data-control={id} role="button" tabIndex={0} aria-label={label}
      x={x} y={y} width={w} height={h} fill="transparent" {...(live ? p.bind() : {})} onKeyDown={live ? p.keys : undefined} />
  );
}

/* the state of one figure before anything has been touched */
const restOf = (f: any, tag: string) => ({ tag, walked: 0, shown: f.show.slice(), laid: false, mult: false, brk: 0, bay: 0, left: false, total: null, cell: null, demo: false });

/* the correction, step by step: it redraws the whole round and ends on the whole right answer */
const traceOf = (f: any, ans: number, tag: string) => {
  const L = f.lens.length, all = f.lens.map(() => 1);
  const seq: any[] = [];
  let st: any = { ...restOf(f, tag), demo: true };
  const push = (o: any) => { st = { ...st, ...o }; seq.push(st); };
  if (f.perim !== undefined) {
    f.lens.forEach((_: any, k: number) => { if (k !== f.miss) push({ bay: st.bay + 1 }); });
    push({ left: true, shown: all });
    push({ total: ans });
    return seq;
  }
  const blocked = f.show.findIndex((x: number) => !x);
  const stop = blocked < 0 ? L : blocked;
  for (let k = 0; k < stop; k++) push({ walked: k + 1 });
  if (blocked >= 0) {
    if (f.brk) { push({ brk: 1 }); push({ brk: 2, shown: all }); }
    else push({ shown: all });
  }
  for (let k = stop; k < L; k++) push({ walked: k + 1 });
  if (f.equal) push({ mult: true });
  push({ total: ans });
  if (f.ruler) push({ laid: true, straight: true });
  return seq;
};
/* the whole picture finished: what the win and the end of a phase stand on */
const wholeOf = (f: any, ans: number, tag: string) => { const s = traceOf(f, ans, tag); return { ...s[s.length - 1], demo: false }; };

/* the missing side, read off the sides facing it (the stepped-shape rule the bracket draws) */
const missLen = (f: any) => (f.brk ? f.lens[f.brk.face] - f.brk.run.reduce((a: number, k: number) => a + f.lens[k], 0) : f.miss !== undefined ? f.lens[f.miss] : 0);

/* the figure on the board: points, outward label places and a scale, all in working-area units */
const placeOf = (f: any) => {
  const P = MODEL.plot;
  const xs = f.pts.map((p: any) => p[0]), ys = f.pts.map((p: any) => p[1]);
  const x0 = Math.min.apply(null, xs), y0 = Math.min.apply(null, ys);
  const bw = Math.max.apply(null, xs) - x0, bh = Math.max.apply(null, ys) - y0;
  const k = Math.min(P.w / (bw || 1), P.h / (bh || 1));
  const ox = P.x + (P.w - bw * k) / 2 - x0 * k, oy = P.y + (P.h - bh * k) / 2 - y0 * k;
  const pts = f.pts.map((p: any) => [ox + p[0] * k, oy + p[1] * k]);
  /* the shoelace tells the winding, and the winding tells which way is out of the figure */
  let area = 0;
  pts.forEach((p: any, i: number) => { const q = pts[(i + 1) % pts.length]; area += p[0] * q[1] - q[0] * p[1]; });
  const cw = area > 0 ? 1 : -1;
  const side = pts.map((p: any, i: number) => {
    const q = pts[(i + 1) % pts.length];
    const dx = q[0] - p[0], dy = q[1] - p[1], L = Math.sqrt(dx * dx + dy * dy) || 1;
    const nx = (cw * dy) / L, ny = (-cw * dx) / L;
    const mx = (p[0] + q[0]) / 2, my = (p[1] + q[1]) / 2;
    return { a: p, b: q, mx, my, lx: mx + nx * 32, ly: my + ny * 32 };
  });
  const cx = pts.reduce((a: number, p: any) => a + p[0], 0) / pts.length;
  const cy = pts.reduce((a: number, p: any) => a + p[1], 0) / pts.length;
  return { pts, side, k, cx, cy };
};

function Work({ phase, n, item, index, stage, wrong, typed, captured, api, MODEL, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();
  const [free, setFree] = useState(0);
  const [s, setS] = useState<any>(null);

  const key = stage === "free" ? "free:" + free : n + ":" + index;
  const fig = (MODEL.figs as any)[stage === "free" ? MODEL.free[free % MODEL.free.length] : item.fig];
  const rest = s && s.tag === key ? s : restOf(fig, key);
  const view = stage === "win" || stage === "idle" ? wholeOf(fig, item.answer, key) : rest;
  const place = useMemo(() => placeOf(fig), [fig]);

  const L = fig.lens.length;
  const all = fig.lens.map(() => 1);
  const busy = tl.busy;

  api.onEnter(null);

  /* the correction: lock, redraw the whole round, end on the answer, unlock. Nothing is marked and
     the child's answer stays in the slot; the picture then stands until the child's next act. */
  const missAt = wrong ? key + ":" + wrong.tries : "";
  const ran = useRef("");
  useEffect(() => {
    if (!wrong || stage !== "ask" || ran.current === missAt) return;
    ran.current = missAt;
    api.lock(true);
    const seq = traceOf(fig, item.answer, key);
    tl.run(seq.map((x: any) => [230, () => setS(x)]), () => api.lock(false));
  }, [missAt, stage]);

  /* what the host and the teacher agent read back (toolApi.getState) */
  api.share({ figure: stage === "free" ? MODEL.free[free % MODEL.free.length] : item.fig, walkerAt: view.walked % L,
    walked: view.walked, sum: fig.lens.slice(0, view.walked).reduce((a: number, b: number) => a + b, 0),
    stringLaid: !!view.laid, missingSide: fig.miss === undefined ? null : view.shown[fig.miss] ? missLen(fig) : null,
    perimeterGiven: fig.perim === undefined ? null : fig.perim });

  /* Every act on the working area hands the pad back first, and commits that hand-back even when
     the act itself is refused (else the cell would draw as open while the digits went to the slot).
     Nothing here rebuilds the figure: a correction stands until the question changes, so the child's
     own next tap can never undo it (PATTERNS.md §7). */
  const release = () => {
    if (!rest.cell) return rest;
    api.capture(null);
    const b = { ...rest, cell: null };
    setS(b);
    return b;
  };

  /* the pad, lent to the blank side the child tapped: digits, rub out, Escape and Enter come here */
  const onCellKey = (k: string) => {
    const b = rest, c = b.cell;
    if (!c) return;
    if (k === "clear") { api.capture(null); setS({ ...b, cell: null, demo: false }); return; }
    if (k === "back") { setS({ ...b, cell: { k: c.k, v: c.v.slice(0, -1) }, demo: false }); return; }
    if (k === "enter") {
      if (c.v !== "" && Number(c.v) === fig.lens[c.k]) {
        api.sfx.tick(); api.capture(null);
        const sh = b.shown.slice(); sh[c.k] = 1;
        setS({ ...b, shown: sh, cell: null, demo: false });
      } else { api.sfx.wrong(); setS({ ...b, cell: { k: c.k, v: "" }, demo: false }); }
      return;
    }
    if (k === "point") return;
    setS({ ...b, cell: { k: c.k, v: c.v.length >= 3 ? c.v : c.v + k }, demo: false });
  };
  const cellKey = useRef<any>(null);
  cellKey.current = onCellKey;
  const capFn = useRef((k: string) => cellKey.current && cellKey.current(k)).current;

  /* the walker: one tap, one side. It will not step along a side whose length is not known yet. */
  const stepOn = () => {
    if (busy) return;
    const b = release();
    const k = b.walked;
    if (k >= L) return;
    if (!b.shown[k] && !fig.equal) { api.sfx.wrong(); return; }   /* it will not step along a side it does not know */
    api.sfx.tick();
    setS({ ...b, walked: k + 1, shown: fig.equal ? all : b.shown, demo: false });
  };
  /* Every side of a square is the same, so one length lights them all. A rectangle has only facing
     pairs, so a side is lit ONLY from the side facing it, and only when that one is already known:
     a width no length faces is the child's own to work out and type into its cell. */
  const lightSides = () => {
    if (busy) return;
    const b = release();
    if (b.shown.every((x: number) => !!x) && (!fig.equal || b.mult)) return;   /* nothing left to light */
    api.sfx.tick();
    if (fig.equal) { setS({ ...b, shown: all, mult: true, demo: false }); return; }
    const sh = b.shown.slice();
    b.shown.forEach((on: number, k: number) => { if (on) sh[(k + 2) % L] = 1; });
    setS({ ...b, shown: sh, demo: false });
  };
  /* the string: laid tight round the boundary, ready to be straightened when the answer is in */
  const layString = () => { if (busy) return; const b = release(); if (b.laid) return; api.sfx.tick(); setS({ ...b, laid: true, demo: false }); };
  /* the facing-sides bracket: the sides running one way lie against the side facing them */
  const openBracket = () => {
    if (busy) return;
    const b = release();
    if (b.brk >= 2) return;
    api.sfx.tick();
    tl.run([[380, () => setS({ ...b, brk: 1, demo: false })], [260, () => { api.sfx.tick(); setS({ ...b, brk: 2, shown: all, demo: false }); }]]);
  };
  /* the bay: the given sides come off the perimeter one at a time */
  const takeOff = () => {
    if (busy) return;
    const b = release();
    if (b.bay >= L - 1) return;
    api.sfx.tick();
    setS({ ...b, bay: b.bay + 1, demo: false });
  };
  const nextShape = () => { if (busy) return; release(); api.sfx.tick(); setFree(free + 1); };

  /* ── the column: the sides walked, one under another, the way the book adds them ─────── */
  const col = MODEL.col, colR = col.x + col.w - 20;
  const rows = fig.perim === undefined
    ? fig.lens.slice(0, view.walked).map((v: number, i: number) => (i ? "+ " : "") + v)
    : [String(fig.perim)].concat(fig.lens.map((v: number, k: number) => ({ v, k })).filter((o: any) => o.k !== fig.miss).slice(0, view.bay).map((o: any) => "− " + o.v));
  const rowY = (i: number) => 58 + i * 36;
  const ruleY = rowY(Math.max(rows.length, 1)) - 8;

  /* ── the band under the board: the ruler, the times key's row, the bracket, the bay ──── */
  const band = MODEL.band, bx = 70, bw = 520;
  const per = fig.lens.reduce((a: number, b: number) => a + b, 0);
  const rulerMax = [20, 25, 50, 100, 200, 250, 500].filter((x: number) => x >= per)[0] || 500;

  const bracket = fig.brk ? (() => {
    const face = fig.lens[fig.brk.face], sc = bw / face;
    let at = bx;
    const bars = fig.brk.run.map((k: number) => { const w = fig.lens[k] * sc; const o = { x: at, w, v: fig.lens[k] }; at += w; return o; });
    return { sc, bars, gap: { x: at, w: bx + face * sc - at, v: missLen(fig) }, face };
  })() : null;

  const bay = fig.perim !== undefined ? (() => {
    const sc = bw / fig.perim;
    let at = bx;
    const bars = fig.lens.map((v: number, k: number) => ({ v, k })).filter((o: any) => o.k !== fig.miss)
      .map((o: any) => { const w = o.v * sc; const b = { x: at, w, v: o.v }; at += w; return b; });
    const used = bars.slice(0, view.bay).reduce((a: number, b: any) => a + b.w, 0);
    return { sc, bars, left: { x: bx + used, w: bw - used, v: fig.perim - bars.slice(0, view.bay).reduce((a: number, b: any) => a + b.v, 0) } };
  })() : null;

  const walkerAt = place.pts[view.walked % L];
  const blockedIdx = view.walked < L && !view.shown[view.walked] && !fig.equal ? view.walked : -1;
  /* a blank side no rule on this figure can fill: the child works its length out and types it in */
  const cellIdx = fig.opp && blockedIdx >= 0 && !view.shown[(blockedIdx + 2) % L] && (stage === "ask" || stage === "free") ? blockedIdx : -1;
  const openCell = () => {
    if (busy || cellIdx < 0 || captured) return;
    api.sfx.tick();
    setS({ ...rest, cell: { k: cellIdx, v: "" }, demo: false });
    api.capture(capFn);
  };
  const keyBox = MODEL.key;
  const keys: any[] = [];
  if (stage === "free") keys.push({ id: "next-shape", label: "Next shape", lines: ["Next", "shape"], on: nextShape });
  if (fig.opp || fig.equal) keys.push({ id: "same-sides", label: fig.equal ? "Every side the same" : "Opposite sides the same", lines: fig.equal ? ["Equal", "sides"] : ["Opposite", "sides"], on: lightSides });
  if (fig.ruler) keys.push({ id: "string", label: "Lay the string round", lines: ["String"], on: layString });
  if (fig.brk) keys.push({ id: "bracket", label: "Stack the facing sides", lines: ["Facing", "sides"], on: openBracket });
  if (fig.perim !== undefined) keys.push({ id: "take-off", label: "Take a given side off", lines: ["Take", "off"], on: takeOff });
  const shownKeys = keys.slice(0, 3);

  /* one invite only: the cell no rule can fill, else the key that unblocks, else the walker */
  const asking = stage === "ask" && !busy;
  const inviteCell = asking && cellIdx >= 0 && !view.cell;
  const wantKey = !inviteCell && asking && ((blockedIdx > 0 && cellIdx < 0) || (fig.perim !== undefined && view.bay === 0));
  const unblocks = fig.perim !== undefined ? "take-off" : fig.brk ? "bracket" : "same-sides";
  const inviteKey = wantKey ? shownKeys.findIndex((kk: any) => kk.id === unblocks) : -1;
  const inviteWalk = asking && !inviteCell && inviteKey < 0 && fig.perim === undefined && view.walked === 0;

  /* Once an answer is waiting in the slot, Enter belongs to the answer, not to whichever control
     happens to hold the keyboard focus. A focused control's own key handler calls preventDefault on
     Enter, and the runtime's window handler skips an event whose default is already prevented, so
     the answer was never sent and the control fired again instead. Taking Enter in the capture phase
     keeps that handler from running; React's stopPropagation stops the native event too, so the tool
     sends the answer itself. Space still presses the control. (Runtime gap, reported.) */
  const answerWaiting = stage === "ask" && !captured && !busy && String(typed === undefined || typed === null ? "" : typed) !== "";
  const passEnter = (e: any) => {
    if (!answerWaiting || e.key !== "Enter") return;
    e.stopPropagation();
    api.submit();
  };

  const times = fig.equal ? L : 0;
  /* "2 of 4" in English; in Hindi and Gujarati the whole comes first ("4 में से 2") */
  const cnt = fig.perim === undefined ? [view.walked, L] : [view.bay, L - 1];
  const cntText = lang === "en" ? cnt[0] + " of " + cnt[1] : cnt[1] + " " + tx("of") + " " + cnt[0];

  return (
    <g onKeyDownCapture={passEnter}>
      {/* the running count: how much of the boundary has been walked, never what it adds up to */}
      <g data-zone="runs">
        <rect x={0} y={-94} width={330} height={76} rx={RAD.panel} fill="url(#gPanel)" stroke={C.rule} strokeWidth={2} />
        <text x={20} y={lang === "en" ? -64 : -68} fontSize={T.micro} fontWeight={600} fill={shade(C.dim, 0.45)}>{tx(fig.perim === undefined ? "Sides walked" : "Sides taken off")}</text>
        <text x={20} y={lang === "en" ? -28 : -24} fontSize={T.label} fontWeight={700} fill={C.ink}>
          {cntText}
        </text>
      </g>

      {/* ── the board: the figure, drawn to scale, with a length beside every side that is known ── */}
      <rect x={MODEL.board.x} y={MODEL.board.y} width={MODEL.board.w} height={MODEL.board.h} rx={RAD.panel} fill={tint(C.panel, 0.62)} stroke={C.rule} strokeWidth={2} />
      {view.laid && (
        <polygon points={place.pts.map((p: any) => p[0] + "," + p[1]).join(" ")} fill="none" stroke={INK_BAR} strokeWidth={14} strokeLinejoin="round" strokeOpacity={0.55} />
      )}
      <polygon points={place.pts.map((p: any) => p[0] + "," + p[1]).join(" ")} fill={tint(INK_FIG, 0.9)} fillOpacity={0.35} stroke={INK_FIG} strokeWidth={5} strokeLinejoin="round" />
      {place.side.map((sd: any, k: number) => (
        k < view.walked ? <line key={"w" + k} x1={sd.a[0]} y1={sd.a[1]} x2={sd.b[0]} y2={sd.b[1]} stroke={INK_BAR} strokeWidth={9} strokeLinecap="round" /> : null
      ))}
      {place.pts.map((p: any, k: number) => <circle key={"c" + k} cx={p[0]} cy={p[1]} r={7} fill={INK_WALK} />)}
      {place.side.map((sd: any, k: number) => {
        if (view.shown[k]) return <text key={"l" + k} x={sd.lx} y={sd.ly + 11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={INK_LEN}>{fig.lens[k]}</text>;
        const open = !!view.cell && view.cell.k === k;
        return (
          <g key={"e" + k}>
            <rect x={sd.lx - (open ? 34 : 23)} y={sd.ly - (open ? 22 : 18)} width={open ? 68 : 46} height={open ? 44 : 36} rx={8}
              fill="#FFFFFF" stroke={open ? C.accent : INK_BAR} strokeWidth={open ? 4 : 3} strokeDasharray={open ? undefined : "7 6"} />
            {open && view.cell.v !== "" && <text x={sd.lx - 24} y={sd.ly + 10} fontSize={T.micro} fontWeight={700} fill={INK_LEN}>{view.cell.v}</text>}
            {open && <rect x={sd.lx - 22 + view.cell.v.length * 17} y={sd.ly - 14} width={3} height={28} fill={C.accent} />}
          </g>
        );
      })}
      {cellIdx >= 0 && (
        <g>
          {inviteCell && <Invite x={place.side[cellIdx].lx} y={place.side[cellIdx].ly} r={44} C={C} />}
          <CellHit id="side-cell" label="Type this side's length" live={!captured}
            x={place.side[cellIdx].lx - 36} y={place.side[cellIdx].ly - 36} w={72} h={72} onPress={openCell} />
        </g>
      )}
      {fig.perim !== undefined && (
        <g>
          <text x={place.cx} y={place.cy - 4} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={shade(C.dim, 0.45)}>{tx("all round")}</text>
          <text x={place.cx} y={place.cy + 34} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={INK_LEN}>{fig.perim}</text>
        </g>
      )}
      {/* the walker: a tap sends it along one side */}
      {fig.perim === undefined && (
        <g>
          <circle cx={walkerAt[0]} cy={walkerAt[1]} r={18} fill={INK_WALK} stroke="#FFFFFF" strokeWidth={4} />
          {inviteWalk && <Invite x={walkerAt[0]} y={walkerAt[1]} r={40} C={C} />}
          <Hit id="walker" x={walkerAt[0] - 36} y={walkerAt[1] - 36} w={72} h={72} onPress={stepOn} label="Walk the next side" enabled={view.walked < L} />
        </g>
      )}

      {/* ── the column: every side walked, one under another, as the book adds them ── */}
      <rect x={col.x} y={col.y} width={col.w} height={col.h} rx={RAD.panel} fill={tint(C.panel, 0.62)} stroke={C.rule} strokeWidth={2} />
      <text x={colR} y={30} textAnchor="end" fontSize={T.micro} fontWeight={600} fill={shade(C.dim, 0.45)}>{tx(fig.unit)}</text>
      {rows.map((r: string, i: number) => (
        <text key={"r" + i} x={colR} y={rowY(i)} textAnchor="end" fontSize={T.label} fontWeight={600} fill={INK_LEN}>{r}</text>
      ))}
      {view.total !== null && <line x1={col.x + 20} y1={ruleY} x2={colR} y2={ruleY} stroke={INK_GUIDE} strokeWidth={3} />}
      {view.total !== null && (
        <text x={colR} y={ruleY + 42} textAnchor="end" fontSize={T.prompt} fontWeight={700} fill={C.ink}>{indian(view.total)}</text>
      )}

      {/* ── the keys ── */}
      {shownKeys.map((kk: any, i: number) => (
        <Key key={kk.id} id={kk.id} label={kk.label} x={keyBox.x} y={keyBox.ys[i]} w={keyBox.w} h={keyBox.h} C={C} onClick={kk.on}>
          {kk.lines.length > 1
            ? <g><text y={lang === "en" ? -6 : -9} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx(kk.lines[0])}</text>
                <text y={lang === "en" ? 26 : 29} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx(kk.lines[1])}</text></g>
            : <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={C.ink}>{tx(kk.lines[0])}</text>}
        </Key>
      ))}
      {inviteKey >= 0 && <Invite x={keyBox.x + keyBox.w / 2} y={keyBox.ys[inviteKey] + keyBox.h / 2} r={52} C={C} />}

      {/* ── the band: the ruler and the string, the equal sides laid out, the bracket, or the bay ── */}
      {(fig.ruler || (fig.equal && view.mult) || (bracket && view.brk > 0) || bay) && (
        <rect x={band.x} y={band.y} width={band.w} height={band.h} rx={RAD.panel} fill={tint(C.panel, 0.62)} stroke={C.rule} strokeWidth={2} />
      )}

      {fig.ruler && (
        <g>
          <rect x={bx} y={band.y + 62} width={bw} height={40} rx={6} fill={shade(C.rule, 0.55)} />
          {Array.from({ length: 11 }, (_: any, i: number) => i).map((i: number) => (
            <line key={"t" + i} x1={bx + (bw * i) / 10} y1={band.y + 62} x2={bx + (bw * i) / 10} y2={band.y + 62 + (i % 5 === 0 ? 20 : 12)} stroke="#FFFFFF" strokeWidth={3} />
          ))}
          <text x={bx} y={band.y + 128} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={shade(C.dim, 0.45)}>0</text>
          {!view.laid && (
            <g>
              <circle cx={bx + 22} cy={band.y + 28} r={19} fill="none" stroke={INK_BAR} strokeWidth={6} />
              <circle cx={bx + 22} cy={band.y + 28} r={8} fill="none" stroke={INK_BAR} strokeWidth={6} />
              <text x={bx + 60} y={band.y + 38} fontSize={T.micro} fontWeight={600} fill={shade(C.dim, 0.45)}>{tx("string")}</text>
            </g>
          )}
          {view.straight && (
            <g>
              <rect x={bx} y={band.y + 68} width={(bw * per) / rulerMax} height={28} rx={6} fill={INK_BAR} />
              <line x1={bx + (bw * per) / rulerMax} y1={band.y + 36} x2={bx + (bw * per) / rulerMax} y2={band.y + 62} stroke={INK_LEN} strokeWidth={3} />
              <text x={bx + (bw * per) / rulerMax} y={band.y + 28} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={INK_LEN}>{indian(per)}</text>
            </g>
          )}
        </g>
      )}

      {fig.equal && view.mult && (
        <g>
          <text x={bx - 42} y={band.y + 82} fontSize={T.speech} fontWeight={700} fill={INK_LEN}>{"× " + times}</text>
          {Array.from({ length: times }, (_: any, i: number) => i).map((i: number) => (
            <g key={"m" + i}>
              <rect x={bx + 70 + i * (410 / times)} y={band.y + 40} width={410 / times - 16} height={52} rx={8} fill={tint(INK_BAR, 0.45)} stroke={INK_BAR} strokeWidth={3} />
              <text x={bx + 70 + i * (410 / times) + (410 / times - 16) / 2} y={band.y + 76} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={INK_LEN}>{fig.lens[0]}</text>
            </g>
          ))}
        </g>
      )}

      {bracket && view.brk > 0 && (
        <g>
          <line x1={bx - 14} y1={band.y + 8} x2={bx - 14} y2={band.y + 124} stroke={INK_GUIDE} strokeWidth={4} />
          {bracket.bars.map((b: any, i: number) => (
            <g key={"b" + i}>
              <rect x={b.x} y={band.y + 16} width={b.w - 6} height={46} rx={8} fill={tint(INK_BAR, 0.45)} stroke={INK_BAR} strokeWidth={3} />
              <text x={b.x + (b.w - 6) / 2} y={band.y + 48} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={INK_LEN}>{b.v}</text>
            </g>
          ))}
          <rect x={bracket.gap.x} y={band.y + 16} width={view.brk > 1 ? bracket.gap.w : 10} height={46} rx={8} fill="#FFFFFF" stroke={INK_BAR} strokeWidth={3} strokeDasharray="8 6" />
          {view.brk > 1 && <text x={bracket.gap.x + bracket.gap.w / 2} y={band.y + 48} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={INK_LEN}>{bracket.gap.v}</text>}
          <rect x={bx} y={band.y + 72} width={bw} height={46} rx={8} fill={tint(INK_FIG, 0.6)} stroke={INK_FIG} strokeWidth={3} />
          <text x={bx + bw / 2} y={band.y + 104} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={shade(INK_FIG, 0.45)}>{bracket.face}</text>
        </g>
      )}

      {bay && (
        <g>
          <rect x={bx} y={band.y + 16} width={bw} height={46} rx={8} fill={tint(INK_FIG, 0.6)} stroke={INK_FIG} strokeWidth={3} />
          <text x={bx + bw / 2} y={band.y + 48} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={shade(INK_FIG, 0.45)}>{fig.perim}</text>
          {bay.bars.slice(0, view.bay).map((b: any, i: number) => (
            <g key={"y" + i}>
              <rect x={b.x} y={band.y + 72} width={b.w - 5} height={46} rx={8} fill={tint(INK_BAR, 0.45)} stroke={INK_BAR} strokeWidth={3} />
              <text x={b.x + (b.w - 5) / 2} y={band.y + 104} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={INK_LEN}>{b.v}</text>
            </g>
          ))}
          {view.bay > 0 && (
            <g>
              <rect x={bay.left.x} y={band.y + 72} width={bay.left.w} height={46} rx={8} fill="#FFFFFF" stroke={INK_BAR} strokeWidth={3} strokeDasharray="8 6" />
              {view.left && <text x={bay.left.x + bay.left.w / 2} y={band.y + 104} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={INK_LEN}>{bay.left.v}</text>}
            </g>
          )}
        </g>
      )}
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase */
function Thumb({ n, result, C, w, h, lang = "en", tx = (v: any) => v }: any) {
  const last = result && result.last;
  if (!last) return null;
  const P = PHASES[(n || 1) - 1];
  const it = (P && P.items[last.item]) || (P && P.items[0]);
  const f = it ? (MODEL.figs as any)[it.fig] : null;
  if (!f) return null;
  const xs = f.pts.map((p: any) => p[0]), ys = f.pts.map((p: any) => p[1]);
  const x0 = Math.min.apply(null, xs), y0 = Math.min.apply(null, ys);
  const bw = Math.max.apply(null, xs) - x0, bh = Math.max.apply(null, ys) - y0;
  const k = Math.min(70 / (bw || 1), (h - 26) / (bh || 1));
  const ox = 16 + (70 - bw * k) / 2, oy = 13 + (h - 26 - bh * k) / 2;
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      <polygon points={f.pts.map((p: any) => (ox + (p[0] - x0) * k) + "," + (oy + (p[1] - y0) * k)).join(" ")}
        fill="none" stroke={CONTENT.hundred} strokeWidth={3} strokeLinejoin="round" />
      <text x={w - 16} y={h / 2 + 12} textAnchor="end" fontSize={T.label} fontWeight={700} fill={C.ink}>{indian(leadNumber(last.value) || 0) + " " + tx(f.unit)}</text>
    </g>
  );
}

function EdgeWalker(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, fitHost: () => null }} />
  );
}

export default EdgeWalker;
