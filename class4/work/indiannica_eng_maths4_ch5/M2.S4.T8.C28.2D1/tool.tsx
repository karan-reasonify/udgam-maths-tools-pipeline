/* ═══ M2.S4.T8.C28.2D1 · value_of_one · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists: header + its three controls, canvas, slot + pad, bubble + mascot,
   phase dots (user / AI mode), window.toolApi, sounds, the synced voice, scoring, the events,
   idle and restart. NO imports in this file; only the five host hooks. Follow docs/LAYOUT.md;
   the reference tool is work/indiannica_eng_maths4_ch1/M1.S1.T2.C4.2D1/tool.tsx.
   Edit, never rewrite. Built by `node cli.mjs scaffold`; concepts are verbatim (check compares them). */

const TOOL_ID = "value_of_one";
const MEDIA_ID = "M2.S4.T8.C28.2D1";
const TOOL_NAME = "Value of One";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
const VOICE = {"rate":0.92,"pitch":1.06};

/* spoken before phase 1's teach lines only (the plan's opening voice line) */
const OPENING = ["Two rails, things on top and what they are worth underneath. Walk them back to one."];
/* the whole-tool line: spoken on the summary page */
const FINISH_LINE = "Every value of one found, every answer in the units asked, and every way walked that came out whole.";
/* said when the child opens Free play from the summary page (the plan's free-play voice line) */
const FREE_LINE = "Free play. Any story, with the turn control, the converter and the more bracket open.";

/* Hindi and Gujarati, keyed by the English line exactly (runtime r13+: `lineFor(line, lang, TR)`); the
   English stays what the checks read. Money is spoken as "<digits> रुपये" / "<digits> રૂપિયા" (the
   runtime reads digits, not ₹), units as words (किलोग्राम, કિલોગ્રામ); the picture keeps ₹ and short units.
   Digits stay digits: the runtime speaks them in the language in use. A first draft; wants a native
   speaker's read. */
