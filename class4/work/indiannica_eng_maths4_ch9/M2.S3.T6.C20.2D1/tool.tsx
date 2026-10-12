/* ═══ M2.S3.T6.C20.2D1 · compass_bench · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists: header + its three controls, canvas, slot + pad, bubble + mascot,
   phase dots (user / AI mode), window.toolApi, sounds, the synced voice, scoring, the events,
   idle and restart. NO imports in this file; only the five host hooks. Follow docs/LAYOUT.md.
   Edit, never rewrite. Built by `node cli.mjs scaffold`; concepts are verbatim (check compares them). */

const TOOL_ID = "compass_bench";
const MEDIA_ID = "M2.S3.T6.C20.2D1";
const TOOL_NAME = "Compass Bench";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
const VOICE = {"rate":0.92,"pitch":1.06};

/* spoken before phase 1's teach lines only (the plan's opening voice line) */
const OPENING = ["A pair of compasses on a clean sheet. Where will the centre of your circle be?"];
/* the whole-tool line: spoken on the summary page */
const FINISH_LINE = "Every circle drawn round a fixed point, every part named, and every diameter two radii long.";
/* said when the child opens Free play from the summary page (the plan's free-play voice line) */
const FREE_LINE = "Free play. Any circle, any opening, rings on one centre, with the slider and the bar open.";

/* Hindi and Gujarati, keyed by the English line exactly (runtime r21: `lineFor(line, lang, TR)`); the English
   everywhere else stays what the checks read. NCERT class 4 geometry: वृत्त / વર્તુળ, केंद्र / કેન્દ્ર,
   त्रिज्या / ત્રિજ્યા, व्यास / વ્યાસ, जीवा / જીવા (chord), परिधि / પરિઘ (circumference), परकार / પરિકર
   (compass), संकेंद्रित वृत्त / સમકેન્દ્રી વર્તુળ (concentric), सीमा / સીમા (boundary), बिंदु / બિંદુ,
   रेखाखंड / રેખાખંડ. Digits stay digits (the runtime speaks them in the language in use); a length drawn on
   the picture ends in सेमी / સેમી or मीटर / મીટર. The slot shows a chosen word by its id, so the ids are keys
   too. A first draft; wants a native speaker's read. */
