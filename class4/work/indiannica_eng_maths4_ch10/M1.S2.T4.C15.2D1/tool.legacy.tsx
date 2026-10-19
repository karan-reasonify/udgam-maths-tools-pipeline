/* ═══ M1.S2.T4.C12.2D1 · tower_builder · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists: header + its three controls, canvas, slot + pad, bubble + mascot,
   phase dots (user / AI mode), window.toolApi, sounds, the synced voice, scoring, the events,
   idle and restart. NO imports in this file; only the five host hooks. Follow docs/LAYOUT.md.
   Edit, never rewrite. Built by `node cli.mjs scaffold`; concepts are verbatim (check compares them). */

const TOOL_ID = "tower_builder";
const MEDIA_ID = "M1.S2.T4.C12.2D1";
const TOOL_NAME = "Tower Builder";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
const VOICE = {"rate":0.92,"pitch":1.06};

/* spoken before phase 1's teach lines only (the plan's opening voice line) */
const OPENING = ["A tower of empty boxes, and its sign stands at the foot."];
/* the whole-tool line: spoken on the summary page */
const FINISH_LINE = "Every tower built from the bottom, and every box checked against one sign.";
/* said when the child opens Free play from the summary page (the plan's free-play voice line) */
const FREE_LINE = "Free play. Change any bottom number, flip the sign, and watch the tower build itself.";

/* Hindi and Gujarati, keyed by the English line exactly (runtime r21: `lineFor(line, lang, TR)`); the English
   everywhere else stays what the checks read. NCERT class 4 patterns: tower मीनार / મિનાર, box डिब्बा / ડબ્બો,
   sign चिह्न / ચિહ્ન (the plus or times sign), bottom row सबसे नीचे की पंक्ति / સૌથી નીચેની હરોળ.
   add जोड़ो / ઉમેરો, multiply गुणा करो / ગુણાકાર કરો; the sign plates are जोड़ / गुणा and ઉમેરો / ગુણો
   (short, they sit beside the sign), the answer words the nouns जोड़ / गुणा and સરવાળો / ગુણાકાર. The
   answer ids ("all follow", "one sign"...), the pad labels and the verdict are one short line each (a
   two-line pad label is too tight in Devanagari and Gujarati). Digits stay digits: the runtime speaks
   them in the language in use. A first draft; wants a native speaker's read. */
