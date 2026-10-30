/* ═══ M3.S5.T8.C38.2D1 · thermometer_reader · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists. THE LESSON IS SILENT (runtime r30), action-driven (r34), the new look
   (keyOnly + navDots, one sentence a screen, every act performed on screen through api.act).
   NO imports in this file; only the five host hooks. Follow docs/LAYOUT.md and docs/PATTERNS.md.
   Edit, never rewrite. Built by `node cli.mjs scaffold`; concepts are verbatim (check compares them). */

const TOOL_ID = "thermometer_reader";
const MEDIA_ID = "M3.S5.T8.C38.2D1";
const TOOL_NAME = "Thermometer Reader";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
/* kept for the tool object's shape (and the sidecar); nothing speaks from r30 */
const VOICE = {"rate":0.92,"pitch":1.06};

/* printed on the bubble before phase 1's teach lines only (not shown: phase 1 has steps) */
const OPENING = ["A thermometer, standing ready."];
/* the whole-tool line (no longer shown from r44) */
const FINISH_LINE = "You found what one small mark was worth, and read the column.";
/* printed when the child opens Free play; free play is the shelf: every cup can be dipped */
const FREE_LINE = "Free play. Dip the thermometer in any cup and read it.";

/* THE START PAGE: START_HOOK is one printed question; StartArt is the shelf with the thermometer in the tea (no digits) */
const START_HOOK = "How can you tell how hot a cup of tea is?";
function StartArt({ box, C, lang, tx }: any) {
  return (
    <g transform={`translate(${(box.w - 900 * 0.68) / 2},${-14})`}>
      <g transform="scale(0.68)">{tqShelf(C, { at: "tea", v: TQ_TEMP.tea, labels: false, anim: false })}</g>
    </g>
  );
}

