/* ═══ M1.S1.T2.C4.2D1 · tenth_strip · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists: header + its three controls, canvas, slot + pad, bubble + mascot,
   phase dots (user / AI mode), window.toolApi, sounds, the synced voice, scoring, the events,
   idle and restart. NO imports in this file; only the five host hooks. Follow docs/LAYOUT.md.
   Edit, never rewrite. Built by `node cli.mjs scaffold`; concepts are verbatim (check compares them). */

const TOOL_ID = "tenth_strip";
const MEDIA_ID = "M1.S1.T2.C4.2D1";
const TOOL_NAME = "Tenth Strip";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
const VOICE = {"rate":0.92,"pitch":1.06};

/* spoken before phase 1's teach lines only (the plan's opening voice line) */
const OPENING = ["A long strip, and nothing cut yet."];
/* the whole-tool line: spoken on the summary page */
const FINISH_LINE = "Every share written twice over, and the zero standing in the ones place each time.";
/* said when the child opens Free play from the summary page (the plan's free-play voice line) */
const FREE_LINE = "Free play. Name a whole, cut it, colour any pieces, and both writings follow.";

/* Hindi and Gujarati, keyed by the English line exactly (runtime r21: `lineFor(line, lang, TR)`); the English
   everywhere else stays what the checks read. Terms follow NCERT class 4: decimal दशमलव / દશાંશ, decimal point
   दशमलव बिंदु / દશાંશ ચિહ્ન, tenth दसवाँ भाग / દશમો ભાગ, hundredth सौवाँ भाग / સોમો ભાગ, whole पूर्ण / પૂર્ણ.
   Digits stay digits (the runtime speaks 0.3 as words). A first draft; wants a native speaker's read. */
