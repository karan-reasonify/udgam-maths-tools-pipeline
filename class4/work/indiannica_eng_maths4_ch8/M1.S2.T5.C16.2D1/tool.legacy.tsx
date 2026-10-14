/* ═══ M1.S2.T5.C16.2D1 · place_and_worth_chart · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists: header + its three controls, canvas, slot + pad, bubble + mascot,
   phase dots (user / AI mode), window.toolApi, sounds, the synced voice, scoring, the events,
   idle and restart. NO imports in this file; only the five host hooks. Follow docs/LAYOUT.md.
   Edit, never rewrite. Concepts, ids and closings are the plan's, verbatim.

   The picture: the place value chart carried on past the ones, through a column kept for the dot,
   into tenths, hundredths and thousandths. A PLACE is a name (a word key); a PLACE VALUE is an
   amount (the stacked fraction in the slot). Every worth added back rebuilds the number. */

const TOOL_ID = "place_and_worth_chart";
const MEDIA_ID = "M1.S2.T5.C16.2D1";
const TOOL_NAME = "Place and Worth Chart";
const CHROME = { dim: "#9AA4AC", ink: "#2B2B2B", rule: "#C9BCA6", panel: "#F2E4CE", paper: "#FFFDF7", accent: "#5B6770" };
const VOICE = { rate: 0.92, pitch: 1.06 };

/* spoken before phase 1's teach lines only (the plan's opening voice line) */
const OPENING = ["Your chart stops at the ones. There is more of it than that."];
/* the whole-tool line: spoken on the summary page */
const FINISH_LINE = "Every digit given a name and an amount, and every amount added back to where it came from.";
/* said when the child opens Free play from the summary page */
const FREE_LINE = "Free play. Build any number in the chart, and turn the worths on.";

/* Hindi and Gujarati, keyed by the English line exactly (runtime r13+: `lineFor(line, lang, TR)`); the English
   above and below stays what the checks read. Terms follow NCERT class 4: दशमलव / દશાંશ, स्थानीय मान /
   સ્થાનકિંમત, दसवाँ / सौवाँ भाग, દશમો / સોમો ભાગ, इकाई दहाई सैकड़ा / એકમ દશક શતક. Digits stay digits: the
   runtime speaks them (3.05, 5,470) in the language in use. A first draft; wants a native speaker's read. */