/* Hindi and Gujarati (docs/PATTERNS.md §11): filled in the language pass, once the English is final. */
const TR: any = {
  hi: {
    "Thermometer Reader": "तापमापी पढ़ो",
    "A thermometer, standing ready.": "एक तापमापी, तैयार खड़ा।",
    "You found what one small mark was worth, and read the column.": "तुमने एक छोटे निशान का मान निकाला और स्तंभ पढ़ा।",
    "Free play. Dip the thermometer in any cup and read it.": "मुक्त खेल। तापमापी किसी भी कप में डुबोओ और पढ़ो।",
    "How can you tell how hot a cup of tea is?": "तुम कैसे जानोगे कि चाय का कप कितना गरम है?",
    "Hot and cold": "गरम और ठंडा",
    "Dip the thermometer in and watch the column go up or down.": "तापमापी डुबोओ और देखो, स्तंभ ऊपर जाता है या नीचे।",
    "Tap the bowl of ice water to dip the thermometer in it.": "तापमापी डुबोने के लिए बर्फ़ के पानी के कटोरे पर टैप करो।",
    "Tap the wide bowl with the ice cubes in it.": "बर्फ़ के टुकड़ों वाले चौड़े कटोरे पर टैप करो।",
    "Now tap the cup of water and watch the column climb.": "अब पानी के कप पर टैप करो और स्तंभ को चढ़ते देखो।",
    "The cup of water stands in the middle.": "पानी का कप बीच में रखा है।",
    "A higher column means a hotter thing.": "ऊँचा स्तंभ मतलब ज़्यादा गरम चीज़।",
    "In one of them the column sank to 0, in the other it climbed past 50.": "एक में स्तंभ 0 तक गिरा, दूसरे में 50 से ऊपर चढ़ा।",
    "Temperature is how hot or cold a thing is, and a thermometer measures it.": "चीज़ कितनी गरम या ठंडी है, वही तापमान है, और तापमापी उसे मापता है।",
    "You learned: a thermometer measures how hot or cold a thing is.": "तुमने सीखा: तापमापी मापता है कि चीज़ कितनी गरम या ठंडी है।",
    "Tea": "चाय",
    "Ice water": "बर्फ़ पानी",
    "Which is hotter, the cup of tea or the bowl of ice water?": "कौन ज़्यादा गरम है, चाय का कप या बर्फ़ के पानी का कटोरा?",
    "Which is hotter?": "कौन ज़्यादा गरम?",
    "Look at how high the column stood in each one.": "देखो, हर एक में स्तंभ कितना ऊँचा रहा।",
    "Hotter": "ज़्यादा गरम",
    "How hot or cold": "कितना गरम या ठंडा",
    "How much water": "कितना पानी",
    "What does a thermometer measure?": "तापमापी क्या मापता है?",
    "It measures?": "यह क्या मापता है?",
    "Dip the thermometer in the tea, then in the ice water, and compare.": "तापमापी को चाय में, फिर बर्फ़ के पानी में डुबोकर तुलना करो।",
    "The big bowl holds the most water, yet its column stood the lowest.": "बड़े कटोरे में सबसे ज़्यादा पानी है, फिर भी उसका स्तंभ सबसे नीचे रहा।",
    "The column changed when the heat changed, not when the water changed.": "स्तंभ गरमी बदलने से बदला, पानी बदलने से नहीं।",
    "Two cups are at 45 °C and 70 °C, so by how many degrees is one hotter?": "दो कप 45 °C और 70 °C पर हैं, तो एक कितनी डिग्री ज़्यादा गरम है?",
    "How many degrees?": "कितनी डिग्री?",
    "Count up the scale from 45 to 70.": "पैमाने पर 45 से 70 तक ऊपर गिनो।",
    "Each small mark on these scales is worth 5 degrees.": "इन पैमानों पर हर छोटे निशान का मान 5 डिग्री है।",
    "From 45 up to 50 is 5, so how far is it from 50 up to 70?": "45 से 50 तक 5 है, तो 50 से 70 तक कितना है?",
    "Two scales": "दो पैमाने",
    "Each key puts the column at a reading shown on both sides of the tube.": "हर बटन स्तंभ को एक माप पर लाता है, जो नली के दोनों ओर दिखता है।",
    "Tap Room temperature and read the column on both sides.": "कमरे का तापमान पर टैप करो और स्तंभ को दोनों ओर पढ़ो।",
    "The four keys stand right of the tube.": "चारों बटन नली के दाईं ओर हैं।",
    "Tap the key the question names, then read across.": "सवाल में बताए बटन पर टैप करो, फिर सीध में पढ़ो।",
    "Follow the top of the column to the side the question asks for.": "स्तंभ के सिरे से उस ओर जाओ जिसके बारे में सवाल है।",
    "Water freezes at 0 °C and boils at 100 °C, which are 32 °F and 212 °F.": "पानी 0 °C पर जमता और 100 °C पर उबलता है, यानी 32 °F और 212 °F।",
    "You learned: water freezes at 0 °C and boils at 100 °C.": "तुमने सीखा: पानी 0 °C पर जमता और 100 °C पर उबलता है।",
    "°C": "°C",
    "°F": "°F",
    "At what temperature does water boil on the Celsius and Fahrenheit sides?": "सेल्सियस और फ़ारेनहाइट ओर पानी किस तापमान पर उबलता है?",
    "Water boils at?": "पानी उबलता है?",
    "Tap Boiling water and read both sides of the tube.": "उबलता पानी पर टैप करो और नली के दोनों ओर पढ़ो।",
    "Celsius is the left side of the tube, Fahrenheit the right side.": "नली की बाईं ओर सेल्सियस है, दाईं ओर फ़ारेनहाइट।",
    "Celsius goes in the first box and Fahrenheit in the second.": "पहले खाने में सेल्सियस लिखो, दूसरे में फ़ारेनहाइट।",
    "At what temperature does water freeze on the Fahrenheit scale?": "फ़ारेनहाइट पैमाने पर पानी किस तापमान पर जमता है?",
    "Freezes, in °F?": "जमता है, °F में?",
    "Tap Freezing water, then read the Fahrenheit side.": "जमता पानी पर टैप करो, फिर फ़ारेनहाइट ओर पढ़ो।",
    "Fahrenheit is the side with only four marks.": "फ़ारेनहाइट वह ओर है जिस पर सिर्फ़ चार निशान हैं।",
    "Read the Fahrenheit number level with the top of the column.": "स्तंभ के सिरे की सीध में फ़ारेनहाइट संख्या पढ़ो।",
    "What is normal body temperature on the Celsius scale?": "सेल्सियस पैमाने पर शरीर का सामान्य तापमान क्या है?",
    "Body, in °C?": "शरीर, °C में?",
    "Start with the Body temperature key.": "शरीर का तापमान बटन से शुरू करो।",
    "The Celsius reading shows in the box ending in °C, beside the column's top.": "सेल्सियस माप स्तंभ के सिरे के पास, °C वाले खाने में दिखता है।",
    "Type the number shown in that box.": "उस खाने में दिखी संख्या लिखो।",
    "What one small mark is worth": "एक छोटे निशान का मान",
    "Count the steps between neighbouring labels, not the marks.": "पास की संख्याओं के बीच हिस्से गिनो, निशान नहीं।",
    "Tap the 0 label at the bottom of the scale.": "पैमाने में सबसे नीचे 0 पर टैप करो।",
    "The 0 label is beside the tube, at the bottom.": "0 नली के पास, सबसे नीचे लिखा है।",
    "Now tap the 15 label, the next label up.": "अब 15 पर टैप करो, जो ऊपर की अगली संख्या है।",
    "Tap the label just above 0.": "0 के ठीक ऊपर वाली संख्या पर टैप करो।",
    "Tap Count to count the steps from 0 to 15.": "0 से 15 तक हिस्से गिनने के लिए गिनो पर टैप करो।",
    "The Count key is under the picture.": "गिनो बटन चित्र के नीचे है।",
    "Every gap between neighbouring labels holds the same number of steps.": "पास की संख्याओं के हर अंतर में उतने ही हिस्से होते हैं।",
    "A mark is worth a whole gap shared out by its steps.": "निशान का मान पूरे अंतर को उसके हिस्सों में बाँटकर मिलता है।",
    "Steps are one more than marks, and a mark is worth the gap shared by the steps.": "हिस्से निशानों से एक ज़्यादा हैं, और अंतर को हिस्सों से भाग दो तो मान मिले।",
    "You learned: a mark is the gap between labels shared by the steps.": "तुमने सीखा: निशान का मान अंतर को हिस्सों में बाँटकर मिलता है।",
    "This scale has 4 small marks between labels, so what is each worth?": "इस पैमाने में संख्याओं के बीच 4 छोटे निशान हैं, तो हर एक का मान क्या है?",
    "Each mark is worth?": "हर निशान का मान?",
    "Count the steps from 60 to 70, not the marks.": "60 से 70 तक हिस्से गिनो, निशान नहीं।",
    "The gap from 60 to 70 is 10 degrees.": "60 से 70 तक का अंतर 10 डिग्री है।",
    "Share those 10 degrees equally among the 5 steps.": "उन 10 डिग्री को 5 हिस्सों में बराबर बाँटो।",
    "Here the labels go up by 5, so what is each small mark worth?": "यहाँ संख्याएँ 5 के अंतर पर हैं, तो हर छोटे निशान का मान क्या है?",
    "Each mark here?": "यहाँ हर निशान?",
    "How many steps are there from 20 to 25?": "20 से 25 तक कितने हिस्से हैं?",
    "From 20 to 25 the 4 small marks make 5 steps.": "20 से 25 तक 4 छोटे निशान 5 हिस्से बनाते हैं।",
    "Share the 5 degrees out over those steps.": "उन हिस्सों में 5 डिग्री बाँटो।",
    "What is each small mark worth on this last scale?": "इस आख़िरी पैमाने पर हर छोटे निशान का मान क्या है?",
    "Each mark, last scale?": "आख़िरी पैमाने पर हर निशान?",
    "Find the gap from 40 to 60 first.": "पहले 40 से 60 तक का अंतर निकालो।",
    "60 take away 40 is 20 degrees.": "60 में से 40 घटाओ तो 20 डिग्री।",
    "Now divide 20 by the steps between 40 and 60.": "अब 20 को 40 और 60 के बीच के हिस्सों से भाग दो।",
    "Reading a thermometer": "तापमापी पढ़ना",
    "Find what a mark is worth, then count up from the label.": "निशान का मान निकालो, फिर संख्या से ऊपर गिनो।",
    "Tap the label just below the top of the green column.": "हरे स्तंभ के सिरे के ठीक नीचे वाली संख्या पर टैप करो।",
    "Look where the green column stops.": "देखो, हरा स्तंभ कहाँ रुकता है।",
    "Tap Count to count the marks up to the top.": "सिरे तक निशान गिनने के लिए गिनो पर टैप करो।",
    "The Count key is at the bottom.": "गिनो बटन नीचे है।",
    "How many marks sit between that label and the green top?": "उस संख्या और हरे सिरे के बीच कितने निशान हैं?",
    "Add the worth of those marks to the label below.": "उन निशानों का मान नीचे वाली संख्या में जोड़ो।",
    "Count the marks up from the label below the column, then add.": "स्तंभ के नीचे की संख्या से ऊपर निशान गिनो, फिर जोड़ो।",
    "You learned: count the marks up from the label below, then add.": "तुमने सीखा: नीचे की संख्या से निशान गिनो, फिर जोड़ो।",
    "One small mark is worth 2 degrees here, so what does the thermometer read?": "यहाँ एक छोटे निशान का मान 2 डिग्री है, तो तापमापी क्या दिखाता है?",
    "It reads?": "यह क्या दिखाता है?",
    "Count the marks from the label below up to the green top.": "नीचे की संख्या से हरे सिरे तक निशान गिनो।",
    "There are 3 marks between the 60 label and the green top.": "60 और हरे सिरे के बीच 3 निशान हैं।",
    "3 marks of 2 degrees are 6 degrees above the 60 label.": "2 डिग्री के 3 निशान, यानी 60 से 6 डिग्री ऊपर।",
    "On this one a mark is worth 1 degree, so what is the reading?": "इस पर एक निशान का मान 1 डिग्री है, तो माप क्या है?",
    "The reading?": "माप?",
    "The column passes the 25 label before it stops.": "स्तंभ रुकने से पहले 25 को पार करता है।",
    "How many marks are there from 25 up to the top of the column?": "25 से स्तंभ के सिरे तक कितने निशान हैं?",
    "3 marks sit above the 25 label.": "25 के ऊपर 3 निशान हैं।",
    "Find what a mark is worth first, then read this thermometer.": "पहले निशान का मान निकालो, फिर यह तापमापी पढ़ो।",
    "Read it?": "इसे पढ़ो?",
    "How many degrees lie between the 30 and 50 labels?": "30 और 50 के बीच कितनी डिग्री हैं?",
    "Count the steps from 30 to 50, then share the gap among them.": "30 से 50 तक हिस्से गिनो, फिर अंतर उनमें बाँटो।",
    "Then count the marks above 30 and add their worth to 30.": "फिर 30 के ऊपर निशान गिनो और उनका मान 30 में जोड़ो।",
    "Yes, the column climbed far higher in the tea.": "हाँ, चाय में स्तंभ बहुत ऊपर चढ़ा।",
    "Yes, the column follows heat, not the amount of water.": "हाँ, स्तंभ गरमी के साथ बदलता है, पानी की मात्रा से नहीं।",
    "Yes, water boils at 100 °C, which is 212 °F.": "हाँ, पानी 100 °C पर उबलता है, यानी 212 °F।",
    "Yes, water freezes at 32 °F, the same as 0 °C.": "हाँ, पानी 32 °F पर जमता है, यानी 0 °C।",
    "Yes, 10 degrees in 5 steps makes each mark worth 2.": "हाँ, 5 हिस्सों में 10 डिग्री, तो हर निशान का मान 2।",
    "Yes, 5 degrees in 5 steps makes each mark worth 1.": "हाँ, 5 हिस्सों में 5 डिग्री, तो हर निशान का मान 1।",
    "Yes, 3 marks of 2 degrees above 60 make 66 °C.": "हाँ, 60 के ऊपर 2 डिग्री के 3 निशान, यानी 66 °C।",
    "Yes, 3 marks of 1 degree above 25 make 28 °C.": "हाँ, 25 के ऊपर 1 डिग्री के 3 निशान, यानी 28 °C।",
    "Celsius": "सेल्सियस",
    "Fahrenheit": "फ़ारेनहाइट",
    "Label": "संख्या",
    "One mark": "एक निशान",
    "Count": "गिनो",
    "Boiling water": "उबलता पानी",
    "Body temperature": "शरीर का तापमान",
    "Room temperature": "कमरे का तापमान",
    "Freezing water": "जमता पानी",
    "steps": "हिस्से",
    "step": "हिस्सा",
    "marks": "निशान",
    "mark": "निशान",
    "Bowl of ice water": "बर्फ़ के पानी का कटोरा",
    "Cup of water": "पानी का कप",
    "Cup of tea": "चाय का कप",
    "apart": "अंतर",
    "1 mark": "1 निशान",
  },
  gu: {
    "Thermometer Reader": "થર્મોમીટર વાંચો",
    "A thermometer, standing ready.": "એક થર્મોમીટર, તૈયાર ઊભું.",
    "You found what one small mark was worth, and read the column.": "તમે એક નાના કાપાની કિંમત શોધી અને સ્તંભ વાંચ્યો.",
    "Free play. Dip the thermometer in any cup and read it.": "મુક્ત રમત. થર્મોમીટર કોઈ પણ કપમાં ડુબાડો અને વાંચો.",
    "How can you tell how hot a cup of tea is?": "ચાનો કપ કેટલો ગરમ છે તે તમે કેવી રીતે જાણશો?",
    "Hot and cold": "ગરમ અને ઠંડું",
    "Dip the thermometer in and watch the column go up or down.": "થર્મોમીટર ડુબાડો અને જુઓ, સ્તંભ ઉપર જાય છે કે નીચે.",
    "Tap the bowl of ice water to dip the thermometer in it.": "થર્મોમીટર ડુબાડવા બરફના પાણીના વાટકા પર ટૅપ કરો.",
    "Tap the wide bowl with the ice cubes in it.": "બરફના ટુકડાવાળા પહોળા વાટકા પર ટૅપ કરો.",
    "Now tap the cup of water and watch the column climb.": "હવે પાણીના કપ પર ટૅપ કરો અને સ્તંભને ચઢતો જુઓ.",
    "The cup of water stands in the middle.": "પાણીનો કપ વચ્ચે મૂકેલો છે.",
    "A higher column means a hotter thing.": "ઊંચો સ્તંભ એટલે વધુ ગરમ વસ્તુ.",
    "In one of them the column sank to 0, in the other it climbed past 50.": "એકમાં સ્તંભ 0 સુધી ઊતર્યો, બીજામાં 50 થી ઉપર ચઢ્યો.",
    "Temperature is how hot or cold a thing is, and a thermometer measures it.": "વસ્તુ કેટલી ગરમ કે ઠંડી છે તે તાપમાન છે, અને થર્મોમીટર તેને માપે છે.",
    "You learned: a thermometer measures how hot or cold a thing is.": "તમે શીખ્યા: વસ્તુ કેટલી ગરમ કે ઠંડી છે તે થર્મોમીટર માપે છે.",
    "Tea": "ચા",
    "Ice water": "બરફ પાણી",
    "Which is hotter, the cup of tea or the bowl of ice water?": "કયું વધુ ગરમ છે, ચાનો કપ કે બરફના પાણીનો વાટકો?",
    "Which is hotter?": "કયું વધુ ગરમ?",
    "Look at how high the column stood in each one.": "જુઓ, દરેકમાં સ્તંભ કેટલો ઊંચો રહ્યો.",
    "Hotter": "વધુ ગરમ",
    "How hot or cold": "કેટલું ગરમ કે ઠંડું",
    "How much water": "કેટલું પાણી",
    "What does a thermometer measure?": "થર્મોમીટર શું માપે છે?",
    "It measures?": "તે શું માપે છે?",
    "Dip the thermometer in the tea, then in the ice water, and compare.": "થર્મોમીટરને ચામાં, પછી બરફના પાણીમાં ડુબાડીને સરખાવો.",
    "The big bowl holds the most water, yet its column stood the lowest.": "મોટા વાટકામાં સૌથી વધુ પાણી છે, છતાં તેનો સ્તંભ સૌથી નીચે રહ્યો.",
    "The column changed when the heat changed, not when the water changed.": "સ્તંભ ગરમી બદલાતાં બદલાયો, પાણી બદલાતાં નહીં.",
    "Two cups are at 45 °C and 70 °C, so by how many degrees is one hotter?": "બે કપ 45 °C અને 70 °C પર છે, તો એક કેટલી ડિગ્રી વધુ ગરમ છે?",
    "How many degrees?": "કેટલી ડિગ્રી?",
    "Count up the scale from 45 to 70.": "માપક્રમ પર 45 થી 70 સુધી ઉપર ગણો.",
    "Each small mark on these scales is worth 5 degrees.": "આ માપક્રમો પર દરેક નાના કાપાની કિંમત 5 ડિગ્રી છે.",
    "From 45 up to 50 is 5, so how far is it from 50 up to 70?": "45 થી 50 સુધી 5 છે, તો 50 થી 70 સુધી કેટલું છે?",
    "Two scales": "બે માપક્રમ",
    "Each key puts the column at a reading shown on both sides of the tube.": "દરેક બટન સ્તંભને એક માપ પર લાવે છે, જે નળીની બંને બાજુ દેખાય છે.",
    "Tap Room temperature and read the column on both sides.": "ઓરડાનું તાપમાન પર ટૅપ કરો અને સ્તંભને બંને બાજુ વાંચો.",
    "The four keys stand right of the tube.": "ચારેય બટન નળીની જમણી બાજુ છે.",
    "Tap the key the question names, then read across.": "પ્રશ્નમાં કહેલા બટન પર ટૅપ કરો, પછી સીધમાં વાંચો.",
    "Follow the top of the column to the side the question asks for.": "સ્તંભની ટોચથી પ્રશ્ન પૂછે તે બાજુ જાઓ.",
    "Water freezes at 0 °C and boils at 100 °C, which are 32 °F and 212 °F.": "પાણી 0 °C પર થીજે અને 100 °C પર ઊકળે છે, એટલે 32 °F અને 212 °F.",
    "You learned: water freezes at 0 °C and boils at 100 °C.": "તમે શીખ્યા: પાણી 0 °C પર થીજે અને 100 °C પર ઊકળે છે.",
    "°C": "°C",
    "°F": "°F",
    "At what temperature does water boil on the Celsius and Fahrenheit sides?": "સેલ્સિયસ અને ફેરનહીટ બાજુ પાણી કયા તાપમાને ઊકળે છે?",
    "Water boils at?": "પાણી ઊકળે છે?",
    "Tap Boiling water and read both sides of the tube.": "ઊકળતું પાણી પર ટૅપ કરો અને નળીની બંને બાજુ વાંચો.",
    "Celsius is the left side of the tube, Fahrenheit the right side.": "નળીની ડાબી બાજુ સેલ્સિયસ છે, જમણી બાજુ ફેરનહીટ.",
    "Celsius goes in the first box and Fahrenheit in the second.": "પહેલા ખાનામાં સેલ્સિયસ લખો, બીજામાં ફેરનહીટ.",
    "At what temperature does water freeze on the Fahrenheit scale?": "ફેરનહીટ માપક્રમ પર પાણી કયા તાપમાને થીજે છે?",
    "Freezes, in °F?": "થીજે છે, °F માં?",
    "Tap Freezing water, then read the Fahrenheit side.": "થીજતું પાણી પર ટૅપ કરો, પછી ફેરનહીટ બાજુ વાંચો.",
    "Fahrenheit is the side with only four marks.": "ફેરનહીટ એ બાજુ છે જેના પર ફક્ત ચાર કાપા છે.",
    "Read the Fahrenheit number level with the top of the column.": "સ્તંભની ટોચની સીધમાં ફેરનહીટ સંખ્યા વાંચો.",
    "What is normal body temperature on the Celsius scale?": "સેલ્સિયસ માપક્રમ પર શરીરનું સામાન્ય તાપમાન કેટલું છે?",
    "Body, in °C?": "શરીર, °C માં?",
    "Start with the Body temperature key.": "શરીરનું તાપમાન બટનથી શરૂ કરો.",
    "The Celsius reading shows in the box ending in °C, beside the column's top.": "સેલ્સિયસ માપ સ્તંભની ટોચ પાસે, °C વાળા ખાનામાં દેખાય છે.",
    "Type the number shown in that box.": "તે ખાનામાં દેખાતી સંખ્યા લખો.",
    "What one small mark is worth": "એક નાના કાપાની કિંમત",
    "Count the steps between neighbouring labels, not the marks.": "પાસેની સંખ્યાઓ વચ્ચેના ગાળા ગણો, કાપા નહીં.",
    "Tap the 0 label at the bottom of the scale.": "માપક્રમમાં સૌથી નીચે 0 પર ટૅપ કરો.",
    "The 0 label is beside the tube, at the bottom.": "0 નળી પાસે, સૌથી નીચે લખેલો છે.",
    "Now tap the 15 label, the next label up.": "હવે 15 પર ટૅપ કરો, જે ઉપરની પછીની સંખ્યા છે.",
    "Tap the label just above 0.": "0 ની તરત ઉપરની સંખ્યા પર ટૅપ કરો.",
    "Tap Count to count the steps from 0 to 15.": "0 થી 15 સુધીના ગાળા ગણવા ગણો પર ટૅપ કરો.",
    "The Count key is under the picture.": "ગણો બટન ચિત્રની નીચે છે.",
    "Every gap between neighbouring labels holds the same number of steps.": "પાસેની સંખ્યાઓના દરેક અંતરમાં એટલા જ ગાળા હોય છે.",
    "A mark is worth a whole gap shared out by its steps.": "કાપાની કિંમત આખા અંતરને તેના ગાળામાં વહેંચીને મળે છે.",
    "Steps are one more than marks, and a mark is worth the gap shared by the steps.": "ગાળા કાપાથી એક વધારે છે, અને કાપાની કિંમત અંતરને ગાળાથી ભાગતાં મળે છે.",
    "You learned: a mark is the gap between labels shared by the steps.": "તમે શીખ્યા: કાપાની કિંમત અંતરને ગાળામાં વહેંચીને મળે છે.",
    "This scale has 4 small marks between labels, so what is each worth?": "આ માપક્રમમાં સંખ્યાઓ વચ્ચે 4 નાના કાપા છે, તો દરેકની કિંમત શું છે?",
    "Each mark is worth?": "દરેક કાપાની કિંમત?",
    "Count the steps from 60 to 70, not the marks.": "60 થી 70 સુધી ગાળા ગણો, કાપા નહીં.",
    "The gap from 60 to 70 is 10 degrees.": "60 થી 70 સુધીનું અંતર 10 ડિગ્રી છે.",
    "Share those 10 degrees equally among the 5 steps.": "તે 10 ડિગ્રીને 5 ગાળામાં સરખી વહેંચો.",
    "Here the labels go up by 5, so what is each small mark worth?": "અહીં સંખ્યાઓ 5 ના અંતરે છે, તો દરેક નાના કાપાની કિંમત શું છે?",
    "Each mark here?": "અહીં દરેક કાપો?",
    "How many steps are there from 20 to 25?": "20 થી 25 સુધી કેટલા ગાળા છે?",
    "From 20 to 25 the 4 small marks make 5 steps.": "20 થી 25 સુધી 4 નાના કાપા 5 ગાળા બનાવે છે.",
    "Share the 5 degrees out over those steps.": "તે ગાળામાં 5 ડિગ્રી વહેંચો.",
    "What is each small mark worth on this last scale?": "આ છેલ્લા માપક્રમ પર દરેક નાના કાપાની કિંમત શું છે?",
    "Each mark, last scale?": "છેલ્લા માપક્રમ પર દરેક કાપો?",
    "Find the gap from 40 to 60 first.": "પહેલાં 40 થી 60 સુધીનું અંતર શોધો.",
    "60 take away 40 is 20 degrees.": "60 માંથી 40 બાદ કરતાં 20 ડિગ્રી.",
    "Now divide 20 by the steps between 40 and 60.": "હવે 20 ને 40 અને 60 વચ્ચેના ગાળાથી ભાગો.",
    "Reading a thermometer": "થર્મોમીટર વાંચવું",
    "Find what a mark is worth, then count up from the label.": "કાપાની કિંમત શોધો, પછી સંખ્યાથી ઉપર ગણો.",
    "Tap the label just below the top of the green column.": "લીલા સ્તંભની ટોચની તરત નીચેની સંખ્યા પર ટૅપ કરો.",
    "Look where the green column stops.": "જુઓ, લીલો સ્તંભ ક્યાં અટકે છે.",
    "Tap Count to count the marks up to the top.": "ટોચ સુધી કાપા ગણવા ગણો પર ટૅપ કરો.",
    "The Count key is at the bottom.": "ગણો બટન નીચે છે.",
    "How many marks sit between that label and the green top?": "તે સંખ્યા અને લીલી ટોચ વચ્ચે કેટલા કાપા છે?",
    "Add the worth of those marks to the label below.": "તે કાપાની કિંમત નીચેની સંખ્યામાં ઉમેરો.",
    "Count the marks up from the label below the column, then add.": "સ્તંભની નીચેની સંખ્યાથી ઉપર કાપા ગણો, પછી ઉમેરો.",
    "You learned: count the marks up from the label below, then add.": "તમે શીખ્યા: નીચેની સંખ્યાથી કાપા ગણો, પછી ઉમેરો.",
    "One small mark is worth 2 degrees here, so what does the thermometer read?": "અહીં એક નાના કાપાની કિંમત 2 ડિગ્રી છે, તો થર્મોમીટર શું બતાવે છે?",
    "It reads?": "તે શું બતાવે છે?",
    "Count the marks from the label below up to the green top.": "નીચેની સંખ્યાથી લીલી ટોચ સુધી કાપા ગણો.",
    "There are 3 marks between the 60 label and the green top.": "60 અને લીલી ટોચ વચ્ચે 3 કાપા છે.",
    "3 marks of 2 degrees are 6 degrees above the 60 label.": "2 ડિગ્રીના 3 કાપા, એટલે 60 થી 6 ડિગ્રી ઉપર.",
    "On this one a mark is worth 1 degree, so what is the reading?": "આના પર એક કાપાની કિંમત 1 ડિગ્રી છે, તો માપ કેટલું છે?",
    "The reading?": "માપ?",
    "The column passes the 25 label before it stops.": "સ્તંભ અટકતાં પહેલાં 25 ને પાર કરે છે.",
    "How many marks are there from 25 up to the top of the column?": "25 થી સ્તંભની ટોચ સુધી કેટલા કાપા છે?",
    "3 marks sit above the 25 label.": "25 ની ઉપર 3 કાપા છે.",
    "Find what a mark is worth first, then read this thermometer.": "પહેલાં કાપાની કિંમત શોધો, પછી આ થર્મોમીટર વાંચો.",
    "Read it?": "તે વાંચો?",
    "How many degrees lie between the 30 and 50 labels?": "30 અને 50 વચ્ચે કેટલી ડિગ્રી છે?",
    "Count the steps from 30 to 50, then share the gap among them.": "30 થી 50 સુધી ગાળા ગણો, પછી અંતર તેમાં વહેંચો.",
    "Then count the marks above 30 and add their worth to 30.": "પછી 30 ઉપર કાપા ગણો અને તેમની કિંમત 30 માં ઉમેરો.",
    "Yes, the column climbed far higher in the tea.": "હા, ચામાં સ્તંભ ઘણો ઉપર ચઢ્યો.",
    "Yes, the column follows heat, not the amount of water.": "હા, સ્તંભ ગરમી પ્રમાણે બદલાય છે, પાણીના જથ્થા પ્રમાણે નહીં.",
    "Yes, water boils at 100 °C, which is 212 °F.": "હા, પાણી 100 °C પર ઊકળે છે, એટલે 212 °F.",
    "Yes, water freezes at 32 °F, the same as 0 °C.": "હા, પાણી 32 °F પર થીજે છે, એટલે 0 °C.",
    "Yes, 10 degrees in 5 steps makes each mark worth 2.": "હા, 5 ગાળામાં 10 ડિગ્રી, તો દરેક કાપાની કિંમત 2.",
    "Yes, 5 degrees in 5 steps makes each mark worth 1.": "હા, 5 ગાળામાં 5 ડિગ્રી, તો દરેક કાપાની કિંમત 1.",
    "Yes, 3 marks of 2 degrees above 60 make 66 °C.": "હા, 60 ઉપર 2 ડિગ્રીના 3 કાપા, એટલે 66 °C.",
    "Yes, 3 marks of 1 degree above 25 make 28 °C.": "હા, 25 ઉપર 1 ડિગ્રીના 3 કાપા, એટલે 28 °C.",
    "Celsius": "સેલ્સિયસ",
    "Fahrenheit": "ફેરનહીટ",
    "Label": "સંખ્યા",
    "One mark": "એક કાપો",
    "Count": "ગણો",
    "Boiling water": "ઊકળતું પાણી",
    "Body temperature": "શરીરનું તાપમાન",
    "Room temperature": "ઓરડાનું તાપમાન",
    "Freezing water": "થીજતું પાણી",
    "steps": "ગાળા",
    "step": "ગાળો",
    "marks": "કાપા",
    "mark": "કાપો",
    "Bowl of ice water": "બરફના પાણીનો વાટકો",
    "Cup of water": "પાણીનો કપ",
    "Cup of tea": "ચાનો કપ",
    "apart": "અંતર",
    "1 mark": "1 કાપો",
  },
};

