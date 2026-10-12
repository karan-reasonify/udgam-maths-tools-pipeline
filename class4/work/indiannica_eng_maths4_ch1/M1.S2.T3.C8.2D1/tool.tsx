/* ═══ M1.S2.T3.C8.2D1 · worth_of_a_digit · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists: header + its three controls, canvas, slot + pad, bubble + mascot,
   phase dots (user / AI mode), window.toolApi, sounds, the synced voice, scoring, the events,
   idle and restart. NO imports in this file; only the five host hooks. Follow docs/LAYOUT.md;
   the reference tool is work/indiannica_eng_maths4_ch1/M1.S1.T2.C4.2D1/tool.tsx.
   Edit, never rewrite. Built by `node cli.mjs scaffold`; concepts are verbatim (check compares them). */

const TOOL_ID = "worth_of_a_digit";
const MEDIA_ID = "M1.S2.T3.C8.2D1";
const TOOL_NAME = "What a Digit Is Worth";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
const VOICE = {"rate":0.92,"pitch":1.06};

/* spoken before phase 1's teach lines only (the plan's opening voice line) */
const OPENING = ["One number, and every digit in it is worth something different. Tap one."];
/* the whole-tool line: spoken on the summary page */
const FINISH_LINE = "You said what each digit is, and what each digit is worth.";
/* said when the child opens Free play from the summary page (the plan's free-play voice line) */
const FREE_LINE = "Free play. Any number, any digit, the row of addends left open.";

/* Hindi and Gujarati, keyed by the English line exactly (runtime r13+: `lineFor(line, lang, TR)`); the
   English stays what the checks read. NCERT class 4 terms; digits stay digits (the runtime speaks them
   in the language in use). A first draft; wants a native speaker's read. */