const TR: any = {
  hi: {
    "Value of One": "एक का मूल्य",
    "Two rails, things on top and what they are worth underneath. Walk them back to one.": "दो पटरियाँ, ऊपर चीज़ें और नीचे उनका मूल्य। उन्हें वापस एक तक ले चलो।",
    "Every value of one found, every answer in the units asked, and every way walked that came out whole.": "हर बार एक का मूल्य मिला, हर उत्तर पूछी गई इकाई में दिया, और पूरी संख्या वाला रास्ता चुना।",
    "Free play. Any story, with the turn control, the converter and the more bracket open.": "मुक्त खेल। कोई भी कहानी, घुमाने का बटन, बदलने वाला और अतिरिक्त हिस्से का कोष्ठक खुले हैं।",
    "Find the value of one first": "पहले एक का मूल्य निकालो",
    "How many things, and what are they worth together? Share that value out, one share for each thing.": "कितनी चीज़ें हैं, और मिलाकर उनका मूल्य कितना है? उस मूल्य को बाँटो, हर चीज़ का एक हिस्सा।",
    "What is the value of all of them?": "सबका मूल्य कितना है?",
    "If 2 things cost ₹20, one costs ₹20 ÷ 2. Share the value by how many there are.": "अगर 2 चीज़ों का दाम 20 रुपये है, तो एक का दाम 20 रुपये ÷ 2 है। मूल्य को चीज़ों की गिनती से बाँटो।",
    "The value of one is the value of many divided by how many there are.": "एक का मूल्य, कई के मूल्य को उनकी गिनती से भाग देने पर मिलता है।",
    "You learned: divide the value of many by how many to find one.": "तुमने सीखा: एक का मूल्य पाने के लिए कई के मूल्य को गिनती से भाग दो।",
    "6 notebooks cost ₹270. What does one notebook cost?": "6 कॉपियों का दाम 270 रुपये है। एक कॉपी का दाम कितना है?",
    "Cost of 1 notebook in ₹?": "1 कॉपी का दाम, रुपये में?",
    "How many notebooks share the ₹270?": "270 रुपये कितनी कॉपियों में बँटते हैं?",
    "5 bags of flour weigh 135 kg. What does one bag weigh?": "आटे की 5 बोरियों का वज़न 135 किलोग्राम है। एक बोरी का वज़न कितना है?",
    "1 bag weighs how many kg?": "1 बोरी कितने किलो?",
    "How many bags share the 135 kg?": "135 किलोग्राम कितनी बोरियों में बँटता है?",
    "8 scarves cost ₹1,200. What does one scarf cost?": "8 स्कार्फ़ का दाम 1,200 रुपये है। एक स्कार्फ़ का दाम कितना है?",
    "Cost of 1 scarf in ₹?": "1 स्कार्फ़ का दाम, रुपये में?",
    "How many scarves share the ₹1,200?": "1,200 रुपये कितने स्कार्फ़ में बँटते हैं?",
    "Then multiply up to many": "फिर कई तक गुणा करो",
    "Once one thing is priced, many is only that price again and again.": "एक चीज़ का दाम पता हो, तो कई का दाम बस वही दाम बार-बार है।",
    "How many does the question want?": "सवाल कितनी चीज़ें माँगता है?",
    "If one costs ₹5, then 3 cost ₹5 × 3. Multiply the value of one by how many you need.": "अगर एक का दाम 5 रुपये है, तो 3 का दाम 5 रुपये × 3 है। एक के मूल्य को जितनी चाहिए उतने से गुणा करो।",
    "The value of many is the value of one times how many are needed.": "कई का मूल्य, एक के मूल्य को ज़रूरी गिनती से गुणा करने पर मिलता है।",
    "You learned: multiply the value of one by how many you need.": "तुमने सीखा: एक के मूल्य को जितनी चाहिए उतने से गुणा करो।",
    "One notebook costs ₹45. What do 14 notebooks cost?": "एक कॉपी का दाम 45 रुपये है। 14 कॉपियों का दाम कितना है?",
    "Cost of 14 notebooks in ₹?": "14 कॉपियों का दाम, रुपये में?",
    "Should 14 notebooks cost more than one notebook, or less?": "14 कॉपियों का दाम एक कॉपी से ज़्यादा होना चाहिए, या कम?",
    "A pen costs ₹18. What do 12 pens cost?": "एक पेन का दाम 18 रुपये है। 12 पेन का दाम कितना है?",
    "Cost of 12 pens in ₹?": "12 पेन का दाम, रुपये में?",
    "Should 12 pens cost more than one pen, or less?": "12 पेन का दाम एक पेन से ज़्यादा होना चाहिए, या कम?",
    "9 tickets cost ₹1,080. What do 4 tickets cost?": "9 टिकटों का दाम 1,080 रुपये है। 4 टिकटों का दाम कितना है?",
    "Cost of 4 tickets in ₹?": "4 टिकटों का दाम, रुपये में?",
    "What is one ticket worth first?": "पहले, एक टिकट का दाम कितना है?",
    "Answer the question that was asked": "जो पूछा गया, उसी का उत्तर दो",
    "A working can be finished and still not answer the question. Look at what the question counts in.": "हल पूरा होकर भी सवाल का उत्तर न दे, ऐसा हो सकता है। देखो कि सवाल किस इकाई में गिनता है।",
    "What does the question count in?": "सवाल किस इकाई में गिनता है?",
    "7 days make 1 week, and 12 months make 1 year. For how much more, count only the extra part.": "7 दिन का 1 हफ़्ता होता है, और 12 महीने का 1 साल। कितना ज़्यादा, इसके लिए सिर्फ़ अतिरिक्त हिस्सा गिनो।",
    "The answer is given in the units the question asks for, and how much more is the extra part only.": "उत्तर उसी इकाई में दिया जाता है जो सवाल पूछता है, और कितना ज़्यादा का मतलब सिर्फ़ अतिरिक्त हिस्सा है।",
    "You learned: answer in the units asked; how much more is the extra.": "तुमने सीखा: पूछी गई इकाई में उत्तर दो; कितना ज़्यादा यानी अतिरिक्त हिस्सा।",
    "A child saves ₹35 every day for a bat that costs ₹1,960. How many weeks will the saving take?": "एक बच्चा 1,960 रुपये के बल्ले के लिए हर दिन 35 रुपये बचाता है। बचत में कितने हफ़्ते लगेंगे?",
    "How many weeks?": "कितने हफ़्ते?",
    "What unit is your number in?": "तुम्हारी संख्या किस इकाई में है?",
    "A room costs ₹4,200 for a week. How much more will the stay cost if it runs for 2 more days?": "एक कमरे का एक हफ़्ते का किराया 4,200 रुपये है। अगर रहना 2 दिन और बढ़े, तो कितना ज़्यादा लगेगा?",
    "How much more, in ₹?": "कितना ज़्यादा, रुपये में?",
    "Is your number the whole stay, or only the extra days?": "तुम्हारी संख्या पूरे रहने की है, या सिर्फ़ अतिरिक्त दिनों की?",
    "The school fee for 4 months is ₹10,000. What is the fee for a whole year?": "4 महीनों की स्कूल फ़ीस 10,000 रुपये है। पूरे साल की फ़ीस कितनी है?",
    "Fee for 1 year, in ₹?": "1 साल की फ़ीस, रुपये में?",
    "How many months make a year?": "कितने महीनों का एक साल होता है?",
    "Choosing which one to find": "कौन सा एक ढूँढें, यह चुनना",
    "One way round can give less than one. Then turn the rails round and look for a whole number.": "एक तरफ़ से एक से कम मिल सकता है। तब पटरियाँ घुमाओ और पूरी संख्या ढूँढो।",
    "What happens if the rails are turned round?": "पटरियाँ घुमाने पर क्या होता है?",
    "If 2 kg feed 20 people, then 1 kg feeds 20 ÷ 2 people. Turn the rails and find what 1 kg feeds.": "अगर 2 किलोग्राम से 20 लोग खाते हैं, तो 1 किलोग्राम से 20 ÷ 2 लोग। पटरियाँ घुमाओ और देखो कि 1 किलोग्राम से कितने खाते हैं।",
    "The value of one can be found either way round, and the way that comes out whole is the one to use.": "एक का मूल्य किसी भी तरफ़ से निकाला जा सकता है, और जो तरफ़ पूरी संख्या दे, वही लो।",
    "You learned: find one either way round and use the way that is whole.": "तुमने सीखा: किसी भी तरफ़ से एक ढूँढो, और पूरी संख्या वाली तरफ़ लो।",
    "30 kg of rice feeds 450 people. How much rice will 720 people need?": "30 किलोग्राम चावल से 450 लोग खाते हैं। 720 लोगों को कितना चावल चाहिए?",
    "Rice for 720 people, in kg?": "720 लोगों का चावल, किलो में?",
    "One person needs less than a kilogram. How many people does 1 kg feed?": "एक व्यक्ति को एक किलोग्राम से कम चाहिए। 1 किलोग्राम से कितने लोग खाते हैं?",
    "16 kg of rice feeds 400 people. How much rice do 650 people need?": "16 किलोग्राम चावल से 400 लोग खाते हैं। 650 लोगों को कितना चावल चाहिए?",
    "Rice for 650 people, in kg?": "650 लोगों का चावल, किलो में?",
    "Should 650 people need so much more rice than 400 people need?": "क्या 650 लोगों को 400 लोगों से इतना ज़्यादा चावल चाहिए?",
    "4 buses carry 180 children, the same number in each. How many buses do 315 children need?": "4 बसों में 180 बच्चे जाते हैं, हर बस में बराबर। 315 बच्चों के लिए कितनी बसें चाहिए?",
    "Buses for 315 children?": "315 बच्चों के लिए बसें?",
    "Does one child fill a whole bus?": "क्या एक बच्चा पूरी बस भर देता है?",
    /* the rails' own words */
    "notebook": "कॉपी", "notebooks": "कॉपियाँ", "bag": "बोरी", "bags": "बोरियाँ", "scarf": "स्कार्फ़", "scarves": "स्कार्फ़",
    "pen": "पेन", "pens": "पेन", "ticket": "टिकट", "tickets": "टिकट", "day": "दिन", "days": "दिन", "month": "महीना", "months": "महीने",
    "person": "व्यक्ति", "people": "लोग", "child": "बच्चा", "children": "बच्चे", "bus": "बस", "buses": "बसें", "kg": "किलो",
    "rupee": "रुपया", "rupees": "रुपये", "week": "हफ़्ता", "weeks": "हफ़्ते",
    "less than 1": "1 से कम", "your number": "तुम्हारी संख्या", "1 year": "1 साल", "12 months": "12 महीने",
    "7 days a week": "7 दिन का एक हफ़्ता", "12 months a year": "12 महीने का एक साल", "Steps": "चरण",
    "Divide": "भाग दो", "Divide to 1": "1 तक भाग दो", "Multiply": "गुणा करो", "Turn round": "घुमाओ", "Convert": "बदलो",
    "Extra part": "अतिरिक्त हिस्सा", "New story": "नई कहानी", "Into weeks": "हफ़्तों में", "Into a year": "एक साल में",
  },
  gu: {
    "Value of One": "એકની કિંમત",
    "Two rails, things on top and what they are worth underneath. Walk them back to one.": "બે પાટા, ઉપર વસ્તુઓ અને નીચે તેમની કિંમત. તેમને પાછા એક સુધી લઈ જાઓ.",
    "Every value of one found, every answer in the units asked, and every way walked that came out whole.": "દરેક વખતે એકની કિંમત મળી, દરેક જવાબ પૂછેલા એકમમાં આપ્યો, અને પૂર્ણ સંખ્યાવાળો રસ્તો પસંદ કર્યો.",
    "Free play. Any story, with the turn control, the converter and the more bracket open.": "મુક્ત રમત. કોઈ પણ વાર્તા, ફેરવવાનું બટન, બદલનાર અને વધારાના ભાગનો કૌંસ ખુલ્લાં છે.",
    "Find the value of one first": "પહેલાં એકની કિંમત શોધો",
    "How many things, and what are they worth together? Share that value out, one share for each thing.": "કેટલી વસ્તુઓ છે, અને બધીની મળીને કિંમત કેટલી છે? એ કિંમત વહેંચો, દરેક વસ્તુનો એક ભાગ.",
    "What is the value of all of them?": "બધાની કિંમત કેટલી છે?",
    "If 2 things cost ₹20, one costs ₹20 ÷ 2. Share the value by how many there are.": "જો 2 વસ્તુની કિંમત 20 રૂપિયા હોય, તો એકની કિંમત 20 રૂપિયા ÷ 2 છે. કિંમતને વસ્તુઓની સંખ્યાથી વહેંચો.",
    "The value of one is the value of many divided by how many there are.": "એકની કિંમત, ઘણાંની કિંમતને તેમની સંખ્યા વડે ભાગતાં મળે છે.",
    "You learned: divide the value of many by how many to find one.": "તમે શીખ્યા: એકની કિંમત માટે ઘણાંની કિંમતને સંખ્યા વડે ભાગો.",
    "6 notebooks cost ₹270. What does one notebook cost?": "6 નોટબુકની કિંમત 270 રૂપિયા છે. એક નોટબુકની કિંમત કેટલી છે?",
    "Cost of 1 notebook in ₹?": "1 નોટબુકની કિંમત, રૂપિયામાં?",
    "How many notebooks share the ₹270?": "270 રૂપિયા કેટલી નોટબુકમાં વહેંચાય છે?",
    "5 bags of flour weigh 135 kg. What does one bag weigh?": "લોટની 5 થેલીનું વજન 135 કિલોગ્રામ છે. એક થેલીનું વજન કેટલું છે?",
    "1 bag weighs how many kg?": "1 થેલી કેટલા કિલો?",
    "How many bags share the 135 kg?": "135 કિલોગ્રામ કેટલી થેલીમાં વહેંચાય છે?",
    "8 scarves cost ₹1,200. What does one scarf cost?": "8 સ્કાર્ફની કિંમત 1,200 રૂપિયા છે. એક સ્કાર્ફની કિંમત કેટલી છે?",
    "Cost of 1 scarf in ₹?": "1 સ્કાર્ફની કિંમત, રૂપિયામાં?",
    "How many scarves share the ₹1,200?": "1,200 રૂપિયા કેટલા સ્કાર્ફમાં વહેંચાય છે?",
    "Then multiply up to many": "પછી ઘણાં સુધી ગુણો",
    "Once one thing is priced, many is only that price again and again.": "એક વસ્તુની કિંમત ખબર હોય, તો ઘણાંની કિંમત એ જ કિંમત વારંવાર છે.",
    "How many does the question want?": "પ્રશ્ન કેટલી વસ્તુ માગે છે?",
    "If one costs ₹5, then 3 cost ₹5 × 3. Multiply the value of one by how many you need.": "જો એકની કિંમત 5 રૂપિયા હોય, તો 3 ની કિંમત 5 રૂપિયા × 3 છે. એકની કિંમતને જેટલી જોઈએ તેટલાથી ગુણો.",
    "The value of many is the value of one times how many are needed.": "ઘણાંની કિંમત, એકની કિંમતને જરૂરી સંખ્યા વડે ગુણતાં મળે છે.",
    "You learned: multiply the value of one by how many you need.": "તમે શીખ્યા: એકની કિંમતને જેટલી જોઈએ તેટલાથી ગુણો.",
    "One notebook costs ₹45. What do 14 notebooks cost?": "એક નોટબુકની કિંમત 45 રૂપિયા છે. 14 નોટબુકની કિંમત કેટલી છે?",
    "Cost of 14 notebooks in ₹?": "14 નોટબુકની કિંમત, રૂપિયામાં?",
    "Should 14 notebooks cost more than one notebook, or less?": "14 નોટબુકની કિંમત એક નોટબુક કરતાં વધારે હોવી જોઈએ, કે ઓછી?",
    "A pen costs ₹18. What do 12 pens cost?": "એક પેનની કિંમત 18 રૂપિયા છે. 12 પેનની કિંમત કેટલી છે?",
    "Cost of 12 pens in ₹?": "12 પેનની કિંમત, રૂપિયામાં?",
    "Should 12 pens cost more than one pen, or less?": "12 પેનની કિંમત એક પેન કરતાં વધારે હોવી જોઈએ, કે ઓછી?",
    "9 tickets cost ₹1,080. What do 4 tickets cost?": "9 ટિકિટની કિંમત 1,080 રૂપિયા છે. 4 ટિકિટની કિંમત કેટલી છે?",
    "Cost of 4 tickets in ₹?": "4 ટિકિટની કિંમત, રૂપિયામાં?",
    "What is one ticket worth first?": "પહેલાં, એક ટિકિટની કિંમત કેટલી છે?",
    "Answer the question that was asked": "જે પૂછ્યું છે, તેનો જ જવાબ આપો",
    "A working can be finished and still not answer the question. Look at what the question counts in.": "ગણતરી પૂરી થાય છતાં પ્રશ્નનો જવાબ ન મળે, એવું બને. જુઓ કે પ્રશ્ન શેમાં ગણે છે.",
    "What does the question count in?": "પ્રશ્ન શેમાં ગણે છે?",
    "7 days make 1 week, and 12 months make 1 year. For how much more, count only the extra part.": "7 દિવસનું 1 અઠવાડિયું થાય, અને 12 મહિનાનું 1 વર્ષ. કેટલું વધારે, તે માટે ફક્ત વધારાનો ભાગ ગણો.",
    "The answer is given in the units the question asks for, and how much more is the extra part only.": "જવાબ એ જ એકમમાં અપાય છે જે પ્રશ્ન પૂછે છે, અને કેટલું વધારે એટલે ફક્ત વધારાનો ભાગ.",
    "You learned: answer in the units asked; how much more is the extra.": "તમે શીખ્યા: પૂછેલા એકમમાં જવાબ આપો; કેટલું વધારે એટલે વધારાનો ભાગ.",
    "A child saves ₹35 every day for a bat that costs ₹1,960. How many weeks will the saving take?": "એક બાળક 1,960 રૂપિયાના બેટ માટે દરરોજ 35 રૂપિયા બચાવે છે. બચતમાં કેટલાં અઠવાડિયાં લાગશે?",
    "How many weeks?": "કેટલાં અઠવાડિયાં?",
    "What unit is your number in?": "તમારી સંખ્યા કયા એકમમાં છે?",
    "A room costs ₹4,200 for a week. How much more will the stay cost if it runs for 2 more days?": "એક રૂમનું એક અઠવાડિયાનું ભાડું 4,200 રૂપિયા છે. જો રોકાણ 2 દિવસ વધે, તો કેટલું વધારે થશે?",
    "How much more, in ₹?": "કેટલું વધારે, રૂપિયામાં?",
    "Is your number the whole stay, or only the extra days?": "તમારી સંખ્યા આખા રોકાણની છે, કે ફક્ત વધારાના દિવસોની?",
    "The school fee for 4 months is ₹10,000. What is the fee for a whole year?": "4 મહિનાની શાળા ફી 10,000 રૂપિયા છે. આખા વર્ષની ફી કેટલી છે?",
    "Fee for 1 year, in ₹?": "1 વર્ષની ફી, રૂપિયામાં?",
    "How many months make a year?": "કેટલા મહિનાનું એક વર્ષ થાય?",
    "Choosing which one to find": "કયું એક શોધવું, તે પસંદ કરવું",
    "One way round can give less than one. Then turn the rails round and look for a whole number.": "એક બાજુથી એક કરતાં ઓછું મળી શકે. ત્યારે પાટા ફેરવો અને પૂર્ણ સંખ્યા શોધો.",
    "What happens if the rails are turned round?": "પાટા ફેરવવાથી શું થાય છે?",
    "If 2 kg feed 20 people, then 1 kg feeds 20 ÷ 2 people. Turn the rails and find what 1 kg feeds.": "જો 2 કિલોગ્રામથી 20 લોકો જમે, તો 1 કિલોગ્રામથી 20 ÷ 2 લોકો. પાટા ફેરવો અને જુઓ કે 1 કિલોગ્રામથી કેટલા જમે.",
    "The value of one can be found either way round, and the way that comes out whole is the one to use.": "એકની કિંમત કોઈ પણ બાજુથી શોધી શકાય, અને જે બાજુ પૂર્ણ સંખ્યા આપે, તે જ લો.",
    "You learned: find one either way round and use the way that is whole.": "તમે શીખ્યા: કોઈ પણ બાજુથી એક શોધો, અને પૂર્ણ સંખ્યાવાળી બાજુ લો.",
    "30 kg of rice feeds 450 people. How much rice will 720 people need?": "30 કિલોગ્રામ ચોખાથી 450 લોકો જમે છે. 720 લોકોને કેટલા ચોખા જોઈએ?",
    "Rice for 720 people, in kg?": "720 લોકોના ચોખા, કિલોમાં?",
    "One person needs less than a kilogram. How many people does 1 kg feed?": "એક વ્યક્તિને એક કિલોગ્રામ કરતાં ઓછું જોઈએ. 1 કિલોગ્રામથી કેટલા લોકો જમે?",
    "16 kg of rice feeds 400 people. How much rice do 650 people need?": "16 કિલોગ્રામ ચોખાથી 400 લોકો જમે છે. 650 લોકોને કેટલા ચોખા જોઈએ?",
    "Rice for 650 people, in kg?": "650 લોકોના ચોખા, કિલોમાં?",
    "Should 650 people need so much more rice than 400 people need?": "શું 650 લોકોને 400 લોકો કરતાં આટલા વધારે ચોખા જોઈએ?",
    "4 buses carry 180 children, the same number in each. How many buses do 315 children need?": "4 બસમાં 180 બાળકો જાય છે, દરેક બસમાં સરખાં. 315 બાળકો માટે કેટલી બસ જોઈએ?",
    "Buses for 315 children?": "315 બાળકો માટે બસ?",
    "Does one child fill a whole bus?": "શું એક બાળક આખી બસ ભરી દે છે?",
    /* the rails' own words */
    "notebook": "નોટબુક", "notebooks": "નોટબુક", "bag": "થેલી", "bags": "થેલીઓ", "scarf": "સ્કાર્ફ", "scarves": "સ્કાર્ફ",
    "pen": "પેન", "pens": "પેન", "ticket": "ટિકિટ", "tickets": "ટિકિટ", "day": "દિવસ", "days": "દિવસ", "month": "મહિનો", "months": "મહિના",
    "person": "વ્યક્તિ", "people": "લોકો", "child": "બાળક", "children": "બાળકો", "bus": "બસ", "buses": "બસ", "kg": "કિલો",
    "rupee": "રૂપિયો", "rupees": "રૂપિયા", "week": "અઠવાડિયું", "weeks": "અઠવાડિયાં",
    "less than 1": "1 કરતાં ઓછું", "your number": "તમારી સંખ્યા", "1 year": "1 વર્ષ", "12 months": "12 મહિના",
    "7 days a week": "અઠવાડિયાના 7 દિવસ", "12 months a year": "વર્ષના 12 મહિના", "Steps": "પગલાં",
    "Divide": "ભાગો", "Divide to 1": "1 સુધી ભાગો", "Multiply": "ગુણો", "Turn round": "ફેરવો", "Convert": "બદલો",
    "Extra part": "વધારાનો ભાગ", "New story": "નવી વાર્તા", "Into weeks": "અઠવાડિયામાં", "Into a year": "એક વર્ષમાં",
  },
};

