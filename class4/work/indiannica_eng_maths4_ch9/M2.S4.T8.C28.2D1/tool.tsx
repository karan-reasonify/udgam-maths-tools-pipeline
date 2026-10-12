/* ═══ M2.S4.T8.C28.2D1 · solid_workshop · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists: header + its three controls, canvas, slot + pad, bubble + mascot,
   phase dots (user / AI mode), window.toolApi, sounds, the synced voice, scoring, the events,
   idle and restart. NO imports in this file; only the five host hooks. Follow docs/LAYOUT.md.
   Every solid, net and view here is drawn flat on paper: points, polygons and ellipses, no engine. */

const TOOL_ID = "solid_workshop";
const MEDIA_ID = "M2.S4.T8.C28.2D1";
const TOOL_NAME = "Solid Workshop";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
const VOICE = {"rate":0.92,"pitch":1.06};

/* spoken before phase 1's teach lines only (the plan's opening voice line) */
const OPENING = ["A solid on a turntable. What will you count first, faces, edges or corners?"];
/* the whole-tool line: spoken on the summary page */
const FINISH_LINE = "Every part counted under its heading, every base found, every net folded and every view drawn.";
/* said when the child opens Free play from the summary page */
const FREE_LINE = "Free play. Turn any solid you like and count its parts.";

/* Hindi and Gujarati, keyed by the English line exactly (the English everywhere else stays what the
   checks read). NCERT class 4 terms: फलक / સપાટી (face), किनारा / ધાર (edge), शीर्ष / શિરોબિંદુ (vertex),
   कोना / ખૂણો (corner), जाल / જાળ (net), ठोस / ઘન (solid). Digits stay digits. A first draft; wants a
   native speaker's read. */