const TR: any = {
  hi: {
    "Tower Builder": "मीनार बनाओ",
    "A tower of empty boxes, and its sign stands at the foot.": "खाली डिब्बों की एक मीनार है, और उसका चिह्न सबसे नीचे रखा है।",
    "Every tower built from the bottom, and every box checked against one sign.": "हर मीनार नीचे से बनी, और हर डिब्बा एक चिह्न से जाँचा गया।",
    "Free play. Change any bottom number, flip the sign, and watch the tower build itself.": "मुक्त खेल। नीचे की कोई संख्या बदलो, चिह्न पलटो और मीनार को बनते देखो।",

    "Two neighbours make the box above": "पास-पास के दो डिब्बे ऊपर का डिब्बा बनाते हैं",
    "Every box rests on two boxes side by side. Here the two are added together.": "हर डिब्बा साथ-साथ रखे दो डिब्बों पर टिका है। यहाँ इन दोनों को जोड़ा जाता है।",
    "Each box is made from the two that touch it below.": "हर डिब्बा नीचे के उन दो डिब्बों से बनता है जो उसे छूते हैं।",
    "Work upward from the lowest empty box.": "सबसे नीचे के खाली डिब्बे से ऊपर की ओर बढ़ो।",
    "Each box in an adding tower is the sum of the two beneath it.": "जोड़ वाली मीनार में हर डिब्बा नीचे के दो डिब्बों का जोड़ है।",
    "You learned: each box is the sum of the two boxes under it.": "तुमने सीखा: हर डिब्बा नीचे के दो डिब्बों का जोड़ है।",
    "This tower adds. The bottom row holds 6, 9, 4 and 11. Tap the lowest empty box and fill up to the top.": "यह जोड़ वाली मीनार है। सबसे नीचे की पंक्ति में 6, 9, 4 और 11 हैं। सबसे नीचे का खाली डिब्बा टैप करो और ऊपर तक भरो।",
    "The top box?": "सबसे ऊपर का डिब्बा?",
    "Which two boxes hold this one up?": "यह डिब्बा किन दो डिब्बों पर टिका है?",
    "A shorter adding tower. This one starts with 8, 5 and 7. Climb to the top box.": "अब एक छोटी जोड़ वाली मीनार है। इसमें नीचे 8, 5 और 7 हैं। ऊपर के डिब्बे तक चढ़ो।",
    "Look at the two boxes right under it.": "इसके ठीक नीचे के दो डिब्बे देखो।",
    "Four numbers start this one: 14, 16, 20 and 5. Every gap still shows a plus. Build it to the top.": "इसकी शुरुआत चार संख्याओं से होती है: 14, 16, 20 और 5। हर दो डिब्बों के बीच अब भी जोड़ का चिह्न है। इसे ऊपर तक बनाओ।",
    "Add the pair under the box you opened.": "जो डिब्बा खोला है, उसके नीचे के दो डिब्बे जोड़ो।",

    "A tower that multiplies": "गुणा करने वाली मीनार",
    "Same tower, same pairs. Only the sign in the gaps has changed.": "वही मीनार, वही दो-दो डिब्बे। बस बीच का चिह्न बदल गया है।",
    "A gap with a times sign means multiply those two.": "जहाँ गुणा का चिह्न हो, वहाँ उन दो डिब्बों का गुणा करो।",
    "Take the pair below, one box at a time.": "नीचे के दो डिब्बे लो और एक-एक करके डिब्बा भरो।",
    "A multiplying tower keeps the same shape, and each box is the product of the two below.": "गुणा वाली मीनार का आकार वही रहता है। हर डिब्बा नीचे के दो डिब्बों का गुणनफल होता है।",
    "You learned: a multiplying tower keeps the same shape and pairs.": "तुमने सीखा: गुणा वाली मीनार का आकार और जोड़ियाँ वही रहती हैं।",
    "This tower multiplies. Its bottom row holds 3, 1, 2 and 2. Fill every box up to the top.": "यह गुणा वाली मीनार है। इसकी सबसे नीचे की पंक्ति में 3, 1, 2 और 2 हैं। ऊपर तक हर डिब्बा भरो।",
    "Every gap here carries a times sign.": "यहाँ हर दो डिब्बों के बीच गुणा का चिह्न है।",
    "A three wide one now, starting with 2, 5 and 1. Multiply each pair and climb.": "अब तीन डिब्बों वाली मीनार, जो 2, 5 और 1 से शुरू होती है। हर दो डिब्बों का गुणा करो और ऊपर चढ़ो।",
    "A number times one stays just as it was.": "किसी संख्या को एक से गुणा करने पर वह वैसी ही रहती है।",
    "One box in the bottom row is blank. The row shows 3, a blank and 2, with 12 and 8 above. Find the blank, then the top.": "सबसे नीचे की पंक्ति में एक डिब्बा खाली है। पंक्ति में 3, एक खाली डिब्बा और 2 हैं, और ऊपर 12 और 8 हैं। पहले खाली डिब्बा ढूँढो, फिर सबसे ऊपर का डिब्बा।",
    "Which number times 3 gives 12?": "कौन सी संख्या को 3 से गुणा करने पर 12 मिलता है?",

    "Checking a tower box by box": "एक-एक डिब्बा करके मीनार जाँचना",
    "A filled tower now. Tap each box from the bottom row up and test it against the two below.": "अब भरी हुई मीनार है। नीचे की पंक्ति से ऊपर की ओर हर डिब्बा टैप करो। उसे नीचे के दो डिब्बों से जाँचो।",
    "Name the two boxes under the one you are testing.": "जिस डिब्बे को जाँच रहे हो, उसके नीचे के दो डिब्बे पहचानो।",
    "A single box that does not agree settles the tower.": "एक डिब्बा भी मेल न खाए, तो उसी से मीनार का फ़ैसला हो जाता है।",
    "Every box gets its turn, and the box that does not agree decides it.": "हर डिब्बे की बारी आती है। जो डिब्बा मेल नहीं खाता, वही फ़ैसला करता है।",
    "You learned: test every box, not only the top one.": "तुमने सीखा: हर डिब्बा जाँचो, सिर्फ़ सबसे ऊपर का नहीं।",
    "every box follows": "सब सही",
    "one box breaks it": "एक गलत",
    "The bottom row holds 6, 2 and 5. Above them sit 8 and 10, with 18 at the top. Does one sign make every box?": "सबसे नीचे की पंक्ति में 6, 2 और 5 हैं। उनके ऊपर 8 और 10 हैं, और सबसे ऊपर 18 है। क्या एक ही चिह्न से हर डिब्बा बनता है?",
    "Does one sign make every box?": "एक चिह्न से हर डिब्बा बनता है?",
    "Test the middle boxes before you judge the top.": "सबसे ऊपर का फ़ैसला करने से पहले बीच के डिब्बे जाँचो।",
    "A new tower: 3, 4 and 6 at the bottom, then 7 and 10, then 17. Test every box before you decide.": "नई मीनार: नीचे 3, 4 और 6 हैं, फिर 7 और 10, फिर 17। फ़ैसला करने से पहले हर डिब्बा जाँचो।",
    "The same test?": "वही जाँच?",
    "Add each pair and see whether the box agrees.": "हर दो डिब्बे जोड़ो। देखो कि ऊपर का डिब्बा मेल खाता है या नहीं।",
    "adding": "जोड़",
    "multiplying": "गुणा",
    "every box multiplies": "हर डिब्बा गुणा से बनता है",
    "This one holds 2, 3 and 4 at the bottom, then 6 and 12, then 72. Which sign makes every box?": "इसमें नीचे 2, 3 और 4 हैं, फिर 6 और 12, फिर 72। कौन सा चिह्न हर डिब्बा बनाता है?",
    "Which sign works?": "कौन सा चिह्न चलेगा?",
    "Try the bottom pair with each sign in turn.": "नीचे के दो डिब्बों पर बारी-बारी से हर चिह्न आज़माओ।",

    "One operation all the way up": "ऊपर तक एक ही चिह्न",
    "A correct tower keeps one sign from the bottom row to the top. Try each sign in turn.": "सही मीनार में नीचे की पंक्ति से ऊपर तक एक ही चिह्न रहता है। बारी-बारी से हर चिह्न आज़माओ।",
    "Tap the sign key at the foot to test the other sign.": "नीचे के चिह्न वाले बटन को टैप करके दूसरा चिह्न जाँचो।",
    "A tower that changes sign halfway is neither kind.": "जो मीनार बीच में चिह्न बदल ले, वह इन दोनों में से कोई नहीं है।",
    "A tower is correct only when one sign works for every box, bottom row to top.": "मीनार तभी सही है, जब एक ही चिह्न हर डिब्बे के लिए चले। यह नीचे से ऊपर तक होना चाहिए।",
    "You learned: a correct tower keeps one sign for every box.": "तुमने सीखा: सही मीनार में हर डिब्बे के लिए एक चिह्न रहता है।",
    "one sign works": "एक चिह्न",
    "two signs needed": "दो चिह्न",
    "Here are 5, 1 and 3, with 5 and 3 above, and 8 at the top. Every box works with some sign, but can one sign do all?": "ये हैं 5, 1 और 3, ऊपर 5 और 3, और सबसे ऊपर 8। हर डिब्बा किसी चिह्न से बनता है, पर क्या एक चिह्न सब बना देगा?",
    "One sign for every box?": "हर डिब्बे के लिए एक चिह्न?",
    "Start at the lowest pair and see which sign fits.": "सबसे नीचे के दो डिब्बों से शुरू करो। देखो कि कौन सा चिह्न ठीक बैठता है।",
    "Now 2, 4 and 3 at the bottom, 6 and 7 above, and 42 at the top. Does the top follow the same sign as the rest?": "अब नीचे 2, 4 और 3 हैं, उनके ऊपर 6 और 7, और सबसे ऊपर 42। क्या सबसे ऊपर का डिब्बा भी बाकी डिब्बों वाले चिह्न से बना है?",
    "Just one sign here?": "यहाँ बस एक चिह्न?",
    "Check the middle row first, then the top box.": "पहले बीच की पंक्ति जाँचो, फिर सबसे ऊपर का डिब्बा।",
    "Your turn to build. The bottom row holds 2, 3 and 5, and every gap shows a times sign. Fill it to the top.": "अब तुम्हारी बारी, मीनार बनाओ। नीचे की पंक्ति में 2, 3 और 5 हैं। हर दो डिब्बों के बीच गुणा का चिह्न है। इसे ऊपर तक भरो।",
    "Multiply the pair under the box you opened.": "जो डिब्बा खोला है, उसके नीचे के दो डिब्बों का गुणा करो।",

    "all follow": "सब सही",
    "one breaks": "एक गलत",
    "one sign": "एक चिह्न",
    "two signs": "दो चिह्न",
    "boxes filled": "भरे डिब्बे",
    "boxes checked": "जाँचे डिब्बे",
    "working": "हिसाब",
    "adds": "जोड़",
    "times": "गुणा",
  },
  gu: {
    "Tower Builder": "મિનાર બનાવો",
    "A tower of empty boxes, and its sign stands at the foot.": "ખાલી ડબ્બાઓનો એક મિનાર છે. તેનું ચિહ્ન સૌથી નીચે મૂકેલું છે.",
    "Every tower built from the bottom, and every box checked against one sign.": "દરેક મિનાર નીચેથી બન્યો, અને દરેક ડબ્બો એક ચિહ્નથી તપાસાયો.",
    "Free play. Change any bottom number, flip the sign, and watch the tower build itself.": "મુક્ત રમત. નીચેની કોઈ પણ સંખ્યા બદલો, ચિહ્ન પલટો અને મિનારને બનતો જુઓ.",

    "Two neighbours make the box above": "બાજુ-બાજુના બે ડબ્બા ઉપરનો ડબ્બો બનાવે છે",
    "Every box rests on two boxes side by side. Here the two are added together.": "દરેક ડબ્બો બાજુ-બાજુના બે ડબ્બા પર ટકેલો છે. અહીં આ બંનેને ઉમેરવામાં આવે છે.",
    "Each box is made from the two that touch it below.": "દરેક ડબ્બો તેને અડતા નીચેના બે ડબ્બાથી બને છે.",
    "Work upward from the lowest empty box.": "સૌથી નીચેના ખાલી ડબ્બાથી ઉપર તરફ આગળ વધો.",
    "Each box in an adding tower is the sum of the two beneath it.": "સરવાળાવાળા મિનારમાં દરેક ડબ્બો નીચેના બે ડબ્બાનો સરવાળો હોય છે.",
    "You learned: each box is the sum of the two boxes under it.": "તમે શીખ્યા: દરેક ડબ્બો નીચેના બે ડબ્બાનો સરવાળો છે.",
    "This tower adds. The bottom row holds 6, 9, 4 and 11. Tap the lowest empty box and fill up to the top.": "આ સરવાળાનો મિનાર છે. સૌથી નીચેની હરોળમાં 6, 9, 4 અને 11 છે. સૌથી નીચેનો ખાલી ડબ્બો ટૅપ કરો અને ઉપર સુધી ભરો.",
    "The top box?": "સૌથી ઉપરનો ડબ્બો?",
    "Which two boxes hold this one up?": "આ ડબ્બો કયા બે ડબ્બા પર ટકેલો છે?",
    "A shorter adding tower. This one starts with 8, 5 and 7. Climb to the top box.": "હવે એક નાનો સરવાળાનો મિનાર છે. તેમાં નીચે 8, 5 અને 7 છે. ઉપરના ડબ્બા સુધી ચઢો.",
    "Look at the two boxes right under it.": "તેની બરાબર નીચેના બે ડબ્બા જુઓ.",
    "Four numbers start this one: 14, 16, 20 and 5. Every gap still shows a plus. Build it to the top.": "આમાં ચાર સંખ્યાઓથી શરૂઆત થાય છે: 14, 16, 20 અને 5. દરેક બે ડબ્બા વચ્ચે હજી સરવાળાનું ચિહ્ન છે. તેને ઉપર સુધી બનાવો.",
    "Add the pair under the box you opened.": "જે ડબ્બો ખોલ્યો છે તેની નીચેના બે ડબ્બા ઉમેરો.",

    "A tower that multiplies": "ગુણાકાર કરતો મિનાર",
    "Same tower, same pairs. Only the sign in the gaps has changed.": "એ જ મિનાર, એ જ બે-બે ડબ્બા. બસ વચ્ચેનું ચિહ્ન બદલાયું છે.",
    "A gap with a times sign means multiply those two.": "જ્યાં ગુણાકારનું ચિહ્ન હોય ત્યાં તે બે ડબ્બાનો ગુણાકાર કરો.",
    "Take the pair below, one box at a time.": "નીચેના બે ડબ્બા લો અને એક-એક કરીને ડબ્બો ભરો.",
    "A multiplying tower keeps the same shape, and each box is the product of the two below.": "ગુણાકારવાળા મિનારનો આકાર એ જ રહે છે. દરેક ડબ્બો નીચેના બે ડબ્બાનો ગુણાકાર હોય છે.",
    "You learned: a multiplying tower keeps the same shape and pairs.": "તમે શીખ્યા: ગુણાકારના મિનારમાં આકાર અને બે-બે ડબ્બા એ જ રહે છે.",
    "This tower multiplies. Its bottom row holds 3, 1, 2 and 2. Fill every box up to the top.": "આ ગુણાકારનો મિનાર છે. તેની સૌથી નીચેની હરોળમાં 3, 1, 2 અને 2 છે. ઉપર સુધી દરેક ડબ્બો ભરો.",
    "Every gap here carries a times sign.": "અહીં દરેક બે ડબ્બા વચ્ચે ગુણાકારનું ચિહ્ન છે.",
    "A three wide one now, starting with 2, 5 and 1. Multiply each pair and climb.": "હવે ત્રણ ડબ્બાવાળો મિનાર છે, જે 2, 5 અને 1 થી શરૂ થાય છે. દરેક બે ડબ્બાનો ગુણાકાર કરો અને ઉપર ચઢો.",
    "A number times one stays just as it was.": "કોઈ સંખ્યાને એકથી ગુણો તો તે એવી જ રહે છે.",
    "One box in the bottom row is blank. The row shows 3, a blank and 2, with 12 and 8 above. Find the blank, then the top.": "સૌથી નીચેની હરોળમાં એક ડબ્બો ખાલી છે. હરોળમાં 3, એક ખાલી ડબ્બો અને 2 છે, અને ઉપર 12 અને 8 છે. પહેલાં ખાલી ડબ્બો શોધો, પછી સૌથી ઉપરનો ડબ્બો.",
    "Which number times 3 gives 12?": "કઈ સંખ્યાને 3 થી ગુણતાં 12 મળે?",

    "Checking a tower box by box": "એક-એક ડબ્બો કરીને મિનાર તપાસવો",
    "A filled tower now. Tap each box from the bottom row up and test it against the two below.": "હવે ભરેલો મિનાર છે. નીચેની હરોળથી ઉપર તરફ દરેક ડબ્બો ટૅપ કરો. તેને નીચેના બે ડબ્બા સાથે તપાસો.",
    "Name the two boxes under the one you are testing.": "જે ડબ્બો તપાસી રહ્યા છો, તેની નીચેના બે ડબ્બા ઓળખો.",
    "A single box that does not agree settles the tower.": "એક પણ ડબ્બો મેળ ન ખાય, તો તેનાથી જ મિનારનો નિર્ણય થઈ જાય છે.",
    "Every box gets its turn, and the box that does not agree decides it.": "દરેક ડબ્બાનો વારો આવે છે. જે ડબ્બો મેળ ખાતો નથી, તે જ નિર્ણય કરે છે.",
    "You learned: test every box, not only the top one.": "તમે શીખ્યા: દરેક ડબ્બો તપાસો, ફક્ત સૌથી ઉપરનો જ નહીં.",
    "every box follows": "બધા સાચા",
    "one box breaks it": "એક ખોટો",
    "The bottom row holds 6, 2 and 5. Above them sit 8 and 10, with 18 at the top. Does one sign make every box?": "સૌથી નીચેની હરોળમાં 6, 2 અને 5 છે. તેમની ઉપર 8 અને 10 છે, અને સૌથી ઉપર 18 છે. શું એક જ ચિહ્નથી દરેક ડબ્બો બને છે?",
    "Does one sign make every box?": "શું એક ચિહ્નથી દરેક ડબ્બો બને?",
    "Test the middle boxes before you judge the top.": "સૌથી ઉપરનો નિર્ણય કરતાં પહેલાં વચ્ચેના ડબ્બા તપાસો.",
    "A new tower: 3, 4 and 6 at the bottom, then 7 and 10, then 17. Test every box before you decide.": "નવો મિનાર: નીચે 3, 4 અને 6 છે, પછી 7 અને 10, પછી 17. નિર્ણય કરતાં પહેલાં દરેક ડબ્બો તપાસો.",
    "The same test?": "એ જ તપાસ?",
    "Add each pair and see whether the box agrees.": "દરેક બે ડબ્બા ઉમેરો અને જુઓ કે ઉપરનો ડબ્બો મેળ ખાય છે કે નહીં.",
    "adding": "સરવાળો",
    "multiplying": "ગુણાકાર",
    "every box multiplies": "દરેક ડબ્બો ગુણાકારથી બને છે",
    "This one holds 2, 3 and 4 at the bottom, then 6 and 12, then 72. Which sign makes every box?": "આમાં નીચે 2, 3 અને 4 છે, પછી 6 અને 12, પછી 72. કયું ચિહ્ન દરેક ડબ્બો બનાવે છે?",
    "Which sign works?": "કયું ચિહ્ન ચાલશે?",
    "Try the bottom pair with each sign in turn.": "નીચેના બે ડબ્બા પર વારાફરતી દરેક ચિહ્ન અજમાવો.",

    "One operation all the way up": "ઉપર સુધી એક જ ચિહ્ન",
    "A correct tower keeps one sign from the bottom row to the top. Try each sign in turn.": "સાચા મિનારમાં નીચેની હરોળથી ઉપર સુધી એક જ ચિહ્ન રહે છે. વારાફરતી દરેક ચિહ્ન અજમાવો.",
    "Tap the sign key at the foot to test the other sign.": "નીચેના ચિહ્નવાળા બટનને ટૅપ કરીને બીજું ચિહ્ન તપાસો.",
    "A tower that changes sign halfway is neither kind.": "જે મિનાર વચ્ચેથી ચિહ્ન બદલે, તે આ બેમાંથી એક પણ પ્રકારનો નથી.",
    "A tower is correct only when one sign works for every box, bottom row to top.": "મિનાર ત્યારે જ સાચો છે, જ્યારે એક જ ચિહ્ન દરેક ડબ્બા માટે ચાલે. તે નીચેથી ઉપર સુધી હોવું જોઈએ.",
    "You learned: a correct tower keeps one sign for every box.": "તમે શીખ્યા: સાચા મિનારમાં દરેક ડબ્બા માટે એક જ ચિહ્ન રહે છે.",
    "one sign works": "એક ચિહ્ન",
    "two signs needed": "બે ચિહ્ન",
    "Here are 5, 1 and 3, with 5 and 3 above, and 8 at the top. Every box works with some sign, but can one sign do all?": "આ છે 5, 1 અને 3, ઉપર 5 અને 3, અને સૌથી ઉપર 8. દરેક ડબ્બો કોઈ ચિહ્નથી બને છે, પણ શું એક ચિહ્ન બધાને બનાવશે?",
    "One sign for every box?": "દરેક ડબ્બા માટે એક ચિહ્ન?",
    "Start at the lowest pair and see which sign fits.": "સૌથી નીચેના બે ડબ્બાથી શરૂ કરો. જુઓ કે કયું ચિહ્ન બંધબેસે છે.",
    "Now 2, 4 and 3 at the bottom, 6 and 7 above, and 42 at the top. Does the top follow the same sign as the rest?": "હવે નીચે 2, 4 અને 3 છે, તેમની ઉપર 6 અને 7, અને સૌથી ઉપર 42. શું સૌથી ઉપરનો ડબ્બો બાકીના જેવા જ ચિહ્નથી બન્યો છે?",
    "Just one sign here?": "અહીં ફક્ત એક ચિહ્ન?",
    "Check the middle row first, then the top box.": "પહેલાં વચ્ચેની હરોળ તપાસો, પછી સૌથી ઉપરનો ડબ્બો.",
    "Your turn to build. The bottom row holds 2, 3 and 5, and every gap shows a times sign. Fill it to the top.": "હવે તમારો વારો, મિનાર બનાવો. નીચેની હરોળમાં 2, 3 અને 5 છે. દરેક બે ડબ્બા વચ્ચે ગુણાકારનું ચિહ્ન છે. તેને ઉપર સુધી ભરો.",
    "Multiply the pair under the box you opened.": "જે ડબ્બો ખોલ્યો છે તેની નીચેના બે ડબ્બાનો ગુણાકાર કરો.",

    "all follow": "બધા સાચા",
    "one breaks": "એક ખોટો",
    "one sign": "એક ચિહ્ન",
    "two signs": "બે ચિહ્ન",
    "boxes filled": "ભરેલા ડબ્બા",
    "boxes checked": "તપાસેલા ડબ્બા",
    "working": "હિસાબ",
    "adds": "ઉમેરો",
    "times": "ગુણો",
  },
};