/* Items carry their story for the rails: A = the things (top rail, amber), B = their value (lower
   rail, blue); a things are worth b; w = how many the question wants. near = the misconception.
   unit = what the answer counts in (for the summary drawing). */
const PHASES = [
  {
    n: 1,
    concept: "Find the value of one first",
    conceptId: "M2.S4.T8.C28", objectiveIds: ["O13"],
    says: ["How many things, and what are they worth together? Share that value out, one share for each thing."],
    ladder: ["What is the value of all of them?", "If 2 things cost ₹20, one costs ₹20 ÷ 2. Share the value by how many there are."],
    closing: "The value of one is the value of many divided by how many there are.",
    learned: "You learned: divide the value of many by how many to find one.",
    traceback: "The child's number is set on the value rail at the stop it is really worth, then both rails walk back to one thing and the value of one settles there in green.",
    items: [
      /* learn ML1: answer in the plan = 45 rupees */
      { qid: "M2.S4.T8.C28:ML1", kind: "one", A: "notebook", B: "rs", a: 6, b: 270, unit: "rs", near: 1620, winMs: 2600,
        say: "6 notebooks cost ₹270. What does one notebook cost?", ask: "Cost of 1 notebook in ₹?", answer: 45, miss: "How many notebooks share the ₹270?" },
      /* practice 1: answer in the plan = 27 kg */
      { qid: "M2.S4.T8.C28:1", kind: "one", A: "bag", B: "kg", a: 5, b: 135, unit: "kg", near: 675, winMs: 2600,
        say: "5 bags of flour weigh 135 kg. What does one bag weigh?", ask: "1 bag weighs how many kg?", answer: 27, miss: "How many bags share the 135 kg?" },
      /* authored: the book's worked example 10 (8 scarves for ₹1,200), its first step. The plan gives
         this phase only two questions, and no other phase's question asks for a value of one. */
      { qid: null, kind: "one", A: "scarf", B: "rs", a: 8, b: 1200, unit: "rs", near: 9600, winMs: 2600,
        say: "8 scarves cost ₹1,200. What does one scarf cost?", ask: "Cost of 1 scarf in ₹?", answer: 150, miss: "How many scarves share the ₹1,200?" },
    ],
  },
  {
    n: 2,
    concept: "Then multiply up to many",
    conceptId: "M2.S4.T8.C29", objectiveIds: ["O13"],
    says: ["Once one thing is priced, many is only that price again and again."],
    ladder: ["How many does the question want?", "If one costs ₹5, then 3 cost ₹5 × 3. Multiply the value of one by how many you need."],
    closing: "The value of many is the value of one times how many are needed.",
    learned: "You learned: multiply the value of one by how many you need.",
    traceback: "The child's number is set at the stop it is really worth, then the rails walk back to one if they must and out to the number wanted, and its value settles there in green.",
    items: [
      /* learn ML2: answer in the plan = 630 rupees */
      { qid: "M2.S4.T8.C29:ML2", kind: "many", A: "notebook", B: "rs", a: 1, b: 45, w: 14, unit: "rs", near: 3, winMs: 2800,
        say: "One notebook costs ₹45. What do 14 notebooks cost?", ask: "Cost of 14 notebooks in ₹?", answer: 630, miss: "Should 14 notebooks cost more than one notebook, or less?" },
      /* practice 2: answer in the plan = 216 rupees */
      { qid: "M2.S4.T8.C29:2", kind: "many", A: "pen", B: "rs", a: 1, b: 18, w: 12, unit: "rs", near: 1, winMs: 2800,
        say: "A pen costs ₹18. What do 12 pens cost?", ask: "Cost of 12 pens in ₹?", answer: 216, miss: "Should 12 pens cost more than one pen, or less?" },
      /* practice 3: answer in the plan = 480 rupees, because one ticket costs 120 rupees and 4 times 120 is 480 */
      { qid: "M2.S4.T8.C29:3", kind: "many", A: "ticket", B: "rs", a: 9, b: 1080, w: 4, unit: "rs", near: 4320, winMs: 3400,
        say: "9 tickets cost ₹1,080. What do 4 tickets cost?", ask: "Cost of 4 tickets in ₹?", answer: 480, miss: "What is one ticket worth first?" },
    ],
  },
  {
    n: 3,
    concept: "Answer the question that was asked",
    conceptId: "M2.S4.T8.C30", objectiveIds: ["O14"],
    says: ["A working can be finished and still not answer the question. Look at what the question counts in."],
    ladder: ["What does the question count in?", "7 days make 1 week, and 12 months make 1 year. For how much more, count only the extra part."],
    closing: "The answer is given in the units the question asks for, and how much more is the extra part only.",
    learned: "You learned: answer in the units asked; how much more is the extra.",
    traceback: "The child's number is ringed where it stands on the rails, then the days are laid out in rows of 7, the months are made into a year, or the more bracket measures only the extra days, and the answer settles in green.",
    items: [
      /* learn ML3: answer in the plan = 8 weeks, because 1960 divided by 35 is 56 days, and 56 days is 8 weeks */
      { qid: "M2.S4.T8.C30:ML3", kind: "weeks", A: "day", B: "rs", a: 1, b: 35, total: 1960, unit: "weeks", near: 56, winMs: 3800,
        say: "A child saves ₹35 every day for a bat that costs ₹1,960. How many weeks will the saving take?", ask: "How many weeks?", answer: 8, miss: "What unit is your number in?" },
      /* practice 4: answer in the plan = 1200 rupees more. One day costs 600 rupees, and the question asks for the 2 extra days only, not the 5400 rupees of the whole 9 days */
      { qid: "M2.S4.T8.C30:4", kind: "more", A: "day", B: "rs", a: 7, b: 4200, extra: 2, unit: "rs", near: 5400, winMs: 2800,
        say: "A room costs ₹4,200 for a week. How much more will the stay cost if it runs for 2 more days?", ask: "How much more, in ₹?", answer: 1200, miss: "Is your number the whole stay, or only the extra days?" },
      /* practice 8: answer in the plan = 30,000 rupees. One month costs 2500 rupees, and a year is 12 months, so 2500 times 12 is 30,000 */
      { qid: "M2.S4.T8.C30:8", kind: "year", A: "month", B: "rs", a: 4, b: 10000, unit: "rs", near: 2500, winMs: 3000,
        say: "The school fee for 4 months is ₹10,000. What is the fee for a whole year?", ask: "Fee for 1 year, in ₹?", answer: 30000, miss: "How many months make a year?" },
      /* practice 5 (M2.S4.T8.C30:5, 2835 saved at 45 a day, 9 weeks) is left out: it is the same
         days-into-weeks question as ML3, and a phase holds exactly three */
    ],
  },
  {
    n: 4,
    concept: "Choosing which one to find",
    conceptId: "M2.S4.T8.C31", objectiveIds: ["O14"],
    says: ["One way round can give less than one. Then turn the rails round and look for a whole number."],
    ladder: ["What happens if the rails are turned round?", "If 2 kg feed 20 people, then 1 kg feeds 20 ÷ 2 people. Turn the rails and find what 1 kg feeds."],
    closing: "The value of one can be found either way round, and the way that comes out whole is the one to use.",
    learned: "You learned: find one either way round and use the way that is whole.",
    traceback: "The rails walk back to one person and stop short of a whole kilogram, turn round, walk back to one kilogram and a whole number of people, the child's number is set at the stop it is really worth, and the kilograms for the people asked settle in green.",
    items: [
      /* learn ML4: answer in the plan = 48 kg, found through the number of people one kilogram feeds */
      { qid: "M2.S4.T8.C31:ML4", kind: "turn", A: "person", B: "kg", a: 450, b: 30, w: 720, unit: "kg", near: 10800, winMs: 4200,
        say: "30 kg of rice feeds 450 people. How much rice will 720 people need?", ask: "Rice for 720 people, in kg?", answer: 48, miss: "One person needs less than a kilogram. How many people does 1 kg feed?" },
      /* practice 6: answer in the plan = 26 kg. 400 divided by 16 is 25 people for one kilogram, and 650 divided by 25 is 26 */
      { qid: "M2.S4.T8.C31:6", kind: "turn", A: "person", B: "kg", a: 400, b: 16, w: 650, unit: "kg", near: 16250, winMs: 4200,
        say: "16 kg of rice feeds 400 people. How much rice do 650 people need?", ask: "Rice for 650 people, in kg?", answer: 26, miss: "Should 650 people need so much more rice than 400 people need?" },
      /* practice 7: answer in the plan = 7 buses. The children for one bus, 45, comes out whole; one child's share of a bus does not. 315 divided by 45 is 7 */
      { qid: "M2.S4.T8.C31:7", kind: "turn", A: "child", B: "bus", a: 180, b: 4, w: 315, unit: "bus", near: 14175, winMs: 4200,
        say: "4 buses carry 180 children, the same number in each. How many buses do 315 children need?", ask: "Buses for 315 children?", answer: 7, miss: "Does one child fill a whole bus?" },
    ],
  },
];

