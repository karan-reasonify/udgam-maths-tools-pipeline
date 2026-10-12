/* ═══ M2.S3.T5.C16.2D1 · half_symbol_bench · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists: header + its three controls, canvas, slot + pad, bubble + mascot,
   phase dots (user / AI mode), window.toolApi, sounds, the synced voice, scoring, the events,
   idle and restart. NO imports in this file; only the five host hooks. Follow docs/LAYOUT.md.
   Edit, never rewrite. Built by `node cli.mjs scaffold`; concepts are verbatim (check compares them). */

const TOOL_ID = "half_symbol_bench";
const MEDIA_ID = "M2.S3.T5.C16.2D1";
const TOOL_NAME = "Half Symbol Bench";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
const VOICE = {"rate":0.92,"pitch":1.06};

/* spoken before phase 1's teach lines only (the plan's opening voice line) */
const OPENING = ["One whole picture on the key card. What would half of it stand for?"];
/* the whole-tool line: spoken on the summary page */
const FINISH_LINE = "Halves read from the key, rows added up, and a shared stop found in both rows.";
/* said when the child opens Free play from the summary page. The plan's line also promised "any routes";
   free play here is the key card, the fold and three rows to build, so the line says what is really open. */
const FREE_LINE = "Free play. Pick a key that halves, fold it, and build rows to add up.";

/* Hindi and Gujarati (docs/PATTERNS.md §11): every line above and below stays English, exactly as the checks
   read it; this table is keyed by that English, byte for byte, and the runtime looks each spoken or drawn
   line up in it (`node cli.mjs voice` lists every spoken line still missing, then bakes the voice).
   Terms: pictograph चित्रालेख / ચિત્રાલેખ, key कुंजी / ચાવી, row पंक्ति / હાર, symbol प्रतीक / પ્રતીક, half आधा / અડધું. */
