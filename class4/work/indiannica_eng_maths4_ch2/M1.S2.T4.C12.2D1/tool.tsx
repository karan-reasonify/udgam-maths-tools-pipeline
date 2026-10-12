/* ═══ M1.S2.T4.C12.2D1 · missing_digit_detective · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists: header + its three controls, canvas, slot + pad, bubble + mascot,
   phase dots (user / AI mode), window.toolApi, sounds, the synced voice, scoring, the events,
   idle and restart. NO imports in this file; only the five host hooks. Follow docs/LAYOUT.md;
   the reference tool is work/indiannica_eng_maths4_ch1/M1.S1.T2.C4.2D1/tool.tsx.
   Edit, never rewrite. Built by `node cli.mjs scaffold`; concepts are verbatim (check compares them). */

const TOOL_ID = "missing_digit_detective";
const MEDIA_ID = "M1.S2.T4.C12.2D1";
const TOOL_NAME = "Missing Digit Detective";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
const VOICE = {"rate":0.92,"pitch":1.06};

/* spoken before phase 1's teach lines only (the plan's opening voice line) */
const OPENING = ["A finished sum with some digits hidden. The ones column is the way in."];
/* the whole-tool line: spoken on the summary page */
const FINISH_LINE = "You found every hidden digit, and then you added the whole thing forwards.";
/* said when the child opens Free play from the summary page (the plan's free-play voice line) */
const FREE_LINE = "Free play. Cover any digits you like, in any sum, and hand it over.";

/* Hindi and Gujarati, keyed by the English line exactly (runtime r13+: `lineFor(line, lang, TR)`); the
   English stays what the checks read. NCERT class 4 terms: इकाई दहाई सैकड़ा हज़ार / એકમ દશક શતક હજાર,
   short headings इ द सै ह / એ દ શ હ, हासिल / વદી (carry), खाना / ખાનું (column). Digits stay digits: the
   runtime speaks them in the language in use. A first draft; wants a native speaker's read. */