const TR: any = {
  hi: {
    "Tenth Strip": "दसवाँ भाग पट्टी",
    "A long strip, and nothing cut yet.": "एक लंबी पट्टी, और अभी कुछ कटा नहीं है।",
    "Every share written twice over, and the zero standing in the ones place each time.": "हर हिस्सा दो बार लिखा गया, और हर बार इकाई के स्थान पर शून्य खड़ा रहा।",
    "Free play. Name a whole, cut it, colour any pieces, and both writings follow.": "मुक्त खेल। एक पूर्ण का नाम चुनो, उसे काटो, कोई भी टुकड़े रंग दो, और दोनों रूप साथ-साथ बदलेंगे।",
    /* phase 1 */
    "Splitting one into ten equal parts": "एक को दस बराबर भागों में बाँटना",
    "Nothing is a tenth on its own. Say what this strip is, then cut it into ten.": "कोई भी टुकड़ा अकेले दसवाँ भाग नहीं होता। बताओ यह पट्टी क्या है, फिर इसे दस भागों में काटो।",
    "Are they all the same size?": "क्या ये सब एक ही माप के हैं?",
    "Stand two pieces side by side. Is one longer?": "दो टुकड़े साथ-साथ खड़े करो। क्या एक लंबा है?",
    "One whole cut into ten equal parts gives tenths, and the parts must be the same size.": "एक पूर्ण को दस बराबर भागों में काटने से दसवें भाग बनते हैं, और सब भाग एक ही माप के होने चाहिए।",
    "You learned: ten equal parts of one whole are tenths.": "तुमने सीखा: एक पूर्ण के दस बराबर भाग दसवें भाग होते हैं।",
    "Write the coloured part": "रंगा हुआ भाग लिखो",
    "Name this strip, cut it into ten equal pieces, then colour six of them. Write the coloured part as a fraction.": "इस पट्टी का नाम चुनो, इसे दस बराबर टुकड़ों में काटो, फिर छह टुकड़ों में रंग भरो। रंगे हुए भाग को भिन्न के रूप में लिखो।",
    "How many pieces is this strip cut into?": "यह पट्टी कितने टुकड़ों में कटी है?",
    "Write it with a point": "इसे दशमलव बिंदु से लिखो",
    "This ribbon is already cut into ten. Colour three pieces and write that part with a point.": "यह रिबन पहले से दस भागों में कटा है। तीन टुकड़ों में रंग भरो और उस भाग को दशमलव बिंदु से लिखो।",
    "Count the coloured pieces again, slowly.": "रंगे हुए टुकड़े फिर से गिनो, धीरे-धीरे।",
    "Is a short piece a tenth?": "क्या छोटा टुकड़ा दसवाँ भाग है?",
    "No": "नहीं", "Yes": "हाँ",
    "This strip was folded by eye, so two pieces came out longer. Can a short piece be called one tenth?": "यह पट्टी अंदाज़ से मोड़ी गई थी, इसलिए दो टुकड़े लंबे निकले। क्या छोटे टुकड़े को एक दसवाँ भाग कह सकते हैं?",
    "Stand the pieces against one another and look.": "टुकड़ों को एक-दूसरे के पास रखकर देखो।",
    /* phase 2 */
    "The same amount, written with a point": "उतनी ही मात्रा, दशमलव बिंदु से लिखी",
    "Write it over ten. Now write the very same thing with a point.": "इसे दस भागों वाली भिन्न में लिखो। अब ठीक वही दशमलव बिंदु से लिखो।",
    "Which part of the strip did you colour?": "तुमने पट्टी का कौन सा भाग रंगा?",
    "The point splits the whole ones from the pieces of one.": "बिंदु पूरी इकाइयों को एक के टुकड़ों से अलग करता है।",
    "A share written over ten and a share written with a point say one amount.": "दस भागों वाली भिन्न में लिखा हिस्सा और बिंदु से लिखा हिस्सा, एक ही मात्रा बताते हैं।",
    "You learned: a fraction over ten and a decimal say one amount.": "तुमने सीखा: दस भागों वाली भिन्न और दशमलव एक ही मात्रा बताते हैं।",
    "Colour four of the ribbon's ten lengths, then write that part with a point.": "रिबन की दस लंबाइयों में से चार में रंग भरो, फिर उस भाग को दशमलव बिंदु से लिखो।",
    "How many lengths did you colour?": "तुमने कितनी लंबाइयों में रंग भरा?",
    "The milk stands at the eighth mark. Colour up to it and write the amount with a point.": "दूध आठवें निशान पर है। वहाँ तक रंग भरो और मात्रा को दशमलव बिंदु से लिखो।",
    "Which mark is the milk standing at?": "दूध किस निशान पर है?",
    "Tap the decimal point": "दशमलव बिंदु पर टैप करो",
    "This number says seven tenths. Tap the part of it that is the decimal point.": "यह संख्या सात दसवें भाग बताती है। इसका वह भाग टैप करो जो दशमलव बिंदु है।",
    "Which part of it is not a digit at all?": "इसका कौन सा भाग अंक है ही नहीं?",
    /* phase 3 */
    "Counting more than one tenth": "एक से ज़्यादा दसवें भाग गिनना",
    "How many tenths are coloured? That is the digit after the point.": "कितने दसवें भाग रंगे हैं? वही बिंदु के बाद का अंक है।",
    "Which column does that count go in?": "यह गिनती किस खाने में जाती है?",
    "Go along the strip from the left and count as you go.": "पट्टी पर बाईं ओर से चलो और गिनते जाओ।",
    "The digit after the point counts how many tenths there are.": "बिंदु के बाद का अंक बताता है कि कितने दसवें भाग हैं।",
    "You learned: the digit after the point counts the tenths.": "तुमने सीखा: बिंदु के बाद का अंक दसवें भाग गिनता है।",
    "A garden is divided into ten equal beds. Colour the seven planted beds and write that part with a point.": "एक बगीचा दस बराबर क्यारियों में बँटा है। बोई हुई सात क्यारियों में रंग भरो और उस भाग को दशमलव बिंदु से लिखो।",
    "Which beds are you counting, the planted ones or the rest?": "तुम कौन सी क्यारियाँ गिन रहे हो, बोई हुई या बाकी?",
    "A chapati is cut into ten equal parts and five are eaten. Colour the eaten parts and write them with a point.": "एक रोटी दस बराबर भागों में कटी है और पाँच भाग खा लिए गए। खाए गए भागों में रंग भरो और उन्हें दशमलव बिंदु से लिखो।",
    "Count the parts that were eaten.": "खाए गए भाग गिनो।",
    "Write the plain part": "बिना रंग का भाग लिखो",
    "Nine of this ribbon's ten pieces are coloured. Write the part that is left plain with a point.": "इस रिबन के दस टुकड़ों में से नौ रंगे हैं। जो भाग बिना रंग का बचा है, उसे दशमलव बिंदु से लिखो।",
    "The question asks for the plain pieces, not the coloured ones.": "प्रश्न बिना रंग वाले टुकड़े पूछ रहा है, रंगे हुए नहीं।",
    /* phase 4 */
    "What the zero in front is for": "आगे का शून्य किसलिए है",
    "Something is missing in front of the point. What is it holding?": "बिंदु के आगे कुछ छूटा है। वह किसे थामे रखता है?",
    "How many ones are there in front of the point?": "बिंदु के आगे कितनी इकाइयाँ हैं?",
    "Read it from the left: the column before the point comes first.": "बाईं ओर से पढ़ो: बिंदु से पहले का खाना सबसे पहले आता है।",
    "The zero before the point holds the ones place open and says there are no whole ones.": "बिंदु से पहले का शून्य इकाई का स्थान खुला रखता है और बताता है कि कोई पूरी इकाई नहीं है।",
    "You learned: the zero in front holds the ones place open.": "तुमने सीखा: आगे का शून्य इकाई का स्थान खुला रखता है।",
    "Write it properly": "इसे सही ढंग से लिखो",
    "A price in a shop is written as a bare point and a six, with nothing in front of the point. Write that price properly.": "दुकान में एक कीमत सिर्फ़ बिंदु और छह के रूप में लिखी है, बिंदु के आगे कुछ नहीं है। उस कीमत को सही ढंग से लिखो।",
    "Which column stands in front of the point?": "बिंदु के आगे कौन सा खाना है?",
    "What is missing?": "क्या छूटा है?",
    "the whole": "पूर्ण", "the tenths": "दसवें भाग", "the point": "दशमलव बिंदु",
    "A friend spent two tenths of their pocket money on a pen. What must you be told before you can say the rupees?": "एक दोस्त ने अपने जेब खर्च के दो दसवें भाग से पेन खरीदा। रुपये बताने के लिए तुम्हें पहले क्या जानना होगा?",
    "A share is always a share of something.": "हिस्सा हमेशा किसी चीज़ का हिस्सा होता है।",
    "Write the label properly": "लेबल सही ढंग से लिखो",
    "A weight label reads as a bare point and a four, with kilograms after it. Write the label properly.": "वज़न के लेबल पर सिर्फ़ बिंदु और चार लिखा है, उसके बाद किलोग्राम। लेबल को सही ढंग से लिखो।",
    "How many kilograms, before any part of one?": "एक के किसी भाग से पहले कितने किलोग्राम?",
    /* the working area's own words; "no" "yes" "whole" "tenths" "point" are what the slot shows after a choice */
    "written": "लिखे गए", "free": "मुक्त",
    "ribbon": "रिबन", "chapati": "रोटी", "milk": "दूध", "garden": "बगीचा",
    "Measure": "नापो", "By eye": "अंदाज़ से",
    "ones": "इकाई", "tenths": "दसवें भाग", "hundredths": "सौवें भाग",
    "one whole": "एक पूर्ण", "pieces": "टुकड़े",
    "cut by eye": "अंदाज़ से कटे", "your pieces": "तुम्हारे टुकड़े", "cut to ten": "दस में कटे", "ten times apart": "दस गुना अलग",
    "decimal point": "दशमलव बिंदु", "name the whole": "पूर्ण का नाम बताओ", "not the same size": "एक माप के नहीं",
    "a share of what?": "किसका हिस्सा?", "coloured": "रंगा हुआ", "plain": "बिना रंग", "ones place held": "इकाई का स्थान थामे",
    "kg": "किग्रा",
    "no": "नहीं", "yes": "हाँ", "whole": "पूर्ण", "point": "दशमलव बिंदु",
  },
  gu: {
    "Tenth Strip": "દશમો ભાગ પટ્ટી",
    "A long strip, and nothing cut yet.": "એક લાંબી પટ્ટી, અને હજી કંઈ કપાયું નથી.",
    "Every share written twice over, and the zero standing in the ones place each time.": "દરેક ભાગ બે વાર લખ્યો, અને દરેક વખતે એકમના સ્થાને શૂન્ય ઊભું રહ્યું.",
    "Free play. Name a whole, cut it, colour any pieces, and both writings follow.": "મુક્ત રમત. એક પૂર્ણનું નામ પસંદ કરો, તેને કાપો, કોઈ પણ ટુકડામાં રંગ પૂરો, અને બંને રૂપ સાથે બદલાશે.",
    /* phase 1 */
    "Splitting one into ten equal parts": "એકને દસ સરખા ભાગમાં વહેંચવું",
    "Nothing is a tenth on its own. Say what this strip is, then cut it into ten.": "કોઈ ટુકડો એકલો દશમો ભાગ નથી હોતો. કહો કે આ પટ્ટી શું છે, પછી તેના દસ ભાગ કરો.",
    "Are they all the same size?": "શું આ બધા એક જ માપના છે?",
    "Stand two pieces side by side. Is one longer?": "બે ટુકડા બાજુ બાજુમાં ઊભા કરો. શું એક લાંબો છે?",
    "One whole cut into ten equal parts gives tenths, and the parts must be the same size.": "એક પૂર્ણને દસ સરખા ભાગમાં કાપવાથી દશમા ભાગ બને છે, અને બધા ભાગ એક જ માપના હોવા જોઈએ.",
    "You learned: ten equal parts of one whole are tenths.": "તમે શીખ્યા: એક પૂર્ણના દસ સરખા ભાગ દશમા ભાગ છે.",
    "Write the coloured part": "રંગેલો ભાગ લખો",
    "Name this strip, cut it into ten equal pieces, then colour six of them. Write the coloured part as a fraction.": "આ પટ્ટીનું નામ પસંદ કરો, તેને દસ સરખા ટુકડામાં કાપો, પછી છ ટુકડામાં રંગ પૂરો. રંગેલા ભાગને અપૂર્ણાંક તરીકે લખો.",
    "How many pieces is this strip cut into?": "આ પટ્ટી કેટલા ટુકડામાં કપાઈ છે?",
    "Write it with a point": "તેને દશાંશ ચિહ્ન સાથે લખો",
    "This ribbon is already cut into ten. Colour three pieces and write that part with a point.": "આ રિબનના દસ ભાગ પહેલેથી કરેલા છે. ત્રણ ટુકડામાં રંગ પૂરો અને તે ભાગને દશાંશ ચિહ્ન સાથે લખો.",
    "Count the coloured pieces again, slowly.": "રંગેલા ટુકડા ફરી ગણો, ધીમે ધીમે.",
    "Is a short piece a tenth?": "શું નાનો ટુકડો દશમો ભાગ છે?",
    "No": "ના", "Yes": "હા",
    "This strip was folded by eye, so two pieces came out longer. Can a short piece be called one tenth?": "આ પટ્ટી અંદાજથી વાળી હતી, તેથી બે ટુકડા લાંબા નીકળ્યા. શું નાના ટુકડાને એક દશમો ભાગ કહી શકાય?",
    "Stand the pieces against one another and look.": "ટુકડાઓને એકબીજાની બાજુમાં મૂકીને જુઓ.",
    /* phase 2 */
    "The same amount, written with a point": "એટલી જ માત્રા, દશાંશ ચિહ્ન સાથે લખેલી",
    "Write it over ten. Now write the very same thing with a point.": "તેને દસ ભાગવાળા અપૂર્ણાંક તરીકે લખો. હવે એ જ વાત દશાંશ ચિહ્ન સાથે લખો.",
    "Which part of the strip did you colour?": "તમે પટ્ટીનો કયો ભાગ રંગ્યો?",
    "The point splits the whole ones from the pieces of one.": "ચિહ્ન પૂરા એકમોને એકના ટુકડાથી અલગ કરે છે.",
    "A share written over ten and a share written with a point say one amount.": "દસ ભાગવાળા અપૂર્ણાંક તરીકે લખેલો ભાગ અને ચિહ્ન સાથે લખેલો ભાગ, એક જ માત્રા દર્શાવે છે.",
    "You learned: a fraction over ten and a decimal say one amount.": "તમે શીખ્યા: દસ ભાગવાળો અપૂર્ણાંક અને દશાંશ એક જ માત્રા દર્શાવે છે.",
    "Colour four of the ribbon's ten lengths, then write that part with a point.": "રિબનની દસ લંબાઈમાંથી ચારમાં રંગ પૂરો, પછી તે ભાગને દશાંશ ચિહ્ન સાથે લખો.",
    "How many lengths did you colour?": "તમે કેટલી લંબાઈમાં રંગ પૂર્યો?",
    "The milk stands at the eighth mark. Colour up to it and write the amount with a point.": "દૂધ આઠમા નિશાન પર છે. ત્યાં સુધી રંગ પૂરો અને માત્રાને દશાંશ ચિહ્ન સાથે લખો.",
    "Which mark is the milk standing at?": "દૂધ કયા નિશાન પર છે?",
    "Tap the decimal point": "દશાંશ ચિહ્ન પર ટૅપ કરો",
    "This number says seven tenths. Tap the part of it that is the decimal point.": "આ સંખ્યા સાત દશમા ભાગ કહે છે. તેનો જે ભાગ દશાંશ ચિહ્ન છે તેના પર ટૅપ કરો.",
    "Which part of it is not a digit at all?": "તેનો કયો ભાગ અંક છે જ નહીં?",
    /* phase 3 */
    "Counting more than one tenth": "એક કરતાં વધુ દશમા ભાગ ગણવા",
    "How many tenths are coloured? That is the digit after the point.": "કેટલા દશમા ભાગ રંગેલા છે? એ જ ચિહ્ન પછીનો અંક છે.",
    "Which column does that count go in?": "આ ગણતરી કયા ખાનામાં જાય છે?",
    "Go along the strip from the left and count as you go.": "પટ્ટી પર ડાબી બાજુથી ચાલો અને ગણતા જાઓ.",
    "The digit after the point counts how many tenths there are.": "ચિહ્ન પછીનો અંક કહે છે કે કેટલા દશમા ભાગ છે.",
    "You learned: the digit after the point counts the tenths.": "તમે શીખ્યા: ચિહ્ન પછીનો અંક દશમા ભાગ ગણે છે.",
    "A garden is divided into ten equal beds. Colour the seven planted beds and write that part with a point.": "એક બગીચો દસ સરખી ક્યારીમાં વહેંચાયેલો છે. વાવેલી સાત ક્યારીમાં રંગ પૂરો અને તે ભાગને દશાંશ ચિહ્ન સાથે લખો.",
    "Which beds are you counting, the planted ones or the rest?": "તમે કઈ ક્યારી ગણો છો, વાવેલી કે બાકીની?",
    "A chapati is cut into ten equal parts and five are eaten. Colour the eaten parts and write them with a point.": "એક રોટલી દસ સરખા ભાગમાં કાપી છે અને પાંચ ભાગ ખાઈ લીધા. ખાધેલા ભાગમાં રંગ પૂરો અને તેમને દશાંશ ચિહ્ન સાથે લખો.",
    "Count the parts that were eaten.": "ખાધેલા ભાગ ગણો.",
    "Write the plain part": "રંગ વગરનો ભાગ લખો",
    "Nine of this ribbon's ten pieces are coloured. Write the part that is left plain with a point.": "આ રિબનના દસ ટુકડામાંથી નવ રંગેલા છે. જે ભાગ રંગ વગરનો રહ્યો છે તેને દશાંશ ચિહ્ન સાથે લખો.",
    "The question asks for the plain pieces, not the coloured ones.": "પ્રશ્ન રંગ વગરના ટુકડા પૂછે છે, રંગેલા નહીં.",
    /* phase 4 */
    "What the zero in front is for": "આગળનું શૂન્ય શા માટે છે",
    "Something is missing in front of the point. What is it holding?": "ચિહ્નની આગળ કંઈક રહી ગયું છે. તે શેને સાચવી રાખે છે?",
    "How many ones are there in front of the point?": "ચિહ્નની આગળ કેટલા એકમ છે?",
    "Read it from the left: the column before the point comes first.": "ડાબી બાજુથી વાંચો: ચિહ્ન પહેલાનું ખાનું સૌથી પહેલાં આવે છે.",
    "The zero before the point holds the ones place open and says there are no whole ones.": "ચિહ્ન પહેલાનું શૂન્ય એકમનું સ્થાન ખુલ્લું રાખે છે અને કહે છે કે કોઈ પૂરો એકમ નથી.",
    "You learned: the zero in front holds the ones place open.": "તમે શીખ્યા: આગળનું શૂન્ય એકમનું સ્થાન ખુલ્લું રાખે છે.",
    "Write it properly": "તેને બરાબર લખો",
    "A price in a shop is written as a bare point and a six, with nothing in front of the point. Write that price properly.": "દુકાનમાં એક કિંમત ફક્ત ચિહ્ન અને છ તરીકે લખી છે, ચિહ્નની આગળ કંઈ નથી. તે કિંમતને બરાબર લખો.",
    "Which column stands in front of the point?": "ચિહ્નની આગળ કયું ખાનું છે?",
    "What is missing?": "શું રહી ગયું છે?",
    "the whole": "પૂર્ણ", "the tenths": "દશમા ભાગ", "the point": "દશાંશ ચિહ્ન",
    "A friend spent two tenths of their pocket money on a pen. What must you be told before you can say the rupees?": "એક મિત્રએ પોતાના ખિસ્સાખર્ચના બે દશમા ભાગમાંથી પેન ખરીદી. રૂપિયા કહેવા માટે તમારે પહેલાં શું જાણવું પડે?",
    "A share is always a share of something.": "ભાગ હંમેશાં કોઈ વસ્તુનો ભાગ હોય છે.",
    "Write the label properly": "લેબલ બરાબર લખો",
    "A weight label reads as a bare point and a four, with kilograms after it. Write the label properly.": "વજનના લેબલ પર ફક્ત ચિહ્ન અને ચાર લખ્યું છે, તેની પાછળ કિલોગ્રામ. લેબલને બરાબર લખો.",
    "How many kilograms, before any part of one?": "એકના કોઈ ભાગ પહેલાં કેટલા કિલોગ્રામ?",
    /* the working area's own words; "no" "yes" "whole" "tenths" "point" are what the slot shows after a choice */
    "written": "લખાયેલા", "free": "મુક્ત",
    "ribbon": "રિબન", "chapati": "રોટલી", "milk": "દૂધ", "garden": "બગીચો",
    "Measure": "માપો", "By eye": "અંદાજથી",
    "ones": "એકમ", "tenths": "દશમા ભાગ", "hundredths": "સોમા ભાગ",
    "one whole": "એક પૂર્ણ", "pieces": "ટુકડા",
    "cut by eye": "અંદાજથી કાપેલા", "your pieces": "તમારા ટુકડા", "cut to ten": "દસમાં કાપેલા", "ten times apart": "દસ ગણા અલગ",
    "decimal point": "દશાંશ ચિહ્ન", "name the whole": "પૂર્ણનું નામ આપો", "not the same size": "એક જ માપના નથી",
    "a share of what?": "શેનો ભાગ?", "coloured": "રંગેલો", "plain": "રંગ વગરનો", "ones place held": "એકમનું સ્થાન સચવાયું",
    "kg": "કિગ્રા",
    "no": "ના", "yes": "હા", "whole": "પૂર્ણ", "point": "દશાંશ ચિહ્ન",
  },
};