const TR: any = {
  hi: {
    "Compass Bench": "परकार की मेज़",
    "A pair of compasses on a clean sheet. Where will the centre of your circle be?": "साफ़ कागज़ पर एक परकार रखा है। तुम्हारे वृत्त का केंद्र कहाँ होगा?",
    "Every circle drawn round a fixed point, every part named, and every diameter two radii long.": "हर वृत्त एक स्थिर बिंदु के चारों ओर बना। हर भाग का नाम जाना, और हर व्यास दो त्रिज्याओं के बराबर है।",
    "Free play. Any circle, any opening, rings on one centre, with the slider and the bar open.": "मुक्त खेल। चौड़ाई, स्लाइडर और पट्टी से एक केंद्र पर कई वृत्त बनाओ।",

    "The same distance all the way round": "चारों ओर एक ही दूरी",
    "Fix the point and turn the pencil round it. Is the string the same all the way?": "बिंदु को टिकाओ और उसके चारों ओर पेंसिल घुमाओ। क्या धागा हर जगह एक ही लंबाई का रहता है?",
    "Does the string change length as the pencil turns?": "पेंसिल घूमने पर क्या धागे की लंबाई बदलती है?",
    "The point stays. Only the pencil travels, and it keeps its distance.": "बिंदु वहीं रहता है। सिर्फ़ पेंसिल चलती है, और अपनी दूरी बनाए रखती है।",
    "Every point of a circle is the same distance from its centre, and the length of the boundary is the circumference.": "वृत्त का हर बिंदु केंद्र से एक ही दूरी पर होता है। सीमा की लंबाई को परिधि कहते हैं।",
    "You learned: a circle keeps one distance from its centre.": "तुमने सीखा: वृत्त केंद्र से एक ही दूरी रखता है।",
    "Turn a circle, arm 3": "परकार 3 खोलो, वृत्त घुमाओ",
    "Press the metal point into the paper at K. Open the arm to three centimetres and turn the pencil right round.": "धातु की नोक को K पर कागज़ में दबाओ। परकार को 3 सेंटीमीटर खोलो और पेंसिल को पूरा घुमाओ।",
    "Every point of that circle is three centimetres from K, all the way round.": "उस वृत्त का हर बिंदु K से 3 सेंटीमीटर दूर है, चारों ओर।",
    "How wide did you open the arm from K itself?": "K से ही नापकर परकार कितना खोला?",
    "Name the boundary": "सीमा का नाम बताओ",
    "What is the length of the boundary of a circle called?": "वृत्त की सीमा की लंबाई क्या कहलाती है?",
    "The whole way round the outside is the circumference.": "बाहर का पूरा चक्कर परिधि है।",
    "Run a finger right round the outside of your circle.": "अपने वृत्त के बाहर-बाहर एक चक्कर उँगली फिराओ।",
    "Rings on one centre": "एक केंद्र पर वृत्त",
    "Four circles are drawn about one centre, the pencil arm opened wider each time. What are circles with one centre and different radii called?": "एक ही केंद्र के चारों ओर 4 वृत्त बने हैं। हर बार परकार पहले से ज़्यादा खोला गया। एक केंद्र और अलग-अलग त्रिज्या वाले वृत्त क्या कहलाते हैं?",
    "Rings that share a centre are concentric circles.": "एक केंद्र वाले वृत्त संकेंद्रित वृत्त कहलाते हैं।",
    "All four were turned about the very same dot.": "चारों वृत्त एक ही बिंदु के चारों ओर घुमाए गए थे।",

    "Radius and chord": "त्रिज्या और जीवा",
    "One starts at the centre and one does not. Which is the radius?": "एक केंद्र से शुरू होती है और एक नहीं। इनमें त्रिज्या कौन सी है?",
    "Is either end at the centre?": "क्या किसी का भी एक सिरा केंद्र पर है?",
    "One end on the dot in the middle makes a radius.": "बीच के बिंदु पर एक सिरा हो, तो वह त्रिज्या है।",
    "A radius joins the centre to the circle, and every radius of one circle is the same length; a chord joins two points on the circle.": "त्रिज्या केंद्र को वृत्त से जोड़ती है। एक वृत्त की हर त्रिज्या बराबर लंबी होती है। जीवा वृत्त के दो बिंदुओं को जोड़ती है।",
    "You learned: a radius starts at the centre, a chord does not.": "तुमने सीखा: त्रिज्या केंद्र से शुरू होती है, जीवा नहीं।",
    "Name OA and BC": "OA और BC के नाम बताओ",
    "Circle O has two segments drawn on it, OA and BC. Look at where each one ends, then name them both.": "वृत्त O में दो रेखाखंड बने हैं, OA और BC। देखो हर एक कहाँ खत्म होता है, फिर दोनों के नाम बताओ।",
    "OA reaches out from O, so it is a radius. BC joins two points, so it is a chord.": "OA, O से निकलती है, इसलिए त्रिज्या है। BC दो बिंदुओं को जोड़ती है, इसलिए जीवा है।",
    "Where does each of the two segments begin?": "दोनों रेखाखंड कहाँ से शुरू होते हैं?",
    "PQ beside PR": "PQ और PR की तुलना",
    "In circle P, segment PQ runs from P out to the curve, and so does segment PR. How do their lengths compare?": "वृत्त P में रेखाखंड PQ, P से वृत्त तक जाता है। रेखाखंड PR भी वैसे ही जाता है। इन दोनों की लंबाई कैसी है?",
    "PQ is a radius, and every radius of one circle runs out just as far.": "PQ त्रिज्या है, और एक वृत्त की हर त्रिज्या उतनी ही दूर जाती है।",
    "Measure PQ, then measure PR. Do they stop in the same place?": "PQ नापो, फिर PR नापो। क्या दोनों एक ही जगह रुकते हैं?",
    "Only one of these": "इनमें से सिर्फ़ एक",
    "A circle has many radii, many chords and many diameters. Which part is there only one of?": "एक वृत्त में कई त्रिज्याएँ, कई जीवाएँ और कई व्यास होते हैं। कौन सा भाग सिर्फ़ एक ही होता है?",
    "Draw as many parts as you like; they all turn about that single dot.": "जितने चाहो उतने भाग बनाओ। सब उसी एक बिंदु के चारों ओर घूमते हैं।",
    "Every radius you draw has to start from the very same dot.": "तुम जो भी त्रिज्या बनाओ, वह उसी एक बिंदु से शुरू होती है।",

    "The chord through the centre": "केंद्र से गुज़रती जीवा",
    "Slide the chord across. Where is it longest? What is it called there?": "जीवा को खिसकाओ। वह कहाँ सबसे लंबी है? वहाँ उसे क्या कहते हैं?",
    "Where is its length greatest as it slides?": "खिसकते समय उसकी लंबाई सबसे ज़्यादा कहाँ है?",
    "Move it one step at a time and watch for the light.": "उसे एक-एक कदम खिसकाओ और रोशनी पर नज़र रखो।",
    "A chord through the centre is a diameter and the longest chord. Every diameter is a chord, but not every chord is a diameter.": "केंद्र से गुज़रने वाली जीवा व्यास है, और वही सबसे लंबी जीवा है। हर व्यास जीवा है, पर हर जीवा व्यास नहीं।",
    "You learned: a chord through the centre is a diameter.": "तुमने सीखा: केंद्र से गुज़रने वाली जीवा व्यास है।",
    "Stop DE where it is longest": "DE को सबसे लंबी जगह रोको",
    "Chord FG lies near the rim. Slide chord DE across the circle and stop it where it is longest.": "जीवा FG किनारे के पास है। जीवा DE को वृत्त में खिसकाओ और जहाँ वह सबसे लंबी हो, वहाँ रोको।",
    "DE crosses O, so DE is a diameter, and it is longer than FG.": "DE, O से गुज़रती है, इसलिए DE व्यास है। और यह FG से लंबी है।",
    "Watch the number in the box as you slide it further.": "आगे खिसकाते समय बक्से में लिखी संख्या देखो।",
    "Is every chord a diameter?": "क्या हर जीवा व्यास है?",
    "Every diameter is a chord. Is every chord a diameter?": "हर व्यास एक जीवा है। क्या हर जीवा एक व्यास है?",
    "Only the ones that cross the middle. The rest are chords and nothing more.": "सिर्फ़ वही जो बीच से गुज़रती हैं। बाकी सिर्फ़ जीवाएँ हैं, और कुछ नहीं।",
    "Think of a short chord up near the rim. Does it reach O?": "किनारे के पास की एक छोटी जीवा सोचो। क्या वह O तक पहुँचती है?",
    "A chord of 10 cm?": "10 सेमी की जीवा?",
    "In a circle, the diameter is eight centimetres. Could a chord of that circle be ten centimetres long?": "एक वृत्त का व्यास 8 सेंटीमीटर है। क्या उस वृत्त की कोई जीवा 10 सेंटीमीटर लंबी हो सकती है?",
    "Nothing in the circle beats the one through the middle.": "वृत्त में बीच से गुज़रने वाली जीवा से लंबी कोई जीवा नहीं।",
    "Slide the chord everywhere and watch the greatest it reaches.": "जीवा को हर जगह खिसकाओ। देखो, वह सबसे ज़्यादा कितनी लंबी होती है।",

    "Two radii make a diameter": "दो त्रिज्याओं से एक व्यास",
    "Lay two radii end to end through the centre. What have you made?": "दो त्रिज्याओं को केंद्र से होकर सिरे से सिरा मिलाकर रखो। तुमने क्या बनाया?",
    "How many radii fit across the circle through the centre?": "केंद्र से होकर वृत्त के आर-पार कितनी त्रिज्याएँ आती हैं?",
    "Across the circle is two radii. One radius is half of it.": "आर-पार दो त्रिज्याएँ हैं। एक त्रिज्या उसकी आधी है।",
    "The diameter is twice the radius, and the radius is half the diameter.": "व्यास त्रिज्या का दुगुना होता है। त्रिज्या व्यास की आधी होती है।",
    "You learned: a diameter is two radii, so it is twice the radius.": "तुमने सीखा: व्यास दो त्रिज्याओं का होता है, यानी दुगुना।",
    "Diameter in cm": "सेमी में व्यास",
    "A circle has a radius of six centimetres. How long is its diameter?": "एक वृत्त की त्रिज्या 6 सेंटीमीटर है। उसका व्यास कितना लंबा है?",
    "Six out one way and six out the other, right across.": "एक ओर 6 और दूसरी ओर 6, पूरे आर-पार।",
    "Lay a second six beside the first, through the middle.": "पहली के बगल में 6 सेंटीमीटर की दूसरी त्रिज्या रखो, बीच से होकर।",
    "Radius in cm": "सेमी में त्रिज्या",
    "A round clock face has a diameter of twenty-eight centimetres. What is its radius?": "घड़ी के गोल चेहरे का व्यास 28 सेंटीमीटर है। उसकी त्रिज्या कितनी है?",
    "Fold the whole way across at the centre and each piece reaches the rim.": "व्यास को केंद्र पर मोड़ो। हर टुकड़ा किनारे तक पहुँचता है।",
    "The diameter folds into two equal pieces at the centre dot.": "व्यास केंद्र बिंदु पर दो बराबर टुकड़ों में मुड़ता है।",
    "Diameter in m": "मीटर में व्यास",
    "A round pond has a radius of thirty-five metres. What is its diameter?": "एक गोल तालाब की त्रिज्या 35 मीटर है। उसका व्यास कितना है?",
    "Two radii end to end walk the pond from bank to bank.": "दो त्रिज्याएँ सिरे से सिरा मिलाकर रखो। वे तालाब के एक किनारे से दूसरे किनारे तक पहुँचती हैं।",
    "One radius reaches the bank. A second one reaches the far bank.": "एक त्रिज्या किनारे तक पहुँचती है। दूसरी त्रिज्या दूसरे किनारे तक पहुँचती है।",

    /* the pad's choice labels (at most two lines of ten characters) and the ids the slot shows */
    "concentric circles": "संकेंद्रित वृत्त", "equal circles": "बराबर वृत्त", "many chords": "कई जीवाएँ", "one big circle": "एक बड़ा वृत्त",
    "concentric": "संकेंद्रित", "equal": "बराबर", "one circle": "एक वृत्त",
    "same length": "बराबर लंबाई", "longer": "ज़्यादा लंबी", "shorter": "छोटी", "half as long": "आधी लंबी",
    "one centre": "एक केंद्र", "one radius": "एक त्रिज्या", "one chord": "एक जीवा", "one diameter": "एक व्यास",
    "no, not all": "नहीं, सभी नहीं", "yes, always": "हाँ, हमेशा", "only long ones": "सिर्फ़ लंबी", "only long": "सिर्फ़ लंबी", "none at all": "एक भी नहीं",
    "no, too long": "नहीं, बहुत लंबी", "yes, it can": "हाँ, हो सकती है", "yes, near the rim": "हाँ, घेरे के पास", "yes near rim": "हाँ, घेरे के पास",
    /* what the slot shows for a made answer, and the words the picture draws */
    "1 cm": "1 सेमी", "2 cm": "2 सेमी", "3 cm": "3 सेमी", "4 cm": "4 सेमी", "5 cm": "5 सेमी", "6 cm": "6 सेमी",
    "circumference": "परिधि", "radius": "त्रिज्या", "diameter": "व्यास", "chord": "जीवा",
    "radius+chord": "त्रिज्या+जीवा", "chord+radius": "जीवा+त्रिज्या", "radius+diameter": "त्रिज्या+व्यास",
    "diameter+radius": "व्यास+त्रिज्या", "chord+diameter": "जीवा+व्यास", "diameter+chord": "व्यास+जीवा",
    "through O": "O से होकर", "off centre": "केंद्र से हटकर",
    "cm": "सेमी", "m": "मीटर", "across": "आर-पार",
    "Circles turned": "घुमाए वृत्त", "Parts named": "नाम बताए भाग", "Chords set": "रखी जीवाएँ", "Radii laid": "रखी त्रिज्याएँ",
    "Opening": "चौड़ाई", "Chord": "जीवा",
    "3 cm all round": "चारों ओर 3 सेमी", "not every chord": "हर जीवा व्यास नहीं", "8 cm at most": "ज़्यादा से ज़्यादा 8 सेमी",
    "chord and diameter": "जीवा और व्यास", "chord only": "सिर्फ़ जीवा",
  },
  gu: {
    "Compass Bench": "પરિકરની મેજ",
    "A pair of compasses on a clean sheet. Where will the centre of your circle be?": "સાફ કાગળ પર એક પરિકર મૂક્યું છે. તમારા વર્તુળનું કેન્દ્ર ક્યાં હશે?",
    "Every circle drawn round a fixed point, every part named, and every diameter two radii long.": "દરેક વર્તુળ એક સ્થિર બિંદુની ફરતે દોરાયું. દરેક ભાગનું નામ જાણ્યું, અને દરેક વ્યાસ બે ત્રિજ્યા જેટલો છે.",
    "Free play. Any circle, any opening, rings on one centre, with the slider and the bar open.": "મુક્ત રમત. પહોળાઈ, સ્લાઇડર અને પટ્ટીથી એક કેન્દ્ર પર ઘણાં વર્તુળ દોરો.",

    "The same distance all the way round": "ચારે બાજુ એક જ અંતર",
    "Fix the point and turn the pencil round it. Is the string the same all the way?": "બિંદુ સ્થિર રાખો અને તેની ફરતે પેન્સિલ ફેરવો. શું દોરો બધે એક જ લંબાઈનો રહે છે?",
    "Does the string change length as the pencil turns?": "પેન્સિલ ફરે ત્યારે શું દોરાની લંબાઈ બદલાય છે?",
    "The point stays. Only the pencil travels, and it keeps its distance.": "બિંદુ ત્યાં જ રહે છે. ફક્ત પેન્સિલ ફરે છે, અને અંતર જળવાઈ રહે છે.",
    "Every point of a circle is the same distance from its centre, and the length of the boundary is the circumference.": "વર્તુળનું દરેક બિંદુ કેન્દ્રથી એક જ અંતરે હોય છે. સીમાની લંબાઈને પરિઘ કહેવાય.",
    "You learned: a circle keeps one distance from its centre.": "તમે શીખ્યા: વર્તુળ કેન્દ્રથી એક જ અંતર રાખે છે.",
    "Turn a circle, arm 3": "પરિકર 3 ખોલો, વર્તુળ ફેરવો",
    "Press the metal point into the paper at K. Open the arm to three centimetres and turn the pencil right round.": "ધાતુની અણીને K પર કાગળમાં દબાવો. પરિકરને 3 સેન્ટિમીટર ખોલો અને પેન્સિલને પૂરેપૂરી ફેરવો.",
    "Every point of that circle is three centimetres from K, all the way round.": "તે વર્તુળનું દરેક બિંદુ K થી 3 સેન્ટિમીટર દૂર છે, ચારે બાજુ.",
    "How wide did you open the arm from K itself?": "K થી જ માપીને પરિકર કેટલું ખોલ્યું?",
    "Name the boundary": "સીમાનું નામ જણાવો",
    "What is the length of the boundary of a circle called?": "વર્તુળની સીમાની લંબાઈ શું કહેવાય?",
    "The whole way round the outside is the circumference.": "બહારનો આખો ઘેરાવો એટલે પરિઘ.",
    "Run a finger right round the outside of your circle.": "તમારા વર્તુળની બહારની બાજુએ આખો ચક્કર આંગળી ફેરવો.",
    "Rings on one centre": "એક કેન્દ્ર પર વર્તુળો",
    "Four circles are drawn about one centre, the pencil arm opened wider each time. What are circles with one centre and different radii called?": "એક જ કેન્દ્રની આસપાસ 4 વર્તુળ દોર્યાં છે. દર વખતે પરિકર વધારે ખોલ્યું છે. એક કેન્દ્ર અને જુદી જુદી ત્રિજ્યાવાળાં વર્તુળો શું કહેવાય?",
    "Rings that share a centre are concentric circles.": "એક જ કેન્દ્રવાળાં વર્તુળો સમકેન્દ્રી વર્તુળો કહેવાય.",
    "All four were turned about the very same dot.": "ચારેય વર્તુળ એક જ બિંદુની ફરતે ફેરવ્યાં હતાં.",

    "Radius and chord": "ત્રિજ્યા અને જીવા",
    "One starts at the centre and one does not. Which is the radius?": "એક કેન્દ્રથી શરૂ થાય છે અને એક નહીં. તેમાં ત્રિજ્યા કઈ છે?",
    "Is either end at the centre?": "શું કોઈનો છેડો કેન્દ્ર પર છે?",
    "One end on the dot in the middle makes a radius.": "વચ્ચેના બિંદુ પર એક છેડો હોય, તો તે ત્રિજ્યા છે.",
    "A radius joins the centre to the circle, and every radius of one circle is the same length; a chord joins two points on the circle.": "ત્રિજ્યા કેન્દ્રને વર્તુળ સાથે જોડે છે. એક વર્તુળની દરેક ત્રિજ્યા સરખી લંબાઈની હોય છે. જીવા વર્તુળના બે બિંદુઓને જોડે છે.",
    "You learned: a radius starts at the centre, a chord does not.": "તમે શીખ્યા: ત્રિજ્યા કેન્દ્રથી શરૂ થાય, જીવા નહીં.",
    "Name OA and BC": "OA અને BC નાં નામ જણાવો",
    "Circle O has two segments drawn on it, OA and BC. Look at where each one ends, then name them both.": "વર્તુળ O માં બે રેખાખંડ દોર્યા છે, OA અને BC. જુઓ દરેક ક્યાં પૂરો થાય છે, પછી બંનેનાં નામ જણાવો.",
    "OA reaches out from O, so it is a radius. BC joins two points, so it is a chord.": "OA, O થી નીકળે છે, એટલે ત્રિજ્યા છે. BC બે બિંદુઓને જોડે છે, એટલે જીવા છે.",
    "Where does each of the two segments begin?": "બંને રેખાખંડ ક્યાંથી શરૂ થાય છે?",
    "PQ beside PR": "PQ અને PRની સરખામણી",
    "In circle P, segment PQ runs from P out to the curve, and so does segment PR. How do their lengths compare?": "વર્તુળ P માં રેખાખંડ PQ, P થી વર્તુળ સુધી જાય છે. રેખાખંડ PR પણ એમ જ જાય છે. તેમની લંબાઈ કેવી છે?",
    "PQ is a radius, and every radius of one circle runs out just as far.": "PQ ત્રિજ્યા છે, અને એક વર્તુળની દરેક ત્રિજ્યા એટલી જ દૂર જાય છે.",
    "Measure PQ, then measure PR. Do they stop in the same place?": "PQ માપો, પછી PR માપો. શું બંને એક જ જગ્યાએ અટકે છે?",
    "Only one of these": "આમાંથી ફક્ત એક",
    "A circle has many radii, many chords and many diameters. Which part is there only one of?": "એક વર્તુળમાં ઘણી ત્રિજ્યાઓ, ઘણી જીવાઓ અને ઘણા વ્યાસ હોય છે. કયો ભાગ ફક્ત એક જ હોય છે?",
    "Draw as many parts as you like; they all turn about that single dot.": "તમને ગમે તેટલા ભાગ દોરો. બધા એ જ એક બિંદુની ફરતે ફરે છે.",
    "Every radius you draw has to start from the very same dot.": "તમે જે ત્રિજ્યા દોરો તે એ જ બિંદુથી શરૂ થાય છે.",

    "The chord through the centre": "કેન્દ્રમાંથી પસાર થતી જીવા",
    "Slide the chord across. Where is it longest? What is it called there?": "જીવાને સરકાવો. તે ક્યાં સૌથી લાંબી છે? ત્યાં તેને શું કહેવાય?",
    "Where is its length greatest as it slides?": "સરકતી વખતે તેની લંબાઈ ક્યાં સૌથી વધુ છે?",
    "Move it one step at a time and watch for the light.": "તેને એક એક પગલે સરકાવો અને પ્રકાશ પર નજર રાખો.",
    "A chord through the centre is a diameter and the longest chord. Every diameter is a chord, but not every chord is a diameter.": "કેન્દ્રમાંથી પસાર થતી જીવા વ્યાસ છે, અને તે સૌથી લાંબી જીવા છે. દરેક વ્યાસ જીવા છે, પણ દરેક જીવા વ્યાસ નથી.",
    "You learned: a chord through the centre is a diameter.": "તમે શીખ્યા: કેન્દ્રમાંથી પસાર થતી જીવા વ્યાસ છે.",
    "Stop DE where it is longest": "DE સૌથી લાંબી, ત્યાં રોકો",
    "Chord FG lies near the rim. Slide chord DE across the circle and stop it where it is longest.": "જીવા FG કિનારા પાસે છે. જીવા DE ને વર્તુળમાં સરકાવો. જ્યાં તે સૌથી લાંબી હોય, ત્યાં રોકો.",
    "DE crosses O, so DE is a diameter, and it is longer than FG.": "DE, O માંથી પસાર થાય છે, એટલે DE વ્યાસ છે. અને તે FG કરતાં લાંબી છે.",
    "Watch the number in the box as you slide it further.": "આગળ સરકાવતી વખતે ખાનામાંની સંખ્યા જુઓ.",
    "Is every chord a diameter?": "શું દરેક જીવા વ્યાસ છે?",
    "Every diameter is a chord. Is every chord a diameter?": "દરેક વ્યાસ એક જીવા છે. શું દરેક જીવા એક વ્યાસ છે?",
    "Only the ones that cross the middle. The rest are chords and nothing more.": "ફક્ત તે જ જે વચ્ચેથી પસાર થાય. બાકીની ફક્ત જીવાઓ છે, બીજું કંઈ નહીં.",
    "Think of a short chord up near the rim. Does it reach O?": "કિનારા પાસેની એક નાની જીવાનો વિચાર કરો. શું તે O સુધી પહોંચે છે?",
    "A chord of 10 cm?": "10 સેમીની જીવા?",
    "In a circle, the diameter is eight centimetres. Could a chord of that circle be ten centimetres long?": "એક વર્તુળનો વ્યાસ 8 સેન્ટિમીટર છે. શું તે વર્તુળની કોઈ જીવા 10 સેન્ટિમીટર લાંબી હોઈ શકે?",
    "Nothing in the circle beats the one through the middle.": "વર્તુળમાં વચ્ચેથી પસાર થતી જીવાથી લાંબી કોઈ જીવા નથી.",
    "Slide the chord everywhere and watch the greatest it reaches.": "જીવાને બધે સરકાવો અને જુઓ તે સૌથી વધુ કેટલી લાંબી થાય છે.",

    "Two radii make a diameter": "બે ત્રિજ્યાથી એક વ્યાસ",
    "Lay two radii end to end through the centre. What have you made?": "બે ત્રિજ્યાને કેન્દ્રમાંથી છેડે છેડો મેળવીને મૂકો. તમે શું બનાવ્યું?",
    "How many radii fit across the circle through the centre?": "કેન્દ્રમાંથી વર્તુળની આરપાર કેટલી ત્રિજ્યા સમાય?",
    "Across the circle is two radii. One radius is half of it.": "આરપાર બે ત્રિજ્યા છે. એક ત્રિજ્યા તેની અડધી છે.",
    "The diameter is twice the radius, and the radius is half the diameter.": "વ્યાસ ત્રિજ્યાનો બમણો હોય છે, અને ત્રિજ્યા વ્યાસની અડધી હોય છે.",
    "You learned: a diameter is two radii, so it is twice the radius.": "તમે શીખ્યા: વ્યાસ બે ત્રિજ્યા જેટલો છે, એટલે બમણો.",
    "Diameter in cm": "સેમીમાં વ્યાસ",
    "A circle has a radius of six centimetres. How long is its diameter?": "એક વર્તુળની ત્રિજ્યા 6 સેન્ટિમીટર છે. તેનો વ્યાસ કેટલો લાંબો છે?",
    "Six out one way and six out the other, right across.": "એક બાજુ 6 અને બીજી બાજુ 6, આખી આરપાર.",
    "Lay a second six beside the first, through the middle.": "પહેલીની બાજુમાં 6 સેન્ટિમીટરની બીજી ત્રિજ્યા મૂકો, વચ્ચેથી.",
    "Radius in cm": "સેમીમાં ત્રિજ્યા",
    "A round clock face has a diameter of twenty-eight centimetres. What is its radius?": "ઘડિયાળના ગોળ ચહેરાનો વ્યાસ 28 સેન્ટિમીટર છે. તેની ત્રિજ્યા કેટલી છે?",
    "Fold the whole way across at the centre and each piece reaches the rim.": "આખા વ્યાસને કેન્દ્ર પર વાળો. દરેક ટુકડો કિનારા સુધી પહોંચે છે.",
    "The diameter folds into two equal pieces at the centre dot.": "વ્યાસ કેન્દ્ર બિંદુ પર બે સરખા ટુકડામાં વળે છે.",
    "Diameter in m": "મીટરમાં વ્યાસ",
    "A round pond has a radius of thirty-five metres. What is its diameter?": "એક ગોળ તળાવની ત્રિજ્યા 35 મીટર છે. તેનો વ્યાસ કેટલો છે?",
    "Two radii end to end walk the pond from bank to bank.": "બે ત્રિજ્યા છેડે છેડો મેળવીને મૂકો. તે તળાવના એક કાંઠેથી બીજા કાંઠે પહોંચે છે.",
    "One radius reaches the bank. A second one reaches the far bank.": "એક ત્રિજ્યા કાંઠા સુધી પહોંચે છે. બીજી ત્રિજ્યા સામેના કાંઠા સુધી પહોંચે છે.",

    "concentric circles": "સમકેન્દ્રી વર્તુળ", "equal circles": "સરખાં વર્તુળ", "many chords": "ઘણી જીવા", "one big circle": "એક મોટું વર્તુળ",
    "concentric": "સમકેન્દ્રી", "equal": "સરખાં", "one circle": "એક વર્તુળ",
    "same length": "સરખી લંબાઈ", "longer": "વધુ લાંબી", "shorter": "ટૂંકી", "half as long": "અડધી લાંબી",
    "one centre": "એક કેન્દ્ર", "one radius": "એક ત્રિજ્યા", "one chord": "એક જીવા", "one diameter": "એક વ્યાસ",
    "no, not all": "ના, બધી નહીં", "yes, always": "હા, હંમેશાં", "only long ones": "ફક્ત લાંબી", "only long": "ફક્ત લાંબી", "none at all": "એકેય નહીં",
    "no, too long": "ના, બહુ લાંબી", "yes, it can": "હા, બની શકે", "yes, near the rim": "હા, કિનારા પાસે", "yes near rim": "હા, કિનારા પાસે",
    "1 cm": "1 સેમી", "2 cm": "2 સેમી", "3 cm": "3 સેમી", "4 cm": "4 સેમી", "5 cm": "5 સેમી", "6 cm": "6 સેમી",
    "circumference": "પરિઘ", "radius": "ત્રિજ્યા", "diameter": "વ્યાસ", "chord": "જીવા",
    "radius+chord": "ત્રિજ્યા+જીવા", "chord+radius": "જીવા+ત્રિજ્યા", "radius+diameter": "ત્રિજ્યા+વ્યાસ",
    "diameter+radius": "વ્યાસ+ત્રિજ્યા", "chord+diameter": "જીવા+વ્યાસ", "diameter+chord": "વ્યાસ+જીવા",
    "through O": "O માંથી", "off centre": "કેન્દ્રથી દૂર",
    "cm": "સેમી", "m": "મીટર", "across": "આરપાર",
    "Circles turned": "ફેરવેલાં વર્તુળ", "Parts named": "નામ આપેલા ભાગ", "Chords set": "મૂકેલી જીવા", "Radii laid": "મૂકેલી ત્રિજ્યા",
    "Opening": "પહોળાઈ", "Chord": "જીવા",
    "3 cm all round": "ચારે બાજુ 3 સેમી", "not every chord": "દરેક જીવા વ્યાસ નથી", "8 cm at most": "વધુમાં વધુ 8 સેમી",
    "chord and diameter": "જીવા અને વ્યાસ", "chord only": "ફક્ત જીવા",
  },
};