const TR: any = {
  hi: {
    "Place and Worth Chart": "स्थान और मान का चार्ट",
    "Your chart stops at the ones. There is more of it than that.": "तुम्हारा चार्ट इकाई पर ही रुक जाता है। वह इससे आगे भी है।",
    "Every digit given a name and an amount, and every amount added back to where it came from.": "हर अंक को एक नाम और एक मान मिला, और हर मान जोड़कर हम वापस उसी संख्या पर पहुँचे।",
    "Free play. Build any number in the chart, and turn the worths on.": "मुक्त खेल। चार्ट में कोई भी संख्या बनाओ, और मान चालू करो।",
    /* phase 1 */
    "The chart carries on past the point": "चार्ट दशमलव बिंदु के आगे भी चलता है",
    "The chart carries on to the right, and a dot marks where the whole ones end.": "चार्ट दाईं ओर आगे बढ़ता है, और एक बिंदु बताता है कि पूर्ण इकाइयाँ कहाँ खत्म होती हैं।",
    "Is the next piece along bigger or smaller than a whole one?": "अगला टुकड़ा पूरे एक से बड़ा है या छोटा?",
    "Each column right of the dot is ten times smaller than the one before it.": "बिंदु के दाईं ओर का हर खाना अपने पहले वाले खाने से दस गुना छोटा है।",
    "The place value chart runs on to the right of the ones place, past a dot, as tenths, hundredths and thousandths.": "स्थानीय मान चार्ट इकाई के स्थान से दाईं ओर, एक बिंदु के आगे, दसवाँ, सौवाँ और हज़ारवाँ भाग बनकर चलता है।",
    "You learned: the chart runs on past the ones, through a dot.": "तुमने सीखा: चार्ट इकाई के आगे, एक बिंदु के पार भी चलता है।",
    "Order from the dot": "बिंदु से क्रम लगाओ",
    "Put 248.573 in the chart. Name each new column as it opens, from the dot outwards.": "248.573 को चार्ट में रखो। हर नया खाना खुलते ही उसका नाम बताओ, बिंदु से बाहर की ओर।",
    "Which column is the last one you already knew?": "वह आखिरी खाना कौन सा है जिसे तुम पहले से जानते थे?",
    "Tens in 5,470?": "5,470 में कितनी दहाई?",
    "How many tens are there in 5,470? Tap the column where the tens stand.": "5,470 में कितनी दहाइयाँ हैं? जिस खाने में दहाई है, उस पर टैप करो।",
    "Which digit stands in the tens column here?": "यहाँ दहाई के खाने में कौन सा अंक है?",
    "Order them again": "उन्हें फिर से क्रम में लगाओ",
    "Now 36.907, with the columns bare again. Name the three places the same way.": "अब 36.907, और खाने फिर से खाली हैं। तीनों स्थानों के नाम उसी तरह बताओ।",
    "The pieces get smaller as you travel right. Which comes first?": "दाईं ओर जाते-जाते टुकड़े छोटे होते जाते हैं। पहला कौन सा आता है?",
    /* phase 2 */
    "Counting places from the point": "दशमलव बिंदु से स्थान गिनना",
    "A number is in the chart with its headings turned over. Start at the dot and step right.": "एक संख्या चार्ट में है, पर उसके शीर्षक उलटे रखे हैं। बिंदु से शुरू करो और दाईं ओर बढ़ो।",
    "How many columns along from the dot is this digit?": "यह अंक बिंदु से कितने खाने आगे है?",
    "Count one, two, three as you pass each column, and stop on the lit one.": "हर खाने पर एक, दो, तीन गिनो, और चमकते खाने पर रुक जाओ।",
    "Position alone decides a digit's place, and the places are counted from the point outwards.": "अंक का स्थान सिर्फ़ उसकी जगह से तय होता है, और स्थान बिंदु से बाहर की ओर गिने जाते हैं।",
    "You learned: places are counted from the point outwards.": "तुमने सीखा: स्थान बिंदु से बाहर की ओर गिने जाते हैं।",
    "Place of the 8?": "8 का स्थान?",
    "In 6.482, the 8 is lit. Count along from the dot and name the place it stands in.": "6.482 में 8 चमक रहा है। बिंदु से गिनते हुए बताओ कि वह किस स्थान पर है।",
    "A big digit does not get a big place. Only the column decides.": "बड़े अंक को बड़ा स्थान नहीं मिलता। सिर्फ़ खाना तय करता है।",
    "Place of the 3?": "3 का स्थान?",
    "Now the 3 in 7.328. Count the same way.": "अब 7.328 में 3 को देखो। उसी तरह गिनो।",
    "Where does your counting start? Find the dot before you count.": "तुम्हारी गिनती कहाँ से शुरू होती है? गिनने से पहले बिंदु ढूँढो।",
    "Hundreds in 48,600?": "48,600 में कितने सैकड़े?",
    "Read 48,600 the other way. Cut it at the hundreds and say how many are inside.": "48,600 को दूसरी तरह पढ़ो। इसे सैकड़े पर काटो और बताओ कि उसके अंदर कितने हैं।",
    "Which column holds the hundreds in this number?": "इस संख्या में सैकड़े का खाना कौन सा है?",
    /* phase 3 */
    "Place and place value are not the same word": "स्थान और स्थानीय मान एक जैसे नहीं हैं",
    "Two questions about one digit now. Where it sits has a name, and what it is worth is an amount.": "अब एक अंक के बारे में दो सवाल। वह कहाँ बैठा है, उसका एक नाम है, और उसका मान एक राशि है।",
    "How much is one piece of that column worth?": "उस खाने के एक टुकड़े का मान कितना है?",
    "A name goes in the slot headed place, and an amount in the slot headed worth.": "नाम स्थान वाले डिब्बे में जाता है, और राशि मान वाले डिब्बे में।",
    "The place of a digit is where it sits and is a name; the place value is what it is worth there and is an amount.": "अंक का स्थान वह जगह है जहाँ वह बैठा है, और यह एक नाम है। अंक वहाँ जितने का है, वही उसका स्थानीय मान है, और यह एक राशि है।",
    "You learned: the place is a name, the place value an amount.": "तुमने सीखा: स्थान एक नाम है, स्थानीय मान एक राशि।",
    "The place of the 1": "1 का स्थान",
    "In 34.16, the 1 is lit. Give its place, the name of the column it stands in.": "34.16 में 1 चमक रहा है। उसका स्थान बताओ, यानी जिस खाने में वह है, उसका नाम।",
    "A place is a name you can read off the top of a column.": "स्थान एक नाम है जो तुम खाने के ऊपर से पढ़ सकते हो।",
    "What is the 7 worth?": "7 का मान क्या है?",
    "In 91.507 the 7 sits in the thousandths place. Now give what it is worth there.": "91.507 में 7 हज़ारवें भाग के स्थान पर है। अब बताओ कि वहाँ उसका मान क्या है।",
    "How many of that piece make one whole one?": "उस टुकड़े के कितने मिलकर एक पूर्ण बनाते हैं?",
    "What is the 6 worth?": "6 का मान क्या है?",
    "A child says the 6 in 5.63 is worth just 6. Where it stands, what is it really worth?": "एक बच्चा कहता है कि 5.63 में 6 का मान बस 6 है। जहाँ वह बैठा है, वहाँ उसका असली मान क्या है?",
    "The 6 stands one column past the dot. And how big is one of those pieces?": "6 बिंदु से एक खाना आगे है। और उनमें से एक टुकड़ा कितना बड़ा है?",
    /* phase 4 */
    "Adding the worths back up": "मानों को वापस जोड़ना",
    "Every worth in the chart comes down into the bar, and the bar is added up.": "चार्ट का हर मान नीचे पट्टी में आता है, और पट्टी को जोड़ा जाता है।",
    "What should all the worths come to together?": "सारे मान मिलकर कितने बनने चाहिए?",
    "A digit is worth what its own column says, never just itself.": "अंक का मान वही है जो उसका अपना खाना बताता है, सिर्फ़ वह अंक नहीं।",
    "The place values of all the digits add back to the number they came from, and that is the check on every one of them.": "सभी अंकों के स्थानीय मान जोड़ने पर वही संख्या वापस मिलती है जिससे वे आए थे, और यही हर एक की जाँच है।",
    "You learned: every digit's worth adds back to the number.": "तुमने सीखा: हर अंक का मान जोड़ने पर वही संख्या मिलती है।",
    "Add up the worths": "मान जोड़ो",
    "Send every digit of 23.451 down as its worth. Then add the row and type what it comes to.": "23.451 के हर अंक को उसके मान के रूप में नीचे भेजो। फिर पंक्ति जोड़ो और जो आए, वह लिखो।",
    "What is this digit worth in its own column?": "इस अंक का अपने खाने में क्या मान है?",
    "What do they make?": "ये मिलकर क्या बनाते हैं?",
    "Now 52.874. Bring the worths down the same way and add them.": "अब 52.874। मानों को उसी तरह नीचे लाओ और जोड़ो।",
    "Small worths are still worth something. Did they all go down?": "छोटे मान भी मायने रखते हैं। क्या वे सब नीचे आए?",
    "All six worths?": "छहों मान?",
    "Six digit cards and a point card make 472.836. Add all six worths and say what they come to.": "छह अंक कार्ड और एक बिंदु कार्ड मिलकर 472.836 बनाते हैं। छहों मान जोड़ो और बताओ कि कितने बने।",
    "Six cards went down. Was each one sent as its worth?": "छह कार्ड नीचे गए। क्या हर एक को उसके मान के रूप में भेजा गया?",
    /* what the working area draws */
    "hundreds": "सैकड़ा", "tens": "दहाई", "ones": "इकाई",
    "tenths": "दसवाँ भाग", "hundredths": "सौवाँ भाग", "thousandths": "हज़ारवाँ भाग",
    "thousands": "हज़ार", "ten thousands": "दस हज़ार",
    "named": "नाम दिए", "in the cut": "कट के अंदर", "counted": "गिने", "filled": "भरे", "settled": "नीचे आए", "digits": "अंक",
    "place": "स्थान", "a name": "एक नाम", "worth": "मान", "an amount": "एक राशि",
    "from the dot": "बिंदु से", "ten times smaller": "दस गुना छोटा", "left over": "बचा हुआ",
    "from the left end": "बाएँ सिरे से", "as they stand": "जैसे हैं", "swapped over": "अदला-बदली",
    "with your worth": "तुम्हारे मान के साथ", "one whole one": "एक पूर्ण", "of them": "ऐसे टुकड़े",
    "with small worths": "छोटे मानों के साथ", "before the dot": "बिंदु से पहले", "digits only": "सिर्फ़ अंक",
    "added up": "जोड़", "the number": "संख्या",
    "Worths": "मान", "Worths on": "मान चालू", "Worths off": "मान बंद",
    "numerator": "अंश", "denominator": "हर",
  },
  gu: {
    "Place and Worth Chart": "સ્થાન અને કિંમતનો ચાર્ટ",
    "Your chart stops at the ones. There is more of it than that.": "તમારો ચાર્ટ એકમ પર જ અટકી જાય છે. તે એનાથી આગળ પણ છે.",
    "Every digit given a name and an amount, and every amount added back to where it came from.": "દરેક અંકને એક નામ અને એક કિંમત મળી, અને દરેક કિંમત ઉમેરીને આપણે પાછા એ જ સંખ્યા પર પહોંચ્યા.",
    "Free play. Build any number in the chart, and turn the worths on.": "મુક્ત રમત. ચાર્ટમાં કોઈ પણ સંખ્યા બનાવો, અને કિંમતો ચાલુ કરો.",
    /* phase 1 */
    "The chart carries on past the point": "ચાર્ટ દશાંશ ચિહ્નથી આગળ પણ ચાલે છે",
    "The chart carries on to the right, and a dot marks where the whole ones end.": "ચાર્ટ જમણી બાજુ આગળ ચાલે છે, અને એક ટપકું બતાવે છે કે પૂર્ણ એકમ ક્યાં પૂરા થાય છે.",
    "Is the next piece along bigger or smaller than a whole one?": "આગળનો ટુકડો આખા એક કરતાં મોટો છે કે નાનો?",
    "Each column right of the dot is ten times smaller than the one before it.": "ટપકાની જમણી બાજુનું દરેક ખાનું તેની પહેલાંના ખાના કરતાં દસ ગણું નાનું છે.",
    "The place value chart runs on to the right of the ones place, past a dot, as tenths, hundredths and thousandths.": "સ્થાનકિંમત ચાર્ટ એકમના સ્થાનથી જમણી બાજુ, એક ટપકાથી આગળ, દશમો, સોમો અને હજારમો ભાગ બનીને ચાલે છે.",
    "You learned: the chart runs on past the ones, through a dot.": "તમે શીખ્યા: ચાર્ટ એકમથી આગળ, એક ટપકા પછી પણ ચાલે છે.",
    "Order from the dot": "ટપકાથી ક્રમ ગોઠવો",
    "Put 248.573 in the chart. Name each new column as it opens, from the dot outwards.": "248.573 ને ચાર્ટમાં મૂકો. દરેક નવું ખાનું ખૂલે ત્યારે તેનું નામ આપો, ટપકાથી બહારની તરફ.",
    "Which column is the last one you already knew?": "એ છેલ્લું ખાનું કયું છે જે તમે પહેલેથી જાણતા હતા?",
    "Tens in 5,470?": "5,470 માં કેટલા દશક?",
    "How many tens are there in 5,470? Tap the column where the tens stand.": "5,470 માં કેટલા દશક છે? જે ખાનામાં દશક છે તેના પર ટેપ કરો.",
    "Which digit stands in the tens column here?": "અહીં દશકના ખાનામાં કયો અંક છે?",
    "Order them again": "તેમને ફરી ક્રમમાં ગોઠવો",
    "Now 36.907, with the columns bare again. Name the three places the same way.": "હવે 36.907, ખાનાં ફરી ખાલી છે. ત્રણેય સ્થાનનાં નામ એ જ રીતે આપો.",
    "The pieces get smaller as you travel right. Which comes first?": "જમણી બાજુ જતાં ટુકડા નાના થતા જાય છે. પહેલો કયો આવે?",
    /* phase 2 */
    "Counting places from the point": "દશાંશ ચિહ્નથી સ્થાન ગણવા",
    "A number is in the chart with its headings turned over. Start at the dot and step right.": "એક સંખ્યા ચાર્ટમાં છે, પણ તેનાં શીર્ષક ઊંધાં છે. ટપકાથી શરૂ કરો અને જમણી બાજુ આગળ વધો.",
    "How many columns along from the dot is this digit?": "આ અંક ટપકાથી કેટલાં ખાનાં આગળ છે?",
    "Count one, two, three as you pass each column, and stop on the lit one.": "દરેક ખાના પર એક, બે, ત્રણ ગણો, અને ચમકતા ખાના પર અટકો.",
    "Position alone decides a digit's place, and the places are counted from the point outwards.": "અંકનું સ્થાન ફક્ત તેની જગ્યાથી નક્કી થાય છે, અને સ્થાન ટપકાથી બહારની તરફ ગણાય છે.",
    "You learned: places are counted from the point outwards.": "તમે શીખ્યા: સ્થાન ટપકાથી બહારની તરફ ગણાય છે.",
    "Place of the 8?": "8 નું સ્થાન?",
    "In 6.482, the 8 is lit. Count along from the dot and name the place it stands in.": "6.482 માં 8 ચમકે છે. ટપકાથી ગણતાં ગણતાં કહો કે તે કયા સ્થાને છે.",
    "A big digit does not get a big place. Only the column decides.": "મોટા અંકને મોટું સ્થાન મળતું નથી. ફક્ત ખાનું નક્કી કરે છે.",
    "Place of the 3?": "3 નું સ્થાન?",
    "Now the 3 in 7.328. Count the same way.": "હવે 7.328 માં 3 જુઓ. એ જ રીતે ગણો.",
    "Where does your counting start? Find the dot before you count.": "તમારી ગણતરી ક્યાંથી શરૂ થાય છે? ગણતાં પહેલાં ટપકું શોધો.",
    "Hundreds in 48,600?": "48,600 માં કેટલા શતક?",
    "Read 48,600 the other way. Cut it at the hundreds and say how many are inside.": "48,600 ને બીજી રીતે વાંચો. તેને શતક પાસે કાપો અને કહો કે અંદર કેટલા છે.",
    "Which column holds the hundreds in this number?": "આ સંખ્યામાં શતકનું ખાનું કયું છે?",
    /* phase 3 */
    "Place and place value are not the same word": "સ્થાન અને સ્થાનકિંમત એક જ નથી",
    "Two questions about one digit now. Where it sits has a name, and what it is worth is an amount.": "હવે એક અંક વિશે બે સવાલ. તે ક્યાં બેઠો છે તેનું એક નામ છે, અને તેની કિંમત એક રકમ છે.",
    "How much is one piece of that column worth?": "તે ખાનાના એક ટુકડાની કિંમત કેટલી છે?",
    "A name goes in the slot headed place, and an amount in the slot headed worth.": "નામ સ્થાન લખેલા ડબ્બામાં જાય છે, અને રકમ કિંમત લખેલા ડબ્બામાં.",
    "The place of a digit is where it sits and is a name; the place value is what it is worth there and is an amount.": "અંકનું સ્થાન એ જગ્યા છે જ્યાં તે બેઠો છે, અને તે એક નામ છે. અંક ત્યાં જેટલાનો છે તે તેની સ્થાનકિંમત છે, અને તે એક રકમ છે.",
    "You learned: the place is a name, the place value an amount.": "તમે શીખ્યા: સ્થાન એક નામ છે, સ્થાનકિંમત એક રકમ.",
    "The place of the 1": "1 નું સ્થાન",
    "In 34.16, the 1 is lit. Give its place, the name of the column it stands in.": "34.16 માં 1 ચમકે છે. તેનું સ્થાન કહો, એટલે કે જે ખાનામાં તે છે તેનું નામ.",
    "A place is a name you can read off the top of a column.": "સ્થાન એક નામ છે જે તમે ખાનાની ઉપરથી વાંચી શકો.",
    "What is the 7 worth?": "7 ની કિંમત શું છે?",
    "In 91.507 the 7 sits in the thousandths place. Now give what it is worth there.": "91.507 માં 7 હજારમા ભાગના સ્થાને છે. હવે કહો કે ત્યાં તેની કિંમત શું છે.",
    "How many of that piece make one whole one?": "તે ટુકડાના કેટલા મળીને એક પૂર્ણ બને?",
    "What is the 6 worth?": "6 ની કિંમત શું છે?",
    "A child says the 6 in 5.63 is worth just 6. Where it stands, what is it really worth?": "એક બાળક કહે છે કે 5.63 માં 6 ની કિંમત ફક્ત 6 છે. તે જ્યાં બેઠો છે ત્યાં તેની સાચી કિંમત શું છે?",
    "The 6 stands one column past the dot. And how big is one of those pieces?": "6 ટપકાથી એક ખાનું આગળ છે. અને તેમાંથી એક ટુકડો કેટલો મોટો છે?",
    /* phase 4 */
    "Adding the worths back up": "કિંમતો પાછી ઉમેરવી",
    "Every worth in the chart comes down into the bar, and the bar is added up.": "ચાર્ટની દરેક કિંમત નીચે પટ્ટીમાં આવે છે, અને પટ્ટી ઉમેરાય છે.",
    "What should all the worths come to together?": "બધી કિંમતો મળીને કેટલી થવી જોઈએ?",
    "A digit is worth what its own column says, never just itself.": "અંકની કિંમત એ જ છે જે તેનું પોતાનું ખાનું કહે છે, ફક્ત એ અંક નહીં.",
    "The place values of all the digits add back to the number they came from, and that is the check on every one of them.": "બધા અંકોની સ્થાનકિંમત ઉમેરતાં જે સંખ્યામાંથી તે આવ્યા હતા તે જ પાછી મળે છે, અને એ જ દરેકની ચકાસણી છે.",
    "You learned: every digit's worth adds back to the number.": "તમે શીખ્યા: દરેક અંકની કિંમત ઉમેરતાં એ જ સંખ્યા મળે છે.",
    "Add up the worths": "કિંમતો ઉમેરો",
    "Send every digit of 23.451 down as its worth. Then add the row and type what it comes to.": "23.451 ના દરેક અંકને તેની કિંમત તરીકે નીચે મોકલો. પછી હરોળ ઉમેરો અને જે આવે તે લખો.",
    "What is this digit worth in its own column?": "આ અંકની તેના ખાનામાં કિંમત શું છે?",
    "What do they make?": "આ મળીને શું બને છે?",
    "Now 52.874. Bring the worths down the same way and add them.": "હવે 52.874. કિંમતોને એ જ રીતે નીચે લાવો અને ઉમેરો.",
    "Small worths are still worth something. Did they all go down?": "નાની કિંમતો પણ મહત્ત્વની છે. શું તે બધી નીચે આવી?",
    "All six worths?": "છએ છ કિંમતો?",
    "Six digit cards and a point card make 472.836. Add all six worths and say what they come to.": "છ અંક કાર્ડ અને એક ટપકા કાર્ડ મળીને 472.836 બનાવે છે. છએ છ કિંમતો ઉમેરો અને કહો કે કેટલી થઈ.",
    "Six cards went down. Was each one sent as its worth?": "છ કાર્ડ નીચે ગયાં. શું દરેકને તેની કિંમત તરીકે મોકલ્યું?",
    /* what the working area draws */
    "hundreds": "શતક", "tens": "દશક", "ones": "એકમ",
    "tenths": "દશમો ભાગ", "hundredths": "સોમો ભાગ", "thousandths": "હજારમો ભાગ",
    "thousands": "હજાર", "ten thousands": "દસ હજાર",
    "named": "નામ આપ્યાં", "in the cut": "કાપની અંદર", "counted": "ગણ્યાં", "filled": "ભર્યાં", "settled": "નીચે આવ્યાં", "digits": "અંક",
    "place": "સ્થાન", "a name": "એક નામ", "worth": "કિંમત", "an amount": "એક રકમ",
    "from the dot": "ટપકાથી", "ten times smaller": "દસ ગણું નાનું", "left over": "બાકી રહ્યું",
    "from the left end": "ડાબા છેડેથી", "as they stand": "જેમ છે તેમ", "swapped over": "અદલાબદલી",
    "with your worth": "તમારી કિંમત સાથે", "one whole one": "એક પૂર્ણ", "of them": "એવા ટુકડા",
    "with small worths": "નાની કિંમતો સાથે", "before the dot": "ટપકા પહેલાં", "digits only": "ફક્ત અંક",
    "added up": "સરવાળો", "the number": "સંખ્યા",
    "Worths": "કિંમત", "Worths on": "કિંમત ચાલુ", "Worths off": "કિંમત બંધ",
    "numerator": "અંશ", "denominator": "છેદ",
  },
};

/* ── the chart ─────────────────────────────────────────────────────────────────────────── */

/* column 0 to 5, left to right; the dot keeps its own column between 2 (ones) and 3 (tenths) */
const PLACES = ["hundreds", "tens", "ones", "tenths", "hundredths", "thousandths"];
const DECIMALS = ["tenths", "hundredths", "thousandths"];
const PLACE_CHOICES = PLACES.slice(2).map((p) => ({ id: p, label: p }));
const DENOM = [1, 1, 1, 10, 100, 1000];