const TR: any = {
  hi: {
    "Solid Workshop": "ठोस कार्यशाला",
    "A solid on a turntable. What will you count first, faces, edges or corners?": "घूमने वाली मेज़ पर एक ठोस। तुम सबसे पहले क्या गिनोगे: फलक, किनारे या कोने?",
    "Every part counted under its heading, every base found, every net folded and every view drawn.": "हर भाग अपने नाम के नीचे गिना गया, हर आधार मिला। हर जाल मुड़ा और हर दृश्य बना।",
    "Free play. Turn any solid you like and count its parts.": "मुक्त खेल। जो ठोस चाहो घुमाओ और उसके भाग गिनो।",

    "Faces, edges and vertices": "फलक, किनारे और शीर्ष",
    "Spin it round. Count the faces first, then the edges, then the corners.": "इसे घुमाओ। पहले फलक गिनो, फिर किनारे, फिर कोने।",
    "Has every side of the solid been turned to face you?": "क्या ठोस को हर तरफ़ से घुमाकर देखा?",
    "One kind at a time: a flat surface, a line where two faces meet, a sharp point.": "एक-एक प्रकार देखो: चपटी सतह, दो फलक मिलने की रेखा, नुकीला बिंदु।",
    "A face is a surface, an edge is where two faces meet, and a vertex is a corner. A cube has six faces, twelve edges and eight vertices.": "फलक ठोस की एक सतह है। किनारा वह जगह है जहाँ दो फलक मिलते हैं, और शीर्ष एक कोना है। घन में छह फलक, बारह किनारे और आठ शीर्ष होते हैं।",
    "You learned: a cube has six faces, twelve edges and eight corners.": "तुमने सीखा: घन में छह फलक, बारह किनारे और आठ कोने होते हैं।",
    "Count the cube": "घन को गिनो",
    "A die is a cube. How many faces, edges and vertices does it have?": "पासा एक घन है। इसमें कितने फलक, किनारे और शीर्ष हैं?",
    "Turn the cube round and light every part you meet.": "घन को घुमाओ और हर भाग को चमकाओ।",
    "Count the tin": "डिब्बे को गिनो",
    "A tin is a cylinder. Count its faces, its edges and its corners.": "डिब्बा एक बेलन है। उसके फलक, किनारे और कोने गिनो।",
    "Does the curved side count as a face?": "क्या घुमावदार तरफ़ भी एक फलक है?",
    "Count the hat": "टोपी को गिनो",
    "A party hat is a cone. How many of each part has it?": "पार्टी की टोपी एक शंकु है। इसमें हर तरह के कितने भाग हैं?",
    "What about the sharp point at the top?": "ऊपर वाली नुकीली नोक के बारे में क्या?",

    "Prisms and pyramids": "प्रिज़्म और पिरामिड",
    "How many bases does it have? What joins them, or where do its sides meet?": "इसके कितने आधार हैं? उन्हें क्या जोड़ता है, या बगल के फलक कहाँ मिलते हैं?",
    "What shape is the base, and what joins it to the rest?": "आधार किस आकार का है, और उसे बाकी हिस्से से क्या जोड़ता है?",
    "Light the base first, then turn the solid and light every face that is left.": "पहले आधार को चमकाओ, फिर ठोस घुमाओ और बचे हर फलक को चमकाओ।",
    "A prism has two matching bases joined by rectangles, and a square prism is a cube only when its height matches its ends. A pyramid has one base, and its other faces are triangles meeting at a point.": "प्रिज़्म के दो एक जैसे आधार होते हैं, जो आयतों से जुड़े रहते हैं। वर्ग प्रिज़्म तभी घन है, जब उसकी ऊँचाई उसके सिरों के बराबर हो। पिरामिड का एक आधार होता है। बाकी फलक त्रिभुज हैं, जो एक बिंदु पर मिलते हैं।",
    "You learned: a prism has two matching bases, a pyramid has one.": "तुमने सीखा: प्रिज़्म के दो एक जैसे आधार होते हैं, पिरामिड का एक।",
    "Faces in all?": "कुल कितने फलक?",
    "A roof is a pyramid with a square base. How many faces in all?": "एक छत वर्ग आधार वाला पिरामिड है। कुल कितने फलक हैं?",
    "Turn it over. What is the roof standing on?": "इसे पलटो। छत किस पर खड़ी है?",
    "Sort this solid": "इस ठोस को छाँटो",
    "Look at this solid on the bench. Which kind of solid is it?": "मेज़ पर रखे इस ठोस को देखो। यह किस तरह का ठोस है?",
    "Light both ends and see what joins them.": "दोनों सिरे चमकाओ और देखो उन्हें क्या जोड़ता है।",
    "How many faces?": "कितने फलक?",
    "A pyramid has a base with five sides. How many faces does it have?": "एक पिरामिड का आधार पाँच भुजाओं वाला है। उसमें कितने फलक हैं?",
    "Every side of the base sends up one triangle. Count the base too.": "आधार की हर भुजा से एक त्रिभुज ऊपर जाता है। आधार को भी गिनो।",

    "A net folds into a solid": "जाल मुड़कर ठोस बनता है",
    "Fold it up. Does it close, or do two faces land in one place?": "इसे मोड़ो। क्या यह बंद होता है, या दो फलक एक ही जगह आ जाते हैं?",
    "Which squares fold up to make the top and the bottom?": "कौन से वर्ग मुड़कर ऊपर और नीचे का फलक बनाते हैं?",
    "Watch each crease in turn and see where that face comes to rest.": "हर तह को बारी-बारी से देखो और देखो कि वह फलक कहाँ टिकता है।",
    "A net is a flat shape that folds along its edges into a solid, and one solid can have several nets.": "जाल एक समतल आकृति है जो किनारों पर मुड़कर ठोस बन जाती है। एक ठोस के कई जाल हो सकते हैं।",
    "You learned: a net is a flat shape that folds into a solid.": "तुमने सीखा: जाल समतल आकृति है जो मुड़कर ठोस बनती है।",
    "Fold into a cube?": "क्या यह मुड़कर घन बनेगा?",
    "Six squares are cut as one piece. A row of four, with one square above the first and one below the last. Will it fold into a cube?": "छह वर्ग एक ही टुकड़े में कटे हैं। चार की एक पंक्ति, पहले के ऊपर एक वर्ग और आख़िरी के नीचे एक वर्ग। क्या यह मुड़कर घन बनेगा?",
    "Follow the row round the sides. Where do the other two squares land?": "पंक्ति के साथ चारों बगल घूमो। बाकी दो वर्ग कहाँ बैठते हैं?",
    "Will it close?": "क्या यह बंद होगा?",
    "Here are six squares joined in one straight row. Do they fold into a cube?": "यहाँ छह वर्ग एक सीधी पंक्ति में जुड़े हैं। क्या वे मुड़कर घन बनते हैं?",
    "Walk along the row and see how often it passes the same side.": "पंक्ति के साथ चलो। देखो कि वह एक ही तरफ़ से कितनी बार गुज़रती है।",
    "Which solid?": "कौन सा ठोस?",
    "This net is a square with a triangle on each of its four sides. Which solid does it fold into?": "इस जाल में एक वर्ग है और उसकी चारों भुजाओं पर एक-एक त्रिभुज है। यह मुड़कर कौन सा ठोस बनता है?",
    "The square stays flat. Where do the four triangles meet?": "वर्ग समतल रहता है। चारों त्रिभुज कहाँ मिलते हैं?",

    "Top, front and side": "ऊपर, सामने और बगल",
    "Look from the top, then the front, then the side. Each camera sees two of the box's measurements.": "पहले ऊपर से देखो, फिर सामने से, फिर बगल से। हर कैमरा बक्से के दो माप देखता है।",
    "Which two measurements does that camera see?": "वह कैमरा कौन से दो माप देखता है?",
    "Open a camera and watch the guide lines run level from one view to the next.": "कोई कैमरा खोलो। देखो, रेखाएँ एक दृश्य से दूसरे तक एक ही ऊँचाई पर जाती हैं।",
    "A solid looks different from the top, the front and the side, and every view of one solid shares its measurements.": "ठोस ऊपर, सामने और बगल से अलग दिखता है। एक ही ठोस के हर दृश्य में उसके माप एक जैसे रहते हैं।",
    "You learned: the front and side views stand the same height.": "तुमने सीखा: सामने और बगल के दृश्य की ऊँचाई बराबर होती है।",
    "The side view": "बगल का दृश्य",
    "A box is ten centimetres long, four wide and six high. What are the two measurements of its side view?": "एक बक्सा दस सेंटीमीटर लंबा, चार चौड़ा और छह ऊँचा है। उसके बगल के दृश्य के दो माप क्या हैं?",
    "The side camera cannot see how long the box is.": "बगल का कैमरा बक्से की लंबाई नहीं देख सकता।",
    "From the top?": "ऊपर से क्या दिखता है?",
    "This pyramid stands on its base. What shape do you see from straight above?": "यह पिरामिड अपने आधार पर खड़ा है। सीधे ऊपर से तुम्हें कौन सा आकार दिखता है?",
    "Look down on it. What is it standing on?": "इसे ऊपर से देखो। यह किस पर खड़ा है?",
    "Both views share?": "दोनों दृश्यों में क्या एक जैसा?",
    "Open the front camera and the side camera. Which measurement do both views share?": "सामने वाला और बगल वाला कैमरा खोलो। दोनों दृश्यों में कौन सा माप एक जैसा है?",
    "Look along the tops of the two views. Where do they line up?": "दोनों दृश्यों के ऊपरी किनारों को देखो। वे कहाँ एक सीध में आते हैं?",

    "Yes": "हाँ", "No": "नहीं", "yes": "हाँ", "no": "नहीं",
    "cube": "घन", "square pyramid": "वर्ग पिरामिड", "triangular prism": "त्रिभुज प्रिज़्म", "cone": "शंकु",
    "pyramid": "पिरामिड", "prism": "प्रिज़्म",
    "square": "वर्ग", "triangle": "त्रिभुज", "circle": "वृत्त", "rectangle": "आयत",
    "height": "ऊँचाई", "length": "लंबाई", "width": "चौड़ाई", "depth": "गहराई",
    "faces": "फलक", "edges": "किनारे", "corners": "कोने", "across": "आड़ा", "up": "खड़ा", "cm": "सेमी",

    "squares": "वर्ग", "folded": "मुड़े", "views drawn": "बने दृश्य",
    "face": "फलक", "edge": "किनारा", "corner": "कोना", "base": "आधार",
    "Turn": "घुमाओ", "Base light": "आधार चमकाओ", "New solid": "नया ठोस", "Fold": "मोड़ो", "Unfold": "खोलो",
    "top": "ऊपर", "front": "सामने", "side": "बगल",
    "two matching ends": "दो एक जैसे सिरे", "it stays open": "यह खुला रहता है",
    "square prism": "वर्ग प्रिज़्म", "box": "बक्सा", "cylinder": "बेलन",
  },
  gu: {
    "Solid Workshop": "ઘન કાર્યશાળા",
    "A solid on a turntable. What will you count first, faces, edges or corners?": "ફરતા ટેબલ પર એક ઘન. તમે પહેલાં શું ગણશો: સપાટી, ધાર કે ખૂણા?",
    "Every part counted under its heading, every base found, every net folded and every view drawn.": "દરેક ભાગ તેના નામ નીચે ગણ્યો, દરેક આધાર મળ્યો. દરેક જાળ વળી અને દરેક દૃશ્ય દોરાયું.",
    "Free play. Turn any solid you like and count its parts.": "મુક્ત રમત. તમને ગમે તે ઘન ફેરવો અને તેના ભાગ ગણો.",

    "Faces, edges and vertices": "સપાટી, ધાર અને શિરોબિંદુ",
    "Spin it round. Count the faces first, then the edges, then the corners.": "તેને ફેરવો. પહેલાં સપાટી ગણો, પછી ધાર, પછી ખૂણા.",
    "Has every side of the solid been turned to face you?": "શું ઘનને દરેક બાજુથી ફેરવીને જોયો?",
    "One kind at a time: a flat surface, a line where two faces meet, a sharp point.": "એક-એક પ્રકાર જુઓ: સપાટ ભાગ, બે સપાટી મળે તે રેખા, અણીદાર બિંદુ.",
    "A face is a surface, an edge is where two faces meet, and a vertex is a corner. A cube has six faces, twelve edges and eight vertices.": "સપાટી એટલે ઘનનો સપાટ ભાગ. ધાર એટલે જ્યાં બે સપાટી મળે, અને શિરોબિંદુ એટલે ખૂણો. સમઘનમાં છ સપાટી, બાર ધાર અને આઠ શિરોબિંદુ હોય છે.",
    "You learned: a cube has six faces, twelve edges and eight corners.": "તમે શીખ્યા: સમઘનમાં છ સપાટી, બાર ધાર અને આઠ ખૂણા હોય છે.",
    "Count the cube": "સમઘન ગણો",
    "A die is a cube. How many faces, edges and vertices does it have?": "પાસો એક સમઘન છે. તેમાં સપાટી, ધાર અને શિરોબિંદુ કેટલાં છે?",
    "Turn the cube round and light every part you meet.": "સમઘનને ફેરવો અને દરેક ભાગને ચમકાવો.",
    "Count the tin": "ડબ્બો ગણો",
    "A tin is a cylinder. Count its faces, its edges and its corners.": "ડબ્બો એક નળાકાર છે. તેની સપાટી, ધાર અને ખૂણા ગણો.",
    "Does the curved side count as a face?": "શું વળાંકવાળી બાજુ પણ એક સપાટી ગણાય?",
    "Count the hat": "ટોપી ગણો",
    "A party hat is a cone. How many of each part has it?": "પાર્ટીની ટોપી એક શંકુ છે. તેમાં દરેક પ્રકારના કેટલા ભાગ છે?",
    "What about the sharp point at the top?": "ઉપરની અણીદાર ટોચનું શું?",

    "Prisms and pyramids": "પ્રિઝમ અને પિરામિડ",
    "How many bases does it have? What joins them, or where do its sides meet?": "તેના કેટલા આધાર છે? તેમને શું જોડે છે, કે બાજુની સપાટી ક્યાં મળે છે?",
    "What shape is the base, and what joins it to the rest?": "આધાર કયા આકારનો છે, અને તેને બાકીના ભાગ સાથે શું જોડે છે?",
    "Light the base first, then turn the solid and light every face that is left.": "પહેલાં આધારને ચમકાવો, પછી ઘન ફેરવો અને બાકીની દરેક સપાટીને ચમકાવો.",
    "A prism has two matching bases joined by rectangles, and a square prism is a cube only when its height matches its ends. A pyramid has one base, and its other faces are triangles meeting at a point.": "પ્રિઝમના બે સરખા આધાર હોય છે, જે લંબચોરસથી જોડાયેલા હોય છે. ચોરસ પ્રિઝમ સમઘન ત્યારે જ છે, જ્યારે ઊંચાઈ છેડા જેટલી હોય. પિરામિડનો એક આધાર હોય છે. બાકીની સપાટી ત્રિકોણ હોય છે, જે એક બિંદુએ મળે છે.",
    "You learned: a prism has two matching bases, a pyramid has one.": "તમે શીખ્યા: પ્રિઝમના બે સરખા આધાર હોય છે, પિરામિડનો એક.",
    "Faces in all?": "કુલ કેટલી સપાટી?",
    "A roof is a pyramid with a square base. How many faces in all?": "એક છાપરું ચોરસ આધારવાળો પિરામિડ છે. કુલ કેટલી સપાટી છે?",
    "Turn it over. What is the roof standing on?": "તેને ઊંધું કરો. છાપરું શેના પર ઊભું છે?",
    "Sort this solid": "આ ઘનને અલગ પાડો",
    "Look at this solid on the bench. Which kind of solid is it?": "ટેબલ પરના આ ઘનને જુઓ. આ કયા પ્રકારનો ઘન છે?",
    "Light both ends and see what joins them.": "બંને છેડા ચમકાવો અને જુઓ તેમને શું જોડે છે.",
    "How many faces?": "કેટલી સપાટી?",
    "A pyramid has a base with five sides. How many faces does it have?": "એક પિરામિડનો આધાર પાંચ બાજુવાળો છે. તેમાં કેટલી સપાટી છે?",
    "Every side of the base sends up one triangle. Count the base too.": "આધારની દરેક બાજુથી એક ત્રિકોણ ઉપર જાય છે. આધારને પણ ગણો.",

    "A net folds into a solid": "જાળ વળીને ઘન બને છે",
    "Fold it up. Does it close, or do two faces land in one place?": "તેને વાળો. શું તે બંધ થાય છે, કે બે સપાટી એક જ જગ્યાએ આવે છે?",
    "Which squares fold up to make the top and the bottom?": "કયા ચોરસ વળીને ઉપર અને નીચેની સપાટી બનાવે છે?",
    "Watch each crease in turn and see where that face comes to rest.": "દરેક ગડીને એક પછી એક જુઓ અને જુઓ કે તે સપાટી ક્યાં ઠરે છે.",
    "A net is a flat shape that folds along its edges into a solid, and one solid can have several nets.": "જાળ એક સપાટ આકાર છે જે ધાર પર વળીને ઘન બને છે. એક ઘનની ઘણી જાળ હોઈ શકે છે.",
    "You learned: a net is a flat shape that folds into a solid.": "તમે શીખ્યા: જાળ સપાટ આકાર છે જે વળીને ઘન બને છે.",
    "Fold into a cube?": "શું તે વળીને સમઘન બનશે?",
    "Six squares are cut as one piece. A row of four, with one square above the first and one below the last. Will it fold into a cube?": "છ ચોરસ એક જ ટુકડામાં કાપેલા છે. ચારની એક હરોળ, પહેલાની ઉપર એક ચોરસ અને છેલ્લાની નીચે એક ચોરસ. શું તે વળીને સમઘન બનશે?",
    "Follow the row round the sides. Where do the other two squares land?": "હરોળ સાથે ચારેય બાજુ ફરો. બાકીના બે ચોરસ ક્યાં બેસે છે?",
    "Will it close?": "શું તે બંધ થશે?",
    "Here are six squares joined in one straight row. Do they fold into a cube?": "અહીં છ ચોરસ એક સીધી હરોળમાં જોડાયેલા છે. શું તે વળીને સમઘન બને છે?",
    "Walk along the row and see how often it passes the same side.": "હરોળ સાથે ચાલો અને જુઓ કે તે એક જ બાજુ પરથી કેટલી વાર પસાર થાય છે.",
    "Which solid?": "કયો ઘન?",
    "This net is a square with a triangle on each of its four sides. Which solid does it fold into?": "આ જાળમાં એક ચોરસ છે અને તેની ચારેય બાજુ પર એક-એક ત્રિકોણ છે. તે વળીને કયો ઘન બને છે?",
    "The square stays flat. Where do the four triangles meet?": "ચોરસ સપાટ રહે છે. ચારેય ત્રિકોણ ક્યાં મળે છે?",

    "Top, front and side": "ઉપર, સામે અને બાજુ",
    "Look from the top, then the front, then the side. Each camera sees two of the box's measurements.": "પહેલાં ઉપરથી જુઓ, પછી સામેથી, પછી બાજુથી. દરેક કેમેરા પેટીના બે માપ જુએ છે.",
    "Which two measurements does that camera see?": "તે કેમેરા કયા બે માપ જુએ છે?",
    "Open a camera and watch the guide lines run level from one view to the next.": "કોઈ કેમેરા ખોલો. જુઓ, રેખાઓ એક દૃશ્યથી બીજા સુધી એક જ ઊંચાઈએ જાય છે.",
    "A solid looks different from the top, the front and the side, and every view of one solid shares its measurements.": "ઘન ઉપરથી, સામેથી અને બાજુથી અલગ દેખાય છે. એક જ ઘનના દરેક દૃશ્યમાં તેના માપ સરખા રહે છે.",
    "You learned: the front and side views stand the same height.": "તમે શીખ્યા: સામેના અને બાજુના દૃશ્યની ઊંચાઈ સરખી હોય છે.",
    "The side view": "બાજુનું દૃશ્ય",
    "A box is ten centimetres long, four wide and six high. What are the two measurements of its side view?": "એક પેટી દસ સેન્ટિમીટર લાંબી, ચાર પહોળી અને છ ઊંચી છે. તેના બાજુના દૃશ્યના બે માપ કયા છે?",
    "The side camera cannot see how long the box is.": "બાજુનો કેમેરા પેટીની લંબાઈ જોઈ શકતો નથી.",
    "From the top?": "ઉપરથી શું દેખાય?",
    "This pyramid stands on its base. What shape do you see from straight above?": "આ પિરામિડ તેના આધાર પર ઊભો છે. સીધા ઉપરથી તમને કયો આકાર દેખાય છે?",
    "Look down on it. What is it standing on?": "તેને ઉપરથી જુઓ. તે શેના પર ઊભો છે?",
    "Both views share?": "બંને દૃશ્યોમાં શું સરખું?",
    "Open the front camera and the side camera. Which measurement do both views share?": "સામેનો અને બાજુનો કેમેરા ખોલો. બંને દૃશ્યોમાં કયું માપ સરખું છે?",
    "Look along the tops of the two views. Where do they line up?": "બંને દૃશ્યોની ઉપરની કિનારીઓ જુઓ. તે ક્યાં એક લાઈનમાં આવે છે?",

    "Yes": "હા", "No": "ના", "yes": "હા", "no": "ના",
    "cube": "સમઘન", "square pyramid": "ચોરસ પિરામિડ", "triangular prism": "ત્રિકોણ પ્રિઝમ", "cone": "શંકુ",
    "pyramid": "પિરામિડ", "prism": "પ્રિઝમ",
    "square": "ચોરસ", "triangle": "ત્રિકોણ", "circle": "વર્તુળ", "rectangle": "લંબચોરસ",
    "height": "ઊંચાઈ", "length": "લંબાઈ", "width": "પહોળાઈ", "depth": "ઊંડાઈ",
    "faces": "સપાટી", "edges": "ધાર", "corners": "ખૂણા", "across": "આડું", "up": "ઊભું", "cm": "સેમી",

    "squares": "ચોરસ", "folded": "વળ્યા", "views drawn": "દોરેલા દૃશ્ય",
    "face": "સપાટી", "edge": "ધાર", "corner": "ખૂણો", "base": "આધાર",
    "Turn": "ફેરવો", "Base light": "આધાર ચમકાવો", "New solid": "નવો ઘન", "Fold": "વાળો", "Unfold": "ખોલો",
    "top": "ઉપર", "front": "સામે", "side": "બાજુ",
    "two matching ends": "બે સરખા છેડા", "it stays open": "તે ખુલ્લી રહે છે",
    "square prism": "ચોરસ પ્રિઝમ", "box": "પેટી", "cylinder": "નળાકાર",
  },
};

