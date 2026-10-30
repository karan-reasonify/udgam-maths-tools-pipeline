/* ═══ M3.S4.T6.C28.2D1 · per_cent_of · Part Finder ═══════════════════════════════════════════
   The runtime (prepended at build) draws everything outside the working area. THE LESSON IS SILENT (r30) and keyOnly
   (the new look): the question lives only in the bubble, the key stands in the top-right corner (box.key), every act is
   performed on screen (api.act). NO imports; only the five host hooks. docs/LAYOUT.md, docs/PATTERNS.md.
   The picture: one whole bar (100%) the child folds (Half, Quarter, Tenth) or cuts into ten, lights part by part
   (the Half a tenth key leaves only half of the last lit tenth lit, 5%), changes to the answer's unit with the Unit fact card, and on
   phase 4 lifts the used part off with Use so the part left shows green. Laid out once in x 0 to 900 (the width
   the working area has with the wide keypad open), centred while the keypad is shut. */

const TOOL_ID = "per_cent_of";
const MEDIA_ID = "M3.S4.T6.C28.2D1";
const TOOL_NAME = "Part Finder";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
/* kept for the tool object's shape (and the sidecar); nothing speaks from r30 */
const VOICE = {"rate":0.92,"pitch":1.06};

/* printed before phase 1's teach lines only (phase 1 has steps, so it is not shown) */
const OPENING = ["A whole bar, ready to be folded or cut."];
/* not shown from r44 (the simple summary page) */
const FINISH_LINE = "You found every part, and said which part was asked for.";
/* printed when the child opens Free play: everything it names is live in the free branch of Work */
const FREE_LINE = "Free play: fold the bar, light parts, double it, use a part or change the unit.";

/* THE START PAGE (docs/LAYOUT.md §1c) */
const START_HOOK = "Can folding a bar tell you what 25% of a number is?";
function StartArt({ box, C, lang, tx = (v: any) => v }: any) {
  const x0 = 100, L = box.w - 200, y0 = 120, bh = 150, k = 4, pw = L / k;
  return (
    <g>
      <text x={x0} y={y0 - 30} fontSize={T.prompt} fontWeight={700} fill={PF.line}>{tx("Whole")}</text>
      <text x={x0 + L} y={y0 - 30} textAnchor="end" fontSize={T.speech} fontWeight={700} fill={PF.line}>100%</text>
      <defs><clipPath id="pfStartClip"><rect x={x0} y={y0} width={L} height={bh} rx={6} /></clipPath></defs>
      <rect x={x0} y={y0} width={L} height={bh} rx={6} fill={PF.sheet} />
      <Skin name="ribbon" x={x0} y={y0} w={L} h={bh} clip="url(#pfStartClip)" />
      {Array.from({ length: k }).map((_, i) => (
        <g key={i}>
          <rect x={x0 + i * pw} y={y0} width={pw} height={bh} fill={PF.amber} fillOpacity={i === 0 ? 0.8 : 0} stroke={PF.line} strokeWidth={3} />
          <rect x={x0 + (i + 0.5) * pw - 56} y={y0 + bh / 2 - 22} width={112} height={46} rx={8} fill={PF.sheet} fillOpacity={0.94} />
          <text x={x0 + (i + 0.5) * pw} y={y0 + bh / 2 + 14} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={PF.line}>25%</text>
        </g>
      ))}
      <rect x={x0} y={y0} width={L} height={bh} rx={6} fill="none" stroke={PF.line} strokeWidth={5} />
    </g>
  );
}

/* Hindi and Gujarati (docs/PATTERNS.md §11), keyed by the English byte for byte. Terms: प्रतिशत / ટકા, भाग / ભાગ (part),
   आधा / અડધું, चौथाई / ચોથો ભાગ, दसवाँ भाग / દસમો ભાગ, बार / વખત (lots), पट्टी / પટ્ટી (bar), रंगो / રંગો (light),
   इकाई / એકમ (unit); units in words in the bubble, abbreviated where drawn. */
