/* ═══ M2.S4.T6.C20.2D1 · pictograph_builder · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists: header + its three controls, canvas, slot + pad, bubble + mascot,
   phase dots (user / AI mode), window.toolApi, sounds, the synced voice, scoring, the events,
   idle and restart. NO imports in this file; only the five host hooks. Follow docs/LAYOUT.md.
   Edit, never rewrite. Built by `node cli.mjs scaffold`; concepts are verbatim (check compares them). */

const TOOL_ID = "pictograph_builder";
const MEDIA_ID = "M2.S4.T6.C20.2D1";
const TOOL_NAME = "Pictograph Builder";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
const VOICE = {"rate":0.92,"pitch":1.06};

/* spoken before phase 1's teach lines only (the plan's opening voice line) */
const OPENING = ["A tally on one side and an empty pictograph on the other. Set the key first."];
/* the whole-tool line: spoken on the summary page */
const FINISH_LINE = "A pictograph drawn from its tally, given a title and a key, and read standing up.";
/* said when the child opens Free play from the summary page (the plan's free-play voice line) */
const FREE_LINE = "Free play. Any tally, any plain picture, and any key that fits.";

/* Hindi and Gujarati (docs/PATTERNS.md §11): every line above and below stays English, exactly as the checks
   read it; this table is keyed by that English, and the runtime looks each spoken or drawn line up in it.
   Fill it AFTER the English is final and reviewed (`node cli.mjs voice` lists every line still missing),
   then bake the voice. Empty = the tool runs in English only.
   Chapter terms (ch 14): pictograph चित्रालेख / ચિત્રાલેખ, key कुंजी / ચાવી, row पंक्ति / હાર, tally marks मिलान चिह्न /
   ટેલી ચિહ્ન, tally chart मिलान सारणी / ટેલી કોષ્ટક, data आँकड़े / માહિતી, class कक्षा / વર્ગ; this tool also uses
   symbol प्रतीक / પ્રતીક, column स्तंभ / સ્તંભ, title शीर्षक / શીર્ષક, stamp ठप्पा / છાપ. Each bubble piece (one sentence)
   is kept near 45 characters with its numbers in words. */