const PHASES = [
  {
    n: 1,
    concept: "Hot and cold",
    conceptId: "M3.S5.T8.C35", objectiveIds: ["O13"],
    says: ["Dip the thermometer in and watch the column go up or down."],
    steps: [
      { say: "Tap the bowl of ice water to dip the thermometer in it.", on: "ice", hint: "Tap the wide bowl with the ice cubes in it." },
      { say: "Now tap the cup of water and watch the column climb.", on: "water", hint: "The cup of water stands in the middle." },
    ],
    ladder: ["A higher column means a hotter thing.", "In one of them the column sank to 0, in the other it climbed past 50."],
    closing: "Temperature is how hot or cold a thing is, and a thermometer measures it.",
    learned: "You learned: a thermometer measures how hot or cold a thing is.",
    traceback: "each cup's column height is drawn beside it, the tallest lit amber, then the answer is named over it",
    items: [
      /* learn TR1: answer in the plan = The tea is hotter. A thermometer measures how hot or cold each one is, which is its temperature.
         plan question: A cup of tea and a glass of ice water sit on a table. Which is hotter, and what measures how hot each one is?
         (the "what measures it" half is practice 1, the next question) */
      { qid: "M3.S5.T8.C35:TR1", kind: "pick", choices: [{ id: "tea", label: "Tea" }, { id: "ice", label: "Ice water" }], answer: "tea",
        say: "Which is hotter, the cup of tea or the bowl of ice water?", ask: "Which is hotter?",
        miss: "Look at how high the column stood in each one.", near: "ice", tag: "Hotter" },
      /* practice 1: answer in the plan = Temperature: how hot or cold something is */
      { qid: "M3.S5.T8.C35:1", kind: "pick", choices: [{ id: "hot", label: "How hot or cold" }, { id: "much", label: "How much water" }], answer: "hot",
        say: "What does a thermometer measure?", ask: "It measures?",
        miss: "Dip the thermometer in the tea, then in the ice water, and compare.", near: "much", tag: "How hot or cold",
        ladder: ["The big bowl holds the most water, yet its column stood the lowest.", "The column changed when the heat changed, not when the water changed."] },
      /* practice 8: answer in the plan = The cup at 70 deg C, by 25 degrees (typed: the 25; the cups are named in the question)
         plan question: Two cups of water are at 45 deg C and 70 deg C. Which is hotter, and by how many degrees? */
      { qid: "M3.S5.T8.C35:8", kind: "diff", lo: 45, hi: 70, answer: 25, near: 115,
        say: "Two cups are at 45 °C and 70 °C, so by how many degrees is one hotter?", ask: "How many degrees?",
        miss: "Count up the scale from 45 to 70.",
        ladder: ["Each small mark on these scales is worth 5 degrees.", "From 45 up to 50 is 5, so how far is it from 50 up to 70?"] },
    ],
  },
  {
    n: 2,
    concept: "Two scales",
    conceptId: "M3.S5.T8.C36", objectiveIds: ["O13"],
    says: ["Each key puts the column at a reading shown on both sides of the tube."],
    steps: [
      { say: "Tap Room temperature and read the column on both sides.", on: "room", hint: "The four keys stand right of the tube." },
    ],
    ladder: ["Tap the key the question names, then read across.", "Follow the top of the column to the side the question asks for."],
    closing: "Water freezes at 0 °C and boils at 100 °C, which are 32 °F and 212 °F.",
    learned: "You learned: water freezes at 0 °C and boils at 100 °C.",
    traceback: "the column goes to the reading asked, its key is ringed amber, the side asked is lit amber, then both readings show",
    items: [
      /* learn TR2: answer in the plan = Water boils at 100 deg C, which is 212 deg F. (two boxes, labelled with the unit symbol) */
      { qid: "M3.S5.T8.C36:TR2", kind: "land", lm: "boil", side: "both", parts: [{ label: "°C" }, { label: "°F" }], answer: [100, 212], near: "212|100",
        say: "At what temperature does water boil on the Celsius and Fahrenheit sides?", ask: "Water boils at?",
        miss: "Tap Boiling water and read both sides of the tube.",
        ladder: ["Celsius is the left side of the tube, Fahrenheit the right side.", "Celsius goes in the first box and Fahrenheit in the second."] },
      /* practice 2: answer in the plan = 32 deg F */
      { qid: "M3.S5.T8.C36:2", kind: "land", lm: "freeze", side: "F", answer: 32, near: 0,
        say: "At what temperature does water freeze on the Fahrenheit scale?", ask: "Freezes, in °F?",
        miss: "Tap Freezing water, then read the Fahrenheit side.",
        ladder: ["Fahrenheit is the side with only four marks.", "Read the Fahrenheit number level with the top of the column."] },
      /* practice 5: answer in the plan = About 37 deg C */
      { qid: "M3.S5.T8.C36:5", kind: "land", lm: "body", side: "C", answer: 37, near: 21,
        say: "What is normal body temperature on the Celsius scale?", ask: "Body, in °C?",
        miss: "Start with the Body temperature key.",
        ladder: ["The Celsius reading shows in the box ending in °C, beside the column's top.", "Type the number shown in that box."] },
    ],
  },
  {
    n: 3,
    concept: "What one small mark is worth",
    conceptId: "M3.S5.T8.C37", objectiveIds: ["O14"],
    says: ["Count the steps between neighbouring labels, not the marks."],
    /* the guide steps work a warm-up scale of their own (labels 0, 15, 30), never question 1's */
    warm: { lab: [0, 15, 30] },
    steps: [
      { say: "Tap the 0 label at the bottom of the scale.", on: "label-0", hint: "The 0 label is beside the tube, at the bottom." },
      { say: "Now tap the 15 label, the next label up.", on: "label-15", hint: "Tap the label just above 0." },
      { say: "Tap Count to count the steps from 0 to 15.", on: "count", hint: "The Count key is under the picture." },
    ],
    ladder: ["Every gap between neighbouring labels holds the same number of steps.", "A mark is worth a whole gap shared out by its steps."],
    closing: "Steps are one more than marks, and a mark is worth the gap shared by the steps.",
    learned: "You learned: a mark is the gap between labels shared by the steps.",
    traceback: "the two labels light deep blue, the steps between them light amber one at a time, then the worth of one mark is pinned",
    items: [
      /* learn TR3: answer in the plan = 2 degrees.
         plan question: A thermometer is labelled 60, 70 and 80 deg C, with 4 small marks between neighbouring labels. What is one small mark worth? */
      { qid: "M3.S5.T8.C37:TR3", kind: "worth", lab: [60, 70, 80], answer: 2, near: "2.5",
        say: "This scale has 4 small marks between labels, so what is each worth?", ask: "Each mark is worth?",
        miss: "Count the steps from 60 to 70, not the marks.",
        ladder: ["The gap from 60 to 70 is 10 degrees.", "Share those 10 degrees equally among the 5 steps."] },
      /* practice 3: answer in the plan = 1 degree, because 5 divided by 5 is 1
         plan question: Labels 20 and 25 deg C have 4 small marks between them. What is one small mark worth? */
      { qid: "M3.S5.T8.C37:3", kind: "worth", lab: [20, 25, 30], answer: 1, near: "1.25",
        say: "Here the labels go up by 5, so what is each small mark worth?", ask: "Each mark here?",
        miss: "How many steps are there from 20 to 25?",
        ladder: ["From 20 to 25 the 4 small marks make 5 steps.", "Share the 5 degrees out over those steps."] },
      /* practice 6: answer in the plan = 4 degrees, because 20 divided by 5 is 4
         plan question: Labels 40 and 60 deg C have 4 small marks between them. What is one small mark worth? */
      { qid: "M3.S5.T8.C37:6", kind: "worth", lab: [40, 60, 80], answer: 4, near: 5,
        say: "What is each small mark worth on this last scale?", ask: "Each mark, last scale?",
        miss: "Find the gap from 40 to 60 first.",
        ladder: ["60 take away 40 is 20 degrees.", "Now divide 20 by the steps between 40 and 60."] },
    ],
  },
  {
    n: 4,
    concept: "Reading a thermometer",
    conceptId: "M3.S5.T8.C38", objectiveIds: ["O14"],
    says: ["Find what a mark is worth, then count up from the label."],
    /* the guide steps work a warm-up thermometer of their own (labels 40, 50, 60, the column 4 marks above 40), never question 1's */
    warm: { lab: [40, 50, 60], base: 0, k: 4 },
    steps: [
      { say: "Tap the label just below the top of the green column.", on: "label-40", hint: "Look where the green column stops." },
      { say: "Tap Count to count the marks up to the top.", on: "count", hint: "The Count key is at the bottom." },
    ],
    ladder: ["How many marks sit between that label and the green top?", "Add the worth of those marks to the label below."],
    closing: "Count the marks up from the label below the column, then add.",
    learned: "You learned: count the marks up from the label below, then add.",
    traceback: "the child's reading is drawn as a pale column beside the real one, the marks above the label light one at a time, then the sum",
    items: [
      /* learn TR4: answer in the plan = 66 deg C.
         plan question: On a thermometer labelled 60, 70 and 80 deg C, one small mark is worth 2 degrees. The column stops 3 small marks above the 60 label. What does it read? */
      { qid: "M3.S5.T8.C38:TR4", kind: "read", lab: [60, 70, 80], base: 0, k: 3, answer: 66, near: 63,
        say: "One small mark is worth 2 degrees here, so what does the thermometer read?", ask: "It reads?",
        miss: "Count the marks from the label below up to the green top.",
        ladder: ["There are 3 marks between the 60 label and the green top.", "3 marks of 2 degrees are 6 degrees above the 60 label."] },
      /* practice 4: answer in the plan = 28 deg C
         plan question: On a thermometer where one small mark is worth 1 degree, the column stops 3 marks above the 25 label. What is the reading? */
      { qid: "M3.S5.T8.C38:4", kind: "read", lab: [20, 25, 30], base: 1, k: 3, answer: 28, near: 25,
        say: "On this one a mark is worth 1 degree, so what is the reading?", ask: "The reading?",
        miss: "The column passes the 25 label before it stops.",
        ladder: ["How many marks are there from 25 up to the top of the column?", "3 marks sit above the 25 label."] },
      /* practice 7: answer in the plan = 38 deg C, because each mark is worth 4 degrees
         plan question: Labels 30 and 50 deg C have 4 small marks between them. The column stops 2 marks above the 30 label. What is the reading? */
      { qid: "M3.S5.T8.C38:7", kind: "read", lab: [30, 50, 70], base: 0, k: 2, answer: 38, near: 32,
        say: "Find what a mark is worth first, then read this thermometer.", ask: "Read it?",
        miss: "How many degrees lie between the 30 and 50 labels?",
        ladder: ["Count the steps from 30 to 50, then share the gap among them.", "Then count the marks above 30 and add their worth to 30."] },
    ],
  },
];