/* One entry per phase = one mount. (Shapes: BUILD_CARD §4.) */
const PHASES = [
  {
    n: 1,
    concept: "Two neighbours make the box above",
    conceptId: "M1.S2.T4.C12", objectiveIds: ["O5"],
    says: ["Every box rests on two boxes side by side. Here the two are added together."],
    ladder: ["Each box is made from the two that touch it below.", "Work upward from the lowest empty box."],
    closing: "Each box in an adding tower is the sum of the two beneath it.",
    learned: "You learned: each box is the sum of the two boxes under it.",
    traceback: "The tower builds itself again row by row, each pair written in the ledger, ending on the top box.",
    items: [
      /* learn ML1: answer in the plan = 15, 13 and 15, then 28 and 28, then 56 at the top */
      { qid: "M1.S2.T4.C12:ML1", kind: "build", answer: 56, near: 30, winMs: 3400,
        say: "This tower adds. The bottom row holds 6, 9, 4 and 11. Tap the lowest empty box and fill up to the top.",
        ask: "The top box?", miss: "Which two boxes hold this one up?" },
      /* practice 1: answer in the plan = 13 and 12, then 25 at the top */
      { qid: "M1.S2.T4.C12:1", kind: "build", answer: 25, near: 20, winMs: 2800,
        say: "A shorter adding tower. This one starts with 8, 5 and 7. Climb to the top box.",
        ask: "The top box?", miss: "Look at the two boxes right under it." },
      /* practice 2: answer in the plan = 127: the rows above the bottom are 30, 36 and 25, then 66 and 61, then 127 */
      { qid: "M1.S2.T4.C12:2", kind: "build", answer: 127, near: 55, winMs: 3400,
        say: "Four numbers start this one: 14, 16, 20 and 5. Every gap still shows a plus. Build it to the top.",
        ask: "The top box?", miss: "Add the pair under the box you opened." },
    ],
  },
  {
    n: 2,
    concept: "A tower that multiplies",
    conceptId: "M1.S2.T4.C13", objectiveIds: ["O5"],
    says: ["Same tower, same pairs. Only the sign in the gaps has changed."],
    ladder: ["A gap with a times sign means multiply those two.", "Take the pair below, one box at a time."],
    closing: "A multiplying tower keeps the same shape, and each box is the product of the two below.",
    learned: "You learned: a multiplying tower keeps the same shape and pairs.",
    traceback: "Each pair is multiplied again in the ledger, row by row, ending on the top box.",
    items: [
      /* learn ML2: answer in the plan = 3, 2 and 4, then 6 and 8, then 48 at the top */
      /* near: the writeup's error, adding the bottom pair out of habit (3 + 1 = 4) and multiplying above */
      { qid: "M1.S2.T4.C13:ML2", kind: "build", answer: 48, near: 64, winMs: 3400,
        say: "This tower multiplies. Its bottom row holds 3, 1, 2 and 2. Fill every box up to the top.",
        ask: "The top box?", miss: "Every gap here carries a times sign." },
      /* practice 3: answer in the plan = 10 and 5, then 50 at the top */
      { qid: "M1.S2.T4.C13:3", kind: "build", answer: 50, near: 10, winMs: 2800,
        say: "A three wide one now, starting with 2, 5 and 1. Multiply each pair and climb.",
        ask: "The top box?", miss: "A number times one stays just as it was." },
      /* practice 4: answer in the plan = 4, because 3 x 4 = 12 and 4 x 2 = 8, and the top is 12 x 8 = 96 */
      { qid: "M1.S2.T4.C13:4", kind: "build", answer: 96, near: 20, winMs: 3200,
        say: "One box in the bottom row is blank. The row shows 3, a blank and 2, with 12 and 8 above. Find the blank, then the top.",
        ask: "The top box?", miss: "Which number times 3 gives 12?" },
    ],
  },
  {
    n: 3,
    concept: "Checking a tower box by box",
    conceptId: "M1.S2.T4.C14", objectiveIds: ["O6"],
    says: ["A filled tower now. Tap each box from the bottom row up and test it against the two below."],
    ladder: ["Name the two boxes under the one you are testing.", "A single box that does not agree settles the tower."],
    closing: "Every box gets its turn, and the box that does not agree decides it.",
    learned: "You learned: test every box, not only the top one.",
    traceback: "The walk climbs the tower box by box with each sign, writing every pair, and the box that does not agree stays lit.",
    items: [
      /* learn ML3: answer in the plan = No. 8 is 6 + 2 and 18 is 8 + 10, but 10 is 2 x 5 and not 2 + 5 */
      { qid: "M1.S2.T4.C14:ML3", kind: "check", answer: "one breaks", near: "all follow", winMs: 3600,
        choices: [{ id: "all follow", label: "every box follows" }, { id: "one breaks", label: "one box breaks it" }],
        vtext: "one box breaks it",
        say: "The bottom row holds 6, 2 and 5. Above them sit 8 and 10, with 18 at the top. Does one sign make every box?",
        ask: "Does one sign make every box?", miss: "Test the middle boxes before you judge the top." },
      /* practice 5: answer in the plan = Yes. 3 + 4 = 7, 4 + 6 = 10 and 7 + 10 = 17, so every box adds */
      { qid: "M1.S2.T4.C14:5", kind: "check", answer: "all follow", near: "one breaks", winMs: 3200,
        choices: [{ id: "all follow", label: "every box follows" }, { id: "one breaks", label: "one box breaks it" }],
        vtext: "every box follows",
        say: "A new tower: 3, 4 and 6 at the bottom, then 7 and 10, then 17. Test every box before you decide.",
        ask: "The same test?", miss: "Add each pair and see whether the box agrees." },
      /* practice 6: answer in the plan = Multiplying: 2 x 3 = 6, 3 x 4 = 12 and 6 x 12 = 72 */
      { qid: "M1.S2.T4.C14:6", kind: "check", answer: "multiplying", near: "adding", winMs: 3200,
        choices: [{ id: "adding", label: "adding" }, { id: "multiplying", label: "multiplying" }],
        vtext: "every box multiplies",
        say: "This one holds 2, 3 and 4 at the bottom, then 6 and 12, then 72. Which sign makes every box?",
        ask: "Which sign works?", miss: "Try the bottom pair with each sign in turn." },
    ],
  },
  {
    n: 4,
    concept: "One operation all the way up",
    conceptId: "M1.S2.T4.C15", objectiveIds: ["O6"],
    says: ["A correct tower keeps one sign from the bottom row to the top. Try each sign in turn."],
    ladder: ["Tap the sign key at the foot to test the other sign.", "A tower that changes sign halfway is neither kind."],
    closing: "A tower is correct only when one sign works for every box, bottom row to top.",
    learned: "You learned: a correct tower keeps one sign for every box.",
    traceback: "Both walks run the whole tower side by side, and the box each sign cannot make stays lit.",
    items: [
      /* learn ML4: answer in the plan = No. The middle boxes multiply, but the top adds, 5 + 3 = 8 */
      { qid: "M1.S2.T4.C15:ML4", kind: "check", answer: "two signs", near: "one sign", winMs: 3600,
        choices: [{ id: "one sign", label: "one sign works" }, { id: "two signs", label: "two signs needed" }],
        vtext: "two signs needed",
        say: "Here are 5, 1 and 3, with 5 and 3 above, and 8 at the top. Every box works with some sign, but can one sign do all?",
        ask: "One sign for every box?", miss: "Start at the lowest pair and see which sign fits." },
      /* practice 7: answer in the plan = No. The middle row adds, but the top multiplies, 6 x 7 = 42 */
      { qid: "M1.S2.T4.C15:7", kind: "check", answer: "two signs", near: "one sign", winMs: 3200,
        choices: [{ id: "one sign", label: "one sign works" }, { id: "two signs", label: "two signs needed" }],
        vtext: "two signs needed",
        say: "Now 2, 4 and 3 at the bottom, 6 and 7 above, and 42 at the top. Does the top follow the same sign as the rest?",
        ask: "Just one sign here?", miss: "Check the middle row first, then the top box." },
      /* practice 8: answer in the plan = 6 and 15, then 90 at the top, because 2 x 3 = 6, 3 x 5 = 15 and 6 x 15 = 90 */
      { qid: "M1.S2.T4.C15:8", kind: "build", answer: 90, near: 30, winMs: 3000,
        say: "Your turn to build. The bottom row holds 2, 3 and 5, and every gap shows a times sign. Fill it to the top.",
        ask: "The top box?", miss: "Multiply the pair under the box you opened." },
    ],
  },
];

