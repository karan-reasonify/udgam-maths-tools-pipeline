/* ═══ M2.S4.T6.C20.2D1 · price_multiplier · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists: header + its three controls, canvas, slot + pad, bubble + mascot,
   phase dots (user / AI mode), window.toolApi, sounds, the synced voice, scoring, the events,
   idle and restart. NO imports in this file; only the five host hooks. Follow docs/LAYOUT.md.
   Edit, never rewrite. Built by `node cli.mjs scaffold`; concepts are verbatim (check compares them).

   The picture: a row of the things bought, a multiplying frame (price over the count, a carry circle
   over the rupees, an answer line with its dot waiting), a paise box with a strip ruled into a
   hundred, and in phase 4 a two-step card over a change bench. The child taps the paise of the price
   once for each thing: that thing lights and its paise pour onto the strip; every full strip rolls
   up into one rupee in the carry circle. The rupees times the count, plus the carry, are the child's
   to find and type (the pad's point key, two places after the dot). Phase 2: the count is copied
   under the paise with a dot; the child lifts it into its own box and the dot falls away. Phase 4:
   the cost is a step, set under the money held; the child breaks a rupee into a hundred paise and
   types the change or the money left. */

const TOOL_ID = "price_multiplier";
const MEDIA_ID = "M2.S4.T6.C20.2D1";
const TOOL_NAME = "Price Multiplier";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
const VOICE = {"rate":0.92,"pitch":1.06};

/* spoken before phase 1's teach lines only (the plan's opening voice line) */
const OPENING = ["A row of things and the price of one. What does the whole row cost?"];
/* the whole-tool line: spoken on the summary page */
const FINISH_LINE = "Every hundred paise carried, every count kept free of a dot, and every question answered as it asked.";
/* said when the child opens Free play from the summary page (the plan's free-play voice line) */
const FREE_LINE = "Free play. Any price and any count, with the carry circle and the change bench open.";

/* Hindi and Gujarati (docs/PATTERNS.md §11): every line above and below stays English, exactly as the checks
   read it; this table is keyed by that English, and the runtime looks each spoken or drawn line up in it.
   Fill it AFTER the English is final and reviewed (`node cli.mjs voice` lists every line still missing),
   then bake the voice. Empty = the tool runs in English only.
   Chapter conventions: spoken money in words ("23 रुपये 50 पैसे", digits kept, the runtime spells them); drawn
   money keeps its digits and point with the rupee sign "₹" for "Rs"; price कीमत / કિંમત (of one thing), cost
   खर्च / ખર્ચ (of several), change बाकी पैसे / બાકીના પૈસા, money left बचे हुए पैसे / વધેલા પૈસા, count गिनती /
   સંખ્યા, carry हासिल / વદી, dot बिंदु / બિંદુ, row पंक्ति / હાર. A first draft for a native speaker. */