const TR: any = {
  hi: {
    "Pictograph Builder": "चित्रालेख बनाओ",
    "A tally on one side and an empty pictograph on the other. Set the key first.": "एक तरफ़ मिलान सारणी है। दूसरी तरफ़ खाली चित्रालेख है। पहले कुंजी तय करो।",
    "A pictograph drawn from its tally, given a title and a key, and read standing up.": "मिलान सारणी से चित्रालेख बना। उसे शीर्षक और कुंजी मिली। फिर उसे खड़ा करके पढ़ा।",
    "Free play. Any tally, any plain picture, and any key that fits.": "मुक्त खेल। कोई भी मिलान, कोई भी चित्र, सही बैठती कुंजी।",
    /* phase 1 */
    "From a tally to symbols": "मिलान से प्रतीक तक",
    "Each symbol stands for this many. How many symbols use up the tally?": "हर प्रतीक इतनों के लिए है। कितने प्रतीक सारे मिलान चिह्न ले लेंगे?",
    "How many of those make the count?": "ऐसे कितने मिलकर पूरी गिनती बनाते हैं?",
    "Take away one key's worth of marks for each stamp. Count the stamps until no marks are left.": "हर ठप्पे पर कुंजी जितने चिह्न हटाओ। कोई चिह्न न बचे, तब तक ठप्पे गिनो।",
    "Draw one symbol for each key's worth. The symbols times the key give back the count.": "कुंजी जितनों के लिए एक प्रतीक बनाओ। प्रतीकों को कुंजी से गुणा करो। पूरी गिनती वापस मिलती है।",
    "You learned: draw one symbol for each key's worth of the count.": "तुमने सीखा: कुंजी जितनों का एक प्रतीक बनता है।",
    "A tally chart shows 14 children chose swimming, and the key is one face for 2 children. How many faces go in the swimming row?": "मिलान सारणी में 14 बच्चों ने तैराकी चुनी। कुंजी है: एक चेहरा 2 बच्चों के लिए। तैराकी की पंक्ति में कितने चेहरे आएँगे?",
    "Faces in the swimming row?": "तैराकी की पंक्ति में कितने चेहरे?",
    "How many children does one face stand for?": "एक चेहरा कितने बच्चों के लिए है?",
    "The key is one star for 2 children. How many stars show 22 children?": "कुंजी है: एक तारा 2 बच्चों के लिए। 22 बच्चे दिखाने को कितने तारे चाहिए?",
    "Stars for 22 children?": "22 बच्चों के लिए कितने तारे?",
    "How many marks does one star use up?": "एक तारा कितने चिह्न लेता है?",
    "A tally counts 35 story books, and one book picture stands for 5 books. How many book pictures does the row need?": "मिलान सारणी में 35 कहानी की किताबें हैं। एक किताब का चित्र 5 किताबों के लिए है। पंक्ति में किताब के कितने चित्र चाहिए?",
    "Book pictures for 35 books?": "35 किताबों के लिए कितने चित्र?",
    "How many marks does one book picture use up?": "किताब का एक चित्र कितने चिह्न लेता है?",
    /* phase 2 */
    "A title and a key": "शीर्षक और कुंजी",
    "Could anyone read this yet? What is missing?": "क्या अभी कोई इसे पढ़ सकता है? क्या छूटा है?",
    "Would a friend know what one picture is worth?": "क्या दोस्त जानेगा कि एक चित्र कितने का है?",
    "Look at one row alone. What must a reader know to read it?": "सिर्फ़ एक पंक्ति देखो। उसे पढ़ने को क्या जानना ज़रूरी है?",
    "Every pictograph needs a title that says what the data is about. It needs a key that says what one symbol stands for.": "हर चित्रालेख को एक शीर्षक चाहिए। शीर्षक बताता है कि आँकड़े किस बारे में हैं। उसे कुंजी भी चाहिए। कुंजी बताती है कि एक प्रतीक कितने का है।",
    "You learned: a pictograph needs a title and a key to be read.": "तुमने सीखा: चित्रालेख को शीर्षक और कुंजी चाहिए।",
    "A pictograph has rows of flower pictures for four gardens, but no title and no key. Each picture stands for 5 flowers, and the chart counts the flowers in bloom today. Give it the title and the key it needs.": "चित्रालेख में चार बगीचों के फूल बने हैं। उसका न शीर्षक है, न कुंजी। हर चित्र 5 फूलों के लिए है। यह आज खिले फूल गिनता है। उसे सही शीर्षक और कुंजी दो।",
    "Fill the title and the key.": "शीर्षक और कुंजी भरो।",
    "What does one picture stand for?": "एक चित्र क्या दिखाता है?",
    "A pictograph shows rows of cup pictures. A friend reads each row as that many cups, but the chart meant more. What should the pictograph have carried?": "चित्रालेख में कप के चित्रों की पंक्तियाँ हैं। दोस्त हर पंक्ति को उतने ही कप पढ़ता है। पर चित्रालेख का मतलब ज़्यादा था। उस पर क्या होना चाहिए था?",
    "What was left off?": "क्या छूट गया?",
    "The friend did not know one thing about the cup pictures. What was it?": "दोस्त को कप के चित्रों की एक बात नहीं पता थी। वह क्या थी?",
    "a key": "कुंजी", "a title": "शीर्षक", "more cups": "और कप", "colours": "रंग",
    "A class drew a pictograph of rainy days in four months, with one cloud for 2 days. They left off the key. June holds 6 clouds, and a reader says June had 6 rainy days. How many rainy days did June have?": "कक्षा ने बारिश के दिनों का चित्रालेख बनाया। उसमें चार महीने हैं। एक बादल 2 दिनों के लिए है। पर कुंजी छूट गई। जून में 6 बादल हैं। एक पाठक कहता है, जून में 6 दिन बारिश हुई। जून में कितने दिन बारिश हुई?",
    "Rainy days in June?": "जून में बारिश के दिन?",
    "One cloud is not one day here. What is it worth?": "यहाँ एक बादल एक दिन नहीं है। वह कितने का है?",
    /* phase 3 */
    "A pictograph that stands up": "खड़ा चित्रालेख",
    "Tap turn, and watch where every symbol goes.": "घुमाओ बटन दबाओ। देखो हर प्रतीक कहाँ जाता है।",
    "Now it stands up. Is it read any differently?": "अब यह खड़ा है। क्या इसे अलग तरह से पढ़ते हैं?",
    "Is the question asking for symbols, or for what they stand for?": "प्रश्न प्रतीक पूछता है, या वे जिनके लिए हैं?",
    "Count one column's symbols one at a time, whichever way the chart is turned.": "एक स्तंभ के प्रतीक एक एक करके गिनो। चित्रालेख किसी भी ओर घूमा हो।",
    "A pictograph drawn up the page is read the same way: count the symbols and use the key.": "ऊपर की ओर बना चित्रालेख भी ऐसे ही पढ़ते हैं। प्रतीक गिनो और कुंजी लगाओ।",
    "You learned: a column is read like a row, by its symbols and the key.": "तुमने सीखा: स्तंभ को प्रतीक और कुंजी से पढ़ते हैं।",
    "A pictograph drawn up the page has a column of 6 bicycle pictures for Class 4 A. The key is one bicycle for 3 children. How many children in that class come by bicycle?": "खड़े चित्रालेख में कक्षा 4 ए का स्तंभ है। उसमें साइकिल के 6 चित्र हैं। कुंजी है: एक साइकिल 3 बच्चों के लिए। उस कक्षा के कितने बच्चे साइकिल से आते हैं?",
    "Children in 4A by bicycle?": "4A में साइकिल से कितने बच्चे?",
    "How many symbols are in the column?": "स्तंभ में कितने प्रतीक हैं?",
    "An upward pictograph has columns of 4, 7 and 5 cup pictures. One cup stands for 10 cups of tea. How many cups of tea does each column show?": "खड़े चित्रालेख में कप वाले स्तंभ हैं। उनमें 4, 7 और 5 चित्र हैं। एक कप, चाय के 10 कपों के लिए है। हर स्तंभ चाय के कितने कप दिखाता है?",
    "Cups of tea in each column?": "हर स्तंभ में चाय के कितने कप?",
    "Take the key once for every cup picture in a column.": "कप के हर चित्र के लिए कुंजी एक बार लो।",
    "The same data is drawn once across the page and once up it. How many symbols does the mango column of the upward one hold?": "वही आँकड़े एक बार आड़े, एक बार खड़े बने हैं। खड़े वाले में आम का स्तंभ देखो। उसमें कितने प्रतीक हैं?",
    "Symbols in the mango column?": "आम के स्तंभ में कितने प्रतीक?",
    "Turn it back and forth. Does any symbol come or go?": "इसे आगे पीछे घुमाओ। क्या कोई प्रतीक आता या जाता है?",
    /* phase 4 */
    "Numbers beside a column": "स्तंभ के पास संख्याएँ",
    "Look up the side, then tap the faces one at a time.": "किनारे पर ऊपर तक देखो। फिर चेहरों को एक एक करके दबाओ।",
    "Which card tells you what a face is worth?": "कौन सा कार्ड चेहरे का मान बताता है?",
    "Go up the column face by face, adding the key each time.": "स्तंभ में एक एक चेहरा ऊपर जाओ। हर बार कुंजी जोड़ो।",
    "A column's data is its symbols times the key, whatever numbers stand beside it.": "स्तंभ के आँकड़े प्रतीक गुणा कुंजी होते हैं। पास में कोई भी संख्याएँ लिखी हों।",
    "You learned: a column's data is its symbols times the key.": "तुमने सीखा: आँकड़े प्रतीक गुणा कुंजी होते हैं।",
    "An upward pictograph has a column of 7 faces, each for 2 children. A chart numbers the side beside it one to seven, one number for each face. How many children does the column show?": "खड़े चित्रालेख के स्तंभ में 7 चेहरे हैं। हर चेहरा 2 बच्चों के लिए है। किनारे पर 1 से 7 तक संख्याएँ लिखी हैं। हर चेहरे के लिए एक संख्या। स्तंभ कितने बच्चे दिखाता है?",
    "Children in the column?": "स्तंभ में कितने बच्चे?",
    "What do the numbers on the side count?": "किनारे की संख्याएँ क्या गिनती हैं?",
    "A column holds 9 faces, each for 5 people. Its side is numbered one to nine, one number per face, under the heading Number of people. How many people is that?": "एक स्तंभ में 9 चेहरे हैं। हर चेहरा 5 लोगों के लिए है। किनारे पर 1 से 9 तक संख्याएँ हैं। हर चेहरे की एक। शीर्षक है: लोगों की संख्या। तो कितने लोग हुए?",
    "People in the column?": "स्तंभ में कितने लोग?",
    "Those numbers count something other than people. What?": "वे संख्याएँ लोगों को नहीं, कुछ और गिनती हैं। क्या?",
    "You number the side of an upward pictograph in children, with one face for 4 children. What numbers go beside the first, second, third and fourth faces?": "खड़े चित्रालेख का किनारा बच्चों में गिनो। एक चेहरा 4 बच्चों के लिए है। पहले, दूसरे, तीसरे और चौथे चेहरे को देखो। हर एक के पास कौन सी संख्या आएगी?",
    "Numbers up the side?": "किनारे पर ऊपर तक संख्याएँ?",
    "Start at the bottom. What is the first face worth?": "नीचे से शुरू करो। पहला चेहरा कितने का है?",
    "1st": "1ला", "2nd": "2रा", "3rd": "3रा", "4th": "4था",
    /* what the working area and the summary draw */
    "Key": "कुंजी", "Tally": "मिलान सारणी", "Pictograph": "चित्रालेख", "left over": "बचे", "The row is full": "पंक्ति भर गई",
    "Stamp": "ठप्पा", "Half": "आधा", "stamped": "ठप्पे", "counted": "गिने", "symbols": "प्रतीक", "Turn": "घुमाओ",
    "children": "बच्चे", "books": "किताबें", "cups": "कप", "trees": "पेड़", "kites": "पतंगें", "buses": "बसें",
    "flowers": "फूल", "days": "दिन", "people": "लोग",
    "Swimming": "तैराकी", "Cricket": "क्रिकेट", "Stories": "कहानियाँ",
    "Children": "बच्चे", "Cups": "कप", "Trees": "पेड़", "Kites": "पतंगें", "Buses": "बसें",
    "Garden A": "बगीचा A", "Garden B": "बगीचा B", "Garden C": "बगीचा C", "Garden D": "बगीचा D",
    "Monday": "सोमवार", "Tuesday": "मंगलवार", "Wednesday": "बुधवार",
    "June": "जून", "July": "जुलाई", "August": "अगस्त", "September": "सितंबर",
    "Mango": "आम", "Apple": "सेब", "Banana": "केला", "Mon": "सोम", "Tue": "मंगल", "Wed": "बुध",
    "My pictograph": "मेरा चित्रालेख", "Flowers in bloom today": "आज खिले फूल", "Four gardens": "चार बगीचे",
    "Cups of tea sold": "बिके चाय के कप", "Rainy days": "बारिश के दिन", "Coming by bicycle": "साइकिल से आने वाले",
    "Favourite fruits": "पसंदीदा फल",
    "= 5 flowers": "= 5 फूल", "= 1 flower": "= 1 फूल", "= 2 cups": "= 2 कप", "= 2 days": "= 2 दिन",
    "Number of children": "बच्चों की संख्या", "Number of people": "लोगों की संख्या",
  },
  gu: {
    "Pictograph Builder": "ચિત્રાલેખ બનાવો",
    "A tally on one side and an empty pictograph on the other. Set the key first.": "એક બાજુ ટેલી કોષ્ટક છે. બીજી બાજુ ખાલી ચિત્રાલેખ છે. પહેલાં ચાવી નક્કી કરો.",
    "A pictograph drawn from its tally, given a title and a key, and read standing up.": "ટેલીમાંથી ચિત્રાલેખ બન્યો. તેને શીર્ષક અને ચાવી મળી. પછી તેને ઊભો કરીને વાંચ્યો.",
    "Free play. Any tally, any plain picture, and any key that fits.": "મુક્ત રમત. કોઈ પણ ટેલી, કોઈ પણ ચિત્ર, બંધબેસતી ચાવી.",
    /* phase 1 */
    "From a tally to symbols": "ટેલીથી પ્રતીક સુધી",
    "Each symbol stands for this many. How many symbols use up the tally?": "દરેક પ્રતીક આટલા માટે છે. કેટલાં પ્રતીકમાં બધાં ટેલી ચિહ્ન વપરાશે?",
    "How many of those make the count?": "આવા કેટલા મળીને આખી સંખ્યા બને?",
    "Take away one key's worth of marks for each stamp. Count the stamps until no marks are left.": "દરેક છાપ પર ચાવી જેટલાં ચિહ્ન કાઢો. એક પણ ચિહ્ન ન રહે ત્યાં સુધી છાપ ગણો.",
    "Draw one symbol for each key's worth. The symbols times the key give back the count.": "ચાવી જેટલા માટે એક પ્રતીક દોરો. પ્રતીકોને ચાવીથી ગુણો. આખી સંખ્યા પાછી મળે છે.",
    "You learned: draw one symbol for each key's worth of the count.": "તમે શીખ્યા: ચાવી જેટલા માટે એક પ્રતીક દોરાય.",
    "A tally chart shows 14 children chose swimming, and the key is one face for 2 children. How many faces go in the swimming row?": "ટેલીમાં 14 બાળકોએ તરવાનું પસંદ કર્યું. ચાવી: એક ચહેરો 2 બાળકો માટે. તરવાની હારમાં કેટલા ચહેરા આવશે?",
    "Faces in the swimming row?": "તરવાની હારમાં કેટલા ચહેરા?",
    "How many children does one face stand for?": "એક ચહેરો કેટલાં બાળકો માટે છે?",
    "The key is one star for 2 children. How many stars show 22 children?": "ચાવી: એક તારો 2 બાળકો માટે. 22 બાળકો બતાવવા કેટલા તારા જોઈએ?",
    "Stars for 22 children?": "22 બાળકો માટે કેટલા તારા?",
    "How many marks does one star use up?": "એક તારો કેટલાં ચિહ્ન વાપરે છે?",
    "A tally counts 35 story books, and one book picture stands for 5 books. How many book pictures does the row need?": "ટેલીમાં 35 વાર્તાનાં પુસ્તકો ગણાયાં. પુસ્તકનું એક ચિત્ર 5 પુસ્તકો માટે છે. હારમાં પુસ્તકનાં કેટલાં ચિત્ર જોઈએ?",
    "Book pictures for 35 books?": "35 પુસ્તકો માટે કેટલાં ચિત્ર?",
    "How many marks does one book picture use up?": "પુસ્તકનું એક ચિત્ર કેટલાં ચિહ્ન વાપરે છે?",
    /* phase 2 */
    "A title and a key": "શીર્ષક અને ચાવી",
    "Could anyone read this yet? What is missing?": "શું હજી કોઈ આ વાંચી શકે? શું ખૂટે છે?",
    "Would a friend know what one picture is worth?": "શું મિત્રને ખબર પડશે કે એક ચિત્ર કેટલાનું છે?",
    "Look at one row alone. What must a reader know to read it?": "ફક્ત એક હાર જુઓ. તે વાંચવા શું જાણવું પડે?",
    "Every pictograph needs a title that says what the data is about. It needs a key that says what one symbol stands for.": "દરેક ચિત્રાલેખને શીર્ષક જોઈએ. શીર્ષક કહે છે કે માહિતી શેના વિશે છે. તેને ચાવી પણ જોઈએ. ચાવી કહે છે કે એક પ્રતીક કેટલાનું છે.",
    "You learned: a pictograph needs a title and a key to be read.": "તમે શીખ્યા: ચિત્રાલેખને શીર્ષક અને ચાવી જોઈએ.",
    "A pictograph has rows of flower pictures for four gardens, but no title and no key. Each picture stands for 5 flowers, and the chart counts the flowers in bloom today. Give it the title and the key it needs.": "ચિત્રાલેખમાં ચાર બગીચાનાં ફૂલ દોરેલાં છે. તેને ન શીર્ષક છે, ન ચાવી. દરેક ચિત્ર 5 ફૂલ માટે છે. તે આજે ખીલેલાં ફૂલ ગણે છે. તેને જોઈતું શીર્ષક અને ચાવી આપો.",
    "Fill the title and the key.": "શીર્ષક અને ચાવી ભરો.",
    "What does one picture stand for?": "એક ચિત્ર શું બતાવે છે?",
    "A pictograph shows rows of cup pictures. A friend reads each row as that many cups, but the chart meant more. What should the pictograph have carried?": "ચિત્રાલેખમાં કપનાં ચિત્રોની હાર છે. મિત્ર દરેક હારને એટલા જ કપ વાંચે છે. પણ ચિત્રાલેખનો અર્થ વધારે હતો. તેના પર શું હોવું જોઈતું હતું?",
    "What was left off?": "શું રહી ગયું?",
    "The friend did not know one thing about the cup pictures. What was it?": "મિત્રને કપનાં ચિત્રો વિશે એક વાત ખબર નહોતી. તે શું હતી?",
    "a key": "ચાવી", "a title": "શીર્ષક", "more cups": "વધુ કપ", "colours": "રંગ",
    "A class drew a pictograph of rainy days in four months, with one cloud for 2 days. They left off the key. June holds 6 clouds, and a reader says June had 6 rainy days. How many rainy days did June have?": "એક વર્ગે વરસાદના દિવસોનો ચિત્રાલેખ બનાવ્યો. તેમાં ચાર મહિના છે. એક વાદળ 2 દિવસ માટે છે. પણ ચાવી રહી ગઈ. જૂનમાં 6 વાદળ છે. એક વાચક કહે છે, જૂનમાં 6 દિવસ વરસાદ પડ્યો. જૂનમાં કેટલા દિવસ વરસાદ પડ્યો?",
    "Rainy days in June?": "જૂનમાં વરસાદના દિવસ?",
    "One cloud is not one day here. What is it worth?": "અહીં એક વાદળ એક દિવસ નથી. તે કેટલાનું છે?",
    /* phase 3 */
    "A pictograph that stands up": "ઊભો ચિત્રાલેખ",
    "Tap turn, and watch where every symbol goes.": "ફેરવો બટન દબાવો. જુઓ દરેક પ્રતીક ક્યાં જાય છે.",
    "Now it stands up. Is it read any differently?": "હવે તે ઊભો છે. શું તે જુદી રીતે વંચાય છે?",
    "Is the question asking for symbols, or for what they stand for?": "પ્રશ્ન પ્રતીક પૂછે છે, કે તે જેના માટે છે તે?",
    "Count one column's symbols one at a time, whichever way the chart is turned.": "એક સ્તંભનાં પ્રતીક એક એક કરીને ગણો. ચિત્રાલેખ ગમે તે બાજુ ફરેલો હોય.",
    "A pictograph drawn up the page is read the same way: count the symbols and use the key.": "ઉપરની તરફ દોરેલો ચિત્રાલેખ પણ એમ જ વંચાય. પ્રતીક ગણો અને ચાવી વાપરો.",
    "You learned: a column is read like a row, by its symbols and the key.": "તમે શીખ્યા: સ્તંભ પણ પ્રતીક અને ચાવીથી વંચાય.",
    "A pictograph drawn up the page has a column of 6 bicycle pictures for Class 4 A. The key is one bicycle for 3 children. How many children in that class come by bicycle?": "ઊભા ચિત્રાલેખમાં વર્ગ 4 એનો એક સ્તંભ છે. તેમાં સાઇકલનાં 6 ચિત્ર છે. ચાવી: એક સાઇકલ 3 બાળકો માટે. તે વર્ગનાં કેટલાં બાળકો સાઇકલ પર આવે છે?",
    "Children in 4A by bicycle?": "4A માં સાઇકલ પર કેટલાં બાળકો?",
    "How many symbols are in the column?": "સ્તંભમાં કેટલાં પ્રતીક છે?",
    "An upward pictograph has columns of 4, 7 and 5 cup pictures. One cup stands for 10 cups of tea. How many cups of tea does each column show?": "ઊભા ચિત્રાલેખમાં કપનાં ચિત્રોના સ્તંભ છે. તેમાં 4, 7 અને 5 ચિત્ર છે. એક કપ ચાના 10 કપ માટે છે. દરેક સ્તંભ ચાના કેટલા કપ બતાવે છે?",
    "Cups of tea in each column?": "દરેક સ્તંભમાં ચાના કેટલા કપ?",
    "Take the key once for every cup picture in a column.": "સ્તંભમાં કપના દરેક ચિત્ર માટે ચાવી એક વાર લો.",
    "The same data is drawn once across the page and once up it. How many symbols does the mango column of the upward one hold?": "એ જ માહિતી એક વાર આડી અને એક વાર ઊભી દોરી છે. ઊભામાં કેરીનો સ્તંભ જુઓ. તેમાં કેટલાં પ્રતીક છે?",
    "Symbols in the mango column?": "કેરીના સ્તંભમાં કેટલાં પ્રતીક?",
    "Turn it back and forth. Does any symbol come or go?": "તેને આમ તેમ ફેરવો. શું કોઈ પ્રતીક આવે કે જાય છે?",
    /* phase 4 */
    "Numbers beside a column": "સ્તંભની બાજુની સંખ્યાઓ",
    "Look up the side, then tap the faces one at a time.": "બાજુ પર ઉપર સુધી જુઓ. પછી ચહેરાને એક એક કરીને દબાવો.",
    "Which card tells you what a face is worth?": "કયું કાર્ડ કહે છે કે એક ચહેરો કેટલાનો છે?",
    "Go up the column face by face, adding the key each time.": "સ્તંભમાં એક એક ચહેરો ઉપર જાઓ. દર વખતે ચાવી ઉમેરો.",
    "A column's data is its symbols times the key, whatever numbers stand beside it.": "સ્તંભની માહિતી એટલે પ્રતીકો ગુણ્યા ચાવી. બાજુમાં ગમે તે સંખ્યાઓ લખી હોય.",
    "You learned: a column's data is its symbols times the key.": "તમે શીખ્યા: માહિતી એટલે પ્રતીકો ગુણ્યા ચાવી.",
    "An upward pictograph has a column of 7 faces, each for 2 children. A chart numbers the side beside it one to seven, one number for each face. How many children does the column show?": "ઊભા ચિત્રાલેખના સ્તંભમાં 7 ચહેરા છે. દરેક ચહેરો 2 બાળકો માટે છે. બાજુ પર 1 થી 7 સુધી સંખ્યાઓ લખી છે. દરેક ચહેરાની એક સંખ્યા. સ્તંભ કેટલાં બાળકો બતાવે છે?",
    "Children in the column?": "સ્તંભમાં કેટલાં બાળકો?",
    "What do the numbers on the side count?": "બાજુની સંખ્યાઓ શું ગણે છે?",
    "A column holds 9 faces, each for 5 people. Its side is numbered one to nine, one number per face, under the heading Number of people. How many people is that?": "એક સ્તંભમાં 9 ચહેરા છે. દરેક ચહેરો 5 લોકો માટે છે. બાજુ પર 1 થી 9, દરેક ચહેરાની એક સંખ્યા છે. મથાળું છે: લોકોની સંખ્યા. તો કેટલા લોકો થયા?",
    "People in the column?": "સ્તંભમાં કેટલા લોકો?",
    "Those numbers count something other than people. What?": "તે સંખ્યાઓ લોકો નહીં, બીજું કંઈક ગણે છે. શું?",
    "You number the side of an upward pictograph in children, with one face for 4 children. What numbers go beside the first, second, third and fourth faces?": "ઊભા ચિત્રાલેખની બાજુ બાળકોમાં ગણો. એક ચહેરો 4 બાળકો માટે છે. પહેલા, બીજા, ત્રીજા અને ચોથા ચહેરાને જુઓ. દરેકની પાસે કઈ સંખ્યા આવશે?",
    "Numbers up the side?": "બાજુ પર ઉપર સુધી સંખ્યાઓ?",
    "Start at the bottom. What is the first face worth?": "નીચેથી શરૂ કરો. પહેલો ચહેરો કેટલાનો છે?",
    "1st": "1લો", "2nd": "2જો", "3rd": "3જો", "4th": "4થો",
    /* what the working area and the summary draw */
    "Key": "ચાવી", "Tally": "ટેલી કોષ્ટક", "Pictograph": "ચિત્રાલેખ", "left over": "વધ્યા", "The row is full": "હાર ભરાઈ ગઈ",
    "Stamp": "છાપ", "Half": "અડધું", "stamped": "છાપ", "counted": "ગણ્યા", "symbols": "પ્રતીક", "Turn": "ફેરવો",
    "children": "બાળકો", "books": "પુસ્તકો", "cups": "કપ", "trees": "ઝાડ", "kites": "પતંગ", "buses": "બસ",
    "flowers": "ફૂલ", "days": "દિવસ", "people": "લોકો",
    "Swimming": "તરવું", "Cricket": "ક્રિકેટ", "Stories": "વાર્તાઓ",
    "Children": "બાળકો", "Cups": "કપ", "Trees": "ઝાડ", "Kites": "પતંગ", "Buses": "બસ",
    "Garden A": "બગીચો A", "Garden B": "બગીચો B", "Garden C": "બગીચો C", "Garden D": "બગીચો D",
    "Monday": "સોમવાર", "Tuesday": "મંગળવાર", "Wednesday": "બુધવાર",
    "June": "જૂન", "July": "જુલાઈ", "August": "ઑગસ્ટ", "September": "સપ્ટેમ્બર",
    "Mango": "કેરી", "Apple": "સફરજન", "Banana": "કેળું", "Mon": "સોમ", "Tue": "મંગળ", "Wed": "બુધ",
    "My pictograph": "મારો ચિત્રાલેખ", "Flowers in bloom today": "આજે ખીલેલાં ફૂલ", "Four gardens": "ચાર બગીચા",
    "Cups of tea sold": "વેચાયેલા ચાના કપ", "Rainy days": "વરસાદના દિવસો", "Coming by bicycle": "સાઇકલ પર આવનારા",
    "Favourite fruits": "મનપસંદ ફળ",
    "= 5 flowers": "= 5 ફૂલ", "= 1 flower": "= 1 ફૂલ", "= 2 cups": "= 2 કપ", "= 2 days": "= 2 દિવસ",
    "Number of children": "બાળકોની સંખ્યા", "Number of people": "લોકોની સંખ્યા",
  },
};

