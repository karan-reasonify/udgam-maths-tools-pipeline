/* ═══ M1.S2.T3.C8.2D1 · unit_ladder · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists: header + its three controls, canvas, slot + pad, bubble + mascot,
   phase dots (user / AI mode), window.toolApi, sounds, the synced voice, scoring, the events,
   idle and restart. NO imports in this file; only the five host hooks. Follow docs/LAYOUT.md.
   Edit, never rewrite. Built by `node cli.mjs scaffold`; concepts are verbatim (check compares them). */

const TOOL_ID = "unit_ladder";
const MEDIA_ID = "M1.S2.T3.C8.2D1";
const TOOL_NAME = "Unit Ladder";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
const VOICE = {"rate":0.92,"pitch":1.06};

/* spoken before phase 1's teach lines only (the plan's opening voice line) */
const OPENING = ["A ladder of length units. Which number belongs on each step?"];
/* the whole-tool line: spoken on the summary page */
const FINISH_LINE = "Each step has its own number, the rest stays in the smaller unit, and every empty place gets a zero.";
/* said when the child opens Free play from the summary page (what the free branch of Work really offers) */
const FREE_LINE = "Free play. Tap the card to type any length, then step it up or down the ladder.";

/* Hindi and Gujarati (docs/PATTERNS.md §11): every line above and below stays English, exactly as the checks
   read it; this table is keyed by that English, and the runtime looks each spoken or drawn line up in it.
   Fill it AFTER the English is final and reviewed (`node cli.mjs voice` lists every line still missing),
   then bake the voice. Empty = the tool runs in English only. */
