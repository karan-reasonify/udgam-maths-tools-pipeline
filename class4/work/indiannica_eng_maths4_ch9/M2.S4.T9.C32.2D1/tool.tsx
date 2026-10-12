/* ═══ M2.S4.T9.C32.2D1 · angle_and_grid_finder · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists: header + its three controls, canvas, slot + pad, bubble + mascot,
   phase dots (user / AI mode), window.toolApi, sounds, the synced voice, scoring, the events,
   idle and restart. NO imports in this file; only the five host hooks. Follow docs/LAYOUT.md.
   Edit, never rewrite. Built by `node cli.mjs scaffold`; concepts are verbatim (check compares them). */

const TOOL_ID = "angle_and_grid_finder";
const MEDIA_ID = "M2.S4.T9.C32.2D1";
const TOOL_NAME = "Angle and Grid Finder";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
const VOICE = {"rate":0.92,"pitch":1.06};

/* spoken before phase 1's teach lines only (the plan's opening voice line) */
const OPENING = ["Two arms from one point, a clock and a grid. Where do the two arms meet?"];
/* the whole-tool line: spoken on the summary page */
const FINISH_LINE = "Every angle named from its vertex, every clock read the short way round, and every move told by row and column.";
/* said when the child opens Free play from the summary page (the plan's free-play voice line) */
const FREE_LINE = "Free play. Open any angle, lay the square corner in, and walk the grid.";

/* Hindi and Gujarati, keyed by the English line exactly (PATTERNS §11: `lineFor(line, lang, TR)`); the English
   above and below stays what the checks read. NCERT class 4 geometry terms: बिंदु किरण कोण शीर्ष भुजा समकोण
   न्यूनकोण अधिक कोण / બિંદુ કિરણ ખૂણો શિરોબિંદુ ભુજા કાટખૂણો લઘુકોણ ગુરુકોણ; पंक्ति स्तंभ / હરોળ સ્તંભ for
   row and column. Digits stay digits (the runtime speaks them). A first draft; wants a native speaker's read. */