/* One entry per phase = one mount. */
const PHASES = [
  {
    n: 1,
    concept: "The same distance all the way round",
    conceptId: "M2.S3.T6.C20", objectiveIds: ["O9"],
    says: ["Fix the point and turn the pencil round it. Is the string the same all the way?"],
    ladder: ["Does the string change length as the pencil turns?", "The point stays. Only the pencil travels, and it keeps its distance."],
    closing: "Every point of a circle is the same distance from its centre, and the length of the boundary is the circumference.",
    learned: "You learned: a circle keeps one distance from its centre.",
    traceback: "The circle is drawn at the child's opening with a ruler laid across it, then the string is held at three centimetres all the way round and that circle closes.",
    items: [
      /* learn ML1: answer in the plan = Three centimetres; K is the centre. The child draws it: the
         string reads three all the way round, and the win line says so. */
      { qid: "M2.S3.T6.C20:ML1", kind: "draw", pad: "enter", want: 3, answer: "3 cm", near: "6 cm", winMs: 3200,
        ask: "Turn a circle, arm 3",
        say: "Press the metal point into the paper at K. Open the arm to three centimetres and turn the pencil right round.",
        win: "Every point of that circle is three centimetres from K, all the way round.",
        miss: "How wide did you open the arm from K itself?" },
      /* practice 1: answer in the plan = Its circumference. The name tag goes on the boundary. */
      { qid: "M2.S3.T6.C20:1", kind: "name", pad: "enter", spots: ["rim"], tags: ["circumference", "radius", "diameter"],
        answer: "circumference", near: "diameter", winMs: 3000, part: "boundary",
        ask: "Name the boundary",
        say: "What is the length of the boundary of a circle called?",
        win: "The whole way round the outside is the circumference.",
        miss: "Run a finger right round the outside of your circle." },
      /* practice 2: answer in the plan = Concentric circles */
      { qid: "M2.S3.T6.C20:2", kind: "word", fact: "rings", answer: "concentric", near: "equal", winMs: 3000,
        choices: [{ id: "concentric", label: "concentric circles" }, { id: "equal", label: "equal circles" },
          { id: "many chords", label: "many chords" }, { id: "one circle", label: "one big circle" }],
        ask: "Rings on one centre",
        say: "Four circles are drawn about one centre, the pencil arm opened wider each time. What are circles with one centre and different radii called?",
        win: "Rings that share a centre are concentric circles.",
        miss: "All four were turned about the very same dot." },
    ],
  },
  {
    n: 2,
    concept: "Radius and chord",
    conceptId: "M2.S3.T6.C21", objectiveIds: ["O9"],
    says: ["One starts at the centre and one does not. Which is the radius?"],
    ladder: ["Is either end at the centre?", "One end on the dot in the middle makes a radius."],
    closing: "A radius joins the centre to the circle, and every radius of one circle is the same length; a chord joins two points on the circle.",
    learned: "You learned: a radius starts at the centre, a chord does not.",
    traceback: "Both ends of the child's segment light on the curve with neither at the centre, the tray writes chord under it, and a true radius is drawn from the centre dot beside it.",
    items: [
      /* learn ML2: answer in the plan = OA is a radius, and BC is a chord */
      { qid: "M2.S3.T6.C21:ML2", kind: "name", pad: "enter", spots: ["OA", "BC"], tags: ["radius", "chord", "diameter"],
        answer: "radius+chord", near: "chord+radius", winMs: 3200, ends: ["mid-rim", "rim-rim"],
        ask: "Name OA and BC",
        say: "Circle O has two segments drawn on it, OA and BC. Look at where each one ends, then name them both.",
        win: "OA reaches out from O, so it is a radius. BC joins two points, so it is a chord.",
        miss: "Where does each of the two segments begin?" },
      /* practice 3: answer in the plan = PQ is a radius, and it is the same length as PR, because every
         radius of one circle is equal. Asked here as the comparison; the win names PQ. */
      { qid: "M2.S3.T6.C21:3", kind: "word", fact: "compare", answer: "same length", near: "longer", winMs: 3200,
        choices: [{ id: "same length", label: "same length" }, { id: "longer", label: "longer" },
          { id: "shorter", label: "shorter" }, { id: "half as long", label: "half as long" }],
        ask: "PQ beside PR",
        say: "In circle P, segment PQ runs from P out to the curve, and so does segment PR. How do their lengths compare?",
        win: "PQ is a radius, and every radius of one circle runs out just as far.",
        miss: "Measure PQ, then measure PR. Do they stop in the same place?" },
      /* practice 4: answer in the plan = Many radii, chords and diameters, and only one centre */
      { qid: "M2.S3.T6.C21:4", kind: "word", fact: "onlyOne", answer: "one centre", near: "one radius", winMs: 3000,
        choices: [{ id: "one centre", label: "one centre" }, { id: "one radius", label: "one radius" },
          { id: "one chord", label: "one chord" }, { id: "one diameter", label: "one diameter" }],
        ask: "Only one of these",
        say: "A circle has many radii, many chords and many diameters. Which part is there only one of?",
        win: "Draw as many parts as you like; they all turn about that single dot.",
        miss: "Every radius you draw has to start from the very same dot." },
    ],
  },
  {
    n: 3,
    concept: "The chord through the centre",
    conceptId: "M2.S3.T6.C22", objectiveIds: ["O10"],
    says: ["Slide the chord across. Where is it longest? What is it called there?"],
    ladder: ["Where is its length greatest as it slides?", "Move it one step at a time and watch for the light."],
    closing: "A chord through the centre is a diameter and the longest chord. Every diameter is a chord, but not every chord is a diameter.",
    learned: "You learned: a chord through the centre is a diameter.",
    traceback: "The child's chord is held where it is, slid the last step until it crosses the centre dot, and its length climbs to its greatest there.",
    items: [
      /* learn ML3: answer in the plan = DE is a diameter, and it is longer than FG. The slider makes it. */
      { qid: "M2.S3.T6.C22:ML3", kind: "slide", pad: "enter", answer: "through O", near: "off centre", winMs: 3200,
        ask: "Stop DE where it is longest",
        say: "Chord FG lies near the rim. Slide chord DE across the circle and stop it where it is longest.",
        win: "DE crosses O, so DE is a diameter, and it is longer than FG.",
        miss: "Watch the number in the box as you slide it further." },
      /* practice 5: answer in the plan = Every diameter is a chord. But not every chord is a diameter;
         only a chord through the centre is. The first half is stated, the second half asked. */
      { qid: "M2.S3.T6.C22:5", kind: "word", fact: "allChords", answer: "no, not all", near: "yes, always", winMs: 3200,
        choices: [{ id: "no, not all", label: "no, not all" }, { id: "yes, always", label: "yes, always" },
          { id: "only long", label: "only long ones" }, { id: "none at all", label: "none at all" }],
        ask: "Is every chord a diameter?",
        say: "Every diameter is a chord. Is every chord a diameter?",
        win: "Only the ones that cross the middle. The rest are chords and nothing more.",
        miss: "Think of a short chord up near the rim. Does it reach O?" },
      /* practice 6: answer in the plan = No. The diameter is the longest chord */
      { qid: "M2.S3.T6.C22:6", kind: "word", fact: "tenLong", most: 8, tryFor: 10, answer: "no, too long", near: "yes, it can", winMs: 3200,
        choices: [{ id: "no, too long", label: "no, too long" }, { id: "yes, it can", label: "yes, it can" },
          { id: "yes near rim", label: "yes, near the rim" }],
        ask: "A chord of 10 cm?",
        say: "In a circle, the diameter is eight centimetres. Could a chord of that circle be ten centimetres long?",
        win: "Nothing in the circle beats the one through the middle.",
        miss: "Slide the chord everywhere and watch the greatest it reaches." },
    ],
  },
  {
    n: 4,
    concept: "Two radii make a diameter",
    conceptId: "M2.S3.T6.C23", objectiveIds: ["O10"],
    says: ["Lay two radii end to end through the centre. What have you made?"],
    ladder: ["How many radii fit across the circle through the centre?", "Across the circle is two radii. One radius is half of it."],
    closing: "The diameter is twice the radius, and the radius is half the diameter.",
    learned: "You learned: a diameter is two radii, so it is twice the radius.",
    traceback: "A second radius is laid end to end with the first through the centre, the pair reaches from curve to curve, and the whole way across is written under it.",
    items: [
      /* learn ML4: answer in the plan = Twelve centimetres */
      { qid: "M2.S3.T6.C23:ML4", kind: "length", given: "radius", v: 6, unit: "cm", answer: 12, near: 3, winMs: 3200,
        ask: "Diameter in cm",
        say: "A circle has a radius of six centimetres. How long is its diameter?",
        win: "Six out one way and six out the other, right across.",
        miss: "Lay a second six beside the first, through the middle." },
      /* practice 7: answer in the plan = Fourteen centimetres, half of twenty-eight */
      { qid: "M2.S3.T6.C23:7", kind: "length", given: "diameter", v: 28, unit: "cm", answer: 14, near: 56, winMs: 3200,
        ask: "Radius in cm",
        say: "A round clock face has a diameter of twenty-eight centimetres. What is its radius?",
        win: "Fold the whole way across at the centre and each piece reaches the rim.",
        miss: "The diameter folds into two equal pieces at the centre dot." },
      /* practice 8: answer in the plan = Seventy metres, because the diameter is two radii end to end */
      { qid: "M2.S3.T6.C23:8", kind: "length", given: "radius", v: 35, unit: "m", answer: 70, near: 17, winMs: 3200,
        ask: "Diameter in m",
        say: "A round pond has a radius of thirty-five metres. What is its diameter?",
        win: "Two radii end to end walk the pond from bank to bank.",
        miss: "One radius reaches the bank. A second one reaches the far bank." },
    ],
  },
];