/* The towers, sizes and targets the working area needs (they go into the sidecar too).
   rows[0] is the bottom row; rows[r][c] rests on rows[r-1][c] and rows[r-1][c+1].
   show: which cells stand filled when the question opens (a build tower fills the rest). */
const MODEL = {
  box: { w: 130, h: 72, gx: 28, gy: 14 },
  baseX: 36, baseY: 364, shift: 79, pitch: 86,
  ledger: { x: 810, y: 20, w: 268, h: 416 },
  foot: { x: 36, y: 448, w: 190, h: 72 },
  towers: {
    "M1.S2.T4.C12:ML1": { kind: "build", op: "add", rows: [[6, 9, 4, 11], [15, 13, 15], [28, 28], [56]] },
    "M1.S2.T4.C12:1": { kind: "build", op: "add", rows: [[8, 5, 7], [13, 12], [25]] },
    "M1.S2.T4.C12:2": { kind: "build", op: "add", rows: [[14, 16, 20, 5], [30, 36, 25], [66, 61], [127]] },
    "M1.S2.T4.C13:ML2": { kind: "build", op: "mul", rows: [[3, 1, 2, 2], [3, 2, 4], [6, 8], [48]] },
    "M1.S2.T4.C13:3": { kind: "build", op: "mul", rows: [[2, 5, 1], [10, 5], [50]] },
    "M1.S2.T4.C13:4": { kind: "build", op: "mul", rows: [[3, 4, 2], [12, 8], [96]],
      show: [[true, false, true], [true, true], [false]] },
    "M1.S2.T4.C14:ML3": { kind: "check", rows: [[6, 2, 5], [8, 10], [18]] },
    "M1.S2.T4.C14:5": { kind: "check", rows: [[3, 4, 6], [7, 10], [17]] },
    "M1.S2.T4.C14:6": { kind: "check", rows: [[2, 3, 4], [6, 12], [72]] },
    "M1.S2.T4.C15:ML4": { kind: "check", rows: [[5, 1, 3], [5, 3], [8]] },
    "M1.S2.T4.C15:7": { kind: "check", rows: [[2, 4, 3], [6, 7], [42]] },
    "M1.S2.T4.C15:8": { kind: "build", op: "mul", rows: [[2, 3, 5], [6, 15], [90]] },
  },
  /* Free play takes the child's own bottom row. max keeps a multiplying tower inside its boxes and
     inside the times tables a class 4 child knows: 12 x 12 x 12 x 12 tops out at 20,736, six digits
     with its comma, which still reads at the type floor in a 130 box. */
  free: { base: [2, 3, 4], op: "add", max: 12 },
};

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