/* every story, for free play */
const VO_ALL: any[] = PHASES.flatMap((p: any) => p.items);

/* ── the rails' geometry and look (working-area units) ───────────────────────────────── */
const VO = { x0: 184, pad: 110, top: 120, bot: 288, div: 182, mul: 226, topBase: 96, botTop: 312,
  key: { x: 184, y: 440, h: 80 }, conv: { x: 774, w: 312, h: 428 }, strip: { y: 378, h: 50 }, lamp: { x: 1043, y: 204 } };
const VO_AMB = CONTENT.ten, VO_BLU = CONTENT.hundred, VO_GRN = CONTENT.one;
const VO_INK_A = shade(VO_AMB, 0.42), VO_INK_B = shade(VO_BLU, 0.25), VO_INK_G = shade(VO_GRN, 0.32);
const VO_UNIT: any = {
  notebook: { one: "notebook", many: "notebooks", icon: "book" },
  bag: { one: "bag", many: "bags", icon: "bag" },
  scarf: { one: "scarf", many: "scarves", icon: "scarf" },
  pen: { one: "pen", many: "pens", icon: "pen" },
  ticket: { one: "ticket", many: "tickets", icon: "ticket" },
  day: { one: "day", many: "days", icon: "cal" },
  month: { one: "month", many: "months", icon: "cal" },
  person: { one: "person", many: "people", icon: "person" },
  child: { one: "child", many: "children", icon: "person" },
  bus: { one: "bus", many: "buses", icon: "bus" },
  kg: { one: "kg", many: "kg", icon: "weight" },
  rs: { one: "rupee", many: "rupees", icon: "coin", money: true },
};
const VO_CSS = `
.vo-move{transition:transform 560ms cubic-bezier(.3,.7,.25,1)}
.vo-new{animation:voIn 480ms ease-out both}
@keyframes voIn{from{opacity:0}to{opacity:1}}
@media (prefers-reduced-motion:reduce){.vo-move{transition:none}.vo-new{animation:none}}
`;

/* The numbers, rows, sizes and targets the working area needs (they go into the sidecar too). */
const MODEL = {
  rails: { x0: VO.x0, top: VO.top, bottom: VO.bot, stops: "sorted by count, evenly spaced; a tie joins the two values of one stop" },
  converter: { daysInWeek: 7, monthsInYear: 12 },
  units: Object.keys(VO_UNIT),
};

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* judge: is this value right for this item? (numbers compare as numbers) */
const judge = (item: any, v: any) => {
  if (item.parts) return judgeSlotParts(item, v);
  if (typeof item.answer === "number") return leadNumber(v) === item.answer;
  return String(v).trim().toLowerCase() === String(item.answer).trim().toLowerCase();
};
/* oracle: every answer re-derived by cross-multiplication, a route with no division in it (the
   picture divides to one and multiplies out; judge only compares) */
const oracle = () => PHASES.every((p: any) => p.items.every((it: any) => {
  const x = it.answer;
  if (typeof x !== "number") return false;
  if (it.kind === "one") return x * it.a === it.b;
  if (it.kind === "many" || it.kind === "turn") return x * it.a === it.b * it.w;
  if (it.kind === "weeks") return x * 7 * it.b === it.total;
  if (it.kind === "more") return x * it.a === it.b * it.extra;
  if (it.kind === "year") return x * it.a === it.b * 12;
  return false;
}));
/* the item's misconception: multiplying where one divides, dividing again, the days not the weeks,
   the whole stay not the extra, a month not a year, or multiplying after turning round */
const nearMiss = (item: any) => (item.parts ? item.answer.map((x: number, k: number) => (k === item.answer.length - 1 ? x + 1 : x)).join("|")
  : typeof item.near === "number" ? item.near : typeof item.answer === "number" ? item.answer + 1 : "~");
/* the forms of an answer that no question, hint or ladder line may print */
const answerForms = (item: any) => (item.parts ? item.answer.filter((x: number) => x >= 10).flatMap((x: number) => [String(x), indian(x), words(x)])
  : typeof item.answer === "number" ? [String(item.answer), indian(item.answer), words(item.answer)] : [String(item.answer)]);
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => item.answer;

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => (T.state().stage === "demo" ? HOOK.demo && HOOK.demo() : T.submit(item.answer));
/* the agent's answer() for an item made on the working area: set it as a child would; undefined = type it */
const answer = (item: any, v: any) => (item.pad === "enter" && HOOK.set ? HOOK.set(v) : undefined);
/* the agent's check() before Enter: e.g. drop a token that waits; undefined = press Enter */
const check = () => (HOOK.check ? HOOK.check() : undefined);
/* the slot shows what the child types with Indian commas from 1,000 */
const voFormat = (s: any) => { const t = String(s ?? ""); return /^[1-9]\d{3,}$/.test(t) ? indian(Number(t)) : t; };

/* ── helpers for the rails ──────────────────────────────────────────────────────────────── */
const voWhole = (x: number) => Math.abs(x - Math.round(x)) < 1e-9;
/* a number on a rail: ₹ before money; a part of one is written as a part, never rounded */
const voNum = (x: number, u: any) => (voWhole(x) ? (u && u.money ? "₹" : "") + indian(Math.round(x))
  : x < 1 ? "less than 1" : Math.floor(x) + " to " + Math.ceil(x));
