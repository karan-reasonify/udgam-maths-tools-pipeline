/* ═══ M2.S4.T7.C30.2D1 · scale_bench · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists: header + its three controls, canvas, slot + pad, bubble + mascot,
   phase dots (user / AI mode), window.toolApi, sounds, the synced voice, scoring, the events,
   idle and restart. NO imports in this file; only the five host hooks. Follow docs/LAYOUT.md.
   Edit, never rewrite. Built by `node cli.mjs scaffold`; concepts are verbatim (check compares them). */

const TOOL_ID = "scale_bench";
const MEDIA_ID = "M2.S4.T7.C30.2D1";
const TOOL_NAME = "Scale Bench";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
const VOICE = {"rate":0.92,"pitch":1.06};

/* spoken before phase 1's teach lines only (the plan's opening voice line) */
const OPENING = ["Read the display exactly as it stands, last zero and all."];
/* the whole-tool line: spoken on the summary page */
const FINISH_LINE = "Every weight read as printed, and a level beam under two written answers that are not the same.";
/* said when the child opens Free play from the summary page (the plan's free-play voice line) */
const FREE_LINE = "Free play. Put any weight on the pan, then tidy it and watch the beam.";

/* Hindi and Gujarati, keyed by the English line exactly (runtime r21: `lineFor(line, lang, TR)`); the English
   everywhere else stays what the checks read. NCERT class 4 decimals: दशमलव / દશાંશ, भिन्न / અપૂર્ણાંક,
   अंश / અંશ, हर / છેદ. The tool says "dot" for the point the pad types, so the dot is बिंदु / બિંદુ (the
   pad's own key name in both languages); "point" is दशमलव बिंदु / દશાંશ ચિહ્ન. The scale is a kitchen
   weighing scale (तराज़ू / વજનકાંટો), its pan पलड़ा / પલ્લું, its beam डंडी / દાંડી. Digits stay digits: the
   runtime speaks 6.3 and 45.28 as words. A first draft; wants a native speaker's read. */