const TR: any = {
  hi: {
    "Angle and Grid Finder": "कोण और ग्रिड खोजो",
    "Two arms from one point, a clock and a grid. Where do the two arms meet?": "एक बिंदु से दो भुजाएँ, एक घड़ी और एक ग्रिड। दोनों भुजाएँ कहाँ मिलती हैं?",
    "Every angle named from its vertex, every clock read the short way round, and every move told by row and column.": "तुमने हर कोण का नाम उसके शीर्ष से बताया। हर घड़ी छोटे रास्ते से पढ़ी और हर चाल पंक्ति और स्तंभ से बताई।",
    "Free play. Open any angle, lay the square corner in, and walk the grid.": "मुक्त खेल। कोई भी कोण खोलो, वर्ग का कोना रखो और ग्रिड पर चलो।",
    /* phase 1 */
    "Two arms and a vertex": "दो भुजाएँ और एक शीर्ष",
    "Tap the letter where the arms meet. Put it in the middle of the name.": "जहाँ भुजाएँ मिलती हैं, वह अक्षर टैप करो। उसे नाम के बीच में रखो।",
    "Where does that letter go in the name?": "वह अक्षर नाम में कहाँ जाता है?",
    "Look at the three letters and build the name one letter at a time.": "तीनों अक्षर देखो और नाम एक-एक अक्षर करके बनाओ।",
    "An angle is two arms from one vertex, the corner where they meet, and it is named with the vertex in the middle or by the vertex alone.": "कोण एक शीर्ष से निकली दो भुजाओं से बनता है। जहाँ वे मिलती हैं, वह बिंदु शीर्ष है। नाम में शीर्ष बीच में आता है, या सिर्फ़ शीर्ष से नाम बताते हैं।",
    "You learned: the vertex letter sits in the middle of an angle's name": "तुमने सीखा: शीर्ष का अक्षर कोण के नाम के बीच में आता है",
    "Name this angle": "कोण का नाम",
    "Rays BA and BC start from point B. Tap the three letters to name the angle.": "किरणें BA और BC बिंदु B से शुरू होती हैं। तीनों अक्षर टैप करके कोण का नाम बनाओ।",
    "Which point do both arms start from?": "दोनों भुजाएँ किस बिंदु से शुरू होती हैं?",
    "Tap the vertex": "शीर्ष टैप करो",
    "This angle is named angle DEF. Which letter is its vertex?": "इस कोण का नाम कोण DEF है। इसका शीर्ष कौन सा अक्षर है?",
    "One point has both arms running out of it.": "एक बिंदु से दोनों भुजाएँ निकल रही हैं।",
    "Rays OS and OT start from point O. Name this angle the same way.": "किरणें OS और OT बिंदु O से शुरू होती हैं। इस कोण का नाम उसी तरह बताओ।",
    "Follow each ray back to the point they share.": "हर किरण को पीछे उस बिंदु तक देखो जहाँ दोनों मिलती हैं।",
    /* phase 2 */
    "Right, acute and obtuse": "समकोण, न्यूनकोण और अधिक कोण",
    "Lay the square corner in. Does it fit, cover an arm, or leave a space?": "वर्ग का कोना अंदर रखो। वह ठीक बैठता है, एक भुजा को ढकता है, या जगह छोड़ता है?",
    "Is the angle smaller or larger than the square corner?": "क्या कोण वर्ग के कोने से छोटा है या बड़ा?",
    "Set the arms to a square corner first, then open them a little at a time.": "पहले भुजाओं को वर्ग के कोने जैसा करो, फिर थोड़ा-थोड़ा खोलो।",
    "A right angle is a square corner; an angle smaller than it is acute, and one larger than it is obtuse.": "समकोण वर्ग के कोने जैसा होता है। उससे छोटा कोण न्यूनकोण और उससे बड़ा कोण अधिक कोण कहलाता है।",
    "You learned: a square corner sorts an angle into right, acute or obtuse": "तुमने सीखा: वर्ग के कोने से कोण का प्रकार पता चलता है",
    "What kind?": "कौन सा कोण?",
    "These two arms stand open. Lay the card into this angle and name its kind.": "ये दो भुजाएँ खुली हैं। कार्ड को इस कोण में रखो और इसका प्रकार बताओ।",
    "What does the square corner do when it is laid in?": "वर्ग का कोना अंदर रखने पर क्या होता है?",
    "These are the open blades of a pair of scissors. Sort the angle they make.": "ये कैंची के खुले हुए ब्लेड हैं। इनसे बने कोण का प्रकार बताओ।",
    "Does the second arm fall inside the card or outside it?": "दूसरी भुजा कार्ड के अंदर आती है या बाहर?",
    "This angle is made by the two covers of an open book. Sort it the same way.": "यह कोण खुली किताब के दो कवरों से बना है। इसका प्रकार भी बताओ।",
    "Does the card cover the whole angle, or is some left over?": "क्या कार्ड पूरे कोण को ढकता है, या कुछ बच जाता है?",
    "right angle": "समकोण", "acute": "न्यूनकोण", "obtuse": "अधिक कोण",
    /* phase 3 */
    "The angle between clock hands": "घड़ी की सुइयों के बीच का कोण",
    "The hands make two angles. Which is the smaller one? What kind is it?": "सुइयाँ दो कोण बनाती हैं। छोटा कोण कौन सा है? वह किस प्रकार का है?",
    "How many hours make a square corner?": "कितने घंटे मिलकर वर्ग का कोना बनाते हैं?",
    "Set the clock to three o'clock first and lay the card in.": "पहले घड़ी में तीन बजे करो और कार्ड रखो।",
    "Clock hands make two angles, and the one to name is the smaller: one or two hours apart is acute, three is a right angle, and four or five is obtuse.": "घड़ी की सुइयाँ दो कोण बनाती हैं, नाम छोटे कोण का लेते हैं। एक या दो घंटे दूर हों तो न्यूनकोण, तीन घंटे हों तो समकोण। चार या पाँच घंटे हों तो अधिक कोण।",
    "You learned: clock hands make two angles and the smaller one is named": "तुमने सीखा: घड़ी की सुइयाँ दो कोण बनाती हैं, छोटे का नाम लेते हैं",
    "At ten o'clock, what kind of angle do the hands make?": "दस बजे सुइयाँ किस प्रकार का कोण बनाती हैं?",
    "How many hours apart are the hands the short way round?": "छोटे रास्ते से सुइयाँ कितने घंटे दूर हैं?",
    "The hands now stand at four o'clock. Sort the smaller angle.": "अब सुइयाँ चार बजे पर हैं। छोटे कोण का प्रकार बताओ।",
    "Walk the marker from one hand to the other and count the gaps.": "निशान को एक सुई से दूसरी सुई तक चलाओ और फासले गिनो।",
    "The clock says nine o'clock now. Name the kind of angle the hands make.": "अब घड़ी में नौ बजे हैं। सुइयाँ किस प्रकार का कोण बनाती हैं, बताओ।",
    "Count the gaps the short way, not the numbers.": "छोटे रास्ते से फासले गिनो, संख्याएँ नहीं।",
    /* phase 4 */
    "Rows across, columns down": "पंक्तियाँ आड़ी, स्तंभ खड़े",
    "Move down. Which number changed, the row or the column?": "नीचे चलो। कौन सी संख्या बदली, पंक्ति या स्तंभ?",
    "Does this move go down or across?": "यह चाल नीचे जाती है या बगल में?",
    "Walk the marker one step at a time and watch the numbers at the edges.": "निशान को एक-एक कदम चलाओ और किनारों की संख्याएँ देखो।",
    "A place on a grid is given by its row and its column. Rows run across and columns run down, so moving down changes the row and keeps the column.": "ग्रिड में किसी जगह को उसकी पंक्ति और स्तंभ से बताते हैं। पंक्तियाँ आड़ी और स्तंभ खड़े होते हैं। इसलिए नीचे चलने पर पंक्ति बदलती है, स्तंभ वही रहता है।",
    "You learned: a place on a grid is its row and its column": "तुमने सीखा: ग्रिड में जगह उसकी पंक्ति और स्तंभ से बताते हैं",
    "Where does it stop?": "कहाँ रुकेगा?",
    "The marker starts in row one, column one. Move it two columns across, then three rows down.": "निशान पंक्ति एक, स्तंभ एक से शुरू होता है। उसे दो स्तंभ बगल में, फिर तीन पंक्ति नीचे चलाओ।",
    "Which end is row one counted from on this grid?": "इस ग्रिड में पंक्ति एक किस ओर से गिनी जाती है?",
    "Which picture?": "कौन सा चित्र?",
    "The marker sits on the kite. Move it two rows down and name the picture you reach.": "निशान पतंग पर है। उसे दो पंक्ति नीचे चलाओ और जिस चित्र पर पहुँचो, उसका नाम बताओ।",
    "Does the column change when the marker goes down?": "निशान नीचे जाता है तो क्या स्तंभ बदलता है?",
    "Which words fit?": "कौन से शब्द?",
    "A child says the leaf lies two columns below the drum. Say that the right way.": "एक बच्चा कहता है कि पत्ता ढोल से दो स्तंभ नीचे है। इसे सही तरह से कहो।",
    "Walk the marker from the drum down to the leaf.": "निशान को ढोल से नीचे पत्ते तक चलाओ।",
    "row": "पंक्ति", "column": "स्तंभ",
    "fish": "मछली", "cup": "कप", "leaf": "पत्ता", "lamp": "लैंप",
    "rows below": "पंक्ति नीचे", "columns below": "स्तंभ नीचे", "rows across": "पंक्ति बगल में", "columns across": "स्तंभ बगल में",
    /* the working area's own words */
    "hour apart": "घंटे का अंतर", "hours apart": "घंटे का अंतर", "row and column": "पंक्ति और स्तंभ", "two rows below": "दो पंक्ति नीचे",
    "Names built": "बनाए नाम", "Angles sorted": "पहचाने कोण", "Clocks read": "पढ़ी घड़ियाँ", "Moves made": "चली चालें", "Free play": "मुक्त खेल",
  },
  gu: {
    "Angle and Grid Finder": "ખૂણો અને જાળી શોધો",
    "Two arms from one point, a clock and a grid. Where do the two arms meet?": "એક બિંદુથી બે ભુજા, એક ઘડિયાળ અને એક જાળી. બંને ભુજા ક્યાં મળે છે?",
    "Every angle named from its vertex, every clock read the short way round, and every move told by row and column.": "તમે દરેક ખૂણાનું નામ તેના શિરોબિંદુથી આપ્યું. દરેક ઘડિયાળ ટૂંકા રસ્તે વાંચી અને દરેક ચાલ હરોળ અને સ્તંભથી કહી.",
    "Free play. Open any angle, lay the square corner in, and walk the grid.": "મુક્ત રમત. કોઈ પણ ખૂણો ખોલો, ચોરસનો ખૂણો મૂકો અને જાળી પર ચાલો.",
    /* phase 1 */
    "Two arms and a vertex": "બે ભુજા અને એક શિરોબિંદુ",
    "Tap the letter where the arms meet. Put it in the middle of the name.": "જ્યાં ભુજા મળે છે તે અક્ષર ટૅપ કરો. તેને નામની વચ્ચે મૂકો.",
    "Where does that letter go in the name?": "તે અક્ષર નામમાં ક્યાં જાય છે?",
    "Look at the three letters and build the name one letter at a time.": "ત્રણેય અક્ષર જુઓ અને નામ એક-એક અક્ષરથી બનાવો.",
    "An angle is two arms from one vertex, the corner where they meet, and it is named with the vertex in the middle or by the vertex alone.": "ખૂણો એક શિરોબિંદુથી નીકળતી બે ભુજાથી બને છે. જ્યાં તે મળે છે તે બિંદુ શિરોબિંદુ છે. નામમાં શિરોબિંદુ વચ્ચે આવે છે, અથવા ફક્ત શિરોબિંદુથી નામ અપાય છે.",
    "You learned: the vertex letter sits in the middle of an angle's name": "તમે શીખ્યા: શિરોબિંદુનો અક્ષર ખૂણાના નામની વચ્ચે આવે છે",
    "Name this angle": "ખૂણાનું નામ",
    "Rays BA and BC start from point B. Tap the three letters to name the angle.": "કિરણ BA અને BC બિંદુ B થી શરૂ થાય છે. ત્રણેય અક્ષર ટૅપ કરીને ખૂણાનું નામ બનાવો.",
    "Which point do both arms start from?": "બંને ભુજા કયા બિંદુથી શરૂ થાય છે?",
    "Tap the vertex": "શિરોબિંદુ ટૅપ કરો",
    "This angle is named angle DEF. Which letter is its vertex?": "આ ખૂણાનું નામ ખૂણો DEF છે. તેનું શિરોબિંદુ કયો અક્ષર છે?",
    "One point has both arms running out of it.": "એક બિંદુમાંથી બંને ભુજા નીકળે છે.",
    "Rays OS and OT start from point O. Name this angle the same way.": "કિરણ OS અને OT બિંદુ O થી શરૂ થાય છે. આ ખૂણાનું નામ એ જ રીતે આપો.",
    "Follow each ray back to the point they share.": "દરેક કિરણને પાછળ એ બિંદુ સુધી જુઓ જ્યાં બંને મળે છે.",
    /* phase 2 */
    "Right, acute and obtuse": "કાટખૂણો, લઘુકોણ અને ગુરુકોણ",
    "Lay the square corner in. Does it fit, cover an arm, or leave a space?": "ચોરસનો ખૂણો અંદર મૂકો. તે બરાબર બેસે છે, એક ભુજાને ઢાંકે છે, કે જગ્યા છોડે છે?",
    "Is the angle smaller or larger than the square corner?": "શું ખૂણો ચોરસના ખૂણાથી નાનો છે કે મોટો?",
    "Set the arms to a square corner first, then open them a little at a time.": "પહેલાં ભુજાને ચોરસના ખૂણા જેવી કરો, પછી થોડી-થોડી ખોલો.",
    "A right angle is a square corner; an angle smaller than it is acute, and one larger than it is obtuse.": "કાટખૂણો ચોરસના ખૂણા જેવો હોય છે. તેનાથી નાનો ખૂણો લઘુકોણ અને મોટો ખૂણો ગુરુકોણ કહેવાય છે.",
    "You learned: a square corner sorts an angle into right, acute or obtuse": "તમે શીખ્યા: ચોરસના ખૂણાથી ખૂણાનો પ્રકાર ખબર પડે છે",
    "What kind?": "કયો ખૂણો?",
    "These two arms stand open. Lay the card into this angle and name its kind.": "આ બે ભુજા ખુલ્લી છે. કાર્ડને આ ખૂણામાં મૂકો અને તેનો પ્રકાર કહો.",
    "What does the square corner do when it is laid in?": "ચોરસનો ખૂણો અંદર મૂકતાં શું થાય છે?",
    "These are the open blades of a pair of scissors. Sort the angle they make.": "આ કાતરનાં ખુલ્લાં પાનાં છે. તેનાથી બનતા ખૂણાનો પ્રકાર કહો.",
    "Does the second arm fall inside the card or outside it?": "બીજી ભુજા કાર્ડની અંદર આવે છે કે બહાર?",
    "This angle is made by the two covers of an open book. Sort it the same way.": "આ ખૂણો ખુલ્લા પુસ્તકનાં બે પૂંઠાંથી બન્યો છે. તેનો પ્રકાર પણ કહો.",
    "Does the card cover the whole angle, or is some left over?": "શું કાર્ડ આખા ખૂણાને ઢાંકે છે, કે થોડો બચે છે?",
    "right angle": "કાટખૂણો", "acute": "લઘુકોણ", "obtuse": "ગુરુકોણ",
    /* phase 3 */
    "The angle between clock hands": "ઘડિયાળના કાંટા વચ્ચેનો ખૂણો",
    "The hands make two angles. Which is the smaller one? What kind is it?": "કાંટા બે ખૂણા બનાવે છે. નાનો ખૂણો કયો છે? તે કયા પ્રકારનો છે?",
    "How many hours make a square corner?": "કેટલા કલાકથી ચોરસનો ખૂણો બને છે?",
    "Set the clock to three o'clock first and lay the card in.": "પહેલાં ઘડિયાળમાં ત્રણ વાગ્યા કરો અને કાર્ડ મૂકો.",
    "Clock hands make two angles, and the one to name is the smaller: one or two hours apart is acute, three is a right angle, and four or five is obtuse.": "ઘડિયાળના કાંટા બે ખૂણા બનાવે છે, નામ નાના ખૂણાનું લઈએ છીએ. એક કે બે કલાક દૂર હોય તો લઘુકોણ, ત્રણ કલાક હોય તો કાટખૂણો. ચાર કે પાંચ કલાક હોય તો ગુરુકોણ.",
    "You learned: clock hands make two angles and the smaller one is named": "તમે શીખ્યા: ઘડિયાળના કાંટા બે ખૂણા બનાવે છે, નાનાનું નામ લેવાય",
    "At ten o'clock, what kind of angle do the hands make?": "દસ વાગ્યે કાંટા કયા પ્રકારનો ખૂણો બનાવે છે?",
    "How many hours apart are the hands the short way round?": "ટૂંકા રસ્તે કાંટા કેટલા કલાક દૂર છે?",
    "The hands now stand at four o'clock. Sort the smaller angle.": "હવે કાંટા ચાર વાગ્યા પર છે. નાના ખૂણાનો પ્રકાર કહો.",
    "Walk the marker from one hand to the other and count the gaps.": "નિશાનને એક કાંટાથી બીજા કાંટા સુધી ચલાવો અને અંતર ગણો.",
    "The clock says nine o'clock now. Name the kind of angle the hands make.": "હવે ઘડિયાળમાં નવ વાગ્યા છે. કાંટા કયા પ્રકારનો ખૂણો બનાવે છે તે કહો.",
    "Count the gaps the short way, not the numbers.": "ટૂંકા રસ્તે અંતર ગણો, સંખ્યાઓ નહીં.",
    /* phase 4 */
    "Rows across, columns down": "હરોળ આડી, સ્તંભ ઊભા",
    "Move down. Which number changed, the row or the column?": "નીચે ચાલો. કઈ સંખ્યા બદલાઈ, હરોળ કે સ્તંભ?",
    "Does this move go down or across?": "આ ચાલ નીચે જાય છે કે બાજુમાં?",
    "Walk the marker one step at a time and watch the numbers at the edges.": "નિશાનને એક-એક પગલું ચલાવો અને કિનારાની સંખ્યાઓ જુઓ.",
    "A place on a grid is given by its row and its column. Rows run across and columns run down, so moving down changes the row and keeps the column.": "જાળીમાં કોઈ જગ્યા તેની હરોળ અને સ્તંભથી કહેવાય છે. હરોળ આડી અને સ્તંભ ઊભા હોય છે. તેથી નીચે જતાં હરોળ બદલાય છે અને સ્તંભ એ જ રહે છે.",
    "You learned: a place on a grid is its row and its column": "તમે શીખ્યા: જાળીમાં જગ્યા હરોળ અને સ્તંભથી કહેવાય છે",
    "Where does it stop?": "ક્યાં અટકશે?",
    "The marker starts in row one, column one. Move it two columns across, then three rows down.": "નિશાન હરોળ એક, સ્તંભ એકથી શરૂ થાય છે. તેને બે સ્તંભ બાજુમાં, પછી ત્રણ હરોળ નીચે ચલાવો.",
    "Which end is row one counted from on this grid?": "આ જાળીમાં હરોળ એક કઈ બાજુથી ગણાય છે?",
    "Which picture?": "કયું ચિત્ર?",
    "The marker sits on the kite. Move it two rows down and name the picture you reach.": "નિશાન પતંગ પર છે. તેને બે હરોળ નીચે ચલાવો અને જે ચિત્ર પર પહોંચો તેનું નામ કહો.",
    "Does the column change when the marker goes down?": "નિશાન નીચે જાય ત્યારે શું સ્તંભ બદલાય છે?",
    "Which words fit?": "કયા શબ્દો?",
    "A child says the leaf lies two columns below the drum. Say that the right way.": "એક બાળક કહે છે કે પાંદડું ઢોલથી બે સ્તંભ નીચે છે. તેને સાચી રીતે કહો.",
    "Walk the marker from the drum down to the leaf.": "નિશાનને ઢોલથી નીચે પાંદડા સુધી ચલાવો.",
    "row": "હરોળ", "column": "સ્તંભ",
    "fish": "માછલી", "cup": "કપ", "leaf": "પાંદડું", "lamp": "લેમ્પ",
    "rows below": "હરોળ નીચે", "columns below": "સ્તંભ નીચે", "rows across": "હરોળ બાજુમાં", "columns across": "સ્તંભ બાજુમાં",
    /* the working area's own words */
    "hour apart": "કલાકનું અંતર", "hours apart": "કલાકનું અંતર", "row and column": "હરોળ અને સ્તંભ", "two rows below": "બે હરોળ નીચે",
    "Names built": "બનાવેલાં નામ", "Angles sorted": "ઓળખેલા ખૂણા", "Clocks read": "વાંચેલી ઘડિયાળ", "Moves made": "કરેલી ચાલ", "Free play": "મુક્ત રમત",
  },
};