const TR: any = {
  hi: {
    "Unit Ladder": "मात्रकों की सीढ़ी",
    "A ladder of length units. Which number belongs on each step?": "लंबाई के मात्रकों की सीढ़ी। हर पायदान पर कौन-सी संख्या आएगी?",
    "Each step has its own number, the rest stays in the smaller unit, and every empty place gets a zero.": "हर पायदान की अपनी संख्या है, बचा हुआ छोटे मात्रक में रहता है, और हर खाली स्थान में शून्य आता है।",
    "Free play. Tap the card to type any length, then step it up or down the ladder.": "मुक्त खेल: कार्ड को छूकर कोई भी लंबाई लिखो, फिर उसे सीढ़ी पर ऊपर या नीचे ले जाओ।",
    /* phase 1 */
    "Each step has its own number": "हर पायदान की अपनी संख्या",
    "Each step joins two units. Try a number tile on a step.": "हर पायदान दो मात्रकों को जोड़ता है। किसी पायदान पर एक संख्या टाइल रखकर देखो।",
    "How many of the smaller unit fit into one of the larger?": "बड़े मात्रक के एक में छोटे मात्रक के कितने आते हैं?",
    "Think of a ruler, a metre stick and a long road. Each step is a different size.": "एक स्केल, एक मीटर स्केल और एक लंबी सड़क के बारे में सोचो। हर पायदान का आकार अलग है।",
    "Ten millimetres make a centimetre, a hundred centimetres make a metre, and a thousand metres make a kilometre. Each step has its own number.": "10 मिलीमीटर से 1 सेंटीमीटर, 100 सेंटीमीटर से 1 मीटर, और 1,000 मीटर से 1 किलोमीटर बनता है। हर पायदान की अपनी संख्या है।",
    "You learned: 10, 100 and 1,000 each join a different pair of units.": "तुमने सीखा: 10, 100 और 1,000 अलग-अलग मात्रक-जोड़ों को जोड़ते हैं।",
    "A child uses ten for every step and writes 3 metres as 30 centimetres. Check the child: write 3 metres in centimetres.": "एक बच्चा हर पायदान पर दस लेता है और 3 मीटर को 30 सेंटीमीटर लिखता है। जाँच करो: 3 मीटर को सेंटीमीटर में लिखो।",
    "3 m is how many cm?": "3 मी कितने सेमी?",
    "Which two units does this step join?": "यह पायदान किन दो मात्रकों को जोड़ता है?",
    "How many centimetres make a metre, and how many millimetres make a centimetre?": "कितने सेंटीमीटर से एक मीटर बनता है, और कितने मिलीमीटर से एक सेंटीमीटर?",
    "cm in 1 m? mm in 1 cm?": "1 मी में सेमी? 1 सेमी में मिमी?",
    "Think of a ruler: count the tiny marks between 0 and 1. A metre stick is a very long ruler.": "स्केल के बारे में सोचो: 0 और 1 के बीच के छोटे निशान गिनो। मीटर स्केल एक बहुत लंबा स्केल है।",
    "Which number joins each pair: millimetres and centimetres, centimetres and metres, metres and kilometres? Set each tile, then press Enter.": "हर जोड़े को कौन-सी संख्या जोड़ती है: मिलीमीटर और सेंटीमीटर, सेंटीमीटर और मीटर, मीटर और किलोमीटर? हर टाइल रखो, फिर एंटर दबाओ।",
    "Set each tile on its step.": "हर टाइल अपने पायदान पर रखो।",
    "Start with the bottom step, the two smallest units. Then go up one step at a time.": "सबसे नीचे के पायदान से शुरू करो, सबसे छोटे दो मात्रक। फिर एक-एक पायदान ऊपर जाओ।",
    /* phase 2 */
    "Larger to smaller: multiply": "बड़े से छोटा: गुणा करो",
    "Step it down. Which number is on this step? Now add on the metres.": "इसे नीचे उतारो। इस पायदान पर कौन-सी संख्या है? अब मीटर जोड़ो।",
    "What happens to the smaller part?": "छोटे भाग का क्या होता है?",
    "Start with just one of the larger unit. How many of the smaller unit is that?": "बड़े मात्रक के सिर्फ़ एक से शुरू करो। वह छोटे मात्रक के कितने है?",
    "Larger to smaller: multiply the larger part by the step's number, then add the smaller part.": "बड़े से छोटा: बड़े भाग को पायदान की संख्या से गुणा करो, फिर छोटा भाग जोड़ो।",
    "You learned: larger to smaller, multiply and add the smaller part.": "तुमने सीखा: बड़े से छोटा, गुणा करो और छोटा भाग जोड़ो।",
    "Convert 7 kilometres 245 metres into metres.": "7 किलोमीटर 245 मीटर को मीटर में बदलो।",
    "7 km 245 m in metres?": "7 किमी 245 मी, मीटर में?",
    "Which step is the card crossing?": "कार्ड कौन-सा पायदान पार कर रहा है?",
    "Now 9 metres. How many centimetres is that?": "अब 9 मीटर। वह कितने सेंटीमीटर है?",
    "9 m in centimetres?": "9 मी, सेंटीमीटर में?",
    "Read the number painted between metres and centimetres.": "मीटर और सेंटीमीटर के बीच लिखी संख्या पढ़ो।",
    "12 centimetres 7 millimetres. Write it all in millimetres.": "12 सेंटीमीटर 7 मिलीमीटर। पूरा मिलीमीटर में लिखो।",
    "12 cm 7 mm in millimetres?": "12 सेमी 7 मिमी, मिलीमीटर में?",
    "Multiply the centimetres first, then bring the millimetres along.": "पहले सेंटीमीटर का गुणा करो, फिर मिलीमीटर साथ ले आओ।",
    /* phase 3 */
    "Smaller to larger: divide and keep the rest": "छोटे से बड़ा: भाग दो और बचा हुआ रखो",
    "How many whole metres are in it? What is left stays in centimetres.": "इसमें कितने पूरे मीटर हैं? जो बचे, वह सेंटीमीटर में रहता है।",
    "How many whole larger units fit, and what is left?": "बड़े मात्रक के कितने पूरे आते हैं, और क्या बचता है?",
    "Check it: the whole units times the step's number, plus what is left, must give the card again.": "जाँच करो: पूरे मात्रक गुणा पायदान की संख्या, और बचा हुआ जोड़कर, फिर से कार्ड मिलना चाहिए।",
    "Smaller to larger: divide by the step's number. The quotient is the larger unit and the remainder stays as the smaller unit.": "छोटे से बड़ा: पायदान की संख्या से भाग दो। भागफल बड़ा मात्रक है और शेषफल छोटे मात्रक में रहता है।",
    "You learned: smaller to larger, divide and keep the rest.": "तुमने सीखा: छोटे से बड़ा, भाग दो और बचा हुआ रखो।",
    "Write 570 centimetres in metres and centimetres.": "570 सेंटीमीटर को मीटर और सेंटीमीटर में लिखो।",
    "570 cm in m and cm?": "570 सेमी, मी और सेमी में?",
    "Which number joins centimetres and metres?": "सेंटीमीटर और मीटर को कौन-सी संख्या जोड़ती है?",
    "Now 83 millimetres. Change it into centimetres and millimetres.": "अब 83 मिलीमीटर। इसे सेंटीमीटर और मिलीमीटर में बदलो।",
    "83 mm in cm and mm?": "83 मिमी, सेमी और मिमी में?",
    "How many whole centimetres fit in 83 millimetres?": "83 मिलीमीटर में कितने पूरे सेंटीमीटर आते हैं?",
    "A path is 4,608 metres long. Write its length in kilometres and metres.": "एक रास्ता 4,608 मीटर लंबा है। इसकी लंबाई किलोमीटर और मीटर में लिखो।",
    "4,608 m in km and m?": "4,608 मी, किमी और मी में?",
    "How many whole thousands are in 4,608?": "4,608 में कितने पूरे हज़ार हैं?",
    /* phase 4 */
    "A zero that holds a place": "स्थान सँभालने वाला शून्य",
    "The metres fill the tens and the ones. What goes in the hundreds?": "मीटर दहाई और इकाई को भरते हैं। सैकड़े में क्या आएगा?",
    "Which boxes are still empty?": "कौन-से खाने अभी भी खाली हैं?",
    "Write the larger part first. Then fill every place of the smaller part, with a zero where it is empty.": "पहले बड़ा भाग लिखो। फिर छोटे भाग का हर स्थान भरो, जहाँ खाली हो वहाँ शून्य।",
    "A zero holds each place the smaller part leaves empty. Beside kilometres the metres take three places.": "छोटा भाग जो स्थान खाली छोड़ता है, उसे शून्य सँभालता है। किलोमीटर के साथ मीटर तीन स्थान लेते हैं।",
    "You learned: an empty place in the smaller part takes a zero.": "तुमने सीखा: छोटे भाग के खाली स्थान में शून्य आता है।",
    "Convert 6 kilometres 38 metres into metres.": "6 किलोमीटर 38 मीटर को मीटर में बदलो।",
    "6 km 38 m in metres?": "6 किमी 38 मी, मीटर में?",
    "How many places do the metres take beside kilometres?": "किलोमीटर के साथ मीटर कितने स्थान लेते हैं?",
    "A child writes 9 kilometres 7 metres as 9,700 metres. Write it in metres yourself.": "एक बच्चा 9 किलोमीटर 7 मीटर को 9,700 मीटर लिखता है। तुम खुद इसे मीटर में लिखो।",
    "9 km 7 m in metres?": "9 किमी 7 मी, मीटर में?",
    "7 metres takes only the ones place. What must fill the two places before it?": "7 मीटर सिर्फ़ इकाई का स्थान लेता है। उससे पहले के दो स्थान किससे भरेंगे?",
    "A ribbon is 305 centimetres long. Write its length in metres and centimetres.": "एक रिबन 305 सेंटीमीटर लंबा है। इसकी लंबाई मीटर और सेंटीमीटर में लिखो।",
    "305 cm in m and cm?": "305 सेमी, मी और सेमी में?",
    "Beside metres, centimetres take two places. Which two digits are they?": "मीटर के साथ सेंटीमीटर दो स्थान लेते हैं। वे कौन-से दो अंक हैं?",
    /* the answer boxes, and every word and unit symbol the picture draws */
    "1 m": "1 मी", "1 cm": "1 सेमी",
    "whole m": "पूरे मी", "cm left": "बचे सेमी", "whole cm": "पूरे सेमी", "mm left": "बचे मिमी", "whole km": "पूरे किमी", "m left": "बचे मी",
    "km": "किमी", "m": "मी", "cm": "सेमी", "mm": "मिमी",
    "Step up": "ऊपर जाओ", "Step down": "नीचे जाओ", "Too long to show": "दिखाने को बहुत लंबा",
    "remainder": "शेषफल", "less than 1 km": "1 किमी से कम",
    "ones": "इकाई", "tens": "दहाई", "hundreds": "सैकड़ा", "thousands": "हज़ार", "ten thousands": "दस हज़ार",
  },
  gu: {
    "Unit Ladder": "એકમોની સીડી",
    "A ladder of length units. Which number belongs on each step?": "લંબાઈના એકમોની સીડી. દરેક પગથિયા પર કઈ સંખ્યા આવે?",
    "Each step has its own number, the rest stays in the smaller unit, and every empty place gets a zero.": "દરેક પગથિયાની પોતાની સંખ્યા છે, બાકી નાના એકમમાં રહે છે, અને દરેક ખાલી સ્થાનમાં શૂન્ય આવે છે.",
    "Free play. Tap the card to type any length, then step it up or down the ladder.": "મુક્ત રમત: કાર્ડને અડીને કોઈ પણ લંબાઈ લખો, પછી તેને સીડી પર ઉપર કે નીચે લઈ જાઓ.",
    /* phase 1 */
    "Each step has its own number": "દરેક પગથિયાની પોતાની સંખ્યા",
    "Each step joins two units. Try a number tile on a step.": "દરેક પગથિયું બે એકમોને જોડે છે. કોઈ પગથિયા પર સંખ્યાની ટાઇલ મૂકી જુઓ.",
    "How many of the smaller unit fit into one of the larger?": "મોટા એકમના એકમાં નાના એકમના કેટલા સમાય?",
    "Think of a ruler, a metre stick and a long road. Each step is a different size.": "એક ફૂટપટ્ટી, એક મીટર પટ્ટી અને એક લાંબા રસ્તા વિશે વિચારો. દરેક પગથિયાનું માપ જુદું છે.",
    "Ten millimetres make a centimetre, a hundred centimetres make a metre, and a thousand metres make a kilometre. Each step has its own number.": "10 મિલિમીટરનો 1 સેન્ટિમીટર, 100 સેન્ટિમીટરનો 1 મીટર, અને 1,000 મીટરનો 1 કિલોમીટર બને છે. દરેક પગથિયાની પોતાની સંખ્યા છે.",
    "You learned: 10, 100 and 1,000 each join a different pair of units.": "તમે શીખ્યા: 10, 100 અને 1,000 જુદી જુદી એકમ-જોડીઓને જોડે છે.",
    "A child uses ten for every step and writes 3 metres as 30 centimetres. Check the child: write 3 metres in centimetres.": "એક બાળક દરેક પગથિયા માટે દસ લે છે અને 3 મીટરને 30 સેન્ટિમીટર લખે છે. તપાસો: 3 મીટરને સેન્ટિમીટરમાં લખો.",
    "3 m is how many cm?": "3 મી કેટલા સેમી?",
    "Which two units does this step join?": "આ પગથિયું કયા બે એકમોને જોડે છે?",
    "How many centimetres make a metre, and how many millimetres make a centimetre?": "કેટલા સેન્ટિમીટરનો એક મીટર બને, અને કેટલા મિલિમીટરનો એક સેન્ટિમીટર?",
    "cm in 1 m? mm in 1 cm?": "1 મી માં સેમી? 1 સેમી માં મિમી?",
    "Think of a ruler: count the tiny marks between 0 and 1. A metre stick is a very long ruler.": "ફૂટપટ્ટી વિશે વિચારો: 0 અને 1 વચ્ચેના નાના કાપા ગણો. મીટર પટ્ટી બહુ લાંબી ફૂટપટ્ટી છે.",
    "Which number joins each pair: millimetres and centimetres, centimetres and metres, metres and kilometres? Set each tile, then press Enter.": "દરેક જોડને કઈ સંખ્યા જોડે છે: મિલિમીટર અને સેન્ટિમીટર, સેન્ટિમીટર અને મીટર, મીટર અને કિલોમીટર? દરેક ટાઇલ મૂકો, પછી એન્ટર દબાવો.",
    "Set each tile on its step.": "દરેક ટાઇલ તેના પગથિયે મૂકો.",
    "Start with the bottom step, the two smallest units. Then go up one step at a time.": "સૌથી નીચેના પગથિયાથી શરૂ કરો, સૌથી નાના બે એકમો. પછી એક એક પગથિયું ઉપર જાઓ.",
    /* phase 2 */
    "Larger to smaller: multiply": "મોટાથી નાનો: ગુણાકાર કરો",
    "Step it down. Which number is on this step? Now add on the metres.": "તેને નીચે ઉતારો. આ પગથિયા પર કઈ સંખ્યા છે? હવે મીટર ઉમેરો.",
    "What happens to the smaller part?": "નાના ભાગનું શું થાય?",
    "Start with just one of the larger unit. How many of the smaller unit is that?": "મોટા એકમના માત્ર એકથી શરૂ કરો. તે નાના એકમના કેટલા થાય?",
    "Larger to smaller: multiply the larger part by the step's number, then add the smaller part.": "મોટાથી નાનો: મોટા ભાગને પગથિયાની સંખ્યાથી ગુણો, પછી નાનો ભાગ ઉમેરો.",
    "You learned: larger to smaller, multiply and add the smaller part.": "તમે શીખ્યા: મોટાથી નાનો, ગુણો અને નાનો ભાગ ઉમેરો.",
    "Convert 7 kilometres 245 metres into metres.": "7 કિલોમીટર 245 મીટરને મીટરમાં ફેરવો.",
    "7 km 245 m in metres?": "7 કિમી 245 મી, મીટરમાં?",
    "Which step is the card crossing?": "કાર્ડ કયું પગથિયું પાર કરે છે?",
    "Now 9 metres. How many centimetres is that?": "હવે 9 મીટર. તે કેટલા સેન્ટિમીટર થાય?",
    "9 m in centimetres?": "9 મી, સેન્ટિમીટરમાં?",
    "Read the number painted between metres and centimetres.": "મીટર અને સેન્ટિમીટર વચ્ચે લખેલી સંખ્યા વાંચો.",
    "12 centimetres 7 millimetres. Write it all in millimetres.": "12 સેન્ટિમીટર 7 મિલિમીટર. આખું મિલિમીટરમાં લખો.",
    "12 cm 7 mm in millimetres?": "12 સેમી 7 મિમી, મિલિમીટરમાં?",
    "Multiply the centimetres first, then bring the millimetres along.": "પહેલાં સેન્ટિમીટરનો ગુણાકાર કરો, પછી મિલિમીટર સાથે લાવો.",
    /* phase 3 */
    "Smaller to larger: divide and keep the rest": "નાનાથી મોટો: ભાગો અને બાકી રાખો",
    "How many whole metres are in it? What is left stays in centimetres.": "તેમાં કેટલા પૂરા મીટર છે? જે બાકી રહે તે સેન્ટિમીટરમાં રહે છે.",
    "How many whole larger units fit, and what is left?": "મોટા એકમના કેટલા પૂરા સમાય, અને શું બાકી રહે?",
    "Check it: the whole units times the step's number, plus what is left, must give the card again.": "તપાસો: પૂરા એકમ ગુણ્યા પગથિયાની સંખ્યા, વત્તા બાકી, ફરીથી કાર્ડ આપવું જોઈએ.",
    "Smaller to larger: divide by the step's number. The quotient is the larger unit and the remainder stays as the smaller unit.": "નાનાથી મોટો: પગથિયાની સંખ્યાથી ભાગો. ભાગફળ મોટો એકમ છે અને શેષ નાના એકમમાં રહે છે.",
    "You learned: smaller to larger, divide and keep the rest.": "તમે શીખ્યા: નાનાથી મોટો, ભાગો અને બાકી રાખો.",
    "Write 570 centimetres in metres and centimetres.": "570 સેન્ટિમીટરને મીટર અને સેન્ટિમીટરમાં લખો.",
    "570 cm in m and cm?": "570 સેમી, મી અને સેમીમાં?",
    "Which number joins centimetres and metres?": "સેન્ટિમીટર અને મીટરને કઈ સંખ્યા જોડે છે?",
    "Now 83 millimetres. Change it into centimetres and millimetres.": "હવે 83 મિલિમીટર. તેને સેન્ટિમીટર અને મિલિમીટરમાં ફેરવો.",
    "83 mm in cm and mm?": "83 મિમી, સેમી અને મિમીમાં?",
    "How many whole centimetres fit in 83 millimetres?": "83 મિલિમીટરમાં કેટલા પૂરા સેન્ટિમીટર સમાય?",
    "A path is 4,608 metres long. Write its length in kilometres and metres.": "એક રસ્તો 4,608 મીટર લાંબો છે. તેની લંબાઈ કિલોમીટર અને મીટરમાં લખો.",
    "4,608 m in km and m?": "4,608 મી, કિમી અને મીમાં?",
    "How many whole thousands are in 4,608?": "4,608 માં કેટલા પૂરા હજાર છે?",
    /* phase 4 */
    "A zero that holds a place": "સ્થાન સાચવતો શૂન્ય",
    "The metres fill the tens and the ones. What goes in the hundreds?": "મીટર દશક અને એકમ ભરે છે. શતકમાં શું આવે?",
    "Which boxes are still empty?": "કયાં ખાનાં હજી ખાલી છે?",
    "Write the larger part first. Then fill every place of the smaller part, with a zero where it is empty.": "પહેલાં મોટો ભાગ લખો. પછી નાના ભાગનું દરેક સ્થાન ભરો, જ્યાં ખાલી હોય ત્યાં શૂન્ય.",
    "A zero holds each place the smaller part leaves empty. Beside kilometres the metres take three places.": "નાનો ભાગ જે સ્થાન ખાલી છોડે, તેને શૂન્ય સાચવે છે. કિલોમીટરની સાથે મીટર ત્રણ સ્થાન લે છે.",
    "You learned: an empty place in the smaller part takes a zero.": "તમે શીખ્યા: નાના ભાગના ખાલી સ્થાનમાં શૂન્ય આવે છે.",
    "Convert 6 kilometres 38 metres into metres.": "6 કિલોમીટર 38 મીટરને મીટરમાં ફેરવો.",
    "6 km 38 m in metres?": "6 કિમી 38 મી, મીટરમાં?",
    "How many places do the metres take beside kilometres?": "કિલોમીટરની સાથે મીટર કેટલાં સ્થાન લે છે?",
    "A child writes 9 kilometres 7 metres as 9,700 metres. Write it in metres yourself.": "એક બાળક 9 કિલોમીટર 7 મીટરને 9,700 મીટર લખે છે. તમે જાતે તેને મીટરમાં લખો.",
    "9 km 7 m in metres?": "9 કિમી 7 મી, મીટરમાં?",
    "7 metres takes only the ones place. What must fill the two places before it?": "7 મીટર ફક્ત એકમનું સ્થાન લે છે. તેની પહેલાંનાં બે સ્થાન શાનાથી ભરાશે?",
    "A ribbon is 305 centimetres long. Write its length in metres and centimetres.": "એક રિબન 305 સેન્ટિમીટર લાંબી છે. તેની લંબાઈ મીટર અને સેન્ટિમીટરમાં લખો.",
    "305 cm in m and cm?": "305 સેમી, મી અને સેમીમાં?",
    "Beside metres, centimetres take two places. Which two digits are they?": "મીટરની સાથે સેન્ટિમીટર બે સ્થાન લે છે. તે કયા બે અંક છે?",
    /* the answer boxes, and every word and unit symbol the picture draws */
    "1 m": "1 મી", "1 cm": "1 સેમી",
    "whole m": "પૂરા મી", "cm left": "બાકી સેમી", "whole cm": "પૂરા સેમી", "mm left": "બાકી મિમી", "whole km": "પૂરા કિમી", "m left": "બાકી મી",
    "km": "કિમી", "m": "મી", "cm": "સેમી", "mm": "મિમી",
    "Step up": "ઉપર જાઓ", "Step down": "નીચે જાઓ", "Too long to show": "બતાવવા બહુ લાંબું",
    "remainder": "શેષ", "less than 1 km": "1 કિમીથી ઓછું",
    "ones": "એકમ", "tens": "દશક", "hundreds": "શતક", "thousands": "હજાર", "ten thousands": "દસ હજાર",
  },
};

