/* ═══ M2.S4.T8.C28.2D1 · roman_workshop · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists: header + its three controls, canvas, slot + pad, bubble + mascot,
   phase dots (user / AI mode), window.toolApi, sounds, the synced voice, scoring, the events,
   idle and restart. NO imports in this file; only the five host hooks. Follow docs/LAYOUT.md;
   the reference tool is work/indiannica_eng_maths4_ch1/M1.S1.T2.C4.2D1/tool.tsx.
   Edit, never rewrite. Built by `node cli.mjs scaffold`; concepts are verbatim (check compares them). */

const TOOL_ID = "roman_workshop";
const MEDIA_ID = "M2.S4.T8.C28.2D1";
const TOOL_NAME = "Roman Numeral Workshop";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
const VOICE = {"rate":0.92,"pitch":1.06};

/* spoken before phase 1's teach lines only (the plan's opening voice line) */
const OPENING = ["Seven letters in the tray. Lift one and read what it is worth."];
/* the whole-tool line: spoken on the summary page */
const FINISH_LINE = "You built numerals, and you found what the rules will not let you build.";
/* said when the child opens Free play from the summary page (the plan's free-play voice line) */
const FREE_LINE = "Free play. Any tiles, either way round, and every refusal explained.";

/* Hindi and Gujarati, keyed by the English line exactly (runtime r13+: `lineFor(line, lang, TR)`); the
   English stays what the checks read. रोमन संख्याएँ / રોમન સંખ્યાઓ; the rail is a पट्टी / પટ્ટી. The
   rail's rule lines (ruleOf) are keyed by their concrete strings; two of them are worded exactly as a
   sentence of a demo line, so they share its baked clip. Digits and Roman letters stay as they are.
   A first draft; wants a native speaker's read. */