const TR: any = {
  hi: {
    "What a Digit Is Worth": "अंक का मान",
    "One number, and every digit in it is worth something different. Tap one.": "एक संख्या, और उसके हर अंक का मान अलग है। किसी एक पर टैप करो।",
    "You said what each digit is, and what each digit is worth.": "तुमने बताया कि हर अंक क्या है, और हर अंक का मान कितना है।",
    "Free play. Any number, any digit, the row of addends left open.": "मुक्त खेल। कोई भी संख्या, कोई भी अंक, जोड़ की पंक्ति खुली।",
    "The digit you see, and what the digit is worth": "जो अंक दिखता है, और उस अंक का मान",
    "Tap them one at a time. Is the face value the same every time?": "एक-एक करके टैप करो। क्या अंकित मान हर बार वही है?",
    "Is that card the same under every digit?": "क्या वह कार्ड हर अंक के नीचे एक जैसा है?",
    "Look at just two of the same digit. Read both face value cards.": "एक ही अंक के सिर्फ़ दो को देखो। दोनों अंकित मान कार्ड पढ़ो।",
    "The face value of a digit is the digit itself, wherever it sits.": "किसी अंक का अंकित मान वह अंक ही होता है, चाहे वह कहीं भी हो।",
    "You learned: a digit's face value is the digit itself, wherever it sits.": "तुमने सीखा: अंक का अंकित मान वही अंक है, चाहे वह कहीं भी हो।",
    "Hundreds digit: face value?": "सैकड़े का अंक: अंकित मान?",
    "In 55,555, what is the face value of the five standing in the hundreds place?": "55,555 में, सैकड़े के स्थान पर खड़े पाँच का अंकित मान क्या है?",
    "Read the card with the bare digit on it.": "जिस कार्ड पर सिर्फ़ अंक लिखा है, उसे पढ़ो।",
    "Face value of the 9?": "9 का अंकित मान?",
    "What is the face value of 9 in 9,14,680?": "9,14,680 में 9 का अंकित मान क्या है?",
    "Does a face value change with the place?": "क्या स्थान बदलने से अंकित मान बदलता है?",
    "Do their face values change?": "क्या उनके अंकित मान बदलते हैं?",
    "Two of the digits in 55,555 are swapped over. Tap a marked one to swap them. Do their face values change?": "55,555 के दो अंकों की जगह बदलनी है। बदलने के लिए चिह्नित अंक पर टैप करो। क्या उनके अंकित मान बदलते हैं?",
    "Did the digit itself change when it moved?": "जब अंक खिसका, तो क्या अंक खुद बदला?",
    "Where a digit sits decides what it is worth": "अंक कहाँ है, इससे उसका मान तय होता है",
    "Read the place value cards along the row. Drag a digit to a new column and watch its worth.": "पंक्ति के स्थानीय मान कार्ड पढ़ो। किसी अंक को नए खाने में खींचो और उसका मान देखो।",
    "What is one of that column worth?": "उस खाने का एक कितने का होता है?",
    "Read the heading above it. Multiply the digit by the value of that place.": "उसके ऊपर का शीर्षक पढ़ो। अंक को उस स्थान के मान से गुणा करो।",
    "Place value is the face value multiplied by the value of the place it sits in.": "स्थानीय मान, अंकित मान को उसके स्थान के मान से गुणा करने पर मिलता है।",
    "You learned: place value is face value times the value of its place.": "तुमने सीखा: स्थानीय मान है अंकित मान गुणा उसके स्थान का मान।",
    "Place value of the 4?": "4 का स्थानीय मान?",
    "In 74,057, what is the place value of 4?": "74,057 में 4 का स्थानीय मान क्या है?",
    "Which column is that digit standing in?": "वह अंक किस खाने में खड़ा है?",
    "Place value of the 9?": "9 का स्थानीय मान?",
    "What is the place value of 9 in 9,14,680?": "9,14,680 में 9 का स्थानीय मान क्या है?",
    "Count the places from the right. Where does the nine stand?": "दाईं ओर से स्थान गिनो। नौ कहाँ खड़ा है?",
    "Hundreds digit: place value?": "सैकड़े का अंक: स्थानीय मान?",
    "What is the place value of the hundreds digit in 74,057?": "74,057 में सैकड़े के अंक का स्थानीय मान क्या है?",
    "Which digit stands in the hundreds place?": "सैकड़े के स्थान पर कौन सा अंक है?",
    "Adding up the worths gives the expanded form": "मानों को जोड़ने से विस्तारित रूप बनता है",
    "Every digit has two cards. Build a row of addends that adds back to the number.": "हर अंक के दो कार्ड हैं। जोड़ की ऐसी पंक्ति बनाओ जिसका योग वही संख्या हो।",
    "How many addends should the row have?": "पंक्ति में कितने पद होने चाहिए?",
    "Does your row add back to the number in the chart?": "क्या तुम्हारी पंक्ति का योग चार्ट की संख्या के बराबर है?",
    "The expanded form is the place values written out and added.": "विस्तारित रूप में स्थानीय मान अलग-अलग लिखकर जोड़े जाते हैं।",
    "You learned: expanded form is the place values written out and added.": "तुमने सीखा: विस्तारित रूप यानी स्थानीय मान लिखकर जोड़ना।",
    "Expand 84,536": "84,536 का विस्तारित रूप",
    "Write 84,536 in expanded form. Move one card of each digit down into the row, then press enter.": "84,536 को विस्तारित रूप में लिखो। हर अंक का एक कार्ड नीचे पंक्ति में लाओ, फिर एंटर दबाओ।",
    "What is this digit worth where it is standing?": "यह अंक जहाँ खड़ा है, वहाँ इसका मान कितना है?",
    "Expand 47,250": "47,250 का विस्तारित रूप",
    "Write 47,250 in expanded form.": "47,250 को विस्तारित रूप में लिखो।",
    "Does the zero need a card of its own?": "क्या शून्य को अपना अलग कार्ड चाहिए?",
    "Expand 7,52,953": "7,52,953 का विस्तारित रूप",
    "Write 7,52,953 in expanded form.": "7,52,953 को विस्तारित रूप में लिखो।",
    "Which card belongs to the lakhs place?": "लाख के स्थान का कार्ड कौन सा है?",
    "Rolling the expanded form back into one number": "विस्तारित रूप से वापस एक संख्या बनाना",
    "Put each addend back in its own column. What number did you make?": "हर पद को उसके अपने खाने में वापस रखो। तुमने कौन सी संख्या बनाई?",
    "Is any column still standing empty?": "क्या कोई खाना अब भी खाली है?",
    "An empty place still needs a digit to hold it open.": "खाली स्थान को भी थामने के लिए एक अंक चाहिए।",
    "Rebuilding the standard form is the only check an expanded form has.": "मानक रूप फिर से बनाना ही विस्तारित रूप की एकमात्र जाँच है।",
    "You learned: rebuilding the standard form checks an expanded form.": "तुमने सीखा: मानक रूप फिर बनाकर विस्तारित रूप जाँचते हैं।",
    "Which number?": "कौन सी संख्या?",
    "4,00,000 plus 50,000 plus 6,000 plus 900 plus 20 plus 3. Which number is that?": "4,00,000 जमा 50,000 जमा 6,000 जमा 900 जमा 20 जमा 3। यह कौन सी संख्या है?",
    "Which place does this addend name?": "यह पद किस स्थान का नाम बताता है?",
    "Standard form?": "मानक रूप?",
    "7 times 1,00,000, 8 times 10,000, 2 times 1,000, 9 times 100, 6 times 10 and 5 times 1. Write it in standard form.": "7 गुणा 1,00,000, 8 गुणा 10,000, 2 गुणा 1,000, 9 गुणा 100, 6 गुणा 10 और 5 गुणा 1। इसे मानक रूप में लिखो।",
    "Which digit goes in the lakhs place?": "लाख के स्थान पर कौन सा अंक जाएगा?",
    "6 times 1,00,000, 8 times 10,000, 4 times 100 and 9 times 10. Type the number they make.": "6 गुणा 1,00,000, 8 गुणा 10,000, 4 गुणा 100 और 9 गुणा 10। इनसे बनी संख्या लिखो।",
    "Which places are missing from the list?": "सूची में कौन से स्थान नहीं हैं?",
    /* the working area's own words, and the choices */
    "ones": "इकाई", "tens": "दहाई", "hundreds": "सैकड़ा", "thousands": "हज़ार", "ten thousands": "दस हज़ार", "lakhs": "लाख",
    "adds to": "योग", "placed": "रखे गए", "digits split": "अंक खुले", "face value": "अंकित मान", "place value": "स्थानीय मान",
    "Show all": "सब दिखाओ", "Hide all": "सब छिपाओ", "New number": "नई संख्या", "Expand": "फैलाओ", "Collapse": "समेटो",
    "No": "नहीं", "Yes": "हाँ",
  },
  gu: {
    "What a Digit Is Worth": "અંકની કિંમત",
    "One number, and every digit in it is worth something different. Tap one.": "એક સંખ્યા, અને તેના દરેક અંકની કિંમત જુદી છે. કોઈ એક પર ટૅપ કરો.",
    "You said what each digit is, and what each digit is worth.": "તમે કહ્યું કે દરેક અંક શું છે, અને દરેક અંકની કિંમત કેટલી છે.",
    "Free play. Any number, any digit, the row of addends left open.": "મુક્ત રમત. કોઈ પણ સંખ્યા, કોઈ પણ અંક, સરવાળાની હાર ખુલ્લી.",
    "The digit you see, and what the digit is worth": "દેખાતો અંક, અને તે અંકની કિંમત",
    "Tap them one at a time. Is the face value the same every time?": "એક પછી એક ટૅપ કરો. શું મૂળ કિંમત દર વખતે સરખી છે?",
    "Is that card the same under every digit?": "શું તે કાર્ડ દરેક અંક નીચે સરખું છે?",
    "Look at just two of the same digit. Read both face value cards.": "એક જ અંકના ફક્ત બે જુઓ. બંને મૂળ કિંમતનાં કાર્ડ વાંચો.",
    "The face value of a digit is the digit itself, wherever it sits.": "અંકની મૂળ કિંમત તે અંક પોતે જ છે, તે ગમે ત્યાં હોય.",
    "You learned: a digit's face value is the digit itself, wherever it sits.": "તમે શીખ્યા: અંકની મૂળ કિંમત તે અંક જ છે, ગમે ત્યાં હોય.",
    "Hundreds digit: face value?": "શતકનો અંક: મૂળ કિંમત?",
    "In 55,555, what is the face value of the five standing in the hundreds place?": "55,555 માં, શતકના સ્થાને ઊભેલા પાંચની મૂળ કિંમત શું છે?",
    "Read the card with the bare digit on it.": "જે કાર્ડ પર ફક્ત અંક છે તે વાંચો.",
    "Face value of the 9?": "9 ની મૂળ કિંમત?",
    "What is the face value of 9 in 9,14,680?": "9,14,680 માં 9 ની મૂળ કિંમત શું છે?",
    "Does a face value change with the place?": "શું સ્થાન બદલાતાં મૂળ કિંમત બદલાય છે?",
    "Do their face values change?": "શું તેમની મૂળ કિંમત બદલાય છે?",
    "Two of the digits in 55,555 are swapped over. Tap a marked one to swap them. Do their face values change?": "55,555 ના બે અંકની અદલાબદલી કરવાની છે. નિશાનીવાળા અંક પર ટૅપ કરો. શું તેમની મૂળ કિંમત બદલાય છે?",
    "Did the digit itself change when it moved?": "અંક ખસ્યો ત્યારે શું અંક પોતે બદલાયો?",
    "Where a digit sits decides what it is worth": "અંક ક્યાં છે, તેનાથી તેની કિંમત નક્કી થાય છે",
    "Read the place value cards along the row. Drag a digit to a new column and watch its worth.": "હારમાં સ્થાનકિંમતનાં કાર્ડ વાંચો. કોઈ અંકને નવા ખાનામાં ખેંચો અને તેની કિંમત જુઓ.",
    "What is one of that column worth?": "તે ખાનાનો એક કેટલાનો છે?",
    "Read the heading above it. Multiply the digit by the value of that place.": "તેની ઉપરનું મથાળું વાંચો. અંકને તે સ્થાનની કિંમત સાથે ગુણો.",
    "Place value is the face value multiplied by the value of the place it sits in.": "સ્થાનકિંમત એટલે મૂળ કિંમત ગુણ્યા તે અંકના સ્થાનની કિંમત.",
    "You learned: place value is face value times the value of its place.": "તમે શીખ્યા: સ્થાનકિંમત એટલે મૂળ કિંમત ગુણ્યા સ્થાનની કિંમત.",
    "Place value of the 4?": "4 ની સ્થાનકિંમત?",
    "In 74,057, what is the place value of 4?": "74,057 માં 4 ની સ્થાનકિંમત શું છે?",
    "Which column is that digit standing in?": "તે અંક કયા ખાનામાં ઊભો છે?",
    "Place value of the 9?": "9 ની સ્થાનકિંમત?",
    "What is the place value of 9 in 9,14,680?": "9,14,680 માં 9 ની સ્થાનકિંમત શું છે?",
    "Count the places from the right. Where does the nine stand?": "જમણી બાજુથી સ્થાન ગણો. નવ ક્યાં ઊભો છે?",
    "Hundreds digit: place value?": "શતકનો અંક: સ્થાનકિંમત?",
    "What is the place value of the hundreds digit in 74,057?": "74,057 માં શતકના અંકની સ્થાનકિંમત શું છે?",
    "Which digit stands in the hundreds place?": "શતકના સ્થાને કયો અંક છે?",
    "Adding up the worths gives the expanded form": "કિંમતોનો સરવાળો વિસ્તૃત રૂપ આપે છે",
    "Every digit has two cards. Build a row of addends that adds back to the number.": "દરેક અંકનાં બે કાર્ડ છે. એવી હાર બનાવો જેનો સરવાળો તે જ સંખ્યા થાય.",
    "How many addends should the row have?": "હારમાં કેટલાં પદ હોવાં જોઈએ?",
    "Does your row add back to the number in the chart?": "શું તમારી હારનો સરવાળો ચાર્ટની સંખ્યા જેટલો છે?",
    "The expanded form is the place values written out and added.": "વિસ્તૃત રૂપમાં સ્થાનકિંમતો અલગ લખીને ઉમેરાય છે.",
    "You learned: expanded form is the place values written out and added.": "તમે શીખ્યા: વિસ્તૃત રૂપ એટલે સ્થાનકિંમતો લખીને ઉમેરવી.",
    "Expand 84,536": "84,536 નું વિસ્તૃત રૂપ",
    "Write 84,536 in expanded form. Move one card of each digit down into the row, then press enter.": "84,536 ને વિસ્તૃત રૂપમાં લખો. દરેક અંકનું એક કાર્ડ નીચે હારમાં લાવો, પછી એન્ટર દબાવો.",
    "What is this digit worth where it is standing?": "આ અંક જ્યાં ઊભો છે ત્યાં તેની કિંમત કેટલી છે?",
    "Expand 47,250": "47,250 નું વિસ્તૃત રૂપ",
    "Write 47,250 in expanded form.": "47,250 ને વિસ્તૃત રૂપમાં લખો.",
    "Does the zero need a card of its own?": "શું શૂન્યને પોતાનું અલગ કાર્ડ જોઈએ?",
    "Expand 7,52,953": "7,52,953 નું વિસ્તૃત રૂપ",
    "Write 7,52,953 in expanded form.": "7,52,953 ને વિસ્તૃત રૂપમાં લખો.",
    "Which card belongs to the lakhs place?": "લાખના સ્થાનનું કાર્ડ કયું છે?",
    "Rolling the expanded form back into one number": "વિસ્તૃત રૂપને ફરી એક સંખ્યામાં ફેરવવું",
    "Put each addend back in its own column. What number did you make?": "દરેક પદને તેના પોતાના ખાનામાં પાછું મૂકો. તમે કઈ સંખ્યા બનાવી?",
    "Is any column still standing empty?": "શું કોઈ ખાનું હજી ખાલી છે?",
    "An empty place still needs a digit to hold it open.": "ખાલી સ્થાનને પકડી રાખવા પણ એક અંક જોઈએ.",
    "Rebuilding the standard form is the only check an expanded form has.": "પ્રમાણિત રૂપ ફરી બનાવવું એ જ વિસ્તૃત રૂપની એકમાત્ર ચકાસણી છે.",
    "You learned: rebuilding the standard form checks an expanded form.": "તમે શીખ્યા: પ્રમાણિત રૂપ ફરી બનાવીને વિસ્તૃત રૂપ ચકાસાય.",
    "Which number?": "કઈ સંખ્યા?",
    "4,00,000 plus 50,000 plus 6,000 plus 900 plus 20 plus 3. Which number is that?": "4,00,000 વત્તા 50,000 વત્તા 6,000 વત્તા 900 વત્તા 20 વત્તા 3. આ કઈ સંખ્યા છે?",
    "Which place does this addend name?": "આ પદ કયા સ્થાનનું નામ આપે છે?",
    "Standard form?": "પ્રમાણિત રૂપ?",
    "7 times 1,00,000, 8 times 10,000, 2 times 1,000, 9 times 100, 6 times 10 and 5 times 1. Write it in standard form.": "7 ગુણ્યા 1,00,000, 8 ગુણ્યા 10,000, 2 ગુણ્યા 1,000, 9 ગુણ્યા 100, 6 ગુણ્યા 10 અને 5 ગુણ્યા 1. તેને પ્રમાણિત રૂપમાં લખો.",
    "Which digit goes in the lakhs place?": "લાખના સ્થાને કયો અંક આવશે?",
    "6 times 1,00,000, 8 times 10,000, 4 times 100 and 9 times 10. Type the number they make.": "6 ગુણ્યા 1,00,000, 8 ગુણ્યા 10,000, 4 ગુણ્યા 100 અને 9 ગુણ્યા 10. તેનાથી બનતી સંખ્યા લખો.",
    "Which places are missing from the list?": "યાદીમાં કયાં સ્થાન નથી?",
    /* the working area's own words, and the choices */
    "ones": "એકમ", "tens": "દશક", "hundreds": "શતક", "thousands": "હજાર", "ten thousands": "દસ હજાર", "lakhs": "લાખ",
    "adds to": "સરવાળો", "placed": "મૂક્યાં", "digits split": "અંક ખૂલ્યા", "face value": "મૂળ કિંમત", "place value": "સ્થાનકિંમત",
    "Show all": "બધું બતાવો", "Hide all": "બધું છુપાવો", "New number": "નવી સંખ્યા", "Expand": "વિસ્તારો", "Collapse": "સમેટો",
    "No": "ના", "Yes": "હા",
  },
};