const TR: any = {
  hi: {
    "Price Multiplier": "कीमत का गुणा",
    "A row of things and the price of one. What does the whole row cost?": "चीज़ों की एक पंक्ति, और एक चीज़ की कीमत। पूरी पंक्ति का खर्च कितना है?",
    "Every hundred paise carried, every count kept free of a dot, and every question answered as it asked.": "हर सौ पैसे हासिल बने, हर गिनती बिना बिंदु के रही। हर प्रश्न का उत्तर वैसा ही दिया, जैसा पूछा गया।",
    "Free play. Any price and any count, with the carry circle and the change bench open.": "मुक्त खेल। कोई भी कीमत और गिनती लो, हासिल का गोला और हिसाब की मेज़ खुले हैं।",
    /* phase 1 */
    "Paise first, then rupees": "पहले पैसे, फिर रुपये",
    "Multiply the paise first. How many whole rupees do they make?": "पहले पैसों का गुणा करो। उनसे कितने पूरे रुपये बनते हैं?",
    "Have the rupees been multiplied, and the carry added?": "क्या रुपयों का गुणा हुआ, और हासिल जोड़ा गया?",
    "Try Rs 1.50 times 2 first. The paise make a hundred, and a hundred paise is one rupee.": "पहले 1 रुपया 50 पैसे गुणा 2 करके देखो। पैसे सौ बनते हैं, और सौ पैसे एक रुपया है।",
    "Multiply the paise first, carry each hundred paise as one rupee, then multiply the rupees and add the carry.": "पहले पैसों का गुणा करो, हर सौ पैसे का एक रुपया हासिल लो। फिर रुपयों का गुणा करके हासिल जोड़ो।",
    "You learned: multiply the paise first and carry each hundred as a rupee.": "तुमने सीखा: पहले पैसों का गुणा, हर सौ पैसे का एक रुपया हासिल।",
    "One notebook costs Rs 23.50. Find the cost of all 6 notebooks. Tap the paise once for each notebook. Write the cost with two places after the dot.":
      "एक कॉपी की कीमत 23 रुपये 50 पैसे है। सभी 6 कॉपियों का खर्च निकालो। हर कॉपी के लिए पैसों पर एक बार टैप करो। खर्च में बिंदु के बाद दो अंक लिखो।",
    "Cost of 6 notebooks?": "6 कॉपियों का खर्च?",
    "What do the paise make when multiplied?": "गुणा करने पर पैसे कितने बनते हैं?",
    "One pencil costs Rs 7.50. What do 4 pencils cost? Keep two places for the paise.": "एक पेंसिल की कीमत 7 रुपये 50 पैसे है। 4 पेंसिलों का खर्च कितना है? पैसों के लिए दो अंक रखो।",
    "Cost of 4 pencils?": "4 पेंसिलों का खर्च?",
    "Do the paise of 4 pencils stay at 50 paise?": "क्या 4 पेंसिलों के पैसे 50 पैसे ही रहते हैं?",
    "One ribbon costs Rs 12.25. How much for 4 ribbons?": "एक रिबन की कीमत 12 रुपये 25 पैसे है। 4 रिबन कितने के होंगे?",
    "Cost of 4 ribbons?": "4 रिबन का खर्च?",
    "Do the paise of 4 ribbons fill a whole strip?": "क्या 4 रिबन के पैसे पूरी पट्टी भरते हैं?",
    /* phase 2 */
    "The number multiplied by is a count": "जिससे गुणा करते हैं, वह गिनती है",
    "What does this number count? Does it have any paise?": "यह संख्या क्या गिनती है? क्या इसमें कोई पैसे हैं?",
    "Look at the row. Do you count things with a dot?": "पंक्ति को देखो। क्या चीज़ें बिंदु लगाकर गिनते हैं?",
    "With 2 things, the price is simply taken twice.": "2 चीज़ों में कीमत बस दो बार ली जाती है।",
    "The number multiplied by counts things, so it has no dot and no paise.": "जिससे गुणा करते हैं, वह चीज़ें गिनती है। इसलिए उसमें न बिंदु है, न पैसे।",
    "You learned: a count of things has no dot and no paise.": "तुमने सीखा: चीज़ों की गिनती में न बिंदु होता है, न पैसे।",
    "Each pen costs Rs 14.50. A child wrote the 9 under the paise, with a dot in front. Is that where the 9 belongs? Then find what the 9 pens cost. The paise take two places.":
      "हर पेन की कीमत 14 रुपये 50 पैसे है। एक बच्चे ने 9 को पैसों के नीचे, आगे बिंदु लगाकर लिखा। क्या 9 की जगह वहीं है? फिर 9 पेनों का खर्च निकालो। पैसे दो अंकों में लिखो।",
    "Cost of 9 pens?": "9 पेनों का खर्च?",
    "Did the 9 multiply the rupees as well as the paise?": "क्या 9 से पैसों के साथ रुपयों का भी गुणा हुआ?",
    "Rs 26.40 is multiplied by 3, to find what 3 books cost. Should the 3 have a dot in front of it? Show it on the frame, then find the cost.":
      "3 किताबों का खर्च जानना है। 26 रुपये 40 पैसे का 3 से गुणा होता है। क्या 3 के आगे बिंदु होना चाहिए? ढाँचे पर दिखाओ, फिर खर्च निकालो।",
    "Cost of 3 books?": "3 किताबों का खर्च?",
    "How much is the 26 taken 3 times?": "26 को 3 बार लेने पर कितना होता है?",
    "Each bottle costs Rs 31.20. Someone put a dot before the 7 and called it 70 paise. What should the 7 be, and what do the bottles cost?":
      "हर बोतल की कीमत 31 रुपये 20 पैसे है। किसी ने 7 के आगे बिंदु लगाकर उसे 70 पैसे कहा। 7 क्या होना चाहिए, और बोतलों का खर्च कितना है?",
    "Cost of 7 bottles?": "7 बोतलों का खर्च?",
    "Count the bottles in the row. How many prices is that?": "पंक्ति में बोतलें गिनो। यह कितनी कीमतें हुईं?",
    /* phase 3 */
    "Paise left over go after the dot": "बचे हुए पैसे बिंदु के बाद",
    "Some paise are left over. Where do they go?": "कुछ पैसे बच जाते हैं। वे कहाँ जाते हैं?",
    "How many are left once the whole hundreds are carried?": "पूरे सैकड़े हासिल लेने के बाद कितने बचते हैं?",
    "Try 5 paise times 3 first. That makes 15 paise, written after the dot as 15.": "पहले 5 पैसे गुणा 3 करके देखो। 15 पैसे बनते हैं, जो बिंदु के बाद 15 लिखे जाते हैं।",
    "Paise left over go after the dot as two digits, and each whole hundred is carried as a rupee.": "बचे हुए पैसे बिंदु के बाद दो अंकों में जाते हैं। हर पूरे सौ का एक रुपया हासिल बनता है।",
    "You learned: paise left over go after the dot, always as two digits.": "तुमने सीखा: बचे पैसे बिंदु के बाद, हमेशा दो अंकों में।",
    "One cup costs Rs 42.35. What do 4 cups cost? Tap the paise once for each cup.": "एक कप की कीमत 42 रुपये 35 पैसे है। 4 कपों का खर्च कितना है? हर कप के लिए पैसों पर एक बार टैप करो।",
    "Cost of 4 cups?": "4 कपों का खर्च?",
    "How many paise did the paise make?": "पैसों का गुणा करके कुल कितने पैसे बने?",
    "One torch costs Rs 85.60. Find the cost of 3 torches.": "एक टॉर्च की कीमत 85 रुपये 60 पैसे है। 3 टॉर्च का खर्च निकालो।",
    "Cost of 3 torches?": "3 टॉर्च का खर्च?",
    "The carry circle holds a rupee. Is it in your rupees?": "हासिल के गोले में एक रुपया है। क्या वह तुम्हारे रुपयों में जुड़ा?",
    "One ball costs Rs 16.35. How much for 3 balls?": "एक गेंद की कीमत 16 रुपये 35 पैसे है। 3 गेंदें कितने की होंगी?",
    "Cost of 3 balls?": "3 गेंदों का खर्च?",
    "Paise take two places. Where does a lone 5 go?": "पैसे दो अंकों में लिखे जाते हैं। अकेला 5 कहाँ जाएगा?",
    /* phase 4 */
    "The cost, then the change": "पहले खर्च, फिर बाकी पैसे",
    "First find the cost. Is the cost what the question asks for?": "पहले खर्च निकालो। क्या प्रश्न खर्च ही पूछ रहा है?",
    "What is the cost, and what is it taken from?": "खर्च कितना है, और उसे किसमें से घटाना है?",
    "Try one thing and one note first. The change is the note less the cost.": "पहले एक चीज़ और एक नोट से देखो। बाकी पैसे यानी नोट में से खर्च घटाओ।",
    "Find the cost first. Then answer what the question asks: the cost, the change or the money left.": "पहले खर्च निकालो। फिर वही बताओ जो प्रश्न पूछे: खर्च, बाकी पैसे या बचे हुए पैसे।",
    "You learned: find the cost first, then the change or the money left.": "तुमने सीखा: पहले खर्च, फिर बाकी पैसे या बचे हुए पैसे।",
    "A child has Rs 700 and buys 5 bags of rice at Rs 118.65 each. How much money is left? Tap the paise for each bag. Write the paise in two places.":
      "एक बच्चे के पास 700 रुपये हैं। वह चावल के 5 थैले खरीदता है। हर थैला 118 रुपये 65 पैसे का है। कितने पैसे बचे? हर थैले के लिए पैसों पर टैप करो। पैसे दो अंकों में लिखो।",
    "How much money is left?": "कितने पैसे बचे?",
    "You found what the bags cost. Does the child still have some money?": "थैलों का खर्च तुमने निकाल लिया। क्या बच्चे के पास अब भी कुछ पैसे हैं?",
    "A child buys 6 boxes of crayons at Rs 64.75 each and pays with a Rs 500 note. How much change comes back?":
      "एक बच्चा क्रेयॉन के 6 डिब्बे खरीदता है। हर डिब्बा 64 रुपये 75 पैसे का है। वह 500 रुपये का नोट देता है। बाकी पैसे कितने वापस मिलेंगे?",
    "How much change comes back?": "बाकी पैसे कितने?",
    "Do the crayons use up the whole note?": "क्या क्रेयॉन में पूरा नोट खर्च हो जाता है?",
    "A child has Rs 450 and is given Rs 300 more, then buys 4 lamps at Rs 162.80 each. What is the child left with after the lamps?":
      "एक बच्चे के पास 450 रुपये हैं। उसे 300 रुपये और मिलते हैं। फिर वह 4 लैंप खरीदता है। हर लैंप 162 रुपये 80 पैसे का है। लैंप खरीदकर उसके पास क्या रह गया?",
    "How much is left?": "कितना बचा?",
    "Did you take the cost from all the money the child had?": "क्या तुमने खर्च, बच्चे के सारे पैसों में से घटाया?",
    /* drawn on the working area, the slot and the summary */
    "Rs": "₹", "p": "पैसे", "paise": "पैसे", "of": "में से", "has": "पास में", "pays": "देता है", "not enough money": "पैसे कम हैं",
  },
  gu: {
    "Price Multiplier": "કિંમતનો ગુણાકાર",
    "A row of things and the price of one. What does the whole row cost?": "વસ્તુઓની એક હાર, અને એક વસ્તુની કિંમત. આખી હારનો ખર્ચ કેટલો?",
    "Every hundred paise carried, every count kept free of a dot, and every question answered as it asked.": "દરેક સો પૈસાની વદી લીધી, દરેક સંખ્યા બિંદુ વગર રાખી. દરેક પ્રશ્નનો જવાબ પૂછ્યો તેવો જ આપ્યો.",
    "Free play. Any price and any count, with the carry circle and the change bench open.": "મુક્ત રમત. કોઈ પણ કિંમત અને સંખ્યા લો, વદીનું વર્તુળ અને હિસાબનું ટેબલ ખુલ્લાં છે.",
    /* phase 1 */
    "Paise first, then rupees": "પહેલાં પૈસા, પછી રૂપિયા",
    "Multiply the paise first. How many whole rupees do they make?": "પહેલાં પૈસાનો ગુણાકાર કરો. તેમાંથી કેટલા આખા રૂપિયા બને?",
    "Have the rupees been multiplied, and the carry added?": "શું રૂપિયાનો ગુણાકાર થયો, અને વદી ઉમેરી?",
    "Try Rs 1.50 times 2 first. The paise make a hundred, and a hundred paise is one rupee.": "પહેલાં 1 રૂપિયો 50 પૈસા ગુણ્યા 2 કરી જુઓ. પૈસા સો થાય, અને સો પૈસા એટલે એક રૂપિયો.",
    "Multiply the paise first, carry each hundred paise as one rupee, then multiply the rupees and add the carry.": "પહેલાં પૈસાનો ગુણાકાર કરો, દર સો પૈસાનો એક રૂપિયો વદીમાં લો. પછી રૂપિયાનો ગુણાકાર કરી વદી ઉમેરો.",
    "You learned: multiply the paise first and carry each hundred as a rupee.": "તમે શીખ્યા: પહેલાં પૈસાનો ગુણાકાર, દર સો પૈસાનો એક રૂપિયો વદી.",
    "One notebook costs Rs 23.50. Find the cost of all 6 notebooks. Tap the paise once for each notebook. Write the cost with two places after the dot.":
      "એક નોટબુકની કિંમત 23 રૂપિયા 50 પૈસા છે. બધી 6 નોટબુકનો ખર્ચ શોધો. દરેક નોટબુક માટે પૈસા પર એક વાર ટૅપ કરો. ખર્ચમાં બિંદુ પછી બે અંક લખો.",
    "Cost of 6 notebooks?": "6 નોટબુકનો ખર્ચ?",
    "What do the paise make when multiplied?": "ગુણાકાર કરતાં પૈસા કેટલા થાય?",
    "One pencil costs Rs 7.50. What do 4 pencils cost? Keep two places for the paise.": "એક પેન્સિલની કિંમત 7 રૂપિયા 50 પૈસા છે. 4 પેન્સિલનો ખર્ચ કેટલો? પૈસા માટે બે અંક રાખો.",
    "Cost of 4 pencils?": "4 પેન્સિલનો ખર્ચ?",
    "Do the paise of 4 pencils stay at 50 paise?": "શું 4 પેન્સિલના પૈસા 50 પૈસા જ રહે?",
    "One ribbon costs Rs 12.25. How much for 4 ribbons?": "એક રિબનની કિંમત 12 રૂપિયા 25 પૈસા છે. 4 રિબન કેટલાની થશે?",
    "Cost of 4 ribbons?": "4 રિબનનો ખર્ચ?",
    "Do the paise of 4 ribbons fill a whole strip?": "શું 4 રિબનના પૈસા આખી પટ્ટી ભરે છે?",
    /* phase 2 */
    "The number multiplied by is a count": "જેનાથી ગુણીએ, તે વસ્તુઓની સંખ્યા છે",
    "What does this number count? Does it have any paise?": "આ સંખ્યા શું ગણે છે? શું તેમાં કોઈ પૈસા છે?",
    "Look at the row. Do you count things with a dot?": "હાર જુઓ. શું વસ્તુઓ બિંદુ મૂકીને ગણાય?",
    "With 2 things, the price is simply taken twice.": "2 વસ્તુમાં કિંમત બસ બે વાર લેવાય.",
    "The number multiplied by counts things, so it has no dot and no paise.": "જેનાથી ગુણીએ તે વસ્તુઓ ગણે છે. એટલે તેમાં ન બિંદુ, ન પૈસા.",
    "You learned: a count of things has no dot and no paise.": "તમે શીખ્યા: વસ્તુઓની સંખ્યામાં ન બિંદુ હોય, ન પૈસા.",
    "Each pen costs Rs 14.50. A child wrote the 9 under the paise, with a dot in front. Is that where the 9 belongs? Then find what the 9 pens cost. The paise take two places.":
      "દરેક પેનની કિંમત 14 રૂપિયા 50 પૈસા છે. એક બાળકે 9 ને પૈસાની નીચે, આગળ બિંદુ મૂકીને લખ્યો. શું 9 ની જગ્યા ત્યાં છે? પછી 9 પેનનો ખર્ચ શોધો. પૈસા બે અંકમાં લખો.",
    "Cost of 9 pens?": "9 પેનનો ખર્ચ?",
    "Did the 9 multiply the rupees as well as the paise?": "શું 9 થી પૈસાની સાથે રૂપિયાનો પણ ગુણાકાર થયો?",
    "Rs 26.40 is multiplied by 3, to find what 3 books cost. Should the 3 have a dot in front of it? Show it on the frame, then find the cost.":
      "3 પુસ્તકોનો ખર્ચ જાણવો છે. 26 રૂપિયા 40 પૈસાને 3 વડે ગુણવાના છે. શું 3 ની આગળ બિંદુ હોવું જોઈએ? માળખા પર બતાવો, પછી ખર્ચ શોધો.",
    "Cost of 3 books?": "3 પુસ્તકોનો ખર્ચ?",
    "How much is the 26 taken 3 times?": "26 ને 3 વાર લઈએ તો કેટલા થાય?",
    "Each bottle costs Rs 31.20. Someone put a dot before the 7 and called it 70 paise. What should the 7 be, and what do the bottles cost?":
      "દરેક બોટલની કિંમત 31 રૂપિયા 20 પૈસા છે. કોઈએ 7 ની આગળ બિંદુ મૂકી તેને 70 પૈસા કહ્યા. 7 શું હોવો જોઈએ, અને બોટલોનો ખર્ચ કેટલો?",
    "Cost of 7 bottles?": "7 બોટલનો ખર્ચ?",
    "Count the bottles in the row. How many prices is that?": "હારમાં બોટલો ગણો. તો કેટલી કિંમતો થઈ?",
    /* phase 3 */
    "Paise left over go after the dot": "વધેલા પૈસા બિંદુ પછી",
    "Some paise are left over. Where do they go?": "થોડા પૈસા વધે છે. તે ક્યાં જાય?",
    "How many are left once the whole hundreds are carried?": "આખા સો વદીમાં લીધા પછી કેટલા વધે?",
    "Try 5 paise times 3 first. That makes 15 paise, written after the dot as 15.": "પહેલાં 5 પૈસા ગુણ્યા 3 કરી જુઓ. 15 પૈસા થાય, જે બિંદુ પછી 15 લખાય.",
    "Paise left over go after the dot as two digits, and each whole hundred is carried as a rupee.": "વધેલા પૈસા બિંદુ પછી બે અંકમાં જાય. દરેક આખા સોનો એક રૂપિયો વદી બને.",
    "You learned: paise left over go after the dot, always as two digits.": "તમે શીખ્યા: વધેલા પૈસા બિંદુ પછી, હંમેશાં બે અંકમાં.",
    "One cup costs Rs 42.35. What do 4 cups cost? Tap the paise once for each cup.": "એક કપની કિંમત 42 રૂપિયા 35 પૈસા છે. 4 કપનો ખર્ચ કેટલો? દરેક કપ માટે પૈસા પર એક વાર ટૅપ કરો.",
    "Cost of 4 cups?": "4 કપનો ખર્ચ?",
    "How many paise did the paise make?": "પૈસાનો ગુણાકાર કરતાં કુલ કેટલા પૈસા થયા?",
    "One torch costs Rs 85.60. Find the cost of 3 torches.": "એક ટોર્ચની કિંમત 85 રૂપિયા 60 પૈસા છે. 3 ટોર્ચનો ખર્ચ શોધો.",
    "Cost of 3 torches?": "3 ટોર્ચનો ખર્ચ?",
    "The carry circle holds a rupee. Is it in your rupees?": "વદીના વર્તુળમાં એક રૂપિયો છે. શું તે તમારા રૂપિયામાં ઉમેરાયો?",
    "One ball costs Rs 16.35. How much for 3 balls?": "એક દડાની કિંમત 16 રૂપિયા 35 પૈસા છે. 3 દડા કેટલાના થશે?",
    "Cost of 3 balls?": "3 દડાનો ખર્ચ?",
    "Paise take two places. Where does a lone 5 go?": "પૈસા બે અંકમાં લખાય. એકલો 5 ક્યાં જશે?",
    /* phase 4 */
    "The cost, then the change": "પહેલાં ખર્ચ, પછી બાકીના પૈસા",
    "First find the cost. Is the cost what the question asks for?": "પહેલાં ખર્ચ શોધો. શું પ્રશ્ન ખર્ચ જ પૂછે છે?",
    "What is the cost, and what is it taken from?": "ખર્ચ કેટલો છે, અને તે શેમાંથી બાદ કરવાનો છે?",
    "Try one thing and one note first. The change is the note less the cost.": "પહેલાં એક વસ્તુ અને એક નોટથી જુઓ. બાકીના પૈસા એટલે નોટમાંથી ખર્ચ બાદ.",
    "Find the cost first. Then answer what the question asks: the cost, the change or the money left.": "પહેલાં ખર્ચ શોધો. પછી પ્રશ્ન પૂછે તે કહો: ખર્ચ, બાકીના પૈસા કે વધેલા પૈસા.",
    "You learned: find the cost first, then the change or the money left.": "તમે શીખ્યા: પહેલાં ખર્ચ, પછી બાકીના કે વધેલા પૈસા.",
    "A child has Rs 700 and buys 5 bags of rice at Rs 118.65 each. How much money is left? Tap the paise for each bag. Write the paise in two places.":
      "એક બાળક પાસે 700 રૂપિયા છે. તે ચોખાની 5 થેલી ખરીદે છે. દરેક થેલી 118 રૂપિયા 65 પૈસાની છે. કેટલા પૈસા વધ્યા? દરેક થેલી માટે પૈસા પર ટૅપ કરો. પૈસા બે અંકમાં લખો.",
    "How much money is left?": "કેટલા પૈસા વધ્યા?",
    "You found what the bags cost. Does the child still have some money?": "થેલીઓનો ખર્ચ તમે શોધ્યો. શું બાળક પાસે હજી થોડા પૈસા છે?",
    "A child buys 6 boxes of crayons at Rs 64.75 each and pays with a Rs 500 note. How much change comes back?":
      "એક બાળક ક્રેયોનનાં 6 બોક્સ ખરીદે છે. દરેક બોક્સ 64 રૂપિયા 75 પૈસાનું છે. તે 500 રૂપિયાની નોટ આપે છે. બાકીના કેટલા પૈસા પાછા મળશે?",
    "How much change comes back?": "બાકીના પૈસા કેટલા?",
    "Do the crayons use up the whole note?": "શું ક્રેયોનમાં આખી નોટ વપરાઈ જાય છે?",
    "A child has Rs 450 and is given Rs 300 more, then buys 4 lamps at Rs 162.80 each. What is the child left with after the lamps?":
      "એક બાળક પાસે 450 રૂપિયા છે. તેને 300 રૂપિયા વધુ મળે છે. પછી તે 4 લેમ્પ ખરીદે છે. દરેક લેમ્પ 162 રૂપિયા 80 પૈસાનો છે. લેમ્પ લીધા પછી તેની પાસે શું રહ્યું?",
    "How much is left?": "કેટલા વધ્યા?",
    "Did you take the cost from all the money the child had?": "શું તમે ખર્ચ બાળકના બધા પૈસામાંથી બાદ કર્યો?",
    /* drawn on the working area, the slot and the summary */
    "Rs": "₹", "p": "પૈસા", "paise": "પૈસા", "of": "માંથી", "has": "પાસે", "pays": "આપે છે", "not enough money": "પૈસા ઓછા છે",
  },
};

