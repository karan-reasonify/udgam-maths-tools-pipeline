/* ═══ M2.S3.T5.C16.2D1 · digit_lab · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists: header + its three controls, canvas, slot + pad, bubble + mascot,
   phase dots (user / AI mode), window.toolApi, sounds, the synced voice, scoring, the events,
   idle and restart. NO imports in this file; only the five host hooks. Follow docs/LAYOUT.md;
   the reference tool is work/indiannica_eng_maths4_ch1/M1.S1.T2.C4.2D1/tool.tsx.
   Edit, never rewrite. Built by `node cli.mjs scaffold`; concepts are verbatim (check compares them). */

const TOOL_ID = "digit_lab";
const MEDIA_ID = "M2.S3.T5.C16.2D1";
const TOOL_NAME = "Digit Lab";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
const VOICE = {"rate":0.92,"pitch":1.06};

/* spoken before phase 1's teach lines only (the plan's opening voice line) */
const OPENING = ["A rack of cards and a row of empty slots. Read the strip first."];
/* the whole-tool line: spoken on the summary page */
const FINISH_LINE = "You found the one place a zero is not allowed to stand.";
/* said when the child opens Free play from the summary page (the plan's free-play voice line) */
const FREE_LINE = "Free play. Any cards, any number of places, repeat what you like.";

/* Hindi and Gujarati, keyed by the English line exactly (runtime r13+: `lineFor(line, lang, TR)`); the
   English stays what the checks read. NCERT class 4 terms (परवर्ती / पूर्ववर्ती, અનુગામી / પુરોગામી);
   digits stay digits (the runtime speaks them in the language in use). A first draft; wants a native
   speaker's read. */