/* ── the ladder ─────────────────────────────────────────────────────────────────────────────
   rung 0 millimetres at the bottom, then centimetres, metres, kilometres at the top.
   Step s joins rung s and rung s + 1 and carries its own number: 10, 100, 1,000. */
const UL_UNITS = ["mm", "cm", "m", "km"];
const UL_FACT = [10, 100, 1000];
const UL_PLACES = [1, 2, 3];            /* the places the smaller unit takes beside the larger */
const UL_TRAY = [100, 1000, 10];        /* the number tiles in the tray, not in ladder order */
const UL_BIG = CONTENT.hundred;         /* the larger unit of a pair: deep blue */
const UL_SMALL = CONTENT.one;           /* the smaller unit, and what is left over: green */
const UL_ZERO = "#767676";              /* a zero that holds an empty place: grey, full size */
const UL_LANE = 356, UL_SLOTX = 612, UL_KEYX = 866, UL_KEYW = 196;
const UL_PX = 200;                      /* the step panels' centre across the ladder */
const UL_PLACE_NAMES = ["ones", "tens", "hundreds", "thousands", "ten thousands"];
const UL_FREE0 = { rung: 2, q: 4065, rems: {}, typing: null, lit: null, opened: false };
/* three gaps of three different heights (mm-cm the shortest, m-km the tallest), not to scale */
const ulRungY = (r: number) => [352, 272, 168, 40][r];
const ulStepY = (s: number) => [312, 220, 104][s];

/* One entry per phase = one mount.
   says    the teach run, said before anything is asked (numbers are turned into words for the voice)
   ladder  rungs 2 and 3 of the hint ladder (rung 1 is each item's own miss line); never the answer
   closing one closing line for this phase, said once when it goes idle
   learned the summary page's row for this phase: "You learned: ..." (at most 72 characters)
   traceback what the working area redraws after a miss, in one line (for the sidecar)
   items   three a phase. kind: claim · pair · tiles (phase 1) · down (larger to smaller) · up (smaller to larger)
           from = the rung the card starts on; big / small = its two parts (down); total = its length (up);
           near = the misconception (nearMiss); board = the place board is out (phase 4) */
