/* ═══ M2.S4.T8.C35.2D1 · like_pieces_bench · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the working area already exists.
   THE LESSON IS SILENT (runtime r28): the bubble is the guide, one sentence a screen; every act the child triggers is performed on
   screen with api.act (PATTERNS §15); keyOnly + navDots (the new look). NO imports in this file; only the five host hooks.
   The picture: cake slices (wedges of a disc, one radius R for a loose piece AND a plate, picked per sum from the room), plates ruled in the pinned size.
   The acts of a sum come from its numbers (lpPlan): push or lift, then gather when the top reaches a whole, then reduce when the
   leftover pieces share a factor with the pinned size. */

const TOOL_ID = "like_pieces_bench";
const MEDIA_ID = "M2.S4.T8.C35.2D1";
const TOOL_NAME = "Like Pieces Bench";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
/* kept for the tool object's shape (and the sidecar); nothing speaks from r30 */
const VOICE = {"rate":0.92,"pitch":1.06};

const OPENING = ["Two little heaps, and every piece in both of them is the same size."];
const FINISH_LINE = "Every answer counted and then looked at again, which is where most of the work was.";
const FREE_LINE = "Free play. Push, lift and tidy as many sums as you like.";

const START_HOOK = "What stays the same when two heaps of pieces are pushed together?";
function StartArt({ box, C, lang, tx }: any) {
  /* two little heaps of eighths either side of one whole cut in eight: every slice the same size */
  const R = 120, d = 8, th = 180 / d, path = lpWedgeD(0, 0, R, -th, th);
  const slice = (x: number, y: number, k: any) => <g key={k} transform={`translate(${x},${y})`}><path d={path} fill="#FBEFD2" /><Skin name="disc" x={-R} y={-R} w={2 * R} h={2 * R} clip="url(#lp-sa-w)" /><path d={path} fill="none" stroke={C.ink} strokeWidth={3} strokeLinejoin="round" /></g>;
  const ring: any[] = [];
  for (let k = 0; k < d; k++) { const q = lpPt(0, 0, R, (k * 360) / d); ring.push(<line key={k} x1={0} y1={0} x2={q.x} y2={q.y} stroke={C.ink} strokeWidth={3} strokeLinecap="round" />); }
  return (
    <g>
      <defs><clipPath id="lp-sa-w"><path d={path} /></clipPath><clipPath id="lp-sa-c"><circle r={R} /></clipPath></defs>
      {[70, 174, 278].map((x, k) => slice(x, 300, "l" + k))}
      <g transform="translate(600,175)"><circle r={R} fill="#FBEFD2" /><Skin name="disc" x={-R} y={-R} w={2 * R} h={2 * R} clip="url(#lp-sa-c)" /><circle r={R} fill="none" stroke={C.ink} strokeWidth={3} />{ring}</g>
      {[800, 904, 1008, 1112].map((x, k) => slice(x, 300, "r" + k))}
    </g>
  );
}

