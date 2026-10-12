/* ═══ M2.S3.T5.C16.2D1 · code_wheel · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists: header + its three controls, canvas, slot + pad, bubble + mascot,
   phase dots (user / AI mode), window.toolApi, sounds, the synced voice, scoring, the events,
   idle and restart. NO imports in this file; only the five host hooks. Follow docs/LAYOUT.md. */

const TOOL_ID = "code_wheel";
const MEDIA_ID = "M2.S3.T5.C16.2D1";
const TOOL_NAME = "Code Wheel";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
const VOICE = {"rate":0.92,"pitch":1.06};

/* spoken before phase 1's teach lines only */
const OPENING = ["Here is a code wheel. Every letter on it has a partner."];
/* the whole-tool line: spoken on the summary page */
const FINISH_LINE = "Words written in code and read back out, and every key named.";
/* said when the child opens Free play from the summary page */
const FREE_LINE = "Free play. Turn the ring to any key, then tap the letters.";

/* Hindi and Gujarati, keyed by the English line exactly (runtime r21: `lineFor(line, lang, TR)`); the English
   above and below stays what the checks read. Terms (one word each): key कुंजी / ચાવી, code कोड / સંકેત,
   letter अक्षर / અક્ષર, band पट्टी / પટ્ટી, ring छल्ला / રિંગ, places on स्थान आगे / સ્થાન આગળ, partner
   जोड़ीदार / જોડીદાર, row पंक्ति / હાર. Digits stay digits: the runtime speaks them in the language in use.
   A first draft; wants a native speaker's read. */