const TR: any = {
  hi: {
    "Roman Numeral Workshop": "रोमन संख्याओं की कार्यशाला",
    "Seven letters in the tray. Lift one and read what it is worth.": "ट्रे में सात अक्षर हैं। एक उठाओ और पढ़ो कि उसका मान कितना है।",
    "You built numerals, and you found what the rules will not let you build.": "तुमने रोमन संख्याएँ बनाईं, और पता लगाया कि नियम क्या नहीं बनाने देते।",
    "Free play. Any tiles, either way round, and every refusal explained.": "मुक्त खेल। कोई भी टाइल, किसी भी क्रम में, और हर इनकार का कारण।",
    "Seven letters do all the work": "सात अक्षर सारा काम करते हैं",
    "There are no other letters. Each one has a value of its own.": "और कोई अक्षर नहीं हैं। हर एक का अपना मान है।",
    "Which letter is nearest in value to the one you want?": "कौन सा अक्षर मान में तुम्हारी चाही संख्या के सबसे पास है?",
    "Run your finger down the card, one row at a time.": "कार्ड पर ऊपर से नीचे उँगली चलाओ, एक-एक पंक्ति।",
    "Seven letters carry fixed values. Every numeral is built from those seven and no others.": "सात अक्षरों के मान तय हैं। हर रोमन संख्या इन्हीं सात से बनती है, किसी और से नहीं।",
    "You learned: seven letters with fixed values build every numeral.": "तुमने सीखा: तय मान वाले सात अक्षर हर रोमन संख्या बनाते हैं।",
    "What is V worth?": "V का मान क्या है?",
    "Lift the V and read it. What is V worth?": "V को उठाओ और पढ़ो। V का मान क्या है?",
    "Find V on the card. What is written beside it?": "कार्ड पर V ढूँढो। उसके पास क्या लिखा है?",
    "Which letters are 50 and 500?": "50 और 500 कौन से अक्षर हैं?",
    "Which letters stand for fifty and for five hundred? Put each tile in its place.": "कौन से अक्षर पचास और पाँच सौ के लिए हैं? हर टाइल को उसकी जगह रखो।",
    "Read the card from the top. Which rows say fifty and five hundred?": "कार्ड को ऊपर से पढ़ो। कौन सी पंक्तियाँ पचास और पाँच सौ बताती हैं?",
    "Values of C and M?": "C और M के मान?",
    "What are the values of C and of M?": "C और M के मान क्या हैं?",
    "Find C and M on the card.": "कार्ड पर C और M ढूँढो।",
    "100 and 500": "100 और 500", "100 and 1,000": "100 और 1,000", "10 and 100": "10 और 100", "50 and 500": "50 और 500",
    "A smaller letter on the right is added": "दाईं ओर का छोटा अक्षर जुड़ता है",
    "Put the smaller one on the right. Watch the total go up.": "छोटे को दाईं ओर रखो। कुल को बढ़ते देखो।",
    "Does that side add or take away?": "वह तरफ़ जोड़ती है या घटाती है?",
    "Read the rail from the left, one tile at a time.": "पट्टी को बाईं ओर से पढ़ो, एक-एक टाइल।",
    "A smaller letter to the right of a bigger one is added. A numeral is written from the biggest letter down.": "बड़े अक्षर के दाईं ओर का छोटा अक्षर जुड़ता है। रोमन संख्या सबसे बड़े अक्षर से शुरू करके लिखी जाती है।",
    "You learned: a smaller letter on the right of a bigger one is added.": "तुमने सीखा: बड़े के दाईं ओर का छोटा अक्षर जुड़ता है।",
    "Write 36 in letters": "36 को अक्षरों में लिखो",
    "Write 36 as a Roman numeral. Build it on the rail, then press enter.": "36 को रोमन संख्या में लिखो। इसे पट्टी पर बनाओ, फिर एंटर दबाओ।",
    "Build the tens first, then the ones.": "पहले दहाई बनाओ, फिर इकाई।",
    "What number is XVI?": "XVI कौन सी संख्या है?",
    "Which side of the bigger letter is the smaller one standing on?": "छोटा अक्षर बड़े अक्षर की किस तरफ़ खड़ा है?",
    "What number is LVII?": "LVII कौन सी संख्या है?",
    "Is any small letter standing on the left of a bigger one?": "क्या कोई छोटा अक्षर किसी बड़े के बाईं ओर खड़ा है?",
    "A letter may be repeated three times at most": "अक्षर अधिकतम तीन बार दोहराया जा सकता है",
    "Try one more of the same. What does the rule card say?": "वैसा ही एक और रखकर देखो। नियम कार्ड क्या कहता है?",
    "The rail would not take it. A letter repeats three times at most.": "पट्टी ने इसे नहीं लिया। कोई अक्षर ज़्यादा से ज़्यादा तीन बार दोहराया जाता है।",
    "So forty is never written as four Xs.": "इसलिए चालीस को कभी चार X से नहीं लिखते।",
    "What does the rule card give as the limit?": "नियम कार्ड में सीमा क्या दी है?",
    "Take the rail one letter at a time, from the left.": "पट्टी को बाईं ओर से एक-एक अक्षर करके देखो।",
    "Repeating a letter adds it again. Three is the limit. Three of the seven may not be repeated at all.": "अक्षर दोहराने से वह फिर जुड़ता है। तीन बार की सीमा है। सात में से तीन अक्षर बिल्कुल नहीं दोहराए जाते।",
    "You learned: a letter repeats three times at most; V, L and D never do.": "तुमने सीखा: अक्षर ज़्यादा से ज़्यादा तीन बार दोहराते हैं; V, L और D कभी नहीं।",
    "What number is XXXIII?": "XXXIII कौन सी संख्या है?",
    "How many of each letter are on the rail?": "पट्टी पर हर अक्षर कितनी बार है?",
    "Which letters never repeat?": "कौन से अक्षर कभी नहीं दोहराते?",
    "Which three letters may never be repeated? Drop two of a letter on the rail to test it.": "कौन से तीन अक्षर कभी नहीं दोहराए जा सकते? जाँचने के लिए एक अक्षर के दो पट्टी पर रखो।",
    "Try two of each letter on the rail. Which ones does it refuse?": "हर अक्षर के दो पट्टी पर रखकर देखो। वह किन्हें मना करती है?",
    "I, X and C": "I, X और C", "V, L and D": "V, L और D", "V, X and L": "V, X और L", "C, D and M": "C, D और M",
    "Write the balance in letters": "बाकी रकम अक्षरों में लिखो",
    "A money box holds ₹1,125 and ₹250 is spent. Write the balance as a Roman numeral.": "एक गुल्लक में 1,125 रुपये हैं और 250 रुपये खर्च हुए। बाकी रकम को रोमन संख्या में लिखो।",
    "Work out the balance first. Then build it place by place, three of a letter at most.": "पहले बाकी रकम निकालो। फिर स्थान-स्थान बनाओ, एक अक्षर ज़्यादा से ज़्यादा तीन बार।",
    "A smaller letter on the left is subtracted": "बाईं ओर का छोटा अक्षर घटता है",
    "Now put the smaller one on the left. Which pairs are allowed?": "अब छोटे को बाईं ओर रखो। कौन से जोड़े मान्य हैं?",
    "The rail would not take it. The letter I stands only before V or X.": "पट्टी ने इसे नहीं लिया। I सिर्फ़ V या X से ही घटता है।",
    "Only six pairs are allowed. Tap the card to turn it over.": "सिर्फ़ छह जोड़े मान्य हैं। कार्ड पलटने के लिए उस पर टैप करो।",
    "Is that pair one of the six on the card?": "क्या वह जोड़ा कार्ड के छह जोड़ों में से है?",
    "Find the letter that takes away. What does it take from?": "घटाने वाला अक्षर ढूँढो। वह किसमें से घटता है?",
    "A smaller letter on the left is subtracted. Only six pairs are allowed: I before V or X, X before L or C, C before D or M.": "बाईं ओर का छोटा अक्षर घटता है। सिर्फ़ छह जोड़े मान्य हैं: V या X से पहले I, L या C से पहले X, D या M से पहले C।",
    "You learned: a smaller letter on the left is taken away, in six pairs.": "तुमने सीखा: बाईं ओर का छोटा अक्षर घटता है, छह जोड़ों में।",
    "What number is XCVIII?": "XCVIII कौन सी संख्या है?",
    "Find the pair on the rail first. What is it worth?": "पहले पट्टी पर जोड़ा ढूँढो। उसका मान कितना है?",
    "What number is XLIV?": "XLIV कौन सी संख्या है?",
    "Find the two pairs on the rail.": "पट्टी पर दोनों जोड़े ढूँढो।",
    "Write 198 in letters": "198 को अक्षरों में लिखो",
    "Write 198 as a Roman numeral. Build it on the rail.": "198 को रोमन संख्या में लिखो। इसे पट्टी पर बनाओ।",
    "Build it place by place. Which pair on the card makes the tens?": "स्थान-स्थान बनाओ। कार्ड का कौन सा जोड़ा दहाई बनाता है?",
    /* the rail's rules (ruleOf), printed on the strip and said */
    "The rail holds nine tiles.": "पट्टी पर नौ टाइलें ही आती हैं।",
    "V is never repeated.": "V कभी नहीं दोहराया जाता।", "L is never repeated.": "L कभी नहीं दोहराया जाता।", "D is never repeated.": "D कभी नहीं दोहराया जाता।",
    "A letter repeats three times at most.": "कोई अक्षर ज़्यादा से ज़्यादा तीन बार दोहराया जाता है।",
    "V is never taken away.": "V कभी नहीं घटता।", "L is never taken away.": "L कभी नहीं घटता।", "D is never taken away.": "D कभी नहीं घटता।",
    "I is taken only from V or X.": "I सिर्फ़ V या X से ही घटता है।", "X is taken only from L or C.": "X सिर्फ़ L या C से ही घटता है।",
    "C is taken only from D or M.": "C सिर्फ़ D या M से ही घटता है।",
    "Write from the biggest letter down.": "सबसे बड़े अक्षर से शुरू करके लिखो।",
    "V, L and D are never repeated.": "V, L और D कभी नहीं दोहराए जाते।",
    /* the working area's own words */
    "Make": "बनाओ", "Clear": "हटाओ", "Clear the rail": "पट्टी खाली करो", "Pairs": "जोड़े", "Letters": "अक्षर",
  },
  gu: {
    "Roman Numeral Workshop": "રોમન સંખ્યાઓની કાર્યશાળા",
    "Seven letters in the tray. Lift one and read what it is worth.": "ટ્રેમાં સાત અક્ષર છે. એક ઉપાડો અને વાંચો કે તેની કિંમત કેટલી છે.",
    "You built numerals, and you found what the rules will not let you build.": "તમે રોમન સંખ્યાઓ બનાવી, અને શોધ્યું કે નિયમો શું બનાવવા નથી દેતા.",
    "Free play. Any tiles, either way round, and every refusal explained.": "મુક્ત રમત. કોઈ પણ ટાઇલ, કોઈ પણ ક્રમમાં, અને દરેક ના પાડવાનું કારણ.",
    "Seven letters do all the work": "સાત અક્ષર બધું કામ કરે છે",
    "There are no other letters. Each one has a value of its own.": "બીજા કોઈ અક્ષર નથી. દરેકની પોતાની કિંમત છે.",
    "Which letter is nearest in value to the one you want?": "કયો અક્ષર કિંમતમાં તમે ઇચ્છો તેની સૌથી નજીક છે?",
    "Run your finger down the card, one row at a time.": "કાર્ડ પર ઉપરથી નીચે આંગળી ફેરવો, એક એક હાર.",
    "Seven letters carry fixed values. Every numeral is built from those seven and no others.": "સાત અક્ષરની કિંમત નક્કી છે. દરેક રોમન સંખ્યા આ સાતથી જ બને છે, બીજા કોઈથી નહીં.",
    "You learned: seven letters with fixed values build every numeral.": "તમે શીખ્યા: નક્કી કિંમતવાળા સાત અક્ષર દરેક રોમન સંખ્યા બનાવે છે.",
    "What is V worth?": "V ની કિંમત શું છે?",
    "Lift the V and read it. What is V worth?": "V ને ઉપાડો અને વાંચો. V ની કિંમત શું છે?",
    "Find V on the card. What is written beside it?": "કાર્ડ પર V શોધો. તેની બાજુમાં શું લખ્યું છે?",
    "Which letters are 50 and 500?": "50 અને 500 કયા અક્ષર છે?",
    "Which letters stand for fifty and for five hundred? Put each tile in its place.": "કયા અક્ષર પચાસ અને પાંચસો માટે છે? દરેક ટાઇલને તેની જગ્યાએ મૂકો.",
    "Read the card from the top. Which rows say fifty and five hundred?": "કાર્ડને ઉપરથી વાંચો. કઈ હાર પચાસ અને પાંચસો બતાવે છે?",
    "Values of C and M?": "C અને M ની કિંમત?",
    "What are the values of C and of M?": "C અને M ની કિંમત શું છે?",
    "Find C and M on the card.": "કાર્ડ પર C અને M શોધો.",
    "100 and 500": "100 અને 500", "100 and 1,000": "100 અને 1,000", "10 and 100": "10 અને 100", "50 and 500": "50 અને 500",
    "A smaller letter on the right is added": "જમણી બાજુનો નાનો અક્ષર ઉમેરાય છે",
    "Put the smaller one on the right. Watch the total go up.": "નાનાને જમણી બાજુ મૂકો. કુલ વધતો જુઓ.",
    "Does that side add or take away?": "તે બાજુ ઉમેરે છે કે બાદ કરે છે?",
    "Read the rail from the left, one tile at a time.": "પટ્ટીને ડાબી બાજુથી વાંચો, એક એક ટાઇલ.",
    "A smaller letter to the right of a bigger one is added. A numeral is written from the biggest letter down.": "મોટા અક્ષરની જમણી બાજુનો નાનો અક્ષર ઉમેરાય છે. રોમન સંખ્યા સૌથી મોટા અક્ષરથી શરૂ કરીને લખાય છે.",
    "You learned: a smaller letter on the right of a bigger one is added.": "તમે શીખ્યા: મોટાની જમણી બાજુનો નાનો અક્ષર ઉમેરાય છે.",
    "Write 36 in letters": "36 ને અક્ષરોમાં લખો",
    "Write 36 as a Roman numeral. Build it on the rail, then press enter.": "36 ને રોમન સંખ્યામાં લખો. તેને પટ્ટી પર બનાવો, પછી એન્ટર દબાવો.",
    "Build the tens first, then the ones.": "પહેલાં દશક બનાવો, પછી એકમ.",
    "What number is XVI?": "XVI કઈ સંખ્યા છે?",
    "Which side of the bigger letter is the smaller one standing on?": "નાનો અક્ષર મોટા અક્ષરની કઈ બાજુ ઊભો છે?",
    "What number is LVII?": "LVII કઈ સંખ્યા છે?",
    "Is any small letter standing on the left of a bigger one?": "શું કોઈ નાનો અક્ષર કોઈ મોટાની ડાબી બાજુ ઊભો છે?",
    "A letter may be repeated three times at most": "કોઈ અક્ષર વધુમાં વધુ ત્રણ વાર આવી શકે",
    "Try one more of the same. What does the rule card say?": "એવો જ એક વધુ મૂકી જુઓ. નિયમ કાર્ડ શું કહે છે?",
    "The rail would not take it. A letter repeats three times at most.": "પટ્ટીએ તે ન લીધો. કોઈ અક્ષર વધુમાં વધુ ત્રણ વાર આવે છે.",
    "So forty is never written as four Xs.": "તેથી ચાલીસ ક્યારેય ચાર X થી લખાતા નથી.",
    "What does the rule card give as the limit?": "નિયમ કાર્ડમાં મર્યાદા શું આપી છે?",
    "Take the rail one letter at a time, from the left.": "પટ્ટીને ડાબી બાજુથી એક એક અક્ષર કરીને જુઓ.",
    "Repeating a letter adds it again. Three is the limit. Three of the seven may not be repeated at all.": "અક્ષર ફરી લખવાથી તે ફરી ઉમેરાય છે. ત્રણ વારની મર્યાદા છે. સાતમાંથી ત્રણ અક્ષર બિલકુલ ફરી લખાતા નથી.",
    "You learned: a letter repeats three times at most; V, L and D never do.": "તમે શીખ્યા: અક્ષર વધુમાં વધુ ત્રણ વાર આવે; V, L અને D ક્યારેય નહીં.",
    "What number is XXXIII?": "XXXIII કઈ સંખ્યા છે?",
    "How many of each letter are on the rail?": "પટ્ટી પર દરેક અક્ષર કેટલી વાર છે?",
    "Which letters never repeat?": "કયા અક્ષર ક્યારેય ફરી આવતા નથી?",
    "Which three letters may never be repeated? Drop two of a letter on the rail to test it.": "કયા ત્રણ અક્ષર ક્યારેય ફરી લખી શકાતા નથી? ચકાસવા એક અક્ષરના બે પટ્ટી પર મૂકો.",
    "Try two of each letter on the rail. Which ones does it refuse?": "દરેક અક્ષરના બે પટ્ટી પર મૂકી જુઓ. તે કયાની ના પાડે છે?",
    "I, X and C": "I, X અને C", "V, L and D": "V, L અને D", "V, X and L": "V, X અને L", "C, D and M": "C, D અને M",
    "Write the balance in letters": "બાકી રકમ અક્ષરોમાં લખો",
    "A money box holds ₹1,125 and ₹250 is spent. Write the balance as a Roman numeral.": "એક ગલ્લામાં 1,125 રૂપિયા છે અને 250 રૂપિયા વપરાયા. બાકી રકમ રોમન સંખ્યામાં લખો.",
    "Work out the balance first. Then build it place by place, three of a letter at most.": "પહેલાં બાકી રકમ શોધો. પછી સ્થાન પ્રમાણે બનાવો, એક અક્ષર વધુમાં વધુ ત્રણ વાર.",
    "A smaller letter on the left is subtracted": "ડાબી બાજુનો નાનો અક્ષર બાદ થાય છે",
    "Now put the smaller one on the left. Which pairs are allowed?": "હવે નાનાને ડાબી બાજુ મૂકો. કઈ જોડી માન્ય છે?",
    "The rail would not take it. The letter I stands only before V or X.": "પટ્ટીએ તે ન લીધો. I ફક્ત V કે X માંથી જ બાદ થાય છે.",
    "Only six pairs are allowed. Tap the card to turn it over.": "ફક્ત છ જોડી માન્ય છે. કાર્ડ ફેરવવા તેના પર ટૅપ કરો.",
    "Is that pair one of the six on the card?": "શું તે જોડી કાર્ડની છ જોડીમાંથી એક છે?",
    "Find the letter that takes away. What does it take from?": "બાદ કરનાર અક્ષર શોધો. તે શેમાંથી બાદ થાય છે?",
    "A smaller letter on the left is subtracted. Only six pairs are allowed: I before V or X, X before L or C, C before D or M.": "ડાબી બાજુનો નાનો અક્ષર બાદ થાય છે. ફક્ત છ જોડી માન્ય છે: V કે X પહેલાં I, L કે C પહેલાં X, D કે M પહેલાં C.",
    "You learned: a smaller letter on the left is taken away, in six pairs.": "તમે શીખ્યા: ડાબી બાજુનો નાનો અક્ષર બાદ થાય, છ જોડીમાં.",
    "What number is XCVIII?": "XCVIII કઈ સંખ્યા છે?",
    "Find the pair on the rail first. What is it worth?": "પહેલાં પટ્ટી પર જોડી શોધો. તેની કિંમત કેટલી છે?",
    "What number is XLIV?": "XLIV કઈ સંખ્યા છે?",
    "Find the two pairs on the rail.": "પટ્ટી પર બંને જોડી શોધો.",
    "Write 198 in letters": "198 ને અક્ષરોમાં લખો",
    "Write 198 as a Roman numeral. Build it on the rail.": "198 ને રોમન સંખ્યામાં લખો. તેને પટ્ટી પર બનાવો.",
    "Build it place by place. Which pair on the card makes the tens?": "સ્થાન પ્રમાણે બનાવો. કાર્ડની કઈ જોડી દશક બનાવે છે?",
    /* the rail's rules (ruleOf), printed on the strip and said */
    "The rail holds nine tiles.": "પટ્ટી પર નવ ટાઇલ જ આવે છે.",
    "V is never repeated.": "V ક્યારેય ફરી આવતો નથી.", "L is never repeated.": "L ક્યારેય ફરી આવતો નથી.", "D is never repeated.": "D ક્યારેય ફરી આવતો નથી.",
    "A letter repeats three times at most.": "કોઈ અક્ષર વધુમાં વધુ ત્રણ વાર આવે છે.",
    "V is never taken away.": "V ક્યારેય બાદ થતો નથી.", "L is never taken away.": "L ક્યારેય બાદ થતો નથી.", "D is never taken away.": "D ક્યારેય બાદ થતો નથી.",
    "I is taken only from V or X.": "I ફક્ત V કે X માંથી જ બાદ થાય છે.", "X is taken only from L or C.": "X ફક્ત L કે C માંથી જ બાદ થાય છે.",
    "C is taken only from D or M.": "C ફક્ત D કે M માંથી જ બાદ થાય છે.",
    "Write from the biggest letter down.": "સૌથી મોટા અક્ષરથી શરૂ કરીને લખો.",
    "V, L and D are never repeated.": "V, L અને D ક્યારેય ફરી આવતા નથી.",
    /* the working area's own words */
    "Make": "બનાવો", "Clear": "સાફ કરો", "Clear the rail": "પટ્ટી ખાલી કરો", "Pairs": "જોડી", "Letters": "અક્ષર",
  },
};