const twrApply = (op: string, a: number, b: number) => (op === "mul" ? a * b : a + b);
/* the grid a bottom row makes under one sign (used by Work and by Free play) */
const twrGrid = (base: number[], op: string) => {
  const rows = [base.slice()];
  while (rows[rows.length - 1].length > 1) {
    const r = rows[rows.length - 1], up = [];
    for (let c = 0; c + 1 < r.length; c++) up.push(twrApply(op, r[c], r[c + 1]));
    rows.push(up);
  }
  return rows;
};
/* which cells a sign cannot make from the two beneath them, in a tower that is already printed */
const twrBreaks = (rows: number[][], op: string) => {
  const out: string[] = [];
  for (let r = 1; r < rows.length; r++) for (let c = 0; c < rows[r].length; c++)
    if (twrApply(op, rows[r - 1][c], rows[r - 1][c + 1]) !== rows[r][c]) out.push(r + "," + c);
  return out;
};
const twrShow = (t: any) => t.show || t.rows.map((row: number[], r: number) => row.map(() => t.kind === "check" || r === 0));
/* the cells a build tower leaves for the child, lowest row first, left to right (the last one is asked) */
const twrOrder = (t: any) => {
  const show = twrShow(t), out: any[] = [];
  for (let r = 0; r < t.rows.length; r++) for (let c = 0; c < t.rows[r].length; c++) if (!show[r][c]) out.push({ r, c });
  return out;
};
/* the walk's order in a printed tower: every box above the bottom row, bottom up */
const twrWalk = (t: any) => {
  const out: any[] = [];
  for (let r = 1; r < t.rows.length; r++) for (let c = 0; c < t.rows[r].length; c++) out.push({ r, c });
  return out;
};
const twrNum = (v: any) => (typeof v === "number" && v >= 1000 ? indian(v) : String(v));

/* judge: is this value right for this item? (numbers compare as numbers, verdicts as words) */
const judge = (item: any, v: any) => {
  if (typeof item.answer === "number") return leadNumber(v) === item.answer;
  return String(v).trim().toLowerCase() === String(item.answer).trim().toLowerCase();
};
/* oracle: every answer re-derived by a second route that shares no code with judge or Work.
   A build tower is folded up from its bottom row with plain arithmetic; a printed tower is tested
   sign by sign, and the verdict is read off which sign (if any) makes every box. */