/* a number with its unit named ("15 people", "less than 1 kg", "₹45") */
const voNamed = (x: number, u: any) => (!voWhole(x) ? "less than 1 " + u.one
  : u.money ? "₹" + indian(Math.round(x)) : indian(Math.round(x)) + " " + (Math.round(x) === 1 ? u.one : u.many));
const voAns = (v: number, unit: string) => (unit === "weeks" ? indian(v) + (v === 1 ? " week" : " weeks")
  : VO_UNIT[unit] ? voNamed(v, VO_UNIT[unit]) : indian(v));

/* What the rails hold for this item and this state: stops (each a pair tied together), walks
   (arcs with their ÷ or ×), the lamp, the record strip of the other way, the converter, the bracket,
   the keys, and the next thing to do. S = { oneA, oneB, many, turned, flipped, reveal, mine, conv, bracket }. */
function voScene(it: any, S: any, free: boolean, ink: string) {
  const A = VO_UNIT[it.A], B = VO_UNIT[it.B], k = it.kind, rev = !!S.reveal;
  const L = (x: number, u: any, fill: string, more?: any) => ({ text: voNum(x, u), fill, v: x, ...(more || {}) });
  const Q = (x: number) => ({ text: "?", fill: ink, unknown: true, v: x });
  /* ghosts: where a stop still to be walked will stand, so nothing jumps when it arrives */
  const out: any = { A, B, k, stops: [], arcs: [], ghosts: [], turned: false, lamp: null, record: null, conv: null, bracket: null, need: 1, done: 0, keys: [], next: null };
  const stops = out.stops, arcs = out.arcs;
  if (k === "one" || k === "many" || k === "turn") {
    const a = it.a, b = it.b, w = it.w || 0, r = b / a, ra = a / b;
    const turnable = k === "turn" || free, tb = turnable && !!S.turned;
    out.turned = tb;
    stops.push({ id: "given", sort: a, a: L(a, A, VO_INK_A), b: L(b, B, a === 1 ? VO_INK_G : VO_INK_B) });
    /* the first way: back to one thing */
    const oneA = a !== 1 && !tb && (!!S.oneA || (rev && k !== "turn"));
    if (oneA) {
      const whole = voWhole(r), open = k === "turn" || free || rev;
      stops.push({ id: "oneA", sort: 1, a: L(1, A, VO_INK_A),
        b: !open ? Q(r) : L(r, B, whole ? VO_INK_G : VO_INK_B, whole ? null : { part: r }) });
      arcs.push({ id: "divA", from: a, to: 1, label: "÷ " + indian(a), row: "div", steps: a - 1 });
    }
    /* turned round: back to one of the value (one kilogram feeds…) */
    const oneB = tb && !!S.oneB && b !== 1;
    if (oneB) {
      const whole = voWhole(ra);
      stops.push({ id: "oneB", sort: ra, a: L(ra, A, whole ? VO_INK_G : VO_INK_A, whole ? null : { part: ra }), b: L(1, B, VO_INK_B) });
      arcs.push({ id: "divB", from: a, to: ra, label: "÷ " + indian(b), row: "div", steps: b - 1 });
    }
    /* the number the question wants, lit further along */
    if (w && (!free || S.many)) {
      const bv = w * r, shown = rev || free;
      stops.push({ id: "want", sort: w, a: L(w, A, VO_INK_A, { lit: !shown }), b: shown ? L(bv, B, free ? VO_INK_B : VO_INK_G) : Q(bv) });
      const from = tb ? (oneB ? ra : null) : a === 1 || oneA ? 1 : null;
      const walked = k === "many" ? !!S.many || rev : k === "turn" && !free ? rev && tb : !!S.many;
      if (walked && from !== null) {
        const f = tb ? bv : w;
        arcs.push({ id: "mul", from, to: w, label: "× " + indian(Math.round(f)), row: "mul", steps: f - 1 });
      }
    }
    /* the child's number, at the stop it is really worth (or ringed where it already stands) */
    if (!free && S.mine !== null && S.mine !== undefined) {
      const xa = S.mine / r;
      const hit = stops.find((s: any) => Math.abs(s.sort - xa) < 1e-9);
      if (hit) hit.b = { ...hit.b, ring: true };
      /* turned round, the child's kilograms stand where they fall on the kilogram rail, tied to the
         people the question asked about (the writeup: "the people rail reading only 720") */
      else stops.push({ id: "mine", sort: xa, a: L(k === "turn" ? w : xa, A, ink), b: L(S.mine, B, ink), mine: true, tag: "your number" });
    }
    if (turnable) {
      if (tb ? oneB : oneA) out.lamp = { lit: voWhole(tb ? ra : r) };
      /* fromV/fromU, toV/toU: the same two readings as numbers and units, for Hindi and Gujarati */
      if (tb && S.oneA && a !== 1) out.record = { from: voNamed(1, A), to: voNamed(r, B), fromV: 1, fromU: A, toV: r, toU: B, lit: voWhole(r), part: voWhole(r) ? 0 : r, fromInk: VO_INK_A, toInk: VO_INK_B, bar: VO_BLU };
      if (!tb && S.oneB && b !== 1) out.record = { from: voNamed(1, B), to: voNamed(ra, A), fromV: 1, fromU: B, toV: ra, toU: A, lit: voWhole(ra), part: voWhole(ra) ? 0 : ra, fromInk: VO_INK_B, toInk: VO_INK_A, bar: VO_AMB };
    }
    if (tb ? !oneB && b !== 1 : !oneA && a !== 1) out.ghosts.push(tb ? ra : 1);
    const divOn = tb ? !oneB && b !== 1 : !oneA && a !== 1;
    const mulOn = !S.many && !rev && (tb ? oneB : a === 1 || oneA);
    if (free) {
      out.keys = [{ id: "divide", on: divOn, label: "Divide" }, ...(w ? [{ id: "multiply", on: !S.many && (tb ? oneB : a === 1 || oneA), label: "Multiply" }] : []),
        { id: "turn", on: true, label: "Turn round" }, { id: "new", on: true }];
    } else if (k === "one") {
      out.keys = [{ id: "divide", on: divOn }];
      out.done = oneA ? 1 : 0; out.next = divOn ? "divide" : null;
    } else if (k === "many") {
      out.keys = [...(a === 1 ? [] : [{ id: "divide", on: divOn }]), { id: "multiply", on: mulOn, label: "Multiply to " + indian(w) }];
      out.need = a === 1 ? 1 : 2;
      out.done = (a !== 1 && oneA ? 1 : 0) + (S.many || rev ? 1 : 0);
      out.next = a !== 1 && divOn ? "divide" : mulOn ? "multiply" : null;
    } else {
      out.keys = [{ id: "divide", on: divOn }, { id: "turn", on: true }];
      out.need = 3;
      out.done = (S.oneA ? 1 : 0) + (S.flipped ? 1 : 0) + (S.oneB ? 1 : 0);
      out.next = rev ? null : !tb && !S.oneA ? "divide" : !tb && !S.oneB ? "turn" : tb && !S.oneB ? "divide" : null;
    }
  } else {
    const r = it.b / it.a;
    stops.push({ id: "one", sort: 1, a: L(1, A, VO_INK_A), b: L(r, B, VO_INK_G) });
    if (k === "weeks") {
      const days = it.total / r;
      stops.push({ id: "end", sort: days, a: L(days, A, VO_INK_A), b: L(it.total, B, VO_INK_B) });
      arcs.push({ id: "mul", from: 1, to: days, label: "× " + indian(days), row: "mul", steps: days - 1 });
      const open = !!S.conv || rev;
      /* before the answer the days stay one undivided block; they snap into rows of 7 only at the win,
         in the correction and in free play (rows would let a child count the answer) */
      const rows = rev || (free && !!S.conv);
      out.conv = { kind: "weeks", open, days, rows, head: indian(days) + " " + A.many, result: rows ? voAns(days / 7, "weeks") : null };
      out.keys = [{ id: "conv", on: !open, label: "Into weeks" }];
      out.done = open ? 1 : 0; out.next = open ? null : "conv";
    } else if (k === "more") {
      const whole = it.a + it.extra;
      stops.push({ id: "given", sort: it.a, a: L(it.a, A, VO_INK_A), b: L(it.b, B, VO_INK_B) });
      stops.push({ id: "whole", sort: whole, a: L(whole, A, VO_INK_A), b: L(whole * r, B, VO_INK_B) });
      arcs.push({ id: "div", from: it.a, to: 1, label: "÷ " + indian(it.a), row: "div", steps: it.a - 1 });
      arcs.push({ id: "mul", from: 1, to: whole, label: "× " + indian(whole), row: "mul", steps: whole - 1 });
      const open = !!S.bracket || rev;
      if (open) out.bracket = { from: it.a, to: whole, top: indian(it.extra) + " more " + A.many,
        val: rev || free ? L(it.extra * r, B, VO_INK_G) : Q(it.extra * r) };
      out.keys = [{ id: "bracket", on: !open, label: "Extra part" }];
      out.done = open ? 1 : 0; out.next = open ? null : "bracket";
    } else {
      stops.push({ id: "given", sort: it.a, a: L(it.a, A, VO_INK_A), b: L(it.b, B, VO_INK_B) });
      arcs.push({ id: "div", from: it.a, to: 1, label: "÷ " + indian(it.a), row: "div", steps: it.a - 1 });
      const open = !!S.conv || rev;
      if (open) {
        stops.push({ id: "year", sort: 12, a: L(12, A, VO_INK_A), b: rev || free ? L(12 * r, B, VO_INK_G) : Q(12 * r), tag: "1 year" });
        arcs.push({ id: "mul", from: 1, to: 12, label: "× 12", row: "mul", steps: 11 });
      }
      else out.ghosts.push(12);
      out.conv = { kind: "year", open };
      out.keys = [{ id: "conv", on: !open, label: "Into a year" }];
      out.done = open ? 1 : 0; out.next = open ? null : "conv";
    }
    if (free) out.keys.push({ id: "new", on: true });
    /* the child's number, ringed wherever it already stands (the days, the whole stay, one month) */
    if (!free && S.mine !== null && S.mine !== undefined)
      stops.forEach((s: any) => ["a", "b"].forEach((side) => { if (!s[side].unknown && s[side].v === S.mine) s[side] = { ...s[side], ring: true }; }));
  }
  return out;
}