const TR: any = {
  hi: {
    "Digit Lab": "अंक प्रयोगशाला",
    "A rack of cards and a row of empty slots. Read the strip first.": "कार्डों की एक ट्रे और खाली खानों की एक पंक्ति। पहले ऊपर की पट्टी पढ़ो।",
    "You found the one place a zero is not allowed to stand.": "तुमने वह एक स्थान ढूँढ लिया जहाँ शून्य खड़ा नहीं हो सकता।",
    "Free play. Any cards, any number of places, repeat what you like.": "मुक्त खेल। कोई भी कार्ड, कितने भी स्थान, जो चाहो दोहराओ।",
    "The greatest number you can make from given digits": "दिए गए अंकों से बनने वाली सबसे बड़ी संख्या",
    "Which card is worth most at the front? Put that one first.": "सबसे आगे कौन सा कार्ड सबसे ज़्यादा मान का है? उसे पहले रखो।",
    "Which slot is worth the most?": "किस खाने का मान सबसे ज़्यादा है?",
    "Take the biggest card left each time, and fill the slots from the left.": "हर बार बचा हुआ सबसे बड़ा कार्ड लो, और बाईं ओर से खाने भरो।",
    "Decreasing order from the left gives the greatest number.": "बाईं ओर से घटते क्रम में रखने पर सबसे बड़ी संख्या बनती है।",
    "You learned: decreasing order from the left gives the greatest number.": "तुमने सीखा: बाईं ओर से घटता क्रम सबसे बड़ी संख्या देता है।",
    "Make the greatest": "सबसे बड़ी बनाओ",
    "Make the greatest number using 3, 0, 2, 6, 5 and 9, each card once. Then press enter.": "3, 0, 2, 6, 5 और 9 से सबसे बड़ी संख्या बनाओ, हर कार्ड एक बार। फिर एंटर दबाओ।",
    "Which card in the rack is the largest?": "ट्रे में सबसे बड़ा कार्ड कौन सा है?",
    "Make the greatest number using 8, 6, 7, 3 and 4.": "8, 6, 7, 3 और 4 से सबसे बड़ी संख्या बनाओ।",
    "Which card should stand in the front slot?": "सबसे आगे के खाने में कौन सा कार्ड होना चाहिए?",
    "Greatest from 56,328": "56,328 से सबसे बड़ी",
    "Rearrange the digits of 56,328 to make the greatest five digit number.": "56,328 के अंकों को फिर से सजाकर पाँच अंकों की सबसे बड़ी संख्या बनाओ।",
    "Is the biggest card in the front slot?": "क्या सबसे बड़ा कार्ड सबसे आगे के खाने में है?",
    "The smallest number, and where zero has to go": "सबसे छोटी संख्या, और शून्य कहाँ जाएगा",
    "The same six cards, and this time the smallest number.": "वही छह कार्ड, और इस बार सबसे छोटी संख्या।",
    "Try the zero in the front slot.": "शून्य को सबसे आगे के खाने में रखकर देखो।",
    "The front slot would not take the zero.": "सबसे आगे के खाने ने शून्य नहीं लिया।",
    "A number cannot begin with zero, so it moved along one slot.": "कोई संख्या शून्य से शुरू नहीं हो सकती, इसलिए वह एक खाना आगे खिसक गया।",
    "Which is the smallest card that is not a zero?": "शून्य को छोड़कर सबसे छोटा कार्ड कौन सा है?",
    "After the front card, lay the rest from the smallest up.": "सबसे आगे वाले कार्ड के बाद, बाकी को सबसे छोटे से बढ़ते क्रम में रखो।",
    "Zero cannot lead, so the smallest digit that is not zero goes first and the zero takes the second place.": "शून्य आगे नहीं आ सकता, इसलिए शून्य के अलावा सबसे छोटा अंक पहले आता है और शून्य दूसरे स्थान पर।",
    "You learned: zero cannot lead, so it takes the second place.": "तुमने सीखा: शून्य आगे नहीं आ सकता, इसलिए वह दूसरे स्थान पर जाता है।",
    "Make the smallest": "सबसे छोटी बनाओ",
    "Now make the smallest number using the same six cards, each once. Then press enter.": "अब उन्हीं छह कार्डों से सबसे छोटी संख्या बनाओ, हर एक एक बार। फिर एंटर दबाओ।",
    "What did the front slot say about zero?": "सबसे आगे के खाने ने शून्य के बारे में क्या कहा?",
    "Make the smallest number using 4, 5, 8, 0 and 1.": "4, 5, 8, 0 और 1 से सबसे छोटी संख्या बनाओ।",
    "Can the zero stand in the front slot?": "क्या शून्य सबसे आगे के खाने में खड़ा हो सकता है?",
    "Make the smallest number using 4, 0, 8, 9, 1 and 2.": "4, 0, 8, 9, 1 और 2 से सबसे छोटी संख्या बनाओ।",
    "Which card that is not zero is the smallest?": "शून्य के अलावा कौन सा कार्ड सबसे छोटा है?",
    "Repeating a digit to fill more places": "ज़्यादा स्थान भरने के लिए अंक दोहराना",
    "You are one card short. Which one would you use twice?": "तुम्हारे पास एक कार्ड कम है। किसे दो बार लोगे?",
    "Press repeat, then tap that card.": "दोहराओ दबाओ, फिर उस कार्ड पर टैप करो।",
    "How many cards are in the rack, and how many slots?": "ट्रे में कितने कार्ड हैं, और कितने खाने?",
    "Would a big card or a small card help most if you had two?": "अगर दो हों, तो बड़ा कार्ड ज़्यादा काम आएगा या छोटा?",
    "The digit you repeat decides whether you get the greatest number or the smallest.": "जो अंक तुम दोहराते हो, वही तय करता है कि सबसे बड़ी संख्या बनेगी या सबसे छोटी।",
    "You learned: the digit you repeat decides greatest or smallest.": "तुमने सीखा: दोहराया अंक तय करता है, सबसे बड़ी या सबसे छोटी।",
    "Greatest with 6 places": "6 स्थानों में सबसे बड़ी",
    "Using 5, 0, 7, 8 and 3, make the greatest six digit number.": "5, 0, 7, 8 और 3 से छह अंकों की सबसे बड़ी संख्या बनाओ।",
    "How many places does the strip ask for?": "पट्टी कितने स्थान माँगती है?",
    "Greatest with 5 places": "5 स्थानों में सबसे बड़ी",
    "Using 7, 9, 5 and 4, make the greatest five digit number by repeating one digit.": "7, 9, 5 और 4 से, एक अंक दोहराकर, पाँच अंकों की सबसे बड़ी संख्या बनाओ।",
    "Which card would you want two of?": "तुम्हें कौन सा कार्ड दो चाहिए?",
    "Smallest with 6 places": "6 स्थानों में सबसे छोटी",
    "Using 5, 0, 7, 8 and 3, make the smallest six digit number.": "5, 0, 7, 8 और 3 से छह अंकों की सबसे छोटी संख्या बनाओ।",
    "For the smallest number, which card would you want twice?": "सबसे छोटी संख्या के लिए, कौन सा कार्ड दो बार चाहिए?",
    "One more and one less": "एक अधिक और एक कम",
    "Press up once. Watch every card, not just the last one.": "ऊपर वाला बटन एक बार दबाओ। सिर्फ़ आखिरी नहीं, हर कार्ड देखो।",
    "Every nine turned to zero and passed one to the left.": "हर नौ शून्य बन गया और एक बाईं ओर चला गया।",
    "The last one had no card to go to, so a new place opened.": "आखिरी के लिए कोई कार्ड नहीं था, इसलिए नया स्थान खुल गया।",
    "Which place does it change first?": "सबसे पहले कौन सा स्थान बदलता है?",
    "Start at the ones card. A nine going up, or a zero going down, passes one to the left.": "इकाई के कार्ड से शुरू करो। ऊपर जाता नौ, या नीचे जाता शून्य, बाईं ओर से एक का लेन-देन करता है।",
    "The successor is one more and the predecessor is one less, wherever the nines are.": "परवर्ती एक अधिक होता है और पूर्ववर्ती एक कम, नौ चाहे कहीं भी हों।",
    "You learned: the successor is one more, the predecessor one less.": "तुमने सीखा: परवर्ती एक अधिक है, पूर्ववर्ती एक कम।",
    "Successor of this number?": "इस संख्या का परवर्ती?",
    "What is the successor of 14,917? Type it, then use the stepper to check.": "14,917 का परवर्ती क्या है? लिखो, फिर ऊपर-नीचे बटन से जाँचो।",
    "Is the successor one more or one less?": "परवर्ती एक अधिक होता है या एक कम?",
    "Predecessor of 1,05,654?": "1,05,654 का पूर्ववर्ती?",
    "What is the predecessor of 1,05,654? Type it, then check with the stepper.": "1,05,654 का पूर्ववर्ती क्या है? लिखो, और बटन दबाकर देखो।",
    "Is the predecessor one more or one less?": "पूर्ववर्ती एक अधिक होता है या एक कम?",
    "Predecessor of the smallest 6 digit number?": "6 अंकों की सबसे छोटी संख्या का पूर्ववर्ती?",
    "Write the predecessor of the smallest six digit number.": "छह अंकों की सबसे छोटी संख्या का पूर्ववर्ती लिखो।",
    "Which cards change when you take one away from all those zeros?": "इतने सारे शून्यों में से एक घटाने पर कौन से कार्ड बदलते हैं?",
    /* the working area's own words */
    "ones": "इकाई", "tens": "दहाई", "hundreds": "सैकड़ा", "thousands": "हज़ार", "ten thousands": "दस हज़ार", "lakhs": "लाख", "ten lakhs": "दस लाख",
    "Steps": "कदम", "Cards placed": "रखे कार्ड", "One more, one less": "एक अधिक, एक कम", "Build any number": "कोई भी संख्या बनाओ",
    "Greatest number": "सबसे बड़ी संख्या", "Smallest number": "सबसे छोटी संख्या", "Zero cannot lead": "शून्य आगे नहीं आ सकता",
    "one less": "एक कम", "one more": "एक अधिक", "Sort": "छाँटो", "Sort the rack, smallest first": "ट्रे छाँटो, सबसे छोटा पहले",
    "Sort the rack, largest first": "ट्रे छाँटो, सबसे बड़ा पहले", "Repeat": "दोहराओ", "Pick one": "एक चुनो", "Repeat a card": "एक कार्ड दोहराओ",
    "+ place": "+ स्थान", "− place": "− स्थान", "One more place": "एक स्थान और", "One place less": "एक स्थान कम",
    "Step down one": "एक नीचे", "Step up one": "एक ऊपर",
  },
  gu: {
    "Digit Lab": "અંક પ્રયોગશાળા",
    "A rack of cards and a row of empty slots. Read the strip first.": "કાર્ડની એક ટ્રે અને ખાલી ખાનાંની એક હાર. પહેલાં ઉપરની પટ્ટી વાંચો.",
    "You found the one place a zero is not allowed to stand.": "તમે એ એક સ્થાન શોધ્યું જ્યાં શૂન્ય ઊભું રહી શકતું નથી.",
    "Free play. Any cards, any number of places, repeat what you like.": "મુક્ત રમત. કોઈ પણ કાર્ડ, ગમે તેટલાં સ્થાન, ગમે તે ફરી વાપરો.",
    "The greatest number you can make from given digits": "આપેલા અંકોથી બનતી સૌથી મોટી સંખ્યા",
    "Which card is worth most at the front? Put that one first.": "સૌથી આગળ કયું કાર્ડ સૌથી વધુ કિંમતનું છે? તેને પહેલું મૂકો.",
    "Which slot is worth the most?": "કયા ખાનાની કિંમત સૌથી વધુ છે?",
    "Take the biggest card left each time, and fill the slots from the left.": "દર વખતે બાકી રહેલું સૌથી મોટું કાર્ડ લો, અને ડાબી બાજુથી ખાનાં ભરો.",
    "Decreasing order from the left gives the greatest number.": "ડાબી બાજુથી ઊતરતા ક્રમમાં મૂકવાથી સૌથી મોટી સંખ્યા બને છે.",
    "You learned: decreasing order from the left gives the greatest number.": "તમે શીખ્યા: ડાબેથી ઊતરતો ક્રમ સૌથી મોટી સંખ્યા આપે છે.",
    "Make the greatest": "સૌથી મોટી બનાવો",
    "Make the greatest number using 3, 0, 2, 6, 5 and 9, each card once. Then press enter.": "3, 0, 2, 6, 5 અને 9 થી સૌથી મોટી સંખ્યા બનાવો, દરેક કાર્ડ એક વાર. પછી એન્ટર દબાવો.",
    "Which card in the rack is the largest?": "ટ્રેમાં સૌથી મોટું કાર્ડ કયું છે?",
    "Make the greatest number using 8, 6, 7, 3 and 4.": "8, 6, 7, 3 અને 4 થી સૌથી મોટી સંખ્યા બનાવો.",
    "Which card should stand in the front slot?": "સૌથી આગળના ખાનામાં કયું કાર્ડ હોવું જોઈએ?",
    "Greatest from 56,328": "56,328 થી સૌથી મોટી",
    "Rearrange the digits of 56,328 to make the greatest five digit number.": "56,328 ના અંકોને ફરી ગોઠવીને પાંચ અંકની સૌથી મોટી સંખ્યા બનાવો.",
    "Is the biggest card in the front slot?": "શું સૌથી મોટું કાર્ડ સૌથી આગળના ખાનામાં છે?",
    "The smallest number, and where zero has to go": "સૌથી નાની સંખ્યા, અને શૂન્ય ક્યાં જશે",
    "The same six cards, and this time the smallest number.": "એ જ છ કાર્ડ, અને આ વખતે સૌથી નાની સંખ્યા.",
    "Try the zero in the front slot.": "શૂન્યને સૌથી આગળના ખાનામાં મૂકી જુઓ.",
    "The front slot would not take the zero.": "સૌથી આગળના ખાનાએ શૂન્ય ન લીધું.",
    "A number cannot begin with zero, so it moved along one slot.": "કોઈ સંખ્યા શૂન્યથી શરૂ ન થઈ શકે, તેથી તે એક ખાનું ખસી ગયું.",
    "Which is the smallest card that is not a zero?": "શૂન્ય સિવાય સૌથી નાનું કાર્ડ કયું છે?",
    "After the front card, lay the rest from the smallest up.": "આગળના કાર્ડ પછી, બાકીનાં સૌથી નાનાથી વધતા ક્રમમાં મૂકો.",
    "Zero cannot lead, so the smallest digit that is not zero goes first and the zero takes the second place.": "શૂન્ય આગળ ન આવી શકે, તેથી શૂન્ય સિવાયનો સૌથી નાનો અંક પહેલો આવે અને શૂન્ય બીજા સ્થાને.",
    "You learned: zero cannot lead, so it takes the second place.": "તમે શીખ્યા: શૂન્ય આગળ ન આવી શકે, તેથી તે બીજા સ્થાને જાય છે.",
    "Make the smallest": "સૌથી નાની બનાવો",
    "Now make the smallest number using the same six cards, each once. Then press enter.": "હવે એ જ છ કાર્ડથી સૌથી નાની સંખ્યા બનાવો, દરેક એક વાર. પછી એન્ટર દબાવો.",
    "What did the front slot say about zero?": "સૌથી આગળના ખાનાએ શૂન્ય વિશે શું કહ્યું?",
    "Make the smallest number using 4, 5, 8, 0 and 1.": "4, 5, 8, 0 અને 1 થી સૌથી નાની સંખ્યા બનાવો.",
    "Can the zero stand in the front slot?": "શું શૂન્ય સૌથી આગળના ખાનામાં ઊભું રહી શકે?",
    "Make the smallest number using 4, 0, 8, 9, 1 and 2.": "4, 0, 8, 9, 1 અને 2 થી સૌથી નાની સંખ્યા બનાવો.",
    "Which card that is not zero is the smallest?": "શૂન્ય સિવાયનું કયું કાર્ડ સૌથી નાનું છે?",
    "Repeating a digit to fill more places": "વધુ સ્થાન ભરવા અંક ફરી વાપરવો",
    "You are one card short. Which one would you use twice?": "તમારી પાસે એક કાર્ડ ઓછું છે. કયું બે વાર વાપરશો?",
    "Press repeat, then tap that card.": "દોહરાવો દબાવો, પછી તે કાર્ડ પર ટૅપ કરો.",
    "How many cards are in the rack, and how many slots?": "ટ્રેમાં કેટલાં કાર્ડ છે, અને કેટલાં ખાનાં?",
    "Would a big card or a small card help most if you had two?": "જો બે હોય, તો મોટું કાર્ડ વધુ કામ આવે કે નાનું?",
    "The digit you repeat decides whether you get the greatest number or the smallest.": "તમે જે અંક ફરી વાપરો, તે જ નક્કી કરે છે કે સૌથી મોટી સંખ્યા બનશે કે સૌથી નાની.",
    "You learned: the digit you repeat decides greatest or smallest.": "તમે શીખ્યા: ફરી વાપરેલો અંક નક્કી કરે, સૌથી મોટી કે સૌથી નાની.",
    "Greatest with 6 places": "6 સ્થાનમાં સૌથી મોટી",
    "Using 5, 0, 7, 8 and 3, make the greatest six digit number.": "5, 0, 7, 8 અને 3 થી છ અંકની સૌથી મોટી સંખ્યા બનાવો.",
    "How many places does the strip ask for?": "પટ્ટી કેટલાં સ્થાન માગે છે?",
    "Greatest with 5 places": "5 સ્થાનમાં સૌથી મોટી",
    "Using 7, 9, 5 and 4, make the greatest five digit number by repeating one digit.": "7, 9, 5 અને 4 થી, એક અંક ફરી વાપરીને, પાંચ અંકની સૌથી મોટી સંખ્યા બનાવો.",
    "Which card would you want two of?": "તમને કયું કાર્ડ બે જોઈએ?",
    "Smallest with 6 places": "6 સ્થાનમાં સૌથી નાની",
    "Using 5, 0, 7, 8 and 3, make the smallest six digit number.": "5, 0, 7, 8 અને 3 થી છ અંકની સૌથી નાની સંખ્યા બનાવો.",
    "For the smallest number, which card would you want twice?": "સૌથી નાની સંખ્યા માટે, કયું કાર્ડ બે વાર જોઈએ?",
    "One more and one less": "એક વધુ અને એક ઓછું",
    "Press up once. Watch every card, not just the last one.": "ઉપરનું બટન એક વાર દબાવો. ફક્ત છેલ્લું નહીં, દરેક કાર્ડ જુઓ.",
    "Every nine turned to zero and passed one to the left.": "દરેક નવ શૂન્ય બન્યો અને એક ડાબી બાજુ ગયો.",
    "The last one had no card to go to, so a new place opened.": "છેલ્લા માટે કોઈ કાર્ડ ન હતું, તેથી નવું સ્થાન ખૂલ્યું.",
    "Which place does it change first?": "સૌથી પહેલાં કયું સ્થાન બદલાય છે?",
    "Start at the ones card. A nine going up, or a zero going down, passes one to the left.": "એકમના કાર્ડથી શરૂ કરો. ઉપર જતો નવ, કે નીચે જતું શૂન્ય, ડાબી બાજુ સાથે એકની લેવડદેવડ કરે છે.",
    "The successor is one more and the predecessor is one less, wherever the nines are.": "અનુગામી એક વધુ હોય છે અને પુરોગામી એક ઓછી, નવ ગમે ત્યાં હોય.",
    "You learned: the successor is one more, the predecessor one less.": "તમે શીખ્યા: અનુગામી એક વધુ છે, પુરોગામી એક ઓછી.",
    "Successor of this number?": "આ સંખ્યાની અનુગામી?",
    "What is the successor of 14,917? Type it, then use the stepper to check.": "14,917 ની અનુગામી શું છે? લખો, પછી ઉપર-નીચેના બટનથી ચકાસો.",
    "Is the successor one more or one less?": "અનુગામી એક વધુ હોય કે એક ઓછી?",
    "Predecessor of 1,05,654?": "1,05,654 ની પુરોગામી?",
    "What is the predecessor of 1,05,654? Type it, then check with the stepper.": "1,05,654 ની પુરોગામી શું છે? લખો, અને બટન દબાવીને જુઓ.",
    "Is the predecessor one more or one less?": "પુરોગામી એક વધુ હોય કે એક ઓછી?",
    "Predecessor of the smallest 6 digit number?": "6 અંકની સૌથી નાની સંખ્યાની પુરોગામી?",
    "Write the predecessor of the smallest six digit number.": "છ અંકની સૌથી નાની સંખ્યાની પુરોગામી લખો.",
    "Which cards change when you take one away from all those zeros?": "આટલાં બધાં શૂન્યમાંથી એક ઓછું કરતાં કયાં કાર્ડ બદલાય છે?",
    /* the working area's own words */
    "ones": "એકમ", "tens": "દશક", "hundreds": "શતક", "thousands": "હજાર", "ten thousands": "દસ હજાર", "lakhs": "લાખ", "ten lakhs": "દસ લાખ",
    "Steps": "પગલાં", "Cards placed": "મૂકેલાં કાર્ડ", "One more, one less": "એક વધુ, એક ઓછું", "Build any number": "કોઈ પણ સંખ્યા બનાવો",
    "Greatest number": "સૌથી મોટી સંખ્યા", "Smallest number": "સૌથી નાની સંખ્યા", "Zero cannot lead": "શૂન્ય આગળ ન આવી શકે",
    "one less": "એક ઓછું", "one more": "એક વધુ", "Sort": "ગોઠવો", "Sort the rack, smallest first": "ટ્રે ગોઠવો, સૌથી નાનું પહેલાં",
    "Sort the rack, largest first": "ટ્રે ગોઠવો, સૌથી મોટું પહેલાં", "Repeat": "દોહરાવો", "Pick one": "એક ચૂંટો", "Repeat a card": "એક કાર્ડ ફરી વાપરો",
    "+ place": "+ સ્થાન", "− place": "− સ્થાન", "One more place": "એક સ્થાન વધુ", "One place less": "એક સ્થાન ઓછું",
    "Step down one": "એક નીચે", "Step up one": "એક ઉપર",
  },
};