/* One entry per phase = one mount. says = the teach run · ladder = rungs 2 and 3 (rung 1 is the
   item's own miss) · closing = said once when the phase goes idle · learned = the summary row
   (at most 72 characters) · traceback = what the working area redraws after a miss (for the sidecar)
   · items = three a phase, each with the plan's qid. */
const PHASES = [
  {
    n: 1,
    concept: "Two arms and a vertex",
    conceptId: "M2.S4.T9.C32", objectiveIds: ["O15"],
    says: ["Tap the letter where the arms meet. Put it in the middle of the name."],
    ladder: ["Where does that letter go in the name?", "Look at the three letters and build the name one letter at a time."],
    closing: "An angle is two arms from one vertex, the corner where they meet, and it is named with the vertex in the middle or by the vertex alone.",
    learned: "You learned: the vertex letter sits in the middle of an angle's name",
    traceback: "The arms are traced from the point they share, the vertex takes its dot, and the whole name is written with the vertex letter in the middle.",
    items: [
      /* learn ML1: answer in the plan = Angle ABC, which is also angle CBA or angle B. Its arms are rays BA and BC, and its vertex is B */
      { qid: "M2.S4.T9.C32:ML1", kind: "name", letters: ["A", "B", "C"], open: [-52, 8], pad: "enter", answer: "ABC", near: "BAC", winMs: 2600,
        ask: "Name this angle", say: "Rays BA and BC start from point B. Tap the three letters to name the angle.",
        miss: "Which point do both arms start from?" },
      /* practice 1: answer in the plan = E is the vertex, and the arms are rays ED and EF */
      { qid: "M2.S4.T9.C32:1", kind: "vertex", letters: ["D", "E", "F"], open: [-40, 22], pad: "enter", answer: "E", near: "D", winMs: 2400,
        ask: "Tap the vertex", say: "This angle is named angle DEF. Which letter is its vertex?",
        miss: "One point has both arms running out of it." },
      /* practice 2: answer in the plan = Angle SOT, angle TOS and angle O */
      { qid: "M2.S4.T9.C32:2", kind: "name", letters: ["S", "O", "T"], open: [-62, 6], pad: "enter", answer: "SOT", near: "OST", winMs: 2600,
        ask: "Name this angle", say: "Rays OS and OT start from point O. Name this angle the same way.",
        miss: "Follow each ray back to the point they share." },
    ],
  },
  {
    n: 2,
    concept: "Right, acute and obtuse",
    conceptId: "M2.S4.T9.C33", objectiveIds: ["O15"],
    says: ["Lay the square corner in. Does it fit, cover an arm, or leave a space?"],
    ladder: ["Is the angle smaller or larger than the square corner?", "Set the arms to a square corner first, then open them a little at a time."],
    closing: "A right angle is a square corner; an angle smaller than it is acute, and one larger than it is obtuse.",
    learned: "You learned: a square corner sorts an angle into right, acute or obtuse",
    traceback: "The square-corner card is laid into the angle, the space or the overlap is lit, and the kind of angle is written beside it.",
    items: [
      /* learn ML2: answer in the plan = The first is a right angle, and the second is acute */
      { qid: "M2.S4.T9.C33:ML2", kind: "sort", deg: 90, answer: "right angle", near: "acute", winMs: 3000,
        ask: "What kind?", say: "These two arms stand open. Lay the card into this angle and name its kind.",
        miss: "What does the square corner do when it is laid in?",
        choices: [{ id: "right angle", label: "right angle" }, { id: "acute", label: "acute" }, { id: "obtuse", label: "obtuse" }] },
      /* practice 3: answer in the plan = Acute, because it is smaller than a right angle */
      { qid: "M2.S4.T9.C33:3", kind: "sort", deg: 42, answer: "acute", near: "obtuse", winMs: 3400, stretch: true,
        ask: "What kind?", say: "These are the open blades of a pair of scissors. Sort the angle they make.",
        miss: "Does the second arm fall inside the card or outside it?",
        choices: [{ id: "right angle", label: "right angle" }, { id: "acute", label: "acute" }, { id: "obtuse", label: "obtuse" }] },
      /* practice 4: answer in the plan = Obtuse. A square-corner card laid in the angle leaves a space between itself and one cover */
      { qid: "M2.S4.T9.C33:4", kind: "sort", deg: 128, answer: "obtuse", near: "acute", winMs: 3000,
        ask: "What kind?", say: "This angle is made by the two covers of an open book. Sort it the same way.",
        miss: "Does the card cover the whole angle, or is some left over?",
        choices: [{ id: "right angle", label: "right angle" }, { id: "acute", label: "acute" }, { id: "obtuse", label: "obtuse" }] },
    ],
  },
  {
    n: 3,
    concept: "The angle between clock hands",
    conceptId: "M2.S4.T9.C34", objectiveIds: ["O16"],
    says: ["The hands make two angles. Which is the smaller one? What kind is it?"],
    ladder: ["How many hours make a square corner?", "Set the clock to three o'clock first and lay the card in."],
    closing: "Clock hands make two angles, and the one to name is the smaller: one or two hours apart is acute, three is a right angle, and four or five is obtuse.",
    learned: "You learned: clock hands make two angles and the smaller one is named",
    traceback: "The gaps are counted one at a time the short way round, the smaller angle is outlined, and the square corner is laid against it.",
    items: [
      /* learn ML3: answer in the plan = Acute. The smaller angle between the hands is two hours wide, less than the three hours of a right angle */
      { qid: "M2.S4.T9.C34:ML3", kind: "clock", hour: 10, answer: "acute", near: "obtuse", winMs: 3200,
        ask: "What kind?", say: "At ten o'clock, what kind of angle do the hands make?",
        miss: "How many hours apart are the hands the short way round?",
        choices: [{ id: "right angle", label: "right angle" }, { id: "acute", label: "acute" }, { id: "obtuse", label: "obtuse" }] },
      /* practice 5: answer in the plan = Obtuse. The smaller angle is four hours wide, more than the three hours of a right angle */
      { qid: "M2.S4.T9.C34:5", kind: "clock", hour: 4, answer: "obtuse", near: "acute", winMs: 3200,
        ask: "What kind?", say: "The hands now stand at four o'clock. Sort the smaller angle.",
        miss: "Walk the marker from one hand to the other and count the gaps.",
        choices: [{ id: "right angle", label: "right angle" }, { id: "acute", label: "acute" }, { id: "obtuse", label: "obtuse" }] },
      /* practice 6: answer in the plan = The smaller one, three hours wide, which is a right angle */
      { qid: "M2.S4.T9.C34:6", kind: "clock", hour: 9, answer: "right angle", near: "obtuse", winMs: 3200,
        ask: "What kind?", say: "The clock says nine o'clock now. Name the kind of angle the hands make.",
        miss: "Count the gaps the short way, not the numbers.",
        choices: [{ id: "right angle", label: "right angle" }, { id: "acute", label: "acute" }, { id: "obtuse", label: "obtuse" }] },
    ],
  },
  {
    n: 4,
    concept: "Rows across, columns down",
    conceptId: "M2.S4.T9.C35", objectiveIds: ["O16"],
    says: ["Move down. Which number changed, the row or the column?"],
    ladder: ["Does this move go down or across?", "Walk the marker one step at a time and watch the numbers at the edges."],
    closing: "A place on a grid is given by its row and its column. Rows run across and columns run down, so moving down changes the row and keeps the column.",
    learned: "You learned: a place on a grid is its row and its column",
    traceback: "The marker walks the move one step at a time, lighting a fresh row across and keeping its column, and stops on the right place.",
    items: [
      /* learn ML4: answer in the plan = In row four, column three */
      { qid: "M2.S4.T9.C35:ML4", kind: "move", start: [1, 1], across: 2, down: 3, parts: [{ label: "row" }, { label: "column" }],
        answer: [4, 3], near: "3|2", winMs: 3400,
        ask: "Where does it stop?", say: "The marker starts in row one, column one. Move it two columns across, then three rows down.",
        miss: "Which end is row one counted from on this grid?" },
      /* practice 7: answer in the plan = The fish, in row three, column two, the same column as the kite */
      { qid: "M2.S4.T9.C35:7", kind: "reach", start: [1, 2], down: 2, answer: "fish", near: "cup", winMs: 3200,
        ask: "Which picture?", say: "The marker sits on the kite. Move it two rows down and name the picture you reach.",
        miss: "Does the column change when the marker goes down?",
        choices: [{ id: "fish", label: "fish" }, { id: "cup", label: "cup" }, { id: "leaf", label: "leaf" }, { id: "lamp", label: "lamp" }] },
      /* practice 8: answer in the plan = The leaf is two rows below the drum, in the same column. Moving down changes the row, not the column */
      { qid: "M2.S4.T9.C35:8", kind: "say", start: [1, 3], down: 2, from: [1, 3], to: [3, 3], answer: "rows below", near: "columns below", winMs: 3400,
        ask: "Which words fit?", say: "A child says the leaf lies two columns below the drum. Say that the right way.",
        miss: "Walk the marker from the drum down to the leaf.",
        choices: [{ id: "rows below", label: "rows below" }, { id: "columns below", label: "columns below" },
          { id: "rows across", label: "rows across" }, { id: "columns across", label: "columns across" }] },
    ],
  },
];