/* ── small drawings ─────────────────────────────────────────────────────────────────── */
/* the thing a rail counts, in a 40-unit box centred on 0,0 */
function VoIcon({ kind, col }: any) {
  const s = shade(col, 0.3), p: any = { fill: tint(col, 0.35), stroke: s, strokeWidth: 3, strokeLinejoin: "round" };
  if (kind === "book") return <g><rect x={-13} y={-16} width={26} height={32} rx={4} {...p} /><line x1={-6} y1={-16} x2={-6} y2={16} stroke={s} strokeWidth={3} /></g>;
  if (kind === "bag") return <path d="M -14 16 L -16 -2 Q -16 -10 -8 -10 L -10 -16 L 10 -16 L 8 -10 Q 16 -10 16 -2 L 14 16 Z" {...p} />;
  if (kind === "scarf") return <g><path d="M -17 -12 Q 0 -4 17 -12 L 17 -3 Q 0 5 -17 -3 Z" {...p} /><path d="M 4 1 L 9 16 L 2 16 L -2 2 Z" {...p} /></g>;
  if (kind === "pen") return <g transform="rotate(35)"><rect x={-5} y={-17} width={10} height={26} rx={3} {...p} /><path d="M -5 9 L 0 17 L 5 9 Z" {...p} /></g>;
  if (kind === "ticket") return <g><path d="M -17 -11 H 17 V -4 A 4 4 0 0 0 17 4 V 11 H -17 V 4 A 4 4 0 0 0 -17 -4 Z" {...p} /><line x1={6} y1={-9} x2={6} y2={9} stroke={s} strokeWidth={2} strokeDasharray="3 3" /></g>;
  if (kind === "cal") return (
    <g><rect x={-15} y={-13} width={30} height={28} rx={4} {...p} /><rect x={-15} y={-13} width={30} height={8} rx={3} fill={s} />
      <line x1={-7} y1={-17} x2={-7} y2={-9} stroke={s} strokeWidth={3} strokeLinecap="round" /><line x1={7} y1={-17} x2={7} y2={-9} stroke={s} strokeWidth={3} strokeLinecap="round" /></g>
  );
  if (kind === "person") return <g><circle cx={0} cy={-9} r={7} {...p} /><path d="M -12 16 Q -12 0 0 0 Q 12 0 12 16 Z" {...p} /></g>;
  if (kind === "bus") return (
    <g><rect x={-17} y={-13} width={34} height={24} rx={5} {...p} /><rect x={-12} y={-8} width={9} height={8} rx={2} fill="#FFFFFF" />
      <rect x={3} y={-8} width={9} height={8} rx={2} fill="#FFFFFF" /><circle cx={-9} cy={13} r={4} fill={s} /><circle cx={9} cy={13} r={4} fill={s} /></g>
  );
  if (kind === "weight") return <g><path d="M -14 15 L -10 -6 H 10 L 14 15 Z" {...p} /><circle cx={0} cy={-11} r={5} fill="none" stroke={s} strokeWidth={3} /></g>;
  return <g><circle r={16} {...p} /><circle r={9} fill="none" stroke={s} strokeWidth={2} /></g>;
}
/* the glyph on a key */
function VoGlyph({ id, c }: any) {
  const p: any = { fill: "none", stroke: c, strokeWidth: 4, strokeLinecap: "round", strokeLinejoin: "round" };
  if (id === "divide") return <g><line x1={-10} y1={0} x2={10} y2={0} {...p} /><circle cx={0} cy={-8} r={3} fill={c} /><circle cx={0} cy={8} r={3} fill={c} /></g>;
  if (id === "multiply") return <path d="M -8 -8 L 8 8 M 8 -8 L -8 8" {...p} />;
  if (id === "turn") return <path d="M -11 -5 L -5 -11 L 1 -5 M -5 -11 V 11 M 11 5 L 5 11 L -1 5 M 5 11 V -11" {...p} />;
  if (id === "conv") return <g><rect x={-10} y={-9} width={20} height={19} rx={3} {...p} /><line x1={-10} y1={-3} x2={10} y2={-3} {...p} /></g>;
  if (id === "bracket") return <path d="M -11 -5 V 4 H 11 V -5" {...p} />;
  return <path d="M -9 0 H 9 M 3 -6 L 9 0 L 3 6" {...p} />;
}
/* a number on a rail: plain, lit (the number wanted), ringed (the child's), unknown (?), or a part */
function VoLabel({ L, x, base, size, C, bar, show = (s: any) => s }: any) {
  if (!L) return null;
  const text = show(L.text);   /* the reading in the language in use ("less than 1" / "1 से कम") */
  const cy = base - size * 0.36;
  const ring = (w: number, h: number) => <rect x={x - w / 2} y={cy - h / 2} width={w} height={h} rx={12} fill="none" stroke={C.accent} strokeWidth={3} strokeDasharray="8 6" />;
  if (L.unknown) return (
    <g>
      <rect x={x - 32} y={cy - 26} width={64} height={52} rx={12} fill="#FFFFFF" stroke={C.ink} strokeWidth={2.5} strokeDasharray="7 6" />
      <text x={x} y={cy + 15} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={C.ink}>?</text>
      {L.ring && ring(84, 70)}
    </g>
  );
  const w = text.length * size * 0.6;
  return (
    <g>
      {L.lit && <rect x={x - w / 2 - 14} y={cy - size / 2 - 8} width={w + 28} height={size + 16} rx={(size + 16) / 2} fill="#FFFFFF" stroke={VO_AMB} strokeWidth={3} />}
      {L.ring && ring(w + 28, size + 18)}
      <text x={x} y={base} textAnchor="middle" fontSize={size} fontWeight={700} fill={L.fill}>{text}</text>
      {bar && L.part ? (
        <g>
          <rect x={x - 48} y={base + 12} width={96} height={12} rx={6} fill="#FFFFFF" stroke={bar} strokeWidth={2} />
          <rect x={x - 48} y={base + 12} width={Math.max(4, 96 * L.part)} height={12} rx={4} fill={bar} />
        </g>
      ) : null}
    </g>
  );
}
/* the whole number lamp: lit green when the way walked comes out whole */
function VoLamp({ x, y, lit, r, C }: any) {
  return (
    <g transform={`translate(${x},${y})`}>
      {lit && [0, 45, 90, 135, 180, 225, 270, 315].map((d) => (
        <line key={d} x1={0} y1={-r - 7} x2={0} y2={-r - 17} transform={`rotate(${d})`} stroke={VO_INK_G} strokeWidth={4} strokeLinecap="round" />
      ))}
      <circle cx={0} cy={0} r={r} fill={lit ? "url(#gOne)" : tint(C.panel, 0.2)} stroke={lit ? VO_INK_G : C.ink} strokeWidth={3} />
      <rect x={-r * 0.45} y={r - 2} width={r * 0.9} height={r * 0.5} rx={3} fill={C.ink} />
    </g>
  );
}