/* ── the rack, the card slots and the stepper ─────────────────────────────────────────── */

const PLACES = ["ones", "tens", "hundreds", "thousands", "ten thousands", "lakhs", "ten lakhs"];
/* The chapter's own content colours (the plan's stage): a place takes its PERIOD's colour, ones
   deep blue, thousands green, lakhs vermilion; amber marks what is under discussion; a zero
   holding a place is grey. Cards in the rack are plain ink on paper: a digit only takes a colour
   once a slot gives it a place. */
const PERIODS = [
  { name: "ones", color: CONTENT.hundred },
  { name: "thousands", color: CONTENT.one },
  { name: "lakhs", color: CONTENT.pointer },
];
const PERIOD_OF = [0, 0, 0, 1, 1, 2, 2];
const AMBER = CONTENT.ten;
const ZERO = "#767676";
const colorOf = (k: number) => PERIODS[PERIOD_OF[Math.min(Math.max(k, 0), 6)]].color;
/* numerals take a deeper ink of their period colour, so they read at 4.5:1 */
const inkOf = (k: number) => shade(colorOf(k), 0.25);
const NOTE = "Zero cannot lead";

/* geometry in working-area units (1086 x 528). The row of card slots is pinned right, so the ones
   slot never moves and a new place opens at the leading end. Rack cards are the slot card drawn at
   RS, so a card grows as it lands in a slot. */
const G = { stripH: 56, slotY: 72, slotW: 130, slotH: 150, pitch: 150, right: 1062, barY: 226, noteY: 302, rackY: 364, rackH: 164 };
const CARD = { w: 118, h: 138 };
const RS = 0.72;
const slotX = (i: number, n: number) => G.right - G.slotW - (n - 1 - i) * G.pitch;
const slotC = (i: number, n: number) => slotX(i, n) + G.slotW / 2;
const slotAt = (p: any, n: number) => {
  for (let i = 0; i < n; i++) { const x = slotX(i, n); if (p.x >= x - 10 && p.x <= x + G.slotW + 10 && p.y >= 40 && p.y <= 300) return i; }
  return null;
};
const rackGeo = (count: number, wide: boolean) => {
  const panelW = wide ? W.w : 740, pitch = 100;
  return { panelW, pitch, start: (panelW - ((count - 1) * pitch + CARD.w * RS)) / 2, y: G.rackY + (G.rackH - CARD.h * RS) / 2 };
};
const KEYS_X = { sortAlone: 838, sort: 758, repeat: 924, y: 372, w: 150, h: 130 };
const STEP = { c: 543, y: 318, key: 88, boxW: 280 };
const nameLines = (p: number) => (PLACES[p].indexOf("ten ") === 0 ? ["ten", PLACES[p].slice(4)] : [PLACES[p]]);

const digitsOf = (v: number) => String(Math.trunc(Math.abs(Number(v) || 0))).split("").map(Number);
const numOf = (ds: number[]) => ds.reduce((s, d) => s * 10 + d, 0);
/* the book's rule written as sorting (used for the near miss and the free reading; the oracle
   re-derives every answer by trying every arrangement instead) */
const greatestOf = (ds: number[]) => ds.slice().sort((a, b) => b - a);
const smallestOf = (ds: number[]) => {
  const s = ds.slice().sort((a, b) => a - b), k = s.findIndex((d) => d > 0);
  if (k > 0) { const d = s.splice(k, 1)[0]; s.unshift(d); }
  return s;
};

/* One entry per phase = one mount.
   kinds: build (drag the rack's cards into the slots, Enter commits; phase 3 may clone a card with
          Repeat) · step (type the neighbour, Enter, then press the stepper and watch the cards turn) */