/* One entry per phase = one mount.
   says    the teach run, said before anything is asked (numbers are turned into words for the voice)
   ladder  rungs 2 and 3 of the hint ladder (rung 1 is each item's own miss line); never the answer
   closing one closing line for this phase, said once when it goes idle
   learned the summary page's row for this phase: "You learned: ..." (at most 72 characters)
   traceback what the working area redraws after a miss, in one line (for the sidecar)
   demo?   { ... } when the phase opens on the child's one physical act (see api.demoDone)
   items   the authored fallback: three a phase, the third tests whether the phase landed.
           qid   the plan's question id (<conceptId>:ML<n> or <conceptId>:<q_no>); null for an item you author
           kind  your name for the item type (the Work, judge and oracle switch on it)
           say   the spoken question; ask = the short prompt above the slot (<= 3 lines of ~15 chars)
           answer what the slot or the working area must produce; miss = rung 1, never the answer
           choices? [{ id, label }] for a word answer; pad?: "enter" when it is made on the working area */
const PHASES = [
  {
    n: 1,
    concept: "Seven letters do all the work",
    conceptId: "M2.S4.T8.C28", objectiveIds: ["O13"],
    says: ["There are no other letters. Each one has a value of its own."],
    ladder: ["Which letter is nearest in value to the one you want?", "Run your finger down the card, one row at a time."],
    closing: "Seven letters carry fixed values. Every numeral is built from those seven and no others.",
    learned: "You learned: seven letters with fixed values build every numeral.",
    traceback: "The card redraws row by row and the asked rows light with their values; the asked tile lands on the rail, or the right letters are named under the bays.",
    items: [
      /* authored: the keyboard path needs a typed first item, and the plan's opening act is "lift one and read it" */
      { qid: null, kind: "value", letter: "V", answer: 5, near: 2, winMs: 1600, ask: "What is V worth?",
        say: "Lift the V and read it. What is V worth?", miss: "Find V on the card. What is written beside it?" },
      /* learn ML1: answer in the plan = L is fifty and D is five hundred */
      { qid: "M2.S4.T8.C28:ML1", kind: "match", vals: [50, 500], answer: "L D", near: "V M", pad: "enter", winMs: 1800, ask: "Which letters are 50 and 500?",
        say: "Which letters stand for fifty and for five hundred? Put each tile in its place.", miss: "Read the card from the top. Which rows say fifty and five hundred?" },
      /* practice 1: answer in the plan = C is one hundred and M is one thousand */
      { qid: "M2.S4.T8.C28:1", kind: "choice", letters: ["C", "M"], answer: "100 and 1,000", near: "100 and 500", winMs: 2000, ask: "Values of C and M?",
        choices: [{ id: "100 and 500", label: "100 and 500" }, { id: "100 and 1,000", label: "100 and 1,000" }, { id: "10 and 100", label: "10 and 100" }, { id: "50 and 500", label: "50 and 500" }],
        say: "What are the values of C and of M?", miss: "Find C and M on the card." },
      /* practice 2 (M2.S4.T8.C28:2, "Which three letters may never be repeated?") is asked in phase 3, whose rule it is */
    ],
  },
  {
    n: 2,
    concept: "A smaller letter on the right is added",
    conceptId: "M2.S4.T8.C29", objectiveIds: ["O13"],
    says: ["Put the smaller one on the right. Watch the total go up."],
    opening: { rail: "X", start: 0 },
    ladder: ["Does that side add or take away?", "Read the rail from the left, one tile at a time."],
    closing: "A smaller letter to the right of a bigger one is added. A numeral is written from the biggest letter down.",
    learned: "You learned: a smaller letter on the right of a bigger one is added.",
    traceback: "Each rail tile writes its amount with an adding bar, then the total climbs to the answer; a build splits by place and the right numeral is laid under the rail.",
    /* order: the build first (the phase opens on a bigger tile with clear rail to its right, and the
       child watches the total climb), then the two readings test whether adding on the right landed */
    items: [
      /* practice 4: answer in the plan = XXXVI */
      { qid: "M2.S4.T8.C29:4", kind: "build", target: 36, start: "X", answer: "XXXVI", near: "XXXIV", pad: "enter", winMs: 2600, ask: "Write 36 in letters",
        say: "Write 36 as a Roman numeral. Build it on the rail, then press enter.", miss: "Build the tens first, then the ones." },
      /* learn ML2: answer in the plan = Sixteen */
      { qid: "M2.S4.T8.C29:ML2", kind: "read", numeral: "XVI", answer: 16, near: 6, winMs: 2400, ask: "What number is XVI?",
        say: "What number is XVI?", miss: "Which side of the bigger letter is the smaller one standing on?" },
      /* practice 3: answer in the plan = 57 */
      { qid: "M2.S4.T8.C29:3", kind: "read", numeral: "LVII", answer: 57, near: 47, winMs: 2700, ask: "What number is LVII?",
        say: "What number is LVII?", miss: "Is any small letter standing on the left of a bigger one?" },
    ],
  },
  {
    n: 3,
    concept: "A letter may be repeated three times at most",
    conceptId: "M2.S4.T8.C30", objectiveIds: ["O14"],
    says: ["Try one more of the same. What does the rule card say?"],
    /* the one act before the first question: a fourth X is offered to a rail holding three (the plan's delight) */
    opening: { rail: "XXX", start: 0 },
    demo: { rail: "XXX", start: 0, tile: "X" },
    demoLines: ["The rail would not take it. A letter repeats three times at most.", "So forty is never written as four Xs."],
    ladder: ["What does the rule card give as the limit?", "Take the rail one letter at a time, from the left."],
    closing: "Repeating a letter adds it again. Three is the limit. Three of the seven may not be repeated at all.",
    learned: "You learned: a letter repeats three times at most; V, L and D never do.",
    traceback: "Each rail tile writes its amount, then the total climbs place by place to the answer; the letters never repeated rise in the tray, take their bars on the card and the strip names them; a build splits by place and the right numeral is laid under the rail.",
    /* nothing here takes away (that is phase 4): a reading, the letters that never repeat, then a build
       whose hundreds are three Cs, the limit */
    items: [
      /* learn ML3: answer in the plan = Thirty-three, and a letter may be repeated at most three times (the why is the demo) */
      { qid: "M2.S4.T8.C30:ML3", kind: "read", numeral: "XXXIII", answer: 33, near: 23, winMs: 3100, ask: "What number is XXXIII?",
        say: "What number is XXXIII?", miss: "How many of each letter are on the rail?" },
      /* phase 1's practice 2 (C28:2, "Which three letters may never be repeated?"): it asks this phase's
         rule and needs no taking away. The rail stays open to test two of a letter */
      { qid: "M2.S4.T8.C28:2", kind: "never", set: ["V", "L", "D"], answer: "V, L and D", near: "I, X and C", winMs: 2400, ask: "Which letters never repeat?",
        choices: [{ id: "I, X and C", label: "I, X and C" }, { id: "V, L and D", label: "V, L and D" }, { id: "V, X and L", label: "V, X and L" }, { id: "C, D and M", label: "C, D and M" }],
        say: "Which three letters may never be repeated? Drop two of a letter on the rail to test it.", miss: "Try two of each letter on the rail. Which ones does it refuse?" },
      /* phase 4's practice 8: answer in the plan = 875, written DCCCLXXV (work out the balance, then build it).
         It takes nothing away and its hundreds are three Cs; near = eight Cs for the hundreds, past the limit */
      { qid: "M2.S4.T8.C31:8", kind: "build", target: 875, from: [1125, 250], start: "", answer: "DCCCLXXV", near: "CCCCCCCCLXXV", pad: "enter", winMs: 3200, ask: "Write the balance in letters",
        say: "A money box holds ₹1,125 and ₹250 is spent. Write the balance as a Roman numeral.", miss: "Work out the balance first. Then build it place by place, three of a letter at most." },
    ],
  },
  {
    n: 4,
    concept: "A smaller letter on the left is subtracted",
    conceptId: "M2.S4.T8.C31", objectiveIds: ["O14"],
    says: ["Now put the smaller one on the left. Which pairs are allowed?"],
    /* the one act before the first question: an I is offered to the left of an L (IL, the plan's misconception) */
    opening: { rail: "L", start: 1 },
    demo: { rail: "L", start: 1, tile: "I" },
    demoLines: ["The rail would not take it. The letter I stands only before V or X.", "Only six pairs are allowed. Tap the card to turn it over."],
    ladder: ["Is that pair one of the six on the card?", "Find the letter that takes away. What does it take from?"],
    closing: "A smaller letter on the left is subtracted. Only six pairs are allowed: I before V or X, X before L or C, C before D or M.",
    learned: "You learned: a smaller letter on the left is taken away, in six pairs.",
    traceback: "Each rail tile writes its amount, a taking-away tile with its bar back to front and its pair ringed amber, then the total climbs to the answer; a build lays the right numeral under the rail, its pair ringed amber and the taking-away tile's bar back to front.",
    /* order: a reading with one pair, a reading with two pairs, then a build */
    items: [
      /* learn ML4: answer in the plan = Ninety-eight, and I may be subtracted only from V or X (the why is the demo) */
      { qid: "M2.S4.T8.C31:ML4", kind: "read", numeral: "XCVIII", answer: 98, near: 118, winMs: 3100, ask: "What number is XCVIII?",
        say: "What number is XCVIII?", miss: "Find the pair on the rail first. What is it worth?" },
      /* practice 7: answer in the plan = 44 */
      { qid: "M2.S4.T8.C31:7", kind: "read", numeral: "XLIV", answer: 44, near: 66, winMs: 2600, ask: "What number is XLIV?",
        say: "What number is XLIV?", miss: "Find the two pairs on the rail." },
      /* phase 3's practice 5 (C30:5, CMXXXVIII) is left unused: three questions a phase, and it needs
         taking away, which phase 3 does not teach */
      /* phase 3's practice 6: answer in the plan = CXCVIII. It needs the XC pair */
      { qid: "M2.S4.T8.C30:6", kind: "build", target: 198, start: "", answer: "CXCVIII", near: "CXCIIX", pad: "enter", winMs: 3000, ask: "Write 198 in letters",
        say: "Write 198 as a Roman numeral. Build it on the rail.", miss: "Build it place by place. Which pair on the card makes the tens?" },
    ],
  },
];