const TR: any = {
  hi: {
    "Part Finder": "भाग खोजो",
    "Benchmark per cents": "मुख्य प्रतिशत",
    "Per cent of a number": "किसी संख्या का प्रतिशत",
    "Per cent of a measure": "किसी माप का प्रतिशत",
    "What is left": "क्या बचा",
    "A whole bar, ready to be folded or cut.": "एक पूरी पट्टी, मोड़ने या काटने के लिए तैयार।",
    "Free play: fold the bar, light parts, double it, use a part or change the unit.": "खुला खेल: पट्टी मोड़ो, भाग रंगो, दुगुना करो, भाग उपयोग करो या इकाई बदलो।",
    "Can folding a bar tell you what 25% of a number is?": "क्या पट्टी मोड़कर तुम किसी संख्या का 25% जान सकते हो?",
    /* phase 1 */
    "25% is a quarter, so tap Quarter to fold the bar into four equal parts.": "25% एक चौथाई है, तो चौथाई दबाकर पट्टी को चार बराबर भागों में मोड़ो।",
    "Tap the Quarter key under the bar.": "पट्टी के नीचे चौथाई बटन दबाओ।",
    "Now tap the first part to light one quarter of the bar.": "अब पट्टी का एक चौथाई रंगने के लिए पहला भाग दबाओ।",
    "Tap the part at the left end of the bar.": "पट्टी के बाएँ सिरे वाला भाग दबाओ।",
    "Halve 44, then halve that half again.": "44 का आधा करो, फिर उस आधे का भी आधा करो।",
    "Fold into four with Quarter, then share 44 among the four parts.": "चौथाई से चार भागों में मोड़ो, फिर 44 को चारों भागों में बाँटो।",
    "So 50% is half, 25% is a quarter and 10% is a tenth of the whole.": "तो 50% पूरे का आधा, 25% एक चौथाई और 10% दसवाँ भाग है।",
    "You learned: 50% is half, 25% a quarter and 10% a tenth.": "तुमने सीखा: 50% आधा, 25% चौथाई और 10% दसवाँ भाग है।",
    "What is 25% of 44?": "44 का 25% कितना है?",
    "25% of 44?": "44 का 25%?",
    "A quarter is one of four equal parts, not one of two.": "चौथाई चार बराबर भागों में से एक है, दो में से एक नहीं।",
    "What is 50% of 36?": "36 का 50% कितना है?",
    "50% of 36?": "36 का 50%?",
    "50% is a half, so fold the bar in two with Half.": "50% आधा है, तो आधा दबाकर पट्टी को दो में मोड़ो।",
    "The two halves are equal and together make 36.": "दोनों आधे बराबर हैं और मिलकर 36 बनाते हैं।",
    "Which number added to itself makes 36?": "कौन-सी संख्या खुद में जोड़ने पर 36 बनती है?",
    "What is 10% of 70?": "70 का 10% कितना है?",
    "10% of 70?": "70 का 10%?",
    "One tenth means ten equal parts, so use the Tenth key.": "दसवाँ भाग मतलब दस बराबर भाग, तो दसवाँ भाग बटन दबाओ।",
    "70 shared into ten equal parts gives one tenth.": "70 को दस बराबर भागों में बाँटने पर एक दसवाँ भाग मिलता है।",
    "How many tens make 70?": "कितने दस मिलकर 70 बनाते हैं?",
    "Yes, one quarter of 44 is 11.": "हाँ, 44 का एक चौथाई 11 है।",
    "Yes, half of 36 is 18.": "हाँ, 36 का आधा 18 है।",
    /* phase 2 */
    "Find 10% first: tap Cut to cut the bar into ten equal parts.": "पहले 10% खोजो: पट्टी को दस बराबर भागों में काटने के लिए काटो दबाओ।",
    "Tap the Cut key under the bar.": "पट्टी के नीचे काटो बटन दबाओ।",
    "Tap the fourth part to light four lots of 10%.": "चार बार 10% रंगने के लिए चौथा भाग दबाओ।",
    "Count four parts from the left and tap the last one.": "बाएँ से चार भाग गिनो और आखिरी वाला दबाओ।",
    "To find 10% of 40, share 40 into ten equal parts.": "40 का 10% खोजने के लिए 40 को दस बराबर भागों में बाँटो।",
    "Light six parts for 60%, then add six of those tenths together.": "60% के लिए छह भाग रंगो, फिर ऐसे छह दसवें भाग जोड़ो।",
    "Tens of per cent are lots of 10% of the number, and half a lot gives 5%.": "10, 20, 30 जैसे प्रतिशत 10% को कई बार लेकर मिलते हैं, और 10% का आधा 5% है।",
    "You learned: 30% is 3 lots of 10%, and half a lot gives 5%.": "तुमने सीखा: 30% तीन बार 10% है, और 10% का आधा 5% है।",
    "What is 60% of 40?": "40 का 60% कितना है?",
    "60% of 40?": "40 का 60%?",
    "Find what one tenth of 40 is before you count lots of it.": "कई बार गिनने से पहले 40 का एक दसवाँ भाग खोजो।",
    "What is 30% of 50?": "50 का 30% कितना है?",
    "30% of 50?": "50 का 30%?",
    "30% is three lots of 10%, so cut the bar and find 10% of 50.": "30% तीन बार 10% है, तो पट्टी काटो और 50 का 10% खोजो।",
    "Light three parts, then find what one part of 50 is.": "तीन भाग रंगो, फिर खोजो कि 50 का एक भाग कितना है।",
    "Share 50 into ten equal parts, then add three of them.": "50 को दस बराबर भागों में बाँटो, फिर उनमें से तीन जोड़ो।",
    "What is 15% of 60?": "60 का 15% कितना है?",
    "15% of 60?": "60 का 15%?",
    "15% is 10% and then half of another 10%.": "15% मतलब 10% और फिर एक और 10% का आधा।",
    "Cut, light two parts, then tap Half a tenth to keep 15% lit.": "काटो, दो भाग रंगो, फिर 15% रंगा रखने के लिए दसवें का आधा दबाओ।",
    "Find 10% of 60, then half of that, and add the two.": "60 का 10% खोजो, फिर उसका आधा, और दोनों जोड़ो।",
    "Yes, six lots of 4 make 24.": "हाँ, छह बार 4 मिलकर 24 होते हैं।",
    "Yes, three lots of 5 make 15.": "हाँ, तीन बार 5 मिलकर 15 होते हैं।",
    /* phase 3 */
    "This bar is 4 kg, so tap the Unit fact card to change it to grams.": "यह पट्टी 4 किलोग्राम है, तो इसे ग्राम में बदलने के लिए इकाई तथ्य कार्ड दबाओ।",
    "Tap the card that says 1 kg = 1,000 g.": "वह कार्ड दबाओ जिस पर 1 किलोग्राम = 1,000 ग्राम लिखा है।",
    "Tap Cut to cut the bar in grams into ten equal parts.": "ग्राम वाली पट्टी को दस बराबर भागों में काटने के लिए काटो दबाओ।",
    "Tap the fifth part to light 50% of the bar.": "पट्टी का 50% रंगने के लिए पाँचवाँ भाग दबाओ।",
    "Count five parts from the left and tap the fifth.": "बाएँ से पाँच भाग गिनो और पाँचवाँ दबाओ।",
    "Cut the bar in grams into ten, and find what one part is.": "ग्राम वाली पट्टी को दस में काटो, और खोजो कि एक भाग कितना है।",
    "Find 10% of the bar in grams, then take three lots of it.": "ग्राम में पट्टी का 10% खोजो, फिर उसे तीन बार लो।",
    "Change the measure to the unit the answer asks for, then find the per cent.": "माप को उस इकाई में बदलो जो उत्तर माँगता है, फिर प्रतिशत खोजो।",
    "You learned: change to the answer's unit, then find the per cent.": "तुमने सीखा: पहले उत्तर की इकाई में बदलो, फिर प्रतिशत खोजो।",
    "How many grams is 30% of 3 kg?": "3 किलोग्राम का 30% कितने ग्राम है?",
    "30% of 3 kg in grams?": "3 कि.ग्रा. का 30% ग्राम में?",
    "Change 3 kg to grams first, using the Unit fact card.": "इकाई तथ्य कार्ड से पहले 3 किलोग्राम को ग्राम में बदलो।",
    "How many centimetres is 20% of 3 m?": "3 मीटर का 20% कितने सेंटीमीटर है?",
    "20% of 3 m in cm?": "3 मी. का 20% से.मी. में?",
    "Change 3 m to centimetres before you find 20%.": "20% खोजने से पहले 3 मीटर को सेंटीमीटर में बदलो।",
    "Each m is 100 cm, so multiply 3 by 100 for the bar in cm.": "हर मीटर 100 सेंटीमीटर है, तो सेंटीमीटर के लिए 3 को 100 से गुणा करो।",
    "Find 10% of the bar in centimetres, then take two lots.": "सेंटीमीटर में पट्टी का 10% खोजो, फिर उसे दो बार लो।",
    "How many metres is 20% of 2 km?": "2 किलोमीटर का 20% कितने मीटर है?",
    "20% of 2 km in m?": "2 कि.मी. का 20% मी. में?",
    "Use the Unit fact card to change 2 km to metres.": "2 किलोमीटर को मीटर में बदलने के लिए इकाई तथ्य कार्ड दबाओ।",
    "With the bar in metres, find 10% of it first.": "पट्टी मीटर में हो जाए, तो पहले उसका 10% खोजो।",
    "Two lots of that 10% make the 20% the question asks for.": "उस 10% को दो बार लेने पर प्रश्न वाला 20% मिलता है।",
    "Yes, 30% of 3,000 g is 900 g.": "हाँ, 3,000 ग्राम का 30% होता है 900 ग्राम।",
    "Yes, 20% of 300 cm is 60 cm.": "हाँ, 300 सेंटीमीटर का 20% होता है 60 सेंटीमीटर।",
    /* phase 4 */
    "Tap Cut to cut the milk bar into ten equal parts.": "दूध वाली पट्टी को दस बराबर भागों में काटने के लिए काटो दबाओ।",
    "30% of the milk is poured out, so tap the third part to light it.": "30% दूध उँडेल दिया गया, तो उसे रंगने के लिए तीसरा भाग दबाओ।",
    "Count three parts from the left and tap the third.": "बाएँ से तीन भाग गिनो और तीसरा दबाओ।",
    "Tap Use to lift the poured part off the bar.": "उँडेला हुआ भाग पट्टी से हटाने के लिए उपयोग दबाओ।",
    "The Use key lifts the lit part off.": "उपयोग बटन रंगा भाग हटा देता है।",
    "Cut the bar, light the 40% poured out and tap Use.": "पट्टी काटो, उँडेला गया 40% रंगो और उपयोग दबाओ।",
    "Find 10% of 1,500 mL, then take as many lots as there are green parts.": "1,500 मिलीलीटर का 10% खोजो, फिर जितने हरे भाग हैं उतनी बार लो।",
    "What is left is the whole take away the part used.": "पूरे में से उपयोग किया भाग घटाओ, तो बचा हुआ भाग मिलता है।",
    "You learned: what is left is the whole take away the part used.": "तुमने सीखा: पूरे में से उपयोग किया भाग घटाओ, तो बचा भाग मिलता है।",
    "A jug holds 1,500 mL of juice and 40% is poured out, so how much is left?": "जग में 1,500 मिलीलीटर रस है और 40% उँडेल दिया, तो कितना बचा?",
    "Juice left?": "कितना रस बचा?",
    "The question asks for the juice left, not the juice poured out.": "प्रश्न बचा हुआ रस पूछता है, उँडेला हुआ रस नहीं।",
    "If 45% of a garden has been dug, what per cent has not been dug?": "अगर बगीचे का 45% खोद दिया गया, तो कितना प्रतिशत नहीं खुदा?",
    "Per cent not dug?": "कितना प्रतिशत नहीं खुदा?",
    "The whole garden is 100%, so take the dug part away.": "पूरा बगीचा 100% है, तो खुदा हुआ भाग घटाओ।",
    "Cut, light five parts, tap Half a tenth for 45%, then tap Use.": "काटो, पाँच भाग रंगो, 45% के लिए दसवें का आधा दबाओ, फिर उपयोग दबाओ।",
    "Each green part left is 10% and a green half is 5%, so count them.": "हर बचा हरा भाग 10% है और हरा आधा भाग 5%, तो उन्हें गिनो।",
    "A sack holds 5 kg of rice and 20% is used, so how many grams of rice are left?": "बोरी में 5 किलोग्राम चावल हैं और 20% उपयोग हुआ, तो कितने ग्राम चावल बचे?",
    "Rice left in grams?": "बचे चावल ग्राम में?",
    "Change 5 kg to grams first, then take away the 20% used.": "पहले 5 किलोग्राम को ग्राम में बदलो, फिर उपयोग हुआ 20% घटाओ।",
    "Tap the Unit fact card, then cut, light two parts and tap Use.": "इकाई तथ्य कार्ड दबाओ, फिर काटो, दो भाग रंगो और उपयोग दबाओ।",
    "Find 20% of the bar in grams, then take it away from the whole.": "ग्राम में पट्टी का 20% खोजो, फिर उसे पूरे में से घटाओ।",
    "Yes, 900 mL of juice is left in the jug.": "हाँ, जग में 900 मिलीलीटर रस बचा है।",
    "Yes, 55% of the garden has not been dug.": "हाँ, बगीचे का 55% नहीं खुदा है।",
    /* drawn words, keys, slot labels and units */
    "Whole": "पूरा", "Juice": "रस", "Rice": "चावल", "Garden": "बगीचा", "Milk": "दूध",
    "Lit": "रंगा", "Left": "बचा", "Used": "उपयोग हुआ","Part": "भाग", "of": "का", "Together": "कुल", "Unit fact": "इकाई तथ्य",
    "Half": "आधा", "Quarter": "चौथाई", "Tenth": "दसवाँ भाग", "Cut": "काटो", "Use": "उपयोग","Half a tenth": "दसवें का आधा", "Double": "दुगुना",
    "the part": "भाग", "left": "बचा", "not dug": "नहीं खुदा",
    "g": "ग्रा.", "kg": "कि.ग्रा.", "m": "मी.", "cm": "से.मी.", "km": "कि.मी.", "mL": "मि.ली.", "%": "%",
  },
  gu: {
    "Part Finder": "ભાગ શોધો",
    "Benchmark per cents": "મુખ્ય ટકા",
    "Per cent of a number": "કોઈ સંખ્યાના ટકા",
    "Per cent of a measure": "કોઈ માપના ટકા",
    "What is left": "શું બાકી રહ્યું",
    "A whole bar, ready to be folded or cut.": "એક આખી પટ્ટી, વાળવા કે કાપવા તૈયાર.",
    "Free play: fold the bar, light parts, double it, use a part or change the unit.": "મુક્ત રમત: પટ્ટી વાળો, ભાગ રંગો, બમણું કરો, ભાગ વાપરો કે એકમ બદલો.",
    "Can folding a bar tell you what 25% of a number is?": "શું પટ્ટી વાળીને તમે કોઈ સંખ્યાના 25% જાણી શકો?",
    /* phase 1 */
    "25% is a quarter, so tap Quarter to fold the bar into four equal parts.": "25% એટલે ચોથો ભાગ, તો ચોથો ભાગ દબાવી પટ્ટીને ચાર સરખા ભાગમાં વાળો.",
    "Tap the Quarter key under the bar.": "પટ્ટી નીચે ચોથો ભાગ બટન દબાવો.",
    "Now tap the first part to light one quarter of the bar.": "હવે પટ્ટીનો ચોથો ભાગ રંગવા પહેલો ભાગ દબાવો.",
    "Tap the part at the left end of the bar.": "પટ્ટીના ડાબા છેડાનો ભાગ દબાવો.",
    "Halve 44, then halve that half again.": "44 નું અડધું કરો, પછી એ અડધાનું ફરી અડધું કરો.",
    "Fold into four with Quarter, then share 44 among the four parts.": "ચોથો ભાગ વડે ચારમાં વાળો, પછી 44 ને ચાર ભાગમાં વહેંચો.",
    "So 50% is half, 25% is a quarter and 10% is a tenth of the whole.": "તો 50% આખાનું અડધું, 25% ચોથો ભાગ અને 10% દસમો ભાગ છે.",
    "You learned: 50% is half, 25% a quarter and 10% a tenth.": "તમે શીખ્યા: 50% અડધું, 25% ચોથો ભાગ અને 10% દસમો ભાગ છે.",
    "What is 25% of 44?": "44 ના 25% કેટલા છે?",
    "25% of 44?": "44 ના 25%?",
    "A quarter is one of four equal parts, not one of two.": "ચોથો ભાગ ચાર સરખા ભાગમાંથી એક છે, બેમાંથી એક નહીં.",
    "What is 50% of 36?": "36 ના 50% કેટલા છે?",
    "50% of 36?": "36 ના 50%?",
    "50% is a half, so fold the bar in two with Half.": "50% એટલે અડધું, તો અડધું દબાવી પટ્ટીને બેમાં વાળો.",
    "The two halves are equal and together make 36.": "બંને અડધા સરખા છે અને મળીને 36 થાય છે.",
    "Which number added to itself makes 36?": "કઈ સંખ્યા પોતાનામાં ઉમેરતાં 36 થાય?",
    "What is 10% of 70?": "70 ના 10% કેટલા છે?",
    "10% of 70?": "70 ના 10%?",
    "One tenth means ten equal parts, so use the Tenth key.": "દસમો ભાગ એટલે દસ સરખા ભાગ, તો દસમો ભાગ બટન દબાવો.",
    "70 shared into ten equal parts gives one tenth.": "70 ને દસ સરખા ભાગમાં વહેંચતાં એક દસમો ભાગ મળે.",
    "How many tens make 70?": "કેટલા દસ મળીને 70 થાય?",
    "Yes, one quarter of 44 is 11.": "હા, 44 નો ચોથો ભાગ 11 છે.",
    "Yes, half of 36 is 18.": "હા, 36 નું અડધું 18 છે.",
    /* phase 2 */
    "Find 10% first: tap Cut to cut the bar into ten equal parts.": "પહેલાં 10% શોધો: પટ્ટીને દસ સરખા ભાગમાં કાપવા કાપો દબાવો.",
    "Tap the Cut key under the bar.": "પટ્ટી નીચે કાપો બટન દબાવો.",
    "Tap the fourth part to light four lots of 10%.": "ચાર વખત 10% રંગવા ચોથો ભાગ દબાવો.",
    "Count four parts from the left and tap the last one.": "ડાબેથી ચાર ભાગ ગણો અને છેલ્લો દબાવો.",
    "To find 10% of 40, share 40 into ten equal parts.": "40 ના 10% શોધવા 40 ને દસ સરખા ભાગમાં વહેંચો.",
    "Light six parts for 60%, then add six of those tenths together.": "60% માટે છ ભાગ રંગો, પછી આવા છ દસમા ભાગ ઉમેરો.",
    "Tens of per cent are lots of 10% of the number, and half a lot gives 5%.": "10, 20, 30 જેવા ટકા 10% ને ઘણી વખત લઈને મળે, અને 10% નું અડધું 5% છે.",
    "You learned: 30% is 3 lots of 10%, and half a lot gives 5%.": "તમે શીખ્યા: 30% એટલે ત્રણ વખત 10%, અને 10% નું અડધું 5%.",
    "What is 60% of 40?": "40 ના 60% કેટલા છે?",
    "60% of 40?": "40 ના 60%?",
    "Find what one tenth of 40 is before you count lots of it.": "ઘણી વખત ગણતાં પહેલાં 40 નો એક દસમો ભાગ શોધો.",
    "What is 30% of 50?": "50 ના 30% કેટલા છે?",
    "30% of 50?": "50 ના 30%?",
    "30% is three lots of 10%, so cut the bar and find 10% of 50.": "30% એટલે ત્રણ વખત 10%, તો પટ્ટી કાપો અને 50 ના 10% શોધો.",
    "Light three parts, then find what one part of 50 is.": "ત્રણ ભાગ રંગો, પછી શોધો કે 50 નો એક ભાગ કેટલો છે.",
    "Share 50 into ten equal parts, then add three of them.": "50 ને દસ સરખા ભાગમાં વહેંચો, પછી તેમાંથી ત્રણ ઉમેરો.",
    "What is 15% of 60?": "60 ના 15% કેટલા છે?",
    "15% of 60?": "60 ના 15%?",
    "15% is 10% and then half of another 10%.": "15% એટલે 10% અને પછી બીજા 10% નું અડધું.",
    "Cut, light two parts, then tap Half a tenth to keep 15% lit.": "કાપો, બે ભાગ રંગો, પછી 15% રંગેલું રાખવા દસમાનો અડધો દબાવો.",
    "Find 10% of 60, then half of that, and add the two.": "60 ના 10% શોધો, પછી તેનું અડધું, અને બંને ઉમેરો.",
    "Yes, six lots of 4 make 24.": "હા, છ વખત 4 મળીને 24 થાય.",
    "Yes, three lots of 5 make 15.": "હા, ત્રણ વખત 5 મળીને 15 થાય.",
    /* phase 3 */
    "This bar is 4 kg, so tap the Unit fact card to change it to grams.": "આ પટ્ટી 4 કિલોગ્રામ છે, તો તેને ગ્રામમાં બદલવા એકમ તથ્ય કાર્ડ દબાવો.",
    "Tap the card that says 1 kg = 1,000 g.": "જે કાર્ડ પર 1 કિલોગ્રામ = 1,000 ગ્રામ લખ્યું છે તે દબાવો.",
    "Tap Cut to cut the bar in grams into ten equal parts.": "ગ્રામવાળી પટ્ટીને દસ સરખા ભાગમાં કાપવા કાપો દબાવો.",
    "Tap the fifth part to light 50% of the bar.": "પટ્ટીના 50% રંગવા પાંચમો ભાગ દબાવો.",
    "Count five parts from the left and tap the fifth.": "ડાબેથી પાંચ ભાગ ગણો અને પાંચમો દબાવો.",
    "Cut the bar in grams into ten, and find what one part is.": "ગ્રામવાળી પટ્ટીને દસમાં કાપો, અને શોધો કે એક ભાગ કેટલો છે.",
    "Find 10% of the bar in grams, then take three lots of it.": "ગ્રામમાં પટ્ટીના 10% શોધો, પછી તેને ત્રણ વખત લો.",
    "Change the measure to the unit the answer asks for, then find the per cent.": "માપને જવાબ માગે તે એકમમાં બદલો, પછી ટકા શોધો.",
    "You learned: change to the answer's unit, then find the per cent.": "તમે શીખ્યા: પહેલાં જવાબના એકમમાં બદલો, પછી ટકા શોધો.",
    "How many grams is 30% of 3 kg?": "3 કિલોગ્રામના 30% કેટલા ગ્રામ છે?",
    "30% of 3 kg in grams?": "3 કિગ્રાના 30% ગ્રામમાં?",
    "Change 3 kg to grams first, using the Unit fact card.": "એકમ તથ્ય કાર્ડથી પહેલાં 3 કિલોગ્રામને ગ્રામમાં બદલો.",
    "How many centimetres is 20% of 3 m?": "3 મીટરના 20% કેટલા સેન્ટિમીટર છે?",
    "20% of 3 m in cm?": "3 મીના 20% સેમીમાં?",
    "Change 3 m to centimetres before you find 20%.": "20% શોધતાં પહેલાં 3 મીટરને સેન્ટિમીટરમાં બદલો.",
    "Each m is 100 cm, so multiply 3 by 100 for the bar in cm.": "દરેક મીટર 100 સેન્ટિમીટર છે, તો સેન્ટિમીટર માટે 3 ને 100 વડે ગુણો.",
    "Find 10% of the bar in centimetres, then take two lots.": "સેન્ટિમીટરમાં પટ્ટીના 10% શોધો, પછી તેને બે વખત લો.",
    "How many metres is 20% of 2 km?": "2 કિલોમીટરના 20% કેટલા મીટર છે?",
    "20% of 2 km in m?": "2 કિમીના 20% મીમાં?",
    "Use the Unit fact card to change 2 km to metres.": "2 કિલોમીટરને મીટરમાં બદલવા એકમ તથ્ય કાર્ડ દબાવો.",
    "With the bar in metres, find 10% of it first.": "પટ્ટી મીટરમાં થાય, પછી પહેલાં તેના 10% શોધો.",
    "Two lots of that 10% make the 20% the question asks for.": "એ 10% ને બે વખત લેતાં પ્રશ્નના 20% મળે.",
    "Yes, 30% of 3,000 g is 900 g.": "હા, 3,000 ગ્રામના 30% એટલે 900 ગ્રામ.",
    "Yes, 20% of 300 cm is 60 cm.": "હા, 300 સેન્ટિમીટરના 20% એટલે 60 સેન્ટિમીટર.",
    /* phase 4 */
    "Tap Cut to cut the milk bar into ten equal parts.": "દૂધવાળી પટ્ટીને દસ સરખા ભાગમાં કાપવા કાપો દબાવો.",
    "30% of the milk is poured out, so tap the third part to light it.": "30% દૂધ રેડી દીધું, તો તેને રંગવા ત્રીજો ભાગ દબાવો.",
    "Count three parts from the left and tap the third.": "ડાબેથી ત્રણ ભાગ ગણો અને ત્રીજો દબાવો.",
    "Tap Use to lift the poured part off the bar.": "રેડેલો ભાગ પટ્ટી પરથી ઉપાડવા વાપરો દબાવો.",
    "The Use key lifts the lit part off.": "વાપરો બટન રંગેલો ભાગ ઉપાડી લે છે.",
    "Cut the bar, light the 40% poured out and tap Use.": "પટ્ટી કાપો, રેડેલા 40% રંગો અને વાપરો દબાવો.",
    "Find 10% of 1,500 mL, then take as many lots as there are green parts.": "1,500 મિલિલિટરના 10% શોધો, પછી જેટલા લીલા ભાગ હોય તેટલી વખત લો.",
    "What is left is the whole take away the part used.": "આખામાંથી વપરાયેલો ભાગ બાદ કરો, તો બાકી ભાગ મળે.",
    "You learned: what is left is the whole take away the part used.": "તમે શીખ્યા: આખામાંથી વપરાયેલો ભાગ બાદ કરતાં બાકી ભાગ મળે.",
    "A jug holds 1,500 mL of juice and 40% is poured out, so how much is left?": "જગમાં 1,500 મિલિલિટર રસ છે, 40% રેડ્યો, તો કેટલો બાકી?",
    "Juice left?": "કેટલો રસ બાકી?",
    "The question asks for the juice left, not the juice poured out.": "પ્રશ્ન બાકી રસ પૂછે છે, રેડેલો રસ નહીં.",
    "If 45% of a garden has been dug, what per cent has not been dug?": "જો બગીચાના 45% ખોદાઈ ગયા, તો કેટલા ટકા ખોદાયા નથી?",
    "Per cent not dug?": "કેટલા ટકા ખોદાયા નથી?",
    "The whole garden is 100%, so take the dug part away.": "આખો બગીચો 100% છે, તો ખોદાયેલો ભાગ બાદ કરો.",
    "Cut, light five parts, tap Half a tenth for 45%, then tap Use.": "કાપો, પાંચ ભાગ રંગો, 45% માટે દસમાનો અડધો દબાવો, પછી વાપરો દબાવો.",
    "Each green part left is 10% and a green half is 5%, so count them.": "દરેક બાકી લીલો ભાગ 10% છે અને લીલો અડધો ભાગ 5%, તો તે ગણો.",
    "A sack holds 5 kg of rice and 20% is used, so how many grams of rice are left?": "થેલીમાં 5 કિલોગ્રામ ચોખા છે અને 20% વપરાયા, તો કેટલા ગ્રામ ચોખા બાકી?",
    "Rice left in grams?": "બાકી ચોખા ગ્રામમાં?",
    "Change 5 kg to grams first, then take away the 20% used.": "પહેલાં 5 કિલોગ્રામને ગ્રામમાં બદલો, પછી વપરાયેલા 20% બાદ કરો.",
    "Tap the Unit fact card, then cut, light two parts and tap Use.": "એકમ તથ્ય કાર્ડ દબાવો, પછી કાપો, બે ભાગ રંગો અને વાપરો દબાવો.",
    "Find 20% of the bar in grams, then take it away from the whole.": "ગ્રામમાં પટ્ટીના 20% શોધો, પછી તેને આખામાંથી બાદ કરો.",
    "Yes, 900 mL of juice is left in the jug.": "હા, જગમાં 900 મિલિલિટર રસ બાકી છે.",
    "Yes, 55% of the garden has not been dug.": "હા, બગીચાના 55% ખોદાયા નથી.",
    /* drawn words, keys, slot labels and units */
    "Whole": "આખું", "Juice": "રસ", "Rice": "ચોખા", "Garden": "બગીચો", "Milk": "દૂધ",
    "Lit": "રંગેલું", "Left": "બાકી", "Used": "વપરાયું", "Part": "ભાગ", "of": "ના", "Together": "કુલ", "Unit fact": "એકમ તથ્ય",
    "Half": "અડધું", "Quarter": "ચોથો ભાગ", "Tenth": "દસમો ભાગ", "Cut": "કાપો", "Use": "વાપરો", "Half a tenth": "દસમાનો અડધો", "Double": "બમણું",
    "the part": "ભાગ", "left": "બાકી", "not dug": "ન ખોદાયેલ",
    "g": "ગ્રા", "kg": "કિગ્રા", "m": "મી", "cm": "સેમી", "km": "કિમી", "mL": "મિલિ", "%": "%",
  },
};