const TR: any = {
  hi: {
    "Code Wheel": "कोड चक्र",
    "Here is a code wheel. Every letter on it has a partner.": "यह एक कोड चक्र है। इस पर हर अक्षर का एक जोड़ीदार है।",
    "Words written in code and read back out, and every key named.": "शब्द कोड में लिखे और वापस पढ़े, और हर कुंजी बताई।",
    "Free play. Turn the ring to any key, then tap the letters.": "मुक्त खेल। छल्ले को किसी भी कुंजी पर घुमाओ, फिर अक्षरों पर टैप करो।",
    "A key says what each letter stands for": "कुंजी बताती है कि हर अक्षर क्या दर्शाता है",
    "The band round the wheel gives each letter a number.": "चक्र के चारों ओर की पट्टी हर अक्षर को एक संख्या देती है।",
    "Only some numbers are marked. Count round from one of them.": "कुछ ही संख्याएँ लिखी हैं। उनमें से किसी एक से चक्र पर गिनते जाओ।",
    "Which letter does the band start at?": "पट्टी किस अक्षर से शुरू होती है?",
    "Count on from the nearest marked number.": "सबसे पास की लिखी संख्या से आगे गिनो।",
    "A key gives every letter its own number, from A as one up to Z as twenty-six.": "कुंजी हर अक्षर को उसकी अपनी संख्या देती है। A को 1 से लेकर Z को 26 तक।",
    "You learned: a key gives every letter its own number.": "तुमने सीखा: कुंजी हर अक्षर को उसकी अपनी संख्या देती है।",
    "With A as 1, B as 2 and so on up to Z as 26, write the word KITE in code.": "A को 1, B को 2 और इसी तरह Z को 26 मानो। शब्द KITE को कोड में लिखो।",
    "KITE in code": "KITE का कोड",
    "A is one, not nothing. Start your counting there.": "A की संख्या एक है, शून्य नहीं। वहीं से गिनना शुरू करो।",
    "The same band, the same way round. Write the word SUN in code.": "वही पट्टी, उसी दिशा में। शब्द SUN को कोड में लिखो।",
    "SUN in code": "SUN का कोड",
    "S sits far round the ring. Keep going past the middle.": "S चक्र पर काफ़ी आगे है। बीच से आगे तक गिनते जाओ।",
    "A key swaps A with Z, B with Y, C with X, and so on. Write the word FLY in this code.": "एक कुंजी अक्षरों की अदला-बदली करती है। A को Z से, B को Y से, C को X से, और इसी तरह आगे। इस कोड में शब्द FLY लिखो।",
    "FLY in code": "FLY का कोड",
    "A pairs with Z. Which letter pairs with F?": "A का जोड़ीदार Z है। F का जोड़ीदार कौन सा अक्षर है?",
    "Moving each letter along": "हर अक्षर को आगे बढ़ाना",
    "Now the inner ring joins in.": "अब अंदर का छल्ला भी साथ आता है।",
    "Turn it on, and every letter finds a new partner.": "इसे आगे घुमाओ, और हर अक्षर को नया जोड़ीदार मिल जाता है।",
    "What comes after Z on the ring?": "छल्ले पर Z के बाद क्या आता है?",
    "Turn one place at a time and count the turns.": "एक-एक स्थान घुमाओ और घुमाव गिनो।",
    "Every letter moved the same number of places, and past Z the ring came round to A.": "हर अक्षर उतने ही स्थान आगे गया। Z के बाद छल्ला घूमकर A पर आ गया।",
    "You learned: a key moves every letter on, and Z comes round to A.": "तुमने सीखा: कुंजी हर अक्षर को आगे ले जाती है, Z के बाद A आता है।",
    "A key moves every letter three places on, so A becomes D. Write the word ZOO in this code.": "एक कुंजी हर अक्षर को तीन स्थान आगे ले जाती है। इसलिए A से D बनता है। इस कोड में शब्द ZOO लिखो।",
    "ZOO in code": "ZOO का कोड",
    "Z has nowhere left to go. Where does the ring take it?": "Z के आगे कोई जगह नहीं बची। छल्ला उसे कहाँ ले जाता है?",
    "This key moves every letter four places on. Write the word PEN in this code.": "यह कुंजी हर अक्षर को चार स्थान आगे ले जाती है। इस कोड में शब्द PEN लिखो।",
    "PEN in code": "PEN का कोड",
    "Count the places you turn, not the letter you set off from.": "जितने स्थान घुमाए, उन्हें गिनो, जिस अक्षर से चले उसे नहीं।",
    "Back to three places on. Write the word YES in this code.": "फिर तीन स्थान आगे। इस कोड में शब्द YES लिखो।",
    "YES in code": "YES का कोड",
    "Y is near the end. Follow it past the tick.": "Y अंत के पास है। उसे निशान के आगे तक ले जाओ।",
    "Decoding means undoing the key": "कोड खोलने का मतलब है कुंजी को उलटना",
    "The message came in code.": "संदेश कोड में आया है।",
    "Turn the ring the other way to send each letter home.": "हर अक्षर को घर भेजने के लिए छल्ले को उलटी ओर घुमाओ।",
    "Did the key move the letters on, or back?": "क्या कुंजी ने अक्षरों को आगे बढ़ाया था, या पीछे?",
    "Turn the other way and count the turns again.": "उलटी ओर घुमाओ और घुमाव फिर से गिनो।",
    "Undoing the key took every letter home, round from Z when it passed A.": "कुंजी उलटने से हर अक्षर घर लौट आया। A के पार जाने पर वह Z से घूमकर आया।",
    "You learned: to decode, move every letter back by the key.": "तुमने सीखा: कोड खोलने के लिए अक्षर को कुंजी जितना पीछे ले जाओ।",
    "A key moved every letter three places on. The code reads F D N H. What was the word?": "एक कुंजी ने हर अक्षर को तीन स्थान आगे किया था। कोड F D N H है। शब्द क्या था?",
    "The word?": "शब्द?",
    "The key pushed the letters on. Pull them back now.": "कुंजी ने अक्षरों को आगे धकेला था। अब उन्हें पीछे खींचो।",
    "This key moved every letter four places on. The code reads F S S O. Which word was hidden?": "इस कुंजी ने हर अक्षर को चार स्थान आगे किया था। कोड F S S O है। कौन सा शब्द छिपा था?",
    "Which word?": "कौन सा शब्द?",
    "Turn the ring back four places before you tap.": "टैप करने से पहले छल्ले को चार स्थान पीछे घुमाओ।",
    "The key here moved letters five places on. The code reads D F P. Find the word.": "यहाँ कुंजी ने अक्षरों को पाँच स्थान आगे किया था। कोड D F P है। शब्द ढूँढो।",
    "What was it?": "वह क्या था?",
    "Going back past A does not stop. It carries on from Z.": "A के पार पीछे जाने पर रुकना नहीं है। गिनती Z से आगे चलती है।",
    "Without the key the code stays locked": "कुंजी के बिना कोड बंद रहता है",
    "This time the key is hidden.": "इस बार कुंजी छिपी है।",
    "Try one key, then another, and read what each one gives.": "एक कुंजी आज़माओ, फिर दूसरी, और देखो हर एक क्या देती है।",
    "Could another key read it too?": "क्या कोई दूसरी कुंजी भी इसे पढ़ सकती है?",
    "Write out what each key gives, then look again.": "हर कुंजी जो देती है उसे लिखो, फिर दोबारा देखो।",
    "Without the key the same code reads more than one way, so the key must be told.": "कुंजी के बिना एक ही कोड कई तरह से पढ़ा जा सकता है। इसलिए कुंजी बतानी ज़रूरी है।",
    "You learned: without the key a code can be read more than one way.": "तुमने सीखा: कुंजी के बिना कोड कई तरह से पढ़ा जा सकता है।",
    "A friend sends the code 4 15 7 with no key. Read it with A as 1, and then with A as 26 and Z as 1. Can you be sure what it says?": "एक दोस्त ने बिना कुंजी के कोड 4, 15 और 7 भेजा। इसे पहले A को 1 मानकर पढ़ो, फिर A को 26 और Z को 1 मानकर। क्या तुम पक्का बता सकते हो कि इसमें क्या लिखा है?",
    "Which reading?": "कौन सी पंक्ति?",
    "First row": "पहली",
    "Second row": "दूसरी",
    "Cannot be sure": "पक्का नहीं",
    "Read it once each way. Do both readings make sense?": "इसे दोनों तरह से एक-एक बार पढ़ो। क्या दोनों नतीजों का कोई अर्थ निकलता है?",
    "The code K D W was made by moving every letter the same number of places on, but the key is lost. Try a key, then try another. Can you be sure which reading was meant?": "कोड K D W हर अक्षर को बराबर स्थान आगे बढ़ाकर बना था। पर कुंजी खो गई है। एक कुंजी आज़माओ, फिर दूसरी। क्या तुम पक्का बता सकते हो कि असली शब्द कौन सा था?",
    "Which one?": "कौन सी पंक्ति?",
    "Top row": "ऊपर वाली",
    "Next row": "अगली",
    "Two keys, two readings. Does the code itself choose?": "दो कुंजियाँ, दो अलग नतीजे। क्या कोड खुद चुनता है?",
    "Make a key that moves every letter six places on, and write the word ANT in it. What must a friend be told before they can read it?": "ऐसी कुंजी बनाओ जो हर अक्षर को छह स्थान आगे ले जाए। उसमें शब्द ANT लिखो। दोस्त को क्या बताना होगा, ताकि वह इसे पढ़ सके?",
    "Tell them what?": "उन्हें क्या बताना है?",
    "The key": "कुंजी",
    "The word": "शब्द",
    "How many letters": "कितने अक्षर",
    "Your friend cannot see your wheel. What do they need?": "तुम्हारा दोस्त तुम्हारा चक्र नहीं देख सकता। उसे क्या चाहिए?",
    /* drawn on the working area */
    "keys tried": "आज़माई कुंजियाँ",
    "letters carried": "बदले हुए अक्षर",
    "no turn yet": "अभी घुमाया नहीं",
    "A is 1": "A = 1",
    "A is 26": "A = 26",
    "places on": "स्थान आगे",
    "places back": "स्थान पीछे",
    "the code reads": "कोड यह है",
    "the word reads": "शब्द यह है",
    "the key": "कुंजी",
    "so": "इसलिए",
    "its number": "उसकी संख्या",
    "swapped": "बदला हुआ",
    "the key you try": "आज़माई जा रही कुंजी",
    "Try this key": "यह कुंजी आज़माओ",
    "turn the ring": "छल्ला घुमाओ",
    "the other way": "उलटी ओर",
  },
  gu: {
    "Code Wheel": "સંકેત ચક્ર",
    "Here is a code wheel. Every letter on it has a partner.": "આ એક સંકેત ચક્ર છે. તેના દરેક અક્ષરનો એક જોડીદાર છે.",
    "Words written in code and read back out, and every key named.": "શબ્દો સંકેતમાં લખ્યા અને પાછા વાંચ્યા, અને દરેક ચાવી જણાવી.",
    "Free play. Turn the ring to any key, then tap the letters.": "મુક્ત રમત. રિંગને કોઈ પણ ચાવી પર ફેરવો, પછી અક્ષરો પર ટૅપ કરો.",
    "A key says what each letter stands for": "ચાવી કહે છે કે દરેક અક્ષર શું દર્શાવે છે",
    "The band round the wheel gives each letter a number.": "ચક્રની આસપાસની પટ્ટી દરેક અક્ષરને એક સંખ્યા આપે છે.",
    "Only some numbers are marked. Count round from one of them.": "થોડી જ સંખ્યાઓ લખેલી છે. તેમાંથી એકથી ચક્ર પર ગણતા જાઓ.",
    "Which letter does the band start at?": "પટ્ટી કયા અક્ષરથી શરૂ થાય છે?",
    "Count on from the nearest marked number.": "સૌથી નજીકની લખેલી સંખ્યાથી આગળ ગણો.",
    "A key gives every letter its own number, from A as one up to Z as twenty-six.": "ચાવી દરેક અક્ષરને તેની પોતાની સંખ્યા આપે છે. A ને 1 થી Z ને 26 સુધી.",
    "You learned: a key gives every letter its own number.": "તમે શીખ્યા: ચાવી દરેક અક્ષરને તેની પોતાની સંખ્યા આપે છે.",
    "With A as 1, B as 2 and so on up to Z as 26, write the word KITE in code.": "A ને 1, B ને 2 અને એમ Z ને 26 માનો. શબ્દ KITE ને સંકેતમાં લખો.",
    "KITE in code": "KITE નો સંકેત",
    "A is one, not nothing. Start your counting there.": "A એક છે, શૂન્ય નથી. ત્યાંથી ગણવાનું શરૂ કરો.",
    "The same band, the same way round. Write the word SUN in code.": "એ જ પટ્ટી, એ જ દિશામાં. શબ્દ SUN ને સંકેતમાં લખો.",
    "SUN in code": "SUN નો સંકેત",
    "S sits far round the ring. Keep going past the middle.": "S ચક્ર પર ઘણો આગળ છે. વચ્ચેથી આગળ સુધી ગણતા જાઓ.",
    "A key swaps A with Z, B with Y, C with X, and so on. Write the word FLY in this code.": "એક ચાવી અક્ષરોની અદલાબદલી કરે છે. A ને Z થી, B ને Y થી, C ને X થી, અને એમ આગળ પણ. આ સંકેતમાં શબ્દ FLY લખો.",
    "FLY in code": "FLY નો સંકેત",
    "A pairs with Z. Which letter pairs with F?": "A નો જોડીદાર Z છે. F નો જોડીદાર કયો અક્ષર છે?",
    "Moving each letter along": "દરેક અક્ષરને આગળ ખસેડવો",
    "Now the inner ring joins in.": "હવે અંદરની રિંગ પણ જોડાય છે.",
    "Turn it on, and every letter finds a new partner.": "તેને આગળ ફેરવો, અને દરેક અક્ષરને નવો જોડીદાર મળે છે.",
    "What comes after Z on the ring?": "રિંગ પર Z પછી શું આવે છે?",
    "Turn one place at a time and count the turns.": "એક એક સ્થાન ફેરવો અને ફેરા ગણો.",
    "Every letter moved the same number of places, and past Z the ring came round to A.": "દરેક અક્ષર એટલા જ સ્થાન આગળ ગયો. Z પછી રિંગ ફરીને A પર આવી.",
    "You learned: a key moves every letter on, and Z comes round to A.": "તમે શીખ્યા: ચાવી દરેક અક્ષરને આગળ લઈ જાય છે, Z પછી A આવે છે.",
    "A key moves every letter three places on, so A becomes D. Write the word ZOO in this code.": "એક ચાવી દરેક અક્ષરને ત્રણ સ્થાન આગળ લઈ જાય છે. તેથી A નો D બને છે. આ સંકેતમાં શબ્દ ZOO લખો.",
    "ZOO in code": "ZOO નો સંકેત",
    "Z has nowhere left to go. Where does the ring take it?": "Z ની આગળ કોઈ જગ્યા બચી નથી. રિંગ તેને ક્યાં લઈ જાય છે?",
    "This key moves every letter four places on. Write the word PEN in this code.": "આ ચાવી દરેક અક્ષરને ચાર સ્થાન આગળ લઈ જાય છે. આ સંકેતમાં શબ્દ PEN લખો.",
    "PEN in code": "PEN નો સંકેત",
    "Count the places you turn, not the letter you set off from.": "જેટલા સ્થાન ફેરવ્યા તે ગણો, જે અક્ષરથી શરૂ કર્યું તે નહીં.",
    "Back to three places on. Write the word YES in this code.": "ફરી ત્રણ સ્થાન આગળ. આ સંકેતમાં શબ્દ YES લખો.",
    "YES in code": "YES નો સંકેત",
    "Y is near the end. Follow it past the tick.": "Y અંતની નજીક છે. તેને નિશાનની આગળ સુધી લઈ જાઓ.",
    "Decoding means undoing the key": "સંકેત ખોલવાનો અર્થ ચાવીને ઉલટાવવી",
    "The message came in code.": "સંદેશ સંકેતમાં આવ્યો છે.",
    "Turn the ring the other way to send each letter home.": "દરેક અક્ષરને ઘરે મોકલવા રિંગને ઉલટી તરફ ફેરવો.",
    "Did the key move the letters on, or back?": "શું ચાવીએ અક્ષરોને આગળ ખસેડ્યા હતા, કે પાછળ?",
    "Turn the other way and count the turns again.": "ઉલટી તરફ ફેરવો અને ફેરા ફરી ગણો.",
    "Undoing the key took every letter home, round from Z when it passed A.": "ચાવી ઉલટાવતાં દરેક અક્ષર ઘરે પાછો આવ્યો. A ની પાર જતાં તે Z થી ફરીને આવ્યો.",
    "You learned: to decode, move every letter back by the key.": "તમે શીખ્યા: સંકેત ખોલવા દરેક અક્ષરને ચાવી જેટલો પાછળ લઈ જાઓ.",
    "A key moved every letter three places on. The code reads F D N H. What was the word?": "એક ચાવીએ દરેક અક્ષરને ત્રણ સ્થાન આગળ ખસેડ્યો હતો. સંકેત F D N H છે. શબ્દ શું હતો?",
    "The word?": "શબ્દ?",
    "The key pushed the letters on. Pull them back now.": "ચાવીએ અક્ષરોને આગળ ધકેલ્યા હતા. હવે તેમને પાછા ખેંચો.",
    "This key moved every letter four places on. The code reads F S S O. Which word was hidden?": "આ ચાવીએ દરેક અક્ષરને ચાર સ્થાન આગળ ખસેડ્યો હતો. સંકેત F S S O છે. કયો શબ્દ છુપાયેલો હતો?",
    "Which word?": "કયો શબ્દ?",
    "Turn the ring back four places before you tap.": "ટૅપ કરતાં પહેલાં રિંગને ચાર સ્થાન પાછળ ફેરવો.",
    "The key here moved letters five places on. The code reads D F P. Find the word.": "અહીં ચાવીએ અક્ષરોને પાંચ સ્થાન આગળ ખસેડ્યા હતા. સંકેત D F P છે. શબ્દ શોધો.",
    "What was it?": "તે શું હતું?",
    "Going back past A does not stop. It carries on from Z.": "A ની પાર પાછળ જતાં અટકવાનું નથી. ગણતરી Z થી આગળ ચાલે છે.",
    "Without the key the code stays locked": "ચાવી વગર સંકેત બંધ રહે છે",
    "This time the key is hidden.": "આ વખતે ચાવી છુપાયેલી છે.",
    "Try one key, then another, and read what each one gives.": "એક ચાવી અજમાવો, પછી બીજી, અને જુઓ દરેક શું આપે છે.",
    "Could another key read it too?": "શું બીજી ચાવી પણ તેને વાંચી શકે?",
    "Write out what each key gives, then look again.": "દરેક ચાવી જે આપે તે લખો, પછી ફરી જુઓ.",
    "Without the key the same code reads more than one way, so the key must be told.": "ચાવી વગર એક જ સંકેત અનેક રીતે વંચાય છે. તેથી ચાવી જણાવવી જરૂરી છે.",
    "You learned: without the key a code can be read more than one way.": "તમે શીખ્યા: ચાવી વગર સંકેત ઘણી રીતે વંચાય છે.",
    "A friend sends the code 4 15 7 with no key. Read it with A as 1, and then with A as 26 and Z as 1. Can you be sure what it says?": "એક મિત્રએ ચાવી વગર સંકેત 4, 15 અને 7 મોકલ્યો. પહેલાં A ને 1 માનીને વાંચો, પછી A ને 26 અને Z ને 1 માનીને. શું તમે પાકું કહી શકો કે તેમાં શું લખ્યું છે?",
    "Which reading?": "કઈ હાર?",
    "First row": "પહેલી હાર",
    "Second row": "બીજી હાર",
    "Cannot be sure": "પાકું નહીં",
    "Read it once each way. Do both readings make sense?": "તેને બંને રીતે એક એક વાર વાંચો. શું બંને પરિણામનો કોઈ અર્થ નીકળે છે?",
    "The code K D W was made by moving every letter the same number of places on, but the key is lost. Try a key, then try another. Can you be sure which reading was meant?": "સંકેત K D W દરેક અક્ષરને સરખા સ્થાન આગળ ખસેડીને બન્યો હતો. પણ ચાવી ખોવાઈ ગઈ છે. એક ચાવી અજમાવો, પછી બીજી. શું તમે પાકું કહી શકો કે અસલી શબ્દ કયો હતો?",
    "Which one?": "કયો?",
    "Top row": "ઉપરની હાર",
    "Next row": "પછીની હાર",
    "Two keys, two readings. Does the code itself choose?": "બે ચાવી, બે અલગ પરિણામ. શું સંકેત પોતે પસંદ કરે છે?",
    "Make a key that moves every letter six places on, and write the word ANT in it. What must a friend be told before they can read it?": "એવી ચાવી બનાવો જે દરેક અક્ષરને છ સ્થાન આગળ લઈ જાય. તેમાં શબ્દ ANT લખો. મિત્રને શું જણાવવું પડશે, જેથી તે તેને વાંચી શકે?",
    "Tell them what?": "તેમને શું જણાવવું?",
    "The key": "ચાવી",
    "The word": "શબ્દ",
    "How many letters": "કેટલા અક્ષર",
    "Your friend cannot see your wheel. What do they need?": "તમારો મિત્ર તમારું ચક્ર જોઈ શકતો નથી. તેને શું જોઈએ?",
    /* drawn on the working area */
    "keys tried": "અજમાવેલી ચાવી",
    "letters carried": "બદલેલા અક્ષર",
    "no turn yet": "હજી ફેરવ્યું નથી",
    "A is 1": "A = 1",
    "A is 26": "A = 26",
    "places on": "સ્થાન આગળ",
    "places back": "સ્થાન પાછળ",
    "the code reads": "સંકેત આ છે",
    "the word reads": "શબ્દ આ છે",
    "the key": "ચાવી",
    "so": "તેથી",
    "its number": "તેની સંખ્યા",
    "swapped": "બદલાયેલ",
    "the key you try": "અજમાવાતી ચાવી",
    "Try this key": "આ ચાવી અજમાવો",
    "turn the ring": "રિંગ ફેરવો",
    "the other way": "ઉલટી તરફ",
  },
};