const TR: any = {
  hi: {
    "Half Symbol Bench": "आधे प्रतीक की मेज़",
    "One whole picture on the key card. What would half of it stand for?": "कुंजी कार्ड पर एक पूरा चित्र है। उसका आधा कितना दर्शाएगा?",
    "Halves read from the key, rows added up, and a shared stop found in both rows.": "कुंजी से आधे पढ़े, पंक्तियाँ जोड़ीं, और दोनों पंक्तियों में साझा स्टॉप खोजा।",
    "Free play. Pick a key that halves, fold it, and build rows to add up.": "मुक्त खेल। आधी होने वाली कुंजी चुनो, मोड़ो, और पंक्तियाँ बनाकर जोड़ो।",
    /* phase 1 */
    "Half a symbol": "आधा प्रतीक",
    "The whole one stands for this many.": "पूरा चित्र इतने को दर्शाता है।",
    "The two halves of a picture share its worth equally.": "चित्र के दोनों आधे उसका मान बराबर बाँटते हैं।",
    "Half a picture holds one of two equal heaps. The whole picture holds both heaps.": "आधे चित्र में दो बराबर ढेरों में से एक ढेर है। पूरे चित्र में दोनों ढेर हैं।",
    "Half a symbol stands for half of what the key says.": "आधा प्रतीक कुंजी के मान का आधा दर्शाता है।",
    "You learned: half a symbol stands for half of what the key says.": "तुमने सीखा: आधा प्रतीक कुंजी के मान का आधा दर्शाता है।",
    "One bottle picture stands for 6 bottles. What does half a bottle picture stand for?": "बोतल का एक चित्र 6 बोतलें दर्शाता है। बोतल का आधा चित्र कितनी बोतलें दर्शाता है?",
    "Half a bottle stands for?": "आधी बोतल कितनी दर्शाए?",
    "A piece of the picture is not one bottle. The whole picture holds more than one.": "चित्र का एक टुकड़ा एक बोतल नहीं है। पूरे चित्र में एक से ज़्यादा बोतलें हैं।",
    "This time a tree picture stands for 10 trees. How many trees does its half show?": "इस बार पेड़ का एक चित्र 10 पेड़ दर्शाता है। उसका आधा कितने पेड़ दिखाता है?",
    "Half a tree stands for?": "आधा पेड़ कितने दर्शाए?",
    "The half is smaller than the whole tree picture. Is its worth smaller too?": "आधा, पेड़ के पूरे चित्र से छोटा है। क्या उसका मान भी छोटा है?",
    "A key says half a star stands for 4 stickers. What does a whole star stand for?": "एक कुंजी कहती है कि आधा तारा 4 स्टिकर दर्शाता है। पूरा तारा कितने दर्शाता है?",
    "A whole star stands for?": "पूरा तारा कितने दर्शाए?",
    "That is what the half shows. Unfold it: a whole star is made of two halves.": "यह तो आधा दिखाता है। उसे खोलो: पूरा तारा दो आधों से बनता है।",
    /* phase 2 */
    "A row that ends in a half": "आधे पर ख़त्म होती पंक्ति",
    "Read the whole ones first. Then what does the half add?": "पहले पूरे चित्र पढ़ो। फिर आधा कितना जोड़ता है?",
    "Half a picture adds half of what the key says.": "आधा चित्र कुंजी के मान का आधा जोड़ता है।",
    "Tap the row to count its pictures. Work out the whole ones and the half, then add the two parts.": "चित्र गिनने के लिए पंक्ति पर टैप करो। पूरे चित्रों और आधे का मान निकालो, फिर दोनों जोड़ो।",
    "A row ending in a half is its whole symbols times the key, add half the key.": "आधे पर ख़त्म होती पंक्ति में पूरे प्रतीकों को कुंजी से गुणा करो। फिर कुंजी का आधा जोड़ो।",
    "You learned: a row is its whole symbols times the key, add half the key.": "तुमने सीखा: पूरे प्रतीकों को कुंजी से गुणा करो, कुंजी का आधा जोड़ो।",
    "One bus picture stands for 8 children. A row holds 4 whole bus pictures and a half. How many children does it show?": "बस का एक चित्र 8 बच्चे दर्शाता है। एक पंक्ति में बस के 4 पूरे चित्र और एक आधा है। यह कितने बच्चे दिखाती है?",
    "Children in the row?": "पंक्ति में कितने बच्चे?",
    "The last bus is only half a picture. Does it carry as many children as a whole bus?": "आख़िरी बस सिर्फ़ आधा चित्र है। क्या उसमें पूरी बस जितने बच्चे हैं?",
    "On a shelf, each book picture means 2 books. There are 5 whole book pictures and a half. How many books is that?": "अलमारी में किताब का हर चित्र 2 किताबें है। किताब के 5 पूरे चित्र और एक आधा है। ये कितनी किताबें हुईं?",
    "Books in the row?": "पंक्ति में कितनी किताबें?",
    "Is the last book picture a whole one or a half?": "किताब का आख़िरी चित्र पूरा है या आधा?",
    "One flag picture stands for 6 flags. Three rows hold 3 and a half, 5, and 2 and a half flag pictures. How many flags does each row show?": "झंडे का एक चित्र 6 झंडे दर्शाता है। तीन पंक्तियों में 3 और आधा, 5, और 2 और आधा चित्र हैं। हर पंक्ति कितने झंडे दिखाती है?",
    "Flags in each row?": "हर पंक्ति में झंडे?",
    "Rows 1 and 3 end in half a flag, and a half is worth less than a whole.": "पंक्ति 1 और 3 आधे झंडे पर ख़त्म होती हैं। आधे का मान पूरे से कम है।",
    /* phase 3 */
    "Adding the rows for a total": "कुल के लिए पंक्तियाँ जोड़ना",
    "Add every row. Does each thing sit in one row only?": "हर पंक्ति जोड़ो। क्या हर चीज़ सिर्फ़ एक पंक्ति में है?",
    "Each tag already counts its whole row. Add the three tags.": "हर टैग अपनी पूरी पंक्ति गिन चुका है। तीनों टैग जोड़ो।",
    "Add two rows first. Then add the third row to that.": "पहले दो पंक्तियाँ जोड़ो। फिर उसमें तीसरी पंक्ति जोड़ो।",
    "A pictograph's total is every row added once, and it counts each thing once when nothing sits in two rows.": "चित्रालेख का कुल हर पंक्ति को एक बार जोड़कर मिलता है। कोई चीज़ दो पंक्तियों में न हो, तो हर चीज़ एक बार गिनी जाती है।",
    "You learned: a total adds every row once, if nothing sits in two rows.": "तुमने सीखा: हर पंक्ति एक बार जोड़ो, अगर कुछ दो पंक्तियों में न हो।",
    "A pictograph of saplings planted by three classes has the key one sapling picture for 4 saplings. The rows hold 5 and a half, 3, and 6 and a half pictures. Each sapling was planted by one class. How many saplings were planted in all?": "तीन कक्षाओं ने पौधे लगाए। चित्रालेख की कुंजी में पौधे का एक चित्र 4 पौधे दर्शाता है। पंक्तियों में 5 और आधा, 3, और 6 और आधा चित्र हैं। हर पौधा एक ही कक्षा ने लगाया। कुल कितने पौधे लगाए गए?",
    "Saplings in all?": "कुल कितने पौधे?",
    "What does each row stand for? Put all three together.": "हर पंक्ति कितना दर्शाती है? तीनों को साथ जोड़ो।",
    "Rows stand for 18, 25 and 11 marbles, and each marble is in one bag only. How many marbles are there in all?": "पंक्तियाँ 18, 25 और 11 कंचे दर्शाती हैं। हर कंचा सिर्फ़ एक थैली में है। कुल कितने कंचे हैं?",
    "Marbles in all?": "कुल कितने कंचे?",
    "Every bag counts. Did all three bags go into your sum?": "हर थैली गिनी जाती है। क्या तीनों थैलियाँ तुम्हारे जोड़ में आईं?",
    "One jar picture stands for 10 jars of pickle. A shop's rows for three weeks hold 4, 2 and a half, and 3 and a half jar pictures. How many jars were sold in the three weeks?": "बरनी का एक चित्र अचार की 10 बरनियाँ दर्शाता है। एक दुकान की तीन हफ़्तों की पंक्तियों में 4, 2 और आधा, और 3 और आधा चित्र हैं। तीन हफ़्तों में कितनी बरनियाँ बिकीं?",
    "Jars sold in all?": "कुल कितनी बरनियाँ बिकीं?",
    "Weeks 2 and 3 end in half a jar, worth less than a whole jar.": "हफ़्ता 2 और 3 आधी बरनी पर ख़त्म होते हैं। आधी बरनी पूरी से कम है।",
    /* phase 4 */
    "Counted twice": "दो बार गिना गया",
    "Is this stop in one row, or in both? How many times does the sum count it?": "क्या यह स्टॉप एक पंक्ति में है, या दोनों में? जोड़ इसे कितनी बार गिनता है?",
    "How many rows count the shared one?": "साझा वाले को कितनी पंक्तियाँ गिनती हैं?",
    "Tap where the routes or rings meet. Then look beside each row.": "जहाँ रास्ते या घेरे मिलते हैं, वहाँ टैप करो। फिर हर पंक्ति के पास देखो।",
    "When one thing sits in two rows, adding the rows counts it twice. The rows alone cannot say how many separate things there are.": "जब एक चीज़ दो पंक्तियों में हो, तो जोड़ में वह दो बार गिनी जाती है। सिर्फ़ पंक्तियों से अलग-अलग चीज़ों की गिनती पता नहीं चलती।",
    "You learned: adding rows counts a thing once for every row it sits in.": "तुमने सीखा: जोड़ चीज़ को उतनी बार गिनता है, जितनी पंक्तियों में वह है।",
    "Two bus routes, the hill route and the lake route, share one stop. A pictograph shows 6 stops for the hill route and 5 for the lake route. The rows add up to 11. Is 11 the number of separate stops?": "दो बस रास्ते, पहाड़ी रास्ता और झील रास्ता, एक स्टॉप साझा करते हैं। चित्रालेख में पहाड़ी रास्ते के 6 स्टॉप और झील रास्ते के 5 हैं। पंक्तियों का जोड़ 11 है। क्या 11 अलग-अलग स्टॉप की संख्या है?",
    "Is 11 separate stops?": "क्या 11 अलग स्टॉप हैं?",
    "Which stop is on both routes?": "कौन-सा स्टॉप दोनों रास्तों पर है?",
    "Three clubs list their members: art 9, music 7 and chess 6. Two children are in both art and music. The rows add up to 22. Is 22 the number of separate children in the clubs?": "तीन क्लबों के सदस्य हैं: कला 9, संगीत 7 और शतरंज 6। दो बच्चे कला और संगीत दोनों में हैं। पंक्तियों का जोड़ 22 है। क्या 22 क्लबों के अलग-अलग बच्चों की संख्या है?",
    "Is 22 separate children?": "क्या 22 अलग बच्चे हैं?",
    "Find the children inside both rings. Which rows count them?": "दोनों घेरों के अंदर वाले बच्चे खोजो। कौन-सी पंक्तियाँ उन्हें गिनती हैं?",
    "A pictograph shows the stops of three bus routes, one stop picture for 2 stops. The rows hold 3 pictures, 2 and a half pictures, and 4 pictures. All three routes stop at the market. What do the rows add up to, and how many times is the market stop counted in that sum?": "एक चित्रालेख तीन बस रास्तों के स्टॉप दिखाता है। स्टॉप का एक चित्र 2 स्टॉप दर्शाता है। पंक्तियों में 3 चित्र, 2 और आधा चित्र, और 4 चित्र हैं। तीनों रास्ते बाज़ार पर रुकते हैं। पंक्तियों का जोड़ कितना है? उस जोड़ में बाज़ार स्टॉप कितनी बार गिना गया?",
    "Rows add to? Market counted?": "जोड़? बाज़ार कितनी बार?",
    "Read each row with the key and add. Then find the market in every row.": "हर पंक्ति कुंजी से पढ़ो और जोड़ो। फिर हर पंक्ति में बाज़ार खोजो।",
    /* the answer slot: choices, box labels and the unit */
    "yes": "हाँ", "no": "नहीं",
    "row 1": "पंक्ति 1", "row 2": "पंक्ति 2", "row 3": "पंक्ति 3", "sum": "जोड़", "market": "बाज़ार", "times": "बार",
    /* what the working area and the summary draw */
    "Key": "कुंजी", "whole": "पूरे", "half": "आधा", "rows read": "पढ़ी पंक्तियाँ", "rows added": "जोड़ी पंक्तियाँ",
    "bottles": "बोतलें", "trees": "पेड़", "stickers": "स्टिकर", "children": "बच्चे", "books": "किताबें", "flags": "झंडे",
    "saplings": "पौधे", "marbles": "कंचे", "jars": "बरनियाँ", "stop": "स्टॉप", "stops": "स्टॉप",
    "Children on buses": "बसों में बच्चे", "Books on a shelf": "अलमारी में किताबें", "Flags made": "बने झंडे",
    "Saplings planted": "लगाए गए पौधे", "Marbles in bags": "थैलियों में कंचे", "Pickle jars sold": "बिकी अचार की बरनियाँ",
    "Bus routes": "बस रास्ते", "Club members": "क्लब के सदस्य",
    "buses": "बसें", "bag 1": "थैली 1", "bag 2": "थैली 2", "bag 3": "थैली 3", "week 1": "हफ़्ता 1", "week 2": "हफ़्ता 2", "week 3": "हफ़्ता 3",
    "hill": "पहाड़ी", "lake": "झील", "art": "कला", "music": "संगीत", "chess": "शतरंज", "river": "नदी", "park": "पार्क", "fort": "किला",
    "saplings in all": "कुल पौधे", "marbles in all": "कुल कंचे", "jars in all": "कुल बरनियाँ",
    "stops on routes": "रास्तों पर स्टॉप", "places in clubs": "क्लबों में जगहें", "separate stops": "अलग-अलग स्टॉप", "separate children": "अलग-अलग बच्चे",
    "Members": "सदस्य", "Route map": "रास्तों का नक्शा", "School": "स्कूल", "Asha, Ravi": "आशा, रवि", "Market": "बाज़ार",
    "My pictograph": "मेरा चित्रालेख", "in all": "कुल", "counted twice": "दो बार गिना",
  },
  gu: {
    "Half Symbol Bench": "અડધા પ્રતીકનું ટેબલ",
    "One whole picture on the key card. What would half of it stand for?": "ચાવી કાર્ડ પર એક આખું ચિત્ર છે. તેનું અડધું કેટલું દર્શાવશે?",
    "Halves read from the key, rows added up, and a shared stop found in both rows.": "ચાવીથી અડધા વાંચ્યા, હાર ઉમેરી, અને બંને હારમાં સહિયારું સ્ટોપ શોધ્યું.",
    "Free play. Pick a key that halves, fold it, and build rows to add up.": "મુક્ત રમત. અડધી થાય એવી ચાવી લો, વાળો, અને હાર બનાવી ઉમેરો.",
    /* phase 1 */
    "Half a symbol": "અડધું પ્રતીક",
    "The whole one stands for this many.": "આખું ચિત્ર આટલા દર્શાવે છે.",
    "The two halves of a picture share its worth equally.": "ચિત્રના બંને અડધા તેનું મૂલ્ય સરખું વહેંચે છે.",
    "Half a picture holds one of two equal heaps. The whole picture holds both heaps.": "અડધા ચિત્રમાં બે સરખા ઢગલામાંથી એક ઢગલો છે. આખા ચિત્રમાં બંને ઢગલા છે.",
    "Half a symbol stands for half of what the key says.": "અડધું પ્રતીક ચાવીના મૂલ્યનું અડધું દર્શાવે છે.",
    "You learned: half a symbol stands for half of what the key says.": "તમે શીખ્યા: અડધું પ્રતીક ચાવીના મૂલ્યનું અડધું દર્શાવે છે.",
    "One bottle picture stands for 6 bottles. What does half a bottle picture stand for?": "બોટલનું એક ચિત્ર 6 બોટલ દર્શાવે છે. બોટલનું અડધું ચિત્ર કેટલી બોટલ દર્શાવે છે?",
    "Half a bottle stands for?": "અડધી બોટલ કેટલી દર્શાવે?",
    "A piece of the picture is not one bottle. The whole picture holds more than one.": "ચિત્રનો એક ટુકડો એક બોટલ નથી. આખા ચિત્રમાં એકથી વધુ બોટલ છે.",
    "This time a tree picture stands for 10 trees. How many trees does its half show?": "આ વખતે ઝાડનું એક ચિત્ર 10 ઝાડ દર્શાવે છે. તેનું અડધું કેટલાં ઝાડ બતાવે છે?",
    "Half a tree stands for?": "અડધું ઝાડ કેટલાં દર્શાવે?",
    "The half is smaller than the whole tree picture. Is its worth smaller too?": "અડધું, ઝાડના આખા ચિત્રથી નાનું છે. શું તેનું મૂલ્ય પણ નાનું છે?",
    "A key says half a star stands for 4 stickers. What does a whole star stand for?": "એક ચાવી કહે છે કે અડધો તારો 4 સ્ટીકર દર્શાવે છે. આખો તારો કેટલાં દર્શાવે છે?",
    "A whole star stands for?": "આખો તારો કેટલાં દર્શાવે?",
    "That is what the half shows. Unfold it: a whole star is made of two halves.": "એ તો અડધું બતાવે છે. તેને ખોલો: આખો તારો બે અડધાથી બને છે.",
    /* phase 2 */
    "A row that ends in a half": "અડધા પર પૂરી થતી હાર",
    "Read the whole ones first. Then what does the half add?": "પહેલાં આખાં ચિત્રો વાંચો. પછી અડધું કેટલું ઉમેરે છે?",
    "Half a picture adds half of what the key says.": "અડધું ચિત્ર ચાવીના મૂલ્યનું અડધું ઉમેરે છે.",
    "Tap the row to count its pictures. Work out the whole ones and the half, then add the two parts.": "ચિત્રો ગણવા હાર પર ટૅપ કરો. આખાં ચિત્રો અને અડધાનું મૂલ્ય શોધો, પછી બંને ઉમેરો.",
    "A row ending in a half is its whole symbols times the key, add half the key.": "અડધા પર પૂરી થતી હારમાં આખાં પ્રતીકોને ચાવીથી ગુણો. પછી ચાવીનું અડધું ઉમેરો.",
    "You learned: a row is its whole symbols times the key, add half the key.": "તમે શીખ્યા: આખાં પ્રતીકોને ચાવીથી ગુણો, ચાવીનું અડધું ઉમેરો.",
    "One bus picture stands for 8 children. A row holds 4 whole bus pictures and a half. How many children does it show?": "બસનું એક ચિત્ર 8 બાળકો દર્શાવે છે. એક હારમાં બસનાં 4 આખાં ચિત્રો અને એક અડધું છે. તે કેટલાં બાળકો બતાવે છે?",
    "Children in the row?": "હારમાં કેટલાં બાળકો?",
    "The last bus is only half a picture. Does it carry as many children as a whole bus?": "છેલ્લી બસ ફક્ત અડધું ચિત્ર છે. શું તેમાં આખી બસ જેટલાં બાળકો છે?",
    "On a shelf, each book picture means 2 books. There are 5 whole book pictures and a half. How many books is that?": "છાજલી પર પુસ્તકનું દરેક ચિત્ર 2 પુસ્તકો છે. પુસ્તકનાં 5 આખાં ચિત્રો અને એક અડધું છે. એ કેટલાં પુસ્તકો થયાં?",
    "Books in the row?": "હારમાં કેટલાં પુસ્તકો?",
    "Is the last book picture a whole one or a half?": "પુસ્તકનું છેલ્લું ચિત્ર આખું છે કે અડધું?",
    "One flag picture stands for 6 flags. Three rows hold 3 and a half, 5, and 2 and a half flag pictures. How many flags does each row show?": "ધ્વજનું એક ચિત્ર 6 ધ્વજ દર્શાવે છે. ત્રણ હારમાં 3 અને અડધું, 5, અને 2 અને અડધું ચિત્રો છે. દરેક હાર કેટલા ધ્વજ બતાવે છે?",
    "Flags in each row?": "દરેક હારમાં ધ્વજ?",
    "Rows 1 and 3 end in half a flag, and a half is worth less than a whole.": "હાર 1 અને 3 અડધા ધ્વજ પર પૂરી થાય છે. અડધાનું મૂલ્ય આખા કરતાં ઓછું છે.",
    /* phase 3 */
    "Adding the rows for a total": "કુલ માટે હાર ઉમેરવી",
    "Add every row. Does each thing sit in one row only?": "દરેક હાર ઉમેરો. શું દરેક વસ્તુ ફક્ત એક હારમાં છે?",
    "Each tag already counts its whole row. Add the three tags.": "દરેક ટૅગ પોતાની આખી હાર ગણી ચૂક્યું છે. ત્રણેય ટૅગ ઉમેરો.",
    "Add two rows first. Then add the third row to that.": "પહેલાં બે હાર ઉમેરો. પછી તેમાં ત્રીજી હાર ઉમેરો.",
    "A pictograph's total is every row added once, and it counts each thing once when nothing sits in two rows.": "ચિત્રાલેખનો કુલ દરેક હાર એક વાર ઉમેરીને મળે છે. કોઈ વસ્તુ બે હારમાં ન હોય, તો દરેક વસ્તુ એક વાર ગણાય છે.",
    "You learned: a total adds every row once, if nothing sits in two rows.": "તમે શીખ્યા: દરેક હાર એક વાર ઉમેરો, જો કંઈ બે હારમાં ન હોય.",
    "A pictograph of saplings planted by three classes has the key one sapling picture for 4 saplings. The rows hold 5 and a half, 3, and 6 and a half pictures. Each sapling was planted by one class. How many saplings were planted in all?": "ત્રણ વર્ગોએ રોપા વાવ્યા. ચિત્રાલેખની ચાવીમાં રોપાનું એક ચિત્ર 4 રોપા દર્શાવે છે. હારમાં 5 અને અડધું, 3, અને 6 અને અડધું ચિત્રો છે. દરેક રોપો એક જ વર્ગે વાવ્યો. કુલ કેટલા રોપા વાવ્યા?",
    "Saplings in all?": "કુલ કેટલા રોપા?",
    "What does each row stand for? Put all three together.": "દરેક હાર કેટલું દર્શાવે છે? ત્રણેયને સાથે ઉમેરો.",
    "Rows stand for 18, 25 and 11 marbles, and each marble is in one bag only. How many marbles are there in all?": "હાર 18, 25 અને 11 લખોટી દર્શાવે છે. દરેક લખોટી ફક્ત એક થેલીમાં છે. કુલ કેટલી લખોટી છે?",
    "Marbles in all?": "કુલ કેટલી લખોટી?",
    "Every bag counts. Did all three bags go into your sum?": "દરેક થેલી ગણાય છે. શું ત્રણેય થેલી તમારા સરવાળામાં આવી?",
    "One jar picture stands for 10 jars of pickle. A shop's rows for three weeks hold 4, 2 and a half, and 3 and a half jar pictures. How many jars were sold in the three weeks?": "બરણીનું એક ચિત્ર અથાણાની 10 બરણી દર્શાવે છે. એક દુકાનની ત્રણ સપ્તાહની હારમાં 4, 2 અને અડધું, અને 3 અને અડધું ચિત્રો છે. ત્રણ સપ્તાહમાં કેટલી બરણી વેચાઈ?",
    "Jars sold in all?": "કુલ કેટલી બરણી વેચાઈ?",
    "Weeks 2 and 3 end in half a jar, worth less than a whole jar.": "સપ્તાહ 2 અને 3 અડધી બરણી પર પૂરાં થાય છે. અડધી બરણી આખીથી ઓછી છે.",
    /* phase 4 */
    "Counted twice": "બે વાર ગણાયું",
    "Is this stop in one row, or in both? How many times does the sum count it?": "શું આ સ્ટોપ એક હારમાં છે, કે બંનેમાં? સરવાળો તેને કેટલી વાર ગણે છે?",
    "How many rows count the shared one?": "સહિયારાને કેટલી હાર ગણે છે?",
    "Tap where the routes or rings meet. Then look beside each row.": "જ્યાં રસ્તા કે વર્તુળો મળે છે, ત્યાં ટૅપ કરો. પછી દરેક હારની બાજુમાં જુઓ.",
    "When one thing sits in two rows, adding the rows counts it twice. The rows alone cannot say how many separate things there are.": "એક વસ્તુ બે હારમાં હોય, તો સરવાળો તેને બે વાર ગણે છે. ફક્ત હારથી જુદી જુદી વસ્તુઓની ગણતરી ખબર પડતી નથી.",
    "You learned: adding rows counts a thing once for every row it sits in.": "તમે શીખ્યા: વસ્તુ જેટલી હારમાં હોય, સરવાળો તેને એટલી વાર ગણે.",
    "Two bus routes, the hill route and the lake route, share one stop. A pictograph shows 6 stops for the hill route and 5 for the lake route. The rows add up to 11. Is 11 the number of separate stops?": "બે બસ રસ્તા, ટેકરી રસ્તો અને તળાવ રસ્તો, એક સ્ટોપ વહેંચે છે. ચિત્રાલેખમાં ટેકરી રસ્તાનાં 6 સ્ટોપ અને તળાવ રસ્તાનાં 5 છે. હારનો સરવાળો 11 છે. શું 11 જુદાં જુદાં સ્ટોપની સંખ્યા છે?",
    "Is 11 separate stops?": "શું 11 જુદાં સ્ટોપ છે?",
    "Which stop is on both routes?": "કયું સ્ટોપ બંને રસ્તા પર છે?",
    "Three clubs list their members: art 9, music 7 and chess 6. Two children are in both art and music. The rows add up to 22. Is 22 the number of separate children in the clubs?": "ત્રણ ક્લબના સભ્યો છે: કળા 9, સંગીત 7 અને શતરંજ 6. બે બાળકો કળા અને સંગીત બંનેમાં છે. હારનો સરવાળો 22 છે. શું 22 ક્લબનાં જુદાં જુદાં બાળકોની સંખ્યા છે?",
    "Is 22 separate children?": "શું 22 જુદાં બાળકો છે?",
    "Find the children inside both rings. Which rows count them?": "બંને વર્તુળની અંદરનાં બાળકો શોધો. કઈ હાર તેમને ગણે છે?",
    "A pictograph shows the stops of three bus routes, one stop picture for 2 stops. The rows hold 3 pictures, 2 and a half pictures, and 4 pictures. All three routes stop at the market. What do the rows add up to, and how many times is the market stop counted in that sum?": "એક ચિત્રાલેખ ત્રણ બસ રસ્તાનાં સ્ટોપ બતાવે છે. સ્ટોપનું એક ચિત્ર 2 સ્ટોપ દર્શાવે છે. હારમાં 3 ચિત્રો, 2 અને અડધું ચિત્ર, અને 4 ચિત્રો છે. ત્રણેય રસ્તા બજાર પર ઊભા રહે છે. હારનો સરવાળો કેટલો છે? એ સરવાળામાં બજાર સ્ટોપ કેટલી વાર ગણાયું?",
    "Rows add to? Market counted?": "હારનો સરવાળો? બજાર કેટલી વાર?",
    "Read each row with the key and add. Then find the market in every row.": "દરેક હાર ચાવીથી વાંચો અને ઉમેરો. પછી દરેક હારમાં બજાર શોધો.",
    /* the answer slot: choices, box labels and the unit */
    "yes": "હા", "no": "ના",
    "row 1": "હાર 1", "row 2": "હાર 2", "row 3": "હાર 3", "sum": "સરવાળો", "market": "બજાર", "times": "વાર",
    /* what the working area and the summary draw */
    "Key": "ચાવી", "whole": "આખા", "half": "અડધું", "rows read": "વાંચેલી હાર", "rows added": "ઉમેરેલી હાર",
    "bottles": "બોટલ", "trees": "ઝાડ", "stickers": "સ્ટીકર", "children": "બાળકો", "books": "પુસ્તકો", "flags": "ધ્વજ",
    "saplings": "રોપા", "marbles": "લખોટી", "jars": "બરણી", "stop": "સ્ટોપ", "stops": "સ્ટોપ",
    "Children on buses": "બસમાં બાળકો", "Books on a shelf": "છાજલી પર પુસ્તકો", "Flags made": "બનાવેલા ધ્વજ",
    "Saplings planted": "વાવેલા રોપા", "Marbles in bags": "થેલીઓમાં લખોટી", "Pickle jars sold": "વેચાયેલી અથાણાની બરણી",
    "Bus routes": "બસ રસ્તા", "Club members": "ક્લબના સભ્યો",
    "buses": "બસ", "bag 1": "થેલી 1", "bag 2": "થેલી 2", "bag 3": "થેલી 3", "week 1": "સપ્તાહ 1", "week 2": "સપ્તાહ 2", "week 3": "સપ્તાહ 3",
    "hill": "ટેકરી", "lake": "તળાવ", "art": "કળા", "music": "સંગીત", "chess": "શતરંજ", "river": "નદી", "park": "પાર્ક", "fort": "કિલ્લો",
    "saplings in all": "કુલ રોપા", "marbles in all": "કુલ લખોટી", "jars in all": "કુલ બરણી",
    "stops on routes": "રસ્તા પરનાં સ્ટોપ", "places in clubs": "ક્લબમાં જગ્યાઓ", "separate stops": "જુદાં જુદાં સ્ટોપ", "separate children": "જુદાં જુદાં બાળકો",
    "Members": "સભ્યો", "Route map": "રસ્તાનો નકશો", "School": "શાળા", "Asha, Ravi": "આશા, રવિ", "Market": "બજાર",
    "My pictograph": "મારો ચિત્રાલેખ", "in all": "કુલ", "counted twice": "બે વાર ગણ્યું",
  },
};

