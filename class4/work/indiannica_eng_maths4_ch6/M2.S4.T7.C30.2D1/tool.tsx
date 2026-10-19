/* ═══ M2.S4.T7.C30.2D1 · digit_tester · tool-specific part (REMAKE: silent runtime r28, the new look) ═════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the working area already
   exists. THE LESSON IS SILENT: every line is printed on the bubble. keyOnly + navDots: no question bar, the question
   lives only in the bubble, every act is performed on screen through api.act (a hand pushes the shutter, carries a
   card, taps; a pencil ticks). Numbers, rows and sizes are in DT below; the maths is judged by judge / oracle.
   Edit, never rewrite. Built by `node cli.mjs scaffold`; concepts are verbatim (check compares them). */

const TOOL_ID = "digit_tester";
const MEDIA_ID = "M2.S4.T7.C30.2D1";
const TOOL_NAME = "Digit Tester";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
/* kept for the tool object's shape (and the sidecar); nothing speaks from r30 */
const VOICE = {"rate":0.92,"pitch":1.06};

/* printed on the bubble before phase 1's teach lines only (the plan's opening line; not shown when phase 1 has steps) */
const OPENING = ["A number laid out, one digit to a cell, and four lamps underneath it."];
/* the whole-tool line: printed on the summary page */
const FINISH_LINE = "Four tests run, every cell counted in, and one slot that stayed dark.";
/* printed when the child opens Free play: it names only what free play really has (cells, lamps, the dark slot) */
const FREE_LINE = "Free play. Tap a cell to change its digit, then press any lamp to test the number.";

/* the chapter's answer keys and the two boxes of a sharing answer */
const DT_YESNO = [{ id: "yes", label: "yes" }, { id: "no", label: "no" }];
const DT_KNOWN = [{ id: "yes", label: "yes" }, { id: "no", label: "no" }, { id: "not known", label: "not known" }];
const DT_PROVED = [{ id: "by 3", label: "by 3" }, { id: "by 3 and 6", label: "by 3 and 6" }];
const DT_SHARE = [{ label: "sharing" }, { label: "left over" }];
const DT_ASK_SHARE = "How many share? How many left?";

const START_HOOK = "Can you tell what divides a number without dividing it?";