/* ── the seven letters and the rail's rules ──────────────────────────────────────────────
   kinds: value (type what one letter is worth) · match (drop the letter for each value into its
          bay, Enter commits) · choice (pick the two values) · read (type what the numeral on the
          rail is worth) · build (make the number on the rail, Enter commits) · never (pick the letters that
          are never repeated; the rail is open to test two of a letter) */

const LETTERS = ["I", "V", "X", "L", "C", "D", "M"];
const VAL: Record<string, number> = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
const PAIRS = ["IV", "IX", "XL", "XC", "CD", "CM"];
const TAKES: Record<string, string[]> = { I: ["V", "X"], X: ["L", "C"], C: ["D", "M"] };
const SLOTS = 9;

/* what a numeral is worth, left to right: a letter before a bigger one takes itself away */
const worthOf = (s: string) => {
  let t = 0;
  for (let i = 0; i < s.length; i++) { const a = VAL[s[i]], b = VAL[s[i + 1]] || 0; t += a < b ? -a : a; }
  return t;
};
const amountsOf = (s: string) => s.split("").map((ch, i) => (VAL[ch] < (VAL[s[i + 1]] || 0) ? -VAL[ch] : VAL[ch]));

/* the rule a string of tiles breaks, or null when it is a numeral (the rail never holds anything else) */
const ruleOf = (s: string): any => {
  if (s.length > SLOTS) return { kind: "full", text: "The rail holds nine tiles." };
  for (const t of ["V", "L", "D"]) if (s.split(t).length > 2) return { kind: "never", t, text: `${t} is never repeated.` };
  const four = /(I{4}|X{4}|C{4}|M{4})/.exec(s);
  if (four) return { kind: "three", t: four[1][0], text: "A letter repeats three times at most." };
  for (let i = 0; i + 1 < s.length; i++) {
    const a = s[i], b = s[i + 1];
    if (VAL[a] >= VAL[b]) continue;
    if ("VLD".includes(a)) return { kind: "vld", t: a, text: `${a} is never taken away.` };
    if (!PAIRS.includes(a + b)) return { kind: "pair", t: a, text: `${a} is taken only from ${TAKES[a][0]} or ${TAKES[a][1]}.` };
  }
  if (s && roman(worthOf(s)) !== s) return { kind: "order", text: "Write from the biggest letter down." };
  return null;
};