const TR: any = {
  hi: {
    "Scale Bench": "तराज़ू बेंच",
    "Read the display exactly as it stands, last zero and all.": "स्क्रीन पर जो लिखा है, उसे वैसा ही पढ़ो, आखिरी शून्य के साथ।",
    "Every weight read as printed, and a level beam under two written answers that are not the same.": "हर वज़न वैसा ही पढ़ा जैसा छपा था, और दो अलग लिखे उत्तरों पर भी डंडी बराबर रही।",
    "Free play. Put any weight on the pan, then tidy it and watch the beam.": "मुक्त खेल। पलड़े पर कोई भी वज़न रखो, फिर उसे साफ़ करो और डंडी देखो।",

    "Dropping the point to get the top": "दशमलव बिंदु हटाकर ऊपर की संख्या पाना",
    "A weight sits on the pan and the scale prints it.": "पलड़े पर एक वज़न रखा है और तराज़ू उसे स्क्रीन पर दिखाता है।",
    "The dot comes out first, and the digits that are left make the top number.": "पहले बिंदु निकलता है, और बचे हुए अंक ऊपर की संख्या बनाते हैं।",
    "Count the digits on the display, then count the ones you wrote.": "स्क्रीन पर अंक गिनो, फिर अपने लिखे अंक गिनो।",
    "Every digit comes across. Only the dot is left behind.": "हर अंक साथ आता है। सिर्फ़ बिंदु पीछे रह जाता है।",
    "The numerator is the digits with the point taken out and nothing else changed.": "अंश वही अंक हैं जिनमें से दशमलव बिंदु हटा दिया गया है और कुछ और नहीं बदला।",
    "You learned: the dot comes out and every digit stays.": "तुमने सीखा: बिंदु निकलता है और हर अंक रहता है।",
    "The top number": "ऊपर की संख्या",
    "The pan reads 6.3 kilograms. What is the top number of its fraction?": "पलड़े पर 6.3 किलोग्राम है। उसके भिन्न की ऊपर की संख्या क्या है?",
    "How many digits does the display print?": "स्क्रीन पर कितने अंक छपे हैं?",
    "The next weight is 8.4 kilograms. Give me the top number again.": "अगला वज़न 8.4 किलोग्राम है। मुझे फिर से ऊपर की संख्या बताओ।",
    "Did one digit stay behind with the dot?": "क्या कोई अंक बिंदु के साथ पीछे रह गया?",
    "This weight has two digits before the dot. Write the top number for 15.7.": "इस वज़न में बिंदु से पहले दो अंक हैं। 15.7 की ऊपर की संख्या लिखो।",
    "Two digits stand to the left here. Count them all.": "यहाँ बाईं ओर दो अंक हैं। सब गिनो।",

    "Building the bottom from the places": "स्थानों से नीचे की संख्या बनाना",
    "This bench wants both numbers, the top one and the bottom one.": "इस बेंच को दोनों संख्याएँ चाहिए, ऊपर वाली और नीचे वाली।",
    "Count the places after the dot, then write one and that many zeros underneath.": "बिंदु के बाद के स्थान गिनो, फिर नीचे एक और उतने ही शून्य लिखो।",
    "How many places did you light? The zeros must match them.": "तुमने कितने स्थान जलाए? शून्य उतने ही होने चाहिए।",
    "One zero for one place, two zeros for two places.": "एक स्थान के लिए एक शून्य, दो स्थान के लिए दो शून्य।",
    "The denominator is one followed by a zero for every decimal place.": "हर यानी एक, और उसके बाद हर दशमलव स्थान के लिए एक शून्य।",
    "You learned: one zero underneath for every place after the dot.": "तुमने सीखा: बिंदु के बाद हर स्थान के लिए नीचे एक शून्य।",
    "Write the fraction": "भिन्न लिखो",
    "The pan reads 45.28 kilograms. Build the bottom and give me the whole fraction.": "पलड़े पर 45.28 किलोग्राम है। नीचे की संख्या बनाओ और पूरा भिन्न बताओ।",
    "How many digits stand after the dot here?": "यहाँ बिंदु के बाद कितने अंक हैं?",
    "The next weight is 30.62 kilograms. Work the bench the same way.": "अगला वज़न 30.62 किलोग्राम है। बेंच को इसी तरह चलाओ।",
    "Light each place after the dot, one at a time.": "बिंदु के बाद हर स्थान को एक-एक करके जलाओ।",
    "This pan reads 7.209 kilograms. Count its places, then write it as a fraction.": "इस पलड़े पर 7.209 किलोग्राम है। स्थान गिनो, फिर उसे भिन्न में लिखो।",
    "Run the counter all the way out before you build.": "बनाने से पहले गिनती को आखिर तक ले जाओ।",

    "A zero on the end still counts": "आखिरी शून्य भी गिना जाता है",
    "This display ends in a zero, and the scale printed it on purpose.": "इस स्क्रीन पर आखिर में शून्य है, और तराज़ू ने उसे जानबूझकर छापा है।",
    "A printed zero sits in a place of its own, so count it too.": "छपा हुआ शून्य भी अपने स्थान पर है, इसलिए उसे भी गिनो।",
    "Start at the dot and count outwards. Stop at the last printed digit.": "बिंदु से शुरू करके बाहर की ओर गिनो। आखिरी छपे अंक पर रुको।",
    "The zero is standing in a place. Nothing is spare here.": "शून्य भी एक स्थान पर खड़ा है। यहाँ कुछ भी फ़ालतू नहीं है।",
    "A trailing zero takes a decimal place of its own, so the denominator comes out one zero longer.": "आखिर का शून्य अपना एक दशमलव स्थान लेता है, इसलिए हर में एक शून्य ज़्यादा आता है।",
    "You learned: a printed zero on the end takes a place of its own.": "तुमने सीखा: आखिर में छपा शून्य अपना एक स्थान लेता है।",
    "A scale prints a weight as 1.450 kilograms. Write that as a fraction.": "तराज़ू वज़न को 1.450 किलोग्राम छापता है। इसे भिन्न में लिखो।",
    "Does that last zero sit in a place, or not?": "क्या वह आखिरी शून्य किसी स्थान पर है, या नहीं?",
    "A label reads 2.60 metres. Read it as it stands and write its fraction.": "एक लेबल पर 2.60 मीटर लिखा है। इसे जैसा है वैसा पढ़ो और उसका भिन्न लिखो।",
    "Nothing was tidied here. What did the label actually print?": "यहाँ कुछ भी साफ़ नहीं किया गया। लेबल पर असल में क्या छपा है?",
    "Write the weight": "वज़न लिखो",
    "The bench built this fraction from a weight. Write the weight the scale printed.": "बेंच ने एक वज़न से यह भिन्न बनाया। तराज़ू ने जो वज़न छापा था, उसे लिखो।",
    "Count the zeros underneath. They tell you how many places.": "नीचे के शून्य गिनो। वे बताते हैं कि कितने स्थान हैं।",

    "The right amount can still be the wrong answer": "सही मात्रा भी गलत उत्तर हो सकती है",
    "Tidy first drops a zero off the end and runs the bench again.": "पहले साफ़ करो दबाने पर आखिर का एक शून्य हट जाता है और बेंच फिर से चलती है।",
    "Watch the beam hold level while the two written answers stand apart.": "देखो, डंडी बराबर रहती है जबकि दो लिखे उत्तर अलग-अलग हैं।",
    "Which row did the question ask about, the printed one or the tidied one?": "प्रश्न किस पंक्ति के बारे में था, छपी हुई या साफ़ की हुई?",
    "The beam will not move. The writing still changes.": "डंडी नहीं हिलेगी। पर लिखावट बदल जाती है।",
    "A trailing zero leaves the amount alone and takes a decimal place. It changes the denominator, not the weight.": "आखिर का शून्य मात्रा को नहीं बदलता, पर एक दशमलव स्थान लेता है। यह हर को बदलता है, वज़न को नहीं।",
    "You learned: the same amount can still be a different written answer.": "तुमने सीखा: वही मात्रा भी अलग लिखा हुआ उत्तर हो सकती है।",
    "The tidied fraction": "साफ़ किया हुआ भिन्न",
    "Tidy that same 1.450 kilogram weight first, then convert it. What comes out?": "उसी 1.450 किलोग्राम वज़न को पहले साफ़ करो, फिर भिन्न बनाओ। क्या निकलता है?",
    "How many places are left once the end zero goes?": "आखिर का शून्य हटने पर कितने स्थान बचते हैं?",
    "The printed fraction": "छपा हुआ भिन्न",
    "A height is printed as 1.30 metres. Write the fraction for the printed form.": "एक ऊँचाई 1.30 मीटर छपी है। छपे हुए रूप का भिन्न लिखो।",
    "The printed row is the one that was asked about.": "प्रश्न छपी हुई पंक्ति के बारे में है।",
    "A bag is printed as 5.250 kilograms. Convert it as it stands, end zero and all.": "एक थैले पर 5.250 किलोग्राम छपा है। इसे जैसा है वैसा बदलो, आखिर के शून्य के साथ।",
    "Did you count the zero the scale printed on the end?": "क्या तुमने तराज़ू के छापे आखिरी शून्य को गिना?",

    /* what the working area draws, the slot's own labels and the units */
    "numerator": "अंश", "denominator": "हर",
    "kg": "किलोग्राम", "m": "मीटर",
    "weights": "वज़न", "the dot": "बिंदु", "top number": "ऊपर की संख्या", "places after the dot": "बिंदु के बाद के स्थान",
    "counted": "गिने", "the fraction": "भिन्न", "zeros underneath": "नीचे के शून्य", "places": "स्थान",
    "tidy first": "पहले साफ़ करो", "the amount": "मात्रा", "same amount": "वही मात्रा", "written form": "लिखा रूप", "new weight": "नया वज़न",
    "came out": "निकला", "one and": "एक और", "zeros": "शून्य", "the end": "आखिर का", "zero too": "शून्य भी",
    "beam": "डंडी", "is level": "बराबर है", "forms": "रूप", "differ": "अलग हैं",
  },
  gu: {
    "Scale Bench": "વજનકાંટો બેન્ચ",
    "Read the display exactly as it stands, last zero and all.": "સ્ક્રીન પર જે લખ્યું છે તે એમ જ વાંચો, છેલ્લા શૂન્ય સાથે.",
    "Every weight read as printed, and a level beam under two written answers that are not the same.": "દરેક વજન જેવું છપાયું હતું તેવું જ વાંચ્યું, અને બે અલગ લખેલા જવાબો છતાં દાંડી સમતોલ રહી.",
    "Free play. Put any weight on the pan, then tidy it and watch the beam.": "મુક્ત રમત. પલ્લા પર કોઈ પણ વજન મૂકો, પછી તેને સાફ કરો અને દાંડી જુઓ.",

    "Dropping the point to get the top": "દશાંશ ચિહ્ન કાઢીને ઉપરની સંખ્યા મેળવવી",
    "A weight sits on the pan and the scale prints it.": "પલ્લા પર એક વજન મૂકેલું છે અને વજનકાંટો તેને સ્ક્રીન પર બતાવે છે.",
    "The dot comes out first, and the digits that are left make the top number.": "પહેલા બિંદુ નીકળે છે, અને બાકી રહેલા અંકો ઉપરની સંખ્યા બનાવે છે.",
    "Count the digits on the display, then count the ones you wrote.": "સ્ક્રીન પરના અંકો ગણો, પછી તમે લખેલા અંકો ગણો.",
    "Every digit comes across. Only the dot is left behind.": "દરેક અંક સાથે આવે છે. ફક્ત બિંદુ પાછળ રહી જાય છે.",
    "The numerator is the digits with the point taken out and nothing else changed.": "અંશ એટલે દશાંશ ચિહ્ન કાઢી નાખ્યા પછીના અંકો, બીજું કંઈ બદલાયા વિના.",
    "You learned: the dot comes out and every digit stays.": "તમે શીખ્યા: બિંદુ નીકળે છે અને દરેક અંક રહે છે.",
    "The top number": "ઉપરની સંખ્યા",
    "The pan reads 6.3 kilograms. What is the top number of its fraction?": "પલ્લા પર 6.3 કિલોગ્રામ છે. તેના અપૂર્ણાંકની ઉપરની સંખ્યા શું છે?",
    "How many digits does the display print?": "સ્ક્રીન પર કેટલા અંકો છપાયા છે?",
    "The next weight is 8.4 kilograms. Give me the top number again.": "હવે પછીનું વજન 8.4 કિલોગ્રામ છે. ફરી ઉપરની સંખ્યા કહો.",
    "Did one digit stay behind with the dot?": "શું કોઈ અંક બિંદુ સાથે પાછળ રહી ગયો?",
    "This weight has two digits before the dot. Write the top number for 15.7.": "આ વજનમાં બિંદુ પહેલાં બે અંકો છે. 15.7 ની ઉપરની સંખ્યા લખો.",
    "Two digits stand to the left here. Count them all.": "અહીં ડાબી બાજુ બે અંકો છે. બધા ગણો.",

    "Building the bottom from the places": "સ્થાનો પરથી નીચેની સંખ્યા બનાવવી",
    "This bench wants both numbers, the top one and the bottom one.": "આ બેન્ચને બંને સંખ્યાઓ જોઈએ, ઉપરની અને નીચેની.",
    "Count the places after the dot, then write one and that many zeros underneath.": "બિંદુ પછીના સ્થાનો ગણો, પછી નીચે એક અને તેટલા જ શૂન્ય લખો.",
    "How many places did you light? The zeros must match them.": "તમે કેટલા સ્થાન ચમકાવ્યા? શૂન્ય તેટલા જ હોવા જોઈએ.",
    "One zero for one place, two zeros for two places.": "એક સ્થાન માટે એક શૂન્ય, બે સ્થાન માટે બે શૂન્ય.",
    "The denominator is one followed by a zero for every decimal place.": "છેદ એટલે એક, અને તેની પછી દરેક દશાંશ સ્થાન માટે એક શૂન્ય.",
    "You learned: one zero underneath for every place after the dot.": "તમે શીખ્યા: બિંદુ પછીના દરેક સ્થાન માટે નીચે એક શૂન્ય.",
    "Write the fraction": "અપૂર્ણાંક લખો",
    "The pan reads 45.28 kilograms. Build the bottom and give me the whole fraction.": "પલ્લા પર 45.28 કિલોગ્રામ છે. નીચેની સંખ્યા બનાવો અને આખો અપૂર્ણાંક કહો.",
    "How many digits stand after the dot here?": "અહીં બિંદુ પછી કેટલા અંકો છે?",
    "The next weight is 30.62 kilograms. Work the bench the same way.": "હવે પછીનું વજન 30.62 કિલોગ્રામ છે. બેન્ચ પર એ જ રીતે કરો.",
    "Light each place after the dot, one at a time.": "બિંદુ પછીના દરેક સ્થાનને એક પછી એક ચમકાવો.",
    "This pan reads 7.209 kilograms. Count its places, then write it as a fraction.": "આ પલ્લા પર 7.209 કિલોગ્રામ છે. સ્થાનો ગણો, પછી અપૂર્ણાંક તરીકે લખો.",
    "Run the counter all the way out before you build.": "બનાવતા પહેલાં ગણતરી છેલ્લે સુધી ચલાવો.",

    "A zero on the end still counts": "છેલ્લું શૂન્ય પણ ગણાય છે",
    "This display ends in a zero, and the scale printed it on purpose.": "આ સ્ક્રીન પર છેલ્લે શૂન્ય છે, અને વજનકાંટાએ તેને જાણી જોઈને છાપ્યું છે.",
    "A printed zero sits in a place of its own, so count it too.": "છપાયેલું શૂન્ય પણ પોતાના સ્થાને છે, એટલે તેને પણ ગણો.",
    "Start at the dot and count outwards. Stop at the last printed digit.": "બિંદુથી શરૂ કરીને બહાર તરફ ગણો. છેલ્લા છપાયેલા અંક પર અટકો.",
    "The zero is standing in a place. Nothing is spare here.": "શૂન્ય પણ એક સ્થાન પર ઊભું છે. અહીં કંઈ વધારાનું નથી.",
    "A trailing zero takes a decimal place of its own, so the denominator comes out one zero longer.": "છેલ્લું શૂન્ય પોતાનું એક દશાંશ સ્થાન લે છે, એટલે છેદમાં એક શૂન્ય વધુ આવે છે.",
    "You learned: a printed zero on the end takes a place of its own.": "તમે શીખ્યા: છેલ્લે છપાયેલું શૂન્ય પોતાનું એક સ્થાન લે છે.",
    "A scale prints a weight as 1.450 kilograms. Write that as a fraction.": "વજનકાંટો વજન 1.450 કિલોગ્રામ છાપે છે. તેને અપૂર્ણાંક તરીકે લખો.",
    "Does that last zero sit in a place, or not?": "શું તે છેલ્લું શૂન્ય કોઈ સ્થાન પર છે, કે નહીં?",
    "A label reads 2.60 metres. Read it as it stands and write its fraction.": "એક લેબલ પર 2.60 મીટર લખ્યું છે. તેને જેમ છે તેમ વાંચો અને તેનો અપૂર્ણાંક લખો.",
    "Nothing was tidied here. What did the label actually print?": "અહીં કંઈ સાફ કર્યું નથી. લેબલ પર ખરેખર શું છપાયું છે?",
    "Write the weight": "વજન લખો",
    "The bench built this fraction from a weight. Write the weight the scale printed.": "બેન્ચે એક વજનમાંથી આ અપૂર્ણાંક બનાવ્યો. વજનકાંટાએ જે વજન છાપ્યું હતું તે લખો.",
    "Count the zeros underneath. They tell you how many places.": "નીચેના શૂન્ય ગણો. તે કહે છે કે કેટલા સ્થાન છે.",

    "The right amount can still be the wrong answer": "સાચો જથ્થો પણ ખોટો જવાબ હોઈ શકે",
    "Tidy first drops a zero off the end and runs the bench again.": "પહેલાં સાફ કરો દબાવતાં છેલ્લું એક શૂન્ય નીકળી જાય છે અને બેન્ચ ફરી ચાલે છે.",
    "Watch the beam hold level while the two written answers stand apart.": "જુઓ, બે લખેલા જવાબો અલગ છે છતાં દાંડી સમતોલ રહે છે.",
    "Which row did the question ask about, the printed one or the tidied one?": "પ્રશ્ન કઈ હરોળ વિશે હતો, છપાયેલી કે સાફ કરેલી?",
    "The beam will not move. The writing still changes.": "દાંડી હલશે નહીં. પણ લખાણ બદલાય છે.",
    "A trailing zero leaves the amount alone and takes a decimal place. It changes the denominator, not the weight.": "છેલ્લું શૂન્ય જથ્થાને બદલતું નથી, પણ એક દશાંશ સ્થાન લે છે. તે છેદ બદલે છે, વજન નહીં.",
    "You learned: the same amount can still be a different written answer.": "તમે શીખ્યા: એ જ જથ્થો પણ અલગ લખેલો જવાબ હોઈ શકે.",
    "The tidied fraction": "સાફ કરેલો અપૂર્ણાંક",
    "Tidy that same 1.450 kilogram weight first, then convert it. What comes out?": "એ જ 1.450 કિલોગ્રામ વજનને પહેલાં સાફ કરો, પછી અપૂર્ણાંક બનાવો. શું આવે છે?",
    "How many places are left once the end zero goes?": "છેલ્લું શૂન્ય જતાં કેટલા સ્થાન બચે છે?",
    "The printed fraction": "છપાયેલો અપૂર્ણાંક",
    "A height is printed as 1.30 metres. Write the fraction for the printed form.": "એક ઊંચાઈ 1.30 મીટર છપાયેલી છે. છપાયેલા રૂપનો અપૂર્ણાંક લખો.",
    "The printed row is the one that was asked about.": "પ્રશ્ન છપાયેલી હરોળ વિશે છે.",
    "A bag is printed as 5.250 kilograms. Convert it as it stands, end zero and all.": "એક થેલી પર 5.250 કિલોગ્રામ છપાયું છે. તેને જેમ છે તેમ બદલો, છેલ્લા શૂન્ય સાથે.",
    "Did you count the zero the scale printed on the end?": "શું તમે વજનકાંટાએ છાપેલું છેલ્લું શૂન્ય ગણ્યું?",

    /* what the working area draws, the slot's own labels and the units */
    "numerator": "અંશ", "denominator": "છેદ",
    "kg": "કિલોગ્રામ", "m": "મીટર",
    "weights": "વજન", "the dot": "બિંદુ", "top number": "ઉપરની સંખ્યા", "places after the dot": "બિંદુ પછીના સ્થાન",
    "counted": "ગણ્યા", "the fraction": "અપૂર્ણાંક", "zeros underneath": "નીચેના શૂન્ય", "places": "સ્થાન",
    "tidy first": "પહેલાં સાફ કરો", "the amount": "જથ્થો", "same amount": "સમાન જથ્થો", "written form": "લખેલું રૂપ", "new weight": "નવું વજન",
    "came out": "નીકળ્યું", "one and": "એક અને", "zeros": "શૂન્ય", "the end": "છેલ્લું", "zero too": "શૂન્ય પણ",
    "beam": "દાંડી", "is level": "સમતોલ છે", "forms": "રૂપ", "differ": "અલગ છે",
  },
};