/* hindi / gujarati: filled after the English is final (docs/PATTERNS.md §11) */
const TR: any = {
  hi: {
    "Digit Tester": "अंक जाँचक",
    "A number laid out, one digit to a cell, and four lamps underneath it.": "एक संख्या, हर खाने में एक अंक, और उसके नीचे चार बत्तियाँ।",
    "Free play. Tap a cell to change its digit, then press any lamp to test the number.": "खुला खेल। किसी खाने को छूकर अंक बदलो, फिर कोई भी बत्ती दबाकर संख्या जाँचो।",
    "Can you tell what divides a number without dividing it?": "क्या तुम भाग किए बिना बता सकते हो कि संख्या किससे बँटती है?",
    "Reading the last digit": "अंतिम अंक पढ़ना",
    "Cover everything but the end. Can you still answer? Which digit did it?": "अंत को छोड़ बाकी सब ढक दो। क्या तब भी जवाब दे सकते हो? किस अंक ने बताया?",
    "Tap the lamp for 2 to cover all but the last digit.": "2 की बत्ती दबाओ, आख़िरी अंक के सिवा सब ढक जाएगा।",
    "Tap the lamp marked 2.": "2 लिखी बत्ती दबाओ।",
    "Now tap the one digit that is still showing.": "अब जो एक अंक दिख रहा है, उसे छुओ।",
    "It is the cell at the far right.": "यह सबसे दाईं ओर का खाना है।",
    "Look at the last cell only.": "सिर्फ़ आख़िरी खाने को देखो।",
    "Does that last digit pass this lamp's test?": "क्या वह अंक इस बत्ती की जाँच पास करता है?",
    "The ones digit alone settles the tests for 2, 5 and 10.": "2, 5 और 10 की जाँच सिर्फ़ इकाई अंक से हो जाती है।",
    "You learned: only the last digit matters for 2, 5 and 10.": "तुमने सीखा: 2, 5 और 10 के लिए सिर्फ़ आख़िरी अंक मायने रखता है।",
    "Is 4,386 divisible by 2, judging by its end alone?": "क्या 4,386 सिर्फ़ अंत देखकर 2 से विभाज्य है?",
    "Divisible by 2?": "2 से विभाज्य?",
    "Which cell is the ones?": "इकाई वाला खाना कौन सा है?",
    "What digit is standing in that cell?": "उस खाने में कौन सा अंक है?",
    "A number divisible by 2 ends in 0, 2, 4, 6 or 8; does this one?": "2 से विभाज्य संख्या 0, 2, 4, 6 या 8 पर ख़त्म होती है; क्या यह?",
    "Yes, it ends in 6, so 4,386 divides by 2.": "हाँ, यह 6 पर ख़त्म होती है, इसलिए 4,386, 2 से विभाज्य है।",
    "Is 7,314 divisible by 5?": "क्या 7,314, 5 से विभाज्य है?",
    "Divisible by 5?": "5 से विभाज्य?",
    "Cover the rest; what is left to read?": "बाकी ढको; पढ़ने को क्या बचा?",
    "Which endings can a number divisible by 5 have?": "5 से विभाज्य संख्या किन अंकों पर ख़त्म हो सकती है?",
    "Such numbers end in 0 or 5; compare that with 7,314.": "ऐसी संख्याएँ 0 या 5 पर ख़त्म होती हैं; 7,314 से मिलाओ।",
    "No, it ends in 4, not 0 or 5, so 5 does not divide 7,314 evenly.": "नहीं, यह 4 पर ख़त्म होती है, 0 या 5 पर नहीं, इसलिए 5 से 7,314 पूरा-पूरा नहीं बँटती।",
    "Does 10 divide 6,470?": "क्या 10 से 6,470 विभाजित होती है?",
    "Divisible by 10?": "10 से विभाज्य?",
    "What must a number divisible by 10 end in?": "10 से विभाज्य संख्या किस अंक पर ख़त्म होती है?",
    "Look at 10, 20, 30 and 40: what do they share?": "10, 20, 30 और 40 को देखो: इनमें क्या एक जैसा है?",
    "They all end in 0; does 6,470 end that way too?": "सब 0 पर ख़त्म होती हैं; क्या 6,470 भी ऐसे ही?",
    "Yes, 6,470 ends in 0, so it is a multiple of 10.": "हाँ, 6,470 के अंत में 0 है, इसलिए यह 10 का गुणज है।",
    "Adding every digit for three": "तीन की जाँच के लिए हर अंक जोड़ना",
    "Take every card down, even the empty looking ones. Leave none out.": "हर कार्ड नीचे लाओ, ख़ाली दिखने वाले भी। कोई न छूटे।",
    "Tap the first card to bring it down onto the rail.": "पहले कार्ड को छुओ, वह पट्टी पर आ जाएगा।",
    "Tap the card at the far left end of the row.": "पंक्ति के सबसे बाएँ छोर का कार्ड छुओ।",
    "Now bring the zero card down as well.": "अब शून्य वाला कार्ड भी नीचे लाओ।",
    "The zero is a card too.": "शून्य भी एक कार्ड है।",
    "Bring the last card down to close the rail.": "आख़िरी कार्ड नीचे लाओ, पट्टी बंद हो जाएगी।",
    "One card is still up there.": "एक कार्ड अभी ऊपर है।",
    "How many cards does this number have altogether?": "इस संख्या के कुल कितने कार्ड हैं?",
    "Add the cards one at a time, and count each zero as a card.": "कार्ड एक-एक करके जोड़ो, हर शून्य को भी कार्ड गिनो।",
    "Every digit goes into the total for 3, zeros too.": "3 की जाँच में हर अंक योग में जाता है, शून्य भी।",
    "You learned: add every digit, zeros too, then test the total.": "तुमने सीखा: हर अंक जोड़ो, शून्य भी, फिर योग जाँचो।",
    "Bring every card of 40,608 down onto the rail, then type their total.": "40,608 के हर कार्ड को पट्टी पर लाओ, फिर उनका योग लिखो।",
    "Tap the lamps that light for this number first.": "पहले उन बत्तियों को छुओ जो इस संख्या के लिए जलती हैं।",
    "Digit total?": "अंकों का योग?",
    "Did every card on the rail go into your total?": "क्या पट्टी का हर कार्ड तुम्हारे योग में गया?",
    "How many cards are on the rail altogether?": "पट्टी पर कुल कितने कार्ड हैं?",
    "Add them left to right, and count each zero as a card that adds nothing.": "बाएँ से दाएँ जोड़ो; हर शून्य ऐसा कार्ड है जो कुछ नहीं जोड़ता।",
    "The total is 18, and 3 goes into 18, so 3 divides 40,608.": "योग 18 है और 18 में 3 जाता है, इसलिए 3 से 40,608 विभाजित होती है।",
    "Now type the total of all the digits of 3,105.": "अब 3,105 के सारे अंकों का योग लिखो।",
    "Point at each card on the rail as you add it.": "जोड़ते समय पट्टी के हर कार्ड पर उँगली रखो।",
    "Is any card on the rail missing from your total?": "क्या पट्टी का कोई कार्ड तुम्हारे योग से छूट गया?",
    "Add 3, 1, 0 and 5 one at a time, the zero too.": "3, 1, 0 और 5 एक-एक करके जोड़ो, शून्य भी।",
    "3,105 adds to 9, and 9 is in the 3 times table, so 3 divides 3,105.": "3,105 का योग 9 है, जो 3 के पहाड़े में आता है, इसलिए 3 से 3,105 विभाजित होती है।",
    "Use the rail to decide whether 3 divides 50,073.": "पट्टी की मदद से तय करो कि 3 से 50,073 बँटती है या नहीं।",
    "Does 3 divide 50,073?": "क्या 3 से 50,073 विभाजित है?",
    "Does 3 go into the total on the rail exactly?": "क्या पट्टी का योग 3 से पूरा-पूरा कटता है?",
    "Read the total the rail wrote; is it in the 3 times table?": "पट्टी का लिखा योग पढ़ो; क्या वह 3 के पहाड़े में है?",
    "Count in threes, past the total, and see whether it comes up.": "तीन-तीन गिनो, योग से आगे तक; देखो वह आता है या नहीं।",
    "Yes, 50,073 adds to 15, and 15 is five threes.": "हाँ, 50,073 का योग 15 है और 15 में 3 पूरे पाँच बार आता है।",
    "What the tests do not cover": "जाँच किन बातों को नहीं बताती",
    "It passed every test here. Now tell me about four. Can you?": "यह यहाँ की हर जाँच में पास हुई। अब चार के बारे में बताओ। बता सकते हो?",
    "Tap the dark slot to ask the number about 8.": "काली जगह को छुओ और संख्या से 8 के बारे में पूछो।",
    "Tap the slot beside the four lamps.": "चारों बत्तियों के पास वाली जगह छुओ।",
    "Is the number you are asked about one of the lamps?": "जिस संख्या के बारे में पूछा है, क्या वह किसी बत्ती पर है?",
    "Count the lamps, then look for one marked with that number.": "बत्तियाँ गिनो, फिर उस संख्या वाली बत्ती ढूँढो।",
    "A test answers only for the number it was run for.": "हर जाँच सिर्फ़ उसी संख्या के बारे में बताती है जिसकी वह होती है।",
    "You learned: a test answers only for the number on its lamp.": "तुमने सीखा: जाँच सिर्फ़ अपनी बत्ती की संख्या के बारे में बताती है।",
    "A number passes the tests for 2, 3, 5 and 10; does it divide by 4?": "एक संख्या 2, 3, 5 और 10 की जाँच में पास है; क्या वह 4 से विभाज्य है?",
    "Does it divide by 4?": "क्या 4 से विभाज्य है?",
    "Which tests has this chapter taught you?": "इस अध्याय ने कौन सी जाँचें सिखाई हैं?",
    "Is 4 one of the lamps on the stage?": "क्या 4 मंच की बत्तियों में से एक है?",
    "The lamps are 2, 3, 5 and 10; none of them tests 4.": "बत्तियाँ 2, 3, 5 और 10 की हैं; कोई भी 4 को नहीं जाँचती।",
    "Nothing is known about 4, because no lamp tests it.": "4 के बारे में कुछ पता नहीं, क्योंकि कोई बत्ती उसे नहीं जाँचती।",
    "A number ends in 0 and its digits add to 12; tap each lamp it passes.": "संख्या 0 पर ख़त्म है और अंकों का योग 12 है; पास वाली हर बत्ती छुओ।",
    "Which tests does it pass?": "कौन सी जाँचें पास हैं?",
    "What does each lamp look at, the last digit or the total?": "हर बत्ती क्या देखती है, आख़िरी अंक या योग?",
    "Three of the lamps look only at the last digit.": "तीन बत्तियाँ सिर्फ़ आख़िरी अंक देखती हैं।",
    "The lamp for 3 looks at the total of all the digits.": "3 की बत्ती सारे अंकों का योग देखती है।",
    "All four pass, because it ends in 0 and its digits add to 12.": "चारों पास हैं, क्योंकि यह 0 पर ख़त्म होती है और अंकों का योग 12 है।",
    "7,005 divides by 3, so a child says it divides by 6; what did the test prove?": "7,005, 3 से विभाज्य है, तो बच्चा कहता है 6 से भी; जाँच ने क्या बताया?",
    "What did the test prove?": "जाँच ने क्या बताया?",
    "Which lamp did she run?": "उसने कौन सी बत्ती चलाई?",
    "Is there a lamp for 6 on the stage?": "क्या मंच पर 6 की कोई बत्ती है?",
    "Each lamp speaks only for the number written on it.": "हर बत्ती सिर्फ़ अपने ऊपर लिखी संख्या के बारे में बोलती है।",
    "The test for 3 proved 3, nothing about 6.": "3 की जाँच ने सिर्फ़ 3 साबित किया, 6 के बारे में कुछ नहीं।",
    "yes": "हाँ",
    "no": "नहीं",
    "not known": "पता नहीं",
    "by 3": "3 से",
    "by 3 and 6": "3 और 6 से",
    "Testing for the right number of people": "सही लोगों की गिनती से जाँच",
    "Count everyone who is sharing. Have you counted the one handing them out?": "बाँटने वाले सभी को गिनो। क्या बाँटने वाले को भी गिना?",
    "Tap Count to count the friends at the party.": "गिनो दबाओ और पार्टी के दोस्तों को गिनो।",
    "Tap the Count key at the bottom of the picture.": "तस्वीर के नीचे की गिनो कुंजी दबाओ।",
    "Now tick the box for the one handing them out.": "अब बाँटने वाले का डिब्बा टिक करो।",
    "The empty box is under the last figure.": "ख़ाली डिब्बा आख़िरी आकृति के नीचे है।",
    "Count the figures one at a time.": "आकृतियाँ एक-एक करके गिनो।",
    "Tick the box, then share by the new count.": "डिब्बा टिक करो, फिर नई गिनती से बाँटो।",
    "Count everyone who is sharing before you choose a divisor.": "भाजक चुनने से पहले बाँटने वाले सभी को गिनो।",
    "You learned: the person handing things out is sharing as well.": "तुमने सीखा: बाँटने वाला भी हिस्सा लेता है।",
    "A boy asks 4 friends and has 35 laddoos; how many share, and what is left?": "लड़के के पास 35 लड्डू हैं, 4 दोस्त आए; कितने बाँटेंगे, कितने बचेंगे?",
    "How many share? How many left?": "कितने बाँटें? कितने बचे?",
    "Who else takes a share besides the friends?": "दोस्तों के अलावा और कौन हिस्सा लेता है?",
    "Is anybody sharing who has not been counted yet?": "क्या कोई बाँटने वाला अभी गिनना बाक़ी है?",
    "Count the boy in with his friends, then share 35 by that many.": "लड़के को दोस्तों के साथ गिनो, फिर 35 को उतने में बाँटो।",
    "The boy shares too, so 5 share and none are left.": "लड़का भी बाँटता है, इसलिए 5 बाँटते हैं और कुछ नहीं बचता।",
    "Count who shares and the sweets left over: a girl hands 50 to 5 friends.": "गिनो कौन बाँटता है और कितनी मिठाई बचती है: लड़की 5 दोस्तों को 50 देती है।",
    "Is the girl in your count, or only her friends?": "क्या लड़की तुम्हारी गिनती में है, या सिर्फ़ उसके दोस्त?",
    "Who is giving out the sweets, and is she sharing too?": "मिठाई कौन बाँट रही है, और क्या वह भी हिस्सा ले रही है?",
    "Put her with her 5 friends, and share the 50 among them all.": "उसे उसके 5 दोस्तों के साथ रखो और 50 को सबमें बाँटो।",
    "With the girl that is 6 sharing, and 2 sweets are left over.": "लड़की को मिलाकर 6 बाँटते हैं, और 2 मिठाइयाँ बच जाती हैं।",
    "A cook gives out 70 rolls to 7 friends; how many share, how many left over?": "रसोइया 7 दोस्तों को 70 रोल देता है; कितने बाँटते हैं, कितने बचे?",
    "Who is carrying the rolls?": "रोल कौन उठाए हुए है?",
    "Is the cook sharing the rolls as well?": "क्या रसोइया भी रोल बाँटकर लेता है?",
    "The cook sits at the table too, so share 70 among everyone there.": "रसोइया भी मेज़ पर बैठा है, इसलिए 70 को वहाँ सबमें बाँटो।",
    "The cook shares too, so 8 share and 6 rolls are left over.": "रसोइया भी लेता है, इसलिए 8 बाँटते हैं और 6 रोल बच जाते हैं।",
    "sharing": "बाँटने वाले",
    "left over": "बचे",
    "ones": "इकाई",
    "tens": "दहाई",
    "H": "सै",
    "Th": "ह",
    "TTh": "दह",
    "ends in": "अंत में",
    "total": "योग",
    "not taught": "सिखाया नहीं",
    "hands out": "बाँटता है",
    "Count": "गिनो",
    "ends in 0": "अंत में 0",
    "adds to 12": "योग 12",
    "Lamp": "बत्ती",
    "Card": "कार्ड",
    "Cell": "खाना",
    "Dark slot": "काली जगह",
    "Tick": "टिक",
    "{r} left": "{r} बचे",
    "{n} sharing": "{n} बाँटने वाले",
    "total {t}": "योग {t}",
    "laddoos": "लड्डू",
    "sweets": "मिठाइयाँ",
    "rolls": "रोल",
  },
  gu: {
    "Digit Tester": "અંક ચકાસક",
    "A number laid out, one digit to a cell, and four lamps underneath it.": "એક સંખ્યા, દરેક ખાનામાં એક અંક, અને નીચે ચાર બત્તીઓ.",
    "Free play. Tap a cell to change its digit, then press any lamp to test the number.": "મુક્ત રમત. ખાનાને અડીને અંક બદલો, પછી કોઈ પણ બત્તી દબાવીને સંખ્યા ચકાસો.",
    "Can you tell what divides a number without dividing it?": "શું તમે ભાગ કર્યા વિના કહી શકો કે સંખ્યા કોનાથી ભાગાય છે?",
    "Reading the last digit": "છેલ્લો અંક વાંચવો",
    "Cover everything but the end. Can you still answer? Which digit did it?": "છેલ્લા સિવાય બધું ઢાંકી દો. શું તોય જવાબ આપી શકો? કયા અંકે કહ્યું?",
    "Tap the lamp for 2 to cover all but the last digit.": "2 ની બત્તી દબાવો, છેલ્લા અંક સિવાય બધું ઢંકાઈ જશે.",
    "Tap the lamp marked 2.": "2 લખેલી બત્તી દબાવો.",
    "Now tap the one digit that is still showing.": "હવે જે એક અંક દેખાય છે તેને અડો.",
    "It is the cell at the far right.": "આ સૌથી જમણી બાજુનું ખાનું છે.",
    "Look at the last cell only.": "ફક્ત છેલ્લું ખાનું જુઓ.",
    "Does that last digit pass this lamp's test?": "શું તે અંક આ બત્તીની ચકાસણી પાસ કરે છે?",
    "The ones digit alone settles the tests for 2, 5 and 10.": "2, 5 અને 10 ની ચકાસણી ફક્ત એકમના અંકથી થઈ જાય છે.",
    "You learned: only the last digit matters for 2, 5 and 10.": "તમે શીખ્યા: 2, 5 અને 10 માટે ફક્ત છેલ્લો અંક મહત્ત્વનો છે.",
    "Is 4,386 divisible by 2, judging by its end alone?": "શું 4,386 ને ફક્ત અંત જોઈને 2 થી ભાગી શકાય?",
    "Divisible by 2?": "2 થી ભાગી શકાય?",
    "Which cell is the ones?": "એકમવાળું ખાનું કયું છે?",
    "What digit is standing in that cell?": "તે ખાનામાં કયો અંક છે?",
    "A number divisible by 2 ends in 0, 2, 4, 6 or 8; does this one?": "2 થી ભાગ્ય સંખ્યા 0, 2, 4, 6 કે 8 પર પૂરી થાય; શું આ?",
    "Yes, it ends in 6, so 4,386 divides by 2.": "હા, તે 6 પર પૂરી થાય છે, તેથી 4,386 ને 2 થી ભાગી શકાય.",
    "Is 7,314 divisible by 5?": "શું 7,314 ને 5 થી ભાગી શકાય?",
    "Divisible by 5?": "5 થી ભાગી શકાય?",
    "Cover the rest; what is left to read?": "બાકીનું ઢાંકો; વાંચવા શું બચ્યું?",
    "Which endings can a number divisible by 5 have?": "5 થી ભાગ્ય સંખ્યા કયા અંકે પૂરી થઈ શકે?",
    "Such numbers end in 0 or 5; compare that with 7,314.": "આવી સંખ્યાઓ 0 કે 5 પર પૂરી થાય; 7,314 સાથે સરખાવો.",
    "No, it ends in 4, not 0 or 5, so 5 does not divide 7,314 evenly.": "ના, તે 4 પર પૂરી થાય છે, 0 કે 5 પર નહીં, તેથી 7,314 ને 5 થી પૂરેપૂરું ભાગી શકાય નહીં.",
    "Does 10 divide 6,470?": "શું 6,470 ને 10 થી ભાગી શકાય?",
    "Divisible by 10?": "10 થી ભાગી શકાય?",
    "What must a number divisible by 10 end in?": "10 થી ભાગ્ય સંખ્યા કયા અંકે પૂરી થાય?",
    "Look at 10, 20, 30 and 40: what do they share?": "10, 20, 30 અને 40 જુઓ: તેમાં શું સરખું છે?",
    "They all end in 0; does 6,470 end that way too?": "બધી 0 પર પૂરી થાય; શું 6,470 પણ એમ જ?",
    "Yes, 6,470 ends in 0, so it is a multiple of 10.": "હા, 6,470 ના અંતે 0 છે, તેથી તે 10 નો ગુણિત છે.",
    "Adding every digit for three": "ત્રણની ચકાસણી માટે દરેક અંક ઉમેરવો",
    "Take every card down, even the empty looking ones. Leave none out.": "દરેક કાર્ડ નીચે લાવો, ખાલી લાગતા પણ. કોઈ રહી ન જાય.",
    "Tap the first card to bring it down onto the rail.": "પહેલા કાર્ડને અડો, તે પટ્ટી પર આવી જશે.",
    "Tap the card at the far left end of the row.": "હરોળના સૌથી ડાબા છેડાનું કાર્ડ અડો.",
    "Now bring the zero card down as well.": "હવે શૂન્યવાળું કાર્ડ પણ નીચે લાવો.",
    "The zero is a card too.": "શૂન્ય પણ એક કાર્ડ છે.",
    "Bring the last card down to close the rail.": "છેલ્લું કાર્ડ નીચે લાવો, પટ્ટી બંધ થઈ જશે.",
    "One card is still up there.": "એક કાર્ડ હજી ઉપર છે.",
    "How many cards does this number have altogether?": "આ સંખ્યાના કુલ કેટલા કાર્ડ છે?",
    "Add the cards one at a time, and count each zero as a card.": "કાર્ડ એક-એક કરીને ઉમેરો, દરેક શૂન્યને પણ કાર્ડ ગણો.",
    "Every digit goes into the total for 3, zeros too.": "3 ની ચકાસણીમાં દરેક અંક સરવાળામાં જાય છે, શૂન્ય પણ.",
    "You learned: add every digit, zeros too, then test the total.": "તમે શીખ્યા: દરેક અંક ઉમેરો, શૂન્ય પણ, પછી સરવાળો ચકાસો.",
    "Bring every card of 40,608 down onto the rail, then type their total.": "40,608 ના દરેક કાર્ડને પટ્ટી પર લાવો, પછી તેમનો સરવાળો લખો.",
    "Tap the lamps that light for this number first.": "પહેલા તે બત્તીઓ અડો જે આ સંખ્યા માટે પ્રગટે છે.",
    "Digit total?": "અંકોનો સરવાળો?",
    "Did every card on the rail go into your total?": "શું પટ્ટીનું દરેક કાર્ડ તમારા સરવાળામાં આવ્યું?",
    "How many cards are on the rail altogether?": "પટ્ટી પર કુલ કેટલા કાર્ડ છે?",
    "Add them left to right, and count each zero as a card that adds nothing.": "ડાબેથી જમણે ઉમેરો; દરેક શૂન્ય એવું કાર્ડ છે જે કંઈ ઉમેરતું નથી.",
    "The total is 18, and 3 goes into 18, so 3 divides 40,608.": "સરવાળો 18 છે અને 18 માં 3 સમાય છે, તેથી 3 થી 40,608 ભાગી શકાય.",
    "Now type the total of all the digits of 3,105.": "હવે 3,105 ના બધા અંકોનો સરવાળો લખો.",
    "Point at each card on the rail as you add it.": "ઉમેરતી વખતે પટ્ટીના દરેક કાર્ડ પર આંગળી મૂકો.",
    "Is any card on the rail missing from your total?": "શું પટ્ટીનું કોઈ કાર્ડ તમારા સરવાળામાંથી રહી ગયું?",
    "Add 3, 1, 0 and 5 one at a time, the zero too.": "3, 1, 0 અને 5 એક-એક કરીને ઉમેરો, શૂન્ય પણ.",
    "3,105 adds to 9, and 9 is in the 3 times table, so 3 divides 3,105.": "3,105 નો સરવાળો 9 છે, જે 3 ના ઘડિયામાં આવે છે, તેથી 3 થી 3,105 ભાગી શકાય.",
    "Use the rail to decide whether 3 divides 50,073.": "પટ્ટીની મદદથી નક્કી કરો કે 50,073 ને 3 થી ભાગી શકાય કે નહીં.",
    "Does 3 divide 50,073?": "શું 50,073 ને 3 થી ભાગી શકાય?",
    "Does 3 go into the total on the rail exactly?": "શું પટ્ટીનો સરવાળો 3 થી બરાબર ભાગાય છે?",
    "Read the total the rail wrote; is it in the 3 times table?": "પટ્ટીએ લખેલો સરવાળો વાંચો; શું તે 3 ના ઘડિયામાં છે?",
    "Count in threes, past the total, and see whether it comes up.": "ત્રણ-ત્રણ ગણો, સરવાળાથી આગળ સુધી; જુઓ તે આવે છે કે નહીં.",
    "Yes, 50,073 adds to 15, and 15 is five threes.": "હા, 50,073 નો સરવાળો 15 છે અને 15 માં 3 પૂરા પાંચ વાર આવે છે.",
    "What the tests do not cover": "ચકાસણી શું નથી કહેતી",
    "It passed every test here. Now tell me about four. Can you?": "તે અહીંની દરેક ચકાસણીમાં પાસ થઈ. હવે ચાર વિશે કહો. કહી શકશો?",
    "Tap the dark slot to ask the number about 8.": "કાળી જગ્યાને અડો અને સંખ્યાને 8 વિશે પૂછો.",
    "Tap the slot beside the four lamps.": "ચારેય બત્તીની બાજુની જગ્યા અડો.",
    "Is the number you are asked about one of the lamps?": "જે સંખ્યા વિશે પૂછ્યું છે તે શું કોઈ બત્તી પર છે?",
    "Count the lamps, then look for one marked with that number.": "બત્તીઓ ગણો, પછી તે સંખ્યાવાળી બત્તી શોધો.",
    "A test answers only for the number it was run for.": "દરેક ચકાસણી ફક્ત તે જ સંખ્યા વિશે કહે છે જેની તે હોય.",
    "You learned: a test answers only for the number on its lamp.": "તમે શીખ્યા: ચકાસણી ફક્ત પોતાની બત્તીની સંખ્યા વિશે કહે છે.",
    "A number passes the tests for 2, 3, 5 and 10; does it divide by 4?": "એક સંખ્યા 2, 3, 5 અને 10 ની ચકાસણીમાં પાસ છે; શું તેને 4 થી ભાગી શકાય?",
    "Does it divide by 4?": "શું 4 થી ભાગી શકાય?",
    "Which tests has this chapter taught you?": "આ પ્રકરણે કઈ ચકાસણી શીખવી?",
    "Is 4 one of the lamps on the stage?": "શું 4 મંચ પરની બત્તીઓમાંની એક છે?",
    "The lamps are 2, 3, 5 and 10; none of them tests 4.": "બત્તીઓ 2, 3, 5 અને 10 ની છે; કોઈ 4 ને ચકાસતી નથી.",
    "Nothing is known about 4, because no lamp tests it.": "4 વિશે કંઈ ખબર નથી, કારણ કે કોઈ બત્તી તેને ચકાસતી નથી.",
    "A number ends in 0 and its digits add to 12; tap each lamp it passes.": "સંખ્યા 0 પર પૂરી થાય છે અને અંકોનો સરવાળો 12 છે; પાસ થતી દરેક બત્તી અડો.",
    "Which tests does it pass?": "કઈ ચકાસણી પાસ છે?",
    "What does each lamp look at, the last digit or the total?": "દરેક બત્તી શું જુએ છે, છેલ્લો અંક કે સરવાળો?",
    "Three of the lamps look only at the last digit.": "ત્રણ બત્તીઓ ફક્ત છેલ્લો અંક જુએ છે.",
    "The lamp for 3 looks at the total of all the digits.": "3 ની બત્તી બધા અંકોનો સરવાળો જુએ છે.",
    "All four pass, because it ends in 0 and its digits add to 12.": "ચારેય પાસ છે, કારણ કે તે 0 પર પૂરી થાય છે અને અંકોનો સરવાળો 12 છે.",
    "7,005 divides by 3, so a child says it divides by 6; what did the test prove?": "7,005 ને 3 થી ભાગી શકાય, તેથી બાળક કહે છે 6 થી પણ; ચકાસણીએ શું બતાવ્યું?",
    "What did the test prove?": "ચકાસણીએ શું બતાવ્યું?",
    "Which lamp did she run?": "તેણે કઈ બત્તી ચલાવી?",
    "Is there a lamp for 6 on the stage?": "શું મંચ પર 6 ની કોઈ બત્તી છે?",
    "Each lamp speaks only for the number written on it.": "દરેક બત્તી ફક્ત પોતાના પર લખેલી સંખ્યા વિશે બોલે છે.",
    "The test for 3 proved 3, nothing about 6.": "3 ની ચકાસણીએ ફક્ત 3 સાબિત કર્યું, 6 વિશે કંઈ નહીં.",
    "yes": "હા",
    "no": "ના",
    "not known": "ખબર નથી",
    "by 3": "3 થી",
    "by 3 and 6": "3 અને 6 થી",
    "Testing for the right number of people": "સાચા લોકોની ગણતરીથી ચકાસણી",
    "Count everyone who is sharing. Have you counted the one handing them out?": "વહેંચનાર બધાને ગણો. શું વહેંચનારને પણ ગણ્યો?",
    "Tap Count to count the friends at the party.": "ગણો દબાવો અને પાર્ટીના મિત્રોને ગણો.",
    "Tap the Count key at the bottom of the picture.": "ચિત્રની નીચેની ગણો કી દબાવો.",
    "Now tick the box for the one handing them out.": "હવે વહેંચનારનું ખાનું ટિક કરો.",
    "The empty box is under the last figure.": "ખાલી ખાનું છેલ્લી આકૃતિ નીચે છે.",
    "Count the figures one at a time.": "આકૃતિઓ એક-એક કરીને ગણો.",
    "Tick the box, then share by the new count.": "ખાનું ટિક કરો, પછી નવી ગણતરીથી વહેંચો.",
    "Count everyone who is sharing before you choose a divisor.": "ભાજક પસંદ કરતા પહેલાં વહેંચનાર બધાને ગણો.",
    "You learned: the person handing things out is sharing as well.": "તમે શીખ્યા: વહેંચનાર પણ ભાગ લે છે.",
    "A boy asks 4 friends and has 35 laddoos; how many share, and what is left?": "છોકરા પાસે 35 લાડુ છે, 4 મિત્રો આવ્યા; કેટલા વહેંચશે, કેટલા બચશે?",
    "How many share? How many left?": "કેટલા વહેંચે? કેટલા બાકી?",
    "Who else takes a share besides the friends?": "મિત્રો ઉપરાંત બીજું કોણ ભાગ લે છે?",
    "Is anybody sharing who has not been counted yet?": "શું કોઈ વહેંચનાર હજી ગણવાનો બાકી છે?",
    "Count the boy in with his friends, then share 35 by that many.": "છોકરાને મિત્રો સાથે ગણો, પછી 35 ને તેટલામાં વહેંચો.",
    "The boy shares too, so 5 share and none are left.": "છોકરો પણ વહેંચે છે, તેથી 5 વહેંચે છે અને કંઈ બચતું નથી.",
    "Count who shares and the sweets left over: a girl hands 50 to 5 friends.": "ગણો કોણ વહેંચે છે અને કેટલી મીઠાઈ બાકી રહે છે: છોકરી 5 મિત્રોને 50 આપે છે.",
    "Is the girl in your count, or only her friends?": "શું છોકરી તમારી ગણતરીમાં છે, કે ફક્ત તેના મિત્રો?",
    "Who is giving out the sweets, and is she sharing too?": "મીઠાઈ કોણ વહેંચે છે, અને શું તે પણ ભાગ લે છે?",
    "Put her with her 5 friends, and share the 50 among them all.": "તેને તેના 5 મિત્રો સાથે મૂકો અને 50 ને બધામાં વહેંચો.",
    "With the girl that is 6 sharing, and 2 sweets are left over.": "છોકરીને ગણતાં 6 વહેંચે છે, અને 2 મીઠાઈ બાકી રહે છે.",
    "A cook gives out 70 rolls to 7 friends; how many share, how many left over?": "રસોઈયો 7 મિત્રોને 70 રોલ આપે છે; કેટલા વહેંચે, કેટલા બાકી?",
    "Who is carrying the rolls?": "રોલ કોણ ઉપાડીને ચાલે છે?",
    "Is the cook sharing the rolls as well?": "શું રસોઈયો પણ રોલ લે છે?",
    "The cook sits at the table too, so share 70 among everyone there.": "રસોઈયો પણ ટેબલ પર બેઠો છે, તેથી 70 ને ત્યાં બધામાં વહેંચો.",
    "The cook shares too, so 8 share and 6 rolls are left over.": "રસોઈયો પણ લે છે, તેથી 8 વહેંચે છે અને 6 રોલ બાકી રહે છે.",
    "sharing": "વહેંચનાર",
    "left over": "બાકી",
    "ones": "એકમ",
    "tens": "દશક",
    "H": "શ",
    "Th": "હ",
    "TTh": "દહ",
    "ends in": "અંતે",
    "total": "સરવાળો",
    "not taught": "શીખવ્યું નથી",
    "hands out": "વહેંચે છે",
    "Count": "ગણો",
    "ends in 0": "અંતે 0",
    "adds to 12": "સરવાળો 12",
    "Lamp": "બત્તી",
    "Card": "કાર્ડ",
    "Cell": "ખાનું",
    "Dark slot": "કાળી જગ્યા",
    "Tick": "ટિક",
    "{r} left": "{r} બાકી",
    "{n} sharing": "{n} વહેંચનાર",
    "total {t}": "સરવાળો {t}",
    "laddoos": "લાડુ",
    "sweets": "મીઠાઈ",
    "rolls": "રોલ",
  },
};