const PHASES = [
  {
    n: 1,
    concept: "A key says what each letter stands for",
    conceptId: "M2.S3.T5.C16", objectiveIds: ["O7"],
    says: ["The band round the wheel gives each letter a number.",
      "Only some numbers are marked. Count round from one of them."],
    ladder: ["Which letter does the band start at?", "Count on from the nearest marked number."],
    closing: "A key gives every letter its own number, from A as one up to Z as twenty-six.",
    learned: "You learned: a key gives every letter its own number.",
    traceback: "the band counts round from A to each letter of the word, and the whole code is written out",
    items: [
      /* learn ML1: answer in the plan = 11 9 20 5 */
      { qid: "M2.S3.T5.C16:ML1", kind: "num", word: "KITE", pad: "enter", winMs: 2600,
        say: "With A as 1, B as 2 and so on up to Z as 26, write the word KITE in code.",
        ask: "KITE in code", answer: "11 9 20 5",
        miss: "A is one, not nothing. Start your counting there." },
      /* practice 1: answer in the plan = 19 21 14 */
      { qid: "M2.S3.T5.C16:1", kind: "num", word: "SUN", pad: "enter", winMs: 2600,
        say: "The same band, the same way round. Write the word SUN in code.",
        ask: "SUN in code", answer: "19 21 14",
        miss: "S sits far round the ring. Keep going past the middle." },
      /* practice 2: answer in the plan = U O B */
      { qid: "M2.S3.T5.C16:2", kind: "pick", word: "FLY", swap: true, winMs: 3000,
        say: "A key swaps A with Z, B with Y, C with X, and so on. Write the word FLY in this code.",
        ask: "FLY in code", answer: "uob",
        choices: [{ id: "uob", label: "U O B" }, { id: "vpc", label: "V P C" },
          { id: "tna", label: "T N A" }, { id: "uoy", label: "U O Y" }],
        miss: "A pairs with Z. Which letter pairs with F?" },
    ],
  },
  {
    n: 2,
    concept: "Moving each letter along",
    conceptId: "M2.S3.T5.C17", objectiveIds: ["O7"],
    says: ["Now the inner ring joins in.", "Turn it on, and every letter finds a new partner."],
    ladder: ["What comes after Z on the ring?", "Turn one place at a time and count the turns."],
    closing: "Every letter moved the same number of places, and past Z the ring came round to A.",
    learned: "You learned: a key moves every letter on, and Z comes round to A.",
    traceback: "the ring turns to the key one place at a time and each letter is carried round to its partner",
    items: [
      /* learn ML2: answer in the plan = C R R */
      { qid: "M2.S3.T5.C17:ML2", kind: "code", word: "ZOO", key: 3, pad: "enter", winMs: 3000,
        say: "A key moves every letter three places on, so A becomes D. Write the word ZOO in this code.",
        ask: "ZOO in code", answer: "C R R",
        miss: "Z has nowhere left to go. Where does the ring take it?" },
      /* practice 3: answer in the plan = T I R */
      { qid: "M2.S3.T5.C17:3", kind: "code", word: "PEN", key: 4, pad: "enter", winMs: 2600,
        say: "This key moves every letter four places on. Write the word PEN in this code.",
        ask: "PEN in code", answer: "T I R",
        miss: "Count the places you turn, not the letter you set off from." },
      /* practice 4: answer in the plan = B H V, because Y goes round past Z to B */
      { qid: "M2.S3.T5.C17:4", kind: "code", word: "YES", key: 3, pad: "enter", winMs: 3000,
        say: "Back to three places on. Write the word YES in this code.",
        ask: "YES in code", answer: "B H V",
        miss: "Y is near the end. Follow it past the tick." },
    ],
  },
  {
    n: 3,
    concept: "Decoding means undoing the key",
    conceptId: "M2.S3.T5.C18", objectiveIds: ["O8"],
    says: ["The message came in code.", "Turn the ring the other way to send each letter home."],
    ladder: ["Did the key move the letters on, or back?", "Turn the other way and count the turns again."],
    closing: "Undoing the key took every letter home, round from Z when it passed A.",
    learned: "You learned: to decode, move every letter back by the key.",
    traceback: "the ring turns back by the key and each coded letter is carried home, round from Z past A",
    items: [
      /* learn ML3: answer in the plan = CAKE */
      { qid: "M2.S3.T5.C18:ML3", kind: "decode", code: "FDNH", key: 3, pad: "enter", winMs: 3200,
        say: "A key moved every letter three places on. The code reads F D N H. What was the word?",
        ask: "The word?", answer: "CAKE",
        miss: "The key pushed the letters on. Pull them back now." },
      /* practice 5: answer in the plan = BOOK */
      { qid: "M2.S3.T5.C18:5", kind: "decode", code: "FSSO", key: 4, pad: "enter", winMs: 3200,
        say: "This key moved every letter four places on. The code reads F S S O. Which word was hidden?",
        ask: "Which word?", answer: "BOOK",
        miss: "Turn the ring back four places before you tap." },
      /* practice 6: answer in the plan = YAK, because D goes back five places, past A and round from Z, to Y */
      { qid: "M2.S3.T5.C18:6", kind: "decode", code: "DFP", key: 5, pad: "enter", winMs: 3200,
        say: "The key here moved letters five places on. The code reads D F P. Find the word.",
        ask: "What was it?", answer: "YAK",
        miss: "Going back past A does not stop. It carries on from Z." },
    ],
  },
  {
    n: 4,
    concept: "Without the key the code stays locked",
    conceptId: "M2.S3.T5.C19", objectiveIds: ["O8"],
    says: ["This time the key is hidden.", "Try one key, then another, and read what each one gives."],
    ladder: ["Could another key read it too?", "Write out what each key gives, then look again."],
    closing: "Without the key the same code reads more than one way, so the key must be told.",
    learned: "You learned: without the key a code can be read more than one way.",
    traceback: "each key is tried in a row of its own and the readings stand side by side, none of them marked",
    items: [
      /* learn ML4: answer in the plan = With A as 1 it reads DOG, and with A as 26 it reads W L T.
         Without the key you cannot be sure which was meant */
      { qid: "M2.S3.T5.C19:ML4", kind: "trial", nums: [4, 15, 7], band: true, winMs: 3400,
        say: "A friend sends the code 4 15 7 with no key. Read it with A as 1, and then with A as 26 and Z as 1. Can you be sure what it says?",
        ask: "Which reading?", answer: "unsure",
        choices: [{ id: "first", label: "First row" }, { id: "second", label: "Second row" },
          { id: "unsure", label: "Cannot be sure" }],
        miss: "Read it once each way. Do both readings make sense?" },
      /* practice 7: answer in the plan = Not for certain. HAT is the only reading that makes a word,
         but only the key can settle it, because another key could hide another word */
      { qid: "M2.S3.T5.C19:7", kind: "trial", code: "KDW", winMs: 3400,
        say: "The code K D W was made by moving every letter the same number of places on, but the key is lost. Try a key, then try another. Can you be sure which reading was meant?",
        ask: "Which one?", answer: "unsure",
        choices: [{ id: "top", label: "Top row" }, { id: "next", label: "Next row" },
          { id: "unsure", label: "Cannot be sure" }],
        miss: "Two keys, two readings. Does the code itself choose?" },
      /* practice 8: answer in the plan = G T Z, and the friend must be told the key, six places on,
         so they can move each letter six places back */
      { qid: "M2.S3.T5.C19:8", kind: "make", word: "ANT", key: 6, winMs: 3400,
        say: "Make a key that moves every letter six places on, and write the word ANT in it. What must a friend be told before they can read it?",
        ask: "Tell them what?", answer: "thekey",
        choices: [{ id: "thekey", label: "The key" }, { id: "theword", label: "The word" },
          { id: "howmany", label: "How many letters" }],
        miss: "Your friend cannot see your wheel. What do they need?" },
    ],
  },
];