/* ── the place value chart: six columns, lakhs to ones, pinned to the right ─────────────── */

const PLACES = ["ones", "tens", "hundreds", "thousands", "ten thousands", "lakhs"];
const NCOL = 6;
/* The chapter's own content colours (its writeup.stage): a digit takes its PERIOD's colour, ones
   deep blue, thousands green, lakhs vermilion. Amber marks the digit under discussion; grey is a
   zero holding a place open. A place is told by its heading and a period by its band first. */
const PERIODS = [
  { name: "ones", color: CONTENT.hundred, places: [0, 1, 2] },
  { name: "thousands", color: CONTENT.one, places: [3, 4] },
  { name: "lakhs", color: CONTENT.pointer, places: [5] },
];
const PERIOD_OF = [0, 0, 0, 1, 1, 2];
const AMBER = CONTENT.ten;
const ZERO = "#767676";
const colorOf = (k: number) => PERIODS[PERIOD_OF[Math.min(Math.max(k, 0), 5)]].color;
/* numerals take a deeper ink of their period colour (4.5:1 on white and on the panel) */
const inkOf = (k: number) => shade(colorOf(k), 0.25);
const pow10 = (k: number) => Math.pow(10, k);
/* worths in Indian commas from 1,000 up (pipeline rule): 4,000, 80,000, 7,00,000 */
const bookForm = (v: number) => indian(v);
const YES_NO = [{ id: "no", label: "No" }, { id: "yes", label: "Yes" }];

/* kinds: face (type the face value of the marked digit) · swap (swap two marked digits, then
          say whether their face values change) · worth (type the place value of the marked digit;
          its place value card is face down) · expand (send one card of each digit into the row,
          Enter commits the row) · fold (drop each addend into its column, then type the number) */
const PHASES = [
  {
    n: 1,
    concept: "The digit you see, and what the digit is worth",
    conceptId: "M1.S2.T3.C8", objectiveIds: ["O3"],
    says: ["Tap them one at a time. Is the face value the same every time?"],
    /* tries, as the plan writes it: A miss is answered three ways at once and none of them is the answer. First rung, from the item's own miss line: read the card with the bare digit on it. Second rung, the phase's: is that card the same under every digit? Third rung: the chart is cut to two columns holding the same digit twice and the child reads both face value cards. The word pad stays open behind all three. */
    ladder: ["Is that card the same under every digit?", "Look at just two of the same digit. Read both face value cards."],
    closing: "The face value of a digit is the digit itself, wherever it sits.",
    /* the summary page's row: "You learned: ..." in at most 72 characters */
    learned: "You learned: a digit's face value is the digit itself, wherever it sits.",
    /* the traceback for a miss, in one line (it goes into the sidecar) */
    traceback: "That digit's cards come down one at a time: the face value card with its heading covered, then the place value card.",
    items: [
      /* learn ML1: answer in the plan = Five, the same as every other five in the number */
      { qid: "M1.S2.T3.C8:ML1", kind: "face", number: 55555, place: 2, answer: 5, winMs: 1900, ask: "Hundreds digit: face value?",
        say: "In 55,555, what is the face value of the five standing in the hundreds place?", miss: "Read the card with the bare digit on it." },
      /* practice 1: answer in the plan = Nine */
      { qid: "M1.S2.T3.C8:1", kind: "face", number: 914680, place: 5, answer: 9, winMs: 1900, ask: "Face value of the 9?",
        say: "What is the face value of 9 in 9,14,680?", miss: "Does a face value change with the place?" },
      /* practice 2: answer in the plan = No. A face value is the digit itself, wherever it happens to sit */
      { qid: "M1.S2.T3.C8:2", kind: "swap", number: 55555, pair: [3, 1], answer: "no", choices: YES_NO, winMs: 1900, ask: "Do their face values change?",
        say: "Two of the digits in 55,555 are swapped over. Tap a marked one to swap them. Do their face values change?", miss: "Did the digit itself change when it moved?" },
    ],
  },
  {
    n: 2,
    concept: "Where a digit sits decides what it is worth",
    conceptId: "M1.S2.T3.C9", objectiveIds: ["O3"],
    says: ["Read the place value cards along the row. Drag a digit to a new column and watch its worth."],
    /* tries, as the plan writes it: First rung, from the item: which column is that digit standing in? Second rung, the phase's: what is one of that column worth? Third rung: only that column and its heading are left lit and the child reads the multiplication written under it. The number pad stays open. */
    ladder: ["What is one of that column worth?", "Read the heading above it. Multiply the digit by the value of that place."],
    closing: "Place value is the face value multiplied by the value of the place it sits in.",
    /* the summary page's row: "You learned: ..." in at most 72 characters */
    learned: "You learned: place value is face value times the value of its place.",
    /* the traceback for a miss, in one line (it goes into the sidecar) */
    traceback: "The digit lifts and sets down with the rest dimmed; the headings light from the ones up while its worth grows ten times a step.",
    items: [
      /* learn ML2: answer in the plan = 4000 */
      { qid: "M1.S2.T3.C9:ML2", kind: "worth", number: 74057, place: 3, answer: 4000, winMs: 1600, ask: "Place value of the 4?",
        say: "In 74,057, what is the place value of 4?", miss: "Which column is that digit standing in?" },
      /* practice 3: answer in the plan = 9,00,000 */
      { qid: "M1.S2.T3.C9:3", kind: "worth", number: 914680, place: 5, answer: 900000, winMs: 1600, ask: "Place value of the 9?",
        say: "What is the place value of 9 in 9,14,680?", miss: "Count the places from the right. Where does the nine stand?" },
      /* practice 4: answer in the plan = 0. The place value of zero is zero in any place at all.
         Worded by its place, not "of 0": naming the zero would print the answer. */
      { qid: "M1.S2.T3.C9:4", kind: "worth", number: 74057, place: 2, answer: 0, winMs: 1600, ask: "Hundreds digit: place value?",
        say: "What is the place value of the hundreds digit in 74,057?", miss: "Which digit stands in the hundreds place?" },
    ],
  },
  {
    n: 3,
    concept: "Adding up the worths gives the expanded form",
    conceptId: "M1.S2.T3.C10", objectiveIds: ["O4"],
    says: ["Every digit has two cards. Build a row of addends that adds back to the number."],
    /* tries, as the plan writes it: First rung, from the item: what is this digit worth where it is standing? Second rung, the phase's: how many addends should the row have? Third rung: the chart is cut to three columns and the child expands those three. The number pad stays open. */
    ladder: ["How many addends should the row have?", "Does your row add back to the number in the chart?"],
    closing: "The expanded form is the place values written out and added.",
    /* the summary page's row: "You learned: ..." in at most 72 characters */
    learned: "You learned: expanded form is the place values written out and added.",
    /* the traceback for a miss, in one line (it goes into the sidecar) */
    traceback: "The child's row stays; under it each digit drops its place value card into a second row while the headings light along it.",
    items: [
      /* learn ML3: answer in the plan = 80,000 + 4000 + 500 + 30 + 6 */
      { qid: "M1.S2.T3.C10:ML3", kind: "expand", number: 84536, answer: "80,000 + 4,000 + 500 + 30 + 6", pad: "enter", winMs: 1900, ask: "Expand 84,536",
        say: "Write 84,536 in expanded form. Move one card of each digit down into the row, then press enter.", miss: "What is this digit worth where it is standing?" },
      /* practice 5: answer in the plan = 40,000 + 7000 + 200 + 50 */
      { qid: "M1.S2.T3.C10:5", kind: "expand", number: 47250, answer: "40,000 + 7,000 + 200 + 50", pad: "enter", winMs: 1900, ask: "Expand 47,250",
        say: "Write 47,250 in expanded form.", miss: "Does the zero need a card of its own?" },
      /* practice 6: answer in the plan = 7,00,000 + 50,000 + 2000 + 900 + 50 + 3 */
      { qid: "M1.S2.T3.C10:6", kind: "expand", number: 752953, answer: "7,00,000 + 50,000 + 2,000 + 900 + 50 + 3", pad: "enter", winMs: 1900, ask: "Expand 7,52,953",
        say: "Write 7,52,953 in expanded form.", miss: "Which card belongs to the lakhs place?" },
    ],
  },
  {
    n: 4,
    concept: "Rolling the expanded form back into one number",
    conceptId: "M1.S2.T3.C11", objectiveIds: ["O4"],
    says: ["Put each addend back in its own column. What number did you make?"],
    /* tries, as the plan writes it: First rung, from the item: which place does this addend name? Second rung, the phase's: is any column still standing empty? Third rung: the row is cut to three addends with one place missing between them and the child fills that chart. The number pad stays open. */
    ladder: ["Is any column still standing empty?", "An empty place still needs a digit to hold it open."],
    closing: "Rebuilding the standard form is the only check an expanded form has.",
    /* the summary page's row: "You learned: ..." in at most 72 characters */
    learned: "You learned: rebuilding the standard form checks an expanded form.",
    /* the traceback for a miss, in one line (it goes into the sidecar) */
    traceback: "Each addend travels to the column it names, from the left, its heading lighting; a grey zero drops into every open column.",
    items: [
      /* learn ML4: answer in the plan = 4,56,923 */
      { qid: "M1.S2.T3.C11:ML4", kind: "fold", form: "plus", folds: [[4, 5], [5, 4], [6, 3], [9, 2], [2, 1], [3, 0]], answer: 456923, winMs: 2000, ask: "Which number?",
        say: "4,00,000 plus 50,000 plus 6,000 plus 900 plus 20 plus 3. Which number is that?", miss: "Which place does this addend name?" },
      /* practice 7: answer in the plan = 7,82,965 */
      { qid: "M1.S2.T3.C11:7", kind: "fold", form: "times", folds: [[7, 5], [8, 4], [2, 3], [9, 2], [6, 1], [5, 0]], answer: 782965, winMs: 2000, ask: "Standard form?",
        say: "7 times 1,00,000, 8 times 10,000, 2 times 1,000, 9 times 100, 6 times 10 and 5 times 1. Write it in standard form.", miss: "Which digit goes in the lakhs place?" },
      /* practice 8: answer in the plan = 6,80,490. The thousands and the ones places are empty, so zeros hold them open */
      { qid: "M1.S2.T3.C11:8", kind: "fold", form: "times", folds: [[6, 5], [8, 4], [4, 2], [9, 1]], answer: 680490, winMs: 2400, ask: "Standard form?",
        say: "6 times 1,00,000, 8 times 10,000, 4 times 100 and 9 times 10. Type the number they make.", miss: "Which places are missing from the list?" },
    ],
  },
];