/* One entry per phase = one mount. Items carry what the working area draws:
   verdict  num, d      (a yes / no test for 2, 5 or 10 from the ones cell)
   total    num         (every card down onto the rail; the digit total is typed)
   three    num         (every card down; the verdict for the lamp of 3 is picked)
   mystery  d           (a number that passed all four lamps; what is known about d?)
   list     ones, sum   (the lamps the child marks for a number known only by its clues)
   proof    num, d      (what did the test for 3 prove?)
   share    friends, things, host, thing (count everyone sharing, then what is left over)
   `warm` is the number the guide steps work on (never a question's own number); `win` is the one-sentence win line.
   Departures from the plan: P1 practice 5 (two numbers at once) is left out and P4 gets one authored item, because a phase
   has exactly three questions; P2 asks the digit TOTAL for two items, so a skipped zero changes the answer. */
const PHASES = [
  {
    n: 1,
    concept: "Reading the last digit",
    conceptId: "M2.S4.T7.C30", objectiveIds: ["O11"],
    says: ["Cover everything but the end. Can you still answer? Which digit did it?"],
    /* the warm-up number is plan practice 5's 2,946 (the best catcher of reading the first digit); it is no question's own number */
    warm: { kind: "verdict", num: 2946, d: 2 },
    steps: [
      { say: "Tap the lamp for 2 to cover all but the last digit.", on: "lamp-2", hint: "Tap the lamp marked 2." },
      { say: "Now tap the one digit that is still showing.", on: "ones", hint: "It is the cell at the far right." },
    ],
    ladder: ["Look at the last cell only.", "Does that last digit pass this lamp's test?"],
    closing: "The ones digit alone settles the tests for 2, 5 and 10.",
    learned: "You learned: only the last digit matters for 2, 5 and 10.",
    traceback: "The shutter covers all but the ones cell, the cells are named from the right, the ones digit is laid against the digits that pass, the lamp gives its verdict and the number is divided out on a board.",
    items: [
      /* learn ML1: answer in the plan = Yes, because its ones digit is 6 */
      { qid: "M2.S4.T7.C30:ML1", kind: "verdict", num: 4386, d: 2, answer: "yes", choices: DT_YESNO, winMs: 3000, ask: "Divisible by 2?",
        say: "Is 4,386 divisible by 2, judging by its end alone?", miss: "Which cell is the ones?",
        ladder: ["What digit is standing in that cell?", "A number divisible by 2 ends in 0, 2, 4, 6 or 8; does this one?"],
        win: "Yes, it ends in 6, so 4,386 divides by 2." },
      /* practice 1: answer in the plan = No. Its ones digit is 4, and a number divisible by 5 ends in 5 or 0 */
      { qid: "M2.S4.T7.C30:1", kind: "verdict", num: 7314, d: 5, answer: "no", choices: DT_YESNO, winMs: 3000, ask: "Divisible by 5?",
        say: "Is 7,314 divisible by 5?", miss: "Cover the rest; what is left to read?",
        ladder: ["Which endings can a number divisible by 5 have?", "Such numbers end in 0 or 5; compare that with 7,314."],
        win: "No, it ends in 4, not 0 or 5, so 5 does not divide 7,314 evenly." },
      /* practice 2: answer in the plan = Yes. Its ones digit is 0, and 6470 divided by 10 is 647 */
      { qid: "M2.S4.T7.C30:2", kind: "verdict", num: 6470, d: 10, answer: "yes", choices: DT_YESNO, winMs: 3000, ask: "Divisible by 10?",
        say: "Does 10 divide 6,470?", miss: "What must a number divisible by 10 end in?",
        ladder: ["Look at 10, 20, 30 and 40: what do they share?", "They all end in 0; does 6,470 end that way too?"],
        win: "Yes, 6,470 ends in 0, so it is a multiple of 10." },
      /* practice 5 (2,946 and 2,945 together) is left out as a question (a phase has exactly three); 2,946 is the warm-up number above */
    ],
  },
  {
    n: 2,
    concept: "Adding every digit for three",
    conceptId: "M2.S4.T7.C31", objectiveIds: ["O11"],
    says: ["Take every card down, even the empty looking ones. Leave none out."],
    warm: { kind: "three", num: 302 },
    steps: [
      { say: "Tap the first card to bring it down onto the rail.", on: "cell-0", hint: "Tap the card at the far left end of the row." },
      { say: "Now bring the zero card down as well.", on: "cell-1", hint: "The zero is a card too." },
      { say: "Bring the last card down to close the rail.", on: "cell-2", hint: "One card is still up there." },
    ],
    ladder: ["How many cards does this number have altogether?", "Add the cards one at a time, and count each zero as a card."],
    closing: "Every digit goes into the total for 3, zeros too.",
    learned: "You learned: add every digit, zeros too, then test the total.",
    traceback: "Every card still up is lit and brought down onto the rail in order, zeros included; the rail closes, the total is written and runs through the lamp for 3.",
    items: [
      /* learn ML2: answer in the plan = Yes, because the digits add to 18 and 3 divides 18 (asked: the digit total) */
      { qid: "M2.S4.T7.C31:ML2", kind: "total", num: 40608, answer: 18, winMs: 3200, ask: "Digit total?",
        say: "Bring every card of 40,608 down onto the rail, then type their total.", miss: "Did every card on the rail go into your total?",
        ladder: ["How many cards are on the rail altogether?", "Add them left to right, and count each zero as a card that adds nothing."],
        win: "The total is 18, and 3 goes into 18, so 3 divides 40,608." },
      /* practice 3: answer in the plan = The digits add to 9, so yes; 3105 divided by 3 is 1035 (asked: the digit total) */
      { qid: "M2.S4.T7.C31:3", kind: "total", num: 3105, answer: 9, winMs: 3200, ask: "Digit total?",
        say: "Now type the total of all the digits of 3,105.", miss: "Point at each card on the rail as you add it.",
        ladder: ["Is any card on the rail missing from your total?", "Add 3, 1, 0 and 5 one at a time, the zero too."],
        win: "3,105 adds to 9, and 9 is in the 3 times table, so 3 divides 3,105." },
      /* practice 4: answer in the plan = Yes. Every digit counts, so 5 and 0 and 0 and 7 and 3 add to 15, which 3 divides (asked as the verdict) */
      { qid: "M2.S4.T7.C31:4", kind: "three", num: 50073, answer: "yes", choices: DT_YESNO, winMs: 3200, ask: "Does 3 divide 50,073?",
        say: "Use the rail to decide whether 3 divides 50,073.", miss: "Does 3 go into the total on the rail exactly?",
        ladder: ["Read the total the rail wrote; is it in the 3 times table?", "Count in threes, past the total, and see whether it comes up."],
        win: "Yes, 50,073 adds to 15, and 15 is five threes." },
    ],
  },
  {
    n: 3,
    concept: "What the tests do not cover",
    conceptId: "M2.S4.T7.C32", objectiveIds: ["O12"],
    says: ["It passed every test here. Now tell me about four. Can you?"],
    warm: { kind: "mystery", d: 8 },
    steps: [
      { say: "Tap the dark slot to ask the number about 8.", on: "fifth", hint: "Tap the slot beside the four lamps." },
    ],
    ladder: ["Is the number you are asked about one of the lamps?", "Count the lamps, then look for one marked with that number."],
    closing: "A test answers only for the number it was run for.",
    learned: "You learned: a test answers only for the number on its lamp.",
    traceback: "The dark slot flickers and stays dark; two numbers that pass all four lamps are divided by four side by side; each lamp is run on the clues; or 7,005 is divided by six and the lamp for two stays out.",
    items: [
      /* learn ML3: answer in the plan = Nothing at all */
      { qid: "M2.S4.T7.C32:ML3", kind: "mystery", d: 4, answer: "not known", choices: DT_KNOWN, winMs: 3000, ask: "Does it divide by 4?",
        say: "A number passes the tests for 2, 3, 5 and 10; does it divide by 4?", miss: "Which tests has this chapter taught you?",
        ladder: ["Is 4 one of the lamps on the stage?", "The lamps are 2, 3, 5 and 10; none of them tests 4."],
        win: "Nothing is known about 4, because no lamp tests it." },
      /* practice 6: answer in the plan = All four: by 2, by 5 and by 10 from its ones digit, and by 3 because 3 divides 12 */
      { qid: "M2.S4.T7.C32:6", kind: "list", ones: 0, sum: 12, answer: [2, 3, 5, 10], pad: "enter", winMs: 3200, ask: "Which tests does it pass?",
        say: "A number ends in 0 and its digits add to 12; tap each lamp it passes.", miss: "What does each lamp look at, the last digit or the total?",
        ladder: ["Three of the lamps look only at the last digit.", "The lamp for 3 looks at the total of all the digits."],
        win: "All four pass, because it ends in 0 and its digits add to 12." },
      /* practice 7: answer in the plan = The chapter has no test for 6, and 7005 does not divide by 6 at all, because it is odd. Asked as what the test proved */
      { qid: "M2.S4.T7.C32:7", kind: "proof", num: 7005, d: 6, answer: "by 3", choices: DT_PROVED, winMs: 3200, ask: "What did the test prove?",
        say: "7,005 divides by 3, so a child says it divides by 6; what did the test prove?", miss: "Which lamp did she run?",
        ladder: ["Is there a lamp for 6 on the stage?", "Each lamp speaks only for the number written on it."],
        win: "The test for 3 proved 3, nothing about 6." },
    ],
  },
  {
    n: 4,
    concept: "Testing for the right number of people",
    conceptId: "M2.S4.T7.C33", objectiveIds: ["O12"],
    says: ["Count everyone who is sharing. Have you counted the one handing them out?"],
    warm: { kind: "share", friends: 3, things: 20, thing: "sweets" },
    steps: [
      { say: "Tap Count to count the friends at the party.", on: "count", hint: "Tap the Count key at the bottom of the picture." },
      { say: "Now tick the box for the one handing them out.", on: "tick-host", hint: "The empty box is under the last figure." },
    ],
    ladder: ["Count the figures one at a time.", "Tick the box, then share by the new count."],
    closing: "Count everyone who is sharing before you choose a divisor.",
    learned: "You learned: the person handing things out is sharing as well.",
    traceback: "The friends alone share first, then the one handing out is ticked in and the true count shares out on a second board, the rest on its shelf.",
    items: [
      /* learn ML4: answer in the plan = Five people are sharing, counting the boy, and none will be left */
      { qid: "M2.S4.T7.C33:ML4", kind: "share", friends: 4, things: 35, host: "boy", thing: "laddoos", answer: [5, 0], parts: DT_SHARE, winMs: 3600, ask: DT_ASK_SHARE,
        say: "A boy asks 4 friends and has 35 laddoos; how many share, and what is left?", miss: "Who else takes a share besides the friends?",
        ladder: ["Is anybody sharing who has not been counted yet?", "Count the boy in with his friends, then share 35 by that many."],
        win: "The boy shares too, so 5 share and none are left." },
      /* authored (the plan gives this phase two questions): the book's own example, fifty shared by five friends and the girl */
      { qid: null, kind: "share", friends: 5, things: 50, host: "girl", thing: "sweets", answer: [6, 2], parts: DT_SHARE, winMs: 3600, ask: DT_ASK_SHARE,
        say: "Count who shares and the sweets left over: a girl hands 50 to 5 friends.", miss: "Is the girl in your count, or only her friends?",
        ladder: ["Who is giving out the sweets, and is she sharing too?", "Put her with her 5 friends, and share the 50 among them all."],
        win: "With the girl that is 6 sharing, and 2 sweets are left over." },
      /* practice 8: answer in the plan = Himself. With him there are 8 sharing, and 70 divided by 8 is 8 with 6 left over */
      { qid: "M2.S4.T7.C33:8", kind: "share", friends: 7, things: 70, host: "cook", thing: "rolls", answer: [8, 6], parts: DT_SHARE, winMs: 3600, ask: DT_ASK_SHARE,
        say: "A cook gives out 70 rolls to 7 friends; how many share, how many left over?", miss: "Who is carrying the rolls?",
        ladder: ["Is the cook sharing the rolls as well?", "The cook sits at the table too, so share 70 among everyone there."],
        win: "The cook shares too, so 8 share and 6 rolls are left over." },
    ],
  },
];