/* ── the alphabet round a circle ─────────────────────────────────────────────────────────── */
const ALPHA = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const placeOf = (ch: any) => ALPHA.indexOf(String(ch).toUpperCase()) + 1;      /* A = 1 */
const letterAt = (p: number) => ALPHA[(((p - 1) % 26) + 26) % 26];
const carried = (ch: any, k: number) => letterAt(placeOf(ch) + k);
/* the landmark places the band prints (every fifth letter, and A) */
const MARKS = [1, 5, 10, 15, 20, 25];

/* The numbers, rows, sizes and targets the working area needs (they go into the sidecar too). */
const MODEL = {
  alphabet: ALPHA,
  bandMarks: MARKS,
  /* the band and the inner ring are never on the wheel together, so each key kind has room */
  wheel: { cx: 216, cy: 206, rim: 206, hub: 94,
    band: { edge: 178, num: 192, letter: 142, arc: 178 },
    shift: { edge: 155, letter: 180, inner: 126, arc: 155 } },
  strip: { x: 0, y: 424, w: 1086, h: 100, card: { w: 200, h: 100, gap: 24 } },
  panel: { x: 448, y: 16, w: 632, h: 184 },
  rows: { x: 448, y: 214, w: 632, h: 190 },
  turns: { back: 600, on: 744, y: 268 },
  locked: { key: { x: 448, y: 16, w: 288, h: 84 }, tryKey: { x: 760, y: 16, w: 320, h: 84 }, back: 520, on: 640, flip: 760, y: 142 },
};
const GEO = MODEL.wheel;

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

const tidy = (v: any) => String(v ?? "").trim().toUpperCase().replace(/\s+/g, " ");
const squash = (v: any) => tidy(v).replace(/ /g, "");

/* judge: is this value right for this item? */
const judge = (item: any, v: any) => {
  if (item.choices) return String(v ?? "").trim().toLowerCase() === String(item.answer).trim().toLowerCase();
  if (item.kind === "num") return tidy(v) === tidy(item.answer);
  return squash(v) === squash(item.answer);
};

/* oracle: every answer re-derived by a second route (character codes and modular arithmetic),
   sharing no code with judge or with the working area */