/* One entry per phase = one mount. Items carry the maths the picture needs:
   price  the price of one thing, written with two paise places ("23.50")
   count  how many things (a count: never a dot, never paise)
   thing  what is drawn in the row
   held   phase 4: the money held or paid, in rupees (two amounts when some is given later)
   near   the item's misconception, as the child would type it (judge rejects it)
   answer the cost, the change or the money left, a string in its written form, two paise places */
const PHASES = [
  {
    n: 1,
    concept: "Paise first, then rupees",
    conceptId: "M2.S4.T6.C20", objectiveIds: ["O9"],
    says: ["Multiply the paise first. How many whole rupees do they make?"],
    /* tries, as the plan writes it: A miss is answered three ways at once and none of them is the answer. First rung, from the item's own miss line: what do the paise make when multiplied? Second rung, the phase's: how many whole rupees is that? Third rung: the frame is cut to one rupee and fifty paise times two, and the child carries before the larger price comes back. The number pad stays open behind all three rungs.
       Rung 3 is the plan's cut-down frame, said as a small case (the plan's line is a stage direction). */
    ladder: ["Have the rupees been multiplied, and the carry added?", "Try Rs 1.50 times 2 first. The paise make a hundred, and a hundred paise is one rupee."],
    closing: "Multiply the paise first, carry each hundred paise as one rupee, then multiply the rupees and add the carry.",
    /* the summary page's row: "You learned: ..." in at most 72 characters */
    learned: "You learned: multiply the paise first and carry each hundred as a rupee.",
    /* the traceback for a miss, in one line (it goes into the sidecar) */
    traceback: "Every thing's paise pour onto the strip, each full hundred rolls into the carry circle, the paise left go after the dot, and the rupees times the count take the carry: the whole cost.",
    items: [
      /* learn ML1: answer in the plan = Rs 141 */
      { qid: "M2.S4.T6.C20:ML1", kind: "multiply", price: "23.50", count: 6, thing: "notebook", near: "138.50", winMs: 2800,
        say: "One notebook costs Rs 23.50. Find the cost of all 6 notebooks. Tap the paise once for each notebook. Write the cost with two places after the dot.",
        ask: "Cost of 6 notebooks?", answer: "141.00", miss: "What do the paise make when multiplied?" },
      /* practice 1: answer in the plan = Rs 30. 50 paise times 4 is 200 paise, which is 2 rupees, and 7 times 4 is 28, so 28 and 2 make 30 */
      { qid: "M2.S4.T6.C20:1", kind: "multiply", price: "7.50", count: 4, thing: "pencil", near: "28.50", winMs: 2800,
        say: "One pencil costs Rs 7.50. What do 4 pencils cost? Keep two places for the paise.",
        ask: "Cost of 4 pencils?", answer: "30.00", miss: "Do the paise of 4 pencils stay at 50 paise?" },
      /* practice 2: answer in the plan = Rs 49. 25 paise times 4 is 100 paise, which is 1 rupee, and 12 times 4 is 48, so 48 and 1 make 49 */
      { qid: "M2.S4.T6.C20:2", kind: "multiply", price: "12.25", count: 4, thing: "ribbon", near: "48.25", winMs: 2800,
        say: "One ribbon costs Rs 12.25. How much for 4 ribbons?",
        ask: "Cost of 4 ribbons?", answer: "49.00", miss: "Do the paise of 4 ribbons fill a whole strip?" },
    ],
  },
  {
    n: 2,
    concept: "The number multiplied by is a count",
    conceptId: "M2.S4.T6.C21", objectiveIds: ["O9"],
    says: ["What does this number count? Does it have any paise?"],
    /* tries, as the plan writes it: First rung, from the item: what does this number count? Second rung, the phase's: can a count have paise? Third rung: the row is cut to two things with the count already in its box, and the child multiplies before the larger count comes back. The number pad stays open.
       Rung 3 said as the small case; each item's rung 1 is its own (the teach already asks what the number counts). */
    ladder: ["Look at the row. Do you count things with a dot?", "With 2 things, the price is simply taken twice."],
    closing: "The number multiplied by counts things, so it has no dot and no paise.",
    /* the summary page's row: "You learned: ..." in at most 72 characters */
    learned: "You learned: a count of things has no dot and no paise.",
    /* the traceback for a miss, in one line (it goes into the sidecar) */
    traceback: "The count is lifted out of the paise column into its own box, its dot falls away, the things light one by one, and the count multiplies both columns of the price: the whole cost.",
    items: [
      /* learn ML2: answer in the plan = The 9 counts pens, so it has no dot and no paise. The pens cost Rs 130.50 */
      { qid: "M2.S4.T6.C21:ML2", kind: "lift", price: "14.50", count: 9, thing: "pen", near: "18.50", winMs: 2800,
        say: "Each pen costs Rs 14.50. A child wrote the 9 under the paise, with a dot in front. Is that where the 9 belongs? Then find what the 9 pens cost. The paise take two places.",
        ask: "Cost of 9 pens?", answer: "130.50", miss: "Did the 9 multiply the rupees as well as the paise?" },
      /* practice 3: answer in the plan = No. The 3 counts books, so it has no dot and no paise. The books cost Rs 79.20 */
      { qid: "M2.S4.T6.C21:3", kind: "lift", price: "26.40", count: 3, thing: "book", near: "27.20", winMs: 2800,
        say: "Rs 26.40 is multiplied by 3, to find what 3 books cost. Should the 3 have a dot in front of it? Show it on the frame, then find the cost.",
        ask: "Cost of 3 books?", answer: "79.20", miss: "How much is the 26 taken 3 times?" },
      /* practice 4: answer in the plan = The 7 counts bottles, so it has no dot and no paise. 7 times Rs 31.20 is Rs 218.40 */
      { qid: "M2.S4.T6.C21:4", kind: "lift", price: "31.20", count: 7, thing: "bottle", near: "32.40", winMs: 2800,
        say: "Each bottle costs Rs 31.20. Someone put a dot before the 7 and called it 70 paise. What should the 7 be, and what do the bottles cost?",
        ask: "Cost of 7 bottles?", answer: "218.40", miss: "Count the bottles in the row. How many prices is that?" },
    ],
  },
  {
    n: 3,
    concept: "Paise left over go after the dot",
    conceptId: "M2.S4.T6.C22", objectiveIds: ["O10"],
    says: ["Some paise are left over. Where do they go?"],
    /* tries, as the plan writes it: First rung, from the item: how many paise did the paise make? Second rung, the phase's: how many are left once the whole hundreds are carried? Third rung: the frame is cut to a price with five paise times three, and the child writes the fifteen paise after the dot before the larger price comes back. The number pad stays open.
       Rung 3 said as the small case. */
    ladder: ["How many are left once the whole hundreds are carried?", "Try 5 paise times 3 first. That makes 15 paise, written after the dot as 15."],
    closing: "Paise left over go after the dot as two digits, and each whole hundred is carried as a rupee.",
    /* the summary page's row: "You learned: ..." in at most 72 characters */
    learned: "You learned: paise left over go after the dot, always as two digits.",
    /* the traceback for a miss, in one line (it goes into the sidecar) */
    traceback: "The paise pour and each full hundred rolls into the carry circle; what is left goes after the dot as two digits (a zero in front of fewer than ten), and the carried rupee joins the rupees.",
    items: [
      /* learn ML3: answer in the plan = Rs 169.40 */
      { qid: "M2.S4.T6.C22:ML3", kind: "left", price: "42.35", count: 4, thing: "cup", near: "168.40", winMs: 2800,
        say: "One cup costs Rs 42.35. What do 4 cups cost? Tap the paise once for each cup.",
        ask: "Cost of 4 cups?", answer: "169.40", miss: "How many paise did the paise make?" },
      /* practice 5: answer in the plan = Rs 256.80. 60 paise times 3 is 180 paise: carry 1 rupee and write 80 after the dot. 85 times 3 is 255, and 1 more makes 256 */
      { qid: "M2.S4.T6.C22:5", kind: "left", price: "85.60", count: 3, thing: "torch", near: "255.80", winMs: 2800,
        say: "One torch costs Rs 85.60. Find the cost of 3 torches.",
        ask: "Cost of 3 torches?", answer: "256.80", miss: "The carry circle holds a rupee. Is it in your rupees?" },
      /* practice 6: answer in the plan = Rs 49.05. 35 paise times 3 is 105 paise: carry 1 rupee and write 05 after the dot, because the paise take two places. 16 times 3 is 48, and 1 more makes 49 */
      { qid: "M2.S4.T6.C22:6", kind: "left", price: "16.35", count: 3, thing: "ball", near: "49.5", winMs: 2800,
        say: "One ball costs Rs 16.35. How much for 3 balls?",
        ask: "Cost of 3 balls?", answer: "49.05", miss: "Paise take two places. Where does a lone 5 go?" },
    ],
  },
  {
    n: 4,
    concept: "The cost, then the change",
    conceptId: "M2.S4.T6.C23", objectiveIds: ["O10"],
    says: ["First find the cost. Is the cost what the question asks for?"],
    /* tries, as the plan writes it: First rung, from the item: what does the question ask for? Second rung, the phase's: what is the cost, and what is it taken from? Third rung: the card is cut to one thing bought with one note, and the child finds the change before the larger question comes back. The number pad stays open.
       Rung 3 said as the small case; each item's rung 1 is its own (the teach already asks what the question asks for). */
    ladder: ["What is the cost, and what is it taken from?", "Try one thing and one note first. The change is the note less the cost."],
    closing: "Find the cost first. Then answer what the question asks: the cost, the change or the money left.",
    /* the summary page's row: "You learned: ..." in at most 72 characters */
    learned: "You learned: find the cost first, then the change or the money left.",
    /* the traceback for a miss, in one line (it goes into the sidecar) */
    traceback: "The cost is found and kept in its own box, set under the money held, one rupee is broken into a hundred paise, and the money left or the change is taken away.",
    items: [
      /* learn ML4: answer in the plan = Rs 106.75 */
      { qid: "M2.S4.T6.C23:ML4", kind: "change", price: "118.65", count: 5, thing: "bag", held: [700], pays: false, near: "593.25", winMs: 3000,
        say: "A child has Rs 700 and buys 5 bags of rice at Rs 118.65 each. How much money is left? Tap the paise for each bag. Write the paise in two places.",
        ask: "How much money is left?", answer: "106.75", miss: "You found what the bags cost. Does the child still have some money?" },
      /* practice 7: answer in the plan = Rs 111.50. The crayons cost Rs 388.50, and Rs 500 less Rs 388.50 is Rs 111.50. The question asks for the change, not the cost */
      { qid: "M2.S4.T6.C23:7", kind: "change", price: "64.75", count: 6, thing: "crayons", held: [500], pays: true, near: "388.50", winMs: 3000,
        say: "A child buys 6 boxes of crayons at Rs 64.75 each and pays with a Rs 500 note. How much change comes back?",
        ask: "How much change comes back?", answer: "111.50", miss: "Do the crayons use up the whole note?" },
      /* practice 8: answer in the plan = Rs 98.80. The child has Rs 750 and the lamps cost Rs 651.20. From zero paise, break one rupee into a hundred paise: Rs 749 and 100 paise, so Rs 98.80 is left */
      { qid: "M2.S4.T6.C23:8", kind: "change", price: "162.80", count: 4, thing: "lamp", held: [450, 300], pays: false, near: "651.20", winMs: 3000,
        say: "A child has Rs 450 and is given Rs 300 more, then buys 4 lamps at Rs 162.80 each. What is the child left with after the lamps?",
        ask: "How much is left?", answer: "98.80", miss: "Did you take the cost from all the money the child had?" },
    ],
  },
];