/* The numbers the working area needs (they go into the sidecar too). */
const TQ_TEMP: any = { stand: 25, ice: 0, water: 20, tea: 70 };
const TQ_LM: any = { freeze: [0, 32], room: [21, 69.8], body: [37, 98.6], boil: [100, 212] };
const MODEL = { cupTemps: TQ_TEMP, landmarks: TQ_LM, marksBetweenLabels: 4, stepsBetweenLabels: 5 };

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

const judge = (item: any, v: any) => {
  if (item.parts) return judgeSlotParts(item, v);
  /* a whole number as written ("2", or "2.0"); a decimal such as 2.5 (marks taken for steps) or a lone "2." is a miss */
  if (typeof item.answer === "number") { const t = String(v ?? "").trim(); return /^\d+(\.\d+)?$/.test(t) && Number(t) === item.answer; }
  return String(v).trim().toLowerCase() === String(item.answer).trim().toLowerCase();
};
/* oracle: every answer re-derived by a second route: the hotter cup from the temperature table, the difference, the
   Fahrenheit reading from the conversion (the tool never shows it), a mark's worth = gap / (marks + 1), a reading =
   the label below + marks x worth */
const oracle = () => {
  const toF = (c: number) => Math.round((c * 9 / 5 + 32) * 10) / 10;
  const C0: any = { freeze: 0, room: 21, body: 37, boil: 100 };
  const lmOk = Object.keys(C0).every((k) => TQ_LM[k][0] === C0[k] && TQ_LM[k][1] === toF(C0[k]));
  return lmOk && PHASES.every((p: any) => p.items.every((it: any) => {
    if (it.kind === "pick") return it.qid.endsWith(":TR1") ? it.answer === (TQ_TEMP.tea > TQ_TEMP.ice ? "tea" : "ice") : it.answer === "hot";
    if (it.kind === "diff") return it.answer === it.hi - it.lo;
    if (it.kind === "land") {
      const c = C0[it.lm], f = toF(c);
      return it.side === "both" ? it.answer[0] === c && it.answer[1] === f : it.answer === (it.side === "F" ? f : c);
    }
    const worth = (it.lab[1] - it.lab[0]) / (4 + 1);
    if (it.kind === "worth") return it.answer === worth;
    if (it.kind === "read") return it.answer === it.lab[it.base] + it.k * worth;
    return false;
  }));
};
const nearMiss = (item: any) => (item.near !== undefined ? item.near : typeof item.answer === "number" ? item.answer + 1 : "~");
/* the forms of an answer no question, hint or ladder line may print: a choice's answer is the statement that gives it away */
const answerForms = (item: any) => (item.choices ? [item.qid.endsWith(":TR1") ? "the tea is hotter" : "how hot or cold"]
  : item.parts ? item.answer.flatMap((x: number) => [String(x), words(x)])
  : [String(item.answer), indian(item.answer), words(item.answer)]);