const TR: any = {
  hi: {
    "Missing Digit Detective": "गुम अंक जासूस",
    "A finished sum with some digits hidden. The ones column is the way in.": "एक पूरा जोड़, जिसके कुछ अंक छिपे हैं। इकाई का खाना ही रास्ता है।",
    "You found every hidden digit, and then you added the whole thing forwards.": "तुमने हर छिपा अंक ढूँढा, और फिर पूरा जोड़ सीधा करके देखा।",
    "Free play. Cover any digits you like, in any sum, and hand it over.": "मुक्त खेल। किसी भी जोड़ में जो अंक चाहो ढको, और दोस्त को दो।",
    "A column can be read backwards": "खाने को उल्टा भी पढ़ सकते हैं",
    "The answer is showing. Work backwards to the digit that is hidden.": "उत्तर दिख रहा है। उल्टा चलकर छिपे अंक तक पहुँचो।",
    "What does the column have to come to?": "खाने का जोड़ कितना होना चाहिए?",
    "Count on from the digit you can see to the answer digit.": "दिख रहे अंक से उत्तर के अंक तक आगे गिनो।",
    "With the answer and all but one digit of a column known, the missing digit is fixed.": "जब उत्तर और खाने का एक को छोड़कर हर अंक पता हो, तो गुम अंक तय हो जाता है।",
    "You learned: one missing digit in a column has only one digit that fits.": "तुमने सीखा: खाने के गुम अंक की जगह सिर्फ़ एक ही अंक सही बैठता है।",
    "What is the hidden digit?": "छिपा अंक क्या है?",
    "In a ones column, 6 plus a hidden digit gives an answer digit of 9 and nothing is carried. What is the hidden digit?": "इकाई के खाने में 6 और एक छिपा अंक मिलकर 9 देते हैं, और कोई हासिल नहीं है। छिपा अंक क्या है?",
    "What is showing in this column?": "इस खाने में क्या दिख रहा है?",
    "In a ones column, 4 plus a hidden digit gives an answer digit of 9 and nothing is carried. Which digit is hiding?": "इकाई के खाने में 4 और एक छिपा अंक मिलकर 9 देते हैं, और कोई हासिल नहीं है। कौन सा अंक छिपा है?",
    "The answer digit is the total. What is the gap from four up to nine?": "उत्तर का अंक ही जोड़ है। चार से नौ तक कितना अंतर है?",
    "In a hundreds column, a hidden digit plus 2 gives an answer digit of 8 and nothing is carried. Which digit fits there?": "सैकड़े के खाने में एक छिपा अंक और 2 मिलकर 8 देते हैं, और कोई हासिल नहीं है। वहाँ कौन सा अंक बैठता है?",
    "The hidden digit comes first here. What goes with two to make eight?": "यहाँ छिपा अंक पहले आता है। दो के साथ क्या मिलकर आठ बनता है?",
    "Start at the ones here too": "यहाँ भी इकाई से शुरू करो",
    "Start at the ones. Nothing can carry into it.": "इकाई से शुरू करो। उसमें कोई हासिल नहीं आ सकता।",
    "What could be arriving in this column that you do not know about yet?": "इस खाने में ऐसा क्या आ सकता है जो तुम्हें अभी पता नहीं?",
    "Only one column has nothing arriving from its right. Start there.": "सिर्फ़ एक खाने में दाईं ओर से कुछ नहीं आता। वहीं से शुरू करो।",
    "Nothing can carry into the ones column, so it is the only column that can be read on its own.": "इकाई के खाने में कोई हासिल नहीं आ सकता, इसलिए सिर्फ़ उसे ही अकेले पढ़ सकते हैं।",
    "You learned: start at the ones, because nothing can carry into it.": "तुमने सीखा: इकाई से शुरू करो, क्योंकि उसमें कोई हासिल नहीं आता।",
    "Hidden ones digit?": "इकाई का छिपा अंक?",
    "The ones column reads 8 plus a hidden digit and the answer digit is 5. What is the hidden digit, and what else has happened?": "इकाई के खाने में 8 और एक छिपा अंक है, और उत्तर का अंक 5 है। छिपा अंक क्या है, और क्या हुआ है?",
    "Which column is furthest to the right?": "सबसे दाईं ओर कौन सा खाना है?",
    "Which column first?": "पहले कौन सा खाना?",
    "Which column of a hidden digit sum can always be worked out first, and why? Tap it, then press enter.": "छिपे अंकों वाले जोड़ में कौन सा खाना हमेशा पहले हल हो सकता है, और क्यों? उसे टैप करो, फिर एंटर दबाओ।",
    "Which column can nothing be carried into?": "किस खाने में कोई हासिल नहीं आ सकता?",
    "The ones column reads 9 plus a hidden digit and the answer digit is 4. Find the hidden digit, then watch what is carried.": "इकाई के खाने में 9 और एक छिपा अंक है, और उत्तर का अंक 4 है। छिपा अंक ढूँढो, फिर देखो क्या हासिल जाता है।",
    "The answer digit is smaller than nine. What does that tell you?": "उत्तर का अंक नौ से छोटा है। इससे क्या पता चलता है?",
    "A carry explains an answer that looks too small": "हासिल बताता है कि उत्तर छोटा क्यों दिखता है",
    "The answer digit looks too small. Where did the rest of it go?": "उत्तर का अंक बहुत छोटा दिखता है। बाकी कहाँ गया?",
    "What does a column keep when it passes nine?": "नौ से आगे जाने पर खाना क्या रखता है?",
    "Count the whole column. Tie up ten and see what is left.": "पूरा खाना गिनो। दस बाँधो और देखो क्या बचता है।",
    "An answer digit smaller than a digit above it means the column passed nine and a carry left it.": "उत्तर का अंक ऊपर के अंक से छोटा हो, तो खाना नौ से आगे गया और हासिल बाहर गया।",
    "You learned: an answer digit that looks too small means a carry left.": "तुमने सीखा: उत्तर का अंक बहुत छोटा दिखे, तो हासिल बाहर गया है।",
    "What did the column come to?": "खाने का जोड़ कितना हुआ?",
    "In a tens column, 6 and 9 are added with 1 carried in, and the answer digit is 6. Type what the column really came to.": "दहाई के खाने में 6 और 9 को 1 हासिल के साथ जोड़ा, और उत्तर का अंक 6 है। खाने का असली जोड़ लिखो।",
    "Is the answer digit bigger or smaller than the digits above it?": "उत्तर का अंक ऊपर के अंकों से बड़ा है या छोटा?",
    "Can 6 be right?": "क्या 6 सही हो सकता है?",
    "yes, 1 carried": "हाँ, 1 हासिल", "no, a mistake": "नहीं, गलती है",
    "A tens column holds 8 and 7 with 1 carried in, and only a 6 is written below. Is that possible?": "दहाई के खाने में 8 और 7 हैं, 1 हासिल के साथ, और नीचे सिर्फ़ 6 लिखा है। क्या यह हो सकता है?",
    "What do eight, seven and the carried one come to?": "आठ, सात और हासिल का एक मिलकर कितना होता है?",
    "A child says a column adding 6 and 8 cannot have an answer digit of 4. What has the child forgotten? Type the real total of that column.": "एक बच्चा कहता है कि 6 और 8 वाले खाने का उत्तर अंक 4 नहीं हो सकता। वह क्या भूल गया? उस खाने का असली जोड़ लिखो।",
    "Can six and eight fit in one digit?": "क्या छह और आठ एक अंक में आ सकते हैं?",
    "Adding it forwards is the check": "सीधा जोड़ना ही जाँच है",
    "Now add the whole thing forwards. Does it come to the answer that was printed?": "अब पूरा जोड़ सीधा करो। क्या वह छपे हुए उत्तर के बराबर आता है?",
    "What must the total it builds come to?": "बनने वाला जोड़ कितना होना चाहिए?",
    "Add the ones first, then the tens, and carry as you go.": "पहले इकाई जोड़ो, फिर दहाई, और साथ-साथ हासिल ले जाओ।",
    "A digit you found is only right once the whole sum has been added forwards to the printed answer.": "ढूँढा हुआ अंक तभी सही है जब पूरा जोड़ सीधा करने पर छपा उत्तर आए।",
    "You learned: add the sum forwards to check the digits you found.": "तुमने सीखा: ढूँढे अंकों को जाँचने के लिए जोड़ सीधा करो।",
    "Both hidden digits?": "दोनों छिपे अंक?",
    "Find both hidden digits, starting nearer the ones. Then press enter to add the sum forwards.": "दोनों छिपे अंक ढूँढो, इकाई के पास वाले से शुरू करो। फिर जोड़ सीधा करने के लिए एंटर दबाओ।",
    "Which column does the forward check begin at?": "सीधी जाँच किस खाने से शुरू होती है?",
    "Only one digit is hidden here. Find it, then press enter to check.": "यहाँ सिर्फ़ एक अंक छिपा है। उसे ढूँढो, फिर जाँचने के लिए एंटर दबाओ।",
    "What does the column with the card have to come to?": "कार्ड वाले खाने का जोड़ कितना होना चाहिए?",
    "Two digits are hidden again. Find them both, then check the sum forwards.": "फिर से दो अंक छिपे हैं। दोनों ढूँढो, फिर जोड़ सीधा करके जाँचो।",
    "Which hidden digit did you find first?": "तुमने कौन सा छिपा अंक पहले ढूँढा?",
    "Find the other hidden digit too.": "दूसरा छिपा अंक भी ढूँढो।",
    "The ones, because nothing can carry into them.": "इकाई, क्योंकि उसमें कोई हासिल नहीं आ सकता।",
    /* the working area's own words */
    "ones": "इकाई", "tens": "दहाई", "hundreds": "सैकड़ा", "thousands": "हज़ार",
    "O": "इ", "T": "द", "H": "सै", "Th": "ह",
    "cards laid": "रखे कार्ड", "checked": "जाँचे", "lifted": "उठाए", "check": "जाँच", "New sum": "नया जोड़",
    "smaller than both": "दोनों से छोटा",
    "ones first": "पहले इकाई", "yes": "हाँ", "no": "नहीं",
  },
  gu: {
    "Missing Digit Detective": "ખોવાયેલા અંકનો જાસૂસ",
    "A finished sum with some digits hidden. The ones column is the way in.": "એક પૂરો સરવાળો, જેના કેટલાક અંક છુપાયેલા છે. એકમનું ખાનું જ રસ્તો છે.",
    "You found every hidden digit, and then you added the whole thing forwards.": "તમે દરેક છુપાયેલો અંક શોધ્યો, પછી આખો સરવાળો સીધો કરીને જોયો.",
    "Free play. Cover any digits you like, in any sum, and hand it over.": "મુક્ત રમત. કોઈ પણ સરવાળામાં ગમે તે અંક ઢાંકો, અને મિત્રને આપો.",
    "A column can be read backwards": "ખાનું ઊલટું પણ વાંચી શકાય",
    "The answer is showing. Work backwards to the digit that is hidden.": "જવાબ દેખાય છે. ઊલટું ચાલીને છુપાયેલા અંક સુધી પહોંચો.",
    "What does the column have to come to?": "ખાનાનો સરવાળો કેટલો થવો જોઈએ?",
    "Count on from the digit you can see to the answer digit.": "દેખાતા અંકથી જવાબના અંક સુધી આગળ ગણો.",
    "With the answer and all but one digit of a column known, the missing digit is fixed.": "જવાબ અને ખાનાનો એક સિવાયનો દરેક અંક ખબર હોય, તો ખૂટતો અંક નક્કી થઈ જાય છે.",
    "You learned: one missing digit in a column has only one digit that fits.": "તમે શીખ્યા: ખાનાના ખૂટતા અંકની જગ્યાએ ફક્ત એક જ અંક બંધ બેસે છે.",
    "What is the hidden digit?": "છુપાયેલો અંક કયો છે?",
    "In a ones column, 6 plus a hidden digit gives an answer digit of 9 and nothing is carried. What is the hidden digit?": "એકમના ખાનામાં 6 અને એક છુપાયેલો અંક મળીને 9 આપે છે, અને કોઈ વદી નથી. છુપાયેલો અંક કયો છે?",
    "What is showing in this column?": "આ ખાનામાં શું દેખાય છે?",
    "In a ones column, 4 plus a hidden digit gives an answer digit of 9 and nothing is carried. Which digit is hiding?": "એકમના ખાનામાં 4 અને એક છુપાયેલો અંક મળીને 9 આપે છે, અને કોઈ વદી નથી. કયો અંક છુપાયો છે?",
    "The answer digit is the total. What is the gap from four up to nine?": "જવાબનો અંક જ સરવાળો છે. ચારથી નવ સુધી કેટલો તફાવત છે?",
    "In a hundreds column, a hidden digit plus 2 gives an answer digit of 8 and nothing is carried. Which digit fits there?": "શતકના ખાનામાં એક છુપાયેલો અંક અને 2 મળીને 8 આપે છે, અને કોઈ વદી નથી. ત્યાં કયો અંક બેસે છે?",
    "The hidden digit comes first here. What goes with two to make eight?": "અહીં છુપાયેલો અંક પહેલાં આવે છે. બે સાથે શું મળીને આઠ થાય?",
    "Start at the ones here too": "અહીં પણ એકમથી શરૂ કરો",
    "Start at the ones. Nothing can carry into it.": "એકમથી શરૂ કરો. તેમાં કોઈ વદી આવી શકતી નથી.",
    "What could be arriving in this column that you do not know about yet?": "આ ખાનામાં એવું શું આવી શકે જે તમને હજી ખબર નથી?",
    "Only one column has nothing arriving from its right. Start there.": "ફક્ત એક ખાનામાં જમણી બાજુથી કંઈ આવતું નથી. ત્યાંથી શરૂ કરો.",
    "Nothing can carry into the ones column, so it is the only column that can be read on its own.": "એકમના ખાનામાં કોઈ વદી આવી શકતી નથી, તેથી ફક્ત તેને જ એકલું વાંચી શકાય.",
    "You learned: start at the ones, because nothing can carry into it.": "તમે શીખ્યા: એકમથી શરૂ કરો, કારણ કે તેમાં કોઈ વદી આવતી નથી.",
    "Hidden ones digit?": "એકમનો છુપાયેલો અંક?",
    "The ones column reads 8 plus a hidden digit and the answer digit is 5. What is the hidden digit, and what else has happened?": "એકમના ખાનામાં 8 અને એક છુપાયેલો અંક છે, અને જવાબનો અંક 5 છે. છુપાયેલો અંક કયો છે, અને બીજું શું થયું?",
    "Which column is furthest to the right?": "સૌથી જમણી બાજુ કયું ખાનું છે?",
    "Which column first?": "પહેલાં કયું ખાનું?",
    "Which column of a hidden digit sum can always be worked out first, and why? Tap it, then press enter.": "છુપાયેલા અંકવાળા સરવાળામાં કયું ખાનું હંમેશાં પહેલાં ઉકેલી શકાય, અને કેમ? તેને ટેપ કરો, પછી એન્ટર દબાવો.",
    "Which column can nothing be carried into?": "કયા ખાનામાં કોઈ વદી આવી શકતી નથી?",
    "The ones column reads 9 plus a hidden digit and the answer digit is 4. Find the hidden digit, then watch what is carried.": "એકમના ખાનામાં 9 અને એક છુપાયેલો અંક છે, અને જવાબનો અંક 4 છે. છુપાયેલો અંક શોધો, પછી જુઓ શું વદી જાય છે.",
    "The answer digit is smaller than nine. What does that tell you?": "જવાબનો અંક નવથી નાનો છે. તેનાથી શું ખબર પડે છે?",
    "A carry explains an answer that looks too small": "વદી સમજાવે છે કે જવાબ નાનો કેમ દેખાય છે",
    "The answer digit looks too small. Where did the rest of it go?": "જવાબનો અંક બહુ નાનો દેખાય છે. બાકીનું ક્યાં ગયું?",
    "What does a column keep when it passes nine?": "નવથી આગળ જાય ત્યારે ખાનું શું રાખે છે?",
    "Count the whole column. Tie up ten and see what is left.": "આખું ખાનું ગણો. દસ બાંધો અને જુઓ શું વધે છે.",
    "An answer digit smaller than a digit above it means the column passed nine and a carry left it.": "જવાબનો અંક ઉપરના અંકથી નાનો હોય, તો ખાનું નવથી આગળ ગયું અને વદી બહાર ગઈ.",
    "You learned: an answer digit that looks too small means a carry left.": "તમે શીખ્યા: જવાબનો અંક બહુ નાનો દેખાય, તો વદી બહાર ગઈ છે.",
    "What did the column come to?": "ખાનાનો સરવાળો કેટલો થયો?",
    "In a tens column, 6 and 9 are added with 1 carried in, and the answer digit is 6. Type what the column really came to.": "દશકના ખાનામાં 6 અને 9 ને 1 વદી સાથે ઉમેર્યા, અને જવાબનો અંક 6 છે. ખાનાનો ખરો સરવાળો લખો.",
    "Is the answer digit bigger or smaller than the digits above it?": "જવાબનો અંક ઉપરના અંકોથી મોટો છે કે નાનો?",
    "Can 6 be right?": "શું 6 સાચો હોઈ શકે?",
    "yes, 1 carried": "હા, 1 વદી", "no, a mistake": "ના, ભૂલ છે",
    "A tens column holds 8 and 7 with 1 carried in, and only a 6 is written below. Is that possible?": "દશકના ખાનામાં 8 અને 7 છે, 1 વદી સાથે, અને નીચે ફક્ત 6 લખ્યો છે. શું આ શક્ય છે?",
    "What do eight, seven and the carried one come to?": "આઠ, સાત અને વદીનો એક મળીને કેટલા થાય?",
    "A child says a column adding 6 and 8 cannot have an answer digit of 4. What has the child forgotten? Type the real total of that column.": "એક બાળક કહે છે કે 6 અને 8 વાળા ખાનાનો જવાબ અંક 4 ન હોઈ શકે. તે શું ભૂલી ગયું? તે ખાનાનો ખરો સરવાળો લખો.",
    "Can six and eight fit in one digit?": "શું છ અને આઠ એક અંકમાં સમાઈ શકે?",
    "Adding it forwards is the check": "સીધો સરવાળો જ ચકાસણી છે",
    "Now add the whole thing forwards. Does it come to the answer that was printed?": "હવે આખો સરવાળો સીધો કરો. શું તે છાપેલા જવાબ જેટલો થાય છે?",
    "What must the total it builds come to?": "બનતો સરવાળો કેટલો થવો જોઈએ?",
    "Add the ones first, then the tens, and carry as you go.": "પહેલાં એકમ ઉમેરો, પછી દશક, અને સાથે સાથે વદી લઈ જાઓ.",
    "A digit you found is only right once the whole sum has been added forwards to the printed answer.": "શોધેલો અંક ત્યારે જ સાચો છે જ્યારે આખો સરવાળો સીધો કરતાં છાપેલો જવાબ આવે.",
    "You learned: add the sum forwards to check the digits you found.": "તમે શીખ્યા: શોધેલા અંક ચકાસવા સરવાળો સીધો કરો.",
    "Both hidden digits?": "બંને છુપાયેલા અંક?",
    "Find both hidden digits, starting nearer the ones. Then press enter to add the sum forwards.": "બંને છુપાયેલા અંક શોધો, એકમની નજીકનાથી શરૂ કરો. પછી સરવાળો સીધો કરવા એન્ટર દબાવો.",
    "Which column does the forward check begin at?": "સીધી ચકાસણી કયા ખાનાથી શરૂ થાય છે?",
    "Only one digit is hidden here. Find it, then press enter to check.": "અહીં ફક્ત એક અંક છુપાયો છે. તેને શોધો, પછી ચકાસવા એન્ટર દબાવો.",
    "What does the column with the card have to come to?": "કાર્ડવાળા ખાનાનો સરવાળો કેટલો થવો જોઈએ?",
    "Two digits are hidden again. Find them both, then check the sum forwards.": "ફરી બે અંક છુપાયા છે. બંને શોધો, પછી સરવાળો સીધો કરીને ચકાસો.",
    "Which hidden digit did you find first?": "તમે કયો છુપાયેલો અંક પહેલાં શોધ્યો?",
    "Find the other hidden digit too.": "બીજો છુપાયેલો અંક પણ શોધો.",
    "The ones, because nothing can carry into them.": "એકમ, કારણ કે તેમાં કોઈ વદી આવી શકતી નથી.",
    /* the working area's own words */
    "ones": "એકમ", "tens": "દશક", "hundreds": "શતક", "thousands": "હજાર",
    "O": "એ", "T": "દ", "H": "શ", "Th": "હ",
    "cards laid": "મૂકેલાં કાર્ડ", "checked": "તપાસ્યાં", "lifted": "ઉપાડ્યાં", "check": "તપાસ", "New sum": "નવો સરવાળો",
    "smaller than both": "બંનેથી નાનો",
    "ones first": "પહેલાં એકમ", "yes": "હા", "no": "ના",
  },
};