/* ── the working area: 1086 x 528, origin at its top-left ──────────────────────────────── */
function Work({ n, item, index, stage, wrong, api, lang = "en", tx: tr = (v: any) => v }: any) {
  const C = api.C;
  /* the rails' readings in the language in use (English as voScene writes them) */
  const trTxt = (s: string) => (lang === "en" ? s : s === "less than 1" ? tr(s)
    : String(s).replace(/^(\d+) to (\d+)$/, lang === "hi" ? "$1 से $2" : "$1 થી $2"));
  const namedT = (x: number, u: any) => (lang === "en" ? voNamed(x, u)
    : !voWhole(x) ? (lang === "hi" ? `1 ${tr(u.one)} से कम` : `1 ${tr(u.one)} કરતાં ઓછું`)
      : u.money ? "₹" + indian(Math.round(x)) : indian(Math.round(x)) + " " + tr(Math.round(x) === 1 ? u.one : u.many));
  const tl = useTimeline();
  const free = stage === "free";
  const curKey = free ? "free" : n + ":" + index;
  const fresh = (story?: number) => ({ key: curKey, oneA: false, oneB: false, many: false, turned: false, flipped: false, reveal: false,
    mine: null, conv: false, bracket: false, story: story || 0 });
  const [st, setSt] = useState<any>(() => fresh());
  const S = st.key === curKey ? st : fresh();
  const sRef = useRef(S); sRef.current = S;
  const up = (patch: any) => { const k0 = curKey; setSt((o: any) => (o.key === k0 ? { ...o, ...patch } : o)); };
  useEffect(() => { tl.stop(); setSt(fresh()); api.lock(false); }, [curKey]);

  const it = free ? VO_ALL[S.story % VO_ALL.length] : item;
  const sc = voScene(it, S, free, C.ink);
  const busy = tl.busy;
  const live = !busy && (stage === "ask" || stage === "teach" || free);

  /* typed answers go straight to the slot */
  api.onEnter(null);

  const act = (id: string) => {
    if (!live) return;
    const s = sRef.current;
    if (id === "new") { setSt({ ...fresh(), story: (s.story + 1) % VO_ALL.length }); api.sfx.tick(); return; }
    if (id === "divide") up(s.turned && (it.kind === "turn" || free) ? { oneB: true } : { oneA: true });
    else if (id === "multiply") up({ many: true });
    else if (id === "turn") up({ turned: !s.turned, flipped: true });
    else if (id === "conv") up({ conv: true });
    else if (id === "bracket") up({ bracket: true });
    api.sfx.tick();
  };

  /* the rest of the walk, ending on the whole right answer in green (the win, and the end of a traceback) */
  const finish = () => {
    const s = sRef.current, k = it.kind, P: any[] = [];
    const step = (ms: number, patch: any) => P.push([ms, () => { up(patch); api.sfx.tick(); }]);
    if (k === "one" && !s.oneA) step(800, { oneA: true });
    if (k === "many") { if (it.a !== 1 && !s.oneA) step(800, { oneA: true }); if (!s.many) step(800, { many: true }); }
    if (k === "turn") {
      if (!s.turned) { if (!s.oneA) step(900, { oneA: true }); step(1000, { turned: true, flipped: true }); }
      if (!s.oneB) step(900, { oneB: true });
    }
    if ((k === "weeks" || k === "year") && !s.conv) step(800, { conv: true });
    if (k === "more" && !s.bracket) step(800, { bracket: true });
    P.push([k === "weeks" ? 1900 : 1000, () => up({ reveal: true })]);
    return P;
  };
  useEffect(() => { if (stage === "win") tl.run(finish()); }, [stage]);

  /* the traceback: the child's number is set where it really stands, then the walk is redrawn to
     the whole right answer; nothing marked, nothing cleared */
  useEffect(() => {
    if (!wrong || stage !== "ask") return;
    api.lock(true);
    const v = leadNumber(wrong.value);
    const P: any[] = [[400, () => {}]];
    if (v !== null) P.push([1100, () => up({ mine: v })]);
    tl.run([...P, ...finish()], () => api.lock(false));
  }, [wrong]);

  /* ── layout: stops in order of count, evenly spaced along the rails ── */
  const X1 = sc.conv ? 750 : 1000;
  const order = sc.stops.slice().sort((p: any, q: any) => p.sort - q.sort);
  const slots = [...order.map((s: any) => s.sort), ...sc.ghosts].sort((p: number, q: number) => p - q)
    .filter((v: number, i: number, all: number[]) => i === 0 || Math.abs(v - all[i - 1]) > 1e-9);
  const nSl = slots.length;
  const idx = (sort: number) => Math.max(0, slots.findIndex((v: number) => Math.abs(v - sort) < 1e-9));
  const xOf = (sort: number) => (nSl > 1 ? VO.x0 + VO.pad + (idx(sort) * (X1 - VO.x0 - 2 * VO.pad)) / (nSl - 1) : (VO.x0 + X1) / 2);
  const xs = order.map((s: any) => xOf(s.sort));
  /* each row of numbers takes the biggest type that keeps every number in it clear of its neighbours */
  const rowSizes = (labs: any[]) => {
    const wd = (l: any, z: number) => (l.unknown ? 64 : l.text.length * z * 0.6 + (l.lit ? 28 : 0));
    const z = [T.speech, T.label].find((zz) => labs.every((l: any, i: number) =>
      !(i === 0 && xs[0] - wd(l, zz) / 2 < 166) && !(i === labs.length - 1 && xs[i] + wd(l, zz) / 2 > (sc.conv ? 762 : 1078))
      && (i === 0 || (wd(l, zz) + wd(labs[i - 1], zz)) / 2 + 18 <= xs[i] - xs[i - 1]))) || T.micro;
    return labs.map(() => z);
  };
  const topSz = rowSizes(order.map((s: any) => (sc.turned ? s.b : s.a)));
  const botSz = rowSizes(order.map((s: any) => (sc.turned ? s.a : s.b)));
  const railY = (u: string) => ((u === "A") !== sc.turned ? VO.top : VO.bot);
  const topCol = sc.turned ? VO_BLU : VO_AMB, botCol = sc.turned ? VO_AMB : VO_BLU;
  const botBase = VO.botTop + T.speech * 0.72;

  /* keys along the foot */
  const nk = sc.keys.length, KW = nk >= 4 ? 258 : 330, KG = nk >= 4 ? 18 : 24, KX = nk >= 3 ? 0 : VO.key.x;
  const keyName: any = { divide: "Divide to 1", multiply: "Multiply", turn: "Turn round", conv: "Convert", bracket: "Extra part", new: "New story" };
  const quiet = mix(C.ink, C.panel, 0.5);
  const nextAt = sc.keys.findIndex((k: any) => k.id === sc.next && k.on);
  const invite = stage === "ask" && !busy && !S.reveal && nextAt >= 0 ? { x: KX + nextAt * (KW + KG) + 42, y: VO.key.y + VO.key.h / 2 } : null;

  /* what the host and the agent read back (toolApi.getState); nothing here answers before the child */
  const oneStop = sc.stops.find((s: any) => ["oneA", "oneB", "one"].includes(s.id) || (s.id === "given" && it.a === 1));
  const oneLab = oneStop ? (oneStop.id === "oneB" ? oneStop.a : oneStop.b) : null;
  api.share({ story: free ? S.story + 1 : null, things: it.a, value: it.kind === "weeks" ? it.total : it.b, wanted: it.w || null,
    valueOfOne: oneLab && !oneLab.unknown && !oneLab.part ? oneLab.v : null, turned: sc.turned, unitAsked: it.unit,
    stepsWalked: Math.min(sc.done, sc.need), stepsNeeded: sc.need });

  const P = VO.conv, pcx = P.x + P.w / 2;
  return (
    <g>
      <style>{VO_CSS}</style>

      {/* running count: the steps walked against the steps this question needs */}
      {!free && (
        <g data-zone="runs">
          <rect x={0} y={-94} width={330} height={76} rx={RAD.panel} fill="url(#gPanel)" stroke={C.rule} strokeWidth={2} />
          <text x={20} y={-46} fontSize={T.micro} fontWeight={600} fill={C.ink}>{tr("Steps")}</text>
          <text x={312} y={-45} textAnchor="end" fontSize={T.label} fontWeight={700} fill={C.ink}>{lang === "hi" ? sc.need + " में से " + Math.min(sc.done, sc.need)
            : lang === "gu" ? sc.need + " માંથી " + Math.min(sc.done, sc.need) : Math.min(sc.done, sc.need) + " of " + sc.need}</text>
        </g>
      )}

      {/* the two rails, each with its name; they cross over when turned */}
      {["A", "B"].map((u) => {
        const U = u === "A" ? sc.A : sc.B, col = u === "A" ? VO_AMB : VO_BLU;
        return (
          <g key={u} className="vo-move" style={{ transform: `translateY(${railY(u)}px)` } as any}>
            <rect x={0} y={-38} width={156} height={76} rx={18} fill={tint(col, 0.84)} stroke={tint(col, 0.3)} strokeWidth={2} />
            <g transform="translate(78,-14)"><VoIcon kind={U.icon} col={col} /></g>
            <text x={78} y={26} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tr(U.many)}</text>
            <rect x={VO.x0} y={-8} width={X1 - VO.x0} height={16} rx={8} fill={u === "A" ? "url(#gTen)" : "url(#gHundred)"} />
            <path d={`M ${VO.x0 + 10} -5 H ${X1 - 10}`} stroke="#FFFFFF" strokeOpacity={0.55} strokeWidth={3} strokeLinecap="round" />
          </g>
        );
      })}

      {/* the walks: the same ÷ or × on both rails, one label between them */}
      <g key={"walks" + (sc.turned ? 1 : 0)} className="vo-new">
        {sc.arcs.map((a: any) => {
          const x1 = xOf(a.from), x2 = xOf(a.to), mx = (x1 + x2) / 2, ly = a.row === "div" ? VO.div : VO.mul;
          const yT = VO.top + 12, yB = VO.bot - 12, d = 36, lw = a.label.length * T.label * 0.6 + 28;
          const head = (y0: number, cy: number) => (
            <path d="M 2 0 L -12 -7 L -12 7 Z" transform={`translate(${x2},${y0}) rotate(${(Math.atan2(y0 - cy, x2 - mx) * 180) / Math.PI})`} fill={C.ink} />
          );
          const i1 = idx(a.from), i2 = idx(a.to);
          const ticks = Math.abs(i1 - i2) === 1 && a.steps > 1 && a.steps <= 20 && voWhole(a.steps) ? a.steps : 0;
          return (
            <g key={a.id} className="vo-new">
              <path d={`M ${x1} ${yT} Q ${mx} ${yT + 2 * d} ${x2} ${yT}`} fill="none" stroke={C.ink} strokeWidth={3} />
              <path d={`M ${x1} ${yB} Q ${mx} ${yB - 2 * d} ${x2} ${yB}`} fill="none" stroke={C.ink} strokeWidth={3} />
              {head(yT, yT + 2 * d)}
              {head(yB, yB - 2 * d)}
              {Array.from({ length: Math.max(0, ticks - 1) }).map((_, j) => {
                const tx = x1 + ((x2 - x1) * (j + 1)) / ticks;
                return (
                  <g key={j} className="vo-new" style={{ animationDelay: `${j * 45}ms` } as any}>
                    <line x1={tx} y1={VO.top - 12} x2={tx} y2={VO.top + 12} stroke={shade(topCol, 0.35)} strokeWidth={3} strokeLinecap="round" />
                    <line x1={tx} y1={VO.bot - 12} x2={tx} y2={VO.bot + 12} stroke={shade(botCol, 0.35)} strokeWidth={3} strokeLinecap="round" />
                  </g>
                );
              })}
              <rect x={mx - lw / 2} y={ly - 22} width={lw} height={44} rx={22} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} />
              <text x={mx} y={ly + 11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{a.label}</text>
            </g>
          );
        })}
      </g>

      {/* the stops: a tie from the things to their value, never one without the other */}
      <g key={"stops" + (sc.turned ? 1 : 0)} className="vo-new">
        {order.map((s: any, i: number) => {
          const x = xs[i], topL = sc.turned ? s.b : s.a, botL = sc.turned ? s.a : s.b;
          return (
            <g key={s.id} className="vo-new">
              <line x1={x} y1={VO.top + 12} x2={x} y2={VO.bot - 12} stroke={CONTENT.line} strokeWidth={3} strokeDasharray={s.mine ? "9 8" : undefined} />
              <circle cx={x} cy={VO.top} r={12} fill="#FFFFFF" stroke={shade(topCol, 0.2)} strokeWidth={5} />
              <circle cx={x} cy={VO.bot} r={12} fill="#FFFFFF" stroke={shade(botCol, 0.2)} strokeWidth={5} />
              {s.tag && <text x={x} y={40} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tr(s.tag)}</text>}
              <VoLabel L={topL} x={x} base={VO.topBase} size={topSz[i]} C={C} show={trTxt} />
              <VoLabel L={botL} x={x} base={VO.botTop + botSz[i] * 0.72} size={botSz[i]} C={C} bar={botCol} show={trTxt} />
            </g>
          );
        })}
      </g>

      {/* the whole number lamp over the right-hand end of the rails */}
      {sc.lamp && <g key={"lamp" + sc.lamp.lit} className="vo-new"><VoLamp x={VO.lamp.x} y={VO.lamp.y} r={22} lit={sc.lamp.lit} C={C} /></g>}

      {/* the record strip: the other way round, still standing */}
      {sc.record && (() => {
        const R0 = sc.record, R = lang === "en" ? R0 : { ...R0, from: namedT(R0.fromV, R0.fromU), to: namedT(R0.toV, R0.toU) };
        const y = VO.strip.y, base = y + 37, x0 = VO.x0 + 24, w1 = R.from.length * T.label * 0.6;
        const x2 = x0 + w1 + 70, w2 = R.to.length * T.label * 0.6;
        return (
          <g className="vo-new">
            <rect x={VO.x0} y={y} width={1000 - VO.x0} height={VO.strip.h} rx={16} fill={tint(C.panel, 0.45)} stroke={C.rule} strokeWidth={2} />
            <text x={x0} y={base} fontSize={T.label} fontWeight={700} fill={R.fromInk}>{R.from}</text>
            <path d={`M ${x0 + w1 + 14} ${y + 26} H ${x2 - 14} M ${x2 - 24} ${y + 18} L ${x2 - 14} ${y + 26} L ${x2 - 24} ${y + 34}`} fill="none" stroke={C.ink} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
            <text x={x2} y={base} fontSize={T.label} fontWeight={700} fill={R.toInk}>{R.to}</text>
            {R.part > 0 && (
              <g>
                <rect x={x2 + w2 + 20} y={y + 20} width={96} height={12} rx={6} fill="#FFFFFF" stroke={R.bar} strokeWidth={2} />
                <rect x={x2 + w2 + 20} y={y + 20} width={Math.max(4, 96 * R.part)} height={12} rx={4} fill={R.bar} />
              </g>
            )}
            <VoLamp x={950} y={y + 24} r={13} lit={R.lit} C={C} />
          </g>
        );
      })()}

      {/* the more bracket: only the extra stretch, measured alone */}
      {sc.bracket && (() => {
        const x1 = xOf(sc.bracket.from), x2 = xOf(sc.bracket.to), mx = (x1 + x2) / 2;
        return (
          <g className="vo-new">
            <path d={`M ${x1} 56 V 44 H ${x2} V 56`} fill="none" stroke={CONTENT.line} strokeWidth={3} strokeLinejoin="round" />
            <text x={mx} y={32} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{lang === "hi" ? `${indian(it.extra)} और ${tr(sc.A.many)}`
              : lang === "gu" ? `${indian(it.extra)} વધુ ${tr(sc.A.many)}` : sc.bracket.top}</text>
            <path d={`M ${x1} ${botBase + 10} V ${botBase + 22} H ${x2} V ${botBase + 10}`} fill="none" stroke={CONTENT.line} strokeWidth={3} strokeLinejoin="round" />
            <VoLabel L={sc.bracket.val} x={mx} base={414} size={T.speech} C={C} show={trTxt} />
          </g>
        );
      })()}

      {/* the converter beside the answer column: days into weeks in rows of 7, months into a year in a row of 12 */}
      {sc.conv && (
        <g>
          <rect x={P.x} y={0} width={P.w} height={P.h} rx={RAD.panel} fill={tint(C.panel, 0.45)} stroke={C.rule} strokeWidth={2} />
          {!sc.conv.open ? (
            <g>
              <g transform={`translate(${pcx},170) scale(2.2)`}><VoIcon kind="cal" col={VO_AMB} /></g>
              <text x={pcx} y={262} textAnchor="middle" fontSize={sc.conv.kind === "weeks" ? T.label : T.micro} fontWeight={600} fill={C.ink}>
                {tr(sc.conv.kind === "weeks" ? "7 days a week" : "12 months a year")}</text>
            </g>
          ) : sc.conv.kind === "weeks" ? (
            <g>
              <text x={pcx} y={42} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={VO_INK_A}>{lang === "en" ? sc.conv.head : indian(sc.conv.days) + " " + tr(sc.A.many)}</text>
              {!sc.conv.rows && (
                <g className="vo-new">
                  <rect x={P.x + 20} y={60} width={272} height={312} rx={12} fill={tint(VO_AMB, 0.6)} stroke={shade(VO_AMB, 0.25)} strokeWidth={2} />
                  <text x={pcx} y={228} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={C.ink}>{tr("7 days a week")}</text>
                </g>
              )}
              {sc.conv.rows && Array.from({ length: Math.ceil(sc.conv.days / 7) }).map((_, r) => (
                <g key={r} className="vo-new" style={{ animationDelay: `${r * 160}ms` } as any}>
                  {Array.from({ length: Math.min(7, sc.conv.days - r * 7) }).map((__, c) => (
                    <rect key={c} x={P.x + 20 + c * 40} y={60 + r * 40} width={32} height={32} rx={6} fill="url(#gTen)" stroke={shade(VO_AMB, 0.25)} strokeWidth={1.5} />
                  ))}
                </g>
              ))}
              {sc.conv.result && <text className="vo-new" x={pcx} y={416} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={VO_INK_G}>{lang === "en" ? sc.conv.result
                : indian(sc.conv.days / 7) + " " + tr(sc.conv.days / 7 === 1 ? "week" : "weeks")}</text>}
            </g>
          ) : (
            <g>
              <text x={pcx} y={42} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={VO_INK_A}>{tr("12 months")}</text>
              {Array.from({ length: 12 }).map((_, c) => (
                <rect key={c} className="vo-new" style={{ animationDelay: `${c * 60}ms` } as any} x={P.x + 8 + c * 25} y={150} width={22} height={34} rx={5} fill="url(#gTen)" stroke={shade(VO_AMB, 0.25)} strokeWidth={1.5} />
              ))}
              <path d={`M ${P.x + 8} 198 V 210 H ${P.x + 8 + 12 * 25 - 3} V 198`} fill="none" stroke={CONTENT.line} strokeWidth={3} strokeLinejoin="round" />
              <text x={pcx} y={254} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{tr("1 year")}</text>
            </g>
          )}
        </g>
      )}

      {/* the keys along the foot: walk back to one, out to many, turn round, convert, bracket */}
      {sc.keys.map((k: any, j: number) => {
        const x = KX + j * (KW + KG), on = live && k.on, lab0 = k.label || keyName[k.id];
        const lab = lang === "en" ? lab0 : /^Multiply to /.test(lab0)
          ? (lang === "hi" ? lab0.replace(/^Multiply to (.+)$/, "$1 तक गुणा करो") : lab0.replace(/^Multiply to (.+)$/, "$1 સુધી ગુણો")) : tr(lab0);
        const z = lab.length * T.label * 0.56 <= KW - 102 ? T.label : T.micro;
        return (
          <Key key={k.id} id={"walk-" + k.id} label={lab} x={x} y={VO.key.y} w={KW} h={VO.key.h} C={C} disabled={!on} onClick={() => act(k.id)}>
            <g transform={`translate(${-KW / 2 + 42},0)`}>
              <circle r={24} fill={on ? "#FFFFFF" : tint(C.panel, 0.3)} stroke={on ? C.rule : tint(C.rule, 0.4)} strokeWidth={2} />
              <VoGlyph id={k.id} c={on ? C.ink : quiet} />
            </g>
            <text x={-KW / 2 + 90} y={z * 0.36} fontSize={z} fontWeight={600} fill={on ? C.ink : quiet}>{lab}</text>
          </Key>
        );
      })}

      {invite && <Invite x={invite.x} y={invite.y} r={32} C={C} />}
    </g>
  );
}