/* One entry per phase = one mount.
   says    the teach run, said before anything is asked (numbers are turned into words for the voice)
   ladder  rungs 2 and 3 of the hint ladder (rung 1 is each item's own miss line); never the answer
   closing one closing line for this phase, said once when it goes idle
   learned the summary page's row for this phase: "You learned: ..." (at most 72 characters)
   traceback what the working area redraws after a miss, in one line (for the sidecar)
   items   three a phase; the third tests whether the phase landed.
           weight  what the scale prints, exactly (a zero on the end is printed, never tidied away)
           of      the written form this question is about (the printed one, or the tidied one in phase 4)
           kind    top = the numerator only · places = count the printed places and write the fraction
                   back = the fraction is on the bench, write the weight it came from (a decimal)
                   compare = both rows, the beam and the written-form panel
           near    the item's own misconception, which judge() must reject */
const PHASES = [
  {
    n: 1,
    concept: "Dropping the point to get the top",
    conceptId: "M2.S4.T7.C30", objectiveIds: ["O11"],
    says: ["A weight sits on the pan and the scale prints it.", "The dot comes out first, and the digits that are left make the top number."],
    ladder: ["Count the digits on the display, then count the ones you wrote.", "Every digit comes across. Only the dot is left behind."],
    closing: "The numerator is the digits with the point taken out and nothing else changed.",
    learned: "You learned: the dot comes out and every digit stays.",
    traceback: "The dot lifts out to its rest and the digits close up into the top number, written in full.",
    items: [
      /* learn ML1: answer in the plan = 63/10; this phase asks for the top number alone */
      { qid: "M2.S4.T7.C30:ML1", kind: "top", weight: "6.3", of: "6.3", unit: "kg", answer: 63, near: "6.3",
        ask: "The top number", say: "The pan reads 6.3 kilograms. What is the top number of its fraction?",
        miss: "How many digits does the display print?" },
      /* practice 1: answer in the plan = 84/10 */
      { qid: "M2.S4.T7.C30:1", kind: "top", weight: "8.4", of: "8.4", unit: "kg", answer: 84, near: "8",
        ask: "The top number", say: "The next weight is 8.4 kilograms. Give me the top number again.",
        miss: "Did one digit stay behind with the dot?" },
      /* practice 2: answer in the plan = 157, the digits with the point taken out */
      { qid: "M2.S4.T7.C30:2", kind: "top", weight: "15.7", of: "15.7", unit: "kg", answer: 157, near: "15",
        ask: "The top number", say: "This weight has two digits before the dot. Write the top number for 15.7.",
        miss: "Two digits stand to the left here. Count them all." },
    ],
  },
  {
    n: 2,
    concept: "Building the bottom from the places",
    conceptId: "M2.S4.T7.C31", objectiveIds: ["O11"],
    says: ["This bench wants both numbers, the top one and the bottom one.", "Count the places after the dot, then write one and that many zeros underneath."],
    ladder: ["How many places did you light? The zeros must match them.", "One zero for one place, two zeros for two places."],
    closing: "The denominator is one followed by a zero for every decimal place.",
    learned: "You learned: one zero underneath for every place after the dot.",
    traceback: "The place counter runs again from the dot outwards, then the bottom is drawn one zero at a time under the count.",
    items: [
      /* learn ML2: answer in the plan = 4528/100 */
      { qid: "M2.S4.T7.C31:ML2", kind: "places", weight: "45.28", of: "45.28", unit: "kg", parts: SLOT_FRACTION, answer: [4528, 100], near: [4528, 10],
        ask: "Write the fraction", say: "The pan reads 45.28 kilograms. Build the bottom and give me the whole fraction.",
        miss: "How many digits stand after the dot here?" },
      /* practice 3: answer in the plan = 3062/100 */
      { qid: "M2.S4.T7.C31:3", kind: "places", weight: "30.62", of: "30.62", unit: "kg", parts: SLOT_FRACTION, answer: [3062, 100], near: [3062, 10],
        ask: "Write the fraction", say: "The next weight is 30.62 kilograms. Work the bench the same way.",
        miss: "Light each place after the dot, one at a time." },
      /* practice 4: answer in the plan = 7209/1000, three places giving one followed by three zeros */
      { qid: "M2.S4.T7.C31:4", kind: "places", weight: "7.209", of: "7.209", unit: "kg", parts: SLOT_FRACTION, answer: [7209, 1000], near: [7209, 3],
        ask: "Write the fraction", say: "This pan reads 7.209 kilograms. Count its places, then write it as a fraction.",
        miss: "Run the counter all the way out before you build." },
    ],
  },
  {
    n: 3,
    concept: "A zero on the end still counts",
    conceptId: "M2.S4.T7.C32", objectiveIds: ["O12"],
    says: ["This display ends in a zero, and the scale printed it on purpose.", "A printed zero sits in a place of its own, so count it too."],
    ladder: ["Start at the dot and count outwards. Stop at the last printed digit.", "The zero is standing in a place. Nothing is spare here."],
    closing: "A trailing zero takes a decimal place of its own, so the denominator comes out one zero longer.",
    learned: "You learned: a printed zero on the end takes a place of its own.",
    traceback: "The weight is read again exactly as printed, the last zero lights like every other place, and the bottom is built a zero longer.",
    items: [
      /* learn ML3: answer in the plan = three decimal places, so 1450/1000 kg */
      { qid: "M2.S4.T7.C32:ML3", kind: "places", weight: "1.450", of: "1.450", unit: "kg", parts: SLOT_FRACTION, answer: [1450, 1000], near: [145, 100],
        ask: "Write the fraction", say: "A scale prints a weight as 1.450 kilograms. Write that as a fraction.",
        miss: "Does that last zero sit in a place, or not?" },
      /* practice 5: answer in the plan = 260/100 */
      { qid: "M2.S4.T7.C32:5", kind: "places", weight: "2.60", of: "2.60", unit: "m", parts: SLOT_FRACTION, answer: [260, 100], near: [26, 10],
        ask: "Write the fraction", say: "A label reads 2.60 metres. Read it as it stands and write its fraction.",
        miss: "Nothing was tidied here. What did the label actually print?" },
      /* practice 6: the plan asks whether 4.500 and 4.5 are the same amount and the same written form.
         Run backwards instead, so the child can answer it in the slot: the bench holds the fraction and
         the child writes the weight it came from. A tidier writes 4.5 and loses two printed places. */
      { qid: "M2.S4.T7.C32:6", kind: "back", weight: "4.500", of: "4.500", unit: "kg", given: [4500, 1000], answer: "4.500", near: "4.5",
        ask: "Write the weight", say: "The bench built this fraction from a weight. Write the weight the scale printed.",
        miss: "Count the zeros underneath. They tell you how many places." },
    ],
  },
  {
    n: 4,
    concept: "The right amount can still be the wrong answer",
    conceptId: "M2.S4.T7.C33", objectiveIds: ["O12"],
    says: ["Tidy first drops a zero off the end and runs the bench again.", "Watch the beam hold level while the two written answers stand apart."],
    ladder: ["Which row did the question ask about, the printed one or the tidied one?", "The beam will not move. The writing still changes."],
    closing: "A trailing zero leaves the amount alone and takes a decimal place. It changes the denominator, not the weight.",
    learned: "You learned: the same amount can still be a different written answer.",
    traceback: "Both rows are run and hung on the beam, which holds level, while the panel stands the two written forms apart.",
    items: [
      /* learn ML4: answer in the plan = 145/100, the same weight and not the number that was printed.
         near: the brief's first Wrong here (the two cannot both be right, so one is rubbed out): the child
         keeps the printed fraction and rubs the tidied one out. The second Wrong (tidying by habit) gives
         the right answer on this item, which asks for the tidied row; it is items 7 and 8's near miss. */
      { qid: "M2.S4.T7.C33:ML4", kind: "compare", weight: "1.450", of: "1.45", row: "tidied", unit: "kg", parts: SLOT_FRACTION, answer: [145, 100], near: [1450, 1000],
        ask: "The tidied fraction", say: "Tidy that same 1.450 kilogram weight first, then convert it. What comes out?",
        miss: "How many places are left once the end zero goes?" },
      /* practice 7: answer in the plan = the printed one, because 130/100 is the written form asked about */
      { qid: "M2.S4.T7.C33:7", kind: "compare", weight: "1.30", of: "1.30", row: "printed", unit: "m", parts: SLOT_FRACTION, answer: [130, 100], near: [13, 10],
        ask: "The printed fraction", say: "A height is printed as 1.30 metres. Write the fraction for the printed form.",
        miss: "The printed row is the one that was asked about." },
      /* practice 8: answer in the plan = 5250/1000; a child who tidied first would have written 525/100 */
      { qid: "M2.S4.T7.C33:8", kind: "compare", weight: "5.250", of: "5.250", row: "printed", unit: "kg", parts: SLOT_FRACTION, answer: [5250, 1000], near: [525, 100],
        ask: "The printed fraction", say: "A bag is printed as 5.250 kilograms. Convert it as it stands, end zero and all.",
        miss: "Did you count the zero the scale printed on the end?" },
    ],
  },
];