/* Hindi and Gujarati: keyed by the English byte for byte; digits stay Latin; terms follow the chapter (ऊपर की संख्या / ઉપરની સંખ્યા, समान भिन्न / સમાન અપૂર્ણાંક, मिश्र भिन्न / મિશ્ર અપૂર્ણાંક) */
const TR: any = {
  hi: {
    "Adding the tops and nothing else": "सिर्फ़ ऊपर की संख्याएँ जोड़ना",
    "Tap Push together to join the two heaps.": "दोनों ढेरों को जोड़ने के लिए 'एक साथ धकेलो' दबाओ।",
    "The key at the bottom pushes them together.": "नीचे की कुंजी उन्हें एक साथ धकेलती है।",
    "Add like fractions by adding the tops and keeping the bottom, the piece size.": "समान भिन्न जोड़ने में ऊपर की संख्याएँ जोड़ो और नीचे की संख्या वही रखो।",
    "You learned: add the tops and keep the bottom.": "तुमने सीखा: ऊपर की संख्याएँ जोड़ो, नीचे की संख्या वही रखो।",
    "Add 3 tenths and 4 tenths, then write the sum on the card.": "10 में से 3 भाग और 10 में से 4 भाग जोड़ो, फिर योग कार्ड पर लिखो।",
    "Push, then write the sum": "धकेलो, योग लिखो",
    "What size is every piece on this bench?": "इस बेंच पर हर टुकड़ा किस आकार का है?",
    "Yes, 7 tenths.": "हाँ, 10 में से 7 भाग।",
    "Now add 2 elevenths and 5 elevenths and write what they make.": "अब 11 में से 2 भाग और 11 में से 5 भाग जोड़ो और जो बने वह लिखो।",
    "Add these two": "इन दोनों को जोड़ो",
    "Only the number of pieces grows when the heaps meet.": "ढेर मिलने पर सिर्फ़ टुकड़ों की गिनती बढ़ती है।",
    "Yes, 7 elevenths.": "हाँ, 11 में से 7 भाग।",
    "same size": "वही आकार",
    "Same size": "वही आकार",
    "just a rule": "बस एक नियम",
    "Just a rule": "बस एक नियम है",
    "When we add elevenths, why does the eleven stay the same?": "जब हम 11 वाले भाग जोड़ते हैं, तो 11 वही क्यों रहता है?",
    "Why does the bottom stay?": "नीचे की संख्या क्यों वही रहती है?",
    "Is any piece bigger than another once the heaps have met?": "ढेर मिलने के बाद क्या कोई टुकड़ा दूसरे से बड़ा है?",
    "Yes, pushing pieces together does not change their size.": "हाँ, टुकड़ों को साथ धकेलने से उनका आकार नहीं बदलता।",
    "Taking away works the same way": "घटाना भी इसी तरह होता है",
    "Tap Lift away to take the marked pieces off.": "चिह्नित टुकड़े हटाने के लिए 'उठाओ' दबाओ।",
    "The key at the bottom lifts the marked ones.": "नीचे की कुंजी चिह्नित टुकड़े उठाती है।",
    "Take away like fractions by taking away the tops and keeping the bottom.": "समान भिन्न घटाने में ऊपर की संख्याएँ घटाओ और नीचे की संख्या वही रखो।",
    "You learned: take away the tops and keep the bottom.": "तुमने सीखा: ऊपर की संख्याएँ घटाओ, नीचे की संख्या वही रखो।",
    "Find 9 fourteenths less 4 fourteenths.": "14 में से 9 भाग हैं, इनमें से 4 भाग घटाओ।",
    "Lift away, then write it": "उठाओ, फिर लिखो",
    "How many pieces did you lift away?": "तुमने कितने टुकड़े उठाए?",
    "Yes, 5 fourteenths are left, still fourteenths.": "हाँ, 14 में से 5 भाग बचे हैं, और टुकड़े वही आकार के हैं।",
    "From 7 thirteenths, take away 2 thirteenths.": "13 में से 7 भाग हैं, इनमें से 2 भाग घटाओ।",
    "What is left?": "क्या बचा?",
    "Did lifting pieces off make the ones left any bigger?": "टुकड़े उठाने से बचे हुए टुकड़े क्या बड़े हो गए?",
    "Yes, 5 thirteenths are left on the bench.": "हाँ, बेंच पर 13 में से 5 भाग बचे हैं।",
    "Find 11 twentieths less 6 twentieths and reduce the answer.": "20 में से 11 भाग हैं, इनमें से 6 भाग घटाओ और उत्तर सरल करो।",
    "Take away, then reduce": "घटाओ, फिर सरल करो",
    "Which bigger pieces cover the blue exactly, with none of them cut?": "कौन से बड़े टुकड़े नीले भाग को बिना कटे ठीक-ठीक ढकते हैं?",
    "Yes, 5 twentieths cover the same part as 1 quarter.": "हाँ, 20 में से 5 भाग और 4 में से 1 भाग एक ही हिस्सा ढकते हैं।",
    "When the answer is more than one whole": "जब उत्तर एक पूर्ण से बड़ा हो",
    "Tap Push together to fill the plates.": "थालियाँ भरने के लिए 'एक साथ धकेलो' दबाओ।",
    "The key at the bottom pushes the pieces in.": "नीचे की कुंजी टुकड़ों को अंदर धकेलती है।",
    "Now tap Gather wholes to lift the full plate.": "अब भरी थाली उठाने के लिए 'पूर्ण इकट्ठे करो' दबाओ।",
    "The same key now gathers a full plate.": "वही कुंजी अब भरी थाली इकट्ठी करती है।",
    "A full plate is one whole, so write the answer as a mixed number.": "भरी थाली एक पूर्ण है, इसलिए उत्तर मिश्र भिन्न में लिखो।",
    "You learned: a full plate is one whole, so write a mixed number.": "तुमने सीखा: भरी थाली एक पूर्ण है, इसलिए मिश्र भिन्न लिखो।",
    "Add 8 ninths and 7 ninths and tidy the answer.": "9 में से 8 भाग और 9 में से 7 भाग जोड़ो और उत्तर सँवारो।",
    "Add, then tidy": "जोड़ो, सँवारो",
    "How many pieces does one whole plate take?": "एक पूरी थाली में कितने टुकड़े आते हैं?",
    "Yes, 1 whole and 2 thirds, the same amount as 15 ninths.": "हाँ, 1 पूर्ण और 3 में से 2 भाग, यानी 9 में से 15 भाग जितना।",
    "Add 7 tenths and 9 tenths and write the answer as a mixed number.": "10 में से 7 भाग और 10 में से 9 भाग जोड़ो और उत्तर मिश्र भिन्न में लिखो।",
    "Mixed number, tidied": "मिश्र भिन्न, सँवारा हुआ",
    "The whole is gathered, so what do the last two numbers share?": "पूर्ण इकट्ठा हो गया, तो आखिरी दोनों संख्याओं में क्या साझा है?",
    "Yes, 16 tenths gather and reduce to a mixed number.": "हाँ, 10 में से 16 भाग इकट्ठे और सरल होकर मिश्र भिन्न बनते हैं।",
    "Add 5 sevenths and 2 sevenths and say what the answer is worth.": "7 में से 5 भाग और 7 में से 2 भाग जोड़ो और बताओ कि उत्तर कितने के बराबर है।",
    "What is it worth?": "यह कितने के बराबर है?",
    "Did any piece spill onto a second plate?": "क्या कोई टुकड़ा दूसरी थाली में चला गया?",
    "Yes, 7 sevenths fill exactly 1 whole.": "हाँ, 7 में से 7 भाग ठीक 1 पूर्ण भरते हैं।",
    "Tidying what is left": "जो बचे उसे सँवारना",
    "Tap Push together to work the sum on the plates.": "थालियों पर सवाल हल करने के लिए 'एक साथ धकेलो' दबाओ।",
    "Tap Gather wholes to lift any full plate.": "भरी थाली उठाने के लिए 'पूर्ण इकट्ठे करो' दबाओ।",
    "The same key now gathers the full plates.": "वही कुंजी अब भरी थालियाँ इकट्ठी करती है।",
    "Tap Reduce to rub out the lines that are not needed.": "ज़रूरी न होने वाली रेखाएँ मिटाने के लिए 'सरल करो' दबाओ।",
    "The key at the bottom now says Reduce.": "नीचे की कुंजी अब 'सरल करो' कहती है।",
    "Look at every answer again: some need gathering, some reducing, some neither.": "हर उत्तर फिर देखो: कुछ को इकट्ठा, कुछ को सरल करना होता है, कुछ को नहीं।",
    "You learned: look at every answer again, then gather or reduce.": "तुमने सीखा: हर उत्तर फिर देखो, फिर इकट्ठा या सरल करो।",
    "Find 10 twelfths less 4 twelfths and reduce the answer.": "12 में से 10 भाग हैं, इनमें से 4 भाग घटाओ और उत्तर सरल करो।",
    "Take away and reduce": "घटाओ और सरल करो",
    "Look at your answer again: is there one more thing to do to it?": "अपना उत्तर फिर देखो: क्या उसमें एक काम और बाकी है?",
    "Yes, 6 twelfths reduce to 1 half.": "हाँ, 12 में से 6 भाग सरल होकर 2 में से 1 भाग बनता है।",
    "Add 13 eighteenths and 11 eighteenths, then tidy it all the way.": "18 में से 13 भाग और 18 में से 11 भाग जोड़ो, फिर उसे आखिर तक सँवारो।",
    "Tidy it all the way": "आखिर तक सँवारो",
    "Did the pieces fill more than one whole plate?": "क्या टुकड़ों ने एक पूरी थाली से ज़्यादा भरा?",
    "Yes, 24 eighteenths gather and reduce all the way.": "हाँ, 18 में से 24 भाग इकट्ठे होकर पूरी तरह सरल हुए।",
    "A tank has 12 equal parts, 7 full, 3 of them leak; what is left, lowest terms?": "टंकी में 12 बराबर भाग हैं, 7 भरे, 3 रिसते हैं; बचा क्या, सरलतम रूप में?",
    "Water left, lowest terms": "बचा पानी, सरलतम रूप में",
    "What is the biggest number that divides both of them?": "वह सबसे बड़ी संख्या कौन-सी है जो दोनों को बाँटती है?",
    "Yes, 4 twelfths of the tank is 1 third of it.": "हाँ, टंकी का 12 में से 4 भाग उसका 3 में से 1 भाग है।",
    "Push them together and count. Did the pieces change size when you did?": "उन्हें एक साथ धकेलो और गिनो। क्या टुकड़ों का आकार बदला?",
    "Did pushing the heaps together change the size of a piece?": "क्या ढेरों को साथ धकेलने से टुकड़े का आकार बदला?",
    "Count the pieces in the one heap, and keep the size pinned above them.": "एक ढेर के टुकड़े गिनो, और ऊपर लगा आकार वही रखो।",
    "Take those pieces off. What is left, and what size are they?": "उन टुकड़ों को हटाओ। कितने बचे, और वे किस आकार के हैं?",
    "The lifted pieces are on the ledge, so how many stayed behind?": "उठाए गए टुकड़े ताक पर हैं, तो कितने पीछे रह गए?",
    "Count what is left on the bench, and keep the size pinned above it.": "बेंच पर जो बचा उसे गिनो, और ऊपर लगा आकार वही रखो।",
    "You have filled a whole one. Set it aside and say what is left over.": "तुमने एक पूर्ण भर लिया। उसे अलग रखो और बताओ कि क्या बचा।",
    "How many full plates did your pieces make, and how many were left?": "तुम्हारे टुकड़ों से कितनी थालियाँ भरीं, और कितने बचे?",
    "Count the full plates first, then the pieces on the last plate.": "पहले भरी थालियाँ गिनो, फिर आखिरी थाली के टुकड़े।",
    "Look at your answer once more. Is there anything left to do to it?": "अपने उत्तर को एक बार और देखो। क्या उसमें कुछ करना बाकी है?",
    "Do the last two numbers share anything above one?": "क्या आखिरी दोनों संख्याओं में एक से बड़ा कुछ साझा है?",
    "Each station of the rail asks one question about the answer.": "पटरी का हर पड़ाव उत्तर के बारे में एक सवाल पूछता है।",
    "Like Pieces Bench": "एक जैसे टुकड़ों की बेंच",
    "Two little heaps, and every piece in both of them is the same size.": "दो छोटे ढेर, और दोनों में हर टुकड़ा एक ही आकार का है।",
    "Every answer counted and then looked at again, which is where most of the work was.": "हर उत्तर गिना गया। फिर उसे दोबारा देखा गया, यही सबसे बड़ा काम था।",
    "What stays the same when two heaps of pieces are pushed together?": "जब दो ढेर टुकड़े एक साथ धकेले जाते हैं, तब क्या वही रहता है?",
    "Free play. Push, lift and tidy as many sums as you like.": "मुक्त खेल। जितने चाहो उतने सवाल धकेलो, उठाओ और सँवारो।",
    "counted": "गिने हुए",
    "Answer": "उत्तर",
    "No whole": "पूर्ण नहीं",
    "Not shared": "साझा नहीं",
    "None left": "शेष नहीं",
    "Tap the blinking Push together key.": "चमकती 'एक साथ धकेलो' कुंजी दबाओ।",
    "Tap the blinking Lift away key.": "चमकती 'उठाओ' कुंजी दबाओ।",
    "Tap the blinking Gather wholes key.": "चमकती 'पूर्ण इकट्ठे करो' कुंजी दबाओ।",
    "Tap the blinking Reduce key.": "चमकती 'सरल करो' कुंजी दबाओ।",
    "Each piece": "हर टुकड़ा",
    "Taken away": "हटाए गए",
    "Push together": "एक साथ धकेलो",
    "Lift away": "उठाओ",
    "Gather wholes": "पूर्ण इकट्ठे करो",
    "Reduce": "सरल करो",
    "New sum": "नया सवाल",
    "Gather": "इकट्ठा",
    "All done": "सब हो गया",
  },
  gu: {
    "Adding the tops and nothing else": "ફક્ત ઉપરની સંખ્યાઓ ઉમેરવી",
    "Tap Push together to join the two heaps.": "બંને ઢગલા ભેગા કરવા 'ભેગા ધકેલો' દબાવો.",
    "The key at the bottom pushes them together.": "નીચેની કી તેમને ભેગા ધકેલે છે.",
    "Add like fractions by adding the tops and keeping the bottom, the piece size.": "સમાન અપૂર્ણાંક ઉમેરવા ઉપરની સંખ્યાઓ ઉમેરો અને નીચેની સંખ્યા એ જ રાખો.",
    "You learned: add the tops and keep the bottom.": "તમે શીખ્યા: ઉપરની સંખ્યાઓ ઉમેરો, નીચેની સંખ્યા એ જ રાખો.",
    "Add 3 tenths and 4 tenths, then write the sum on the card.": "10માંથી 3 ભાગ અને 10માંથી 4 ભાગ ઉમેરો, પછી સરવાળો કાર્ડ પર લખો.",
    "Push, then write the sum": "ધકેલો, સરવાળો લખો",
    "What size is every piece on this bench?": "આ બેન્ચ પર દરેક ટુકડો કેટલા માપનો છે?",
    "Yes, 7 tenths.": "હા, 10માંથી 7 ભાગ.",
    "Now add 2 elevenths and 5 elevenths and write what they make.": "હવે 11માંથી 2 ભાગ અને 11માંથી 5 ભાગ ઉમેરો અને જે થાય તે લખો.",
    "Add these two": "આ બંનેને ઉમેરો",
    "Only the number of pieces grows when the heaps meet.": "ઢગલા ભેગા થાય ત્યારે ફક્ત ટુકડાઓની ગણતરી વધે છે.",
    "Yes, 7 elevenths.": "હા, 11માંથી 7 ભાગ.",
    "same size": "એ જ માપ",
    "Same size": "એ જ માપ",
    "just a rule": "બસ એક નિયમ",
    "Just a rule": "બસ એક નિયમ છે",
    "When we add elevenths, why does the eleven stay the same?": "જ્યારે આપણે 11 વાળા ભાગ ઉમેરીએ, ત્યારે 11 એ જ કેમ રહે છે?",
    "Why does the bottom stay?": "નીચેની સંખ્યા કેમ એ જ રહે છે?",
    "Is any piece bigger than another once the heaps have met?": "ઢગલા ભેગા થયા પછી શું કોઈ ટુકડો બીજા કરતાં મોટો છે?",
    "Yes, pushing pieces together does not change their size.": "હા, ટુકડા ભેગા ધકેલવાથી તેમનું માપ બદલાતું નથી.",
    "Taking away works the same way": "બાદ કરવાનું પણ આ જ રીતે થાય છે",
    "Tap Lift away to take the marked pieces off.": "ચિહ્નિત ટુકડા કાઢવા 'ઉપાડો' દબાવો.",
    "The key at the bottom lifts the marked ones.": "નીચેની કી ચિહ્નિત ટુકડા ઉપાડે છે.",
    "Take away like fractions by taking away the tops and keeping the bottom.": "સમાન અપૂર્ણાંક બાદ કરવા ઉપરની સંખ્યાઓ બાદ કરો અને નીચેની સંખ્યા એ જ રાખો.",
    "You learned: take away the tops and keep the bottom.": "તમે શીખ્યા: ઉપરની સંખ્યાઓ બાદ કરો, નીચેની સંખ્યા એ જ રાખો.",
    "Find 9 fourteenths less 4 fourteenths.": "14માંથી 9 ભાગ છે, તેમાંથી 4 ભાગ બાદ કરો.",
    "Lift away, then write it": "ઉપાડો, પછી લખો",
    "How many pieces did you lift away?": "તમે કેટલા ટુકડા ઉપાડ્યા?",
    "Yes, 5 fourteenths are left, still fourteenths.": "હા, 14માંથી 5 ભાગ બચ્યા છે, અને ટુકડા એ જ માપના છે.",
    "From 7 thirteenths, take away 2 thirteenths.": "13માંથી 7 ભાગ છે, તેમાંથી 2 ભાગ બાદ કરો.",
    "What is left?": "શું બચ્યું?",
    "Did lifting pieces off make the ones left any bigger?": "ટુકડા ઉપાડવાથી બાકીના ટુકડા શું મોટા થઈ ગયા?",
    "Yes, 5 thirteenths are left on the bench.": "હા, બેન્ચ પર 13માંથી 5 ભાગ બચ્યા છે.",
    "Find 11 twentieths less 6 twentieths and reduce the answer.": "20માંથી 11 ભાગ છે, તેમાંથી 6 ભાગ બાદ કરો અને જવાબ સાદો કરો.",
    "Take away, then reduce": "બાદ કરો, પછી સાદું કરો",
    "Which bigger pieces cover the blue exactly, with none of them cut?": "કયા મોટા ટુકડા વાદળી ભાગને કાપ્યા વગર બરાબર ઢાંકે છે?",
    "Yes, 5 twentieths cover the same part as 1 quarter.": "હા, 20માંથી 5 ભાગ અને 4માંથી 1 ભાગ એક જ હિસ્સો ઢાંકે છે.",
    "When the answer is more than one whole": "જ્યારે જવાબ એક આખા કરતાં મોટો હોય",
    "Tap Push together to fill the plates.": "થાળીઓ ભરવા 'ભેગા ધકેલો' દબાવો.",
    "The key at the bottom pushes the pieces in.": "નીચેની કી ટુકડાઓને અંદર ધકેલે છે.",
    "Now tap Gather wholes to lift the full plate.": "હવે ભરેલી થાળી ઉપાડવા 'આખા ભેગા કરો' દબાવો.",
    "The same key now gathers a full plate.": "એ જ કી હવે ભરેલી થાળી ભેગી કરે છે.",
    "A full plate is one whole, so write the answer as a mixed number.": "ભરેલી થાળી એક આખું છે, તેથી જવાબ મિશ્ર અપૂર્ણાંકમાં લખો.",
    "You learned: a full plate is one whole, so write a mixed number.": "તમે શીખ્યા: ભરેલી થાળી એક આખું છે, તેથી મિશ્ર અપૂર્ણાંક લખો.",
    "Add 8 ninths and 7 ninths and tidy the answer.": "9માંથી 8 ભાગ અને 9માંથી 7 ભાગ ઉમેરો અને જવાબ સુઘડ કરો.",
    "Add, then tidy": "ઉમેરો, સુઘડ કરો",
    "How many pieces does one whole plate take?": "એક આખી થાળીમાં કેટલા ટુકડા આવે?",
    "Yes, 1 whole and 2 thirds, the same amount as 15 ninths.": "હા, 1 આખું અને 3માંથી 2 ભાગ, એટલે 9માંથી 15 ભાગ જેટલું.",
    "Add 7 tenths and 9 tenths and write the answer as a mixed number.": "10માંથી 7 ભાગ અને 10માંથી 9 ભાગ ઉમેરો અને જવાબ મિશ્ર અપૂર્ણાંકમાં લખો.",
    "Mixed number, tidied": "મિશ્ર અપૂર્ણાંક, સુઘડ કરેલો",
    "The whole is gathered, so what do the last two numbers share?": "આખું ભેગું થઈ ગયું, તો છેલ્લી બંને સંખ્યાઓમાં શું સહિયારું છે?",
    "Yes, 16 tenths gather and reduce to a mixed number.": "હા, 10માંથી 16 ભાગ ભેગા અને સાદા થઈને મિશ્ર અપૂર્ણાંક બને છે.",
    "Add 5 sevenths and 2 sevenths and say what the answer is worth.": "7માંથી 5 ભાગ અને 7માંથી 2 ભાગ ઉમેરો અને કહો કે જવાબ કેટલા બરાબર છે.",
    "What is it worth?": "તે કેટલા બરાબર છે?",
    "Did any piece spill onto a second plate?": "શું કોઈ ટુકડો બીજી થાળીમાં ગયો?",
    "Yes, 7 sevenths fill exactly 1 whole.": "હા, 7માંથી 7 ભાગ બરાબર 1 આખું ભરે છે.",
    "Tidying what is left": "જે બાકી રહે તેને સુઘડ કરવું",
    "Tap Push together to work the sum on the plates.": "થાળીઓ પર દાખલો ગણવા 'ભેગા ધકેલો' દબાવો.",
    "Tap Gather wholes to lift any full plate.": "ભરેલી થાળી ઉપાડવા 'આખા ભેગા કરો' દબાવો.",
    "The same key now gathers the full plates.": "એ જ કી હવે ભરેલી થાળીઓ ભેગી કરે છે.",
    "Tap Reduce to rub out the lines that are not needed.": "જરૂર ન હોય તેવી રેખાઓ ભૂંસવા 'સાદું કરો' દબાવો.",
    "The key at the bottom now says Reduce.": "નીચેની કી હવે 'સાદું કરો' કહે છે.",
    "Look at every answer again: some need gathering, some reducing, some neither.": "દરેક જવાબ ફરી જુઓ: કોઈને ભેગા, કોઈને સાદા કરવા પડે, કોઈને નહીં.",
    "You learned: look at every answer again, then gather or reduce.": "તમે શીખ્યા: દરેક જવાબ ફરી જુઓ, પછી ભેગા કે સાદા કરો.",
    "Find 10 twelfths less 4 twelfths and reduce the answer.": "12માંથી 10 ભાગ છે, તેમાંથી 4 ભાગ બાદ કરો અને જવાબ સાદો કરો.",
    "Take away and reduce": "બાદ કરો, સાદું કરો",
    "Look at your answer again: is there one more thing to do to it?": "તમારો જવાબ ફરી જુઓ: શું તેમાં હજી એક કામ બાકી છે?",
    "Yes, 6 twelfths reduce to 1 half.": "હા, 12માંથી 6 ભાગ સાદા થઈને 2માંથી 1 ભાગ બને છે.",
    "Add 13 eighteenths and 11 eighteenths, then tidy it all the way.": "18માંથી 13 ભાગ અને 18માંથી 11 ભાગ ઉમેરો, પછી તેને છેલ્લે સુધી સુઘડ કરો.",
    "Tidy it all the way": "છેલ્લે સુધી સુઘડ કરો",
    "Did the pieces fill more than one whole plate?": "શું ટુકડાઓએ એક આખી થાળીથી વધુ ભર્યું?",
    "Yes, 24 eighteenths gather and reduce all the way.": "હા, 18માંથી 24 ભાગ ભેગા થઈને પૂરેપૂરા સાદા થયા.",
    "A tank has 12 equal parts, 7 full, 3 of them leak; what is left, lowest terms?": "ટાંકીમાં 12 સરખા ભાગ છે, 7 ભરેલા, 3 ટપકે છે; શું બચ્યું, સૌથી સાદા રૂપમાં?",
    "Water left, lowest terms": "બચેલું પાણી, સૌથી સાદું રૂપ",
    "What is the biggest number that divides both of them?": "બંનેને ભાગી શકે એવી સૌથી મોટી સંખ્યા કઈ છે?",
    "Yes, 4 twelfths of the tank is 1 third of it.": "હા, ટાંકીનો 12માંથી 4 ભાગ એ તેનો 3માંથી 1 ભાગ છે.",
    "Push them together and count. Did the pieces change size when you did?": "તેમને ભેગા ધકેલો અને ગણો. શું ટુકડાઓનું માપ બદલાયું?",
    "Did pushing the heaps together change the size of a piece?": "શું ઢગલા ભેગા ધકેલવાથી ટુકડાનું માપ બદલાયું?",
    "Count the pieces in the one heap, and keep the size pinned above them.": "એક ઢગલાના ટુકડા ગણો, અને ઉપર લગાવેલું માપ એ જ રાખો.",
    "Take those pieces off. What is left, and what size are they?": "તે ટુકડા કાઢી લો. કેટલા બચ્યા, અને તે કયા માપના છે?",
    "The lifted pieces are on the ledge, so how many stayed behind?": "ઉપાડેલા ટુકડા છાજલી પર છે, તો કેટલા પાછળ રહ્યા?",
    "Count what is left on the bench, and keep the size pinned above it.": "બેન્ચ પર જે બાકી રહ્યું તે ગણો, અને ઉપર લગાવેલું માપ એ જ રાખો.",
    "You have filled a whole one. Set it aside and say what is left over.": "તમે એક આખું ભરી લીધું. તેને બાજુ પર મૂકો અને કહો કે શું બાકી રહ્યું.",
    "How many full plates did your pieces make, and how many were left?": "તમારા ટુકડાઓથી કેટલી થાળી ભરાઈ, અને કેટલા બાકી રહ્યા?",
    "Count the full plates first, then the pieces on the last plate.": "પહેલાં ભરેલી થાળીઓ ગણો, પછી છેલ્લી થાળીના ટુકડા.",
    "Look at your answer once more. Is there anything left to do to it?": "તમારા જવાબને ફરી એક વાર જુઓ. શું તેમાં કંઈ કરવાનું બાકી છે?",
    "Do the last two numbers share anything above one?": "શું છેલ્લી બંને સંખ્યાઓમાં એકથી મોટું કંઈ સહિયારું છે?",
    "Each station of the rail asks one question about the answer.": "પાટાનું દરેક સ્ટેશન જવાબ વિશે એક સવાલ પૂછે છે.",
    "Like Pieces Bench": "સરખા ટુકડાઓની બેન્ચ",
    "Two little heaps, and every piece in both of them is the same size.": "બે નાના ઢગલા, અને બંનેમાં દરેક ટુકડો એક જ માપનો છે.",
    "Every answer counted and then looked at again, which is where most of the work was.": "દરેક જવાબ ગણ્યો. પછી તેને ફરી જોયો, એ જ સૌથી મોટું કામ હતું.",
    "What stays the same when two heaps of pieces are pushed together?": "જ્યારે ટુકડાઓના બે ઢગલા ભેગા ધકેલાય, ત્યારે શું એ જ રહે છે?",
    "Free play. Push, lift and tidy as many sums as you like.": "મુક્ત રમત. તમને ગમે તેટલા દાખલા ધકેલો, ઉપાડો અને સુઘડ કરો.",
    "counted": "ગણેલા",
    "Answer": "જવાબ",
    "No whole": "આખું નથી",
    "Not shared": "સહિયારું નથી",
    "None left": "કંઈ બચ્યું નથી",
    "Tap the blinking Push together key.": "ઝબકતી 'ભેગા ધકેલો' કી દબાવો.",
    "Tap the blinking Lift away key.": "ઝબકતી 'ઉપાડો' કી દબાવો.",
    "Tap the blinking Gather wholes key.": "ઝબકતી 'આખા ભેગા કરો' કી દબાવો.",
    "Tap the blinking Reduce key.": "ઝબકતી 'સાદું કરો' કી દબાવો.",
    "Each piece": "દરેક ટુકડો",
    "Taken away": "કાઢેલા",
    "Push together": "ભેગા ધકેલો",
    "Lift away": "ઉપાડો",
    "Gather wholes": "આખા ભેગા કરો",
    "Reduce": "સાદું કરો",
    "New sum": "નવો દાખલો",
    "Gather": "ભેગું",
    "All done": "બધું પૂરું",
  },
};