const oracle = () => {
  const up = (s: any) => String(s).toUpperCase();
  const code = (ch: string) => ch.charCodeAt(0) - 64;                       /* A = 1 */
  const chr = (p: number) => String.fromCharCode(65 + (((p - 1) % 26) + 26) % 26);
  const same = (a: any, b: any) => up(a).replace(/\s+/g, "") === up(b).replace(/\s+/g, "");
  let fine = true;
  for (const p of PHASES) for (const it of p.items) {
    if (it.kind === "num") {
      fine = fine && same(up(it.word).split("").map((c: string) => code(c)).join(""), String(it.answer).replace(/\s+/g, ""));
    } else if (it.kind === "pick") {
      const want = up(it.word).split("").map((c: string) => chr(27 - code(c))).join("");
      const got = it.choices.filter((c: any) => c.id === it.answer);
      fine = fine && got.length === 1 && same(got[0].label, want);
    } else if (it.kind === "code") {
      fine = fine && same(up(it.word).split("").map((c: string) => chr(code(c) + it.key)).join(""), it.answer);
    } else if (it.kind === "decode") {
      fine = fine && same(up(it.code).split("").map((c: string) => chr(code(c) - it.key)).join(""), it.answer);
    } else if (it.kind === "trial") {
      /* two honest keys give two different readings, so no reading can be certain */
      const a = it.nums ? it.nums.map((x: number) => chr(x)).join("") : up(it.code).split("").map((c: string) => chr(code(c) - 3)).join("");
      const b = it.nums ? it.nums.map((x: number) => chr(27 - x)).join("") : up(it.code).split("").map((c: string) => chr(code(c) - 1)).join("");
      fine = fine && a !== b && it.answer === "unsure";
    } else if (it.kind === "make") {
      /* the code alone does not name its key: another key reads it as another string */
      const made = up(it.word).split("").map((c: string) => chr(code(c) + it.key)).join("");
      const other = made.split("").map((c: string) => chr(code(c) - (it.key - 1))).join("");
      fine = fine && made !== up(it.word) && other !== up(it.word) && it.answer === "thekey";
    }
    if (it.choices) fine = fine && it.choices.filter((c: any) => c.id === it.answer).length === 1;
  }
  return fine;
};

/* the most likely wrong answer (the misconception); judge must reject it */
const nearMiss = (item: any) => {
  if (item.choices) return (item.choices.filter((c: any) => c.id !== item.answer)[0] || {}).id || "~";
  if (item.kind === "num") return String(item.word).split("").map((c: string) => placeOf(c) - 1).join(" ");
  if (item.kind === "decode") return String(item.code).split("").map((c: string) => carried(c, item.key)).join(" ");
  return String(item.word).split("").map((c: string) => carried(c, item.key - 1)).join(" ");
};

/* the forms of an answer that no question, hint or ladder line may print */
const answerForms = (item: any) => {
  const a = String(item.answer);
  if (item.choices || item.kind === "num") return [a];
  const tight = a.replace(/\s+/g, "");
  return [a, tight, tight.split("").join(" ")];
};

/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => item.answer;

/* choice ids never show in the slot: the slot prints the word the child pressed */
const CHOICE_LABEL: any = {};
PHASES.forEach((p: any) => p.items.forEach((it: any) => (it.choices || []).forEach((c: any) => { CHOICE_LABEL[c.id] = c.label; })));
const format = (v: any) => CHOICE_LABEL[String(v)] || String(v ?? "");

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => { if (HOOK.set && !item.choices) HOOK.set(item, item.answer); T.submit(item.answer); };
/* the agent's answer() for an item made on the working area; undefined = let the runtime type it */
const answer = (item: any, v: any) => (item.choices || !HOOK.set ? undefined : HOOK.set(item, v));
/* the agent's check() before Enter; undefined = press Enter */
const check = (item: any) => (item && item.choices ? undefined : HOOK.check ? HOOK.check() : undefined);

/* ── the working area: 1086 x 528, origin at its top-left ────────────────────────────────── */

/* a point on the wheel: letter index i (A = 0), radius r */
const wheelPt = (i: number, r: number) => {
  const a = ((i / 26) * 360 - 90) * Math.PI / 180;
  return { x: GEO.cx + r * Math.cos(a), y: GEO.cy + r * Math.sin(a) };
};
/* an arc along the wheel from letter i, k places on (k may be negative) */
const wheelArc = (i: number, k: number, r: number) => {
  const a = wheelPt(i, r), b = wheelPt(i + k, r);
  const big = Math.abs(k) > 13 ? 1 : 0;
  return "M " + a.x.toFixed(1) + " " + a.y.toFixed(1) + " A " + r + " " + r + " 0 " + big + " " + (k >= 0 ? 1 : 0) + " " + b.x.toFixed(1) + " " + b.y.toFixed(1);
};

/* what the cards along the strip are given, and what kind of box sits under each */
const givenOf = (it: any) => {
  if (!it) return [];
  if (it.kind === "decode" || (it.kind === "trial" && it.code)) return String(it.code).split("");
  if (it.kind === "trial" && it.nums) return it.nums.map((x: number) => String(x));
  return String(it.word || "").split("");
};
/* the right reading of an item, as one card a letter */
const rightCards = (it: any) => {
  if (!it) return [];
  if (it.kind === "num") return String(it.word).split("").map((c: string) => String(placeOf(c)));
  if (it.kind === "pick") return String(it.word).split("").map((c: string) => letterAt(27 - placeOf(c)));
  if (it.kind === "code" || it.kind === "make") return String(it.word).split("").map((c: string) => carried(c, it.key));
  if (it.kind === "decode") return String(it.code).split("").map((c: string) => carried(c, -it.key));
  return [];
};
/* a letter of the alphabet the message does not use, so the key card never prints an answer */
const sampleOf = (it: any) => {
  const used = givenOf(it).join("") + String((it && it.word) || "");
  for (const ch of ALPHA) if (used.indexOf(ch) < 0) return ch;
  return "A";
};
/* the reading of a locked message under the key now set */
const readingOf = (it: any, turn: number, flip: boolean) => {
  if (it.nums) return it.nums.map((x: number) => letterAt(flip ? 27 - x : x));
  return String(it.code || "").split("").map((c: string) => carried(c, turn));
};
const keyWord = (turn: number) => (turn === 0 ? "no turn yet" : Math.abs(turn) + (turn > 0 ? " on" : " back"));
/* a key label as drawn in the language in use ("3 on" -> "3 स्थान आगे"); the label itself stays English in the state */
const keyShow = (k: string, lang: string, tx: any) => {
  const m = /^(\d+) (on|back)$/.exec(String(k));
  return lang !== "en" && m ? m[1] + " " + tx(m[2] === "on" ? "places on" : "places back") : tx(k);
};

const freshState = (it: any) => ({ turn: 0, flip: false, cells: givenOf(it).map(() => ""), open: -1, buf: "", trials: [], demo: null });

const FREE_ITEM: any = { kind: "code", word: "PLAY", key: 0, pad: "enter", free: true };

/* one card of the message strip: the given letter above, the box the child fills below */
function CardBox({ id, x, y, w, h, given, made, live, onTap, open, holding, C, madeColour }: any) {
  /* while this cell holds the pad, its own Enter must reach the window, or the cell never closes */
  const press = usePress(onTap, live && !holding);
  const bw = Math.min(140, w - 40), bx = x + (w - bw) / 2;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={RAD.panel} fill={tint(C.panel, 0.62)} stroke={C.rule} strokeWidth={2} />
      <text x={x + w / 2} y={y + 42} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={shade(CONTENT.hundred, 0.25)}>{given}</text>
      <rect x={bx} y={y + 54} width={bw} height={h - 68} rx={10} fill="#FFFFFF" stroke={open ? C.accent : C.rule} strokeWidth={open ? 4 : 2} />
      {made ? (
        <text x={x + w / 2} y={y + h - 22} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={madeColour}>{made}</text>
      ) : null}
      <rect className="c4-hit" data-control={id} role="button" tabIndex={0} aria-label={"letter " + given}
        x={x} y={y} width={w} height={h} fill="transparent" {...press.bind()} onKeyDown={press.keys} />
    </g>
  );
}