/* ── the sums: place 0 is the ones ─────────────────────────────────────────────────────────── */
const MD_PLACE = ["ones", "tens", "hundreds", "thousands"];
const MD_SHORT = ["O", "T", "H", "Th"];
/* the chapter's content colours: added = deep blue, answer = green, carried = vermilion, missing = amber */
const MD_BLUE = CONTENT.hundred, MD_GREEN = CONTENT.one, MD_VERM = CONTENT.pointer, MD_AMBER = CONTENT.ten;
const MD_INK = { blue: shade(CONTENT.hundred, 0.25), green: shade(CONTENT.one, 0.25), verm: shade(CONTENT.pointer, 0.25), amber: shade(CONTENT.ten, 0.45) };
const mdDig = (v: number, k: number) => Math.floor(v / Math.pow(10, k)) % 10;
/* free play: correct sums the child covers digits of, for a partner */
const MD_FREE = [[4557, 2768], [3675, 2471], [2348, 1527], [4769, 2385], [5638, 1774]];

/* One entry per phase = one mount.
   says    the teach run, said before anything is asked (numbers are turned into words for the voice)
   ladder  rungs 2 and 3 of the hint ladder (rung 1 is each item's own miss line); never the answer
   closing one closing line for this phase, said once when it goes idle
   learned the summary page's row for this phase: "You learned: ..." (at most 72 characters)
   traceback what the working area redraws after a miss, in one line (for the sidecar)
   items   the plan's questions, three a phase.
           kind  col = one column read backwards · sum = a whole sum, the ones card asked · first = tap the
                 column that can be read first · small = a column whose answer digit looks too small ·
                 check = find the cards, then add the sum forwards
           near  the item's misconception (nearMiss) */