/* One entry per phase = one mount. steps = the warm-up's acts (the WARM table below has the warm-up sum; question 1 opens fresh). */
const PHASES = [
  {
    n: 1,
    concept: "Adding the tops and nothing else",
    conceptId: "M2.S4.T8.C35", objectiveIds: ["O13"],
    says: ["Push them together and count. Did the pieces change size when you did?"],
    steps: [{ say: "Tap Push together to join the two heaps.", on: "push", hint: "The key at the bottom pushes them together." }],
    ladder: ["Did pushing the heaps together change the size of a piece?", "Count the pieces in the one heap, and keep the size pinned above them."],
    closing: "Add like fractions by adding the tops and keeping the bottom, the piece size.",
    learned: "You learned: add the tops and keep the bottom.",
    traceback: "The heaps go back apart and are pushed together again piece by piece with the pinned size lit and the count climbing; the right fraction is written on the card.",
    items: [
      /* learn ML1: answer in the plan = 7/10 */
      { qid: "M2.S4.T8.C35:ML1", kind: "add", d: 10, a: 3, b: 4, parts: SLOT_FRACTION, answer: [7, 10], winMs: 3200,
        say: "Add 3 tenths and 4 tenths, then write the sum on the card.", ask: "Push, then write the sum", miss: "What size is every piece on this bench?",
        win: "Yes, 7 tenths." },
      /* practice 1: answer in the plan = 7/11 */
      { qid: "M2.S4.T8.C35:1", kind: "add", d: 11, a: 2, b: 5, parts: SLOT_FRACTION, answer: [7, 11], winMs: 3200,
        say: "Now add 2 elevenths and 5 elevenths and write what they make.", ask: "Add these two", miss: "Only the number of pieces grows when the heaps meet.",
        win: "Yes, 7 elevenths." },
      /* practice 2: answer in the plan = Because the eleven says how big each piece is, and putting pieces together does not change their size */
      { qid: "M2.S4.T8.C35:2", kind: "why", d: 11, a: 2, b: 5, answer: "same size", winMs: 3200,
        choices: [{ id: "same size", label: "Same size" }, { id: "just a rule", label: "Just a rule" }],
        say: "When we add elevenths, why does the eleven stay the same?",
        ask: "Why does the bottom stay?", miss: "Is any piece bigger than another once the heaps have met?",
        win: "Yes, pushing pieces together does not change their size." },
    ],
  },
  {
    n: 2,
    concept: "Taking away works the same way",
    conceptId: "M2.S4.T8.C36", objectiveIds: ["O13"],
    says: ["Take those pieces off. What is left, and what size are they?"],
    steps: [{ say: "Tap Lift away to take the marked pieces off.", on: "lift", hint: "The key at the bottom lifts the marked ones." }],
    ladder: ["The lifted pieces are on the ledge, so how many stayed behind?", "Count what is left on the bench, and keep the size pinned above it."],
    closing: "Take away like fractions by taking away the tops and keeping the bottom.",
    learned: "You learned: take away the tops and keep the bottom.",
    traceback: "The marked pieces are lifted to the ledge one at a time with the pinned size lit, the pieces left are counted, and the right fraction is written on the card.",
    items: [
      /* learn ML2: answer in the plan = 5/14 */
      { qid: "M2.S4.T8.C36:ML2", kind: "take", d: 14, a: 9, b: 4, parts: SLOT_FRACTION, answer: [5, 14], winMs: 3200,
        say: "Find 9 fourteenths less 4 fourteenths.", ask: "Lift away, then write it", miss: "How many pieces did you lift away?",
        win: "Yes, 5 fourteenths are left, still fourteenths." },
      /* practice 3: answer in the plan = 5/13 */
      { qid: "M2.S4.T8.C36:3", kind: "take", d: 13, a: 7, b: 2, parts: SLOT_FRACTION, answer: [5, 13], winMs: 3200,
        say: "From 7 thirteenths, take away 2 thirteenths.", ask: "What is left?", miss: "Did lifting pieces off make the ones left any bigger?",
        win: "Yes, 5 thirteenths are left on the bench." },
      /* practice 4: answer in the plan = 5/20, which reduces to 1/4 */
      { qid: "M2.S4.T8.C36:4", kind: "take", d: 20, a: 11, b: 6, parts: SLOT_FRACTION, answer: [1, 4], winMs: 4000,
        say: "Find 11 twentieths less 6 twentieths and reduce the answer.", ask: "Take away, then reduce", miss: "Which bigger pieces cover the blue exactly, with none of them cut?",
        win: "Yes, 5 twentieths cover the same part as 1 quarter." },
    ],
  },
  {
    n: 3,
    concept: "When the answer is more than one whole",
    conceptId: "M2.S4.T8.C37", objectiveIds: ["O14"],
    says: ["You have filled a whole one. Set it aside and say what is left over."],
    steps: [
      { say: "Tap Push together to fill the plates.", on: "push", hint: "The key at the bottom pushes the pieces in." },
      { say: "Now tap Gather wholes to lift the full plate.", on: "gather", hint: "The same key now gathers a full plate." },
    ],
    ladder: ["How many full plates did your pieces make, and how many were left?", "Count the full plates first, then the pieces on the last plate."],
    closing: "A full plate is one whole, so write the answer as a mixed number.",
    learned: "You learned: a full plate is one whole, so write a mixed number.",
    traceback: "The pieces are pushed into the plates again one at a time, a full plate closes and lifts clear, and the lines that are not needed are rubbed out; the right answer is written on the card.",
    items: [
      /* learn ML3: answer in the plan = 15/9, which is 5/3, and that is 1 2/3 */
      { qid: "M2.S4.T8.C37:ML3", kind: "add", d: 9, a: 8, b: 7, parts: SLOT_MIXED, answer: [1, 2, 3], winMs: 4200,
        say: "Add 8 ninths and 7 ninths and tidy the answer.", ask: "Add, then tidy", miss: "How many pieces does one whole plate take?",
        win: "Yes, 1 whole and 2 thirds, the same amount as 15 ninths." },
      /* practice 5: answer in the plan = 16/10, which reduces to 8/5, and that is 1 3/5 */
      { qid: "M2.S4.T8.C37:5", kind: "add", d: 10, a: 7, b: 9, parts: SLOT_MIXED, answer: [1, 3, 5], winMs: 4200,
        say: "Add 7 tenths and 9 tenths and write the answer as a mixed number.", ask: "Mixed number, tidied",
        miss: "The whole is gathered, so what do the last two numbers share?",
        win: "Yes, 16 tenths gather and reduce to a mixed number." },
      /* practice 6: answer in the plan = 7/7, which is exactly one whole */
      { qid: "M2.S4.T8.C37:6", kind: "add", d: 7, a: 5, b: 2, parts: SLOT_MIXED, answer: [1, null, null], winMs: 3600,
        say: "Add 5 sevenths and 2 sevenths and say what the answer is worth.", ask: "What is it worth?", miss: "Did any piece spill onto a second plate?",
        win: "Yes, 7 sevenths fill exactly 1 whole." },
    ],
  },
  {
    n: 4,
    concept: "Tidying what is left",
    conceptId: "M2.S4.T8.C38", objectiveIds: ["O14"],
    says: ["Look at your answer once more. Is there anything left to do to it?"],
    steps: [
      { say: "Tap Push together to work the sum on the plates.", on: "push", hint: "The key at the bottom pushes the pieces in." },
      { say: "Tap Gather wholes to lift any full plate.", on: "gather", hint: "The same key now gathers the full plates." },
      { say: "Tap Reduce to rub out the lines that are not needed.", on: "reduce", hint: "The key at the bottom now says Reduce." },
    ],
    ladder: ["Do the last two numbers share anything above one?", "Each station of the rail asks one question about the answer."],
    closing: "Look at every answer again: some need gathering, some reducing, some neither.",
    learned: "You learned: look at every answer again, then gather or reduce.",
    traceback: "The sum is worked again on the plates; the rail runs the stations the answer needs, greys the others with the reason printed, and the right answer is written on the card.",
    items: [
      /* learn ML4: answer in the plan = 6/12, which reduces to 1/2 */
      { qid: "M2.S4.T8.C38:ML4", kind: "take", d: 12, a: 10, b: 4, parts: SLOT_MIXED, answer: [null, 1, 2], winMs: 4000,
        say: "Find 10 twelfths less 4 twelfths and reduce the answer.", ask: "Take away and reduce", miss: "Look at your answer again: is there one more thing to do to it?",
        win: "Yes, 6 twelfths reduce to 1 half." },
      /* practice 7: answer in the plan = 24/18, which reduces to 4/3, and that is 1 1/3 */
      { qid: "M2.S4.T8.C38:7", kind: "add", d: 18, a: 13, b: 11, parts: SLOT_MIXED, answer: [1, 1, 3], winMs: 4600,
        say: "Add 13 eighteenths and 11 eighteenths, then tidy it all the way.", ask: "Tidy it all the way", miss: "Did the pieces fill more than one whole plate?",
        win: "Yes, 24 eighteenths gather and reduce all the way." },
      /* practice 8: answer in the plan = 4/12, which is 1/3 */
      /* plan question: A tank is 7/12 full of water and 3/12 of the tank leaks away. What fraction of the tank still holds water, in lowest terms? */
      { qid: "M2.S4.T8.C38:8", kind: "take", d: 12, a: 7, b: 3, parts: SLOT_MIXED, answer: [null, 1, 3], winMs: 4000,
        say: "A tank has 12 equal parts, 7 full, 3 of them leak; what is left, lowest terms?", ask: "Water left, lowest terms",
        miss: "What is the biggest number that divides both of them?",
        win: "Yes, 4 twelfths of the tank is 1 third of it." },
    ],
  },
];