/* the chapter's content colours: a digit left of the point deep blue, right of it green, the point
   vermilion between them; amber marks the column under discussion and the tenth it counts, rose the
   hundredth, sky the thousandth; a zero only holding a place open is grey (never faint). */
const WHOLE = CONTENT.hundred;
const FRACT = CONTENT.one;
const DOTC = CONTENT.pointer;
const AMBER = CONTENT.ten;
const ROSE = CONTENT.bead;
const SKY = "#56B4E9";
const GREY = "#767676";
const PIECE = [WHOLE, WHOLE, WHOLE, AMBER, ROSE, SKY];
/* the column or digit under discussion (a ring, a count, the cut) is marked in the chrome's own
   quiet ink, never a content colour: amber means the tenths. The one exception is the plan's own
   "ringed in amber": the ring a correction draws round the first pair of digits that parts when a total
   stands beside its number. It is a dashed pill round a digit, never a solid or filled shape, so it can
   never be read as a tenths piece or a place label, only as "look here". */
const SEL = CHROME.accent;
/* numerals and words take a deeper ink of their colour, so they read at 4.5:1 on white and the panel */
const inkOf = (c: string) => shade(c, 0.25);

/* geometry in working-area units (1086 × 528) */
const CW = 162, DW = 74, X0 = 20;
const colX = (k: number) => X0 + k * CW + (k >= 3 ? DW : 0);
const colC = (k: number) => colX(k) + CW / 2;
const DOT_X = X0 + 3 * CW;
const DOT_C = DOT_X + DW / 2;
const G = { headY: 8, headH: 56, cellY: 70, cellH: 124, bottom: 194, countY: 214, countH: 56 };
const SLOT2 = { y: 288, h: 96, place: 93, worth: 593, w: 400 };
const BAR = { y: 212, h: 106, sw: 138, gap: 26 };
const TOTAL = { y: 326, h: 88, x: 243, w: 600 };
const LOW = { y: 424, h: 96 };
const FOOT = { y: 374, h: 94 };
/* the correction's own band, under the child's own reading of the chart */
const BAND = { grow: { y: 212, h: 148 }, bay: { y: 300, h: 150 }, count2: { y: 288, h: 232 }, count3: { y: 398, h: 126 } };

/* "248.573" → one digit a column, ones pinned at column 2; null where the column is empty */
const cellsOf = (s: string) => {
  const parts = String(s || "").split(".");
  const w = parts[0] || "", d = parts[1] || "";
  const c: any[] = [null, null, null, null, null, null];
  for (let i = 0; i < w.length && i < 3; i++) c[2 - i] = w[w.length - 1 - i];
  for (let i = 0; i < d.length && i < 3; i++) c[3 + i] = d[i];
  return c;
};
const digitsOf = (s: string) => String(s || "").replace(/[^0-9]/g, "");
/* every column the number actually fills, left to right */
const filledOf = (s: string) => cellsOf(s).map((d: any, k: number) => (d === null ? -1 : k)).filter((k: number) => k >= 0);
/* what one digit is worth where it stands: a whole number, or [numerator, denominator] */
const worthOf = (k: number, d: string) => (k < 3 ? Number(d) * Math.pow(10, 2 - k) : [Number(d), DENOM[k]]);
/* a whole number's places, right to left: ones, tens, hundreds, thousands, ten thousands */
const BAY_PLACES = ["ones", "tens", "hundreds", "thousands", "ten thousands"];

/* ── phases ─────────────────────────────────────────────────────────────────────────────
   kinds: grow  (drag the place names on to the empty ground past the ones; Enter commits)
          bay   (a long whole number read the other way: tap the column, then type how many)
          place (count from the dot, then pick the NAME of the column: a word key)
          worth (the AMOUNT the digit is worth there: the stacked fraction in the slot)
          rebuild (send every worth down into the bar, then type what they come to) */

const PHASES = [
  {
    n: 1,
    concept: "The chart carries on past the point",
    conceptId: "M1.S2.T5.C16", objectiveIds: ["O7"],
    says: ["The chart carries on to the right, and a dot marks where the whole ones end."],
    ladder: ["Is the next piece along bigger or smaller than a whole one?",
      "Each column right of the dot is ten times smaller than the one before it."],
    closing: "The place value chart runs on to the right of the ones place, past a dot, as tenths, hundredths and thousandths.",
    learned: "You learned: the chart runs on past the ones, through a dot.",
    traceback: "The chart is grown again from the ones outwards, each new column named as it appears with the piece it counts drawn under it, beside the child's own reading.",
    items: [
      /* learn ML1: answer in the plan = 2 hundreds, 4 tens, 8 ones, then the dot, then 5 tenths, 7 hundredths, 3 thousandths */
      { qid: "M1.S2.T5.C16:ML1", kind: "grow", num: "248.573", cards: ["hundredths", "thousandths", "tenths"], pad: "enter", winMs: 2200,
        ask: "Order from the dot", answer: "tenths|hundredths|thousandths",
        say: "Put 248.573 in the chart. Name each new column as it opens, from the dot outwards.",
        miss: "Which column is the last one you already knew?" },
      /* practice 1: answer in the plan = 547 */
      { qid: "M1.S2.T5.C16:1", kind: "bay", num: "5470", drop: 1, winMs: 2000,
        ask: "Tens in 5,470?", answer: 547,
        say: "How many tens are there in 5,470? Tap the column where the tens stand.",
        miss: "Which digit stands in the tens column here?" },
      /* practice 2: answer in the plan = Tenths, then hundredths, then thousandths */
      { qid: "M1.S2.T5.C16:2", kind: "grow", num: "36.907", cards: ["thousandths", "tenths", "hundredths"], pad: "enter", winMs: 2200,
        ask: "Order them again", answer: "tenths|hundredths|thousandths",
        say: "Now 36.907, with the columns bare again. Name the three places the same way.",
        miss: "The pieces get smaller as you travel right. Which comes first?" },
    ],
  },
  {
    n: 2,
    concept: "Counting places from the point",
    conceptId: "M1.S2.T5.C17", objectiveIds: ["O7"],
    says: ["A number is in the chart with its headings turned over. Start at the dot and step right."],
    ladder: ["How many columns along from the dot is this digit?",
      "Count one, two, three as you pass each column, and stop on the lit one."],
    closing: "Position alone decides a digit's place, and the places are counted from the point outwards.",
    learned: "You learned: places are counted from the point outwards.",
    traceback: "The count runs again from the dot and the column takes its name; where a digit's size decided it, the two digits are swapped over and both readings are left standing; where the count began at the left hand end, both runs are drawn and numbered over the columns.",
    items: [
      /* learn ML2: answer in the plan = The 8 is in the hundredths place and the 2 is in the thousandths place
         this one meets the phase's first misconception: the bigger digit is given the bigger place */
      { qid: "M1.S2.T5.C17:ML2", kind: "place", num: "6.482", lit: 4, choices: PLACE_CHOICES, winMs: 2600,
        ask: "Place of the 8?", answer: "hundredths",
        say: "In 6.482, the 8 is lit. Count along from the dot and name the place it stands in.",
        miss: "A big digit does not get a big place. Only the column decides." },
      /* practice 3: answer in the plan = The tenths place
         this one meets the second misconception: the places counted from the left hand end of the number */
      { qid: "M1.S2.T5.C17:3", kind: "place", num: "7.328", lit: 3, err: "left", choices: PLACE_CHOICES, winMs: 2600,
        ask: "Place of the 3?", answer: "tenths",
        say: "Now the 3 in 7.328. Count the same way.",
        miss: "Where does your counting start? Find the dot before you count." },
      /* practice 4: answer in the plan = 486 */
      { qid: "M1.S2.T5.C17:4", kind: "bay", num: "48600", drop: 2, winMs: 2000,
        ask: "Hundreds in 48,600?", answer: 486,
        say: "Read 48,600 the other way. Cut it at the hundreds and say how many are inside.",
        miss: "Which column holds the hundreds in this number?" },
    ],
  },
  {
    n: 3,
    concept: "Place and place value are not the same word",
    conceptId: "M1.S2.T5.C18", objectiveIds: ["O8"],
    says: ["Two questions about one digit now. Where it sits has a name, and what it is worth is an amount."],
    ladder: ["How much is one piece of that column worth?",
      "A name goes in the slot headed place, and an amount in the slot headed worth."],
    closing: "The place of a digit is where it sits and is a name; the place value is what it is worth there and is an amount.",
    learned: "You learned: the place is a name, the place value an amount.",
    traceback: "The lit column is read twice over, once as the name written above it and once as the piece it counts, drawn at its real size with its amount beside it.",
    items: [
      /* learn ML3: answer in the plan = Its place is the tenths place, and its place value is 1/10, which is 0.1 */
      { qid: "M1.S2.T5.C18:ML3", kind: "place", num: "34.16", lit: 3, choices: PLACE_CHOICES, winMs: 3000,
        ask: "The place of the 1", answer: "tenths",
        say: "In 34.16, the 1 is lit. Give its place, the name of the column it stands in.",
        miss: "A place is a name you can read off the top of a column." },
      /* practice 5: answer in the plan = Its place is the thousandths place, and its place value is 7/1000, which is 0.007 */
      { qid: "M1.S2.T5.C18:5", kind: "worth", num: "91.507", lit: 5, parts: SLOT_FRACTION, winMs: 2400,
        ask: "What is the 7 worth?", answer: [7, 1000],
        say: "In 91.507 the 7 sits in the thousandths place. Now give what it is worth there.",
        miss: "How many of that piece make one whole one?" },
      /* practice 6: answer in the plan = Tenths is the name of the place, not the worth; the place value is 6/10, which is 0.6
         the worth slot takes only an amount, so the story told is the phase's second misconception, the one
         this item grades (nearMiss 6 over 1): the digit taken as its own worth */
      { qid: "M1.S2.T5.C18:6", kind: "worth", num: "5.63", lit: 3, parts: SLOT_FRACTION, winMs: 2400,
        ask: "What is the 6 worth?", answer: [6, 10],
        say: "A child says the 6 in 5.63 is worth just 6. Where it stands, what is it really worth?",
        miss: "The 6 stands one column past the dot. And how big is one of those pieces?" },
    ],
  },
  {
    n: 4,
    concept: "Adding the worths back up",
    conceptId: "M1.S2.T5.C19", objectiveIds: ["O8"],
    says: ["Every worth in the chart comes down into the bar, and the bar is added up."],
    ladder: ["What should all the worths come to together?",
      "A digit is worth what its own column says, never just itself."],
    closing: "The place values of all the digits add back to the number they came from, and that is the check on every one of them.",
    learned: "You learned: every digit's worth adds back to the number.",
    traceback: "The bare digits are added in the bar and the small total is stood beside the number the chart started from; then the worths come down and the row is added again. Where the digits after the dot were left out, the whole number worths alone are added first, and the small ones walk in after them.",
    items: [
      /* learn ML4: answer in the plan = 20 + 3 + 4/10 + 5/100 + 1/1000, which comes back to 23.451 */
      { qid: "M1.S2.T5.C19:ML4", kind: "rebuild", num: "23.451", winMs: 3200,
        ask: "Add up the worths", answer: "23.451",
        say: "Send every digit of 23.451 down as its worth. Then add the row and type what it comes to.",
        miss: "What is this digit worth in its own column?" },
      /* practice 7: answer in the plan = 50 + 2 + 8/10 + 7/100 + 4/1000, which comes back to 52.874
         this one meets the phase's second misconception: the digits after the dot left out of the sum */
      { qid: "M1.S2.T5.C19:7", kind: "rebuild", num: "52.874", err: "whole", winMs: 3200,
        ask: "What do they make?", answer: "52.874",
        say: "Now 52.874. Bring the worths down the same way and add them.",
        miss: "Small worths are still worth something. Did they all go down?" },
      /* practice 8: answer in the plan = 400 + 70 + 2 + 8/10 + 3/100 + 6/1000, which comes to 472.836 */
      { qid: "M1.S2.T5.C19:8", kind: "rebuild", num: "472.836", winMs: 3200,
        ask: "All six worths?", answer: "472.836",
        say: "Six digit cards and a point card make 472.836. Add all six worths and say what they come to.",
        miss: "Six cards went down. Was each one sent as its worth?" },
    ],
  },
];

/* The numbers, rows, sizes and targets the working area needs (they go into the sidecar too). */
const MODEL = {
  columnWidth: CW, dotColumnWidth: DW, places: PLACES, decimalPlaces: DECIMALS, denominators: DENOM,
  wholeNumberPlaces: BAY_PLACES, rebuildBar: { slotWidth: BAR.sw, gap: BAR.gap },
};

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* judge: a worth is a fraction (both boxes), a rebuild total is a decimal string in its written
   form ("23.451", never "23.45" or "23.4510"), a place is a name, a grow answer is the order */