/* a numeral split by place (thousands, hundreds, tens, ones): which tiles make which part */
const groupsOf = (s: string) => {
  const m = /^(M{0,3})(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/.exec(s);
  if (!m) return [];
  const out: any[] = [];
  let at = 0;
  [1, 2, 3, 4].forEach((g) => {
    const part = m[g];
    if (part) out.push({ place: 4 - g, from: at, to: at + part.length - 1, worth: worthOf(part) });
    at += part.length;
  });
  return out;
};
const partsOf = (n: number) => [1000, 100, 10, 1].map((p, k) => ({ place: 3 - k, worth: Math.floor((n % (p * 10)) / p) * p })).filter((x) => x.worth > 0);

/* The rows, sizes and targets the working area needs (they go into the sidecar too). */
const MODEL = { letters: LETTERS.map((l) => ({ letter: l, value: VAL[l] })), pairs: PAIRS, railSlots: SLOTS, tilePitch: 92,
  rules: ["V, L and D are never repeated", "a letter repeats three times at most", "V, L and D are never taken away",
    "I from V or X, X from L or C, C from D or M only", "a numeral runs from the biggest letter down"] };

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

const lettersIn = (v: any) => String(v ?? "").toUpperCase().replace(/[^IVXLCDM]/g, "");
/* judge: numbers compare as numbers; numerals and letter matches compare letter for letter */
const judge = (item: any, v: any) => {
  if (item.kind === "build" || item.kind === "match") return lettersIn(v) === lettersIn(item.answer) && lettersIn(v).length > 0;
  if (item.kind === "choice" || item.kind === "never") return String(v).trim().toLowerCase() === String(item.answer).toLowerCase();
  return leadNumber(v) === item.answer;
};

/* the oracle: every answer again by a second route that shares no code with judge, the rail or
   roman(): its own letter table, a right-to-left reading, and a place-by-place writing */
const O_VAL: Record<string, number> = { M: 1000, D: 500, C: 100, L: 50, X: 10, V: 5, I: 1 };
const readRL = (s: string) => {
  let t = 0, top = 0;
  for (let i = s.length - 1; i >= 0; i--) { const v = O_VAL[s[i]]; if (v < top) t -= v; else { t += v; top = v; } }
  return t;
};
const O_PLACE = [["", "M", "MM", "MMM"], ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM"],
  ["", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC"], ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"]];
const writeByPlace = (n: number) => O_PLACE[0][Math.floor(n / 1000)] + O_PLACE[1][Math.floor(n / 100) % 10] + O_PLACE[2][Math.floor(n / 10) % 10] + O_PLACE[3][n % 10];
const oracle = () => PHASES.every((p: any) => p.items.every((it: any) => {
  if (it.kind === "value") return O_VAL[it.letter] === it.answer;
  if (it.kind === "match") { const ls = String(it.answer).split(" "); return ls.length === it.vals.length && ls.every((l: string, k: number) => O_VAL[l] === it.vals[k]); }
  if (it.kind === "choice") {
    const grouped = (v: number) => (v >= 1000 ? Math.floor(v / 1000) + "," + String(v % 1000).padStart(3, "0") : String(v)); /* its own comma route */
    return it.answer === `${grouped(O_VAL[it.letters[0]])} and ${grouped(O_VAL[it.letters[1]])}` && it.choices.some((c: any) => c.id === it.answer);
  }
  if (it.kind === "never") {
    /* its own route: a letter worth five of a place (5, 50, 500) is never repeated, since two of it make the next letter */
    const fives = Object.keys(O_VAL).filter((l) => String(O_VAL[l])[0] === "5").sort((a, b) => O_VAL[a] - O_VAL[b]);
    return fives.join() === it.set.join() && it.answer === `${fives[0]}, ${fives[1]} and ${fives[2]}` && it.choices.filter((c: any) => c.id === it.answer).length === 1;
  }
  if (it.kind === "read") return readRL(it.numeral) === it.answer && writeByPlace(it.answer) === it.numeral;
  if (it.kind === "build") return writeByPlace(it.target) === it.answer && readRL(it.answer) === it.target && (!it.from || it.from[0] - it.from[1] === it.target);
  return false;
}));

/* the most likely wrong answer, the misconception the phase is about (each item names its own) */
const nearMiss = (item: any) => item.near;
/* the forms of an answer that no question, hint or ladder line may print */
const answerForms = (item: any) => {
  if (item.kind === "match") return [item.answer, lettersIn(item.answer), String(item.answer).replace(" ", " and ")];
  if (item.kind === "choice") return [item.answer, item.letters.map((l: string) => words(VAL[l])).join(" and ")];
  if (item.kind === "never") return [item.answer, item.set.join(", "), item.set.join(" ")];
  if (item.kind === "build") return item.from ? [item.answer, String(item.target), words(item.target)] : [item.answer]; /* the target IS the question, unless it is worked out */
  return [String(item.answer), indian(item.answer), words(item.answer)];
};
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => item.answer;

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => {
  if (T.state().stage === "demo") return HOOK.demo && HOOK.demo();
  if (item.kind === "build" || item.kind === "match") { HOOK.set(item.answer); setTimeout(() => HOOK.enter && HOOK.enter(), 40); return; }
  return T.submit(item.answer);
};
/* the agent's answer() on an item made on the working area: the tiles go down as a child's would */
const answer = (item: any, v: any) => (item.kind === "build" || item.kind === "match" ? (HOOK.set ? HOOK.set(v) : false) : undefined);
/* the agent's check(): in a demo it offers the waiting tile; otherwise Enter */
const check = () => (HOOK.check ? HOOK.check() : undefined);

/* ── the working area: 1086 x 528, origin at its top-left ────────────────────────────────────
   Countable things use CONTENT colours (url(#gHundred|gTen|gOne|gBead|gPointer)); coloured numerals
   and words use a deeper ink, shade(colour, 0.25), so they read at 4.5:1. Type uses T.* only.
   Pieces: drag = useDrag(onDrop) then {...control(id, label), ...drag.bind(pay), ...drag.keys(pay)};
   taps = <Hit id x y w h onPress label />. One <Invite/> marks the one thing to touch.
   Nothing is written here that the voice already says. `wrong` = { value, tries } after a miss:
   lock, redraw the mathematics in steps (the traceback), unlock; never mark it, never reset it.
   stage === "free" is Free play (the plan's writeup.freePlay): no target, every control unlocked. */
/* geometry in working-area units. The rail (nine places at a pitch of 92) runs along the top with
   each tile's amount written under it; the refusal strip, the target row and the tray of seven
   follow down the left; the reference card stands down the right and never closes. */
const PITCH = 92, TW = 84, TH = 108, X0 = 26, TILE_Y = 30;
const RAIL = { y: 6, h: 144 };
const LEDGER = { amount: 180, bar: 196 };
const STRIP = { y: 210, h: 62 };
const ROW = { y: 284, h: 72 };
const TRAY = { y: 366, h: 162, tileY: 374, size: 108, pitch: 120, x0: 10, value: 516 };
const CARD = { x: 876, w: 210, h: 528, head: 50 };
const BAYS_X = [236, 476];
const slotX = (j: number) => X0 + j * PITCH;
const trayX = (j: number) => TRAY.x0 + j * TRAY.pitch;
/* a build's correction row: small tiles right of the Clear key, a gap between places, braced in the
   target card below */
const ANS = { x0: 250, y: 218, w: 52, h: 46, pitch: 58, gap: 16 };
/* a long numeral packs its tiles closer, so the last place's worth stays clear of "= target" at the right */
const ansLayout = (want: string, target: number) => {
  const gs = groupsOf(want), eqW = (2 + indian(target).length) * T.speech * 0.6;
  const room = CARD.x - 16 - 18 - eqW - 16 - ANS.x0;
  const pitch = Math.min(ANS.pitch, Math.floor((room - Math.max(0, gs.length - 1) * ANS.gap + 6) / Math.max(1, want.length)));
  return { gs, w: pitch - 6, x: (j: number) => ANS.x0 + j * pitch + Math.max(0, gs.findIndex((g: any) => j >= g.from && j <= g.to)) * ANS.gap };
};

/* The chapter's own content colours: a value keeps its period's colour (the ones period deep blue,
   the thousands green), amber marks what settles the reading; letters are ink, amounts deeper ink. */
const AMBER = CONTENT.ten;
const colourOf = (l: string) => (l === "M" ? CONTENT.one : CONTENT.hundred);
const inkOf = (l: string) => shade(colourOf(l), 0.25);
const TAKE_INK = shade(AMBER, 0.42);

const RW_CSS = `
.rw-move{transition:transform 320ms cubic-bezier(.3,.7,.25,1)}
.rw-lift{transition:transform 240ms ease}
.rw-land{animation:rwLand 360ms ease-out both}
@keyframes rwLand{from{transform:translateY(-26px);opacity:0}to{transform:none;opacity:1}}
.rw-rise{animation:rwRise 560ms cubic-bezier(.2,.8,.3,1) both}
@keyframes rwRise{from{transform:translateY(330px)}to{transform:none}}
.rw-flip{transform-box:fill-box;transform-origin:center;animation:rwFlip 420ms ease-in-out both}
@keyframes rwFlip{from{transform:scaleX(.04)}to{transform:none}}
.rw-grab{cursor:grab}
@media (prefers-reduced-motion:reduce){.rw-move,.rw-lift{transition:none}.rw-land,.rw-rise,.rw-flip{animation:none}}
`;

/* a lettered tile: top-lit face in its period's tint, a solid edge, the letter in ink.
   hollow: a dashed outline (where a refused tile wanted to go, or the refused tile itself) */
function Tile({ x, y, w, h, letter, size, lift, ring, hollow, ink }: any) {
  const c = colourOf(letter || "I");
  if (hollow) return (
    <g pointerEvents="none">
      <rect x={x} y={y} width={w} height={h} rx={12} fill="#FFFFFF" stroke={ink} strokeWidth={3} strokeDasharray="9 7" />
      {letter && <text x={x + w / 2} y={y + h / 2 + size * 0.36} textAnchor="middle" fontSize={size} fontWeight={700} fill={ink}>{letter}</text>}
    </g>
  );
  return (
    <g filter={lift ? "url(#fLift)" : "url(#fShadowSoft)"}>
      <rect x={x} y={y + 5} width={w} height={h} rx={14} fill={shade(c, 0.18)} />
      <rect x={x} y={y} width={w} height={h} rx={14} fill={`url(#${letter === "M" ? "rwFaceG" : "rwFaceB"})`} stroke={ring || shade(c, 0.1)} strokeWidth={ring ? 5 : 2} />
      <path d={`M ${x + 14} ${y + 5} H ${x + w - 14}`} stroke="#FFFFFF" strokeOpacity={0.9} strokeWidth={3} strokeLinecap="round" />
      <text x={x + w / 2} y={y + h / 2 + size * 0.36} textAnchor="middle" fontSize={size} fontWeight={700} fill={ink}>{letter}</text>
    </g>
  );
}

/* the ledger's bar: it points on for an amount that adds and back for one that takes away,
   so the two are told apart by shape before any colour */
function Bar({ cx, y, take, color, hw = 28 }: any) {
  const a = cx - hw, b = cx + hw;
  const head = take ? `M ${a + 11} ${y - 8} L ${a} ${y} L ${a + 11} ${y + 8}` : `M ${b - 11} ${y - 8} L ${b} ${y} L ${b - 11} ${y + 8}`;
  return (
    <g stroke={color} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" fill="none">
      <path d={`M ${a} ${y} H ${b}`} /><path d={head} />
    </g>
  );
}

function Work({ phase, n, item, index, stage, wrong, api, lang = "en", tx: tr = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();
  const free = stage === "free";
  const idRef = useRef(0);
  const mk = (s: string) => String(s || "").split("").map((t) => ({ id: ++idRef.current, t }));
  const openCfg = () => {
    const o = phase.demo || phase.opening || { rail: "", start: 0 };
    return { kind: phase.demo ? "demo" : "open", rail: o.rail, start: o.start || 0 };
  };
  const cfgOf = (it: any) => ({
    kind: it.kind, rail: it.kind === "read" ? it.numeral : it.kind === "build" ? it.start || "" : "", start: 0,
    letter: it.letter, vals: it.vals, letters: it.letters, target: it.target, from: it.from, set: it.set,
  });
  const init = openCfg();
  const [cfg, setCfg] = useState<any>(init);
  const [rail, setRailS] = useState<any[]>(() => mk(init.rail));
  const [start, setStartS] = useState<number>(init.start);
  const railRef = useRef(rail); const startRef = useRef(start);
  const setRail = (r: any[], st = startRef.current) => { railRef.current = r; startRef.current = st; setRailS(r); setStartS(st); };
  const [bays, setBaysS] = useState<any[]>([]);
  const baysRef = useRef(bays);
  const setBays = (b: any[]) => { baysRef.current = b; setBaysS(b); };
  const [hang, setHang] = useState<any>(null);        /* a refused tile, hanging over the place it wanted */
  const [strip, setStrip] = useState<any>(null);      /* the rule that refused it, printed a word at a time */
  const [rows, setRows] = useState<string[]>([]);     /* card rows lit */
  const [pairsLit, setPairsLit] = useState<string[]>([]);
  const [barred, setBarred] = useState<string[]>([]); /* bars on the card under letters never repeated */
  const [trayLift, setTrayLift] = useState<string[]>([]); /* tray tiles held up together (a traceback) */
  const [back, setBack] = useState(n === 4);          /* the card's side: letters, or the six pairs */
  const [cardUpto, setCardUpto] = useState(99);       /* rows drawn (the card redraws itself row by row) */
  const [litTile, setLitTile] = useState<number | null>(null);
  const [shownTo, setShownTo] = useState(-1);         /* a read item's amounts written up to this tile */
  const [totalOn, setTotalOn] = useState(false);
  const [groupsTo, setGroupsTo] = useState(4);        /* place brackets shown for places >= this */
  const [partsOn, setPartsOn] = useState(false);      /* a build's target split by place */
  const [hlPlace, setHlPlace] = useState<number | null>(null);
  const [trayStep, setTrayStep] = useState<number | null>(null);
  const [bayVals, setBayVals] = useState(false);
  const [touched, setTouched] = useState(false);
  /* phase 1 hides every value until the item is won; a letter the child lifts onto the rail shows its
     amount there, and the card fills in that row (the plan's "lift one and read it") */
  const [seen, setSeen] = useState<string[]>([]);
  const saw = (l: string) => setSeen((v: string[]) => (v.includes(l) ? v : [...v, l]));
  /* a correction ends on the whole right answer: a reading's total climbs to it (climb), a build lays
     the right numeral under the child's rail and a match names the right letters (ansUpto, -1 = off) */
  const [climb, setClimb] = useState<number | null>(null);
  const [ansUpto, setAnsUpto] = useState(-1);
  const setupFor = useRef(-1);
  const busy = tl.busy;
  const kind = cfg.kind;
  const railStr = () => railRef.current.map((x: any) => x.t).join("");

  const clearHelp = () => {
    setStrip(null); setHang(null); setRows([]); setPairsLit([]);
    if (kind !== "never") setBarred([]); /* the letters the child has found never repeat stay barred */
    setGroupsTo(4); setPartsOn(false); setHlPlace(null); setLitTile(null); setTrayStep(null); setTrayLift([]);
    setClimb(null); /* once the child builds again, the count is the rail's own */
  };
  const reset = (c: any) => {
    tl.stop();
    setCfg(c); setRail(mk(c.rail), c.start);
    setBays(c.kind === "match" ? c.vals.map(() => null) : c.kind === "choice" ? c.letters.slice() : []);
    clearHelp(); setBarred([]); setCardUpto(99); setShownTo(-1); setTotalOn(false); setBayVals(false); setTouched(false); setSeen([]); setClimb(null); setAnsUpto(-1);
    api.lock(false);
  };

  useEffect(() => {
    if (stage === "ask" && setupFor.current !== index) { setupFor.current = index; reset(cfgOf(item)); }
  }, [stage, index]);

  /* free play (the plan's freePlay): any tiles, either way round, every refusal explained */
  useEffect(() => {
    if (!free) return;
    setupFor.current = -2;
    reset({ kind: "free", rail: "", start: 0 });
  }, [free]);

  const oneTile = kind === "value" || kind === "choice"; /* phase 1's rail holds one tile at a time: lift it and read it */
  const buildLive = !busy && ((stage === "ask" && (kind === "build" || kind === "never" || oneTile)) || (free && kind === "free"));
  const matchLive = !busy && stage === "ask" && kind === "match";
  const lookLive = !busy && stage === "ask" && kind === "read";
  const demoLive = !busy && stage === "demo" && kind === "demo" && !hang;

  /* the card answers a refusal: the letters it names, or the six pairs */
  const cardFor = (rule: any) => {
    /* on the question about the letters never repeated, a refusal bars only the letter the child tried */
    if (rule.kind === "never" || rule.kind === "vld") { setBack(false); setBarred((b: string[]) => (kind !== "never" ? ["V", "L", "D"] : b.includes(rule.t) ? b : [...b, rule.t])); }
    else if (rule.kind === "three") { setBack(false); setRows([rule.t]); }
    else if (rule.kind === "pair") { setBack(true); setPairsLit(PAIRS.filter((p) => p[0] === rule.t)); }
  };

  /* a refusal is the material answering, never a mark: the tile stops short of the place it wanted
     and hangs there, the rule prints itself a word at a time, then the tile lifts back to the tray
     and the numeral on the rail is exactly what it was */
  const refuse = (t: string, k: number, rule: any, isDemo: boolean) => {
    api.lock(true);
    const ws = rule.text.split(" ");
    const S: any[] = [[60, () => { setStrip(null); setHang({ t, k }); }], [620, () => setStrip({ t, text: rule.text, upto: 0 })]];
    ws.forEach((_: any, w: number) => S.push([170, () => setStrip({ t, text: rule.text, upto: w + 1 })]));
    S.push([240, () => cardFor(rule)], [1300, () => setHang(null)], [420, () => {}]);
    tl.run(S, () => {
      api.lock(false);
      if (isDemo) api.demoDone(phase.demoLines);
      else api.say(rule.text);
    });
  };

  const dropTile = (t: string, at: number | null) => {
    setTouched(true);
    if (oneTile) { setRail(mk(t), 0); setRows([t]); setBack(false); setTrayStep(null); saw(t); api.sfx.tick(); return; } /* one tile at a time: lift it and read it */
    const cur = railRef.current;
    const k = at === null ? cur.length : Math.max(0, Math.min(at, cur.length));
    const next = cur.slice();
    next.splice(k, 0, mk(t)[0]);
    const s = next.map((x: any) => x.t).join("");
    clearHelp();
    const rule = ruleOf(s);
    if (rule) { refuse(t, k, rule, false); return; }
    let st = startRef.current;
    if (k === 0 && st > 0) st -= 1;
    if (st + next.length > SLOTS) st = Math.max(0, SLOTS - next.length);
    setRail(next, st);
    api.sfx.tick();
    if (stage === "ask" && kind === "build") api.setTyped(s);
  };
  const removeTile = (i: number) => {
    setTouched(true);
    if (oneTile) { setRail([], 0); setRows([]); return; }
    const cur = railRef.current, next = cur.filter((_: any, j: number) => j !== i);
    const s = next.map((x: any) => x.t).join("");
    clearHelp();
    const rule = ruleOf(s);
    if (rule) { setStrip({ t: cur[i].t, text: rule.text, upto: 99 }); api.say(rule.text); return; } /* what is left would not be a numeral */
    setRail(next, next.length ? startRef.current : 0);
    api.sfx.tick();
    if (stage === "ask" && kind === "build") api.setTyped(s);
  };
  const clearRail = () => {
    if (!buildLive) return;
    setTouched(true); clearHelp(); setRail([], 0);
    if (stage === "ask" && kind === "build") api.setTyped("");
  };
  const dropBay = (t: string, at: number | null) => {
    const b = baysRef.current.slice();
    const k = at === null ? b.findIndex((x: any) => !x) : at;
    if (k < 0) return; /* both bays full: a tile tapped on a bay goes back first */
    b[k] = t; setBays(b); setTouched(true); setRows(b.filter(Boolean)); setBack(false); saw(t); api.sfx.tick();
    api.setTyped(b.filter(Boolean).join(" "));
  };
  const takeBay = (k: number) => {
    const b = baysRef.current.slice(); b[k] = null; setBays(b); setRows(b.filter(Boolean));
    api.setTyped(b.filter(Boolean).join(" "));
  };
  const look = (i: number) => {
    const l = kind === "choice" ? baysRef.current[i] : (railRef.current[i] || {}).t;
    if (!l) return;
    setTouched(true); setLitTile(i); setBack(false); setRows([l]);
  };
  const demoDrop = () => {
    if (!demoLive) return;
    const t = phase.demo.tile, cur = railRef.current;
    const k = startRef.current > 0 ? 0 : cur.length; /* phase 4: the place left of the L; phase 3: after the three */
    const s = cur.map((x: any) => x.t).join("");
    const next = k === 0 ? t + s : s + t;
    setTouched(true);
    refuse(t, k, ruleOf(next) || { kind: "order", text: "Write from the biggest letter down." }, true);
  };

  const insertAt = (x: number) => railRef.current.filter((_: any, j: number) => slotX(startRef.current + j) + TW / 2 < x).length;
  const nearestBay = (x: number) => (Math.abs(BAYS_X[0] + TW / 2 - x) <= Math.abs(BAYS_X[1] + TW / 2 - x) ? 0 : 1);
  const drag = useDrag((pay: any, p: any, moved: boolean) => {
    if (pay.src === "tray") {
      if (moved && !(p.y < STRIP.y && p.x < CARD.x - 8)) return; /* let go off the rail: it simply goes back */
      if (kind === "demo") return demoDrop();
      if (lookLive) { setTouched(true); setLitTile(null); setBack(false); setRows([pay.t]); return; } /* a reading: a tray tile is looked up, the rail is the question */
      if (!(buildLive || matchLive)) return;
      if (kind === "match") return dropBay(pay.t, moved ? nearestBay(p.x) : null);
      return dropTile(pay.t, moved ? insertAt(p.x) : null);
    }
    if (kind === "read" || kind === "choice") return lookLive ? look(pay.i) : undefined;
    if (moved && p.y < STRIP.y) return; /* put back down on the rail: it stays */
    if (kind === "match") return matchLive ? takeBay(pay.i) : undefined;
    if (buildLive) removeTile(pay.i);
  });

  /* Enter (and in a demo, the agent's check) */
  const enterFn: any =
    stage === "demo" ? (demoLive ? () => demoDrop() : null)
      : stage !== "ask" || busy ? null
        : kind === "build" ? () => { const s = railStr(); if (s) api.submit(s); }
          : kind === "match" ? () => { const b = baysRef.current; if (b.length && b.every(Boolean)) api.submit(b.join(" ")); }
            : null;
  api.onEnter(enterFn);
  HOOK.enter = () => enterFn && enterFn();
  HOOK.demo = () => demoDrop();
  HOOK.check = () => (demoLive ? (demoDrop(), true) : undefined);
  HOOK.set = (v: any) => {
    if (kind === "match") {
      const ls = String(v ?? "").toUpperCase().split(/[^IVXLCDM]+/).filter(Boolean);
      if (ls.length !== baysRef.current.length || ls.some((l) => l.length !== 1)) return false;
      setBays(ls); setTouched(true); api.setTyped(ls.join(" "));
      return true;
    }
    if (kind === "build") {
      const s = lettersIn(v);
      if (!s || ruleOf(s)) return false;
      clearHelp(); setTouched(true); setRail(mk(s), 0); api.setTyped(s);
      return true;
    }
    return false;
  };

  /* ── win motions: the maths moving ── */
  useEffect(() => {
    if (stage !== "win") return;
    if (kind === "value") tl.run([[60, () => { setRail(mk(cfg.letter), 0); setRows([cfg.letter]); setTotalOn(true); api.sfx.tick(); }], [700, () => {}]]);
    else if (kind === "match") tl.run([...baysRef.current.map((_: any, k: number) => [380, () => setLitTile(k)]), [400, () => setLitTile(null)]]);
    else if (kind === "choice") tl.run([[200, () => { setBack(false); setRows(cfg.letters); }], [500, () => setBayVals(true)], [700, () => {}]]);
    else if (kind === "read") tl.run([...railRef.current.map((_: any, i: number) => [300, () => { setLitTile(i); setShownTo(i); }]), [300, () => { setLitTile(null); setTotalOn(true); }], [600, () => {}]]);
    else if (kind === "build") tl.run([...railRef.current.map((_: any, i: number) => [200, () => setLitTile(i)]), [300, () => setLitTile(null)]]);
    else if (kind === "never") tl.run([[200, () => { setBack(false); setRows(cfg.set); setBarred(cfg.set); setTrayLift(cfg.set); }], [900, () => {}]]);
  }, [stage]);

  /* ── the traceback: the mathematics redrawn in steps; nothing marked, nothing cleared ── */
  useEffect(() => {
    if (!wrong || stage !== "ask") return;
    api.lock(true);
    setTouched(true);
    const S: any[] = [[300, () => { setStrip(null); setHang(null); setLitTile(null); }]];
    const redrawCard = (lit: string[]) => {
      S.push([60, () => { setBack(false); setRows([]); setCardUpto(0); }]);
      for (let r = 1; r <= 7; r++) { const rr = r; S.push([150, () => setCardUpto(rr)]); }
      S.push([320, () => { setRows(lit); lit.forEach(saw); }], [500, () => {}]); /* the asked rows light, their values written in */
    };
    if (kind === "value") {
      /* the card redraws, the tile rises in the tray and lands on the rail with its amount: the value shows */
      redrawCard([cfg.letter]);
      S.push([200, () => setTrayStep(LETTERS.indexOf(cfg.letter))], [520, () => { setTrayStep(null); setRail(mk(cfg.letter), 0); }], [400, () => {}]);
    } else if (kind === "choice") redrawCard(cfg.letters);
    else if (kind === "never") {
      /* the card redraws; each letter that is never repeated rises in the tray, takes its bar on the card and
         the strip prints its rule; the strip ends on all three */
      const set: string[] = cfg.set;
      redrawCard([]);
      set.forEach((t: string, k: number) => S.push([760, () => { const up = set.slice(0, k + 1); setTrayLift(up); setRows(up); setBarred(up); setStrip({ t, text: `${t} is never repeated.`, upto: 99 }); }]));
      S.push([900, () => setStrip({ t: "", text: `${item.answer} are never repeated.`, upto: 99 })], [400, () => {}]);
    }
    else if (kind === "match") {
      /* the seven set themselves down in order of value, the steps lighting one after another; then the
         right letter is named under each bay and lit on the card */
      const ls = String(item.answer).split(" ");
      S.push([60, () => setBack(false)]);
      for (let j = 0; j < 7; j++) { const jj = j; S.push([330, () => setTrayStep(jj)]); }
      S.push([400, () => setTrayStep(null)], [400, () => { setRows(ls); ls.forEach(saw); setAnsUpto(99); }], [400, () => {}]);
    } else if (kind === "read") {
      /* each tile writes its amount, then the total climbs place by place to the answer */
      S.push([60, () => { setShownTo(-1); setGroupsTo(4); setTotalOn(false); setClimb(null); }]);
      railRef.current.forEach((_: any, i: number) => S.push([540, () => { setLitTile(i); setShownTo(i); }]));
      S.push([400, () => { const ps = PAIRS.filter((p) => railStr().includes(p)); setLitTile(null); if (ps.length) setBack(true); setPairsLit(ps); }]); /* the card turns to its back and lights the pairs it holds */
      let sum = 0;
      groupsOf(railStr()).forEach((g: any) => { sum += g.worth; const v = sum; S.push([650, () => { setGroupsTo(g.place); setHlPlace(g.place); setClimb(v); }]); });
      S.push([500, () => { setHlPlace(null); setClimb(null); setTotalOn(true); }]);
    } else if (kind === "build") {
      /* the right numeral is laid one place at a time, each place braced with its worth, while the count
         climbs to the target; a place that is a pair is ringed amber and the card lights it on its back */
      const want = String(item.answer), gs = groupsOf(want);
      let sum = 0;
      S.push([60, () => { setGroupsTo(4); setAnsUpto(0); setClimb(null); }]);
      gs.forEach((g: any) => {
        sum += g.worth; const v = sum, part = want.slice(g.from, g.to + 1);
        S.push([750, () => { setHlPlace(g.place); setAnsUpto(g.to + 1); setClimb(v); if (PAIRS.includes(part)) { setBack(true); setPairsLit([part]); } }]);
      });
      S.push([500, () => setHlPlace(null)]);
    }
    tl.run(S, () => api.lock(false));
  }, [wrong]);

  /* ── what the host can read back (a read item's total stays null until it is answered) ── */
  const s = rail.map((x: any) => x.t).join("");
  const bayKind = kind === "match" || (kind === "choice" && (stage === "win" || stage === "idle"));
  const showTotal = !bayKind && (["build", "free", "demo", "open", "value", "choice", "never"].includes(kind) || (kind === "read" && totalOn));
  const total = climb !== null ? climb : showTotal ? worthOf(s) : null;
  const count = bayKind ? bays.filter(Boolean).length : kind === "build" && climb !== null ? Math.max(0, ansUpto) : rail.length;
  api.share({ phase: n, rail: bayKind ? bays.map((b: any) => b || "").join(" ").trim() : s, total, value: total,
    direction: kind === "build" ? "number to numeral" : kind === "read" || kind === "value" ? "numeral to number" : kind === "match" ? "value to letter" : kind === "choice" ? "letter to value" : "either way",
    target: kind === "build" ? cfg.target : null, lastRefusal: strip ? strip.text : null, tiles: count, cardSide: back ? "pairs" : "letters", complete: stage === "idle" });

  /* ── drawing ── */
  const amounts = amountsOf(s);
  const ledgerAll = ["build", "free", "demo", "open", "value", "choice", "never"].includes(kind);
  /* phase 1 asks what letters are worth: until each win, the tray and the card keep their values back
     (a letter the child has lifted onto the rail fills in its card row) */
  const hideVals = n === 1 && (stage === "teach" || stage === "ask");
  const cardVal = (l: string) => (hideVals && !seen.includes(l) ? "?" : indian(VAL[l]));
  const shown = (i: number) => ledgerAll || (kind === "read" && i <= shownTo);
  const openGap = !!hang && !(hang.k === 0 && start > 0) && start + rail.length < SLOTS;
  const tileSlot = (j: number) => start + j + (openGap && j >= hang.k ? 1 : 0);
  const hangSlot = hang ? Math.min(SLOTS - 1, hang.k === 0 && start > 0 ? start - 1 : start + hang.k) : 0;
  const moving = drag.drag && drag.drag.moved ? drag.drag : null;
  const carrying = moving && (moving.payload.src === "tray" ? buildLive || matchLive || demoLive : buildLive || matchLive) ? moving : null;
  const groups = groupsTo < 4 ? groupsOf(s).filter((g: any) => g.place >= groupsTo) : [];
  const parts = cfg.target ? partsOf(cfg.target) : [];
  const trayLive = (l: string) => buildLive || matchLive || lookLive || (demoLive && l === phase.demo.tile);
  const litRow = (l: string) => rows.includes(l) || (trayStep !== null && LETTERS[trayStep] === l);
  /* an empty rail reads nothing yet; a read item's total is a question mark until it is answered */
  const runBig = total !== null ? (rail.length ? indian(total) : null) : kind === "read" ? "?" : null;
  const quiet = mix(C.ink, C.panel, 0.5);
  const clearOff = !buildLive || !rail.length;
  const invite =
    demoLive ? { x: trayX(LETTERS.indexOf(phase.demo.tile)) + TRAY.size / 2, y: TRAY.tileY + TRAY.size / 2, r: 66 }
      : stage !== "ask" || touched || busy ? null
        : kind === "value" ? { x: trayX(LETTERS.indexOf(cfg.letter)) + TRAY.size / 2, y: TRAY.tileY + TRAY.size / 2, r: 66 }
          : kind === "choice" ? { x: trayX(LETTERS.indexOf(cfg.letters[0])) + TRAY.size / 2, y: TRAY.tileY + TRAY.size / 2, r: 66 }
          /* the letters never repeated: the first tile (I, which repeats) invites a test, and names none of them */
          : kind === "never" ? { x: trayX(0) + TRAY.size / 2, y: TRAY.tileY + TRAY.size / 2, r: 66 }
          : kind === "match" ? { x: BAYS_X[0] + TW / 2, y: TILE_Y + TH / 2, r: 64 }
            /* a build invites the tray tile to lift next (the rail's own start is a beginning of the answer) */
            : kind === "build" && String(item.answer)[rail.length] ? { x: trayX(LETTERS.indexOf(String(item.answer)[rail.length])) + TRAY.size / 2, y: TRAY.tileY + TRAY.size / 2, r: 66 }
              : null;

  return (
    <g>
      <style>{RW_CSS}</style>
      <defs>
        {[["rwFaceB", CONTENT.hundred], ["rwFaceG", CONTENT.one]].map(([id, c]) => (
          <linearGradient key={id} id={id} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={tint(c, 0.9)} /><stop offset="1" stopColor={tint(c, 0.7)} />
          </linearGradient>
        ))}
      </defs>

      {/* running count, in the runs zone (64,108): what the rail is worth, and how many tiles */}
      <g data-zone="runs">
        <rect x={0} y={-94} width={330} height={76} rx={RAD.panel} fill="url(#gPanel)" stroke={C.rule} strokeWidth={2} />
        {runBig !== null && <text x={18} y={-56 + T.xl * 0.36} fontSize={T.xl} fontWeight={700} fill={C.ink}>{runBig}</text>}
        <text x={316} y={-56 + T.micro * 0.36} textAnchor="end" fontSize={T.micro} fontWeight={500} fill={C.ink}>{lang === "hi" ? `${count} टाइल` : lang === "gu" ? `${count} ટાઇલ` : count === 1 ? "1 tile" : `${count} tiles`}</text>
      </g>

      {/* the build rail, with its stop at the left hand end */}
      <rect x={0} y={RAIL.y} width={CARD.x - 16} height={RAIL.h} rx={18} fill={C.paper} stroke={C.rule} strokeWidth={2} />
      <path d={`M 22 ${TILE_Y + TH + 6} H ${CARD.x - 38}`} stroke={C.rule} strokeWidth={3} strokeLinecap="round" />
      <rect x={8} y={TILE_Y - 8} width={10} height={TH + 14} rx={5} fill={shade(C.rule, 0.3)} />

      {/* where the demo's tile wants to go */}
      {kind === "demo" && !hang && (
        <Tile hollow x={slotX(start > 0 ? start - 1 : start + rail.length)} y={TILE_Y} w={TW} h={TH} ink={shade(C.rule, 0.35)} />
      )}

      {/* bays: phase 1 matches letters and values one tile at a time, not as a numeral */}
      {bayKind && bays.map((b: any, k: number) => {
        const x = BAYS_X[k];
        const live = (kind === "match" && matchLive && !!b) || (kind === "choice" && lookLive);
        const pay = { src: "rail", i: k };
        const label = kind === "match" ? indian(cfg.vals[k]) : bayVals ? indian(VAL[b]) : "?";
        const ansL = kind === "match" && ansUpto >= 0 ? String(item.answer).split(" ")[k] : null; /* the correction names the right letter */
        const labelInk = label === "?" ? C.ink : kind === "match" ? inkOf(cfg.vals[k] >= 1000 ? "M" : "I") : inkOf(b);
        return (
          <g key={"bay" + k}>
            {/* a dashed outline means an empty place (or a refusal), so only an empty match bay has one */}
            {kind === "match" && !b && <rect x={x - 5} y={TILE_Y - 5} width={TW + 10} height={TH + 12} rx={16} fill="#FFFFFF" stroke={shade(C.rule, 0.2)} strokeWidth={3} strokeDasharray="10 8" />}
            {b && (
              <g className={live ? "rw-grab c4-piece" : ""} {...(live ? { ...control("bay-" + k, kind === "match" ? "Take " + b + " back" : "Look up " + b), ...drag.bind(pay), ...drag.keys(pay) } : {})}>
                <g key={b} className="rw-land"><Tile x={x} y={TILE_Y} w={TW} h={TH} letter={b} size={T.xl} ring={litTile === k ? AMBER : null} ink={C.ink} /></g>
                <rect x={x} y={TILE_Y} width={TW} height={TH} fill="transparent" />
              </g>
            )}
            <text x={x + TW / 2} y={LEDGER.amount + 2} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={labelInk}>{label}</text>
            {/* a letter dropped in a bay says what it is worth: the child checks it against the bay */}
            {kind === "match" && (ansL || b) && (
              <text x={x + TW / 2} y={STRIP.y + 44} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={ansL ? TAKE_INK : inkOf(b)}>{lang === "hi" ? `${ansL || b} का मान ${indian(VAL[ansL || b])}` : lang === "gu" ? `${ansL || b} ની કિંમત ${indian(VAL[ansL || b])}` : (ansL || b) + " is " + indian(VAL[ansL || b])}</text>
            )}
          </g>
        );
      })}

      {/* the tiles on the rail, each with the amount it brings written under it */}
      {!bayKind && rail.map((x: any, j: number) => {
        const live = buildLive || (lookLive && kind === "read");
        const pay = { src: "rail", i: j };
        const gone = carrying && carrying.payload.src === "rail" && carrying.payload.i === j;
        const a = amounts[j];
        const ink = a < 0 ? TAKE_INK : inkOf(x.t);
        return (
          <g key={x.id} className="rw-move" style={{ transform: `translate(${slotX(tileSlot(j))}px, 0px)` } as any}>
            <g className="rw-land">
              <g className={live ? "rw-grab c4-piece" : ""} {...(live ? { ...control("rail-" + j, (kind === "read" ? "Look up " : "Take off ") + x.t), ...drag.bind(pay), ...drag.keys(pay) } : {})}>
                {!gone && <Tile x={0} y={TILE_Y} w={TW} h={TH} letter={x.t} size={T.xl} ring={litTile === j ? AMBER : null} ink={C.ink} />}
                <rect x={0} y={TILE_Y} width={TW} height={TH} fill="transparent" />
              </g>
              {shown(j) && (
                <g>
                  <text x={TW / 2} y={LEDGER.amount} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={ink}>{(a < 0 ? "−" : "") + indian(Math.abs(a))}</text>{/* the bar carries add or take; a minus marks the take */}
                  <Bar cx={TW / 2} y={LEDGER.bar} take={a < 0} color={ink} />
                </g>
              )}
            </g>
          </g>
        );
      })}

      {/* a pair that takes away is ringed amber: that pair settles the reading */}
      {!bayKind && !hang && amounts.map((a: number, i: number) => (a < 0 && shown(i) && shown(i + 1) ? (
        <rect key={"ring" + i} x={slotX(tileSlot(i)) - 6} y={TILE_Y - 6} width={PITCH + TW + 12} height={TH + 17} rx={20} fill="none" stroke={AMBER} strokeWidth={4} pointerEvents="none" />
      ) : null))}

      {/* a refused tile hangs a little above the place it wanted, over its hollow outline */}
      {hang && (
        <g pointerEvents="none">
          <Tile hollow x={slotX(hangSlot)} y={TILE_Y} w={TW} h={TH} ink={shade(C.rule, 0.35)} />
          <g className="rw-rise"><Tile x={slotX(hangSlot)} y={TILE_Y - 28} w={TW} h={TH} letter={hang.t} size={T.xl} lift ink={C.ink} /></g>
        </g>
      )}

      {/* the rail's own groups by place, each with what it is worth (tracebacks) */}
      {groups.map((g: any) => {
        const x1 = slotX(tileSlot(g.from)) + 4, x2 = slotX(tileSlot(g.to)) + TW - 4, col = hlPlace === g.place ? TAKE_INK : C.ink;
        return (
          <g key={"grp" + g.place} pointerEvents="none">
            <path d={`M ${x1} ${STRIP.y + 4} V ${STRIP.y + 14} H ${x2} V ${STRIP.y + 4}`} fill="none" stroke={col} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
            <text x={(x1 + x2) / 2} y={STRIP.y + 48} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={col}>{indian(g.worth)}</text>
          </g>
        );
      })}

      {/* a build's correction: the right numeral laid under the child's rail, place by place */}
      {kind === "build" && ansUpto > 0 && !strip && (() => {
        const want = String(item.answer), A = ansLayout(want, cfg.target), hg = A.gs.find((g: any) => g.place === hlPlace);
        const am = amountsOf(want), takes = am.some((a: number) => a < 0);
        return (
          <g pointerEvents="none">
            {want.split("").slice(0, ansUpto).map((l, j) => (
              <Tile key={"ans" + j} x={A.x(j)} y={ANS.y} w={A.w} h={ANS.h} letter={l} size={T.label} ink={C.ink} />
            ))}
            {/* a pair that takes away is ringed amber, as on the rail; then the place being laid shows by its brace alone */}
            {am.map((a: number, j: number) => (a < 0 && j + 1 < ansUpto
              ? <rect key={"pr" + j} x={A.x(j) - 6} y={ANS.y - 6} width={A.x(j + 1) + A.w + 12 - A.x(j)} height={ANS.h + 17} rx={12} fill="none" stroke={AMBER} strokeWidth={4} /> : null))}
            {hg && !takes && <rect x={A.x(hg.from) - 6} y={ANS.y - 6} width={A.x(hg.to) + A.w + 12 - A.x(hg.from)} height={ANS.h + 17} rx={12} fill="none" stroke={AMBER} strokeWidth={4} />}
          </g>
        );
      })()}

      {/* the refusal strip: the refused tile drawn hollow, and the rule that refused it */}
      {strip && (
        <g data-role="reading">
          <rect x={0} y={STRIP.y} width={CARD.x - 16} height={STRIP.h} rx={16} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} />
          {strip.t && <Tile hollow x={14} y={STRIP.y + 7} w={48} h={48} letter={strip.t} size={T.micro} ink={C.ink} />}
          <text x={strip.t ? 82 : 24} y={STRIP.y + 42} fontSize={T.label} fontWeight={600} fill={C.ink}>{(() => {
            /* the rule in the language in use, printed a word at a time in step with the English word count */
            const ws = tr(strip.text).split(" "), enN = strip.text.split(" ").length;
            return ws.slice(0, strip.upto >= enN ? ws.length : Math.round((strip.upto * ws.length) / enN)).join(" ");
          })()}</text>
        </g>
      )}

      {/* the target card: the number to make (or the sum to work out first); a traceback splits it by place */}
      {kind === "build" && (() => {
        const want = String(item.answer), A = ansLayout(want, cfg.target), on = ansUpto > 0 && !strip;
        return (
          <g data-role="reading">
            <rect x={230} y={ROW.y} width={CARD.x - 16 - 230} height={ROW.h} rx={18} fill={tint(C.panel, 0.4)} stroke={C.rule} strokeWidth={2} />
            {!on ? (
              <g>
                <text x={254} y={ROW.y + 47} fontSize={T.label} fontWeight={600} fill={C.ink}>{tr("Make")}</text>
                <text x={lang === "en" ? 352 : 380} y={ROW.y + 51} fontSize={T.speech} fontWeight={700} fill={C.ink}>
                  {cfg.from ? `${indian(cfg.from[0])} − ${indian(cfg.from[1])}` : indian(cfg.target)}
                </text>
              </g>
            ) : (
              /* under the correction: each place braced with its worth, then what the numeral makes */
              <g>
                {A.gs.filter((g: any) => g.to < ansUpto).map((g: any) => {
                  const x1 = A.x(g.from) + 2, x2 = A.x(g.to) + A.w - 2, col = hlPlace === g.place ? TAKE_INK : C.ink;
                  const pairG = PAIRS.includes(want.slice(g.from, g.to + 1)); /* a pair: the taking-away tile's bar back to front, the other's forward */
                  return (
                    <g key={"brace" + g.place}>
                      {pairG
                        ? [g.from, g.to].map((j: number, k: number) => <Bar key={"pb" + j} cx={A.x(j) + A.w / 2} y={ROW.y + 15} take={k === 0} color={k === 0 ? TAKE_INK : inkOf(want[j])} hw={20} />)
                        : <path d={`M ${x1} ${ROW.y + 9} V ${ROW.y + 17} H ${x2} V ${ROW.y + 9}`} fill="none" stroke={col} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />}
                      <text x={(x1 + x2) / 2} y={ROW.y + 51} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={col}>{indian(g.worth)}</text>
                    </g>
                  );
                })}
                {ansUpto >= want.length && <text x={CARD.x - 16 - 18} y={ROW.y + 51} textAnchor="end" fontSize={T.speech} fontWeight={700} fill={C.ink}>{"= " + indian(cfg.target)}</text>}
              </g>
            )}
          </g>
        );
      })()}
      {(kind === "build" || kind === "free" || kind === "never") && (
        <Key id="clear" label={tr("Clear the rail")} x={0} y={ROW.y} w={210} h={ROW.h} C={C} disabled={clearOff} onClick={clearRail}>
          <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={clearOff ? quiet : C.ink}>{tr("Clear")}</text>
        </Key>
      )}

      {/* the tray: seven tiles that never run out, each value printed under its letter */}
      <rect x={0} y={TRAY.y} width={CARD.x - 16} height={TRAY.h} rx={22} fill="url(#gPanel)" stroke={C.rule} strokeWidth={2} />
      {LETTERS.map((l, j) => {
        const x = trayX(j), live = trayLive(l), pay = { src: "tray", t: l }, up = trayStep === j || trayLift.includes(l);
        return (
          <g key={l}>
            <rect x={x} y={TRAY.tileY} width={TRAY.size} height={TRAY.size} rx={14} fill="none" stroke={C.rule} strokeWidth={2} strokeDasharray="8 7" />
            <g className={"rw-lift" + (live ? " rw-grab c4-piece" : "")} style={{ transform: `translateY(${up ? -14 : 0}px)` } as any}
              {...(live ? { ...control("tile-" + l, (lookLive ? "Look up " : "Put ") + l + (lookLive ? " on the card" : " on the rail")), ...drag.bind(pay), ...drag.keys(pay) } : {})}>
              <Tile x={x} y={TRAY.tileY} w={TRAY.size} h={TRAY.size} letter={l} size={T.display} ring={up ? AMBER : null} ink={C.ink} />
              <rect x={x} y={TRAY.tileY} width={TRAY.size} height={TRAY.size} fill="transparent" />
            </g>
            {!hideVals && <text x={x + TRAY.size / 2} y={TRAY.value} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={inkOf(l)}>{indian(VAL[l])}</text>}
          </g>
        );
      })}

      {/* the reference card: seven letters and their values, or on its back the six pairs; a tap turns it */}
      <g>
        <rect x={CARD.x} y={0} width={CARD.w} height={CARD.h} rx={20} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} />
        <text x={CARD.x + 20} y={34} fontSize={T.micro} fontWeight={600} fill={C.ink}>{tr(back ? "Pairs" : "Letters")}</text>
        <g transform={`translate(${CARD.x + CARD.w - 30},25)`} stroke={C.ink} strokeWidth={3} fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M -11 -2 A 11 11 0 0 1 9 -6" /><path d="M 10 -14 V -5 H 2" /><path d="M 11 2 A 11 11 0 0 1 -9 6" /><path d="M -10 14 V 5 H -2" />
        </g>
        <path d={`M ${CARD.x + 12} ${CARD.head - 2} H ${CARD.x + CARD.w - 12}`} stroke={C.rule} strokeWidth={2} />
        <g key={back ? "back" : "front"} className="rw-flip">
          {!back ? LETTERS.map((l, r) => {
            if (r >= cardUpto) return null;
            const rh = (CARD.h - CARD.head - 6) / 7, y = CARD.head + r * rh, lit = litRow(l);
            return (
              <g key={l}>
                {r > 0 && <path d={`M ${CARD.x + 16} ${y} H ${CARD.x + CARD.w - 16}`} stroke={tint(C.rule, 0.4)} strokeWidth={1.5} />}
                {lit && <rect x={CARD.x + 8} y={y + 3} width={CARD.w - 16} height={rh - 6} rx={12} fill={tint(AMBER, 0.72)} stroke={AMBER} strokeWidth={3} />}
                <text x={CARD.x + 26} y={y + rh / 2 + 16} fontSize={T.speech} fontWeight={700} fill={C.ink}>{l}</text>
                <text x={CARD.x + CARD.w - 20} y={y + rh / 2 + 12} textAnchor="end" fontSize={T.label} fontWeight={700} fill={cardVal(l) === "?" ? C.ink : inkOf(l)}>{cardVal(l)}</text>
                {barred.includes(l) && <rect x={CARD.x + 22} y={y + rh - 13} width={42} height={6} rx={3} fill={AMBER} />}
              </g>
            );
          }) : PAIRS.map((p, r) => {
            const rh = (CARD.h - CARD.head - 6) / 6, y = CARD.head + r * rh, lit = pairsLit.includes(p);
            return (
              <g key={p}>
                {r > 0 && <path d={`M ${CARD.x + 16} ${y} H ${CARD.x + CARD.w - 16}`} stroke={tint(C.rule, 0.4)} strokeWidth={1.5} />}
                {lit && <rect x={CARD.x + 8} y={y + 4} width={CARD.w - 16} height={rh - 8} rx={12} fill={tint(AMBER, 0.72)} stroke={AMBER} strokeWidth={3} />}
                <text x={CARD.x + 22} y={y + rh / 2 + 16} fontSize={T.speech} fontWeight={700} fill={C.ink}>{p}</text>
                <text x={CARD.x + CARD.w - 20} y={y + rh / 2 + 12} textAnchor="end" fontSize={T.label} fontWeight={700} fill={hideVals ? C.ink : inkOf(p[0])}>{hideVals ? "?" : worthOf(p)}</text>{/* the pairs would give the letters away too */}
              </g>
            );
          })}
        </g>
        <Hit id="card" label={back ? "Turn the card to the letters" : "Turn the card to the pairs"} x={CARD.x} y={0} w={CARD.w} h={CARD.h} onPress={() => setBack((b: boolean) => !b)} />
      </g>

      {/* the tile under the finger */}
      {carrying && (() => {
        const l = carrying.payload.src === "tray" ? carrying.payload.t : kind === "match" ? bays[carrying.payload.i] : (rail[carrying.payload.i] || {}).t;
        return l ? <g pointerEvents="none"><Tile x={carrying.x - TW / 2} y={carrying.y - TH / 2} w={TW} h={TH} letter={l} size={T.xl} lift ink={C.ink} /></g> : null;
      })()}

      {invite && <Invite x={invite.x} y={invite.y} r={invite.r} C={C} />}
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase:
   result.last = { value, answer, kind, item, shared } (shared = what api.share held at that moment) */
function Thumb({ n, result, C, w, h }: any) {
  const L = (result && result.last) || {};
  const it = ((PHASES[(n || 1) - 1] || {}).items || [])[L.item] || {};
  /* a numeral as a row of small tiles (a take-away pair ringed amber) with what it makes under it; phase 1's
     letters stand apart, each with its value */
  let word = "", eq = "", apart: string[] | null = null, barredApart = false;
  if (it.kind === "value") { word = it.letter; eq = "= " + indian(it.answer); }
  else if (it.kind === "read") { word = it.numeral; eq = "= " + indian(it.answer); }
  else if (it.kind === "build") { word = lettersIn(L.value) || it.answer; eq = "= " + indian(it.target); }
  else if (it.kind === "match") apart = String(it.answer).split(" ");
  else if (it.kind === "choice") apart = it.letters.slice();
  else if (it.kind === "never") { apart = it.set.slice(); barredApart = true; } /* each with the card's amber bar under it */
  if (!word && !apart) return null;
  const tile = (l: string, x: number, tw: number, key: string) => (
    <g key={key}>
      <rect x={x} y={6} width={tw} height={38} rx={7} fill={tint(colourOf(l), 0.78)} stroke={shade(colourOf(l), 0.1)} strokeWidth={1.5} />
      <text x={x + tw / 2} y={35} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={C.ink}>{l}</text>
    </g>
  );
  const base = Math.min(h - 9, 74);
  if (apart) return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      {apart.map((l, k) => {
        const cx = w - 60 - (apart!.length - 1 - k) * 100;
        return (
          <g key={"a" + k}>
            {tile(l, cx - 17, 34, "t" + k)}
            {barredApart
              ? <rect x={cx - 18} y={base - 14} width={36} height={6} rx={3} fill={AMBER} />
              : <text x={cx} y={base} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={inkOf(l)}>{indian(VAL[l])}</text>}
          </g>
        );
      })}
    </g>
  );
  const tw = Math.min(30, (w - 24) / word.length - 3), pitch = tw + 3, x0 = w - 12 - (word.length * pitch - 3);
  const tx = (i: number) => x0 + i * pitch;
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      {word.split("").map((l, i) => tile(l, tx(i), tw, "t" + i))}
      {word.split("").map((l, i) => (VAL[l] < (VAL[word[i + 1]] || 0)
        ? <rect key={"r" + i} x={tx(i) - 3} y={3} width={pitch + tw + 6} height={44} rx={9} fill="none" stroke={AMBER} strokeWidth={3} /> : null))}
      <text x={w - 12} y={base} textAnchor="end" fontSize={T.micro} fontWeight={700} fill={inkOf("I")}>{eq}</text>
    </g>
  );
}

function RomanWorkshop(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, fitHost: () => null }} />
  );
}

export default RomanWorkshop;