/* The warm-up sums of the guide steps (never a question's own sum). */
const WARM = [
  { kind: "add", d: 8, a: 2, b: 3 },     /* 5/8: push */
  { kind: "take", d: 9, a: 7, b: 3 },    /* 4/9: lift */
  { kind: "add", d: 6, a: 4, b: 3 },     /* 7/6: push, gather */
  { kind: "add", d: 8, a: 5, b: 7 },     /* 12/8: push, gather, reduce */
];
/* Free play: the "New sum" key walks these. */
const FREE_SUMS = [
  { kind: "add", d: 8, a: 3, b: 4 }, { kind: "take", d: 12, a: 9, b: 5 }, { kind: "add", d: 6, a: 5, b: 4 },
  { kind: "take", d: 10, a: 9, b: 3 }, { kind: "add", d: 12, a: 7, b: 8 }, { kind: "add", d: 5, a: 3, b: 2 },
];

/* The numbers, rows, sizes and targets the working area needs (they go into the sidecar too). */
const MODEL = { pieceRadiusMax: 128, designWidth: 880, colours: { counted: "hundred", left: "ten", whole: "one", second: "bead" } };

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */
const lpGcd = (x: number, y: number): number => (y === 0 ? x : lpGcd(y, x % y));
/* the shape of a sum: wholes, pieces left over, the biggest share, whether plates are needed, and the acts in order */
const lpPlan = (it: any) => {
  const d = it.d, take = it.kind === "take", top = take ? it.a - it.b : it.a + it.b, W = Math.floor(top / d), rem = top % d, f = rem ? lpGcd(rem, d) : 1;
  const acts = [take ? "lift" : "push"].concat(W > 0 ? ["gather"] : []).concat(f > 1 ? ["reduce"] : []);
  return { d, take, top, W, rem, f, tidy: W > 0 || f > 1, acts };
};