/* One entry per phase = one mount. Item fields of this tool:
   stamp    row, count (the tally), key, sym, unit: the child sets the key dial and stamps one symbol a key's worth
   finish   rows, titles, keys (cards), answer "<title id> <key id>": the title strip and the key box, made on the area
   missing  a chart with its title and no key: what should it have carried (a word choice)
   keyread  a chart whose key was left off: the focus row read with the key
   column   an upward chart: the focus column read by its symbols and the key
   columns  every column of an upward chart (one box a column)
   same     a chart across the page, turned up it: the focus column's symbols
   side     one column with a side numbered one per face: the column's data
   ruler    one column: the side ruler's numbers in the data's own units (one box a face) */
const PHASES = [
  {
    n: 1,
    concept: "From a tally to symbols",
    conceptId: "M2.S4.T6.C20", objectiveIds: ["O9"],
    says: ["Each symbol stands for this many. How many symbols use up the tally?"],
    /* tries, as the plan writes it: first rung, the item's own miss; second, how many of those make the count; third,
       a tally used up by stamping (said here in general, so it fits every key the phase uses) */
    ladder: ["How many of those make the count?", "Take away one key's worth of marks for each stamp. Count the stamps until no marks are left."],
    closing: "Draw one symbol for each key's worth. The symbols times the key give back the count.",
    learned: "You learned: draw one symbol for each key's worth of the count.",
    traceback: "Each stamp takes one key's worth of marks from the tally until the row is used up, and the row reads its symbols times the key.",
    items: [
      /* learn ML1: answer in the plan = 7 faces */
      { qid: "M2.S4.T6.C20:ML1", kind: "stamp", row: "Swimming", count: 14, key: 2, sym: "face", unit: "children", answer: 7, winMs: 2400,
        say: "A tally chart shows 14 children chose swimming, and the key is one face for 2 children. How many faces go in the swimming row?",
        ask: "Faces in the swimming row?", miss: "How many children does one face stand for?" },
      /* practice 1: answer in the plan = 11 stars, because 11 x 2 = 22 */
      { qid: "M2.S4.T6.C20:1", kind: "stamp", row: "Cricket", count: 22, key: 2, sym: "star", unit: "children", answer: 11, winMs: 2600,
        say: "The key is one star for 2 children. How many stars show 22 children?",
        ask: "Stars for 22 children?", miss: "How many marks does one star use up?" },
      /* practice 2: answer in the plan = 7 book pictures, because 7 x 5 = 35 */
      { qid: "M2.S4.T6.C20:2", kind: "stamp", row: "Stories", count: 35, key: 5, sym: "book", unit: "books", answer: 7, winMs: 2400,
        say: "A tally counts 35 story books, and one book picture stands for 5 books. How many book pictures does the row need?",
        ask: "Book pictures for 35 books?", miss: "How many marks does one book picture use up?" },
    ],
  },
  {
    n: 2,
    concept: "A title and a key",
    conceptId: "M2.S4.T6.C21", objectiveIds: ["O9"],
    says: ["Could anyone read this yet? What is missing?"],
    /* tries, as the plan writes it: first rung, the item's own miss; second, could someone else read this chart; third,
       the chart cut to one row (said here as looking at one row alone) */
    ladder: ["Would a friend know what one picture is worth?", "Look at one row alone. What must a reader know to read it?"],
    closing: "Every pictograph needs a title that says what the data is about. It needs a key that says what one symbol stands for.",
    learned: "You learned: a pictograph needs a title and a key to be read.",
    traceback: "The title and the key fill in, and each row's number, its symbols times the key, is written at its end.",
    items: [
      /* learn ML2: answer in the plan = A title such as Flowers in Bloom Today, and the key one flower picture for 5 flowers */
      { qid: "M2.S4.T6.C21:ML2", kind: "finish", pad: "enter", sym: "flower", unit: "flowers", key: 5,
        rows: [["Garden A", 4], ["Garden B", 6], ["Garden C", 3], ["Garden D", 5]],
        titles: [["mine", "My pictograph"], ["bloom", "Flowers in bloom today"], ["gardens", "Four gardens"]],
        keys: [["k5", "= 5"], ["k5f", "= 5 flowers"], ["k1f", "= 1 flower"]],
        answer: "bloom k5f", winMs: 2200,
        say: "A pictograph has rows of flower pictures for four gardens, but no title and no key. Each picture stands for 5 flowers, and the chart counts the flowers in bloom today. Give it the title and the key it needs.",
        ask: "Fill the title and the key.", miss: "What does one picture stand for?" },
      /* practice 3: answer in the plan = A key saying what one cup picture stands for, and a title saying what the data is about.
         The chart here carries its title, so the one thing it lacks is the key */
      { qid: "M2.S4.T6.C21:3", kind: "missing", sym: "cup", unit: "cups", key: 2, title: "Cups of tea sold",
        rows: [["Monday", 3], ["Tuesday", 5], ["Wednesday", 2]],
        choices: [{ id: "key", label: "a key" }, { id: "title", label: "a title" }, { id: "more", label: "more cups" }, { id: "colour", label: "colours" }],
        answer: "key", winMs: 2000,
        say: "A pictograph shows rows of cup pictures. A friend reads each row as that many cups, but the chart meant more. What should the pictograph have carried?",
        ask: "What was left off?", miss: "The friend did not know one thing about the cup pictures. What was it?" },
      /* practice 4: answer in the plan = 12, because each cloud stands for 2 days. The missing key misled the reader */
      { qid: "M2.S4.T6.C21:4", kind: "keyread", sym: "cloud", unit: "days", key: 2, title: "Rainy days", focus: 0,
        rows: [["June", 6], ["July", 8], ["August", 5], ["September", 3]],
        answer: 12, winMs: 1800,
        say: "A class drew a pictograph of rainy days in four months, with one cloud for 2 days. They left off the key. June holds 6 clouds, and a reader says June had 6 rainy days. How many rainy days did June have?",
        ask: "Rainy days in June?", miss: "One cloud is not one day here. What is it worth?" },
    ],
  },
  {
    n: 3,
    concept: "A pictograph that stands up",
    conceptId: "M2.S4.T6.C22", objectiveIds: ["O10"],
    says: ["Tap turn, and watch where every symbol goes."],
    /* the phase opens on the pictograph across the page; the child's one act is the turn (api.demoDone) */
    demo: { act: "turn" },
    demoLines: ["Now it stands up. Is it read any differently?"],
    /* tries, as the plan writes it: first rung, the item's own miss; second, what does one symbol stand for; third,
       one column read symbol by symbol (said so it fits a chart standing up or lying across) */
    ladder: ["Is the question asking for symbols, or for what they stand for?", "Count one column's symbols one at a time, whichever way the chart is turned."],
    closing: "A pictograph drawn up the page is read the same way: count the symbols and use the key.",
    learned: "You learned: a column is read like a row, by its symbols and the key.",
    traceback: "The column's symbols light from the bottom into the running count, the key is taken beside each, and the column's number lands above it.",
    items: [
      /* learn ML3: answer in the plan = 18 children */
      { qid: "M2.S4.T6.C22:ML3", kind: "column", sym: "bike", unit: "children", key: 3, title: "Coming by bicycle", up: true, focus: 0,
        cols: [["4A", 6], ["4B", 4], ["4C", 5], ["4D", 3]],
        answer: 18, winMs: 2000,
        say: "A pictograph drawn up the page has a column of 6 bicycle pictures for Class 4 A. The key is one bicycle for 3 children. How many children in that class come by bicycle?",
        ask: "Children in 4A by bicycle?", miss: "How many symbols are in the column?" },
      /* practice 5: answer in the plan = 40, 70 and 50 cups (one box a column) */
      { qid: "M2.S4.T6.C22:5", kind: "columns", sym: "cup", unit: "cups", key: 10, title: "Cups of tea sold", up: true,
        cols: [["Mon", 4], ["Tue", 7], ["Wed", 5]],
        parts: [{ label: "Mon" }, { label: "Tue" }, { label: "Wed" }], answer: [40, 70, 50], winMs: 2000,
        say: "An upward pictograph has columns of 4, 7 and 5 cup pictures. One cup stands for 10 cups of tea. How many cups of tea does each column show?",
        ask: "Cups of tea in each column?", miss: "Take the key once for every cup picture in a column." },
      /* practice 6: answer in the plan = 9. Only the direction changes, so every row keeps its symbols.
         The across chart shows the mango row, so the say does not print its count */
      { qid: "M2.S4.T6.C22:6", kind: "same", sym: "face", unit: "children", key: 2, title: "Favourite fruits", up: false, focus: 0,
        cols: [["Mango", 9], ["Apple", 5], ["Banana", 7]],
        answer: 9, winMs: 2000,
        say: "The same data is drawn once across the page and once up it. How many symbols does the mango column of the upward one hold?",
        ask: "Symbols in the mango column?", miss: "Turn it back and forth. Does any symbol come or go?" },
    ],
  },
  {
    n: 4,
    concept: "Numbers beside a column",
    conceptId: "M2.S4.T6.C23", objectiveIds: ["O10"],
    says: ["Look up the side, then tap the faces one at a time."],
    /* tries, as the plan writes it: first rung, the item's own miss; second, what does one face stand for (said here
       as a pointer to the key card, since the misses already ask what a face is worth); third, the side ruler
       numbered in children face by face (said here as going up adding the key) */
    ladder: ["Which card tells you what a face is worth?", "Go up the column face by face, adding the key each time."],
    closing: "A column's data is its symbols times the key, whatever numbers stand beside it.",
    learned: "You learned: a column's data is its symbols times the key.",
    traceback: "The side ruler is laid beside the column and, face by face from the bottom, writes the key times the faces counted, up to the top face.",
    items: [
      /* learn ML4: answer in the plan = 14 children */
      { qid: "M2.S4.T6.C23:ML4", kind: "side", sym: "face", unit: "children", key: 2, faces: 7, heading: ["Number of", "children"],
        answer: 14, winMs: 2000,
        say: "An upward pictograph has a column of 7 faces, each for 2 children. A chart numbers the side beside it one to seven, one number for each face. How many children does the column show?",
        ask: "Children in the column?", miss: "What do the numbers on the side count?" },
      /* practice 7: answer in the plan = 45. The side's numbers count faces, so the heading does not match them: 9 x 5 = 45 people */
      { qid: "M2.S4.T6.C23:7", kind: "side", sym: "face", unit: "people", key: 5, faces: 9, heading: ["Number of", "people"],
        answer: 45, winMs: 2200,
        say: "A column holds 9 faces, each for 5 people. Its side is numbered one to nine, one number per face, under the heading Number of people. How many people is that?",
        ask: "People in the column?", miss: "Those numbers count something other than people. What?" },
      /* practice 8: answer in the plan = 4, 8, 12 and 16 (one box a face) */
      { qid: "M2.S4.T6.C23:8", kind: "ruler", sym: "face", unit: "children", key: 4, faces: 4,
        parts: [{ label: "1st" }, { label: "2nd" }, { label: "3rd" }, { label: "4th" }], answer: [4, 8, 12, 16], winMs: 1800,
        say: "You number the side of an upward pictograph in children, with one face for 4 children. What numbers go beside the first, second, third and fourth faces?",
        ask: "Numbers up the side?", miss: "Start at the bottom. What is the first face worth?" },
    ],
  },
];