/* the chapter's content colours: a symbol is green; what a row, a half or a key stands for once read is
   amber; a total, and a thing a total counts more than once, is reddish purple; the row a question asks
   about has a pale sky blue band behind it. Coloured numerals use a deeper ink so they read on white. */
const HS_GREEN = CONTENT.one;
const HS_AMB = shade(CONTENT.ten, 0.4);
const HS_PUR = shade(CONTENT.bead, 0.3);
const HS_SKY = tint("#56B4E9", 0.72);
const hsIds = (p: string, k: number) => Array.from({ length: k }, (_, j) => p + (j + 1));
const HS_YESNO = [{ id: "yes", label: "yes" }, { id: "no", label: "no" }];

/* One entry per phase = one mount. Item fields the working area reads:
   sym    the symbol drawn (bottle, tree, star, bus, book, flag, sapling, jar, stop, child)
   key    what one whole symbol stands for; half (phase 1, 3rd item) what half a symbol stands for
   rows   [{ name, n }] n = symbols in the row, a half as .5 (always last in its row); or { name, v } when the
          row is only its number (the marble bags)
   routes phase 4: the stops of each route (or the members of each club), shared ones by name in sharedIds
   near   the item's misconception (judge rejects it) */
const PHASES = [
  {
    n: 1,
    concept: "Half a symbol",
    conceptId: "M2.S3.T5.C16", objectiveIds: ["O7"],
    /* the plan's teach line, cut to its first sentence: the opening has just asked what half stands for */
    says: ["The whole one stands for this many."],
    /* tries, as the plan writes it: first rung, the item's own miss; second, what is half of that; third, a key
       cut to a symbol for two, folded. Rungs 2 and 3 are said here so they fit both directions (fold and unfold). */
    ladder: ["The two halves of a picture share its worth equally.", "Half a picture holds one of two equal heaps. The whole picture holds both heaps."],
    closing: "Half a symbol stands for half of what the key says.",
    learned: "You learned: half a symbol stands for half of what the key says.",
    traceback: "The fold runs again: the key's counters split down the crease into two equal heaps, and the half's worth is written beside it.",
    items: [
      /* learn ML1: answer in the plan = 3 bottles */
      { qid: "M2.S3.T5.C16:ML1", kind: "fold", sym: "bottle", key: 6, thing: "bottles", near: 1, winMs: 2600,
        say: "One bottle picture stands for 6 bottles. What does half a bottle picture stand for?", ask: "Half a bottle stands for?", answer: 3,
        miss: "A piece of the picture is not one bottle. The whole picture holds more than one." },
      /* practice 1: answer in the plan = 5 trees (the plan's words, said in the question's own way) */
      { qid: "M2.S3.T5.C16:1", kind: "fold", sym: "tree", key: 10, thing: "trees", near: 10, winMs: 2600,
        say: "This time a tree picture stands for 10 trees. How many trees does its half show?", ask: "Half a tree stands for?", answer: 5,
        miss: "The half is smaller than the whole tree picture. Is its worth smaller too?" },
      /* practice 2: answer in the plan = 8 stickers, because half of 8 is 4 */
      { qid: "M2.S3.T5.C16:2", kind: "unfold", sym: "star", half: 4, thing: "stickers", near: 4, winMs: 2600,
        say: "A key says half a star stands for 4 stickers. What does a whole star stand for?", ask: "A whole star stands for?", answer: 8,
        miss: "That is what the half shows. Unfold it: a whole star is made of two halves." },
    ],
  },
  {
    n: 2,
    concept: "A row that ends in a half",
    conceptId: "M2.S3.T5.C17", objectiveIds: ["O7"],
    says: ["Read the whole ones first. Then what does the half add?"],
    /* tries, as the plan writes it: first rung, the item's miss (how many whole symbols); second, what the half
       adds (reworded: the teach already asks it); third, a row cut to one whole and a half, each part read */
    ladder: ["Half a picture adds half of what the key says.", "Tap the row to count its pictures. Work out the whole ones and the half, then add the two parts."],
    closing: "A row ending in a half is its whole symbols times the key, add half the key.",
    learned: "You learned: a row is its whole symbols times the key, add half the key.",
    traceback: "Each whole symbol is counted, the parts line writes the whole symbols times the key and half the key, and the row's sum lands in its tag.",
    items: [
      /* learn ML2: answer in the plan = 36 children */
      { qid: "M2.S3.T5.C17:ML2", kind: "row", sym: "bus", key: 8, thing: "children", title: "Children on buses", rows: [{ name: "buses", n: 4.5 }], near: 40, winMs: 3000,
        say: "One bus picture stands for 8 children. A row holds 4 whole bus pictures and a half. How many children does it show?", ask: "Children in the row?", answer: 36,
        miss: "The last bus is only half a picture. Does it carry as many children as a whole bus?" },
      /* practice 3: answer in the plan = 11 books: 10 from the whole pictures and 1 from the half (the plan's
         numbers, said in the question's own words) */
      { qid: "M2.S3.T5.C17:3", kind: "row", sym: "book", key: 2, thing: "books", title: "Books on a shelf", rows: [{ name: "books", n: 5.5 }], near: 12, winMs: 3000,
        say: "On a shelf, each book picture means 2 books. There are 5 whole book pictures and a half. How many books is that?", ask: "Books in the row?", answer: 11,
        miss: "Is the last book picture a whole one or a half?" },
      /* practice 4: answer in the plan = 21, 30 and 15 flags (one box a row) */
      { qid: "M2.S3.T5.C17:4", kind: "rows", sym: "flag", key: 6, thing: "flags", title: "Flags made", rows: [{ name: "row 1", n: 3.5 }, { name: "row 2", n: 5 }, { name: "row 3", n: 2.5 }],
        parts: [{ label: "row 1" }, { label: "row 2" }, { label: "row 3" }], near: "24|30|18", winMs: 3600,
        say: "One flag picture stands for 6 flags. Three rows hold 3 and a half, 5, and 2 and a half flag pictures. How many flags does each row show?", ask: "Flags in each row?", answer: [21, 30, 15],
        miss: "Rows 1 and 3 end in half a flag, and a half is worth less than a whole." },
    ],
  },
  {
    n: 3,
    concept: "Adding the rows for a total",
    conceptId: "M2.S3.T5.C18", objectiveIds: ["O8"],
    says: ["Add every row. Does each thing sit in one row only?"],
    /* tries, as the plan writes it: first rung, the item's miss; second, does any one thing sit in two rows
       (the teach already asks it, so rung 2 points at the tags, each of which already counts its whole row, a
       half included, and fits the marble bags too); third, the board cut to two rows added into the bar */
    ladder: ["Each tag already counts its whole row. Add the three tags.", "Add two rows first. Then add the third row to that."],
    closing: "A pictograph's total is every row added once, and it counts each thing once when nothing sits in two rows.",
    learned: "You learned: a total adds every row once, if nothing sits in two rows.",
    traceback: "Every row's number moves into the total bar once, the total lands, and two halves pair up into one whole in the tray.",
    items: [
      /* learn ML3: answer in the plan = 60 saplings */
      { qid: "M2.S3.T5.C18:ML3", kind: "total", sym: "sapling", key: 4, thing: "saplings", title: "Saplings planted", label: "saplings in all",
        rows: [{ name: "4A", n: 5.5 }, { name: "4B", n: 3 }, { name: "4C", n: 6.5 }], near: 64, winMs: 3400,
        say: "A pictograph of saplings planted by three classes has the key one sapling picture for 4 saplings. The rows hold 5 and a half, 3, and 6 and a half pictures. Each sapling was planted by one class. How many saplings were planted in all?", ask: "Saplings in all?", answer: 60,
        miss: "What does each row stand for? Put all three together." },
      /* practice 5: answer in the plan = 54 marbles, because 18 + 25 + 11 = 54 */
      { qid: "M2.S3.T5.C18:5", kind: "total", thing: "marbles", title: "Marbles in bags", label: "marbles in all",
        rows: [{ name: "bag 1", v: 18 }, { name: "bag 2", v: 25 }, { name: "bag 3", v: 11 }], near: 43, winMs: 3000,
        say: "Rows stand for 18, 25 and 11 marbles, and each marble is in one bag only. How many marbles are there in all?", ask: "Marbles in all?", answer: 54,
        miss: "Every bag counts. Did all three bags go into your sum?" },
      /* practice 6: answer in the plan = 100 jars, because 40 + 25 + 35 = 100 */
      { qid: "M2.S3.T5.C18:6", kind: "total", sym: "jar", key: 10, thing: "jars", title: "Pickle jars sold", label: "jars in all",
        rows: [{ name: "week 1", n: 4 }, { name: "week 2", n: 2.5 }, { name: "week 3", n: 3.5 }], near: 110, winMs: 3400,
        say: "One jar picture stands for 10 jars of pickle. A shop's rows for three weeks hold 4, 2 and a half, and 3 and a half jar pictures. How many jars were sold in the three weeks?", ask: "Jars sold in all?", answer: 100,
        miss: "Weeks 2 and 3 end in half a jar, worth less than a whole jar." },
    ],
  },
  {
    n: 4,
    concept: "Counted twice",
    conceptId: "M2.S3.T5.C19", objectiveIds: ["O8"],
    says: ["Is this stop in one row, or in both? How many times does the sum count it?"],
    /* tries, as the plan writes it: first rung, the item's miss; second, how many rows count that stop; third,
       two short routes sharing one stop, and the child taps it */
    /* both rungs are said so they fit a route map and the club rings alike */
    ladder: ["How many rows count the shared one?", "Tap where the routes or rings meet. Then look beside each row."],
    closing: "When one thing sits in two rows, adding the rows counts it twice. The rows alone cannot say how many separate things there are.",
    learned: "You learned: adding rows counts a thing once for every row it sits in.",
    traceback: "The shared stop lights on the map, a tag with its name hangs beside every row that counts it, and the bar is relabelled stops on routes.",
    items: [
      /* learn ML4: answer in the plan = No. The shared stop is in both rows, so 11 counts it twice. 11 counts stops on routes, not separate stops */
      { qid: "M2.S3.T5.C19:ML4", kind: "shared", sym: "stop", key: 1, unit: "stop", title: "Bus routes", map: "cross", stop: "School", sharedIds: ["School"],
        rows: [{ name: "hill", n: 6 }, { name: "lake", n: 5 }],
        routes: [[...hsIds("h", 3), "School", ...hsIds("hh", 2)], [...hsIds("l", 2), "School", ...hsIds("ll", 2)]],
        relabel: "stops on routes", sepWord: "separate stops", choices: HS_YESNO, near: "yes", winMs: 3400,
        /* the plan's line without "Each row counts the shared stop": that is the reason for the answer, and the
           share finder's tap is where the child finds it */
        say: "Two bus routes, the hill route and the lake route, share one stop. A pictograph shows 6 stops for the hill route and 5 for the lake route. The rows add up to 11. Is 11 the number of separate stops?", ask: "Is 11 separate stops?", answer: "no",
        miss: "Which stop is on both routes?" },
      /* practice 7: answer in the plan = No. Each child in both art and music is counted twice, once in each row, so 22 counts each child once for every club they are in */
      { qid: "M2.S3.T5.C19:7", kind: "shared", sym: "child", key: 2, unit: "children", title: "Club members", map: "clubs", stop: "Asha, Ravi", sharedIds: ["Asha", "Ravi"],
        rows: [{ name: "art", n: 4.5 }, { name: "music", n: 3.5 }, { name: "chess", n: 3 }],
        routes: [[...hsIds("a", 7), "Asha", "Ravi"], ["Asha", "Ravi", ...hsIds("m", 5)], hsIds("c", 6)],
        relabel: "places in clubs", sepWord: "separate children", choices: HS_YESNO, near: "yes", winMs: 3400,
        say: "Three clubs list their members: art 9, music 7 and chess 6. Two children are in both art and music. The rows add up to 22. Is 22 the number of separate children in the clubs?", ask: "Is 22 separate children?", answer: "no",
        miss: "Find the children inside both rings. Which rows count them?" },
      /* practice 8: answer in the plan = 19, because 6 + 5 + 8 = 19. The market stop is counted three times, once in each row */
      { qid: "M2.S3.T5.C19:8", kind: "shared3", sym: "stop", key: 2, unit: "stops", title: "Bus routes", map: "star", stop: "Market", sharedIds: ["Market"],
        rows: [{ name: "river", n: 3 }, { name: "park", n: 2.5 }, { name: "fort", n: 4 }],
        routes: [[...hsIds("r", 3), "Market", ...hsIds("rr", 2)], [...hsIds("p", 2), "Market", ...hsIds("pp", 2)], [...hsIds("f", 4), "Market", ...hsIds("ff", 3)]],
        relabel: "stops on routes", parts: [{ label: "sum" }, { label: "market", unit: "times" }], near: "19|1", winMs: 3600,
        say: "A pictograph shows the stops of three bus routes, one stop picture for 2 stops. The rows hold 3 pictures, 2 and a half pictures, and 4 pictures. All three routes stop at the market. What do the rows add up to, and how many times is the market stop counted in that sum?", ask: "Rows add to? Market counted?", answer: [19, 3],
        miss: "Read each row with the key and add. Then find the market in every row." },
    ],
  },
];