/* the pictures on the grid, each one only once, so a place is found by its row and its column */
const AGF_GRID = [["bell", "kite", "drum", "boat"], ["star", "cup", "lamp", "tent"],
  ["ball", "fish", "leaf", "sock"], ["ring", "flag", "tree", "moon"]];

/* The numbers, rows, sizes and targets the working area needs (they go into the sidecar too). */
const MODEL = {
  name: { vx: 340, vy: 318, arm: 248, box: { x: 618, y: 206, w: 132, h: 112, gap: 30 } },
  sort: { vx: 380, vy: 360, arm: 290, card: 150, home: { x: 800, y: 175 } },
  clock: { cx: 400, cy: 268, r: 180, hour: 84, minute: 116, panel: { x: 740, y: 186, w: 300, h: 156 } },
  grid: { x: 303, y: 24, edge: 40, cell: 110, rows: 4, cols: 4, pictures: AGF_GRID, read: { x: 800, y: 150, w: 270, h: 190 } },
  free: { vx: 230, vy: 280, arm: 175, card: 130, home: { x: 24, y: 36 }, grid: 566 },
  rightAngleHours: 3,
};

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* judge: is this value right for this item? An angle may be named either way round (ABC or CBA),
   or by its vertex alone (angle B), as the page names it. */
const judge = (item: any, v: any) => {
  if (item.parts) return judgeSlotParts(item, v);
  const s = String(v ?? "").trim().toLowerCase();
  const a = String(item.answer).trim().toLowerCase();
  if (item.kind === "name") return s === a || s === a.split("").reverse().join("") || s === a[1];
  return s === a;
};
/* oracle: every answer re-derived by a second route that shares no code with judge or Work */
const oracle = () => {
  const sortOf = (deg: number) => (deg === 90 ? "right angle" : deg < 90 ? "acute" : "obtuse");
  const hoursApart = (h: number) => Math.min(h % 12, 12 - (h % 12));
  const at = (r: number, c: number) => AGF_GRID[r - 1][c - 1];
  return PHASES.every((p: any) => p.items.every((it: any) => {
    if (it.kind === "name") return it.answer === it.letters.join("");
    if (it.kind === "vertex") return it.answer === it.letters[1];
    if (it.kind === "sort") return it.answer === sortOf(it.deg);
    if (it.kind === "clock") return it.answer === sortOf(hoursApart(it.hour) * 30);
    if (it.kind === "move") return it.answer[0] === it.start[0] + it.down && it.answer[1] === it.start[1] + it.across;
    if (it.kind === "reach") return it.answer === at(it.start[0] + it.down, it.start[1]);
    if (it.kind === "say") return it.answer === (it.from[1] === it.to[1] ? (it.to[0] > it.from[0] ? "rows below" : "rows above") : "columns across");
    return false;
  }));
};
/* the most likely wrong answer (the misconception); judge must reject it */
const nearMiss = (item: any) => item.near;
/* the forms of an answer that no question, hint or ladder line may print (a single letter names
   nothing on its own: every line is full of letters, so there is nothing to hide) */
const answerForms = (item: any) => (item.parts ? item.answer.filter((x: number) => x >= 10).flatMap((x: number) => [String(x), indian(x), words(x)])
  : String(item.answer).length < 2 ? [] : [String(item.answer)]);
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => item.answer;

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => (T.state().stage === "demo" ? HOOK.demo && HOOK.demo() : T.submit(item.answer));
/* the agent's answer() for an item made on the working area: set it as a child would; undefined = type it */
const answer = (item: any, v: any) => (item.pad === "enter" && HOOK.set ? HOOK.set(v) : undefined);
/* the agent's check() before Enter: e.g. drop a token that waits; undefined = press Enter */
const check = () => (HOOK.check ? HOOK.check() : undefined);

/* ── the chapter's colours: the figure deep blue, every point vermilion, every angle arc amber,
      the second thing set beside the first sky blue; grid rules and labels near-black ───────── */
const AGF_FIG = CONTENT.hundred;
const AGF_PT = CONTENT.pointer;
const AGF_ARC = CONTENT.ten;
const AGF_SKY = "#56B4E9";
const AGF_FIG_INK = shade(CONTENT.hundred, 0.15);
const AGF_PT_INK = shade(CONTENT.pointer, 0.3);
const AGF_ARC_INK = shade(CONTENT.ten, 0.45);

const agfRad = (d: number) => (d * Math.PI) / 180;
const agfPt = (cx: number, cy: number, r: number, d: number) => ({ x: cx + r * Math.cos(agfRad(d)), y: cy + r * Math.sin(agfRad(d)) });
const agfF = (n: number) => Math.round(n * 10) / 10;
const agfArcPath = (cx: number, cy: number, r: number, a0: number, a1: number) => {
  const p = agfPt(cx, cy, r, a0), q = agfPt(cx, cy, r, a1);
  return `M ${agfF(p.x)} ${agfF(p.y)} A ${r} ${r} 0 ${a1 - a0 > 180 ? 1 : 0} 1 ${agfF(q.x)} ${agfF(q.y)}`;
};
const agfWedgePath = (cx: number, cy: number, r: number, a0: number, a1: number) =>
  `M ${agfF(cx)} ${agfF(cy)} L ${agfF(agfPt(cx, cy, r, a0).x)} ${agfF(agfPt(cx, cy, r, a0).y)} ${agfArcPath(cx, cy, r, a0, a1).slice(agfArcPath(cx, cy, r, a0, a1).indexOf("A"))} Z`;
/* a square corner: its corner at (cx,cy), one edge along a0, the other a quarter turn back */
const agfSquarePath = (cx: number, cy: number, s: number, a0: number) => {
  const u = agfPt(0, 0, s, a0), w = agfPt(0, 0, s, a0 - 90);
  return `M ${agfF(cx)} ${agfF(cy)} L ${agfF(cx + u.x)} ${agfF(cy + u.y)} L ${agfF(cx + u.x + w.x)} ${agfF(cy + u.y + w.y)} L ${agfF(cx + w.x)} ${agfF(cy + w.y)} Z`;
};
const agfStar = (r: number) => Array.from({ length: 10 }, (_, k) => {
  const p = agfPt(0, 0, k % 2 ? r * 0.44 : r, k * 36 - 90);
  return `${agfF(p.x)} ${agfF(p.y)}`;
}).join(" ");
const agfWalk = (it: any) => {
  const out: any[] = [];
  let r = it.start[0], c = it.start[1];
  for (let k = 0; k < (it.across || 0); k++) { c += 1; out.push({ r, c }); }
  for (let k = 0; k < (it.down || 0); k++) { r += 1; out.push({ r, c }); }
  return out;
};