const PHASES = [
  {
    n: 1,
    concept: "The greatest number you can make from given digits",
    conceptId: "M2.S3.T5.C16", objectiveIds: ["O7"],
    says: ["Which card is worth most at the front? Put that one first."],
    ladder: ["Which slot is worth the most?", "Take the biggest card left each time, and fill the slots from the left."],
    closing: "Decreasing order from the left gives the greatest number.",
    learned: "You learned: decreasing order from the left gives the greatest number.",
    traceback: "The row stays: the biggest card's worth grows slot by slot to the front, then the whole right row is laid under it and read pair by pair.",
    items: [
      /* learn ML1: answer in the plan = 9,65,320 */
      { qid: "M2.S3.T5.C16:ML1", kind: "build", goal: "greatest", cards: [3, 0, 2, 6, 5, 9], places: 6, answer: 965320, pad: "enter", winMs: 2600,
        ask: "Make the greatest", say: "Make the greatest number using 3, 0, 2, 6, 5 and 9, each card once. Then press enter.", miss: "Which card in the rack is the largest?" },
      /* practice 1: answer in the plan = 87,643 */
      { qid: "M2.S3.T5.C16:1", kind: "build", goal: "greatest", cards: [8, 6, 7, 3, 4], places: 5, answer: 87643, pad: "enter", winMs: 2600,
        ask: "Make the greatest", say: "Make the greatest number using 8, 6, 7, 3 and 4.", miss: "Which card should stand in the front slot?" },
      /* practice 2: answer in the plan = 86,532 */
      { qid: "M2.S3.T5.C16:2", kind: "build", goal: "greatest", cards: [5, 6, 3, 2, 8], places: 5, answer: 86532, pad: "enter", winMs: 2600,
        ask: "Greatest from 56,328", say: "Rearrange the digits of 56,328 to make the greatest five digit number.", miss: "Is the biggest card in the front slot?" },
    ],
  },
  {
    n: 2,
    concept: "The smallest number, and where zero has to go",
    conceptId: "M2.S3.T5.C17", objectiveIds: ["O7"],
    says: ["The same six cards, and this time the smallest number.", "Try the zero in the front slot."],
    /* the plan's delight: the child drops the zero in front and the slot refuses it (silently) */
    demo: { zero: true },
    demoLines: ["The front slot would not take the zero.", "A number cannot begin with zero, so it moved along one slot."],
    ladder: ["Which is the smallest card that is not a zero?", "After the front card, lay the rest from the smallest up."],
    closing: "Zero cannot lead, so the smallest digit that is not zero goes first and the zero takes the second place.",
    learned: "You learned: zero cannot lead, so it takes the second place.",
    traceback: "The row stays: a leading zero shakes and the places are counted one short, then the whole right row is laid under, the first difference amber.",
    items: [
      /* learn ML2: answer in the plan = 2,03,569 */
      { qid: "M2.S3.T5.C17:ML2", kind: "build", goal: "smallest", cards: [3, 0, 2, 6, 5, 9], places: 6, answer: 203569, pad: "enter", winMs: 2600,
        ask: "Make the smallest", say: "Now make the smallest number using the same six cards, each once. Then press enter.", miss: "What did the front slot say about zero?" },
      /* practice 3: answer in the plan = 10,458. The zero cannot lead, so it takes the second place */
      { qid: "M2.S3.T5.C17:3", kind: "build", goal: "smallest", cards: [4, 5, 8, 0, 1], places: 5, answer: 10458, pad: "enter", winMs: 2600,
        ask: "Make the smallest", say: "Make the smallest number using 4, 5, 8, 0 and 1.", miss: "Can the zero stand in the front slot?" },
      /* practice 4: answer in the plan = 1,02,489 */
      { qid: "M2.S3.T5.C17:4", kind: "build", goal: "smallest", cards: [4, 0, 8, 9, 1, 2], places: 6, answer: 102489, pad: "enter", winMs: 2600,
        ask: "Make the smallest", say: "Make the smallest number using 4, 0, 8, 9, 1 and 2.", miss: "Which card that is not zero is the smallest?" },
    ],
  },
  {
    n: 3,
    concept: "Repeating a digit to fill more places",
    conceptId: "M2.S3.T5.C18", objectiveIds: ["O8"],
    says: ["You are one card short. Which one would you use twice?", "Press repeat, then tap that card."],
    ladder: ["How many cards are in the rack, and how many slots?", "Would a big card or a small card help most if you had two?"],
    closing: "The digit you repeat decides whether you get the greatest number or the smallest.",
    learned: "You learned: the digit you repeat decides greatest or smallest.",
    traceback: "The target boxes are counted against the filled slots, then the whole right row is laid under the child's, the first difference amber.",
    items: [
      /* learn ML3: answer in the plan = 8,87,530 */
      { qid: "M2.S3.T5.C18:ML3", kind: "build", goal: "greatest", cards: [5, 0, 7, 8, 3], places: 6, answer: 887530, pad: "enter", winMs: 2600,
        ask: "Greatest with 6 places", say: "Using 5, 0, 7, 8 and 3, make the greatest six digit number.", miss: "How many places does the strip ask for?" },
      /* practice 5: answer in the plan = 99,754 */
      { qid: "M2.S3.T5.C18:5", kind: "build", goal: "greatest", cards: [7, 9, 5, 4], places: 5, answer: 99754, pad: "enter", winMs: 2600,
        ask: "Greatest with 5 places", say: "Using 7, 9, 5 and 4, make the greatest five digit number by repeating one digit.", miss: "Which card would you want two of?" },
      /* practice 6: answer in the plan = 3,00,578. The smallest digit is repeated and the zeros follow the three */
      { qid: "M2.S3.T5.C18:6", kind: "build", goal: "smallest", cards: [5, 0, 7, 8, 3], places: 6, answer: 300578, pad: "enter", winMs: 2600,
        ask: "Smallest with 6 places", say: "Using 5, 0, 7, 8 and 3, make the smallest six digit number.", miss: "For the smallest number, which card would you want twice?" },
    ],
  },
  {
    n: 4,
    concept: "One more and one less",
    conceptId: "M2.S3.T5.C19", objectiveIds: ["O8"],
    says: ["Press up once. Watch every card, not just the last one."],
    /* the worked example: a whole row of nines turns over under the child's hand */
    demo: { start: 999999, dir: "up" },
    demoLines: ["Every nine turned to zero and passed one to the left.", "The last one had no card to go to, so a new place opened."],
    ladder: ["Which place does it change first?", "Start at the ones card. A nine going up, or a zero going down, passes one to the left."],
    closing: "The successor is one more and the predecessor is one less, wherever the nines are.",
    learned: "You learned: the successor is one more, the predecessor one less.",
    traceback: "The number comes back, the child's number is ringed on its side of the stepper, and the step is taken again slowly, card by card from the right.",
    items: [
      /* learn ML4: answer in the plan = The successor is 14,918 and the predecessor is 14,916 (this item asks for the successor) */
      { qid: "M2.S3.T5.C19:ML4", kind: "step", start: 14917, dir: "up", answer: 14918, winMs: 3400,
        ask: "Successor of this number?", say: "What is the successor of 14,917? Type it, then use the stepper to check.", miss: "Is the successor one more or one less?" },
      /* practice 7: answer in the plan = The predecessor is 1,05,653 and the successor is 1,05,655 (this item asks for the predecessor) */
      { qid: "M2.S3.T5.C19:7", kind: "step", start: 105654, dir: "down", answer: 105653, winMs: 3400,
        ask: "Predecessor of 1,05,654?", say: "What is the predecessor of 1,05,654? Type it, then check with the stepper.", miss: "Is the predecessor one more or one less?" },
      /* practice 8: answer in the plan = 99,999, because the smallest six digit number is 1,00,000 */
      { qid: "M2.S3.T5.C19:8", kind: "step", start: 100000, dir: "down", answer: 99999, winMs: 3600,
        ask: "Predecessor of the smallest 6 digit number?", say: "Write the predecessor of the smallest six digit number.", miss: "Which cards change when you take one away from all those zeros?" },
    ],
  },
];

/* The numbers, rows, sizes and targets the working area needs (they go into the sidecar too). */
const MODEL = {
  places: PLACES, periods: PERIODS.map((p) => p.name), slot: { w: G.slotW, h: G.slotH, pitch: G.pitch }, card: CARD, rackScale: RS,
  leadingSlotNote: NOTE, stepper: { key: STEP.key, box: STEP.boxW }, freePlay: { rack: "the ten digit cards, each as often as you like", places: [2, 6] },
};

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* judge: numbers compare as numbers ("023569" reads as 23,569: a zero in front loses a place) */
const judge = (item: any, v: any) => leadNumber(v) === item.answer;

/* oracle: every answer re-derived by a second route that shares no code with judge or Work:
   try every arrangement of the cards (with every allowed repeat) and keep the best one */
const perms = (a: number[]): number[][] => (a.length <= 1 ? [a] : a.reduce((out: number[][], x, i) =>
  out.concat(perms(a.slice(0, i).concat(a.slice(i + 1))).map((p) => [x].concat(p))), []));
const extrasOf = (pool: number[], k: number): number[][] => (k <= 0 ? [[]] : pool.reduce((out: number[][], d, i) =>
  out.concat(extrasOf(pool.slice(i), k - 1).map((m) => [d].concat(m))), []));
const oracle = () => PHASES.every((p: any) => p.items.every((it: any) => {
  if (it.kind === "step") return it.answer === it.start + (it.dir === "up" ? 1 : -1);
  const pool = it.cards.filter((d: number, i: number) => it.cards.indexOf(d) === i);
  let best: number | null = null;
  extrasOf(pool, it.places - it.cards.length).forEach((extra) => perms(it.cards.concat(extra)).forEach((q) => {
    if (q.length > 1 && q[0] === 0) return;
    const v = Number(q.join(""));
    if (best === null || (it.goal === "greatest" ? v > best : v < best)) best = v;
  }));
  return best === it.answer;
}));

/* the most likely wrong answer (the misconception); judge must reject it */
const nearMiss = (item: any) => {
  if (item.kind === "step") return item.dir === "up" ? item.start - 1 : item.start + 1; /* the two words swapped */
  const repeat = item.places > item.cards.length;
  const cards = repeat ? item.cards.concat([item.cards[0]]) : item.cards.slice(); /* repeats the first card, not the right one */
  if (item.goal === "greatest") return Number((repeat ? greatestOf(cards) : smallestOf(cards)).join("")); /* built from the smallest up */
  return repeat ? Number(smallestOf(cards).join("")) : cards.slice().sort((a: number, b: number) => a - b).join(""); /* 0,23,569 */
};
/* the forms of an answer that no question, hint or ladder line may print */
const answerForms = (item: any) => [String(item.answer), indian(item.answer), words(item.answer)];
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => item.answer;

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => {
  if (T.state().stage === "demo") return HOOK.demo && HOOK.demo();
  if (item.kind === "build") { HOOK.set(item.answer); setTimeout(() => HOOK.enter && HOOK.enter(), 40); return; }
  if (item.kind === "step") { HOOK.enter(item.answer); setTimeout(() => HOOK.step && HOOK.step(), 60); return; }
  return T.submit(item.answer);
};
/* the agent's answer(): a number to build is laid in the slots from the rack's own cards (cloning
   where the item allows it); a neighbour is typed (undefined = the runtime types it) */
const answer = (item: any, v: any) => (item.kind === "build" && HOOK.set ? !!HOOK.set(v) : undefined);
/* the agent's check(): in a demo it makes the one act; with a prediction set it presses the stepper */
const check = () => (HOOK.check ? HOOK.check() : undefined);
/* the answer slot shows a number the way the book writes it */
const format = (s: any) => { const t = String(s ?? ""); return /^[1-9]\d{3,8}$/.test(t) ? indian(Number(t)) : t; };

const FREE_CARDS = Array.from({ length: 10 }, (_, d) => ({ id: "s" + d, d, src: true }));
const setupOf = (it: any) => {
  if (it.kind === "step") return { kind: "step", dir: it.dir, start: it.start, digs: digitsOf(it.start), cards: [], slots: [], goal: null, budget: 0 };
  if (it.kind === "free") return { kind: "free", goal: null, budget: 0, cards: FREE_CARDS, slots: [null, null, null, null, null], digs: [] };
  return { kind: "build", goal: it.goal, budget: Math.max(0, (it.places || 0) - (it.cards || []).length),
    cards: (it.cards || []).map((d: number, j: number) => ({ id: "c" + j, d })), slots: Array(it.places || 0).fill(null), digs: [] };
};
const FX0: any = { lit: [], rings: [], ringCard: null, worth: null, mini: [], miniAmber: null, boxes: 0, win: false, dark: false, repLit: false, reading: null };

const DL_CSS = `
.dl-move{transition:transform 420ms cubic-bezier(.3,.7,.25,1)}
.dl-shake{animation:dlShake 640ms ease-in-out}
@keyframes dlShake{0%,100%{transform:translateX(0)}15%{transform:translateX(-12px)}35%{transform:translateX(12px)}55%{transform:translateX(-12px)}75%{transform:translateX(12px)}}
.dl-in{animation:dlIn 480ms ease-out both}
@keyframes dlIn{from{opacity:0;transform:translateY(-12px)}to{opacity:1;transform:none}}
.dl-grab{cursor:grab}
@media (prefers-reduced-motion:reduce){.dl-move{transition:none}.dl-shake,.dl-in{animation:none}}
`;

/* a digit card, top-left at 0,0, drawn at slot size (the rack draws it at RS) */
function CardFace({ C, d, ink, clone, ring }: any) {
  const edge = shade(C.rule, 0.12);
  return (
    <g filter="url(#fShadowSoft)">
      <rect x={0} y={0} width={CARD.w} height={CARD.h} rx={16} fill="url(#gCard)" stroke={ring || edge} strokeWidth={ring ? 6 : 2.5} />
      {clone && <rect x={8} y={8} width={CARD.w - 16} height={CARD.h - 16} rx={10} fill="none" stroke={edge} strokeWidth={2.5} />}
      <text x={CARD.w / 2} y={CARD.h / 2 + 26} textAnchor="middle" fontSize={T.display} fontWeight={700} fill={ink}>{d}</text>
    </g>
  );
}
const Tri = ({ up, fill }: any) => <path d={up ? "M 0 -18 L 21 13 L -21 13 Z" : "M 0 18 L 21 -13 L -21 -13 Z"} fill={fill} />;

