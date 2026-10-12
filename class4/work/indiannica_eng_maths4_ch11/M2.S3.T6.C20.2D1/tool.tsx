/* ═══ M2.S3.T6.C20.2D1 · weight_columns · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists: header + its three controls, canvas, slot + pad, bubble + mascot,
   phase dots (user / AI mode), window.toolApi, sounds, the synced voice, scoring, the events,
   idle and restart. NO imports in this file; only the five host hooks. Follow docs/LAYOUT.md;
   the reference tool is work/indiannica_eng_maths4_ch1/M1.S1.T2.C4.2D1/tool.tsx.
   Edit, never rewrite. Built by `node cli.mjs scaffold`; concepts are verbatim (check compares them). */

const TOOL_ID = "weight_columns";
const MEDIA_ID = "M2.S3.T6.C20.2D1";
const TOOL_NAME = "Weight Columns";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
const VOICE = {"rate":0.92,"pitch":1.06};

/* spoken before phase 1's teach lines only (the plan's opening voice line) */
const OPENING = ["Bags with weight tags and a frame. How many boxes do the grams take?"];
/* the whole-tool line: spoken on the summary page */
const FINISH_LINE = "Every gram in its three places, every thousand carried or broken, and every question answered in full.";
/* said when the child opens Free play from the summary page (the plan's free-play voice line) */
const FREE_LINE = "Free play. Any weights in the frame, with the carry, the break and the balance open.";

/* Hindi and Gujarati (docs/PATTERNS.md §11): every line above and below stays English, exactly as the checks
   read it; this table is keyed by that English, and the runtime looks each spoken or drawn line up in it.
   Fill it AFTER the English is final and reviewed (`node cli.mjs voice` lists every line still missing),
   then bake the voice. Empty = the tool runs in English only. */