/* judge: the slot's parts must match (a null part must stay empty); the why item is a word choice */
const judge = (item: any, v: any) => {
  if (item.parts) return judgeSlotParts(item, v);
  return String(v).trim().toLowerCase() === String(item.answer).trim().toLowerCase();
};

/* oracle: every answer re-derived from the words of the question itself (not from the bench, the slot or judge): the two fractions are
   read out of `say` ("3 tenths", "2 thirteenths": a number and its unit word, the word mapped back to its piece size), the upper
   numbers put together or taken away, whole ones counted off one at a time, and the rest reduced by Euclid's taking-away method. */
const lpUnits = () => {
  const m: any = {};
  for (let d = 2; d <= 24; d++) { m[fractionWords(1, d).replace(/^one /, "")] = d; m[fractionWords(2, d).replace(/^two /, "")] = d; }
  return m;
};
const lpUnit = (n: number, d: number) => fractionWords(n === 1 ? 1 : 2, d).replace(/^(one|two) /, "");
const oracle = () => PHASES.every((p: any) => p.items.every((it: any) => {
  if (it.kind === "why") return it.choices.filter((c: any) => c.id === it.answer).length === 1 && /why does the eleven/i.test(it.say);
  const units = lpUnits(), fr: number[][] = [];
  const tank = /(\d+) equal parts, (\d+)(?: are)? full(?:,| and)? (\d+)(?: of them)? leak/.exec(it.say);
  if (tank) fr.push([Number(tank[2]), Number(tank[1])], [Number(tank[3]), Number(tank[1])]);
  else { const re = /(\d+)\s+([a-z]+)/g; let m: any = re.exec(it.say); while (m) { if (units[m[2]]) fr.push([Number(m[1]), units[m[2]]]); m = re.exec(it.say); } }
  if (fr.length !== 2 || fr[0][1] !== fr[1][1]) return false;
  const den = fr[0][1], takes = /less|away|leak/i.test(it.say);
  if (it.d !== den || it.a !== fr[0][0] || it.b !== fr[1][0] || (it.kind === "take") !== takes) return false;
  const top = takes ? fr[0][0] - fr[1][0] : fr[0][0] + fr[1][0];
  let whole = 0, left = top;
  while (left >= den) { left -= den; whole += 1; }
  let x = left, y = den;
  while (x > 0 && y > 0 && x !== y) { if (x > y) x -= y; else y -= x; }
  const f = left ? x : 1;
  const want = it.parts.length === 2
    ? (/reduce|lowest/i.test(it.say) ? [left / f, den / f] : [top, den])
    : [whole || null, left ? left / f : null, left ? den / f : null];
  return want.length === it.answer.length && want.every((z: any, k: number) => z === it.answer[k]);
}));

/* the most likely wrong answer (this item's misconception); judge must reject it */
const nearMiss = (item: any) => {
  if (item.kind === "why") return "just a rule";                    /* the lower number was added as well */
  if (!item.parts) return "~";
  const raw = item.kind === "take" ? item.a - item.b : item.a + item.b;
  if (item.parts.length === 3) return `|${raw}|${item.d}`;        /* left as it came out of the sum */
  if (lpPlan(item).tidy) return `${raw}|${item.d}`;               /* never looked at again */
  return item.kind === "take" ? `${raw}|0` : `${raw}|${2 * item.d}`; /* the lower numbers worked on too */
};

/* the forms of an answer that no question, hint or ladder line may print */
const answerForms = (item: any) => {
  if (!item.parts) return ["Same size"];
  const a = item.answer, w = a.length === 3 ? a[0] : null, n = a[a.length - 2], d = a[a.length - 1];
  const out: string[] = [];
  if (n && d) {
    out.push(`${n}/${d}`, fractionWords(n, d), `${n} ${lpUnit(n, d)}`);
    if (w) out.push(`${w} ${n}/${d}`, `${words(w)} and ${fractionWords(n, d)}`, `${w} and ${n} ${lpUnit(n, d)}`);
  } else if (w) out.push(`${w} whole`, `${words(w)} whole`);
  return out;
};

/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => item.answer;

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => (T.state().stage === "demo" ? HOOK.demo && HOOK.demo() : T.submit(item.answer));
const answer = () => undefined;
const check = () => (HOOK.check ? HOOK.check() : undefined);

/* ── the bench: cake slices on a bench and plates ruled in the pinned size ─────────────────────────────── */
const LP_CSS = ".lp-mv{transition:transform 420ms cubic-bezier(.3,.7,.25,1)}.lp-fd{transition:opacity 420ms linear}.lp-mf{transition:transform 420ms cubic-bezier(.3,.7,.25,1),opacity 420ms linear}@keyframes lpb{50%{opacity:0}}.lp-caret{animation:lpb 1s steps(1) infinite}@keyframes lpr{0%{opacity:1}50%{opacity:.1}}.lp-blink{animation:lpr .9s steps(1,end) infinite}@media (prefers-reduced-motion:reduce){.lp-mv,.lp-fd,.lp-mf{transition:none}.lp-caret,.lp-blink{animation:none}}";
const LP_DW = 880;              /* the picture is laid out in this width and centred in the room the board gives */
const LP_MAXW = 895;            /* nothing of it (a skin's whole box included) goes past this with the keypad open */
const LP_CARD_Y = 312;
const LP_KEY = { w: 300, h: 72, y: 436 };
const LP_RAIL = { y: 316, w: 204, h: 108, gap: 6 };
const LP_ACT_LABEL: any = { push: "Push together", lift: "Lift away", gather: "Gather wholes", reduce: "Reduce" };

/* counted slices: half a deep navy over the cake (the cake shows) and a dark inset edge; plain cake is not counted */
const LP_NAVY = shade(CONTENT.hundred, 0.25), LP_EDGE = "#020B14", LP_MARK = shade(CONTENT.ten, 0.6), LP_HALO = "#FFF7E6", LP_WASH = 0.5;
const lpRad = (a: number) => (a * Math.PI) / 180;
const lpPt = (cx: number, cy: number, r: number, a: number) => ({ x: cx + r * Math.sin(lpRad(a)), y: cy - r * Math.cos(lpRad(a)) });
const lpWedgeD = (cx: number, cy: number, r: number, a0: number, a1: number) => {
  const p = lpPt(cx, cy, r, a0), q = lpPt(cx, cy, r, a1);
  return `M ${cx} ${cy} L ${p.x.toFixed(2)} ${p.y.toFixed(2)} A ${r} ${r} 0 ${a1 - a0 > 180 ? 1 : 0} 1 ${q.x.toFixed(2)} ${q.y.toFixed(2)} Z`;
};
const lpSlotRot = (s: number, d: number) => ((((s + 0.5) * 360) / d + 180) % 360) - 180;       /* the slot's centre angle, the short way round */
const lpFresh = (qk: string) => ({ qk, done: 0, m: 0, land: 0, g: 0, sg: 0, rd: false, corr: false, cnt: false, lit: false, tracing: false });
/* the pieces moved by the first act, the lines the reduce act rubs out, and the state of a finished sum */
const lpMFull = (it: any, plan: any) => (plan.tidy && !plan.take ? it.a + it.b : it.b);
const lpSeams = (plan: any) => { const out: number[] = []; if (plan.f > 1) for (let k = 0; k < plan.d; k++) if (k % plan.f !== 0) out.push(k); return out; };
const lpFinal = (it: any, plan: any) => ({ done: plan.acts.length, m: lpMFull(it, plan), land: lpMFull(it, plan), g: plan.W > 0 ? 1 : 0, sg: lpSeams(plan).length, rd: plan.f > 1 });

/* THE ROOM. One radius R for a loose slice AND a plate (so a whole takes exactly d slices), picked per sum: the biggest of 128 down
   that keeps every slice, plate and skin box inside the room the board gives (900 wide with the keypad open) and clear of the card,
   the key and the rail. A plain screen (no plates) has the big badge; a busy one (plates) the compact badge. */