/* The numbers, rows, sizes and targets the working area needs (they go into the sidecar too). */
const MODEL = {
  halfRule: "a half symbol is the left half of the whole, cut down its middle, last in its row, and only on a key that halves into whole things",
  keyCard: { x: 64, y: 218, w: 224, h: 224 },
  board: { x: 314, y: 218, w: 836 },
  totalBar: "adds every row once; labelled things in all when nothing sits in two rows, and stops on routes when something does",
  routeMap: { x: 704, y: 218, w: 446, h: 496 },
};

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* judge: is this value right for this item? (numbers compare as numbers) */
const judge = (item: any, v: any) => {
  if (item.parts) return judgeSlotParts(item, v);
  if (typeof item.answer === "number") return leadNumber(v) === item.answer;
  return String(v).trim().toLowerCase() === String(item.answer).trim().toLowerCase();
};
/* oracle: every answer re-derived by a second route that shares no code with judge or Work:
   a key's counters dealt into two heaps; a row counted half a symbol at a time; a total from the halves
   paired into wholes; a shared thing found by the size of the set of every route's stops */
const oracle = () => PHASES.every((p: any) => p.items.every((it: any) => {
  let got: any = null;
  if (it.kind === "fold") { let a = 0, b = 0; for (let c = 0; c < it.key; c++) { if (c % 2) a++; else b++; } got = a === b ? a : null; }
  else if (it.kind === "unfold") got = it.half + it.half;
  else if (it.kind === "row" || it.kind === "rows") {
    const each = it.rows.map((r: any) => { let s = 0; for (let q = 0; q < Math.round(r.n * 2); q++) s += it.key / 2; return s; });
    got = it.parts ? each : each[0];
  } else if (it.kind === "total") {
    if (it.key) { let halves = 0; it.rows.forEach((r: any) => { halves += Math.round(r.n * 2); }); got = (halves / 2) * it.key; }
    else { got = 0; it.rows.forEach((r: any) => { got += r.v; }); }
  } else {
    if (it.routes.some((rt: string[], k: number) => rt.length !== it.rows[k].n * it.key)) return false;
    const every: string[] = [];
    it.routes.forEach((rt: string[]) => rt.forEach((s) => every.push(s)));
    if (it.kind === "shared") got = new Set(every).size === every.length ? "yes" : "no";
    else got = [every.length, it.routes.filter((rt: string[]) => rt.indexOf(it.stop) >= 0).length];
  }
  return JSON.stringify(got) === JSON.stringify(it.answer);
}));
/* the most likely wrong answer (the misconception); judge must reject it */
const nearMiss = (item: any) => (item.near !== undefined ? item.near : typeof item.answer === "number" ? item.answer + 1 : "~");
/* the forms of an answer that no question, hint or ladder line may print */
const answerForms = (item: any) => (item.parts ? item.answer.filter((x: number) => x >= 10).flatMap((x: number) => [String(x), indian(x), words(x)])
  : typeof item.answer === "number" ? [String(item.answer), indian(item.answer), words(item.answer)]
  : [String(item.answer)]);
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => item.answer;

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => (T.state().stage === "demo" ? HOOK.demo && HOOK.demo() : T.submit(item.answer));
/* the agent's answer() for an item made on the working area: set it as a child would; undefined = type it */
const answer = (item: any, v: any) => (item.pad === "enter" && HOOK.set ? HOOK.set(v) : undefined);
/* the agent's check() before Enter: e.g. drop a token that waits; undefined = press Enter */
const check = () => (HOOK.check ? HOOK.check() : undefined);

/* ── drawing helpers (called, never mounted) ─────────────────────────────────────────────── */

/* one pictograph symbol in a 100 x 100 box, its body in the pictograph green; back = the pale back of the
   paper, seen while the right half folds over the crease */