const PHASES = [
  {
    n: 1,
    concept: "Faces, edges and vertices",
    conceptId: "M2.S4.T8.C28", objectiveIds: ["O13"],
    says: ["Spin it round. Count the faces first, then the edges, then the corners."],
    ladder: ["Has every side of the solid been turned to face you?",
      "One kind at a time: a flat surface, a line where two faces meet, a sharp point."],
    closing: "A face is a surface, an edge is where two faces meet, and a vertex is a corner. A cube has six faces, twelve edges and eight vertices.",
    learned: "You learned: a cube has six faces, twelve edges and eight corners.",
    traceback: "The solid turns and every part is lit again, one kind at a time, until the three counts stand at the right numbers.",
    items: [
      /* learn ML1: answer in the plan = Six faces, twelve edges and eight vertices */
      { qid: "M2.S4.T8.C28:ML1", kind: "count", solid: "cube", winMs: 3400,
        parts: [{ label: "faces" }, { label: "edges" }, { label: "corners" }], answer: [6, 12, 8], near: "6|8|12",
        ask: "Count the cube",
        say: "A die is a cube. How many faces, edges and vertices does it have?",
        miss: "Turn the cube round and light every part you meet." },
      /* practice 1: answer in the plan = Three faces, two flat and one curved; two edges; and no vertices */
      { qid: "M2.S4.T8.C28:1", kind: "count", solid: "cylinder", winMs: 3400,
        parts: [{ label: "faces" }, { label: "edges" }, { label: "corners" }], answer: [3, 2, 0], near: "2|2|0",
        ask: "Count the tin",
        say: "A tin is a cylinder. Count its faces, its edges and its corners.",
        miss: "Does the curved side count as a face?" },
      /* practice 2: answer in the plan = Two faces, one curved and one flat; one edge round the rim; one vertex, its tip */
      { qid: "M2.S4.T8.C28:2", kind: "count", solid: "cone", winMs: 3400,
        parts: [{ label: "faces" }, { label: "edges" }, { label: "corners" }], answer: [2, 1, 1], near: "2|1|0",
        ask: "Count the hat",
        say: "A party hat is a cone. How many of each part has it?",
        miss: "What about the sharp point at the top?" },
    ],
  },
  {
    n: 2,
    concept: "Prisms and pyramids",
    conceptId: "M2.S4.T8.C29", objectiveIds: ["O13"],
    says: ["How many bases does it have? What joins them, or where do its sides meet?"],
    ladder: ["What shape is the base, and what joins it to the rest?",
      "Light the base first, then turn the solid and light every face that is left."],
    closing: "A prism has two matching bases joined by rectangles, and a square prism is a cube only when its height matches its ends. A pyramid has one base, and its other faces are triangles meeting at a point.",
    learned: "You learned: a prism has two matching bases, a pyramid has one.",
    traceback: "The base is turned up and lit green, and the face count ends on every face the solid has; on the bench the two matching ends are lit and the solid is set under prism.",
    items: [
      /* learn ML2: answer in the plan = four triangles, so five faces: the square base and four triangles */
      { qid: "M2.S4.T8.C29:ML2", kind: "faces", solid: "pyr4", answer: 5, near: 4, winMs: 3200,
        ask: "Faces in all?",
        say: "A roof is a pyramid with a square base. How many faces in all?",
        miss: "Turn it over. What is the roof standing on?" },
      /* practice 3: answer in the plan = A prism, a square prism; a cube only if its height matches its ends */
      { qid: "M2.S4.T8.C29:3", kind: "sort", solid: "prism4", pad: "enter", answer: "prism", near: "pyramid", winMs: 3400,
        ask: "Sort this solid",
        say: "Look at this solid on the bench. Which kind of solid is it?",
        miss: "Light both ends and see what joins them." },
      /* practice 4: answer in the plan = Six: the five-sided base and five triangles */
      { qid: "M2.S4.T8.C29:4", kind: "faces", solid: "pyr5", answer: 6, near: 5, winMs: 3200,
        ask: "How many faces?",
        say: "A pyramid has a base with five sides. How many faces does it have?",
        miss: "Every side of the base sends up one triangle. Count the base too." },
    ],
  },
  {
    n: 3,
    concept: "A net folds into a solid",
    conceptId: "M2.S4.T8.C30", objectiveIds: ["O14"],
    says: ["Fold it up. Does it close, or do two faces land in one place?"],
    ladder: ["Which squares fold up to make the top and the bottom?",
      "Watch each crease in turn and see where that face comes to rest."],
    closing: "A net is a flat shape that folds along its edges into a solid, and one solid can have several nets.",
    learned: "You learned: a net is a flat shape that folds into a solid.",
    traceback: "The net is folded one crease at a time and the solid it makes is left standing.",
    items: [
      /* learn ML3: answer in the plan = Yes, the row of four makes the sides and the other two the top and bottom */
      { qid: "M2.S4.T8.C30:ML3", kind: "fold", net: "netA", winMs: 5000,
        choices: [{ id: "yes", label: "Yes" }, { id: "no", label: "No" }], answer: "yes", near: "no",
        ask: "Fold into a cube?",
        say: "Six squares are cut as one piece. A row of four, with one square above the first and one below the last. Will it fold into a cube?",
        miss: "Follow the row round the sides. Where do the other two squares land?" },
      /* practice 5: answer in the plan = No; the last two squares land on the first two */
      { qid: "M2.S4.T8.C30:5", kind: "fold", net: "netRow", winMs: 5000,
        choices: [{ id: "yes", label: "Yes" }, { id: "no", label: "No" }], answer: "no", near: "yes",
        ask: "Will it close?",
        say: "Here are six squares joined in one straight row. Do they fold into a cube?",
        miss: "Walk along the row and see how often it passes the same side." },
      /* practice 6: answer in the plan = A square pyramid */
      { qid: "M2.S4.T8.C30:6", kind: "fold", net: "netPyr", winMs: 5000,
        choices: [{ id: "cube", label: "cube" }, { id: "pyramid", label: "square pyramid" },
          { id: "prism", label: "triangular prism" }, { id: "cone", label: "cone" }], answer: "pyramid", near: "cube",
        ask: "Which solid?",
        say: "This net is a square with a triangle on each of its four sides. Which solid does it fold into?",
        miss: "The square stays flat. Where do the four triangles meet?" },
    ],
  },
  {
    n: 4,
    concept: "Top, front and side",
    conceptId: "M2.S4.T8.C31", objectiveIds: ["O14"],
    says: ["Look from the top, then the front, then the side. Each camera sees two of the box's measurements."],
    ladder: ["Which two measurements does that camera see?",
      "Open a camera and watch the guide lines run level from one view to the next."],
    closing: "A solid looks different from the top, the front and the side, and every view of one solid shares its measurements.",
    learned: "You learned: the front and side views stand the same height.",
    traceback: "The cameras open again and the views are drawn at one scale, with the measurement they share written in.",
    items: [
      /* learn ML4: answer in the plan = top ten by four, front ten by six, side four by six */
      { qid: "M2.S4.T8.C31:ML4", kind: "view", solid: "box1", cam: "side", winMs: 3600,
        parts: [{ label: "across", unit: "cm" }, { label: "up", unit: "cm" }], answer: [4, 6], near: "10|6",
        ask: "The side view",
        say: "A box is ten centimetres long, four wide and six high. What are the two measurements of its side view?",
        miss: "The side camera cannot see how long the box is." },
      /* practice 7: answer in the plan = A square, with a line from each corner to the point in the middle */
      { qid: "M2.S4.T8.C31:7", kind: "look", solid: "pyr4", cam: "top", lockCam: "top", winMs: 3600,
        choices: [{ id: "square", label: "square" }, { id: "triangle", label: "triangle" },
          { id: "circle", label: "circle" }, { id: "rectangle", label: "rectangle" }], answer: "square", near: "triangle",
        ask: "From the top?",
        say: "This pyramid stands on its base. What shape do you see from straight above?",
        miss: "Look down on it. What is it standing on?" },
      /* practice 8: answer in the plan = front twelve by eight, side five by eight; they share the height */
      { qid: "M2.S4.T8.C31:8", kind: "share", solid: "box2", cam: "front", winMs: 3600,
        choices: [{ id: "height", label: "height" }, { id: "length", label: "length" },
          { id: "width", label: "width" }, { id: "depth", label: "depth" }], answer: "height", near: "length",
        ask: "Both views share?",
        say: "Open the front camera and the side camera. Which measurement do both views share?",
        miss: "Look along the tops of the two views. Where do they line up?" },
    ],
  },
];

/* The solids, nets and view panes the working area draws (they go into the sidecar too). */
const MODEL = {
  solids: {
    cube: { geo: "cube", s: 112, name: "cube", poses: 5, bases: ["f1p", "f1m"] },
    prism4: { geo: "prism4", s: 100, name: "square prism", poses: 5, bases: ["f1p", "f1m"] },
    pyr4: { geo: "pyr4", s: 100, name: "square pyramid", poses: 4, bases: ["base"] },
    pyr5: { geo: "pyr5", s: 100, name: "pyramid", poses: 4, bases: ["base"] },
    box1: { geo: "box1", s: 20, name: "box", poses: 5, bases: ["f1p", "f1m"], cm: [10, 4, 6] },
    box2: { geo: "box2", s: 20, name: "box", poses: 5, bases: ["f1p", "f1m"], cm: [12, 5, 8] },
    cylinder: { round: "cylinder", s: 100, name: "cylinder", poses: 2 },
    cone: { round: "cone", s: 100, name: "cone", poses: 2 },
  },
  /* a net: [column, row, the face of the solid that square folds on to] */
  nets: {
    netA: { solid: "cube", cols: 4, rows: 3, closes: true,
      cells: [[0, 1, "f1m"], [1, 1, "f0p"], [2, 1, "f1p"], [3, 1, "f0m"], [0, 0, "f2p"], [3, 2, "f2m"]] },
    netRow: { solid: "cube", cols: 6, rows: 1, closes: false,
      cells: [[0, 0, "f1m"], [1, 0, "f0p"], [2, 0, "f1p"], [3, 0, "f0m"], [4, 0, "f1m"], [5, 0, "f0p"]] },
    /* not a question: the cross that folds beside the child's net in phase 3's correction */
    netCross: { solid: "cube", cols: 3, rows: 4, closes: true,
      cells: [[1, 0, "f1m"], [1, 1, "f2m"], [1, 2, "f1p"], [1, 3, "f2p"], [0, 1, "f0m"], [2, 1, "f0p"]] },
    netPyr: { solid: "pyr4", cols: 3, rows: 3, closes: true,
      cells: [[1, 1, "base"], [2, 1, "t0"], [1, 2, "t3"], [0, 1, "t2"], [1, 0, "t1"]] },
  },
  panes: { top: { x: 700, y: 40, w: 360, h: 168 }, front: { x: 700, y: 240, w: 226, h: 220 }, side: { x: 934, y: 240, w: 126, h: 220 } },
  freeSolids: ["cube", "prism4", "pyr4", "pyr5", "cylinder", "cone"],
};

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* judge: is this value right for this item? (numbers compare as numbers) */
const judge = (item: any, v: any) => {
  if (item.parts) return judgeSlotParts(item, v);
  if (typeof item.answer === "number") return leadNumber(v) === item.answer;
  return String(v).trim().toLowerCase() === String(item.answer).trim().toLowerCase();
};