/* ── colours: the chapter's own, one meaning each (the brief) ─────────────────────────────── */
const PM_BLUE = "#0072B2";    /* rupees */
const PM_GREEN = "#009E73";   /* paise */
const PM_VERM = "#D55E00";    /* the dot */
const PM_AMBER = "#E69F00";   /* a rupee carried or broken */
const PM_PURPLE = "#CC79A7";  /* the change, the money left */
const PM_SKY = "#56B4E9";     /* a count of things */
const PM_ZERO = "#767676";    /* the zeros of a whole-rupee amount */
const PM_INK = { rs: shade(PM_BLUE, 0.25), ps: shade(PM_GREEN, 0.25), dot: shade(PM_VERM, 0.1), carry: shade(PM_AMBER, 0.4),
  left: shade(PM_PURPLE, 0.35), count: shade(PM_SKY, 0.35) };

/* The numbers, rows, sizes and targets the working area needs (they go into the sidecar too). */
const MODEL = {
  colours: { rupees: PM_BLUE, paise: PM_GREEN, dot: PM_VERM, carry: PM_AMBER, change: PM_PURPLE, count: PM_SKY, zero: PM_ZERO },
  /* the multiplying frame: 3 rupee places, the dot on a dotted line, 2 paise places */
  frame: { x: 0, y: 112, w: 490, h: 328, rs: [234, 276, 318], dot: 360, ps: [396, 438], head: 154, carry: { x: 318, y: 194, r: 26 },
    price: 268, times: { x: 34, y: 346 }, box: { x: 58, y: 290, w: 108, h: 74 }, rule: 376, answer: 426 },
  paiseBox: { x: 512, y: 112, w: 256, h: 114 },
  strip: { x: 512, y: 246, w: 256, h: 60, cells: 100, blocks: 10 },
  /* phase 4: the two-step card and the change bench */
  card: { x: 792, y: 112, w: 294, h: 114 },
  bench: { x: 792, y: 238, w: 294, h: 288, rs: [860, 902, 944], dot: 972, ps: [1004, 1046], above: 290, top: 348,
    costBox: { x: 834, y: 370, w: 242, h: 66 }, cost: 424, rule: 448, answer: 506 },
  row: { y: 57, pitch: 90, max: 12 },
  free: { rupees: [1, 50], paise: [0, 95, 5], count: [1, 12], held: [100, 200, 500], start: { r: 23, p: 50, count: 6, held: 1 } },
};