/* ── geometry and the picture's own rules (content coordinates: 860 wide, centred in the working area) ───────── */
const DT = { cw: 128, ch: 156, gap: 14, cgap: 34, lw: 150, lh: 132, lgap: 18, fw: 190, wc: 860 };
const DT_TESTS = [2, 3, 5, 10];
const DT_ENDS: Record<number, number[]> = { 2: [0, 2, 4, 6, 8], 5: [0, 5], 10: [0] };
const DT_PLACE = ["ones", "tens", "H", "Th", "TTh"];
const DT_FIFTH = [4, 6, 8, 9];
/* two numbers that pass all four lamps: one divides by 4, one leaves 2 (why "not known" is the truth) */
const DT_PAIR = [1020, 1050];
const DT_BLUE = CONTENT.hundred, DT_AMBER = CONTENT.ten, DT_VERM = CONTENT.pointer, DT_SKY = "#56B4E9";
const dtInk = (c: string) => shade(c, 0.25);
const dtSkyInk = shade(DT_SKY, 0.5);
const dtDigits = (v: number) => String(v).split("").map(Number);
const dtSum = (v: number) => dtDigits(v).reduce((a, b) => a + b, 0);
/* the picture's test: the ones digit for 2, 5 and 10; the digit total for 3 */
const dtPasses = (v: number, d: number) => (d === 3 ? dtSum(v) % 3 === 0 : DT_ENDS[d].includes(v % 10));
/* a label with a number in it goes through the TR table: tx("{r} left") -> "{r} बचे", then the number put in */
const dtFill = (tx: any, key: string, vals: any) => Object.keys(vals).reduce((s: string, k) => s.split("{" + k + "}").join(String(vals[k])), String(tx(key)));
/* the cells' left edges, centred at 430; an Indian comma widens the gap it sits in */
const dtRow = (nd: number, commas: boolean) => {
  const gaps: number[] = [];
  let tot = nd * DT.cw;
  for (let i = 0; i < nd - 1; i++) { const g = commas && [3, 5, 7].includes(nd - 1 - i) ? DT.cgap : DT.gap; gaps.push(g); tot += g; }
  const xs: number[] = [];
  let x = 430 - tot / 2;
  for (let i = 0; i < nd; i++) { xs.push(x); x += DT.cw + (gaps[i] || 0); }
  return { xs, gaps, w: tot };
};

const MODEL = {
  cell: { w: DT.cw, h: DT.ch, gap: DT.gap }, lamps: DT_TESTS, notTaught: DT_FIFTH,
  onesDigitsThatPass: DT_ENDS, placeNames: DT_PLACE, notKnownPair: DT_PAIR,
  colours: { divides: DT_BLUE, leftover: DT_VERM, number: DT_AMBER, digitRead: DT_SKY },
};

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* a list answer (the tests a number passes) in any order: "2, 3, 5, 10", [2, 3, 5, 10] */
const dtListOf = (v: any): number[] => (Array.isArray(v) ? v.map(Number) : (String(v ?? "").match(/\d+/g) || []).map(Number));
const dtSameSet = (a: number[], b: number[]) => {
  const x = Array.from(new Set(a)).sort((p, q) => p - q), y = Array.from(new Set(b)).sort((p, q) => p - q);
  return x.length === y.length && x.every((v, k) => v === y[k]);
};

/* judge: is this value right for this item? (numbers compare as numbers; a list in any order) */
const judge = (item: any, v: any) => {
  if (item.parts) return judgeSlotParts(item, v);
  if (item.kind === "list") return dtSameSet(dtListOf(v), item.answer);
  if (typeof item.answer === "number") return leadNumber(v) === item.answer;
  return String(v).trim().toLowerCase() === String(item.answer).trim().toLowerCase();
};
/* oracle: every answer re-derived by long division done digit by digit, and by sharing out one at a time;
   it never looks at a ones digit or a digit total (the picture's route) */