/* ── the working area's own numbers, rows and boxes (they go into the sidecar too) ────────── */
const SBL = {
  pan: { x: 30, y: 62, w: 224, h: 26 },
  body: { x: 8, y: 112, w: 268, h: 286 },
  disp: { x: 30, y: 172, w: 224, h: 118 },
  carry: { x: 330, y: 150, w: 332, h: 150 },
  rest: { x: 700, y: 175, w: 104, h: 104 },
  tray: { x: 836, y: 150, w: 224, h: 150 },
  cards: { x: 398, y: 126, card: 96, pitch: 112 },
  dotAt: { x: 352, y: 174 },
  count: { x: 330, y: 276, w: 212, h: 110 },
  frac: { x: 812, y: 112, w: 250, h: 274 },
  rows: [{ y: 10 }, { y: 146 }],
  plate: { x: 0, w: 250, h: 100 },
  fcards: { x: 296, card: 88, pitch: 102 },
  rfrac: { x: 786, w: 236, h: 138 },
  tidy: { x: 0, y: 262, w: 250, h: 76 },
  beam: { x: 296, y: 256, w: 420, h: 150 },
  panel: { x: 766, y: 262, w: 296, h: 150 },
  keys: { x: 568, y: 250, w: 206, h: 72, gap: 84 },
  can: { x: 2, y: 436, w: 178, h: 72, pitch: 181 },
};
/* the can do list along the foot: six statements, each ticked against work that is standing on the
   bench, never against the abstract. A statement a child cannot see done yet cannot be ticked. */
const CAN = [{ a: "the dot", b: "came out" }, { a: "places", b: "counted" }, { a: "one and", b: "zeros" },
  { a: "the end", b: "zero too" }, { a: "beam", b: "is level" }, { a: "forms", b: "differ" }];
const SB_FREE = [{ weight: "2.750", unit: "kg" }, { weight: "0.60", unit: "m" }, { weight: "9.2", unit: "kg" }];
const MODEL = { layout: SBL, freeWeights: SB_FREE.map((f: any) => f.weight), canDo: CAN.map((c: any) => c.a + " " + c.b),
  method: ["digits without the point are the numerator", "count the printed places", "one and that many zeros underneath"] };

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* judge: a fraction wants both boxes; a written decimal is compared exactly, zeros on the end and all */
const judge = (item: any, v: any) => {
  if (item.parts) return judgeSlotParts(item, v);
  if (typeof item.answer === "number") return leadNumber(v) === item.answer;
  return String(v).trim() === String(item.answer).trim();
};
/* oracle: a second route that shares nothing with judge or the picture. The written form is walked
   character by character: every digit is pushed into the numerator, every character after the dot
   counts one place, and the denominator is one multiplied by ten once per place. The backwards item
   is proved the other way, by putting the dot back that many characters from the right. */