/* the summary page's small drawing: the child's last right answer, in the units asked, under a tie */
function Thumb({ result, C, w, h, lang = "en", tx = (v: any) => v }: any) {
  const L = (result && result.last) || {};
  const v = leadNumber(L.value);
  if (v === null || v === undefined) return null;
  const unit = (L.shared && L.shared.unitAsked) || "";
  /* the answer in the language in use: the units are words (the rupee sign stays), English as voAns writes it */
  const U = VO_UNIT[unit];
  const ans = lang === "en" || !(unit === "weeks" || U) ? voAns(v, unit)
    : unit === "weeks" ? indian(v) + " " + tx(v === 1 ? "week" : "weeks")
      : U.money ? "₹" + indian(Math.round(v)) : indian(Math.round(v)) + " " + tx(Math.round(v) === 1 ? U.one : U.many);
  const my = h / 2;
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      <rect x={14} y={my - 17} width={56} height={9} rx={4.5} fill="url(#gTen)" />
      <rect x={14} y={my + 8} width={56} height={9} rx={4.5} fill="url(#gHundred)" />
      <line x1={42} y1={my - 8} x2={42} y2={my + 8} stroke={CONTENT.line} strokeWidth={3} />
      <text x={w - 16} y={my + 11} textAnchor="end" fontSize={T.label} fontWeight={700} fill={VO_INK_G}>{ans}</text>
    </g>
  );
}

function ValueOfOne(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, format: voFormat, fitHost: () => null }} />
  );
}

export default ValueOfOne;