/* ── money as the book writes it (these helpers are the picture's and the slot's; the oracle has its own) ── */
const pmSplit = (price: string) => { const [r, p] = String(price).split("."); return { r: Number(r), p: Number((p || "0").padEnd(2, "0").slice(0, 2)) }; };
const pmMoney = (paise: number) => String(Math.floor(paise / 100)) + "." + String(paise % 100).padStart(2, "0");
/* drawn money: "Rs 700" in English, "₹700" in Hindi and Gujarati (TR maps "Rs" to the rupee sign, written close) */
const pmRs = (tr: any, amount: any) => { const r = tr("Rs"); return r === "Rs" ? "Rs " + amount : r + amount; };
/* what the child or the agent gave, in its written form: "Rs 49.05", "₹49.05" and "49.05" are one answer */
const pmNorm = (v: any) => (typeof v === "number" ? v.toFixed(2) : String(v ?? "").replace(/^\s*(?:rs\.?|₹)\s*/i, "").replace(/\s+/g, ""));

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* judge: an amount with paise is exact, both paise places ("130.5" and "49.5" are not the answer); a whole
   number of rupees takes the plain form too ("141" or "141.00", as the plan writes Rs 141), never "141.0" */
const judge = (item: any, v: any) => {
  const a = String(item.answer), g = pmNorm(v);
  return g === a || (/\.00$/.test(a) && g === a.slice(0, -3));
};
/* oracle: every answer re-derived by a second route: the price added up once for each thing, rupees and
   paise apart with a carry at every hundred, then (phase 4) taken from the money held with a rupee broken */
const oracle = () => PHASES.every((p: any) => p.items.every((it: any) => {
  const [rs, ps] = String(it.price).split(".");
  let r = 0, q = 0;
  for (let k = 0; k < it.count; k++) { q += Number(ps); r += Number(rs); if (q >= 100) { q -= 100; r += 1; } }
  if (it.held) {
    let hr = 0; for (const h of it.held) hr += h;
    let hq = 0;
    if (hq < q) { hr -= 1; hq += 100; }
    q = hq - q; r = hr - r;
  }
  return String(r) + "." + (q < 10 ? "0" : "") + String(q) === it.answer;
}));
/* the most likely wrong answer (the misconception); judge must reject it */
const nearMiss = (item: any) => item.near;
/* the forms of an answer that no question, hint or ladder line may print */
const answerForms = (item: any) => {
  const a = String(item.answer), plain = /\.00$/.test(a) ? a.slice(0, -3) : null;
  return [a, "Rs " + a, "Rs. " + a, "₹" + a, speakable("Rs " + a), ...(plain ? ["Rs " + plain, "₹" + plain] : [])];
};
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => item.answer;

/* the slot: "Rs" before the number, and two paise places held open once the dot is typed. A third digit after
   the dot is never painted (Work's cap takes it out of the answer a moment later). A missed answer that still
   stands untouched (HOOK.stale, set by Work) shows no open place: the next digit starts a new answer, so an
   open place there would invite the one missing digit and give "Rs 5" instead */
const format = (v: any, _j: any, o: any) => {
  const s = String(v ?? "").replace(/^(\d*\.\d\d)\d+$/, "$1");
  if (!s) return "";
  const tr = (o && o.tx) || ((x: any) => x);
  const at = s.indexOf(".");
  const open = at < 0 || HOOK.stale === s ? 0 : Math.max(0, 2 - (s.length - at - 1));
  return pmRs(tr, s) + "_".repeat(open);
};

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => T.submit(item.answer);
/* the agent's answer(): toolApi.answer strips the point, so the written form is typed here as it is */
const answer = (item: any, v: any) => (HOOK.type ? HOOK.type(v) : undefined);
/* the agent's check() before Enter: undefined = press Enter */
const check = () => undefined;

/* ── the things in the row: drawn, never pictures. Lit = counted (sky blue, a count); dark = not yet ── */
const PM_THING_LIT = { fill: PM_SKY, line: shade(PM_SKY, 0.5) };
const PM_THING_DARK = { fill: "#9CA3A9", line: "#5E656B" };
function pmThing(kind: string, x: number, y: number, lit: boolean, sc: number, key?: any) {
  const c = lit ? PM_THING_LIT : PM_THING_DARK;
  const f: any = { fill: c.fill, stroke: c.line, strokeWidth: 3, strokeLinejoin: "round" };
  const s = c.line;
  let body: any = null;
  if (kind === "notebook") body = (<g><rect x={-20} y={-30} width={44} height={60} rx={5} {...f} />
    {[-16, -5, 6, 17].map((yy) => <line key={yy} x1={-8} y1={yy} x2={16} y2={yy} stroke={s} strokeWidth={2.5} />)}
    {[-22, -11, 0, 11, 22].map((yy) => <circle key={yy} cx={-20} cy={yy} r={3.5} fill="#FFFFFF" stroke={s} strokeWidth={2} />)}</g>);
  else if (kind === "pencil") body = (<g transform="rotate(35)"><rect x={-7} y={-24} width={14} height={38} {...f} />
    <path d="M -7 14 L 7 14 L 0 30 Z" fill="#FFFFFF" stroke={s} strokeWidth={3} strokeLinejoin="round" /><path d="M -2.6 24 L 2.6 24 L 0 30 Z" fill={s} />
    <rect x={-7} y={-32} width={14} height={8} rx={2} fill={c.fill} stroke={s} strokeWidth={3} /></g>);
  else if (kind === "ribbon") body = (<g><path d="M 0 -6 C -10 -24 -30 -24 -28 -8 C -26 6 -10 2 0 -6 Z" {...f} /><path d="M 0 -6 C 10 -24 30 -24 28 -8 C 26 6 10 2 0 -6 Z" {...f} />
    <path d="M -3 -4 L -14 28 L -5 26 L 1 2 Z" {...f} /><path d="M 3 -4 L 14 28 L 5 26 L -1 2 Z" {...f} /><circle cx={0} cy={-6} r={6} {...f} /></g>);
  else if (kind === "pen") body = (<g transform="rotate(35)"><rect x={-6} y={-30} width={12} height={46} rx={5} {...f} /><path d="M -6 16 L 6 16 L 0 30 Z" {...f} />
    <rect x={3} y={-28} width={4} height={20} rx={2} fill={s} /></g>);
  else if (kind === "book") body = (<g><rect x={-24} y={-28} width={48} height={56} rx={4} {...f} /><rect x={-24} y={-28} width={10} height={56} rx={3} fill={s} />
    <rect x={-6} y={-16} width={22} height={10} rx={2} fill="#FFFFFF" stroke={s} strokeWidth={2} /></g>);
  else if (kind === "bottle") body = (<g><path d="M -6 -24 L 6 -24 L 6 -16 C 16 -10 16 -6 16 0 L 16 26 Q 16 30 12 30 L -12 30 Q -16 30 -16 26 L -16 0 C -16 -6 -16 -10 -6 -16 Z" {...f} />
    <rect x={-8} y={-31} width={16} height={8} rx={2} fill={s} /><rect x={-16} y={4} width={32} height={12} fill="#FFFFFF" stroke={s} strokeWidth={2} /></g>);
  else if (kind === "cup") body = (<g><path d="M 17 -8 C 32 -8 32 14 15 14" fill="none" stroke={s} strokeWidth={5} strokeLinecap="round" />
    <path d="M -22 -18 L 20 -18 L 15 24 Q 14 28 10 28 L -16 28 Q -20 28 -21 24 Z" {...f} /></g>);
  else if (kind === "torch") body = (<g transform="rotate(-35)"><rect x={-8} y={-6} width={16} height={36} rx={4} {...f} /><path d="M -8 -6 L -15 -26 L 15 -26 L 8 -6 Z" {...f} />
    <rect x={-12} y={-31} width={24} height={6} rx={2} fill="#FFFFFF" stroke={s} strokeWidth={2} /></g>);
  else if (kind === "ball") body = (<g><circle cx={0} cy={0} r={26} {...f} /><path d="M -26 0 C -10 -10 10 10 26 0" fill="none" stroke={s} strokeWidth={3} />
    <path d="M -4 -26 C -14 -8 14 8 4 26" fill="none" stroke={s} strokeWidth={3} /></g>);
  /* a sack: wide at the bottom, drawn in at a tied neck, its mouth flaring out in folds above the tie */
  else if (kind === "bag") body = (<g><path d="M -20 31 Q -30 30 -29 17 Q -28 -1 -9 -14 L 9 -14 Q 28 -1 29 17 Q 30 30 20 31 Z" {...f} />
    <path d="M -9 -17 L -19 -31 L -9 -26 L 0 -33 L 9 -26 L 19 -31 L 9 -17 Z" {...f} />
    <rect x={-12} y={-19} width={24} height={7} rx={3} fill={s} /><path d="M -14 12 Q 0 17 14 12" fill="none" stroke={s} strokeWidth={2.5} strokeLinecap="round" /></g>);
  else if (kind === "crayons") body = (<g>{[-15, -5, 5, 15].map((cx) => <path key={cx} d={`M ${cx - 4} -6 L ${cx - 4} -20 L ${cx} -29 L ${cx + 4} -20 L ${cx + 4} -6 Z`} {...f} strokeWidth={2} />)}
    <rect x={-23} y={-8} width={46} height={36} rx={4} {...f} /><rect x={-14} y={2} width={28} height={10} rx={2} fill="#FFFFFF" stroke={s} strokeWidth={2} /></g>);
  else body = (<g><path d="M -14 -28 L 14 -28 L 24 -4 L -24 -4 Z" {...f} /><rect x={-3} y={-4} width={6} height={26} fill={s} /><ellipse cx={0} cy={25} rx={18} ry={5} {...f} /></g>);
  return <g key={key} transform={`translate(${x},${y}) scale(${sc})`}>{body}</g>;
}