const oracle = () => {
  const rem = (v: number, d: number) => { let r = 0; for (const ch of String(v)) r = (r * 10 + Number(ch)) % d; return r; };
  const divides = (v: number, d: number) => rem(v, d) === 0;
  return PHASES.every((p: any) => p.items.every((it: any) => {
    if (it.kind === "verdict") return it.answer === (divides(it.num, it.d) ? "yes" : "no");
    if (it.kind === "three") return it.answer === (divides(it.num, 3) ? "yes" : "no");
    if (it.kind === "total") { let s = 0, v = it.num; while (v > 0) { s += v % 10; v = Math.floor(v / 10); } return s === it.answer && divides(s, 3) === divides(it.num, 3); }
    if (it.kind === "mystery") {
      const passing: number[] = [];
      for (let v = 1; v <= 300; v++) if (DT_TESTS.every((d) => divides(v, d))) passing.push(v);
      const answers = new Set(passing.map((v) => divides(v, it.d)));
      return it.answer === (answers.size > 1 ? "not known" : answers.has(true) ? "yes" : "no");
    }
    if (it.kind === "list") {
      const sets: string[] = [];
      for (let v = 10; v < 100000; v += 10) {
        let s = 0, t = v; while (t > 0) { s += t % 10; t = Math.floor(t / 10); }
        if (v % 10 === it.ones && s === it.sum) sets.push(DT_TESTS.filter((d) => divides(v, d)).join(","));
      }
      return sets.length > 0 && new Set(sets).size === 1 && sets[0] === it.answer.join(",");
    }
    if (it.kind === "proof") return divides(it.num, 3) && !divides(it.num, it.d) && it.answer === "by 3";
    if (it.kind === "share") {
      const people = it.friends + 1;
      let left = it.things; while (left >= people) left -= people;
      return it.answer[0] === people && it.answer[1] === left;
    }
    return false;
  }));
};
/* the item's misconception, which judge must reject */
const nearMiss = (item: any) => {
  if (item.kind === "verdict") return item.answer === "yes" ? "no" : "yes";   /* digits added, or the first digit read */
  if (item.kind === "total") {
    /* a finger that skips a zero takes the card after it too */
    const ds = dtDigits(item.num), z = ds.indexOf(0);
    const s = dtSum(item.num) - (z >= 0 && z + 1 < ds.length ? ds[z + 1] : 0);
    return s === item.answer ? item.answer + 1 : s;
  }
  if (item.kind === "three") return item.answer === "yes" ? "no" : "yes";     /* stopped at the total, or a card skipped */
  if (item.kind === "mystery") return "yes";          /* passed every lamp, so it must divide by 4 as well */
  if (item.kind === "list") return "2, 5, 10";         /* the three last-digit tests only */
  if (item.kind === "proof") return "by 3 and 6";      /* six is made of two and three */
  if (item.kind === "share") return [item.friends, item.things % item.friends];   /* the host left out */
  return "~";
};
/* the forms of an answer that no question, hint or ladder line may print */
const answerForms = (item: any) => {
  if (item.kind === "total") return [String(item.answer), words(item.answer)];
  if (item.kind === "list") return ["2, 3, 5, 10", "all four"];
  if (item.kind === "share") return [item.answer[0] + " people", item.answer[0] + " sharing", item.answer[1] + " left"];
  if (item.kind === "proof") return ["by 3 only", "proved 3"];   /* "by 3" itself is the given fact in the question */
  return [String(item.answer)];
};
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => (item.kind === "list" ? item.answer.join(", ") : item.answer);

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => {
  if (T.state().stage === "demo") return HOOK.demo && HOOK.demo();
  if (item.kind === "list") { if (HOOK.set) HOOK.set(item.answer); setTimeout(() => HOOK.enter && HOOK.enter(), 40); return; }
  if ((item.kind === "three" || item.kind === "total") && HOOK.check) HOOK.check();   /* every card down first (the gate), then the answer, in one go */
  return T.submit(item.answer);
};
/* the agent's answer() for the list: it marks the lamps as a child would; undefined = type it or pick a key */
const answer = (item: any, v: any) => (item.kind === "list" && HOOK.set ? HOOK.set(dtListOf(v)) : undefined);
/* the agent's check() before Enter: at a rail question it brings every card down (the gate) and returns true;
   undefined = press Enter. In a guide-steps phase (stage "demo") HOOK.check stays unset so check() reaches api.onEnter */
const check = () => (HOOK.check ? HOOK.check() : undefined);

/* ── pieces ───────────────────────────────────────────────────────────────────────────────── */

/* a comma 40 tall: a round head at (x, y) and a tail curling down to the left */
const DtComma = ({ x, y, color }: any) => (
  <path d={`M ${x + 8} ${y} A 8 8 0 1 0 ${x - 2} ${y + 7.7} C ${x} ${y + 14} ${x - 3} ${y + 23} ${x - 10} ${y + 30} C ${x + 3} ${y + 25} ${x + 9} ${y + 14} ${x + 8} ${y} Z`} fill={color} />
);

/* one digit in its own cell; a cell holding a zero is drawn exactly like the rest. null = a cell not yet known ("?") */
function DtCell({ x, y, d, lit, C }: any) {
  return (
    <g>
      <rect x={x} y={y} width={DT.cw} height={DT.ch} rx={18} fill={lit ? tint(DT_SKY, 0.82) : "#FFFFFF"} stroke={lit ? DT_SKY : C.rule} strokeWidth={lit ? 4 : 2.5} filter="url(#fShadowSoft)" />
      <text x={x + DT.cw / 2} y={y + DT.ch / 2 + 32} textAnchor="middle" fontSize={T.display * 1.28} fontWeight={700} fill={lit ? dtSkyInk : d === null ? C.accent : C.ink}>{d === null ? "?" : d}</text>
    </g>
  );
}
/* the place a cell left empty: dashed, the same size */
function DtGap({ x, y, h, C }: any) {
  return <rect x={x} y={y} width={DT.cw} height={h} rx={18} fill="none" stroke={C.rule} strokeWidth={2.5} strokeDasharray="10 8" />;
}
/* a digit card on the rail: the same width as its cell */
function DtCard({ x, y, d, C }: any) {
  return (
    <g>
      <rect x={x} y={y} width={DT.cw} height={92} rx={16} fill="#FFFFFF" stroke={DT_SKY} strokeWidth={4} filter="url(#fShadowSoft)" />
      <text x={x + DT.cw / 2} y={y + 66} textAnchor="middle" fontSize={T.xl * 1.14} fontWeight={700} fill={C.ink}>{d}</text>
    </g>
  );
}

/* a test lamp: the bulb fills blue when the number passes, rings vermilion when it does not (the digit 72, the yes / no under it 32) */
function DtLamp({ x, y, d, w = DT.lw, state, ring, mark, C, tx = (v: any) => v }: any) {
  const pass = state === "pass", fail = state === "fail";
  const edge = ring || mark ? C.accent : pass ? DT_BLUE : C.rule;
  const nx = x + w * 0.66;
  return (
    <g>
      <rect x={x} y={y} width={w} height={DT.lh} rx={20} fill={pass ? tint(DT_BLUE, 0.82) : "#FFFFFF"}
        stroke={fail ? DT_VERM : edge} strokeWidth={ring || mark ? 5 : pass || fail ? 3 : 2.5} filter="url(#fShadowSoft)" />
      <circle cx={x + 25} cy={y + 34} r={12} fill={pass ? "url(#gHundred)" : "#FFFFFF"} stroke={fail ? DT_VERM : pass ? shade(DT_BLUE, 0.2) : C.rule} strokeWidth={fail ? 4 : 2.5} />
      <text x={nx} y={y + 78} textAnchor="middle" fontSize={T.display} fontWeight={700} fill={pass ? dtInk(DT_BLUE) : C.ink}>{d}</text>
      {(pass || fail) && (
        <text x={nx} y={y + 118} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={pass ? dtInk(DT_BLUE) : dtInk(DT_VERM)}>{tx(pass ? "yes" : "no")}</text>
      )}
      {mark && (
        <g>
          <circle cx={x + w - 8} cy={y + 8} r={19} fill={C.accent} stroke="#FFFFFF" strokeWidth={3} />
          <path d={`M ${x + w - 17} ${y + 8} l 6 7 l 12 -13`} fill="none" stroke="#FFFFFF" strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />
        </g>
      )}
    </g>
  );
}
/* the fifth slot: a test this chapter never taught. It can be pressed; it stays dark (its caption is shown only after the answer) */
function DtFifth({ x, y, d, flick, cap = true, C, tx = (v: any) => v }: any) {
  return (
    <g>
      <rect x={x} y={y} width={DT.fw} height={DT.lh} rx={20} fill={tint(C.panel, 0.35)} stroke={shade(C.rule, 0.25)} strokeWidth={2.5} strokeDasharray="10 8" />
      <circle cx={x + 25} cy={y + 34} r={12} fill={flick ? "#B9C0C6" : "#6E7780"} stroke={shade(C.rule, 0.3)} strokeWidth={2} />
      <text x={x + DT.fw * 0.62} y={y + 78} textAnchor="middle" fontSize={T.display} fontWeight={700} fill={C.ink}>{d}</text>
      {cap && <text x={x + DT.fw / 2} y={y + 118} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={C.ink}>{tx("not taught")}</text>}
    </g>
  );
}
/* a person sharing: solid once counted in, a dashed outline while left out; `num` is the count so far */
function DtPerson({ cx, y, solid, num, C }: any) {
  const body = `M ${cx - 28} ${y + 96} L ${cx - 28} ${y + 70} Q ${cx - 28} ${y + 44} ${cx} ${y + 44} Q ${cx + 28} ${y + 44} ${cx + 28} ${y + 70} L ${cx + 28} ${y + 96} Z`;
  const ink = shade(DT_BLUE, 0.2);
  return (
    <g>
      <circle cx={cx} cy={y + 24} r={19} fill={solid ? "url(#gHundred)" : "#FFFFFF"} stroke={ink} strokeWidth={solid ? 2 : 3} strokeDasharray={solid ? undefined : "6 5"} />
      <path d={body} fill={solid ? "url(#gHundred)" : "#FFFFFF"} stroke={ink} strokeWidth={solid ? 2 : 3} strokeDasharray={solid ? undefined : "6 5"} />
      {num ? <text x={cx} y={y + 86} textAnchor="middle" fontSize={T.label} fontWeight={700} fill="#FFFFFF" stroke={shade(DT_BLUE, 0.35)} strokeWidth={3} paintOrder="stroke">{num}</text> : null}
    </g>
  );
}
/* the ruled board: the number divided out in full, the leftover on its shelf, countable */
function DtBoard({ x, y, w, num, d, C, tx = (v: any) => v }: any) {
  const q = Math.floor(num / d), r = num - q * d;
  return (
    <g>
      <rect x={x} y={y} width={w} height={100} rx={RAD.panel} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} filter="url(#fShadowSoft)" />
      <text x={x + 20} y={y + 44} fontSize={T.speech} fontWeight={700} fill={C.ink}>{indian(num) + " ÷ " + d}</text>
      <text x={x + 20} y={y + 90} fontSize={T.speech} fontWeight={700} fill={C.ink}>{"= " + indian(q)}</text>
      <text x={x + w - 20} y={y + 40} textAnchor="end" fontSize={T.label} fontWeight={700} fill={r ? dtInk(DT_VERM) : C.ink}>{dtFill(tx, "{r} left", { r })}</text>
      {Array.from({ length: Math.min(r, 9) }).map((_, k) => <Disc key={k} x={x + w - 30 - k * 28} y={y + 76} r={11} paint="gPointer" />)}
    </g>
  );
}
/* a share-out board: a row for each person, filled a round at a time, and what is left on its shelf, outside the rows */
/* skin: every counter of this board (its rows AND its shelf) wears the laddoo picture, or none does (a group is all skin or all plain);
   a skinned counter is drawn at 24 so it reads as a sweet, not as an orange ball */
function DtShareBoard({ x, y, w, h, s, things, mine, skin, C, tx = (v: any) => v }: any) {
  const q = Math.floor(things / s), r = things - q * s;
  const pitch = Math.min(26, (h - 72) / s), rr = skin ? 12 : Math.max(4, Math.min(8, pitch / 2 - 2));
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={RAD.panel} fill="#FFFFFF" stroke={mine ? C.rule : DT_BLUE} strokeWidth={mine ? 2 : 3} filter="url(#fShadowSoft)" />
      <text x={x + 20} y={y + 46} fontSize={T.label} fontWeight={700} fill={mine ? C.ink : dtInk(DT_BLUE)}>{dtFill(tx, "{n} sharing", { n: s })}</text>
      {Array.from({ length: s }).map((_, k) => {
        const yy = y + 72 + k * pitch;
        return (
          <g key={k}>
            <circle cx={x + 26} cy={yy} r={7} fill="url(#gHundred)" />
            {Array.from({ length: q }).map((__, j) => (
              <g key={j}>
                <Disc x={x + 52 + j * (rr * 2 + 3)} y={yy} r={rr} paint="gTen" flat />
                {skin && <Skin name="sweet" x={x + 52 + j * (rr * 2 + 3) - rr} y={yy - rr} w={rr * 2} h={rr * 2} fit="stretch" />}
              </g>
            ))}
          </g>
        );
      })}
      <line x1={x + w - 130} y1={y + 60} x2={x + w - 130} y2={y + h - 14} stroke={C.rule} strokeWidth={2} strokeDasharray="6 6" />
      <rect x={x + w - 118} y={y + 60} width={104} height={80} rx={14} fill={tint(C.panel, 0.4)} stroke={C.rule} strokeWidth={2} />
      {/* the leftover stands outside the rows at full strength, like what was shared (the same counter, skinned or plain as its rows): a dark ring marks it */}
      {Array.from({ length: r }).map((_, j) => {
        const cx = x + w - 96 + (j % 3) * 30, cy = y + 84 + Math.floor(j / 3) * 30;
        return (
          <g key={j}>
            <Disc x={cx} y={cy} r={11} paint="gTen" />
            {skin && <Skin name="sweet" x={cx - 12} y={cy - 12} w={24} h={24} fit="stretch" />}
            <circle cx={cx} cy={cy} r={12} fill="none" stroke={C.ink} strokeWidth={3} />
          </g>
        );
      })}
      <text x={x + w - 66} y={y + h - 20} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={r ? dtInk(DT_VERM) : C.ink}>{dtFill(tx, "{r} left", { r })}</text>
    </g>
  );
}