/* ── the working area: 1086 x 528, origin at its top-left ──────────────────────────────── */
function Work({ phase, n, item, index, stage, wrong, api, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();
  const free = stage === "free";
  const demo = phase.demo || null;
  const stepDemo = !!(demo && demo.start !== undefined);
  const init = useMemo(() => setupOf(stepDemo ? { kind: "step", start: demo.start, dir: demo.dir } : item), []);
  const [cfg, setCfg] = useState<any>(init);
  const [cards, setCards] = useState<any[]>(init.cards);
  const [slots, setSlots] = useState<any[]>(init.slots);
  const [digs, setDigs] = useState<number[]>(init.digs);
  const [refused, setRefused] = useState<any>(null);   /* a zero standing in front, about to be sent along */
  const [note, setNote] = useState("");
  const [shakeN, setShakeN] = useState(0);
  const [armRep, setArmRep] = useState(false);          /* Repeat pressed: the next card tapped is cloned */
  const [sortUp, setSortUp] = useState(true);
  const [touched, setTouched] = useState(false);
  const [fx, setFx] = useState<any>(FX0);               /* traceback and win marks */
  const [steps, setSteps] = useState<any>({ up: 0, down: 0 });
  const [less, setLess] = useState<any>(null);
  const [more, setMore] = useState<any>(null);
  const [armed, setArmed] = useState(false);            /* prediction made; the stepper waits */
  const [revealed, setRevealed] = useState(false);
  const [ringSide, setRingSide] = useState<any>(null);
  const [hl, setHl] = useState<any>(null);              /* the card turning over */
  const [opened, setOpened] = useState(false);
  const cardsRef = useRef<any[]>(init.cards), slotsRef = useRef<any[]>(init.slots), digsRef = useRef<number[]>(init.digs);
  const armedRef = useRef(false), predRef = useRef<any>(null), seq = useRef(0);
  const setupFor = useRef(stepDemo ? -1 : 0);
  const setCardsNow = (c: any[]) => { cardsRef.current = c; setCards(c); };
  const setSlotsNow = (s: any[]) => { slotsRef.current = s; setSlots(s); };
  const setDigsNow = (d: number[]) => { digsRef.current = d; setDigs(d); };
  const setArmedNow = (b: boolean) => { armedRef.current = b; setArmed(b); };

  const kind = cfg.kind, budget = cfg.budget || 0, busy = tl.busy;
  const building = kind === "build" || kind === "free";
  const canPlay = building && !busy && (stage === "ask" || free);
  const demoLive = stage === "demo" && !!demo && !busy;
  const cardOf = (id: any) => cardsRef.current.find((c: any) => c.id === id);
  const dOf = (id: any) => (id ? (cardOf(id) || {}).d : null);

  const reset = (it: any) => {
    tl.stop();
    const s = setupOf(it);
    setCfg(s); setCardsNow(s.cards); setSlotsNow(s.slots); setDigsNow(s.digs);
    setRefused(null); setNote(""); setShakeN(0); setArmRep(false); setSortUp(true); setTouched(false); setFx(FX0);
    setSteps({ up: 0, down: 0 }); setLess(null); setMore(null); setArmedNow(false); predRef.current = null;
    setRevealed(false); setRingSide(null); setHl(null); setOpened(false);
    api.lock(false);
  };

  useEffect(() => {
    if (stage === "ask" && setupFor.current !== index) { setupFor.current = index; reset(item); }
  }, [stage, index]);

  /* free play (the plan's freePlay): any cards as often as you like, any number of places, and the
     front slot still refuses a zero; nothing to get right */
  useEffect(() => {
    if (!free) return;
    setupFor.current = -2;
    reset({ kind: "free" });
  }, [free]);

  /* ── cards and slots ── */
  const prune = (s = slotsRef.current) => {
    const keep = cardsRef.current.filter((c: any) => !c.copy || s.includes(c.id));
    if (keep.length !== cardsRef.current.length) setCardsNow(keep);
  };
  /* the refused zero slides into the second slot; cards already standing there step one place along */
  const slideIn = (s0: any[], id: any) => {
    const s = s0.map((x) => (x === id ? null : x));
    if (s.length < 2) return null;
    if (!s[1]) { s[1] = id; return s; }
    let e = -1;
    for (let k = 2; k < s.length; k++) if (!s[k]) { e = k; break; }
    if (e < 0) return null;
    for (let k = e; k > 1; k--) s[k] = s[k - 1];
    s[1] = id;
    return s;
  };
  /* the plan's delight: the front slot shakes twice, writes its reason, and the zero moves along by
     itself. The voice says nothing while it happens. */
  /* the front slot's reason typed out in the language in use: a letter at a time in English, a word at
     a time in Hindi and Gujarati (so a vowel sign is never drawn on its own) */
  const noteSteps = () => {
    const t = tx(NOTE);
    if (lang === "en") return t.split("").map((_: any, j: number) => [42, t.slice(0, j + 1)]);
    const ws = t.split(" ");
    return ws.map((_: any, j: number) => [160, ws.slice(0, j + 1).join(" ")]);
  };
  const refuse = (id: any, after?: () => void) => {
    const S: any[] = [[40, () => { setRefused(id); setSlotsNow(slotsRef.current.map((x) => (x === id ? null : x))); }], [480, () => setShakeN((k) => k + 1)], [680, () => {}]];
    noteSteps().forEach(([ms, t]: any) => S.push([ms, () => setNote(t)]));
    S.push([420, () => {}]);
    S.push([40, () => { const ns = slideIn(slotsRef.current, id); setRefused(null); if (ns) { setSlotsNow(ns); api.sfx.tick(); } }]);
    S.push([520, () => {}]);
    api.lock(true);
    tl.run(S, () => { api.lock(false); if (after) after(); });
  };
  const place = (id: any, at: any) => {
    const s0 = slotsRef.current;
    const i = at === null || at === undefined ? s0.indexOf(null) : at;
    let c = cardOf(id);
    if (i < 0 || !c) return;
    setTouched(true);
    if (c.src) { c = { id: "f" + ++seq.current, d: c.d, copy: true }; setCardsNow(cardsRef.current.concat([c])); }
    if (i === 0 && s0.length > 1 && c.d === 0) { refuse(c.id, free ? () => prune() : undefined); return; }
    const s = s0.slice(), from = s.indexOf(c.id), occ = s[i];
    if (from >= 0) s[from] = null;
    s[i] = c.id;
    if (occ && occ !== c.id && from >= 0) s[from] = occ;               /* moved along the row: the two swap */
    if (s.length > 1 && s[0] && dOf(s[0]) === 0) s[0] = null;           /* a swap never leaves a zero in front */
    setSlotsNow(s);
    if (s[0]) setNote("");
    if (free) prune(s);
    api.sfx.tick();
  };
  const liftOut = (id: any) => {
    const s = slotsRef.current.map((x) => (x === id ? null : x));
    setSlotsNow(s); setTouched(true);
    if (free) prune(s);
    api.sfx.tick();
  };
  /* Repeat: an identical card laid beside its card, with a doubled outline; one more pick replaces it */
  const cloneOf = (id: any) => {
    const src = cardOf(id);
    setArmRep(false);
    if (!src || budget <= 0) return null;
    let cs = cardsRef.current.slice(), s = slotsRef.current.slice();
    const clones = cs.filter((c: any) => c.clone);
    if (clones.length >= budget) { const old = clones[clones.length - 1]; cs = cs.filter((c: any) => c.id !== old.id); s = s.map((x) => (x === old.id ? null : x)); }
    const k = { id: "k" + ++seq.current, d: src.d, clone: true };
    cs.splice(cs.findIndex((c: any) => !c.clone && c.d === src.d) + 1, 0, k);
    setCardsNow(cs); setSlotsNow(s); setTouched(true); api.sfx.tick();
    return k;
  };
  const sortRack = () => {
    const up = sortUp;
    setCardsNow(cardsRef.current.slice().sort((a: any, b: any) => (up ? a.d - b.d : b.d - a.d)));
    setSortUp(!up); setTouched(true); api.sfx.tick();
  };
  /* lays a number in the slots from the rack's own cards (the agent, the dev driver, and a typed
     answer the traceback shows); false when these cards cannot make it */
  const arrange = (v: any) => {
    const want = String(v ?? "").replace(/[^0-9]/g, "").split("").map(Number), n0 = slotsRef.current.length;
    if (kind !== "build" || want.length !== n0 || (n0 > 1 && want[0] === 0)) return false;
    const given = cardsRef.current.filter((c: any) => !c.clone), used: any[] = [], extra: any[] = [];
    for (const d of want) {
      let c = given.find((x: any) => x.d === d && !used.includes(x.id));
      if (!c) {
        if (extra.length >= budget || !given.some((x: any) => x.d === d)) return false;
        c = { id: "k" + ++seq.current, d, clone: true };
        extra.push(c);
      }
      used.push(c.id);
    }
    const cs = given.slice();
    extra.forEach((k) => cs.splice(cs.findIndex((x: any) => !x.clone && x.d === k.d) + 1, 0, k));
    setCardsNow(cs); setSlotsNow(used); setRefused(null); setNote(""); setArmRep(false);
    return true;
  };
  /* the keyboard reaches the rack: a digit key places that card in the next empty slot (repeating
     it when the item allows one more), Backspace lifts the last card out */
  const typeDigit = (d: number) => {
    if (!canPlay || slotsRef.current.indexOf(null) < 0) return;
    if (free) { const src = cardsRef.current.find((c: any) => c.src && c.d === d); if (src) place(src.id, null); return; }
    const s = slotsRef.current;
    let c = cardsRef.current.find((x: any) => x.d === d && !s.includes(x.id));
    if (!c && budget > cardsRef.current.filter((x: any) => x.clone).length) {
      const g = cardsRef.current.find((x: any) => !x.clone && x.d === d);
      if (g) c = cloneOf(g.id);
    }
    if (c) place(c.id, null);
  };
  const keyRef = useRef<any>(null);
  keyRef.current = (e: any) => {
    if (e.metaKey || e.ctrlKey || e.altKey || !canPlay) return;
    if (/^[0-9]$/.test(e.key)) typeDigit(Number(e.key));
    else if (e.key === "Backspace") { const s = slotsRef.current; for (let i = s.length - 1; i >= 0; i--) if (s[i]) { liftOut(s[i]); break; } }
  };
  useEffect(() => {
    const h = (e: any) => keyRef.current && keyRef.current(e);
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, []);
  const morePlaces = () => { if (slotsRef.current.length >= 6) return; setSlotsNow([null].concat(slotsRef.current)); api.sfx.tick(); };
  const fewerPlaces = () => {
    if (slotsRef.current.length <= 2) return;
    const s = slotsRef.current.slice(1);
    if (s[0] && dOf(s[0]) === 0) s[0] = null;
    setSlotsNow(s); prune(s); api.sfx.tick();
  };

  /* ── the stepper: each card turns over in turn from the right ── */
  const stepSteps = (ds0: number[], dir: string, slow: number) => {
    const ds = ds0.slice(), S: any[] = [];
    const s = (ms: number, fn: () => void) => S.push([ms * slow, fn]);
    const turn = (j: number) => { const snap = ds.slice(); s(400, () => { setDigsNow(snap); setHl(j); api.sfx.tick(); }); };
    let i = ds.length - 1;
    if (dir === "up") {
      while (i >= 0 && ds[i] === 9) { ds[i] = 0; turn(i); i--; }
      if (i < 0) { ds.unshift(1); const snap = ds.slice(); s(560, () => { setDigsNow(snap); setHl(0); setOpened(true); api.sfx.tick(); }); }
      else { ds[i] += 1; turn(i); }
    } else {
      while (i > 0 && ds[i] === 0) { ds[i] = 9; turn(i); i--; }
      ds[i] -= 1; turn(i);
      if (ds.length > 1 && ds[0] === 0) { ds.shift(); const snap = ds.slice(); s(560, () => { setDigsNow(snap); setHl(null); }); }
    }
    s(320, () => setHl(null));
    return { steps: S, digs: ds };
  };
  const stepPress = (dir: string) => {
    const inDemo = stage === "demo";
    if (busy) return;
    if (inDemo ? !(stepDemo && dir === "up") : !(stage === "ask" && kind === "step" && armedRef.current && !revealed && dir === cfg.dir)) return;
    const r = stepSteps(digsRef.current, dir, 1), p = predRef.current;
    setArmedNow(false); setTouched(true);
    setSteps((x: any) => ({ ...x, [dir]: x[dir] + 1 }));
    tl.run([...r.steps, [80, () => (dir === "up" ? setMore(numOf(r.digs)) : setLess(numOf(r.digs)))], [650, () => {}]], () => {
      if (inDemo) api.demoDone(phase.demoLines);
      else { setRevealed(true); api.submit(p); }
    });
  };
  const demoAct = () => {
    if (stage !== "demo" || !demo || busy) return;
    if (!demo.zero) { stepPress("up"); return; }
    const z = cardsRef.current.find((c: any) => c.d === 0 && !slotsRef.current.includes(c.id));
    if (z) { setTouched(true); refuse(z.id, () => api.demoDone(phase.demoLines)); }
  };

  const drag = useDrag((pay: any, p: any, moved: boolean) => {
    if (stage === "demo") { if (pay.zero) demoAct(); return; }
    if (!canPlay) return;
    const i = moved ? slotAt(p, slotsRef.current.length) : null;
    if (pay.src === "rack") {
      if (armRep) { cloneOf(pay.id); return; }
      if (moved && i === null) return;          /* let go away from the row: it simply goes back */
      place(pay.id, i);
    } else if (!moved || i === null) liftOut(pay.id); /* a tap, or dragged off the row: back to the rack */
    else place(pay.id, i);
  });

  /* Enter (in a demo, Enter makes the one act) */
  const enterFn: any =
    stage === "demo" ? (demoLive ? () => demoAct() : null)
      : stage !== "ask" || busy ? null
        : kind === "build" ? () => {
          const ds = slotsRef.current.filter(Boolean).map((id) => dOf(id));
          if (ds.length) api.submit(ds.join(""));
        }
          : kind === "step" ? (v: any) => {
            const val = leadNumber(v);
            if (v === "" || v === undefined || val === null) return;
            api.setTyped(String(val));
            if (revealed) { api.submit(val); return; }   /* the step was shown; a retry commits directly */
            predRef.current = val; setArmedNow(true); api.lock(true);
          }
            : null;
  api.onEnter(enterFn);
  HOOK.enter = (v?: any) => enterFn && enterFn(v);
  HOOK.set = (v: any) => arrange(v);
  HOOK.step = () => stepPress(cfg.dir);
  HOOK.demo = () => demoAct();
  HOOK.check = () => (demoLive ? (demoAct(), true)
    : kind === "step" && stage === "ask" && armedRef.current && !busy ? (stepPress(cfg.dir), true) : undefined);

  /* ── win motions ── */
  useEffect(() => {
    if (stage !== "win") return;
    if (kind === "build") {
      const ds = slotsRef.current.map((id) => dOf(id));
      const S: any[] = [[60, () => setFx({ ...FX0, win: true })]];
      ds.forEach((_, i) => S.push([230, () => setFx((f: any) => ({ ...f, lit: [i], boxes: i + 1 }))]));
      S.push([300, () => setFx((f: any) => ({ ...f, lit: [], reading: indian(Number(ds.join(""))) }))]);
      tl.run(S);
    } else if (kind === "step") {
      /* the number steps back to where it started and its other neighbour is written: both are read */
      if (numOf(digsRef.current) !== item.answer) setDigsNow(digitsOf(item.answer));
      const back = stepSteps(digitsOf(item.answer), cfg.dir === "up" ? "down" : "up", 1);
      const other = cfg.dir === "up" ? cfg.start - 1 : cfg.start + 1;
      tl.run([[500, () => (cfg.dir === "up" ? setMore(item.answer) : setLess(item.answer))], ...back.steps,
        [300, () => (cfg.dir === "up" ? setLess(other) : setMore(other))], [400, () => {}]]);
    }
  }, [stage]);

  /* ── the traceback: the mathematics redrawn in steps; nothing marked, nothing cleared ── */
  useEffect(() => {
    if (!wrong || stage !== "ask") return;
    api.lock(true);
    setTouched(true); setArmRep(false);
    const done = () => api.lock(false);
    if (kind === "step") {
      const start = digitsOf(cfg.start), dir = cfg.dir, v = leadNumber(wrong.value);
      const other = dir === "up" ? cfg.start - 1 : cfg.start + 1, otherSide = dir === "up" ? "less" : "more";
      const S: any[] = [[60, () => { setDigsNow(start); setHl(null); setRingSide(null); setArmedNow(false); if (dir === "up") setMore(null); else setLess(null); }]];
      if (v === other) S.push([500, () => { if (dir === "up") setLess(v); else setMore(v); setRingSide(otherSide); }], [1200, () => {}]);
      else S.push([700, () => {}]);
      const r = stepSteps(start, dir, 1.8);
      S.push(...r.steps, [80, () => (dir === "up" ? setMore(numOf(r.digs)) : setLess(numOf(r.digs)))], [600, () => {}]);
      tl.run(S, () => { setRevealed(true); done(); });
      return;
    }
    const nn = slotsRef.current.length;
    const raw = String(wrong.value ?? "").replace(/[^0-9]/g, "");
    const readRow = () => slotsRef.current.map((id) => dOf(id));
    const cur = readRow().filter((d) => d !== null).join("");
    const S: any[] = [[80, () => setFx(FX0)]];
    let zeroLed = false;
    if (raw && raw !== cur) {
      /* the child's number (typed, or given by the agent) is laid in the slots first */
      if (cfg.goal === "smallest" && nn > 1 && raw.length === nn && raw[0] === "0") {
        const given = cardsRef.current.filter((c: any) => !c.clone), used: any[] = [];
        const ok = raw.split("").every((ch) => { const c = given.find((x: any) => x.d === Number(ch) && !used.includes(x.id)); if (c) used.push(c.id); return !!c; });
        if (ok && used.length === given.length) { setCardsNow(given); setSlotsNow([null].concat(used.slice(1))); setRefused(used[0]); setNote(""); zeroLed = true; }
      } else arrange(raw);
      S.push([700, () => {}]);
    }
    /* every correction ends on the whole right answer: the right row is laid under the child's, read
       pair by pair from the left with the place names lighting, and the first place that differs goes amber.
       Neither row is taken away. */
    const want = digitsOf(item.answer);
    const layAnswer = (row: any[]) => {
      S.push([300, () => setNote("")]);
      for (let i = 0; i < nn; i++) { const ii = i; S.push([520, () => setFx((f: any) => ({ ...f, mini: want.slice(0, ii + 1), lit: [ii] }))]); }
      const k = row.findIndex((d, i) => d !== want[i]);
      S.push([400, () => setFx((f: any) => ({ ...f, lit: [], miniAmber: k >= 0 ? k : null, rings: k >= 0 && !(f.rings || []).includes(k) ? (f.rings || []).concat([k]) : f.rings }))], [900, () => {}]);
      tl.run(S, done);
    };
    if (zeroLed) {
      /* a zero in front: the slot refuses it, the places are counted from the right and come up one short */
      S.push([500, () => setShakeN((k) => k + 1)], [700, () => {}]);
      noteSteps().forEach(([ms, t]: any) => S.push([ms, () => setNote(t)]));
      S.push([500, () => {}]);
      for (let i = nn - 1, c = 1; i >= 1; i--, c++) { const ii = i, cc = c; S.push([480, () => setFx((f: any) => ({ ...f, lit: f.lit.concat([ii]), boxes: cc }))]); }
      S.push([600, () => setFx((f: any) => ({ ...f, dark: true }))], [1300, () => {}]);
      S.push([60, () => { setRefused(null); api.sfx.tick(); }], [500, () => {}]);
      layAnswer([null].concat(raw.slice(1).split("").map(Number) as any[]));
      return;
    }
    const row = readRow();
    const empties = row.map((d, i) => (d === null ? i : -1)).filter((i) => i >= 0);
    if (empties.length) {
      /* a slot left empty: the target's boxes are counted out against the slots holding a card */
      let c = 0;
      row.forEach((d, i) => { if (d === null) return; c++; const cc = c; S.push([420, () => setFx((f: any) => ({ ...f, lit: [i], boxes: cc }))]); });
      S.push([500, () => setFx((f: any) => ({ ...f, lit: empties, rings: empties, repLit: budget > 0 }))], [900, () => {}]);
      layAnswer(row);
      return;
    }
    const mx = Math.max(...(row as number[]));
    if (cfg.goal === "greatest" && row[0] !== mx) {
      /* the biggest card is carried towards the front, its worth growing slot by slot */
      const j = row.lastIndexOf(mx);
      S.push([200, () => setFx((f: any) => ({ ...f, ringCard: j }))]);
      for (let i = j; i >= 0; i--) { const ii = i, t = indian(mx * Math.pow(10, nn - 1 - i)); S.push([720, () => setFx((f: any) => ({ ...f, worth: { i: ii, text: t } }))]); }
      S.push([300, () => setFx((f: any) => ({ ...f, rings: [0] }))], [700, () => {}]);
    }
    layAnswer(row);
  }, [wrong]);

  /* ── what the host and the agent read back (toolApi.getState) ── */
  const nn = kind === "step" ? digs.length : slots.length;
  const row = kind === "step" ? digs : slots.map((id) => (id ? (cards.find((c: any) => c.id === id) || {}).d : null));
  const filled = row.filter((d: any) => d !== null && d !== undefined);
  const value = filled.length ? Number(filled.join("")) : 0;
  const full = nn > 0 && filled.length === nn;
  api.share({
    phase: n, target: cfg.goal || (kind === "step" ? (cfg.dir === "up" ? "successor" : "predecessor") : "any"), placesWanted: nn,
    rack: cards.filter((c: any) => !c.copy && !slots.includes(c.id) && c.id !== refused).map((c: any) => c.d), slots: row,
    repeated: cards.filter((c: any) => c.clone).map((c: any) => c.d),
    clones: slots.map((id, i) => ((cards.find((c: any) => c.id === id) || {}).clone ? i : -1)).filter((i) => i >= 0),
    stepped: steps, value, complete: stage === "idle",
  });

  /* ── drawing ── */
  const rack = rackGeo(free ? 10 : cards.length, kind === "free");
  const cardPos = (c: any, h: number) => {
    if (refused === c.id) return { x: slotX(0, nn) + 6, y: G.slotY + 6, s: 1 };
    const i = slots.indexOf(c.id);
    if (i >= 0) return { x: slotX(i, nn) + 6, y: G.slotY + 6, s: 1 };
    return { x: rack.start + h * rack.pitch, y: rack.y, s: RS };
  };
  const rackCentre = (h: number) => ({ x: rack.start + h * rack.pitch + (CARD.w * RS) / 2, y: rack.y + (CARD.h * RS) / 2 });
  const dragging = drag.drag && drag.drag.moved ? drag.drag : null;
  const dragOver = dragging && building ? slotAt(dragging, nn) : null;
  const stripText = kind === "step" ? "One more, one less" : kind === "free" ? "Build any number" : cfg.goal === "greatest" ? "Greatest number" : "Smallest number";
  const boxX0 = W.w - 20 - (nn * 32 - 8);
  const reading = kind === "free" && full ? indian(value) : fx.reading;
  const sortX = budget > 0 ? KEYS_X.sort : KEYS_X.sortAlone;
  const upLive = (stage === "demo" && stepDemo && !busy) || (stage === "ask" && kind === "step" && armed && !revealed && !busy && cfg.dir === "up");
  const downLive = stage === "ask" && kind === "step" && armed && !revealed && !busy && cfg.dir === "down";
  const upX = STEP.c + 10, downX = STEP.c - 10 - STEP.key;
  const lessX = downX - 24 - STEP.boxW, moreX = upX + STEP.key + 24;

  let invite: any = null;
  if (stage === "demo" && demo && demo.zero && !busy) {
    const h = cards.findIndex((c: any) => c.d === 0 && !slots.includes(c.id));
    if (h >= 0) invite = { ...rackCentre(h), r: 66 };
  } else if (upLive) invite = { x: upX + STEP.key / 2, y: STEP.y + STEP.key / 2, r: 56 };
  else if (downLive) invite = { x: downX + STEP.key / 2, y: STEP.y + STEP.key / 2, r: 56 };
  else if (stage === "ask" && kind === "build" && index === 0 && !touched && !busy) {
    if (budget > 0) invite = { x: KEYS_X.repeat + KEYS_X.w / 2, y: KEYS_X.y + KEYS_X.h / 2, r: 80 };
    else if (cfg.goal === "greatest") {
      const inRack = cards.map((c: any, h: number) => ({ c, h })).filter((o: any) => !slots.includes(o.c.id));
      const top = inRack.reduce((a: any, o: any) => (!a || o.c.d > a.c.d ? o : a), null);
      if (top) invite = { ...rackCentre(top.h), r: 66 };
    }
  }

  return (
    <g>
      <style>{DL_CSS}</style>

      {/* running count, in the runs zone (64,108): slots filled against slots wanted, or the steps taken */}
      <g data-zone="runs">
        <rect x={0} y={-94} width={330} height={76} rx={RAD.panel} fill="url(#gPanel)" stroke={C.rule} strokeWidth={2} />
        {kind === "step" ? (
          <g>
            <text x={18} y={-46} fontSize={T.micro} fontWeight={500} fill={C.ink}>{tx("Steps")}</text>
            <g transform="translate(150,-58) scale(0.62)"><Tri up fill={C.accent} /></g>
            <text x={170} y={-45} fontSize={T.label} fontWeight={700} fill={C.ink}>{steps.up}</text>
            <g transform="translate(236,-54) scale(0.62)"><Tri fill={C.accent} /></g>
            <text x={256} y={-45} fontSize={T.label} fontWeight={700} fill={C.ink}>{steps.down}</text>
          </g>
        ) : (
          <g>
            <text x={18} y={-46} fontSize={T.micro} fontWeight={500} fill={C.ink}>{tx("Cards placed")}</text>
            <text x={312} y={-45} textAnchor="end" fontSize={T.label} fontWeight={700} fill={C.ink}>{`${filled.length} / ${nn}`}</text>
          </g>
        )}
      </g>

      {/* the target strip: what is wanted, and that many small boxes to count */}
      <rect x={0} y={0} width={W.w} height={G.stripH} rx={16} fill={tint(C.panel, 0.45)} stroke={C.rule} strokeWidth={2} />
      <text x={24} y={39} fontSize={T.label} fontWeight={600} fill={C.ink}>{tx(stripText)}</text>
      <text x={boxX0 - 18} y={39} textAnchor="end" fontSize={T.label} fontWeight={600} fill={C.ink}>{lang === "hi" ? `${nn} स्थान` : lang === "gu" ? `${nn} સ્થાન` : `${nn} places`}</text>
      {Array.from({ length: nn }).map((_, k) => {
        const on = fx.boxes > k;
        return <rect key={"b" + k} x={boxX0 + k * 32} y={12} width={24} height={32} rx={6}
          fill={on ? (fx.win ? colorOf(nn - 1 - k) : tint(AMBER, 0.45)) : "#FFFFFF"} stroke={on && !fx.win ? AMBER : shade(C.rule, 0.15)} strokeWidth={2} />;
      })}

      {/* the card slots, each with its place name underneath; the front slot has the heavier outline */}
      {Array.from({ length: nn }).map((_, i) => {
        const x = slotX(i, nn), p = nn - 1 - i, lead = i === 0 && nn > 1, cx = slotC(i, nn);
        const worth = fx.worth && fx.worth.i === i ? fx.worth.text : null;
        const lit = !!worth || fx.lit.includes(i) || hl === i;
        const dark = fx.dark && i === 0;
        const over = dragOver === i;
        return (
          <g key={"s" + p}>
            <g key={lead ? "lead" + shakeN : "slot"} className={lead && shakeN ? "dl-shake" : undefined}>
              <rect x={x} y={G.slotY} width={G.slotW} height={G.slotH} rx={18} fill="#FFFFFF"
                stroke={over ? AMBER : lead ? shade(C.rule, 0.4) : C.rule} strokeWidth={over || lead ? 5 : 2.5} strokeDasharray={over || lead ? undefined : "10 8"} />
            </g>
            <rect x={x + 12} y={G.barY} width={G.slotW - 24} height={6} rx={3} fill={dark ? tint(ZERO, 0.5) : colorOf(p)} />
            {lit && <rect x={cx - 72} y={236} width={144} height={58} rx={14} fill={tint(AMBER, 0.62)} stroke={worth ? AMBER : "none"} strokeWidth={3} />}
            {worth ? (
              <text x={cx} y={274} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={C.ink}>{worth}</text>
            ) : (lang === "en" ? nameLines(p) : [tx(PLACES[p])]).map((ln, k, arr) => ( /* one line fits in hi/gu */
              <text key={k} x={cx} y={arr.length > 1 ? 259 + k * 28 : 273} textAnchor="middle" fontSize={T.micro} fontWeight={600}
                fill={dark ? ZERO : lit ? C.ink : inkOf(p)}>{ln}</text>
            ))}
          </g>
        );
      })}

      {/* under the row: the front slot's reason, the number read, or the row laid under for comparing */}
      {note && (() => {
        const nw = lang === "en" ? 300 : 390; /* hi/gu sentences run longer */
        const x = Math.min(slotX(0, nn) - 6, W.w - nw - 6);
        return (
          <g>
            <rect x={x} y={G.noteY} width={nw} height={50} rx={14} fill="#FFFFFF" stroke={shade(C.rule, 0.25)} strokeWidth={2} />
            <text x={x + 20} y={G.noteY + 35} fontSize={T.micro} fontWeight={600} fill={C.ink}>{note}</text>
          </g>
        );
      })()}
      {reading && !note && (
        <text className="dl-in" data-role="reading" x={(slotX(0, nn) + G.right) / 2} y={G.noteY + 40} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={C.ink}>{reading}</text>
      )}
      {fx.mini.map((d: number, i: number) => {
        const cx = slotC(i, nn), p = nn - 1 - i, amber = fx.miniAmber === i;
        return (
          <g key={"m" + i} className="dl-in">
            <rect x={cx - 32} y={G.noteY} width={64} height={50} rx={10} fill={amber ? tint(AMBER, 0.55) : "#FFFFFF"} stroke={amber ? AMBER : shade(C.rule, 0.15)} strokeWidth={amber ? 4 : 2} />
            <text x={cx} y={G.noteY + 39} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={amber ? C.ink : d === 0 ? ZERO : inkOf(p)}>{d}</text>
          </g>
        );
      })}

      {/* the rack, and the controls at its right end */}
      {building && (
        <g>
          <rect x={0} y={G.rackY} width={rack.panelW} height={G.rackH} rx={22} fill="url(#gPanel)" stroke={C.rule} strokeWidth={2} />
          {kind === "build" && cards.map((c: any, h: number) => (slots.includes(c.id) || refused === c.id || (dragging && dragging.payload.id === c.id)) && (
            <rect key={"o" + c.id} x={rack.start + h * rack.pitch} y={rack.y} width={CARD.w * RS} height={CARD.h * RS} rx={11}
              fill="none" stroke={shade(C.rule, 0.2)} strokeWidth={2} strokeDasharray="7 6" />
          ))}
          {kind === "build" && (
            <Key id="sort" label={tx(sortUp ? "Sort the rack, smallest first" : "Sort the rack, largest first")} x={sortX} y={KEYS_X.y} w={KEYS_X.w} h={KEYS_X.h} C={C}
              disabled={!canPlay} onClick={() => canPlay && sortRack()}>
              {[0, 1, 2].map((k) => { const hgt = sortUp ? 16 + k * 14 : 44 - k * 14; return <rect key={k} x={-30 + k * 22} y={-6 - hgt} width={16} height={hgt} rx={3} fill={canPlay ? C.ink : mix(C.ink, C.panel, 0.5)} />; })}
              <text y={44} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={canPlay ? C.ink : mix(C.ink, C.panel, 0.5)}>{tx("Sort")}</text>
            </Key>
          )}
          {kind === "build" && budget > 0 && (
            <g>
              <Key id="repeat" label={tx("Repeat a card")} x={KEYS_X.repeat} y={KEYS_X.y} w={KEYS_X.w} h={KEYS_X.h} C={C} primary={armRep && canPlay}
                disabled={!canPlay} onClick={() => { if (canPlay) { setArmRep((b) => !b); setTouched(true); } }}>
                {(() => { const ic = armRep && canPlay ? "#FFFFFF" : canPlay ? C.ink : mix(C.ink, C.panel, 0.5); return (
                  <g>
                    <rect x={-30} y={-50} width={36} height={46} rx={7} fill="none" stroke={ic} strokeWidth={3} />
                    <rect x={-8} y={-40} width={36} height={46} rx={7} fill={armRep && canPlay ? "none" : "#FFFFFF"} stroke={ic} strokeWidth={3} />
                    <rect x={-3} y={-35} width={26} height={36} rx={4} fill="none" stroke={ic} strokeWidth={2} />
                    <text y={46} textAnchor="middle" fontSize={armRep && canPlay ? T.micro : T.label} fontWeight={600} fill={ic}>{tx(armRep && canPlay ? "Pick one" : "Repeat")}</text>
                  </g>); })()}
              </Key>
              {fx.repLit && <rect x={KEYS_X.repeat - 7} y={KEYS_X.y - 7} width={KEYS_X.w + 14} height={KEYS_X.h + 19} rx={24} fill="none" stroke={AMBER} strokeWidth={5} />}
            </g>
          )}
          {kind === "free" && (
            <g>
              <Key id="more-places" label={tx("One more place")} x={12} y={72} w={150} h={72} C={C} disabled={slots.length >= 6} onClick={morePlaces}>
                <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={slots.length >= 6 ? mix(C.ink, C.panel, 0.5) : C.ink}>{tx("+ place")}</text>
              </Key>
              <Key id="fewer-places" label={tx("One place less")} x={12} y={150} w={150} h={72} C={C} disabled={slots.length <= 2} onClick={fewerPlaces}>
                <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={slots.length <= 2 ? mix(C.ink, C.panel, 0.5) : C.ink}>{tx("− place")}</text>
              </Key>
            </g>
          )}
        </g>
      )}

      {/* the cards: in the rack, in a slot, or refused at the front */}
      {building && cards.map((c: any, h: number) => {
        const i = slots.indexOf(c.id), inSlot = i >= 0;
        if (c.copy && !inSlot && refused !== c.id) return null;
        const pos = cardPos(c, c.src ? c.d : h), p = inSlot ? nn - 1 - i : -1;
        const live = (canPlay && !refused) || (stage === "demo" && !!demo && !!demo.zero && !busy && c.d === 0 && !inSlot);
        const pay = { src: inSlot ? "slot" : "rack", id: c.id, zero: c.d === 0 };
        const ink = inSlot ? (c.d === 0 ? ZERO : inkOf(p)) : C.ink;
        const label = inSlot ? `Card ${c.d} in the ${PLACES[p]}, tap to lift out` : armRep ? `Repeat card ${c.d}` : `Card ${c.d}`;
        const hidden = dragging && dragging.payload.id === c.id;
        return (
          <g key={c.id} className="dl-move" style={{ transform: `translate(${pos.x}px, ${pos.y}px) scale(${pos.s})`, opacity: hidden ? 0 : 1 } as any}>
            <g className={live ? "dl-grab c4-piece" : undefined}
              {...(live ? { ...control("card-" + c.id, label), ...drag.bind(pay), ...drag.keys(pay) } : {})}>
              <g key={refused === c.id ? "r" + shakeN : "n"} className={refused === c.id && shakeN ? "dl-shake" : undefined}>
                <CardFace C={C} d={c.d} ink={ink} clone={c.clone} ring={inSlot && fx.ringCard === i ? AMBER : undefined} />
              </g>
            </g>
          </g>
        );
      })}

      {/* phase 4: the number's own cards, which the stepper turns over */}
      {kind === "step" && digs.map((d, i) => {
        const p = nn - 1 - i;
        return (
          <g key={"d" + p} style={{ transform: `translate(${slotX(i, nn) + 6}px, ${G.slotY + 6}px)` } as any}>
            <g className={opened && i === 0 ? "dl-in" : undefined}>
              <CardFace C={C} d={d} ink={d === 0 ? ZERO : inkOf(p)} ring={hl === i ? AMBER : undefined} />
            </g>
          </g>
        );
      })}

      {/* the stepper: one less to the left, one more to the right, written as each is made */}
      {kind === "step" && (
        <g>
          {[["less", less, lessX], ["more", more, moreX]].map(([side, val, x]: any) => (
            <g key={side}>
              <rect x={x} y={STEP.y} width={STEP.boxW} height={STEP.key} rx={18} fill="#FFFFFF"
                stroke={ringSide === side ? AMBER : C.rule} strokeWidth={ringSide === side ? 5 : 2} />
              {val !== null && <text className="dl-in" x={x + STEP.boxW / 2} y={STEP.y + 60} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={C.ink}>{indian(val)}</text>}
              <text x={x + STEP.boxW / 2} y={STEP.y + 128} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx(side === "less" ? "one less" : "one more")}</text>
            </g>
          ))}
          <Key id="step-down" label={tx("Step down one")} x={downX} y={STEP.y} w={STEP.key} h={STEP.key} rx={STEP.key / 2} C={C} primary={downLive} disabled={!downLive}
            onClick={() => stepPress("down")}><Tri fill={downLive ? "#FFFFFF" : mix(C.ink, C.panel, 0.5)} /></Key>
          <Key id="step-up" label={tx("Step up one")} x={upX} y={STEP.y} w={STEP.key} h={STEP.key} rx={STEP.key / 2} C={C} primary={upLive} disabled={!upLive}
            onClick={() => stepPress("up")}><Tri up fill={upLive ? "#FFFFFF" : mix(C.ink, C.panel, 0.5)} /></Key>
        </g>
      )}

      {/* amber rings: the slot under discussion */}
      {(fx.rings || []).map((i: number) => (
        <rect key={"r" + i} x={slotX(i, nn) - 6} y={G.slotY - 6} width={G.slotW + 12} height={G.slotH + 12} rx={22} fill="none" stroke={AMBER} strokeWidth={6} />
      ))}

      {/* the card under the finger */}
      {dragging && building && (() => {
        const c = cards.find((x: any) => x.id === dragging.payload.id);
        if (!c) return null;
        return (
          <g pointerEvents="none" transform={`translate(${dragging.x - CARD.w * 0.42},${dragging.y - CARD.h * 0.42}) scale(0.84)`} filter="url(#fLift)">
            <CardFace C={C} d={c.d} ink={C.ink} clone={c.clone} />
          </g>
        );
      })()}

      {invite && <Invite x={invite.x} y={invite.y} r={invite.r} C={C} />}
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase:
   the row of cards in its place inks (a clone keeps its doubled outline), or the neighbour stepped to */
function Thumb({ result, C, w, h }: any) {
  const L = (result && result.last) || {};
  const sh = L.shared || {};
  const v = leadNumber(L.value);
  const bg = <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />;
  if (L.kind === "step") {
    if (v === null) return null;
    const up = sh.target === "successor";
    return (
      <g>
        {bg}
        <g transform={`translate(34,${h / 2}) scale(0.8)`}><Tri up={up} fill={C.accent} /></g>
        <text x={w - 16} y={h / 2 + 12} textAnchor="end" fontSize={T.label} fontWeight={700} fill={C.ink}>{indian(v)}</text>
      </g>
    );
  }
  const ds: number[] = Array.isArray(sh.slots) && sh.slots.length && sh.slots.every((d: any) => typeof d === "number") ? sh.slots
    : v !== null ? String(L.value).replace(/[^0-9]/g, "").split("").map(Number) : [];
  if (!ds.length) return null;
  const k = ds.length, gap = 5, cw = Math.min(34, (w - 16 - gap * (k - 1)) / k), ch = Math.min(56, h - 16);
  const x0 = w - 8 - (k * cw + (k - 1) * gap), y0 = (h - ch) / 2, clones = sh.clones || [];
  return (
    <g>
      {bg}
      {ds.map((d, i) => {
        const x = x0 + i * (cw + gap);
        return (
          <g key={i}>
            <rect x={x} y={y0} width={cw} height={ch} rx={7} fill="#FFFFFF" stroke={shade(C.rule, 0.15)} strokeWidth={1.5} />
            {clones.includes(i) && <rect x={x + 3} y={y0 + 3} width={cw - 6} height={ch - 6} rx={5} fill="none" stroke={shade(C.rule, 0.15)} strokeWidth={1.5} />}
            <text x={x + cw / 2} y={y0 + ch / 2 + 11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={d === 0 ? ZERO : inkOf(k - 1 - i)}>{d}</text>
          </g>
        );
      })}
    </g>
  );
}

function DigitLab(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, format, fitHost: () => null }} />
  );
}

export default DigitLab;