const oracle = () => {
  const fold = (base: number[], mul: boolean) => {
    let row = base.slice();
    while (row.length > 1) {
      const up = [];
      for (let i = 0; i + 1 < row.length; i++) up.push(mul ? row[i] * row[i + 1] : row[i] + row[i + 1]);
      row = up;
    }
    return row[0];
  };
  const clean = (rows: number[][], mul: boolean) => {
    for (let r = 1; r < rows.length; r++) for (let c = 0; c < rows[r].length; c++) {
      const a = rows[r - 1][c], b = rows[r - 1][c + 1];
      if ((mul ? a * b : a + b) !== rows[r][c]) return false;
    }
    return true;
  };
  return PHASES.every((p: any) => p.items.every((it: any) => {
    const t = MODEL.towers[it.qid];
    if (!t) return false;
    /* the printed grid must itself be the tower it claims to be */
    for (let r = 1; r < t.rows.length; r++) if (t.rows[r].length !== t.rows[r - 1].length - 1) return false;
    if (t.kind === "build") {
      if (!clean(t.rows, t.op === "mul")) return false;
      if (fold(t.rows[0], t.op === "mul") !== it.answer) return false;
      const last = twrOrder(t)[twrOrder(t).length - 1];
      return !!last && t.rows[last.r][last.c] === it.answer;
    }
    const plus = clean(t.rows, false), times = clean(t.rows, true);
    const ids = it.choices.map((c: any) => c.id).join("|");
    if (ids === "adding|multiplying") return it.answer === (plus && !times ? "adding" : times && !plus ? "multiplying" : "");
    if (ids === "all follow|one breaks") return it.answer === (plus || times ? "all follow" : "one breaks");
    if (ids === "one sign|two signs") return it.answer === (plus || times ? "one sign" : "two signs");
    return false;
  }));
};
/* the most likely wrong answer (the misconception); judge must reject it */
const nearMiss = (item: any) => (item.near !== undefined ? item.near : typeof item.answer === "number" ? item.answer + 1 : "~");
/* the forms of an answer that no question, hint or ladder line may print */
const answerForms = (item: any) => (typeof item.answer === "number"
  ? [String(item.answer), indian(item.answer), words(item.answer)] : [String(item.answer)]);
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => item.answer;

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => (T.state().stage === "demo" ? HOOK.demo && HOOK.demo() : T.submit(item.answer));
/* the agent's answer() for an item made on the working area: set it as a child would; undefined = type it */
const answer = (item: any, v: any) => (item.pad === "enter" && HOOK.set ? HOOK.set(v) : undefined);
/* the agent's check() before Enter: e.g. drop a token that waits; undefined = press Enter */
const check = () => (HOOK.check ? HOOK.check() : undefined);