/* ── the bench: one sheet of paper, one pair of compasses, one circle ───────────────────── */
const CM = 34;    /* phase 1: the compass opens by whole centimetres, this many units each */
const PC = 37.5;  /* phases 2 and 3: the standing circle is drawn this many units to a centimetre */
const SHEET = { x: 0, y: 12, w: 640, h: 470 };
const KX = 300, KY = 262;                            /* the centre dot on the sheet */
const RAIL = { x: 652, y: 131, w: 40, h: 262 };      /* the chord slider's rail */
const TRAY = { x: 706, y: 12, w: 380 };              /* the parts tray, and the readings under it */
const BAR = { x: 740, y: 300, w: 180, h: 76 };       /* the spare radius bar, before it is laid */
const D2R = Math.PI / 180;
const onRim = (r: number, a: number) => ({ x: KX + r * Math.cos(a * D2R), y: KY + r * Math.sin(a * D2R) });
const arcOf = (r: number, a0: number, turned: number) => {
  const t = Math.max(-359.5, Math.min(359.5, turned));
  const p0 = onRim(r, a0), p1 = onRim(r, a0 + t);
  return `M${p0.x.toFixed(1)},${p0.y.toFixed(1)} A${r},${r} 0 ${Math.abs(t) > 180 ? 1 : 0} ${t >= 0 ? 1 : 0} ${p1.x.toFixed(1)},${p1.y.toFixed(1)}`;
};
const tagBox = (k: number) => ({ x: TRAY.x + 6, y: TRAY.y + 48 + k * 86, w: 368, h: 76 });
const chordHalf = (r: number, d: number) => Math.sqrt(Math.max(0, r * r - d * d));
const tidy = (x: number) => (Math.abs(x - Math.round(x)) < 0.05 ? String(Math.round(x)) : x.toFixed(1));

/* The numbers, rows, sizes and targets the working area needs (they go into the sidecar too). */
const MODEL = {
  cm: CM, pc: PC, sheet: SHEET, centre: { x: KX, y: KY }, rail: RAIL, tray: TRAY, bar: BAR,
  arm: { min: 1, max: 6, start: 2, target: 3, wider: 5 },
  ring: 4,                                           /* the circle of phases 2 and 3, in centimetres */
  chord: { step: 0.5, span: 3.5, start: 3 },
  pts: { A: -55, B: 150, C: 65, Q: -40, R: 190 },
  span: 150,                                         /* the drawn radius of phase 4, whatever it measures */
};

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* judge: is this value right for this item? (numbers compare as numbers) */
const judge = (item: any, v: any) => {
  if (typeof item.answer === "number") return leadNumber(v) === item.answer;
  return String(v).trim().toLowerCase() === String(item.answer).trim().toLowerCase();
};

/* oracle: a circle rebuilt point by point from a string held tight at one dot, and every answer read
   off that point set through the book's definitions. It shares no code with judge or with Work. */
const oracle = () => {
  const N = 720, R = 4, pts: any[] = [];
  for (let k = 0; k < N; k++) pts.push([R * Math.cos((k * 2 * Math.PI) / N), R * Math.sin((k * 2 * Math.PI) / N)]);
  const dot = [0, 0];
  const gap = (a: any, b: any) => Math.sqrt((a[0] - b[0]) * (a[0] - b[0]) + (a[1] - b[1]) * (a[1] - b[1]));
  const near = (a: number, b: number) => Math.abs(a - b) < 1e-6;
  /* every point the string reaches is the same distance from the dot it is held at */
  if (!pts.every((p) => near(gap(dot, p), R))) return false;
  const fromOne = pts.map((p) => gap(pts[0], p));
  const longest = Math.max.apply(null, fromOne);
  if (!near(longest, gap(pts[0], pts[N / 2]))) return false;   /* the longest one crosses the dot */
  /* the names, from where a segment's two ends lie */
  const nameOf = (ends: string, viaDot: boolean) =>
    ends === "mid-rim" ? "radius" : ends === "rim-rim" ? (viaDot ? "diameter" : "chord") : ends === "boundary" ? "circumference" : "";
  /* how many of each one circle holds */
  const many: any = { centre: 1, radius: N, chord: (N * (N - 1)) / 2, diameter: N / 2 };
  const only = Object.keys(many).filter((k) => many[k] === 1);
  const want = (it: any) => {
    if (it.kind === "draw") return it.want + " cm";                        /* the string's own length */
    if (it.kind === "slide") {
      let best = -1, at = 9;
      for (let d = 0; d <= 35; d++) { const len = 2 * Math.sqrt(R * R - (d / 10) * (d / 10)); if (len > best) { best = len; at = d; } }
      return at === 0 ? "through O" : "off centre";                        /* longest where it crosses the dot */
    }
    if (it.kind === "name") {
      if (it.part === "boundary") return nameOf("boundary", false);
      return (it.ends || []).map((e: string) => nameOf(e, false)).join("+");
    }
    if (it.kind === "length") {
      const across = gap(pts[0], pts[N / 2]);                              /* two radii, end to end */
      return it.given === "radius" ? Math.round(it.v * (across / R)) : Math.round(it.v * (R / across));
    }
    if (it.fact === "rings") return "concentric";                          /* one dot, different strings */
    if (it.fact === "compare") return near(gap(dot, pts[110]), gap(dot, pts[400])) ? "same length" : "longer";
    if (it.fact === "onlyOne") return "one " + only[0];
    if (it.fact === "allChords") return fromOne.every((d) => near(d, longest)) ? "yes, always" : "no, not all";
    if (it.fact === "tenLong") return it.tryFor > longest * (it.most / (2 * R)) ? "no, too long" : "yes, it can";
    return null;
  };
  return PHASES.every((p: any) => p.items.every((it: any) => String(want(it)) === String(it.answer)));
};