/* The numbers, rows, sizes and targets the working area needs (they go into the sidecar too). */
const CW = 150;                                   /* a column; six of them, ones pinned right */
const colX = (k: number) => W.w - (k + 1) * CW;
const colC = (k: number) => colX(k) + CW / 2;
const LEFT = colX(NCOL - 1);                      /* 186: the margin to its left holds labels and keys */
const G = {
  period: 22, headTop: 30, headH: 56, cellTop: 92, cellH: 88, digit: 162,
  face: { y: 190, h: 62, w: 96 }, link: 277, pv: { y: 286, h: 62, w: 144 },
  row: { y: 376, h: 64 }, row2: { y: 460, h: 62 }, split: 360,
};
const MODEL = {
  columnWidth: CW, places: PLACES, periods: PERIODS.map((p) => ({ name: p.name, places: p.places })),
  cards: { face: G.face, placeValue: G.pv, row: G.row, secondRow: G.row2 },
};

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* a row of addends written as text ("80,000 + 4000 + 6"): its non-zero terms, biggest first */
const termsOf = (v: any) => String(v ?? "").split("+").map((s) => leadNumber(s)).filter((x: any) => x !== null && x !== 0).sort((a: any, b: any) => b - a) as number[];
const rowText = (vals: number[]) => vals.filter((x) => x !== 0).sort((a, b) => b - a).map(bookForm).join(" + ");

/* judge: a row matches term for term (a zero term is no term: the book leaves it out);
   the swap takes the word; every other answer is a number */
const judge = (item: any, v: any) => {
  if (item.kind === "expand") {
    const a = termsOf(v), b = termsOf(item.answer);
    return a.length === b.length && a.every((x, i) => x === b[i]);
  }
  if (item.kind === "swap") return String(v ?? "").trim().toLowerCase() === item.answer;
  return leadNumber(v) === item.answer;
};

/* every answer re-derived from the written numeral, character by character, sharing no code
   with judge() or the chart */
const oracle = () => PHASES.every((p: any) => p.items.every((it: any) => {
  const s = String(it.number ?? "");
  const charAt = (place: number) => s.charAt(s.length - 1 - place);
  if (it.kind === "face") return it.answer === Number(charAt(it.place));
  if (it.kind === "swap") {
    const a = s.split(""), i = s.length - 1 - it.pair[0], j = s.length - 1 - it.pair[1], b = a.slice();
    b[i] = a[j]; b[j] = a[i];
    /* a digit carries its own face value with it: after the swap each still reads what it did */
    return it.answer === (b[j] === a[i] && b[i] === a[j] ? "no" : "yes");
  }
  if (it.kind === "worth") return it.answer === (charAt(it.place) === "0" ? 0 : Number(charAt(it.place) + "0".repeat(it.place)));
  if (it.kind === "expand") {
    const want = s.split("").map((c, i) => (c === "0" ? "" : c + "0".repeat(s.length - 1 - i))).filter(Boolean);
    const got = String(it.answer).split("+").map((t) => t.replace(/[^0-9]/g, ""));
    return got.length === want.length && got.every((t, i) => t === want[i]);
  }
  if (it.kind === "fold") {
    const cols = "000000".split("");
    it.folds.forEach(([d, k]: number[]) => { cols[5 - k] = String(d); });
    return it.answer === Number(cols.join(""));
  }
  return false;
}));

/* the misconception each kind is built to break; judge must reject it */
const nearMiss = (item: any) => {
  if (item.kind === "face") return item.answer * pow10(item.place);            /* the place value: 500 */
  if (item.kind === "swap") return "yes";
  if (item.kind === "worth") return item.answer === 0 ? pow10(item.place) : Number(String(item.number).charAt(String(item.number).length - 1 - item.place)); /* the face value */
  if (item.kind === "expand") return String(item.number).split("").filter((c) => c !== "0").join(" + "); /* 8 + 4 + 5 + 3 + 6 */
  const skip = item.folds.map((pt: number[]) => pt[0]).join("");              /* digits side by side, empty places lost */
  if (Number(skip) !== item.answer) return Number(skip);
  const s = String(item.answer);
  return Number(s.slice(0, -2) + s.slice(-1));                                  /* a place lost on the way */
};

/* the forms of an answer that no question, hint or ladder line may print */
const answerForms = (item: any) => {
  if (item.kind === "face") return []; /* the face value IS the digit the question points at: nothing to hide */
  if (item.kind === "swap") return [item.answer];
  if (item.kind === "expand") { const t = termsOf(item.answer); return [String(item.answer), ...t.map(bookForm), ...t.map(String)]; }
  return [String(item.answer), indian(item.answer), words(item.answer)];
};
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => item.answer;
/* what the slot shows: a row as the total it adds to, a word choice by its label */
const format = (t: any) => {
  const s = String(t ?? "");
  if (s.includes("+")) return "= " + indian(termsOf(s).reduce((a, b) => a + b, 0));
  if (s === "no" || s === "yes") return s === "no" ? "No" : "Yes";
  return s;
};

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => {
  if (item.kind === "expand") { HOOK.setRow && HOOK.setRow(item.answer); setTimeout(() => HOOK.enter && HOOK.enter(), 60); return; }
  if (item.kind === "fold") { HOOK.fold && HOOK.fold(); setTimeout(() => T.submit(item.answer), 60); return; }
  return T.submit(item.answer);
};
/* the agent's answer(): a row is laid on the working area card by card, as a child would; the
   addends of a fold are dropped into their columns, then the number is typed; the rest is typed */
const answer = (item: any, v: any) => {
  if (item.kind === "expand") return HOOK.setRow ? HOOK.setRow(v) : false;
  if (item.kind === "fold" && HOOK.fold) HOOK.fold();
  return undefined;
};
/* the agent's check() before Enter: nothing waits on this stage, so Enter is pressed */
const check = () => (HOOK.check ? HOOK.check() : undefined);

/* ── the working area: 1086 x 528, origin at its top-left ────────────────────────────────────
   Countable things use CONTENT colours (url(#gHundred|gTen|gOne|gBead|gPointer)); coloured numerals
   and words use a deeper ink, shade(colour, 0.25), so they read at 4.5:1. Type uses T.* only.
   Pieces: drag = useDrag(onDrop) then {...control(id, label), ...drag.bind(pay), ...drag.keys(pay)};
   taps = <Hit id x y w h onPress label />. One <Invite/> marks the one thing to touch.
   Nothing is written here that the voice already says. `wrong` = { value, tries } after a miss:
   lock, redraw the mathematics in steps (the traceback), unlock; never mark it, never reset it.
   stage === "free" is Free play (the plan's writeup.freePlay): no target, every control unlocked. */
/* one item -> what the working area holds */
const setupOf = (it: any) => {
  const kind = it.kind || "free";
  return { kind, number: kind === "fold" ? it.answer : it.number || 0, place: it.place ?? -1, pair: it.pair || [], parts: it.folds || [], form: it.form || "plus" };
};
/* six columns; a column holds { d, home } (home = the column the digit started in) or nothing */
const cellsOf = (s: any) => {
  const ds = String(s.number).split("").reverse().map(Number);
  return Array.from({ length: NCOL }, (_, k) => (s.kind !== "fold" && k < ds.length ? { d: ds[k], home: k } : null));
};
/* 0 = no cards, 1 = the face value card, 2 = both cards. Phases 2 and 3 open already split. */
const showOf = (s: any, cells: any[]) => cells.map((c) => (c && (s.kind === "worth" || s.kind === "expand") ? 2 : 0));
const valueOf = (cells: any[]) => cells.reduce((a, c, k) => a + (c ? c.d * pow10(k) : 0), 0);
/* a column left empty below the highest digit is held open by a grey zero */
const holdOpen = (c: any[]) => {
  const top = c.reduce((m, x, k) => (x ? k : m), -1);
  return c.map((x, k) => (x || k > top ? x : { d: 0, home: k, zero: true }));
};
/* a move: the two columns swap what they hold, so no column ever holds two digits */
const moved = (cells: any[], a: number, b: number) => { const c = cells.slice(); const t = c[a]; c[a] = c[b]; c[b] = t; return holdOpen(c); };
const cardVal = (e: any, cells: any[]) => { const c = cells[e.k]; return !c ? 0 : e.which === "face" ? c.d : c.d * pow10(e.k); };
/* width of a line of numerals at a size (Poppins bold digits run about 0.64 em) */
const tw = (s: string, size: number) => String(s).split("").reduce((a, ch) => a + (ch === "," ? 0.3 : ch === " " ? 0.28 : 0.64), 0) * size;
/* a row of cards, centred under the chart (or under the whole area when it is wider) */
const rowLayout = (ws: number[], gap = 40) => {
  const total = ws.reduce((a, b) => a + b, 0) + gap * Math.max(0, ws.length - 1);
  let x = total <= W.w - LEFT ? LEFT + (W.w - LEFT - total) / 2 : Math.max(0, (W.w - total) / 2);
  return ws.map((w) => { const x0 = x; x += w + gap; return x0; });
};
const FREE_NUMS = [704352, 55555, 74057, 914680, 84536, 47250, 752953, 456923, 680490];

const WD_CSS = `
.wd-move{transition:transform 440ms cubic-bezier(.3,.7,.25,1)}
.wd-drop{animation:wdDrop 420ms ease-out both}
@keyframes wdDrop{from{opacity:0;transform:translateY(-24px)}to{opacity:1;transform:none}}
.wd-grab{cursor:grab;touch-action:none}
.wd-tap{cursor:pointer;touch-action:none}
@media (prefers-reduced-motion:reduce){.wd-move{transition:none}.wd-drop{animation:none}}
`;