/* one picture of the grid, drawn in a 80-unit box (no photographs anywhere: the tool draws it) */
function AgfPic({ name, x, y, s, c, bg }: any) {
  const P: any = {
    bell: <g><path d="M-22 16 C -22 -18, 22 -18, 22 16 Z" fill={c} /><rect x={-28} y={16} width={56} height={9} rx={4} fill={c} /><circle cx={0} cy={31} r={7} fill={c} /></g>,
    kite: <g><polygon points="0 -36 26 0 0 34 -26 0" fill={c} /><path d="M0 34 q12 10 -2 18" fill="none" stroke={c} strokeWidth={5} strokeLinecap="round" /></g>,
    drum: <g><rect x={-26} y={-12} width={52} height={32} rx={6} fill={c} /><ellipse cx={0} cy={-12} rx={26} ry={9} fill={c} /><path d="M-22 -6 L0 14 M0 -6 L22 14" stroke={bg} strokeWidth={4} /></g>,
    boat: <g><path d="M-32 6 L32 6 L22 26 L-22 26 Z" fill={c} /><path d="M0 6 V -30" stroke={c} strokeWidth={5} /><polygon points="4 -28 26 2 4 2" fill={c} /></g>,
    star: <polygon points={agfStar(34)} fill={c} />,
    cup: <g><path d="M-20 -12 L20 -12 L14 18 L-14 18 Z" fill={c} /><path d="M20 -6 q16 8 -2 18" fill="none" stroke={c} strokeWidth={5} /><rect x={-26} y={18} width={52} height={7} rx={3} fill={c} /></g>,
    lamp: <g><path d="M-22 -10 L22 -10 L14 -32 L-14 -32 Z" fill={c} /><rect x={-4} y={-10} width={8} height={30} fill={c} /><rect x={-18} y={20} width={36} height={8} rx={4} fill={c} /></g>,
    tent: <g><polygon points="0 -30 32 24 -32 24" fill={c} /><polygon points="0 -6 11 24 -11 24" fill={bg} /></g>,
    ball: <g><circle cx={0} cy={0} r={28} fill={c} /><path d="M-24 -10 q24 14 48 0 M-24 10 q24 -14 48 0" fill="none" stroke={bg} strokeWidth={4} /></g>,
    fish: <g><ellipse cx={-4} cy={0} rx={26} ry={16} fill={c} /><polygon points="18 0 38 -14 38 14" fill={c} /><circle cx={-16} cy={-4} r={4} fill={bg} /></g>,
    leaf: <g><path d="M0 -32 C 24 -14, 24 16, 0 32 C -24 16, -24 -14, 0 -32 Z" fill={c} /><path d="M0 -24 V 26" stroke={bg} strokeWidth={4} /></g>,
    sock: <path d="M-14 -30 H12 V6 C 12 16, 30 16, 30 24 C 30 32, 12 32, 2 28 L-14 20 Z" fill={c} />,
    ring: <g><circle cx={0} cy={4} r={24} fill="none" stroke={c} strokeWidth={10} /><polygon points="0 -34 10 -22 -10 -22" fill={c} /></g>,
    flag: <g><rect x={-3} y={-32} width={6} height={62} rx={3} fill={c} /><polygon points="3 -30 34 -18 3 -6" fill={c} /></g>,
    tree: <g><rect x={-5} y={8} width={10} height={24} fill={c} /><polygon points="0 -32 22 2 -22 2" fill={c} /><polygon points="0 -14 28 14 -28 14" fill={c} /></g>,
    moon: <path fillRule="evenodd" d="M0 0 m -32 0 a 32 32 0 1 0 64 0 a 32 32 0 1 0 -64 0 M16 0 m -28 0 a 28 28 0 1 0 56 0 a 28 28 0 1 0 -56 0" fill={c} />,
  };
  return <g transform={`translate(${agfF(x)},${agfF(y)}) scale(${agfF(s / 40)})`}>{P[name] || null}</g>;
}