const TR: any = {
  hi: {
    "Weight Columns": "वज़न के स्तंभ",
    "Bags with weight tags and a frame. How many boxes do the grams take?": "वज़न की पर्ची वाले थैले और एक फ्रेम। ग्राम कितने खाने लेते हैं?",
    "Every gram in its three places, every thousand carried or broken, and every question answered in full.": "हर ग्राम अपने तीन स्थानों में, हर हज़ार हासिल गया या तोड़ा गया, और हर सवाल का पूरा उत्तर।",
    "Free play. Any weights in the frame, with the carry, the break and the balance open.": "मुक्त खेल: फ्रेम में कोई भी वज़न, और हासिल, तोड़ना और तराज़ू सब खुले हैं।",
    "Tap the heavier bag too.": "भारी थैले को भी छुओ।",
    /* phase 1 */
    "Three places for grams": "ग्राम के लिए तीन स्थान",
    "The grams column has three boxes. How is a two-digit number of grams written?": "ग्राम के स्तंभ में तीन खाने हैं। दो अंकों वाले ग्राम कैसे लिखे जाते हैं?",
    "Which places does this number of grams fill?": "ग्राम की यह संख्या कौन-से स्थान भरती है?",
    "Grams fill hundreds, tens and ones. Which places does your number leave empty?": "ग्राम सैकड़ा, दहाई और इकाई भरते हैं। तुम्हारी संख्या कौन-से स्थान खाली छोड़ती है?",
    "Beside kilograms the grams take three places. A zero holds each place a short number of grams leaves empty.": "किलोग्राम के साथ ग्राम तीन स्थान लेते हैं। छोटी संख्या जो स्थान खाली छोड़ती है, वहाँ शून्य लिखा जाता है।",
    "You learned: beside kilograms, grams always take three places.": "तुमने सीखा: किलोग्राम के साथ ग्राम हमेशा तीन स्थान लेते हैं।",
    "Add 26 kilograms 48 grams and 13 kilograms 705 grams in columns.": "स्तंभों में 26 किलोग्राम 48 ग्राम और 13 किलोग्राम 705 ग्राम जोड़ो।",
    "Add 26 kg 48 g and 13 kg 705 g": "दोनों थैलों का वज़न जोड़ो",
    "How many grams boxes are there?": "ग्राम के कितने खाने हैं?",
    "How is 7 grams written in the grams column beside kilograms?": "किलोग्राम के साथ ग्राम के स्तंभ में 7 ग्राम कैसे लिखते हैं?",
    "7 g in the grams boxes": "ग्राम के खानों में 7 ग्रा",
    "Which box does the 7 stand in?": "7 किस खाने में आता है?",
    "12 kilograms 90 grams is written in columns. What goes in the grams column?": "12 किलोग्राम 90 ग्राम स्तंभों में लिखा है। ग्राम के स्तंभ में क्या आएगा?",
    "Grams boxes for 12 kg 90 g": "ग्राम के खाने: 90 ग्रा",
    "Read your three boxes aloud. Is that 90 grams?": "अपने तीनों खाने ज़ोर से पढ़ो। क्या यह 90 ग्राम है?",
    /* phase 2 */
    "Carrying a kilogram": "एक किलोग्राम हासिल",
    "The grams make more than a thousand. What is written, and what is carried?": "ग्राम एक हज़ार से ज़्यादा हो जाते हैं। क्या लिखा जाता है, और हासिल क्या जाता है?",
    "Is that a thousand or more?": "क्या यह एक हज़ार या उससे ज़्यादा है?",
    "Take a thousand out of the grams. That thousand is the one kilogram you carry.": "ग्राम में से एक हज़ार निकालो। वही हज़ार हासिल वाला एक किलोग्राम है।",
    "Add the grams first. Each full thousand grams is carried as one kilogram, and only the grams left are written.": "पहले ग्राम जोड़ो। हर पूरे हज़ार ग्राम का एक किलोग्राम हासिल जाता है, और बचे ग्राम ही लिखे जाते हैं।",
    "You learned: each full thousand grams is carried as one kilogram.": "तुमने सीखा: हर पूरे हज़ार ग्राम का एक किलोग्राम हासिल जाता है।",
    "Add 58 kilograms 675 grams and 34 kilograms 812 grams.": "58 किलोग्राम 675 ग्राम और 34 किलोग्राम 812 ग्राम जोड़ो।",
    "58 kg 675 g + 34 kg 812 g": "दोनों वज़न जोड़ो",
    "What do the grams add up to?": "ग्राम मिलकर कितने होते हैं?",
    "What do 34 kilograms 760 grams and 27 kilograms 385 grams make together?": "34 किलोग्राम 760 ग्राम और 27 किलोग्राम 385 ग्राम का कुल वज़न कितना है?",
    "34 kg 760 g + 27 kg 385 g": "दोनों का कुल वज़न?",
    "Did the carried kilogram join the kilograms?": "क्या हासिल वाला किलोग्राम किलोग्रामों में जुड़ा?",
    "A shop sold 15 kilograms 640 grams of flour and 22 kilograms 75 grams of rice. It also sold 9 kilograms 480 grams of sugar. What total weight did it sell?": "एक दुकान ने 15 किलोग्राम 640 ग्राम आटा और 22 किलोग्राम 75 ग्राम चावल बेचे। उसने 9 किलोग्राम 480 ग्राम चीनी भी बेची। कुल कितना वज़न बिका?",
    "Total weight sold": "कुल कितना वज़न बिका?",
    "Add all three grams first. How many whole thousands is that?": "पहले तीनों ग्राम जोड़ो। उसमें कितने पूरे हज़ार हैं?",
    /* phase 3 */
    "Borrowing from zero grams": "शून्य ग्राम से उधार",
    "No grams on top. Open one kilogram. How many grams does it give?": "ऊपर कोई ग्राम नहीं। एक किलोग्राम खोलो। उससे कितने ग्राम मिलते हैं?",
    "Where can grams come from when there are none?": "जब ग्राम हैं ही नहीं, तो ग्राम कहाँ से आएँगे?",
    "Open one kilogram on top, then add its 1,000 grams to the top grams.": "ऊपर का एक किलोग्राम खोलो, फिर उसके 1,000 ग्राम ऊपर के ग्राम में जोड़ो।",
    "To take grams from zero grams, break one kilogram into a thousand grams. The kilograms on top go down by one, and the grams on top become a thousand.": "शून्य ग्राम में से ग्राम घटाने के लिए एक किलोग्राम को हज़ार ग्राम में तोड़ो। ऊपर के किलोग्राम एक कम हो जाते हैं, और ऊपर के ग्राम हज़ार हो जाते हैं।",
    "You learned: when grams on top are too few, break one kilogram.": "तुमने सीखा: ऊपर के ग्राम कम हों, तो एक किलोग्राम तोड़ो।",
    "A crate holds 60 kilograms of mangoes. 18 kilograms 350 grams of them are sold. How much is left in the crate?": "एक पेटी में 60 किलोग्राम आम हैं। उनमें से 18 किलोग्राम 350 ग्राम बिक गए। पेटी में कितने बचे?",
    "Left in the crate?": "पेटी में कितना बचा?",
    "How many grams are on top?": "ऊपर कितने ग्राम हैं?",
    "Take 7 kilograms 425 grams from 20 kilograms.": "20 किलोग्राम में से 7 किलोग्राम 425 ग्राम घटाओ।",
    "Take 7 kg 425 g from 20 kg": "कितना बचेगा?",
    "Can you take 425 grams from zero grams?": "क्या शून्य ग्राम में से 425 ग्राम घट सकते हैं?",
    "From 81 kilograms 215 grams, take away 36 kilograms 780 grams.": "81 किलोग्राम 215 ग्राम में से 36 किलोग्राम 780 ग्राम निकालो।",
    "81 kg 215 g − 36 kg 780 g": "बाक़ी वज़न कितना?",
    "After the break, how many kilograms are on top?": "तोड़ने के बाद ऊपर कितने किलोग्राम हैं?",
    /* phase 4 */
    "Heavier, and by how much": "कौन भारी, और कितना",
    "The balance tips toward the heavier bag. The frame finds out by how much. The card takes both answers.": "तराज़ू भारी थैले की ओर झुकता है। फ्रेम बताता है कि कितना। कार्ड में दोनों उत्तर जाते हैं।",
    "What does the question ask for, one thing or two?": "सवाल क्या पूछता है, एक बात या दो?",
    "Tap the heavier one on the card. Then take the lighter weight from it in the frame.": "कार्ड पर भारी वाले को छुओ। फिर फ्रेम में उसमें से हल्का वज़न घटाओ।",
    "Compare the kilograms first, and the grams only when the kilograms are equal. Give both answers: the heavier one, and the difference.": "पहले किलोग्राम की तुलना करो, और ग्राम की तभी जब किलोग्राम बराबर हों। दोनों उत्तर दो: कौन भारी है, और अंतर।",
    "You learned: compare kilograms first, and give both answers.": "तुमने सीखा: पहले किलोग्राम की तुलना करो, और दोनों उत्तर दो।",
    "One suitcase weighs 17 kilograms 280 grams and another weighs 21 kilograms 45 grams. Which is heavier, and by how much?": "एक सूटकेस का वज़न 17 किलोग्राम 280 ग्राम है और दूसरे का 21 किलोग्राम 45 ग्राम। कौन भारी है, और कितना?",
    "Heavier, and by how much?": "कौन भारी, और कितना?",
    "Which way does the balance tip?": "तराज़ू किस ओर झुकता है?",
    "A bag of potatoes weighs 9 kilograms 150 grams. A bag of onions weighs 11 kilograms 40 grams. Name the heavier bag, and how much more it weighs.": "आलू के थैले का वज़न 9 किलोग्राम 150 ग्राम है। प्याज़ के थैले का वज़न 11 किलोग्राम 40 ग्राम है। भारी थैले का नाम बताओ, और वह कितना ज़्यादा है।",
    "Which bag, how much more?": "कौन-सा थैला, कितना ज़्यादा?",
    "Which bag has more kilograms, 9 or 11?": "किस थैले में ज़्यादा किलोग्राम हैं, 9 या 11?",
    "Parcel A weighs 12 kilograms 60 grams and parcel B weighs 12 kilograms 600 grams. Say which parcel is heavier, and the difference.": "पार्सल A का वज़न 12 किलोग्राम 60 ग्राम है और पार्सल B का 12 किलोग्राम 600 ग्राम। बताओ कौन-सा पार्सल भारी है, और अंतर कितना है।",
    "Which parcel, how much more?": "कौन-सा पार्सल, कितना ज़्यादा?",
    "The kilograms are equal. Which grams are more?": "किलोग्राम बराबर हैं। किसके ग्राम ज़्यादा हैं?",
    /* what the working area, the slot and the summary draw */
    "kg": "किग्रा", "g": "ग्रा",
    "heavier": "भारी", "how much": "कितना", "break 1 kg": "1 किग्रा तोड़ो",
    "bags in": "रखे थैले", "columns": "स्तंभ", "steps": "चरण",
    "suitcase 1": "सूटकेस 1", "suitcase 2": "सूटकेस 2", "potatoes": "आलू", "onions": "प्याज़", "parcel A": "पार्सल A", "parcel B": "पार्सल B",
  },
  gu: {
    "Weight Columns": "વજનના સ્તંભ",
    "Bags with weight tags and a frame. How many boxes do the grams take?": "વજનની ચિઠ્ઠીવાળી થેલીઓ અને એક ફ્રેમ. ગ્રામ કેટલાં ખાનાં લે છે?",
    "Every gram in its three places, every thousand carried or broken, and every question answered in full.": "દરેક ગ્રામ તેનાં ત્રણ સ્થાનમાં, દરેક હજાર વદી ગયો કે તોડાયો, અને દરેક પ્રશ્નનો પૂરો જવાબ.",
    "Free play. Any weights in the frame, with the carry, the break and the balance open.": "મુક્ત રમત: ફ્રેમમાં કોઈ પણ વજન, અને વદી, તોડવું અને ત્રાજવું બધું ખુલ્લું છે.",
    "Tap the heavier bag too.": "ભારે થેલીને પણ અડો.",
    /* phase 1 */
    "Three places for grams": "ગ્રામ માટે ત્રણ સ્થાન",
    "The grams column has three boxes. How is a two-digit number of grams written?": "ગ્રામના સ્તંભમાં ત્રણ ખાનાં છે. બે અંકના ગ્રામ કેવી રીતે લખાય?",
    "Which places does this number of grams fill?": "ગ્રામની આ સંખ્યા કયાં સ્થાન ભરે છે?",
    "Grams fill hundreds, tens and ones. Which places does your number leave empty?": "ગ્રામ શતક, દશક અને એકમ ભરે છે. તમારી સંખ્યા કયાં સ્થાન ખાલી છોડે છે?",
    "Beside kilograms the grams take three places. A zero holds each place a short number of grams leaves empty.": "કિલોગ્રામની સાથે ગ્રામ ત્રણ સ્થાન લે છે. નાની સંખ્યા જે સ્થાન ખાલી છોડે, ત્યાં શૂન્ય લખાય છે.",
    "You learned: beside kilograms, grams always take three places.": "તમે શીખ્યા: કિલોગ્રામની સાથે ગ્રામ હંમેશાં ત્રણ સ્થાન લે છે.",
    "Add 26 kilograms 48 grams and 13 kilograms 705 grams in columns.": "સ્તંભમાં 26 કિલોગ્રામ 48 ગ્રામ અને 13 કિલોગ્રામ 705 ગ્રામ ઉમેરો.",
    "Add 26 kg 48 g and 13 kg 705 g": "બંને થેલીનું વજન ઉમેરો",
    "How many grams boxes are there?": "ગ્રામનાં કેટલાં ખાનાં છે?",
    "How is 7 grams written in the grams column beside kilograms?": "કિલોગ્રામની સાથે ગ્રામના સ્તંભમાં 7 ગ્રામ કેવી રીતે લખાય?",
    "7 g in the grams boxes": "ગ્રામનાં ખાનાંમાં 7 ગ્રા",
    "Which box does the 7 stand in?": "7 કયા ખાનામાં આવે?",
    "12 kilograms 90 grams is written in columns. What goes in the grams column?": "12 કિલોગ્રામ 90 ગ્રામ સ્તંભમાં લખ્યું છે. ગ્રામના સ્તંભમાં શું આવશે?",
    "Grams boxes for 12 kg 90 g": "ગ્રામનાં ખાનાં: 90 ગ્રા",
    "Read your three boxes aloud. Is that 90 grams?": "તમારાં ત્રણે ખાનાં મોટેથી વાંચો. શું તે 90 ગ્રામ છે?",
    /* phase 2 */
    "Carrying a kilogram": "એક કિલોગ્રામની વદી",
    "The grams make more than a thousand. What is written, and what is carried?": "ગ્રામ એક હજારથી વધી જાય છે. શું લખાય, અને વદી શું જાય?",
    "Is that a thousand or more?": "શું તે એક હજાર કે વધુ છે?",
    "Take a thousand out of the grams. That thousand is the one kilogram you carry.": "ગ્રામમાંથી એક હજાર કાઢો. એ હજાર જ વદીનો એક કિલોગ્રામ છે.",
    "Add the grams first. Each full thousand grams is carried as one kilogram, and only the grams left are written.": "પહેલાં ગ્રામ ઉમેરો. દરેક પૂરા હજાર ગ્રામનો એક કિલોગ્રામ વદી જાય, અને બાકીના ગ્રામ જ લખાય.",
    "You learned: each full thousand grams is carried as one kilogram.": "તમે શીખ્યા: દરેક પૂરા હજાર ગ્રામનો એક કિલોગ્રામ વદી જાય છે.",
    "Add 58 kilograms 675 grams and 34 kilograms 812 grams.": "58 કિલોગ્રામ 675 ગ્રામ અને 34 કિલોગ્રામ 812 ગ્રામ ઉમેરો.",
    "58 kg 675 g + 34 kg 812 g": "બંને વજન ઉમેરો",
    "What do the grams add up to?": "ગ્રામ મળીને કેટલા થાય?",
    "What do 34 kilograms 760 grams and 27 kilograms 385 grams make together?": "34 કિલોગ્રામ 760 ગ્રામ અને 27 કિલોગ્રામ 385 ગ્રામનું કુલ વજન કેટલું?",
    "34 kg 760 g + 27 kg 385 g": "બંનેનું કુલ વજન?",
    "Did the carried kilogram join the kilograms?": "વદીનો કિલોગ્રામ કિલોગ્રામમાં ઉમેરાયો?",
    "A shop sold 15 kilograms 640 grams of flour and 22 kilograms 75 grams of rice. It also sold 9 kilograms 480 grams of sugar. What total weight did it sell?": "એક દુકાને 15 કિલોગ્રામ 640 ગ્રામ લોટ અને 22 કિલોગ્રામ 75 ગ્રામ ચોખા વેચ્યા. તેણે 9 કિલોગ્રામ 480 ગ્રામ ખાંડ પણ વેચી. કુલ કેટલું વજન વેચાયું?",
    "Total weight sold": "કુલ કેટલું વજન વેચાયું?",
    "Add all three grams first. How many whole thousands is that?": "પહેલાં ત્રણેય ગ્રામ ઉમેરો. તેમાં કેટલા પૂરા હજાર છે?",
    /* phase 3 */
    "Borrowing from zero grams": "શૂન્ય ગ્રામમાંથી ઉછીનું",
    "No grams on top. Open one kilogram. How many grams does it give?": "ઉપર એક પણ ગ્રામ નથી. એક કિલોગ્રામ ખોલો. તેમાંથી કેટલા ગ્રામ મળે?",
    "Where can grams come from when there are none?": "ગ્રામ જ ન હોય, તો ગ્રામ ક્યાંથી આવે?",
    "Open one kilogram on top, then add its 1,000 grams to the top grams.": "ઉપરનો એક કિલોગ્રામ ખોલો, પછી તેના 1,000 ગ્રામ ઉપરના ગ્રામમાં ઉમેરો.",
    "To take grams from zero grams, break one kilogram into a thousand grams. The kilograms on top go down by one, and the grams on top become a thousand.": "શૂન્ય ગ્રામમાંથી ગ્રામ બાદ કરવા એક કિલોગ્રામને હજાર ગ્રામમાં તોડો. ઉપરના કિલોગ્રામ એક ઓછા થાય, અને ઉપરના ગ્રામ હજાર થાય.",
    "You learned: when grams on top are too few, break one kilogram.": "તમે શીખ્યા: ઉપરના ગ્રામ ઓછા હોય, તો એક કિલોગ્રામ તોડો.",
    "A crate holds 60 kilograms of mangoes. 18 kilograms 350 grams of them are sold. How much is left in the crate?": "એક પેટીમાં 60 કિલોગ્રામ કેરી છે. તેમાંથી 18 કિલોગ્રામ 350 ગ્રામ વેચાઈ ગઈ. પેટીમાં કેટલી બાકી રહી?",
    "Left in the crate?": "પેટીમાં કેટલું બચ્યું?",
    "How many grams are on top?": "ઉપર કેટલા ગ્રામ છે?",
    "Take 7 kilograms 425 grams from 20 kilograms.": "20 કિલોગ્રામમાંથી 7 કિલોગ્રામ 425 ગ્રામ બાદ કરો.",
    "Take 7 kg 425 g from 20 kg": "કેટલું બાકી રહેશે?",
    "Can you take 425 grams from zero grams?": "શું શૂન્ય ગ્રામમાંથી 425 ગ્રામ બાદ થાય?",
    "From 81 kilograms 215 grams, take away 36 kilograms 780 grams.": "81 કિલોગ્રામ 215 ગ્રામમાંથી 36 કિલોગ્રામ 780 ગ્રામ કાઢો.",
    "81 kg 215 g − 36 kg 780 g": "બાકી વજન કેટલું?",
    "After the break, how many kilograms are on top?": "તોડ્યા પછી ઉપર કેટલા કિલોગ્રામ છે?",
    /* phase 4 */
    "Heavier, and by how much": "કયું ભારે, અને કેટલું",
    "The balance tips toward the heavier bag. The frame finds out by how much. The card takes both answers.": "ત્રાજવું ભારે થેલી તરફ નમે છે. ફ્રેમ બતાવે છે કે કેટલું. કાર્ડમાં બંને જવાબ જાય છે.",
    "What does the question ask for, one thing or two?": "પ્રશ્ન શું પૂછે છે, એક વાત કે બે?",
    "Tap the heavier one on the card. Then take the lighter weight from it in the frame.": "કાર્ડ પર ભારે વાળાને અડો. પછી ફ્રેમમાં તેમાંથી હલકું વજન બાદ કરો.",
    "Compare the kilograms first, and the grams only when the kilograms are equal. Give both answers: the heavier one, and the difference.": "પહેલાં કિલોગ્રામ સરખાવો, અને ગ્રામ ત્યારે જ, જ્યારે કિલોગ્રામ સરખા હોય. બંને જવાબ આપો: કયું ભારે છે, અને તફાવત.",
    "You learned: compare kilograms first, and give both answers.": "તમે શીખ્યા: પહેલાં કિલોગ્રામ સરખાવો, અને બંને જવાબ આપો.",
    "One suitcase weighs 17 kilograms 280 grams and another weighs 21 kilograms 45 grams. Which is heavier, and by how much?": "એક સૂટકેસનું વજન 17 કિલોગ્રામ 280 ગ્રામ છે અને બીજીનું 21 કિલોગ્રામ 45 ગ્રામ. કઈ ભારે છે, અને કેટલી વધુ?",
    "Heavier, and by how much?": "કયું ભારે, અને કેટલું?",
    "Which way does the balance tip?": "ત્રાજવું કઈ બાજુ નમે છે?",
    "A bag of potatoes weighs 9 kilograms 150 grams. A bag of onions weighs 11 kilograms 40 grams. Name the heavier bag, and how much more it weighs.": "બટાકાની થેલીનું વજન 9 કિલોગ્રામ 150 ગ્રામ છે. ડુંગળીની થેલીનું વજન 11 કિલોગ્રામ 40 ગ્રામ છે. ભારે થેલીનું નામ કહો, અને તે કેટલી વધુ છે.",
    "Which bag, how much more?": "કઈ થેલી, કેટલું વધુ?",
    "Which bag has more kilograms, 9 or 11?": "કઈ થેલીમાં વધુ કિલોગ્રામ છે, 9 કે 11?",
    "Parcel A weighs 12 kilograms 60 grams and parcel B weighs 12 kilograms 600 grams. Say which parcel is heavier, and the difference.": "પાર્સલ Aનું વજન 12 કિલોગ્રામ 60 ગ્રામ છે અને પાર્સલ Bનું 12 કિલોગ્રામ 600 ગ્રામ. કયું પાર્સલ ભારે છે અને તફાવત કેટલો છે, તે કહો.",
    "Which parcel, how much more?": "કયું પાર્સલ, કેટલું વધુ?",
    "The kilograms are equal. Which grams are more?": "કિલોગ્રામ સરખા છે. કોના ગ્રામ વધુ છે?",
    /* what the working area, the slot and the summary draw */
    "kg": "કિગ્રા", "g": "ગ્રા",
    "heavier": "ભારે", "how much": "કેટલું", "break 1 kg": "1 કિગ્રા તોડો",
    "bags in": "મૂકેલી થેલી", "columns": "સ્તંભ", "steps": "પગલાં",
    "suitcase 1": "સૂટકેસ 1", "suitcase 2": "સૂટકેસ 2", "potatoes": "બટાકા", "onions": "ડુંગળી", "parcel A": "પાર્સલ A", "parcel B": "પાર્સલ B",
  },
};