const judge = (item: any, v: any) => {
  if (item.parts) return judgeSlotParts(item, v);
  if (typeof item.answer === "number") return leadNumber(v) === item.answer;
  return String(v).trim().toLowerCase() === String(item.answer).trim().toLowerCase();
};

/* oracle: every answer re-derived from the number itself, sharing no code with judge or Work */
const oracle = () => PHASES.every((p: any) => p.items.every((it: any) => {
  const s = String(it.num || "");
  const cut = s.split("."), whole = cut[0] || "", dec = cut[1] || "";
  if (it.kind === "grow") {
    const want = ["tenths", "hundredths", "thousandths"], got = String(it.answer).split("|");
    return dec.length === 3 && got.length === 3 && got.every((x: string, i: number) => x === want[i]);
  }
  if (it.kind === "bay") {
    const d = s.replace(/[^0-9]/g, "");
    return d.length > it.drop && Number(d.slice(0, d.length - it.drop)) === it.answer;
  }
  if (it.kind === "place") {
    const at = it.lit - 3;
    return at >= 0 && dec.length > at && ["tenths", "hundredths", "thousandths"][at] === it.answer;
  }
  if (it.kind === "worth") {
    const at = it.lit - 3;
    return at >= 0 && dec.length > at && Number(dec[at]) === it.answer[0] && [10, 100, 1000][at] === it.answer[1];
  }
  if (it.kind === "rebuild") {
    /* add every digit's worth in thousandths: the number must come back exactly */
    let sum = 0;
    whole.split("").reverse().forEach((c: string, i: number) => { sum += Number(c) * Math.pow(10, i) * 1000; });
    dec.split("").forEach((c: string, i: number) => { sum += Number(c) * Math.pow(10, 2 - i); });
    return dec.length === 3 && sum === Math.round(Number(s) * 1000) && String(it.answer) === s;
  }
  return false;
}));

/* the place a count that began at the left hand end of the number would land on */
const fromLeftEnd = (item: any) => {
  const whole = String(item.num || "").split(".")[0] || "";
  const at = whole.length + (item.lit - 3);      /* how far along the digits the lit one stands */
  return DECIMALS[Math.min(at, DECIMALS.length - 1)];
};
/* the digit of another decimal column that most tempts a swap: the biggest one standing elsewhere */
const temptOf = (item: any) => {
  const c = cellsOf(String(item.num || ""));
  let best = -1;
  [3, 4, 5].forEach((k) => {
    if (k === item.lit || c[k] === null) return;
    if (best < 0 || Number(c[k]) > Number(c[best])) best = k;
  });
  return best;
};
/* the whole number part's worths added alone, with everything after the dot left out */
const wholeOnly = (item: any) => {
  const whole = String(item.num || "").split(".")[0] || "";
  return Number(whole);
};

/* two written numbers read digit for digit from the left: the first place where they part. A whole place
   is its power of ten (0 = ones), "dot" where only one of them has a point, and a place past the point is
   -1, -2, -3 (tenths, hundredths, thousandths); null when the two read the same. */
const firstParting = (a: string, b: string) => {
  const aw = a.split(".")[0] || "", bw = b.split(".")[0] || "";
  for (let j = Math.max(aw.length, bw.length) - 1; j >= 0; j--) {
    if ((aw[aw.length - 1 - j] || "") !== (bw[bw.length - 1 - j] || "")) return j;
  }
  if ((a.indexOf(".") < 0) !== (b.indexOf(".") < 0)) return "dot";
  const ad = a.split(".")[1] || "", bd = b.split(".")[1] || "";
  for (let i = 0; i < Math.max(ad.length, bd.length); i++) if ((ad[i] || "") !== (bd[i] || "")) return -(i + 1);
  return null;
};
/* where one place of a written number stands when its point stands at `at` (P a digit's room, D the point's) */
const partPlaceX = (pl: any, at: number, P: number, D: number) =>
  pl === "dot" ? at : pl >= 0 ? at - D / 2 - (pl + 0.5) * P : at + D / 2 + (-pl - 0.5) * P;
/* every character of a written number on its own place, so two numbers line up place for place */
const partCharXs = (t: string, at: number, P: number, D: number) => {
  const w = t.split(".")[0] || "", xs: number[] = [];
  for (let i = 0; i < w.length; i++) xs.push(partPlaceX(w.length - 1 - i, at, P, D));
  if (t.indexOf(".") >= 0) {
    xs.push(at);
    (t.split(".")[1] || "").split("").forEach((_: string, i: number) => xs.push(partPlaceX(-(i + 1), at, P, D)));
  }
  return xs;
};
/* the row a worth item's miss builds: every digit's worth, the child's own worth standing in for the lit
   digit's, added exactly (in millionths). null when that total cannot stand in the chart (a zero under the
   bar, a worth that never ends, more than three places either side of the point) or when it comes back to
   the number, so there is no pair that parts to ring. */
const yourWorthRow = (item: any, ps: any) => {
  if (!ps || ps[0] === "" || ps[1] === "" || ps[0] === undefined || ps[1] === undefined) return null;
  const a = Number(ps[0]), b = Number(ps[1]), M = 1000000;
  if (!isFinite(a) || !isFinite(b) || b <= 0 || (a * M) % b !== 0) return null;
  const s = String(item.num || ""), c = cellsOf(s), chips: string[] = [];
  let sum = 0, mine = -1;
  filledOf(s).forEach((k: number) => {
    if (k === item.lit) { mine = chips.length; chips.push(b === 1 ? String(a) : a + "/" + b); sum += (a * M) / b; return; }
    const w: any = worthOf(k, String(c[k]));
    chips.push(Array.isArray(w) ? w[0] + "/" + w[1] : String(w));
    sum += Array.isArray(w) ? (w[0] * M) / w[1] : w * M;
  });
  const whole = String(Math.floor(sum / M)), rest = ("000000" + String(sum % M)).slice(-6).replace(/0+$/, "");
  const added = rest ? whole + "." + rest : whole;
  if (whole.length > 3 || rest.length > 3 || added === s) return null;
  return { chips, mine, added };
};

/* the most likely wrong answer (the misconception this item is set to meet); judge must reject it.
   Each phase's brief names two errors, and the items of a phase are split between them. */
const nearMiss = (item: any) => {
  /* reads the columns after the point leftwards, so tenths ends up at the far right */
  if (item.kind === "grow") return String(item.answer).split("|").reverse().join("|");
  /* reads the whole number without cutting it at all */
  if (item.kind === "bay") return Number(digitsOf(item.num));
  /* counts the places from the left hand end of the number, else gives the biggest digit the biggest place */
  if (item.kind === "place") return item.err === "left" ? fromLeftEnd(item) : item.answer === "tenths" ? "hundredths" : "tenths";
  /* says the digit itself is the worth (six is worth six) */
  if (item.kind === "worth") return [item.answer[0], 1];
  /* leaves the digits after the dot out, else adds the bare digits instead of what each is worth */
  if (item.kind === "rebuild") return item.err === "whole" ? String(wholeOnly(item))
    : String(digitsOf(item.num).split("").reduce((a: number, c: string) => a + Number(c), 0));
  return "~";
};

/* the forms of an answer that no question, hint or ladder line may print */
const answerForms = (item: any) =>
  /* grow and rebuild: the number IS the question, and the place names are printed on the cards */
  item.kind === "grow" || item.kind === "rebuild" ? []
    : item.parts ? item.answer.filter((x: number) => x >= 10).flatMap((x: number) => [String(x), indian(x), words(x)])
      : typeof item.answer === "number" ? [String(item.answer), indian(item.answer), words(item.answer)]
        : [String(item.answer)];

/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => item.answer;

/* what the slot prints. A grown chart's answer is three place names, far too long to stand in the
   slot, so the slot carries the order they were made in, the same 1, 2, 3 the chart wears under each
   new column. Every other answer is printed as it is (a part box is never rewritten). */
const format = (v: any, k?: any) => {
  if (k !== undefined && k !== null) return v;
  const s = String(v === null || v === undefined ? "" : v);
  if (s.indexOf("|") < 0) return s;
  const at = s.split("|").map((x: string) => DECIMALS.indexOf(x));
  if (at.some((i: number) => i < 0)) return s;
  return at.map((i: number) => String(i + 1)).join(" ");
};

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => {
  if (T.state().stage === "demo") return HOOK.demo && HOOK.demo();
  if (item.kind === "grow") { HOOK.set && HOOK.set(item.answer); setTimeout(() => HOOK.enter && HOOK.enter(), 60); return; }
  if (HOOK.set) HOOK.set(item.answer);
  return T.submit(item.answer);
};
/* the agent's answer(): it sets the working area as a child would, then types where the slot is used.
   A rebuild total is a decimal, so the tool types it itself (the runtime's own typing keeps digits only). */
const answer = (item: any, v: any) => {
  if (!HOOK.set) return undefined;
  if (item.kind === "grow") { HOOK.set(v); return true; }
  HOOK.set(v);
  if (item.kind === "rebuild" && HOOK.type) { HOOK.type(String(v)); return true; }
  return undefined;
};
/* the agent's check() before Enter; undefined = press Enter */
const check = () => (HOOK.check ? HOOK.check() : undefined);

/* ── small pieces the working area draws ─────────────────────────────────────────────────── */

const PWC_CSS = `
.pwc-move{transition:transform 420ms cubic-bezier(.3,.7,.25,1)}
.pwc-new{animation:pwcIn 520ms ease-out both}
@keyframes pwcIn{from{opacity:0;transform:translateY(-14px)}to{opacity:1;transform:none}}
.pwc-grab{cursor:grab}
.pwc-tap{cursor:pointer}
@media (prefers-reduced-motion:reduce){.pwc-move{transition:none}.pwc-new{animation:none}}
`;

/* a place name over its column: condensed rather than spilling when the word is long */
const fit = (text: string, w: number) =>
  String(text).length * T.micro * 0.58 > w ? { textLength: w, lengthAdjust: "spacingAndGlyphs" as any } : {};

/* a fraction drawn stacked, the way the book writes a worth: numerator over a bar over denominator.
   Never "5/10" on the picture, and never a comma inside its digits. */
function Frac({ x, y, a, b, color, size }: any) {
  const s = size || T.micro;
  const w = Math.max(46, Math.max(String(a).length, String(b).length) * s * 0.66);
  return (
    <g>
      <text x={x} y={y - 12} textAnchor="middle" fontSize={s} fontWeight={700} fill={color}>{a}</text>
      <rect x={x - w / 2} y={y - 5} width={w} height={3.5} rx={1.75} fill={color} />
      <text x={x} y={y + s + 2} textAnchor="middle" fontSize={s} fontWeight={700} fill={color}>{b}</text>
    </g>
  );
}

/* the piece a decimal column counts, drawn at its real size out of one whole one:
   a tenth is one strip of ten, a hundredth one square of a hundred, a thousandth one sliver of it */
function Piece({ x, y, w, k, C }: any) {
  const col = PIECE[k], h = w;
  const cells = [];
  for (let i = 0; i < 10; i++) {
    const sel = i === 0;
    if (k === 3) cells.push(<rect key={i} x={x + (w / 10) * i} y={y} width={w / 10} height={h} fill={sel ? col : "#FFFFFF"} stroke={C.rule} strokeWidth={1.2} />);
    else cells.push(<rect key={i} x={x + (w / 10) * i} y={y} width={w / 10} height={h} fill="#FFFFFF" stroke={C.rule} strokeWidth={1.2} />);
  }
  const rows = [];
  if (k >= 4) for (let r = 0; r < 10; r++) rows.push(<line key={r} x1={x} y1={y + (h / 10) * r} x2={x + w} y2={y + (h / 10) * r} stroke={C.rule} strokeWidth={1.2} />);
  return (
    <g>
      {cells}
      {rows}
      {k === 4 && <rect x={x} y={y} width={w / 10} height={h / 10} fill={col} stroke={shade(col, 0.3)} strokeWidth={1.2} />}
      {k === 5 && <rect x={x} y={y} width={w / 100} height={h / 10} fill={col} stroke={shade(col, 0.3)} strokeWidth={1} />}
      <rect x={x} y={y} width={w} height={h} fill="none" stroke={C.ink} strokeWidth={2.2} />
    </g>
  );
}

/* a total stood beside the number the chart started from, every character on its own place, so the pair
   of any place stands at the same spot in both halves and the two are read digit for digit. The first
   pair that parts is ringed in amber (the plan's own marker), and nothing else is marked: when the two
   read the same there is no ring at all (`ring={false}` holds it back while the two are first read). */