function hsArt(kind: string, back?: boolean) {
  const dk = shade(HS_GREEN, 0.35), body = back ? tint(HS_GREEN, 0.62) : "url(#gOne)", deep = back ? tint(HS_GREEN, 0.4) : dk;
  const e: any = { stroke: dk, strokeWidth: 2.5, vectorEffect: "non-scaling-stroke", strokeLinejoin: "round" };
  const gloss = (x: number, y: number, w: number, h: number) => (back ? null : <rect x={x} y={y} width={w} height={h} rx={4} fill="#FFFFFF" fillOpacity={0.6} />);
  if (kind === "bottle") return (
    <g>
      <path d="M42 14 H58 V30 Q76 38 76 54 V88 Q76 96 68 96 H32 Q24 96 24 88 V54 Q24 38 42 30 Z" fill={body} {...e} />
      <rect x={39} y={4} width={22} height={12} rx={3} fill={deep} {...e} />
      {gloss(31, 58, 38, 18)}
    </g>
  );
  if (kind === "tree") return (
    <g>
      <rect x={42} y={68} width={16} height={28} rx={3} fill={deep} {...e} />
      <path d="M50 4 L78 38 H66 L88 70 H12 L34 38 H22 Z" fill={body} {...e} />
    </g>
  );
  if (kind === "star") return <path d="M50 6 L61.2 36.6 L93.7 37.8 L68.1 57.9 L77 89.2 L50 71 L23 89.2 L31.9 57.9 L6.3 37.8 L38.8 36.6 Z" fill={body} {...e} />;
  if (kind === "bus") return (
    <g>
      <rect x={6} y={14} width={88} height={64} rx={12} fill={body} {...e} />
      {gloss(14, 24, 20, 20)}{gloss(40, 24, 20, 20)}{gloss(66, 24, 20, 20)}
      <circle cx={27} cy={82} r={10} fill={deep} {...e} />
      <circle cx={73} cy={82} r={10} fill={deep} {...e} />
    </g>
  );
  if (kind === "book") return (
    <g>
      <path d="M50 22 Q30 10 8 16 V84 Q30 78 50 90 Q70 78 92 84 V16 Q70 10 50 22 Z" fill={body} {...e} />
      <path d="M50 22 V90" fill="none" {...e} />
      {!back && <path d="M18 34 Q32 30 42 36 M18 50 Q32 46 42 52 M58 36 Q68 30 82 34 M58 52 Q68 46 82 50" fill="none" stroke="#FFFFFF" strokeOpacity={0.8} strokeWidth={2.5} vectorEffect="non-scaling-stroke" />}
    </g>
  );
  if (kind === "flag") return (
    <g>
      <rect x={12} y={4} width={8} height={88} rx={3} fill={deep} {...e} />
      <path d="M20 8 H88 L74 30 L88 52 H20 Z" fill={body} {...e} />
      <rect x={4} y={89} width={24} height={8} rx={3} fill={deep} {...e} />
    </g>
  );
  if (kind === "sapling") return (
    <g>
      <rect x={47} y={30} width={6} height={40} fill={deep} {...e} />
      <path d="M50 44 Q24 44 14 20 Q42 16 50 44 Z" fill={body} {...e} />
      <path d="M50 44 Q76 44 86 20 Q58 16 50 44 Z" fill={body} {...e} />
      <path d="M50 34 Q38 18 50 4 Q62 18 50 34 Z" fill={body} {...e} />
      <path d="M28 66 H72 L66 96 H34 Z" fill={deep} {...e} />
    </g>
  );
  if (kind === "jar") return (
    <g>
      <path d="M32 20 H68 Q82 30 82 44 V86 Q82 96 72 96 H28 Q18 96 18 86 V44 Q18 30 32 20 Z" fill={body} {...e} />
      <rect x={28} y={6} width={44} height={14} rx={4} fill={deep} {...e} />
      {gloss(28, 50, 44, 22)}
    </g>
  );
  if (kind === "stop") return (
    <g>
      <rect x={46} y={50} width={8} height={42} fill={deep} {...e} />
      <rect x={32} y={89} width={36} height={8} rx={3} fill={deep} {...e} />
      <circle cx={50} cy={30} r={26} fill={body} {...e} />
      {!back && <circle cx={50} cy={30} r={13} fill="#FFFFFF" fillOpacity={0.7} />}
    </g>
  );
  return (
    <g>
      <path d="M30 40 Q50 32 70 40 L76 76 H62 L60 96 H40 L38 76 H24 Z" fill={body} {...e} />
      <circle cx={50} cy={20} r={15} fill={body} {...e} />
    </g>
  );
}

/* a symbol at (x, y), s across: "whole", or "half" = its left half, cut down its middle */
function hsSym(kind: string, x: number, y: number, s: number, part: string, k?: any, clip = "hsL") {
  return (
    <g key={k} transform={`translate(${x},${y}) scale(${s / 100})`}>
      {part === "half" ? <g clipPath={`url(#${clip})`}>{hsArt(kind)}</g> : hsArt(kind)}
    </g>
  );
}

/* the key's symbol folding down its upright middle: f = 0 whole, 1 folded to its left half; the right half
   turns over the crease and shows the pale back of the paper once it is past upright */
function hsFoldSym(kind: string, x: number, y: number, s: number, f: number) {
  const sx = 1 - 2 * f;
  return (
    <g transform={`translate(${x},${y}) scale(${s / 100})`}>
      <g clipPath="url(#hsL)">{hsArt(kind)}</g>
      {f < 1 && Math.abs(sx) > 0.02 && (
        <g transform={`translate(50,0) scale(${sx},1) translate(-50,0)`}>
          <g clipPath="url(#hsR)">{hsArt(kind, sx < 0)}</g>
        </g>
      )}
    </g>
  );
}

/* the key's worth as a line of counters under the symbol; the line splits down the crease into two equal
   heaps once the fold begins, and the right heap folds away with the right half */
function hsCounters(k: number, f: number, cx: number, cy: number, r: number, pitch: number) {
  const split = f > 0 ? 1 : 0;
  return (
    <g filter="url(#fShadowSoft)">
      {Array.from({ length: k }, (_, j) => {
        const left = j < k / 2;
        if (!left && f >= 0.5) return null;
        const x = cx + (j - (k - 1) / 2) * pitch + (split ? (left ? -r : r) : 0);
        return <Disc key={j} x={x} y={cy} r={r} paint="gTen" flat />;
      })}
    </g>
  );
}

/* a fresh item: the child's own state (fold, rows read, rows added, stop lit) */
const hsFresh = (it: any) => ({ f: it.kind === "unfold" ? 1 : 0, rd: (it.rows || []).map(() => 0), seen: (it.rows || []).map(() => false), pl: [], ph: [], sm: [], added: [] as number[],
  tot: false, pair: 0, lit: false, relabel: false, sep: false, times: false, val: false, last: -1 });
/* the whole right answer on the working area (a win, and the end of every correction) */
function hsSolved(it: any) {
  const rows = it.rows || [], all = rows.map(() => true), idx = rows.map((_: any, k: number) => k);
  if (it.kind === "fold") return { f: 1, val: true };
  if (it.kind === "unfold") return { f: 0, val: true };
  if (it.kind === "row" || it.kind === "rows") return { rd: rows.map((r: any) => Math.floor(r.n) + (r.n % 1 ? 1 : 0)), pl: all, ph: all, sm: all, last: rows.length - 1 };
  if (it.kind === "total") return { added: idx, tot: true, pair: it.key && rows.some((r: any) => r.n % 1) ? 1 : 0 };
  if (it.kind === "shared") return { lit: true, relabel: true, sep: true };
  return { sm: all, added: idx, tot: true, lit: true, relabel: true, times: true };
}