/* the chapter's colours, which are the pictures' colours too: the larger unit (kilograms) deep blue, the
   smaller unit (grams) green, a kilogram carried or broken and every figure it rewrites amber, what is left
   and the difference reddish purple, a count of things (bags) sky blue. A zero that holds an empty grams
   place is grey, at full size. Coloured numerals use a deeper ink so they read at 4.5:1. */
const WC_KG = CONTENT.hundred;
const WC_G = CONTENT.one;
const WC_MOVE = CONTENT.ten;
const WC_LEFT = CONTENT.bead;
const WC_SKY = "#56B4E9";
const WC_ZERO = "#767676";
const WC_INK: any = { kg: shade(WC_KG, 0.25), g: shade(WC_G, 0.25), move: shade(WC_MOVE, 0.42), left: shade(WC_LEFT, 0.35) };
/* a measure in two units: the slot's two boxes, kilograms then grams, each named by its unit symbol
   (BUILD_CARD §7, 2026-09-24: the word goes in the ask and the voice, never in the box) */
const WC_PARTS = [{ label: "kg" }, { label: "g" }];
/* Free play's bags: pairs that carry (3 kg 450 g + 1 kg 800 g, 4 kg 625 g + 3 kg 450 g or 1 kg 800 g),
   break (5 kg less 2 kg 75 g, 3 kg 450 g less 1 kg 800 g) and neither (2 kg 75 g + 1 kg 800 g) */