const SideBySide = ({ x, y, w, h, a, b, la, lb, C, ring: ringOn, ld = 0 }: any) => {   /* ld: the two labels sit a little lower in hi/gu, whose tall letters would touch the box edge */
  const P = 36, D = 26, half = w / 2;          /* a digit's room and the point's: wide enough for the ring */
  const wl = (t: string) => (t.split(".")[0] || "").length, dl = (t: string) => (t.split(".")[1] || "").length;
  const mw = Math.max(wl(a), wl(b)), md = Math.max(dl(a), dl(b));
  const off = (half - (mw * P + D + md * P)) / 2 + mw * P + D / 2;   /* where the point stands in each half */
  const base = y + h - 14, quiet = mix(C.ink, "#FFFFFF", 0.35), pl = ringOn === false ? null : firstParting(a, b);
  const ring = (at: number) => {
    if (pl === null) return null;
    const cx = partPlaceX(pl, at, P, D), rw = pl === "dot" ? D - 4 : P - 2;
    /* a dashed pill, never a filled or solid shape, so it reads as "look here" and never as a tenths piece */
    return <rect x={cx - rw / 2} y={base - 40} width={rw} height={50} rx={rw / 2} fill="none" stroke={AMBER} strokeWidth={4}
      strokeDasharray="6 5" strokeLinecap="round" />;
  };
  return (
    <g>
      <line x1={x + half} y1={y + 8} x2={x + half} y2={y + h - 8} stroke={C.rule} strokeWidth={1.5} />
      <text x={x + 16} y={y + 26 + ld} fontSize={T.micro} fontWeight={600} fill={quiet}>{la}</text>
      <text x={x + half + 16} y={y + 26 + ld} fontSize={T.micro} fontWeight={600} fill={quiet}>{lb}</text>
      {ring(x + off)}
      {ring(x + half + off)}
      <text x={partCharXs(a, x + off, P, D).join(" ")} y={base} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={inkOf(WHOLE)}>{a}</text>
      <text x={partCharXs(b, x + half + off, P, D).join(" ")} y={base} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={inkOf(WHOLE)}>{b}</text>
    </g>
  );
};

/* ── the working area: 1086 x 528, origin at its top-left ─────────────────────────────────
   The child drags place-name cards on to the empty ground, taps a column to cut a long whole
   number, counts from the dot, picks a name, types an amount, and sends every worth down into
   the rebuild bar. After a miss the correction is drawn on a layer of its own (`show`), so the
   child's own cards, cut and worths are never rewritten: the next act clears the layer. */