/* One entry per phase = one mount. Item fields of this tool:
   kind  fold | tenths | measure | left      pc  the per cent asked      qty  the whole as the question gives it
   u     the whole's unit      to  the answer's unit      f  units of `to` in one `u` (the Unit fact card)
   fold  how phase 1's right fold cuts the bar      thing  the whole's name on the bar (phase 4)
   pct   the answer is a per cent (the whole is 100%)      near  the misconception's answer (nearMiss) */
const PHASES = [
  {
    n: 1,
    concept: "Benchmark per cents",
    conceptId: "M3.S4.T6.C25", objectiveIds: ["O9"],
    says: ["Twenty-five per cent is a quarter. Fold the bar into four."],
    steps: [
      { say: "25% is a quarter, so tap Quarter to fold the bar into four equal parts.", on: "quarter", hint: "Tap the Quarter key under the bar." },
      { say: "Now tap the first part to light one quarter of the bar.", on: "piece-1", hint: "Tap the part at the left end of the bar." },
    ],
    /* the WARM-UP the steps work (PATTERNS §9b): 25% of 20, none of the phase's answers; question 1 opens fresh */
    warm: { kind: "fold", pc: 25, qty: 20, fold: 4 },
    /* rungs 2 and 3 of the first question (the other two carry their own) */
    ladder: ["Halve 44, then halve that half again.", "Fold into four with Quarter, then share 44 among the four parts."],
    closing: "So 50% is half, 25% is a quarter and 10% is a tenth of the whole.",
    learned: "You learned: 50% is half, 25% a quarter and 10% a tenth.",
    traceback: "the right fold is drawn, the asked part lights amber with its share written on it, and the line reads the per cent of the number",
    items: [
      /* learn PO1: answer in the plan = 11 */
      { qid: "M3.S4.T6.C25:PO1", kind: "fold", pc: 25, qty: 44, fold: 4, near: 22, answer: 11,
        say: "What is 25% of 44?", ask: "25% of 44?", miss: "A quarter is one of four equal parts, not one of two." },
      /* practice 1: answer in the plan = 18, because 50% is half */
      { qid: "M3.S4.T6.C25:1", kind: "fold", pc: 50, qty: 36, fold: 2, near: 9, answer: 18,
        say: "What is 50% of 36?", ask: "50% of 36?", miss: "50% is a half, so fold the bar in two with Half.",
        ladder: ["The two halves are equal and together make 36.", "Which number added to itself makes 36?"] },
      /* practice 2: answer in the plan = 7, because 10% is a tenth */
      { qid: "M3.S4.T6.C25:2", kind: "fold", pc: 10, qty: 70, fold: 10, near: 10, answer: 7,
        say: "What is 10% of 70?", ask: "10% of 70?", miss: "One tenth means ten equal parts, so use the Tenth key.",
        ladder: ["70 shared into ten equal parts gives one tenth.", "How many tens make 70?"] },
    ],
  },
  {
    n: 2,
    concept: "Per cent of a number",
    conceptId: "M3.S4.T6.C26", objectiveIds: ["O9"],
    says: ["Find ten per cent first. How many lots of it do you need?"],
    steps: [
      { say: "Find 10% first: tap Cut to cut the bar into ten equal parts.", on: "cut", hint: "Tap the Cut key under the bar." },
      { say: "Tap the fourth part to light four lots of 10%.", on: "piece-4", hint: "Count four parts from the left and tap the last one." },
    ],
    /* the warm-up: 40% of 80 (the writeup's own phase-2 screen), none of the phase's answers */
    warm: { kind: "tenths", pc: 40, qty: 80 },
    ladder: ["To find 10% of 40, share 40 into ten equal parts.", "Light six parts for 60%, then add six of those tenths together."],
    closing: "Tens of per cent are lots of 10% of the number, and half a lot gives 5%.",
    learned: "You learned: 30% is 3 lots of 10%, and half a lot gives 5%.",
    traceback: "the bar is cut into ten, the parts needed light amber with each share written on them, and the fraction line ends on the answer",
    items: [
      /* learn PO2: answer in the plan = 24 */
      { qid: "M3.S4.T6.C26:PO2", kind: "tenths", pc: 60, qty: 40, near: 4, answer: 24,
        say: "What is 60% of 40?", ask: "60% of 40?", miss: "Find what one tenth of 40 is before you count lots of it." },
      /* practice 3: answer in the plan = 15, because 10% of 50 is 5 and 3 x 5 = 15 */
      { qid: "M3.S4.T6.C26:3", kind: "tenths", pc: 30, qty: 50, near: 5, answer: 15,
        say: "What is 30% of 50?", ask: "30% of 50?", miss: "30% is three lots of 10%, so cut the bar and find 10% of 50.",
        ladder: ["Light three parts, then find what one part of 50 is.", "Share 50 into ten equal parts, then add three of them."] },
      /* practice 5: answer in the plan = 9, because 15/100 x 60 = 9 */
      { qid: "M3.S4.T6.C26:5", kind: "tenths", pc: 15, qty: 60, near: 6, answer: 9,
        say: "What is 15% of 60?", ask: "15% of 60?", miss: "15% is 10% and then half of another 10%.",
        ladder: ["Cut, light two parts, then tap Half a tenth to keep 15% lit.", "Find 10% of 60, then half of that, and add the two."] },
    ],
  },
  {
    n: 3,
    concept: "Per cent of a measure",
    conceptId: "M3.S4.T6.C27", objectiveIds: ["O10"],
    says: ["Which unit does the answer want? Change the measure first."],
    steps: [
      { say: "This bar is 4 kg, so tap the Unit fact card to change it to grams.", on: "unit", hint: "Tap the card that says 1 kg = 1,000 g." },
      { say: "Tap Cut to cut the bar in grams into ten equal parts.", on: "cut", hint: "Tap the Cut key under the bar." },
      { say: "Tap the fifth part to light 50% of the bar.", on: "piece-5", hint: "Count five parts from the left and tap the fifth." },
    ],
    /* the warm-up: 50% of 4 kg in grams (2,000 g), none of the phase's answers */
    warm: { kind: "measure", pc: 50, qty: 4, u: "kg", to: "g", f: 1000 },
    ladder: ["Cut the bar in grams into ten, and find what one part is.", "Find 10% of the bar in grams, then take three lots of it."],
    closing: "Change the measure to the unit the answer asks for, then find the per cent.",
    learned: "You learned: change to the answer's unit, then find the per cent.",
    traceback: "the bar is relabelled in the answer's unit in violet, cut into ten, the parts needed light amber with their shares, and the line ends on the answer",
    items: [
      /* learn PO3: answer in the plan = 900 g */
      { qid: "M3.S4.T6.C27:PO3", kind: "measure", pc: 30, qty: 3, u: "kg", to: "g", f: 1000, near: 9,
        parts: [{ label: "the part", unit: "g" }], answer: [900],
        say: "How many grams is 30% of 3 kg?", ask: "30% of 3 kg in grams?", miss: "Change 3 kg to grams first, using the Unit fact card." },
      /* practice 6: answer in the plan = 60 cm. 1 m = 100 cm, so 3 m = 300 cm, and 20% of 300 cm is 60 cm */
      { qid: "M3.S4.T6.C27:6", kind: "measure", pc: 20, qty: 3, u: "m", to: "cm", f: 100, near: 6,
        parts: [{ label: "the part", unit: "cm" }], answer: [60],
        say: "How many centimetres is 20% of 3 m?", ask: "20% of 3 m in cm?", miss: "Change 3 m to centimetres before you find 20%.",
        ladder: ["Each m is 100 cm, so multiply 3 by 100 for the bar in cm.","Find 10% of the bar in centimetres, then take two lots."] },
      /* AUTHORED (no plan question fits: the plan has two phase-3 questions and its other measure questions ask what is
         left, phase 4's idea). It is the writeup's own phase-3 screen: 20% of 2 km in metres = 400 m */
      { qid: null, kind: "measure", pc: 20, qty: 2, u: "km", to: "m", f: 1000, near: 4,
        parts: [{ label: "the part", unit: "m" }], answer: [400],
        say: "How many metres is 20% of 2 km?", ask: "20% of 2 km in m?", miss: "Use the Unit fact card to change 2 km to metres.",
        ladder: ["With the bar in metres, find 10% of it first.", "Two lots of that 10% make the 20% the question asks for."] },
    ],
  },
  {
    n: 4,
    concept: "What is left",
    conceptId: "M3.S4.T6.C28", objectiveIds: ["O10"],
    says: ["Which part does the question ask for, the part used or the part left?"],
    steps: [
      { say: "Tap Cut to cut the milk bar into ten equal parts.", on: "cut", hint: "Tap the Cut key under the bar." },
      { say: "30% of the milk is poured out, so tap the third part to light it.", on: "piece-3", hint: "Count three parts from the left and tap the third." },
      { say: "Tap Use to lift the poured part off the bar.", on: "use", hint: "The Use key lifts the lit part off." },
    ],
    /* the warm-up: 2,000 mL of milk, 30% poured out, none of the phase's answers */
    warm: { kind: "left", pc: 30, qty: 2000, u: "mL", to: "mL", f: 1, thing: "Milk" },
    ladder: ["Cut the bar, light the 40% poured out and tap Use.", "Find 10% of 1,500 mL, then take as many lots as there are green parts."],
    closing: "What is left is the whole take away the part used.",
    learned: "You learned: what is left is the whole take away the part used.",
    traceback: "the used part lifts off in rose and the part left stays green, both with their amounts, and the line takes the used part away from the whole",
    items: [
      /* learn PO4: answer in the plan = 900 mL (plan: A jug holds 1500 mL of juice, and 40% of it is poured out. How much juice is left in the jug?) */
      { qid: "M3.S4.T6.C28:PO4", kind: "left", pc: 40, qty: 1500, u: "mL", to: "mL", f: 1, thing: "Juice", near: 600,
        parts: [{ label: "left", unit: "mL" }], answer: [900],
        say: "A jug holds 1,500 mL of juice and 40% is poured out, so how much is left?", ask: "Juice left?",
        miss: "The question asks for the juice left, not the juice poured out." },
      /* practice 4: answer in the plan = 55%, because the whole garden is 100% */
      { qid: "M3.S4.T6.C28:4", kind: "left", pc: 45, qty: 100, u: "%", to: "%", f: 1, thing: "Garden", pct: true, near: 45,
        parts: [{ label: "not dug", unit: "%" }], answer: [55],
        say: "If 45% of a garden has been dug, what per cent has not been dug?", ask: "Per cent not dug?",
        miss: "The whole garden is 100%, so take the dug part away.",
        ladder: ["Cut, light five parts, tap Half a tenth for 45%, then tap Use.", "Each green part left is 10% and a green half is 5%, so count them."] },
      /* practice 7: answer in the plan = 4000 g, or 4 kg. 1 kg = 1000 g, so 5 kg = 5000 g. 20% of 5000 g is 1000 g, and 5000 - 1000 = 4000
         (plan: A sack holds 5 kg of rice, and 20% of it is used. How many grams of rice are left?) */
      { qid: "M3.S4.T6.C28:7", kind: "left", pc: 20, qty: 5, u: "kg", to: "g", f: 1000, thing: "Rice", near: 1000,
        parts: [{ label: "left", unit: "g" }], answer: [4000],
        say: "A sack holds 5 kg of rice and 20% is used, so how many grams of rice are left?", ask: "Rice left in grams?",
        miss: "Change 5 kg to grams first, then take away the 20% used.",
        ladder: ["Tap the Unit fact card, then cut, light two parts and tap Use.", "Find 20% of the bar in grams, then take it away from the whole."] },
      /* UNUSED: practice 8 (M3.S4.T6.C28:8, 2 m ribbon, 45% cut off, 110 cm left): exactly three a phase, and practice 7
         already asks a measure-in-another-unit "what is left" question */
    ],
  },
];