/* A cube rolled over the paper: each square of a net is touched by one face of the cube, so the net
   folds into a cube exactly when the six squares are touched by six different faces. Nothing here is
   shared with judge or the picture (the picture reads the table in MODEL.nets). */
function swRolls(net: any) {
  const at = (c: number, r: number) => c + "," + r;
  const have: any = {};
  net.cells.forEach((c: any) => { have[at(c[0], c[1])] = true; });
  /* the cube's faces in the six places round it: up, down, north, south, east, west */
  const roll: any = {
    e: (s: any[]) => [s[5], s[4], s[2], s[3], s[0], s[1]],
    w: (s: any[]) => [s[4], s[5], s[2], s[3], s[1], s[0]],
    s: (s: any[]) => [s[2], s[3], s[1], s[0], s[4], s[5]],
    n: (s: any[]) => [s[3], s[2], s[0], s[1], s[4], s[5]],
  };
  const step = [[1, 0, "e"], [-1, 0, "w"], [0, 1, "s"], [0, -1, "n"]];
  const seen: any = {}, floor: number[] = [];
  const q: any[] = [[net.cells[0][0], net.cells[0][1], [0, 1, 2, 3, 4, 5]]];
  seen[at(net.cells[0][0], net.cells[0][1])] = true;
  while (q.length) {
    const [c, r, s] = q.shift();
    floor.push(s[1]);
    for (const [dc, dr, k] of step) {
      const key = at(c + dc, r + dr);
      if (!have[key] || seen[key]) continue;
      seen[key] = true;
      q.push([c + dc, r + dr, roll[k](s)]);
    }
  }
  return floor.length === net.cells.length && new Set(floor).size === net.cells.length && net.cells.length === 6;
}

/* oracle: every answer re-derived by a second route that shares no code with judge or Work.
   Counts come from Euler's rule and from the way a pyramid is built, the nets from rolling a cube
   over the paper, and the views from the box's own measurements. */
const oracle = () => {
  const euler = (V: number, F: number) => V + F - 2;
  const pyramidFaces = (sides: number) => sides + 1;
  const box1 = MODEL.solids.box1.cm;
  const want: any = {
    "1.1": [2 * 3, euler(2 * 2 * 2, 2 * 3), 2 * 2 * 2],   /* a cuboid: two faces an axis, two ends an axis */
    "1.2": [3, 2, 0],                                      /* a tin: two flat faces and a curved one, two rims */
    "1.3": [2, 1, 1],                                      /* a hat: one flat face, one curved, one rim, one point */
    "2.1": pyramidFaces(4),
    "2.2": "prism",
    "2.3": pyramidFaces(5),
    "3.1": swRolls(MODEL.nets.netA) ? "yes" : "no",
    "3.2": swRolls(MODEL.nets.netRow) ? "yes" : "no",
    "3.3": "pyramid",
    "4.1": [box1[1], box1[2]],                             /* the side camera sees across and up */
    "4.2": "square",
    "4.3": "height",
  };
  return PHASES.every((p: any, k: number) => p.items.every((it: any, j: number) => {
    const w = want[(k + 1) + "." + (j + 1)];
    if (Array.isArray(w)) return Array.isArray(it.answer) && w.length === it.answer.length && w.every((x: any, i: number) => x === it.answer[i]);
    return String(w) === String(it.answer);
  }));
};

/* the most likely wrong answer (the misconception); judge must reject it */
const nearMiss = (item: any) => (item.near !== undefined ? item.near
  : item.parts ? item.answer.map((x: any, k: number) => (k === item.answer.length - 1 ? x + 1 : x)).join("|")
  : typeof item.answer === "number" ? item.answer + 1 : "~");
/* the forms of an answer that no question, hint or ladder line may print */
const answerForms = (item: any) => (item.parts ? item.answer.filter((x: number) => x >= 10).flatMap((x: number) => [String(x), indian(x), words(x)])
  : typeof item.answer === "number" ? [String(item.answer), indian(item.answer), words(item.answer)]
  : [String(item.answer)]);
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => item.answer;

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => { if (item.pad === "enter" && HOOK.set) HOOK.set(item.answer); return T.submit(item.answer); };
/* the agent's answer() for an item made on the working area: set it as a child would */
const answer = (item: any, v: any) => (item.pad === "enter" && HOOK.set ? HOOK.set(v) : undefined);
/* the agent's check() before Enter; undefined = press Enter */
const check = () => (HOOK.check ? HOOK.check() : undefined);

/* ── solids drawn flat on paper ──────────────────────────────────────────────────────────
   Three numbers a corner (across, up, away), one fixed eye: the right, the top and the front of a
   solid are the sides you can see. A quarter turn or a tip swaps the numbers round, so every face,
   every edge and every corner can be brought to the front. */
const SW_TURN: any[] = [
  (p: any) => ({ u: p.u, v: p.v, w: p.w }),
  (p: any) => ({ u: p.w, v: p.v, w: -p.u }),
  (p: any) => ({ u: -p.u, v: p.v, w: -p.w }),
  (p: any) => ({ u: -p.w, v: p.v, w: p.u }),
  (p: any) => ({ u: p.u, v: -p.w, w: p.v }),
];
const swSeen = (q: any) => q.u + q.v - q.w > 0.0001;
const swXY = (q: any, o: any) => ({ x: o.cx + (q.u + q.w * 0.44) * o.s, y: o.cy - (q.v + q.w * 0.34) * o.s });
const swPts = (a: any[]) => a.map((q) => q.x.toFixed(1) + "," + q.y.toFixed(1)).join(" ");
const swSegD = (p: any, a: any, b: any) => {
  const dx = b.x - a.x, dy = b.y - a.y, L = dx * dx + dy * dy;
  const t = Math.max(0, Math.min(1, L ? ((p.x - a.x) * dx + (p.y - a.y) * dy) / L : 0));
  return Math.hypot(p.x - (a.x + t * dx), p.y - (a.y + t * dy));
};
const swIn = (p: any, poly: any[]) => {
  let on = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const a = poly[i], b = poly[j];
    if ((a.y > p.y) !== (b.y > p.y) && p.x < ((b.x - a.x) * (p.y - a.y)) / (b.y - a.y) + a.x) on = !on;
  }
  return on;
};
const swEllD = (p: any, c: any, rx: number, ry: number) => Math.hypot((p.x - c.x) / rx, (p.y - c.y) / ry);

function swBox(du: number, dv: number, dw: number) {
  const sg = [-1, 1], corners: any[] = [], faces: any[] = [], edges: any[] = [];
  for (const a of sg) for (const b of sg) for (const c of sg)
    corners.push({ id: "v" + a + "_" + b + "_" + c, s: [a, b, c], u: a * du, v: b * dv, w: c * dw });
  const cid = (s: number[]) => "v" + s[0] + "_" + s[1] + "_" + s[2];
  const fid = (ax: number, s: number) => "f" + ax + (s > 0 ? "p" : "m");
  for (let ax = 0; ax < 3; ax++) for (const s of sg) {
    const o = [0, 1, 2].filter((x) => x !== ax);
    const ring = [[-1, -1], [1, -1], [1, 1], [-1, 1]].map((pq) => {
      const t = [0, 0, 0]; t[ax] = s; t[o[0]] = pq[0]; t[o[1]] = pq[1]; return cid(t);
    });
    faces.push({ id: fid(ax, s), ring, n: { u: ax === 0 ? s : 0, v: ax === 1 ? s : 0, w: ax === 2 ? s : 0 } });
  }
  for (let i = 0; i < corners.length; i++) for (let j = i + 1; j < corners.length; j++) {
    const a = corners[i], b = corners[j];
    const diff = [0, 1, 2].filter((k) => a.s[k] !== b.s[k]);
    if (diff.length !== 1) continue;
    edges.push({ id: "e" + a.id + b.id, a: a.id, b: b.id, f: [0, 1, 2].filter((k) => k !== diff[0]).map((k) => fid(k, a.s[k])) });
  }
  return { corners, faces, edges };
}

function swPyr(sides: number, r: number, h: number) {
  const corners: any[] = [], faces: any[] = [], edges: any[] = [];
  for (let k = 0; k < sides; k++) {
    const a = ((-90 + (k * 360) / sides) * Math.PI) / 180;
    corners.push({ id: "b" + k, u: r * Math.cos(a), v: -h / 2, w: r * Math.sin(a) });
  }
  corners.push({ id: "tip", u: 0, v: h / 2, w: 0 });
  faces.push({ id: "base", ring: corners.slice(0, sides).map((c: any) => c.id), n: { u: 0, v: -1, w: 0 } });
  for (let k = 0; k < sides; k++) {
    const p = corners[k], q = corners[(k + 1) % sides];
    const mu = (p.u + q.u) / 2, mw = (p.w + q.w) / 2;
    const A = { u: q.u - p.u, v: 0, w: q.w - p.w }, B = { u: -p.u, v: h, w: -p.w };
    let nn = { u: A.v * B.w - A.w * B.v, v: A.w * B.u - A.u * B.w, w: A.u * B.v - A.v * B.u };
    if (nn.u * mu + nn.w * mw < 0) nn = { u: -nn.u, v: -nn.v, w: -nn.w };
    faces.push({ id: "t" + k, ring: [p.id, q.id, "tip"], n: nn });
    edges.push({ id: "eb" + k, a: p.id, b: q.id, f: ["base", "t" + k] });
    edges.push({ id: "es" + k, a: p.id, b: "tip", f: ["t" + ((k + sides - 1) % sides), "t" + k] });
  }
  return { corners, faces, edges };
}

const SW_GEO: any = {
  cube: swBox(1, 1, 1),
  prism4: swBox(0.62, 1.25, 0.62),
  box1: swBox(5, 3, 2),
  box2: swBox(6, 4, 2.5),
  pyr4: swPyr(4, 1.15, 2),
  pyr5: swPyr(5, 1.15, 2),
};

/* where every point of a solid sits on the paper at this turn, and which sides can be seen */
function swScene(geo: any, pose: number, o: any) {
  const R = SW_TURN[pose % SW_TURN.length];
  const pt: any = {}, vis: any = {}, cs: any = {}, es: any = {}, nr: any = {};
  geo.corners.forEach((c: any) => { pt[c.id] = swXY(R(c), o); });
  geo.faces.forEach((f: any) => { nr[f.id] = R(f.n); vis[f.id] = swSeen(nr[f.id]); });
  geo.corners.forEach((c: any) => { cs[c.id] = geo.faces.some((f: any) => vis[f.id] && f.ring.indexOf(c.id) >= 0); });
  geo.edges.forEach((e: any) => { es[e.id] = e.f.some((x: string) => vis[x]); });
  return { pt, vis, cs, es, nr };
}
const swPoly = (geo: any, sc: any, id: string) => geo.faces.find((f: any) => f.id === id).ring.map((k: string) => sc.pt[k]);

const swLight = (q: any) => {
  const L = Math.hypot(q.u, q.v, q.w) || 1;
  const b = Math.max(0, (q.v * 1 - q.w * 0.45 + q.u * 0.12) / L);
  return 0.72 + 0.22 * b;
};

function swHitPoly(geo: any, sc: any, p: any) {
  let best: any = null, bd = 34;
  geo.corners.forEach((c: any) => {
    if (!sc.cs[c.id]) return;
    const d = Math.hypot(sc.pt[c.id].x - p.x, sc.pt[c.id].y - p.y);
    if (d < bd) { bd = d; best = { kind: "vertex", id: c.id }; }
  });
  if (best) return best;
  bd = 17;
  geo.edges.forEach((e: any) => {
    if (!sc.es[e.id]) return;
    const d = swSegD(p, sc.pt[e.a], sc.pt[e.b]);
    if (d < bd) { bd = d; best = { kind: "edge", id: e.id }; }
  });
  if (best) return best;
  for (const f of geo.faces) if (sc.vis[f.id] && swIn(p, swPoly(geo, sc, f.id))) return { kind: "face", id: f.id };
  return null;
}