const WC_FREE_BAGS = [{ id: "f1", kg: 3, g: 450 }, { id: "f2", kg: 1, g: 800 }, { id: "f3", kg: 2, g: 75 }, { id: "f4", kg: 5, g: 0 }, { id: "f5", kg: 4, g: 625 }];

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
           choices? [{ id, label }] for a word answer; pad?: "enter" when it is made on the working area
           parts?  [{ label, unit? }, …] with answer [a, b]: two boxes in the slot (quotient · remainder;
                   label at most 10 characters, e.g. { label: "each bowl", unit: "mL" }); typed reads "16|1".
                   A fraction: parts: SLOT_FRACTION, answer [3, 4] (drawn stacked). A mixed number or a
                   tidied answer: parts: SLOT_MIXED, answer [1, 2, 3] · [5, null, null] · [null, 7, 10]
                   (null = that box stays empty; the slot never says which kind the answer is)
                   A decimal: answer "0.09", a string in its written form (so "0.30" is not "0.3" and ".3"
                   is not "0.3"), with pointKey: true in the tool object below (the pad's point key) */
const PHASES = [
  {
    n: 1,
    concept: "Three places for grams",
    conceptId: "M2.S3.T6.C20", objectiveIds: ["O9"],
    says: ["The grams column has three boxes. How is a two-digit number of grams written?"],
    /* tries, as the plan writes it: A miss is answered three ways at once and none of them is the answer. First rung, from the item's own miss line: how many grams boxes are there? Second rung, the phase's: which places does this number of grams fill? Third rung: the tag is cut to a single-digit number of grams, and the child fills all three boxes before the longer tag comes back. The number pad stays open behind all three rungs. */
    /* rung 3 is spoken: the plan's cut-down tag is a stage direction, said here as the rule it teaches */
    ladder: ["Which places does this number of grams fill?", "Grams fill hundreds, tens and ones. Which places does your number leave empty?"],
    closing: "Beside kilograms the grams take three places. A zero holds each place a short number of grams leaves empty.",
    /* the summary page's row: "You learned: ..." in at most 72 characters */
    learned: "You learned: beside kilograms, grams always take three places.",
    /* the traceback for a miss, in one line (it goes into the sidecar) */
    traceback: "The bags drop into the frame with a grey zero in each empty grams place, the grams are counted out, and the columns are added into the answer row.",
    items: [
      /* learn ML1: answer in the plan = 39 kg 753 g. Each bag is dragged onto the frame (48 g drops in as
         0 4 8, the zero grey); the sum goes in the slot's two boxes and stands in the frame's answer row */
      { qid: "M2.S3.T6.C20:ML1", kind: "add", rows: [[26, 48], [13, 705]], parts: WC_PARTS, answer: [39, 753], near: [40, 185],
        say: "Add 26 kilograms 48 grams and 13 kilograms 705 grams in columns.", ask: "Add 26 kg 48 g and 13 kg 705 g",
        miss: "How many grams boxes are there?" },
      /* practice 1: answer in the plan = 007, because grams take three places. The child types the three
         grams boxes (the frame fills them left to right as the digits come); "7" or "700" is not it */
      { qid: "M2.S3.T6.C20:1", kind: "write", rows: [[null, 7]], answer: "007", near: "700",
        say: "How is 7 grams written in the grams column beside kilograms?", ask: "7 g in the grams boxes",
        miss: "Which box does the 7 stand in?" },
      /* practice 2: answer in the plan = 090 */
      { qid: "M2.S3.T6.C20:2", kind: "write", rows: [[12, 90]], answer: "090", near: "900",
        say: "12 kilograms 90 grams is written in columns. What goes in the grams column?", ask: "Grams boxes for 12 kg 90 g",
        miss: "Read your three boxes aloud. Is that 90 grams?" },
    ],
  },
  {
    n: 2,
    concept: "Carrying a kilogram",
    conceptId: "M2.S3.T6.C21", objectiveIds: ["O9"],
    says: ["The grams make more than a thousand. What is written, and what is carried?"],
    /* tries, as the plan writes it: First rung, from the item: what do the grams add up to? Second rung, the phase's: is that a thousand or more? Third rung: the frame is cut to two weights whose grams make just over a thousand, and the child carries before the larger sum comes back. The number pad stays open. */
    ladder: ["Is that a thousand or more?", "Take a thousand out of the grams. That thousand is the one kilogram you carry."],
    closing: "Add the grams first. Each full thousand grams is carried as one kilogram, and only the grams left are written.",
    /* the summary page's row: "You learned: ..." in at most 72 characters */
    learned: "You learned: each full thousand grams is carried as one kilogram.",
    /* the traceback for a miss, in one line (it goes into the sidecar) */
    traceback: "The grams are added, a thousand of them gathers into one kilogram weight over the kilograms, only the grams left go down, and the kilograms are added with the carried one.",
    items: [
      /* learn ML2: answer in the plan = 93 kg 487 g. The child drags the kilogram weight over the kilograms */
      { qid: "M2.S3.T6.C21:ML2", kind: "carry", rows: [[58, 675], [34, 812]], parts: WC_PARTS, answer: [93, 487], near: [92, 1487],
        say: "Add 58 kilograms 675 grams and 34 kilograms 812 grams.", ask: "58 kg 675 g + 34 kg 812 g",
        miss: "What do the grams add up to?" },
      /* practice 3: answer in the plan = 62 kg 145 g. The grams make 1145, so write 145 and carry 1 kg */
      { qid: "M2.S3.T6.C21:3", kind: "carry", rows: [[34, 760], [27, 385]], parts: WC_PARTS, answer: [62, 145], near: [61, 145],
        say: "What do 34 kilograms 760 grams and 27 kilograms 385 grams make together?", ask: "34 kg 760 g + 27 kg 385 g",
        miss: "Did the carried kilogram join the kilograms?" },
      /* practice 4: answer in the plan = 47 kg 195 g. The grams make 1195, so write 195 and carry 1 kg */
      { qid: "M2.S3.T6.C21:4", kind: "carry", rows: [[15, 640], [22, 75], [9, 480]], parts: WC_PARTS, answer: [47, 195], near: [46, 1195],
        say: "A shop sold 15 kilograms 640 grams of flour and 22 kilograms 75 grams of rice. It also sold 9 kilograms 480 grams of sugar. What total weight did it sell?",
        ask: "Total weight sold", miss: "Add all three grams first. How many whole thousands is that?" },
    ],
  },
  {
    n: 3,
    concept: "Borrowing from zero grams",
    conceptId: "M2.S3.T6.C22", objectiveIds: ["O10"],
    says: ["No grams on top. Open one kilogram. How many grams does it give?"],
    /* tries, as the plan writes it: First rung, from the item: how many grams are on top? Second rung, the phase's: where can grams come from when there are none? Third rung: the frame is cut to one kilogram, written with zero zero zero, and a few grams below, and the child opens it before the larger take-away comes back. The number pad stays open. */
    ladder: ["Where can grams come from when there are none?", "Open one kilogram on top, then add its 1,000 grams to the top grams."],
    closing: "To take grams from zero grams, break one kilogram into a thousand grams. The kilograms on top go down by one, and the grams on top become a thousand.",
    /* the summary page's row: "You learned: ..." in at most 72 characters */
    learned: "You learned: when grams on top are too few, break one kilogram.",
    /* the traceback for a miss, in one line (it goes into the sidecar) */
    traceback: "The grams on top are too few, so one kilogram is broken: the kilograms on top are struck and written one less in amber, a thousand grams join the grams on top, then the grams and the kilograms are taken away.",
    items: [
      /* learn ML3: answer in the plan = 41 kg 650 g of mangoes is left in the crate. The child taps the
         break control: 60 is struck and 59 written above, and 000 becomes 1,000 */
      { qid: "M2.S3.T6.C22:ML3", kind: "take", rows: [[60, 0], [18, 350]], parts: WC_PARTS, answer: [41, 650], near: [42, 350],
        say: "A crate holds 60 kilograms of mangoes. 18 kilograms 350 grams of them are sold. How much is left in the crate?",
        ask: "Left in the crate?", miss: "How many grams are on top?" },
      /* practice 5: answer in the plan = 12 kg 575 g. Write 20 kg as 20 kg 000 g and break one kilogram into a thousand grams */
      { qid: "M2.S3.T6.C22:5", kind: "take", rows: [[20, 0], [7, 425]], parts: WC_PARTS, answer: [12, 575], near: [13, 425],
        say: "Take 7 kilograms 425 grams from 20 kilograms.", ask: "Take 7 kg 425 g from 20 kg",
        miss: "Can you take 425 grams from zero grams?" },
      /* practice 6: answer in the plan = 44 kg 435 g. Break one kilogram: 80 kg 1215 g, and 1215 less 780 is 435.
         Its near miss is the brief's: the kilogram broken but the kilograms left as they were (45 kg 435 g) */
      { qid: "M2.S3.T6.C22:6", kind: "take", rows: [[81, 215], [36, 780]], parts: WC_PARTS, answer: [44, 435], near: [45, 435],
        say: "From 81 kilograms 215 grams, take away 36 kilograms 780 grams.", ask: "81 kg 215 g − 36 kg 780 g",
        miss: "After the break, how many kilograms are on top?" },
    ],
  },
  {
    n: 4,
    concept: "Heavier, and by how much",
    conceptId: "M2.S3.T6.C23", objectiveIds: ["O10"],
    /* the plan's teach asked the first question's own words ("which is heavier, and how much") before the
       question did; said here as what the three objects on the screen do */
    says: ["The balance tips toward the heavier bag. The frame finds out by how much. The card takes both answers."],
    /* tries, as the plan writes it: First rung, from the item: which way does the balance tip? Second rung, the phase's: what does the question ask for, one thing or two? Third rung: the bags are cut to two whose kilograms differ and whose grams are both zero, and the child fills both blanks before the larger pair comes back. The bag keys and the number pad stay open. */
    ladder: ["What does the question ask for, one thing or two?", "Tap the heavier one on the card. Then take the lighter weight from it in the frame."],
    /* the plan's first sentence ran to 26 words (the bubble's limit is 20): split, and the second no longer
       echoes the first question's words */
    closing: "Compare the kilograms first, and the grams only when the kilograms are equal. Give both answers: the heavier one, and the difference.",
    /* the summary page's row: "You learned: ..." in at most 72 characters */
    learned: "You learned: compare kilograms first, and give both answers.",
    /* the traceback for a miss, in one line (it goes into the sidecar) */
    traceback: "The balance's lower pan is lit and the kilograms are compared first; the take-away runs in the frame, with a kilogram broken where the grams are too few, and ends on the heavier one and the difference.",
    items: [
      /* learn ML4: answer in the plan = The second suitcase is heavier, by 3 kg 765 g. The answer card has two
         blanks on the working area: a key for the heavier one, and kilograms and grams cells that borrow the
         pad (api.capture). answer "pick|kg|g" (kg empty when there are no whole kilograms, as "B||540");
         the card never closes on the difference alone */
      { qid: "M2.S3.T6.C23:ML4", kind: "compare", pad: "enter", winMs: 2800, answer: "second|3|765", near: "first|3|765",
        bags: [{ id: "first", label: "suitcase 1", kg: 17, g: 280 }, { id: "second", label: "suitcase 2", kg: 21, g: 45 }],
        say: "One suitcase weighs 17 kilograms 280 grams and another weighs 21 kilograms 45 grams. Which is heavier, and by how much?",
        ask: "Heavier, and by how much?", miss: "Which way does the balance tip?" },
      /* practice 7: answer in the plan = The bag of onions is heavier, by 1 kg 890 g. The onions hang on the
         left pan (the heavier bag is not always the second one) */
      { qid: "M2.S3.T6.C23:7", kind: "compare", pad: "enter", winMs: 2800, answer: "onions|1|890", near: "|1|890",
        bags: [{ id: "onions", label: "onions", kg: 11, g: 40 }, { id: "potatoes", label: "potatoes", kg: 9, g: 150 }],
        say: "A bag of potatoes weighs 9 kilograms 150 grams. A bag of onions weighs 11 kilograms 40 grams. Name the heavier bag, and how much more it weighs.",
        ask: "Which bag, how much more?", miss: "Which bag has more kilograms, 9 or 11?" },
      /* practice 8: answer in the plan = Parcel B is heavier, by 540 g. The kilograms are equal, and 600 g is more than 060 g.
         Its near miss is the brief's: "they weigh the same", so no difference */
      { qid: "M2.S3.T6.C23:8", kind: "compare", pad: "enter", winMs: 2800, answer: "B||540", near: "B|0|0",
        bags: [{ id: "A", label: "parcel A", kg: 12, g: 60 }, { id: "B", label: "parcel B", kg: 12, g: 600 }],
        say: "Parcel A weighs 12 kilograms 60 grams and parcel B weighs 12 kilograms 600 grams. Say which parcel is heavier, and the difference.",
        ask: "Which parcel, how much more?", miss: "The kilograms are equal. Which grams are more?" },
    ],
  },
];

/* The numbers, rows, sizes and targets the working area needs (they go into the sidecar too). */
const MODEL = {
  gramsPerKilogram: 1000, gramsBoxes: 3,
  /* the frame: a kilograms column, a near-black line, then the grams in exactly three boxes */
  frame: { width: 412, rowHeight: 64, gramsBox: 60, rows: "up to three, a rule, then the answer row" },
  /* what each kind of question is made of: add (bags into the frame, then the sum), write (the three grams
     boxes of one weight), carry (a thousand grams carried as one kilogram), take (one kilogram broken into a
     thousand grams), compare (a balance and a two-blank card: the heavier one, and the difference) */
  kinds: ["add", "write", "carry", "take", "compare"],
  freePlayBags: WC_FREE_BAGS,
  colours: { kilograms: WC_KG, grams: WC_G, carriedOrBroken: WC_MOVE, leftOrDifference: WC_LEFT, bags: WC_SKY, paddingZero: WC_ZERO },
};

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* judge: is this value right for this item? A card answer is "pick|kg|g": the heavier one AND the
   difference, so the difference alone ("|3|765") is never right. The grams of one weight ("007") are
   judged as written: three places, so "7" and "700" are not "007". */
const judge = (item: any, v: any) => {
  if (item.kind === "compare") {
    const got = String(Array.isArray(v) ? v.join("|") : v ?? "").split("|"), want = String(item.answer).split("|");
    return got.length === 3 && got[0] === want[0] && /^\d*$/.test(got[1]) && /^\d+$/.test(got[2])
      && Number(got[1] || 0) === Number(want[1]) && Number(got[2]) === Number(want[2]);
  }
  if (item.parts) return judgeSlotParts(item, v);
  if (typeof item.answer === "number") return leadNumber(v) === item.answer;
  return String(v ?? "").trim() === String(item.answer);
};
/* oracle: every answer re-derived by a second route that shares no code with judge or Work: everything
   is turned into grams, added or taken away whole, and turned back (the picture works column by column) */
const oracle = () => PHASES.every((p: any) => p.items.every((it: any) => {
  const inGrams = (kg: any, g: number) => Number(kg || 0) * 1000 + g;
  const back = (t: number) => [Math.floor(t / 1000), t % 1000];
  if (it.kind === "write") return it.answer === ("00" + it.rows[0][1]).slice(-3);
  if (it.kind === "add" || it.kind === "carry") {
    const t = back(it.rows.reduce((a: number, r: any) => a + inGrams(r[0], r[1]), 0));
    return it.answer[0] === t[0] && it.answer[1] === t[1];
  }
  if (it.kind === "take") {
    const t = back(inGrams(it.rows[0][0], it.rows[0][1]) - inGrams(it.rows[1][0], it.rows[1][1]));
    return it.answer[0] === t[0] && it.answer[1] === t[1];
  }
  if (it.kind === "compare") {
    const [a, b] = it.bags.map((x: any) => ({ id: x.id, t: inGrams(x.kg, x.g) }));
    const d = back(Math.abs(a.t - b.t));
    return a.t !== b.t && it.answer === [a.t > b.t ? a.id : b.id, d[0] || "", d[1]].join("|");
  }
  return false;
}));
/* the item's own misconception (judge must reject it): 48 g read as 480 g, 1487 g written whole, the
   kilogram not paid for, the lighter bag chosen, the difference given alone */
const nearMiss = (item: any) => item.near;
/* the forms of an answer that no question, hint or ladder line may print (a card's names are in its
   question, so only the difference counts) */
const answerForms = (item: any) => {
  const nums = item.kind === "compare" ? String(item.answer).split("|").slice(1).map(Number) : Array.isArray(item.answer) ? item.answer : null;
  if (nums) return nums.filter((x: number) => x >= 10).flatMap((x: number) => [String(x), indian(x), words(x)]);
  return [String(item.answer)];
};
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => item.answer;
/* a measure read out as the book writes it: 3 kg 765 g, and 540 g when there are no whole kilograms */
const wcMeasure = (kg: any, g: any, tx: any) => (Number(kg || 0) ? `${Number(kg)} ${tx("kg")} ${Number(g || 0)} ${tx("g")}` : `${Number(g || 0)} ${tx("g")}`);
/* the slot: a card answer ("onions|1|890") reads as the difference the child gave; a number typed into a
   kg or g box from 1,000 up takes its commas, as the working area writes it ("1,487") */
const format = (v: any, j: any, o: any) => {
  const s = String(v ?? ""), t = (o && o.tx) || ((x: any) => x);
  if (j === undefined && s.includes("|")) { const a = s.split("|"); return wcMeasure(a[1], a[2], t); }
  if (j !== undefined && /^\d+$/.test(s) && Number(s) >= 1000) return indian(Number(s));
  return s;
};

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => (T.state().stage === "demo" ? HOOK.demo && HOOK.demo() : T.submit(item.answer));
/* the agent's answer() for an item made on the working area: set it as a child would; undefined = type it */
const answer = (item: any, v: any) => (item.pad === "enter" && HOOK.set ? HOOK.set(v) : undefined);
/* the agent's check() before Enter: e.g. drop a token that waits; undefined = press Enter */
const check = () => (HOOK.check ? HOOK.check() : undefined);

/* ── the working area: 1086 x 528, origin at its top-left ────────────────────────────────────
   Countable things use CONTENT colours (url(#gHundred|gTen|gOne|gBead|gPointer)); coloured numerals
   and words use a deeper ink, shade(colour, 0.25), so they read at 4.5:1. Type uses T.* only.
   Pieces: drag = useDrag(onDrop) then {...control(id, label), ...drag.bind(pay), ...drag.keys(pay)};
   taps = <Hit id x y w h onPress label />. One <Invite/> marks the one thing to touch.
   Nothing is written here that the voice already says. `wrong` = { value, tries } after a miss:
   lock, redraw the mathematics in steps (the traceback), unlock; never mark it, never reset it.
   stage === "free" is Free play (the plan's writeup.freePlay): no target, every control unlocked. */
/* the frame, in its own units: the kilograms column, the near-black line, then exactly three grams boxes
   (hundreds, tens, ones); rows of 64 on a step of 68 under the carry row */
const WC_FR = { w: 412, kgL: 52, kgR: 180, bar: 196, gL: 212, box: 60, gap: 4, step: 68, rows0: 150 };
const wcBoxX = (k: number) => WC_FR.gL + k * (WC_FR.box + WC_FR.gap);
/* a fourth digit of grams has no box: it stands on the line between the columns */
const wcBoxMid = (k: number) => (k < 0 ? WC_FR.bar : wcBoxX(k) + WC_FR.box / 2);
const wcRowTop = (r: number) => WC_FR.rows0 + r * WC_FR.step;
const wcThree = (g: number) => String(g).padStart(3, "0");
const wcInside = (p: any, r: any) => !!p && isFinite(p.x) && isFinite(p.y) && p.x >= r.x && p.x <= r.x + r.w && p.y >= r.y && p.y <= r.y + r.h;
/* the balance's own judgement: kilograms first, the grams only when the kilograms are equal */
const wcHeavier = (a: any, b: any) => (a.kg !== b.kg ? a.kg - b.kg : a.g - b.g);
/* the columns as the frame works them: grams first, each full thousand carried as one kilogram */
const wcAddCols = (rows: any[]) => {
  const gs = rows.reduce((a: number, r: any) => a + r[1], 0), carry = Math.floor(gs / 1000);
  return { gs, carry, g: gs - carry * 1000, kg: rows.reduce((a: number, r: any) => a + (r[0] || 0), 0) + carry };
};
/* take away: grams too few on top, so one kilogram is broken into a thousand grams */
const wcTakeCols = (top: any[], bot: any[]) => {
  const need = top[1] < bot[1], tk = need ? top[0] - 1 : top[0], tg = need ? top[1] + 1000 : top[1];
  return { need, tk, tg, kg: tk - (bot[0] || 0), g: tg - bot[1] };
};
/* grams as digits in the three boxes. "left": typed into the boxes one by one; "right": a number standing
   against the ones box. Zeros in front of the first digit are grey: they hold a place. */
const wcCells = (s: any, from: string) => {
  const all = String(s ?? "").replace(/\D/g, "");
  const d = from === "left" ? all.slice(0, 3) : all.slice(-4);
  const lead = d.search(/[1-9]/);
  return d.split("").map((ch, i) => ({ ch, slot: from === "left" ? i : 3 - d.length + i, grey: lead < 0 || i < lead }));
};

/* a weight: a block with a knob (a kilogram carried, the difference on a pan) */
function wcWeight(x: number, y: number, w: number, h: number, fill: string, edge: string) {
  return (
    <g>
      <circle cx={x + w / 2} cy={y + h * 0.15} r={Math.max(4, h * 0.12)} fill="none" stroke={edge} strokeWidth={4} />
      <path d={`M ${x + w * 0.18} ${y + h * 0.28} L ${x + w * 0.82} ${y + h * 0.28} L ${x + w} ${y + h} L ${x} ${y + h} Z`}
        fill={fill} stroke={edge} strokeWidth={2.5} strokeLinejoin="round" />
    </g>
  );
}

/* a bag with its weight tag: kilograms in blue ink over grams in green ink */
function wcBagArt(x: number, y: number, w: number, h: number, kg: any, g: any, C: any, tx: any, size: number) {
  const lines: any[] = [];
  if (kg) lines.push({ t: `${kg} ${tx("kg")}`, f: WC_INK.kg });
  if (g || !kg) lines.push({ t: `${g} ${tx("g")}`, f: WC_INK.g });
  /* a sack: the cloth gathered above a tie, the body swelling out below it */
  const neck = y + h * 0.2, step = size + (h < 100 ? 2 : 4), tagH = lines.length * step + 12, tagW = w * 0.86;
  const cx = x + w / 2, nk = w * 0.13, r = Math.min(26, w * 0.18), edge = shade(WC_SKY, 0.35), body = tint(WC_SKY, 0.45);
  const room = (y + h - neck - tagH) / 2, tagY = neck + room + Math.max(0, Math.min(4, room));
  return (
    <g>
      <path d={`M ${cx - nk} ${neck} L ${cx - nk * 2} ${y + 4} Q ${cx} ${y + 16} ${cx + nk * 2} ${y + 4} L ${cx + nk} ${neck} Z`}
        fill={body} stroke={edge} strokeWidth={3} strokeLinejoin="round" />
      <path d={`M ${cx - nk} ${neck} Q ${x} ${neck + 4} ${x} ${neck + (y + h - neck) * 0.45} L ${x} ${y + h - r} Q ${x} ${y + h} ${x + r} ${y + h}
        L ${x + w - r} ${y + h} Q ${x + w} ${y + h} ${x + w} ${y + h - r} L ${x + w} ${neck + (y + h - neck) * 0.45} Q ${x + w} ${neck + 4} ${cx + nk} ${neck} Z`}
        fill={body} stroke={edge} strokeWidth={3} strokeLinejoin="round" />
      <line x1={cx - nk * 1.3} y1={neck} x2={cx + nk * 1.3} y2={neck} stroke={edge} strokeWidth={6} strokeLinecap="round" />
      <rect x={cx - tagW / 2} y={tagY} width={tagW} height={tagH} rx={8} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} />
      {lines.map((l: any, i: number) => (
        <text key={i} x={cx} y={tagY + 2 + (i + 1) * step} textAnchor="middle" fontSize={size} fontWeight={700} fill={l.f}>{l.t}</text>
      ))}
    </g>
  );
}