/* The numbers the working area needs (they go into the sidecar too). */
const MODEL = { barLength: 820, barHeight: 124, tenths: 10, layoutWidth: 900 };

/* the chapter's content colours (the brief's Stage section): given deep blue, answer and left green, unit fact violet,
   used rose, the part worked on now amber; text in each takes the deeper ink */
const PF = { blue: "#0072B2", green: "#009E73", violet: "#7B3FA0", rose: "#CC79A7", amber: "#E69F00", line: "#2B2B2B", sheet: "#FFF8EA" };
const PF_INK = { blue: "#00507F", green: "#00664A", violet: "#5E2A85", rose: "#8E3A6A", amber: "#6E4800" };
/* the layout, in working-area units, laid out ONCE for the open keypad (x 0 to 900) and kept there when it shuts
   (LAYOUT §3): row A (the whole, the Unit fact card, 100%) 0-88, the bar 96-276, row B (Lit / Used / Left, or the
   correction's line) at 318, the lifted used part 334-420 or the fraction line 336-420, the keys 436-512 */
const PF_G = { w: 900, x: 40, L: 820, by: 96, bh: 180, rowB: 318, uy: 342, uh: 80, y2: 288, h2: 92,
  cardX: 385, cardW: 300, cardY: 4, cardH: 84, ky: 436, kh: 76 };