/* ── the working area: 1086 x 528, origin at its top-left ──────────────────────────────────── */
function Work({ phase, n, item, index, stage, wrong, typed, part, api, MODEL, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();
  const it: any = item || {};
  const kd = it.kind;
  const free = stage === "free";
  const live = !free && (stage === "ask" || stage === "teach");
  const solvedNow = stage === "win" || stage === "idle";
  /* Hindi and Gujarati draw taller (matras above the headline, marks below the line) and wider: the few
     places that need room take it only then, so English draws exactly as it always has */
  const indic = lang !== "en";
  const ttlY = indic ? 59 : 54, ruleY = indic ? 71 : 68;
  /* phase 4: the width a Hindi or Gujarati stop name really draws at (this device's font), measured as it
     mounts, before the frame is painted, so its tag is sized to it and the name sits in the middle */
  const [nameW, setNameW] = useState<any>({ s: "", w: 0 });
  const nameRef = useCallback((el: any) => {
    if (!el || !indic) return;
    try {
      const w = el.getComputedTextLength(), s = el.textContent;
      if (w > 0) setNameW((o: any) => (o.s === s && Math.abs(o.w - w) <= 0.5 ? o : { s, w }));
    } catch (e) { /* no measure: the tag keeps its estimate */ }
  }, [indic, it.stop]);
  const [own, setOwn] = useState<any>(() => hsFresh(it));
  const [demo, setDemo] = useState<any>(null);
  const [tracing, setTracing] = useState(false);
  const [fp, setFp] = useState<any>({ k: 4, f: 0, h: [7, 4, 5] });
  const ownRef = useRef<any>(own);
  ownRef.current = own;
  const fpRef = useRef<any>(fp);
  fpRef.current = fp;
  /* the picture: the child's own state, with the correction (or the win) drawn over it until the child acts */
  const V: any = demo ? { ...own, ...demo } : own;
  const rowVal = (r: any) => (r.v !== undefined ? r.v : r.n * it.key);

  /* Enter and choice taps go straight to the runtime: every answer here is typed or chosen */
  api.onEnter(null);

  /* a new question starts clean; a win draws the whole answer */
  useEffect(() => { tl.stop(); setOwn(hsFresh(it)); setDemo(null); setTracing(false); }, [index]);
  useEffect(() => { if (solvedNow) setDemo(hsSolved(it)); }, [stage, index]);
  useEffect(() => { if (free) { tl.stop(); setDemo(null); setTracing(false); } }, [free]);

  /* the traceback: redraw the maths in steps and end on the whole right answer (a demo layer; the child's
     own fold, reading, rows and stop stay theirs and the first act wipes it) */
  const traceSteps = () => {
    const put = (d: any) => setDemo((o: any) => ({ ...(o || {}), ...d }));
    const S: any[] = [];
    const rows = it.rows || [], none = rows.map(() => false);
    if (kd === "fold" || kd === "unfold") {
      const a = kd === "fold" ? 0 : 1, b = 1 - a;
      setDemo({ f: a, val: false });
      S.push([700, null]);
      for (let s = 1; s <= 8; s++) S.push([70, () => put({ f: a + ((b - a) * s) / 8 })]);
      S.push([400, () => { put({ f: b, val: true }); api.sfx.tick(); }]);
    } else if (kd === "row" || kd === "rows") {
      setDemo({ rd: rows.map(() => 0), seen: [...none], pl: [...none], ph: [...none], sm: [...none], last: 0 });
      rows.forEach((r: any, ri: number) => {
        const w = Math.floor(r.n), h = r.n % 1 ? 1 : 0;
        for (let c = 1; c <= w; c++) S.push([200, () => setDemo((o: any) => ({ ...o, last: ri, rd: o.rd.map((v: number, k: number) => (k === ri ? c : v)) }))]);
        S.push([500, () => setDemo((o: any) => ({ ...o, pl: o.pl.map((v: boolean, k: number) => v || k === ri) }))]);
        if (h) {
          S.push([300, () => setDemo((o: any) => ({ ...o, rd: o.rd.map((v: number, k: number) => (k === ri ? w + 1 : v)) }))]);
          S.push([500, () => setDemo((o: any) => ({ ...o, ph: o.ph.map((v: boolean, k: number) => v || k === ri) }))]);
        }
        S.push([600, () => { setDemo((o: any) => ({ ...o, sm: o.sm.map((v: boolean, k: number) => v || k === ri) })); api.sfx.tick(); }]);
      });
    } else if (kd === "total") {
      setDemo({ added: [], tot: false, pair: 0 });
      rows.forEach((_r: any, ri: number) => S.push([450, () => { setDemo((o: any) => ({ ...o, added: [...o.added, ri] })); api.sfx.tick(); }]));
      S.push([600, () => put({ tot: true })]);
      if (it.key && rows.some((r: any) => r.n % 1)) {
        for (let s = 1; s <= 6; s++) S.push([70, () => put({ pair: (0.5 * s) / 6 })]);
        S.push([500, null]);
        S.push([300, () => { put({ pair: 1 }); api.sfx.tick(); }]);
      }
    } else if (kd === "shared") {
      setDemo({ lit: false, relabel: false, sep: false });
      S.push([500, () => { put({ lit: true }); api.sfx.tick(); }]);
      S.push([800, () => put({ relabel: true })]);
      S.push([600, () => put({ sep: true })]);
    } else {
      setDemo({ sm: [...none], added: [], tot: false, lit: false, relabel: false, times: false });
      rows.forEach((_r: any, ri: number) => S.push([450, () => { setDemo((o: any) => ({ ...o, sm: o.sm.map((v: boolean, k: number) => v || k === ri), added: [...o.added, ri] })); api.sfx.tick(); }]));
      S.push([600, () => put({ tot: true })]);
      S.push([600, () => { put({ lit: true }); api.sfx.tick(); }]);
      S.push([600, () => put({ relabel: true, times: true })]);
    }
    return S;
  };
  useEffect(() => {
    if (!wrong || stage !== "ask") return;
    api.lock(true);
    setTracing(true);
    tl.run(traceSteps(), () => { api.lock(false); setTracing(false); });
  }, [wrong]);

  /* the child's acts: the first line of each wipes the correction */
  const foldTap = () => {
    if (tracing) return;
    /* the tap turns what the child SEES: after a correction that ended folded, the first tap unfolds */
    const from = demo && typeof demo.f === "number" ? demo.f : ownRef.current.f, to = from < 0.5 ? 1 : 0;
    setDemo(null);
    setOwn((o: any) => ({ ...o, f: from }));
    const S: any[] = [];
    for (let s = 1; s <= 8; s++) S.push([45, () => setOwn((o: any) => ({ ...o, f: from + ((to - from) * s) / 8 }))]);
    tl.run(S, () => api.sfx.tick());
  };
  const readTap = (ri: number) => {
    if (tracing) return;
    setDemo(null);
    const r = it.rows[ri], total = Math.floor(r.n) + (r.n % 1 ? 1 : 0);
    setOwn((o: any) => ({ ...o, last: ri, rd: o.rd.map((v: number, k: number) => (k === ri ? 0 : v)) }));
    const S: any[] = [];
    /* a row read once stays read: a second tap replays its reader but never takes it off the count */
    for (let c = 1; c <= total; c++) S.push([240, () => { setOwn((o: any) => ({ ...o, rd: o.rd.map((v: number, k: number) => (k === ri ? c : v)),
      seen: c === total ? o.seen.map((v: boolean, k: number) => v || k === ri) : o.seen })); api.sfx.tick(); }]);
    tl.run(S);
  };
  const addRow = (ri: number) => {
    if (tracing) return;
    setDemo(null);
    if (ownRef.current.added.includes(ri)) return;
    setOwn((o: any) => (o.added.includes(ri) ? o : { ...o, added: [...o.added, ri] }));
    api.sfx.tick();
  };
  const shareTap = () => {
    if (tracing) return;
    setDemo(null);
    setOwn((o: any) => ({ ...o, lit: true }));
    api.sfx.tick();
  };
  /* a row's number is dragged (or tapped) into the total bar; a drop anywhere but over the bar goes home.
     A tap is generous: a finger slides a few units on a real tablet, so a release that ends on the tag
     itself, or within 24 units of it, adds the row as a tap does (the runtime calls a move of 8 a drag) */
  const drag = useDrag((pay: any, at: any, moved: boolean) => {
    if (!pay || typeof pay.r !== "number") return;
    const onBar = isFinite(at.x) && at.x >= 250 && at.x <= 1086 && at.y >= 396 && at.y <= 496;
    const ty = B3.top + pay.r * B3.bh + 12, m = 24;
    const onTag = isFinite(at.x) && at.x >= B3.tagX - m && at.x <= B3.tagX + B3.tagW + m && at.y >= ty - m && at.y <= ty + 76 + m;
    if (!moved || !isFinite(at.x) || onBar || onTag) addRow(pay.r);
  });
  /* free play */
  const fpFold = () => {
    const from = fpRef.current.f, to = from < 0.5 ? 1 : 0;
    const S: any[] = [];
    for (let s = 1; s <= 8; s++) S.push([45, () => setFp((p: any) => ({ ...p, f: from + ((to - from) * s) / 8 }))]);
    tl.run(S, () => api.sfx.tick());
  };
  const fpKey = (d: number) => { tl.stop(); setFp((p: any) => ({ ...p, k: Math.min(10, Math.max(2, p.k + d)), f: 0 })); api.sfx.tick(); };
  const fpRow = (ri: number, d: number) => { setFp((p: any) => ({ ...p, h: p.h.map((v: number, k: number) => (k === ri ? Math.min(13, Math.max(0, v + d)) : v)) })); api.sfx.tick(); };

  /* what the host and the agent read back (toolApi.getState); an answer is never shared before it is given.
     The plan's field `key` is shared as `keyWorth`: the dev driver's state() spreads the shared fields over
     its own `key` (the agent's answer), so a field named `key` would hand the agent the pictograph key. */
  const rowsOf = it.rows || null;
  api.share(free ? { phase: n, keyWorth: fp.k, halfValue: fp.k / 2, rows: fp.h.map((h: number) => h / 2), rowNumbers: fp.h.map((h: number) => (h * fp.k) / 2),
    total: fp.h.reduce((a: number, h: number) => a + (h * fp.k) / 2, 0), sharedStops: [] } : {
    phase: n,
    keyWorth: kd === "unfold" ? (solvedNow ? it.half * 2 : null) : it.key ?? null,
    halfValue: kd === "fold" ? (solvedNow ? it.key / 2 : null) : kd === "unfold" ? it.half : it.key && it.key % 2 === 0 ? it.key / 2 : null,
    rows: rowsOf ? rowsOf.map((r: any) => (r.n !== undefined ? r.n : null)) : null,
    rowNumbers: rowsOf && (kd === "total" || kd === "shared" || solvedNow) ? rowsOf.map(rowVal) : null,
    total: rowsOf && (kd === "shared" || solvedNow) ? rowsOf.reduce((a: number, r: any) => a + rowVal(r), 0) : null,
    sharedStops: V.lit ? it.sharedIds || [] : [],
  });

  /* ── the running count (runs zone, 94 above the working area) ── */
  const runs = () => {
    if (free) return null;
    let a = "", b = "";
    if (kd === "row" || kd === "rows") {
      const ri = V.last >= 0 ? V.last : 0, r = it.rows[ri], w = Math.floor(r.n), c = V.rd[ri] || 0;
      a = Math.min(c, w) + " " + tx("whole") + (c > w ? ", 1 " + tx("half") : "");
      /* a row counts as read once its reader has gone through every symbol (the child's tap or a correction),
         and stays counted while a second tap replays it */
      b = tx("rows read") + " " + it.rows.filter((r: any, k: number) => V.sm[k] || (V.seen && V.seen[k]) || (V.rd[k] || 0) >= Math.floor(r.n) + (r.n % 1 ? 1 : 0)).length + " / " + it.rows.length;
    } else if (kd === "total") {
      a = tx("rows added") + " " + V.added.length + " / " + it.rows.length;
      if (it.key) {
        let wh = 0, hf = 0;
        it.rows.forEach((r: any) => { wh += Math.floor(r.n); hf += r.n % 1 ? 1 : 0; });
        if (V.pair >= 1) { wh += 1; hf -= 2; }
        b = wh + " " + tx("whole") + ", " + hf + " " + tx("half");
      }
    } else return null;
    /* two Hindi or Gujarati lines need about 80 of ink (matras above, marks below): their panel grows to 98,
       into the empty 18 between the runs zone and the working area, so each line keeps 6 clear of the edge */
    const tall = indic && !!b;
    return (
      <g data-zone="runs">
        <rect x={0} y={tall ? -99 : -94} width={330} height={tall ? 98 : 76} rx={RAD.panel} fill="url(#gPanel)" stroke={C.rule} strokeWidth={2} />
        <text x={20} y={b ? (tall ? -58 : -59) : -44} fontSize={T.label} fontWeight={700} fill={C.ink}>{a}</text>
        {b && <text x={20} y={tall ? -15 : -27} fontSize={T.micro} fontWeight={500} fill={C.ink}>{b}</text>}
      </g>
    );
  };

  /* the key card (phases 2 and 3): one whole symbol and what it stands for */
  const keyCard = () => (it.key ? (
    <g>
      <rect x={0} y={16} width={224} height={224} rx={RAD.panel} fill="#FFFFFF" stroke={C.ink} strokeWidth={2} />
      <text x={20} y={ttlY} fontSize={T.label} fontWeight={700} fill={C.ink}>{tx("Key")}</text>
      {hsSym(it.sym, 14, 72, 90, "whole")}
      <text x={112} y={134} fontSize={T.speech} fontWeight={700} fill={C.ink}>{"= " + it.key}</text>
      <text x={112} y={214} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={C.ink}>{tx(it.thing)}</text>
    </g>
  ) : null);
  const boardTop = (x: number, w: number, h: number) => (
    <g>
      <rect x={x} y={16} width={w} height={h} rx={RAD.panel} fill="#FFFFFF" stroke={C.ink} strokeWidth={2} />
      <text x={x + 18} y={ttlY} fontSize={T.label} fontWeight={700} fill={C.ink}>{tx(it.title)}</text>
      <line x1={x} y1={ruleY} x2={x + w} y2={ruleY} stroke={C.ink} strokeWidth={1.5} />
    </g>
  );

  /* ── phase 1: the key card and the fold ── */
  const bench1 = () => {
    const cx = 363, sy = 100, S = 244, f = V.f;
    const unfold = kd === "unfold", k = unfold ? it.half * 2 : it.key;
    const start = unfold ? 1 : 0;
    const worth = unfold ? it.half * 2 : it.key / 2;
    return (
      <g>
        <rect x={143} y={16} width={800} height={420} rx={RAD.panel} fill="#FFFFFF" stroke={C.ink} strokeWidth={2} filter="url(#fShadowSoft)" />
        <text x={171} y={66} fontSize={T.label} fontWeight={700} fill={C.ink}>{tx("Key")}</text>
        {hsSym(it.sym, 256, 28, 52, unfold ? "half" : "whole")}
        <text x={326} y={66} fontSize={T.label} fontWeight={600} fill={C.ink}>{"= " + (unfold ? it.half : it.key) + " " + tx(it.thing)}</text>
        {hsFoldSym(it.sym, cx - S / 2, sy, S, f)}
        {f === 0 && <line x1={cx} y1={sy - 8} x2={cx} y2={sy + S + 8} stroke={C.ink} strokeWidth={2} strokeDasharray="8 8" />}
        {hsCounters(k, f, cx, 396, 16, 40)}
        {V.val && <text x={cx + (f >= 1 ? 30 : S / 2 + 30)} y={sy + S / 2 + 16} fontSize={T.speech} fontWeight={700} fill={HS_AMB}>{"= " + worth + " " + tx(it.thing)}</text>}
        {stage === "ask" && !tracing && !demo && own.f === start && <Invite x={cx} y={sy + S / 2} r={140} C={C} />}
        {live && <Hit id="fold" x={cx - 132} y={sy - 12} w={264} h={S + 24} onPress={foldTap} enabled={!tracing} label={unfold ? "unfold the symbol" : "fold the symbol"} />}
      </g>
    );
  };

  /* ── phase 2: a row that ends in a half, read with the key ── */
  /* row names run longer in Hindi and Gujarati ("किताबें", "પુસ્તકો", "पंक्ति 1"): the symbols start 14 further right */
  const B2 = { bx: 250, bw: 836, top: 84, bh: 142, sx: lang === "en" ? 380 : 394, S: 80, pitch: 92, tagX: 916, tagW: 154 };
  const bench2 = () => {
    const rows = it.rows, asked = it.parts ? Math.min(part || 0, rows.length - 1) : 0;
    /* one row gets room to write its parts line large; three rows keep it at label size */
    const one = rows.length === 1, bh = one ? 176 : B2.bh, ps = one ? T.speech : T.label, py = one ? 146 : 120;
    return (
      <g>
        {keyCard()}
        {boardTop(B2.bx, B2.bw, B2.top - 24 + rows.length * bh)}
        {rows.map((r: any, ri: number) => {
          const y = B2.top + ri * bh, w = Math.floor(r.n), h = r.n % 1 ? 1 : 0;
          const ext = w * B2.pitch + (h ? B2.S / 2 : -12);
          const c = V.rd[ri] || 0;
          const lineW = (w + " × " + it.key + " = " + w * it.key).length * 0.6 * ps;
          const hx = Math.max(B2.sx + w * B2.pitch - 6, B2.sx + lineW + 24);
          return (
            <g key={ri}>
              {ri > 0 && <line x1={B2.bx} y1={y - 8} x2={B2.bx + B2.bw} y2={y - 8} stroke={C.ink} strokeWidth={1.5} />}
              {ri === asked && <rect x={B2.sx - 12} y={y - 6} width={ext + 24} height={B2.S + 14} rx={12} fill={HS_SKY} />}
              <text x={B2.bx + 18} y={y + 52} fontSize={T.label} fontWeight={700} fill={C.ink}>{tx(r.name)}</text>
              {Array.from({ length: w }, (_, j) => hsSym(it.sym, B2.sx + j * B2.pitch, y + 2, B2.S, "whole", j))}
              {h ? hsSym(it.sym, B2.sx + w * B2.pitch, y + 2, B2.S, "half", "h") : null}
              {Array.from({ length: Math.min(c, w + h) }, (_, j) => (
                <rect key={"o" + j} x={B2.sx + j * B2.pitch - 5} y={y - 3} width={(j < w ? B2.S : B2.S / 2) + 10} height={B2.S + 10} rx={12} fill="none" stroke={C.ink} strokeWidth={3} />
              ))}
              <rect x={B2.tagX} y={y + 2} width={B2.tagW} height={80} rx={14} fill="#FFFFFF" stroke={C.ink} strokeWidth={2} />
              {V.sm[ri] && <text x={B2.tagX + B2.tagW / 2} y={y + 62} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={HS_AMB}>{w * it.key + h * (it.key / 2)}</text>}
              <g data-role="reading">
                {V.pl[ri] && <text x={B2.sx} y={y + py} fontSize={ps} fontWeight={700} fill={HS_AMB}>{w + " × " + it.key + " = " + w * it.key}</text>}
                {h && V.ph[ri] ? <text x={hx} y={y + py} fontSize={ps} fontWeight={700} fill={HS_AMB}>{"+ " + it.key / 2}</text> : null}
              </g>
              {live && <Hit id={"row-" + (ri + 1)} x={B2.sx - 12} y={y - 6} w={ext + 24} h={96} onPress={() => readTap(ri)} enabled={!tracing} label={"read row " + (ri + 1)} />}
            </g>
          );
        })}
        {stage === "ask" && !tracing && !demo && !(own.rd[asked] > 0) && <Invite x={B2.sx + B2.S / 2} y={B2.top + asked * bh + 42} r={52} C={C} />}
      </g>
    );
  };

  /* ── phase 3: every row added once into the total bar; two halves pair up in the tray ── */
  const B3 = { bx: 250, bw: 836, top: 80, bh: 100, sx: 392, S: 60, pitch: 68, tagX: 900, tagW: 170, barY: 404 };
  const tag3 = (ri: number, x: number, y: number, look: string) => (
    <g filter={look === "lift" ? "url(#fLift)" : look === "live" ? "url(#fShadowSoft)" : undefined}>
      <rect x={x} y={y} width={B3.tagW} height={76} rx={14} fill="#FFFFFF" stroke={look === "in" ? HS_PUR : C.ink} strokeWidth={look === "in" ? 3 : 2} />
      <text x={x + B3.tagW / 2} y={y + 54} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={HS_AMB}>{rowVal(it.rows[ri])}</text>
    </g>
  );
  const bench3 = () => {
    const rows = it.rows;
    const halves = it.key ? rows.map((r: any, ri: number) => ({ ri, w: Math.floor(r.n), h: r.n % 1 })).filter((q: any) => q.h) : [];
    const pairOn = V.pair > 0 && halves.length === 2;
    const dg = drag.drag;
    const carried = !!(dg && dg.moved && dg.payload && typeof dg.payload.r === "number");
    const overBar = carried && dg.x >= 250 && dg.x <= 1086 && dg.y >= 396 && dg.y <= 496;
    const next =rows.findIndex((_: any, ri: number) => !own.added.includes(ri));
    const sum = V.added.reduce((a: number, ri: number) => a + rowVal(rows[ri]), 0);
    return (
      <g>
        {keyCard()}
        {boardTop(B3.bx, B3.bw, B3.top - 12 + rows.length * B3.bh)}
        {rows.map((r: any, ri: number) => {
          const y = B3.top + ri * B3.bh, w = r.n !== undefined ? Math.floor(r.n) : 0, h = r.n % 1 ? 1 : 0;
          const gone = pairOn && h;
          /* a row the child added, or one the correction holds in the bar, looks added and takes no drag */
          const mine = own.added.includes(ri) || !!(demo && demo.added && demo.added.includes(ri));
          return (
            <g key={ri}>
              {ri > 0 && <line x1={B3.bx} y1={y - 2} x2={B3.bx + B3.bw} y2={y - 2} stroke={C.ink} strokeWidth={1.5} />}
              <text x={B3.bx + 18} y={y + 60} fontSize={T.label} fontWeight={700} fill={C.ink}>{tx(r.name)}</text>
              {it.key ? Array.from({ length: w }, (_, j) => hsSym(it.sym, B3.sx + j * B3.pitch, y + 18, B3.S, "whole", j)) : null}
              {h && !gone ? hsSym(it.sym, B3.sx + w * B3.pitch, y + 18, B3.S, "half", "h") : null}
              {h && gone ? <rect x={B3.sx + w * B3.pitch} y={y + 18} width={B3.S / 2} height={B3.S} rx={6} fill="none" stroke={C.ink} strokeWidth={2} strokeDasharray="6 6" /> : null}
              {live && !mine ? (
                <g {...control("row-" + (ri + 1), "add row " + (ri + 1) + " into the total")} {...drag.bind({ r: ri })} {...drag.keys({ r: ri })}>
                  {tag3(ri, B3.tagX, y + 12, "live")}
                </g>
              ) : (
                <g>{tag3(ri, B3.tagX, y + 12, V.added.includes(ri) ? "in" : "flat")}</g>
              )}
            </g>
          );
        })}
        {/* while a tag is carried the bar lights up as the place to drop it, brighter once the tag is over it */}
        <rect x={B3.bx} y={B3.barY} width={B3.bw} height={84} rx={RAD.panel} fill={carried ? tint(HS_PUR, overBar ? 0.8 : 0.9) : "#FFFFFF"}
          stroke={carried ? HS_PUR : C.ink} strokeWidth={carried ? 4 : 2} />
        <text x={B3.bx + 18} y={B3.barY + 52} fontSize={T.micro} fontWeight={700} fill={C.ink}>{tx(it.label)}</text>
        <g data-role="reading">
          {V.added.length > 0 && <text x={510} y={B3.barY + 58} fontSize={T.speech} fontWeight={700} fill={HS_AMB}>{V.added.map((ri: number) => rowVal(rows[ri])).join(" + ")}</text>}
        </g>
        <text x={838} y={B3.barY + 58} fontSize={T.speech} fontWeight={700} fill={C.ink}>=</text>
        <rect x={880} y={B3.barY + 8} width={190} height={68} rx={12} fill="#FFFFFF" stroke={C.ink} strokeWidth={2} />
        {V.tot && <text x={975} y={B3.barY + 62} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={HS_PUR}>{sum}</text>}
        {pairOn && (
          <g pointerEvents="none">
            <rect x={0} y={262} width={224} height={190} rx={RAD.panel} fill="#FFFFFF" stroke={C.ink} strokeWidth={2} />
            {halves.map((q: any, k: number) => {
              if (V.pair >= 1) return k === 0 ? hsSym(it.sym, 62, 280, 100, "half", "p0") : (
                <g key="p1" transform="translate(162,280) scale(-1,1)">{hsSym(it.sym, 0, 0, 100, "half")}</g>
              );
              const t = Math.min(1, V.pair / 0.5), x0 = B3.sx + q.w * B3.pitch, y0 = B3.top + q.ri * B3.bh + 18, x1 = k === 0 ? 42 : 132;
              return hsSym(it.sym, x0 + (x1 - x0) * t, y0 + (280 - y0) * t, B3.S + (100 - B3.S) * t, "half", "p" + k);
            })}
            {V.pair >= 1 && <text x={112} y={434} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={HS_AMB}>{"= " + it.key}</text>}
          </g>
        )}
        {dg && dg.moved && dg.payload && typeof dg.payload.r === "number" && (
          <g pointerEvents="none">{tag3(dg.payload.r, dg.x - B3.tagW / 2, dg.y - 38, "lift")}</g>
        )}
        {stage === "ask" && !tracing && !demo && next >= 0 && <Invite x={B3.tagX + B3.tagW / 2} y={B3.top + next * B3.bh + 50} r={50} C={C} />}
      </g>
    );
  };

  /* ── phase 4: the route map, the share finder, the rows that count a shared thing ── */
  const B4 = { top: 76, bh: 80, sx: 124, S: 44, pitch: 46, tagX: 552, mx: 640 };
  const geo = () => {
    const c = it.map === "cross" ? { x: 863, y: 280 } : it.map === "star" ? { x: 863, y: 290 } : { x: 863, y: 220 };
    if (it.map === "clubs") return { c, lines: [] as any[] };
    const dirs = it.map === "cross" ? [[0.7071, 0.7071], [0.7071, -0.7071]] : [[0, 1], [0.866, -0.5], [0.866, 0.5]];
    const d = it.map === "cross" ? 60 : 40;
    /* a route name placed at its line's end came to touch the end cap (the star map's park and fort in every
       language, the cross map's lake nearly, in Hindi and Gujarati, whose names run wider and taller): each moves
       about 10 clear of it, on down its line, or up for the one by the map's left edge */
    const nudge: any = it.map === "star" ? (indic ? { 1: [-17.3, 10], 2: [4, -14] } : { 1: [-13.9, 8], 2: [0, -9] })
      : it.map === "cross" && indic ? { 1: [-5.7, 5.7] } : {};
    return { c, lines: it.routes.map((rt: string[], k: number) => {
      const s = rt.findIndex((x: string) => it.sharedIds.includes(x)), dir = dirs[k];
      const at = (j: number) => ({ x: c.x + (j - s) * d * dir[0], y: c.y + (j - s) * d * dir[1] });
      const lb = at(-1.2), nd = nudge[k] || [0, 0];
      return { name: it.rows[k].name, pts: rt.map((_: any, j: number) => at(j)), a: at(-0.5), b: at(rt.length - 0.5), label: { x: lb.x + nd[0], y: lb.y + nd[1] }, s };
    }) };
  };
  const CLUB_DOTS = { art: [[705, 190], [705, 250], [740, 160], [740, 220], [740, 280], [775, 190], [775, 250]], both: [[863, 190], [863, 250]],
    music: [[951, 190], [951, 250], [986, 160], [986, 220], [986, 280]], chess: [[833, 388], [863, 388], [893, 388], [833, 418], [863, 418], [893, 418]] };
  const bench4 = () => {
    const rows = it.rows, read = kd === "shared";
    const ly = B4.top + rows.length * B4.bh + 8, by = ly + 60;
    const vals = rows.map(rowVal), sum = vals.reduce((a: number, b: number) => a + b, 0);
    const shares = (ri: number) => it.routes[ri].some((s: string) => it.sharedIds.includes(s));
    const every: string[] = [];
    it.routes.forEach((rt: string[]) => rt.forEach((s) => every.push(s)));
    const sepN = new Set(every).size;
    const times = it.routes.filter((rt: string[]) => rt.some((s) => it.sharedIds.includes(s))).length;
    const G = geo();
    const stopName = tx(it.stop), mw = indic && nameW.s === stopName ? nameW.w : 0;
    const tw = mw ? Math.ceil(mw) + 30 : stopName.length * 16 + 26;
    /* the map card and its caption: in Hindi and Gujarati the card runs 8 lower and the caption 5 lower, so a
       mark below the caption's line stays clear of the card's edge and its matras clear of the chess ring */
    const mapH = indic ? 504 : 496, capY = indic ? 505 : 500;
    return (
      <g>
        {boardTop(0, 620, ly + 48 - 16)}
        {rows.map((r: any, ri: number) => {
          const y = B4.top + ri * B4.bh, w = Math.floor(r.n), h = r.n % 1 ? 1 : 0;
          const ext = w * B4.pitch + (h ? B4.S / 2 : -2);
          const ringJ = it.key === 1 ? it.routes[ri].findIndex((s: string) => it.sharedIds.includes(s)) : -1;
          return (
            <g key={ri}>
              {ri > 0 && <line x1={0} y1={y - 4} x2={620} y2={y - 4} stroke={C.ink} strokeWidth={1.5} />}
              <text x={18} y={y + 46} fontSize={T.label} fontWeight={700} fill={C.ink}>{tx(r.name)}</text>
              {Array.from({ length: w }, (_, j) => hsSym(it.sym, B4.sx + j * B4.pitch, y + 8, B4.S, "whole", j))}
              {h ? hsSym(it.sym, B4.sx + w * B4.pitch, y + 8, B4.S, "half", "h") : null}
              {V.lit && ringJ >= 0 && <rect x={B4.sx + ringJ * B4.pitch - 5} y={y + 3} width={B4.S + 10} height={B4.S + 10} rx={10} fill="none" stroke={HS_PUR} strokeWidth={4} />}
              {V.lit && shares(ri) && (
                <g pointerEvents="none">
                  <rect x={B4.sx + ext + 14} y={y + 14} width={tw} height={44} rx={10} fill="#FFFFFF" stroke={HS_PUR} strokeWidth={3} />
                  {indic
                    ? <text ref={nameRef} x={B4.sx + ext + 14 + tw / 2} y={y + 46} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={HS_PUR}>{stopName}</text>
                    : <text x={B4.sx + ext + 27} y={y + 46} fontSize={T.micro} fontWeight={700} fill={HS_PUR}>{stopName}</text>}
                </g>
              )}
              <rect x={B4.tagX} y={y + 6} width={60} height={60} rx={12} fill="#FFFFFF" stroke={C.ink} strokeWidth={2} />
              {(read || V.sm[ri]) && <text x={B4.tagX + 30} y={y + 51} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={HS_AMB}>{vals[ri]}</text>}
            </g>
          );
        })}
        <text x={18} y={ly + 36} fontSize={T.label} fontWeight={700} fill={C.ink}>{tx("Key")}</text>
        {hsSym(it.sym, 96, ly + 2, 40, "whole")}
        <text x={148} y={ly + 36} fontSize={T.label} fontWeight={600} fill={C.ink}>{"= " + it.key + " " + tx(it.unit)}</text>
        <rect x={0} y={by} width={620} height={80} rx={RAD.panel} fill="#FFFFFF" stroke={C.ink} strokeWidth={2} />
        <text x={18} y={by + 50} fontSize={T.micro} fontWeight={700} fill={C.ink}>{V.relabel ? tx(it.relabel) : tx("rows added")}</text>
        <g data-role="reading">
          {(read || V.added.length === rows.length) && <text x={278} y={by + 56} fontSize={T.speech} fontWeight={700} fill={HS_AMB}>{vals.join(" + ")}</text>}
        </g>
        <text x={482} y={by + 56} fontSize={T.speech} fontWeight={700} fill={C.ink}>=</text>
        <rect x={520} y={by + 8} width={90} height={64} rx={12} fill="#FFFFFF" stroke={C.ink} strokeWidth={2} />
        {(read || V.tot) && <text x={565} y={by + 55} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={HS_PUR}>{sum}</text>}
        {/* the map */}
        <rect x={B4.mx} y={16} width={446} height={mapH} rx={RAD.panel} fill="#FFFFFF" stroke={C.ink} strokeWidth={2} />
        <text x={B4.mx + 18} y={ttlY} fontSize={T.label} fontWeight={700} fill={C.ink}>{it.map === "clubs" ? tx("Members") : tx("Route map")}</text>
        {it.map === "clubs" ? (
          <g>
            <ellipse cx={800} cy={220} rx={125} ry={100} fill="none" stroke={C.ink} strokeWidth={3} />
            <ellipse cx={926} cy={220} rx={125} ry={100} fill="none" stroke={C.ink} strokeWidth={3} />
            <circle cx={863} cy={402} r={62} fill="none" stroke={C.ink} strokeWidth={3} />
            <text x={690} y={110} fontSize={T.micro} fontWeight={700} fill={C.ink}>{tx(rows[0].name)}</text>
            <text x={1040} y={110} textAnchor="end" fontSize={T.micro} fontWeight={700} fill={C.ink}>{tx(rows[1].name)}</text>
            <text x={938} y={412} fontSize={T.micro} fontWeight={700} fill={C.ink}>{tx(rows[2].name)}</text>
            <g filter="url(#fShadowSoft)">
              {[...CLUB_DOTS.art, ...CLUB_DOTS.music, ...CLUB_DOTS.chess].map((p: number[], k: number) => <Disc key={"d" + k} x={p[0]} y={p[1]} r={11} paint="gTen" flat />)}
              {CLUB_DOTS.both.map((p: number[], k: number) => <Disc key={"s" + k} x={p[0]} y={p[1]} r={15} paint="gBead" flat />)}
            </g>
            {V.lit && <ellipse cx={863} cy={220} rx={32} ry={60} fill="none" stroke={HS_PUR} strokeWidth={4} />}
          </g>
        ) : (
          <g>
            {G.lines.map((L: any, k: number) => <line key={"l" + k} x1={L.a.x} y1={L.a.y} x2={L.b.x} y2={L.b.y} stroke={C.ink} strokeWidth={6} strokeLinecap="round" />)}
            {G.lines.map((L: any, k: number) => <text key={"t" + k} x={L.label.x} y={L.label.y + 10} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={C.ink}>{tx(L.name)}</text>)}
            <g filter="url(#fShadowSoft)">
              {G.lines.map((L: any, k: number) => L.pts.map((p: any, j: number) => (j === L.s ? null : <Disc key={k + "-" + j} x={p.x} y={p.y} r={11} paint="gTen" flat />)))}
              <Disc x={G.c.x} y={G.c.y} r={16} paint="gBead" flat />
            </g>
            {V.lit && <circle cx={G.c.x} cy={G.c.y} r={27} fill="none" stroke={HS_PUR} strokeWidth={4} />}
          </g>
        )}
        {kd === "shared" && V.sep && <text x={863} y={capY} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{sepN + " " + tx(it.sepWord)}</text>}
        {kd === "shared3" && V.times && <text x={863} y={capY} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={HS_PUR}>{stopName + ": " + times + " " + tx("times")}</text>}
        {stage === "ask" && !tracing && !demo && !own.lit && <Invite x={G.c.x} y={G.c.y} r={it.map === "clubs" ? 62 : 44} C={C} />}
        {live && <Hit id="shared-stop" x={G.c.x - (it.map === "clubs" ? 48 : 36)} y={G.c.y - (it.map === "clubs" ? 50 : 36)} w={it.map === "clubs" ? 96 : 72} h={it.map === "clubs" ? 100 : 72}
          onPress={shareTap} enabled={!tracing} label={it.map === "clubs" ? "find the children in both clubs" : "find the shared stop"} />}
      </g>
    );
  };

  /* ── free play: any key that halves, the fold, three rows to build and their total ── */
  const benchFree = () => {
    const k = fp.k, f = fp.f, cx = 112, sy = 64, S = 110;
    const vals = fp.h.map((h: number) => (h * k) / 2), sum = vals.reduce((a: number, b: number) => a + b, 0);
    const sign = (s: string) => <text y={15} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={C.ink}>{s}</text>;
    return (
      <g>
        <rect x={0} y={16} width={224} height={376} rx={RAD.panel} fill="#FFFFFF" stroke={C.ink} strokeWidth={2} />
        <text x={20} y={ttlY} fontSize={T.label} fontWeight={700} fill={C.ink}>{tx("Key")}</text>
        {hsFoldSym("tree", cx - S / 2, sy, S, f)}
        {f === 0 && <line x1={cx} y1={sy - 4} x2={cx} y2={sy + S + 4} stroke={C.ink} strokeWidth={2} strokeDasharray="6 6" />}
        {hsCounters(k, f, cx, 200, 8, 19)}
        <text x={cx} y={264} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={f >= 1 ? HS_AMB : C.ink}>{"= " + (f >= 1 ? k / 2 : k)}</text>
        <Hit id="fp-fold" x={cx - 70} y={sy - 6} w={140} h={124} onPress={fpFold} label="fold the key's symbol" />
        <Key id="fp-less" label="smaller key" x={20} y={298} w={84} h={72} C={C} disabled={k <= 2} onClick={() => fpKey(-2)}>{sign("−")}</Key>
        <Key id="fp-more" label="bigger key" x={120} y={298} w={84} h={72} C={C} disabled={k >= 10} onClick={() => fpKey(2)}>{sign("+")}</Key>
        <rect x={250} y={16} width={836} height={364} rx={RAD.panel} fill="#FFFFFF" stroke={C.ink} strokeWidth={2} />
        <text x={268} y={ttlY} fontSize={T.label} fontWeight={700} fill={C.ink}>{tx("My pictograph")}</text>
        <line x1={250} y1={ruleY} x2={1086} y2={ruleY} stroke={C.ink} strokeWidth={1.5} />
        {fp.h.map((hv: number, ri: number) => {
          /* "पंक्ति 1" and "હાર 1" run longer than "row 1": the trees start a little further right, a little closer */
          const y = 80 + ri * 96, w = Math.floor(hv / 2), h = hv % 2, tx0 = lang === "en" ? 364 : 384, tp = lang === "en" ? 54 : 51;
          return (
            <g key={ri}>
              {ri > 0 && <line x1={250} y1={y - 2} x2={1086} y2={y - 2} stroke={C.ink} strokeWidth={1.5} />}
              <text x={268} y={y + 56} fontSize={T.label} fontWeight={700} fill={C.ink}>{tx("row " + (ri + 1))}</text>
              {Array.from({ length: w }, (_, j) => hsSym("tree", tx0 + j * tp, y + 20, 48, "whole", j))}
              {h ? hsSym("tree", tx0 + w * tp, y + 20, 48, "half", "h") : null}
              <Key id={"fp-row" + (ri + 1) + "-less"} label={"half a symbol less in row " + (ri + 1)} x={724} y={y + 8} w={72} h={72} C={C} disabled={hv <= 0} onClick={() => fpRow(ri, -1)}>{sign("−")}</Key>
              <Key id={"fp-row" + (ri + 1) + "-more"} label={"half a symbol more in row " + (ri + 1)} x={806} y={y + 8} w={72} h={72} C={C} disabled={hv >= 13} onClick={() => fpRow(ri, 1)}>{sign("+")}</Key>
              <text x={982} y={y + 60} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={HS_AMB}>{"= " + vals[ri]}</text>
            </g>
          );
        })}
        <rect x={250} y={404} width={836} height={84} rx={RAD.panel} fill="#FFFFFF" stroke={C.ink} strokeWidth={2} />
        <text x={268} y={456} fontSize={T.micro} fontWeight={700} fill={C.ink}>{tx("in all")}</text>
        <text x={380} y={462} fontSize={T.speech} fontWeight={700} fill={HS_AMB}>{vals.join(" + ") + " ="}
          <tspan dx={16} fill={HS_PUR}>{sum}</tspan></text>
      </g>
    );
  };

  return (
    <g>
      <defs>
        <clipPath id="hsL"><rect x={-5} y={-5} width={55} height={110} /></clipPath>
        <clipPath id="hsR"><rect x={50} y={-5} width={55} height={110} /></clipPath>
      </defs>
      {runs()}
      {free ? benchFree() : kd === "fold" || kd === "unfold" ? bench1() : kd === "row" || kd === "rows" ? bench2() : kd === "total" ? bench3() : bench4()}
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase:
   result.last = { value, answer, kind, item, shared } (shared = what api.share held at that moment) */
function Thumb({ result, C, w, h, lang = "en", tx = (v: any) => v }: any) {
  const last = result && result.last;
  if (!last) return null;
  const all: any[] = [];
  PHASES.forEach((p: any) => p.items.forEach((x: any) => all.push(x)));
  const it: any = all.find((x: any) => x.kind === last.kind && JSON.stringify(x.answer) === JSON.stringify(last.answer)) || {};
  const s = Math.min(h - 14, 64), top = (h - s) / 2;
  let pic: any = null, label = "", ink = HS_AMB, lx = 16;
  if (it.kind === "fold" || it.kind === "unfold") {
    pic = hsSym(it.sym, 14, top, s, it.kind === "fold" ? "half" : "whole", "t", "hsLt");
    label = "= " + it.answer; lx = 30 + s;
  } else if (it.kind === "row") {
    /* a whole symbol and a half, so the value reads as the row's, never as half a symbol's */
    const s2 = Math.min(s, 52), t2 = (h - s2) / 2;
    pic = <g>{hsSym(it.sym, 12, t2, s2, "whole", "tw")}{hsSym(it.sym, 16 + s2, t2, s2, "half", "th", "hsLt")}</g>;
    label = "= " + it.answer; lx = 30 + s2 * 1.5;
  } else if (it.kind === "rows") {
    const s2 = Math.min(s, 48);
    pic = hsSym(it.sym, 12, (h - s2) / 2, s2, "whole", "t");
    label = it.answer.join(", "); lx = 24 + s2;
  } else if (it.kind === "total") {
    const s2 = Math.min(s, 48);
    if (it.sym) { pic = hsSym(it.sym, 12, (h - s2) / 2, s2, "whole", "t"); lx = 24 + s2; }
    label = "= " + it.answer; ink = HS_PUR;
  } else if (it.kind === "shared") { label = tx("counted twice"); ink = HS_PUR; }
  else if (it.kind === "shared3") {
    const s2 = Math.min(s, 40);
    pic = hsSym(it.sym, 8, (h - s2) / 2, s2, "whole", "t");
    label = it.answer[0] + ", " + it.answer[1] + " " + tx("times"); ink = HS_PUR; lx = 14 + s2;
  }
  return (
    <g>
      <defs><clipPath id="hsLt"><rect x={-5} y={-5} width={55} height={110} /></clipPath></defs>
      <rect x={0} y={0} width={w} height={h} rx={14} fill="#FFFFFF" stroke={C.rule} strokeWidth={1.5} />
      {pic}
      <text x={lx} y={h / 2 + 11} fontSize={it.kind === "shared" ? T.micro : T.label} fontWeight={700} fill={ink}>{label}</text>
    </g>
  );
}

function HalfSymbolBench(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, fitHost: () => null }} />
  );
}

export default HalfSymbolBench;