const lpG = (it: any, plan: any, R: number) => {
  const sparse = !plan.tidy, top = sparse ? 146 : 112, np = plan.W + (plan.rem > 0 ? 1 : 0), cy = top + R;
  const pc = !plan.tidy ? [] : np <= 1 ? [{ x: LP_MAXW - Math.ceil(1.42 * R), y: cy }] : [{ x: LP_MAXW - 3 * R - 27, y: cy }, { x: LP_MAXW - R - 5, y: cy }];
  const left = pc.length ? Math.min(...pc.map((c) => c.x - R)) : 0;
  return { R, top, sparse, yA: top + R, yB: top + 2 * R + 16, pc, xMax: plan.tidy ? left - 14 : 628, ledge: sparse ? 240 : 190 };
};
const lpPw = (d: number, R: number) => 2 * R * Math.sin(Math.PI / d);                          /* a slice's width at its rim */
/* the i-th of `count` loose slices in a row (apex position) inside x0..xMax; `over` when they do not fit one row */
const lpRow = (i: number, count: number, d: number, R: number, x0: number, xMax: number, y: number) => {
  const pw = lpPw(d, R), pitch = pw + 5, per = Math.max(1, Math.floor((xMax - x0 + 5) / pitch)), r = Math.floor(i / per), rows = Math.ceil(count / per);
  const inRow = r < rows - 1 ? per : count - per * (rows - 1), rowW = inRow * pitch - 5;
  const left = Math.max(R - pw / 2, x0 + (xMax - x0 - rowW) / 2);
  return { x: left + pw / 2 + (i % per) * pitch, y: y + r * (R + 14), over: count > per };
};

/* where every slice is for a state S: on the bench, on the ledge, sliding to its slot, or (fill) already part of its plate's cake */
const lpPlace = (it: any, plan: any, S: any, G: any) => {
  const d = it.d, R = G.R, out: any[] = [], N = plan.take ? it.a : it.a + it.b, k = it.a - it.b;
  const slot = (i: number) => {
    const p = plan.take ? 0 : Math.floor(i / d), s = plan.take ? i : i % d, up = !!S.g && p < plan.W;
    return { x: G.pc[p].x, y: G.pc[p].y - (up ? 14 : 0), rot: lpSlotRot(s, d), q: p };
  };
  const loose = (pos: any, extra?: any) => ({ x: pos.x, y: pos.y, rot: 0, counted: true, line: true, skin: true, over: pos.over, ...extra });
  for (let i = 0; i < N; i++) {
    if (!plan.take) {
      const j = i - it.a, counted = i < it.a || (plan.tidy ? i < S.m : j < S.m);
      if (plan.tidy) {
        if (i < S.land) out.push({ fill: true, q: Math.floor(i / d), counted: true });
        else if (i < S.m) out.push({ ...slot(i), counted: true, line: false, skin: true });
        else out.push(loose(i < it.a ? lpRow(i, it.a, d, R, 4, G.xMax, G.yA) : lpRow(j, it.b, d, R, 4, G.xMax, G.yB), { counted }));
      } else if (i < it.a) out.push(loose(lpRow(i, it.a + S.m, d, R, 4, G.xMax, G.yA)));
      else out.push(loose(j < S.m ? lpRow(i, it.a + S.m, d, R, 4, G.xMax, G.yA) : lpRow(j, it.b, d, R, 4, G.xMax, G.yB), { counted }));
    } else {
      const j = i - k;
      if (j >= 0 && j < S.m) out.push(loose(lpRow(j, it.b, d, R, G.ledge, G.xMax, G.yB), { counted: false, mark: true }));   /* lifted: plain cake on the ledge */
      else if (plan.tidy) out.push(j < 0 ? { fill: true, q: 0, counted: true } : { ...slot(i), counted: true, line: false, skin: true, mark: true });
      else out.push(loose(lpRow(i, it.a, d, R, 4, G.xMax, G.yA), j >= 0 ? { mark: true } : {}));
    }
  }
  return out;
};
const lpFits = (it: any, plan: any, R: number, rail: boolean) => {
  const G = lpG(it, plan, R), full = lpFinal(it, plan);
  if (G.pc.length && G.pc[0].y + R > 312) return false;
  for (const S of [{ m: 0, land: 0, g: 0 }, full]) {
    for (const p of lpPlace(it, plan, S, G)) {
      if (p.fill) continue;
      const rb = p.rot ? 1.42 * R : R;
      if (p.over || p.x - rb < 0 || p.x + rb > LP_MAXW || p.y + rb > 520) return false;
      if (p.line && (p.x + lpPw(it.d, R) / 2 > G.xMax + 2 || p.y > (rail ? 308 : 430))) return false;
    }
  }
  return true;
};
const lpPickR = (it: any, plan: any, rail: boolean) => { for (let R = 128; R >= 60; R -= 2) if (lpFits(it, plan, R, rail)) return R; return 60; };

/* what the hand (or the eraser) does for an act: its tool, where it acts (Work coordinates) and how many moments it has */
const lpDesc = (on: string, it: any, plan: any, ox: number, G: any) => {
  if (on === "push" || on === "lift") {
    const pcs = lpPlace(it, plan, { m: 0, land: 0, g: 0 }, G);
    const idx: number[] = []; const first = plan.take ? it.a - it.b : (plan.tidy ? 0 : it.a), last = plan.take ? it.a : it.a + it.b;
    for (let i = first; i < last; i++) idx.push(i);
    const at = idx.map((i) => (pcs[i].fill ? { x: ox + G.pc[0].x, y: G.pc[0].y } : { x: ox + pcs[i].x, y: pcs[i].y - G.R * 0.45 }));
    return { tool: "hand", moves: "push", at, from: { x: at[0].x - 50, y: at[0].y }, to: { x: at[at.length - 1].x + 50, y: at[at.length - 1].y }, n: at.length };
  }
  if (on === "gather") return { tool: "hand", moves: "tap", at: [{ x: ox + G.pc[0].x, y: G.pc[0].y }], n: 1 };
  const pcx = G.pc[plan.W];
  const at = lpSeams(plan).map((k) => lpPt(ox + pcx.x, pcx.y, G.R * 0.58, (k * 360) / plan.d));
  return { tool: "eraser", moves: "rub", at, n: at.length };
};
/* a slice lands in its plate a moment after it starts sliding (reduced motion: at once) */
const lpLand = (put: any, n: number) => { if (reducedMotion()) put({ land: n }); else setTimeout(() => put({ land: n }), 450); };
/* the picture at the moment i of an act, and at its end */
const lpApply = (on: string, i: number, put: any, api: any) => {
  if (on === "push" || on === "lift") { put({ m: i + 1 }); if (on === "push") lpLand(put, i + 1); api.sfx.tick(); }
  else if (on === "gather") { put({ g: 1 }); api.sfx.trade(); }
  else { put({ sg: i + 1 }); api.sfx.tick(); }
};
const lpEnd = (on: string, it: any, plan: any, put: any, api: any) => {
  const k = plan.acts.indexOf(on);
  if (on === "push" || on === "lift") { put({ m: lpMFull(it, plan), done: k + 1 }); if (on === "push") lpLand(put, lpMFull(it, plan)); }
  else if (on === "gather") put({ g: 1, done: k + 1 });
  else put({ sg: lpSeams(plan).length, rd: true, done: k + 1 });
  api.sfx.settle();
};

/* a stacked fraction: top over a bar over bottom, centred on x (baseline of the top at y) */
function LpFrac({ x, y, n, d, size, C }: any) {
  const wd = Math.max(String(n).length, String(d).length) * size * 0.62 + 12;
  return (
    <g>
      <text x={x} y={y} textAnchor="middle" fontSize={size} fontWeight={700} fill={C.ink}>{n}</text>
      <line x1={x - wd / 2} x2={x + wd / 2} y1={y + size * 0.24} y2={y + size * 0.24} stroke={C.ink} strokeWidth={4} strokeLinecap="round" />
      <text x={x} y={y + size * 1.12} textAnchor="middle" fontSize={size} fontWeight={700} fill={C.ink}>{d}</text>
    </g>
  );
}

/* one slice: a wedge with its apex at the origin, moved by CSS so a change of place slides */
function LpPiece({ d, R, x, y, rot, counted, line, mark, skin, C }: any) {
  const th = 180 / d, path = lpWedgeD(0, 0, R, -th, th), cw = "url(#lp-w" + d + ")";
  return (
    <g className="lp-mv" style={{ transform: `translate(${x}px,${y}px) rotate(${rot}deg)` } as any}>
      <path d={path} fill="#FBEFD2" />
      {skin && <Skin name="disc" x={-R} y={-R} w={2 * R} h={2 * R} clip={cw} />}
      {counted && <path d={path} fill={LP_NAVY} fillOpacity={LP_WASH} />}
      {counted && <path d={path} fill="none" stroke={LP_EDGE} strokeWidth={6} clipPath={cw} />}
      {line && <path d={path} fill="none" stroke={C.ink} strokeWidth={3} strokeLinejoin="round" />}
      {mark && <path d={path} fill="none" stroke={counted ? LP_HALO : LP_MARK} strokeWidth={9} strokeDasharray="10 8" clipPath={cw} />}
    </g>
  );
}

/* the slices that have landed in a plate: ONE whole cake skin clipped to their union (a sector from the top), counted wash and edge */
function LpFill({ cx, cy, R, d, c, q, closed }: any) {
  if (c <= 0) return null;
  const sec = (props: any) => (c >= d ? <circle r={R} {...props} /> : <path d={lpWedgeD(0, 0, R, 0, (c * 360) / d)} {...props} />);
  const cl = "url(#lp-u" + q + ")";
  return (
    <g className="lp-mv" style={{ transform: `translate(${cx}px,${cy - (closed ? 14 : 0)}px)` } as any}>
      {sec({ fill: "#FBEFD2" })}
      <Skin name="disc" x={-R} y={-R} w={2 * R} h={2 * R} clip={cl} />
      {sec({ fill: LP_NAVY, fillOpacity: LP_WASH })}
      {sec({ fill: "none", stroke: LP_EDGE, strokeWidth: 6, clipPath: cl })}
    </g>
  );
}

/* a gathered whole: the whole cake, plain and uncounted, one unbroken circle over the plate's slices (the green ring is outside it) */
function LpWhole({ cx, cy, R, on, C }: any) {
  return (
    <g className="lp-mf" style={{ transform: `translate(${cx}px,${cy - (on ? 14 : 0)}px)`, opacity: on ? 1 : 0 } as any}>
      <circle r={R} fill="#FBEFD2" />
      <Skin name="disc" x={-R} y={-R} w={2 * R} h={2 * R} clip="url(#lp-circ)" />
      <circle r={R - 1.5} fill="none" stroke={C.ink} strokeWidth={3} />
    </g>
  );
}