/* ── the chapter's own inks ──────────────────────────────────────────────────────────────
   A piece of this strip stands for tenths, so it colours amber. In a written number a digit
   left of the point is deep blue, a digit right of it green, and the point vermilion between
   them; a zero that is only holding a place open is grey, at the same size and weight. */
const PIECES = 10;
const TENTH = CONTENT.ten;
const HUND = CONTENT.bead;
const INK_ONES = shade(CONTENT.hundred, 0.25);
const INK_TENTH = shade(CONTENT.one, 0.25);
const INK_POINT = shade(CONTENT.pointer, 0.25);
const DOT = CONTENT.pointer;
const ZERO_INK = "#6B6B6B";

/* ── the working area, 1086 x 528 (local units) ───────────────────────────────────────── */
const NAMEBOX = { x: 0, y: 0, w: 280, h: 76 };
const CARDX = [300, 456, 612];
const CARDW = 144;
const MEASURE = { x: 772, y: 0, w: 144, h: 76 };
const BYEYE = { x: 932, y: 0, w: 144, h: 76 };
const BAR = { x: 3, y: 96, w: 1080, h: 100 };
const RAIL = { y: 240, x0: 44, x1: 1040 };
const SHOW = { y: 292, h: 108 };      /* pieces standing on the rule, or a second strip */
const FORM = { y: 416 };              /* the two written forms, joined by their bar */
const CHART = { ones: 300, tenth: 560, hund: 820, w: 220, y: 80, h: 170, point: 540 };

/* ten pieces cut by eye: the same strip, but no two of them a tenth */
const UNEVEN = [150, 88, 104, 78, 142, 96, 118, 82, 110, 112];
const WHOLES = [{ id: "ribbon", label: "ribbon" }, { id: "chapati", label: "chapati" }, { id: "milk", label: "milk" }];

/* One entry per phase = one mount.
   says    the teach run, said before anything is asked
   ladder  rungs 2 and 3 of the hint ladder (rung 1 is each item's own miss line); never the answer
   closing one closing line for this phase, said once when it goes idle
   learned the summary page's row for this phase: "You learned: ..." (at most 72 characters)
   traceback what the working area redraws after a miss, in one line (for the sidecar)
   items   three a phase, each with the plan's question id.
           kind  strip  the child names, cuts and colours the strip; the answer is that share
                        written as a fraction (parts: SLOT_FRACTION) or with a point (a string)
                 uneven ten pieces cut by eye, stood against the rule
                 name   the parts of a written decimal, tapped on the working area
                 zero   a bare point and a digit in the ones / tenths chart
                 share  a share with no whole named behind it
           read  "shaded" or "plain": which run of pieces the question asks for */