const PHASES = [
  {
    n: 1,
    concept: "Each step has its own number",
    conceptId: "M1.S2.T3.C8", objectiveIds: ["O3"],
    says: ["Each step joins two units. Try a number tile on a step."],
    ladder: ["How many of the smaller unit fit into one of the larger?", "Think of a ruler, a metre stick and a long road. Each step is a different size."],
    closing: "Ten millimetres make a centimetre, a hundred centimetres make a metre, and a thousand metres make a kilometre. Each step has its own number.",
    learned: "You learned: 10, 100 and 1,000 each join a different pair of units.",
    traceback: "A tile on the wrong step slides back, a measured strip shows how many of the smaller unit make one of the larger, the right number settles on the step and the length is written in both units.",
    items: [
      /* learn ML1: answer in the plan = No. 3 m is 300 cm, because a hundred centimetres make a metre */
      { qid: "M1.S2.T3.C8:ML1", kind: "claim", step: 1, count: 3, answer: 300, near: 30, winMs: 3200,
        say: "A child uses ten for every step and writes 3 metres as 30 centimetres. Check the child: write 3 metres in centimetres.",
        ask: "3 m is how many cm?", miss: "Which two units does this step join?" },
      /* practice 1: answer in the plan = 100 cm make a metre, and 10 mm make a centimetre */
      { qid: "M1.S2.T3.C8:1", kind: "pair", parts: [{ label: "1 m", unit: "cm" }, { label: "1 cm", unit: "mm" }], answer: [100, 10], near: "10|10", winMs: 3200,
        say: "How many centimetres make a metre, and how many millimetres make a centimetre?",
        ask: "cm in 1 m? mm in 1 cm?", miss: "Think of a ruler: count the tiny marks between 0 and 1. A metre stick is a very long ruler." },
      /* practice 2: answer in the plan = 10, 100 and 1000 (read bottom step to top step) */
      { qid: "M1.S2.T3.C8:2", kind: "tiles", pad: "enter", answer: "10|100|1000", near: "100|10|1000", winMs: 3200,
        say: "Which number joins each pair: millimetres and centimetres, centimetres and metres, metres and kilometres? Set each tile, then press Enter.",
        ask: "Set each tile on its step.", miss: "Start with the bottom step, the two smallest units. Then go up one step at a time." },
    ],
  },
  {
    n: 2,
    concept: "Larger to smaller: multiply",
    conceptId: "M1.S2.T3.C9", objectiveIds: ["O3"],
    says: ["Step it down. Which number is on this step? Now add on the metres."],
    ladder: ["What happens to the smaller part?", "Start with just one of the larger unit. How many of the smaller unit is that?"],
    closing: "Larger to smaller: multiply the larger part by the step's number, then add the smaller part.",
    learned: "You learned: larger to smaller, multiply and add the smaller part.",
    traceback: "The card goes back to its rung with the step's own number lit, steps down again with the larger part multiplied by that number, and the smaller part comes along and is added on.",
    items: [
      /* learn ML2: answer in the plan = 7245 m */
      { qid: "M1.S2.T3.C9:ML2", kind: "down", from: 3, big: 7, small: 245, answer: 7245, near: 945, winMs: 3600,
        say: "Convert 7 kilometres 245 metres into metres.", ask: "7 km 245 m in metres?", miss: "Which step is the card crossing?" },
      /* practice 3: answer in the plan = 900 cm */
      { qid: "M1.S2.T3.C9:3", kind: "down", from: 2, big: 9, small: 0, answer: 900, near: 90, winMs: 3600,
        say: "Now 9 metres. How many centimetres is that?", ask: "9 m in centimetres?", miss: "Read the number painted between metres and centimetres." },
      /* practice 4: answer in the plan = 127 mm, because 12 cm is 120 mm and 7 mm more makes 127 mm */
      { qid: "M1.S2.T3.C9:4", kind: "down", from: 1, big: 12, small: 7, answer: 127, near: 120, winMs: 3600,
        say: "12 centimetres 7 millimetres. Write it all in millimetres.", ask: "12 cm 7 mm in millimetres?", miss: "Multiply the centimetres first, then bring the millimetres along." },
    ],
  },
  {
    n: 3,
    concept: "Smaller to larger: divide and keep the rest",
    conceptId: "M1.S2.T3.C10", objectiveIds: ["O4"],
    says: ["How many whole metres are in it? What is left stays in centimetres."],
    ladder: ["How many whole larger units fit, and what is left?", "Check it: the whole units times the step's number, plus what is left, must give the card again."],
    closing: "Smaller to larger: divide by the step's number. The quotient is the larger unit and the remainder stays as the smaller unit.",
    learned: "You learned: smaller to larger, divide and keep the rest.",
    traceback: "The card steps up: the quotient climbs to the larger rung and the remainder drops into the slot, the division is written as quotient and remainder, the rebuild gives the card again, and the child's answer is rebuilt under it.",
    items: [
      /* learn ML3: answer in the plan = 5 m 70 cm */
      { qid: "M1.S2.T3.C10:ML3", kind: "up", from: 1, total: 570, parts: [{ label: "whole m", unit: "m" }, { label: "cm left", unit: "cm" }], answer: [5, 70], near: "5|7", winMs: 3800,
        say: "Write 570 centimetres in metres and centimetres.", ask: "570 cm in m and cm?", miss: "Which number joins centimetres and metres?" },
      /* practice 5: answer in the plan = 8 cm 3 mm, because 83 divided by 10 is 8 remainder 3 */
      { qid: "M1.S2.T3.C10:5", kind: "up", from: 0, total: 83, parts: [{ label: "whole cm", unit: "cm" }, { label: "mm left", unit: "mm" }], answer: [8, 3], near: "8|0", winMs: 3800,
        say: "Now 83 millimetres. Change it into centimetres and millimetres.", ask: "83 mm in cm and mm?", miss: "How many whole centimetres fit in 83 millimetres?" },
      /* practice 6: answer in the plan = 4 km 608 m, because 4608 divided by 1000 is 4 remainder 608 */
      { qid: "M1.S2.T3.C10:6", kind: "up", from: 2, total: 4608, parts: [{ label: "whole km", unit: "km" }, { label: "m left", unit: "m" }], answer: [4, 608], near: "46|8", winMs: 3800,
        say: "A path is 4,608 metres long. Write its length in kilometres and metres.", ask: "4,608 m in km and m?", miss: "How many whole thousands are in 4,608?" },
    ],
  },
  {
    n: 4,
    concept: "A zero that holds a place",
    conceptId: "M1.S2.T3.C11", objectiveIds: ["O4"],
    says: ["The metres fill the tens and the ones. What goes in the hundreds?"],
    ladder: ["Which boxes are still empty?", "Write the larger part first. Then fill every place of the smaller part, with a zero where it is empty."],
    closing: "A zero holds each place the smaller part leaves empty. Beside kilometres the metres take three places.",
    learned: "You learned: an empty place in the smaller part takes a zero.",
    traceback: "The place board takes the larger part and the smaller part in their own boxes, the empty box pulses until a grey zero drops into it, and the child's number is laid on a second board beside it.",
    items: [
      /* learn ML4: answer in the plan = 6038 m */
      { qid: "M1.S2.T3.C11:ML4", kind: "down", board: true, from: 3, big: 6, small: 38, answer: 6038, near: 6380, winMs: 3600,
        say: "Convert 6 kilometres 38 metres into metres.", ask: "6 km 38 m in metres?", miss: "How many places do the metres take beside kilometres?" },
      /* practice 7: answer in the plan = No. It is 9007 m. The 7 m fill the ones, so zeros hold the tens and the hundreds */
      { qid: "M1.S2.T3.C11:7", kind: "down", board: true, from: 3, big: 9, small: 7, answer: 9007, near: 9700, winMs: 3600,
        say: "A child writes 9 kilometres 7 metres as 9,700 metres. Write it in metres yourself.", ask: "9 km 7 m in metres?", miss: "7 metres takes only the ones place. What must fill the two places before it?" },
      /* practice 8: answer in the plan = 3 m 5 cm. 305 divided by 100 is 3 remainder 5; the zero was holding the tens, so it is not 3 m 50 cm */
      { qid: "M1.S2.T3.C11:8", kind: "up", board: true, from: 1, total: 305, parts: [{ label: "whole m", unit: "m" }, { label: "cm left", unit: "cm" }], answer: [3, 5], near: "3|50", winMs: 3800,
        say: "A ribbon is 305 centimetres long. Write its length in metres and centimetres.", ask: "305 cm in m and cm?", miss: "Beside metres, centimetres take two places. Which two digits are they?" },
    ],
  },
];

/* The numbers, rows, sizes and targets the working area needs (they go into the sidecar too). */
const MODEL = {
  rungs: ["millimetres", "centimetres", "metres", "kilometres"],
  units: UL_UNITS,
  stepNumbers: UL_FACT,
  tray: UL_TRAY,
  placeBoard: UL_PLACE_NAMES.slice().reverse(),
  freePlayStart: "4,065 m on the metre rung",
};

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* judge: is this value right for this item? (numbers compare as numbers; the tiles as bottom-to-top step numbers) */
const judge = (item: any, v: any) => {
  if (item.parts) return judgeSlotParts(item, v);
  if (item.kind === "tiles") return (Array.isArray(v) ? v.join("|") : String(v ?? "")).replace(/[^0-9|]/g, "") === item.answer;
  return leadNumber(v) === item.answer;
};
/* oracle: every answer re-derived by a second route (sizes in millimetres, division by repeated
   subtraction), sharing no code with judge or Work */
const oracle = () => {
  const mm = [1, 10, 1000, 1000000];
  return PHASES.every((p: any) => p.items.every((it: any) => {
    if (it.kind === "claim") return it.answer === (it.count * mm[it.step + 1]) / mm[it.step];
    if (it.kind === "pair") return it.answer[0] === mm[2] / mm[1] && it.answer[1] === mm[1] / mm[0];
    if (it.kind === "tiles") return it.answer === [mm[1] / mm[0], mm[2] / mm[1], mm[3] / mm[2]].join("|");
    if (it.kind === "down") return it.answer === (it.big * mm[it.from] + it.small * mm[it.from - 1]) / mm[it.from - 1];
    if (it.kind === "up") {
      let rest = it.total * mm[it.from], whole = 0;
      while (rest >= mm[it.from + 1]) { rest -= mm[it.from + 1]; whole += 1; }
      return it.answer[0] === whole && it.answer[1] === rest / mm[it.from];
    }
    return false;
  }));
};
/* the most likely wrong answer (the item's misconception); judge must reject it */
const nearMiss = (item: any) => (item.near !== undefined ? item.near : typeof item.answer === "number" ? item.answer + 1 : "~");
/* the forms of an answer that no question, hint or ladder line may print */
const answerForms = (item: any) => {
  if (item.kind === "tiles") return [item.answer];
  if (item.kind === "up") {
    const words4 = ["millimetres", "centimetres", "metres", "kilometres"];
    return [`${item.answer[0]} ${UL_UNITS[item.from + 1]} ${item.answer[1]} ${UL_UNITS[item.from]}`,
      `${item.answer[0]} ${words4[item.from + 1]} ${item.answer[1]} ${words4[item.from]}`];
  }
  if (item.parts) return item.answer.flatMap((x: number) => [String(x), indian(x), words(x)]);
  return [String(item.answer), indian(item.answer), words(item.answer)];
};
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => item.answer;

/* what the slot shows: the tiles as numbers (bottom step first), a typed number from 1,000 up with its commas */
const ulFormat = (v: any) => {
  const s = String(v ?? "");
  if (/^\d+\|\d+\|\d+$/.test(s)) return s.split("|").map((x) => indian(Number(x))).join(", ");
  return /^[1-9]\d{3,8}$/.test(s) ? indian(Number(s)) : s;
};

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => (T.state().stage === "demo" ? HOOK.demo && HOOK.demo() : T.submit(item.answer));
/* the agent's answer() for an item made on the working area: set it as a child would; undefined = type it */
const answer = (item: any, v: any) => (item.pad === "enter" && HOOK.set ? HOOK.set(v) : undefined);
/* the agent's check() before Enter: e.g. drop a token that waits; undefined = press Enter */
const check = () => (HOOK.check ? HOOK.check() : undefined);

/* ── drawing helpers (called, never mounted) ─────────────────────────────────────────────── */

/* a text's width, estimated from its characters (stage text has no layout engine) */
const ulTw = (s: string, size: number) => {
  let w = 0;
  /* Hindi and Gujarati: a sign written above or below a letter (e, u, the dot, the virama) adds no width;
     a vowel sign written beside it (aa, i, ii, o) adds about a third of a letter */
  for (const ch of String(s)) w += /[ऀ-ं़ु-ै्॑-ॗॢॣઁં઼ુ-ૈ્ૢૣ]/.test(ch) ? 0
    : /[ःा-ीॉ-ौॎॏઃા-ીૉોૌ]/.test(ch) ? 0.38
    : /[ऀ-૿]/.test(ch) ? 0.74
    : ch === " " ? 0.28 : ch === "," || ch === "." ? 0.3 : ch === "m" ? 0.92 : /[0-9×÷+=]/.test(ch) ? 0.62 : 0.58;
  return w * size;
};
const ulSegsW = (segs: any[], size: number) => segs.reduce((a: number, g: any) => a + ulTw(g.s, size), 0) + 0.34 * size * Math.max(0, segs.length - 1);
const ulCol = (C: any, c: string) => (c === "big" ? shade(UL_BIG, 0.25) : c === "small" ? shade(UL_SMALL, 0.25) : c === "zero" ? UL_ZERO : C.ink);
/* a length's digits coloured by the part they came from: the larger part deep blue, the smaller part's
   places green, and a zero that only holds one of those places grey */