/* ── the working area: 1086 x 528, origin at its top-left ──────────────────────────────────── */
function Work({ phase, n, item, index, stage, wrong, typed, api, MODEL: M, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();   /* the correction and the win */
  const an = useTimeline();   /* the child's own pours and the lift */
  const Mo: any = M || MODEL;
  const F = Mo.frame, PB = Mo.paiseBox, SP = Mo.strip, CD = Mo.card, B = Mo.bench;
  const free = stage === "free";
  const cur = free ? "free" : n + ":" + index;
  const curRef = useRef(cur);
  curRef.current = cur;
  const mine = useRef(false);

  /* free play's own price, count and money held */
  const [fp, setFp] = useState<any>(Mo.free.start);
  const it: any = free
    ? { kind: "free", price: pmMoney(fp.r * 100 + fp.p), count: fp.count, thing: "notebook", held: [Mo.free.held[fp.held]] }
    : item || {};
  const { r: pr, p: pv } = pmSplit(it.price || "0.00");
  const count = it.count || 1;
  const twoStep = it.kind === "change" || free;
  const held = it.held ? it.held.reduce((a: number, b: number) => a + b, 0) : 0;
  const costP = (pr * 100 + pv) * count;
  const costR = Math.floor(costP / 100), costPs = costP % 100;
  const carried = Math.floor((pv * count) / 100);
  const leftP = held * 100 - costP;

  /* the child's own state (keyed by the question, so a new question starts fresh) and the correction's layer */
  const blank = (key: string) => ({ key, lit: 0, ph: "done", target: 0, lift: 0, dot: 0, cost: 0, broken: false });
  const dBlank = (key: string) => ({ key, paise: false, product: false, final: false, bracket: false, ring: false, left: false, read: null as any, strip: null as any });
  const [st, setSt] = useState<any>(() => blank(cur));
  const [dm, setDm] = useState<any>(() => dBlank(cur));
  const S = st.key === cur ? st : blank(cur);
  const D = dm.key === cur ? dm : dBlank(cur);
  const sRef = useRef<any>(S);
  sRef.current = S;
  const dRef = useRef<any>(D);
  dRef.current = D;
  const putS = (key: string) => (o: any) => {
    if (curRef.current !== key) return;
    const nx = { ...(sRef.current.key === key ? sRef.current : blank(key)), ...o };
    sRef.current = nx; setSt(nx);
  };
  const putD = (key: string) => (o: any) => {
    if (curRef.current !== key) return;
    const nx = { ...(dRef.current.key === key ? dRef.current : dBlank(key)), ...o };
    dRef.current = nx; setDm(nx);
  };

  /* a new question (or a jump) stops whatever was moving and gives the pad back */
  useEffect(() => {
    tl.stop(); an.stop();
    if (mine.current) { mine.current = false; api.lock(false); }
  }, [cur]);

  /* one thing's paise pour onto the strip; a strip that fills rolls up into one rupee in the carry circle */
  const pourSteps = (key: string, from: any, to: number, k: number) => {
    const P = putS(key);
    const steps: any[] = [];
    if (from.ph !== "done") steps.push([0, () => P({ ph: "done" })]);
    for (let j = from.lit + 1; j <= to; j++) {
      const before = (j - 1) * pv, after = j * pv;
      const crosses = Math.floor(after / 100) > Math.floor(before / 100);
      steps.push([320 * k, () => { P({ lit: j, ph: "fill" }); api.sfx.tick(); }]);
      if (crosses) { steps.push([40, () => P({ ph: "rollA" })]); steps.push([420 * k, () => P({ ph: "rollB" })]); }
      steps.push([160 * k, () => P({ ph: "done" })]);
    }
    return steps;
  };
  /* phase 4 and free play: the rupees are multiplied and the carry added, then the cost goes to the bench */
  const costSteps = (key: string, from: number, k: number) => {
    const P = putS(key);
    const steps: any[] = [];
    if (from < 1) steps.push([750 * k, () => P({ cost: 1 })]);
    if (from < 2) steps.push([650 * k, () => P({ cost: 2 })]);
    return steps;
  };

  /* the pieces are playable before they are answerable: live through the teach lines too (the pad is not) */
  const live = ((stage === "ask" || stage === "teach") && !tl.busy) || free;

  /* the child taps the paise of the price: one more thing is bought */
  const pour = () => {
    const s0 = sRef.current;
    if (!live || s0.target >= count) return;
    const key = cur, P = putS(key);
    const target = s0.target + 1;
    P({ target });
    const steps = pourSteps(key, sRef.current, target, 1);
    if (target === count && twoStep) steps.push(...costSteps(key, sRef.current.cost, 1));
    an.run(steps);
  };
  /* phase 2: the count is lifted out of the paise column; its dot falls away and the things light one by one */
  const lift = () => {
    const s0 = sRef.current;
    if (s0.lift > 0) return;
    const key = cur, P = putS(key);
    api.sfx.tick();
    an.run([[40, () => P({ lift: 1, dot: 1 })], [650, () => P({ dot: 2 })], [0, () => P({ lift: 2, dot: 3, target: count })],
      ...pourSteps(key, { lit: 0, ph: "done" }, count, 0.9)]);
  };
  /* phase 4: too few paise on top, so one rupee is broken into a hundred paise */
  const breakRupee = () => {
    if (!live || sRef.current.broken) return;
    putS(cur)({ broken: true });
    api.sfx.tick();
  };
  /* with no bench (phases 1 to 3) the frame and the paise box stand in the middle of the working area */
  const ox = twoStep ? 0 : Math.round((W.w - (PB.x + PB.w)) / 2);
  const drag = useDrag((payload: any, p: any, moved: boolean) => {
    if (payload !== "count" || sRef.current.lift > 0 || !live) return;
    /* a real drag lands only near the count box; anywhere else (the paise column, the pad, off the working
       area) it goes back to where it was copied. A tap or Enter puts it where it belongs */
    const bx = F.box.x, by = F.box.y, near = 50;
    if (moved && !(p && p.x - ox >= bx - near && p.x - ox <= bx + F.box.w + near && p.y >= by - near && p.y <= by + F.box.h + near)) return;
    lift();
  });

  /* the whole working, as a correction (miss = the child's answer) or as the win */
  const worked = (key: string, miss?: any) => {
    const P = putS(key), Q = putD(key);
    const s0 = sRef.current;
    const k = 0.45;   /* the lots the child did not pour go quickly; the maths beats after them keep their time */
    const steps: any[] = [[0, () => Q(dBlank(key))]];
    let from = s0;
    if (it.kind === "lift" && s0.lift < 2) {
      steps.push([40, () => P({ lift: 1, dot: 1 })], [600, () => P({ dot: 2 })], [0, () => P({ lift: 2, dot: 3 })]);
      from = { lit: 0, ph: "done" };
    }
    steps.push([0, () => P({ target: count })]);
    steps.push(...pourSteps(key, from, count, k));
    if (it.kind === "change") {
      steps.push(...costSteps(key, s0.cost, 0.75));
      if (miss !== undefined && pmNorm(miss) === pmMoney(costP)) steps.push([900, () => Q({ ring: true })]);
      if (!s0.broken) steps.push([900, () => P({ broken: true })]);
      steps.push([500, () => Q({ left: true })]);
      return steps;
    }
    if (it.kind === "lift") steps.push([800, () => Q({ bracket: true })]);
    const read = miss !== undefined && it.kind === "left" ? /^(\d+)\.(\d)$/.exec(pmNorm(miss)) : null;
    if (read) steps.push([1400, () => Q({ read: [read[1], read[2]], strip: Number(read[2]) * 10 })], [1100, () => Q({ read: null, strip: null, paise: true })]);
    else steps.push([800, () => Q({ paise: true })]);
    steps.push([1200, () => Q({ product: true })]);
    steps.push([300, () => Q({ product: false, final: true })]);
    return steps;
  };
  /* the win: the child's answer is right, so the working finishes at once and the carry joins the rupees */
  const won = (key: string) => {
    const P = putS(key), Q = putD(key);
    if (it.kind === "change") return [[0, () => P({ target: count, lit: count, ph: "done", cost: 2 })], [500, () => P({ broken: true })], [300, () => Q({ left: true })]];
    return [[0, () => { P({ target: count, lit: count, ph: "done", lift: 2, dot: 3 }); Q({ paise: true, bracket: it.kind === "lift" }); }],
      [900, () => Q({ product: true })], [300, () => Q({ product: false, final: true })]];
  };

  /* the traceback: lock, redraw the maths in steps ending on the whole answer, unlock; nothing marked */
  useEffect(() => {
    if (!wrong || stage !== "ask" || free) return;
    an.stop();
    mine.current = true;
    api.lock(true);
    tl.run(worked(cur, wrong.value), () => { mine.current = false; api.lock(false); });
  }, [wrong]);
  useEffect(() => {
    if (stage !== "win" || free) return;
    an.stop();
    tl.run(won(cur));
  }, [stage]);
  /* the slot holds two paise places: a third digit after the dot is not taken */
  useEffect(() => {
    if (stage !== "ask") return;
    const m = /^(\d*\.\d\d)\d+$/.exec(String(typed ?? ""));
    if (m) api.setTyped(m[1]);
  }, [typed, stage]);

  /* Enter goes straight to the slot; the agent's decimal answer is typed as it is written */
  api.onEnter(null);
  HOOK.type = (v: any) => { api.setTyped(pmNorm(v)); return true; };
  /* the missed answer, while it stands untouched in the slot (the slot's format reads it; Work renders first) */
  HOOK.stale = wrong && stage === "ask" && String(typed ?? "") === String(wrong.value ?? "") ? String(typed) : null;

  /* what is on show, from the child's state */
  const tot = S.lit * pv, before = Math.max(0, S.lit - 1) * pv;
  let carryShown = Math.floor(tot / 100), cells = tot % 100;
  if (S.ph === "fill") { carryShown = Math.floor(before / 100); cells = Math.min(100, (before % 100) + pv); }
  else if (S.ph === "rollA" || S.ph === "rollB") carryShown = Math.floor(before / 100);
  if (D.strip !== null) cells = D.strip;
  const costOn = twoStep ? S.cost >= 1 : D.final;
  const leftOn = !free ? D.left : S.cost >= 2 && leftP >= 0 && (S.broken || costPs === 0);
  const needBreak = twoStep && S.cost >= 2 && !S.broken && costPs > 0 && leftP >= 0;

  api.share({ phase: n, price: it.price, count, paiseProduct: tot, carry: carryShown, cost: costOn ? pmMoney(costP) : null,
    held: it.held ? held : null, left: leftOn ? pmMoney(Math.max(0, leftP)) : null, counted: S.lit, things: count, complete: stage === "idle" });

  /* ── drawing helpers (called, never mounted) ── */
  const pad2 = (x: number) => String(x).padStart(2, "0");
  /* an amount in columns: one text (so it reads "141.00"), each digit in its place, and the dot a clear
     vermilion disc on the dotted line */
  const amount = (key: string, rs: string, ps: string, y: number, cols: any, ink: any, size = T.xl) => (
    <g key={key}>
      <text y={y} fontSize={size} fontWeight={700} fill={ink.rs}>
        {rs.split("").map((ch, i, a) => <tspan key={"r" + i} x={cols.rs[cols.rs.length - a.length + i]} textAnchor="middle" fill={ink.rs}>{ch}</tspan>)}
        <tspan x={cols.dot} textAnchor="middle" fill={PM_INK.dot}>.</tspan>
        {ps.split("").map((ch, i) => <tspan key={"p" + i} x={cols.ps[i]} textAnchor="middle" fill={ink.ps}>{ch}</tspan>)}
      </text>
      <circle cx={cols.dot} cy={y - 5} r={7.5} fill={PM_INK.dot} />
    </g>
  );
  const inkFor = (ps: string, whole: boolean) => ({ rs: PM_INK.rs, ps: whole && ps === "00" ? PM_ZERO : PM_INK.ps });
  const dotted = (x: number, y1: number, y2: number) => <line x1={x} y1={y1} x2={x} y2={y2} stroke={C.ink} strokeWidth={3} strokeDasharray="1 9" strokeLinecap="round" />;

  const runs = () => (
    <g data-zone="runs">
      <rect x={0} y={-94} width={330} height={76} rx={16} fill={tint(C.panel, 0.5)} stroke={C.rule} strokeWidth={2} />
      {pmThing(it.thing, 44, -56, true, 0.72)}
      <text x={96} y={-40} fontSize={T.speech} fontWeight={700} fill={C.ink}>{lang === "en" ? S.lit + " " + tx("of") + " " + count : count + " " + tx("of") + " " + S.lit}</text>
    </g>
  );

  const row = () => {
    const pitch = Math.min(Mo.row.pitch, W.w / count), x0 = W.w / 2 - (pitch * (count - 1)) / 2;
    return <g>{Array.from({ length: count }).map((_, i) => pmThing(it.thing, x0 + i * pitch, Mo.row.y, i < S.lit, 1, "t" + i))}</g>;
  };

  const frame = () => {
    const priceParts = String(it.price).split(".");
    /* the answer line: waiting (the dot and five places), the child's reading, the product, or the whole cost */
    let aR = "", aP = "", whole = false;
    if (twoStep ? S.cost >= 1 : D.final) { aR = String(costR); aP = pad2(costPs); whole = true; }
    else if (D.product) { aR = String(pr * count); aP = D.paise ? pad2(costPs) : ""; whole = true; }
    else if (D.read) { aR = D.read[0]; aP = D.read[1]; }
    else if (D.paise) { aP = pad2(costPs); whole = true; }
    const boxOn = it.kind !== "lift" || S.lift >= 2;
    return (
      <g>
        <rect x={F.x} y={F.y} width={F.w} height={F.h} rx={RAD.panel} fill={tint(C.panel, 0.55)} stroke={C.ink} strokeWidth={2} />
        <rect x={F.rs[0] - 28} y={F.y + 12} width={F.rs[2] - F.rs[0] + 56} height={F.h - 24} rx={12} fill={tint(PM_BLUE, 0.9)} />
        <rect x={F.ps[0] - 26} y={F.y + 12} width={F.ps[1] - F.ps[0] + 52} height={F.h - 24} rx={12} fill={tint(PM_GREEN, 0.88)} />
        {dotted(F.dot, F.y + 16, F.y + F.h - 10)}
        <text x={F.rs[1]} y={F.head} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={PM_INK.rs}>{tx("Rs")}</text>
        <text x={(F.ps[0] + F.ps[1]) / 2} y={F.head} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={PM_INK.ps}>{tx("p")}</text>
        {/* the carry circle over the rupees */}
        <circle cx={F.carry.x} cy={F.carry.y} r={F.carry.r} fill={tint(PM_AMBER, 0.78)} stroke={shade(PM_AMBER, 0.2)} strokeWidth={D.product ? 7 : 3} />
        {carryShown > 0 && <text x={F.carry.x} y={F.carry.y + 11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={PM_INK.carry}>{carryShown}</text>}
        {/* the price of one thing */}
        {amount("price", priceParts[0], priceParts[1], F.price, F, inkFor(priceParts[1], true))}
        {/* the times sign and the count, outside both columns */}
        <rect x={F.box.x} y={F.box.y} width={F.box.w} height={F.box.h} rx={12} fill={boxOn ? tint(PM_SKY, 0.72) : "#FFFFFF"}
          stroke={shade(PM_SKY, 0.3)} strokeWidth={3} strokeDasharray={boxOn ? undefined : "10 8"} />
        {/* one text, so the times sign reads with its count: "× 6" */}
        <text y={F.times.y} fontSize={T.xl} fontWeight={700} fill={C.ink}>
          <tspan x={F.times.x} textAnchor="middle">×</tspan>
          {boxOn && <tspan x={F.box.x + F.box.w / 2} textAnchor="middle" fill={PM_INK.count}>{count}</tspan>}
        </text>
        {/* phase 2's correction: the count multiplies both columns of the price */}
        {D.bracket && <path d={`M ${F.box.x + F.box.w} ${F.box.y + 24} H ${F.rs[0] - 40} V ${F.price + 16} M ${F.rs[0] - 40} ${F.price + 16} H ${F.ps[1] + 30} V ${F.price + 4}`}
          fill="none" stroke={C.ink} strokeWidth={3} strokeLinejoin="round" pointerEvents="none" />}
        <line x1={F.rs[0] - 40} y1={F.rule} x2={F.w - 12} y2={F.rule} stroke={C.ink} strokeWidth={3} />
        {/* the answer line: the dot waits on it, and each place has its mark */}
        {[...F.rs, ...F.ps].map((x: number) => <line key={"u" + x} x1={x - 16} y1={F.answer + 10} x2={x + 16} y2={F.answer + 10} stroke={C.ink} strokeWidth={2} />)}
        {amount("ans", aR, aP, F.answer, F, inkFor(aP, whole))}
        {D.product && carried > 0 && <text x={F.rs[0] - 44} y={F.answer} textAnchor="end" fontSize={T.label} fontWeight={700} fill={PM_INK.carry}>{"+" + carried}</text>}
      </g>
    );
  };

  const paiseBox = () => {
    const bw = SP.w / 10, ch = SP.h / 5;
    const block = (b: number) => {
      const k = Math.max(0, Math.min(10, cells - 10 * b));
      return Array.from({ length: k }).map((_, c) => (
        <rect key={"c" + b + "-" + c} x={SP.x + b * bw + (c % 2) * (bw / 2)} y={SP.y + Math.floor(c / 2) * ch} width={bw / 2} height={ch} fill={PM_GREEN} />
      ));
    };
    return (
      <g>
        <rect x={PB.x} y={PB.y} width={PB.w} height={PB.h} rx={16} fill="#FFFFFF" stroke={C.ink} strokeWidth={2} />
        <text x={PB.x + 16} y={PB.y + 36} fontSize={T.micro} fontWeight={600} fill={PM_INK.ps}>{tx("paise")}</text>
        <text x={PB.x + PB.w / 2} y={PB.y + 96} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={PM_INK.ps}>{tot}</text>
        {/* the strip: a hundred cells in ten blocks of ten, so a full strip is exactly one rupee */}
        <rect x={SP.x} y={SP.y} width={SP.w} height={SP.h} fill="#FFFFFF" />
        {Array.from({ length: 10 }).map((_, b) => <g key={"b" + b}>{block(b)}</g>)}
        {Array.from({ length: 10 }).map((_, b) => <line key={"v" + b} x1={SP.x + b * bw + bw / 2} y1={SP.y} x2={SP.x + b * bw + bw / 2} y2={SP.y + SP.h} stroke={C.ink} strokeWidth={0.8} />)}
        {[1, 2, 3, 4].map((r) => <line key={"h" + r} x1={SP.x} y1={SP.y + r * ch} x2={SP.x + SP.w} y2={SP.y + r * ch} stroke={C.ink} strokeWidth={0.8} />)}
        {Array.from({ length: 9 }).map((_, b) => <line key={"k" + b} x1={SP.x + (b + 1) * bw} y1={SP.y} x2={SP.x + (b + 1) * bw} y2={SP.y + SP.h} stroke={C.ink} strokeWidth={2.5} />)}
        <rect x={SP.x} y={SP.y} width={SP.w} height={SP.h} fill="none" stroke={C.ink} strokeWidth={2.5} />
      </g>
    );
  };

  /* phase 4 and free play: the two-step card and the change bench */
  const bench = () => {
    const hr = String(held);
    const pays = !!it.pays;
    const cols = B;
    const short = free && S.cost >= 2 && leftP < 0;
    return (
      <g>
        <rect x={CD.x} y={CD.y} width={CD.w} height={CD.h} rx={16} fill="#FFFFFF" stroke={C.ink} strokeWidth={2} />
        <text x={CD.x + 18} y={CD.y + 38} fontSize={T.micro} fontWeight={600} fill={C.ink}>{pays ? tx("pays") : tx("has")}</text>
        {it.held && it.held.length > 1
          ? <g>
              <text x={CD.x + CD.w - 20} y={CD.y + 42} textAnchor="end" fontSize={T.label} fontWeight={700} fill={PM_INK.rs}>{pmRs(tx, it.held[0])}</text>
              <text x={CD.x + CD.w - 20} y={CD.y + 94} textAnchor="end" fontSize={T.label} fontWeight={700} fill={PM_INK.rs}>{"+ " + pmRs(tx, it.held[1])}</text>
            </g>
          : <text x={CD.x + CD.w / 2 + 30} y={CD.y + 92} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={PM_INK.rs}>{pmRs(tx, hr)}</text>}
        <rect x={B.x} y={B.y} width={B.w} height={B.h} rx={RAD.panel} fill={tint(C.panel, 0.55)} stroke={C.ink} strokeWidth={2} />
        {dotted(B.dot, B.y + 18, short ? B.rule - 6 : B.y + B.h - 12)}
        {/* the money held on top; a rupee broken into a hundred paise is written above it in amber */}
        {S.broken && <text y={B.above} fontSize={T.label} fontWeight={700} fill={PM_INK.carry}>
          {String(held - 1).split("").map((ch, i, a) => <tspan key={"b" + i} x={B.rs[B.rs.length - a.length + i]} textAnchor="middle">{ch}</tspan>)}
          <tspan x={(B.ps[0] + B.ps[1]) / 2} textAnchor="middle">100</tspan>
        </text>}
        {amount("held", hr, "00", B.top, cols, inkFor("00", true))}
        {S.broken && <line x1={B.rs[0] - 26} y1={B.top - 20} x2={B.rs[2] + 24} y2={B.top - 20} stroke={C.ink} strokeWidth={4} strokeLinecap="round" />}
        {S.broken && <line x1={B.ps[0] - 22} y1={B.top - 20} x2={B.ps[1] + 22} y2={B.top - 20} stroke={C.ink} strokeWidth={4} strokeLinecap="round" />}
        {/* the cost: a step, kept in a box of its own */}
        <text x={B.x + 22} y={B.cost} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={C.ink}>−</text>
        <rect x={B.costBox.x} y={B.costBox.y} width={B.costBox.w} height={B.costBox.h} rx={12} fill="#FFFFFF"
          stroke={D.ring ? C.accent : C.ink} strokeWidth={D.ring ? 7 : 2} />
        {S.cost >= 2 && amount("cost", String(costR), pad2(costPs), B.cost, cols, inkFor(pad2(costPs), false))}
        <line x1={B.x + 40} y1={B.rule} x2={B.x + B.w - 10} y2={B.rule} stroke={C.ink} strokeWidth={3} />
        {/* free play: a cost above the money held cannot be taken away, and the bench says so */}
        {short
          ? <text x={B.x + B.w / 2} y={B.answer - 6} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={C.ink}>{tx("not enough money")}</text>
          : <g>
              {[...B.rs, ...B.ps].map((x: number) => <line key={"u" + x} x1={x - 17} y1={B.answer + 8} x2={x + 17} y2={B.answer + 8} stroke={C.ink} strokeWidth={2} />)}
              {amount("left", leftOn ? String(Math.floor(leftP / 100)) : "", leftOn ? pad2(leftP % 100) : "", B.answer, cols, { rs: PM_INK.left, ps: PM_INK.left })}
            </g>}
      </g>
    );
  };

  /* free play: whole steps for the count, the rupees and the paise (the counter has no dot) */
  const freeKeys = () => {
    const key = (id: string, x: number, sign: string, label: string, off: boolean, fn: () => void) => (
      <Key key={id} id={id} x={x} y={448} w={72} h={72} C={C} label={label} disabled={off} onClick={fn}>
        <text y={14} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={off ? C.dim : C.ink}>{sign}</text>
      </Key>
    );
    const set = (o: any) => { an.stop(); setFp((f: any) => ({ ...f, ...o })); const b = blank("free"); sRef.current = b; setSt(b); api.sfx.tick(); };
    const [c0, c1] = Mo.free.count, [r0, r1] = Mo.free.rupees, [p0, p1, ps] = Mo.free.paise;
    return (
      <g>
        {key("count-less", 26, "−", "one thing fewer", fp.count <= c0, () => set({ count: fp.count - 1 }))}
        {key("count-more", 108, "+", "one thing more", fp.count >= c1, () => set({ count: fp.count + 1 }))}
        {key("rupee-less", 200, "−", "one rupee less", fp.r <= r0, () => set({ r: fp.r - 1 }))}
        {key("rupee-more", 282, "+", "one rupee more", fp.r >= r1, () => set({ r: fp.r + 1 }))}
        {key("paise-less", 364, "−", "five paise less", fp.p <= p0, () => set({ p: fp.p - ps }))}
        {key("paise-more", 446, "+", "five paise more", fp.p >= p1, () => set({ p: fp.p + ps }))}
        <Hit id="money-held" x={CD.x} y={CD.y} w={CD.w} h={CD.h} label="change the money held"
          onPress={() => set({ held: (fp.held + 1) % Mo.free.held.length })} />
      </g>
    );
  };

  /* the count card of phase 2: copied under the paise with a dot, lifted into its box */
  const dragging = drag.drag && drag.drag.payload === "count";
  const countCard = () => {
    if (it.kind !== "lift" || S.lift >= 2) return null;
    const at = dragging ? { x: drag.drag.x - ox - 52, y: drag.drag.y - 37 } : S.lift >= 1 ? { x: F.box.x + 2, y: F.box.y } : { x: F.dot - 18, y: F.box.y };
    const grab = S.lift === 0 && live;
    return (
      <g {...(grab ? { ...control("count-card", "the count, copied under the paise"), ...drag.bind("count"), ...drag.keys("count") } : {})}
        style={{ transform: `translate(${at.x}px,${at.y}px)`, transition: dragging ? "none" : "transform 420ms ease-out", cursor: grab ? "grab" : undefined } as any}>
        <rect x={0} y={0} width={104} height={74} rx={12} fill={tint(PM_SKY, 0.72)} stroke={shade(PM_SKY, 0.3)} strokeWidth={3} />
        <text y={56} fontSize={T.xl} fontWeight={700} fill={PM_INK.count}>
          {S.dot === 0 && <tspan x={18} textAnchor="middle" fill={PM_INK.dot}>.</tspan>}
          <tspan x={S.dot === 0 ? 54 : 52} textAnchor="middle">{count}</tspan>
        </text>
        {S.dot === 0 && <circle cx={18} cy={51} r={7.5} fill={PM_INK.dot} />}
      </g>
    );
  };
  /* its dot falls away and rolls off the frame */
  const fallingDot = () => (it.kind === "lift" && (S.dot === 1 || S.dot === 2)
    ? <circle cx={F.dot} cy={F.box.y + 51} r={7.5} fill={PM_INK.dot} pointerEvents="none"
        style={{ transform: S.dot === 2 ? "translate(60px, 130px)" : "translate(0px, 0px)", transition: "transform 600ms ease-in" } as any} />
    : null);
  /* a full strip rolls up into one rupee and drops into the carry circle */
  const rolling = () => {
    if (S.ph !== "rollA" && S.ph !== "rollB") return null;
    const go = S.ph === "rollB";
    const tr = go ? `translate(${F.carry.x - 16}px, ${F.carry.y - 4}px) scale(0.13)` : `translate(${SP.x}px, ${SP.y}px) scale(1)`;
    return (
      <g pointerEvents="none" style={{ transform: tr, transformOrigin: "0px 0px", transition: go ? "transform 380ms ease-in" : "none" } as any}>
        <rect x={0} y={0} width={SP.w} height={SP.h} rx={6} fill={PM_AMBER} stroke={shade(PM_AMBER, 0.3)} strokeWidth={3} />
      </g>
    );
  };

  /* the one invite */
  let inv: any = null;
  if ((stage === "ask" || stage === "teach") && !tl.busy && !an.busy) {
    if (it.kind === "lift") { if (S.lift === 0) inv = { x: F.dot + 34, y: F.box.y + 37, r: 60 }; }
    else if (S.target === 0) inv = { x: ox + (F.ps[0] + F.ps[1]) / 2, y: F.price - 20, r: 54 };
    else if (needBreak) inv = { x: B.rs[1], y: B.top - 20, r: 58 };
    if (inv && it.kind === "lift") inv.x += ox;
  }

  return (
    <g>
      {runs()}
      {row()}
      <g transform={`translate(${ox},0)`}>
        {frame()}
        {paiseBox()}
        {/* the paise of the price: one tap buys one more thing */}
        {live && it.kind !== "lift" && S.target < count && (
          <Hit id="price-paise" x={F.ps[0] - 30} y={F.price - 54} w={F.ps[1] - F.ps[0] + 60} h={72} onPress={pour} label="the paise of one thing: buy one more" />
        )}
        {countCard()}
        {fallingDot()}
        {rolling()}
      </g>
      {twoStep && bench()}
      {free && freeKeys()}
      {live && needBreak && (
        <Hit id="break-rupee" x={B.rs[0] - 30} y={B.top - 58} w={B.rs[2] - B.rs[0] + 60} h={72} onPress={breakRupee} label="break one rupee into a hundred paise" />
      )}
      {inv && <Invite x={inv.x} y={inv.y} r={inv.r} C={C} />}
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase:
   result.last = { value, answer, kind, item, shared } (shared = what api.share held at that moment) */
function Thumb({ result, C, w, h, lang = "en", tx = (v: any) => v }: any) {
  const last = result && result.last;
  if (!last || last.value === null || last.value === undefined) return null;
  const sh = last.shared || {};
  const change = last.kind === "change";
  /* "Rs 750 − 651.20": the second "Rs" would run past the 236-wide box at the type floor */
  const top = change ? (pmRs(tx, sh.held) + " − " + (sh.price && sh.count ? pmMoney(pmSplit(sh.price).r * 100 * sh.count + pmSplit(sh.price).p * sh.count) : ""))
    : (pmRs(tx, sh.price) + " × " + sh.count);
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      <text x={w / 2} y={h / 2 - 6} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{top}</text>
      <text x={w / 2} y={h / 2 + 30} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={change ? PM_INK.left : PM_INK.rs}>{pmRs(tx, pmNorm(last.value))}</text>
    </g>
  );
}

function PriceMultiplier(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, format, pointKey: true, fitHost: () => null }} />
  );
}

export default PriceMultiplier;