const PHASES = [
  {
    n: 1,
    concept: "Splitting one into ten equal parts",
    conceptId: "M1.S1.T2.C4", objectiveIds: ["O1"],
    says: ["Nothing is a tenth on its own. Say what this strip is, then cut it into ten."],
    /* the plan's rung 3 was a stage direction; written here as a hint a child can act on */
    ladder: ["Are they all the same size?", "Stand two pieces side by side. Is one longer?"],
    closing: "One whole cut into ten equal parts gives tenths, and the parts must be the same size.",
    learned: "You learned: ten equal parts of one whole are tenths.",
    traceback: "A strip is cut into ten beside the child's, the pieces colour one at a time, and the share is written over ten and again with a point.",
    items: [
      /* learn ML1: answer in the plan = 6/10, which is written 0.6. The fraction is typed in the
         stacked slot; the win writes its decimal under the same six pieces. */
      { qid: "M1.S1.T2.C4:ML1", kind: "strip", cut: true, shade: 6, read: "shaded", form: "fraction",
        parts: SLOT_FRACTION, answer: [6, PIECES], winMs: 3400, ask: "Write the coloured part",
        say: "Name this strip, cut it into ten equal pieces, then colour six of them. Write the coloured part as a fraction.",
        miss: "How many pieces is this strip cut into?" },
      /* practice 1: answer in the plan = 0.3 */
      { qid: "M1.S1.T2.C4:1", kind: "strip", whole: "ribbon", shade: 3, read: "shaded", form: "decimal",
        answer: "0.3", winMs: 3000, ask: "Write it with a point",
        say: "This ribbon is already cut into ten. Colour three pieces and write that part with a point.",
        miss: "Count the coloured pieces again, slowly." },
      /* practice 2: answer in the plan = No, because tenths are ten equal parts, so every piece
         has to be the same size */
      { qid: "M1.S1.T2.C4:2", kind: "uneven", answer: "no", winMs: 2600, ask: "Is a short piece a tenth?",
        choices: [{ id: "no", label: "No" }, { id: "yes", label: "Yes" }],
        say: "This strip was folded by eye, so two pieces came out longer. Can a short piece be called one tenth?",
        miss: "Stand the pieces against one another and look." },
    ],
  },
  {
    n: 2,
    concept: "The same amount, written with a point",
    conceptId: "M1.S1.T2.C5", objectiveIds: ["O1"],
    says: ["Write it over ten. Now write the very same thing with a point."],
    ladder: ["Which part of the strip did you colour?", "The point splits the whole ones from the pieces of one."],
    closing: "A share written over ten and a share written with a point say one amount.",
    learned: "You learned: a fraction over ten and a decimal say one amount.",
    traceback: "The coloured pieces light one at a time, the share is written over ten, and the joining bar fills to the same share written with a point.",
    items: [
      /* learn ML2: answer in the plan = 4/10, written 0.4, and the dot is called the decimal point.
         The decimal is typed; the win draws its fraction and the joining bar; the dot is named by
         the third question of this phase. */
      { qid: "M1.S1.T2.C5:ML2", kind: "strip", whole: "ribbon", shade: 4, read: "shaded", form: "decimal",
        answer: "0.4", winMs: 3000, ask: "Write it with a point",
        say: "Colour four of the ribbon's ten lengths, then write that part with a point.",
        miss: "How many lengths did you colour?" },
      /* practice 3: answer in the plan = 0.8 of a litre */
      { qid: "M1.S1.T2.C5:3", kind: "strip", whole: "milk", shade: 8, read: "shaded", form: "decimal",
        answer: "0.8", winMs: 3000, ask: "Write it with a point",
        say: "The milk stands at the eighth mark. Colour up to it and write the amount with a point.",
        miss: "Which mark is the milk standing at?" },
      /* practice 4: answer in the plan = The dot standing between the zero and the seven is the
         decimal point, and the seven counts seven tenths. The dot is tapped on the number itself;
         the win lights the seven pieces it counts. */
      { qid: "M1.S1.T2.C5:4", kind: "name", number: "0.7", shade: 7, pad: "enter", answer: "point",
        winMs: 3200, ask: "Tap the decimal point",
        say: "This number says seven tenths. Tap the part of it that is the decimal point.",
        miss: "Which part of it is not a digit at all?" },
    ],
  },
  {
    n: 3,
    concept: "Counting more than one tenth",
    conceptId: "M1.S1.T2.C6", objectiveIds: ["O2"],
    says: ["How many tenths are coloured? That is the digit after the point."],
    ladder: ["Which column does that count go in?", "Go along the strip from the left and count as you go."],
    closing: "The digit after the point counts how many tenths there are.",
    learned: "You learned: the digit after the point counts the tenths.",
    traceback: "The run the question asks for lights one piece at a time, and the count is written into the tenths place after the point.",
    items: [
      /* learn ML3: answer in the plan = 0.7, and the digit after the point counts tenths */
      { qid: "M1.S1.T2.C6:ML3", kind: "strip", whole: "garden", shade: 7, read: "shaded", form: "decimal",
        answer: "0.7", winMs: 3000, ask: "Write it with a point",
        say: "A garden is divided into ten equal beds. Colour the seven planted beds and write that part with a point.",
        miss: "Which beds are you counting, the planted ones or the rest?" },
      /* practice 5: answer in the plan = 0.5 */
      { qid: "M1.S1.T2.C6:5", kind: "strip", whole: "chapati", shade: 5, read: "shaded", form: "decimal",
        answer: "0.5", winMs: 3000, ask: "Write it with a point",
        say: "A chapati is cut into ten equal parts and five are eaten. Colour the eaten parts and write them with a point.",
        miss: "Count the parts that were eaten." },
      /* practice 6: answer in the plan = 0.9 is shaded and 0.1 is not, and the two together
         rebuild one whole. One slot takes one decimal, so the plain part is asked for and the win
         stands the two runs together. */
      { qid: "M1.S1.T2.C6:6", kind: "strip", whole: "ribbon", shade: 9, read: "plain", form: "decimal",
        answer: "0.1", winMs: 3400, ask: "Write the plain part",
        say: "Nine of this ribbon's ten pieces are coloured. Write the part that is left plain with a point.",
        miss: "The question asks for the plain pieces, not the coloured ones." },
    ],
  },
  {
    n: 4,
    concept: "What the zero in front is for",
    conceptId: "M1.S1.T2.C7", objectiveIds: ["O2"],
    says: ["Something is missing in front of the point. What is it holding?"],
    ladder: ["How many ones are there in front of the point?", "Read it from the left: the column before the point comes first."],
    closing: "The zero before the point holds the ones place open and says there are no whole ones.",
    learned: "You learned: the zero in front holds the ones place open.",
    traceback: "The ones column in front of the point stays drawn and open, a grey zero walks into it, and the number is read again in full.",
    items: [
      /* learn ML4: answer in the plan = The zero in front of the point is missing, so the sign
         should read 0.6 */
      { qid: "M1.S1.T2.C7:ML4", kind: "zero", bare: "6", answer: "0.6", winMs: 3000,
        ask: "Write it properly",
        say: "A price in a shop is written as a bare point and a six, with nothing in front of the point. Write that price properly.",
        miss: "Which column stands in front of the point?" },
      /* practice 7: answer in the plan = It cannot be said yet, because nobody has said how much
         the pocket money was; two tenths is a share until the amount is named */
      { qid: "M1.S1.T2.C7:7", kind: "share", shade: 2, answer: "whole", winMs: 2800, ask: "What is missing?",
        choices: [{ id: "whole", label: "the whole" }, { id: "tenths", label: "the tenths" }, { id: "point", label: "the point" }],
        say: "A friend spent two tenths of their pocket money on a pen. What must you be told before you can say the rupees?",
        miss: "A share is always a share of something." },
      /* practice 8: answer in the plan = 0.4 kg, and the zero holds the ones place to show there
         are no whole kilograms */
      { qid: "M1.S1.T2.C7:8", kind: "zero", bare: "4", unit: "kg", answer: "0.4", winMs: 3000,
        ask: "Write the label properly",
        say: "A weight label reads as a bare point and a four, with kilograms after it. Write the label properly.",
        miss: "How many kilograms, before any part of one?" },
    ],
  },
];

/* The numbers, rows, sizes and targets the working area needs (they go into the sidecar too). */
const MODEL = { pieces: PIECES, strip: BAR, rail: RAIL, rule: SHOW, chart: CHART,
  wholes: WHOLES.map((w) => w.id), uneven: UNEVEN, places: ["ones", "tenths", "hundredths"] };

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* a share of ten written with a point: the zero holds the ones place, then the count of tenths */
const decOf = (k: number) => "0." + String(k);
/* the run of pieces this question asks about */
const runOf = (it: any) => (it.read === "plain" ? PIECES - it.shade : it.shade);

/* judge: a fraction by its two boxes; everything else by its written form, exactly as the book
   writes it (so "0.30" is not "0.3" and ".3" is not "0.3") */
const judge = (item: any, v: any) => {
  if (item.parts) return judgeSlotParts(item, v);
  return String(v).trim().toLowerCase() === String(item.answer).trim().toLowerCase();
};
/* oracle: every answer re-derived from the item's own picture, by a route that touches neither
   judge nor Work */