/* a tin and a party hat: round solids, drawn with two ellipses and a body, upright or laid over */
function swRoundScene(kind: string, pose: number, o: any) {
  const s = o.s, up = pose % 2 === 0;
  if (up) {
    const rx = 0.76 * s, ry = 0.28 * s, hh = kind === "cylinder" ? 0.9 * s : 0.95 * s;
    return { up, rx, ry, top: { x: o.cx, y: o.cy - hh }, bot: { x: o.cx, y: o.cy + hh }, kind };
  }
  const rx = 0.28 * s, ry = 0.76 * s, hl = kind === "cylinder" ? 0.9 * s : 0.95 * s;
  return { up, rx, ry, top: { x: o.cx - hl, y: o.cy }, bot: { x: o.cx + hl, y: o.cy }, kind };
}
function swRoundHit(r: any, p: any) {
  if (r.kind === "cone") {
    if (Math.hypot(p.x - r.top.x, p.y - r.top.y) < 34) return { kind: "vertex", id: "tip" };
    if (Math.abs(swEllD(p, r.bot, r.rx, r.ry) - 1) < 0.22) return { kind: "edge", id: "rimB" };
    if (!r.up && swEllD(p, r.bot, r.rx, r.ry) < 1) return { kind: "face", id: "base" };
    const tri = r.up ? [r.top, { x: r.bot.x - r.rx, y: r.bot.y }, { x: r.bot.x + r.rx, y: r.bot.y }]
      : [r.top, { x: r.bot.x, y: r.bot.y - r.ry }, { x: r.bot.x, y: r.bot.y + r.ry }];
    if (swIn(p, tri)) return { kind: "face", id: "curved" };
    return null;
  }
  if (Math.abs(swEllD(p, r.top, r.rx, r.ry) - 1) < 0.2) return { kind: "edge", id: "rimT" };
  if (Math.abs(swEllD(p, r.bot, r.rx, r.ry) - 1) < 0.2) return { kind: "edge", id: "rimB" };
  if (r.up && swEllD(p, r.top, r.rx, r.ry) < 1) return { kind: "face", id: "top" };
  if (!r.up && swEllD(p, r.bot, r.rx, r.ry) < 1) return { kind: "face", id: "base" };
  const body = r.up ? { x0: r.top.x - r.rx, x1: r.top.x + r.rx, y0: r.top.y, y1: r.bot.y }
    : { x0: r.top.x, x1: r.bot.x, y0: r.top.y - r.ry, y1: r.top.y + r.ry };
  if (p.x > body.x0 && p.x < body.x1 && p.y > body.y0 && p.y < body.y1) return { kind: "face", id: "curved" };
  return null;
}
const SW_ROUND_PARTS: any = {
  cylinder: { face: ["top", "curved", "base"], edge: ["rimT", "rimB"], vertex: [] },
  cone: { face: ["curved", "base"], edge: ["rimB"], vertex: ["tip"] },
};

/* the content colours of this chapter, and the deeper inks their numerals and words take */
const SW_HUE = { face: CONTENT.one, edge: CONTENT.ten, dot: CONTENT.pointer, line: CONTENT.hundred };
const SW_INK = { face: shade(CONTENT.one, 0.4), edge: shade(CONTENT.ten, 0.5), dot: shade(CONTENT.pointer, 0.3), line: shade(CONTENT.hundred, 0.3) };
const SW_SKY = tint(CONTENT.hundred, 0.55);
/* two faces of a net landing in one place: the same blue, deep enough to see among folded faces */
const SW_CLASH = tint(CONTENT.hundred, 0.38);
const SW_GREY = "#767676";
const SW_KINDS = ["face", "edge", "vertex"];
const swCount = (lit: any) => ({ face: (lit.face || []).length, edge: (lit.edge || []).length, vertex: (lit.vertex || []).length });
const swFresh = (k: number) => ({ pose: 0, lit: { face: [], edge: [], vertex: [] }, shelf: null, squares: [] as any[],
  foldT: 0, cams: [] as any[], demo: null as any, freeK: k });