/* a plate: the empty outline underneath (top=false) and its ruled lines over the slices (top=true) */
function LpPlate({ cx, cy, R, d, alive, closed, top, C }: any) {
  const ln: any[] = [];
  if (top) for (let k = 0; k < d; k++) { const q = lpPt(0, 0, R, (k * 360) / d); ln.push(<g key={k} className="lp-fd" style={{ opacity: closed ? 0 : alive[k] ? 1 : 0 } as any}><line x1={0} y1={0} x2={q.x} y2={q.y} stroke={LP_HALO} strokeWidth={7} strokeLinecap="round" /><line x1={0} y1={0} x2={q.x} y2={q.y} stroke={C.ink} strokeWidth={3} strokeLinecap="round" /></g>); }
  return (
    <g className="lp-mv" style={{ transform: `translate(${cx}px,${cy - (closed ? 14 : 0)}px)` } as any}>
      {top ? <g>{ln}<circle className="lp-fd" r={R + 7} fill="none" stroke={CONTENT.one} strokeWidth={8} style={{ opacity: closed ? 1 : 0 } as any} /></g>
        : <circle r={R} fill={tint(CONTENT.ten, 0.84)} stroke={C.ink} strokeWidth={3} strokeDasharray={closed ? undefined : "10 8"} />}
    </g>
  );
}

/* a station of the tidy rail: waiting, ran, or dashed with its one-line reason printed under its name (a taller pitch in Hindi and Gujarati) */
function LpChip({ x, y, label, state, reason, C, tx, lang }: any) {
  const skip = state === "skip", ran = state === "ran", pitch = lang === "en" ? 40 : 51;
  return (
    <g>
      <rect x={x} y={y} width={LP_RAIL.w} height={LP_RAIL.h} rx={16} fill={ran ? tint(C.accent, 0.82) : skip ? tint(C.panel, 0.55) : "#FFFFFF"} stroke={ran ? C.accent : C.rule} strokeWidth={ran ? 5 : 3} strokeDasharray={skip ? "10 8" : undefined} />
      <text x={x + LP_RAIL.w / 2} y={y + 38} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{tx(label)}</text>
      {skip && reason ? <text x={x + LP_RAIL.w / 2} y={y + 38 + pitch} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={C.ink}>{tx(reason)}</text> : null}
    </g>
  );
}

/* the answer card: boxes the child fills with the keypad (whole, top, bottom), a tap target while the keypad is shut; while the
   picture still waits for an act the whole card is a "card-wait" control that points at the blinking key */
function LpCard({ x, y, np, vals, part, open, ready, waiting, onWait, api, C }: any) {
  const mixed = np === 3, cw = mixed ? 244 : 168, ch = 200;
  const cells = mixed ? [{ x: 16, y: 16, w: 84, h: 168 }, { x: 116, y: 16, w: 112, h: 76 }, { x: 116, y: 108, w: 112, h: 76 }]
    : [{ x: 16, y: 16, w: 136, h: 76 }, { x: 16, y: 108, w: 136, h: 76 }];
  const names = mixed ? ["Whole", "Top", "Bottom"] : ["Top", "Bottom"];
  const bar = mixed ? [116, 228] : [16, 152];
  return (
    <g>
      <g transform={`translate(${x},${y})`}>
        <rect width={cw} height={ch} rx={22} fill={tint(C.panel, 0.6)} stroke={C.rule} strokeWidth={3} />
        {cells.map((c, j) => {
          const on = open && part === j;
          return (
            <g key={j}>
              <rect x={c.x} y={c.y} width={c.w} height={c.h} rx={14} fill="#FFFFFF" stroke={on ? C.accent : C.ink} strokeWidth={on ? 6 : 3} />
              <text x={c.x + c.w / 2} y={c.y + c.h / 2 + 24} textAnchor="middle" fontSize={T.display} fontWeight={700} fill={C.ink}>{vals[j]}</text>
              {on && !vals[j] && <rect className="lp-caret" x={c.x + c.w / 2 - 2} y={c.y + c.h / 2 - 26} width={4} height={52} fill={C.accent} />}
            </g>
          );
        })}
        <line x1={bar[0]} x2={bar[1]} y1={100} y2={100} stroke={C.ink} strokeWidth={5} strokeLinecap="round" />
      </g>
      {open && cells.map((c, j) => <SlotPartBox key={j} id={"part-" + (j + 1)} label={names[j]} x={x + c.x} y={y + c.y} w={c.w} h={c.h} on={part === j} enabled={true} onPick={() => api.pickPart(j)} />)}
      {!open && ready && <SlotPartBox id="answer-open" label="Answer card" x={x} y={y} w={cw} h={ch} enabled={true} onPick={api.openAnswer} />}
      {!open && ready && <BlinkRing x={x} y={y} w={cw} h={ch} rx={22} C={C} />}
      {!open && !ready && waiting && <SlotPartBox id="card-wait" label="Answer card" x={x} y={y} w={cw} h={ch} enabled={true} onPick={onWait} />}
    </g>
  );
}

/* after a miss: the right answer, stacked, in a box of its own beside the count (the child's own answer stays on the card) */
function LpAnswer({ x, w, h, sparse, ans, C, tx }: any) {
  const wh = ans.length === 3 ? ans[0] : null, tp = ans[ans.length - 2], bt = ans[ans.length - 1];
  const size = sparse ? 64 : 36, y0 = sparse ? 55 : 33, fx = x + w - 64;
  return (
    <g>
      <rect x={x} y={0} width={w} height={h} rx={20} fill={tint(C.panel, 0.6)} stroke={C.accent} strokeWidth={4} />
      <text x={x + 18} y={sparse ? 84 : 50} fontSize={sparse ? T.prompt : T.label} fontWeight={700} fill={C.ink}>{tx("Answer")}</text>
      {wh !== null && wh !== undefined ? <text x={tp === null || tp === undefined ? fx : fx - 62} y={y0 + size * 0.6} textAnchor="middle" fontSize={size * 1.25} fontWeight={700} fill={C.ink}>{wh}</text> : null}
      {tp !== null && tp !== undefined ? <LpFrac x={fx} y={y0} n={tp} d={bt} size={size} C={C} /> : null}
    </g>
  );
}