const oracle = () => PHASES.every((p: any) => p.items.every((it: any) => {
  const s = String(it.of || "");
  let num = 0, after = false, places = 0;
  for (const ch of s) {
    if (ch === ".") { if (after) return false; after = true; continue; }
    const d = "0123456789".indexOf(ch);
    if (d < 0) return false;
    num = num * 10 + d;
    if (after) places += 1;
  }
  let den = 1;
  for (let k = 0; k < places; k++) den *= 10;
  if (it.kind === "top") return it.answer === num;
  if (it.kind === "back") {
    const g = it.given || [];
    if (g[0] !== num || g[1] !== den) return false;
    let z = 0, q = g[1];
    while (q > 1) { q = q / 10; z += 1; }
    const ds = String(g[0]);
    return String(it.answer) === ds.slice(0, ds.length - z) + "." + ds.slice(ds.length - z);
  }
  return Array.isArray(it.answer) && it.answer[0] === num && it.answer[1] === den;
}));
/* the item's own misconception: the dot kept in the top, a digit left behind, ten underneath whatever,
   the count written underneath, the end zero rubbed off, the tidied row answered for the printed one,
   and the tidied answer rubbed out because two different forms cannot both be right */
const nearMiss = (item: any) => item.near;
/* the forms of an answer that no question, hint or ladder line may print (no commas inside a fraction
   or a decimal: the chapter counts digits and zeros, so 2750/1000 is written plain) */
const answerForms = (item: any) => (item.parts ? item.answer.filter((x: number) => x >= 10).flatMap((x: number) => [String(x), indian(x), words(x)])
  : typeof item.answer === "number" ? [String(item.answer), indian(item.answer), words(item.answer)]
    : [String(item.answer), speakable(item.answer)]);
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => item.answer;

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => T.submit(item.answer);
/* a written decimal has to reach the slot with its dot: the runtime's own typing keeps digits only */
const answer = (item: any, v: any) => (HOOK.set ? HOOK.set(item, v) : undefined);
/* the agent's check() before Enter: nothing waits on the working area, so Enter answers */
const check = () => (HOOK.check ? HOOK.check() : undefined);

/* ── drawing ─────────────────────────────────────────────────────────────────────────────── */

const SB_CSS = `
.sb-move{transition:transform 460ms cubic-bezier(.3,.7,.25,1)}
.sb-grab{cursor:grab}
@media (prefers-reduced-motion:reduce){.sb-move{transition:none}}
`;

const sbInk = { left: shade(CONTENT.hundred, 0.25), right: shade(CONTENT.one, 0.25), dot: shade(CONTENT.pointer, 0.15), zero: "#767676" };
const sbAdv = (ch: string, f: number) => (ch === "." ? 0.30 : 0.58) * f;
const sbWide = (s: string, f: number) => s.split("").reduce((w: number, c: string) => w + sbAdv(c, f), 0);
const sbDecs = (s: string) => (String(s).split(".")[1] || "").split("");
const sbTop = (s: string) => Number(String(s).replace(".", ""));
const sbBottom = (s: string) => Math.pow(10, sbDecs(s).length);
const sbTidy = (s: string) => (/0$/.test(String(s)) && String(s).indexOf(".") >= 0 ? String(s).slice(0, -1) : String(s));

/** A printed weight, drawn as one reading: digits left of the dot deep blue, digits right of it green,
    a zero standing on the end grey at the same size, and the dot itself between them. `hole` leaves the
    dot's own space empty, for the phase where the child has taken it out. */
function SbRead({ cx, base, s, size, hole }: any) {
  const i = String(s).indexOf(".");
  const L = i < 0 ? String(s) : String(s).slice(0, i), R = i < 0 ? "" : String(s).slice(i + 1);
  const tail = R.replace(/0+$/, "").length;
  return (
    <text x={cx - sbWide(String(s), size) / 2} y={base} textAnchor="start" fontSize={size} fontWeight={700} fill={sbInk.left}>
      <tspan fill={sbInk.left}>{L}</tspan>
      {i >= 0 && (hole ? <tspan>{" "}</tspan> : <tspan fill={sbInk.dot}>.</tspan>)}
      {R.slice(0, tail) ? <tspan fill={sbInk.right}>{R.slice(0, tail)}</tspan> : null}
      {tail < R.length ? <tspan fill={sbInk.zero}>{R.slice(tail)}</tspan> : null}
    </text>
  );
}

/** The kitchen scale: a pan on a post, a body, and the printing display. */
function SbScale({ C, s, unit, hole, blank, places }: any) {
  const p = SBL.pan, b = SBL.body, d = SBL.disp;
  return (
    <g>
      <path d={`M ${p.x - 14} ${p.y + p.h} L ${p.x + 10} ${p.y} L ${p.x + p.w - 10} ${p.y} L ${p.x + p.w + 14} ${p.y + p.h} Z`}
        fill={tint(C.rule, 0.45)} stroke={C.rule} strokeWidth={2} />
      <rect x={b.x + b.w / 2 - 12} y={p.y + p.h} width={24} height={b.y - p.y - p.h} fill={tint(C.rule, 0.3)} />
      <rect x={b.x} y={b.y} width={b.w} height={b.h} rx={RAD.card} fill="url(#gPanel)" stroke={C.rule} strokeWidth={2} filter="url(#fShadowSoft)" />
      <rect x={d.x} y={d.y} width={d.w} height={d.h} rx={RAD.panel} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} />
      {!blank && <SbRead cx={d.x + d.w / 2} base={d.y + d.h / 2 + 22} s={s} size={T.xl} hole={hole} />}
      {blank && (places || []).map((k: number) => (
        <rect key={k} x={d.x + d.w / 2 - 40 + k * 44} y={d.y + d.h / 2 - 22} width={34} height={44} rx={8}
          fill="none" stroke={C.rule} strokeWidth={2} strokeDasharray="6 6" />
      ))}
      <text x={b.x + b.w / 2} y={b.y + b.h - 34} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{unit}</text>
    </g>
  );
}

/** A fraction, stacked: the top number over a level rule over the bottom number. */
function SbFrac({ cx, base, num, den, size, C }: any) {
  const wide = Math.max(String(num == null ? "" : num).length, String(den == null ? "" : den).length) * size * 0.6 + 22;
  return (
    <g>
      {num != null && <text x={cx} y={base} textAnchor="middle" fontSize={size} fontWeight={700} fill={C.ink}>{num}</text>}
      <rect x={cx - wide / 2} y={base + size * 0.24} width={wide} height={5} rx={2.5} fill={C.ink} />
      {den != null && <text x={cx} y={base + size * 1.28} textAnchor="middle" fontSize={size} fontWeight={700} fill={C.ink}>{den}</text>}
    </g>
  );
}

/* a place keeps its own colour across the book: tenths amber, hundredths rose, thousandths blue */
const SB_PLACE = [CONTENT.ten, CONTENT.bead, CONTENT.hundred];
/** One printed decimal place, blown up so a finger can reach it: lit in its place's colour once counted. */
function SbPlace({ x, y, w, ch, lit, zero, place, C }: any) {
  const hue = SB_PLACE[Math.min(place || 0, SB_PLACE.length - 1)];
  return (
    <g>
      <rect x={x} y={y} width={w} height={w} rx={RAD.key} fill={lit ? tint(hue, 0.3) : "#FFFFFF"}
        stroke={lit ? shade(hue, 0.35) : C.rule} strokeWidth={lit ? 3 : 2} />
      <text x={x + w / 2} y={y + w / 2 + 18} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={zero && !lit ? sbInk.zero : C.ink}>{ch}</text>
    </g>
  );
}