/* ── the working area: 1086 x 528, origin at its top-left ──────────────────────────────── */
function Work({ phase, n, item, index, stage, wrong, typed, api, MODEL, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();
  const free = stage === "free";
  const [st, setSt] = useState(() => swFresh(0));
  /* the drop the child has made and has not yet had judged: Enter sends that, and nothing else */
  const held = useRef<any>(null);
  /* while a correction (or a win) is playing, the working area takes no act: a child taps the thing
     that is moving, and that must never write into the picture the correction is drawing */
  const frozen = tl.busy;

  const kind = free ? "count" : item.kind || "count";
  const net = !free && item.net ? MODEL.nets[item.net] : null;
  const solidId = free ? MODEL.freeSolids[st.freeK % MODEL.freeSolids.length] : net ? net.solid : item.solid || "cube";
  const def = MODEL.solids[solidId];
  const geo = def.geo ? SW_GEO[def.geo] : null;
  const poses = def.poses || 2;

  /* a fresh screen for every question, and for Free play */
  useEffect(() => { tl.stop(); held.current = null; setSt((s: any) => swFresh(s.freeK)); }, [index, free]);

  /* what is drawn: the child's own work, or the demonstration standing over it after a miss */
  const dm = st.demo;
  const lit = dm && dm.lit ? dm.lit : st.lit;
  const shelf = dm && dm.shelf !== undefined ? dm.shelf : st.shelf;
  const cams = dm && dm.cams ? dm.cams : st.cams;
  const pose = dm && dm.pose !== undefined ? dm.pose : st.pose;
  const cnt = swCount(lit);

  const home = kind === "sort" || kind === "faces" ? { cx: 310, cy: 236, s: def.s }
    : kind === "view" || kind === "look" || kind === "share" ? { cx: 250, cy: 214, s: def.cm ? def.s : def.s * 0.68 }
    : { cx: 340, cy: 232, s: def.s };
  const o = kind === "sort" && shelf ? { cx: shelf === "prism" ? 706 : 946, cy: 268, s: def.s * 0.6 } : home;
  const sc = geo ? swScene(geo, pose, o) : null;
  const rs = geo ? null : swRoundScene(def.round, pose, o);

  /* the child's hand: a tap on a part counts it, a trace along an edge lights that edge */
  const touch = (p: any) => {
    if (frozen || kind === "fold" || kind === "view" || kind === "look" || kind === "share") return;
    const hit = geo ? swHitPoly(geo, sc, p) : swRoundHit(rs, p);
    if (!hit) { setSt((s: any) => ({ ...s, demo: null })); return; }
    setSt((s: any) => {
      const l: any = { face: s.lit.face.slice(), edge: s.lit.edge.slice(), vertex: s.lit.vertex.slice() };
      if (l[hit.kind].indexOf(hit.id) < 0) { l[hit.kind].push(hit.id); api.sfx.tick(); }
      return { ...s, lit: l, demo: null };
    });
  };
  const nextPart = () => {
    if (frozen) return;
    /* the keyboard's way in: the next part of the solid that has not been counted yet */
    const all: any = geo
      ? { face: geo.faces.filter((f: any) => sc.vis[f.id]).map((f: any) => f.id),
          edge: geo.edges.filter((e: any) => sc.es[e.id]).map((e: any) => e.id),
          vertex: geo.corners.filter((c: any) => sc.cs[c.id]).map((c: any) => c.id) }
      : SW_ROUND_PARTS[def.round];
    for (const k of SW_KINDS) {
      const want = (all[k] || []).filter((id: string) => st.lit[k].indexOf(id) < 0 && (geo || swRoundLive(rs, k, id)));
      if (want.length) {
        setSt((s: any) => {
          const l: any = { face: s.lit.face.slice(), edge: s.lit.edge.slice(), vertex: s.lit.vertex.slice() };
          l[k].push(want[0]); return { ...s, lit: l, demo: null };
        });
        api.sfx.tick();
        return;
      }
    }
  };
  const drag = useDrag((pay: any, p: any) => {
    if (frozen) return;
    if (isNaN(p.x)) { if (pay === "solid") nextPart(); else if (pay === "net") tapSquare(-1); return; }
    if (pay === "net") { if (dm) { setSt((s2: any) => ({ ...s2, demo: null })); return; } tapSquare(swNetAt(net, p)); return; }
    if (kind === "sort") {
      const to = p.x > 596 && p.x < 1056 && p.y > 80 && p.y < 400 ? (p.x < 826 ? "prism" : "pyramid") : null;
      if (to) { held.current = to; setSt((s: any) => ({ ...s, shelf: to, demo: null })); api.setTyped(to); api.sfx.tick(); return; }
      /* the answer is the child's own placement: never the one the correction drew on its demo layer */
      if (st.shelf) { held.current = null; setSt((s: any) => ({ ...s, shelf: null, demo: null })); api.setTyped(""); return; }
      if (dm) { setSt((s: any) => ({ ...s, demo: null })); return; }
    }
    touch(p);
  });

  const turn = () => { if (frozen) return; setSt((s: any) => ({ ...s, pose: (s.pose + 1) % poses, demo: null })); api.sfx.tick(); };
  const lightBase = () => {
    if (frozen) return;
    setSt((s: any) => {
      const l: any = { face: s.lit.face.slice(), edge: s.lit.edge.slice(), vertex: s.lit.vertex.slice() };
      (def.bases || []).forEach((b: string) => { if (l.face.indexOf(b) < 0) l.face.push(b); });
      return { ...s, lit: l, demo: null };
    });
    api.sfx.tick();
  };
  const tapSquare = (k: number) => {
    if (frozen) return;
    setSt((s: any) => (k < 0 || s.squares.indexOf(k) >= 0 ? { ...s, demo: null }
      : { ...s, squares: s.squares.concat([k]), demo: null }));
    if (k >= 0) api.sfx.tick();
  };
  const openCam = (id: string) => {
    if (frozen) return;
    setSt((s: any) => ({ ...s, cams: s.cams.indexOf(id) < 0 ? s.cams.concat([id]) : s.cams, demo: null }));
    api.sfx.tick();
  };
  const foldSteps = (demo: boolean, back = false) => {
    const out: any[] = [];
    for (let k = 1; k <= 18; k++) {
      const v = back ? 1 - k / 18 : k / 18;
      out.push([72, () => setSt((s: any) => (demo
        ? { ...s, demo: { ...(s.demo || {}), foldT: v } } : { ...s, foldT: v }))]);
    }
    return out;
  };
  const foldT = dm && dm.foldT !== undefined ? dm.foldT : st.foldT;
  const pairing = !!(dm && dm.pair);

  /* the agent sets a working-area answer the way a child would */
  HOOK.set = (v: any) => {
    if (kind !== "sort") return false;
    const to = String(v).toLowerCase() === "pyramid" ? "pyramid" : "prism";
    held.current = to;
    setSt((s: any) => ({ ...s, shelf: to, demo: null }));
    api.setTyped(to);
    return true;
  };
  /* Enter belongs to the bench: it sends the drop the child has just made, and does nothing at all
     when there is none. A bare Enter after a correction then costs no try and starts no loop (the
     runtime's stale guard lets a pad enter item through, so the tool holds the gate itself). */
  api.onEnter(kind === "sort" ? () => {
    const v = held.current;
    if (!v || frozen) return false;
    held.current = null;
    return api.submit(v);
  } : null);
  /* the driver's near miss writes the slot: keep the bench agreeing with it */
  useEffect(() => {
    if (kind !== "sort") return;
    const v = String(typed || "").toLowerCase();
    if ((v === "prism" || v === "pyramid") && v !== st.shelf) setSt((s: any) => ({ ...s, shelf: v }));
  }, [typed]);

  /* the win: the picture finishes the maths the child has just given */
  useEffect(() => {
    if (stage !== "win") return;
    if (kind === "count" || kind === "faces") {
      const all: any = geo
        ? { face: geo.faces.map((f: any) => f.id), edge: geo.edges.map((e: any) => e.id), vertex: geo.corners.map((c: any) => c.id) }
        : SW_ROUND_PARTS[def.round];
      setSt((s: any) => ({ ...s, demo: null, lit: kind === "faces" ? { ...s.lit, face: all.face } : { face: all.face, edge: all.edge, vertex: all.vertex } }));
    } else if (kind === "fold") tl.run(foldSteps(false));
    else if (kind === "view" || kind === "look" || kind === "share") {
      setSt((s: any) => ({ ...s, demo: null, cams: kind === "share" ? ["front", "side"] : [item.cam] }));
    }
  }, [stage, index]);

  /* the traceback: the maths redrawn in steps, ending on the whole right answer, nothing marked */
  useEffect(() => {
    if (!wrong || stage !== "ask") return;
    api.lock(true);
    const steps: any[] = [];
    const show = (o2: any) => setSt((s: any) => ({ ...s, demo: { ...(s.demo || {}), ...o2 } }));
    if (kind === "count" || kind === "faces") {
      const seq = kind === "faces" ? [0, 2] : geo ? [0, 2, 4].slice(0, poses >= 5 ? 3 : 2) : [0, 1];
      const acc: any = { face: [], edge: [], vertex: [] };
      steps.push([420, () => show({ pose: 0, lit: { face: [], edge: [], vertex: [] } })]);
      seq.forEach((ps) => {
        steps.push([460, () => show({ pose: ps })]);
        const s2 = geo ? swScene(geo, ps, o) : swRoundScene(def.round, ps, o);
        const here: any = geo
          ? { face: geo.faces.filter((f: any) => s2.vis[f.id]).map((f: any) => f.id),
              edge: geo.edges.filter((e: any) => s2.es[e.id]).map((e: any) => e.id),
              vertex: geo.corners.filter((c: any) => s2.cs[c.id]).map((c: any) => c.id) }
          : { face: SW_ROUND_PARTS[def.round].face.filter((id: string) => swRoundLive(s2, "face", id)),
              edge: SW_ROUND_PARTS[def.round].edge.filter((id: string) => swRoundLive(s2, "edge", id)),
              vertex: SW_ROUND_PARTS[def.round].vertex.filter((id: string) => swRoundLive(s2, "vertex", id)) };
        for (const k of SW_KINDS) {
          if (kind === "faces" && k !== "face") continue;
          here[k].forEach((id: string) => {
            if (acc[k].indexOf(id) >= 0 || (kind === "faces" && (def.bases || []).indexOf(id) >= 0)) return;
            acc[k].push(id);
            const snap = { face: acc.face.slice(), edge: acc.edge.slice(), vertex: acc.vertex.slice() };
            steps.push([130, () => show({ lit: snap })]);
          });
        }
      });
      if (kind === "faces") {
        steps.push([500, () => show({ pose: geo && def.bases[0] === "base" ? 4 : 0 })]);
        const snap = { face: acc.face.concat(def.bases || []), edge: [], vertex: [] };
        steps.push([900, () => show({ lit: snap, baseNote: true })]);
      }
      steps.push([900, () => {}]);
    } else if (kind === "sort") {
      const bs = (def.bases || []).slice();
      steps.push([600, () => show({ pose: 0, shelf: null, ends: false, lit: { face: [], edge: [], vertex: [] } })]);
      steps.push([950, () => show({ lit: { face: bs, edge: [], vertex: [] }, ends: true })]);
      steps.push([1150, () => show({ pose: 4 })]);
      steps.push([1050, () => show({ pose: 0, ends: false, shelf: "prism" })]);
      steps.push([900, () => {}]);
    } else if (kind === "fold") {
      /* a net of six squares that is not a cross closes too: the cross folds beside it and both stand */
      const pair = net.closes && net.solid === "cube";
      steps.push([420, () => show({ foldT: 0, label: true, pair })]);
      foldSteps(true).forEach((s2: any) => steps.push(s2));
      steps.push([900, () => {}]);
    } else {
      steps.push([420, () => show({ cams: [], marks: true })]);
      steps.push([700, () => show({ cams: kind === "share" ? ["front"] : [item.cam] })]);
      steps.push([900, () => show({ cams: kind === "share" ? ["front", "side"] : [item.cam] })]);
      steps.push([900, () => {}]);
    }
    tl.run(steps, () => api.lock(false));
  }, [wrong]);

  api.share({ solid: solidId, faces: cnt.face, edges: cnt.edge, vertices: cnt.vertex,
    baseKind: shelf, net: net ? item.net : null, folded: Math.round(foldT * swCreases(net)), views: cams.length });

  /* the running count: faces, edges and corners, always in that order, each under its own heading */
  const outOf = (a: number, b: number) => (lang === "hi" ? b + " में से " + a : lang === "gu" ? b + " માંથી " + a : a + " of " + b);
  const runCells = n === 3
    ? [{ label: "squares", value: String(st.squares.length), ink: SW_INK.line },
       { label: "folded", value: outOf(Math.round(foldT * swCreases(net)), swCreases(net)), ink: SW_INK.edge }]
    : n === 4 && !free
    ? [{ label: "views drawn", value: outOf(cams.length, 3), ink: SW_INK.edge }]
    : [{ label: "faces", value: String(cnt.face), ink: SW_INK.face },
       { label: "edges", value: String(cnt.edge), ink: SW_INK.edge },
       { label: "corners", value: String(cnt.vertex), ink: SW_INK.dot }];
  const quiet = mix(C.ink, "#FFFFFF", 0.2);
  const cw = 330 / runCells.length;

  /* one invite, on the one thing to touch */
  const touched = st.lit.face.length + st.lit.edge.length + st.lit.vertex.length + st.squares.length + st.cams.length + (st.shelf ? 1 : 0);
  const inviteOn = stage === "ask" && !wrong && !touched && !dm;
  let invite: any = null;
  if (inviteOn && (kind === "count" || kind === "faces" || kind === "sort")) {
    const f = geo ? geo.faces.filter((x: any) => sc.vis[x.id])[0] : null;
    const p = f ? swPolyMid(swPoly(geo, sc, f.id)) : rs.up ? rs.top : rs.bot;
    invite = { x: p.x, y: p.y, r: 46 };
  } else if (inviteOn && kind === "fold") {
    const p = swNetMid(net, 0);
    invite = { x: p.x, y: p.y, r: 44 };
  } else if (inviteOn && (kind === "view" || kind === "look" || kind === "share")) {
    const cam = SW_CAM[kind === "look" ? "front" : item.cam];
    invite = { x: cam.x + cam.w / 2, y: cam.y + cam.h / 2, r: 54 };
  }

  const solidPiece = (
    <g className="c4-piece" {...control("solid", "the solid on the turntable")} {...drag.bind("solid")} {...drag.keys("solid")}>
      {geo ? <SwPoly geo={geo} sc={sc} lit={lit} C={C} /> : <SwRound r={rs} lit={lit} C={C} />}
    </g>
  );

  return (
    <g>
      {/* the running count, in the runs zone 94 above the working area */}
      <g data-zone="runs">
        <rect x={0} y={-94} width={330} height={76} rx={RAD.panel} fill="url(#gPanel)" stroke={C.rule} strokeWidth={2} />
        {runCells.map((c: any, k: number) => (
          <g key={c.label}>
            <text x={14 + k * cw} y={-62} fontSize={T.micro} fontWeight={500} fill={quiet}>{tx(c.label)}</text>
            <text x={14 + k * cw} y={-26} fontSize={T.label} fontWeight={700} fill={c.ink}>{c.value}</text>
          </g>
        ))}
      </g>

      {(kind === "count" || kind === "faces" || kind === "sort") && (
        <g>
          <ellipse cx={home.cx} cy={394} rx={176} ry={28} fill={tint(C.panel, 0.3)} stroke={C.rule} strokeWidth={2} />
          {!(kind === "sort" && shelf) && solidPiece}
          {kind !== "sort" && (
            <text x={home.cx} y={56} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={C.ink}>{tx(def.name)}</text>
          )}
          {kind === "sort" && (
            <g>
              {SW_SHELF.map((sh: any) => (
                <g key={sh.id}>
                  <rect x={sh.x} y={sh.y} width={sh.w} height={sh.h} rx={RAD.panel}
                    fill={shelf === sh.id ? tint(SW_HUE.face, 0.86) : tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={2} strokeDasharray="12 10" />
                  <text x={sh.x + sh.w / 2} y={sh.y - 18} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={C.ink}>{tx(sh.id)}</text>
                </g>
              ))}
              {shelf && solidPiece}
            </g>
          )}
          {kind === "sort" && dm && dm.ends && (
            <text x={home.cx} y={424} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={SW_INK.face} pointerEvents="none">{tx("two matching ends")}</text>
          )}
          {dm && dm.baseNote && geo && sc.vis[def.bases[0]] && (
            <text x={swPolyMid(swPoly(geo, sc, def.bases[0])).x} y={swPolyMid(swPoly(geo, sc, def.bases[0])).y + 10}
              textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={C.ink} pointerEvents="none">{tx("base")}</text>
          )}
          {(kind === "count" || (kind === "faces" && !free)) && <SwKey C={C} rows={kind === "faces" ? ["face", "base"] : ["face", "edge", "corner"]} tx={tx} />}
          {free && <SwKey C={C} rows={["face", "edge", "corner"]} tx={tx} />}
          <Key id="turn" label="Turn the solid" x={kind === "count" ? 250 : 150} y={440} w={180} h={76} C={C} onClick={turn}>
            <text y={12} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={C.ink}>{tx("Turn")}</text>
          </Key>
          {(kind === "faces" || kind === "sort") && (
            <Key id="base-light" label="Light the base" x={350} y={440} w={lang === "en" ? 210 : 250} h={76} C={C} onClick={lightBase}>
              <text y={12} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={C.ink}>{tx("Base light")}</text>
            </Key>
          )}
          {free && (
            <Key id="next-solid" label="Another solid" x={450} y={440} w={210} h={76} C={C}
              onClick={() => setSt((s: any) => ({ ...swFresh((s.freeK + 1) % MODEL.freeSolids.length) }))}>
              <text y={12} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={C.ink}>{tx("New solid")}</text>
            </Key>
          )}
        </g>
      )}

      {kind === "fold" && (
        <g>
          <g className="c4-piece" {...control("net", "the net on the bench")} {...drag.bind("net")} {...drag.keys("net")}>
            <SwNet net={net} t={foldT} lit={st.squares} C={C} label={!!(dm && dm.label) || stage === "win"} place={pairing ? SW_PAIR[0] : null} tx={tx} />
          </g>
          {pairing && <g pointerEvents="none"><SwNet net={MODEL.nets.netCross} t={foldT} lit={[]} C={C} label place={SW_PAIR[1]} tx={tx} /></g>}
          <Key id="fold" label={foldT > 0.5 ? "Unfold the net" : "Fold the net"} x={453} y={440} w={180} h={76} C={C}
            disabled={(stage === "ask" && !wrong) || frozen}
            onClick={() => { setSt((s: any) => ({ ...s, demo: null })); tl.run(foldSteps(false, foldT > 0.5)); }}>
            <text y={12} textAnchor="middle" fontSize={T.label} fontWeight={600}
              fill={(stage === "ask" && !wrong) || frozen ? mix(C.ink, C.panel, 0.5) : C.ink}>{tx(foldT > 0.5 ? "Unfold" : "Fold")}</text>
          </Key>
        </g>
      )}

      {(kind === "view" || kind === "look" || kind === "share") && (
        <g>
          <ellipse cx={250} cy={330} rx={150} ry={26} fill={tint(C.panel, 0.3)} stroke={C.rule} strokeWidth={2} />
          {geo ? <SwPoly geo={geo} sc={sc} lit={lit} C={C} /> : null}
          {["top", "front", "side"].map((id: string) => {
            const cam = SW_CAM[id], off = item.lockCam === id && stage === "ask";
            return (
              <Key key={id} id={"cam-" + id} label={"the " + id + " camera"} x={cam.x} y={cam.y} w={cam.w} h={cam.h}
                C={C} disabled={off} onClick={() => openCam(id)}>
                <g>
                  {off ? <line x1={-13} y1={lang === "en" ? -10 : -20} x2={13} y2={lang === "en" ? -10 : -20} stroke={mix(C.ink, C.panel, 0.5)} strokeWidth={3} strokeLinecap="round" />
                    : <circle cx={0} cy={lang === "en" ? -10 : -20} r={13} fill="none" stroke={SW_INK.line} strokeWidth={3} />}
                  <text y={lang === "en" ? 26 : 30} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={off ? mix(C.ink, C.panel, 0.5) : C.ink}>{tx(id)}</text>
                </g>
              </Key>
            );
          })}
          <SwViews C={C} def={def} cams={cams} marks={!!(dm && dm.marks)} item={item} kind={kind} stage={stage} tx={tx} lang={lang} />
          <SwStrip C={C} cm={def.cm} reveal={kind !== "view" || stage !== "ask" || !!dm} tx={tx} lang={lang} />
        </g>
      )}

      {invite && <Invite x={invite.x} y={invite.y} r={invite.r} C={C} />}
    </g>
  );
}

/* the cameras round the box, and the two shelves of the sorting bench */
const SW_CAM: any = { top: { x: 205, y: 30, w: 90, h: 80 }, front: { x: 56, y: 344, w: 100, h: 80 }, side: { x: 388, y: 190, w: 100, h: 80 } };
const SW_SHELF = [{ id: "prism", x: 596, y: 96, w: 220, h: 300 }, { id: "pyramid", x: 836, y: 96, w: 220, h: 300 }];
const SW_NET = { cx: 543, cy: 228, cell: 96 };
/* the two benches of phase 3's correction: the child's net on the left, the cross on the right */
const SW_PAIR = [{ cx: 296, cy: 240, cell: 62, s: 76, ly: 402 }, { cx: 790, cy: 240, cell: 62, s: 76, ly: 402 }];

const swCreases = (net: any) => (net ? net.cells.length - 1 : 1);
const swPolyMid = (poly: any[]) => ({ x: poly.reduce((a, q) => a + q.x, 0) / poly.length, y: poly.reduce((a, q) => a + q.y, 0) / poly.length });
const swRoundLive = (r: any, k: string, id: string) => {
  if (k === "vertex") return true;
  if (id === "curved") return true;
  if (id === "top") return r.up;
  if (id === "base") return !r.up;
  if (id === "rimT") return r.kind === "cylinder";
  return true;
};
const swNetOrigin = (net: any) => ({ x: SW_NET.cx - (net.cols * SW_NET.cell) / 2, y: SW_NET.cy - (net.rows * SW_NET.cell) / 2 });
const swNetAt = (net: any, p: any) => {
  const g = swNetOrigin(net);
  let best = -1;
  net.cells.forEach((c: any, k: number) => {
    const x = g.x + c[0] * SW_NET.cell, y = g.y + c[1] * SW_NET.cell;
    if (p.x >= x && p.x <= x + SW_NET.cell && p.y >= y && p.y <= y + SW_NET.cell) best = k;
  });
  return best;
};
const swNetMid = (net: any, k: number) => {
  const g = swNetOrigin(net), c = net.cells[k];
  return { x: g.x + c[0] * SW_NET.cell + SW_NET.cell / 2, y: g.y + c[1] * SW_NET.cell + SW_NET.cell / 2 };
};

/* a solid drawn flat: hidden edges dashed and grey, a counted face green, an edge amber, a corner a dot */
function SwPoly({ geo, sc, lit, C, k = 1 }: any) {
  const litF = lit.face || [], litE = lit.edge || [], litV = lit.vertex || [];
  const on = (a: string[], id: string) => a.indexOf(id) >= 0;
  return (
    <g>
      {geo.faces.filter((f: any) => sc.vis[f.id]).map((f: any) => (
        <polygon key={f.id} points={swPts(swPoly(geo, sc, f.id))}
          fill={on(litF, f.id) ? SW_HUE.face : tint(SW_HUE.line, swLight(sc.nr[f.id]))}
          fillOpacity={on(litF, f.id) ? 0.5 : 1} stroke="none" />
      ))}
      {/* what is behind the solid, drawn over its faces so it is always there to count: dashed, and
          grey until it is counted, so it reads as hidden even with the colour taken away */}
      {geo.edges.filter((e: any) => !sc.es[e.id]).map((e: any) => (
        <line key={e.id} x1={sc.pt[e.a].x} y1={sc.pt[e.a].y} x2={sc.pt[e.b].x} y2={sc.pt[e.b].y}
          stroke={on(litE, e.id) ? SW_HUE.edge : SW_GREY} strokeWidth={(on(litE, e.id) ? 7 : 3) * k}
          strokeDasharray={10 * k + " " + 9 * k} strokeLinecap="round" />
      ))}
      {geo.edges.filter((e: any) => sc.es[e.id]).map((e: any) => (
        <line key={e.id} x1={sc.pt[e.a].x} y1={sc.pt[e.a].y} x2={sc.pt[e.b].x} y2={sc.pt[e.b].y}
          stroke={on(litE, e.id) ? SW_HUE.edge : SW_HUE.line} strokeWidth={(on(litE, e.id) ? 8 : 4) * k} strokeLinecap="round" />
      ))}
      {geo.corners.filter((c: any) => !sc.cs[c.id]).map((c: any) => (
        <circle key={c.id} cx={sc.pt[c.id].x} cy={sc.pt[c.id].y} r={(on(litV, c.id) ? 10 : 5) * k}
          fill={on(litV, c.id) ? SW_HUE.dot : "#FFFFFF"} stroke={on(litV, c.id) ? shade(SW_HUE.dot, 0.2) : SW_GREY}
          strokeWidth={2.5 * k} strokeDasharray={on(litV, c.id) ? undefined : 4 * k + " " + 4 * k} />
      ))}
      {geo.corners.filter((c: any) => sc.cs[c.id]).map((c: any) => (
        <circle key={c.id} cx={sc.pt[c.id].x} cy={sc.pt[c.id].y} r={(on(litV, c.id) ? 10 : 6) * k}
          fill={on(litV, c.id) ? SW_HUE.dot : "#FFFFFF"} stroke={on(litV, c.id) ? shade(SW_HUE.dot, 0.2) : SW_HUE.line} strokeWidth={3 * k} />
      ))}
    </g>
  );
}

/* a tin or a party hat: the same parts, drawn round */
function SwRound({ r, lit, C, k = 1 }: any) {
  const litF = lit.face || [], litE = lit.edge || [], litV = lit.vertex || [];
  const on = (a: string[], id: string) => a.indexOf(id) >= 0;
  const body = r.up
    ? "M " + (r.top.x - r.rx) + " " + r.top.y + " L " + (r.bot.x - r.rx) + " " + r.bot.y +
      " A " + r.rx + " " + r.ry + " 0 0 0 " + (r.bot.x + r.rx) + " " + r.bot.y +
      " L " + (r.top.x + r.rx) + " " + r.top.y + " Z"
    : "M " + r.top.x + " " + (r.top.y - r.ry) + " L " + r.bot.x + " " + (r.bot.y - r.ry) +
      " A " + r.rx + " " + r.ry + " 0 0 1 " + r.bot.x + " " + (r.bot.y + r.ry) +
      " L " + r.top.x + " " + (r.top.y + r.ry) + " Z";
  const cone = r.kind === "cone";
  const coneBody = r.up
    ? "M " + r.top.x + " " + r.top.y + " L " + (r.bot.x - r.rx) + " " + r.bot.y +
      " A " + r.rx + " " + r.ry + " 0 0 0 " + (r.bot.x + r.rx) + " " + r.bot.y + " Z"
    : "M " + r.top.x + " " + r.top.y + " L " + r.bot.x + " " + (r.bot.y - r.ry) +
      " A " + r.rx + " " + r.ry + " 0 0 1 " + r.bot.x + " " + (r.bot.y + r.ry) + " Z";
  return (
    <g>
      <path d={cone ? coneBody : body} fill={on(litF, "curved") ? SW_HUE.face : tint(SW_HUE.line, 0.84)} fillOpacity={on(litF, "curved") ? 0.5 : 1}
        stroke={SW_HUE.line} strokeWidth={4 * k} strokeLinejoin="round" />
      {!cone && (
        <ellipse cx={r.top.x} cy={r.top.y} rx={r.rx} ry={r.ry}
          fill={on(litF, "top") ? SW_HUE.face : tint(SW_HUE.line, 0.94)} fillOpacity={r.up ? (on(litF, "top") ? 0.55 : 1) : 0.3}
          stroke={on(litE, "rimT") ? SW_HUE.edge : r.up ? SW_HUE.line : SW_GREY} strokeWidth={(on(litE, "rimT") ? 8 : 4) * k}
          strokeDasharray={r.up ? undefined : 10 * k + " " + 9 * k} />
      )}
      <ellipse cx={r.bot.x} cy={r.bot.y} rx={r.rx} ry={r.ry}
        fill={on(litF, "base") ? SW_HUE.face : tint(SW_HUE.line, 0.94)} fillOpacity={r.up ? 0 : on(litF, "base") ? 0.55 : 1}
        stroke={r.up ? (on(litE, "rimB") ? SW_HUE.edge : SW_GREY) : on(litE, "rimB") ? SW_HUE.edge : SW_HUE.line}
        strokeWidth={(on(litE, "rimB") ? (r.up ? 7 : 8) : r.up ? 3 : 4) * k}
        strokeDasharray={r.up ? 10 * k + " " + 9 * k : undefined} />
      {r.up && (
        <path d={"M " + (r.bot.x - r.rx) + " " + r.bot.y + " A " + r.rx + " " + r.ry + " 0 0 0 " + (r.bot.x + r.rx) + " " + r.bot.y}
          fill="none" stroke={on(litE, "rimB") ? SW_HUE.edge : SW_HUE.line} strokeWidth={(on(litE, "rimB") ? 8 : 4) * k} strokeLinecap="round" />
      )}
      {cone && (
        <circle cx={r.top.x} cy={r.top.y} r={(on(litV, "tip") ? 10 : 6) * k} fill={on(litV, "tip") ? SW_HUE.dot : "#FFFFFF"}
          stroke={on(litV, "tip") ? shade(SW_HUE.dot, 0.2) : SW_HUE.line} strokeWidth={3 * k} />
      )}
    </g>
  );
}

/* what to touch: the three kinds of part, each with its own colour */
function SwKey({ C, rows, tx = (v: any) => v }: any) {
  const art: any = {
    face: (x: number, y: number) => <polygon points={swPts([{ x: x - 24, y: y - 16 }, { x: x + 18, y: y - 22 }, { x: x + 24, y: y + 16 }, { x: x - 18, y: y + 22 }])}
      fill={SW_HUE.face} fillOpacity={0.5} stroke={SW_HUE.line} strokeWidth={3} />,
    base: (x: number, y: number) => <polygon points={swPts([{ x: x - 26, y: y + 10 }, { x: x - 6, y: y - 16 }, { x: x + 26, y: y - 10 }, { x: x + 6, y: y + 16 }])}
      fill={SW_HUE.face} fillOpacity={0.5} stroke={SW_HUE.line} strokeWidth={3} />,
    edge: (x: number, y: number) => <line x1={x - 24} y1={y + 12} x2={x + 24} y2={y - 12} stroke={SW_HUE.edge} strokeWidth={9} strokeLinecap="round" />,
    corner: (x: number, y: number) => <circle cx={x} cy={y} r={12} fill={SW_HUE.dot} stroke={shade(SW_HUE.dot, 0.2)} strokeWidth={3} />,
  };
  const ink: any = { face: SW_INK.face, base: SW_INK.face, edge: SW_INK.edge, corner: SW_INK.dot };
  const h = rows.length * 84 + 56;
  return (
    <g pointerEvents="none">
      <rect x={690} y={120} width={366} height={h} rx={RAD.panel} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={2} />
      {rows.map((k: string, i: number) => (
        <g key={k}>
          {art[k](752, 190 + i * 84)}
          <text x={806} y={202 + i * 84} fontSize={T.label} fontWeight={600} fill={ink[k]}>{tx(k)}</text>
        </g>
      ))}
    </g>
  );
}

/* the net bench: flat squares that fold up along their creases into the solid they make */
function SwNet({ net, t, lit, C, label, place, tx = (v: any) => v }: any) {
  const P = place || { cx: SW_NET.cx, cy: SW_NET.cy, cell: SW_NET.cell, s: net.solid === "cube" ? 118 : 104, ly: 424 };
  const cell = P.cell;
  const g = { x: P.cx - (net.cols * cell) / 2, y: P.cy - (net.rows * cell) / 2 };
  const def = MODEL.solids[net.solid], geo = SW_GEO[def.geo];
  const o = { cx: P.cx, cy: P.cy, s: P.s };
  const sc = swScene(geo, 0, o);
  const ease = (x: number) => (x <= 0 ? 0 : x >= 1 ? 1 : x * x * (3 - 2 * x));
  const flatOf = (c: any) => {
    const x = g.x + c[0] * cell, y = g.y + c[1] * cell;
    const sq = [{ x, y }, { x: x + cell, y }, { x: x + cell, y: y + cell }, { x, y: y + cell }];
    if (net.solid !== "pyr4" || c[2] === "base") return sq;
    const ap = cell * 0.87, lo = cell * 0.13;
    if (c[2] === "t0") return [{ x, y }, { x, y: y + cell }, { x: x + ap, y: y + cell / 2 }];
    if (c[2] === "t2") return [{ x: x + cell, y: y + cell }, { x: x + cell, y }, { x: x + lo, y: y + cell / 2 }];
    if (c[2] === "t1") return [{ x: x + cell, y: y + cell }, { x, y: y + cell }, { x: x + cell / 2, y: y + lo }];
    return [{ x, y }, { x: x + cell, y }, { x: x + cell / 2, y: y + ap }];
  };
  const used: any = {};
  const rows = net.cells.map((c: any, k: number) => {
    const flat = flatOf(c);
    let tgt = swPoly(geo, sc, c[2]);
    const clash = !!used[c[2]];
    used[c[2]] = true;
    /* turn the target round so each corner travels to the nearest one: the fold reads as a fold */
    let bestR = 0, bestD = 1e9;
    for (let r = 0; r < tgt.length; r++) {
      let d = 0;
      for (let i = 0; i < flat.length; i++) { const q = tgt[(i + r) % tgt.length]; d += Math.hypot(flat[i].x - q.x, flat[i].y - q.y); }
      if (d < bestD) { bestD = d; bestR = r; }
    }
    tgt = tgt.map((_: any, i: number) => tgt[(i + bestR) % tgt.length]);
    const tk = ease(Math.min(1, Math.max(0, t * (net.cells.length + 1.5) - k)));
    const pts = flat.map((p: any, i: number) => ({ x: p.x + (tgt[i].x - p.x) * tk, y: p.y + (tgt[i].y - p.y) * tk }));
    return { k, pts, clash, tk, seen: sc.vis[c[2]], id: c[2] };
  });
  rows.sort((a: any, b: any) => (a.seen === b.seen ? a.k - b.k : a.seen ? 1 : -1));
  const openFaces = geo.faces.filter((f: any) => sc.vis[f.id] && net.cells.every((c: any) => c[2] !== f.id));
  const done = t > 0.99;
  return (
    <g>
      {done && openFaces.map((f: any) => (
        <polygon key={f.id} points={swPts(swPoly(geo, sc, f.id))} fill="none" stroke={SW_GREY} strokeWidth={3} strokeDasharray="10 9" />
      ))}
      {rows.map((r: any) => (
        <polygon key={r.k} points={swPts(r.pts)}
          fill={r.clash && r.tk > 0.6 ? SW_CLASH : r.tk > 0.55 ? tint(SW_HUE.line, swLight(sc.nr[r.id]))
            : lit.indexOf(r.k) >= 0 ? SW_SKY : "#FFFFFF"}
          fillOpacity={r.clash && r.tk > 0.6 ? 0.95 : r.tk > 0.55 ? 1 : lit.indexOf(r.k) >= 0 ? 0.5 : 0.94}
          stroke={r.clash && r.tk > 0.6 ? shade(CONTENT.hundred, 0.2) : SW_HUE.line}
          strokeWidth={r.clash && r.tk > 0.6 ? 6 : 4} strokeLinejoin="round" />
      ))}
      {done && label && (
        <text x={P.cx} y={P.ly} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={C.ink}>
          {tx(net.closes ? def.name : "it stays open")}
        </text>
      )}
    </g>
  );
}

/* the view window: the top view over the front and side views, all at one scale */
function SwViews({ C, def, cams, marks, item, kind, stage, tx = (v: any) => v, lang = "en" }: any) {
  const P = MODEL.panes, cm = def.cm, k = 17;
  const pyr = !cm;
  const size: any = pyr
    ? { top: [84, 84], front: [84, 78], side: [84, 78] }
    : { top: [cm[0] * k, cm[1] * k], front: [cm[0] * k, cm[2] * k], side: [cm[1] * k, cm[2] * k] };
  const box = (id: string) => {
    const p = P[id], s = size[id];
    return { x: p.x + (p.w - s[0]) / 2, y: p.y + p.h - 26 - s[1], w: s[0], h: s[1] };
  };
  const shown = (id: string) => cams.indexOf(id) >= 0;
  const both = shown("front") && shown("side");
  const fb = box("front"), sb = box("side");
  return (
    <g pointerEvents="none">
      {["top", "front", "side"].map((id: string) => {
        const p = P[id], b = box(id);
        return (
          <g key={id}>
            <rect x={p.x} y={p.y} width={p.w} height={p.h} rx={RAD.panel} fill={tint(C.panel, 0.6)} stroke={C.rule} strokeWidth={2} />
            <text x={p.x + 16} y={p.y + 32} fontSize={T.micro} fontWeight={600} fill={mix(C.ink, "#FFFFFF", 0.2)}>{tx(id)}</text>
            {!shown(id) && <rect x={b.x} y={b.y} width={b.w} height={b.h} rx={6} fill="none" stroke={C.rule} strokeWidth={2.5} strokeDasharray="9 9" />}
            {shown(id) && (
              <g>
                {pyr && id === "top" ? (
                  <g>
                    <rect x={b.x} y={b.y} width={b.w} height={b.h} fill={SW_HUE.face} fillOpacity={0.35} stroke={SW_HUE.line} strokeWidth={4} />
                    <line x1={b.x} y1={b.y} x2={b.x + b.w} y2={b.y + b.h} stroke={SW_HUE.line} strokeWidth={3} />
                    <line x1={b.x + b.w} y1={b.y} x2={b.x} y2={b.y + b.h} stroke={SW_HUE.line} strokeWidth={3} />
                    <circle cx={b.x + b.w / 2} cy={b.y + b.h / 2} r={6} fill={SW_HUE.dot} />
                  </g>
                ) : pyr ? (
                  <polygon points={swPts([{ x: b.x, y: b.y + b.h }, { x: b.x + b.w, y: b.y + b.h }, { x: b.x + b.w / 2, y: b.y }])}
                    fill={SW_HUE.face} fillOpacity={0.35} stroke={SW_HUE.line} strokeWidth={4} strokeLinejoin="round" />
                ) : (
                  <rect x={b.x} y={b.y} width={b.w} height={b.h} fill={SW_HUE.face} fillOpacity={0.35} stroke={SW_HUE.line} strokeWidth={4} />
                )}
              </g>
            )}
          </g>
        );
      })}
      {both && (marks || stage === "win") && (
        <g>
          <line x1={fb.x - 14} y1={fb.y} x2={sb.x + sb.w + 14} y2={sb.y} stroke={C.ink} strokeWidth={2} />
          <line x1={fb.x - 14} y1={fb.y + fb.h} x2={sb.x + sb.w + 14} y2={sb.y + sb.h} stroke={C.ink} strokeWidth={2} />
        </g>
      )}
      {marks && kind === "share" && both && (
        <text x={P.front.x + 8} y={P.front.y + 210} fontSize={T.micro} fontWeight={700} fill={SW_INK.edge}>{tx("height") + " " + cm[2] + " " + tx("cm")}</text>
      )}
      {marks && kind === "view" && shown(item.cam) && (
        <g>
          <text x={sb.x + sb.w / 2} y={sb.y + sb.h + (lang === "en" ? 26 : 20)} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={SW_INK.edge}>{cm[1] + " " + tx("cm")}</text>
          <text x={sb.x + sb.w / 2} y={sb.y - 10} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={SW_INK.edge}>{cm[2] + " " + tx("cm")}</text>
        </g>
      )}
      {marks && kind === "look" && shown("top") && (
        <text x={P.top.x + P.top.w / 2} y={P.top.y + 32} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={SW_INK.face}>{tx("square")}</text>
      )}
    </g>
  );
}

/* the measurements every view of this solid shares */
function SwStrip({ C, cm, reveal, tx = (v: any) => v, lang = "en" }: any) {
  if (!cm) return null;
  const rows = [["length", cm[0]], ["width", cm[1]], ["height", cm[2]]];
  /* Hindi and Gujarati letters stand taller than the lines are apart: the three measures sit side by side */
  const wide = lang !== "en";
  return (
    <g pointerEvents="none">
      <rect x={56} y={434} width={wide ? 620 : 330} height={92} rx={RAD.panel} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={2} />
      {rows.map((r: any, i: number) => (
        <text key={r[0]} x={wide ? 76 + i * 200 : 76} y={wide ? 488 : 462 + i * 28} fontSize={T.micro} fontWeight={600} fill={mix(C.ink, "#FFFFFF", 0.2)}>{reveal ? tx(r[0]) + " " + r[1] + " " + tx("cm") : tx(r[0])}</text>
      ))}
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase */
function Thumb({ result, C, w, h, lang = "en", tx = (v: any) => v }: any) {
  const last = result && result.last;
  if (!last || last.value === null || last.value === undefined) return null;
  const v = tx(Array.isArray(last.value) ? last.value.join(" · ") : String(last.value).split("|").join(" · "));
  const size = v.length > 6 ? T.micro : T.label;
  const views = ["view", "look", "share"].indexOf(last.kind) >= 0;
  const def = MODEL.solids[(last.shared || {}).solid] || MODEL.solids.cube;
  const geo = def.geo ? SW_GEO[def.geo] : null;
  const o = { cx: 40, cy: h / 2, s: def.cm ? 5 : 17 };
  const none = { face: [], edge: [], vertex: [] };
  const by = h / 2 + 15, ht = 26;
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      {views ? (
        <g>
          {/* the front and side views, level along the measurement they share */}
          <line x1={8} y1={by - ht} x2={74} y2={by - ht} stroke={C.ink} strokeWidth={1.5} />
          <rect x={14} y={by - ht} width={32} height={ht} fill={SW_HUE.face} fillOpacity={0.35} stroke={SW_HUE.line} strokeWidth={2.5} />
          <rect x={54} y={by - ht} width={16} height={ht} fill={SW_HUE.face} fillOpacity={0.35} stroke={SW_HUE.line} strokeWidth={2.5} />
        </g>
      ) : geo ? (
        <SwPoly geo={geo} sc={swScene(geo, 0, o)} lit={none} C={C} k={0.42} />
      ) : (
        <SwRound r={swRoundScene(def.round, 0, o)} lit={none} C={C} k={0.42} />
      )}
      <text x={w - 14} y={h / 2 + 11} textAnchor="end" fontSize={size} fontWeight={700} fill={C.ink}>{v}</text>
    </g>
  );
}

function SolidWorkshop(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, fitHost: () => null }} />
  );
}

export default SolidWorkshop;