/* ── the working area: 1086 x 528, origin at its top-left ──────────────────────────────────── */
function Work({ phase, n, item, index, stage, wrong, typed, api, MODEL, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();
  const free = stage === "free";
  const kind = free ? "free" : (item && item.kind) || "";
  const [open, setOpen] = useState([-52, 8]);
  const [card, setCard] = useState<any>(null);
  const [mark, setMark] = useState({ at: 0, count: 0 });
  const [cell, setCell] = useState({ r: 1, c: 1 });
  const [show, setShow] = useState<any>(null);
  const nameRef = useRef("");
  const staleRef = useRef(false);
  const movesRef = useRef(0);
  nameRef.current = typed || "";
  const act = (stage === "ask" || free) && !tl.busy;

  /* every question (and Free play) starts from the same furnished screen */
  useEffect(() => {
    setShow(null); setCard(null); staleRef.current = false; movesRef.current = 0;
    if (free) { setOpen([-58, 10]); setCell({ r: 2, c: 2 }); setMark({ at: 0, count: 0 }); return; }
    if (!item) return;
    if (item.open) setOpen(item.open);
    if (item.kind === "clock") setMark({ at: 0, count: 0 });
    if (item.start) setCell({ r: item.start[0], c: item.start[1] });
  }, [n, index, free]);

  /* after a miss the child's answer stays in the slot, but the next letter starts a fresh name */
  useEffect(() => { if (wrong) staleRef.current = true; }, [wrong]);

  /* the traceback: redraw the mathematics and end on the whole right answer, unmarked. It is drawn
     on a layer of its own (`show`), so the child's own pieces are never moved under their hand. */
  useEffect(() => {
    if (!wrong || stage !== "ask" || !item) return;
    api.lock(true);
    const steps: any[] = [];
    const K = item.kind;
    if (K === "name" || K === "vertex") {
      const said = String(wrong.value || "").toUpperCase().replace(/[^A-Z]/g, "");
      const known = (s: string) => s.split("").every((L: string) => item.letters.indexOf(L) >= 0);
      /* a three-letter name with the wrong middle letter draws the angle that name describes; a single
         letter taken for the vertex traces the one arm that runs from the point the child picked. It
         stays on the screen to the last frame, so both angles are seen at once */
      const ghost: any = said.length === 3 && known(said) && said[1] !== item.letters[1] ? { said }
        : said.length === 1 && known(said) && said !== item.letters[1] ? { one: said } : null;
      if (ghost) steps.push([1100, () => setShow({ step: 1, ...ghost })]);
      steps.push([1000, () => setShow({ step: 2, ...(ghost || {}) })]);
      steps.push([700, () => setShow({ step: 3, ...(ghost || {}) })]);
    } else if (K === "sort") {
      steps.push([1000, () => setShow({ step: 1, grow: 1 })]);
      /* long arms do not make a bigger angle: the arms grow and shrink while the opening stays put */
      if (item.stretch) {
        steps.push([850, () => setShow({ step: 2, grow: 1.3 })]);
        steps.push([850, () => setShow({ step: 2, grow: 0.7 })]);
        steps.push([850, () => setShow({ step: 2, grow: 1 })]);
      } else steps.push([900, () => setShow({ step: 2, grow: 1 })]);
      steps.push([700, () => setShow({ step: 3, grow: 1 })]);
    } else if (K === "clock") {
      const g = Math.min(item.hour % 12, 12 - (item.hour % 12));
      const dir = item.hour % 12 <= 6 ? 1 : -1;
      for (let k = 1; k <= g; k++) steps.push([460, () => setShow({ step: 1, walk: k, dir })]);
      steps.push([900, () => setShow({ step: 2, walk: g, dir })]);
      steps.push([700, () => setShow({ step: 3, walk: g, dir })]);
    } else {
      const path = agfWalk(item);
      path.forEach((c: any) => steps.push([480, () => setShow({ step: 1, at: c })]));
      steps.push([800, () => setShow({ step: 2, at: path[path.length - 1] || { r: item.start[0], c: item.start[1] } })]);
    }
    tl.run(steps, () => api.lock(false));
  }, [wrong]);

  /* Enter commits the name built on the working area; every other item answers from the slot or the keys */
  /* Enter sends the name the child built. After a miss the name in the slot is stale: Enter alone
     sends nothing until a letter is tapped, so the correction's own drawing can never be answered
     with (the traceback never writes into the name either: it draws on the `show` layer). */
  api.onEnter(!free && item && item.pad === "enter" ? () => { if (staleRef.current) return; api.submit(nameRef.current || ""); } : null);
  HOOK.set = (v: any) => {
    const s = String(v ?? "").toUpperCase().replace(/[^A-Z]/g, "");
    nameRef.current = s; api.setTyped(s); return true;
  };

  const clear = () => { if (show) setShow(null); };
  const tapLetter = (i: number) => {
    if (!act || free || !item || item.pad !== "enter") return;
    clear();
    const L = item.letters[i], max = String(item.answer).length;
    const cur = staleRef.current ? "" : nameRef.current;
    staleRef.current = false;
    /* tapping the letter just placed takes it off again; a tap on a full name starts it afresh */
    const next = cur && cur[cur.length - 1] === L ? cur.slice(0, -1) : cur.length >= max ? L : cur + L;
    nameRef.current = next; api.setTyped(next); api.sfx.tick();
    /* once the name is whole, the keyboard's focus goes back to the page, so the next Enter answers
       instead of being eaten by the letter that still holds it (a real dead end on a tool of ch 9) */
    if (next.length >= max) pointerBlur();
  };
  const swing = (i: number, at: any) => {
    const M = free ? MODEL.free : MODEL.name;
    const v = free ? { x: M.vx, y: M.vy } : { x: MODEL.name.vx, y: MODEL.name.vy };
    if (!isFinite(at.x) || !isFinite(at.y)) return;
    let d = (Math.atan2(at.y - v.y, at.x - v.x) * 180) / Math.PI;
    const lo = i === 0 ? -88 : 6, hi = i === 0 ? -22 : 40;
    d = Math.max(lo, Math.min(hi, d));
    const nxt = i === 0 ? [d, open[1]] : [open[0], d];
    if (nxt[1] - nxt[0] < 34) return;
    setOpen(nxt); api.sfx.tick();
  };
  const layCard = (at: any) => {
    const M = free ? MODEL.free : MODEL.sort;
    const v = { x: M.vx, y: M.vy };
    if (!isFinite(at.x) || !isFinite(at.y)) { setCard({ in: true }); api.sfx.tick(); return; }
    if (Math.hypot(at.x - v.x, at.y - v.y) < 250) { setCard({ in: true }); api.sfx.tick(); return; }
    const s = M.card;
    setCard({ in: false, x: Math.max(8, Math.min(1086 - s - 8, at.x - s / 2)), y: Math.max(8, Math.min(528 - s - 8, at.y - s / 2)) });
  };
  const walkClock = (at: any) => {
    const K = MODEL.clock;
    if (!isFinite(at.x) || !isFinite(at.y)) return;
    let d = (Math.atan2(at.y - K.cy, at.x - K.cx) * 180) / Math.PI + 90;
    let to = Math.round(((d % 360) + 360) % 360 / 30) % 12;
    let step = to - mark.at;
    if (step > 6) step -= 12;
    if (step < -6) step += 12;
    if (!step) return;
    const count = Math.max(-12, Math.min(12, mark.count + step));
    setMark({ at: ((to % 12) + 12) % 12, count });
    api.sfx.tick();
  };
  const goCell = (r: number, c: number) => {
    if (!act) return;
    clear();
    if (r < 1 || c < 1 || r > 4 || c > 4) return;
    if (r === cell.r && c === cell.c) return;
    movesRef.current += 1;
    setCell({ r, c }); api.sfx.tick();
  };
  const dropMarker = (at: any) => {
    const G = free ? { ...MODEL.grid, x: MODEL.free.grid } : MODEL.grid;
    if (!isFinite(at.x) || !isFinite(at.y)) return;
    const c = Math.max(1, Math.min(4, Math.floor((at.x - G.x - G.edge) / G.cell) + 1));
    const r = Math.max(1, Math.min(4, Math.floor((at.y - G.y - G.edge) / G.cell) + 1));
    if (r !== cell.r && c !== cell.c) goCell(Math.abs(r - cell.r) >= Math.abs(c - cell.c) ? r : cell.r, Math.abs(r - cell.r) >= Math.abs(c - cell.c) ? cell.c : c);
    else goCell(r, c);
  };

  const drag = useDrag((p: any, at: any, moved: boolean) => {
    if (!act) return;
    clear();
    if (p.kind === "arm") { if (moved) swing(p.i, at); else tapLetter(p.i === 0 ? 0 : 2); return; }
    if (p.kind === "card") { layCard(at); return; }
    if (p.kind === "mark") { walkClock(at); return; }
    if (p.kind === "cellmark") { dropMarker(at); return; }
  });

  /* what the host and the teacher agent read back (toolApi.getState) */
  api.share({
    arms: [Math.round(open[0]), Math.round(open[1])],
    angleName: free ? "" : String(typed || ""),
    cardIn: !!(card && card.in),
    clockTime: item && item.kind === "clock" ? `${item.hour}:00` : null,
    hoursWalked: Math.abs(mark.count),
    marker: [cell.r, cell.c],
    moves: movesRef.current,
    complete: stage === "idle",
  });

  /* ── the pieces ───────────────────────────────────────────────────────────────────────── */
  /* these draw, they are not components: a component declared inside Work is a new type on every
     render, so React would unmount its piece and the keyboard focus would fall off it mid-build */
  const ray = (x1: number, y1: number, x2: number, y2: number) => (
    <g><line x1={x1} y1={y1} x2={x2} y2={y2} stroke={AGF_FIG} strokeWidth={9} strokeLinecap="round" />
      <circle cx={x2} cy={y2} r={6} fill={AGF_FIG} /></g>
  );
  const dot = (x: number, y: number, r: number) => <circle cx={x} cy={y} r={r} fill={AGF_PT} stroke="#FFFFFF" strokeWidth={3} />;
  /* every point of the figure is drawn the same way, so the picture never singles out the vertex */
  const node = (x: number, y: number) => (
    <g><circle cx={x} cy={y} r={20} fill="#FFFFFF" stroke={AGF_PT} strokeWidth={5} />
      <circle cx={x} cy={y} r={9} fill={AGF_PT} /></g>
  );
  const knob = (id: string, label: string, x: number, y: number, on: number) => (
    <g key={id} {...control(id, label)} {...drag.bind({ kind: "arm", i: on })} {...drag.keys({ kind: "arm", i: on })} className="c4-piece">
      <rect x={x - 38} y={y - 38} width={76} height={76} fill="transparent" />
      {node(x, y)}
    </g>
  );

  /* the hinged arms, their letters and the name builder (phase 1) */
  const armsFigure = (M: any, letters: any, a: any, withLetters: boolean) => {
    const e0 = agfPt(M.vx, M.vy, M.arm, a[0]), e1 = agfPt(M.vx, M.vy, M.arm, a[1]);
    const t0 = agfPt(M.vx, M.vy, M.arm + 34, a[0]), t1 = agfPt(M.vx, M.vy, M.arm + 34, a[1]);
    const tv = agfPt(M.vx, M.vy, 48, (a[0] + a[1]) / 2 + 180);
    return (
      <g>
        <path d={agfArcPath(M.vx, M.vy, 62, a[0], a[1])} fill="none" stroke={AGF_ARC} strokeWidth={7} strokeLinecap="round" />
        {ray(M.vx, M.vy, e0.x, e0.y)}
        {ray(M.vx, M.vy, e1.x, e1.y)}
        {node(M.vx, M.vy)}
        {withLetters && <text x={agfF(t0.x)} y={agfF(t0.y + 10)} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={AGF_PT_INK}>{letters[0]}</text>}
        {withLetters && <text x={agfF(t1.x)} y={agfF(t1.y + 10)} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={AGF_PT_INK}>{letters[2]}</text>}
        {withLetters && <text x={agfF(tv.x)} y={agfF(tv.y + 10)} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={AGF_PT_INK}>{letters[1]}</text>}
      </g>
    );
  };

  const nameArea = () => {
    const M = MODEL.name, B = M.box, a = open;
    const e0 = agfPt(M.vx, M.vy, M.arm, a[0]), e1 = agfPt(M.vx, M.vy, M.arm, a[1]);
    const max = String(item.answer).length;
    const slots = max === 1 ? [B.x + B.w + B.gap] : [B.x, B.x + B.w + B.gap, B.x + 2 * (B.w + B.gap)];
    const built = String(typed || "");
    const P: any = { [item.letters[0]]: e0, [item.letters[1]]: { x: M.vx, y: M.vy }, [item.letters[2]]: e1 };
    /* the angle the child's own name describes stays beside the right one to the last frame, so the
       two angles are seen together: a different corner, a different angle */
    const ghost = show && show.said ? show.said : "";
    const gm = ghost ? P[ghost[1]] : null;
    const one = show && show.one ? P[show.one] : null;
    const gArc = gm ? [P[ghost[0]], P[ghost[2]]].map((q: any) => (Math.atan2(q.y - gm.y, q.x - gm.x) * 180) / Math.PI).sort((x: number, y: number) => x - y) : null;
    return (
      <g>
        {show && show.step >= 2 && <g pointerEvents="none">
          <line x1={M.vx} y1={M.vy} x2={e0.x} y2={e0.y} stroke={AGF_ARC} strokeWidth={24} strokeOpacity={0.5} strokeLinecap="round" />
          <line x1={M.vx} y1={M.vy} x2={e1.x} y2={e1.y} stroke={AGF_ARC} strokeWidth={24} strokeOpacity={0.5} strokeLinecap="round" /></g>}
        {armsFigure(M, item.letters, a, true)}
        {gm && <g pointerEvents="none"><line x1={gm.x} y1={gm.y} x2={P[ghost[0]].x} y2={P[ghost[0]].y} stroke={AGF_SKY} strokeWidth={9} strokeLinecap="round" />
          <line x1={gm.x} y1={gm.y} x2={P[ghost[2]].x} y2={P[ghost[2]].y} stroke={AGF_SKY} strokeWidth={9} strokeLinecap="round" />
          {gArc && <path d={agfArcPath(gm.x, gm.y, 54, gArc[0], gArc[1])} fill="none" stroke={AGF_SKY} strokeWidth={7} strokeLinecap="round" />}
          <circle cx={gm.x} cy={gm.y} r={30} fill="none" stroke={AGF_SKY} strokeWidth={6} /></g>}
        {one && <g pointerEvents="none"><line x1={one.x} y1={one.y} x2={M.vx} y2={M.vy} stroke={AGF_SKY} strokeWidth={11} strokeLinecap="round" />
          <circle cx={one.x} cy={one.y} r={30} fill="none" stroke={AGF_SKY} strokeWidth={6} /></g>}
        {show && show.step >= 2 && <circle cx={M.vx} cy={M.vy} r={34} fill="none" stroke={AGF_PT} strokeWidth={6} pointerEvents="none" />}
        {knob("arm-1", "arm " + item.letters[0], e0.x, e0.y, 0)}
        {knob("arm-2", "arm " + item.letters[2], e1.x, e1.y, 2)}
        <Hit id="vertex" x={M.vx - 44} y={M.vy - 44} w={88} h={88} label={"point " + item.letters[1]} onPress={() => tapLetter(1)} />
        {/* the pulse marks the point the question has already named; on "which letter is the vertex"
            nothing is marked, or the picture would answer it */}
        {stage === "ask" && !built && item.kind === "name" && <Invite x={M.vx} y={M.vy} r={46} C={C} />}
        {slots.map((x, k) => (
          <g key={k} pointerEvents="none">
            <rect x={x} y={B.y} width={B.w} height={B.h} rx={RAD.panel} fill="#FFFFFF" stroke={built[k] ? AGF_FIG : C.rule} strokeWidth={built[k] ? 4 : 2} />
            <text x={x + B.w / 2} y={B.y + 70} textAnchor="middle" fontSize={T.display} fontWeight={700} fill={C.ink}>{built[k] || ""}</text>
          </g>
        ))}
        {show && show.step >= 3 && (
          <g pointerEvents="none">
            {(max === 1 ? [item.letters[1]] : item.letters).map((L: string, k: number) => (
              <text key={k} x={slots[k] + B.w / 2} y={B.y + 210} textAnchor="middle" fontSize={T.display} fontWeight={700}
                fill={k === 1 || max === 1 ? AGF_PT_INK : C.ink}>{L}</text>
            ))}
            {max === 3 && <circle cx={slots[1] + B.w / 2} cy={B.y + 186} r={46} fill="none" stroke={AGF_PT} strokeWidth={5} />}
            {max === 1 && <circle cx={slots[0] + B.w / 2} cy={B.y + 186} r={46} fill="none" stroke={AGF_PT} strokeWidth={5} />}
          </g>
        )}
      </g>
    );
  };

  /* the square-corner card laid into an angle (phases 2 and Free play) */
  const cardAt = (M: any, a1: number, held: any) => {
    const s = M.card;
    if (held) return { x: held.x, y: held.y, deg: 0, loose: true };
    if (card && card.in) return { x: M.vx, y: M.vy, deg: a1, loose: false };
    if (card) return { x: card.x, y: card.y, deg: 0, loose: true };
    return { x: M.home.x, y: M.home.y, deg: 0, loose: true };
  };
  const cardPiece = (M: any, a1: number) => {
    const held = drag.drag && drag.drag.payload && drag.drag.payload.kind === "card" ? { x: drag.drag.x - M.card / 2, y: drag.drag.y - M.card / 2 } : null;
    const at = cardAt(M, a1, held);
    const s = M.card;
    const body = at.loose
      ? <g><rect x={at.x} y={at.y} width={s} height={s} rx={10} fill={tint(C.panel, 0.4)} stroke={shade(C.rule, 0.2)} strokeWidth={4} filter="url(#fShadowSoft)" />
        <path d={`M ${at.x + 16} ${at.y + 70} L ${at.x + 16} ${at.y + 16} L ${at.x + 70} ${at.y + 16}`} fill="none" stroke={AGF_ARC} strokeWidth={10} /></g>
      : <g><path d={agfSquarePath(at.x, at.y, s, at.deg)} fill={tint(C.panel, 0.4)} fillOpacity={0.55} stroke={shade(C.rule, 0.2)} strokeWidth={4} />
        <path d={agfSquarePath(at.x, at.y, 54, at.deg)} fill="none" stroke={AGF_ARC} strokeWidth={10} /></g>;
    return (
      <g {...control("card", "square corner card")} {...drag.bind({ kind: "card" })} {...drag.keys({ kind: "card" })} className="c4-piece">
        {body}
      </g>
    );
  };

  const sortArea = () => {
    const M = MODEL.sort, deg = item.deg;
    const a = [-deg, 0];
    /* the arms may be drawn longer or shorter while the opening between them stays exactly the same */
    const arm = M.arm * (show && show.grow ? show.grow : 1);
    const e0 = agfPt(M.vx, M.vy, arm, a[0]), e1 = agfPt(M.vx, M.vy, arm, a[1]);
    const laid = !!(card && card.in) || !!(show && show.step >= 1);
    const gapLo = Math.min(-deg, -90), gapHi = Math.max(-deg, -90);
    /* the square corner grows with the arms, so it covers the angle at every length */
    const cardNow = M.card * (show && show.grow ? show.grow : 1), wedgeR = Math.min(132, cardNow * 0.86);
    return (
      <g>
        <path d={agfArcPath(M.vx, M.vy, 70, a[0], a[1])} fill="none" stroke={AGF_ARC} strokeWidth={7} strokeLinecap="round" />
        {ray(M.vx, M.vy, e0.x, e0.y)}
        {ray(M.vx, M.vy, e1.x, e1.y)}
        {dot(M.vx, M.vy, 15)}
        {/* the comparison is drawn to be seen, never pressed: a press falls through to the card */}
        <g pointerEvents="none">
          {show && show.step >= 1 && !(card && card.in) && <path d={agfSquarePath(M.vx, M.vy, cardNow, 0)} fill={AGF_SKY} fillOpacity={0.2} stroke={AGF_SKY} strokeWidth={4} />}
          {laid && deg !== 90 && (show ? show.step >= 2 : true) &&
            <path d={agfWedgePath(M.vx, M.vy, wedgeR, gapLo, gapHi)} fill={AGF_ARC} fillOpacity={0.45} stroke={AGF_ARC} strokeWidth={4} />}
          {laid && deg === 90 && <path d={agfSquarePath(M.vx, M.vy, 44, 0)} fill="none" stroke={AGF_ARC} strokeWidth={7} />}
        </g>
        {cardPiece(M, 0)}
        {show && show.step >= 3 && <text x={M.home.x + M.card / 2} y={450} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={C.ink} pointerEvents="none">{tx(item.answer)}</text>}
        {stage === "ask" && !card && !show &&<Invite x={M.home.x + M.card / 2} y={M.home.y + M.card / 2} r={112} C={C} />}
      </g>
    );
  };

  const clockArea = () => {
    const K = MODEL.clock, h = item.hour % 12;
    const ha = h * 30 - 90, ma = -90;
    const big = ha + 90 >= 180, sweep = ha + 90;
    const wedgeA = [ma, ha];           /* clockwise from the minute hand to the hour hand */
    const wedgeB = [ha, ma + 360];
    const small = sweep <= 180 ? wedgeA : wedgeB;
    const large = sweep <= 180 ? wedgeB : wedgeA;
    const dir = show ? show.dir : mark.count >= 0 ? 1 : -1;
    const walked = show ? show.walk : Math.abs(mark.count);
    /* the marker rides just outside the rim, clear of the hour numbers it would otherwise cover */
    const mr = K.r + 8;
    const mp = agfPt(K.cx, K.cy, mr, mark.at * 30 - 90);
    const gp = show ? agfPt(K.cx, K.cy, mr, -90 + show.dir * show.walk * 30) : null;
    const hp = agfPt(K.cx, K.cy, K.hour, ha), mnp = agfPt(K.cx, K.cy, K.minute, ma);
    const P = K.panel;
    const outline = show && show.step >= 2;
    const cardA = small[0] === ma ? ma + 90 : ma;
    return (
      <g>
        {/* the face, both shaded angles and every layer the correction adds are drawn to be seen, never
            pressed: only the counting marker takes a press */}
        <g pointerEvents="none">
        <circle cx={K.cx} cy={K.cy} r={K.r} fill="#FFFFFF" stroke={C.ink} strokeWidth={5} />
        <path d={agfWedgePath(K.cx, K.cy, 116, large[0], large[1])} fill={AGF_SKY} fillOpacity={0.35} />
        <path d={agfWedgePath(K.cx, K.cy, 116, small[0], small[1])} fill={AGF_ARC} fillOpacity={0.35} />
        {show && show.step >= 3 && <path d={agfSquarePath(K.cx, K.cy, 116, cardA)} fill={tint(C.panel, 0.4)} fillOpacity={0.55} stroke={shade(C.rule, 0.2)} strokeWidth={4} />}
        {outline && <path d={agfWedgePath(K.cx, K.cy, 116, small[0], small[1])} fill="none" stroke={AGF_ARC} strokeWidth={9} strokeLinejoin="round" />}
        {Array.from({ length: 12 }, (_, k) => {
          const p = agfPt(K.cx, K.cy, K.r - 22, k * 30 - 90), q = agfPt(K.cx, K.cy, K.r - 6, k * 30 - 90);
          return <line key={k} x1={agfF(p.x)} y1={agfF(p.y)} x2={agfF(q.x)} y2={agfF(q.y)} stroke={C.ink} strokeWidth={4} />;
        })}
        {Array.from({ length: Math.max(0, walked) }, (_, k) => (
          <path key={k} d={agfArcPath(K.cx, K.cy, K.r - 34, Math.min(-90 + dir * k * 30, -90 + dir * (k + 1) * 30) + 4, Math.max(-90 + dir * k * 30, -90 + dir * (k + 1) * 30) - 4)}
            fill="none" stroke={AGF_ARC} strokeWidth={13} strokeLinecap="round" />
        ))}
        <line x1={K.cx} y1={K.cy} x2={agfF(mnp.x)} y2={agfF(mnp.y)} stroke={AGF_FIG} strokeWidth={9} strokeLinecap="round" />
        <line x1={K.cx} y1={K.cy} x2={agfF(hp.x)} y2={agfF(hp.y)} stroke={AGF_FIG} strokeWidth={15} strokeLinecap="round" />
        {Array.from({ length: 12 }, (_, k) => {
          const p = agfPt(K.cx, K.cy, K.r - 50, (k + 1) * 30 - 90);
          return <text key={k} x={agfF(p.x)} y={agfF(p.y + 11)} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{k + 1}</text>;
        })}
        {dot(K.cx, K.cy, 13)}
        {gp && <circle cx={agfF(gp.x)} cy={agfF(gp.y)} r={18} fill={AGF_SKY} stroke="#FFFFFF" strokeWidth={4} />}
        </g>
        <g {...control("hour-mark", "counting marker")} {...drag.bind({ kind: "mark" })} {...drag.keys({ kind: "mark" })} className="c4-piece">
          <rect x={agfF(mp.x - 38)} y={agfF(mp.y - 38)} width={76} height={76} fill="transparent" />
          <circle cx={agfF(mp.x)} cy={agfF(mp.y)} r={20} fill={AGF_ARC} stroke="#FFFFFF" strokeWidth={4} />
        </g>
        {stage === "ask" && !mark.count && !show && <Invite x={agfF(mp.x)} y={agfF(mp.y)} r={34} C={C} />}
        <g pointerEvents="none">
          <rect x={P.x} y={P.y} width={P.w} height={P.h} rx={RAD.panel} fill="url(#gPanel)" stroke={C.rule} strokeWidth={2} />
          <text x={P.x + P.w / 2} y={P.y + 46} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={C.ink}>{tx(walked === 1 ? "hour apart" : "hours apart")}</text>
          {walked > 0 && <text x={P.x + P.w / 2} y={P.y + 130} textAnchor="middle" fontSize={T.display} fontWeight={700} fill={AGF_ARC_INK}>{walked}</text>}
          {show && show.step >= 3 && <text x={P.x + P.w / 2} y={P.y + 230} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={C.ink}>{tx(item.answer)}</text>}
        </g>
      </g>
    );
  };

  const gridArea = (x0: number, withRead: boolean) => {
    const G = MODEL.grid, at = show && show.at ? show.at : cell;
    const cx = (c: number) => x0 + G.edge + (c - 1) * G.cell, cy = (r: number) => G.y + G.edge + (r - 1) * G.cell;
    const R = G.read;
    const named = show && show.step >= 2 && item && (item.kind === "reach" || item.kind === "say");
    /* where the marker stands is the whole answer to the two boxes, so on that question the reading
       waits: the child counts the rows and columns off the grid's own edges, and the panel fills in
       once the answer is given (or once the correction has walked it) */
    const readNow = !(item && item.kind === "move") || !!show || stage === "win" || stage === "idle";
    return (
      <g>
        {/* the lights, the pictures, the edge numbers and the correction's ring are seen, never pressed:
            only the marker and the cells beside it take a press */}
        <g pointerEvents="none">
        <rect x={cx(1)} y={cy(at.r)} width={G.cell * 4} height={G.cell} fill={AGF_ARC} fillOpacity={0.22} />
        <rect x={cx(at.c)} y={cy(1)} width={G.cell} height={G.cell * 4} fill={AGF_ARC} fillOpacity={0.22} />
        {Array.from({ length: 4 }, (_, r) => Array.from({ length: 4 }, (_, c) => (
          <g key={"" + r + c}>
            <rect x={cx(c + 1)} y={cy(r + 1)} width={G.cell} height={G.cell} fill="none" stroke={C.ink} strokeWidth={2} />
            <AgfPic name={G.pictures[r][c]} x={cx(c + 1) + G.cell / 2} y={cy(r + 1) + G.cell / 2} s={38} c={AGF_FIG} bg="#FFFFFF" />
          </g>
        )))}
        <rect x={cx(1)} y={cy(1)} width={G.cell * 4} height={G.cell * 4} fill="none" stroke={C.ink} strokeWidth={4} />
        {Array.from({ length: 4 }, (_, c) => (
          <text key={c} x={cx(c + 1) + G.cell / 2} y={G.y + 32} textAnchor="middle" fontSize={T.label} fontWeight={700}
            fill={at.c === c + 1 ? AGF_ARC_INK : C.ink}>{c + 1}</text>
        ))}
        {Array.from({ length: 4 }, (_, r) => (
          <text key={r} x={x0 + 20} y={cy(r + 1) + G.cell / 2 + 11} textAnchor="middle" fontSize={T.label} fontWeight={700}
            fill={at.r === r + 1 ? AGF_ARC_INK : C.ink}>{r + 1}</text>
        ))}
        {show && show.at && <rect x={cx(at.c) + 10} y={cy(at.r) + 10} width={G.cell - 20} height={G.cell - 20} rx={10} fill="none" stroke={AGF_SKY} strokeWidth={7} />}
        </g>
        <g {...control("marker", `marker on row ${cell.r} column ${cell.c}`)} {...drag.bind({ kind: "cellmark" })} {...drag.keys({ kind: "cellmark" })} className="c4-piece">
          <rect x={cx(cell.c)} y={cy(cell.r)} width={G.cell} height={G.cell} fill="transparent" />
          <rect x={cx(cell.c) + 6} y={cy(cell.r) + 6} width={G.cell - 12} height={G.cell - 12} rx={12} fill="none" stroke={AGF_PT} strokeWidth={7} />
        </g>
        {[[-1, 0], [1, 0], [0, -1], [0, 1]].map(([dr, dc], k) => {
          const r = cell.r + dr, c = cell.c + dc;
          if (r < 1 || c < 1 || r > 4 || c > 4) return null;
          return <Hit key={k} id={`cell-${r}-${c}`} x={cx(c)} y={cy(r)} w={G.cell} h={G.cell} label={`row ${r} column ${c}`} onPress={() => goCell(r, c)} />;
        })}
        {stage === "ask" && !movesRef.current && !show && <Invite x={cx(cell.c) + G.cell / 2} y={cy(cell.r) + G.cell / 2} r={62} C={C} />}
        {withRead && (
          <g pointerEvents="none">
            <rect x={R.x} y={R.y} width={R.w} height={R.h} rx={RAD.panel} fill="url(#gPanel)" stroke={C.rule} strokeWidth={2} />
            <text x={R.x + R.w / 2} y={R.y + 44} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={C.ink}>{tx("row and column")}</text>
            {readNow && <text x={R.x + R.w / 2} y={R.y + 114} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={C.ink}>{`${tx("row")} ${at.r}`}</text>}
            {readNow && <text x={R.x + R.w / 2} y={R.y + 170} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={C.ink}>{`${tx("column")} ${at.c}`}</text>}
            {named && <text x={R.x + R.w / 2} y={R.y + 236} textAnchor="middle" fontSize={item.kind === "reach" ? T.speech : T.label} fontWeight={700} fill={C.ink}>
              {item.kind === "reach" ? tx(item.answer) : tx("two rows below")}</text>}
          </g>
        )}
      </g>
    );
  };

  const freeArea = () => {
    const M = MODEL.free;
    const e0 = agfPt(M.vx, M.vy, M.arm, open[0]), e1 = agfPt(M.vx, M.vy, M.arm, open[1]);
    const laid = !!(card && card.in);
    const gapLo = Math.min(open[0], open[1] - 90), gapHi = Math.max(open[0], open[1] - 90);
    return (
      <g>
        {armsFigure(M, ["A", "B", "C"], open, true)}
        {laid && Math.abs(open[1] - open[0] - 90) > 2 &&
          <path d={agfWedgePath(M.vx, M.vy, 108, gapLo, gapHi)} fill={AGF_ARC} fillOpacity={0.45} stroke={AGF_ARC} strokeWidth={4} />}
        {laid && Math.abs(open[1] - open[0] - 90) <= 2 && <path d={agfSquarePath(M.vx, M.vy, 40, open[1])} fill="none" stroke={AGF_ARC} strokeWidth={7} />}
        {knob("arm-1", "arm one", e0.x, e0.y, 0)}
        {knob("arm-2", "arm two", e1.x, e1.y, 2)}
        {cardPiece(M, open[1])}
        {gridArea(M.grid, false)}
      </g>
    );
  };

  return (
    <g>
      {kind === "name" || kind === "vertex" ? nameArea() : null}
      {kind === "sort" ? sortArea() : null}
      {kind === "clock" ? clockArea() : null}
      {kind === "move" || kind === "reach" || kind === "say" ? gridArea(MODEL.grid.x, true) : null}
      {free ? freeArea() : null}
    </g>
  );
}

/* the running count: what this phase has settled so far, never a score and never counting down */
function Runs({ phase, index, stage, api, tx = (v: any) => v }: any) {
  const free = stage === "free";
  const ink = (api && api.C && api.C.ink) || "#2B2B2B";
  const done = free ? 0 : Math.min((index || 0) + (stage === "win" || stage === "idle" || stage === "summary" ? 1 : 0), 3);
  const LABEL: any = { 1: "Names built", 2: "Angles sorted", 3: "Clocks read", 4: "Moves made" };
  return (
    <g>
      <text x={18} y={48} fontSize={T.micro} fontWeight={600} fill={ink}>{tx(free ? "Free play" : LABEL[phase.n])}</text>
      {!free && <text x={312} y={50} textAnchor="end" fontSize={T.label} fontWeight={700} fill={ink}>{`${done} / 3`}</text>}
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase */
function Thumb({ result, C, w, h, lang = "en", tx = (v: any) => v }: any) {
  const last = result && result.last;
  if (!last) return null;
  const k = last.kind, v = last.value;
  const mid = h / 2;
  const box = (
    <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
  );
  if (k === "move" || k === "reach" || k === "say") {
    const ps = k === "move" ? slotPartsOf(v, 2) : ["", ""];
    const cell = 14, gx = 14, gy = mid - 28;
    const r = k === "move" ? Number(ps[0]) : 3, c = k === "move" ? Number(ps[1]) : 2;
    return (
      <g>{box}
        {Array.from({ length: 4 }, (_, a) => Array.from({ length: 4 }, (_, b) => (
          <rect key={"" + a + b} x={gx + b * cell} y={gy + a * cell} width={cell} height={cell} fill="none" stroke={C.rule} strokeWidth={1.5} />
        )))}
        <rect x={gx + (c - 1) * cell} y={gy + (r - 1) * cell} width={cell} height={cell} fill={AGF_PT} fillOpacity={0.8} />
        {k === "move" && lang !== "en" ? (
          <g>
            <text x={w - 14} y={mid - 4} textAnchor="end" fontSize={T.micro} fontWeight={700} fill={C.ink}>{`${tx("row")} ${ps[0]}`}</text>
            <text x={w - 14} y={mid + 28} textAnchor="end" fontSize={T.micro} fontWeight={700} fill={C.ink}>{`${tx("column")} ${ps[1]}`}</text>
          </g>
        ) : (
          <text x={w - 14} y={mid + 10} textAnchor="end" fontSize={T.micro} fontWeight={700} fill={C.ink}>{k === "move" ? `row ${ps[0]} col ${ps[1]}` : tx(String(v))}</text>
        )}
      </g>
    );
  }
  if (k === "clock") {
    return (
      <g>{box}
        <circle cx={40} cy={mid} r={26} fill="#FFFFFF" stroke={C.ink} strokeWidth={2} />
        <line x1={40} y1={mid} x2={40} y2={mid - 22} stroke={AGF_FIG} strokeWidth={3} />
        <line x1={40} y1={mid} x2={58} y2={mid + 10} stroke={AGF_FIG} strokeWidth={4} />
        <text x={w - 14} y={mid + 10} textAnchor="end" fontSize={T.micro} fontWeight={700} fill={C.ink}>{tx(String(v))}</text>
      </g>
    );
  }
  if (k === "sort") {
    return (
      <g>{box}
        <line x1={20} y1={mid + 18} x2={76} y2={mid + 18} stroke={AGF_FIG} strokeWidth={4} />
        <line x1={20} y1={mid + 18} x2={64} y2={mid - 18} stroke={AGF_FIG} strokeWidth={4} />
        <circle cx={20} cy={mid + 18} r={5} fill={AGF_PT} />
        <text x={w - 14} y={mid + 10} textAnchor="end" fontSize={T.micro} fontWeight={700} fill={C.ink}>{tx(String(v))}</text>
      </g>
    );
  }
  return (
    <g>{box}
      <line x1={20} y1={mid + 16} x2={72} y2={mid + 16} stroke={AGF_FIG} strokeWidth={4} />
      <line x1={20} y1={mid + 16} x2={58} y2={mid - 20} stroke={AGF_FIG} strokeWidth={4} />
      <circle cx={20} cy={mid + 16} r={6} fill={AGF_PT} />
      <text x={w - 14} y={mid + 10} textAnchor="end" fontSize={T.label} fontWeight={700} fill={C.ink}>{tx(String(v))}</text>
    </g>
  );
}

function AngleAndGridFinder(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work, Runs,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, fitHost: () => null }} />
  );
}

export default AngleAndGridFinder;