/* lit parts: a deeper amber and a dark inset edge, a clear brightness step over the golden ribbon */
const PF_LIT = "#D97F00";
const PF_KEY: any = { half: "Half", quarter: "Quarter", tenth: "Tenth", cut: "Cut", use: "Use", halve: "Half a tenth", double: "Double" };
const PF_SPLIT: any = { half: 2, quarter: 4, tenth: 10, cut: 10 };
/* free play: a 5 kg sack of rice, every control live */
const PF_FREE = { kind: "free", pc: 0, qty: 5, u: "kg", to: "g", f: 1000, thing: "Rice" };

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* judge: is this value right for this item? (numbers compare as numbers; a one-box `parts` slot by its box) */
const judge = (item: any, v: any) => {
  if (item.parts) return judgeSlotParts(item, v);
  if (typeof item.answer === "number") return leadNumber(v) === item.answer;
  return String(v).trim().toLowerCase() === String(item.answer).trim().toLowerCase();
};
/* oracle: every answer re-derived by hundredths (one hundredth of the whole, times the per cent), then taken away
   from the whole for a "left" question; it shares no code with judge or Work */
const oracle = () => PHASES.every((p: any) => p.items.every((it: any) => {
  const whole = it.qty * (it.f || 1);
  const part = (whole / 100) * it.pc;
  const want = it.kind === "left" ? whole - part : part;
  const got = Array.isArray(it.answer) ? it.answer[0] : it.answer;
  return Math.abs(want - got) < 1e-9;
}));
/* the misconception's answer: half not a quarter, stopping at 10%, the old unit's number, the part used */
const nearMiss = (item: any) => String(item.near);
/* the forms of an answer that no question, hint or ladder line may print */
const answerForms = (item: any) => (item.parts ? item.answer.filter((x: number) => x >= 10).flatMap((x: number) => [String(x), indian(x), words(x)])
  : typeof item.answer === "number" ? [String(item.answer), indian(item.answer), words(item.answer)]
  : [String(item.answer)]);
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => item.answer;

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => (T.state().stage === "demo" ? HOOK.demo && HOOK.demo() : T.submit(item.answer));
/* every answer is typed on the keypad */
const answer = (item: any, v: any) => (item.pad === "enter" && HOOK.set ? HOOK.set(v) : undefined);
const check = () => (HOOK.check ? HOOK.check() : undefined);

/* the win lines: one literal a question (the third of a phase shows its closing line instead) */
function pfWin(api: any, q: string, closing: string) {
  if (q === "M3.S4.T6.C25:PO1") api.say("Yes, one quarter of 44 is 11.");
  else if (q === "M3.S4.T6.C25:1") api.say("Yes, half of 36 is 18.");
  else if (q === "M3.S4.T6.C26:PO2") api.say("Yes, six lots of 4 make 24.");
  else if (q === "M3.S4.T6.C26:3") api.say("Yes, three lots of 5 make 15.");
  else if (q === "M3.S4.T6.C27:PO3") api.say("Yes, 30% of 3,000 g is 900 g.");
  else if (q === "M3.S4.T6.C27:6") api.say("Yes, 20% of 300 cm is 60 cm.");
  else if (q === "M3.S4.T6.C28:PO4") api.say("Yes, 900 mL of juice is left in the jug.");
  else if (q === "M3.S4.T6.C28:4") api.say("Yes, 55% of the garden has not been dug.");
  /* a phase's last question: the runtime puts the phase's closing line in place of any win line, at once */
  else if (closing) api.say(closing);
}