const oracle = () => PHASES.every((p: any) => p.items.every((it: any) => {
  if (it.kind === "strip") {
    const k = it.read === "plain" ? PIECES - it.shade : it.shade;
    if (k < 1 || k > PIECES) return false;
    if (it.form === "fraction") return Array.isArray(it.answer) && it.answer[0] === k && it.answer[1] === PIECES;
    return it.answer === "0" + "." + k;
  }
  if (it.kind === "uneven") return UNEVEN.length === PIECES && UNEVEN.some((w) => w !== UNEVEN[0]) && it.answer === "no";
  if (it.kind === "name") {
    const marks = String(it.number).split("").filter((c) => c < "0" || c > "9");
    return marks.length === 1 && marks[0] === "." && it.answer === "point";
  }
  if (it.kind === "zero") return String(it.bare).length === 1 && it.answer === "0." + it.bare;
  if (it.kind === "share") return !it.whole && it.answer === "whole";
  return false;
}));
/* the most likely wrong answer (the misconception); judge must reject it */
const nearMiss = (item: any) => {
  if (item.kind === "strip") {
    const k = runOf(item), other = PIECES - k;           /* the other run of pieces, counted instead */
    /* half the strip: both runs read the same, so the other slip of this phase stands in, which is
       putting both of the fraction's numbers on the line (five tenths written as five point ten) */
    if (item.form === "fraction") return (other === k ? k + 1 : other) + "|" + PIECES;
    return other === k ? k + "." + PIECES : decOf(other);
  }
  /* both zero items ask about the ones place left blank, so the number left as it stands with no zero
     in front is their slip; the plan's other slip (the digit slid along, 0.06) is still caught live by
     the traceback, which re-reads what was typed */
  if (item.kind === "zero") return "." + item.bare;
  if (item.kind === "name") return "tenths";             /* the digit after the point, not the mark */
  if (item.choices) return (item.choices.find((c: any) => c.id !== item.answer) || {}).id;
  return "~";
};
/* the forms of an answer that no question, hint or ladder line may print */
const answerForms = (item: any) =>
  item.parts ? []                    /* the strip is cut into ten in front of the child: the cut IS the question */
    : item.kind === "name" ? []      /* the answer is a part of the number already printed on the stage */
      : /^\d*\.\d+$/.test(String(item.answer)) ? [String(item.answer), speakable(String(item.answer))]
        : [String(item.answer)];
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => item.answer;

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => (T.state().stage === "demo" ? HOOK.demo && HOOK.demo() : T.submit(item.answer));
/* the agent's answer(): a part tapped on the working area, or a decimal typed into the slot (the
   runtime's own answer() keeps digits only, which would drop the point) */
const answer = (item: any, v: any) => {
  if (item.pad === "enter") return HOOK.set ? HOOK.set(v) : false;
  if (!item.parts && !item.choices && String(v).indexOf(".") >= 0) return HOOK.type ? (HOOK.type(String(v)), true) : false;
  return undefined;
};
/* the agent's check() before Enter; undefined = press Enter */
const check = () => (HOOK.check ? HOOK.check() : undefined);

/* ── the working area: 1086 x 528, origin at its top-left ──────────────────────────────── */

const TS_CSS = `
.ts-fade{animation:tsFade 420ms ease-out both}
@keyframes tsFade{from{opacity:0}to{opacity:1}}
.ts-glow{animation:tsGlow 1100ms ease-in-out both}
@keyframes tsGlow{0%{opacity:.3}50%{opacity:1}100%{opacity:.3}}
.ts-move{transition:transform 460ms cubic-bezier(.3,.7,.25,1)}
.ts-grab{cursor:grab}
.ts-tap{cursor:pointer}
@media (prefers-reduced-motion:reduce){.ts-fade,.ts-glow{animation:none}.ts-move{transition:none}}
`;

/* how a question's strip stands when it opens */
const initCut = (it: any) => (!it ? 0 : it.kind === "strip" && it.cut ? 0 : PIECES);
const initShaded = (it: any) => {
  const c = initCut(it);
  const pre = !it ? 0 : it.kind === "share" || it.kind === "name" ? it.shade : it.kind === "zero" ? Number(it.bare) : 0;
  return Array.from({ length: c }, (_, i) => i < pre);
};

/* one piece of the strip: square where it meets its neighbours, round at the two ends of the whole */
const pieceD = (x: number, y: number, w: number, h: number, rl: boolean, rr: boolean) => {
  const r = 16;
  const a = rl ? r : 0, b = rr ? r : 0;
  return `M ${x + a} ${y} H ${x + w - b}`
    + (rr ? ` A ${r} ${r} 0 0 1 ${x + w} ${y + r}` : "")
    + ` V ${y + h - b}`
    + (rr ? ` A ${r} ${r} 0 0 1 ${x + w - r} ${y + h}` : "")
    + ` H ${x + a}`
    + (rl ? ` A ${r} ${r} 0 0 1 ${x} ${y + h - r}` : "")
    + ` V ${y + a}`
    + (rl ? ` A ${r} ${r} 0 0 1 ${x + r} ${y}` : "") + " Z";
};