/* the start page's picture: a number in its cells, four lamps beneath it and one dark slot (1200 x 340); the dark slot has no caption here */
function StartArt({ box, C, lang, tx }: any) {
  const ds = [5, 2, 4, 0], x0 = box.w / 2 - (4 * DT.cw + 3 * DT.gap) / 2;
  const lx0 = box.w / 2 - (4 * DT.lw + DT.fw + 4 * DT.lgap) / 2;
  return (
    <g>
      {ds.map((d, i) => <DtCell key={i} x={x0 + i * (DT.cw + DT.gap)} y={6} d={d} C={C} />)}
      {DT_TESTS.map((d, i) => <DtLamp key={d} x={lx0 + i * (DT.lw + DT.lgap)} y={190} d={d} state="pass" C={C} tx={tx} />)}
      <DtFifth x={lx0 + 4 * (DT.lw + DT.lgap)} y={190} d={4} cap={false} C={C} tx={tx} />
    </g>
  );
}

/* ── the working area: 1472 x 520 shut, 900 x 520 with the answer panel open; origin at its top-left ──────────── */
function Work({ phase, n, item, index, stage, wrong, typed, api, MODEL, step, stepOn, box, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const free = stage === "free";
  const P: any = PHASES[(n || 1) - 1] || PHASES[0];
  /* the guide steps work a warm-up number, never question 1's own; a phase opens on stage "teach" for one frame before "demo" */
  const warm = !free && !!P.warm && (stage === "demo" || stage === "teach");
  const it: any = free ? { kind: "free", num: 24630 } : warm ? P.warm : item;
  const kind: string = it.kind;
  const railKind = kind === "total" || kind === "three" || (kind === "free");
  const qk = free ? "free" : warm ? n + ":w" : n + ":" + index;
  /* the board belongs to the ENTRY into a question (an away-and-back is a new entry) and is derived in render, never reset in an effect */
  const entry = useRef({ qk: "", c: 0 });
  if (entry.current.qk !== qk) entry.current = { qk, c: entry.current.c + 1 };
  const ek = qk + "#" + entry.current.c;
  const live = useRef(ek); live.current = ek;
  const fresh = (): any => ({
    ek, num: it.num || 0, edge: null, covered: false, ones: false, asking: null, touched: false, tb: false, gate: false,
    lamps: kind === "mystery" ? { 2: "pass", 3: "pass", 5: "pass", 10: "pass" } : kind === "proof" ? { 3: "pass" } : {},
    rev: 0, down: dtDigits(it.num || 0).map(() => false), moving: null, total: null,
    marks: [], flick: false, fifthAt: 0, ticked: false, counted: 0, tickAt: 0,
  });
  const [raw, setRaw] = useState(fresh);
  const S: any = raw.ek === ek ? raw : fresh();
  const R0 = useRef(S); R0.current = S;
  const put = (p: any) => { if (live.current !== ek) return; setRaw((r: any) => ({ ...(r.ek === ek ? r : fresh()), ...p })); };
  const R = stage === "win" || stage === "idle" ? 99 : S.rev;

  /* ── geometry ── */
  /* the picture has one size and one place whether the answer panel is open or shut: laid out in the open width (900), left of the key's corner */
  const L = (900 - DT.wc) / 2;
  const num: number = free ? S.num : it.num || 0;
  const cells: (number | null)[] = kind === "mystery" ? [null, null, null, null] : kind === "list" ? [null, null, null, it.ones] : kind === "share" ? [] : dtDigits(num);
  const nd = cells.length;
  const row = dtRow(nd, !cells.includes(null) && kind !== "list");
  const xs = row.xs;
  const CY = 4;
  const onesEdge = nd ? xs[nd - 1] - 10 : 0;
  const stowEdge = nd ? xs[0] - 14 : 0;
  const lampList = kind === "verdict" ? [2, 5, 10] : kind === "mystery" || kind === "proof" || kind === "list" || kind === "free" ? DT_TESTS : kind === "share" ? [] : [3];
  const withFifth = kind === "mystery" || kind === "proof" || kind === "free";
  const LY = kind === "verdict" ? 206 : kind === "free" ? 286 : 184;
  const lampW = kind === "verdict" || (railKind && kind !== "free") ? 190 : DT.lw;
  const lampsW = lampList.length * lampW + (lampList.length - 1) * DT.lgap + (withFifth ? DT.lgap + DT.fw : 0);
  const lamp0 = (DT.wc - lampsW) / 2;
  const lampBox = (d: number) => (railKind && kind !== "free" ? { x: 500, y: 290, w: lampW, h: DT.lh } : { x: lamp0 + lampList.indexOf(d) * (lampW + DT.lgap), y: LY, w: lampW, h: DT.lh });
  const fifthBox = { x: lamp0 + lampList.length * (lampW + DT.lgap), y: LY, w: DT.fw, h: DT.lh };
  const fifthD = kind === "free" ? DT_FIFTH[S.fifthAt] : it.d;
  const railY = 172;
  const F = kind === "share" ? it.friends : 0;
  /* the sweet skin is a boondi laddoo: only where the named thing is a laddoo or a sweet (never over "rolls"), and a group is all skin or all
     plain: the pile, or a board that is ALONE on screen (the friends-only board before the true count joins it), wears it only when the thing
     is 40 or fewer. Whenever the two boards stand together (the correction and the win) both are plain with their shelves, so the same sweets
     never look like two kinds in one frame (and 35 on each board would be 70 skins, over the screen's 40) */
  const sweetSkin = kind === "share" && (it.thing === "laddoos" || it.thing === "sweets") && it.things <= 40;
  const figW = F * 84 + 92, figX0 = DT.wc / 2 - figW / 2;
  const figC = (k: number) => figX0 + 28 + k * 84 + (k === F ? 36 : 0);
  const FY = 8;
  const boxOf = (name: string) => {
    if (name.startsWith("lamp-")) return lampBox(Number(name.slice(5)));
    if (name === "ones") return { x: xs[nd - 1], y: CY, w: DT.cw, h: DT.ch };
    if (name.startsWith("cell-")) return { x: xs[Number(name.slice(5))], y: CY, w: DT.cw, h: DT.ch };
    if (name === "fifth") return fifthBox;
    if (name === "count") return { x: 310, y: 440, w: 240, h: 72 };
    if (name === "tick-host") return { x: figC(F) - 36, y: 112, w: 72, h: 72 };
    return null;
  };
  const mid = (name: string) => { const b: any = boxOf(name); return b ? { x: L + b.x + b.w / 2, y: b.y + b.h / 2 } : { x: L + 430, y: 260 }; };

  /* ── what is on show ── */
  const sum = dtSum(num);
  const lampsNow: any = { ...S.lamps };
  if (kind === "verdict" && R >= 3) lampsNow[it.d] = dtPasses(num, it.d) ? "pass" : "fail";
  if ((kind === "total" || kind === "three") && R >= 3) lampsNow[3] = dtPasses(num, 3) ? "pass" : "fail";
  if (kind === "list") [2, 5, 10, 3].forEach((d, i) => { if (R > i) lampsNow[d] = "pass"; });
  if (kind === "proof" && R >= 3) lampsNow[2] = "fail";
  const allDown = S.down.length > 0 && S.down.every(Boolean);
  const showTotal = kind === "free" ? S.total != null : (railKind && R >= 2);

  /* ── acts: every one performed on screen by api.act, guarded against a second start ── */
  const playing = useRef(false);
  const tbRun = useRef(0);
  const wait = (ms: number) => new Promise((r) => setTimeout(r, reducedMotion() ? 20 : ms));
  const act = async (spec: any) => {
    if (playing.current) return false;
    playing.current = true;
    try { return await api.act(spec); } finally { playing.current = false; }
  };
  /* a tap on a control the guide step is not waiting for is a wrong act: report it, do nothing */
  const guard = (name: string) => {
    if (stage === "demo" && stepOn && stepOn !== name) { api.did(name); return true; }
    return false;
  };
  const canAct = (stage === "ask" || stage === "demo" || stage === "teach" || free) && !S.tb;

  /* the shutter: a hand pushes it from the left edge of the number to just before the ones cell */
  const coverRun = async () => {
    const e0 = stowEdge, e1 = onesEdge, y = CY + DT.ch / 2;
    const pts = Array.from({ length: 8 }).map((_, k) => ({ x: L + e0 + (e1 - e0) * (k + 1) / 8, y }));
    const ok = await act({ tool: "hand", moves: "push", ms: 800, at: pts, onPoint: (i: number) => put({ edge: e0 + (e1 - e0) * (i + 1) / 8 }) });
    if (ok) put({ edge: e1, covered: true });
    return !!ok;
  };
  const doCover = async (d: number) => {
    if (guard("lamp-" + d) || playing.current) return;
    put({ asking: d, touched: true });
    if (R0.current.edge !== onesEdge) {
      if (!(await coverRun())) return;
      api.sfx.tick();
    }
    if (free) put({ lamps: { ...R0.current.lamps, [d]: dtPasses(num, d) ? "pass" : "fail" } });
    api.did("lamp-" + d);
  };
  const readOnes = async () => {
    if (guard("ones") || playing.current) return;
    const ok = await act({ tool: "hand", moves: "tap", ms: 700, at: [mid("ones")] });
    if (!ok) return;
    put({ ones: true, touched: true }); api.sfx.tick(); api.did("ones");
  };

  /* a card comes down onto the rail: a hand carries it from its cell to its place */
  const railClosed = (nd2: boolean[]) => {
    if (!nd2.every(Boolean)) return;
    if (warm) put({ rev: 3 });
    else if (kind === "three") put({ rev: 2 });
  };
  const bring = async (i: number) => {
    const cur = R0.current;
    if (guard("cell-" + i)) return;
    if (cur.down[i] || cur.moving != null) { api.did("cell-" + i); return; }
    put({ moving: i, touched: true });
    const a = mid("cell-" + i), b = { x: a.x, y: railY + 46 };
    const ok = await act({ tool: "hand", moves: "carry", ms: 800, from: a, at: [b], to: b, hold: <DtCard x={-DT.cw / 2} y={-42} d={cells[i]} C={C} /> });
    if (!ok) { put({ moving: null }); return; }
    const nd2 = R0.current.down.slice(); nd2[i] = true;
    put({ moving: null, down: nd2, gate: nd2.every(Boolean) ? false : R0.current.gate });
    api.sfx.tick(); api.did("cell-" + i);
    railClosed(nd2);
  };
  /* the agent's and the dev driver's shortcut: every card down at once, no hand */
  const dropAll = () => {
    const nd2 = R0.current.down.map(() => true);
    put({ down: nd2, moving: null });
    api.sfx.tick(); railClosed(nd2);
  };

  /* the dark slot: a hand taps it, it flickers and stays dark */
  const pressFifth = async () => {
    if (guard("fifth") || playing.current) return;
    const ok = await act({ tool: "hand", moves: "tap", ms: 700, at: [mid("fifth")] });
    if (!ok) return;
    put({ touched: true, flick: true, fifthAt: free ? (R0.current.fifthAt + 1) % DT_FIFTH.length : R0.current.fifthAt });
    api.sfx.tick(); api.did("fifth");
    await wait(170); put({ flick: false });
    await wait(150); put({ flick: true });
    await wait(170); put({ flick: false });
  };

  /* the sharing bay: a hand counts the figures, a pencil ticks the box of the one handing out */
  const countRun = async () => {
    if (guard("count") || playing.current) return;
    const cur = R0.current;
    const tot = cur.ticked ? F + 1 : F;
    const pts = Array.from({ length: tot }).map((_, k) => ({ x: L + figC(k), y: FY + 44 }));
    put({ counted: 0, touched: true });
    const ok = await act({ tool: "hand", moves: "tap", ms: 1100, at: pts, onPoint: (i: number) => { put({ counted: i + 1 }); api.sfx.tick(); } });
    if (!ok) return;
    put({ counted: tot }); api.did("count");
  };
  const tickRun = async (fromTb?: boolean) => {
    if (!fromTb && (guard("tick-host") || playing.current)) return true;
    if (R0.current.ticked) { if (!fromTb) api.did("tick-host"); return true; }
    const c = figC(F), y = 150;
    const pts = [{ x: L + c - 16, y: y }, { x: L + c - 4, y: y + 14 }, { x: L + c + 18, y: y - 14 }];
    put({ touched: true });
    const ok = await act({ tool: "pencil", moves: "draw", ms: 800, at: pts, onPoint: (i: number) => put({ tickAt: i + 1 }) });
    if (!ok) { put({ tickAt: 0 }); return false; }
    put({ ticked: true, tickAt: 3 }); api.sfx.tick();
    if (!fromTb) api.did("tick-host");
    return true;
  };

  /* the lamps the child marks for a number known by its clues */
  const actedRef = useRef(false);
  const lastTap = useRef({ d: 0, t: 0 });
  const nudged = useRef(false);
  const markLamp = (d: number) => {
    if (stage !== "ask" || kind !== "list" || S.tb) return;
    /* a double tap on one lamp is one tap: a second press within 400 ms does not toggle it back */
    const now = Date.now();
    if (lastTap.current.d === d && now - lastTap.current.t < 400) return;
    lastTap.current = { d, t: now };
    if (nudged.current) { nudged.current = false; api.say(it.say); }
    const cur = R0.current.marks;
    const m = cur.includes(d) ? cur.filter((x: number) => x !== d) : [...cur, d].sort((a: number, b: number) => a - b);
    put({ marks: m, touched: true }); actedRef.current = true;
    api.setTyped(m.join(", ")); api.answerReady(m.length > 0); api.sfx.tick();
  };
  const enterList = () => {
    const m = R0.current.marks;
    if (playing.current || S.tb) return;
    /* nothing marked yet: say what to do (the question comes back on the first lamp tapped) */
    if (!m.length) { nudged.current = true; api.say("Tap the lamps that light for this number first."); return; }
    if (!actedRef.current) return;
    actedRef.current = false;
    api.submit(m.join(", "));
  };

  /* free play: a tap on a cell changes its digit; a lamp runs its test on the number as it stands */
  const changeCell = (i: number) => {
    if (!free || playing.current) return;
    const ds = dtDigits(R0.current.num);
    ds[i] = i === 0 ? (ds[i] % 9) + 1 : (ds[i] + 1) % 10;
    put({ num: Number(ds.join("")), lamps: {}, edge: null, covered: false, ones: false, asking: null, total: null, down: ds.map(() => false), touched: true });
    api.sfx.tick();
  };
  const freeTest = async (d: number) => {
    if (!free || playing.current) return;
    if (d !== 3) { await doCover(d); return; }
    const cur = R0.current, rest = cur.down.map((x: boolean, i: number) => (x ? -1 : i)).filter((i: number) => i >= 0);
    if (rest.length) {
      const ok = await act({ tool: "hand", moves: "sweep", ms: 1100, at: rest.map((i: number) => mid("cell-" + i)),
        onPoint: (j: number) => { const nd2 = R0.current.down.slice(); nd2[rest[j]] = true; put({ down: nd2 }); } });
      if (!ok) return;
    }
    put({ down: cur.down.map(() => true), total: dtSum(R0.current.num), lamps: { ...R0.current.lamps, 3: dtPasses(R0.current.num, 3) ? "pass" : "fail" } });
    api.sfx.tick();
  };

  /* the act a guide step waits for, done the one way whoever asks (a tap, Enter, the agent's check) */
  const actFor = (on: string) => {
    if (on.startsWith("lamp-")) return doCover(Number(on.slice(5)));
    if (on === "ones") return readOnes();
    if (on.startsWith("cell-")) return bring(Number(on.slice(5)));
    if (on === "fifth") return pressFifth();
    if (on === "count") return countRun();
    if (on === "tick-host") return tickRun();
  };
  /* the yes / no question judges nothing while a card is still up: Enter (or a picked key) lights the cards left, no line on the bubble.
     A typed TOTAL is judged as it comes: a right total always wins (so the keyboard path still answers), a wrong one is a normal miss
     with the normal replay (it counts the try, sweeps the cards still up down and ends on the right total) */
  const enterRail = (v: any) => {
    if (playing.current || S.tb) return;
    if (!S.down.every(Boolean)) { put({ gate: true }); api.sfx.tick(); return; }
    api.submit(v);
  };
  api.onEnter(stage === "demo" && stepOn ? () => actFor(stepOn)
    : stage === "ask" && kind === "list" ? enterList
      : stage === "ask" && kind === "three" ? enterRail : null);
  HOOK.enter = () => enterList();
  HOOK.set = (v: number[]) => {
    const m = DT_TESTS.filter((d) => v.includes(d));
    put({ marks: m }); actedRef.current = true; api.setTyped(m.join(", ")); api.answerReady(m.length > 0);
    return true;
  };
  HOOK.check = stage === "ask" && (kind === "three" || kind === "total") && !allDown ? () => { dropAll(); return true; } : undefined;
  HOOK.demo = undefined;

  /* a new entry stops a correction that is still playing and gives the pad back */
  const tbOn = useRef(false);
  useEffect(() => () => { tbRun.current++; playing.current = false; if (tbOn.current) { tbOn.current = false; api.lock(false); } }, [ek]);

  /* the win line, said once at the right answer (the phase's last one is replaced by its closing) */
  const said = useRef("");
  useEffect(() => {
    if (stage === "win" && !free && it.win && said.current !== ek) { said.current = ek; api.say(it.win); }
  }, [stage]);

  /* ── the traceback: redraws the maths, ends on the whole right answer, marks nothing ── */
  const runTb = async (my: number) => {
    const ok = () => tbRun.current === my && live.current === ek;
    const st = async (rv: number, ms: number) => { if (!ok()) return false; put({ rev: rv }); await wait(ms); return ok(); };
    if (kind === "verdict") {
      if (R0.current.edge !== onesEdge) { put({ asking: it.d }); if (!(await coverRun())) return; api.sfx.tick(); }
      if (!(await st(1, 800))) return;
      if (!(await st(2, 1000))) return;
      if (!(await st(3, 800))) return;
      await st(4, 1000);
    } else if (kind === "total" || kind === "three") {
      const cur = R0.current, rest = cur.down.map((x: boolean, i: number) => (x ? -1 : i)).filter((i: number) => i >= 0);
      if (rest.length) {
        const ok2 = await act({ tool: "hand", moves: "sweep", ms: 1100, at: rest.map((i: number) => mid("cell-" + i)),
          onPoint: (j: number) => { const nd2 = R0.current.down.slice(); nd2[rest[j]] = true; put({ down: nd2 }); } });
        if (!ok2 || !ok()) return;
        put({ down: cur.down.map(() => true) });
      }
      if (!(await st(2, 1000))) return;
      api.sfx.tick();
      await st(3, 1000);
    } else if (kind === "mystery") {
      const ok2 = await act({ tool: "hand", moves: "tap", ms: 700, at: [mid("fifth")] });
      if (!ok2 || !ok()) return;
      put({ flick: true, rev: 1 }); await wait(180); put({ flick: false }); await wait(150); put({ flick: true }); await wait(180); put({ flick: false });
      await st(2, 1400);
    } else if (kind === "list") {
      for (let k = 1; k <= 4; k++) { api.sfx.tick(); if (!(await st(k, 700))) return; }
      await wait(400);
    } else if (kind === "proof") {
      const ok2 = await act({ tool: "hand", moves: "tap", ms: 700, at: [mid("fifth")] });
      if (!ok2 || !ok()) return;
      put({ flick: true, rev: 1 }); await wait(180); put({ flick: false });
      if (!(await st(2, 1100))) return;
      api.sfx.tick();
      await st(3, 1000);
    } else if (kind === "share") {
      if (!(await tickRun(true)) || !ok()) return;
      if (!(await st(1, 600))) return;
      if (!(await st(2, 1300))) return;
      await st(3, 1200);
    }
  };
  useEffect(() => {
    if (!wrong || stage !== "ask") return;
    const my = ++tbRun.current;
    (async () => {
      api.lock(true); tbOn.current = true; put({ tb: true });
      try { await runTb(my); } finally { if (tbRun.current === my) { tbOn.current = false; put({ tb: false }); api.lock(false); } }
    })();
  }, [wrong]);

  /* what the host and the agent read back (toolApi.getState): nothing here names an answer before it is given */
  api.share({
    number: kind === "mystery" || kind === "share" ? null : num, shutter: S.covered ? "ones" : "open",
    cardsDown: railKind ? (R >= 99 ? S.down.length : S.down.filter(Boolean).length) : 0, counted: S.counted, ticked: kind === "share" && (S.ticked || R >= 1),
    railTotal: showTotal ? sum : null, complete: stage === "idle",
  });

  /* ── the one invite: the control the guide step names, else the first thing to touch in the question ── */
  /* the chapter rule: ONE invite. A guide step rings the control it waits for; while a question is open (stage "ask") nothing in the picture
     rings or pulses: the bubble names the act and the runtime's Answer key (or Enter) is the only thing that blinks */
  let inv: string | null = null;
  if (!S.tb && (stage === "demo" || stage === "teach") && stepOn) inv = stepOn;
  const invBox: any = inv ? boxOf(inv) : null;

  /* ── drawing ── */
  const cellEls = cells.map((d, i) => {
    if (railKind && (S.down[i] || S.moving === i || R >= 99)) return <DtGap key={"c" + i} x={xs[i]} y={CY} h={DT.ch} C={C} />;
    const lit = ((kind === "verdict" || kind === "free") && i === nd - 1 && (S.ones || R >= 1)) || (railKind && kind !== "free" && S.gate);
    return <DtCell key={"c" + i} x={xs[i]} y={CY} d={d} lit={lit} C={C} />;
  });
  const commaEls = row.gaps.map((g, i) => (g === DT.cgap ? <DtComma key={"m" + i} x={xs[i] + DT.cw + g / 2 + 4} y={CY + 104} color={C.ink} /> : null));
  const shutterEl = (kind === "verdict" || kind === "free") && S.edge != null && S.edge - stowEdge > 6 ? (
    <g>
      <rect x={stowEdge} y={CY - 3} width={S.edge - stowEdge} height={DT.ch + 6} rx={14} fill={C.panel} stroke={shade(C.rule, 0.3)} strokeWidth={3} filter="url(#fShadowSoft)" />
      {[0.3, 0.5, 0.7].map((f) => <line key={f} x1={stowEdge + 14} y1={CY - 3 + (DT.ch + 6) * f} x2={S.edge - 22} y2={CY - 3 + (DT.ch + 6) * f} stroke={shade(C.rule, 0.15)} strokeWidth={3} strokeLinecap="round" />)}
      <rect x={S.edge - 14} y={CY + 28} width={8} height={DT.ch - 56} rx={4} fill={shade(C.rule, 0.35)} />
    </g>
  ) : null;
  const nameEls = (kind === "verdict" && R >= 1) ? cells.map((d, i) => (
    <text key={"n" + i} x={xs[i] + DT.cw / 2} y={CY + DT.ch + 34} textAnchor="middle" fontSize={T.label} fontWeight={i === nd - 1 ? 700 : 600} fill={i === nd - 1 ? dtSkyInk : C.ink}>{tx(DT_PLACE[nd - 1 - i])}</text>
  )) : null;

  /* verdict: the ones digit laid against the digits that pass */
  const ruleEl = (() => {
    if (!(kind === "verdict" && R >= 2)) return null;
    const ends = DT_ENDS[it.d], last = num % 10, hit = ends.includes(last);
    const cw2 = 56, gap2 = 12, labW = 150;
    const tot = labW + ends.length * (cw2 + gap2) + 30 + cw2;
    const x0 = (DT.wc - tot) / 2, y0 = 346;
    return (
      <g>
        <text x={x0} y={y0 + 40} fontSize={T.label} fontWeight={700} fill={C.ink}>{tx("ends in")}</text>
        {ends.map((e, k) => {
          const on = hit && e === last;
          return (
            <g key={e}>
              <rect x={x0 + labW + k * (cw2 + gap2)} y={y0} width={cw2} height={cw2} rx={12} fill={on ? tint(DT_BLUE, 0.8) : "#FFFFFF"} stroke={on ? DT_BLUE : C.rule} strokeWidth={on ? 4 : 2.5} />
              <text x={x0 + labW + k * (cw2 + gap2) + cw2 / 2} y={y0 + 40} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={on ? dtInk(DT_BLUE) : C.ink}>{e}</text>
            </g>
          );
        })}
        <rect x={x0 + labW + ends.length * (cw2 + gap2) + 30} y={y0} width={cw2} height={cw2} rx={12} fill={tint(DT_SKY, 0.8)} stroke={hit ? DT_SKY : DT_VERM} strokeWidth={4} />
        <text x={x0 + labW + ends.length * (cw2 + gap2) + 30 + cw2 / 2} y={y0 + 40} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={dtSkyInk}>{last}</text>
      </g>
    );
  })();

  /* the sum rail and the total with its lamp */
  const railEl = railKind ? (
    <g>
      <rect x={xs[0] - 14} y={railY - 6} width={xs[nd - 1] + DT.cw - xs[0] + 28} height={104} rx={20} fill={tint(C.panel, 0.45)} stroke={(allDown ? DT_BLUE : C.rule)} strokeWidth={allDown ? 4 : 2.5} />
      {cells.map((d, i) => (S.down[i] || R >= 99
        ? <DtCard key={"r" + i} x={xs[i]} y={railY} d={d} C={C} />
        : <DtGap key={"r" + i} x={xs[i]} y={railY} h={92} C={C} />))}
    </g>
  ) : null;
  const totalEl = railKind && showTotal && kind !== "free" ? (
    <g>
      <rect x={190} y={290} width={250} height={DT.lh} rx={20} fill="#FFFFFF" stroke={DT_AMBER} strokeWidth={4} filter="url(#fShadowSoft)" />
      <text x={210} y={332} fontSize={T.label} fontWeight={600} fill={C.ink}>{tx("total")}</text>
      <text x={345} y={400} textAnchor="middle" fontSize={T.display} fontWeight={700} fill={dtInk(DT_AMBER)}>{sum}</text>
      <path d="M 452 356 L 494 356 M 482 344 L 496 356 L 482 368" fill="none" stroke={C.ink} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />
    </g>
  ) : null;

  /* the lamps (and the dark slot) */
  const lampEls = lampList.map((d) => {
    const b = lampBox(d);
    return <DtLamp key={d} x={b.x} y={b.y} d={d} w={b.w} state={lampsNow[d]} ring={S.asking === d && (kind === "verdict" || kind === "free") && lampsNow[d] == null} mark={S.marks.includes(d)} C={C} tx={tx} />;
  });
  const fifthEl = withFifth ? <DtFifth x={fifthBox.x} y={fifthBox.y} d={fifthD} flick={S.flick} cap={free || R >= 1 || (warm && S.touched)} C={C} tx={tx} /> : null;
  const reasonEls = kind === "list" ? [[2, "ends in 0"], [5, "ends in 0"], [10, "ends in 0"], [3, "adds to 12"]].map(([d, w]: any, k) => (
    R > k ? <text key={"w" + d} x={lampBox(d).x + lampBox(d).w / 2} y={LY + DT.lh + 40} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={C.ink}>{tx(w)}</text> : null
  )) : null;
  const freeTotalEl = kind === "free" && S.total != null ? <text x={lampBox(3).x + lampBox(3).w / 2} y={LY + DT.lh + 40} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={dtInk(DT_AMBER)}>{dtFill(tx, "total {t}", { t: S.total })}</text> : null;

  /* boards: the number divided out */
  const boardEls = (() => {
    if (kind === "verdict" && R >= 4) return <DtBoard x={170} y={410} w={520} num={num} d={it.d} C={C} tx={tx} />;
    if (kind === "mystery" && R >= 2) return <g><DtBoard x={0} y={350} w={420} num={DT_PAIR[0]} d={it.d} C={C} tx={tx} /><DtBoard x={440} y={350} w={420} num={DT_PAIR[1]} d={it.d} C={C} tx={tx} /></g>;
    if (kind === "proof" && R >= 2) return <DtBoard x={170} y={350} w={520} num={num} d={it.d} C={C} tx={tx} />;
    if (kind === "share" && R >= 2) {
      return (
        <g>
          <DtShareBoard x={0} y={232} w={420} h={196} s={F} things={it.things} mine skin={sweetSkin && R < 3} C={C} tx={tx} />
          {R >= 3 && <DtShareBoard x={440} y={232} w={420} h={196} s={F + 1} things={it.things} C={C} tx={tx} />}
        </g>
      );
    }
    return null;
  })();

  /* the sharing bay: the friends, the one handing out with a box of their own, the pile */
  const bayEl = kind === "share" ? (
    <g>
      {Array.from({ length: F + 1 }).map((_, k) => {
        const host = k === F, solid = host ? (S.ticked || R >= 1) : true;
        return <DtPerson key={"p" + k} cx={figC(k)} y={FY} solid={solid} num={S.counted > k ? k + 1 : 0} C={C} />;
      })}
      <rect x={figC(F) - 26} y={124} width={52} height={52} rx={10} fill={S.ticked || R >= 1 ? tint(DT_BLUE, 0.8) : "#FFFFFF"} stroke={S.ticked || R >= 1 ? DT_BLUE : C.ink} strokeWidth={3.5} />
      {(S.ticked || R >= 1 || S.tickAt > 0) && (
        <path d={`M ${figC(F) - 14} 150 L ${figC(F) - 3} 162${S.tickAt >= 2 || S.ticked || R >= 1 ? ` L ${figC(F) + 16} 136` : ""}`} fill="none" stroke={dtInk(DT_BLUE)} strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" />
      )}
      <text x={figC(F)} y={222} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={C.ink}>{tx("hands out")}</text>
      {R < 2 && (() => {
        /* a skinned sweet is drawn at 22 (ten to a row); the plain heap of 50 or 70 stays small (fifteen to a row); the label keeps 12 clear of the first row, hooks of a Hindi letter included */
        const pr = sweetSkin ? 11 : 7.5, pp = sweetSkin ? 26 : 19, cols = sweetSkin ? 10 : 15;
        const rows = Math.ceil(it.things / cols), tw = cols * pp + 28, th = 76 + (lang === "en" ? 0 : 5) + (rows - 1) * pp + pr + 8;
        return (
          <g>
            <rect x={DT.wc / 2 - tw / 2} y={250} width={tw} height={th} rx={RAD.panel} fill={tint(C.panel, 0.5)} stroke={C.rule} strokeWidth={2.5} />
            <text x={DT.wc / 2} y={290} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{it.things + " " + tx(it.thing)}</text>
            {Array.from({ length: it.things }).map((_, k) => {
              const px = DT.wc / 2 - tw / 2 + 14 + pp / 2 + (k % cols) * pp, py = 326 + (lang === "en" ? 0 : 5) + Math.floor(k / cols) * pp;
              return (
                <g key={k}>
                  <Disc x={px} y={py} r={pr} paint="gTen" flat />
                  {sweetSkin && <Skin name="sweet" x={px - pr - 1} y={py - pr - 1} w={pr * 2 + 2} h={pr * 2 + 2} fit="stretch" />}
                </g>
              );
            })}
          </g>
        );
      })()}
    </g>
  ) : null;
  const toneI = typeof toneInk === "function" ? toneInk("key", C.ink) : C.ink;
  const countKey = kind === "share" && canAct ? (
    <Key id="count" label={tx("Count")} x={310} y={440} w={240} h={72} C={C} tone="key" onClick={() => { countRun(); }}>
      <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={toneI}>{tx("Count")}</text>
    </Key>
  ) : null;

  /* the finger boxes: every one is a labelled control with its own data-control, nothing else is clickable */
  const hits: any[] = [];
  if (canAct) {
    if (kind === "verdict") {
      lampList.forEach((d) => { const b = lampBox(d); hits.push(<Hit key={"h" + d} id={"lamp-" + d} x={b.x} y={b.y} w={b.w} h={b.h} label={tx("Lamp") + " " + d} onPress={() => { doCover(d); }} />); });
      const b = boxOf("ones") as any; hits.push(<Hit key="hones" id="ones" x={b.x} y={b.y} w={b.w} h={b.h} label={tx("ones")} onPress={() => { readOnes(); }} />);
    }
    if (kind === "free") {
      lampList.forEach((d) => { const b = lampBox(d); hits.push(<Hit key={"h" + d} id={"lamp-" + d} x={b.x} y={b.y} w={b.w} h={b.h} label={tx("Lamp") + " " + d} onPress={() => { freeTest(d); }} />); });
      cells.forEach((d, i) => hits.push(<Hit key={"hc" + i} id={"cell-" + i} x={xs[i]} y={CY} w={DT.cw} h={DT.ch} label={tx("Cell") + " " + (i + 1)} onPress={() => changeCell(i)} />));
    }
    if (kind === "list" && stage === "ask") {
      lampList.forEach((d) => { const b = lampBox(d); hits.push(<Hit key={"h" + d} id={"lamp-" + d} x={b.x} y={b.y} w={b.w} h={b.h} label={tx("Lamp") + " " + d} onPress={() => markLamp(d)} />); });
    }
    if (railKind && kind !== "free") {
      cells.forEach((d, i) => { if (!S.down[i] && S.moving !== i) hits.push(<Hit key={"hc" + i} id={"cell-" + i} x={xs[i]} y={CY} w={DT.cw} h={DT.ch} label={tx("Card") + " " + (i + 1)} onPress={() => { bring(i); }} />); });
    }
    if (withFifth) { hits.push(<Hit key="hfifth" id="fifth" x={fifthBox.x} y={fifthBox.y} w={fifthBox.w} h={fifthBox.h} label={tx("Dark slot")} onPress={() => { pressFifth(); }} />); }
    if (kind === "share" && !S.ticked && R < 1) {
      const b = boxOf("tick-host") as any; hits.push(<Hit key="htick" id="tick-host" x={b.x} y={b.y} w={b.w} h={b.h} label={tx("Tick")} onPress={() => { tickRun(); }} />);
    }
  }

  return (
    <g pointerEvents={S.tb ? "none" : undefined}>
      <g transform={`translate(${L},0)`}>
        {cellEls}
        {commaEls}
        {shutterEl}
        {nameEls}
        {railEl}
        {totalEl}
        {lampEls}
        {fifthEl}
        {reasonEls}
        {freeTotalEl}
        {ruleEl}
        {bayEl}
        {boardEls}
        {countKey}
        {invBox && <Invite x={invBox.x + invBox.w / 2} y={invBox.y + invBox.h / 2} w={invBox.w} h={invBox.h} rx={16} C={C} />}
        {hits}
      </g>
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase: the number and what the child said */
function Thumb({ result, it, C, w, h, lang = "en", tx = (v: any) => v }: any) {
  const v = result && result.last ? result.last.value : null;
  if (v === null || v === undefined) return null;
  const item: any = it || (result.last && result.last.item != null ? PHASES.reduce((a: any, p: any) => a || p.items[result.last.item], null) : null) || {};
  /* digits and lamps only, no words: the same small picture in every language. The number stands on the left and what the child
     said on the right, side by side, so nothing sits on the number's baseline or comma (at least 20 clear between them) */
  const k = item.kind, yes = String(v) === "yes";
  const big = item.num ? indian(item.num) : k === "share" ? String(item.things) : k === "mystery" ? "?" : "";
  const cy = h / 2, r = Math.max(14, Math.min(19, h / 2 - 9));
  const lamp = (cx: number, d: number, st: string) => (
    <g key={cx}>
      <circle cx={cx} cy={cy} r={r} fill={st === "pass" ? "url(#gHundred)" : "#FFFFFF"} stroke={st === "fail" ? DT_VERM : st === "pass" ? shade(DT_BLUE, 0.2) : C.rule} strokeWidth={st === "fail" ? 4 : 2.5} strokeDasharray={st === "off" ? "5 4" : undefined} />
      <text x={cx} y={cy + 10} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={st === "pass" ? "#FFFFFF" : C.ink}>{d}</text>
    </g>
  );
  const rx = w - 16 - r;
  let right: any = null;
  if (k === "verdict") right = lamp(rx, item.d, yes ? "pass" : "fail");
  else if (k === "three") right = lamp(rx, 3, yes ? "pass" : "fail");
  else if (k === "proof") right = <g>{lamp(rx - 2 * r - 6, 3, "pass")}{lamp(rx, item.d, "off")}</g>;
  else if (k === "mystery") right = lamp(rx, item.d, "off");
  else if (k === "list") { const m = dtListOf(v); right = <g>{DT_TESTS.map((d, i) => lamp(w / 2 + (i - 1.5) * (2 * r + 10), d, m.includes(d) ? "pass" : "off"))}</g>; }
  else if (k === "share") { const p = slotPartsOf(v, 2); right = <text x={w - 16} y={cy + 11} textAnchor="end" fontSize={T.label} fontWeight={700} fill={dtInk(DT_BLUE)}>{p[0] + " | " + p[1]}</text>; }
  else right = <text x={w - 16} y={cy + 11} textAnchor="end" fontSize={T.label} fontWeight={700} fill={dtInk(DT_BLUE)}>{"= " + String(v)}</text>;
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      {k !== "list" && <text x={16} y={cy + 11} fontSize={T.label} fontWeight={700} fill={C.ink}>{big}</text>}
      {right}
    </g>
  );
}

function DigitTester(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, fitHost: () => null,
      /* the board layout (LAYOUT.md §1b): the working area is the whole card until the child taps Answer, the answer box and keypad in a
         panel that slides in from the right */
      board: true,
      /* KEY ONLY (the new look; LAYOUT.md §1d, PATTERNS.md §16): no question bar, only its blinking key at the top right; the key's corner is
         props.box.key and the picture keeps out of it; the question lives only in the bubble */
      keyOnly: true,
      /* the wide keypad (PATTERNS.md 9g): the picture is laid out in 860 units, so it fits x 64 to 964 with the panel open */
      bigPad: true,
      /* the Next key (PATTERNS.md 9d): nothing moves on by itself; the win picture waits for the child's tap on the blinking Next key */
      nextKey: true,
      /* NAV DOTS (the new look; LAYOUT.md §1d): one small clickable dot per phase */
      navDots: true,
      /* the start page: the tool's name, StartArt, START_HOOK, a Start key */
      StartArt, START_HOOK,
      }} />
  );
}

export default DigitTester;