/* grams counted out: bars of a hundred, bars of ten, squares of one gram */
function wcCounted(x: number, y: number, g: number, tx: any) {
  const out: any[] = [];
  let cx = x;
  const bar = (key: string, yy: number, w: number, h: number, step: number) => {
    out.push(<rect key={key} x={cx} y={yy} width={w} height={h} rx={4} fill={WC_G} stroke={shade(WC_G, 0.3)} strokeWidth={2} />);
    cx += step;
  };
  for (let i = 0; i < Math.floor(g / 100); i++) bar("h" + i, y, 16, 120, 24);
  for (let i = 0; i < Math.floor((g % 100) / 10); i++) bar("t" + i, y + 60, 14, 60, 22);
  for (let i = 0; i < g % 10; i++) bar("o" + i, y + 102, 18, 18, 26);
  return (
    <g>
      {out}
      <text x={x} y={y + 166} fontSize={T.label} fontWeight={700} fill={WC_INK.g}>{`${g} ${tx("g")}`}</text>
    </g>
  );
}

/* one kilogram opened: ten green bars of a hundred grams */
function wcThousand(x: number, y: number, tx: any) {
  return (
    <g>
      {Array.from({ length: 10 }).map((_: any, i: number) => (
        <rect key={i} x={x + i * 20} y={y} width={14} height={100} rx={4} fill={WC_G} stroke={shade(WC_G, 0.3)} strokeWidth={2} />
      ))}
      <text x={x + 97} y={y + 140} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={WC_INK.g}>{indian(1000) + " " + tx("g")}</text>
    </g>
  );
}

/* the frame. s = { rows: [{ kg, cells, struck?, lit? }], sign, carry, broken: { kg, g } | null,
   answer: { kg, cells, kgTone, gTone } | null, readout: { text, tone } | null, rings: [box] } */
function wcFrame(x: number, y: number, s: any, C: any, tx: any) {
  const F = WC_FR, n = s.rows.length, gw = 3 * F.box + 2 * F.gap;
  const ruleY = wcRowTop(n) + 2, ansTop = ruleY + 8;
  const bottom = s.answer ? ansTop + 70 : wcRowTop(n) + 4;
  const ink = (t: string) => WC_INK[t] || C.ink;
  const boxes = (key: string, top: number, lit?: boolean) => [0, 1, 2].map((k) => (
    <rect key={key + k} x={wcBoxX(k)} y={top + 2} width={F.box} height={F.box} rx={8} fill="#FFFFFF"
      stroke={lit ? C.accent : tint(WC_G, 0.3)} strokeWidth={lit ? 4 : 2} />
  ));
  const kgNum = (key: string, top: number, v: any, t: string) => (v === "" || v === null || v === undefined ? null
    : <text key={key} x={F.kgR - 14} y={top + 52} textAnchor="end" fontSize={T.xl} fontWeight={700} fill={ink(t)}>{String(v)}</text>);
  const grams = (key: string, top: number, cells: any[], t: string) => cells.map((c: any, i: number) => (
    <text key={key + i} x={wcBoxMid(c.slot)} y={top + 52} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={c.grey ? WC_ZERO : ink(t)}>{c.ch}</text>
  ));
  return (
    <g transform={`translate(${x},${y})`}>
      {/* the joining sign: a thousand grams make one kilogram */}
      <text x={190} y={30} textAnchor="end" fontSize={T.micro} fontWeight={600} fill={WC_INK.kg}>{"1 " + tx("kg")}</text>
      <text x={206} y={30} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>=</text>
      <text x={222} y={30} fontSize={T.micro} fontWeight={600} fill={WC_INK.g}>{indian(1000) + " " + tx("g")}</text>
      <rect x={0} y={40} width={F.w} height={bottom - 40} rx={RAD.panel} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} />
      <rect x={F.kgL - 8} y={46} width={F.kgR - F.kgL + 16} height={bottom - 52} rx={12} fill={tint(WC_KG, 0.9)} />
      <rect x={F.gL - 6} y={46} width={gw + 12} height={bottom - 52} rx={12} fill={tint(WC_G, 0.9)} />
      <line x1={F.bar} y1={48} x2={F.bar} y2={bottom - 6} stroke={CONTENT.line} strokeWidth={4} />
      <text x={(F.kgL + F.kgR) / 2} y={76} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={WC_INK.kg}>{tx("kg")}</text>
      <text x={F.gL + gw / 2} y={76} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={WC_INK.g}>{tx("g")}</text>
      {/* the carry row: the kilogram weight carried over the kilograms (deep blue) with its "1" written on an
          amber chip, or the amber figures a break rewrites */}
      {s.carry && (
        <g>
          {wcWeight(F.kgR - 62, 96, 54, 46, WC_KG, shade(WC_KG, 0.3))}
          <rect x={F.kgR - 52} y={107} width={34} height={34} rx={9} fill={tint(WC_MOVE, 0.72)} stroke={shade(WC_MOVE, 0.35)} strokeWidth={2.5} />
          <text x={F.kgR - 35} y={136} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={WC_INK.move}>1</text>
        </g>
      )}
      {s.broken && <text x={F.kgR - 14} y={136} textAnchor="end" fontSize={T.prompt} fontWeight={700} fill={WC_INK.move}>{s.broken.kg}</text>}
      {s.broken && <text x={F.gL + gw / 2} y={136} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={WC_INK.move}>{s.broken.g}</text>}
      {s.rows.map((r: any, i: number) => (
        <g key={"row" + i}>
          {boxes("b" + i + "-", wcRowTop(i), r.lit)}
          {kgNum("k" + i, wcRowTop(i), r.kg, r.kgTone || "kg")}
          {grams("g" + i + "-", wcRowTop(i), r.cells || [], r.gTone || "g")}
          {r.struck && <line x1={F.kgL} y1={wcRowTop(i) + 34} x2={F.kgR - 6} y2={wcRowTop(i) + 34} stroke={CONTENT.line} strokeWidth={4} />}
          {r.struck && <line x1={F.gL + 4} y1={wcRowTop(i) + 34} x2={F.gL + gw - 4} y2={wcRowTop(i) + 34} stroke={CONTENT.line} strokeWidth={4} />}
        </g>
      ))}
      {s.sign && <text x={26} y={wcRowTop(n - 1) + 52} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={C.ink}>{s.sign}</text>}
      {s.answer && (
        <g>
          <line x1={10} y1={ruleY} x2={F.w - 10} y2={ruleY} stroke={CONTENT.line} strokeWidth={4} />
          {boxes("a-", ansTop)}
          {kgNum("ak", ansTop, s.answer.kg, s.answer.kgTone)}
          {grams("ag-", ansTop, s.answer.cells, s.answer.gTone)}
        </g>
      )}
      {s.readout && (
        <g data-role="reading">
          <text x={F.w / 2} y={bottom + 40} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={ink(s.readout.tone)}>{s.readout.text}</text>
        </g>
      )}
      {(s.rings || []).map((q: any, i: number) => (
        <rect key={"ring" + i} x={q.x} y={q.y} width={q.w} height={q.h} rx={14} fill="none" stroke={C.accent} strokeWidth={5} pointerEvents="none" />
      ))}
    </g>
  );
}

/* the balance: it judges the whole weight of each bag and tips toward the heavier. content(side) draws what
   sits on a pan, in the pan's own units (the string's top at 0,0; the dish at B.S) */
function wcBalance(B: any, theta: number, content: (side: number) => any, rings: boolean[], C: any, ms = 900) {
  const dy = B.L * Math.sin((theta * Math.PI) / 180);
  const ease = reducedMotion() ? "none" : `transform ${ms}ms ease-in-out`;
  return (
    <g>
      <rect x={B.px - 6} y={B.py} width={12} height={B.base - B.py} rx={4} fill={CONTENT.line} />
      <rect x={B.px - 80} y={B.base} width={160} height={12} rx={6} fill={CONTENT.line} />
      {[0, 1].map((side) => (
        <g key={side} transform={`translate(${B.px + (side ? B.L : -B.L)},${B.py})`}>
          <g style={{ transform: `translate(0px,${side ? dy : -dy}px)`, transition: ease } as any}>
            <line x1={0} y1={0} x2={-B.PW / 2 + 8} y2={B.S} stroke={CONTENT.line} strokeWidth={2.5} />
            <line x1={0} y1={0} x2={B.PW / 2 - 8} y2={B.S} stroke={CONTENT.line} strokeWidth={2.5} />
            {content(side)}
            <path d={`M ${-B.PW / 2} ${B.S} Q 0 ${B.S + 32} ${B.PW / 2} ${B.S} Z`} fill={tint(C.rule, 0.35)} stroke={CONTENT.line} strokeWidth={2.5} />
            {rings[side] && <rect x={-B.PW / 2 - 3} y={B.S - B.bh - 8} width={B.PW + 6} height={B.bh + 34} rx={16} fill="none" stroke={C.accent} strokeWidth={5} pointerEvents="none" />}
          </g>
        </g>
      ))}
      <g transform={`translate(${B.px},${B.py})`}>
        <g style={{ transform: `rotate(${theta}deg)`, transformBox: "fill-box", transformOrigin: "center", transition: ease } as any}>
          <rect x={-B.L - 10} y={-6} width={2 * B.L + 20} height={12} rx={6} fill={CONTENT.line} />
        </g>
        <circle cx={0} cy={0} r={11} fill={C.panel} stroke={CONTENT.line} strokeWidth={3} />
      </g>
    </g>
  );
}