function Work({ phase, n, item, index, stage, wrong, typed, api, MODEL, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();
  const free = stage === "free";
  const kind = free ? "free" : item.kind;
  /* "2 of 3" in the language in use (Hindi and Gujarati put the total first) */
  const ofN = (a: number, b: number) => lang === "hi" ? `${b} में से ${a}` : lang === "gu" ? `${b} માંથી ${a}` : `${a} of ${b}`;

  const [nameId, setNameId] = useState<string | null>(() => (item && item.whole) || null);
  const [cut, setCut] = useState(() => initCut(item));     /* 0 = one whole, uncut */
  const [shaded, setShaded] = useState<boolean[]>(() => initShaded(item));
  const [eye, setEye] = useState(false);                   /* free play: ten pieces cut by eye */
  const [stand, setStand] = useState(false);               /* the pieces stood against the rule */
  const [both, setBoth] = useState(false);                 /* a second, level set stands beside them */
  const [pick, setPick] = useState<string | null>(null);   /* the part of the number that was tapped */
  const [zeroIn, setZeroIn] = useState(false);             /* the grey zero is in the ones column */
  const [arrow, setArrow] = useState(false);
  const [glow, setGlow] = useState<string | null>(null);
  const [lit, setLit] = useState(0);                       /* pieces counted, one at a time */
  const [fix, setFix] = useState<any>(null);               /* the correction layer: never the child's own pieces */
  const [form, setForm] = useState<any>(null);             /* the two written forms and their bar */
  const [touched, setTouched] = useState(false);
  const shadedRef = useRef<boolean[]>([]); shadedRef.current = shaded;
  const pickRef = useRef<string | null>(null); pickRef.current = pick;
  const setupFor = useRef(-9);
  const timer = useRef<any>(null);
  useEffect(() => () => clearTimeout(timer.current), []);

  const busy = tl.busy;

  const reset = (it: any, isFree: boolean) => {
    tl.stop();
    setCut(isFree ? 0 : initCut(it));
    setShaded(isFree ? [] : initShaded(it));
    setNameId(isFree ? null : it.whole || null);
    setEye(false);
    setStand(false); setBoth(false); setPick(null); setZeroIn(false); setArrow(false);
    setGlow(null); setLit(0); setFix(null); setForm(null); setTouched(false);
    api.lock(false);
  };

  useEffect(() => {
    if (stage === "ask" && setupFor.current !== index) { setupFor.current = index; reset(item, false); }
  }, [stage, index]);

  /* free play: any whole, any cut, any pieces coloured, and both writings follow */
  useEffect(() => {
    if (!free) return;
    setupFor.current = -9;
    reset(item, true);
  }, [free]);

  /* the correction stands on its own layer; the child's own pieces are never written into, so the
     next tap confirms the correction instead of undoing it */
  const clearFix = () => { if (fix || form) { setFix(null); setForm(null); setLit(0); setStand(false); setBoth(false); } };
  const bumpName = () => { setGlow("name"); clearTimeout(timer.current); timer.current = setTimeout(() => setGlow(null), 1100); };

  const named = !!nameId;
  const askable = stage === "ask" || free;
  const canName = !busy && (free || (askable && !!item.cut));
  /* the cutter can always be taken hold of; it simply will not cut until the strip has a name */
  const cutterLive = !busy && (free || (askable && !!item.cut));
  const canCut = cutterLive && named;
  const canShade = !busy && named && cut > 0 && (free || (askable && kind === "strip"));
  const canRule = !busy && (free || (askable && kind === "uneven"));
  const canPick = !busy && askable && kind === "name";
  const canRead = !busy && askable && kind === "zero";

  const nameIt = (id: string) => { if (!canName) return; clearFix(); setNameId(id); setGlow(null); api.sfx.tick(); setTouched(true); };

  const cutTo = (cnt: number) => {
    if (!canCut) { if (!named) bumpName(); return; }
    clearFix();
    setTouched(true); setEye(false);
    if (!free && cnt !== PIECES) { setCut(0); setShaded([]); return; }   /* it settles only on ten */
    setCut(cnt); setShaded(Array.from({ length: cnt }, () => false)); api.sfx.tick();
  };

  const tapPiece = (k: number) => {
    if (!canShade) { if (!named && cut === 0) bumpName(); return; }
    clearFix();
    setTouched(true);
    const s = shadedRef.current.slice(); s[k] = !s[k];
    shadedRef.current = s; setShaded(s); api.sfx.tick();
  };

  const railX = (k: number) => RAIL.x0 + ((k - 1) / 11) * (RAIL.x1 - RAIL.x0);
  const countAt = (x: number) => Math.max(1, Math.min(12, 1 + Math.round(((x - RAIL.x0) / (RAIL.x1 - RAIL.x0)) * 11)));

  const drag = useDrag((pay: any, p: any, moved: boolean) => {
    if (!pay || pay.src !== "cutter") return;
    cutTo(moved ? countAt(p.x) : PIECES);
  });
  const dragging = !!(drag.drag && drag.drag.moved && drag.drag.payload && drag.drag.payload.src === "cutter");
  const handleN = dragging ? countAt(drag.drag.x) : Math.max(1, cut || 1);
  const handleX = railX(handleN);

  /* Enter: only the tapped part of a written number is answered on the working area */
  const enterFn: any = stage === "ask" && kind === "name" && !busy
    ? () => { if (pickRef.current) api.submit(pickRef.current); }
    : null;
  api.onEnter(enterFn);
  HOOK.set = (v: any) => { if (kind !== "name") return false; pickRef.current = String(v); setPick(String(v)); return true; };
  HOOK.type = (s: string) => api.setTyped(String(s));
  HOOK.check = () => undefined;

  const pickPart = (id: string) => {
    if (!canPick) return;
    clearFix();
    setTouched(true);
    pickRef.current = id; setPick(id); api.sfx.tick();
  };
  const readOnes = () => { if (!canRead) return; setArrow(true); setTouched(true); clearTimeout(timer.current); timer.current = setTimeout(() => setArrow(false), 1400); };

  /* ── the run of pieces a question is about, on the child's own strip ── */
  const runOrder = () => shaded.map((s: boolean, i: number) => ({ s, i }))
    .filter((x: any) => (item.read === "plain" ? !x.s : x.s)).map((x: any) => x.i);

  /* ── the win: what was counted lights one piece at a time, then both writings ── */
  useEffect(() => {
    if (stage !== "win") return;
    const S: any[] = [];
    if (kind === "strip") {
      const ord = runOrder(), k = runOf(item);
      ord.forEach((_: number, i: number) => S.push([210, () => setLit(i + 1)]));
      S.push([300, () => setForm({ frac: [k, PIECES], dec: decOf(k), bar: true, sub: item.read === "plain" ? "plain" : "coloured" })]);
      if (item.read === "plain") S.push([700, () => setForm({ frac: [k, PIECES], dec: decOf(k), bar: true, sub: "plain", other: decOf(PIECES - k), otherSub: "coloured" })]);
      S.push([700, () => {}]);
    } else if (kind === "name") {
      S.push([200, () => setPick("point")], [500, () => setForm({ word: "decimal point" })]);
      Array.from({ length: item.shade }).forEach((_, i) => S.push([180, () => setLit(i + 1)]));
      S.push([700, () => {}]);
    } else if (kind === "zero") {
      S.push([260, () => { setArrow(true); setZeroIn(true); }], [520, () => setForm({ dec: item.answer, sub: "ones place held" })], [800, () => {}]);
    } else if (kind === "uneven") {
      S.push([160, () => setStand(true)], [1100, () => setBoth(true)], [800, () => {}]);
    } else if (kind === "share") {
      S.push([200, () => setGlow("name")], [600, () => setForm({ word: "name the whole" })], [800, () => {}]);
    } else S.push([300, () => {}]);
    tl.run(S);
  }, [stage]);

  /* ── the traceback: the mathematics redrawn on its own layer, ending on the whole right answer;
        nothing is marked, nothing is cleared, and the child's pieces are left exactly as they are ── */
  useEffect(() => {
    if (!wrong || stage !== "ask") return;
    api.lock(true);
    setTouched(true);
    const done = () => api.lock(false);
    const v = String((wrong && wrong.value) || "");
    const S: any[] = [];
    if (kind === "strip") {
      const k = runOf(item);
      S.push([300, () => { setForm(null); setLit(0); setFix({ strip: true, shade: item.shade, read: item.read }); }]);
      Array.from({ length: k }).forEach((_, i) => S.push([260, () => setLit(i + 1)]));
      S.push([340, () => setForm({ frac: [k, PIECES], dec: decOf(k), bar: true, sub: item.read === "plain" ? "plain" : "coloured" })]);
      S.push([800, () => {}]);
    } else if (kind === "uneven") {
      S.push([200, () => { setFix({ rule: true }); setStand(true); }], [1200, () => setBoth(true)],
        [700, () => setForm({ word: "not the same size" })], [800, () => {}]);
    } else if (kind === "name") {
      S.push([300, () => { setFix({ ring: "point" }); setPick(null); }], [700, () => setForm({ word: "decimal point" })]);
      Array.from({ length: item.shade }).forEach((_, i) => S.push([170, () => setLit(i + 1)]));
      S.push([800, () => {}]);
    } else if (kind === "zero") {
      /* the zero written in, with the digit slid along: the two readings are carried down to strips
         ten times apart, and the digit is walked back into the tenths place */
      const slid = /^0\.0\d/.test(v.replace(/\s/g, ""));
      if (slid) {
        S.push([300, () => { setFix({ two: true, k: Number(item.bare) }); setLit(0); }],
          [900, () => setLit(1)], [900, () => setLit(2)],
          [600, () => { setFix({ hund: true, k: Number(item.bare) }); }],
          [800, () => { setFix(null); setArrow(true); setGlow("ones"); }]);
      } else {
        S.push([320, () => { setArrow(true); setGlow("ones"); }]);
      }
      S.push([900, () => setZeroIn(true)], [500, () => setForm({ dec: item.answer, sub: "ones place held" })], [800, () => {}]);
    } else if (kind === "share") {
      S.push([320, () => setGlow("name")], [900, () => setForm({ word: "name the whole", sub: "a share of what?" })], [800, () => {}]);
    } else S.push([400, () => {}]);
    tl.run(S, done);
  }, [wrong]);

  /* free play has no target: the two writings follow the colouring, live. Pieces cut by eye are not
     tenths, so nothing is written over them; that is what the rule is for. */
  const shadeCount = shaded.filter(Boolean).length;
  const freeForm = free && named && cut > 0 && shadeCount > 0 && !eye
    ? { frac: [shadeCount, cut], bar: cut === PIECES, sub: cut === PIECES ? "coloured" : null,
      dec: cut === PIECES ? (shadeCount === PIECES ? "1.0" : decOf(shadeCount)) : null }
    : null;
  const formShown = free ? freeForm : form;

  /* ── what the host and the agent read back (toolApi.getState) ── */
  const litOn = runOrder().slice(0, lit);
  api.share({
    wholeName: nameId, pieces: cut, equal: kind !== "uneven" && !eye,
    shaded: shadeCount,
    fractionSlot: formShown && formShown.frac ? formShown.frac.join("/") : null,
    decimalSlot: formShown && formShown.dec ? formShown.dec : null,
    zeroWritten: zeroIn,
  });

  /* ── drawing ───────────────────────────────────────────────────────────────────────── */
  const showStrip = !(fix && fix.two) && (kind === "strip" || kind === "uneven" || kind === "share" || kind === "free" || kind === "name" || kind === "zero");
  const showChart = kind === "name" || kind === "zero";
  const showName = kind === "strip" || kind === "share" || kind === "free";
  const showCutter = kind === "free" || (kind === "strip" && !!item.cut);
  const widths = kind === "uneven" || (kind === "free" && eye && cut === PIECES) ? UNEVEN : null;
  const count = kind === "uneven" ? PIECES : dragging ? handleN : Math.max(cut, 1);
  const cutNow = dragging ? handleN : cut;
  const chartish = kind === "name" || kind === "zero";
  const bary = chartish ? SHOW.y : BAR.y;
  const barh = chartish ? SHOW.h - 24 : BAR.h;

  /* the strip the child owns */
  const stripPieces = () => {
    const out: any[] = [];
    let x = BAR.x;
    for (let i = 0; i < count; i++) {
      const w = widths ? widths[i] : BAR.w / count;
      const on = cutNow > 0 && !!shaded[i];
      out.push(<path key={"p" + i} d={pieceD(x, bary, w, barh, i === 0, i === count - 1)}
        fill={on ? TENTH : tint(C.panel, 0.45)} stroke={C.ink} strokeWidth={3} />);
      x += w;
    }
    return out;
  };

  /* pieces stood end on against the rule: a difference in length is seen, not argued about */
  const standing = (ws: number[], x0: number, label: string, flat: boolean) => {
    const bw = 40, gap = 8;
    const hs = ws.map((w) => Math.round((w / 150) * (SHOW.h - 12)));
    const top = (h: number) => SHOW.y + SHOW.h - h;
    const hi = hs.indexOf(Math.max(...hs)), lo = hs.indexOf(Math.min(...hs));
    return (
      <g className="ts-fade" pointerEvents="none">
        {hs.map((h, i) => (
          <rect key={"s" + i} x={x0 + i * (bw + gap)} y={top(h)} width={bw} height={h} rx={6}
            fill={TENTH} fillOpacity={0.55} stroke={C.ink} strokeWidth={2} />
        ))}
        {!flat && (
          <path d={`M ${x0 + hi * (bw + gap) + bw / 2} ${top(hs[hi]) - 14} V ${top(hs[hi]) - 22} H ${x0 + lo * (bw + gap) + bw / 2} V ${top(hs[lo]) - 14}`}
            fill="none" stroke={C.ink} strokeWidth={3} />
        )}
        {flat && <path d={`M ${x0} ${top(hs[0]) - 18} H ${x0 + (ws.length - 1) * (bw + gap) + bw}`} fill="none" stroke={C.ink} strokeWidth={3} />}
        <text x={x0 + ((ws.length * (bw + gap) - gap) / 2)} y={SHOW.y + SHOW.h + (lang === "en" ? 30 : 38)} textAnchor="middle"
          fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx(label)}</text>
      </g>
    );
  };

  /* a written decimal: grey zero holding the ones place, vermilion point, green tenths */
  const written = (s: string, x: number, y: number, size: number) => {
    const chars = String(s).split("");
    let after = false;
    return (
      <text x={x} y={y} textAnchor="middle" fontSize={size} fontWeight={700}>
        {chars.map((ch, i) => {
          if (ch === ".") { after = true; return <tspan key={i} fill={INK_POINT}>{ch}</tspan>; }
          const fill = after ? INK_TENTH : ch === "0" ? ZERO_INK : INK_ONES;
          return <tspan key={i} fill={fill}>{ch}</tspan>;
        })}
      </text>
    );
  };

  const chartCol = (x: number, head: string, digit: string | null, open: boolean, ink: string) => (
    <g>
      <text x={x + CHART.w / 2} y={CHART.y - T.label * 0.6} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx(head)}</text>
      <rect x={x} y={CHART.y} width={CHART.w} height={CHART.h} rx={RAD.panel} fill="#FFFFFF"
        stroke={open && glow === "ones" ? DOT : C.rule} strokeWidth={open ? 4 : 2}
        strokeDasharray={open ? "12 10" : undefined} className={open && glow === "ones" ? "ts-glow" : ""} />
      {digit !== null && <text x={x + CHART.w / 2} y={CHART.y + CHART.h / 2 + T.display * 0.34} textAnchor="middle"
        fontSize={T.display} fontWeight={700} fill={ink}>{digit}</text>}
    </g>
  );

  /* one invite, and it steps along: name the whole, cut it, colour a piece */
  const stripish = kind === "strip" || kind === "free";
  const invite = !askable || busy || dragging ? null
    : stripish && !named ? { x: NAMEBOX.w / 2, y: NAMEBOX.h / 2, r: 34 }
      : stripish && cut === 0 ? { x: handleX, y: RAIL.y, r: 40 }
        : stripish && !shaded.some(Boolean) ? { x: BAR.x + BAR.w / count / 2, y: bary + barh / 2, r: 44 }
          : kind === "uneven" && !stand ? { x: MEASURE.x + MEASURE.w / 2, y: MEASURE.h / 2, r: 34 }
            : null;

  return (
    <g>
      <style>{TS_CSS}</style>

      {/* the running count: shares written against the shares this phase lays out */}
      <g data-zone="runs">
        <rect x={0} y={-94} width={330} height={76} rx={RAD.panel} fill="url(#gPanel)" stroke={C.rule} strokeWidth={2} />
        <text x={18} y={lang === "en" ? -68 : -62} fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("written")}</text>
        <text x={316} y={-32} textAnchor="end" fontSize={T.speech} fontWeight={700} fill={C.ink}>
          {free ? tx("free") : ofN(Math.min(index + (stage === "win" || stage === "idle" || stage === "summary" ? 1 : 0), phase.items.length), phase.items.length)}
        </text>
      </g>

      {/* what is being cut: the slots take nothing until the strip above them has a name */}
      {showName && (
        <g>
          <rect x={NAMEBOX.x} y={NAMEBOX.y} width={NAMEBOX.w} height={NAMEBOX.h} rx={RAD.panel}
            fill="#FFFFFF" stroke={glow === "name" ? DOT : C.rule} strokeWidth={glow === "name" ? 5 : 2}
            className={glow === "name" ? "ts-glow" : ""} />
          <text x={NAMEBOX.x + NAMEBOX.w / 2} y={NAMEBOX.y + NAMEBOX.h / 2 + T.label * 0.34} textAnchor="middle"
            fontSize={T.label} fontWeight={700} fill={named ? C.ink : C.accent}>{named ? tx(nameId) : "?"}</text>
        </g>
      )}

      {/* the three wholes, in phase one and in free play */}
      {(kind === "free" || (kind === "strip" && !!item.cut)) && WHOLES.map((w, i) => (
        <Key key={w.id} id={"whole-" + w.id} label={"Cut one " + w.label} x={CARDX[i]} y={NAMEBOX.y} w={CARDW} h={NAMEBOX.h}
          C={C} primary={nameId === w.id} disabled={!canName} onClick={() => nameIt(w.id)}>
          <text y={12} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={nameId === w.id ? "#FFFFFF" : C.ink}>{tx(w.label)}</text>
        </Key>
      ))}

      {/* the rule, and a cut made by eye */}
      {(kind === "free" || kind === "uneven") && (
        <Key id="measure" label="Measure the pieces" x={MEASURE.x} y={MEASURE.y} w={MEASURE.w} h={MEASURE.h} C={C}
          primary={stand} disabled={!canRule} onClick={() => { clearFix(); setTouched(true); setStand((s: boolean) => !s); }}>
          <text y={12} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={stand ? "#FFFFFF" : C.ink}>{tx("Measure")}</text>
        </Key>
      )}
      {kind === "free" && (
        <Key id="by-eye" label="Cut ten pieces by eye" x={BYEYE.x} y={BYEYE.y} w={BYEYE.w} h={BYEYE.h} C={C}
          primary={eye} disabled={!named || busy}
          onClick={() => { clearFix(); setTouched(true); setEye(true); setCut(PIECES); setShaded(Array.from({ length: PIECES }, () => false)); setStand(false); api.sfx.tick(); }}>
          <text y={12} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={eye ? "#FFFFFF" : C.ink}>{tx("By eye")}</text>
        </Key>
      )}

      {/* the ones and tenths chart */}
      {showChart && (
        <g>
          {chartCol(CHART.ones, "ones", kind === "zero" ? (zeroIn ? "0" : null) : String(item.number)[0],
            kind === "zero" && !zeroIn, kind === "zero" ? ZERO_INK : INK_ONES)}
          <circle cx={CHART.point} cy={CHART.y + CHART.h / 2 + T.display * 0.28} r={13} fill={DOT} />
          {chartCol(CHART.tenth, "tenths", kind === "zero" ? String(item.bare) : String(item.number)[2], false, INK_TENTH)}
          {kind === "zero" && item.unit && (
            <text x={CHART.hund + 10} y={CHART.y + CHART.h / 2 + T.speech * 0.34} fontSize={T.speech} fontWeight={600} fill={C.ink}>{tx(item.unit)}</text>
          )}
          {fix && fix.hund && <g pointerEvents="none">{chartCol(CHART.hund, "hundredths", String(fix.k), false, shade(HUND, 0.25))}</g>}
          {arrow && (
            <path className="ts-fade" pointerEvents="none" d={`M ${CHART.point - 24} ${CHART.y + CHART.h + 26} H ${CHART.ones + CHART.w / 2} V ${CHART.y + CHART.h + 12}`}
              fill="none" stroke={DOT} strokeWidth={4} strokeLinecap="round" />
          )}
          {canPick && (
            <g>
              <Hit id="part-ones" label="The first digit" x={CHART.ones + 20} y={CHART.y} w={CHART.w - 40} h={CHART.h} onPress={() => pickPart("ones")} />
              <Hit id="part-point" label="The mark between the digits" x={CHART.point - 36} y={CHART.y + CHART.h / 2 - 36} w={HIT} h={HIT} onPress={() => pickPart("point")} />
              <Hit id="part-tenth" label="The last digit" x={CHART.tenth + 20} y={CHART.y} w={CHART.w - 40} h={CHART.h} onPress={() => pickPart("tenths")} />
            </g>
          )}
          {canRead && <Hit id="read-ones" label="Read the ones column" x={CHART.ones + 20} y={CHART.y} w={CHART.w - 40} h={CHART.h} onPress={readOnes} />}
          {pick && (
            <rect className="ts-fade" pointerEvents="none" fill="none" stroke={C.accent} strokeWidth={5} rx={RAD.panel}
              x={pick === "point" ? CHART.point - 40 : (pick === "ones" ? CHART.ones : CHART.tenth) + 8}
              y={pick === "point" ? CHART.y + CHART.h / 2 - 40 : CHART.y - 8}
              width={pick === "point" ? 80 : CHART.w - 16} height={pick === "point" ? 80 : CHART.h + 16} />
          )}
          {fix && fix.ring && (
            <rect className="ts-fade" pointerEvents="none" fill="none" stroke={DOT} strokeWidth={5} rx={RAD.panel}
              x={CHART.point - 40} y={CHART.y + CHART.h / 2 - 40} width={80} height={80} />
          )}
        </g>
      )}

      {/* the cutter on its rail: it folds the strip as it travels and settles only on ten; drawn before the strip so that,
          once cut, Tab goes from the cutter straight on to the first piece (cut, then colour) */}
      {showCutter && (
        <g>
          <rect x={RAIL.x0 - 10} y={RAIL.y - 5} width={RAIL.x1 - RAIL.x0 + 20} height={10} rx={5} fill={tint(C.rule, 0.35)} />
          {/* Hindi and Gujarati letters stand taller than English ones, so their label sits beside the handle, clear of the strip above it */}
          <text x={lang === "en" ? Math.min(Math.max(handleX, 90), 996) : handleX > 800 ? handleX - 20 : handleX + 20}
            y={RAIL.y - (lang === "en" ? 24 : 11)} textAnchor={lang === "en" ? "middle" : handleX > 800 ? "end" : "start"} fontSize={T.micro} fontWeight={700}
            fill={handleN === PIECES ? shade(TENTH, 0.35) : C.ink}>{handleN === 1 ? tx("one whole") : handleN + " " + tx("pieces")}</text>
          <g className={cutterLive ? "ts-grab c4-piece" : ""} {...(cutterLive ? { ...control("cutter", "Cut the strip into pieces"), ...drag.bind({ src: "cutter" }), ...drag.keys({ src: "cutter" }) } : {})}>
            <rect x={handleX - HIT / 2} y={RAIL.y - HIT / 2} width={HIT} height={HIT} fill="transparent" />
            <path d={`M ${handleX} ${RAIL.y - 26} L ${handleX + 22} ${RAIL.y + 20} H ${handleX - 22} Z`}
              fill={cutterLive ? C.accent : tint(C.rule, 0.2)} stroke={shade(C.accent, 0.35)} strokeWidth={3} filter="url(#fShadowSoft)" />
          </g>
        </g>
      )}

      {/* the strip itself: one piece until the cutter settles on ten */}
      {showStrip && (
        <g>
          {stripPieces()}
          {litOn.map((i: number) => {
            const w = BAR.w / count;
            return <rect key={"lit" + i} className="ts-fade" pointerEvents="none" x={BAR.x + i * w + 4} y={bary + 4} width={w - 8} height={barh - 8}
              rx={10} fill="none" stroke={C.accent} strokeWidth={5} />;
          })}
          {kind !== "name" && cutNow > 0 && Array.from({ length: count }).map((_, i) => {
            const w = widths ? widths[i] : BAR.w / count;
            const x = widths ? widths.slice(0, i).reduce((a: number, b: number) => a + b, 0) + BAR.x : BAR.x + i * w;
            return canShade ? <Hit key={"h" + i} id={"piece-" + i} label={"Colour piece " + (i + 1)} x={x} y={bary} w={w} h={barh} onPress={() => tapPiece(i)} /> : null;
          })}
        </g>
      )}

      {/* the correction layer: a second strip, drawn beside the child's and never over it */}
      {fix && fix.strip && (
        <g className="ts-fade" pointerEvents="none">
          {Array.from({ length: PIECES }).map((_, i) => {
            const w = BAR.w / PIECES;
            const on = i < fix.shade;
            const counted = fix.read === "plain" ? i >= fix.shade && i < fix.shade + lit : i < lit;
            return (
              <g key={"f" + i}>
                <path d={pieceD(BAR.x + i * w, SHOW.y, w, SHOW.h - 24, i === 0, i === PIECES - 1)}
                  fill={on ? TENTH : tint(C.panel, 0.45)} stroke={C.ink} strokeWidth={3} />
                {counted && <rect x={BAR.x + i * w + 4} y={SHOW.y + 4} width={w - 8} height={SHOW.h - 32} rx={10} fill="none" stroke={C.accent} strokeWidth={5} />}
              </g>
            );
          })}
        </g>
      )}
      {fix && fix.two && (
        <g className="ts-fade" pointerEvents="none">
          {Array.from({ length: PIECES }).map((_, i) => (
            <path key={"t" + i} d={pieceD(BAR.x + i * (BAR.w / PIECES), SHOW.y, BAR.w / PIECES, 44, i === 0, i === PIECES - 1)}
              fill={lit >= 1 && i < fix.k ? TENTH : tint(C.panel, 0.45)} stroke={C.ink} strokeWidth={3} />
          ))}
          {Array.from({ length: 100 }).map((_, i) => (
            <rect key={"u" + i} x={BAR.x + i * (BAR.w / 100)} y={SHOW.y + 60} width={BAR.w / 100} height={44}
              fill={lit >= 2 && i < fix.k ? HUND : tint(C.panel, 0.45)} stroke={C.ink} strokeWidth={1} />
          ))}
          <text x={BAR.x + BAR.w / 2} y={SHOW.y + SHOW.h + (lang === "en" ? 28 : 36)} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("ten times apart")}</text>
        </g>
      )}

      {/* the pieces stood against the rule */}
      {stand && kind !== "free" && standing(UNEVEN, 40, "cut by eye", false)}
      {stand && kind === "free" && standing(eye ? UNEVEN
        : Array.from({ length: Math.min(Math.max(cut, 1), 12) }, () => Math.min(150, BAR.w / Math.max(cut, 1))), 189, "your pieces", !eye)}
      {both && standing(Array.from({ length: PIECES }, () => 108), 574, "cut to ten", true)}

      {/* the two writings, joined by their bar, because they carry one amount */}
      {formShown && (
        <g className="ts-fade" pointerEvents="none">
          {formShown.frac && (
            <g>
              <text x={400} y={FORM.y + 40} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={INK_TENTH}>{formShown.frac[0]}</text>
              <rect x={356} y={FORM.y + 50} width={88} height={6} rx={3} fill={C.ink} />
              <text x={400} y={FORM.y + 92} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={C.ink}>{formShown.frac[1]}</text>
            </g>
          )}
          {/* the joining bar, drawn as the two strokes of an equals sign so it can never be read as a
              take-away: it fills only once both writings stand, because they carry one amount */}
          {formShown.frac && formShown.dec && formShown.bar && (
            <g>
              <rect x={480} y={FORM.y + 38} width={76} height={11} rx={5} fill={shade(C.accent, 0.2)} />
              <rect x={480} y={FORM.y + 59} width={76} height={11} rx={5} fill={shade(C.accent, 0.2)} />
            </g>
          )}
          {formShown.dec && written(formShown.dec, formShown.frac ? 660 : 543, FORM.y + 70, T.xl)}
          {formShown.other && written(formShown.other, 880, FORM.y + 70, T.xl)}
          {formShown.word && (
            <text x={543} y={FORM.y + 64} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={C.ink}>{tx(formShown.word)}</text>
          )}
          {formShown.sub && <text x={formShown.dec && formShown.frac ? 660 : 543} y={FORM.y + 104} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx(formShown.sub)}</text>}
          {formShown.otherSub && <text x={880} y={FORM.y + 104} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx(formShown.otherSub)}</text>}
        </g>
      )}

      {invite && <Invite x={invite.x} y={invite.y} r={invite.r} C={C} />}
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase:
   result.last = { value, answer, kind, item, shared } (shared = what api.share held at that moment) */