const agentKey = (item: any) => item.answer;

const HOOK: any = {};
const solve = (item: any, T: any) => (T.state().stage === "demo" ? HOOK.demo && HOOK.demo() : T.submit(item.answer));
const answer = (item: any, v: any) => undefined;
const check = () => undefined;

/* ── drawing helpers (module level, called, never mounted) ─────────────────────────────────── */
const TQC = { given: CONTENT.hundred, read: CONTENT.one, mark: CONTENT.pointer, other: CONTENT.bead, now: CONTENT.ten };
const tqInk = (c: string) => shade(c, 0.25);

/* the tube, the bulb and the column (colY = the top of the column, null = no liquid) */
function tqBody({ cx, top, by, br, colY, C, anim = true, tw = 56 }: any) {
  const liquid = colY !== null && colY !== undefined;
  const cw = 24, yT = top + 12, yB = by - br + 10;
  const f = liquid ? Math.max(0, Math.min(1, (yB - colY) / (yB - yT))) : 0;
  const tr = anim && !reducedMotion() ? "transform 900ms ease-in-out" : "none";
  return (
    <g>
      <rect x={cx - tw / 2} y={top} width={tw} height={by - top} rx={tw / 2} fill="#FFFFFF" stroke={C.ink} strokeWidth={4} />
      <circle cx={cx} cy={by} r={br} fill={liquid ? TQC.read : "#FFFFFF"} stroke={C.ink} strokeWidth={4} />
      <rect x={cx - tw / 2 + 2.5} y={by - br - 6} width={tw - 5} height={16} fill="#FFFFFF" />
      {liquid && <rect x={cx - cw / 2} y={by - br - 8} width={cw} height={20} fill={TQC.read} />}
      {liquid && <rect x={cx - cw / 2} y={yT} width={cw} height={yB - yT} fill={TQC.read}
        style={{ transform: `scaleY(${f})`, transformBox: "fill-box", transformOrigin: "50% 100%", transition: tr } as any} />}
    </g>
  );
}

/* the shelf: a thermometer, a stand, two clay vessels (the `cup` skin: the wide bowl of ice water, the tea kulhad), a glass tumbler of
   water drawn in code, and the column bars. Only the BULB dips: every liquid surface sits just over the bulb, so the 0 mark and the
   column's top stand at least 60 above every rim (the visual review: the rim and the ice hid the 0 and the column) */
const TQ_SH = { top: 120, by: 440, br: 36, shelfY: 500 };
const tqShY = (v: number) => 320 - v * 1.8;
const TQ_SHX: any = { stand: 170, ice: 355, water: 575, tea: 775 };
/* the clay skin is 158 x 200 (0.79 wide for its height): the kulhad keeps it, the bowl of ice water stretches it wider */
const TQ_CUP: any = { ice: { x: 250, y: 380, w: 210, h: 120 }, water: { x: 515, y: 376, w: 120, h: 124 }, tea: { x: 724, y: 372, w: 102, h: 128 } };
const TQ_CUPS = ["ice", "water", "tea"];
function tqShelfThermo(cx: number, v: number, C: any, labels: boolean, anim: boolean) {
  const ticks: any[] = [];
  for (let t = 0; t <= 100; t += 10) ticks.push(<line key={t} x1={cx - 28} x2={cx - 28 - (t % 50 === 0 ? 30 : 16)} y1={tqShY(t)} y2={tqShY(t)} stroke={C.ink} strokeWidth={t % 50 === 0 ? 4 : 3} />);
  return (
    <g>
      {ticks}
      {labels && [0, 50, 100].map((t) => <text key={t} x={cx - 72} y={tqShY(t) + 15} textAnchor="end" fontSize={T.speech} fontWeight={700} fill={C.ink}>{t}</text>)}
      {tqBody({ cx, top: TQ_SH.top, by: TQ_SH.by, br: TQ_SH.br, colY: tqShY(v), C, anim })}
    </g>
  );
}
/* a clear glass tumbler of water, drawn in code (the visual review: the clay cup read as a flower pot): drawn AFTER a thermometer
   that stands in it, so the bulb shows through the water */
function tqGlass(b: any, C: any) {
  const { x, y, w, h } = b, cx = x + w / 2, wy = y + 0.14 * h, inset = w * 0.08;
  const side = (t: number) => x + inset * ((t - y) / h);   /* the left wall at height t */
  const body = `M ${x} ${y} L ${x + w} ${y} L ${x + w - inset} ${y + h - 10} Q ${x + w - inset - 2} ${y + h} ${x + w - inset - 12} ${y + h} L ${x + inset + 12} ${y + h} Q ${x + inset + 2} ${y + h} ${x + inset} ${y + h - 10} Z`;
  const water = `M ${side(wy)} ${wy} L ${x + w - (side(wy) - x)} ${wy} L ${x + w - inset} ${y + h - 10} Q ${x + w - inset - 2} ${y + h} ${x + w - inset - 12} ${y + h} L ${x + inset + 12} ${y + h} Q ${x + inset + 2} ${y + h} ${x + inset} ${y + h - 10} Z`;
  return (
    <g data-thing="water">
      <path d={body} fill="#EEF7FB" fillOpacity={0.4} />
      <path d={water} fill="#7FC4E8" fillOpacity={0.55} />
      <ellipse cx={cx} cy={wy} rx={(w - 2 * (side(wy) - x)) / 2} ry={6} fill="#BFE6F7" stroke="#5E9CBF" strokeWidth={2} />
      <path d={body} fill="none" stroke="#4F7D96" strokeWidth={4} strokeLinejoin="round" />
      <ellipse cx={cx} cy={y} rx={w / 2} ry={7} fill="none" stroke="#4F7D96" strokeWidth={3} />
      <line x1={x + 14} y1={y + 14} x2={x + inset + 16} y2={y + h - 18} stroke="#FFFFFF" strokeWidth={5} strokeLinecap="round" opacity={0.8} />
    </g>
  );
}
/* a clay vessel in side view (the image agent's `cup` skin drawn over the plain one); the liquid, the ice and the steam are drawn
   in code at its mouth. layer "front" redraws only the part below the liquid, over a thermometer that stands in it, so the tube goes
   INTO the vessel; with `dip` the steam rises clear of the tube. The water is a glass (tqGlass), drawn whole in either layer */