/* The numbers, rows, sizes and targets the working area needs (they go into the sidecar too). */
const MODEL = {
  workingArea: { w: 1086, h: 528 },
  tally: { markPitch: 13, bundlePitch: 73, fifthMark: "drawn across the four before it" },
  pictograph: { symbol: 44, pitch: 52, firstSymbolX: 196 },
  upright: { symbol: 36, pitch: 40, bottomLine: 470, columnPitch: 150 },
  keyDial: { min: 1, max: 10 },
  freePlay: { tally: [1, 25], tray: ["face", "cup", "tree", "kite", "bus"] },
  colours: { mark: "#0072B2", fifthMark: "#D55E00", symbol: "#009E73", reading: "#E69F00", askedRow: "#56B4E9" },
};

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* judge: is this value right for this item? (numbers compare as numbers) */
const judge = (item: any, v: any) => {
  if (item.parts) return judgeSlotParts(item, v);
  if (typeof item.answer === "number") return leadNumber(v) === item.answer;
  return String(v ?? "").trim().toLowerCase() === String(item.answer).trim().toLowerCase();
};
/* oracle: every answer re-derived by a second route that shares no code with judge or Work:
   a tally shared into the key by taking one key's worth away at a time, a column read by adding one key per symbol */
const oracle = () => PHASES.every((p: any) => p.items.every((it: any) => {
  const addUp = (k: number, times: number) => { let s = 0; for (let i = 0; i < times; i++) s += k; return s; };
  const shareOut = (total: number, k: number) => { let c = 0; while (total >= k) { total -= k; c += 1; } return total === 0 ? c : -1; };
  switch (it.kind) {
    case "stamp": return shareOut(it.count, it.key) === it.answer;
    case "finish": {
      /* the title that names what was counted, the key that says the number and what it counts */
      const t = it.titles.filter((x: any) => x[1].toLowerCase().includes(it.unit));
      const k = it.keys.filter((x: any) => x[1].includes(String(it.key)) && x[1].includes(it.unit));
      return t.length === 1 && k.length === 1 && t[0][0] + " " + k[0][0] === it.answer;
    }
    case "missing": return (it.title ? "key" : "title") === it.answer;
    case "keyread": return addUp(it.key, it.rows[it.focus][1]) === it.answer;
    case "column": return addUp(it.key, it.cols[it.focus][1]) === it.answer;
    case "columns": return it.cols.length === it.answer.length && it.cols.every((c: any, k: number) => addUp(it.key, c[1]) === it.answer[k]);
    case "same": return it.cols[it.focus][1] === it.answer;
    case "side": return addUp(it.key, it.faces) === it.answer;
    case "ruler": return it.answer.length === it.faces && it.answer.every((v: number, k: number) => v === addUp(it.key, k + 1));
    default: return false;
  }
}));
/* the most likely wrong answer (the misconception); judge must reject it */
const nearMiss = (item: any) => {
  switch (item.kind) {
    case "stamp": return item.count;                                   /* one symbol for each child */
    case "finish": return String(item.answer).split(" ")[0] + " none";  /* the key left off */
    case "missing": return "title";
    case "keyread": return item.rows[item.focus][1];                   /* a cloud read as one day */
    case "column": return item.cols[item.focus][1];                    /* the symbols, the key forgotten */
    case "columns": return item.cols.map((c: any) => c[1]).join("|");
    case "same": return item.answer * item.key;                        /* the key used where symbols are asked */
    case "side": return item.faces;                                    /* read off the side numbered one per face */
    case "ruler": return item.answer.map((_: any, k: number) => k + 1).join("|");
    default: return typeof item.answer === "number" ? item.answer + 1 : "~";
  }
};
/* the forms of an answer that no question, hint or ladder line may print.
   finish: the answer is the placing of two cards the question itself describes (a build target), never a printed form */
const answerForms = (item: any) => {
  if (item.kind === "finish") return [];
  if (item.choices) return item.choices.filter((c: any) => c.id === item.answer).map((c: any) => c.label);
  if (item.parts) return item.answer.filter((x: number) => x >= 10).flatMap((x: number) => [String(x), indian(x), words(x)]);
  return [String(item.answer), indian(item.answer), words(item.answer)];
};
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => item.answer;

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => (T.state().stage === "demo" ? HOOK.demo && HOOK.demo() : T.submit(item.answer));
/* the agent's answer() for an item made on the working area: set it as a child would; undefined = type it */
const answer = (item: any, v: any) => (item.pad === "enter" && HOOK.set ? HOOK.set(v) : undefined);
/* the agent's check() before Enter: e.g. drop a token that waits; undefined = press Enter */
const check = () => (HOOK.check ? HOOK.check() : undefined);
/* what the slot shows: a card placing (the title strip and key box) is on the working area, so the slot stays
   clean; a word choice shows its words */
const PB_SHOW: any = { key: "a key", title: "a title", more: "more cups", colour: "colours" };
const pbFormat = (v: any) => {
  const s = String(v ?? "");
  if (/^(none|mine|bloom|gardens) (none|k5|k5f|k1f)$/.test(s)) return "";
  return PB_SHOW[s] ?? s;
};

/* ── pictures ──────────────────────────────────────────────────────────────────────────── */

const PB_GREEN = CONTENT.one;
const PB_BLUE = CONTENT.hundred;
const PB_VERM = CONTENT.pointer;
const PB_AMBER = CONTENT.ten;
const PB_AMB_INK = shade(CONTENT.ten, 0.4);
const PB_SKY = tint("#56B4E9", 0.74);
const PB_TRAY = ["face", "cup", "tree", "kite", "bus"];
const PB_UNIT: any = { face: "children", cup: "cups", tree: "trees", kite: "kites", bus: "buses" };
const PB_ROWNAME: any = { face: "Children", cup: "Cups", tree: "Trees", kite: "Kites", bus: "Buses" };
const PB_STAR = Array.from({ length: 10 }, (_, i) => {
  const r = i % 2 ? 19 : 47, a = -Math.PI / 2 + (i * Math.PI) / 5;
  return (50 + r * Math.cos(a)).toFixed(1) + "," + (53 + r * Math.sin(a)).toFixed(1);
}).join(" ");