/* ── the working area: 1086 x 528, origin at its top-left ──────────────────────────────────── */
function Work({ phase, n, item, index, stage, wrong, typed, captured, api, MODEL, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();
  const B = MODEL.box;

  /* Enter goes to the runtime: a number in the slot answers, a choice key answers */
  api.onEnter(null);

  const free = stage === "free";
  const tower = free ? null : MODEL.towers[item.qid];
  const kind = free ? "free" : tower ? tower.kind : "build";
  const keyOf = free ? "free" : n + ":" + index;

  const fresh = (kk: string) => ({
    key: kk,
    base: MODEL.free.base.slice(),
    op: free ? MODEL.free.op : tower && tower.op ? tower.op : "add",
    vals: {} as any, open: null as any, typing: "",
    demo: null as any, demoAt: null as any,
    wn: { add: 0, mul: 0 } as any, ws: "add", reveal: false, done: false,
  });
  const [st, setSt] = useState<any>(() => fresh(keyOf));
  const S = st.key === keyOf ? st : fresh(keyOf);
  useEffect(() => { if (st.key !== keyOf) setSt(fresh(keyOf)); }, [keyOf]);
  const put = (patch: any) => setSt((s: any) => ({ ...(s.key === keyOf ? s : fresh(keyOf)), ...patch, key: keyOf }));

  /* the grid on screen: a printed tower as authored, Free play folded from the child's bottom row */
  const rows = free ? twrGrid(S.base, S.op) : tower.rows;
  /* given = printed when the question opens (deep blue); the rest is the child's to make (green) */
  const show = free ? rows.map((row: number[], r: number) => row.map(() => r === 0)) : twrShow(tower);
  const order = free ? twrWalk({ rows }) : kind === "build" ? twrOrder(tower) : twrWalk(tower);
  const target: any = kind === "build" && order.length ? order[order.length - 1] : null;
  const cellKey = (c: any) => c.r + "," + c.c;
  const sign = S.op === "mul" ? "mul" : "add";
  /* which sign fits a printed tower best (fewest boxes it cannot make): the walk that corrects it */
  const best = kind === "check"
    ? (twrBreaks(rows, "add").length <= twrBreaks(rows, "mul").length ? "add" : "mul") : sign;
  const breaks = kind === "check" && S.done ? twrBreaks(rows, best) : [];

  /* a cell's value on screen: printed, filled by the child, or standing on the correction layer */
  const valueAt = (r: number, c: number) => {
    if (free || show[r][c]) return rows[r][c];
    const k = r + "," + c;
    if (S.vals[k] !== undefined) return S.vals[k];
    if (S.demo && S.demo[k] !== undefined) return S.demo[k];
    return null;
  };
  const nextFill = kind === "build" ? order.find((c: any) => S.vals[cellKey(c)] === undefined) : null;
  const nextWalk = kind === "check" ? order[S.wn[sign]] : null;

  const clearDemo = () => { if (S.demo) put({ demo: null, demoAt: null }); };
  /* the correction stands on its own layer and clears the moment the child writes again */
  const lastTyped = useRef(typed);
  useEffect(() => {
    if (lastTyped.current !== typed) { lastTyped.current = typed; if (S.demo) put({ demo: null, demoAt: null }); }
  }, [typed]);

  /* ── the child's acts ───────────────────────────────────────────────────────────────── */
  /* the pad is lent to the open box; the runtime holds one function, so it is sent through a ref
     and always runs against this render's tower */
  const keyRef = useRef<any>(null);
  keyRef.current = (k: string) => {
    const cell = S.open;
    if (!cell) { api.capture(null); return; }
    if (k === "clear") { put({ typing: "" }); return; }
    if (k === "back") { put({ typing: String(S.typing).slice(0, -1) }); return; }
    if (k === "enter") {
      if (!S.typing) { api.capture(null); put({ open: null }); return; }
      const v = Number(S.typing);
      if (free) {
        const b = S.base.slice();
        b[cell.c] = Math.max(1, Math.min(v, MODEL.free.max));
        api.capture(null); api.sfx.tick();
        put({ base: b, open: null, typing: "" });
        return;
      }
      if (target && cell.r === target.r && cell.c === target.c) {
        api.capture(null);
        put({ open: null, typing: "", demo: null, demoAt: null });
        api.submit(v);
        return;
      }
      if (v === rows[cell.r][cell.c]) {
        api.capture(null); api.sfx.tick();
        put({ vals: { ...S.vals, [cellKey(cell)]: v }, open: null, typing: "" });
      } else { api.sfx.wrong(); put({ typing: "" }); }
      return;
    }
    if (!/^[0-9]$/.test(k)) return;
    const next = String(S.typing) + k;
    /* Free play never lets a bottom number past the cap, so the tower it folds always fits its boxes */
    if (free) { if (Number(next) >= 1 && Number(next) <= MODEL.free.max) put({ typing: next }); return; }
    put({ typing: String(S.typing).length >= 4 ? String(S.typing) : next });
  };
  const padKey = (k: string) => keyRef.current && keyRef.current(k);

  const openBox = (cell: any) => {
    clearDemo();
    put({ open: cell, typing: "" });
    api.capture(padKey);
  };
  const stepWalk = () => {
    clearDemo();
    api.sfx.tick();
    put({ wn: { ...S.wn, [sign]: S.wn[sign] + 1 } });
  };
  const flipSign = () => {
    clearDemo();
    if (S.open) api.capture(null);
    api.sfx.tick();
    put({ op: sign === "add" ? "mul" : "add", open: null, typing: "" });
  };

  /* ── winning: the tower finishes itself, the walks finish their ledger ──────────────── */
  useEffect(() => {
    if (stage !== "win") return;
    if (kind === "check") { put({ wn: { add: order.length, mul: order.length }, reveal: true, done: true, demo: null }); return; }
    const left = order.filter((c: any) => S.vals[cellKey(c)] === undefined);
    if (!left.length) return;
    const got: any = {};
    tl.run(left.map((c: any) => [420, () => { got[cellKey(c)] = rows[c.r][c.c]; put({ vals: { ...S.vals, ...got } }); }]));
  }, [stage, index]);

  /* ── the traceback: the maths redrawn, ending on the whole right answer ─────────────── */
  useEffect(() => {
    if (!wrong || stage !== "ask") return;
    api.lock(true);
    if (S.open) api.capture(null);
    if (kind === "build") {
      const layer: any = {};
      const steps: any[] = [[420, () => put({ open: null, typing: "", demo: {}, demoAt: null })]];
      order.forEach((c: any) => steps.push([560, () => {
        layer[cellKey(c)] = rows[c.r][c.c];
        put({ demo: { ...layer }, demoAt: cellKey(c) });
      }]));
      steps.push([700, () => put({ demoAt: null })]);
      tl.run(steps, () => api.lock(false));
      return;
    }
    const first = twrBreaks(rows, "add").length <= twrBreaks(rows, "mul").length ? "add" : "mul";
    const second = first === "add" ? "mul" : "add";
    const steps: any[] = [[420, () => put({ op: first, wn: { add: 0, mul: 0 }, reveal: true, done: false })]];
    for (let k = 1; k <= order.length; k++) steps.push([520, () => put({ op: first, wn: { [first]: k, [second]: 0 } })]);
    steps.push([620, () => put({ op: second })]);
    for (let k = 1; k <= order.length; k++) steps.push([520, () => put({ op: second, wn: { [first]: order.length, [second]: k } })]);
    steps.push([800, () => put({ op: first, done: true })]);
    tl.run(steps, () => api.lock(false));
  }, [wrong]);

  /* what the host and the agent read back (toolApi.getState) */
  const filledCount = rows.reduce((a: number, row: number[], r: number) =>
    a + row.filter((_: number, c: number) => valueAt(r, c) !== null).length, 0);
  const cellCount = rows.reduce((a: number, row: number[]) => a + row.length, 0);
  api.share({
    operation: sign === "mul" ? "multiply" : "add",
    bottomRow: rows[0],
    boxes: filledCount,
    checked: kind === "check" ? S.wn[sign] : 0,
    brokenBoxes: stage === "win" || stage === "idle" ? breaks.length : 0,
    missing: cellCount - filledCount,
    complete: stage === "idle",
  });

  /* ── drawing ───────────────────────────────────────────────────────────────────────── */
  const X = (r: number, c: number) => MODEL.baseX + r * MODEL.shift + c * (B.w + B.gx);
  const Y = (r: number) => MODEL.baseY - r * MODEL.pitch;
  const BLUE = CONTENT.hundred, GREEN = CONTENT.one, AMBER = CONTENT.ten, STEP = CONTENT.pointer, NOTE = CONTENT.bead;

  const Sign = (op: string, cx: number, cy: number, s: number, col: string, kk?: any) => {
    const t = s * 0.26;
    const bar = (a: number, b: number, w: number, h: number) => <rect x={a} y={b} width={w} height={h} rx={t / 2} fill={col} />;
    return (
      <g key={kk} transform={op === "mul" ? `rotate(45 ${cx} ${cy})` : undefined}>
        {bar(cx - s / 2, cy - t / 2, s, t)}
        {bar(cx - t / 2, cy - s / 2, t, s)}
      </g>
    );
  };

  /* the rest lights: the two boxes the box in play stands on (or, for a blank in the bottom row,
     its neighbour and the box it helps to make) */
  const restOf = (cell: any) => {
    if (!cell) return [];
    if (cell.r > 0) return [{ r: cell.r - 1, c: cell.c }, { r: cell.r - 1, c: cell.c + 1 }];
    const c = cell.c > 0 ? cell.c - 1 : 0;
    return [{ r: 0, c: cell.c > 0 ? c : 1 }, { r: 1, c }];
  };
  const inPlay = S.open
    || (S.demoAt ? { r: Number(S.demoAt.split(",")[0]), c: Number(S.demoAt.split(",")[1]) }
      : kind === "check" && S.wn[sign] > 0 ? order[Math.min(S.wn[sign], order.length) - 1] : null);
  const lit = restOf(inPlay).map(cellKey);

  const boxes: any[] = [];
  const struts: any[] = [];
  const rail: any[] = [];
  for (let r = 0; r < rows.length; r++) {
    for (let c = 0; c < rows[r].length; c++) {
      const x = X(r, c), y = Y(r), k = r + "," + c;
      const v = valueAt(r, c);
      const isOpen = S.open && S.open.r === r && S.open.c === c;
      const onDemo = !!(S.demo && S.demo[k] !== undefined);
      const broken = breaks.indexOf(k) >= 0;
      const atNow = !!(inPlay && inPlay.r === r && inPlay.c === c);
      const madeOk = kind === "check" && S.done && r > 0 && !broken;
      const hue = broken ? NOTE : free ? (r === 0 ? BLUE : GREEN) : show[r][c] ? BLUE : GREEN;
      const face = v === null ? "#FFFFFF" : tint(hue, 0.84);
      const edge = v === null ? (isOpen ? C.accent : C.dim) : hue;
      const shown = v === null ? "" : twrNum(v);
      boxes.push(
        <g key={"b" + k}>
          <rect x={x} y={y} width={B.w} height={B.h} rx={RAD.piece + 4} fill={face} stroke={edge}
            strokeWidth={isOpen ? 5 : 3} strokeDasharray={v === null && !isOpen ? "9 9" : undefined} filter="url(#fShadowSoft)" />
          {lit.indexOf(k) >= 0 && <rect x={x - 6} y={y - 6} width={B.w + 12} height={B.h + 12} rx={RAD.piece + 9}
            fill="none" stroke={AMBER} strokeWidth={5} />}
          {(atNow || madeOk) && !broken && <rect x={x - 6} y={y - 6} width={B.w + 12} height={B.h + 12} rx={RAD.piece + 9}
            fill="none" stroke={madeOk && !atNow ? GREEN : STEP} strokeWidth={4} />}
          {v !== null && !isOpen && <text x={x + B.w / 2} y={y + B.h / 2 + 15} textAnchor="middle"
            fontSize={shown.length > 4 ? T.micro : shown.length > 2 ? T.prompt : T.speech} fontWeight={700}
            fill={onDemo ? shade(GREEN, 0.25) : shade(hue, 0.25)}>{shown}</text>}
          {isOpen && <text x={x + B.w / 2 - (S.typing ? 8 : 0)} y={y + B.h / 2 + 15} textAnchor="middle"
            fontSize={T.speech} fontWeight={700} fill={shade(GREEN, 0.25)}>{S.typing}</text>}
          {isOpen && <rect className="c4-caret" x={x + B.w / 2 + String(S.typing).length * 13 - 6} y={y + 16}
            width={4} height={40} rx={2} fill={C.accent} />}
        </g>
      );
      if (r > 0) struts.push(
        <g key={"s" + k}>
          <rect x={x + 20} y={y + B.h} width={5} height={B.gy} fill={atNow ? STEP : C.ink} />
          <rect x={x + B.w - 25} y={y + B.h} width={5} height={B.gy} fill={atNow ? STEP : C.ink} />
        </g>
      );
      if (c + 1 < rows[r].length) rail.push(Sign(sign, x + B.w + B.gx / 2, y + B.h / 2, 22, STEP, "r" + k));
    }
  }

  /* the ledger: the working, one line to a box. One column while a tower is built, one column
     a sign while a printed tower is checked. A line reads its pair only until the answer is in. */
  const L = MODEL.ledger;
  const lineOf = (cell: any, op: string, full: boolean) => {
    const g = op === "mul" ? "×" : "+";
    if (cell.r > 0) {
      const a = rows[cell.r - 1][cell.c], b = rows[cell.r - 1][cell.c + 1];
      return twrNum(a) + g + twrNum(b) + (full ? "=" + twrNum(twrApply(op, a, b)) : "");
    }
    const c = cell.c > 0 ? cell.c - 1 : 0;
    const a = rows[0][cell.c > 0 ? c : 1], out = rows[1][c];
    return twrNum(a) + g + (full ? twrNum(rows[0][cell.c]) : "?") + "=" + twrNum(out);
  };
  const ledgerLines: any[] = [];
  if (kind === "check") {
    ["add", "mul"].forEach((op, j) => {
      const cx = L.x + 68 + j * 134;
      ledgerLines.push(<g key={"h" + op}>{Sign(op, cx, L.y + 84, 26, shade(STEP, 0.2))}</g>);
      order.slice(0, S.wn[op]).forEach((cell: any, i: number) => ledgerLines.push(
        <text key={"l" + op + i} x={cx} y={L.y + 144 + i * 46} textAnchor="middle" fontSize={T.label} fontWeight={600}
          fill={C.ink}>{lineOf(cell, op, S.reveal)}</text>
      ));
    });
  } else {
    const shown = order.filter((c: any) => valueAt(c.r, c.c) !== null || (S.open && S.open.r === c.r && S.open.c === c.c));
    ledgerLines.push(<g key="hh">{Sign(sign, L.x + L.w / 2, L.y + 84, 26, shade(STEP, 0.2))}</g>);
    shown.forEach((cell: any, i: number) => ledgerLines.push(
      <text key={"l" + i} x={L.x + L.w / 2} y={L.y + 144 + i * 46} textAnchor="middle" fontSize={T.label} fontWeight={600}
        fill={C.ink}>{lineOf(cell, sign, valueAt(cell.r, cell.c) !== null)}</text>
    ));
  }

  /* the foot: a fixed sign plate while a tower is built, a sign key while a tower is checked */
  const F = MODEL.foot;
  const signWord = tx(sign === "mul" ? "times" : "adds");
  const verdict = kind === "check" && S.done ? tx(item.vtext) : null;

  const invite = free ? null
    : kind === "build" && nextFill && !S.open && !S.demo ? nextFill
    : kind === "check" && nextWalk && !S.done ? nextWalk : null;

  return (
    <g>
      <g data-zone="runs">
        <rect x={2} y={-92} width={326} height={72} rx={RAD.panel} fill="url(#gPanel)" stroke={C.rule} strokeWidth={2} />
        <text x={18} y={-44} fontSize={T.micro} fontWeight={600} fill={mix(C.ink, C.panel, 0.18)}>
          {tx(kind === "check" ? "boxes checked" : "boxes filled")}
        </text>
        <text x={312} y={-44} textAnchor="end" fontSize={T.label} fontWeight={700} fill={C.ink}>
          {kind === "check" ? S.wn[sign] + " / " + order.length : filledCount + " / " + cellCount}
        </text>
      </g>

      <rect x={L.x} y={L.y} width={L.w} height={L.h} rx={RAD.panel} fill={tint(C.panel, 0.5)} stroke={C.rule} strokeWidth={2} />
      <text x={L.x + L.w / 2} y={L.y + 42} textAnchor="middle" fontSize={T.micro} fontWeight={600}
        fill={mix(C.ink, C.panel, 0.3)}>{tx("working")}</text>
      {ledgerLines}

      {struts}
      {boxes}
      {rail}

      {kind === "check" || free ? (
        <Key id="sign-key" label={free ? "Change the sign" : "Check with the other sign"} x={F.x} y={F.y} w={F.w} h={F.h} C={C} onClick={flipSign}>
          {Sign(sign, -52, 0, 30, shade(STEP, 0.2))}
          <text x={18} y={12} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={C.ink}>{signWord}</text>
        </Key>
      ) : (
        <g>
          <rect x={F.x} y={F.y} width={F.w} height={F.h} rx={RAD.key} fill={tint(C.panel, 0.4)} stroke={C.rule} strokeWidth={2} />
          {Sign(sign, F.x + 43, F.y + F.h / 2, 30, shade(STEP, 0.2))}
          <text x={F.x + 113} y={F.y + F.h / 2 + 12} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={C.ink}>{signWord}</text>
        </g>
      )}

      {verdict && <text x={252} y={F.y + F.h / 2 + 12} fontSize={T.label} fontWeight={700} fill={shade(NOTE, 0.3)}>{verdict}</text>}

      {/* the live boxes: the lowest empty box while a tower is built, the next box of the walk while
          one is checked. A box holding the pad is not a control, so Enter still reaches the window. */}
      {free && rows[0].map((_: number, c: number) => (S.open && S.open.c === c && S.open.r === 0 ? null : (
        <Hit key={"f" + c} id={"box-0-" + c} x={X(0, c)} y={Y(0)} w={B.w} h={B.h}
          label={"Bottom box " + (c + 1)} onPress={() => openBox({ r: 0, c })} />
      )))}
      {!free && kind === "build" && nextFill && !S.open && (
        <Hit id={"box-" + nextFill.r + "-" + nextFill.c} x={X(nextFill.r, nextFill.c)} y={Y(nextFill.r)} w={B.w} h={B.h}
          label="The empty box" onPress={() => openBox(nextFill)} />
      )}
      {!free && kind === "check" && nextWalk && (
        <Hit id={"box-" + nextWalk.r + "-" + nextWalk.c} x={X(nextWalk.r, nextWalk.c)} y={Y(nextWalk.r)} w={B.w} h={B.h}
          label="Test this box" onPress={stepWalk} />
      )}
      {invite && <Invite x={X(invite.r, invite.c) + B.w / 2} y={Y(invite.r) + B.h / 2} r={54} C={C} />}
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase: the bottom row the
   child worked on, in its own numbers, with the answer resting on it. A built tower ends on the top
   box; a checked tower ends on the verdict the child gave. Struts join the two, as on the stage. */
function Thumb({ result, C, w, h, lang = "en", tx: tr = (v: any) => v }: any) {
  const last = result && result.last ? result.last : null;
  const v = last ? last.value : null;
  if (v === null || v === undefined) return null;
  const base: number[] = (last.shared && Array.isArray(last.shared.bottomRow) ? last.shared.bottomRow : []).slice(0, 4);
  const text = tr(twrNum(v));
  const num = /^[\d,]+$/.test(text);
  /* the answer, resting on the row: a box for a number, a wider pill for a verdict in words */
  const tw = Math.min(w - 16, Math.max(62, text.length * 16 + 30));
  const tx = (w - tw) / 2, ty = 4, bh = 30, by = h - bh - 4;
  const gap = 6, n = base.length;
  const bw = n ? Math.min(62, (w - 8 - (n - 1) * gap) / n) : 62;
  const row = n * bw + (n - 1) * gap, rx0 = (w - row) / 2;
  const BLUE = CONTENT.hundred, GREEN = CONTENT.one;
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      {!!n && [w / 2 - 26, w / 2 + 22].map((sx, k) => (
        <rect key={"t" + k} x={sx} y={ty + bh} width={4} height={by - ty - bh} fill={C.ink} />
      ))}
      <rect x={tx} y={ty} width={tw} height={bh} rx={8} fill={num ? tint(GREEN, 0.84) : tint(C.panel, 0.3)}
        stroke={num ? GREEN : C.rule} strokeWidth={2} />
      <text x={w / 2} y={ty + bh / 2 + 9} textAnchor="middle" fontSize={T.micro} fontWeight={700}
        fill={num ? shade(GREEN, 0.25) : C.ink}>{text}</text>
      {base.map((val: number, c: number) => (
        <g key={"b" + c}>
          <rect x={rx0 + c * (bw + gap)} y={by} width={bw} height={bh} rx={8}
            fill={tint(BLUE, 0.84)} stroke={BLUE} strokeWidth={2} />
          <text x={rx0 + c * (bw + gap) + bw / 2} y={by + bh / 2 + 9} textAnchor="middle" fontSize={T.micro}
            fontWeight={700} fill={shade(BLUE, 0.25)}>{twrNum(val)}</text>
        </g>
      ))}
    </g>
  );
}

function TowerBuilder(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, fitHost: () => null }} />
  );
}

export default TowerBuilder;