function Thumb({ result, C, w, h, lang = "en", tx = (v: any) => v }: any) {
  const L = (result && result.last) || {};
  const v = L.value;
  if (v === null || v === undefined || v === "") return null;
  const s = String(v);
  const frac = s.indexOf("|") >= 0 ? s.split("|") : null;
  const sh = L.shared && typeof L.shared.shaded === "number" ? L.shared.shaded : null;
  const dec = /^\d*\.\d+$/.test(s);
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      {sh !== null && Array.from({ length: PIECES }).map((_, i) => (
        <rect key={i} x={14 + i * ((w - 28) / PIECES)} y={12} width={(w - 28) / PIECES} height={22}
          fill={i < sh ? TENTH : "#FFFFFF"} stroke={C.ink} strokeWidth={1} />
      ))}
      {frac ? (
        <g>
          <text x={w / 2} y={h - 40} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={INK_TENTH}>{frac[0]}</text>
          <rect x={w / 2 - 20} y={h - 34} width={40} height={3} fill={C.ink} />
          <text x={w / 2} y={h - 8} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={C.ink}>{frac[1]}</text>
        </g>
      ) : (
        <text x={w / 2} y={h - 16} textAnchor="middle" fontSize={T.label} fontWeight={700}
          fill={dec ? INK_TENTH : C.ink}>{s}</text>
      )}
    </g>
  );
}

function TenthStrip(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, pointKey: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, fitHost: () => null }} />
  );
}

export default TenthStrip;