const PHASES = [
  {
    n: 1,
    concept: "A column can be read backwards",
    conceptId: "M1.S2.T4.C12", objectiveIds: ["O5"],
    says: ["The answer is showing. Work backwards to the digit that is hidden."],
    /* tries, as the plan writes it: first rung the item's miss line; second the phase's; third the column's
       known digit and its answer drawn in tokens (that picture is the traceback) */
    ladder: ["What does the column have to come to?", "Count on from the digit you can see to the answer digit."],
    closing: "With the answer and all but one digit of a column known, the missing digit is fixed.",
    learned: "You learned: one missing digit in a column has only one digit that fits.",
    traceback: "The strip opens under the column: the seen digit in tokens beside the tokens the answer calls for, and the gap is counted out until the column reads right.",
    items: [
      /* learn ML1: answer in the plan = 3 */
      { qid: "M1.S2.T4.C12:ML1", kind: "col", k: 0, a: 6, b: null, cin: 0, s: 9, answer: 3, near: 9, winMs: 2800, ask: "What is the hidden digit?",
        say: "In a ones column, 6 plus a hidden digit gives an answer digit of 9 and nothing is carried. What is the hidden digit?", miss: "What is showing in this column?" },
      /* practice 1: answer in the plan = 5 */
      { qid: "M1.S2.T4.C12:1", kind: "col", k: 0, a: 4, b: null, cin: 0, s: 9, answer: 5, near: 9, winMs: 2800, ask: "What is the hidden digit?",
        say: "In a ones column, 4 plus a hidden digit gives an answer digit of 9 and nothing is carried. Which digit is hiding?", miss: "The answer digit is the total. What is the gap from four up to nine?" },
      /* practice 2: answer in the plan = 6 */
      { qid: "M1.S2.T4.C12:2", kind: "col", k: 2, a: null, b: 2, cin: 0, s: 8, answer: 6, near: 8, winMs: 2800, ask: "What is the hidden digit?",
        say: "In a hundreds column, a hidden digit plus 2 gives an answer digit of 8 and nothing is carried. Which digit fits there?", miss: "The hidden digit comes first here. What goes with two to make eight?" },
    ],
  },
  {
    n: 2,
    concept: "Start at the ones here too",
    conceptId: "M1.S2.T4.C13", objectiveIds: ["O5"],
    says: ["Start at the ones. Nothing can carry into it."],
    ladder: ["What could be arriving in this column that you do not know about yet?", "Only one column has nothing arriving from its right. Start there."],
    closing: "Nothing can carry into the ones column, so it is the only column that can be read on its own.",
    learned: "You learned: start at the ones, because nothing can carry into it.",
    traceback: "The ones column is counted out in tokens: ten tie and walk into the circle above the tens, what is left is the answer digit, and the gap shows the digit that fits.",
    items: [
      /* learn ML2: answer in the plan = 7, and 1 ten has been carried into the tens column (the carry flies up on the win) */
      { qid: "M1.S2.T4.C13:ML2", kind: "sum", A: 2348, B: 1527, S: 3875, cover: ["b0", "a1", "b2"], answer: 7, near: 3, winMs: 3200, ask: "Hidden ones digit?",
        say: "The ones column reads 8 plus a hidden digit and the answer digit is 5. What is the hidden digit, and what else has happened?", miss: "Which column is furthest to the right?" },
      /* practice 3: answer in the plan = the ones column, because nothing can carry into it. Made on the working
         area: the child taps the column (pad "enter") */
      { qid: "M1.S2.T4.C13:3", kind: "first", A: 4769, B: 2385, S: 7154, cover: ["a0", "b1", "a2"], answer: "ones", near: "hundreds", pad: "enter", winMs: 4000, ask: "Which column first?",
        say: "Which column of a hidden digit sum can always be worked out first, and why? Tap it, then press enter.", miss: "Which column can nothing be carried into?" },
      /* practice 4: answer in the plan = 5, and 1 ten is carried, because 9 + 5 = 14 (the carry flies up on the win) */
      { qid: "M1.S2.T4.C13:4", kind: "sum", A: 3529, B: 1645, S: 5174, cover: ["b0", "a1", "b2"], answer: 5, near: 4, winMs: 3200, ask: "Hidden ones digit?",
        say: "The ones column reads 9 plus a hidden digit and the answer digit is 4. Find the hidden digit, then watch what is carried.", miss: "The answer digit is smaller than nine. What does that tell you?" },
    ],
  },
  {
    n: 3,
    concept: "A carry explains an answer that looks too small",
    conceptId: "M1.S2.T4.C14", objectiveIds: ["O6"],
    says: ["The answer digit looks too small. Where did the rest of it go?"],
    ladder: ["What does a column keep when it passes nine?", "Count the whole column. Tie up ten and see what is left."],
    closing: "An answer digit smaller than a digit above it means the column passed nine and a carry left it.",
    learned: "You learned: an answer digit that looks too small means a carry left.",
    traceback: "The column is filled with its tokens, the carried one included: ten tie and walk left into the next circle, and what is left is the printed answer digit.",
    items: [
      /* learn ML3: answer in the plan = The column came to 16, so 6 was written and 1 hundred was carried */
      { qid: "M1.S2.T4.C14:ML3", kind: "small", k: 1, a: 6, b: 9, cin: 1, s: 6, answer: 16, near: 15, winMs: 3600, ask: "What did the column come to?",
        say: "In a tens column, 6 and 9 are added with 1 carried in, and the answer digit is 6. Type what the column really came to.", miss: "Is the answer digit bigger or smaller than the digits above it?" },
      /* practice 5: answer in the plan = Yes. The column comes to 16, so 6 is written and 1 hundred is carried */
      { qid: "M1.S2.T4.C14:5", kind: "small", k: 1, a: 8, b: 7, cin: 1, s: 6, answer: "yes", near: "no", winMs: 3600, ask: "Can 6 be right?",
        choices: [{ id: "yes", label: "yes, 1 carried" }, { id: "no", label: "no, a mistake" }],
        say: "A tens column holds 8 and 7 with 1 carried in, and only a 6 is written below. Is that possible?", miss: "What do eight, seven and the carried one come to?" },
      /* practice 6: answer in the plan = That the column comes to 14, so 4 is written and 1 is carried out of the column into the next one */
      { qid: "M1.S2.T4.C14:6", kind: "small", k: 0, a: 6, b: 8, cin: 0, s: 4, answer: 14, near: 4, winMs: 3600, ask: "What did the column come to?",
        say: "A child says a column adding 6 and 8 cannot have an answer digit of 4. What has the child forgotten? Type the real total of that column.", miss: "Can six and eight fit in one digit?" },
    ],
  },
  {
    n: 4,
    concept: "Adding it forwards is the check",
    conceptId: "M1.S2.T4.C15", objectiveIds: ["O6"],
    says: ["Now add the whole thing forwards. Does it come to the answer that was printed?"],
    ladder: ["What must the total it builds come to?", "Add the ones first, then the tens, and carry as you go."],
    closing: "A digit you found is only right once the whole sum has been added forwards to the printed answer.",
    learned: "You learned: add the sum forwards to check the digits you found.",
    traceback: "The sum is added forwards with the child's digits and the first column that parts is lit amber; then the right digits go on the cards and every column agrees.",
    items: [
      /* learn ML4: answer in the plan = the tens digit of the first number is 5 and the hundreds digit of the second is 7,
         so 4557 + 2768 = 7325. The digits are typed onto the cards from the ones leftwards: "5, 7" */
      { qid: "M1.S2.T4.C15:ML4", kind: "check", A: 4557, B: 2768, S: 7325, cover: ["a1", "b2"], answer: "5, 7", near: "6, 8", winMs: 4400, ask: "Both hidden digits?",
        say: "Find both hidden digits, starting nearer the ones. Then press enter to add the sum forwards.", miss: "Which column does the forward check begin at?" },
      /* practice 7: answer in the plan = 7, and adding 3675 + 2471 forwards gives 6146 */
      { qid: "M1.S2.T4.C15:7", kind: "check", A: 3675, B: 2471, S: 6146, cover: ["a1"], answer: 7, near: 4, winMs: 4400, ask: "What is the hidden digit?",
        say: "Only one digit is hidden here. Find it, then press enter to check.", miss: "What does the column with the card have to come to?" },
      /* practice 8: answer in the plan = the hundreds digit of the first number is 6 and the tens digit of the second is 7,
         so 5638 + 1774 = 7412. Typed from the ones leftwards: "7, 6" */
      { qid: "M1.S2.T4.C15:8", kind: "check", A: 5638, B: 1774, S: 7412, cover: ["a2", "b1"], answer: "7, 6", near: "8, 7", winMs: 4400, ask: "Both hidden digits?",
        say: "Two digits are hidden again. Find them both, then check the sum forwards.", miss: "Which hidden digit did you find first?" },
    ],
  },
];

/* The numbers, rows, sizes and targets the working area needs (they go into the sidecar too). */
const MODEL = {
  columnWidth: 120, headings: MD_SHORT, places: MD_PLACE,
  mat: { x: 143, y: 0, w: 800, h: 322 }, strip: { x: 0, y: 336, w: 1086, h: 128 },
  colours: { added: "deep blue", answer: "green", carried: "vermilion", missing: "amber" },
  order: "cards are found from the ones leftwards; each carry sits in the circle above the column it goes into",
  freeSums: MD_FREE.map(([a, b]) => ({ a, b, sum: a + b })),
};

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* judge: digits typed onto the cards compare digit for digit, in the order they are found; numbers as numbers */
const judge = (item: any, v: any) => {
  if (item.kind === "check") return String(v ?? "").replace(/\D/g, "") === String(item.answer).replace(/\D/g, "");
  if (typeof item.answer === "number") return leadNumber(v) === item.answer;
  return String(v ?? "").trim().toLowerCase() === String(item.answer).trim().toLowerCase();
};
/* oracle: every answer re-derived by arithmetic on the sum itself (no code shared with judge or Work) */
const oracle = () => PHASES.every((p: any) => p.items.every((it: any) => {
  if (it.kind === "col") { const seen = it.a === null ? it.b : it.a; return seen + it.answer + it.cin === it.s; }
  if (it.kind === "sum") {
    const hidden = it.cover.includes("a0") ? it.A % 10 : it.B % 10, seen = it.cover.includes("a0") ? it.B % 10 : it.A % 10;
    return it.A + it.B === it.S && hidden === it.answer && (seen + it.answer) % 10 === it.S % 10 && seen + it.answer > 9;
  }
  if (it.kind === "first") return it.A + it.B === it.S && it.answer === "ones";
  if (it.kind === "small") {
    const total = it.cin + it.a + it.b;
    return typeof it.answer === "number" ? it.answer === total && total % 10 === it.s && total > 9 : it.answer === (total % 10 === it.s ? "yes" : "no");
  }
  if (it.kind === "check") {
    if (it.A + it.B !== it.S) return false;
    const sa = String(it.A), sb = String(it.B);
    const found = it.cover.slice().sort((x: string, y: string) => Number(x[1]) - Number(y[1]))
      .map((c: string) => (c[0] === "a" ? sa : sb)[(c[0] === "a" ? sa : sb).length - 1 - Number(c[1])]);
    return found.join(", ") === String(it.answer);
  }
  return false;
}));
/* the most likely wrong answer (the item's misconception); judge must reject it */
const nearMiss = (item: any) => (item.near !== undefined ? item.near : typeof item.answer === "number" ? item.answer + 1 : "~");
/* the forms of an answer that no question, hint or ladder line may print.
   "first": the teach line states the rule (the plan's own words), and the question asks the child to apply it
   by tapping the column on a fresh sum, so its answer word is not a giveaway form */
const answerForms = (item: any) =>
  item.kind === "first" ? []
    : typeof item.answer === "number" ? [String(item.answer), indian(item.answer), words(item.answer)] : [String(item.answer)];
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => item.answer;

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => (T.state().stage === "demo" ? HOOK.demo && HOOK.demo() : T.submit(item.answer));
/* the agent's answer() for an item made on the working area: set it as a child would; undefined = type it */
const answer = (item: any, v: any) => (item.pad === "enter" && HOOK.set ? HOOK.set(v) : undefined);
/* the agent's check() before Enter: e.g. drop a token that waits; undefined = press Enter */
const check = () => (HOOK.check ? HOOK.check() : undefined);