function Work({ phase, n, item, index, stage, wrong, typed, api, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();
  const free = stage === "free";
  const kind = free ? "free" : String(item.kind || "");
  const num = free ? "" : String(item.num || "");
  const cells = useMemo(() => cellsOf(num), [num]);
  const filled = useMemo(() => filledOf(num), [num]);

  const [placed, setPlaced] = useState<string[]>([]);      /* grow: the names dropped, left to right */
  const [cut, setCut] = useState(-1);                       /* bay: the last column inside the cut */
  const [count, setCount] = useState(0);                    /* place: columns counted from the dot */
  const [down, setDown] = useState<number[]>([]);           /* rebuild: the columns already sent down */
  const [show, setShow] = useState<any>(null);              /* the correction's own layer */
  const [lift, setLift] = useState<any>(null);              /* a worth on its way down */
  const [readAt, setReadAt] = useState(-1);                 /* the pair being read, digit for digit */
  const [freeCells, setFreeCells] = useState<any[]>([null, null, null, null, null, null]);
  const [worthsOn, setWorthsOn] = useState(false);
  const [touched, setTouched] = useState(false);
  const placedRef = useRef<string[]>([]);
  const cutRef = useRef(-1);
  const downRef = useRef<number[]>([]);
  const freeRef = useRef<any[]>([null, null, null, null, null, null]);
  const setupFor = useRef(-1);
  const busy = tl.busy;

  const reset = () => {
    tl.stop();
    placedRef.current = []; cutRef.current = -1; downRef.current = [];
    setPlaced([]); setCut(-1); setCount(0); setDown([]); setShow(null); setLift(null); setReadAt(-1); setTouched(false);
    api.lock(false);
  };
  useEffect(() => {
    if (stage === "ask" && setupFor.current !== index) { setupFor.current = index; reset(); }
  }, [stage, index]);
  useEffect(() => {
    if (!free) return;
    setupFor.current = -2;
    reset();
    freeRef.current = [null, null, null, null, null, null];
    setFreeCells(freeRef.current.slice());
    setWorthsOn(false);
  }, [free]);

  /* the correction stands until the child's next act, then it goes (never written into their pieces) */
  const clearShow = () => { setShow((s: any) => (s ? null : s)); };

  /* ── what the child does ── */
  const liveAsk = stage === "ask" && !busy;

  const dropName = (name: string, at?: number) => {
    if (!liveAsk || kind !== "grow") return;
    const cur = placedRef.current;
    if (cur.includes(name) || cur.length >= 3) return;
    const slot = at === undefined || at === null || isNaN(at) ? cur.length : at;
    if (slot !== cur.length) return;              /* the columns arrive left to right, as they are made */
    clearShow(); setTouched(true);
    const next = [...cur, name];
    placedRef.current = next; setPlaced(next);
    api.sfx.tick();
  };
  const takeName = (i: number) => {
    if (!liveAsk || kind !== "grow") return;
    const cur = placedRef.current;
    if (i !== cur.length - 1) return;             /* only the last column made can be taken back */
    clearShow(); setTouched(true);
    const next = cur.slice(0, i);
    placedRef.current = next; setPlaced(next);
  };
  const setCutAt = (k: number) => {
    if (!liveAsk || kind !== "bay") return;
    clearShow(); setTouched(true);
    cutRef.current = k; setCut(k);
    api.sfx.tick();
  };
  const stepCount = () => {
    if (!liveAsk || kind !== "place") return;
    clearShow(); setTouched(true);
    setCount((c) => (c >= 3 ? 0 : c + 1));
    api.sfx.tick();
  };
  const sendDown = (k: number) => {
    if (!liveAsk || kind !== "rebuild") return;
    if (downRef.current.includes(k)) return;
    clearShow(); setTouched(true);
    const next = [...downRef.current, k];
    downRef.current = next;
    const slot = filled.indexOf(k);
    setLift({ k, slot });
    tl.run([[60, () => {}], [320, () => { setDown(next); setLift(null); api.sfx.tick(); }]]);
  };
  const dropFree = (d: string, k: number) => {
    if (!free || k < 0 || k > 5) return;
    const next = freeRef.current.slice();
    next[k] = d;
    freeRef.current = next; setFreeCells(next);
    api.sfx.tick();
  };
  const clearFree = (k: number) => {
    if (!free || freeRef.current[k] === null) return;
    const next = freeRef.current.slice();
    next[k] = null;
    freeRef.current = next; setFreeCells(next);
  };

  /* which column a point on the working area belongs to (-1 = none) */
  const columnAt = (p: any) => {
    if (!p || isNaN(p.x) || p.y > G.bottom + 40) return -1;
    for (let k = 0; k < 6; k++) if (p.x >= colX(k) && p.x <= colX(k) + CW) return k;
    return -1;
  };

  const drag = useDrag((payload: any, p: any, moved: boolean) => {
    if (payload.src === "name") { dropName(payload.name, moved ? columnAt(p) - 3 : undefined); return; }
    if (payload.src === "digit") { sendDown(payload.k); return; }
    if (payload.src === "free") { const k = moved ? columnAt(p) : 2; if (k >= 0) dropFree(payload.d, k); return; }
  });

  /* ── Enter, and the hooks the agent and the dev driver use ── */
  const enterFn: any = kind === "grow" && stage === "ask" ? () => api.submit(placedRef.current.join("|")) : null;
  api.onEnter(enterFn);
  HOOK.enter = () => enterFn && enterFn();
  HOOK.check = () => undefined;
  HOOK.demo = () => undefined;
  HOOK.type = (s: string) => api.setTyped(String(s));
  HOOK.set = (v: any) => {
    if (kind === "grow") {
      const names = String(v || "").split("|").filter((x: string) => DECIMALS.indexOf(x) >= 0);
      placedRef.current = names; setPlaced(names);
    } else if (kind === "bay") {
      const d = digitsOf(num);
      cutRef.current = d.length - 1 - (item.drop || 0); setCut(cutRef.current);
    } else if (kind === "place") {
      setCount(item.lit - 2);
    } else if (kind === "rebuild") {
      downRef.current = filled.slice(); setDown(filled.slice());
    }
  };

  /* ── the win: the maths moving, never a mark ── */
  useEffect(() => {
    if (stage !== "win") return;
    if (kind === "grow") tl.run([[300, () => setShow({ kind: "grown", names: DECIMALS })], [900, () => {}]]);
    else if (kind === "bay") tl.run([[300, () => setShow({ kind: "cut", drop: item.drop })], [900, () => {}]]);
    else if (kind === "place") tl.run([[300, () => setShow({ kind: "named", at: item.lit, name: item.answer })],
      [900, () => setShow({ kind: "named", at: item.lit, name: item.answer, worth: worthOf(item.lit, String(cells[item.lit])) })], [900, () => {}]]);
    else if (kind === "worth") tl.run([[300, () => setShow({ kind: "worthPiece", at: item.lit, worth: item.answer })], [1200, () => {}]]);
    else if (kind === "rebuild") {
      const steps: any[] = [[200, () => setShow({ kind: "total", total: item.num })]];
      digitsOf(item.num).split("").forEach((_: string, i: number) => steps.push([320, () => setReadAt(i)]));
      steps.push([420, () => setReadAt(-1)]);
      tl.run(steps);
    }
  }, [stage]);

  /* ── the traceback: the mathematics redrawn, ending on the whole right answer ──
     It is drawn on `show`, a layer of its own: the child's cards, cut, count and worths stay
     exactly where they were put, so the next tap confirms the correction instead of undoing it. */
  useEffect(() => {
    if (!wrong || stage !== "ask") return;
    api.lock(true);
    const done = () => api.lock(false);
    if (kind === "grow") {
      tl.run([[400, () => setShow({ kind: "grown", names: [] })],
        [700, () => setShow({ kind: "grown", names: DECIMALS.slice(0, 1) })],
        [700, () => setShow({ kind: "grown", names: DECIMALS.slice(0, 2) })],
        [700, () => setShow({ kind: "grown", names: DECIMALS })], [500, () => {}]], done);
    } else if (kind === "bay") {
      tl.run([[400, () => setShow({ kind: "cut", drop: item.drop, step: 0 })],
        [800, () => setShow({ kind: "cut", drop: item.drop, step: 1 })], [600, () => {}]], done);
    } else if (kind === "place" && item.err === "left") {
      /* the count run twice, both runs left drawn and numbered: once from the left hand end of the
         number, which begins on a digit standing before the dot, and once from the dot outwards */
      const steps: any[] = [];
      for (let i = 1; i <= 3; i++) { const j = i; steps.push([520, () => setShow({ kind: "twoCounts", left: j, right: 0 })]); }
      for (let i = 1; i <= item.lit - 2; i++) { const j = i; steps.push([520, () => setShow({ kind: "twoCounts", left: 3, right: j })]); }
      steps.push([600, () => setShow({ kind: "twoCounts", left: 3, right: item.lit - 2, name: item.answer })]);
      steps.push([600, () => {}]);
      tl.run(steps, done);
    } else if (kind === "place") {
      /* the count from the dot, and then the two digits swapped over: the places stay where they are,
         so the size of a digit never decided anything. Both readings are left standing. */
      const other = temptOf(item);
      const steps: any[] = [[400, () => setShow({ kind: "counting", upto: 0 })]];
      for (let i = 1; i <= item.lit - 2; i++) { const j = i; steps.push([520, () => setShow({ kind: "counting", upto: j })]); }
      steps.push([600, () => setShow({ kind: "named", at: item.lit, name: item.answer })]);
      if (other >= 0) {
        steps.push([800, () => setShow({ kind: "swap", at: item.lit, other, swapped: false })]);
        steps.push([1000, () => setShow({ kind: "swap", at: item.lit, other, swapped: true })]);
      }
      steps.push([600, () => {}]);
      tl.run(steps, done);
    } else if (kind === "worth") {
      /* the child's own worth is carried down with every other digit's worth and the row is added: the
         total is stood beside the number the chart started from and the first pair that parts is ringed
         in amber. Then the column is read again, the piece it counts drawn at its real size, ending on
         the whole worth. A worth that cannot stand in the chart goes straight to the second reading. */
      const mine = yourWorthRow(item, slotPartsOf(typed, 2));
      const steps: any[] = [];
      if (mine) {
        steps.push([400, () => setShow({ kind: "yourRow", ...mine, ring: false })]);
        steps.push([900, () => setShow({ kind: "yourRow", ...mine, ring: true })]);
        steps.push([1700, () => setShow({ kind: "worthPiece", at: item.lit, worth: null })]);
      } else steps.push([400, () => setShow({ kind: "worthPiece", at: item.lit, worth: null })]);
      steps.push([900, () => setShow({ kind: "worthPiece", at: item.lit, worth: item.answer })]);
      steps.push([600, () => {}]);
      tl.run(steps, done);
    } else if (item.err === "whole") {
      /* the whole number worths added on their own: the total lands on a whole number and the reading
         parts at the dot. Then the small worths walk into the row one at a time, each one changing the
         total as it lands, and the row is added again with the first total still standing above it. */
      const whole = String(item.num).split(".")[0], dec = String(item.num).split(".")[1] || "";
      const wc = filled.filter((k: number) => k < 3).map((k: number) => String(worthOf(k, String(cells[k]))));
      const dc = filled.filter((k: number) => k >= 3).map((k: number) => { const w: any = worthOf(k, String(cells[k])); return w[0] + "/" + w[1]; });
      const row = (n: number) => ({ kind: "bare", chips: wc.concat(dc.slice(0, n)), label: n > 0 ? "with small worths" : "before the dot" });
      const steps: any[] = [[400, () => setShow({ ...row(0), sum: whole })],
        [1000, () => setShow({ ...row(0), sum: whole, total: whole })]];
      /* the total beside the number rings the first pair that parts: the dot first, then each place
         the next small worth has not reached yet, until the two read the same */
      dc.forEach((_: string, i: number) => {
        const t = whole + "." + dec.slice(0, i + 1);
        steps.push([i === 0 ? 1500 : 1100, () => setShow({ ...row(i + 1), sum: t, total: t })]);
      });
      steps.push([700, () => {}]);
      tl.run(steps, done);
    } else {
      /* the bare digits come down exactly as they were sent, the row adds itself, and the small total
         lands nowhere near the number; then the worths are added and the number comes back */
      const bare = String(digitsOf(item.num).split("").reduce((a: number, c: string) => a + Number(c), 0));
      const chips = digitsOf(item.num).split("");
      tl.run([[400, () => setShow({ kind: "bare", chips, sum: bare, label: "digits only" })],
        [1100, () => setShow({ kind: "bare", chips, sum: bare, label: "digits only", total: bare })],
        [1900, () => setShow({ kind: "bare", chips, sum: bare, label: "digits only", total: item.num })], [700, () => {}]], done);
    }
  }, [wrong]);

  /* ── what the host and the agent read back (toolApi.getState) ── */
  const placeWord = kind === "place" ? String(typed || "") : kind === "worth" ? String(item.answer ? "" : "") : "";
  api.share({
    columns: 7, digits: free ? freeRef.current.map((d: any) => (d === null ? "." : d)).join("") : num,
    placeSlot: kind === "place" ? (typed || null) : kind === "worth" ? PLACES[item.lit] : null,
    worthSlot: kind === "worth" ? (typed || null) : null,
    given: kind === "grow" ? placed.length : kind === "rebuild" ? down.length : kind === "place" ? count : kind === "bay" ? (cut < 0 ? 0 : cut + 1) : 0,
    rebuildTotal: show && show.total ? show.total : null,
    cards: kind === "grow" ? (item.cards || []).filter((c: string) => placed.indexOf(c) < 0) : [],
    complete: stage === "idle",
  });

  /* ── drawing ─────────────────────────────────────────────────────────────────────── */
  const quiet = mix(C.ink, "#FFFFFF", 0.35);
  const chartCells = free ? freeCells : cells;
  /* phase 2 turns the decimal headings face down: the column, not the digit, decides the place */
  const faceDown = kind === "place" && item.lit >= 3;
  const namedCols = (k: number) => {
    if (free) return true;
    if (kind === "grow") return k < 3 ? true : placed.length > k - 3;
    if (kind === "place") return k < 3 ? true : !faceDown;
    return true;
  };
  /* the column a grown chart will take next: the columns arrive left to right, as they are made */
  const nextCol = kind === "grow" && placed.length < 3 ? placed.length + 3 : -1;
  const headOf = (k: number) => {
    if (free || kind !== "grow") return PLACES[k];
    return k < 3 ? PLACES[k] : placed[k - 3] || "";
  };
  const digitInk = (k: number, d: any) => (d === "0" ? GREY : k < 3 ? inkOf(WHOLE) : inkOf(FRACT));
  const gone = (k: number) => kind === "rebuild" && down.indexOf(k) >= 0;

  const worthTyped = kind === "worth" ? slotPartsOf(typed, 2) : ["", ""];
  const worthTypedCount = (kind === "worth" ? 1 : 0) + (worthTyped[0] !== "" && worthTyped[1] !== "" ? 1 : 0);

  /* the running count: what has settled against what the chart is holding */
  const runs =
    kind === "grow" ? { k: placed.length, n: 3, label: "named" }
      : kind === "bay" ? { k: cut < 0 ? 0 : cut + 1, n: digitsOf(num).length, label: "in the cut" }
        : kind === "place" ? { k: count, n: 3, label: "counted" }
          : kind === "worth" ? { k: worthTypedCount, n: 2, label: "filled" }
            : kind === "rebuild" ? { k: down.length, n: filled.length, label: "settled" }
              : { k: freeCells.filter((d: any) => d !== null).length, n: 6, label: "digits" };

  /* ── the chart ── */
  const chart = kind === "bay" ? null : (
    <g>
      {Array.from({ length: 6 }).map((_, k) => {
        const x = colX(k), d = chartCells[k], named = namedCols(k), head = headOf(k);
        const hot = (kind === "place" || kind === "worth") && k === item.lit;
        const counting = show && show.kind === "counting" && k >= 3 && k - 2 <= show.upto;
        const litCol = hot || counting || (kind === "place" && count >= 1 && k >= 3 && k - 2 <= count) || (gone(k));
        const next = k === nextCol;
        return (
          <g key={k}>
            <rect x={x + 4} y={G.headY} width={CW - 8} height={G.headH} rx={14}
              fill={named ? (litCol ? tint(SEL, 0.62) : tint(C.panel, 0.3)) : next ? tint(SEL, 0.82) : tint(C.rule, 0.5)}
              stroke={litCol || next ? SEL : C.rule} strokeWidth={litCol || next ? 3 : 1.5} strokeDasharray={named ? undefined : "8 8"} />
            {named && head !== "" && (
              <text x={colC(k)} y={G.headY + 38} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink} {...fit(tx(head), CW - 20)}>{tx(head)}</text>
            )}
            <rect x={x + 4} y={G.cellY} width={CW - 8} height={G.cellH} rx={14} fill="#FFFFFF" fillOpacity={0.94}
              stroke={litCol ? SEL : C.rule} strokeWidth={litCol ? 3 : 1.5} />
            {d !== null && d !== undefined && !gone(k) && (
              <text x={colC(k)} y={G.cellY + 96} textAnchor="middle" fontSize={T.display} fontWeight={700} fill={digitInk(k, d)}>{d}</text>
            )}
            {/* a column made past the dot wears how far along from the dot it stands */}
            {kind === "grow" && k >= 3 && named && (
              <g>
                <circle cx={x + 30} cy={G.cellY + 30} r={21} fill={tint(PIECE[k], 0.62)} stroke={PIECE[k]} strokeWidth={2} />
                <text x={x + 30} y={G.cellY + 40} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={inkOf(PIECE[k])}>{k - 2}</text>
              </g>
            )}
          </g>
        );
      })}
      {/* the dot keeps a column of its own: the one column that holds no digit, and where every count starts */}
      <rect x={DOT_X + 3} y={G.headY} width={DW - 6} height={G.headH} rx={14} fill={tint(C.panel, 0.3)} stroke={C.rule} strokeWidth={1.5} />
      <rect x={DOT_X + 3} y={G.cellY} width={DW - 6} height={G.cellH} rx={14} fill="#FFFFFF" fillOpacity={0.94}
        stroke={kind === "place" ? SEL : C.rule} strokeWidth={kind === "place" ? 3 : 1.5} />
      <circle cx={DOT_C} cy={G.cellY + 84} r={14} fill={DOTC} />
    </g>
  );

  /* ── the long whole number, read the other way along ── */
  const bayDigits = kind === "bay" ? digitsOf(num) : "";
  const bayN = bayDigits.length;
  const bayLeft = (W.w - bayN * CW) / 2;
  const bayX = (i: number) => bayLeft + i * CW;
  const bayHead = (i: number) => BAY_PLACES[bayN - 1 - i];
  const bay = kind !== "bay" ? null : (
    <g>
      {bayDigits.split("").map((d: string, i: number) => {
        const inCut = cut >= 0 && i <= cut, head = bayHead(i), two = lang === "en" && head.indexOf(" ") > 0;   /* one line fits in hi/gu */
        return (
          <g key={i}>
            <rect x={bayX(i) + 4} y={G.headY} width={CW - 8} height={G.headH} rx={14}
              fill={inCut ? tint(SEL, 0.62) : tint(C.panel, 0.3)} stroke={inCut ? SEL : C.rule} strokeWidth={inCut ? 3 : 1.5} />
            {two ? (
              <g>
                <text x={bayX(i) + CW / 2} y={G.headY + 26} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>ten</text>
                <text x={bayX(i) + CW / 2} y={G.headY + 50} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>thousands</text>
              </g>
            ) : (
              <text x={bayX(i) + CW / 2} y={G.headY + 38} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink} {...fit(tx(head), CW - 20)}>{tx(head)}</text>
            )}
            <rect x={bayX(i) + 4} y={G.cellY} width={CW - 8} height={G.cellH} rx={14} fill="#FFFFFF" fillOpacity={0.94}
              stroke={inCut ? SEL : C.rule} strokeWidth={inCut ? 3 : 1.5} />
            <text x={bayX(i) + CW / 2} y={G.cellY + 96} textAnchor="middle" fontSize={T.display} fontWeight={700} fill={d === "0" ? GREY : inkOf(WHOLE)}>{d}</text>
            {liveAsk && <Hit id={"bay-" + i} label={"Cut at the " + head} x={bayX(i)} y={G.cellY} w={CW} h={G.cellH} onPress={() => setCutAt(i)} />}
          </g>
        );
      })}
      {cut >= 0 && (
        <g>
          <rect x={bayX(cut) + CW - 3} y={G.headY - 6} width={6} height={G.bottom - G.headY + 12} rx={3} fill={SEL} />
          <text x={bayLeft} y={G.bottom + 40} fontSize={T.micro} fontWeight={600} fill={quiet}>{tx(bayHead(cut))}</text>
        </g>
      )}
    </g>
  );

  /* ── the two answer slots: a name goes in one, an amount in the other, and never the other way ── */
  const twoSlots = phase.n !== 3 || free ? null : (
    <g>
      {/* the slot headed place takes a name, and only a name */}
      <text x={SLOT2.place} y={SLOT2.y - 16} fontSize={T.micro} fontWeight={700} fill={quiet}>{tx("place")}</text>
      <text x={SLOT2.place + 88} y={SLOT2.y - 16} fontSize={T.micro} fontWeight={500} fill={quiet}>{tx("a name")}</text>
      <rect x={SLOT2.place} y={SLOT2.y} width={SLOT2.w} height={SLOT2.h} rx={RAD.panel} fill="#FFFFFF"
        stroke={kind === "place" ? C.accent : C.rule} strokeWidth={kind === "place" ? 4 : 1.5} filter="url(#fShadowSoft)" />
      {kind === "place" && typed !== "" && (
        <text x={SLOT2.place + SLOT2.w / 2} y={SLOT2.y + 64} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={C.ink} {...fit(tx(String(typed)), SLOT2.w - 40)}>{tx(String(typed))}</text>
      )}
      {kind === "worth" && (
        <text x={SLOT2.place + SLOT2.w / 2} y={SLOT2.y + 64} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={C.ink} {...fit(tx(PLACES[item.lit]), SLOT2.w - 40)}>{tx(PLACES[item.lit])}</text>
      )}
      {/* the slot headed worth takes an amount, stacked, and will not take a name */}
      <text x={SLOT2.worth} y={SLOT2.y - 16} fontSize={T.micro} fontWeight={700} fill={quiet}>{tx("worth")}</text>
      <text x={SLOT2.worth + 96} y={SLOT2.y - 16} fontSize={T.micro} fontWeight={500} fill={quiet}>{tx("an amount")}</text>
      <rect x={SLOT2.worth} y={SLOT2.y} width={SLOT2.w} height={SLOT2.h} rx={RAD.panel} fill="#FFFFFF"
        stroke={kind === "worth" ? C.accent : C.rule} strokeWidth={kind === "worth" ? 4 : 1.5} filter="url(#fShadowSoft)" />
      {/* an empty worth slot wears the bar an amount is written over and under, so the two never look alike */}
      {!(kind === "worth" && (worthTyped[0] !== "" || worthTyped[1] !== "")) && !(kind === "place" && show && show.worth) && (
        <g>
          <rect x={SLOT2.worth + SLOT2.w / 2 - 32} y={SLOT2.y + 10} width={64} height={30} rx={8} fill="none"
            stroke={tint(C.ink, 0.55)} strokeWidth={2} strokeDasharray="6 6" />
          <rect x={SLOT2.worth + SLOT2.w / 2 - 42} y={SLOT2.y + SLOT2.h / 2 - 2} width={84} height={4} rx={2} fill={tint(C.ink, 0.45)} />
          <rect x={SLOT2.worth + SLOT2.w / 2 - 32} y={SLOT2.y + SLOT2.h - 40} width={64} height={30} rx={8} fill="none"
            stroke={tint(C.ink, 0.55)} strokeWidth={2} strokeDasharray="6 6" />
        </g>
      )}
      {kind === "worth" && (worthTyped[0] !== "" || worthTyped[1] !== "") && (
        <Frac x={SLOT2.worth + SLOT2.w / 2} y={SLOT2.y + SLOT2.h / 2} a={worthTyped[0] || "?"} b={worthTyped[1] || "?"} color={inkOf(PIECE[item.lit])} size={T.label} />
      )}
      {kind === "place" && show && show.worth && (
        <Frac x={SLOT2.worth + SLOT2.w / 2} y={SLOT2.y + SLOT2.h / 2} a={show.worth[0]} b={show.worth[1]} color={inkOf(PIECE[item.lit])} size={T.label} />
      )}
    </g>
  );

  /* ── the rebuild bar: every worth carried down, with its plus signs drawn between ── */
  const nbar = kind === "rebuild" ? filled.length : 0;
  const barLeft = (W.w - (nbar * BAR.sw + (nbar - 1) * BAR.gap)) / 2;
  const barX = (i: number) => barLeft + i * (BAR.sw + BAR.gap);
  const bar = kind !== "rebuild" ? null : (
    <g>
      {filled.map((k: number, i: number) => {
        const here = down.indexOf(k) >= 0, w = worthOf(k, String(cells[k]));
        return (
          <g key={k}>
            <rect x={barX(i)} y={BAR.y} width={BAR.sw} height={BAR.h} rx={16} fill={here ? tint(PIECE[k], 0.78) : "#FFFFFF"}
              fillOpacity={here ? 1 : 0.7} stroke={here ? PIECE[k] : tint(PIECE[k], 0.45)} strokeWidth={here ? 3 : 2.5} strokeDasharray={here ? undefined : "9 9"} />
            {here && (Array.isArray(w)
              ? <Frac x={barX(i) + BAR.sw / 2} y={BAR.y + BAR.h / 2} a={w[0]} b={w[1]} color={inkOf(PIECE[k])} size={T.label} />
              : <text x={barX(i) + BAR.sw / 2} y={BAR.y + BAR.h / 2 + 16} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={inkOf(PIECE[k])}>{w}</text>)}
            {i > 0 && <text x={barX(i) - BAR.gap / 2} y={BAR.y + BAR.h / 2 + 12} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={quiet}>+</text>}
          </g>
        );
      })}
    </g>
  );

  /* ── the total, stood beside a copy of the number the chart started from ── */
  const showTotal = show && show.total ? String(show.total) : null;
  const numCopy = kind === "rebuild" ? String(item.num) : "";
  const totalRow = kind !== "rebuild" || !showTotal ? null : (
    <g className="pwc-new">
      <rect x={TOTAL.x} y={TOTAL.y} width={TOTAL.w} height={TOTAL.h} rx={18} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} />
      {readAt >= 0 && (
        <rect x={TOTAL.x + 12} y={TOTAL.y + 34} width={TOTAL.w - 24} height={50} rx={10} fill={SEL} fillOpacity={0.18} />
      )}
      <SideBySide x={TOTAL.x} y={TOTAL.y} w={TOTAL.w} h={TOTAL.h} a={showTotal} b={numCopy} la={tx("added up")} lb={tx("the number")} C={C} ld={lang === "en" ? 0 : 6} />
    </g>
  );

  /* ── the row the miss built: the bare digits added, or the whole number worths added on their own,
        with the small worths walking in one at a time after them ── */
  const lowRow = !(show && show.kind === "bare") ? null : (
    <g className="pwc-new">
      <rect x={30} y={LOW.y} width={1026} height={LOW.h} rx={16} fill={tint(C.panel, 0.4)} stroke={C.rule} strokeWidth={1.5} />
      <text x={44} y={LOW.y + 60} fontSize={T.micro} fontWeight={600} fill={quiet}>{tx(show.label)}</text>
      {(show.chips || []).map((c: string, i: number) => {
        const cx = 370 + i * 100, frac = c.indexOf("/") >= 0 ? c.split("/") : null;
        return (
          <g key={i}>
            {frac
              ? <Frac x={cx} y={LOW.y + 48} a={frac[0]} b={frac[1]} color={quiet} size={T.micro} />
              : <text x={cx} y={LOW.y + 60} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={quiet}>{c}</text>}
            {i > 0 && <text x={cx - 50} y={LOW.y + 58} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={quiet}>+</text>}
          </g>
        );
      })}
      <text x={912} y={LOW.y + 58} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={quiet}>=</text>
      <text x={985} y={LOW.y + 60} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={quiet}>{show.sum}</text>
    </g>
  );

  /* ── the correction's own layer: a second reading of the chart, under the child's ── */
  const cband = phase.n === 3 ? BAND.count3 : BAND.count2;
  const strip = !show ? null : show.kind === "grown" ? (
    <g className="pwc-new">
      <rect x={0} y={BAND.grow.y} width={W.w} height={BAND.grow.h} rx={18} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} />
      <text x={20} y={BAND.grow.y + 32} fontSize={T.micro} fontWeight={600} fill={quiet}>{tx("from the dot")}</text>
      <text x={20} y={BAND.grow.y + 124} fontSize={T.micro} fontWeight={600} fill={quiet}>{tx("ten times smaller")}</text>
      <circle cx={DOT_C} cy={BAND.grow.y + 78} r={13} fill={DOTC} />
      {DECIMALS.map((name: string, i: number) => {
        const k = i + 3;
        if (show.names.length <= i) return <g key={name} />;
        return (
          <g key={name} className="pwc-new">
            <text x={colC(k)} y={BAND.grow.y + 34} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={inkOf(PIECE[k])} {...fit(tx(name), CW - 14)}>{tx(name)}</text>
            <Piece x={colC(k) - 44} y={BAND.grow.y + 48} w={88} k={k} C={C} />
          </g>
        );
      })}
    </g>
  ) : show.kind === "cut" ? (
    <g className="pwc-new">
      <rect x={180} y={BAND.bay.y} width={726} height={BAND.bay.h} rx={18} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} />
      <text x={200} y={BAND.bay.y + 36} fontSize={T.micro} fontWeight={600} fill={quiet}>{tx(BAY_PLACES[item.drop])}</text>
      <text x={350} y={BAND.bay.y + 112} textAnchor="middle" fontSize={T.display} fontWeight={700} fill={inkOf(WHOLE)}>
        {digitsOf(num).slice(0, digitsOf(num).length - item.drop)}
      </text>
      <text x={660} y={BAND.bay.y + 36} fontSize={T.micro} fontWeight={600} fill={quiet}>{tx("left over")}</text>
      <text x={770} y={BAND.bay.y + 112} textAnchor="middle" fontSize={T.display} fontWeight={700} fill={quiet}>
        {indian(Number(digitsOf(num).slice(digitsOf(num).length - item.drop) || "0"))}
      </text>
      <rect x={543} y={BAND.bay.y + 18} width={4} height={BAND.bay.h - 36} rx={2} fill={C.rule} />
    </g>
  ) : show.kind === "counting" || show.kind === "named" ? (
    <g className="pwc-new">
      <rect x={0} y={cband.y} width={W.w} height={cband.h} rx={18} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} />
      <text x={20} y={cband.y + 34} fontSize={T.micro} fontWeight={600} fill={quiet}>{tx("from the dot")}</text>
      <circle cx={DOT_C} cy={cband.y + 58} r={13} fill={DOTC} />
      {[3, 4, 5].map((k) => {
        const upto = show.kind === "counting" ? show.upto : item.lit - 2;
        const on = k - 2 <= upto;
        return (
          <g key={k}>
            {on && <circle cx={colC(k)} cy={cband.y + 58} r={28} fill={tint(SEL, 0.6)} stroke={SEL} strokeWidth={2.5} />}
            {on && <text x={colC(k)} y={cband.y + 68} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={C.ink}>{k - 2}</text>}
          </g>
        );
      })}
      {show.kind === "named" && (
        <text x={colC(show.at)} y={cband.y + 112} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={inkOf(PIECE[show.at])} {...fit(tx(show.name), CW + 40)}>{tx(show.name)}</text>
      )}
    </g>
  ) : show.kind === "twoCounts" ? (
    /* both runs left drawn and numbered over the columns: one begun at the left hand end of the number,
       which starts on a digit standing before the dot, and one begun at the dot */
    <g className="pwc-new">
      <rect x={0} y={cband.y} width={W.w} height={cband.h} rx={18} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} />
      <text x={20} y={cband.y + 36} fontSize={T.micro} fontWeight={600} fill={quiet}>{tx("from the left end")}</text>
      <text x={20} y={cband.y + 142} fontSize={T.micro} fontWeight={600} fill={quiet}>{tx("from the dot")}</text>
      <circle cx={DOT_C} cy={cband.y + 170} r={13} fill={DOTC} />
      {filled.slice(0, 3).map((k: number, i: number) => (i < show.left ? (
        <g key={"l" + k}>
          <circle cx={colC(k)} cy={cband.y + 64} r={25} fill={tint(k < 3 ? WHOLE : SEL, 0.62)} stroke={k < 3 ? WHOLE : SEL} strokeWidth={2.5} />
          <text x={colC(k)} y={cband.y + 74} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={(k < 3 ? inkOf(WHOLE) : C.ink)}>{i + 1}</text>
        </g>
      ) : null))}
      {[3, 4, 5].map((k) => (k - 2 <= show.right ? (
        <g key={"r" + k}>
          <circle cx={colC(k)} cy={cband.y + 170} r={25} fill={tint(SEL, 0.62)} stroke={SEL} strokeWidth={2.5} />
          <text x={colC(k)} y={cband.y + 180} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={C.ink}>{k - 2}</text>
        </g>
      ) : null))}
      {show.name && (
        <text x={colC(item.lit)} y={cband.y + 220} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={inkOf(PIECE[item.lit])} {...fit(tx(show.name), CW + 40)}>{tx(show.name)}</text>
      )}
    </g>
  ) : show.kind === "swap" ? (
    /* the two digits swapped over, with both readings left standing: the places never moved, so the
       size of a digit decided nothing */
    (() => {
      const y0 = cband.y + Math.max(0, (cband.h - 126) / 2);
      const a = Math.min(show.at, show.other), b = Math.max(show.at, show.other);
      const pair = (cx: number, d: any, k: number) => (
        <g>
          <text x={cx} y={y0 + 78} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={inkOf(FRACT)}>{d}</text>
          <text x={cx} y={y0 + 112} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={inkOf(PIECE[k])} {...fit(tx(PLACES[k]), 160)}>{tx(PLACES[k])}</text>
        </g>
      );
      return (
        <g className="pwc-new">
          <rect x={0} y={cband.y} width={W.w} height={cband.h} rx={18} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} />
          <text x={40} y={y0 + 32} fontSize={T.micro} fontWeight={600} fill={quiet}>{tx("as they stand")}</text>
          {pair(250, cells[a], a)}
          {pair(420, cells[b], b)}
          {show.swapped && (
            <g className="pwc-new">
              <rect x={540} y={y0 + 24} width={3} height={94} rx={1.5} fill={C.rule} />
              <text x={600} y={y0 + 32} fontSize={T.micro} fontWeight={600} fill={quiet}>{tx("swapped over")}</text>
              {pair(700, cells[b], a)}
              {pair(870, cells[a], b)}
            </g>
          )}
        </g>
      );
    })()
  ) : show.kind === "yourRow" ? (
    /* the child's worth carried down with the others and the row added, the total stood beside the
       number the chart started from; the child's own chip is in full ink, the rest quiet */
    (() => {
      const B = BAND.count3, cy = B.y + 76, cx = (i: number) => 70 + i * 92;
      const eq = cx(show.chips.length - 1) + 58, sx = eq + 30;
      return (
        <g className="pwc-new">
          <rect x={0} y={B.y} width={W.w} height={B.h} rx={18} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} />
          <text x={20} y={B.y + 34} fontSize={T.micro} fontWeight={600} fill={quiet}>{tx("with your worth")}</text>
          {show.chips.map((c: string, i: number) => {
            const f = c.indexOf("/") >= 0 ? c.split("/") : null, ink = i === show.mine ? C.ink : quiet;
            return (
              <g key={i}>
                {f
                  ? <Frac x={cx(i)} y={cy} a={f[0]} b={f[1]} color={ink} size={T.micro} />
                  : <text x={cx(i)} y={cy + 12} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={ink}>{c}</text>}
                {i > 0 && <text x={cx(i) - 46} y={cy + 10} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={quiet}>+</text>}
              </g>
            );
          })}
          <text x={eq} y={cy + 10} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={quiet}>=</text>
          <SideBySide x={sx} y={B.y + 8} w={Math.min(560, W.w - 10 - sx)} h={B.h - 16}
            a={show.added} b={String(item.num)} la={tx("added up")} lb={tx("the number")} C={C} ring={show.ring} ld={lang === "en" ? 0 : 6} />
        </g>
      );
    })()
  ) : show.kind === "worthPiece" ? (
    <g className="pwc-new">
      <rect x={0} y={BAND.count3.y} width={W.w} height={BAND.count3.h} rx={18} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} />
      <text x={20} y={BAND.count3.y + 30} fontSize={T.micro} fontWeight={600} fill={quiet}>{tx("one whole one")}</text>
      <Piece x={210} y={BAND.count3.y + 16} w={94} k={show.at} C={C} />
      <text x={392} y={BAND.count3.y + 52} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={inkOf(PIECE[show.at])}>1</text>
      <text x={392} y={BAND.count3.y + 94} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={quiet} {...fit(tx(PLACES[show.at]), 180)}>{tx(PLACES[show.at])}</text>
      {show.worth && (
        <g className="pwc-new">
          <text x={560} y={BAND.count3.y + 66} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={quiet}>{cells[show.at]}</text>
          <text x={652} y={BAND.count3.y + 66} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={quiet}>{tx("of them")}</text>
          <Frac x={800} y={BAND.count3.y + 56} a={show.worth[0]} b={show.worth[1]} color={inkOf(PIECE[show.at])} size={T.speech} />
        </g>
      )}
    </g>
  ) : null;

  /* ── the cards: place names to put on the ground, digits to send down, digits to build with ── */
  const trayCards = kind === "grow" ? (item.cards || []).filter((c: string) => placed.indexOf(c) < 0) : [];
  const trayLeft = (W.w - (trayCards.length * (CW + 20) - 20)) / 2;
  const tray = kind !== "grow" || trayCards.length === 0 ? null : (
    <g>
      {trayCards.map((name: string, i: number) => {
        const x = trayLeft + i * (CW + 20), pay = { src: "name", name };
        const hidden = drag.drag && drag.drag.moved && drag.drag.payload.name === name;
        if (hidden) return <g key={name} />;
        return (
          <g key={name} className={liveAsk ? "pwc-grab c4-piece" : ""}
            {...(liveAsk ? { ...control("card-" + name, "Put " + name + " in the next column"), ...drag.bind(pay), ...drag.keys(pay) } : {})}>
            <rect x={x} y={FOOT.y} width={CW} height={FOOT.h} rx={16} fill="url(#gCard)" stroke={C.rule} strokeWidth={2.5} filter="url(#fShadowSoft)" />
            <text x={x + CW / 2} y={FOOT.y + 56} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={C.ink} {...fit(tx(name), CW - 20)}>{tx(name)}</text>
          </g>
        );
      })}
    </g>
  );

  /* a placed name can be taken back off the last column made */
  const growHits = kind !== "grow" || !liveAsk ? null : (
    <g>
      {placed.map((name: string, i: number) => (
        <Hit key={name} id={"undo-" + i} label={"Take " + name + " back"} x={colX(i + 3)} y={G.headY} w={CW} h={G.headH + 20} onPress={() => takeName(i)} />
      ))}
    </g>
  );

  /* the dot column is where every count of places begins */
  const countHit = kind !== "place" || !liveAsk ? null : (
    <Hit id="count-from-dot" label="Count from the point" x={DOT_X} y={G.cellY} w={DW} h={G.cellH} onPress={stepCount} />
  );
  /* the count track: it starts at the dot, never at either end of the number, and runs rightwards */
  /* on phase 3 the track rides higher and smaller, clear of the two slots' headings under it */
  const trackY = phase.n === 3 ? 222 : G.countY + 26, trackR = phase.n === 3 ? 21 : 26;
  const countChips = kind !== "place" ? null : (
    <g>
      <rect x={DOT_C} y={trackY - 2} width={colC(5) - DOT_C} height={5} rx={2.5} fill={tint(C.rule, 0.3)} />
      <circle cx={DOT_C} cy={trackY} r={13} fill={DOTC} />
      {[3, 4, 5].map((k) => {
        const on = count >= k - 2;
        return (
          <g key={k}>
            <circle cx={colC(k)} cy={trackY} r={trackR} fill={on ? tint(SEL, 0.6) : "#FFFFFF"} stroke={on ? SEL : C.rule} strokeWidth={on ? 3 : 2} />
            {on && <text x={colC(k)} y={trackY + 10} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={C.ink}>{k - 2}</text>}
          </g>
        );
      })}
    </g>
  );

  /* every digit of the chart can be sent down into the bar as the worth of its own column */
  const digitPieces = kind !== "rebuild" || !liveAsk ? null : (
    <g>
      {filled.filter((k: number) => down.indexOf(k) < 0).map((k: number) => {
        const pay = { src: "digit", k };
        return (
          <g key={k} className="pwc-grab c4-piece" {...control("digit-" + k, "Send the " + PLACES[k] + " worth down")} {...drag.bind(pay)} {...drag.keys(pay)}>
            <rect x={colX(k)} y={G.cellY} width={CW} height={G.cellH} rx={14} fill="transparent" />
          </g>
        );
      })}
    </g>
  );
  const flyer = !lift ? null : (
    <g className="pwc-move" pointerEvents="none"
      style={{ transform: `translate(${barX(lift.slot) + BAR.sw / 2 - colC(lift.k)}px, ${BAR.y + BAR.h / 2 + 16 - (G.cellY + 96)}px)` } as any}>
      <text x={colC(lift.k)} y={G.cellY + 96} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={inkOf(PIECE[lift.k])}>{cells[lift.k]}</text>
    </g>
  );

  /* ── free play: build any number, take a digit back out, and turn the worths on ── */
  const freeTray = !free ? null : (
    <g>
      {Array.from({ length: 10 }).map((_, d) => {
        const x = 20 + d * 105, pay = { src: "free", d: String(d) };
        return (
          <g key={d} className="pwc-grab c4-piece" {...control("free-" + d, "Digit " + d)} {...drag.bind(pay)} {...drag.keys(pay)}>
            <rect x={x} y={FOOT.y} width={96} height={80} rx={14} fill="url(#gCard)" stroke={C.rule} strokeWidth={2} />
            <text x={x + 48} y={FOOT.y + 56} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={C.ink}>{d}</text>
          </g>
        );
      })}
      {Array.from({ length: 6 }).map((_, k) => (
        <Hit key={k} id={"free-cell-" + k} label={"Empty the " + PLACES[k]} x={colX(k)} y={G.cellY} w={CW} h={G.cellH} onPress={() => clearFree(k)} />
      ))}
      <Key id="switch-worths" label={tx(worthsOn ? "Worths off" : "Worths on")} x={20} y={214} w={210} h={76} C={C} primary={worthsOn} onClick={() => setWorthsOn((b) => !b)}>
        <text y={12} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={worthsOn ? "#FFFFFF" : C.ink}>{tx("Worths")}</text>
      </Key>
      {worthsOn && freeCells.map((d: any, k: number) => {
        if (d === null) return null;
        const w = worthOf(k, d);
        return Array.isArray(w)
          ? <Frac key={k} x={colC(k)} y={312} a={w[0]} b={w[1]} color={inkOf(PIECE[k])} size={T.micro} />
          : <text key={k} x={colC(k)} y={324} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={inkOf(PIECE[k])}>{w}</text>;
      })}
    </g>
  );

  /* one invite, on the one thing to touch */
  const invite =
    free ? (touched ? null : { x: 68, y: FOOT.y + 40, r: 56 })
      : !liveAsk || touched ? null
        : kind === "grow" && trayCards.length ? { x: trayLeft + CW / 2, y: FOOT.y + 47, r: 50 }
          : kind === "bay" ? { x: bayX(bayN - 1) + CW / 2, y: G.cellY + G.cellH / 2, r: 62 }
            : kind === "place" ? { x: DOT_C, y: G.cellY + G.cellH / 2, r: 48 }
              : kind === "rebuild" ? { x: colC(filled[0]), y: G.cellY + G.cellH / 2, r: 62 }
                : null;

  const runSize = T.speech;

  return (
    <g>
      <style>{PWC_CSS}</style>

      {/* the running count, in the runs zone (64,108): what has settled against what is there */}
      <g data-zone="runs">
        <rect x={0} y={-94} width={330} height={76} rx={RAD.panel} fill="url(#gPanel)" stroke={C.rule} strokeWidth={2} />
        <text x={18} y={-56 + runSize * 0.36} fontSize={runSize} fontWeight={700} fill={C.ink}>{runs.k} / {runs.n}</text>
        <text x={316} y={-56 + T.micro * 0.36} textAnchor="end" fontSize={T.micro} fontWeight={500} fill={C.ink}>{tx(runs.label)}</text>
      </g>

      {chart}
      {bay}
      {countChips}
      {twoSlots}
      {bar}
      {/* the correction's layers never take the child's taps (BUILD_CARD §6) */}
      <g pointerEvents="none">
        {totalRow}
        {lowRow}
        {strip}
      </g>
      {tray}
      {growHits}
      {countHit}
      {digitPieces}
      {flyer}
      {freeTray}

      {/* the card under the finger */}
      {drag.drag && drag.drag.moved && drag.drag.payload.src === "name" && (
        <g pointerEvents="none">
          <rect x={drag.drag.x - CW / 2} y={drag.drag.y - 40} width={CW} height={80} rx={16} fill="url(#gCard)" stroke={SEL} strokeWidth={3} filter="url(#fLift)" />
          <text x={drag.drag.x} y={drag.drag.y + 10} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={C.ink} {...fit(tx(drag.drag.payload.name), CW - 20)}>{tx(drag.drag.payload.name)}</text>
        </g>
      )}
      {drag.drag && drag.drag.moved && drag.drag.payload.src === "free" && (
        <g pointerEvents="none">
          <rect x={drag.drag.x - 48} y={drag.drag.y - 40} width={96} height={80} rx={14} fill="url(#gCard)" stroke={SEL} strokeWidth={3} filter="url(#fLift)" />
          <text x={drag.drag.x} y={drag.drag.y + 14} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={C.ink}>{drag.drag.payload.d}</text>
        </g>
      )}

      {invite && <Invite x={invite.x} y={invite.y} r={invite.r} C={C} />}
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase:
   a grown chart, a cut number, a place name, a worth stacked, or a rebuilt total */
function Thumb({ result, C, w, h, lang = "en", tx = (v: any) => v }: any) {
  const L = (result && result.last) || {};
  const v = L.value;
  if (v === null || v === undefined || v === "") return null;
  const s = String(v);
  const split = s.indexOf("|") >= 0 ? s.split("|") : null;
  const isFrac = !!split && split.length === 2 && /^\d+$/.test(split[0]) && /^\d+$/.test(split[1]);
  const body = isFrac ? (
    <Frac x={w / 2} y={h / 2 - 2} a={(split as any)[0]} b={(split as any)[1]} color={inkOf(FRACT)} size={T.micro} />
  ) : split ? (
    /* the chart carrying on past the dot, each new column smaller than the one before */
    <g>
      <circle cx={w / 2 - 74} cy={h / 2} r={9} fill={DOTC} />
      {[3, 4, 5].map((k, i) => (
        <rect key={k} x={w / 2 - 52 + i * 46} y={h / 2 - 17 + i * 5} width={38 - i * 6} height={34 - i * 10} rx={5} fill={PIECE[k]} />
      ))}
    </g>
  ) : /^\d+(\.\d+)?$/.test(s) ? (
    /* a number in the chart's own colours: the whole part deep blue, the point vermilion, the
       decimal part green, so a rebuilt total still reads which side of the dot each digit stands */
    <text x={w / 2} y={h / 2 + 14} textAnchor="middle" fontSize={T.speech} fontWeight={700}>
      <tspan fill={inkOf(WHOLE)}>{s.split(".")[0]}</tspan>
      {s.indexOf(".") >= 0 && <tspan fill={shade(DOTC, 0.2)}>.</tspan>}
      {s.indexOf(".") >= 0 && <tspan fill={inkOf(FRACT)}>{s.split(".")[1]}</tspan>}
    </text>
  ) : (
    /* a place name, in the ink of the column it names */
    <text x={w / 2} y={h / 2 + 12} textAnchor="middle" fontSize={T.label} fontWeight={700}
      fill={inkOf(PIECE[Math.max(2, PLACES.indexOf(s))])} {...fit(tx(s), w - 24)}>{tx(s)}</text>
  );
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      {body}
    </g>
  );
}

function PlaceAndWorthChart(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, pointKey: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, format, fitHost: () => null }} />
  );
}

export default PlaceAndWorthChart;