function Work({ phase, n, item, index, stage, wrong, typed, captured, api, MODEL, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();
  const free = stage === "free";
  const live = free ? FREE_ITEM : item;
  const [st, setSt] = useState<any>(() => freshState(live));
  const stRef = useRef(st); stRef.current = st;
  const liveRef = useRef(live); liveRef.current = live;
  const busy = useRef(false);
  const pend = useRef<any>(null);

  const given = givenOf(live);
  const cells = st.cells.length === given.length ? st.cells : given.map(() => "");
  const madeInk = shade(CONTENT.one, 0.25);
  const stepInk = shade(CONTENT.pointer, 0.25);
  const quietInk = mix(C.ink, C.paper, 0.26);

  /* a fresh question (or Free play): nothing built, the ring at rest */
  useEffect(() => {
    api.capture(null);
    busy.current = false;
    pend.current = null;
    setSt(freshState(liveRef.current));
  }, [item, free]);

  /* what the child has built, as one answer */
  const built = () => {
    const s = stRef.current, it = liveRef.current;
    if (s.cells.some((c: string) => !c)) return "";
    return s.cells.join(" ");
  };

  /* every act of the child's clears the correction layer that stands over the panel */
  const act = (fn: any) => () => {
    if (busy.current) return;
    const s = stRef.current;
    if (s.demo) setSt((o: any) => ({ ...o, demo: null }));
    fn();
  };

  /* the pad, lent to a code box the child has tapped (phase 1) */
  const onKey = (k: string) => {
    const s = stRef.current;
    if (s.open < 0) return;
    if (k === "back") { setSt((o: any) => ({ ...o, buf: o.buf.slice(0, -1) })); return; }
    if (k === "clear") { setSt((o: any) => ({ ...o, buf: "" })); return; }
    if (k === "enter") { closeCell(); return; }
    if (!/^[0-9]$/.test(k)) return;
    api.sfx.tick();
    setSt((o: any) => ({ ...o, buf: o.buf.length >= 2 ? k : o.buf + k }));
  };

  const closeCell = () => {
    const s = stRef.current;
    if (s.open < 0) return;
    const next = s.cells.slice();
    if (s.buf) next[s.open] = String(Number(s.buf));
    let onward = -1;
    for (let d = 1; d <= next.length; d++) { const k = (s.open + d) % next.length; if (!next[k]) { onward = k; break; } }
    if (onward < 0) { api.capture(null); api.setTyped(next.join(" ")); setSt((o: any) => ({ ...o, cells: next, open: -1, buf: "" })); return; }
    api.setTyped(next.filter(Boolean).join(" "));
    setSt((o: any) => ({ ...o, cells: next, open: onward, buf: "" }));
  };

  const openCell = (i: number) => {
    const s = stRef.current;
    setSt((o: any) => ({ ...o, open: i, buf: "" }));
    if (!captured) api.capture(onKey);
    api.sfx.tick();
  };

  /* carry one letter through the ring the child has set */
  const carryOne = (i: number) => {
    const s = stRef.current, it = liveRef.current;
    const next = s.cells.slice();
    next[i] = carried(given[i], s.turn);
    api.sfx.tick();
    setSt((o: any) => ({ ...o, cells: next }));
    if (!it.free) api.setTyped(next.filter(Boolean).join(" "));
  };

  const turnRing = (d: number) => {
    const s = stRef.current;
    const t = Math.max(-25, Math.min(25, s.turn + d));
    if (t === s.turn) return;
    api.sfx.tick();
    if (!liveRef.current.free) api.setTyped("");
    setSt((o: any) => ({ ...o, turn: t, cells: o.cells.map(() => "") }));
  };

  const flipBand = () => { api.sfx.tick(); setSt((o: any) => ({ ...o, flip: !o.flip })); };

  const tryKey = () => {
    const s = stRef.current, it = liveRef.current;
    const label = it.nums ? (s.flip ? "A is 26" : "A is 1") : keyWord(s.turn);
    if (s.trials.length >= 3 || s.trials.some((r: any) => r.key === label)) return;
    api.sfx.tick();
    setSt((o: any) => ({ ...o, trials: o.trials.concat([{ key: label, cards: readingOf(it, o.turn, o.flip) }]) }));
  };

  /* Enter, while the working area owns the answer */
  const sendIt = () => { const v = built(); if (v) api.submit(v); };
  api.onEnter(!free && stage === "ask" && live.pad === "enter" ? sendIt : null);

  /* the agent and the dev driver */
  HOOK.set = (it: any, v: any) => {
    const parts = it.kind === "num" ? String(v).trim().split(/\s+/) : squash(v).split("");
    const turn = it.kind === "decode" ? -it.key : it.key || 0;
    pend.current = String(v);
    api.setTyped(String(v));
    setSt((o: any) => ({ ...o, turn, cells: parts, open: -1, buf: "", demo: null }));
    return true;
  };
  HOOK.check = () => { api.submit(pend.current || built()); return true; };

  /* ── the correction: the maths redrawn, ending on the whole right answer ─────────────── */
  useEffect(() => {
    if (!wrong || stage !== "ask") return;
    const it = liveRef.current;
    api.capture(null);
    api.lock(true);
    busy.current = true;
    const want = rightCards(it);
    const steps: any[] = [];
    const put = (o: any) => setSt((s: any) => ({ ...s, ...o }));
    const grow = (k: number, extra?: any) => steps.push([520, () => put({ demo: Object.assign({ cards: want.slice(0, k + 1), spoke: k, caption: "" }, extra || {}) })]);

    if (it.kind === "num") {
      steps.push([420, () => put({ open: -1, buf: "", demo: { cards: [], spoke: 0, caption: "" } })]);
      want.forEach((_: any, k: number) => grow(k));
    } else if (it.kind === "code" || it.kind === "decode" || it.kind === "make") {
      const target = it.kind === "decode" ? -it.key : it.key;
      const one = target > 0 ? 1 : -1;
      steps.push([320, () => put({ open: -1, cells: givenOf(it).map(() => ""), turn: 0, demo: { cards: [], spoke: null, caption: "" } })]);
      for (let t = 1; t <= Math.abs(target); t++) steps.push([240, () => put({ turn: t * one })]);
      want.forEach((_: any, k: number) => grow(k, { arcs: k + 1, turnTo: target }));
    } else if (it.kind === "pick") {
      steps.push([320, () => put({ demo: { cards: [], spoke: null, caption: "", chords: 0 } })]);
      want.forEach((_: any, k: number) => steps.push([520, () => put({ demo: { cards: want.slice(0, k + 1), spoke: null, caption: "", chords: k + 1 } })]));
    } else {
      const rows = it.nums
        ? [{ key: "A is 1", cards: readingOf(it, 0, false) }, { key: "A is 26", cards: readingOf(it, 0, true) }]
        : [{ key: "3 back", cards: readingOf(it, -3, false) }, { key: "1 back", cards: readingOf(it, -1, false) }];
      steps.push([320, () => put({ demo: { cards: [], spoke: null, caption: "", rows: [] } })]);
      rows.forEach((_: any, k: number) => steps.push([760, () => put({ demo: { cards: [], spoke: null, caption: "", rows: rows.slice(0, k + 1) } })]));
      steps.push([520, () => put({ demo: { cards: [], spoke: null, caption: CHOICE_LABEL[it.answer] || "", rows } })]);
    }
    if (it.kind !== "trial") steps.push([420, () => setSt((s: any) => ({ ...s, demo: Object.assign({}, s.demo, { cards: want, caption: "" }) }))]);
    /* a choice answer made on the working area (the "make" question) still has to be said in full */
    if (it.choices && it.kind !== "trial")
      steps.push([560, () => setSt((s: any) => ({ ...s, demo: Object.assign({}, s.demo, { cards: want, caption: CHOICE_LABEL[it.answer] || "" }) }))]);
    tl.run(steps, () => { api.lock(false); busy.current = false; });
  }, [wrong]);

  /* what the host and the teacher agent read back (toolApi.getState) */
  api.share({
    keyType: live.kind === "num" ? "number band" : live.kind === "pick" ? "swap" : live.nums ? "number band" : "places on",
    places: st.turn, message: given.join(" "), coded: cells.filter(Boolean).join(" "),
    trials: st.trials.map((r: any) => r.key), complete: stage === "idle",
  });

  /* ── the picture ─────────────────────────────────────────────────────────────────────── */
  const showInner = live.kind === "code" || live.kind === "decode" || live.kind === "make" || (live.kind === "trial" && !live.nums) || free;
  const showBand = !showInner;
  const R: any = showBand ? GEO.band : GEO.shift;
  const locked = live.kind === "trial";
  const usesTurn = showInner;
  const demo = st.demo;
  const wonCards = (stage === "win" || stage === "idle") && (live.kind === "pick" || live.kind === "make") ? rightCards(live) : null;

  /* the strip */
  const nCards = given.length;
  const cw = Math.min(MODEL.strip.card.w, (MODEL.strip.w - 40 - (nCards - 1) * MODEL.strip.card.gap) / Math.max(nCards, 1));
  const total = nCards * cw + (nCards - 1) * MODEL.strip.card.gap;
  const x0 = (MODEL.strip.w - total) / 2;
  const cardsLive = !busy.current && (free || stage === "ask") && (live.kind === "num" || live.kind === "code" || live.kind === "decode" || live.kind === "make");

  /* the one thing to touch */
  let invite: any = null;
  if (!busy.current && (stage === "ask" || free) && !demo) {
    if (locked && st.trials.length < 2) invite = { kind: "try" };
    else if (usesTurn && st.turn === 0 && !free) invite = { kind: "turn", x: live.kind === "decode" ? MODEL.turns.back : MODEL.turns.on, y: MODEL.turns.y };
    else if (cardsLive) {
      const k = cells.findIndex((c: string) => !c);
      if (k >= 0) invite = { kind: "card", x: x0 + k * (cw + MODEL.strip.card.gap) + cw / 2, y: MODEL.strip.y + MODEL.strip.h / 2 };
    }
  }

  /* the marked numbers on the band: never the letter the child is working out */
  const hideMark = live.kind === "num" ? String(live.word).toUpperCase() : "";
  const bandNums = MARKS.filter((p) => hideMark.indexOf(letterAt(p)) < 0);

  const counted = locked ? st.trials.length : cells.filter(Boolean).length;
  const countTotal = locked ? 2 : nCards;

  const panel = live.kind === "num" || live.kind === "pick" ? { x: MODEL.panel.x, y: 104, w: MODEL.panel.w, h: MODEL.panel.h } : MODEL.panel;

  const cardRow = (list: any[], bx: number, by: number, bw: number, size: number, fill: string) => {
    const n2 = list.length, w2 = Math.min(104, (bw - (n2 - 1) * 16) / Math.max(n2, 1));
    const t2 = n2 * w2 + (n2 - 1) * 16, sx = bx + (bw - t2) / 2;
    return list.map((v: any, k: number) => (
      <g key={k}>
        <rect x={sx + k * (w2 + 16)} y={by} width={w2} height={size + 20} rx={10} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} />
        <text x={sx + k * (w2 + 16) + w2 / 2} y={by + size + 2} textAnchor="middle" fontSize={size} fontWeight={700} fill={fill}>{v}</text>
      </g>
    ));
  };

  return (
    <g>
      {/* the running count */}
      <g data-zone="runs">
        <text x={4} y={lang === "en" ? -62 : -67} fontSize={T.micro} fontWeight={500} fill={quietInk}>{tx(locked ? "keys tried" : "letters carried")}</text>
        <text x={4} y={-26} fontSize={T.label} fontWeight={700} fill={C.ink}>{lang === "hi" ? countTotal + " में से " + counted : lang === "gu" ? countTotal + " માંથી " + counted : counted + " of " + countTotal}</text>
      </g>

      {/* ── the wheel ── */}
      <g>
        <circle cx={GEO.cx} cy={GEO.cy} r={GEO.rim} fill={showBand ? tint(C.panel, 0.28) : C.paper} stroke={C.rule} strokeWidth={2} />
        <circle cx={GEO.cx} cy={GEO.cy} r={R.edge} fill={showBand ? C.paper : tint(C.panel, 0.34)} stroke={C.rule} strokeWidth={2} />
        <circle cx={GEO.cx} cy={GEO.cy} r={GEO.hub} fill={C.paper} stroke={C.rule} strokeWidth={2} />

        {/* where Z meets A, on the ring that does not move */}
        {(() => { const a = wheelPt(-0.5, GEO.hub), b = wheelPt(-0.5, GEO.rim);
          return <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={CONTENT.bead} strokeWidth={5} strokeLinecap="round" />; })()}
        {showInner ? (() => { const a = wheelPt(-0.5 - st.turn, GEO.hub), b = wheelPt(-0.5 - st.turn, R.edge);
          return <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={CONTENT.bead} strokeWidth={5} strokeLinecap="round" strokeDasharray="10 8" />; })() : null}

        {/* the fixed alphabet */}
        {ALPHA.split("").map((ch, i) => {
          const p = wheelPt(i, R.letter);
          const inWord = given.indexOf(ch) >= 0 && !live.nums;
          return <text key={"o" + ch} x={p.x} y={p.y + 10} textAnchor="middle" fontSize={T.micro} fontWeight={inWord ? 700 : 500}
            fill={inWord ? shade(CONTENT.hundred, 0.25) : mix(C.ink, C.paper, 0.26)}>{ch}</text>;
        })}

        {/* the band: only the marked places are printed, so no letter of the word is labelled */}
        {showBand ? bandNums.map((p) => {
          const at = wheelPt(p - 1, R.num);
          const tick = wheelPt(p - 1, R.edge), tock = wheelPt(p - 1, R.edge + 10);
          return (
            <g key={"b" + p}>
              <line x1={tick.x} y1={tick.y} x2={tock.x} y2={tock.y} stroke={C.rule} strokeWidth={3} />
              <text x={at.x} y={at.y + 10} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={C.ink}>{st.flip ? 27 - p : p}</text>
            </g>
          );
        }) : null}

        {/* the inner ring: what every letter becomes under the key now set */}
        {showInner ? ALPHA.split("").map((ch, i) => {
          const p = wheelPt(i, R.inner);
          return <text key={"i" + i} x={p.x} y={p.y + 10} textAnchor="middle" fontSize={T.micro} fontWeight={700}
            fill={madeInk}>{letterAt(placeOf(ch) + st.turn)}</text>;
        }) : null}

        {/* in band mode the hub names the letter the spoke points at */}
        {showBand && (st.open >= 0 || (demo && demo.spoke !== null && demo.spoke !== undefined)) ? (
          <text x={GEO.cx} y={GEO.cy + 20} textAnchor="middle" fontSize={T.display} fontWeight={700} fill={shade(CONTENT.hundred, 0.25)}>
            {given[demo && demo.spoke !== null && demo.spoke !== undefined ? demo.spoke : st.open] || ""}</text>
        ) : null}

        {/* the hub says how far the ring has been turned: the key, in the child's own hand */}
        {showInner && st.turn !== 0 ? (
          <g>
            <text x={GEO.cx} y={GEO.cy + 6} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={stepInk}>{Math.abs(st.turn)}</text>
            <text x={GEO.cx} y={GEO.cy + 40} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={stepInk}>{tx(st.turn > 0 ? "places on" : "places back")}</text>
          </g>
        ) : null}

        {/* the carries: every letter moves the same way round, and one of them passes the tick */}
        {usesTurn && st.turn !== 0 ? given.map((ch: string, k: number) => {
          const show = demo && demo.arcs !== undefined ? k < demo.arcs : !!cells[k];
          if (!show) return null;
          const i = placeOf(ch) - 1;
          const end = wheelPt(i + st.turn, R.arc), lead = wheelPt(i + st.turn - (st.turn > 0 ? 0.6 : -0.6), R.arc);
          const ang = Math.atan2(end.y - lead.y, end.x - lead.x) * 180 / Math.PI;
          return (
            <g key={"a" + k}>
              <path d={wheelArc(i, st.turn, R.arc)} fill="none" stroke={CONTENT.pointer} strokeWidth={5} strokeLinecap="round" strokeOpacity={0.9} />
              <path d="M 0 0 L -15 -8 L -15 8 Z" fill={CONTENT.pointer} transform={"translate(" + end.x.toFixed(1) + "," + end.y.toFixed(1) + ") rotate(" + ang.toFixed(1) + ")"} />
            </g>
          );
        }) : null}

        {/* phase 1: the spoke that says which letter is being counted */}
        {live.kind === "num" && (st.open >= 0 || (demo && demo.spoke !== null && demo.spoke !== undefined)) ? (() => {
          const k = demo && demo.spoke !== null && demo.spoke !== undefined ? demo.spoke : st.open;
          const ch = given[k];
          if (!ch) return null;
          const i = placeOf(ch) - 1, a = wheelPt(i, GEO.hub), b = wheelPt(i, R.edge);
          return <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={CONTENT.pointer} strokeWidth={5} strokeLinecap="round" />;
        })() : null}

        {/* the swap key: first with last, drawn straight across */}
        {live.kind === "pick" && demo && demo.chords ? given.slice(0, demo.chords).map((ch: string, k: number) => {
          const a = wheelPt(placeOf(ch) - 1, R.letter - 18), b = wheelPt(26 - placeOf(ch), R.letter - 18);
          return <line key={"c" + k} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={CONTENT.pointer} strokeWidth={4} strokeLinecap="round" />;
        }) : null}
      </g>

      {/* ── the panel on the right: the key, or the correction ── */}
      {!locked ? (
        <g>
          <rect x={panel.x} y={panel.y} width={panel.w} height={panel.h} rx={RAD.panel} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={2} />
          <text x={panel.x + 20} y={panel.y + 36} fontSize={T.micro} fontWeight={600} fill={quietInk}>{tx(demo ? (live.kind === "decode" ? "the word reads" : "the code reads") : "the key")}</text>
          {demo && demo.caption ? (
            <g>
              <text x={panel.x + 20} y={panel.y + 156} fontSize={T.micro} fontWeight={600} fill={quietInk}>{tx("so")}</text>
              <rect x={panel.x + panel.w / 2 - 150} y={panel.y + 120} width={300} height={56} rx={12} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} />
              <text x={panel.x + panel.w / 2} y={panel.y + 158} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={madeInk}>{tx(demo.caption)}</text>
            </g>
          ) : null}
          {demo ? cardRow(demo.cards, panel.x + 20, panel.y + (demo.caption ? 48 : 60), panel.w - 40, T.speech, madeInk)
            : (() => {
              const s = sampleOf(live);
              const to = live.kind === "num" ? String(placeOf(s)) : live.kind === "pick" ? letterAt(27 - placeOf(s)) : carried(s, st.turn);
              const label = live.kind === "num" ? tx("its number") : live.kind === "pick" ? tx("swapped") : keyShow(keyWord(st.turn), lang, tx);
              const mx = panel.x + panel.w / 2;
              return (
                <g>
                  <rect x={mx - 220} y={panel.y + 62} width={104} height={T.speech + 20} rx={10} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} />
                  <text x={mx - 168} y={panel.y + 62 + T.speech + 2} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={shade(CONTENT.hundred, 0.25)}>{s}</text>
                  <line x1={mx - 96} y1={panel.y + 92} x2={mx + 84} y2={panel.y + 92} stroke={CONTENT.pointer} strokeWidth={5} strokeLinecap="round" />
                  <path d="M 0 0 L -16 -9 L -16 9 Z" fill={CONTENT.pointer} transform={"translate(" + (mx + 88) + "," + (panel.y + 92) + ")"} />
                  <text x={mx - 6} y={panel.y + 74} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={stepInk}>{label}</text>
                  <rect x={mx + 116} y={panel.y + 62} width={104} height={T.speech + 20} rx={10} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} />
                  <text x={mx + 168} y={panel.y + 62 + T.speech + 2} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={madeInk}>{to}</text>
                </g>
              );
            })()}
        </g>
      ) : (
        <g>
          <rect x={MODEL.locked.key.x} y={MODEL.locked.key.y} width={MODEL.locked.key.w} height={MODEL.locked.key.h} rx={RAD.panel}
            fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={2} />
          <text x={MODEL.locked.key.x + 20} y={MODEL.locked.key.y + 30} fontSize={T.micro} fontWeight={600} fill={quietInk}>{tx(demo && demo.caption ? "so" : "the key you try")}</text>
          <text x={MODEL.locked.key.x + 20} y={MODEL.locked.key.y + 64} fontSize={T.label} fontWeight={700} fill={demo && demo.caption ? madeInk : stepInk}>
            {demo && demo.caption ? tx(demo.caption) : live.nums ? tx(st.flip ? "A is 26" : "A is 1") : keyShow(keyWord(st.turn), lang, tx)}</text>
          {!demo ? (
            <Key id="try-key" label="Try this key" x={MODEL.locked.tryKey.x} y={MODEL.locked.tryKey.y} w={MODEL.locked.tryKey.w} h={MODEL.locked.tryKey.h}
              C={C} disabled={busy.current || stage !== "ask"} onClick={act(tryKey)}>
              <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={C.ink}>{tx("Try this key")}</text>
            </Key>
          ) : null}
          {/* the rows waiting for a trial: an outlined box, never a faded copy of an answer */}
          {[0, 1].map((k) => (
            <rect key={"e" + k} x={MODEL.rows.x} y={MODEL.rows.y + k * 66} width={MODEL.rows.w} height={58} rx={14}
              fill="none" stroke={C.rule} strokeWidth={2} strokeDasharray="10 10" />
          ))}
          {/* the trial rows: one reading to a row, none of them marked */}
          {(demo && demo.rows ? st.trials.concat(demo.rows.filter((r: any) => !st.trials.some((t: any) => t.key === r.key))) : st.trials)
            .slice(0, 3).map((r: any, k: number) => {
              const ry = MODEL.rows.y + k * 66;
              return (
                <g key={"r" + k}>
                  <rect x={MODEL.rows.x} y={ry} width={MODEL.rows.w} height={58} rx={14} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} />
                  <text x={MODEL.rows.x + 18} y={ry + 39} fontSize={T.micro} fontWeight={600} fill={stepInk}>{keyShow(r.key, lang, tx)}</text>
                  {r.cards.map((ch: string, j: number) => (
                    <text key={j} x={MODEL.rows.x + 210 + j * 64} y={ry + 41} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={madeInk}>{ch}</text>
                  ))}
                </g>
              );
            })}
        </g>
      )}

      {/* ── the controls that set the key ── */}
      {usesTurn && !locked ? (
        <g>
          <RoundControl id="turn-back" cx={MODEL.turns.back} cy={MODEL.turns.y} C={C} label="turn the ring back one place" onClick={act(() => turnRing(-1))}>
            <path d="M 10 -14 A 18 18 0 1 0 10 14" fill="none" stroke={C.ink} strokeWidth={5} strokeLinecap="round" />
            <path d="M 10 -20 L 10 -6 L -2 -14 Z" fill={C.ink} />
          </RoundControl>
          <RoundControl id="turn-on" cx={MODEL.turns.on} cy={MODEL.turns.y} C={C} label="turn the ring on one place" onClick={act(() => turnRing(1))}>
            <path d="M -10 -14 A 18 18 0 1 1 -10 14" fill="none" stroke={C.ink} strokeWidth={5} strokeLinecap="round" />
            <path d="M -10 -20 L -10 -6 L 2 -14 Z" fill={C.ink} />
          </RoundControl>
          <text x={(MODEL.turns.back + MODEL.turns.on) / 2} y={MODEL.turns.y + 74} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={quietInk}>{tx("turn the ring")}</text>
        </g>
      ) : null}

      {locked ? (
        <g>
          {!live.nums ? (
            <g>
              <RoundControl id="turn-back" cx={MODEL.locked.back} cy={MODEL.locked.y} C={C} label="turn the ring back one place" onClick={act(() => turnRing(-1))}>
                <path d="M 10 -14 A 18 18 0 1 0 10 14" fill="none" stroke={C.ink} strokeWidth={5} strokeLinecap="round" />
                <path d="M 10 -20 L 10 -6 L -2 -14 Z" fill={C.ink} />
              </RoundControl>
              <RoundControl id="turn-on" cx={MODEL.locked.on} cy={MODEL.locked.y} C={C} label="turn the ring on one place" onClick={act(() => turnRing(1))}>
                <path d="M -10 -14 A 18 18 0 1 1 -10 14" fill="none" stroke={C.ink} strokeWidth={5} strokeLinecap="round" />
                <path d="M -10 -20 L -10 -6 L 2 -14 Z" fill={C.ink} />
              </RoundControl>
            </g>
          ) : (
            <g>
              <RoundControl id="flip-band" cx={MODEL.locked.flip} cy={MODEL.locked.y} C={C} label="turn the number band the other way" onClick={act(flipBand)}>
                <path d="M -16 -6 L 16 -6 M 10 -13 L 17 -6 L 10 1" fill="none" stroke={C.ink} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />
                <path d="M 16 10 L -16 10 M -10 3 L -17 10 L -10 17" fill="none" stroke={C.ink} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />
              </RoundControl>
              <text x={MODEL.locked.flip} y={MODEL.locked.y + 60} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={quietInk}>{tx("the other way")}</text>
            </g>
          )}
          {!live.nums ? (
            <text x={(MODEL.locked.back + MODEL.locked.on) / 2} y={MODEL.locked.y + 60} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={quietInk}>{tx("turn the ring")}</text>
          ) : null}
        </g>
      ) : null}

      {/* ── the message strip ── */}
      <g>
        {given.map((ch: string, k: number) => {
          const cx = x0 + k * (cw + MODEL.strip.card.gap);
          const made = wonCards ? wonCards[k] : st.open === k ? st.buf : cells[k];
          return (
            <CardBox key={"card" + k} id={"card-" + (k + 1)} x={cx} y={MODEL.strip.y} w={cw} h={MODEL.strip.h}
              given={ch} made={made} live={cardsLive} open={st.open === k} holding={captured && st.open === k} C={C} madeColour={madeInk}
              onTap={act(() => (live.kind === "num" ? openCell(k) : carryOne(k)))} />
          );
        })}
      </g>

      {invite ? (invite.kind === "try"
        ? <Invite x={MODEL.locked.tryKey.x + MODEL.locked.tryKey.w / 2} y={MODEL.locked.tryKey.y + MODEL.locked.tryKey.h / 2} r={54} C={C} />
        : <Invite x={invite.x} y={invite.y} r={invite.kind === "turn" ? 46 : 50} C={C} />) : null}
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase */
function Thumb({ result, C, w, h, lang = "en", tx = (v: any) => v }: any) {
  const last = result && result.last ? result.last : null;
  if (!last) return null;
  const it = last.item;
  const shown = last.kind === "pick" || last.kind === "trial" || last.kind === "make"
    ? [tx(String(CHOICE_LABEL[String(last.value)] || last.value))]
    : String(last.value).trim().split(/\s+/);
  const wide = shown.length === 1;
  const bw = wide ? w - 24 : Math.min(48, (w - 24 - (shown.length - 1) * 8) / shown.length);
  const tot = wide ? bw : shown.length * bw + (shown.length - 1) * 8;
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      {shown.map((v: string, k: number) => (
        <g key={k}>
          <rect x={(w - tot) / 2 + k * (bw + 8)} y={h / 2 - 26} width={bw} height={52} rx={8} fill="#FFFFFF" stroke={C.rule} strokeWidth={1.5} />
          <text x={(w - tot) / 2 + k * (bw + 8) + bw / 2} y={h / 2 + 12} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={shade(CONTENT.one, 0.25)}>{v}</text>
        </g>
      ))}
    </g>
  );
}

function CodeWheel(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, format, fitHost: () => null }} />
  );
}

export default CodeWheel;