/* ── the working area ──────────────────────────────────────────────────────────────────────── */
function Work({ phase, n, item, index, stage, wrong, typed, api, MODEL, step, stepOn, box, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();
  const free = stage === "free";
  const ph: any = PHASES[n - 1] || {};
  /* the guide steps work the phase's WARM-UP whole, never question 1's own (PATTERNS §9b); the phase opens on "teach"
     for one frame before "demo", so that frame draws the warm-up too (PATTERNS §18, ch 9) */
  const warmNow = !free && (stage === "demo" || stage === "teach") && !!ph.warm;
  const it: any = free ? PF_FREE : warmNow ? ph.warm : item || {};
  const kd = free ? "free" : it.kind;
  const f = it.f || 1;
  const live = stage === "demo" || stage === "ask" || free;
  const fresh = () => ({ n: 1, litH: 0, conv: false, used: false, pend: 0, cuts: 0, dbl: false });
  /* the guide steps' results stand on the warm-up even when a step was moved on without its act (the agent, a driver):
     at step k the picture holds steps 1 to k */
  const stepsDone = (k: number) => {
    const b: any = {};
    (ph.steps || []).slice(0, k).forEach((x: any) => {
      const m = /^piece-(\d+)$/.exec(String(x.on));
      if (PF_SPLIT[x.on]) { b.n = PF_SPLIT[x.on]; b.litH = 0; } else if (x.on === "unit") b.conv = true; else if (x.on === "use") b.used = true;
      else if (m) b.litH = 2 * Number(m[1]);
    });
    return b;
  };
  /* the child's own bar (parts, lit half-parts, the unit changed, the used part lifted, the cut lines drawn so far, free
     play's second whole), KEYED by the question (each warm-up step its own key): derived in render, so a new question or a
     restart never draws the old board for a frame (PATTERNS §18, ch 9) */
  const kStep = step === null || step === undefined ? (ph.steps || []).length : step;
  const sk = free ? "free" : warmNow ? n + ":w:" + kStep : n + ":" + index;
  const derive = (p: any, key: string, warm: boolean, k: number) => {
    const b = p.qk === key ? p : { ...fresh(), qk: key };
    if (!warm) return b;
    const d = stepsDone(k);
    return { ...b, ...d, pend: b.pend, cuts: b.cuts, conv: b.conv || !!d.conv, used: b.used || !!d.used };
  };
  const [raw, setRaw] = useState<any>(() => ({ ...fresh(), qk: "" }));
  const cur = useRef<any>({});
  cur.current = { sk, warmNow, kStep };
  const s = derive(raw, sk, warmNow, kStep);
  const setS = (fn: any) => setRaw((p: any) => {
    const c = cur.current, base = derive(p, c.sk, c.warmNow, c.kStep);
    return { ...(typeof fn === "function" ? fn(base) : fn), qk: c.sk };
  });
  /* the correction's reveal (0 none, 1 parts and light, 2 shares and the lift, 3 the answer line), keyed by the question
     too; a demo layer the child's next act clears */
  const qk = n + ":" + index;
  const [tbS, setTbS] = useState<any>({ k: "", v: 0 });
  const tb = !free && !warmNow && tbS.k === qk ? tbS.v : 0;
  const qRef = useRef(qk);
  qRef.current = qk;
  const setTb = (x: number) => setTbS({ k: qRef.current, v: x });
  const [tbOn, setTbOn] = useState(false);
  const [won, setWon] = useState("");
  const busy = useRef(false);
  const tbRef = useRef(false);
  tbRef.current = tbOn;
  useEffect(() => { tl.stop(); if (tbRef.current) api.lock(false); setTbOn(false); }, [n, index, free]);

  /* the layout: laid out once for the open keypad and kept at that size and place when it shuts (LAYOUT §3) */
  const ox = 0;
  const X0 = ox + PF_G.x, L = PF_G.L, BY = PF_G.by, BH = PF_G.bh, mid = BY + BH / 2;
  /* a text's width, estimated: Devanagari and Gujarati vowel signs and the virama take no width of their own */
  const wEst = (t: string, k: number) => t.replace(/[ँ-ः़ा-्॑-ॗॢॣઁ-ઃ઼ા-્ૢૣ]/g, "").length * k;
  /* row A: the whole's name, then its measure (smaller beside the Unit fact card), then 100% at the bar's end */
  const hasCard0 = f > 1;
  /* Gujarati draws in the device's font (the font kit carries Latin and Devanagari only), whose letters run wider */
  const nameW = (t: string) => wEst(t, (lang === "gu" ? 0.85 : lang === "hi" ? 0.7 : 0.64) * T.prompt) + 20;

  /* a guide step waits for one act: any other act only reports itself (the runtime shows the step's hint) */
  const gate = (name: string) => {
    if (stage === "demo" && name !== stepOn) { api.did(name); return false; }
    return true;
  };
  /* every act through api.act; the state changes only when it resolves true */
  const go = (name: string, o: any, done: () => void) => {
    if (!live || tbOn || busy.current) return;
    if (!gate(name)) return;
    setTb(0);
    busy.current = true;
    api.act(o).then((ok: boolean) => {
      busy.current = false;
      if (!ok) { setS((p: any) => ({ ...p, pend: 0, cuts: 0 })); return; }
      done();
      api.did(name);
    });
  };
  const split = (name: string) => {
    const k = PF_SPLIT[name];
    const xs = Array.from({ length: k - 1 }, (_, i) => X0 + (L * (i + 1)) / k);
    go(name, { tool: name === "cut" ? "scissors" : "hand", moves: name === "cut" ? "snip" : "tap", at: xs.map((x) => ({ x, y: mid })),
      onPoint: (i: number) => setS((p: any) => ({ ...p, pend: k, cuts: i + 1 })) },
      () => { setS((p: any) => ({ ...p, n: k, litH: 0, used: false, pend: 0, cuts: 0, dbl: false })); api.sfx.settle(); });
  };
  /* Halve: the scissors snip the last lit tenth and only its first half (5%) stays lit */
  const canHalve = s.n === 10 && s.litH > 0 && s.litH % 2 === 0 && !s.used;
  const halve = () => {
    if (!canHalve) { if (live) api.did("halve"); return; }
    const xm = X0 + (s.litH / 2 - 0.5) * (L / 10);
    go("halve", { tool: "scissors", moves: "snip", at: [{ x: xm, y: mid }] },
      () => { setS((p: any) => ({ ...p, litH: p.litH % 2 ? p.litH : p.litH - 1 })); api.sfx.settle(); });
  };
  /* Double (free play): a second whole of the same length is laid under the first, 200% in all */
  const doubleIt = () => go("double", { tool: "hand", moves: "push", from: { x: X0 + L / 2, y: mid }, at: [{ x: X0 + L / 2, y: PF_G.y2 + PF_G.h2 / 2 }] },
    () => { setS((p: any) => ({ ...p, dbl: true, used: false })); api.sfx.settle(); });
  /* the pencil strikes only the old measure ("3 m"), never the whole's name */
  const unit = () => {
    const old = indian(it.qty) + unitTx(it.u), mw = wEst(old, 0.6 * mFs(old));
    go("unit", { tool: "pencil", moves: "draw", from: { x: mx, y: 46 }, at: [{ x: mx + mw, y: 46 }],
      onPoint: () => setS((p: any) => ({ ...p, conv: true })) }, () => { setS((p: any) => ({ ...p, conv: true })); api.sfx.tick(); });
  };
  const useIt = () => {
    const uw = (s.litH * L) / (2 * s.n);
    if (!s.litH || s.n < 2) { if (live) api.did("use"); return; }
    go("use", { tool: "hand", moves: "push", from: { x: X0 + uw / 2, y: mid }, at: [{ x: X0 + uw / 2, y: PF_G.uy + PF_G.uh / 2 }],
      onPoint: () => setS((p: any) => ({ ...p, used: true })) }, () => { setS((p: any) => ({ ...p, used: true })); api.sfx.settle(); });
  };
  /* a tap on a part lights the bar up to it (a half is the Halve key's) */
  const tapPart = (i: number) => {
    const name = "piece-" + (i + 1);
    if (!live || tbOn || busy.current) return;
    if (!gate(name)) return;
    setTb(0);
    setS((p: any) => (p.n < 2 || i >= p.n ? p : { ...p, litH: 2 * (i + 1), used: false }));
    api.sfx.tick();
    api.did(name);
  };
  const act = (on: any) => {
    if (on === "unit") return unit();
    if (on === "use") return useIt();
    if (on === "halve") return halve();
    if (on === "double") return doubleIt();
    if (PF_SPLIT[on]) return split(on);
    const m = /^piece-(\d+)$/.exec(String(on || ""));
    if (m) tapPart(Number(m[1]) - 1);
  };
  /* "drag to light": a press that slides along the bar lights it up to the part the finger ends on; a tap (or Enter)
     lights up to the part tapped */
  const partAt = (x: number) => Math.max(0, Math.min(s.n - 1, Math.floor((x - X0) / (L / Math.max(1, s.n)))));
  const drag = useDrag((pay: any, p: any, moved: boolean) => tapPart(moved && p && isFinite(p.x) ? partAt(p.x) : pay));
  api.onEnter(stage === "demo" && stepOn ? () => act(stepOn) : null);
  HOOK.demo = () => { if (stepOn) act(stepOn); };

  /* the traceback: the right parts, the light, the shares (and the lift), then the answer line; unmarked */
  useEffect(() => {
    if (!wrong || stage !== "ask") return;
    api.lock(true);
    setTbOn(true);
    tl.run([[700, () => setTb(1)], [700, () => setTb(2)], [700, () => setTb(3)], [500, null]], () => { setTbOn(false); api.lock(false); });
  }, [wrong]);

  /* the win: its own line, and the answer stays drawn until the Next key */
  useEffect(() => {
    if (stage !== "win") return;
    setWon(n + ":" + index);
    pfWin(api, it.qid, PHASES[n - 1] ? PHASES[n - 1].closing : "");
  }, [stage === "win"]);
  const solved = !free && (stage === "win" || (stage === "idle" && won === n + ":" + index));

  /* what is drawn: the child's own bar, or the worked answer (correction or win) */
  const solN = it.fold || 10;
  const rev = free ? 0 : solved ? 3 : tb;
  /* a drag along the bar shows its light under the finger before it lands */
  const dragJ = !rev && drag.drag && drag.drag.moved && s.n > 1 && isFinite(drag.drag.x) ? partAt(drag.drag.x) : -1;
  const v = rev ? { n: solN, litH: Math.round(((it.pc || 0) * solN) / 50), conv: f > 1, used: kd === "left" && rev >= 2, pend: 0, cuts: 0 }
    : dragJ >= 0 ? { ...s, litH: 2 * (dragJ + 1), used: false } : s;
  const wholeShown = v.conv ? it.qty * f : it.qty;
  const unitShown = v.conv ? it.to : it.u;
  const unitTx = (u: any) => (u === "%" ? "%" : u ? " " + tx(u) : "");
  const qtyText = it.pct ? "" : indian(wholeShown) + unitTx(unitShown);
  const label0 = it.thing ? tx(it.thing) : tx("Whole");
  const mx = X0 + nameW(label0);
  const mFs = (t: string) => (hasCard0 ? Math.max(T.prompt, Math.min(T.xl, (X0 + PF_G.cardX - 16 - mx) / wEst(t, 0.6))) : T.display);
  const litPc = (v.litH * 100) / (2 * v.n);
  const uw = (v.litH * L) / (2 * v.n);
  const showAmt = (rev >= 2 && !it.pct) || (free && v.used);
  const amtOf = (share: number) => { const a = (wholeShown * share) / 100; return Number.isInteger(a) ? indian(a) : ""; };
  const ans = Array.isArray(it.answer) ? it.answer[0] : it.answer;
  const wholeAns = it.qty * f;
  const stroke = rev === 1 || rev === 2 ? "#B87800" : PF.line;

  /* the bar's pieces: whole parts, and a lit tenth's halves */
  const pw = L / v.n, share = 100 / v.n;
  const segs: any[] = [];
  for (let i = 0; i < v.n; i++) {
    const x = X0 + i * pw;
    if (v.litH === 2 * i + 1) { segs.push({ x, w: pw / 2, lit: true, sh: share / 2 }); segs.push({ x: x + pw / 2, w: pw / 2, lit: false, sh: share / 2 }); }
    else segs.push({ x, w: pw, lit: v.litH >= 2 * (i + 1), sh: share });
  }
  /* a reading on the ribbon sits on a light chip, so it never depends on the picture under it */
  const chip = (x: number, y: number, t: string, fs: number, w: number, fill: string) => {
    const cw = Math.min(w - 6, t.length * 0.62 * fs + 12);
    return (
      <g>
        <rect x={x - cw / 2} y={y - fs * 0.86} width={cw} height={fs * 1.12} rx={8} fill={PF.sheet} fillOpacity={0.94} />
        <text x={x} y={y} textAnchor="middle" fontSize={fs} fontWeight={700} fill={fill}>{t}</text>
      </g>
    );
  };
  /* one piece at y, h tall: its tint over the ribbon (none when unlit; a lit one deeper, with a dark inset edge), its
     outline, its per cent and (correction, win, free play's lifted part) its share. A half tenth (41 wide) carries no
     per cent of its own: its "5%" is a callout beside the bar (`callout`); a short share still fits inside it */
  const segEl = (g: any, k: string, y: number, h: number, fill: string, op: number, dash?: boolean, lit?: boolean) => {
    const half = g.w < 60, fs = half ? T.micro : v.n <= 4 ? T.prompt : T.label;
    const amt = showAmt && g.lit ? amtOf(g.sh) : "";
    const cx = g.x + g.w / 2, amtFits = !half || wEst(amt, 0.62 * fs) + 10 <= g.w - 4;
    return (
      <g key={k}>
        <rect x={g.x} y={y} width={g.w} height={h} fill={fill} fillOpacity={op} stroke={dash ? C.rule : stroke} strokeWidth={dash ? 2.5 : 3} strokeDasharray={dash ? "10 8" : undefined} />
        {lit && <rect x={g.x + 4} y={y + 4} width={g.w - 8} height={h - 8} fill="none" stroke={PF_INK.amber} strokeWidth={3} />}
        {v.n > 1 && !dash && !half && chip(cx, amt ? y + h * 0.36 : y + h / 2 + fs * 0.36, g.sh + "%", fs, g.w, PF.line)}
        {amt && !dash && amtFits && chip(cx, half ? y + h / 2 + fs * 0.36 : y + h * 0.82, amt, fs, g.w, PF_INK.blue)}
      </g>
    );
  };
  /* a half's "5%", drawn level as a small callout with a short tick to its half: above the bar where row A is clear,
     else below it (`side` 1); on the lifted row, to its right (`side` 2) */
  const callout = (g: any, k: string, side: number, yTop: number, yBot: number) => {
    const t = g.sh + "%", fs = T.micro, cw = wEst(t, 0.62 * fs) + 14, chh = fs * 1.12, cx = g.x + g.w / 2;
    if (side === 2) {
      const x0 = g.x + g.w + 10, cy = (yTop + yBot) / 2;
      return (
        <g key={k}>
          <line x1={g.x + g.w} y1={cy} x2={x0} y2={cy} stroke={PF.line} strokeWidth={2.5} />
          <rect x={x0} y={cy - chh / 2} width={cw} height={chh} rx={8} fill={PF.sheet} stroke={PF.line} strokeWidth={2} />
          <text x={x0 + cw / 2} y={cy + fs * 0.36} textAnchor="middle" fontSize={fs} fontWeight={700} fill={PF.line}>{t}</text>
        </g>
      );
    }
    const up = side === 0, y0 = up ? yTop - 10 - chh : yBot + 8;
    return (
      <g key={k}>
        <line x1={cx} y1={up ? yTop : yBot} x2={cx} y2={up ? yTop - 10 : yBot + 8} stroke={PF.line} strokeWidth={2.5} />
        <rect x={cx - cw / 2} y={y0} width={cw} height={chh} rx={8} fill={PF.sheet} stroke={PF.line} strokeWidth={2} />
        <text x={cx} y={y0 + chh / 2 + fs * 0.36} textAnchor="middle" fontSize={fs} fontWeight={700} fill={PF.line}>{t}</text>
      </g>
    );
  };
  const dblOn = free && s.dbl;
  const Y2 = PF_G.y2, H2 = PF_G.h2, UY = PF_G.uy, UH = PF_G.uh;
  /* row B sits 9 lower in Hindi, whose matras rise over the line */
  const rb = PF_G.rowB + (lang === "hi" ? 9 : 0);
  /* where row A is busy (the name and measure, the Unit fact card, 100%): a half's callout goes above the bar only where
     it is clear, else below the bar, and row B's labels then step round it */
  const spansA: any[] = [[X0, mx + 14 + wEst(qtyText, (lang === "gu" ? 0.75 : 0.62) * mFs(qtyText))],
    f > 1 && !dblOn ? [X0 + PF_G.cardX - 8, X0 + PF_G.cardX + PF_G.cardW + 8] : null, [X0 + L - 130, X0 + L]];
  const clearA = (a: number, b: number) => spansA.every((p) => !p || b < p[0] || a > p[1]);
  /* ONE callout a halved tenth: its lit half while the child plays, its green half once the lit one is used */
  const halves = segs.filter((g) => g.w < 60 && (v.used ? !g.lit : g.lit)).map((g) => {
    const cx = g.x + g.w / 2;
    return { g, side: clearA(cx - 32, cx + 32) ? 0 : 1, a: cx - 32, b: cx + 32 };
  });
  const below = halves.filter((h) => h.side === 1);
  const avoid = (x: number, w: number) => {
    let nx = x;
    below.forEach((h) => { if (nx < h.b + 12 && nx + w > h.a - 12) nx = h.b + 12; });
    return nx;
  };
  const usedHalf = v.used ? segs.find((g) => g.w < 60 && g.lit) : null;

  /* the keys: phase 1's three folds side by side; Cut, then Use, as ONE key whose label follows the act */
  let ids: string[] = [];
  if (kd === "fold") ids = ["half", "quarter", "tenth"];
  else if (kd === "free") ids = ["half", "quarter", "tenth", "double", "use"];
  else if (kd === "tenths" || kd === "measure") ids = s.n === 1 ? ["cut"] : canHalve ? ["halve"] : [];
  else if (kd === "left") ids = s.n === 1 ? ["cut"] : s.used ? [] : canHalve ? ["halve", "use"] : ["use"];
  /* no key while a correction plays (it is inert then, and the correction's rows stand just above it) */
  if (!live || solved || tbOn) ids = [];
  /* every key has a FIXED place, so none moves under a finger when another comes or goes: the fold rows (phase 1, free
     play) never change their set; elsewhere Cut, then Use, hold the centre and Half a tenth its own slot at the left */
  const fixedRow = kd === "tenths" || kd === "measure" || kd === "left";
  const kw = ids.length >= 5 ? 164 : ids.length === 3 ? 250 : 240, gap = ids.length >= 5 ? 10 : 30;
  /* a key's label at the biggest size that leaves it room in its key, never under 28 */
  const keyFs = (t: string, w: number, base: number) => Math.max(T.micro, Math.min(base, (w - 30) / wEst(t, 0.62)));
  const kx0 = ox + (PF_G.w - (ids.length * kw + (ids.length - 1) * gap)) / 2;
  const keyBox = (id: string) => (fixedRow ? (id === "halve" ? { x: ox + 30, w: 270 } : { x: ox + 330, w: 240 })
    : { x: kx0 + ids.indexOf(id) * (kw + gap), w: kw });
  const keyOff = (id: string) => tbOn || (id === "use" && (!s.litH || s.dbl)) || (id === "double" && s.dbl);
  const lastKey = useRef(0);
  const pressKey = (id: string) => {
    const t = Date.now();
    if (t - lastKey.current < 400) return;
    lastKey.current = t;
    act(id);
  };
  const hasCard = hasCard0 && !(free && s.dbl);
  const cardLive = hasCard && live && !s.conv && !solved;
  const partsLive = live && !solved && s.n > 1;

  /* the one invite: on the control the guide step waits for */
  let inv: any = null;
  if (stage === "demo" && stepOn) {
    const j = ids.indexOf(stepOn), m = /^piece-(\d+)$/.exec(String(stepOn)), kb = keyBox(String(stepOn));
    /* r57: a wide key or card is hugged by a rounded rect, never cut by a circle */
    if (j >= 0) inv = { x: kb.x + kb.w / 2, y: PF_G.ky + PF_G.kh / 2, r: 44, w: kb.w, h: PF_G.kh };
    else if (stepOn === "unit") inv = { x: X0 + PF_G.cardX + PF_G.cardW / 2, y: PF_G.cardY + PF_G.cardH / 2, r: 50, w: PF_G.cardW, h: PF_G.cardH, rx: 16 };
    else if (m && s.n > 1) inv = { x: X0 + (Number(m[1]) - 0.5) * (L / s.n), y: mid, r: 46 };
  }

  /* the line under the bar: the light so far, the part left, or (correction and win) the answer */
  /* two texts on one baseline, `a` then `b` (each a label of at most four words): `a` ends where `b` begins, so they
     never touch whatever the font; centred on x by an estimate of their width, or starting at x */
  const pair = (x: number, y: number, a: string, b: string, fs: number, fill: string, centre: boolean, fillB?: string) => {
    const wa = wEst(a, 0.6 * fs), wb = b ? wEst(b, 0.6 * fs) + 14 : 0, xa = (centre ? x - (wa + wb) / 2 : x) + wa;
    /* from x (not centred): `a` starts at x and `b` after a generous estimate of `a` (Poppins bold runs about 0.55 em) */
    const xs = x + wEst(a, 0.56 * fs) + 14;
    return (
      <g>
        <text x={centre ? xa : x} y={y} textAnchor={centre ? "end" : "start"} fontSize={fs} fontWeight={700} fill={fill}>{a}</text>
        {b && <text x={centre ? xa + 14 : xs} y={y} fontSize={fs} fontWeight={700} fill={fillB || fill}>{b}</text>}
      </g>
    );
  };
  let rowB: any = null;
  if (dblOn) {
    const a = amtOf(200);
    rowB = pair(ox + PF_G.w / 2, 424, tx("Together") + " 200%", a ? "= " + a + unitTx(unitShown) : "", T.prompt, PF_INK.green, true);
  } else if (rev >= 3) {
    /* "25% of 44" in English; Hindi and Gujarati put the whole first ("44 का 25%", "44 ના 25%") */
    const pcOf = (w: string) => (lang === "en" ? it.pc + "% " + tx("of") + " " + w : w + " " + tx("of") + " " + it.pc + "%");
    const a = kd === "left"
      ? (it.pct ? "100% − " + it.pc + "%" : indian(wholeAns) + " − " + indian(wholeAns - ans))
      : kd === "measure" ? pcOf(indian(wholeAns) + unitTx(it.to))
      : pcOf(String(it.qty));
    const b = "= " + (it.pct ? ans + "%" : indian(ans) + unitTx(it.to));
    rowB = pair(ox + PF_G.w / 2, rb, a, b, T.speech, PF_INK.green, true);
  } else if (v.used) {
    /* Left over the green part on row B; Used over the lifted part while the child plays (beside the lifted row in a
       correction or a win), each inside the bar's span, clear of the other and of a callout, in every language (a garden
       question's per cent left is its answer: Left carries no number there) */
    const tu = tx("Used") + " " + litPc + "%";
    const tl2 = tx("Left") + (it.pct ? "" : " " + (100 - litPc) + "%");
    const fs = T.prompt, wu = rev < 2 ? wEst(tu, 0.6 * fs) : 0, wl = wEst(tl2, 0.6 * fs);
    const ux = avoid(Math.max(X0, Math.min(X0 + L - wu, X0 + uw / 2 - wu / 2)), wu);
    let lx = Math.max(X0, Math.min(X0 + L - wl, X0 + uw + (L - uw) / 2 - wl / 2));
    if (wu && lx < ux + wu + 24) lx = ux + wu + 24;
    lx = avoid(lx, wl);
    rowB = (
      <g>
        {wu > 0 && <text x={ux} y={rb} fontSize={fs} fontWeight={700} fill={PF_INK.rose}>{tu}</text>}
        <text x={Math.min(lx, X0 + L + 30 - wl)} y={rb} fontSize={fs} fontWeight={700} fill={PF_INK.green}>{tl2}</text>
      </g>
    );
  } else if (v.litH > 0) {
    const a = free ? amtOf(litPc) : "", t1 = tx("Lit") + " " + litPc + "%";
    rowB = pair(avoid(X0, wEst(t1 + (a ? " = " + a : ""), 0.6 * T.prompt)), rb, t1, a ? "= " + a + unitTx(unitShown) : "", T.prompt, PF_INK.amber, false);
  }
  /* the lifted row's own label in a correction or a win, beside the row (after its half's callout) */
  const usedBeside = v.used && rev >= 2 && uw > 0 && (
    <text x={X0 + uw + (usedHalf ? 10 + wEst("5%", 0.62 * T.micro) + 14 + 16 : 24)} y={UY + UH / 2 + 14} fontSize={T.prompt} fontWeight={700} fill={PF_INK.rose}>
      {tx("Used") + " " + (showAmt && amtOf(litPc) ? amtOf(litPc) + unitTx(unitShown) : litPc + "%")}
    </text>
  );

  /* the fraction line (phases 2 and 3; phase 3 once the measure is in the answer's unit): the per cent over 100 times the whole */
  const frac = ((kd === "tenths" && (s.n > 1 || rev)) || (kd === "measure" && v.conv)) && (
    <g>
      <text x={X0 + 45} y={370} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={PF.line}>{String(it.pc)}</text>
      <line x1={X0} y1={382} x2={X0 + 90} y2={382} stroke={PF.line} strokeWidth={4} />
      <text x={X0 + 45} y={422} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={PF.line}>100</text>
      {/* the Unit fact card is in row A, so the correction's result follows the product on its own line */}
      {pair(X0 + 108, 398, "× " + indian(wholeShown) + unitTx(unitShown), rev >= 3 ? "= " + indian(ans) + unitTx(unitShown) : "", T.prompt, PF.line, false, PF_INK.green)}
    </g>
  );

  /* what the host and the agent read back (never the answer) */
  api.share({ quantity: it.qty, unit: s.conv ? it.to : it.u, per_cent: it.pc, folds: s.n, lit: (s.litH * 100) / (2 * s.n), used: s.used, complete: stage === "idle" });

  const cx = X0 + PF_G.cardX, cy = PF_G.cardY;
  return (
    <g>
      <g pointerEvents={rev ? "none" : undefined}>
        {/* the whole: its name and size (deep blue, violet once the unit card changed it), and 100% at the bar's end */}
        {/* one text: the measure follows the name's real end 16 on, in every language and font */}
        <text x={X0} y={66} fontSize={T.prompt} fontWeight={700} fill={PF.line}>
          {label0}
          {qtyText && <tspan dx={16} fontSize={mFs(qtyText)} fill={v.conv ? PF_INK.violet : PF_INK.blue}>{qtyText}</tspan>}
        </text>
        <text x={X0 + L} y={66} textAnchor="end" fontSize={T.speech} fontWeight={700} fill={PF.line}>100%</text>
        {/* the bar is ONE ribbon (the skin, clipped to the bar; the plain sheet under it is the fallback); lit parts deep
            amber; once used, the part left green and the used part lifted off in rose, the ribbon carried with it */}
        <defs>
          <clipPath id="pfBarClip"><rect x={X0 + (v.used ? uw : 0)} y={BY} width={L - (v.used ? uw : 0)} height={BH} rx={6} /></clipPath>
          <clipPath id="pfUsedClip"><rect x={X0} y={UY} width={uw} height={UH} /></clipPath>
          <clipPath id="pfDblClip"><rect x={X0} y={Y2} width={L} height={H2} rx={6} /></clipPath>
        </defs>
        <rect x={X0} y={BY} width={L} height={BH} rx={6} fill={PF.sheet} />
        <Skin name="ribbon" x={X0} y={BY} w={L} h={BH} clip="url(#pfBarClip)" />
        {segs.map((g, i) => (g.lit && v.used ? segEl(g, "b" + i, BY, BH, PF.sheet, 1, true)
          : segEl(g, "b" + i, BY, BH, g.lit ? PF_LIT : v.used ? PF.green : PF.sheet, g.lit ? 0.85 : v.used ? 0.6 : 0, false, g.lit)))}
        {v.used && uw > 0 && <rect x={X0} y={UY} width={uw} height={UH} fill={PF.sheet} />}
        {v.used && uw > 0 && <Skin name="ribbon" x={X0} y={UY} w={L} h={UH} clip="url(#pfUsedClip)" />}
        {v.used && segs.map((g, i) => (g.lit ? segEl(g, "u" + i, UY, UH, PF.rose, 0.75) : null))}
        {usedHalf && uw > 0 && callout(usedHalf, "cu", 2, UY, UY + UH)}
        {usedBeside}
        {/* free play's Double: a second whole of the same ribbon, the same length, under the first */}
        {dblOn && (
          <g>
            <rect x={X0} y={Y2} width={L} height={H2} rx={6} fill={PF.sheet} />
            <Skin name="ribbon" x={X0} y={Y2} w={L} h={H2} clip="url(#pfDblClip)" />
            <rect x={X0} y={Y2} width={L} height={H2} rx={6} fill="none" stroke={PF.line} strokeWidth={5} />
            {chip(X0 + L / 2, Y2 + H2 / 2 + 14, "100%", T.prompt, L, PF.line)}
          </g>
        )}
        {/* the cut lines as the tool passes them */}
        {s.pend > 0 && !rev && Array.from({ length: s.cuts }).map((_, j) => (
          <line key={"c" + j} x1={X0 + (L * (j + 1)) / s.pend} y1={BY} x2={X0 + (L * (j + 1)) / s.pend} y2={BY + BH} stroke={PF.line} strokeWidth={4} />
        ))}
        <rect x={X0} y={BY} width={L} height={BH} rx={6} fill="none" stroke={PF.line} strokeWidth={5} />
        {halves.map((h, i) => callout(h.g, "ch" + i, h.side, BY, BY + BH))}
        {rowB}
        {frac}
        {/* the Unit fact card */}
        {hasCard && (
          <g>
            <rect x={cx} y={cy} width={PF_G.cardW} height={PF_G.cardH} rx={16} fill={tint(PF.violet, 0.88)} stroke={PF.violet} strokeWidth={3} />
            <text x={cx + PF_G.cardW / 2} y={cy + 31} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={PF.line}>{tx("Unit fact")}</text>
            {pair(cx + PF_G.cardW / 2, cy + 70, "1" + unitTx(it.u) + " =", indian(f) + unitTx(it.to),
              Math.max(T.micro, Math.min(T.label, (PF_G.cardW - 30) / wEst("1" + unitTx(it.u) + " = " + indian(f) + unitTx(it.to), 0.6))), PF_INK.violet, true)}
          </g>
        )}
      </g>
      {cardLive && <Hit id="unit" x={cx} y={cy} w={PF_G.cardW} h={PF_G.cardH} onPress={() => act("unit")} label={tx("Unit fact")} enabled={!tbOn} />}
      {ids.map((id, j) => {
        const kb = keyBox(id), lab = tx(PF_KEY[id]), kfs = keyFs(lab, kb.w, ids.length >= 4 || id === "halve" ? T.label : T.prompt);
        return (
          <Key key={fixedRow ? (id === "halve" ? "kh" : "kc") : "k" + j} id={id} label={lab} x={kb.x} y={PF_G.ky} w={kb.w} h={PF_G.kh} C={C} tone="key"
            disabled={keyOff(id)} onClick={() => pressKey(id)}>
            {/* a key that cannot act now keeps a readable label in half-strength dark ink, never cream on cream */}
            <text y={kfs * 0.35} textAnchor="middle" fontSize={kfs} fontWeight={700} fill={keyOff(id) ? "#6B6560" : toneInk("key", C.ink)}>{lab}</text>
          </Key>
        );
      })}
      {/* the parts: a tap lights up to the part tapped, a drag along the bar lights up to the part the finger ends on */}
      {partsLive && Array.from({ length: s.n }).map((_, i) => (
        <rect key={"p" + i} className="c4-hit" x={X0 + (i * L) / s.n} y={BY} width={L / s.n} height={BH} fill="transparent"
          {...control("piece-" + (i + 1), tx("Part") + " " + (i + 1))} {...drag.bind(i)} {...drag.keys(i)} />
      ))}
      {inv && <Invite x={inv.x} y={inv.y} r={inv.r} w={inv.w} h={inv.h} rx={inv.rx} C={C} />}
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase: the bar with its light, and the answer */
function Thumb({ n, result, it, C, w, h, lang = "en", tx = (v: any) => v }: any) {
  const item = it || (result && result.last && n && PHASES[n - 1] ? PHASES[n - 1].items[result.last.item] : null);
  const v = result && result.last ? result.last.value : null;
  if (!item || v === null || v === undefined) return null;
  const k = item.fold || 10, bw = w - 24, pw = bw / k, lit = ((item.pc || 0) * bw) / 100;
  const u = item.parts && item.parts[0] ? item.parts[0].unit : "";
  const val = item.parts ? slotPartsOf(v, 1)[0] : String(leadNumber(v) ?? v);
  /* a unit word only in the language it is written in (English, or once TR has its Hindi / Gujarati) */
  const uw = u && u !== "%" && (lang === "en" || tx(u) !== u) ? " " + tx(u) : "";
  const txt = indian(Number(val)) + (u === "%" ? "%" : uw);
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      {/* a slim bar at the top and the value well under it, so the value never sits on the bar's lines */}
      <rect x={12} y={6} width={lit} height={14} fill={PF_LIT} fillOpacity={0.85} />
      {Array.from({ length: k }).map((_, i) => <rect key={i} x={12 + i * pw} y={6} width={pw} height={14} fill="none" stroke={PF.line} strokeWidth={1.5} />)}
      <text x={w / 2} y={Math.min(h - 6, 70)} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={PF_INK.green}>{txt}</text>
    </g>
  );
}

function PerCentOf(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, fitHost: () => null,
      board: true,
      keyOnly: true,
      bigPad: true,
      nextKey: true,
      navDots: true,
      StartArt, START_HOOK,
      }} />
  );
}

export default PerCentOf;