function Work({ item, index, stage, wrong, api, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();
  const free = stage === "free";
  const first = setupOf(item);
  const [cfg, setCfg] = useState<any>(first);
  const [cells, setCells] = useState<any[]>(() => cellsOf(first));
  const [show, setShow] = useState<number[]>(() => showOf(first, cellsOf(first)));
  const [row, setRow] = useState<any[]>([]);               /* the child's row: [{ k, which: "face" | "pv" }] */
  const [placed, setPlaced] = useState<boolean[]>(() => first.parts.map(() => false));
  const [hl, setHl] = useState<number[]>([]);               /* headings lit */
  const [cover, setCover] = useState<number | null>(null);  /* a heading covered while its face value is read */
  const [lift, setLift] = useState<number | null>(null);
  const [dim, setDim] = useState(false);
  const [reveal, setReveal] = useState(false);              /* the face-down place value card turned up */
  const [grow, setGrow] = useState<string | null>(null);    /* that card's worth while it grows ten times a step */
  const [was, setWas] = useState<any>(null);                /* the hollow card a moved digit leaves behind */
  const [cmp, setCmp] = useState<number[]>([]);             /* the second row laid under the child's row */
  const [shift, setShift] = useState<any>({});
  const [snap, setSnap] = useState(false);
  const [bounce, setBounce] = useState<string | null>(null);
  const [pop, setPop] = useState<number | null>(null);
  const [touched, setTouched] = useState(false);
  const [swapped, setSwapped] = useState(false);
  const [tapped, setTapped] = useState<number | null>(null);
  const [expanded, setExpanded] = useState(false);          /* free play: the row of addends is out */
  const [freeAt, setFreeAt] = useState(0);
  const setupFor = useRef(0);
  const flashT = useRef<any>(null);
  const S = useRef<any>({});
  S.current = { cells, row, placed, show, cfg, busy: tl.busy };
  const busy = tl.busy;
  const kind = cfg.kind;
  const putCells = (c: any[]) => { S.current.cells = c; setCells(c); };
  const putShow = (s: number[]) => { S.current.show = s; setShow(s); };
  const putRow = (r: any[]) => { S.current.row = r; setRow(r); };
  const putPlaced = (p: boolean[]) => { S.current.placed = p; setPlaced(p); };
  const flash = (ks: number[], ms = 700) => { clearTimeout(flashT.current); setHl(ks); flashT.current = setTimeout(() => setHl([]), ms); };
  useEffect(() => () => clearTimeout(flashT.current), []);

  const load = (s: any) => {
    tl.stop(); clearTimeout(flashT.current);
    const c = cellsOf(s), sh = showOf(s, c), p = s.parts.map(() => false);
    setCfg(s); S.current.cfg = s; putCells(c); putShow(sh); putRow([]); putPlaced(p);
    setHl([]); setCover(null); setLift(null); setDim(false); setReveal(false); setGrow(null); setWas(null); setCmp([]);
    setShift({}); setSnap(false); setBounce(null); setPop(null); setTouched(false); setSwapped(false); setTapped(null); setExpanded(false);
    api.lock(false);
  };
  useEffect(() => {
    if (stage === "ask" && setupFor.current !== index) { setupFor.current = index; load(setupOf(item)); }
  }, [stage, index]);
  /* free play (the plan's freePlay): any of a set of numbers, every digit tappable and draggable,
     show all, the row of addends out and back, nothing to get right */
  useEffect(() => {
    if (!free) return;
    setupFor.current = -2;
    setFreeAt(0);
    load(setupOf({ kind: "free", number: FREE_NUMS[0] }));
  }, [free]);

  /* the cells now at a and b are drawn where they came from, then glide home */
  const slideSteps = (next: any[], a: number, b: number) => [
    [40, () => { putCells(next); setSnap(true); setShift({ [a]: colX(b) - colX(a), [b]: colX(a) - colX(b) }); }],
    [30, () => { setSnap(false); setShift({}); api.sfx.tick(); }],
    [460, () => {}],
  ];

  const digitLive = !busy && ((stage === "ask" && (kind === "face" || kind === "swap" || kind === "worth" || kind === "expand")) || (free && !expanded));
  const popT = useRef<any>(null);
  useEffect(() => () => clearTimeout(popT.current), []);
  /* phase 3: a tap on a digit lights both of its cards: one of the two goes into the row */
  const popBoth = (k: number) => { clearTimeout(popT.current); setPop(k); popT.current = setTimeout(() => setPop(null), 1000); };
  const isAmber = (c: any) => !!c && ((kind === "swap" && cfg.pair.includes(c.home)) || ((kind === "face" || kind === "worth") && c.home === cfg.place));

  const split = (k: number) => {
    const s = S.current.show.slice();
    s[k] = free && s[k] ? 0 : 2;
    putShow(s); setTapped(k); api.sfx.tick();
  };
  const swapPair = () => {
    const c = S.current.cells;
    const a = c.findIndex((x: any) => x && x.home === cfg.pair[0]), b = c.findIndex((x: any) => x && x.home === cfg.pair[1]);
    if (a < 0 || b < 0) return;
    const sh = S.current.show.slice(); sh[a] = 2; sh[b] = 2;
    putShow(sh); setSwapped(true); setTouched(true);
    tl.run(slideSteps(moved(c, a, b), a, b));
  };
  const tapDigit = (k: number) => {
    if (!digitLive || !S.current.cells[k]) return;
    setTouched(true);
    if (kind === "swap" && isAmber(S.current.cells[k])) { swapPair(); return; }
    if (kind === "worth") { setTapped(k); flash([k], 1100); return; } /* read the column: its heading lights */
    if (kind === "expand") { setTapped(k); popBoth(k); api.sfx.tick(); return; }
    split(k);
  };
  const dropDigit = (k: number, t: number) => {
    const before = S.current.cells, beforeShow = S.current.show, c = before[k];
    if (!digitLive || !c || t === k || kind === "expand") return;
    setTouched(true);
    if (kind === "swap") { if (isAmber(c)) swapPair(); return; }
    if (kind === "face") { split(k); return; }
    const hidden = kind === "worth" && !reveal && c.home === cfg.place && k === cfg.place;
    const sh = beforeShow.slice(); sh[k] = beforeShow[t]; sh[t] = beforeShow[k]; if (free) { sh[t] = 2; sh[k] = before[t] ? sh[k] : 2; }
    putShow(sh); setTapped(t);
    setWas({ k, text: hidden ? "" : bookForm(c.d * pow10(k)) });
    const next = moved(before, k, t);
    if (free) { tl.run([...slideSteps(next, k, t), [300, () => setHl([k])], [500, () => setHl([t])], [600, () => setHl([])]]); return; }
    /* in a question the digit goes home again afterwards: the question is about the number as asked */
    api.lock(true);
    tl.run([...slideSteps(next, k, t), [500, () => setHl([k])], [700, () => setHl([t])], [1100, () => setHl([])],
      ...slideSteps(before, k, t), [60, () => { putShow(beforeShow); setWas(null); }]], () => api.lock(false));
  };

  /* phase 3: one card of a digit goes down into the row; a zero's card slides out of it on its own */
  const cardLive = !busy && stage === "ask" && kind === "expand";
  const sendCard = (k: number, which: string) => {
    const c = S.current.cells[k], r = S.current.row;
    if (!cardLive || !c) return;
    setTouched(true);
    if (r.some((e: any) => e.k === k && e.which === which)) { putRow(r.filter((e: any) => e.k !== k)); api.sfx.tick(); return; }
    if (c.d === 0) { tl.run([[20, () => setBounce(k + which)], [460, () => setBounce(null)], [440, () => {}]]); return; }
    putRow([...r.filter((e: any) => e.k !== k), { k, which }]); api.sfx.tick();
  };
  const takeBack = (k: number) => {
    if (!cardLive) return;
    setTouched(true); putRow(S.current.row.filter((e: any) => e.k !== k)); api.sfx.tick();
  };

  /* phase 4: an addend drops into the column it names, and sets its digit down there */
  const partLive = !busy && stage === "ask" && kind === "fold";
  const place = (i: number, quiet?: boolean) => {
    const p = S.current.placed, pt = S.current.cfg.parts[i];
    if (!pt || p[i]) return;
    const np = p.slice(); np[i] = true; putPlaced(np);
    const c = S.current.cells.slice(); c[pt[1]] = { d: pt[0], home: pt[1] }; putCells(c);
    if (!quiet) { setTouched(true); api.sfx.tick(); flash([pt[1]]); }
  };

  /* the keys on the margin */
  const allShown = cells.every((c, k) => !c || show[k] > 0);
  const showAll = () => {
    if (busy) return;
    if (allShown) { if (free) putShow(S.current.show.map(() => 0)); return; }
    putShow(S.current.cells.map((c: any) => (c ? 2 : 0))); setTouched(true); setWas(null); api.sfx.tick();
  };
  const expandFree = () => {
    if (busy) return;
    setWas(null);
    if (expanded) {
      const ks = S.current.row.map((e: any) => e.k).sort((a: number, b: number) => a - b);
      tl.run(ks.map((k: number) => [200, () => { putRow(S.current.row.filter((e: any) => e.k !== k)); api.sfx.tick(); }]), () => setExpanded(false));
      return;
    }
    setExpanded(true);
    putShow(S.current.cells.map((c: any) => (c ? 2 : 0)));
    const ks = S.current.cells.map((c: any, k: number) => (c && c.d ? k : -1)).filter((k: number) => k >= 0).sort((a: number, b: number) => b - a);
    tl.run(ks.map((k: number) => [240, () => { putRow([...S.current.row, { k, which: "pv" }]); api.sfx.tick(); }]));
  };
  const nextNumber = () => {
    if (busy) return;
    const i = (freeAt + 1) % FREE_NUMS.length;
    load(setupOf({ kind: "free", number: FREE_NUMS[i] })); setFreeAt(i);
  };

  const drag = useDrag((payload: any, p: any, didMove: boolean) => {
    const colAt = (x: number) => { const k = Math.floor((W.w - x) / CW); return x >= LEFT && k >= 0 && k < NCOL ? k : null; };
    const t = didMove ? colAt(p.x) : null;
    if (payload.src === "digit") { if (!didMove) tapDigit(payload.k); else if (t !== null && p.y < G.split) dropDigit(payload.k, t); }
    else if (payload.src === "card") { if (!didMove || p.y > G.split) sendCard(payload.k, payload.which); }
    else if (payload.src === "row") { if (!didMove || p.y < G.split) takeBack(payload.k); }
    else if (payload.src === "part" && partLive) {
      if (!didMove) place(payload.i);
      else if (p.y < G.split && t === cfg.parts[payload.i][1]) place(payload.i);
    }
  });

  /* Enter commits the row (phase 3); everything else is typed or chosen on the pad */
  const rowString = () => S.current.row.slice().sort((a: any, b: any) => b.k - a.k).map((e: any) => bookForm(cardVal(e, S.current.cells))).join(" + ");
  const enterFn: any = stage === "ask" && kind === "expand" ? () => { if (!S.current.busy && S.current.row.length) api.submit(rowString()); } : null;
  api.onEnter(enterFn);
  HOOK.enter = () => enterFn && enterFn();
  HOOK.fold = () => S.current.cfg.parts.forEach((_: any, i: number) => place(i, true));
  /* a row written as text is laid card by card: a worth takes a place value card, a bare digit its face value card */
  HOOK.setRow = (v: any) => {
    const terms = termsOf(v), c = S.current.cells, used: number[] = [], out: any[] = [];
    if (!terms.length) return false;
    for (const t of terms) {
      let k = c.findIndex((x: any, j: number) => x && x.d && !used.includes(j) && x.d * pow10(j) === t), which = "pv";
      if (k < 0) { k = c.findIndex((x: any, j: number) => x && !used.includes(j) && x.d === t); which = "face"; }
      if (k < 0) return false;
      used.push(k); out.push({ k, which });
    }
    putRow(out); setTouched(true);
    return true;
  };

  /* ── the traceback: the mathematics redrawn in steps; nothing marked, nothing cleared ── */
  useEffect(() => {
    if (!wrong || stage !== "ask") return;
    api.lock(true);
    setTouched(true);
    const done = () => api.lock(false);
    const c0 = S.current.cells;
    const setShowAt = (k: number, v: number) => { const s = S.current.show.slice(); s[k] = Math.max(s[k], v); putShow(s); };
    const leftFirst = c0.map((x: any, k: number) => (x ? k : -1)).filter((k: number) => k >= 0).sort((a: number, b: number) => b - a);
    if (kind === "face") {
      const k = cfg.place;
      tl.run([[60, () => { const s = S.current.show.slice(); s[k] = 0; putShow(s); setCover(k); }],
        [600, () => { const s = S.current.show.slice(); s[k] = 1; putShow(s); setPop(k); }],
        [1500, () => setCover(null)],
        [600, () => { const s = S.current.show.slice(); s[k] = 2; putShow(s); }],
        [800, () => setPop(null)]], done);
    } else if (kind === "swap") {
      tl.run([[300, () => {}], ...leftFirst.map((k: number) => [560, () => { setShowAt(k, 1); setPop(k); }]), [600, () => setPop(null)]], done);
    } else if (kind === "worth") {
      const k = cfg.place, c = c0[k];
      const steps: any[] = [[60, () => { setDim(true); setWas(null); }], [400, () => setLift(k)], [650, () => setLift(null)]];
      for (let j = 0; j <= k; j++) { const jj = j; steps.push([620, () => { setHl([jj]); setGrow(c.d === 0 ? "0" : bookForm(c.d * pow10(jj))); }]); }
      steps.push([700, () => { setReveal(true); setGrow(null); setHl([k]); }], [900, () => { setDim(false); setHl([]); }]);
      tl.run(steps, done);
    } else if (kind === "expand") {
      if (!S.current.row.length) HOOK.setRow(wrong.value); /* the answer given stays: the row shows it */
      const ks = c0.map((x: any, k: number) => (x && x.d ? k : -1)).filter((k: number) => k >= 0).sort((a: number, b: number) => b - a);
      /* the second misconception: the zero left out of the number as well as the row (47,250 read as
         4,000 + 700 + 20 + 5). The chart collapses with the zero's column gone, so the number comes out
         one place shorter; then the grey zero goes back and the digits move out to their own columns. */
      const s = String(cfg.number), short = s.replace(/0/g, "");
      const lostZero = short !== s && short.length > 0 && (() => {
        const want = short.split("").map((c, i) => Number(c + "0".repeat(short.length - 1 - i))).sort((a, b) => b - a), got = termsOf(wrong.value);
        return got.length === want.length && got.every((x, i) => x === want[i]);
      })();
      const collapse: any[] = lostZero ? [
        [60, () => { putCells(cellsOf({ kind: "free", number: Number(short) })); setShow(S.current.show.map(() => 0)); S.current.show = S.current.show.map(() => 0); }],
        ...short.split("").map((_, i) => { const k = short.length - 1 - i; return [450, () => setHl([k])]; }),
        [1100, () => setHl([])],
        [60, () => { putCells(c0); putShow(c0.map((x: any) => (x ? 2 : 0))); api.sfx.tick(); }],
        [800, () => {}],
      ] : [];
      tl.run([[60, () => setCmp([])], ...collapse, [400, () => {}], ...ks.map((k: number) => [600, () => { setCmp((m) => [...m, k]); setHl([k]); }]), [700, () => setHl([])]], done);
    } else if (kind === "fold") {
      const order = cfg.parts.map((_: any, i: number) => i).sort((a: number, b: number) => cfg.parts[b][1] - cfg.parts[a][1]);
      const steps: any[] = [[400, () => {}]];
      order.forEach((i: number) => { if (!S.current.placed[i]) steps.push([700, () => { place(i, true); setHl([cfg.parts[i][1]]); api.sfx.tick(); }]); });
      steps.push([600, () => { setHl([]); putCells(holdOpen(S.current.cells)); }], [700, () => {}]);
      tl.run(steps, done);
    } else done();
  }, [wrong]);

  /* ── the win: the maths moves once more ── */
  useEffect(() => {
    if (stage !== "win") return;
    const leftFirst = S.current.cells.map((x: any, k: number) => (x ? k : -1)).filter((k: number) => k >= 0).sort((a: number, b: number) => b - a);
    if (kind === "face" || kind === "swap")
      tl.run(leftFirst.map((k: number) => [160, () => { const s = S.current.show.slice(); s[k] = Math.max(s[k], 1); putShow(s); }]));
    else if (kind === "worth") tl.run([[40, () => { setReveal(true); setHl([cfg.place]); }], [1000, () => setHl([])]]);
    else if (kind === "expand") {
      const ks = S.current.row.map((e: any) => e.k).sort((a: number, b: number) => b - a);
      tl.run([...ks.map((k: number) => [260, () => setHl([k])]), [400, () => setHl([])]]);
    } else if (kind === "fold") tl.run([[40, () => HOOK.fold()], [500, () => { putCells(holdOpen(S.current.cells)); api.sfx.tick(); }], [600, () => {}]]);
  }, [stage]);

  /* ── what the host can read back ── */
  const value = valueOf(cells);
  const focusK = kind === "face" || kind === "worth" ? cfg.place : kind === "swap" ? cells.findIndex((c) => c && c.home === cfg.pair[0]) : -1;
  const rowItems = row.slice().sort((a, b) => b.k - a.k).map((e) => {
    const v = cardVal(e, cells), text = bookForm(v);
    return { ...e, v, text, w: Math.max(80, tw(text, T.label) + 28) };
  });
  api.share({
    value, tappedDigit: tapped === null ? null : PLACES[tapped], showAll: allShown && cells.some(Boolean),
    expanded: kind === "expand" ? row.length > 0 : expanded,
    addends: kind === "fold" ? cfg.parts.map((pt: number[]) => pt[0] * pow10(pt[1])) : rowItems.map((r) => r.v),
    focusDigit: focusK >= 0 && cells[focusK] ? cells[focusK].d : null, focusPlace: focusK >= 0 ? focusK : null,
    complete: stage === "idle",
  });

  /* ── drawing ── */
  const dragging = drag.drag && drag.drag.moved ? drag.drag : null;
  const DP = dragging ? dragging.payload : null;
  const dragK = DP && DP.src === "digit" ? DP.k : null;
  const hiddenK = kind === "worth" && !reveal && !grow && stage !== "win" && stage !== "idle" && cells[cfg.place] && cells[cfg.place].home === cfg.place ? cfg.place : -1;
  const colK = (c: any, k: number) => (c.d === 0 ? ZERO : colorOf(k));
  const inkK = (c: any, k: number) => (c.d === 0 ? ZERO : dim && !isAmber(c) ? tint(inkOf(k), 0.5) : inkOf(k));
  const anyFace = cells.some((c, k) => c && show[k] > 0), anyPv = cells.some((c, k) => c && show[k] > 1);
  const inRow = (k: number, which: string) => row.some((e) => e.k === k && e.which === which);
  const nDigits = cells.filter(Boolean).length, nSplit = cells.filter((c, k) => c && show[k] > 0).length;
  const total = rowItems.reduce((a, r) => a + r.v, 0);
  const rowX = rowLayout(rowItems.map((r) => r.w));
  const partItems = cfg.parts.map(([d, k]: number[], i: number) => {
    const v = d * pow10(k), unit = bookForm(pow10(k));
    const w = cfg.form === "times" ? Math.max(80, tw(String(d), T.micro) + 22 + tw(unit, T.micro) + 30) : Math.max(80, tw(bookForm(v), T.label) + 28);
    return { i, d, k, v, unit, w };
  });
  const partX = rowLayout(partItems.map((p: any) => p.w), 34);
  const cmpItems = cmp.slice().sort((a, b) => b - a).map((k) => {
    const v = cells[k] ? cells[k].d * pow10(k) : 0, text = bookForm(v);
    return { k, text, w: Math.max(80, tw(text, T.label) + 28) };
  });
  const cmpX = rowLayout(cmpItems.map((r) => r.w));
  const runsMode = kind === "expand" || (free && expanded) ? "total" : kind === "fold" ? "placed" : "split";
  const quiet = mix(C.ink, C.panel, 0.5);

  let invite: any = null;
  if (stage === "ask" && !busy) {
    if (kind === "face" && focusK >= 0 && show[focusK] === 0) invite = { x: colC(focusK), y: G.cellTop + G.cellH / 2, r: 52 };
    else if ((kind === "swap" && !swapped) || (kind === "worth" && !touched)) invite = { x: colC(focusK), y: G.cellTop + G.cellH / 2, r: 52 };
    else if (kind === "expand" && index === 0 && !touched) {
      const top = cells.reduce((m, x, k) => (x ? k : m), -1);
      invite = { x: colC(top), y: G.cellTop + G.cellH / 2, r: 52 };
    } else if (kind === "fold" && index === 0 && !touched && partItems.length) invite = { x: partX[0] + partItems[0].w / 2, y: G.row.y + G.row.h / 2, r: 88 };
  }

  /* "n of m" in the language in use */
  const ofText = (a: number, b: number) => (lang === "hi" ? `${b} में से ${a}` : lang === "gu" ? `${b} માંથી ${a}` : `${a} of ${b}`);
  const heading = (k: number) => (PLACES[k] === "ten thousands" && lang === "en" ? ( /* one line fits in hi/gu */
    <g>
      <text x={colC(k)} y={G.headTop + 24} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>ten</text>
      <text x={colC(k)} y={G.headTop + 50} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>thousands</text>
    </g>
  ) : <text x={colC(k)} y={G.headTop + 38} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx(PLACES[k])}</text>);
  const hollow = (x: number, y: number, w: number, h: number) => (
    <rect x={x} y={y} width={w} height={h} rx={14} fill="none" stroke={C.rule} strokeWidth={2.5} strokeDasharray="8 7" />
  );
  /* the multiplication that links the two cards: a drawn times sign and the value of the place */
  const link = (k: number) => {
    const t = bookForm(pow10(k)), w = 22 + tw(t, T.micro), x0 = colC(k) - w / 2, cy = G.link - 10;
    return (
      <g>
        <path d={`M ${x0 + 2} ${cy - 6} L ${x0 + 14} ${cy + 6} M ${x0 + 14} ${cy - 6} L ${x0 + 2} ${cy + 6}`} stroke={C.ink} strokeWidth={3} strokeLinecap="round" />
        <text x={x0 + 22} y={G.link} fontSize={T.micro} fontWeight={600} fill={C.ink}>{t}</text>
      </g>
    );
  };
  const plus = (x: number, y: number) => <text x={x} y={y} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>+</text>;
  const bounceOf = (k: number, which: string) => ({ transform: `translateY(${bounce === k + which ? 86 : 0}px)` } as any);

  return (
    <g>
      <style>{WD_CSS}</style>

      {/* running count, in the runs zone (64,108): digits split, addends placed, or what the row adds to */}
      <g data-zone="runs">
        <rect x={0} y={-94} width={330} height={76} rx={RAD.panel} fill="url(#gPanel)" stroke={C.rule} strokeWidth={2} />
        {runsMode === "total" ? (
          <g>
            <text x={18} y={-56 + T.micro * 0.36} fontSize={T.micro} fontWeight={500} fill={C.ink}>{tx("adds to")}</text>
            {row.length > 0 && <text x={316} y={-56 + T.prompt * 0.36} textAnchor="end" fontSize={T.prompt} fontWeight={700} fill={C.ink}>{indian(total)}</text>}
          </g>
        ) : (
          <g>
            <text x={18} y={-56 + T.label * 0.36} fontSize={T.label} fontWeight={700} fill={C.ink}>
              {runsMode === "placed" ? ofText(placed.filter(Boolean).length, cfg.parts.length) : ofText(nSplit, nDigits)}
            </text>
            <text x={316} y={-56 + T.micro * 0.36} textAnchor="end" fontSize={T.micro} fontWeight={500} fill={C.ink}>{tx(runsMode === "placed" ? "placed" : "digits split")}</text>
          </g>
        )}
      </g>

      {/* period bands behind the columns */}
      {PERIODS.map((P, pi) => {
        const x0 = colX(Math.max(...P.places)), x1 = colX(Math.min(...P.places)) + CW;
        return (
          <g key={pi}>
            <rect x={x0 + 1} y={0} width={x1 - x0 - 2} height={G.cellTop + G.cellH + 6} rx={16} fill={P.color} fillOpacity={0.1} />
            <text x={(x0 + x1) / 2} y={G.period} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={shade(P.color, 0.25)}>{tx(P.name)}</text>
          </g>
        );
      })}

      {/* the columns: heading, then the digit */}
      {Array.from({ length: NCOL }).map((_, k) => {
        const x = colX(k), c = cells[k], lit = hl.includes(k), amber = isAmber(c);
        return (
          <g key={k}>
            <rect x={x + 4} y={G.headTop} width={CW - 8} height={G.headH} rx={14}
              fill={cover === k ? C.panel : lit ? tint(AMBER, 0.6) : tint(C.panel, 0.25)} stroke={lit ? AMBER : C.rule} strokeWidth={lit ? 3 : 1.5} />
            {cover !== k && heading(k)}
            <rect x={x + 4} y={G.cellTop} width={CW - 8} height={G.cellH} rx={14} fill={amber ? tint(AMBER, 0.72) : "#FFFFFF"}
              stroke={amber ? AMBER : C.rule} strokeWidth={amber ? 3 : 1.5} />
            {c && dragK !== k && (
              <g className={snap ? "" : "wd-move"} style={{ transform: `translate(${shift[k] || 0}px, ${lift === k ? -16 : 0}px)` } as any}>
                <text x={colC(k)} y={G.digit} textAnchor="middle" fontSize={T.display} fontWeight={700} fill={inkK(c, k)}>{c.d}</text>
              </g>
            )}
          </g>
        );
      })}

      {/* the cards under each digit: face value, the multiplication, place value */}
      {cells.map((c, k) => (c && show[k] > 0 && dragK !== k ? (
        <g key={"cards" + k} className={snap ? "" : "wd-move"} style={{ transform: `translateX(${shift[k] || 0}px)` } as any}>
          <g key={"s" + show[k]} className="wd-drop">
            {inRow(k, "face") ? hollow(colC(k) - G.face.w / 2, G.face.y, G.face.w, G.face.h) : (
              <g className="wd-move" style={bounceOf(k, "face")}>
                <rect x={colC(k) - G.face.w / 2} y={G.face.y} width={G.face.w} height={G.face.h} rx={14} fill={tint(colK(c, k), 0.85)}
                  stroke={pop === k ? AMBER : colK(c, k)} strokeWidth={pop === k ? 4 : 2.5} />
                <text x={colC(k)} y={G.face.y + 47} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={inkK(c, k)}>{c.d}</text>
              </g>
            )}
            {show[k] > 1 && link(k)}
            {show[k] > 1 && (inRow(k, "pv") ? hollow(colC(k) - G.pv.w / 2, G.pv.y, G.pv.w, G.pv.h) : k === hiddenK ? (
              <g>
                <rect x={colC(k) - G.pv.w / 2} y={G.pv.y} width={G.pv.w} height={G.pv.h} rx={14} fill={tint(C.panel, 0.5)} stroke={C.rule} strokeWidth={2.5} strokeDasharray="8 7" />
                <text x={colC(k)} y={G.pv.y + 43} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={C.ink}>?</text>
              </g>
            ) : (
              <g className="wd-move" style={bounceOf(k, "pv")}>
                <rect x={colC(k) - G.pv.w / 2} y={G.pv.y} width={G.pv.w} height={G.pv.h} rx={14} fill="#FFFFFF"
                  stroke={pop === k && kind === "expand" ? AMBER : colK(c, k)} strokeWidth={pop === k && kind === "expand" ? 4 : 2.5} />
                <text x={colC(k)} y={G.pv.y + 42} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={inkK(c, k)}>
                  {grow && k === cfg.place ? grow : bookForm(c.d * pow10(k))}
                </text>
              </g>
            ))}
          </g>
        </g>
      ) : null))}

      {/* the hollow card a moved digit leaves standing in the column it came from */}
      {was && (
        <g className="wd-drop">
          {hollow(colC(was.k) - G.pv.w / 2, G.row.y - 12, G.pv.w, G.pv.h)}
          {was.text && <text x={colC(was.k)} y={G.row.y + 30} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={ZERO}>{was.text}</text>}
        </g>
      )}

      {/* the row of addends (phase 3, and free play) */}
      {kind === "expand" && row.length === 0 && (
        <rect x={LEFT + 4} y={G.row.y - 4} width={W.w - LEFT - 8} height={G.row.h + 8} rx={18} fill="none" stroke={C.rule} strokeWidth={2} strokeDasharray="10 10" />
      )}
      {rowItems.map((r, i) => (
        <g key={"r" + r.k}>
          {i > 0 && plus(rowX[i] - 20, G.row.y + 43)}
          {!(DP && DP.src === "row" && DP.k === r.k) && (
            <g className="wd-drop">
              <rect x={rowX[i]} y={G.row.y} width={r.w} height={G.row.h} rx={14} fill={r.which === "face" ? tint(colorOf(r.k), 0.85) : "#FFFFFF"} stroke={colorOf(r.k)} strokeWidth={2.5} />
              <text x={rowX[i] + r.w / 2} y={G.row.y + 43} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={inkOf(r.k)}>{r.text}</text>
            </g>
          )}
        </g>
      ))}

      {/* the second row: every digit's place value card, laid under the child's row by the traceback */}
      {cmpItems.map((r, i) => (
        <g key={"c" + r.k} className="wd-drop">
          {i > 0 && plus(cmpX[i] - 20, G.row2.y + 42)}
          <rect x={cmpX[i]} y={G.row2.y} width={r.w} height={G.row2.h} rx={14} fill="#FFFFFF" stroke={colorOf(r.k)} strokeWidth={2.5} strokeDasharray="10 6" />
          <text x={cmpX[i] + r.w / 2} y={G.row2.y + 42} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={inkOf(r.k)}>{r.text}</text>
        </g>
      ))}

      {/* phase 4: the addends across the foot, each waiting to go back to its column */}
      {partItems.map((p: any, j: number) => (
        <g key={"p" + j}>
          {j > 0 && plus(partX[j] - 17, G.row.y + 43)}
          {placed[p.i] || (DP && DP.src === "part" && DP.i === p.i) ? hollow(partX[j], G.row.y, p.w, G.row.h) : (
            <g>
              <rect x={partX[j]} y={G.row.y} width={p.w} height={G.row.h} rx={14} fill="#FFFFFF" stroke={colorOf(p.k)} strokeWidth={2.5} filter="url(#fShadowSoft)" />
              {cfg.form === "times" ? (() => {
                const inner = tw(String(p.d), T.micro) + 22 + tw(p.unit, T.micro), x0 = partX[j] + (p.w - inner) / 2, cy = G.row.y + 32, dx = x0 + tw(String(p.d), T.micro) + 4;
                return (
                  <g>
                    <text x={x0} y={G.row.y + 42} fontSize={T.micro} fontWeight={700} fill={inkOf(p.k)}>{p.d}</text>
                    <path d={`M ${dx + 2} ${cy - 5} L ${dx + 12} ${cy + 5} M ${dx + 12} ${cy - 5} L ${dx + 2} ${cy + 5}`} stroke={C.ink} strokeWidth={3} strokeLinecap="round" />
                    <text x={dx + 18} y={G.row.y + 42} fontSize={T.micro} fontWeight={700} fill={inkOf(p.k)}>{p.unit}</text>
                  </g>
                );
              })() : <text x={partX[j] + p.w / 2} y={G.row.y + 43} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={inkOf(p.k)}>{bookForm(p.v)}</text>}
            </g>
          )}
        </g>
      ))}

      {/* row labels on the margin */}
      {anyFace && <text x={176} y={G.face.y + 41} textAnchor="end" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("face value")}</text>}
      {anyPv && <text x={176} y={G.pv.y + 41} textAnchor="end" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("place value")}</text>}

      {/* ── live controls, drawn last so they sit on top ── */}
      {cells.map((c, k) => (c && digitLive ? (
        <g key={"dc" + k} className="wd-grab c4-piece" {...control("digit-" + k, "The digit in the " + PLACES[k] + " place")}
          {...drag.bind({ src: "digit", k })} {...drag.keys({ src: "digit", k })}>
          <rect x={colX(k) + 4} y={G.cellTop} width={CW - 8} height={G.cellH} fill="transparent" />
        </g>
      ) : null))}
      {cardLive && cells.map((c, k) => (c && show[k] > 1 ? (
        <g key={"cc" + k}>
          <g className="wd-tap c4-piece" {...control("face-" + k, "Face value card of the " + PLACES[k] + " digit")}
            {...drag.bind({ src: "card", k, which: "face" })} {...drag.keys({ src: "card", k, which: "face" })}>
            <rect x={colC(k) - 60} y={G.face.y - 4} width={120} height={72} fill="transparent" />
          </g>
          <g className="wd-tap c4-piece" {...control("pv-" + k, "Place value card of the " + PLACES[k] + " digit")}
            {...drag.bind({ src: "card", k, which: "pv" })} {...drag.keys({ src: "card", k, which: "pv" })}>
            <rect x={colC(k) - G.pv.w / 2} y={G.pv.y - 4} width={G.pv.w} height={72} fill="transparent" />
          </g>
        </g>
      ) : null))}
      {cardLive && rowItems.map((r, i) => (
        <g key={"rc" + r.k} className="wd-tap c4-piece" {...control("row-" + r.k, "Send the " + PLACES[r.k] + " card back")}
          {...drag.bind({ src: "row", k: r.k })} {...drag.keys({ src: "row", k: r.k })}>
          <rect x={rowX[i] - 2} y={G.row.y - 4} width={r.w + 4} height={72} fill="transparent" />
        </g>
      ))}
      {partLive && partItems.map((p: any, j: number) => (placed[p.i] ? null : (
        <g key={"pc" + j} className="wd-grab c4-piece" {...control("addend-" + j, "Addend " + (j + 1) + " of " + partItems.length)}
          {...drag.bind({ src: "part", i: p.i })} {...drag.keys({ src: "part", i: p.i })}>
          <rect x={partX[j] - 2} y={G.row.y - 4} width={p.w + 4} height={72} fill="transparent" />
        </g>
      )))}

      {/* keys on the margin: show all (phase 1 and free play); new number and the row (free play) */}
      {(kind === "face" || kind === "swap" || free) && (() => {
        const live = !busy && (free || stage === "ask") && !(allShown && !free);
        return (
          <Key id="show-all" label={tx(free && allShown ? "Hide all" : "Show all")} x={0} y={100} w={176} h={72} C={C} disabled={!live} onClick={showAll}>
            <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={live ? C.ink : quiet}>{tx(free && allShown ? "Hide all" : "Show all")}</text>
          </Key>
        );
      })()}
      {free && (
        <g>
          <Key id="new-number" label={tx("New number")} x={0} y={4} w={176} h={72} C={C} disabled={busy} onClick={nextNumber}>
            <text y={10} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={busy ? quiet : C.ink}>{tx("New number")}</text>
          </Key>
          <Key id="expand" label={tx(expanded ? "Collapse" : "Expand")} x={0} y={368} w={176} h={72} C={C} primary={!expanded} disabled={busy} onClick={expandFree}>
            <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={busy ? quiet : expanded ? C.ink : "#FFFFFF"}>{tx(expanded ? "Collapse" : "Expand")}</text>
          </Key>
        </g>
      )}

      {/* the piece under the finger */}
      {dragging && (() => {
        const x = dragging.x, y = dragging.y;
        if (DP.src === "digit") {
          const c = cells[DP.k];
          if (!c) return null;
          return (
            <g pointerEvents="none" filter="url(#fLift)">
              <text x={x} y={y + 24} textAnchor="middle" fontSize={T.display} fontWeight={700} fill={inkK(c, DP.k)}>{c.d}</text>
              <rect x={x - 40} y={y + 40} width={80} height={56} rx={12} fill={tint(colK(c, DP.k), 0.85)} stroke={colK(c, DP.k)} strokeWidth={2.5} />
              <text x={x} y={y + 82} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={inkK(c, DP.k)}>{c.d}</text>
            </g>
          );
        }
        const text = DP.src === "part" ? bookForm(partItems.find((p: any) => p.i === DP.i).v) : bookForm(cardVal({ k: DP.k, which: DP.which || (rowItems.find((r) => r.k === DP.k) || {}).which }, cells));
        const k = DP.src === "part" ? cfg.parts[DP.i][1] : DP.k, w = Math.max(80, tw(text, T.label) + 28);
        return (
          <g pointerEvents="none" filter="url(#fLift)">
            <rect x={x - w / 2} y={y - 32} width={w} height={64} rx={14} fill="#FFFFFF" stroke={colorOf(k)} strokeWidth={3} />
            <text x={x} y={y + 11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={inkOf(k)}>{text}</text>
          </g>
        );
      })()}

      {invite && <Invite x={invite.x} y={invite.y} r={invite.r} C={C} />}
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase:
   result.last = { value, answer, kind, item, shared } (shared = what api.share held at that moment) */
function Thumb({ result, C, w, h }: any) {
  const L = (result && result.last) || {};
  const sh = L.shared || {};
  if (L.value === null || L.value === undefined) return null;
  const cy = h / 2;
  const card = (x: number, cw: number, text: string, k: number, face: boolean) => {
    const col = text === "0" ? ZERO : colorOf(k), ink = text === "0" ? ZERO : inkOf(k);
    return (
      <g>
        <rect x={x} y={cy - 26} width={cw} height={52} rx={12} fill={face ? tint(col, 0.85) : "#FFFFFF"} stroke={col} strokeWidth={2.5} />
        <text x={x + cw / 2} y={cy + 11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={ink}>{text}</text>
      </g>
    );
  };
  const box = <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />;
  const d = typeof sh.focusDigit === "number" ? sh.focusDigit : leadNumber(L.answer) ?? 0, k = typeof sh.focusPlace === "number" ? sh.focusPlace : 0;
  /* phase 1: the two swapped digits, each still carrying its own face value */
  if (L.kind === "face" || L.kind === "swap") {
    const x0 = w / 2 - 88;
    return (
      <g>{box}{card(x0, 56, String(d), k, true)}
        <path d={`M ${x0 + 74} ${cy - 6} H ${x0 + 102} M ${x0 + 94} ${cy - 13} L ${x0 + 102} ${cy - 6} L ${x0 + 94} ${cy + 1} M ${x0 + 102} ${cy + 6} H ${x0 + 74} M ${x0 + 82} ${cy - 1} L ${x0 + 74} ${cy + 6} L ${x0 + 82} ${cy + 13}`}
          fill="none" stroke={C.ink} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
        {card(x0 + 120, 56, String(d), L.kind === "swap" ? 1 : k, true)}</g>
    );
  }
  /* phase 2: the digit's face value card and the worth the child gave it */
  if (L.kind === "worth") {
    const v = leadNumber(L.value) ?? 0, t = bookForm(v), pw = Math.max(64, tw(t, T.label) + 20), x0 = (w - (48 + 12 + pw)) / 2;
    return <g>{box}{card(x0, 48, String(d), k, true)}{card(x0 + 60, pw, t, k, false)}</g>;
  }
  /* phase 3: the child's row as a strip of addends, and the number it adds back to */
  if (L.kind === "expand") {
    const terms = termsOf(L.value), n = terms.length, pw = 22, gap = 12, x0 = (w - (n * pw + (n - 1) * gap)) / 2;
    return (
      <g>{box}
        {terms.map((t, i) => { const kk = Math.min(5, String(t).length - 1); return <rect key={i} x={x0 + i * (pw + gap)} y={10} width={pw} height={18} rx={6} fill={colorOf(kk)} />; })}
        <text x={w / 2} y={h - 14} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{indian(terms.reduce((a, b) => a + b, 0))}</text>
      </g>
    );
  }
  /* phase 4: the number rebuilt, digits in their period inks and zeros holding places grey */
  const v = leadNumber(L.value);
  if (v === null) return null;
  const s = indian(v);
  let pl = s.replace(/,/g, "").length - 1;
  const chars = s.split("").map((ch) => { if (ch === ",") return { ch, fill: C.ink }; const kk = pl--; return { ch, fill: ch === "0" ? ZERO : inkOf(kk) }; });
  return (
    <g>{box}
      <text x={w / 2} y={cy + 12} textAnchor="middle" fontSize={T.label} fontWeight={700}>
        {chars.map((c, i) => <tspan key={i} fill={c.fill}>{c.ch}</tspan>)}
      </text>
    </g>
  );
}

function WorthOfADigit(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, format, fitHost: () => null }} />
  );
}

export default WorthOfADigit;