function ulDigits(value: number, places: number, small: number): any[] {
  const s = indian(value), sl = small > 0 ? String(small).length : 0;
  const out: any[] = [];
  let pos = 0;
  for (let i = s.length - 1; i >= 0; i--) {
    if (s[i] === ",") { out.unshift({ s: ",", c: "ink" }); continue; }
    out.unshift({ s: s[i], c: pos < places ? (pos < sl ? "small" : "zero") : "big" });
    pos += 1;
  }
  return out;
}
const ulRuns = (cs: any[]) => cs.reduce((a: any[], t: any) => { const l = a[a.length - 1]; if (l && l.c === t.c) l.s += t.s; else a.push({ ...t }); return a; }, []);
/* one row of short texts, each its own label, laid side by side and centred on cx */
function ulLine(key: string, segs: any[], cx: number, y: number, C: any, size: number = T.label) {
  const gap = 0.34 * size;
  const ws = segs.map((g: any) => ulTw(g.s, size));
  let x = cx - ulSegsW(segs, size) / 2;
  return segs.map((g: any, i: number) => {
    const el = (
      <text key={key + "-" + i} x={x} y={y} fontSize={size} fontWeight={700} fill={ulCol(C, g.c)}>
        {g.d ? g.d.map((t: any, j: number) => <tspan key={j} fill={ulCol(C, t.c)}>{t.s}</tspan>) : g.s}
      </text>
    );
    x += ws[i] + gap;
    return el;
  });
}
/* the one invite, as a ring around a whole box so it never crosses a label (the runtime's pulse) */
const ulRing = (x: number, y: number, w: number, h: number, C: any) => (
  <rect className="c4-pulse" x={x} y={y} width={w} height={h} rx={16} fill="none" stroke={C.accent} strokeWidth={5} pointerEvents="none" />
);
/* the card an item starts from, as the book writes it */
const ulCardText = (it: any) => (it.kind === "down" ? `${it.big} ${UL_UNITS[it.from]}${it.small ? ` ${it.small} ${UL_UNITS[it.from - 1]}` : ""}`
  : it.kind === "up" ? `${indian(it.total)} ${UL_UNITS[it.from]}` : "");
/* the item a summary row's last answer came from (answers are unique across the tool) */
const ulFind = (kind: any, ans: any) => {
  for (const p of PHASES as any[]) for (const it of p.items) if (it.kind === kind && JSON.stringify(it.answer) === JSON.stringify(ans)) return it;
  return null;
};

/* ── the working area: 1086 x 528, origin at its top-left ────────────────────────────────────
   The ladder stands at the left (rails x 16-264, rungs y 16-368), the card rides on its rung in the lane
   (x 296-716), a remainder slot sits at the rung's right end (x 720-870), the two step keys at the right
   (x 886-1086), and the bottom band (y 392-528) holds the measured strip, the working or the place board.
   `wrong` = { value, tries } after a miss: lock, redraw the mathematics in three steps (the traceback,
   on a layer that clears on the child's next act), unlock; never mark it, never reset it.
   stage === "free" is Free play: type any length on any rung, step it up or down. */