/* the most likely wrong answer (the misconception); judge must reject it */
const nearMiss = (item: any) => item.near;
/* the forms of an answer that no question, hint or ladder line may print (a drawing prints none) */
const answerForms = (item: any) => (item.pad === "enter" ? []
  : typeof item.answer === "number" ? [String(item.answer), indian(item.answer), words(item.answer)]
  : [String(item.answer)]);
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => item.answer;

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => T.submit(item.answer);
/* the agent's answer() for an item made on the working area: set it as a child would; undefined = type it */
const answer = (item: any, v: any) => (item.pad === "enter" && HOOK.set ? HOOK.set(v) : undefined);
/* the agent's check() before Enter: nothing waits here, so Enter is pressed as a child presses it */
const check = () => undefined;

/* ── the working area: 1086 x 528, origin at its top-left ──────────────────────────────── */
function Work({ phase, n, item, index, stage, wrong, typed, api, MODEL, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();
  const free = stage === "free";
  const done = stage === "win" || stage === "idle";
  const setupOf = (ph: number, k: number) => {
    if (ph === 1) return { arm: k === 0 ? MODEL.arm.start : MODEL.arm.target, fixed: k > 0, rings: k > 0 ? [MODEL.arm.target] : [], tags: {}, d: 0, lit: {}, laid: false };
    if (ph === 2) return { arm: MODEL.ring, fixed: true, rings: [], tags: {}, d: 0, lit: {}, laid: false };
    if (ph === 3) return { arm: MODEL.ring, fixed: true, rings: [], tags: {}, d: MODEL.chord.start, touched: false, lit: {}, laid: false };
    if (ph === 4) return { arm: MODEL.ring, fixed: true, rings: [], tags: {}, d: 0, lit: {}, laid: false };
    return { arm: MODEL.arm.target, fixed: true, rings: [MODEL.arm.target], tags: {}, d: MODEL.chord.start, touched: false, lit: {}, laid: false };
  };
  const doneOf = (ph: number, k: number) => {
    if (ph === 1) return k === 0 ? { fixed: true, arm: MODEL.arm.target, rings: [MODEL.arm.target] }
      : k === 1 ? { tags: { rim: "circumference" } } : { fixed: true, arm: MODEL.arm.wider, rings: [MODEL.arm.target, MODEL.arm.wider] };
    if (ph === 2) return k === 0 ? { tags: { OA: "radius", BC: "chord" } } : k === 1 ? { lit: { PQ: true, PR: true } } : {};
    if (ph === 3) return { d: 0, touched: true };
    return { laid: true };
  };
  /* the circle the tags are laid on: phase 1 names the one the child drew, later phases the standing one */
  const rimOf = (b: any) => b.n === 1 ? (b.st.rings.length ? b.st.rings[b.st.rings.length - 1] : b.st.arm) * CM : MODEL.ring * PC;
  const [st, setSt] = useState<any>(() => setupOf(free ? 0 : n, index));
  const [demo, setDemo] = useState<any>(null);
  const [live, setLive] = useState<any>(null);
  const [tally, setTally] = useState(0);
  const turn = useRef<any>(null);
  const judgedKey = useRef<any>(null);   /* the work on the sheet this question was last judged on */
  const walk = useRef(-1);               /* the way a tap steps the chord; it turns at the ends of the rail */
  const box = useRef<any>({});
  box.current = { n, index, item, stage, st, free, done };

  /* a fresh bench for each question, and one for free play */
  useEffect(() => { setSt(setupOf(free ? 0 : n, index)); setLive(null); setDemo(null); turn.current = null; judgedKey.current = null; walk.current = -1; }, [n, index, free]);
  useEffect(() => { setTally(0); }, [n]);
  /* the child's right answer, drawn whole */
  useEffect(() => { if (done && !free) setSt((s: any) => ({ ...s, ...doneOf(n, index) })); }, [stage]);

  /* any act of the child's puts the correction away and gives the pad back */
  const wake = () => { if (tl.busy) { tl.stop(); api.lock(false); } setDemo(null); };
  const score = () => setTally((t: number) => t + 1);

  /* ── the pieces the child moves ──────────────────────────────────────────────────── */
  const drop = (pay: any, p: any, moved: boolean) => {
    const b = box.current;
    wake();
    if (pay.id === "pencil") {
      const t = turn.current;
      turn.current = null;
      if (!moved) { sweepRound(b.st.arm); return; }
      setLive(null);
      if (t && !t.closed) setSt((s: any) => ({ ...s, arm: t.r }));
      return;
    }
    if (pay.id === "chord") {
      if (!moved) stepChord(walk.current); else setSt((s: any) => ({ ...s, touched: true }));
      return;
    }
    if (pay.id === "tag") {
      const spots = b.item.spots || [];
      let at: string | null = null;
      if (!moved) at = spots.find((s: string) => !b.st.tags[s]) || spots[0];
      else if (spots[0] === "rim") { if (Math.abs(Math.hypot(p.x - KX, p.y - KY) - rimOf(b)) < 80) at = "rim"; }
      else {
        let best = 120;
        for (const s of spots) { const m = spotMid(s); const d = Math.hypot(p.x - m.x, p.y - m.y); if (d < best) { best = d; at = s; } }
      }
      if (!at) return;
      api.sfx.tick();
      setSt((s: any) => {
        const tags: any = {};
        for (const k of Object.keys(s.tags)) if (s.tags[k] !== pay.name && k !== at) tags[k] = s.tags[k];
        tags[at as string] = pay.name;
        return { ...s, tags };
      });
      score();
      return;
    }
    if (pay.id === "bar") {
      if (moved && p.x > SHEET.x + SHEET.w) return;
      api.sfx.tick();
      setSt((s: any) => ({ ...s, laid: true }));
      score();
    }
  };
  const stepChord = (dir: number) => {
    const span = MODEL.chord.span, step = MODEL.chord.step;
    setSt((s: any) => {
      let d = s.d + dir * step;
      if (Math.abs(d) > span + 1e-9) { walk.current = -dir; d = s.d - dir * step; }
      d = Math.round(d * 2) / 2;
      if (d === 0) api.sfx.tick();
      return { ...s, d, touched: true };
    });
  };
  const drag = useDrag(drop);
  const dp = drag.drag;
  const dx = dp ? Math.round(dp.x) : null, dy = dp ? Math.round(dp.y) : null;

  /* the pencil turning: the opening is free until the turn begins, then the string holds its length */
  useEffect(() => {
    const b = box.current;
    if (dx === null || dy === null || !dp) { turn.current = null; return; }
    if (tl.busy) return;
    if (dp.payload.id === "chord") {
      const span = MODEL.chord.span, step = MODEL.chord.step;
      const raw = (dy - KY) / PC;
      const d = Math.max(-span, Math.min(span, Math.round(raw / step) * step));
      if (d !== b.st.d) { if (d === 0) api.sfx.tick(); setSt((s: any) => ({ ...s, d, touched: true })); }
      return;
    }
    if (dp.payload.id !== "pencil") return;
    const a = Math.atan2(dy - KY, dx - KX) / D2R, far = Math.hypot(dx - KX, dy - KY);
    let t = turn.current;
    if (!t) { t = turn.current = { a0: a, last: a, turned: 0, r: b.st.arm, closed: false }; }
    let step = a - t.last;
    while (step > 180) step -= 360;
    while (step < -180) step += 360;
    t.last = a;
    t.turned += step;
    if (Math.abs(t.turned) < 30) t.r = Math.max(MODEL.arm.min, Math.min(MODEL.arm.max, Math.round(far / CM)));
    if (!t.closed && Math.abs(t.turned) >= 360) {
      t.closed = true;
      api.sfx.tick();
      setSt((s: any) => ({ ...s, arm: t.r, rings: s.rings.filter((x: number) => x !== t.r).concat([t.r]) }));
      score();
    }
    setLive({ a0: t.a0, a, turned: t.turned, r: t.r });
  }, [dx, dy]);

  /* a tap (or Enter) on the pencil turns it right round at the opening it stands at */
  const sweepRound = (r: number) => {
    const steps: any[] = [];
    for (let k = 1; k <= 12; k++) steps.push([50, () => setLive({ a0: -90, a: -90 + k * 30, turned: k * 30, r })]);
    steps.push([120, () => {
      api.sfx.tick();
      setSt((s: any) => ({ ...s, arm: r, rings: s.rings.filter((x: number) => x !== r).concat([r]) }));
      setLive(null);
      score();
    }]);
    setLive({ a0: -90, a: -90, turned: 0, r });
    tl.run(steps);
  };

  /* ── what the child has made, and how the agent makes it ─────────────────────────── */
  const spotMid = (s: string) => {
    const R = MODEL.ring * PC;
    if (s === "OA") { const p = onRim(R, MODEL.pts.A); return { x: (KX + p.x) / 2, y: (KY + p.y) / 2 }; }
    if (s === "BC") { const b = onRim(R, MODEL.pts.B), c = onRim(R, MODEL.pts.C); return { x: (b.x + c.x) / 2, y: (b.y + c.y) / 2 }; }
    return { x: KX, y: KY - R };
  };
  const valueOf = () => {
    const b = box.current, s = b.st;
    if (b.item.kind === "draw") return s.rings.length ? s.rings[s.rings.length - 1] + " cm" : "";
    if (b.item.kind === "name") {
      const got = (b.item.spots || []).map((k: string) => s.tags[k]);
      return got.every(Boolean) ? got.join("+") : "";
    }
    if (b.item.kind === "slide") return !s.touched ? "" : s.d === 0 ? "through O" : "off centre";
    return "";
  };
  const workKey = () => {
    const b = box.current, s = b.st;
    if (b.item.kind === "draw") return s.rings.join(",");
    if (b.item.kind === "name") return (b.item.spots || []).map((k: string) => s.tags[k] || "").join("|");
    if (b.item.kind === "slide") return s.touched ? String(s.d) : "";
    return "";
  };
  const answerWaiting = () => {
    const b = box.current;
    if (b.free || b.stage !== "ask" || b.item.pad !== "enter" || tl.busy) return false;
    return valueOf() !== "" && workKey() !== judgedKey.current;
  };
  const sendWork = () => { judgedKey.current = workKey(); api.submit(valueOf()); };
  api.onEnter(item.pad === "enter" && stage === "ask" ? () => { if (answerWaiting()) sendWork(); } : null);
  /* A focused piece (the pencil, the chord handle) takes Enter itself and stops it, so Enter from the
     keyboard never reached the answer: a keyboard child could turn or step for ever and never answer.
     While an answer is waiting, Enter is taken here, before the piece sees it, and sent. */
  const onKeyCapture = (e: any) => {
    if (e.key !== "Enter" || !answerWaiting()) return;
    e.preventDefault(); e.stopPropagation();
    sendWork();
  };
  /* arrow keys: the pencil opens and closes, the chord moves up and down (Space and Enter still act) */
  const withArrows = (payload: any, onArrow: (dir: number) => void) => {
    const base = drag.keys(payload);
    return { onKeyDown: (e: any) => {
      const dir = e.key === "ArrowUp" || e.key === "ArrowRight" ? 1 : e.key === "ArrowDown" || e.key === "ArrowLeft" ? -1 : 0;
      if (dir) { e.preventDefault(); e.stopPropagation(); wake(); onArrow(dir); return; }
      base.onKeyDown(e);
    } };
  };
  HOOK.set = (v: any) => {
    const b = box.current;
    if (String(v).trim().toLowerCase() !== String(b.item.answer).trim().toLowerCase()) return false;
    judgedKey.current = null;
    setDemo(null);
    setSt((s: any) => ({ ...s, ...doneOf(b.n, b.index) }));
    return true;
  };

  /* the traceback: the maths redrawn, ending on the whole right answer, nothing marked */
  useEffect(() => {
    if (!wrong || stage !== "ask") return;
    judgedKey.current = workKey();
    api.lock(true);
    setDemo({ k: 0, v: wrong.value });
    tl.run([[900, () => setDemo({ k: 1, v: wrong.value })], [900, () => setDemo({ k: 2, v: wrong.value })], [500, () => {}]],
      () => api.lock(false));
  }, [wrong]);

  /* the win line, in the tool's own words: one literal call per question, so its Hindi and Gujarati clips
     can be baked (`voice` reads literal api.say calls only); each line is the item's own `win` */
  const sayWin = () => {
    switch (item.qid) {
      case "M2.S3.T6.C20:ML1": api.say("Every point of that circle is three centimetres from K, all the way round."); break;
      case "M2.S3.T6.C20:1": api.say("The whole way round the outside is the circumference."); break;
      case "M2.S3.T6.C20:2": api.say("Rings that share a centre are concentric circles."); break;
      case "M2.S3.T6.C21:ML2": api.say("OA reaches out from O, so it is a radius. BC joins two points, so it is a chord."); break;
      case "M2.S3.T6.C21:3": api.say("PQ is a radius, and every radius of one circle runs out just as far."); break;
      case "M2.S3.T6.C21:4": api.say("Draw as many parts as you like; they all turn about that single dot."); break;
      case "M2.S3.T6.C22:ML3": api.say("DE crosses O, so DE is a diameter, and it is longer than FG."); break;
      case "M2.S3.T6.C22:5": api.say("Only the ones that cross the middle. The rest are chords and nothing more."); break;
      case "M2.S3.T6.C22:6": api.say("Nothing in the circle beats the one through the middle."); break;
      case "M2.S3.T6.C23:ML4": api.say("Six out one way and six out the other, right across."); break;
      case "M2.S3.T6.C23:7": api.say("Fold the whole way across at the centre and each piece reaches the rim."); break;
      case "M2.S3.T6.C23:8": api.say("Two radii end to end walk the pond from bank to bank."); break;
      default: api.say(item.win);
    }
  };
  useEffect(() => { if (stage === "win" && item.win) sayWin(); }, [stage, index]);

  /* what the host and the agent read back (toolApi.getState) */
  api.share({ centre: st.fixed ? "K" : null, armLength: st.arm, circles: st.rings.length,
    segments: Object.keys(st.tags).length, chordPosition: st.d, diameterFound: st.d === 0 && n === 3, radiusSlot: st.laid,
    unit: item.unit || "cm" });

  /* ── paint ───────────────────────────────────────────────────────────────────────── */
  const FIG = CONTENT.hundred, DOT = CONTENT.pointer, LEN = CONTENT.ten;
  const SKY = tint(CONTENT.hundred, 0.45);
  const FIGT = shade(CONTENT.hundred, 0.25), DOTT = shade(CONTENT.pointer, 0.4), LENT = shade(CONTENT.ten, 0.45);
  const quiet = mix(C.ink, C.panel, 0.28);   /* a name beside a reading: 4.5:1 on the white of its box */
  const R = MODEL.ring * PC;

  const Sheet = () => (
    <g>
      <rect x={SHEET.x} y={SHEET.y} width={SHEET.w} height={SHEET.h} rx={RAD.panel} fill={C.panel} stroke={C.rule} strokeWidth={2} />
    </g>
  );
  const Centre = ({ at, name, dx = -34, dy = 38 }: any) => (
    <g>
      <circle cx={at.x} cy={at.y} r={9} fill={DOT} />
      <text x={at.x + dx} y={at.y + dy} fontSize={T.label} fontWeight={700} fill={DOTT}>{name}</text>
    </g>
  );
  const Mark = ({ at, name, dx = 16, dy = -14 }: any) => (
    <g>
      <circle cx={at.x} cy={at.y} r={8} fill={DOT} />
      <text x={at.x + dx} y={at.y + dy} fontSize={T.label} fontWeight={700} fill={DOTT}>{name}</text>
    </g>
  );

  /* the pair of compasses: a metal point, a hinge and a pencil arm with the string between them */
  const armAngle = live ? live.a : 35;      /* at rest the pencil leans clear of the top of the circle */
  const rimR = rimOf(box.current);
  const armLen = (live ? live.r : st.arm) * CM;
  const pencilAt = onRim(armLen, armAngle);
  const hinge = (() => {
    const mx = (KX + pencilAt.x) / 2, my = (KY + pencilAt.y) / 2;
    const h = Math.sqrt(Math.max(900, 200 * 200 - (armLen / 2) * (armLen / 2)));
    return { x: mx, y: Math.max(34, my - h) };
  })();
  const toHinge = Math.atan2(hinge.y - pencilAt.y, hinge.x - pencilAt.x) / D2R;
  const grip = { x: pencilAt.x + 76 * Math.cos(toHinge * D2R), y: pencilAt.y + 76 * Math.sin(toHinge * D2R) };
  const Compass = ({ live: on }: any) => (
    <g>
      <line x1={hinge.x} y1={hinge.y} x2={KX} y2={st.fixed ? KY : KY - 26} stroke={C.ink} strokeWidth={9} strokeLinecap="round" />
      <line x1={hinge.x} y1={hinge.y} x2={pencilAt.x} y2={pencilAt.y} stroke={C.ink} strokeWidth={9} strokeLinecap="round" />
      <circle cx={hinge.x} cy={hinge.y} r={13} fill={C.dim} stroke={C.ink} strokeWidth={3} />
      {!st.fixed && <path d={`M${KX - 9},${KY - 38} L${KX},${KY - 14} L${KX + 9},${KY - 38} Z`} fill={C.ink} />}
      <g transform={`rotate(${toHinge + 90} ${pencilAt.x} ${pencilAt.y})`}>
        <rect x={pencilAt.x - 11} y={pencilAt.y - 66} width={22} height={52} rx={4} fill={on ? LEN : C.dim} stroke={C.ink} strokeWidth={2} />
        <path d={`M${pencilAt.x - 11},${pencilAt.y - 14} L${pencilAt.x},${pencilAt.y} L${pencilAt.x + 11},${pencilAt.y - 14} Z`} fill={C.ink} />
      </g>
    </g>
  );
  /* the string from the centre to the pencil: the length that never changes as the pencil turns */
  const String1 = ({ r, a, show }: any) => {
    const p = onRim(r * CM, a), mx = (KX + p.x) / 2, my = (KY + p.y) / 2;
    const off = a > -110 && a < 70 ? -18 : 30;
    return (
      <g>
        <line x1={KX} y1={KY} x2={p.x} y2={p.y} stroke={LEN} strokeWidth={7} strokeLinecap="round" />
        {[...Array(r)].map((_, k) => {
          const q = onRim((k + 1) * CM, a);
          return <circle key={k} cx={q.x} cy={q.y} r={3.5} fill={C.ink} />;
        })}
        {show && <text x={mx + 8} y={my + off} fontSize={T.label} fontWeight={700} fill={LENT}>{r + " " + tx("cm")}</text>}
      </g>
    );
  };

  const Rings = ({ list, paint }: any) => (
    <g>{list.map((r: number, k: number) => <circle key={k} cx={KX} cy={KY} r={r * CM} fill="none" stroke={paint || FIG} strokeWidth={5} />)}</g>
  );

  /* the slot of white under the tray where a reading stands */
  const Reading = ({ y, name, value, w = TRAY.w }: any) => (
    <g data-role="reading">
      <rect x={TRAY.x} y={y} width={w} height={84} rx={RAD.panel} fill={mix(C.panel, "#FFFFFF", 0.6)} stroke={C.rule} strokeWidth={2} />
      <text x={TRAY.x + 18} y={y + (lang === "en" ? 34 : 29)} fontSize={T.micro} fontWeight={500} fill={quiet}>{tx(name)}</text>
      <text x={TRAY.x + 18} y={y + (lang === "en" ? 70 : 73)} fontSize={T.label} fontWeight={700} fill={C.ink}>{value}</text>
    </g>
  );
  const Tag = ({ name, k }: any) => {
    const b = tagBox(k);
    return (
      <g {...control("tag-" + name, name + " tag")} {...drag.bind({ id: "tag", name })} {...drag.keys({ id: "tag", name })}>
        <rect x={b.x} y={b.y} width={b.w} height={b.h} rx={RAD.key} fill={mix(C.panel, "#FFFFFF", 0.75)} stroke={C.accent} strokeWidth={3} filter="url(#fShadowSoft)" />
        <text x={b.x + b.w / 2} y={b.y + 48} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx(name)}</text>
      </g>
    );
  };
  const Named = ({ at, name, dy = 0 }: any) => {
    const shown = tx(String(name));
    const w = shown.length * 15 + 24;
    return (
      <g>
        <rect x={at.x - w / 2} y={at.y + dy - 26} width={w} height={36} rx={9} fill={mix(C.panel, "#FFFFFF", 0.88)} stroke={C.accent} strokeWidth={2} />
        <text x={at.x} y={at.y + dy} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={FIGT}>{shown}</text>
      </g>
    );
  };

  /* ── phase 1: the compass, the string and the rings ─────────────────────────────── */
  const bench = (
    <g>
      {Sheet()}
      {Rings({ list: st.rings })}
      {live && Math.abs(live.turned) > 2 && <path d={arcOf(live.r * CM, live.a0, live.turned)} fill="none" stroke={FIG} strokeWidth={5} strokeLinecap="round" />}
      {!demo && Compass({ live: !!live })}
      {/* the string and its reading lie over the arm: the length being measured is the thing to read */}
      {st.fixed && !demo && String1({ r: live ? live.r : st.arm, a: armAngle, show: true })}
      {st.fixed && Centre({ at: { x: KX, y: KY }, name: "K" })}
    </g>
  );

  /* ── phase 2: a circle with its parts named ─────────────────────────────────────── */
  const A = onRim(R, MODEL.pts.A), B = onRim(R, MODEL.pts.B), Cc = onRim(R, MODEL.pts.C);
  const Q = onRim(R, MODEL.pts.Q), Rr = onRim(R, MODEL.pts.R);
  const many = (
    <g>
      {[-20, 60, 150, 250].map((a, k) => { const p = onRim(R, a); return <line key={k} x1={KX} y1={KY} x2={p.x} y2={p.y} stroke={FIG} strokeWidth={4} strokeLinecap="round" />; })}
      {[[-70, 20], [100, 170], [200, 280]].map(([u, v], k) => { const p = onRim(R, u), q = onRim(R, v); return <line key={k} x1={p.x} y1={p.y} x2={q.x} y2={q.y} stroke={SKY} strokeWidth={4} strokeLinecap="round" />; })}
    </g>
  );
  const parts = (
    <g>
      {Sheet()}
      <circle cx={KX} cy={KY} r={R} fill="none" stroke={FIG} strokeWidth={5} />
      {index === 0 && (
        <g>
          <line x1={KX} y1={KY} x2={A.x} y2={A.y} stroke={FIG} strokeWidth={6} strokeLinecap="round" />
          <line x1={B.x} y1={B.y} x2={Cc.x} y2={Cc.y} stroke={FIG} strokeWidth={6} strokeLinecap="round" />
          {Mark({ at: A, name: "A", dx: 18, dy: -8 })}
          {Mark({ at: B, name: "B", dx: -40, dy: -2 })}
          {Mark({ at: Cc, name: "C", dx: 18, dy: 22 })}
          {Centre({ at: { x: KX, y: KY }, name: "O" })}
          {!demo && st.tags.OA && Named({ at: spotMid("OA"), name: st.tags.OA, dy: -16 })}
          {!demo && st.tags.BC && Named({ at: spotMid("BC"), name: st.tags.BC, dy: 40 })}
        </g>
      )}
      {index === 1 && (
        <g>
          <line x1={KX} y1={KY} x2={Q.x} y2={Q.y} stroke={st.lit.PQ ? LEN : FIG} strokeWidth={7} strokeLinecap="round" />
          <line x1={KX} y1={KY} x2={Rr.x} y2={Rr.y} stroke={st.lit.PR ? LEN : FIG} strokeWidth={7} strokeLinecap="round" />
          {Mark({ at: Q, name: "Q", dx: 18, dy: -8 })}
          {Mark({ at: Rr, name: "R", dx: -42, dy: 22 })}
          {Centre({ at: { x: KX, y: KY }, name: "P" })}
          {st.lit.PQ && st.lit.PR && <path d={arcOf(R - 22, MODEL.pts.Q, 230)} fill="none" stroke={LEN} strokeWidth={3} />}
        </g>
      )}
      {index === 2 && (
        <g>
          {many}
          {Centre({ at: { x: KX, y: KY }, name: "O" })}
        </g>
      )}
    </g>
  );

  /* ── phase 3: the chord that slides across ─────────────────────────────────────── */
  const half = chordHalf(MODEL.ring, st.d) * PC;
  const cy = KY + st.d * PC;
  const fg = MODEL.chord.start;
  const chord = (
    <g>
      {Sheet()}
      <circle cx={KX} cy={KY} r={R} fill="none" stroke={FIG} strokeWidth={5} />
      {index === 0 && (
        <g>
          <line x1={KX - chordHalf(MODEL.ring, -fg) * PC} y1={KY - fg * PC} x2={KX + chordHalf(MODEL.ring, -fg) * PC} y2={KY - fg * PC}
            stroke={SKY} strokeWidth={6} strokeLinecap="round" />
          <text x={KX + chordHalf(MODEL.ring, -fg) * PC + 12} y={KY - fg * PC + 10} fontSize={T.micro} fontWeight={700} fill={C.ink}>FG</text>
        </g>
      )}
      <line x1={KX - half} y1={cy} x2={KX + half} y2={cy} stroke={st.d === 0 ? FIG : SKY} strokeWidth={st.d === 0 ? 8 : 6} strokeLinecap="round" />
      {index === 0 && <text x={KX + half + 12} y={cy + 10} fontSize={T.micro} fontWeight={700} fill={C.ink}>DE</text>}
      {st.d === 0 && !demo && Named({ at: { x: KX, y: cy }, name: "diameter", dy: 46 })}
      {/* here the letter hangs above the dot: a chord through the centre carries its name below it */}
      {Centre({ at: { x: KX, y: KY }, name: "O", dy: -36 })}
    </g>
  );
  const Slider = () => (
    <g>
      <rect x={RAIL.x} y={RAIL.y} width={RAIL.w} height={RAIL.h} rx={RAD.panel} fill={mix(C.panel, "#FFFFFF", 0.5)} stroke={C.rule} strokeWidth={2} />
      {[...Array(15)].map((_, k) => <line key={k} x1={RAIL.x + 10} y1={KY + (k - 7) * 0.5 * PC} x2={RAIL.x + 30} y2={KY + (k - 7) * 0.5 * PC} stroke={C.rule} strokeWidth={2} />)}
      <g {...control("chord-handle", "chord slider, arrow keys move it")} {...drag.bind({ id: "chord" })}
        {...withArrows({ id: "chord" }, (dir) => { setSt((s: any) => { const d = Math.max(-MODEL.chord.span, Math.min(MODEL.chord.span, s.d - dir * MODEL.chord.step)); if (d === 0) api.sfx.tick(); return { ...s, d, touched: true }; }); })}>
        <rect x={RAIL.x - 26} y={cy - 38} width={92} height={76} rx={RAD.key} fill={mix(C.accent, "#FFFFFF", 0.78)} stroke={C.accent} strokeWidth={3} filter="url(#fShadowSoft)" />
        <path d={`M${RAIL.x - 26},${cy} L${RAIL.x - 4},${cy - 16} L${RAIL.x - 4},${cy + 16} Z`} fill={C.accent} />
        {[-12, 0, 12].map((o) => <line key={o} x1={RAIL.x + 14} y1={cy + o} x2={RAIL.x + 44} y2={cy + o} stroke={C.accent} strokeWidth={3} strokeLinecap="round" />)}
      </g>
    </g>
  );

  /* ── phase 4: two radii, end to end ────────────────────────────────────────────── */
  const S = MODEL.span;
  const gv = item.kind === "length" ? item : { given: "radius", v: 6, unit: "cm", answer: 12 };
  const un = tx(gv.unit);                                                    /* the unit, in the language in use */
  const across = (v: any) => lang === "en" ? v + " " + gv.unit + " across" : tx("across") + " " + v + " " + un;
  const missBar = demo && item.kind === "length" ? Math.max(20, Math.min(280, S * (leadNumber(demo.v) || 0) / (gv.given === "radius" ? gv.v : gv.v / 2))) : 0;
  const radii = (
    <g>
      {Sheet()}
      <circle cx={KX} cy={KY} r={S} fill="none" stroke={FIG} strokeWidth={5} />
      {gv.given === "radius" ? (
        <g>
          <line x1={KX} y1={KY} x2={KX - S} y2={KY} stroke={LEN} strokeWidth={9} strokeLinecap="round" />
          <text x={KX - S / 2} y={KY - 20} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={LENT}>{gv.v + " " + un}</text>
          {st.laid && <line x1={KX} y1={KY} x2={KX + S} y2={KY} stroke={LEN} strokeWidth={9} strokeLinecap="round" />}
          {st.laid && <text x={KX + S / 2} y={KY - 20} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={LENT}>{gv.v + " " + un}</text>}
        </g>
      ) : (
        <g>
          <line x1={KX - S} y1={KY} x2={KX + S} y2={KY} stroke={LEN} strokeWidth={9} strokeLinecap="round" />
          <text x={KX} y={KY - 20} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={LENT}>{gv.v + " " + un}</text>
          {st.laid && <line x1={KX} y1={KY - 26} x2={KX} y2={KY + 26} stroke={C.ink} strokeWidth={4} strokeLinecap="round" />}
        </g>
      )}
      {(done || (demo && demo.k >= 1)) && (
        gv.given === "radius" ? (
          <g>
            <path d={`M${KX - S},${KY + 44} L${KX - S},${KY + 62} L${KX + S},${KY + 62} L${KX + S},${KY + 44}`} fill="none" stroke={C.ink} strokeWidth={3} />
            <text x={KX} y={KY + 100} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{across(gv.answer)}</text>
          </g>
        ) : (
          <g>
            <text x={KX - S / 2} y={KY + 62} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{gv.answer + " " + un}</text>
            <text x={KX + S / 2} y={KY + 62} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{gv.answer + " " + un}</text>
          </g>
        )
      )}
      {missBar > 0 && <line x1={KX} y1={KY} x2={onRim(missBar, -42).x} y2={onRim(missBar, -42).y} stroke={SKY} strokeWidth={7} strokeLinecap="round" />}
      {Centre({ at: { x: KX, y: KY }, name: "O" })}
    </g>
  );
  const BarPiece = () => (
    <g {...control("bar", "spare radius bar")} {...drag.bind({ id: "bar" })} {...drag.keys({ id: "bar" })}>
      {/* a shelf the spare bar rests on; the bar itself carries no filter (a flat line has no box to filter) */}
      <rect x={BAR.x - 10} y={BAR.y - 8} width={BAR.w + 20} height={BAR.h + 16} rx={RAD.panel} fill={mix(C.panel, "#FFFFFF", 0.5)} stroke={C.rule} strokeWidth={2} />
      <line x1={BAR.x + 10} y1={BAR.y + BAR.h / 2} x2={BAR.x + BAR.w - 10} y2={BAR.y + BAR.h / 2} stroke={LEN} strokeWidth={16} strokeLinecap="round" />
      {[0.3, 0.5, 0.7].map((f) => <circle key={f} cx={BAR.x + BAR.w * f} cy={BAR.y + BAR.h / 2} r={3.5} fill={shade(CONTENT.ten, 0.45)} />)}
    </g>
  );

  /* ── the correction: the maths redrawn, ending on the whole right answer ───────── */
  const strip = (s: string, y = 462) => <text x={16} y={y} fontSize={T.label} fontWeight={700} fill={C.ink}>{tx(s)}</text>;
  const tracer = () => {
    if (!demo) return null;
    const k = demo.k;
    if (n === 1 && index === 0) {
      const w = Math.max(1, Math.min(MODEL.arm.max, leadNumber(demo.v) || MODEL.arm.max));
      return (
        <g>
          {k >= 0 && <circle cx={KX} cy={KY} r={w * CM} fill="none" stroke={SKY} strokeWidth={5} />}
          {k >= 0 && <line x1={KX - w * CM} y1={KY} x2={KX + w * CM} y2={KY} stroke={C.ink} strokeWidth={3} />}
          {k >= 0 && <text x={KX - w * CM + (lang === "en" ? 4 : -12)} y={KY - 16} fontSize={T.micro} fontWeight={600} fill={C.ink}>{lang === "en" ? 2 * w + " cm across" : tx("across") + " " + 2 * w + " " + tx("cm")}</text>}
          {k >= 1 && String1({ r: MODEL.arm.target, a: -90, show: true })}
          {k >= 2 && <circle cx={KX} cy={KY} r={MODEL.arm.target * CM} fill="none" stroke={FIG} strokeWidth={6} />}
          {k >= 2 && [30, 150].map((a) => <line key={a} x1={KX} y1={KY} x2={onRim(MODEL.arm.target * CM, a).x} y2={onRim(MODEL.arm.target * CM, a).y} stroke={LEN} strokeWidth={5} strokeLinecap="round" />)}
          {k >= 1 && !st.fixed && Centre({ at: { x: KX, y: KY }, name: "K" })}
          {k >= 2 && strip("3 cm all round")}
        </g>
      );
    }
    if (n === 1 && index === 1) {
      return (
        <g>
          {k >= 0 && <circle cx={KX} cy={KY} r={rimR} fill="none" stroke={LEN} strokeWidth={9} />}
          {k >= 1 && <circle cx={KX} cy={KY} r={rimR} fill="none" stroke={FIG} strokeWidth={5} />}
          {k >= 2 && Named({ at: { x: KX, y: KY - rimR }, name: "circumference", dy: -20 })}
        </g>
      );
    }
    if (n === 1 && index === 2) {
      return (
        <g>
          {k >= 0 && <circle cx={KX} cy={KY} r={MODEL.arm.target * CM} fill="none" stroke={FIG} strokeWidth={5} />}
          {k >= 1 && <circle cx={KX} cy={KY} r={MODEL.arm.wider * CM} fill="none" stroke={FIG} strokeWidth={5} />}
          {k >= 1 && <circle cx={KX} cy={KY} r={18} fill="none" stroke={LEN} strokeWidth={4} />}
          {k >= 2 && strip("concentric circles")}
        </g>
      );
    }
    if (n === 2 && index === 0) {
      return (
        <g>
          {k >= 0 && <g><circle cx={B.x} cy={B.y} r={14} fill="none" stroke={LEN} strokeWidth={4} /><circle cx={Cc.x} cy={Cc.y} r={14} fill="none" stroke={LEN} strokeWidth={4} /></g>}
          {k >= 1 && Named({ at: spotMid("BC"), name: "chord", dy: 40 })}
          {k >= 2 && <g><line x1={KX} y1={KY} x2={A.x} y2={A.y} stroke={FIG} strokeWidth={7} strokeLinecap="round" />{Named({ at: spotMid("OA"), name: "radius", dy: -16 })}</g>}
        </g>
      );
    }
    if (n === 2 && index === 1) {
      return (
        <g>
          {k >= 0 && <line x1={KX} y1={KY} x2={Q.x} y2={Q.y} stroke={LEN} strokeWidth={8} strokeLinecap="round" />}
          {k >= 1 && <line x1={KX} y1={KY} x2={Rr.x} y2={Rr.y} stroke={LEN} strokeWidth={8} strokeLinecap="round" />}
          {k >= 2 && <path d={arcOf(R - 22, MODEL.pts.Q, 230)} fill="none" stroke={LEN} strokeWidth={4} />}
          {k >= 2 && strip("same length")}
        </g>
      );
    }
    if (n === 2 && index === 2) {
      return (
        <g>
          {k >= 0 && many}
          {k >= 1 && <circle cx={KX} cy={KY} r={20} fill="none" stroke={LEN} strokeWidth={4} />}
          {k >= 2 && strip("one centre")}
        </g>
      );
    }
    if (n === 3 && index === 0) {
      const d0 = Math.abs(st.d) < 0.3 ? 1.5 : st.d;
      return (
        <g>
          {k >= 0 && <line x1={KX - chordHalf(MODEL.ring, d0) * PC} y1={KY + d0 * PC} x2={KX + chordHalf(MODEL.ring, d0) * PC} y2={KY + d0 * PC} stroke={SKY} strokeWidth={6} strokeLinecap="round" />}
          {k >= 1 && <line x1={KX - R} y1={KY} x2={KX + R} y2={KY} stroke={FIG} strokeWidth={8} strokeLinecap="round" />}
          {k >= 2 && Named({ at: { x: KX, y: KY }, name: "diameter", dy: 46 })}
          {k >= 2 && strip("through O", 60)}
        </g>
      );
    }
    if (n === 3 && index === 1) {
      return (
        <g>
          {k >= 0 && <line x1={KX - R} y1={KY} x2={KX + R} y2={KY} stroke={FIG} strokeWidth={8} strokeLinecap="round" />}
          {k >= 0 && Named({ at: { x: KX, y: KY }, name: "chord and diameter", dy: 46 })}
          {k >= 1 && <line x1={KX - chordHalf(MODEL.ring, -2.5) * PC} y1={KY - 2.5 * PC} x2={KX + chordHalf(MODEL.ring, -2.5) * PC} y2={KY - 2.5 * PC} stroke={SKY} strokeWidth={6} strokeLinecap="round" />}
          {k >= 1 && Named({ at: { x: KX, y: KY - 2.5 * PC }, name: "chord only", dy: -22 })}
          {k >= 2 && strip("not every chord")}
        </g>
      );
    }
    if (n === 3 && index === 2) {
      return (
        <g>
          {k >= 0 && <line x1={KX - R} y1={KY} x2={KX + R} y2={KY} stroke={FIG} strokeWidth={8} strokeLinecap="round" />}
          {k >= 0 && <text x={KX + 70} y={KY - 26} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={FIGT}>{"8 " + tx("cm")}</text>}
          {k >= 1 && <line x1={KX - R} y1={KY + 96} x2={KX - R + 10 * PC} y2={KY + 96} stroke={SKY} strokeWidth={8} strokeLinecap="round" />}
          {k >= 1 && <text x={KX - R + 10 * PC + 16} y={KY + 106} fontSize={T.micro} fontWeight={700} fill={C.ink}>{"10 " + tx("cm")}</text>}
          {k >= 2 && strip("8 cm at most")}
        </g>
      );
    }
    if (n === 4) {
      return (
        <g>
          {k >= 0 && gv.given === "radius" && !st.laid && <line x1={KX} y1={KY} x2={KX + S} y2={KY} stroke={LEN} strokeWidth={9} strokeLinecap="round" />}
          {k >= 0 && gv.given === "radius" && !st.laid && <text x={KX + S / 2} y={KY - 20} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={LENT}>{gv.v + " " + un}</text>}
          {k >= 0 && gv.given === "diameter" && !st.laid && <line x1={KX} y1={KY - 26} x2={KX} y2={KY + 26} stroke={C.ink} strokeWidth={4} strokeLinecap="round" />}
        </g>
      );
    }
    return null;
  };

  /* ── the invite: the one thing to touch ────────────────────────────────────────── */
  const invite = () => {
    if (stage !== "ask" && !free) return null;
    if (demo) return null;
    if (free || n === 1) {
      if (!st.fixed) return <Invite x={KX} y={KY} r={40} C={C} />;
      if (item.kind === "name" && !free) return <Invite x={KX} y={KY - rimR} r={34} C={C} />;
      if (!free && st.rings.length >= (item.kind === "word" ? 2 : 1)) return null;
      return <Invite x={grip.x} y={grip.y} r={34} C={C} />;
    }
    if (n === 2) {
      if (index === 0 && !st.tags.OA) { const m = spotMid("OA"); return <Invite x={m.x} y={m.y} r={34} C={C} />; }
      if (index === 1 && !st.lit.PQ) { const m = { x: (KX + Q.x) / 2, y: (KY + Q.y) / 2 }; return <Invite x={m.x} y={m.y} r={34} C={C} />; }
      return null;
    }
    if (n === 3) return <Invite x={RAIL.x + 20} y={cy} r={40} C={C} />;
    if (n === 4 && !st.laid) return <Invite x={BAR.x + BAR.w / 2} y={BAR.y + BAR.h / 2} r={54} C={C} />;
    return null;
  };

  const tags = (item.tags || []).filter((t: string) => Object.keys(st.tags).every((k) => st.tags[k] !== t));
  const runsLabel = ["Circles turned", "Parts named", "Chords set", "Radii laid"][n - 1] || "Circles turned";
  const runsDone = Math.min(phase.items.length, index + (done ? 1 : 0));

  return (
    <g onKeyDownCapture={onKeyCapture}>
      {!free && (
        <g data-zone="runs">
          <rect x={0} y={-94} width={330} height={76} rx={RAD.panel} fill={mix(C.panel, "#FFFFFF", 0.5)} stroke={C.rule} strokeWidth={2} />
          <text x={16} y={lang === "en" ? -60 : -62} fontSize={T.micro} fontWeight={500} fill={quiet}>{tx(runsLabel)}</text>
          <text x={16} y={lang === "en" ? -26 : -24} fontSize={T.label} fontWeight={700} fill={C.ink}>{lang === "en" ? runsDone + " of " + phase.items.length : runsDone + " / " + phase.items.length}</text>
        </g>
      )}

      {(free || n === 1) && bench}
      {!free && n === 2 && parts}
      {!free && n === 3 && chord}
      {!free && n === 4 && radii}
      {(free || n === 3) && Slider()}
      {free && BarPiece()}

      {/* the parts tray */}
      {!free && item.kind === "name" && tags.map((t: string, k: number) => <g key={t}>{Tag({ name: t, k })}</g>)}
      {!free && n === 1 && item.kind !== "name" && Reading({ y: TRAY.y + 48, name: "Opening", value: st.arm + " " + tx("cm") })}
      {!free && !demo && n === 1 && item.kind === "name" && st.tags.rim && Named({ at: { x: KX, y: KY - rimR - 18 }, name: st.tags.rim, dy: 0 })}
      {!free && n === 3 && Reading({ y: TRAY.y + 48, name: "Chord", value: tidy(2 * chordHalf(MODEL.ring, st.d)) + " " + tx("cm") })}
      {!free && n === 4 && !st.laid && BarPiece()}
      {!free && n === 4 && Reading({ y: TRAY.y + 160, name: gv.given, value: gv.v + " " + un })}
      {!free && n === 4 && done && Reading({ y: TRAY.y + 260, name: gv.given === "radius" ? "diameter" : "radius", value: gv.answer + " " + un })}
      {free && Reading({ y: TRAY.y + 48, name: "Opening", value: st.arm + " " + tx("cm") })}
      {free && Reading({ y: TRAY.y + 150, name: "Chord", value: tidy(2 * chordHalf(MODEL.ring, st.d)) + " " + tx("cm") })}

      {/* the pieces the child moves */}
      {(free || n === 1) && !st.fixed && (
        <Hit id="metal-point" x={KX - 44} y={KY - 44} w={88} h={88} label="metal point"
          onPress={() => { wake(); api.sfx.tick(); setSt((s: any) => ({ ...s, fixed: true })); }} />
      )}
      {(free || n === 1) && st.fixed && (!free ? item.kind !== "name" : true) && (
        <g {...control("pencil", "pencil arm, arrow keys open or close it, Enter turns it")} {...drag.bind({ id: "pencil" })}
          {...withArrows({ id: "pencil" }, (dir) => setSt((s: any) => ({ ...s, arm: Math.max(MODEL.arm.min, Math.min(MODEL.arm.max, s.arm + dir)) })))}>
          <rect x={pencilAt.x - 40} y={pencilAt.y - 80} width={80} height={92} fill="transparent" />
        </g>
      )}
      {!free && n === 2 && index === 1 && (
        <g>
          <Hit id="seg-PQ" x={(KX + Q.x) / 2 - 38} y={(KY + Q.y) / 2 - 38} w={76} h={76} label="segment PQ"
            onPress={() => { wake(); api.sfx.tick(); setSt((s: any) => ({ ...s, lit: { ...s.lit, PQ: true } })); }} />
          <Hit id="seg-PR" x={(KX + Rr.x) / 2 - 38} y={(KY + Rr.y) / 2 - 38} w={76} h={76} label="segment PR"
            onPress={() => { wake(); api.sfx.tick(); setSt((s: any) => ({ ...s, lit: { ...s.lit, PR: true } })); }} />
        </g>
      )}

      {/* the correction is a demo layer only: it is drawn over the sheet, so it must never take a
          finger meant for the piece underneath it (it covered the metal point and the slider handle) */}
      {!free && <g pointerEvents="none">{tracer()}</g>}
      {invite()}
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase */
function Thumb({ result, C, w, h, lang = "en", tx = (v: any) => v }: any) {
  const last = result && result.last ? result.last : null;
  if (!last || last.value === null || last.value === undefined) return null;
  const k = last.kind, sh = last.shared || {};
  const v = k === "length" ? String(last.value) + " " + tx(sh.unit || "cm") : tx(String(last.value));
  const cx = w / 2, cy = lang === "en" ? 28 : 24, r = 21;   /* Hindi and Gujarati marks rise above the line: the drawing sits higher */
  const blue = shade(CONTENT.hundred, 0.25), amber = shade(CONTENT.ten, 0.45);
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={blue} strokeWidth={3} />
      {k === "length" || k === "slide" ? <line x1={cx - r} y1={cy} x2={cx + r} y2={cy} stroke={k === "slide" ? blue : amber} strokeWidth={4} strokeLinecap="round" />
        : k === "word" ? <circle cx={cx} cy={cy} r={r * 0.55} fill="none" stroke={blue} strokeWidth={3} />
        : <line x1={cx} y1={cy} x2={cx + r} y2={cy} stroke={amber} strokeWidth={4} strokeLinecap="round" />}
      <circle cx={cx} cy={cy} r={5} fill={CONTENT.pointer} />
      <text x={cx} y={h - 12} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={C.ink}>{v}</text>
    </g>
  );
}

function CompassBench(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, fitHost: () => null }} />
  );
}

export default CompassBench;