/* one plain picture, s across, centred at (cx, cy); green in the key and in the rows alike */
function pbGlyph(sym: string, cx: number, cy: number, s: number, k?: any) {
  const f = "url(#gOne)", e = shade(PB_GREEN, 0.35), d = shade(PB_GREEN, 0.6), lt = tint(PB_GREEN, 0.8);
  let body: any = null;
  if (sym === "face") body = (<g>
    <circle cx={50} cy={50} r={43} fill={f} stroke={e} strokeWidth={5} />
    <circle cx={35} cy={41} r={6.5} fill={d} /><circle cx={65} cy={41} r={6.5} fill={d} />
    <path d="M 31 60 Q 50 78 69 60" fill="none" stroke={d} strokeWidth={6.5} strokeLinecap="round" />
  </g>);
  else if (sym === "star") body = <polygon points={PB_STAR} fill={f} stroke={e} strokeWidth={5} strokeLinejoin="round" />;
  else if (sym === "book") body = (<g>
    <path d="M 50 28 Q 30 16 6 22 V 80 Q 30 74 50 86 Q 70 74 94 80 V 22 Q 70 16 50 28 Z" fill={f} stroke={e} strokeWidth={5} strokeLinejoin="round" />
    <path d="M 50 28 V 86" stroke={d} strokeWidth={4} />
    <path d="M 16 40 Q 30 36 42 42 M 16 54 Q 30 50 42 56 M 58 42 Q 70 36 84 40 M 58 56 Q 70 50 84 54" fill="none" stroke={lt} strokeWidth={4} strokeLinecap="round" />
  </g>);
  else if (sym === "flower") body = (<g>
    <path d="M 50 60 V 97" stroke={e} strokeWidth={6} strokeLinecap="round" />
    {[0, 1, 2, 3, 4].map((j) => { const a = -Math.PI / 2 + (j * 2 * Math.PI) / 5; return <circle key={j} cx={50 + 21 * Math.cos(a)} cy={40 + 21 * Math.sin(a)} r={16} fill={f} stroke={e} strokeWidth={3.5} />; })}
    <circle cx={50} cy={40} r={11} fill="#FFFFFF" stroke={e} strokeWidth={3.5} />
  </g>);
  else if (sym === "cup") body = (<g>
    <path d="M 14 26 H 72 V 54 Q 72 82 43 82 Q 14 82 14 54 Z" fill={f} stroke={e} strokeWidth={5} strokeLinejoin="round" />
    <path d="M 72 36 Q 93 36 92 52 Q 91 66 72 64" fill="none" stroke={e} strokeWidth={6} />
    <path d="M 8 92 H 80" stroke={e} strokeWidth={6} strokeLinecap="round" />
  </g>);
  else if (sym === "cloud") body = <path d="M 24 78 Q 4 78 6 60 Q 8 44 26 46 Q 30 20 54 22 Q 78 22 80 46 Q 96 48 95 63 Q 93 78 76 78 Z" fill={f} stroke={e} strokeWidth={5} strokeLinejoin="round" />;
  else if (sym === "bike") body = (<g>
    <circle cx={24} cy={64} r={19} fill="none" stroke={e} strokeWidth={7} />
    <circle cx={76} cy={64} r={19} fill="none" stroke={e} strokeWidth={7} />
    <path d="M 24 64 L 42 34 L 68 34 L 76 64 M 42 34 L 52 64 L 68 34 M 36 24 H 50 M 68 34 L 63 22 H 74" fill="none" stroke={PB_GREEN} strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" />
  </g>);
  else if (sym === "tree") body = (<g>
    <rect x={43} y={60} width={14} height={36} rx={4} fill={e} />
    <circle cx={50} cy={40} r={32} fill={f} stroke={e} strokeWidth={5} />
  </g>);
  else if (sym === "kite") body = (<g>
    <path d="M 50 78 Q 38 86 52 90 Q 66 94 54 99" fill="none" stroke={e} strokeWidth={4} />
    <polygon points="50,5 85,40 50,78 15,40" fill={f} stroke={e} strokeWidth={5} strokeLinejoin="round" />
    <path d="M 50 5 V 78 M 15 40 H 85" stroke={d} strokeWidth={3} />
  </g>);
  else body = (<g>
    <rect x={6} y={16} width={88} height={62} rx={12} fill={f} stroke={e} strokeWidth={5} />
    <rect x={14} y={25} width={20} height={20} rx={3} fill="#FFFFFF" /><rect x={40} y={25} width={20} height={20} rx={3} fill="#FFFFFF" />
    <rect x={66} y={25} width={20} height={20} rx={3} fill="#FFFFFF" />
    <circle cx={28} cy={82} r={10} fill={d} /><circle cx={72} cy={82} r={10} fill={d} />
  </g>);
  return <g key={k} transform={`translate(${cx - s / 2},${cy - s / 2}) scale(${s / 100})`}>{body}</g>;
}

/* tally marks: upright marks deep blue, every fifth drawn across the four before it in vermilion;
   the first `used` marks have faded (taken by the stamps) */
function pbTally(x0: number, y0: number, h: number, count: number, used: number, kp: string) {
  const out: any[] = [];
  const P = 13, BW = 3 * P + 34;
  for (let i = 0; i < count; i++) {
    const b = Math.floor(i / 5), k = i % 5, bx = x0 + b * BW, gone = i < used;
    if (k < 4) out.push(<line key={kp + i} x1={bx + k * P} y1={y0} x2={bx + k * P} y2={y0 + h} stroke={gone ? tint(PB_BLUE, 0.82) : PB_BLUE} strokeWidth={5} strokeLinecap="round" />);
    else out.push(<line key={kp + i} x1={bx - 7} y1={y0 + h - 6} x2={bx + 3 * P + 7} y2={y0 + 6} stroke={gone ? tint(PB_VERM, 0.82) : PB_VERM} strokeWidth={5} strokeLinecap="round" />);
  }
  return out;
}

/* a key's worth of small marks under a stamped symbol: every symbol is seen holding its own marks */
function pbTiny(cx: number, y: number, k: number, kp: string) {
  const n = Math.min(Math.round(k), 10), sp = n > 5 ? 4.5 : 7;
  const ups: number[] = [], diags: number[][] = [];
  let x = 0;
  for (let i = 0; i < n; i++) {
    if (i % 5 === 4) { diags.push([x - 4 * sp, x - sp]); x += sp; } else { ups.push(x); x += sp; }
  }
  const off = cx - (x - sp) / 2;
  return (
    <g key={kp}>
      {ups.map((u, j) => <line key={j} x1={off + u} y1={y} x2={off + u} y2={y + 16} stroke={PB_BLUE} strokeWidth={3} strokeLinecap="round" />)}
      {diags.map((d2, j) => <line key={"d" + j} x1={off + d2[0] - 3} y1={y + 14} x2={off + d2[1] + 3} y2={y + 2} stroke={PB_VERM} strokeWidth={3} strokeLinecap="round" />)}
    </g>
  );
}