/* the slot shows digits typed onto two cards as "5, 7" (read by Work each render) */
const MD_NOW: any = { need: 1 };
const format = (t: any) => {
  const s = String(t ?? ""), d = s.replace(/\D/g, "");
  return MD_NOW.need > 1 && d.length > 1 && /^[\d,\s]+$/.test(s) ? d.split("").join(", ") : s;
};

/* ── the working area: 1086 x 528, origin at its top-left ──────────────────────────────────── */

/* one sum, set up for the mat. Hidden digits are known here but never drawn before they are found. */
const mdSetup = (it: any) => {
  const kind = it.kind || "free";
  const one = kind === "col" || kind === "small";
  const places = kind === "small" ? [it.k + 1, it.k] : kind === "col" ? [it.k] : [3, 2, 1, 0];
  const a: any = {}, b: any = {}, s: any = {};
  if (one) {
    a[it.k] = it.a === null ? it.answer : it.a;
    b[it.k] = it.b === null ? it.answer : it.b;
    s[it.k] = it.s;
  } else {
    const A = kind === "free" ? MD_FREE[it.fi || 0][0] : it.A, B = kind === "free" ? MD_FREE[it.fi || 0][1] : it.B;
    const S = kind === "free" ? A + B : it.S;
    for (let k = 0; k < 4; k++) { a[k] = mdDig(A, k); b[k] = mdDig(B, k); s[k] = mdDig(S, k); }
  }
  const cover: string[] = one ? (it.a === null ? ["a" + it.k] : it.b === null ? ["b" + it.k] : []) : (it.cover || []).slice();
  cover.sort((x, y) => Number(x[1]) - Number(y[1])); /* the order the cards are found in: from the ones leftwards */
  const kn: any = {}; /* carries known, into place k */
  const settled: number[] = [];
  if (kind === "col" && it.k > 0) kn[it.k] = it.cin || 0;
  if (kind === "small" && it.k > 0) kn[it.k] = it.cin;
  if (kind === "check") {
    let c = 0;
    for (let k = 0; k < 4 && !cover.some((x) => Number(x[1]) === k); k++) { c = Math.floor((c + a[k] + b[k]) / 10); kn[k + 1] = c; settled.push(k); }
  }
  return { kind, k: one ? it.k : 0, places, a, b, s, cover, kn, settled, wide: one };
};

/* the mat, centred on the working area: a sign column, then the columns, thousands to ones */
const mdLay = (places: number[], wide: boolean) => {
  const cw = wide ? 160 : 120, pad = wide ? 40 : 120, sign = 80;
  const width = pad * 2 + sign + places.length * cw;
  const x0 = Math.round(543 - width / 2);
  const colX: any = {};
  places.forEach((k, i) => { colX[k] = x0 + pad + sign + i * cw; });
  return { cw, x0, width, colX, signX: x0 + pad, right: x0 + pad + sign + places.length * cw };
};
const MD_ROW: any = { a: 126, b: 198, s: 280 };
const MD_TOK = { x: 620, p: 40, y0: 374, y1: 426, one: 400, r: 17 };
const MD_TW: any = { d: 48, op: 48, gap: 78, box: 52, tot: 86 };

const MD_CSS = `
.md-lift{transition:transform 340ms ease-out;transform-box:fill-box;transform-origin:center}
.md-move{transition:transform 520ms cubic-bezier(.3,.7,.25,1)}
.md-in{animation:mdIn 360ms ease-out both}
@keyframes mdIn{from{opacity:0}to{opacity:1}}
.md-tie{stroke-dasharray:900;stroke-dashoffset:900;animation:mdTie 380ms ease-out forwards}
@keyframes mdTie{to{stroke-dashoffset:0}}
@media (prefers-reduced-motion:reduce){.md-lift,.md-move{transition:none}.md-in,.md-tie{animation:none}.md-tie{stroke-dashoffset:0}}
`;

/* a cover card laid on a digit, with a lift tab at its corner; the child's digit is pencilled on it in amber */
function MdCard({ x, y, C, digit, lit, lifting }: any) {
  const w = 96, h = 62, x0 = x - w / 2, y0 = y - h / 2;
  return (
    <g className="md-lift" style={{ transform: lifting ? "translate(12px,-44px) rotate(-9deg)" : "none" } as any} pointerEvents="none">
      <rect x={x0} y={y0} width={w} height={h} rx={10} fill={C.panel} stroke={lit ? MD_AMBER : shade(C.rule, 0.3)} strokeWidth={lit ? 5 : 2} filter="url(#fShadowSoft)" />
      <path d={`M ${x0 + w - 26} ${y0 + 1} L ${x0 + w - 1} ${y0 + 26} L ${x0 + w - 26} ${y0 + 26} Z`} fill={tint(C.rule, 0.35)} stroke={shade(C.rule, 0.3)} strokeWidth={1.5} strokeLinejoin="round" />
      {digit !== undefined && digit !== ""
        ? <text x={x - 6} y={y + 20} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={MD_INK.amber}>{digit}</text>
        : <text x={x - 8} y={y + 15} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={C.ink}>?</text>}
    </g>
  );
}

/* a tick, drawn (no glyph) */
const mdTick = (x: number, y: number) => `M ${x - 11} ${y} L ${x - 2} ${y + 10} L ${x + 14} ${y - 12}`;