function Work({ phase, n, item, index, stage, wrong, typed, part, captured, api, MODEL, lang = "en", tx = (v: any) => v }: any) {
  /* every English word the picture draws goes through tx("...") (its key is added to TR); a unit symbol
     drawn on the picture is un(k): km, m, cm, mm in English, the textbook's own symbols in Hindi and Gujarati */
  const un = (k: number) => tx(UL_UNITS[k]);
  const C = api.C;
  const tl = useTimeline();
  const pn = phase && phase.n ? phase.n : n;
  const free = stage === "free";
  const it: any = item || {};
  const won = !free && (stage === "win" || stage === "idle");
  /* playable before answerable: the tiles and the step keys already work while the teach is spoken */
  const live = (stage === "ask" || stage === "teach") && !tl.busy;

  const [tiles, setTiles] = useState<any>({});
  const tilesRef = useRef<any>({});
  const putTiles = (t: any) => { tilesRef.current = t; setTiles(t); };
  const [held, setHeld] = useState<any>(null);
  const [stepped, setStepped] = useState(false);
  const [demo, setDemo] = useState<any>(null);
  const [nudge, setNudge] = useState(false);
  const judged = useRef<any>(null);
  const [fp, setFp] = useState<any>(UL_FREE0);
  const fpRef = useRef<any>(UL_FREE0);
  const putFp = (f: any) => { fpRef.current = f; setFp(f); };

  /* every question opens on its own furniture: tiles in the tray, the card on its rung. What the child
     does during the teach carries into the first question; a restart (a fresh teach) clears it */
  const resetAll = () => { putTiles({}); setHeld(null); setStepped(false); setDemo(null); setNudge(false); judged.current = null; };
  const prevStage = useRef<any>(null);
  useEffect(() => { resetAll(); }, [pn, index, free]);
  useEffect(() => { if (stage === "teach" && prevStage.current !== "teach") resetAll(); prevStage.current = stage; }, [stage]);
  useEffect(() => { if (free) putFp(UL_FREE0); }, [free]);
  /* phase 4 writes a length in metres on a four-box board: the slot takes four digits there */
  useEffect(() => { if (!free && pn === 4 && it.kind === "down" && /^\d{5,}$/.test(String(typed || ""))) api.setTyped(String(typed).slice(0, 4)); }, [typed]);
  /* the runtime took the pad back (a phase change, the summary): the typing on the card ends */
  useEffect(() => { if (!captured && fpRef.current.typing !== null) putFp({ ...fpRef.current, typing: null }); }, [captured]);

  /* the child's act on the working area clears a correction that is standing */
  const act = () => { if (tl.busy) return false; if (demo) setDemo(null); return true; };
  /* phase 1: the steps this question is about */
  const rel = (s: number) => (it.kind === "claim" ? s === it.step : it.kind === "pair" ? s <= 1 : true);

  /* the traceback: three steps, ending on the whole right answer */
  useEffect(() => {
    if (!wrong || stage !== "ask") return;
    api.lock(true);
    const v = wrong.value;
    tl.run([
      [650, () => {
        setDemo({ k: 1, v }); setHeld(null);
        if (pn === 1) {
          const t: any = { ...tilesRef.current };
          Object.keys(t).forEach((k) => { if (rel(t[k]) && UL_FACT[t[k]] !== Number(k)) delete t[k]; });
          putTiles(t);
        }
      }],
      /* the card is left across the step, so Step up / Step down take it back (the answer is typed, so the
         card's place never answers anything) */
      [900, () => { setDemo({ k: 2, v }); if (pn !== 1) setStepped(true); }],
      [900, () => setDemo({ k: 3, v })],
    ], () => api.lock(false));
  }, [wrong]);

  const lv = won ? 3 : demo ? demo.k : 0;
  const mine = !won && demo ? demo.v : null;

  /* ── phase 1: number tiles onto the steps ── */
  const placing = () => {
    const on: any = {};
    Object.keys(tilesRef.current).forEach((k) => { on[tilesRef.current[k]] = Number(k); });
    return [0, 1, 2].every((s) => on[s]) ? [0, 1, 2].map((s) => on[s]).join("|") : null;
  };
  if (!free && it.kind === "tiles") {
    api.onEnter(() => {
      if (tl.busy) return;
      const p = placing();
      /* a step still empty: its panel pulses (nothing is said, so no line hangs on into the win) */
      if (!p) { setNudge(true); return; }
      if (p === judged.current) return;
      judged.current = p;
      api.submit(p);
    });
  } else api.onEnter(null);
  HOOK.set = (v: any) => {
    const vals = (Array.isArray(v) ? v : String(v ?? "").split("|")).map((x: any) => Number(String(x).replace(/[^0-9]/g, "")));
    if (vals.length !== 3 || vals.some((x: number) => UL_FACT.indexOf(x) < 0)) return false;
    const t: any = {};
    vals.forEach((x: number, s: number) => { t[x] = s; });
    putTiles(t); setHeld(null); setDemo(null);
    return true;
  };
  const place = (v: number, s: number) => {
    const t: any = {};
    Object.keys(tilesRef.current).forEach((k) => { if (tilesRef.current[k] !== s) t[k] = tilesRef.current[k]; });
    t[v] = s;
    putTiles(t); setHeld(null); setNudge(false); judged.current = null; api.sfx.tick();
  };
  const unplace = (v: number) => { const t: any = { ...tilesRef.current }; delete t[v]; putTiles(t); setHeld(null); setNudge(false); judged.current = null; };
  const tapTile = (v: number) => {
    const on = tilesRef.current[v];
    if (held === null) { if (on !== undefined) unplace(v); else setHeld(v); return; }
    if (held === v) { setHeld(null); return; }
    if (on !== undefined) place(held, on); else setHeld(v);
  };
  const tapStep = (s: number) => { if (!live || !act()) return; if (held !== null) place(held, s); };
  const drag = useDrag((pl: any, p: any, moved: boolean) => {
    if (!pl || pl.tile === undefined || pn !== 1 || !live || !act()) return;
    if (!moved || !isFinite(p.x)) { tapTile(pl.tile); return; }
    const s = p.x >= 60 && p.x <= 346 ? [0, 1, 2].reduce((b: any, k: number) => (Math.abs(p.y - ulStepY(k)) <= 50 ? k : b), null) : null;
    if (s !== null) place(pl.tile, s);
    else if (tilesRef.current[pl.tile] !== undefined) unplace(pl.tile);
  });
  /* the tray is out on phase 1's teach and on its third question only; the first two are typed */
  const trayOn = !free && pn === 1 && (stage === "teach" || it.kind === "tiles");
  /* where a tile shows: on its step, unless a correction has sent a wrong one back to the tray; once the
     tiles question is won every tile stands on its own step */
  const shownStep = (v: number) => {
    if (!trayOn) return null;
    if (won && it.kind === "tiles") return UL_FACT.indexOf(v);
    const s = tiles[v];
    if (s === undefined) return null;
    if (lv >= 1 && rel(s) && UL_FACT[s] !== v) return null;
    return s;
  };
  /* the number painted on a step (null = blank): always painted after phase 1 */
  const paintAt = (s: number) => {
    if (free || pn !== 1) return UL_FACT[s];
    if (UL_TRAY.some((v) => shownStep(v) === s)) return null;
    return rel(s) && lv >= (it.kind === "tiles" ? 2 : 3) ? UL_FACT[s] : null;
  };
  /* a correction's target on the tiles question: where the child's tile goes, drawn as a ghost, not a tile */
  const ghostAt = (s: number) => !free && pn === 1 && it.kind === "tiles" && !won && paintAt(s) !== null;

  /* ── the ladder ── */
  const ladder = (lit: (s: number) => boolean) => (
    <g>
      {[14, 318].map((x) => <rect key={"rail" + x} x={x} y={6} width={14} height={372} rx={7} fill={tint(C.rule, 0.25)} stroke={shade(C.rule, 0.3)} strokeWidth={2} />)}
      {[0, 1, 2, 3].map((r) => (
        <g key={"rung" + r}>
          <rect x={6} y={ulRungY(r) - 18} width={334} height={36} rx={12} fill={C.panel} stroke={shade(C.rule, 0.3)} strokeWidth={2} />
          <text x={64} y={ulRungY(r) + 11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{un(r)}</text>
        </g>
      ))}
      {[0, 1, 2].map((s) => {
        const v = paintAt(s), on = lit(s), wait = v === null && held !== null && live, ghost = ghostAt(s);
        const tiled = !free && pn === 1 && UL_TRAY.some((t) => shownStep(t) === s);
        return (
          <g key={"step" + s}>
            <rect x={UL_PX - 80} y={ulStepY(s) - 22} width={160} height={44} rx={10} fill="#FFFFFF"
              stroke={on || wait || ghost ? C.accent : shade(C.rule, 0.3)} strokeWidth={on ? 5 : wait || ghost ? 3 : 2}
              strokeDasharray={(v === null && !tiled) || ghost ? "8 7" : undefined} />
            {v !== null && <text x={UL_PX} y={ulStepY(s) + 11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={ghost ? C.accent : C.ink}>{indian(v)}</text>}
          </g>
        );
      })}
    </g>
  );

  /* a measure card riding on rung r */
  const card = (r: number, segs: any[], extra?: any, wFix?: number) => {
    const w = wFix || Math.max(220, Math.round(ulSegsW(segs, T.speech) + 48)), y = ulRungY(r) - 40;
    return (
      <g key="card" style={{ transform: `translate(${UL_LANE}px, ${y}px)`, transition: "transform 420ms ease" } as any}>
        <rect x={0} y={0} width={w} height={80} rx={18} fill="#FFFFFF" stroke={shade(C.rule, 0.3)} strokeWidth={2.5} filter="url(#fShadowSoft)" />
        {ulLine("cd", segs, w / 2, 56, C, T.speech)}
        {extra}
      </g>
    );
  };
  /* the remainder slot at the right end of rung r, labelled with that rung's unit */
  const slotBox = (r: number, val: any, lit: boolean) => {
    const y = ulRungY(r) - 32;
    return (
      <g key={"slot" + r}>
        <rect x={UL_SLOTX} y={y} width={150} height={64} rx={12} fill="#FFFFFF" stroke={lit ? C.accent : shade(C.rule, 0.3)} strokeWidth={lit ? 4 : 2} strokeDasharray={val === null ? "8 7" : undefined} />
        {val !== null && <text x={UL_SLOTX + 82} y={y + 43} textAnchor="end" fontSize={T.label} fontWeight={700} fill={ulCol(C, "small")}>{indian(val)}</text>}
        <text x={UL_SLOTX + 142} y={y + 43} textAnchor="end" fontSize={T.micro} fontWeight={600} fill={C.ink}>{un(r)}</text>
      </g>
    );
  };
  /* the two step keys */
  const stepKeys = (upOn: boolean, downOn: boolean, onUp: any, onDown: any) => (
    <g>
      <Key id="step-up" x={UL_KEYX} y={100} w={UL_KEYW} h={76} C={C} disabled={!upOn} onClick={onUp} label="Step up">
        <path d="M -88 8 L -79 -8 L -70 8 Z" fill={upOn ? C.ink : C.dim} />
        <text x={16} y={11} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={upOn ? C.ink : C.dim}>{tx("Step up")}</text>
      </Key>
      <Key id="step-down" x={UL_KEYX} y={204} w={UL_KEYW} h={76} C={C} disabled={!downOn} onClick={onDown} label="Step down">
        <path d="M -88 -8 L -79 8 L -70 -8 Z" fill={downOn ? C.ink : C.dim} />
        <text x={16} y={11} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={downOn ? C.ink : C.dim}>{tx("Step down")}</text>
      </Key>
    </g>
  );
  /* the place board: one digit to a box, a zero in every empty place of the number */
  const board = (key: string, x0: number, nPl: number, digits: any[], pulse: any = null) => {
    const pitch = 150, bw = 140, y0 = 394, off = nPl - digits.length;
    return (
      <g key={key}>
        {Array.from({ length: nPl }).map((_, i) => {
          const bx = x0 + i * pitch, dg = digits[i - off], name = UL_PLACE_NAMES[nPl - 1 - i], wide = name.length > 9;
          return (
            <g key={i}>
              <text x={wide ? bx + bw : bx + bw / 2} y={y0 + 24} textAnchor={wide ? "end" : "middle"} fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx(name)}</text>
              <rect x={bx} y={y0 + 32} width={bw} height={70} rx={12} fill="#FFFFFF" stroke={shade(C.rule, 0.3)} strokeWidth={2} />
              {dg && dg.s !== "" && <text x={bx + bw / 2} y={y0 + 87} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={ulCol(C, dg.c)}>{dg.s}</text>}
            </g>
          );
        })}
        {pulse !== null && ulRing(x0 + pulse * pitch - 5, y0 + 27, bw + 10, 80, C)}
      </g>
    );
  };
  const plainDigits = (s: string) => s.split("").map((d) => ({ s: d, c: d === "0" ? "zero" : "ink" }));
  const inkDigits = (s: string) => s.split("").map((d) => ({ s: d, c: "ink" }));

  /* ── Free play: type any length on any rung, step it up or down ── */
  if (free) {
    const f = fp, r = f.rung, remKeys = Object.keys(f.rems).map(Number), typing = f.typing !== null;
    /* the board holds five places at most: a step down that would need more is off, and says why */
    const downQ = r > 0 ? f.q * UL_FACT[r - 1] + (f.rems[r - 1] || 0) : 0;
    const upOn = !typing && r < 3, downOn = !typing && r > 0 && downQ <= 99999, tooLong = !typing && r > 0 && downQ > 99999;
    const fpKey = (k: string) => {
      const g = fpRef.current;
      if (g.typing === null) return;
      if (/^[0-9]$/.test(k)) putFp({ ...g, typing: (g.typing === "0" ? "" : g.typing).concat(k).slice(0, 5) });
      else if (k === "back") putFp({ ...g, typing: g.typing.slice(0, -1) });
      else if (k === "clear") putFp({ ...g, typing: "" });
      else if (k === "enter") { api.capture(null); putFp(g.typing === "" ? { ...g, typing: null } : { rung: g.rung, q: Number(g.typing), rems: {}, typing: null, lit: null, opened: true }); }
    };
    const openType = () => { const g = fpRef.current; if (g.typing !== null) return; putFp({ ...g, typing: "", opened: true }); api.capture(fpKey); };
    const fpUp = () => {
      const g = fpRef.current;
      if (g.typing !== null || g.rung >= 3) return;
      const F = UL_FACT[g.rung];
      putFp({ ...g, rung: g.rung + 1, q: Math.floor(g.q / F), rems: { ...g.rems, [g.rung]: g.q % F }, lit: g.rung });
      api.sfx.tick();
    };
    const fpDown = () => {
      const g = fpRef.current;
      if (g.typing !== null || g.rung <= 0) return;
      const k = g.rung - 1, q = g.q * UL_FACT[k] + (g.rems[k] || 0);
      if (q > 99999) return;
      const rems: any = { ...g.rems };
      delete rems[k];
      putFp({ ...g, rung: k, q, rems, lit: k });
      api.sfx.tick();
    };
    /* the board: the whole length in the smallest unit in use, each part's digits in its own colour */
    const low = Math.min(r, ...remKeys);
    const ds: any[] = String(f.q).split("").map((d) => ({ s: d, c: remKeys.length ? "big" : d === "0" ? "zero" : "ink" }));
    for (let k = r - 1; k >= low; k--) {
      const rm = f.rems[k] || 0, pl = UL_PLACES[k], sl = rm > 0 ? String(rm).length : 0;
      String(rm).padStart(pl, "0").split("").forEach((d, i) => ds.push({ s: d, c: i >= pl - sl ? "small" : "zero" }));
    }
    while (ds.length > 1 && ds[0].s === "0") ds.shift();
    /* typing: the digits as a number from 1,000 up (commas), the caret clear of the unit */
    const shownTyping = typing && f.typing !== "" ? indian(Number(f.typing)) : "";
    const segs = typing ? [] : [{ s: `${indian(f.q)} ${un(r)}`, c: remKeys.length ? "big" : "ink" }];
    /* while typing, the digits end at a fixed point (right-aligned), the caret 8 after them and the unit 24
       after: the gaps hold in any font */
    const xd = 24 + Math.max(ulTw(shownTyping, T.speech), 30);
    const w = typing ? Math.max(220, Math.round(xd + 24 + ulTw(un(r), T.speech) + 24)) : Math.max(220, Math.round(ulSegsW(segs, T.speech) + 48));
    const typingEls = typing ? (
      <g>
        <text x={xd} y={56} textAnchor="end" fontSize={T.speech} fontWeight={700} fill={C.ink}>{shownTyping}</text>
        <rect x={xd + 6} y={18} width={4} height={44} fill={C.accent} />
        <text x={xd + 24} y={56} fontSize={T.speech} fontWeight={700} fill={C.ink}>{un(r)}</text>
      </g>
    ) : null;
    const bd = typing ? plainDigits(f.typing) : ds, nPl = Math.max(4, bd.length);
    api.share({ card: `${indian(f.q)} ${UL_UNITS[r]}`, rung: UL_UNITS[r], stepNumber: f.lit === null ? null : UL_FACT[f.lit],
      quotient: null, remainder: null, places: ds.map((d: any) => d.s).join(""), complete: false });
    return (
      <g>
        {ladder((s: number) => s === f.lit)}
        {[0, 1, 2].filter((k) => k < r).map((k) => slotBox(k, !typing && f.rems[k] !== undefined ? f.rems[k] : null, false))}
        {card(r, segs, typingEls, typing ? w : undefined)}
        <Hit id="card" x={UL_LANE} y={ulRungY(r) - 40} w={w} h={80} onPress={openType} label="Type a new length" enabled={!captured} />
        {!f.opened && !typing && ulRing(UL_LANE - 5, Math.max(2, ulRungY(r) - 45), w + 10, 90 - Math.max(0, 47 - ulRungY(r)), C)}
        {stepKeys(upOn, downOn, fpUp, fpDown)}
        {tooLong && <text x={UL_KEYX + UL_KEYW} y={320} textAnchor="end" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("Too long to show")}</text>}
        {nPl <= 5 && board("fb", nPl === 5 ? 173 : 248, nPl, bd)}
      </g>
    );
  }

  /* ── phase 1: the tray, the tiles and the measured strips ── */
  if (pn === 1) {
    const trayX = (v: number) => 392 + 180 * UL_TRAY.indexOf(v);
    const tile = (v: number) => {
      const d = drag.drag && drag.drag.payload && drag.drag.payload.tile === v && drag.drag.moved && live ? drag.drag : null;
      const s = shownStep(v), isHeld = held === v;
      const x = d ? d.x - 80 : s === null ? trayX(v) : UL_PX - 80;
      const y = d ? d.y - 36 : s === null ? 184 : ulStepY(s) - 36;
      return (
        <g key={"tile" + v} {...control("tile-" + v, "number tile " + indian(v))} {...drag.bind({ tile: v })} {...drag.keys({ tile: v })} transform={`translate(${x},${y})`}>
          <rect x={0} y={0} width={160} height={72} fill="transparent" />
          <rect x={0} y={14} width={160} height={44} rx={10} fill="url(#gCard)" stroke={isHeld ? C.accent : shade(C.rule, 0.35)} strokeWidth={isHeld ? 4 : 2}
            filter={d || isHeld ? "url(#fLift)" : "url(#fShadowSoft)"} />
          <text x={80} y={47} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{indian(v)}</text>
        </g>
      );
    };
    const strip = (key: string, s: number, x: number, w: number, every: number) => {
      const F = UL_FACT[s], seg = w / 10, y0 = 398;
      return (
        <g key={key}>
          <rect x={x} y={y0} width={w} height={44} rx={6} fill={tint(UL_BIG, 0.8)} stroke={shade(UL_BIG, 0.25)} strokeWidth={2} />
          {Array.from({ length: 9 }).map((_, i) => (
            <line key={"t" + i} x1={x + seg * (i + 1)} y1={y0 + (i === 4 ? 24 : 30)} x2={x + seg * (i + 1)} y2={y0 + 44} stroke={shade(UL_BIG, 0.25)} strokeWidth={2} />
          ))}
          <text x={x + 10} y={y0 + 25} fontSize={T.micro} fontWeight={700} fill={shade(UL_BIG, 0.3)}>{"1 " + un(s + 1)}</text>
          {Array.from({ length: 10 }).map((_, i) => ((i + 1) % every === 0
            ? <text key={"l" + i} x={x + seg * (i + 1)} y={y0 + 76} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={ulCol(C, "small")}>{indian((F / 10) * (i + 1))}</text>
            : null))}
        </g>
      );
    };
    const fact = (key: string, big: string, small: string, cx: number, y: number, bigFirst = true) =>
      ulLine(key, bigFirst ? [{ s: big, c: "big" }, { s: "=", c: "ink" }, { s: small, c: "small" }] : [{ s: small, c: "small" }, { s: "=", c: "ink" }, { s: big, c: "big" }], cx, y, C);
    /* the steps a tiles correction was about: the ones the child's tiles got wrong */
    const wrongSteps = it.kind === "tiles" && mine !== null ? String(mine).split("|").map(Number).map((x, k) => (x !== UL_FACT[k] ? k : -1)).filter((k) => k >= 0) : [];
    const bottom = () => {
      if (it.kind === "claim") return (
        <g>
          {lv >= 2 && strip("s1", 1, 20, 960, 1)}
          {lv >= 2 && fact("f1", `1 ${un(2)}`, `100 ${un(1)}`, 250, 514)}
          {lv >= 3 && fact("f2", `${it.count} ${un(2)}`, `${indian(it.answer)} ${un(1)}`, 770, 514)}
        </g>
      );
      if (it.kind === "pair") return (
        <g>
          {lv >= 2 && strip("s0", 0, 20, 460, 2)}
          {lv >= 2 && strip("s1", 1, 540, 460, 2)}
          {lv >= 3 && fact("f0", `1 ${un(1)}`, `10 ${un(0)}`, 250, 514)}
          {lv >= 3 && fact("f1", `1 ${un(2)}`, `100 ${un(1)}`, 770, 514)}
        </g>
      );
      /* the tiles question: first why (a strip for each step the tiles got wrong), then the three facts */
      const n = wrongSteps.length, sw = n === 1 ? 960 : n === 2 ? 460 : 300, gap = n === 2 ? 60 : 40;
      const strips = lv >= 2 && n > 0;
      return (
        <g>
          {strips && wrongSteps.map((k, j) => strip("w" + k, k, 20 + j * (sw + gap), sw, k === 2 ? (n === 3 ? 5 : n === 2 ? 2 : 1) : n === 1 ? 1 : 2))}
          {lv >= 3 && fact("f0", `1 ${un(1)}`, `10 ${un(0)}`, 170, strips ? 514 : 452, false)}
          {lv >= 3 && fact("f1", `1 ${un(2)}`, `100 ${un(1)}`, 510, strips ? 514 : 452, false)}
          {lv >= 3 && fact("f2", `1 ${un(3)}`, `1,000 ${un(2)}`, 850, strips ? 514 : 452, false)}
        </g>
      );
    };
    /* the one invite: the blank step the teach or the question points at (Q2: the step of the box with
       the caret), and after an Enter with a step still empty, that empty step */
    const inTray = UL_TRAY.filter((v) => shownStep(v) === null);
    let ring: any = null;
    if ((stage === "ask" || stage === "teach") && !demo) {
      if (trayOn) {
        const empty = [0, 1, 2].filter((s) => !UL_TRAY.some((v) => shownStep(v) === s));
        if (nudge && empty.length) ring = empty[0];
        else if (held === null && inTray.length === 3) ring = stage === "teach" ? 1 : 2;
      } else if (stage === "ask") ring = it.kind === "pair" ? (part === 1 ? 0 : 1) : it.step;
    }
    api.share({ card: "", rung: null, stepNumber: null, quotient: null, remainder: null, places: null, complete: stage === "idle" });
    return (
      <g>
        {ladder((s: number) => lv >= 1 && lv < 3 && rel(s))}
        {trayOn && inTray.length > 0 && <rect x={376} y={168} width={552} height={104} rx={20} fill={tint(C.panel, 0.45)} stroke={C.rule} strokeWidth={2} />}
        {trayOn && UL_TRAY.map((v) => tile(v))}
        {trayOn && live && [0, 1, 2].filter((s) => !UL_TRAY.some((v) => shownStep(v) === s)).map((s) => (
          <Hit key={"hit" + s} id={"step-" + s} x={UL_PX - 84} y={ulStepY(s) - 36} w={168} h={72} onPress={() => tapStep(s)}
            label={"step between " + UL_UNITS[s] + " and " + UL_UNITS[s + 1]} />
        ))}
        <g pointerEvents="none">{bottom()}</g>
        {ring !== null && ulRing(UL_PX - 86, ulStepY(ring) - 27, 172, 54, C)}
      </g>
    );
  }

  /* ── phases 2 to 4: the card steps across one step ── */
  const up = it.kind === "up", r0 = it.from, r1 = up ? r0 + 1 : r0 - 1, s = up ? r0 : r0 - 1, F = UL_FACT[s];
  const across = lv >= 2 ? true : lv === 1 ? false : stepped;
  const q = up ? Math.floor(it.total / F) : 0, rem = up ? it.total % F : 0;
  const resultRuns = () => ulRuns(ulDigits(it.answer, UL_PLACES[s], it.small));
  /* before any answer a card that has crossed shows only its new unit ("? m"), with the step's number lit:
     the operation and its numbers are the child's to find. The working appears in a correction and at the win */
  let segs: any[];
  if (!up) {
    if (!across) segs = [{ s: `${it.big} ${un(r0)}`, c: "big" }].concat(it.small ? [{ s: `${it.small} ${un(r1)}`, c: "small" }] : []);
    else if (lv === 0) segs = [{ s: `? ${un(r1)}`, c: "ink" }];
    else if (lv < 3) segs = [{ s: `${it.big} × ${indian(F)} ${un(r1)}`, c: "big" }].concat(it.small ? [{ s: "+", c: "ink" }, { s: `${it.small} ${un(r1)}`, c: "small" }] : []);
    else segs = [{ s: `${indian(it.answer)} ${un(r1)}`, d: resultRuns().concat([{ s: " " + un(r1), c: "ink" }]) }];
  } else {
    if (!across) segs = [{ s: `${indian(it.total)} ${un(r0)}`, c: "ink" }];
    else if (lv < 2) segs = [{ s: `? ${un(r1)}`, c: "ink" }];
    else segs = [{ s: `${q} ${un(r1)}`, c: "big" }];
  }
  const dirUp = up ? !stepped : stepped, dirDown = up ? stepped : !stepped;
  const stepPress = () => { if (!live || !act()) return; setStepped(!stepped); api.sfx.tick(); };

  /* the child's own answer, rebuilt beside the right one (a correction only) */
  const mp = mine !== null && up ? slotPartsOf(mine, 2) : null;
  const mineUp = mp && mp[0] !== "" && mp[1] !== "" && (Number(mp[0]) !== q || Number(mp[1]) !== rem) ? [Number(mp[0]), Number(mp[1])] : null;
  const mineN = mine !== null && !up ? leadNumber(mine) : null;
  const mineDown = mineN !== null && mineN !== it.answer && String(mineN).length <= 4 ? mineN : null;
  /* smaller to larger, as the book lays it out: the division (from the correction's second step), the
     rebuild back to the card (third step), and in a correction the child's answer rebuilt in ink */
  const upWorking = (cx: number) => [
    lv >= 2 ? ulLine("dv", [{ s: `${indian(it.total)} ÷ ${indian(F)}`, c: "ink" }, { s: `= ${q}`, c: "big" }, { s: `${tx("remainder")} ${indian(rem)}`, c: "small" }], cx, 428, C) : null,
    lv >= 3 ? ulLine("rb", [{ s: `${q} × ${indian(F)}`, c: "big" }, { s: `+ ${indian(rem)}`, c: "small" }, { s: `= ${indian(it.total)} ${un(r0)}`, c: "ink" }], cx, 468, C) : null,
    lv >= 3 && mineUp ? ulLine("mn", [{ s: `${mineUp[0]} ${un(r1)} ${mineUp[1]} ${un(r0)}`, c: "ink" }, { s: `= ${indian(mineUp[0] * F + mineUp[1])} ${un(r0)}`, c: "ink" }], cx, 508, C) : null,
  ];
  const bottom = () => {
    if (it.board && !up) {
      /* the board holds what the child typed; a correction lays the child's number in its places, then
         fills the right one: the larger part, the smaller part, a pulse on the empty box, a grey zero into it */
      if (lv >= 2) {
        const all = ulDigits(it.answer, UL_PLACES[s], it.small).filter((t: any) => t.s !== ",");
        const ds = lv === 2 ? all.map((t: any) => (t.c === "zero" ? { s: "", c: "zero" } : t)) : all;
        const gap = ds.findIndex((t: any) => t.s === "");
        /* the child's number read in the two units (under 1 km it is just less than one) */
        const note = mineN === null || mineN === it.answer ? null : mineN >= F
          ? [{ s: `= ${Math.floor(mineN / F)} ${un(r0)}`, c: "ink" }, { s: `${mineN % F} ${un(r1)}`, c: "ink" }]
          : [{ s: tx(`less than 1 ${UL_UNITS[r0]}`), c: "ink" }];
        return [board("bR", 248, 4, ds, gap >= 0 ? gap + 4 - ds.length : null),
          lv >= 3 && note ? [
            ulLine("cA", [{ s: `${indian(mineN)} ${un(r1)}`, c: "ink" }], 965, 444, C),
            ulLine("cB", note, 965, 496, C),
          ] : null];
      }
      const t = lv === 1 && mineDown !== null ? String(mineDown) : String(typed || "").replace(/\D/g, "");
      return board("bT", 248, 4, t.length <= 4 ? plainDigits(t) : []);
    }
    if (it.board && up) {
      /* the card's length in its places, all in ink until the answer: where metres end and centimetres
         begin is the child's to decide; from the correction's second step the parts take their colours */
      const ds = lv >= 2 ? ulDigits(it.total, UL_PLACES[s], rem) : inkDigits(String(it.total));
      return [board("bU", lv >= 1 ? 10 : 323, 3, ds), upWorking(765)];
    }
    if (up) return upWorking(540);
    if (lv < 2) return null;
    return [
      ulLine("w1", [{ s: `${it.big} × ${indian(F)}`, c: "big" }].concat(it.small ? [{ s: `+ ${it.small}`, c: "small" }] : []), 540, 444, C),
      lv >= 3 ? ulLine("w2", [{ s: `= ${indian(it.answer)} ${un(r1)}`, d: [{ s: "= ", c: "ink" }].concat(resultRuns(), [{ s: " " + un(r1), c: "ink" }]) }], 540, 496, C) : null,
    ];
  };
  const invite = (stage === "ask" || stage === "teach") && !demo && !stepped;
  api.share({ card: ulCardText(it), rung: UL_UNITS[across ? r1 : r0], stepNumber: across ? F : null,
    quotient: won && up ? q : null, remainder: won && up ? rem : null,
    places: won && it.board ? (up ? String(it.total) : String(it.answer)) : null, complete: stage === "idle" });
  return (
    <g>
      {ladder((k: number) => k === s && ((lv >= 1 && lv < 3) || (lv === 0 && across)))}
      <g pointerEvents="none">
        {up && slotBox(r0, lv >= 2 ? rem : null, lv === 2)}
        {card(across ? r1 : r0, segs)}
        {bottom()}
      </g>
      {stepKeys(live && dirUp, live && dirDown, stepPress, stepPress)}
      {invite && ulRing(UL_KEYX - 3, (up ? 100 : 204) - 5, UL_KEYW + 4, 91, C)}
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase:
   result.last = { value, answer, kind, item, shared } (shared = what api.share held at that moment) */
function Thumb({ result, C, w, h, lang = "en", tx = (v: any) => v }: any) {
  const last = result && result.last;
  if (!last) return null;
  const it: any = ulFind(last.kind, last.answer);
  if (!it) return null;
  /* unit symbols in the language in use (the textbook's own in Hindi and Gujarati) */
  const U = UL_UNITS.map((u) => tx(u));
  const frame = <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />;
  /* phase 1: the three step numbers as the ladder paints them */
  if (it.kind === "tiles") {
    const ws = [52, 66, 86], x0 = (w - (52 + 66 + 86 + 16)) / 2, y0 = (h - 44) / 2;
    return (
      <g>{frame}{UL_FACT.map((v, k) => {
        const x = x0 + ws.slice(0, k).reduce((a, b) => a + b + 8, 0);
        return (<g key={k}><rect x={x} y={y0} width={ws[k]} height={44} rx={8} fill="#FFFFFF" stroke={shade(C.rule, 0.3)} strokeWidth={1.5} />
          <text x={x + ws[k] / 2} y={y0 + 32} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={C.ink}>{indian(v)}</text></g>);
      })}</g>
    );
  }
  /* phase 4: the length in the smaller unit on a small place board, the holding zero grey */
  if (it.board) {
    const up = it.kind === "up", places = UL_PLACES[up ? it.from : it.from - 1];
    const ds = (up ? ulDigits(it.total, places, it.answer[1]) : ulDigits(it.answer, places, it.small)).filter((t: any) => t.s !== ",");
    const unit = U[up ? it.from : it.from - 1], bw = 40, pitch = 45, tot = ds.length * pitch - 5 + 10 + 40, x0 = (w - tot) / 2, y0 = (h - 46) / 2;
    return (
      <g>{frame}{ds.map((t: any, k: number) => (
        <g key={k}><rect x={x0 + k * pitch} y={y0} width={bw} height={46} rx={7} fill="#FFFFFF" stroke={shade(C.rule, 0.3)} strokeWidth={1.5} />
          <text x={x0 + k * pitch + bw / 2} y={y0 + 34} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={ulCol(C, t.c)}>{t.s}</text></g>
      ))}
        <text x={x0 + ds.length * pitch + 5} y={y0 + 34} fontSize={T.micro} fontWeight={600} fill={C.ink}>{unit}</text>
      </g>
    );
  }
  /* the others: the card, then the answer, each unit in its own colour */
  const B = "big", S = "small", I = "ink";
  const rows: any[][] = it.kind === "claim" ? [[[`${it.count} ${U[2]}`, B]], [["= ", I], [`${indian(it.answer)} ${U[1]}`, S]]]
    : it.kind === "pair" ? [[[`1 ${U[2]} `, B], ["= ", I], [`100 ${U[1]}`, S]], [[`1 ${U[1]} `, B], ["= ", I], [`10 ${U[0]}`, S]]]
    : it.kind === "down" ? [[[`${it.big} ${U[it.from]}`, B]].concat(it.small ? [[` ${it.small} ${U[it.from - 1]}`, S]] : []),
      [["= ", I]].concat(ulRuns(ulDigits(it.answer, UL_PLACES[it.from - 1], it.small)).map((t: any) => [t.s, t.c]), [[` ${U[it.from - 1]}`, I]])]
    : [[[`${indian(it.total)} ${U[it.from]}`, I]], [["= ", I], [`${it.answer[0]} ${U[it.from + 1]}`, B], [` ${it.answer[1]} ${U[it.from]}`, S]]];
  return (
    <g>
      {frame}
      {rows.map((row, k) => (
        <text key={k} x={w / 2} y={k === 0 ? h / 2 - 6 : h / 2 + 28} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={C.ink}>
          {row.map((t: any, j: number) => <tspan key={j} fill={ulCol(C, t[1])}>{t[0]}</tspan>)}
        </text>
      ))}
    </g>
  );
}

function UnitLadder(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, format: ulFormat, fitHost: () => null }} />
  );
}

export default UnitLadder;