function Work({ phase, n, item, index, stage, wrong, typed, api, MODEL, step, stepOn, box, answerOn, cardKind, part, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();
  const free = stage === "free", demo = stage === "demo" || stage === "teach";
  const [fi, setFi] = useState(0);
  const it = free ? FREE_SUMS[fi % FREE_SUMS.length] : demo ? WARM[n - 1] : item;
  const plan = lpPlan(it);
  const showRail = free || n === 4;
  const R = lpPickR(it, plan, showRail), G = lpG(it, plan, R), sparse = G.sparse;
  const qk = free ? "f" + fi : demo ? "w" + n : n + "." + index;
  const qkRef = useRef(qk);
  qkRef.current = qk;
  const [raw, setRaw] = useState(() => lpFresh(qk));
  const S: any = raw.qk === qk ? raw : lpFresh(qk);
  const put = (p: any) => setRaw((r0: any) => (qkRef.current !== qk ? r0 : { ...(r0.qk === qk ? r0 : lpFresh(qk)), ...p }));
  const bw = box ? box.w : W.w;
  const ox = Math.max(0, Math.round((bw - LP_DW) / 2));
  const isCard = !!item.parts && !free && !demo;
  const cur = plan.acts[S.done];
  /* the first (learn) question of a phase that needs plates waits for the acts; the later ones may be answered from the picture or the head */
  const ready = !isCard || stage !== "ask" || !plan.tidy || index > 0 || S.done >= plan.acts.length;
  const waiting = isCard && stage === "ask" && !ready && !!cur && !S.tracing;
  const busy = useRef(false);
  const [acting, setActing] = useState(false);
  const lastKey = useRef(0);
  const lastNew = useRef(0);
  const nudged = useRef(false);

  /* the child's act (and the agent's, and Enter's): one hand or eraser pass, the picture follows it, then the step moves on */
  const actNow = async (on: string) => {
    if (S.tracing || busy.current || on !== plan.acts[S.done]) return;
    busy.current = true;
    setActing(true);
    const dsc: any = lpDesc(on, it, plan, ox, G);
    const ok = await api.act({ tool: dsc.tool, moves: dsc.moves, at: dsc.at, from: dsc.from, to: dsc.to, ms: 1000, onPoint: (i: number) => lpApply(on, i, put, api) });
    busy.current = false;
    setActing(false);
    if (!ok) return;
    lpEnd(on, it, plan, put, api);
    if (stage === "demo") api.did(on);
    else if (nudged.current && stage === "ask") { nudged.current = false; api.say(item.say); }
  };
  const pressKey = (on: string) => { const t = Date.now(); if (t - lastKey.current < 400 || t - lastNew.current < 500) return; lastKey.current = t; actNow(on); };
  /* a tap on the waiting card says which key to tap (one literal line per act, so each has its Hindi and Gujarati) */
  const nudge = () => {
    if (cur === "push") api.say("Tap the blinking Push together key.");
    else if (cur === "lift") api.say("Tap the blinking Lift away key.");
    else if (cur === "gather") api.say("Tap the blinking Gather wholes key.");
    else if (cur === "reduce") api.say("Tap the blinking Reduce key.");
    nudged.current = true;
  };
  api.onEnter(demo && stepOn ? () => actNow(stepOn) : waiting ? () => actNow(cur) : null);
  HOOK.demo = () => { if (stepOn) actNow(stepOn); };
  HOOK.check = stage === "ask" && !S.tracing ? () => { if (isCard && !ready) { put(lpFinal(it, plan)); api.cardReady(true); api.onEnter(null); /* the agent answered without the acts: the Enter that follows this hook must SEND the typed answer, not play the first act (this render's waiting handler is still the one registered) */ } return undefined; } : null;
  /* after each act the focus goes on to the next act key */
  useEffect(() => {
    if (!S.done || !cur) return;
    const t = setTimeout(() => {
      const ae: any = document.activeElement, id = ae && ae.getAttribute ? ae.getAttribute("data-control") : null;
      if (!ae || ae === document.body || id === "push" || id === "lift" || id === "gather" || id === "reduce") { const el: any = document.querySelector('[data-control="' + cur + '"]'); if (el && el.focus) el.focus(); }
    }, 80);
    return () => clearTimeout(t);
  }, [S.done, qk]);

  /* the traceback: the sum is worked again from the start, piece by piece, ending with the right answer beside the count */
  useEffect(() => {
    if (!wrong || stage !== "ask") return;
    api.lock(true);
    put({ ...lpFresh(qk), cnt: true, lit: true, tracing: true });
    const steps: any[] = [[700, () => {}]];
    plan.acts.forEach((on: string) => {
      const dsc: any = lpDesc(on, it, plan, ox, G), dt = Math.max(70, Math.round(1000 / Math.max(1, dsc.n)));
      for (let i = 0; i < dsc.n; i++) steps.push([dt, () => lpApply(on, i, put, api)]);
      steps.push([700, () => lpEnd(on, it, plan, put, api)]);
    });
    steps.push([300, () => put({ corr: true, tracing: false, lit: false })]);
    tl.run(steps, () => api.lock(false));
  }, [wrong]);
  useEffect(() => () => { tl.stop(); }, [qk]);
  /* a right answer given without the acts (the agent's) still shows the finished picture, and says its win line */
  useEffect(() => {
    if ((stage === "win" || stage === "idle") && !free && S.done < plan.acts.length) put(lpFinal(it, plan));
    if (stage === "win" && item.win) api.say(item.win);
  }, [stage, qk]);
  /* the card waits for the picture when the sum still needs plates */
  useEffect(() => { if (answerOn === "card") api.cardReady(ready, !ready); else api.cardReady(true); }, [qk, ready, answerOn, stage]);
  api.share({ pieceSize: it.d, first: it.a, second: it.b, operation: plan.take ? "take" : "add", tidied: S.rd, complete: stage === "idle" });

  const pcs = lpPlace(it, plan, S, G), pc = G.pc;
  const fills = pc.map(() => 0);
  pcs.forEach((p: any) => { if (p.fill) fills[p.q] += 1; });
  const seams = lpSeams(plan);
  /* the count is the number of counted (navy) slices on show */
  const showCount = S.cnt || stage !== "ask";
  const count = plan.take ? it.a - S.m : plan.tidy ? Math.max(S.m, it.a) - (S.g ? plan.W * it.d : 0) : it.a + S.m;
  const joined = S.done >= 1, gDone = !plan.W || S.g;
  const rail = [
    { label: "Gather", state: plan.W ? (S.g ? "ran" : "wait") : joined ? "skip" : "wait", reason: "No whole" },
    { label: "Reduce", state: plan.f > 1 ? (S.rd ? "ran" : "wait") : joined && gDone ? "skip" : "wait", reason: plan.rem ? "Not shared" : "None left" },
    { label: "All done", state: S.done >= plan.acts.length && joined ? "ran" : "wait", reason: "" },
  ];
  const keyX = free ? (cur ? 165 : 325) : 290;
  const np3 = item.parts ? item.parts.length : 2;
  const vals = slotPartsOf(typed, np3);
  const showCard = isCard && (stage === "ask" || stage === "win" || stage === "idle");
  const cardW = np3 === 3 ? 244 : 168;
  const bh = sparse ? 136 : 100, bwid = sparse ? 380 : 320, cntX = bwid + 24;
  const showAns = isCard && S.corr && stage === "ask" && Array.isArray(item.answer);

  return (
    <g>
      <style>{LP_CSS}</style>
      <defs>
        <clipPath id={"lp-w" + it.d}><path d={lpWedgeD(0, 0, R, -180 / it.d, 180 / it.d)} /></clipPath>
        <clipPath id="lp-circ"><circle r={R} /></clipPath>
        {pc.map((c, q) => <clipPath key={"u" + q} id={"lp-u" + q}>{fills[q] >= it.d ? <circle r={R} /> : <path d={lpWedgeD(0, 0, R, 0, (Math.max(fills[q], 0) * 360) / it.d)} />}</clipPath>)}
      </defs>
      <g transform={`translate(${ox},0)`}>
        <rect x={0} y={0} width={bwid} height={bh} rx={20} fill={tint(C.panel, 0.6)} stroke={S.lit ? C.accent : C.rule} strokeWidth={S.lit ? 7 : 3} />
        <text x={20} y={sparse ? 82 : 60} fontSize={sparse ? T.prompt : T.label} fontWeight={700} fill={C.ink}>{tx("Each piece")}</text>
        <LpFrac x={sparse ? 318 : 262} y={sparse ? 60 : 42} n={1} d={it.d} size={sparse ? 64 : 44} C={C} />
        {showCount && <g><text x={cntX} y={sparse ? 66 : 56} fontSize={sparse ? T.display : T.xl} fontWeight={700} fill={C.ink}>{count}</text><text x={cntX} y={sparse ? 118 : 94} fontSize={T.label} fontWeight={600} fill={C.ink}>{tx("counted")}</text></g>}
        {showAns && <LpAnswer x={sparse ? 580 : 540} w={sparse ? 300 : 340} h={sparse ? bh : 80} sparse={sparse} ans={item.answer} C={C} tx={tx} />}
        {plan.take && <text x={0} y={G.yB - R * 0.45 + 12} fontSize={sparse ? T.prompt : T.label} fontWeight={700} fill={C.ink}>{tx("Taken away")}</text>}
        {plan.tidy && pc.map((c, q) => <LpPlate key={qk + "b" + q} cx={c.x} cy={c.y} R={R} d={it.d} closed={!!S.g && q < plan.W} top={false} C={C} />)}
        {plan.tidy && pc.map((c, q) => <LpFill key={qk + "f" + q} cx={c.x} cy={c.y} R={R} d={it.d} c={fills[q]} q={q} closed={!!S.g && q < plan.W} />)}
        {pcs.map((p: any, i: number) => (p.fill ? null : <LpPiece key={qk + ":" + i} d={it.d} R={R} x={p.x} y={p.y} rot={p.rot} counted={p.counted} line={p.line} mark={p.mark} skin={p.skin} C={C} />))}
        {plan.tidy && plan.W > 0 && pc.slice(0, plan.W).map((c, q) => <LpWhole key={qk + "w" + q} cx={c.x} cy={c.y} R={R} on={!!S.g} C={C} />)}
        {plan.tidy && pc.map((c, q) => {
          const alive: boolean[] = [];
          for (let k = 0; k < it.d; k++) { const si = q === plan.W ? seams.indexOf(k) : -1; alive.push(!(si >= 0 && si < S.sg)); }
          return <LpPlate key={qk + "t" + q} cx={c.x} cy={c.y} R={R} d={it.d} alive={alive} closed={!!S.g && q < plan.W} top={true} C={C} />;
        })}
        {showRail && rail.map((r, j) => <LpChip key={j} x={j * (LP_RAIL.w + LP_RAIL.gap)} y={LP_RAIL.y} label={r.label} state={r.state} reason={r.reason} C={C} tx={tx} lang={lang} />)}
        {showCard && <LpCard x={LP_DW - cardW} y={LP_CARD_Y} np={np3} vals={vals} part={part} open={!!(box && box.open)} ready={stage === "ask" && answerOn === "card" && ready} waiting={waiting} onWait={nudge} api={api} C={C} />}
        {cur && !S.tracing && (demo || stage === "ask" || free) && (
          <Key id={cur} x={keyX} y={LP_KEY.y} w={LP_KEY.w} h={LP_KEY.h} C={C} tone="key" label={LP_ACT_LABEL[cur]} onClick={() => pressKey(cur)}>
            <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={toneInk("key", C.ink)}>{tx(LP_ACT_LABEL[cur])}</text>
          </Key>
        )}
        {waiting && !acting && !(box && box.open) && <rect className="lp-blink" x={keyX - 5} y={LP_KEY.y - 5} width={LP_KEY.w + 10} height={LP_KEY.h + EDGE + 10} rx={RAD.key + 5} fill="none" strokeWidth={5} stroke={(THEME && THEME.enter && THEME.enter[1]) || C.accent} pointerEvents="none" />}
        {demo && stepOn && stepOn === cur && <Invite x={keyX + LP_KEY.w / 2} y={LP_KEY.y + LP_KEY.h / 2} w={LP_KEY.w} h={LP_KEY.h} C={C} />}
        {free && (
          <Key id="new-sum" x={485} y={LP_KEY.y} w={230} h={LP_KEY.h} C={C} tone="soft" label="New sum" onClick={() => { if (!S.tracing && !busy.current) { lastNew.current = Date.now(); setFi(fi + 1); } }}>
            <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={toneInk("soft", C.ink)}>{tx("New sum")}</text>
          </Key>
        )}
      </g>
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase */
function Thumb({ result, it, C, w, h, lang = "en", tx = (v: any) => v }: any) {
  const last = result && result.last;
  if (!last) return null;
  const item = it || last.it;
  const th = 180 / 8, path = lpWedgeD(0, 0, 40, -th, th);
  const slice = (x: number, y: number, k: any, counted: boolean) => <g key={k} transform={`translate(${x},${y})`}><path d={path} fill="#FBEFD2" />{counted ? <path d={path} fill={LP_NAVY} fillOpacity={LP_WASH} /> : null}<path d={path} fill="none" stroke={C.ink} strokeWidth={2.5} strokeLinejoin="round" /></g>;
  let body: any = null;
  if (item && item.parts) {
    const np = item.parts.length, v = slotPartsOf(last.value, np), whole = np === 3 ? v[0] : "", top = v[np - 2], bot = v[np - 1], cx = w - 70, hasFrac = !!(top || bot);
    body = (
      <g>
        {whole ? <text x={hasFrac ? cx - 62 : cx} y={h / 2 + 14} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={C.ink}>{whole}</text> : null}
        {hasFrac ? <LpFrac x={cx} y={h / 2 - 6} n={top} d={bot} size={36} C={C} /> : null}
        {slice(46, h / 2 + 24, 0, true)}{slice(100, h / 2 + 24, 1, true)}
      </g>
    );
  } else {
    /* the why question: two slices of one size side by side, and an equals sign between them */
    body = (
      <g>
        {slice(w / 2 - 60, h / 2 + 24, 0, true)}{slice(w / 2 + 60, h / 2 + 24, 1, true)}
        <line x1={w / 2 - 16} x2={w / 2 + 16} y1={h / 2 - 5} y2={h / 2 - 5} stroke={C.ink} strokeWidth={5} strokeLinecap="round" />
        <line x1={w / 2 - 16} x2={w / 2 + 16} y1={h / 2 + 9} y2={h / 2 + 9} stroke={C.ink} strokeWidth={5} strokeLinecap="round" />
      </g>
    );
  }
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      {body}
    </g>
  );
}

function LikePiecesBench(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, fitHost: () => null,
      board: true, keyOnly: true, bigPad: true, nextKey: true, navDots: true, cardAnswer: true,
      StartArt, START_HOOK,
      }} />
  );
}

export default LikePiecesBench;