/* ── the working area: 1086 x 528, origin at its top-left ──────────────────────────────── */
function Work({ phase, n, item, index, stage, wrong, typed, api, MODEL, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();
  const fast = reducedMotion();
  const free = stage === "free";
  /* the working area is playable before it is answerable: during the teach, the question and Free play */
  const playable = stage === "ask" || stage === "teach" || stage === "demo" || free;
  const it: any = item || {};

  const [bench, setBench] = useState<any>({ key: null, stamps: 0, half: false });
  const [fp, setFp] = useState<any>({ count: 12, sym: "face" });
  const [p2, setP2] = useState<any>({ title: null, keyc: null, open: null });
  const [turned, setTurned] = useState<any>(null);
  const [lit, setLit] = useState(0);
  const [demo, setDemo] = useState<any>(null);
  const [shake, setShake] = useState(false);
  const p2ref = useRef<any>(p2);
  p2ref.current = p2;
  const judged = useRef<any>(null);
  const prevStage = useRef<any>(stage);

  const fresh = () => {
    tl.stop(); setDemo(null); setBench({ key: null, stamps: 0, half: false });
    const s = { title: null, keyc: null, open: null };
    p2ref.current = s; setP2(s);
    setTurned(null); setLit(0); judged.current = null;
  };
  useEffect(() => { fresh(); api.lock(false); }, [n + ":" + index]);

  /* the correction and the win share one worked run: it redraws the maths on a layer of its own (demo), which
     the child's next act on the working area clears; the child's own pieces are never written */
  const work = (w: any, slow: boolean, done?: () => void) => {
    const S: any[] = [];
    const at = (a: number, b: number, fn: any) => S.push([slow ? a : b, fn]);
    const k = w.kind;
    /* a phase 3 chart lying across swings up first (850 ms, a 35 ms stagger a symbol): nothing is counted on it
       until every symbol has landed, in the win as in the correction */
    const swing = n === 3 && !curUp && !fast ? 900 + 35 * (Math.max(1, ...(w.cols || []).map((c: any) => c[1])) - 1) : 0;
    if (k === "stamp") {
      const own = bench.key === w.key && !bench.half ? bench.stamps : 0;
      const N = Math.round(w.count / w.key);
      at(350, 40, () => setDemo({ key: w.key, stamps: own, half: false, tag: false }));
      for (let s = own + 1; s <= N; s++) at(420, 140, () => { setDemo((d: any) => ({ ...d, stamps: s })); api.sfx.tick(); });
      at(300, 40, () => setDemo((d: any) => ({ ...d, tag: true })));
    } else if (k === "finish") {
      const [t, kc] = String(w.answer).split(" ");
      at(450, 40, () => setDemo({ title: t, keyc: null, tags: 0 }));
      at(450, 40, () => setDemo((d: any) => ({ ...d, keyc: kc })));
      for (let r = 1; r <= w.rows.length; r++) at(380, 90, () => setDemo((d: any) => ({ ...d, tags: r })));
    } else if (k === "missing") {
      at(550, 40, () => setDemo({ keyc: "yes", tags: 0 }));
      for (let r = 1; r <= w.rows.length; r++) at(380, 90, () => setDemo((d: any) => ({ ...d, tags: r })));
    } else if (k === "keyread") {
      const N = w.rows[w.focus][1];
      at(550, 40, () => setDemo({ keyc: "yes", lit: 0, tag: false }));
      for (let s = 1; s <= N; s++) at(380, 100, () => { setDemo((d: any) => ({ ...d, lit: s })); api.sfx.tick(); });
      at(300, 40, () => setDemo((d: any) => ({ ...d, tag: true })));
    } else if (k === "column" || k === "same") {
      const N = w.cols[w.focus][1];
      at(Math.max(1000, swing), Math.max(40, swing), () => setDemo({ up: true, lit: 0, tag: false }));
      for (let s = 1; s <= N; s++) at(360, 90, () => { setDemo((d: any) => ({ ...d, lit: s })); api.sfx.tick(); });
      at(300, 40, () => setDemo((d: any) => ({ ...d, tag: true })));
    } else if (k === "columns") {
      at(Math.max(600, swing), Math.max(40, swing), () => setDemo({ up: true, col: 0 }));
      for (let c = 1; c <= w.cols.length; c++) at(650, 150, () => { setDemo((d: any) => ({ ...d, col: c })); api.sfx.tick(); });
    } else if (k === "side" || k === "ruler") {
      at(350, 40, () => setDemo({ ruler: 0 }));
      for (let s = 1; s <= w.faces; s++) at(420, 110, () => { setDemo((d: any) => ({ ...d, ruler: s })); api.sfx.tick(); });
    }
    tl.run(S, done);
  };

  useEffect(() => {
    const was = prevStage.current;
    prevStage.current = stage;
    if (stage === "teach" && was !== "demo" && was !== "teach") fresh();
    /* faces tapped while the teach was still speaking were play: the question opens on an uncounted column */
    if (stage === "ask" && was === "teach") setLit(0);
    if (stage === "free") { fresh(); setFp({ count: 12, sym: "face" }); setBench({ key: 2, stamps: 0, half: false }); }
    if (stage === "win") work(it, false);
    if (stage === "demo" && turned === true) api.demoDone(phase.demoLines);
  }, [stage]);

  /* the traceback: lock the pad, redraw the maths in steps ending on the whole right answer, unlock */
  useEffect(() => {
    if (!wrong || stage !== "ask") return;
    api.lock(true);
    work(it, true, () => api.lock(false));
  }, [wrong]);

  /* the child's next act on the working area clears the correction's layer first */
  const act = () => { if (demo) { tl.stop(); setDemo(null); api.lock(false); } };
  const refuse = () => { if (fast) return; setShake(true); setTimeout(() => setShake(false), 260); };

  /* a correction still being drawn (the traceback's own run, not the correction left standing): every control on
     the working area ignores presses until it has ended on the whole answer (LAYOUT §3), as the turn does */
  const correcting = tl.busy && !!demo;

  /* keyboard focus: a control pressed with Enter or Space keeps the focus (or hands it to the next control), so
     a keyboard child never Tabs from the top again. Only a key press moves focus; a tap leaves the page free. */
  const kbRef = useRef(false);
  const onKeyCapture = (e: any) => {
    if (e.key !== "Enter" && e.key !== " ") return;
    kbRef.current = true;
    setTimeout(() => { kbRef.current = false; }, 0);
  };
  const focusNext = (ids: string[]) => {
    if (!kbRef.current) return;
    setTimeout(() => {
      for (const id of ids) {
        const el: any = document.querySelector(`[data-control="${id}"]`);
        if (el && el.getAttribute("tabindex") !== "-1" && typeof el.focus === "function") { el.focus(); return; }
      }
    }, 0);
  };

  /* Escape closes an open card list on phase 2 */
  useEffect(() => {
    if (!p2.open) return;
    const h = (e: any) => { if (e.key === "Escape") { const t = { ...p2ref.current, open: null }; p2ref.current = t; setP2(t); } };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [p2.open]);

  /* ── phase 1 and Free play: the tally, the key dial, the stamp ── */
  const count = free ? fp.count : it.count || 0;
  const sym = free ? fp.sym : it.sym || "face";
  const unit = free ? PB_UNIT[fp.sym] : it.unit || "";
  const leftOf = (b: any) => count - (b.key ? b.stamps * b.key + (b.half ? b.key / 2 : 0) : 0);
  /* the row holds eleven places: in Free play a key too small for the tally does not fit it */
  const PLACES = 11;
  const canStamp = (b: any) => !!b.key && !b.half && leftOf(b) >= b.key && b.stamps < PLACES;
  const canHalf = (b: any) => !!b.key && b.key % 2 === 0 && !b.half && leftOf(b) === b.key / 2 && b.stamps < PLACES;
  const stampOne = () => { if (correcting) return; act(); if (!canStamp(bench)) { refuse(); return; } setBench({ ...bench, stamps: bench.stamps + 1 }); api.sfx.tick(); };
  const stampHalf = () => { if (correcting) return; act(); if (!canHalf(bench)) { refuse(); return; } setBench({ ...bench, half: true }); api.sfx.tick(); };
  const liftOne = () => {
    if (correcting) return;
    act();
    if (bench.half) setBench({ ...bench, half: false });
    else if (bench.stamps > 0) setBench({ ...bench, stamps: bench.stamps - 1 });
  };
  const dialLocked = bench.stamps > 0 || bench.half;
  const dial = (d: number) => {
    if (correcting) return;
    act();
    if (dialLocked) return;
    const k = bench.key === null ? (d > 0 ? 1 : null) : Math.min(10, Math.max(1, bench.key + d));
    setBench({ ...bench, key: k }); api.sfx.tick();
    /* Enter on the dial keeps the focus on it; at an end it goes to the other way, then to the stamp */
    focusNext(d > 0 ? (k >= 10 ? ["dial-down", "stamp"] : ["dial-up"]) : (k === null || k <= 1 ? ["dial-up", "stamp"] : ["dial-down"]));
  };
  const drag = useDrag((pay: any, p: any, moved: boolean) => {
    if (!playable || !pay) return;
    if (pay.k === "stamp" || pay.k === "half") {
      /* dropped off the pictograph: the stamp goes back to its place */
      if (moved && !(p.x >= 0 && p.x <= 820 && p.y >= 196 && p.y <= 420)) return;
      if (pay.k === "stamp") stampOne(); else stampHalf();
    } else if (pay.k === "lift") {
      /* slid along its row: it slides back to its place; lifted off the row: its marks go back to the tally */
      if (moved && p.y >= 250 && p.y <= 384 && p.x >= 0 && p.x <= 820) return;
      liftOne();
    }
  });

  /* ── phase 2: the title strip and the key box ── */
  const openBlank = (w: string) => {
    if (correcting) return;
    act();
    const t = { ...p2ref.current, open: p2ref.current.open === w ? null : w }; p2ref.current = t; setP2(t);
    /* opened with Enter: the focus goes to its first card */
    const list = w === "title" ? it.titles : it.keys;
    if (t.open && list && list.length) focusNext(["card-" + list[0][0]]);
  };
  const pick = (id: string) => {
    if (correcting) return;
    act();
    const s = p2ref.current;
    const t = s.open === "title" ? { ...s, title: id, open: null } : { ...s, keyc: id, open: null };
    p2ref.current = t; setP2(t); api.sfx.tick();
    /* picked with Enter: the focus goes to the blank still empty, else to the pad's Enter */
    focusNext(!t.keyc ? ["keybox"] : !t.title ? ["title-strip"] : ["key-enter"]);
  };
  /* Enter answers only work the child has made and not yet had judged: nothing placed sends nothing, and a bare
     Enter after a miss sends nothing. A title with no key is a real answer (the key left off). */
  const enterFinish = () => {
    const s = p2ref.current;
    if (!s.title && !s.keyc) return false;
    const v = (s.title || "none") + " " + (s.keyc || "none");
    if (judged.current === v) return false;
    judged.current = v;
    api.submit(v);
    return true;
  };

  /* ── phase 3: the turn ── */
  const baseUp = n === 3 && index === 0 && (stage === "teach" || stage === "demo") ? false : !!it.up;
  const curUp = demo && demo.up !== undefined ? demo.up : turned !== null ? turned : baseUp;
  /* the turn is inert while a correction is being drawn; the opening act ends only once the chart stands up
     (a second tap that lays it across again cancels the walk on) */
  const doTurn = () => {
    if (correcting) return;
    act();
    const next = !curUp;
    setTurned(next);
    api.sfx.tick();
    focusNext(["turn"]);
    if (stage === "demo") {
      if (next) tl.run([[fast ? 30 : 1100, null]], () => api.demoDone(phase.demoLines));
      else tl.stop();
    }
  };

  /* a bare Enter and the agent's check() in the opening act only ever stand the chart up (never lay it across) */
  const standUp = () => {
    if (curUp) {
      if (tl.busy) return false;
      api.demoDone(phase.demoLines);
      return true;
    }
    doTurn();
    return true;
  };

  /* ── phase 4: counting the faces from the bottom ── */
  const tapColumn = () => { if (correcting) return; act(); setLit((l: number) => (l >= (it.faces || 0) ? 0 : l + 1)); api.sfx.tick(); focusNext(["column"]); };

  /* the agent fills the two blanks as a child would; ids that are not on the cards are refused */
  HOOK.set = (v: any) => {
    if (it.kind !== "finish") return false;
    const [t, k] = String(v ?? "").trim().split(/\s+/);
    const okT = !t || t === "none" || (it.titles || []).some((x: any) => x[0] === t);
    const okK = !k || k === "none" || (it.keys || []).some((x: any) => x[0] === k);
    if (!okT || !okK) return false;
    const s = { title: t && t !== "none" ? t : null, keyc: k && k !== "none" ? k : null, open: null };
    p2ref.current = s; setP2(s); act();
    return true;
  };
  HOOK.demo = () => (curUp ? api.demoDone(phase.demoLines) : doTurn());
  /* the agent's check(): true only when it acted (stood the chart up, or answered placed cards not yet judged);
     false when there was nothing to do; undefined = press Enter (a typed answer) */
  HOOK.check = () => {
    if (stage === "demo" && n === 3) return standUp();
    if (stage === "ask" && it.pad === "enter" && !free) return correcting ? false : enterFinish();
    return undefined;
  };

  api.onEnter(stage === "ask" && it.pad === "enter" && !free ? enterFinish : stage === "demo" && n === 3 ? standUp : null);

  /* the brief's resume fields; the key's worth is `keyWorth`, since the dev driver's own `key` is the agent's answer */
  api.share({
    tally: n === 1 || free ? leftOf(bench) : null, symbol: sym, keyWorth: n === 1 || free ? bench.key : it.key ?? null,
    rows: n === 1 || free ? bench.stamps + (bench.half ? 0.5 : 0) : null,
    title: p2.title, keyText: p2.keyc, upright: n === 3 ? curUp : null, sideRuler: n === 4 ? lit : null,
    thumb: { sym: it.sym, key: it.key, unit: it.unit },
  });

  /* ── drawing helpers (called, never mounted) ── */
  const runsCard = (sy: string, num: string, label: string) => (
    <g data-zone="runs">
      <rect x={0} y={-94} width={330} height={76} rx={RAD.panel} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} />
      {pbGlyph(sy, 40, -56, 44)}
      <text x={80} y={-34} fontSize={T.xl} fontWeight={700} fill={C.ink}>{num}</text>
      <text x={200} y={-46} fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx(label)}</text>
    </g>
  );
  const keyCard = (sy: string, K: any, un: string, withDial: boolean) => (
    <g>
      <rect x={846} y={0} width={240} height={withDial ? 252 : 176} rx={RAD.panel} fill="#FFFFFF" stroke={C.ink} strokeWidth={2} />
      <text x={866} y={36} fontSize={T.micro} fontWeight={700} fill={C.ink}>{tx("Key")}</text>
      {pbGlyph(sy, 894, 88, 52)}
      <text x={930} y={100} fontSize={T.label} fontWeight={600} fill={C.ink}>=</text>
      <rect x={958} y={58} width={80} height={60} rx={10} fill="#FFFFFF" stroke={C.ink} strokeWidth={2} strokeDasharray={K ? undefined : "8 7"} />
      {K ? <text x={998} y={104} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={C.ink}>{K}</text> : null}
      <text x={866} y={152} fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx(un)}</text>
      {withDial && (
        <Key id="dial-down" label="Key one less" x={862} y={168} w={96} h={72} C={C} disabled={!playable || correcting || dialLocked || !bench.key || bench.key <= 1} onClick={() => dial(-1)}>
          <rect x={-16} y={-4} width={32} height={8} rx={3} fill={C.ink} />
        </Key>
      )}
      {withDial && (
        <Key id="dial-up" label="Key one more" x={974} y={168} w={96} h={72} C={C} disabled={!playable || correcting || dialLocked || bench.key >= 10} onClick={() => dial(1)}>
          <g><rect x={-16} y={-4} width={32} height={8} rx={3} fill={C.ink} /><rect x={-4} y={-16} width={8} height={32} rx={3} fill={C.ink} /></g>
        </Key>
      )}
    </g>
  );

  /* phase 1 and Free play */
  const bench1 = () => {
    const B = demo && demo.stamps !== undefined ? demo : bench;
    const used = count - leftOf(B);
    const nWhole = B.stamps, half = !!B.half;
    const sx = (j: number) => 220 + j * 54;
    const own = !demo;
    const lastJ = nWhole - 1 + (half ? 1 : 0);
    const dragAt = drag.drag && drag.drag.moved ? drag.drag : null;
    const liftDragging = dragAt && dragAt.payload && dragAt.payload.k === "lift";
    const syms: any[] = [];
    for (let j = 0; j < nWhole; j++) {
      const hide = own && liftDragging && !half && j === lastJ;
      if (!hide) syms.push(pbGlyph(sym, sx(j), 306, 48, "s" + j));
      if (!hide && B.key) syms.push(pbTiny(sx(j), 340, B.key, "t" + j));
    }
    if (half && !(own && liftDragging)) {
      syms.push(<g key="half" clipPath="url(#pbHalf)">{pbGlyph(sym, sx(nWhole), 306, 48)}</g>);
      syms.push(pbTiny(sx(nWhole) - 12, 340, B.key / 2, "th"));
    }
    const nextJ = nWhole + (half ? 1 : 0);
    const left = count - used;
    const cs = own && canStamp(bench) && playable;
    const ch = own && canHalf(bench) && playable;
    /* marks the key cannot take even in an empty row are left over; a full row is only full */
    const leftOver = !!B.key && left > 0 && left < B.key && !(B.key % 2 === 0 && left === B.key / 2 && !B.half);
    const rowFull = !!B.key && left > 0 && !leftOver && B.stamps + (B.half ? 1 : 0) >= PLACES;
    const showStampInvite = stage === "ask" && own && bench.key && cs && bench.stamps === 0;
    const showDialInvite = stage === "ask" && own && !bench.key && !free;
    const shakeX = shake ? 8 : 0;
    return (
      <g>
        {/* the tally */}
        <rect x={0} y={0} width={820} height={176} rx={RAD.panel} fill="#FFFFFF" stroke={C.ink} strokeWidth={2} />
        <text x={20} y={38} fontSize={T.micro} fontWeight={700} fill={C.ink}>{tx("Tally")}</text>
        <line x1={0} y1={54} x2={820} y2={54} stroke={C.ink} strokeWidth={1.5} />
        <line x1={176} y1={54} x2={176} y2={176} stroke={C.ink} strokeWidth={1.5} />
        <text x={20} y={128} fontSize={T.label} fontWeight={600} fill={C.ink}>{tx(free ? PB_ROWNAME[fp.sym] : it.row)}</text>
        {pbTally(206, 84, 64, count, used, "m")}
        {free && <Key id="tally-down" label="One mark less" x={660} y={70} w={72} h={72} C={C} disabled={dialLocked || fp.count <= 1} onClick={() => { act(); if (!dialLocked) setFp({ ...fp, count: Math.max(1, fp.count - 1) }); }}>
          <rect x={-14} y={-4} width={28} height={8} rx={3} fill={C.ink} />
        </Key>}
        {free && <Key id="tally-up" label="One mark more" x={744} y={70} w={72} h={72} C={C} disabled={dialLocked || fp.count >= 25} onClick={() => { act(); if (!dialLocked) setFp({ ...fp, count: Math.min(25, fp.count + 1) }); }}>
          <g><rect x={-14} y={-4} width={28} height={8} rx={3} fill={C.ink} /><rect x={-4} y={-14} width={8} height={28} rx={3} fill={C.ink} /></g>
        </Key>}

        {/* the pictograph row */}
        <rect x={0} y={196} width={820} height={224} rx={RAD.panel} fill="#FFFFFF" stroke={C.ink} strokeWidth={2} />
        <text x={20} y={234} fontSize={T.micro} fontWeight={700} fill={C.ink}>{tx("Pictograph")}</text>
        <line x1={0} y1={250} x2={820} y2={250} stroke={C.ink} strokeWidth={1.5} />
        <line x1={176} y1={250} x2={176} y2={420} stroke={C.ink} strokeWidth={1.5} />
        <text x={20} y={317} fontSize={T.label} fontWeight={600} fill={C.ink}>{tx(free ? PB_ROWNAME[fp.sym] : it.row)}</text>
        {syms}
        {(cs || ch) && nextJ < PLACES && <rect x={sx(nextJ) - 24} y={282} width={48} height={48} rx={8} fill="none" stroke={C.ink} strokeWidth={2} strokeDasharray="6 6" />}
        {demo && demo.tag && <g data-role="reading"><text x={196} y={400} fontSize={T.label} fontWeight={700} fill={PB_AMB_INK}>{`${nWhole} × ${B.key} = ${count}`}</text></g>}
        {leftOver && own && <text x={196} y={400} fontSize={T.micro} fontWeight={600} fill={PB_AMB_INK}>{`${left} ${tx("left over")}`}</text>}
        {rowFull && own && <text x={196} y={400} fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("The row is full")}</text>}
        {/* the last symbol: lift it off (its marks go back), or slide it and watch it slide back */}
        {own && playable && lastJ >= 0 && (
          <g {...control("lift", "Lift the last symbol off")} {...drag.bind({ k: "lift" })} {...drag.keys({ k: "lift" })}>
            <rect x={sx(lastJ) - 36} y={270} width={72} height={72} fill="transparent" />
          </g>
        )}

        {/* the key dial */}
        {keyCard(sym, (demo && demo.key) || bench.key, unit, true)}

        {/* the stamp and, when exactly half a key's worth is left, the half stamp */}
        <g {...control("stamp", "Stamp one symbol")} {...drag.bind({ k: "stamp" })} {...drag.keys({ k: "stamp" })}
          transform={`translate(${shakeX},0)`}>
          <rect x={866} y={270} width={100} height={132} fill="transparent" />
          <rect x={898} y={270} width={36} height={24} rx={10} fill={shade(C.rule, 0.15)} stroke={C.ink} strokeWidth={2} />
          <rect x={866} y={290} width={100} height={100} rx={RAD.key} fill={tint(C.panel, 0.4)} stroke={C.ink} strokeWidth={2} filter="url(#fShadowSoft)" />
          {pbGlyph(sym, 916, 340, 64)}
        </g>
        <text x={916} y={432} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("Stamp")}</text>
        {ch && (
          <g {...control("half-stamp", "Stamp half a symbol")} {...drag.bind({ k: "half" })} {...drag.keys({ k: "half" })}>
            <rect x={986} y={290} width={80} height={112} fill="transparent" />
            <rect x={986} y={300} width={80} height={80} rx={RAD.key} fill={tint(C.panel, 0.4)} stroke={C.ink} strokeWidth={2} filter="url(#fShadowSoft)" />
            <g clipPath="url(#pbHalf)">{pbGlyph(sym, 1026, 340, 50)}</g>
          </g>
        )}
        {ch && <text x={1026} y={432} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("Half")}</text>}

        {/* Free play: the tray of plain pictures */}
        {free && PB_TRAY.map((s2, j) => (
          <Key key={s2} id={"tray-" + s2} label={"Picture: " + s2} x={j * 104} y={438} w={88} h={84} C={C} primary={fp.sym === s2}
            onClick={() => { act(); setFp({ ...fp, sym: s2 }); api.sfx.tick(); }}>
            {pbGlyph(s2, 0, 0, 58)}
          </Key>
        ))}

        {/* a stamp or a symbol on its way under the finger */}
        {dragAt && !correcting && (
          <g pointerEvents="none" filter="url(#fLift)">
            {dragAt.payload && dragAt.payload.k === "half" ? <g clipPath="url(#pbHalf)">{pbGlyph(sym, dragAt.x, dragAt.y, 48)}</g> : pbGlyph(sym, dragAt.x, dragAt.y, 48)}
          </g>
        )}
        {showDialInvite && <Invite x={1022} y={204} r={50} C={C} />}
        {showStampInvite && <Invite x={916} y={336} r={62} C={C} />}
        {runsCard(sym, String(nWhole) + (half ? "½" : ""), "stamped")}
      </g>
    );
  };

  /* phase 2: a chart with its title strip and its key box */
  const chart2 = () => {
    const D: any = demo || {};
    const rows = it.rows || [];
    const K = it.key;
    const labelOf = (list: any[], id: any) => { const f = (list || []).find((x: any) => x[0] === id); return f ? f[1] : ""; };
    const titleText = it.kind === "finish" ? labelOf(it.titles, demo ? D.title : p2.title) : it.title;
    const keyText = it.kind === "finish" ? labelOf(it.keys, demo ? D.keyc : p2.keyc) : D.keyc ? `= ${K} ${it.unit}` : "";
    const rowTop = (r: number) => 100 + r * 100;
    const sx = (j: number) => 250 + j * 56;
    const tags = D.tags || 0;
    const live = it.kind === "finish" && (stage === "ask" || stage === "teach");
    const open = live && !demo ? p2.open : null;
    const opts = open === "title" ? it.titles : open === "key" ? it.keys : null;
    const invite = stage === "ask" && live && !demo && !open ? (!p2.title ? [270, 44] : !p2.keyc ? [670, 44] : null) : null;
    return (
      <g>
        {/* the title strip and the key box: outlined blanks until they are filled */}
        <rect x={20} y={8} width={500} height={72} rx={12} fill="#FFFFFF" stroke={open === "title" ? C.accent : C.ink} strokeWidth={open === "title" ? 4 : 2} strokeDasharray={titleText ? undefined : "10 8"} />
        {titleText && <text x={36} y={55} fontSize={T.label} fontWeight={700} fill={C.ink}>{tx(titleText)}</text>}
        <rect x={540} y={8} width={260} height={72} rx={12} fill="#FFFFFF" stroke={open === "key" ? C.accent : C.ink} strokeWidth={open === "key" ? 4 : 2} strokeDasharray={keyText ? undefined : "10 8"} />
        {keyText && pbGlyph(it.sym, 574, 44, 44)}
        {keyText && <text x={604} y={55} fontSize={T.label} fontWeight={600} fill={C.ink}>{tx(keyText)}</text>}

        {/* the rows */}
        <rect x={0} y={96} width={820} height={rows.length * 100} rx={12} fill="#FFFFFF" stroke={C.ink} strokeWidth={2} />
        {it.focus !== undefined && <rect x={206} y={rowTop(it.focus) + 4} width={610} height={88} fill={PB_SKY} />}
        {rows.map((r: any, i: number) => (
          <g key={"r" + i}>
            {i > 0 && <line x1={0} y1={rowTop(i) - 2} x2={820} y2={rowTop(i) - 2} stroke={C.ink} strokeWidth={1.5} />}
            <text x={20} y={rowTop(i) + 52} fontSize={T.label} fontWeight={600} fill={C.ink}>{tx(r[0])}</text>
            {Array.from({ length: r[1] }).map((_, j) => pbGlyph(it.sym, sx(j), rowTop(i) + 38, 44, "g" + j))}
            {i < tags && <text x={656} y={rowTop(i) + 52} fontSize={T.micro} fontWeight={700} fill={PB_AMB_INK}>{`${r[1] * K} ${tx(it.unit)}`}</text>}
          </g>
        ))}
        <line x1={204} y1={96} x2={204} y2={96 + rows.length * 100} stroke={C.ink} strokeWidth={1.5} />
        {/* a key's worth under each cloud of the row asked about, climbing */}
        {it.kind === "keyread" && D.lit > 0 && Array.from({ length: D.lit }).map((_, j) => (
          <text key={"n" + j} x={sx(j)} y={rowTop(it.focus) + 86} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={PB_AMB_INK}>{(j + 1) * K}</text>
        ))}
        {it.kind === "keyread" && D.tag && <text x={656} y={rowTop(it.focus) + 52} fontSize={T.micro} fontWeight={700} fill={PB_AMB_INK}>{`${rows[it.focus][1] * K} ${tx(it.unit)}`}</text>}

        {/* the blanks are tapped to fill them; the open blank's cards stand at the right, next in the Tab order */}
        {live && <Hit id="title-strip" x={20} y={8} w={500} h={72} label="Title strip" enabled={!correcting} onPress={() => openBlank("title")} />}
        {open === "title" && cards()}
        {live && <Hit id="keybox" x={540} y={8} w={260} h={72} label="Key box" enabled={!correcting} onPress={() => openBlank("key")} />}
        {open === "key" && cards()}
        {invite && <Invite x={invite[0]} y={invite[1]} r={42} C={C} />}
      </g>
    );
    function cards() {
      return opts && opts.map((o: any, k: number) => {
          const lines = open === "title" ? wrapText(tx(o[1]), 14) : [tx(o[1])];
          return (
            <Key key={o[0]} id={"card-" + o[0]} label={o[1]} x={846} y={8 + k * 112} w={240} h={100} C={C} onClick={() => pick(o[0])}>
              {open === "key" && pbGlyph(it.sym, -86, 0, 40)}
              {lines.map((ln: string, q: number) => (
                <text key={q} x={open === "key" ? -58 : 0} y={10 + (q - (lines.length - 1) / 2) * 32} textAnchor={open === "key" ? "start" : "middle"}
                  fontSize={T.micro} fontWeight={600} fill={C.ink}>{ln}</text>
              ))}
            </Key>
          );
        });
    }
  };

  /* phase 3: a pictograph across the page that turns to stand up it */
  const chart3 = () => {
    const D: any = demo || {};
    const cols = it.cols || [];
    const K = it.key;
    const up = curUp;
    /* the pictures are as large as the longest row or column allows */
    const most = Math.max(1, ...cols.map((c: any) => c[1]));
    const aP = Math.min(60, Math.floor(540 / most)), aS = aP - 10;
    const uP = Math.min(56, Math.floor(340 / most)), uS = Math.min(50, uP - 4);
    const colX = (c: number) => 260 + c * 150;
    const rowTop = (r: number) => 80 + r * 84;
    const upY = (j: number) => 466 - uP / 2 - j * uP;
    const pos = (r: number, j: number) => (up ? [colX(r), upY(j)] : [240 + j * aP, rowTop(r) + 42]);
    const litN = D.lit || 0;
    const topOf = (c: number) => upY(cols[c][1] - 1) - uS / 2;
    const ringR = uS / 2 + 5;
    const turnLive = playable && !free && !correcting;
    /* the one invite: the opening act, or a chart lying across when its question is about a column */
    const inviteTurn = stage === "demo" || (stage === "ask" && !up && !demo);
    /* the running count: the child counts by eye here, so it is drawn only while a correction (or the win) counts */
    const shownCount = it.kind === "columns" ? (D.col ? cols[D.col - 1][1] : 0) : litN;
    return (
      <g>
        <rect x={20} y={8} width={500} height={56} rx={12} fill="#FFFFFF" stroke={C.ink} strokeWidth={2} />
        <text x={36} y={47} fontSize={T.label} fontWeight={700} fill={C.ink}>{tx(it.title)}</text>
        <rect x={540} y={8} width={260} height={56} rx={12} fill="#FFFFFF" stroke={C.ink} strokeWidth={2} />
        {pbGlyph(it.sym, 568, 36, 38)}
        <text x={596} y={46} fontSize={T.micro} fontWeight={600} fill={C.ink}>{`= ${K} ${tx(it.unit)}`}</text>

        {/* the row or column the question asks about: a pale band behind its symbols */}
        {it.focus !== undefined && (up
          ? <rect x={colX(it.focus) - 46} y={96} width={92} height={372} fill={PB_SKY} />
          : <rect x={180} y={rowTop(it.focus) + 4} width={636} height={76} fill={PB_SKY} />)}
        {up
          ? <line x1={150} y1={470} x2={800} y2={470} stroke={C.ink} strokeWidth={3} />
          : <g>
              <rect x={0} y={76} width={820} height={cols.length * 84 + 4} rx={12} fill="none" stroke={C.ink} strokeWidth={2} />
              {cols.map((_: any, r: number) => r > 0 && <line key={"l" + r} x1={0} y1={rowTop(r) - 2} x2={820} y2={rowTop(r) - 2} stroke={C.ink} strokeWidth={1.5} />)}
              <line x1={176} y1={76} x2={176} y2={80 + cols.length * 84} stroke={C.ink} strokeWidth={1.5} />
            </g>}
        {cols.map((c: any, r: number) => (up
          ? <text key={"n" + r} x={colX(r)} y={504} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx(c[0])}</text>
          : <text key={"n" + r} x={20} y={rowTop(r) + 53} fontSize={T.label} fontWeight={600} fill={C.ink}>{tx(c[0])}</text>))}
        {/* every symbol keeps its place as the rows swing up into columns */}
        {cols.map((c: any, r: number) => Array.from({ length: c[1] }).map((_, j) => {
          const [x, y] = pos(r, j);
          return (
            <g key={"s" + r + "-" + j} style={{ transform: `translate(${x}px, ${y}px) scale(${up ? uS / aS : 1})`, transition: fast ? "none" : `transform 850ms cubic-bezier(.3,.7,.3,1) ${j * 35}ms` } as any}>
              {pbGlyph(it.sym, 0, 0, aS)}
            </g>
          );
        }))}
        {/* the correction: the column's symbols light from the bottom, a key's worth beside each (it never takes a press) */}
        <g pointerEvents="none">
        {(it.kind === "column" || it.kind === "same") && up && Array.from({ length: litN }).map((_, j) => (
          <g key={"lit" + j}>
            <circle cx={colX(it.focus)} cy={upY(j)} r={ringR} fill="none" stroke={PB_AMBER} strokeWidth={4} />
            {it.kind === "column" && <text x={colX(it.focus) + ringR + 8} y={upY(j) + 10} fontSize={T.micro} fontWeight={700} fill={PB_AMB_INK}>{K}</text>}
          </g>
        ))}
        {it.kind === "column" && up && D.tag && <g data-role="reading"><text x={colX(it.focus)} y={topOf(it.focus) - 14} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={PB_AMB_INK}>{`${cols[it.focus][1]} × ${K} = ${cols[it.focus][1] * K}`}</text></g>}
        {it.kind === "same" && up && D.tag && <text x={colX(it.focus)} y={topOf(it.focus) - 14} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{`${cols[it.focus][1]} ${tx("symbols")}`}</text>}
        {it.kind === "columns" && up && cols.map((c: any, r: number) => r < (D.col || 0) && (
          <g key={"t" + r}>
            {Array.from({ length: c[1] }).map((_, j) => <circle key={j} cx={colX(r)} cy={upY(j)} r={ringR} fill="none" stroke={PB_AMBER} strokeWidth={4} />)}
            <text x={colX(r)} y={topOf(r) - 14} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={PB_AMB_INK}>{c[1] * K}</text>
          </g>
        ))}
        </g>

        <Key id="turn" label={up ? "Lay it across the page" : "Stand it up the page"} x={891} y={196} w={150} h={110} C={C} disabled={!turnLive} onClick={doTurn}>
          <g>
            {/* hi / gu: the icon sits 7 higher, clear of the label's vowel marks and top stroke */}
            <g transform={lang === "en" ? undefined : "translate(0 -7)"}>
            <path d="M -9 1.6 A 18 18 0 1 1 18 -14" fill="none" stroke={turnLive ? C.ink : mix(C.ink, C.panel, 0.5)} strokeWidth={5} strokeLinecap="round" />
            <path d="M 10 -21 L 18 -12 L 26 -21" fill="none" stroke={turnLive ? C.ink : mix(C.ink, C.panel, 0.5)} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />
            </g>
            <text x={0} y={40} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={turnLive ? C.ink : mix(C.ink, C.panel, 0.5)}>{tx("Turn")}</text>
          </g>
        </Key>
        {inviteTurn && <Invite x={966} y={251} r={98} C={C} />}
        {demo && runsCard(it.sym, String(shownCount), "counted")}
      </g>
    );
  };

  /* phase 4: one column, a side numbered one per face, and the side ruler */
  const col4 = () => {
    const D: any = demo || {};
    const F = it.faces || 0, K = it.key, cx = 500, base = 490;
    /* the faces are as large as the column's height allows */
    const pP = Math.min(56, Math.floor(392 / Math.max(F, 1))), pS = Math.min(48, pP - 4);
    const fy = (k: number) => base - 6 - pP / 2 - (k - 1) * pP;
    const topEdge = fy(F) - pS / 2;
    const mid = (base + topEdge) / 2;
    const ringR = pS / 2 + 5;
    const shownLit = demo ? D.ruler || 0 : lit;
    const ruled = D.ruler || 0;
    const tapLive = stage === "ask" || stage === "teach";
    /* the heading reads as one phrase in Hindi and Gujarati ("बच्चों की संख्या"): translated whole, broken at its last space */
    const hd = it.kind !== "side" ? ["", ""] : lang === "en" ? it.heading : (() => {
      const s = tx(it.heading.join(" ")), k = s.lastIndexOf(" ");
      return k > 0 ? [s.slice(0, k), s.slice(k + 1)] : [s, ""];
    })();
    return (
      <g>
        {keyCard(it.sym, K, it.unit, false)}
        {/* the side numbered one per face, with its heading beside it, as the chart drew it */}
        {it.kind === "side" && (
          <g>
            <text x={360} y={mid - 8} textAnchor="end" fontSize={T.micro} fontWeight={700} fill={C.ink}>{hd[0]}</text>
            <text x={360} y={mid + 26} textAnchor="end" fontSize={T.micro} fontWeight={700} fill={C.ink}>{hd[1]}</text>
            <line x1={420} y1={base} x2={420} y2={topEdge - 6} stroke={C.ink} strokeWidth={2.5} />
            {Array.from({ length: F }).map((_, k) => (
              <g key={"ns" + k}>
                <line x1={412} y1={fy(k + 1)} x2={428} y2={fy(k + 1)} stroke={C.ink} strokeWidth={2} />
                <text x={404} y={fy(k + 1) + 10} textAnchor="end" fontSize={T.micro} fontWeight={600} fill={C.ink}>{k + 1}</text>
              </g>
            ))}
          </g>
        )}
        <line x1={440} y1={base} x2={560} y2={base} stroke={C.ink} strokeWidth={3} />
        {Array.from({ length: F }).map((_, k) => (
          <g key={"f" + k}>
            {pbGlyph(it.sym, cx, fy(k + 1), pS)}
            {k < shownLit && <circle cx={cx} cy={fy(k + 1)} r={ringR} fill="none" stroke={PB_AMBER} strokeWidth={4} />}
          </g>
        ))}
        {/* the side ruler: blank beside the column until it is read in the data's own units */}
        <line x1={580} y1={base} x2={580} y2={topEdge - 6} stroke={C.ink} strokeWidth={2.5} />
        {Array.from({ length: F }).map((_, k) => <line key={"rt" + k} x1={572} y1={fy(k + 1)} x2={588} y2={fy(k + 1)} stroke={C.ink} strokeWidth={2} />)}
        {ruled > 0 && <text x={580} y={topEdge - 20} fontSize={T.micro} fontWeight={700} fill={PB_AMB_INK}>{tx(it.unit)}</text>}
        {Array.from({ length: ruled }).map((_, k) => (
          <text key={"rn" + k} x={598} y={fy(k + 1) + 11} fontSize={T.label} fontWeight={700} fill={PB_AMB_INK}>{(k + 1) * K}</text>
        ))}
        {tapLive && <Hit id="column" x={cx - 44} y={topEdge - 4} w={88} h={base - topEdge + 4} label="Count the next face up" enabled={!correcting} onPress={tapColumn} />}
        {stage === "ask" && !demo && lit === 0 && <Invite x={cx} y={fy(1)} r={pS / 2 + 14} C={C} />}
        {runsCard(it.sym, String(shownLit), "counted")}
      </g>
    );
  };

  return (
    <g onKeyDownCapture={onKeyCapture}>
      <defs>
        <clipPath id="pbHalf" clipPathUnits="objectBoundingBox"><rect x={0} y={0} width={0.5} height={1} /></clipPath>
      </defs>
      {free || n === 1 ? bench1() : n === 2 ? chart2() : n === 3 ? chart3() : col4()}
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase:
   result.last = { value, answer, kind, item, shared } (shared = what api.share held at that moment) */
function Thumb({ result, C, w, h, lang = "en", tx = (v: any) => v }: any) {
  const L = result && result.last;
  if (!L) return null;
  const sh = (L.shared && L.shared.thumb) || {};
  const sy = sh.sym || "face";
  const a = L.answer;
  /* a stamped row is drawn symbol for symbol; every other answer is one symbol and its reading */
  const icons = L.kind === "stamp" && typeof a === "number" ? Math.min(a, 12) : 1;
  const s = icons > 1 ? Math.max(12, Math.min(30, (w - 64) / icons - 2)) : Math.max(20, Math.min(34, h - 24));
  const withUnit = L.kind === "keyread" || L.kind === "column" || L.kind === "side";
  const text = L.kind === "finish" ? `= ${sh.key} ${tx(sh.unit)}` : L.kind === "missing" ? tx(PB_SHOW[String(a)] || "")
    : Array.isArray(a) ? a.join("  ") : withUnit ? `${a} ${tx(sh.unit)}` : String(a);
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      {Array.from({ length: icons }).map((_, j) => pbGlyph(sy, 10 + s / 2 + j * (s + 2), h / 2, s, "i" + j))}
      <text x={w - 14} y={h / 2 + 10} textAnchor="end" fontSize={T.micro} fontWeight={700} fill={C.ink}>{text}</text>
    </g>
  );
}

function PictographBuilder(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, format: pbFormat, fitHost: () => null }} />
  );
}

export default PictographBuilder;