/* one question's working area (mounted fresh for every question, so nothing leaks from the one before) */
function WcBoard(props: any) {
  const { item, stage, wrong, typed, captured, api } = props;
  const tx = props.tx || ((v: any) => v);
  const C = api.C;
  const tl = useTimeline();
  const free = stage === "free";
  const kind: string = free ? "free" : item.kind || "";
  const done = stage === "win" || stage === "idle";
  const asking = stage === "ask";
  const busy = tl.busy;
  const canAct = (asking || stage === "teach") && !busy;

  const [placed, setPlaced] = useState<string[]>([]);      /* phase 1: bags in the frame, in the order they went in */
  const [carried, setCarried] = useState(false);           /* the kilogram weight rides over the kilograms */
  const [broken, setBroken] = useState(false);             /* one kilogram opened into a thousand grams */
  const [card, setCardState] = useState<any>({ pick: "", kg: "", g: "" }); /* phase 4: the child's own card */
  const cardRef = useRef<any>(card);
  const [cell, setCellState] = useState<string | null>(null); /* the card's blank that holds the pad */
  const cellRef = useRef<string | null>(null);
  const lastSent = useRef<string | null>(null);            /* the card as it was last judged (the same card is never sent twice) */
  const stale = useRef<any>({ kg: false, g: false });      /* after a miss a digit starts its blank afresh (as the slot's boxes) */
  const refused = useRef(false);                           /* the card's one spoken refusal has been said */
  const [nudge, setNudge] = useState(false);               /* the card refused the difference alone */
  const [tb, setTb] = useState(0);                         /* the traceback's step (a demo layer: never the child's state) */
  const [win, setWin] = useState(0);                       /* phase 4's win: the difference weight drops and the beam settles */
  const [pans, setPans] = useState<any[]>([null, null]);   /* Free play: the bag on each pan */
  const [op, setOp] = useState("+");
  const [diffOn, setDiffOn] = useState(false);

  const shown = (k: number) => done || tb >= k;
  const fixing = tb > 0 && !done;
  const K = kind === "add" ? { g: 2, kg: 3, read: 4, all: 4 } : kind === "write" ? { g: 9, kg: 9, read: 9, all: 3 } : { g: 3, kg: 4, read: 5, all: 5 };
  const FX = kind === "compare" ? 16 : kind === "free" ? 250 : 300;
  const frameBox = { x: FX - 24, y: 0, w: WC_FR.w + 48, h: 528 };
  const BAL = free ? { px: 870, py: 40, L: 130, S: 140, PW: 140, bw: 110, bh: 104, base: 246 }
    : { px: 818, py: 30, L: 152, S: 140, PW: 220, bw: 120, bh: 110, base: 232 };
  const balBox = { x: BAL.px - BAL.L - 90, y: 0, w: 2 * BAL.L + 180, h: 290 };
  const CY = 316; /* phase 4's answer card, under the balance */

  /* ── the answer card (phase 4): the heavier one, and the difference in kilograms and grams ── */
  const setCard = (c: any) => { cardRef.current = c; setCardState(c); };
  const setCell = (c: string | null) => { cellRef.current = c; setCellState(c); };
  const closeCell = () => { setCell(null); api.capture(null); };
  const finish = () => {
    const c = cardRef.current, diff = c.kg !== "" || c.g !== "";
    if (!c.pick && !diff) return;
    if (!diff) { openCell("kg"); return; }                  /* Enter moves on to the empty blank */
    if (c.g === "") { openCell("g"); return; }
    if (!c.pick) {                                         /* the difference alone never closes the card */
      setNudge(true);
      if (!refused.current) { refused.current = true; api.say("Tap the heavier bag too."); }
      return;
    }
    const v = [c.pick, Number(c.kg || 0), Number(c.g)].join("|");
    if (v === lastSent.current) return;                    /* the card as it was judged: nothing is sent again */
    lastSent.current = v;
    api.submit(v);
  };
  const padKey = (k: string) => {
    const at = cellRef.current;
    if (!at) return;
    const c = cardRef.current, cur = stale.current[at] && /^\d$/.test(k) ? "" : String(c[at] || "");
    if (/^\d$/.test(k)) {
      /* a difference is under a thousand grams: kilograms take two places, grams three */
      if (cur.length >= (at === "kg" ? 2 : 3)) return;
      stale.current = { ...stale.current, [at]: false };
      setCard({ ...c, [at]: cur + k });
      return;
    }
    if (k === "back") { stale.current = { ...stale.current, [at]: false }; setCard({ ...c, [at]: cur.slice(0, -1) }); return; }
    if (k === "clear") { stale.current = { ...stale.current, [at]: false }; setCard({ ...c, [at]: "" }); return; }
    if (k === "enter") {
      if (at === "kg") { setCell("g"); return; }
      if (cur === "") return;
      closeCell();
      finish();
    }
  };
  function openCell(which: string) {
    if (stage !== "ask" || busy) return;
    setNudge(false);
    setCell(which);
    api.capture(padKey);
  }
  /* the heavier one: playable in the teach too; a blank being typed keeps the pad */
  const choose = (id: string) => {
    if (!(asking || stage === "teach") || busy || cardRef.current.pick === id) return;
    setNudge(false);
    setCard({ ...cardRef.current, pick: id });
    api.sfx.tick();
  };
  /* the teacher agent fills the card as a child would: "onions|1|890", ["onions", 1, 890] */
  const fromAgent = (v: any) => {
    const a = Array.isArray(v) ? v.map((x: any) => String(x ?? "")) : String(v ?? "").split("|");
    const hit = (item.bags || []).find((b: any) => b.id === a[0] || String(b.label).toLowerCase() === String(a[0] || "").toLowerCase());
    closeCell(); setNudge(false);
    stale.current = { kg: false, g: false };
    setCard({ pick: hit ? hit.id : "", kg: String(a[1] || "").replace(/\D/g, "").slice(0, 2), g: String(a[2] || "").replace(/\D/g, "").slice(0, 3) });
    return true;
  };
  HOOK.set = kind === "compare" ? fromAgent : null;
  /* Enter while the card is on the working area: move on to an empty blank, or close the card */
  api.onEnter(kind === "compare" && asking ? () => finish() : null);

  const doBreak = () => { if ((!canAct && !free) || broken) return; setBroken(true); api.sfx.tick(); };

  /* the traceback: lock, redraw the maths step by step on a demo layer, end on the whole right answer, unlock */
  useEffect(() => {
    if (!wrong || stage !== "ask") return;
    api.lock(true);
    setCell(null); api.capture(null); setNudge(false);
    stale.current = { kg: true, g: true };
    const steps: any[] = [[350, () => setTb(0)]];
    for (let s = 1; s <= K.all; s++) steps.push([s < K.all ? 1100 : 400, () => setTb(s)]);
    tl.run(steps, () => api.lock(false));
  }, [wrong]);

  /* phase 4's win (the brief's delight): a weight of exactly the difference drops onto the lighter pan, the
     beam lifts past level, wobbles back, and settles dead level */
  useEffect(() => {
    if (kind !== "compare" || stage !== "win") return;
    tl.run([[80, () => setWin(1)], [420, () => setWin(2)], [480, () => setWin(3)], [420, () => setWin(4)], [0, () => setWin(5)]]);
  }, [stage]);

  /* ── pieces the child drags (a tap, Enter or Space puts a piece where it belongs) ── */
  const placeBag = (id: string) => { if (!canAct) return; setPlaced((p) => (p.includes(id) ? p : [...p, id])); api.sfx.tick(); };
  const freeReset = () => { setCarried(false); setBroken(false); setDiffOn(false); };
  const freeBag = (id: string, at: any, moved: boolean) => {
    const on = pans.indexOf(id), next = pans.slice();
    if (on >= 0) next[on] = null;
    const toNext = () => { const e = next.indexOf(null); next[e >= 0 ? e : 1] = id; };
    if (!moved) { if (on < 0) toNext(); }
    else if (wcInside(at, balBox)) next[at.x < BAL.px ? 0 : 1] = id;
    else if (on < 0 && wcInside(at, frameBox)) toNext(); /* a bag dropped on the frame goes to the next free pan */
    setPans(next); freeReset(); api.sfx.tick();
  };
  const drag = useDrag((pay: any, at: any, moved: boolean) => {
    if (!pay) return;
    if (pay.t === "bag") { if (!moved || wcInside(at, frameBox)) placeBag(pay.id); return; }
    if (pay.t === "carry") { if ((canAct || free) && (!moved || wcInside(at, frameBox))) { setCarried(true); api.sfx.tick(); } return; }
    if (pay.t === "fbag") { freeBag(pay.id, at, moved); return; }
    if (pay.t === "fdiff") { setDiffOn((d: boolean) => (moved ? wcInside(at, balBox) : !d)); api.sfx.tick(); }
  });
  /* a piece follows the finger: shift = where its centre is drawn from (a piece on a pan sits in the pan's units) */
  const piece = (id: string, label: string, pay: any, box: any, art: any, shift?: any) => {
    const d = drag.drag && drag.drag.moved && drag.drag.payload && drag.drag.payload.id === pay.id ? drag.drag : null;
    const cx = box.x + box.w / 2 + (shift ? shift.x : 0), cy = box.y + box.h / 2 + (shift ? shift.y : 0);
    return (
      <g key={id} className="c4-piece" {...control(id, label)} {...drag.bind(pay)} {...drag.keys(pay)}
        transform={d ? `translate(${d.x - cx},${d.y - cy})` : undefined}>
        {art}
        <rect x={box.x} y={box.y} width={box.w} height={box.h} fill="transparent" />
      </g>
    );
  };
  const invite = (r: any) => (r ? <rect className="c4-pulse" x={r.x - 6} y={r.y - 6} width={r.w + 12} height={r.h + 12} rx={20}
    fill="none" stroke={C.accent} strokeWidth={5} pointerEvents="none" /> : null);
  const breakKey = (b: any) => (
    <Key id="break" label="break one kilogram into a thousand grams" x={b.x} y={b.y} w={b.w} h={b.h} C={C} disabled={!canAct && !free} onClick={doBreak}>
      <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{tx("break 1 kg")}</text>
    </Key>
  );
  const kgSource = (b: any) => (
    <g>
      {wcWeight(b.x + 2, b.y + 2, b.w - 4, b.h - 4, WC_KG, shade(WC_KG, 0.3))}
      <text x={b.x + b.w / 2} y={b.y + b.h - 14} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill="#FFFFFF">{"1 " + tx("kg")}</text>
    </g>
  );

  /* the answer row: the child's own answer as it is typed (kilograms, then grams against the ones box),
     until a correction or the win draws the right one */
  const mirror = kind === "compare" ? [card.kg, card.g] : slotPartsOf(typed, 2);
  const answerRow = (right: any, sum: boolean) => ({
    kg: shown(K.kg) ? String(right.kg) : fixing ? "" : String(mirror[0] || "").slice(-3),
    cells: shown(K.g) ? wcCells(wcThree(right.g), "right") : fixing ? [] : wcCells(mirror[1], "right"),
    kgTone: sum ? "kg" : "left", gTone: sum ? "g" : "left",
  });
  const readout = (right: any, sum: boolean) => (shown(K.read) ? { text: wcMeasure(right.kg, right.g, tx), tone: sum ? "ink" : "left" } : null);
  const columnsDone = (a: any) => (a.cells.length ? 1 : 0) + (a.kg !== "" ? 1 : 0);

  let spec: any = null, extras: any = null, demo: any = null, inv: any = null, count: any = null, shelf: any = null, share: any = {};

  /* ── phase 1: bags into the frame, and the three grams boxes ── */
  const bagIds: string[] = kind === "add" || kind === "write" ? item.rows.map((_: any, k: number) => "b" + k) : [];
  const inFrame: string[] = shown(1) ? [...placed, ...bagIds.filter((b) => !placed.includes(b))] : placed;
  const bagBox = (k: number) => ({ x: 18, y: 24 + k * 176, w: 200, h: 150 });
  if (kind === "add" || kind === "write") {
    shelf = (
      <g>
        <rect x={4} y={8} width={228} height={512} rx={RAD.panel} fill={tint(C.panel, 0.5)} stroke={C.rule} strokeWidth={2} />
        {bagIds.map((id, k) => {
          const [kg, g] = item.rows[k], bx = bagBox(k);
          if (inFrame.includes(id)) return <rect key={id} x={bx.x} y={bx.y} width={bx.w} height={bx.h} rx={24} fill="none" stroke={C.rule} strokeWidth={2} strokeDasharray="8 10" />;
          const art = wcBagArt(bx.x, bx.y, bx.w, bx.h, kg, g, C, tx, T.label);
          return canAct ? piece("bag-" + id, `bag of ${kg ? kg + " kilograms " : ""}${g} grams`, { t: "bag", id }, bx, art) : <g key={id}>{art}</g>;
        })}
      </g>
    );
    const next = bagIds.find((b) => !inFrame.includes(b));
    inv = canAct && !fixing && next ? bagBox(bagIds.indexOf(next)) : null;
    count = ["bags in", inFrame.length, bagIds.length];
    /* getState reads the child's own acts only, never what a correction drew */
    share = { operation: kind === "add" ? "add" : "write", rows: item.rows, bagsIn: placed.length };
  }
  if (kind === "add") {
    const right = wcAddCols(item.rows);
    const rows = [0, 1].map((r) => {
      const id = inFrame[r];
      if (!id) return { kg: "", cells: [] };
      const [kg, g] = item.rows[Number(id.slice(1))];
      return { kg: kg === null ? "" : String(kg), cells: wcCells(wcThree(g), "left") };
    });
    /* the correction rings the grey zero a short number of grams leaves in front */
    const rings: any[] = [];
    if (fixing) inFrame.forEach((id, r) => { const g = item.rows[Number(id.slice(1))][1]; if (g < 100) rings.push({ x: wcBoxX(0) - 6, y: wcRowTop(r) - 4, w: (g < 10 ? 2 : 1) * 64 + 8, h: 72 }); });
    spec = { rows, sign: "+", answer: answerRow(right, true), readout: readout(right, true), rings };
  }
  if (kind === "write") {
    const [kg0, g0] = item.rows[0];
    const kgIn = inFrame.length && kg0 !== null ? String(kg0) : "";
    /* the child's own row: the digits go into the boxes as they are typed, one to a box */
    const rows: any[] = [{ kg: kgIn, cells: wcCells(typed, "left"), lit: (asking || stage === "teach") && !fixing && !done }];
    /* the correction: a new row under the child's, the digits in their own places, then grey zeros */
    if (fixing && tb >= 2) rows.push({ kg: kg0 !== null ? String(kg0) : "", cells: tb >= 3 ? wcCells(wcThree(g0), "left") : wcCells(String(g0), "right") });
    spec = { rows, sign: null, answer: null, readout: null };
    demo = fixing ? wcCounted(760, 150, g0, tx) : null;
  }

  /* ── phase 2: a thousand grams carried as one kilogram ── */
  if (kind === "carry") {
    const right = wcAddCols(item.rows), isCarried = carried || shown(2);
    spec = {
      rows: item.rows.map((r: any) => ({ kg: String(r[0]), cells: wcCells(wcThree(r[1]), "left") })), sign: "+", carry: isCarried,
      answer: answerRow(right, true), readout: readout(right, true),
      rings: fixing && (tb === 2 || tb === 4) ? [{ x: WC_FR.kgR - 70, y: 92, w: 70, h: 58 }] : [],
    };
    const src = { x: 740, y: 84, w: 104, h: 88 }; /* wide enough for "1 किग्रा" / "1 કિગ્રા" */
    if (!isCarried && !done && !fixing) extras = canAct ? piece("carry", "carry one kilogram", { t: "carry", id: "carry" }, src, kgSource(src)) : kgSource(src);
    /* the correction bundles: the grams added (more than a thousand), a thousand of them drawn as ten green
       bars beside what is left, then the bars fold into one blue kilogram weight that goes over the kilograms */
    if (fixing) demo = (
      <g>
        <text x={740} y={120} fontSize={T.prompt} fontWeight={700} fill={WC_INK.g}>{`${indian(right.gs)} ${tx("g")}`}</text>
        {tb < 2 ? wcThousand(740, 160, tx) : (
          <g>
            {kgSource({ x: 787, y: 166, w: 104, h: 88 })}
            <text x={839} y={300} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={WC_INK.g}>{indian(1000) + " " + tx("g")}</text>
          </g>
        )}
        <text x={946} y={236} fontSize={T.label} fontWeight={700} fill={WC_INK.g}>{`+ ${right.g} ${tx("g")}`}</text>
      </g>
    );
    inv = canAct && !fixing && !isCarried ? src : null;
    count = ["columns", columnsDone(spec.answer), 2];
    share = { operation: "add", rows: item.rows, carries: carried ? 1 : 0 };
  }

  /* ── phase 3: one kilogram broken into a thousand grams ── */
  if (kind === "take") {
    const [top, bot] = item.rows, right = wcTakeCols(top, bot), isBroken = right.need && (broken || shown(2));
    spec = {
      rows: [{ kg: String(top[0]), cells: wcCells(wcThree(top[1]), "left"), struck: isBroken }, { kg: String(bot[0]), cells: wcCells(wcThree(bot[1]), "left") }],
      sign: "−", broken: isBroken ? { kg: String(right.tk), g: indian(right.tg) } : null,
      answer: answerRow(right, false), readout: readout(right, false),
      rings: fixing && tb === 1 ? [{ x: wcBoxX(0) - 6, y: wcRowTop(0) - 4, w: 3 * 64 + 8, h: 72 }] : [],
    };
    const bk = { x: 740, y: 148, w: 220, h: 72 };
    extras = (
      <g>
        {right.need && !isBroken && !done && breakKey(bk)}
        {isBroken && wcThousand(740, 250, tx)}
      </g>
    );
    inv = canAct && !fixing && right.need && !isBroken ? bk : null;
    count = ["columns", columnsDone(spec.answer), 2];
    share = { operation: "take", rows: item.rows, breaks: broken ? 1 : 0 };
  }

  /* ── phase 4: the balance, the frame and the two-blank card ── */
  if (kind === "compare") {
    const [ba, bb] = item.bags, heavy = wcHeavier(ba, bb) > 0 ? ba : bb, light = heavy === ba ? bb : ba;
    const right = wcTakeCols([heavy.kg, heavy.g], [light.kg, light.g]), isBroken = right.need && (broken || shown(2));
    const want = String(item.answer).split("|");
    spec = {
      rows: [{ kg: String(heavy.kg), cells: wcCells(wcThree(heavy.g), "left"), struck: isBroken }, { kg: String(light.kg), cells: wcCells(wcThree(light.g), "left") }],
      sign: "−", broken: isBroken ? { kg: String(right.tk), g: indian(right.tg) } : null,
      answer: answerRow(right, false), rings: [],
      /* the whole right answer in one place: the heavier one and the difference */
      readout: shown(K.read) ? { text: `${tx(heavy.label)}, ${wcMeasure(right.kg, right.g, tx)}`, tone: "left" } : null,
    };
    const bk = { x: 16, y: 436, w: 220, h: 72 };
    const heavySide = heavy === bb ? 1 : 0, tipped = heavySide ? 7 : -7;
    /* the win: the weight drops (1), the beam lifts past level (2), wobbles back (3), settles level (4) */
    const w = stage === "idle" ? 4 : win;
    const theta = !done ? tipped : w <= 1 ? tipped : w === 2 ? -0.4 * tipped : w === 3 ? 0.18 * tipped : 0;
    const pan = (side: number) => {
      const b = item.bags[side], withDiff = done && b === light;
      return (
        <g>
          {wcBagArt(-BAL.bw / 2 - (withDiff ? 50 : 0), BAL.S - BAL.bh + 4, BAL.bw, BAL.bh, b.kg, b.g, C, tx, T.micro)}
          {withDiff && (
            /* a weight of exactly the difference, labelled like Free play's tile, dropped in beside the bag */
            <g style={{ transform: `translate(0px,${w >= 1 ? 0 : -60}px)`, transition: reducedMotion() ? "none" : "transform 380ms cubic-bezier(.55,0,.85,.35)" } as any}>
              <rect x={14} y={BAL.S - 62} width={94} height={62} rx={12} fill={tint(WC_LEFT, 0.72)} stroke={shade(WC_LEFT, 0.35)} strokeWidth={3} />
              {right.kg > 0 && <text x={61} y={BAL.S - 35} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={WC_INK.left}>{`${right.kg} ${tx("kg")}`}</text>}
              <text x={61} y={right.kg > 0 ? BAL.S - 7 : BAL.S - 21} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={WC_INK.left}>{`${right.g} ${tx("g")}`}</text>
            </g>
          )}
          <text x={0} y={BAL.S + 54} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx(b.label)}</text>
        </g>
      );
    };
    const lit = (fixing && tb >= 1) || (nudge && !card.pick && asking);
    const liveKeys = (asking || stage === "teach") && !busy;
    /* the unit after each blank is drawn small, so the longer Hindi and Gujarati symbols (किग्रा, કિગ્રા) fit */
    const cells: any[] = [["kg", 714, 100], ["g", 890, 130]];
    extras = (
      <g>
        {right.need && !isBroken && !done && breakKey(bk)}
        {wcBalance(BAL, theta, pan, [lit && heavySide === 0, lit && heavySide === 1], C, done ? 440 : 900)}
        <rect x={560} y={CY} width={516} height={192} rx={RAD.panel} fill="#FFFFFF" stroke={done ? shade(C.rule, 0.35) : C.rule} strokeWidth={done ? 4 : 2} filter="url(#fShadowSoft)" />
        <text x={578} y={CY + 56} fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("heavier")}</text>
        <text x={578} y={CY + 148} fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("how much")}</text>
        {done ? (
          <g>
            <text x={706} y={CY + 58} fontSize={T.label} fontWeight={700} fill={C.ink}>{tx(heavy.label)}</text>
            <text x={726} y={CY + 150} fontSize={T.label} fontWeight={700} fill={WC_INK.left}>{wcMeasure(want[1], want[2], tx)}</text>
          </g>
        ) : (
          <g>
            {item.bags.map((b: any, k: number) => {
              const on = card.pick === b.id, name = tx(b.label);
              return (
                <Key key={b.id} id={"pick-" + b.id} label={"heavier: " + b.label} x={698 + k * 192} y={CY + 12} w={180} h={72} C={C}
                  primary={on} disabled={!liveKeys} onClick={() => choose(b.id)}>
                  <text y={10} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={on && liveKeys ? "#FFFFFF" : C.ink}>{name}</text>
                  {/* a pick held still (a correction running) keeps dark ink and an accent line under it */}
                  {on && !liveKeys && <rect x={-Math.min(75, name.length * 8.5)} y={20} width={2 * Math.min(75, name.length * 8.5)} height={5} rx={2.5} fill={C.accent} />}
                </Key>
              );
            })}
            {cells.map(([which, x, cw]: any) => {
              const v = String(card[which] || ""), open = captured && cell === which;
              return (
                <g key={which}>
                  <rect x={x} y={CY + 104} width={cw} height={72} rx={12} fill="#FFFFFF" stroke={open ? C.accent : which === "kg" ? WC_KG : WC_G} strokeWidth={open ? 4 : 2} />
                  {v !== "" && <text x={x + cw / 2} y={CY + 156} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={WC_INK.left}>{v}</text>}
                  {open && <rect className="c4-caret" x={x + cw / 2 + v.length * 12 + 4} y={CY + 118} width={4} height={44} rx={2} fill={C.accent} />}
                  <text x={x + cw + 6} y={CY + 150} fontSize={T.micro} fontWeight={700} fill={which === "kg" ? WC_INK.kg : WC_INK.g}>{tx(which)}</text>
                  {asking && !busy && <Hit id={"card-" + which} x={x} y={CY + 104} w={cw} h={72} label={which === "kg" ? "kilograms blank" : "grams blank"} enabled={!open} onPress={() => openCell(which)} />}
                </g>
              );
            })}
          </g>
        )}
      </g>
    );
    /* the correction: the lower pan lit, the kilograms compared first (the grams only when they are equal),
       the take-away run in the frame, and the heavier one ringed on the card */
    if (fixing && tb >= 1) demo = (
      <g>
        <text x={BAL.px} y={284} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={heavy.kg !== light.kg ? WC_INK.kg : WC_INK.g}>
          {heavy.kg !== light.kg ? `${tx("kg")}: ${heavy.kg} > ${light.kg}` : `${tx("g")}: ${wcThree(heavy.g)} > ${wcThree(light.g)}`}</text>
        {tb >= K.read && <rect x={692 + heavySide * 192} y={CY + 6} width={192} height={90} rx={20} fill="none" stroke={C.accent} strokeWidth={5} />}
      </g>
    );
    /* one invite at a time: the heavier one, then the break (if the grams are too few), then both blanks of
       "how much" (a difference may have no whole kilograms) */
    const pickRow = { x: 698, y: CY + 12, w: 372, h: 72 };
    inv = !done && !fixing && canAct ? (!card.pick ? pickRow : right.need && !isBroken ? bk
      : card.kg === "" && card.g === "" && !(captured && cell) ? { x: 714, y: CY + 104, w: 306, h: 72 } : null) : null;
    count = ["steps", (card.pick || done ? 1 : 0) + columnsDone(spec.answer), 3];
    share = {
      operation: "compare", rows: item.bags.map((b: any) => [b.kg, b.g]), breaks: broken ? 1 : 0,
      heavier: card.pick || null, difference: card.kg !== "" || card.g !== "" ? `${card.kg || 0}|${card.g}` : null,
      answerCard: { heavier: card.pick || null, kg: card.kg, g: card.g, open: captured ? cell : null },
    };
  }

  /* ── Free play: any two bags on the balance, worked in the frame with the carry or the break ── */
  if (free) {
    const fb = (id: any) => WC_FREE_BAGS.find((b) => b.id === id) || null;
    const Lb = fb(pans[0]), Rb = fb(pans[1]), both = !!(Lb && Rb), add = op === "+";
    const order: any[] = both ? (add ? [Lb, Rb] : wcHeavier(Lb, Rb) >= 0 ? [Lb, Rb] : [Rb, Lb]) : [Lb || Rb].filter(Boolean);
    const rowsArr = order.map((b: any) => [b.kg, b.g]);
    const sum = both && add ? wcAddCols(rowsArr) : null, take = both && !add ? wcTakeCols(rowsArr[0], rowsArr[1]) : null;
    const needCarry = !!sum && sum.carry > 0, needBreak = !!take && take.need;
    const ready = both && (add ? !needCarry || carried : !needBreak || broken);
    const right: any = sum || take;
    spec = {
      rows: order.length ? order.map((b: any, i: number) => ({ kg: String(b.kg), cells: wcCells(wcThree(b.g), "left"), struck: !add && i === 0 && needBreak && broken }))
        : [{ kg: "", cells: [] }, { kg: "", cells: [] }],
      sign: both ? (add ? "+" : "−") : null, carry: needCarry && carried,
      broken: needBreak && broken ? { kg: String(take!.tk), g: indian(take!.tg) } : null,
      answer: both ? { kg: ready ? String(right.kg) : "", cells: ready ? wcCells(wcThree(right.g), "right") : [], kgTone: add ? "kg" : "left", gTone: add ? "g" : "left" } : null,
      readout: ready ? { text: wcMeasure(right.kg, right.g, tx), tone: add ? "ink" : "left" } : null,
    };
    const level = diffOn && ready && !add;
    const theta = !Lb && !Rb ? 0 : !Rb ? -9 : !Lb ? 9 : level ? 0 : wcHeavier(Rb, Lb) > 0 ? 7 : -7;
    const pan = (side: number) => {
      const b = side ? Rb : Lb;
      if (!b) return null;
      const withDiff = level && b === order[1], x0 = -BAL.bw / 2 - (withDiff ? 25 : 0), y0 = BAL.S - BAL.bh + 4;
      const dy = BAL.L * Math.sin((theta * Math.PI) / 180) * (side ? 1 : -1);
      const box = { x: x0, y: y0, w: BAL.bw, h: BAL.bh };
      return (
        <g>
          {piece("fbag-" + b.id, "bag on the balance", { t: "fbag", id: b.id }, box, wcBagArt(x0, y0, BAL.bw, BAL.bh, b.kg, b.g, C, tx, T.micro),
            { x: BAL.px + (side ? BAL.L : -BAL.L), y: BAL.py + dy })}
          {withDiff && wcWeight(BAL.bw / 2 - 29, BAL.S - 36, 40, 38, tint(WC_LEFT, 0.25), shade(WC_LEFT, 0.35))}
        </g>
      );
    };
    const cs = { x: 690, y: 300, w: 104, h: 88 }, bk = { x: 690, y: 300, w: 220, h: 72 }, ds = { x: 930, y: 300, w: 146, h: 84 };
    extras = (
      <g>
        {wcBalance(BAL, theta, pan, [false, false], C)}
        <Key id="op-add" label="add the two bags" x={250} y={440} w={96} h={72} C={C} primary={add} onClick={() => { setOp("+"); freeReset(); }}>
          <text y={18} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={add ? "#FFFFFF" : C.ink}>+</text>
        </Key>
        <Key id="op-take" label="take the lighter bag from the heavier" x={358} y={440} w={96} h={72} C={C} primary={!add} onClick={() => { setOp("−"); freeReset(); }}>
          <text y={18} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={!add ? "#FFFFFF" : C.ink}>−</text>
        </Key>
        {needCarry && !carried && piece("carry", "carry one kilogram", { t: "carry", id: "carry" }, cs, kgSource(cs))}
        {needBreak && !broken && breakKey(bk)}
        {!add && ready && piece("fdiff", "a weight of the difference", { t: "fdiff", id: "fdiff" }, ds, (
          <g>
            <rect x={ds.x} y={ds.y} width={ds.w} height={ds.h} rx={16} fill={level ? "#FFFFFF" : tint(WC_LEFT, 0.7)} stroke={shade(WC_LEFT, 0.35)} strokeWidth={3} strokeDasharray={level ? "8 8" : undefined} />
            {right.kg > 0 && <text x={ds.x + ds.w / 2} y={ds.y + 36} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={WC_INK.left}>{`${right.kg} ${tx("kg")}`}</text>}
            <text x={ds.x + ds.w / 2} y={right.kg > 0 ? ds.y + 70 : ds.y + 52} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={WC_INK.left}>{`${right.g} ${tx("g")}`}</text>
          </g>
        ))}
      </g>
    );
    shelf = (
      <g>
        <rect x={4} y={4} width={228} height={520} rx={RAD.panel} fill={tint(C.panel, 0.5)} stroke={C.rule} strokeWidth={2} />
        {WC_FREE_BAGS.map((b, k) => {
          const bx = { x: 18, y: 12 + k * 102, w: 200, h: 96 };
          if (pans.includes(b.id)) return <rect key={b.id} x={bx.x} y={bx.y} width={bx.w} height={bx.h} rx={24} fill="none" stroke={C.rule} strokeWidth={2} strokeDasharray="8 10" />;
          return piece("fbag-" + b.id, `bag of ${b.kg} kilograms ${b.g} grams`, { t: "fbag", id: b.id }, bx, wcBagArt(bx.x, bx.y, bx.w, bx.h, b.kg, b.g, C, tx, T.micro));
        })}
      </g>
    );
    inv = !Lb && !Rb ? { x: 18, y: 12, w: 200, h: 96 } : null;
    share = { mode: "free", pans, operation: add ? "add" : "take", carries: carried ? 1 : 0, breaks: broken ? 1 : 0 };
  }

  /* what the host and the agent read back (toolApi.getState); never the answer before it is given */
  api.share(share);

  return (
    <g>
      {count && (
        <g data-zone="runs">
          <rect x={0} y={-94} width={330} height={76} rx={RAD.panel} fill="url(#gPanel)" stroke={C.rule} strokeWidth={2} />
          <text x={24} y={-46} fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx(count[0])}</text>
          <text x={306} y={-40} textAnchor="end" fontSize={T.prompt} fontWeight={700} fill={C.ink}>{`${count[1]} / ${count[2]}`}</text>
        </g>
      )}
      {spec && wcFrame(FX, 0, spec, C, tx)}
      {extras}
      {shelf}
      <g pointerEvents="none">{demo}</g>
      {invite(inv)}
    </g>
  );
}