function tqCup(kind: string, b: any, C: any, layer = "all", dip = false) {
  if (kind === "water") return tqGlass(b, C);
  const { x, y, w, h } = b, cx = x + w / 2, rc = y + 0.09 * h, ry = 0.08 * h, sy = y + 0.11 * h;
  const clay = "#C9773F", clayEdge = shade("#C9773F", 0.45);
  const body = `M ${x} ${rc} L ${x + w} ${rc} L ${x + w * 0.86} ${y + h - 12} Q ${x + w * 0.84} ${y + h} ${x + w * 0.7} ${y + h} L ${x + w * 0.3} ${y + h} Q ${x + w * 0.16} ${y + h} ${x + w * 0.14} ${y + h - 12} Z`;
  const top = kind === "tea" ? "#8A4E24" : "#9FD3EE";
  const front = layer === "front", cid = "tqf-" + kind + "-" + Math.round(x) + "-" + Math.round(y);
  return (
    <g data-thing={kind}>
      {front && <defs><clipPath id={cid}><rect x={x - 6} y={sy} width={w + 12} height={y + h - sy + 6} /></clipPath></defs>}
      <g clipPath={front ? `url(#${cid})` : undefined}>
        <path d={body} fill={clay} stroke={clayEdge} strokeWidth={4} strokeLinejoin="round" />
        {!front && <ellipse cx={cx} cy={rc} rx={w / 2} ry={ry} fill={tint(clay, 0.25)} stroke={clayEdge} strokeWidth={4} />}
        <Skin name="cup" x={x} y={y} w={w} h={h} fit="stretch" />
      </g>
      <ellipse cx={cx} cy={sy} rx={w * 0.4} ry={0.05 * h} fill={top} />
      {kind === "ice" && [-62, -14, 34].map((dx, j) => (
        <rect key={j} x={cx + dx} y={sy - 16 + (j % 2) * 6} width={30} height={24} rx={6} fill="#F4FBFF" stroke="#6FA9C9" strokeWidth={3} transform={`rotate(${j * 14 - 12} ${cx + dx + 15} ${sy})`} />
      ))}
      {kind === "tea" && !front && (dip ? [-44, 44] : [-26, 0, 26]).map((dx, j) => (
        <path key={j} d={`M ${cx + dx} ${y - 14} q -10 -14 0 -28 q 10 -14 0 -28`} fill="none" stroke={C.dim} strokeWidth={4} strokeLinecap="round" />
      ))}
    </g>
  );
}
function tqShelf(C: any, o: any) {
  const inCup = !o.hide && TQ_CUP[o.at] ? o.at : null;
  return (
    <g>
      <rect x={210} y={TQ_SH.shelfY} width={690} height={16} rx={6} fill="#D8B48A" stroke={shade("#D8B48A", 0.4)} strokeWidth={3} />
      {o.at === "stand" && !o.hide && <rect x={TQ_SHX.stand - 44} y={478} width={88} height={38} rx={10} fill={tint(C.rule, 0.35)} stroke={C.ink} strokeWidth={3} />}
      {TQ_CUPS.filter((c) => !(c === "water" && inCup === "water")).map((c) => <g key={c}>{tqCup(c, TQ_CUP[c], C, "all", inCup === c)}</g>)}
      {!o.hide && tqShelfThermo(TQ_SHX[o.at], o.v, C, o.labels, o.anim)}
      {inCup && tqCup(inCup, TQ_CUP[inCup], C, "front", true)}
      {TQ_CUPS.filter((c) => o.bars && o.bars[c]).map((c) => {
        const hgt = (TQ_TEMP[c] + 8) * 1.4, b = TQ_CUP[c], lit = o.amber === c;
        return <rect key={"bar" + c} x={b.x + b.w + 8} y={TQ_SH.shelfY - hgt} width={16} height={hgt} rx={4} fill={TQC.read} stroke={lit ? TQC.now : C.ink} strokeWidth={lit ? 6 : 2} />;
      })}
    </g>
  );
}

/* a chip: a rounded card with one line of text */
function tqChip(x: number, y: number, w: number, h: number, text: string, col: string, C: any, size = T.label, fill = "#FFFFFF") {
  return (
    <g pointerEvents="none">
      <rect x={x} y={y} width={w} height={h} rx={14} fill={fill} stroke={col} strokeWidth={4} />
      <text x={x + w / 2} y={y + h / 2 + size * 0.35} textAnchor="middle" fontSize={size} fontWeight={700} fill={col === C.ink ? C.ink : tqInk(col)}>{text}</text>
    </g>
  );
}

/* a chip holding a short sum: one text, each token its own tspan spaced by dx (no whitespace between tokens, so the sum reads
   as one label); a token may be a word label of its own ("One mark") */
function tqEq(x: number, y: number, w: number, h: number, toks: any[], col: string, C: any, size = T.label) {
  return (
    <g pointerEvents="none">
      <rect x={x} y={y} width={w} height={h} rx={14} fill="#FFFFFF" stroke={col} strokeWidth={4} />
      <text x={x + w / 2} y={y + h / 2 + size * 0.35} textAnchor="middle" fontSize={size} fontWeight={700} fill={col === C.ink ? C.ink : tqInk(col)}>
        {toks.map((t, j) => <tspan key={j} dx={j ? (String(t).charAt(0) === "°" ? size * 0.12 : size * 0.3) : 0}>{String(t)}</tspan>)}
      </text>
    </g>
  );
}

/* phase 2: one tube, Celsius on the left, Fahrenheit on the right (four marks), four landmark keys */
const TQ_P2 = { cx: 300, top: 20, by: 462, br: 38 };
const tqP2Y = (v: number) => 410 - v * 3.5;
const TQ_LMKEYS = [{ id: "boil", name: "Boiling water", y: 40 }, { id: "body", name: "Body temperature", y: 150 }, { id: "room", name: "Room temperature", y: 260 }, { id: "freeze", name: "Freezing water", y: 370 }];

/* phases 3 and 4: one tube, three labels 190 apart, 4 small marks (5 steps of 38) between neighbours; laid out for the open width */
const TQ_P3 = { cx: 200, top: 20, by: 480, br: 32 };
const tqLY = (i: number) => 440 - i * 190;
const TQ_STEP = 38;

/* phase 1, question 3: two thermometers in two cups, 30 to 80 */
const TQ_DF = { top: 24, by: 462, br: 30, xa: 260, xb: 620 };
const tqDfY = (v: number) => 370 - (v - 30) * 6.4;