/* ── the working area: 1086 x 528, origin at its top-left ────────────────────────────────── */
function Work({ phase, n, item, index, stage, wrong, typed, api, MODEL, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();
  const free = stage === "free";
  const [freeK, setFreeK] = useState(0);
  const [out, setOut] = useState(false);       /* phase 1: the dot has been taken out */
  const [lit, setLit] = useState(0);           /* places the child has counted on the asked row */
  const [tidied, setTidied] = useState(false); /* phase 4 / free play: the lower row has been run */
  const [demo, setDemo] = useState<any>(null); /* the correction's own layer: it never writes the child's pieces */
  const [touched, setTouched] = useState(false);
  const [ticks, setTicks] = useState<any>({});  /* the can do list, kept across the questions of a phase */
  const outRef = useRef(false); outRef.current = out;
  const litRef = useRef(0); litRef.current = lit;
  const tidyRef = useRef(false); tidyRef.current = tidied;
  const setupFor = useRef<any>(-2);
  const busy = tl.busy;

  const cur: any = free ? { ...SB_FREE[freeK], kind: "free", of: SB_FREE[freeK].weight } : item;
  const kind = free ? "free" : cur.kind;
  const printed = String(cur.weight || "");
  const tidyStr = sbTidy(printed);
  const rowOf = kind === "compare" ? cur.row : "printed";
  const shownStr = rowOf === "tidied" ? tidyStr : printed;
  const decs = sbDecs(printed), decsT = sbDecs(tidyStr);
  const askDecs = rowOf === "tidied" ? decsT : decs;
  const given = cur.given || [];
  /* the backwards item: one printed place for every zero under the one, read off the given bottom */
  const givenZeros = Math.max(0, String(given[1] || "").length - 1);

  /* the correction is a layer of its own: the child's dot, lit places and tidied row are never written */
  const clearDemo = () => { if (demo) setDemo(null); };
  const reset = () => {
    tl.stop();
    setOut(false); setLit(0); setTidied(false); setDemo(null); setTouched(false);
    api.lock(false);
  };
  useEffect(() => {
    if (free) return;
    if ((stage === "ask" || stage === "teach") && setupFor.current !== index) { setupFor.current = index; reset(); }
  }, [stage, index]);
  useEffect(() => { if (free) { setupFor.current = -3; reset(); setFreeK(0); } }, [free]);
  /* the can do list is a self check over a whole phase, so it outlives a question but not a phase */
  useEffect(() => { setTicks({}); }, [n, free]);

  /* ── the child's acts ── */
  const canPlay = !busy && (stage === "ask" || free);
  const liftDot = () => { setOut(true); api.sfx.tick(); };
  const dropDot = (moved: boolean, p: any) => {
    if (!canPlay || outRef.current) return;
    if (moved && p && p.x > SBL.carry.x && p.x < SBL.carry.x + SBL.carry.w && p.y > SBL.carry.y && p.y < SBL.carry.y + SBL.carry.h) return;
    setTouched(true); clearDemo(); liftDot();
  };
  const drag = useDrag((pay: any, p: any, moved: boolean) => dropDot(moved, p));
  const countPlace = (k: number) => {
    if (!canPlay || k !== litRef.current) return;
    setTouched(true); clearDemo(); setLit(k + 1); api.sfx.tick();
  };
  const runTidy = () => {
    if (!canPlay || tidyRef.current) return;
    setTouched(true); clearDemo(); setTidied(true); setLit(0); api.sfx.tick();
  };
  const nextWeight = () => { if (busy) return; setFreeK((k: number) => (k + 1) % SB_FREE.length); setLit(0); setTidied(false); };

  /* Enter: on the first phase the dot comes out as the answer goes in, so the act is always made */
  const enterFn: any = stage === "ask" && kind === "top" && !busy ? (v: any) => {
    if (v === "" || v === null || v === undefined) return;
    if (outRef.current) { api.submit(v); return; }
    clearDemo();
    tl.run([[50, () => liftDot()]], () => api.submit(v));
  } : null;
  api.onEnter(enterFn);
  /* a written decimal keeps its dot on the way to the slot */
  HOOK.set = (it: any, v: any) => (typeof it.answer === "string" ? (api.setTyped(String(v)), true) : undefined);

  /* ── the win: the bench finishes the work the child's answer called for ── */
  useEffect(() => {
    if (stage !== "win") return;
    const S: any[] = [];
    if (kind === "top") { S.push([80, () => setDemo({ out: true })]); S.push([420, () => setDemo({ out: true, num: true })]); }
    else if (kind === "places") { S.push([80, () => setDemo({ lit: decs.length, zeros: decs.length, whole: true })]); }
    else if (kind === "back") { S.push([80, () => setDemo({ zeros: givenZeros, done: true })]); }
    else if (kind === "compare") {
      S.push([80, () => setDemo({ tidy: true, lit: askDecs.length, frac: true })]);
      S.push([620, () => setDemo({ tidy: true, lit: askDecs.length, frac: true, beam: true })]);
    }
    tl.run(S);
  }, [stage]);

  /* ── the traceback: the mathematics redrawn in steps, ending on the whole right answer.
        Nothing is marked, nothing resets, and the child's own pieces are left exactly as they stand. ── */
  useEffect(() => {
    if (!wrong || stage !== "ask") return;
    api.lock(true);
    setTouched(true);
    const S: any[] = [];
    if (kind === "top") {
      /* the weight is carried across again (the path and the bench step light), the dot lifts out
         only if the answer went in with it still standing, and the digits close up into the top number */
      S.push([520, () => setDemo({ carry: true })]);
      if (!outRef.current) S.push([640, () => setDemo({ carry: true, out: true })]);
      S.push([700, () => setDemo({ carry: true, out: true, num: true })]);
    } else if (kind === "places") {
      S.push([420, () => setDemo({ lit: 0, zeros: -1 })]);
      decs.forEach((_: string, k: number) => S.push([460, () => setDemo({ lit: k + 1, zeros: -1 })]));
      S.push([420, () => setDemo({ lit: decs.length, zeros: 0 })]);
      decs.forEach((_: string, k: number) => S.push([340, () => setDemo({ lit: decs.length, zeros: k + 1 })]));
      S.push([460, () => setDemo({ lit: decs.length, zeros: decs.length, whole: true })]);
    } else if (kind === "back") {
      for (let k = 1; k <= givenZeros; k++) S.push([460, () => setDemo({ zeros: k })]);
      S.push([620, () => setDemo({ zeros: givenZeros, done: true })]);
    } else if (kind === "compare") {
      /* tidying is a one-way act, never a toggle, so the correction leaves the lower row really
         standing: the child's next tap on a place carries on from it instead of undoing it */
      S.push([460, () => { setTidied(true); setDemo({ tidy: true, lit: 0 }); }]);
      askDecs.forEach((_: string, k: number) => S.push([420, () => setDemo({ tidy: true, lit: k + 1 })]));
      S.push([480, () => setDemo({ tidy: true, lit: askDecs.length, frac: true })]);
      S.push([640, () => setDemo({ tidy: true, lit: askDecs.length, frac: true, beam: true })]);
    }
    tl.run(S, () => api.lock(false));
  }, [wrong]);

  /* ── the pieces on the stage ── */
  const written = stage === "win" || stage === "idle" || (!!demo && (demo.whole || demo.num || demo.frac || demo.done));
  const dLit = demo && demo.lit != null ? Math.max(demo.lit, kind === "compare" ? 0 : lit) : lit;
  const dOut = out || !!(demo && demo.out);
  const carried = !!(demo && demo.carry);   /* phase 1's correction: the weight carried across again */
  const dTidy = tidied || !!(demo && demo.tidy);
  /* A statement can be ticked only while the work it is about is really drawn on this screen, which is
     not the same as "this question has been answered": phase 1 builds no denominator at all, so its
     bottom-number statement stays off however the child reaches the question. */
  const topOn = free || (kind === "top" ? dOut || !!(demo && demo.num) : kind === "back" ? true
    : kind === "compare" ? !!(demo && demo.frac) : written);
  const denOn = free ? lit > 0 : kind === "back" ? true : kind === "compare" ? !!(demo && demo.frac)
    : kind === "places" ? !!(demo && demo.zeros >= 0) : false;
  const endOn = /0$/.test(printed) && decs.length > 0
    && (kind === "compare" ? !!(demo && demo.frac) : dLit >= decs.length);
  const beamOn = free ? tidied : !!(demo && demo.beam);
  const tickOn = [topOn, dLit > 0, denOn, endOn, beamOn, beamOn];
  const toggleTick = (k: number) => {
    if (busy || !tickOn[k]) return;
    setTicks((t: any) => ({ ...t, [k]: !t[k] }));
    api.sfx.tick();
  };

  /* ── what the host and the agent read back (never an answer before it is given) ── */
  api.share({
    printed, numerator: written ? sbTop(shownStr) : null, placesCounted: demo ? demo.lit ?? lit : lit,
    denominator: written ? sbBottom(shownStr) : null, tidiedRow: dTidy, balanced: !!(demo && demo.beam),
    ticked: CAN.filter((_: any, k: number) => ticks[k]).length, complete: stage === "idle",
  });
  const carrySize = T.display;
  const carryCx = SBL.carry.x + SBL.carry.w / 2, carryBase = SBL.carry.y + SBL.carry.h / 2 + 24;
  const dotX = carryCx - sbWide(printed, carrySize) / 2 + sbWide(printed.slice(0, printed.indexOf(".")), carrySize) + sbAdv(".", carrySize) / 2;
  const dotY = carryBase - carrySize * 0.18;
  const restCx = SBL.rest.x + SBL.rest.w / 2, restCy = SBL.rest.y + SBL.rest.h / 2;
  const dragging = drag.drag && drag.drag.moved;

  const invite = stage === "ask" && !busy && !wrong && !touched
    ? kind === "top" ? { x: dotX, y: dotY, r: 48 }
      : kind === "places" || kind === "back" ? { x: SBL.cards.x + SBL.cards.card / 2, y: SBL.cards.y + SBL.cards.card / 2, r: 60 }
        : kind === "compare" ? (rowOf === "tidied" && !dTidy ? { x: SBL.tidy.x + SBL.tidy.w / 2, y: SBL.tidy.y + SBL.tidy.h / 2, r: 54 }
          : { x: SBL.fcards.x + SBL.fcards.card / 2 + lit * SBL.fcards.pitch, y: SBL.rows[rowOf === "tidied" ? 1 : 0].y + 6 + SBL.fcards.card / 2, r: 54 }) : null
    : null;

  const total = free ? 0 : phase.items.length;
  const doneN = stage === "idle" || stage === "summary" ? total : index + (stage === "win" ? 1 : 0);

  /* the bottom number the bench has written, as a reading: one, then a zero for every counted place */
  const denText = (zeros: number) => "1" + new Array(Math.max(0, zeros)).fill("0").join("");

  return (
    <g>
      <style>{SB_CSS}</style>

      {!free && (
        <g data-zone="runs">
          <rect x={0} y={-94} width={330} height={76} rx={RAD.panel} fill="url(#gPanel)" stroke={C.rule} strokeWidth={2} />
          <text x={22} y={-38} fontSize={T.speech} fontWeight={700} fill={C.ink}>{lang === "hi" ? total + " में से " + doneN : lang === "gu" ? total + " માંથી " + doneN : doneN + " of " + total}</text>
          <text x={308} y={-44} textAnchor="end" fontSize={T.micro} fontWeight={500} fill={C.ink}>{tx("weights")}</text>
        </g>
      )}

      {/* ── phases 1 to 3 and free play: the scale, the bench, the counter ── */}
      {kind !== "compare" && (
        <g>
          <SbScale C={C} s={printed} unit={tx(cur.unit)} hole={kind === "top" && dOut} blank={kind === "back" && !(demo && demo.done)}
            places={new Array(kind === "back" ? Math.max(lit, demo ? demo.zeros || 0 : 0) : 0).fill(0).map((_: number, k: number) => k)} />
        </g>
      )}

      {/* phase 1: the weight carried across, the dot that comes out, and the top number it leaves */}
      {kind === "top" && (
        <g>
          <path d={`M ${SBL.disp.x + SBL.disp.w + 10} ${SBL.disp.y + 58} C 330 ${SBL.disp.y + 40}, 300 ${carryBase - 20}, ${SBL.carry.x - 8} ${carryBase - 20}`}
            fill="none" stroke={carried ? C.accent : C.rule} strokeWidth={carried ? 5 : 3} strokeDasharray={carried ? "" : "8 10"} />
          <rect x={SBL.carry.x} y={SBL.carry.y} width={SBL.carry.w} height={SBL.carry.h} rx={RAD.card} fill="#FFFFFF"
            stroke={carried ? C.accent : C.rule} strokeWidth={carried ? 4 : 2} />
          <SbRead cx={carryCx} base={carryBase} s={printed} size={carrySize} hole={dOut} />

          <text x={restCx} y={SBL.rest.y - 20} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("the dot")}</text>
          <rect x={SBL.rest.x} y={SBL.rest.y} width={SBL.rest.w} height={SBL.rest.h} rx={RAD.panel}
            fill={dOut ? tint(CONTENT.pointer, 0.82) : "none"} stroke={C.rule} strokeWidth={2} strokeDasharray="7 8" />
          {dOut && <circle cx={restCx} cy={restCy} r={17} fill={sbInk.dot} />}

          <text x={SBL.tray.x + SBL.tray.w / 2} y={SBL.tray.y - 20} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("top number")}</text>
          <rect x={SBL.tray.x} y={SBL.tray.y} width={SBL.tray.w} height={SBL.tray.h} rx={RAD.card}
            fill={demo && demo.num ? tint(C.panel, 0.4) : "none"} stroke={C.rule} strokeWidth={2} strokeDasharray={demo && demo.num ? "" : "8 9"} />
          {demo && demo.num && (
            <text x={SBL.tray.x + SBL.tray.w / 2} y={carryBase} textAnchor="middle" fontSize={carrySize} fontWeight={700} fill={C.ink}>{sbTop(printed)}</text>
          )}

          {!dOut && !dragging && (
            <g className="sb-grab" {...control("dot", "Take the dot out")} {...drag.bind({ src: "dot" })} {...drag.keys({ src: "dot" })}>
              <rect x={dotX - 36} y={dotY - 36} width={72} height={72} rx={RAD.key} fill="transparent" />
              <circle cx={dotX} cy={dotY} r={17} fill={sbInk.dot} />
            </g>
          )}
          {dragging && <circle cx={Math.max(20, Math.min(W.w - 20, drag.drag.x))} cy={Math.max(20, Math.min(W.h - 20, drag.drag.y))} r={19} fill={sbInk.dot} pointerEvents="none" />}
        </g>
      )}

      {/* phases 2 and 3 and free play: the places to count, the count, and the fraction being built */}
      {(kind === "places" || kind === "free") && (
        <g>
          <text x={SBL.cards.x + 40} y={SBL.cards.y - 22} textAnchor="start" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("places after the dot")}</text>
          <circle cx={SBL.dotAt.x} cy={SBL.cards.y + SBL.cards.card / 2} r={15} fill={sbInk.dot} />
          {(free && tidied ? decsT : decs).map((ch: string, k: number) => {
            const x = SBL.cards.x + k * SBL.cards.pitch;
            const on = k < dLit;
            return (
              <g key={k}>
                <SbPlace x={x} y={SBL.cards.y} w={SBL.cards.card} ch={ch} lit={on} zero={ch === "0"} place={k} C={C} />
                {canPlay && k === lit && <Hit id={"place-" + (k + 1)} x={x} y={SBL.cards.y} w={SBL.cards.card} h={SBL.cards.card}
                  onPress={() => countPlace(k)} label={"Count place " + (k + 1)} />}
              </g>
            );
          })}
          <rect x={SBL.count.x} y={SBL.count.y} width={SBL.count.w} height={SBL.count.h} rx={RAD.panel} fill="url(#gPanel)" stroke={C.rule} strokeWidth={2} />
          <text x={SBL.count.x + 20} y={SBL.count.y + 34} fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("counted")}</text>
          <text x={SBL.count.x + SBL.count.w / 2} y={SBL.count.y + 94} textAnchor="middle" fontSize={T.xl} fontWeight={700}
            fill={C.ink}>{dLit}</text>

          <text x={SBL.frac.x + SBL.frac.w / 2} y={SBL.frac.y - 22} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("the fraction")}</text>
          <rect x={SBL.frac.x} y={SBL.frac.y} width={SBL.frac.w} height={SBL.frac.h} rx={RAD.card} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} />
          {/* the bench writes nothing the question is still asking for: the top number appears only
              once the answer is in or the correction is laying it down, exactly as the bottom does */}
          <SbFrac cx={SBL.frac.x + SBL.frac.w / 2} base={SBL.frac.y + 96} size={T.xl} C={C}
            num={free ? sbTop(tidied ? tidyStr : printed) : written || demo ? sbTop(printed) : null}
            den={free ? (lit ? Number(denText(lit)) : null) : demo && demo.zeros >= 0 ? Number(denText(demo.zeros)) : null} />
        </g>
      )}

      {/* phase 3's last question: the fraction stands on the bench and the weight is written back */}
      {kind === "back" && (
        <g>
          <text x={SBL.frac.x + SBL.frac.w / 2} y={SBL.frac.y - 22} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("the fraction")}</text>
          <rect x={SBL.frac.x} y={SBL.frac.y} width={SBL.frac.w} height={SBL.frac.h} rx={RAD.card} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} />
          <SbFrac cx={SBL.frac.x + SBL.frac.w / 2} base={SBL.frac.y + 96} size={T.xl} C={C} num={given[0]} den={given[1]} />
          <text x={SBL.cards.x + 40} y={SBL.cards.y - 22} textAnchor="start" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("zeros underneath")}</text>
          {new Array(givenZeros).fill(0).map((_: number, k: number) => {
            const x = SBL.cards.x + k * SBL.cards.pitch, on = k < (demo ? demo.zeros || 0 : 0) || k < lit;
            return (
              <g key={k}>
                <SbPlace x={x} y={SBL.cards.y} w={SBL.cards.card} ch="0" lit={on} zero place={k} C={C} />
                {canPlay && k === lit && <Hit id={"place-" + (k + 1)} x={x} y={SBL.cards.y} w={SBL.cards.card} h={SBL.cards.card}
                  onPress={() => countPlace(k)} label={"Count zero " + (k + 1)} />}
              </g>
            );
          })}
          <rect x={SBL.count.x} y={SBL.count.y} width={SBL.count.w} height={SBL.count.h} rx={RAD.panel} fill="url(#gPanel)" stroke={C.rule} strokeWidth={2} />
          <text x={SBL.count.x + 20} y={SBL.count.y + 34} fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("places")}</text>
          <text x={SBL.count.x + SBL.count.w / 2} y={SBL.count.y + 94} textAnchor="middle" fontSize={T.xl} fontWeight={700}
            fill={C.ink}>{Math.max(dLit, demo ? demo.zeros || 0 : 0)}</text>
        </g>
      )}

      {/* phase 4: the printed row, the tidied row, the beam and the written forms */}
      {kind === "compare" && (
        <g>
          {[printed, tidyStr].map((s: string, r: number) => {
            const y = SBL.rows[r].y, shownRow = r === 0 || dTidy;
            const ds = sbDecs(s), asked = (rowOf === "tidied") === (r === 1);
            const rlit = asked ? dLit : shownRow ? ds.length : 0;
            return (
              <g key={r}>
                <rect x={SBL.plate.x} y={y} width={SBL.plate.w} height={SBL.plate.h} rx={RAD.panel} fill={shownRow ? "#FFFFFF" : "none"}
                  stroke={asked ? C.accent : C.rule} strokeWidth={asked ? 4 : 2} strokeDasharray={shownRow ? "" : "8 9"} />
                {shownRow && <SbRead cx={SBL.plate.x + SBL.plate.w / 2} base={y + 68} s={s} size={T.speech} />}
                {shownRow && ds.map((ch: string, k: number) => {
                  const x = SBL.fcards.x + k * SBL.fcards.pitch, on = k < rlit;
                  return (
                    <g key={k}>
                      <SbPlace x={x} y={y + 6} w={SBL.fcards.card} ch={ch} lit={on} zero={ch === "0"} place={k} C={C} />
                      {canPlay && asked && k === lit && <Hit id={"place-" + (k + 1)} x={x} y={y + 6} w={SBL.fcards.card} h={SBL.fcards.card}
                        onPress={() => countPlace(k)} label={"Count place " + (k + 1)} />}
                    </g>
                  );
                })}
                {shownRow && demo && demo.frac && (
                  <SbFrac cx={SBL.rfrac.x + SBL.rfrac.w / 2} base={y + 52} size={T.speech} C={C} num={sbTop(s)} den={sbBottom(s)} />
                )}
              </g>
            );
          })}
          <Key id="tidy" label="Tidy first" x={SBL.tidy.x} y={SBL.tidy.y} w={SBL.tidy.w} h={SBL.tidy.h} C={C} primary={!dTidy} disabled={dTidy || !canPlay} onClick={runTidy}>
            <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={dTidy || !canPlay ? C.ink : "#FFFFFF"}>{tx("tidy first")}</text>
          </Key>

          {demo && demo.beam && (
            <g>
              {/* the beam is named the way the written-form panel is: two instruments, side by side,
                  one about how much and one about how it is written */}
              <text x={SBL.beam.x + 20} y={SBL.beam.y + 34} fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("the amount")}</text>
              <path d={`M ${SBL.beam.x + SBL.beam.w / 2} ${SBL.beam.y + 64} L ${SBL.beam.x + SBL.beam.w / 2 - 44} ${SBL.beam.y + 140} L ${SBL.beam.x + SBL.beam.w / 2 + 44} ${SBL.beam.y + 140} Z`}
                fill={tint(C.rule, 0.4)} stroke={C.rule} strokeWidth={2} />
              <rect x={SBL.beam.x} y={SBL.beam.y + 52} width={SBL.beam.w} height={12} rx={6} fill={C.accent} />
              {[0, 1].map((k: number) => (
                <g key={k}>
                  <line x1={SBL.beam.x + 56 + k * (SBL.beam.w - 112)} y1={SBL.beam.y + 64} x2={SBL.beam.x + 56 + k * (SBL.beam.w - 112)} y2={SBL.beam.y + 100} stroke={C.rule} strokeWidth={3} />
                  <SbFrac cx={SBL.beam.x + 56 + k * (SBL.beam.w - 112)} base={SBL.beam.y + 130} size={T.micro} C={C}
                    num={sbTop(k ? tidyStr : printed)} den={sbBottom(k ? tidyStr : printed)} />
                </g>
              ))}
              <text x={SBL.beam.x + SBL.beam.w / 2} y={SBL.beam.y + 168} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("same amount")}</text>
            </g>
          )}
          {demo && demo.beam && (
            <g>
              <rect x={SBL.panel.x} y={SBL.panel.y} width={SBL.panel.w} height={SBL.panel.h} rx={RAD.panel} fill="url(#gPanel)" stroke={C.rule} strokeWidth={2} />
              <text x={SBL.panel.x + 20} y={SBL.panel.y + 34} fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("written form")}</text>
              <SbRead cx={SBL.panel.x + 118} base={SBL.panel.y + 84} s={printed} size={T.label} />
              <SbRead cx={SBL.panel.x + 118} base={SBL.panel.y + 130} s={tidyStr} size={T.label} />
              <text x={SBL.panel.x + SBL.panel.w - 22} y={SBL.panel.y + 84} textAnchor="end" fontSize={T.micro} fontWeight={700} fill={C.ink}>{decs.length}</text>
              <text x={SBL.panel.x + SBL.panel.w - 22} y={SBL.panel.y + 130} textAnchor="end" fontSize={T.micro} fontWeight={700} fill={C.ink}>{decsT.length}</text>
            </g>
          )}
        </g>
      )}

      {/* free play: any weight on the pan, and the tidied row beside it */}
      {free && (
        <g>
          <Key id="free-weight" label="New weight" x={SBL.keys.x} y={SBL.keys.y} w={SBL.keys.w} h={SBL.keys.h} C={C} primary onClick={nextWeight}>
            <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill="#FFFFFF">{tx("new weight")}</text>
          </Key>
          <Key id="free-tidy" label="Tidy first" x={SBL.keys.x} y={SBL.keys.y + SBL.keys.gap} w={SBL.keys.w} h={SBL.keys.h} C={C}
            disabled={tidied || tidyStr === printed} onClick={runTidy}>
            <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{tx("tidy first")}</text>
          </Key>
          {tidied && (
            <g>
              <rect x={SBL.frac.x - 4} y={SBL.frac.y + SBL.frac.h + 6} width={SBL.frac.w + 8} height={10} rx={5} fill={C.accent} />
              <text x={SBL.frac.x + SBL.frac.w / 2} y={SBL.frac.y + SBL.frac.h + 38} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("same amount")}</text>
            </g>
          )}
        </g>
      )}

      {/* the can do list along the foot: six statements ticked against the work standing on the bench.
          It is never one of the three questions, and the correction never writes it. */}
      <g data-role="reading">
        {CAN.map((c: any, k: number) => {
          const x = SBL.can.x + k * SBL.can.pitch, on = !!ticks[k], live = tickOn[k] && !busy;
          const say = live || on ? C.ink : mix(C.ink, C.panel, 0.25);
          return (
            <g key={k}>
              {/* a chip that cannot be ticked yet is flat and quiet, as a dead pad key is: a solid
                  panel tint, no edge. A dashed frame would read as an empty box waiting to be filled,
                  which is what the dot rest and the empty fraction box already say on this stage. */}
              <rect x={x} y={SBL.can.y} width={SBL.can.w} height={SBL.can.h} rx={RAD.key}
                fill={on ? tint(CONTENT.one, 0.85) : live ? "#FFFFFF" : tint(C.panel, 0.35)}
                stroke={on ? shade(CONTENT.one, 0.25) : live ? C.rule : "none"} strokeWidth={on ? 3 : 1.5} />
              <rect x={x + 12} y={SBL.can.y + 23} width={26} height={26} rx={7} fill={live || on ? "#FFFFFF" : tint(C.panel, 0.05)}
                stroke={on ? shade(CONTENT.one, 0.25) : live ? C.rule : "none"} strokeWidth={2} />
              {on && <path d={`M ${x + 17} ${SBL.can.y + 36} l 6 8 l 12 -16`} fill="none" stroke={shade(CONTENT.one, 0.25)} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" />}
              {/* Devanagari and Gujarati stand taller than Latin: the two lines sit a little further apart */}
              <text x={x + 50} y={SBL.can.y + (lang === "en" ? 30 : 27)} fontSize={T.micro} fontWeight={600} fill={say}>{tx(c.a)}</text>
              <text x={x + 50} y={SBL.can.y + (lang === "en" ? 60 : 62)} fontSize={T.micro} fontWeight={600} fill={say}>{tx(c.b)}</text>
              {live && <Hit id={"can-" + (k + 1)} x={x} y={SBL.can.y} w={SBL.can.w} h={SBL.can.h} onPress={() => toggleTick(k)} label={"I can say: " + c.a + " " + c.b} />}
            </g>
          );
        })}
      </g>

      {invite && <Invite x={invite.x} y={invite.y} r={invite.r} C={C} />}
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase: the weight as the
   scale printed it, and beside it the answer the child gave for it */
function Thumb({ n, result, C, w, h, lang = "en", tx = (v: any) => v }: any) {
  const last = result && result.last;
  const ph: any = PHASES[(n || 1) - 1];
  const it: any = last && ph ? ph.items[last.item] : null;
  if (!it) return null;
  const shownStr = it.row === "tidied" ? sbTidy(String(it.weight)) : String(it.weight);
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      <SbRead cx={w * 0.3} base={h / 2 + 10} s={shownStr} size={T.micro} />
      {it.kind === "top" ? <text x={w * 0.75} y={h / 2 + 10} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={C.ink}>{it.answer}</text>
        : it.kind === "back" ? <SbRead cx={w * 0.75} base={h / 2 + 10} s={String(it.answer)} size={T.micro} />
          : <SbFrac cx={w * 0.75} base={h / 2 - 8} size={T.micro} C={C} num={it.answer[0]} den={it.answer[1]} />}
    </g>
  );
}

function ScaleBench(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, pointKey: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, fitHost: () => null }} />
  );
}

export default ScaleBench;