function Work(props: any) {
  /* every English word the picture draws goes through tx("...") (its key is added to TR) */
  return <WcBoard key={props.stage === "free" ? "free" : props.n + "-" + props.index} {...props} />;
}

/* the summary page's small drawing of the child's last right answer in a phase:
   result.last = { value, answer, kind, item, shared } (shared = what api.share held at that moment) */
function Thumb({ n, result, C, w, h, tx = (v: any) => v }: any) {
  const last = result && result.last;
  if (!last || last.value === null || last.value === undefined) return null;
  const it: any = (((PHASES as any)[(n || 1) - 1] || {}).items || [])[last.item] || {};
  const box = <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />;
  if (it.kind === "write") {
    const cells = wcCells(String(last.value), "left");
    return (
      <g>
        {box}
        {[0, 1, 2].map((k) => <rect key={k} x={40 + k * 52} y={(h - 56) / 2} width={46} height={56} rx={8} fill="#FFFFFF" stroke={tint(WC_G, 0.3)} strokeWidth={2} />)}
        {cells.map((c: any, i: number) => <text key={"t" + i} x={63 + c.slot * 52} y={h / 2 + 12} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={c.grey ? WC_ZERO : WC_INK.g}>{c.ch}</text>)}
        <text x={204} y={h / 2 + 12} fontSize={T.label} fontWeight={700} fill={WC_INK.g}>{tx("g")}</text>
      </g>
    );
  }
  if (it.kind === "compare") {
    /* a small balance tipped toward the heavier bag, and the difference on its purple tile */
    const a = String(last.value).split("|"), bags = it.bags || [];
    const hs = bags.length === 2 && wcHeavier(bags[0], bags[1]) > 0 ? 0 : 1, px = 56, py = 18, L = 38, dy = hs ? 7 : -7;
    const kg = Number(a[1] || 0), g = Number(a[2] || 0);
    return (
      <g>
        {box}
        <rect x={px - 3} y={py} width={6} height={50} fill={CONTENT.line} />
        <rect x={px - 22} y={py + 48} width={44} height={6} rx={3} fill={CONTENT.line} />
        <line x1={px - L} y1={py - dy} x2={px + L} y2={py + dy} stroke={CONTENT.line} strokeWidth={5} strokeLinecap="round" />
        {[0, 1].map((s) => {
          const x = px + (s ? L : -L), y = py + (s ? dy : -dy) + 28;
          return (
            <g key={s}>
              <line x1={x} y1={y - 28} x2={x} y2={y - 14} stroke={CONTENT.line} strokeWidth={2} />
              <rect x={x - 11} y={y - 16} width={22} height={16} rx={5} fill={tint(WC_SKY, 0.45)} stroke={shade(WC_SKY, 0.35)} strokeWidth={2} />
              <path d={`M ${x - 16} ${y} Q ${x} ${y + 8} ${x + 16} ${y} Z`} fill={tint(C.rule, 0.35)} stroke={CONTENT.line} strokeWidth={2} />
            </g>
          );
        })}
        <rect x={118} y={10} width={108} height={h - 20} rx={12} fill={tint(WC_LEFT, 0.72)} stroke={shade(WC_LEFT, 0.35)} strokeWidth={2.5} />
        {kg > 0 && <text x={172} y={h / 2 - 4} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={WC_INK.left}>{`${kg} ${tx("kg")}`}</text>}
        <text x={172} y={kg > 0 ? h / 2 + 26 : h / 2 + 11} textAnchor="middle" fontSize={kg > 0 ? T.micro : T.label} fontWeight={700} fill={WC_INK.left}>{`${g} ${tx("g")}`}</text>
      </g>
    );
  }
  const p = slotPartsOf(last.value, 2);
  return (
    <g>
      {box}
      <text x={w / 2} y={h / 2 + 12} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={it.kind === "take" ? WC_INK.left : C.ink}>{`${p[0]} ${tx("kg")} ${p[1]} ${tx("g")}`}</text>
    </g>
  );
}

function WeightColumns(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, format, fitHost: () => null }} />
  );
}

export default WeightColumns;