/* ── the working area ──────────────────────────────────────────────────────────────────────── */
function Work({ phase, n, item, index, stage, wrong, typed, api, MODEL, step, stepOn, box, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();
  const free = stage === "free";
  const demo = stage === "demo";
  const asking = stage === "ask";
  const done = stage === "win" || stage === "idle";
  const it = item || {};
  /* the guide steps always work the phase's warm-up board (question 1's kind), whichever question the runtime holds: r62 replays the
     steps when a question is entered again (gotoStep to it), and a board of another kind would leave the step's act undoable */
  const warmUp = stage === "demo" || stage === "teach";
  const kIt = warmUp && phase && phase.items && phase.items[0] ? phase.items[0] : it;
  const k = free ? "shelf" : kIt.kind === "pick" || !kIt.kind ? "shelf" : kIt.kind;
  const fresh = () => ({ at: "stand", dipped: {}, carry: false, lm: null, sel: [], cnt: null });
  const [s, setS] = useState(fresh as any);
  const [tb, setTb] = useState(0);
  const busy = useRef(false);
  const lastKey = useRef(0);

  /* a fresh picture for every question, for free play and for the warm-up (so the warm-up never carries into question 1):
     reset DURING render when the key changes, so the first frame of a new question never draws the old state */
  /* a phase opens on "teach" for one frame before "demo": that frame is the warm-up's too (PATTERNS §18) */
  const qKey = n + ":" + index + ":" + (free ? "f" : warmUp ? "d" : "q");
  const [seen, setSeen] = useState(qKey);
  if (seen !== qKey) { setSeen(qKey); setS(fresh()); setTb(0); }
  useEffect(() => { busy.current = false; }, [n, index, free]);
  /* a correction replay never outlives its question (PATTERNS §18): when the question key changes (Next, a dot, gotoStep) the
     old replay stops, never lights the new board, and the lock it took is given back */
  const qRef = useRef(qKey);
  qRef.current = qKey;
  const tbRun = useRef(false);
  useEffect(() => () => { if (tbRun.current) { tbRun.current = false; tl.stop(); api.lock(false); } }, [qKey]);
  /* a restart inside the warm-up (a phase dot during the steps) */
  const [seenStep, setSeenStep] = useState(step);
  if (seenStep !== step) { setSeenStep(step); if (demo && step === 0) { setS(fresh()); setTb(0); } }

  /* the room: laid out ONCE for the open width (900, bigPad), shut or open, so nothing slides when the keypad opens (LAYOUT §3);
     the key's corner (x 1190) is far right of it */
  const ox = 0;
  /* Hindi and Gujarati read smaller at one size: their labels, chips and captions grow to fill their boxes */
  const L = (sz: number) => (lang === "en" ? sz : Math.round(sz * 1.15));
  const lv = done ? 99 : asking ? tb : 0;
  const tbOn = asking && tb > 0;
  const did = (name: string) => { if (demo) api.did(name); };

  /* phase 3 and 4 numbers */
  const cur = warmUp && phase && phase.warm ? { ...kIt, ...phase.warm } : it;   /* the guide steps' warm-up, else the question */
  const lab = cur.lab || [0, 10, 20];
  const worth = (lab[1] - lab[0]) / 5;
  const yOf = (v: number) => tqLY(0) - ((v - lab[0]) / worth) * TQ_STEP;
  const topV = k === "read" ? lab[cur.base] + cur.k * worth : 0;

  /* ── the acts ── */
  const dip = async (cup: string) => {
    if (tl.busy) return;   /* a correction is playing: the board waits for it */
    if (demo && stepOn !== cup) { did(cup); return; }
    setTb(0);
    if (busy.current) return;
    if (s.at === cup) { did(cup); return; }
    busy.current = true;
    const from = s.at, fx = TQ_SHX[from];
    setS((p: any) => ({ ...p, carry: true }));
    const ok = await api.act({ tool: "hand", moves: "carry", from: { x: ox + fx, y: TQ_SH.top }, at: [{ x: ox + TQ_SHX[cup], y: TQ_SH.top }],
      hold: <g transform={`translate(${-fx},${-TQ_SH.top})`}>{tqShelfThermo(fx, TQ_TEMP[from], C, false, false)}</g> });
    busy.current = false;
    if (!ok) { setS((p: any) => ({ ...p, carry: false })); return; }
    setS((p: any) => ({ ...p, carry: false, at: cup, dipped: { ...p.dipped, [cup]: true } }));
    api.sfx.settle();
    did(cup);
  };
  const land = (id: string) => {
    if (tl.busy) return;
    if (demo && stepOn !== id) { did(id); return; }
    setTb(0);
    setS((p: any) => ({ ...p, lm: id }));
    api.sfx.tick();
    did(id);
  };
  const tapLabel = (i: number) => {
    const name = "label-" + lab[i];
    if (tl.busy) return;
    if (demo && stepOn !== name) { did(name); return; }
    if (busy.current) return;
    setTb(0);
    /* a guide step only ever ADDS its label (never toggles it off), so a step done twice, or after a reset, still holds */
    if (k === "worth") setS((p: any) => ({ ...p, cnt: null, sel: p.sel.includes(i) ? (demo ? p.sel : p.sel.filter((j: number) => j !== i)) : [...p.sel, i].slice(-2) }));
    else setS((p: any) => ({ ...p, cnt: null, sel: p.sel[0] === i && !demo ? [] : [i] }));
    api.sfx.tick();
    did(name);
  };
  const countPlan = () => {
    if (k === "worth") {
      if (s.sel.length !== 2 || Math.abs(s.sel[0] - s.sel[1]) !== 1) return null;
      return { from: Math.min(s.sel[0], s.sel[1]), n: 5 };
    }
    if (k === "read") {
      if (s.sel.length !== 1) return null;
      const m = Math.round((topV - lab[s.sel[0]]) / worth);
      return m > 0 ? { from: s.sel[0], n: m } : null;
    }
    return null;
  };
  const cpNow = countPlan();
  const count = async () => {
    if (tl.busy) return;
    if (demo && stepOn !== "count") { did("count"); return; }
    /* in a guide step the count is the step's own (the labels the steps named), whatever the picks hold */
    const cp = demo ? (k === "worth" ? { from: 0, n: 5 } : { from: cur.base, n: cur.k }) : cpNow;
    if (!cp || busy.current) return;
    setTb(0);
    busy.current = true;
    setS((p: any) => ({ ...p, sel: demo ? (k === "worth" ? [0, 1] : [cur.base]) : p.sel, cnt: { from: cp.from, n: cp.n, lit: 0, done: false } }));
    const pts = Array.from({ length: cp.n }, (_, j) => ({ x: ox + TQ_P3.cx + 20, y: k === "worth" ? tqLY(cp.from) - (j + 0.5) * TQ_STEP : tqLY(cp.from) - (j + 1) * TQ_STEP }));
    const ok = await api.act({ tool: "hand", moves: "tap", at: pts, onPoint: (i: number) => setS((p: any) => (p.cnt ? { ...p, cnt: { ...p.cnt, lit: i + 1 } } : p)) });
    busy.current = false;
    if (!ok) { setS((p: any) => ({ ...p, cnt: null })); return; }
    setS((p: any) => (p.cnt ? { ...p, cnt: { ...p.cnt, lit: p.cnt.n, done: true } } : p));
    api.sfx.settle();
    did("count");
  };
  const act = (on: any) => {
    if (!on) return;
    if (k === "shelf") { dip(on); return; }
    if (k === "land") { land(on); return; }
    if (on === "count") { count(); return; }
    if (String(on).indexOf("label-") === 0) { const i = lab.indexOf(Number(String(on).slice(6))); if (i >= 0) tapLabel(i); }
  };
  api.onEnter(demo && stepOn ? () => act(stepOn) : null);
  HOOK.demo = () => act(stepOn);

  /* the traceback: the maths redrawn in steps on its own layer, ending on the whole right answer; never marked */
  const tbLevels = () => (k === "shelf" ? 3 : k === "diff" ? 3 : k === "land" ? 4 : k === "worth" ? 7 : 4 + (it.k || 0));
  useEffect(() => {
    if (!wrong || stage !== "ask") return;
    const key = qRef.current;
    api.lock(true);
    tbRun.current = true;
    const n0 = tbLevels(), seq: any[] = [];
    for (let i = 1; i <= n0; i++) seq.push([i === 1 ? 500 : 600, ((j) => () => { if (qRef.current === key) setTb(j); })(i)]);
    seq.push([700, null]);
    tl.run(seq, () => { if (qRef.current === key) { tbRun.current = false; api.lock(false); } });
  }, [wrong]);

  /* the win line: one sentence, a literal per question (the last question of a phase shows the closing instead) */
  useEffect(() => {
    if (stage !== "win") return;
    const q = it.qid;
    if (q === "M3.S5.T8.C35:TR1") api.say("Yes, the column climbed far higher in the tea.");
    else if (q === "M3.S5.T8.C35:1") api.say("Yes, the column follows heat, not the amount of water.");
    else if (q === "M3.S5.T8.C36:TR2") api.say("Yes, water boils at 100 °C, which is 212 °F.");
    else if (q === "M3.S5.T8.C36:2") api.say("Yes, water freezes at 32 °F, the same as 0 °C.");
    else if (q === "M3.S5.T8.C37:TR3") api.say("Yes, 10 degrees in 5 steps makes each mark worth 2.");
    else if (q === "M3.S5.T8.C37:3") api.say("Yes, 5 degrees in 5 steps makes each mark worth 1.");
    else if (q === "M3.S5.T8.C38:TR4") api.say("Yes, 3 marks of 2 degrees above 60 make 66 °C.");
    else if (q === "M3.S5.T8.C38:4") api.say("Yes, 3 marks of 1 degree above 25 make 28 °C.");
    else if (phase && phase.closing) api.say(phase.closing);   /* a phase's last question: the runtime shows the closing line in its place */
  }, [stage, n, index]);

  /* what the host and the agent read back: nothing that answers the question before it is answered */
  api.share({ phase: n, labels: it.lab || null, marks_between: it.lab ? 4 : null, counted: done && s.cnt ? s.cnt.lit : null, complete: stage === "idle" });

  /* ── the pictures ── */
  /* the one invite hugs the piece's own box (x, y its centre; PATTERNS §18) */
  const invite = (x: number, y: number, w: number, h: number, rx = 16) => <Invite x={x} y={y} w={w} h={h} rx={rx} C={C} />;

  const shelfPic = () => {
    const qTR1 = it.qid === "M3.S5.T8.C35:TR1";
    return (
      <g>
        {tqShelf(C, { at: s.at, v: TQ_TEMP[s.at], labels: true, anim: true, hide: s.carry, bars: lv >= 1 && !free ? { ice: 1, water: 1, tea: 1 } : s.dipped, amber: tbOn && tb >= 2 ? "tea" : null })}
        {TQ_CUPS.map((c) => { const b = TQ_CUP[c]; return <Hit key={"hit" + c} id={c} x={b.x - 4} y={b.y - 40} w={b.w + 8} h={b.h + 40} label={tx(c === "ice" ? "Bowl of ice water" : c === "water" ? "Cup of water" : "Cup of tea")} onPress={() => dip(c)} />; })}
        {lv >= 3 && !free && (qTR1
          ? tqChip(TQ_CUP.tea.x - 64, 34, TQ_CUP.tea.w + 128, 64, tx(it.tag), TQC.read, C, L(T.label))
          : tqChip(240, 34, 340, 64, tx(it.tag || ""), TQC.read, C, L(T.label)))}
        {demo && stepOn && TQ_CUP[stepOn] && invite(TQ_CUP[stepOn].x + TQ_CUP[stepOn].w / 2, TQ_CUP[stepOn].y + TQ_CUP[stepOn].h / 2, TQ_CUP[stepOn].w, TQ_CUP[stepOn].h)}
      </g>
    );
  };

  const diffPic = () => {
    const ya = tqDfY(it.lo), yb = tqDfY(it.hi);
    const thermo = (cx: number, v: number) => {
      const ticks: any[] = [];
      for (let t = 30; t <= 80; t += 5) ticks.push(<line key={t} x1={cx - 28} x2={cx - 28 - (t % 10 === 0 ? 30 : 16)} y1={tqDfY(t)} y2={tqDfY(t)} stroke={C.ink} strokeWidth={t % 10 === 0 ? 4 : 3} />);
      return (
        <g>
          {ticks}
          {[30, 40, 50, 60, 70, 80].map((t) => <text key={t} x={cx - 64} y={tqDfY(t) + 14} textAnchor="end" fontSize={T.prompt} fontWeight={700} fill={C.ink}>{t}</text>)}
          {tqBody({ cx, top: TQ_DF.top, by: TQ_DF.by, br: TQ_DF.br, colY: tqDfY(v), C, anim: false })}
        </g>
      );
    };
    return (
      <g>
        {thermo(TQ_DF.xa, it.lo)}
        {thermo(TQ_DF.xb, it.hi)}
        {tqGlass({ x: TQ_DF.xa - 55, y: 392, w: 110, h: 118 }, C)}
        {tqGlass({ x: TQ_DF.xb - 55, y: 392, w: 110, h: 118 }, C)}
        {tqChip(TQ_DF.xa + 40, ya - 28, 124, 56, it.lo + " °C", TQC.given, C)}
        {tqChip(TQ_DF.xb + 60, yb - 28, 124, 56, it.hi + " °C", TQC.given, C)}
        {lv >= 1 && <line x1={TQ_DF.xa + 168} y1={ya} x2={TQ_DF.xb - 28} y2={ya} stroke={C.ink} strokeWidth={3} strokeDasharray="10 8" pointerEvents="none" />}
        {lv >= 2 && <rect x={TQ_DF.xb + 34} y={yb} width={14} height={ya - yb} rx={5} fill={tbOn ? TQC.now : TQC.read} pointerEvents="none" />}
        {lv >= 3 && tqEq(TQ_DF.xb + 60, (ya + yb) / 2 - 30, 220, 60, [it.hi, "−", it.lo, "=", it.answer], TQC.read, C)}
      </g>
    );
  };

  const landPic = () => {
    const lmShown = lv >= 1 ? it.lm : s.lm;
    const cV = lmShown ? TQ_LM[lmShown][0] : 21;
    const yc = tqP2Y(cV);
    const { cx } = TQ_P2;
    const KX = 540, KW = 344;   /* the reading keys: "Room temperature" clears both edges */
    const ticks: any[] = [];
    for (let t = 0; t <= 100; t += 2) ticks.push(<line key={t} x1={cx - 28} x2={cx - 28 - (t % 10 === 0 ? 30 : 14)} y1={tqP2Y(t)} y2={tqP2Y(t)} stroke={C.ink} strokeWidth={t % 10 === 0 ? 3 : 2} />);
    const ambC = tbOn && tb >= 3 && (it.side === "C" || it.side === "both");
    const ambF = tbOn && tb >= 3 && (it.side === "F" || it.side === "both");
    const fTxt = lmShown ? String(TQ_LM[lmShown][1]) : "";
    const fw = fTxt.length * 20 + 20;
    return (
      <g>
        {ticks}
        {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((t) => <text key={t} x={cx - 66} y={tqP2Y(t) + 11} textAnchor="end" fontSize={T.label} fontWeight={600} fill={C.ink}>{t}</text>)}
        {TQ_LMKEYS.map((l) => <line key={"f" + l.id} x1={cx + 28} x2={cx + 62} y1={tqP2Y(TQ_LM[l.id][0])} y2={tqP2Y(TQ_LM[l.id][0])} stroke={tqInk(TQC.other)} strokeWidth={5} />)}
        <text x={cx - 46} y={500} textAnchor="end" fontSize={L(T.label)} fontWeight={700} fill={C.ink}>{tx("Celsius")}</text>
        <text x={cx + 46} y={500} textAnchor="start" fontSize={L(T.label)} fontWeight={700} fill={tqInk(TQC.other)}>{tx("Fahrenheit")}</text>
        {tqBody({ cx, top: TQ_P2.top, by: TQ_P2.by, br: TQ_P2.br, colY: yc, C })}
        {lmShown && (
          <g pointerEvents="none">
            <line x1={cx - 28} x2={cx + 62} y1={yc} y2={yc} stroke={tqInk(TQC.read)} strokeWidth={4} />
            {tqChip(18, yc - 28, 140, 56, cV + " °C", ambC ? TQC.now : TQC.read, C)}
            <rect x={cx + 66} y={yc - 28} width={fw} height={56} rx={14} fill="#FFFFFF" stroke={ambF ? TQC.now : TQC.other} strokeWidth={4} />
            <text x={cx + 66 + fw / 2} y={yc + 11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={tqInk(TQC.other)}>{fTxt}</text>
          </g>
        )}
        {TQ_LMKEYS.map((l) => {
          const on = lmShown === l.id, ring = tbOn && tb >= 2 && l.id === it.lm;
          return (
            <g key={l.id}>
              {(on || ring) && <rect x={KX - 8} y={l.y - 8} width={KW + 16} height={96} rx={24} fill="none" stroke={ring ? TQC.now : TQC.read} strokeWidth={6} pointerEvents="none" />}
              <Key id={l.id} x={KX} y={l.y} w={KW} h={80} C={C} label={tx(l.name)} onClick={() => land(l.id)}>
                <text y={L(T.label) * 0.35} textAnchor="middle" fontSize={L(T.label)} fontWeight={700} fill={C.ink}>{tx(l.name)}</text>
              </Key>
            </g>
          );
        })}
        {demo && stepOn && TQ_LMKEYS.some((l) => l.id === stepOn) && invite(KX + KW / 2, (TQ_LMKEYS.find((l) => l.id === stepOn) || TQ_LMKEYS[0]).y + 40, KW, 80, RAD.key)}
      </g>
    );
  };

  const scalePic = () => {
    const { cx } = TQ_P3;
    const isRead = k === "read";
    /* what is shown: the child's own picks, or the correction's / the win's */
    const sel = lv >= (isRead ? 2 : 1) ? (isRead ? [it.base] : [0, 1]) : s.sel;
    const cFrom = lv >= 1 ? (isRead ? it.base : 0) : s.cnt ? s.cnt.from : 0;
    const cLit = isRead ? (lv >= 3 ? Math.min(it.k, lv - 2) : s.cnt ? s.cnt.lit : 0) : (lv >= 2 ? Math.min(5, lv - 1) : s.cnt ? s.cnt.lit : 0);
    const showCnt = (lv >= (isRead ? 3 : 2)) || !!s.cnt;
    const worthChip = isRead ? lv >= 3 + it.k : lv >= 7;
    const sumChip = isRead && lv >= 4 + it.k;
    const ticks: any[] = [];
    for (let i = 0; i < 3; i++) ticks.push(<line key={"M" + i} x1={cx - 28} x2={cx - 66} y1={tqLY(i)} y2={tqLY(i)} stroke={C.ink} strokeWidth={4} />);
    for (let i = 0; i < 2; i++) for (let j = 1; j <= 4; j++) ticks.push(<line key={"m" + i + j} x1={cx - 28} x2={cx - 50} y1={tqLY(i) - j * TQ_STEP} y2={tqLY(i) - j * TQ_STEP} stroke={C.ink} strokeWidth={3} />);
    /* the child's reading, drawn beside the real column so the two tops are seen apart, and labelled */
    const ghost = isRead && tbOn && wrong ? leadNumber(String(wrong.value)) : null;
    const gY = ghost === null ? null : Math.max(TQ_P3.top + 12, Math.min(TQ_P3.by - TQ_P3.br, yOf(ghost)));
    const cntWord = isRead ? (cLit === 1 ? "mark" : "marks") : (cLit === 1 ? "step" : "steps");
    const keyOff = demo ? stepOn !== "count" : !cpNow;
    return (
      <g>
        {ticks}
        {tqBody({ cx, top: TQ_P3.top, by: TQ_P3.by, br: TQ_P3.br, colY: isRead ? yOf(topV) : null, C, anim: false })}
        {lab.map((v: number, i: number) => {
          const on = sel.includes(i);
          return (
            <g key={"lab" + i}>
              {on && <rect x={20} y={tqLY(i) - 46} width={112} height={92} rx={18} fill={tint(TQC.given, 0.85)} stroke={TQC.given} strokeWidth={4} pointerEvents="none" />}
              <text x={122} y={tqLY(i) + 25} textAnchor="end" fontSize={T.display} fontWeight={700} fill={on ? tqInk(TQC.given) : C.ink}>{v}</text>
              <Hit id={"label-" + v} x={20} y={tqLY(i) - 46} w={112} h={92} label={tx("Label") + " " + v} onPress={() => tapLabel(i)} />
            </g>
          );
        })}
        <g pointerEvents="none">
          {Array.from({ length: cLit }, (_, j) => (isRead
            ? <g key={"c" + j}>
                <circle cx={cx + 46} cy={tqLY(cFrom) - (j + 1) * TQ_STEP} r={11} fill={TQC.now} stroke={shade(TQC.now, 0.4)} strokeWidth={2} />
                <text x={cx + 66} y={tqLY(cFrom) - (j + 1) * TQ_STEP + 14} fontSize={T.prompt} fontWeight={700} fill={C.ink}>{j + 1}</text>
              </g>
            : <g key={"c" + j}>
                <rect x={cx + 34} y={tqLY(cFrom) - (j + 1) * TQ_STEP + 3} width={22} height={TQ_STEP - 6} rx={5} fill={TQC.now} stroke={shade(TQC.now, 0.4)} strokeWidth={2} />
                <text x={cx + 66} y={tqLY(cFrom) - (j + 0.5) * TQ_STEP + 14} fontSize={T.prompt} fontWeight={700} fill={C.ink}>{j + 1}</text>
              </g>))}
          {gY !== null && <g>
            <rect x={cx + 138} y={gY} width={22} height={TQ_P3.by - TQ_P3.br + 10 - gY} rx={8} fill={TQC.read} fillOpacity={0.7} stroke={C.ink} strokeWidth={3} strokeDasharray="7 5" />
            <text x={cx + 149} y={Math.max(gY - 12, 44)} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{String(ghost)}</text>
          </g>}
          {showCnt && cLit > 0 && tqChip(470, 30, 420, 80, cLit + " " + tx(cntWord), C.ink, C, L(T.speech))}
          {!isRead && worthChip && tqEq(470, 130, 420, 80, [lab[1] - lab[0], "÷", 5, "=", worth], C.ink, C, T.speech)}
          {worthChip && tqEq(470, isRead ? 130 : 230, 420, 84, [tx("One mark"), "=", worth, "°C"], TQC.mark, C, lang === "hi" ? T.prompt : L(T.speech))}
          {sumChip && tqEq(470, 230, 420, 84, [lab[it.base], "+", it.k, "×", worth, "=", topV], TQC.read, C, T.speech)}
        </g>
        <Key id="count" x={386} y={420} w={272} h={88} C={C} tone="key" label={tx("Count")} disabled={keyOff} onClick={() => { const t = Date.now(); if (t - lastKey.current < 400) return; lastKey.current = t; count(); }}>
          <text y={L(T.speech) * 0.35} textAnchor="middle" fontSize={L(T.speech)} fontWeight={700} fill={keyOff ? "#767676" : toneInk("key", C.ink)}>{tx("Count")}</text>
        </Key>
        {demo && stepOn === "count" && invite(522, 464, 272, 88, RAD.key)}
        {demo && stepOn && String(stepOn).indexOf("label-") === 0 && invite(76, tqLY(Math.max(0, lab.indexOf(Number(String(stepOn).slice(6))))), 112, 92, 18)}
      </g>
    );
  };

  return (
    <g>
      <g transform={`translate(${ox},0)`}>
        {k === "shelf" && shelfPic()}
        {k === "diff" && diffPic()}
        {k === "land" && landPic()}
        {(k === "worth" || k === "read") && scalePic()}
      </g>
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase */
function Thumb({ n, result, it, C, w, h, lang = "en", tx = (v: any) => v }: any) {
  const last = result && result.last;
  if (!last || last.value === null || last.value === undefined) return null;
  const item = it || last.it || (n && PHASES[n - 1] ? PHASES[n - 1].items[last.item] : null) || {};
  const v = last.value;
  let l1 = "", l2 = "";
  if (item.choices) { const c = item.choices.find((c: any) => c.id === String(v)); l1 = tx(c ? c.label : String(v)); }
  else if (item.parts) { const ab = slotPartsOf(v, 2); l1 = ab[0] + "°"; l2 = ab[1] + "°"; }
  else {
    /* say what the number is: a difference, a mark's worth, or a reading */
    const x = leadNumber(String(v)), d = x === null ? String(v) : String(x);
    l1 = item.kind === "diff" ? d + "° " + tx("apart") : item.kind === "worth" ? tx("1 mark") + " = " + d + "°" : d + "°";
  }
  const cy = h / 2;
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      <rect x={18} y={8} width={16} height={h - 30} rx={8} fill="#FFFFFF" stroke={C.ink} strokeWidth={2} />
      <rect x={22} y={cy - 6} width={8} height={h - 24 - cy + 6} fill={TQC.read} />
      <circle cx={26} cy={h - 16} r={10} fill={TQC.read} stroke={C.ink} strokeWidth={2} />
      <text x={(w + 44) / 2} y={l2 ? cy - 6 : cy + 10} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={C.ink}>{l1}</text>
      {l2 && <text x={(w + 44) / 2} y={cy + 26} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={C.ink}>{l2}</text>}
    </g>
  );
}

/* the image agent's theme (images.tsx TOOL_THEME), its digit and word keys a shade deeper (or lighter) so their ink reads
   at 4.5:1 on the key's gradient: the cake preset's key ink measured 4.45:1 on the word keys (text-contrast). A gap to fix in
   the theme; drop this when the preset passes on its own */
function tqTheme() {
  const th: any = typeof TOOL_THEME !== "undefined" ? (TOOL_THEME as any) : null;
  if (!th || !th.key) return undefined;
  const lum = (h: string) => { const v = parseInt(String(h).slice(1, 7), 16); return [v >> 16, (v >> 8) & 255, v & 255].map((c) => { c /= 255; return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); }).reduce((a, c, i) => a + c * [0.2126, 0.7152, 0.0722][i], 0); };
  const f = (c: string) => (lum(th.key[3]) > 0.4 ? shade(c, 0.1) : tint(c, 0.12));
  return { ...th, key: [f(th.key[0]), f(th.key[1]), th.key[2], th.key[3]] };
}

function ThermometerReader(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, fitHost: () => null,
      board: true,
      keyOnly: true,
      bigPad: true,
      nextKey: true,
      /* the point key on every question (the pad's shape never hints at a decimal): a child who divides by the 4 marks types
         2.5 or 1.25, a miss (the maths reviewer, 2026-10-17) */
      pointKey: true,
      navDots: true,
      StartArt, START_HOOK,
      THEME: tqTheme(),
      }} />
  );
}

export default ThermometerReader;