function Work({ phase, n, item, index, stage, wrong, typed, api, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();
  const busy = tl.busy;
  const free = stage === "free";
  const init = useMemo(() => mdSetup(item), []);
  const [cfg, setCfg] = useState<any>(init);
  const [kn, setKn] = useState<any>(init.kn);
  const [settled, setSettled] = useState<number[]>(init.settled);
  const [open, setOpen] = useState<number | null>(null);       /* the column whose reasoning strip is open */
  const [lit, setLit] = useState<number | null>(null);         /* the column that has to come first, lit and named */
  const [sel, setSel] = useState<number | null>(null);         /* "first": the column the child tapped */
  const [glow, setGlow] = useState(false);                     /* circles where a carry may still arrive */
  const [lifted, setLifted] = useState<string[]>([]);
  const [lifting, setLifting] = useState<string[]>([]);
  const [solvedAt, setSolvedAt] = useState<number | null>(null); /* the strip reads that column in full */
  const [tok, setTok] = useState<any>(null);                   /* tokens counted in the strip */
  const [fly, setFly] = useState<any>(null);                   /* a carried ten on its way to a circle */
  const [big, setBig] = useState(false);                       /* phase 3: the answer cell reads its true total */
  const [light, setLight] = useState(false);                   /* the too small light */
  const [fwd, setFwd] = useState<any>(null);                   /* the forward check: { d, tick, parted, n } */
  const [right, setRight] = useState<any>(null);               /* after a miss: the right digits on the cards */
  const [back, setBack] = useState(false);                     /* phase 1 win: the column read backwards too */
  const [touched, setTouched] = useState(false);
  const [fi, setFi] = useState(0);
  const [fcov, setFcov] = useState<string[]>([]);
  const selRef = useRef<number | null>(null);
  const setupFor = useRef(index);
  const kind = cfg.kind;
  MD_NOW.need = kind === "check" ? cfg.cover.length : 1;

  const reset = (it: any) => {
    tl.stop();
    const s = mdSetup(it);
    setCfg(s); setKn(s.kn); setSettled(s.settled);
    setOpen(null); setLit(null); setSel(null); selRef.current = null; setGlow(false);
    setLifted([]); setLifting([]); setSolvedAt(null); setTok(null); setFly(null); setBig(false); setLight(false);
    setFwd(null); setRight(null); setBack(false); setTouched(false);
    api.lock(false);
  };
  useEffect(() => {
    if (stage === "ask" && setupFor.current !== index) { setupFor.current = index; reset(item); }
  }, [stage, index]);
  /* free play: a correct sum, any digit covered or lifted with a tap, a new sum on the key */
  useEffect(() => {
    if (!free) return;
    setupFor.current = -2;
    setFi(0); setFcov([]);
    reset({ kind: "free", fi: 0 });
  }, [free]);

  const L = mdLay(cfg.places, cfg.wide);
  const colCx = (k: number) => L.colX[k] + L.cw / 2;
  const ghost = (k: number) => kind === "small" && k === cfg.k + 1;
  const tdig = String(typed ?? "").replace(/\D/g, "");
  const down = free ? fcov : cfg.cover.filter((c: string) => !lifted.includes(c));
  const asked = kind === "col" ? cfg.cover[0] : kind === "sum" ? cfg.cover.find((c: string) => c[1] === "0") : null;
  const trueOf = (c: string) => (c[0] === "a" ? cfg.a : cfg.b)[Number(c[1])];
  /* the digit pencilled on a card: the child's, or after a miss the right one until the child types again */
  const onCard = (c: string) => {
    if (free || kind === "first" || kind === "small") return undefined;
    if (right && right.typed === typed && right.d[c] !== undefined) return String(right.d[c]);
    if (kind === "check") { const i = cfg.cover.indexOf(c); return i >= 0 && i < tdig.length ? tdig[i] : undefined; }
    if (c === asked && tdig) return tdig.slice(0, 2);
    return undefined;
  };
  const target = kind === "check" && stage === "ask" && tdig.length < cfg.cover.length ? cfg.cover[tdig.length] : null;
  const litCard = kind === "check" ? target : stage === "ask" ? asked : null;

  /* the ones-first lock: a column opens only when every column to its right is settled */
  const colDone = (k: number) => cfg.cover.filter((c: string) => Number(c[1]) === k)
    .every((c: string) => lifted.includes(c) || (kind === "check" && onCard(c) !== undefined));
  const lockFor = (k: number) => { for (let j = 0; j < k; j++) if (cfg.places.includes(j) && !colDone(j)) return j; return null; };

  const tapCol = (k: number) => {
    if (stage !== "ask" || busy) return;
    setTouched(true);
    if (kind === "first") { selRef.current = k; setSel(k); api.setTyped(MD_PLACE[k]); api.sfx.tick(); return; }
    const first = lockFor(k);
    if (first !== null) {
      setOpen(null); setLit(first);
      api.say({ en: `First the ${MD_PLACE[first]} column.`, hi: `पहले ${TR.hi[MD_PLACE[first]]} का खाना।`, gu: `પહેલાં ${TR.gu[MD_PLACE[first]]}નું ખાનું.` });
      return;
    }
    setLit(null); setFwd(null); setOpen(k);
    if (kind === "small") setLight(true);
    api.sfx.tick();
  };
  const toggleCover = (c: string) => {
    if (!free) return;
    setFcov((f) => (f.includes(c) ? f.filter((x) => x !== c) : [...f, c]));
    api.sfx.tick();
  };
  const newSum = () => {
    const f = (fi + 1) % MD_FREE.length;
    setFi(f); setFcov([]);
    const s = mdSetup({ kind: "free", fi: f });
    setCfg(s); setKn(s.kn); setSettled(s.settled);
    api.sfx.tick();
  };

  /* Enter: "first" commits the tapped column; two cards wait for both digits, then the sum is added forwards */
  const enterFn: any =
    stage !== "ask" ? null
      : busy ? () => {}
        : kind === "first" ? () => { if (selRef.current !== null) api.submit(MD_PLACE[selRef.current]); }
          : kind === "check" && cfg.cover.length > 1 ? (v: any) => {
            const d = String(v ?? "").replace(/\D/g, "");
            if (d.length >= cfg.cover.length) { api.submit(v); return; }
            if (d.length) api.say("Find the other hidden digit too.");
          }
            : null;
  api.onEnter(enterFn);
  HOOK.set = (v: any) => {
    const k = MD_PLACE.indexOf(String(v ?? "").trim().toLowerCase());
    if (k < 0 || !cfg.places.includes(k)) return false;
    selRef.current = k; setSel(k); setTouched(true); api.setTyped(MD_PLACE[k]);
    return true;
  };

  /* ── motion pieces ── */
  /* the first row of ten ties, then walks left into the circle above place `to` */
  const tenSteps = (to: number, snap: string[]) => [
    [420, () => setTok({ list: snap, tie: true })],
    [60, () => { setTok({ list: snap, gone: true }); setFly({ x: MD_TOK.x + 4.5 * MD_TOK.p, y: MD_TOK.y0 }); }],
    [40, () => setFly({ x: colCx(to), y: 27 })],
    [560, () => { setFly(null); setKn((p: any) => ({ ...p, [to]: 1 })); api.sfx.tick(); }],
  ];
  const countSteps = (paints: string[], to: number, ms: number[]) => {
    const S: any[] = [], list: string[] = [];
    paints.forEach((pt, i) => {
      list.push(pt);
      const snap = list.slice(), gone = list.length > 10;
      S.push([ms[i], () => { setTok((t: any) => ({ list: snap, gone: gone || (t && t.gone) })); api.sfx.tick(); }]);
      if (list.length === 10 && paints.length > 10) S.push(...tenSteps(to, snap));
    });
    return S;
  };
  /* the forward check: from the ones, each column added with its carry, laid under the printed answer */
  const valAt = (row: string, k: number, digs: any) => { const c = row + k; return cfg.cover.includes(c) ? digs[c] : (row === "a" ? cfg.a : cfg.b)[k]; };
  const fwdSteps = (digs: any) => {
    const S: any[] = [[60, () => { setOpen(null); setFwd({ d: {}, tick: {}, parted: null, n: 0 }); }], [300, () => {}]];
    let c = 0;
    const d: any = {}, tick: any = {};
    for (let k = 0; k < 4; k++) {
      const x = valAt("a", k, digs), y = valAt("b", k, digs), kk = k;
      if (x === undefined || y === undefined) { const snap = { d: { ...d }, tick: { ...tick }, parted: kk, n: kk }; S.push([500, () => setFwd(snap)]); break; }
      const tot = c + x + y, out = Math.floor(tot / 10), ok = tot % 10 === cfg.s[k];
      d[k] = tot % 10;
      if (ok) tick[k] = true;
      const snap = { d: { ...d }, tick: { ...tick }, parted: ok ? null : kk, n: kk + 1 };
      S.push([560, () => { setFwd(snap); if (kk < 3) setKn((p: any) => ({ ...p, [kk + 1]: out })); api.sfx.tick(); }]);
      if (!ok) break;
      c = out;
    }
    return S;
  };
  const truth = () => { const t: any = {}; cfg.cover.forEach((c: string) => { t[c] = trueOf(c); }); return t; };

  /* ── win motions ── */
  useEffect(() => {
    if (stage !== "win") return;
    setLit(null); setGlow(false);
    const k = cfg.k;
    if (kind === "col") {
      const c = cfg.cover[0];
      tl.run([
        [60, () => { setTok(null); setLifting([c]); setOpen(k); }],
        [360, () => { setLifted([c]); setLifting([]); api.sfx.tick(); }],
        [200, () => setSolvedAt(k)],
        [700, () => setBack(true)],
        [900, () => {}],
      ]);
    } else if (kind === "sum") {
      const c = asked, carry = Math.floor((cfg.a[0] + cfg.b[0]) / 10);
      tl.run([
        [60, () => { setTok(null); setLifting([c]); setOpen(0); }],
        [360, () => { setLifted((l) => [...l, c]); setLifting([]); api.sfx.tick(); }],
        [300, () => setSolvedAt(0)],
        [500, () => setFly({ x: colCx(0), y: MD_ROW.s - 10 })],
        [40, () => setFly({ x: colCx(1), y: 27 })],
        [560, () => { setFly(null); setKn((p: any) => ({ ...p, 1: carry })); setSettled([0]); api.sfx.tick(); }],
        [600, () => {}],
      ]);
    } else if (kind === "first") {
      api.say("The ones, because nothing can carry into them.");
      tl.run([[60, () => { setSel(0); setLit(0); setGlow(true); setOpen(0); }], [1600, () => {}]]);
    } else if (kind === "small") {
      /* the delight: the too small light holds, the column reads its true total, the carry leaves for the next circle */
      tl.run([
        [60, () => { setTok(null); setOpen(k); setLight(true); setSolvedAt(k); }],
        [700, () => setBig(true)],
        [1000, () => { setBig(false); setFly({ x: colCx(k) - 18, y: MD_ROW.s - 10 }); }],
        [40, () => setFly({ x: colCx(k + 1), y: 27 })],
        [560, () => { setFly(null); setKn((p: any) => ({ ...p, [k + 1]: 1 })); api.sfx.tick(); }],
        [700, () => {}],
      ]);
    } else if (kind === "check") {
      const all = cfg.cover.slice(), t = truth();
      tl.run([
        [60, () => { setOpen(null); setRight(null); setLifting(all); }],
        [380, () => { setLifted(all); setLifting([]); api.sfx.tick(); }],
        ...fwdSteps(t),
        [600, () => {}],
      ]);
    }
  }, [stage]);

  /* ── the traceback: the mathematics redrawn in steps, ending on the whole right answer; nothing marked ── */
  useEffect(() => {
    if (!wrong || stage !== "ask") return;
    api.lock(true);
    setTouched(true); setLit(null); setBack(false);
    const done = () => api.lock(false);
    const k = cfg.k, tv = typed;
    let S: any[] = [];
    if (kind === "col") {
      const c = cfg.cover[0], seen = c[0] === "a" ? cfg.b[k] : cfg.a[k], s = cfg.s[k];
      S.push([60, () => { setOpen(k); setSolvedAt(null); setTok({ slots: s, list: [] }); }], [500, () => {}]);
      const list: string[] = [];
      for (let i = 0; i < s; i++) {
        list.push(i < seen ? "gHundred" : "gTen");
        const snap = list.slice();
        S.push([i < seen ? 200 : 340, () => { setTok({ slots: s, list: snap }); api.sfx.tick(); }]);
        if (i === seen - 1) S.push([400, () => {}]);
      }
      S.push([500, () => setSolvedAt(k)], [500, () => {}]);
    } else if (kind === "sum") {
      const c = asked as string, hid = trueOf(c), seen = c[0] === "a" ? cfg.b[0] : cfg.a[0];
      const paints = [...Array(seen).fill("gHundred"), ...Array(hid).fill("gTen")];
      S.push([60, () => { setOpen(0); setSolvedAt(null); setTok({ list: [] }); }], [500, () => {}]);
      S.push(...countSteps(paints, 1, paints.map((p) => (p === "gHundred" ? 180 : 320))));
      S.push([400, () => setTok((t: any) => ({ ...t, keep: true }))], [500, () => setSolvedAt(0)], [500, () => {}]);
    } else if (kind === "first") {
      S.push([60, () => { setOpen(null); setGlow(true); }], [1100, () => { setGlow(false); setLit(0); }], [900, () => setOpen(0)], [600, () => {}]);
    } else if (kind === "small") {
      const cin = cfg.kn[k] || 0, paints = [...Array(cin).fill("gPointer"), ...Array(cfg.a[k] + cfg.b[k]).fill("gHundred")];
      S.push([60, () => { setOpen(k); setLight(true); setSolvedAt(null); setTok({ list: [] }); setKn(cfg.kn); }], [600, () => {}]);
      S.push(...countSteps(paints, k + 1, paints.map((p) => (p === "gPointer" ? 400 : 170))));
      S.push([400, () => setTok((t: any) => ({ ...t, keep: true }))], [500, () => setSolvedAt(k)], [500, () => {}]);
    } else if (kind === "check") {
      const d = String(wrong.value ?? "").replace(/\D/g, ""), mine: any = {};
      cfg.cover.forEach((c: string, i: number) => { if (i < d.length) mine[c] = Number(d[i]); });
      const t = truth();
      S.push([60, () => { setOpen(null); setRight(null); }], ...fwdSteps(mine), [1300, () => {}],
        [60, () => { setRight({ typed: tv, d: t }); setFwd(null); setKn(cfg.kn); }], [400, () => {}], ...fwdSteps(t), [600, () => {}]);
    }
    tl.run(S, done);
  }, [wrong]);

  /* ── what the host and the agent read back (toolApi.getState): never a hidden digit ── */
  api.share({
    phase: n, columns: cfg.places.length, covered: down.length, found: lifted.length,
    carries: cfg.places.slice().reverse().map((k: number) => (kn[k] === undefined ? null : kn[k])),
    columnSettled: settled.map((k) => MD_PLACE[k]), checked: fwd ? fwd.n : 0,
    openColumn: open === null ? null : MD_PLACE[open], complete: stage === "idle",
  });

  /* ── drawing ── */
  const live = stage === "ask" && !busy;
  const cardAt = (c: string) => ({ x: colCx(Number(c[1])), y: MD_ROW[c[0]] });
  /* "2 of 4" in the language in use */
  const ofN = (a: number, b: number) => (lang === "hi" ? `${b} में से ${a}` : lang === "gu" ? `${b} માંથી ${a}` : `${a} of ${b}`);
  const runs = kind === "small" ? null
    : free ? { label: "cards laid", v: String(fcov.length) }
      : kind === "check" ? { label: "checked", v: ofN(fwd ? fwd.n : 0, 4) }
        : { label: "lifted", v: ofN(lifted.length, cfg.cover.length) };
  const invite = stage === "ask" && index === 0 && !touched && !tdig && !busy && !wrong
    ? (kind === "col" || kind === "sum") && asked ? { ...cardAt(asked), r: 50 }
      : kind === "small" ? { x: colCx(cfg.k), y: MD_ROW.s, r: 44 }
        : kind === "check" && target ? { ...cardAt(target), r: 50 } : null
    : null;

  /* the reading of column k, as a row of terms: [carry in +] top + bottom = [carry out] answer */
  const termsOf = (k: number) => {
    const out: any[] = [], full = solvedAt === k;
    const cin = k === 0 ? 0 : kn[k];
    if (kind !== "col" && k > 0 && (cin === undefined || cin > 0)) {
      out.push(cin === undefined ? { t: "box", q: true } : { t: "d", v: String(cin), ink: MD_INK.verm });
      out.push({ t: "op", v: "+" });
    }
    const cell = (row: string) => {
      const c = row + k;
      if (cfg.cover.includes(c) && !lifted.includes(c)) return { t: "gap", v: full ? String(trueOf(c)) : onCard(c) };
      return { t: "d", v: String((row === "a" ? cfg.a : cfg.b)[k]), ink: MD_INK.blue };
    };
    out.push(cell("a"), { t: "op", v: "+" }, cell("b"), { t: "op", v: "=" });
    if (full) {
      const tot = (cin || 0) + cfg.a[k] + cfg.b[k];
      out.push(tot > 9 ? { t: "tot", hi: String(Math.floor(tot / 10)), lo: String(tot % 10) } : { t: "d", v: String(tot), ink: MD_INK.green });
    } else {
      if (kind !== "col") out.push({ t: "box" });
      out.push({ t: "d", v: String(cfg.s[k]), ink: MD_INK.green });
    }
    return out;
  };
  const drawTerms = (terms: any[], x0: number, key: string) => {
    let x = x0;
    return terms.map((t: any, i: number) => {
      const w = MD_TW[t.t], mid = x + w / 2;
      x += w;
      if (t.t === "gap") return (
        <g key={key + i}>
          <rect x={mid - 32} y={352} width={64} height={80} rx={12} fill={tint(MD_AMBER, 0.85)} stroke={MD_AMBER} strokeWidth={4} />
          {t.v !== undefined && t.v !== "" && <text x={mid} y={420} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={MD_INK.amber}>{t.v}</text>}
        </g>
      );
      if (t.t === "box") return (
        <g key={key + i}>
          <rect x={mid - 20} y={362} width={40} height={64} rx={8} fill="none" stroke={MD_VERM} strokeWidth={3} strokeDasharray="7 6" />
          {t.q && <text x={mid} y={406} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={MD_INK.verm}>?</text>}
        </g>
      );
      if (t.t === "tot") return (
        <text key={key + i} x={mid} y={420} textAnchor="middle" fontSize={T.xl} fontWeight={700}>
          <tspan fill={MD_INK.verm}>{t.hi}</tspan><tspan fill={MD_INK.green}>{t.lo}</tspan>
        </text>
      );
      return <text key={key + i} x={mid} y={420} textAnchor="middle" fontSize={T.xl} fontWeight={t.t === "op" ? 600 : 700} fill={t.t === "op" ? C.ink : t.ink}>{t.v}</text>;
    });
  };
  const backTerms = () => {
    const k = cfg.k, c = cfg.cover[0], seen = c[0] === "a" ? cfg.b[k] : cfg.a[k];
    return [{ t: "d", v: String(cfg.s[k]), ink: MD_INK.green }, { t: "op", v: "−" }, { t: "d", v: String(seen), ink: MD_INK.blue },
      { t: "op", v: "=" }, { t: "d", v: String(trueOf(c)), ink: MD_INK.amber }];
  };
  const tokAt = (i: number) => ({ x: MD_TOK.x + (i % 10) * MD_TOK.p, y: tok && tok.slots ? MD_TOK.one : i < 10 ? MD_TOK.y0 : MD_TOK.y1 });
  const smallWords = () => {
    const k = cfg.k, a = cfg.a[k], b = cfg.b[k], s = cfg.s[k];
    if (a > s && b > s) return tx("smaller than both");
    const m = Math.max(a, b);
    return lang === "hi" ? `${m} से छोटा` : lang === "gu" ? `${m}થી નાનો` : `smaller than ${m}`;
  };
  const headingOf = (k: number) => tx(cfg.wide || (lit === k && MD_PLACE[k].length <= 5) ? MD_PLACE[k] : MD_SHORT[k]);
  const ruleW = L.right - 6 - (L.signX + 8);

  return (
    <g>
      <style>{MD_CSS}</style>

      {/* the running count: cards lifted against cards on the sum (phase 4: columns checked forwards) */}
      {runs && (
        <g data-zone="runs">
          <rect x={0} y={-94} width={330} height={76} rx={RAD.panel} fill="url(#gPanel)" stroke={C.rule} strokeWidth={2} />
          <text x={18} y={-46} fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx(runs.label)}</text>
          <text x={312} y={-41} textAnchor="end" fontSize={T.prompt} fontWeight={700} fill={C.ink}>{runs.v}</text>
        </g>
      )}

      {/* the mat */}
      <rect x={L.x0} y={0} width={L.width} height={322} rx={RAD.panel} fill="url(#gPanel)" stroke={C.rule} strokeWidth={2} />
      {cfg.places.map((k: number) => {
        const X = L.colX[k], cx = colCx(k), g = ghost(k), isLit = lit === k;
        const known = kn[k] !== undefined;
        return (
          <g key={k}>
            {k > 0 && (
              <g>
                <circle cx={cx} cy={27} r={23} fill={known ? "#FFFFFF" : "none"} stroke={glow && !known ? MD_AMBER : known ? shade(C.rule, 0.15) : shade(C.rule, 0.1)}
                  strokeWidth={glow && !known ? 4 : 2} strokeDasharray={known ? undefined : "6 6"} />
                {known && kn[k] > 0 && <text x={cx} y={38} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={MD_INK.verm}>{kn[k]}</text>}
              </g>
            )}
            <rect x={X + 6} y={54} width={L.cw - 12} height={32} rx={10} fill={isLit ? tint(MD_AMBER, 0.6) : tint(C.panel, 0.25)} stroke={isLit ? MD_AMBER : C.rule} strokeWidth={isLit ? 3 : 1.5} />
            <text x={cx} y={80} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={C.ink}>{headingOf(k)}</text>
            <rect x={X + 6} y={90} width={L.cw - 12} height={228} rx={14} fill={g ? "none" : "#FFFFFF"}
              stroke={sel === k ? MD_AMBER : C.rule} strokeWidth={sel === k ? 5 : 1.5} strokeDasharray={g ? "8 8" : undefined} />
            {!g && ["a", "b"].map((r) => {
              const c = r + k, covered = down.includes(c), lf = lifting.includes(c);
              return (
                <g key={r}>
                  {(!covered || lf) && <text x={cx} y={MD_ROW[r] + 20} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={MD_INK.blue}>{(r === "a" ? cfg.a : cfg.b)[k]}</text>}
                  {covered && <MdCard x={cx} y={MD_ROW[r]} C={C} digit={onCard(c)} lit={!lf && litCard === c} lifting={lf} />}
                </g>
              );
            })}
            {!g && (big && kind === "small" && k === cfg.k
              ? <text x={cx} y={MD_ROW.s + 20} textAnchor="middle" fontSize={T.xl} fontWeight={700}>
                  <tspan fill={MD_INK.verm}>{Math.floor((cfg.kn[k] || 0) + cfg.a[k] + cfg.b[k]) >= 10 ? "1" : ""}</tspan><tspan fill={MD_INK.green}>{cfg.s[k]}</tspan>
                </text>
              : <text x={cx} y={MD_ROW.s + 20} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={MD_INK.green}>{cfg.s[k]}</text>)}
          </g>
        );
      })}
      <text x={L.signX + 40} y={MD_ROW.b + 20} textAnchor="middle" fontSize={T.xl} fontWeight={600} fill={C.ink}>+</text>
      <rect x={L.signX + 8} y={236} width={ruleW} height={5} rx={2.5} fill={C.ink} />

      {/* the too small light: the answer digit ringed, and the reading in words beside it */}
      {kind === "small" && light && (
        <g>
          <circle cx={colCx(cfg.k)} cy={MD_ROW.s} r={38} fill="none" stroke={MD_AMBER} strokeWidth={5} />
          <text x={L.x0 + L.width + 22} y={MD_ROW.s + 10} fontSize={T.micro} fontWeight={700} fill={MD_INK.amber}>{smallWords()}</text>
        </g>
      )}

      {/* the reasoning strip under the tapped column */}
      {open !== null && !fwd && !free && (
        <g className="md-in" data-role="reading">
          <rect x={0} y={336} width={W.w} height={128} rx={18} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} />
          <path d={`M ${colCx(open) - 16} 337 L ${colCx(open)} 322 L ${colCx(open) + 16} 337 Z`} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} strokeLinejoin="round" />
          <rect x={colCx(open) - 14} y={335} width={28} height={5} fill="#FFFFFF" />
          {drawTerms(termsOf(open), 36, "r")}
          {back && kind === "col" && drawTerms(backTerms(), 620, "b")}
          {tok && (
            <g>
              {tok.slots && Array.from({ length: tok.slots }).map((_, i) => (
                <circle key={"s" + i} cx={tokAt(i).x} cy={tokAt(i).y} r={MD_TOK.r + 2} fill="#FFFFFF" stroke={MD_GREEN} strokeWidth={3} />
              ))}
              {tok.tie && <rect className="md-tie" x={MD_TOK.x - 26} y={MD_TOK.y0 - 25} width={9 * MD_TOK.p + 52} height={50} rx={25}
                fill={MD_AMBER} fillOpacity={0.12} stroke={MD_AMBER} strokeWidth={4} />}
              <g filter="url(#fShadowSoft)">
                {tok.list.map((pt: string, i: number) => (tok.gone && i < 10 ? null : <Disc key={"t" + i} x={tokAt(i).x} y={tokAt(i).y} r={MD_TOK.r} paint={pt} flat />))}
              </g>
              {tok.keep && tok.list.length > 10 && (
                <rect x={MD_TOK.x - 25} y={MD_TOK.y1 - 25} width={(tok.list.length - 11) * MD_TOK.p + 50} height={50} rx={25} fill="none" stroke={MD_GREEN} strokeWidth={4} />
              )}
            </g>
          )}
        </g>
      )}

      {/* the forward check: the completed sum added from the ones, laid under the printed answer */}
      {fwd && (
        <g className="md-in">
          <rect x={L.signX + 8} y={338} width={ruleW} height={5} rx={2.5} fill={C.ink} />
          <text x={L.signX + 66} y={408} textAnchor="end" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("check")}</text>
          {[0, 1, 2, 3].map((k) => fwd.d[k] !== undefined && (
            <text key={"f" + k} x={colCx(k)} y={408} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={C.ink}>{fwd.d[k]}</text>
          ))}
          {[0, 1, 2, 3].map((k) => fwd.tick[k] && (
            <path key={"k" + k} d={mdTick(colCx(k) + 40, 386)} fill="none" stroke={MD_GREEN} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" />
          ))}
          {fwd.parted !== null && fwd.parted !== undefined && (
            <rect x={L.colX[fwd.parted] + 4} y={244} width={L.cw - 8} height={186} rx={16} fill="none" stroke={MD_AMBER} strokeWidth={5} />
          )}
        </g>
      )}

      {/* a carried ten on its way to a circle */}
      {fly && (
        <g className="md-move" style={{ transform: `translate(${fly.x}px, ${fly.y}px)` } as any} pointerEvents="none">
          <Disc x={0} y={0} r={17} paint="gPointer" lift />
        </g>
      )}

      {/* the columns are the controls: tap one to read it (or, for "which column first", to choose it) */}
      {live && cfg.places.filter((k: number) => !ghost(k)).map((k: number) => (
        <Hit key={"h" + k} id={"col-" + MD_PLACE[k]} label={(kind === "first" ? "Choose the " : "Read the ") + MD_PLACE[k] + " column"}
          x={L.colX[k]} y={52} w={L.cw} h={268} onPress={() => tapCol(k)} />
      ))}

      {/* free play: tap a digit to lay a card on it or lift it; a new sum on the key */}
      {free && (
        <g>
          {[3, 2, 1, 0].map((k) => ["a", "b"].map((r) => (
            <Hit key={"c" + r + k} id={"cover-" + r + k} label={(fcov.includes(r + k) ? "Lift the card off the " : "Cover the ") + MD_PLACE[k] + " digit of the " + (r === "a" ? "first" : "second") + " number"}
              x={L.colX[k]} y={MD_ROW[r] - 36} w={L.cw} h={72} onPress={() => toggleCover(r + k)} />
          )))}
          <Key id="new-sum" label={tx("New sum")} x={0} y={360} w={240} h={84} C={C} onClick={newSum}>
            <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={C.ink}>{tx("New sum")}</text>
          </Key>
        </g>
      )}

      {invite && <Invite x={invite.x} y={invite.y} r={invite.r} C={C} />}
    </g>
  );
}

/* the summary page's small drawing: the column of the child's last right answer, read in full */
function Thumb({ n, result, C, w, h, tx = (v: any) => v }: any) {
  const last = result && result.last;
  if (!last) return null;
  const it: any = ((PHASES[(n || 1) - 1] || { items: [] }).items as any[])[last.item] || {};
  let parts: any[] = [];
  let tickAt: number | null = null;
  if (it.kind === "col") {
    const top = it.a === null ? it.answer : it.a, bot = it.b === null ? it.answer : it.b;
    parts = [{ s: String(top), f: it.a === null ? MD_INK.amber : MD_INK.blue }, { s: " + ", f: C.ink }, { s: String(bot), f: it.b === null ? MD_INK.amber : MD_INK.blue }, { s: " = ", f: C.ink }, { s: String(it.s), f: MD_INK.green }];
  } else if (it.kind === "sum") {
    const hid = it.cover.includes("a0") ? it.A % 10 : it.B % 10, seen = it.cover.includes("a0") ? it.B % 10 : it.A % 10, tot = hid + seen;
    parts = [{ s: String(seen), f: MD_INK.blue }, { s: " + ", f: C.ink }, { s: String(hid), f: MD_INK.amber }, { s: " = ", f: C.ink }, { s: String(Math.floor(tot / 10)), f: MD_INK.verm }, { s: String(tot % 10), f: MD_INK.green }];
  } else if (it.kind === "first") {
    parts = [{ s: tx("ones first"), f: MD_INK.amber }];
  } else if (it.kind === "small") {
    const tot = it.cin + it.a + it.b;
    parts = [{ s: it.cin ? `${it.a}+${it.b}+${it.cin} = ` : `${it.a} + ${it.b} = `, f: C.ink }, { s: String(Math.floor(tot / 10)), f: MD_INK.verm }, { s: String(tot % 10), f: MD_INK.green }];
  } else if (it.kind === "check") {
    parts = [{ s: indian(it.S), f: MD_INK.green }];
    tickAt = w / 2 + 64;
  } else return null;
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      <text x={tickAt ? w / 2 - 18 : w / 2} y={h / 2 + 11} textAnchor="middle" fontSize={T.label} fontWeight={700}>
        {parts.map((p, i) => <tspan key={i} fill={p.f}>{p.s}</tspan>)}
      </text>
      {tickAt && <path d={mdTick(tickAt, h / 2)} fill="none" stroke={MD_GREEN} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />}
    </g>
  );
}

function MissingDigitDetective(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, format, fitHost: () => null }} />
  );
}

export default MissingDigitDetective;
