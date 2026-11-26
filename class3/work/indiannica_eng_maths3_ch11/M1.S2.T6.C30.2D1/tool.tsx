/* ═══ M1.S2.T6.C30.2D1 · shop_bill · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists. THE LESSON IS SILENT: every line is printed on the bubble, which is the guide.
   THE NEW LOOK (keyOnly, navDots, nextKey, bigPad): the question lives only in the bubble.
   One Indian stationery counter all through: P1 the cost of many (price tags under every thing), P2 sharing money
   onto plates, P3 a bill (Item | Price | Quantity | Total) the child fills line by line, P4 a purse beside the bill.
   Money is the owner's real note and coin photos (<Skin>), amounts printed "Rs 36". Edit, never rewrite. */

const TOOL_ID = "shop_bill";
const MEDIA_ID = "M1.S2.T6.C30.2D1";
const TOOL_NAME = "Shop Bill";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
/* kept for the tool object's shape (and the sidecar); nothing speaks from r30 */
const VOICE = {"rate":0.92,"pitch":1.06};

const OPENING = ["A shelf of things with price tags, and a purse waiting on the counter."];
const FINISH_LINE = "You worked out every price and every bill by yourself.";
/* free play: the price-tag counter of phase 1 with the price and the count set by the child */
const FREE_LINE = "Free play: change the price and how many, and watch the cost grow.";

const START_HOOK = "How much will a basket of school things cost at the shop?";
function StartArt({ box, C, lang, tx }: any) {
  return (
    <g>
      <defs>
        <filter id="sb-shadow-start" x="-10%" y="-10%" width="130%" height="130%">
          <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#462D0A" floodOpacity="0.38" />
        </filter>
        {/* the shop pieces' own shadow (sbThing, sbMoney), so the start page draws them without Work's defs */}
        <filter id="sb-shadow" x="-10%" y="-10%" width="130%" height="130%">
          <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#462D0A" floodOpacity="0.38" />
        </filter>
        <filter id="sb-shadow-strong" x="-12%" y="-12%" width="134%" height="140%">
          <feDropShadow dx="0" dy="6" stdDeviation="5" floodColor="#462D0A" floodOpacity="0.55" />
        </filter>
      </defs>
      <rect x={0} y={212} width={box.w} height={128} rx={18} fill={SB_DESK} stroke="rgba(120,90,40,0.25)" strokeWidth={2} />
      <Skin name="counter" x={0} y={212} w={box.w} h={128} />
      <rect x={70} y={70} width={170} height={158} rx={20} fill="#C8A060" />
      <Skin name="basket" x={70} y={70} w={170} h={158} fit="stretch" />
      {sbThing("notebook", 330, 250, 120, 160)}
      {sbThing("crayons", 470, 250, 150, 90)}
      {sbThing("pen", 590, 250, 30, 150)}
      {sbThing("eraser", 680, 250, 100, 60)}
      <g filter="url(#sb-shadow-start)">
        <rect x={262} y={44} width={136} height={64} rx={14} fill={tint(SB_AMB, 0.78)} stroke={SB_AMB_EDGE} strokeWidth={3} />
        <circle cx={282} cy={76} r={7} fill="#FFFFFF" stroke={SB_AMB_EDGE} strokeWidth={2} />
        <text x={340} y={84} textAnchor="middle" dominantBaseline="central" fontSize={T.label} fontWeight={700} fill={SB_AMB_INK}>Rs 30</text>
      </g>
      <rect x={760} y={66} width={190} height={170} rx={30} fill="#A0703F" />
      <Skin name="purse" x={760} y={66} w={190} h={170} fit="stretch" />
      {sbMoney("note100", 770, 262, 130, false)}
      {sbMoney("coin10", 920, 262, 62, false)}
      <rect x={1010} y={24} width={150} height={300} rx={10} fill={SB_PAPER} stroke="#7E6238" strokeWidth={3} filter="url(#sb-shadow-strong)" />
      <Skin name="bill" x={1010} y={24} w={150} h={300} />
      {[0, 1, 2, 3].map((i) => <line key={i} x1={1030} y1={92 + i * 56} x2={1140} y2={92 + i * 56} stroke="#8C7B66" strokeWidth={3} />)}
    </g>
  );
}

const TR: any = {
  hi: {
    "Tap the Fill key under the bill.": "बिल के नीचे भरो बटन दबाओ।",
    "Tap Fill to write the cost of 2 pencils in the Total box.": "भरो दबाओ, 2 पेंसिल का दाम कुल खाने में आएगा।",
    "Fill": "भरो",
    "Shop Bill": "दुकान का बिल",
    "The cost of many: multiply": "कई चीज़ों का दाम: गुणा",
    "Tap Price tags to put a tag under every pencil.": "दाम लगाओ दबाओ, हर पेंसिल के नीचे दाम आएगा।",
    "Tap the Price tags key at the bottom.": "नीचे दाम लगाओ बटन दबाओ।",
    "The cost of many is the price of one times how many.": "कुल दाम यानी एक का दाम गुणा चीज़ों की संख्या।",
    "You learned: cost of many = price of one × how many.": "तुमने सीखा: कुल दाम = एक का दाम × चीज़ों की संख्या।",
    "One notebook costs Rs 32, so what do 5 notebooks cost?": "एक कॉपी 32 रुपये की है, तो 5 कॉपियाँ कितने की?",
    "5 notebooks?": "5 कॉपियाँ?",
    "Add Rs 32 once for every notebook on the counter.": "हर कॉपी के लिए 32 रुपये एक बार जोड़ो।",
    "Yes, 5 cost Rs 160.": "हाँ, 5 कॉपियाँ 160 रुपये की।",
    "What do 6 erasers cost at Rs 8 each?": "8 रुपये वाली 6 रबड़ कितने की?",
    "6 erasers?": "6 रबड़?",
    "Every eraser has its own tag, so add all the tags.": "हर रबड़ के नीचे उसका दाम है, सारे दाम जोड़ो।",
    "Right, Rs 48 in all.": "सही, कुल 48 रुपये।",
    "A class buys 9 pens at Rs 26 each, so what do they cost in all?": "कक्षा 26 रुपये वाले 9 पेन लेती है, कुल कितने?",
    "9 pens?": "9 पेन?",
    "Nine tags of Rs 26 make the cost of all the pens.": "26 रुपये के नौ दाम मिलकर सब पेनों का दाम हैं।",
    "Yes, Rs 234 for 9 pens.": "हाँ, 9 पेन 234 रुपये के।",
    "Sharing money equally: divide": "पैसे बराबर बाँटना: भाग",
    "Tap Share to deal the 2 notes onto the 2 plates.": "2 नोट 2 थालियों में रखने के लिए बाँटो दबाओ।",
    "Tap the Share key under the plates.": "थालियों के नीचे बाँटो बटन दबाओ।",
    "To share money equally, divide it by the number of shares.": "पैसे बराबर बाँटने के लिए हिस्सों की संख्या से भाग दो।",
    "You learned: share money equally by dividing it.": "तुमने सीखा: भाग देकर पैसे बराबर बाँटो।",
    "Rs 216 is shared equally by 6 friends, so how much does each friend get?": "216 रुपये 6 दोस्तों में बराबर बँटे, हर एक को कितने?",
    "Each friend?": "हर दोस्त?",
    "One plate is one friend's share, so add its money.": "एक थाली एक दोस्त का हिस्सा है, उसके पैसे जोड़ो।",
    "Yes, Rs 36 for each.": "हाँ, हर एक को 36 रुपये।",
    "Share Rs 63 equally among 3 friends: how much is one share?": "63 रुपये 3 दोस्तों में बराबर बाँटो: एक हिस्सा कितना?",
    "One share?": "एक हिस्सा?",
    "Add up the notes and coins on just one plate.": "सिर्फ़ एक थाली के नोट और सिक्के जोड़ो।",
    "Right, Rs 21 a share.": "सही, हर हिस्सा 21 रुपये।",
    "A bill: the cost of each thing and the total": "बिल: हर चीज़ का दाम और कुल",
    "A bill adds the cost of every line into one total.": "बिल हर लाइन का दाम जोड़कर कुल बनाता है।",
    "You learned: line cost = price × how many; total = all lines added.": "तुमने सीखा: लाइन = दाम × संख्या; कुल = सब लाइनें जोड़ो।",
    "Eraser": "रबड़",
    "Notebook": "कॉपी",
    "Crayon box": "क्रेयॉन डिब्बा",
    "Tap each empty Total box to fill this bill, then find the bill total.": "हर खाली कुल खाना भरो, फिर बिल का कुल निकालो।",
    "Bill total?": "बिल का कुल?",
    "Add the three line totals, not the prices of one.": "तीनों लाइनों के कुल जोड़ो, एक के दाम नहीं।",
    "Yes, the bill is Rs 157.": "हाँ, बिल 157 रुपये का।",
    "Sharpener": "शार्पनर",
    "Fill in this bill the same way and find what it comes to.": "यह बिल भी ऐसे ही भरो और कुल निकालो।",
    "Add the cost of both lines to get the bill total.": "बिल का कुल पाने के लिए दोनों लाइनें जोड़ो।",
    "Right, Rs 79 in all.": "सही, कुल 79 रुपये।",
    "Ruler": "पैमाना",
    "Pencil": "पेंसिल",
    "What does this three-line bill come to in all?": "तीन लाइन वाले इस बिल का कुल कितना है?",
    "Start with the top line and keep adding each line below it.": "ऊपर की लाइन से शुरू करो, नीचे की हर लाइन जोड़ते जाओ।",
    "Yes, Rs 261 for the bill.": "हाँ, बिल 261 रुपये का।",
    "Is there enough money?": "क्या पैसे काफ़ी हैं?",
    "Tap Count to count the money in the purse.": "बटुए के पैसे गिनने के लिए गिनो दबाओ।",
    "Tap the Count key at the bottom.": "नीचे गिनो बटन दबाओ।",
    "Rs 30 is more than the Rs 25 price, so tap Enough.": "30 रुपये 25 रुपये के दाम से ज़्यादा हैं, काफ़ी दबाओ।",
    "The purse holds more, so pick Enough.": "बटुए में ज़्यादा है, तो काफ़ी चुनो।",
    "Pencil box": "पेंसिल डिब्बा",
    "Count the purse, compare it with the price, then find the difference.": "बटुआ गिनो, दाम से मिलाओ, फिर अंतर निकालो।",
    "You learned: count the purse, compare, and find what is left or needed.": "तुमने सीखा: बटुआ गिनो, मिलाओ, बचा या चाहिए निकालो।",
    "Paint set": "रंगों का डिब्बा",
    "The price is Rs 239: is the purse enough, and how much is left or more needed?": "दाम 239 रुपये है: क्या बटुए के पैसे काफ़ी हैं, कितने बचे या और चाहिए?",
    "Left or needed?": "बचे या चाहिए?",
    "Take the price away from the money in the purse.": "बटुए के पैसों में से दाम घटाओ।",
    "Yes, enough, Rs 7 left.": "हाँ, काफ़ी है, 7 रुपये बचे।",
    "Pen set": "पेन सेट",
    "Count the purse against a price of Rs 74: how much is left or more needed?": "बटुआ गिनो, दाम 74 रुपये है: कितने बचे या और चाहिए?",
    "Count on from Rs 74 up to the money in the purse.": "74 रुपये से आगे बटुए के पैसों तक गिनो।",
    "Right, Rs 6 is left.": "सही, 6 रुपये बचे।",
    "School bag": "स्कूल बैग",
    "The price is 4 bags at Rs 188 each: how much is left or more needed?": "दाम 188 रुपये वाले 4 बैग: कितने बचे या और चाहिए?",
    "The price is more than the purse, so find the gap between them.": "दाम बटुए से ज़्यादा है, दोनों का अंतर निकालो।",
    "Yes, Rs 7 more needed.": "हाँ, 7 रुपये और चाहिए।",
    "Count the price tags under the things, then add them up.": "चीज़ों के नीचे के दाम गिनो, फिर जोड़ो।",
    "Many things never cost less than one thing, so multiply the price.": "कई चीज़ें एक से सस्ती नहीं होतीं, दाम का गुणा करो।",
    "Sharing makes each pile smaller than the whole amount.": "बाँटने से हर ढेर पूरी रकम से छोटा होता है।",
    "Count the money on one plate only and say it in rupees.": "सिर्फ़ एक थाली के पैसे गिनो, रुपयों में बताओ।",
    "Add the first two lines, then add the next one.": "पहली दो लाइनें जोड़ो, फिर अगली जोड़ो।",
    "The Total column holds the line costs, so add that column.": "कुल वाले खाने में लाइनों के दाम हैं, उन्हें जोड़ो।",
    "Put the two amounts side by side and see which is bigger.": "दोनों रकमें पास रखो और देखो कौन बड़ी है।",
    "Subtract the smaller amount from the bigger one, in rupees.": "बड़ी रकम में से छोटी घटाओ, रुपयों में।",
    "Look at the price of one. How many will you buy?": "एक का दाम देखो। कितनी चीज़ें लोगे?",
    "Share the money so that every plate gets the same.": "पैसे ऐसे बाँटो कि हर थाली को बराबर मिले।",
    "Each line of a bill is the price of one times how many.": "बिल की हर लाइन यानी एक का दाम गुणा चीज़ों की संख्या।",
    "Count the money in the purse. Is it enough for the price?": "बटुए के पैसे गिनो। क्या दाम के लिए काफ़ी हैं?",
    "Compare the purse money with the price, then choose again.": "बटुए के पैसे दाम से मिलाओ, फिर से चुनो।",
    "Price of one times how many gives the cost of this line.": "एक का दाम गुणा चीज़ों की संख्या, यही इस लाइन का दाम है।",
    "each": "हर एक",
    "Total": "कुल",
    "left": "बचे",
    "more needed": "और चाहिए",
    "A shelf of things with price tags, and a purse waiting on the counter.": "दाम लिखी चीज़ें और काउंटर पर रखा बटुआ।",
    "You worked out every price and every bill by yourself.": "तुमने हर दाम और हर बिल खुद निकाला।",
    "Free play: change the price and how many, and watch the cost grow.": "मुक्त खेल: दाम और गिनती बदलो, कुल दाम बढ़ता देखो।",
    "How much will a basket of school things cost at the shop?": "दुकान पर स्कूल की चीज़ों की टोकरी कितने की होगी?",
    "Price tags": "दाम लगाओ",
    "Share": "बाँटो",
    "Count": "गिनो",
    "Enough": "काफ़ी",
    "Not enough": "काफ़ी नहीं",
    "Price down": "दाम घटाओ",
    "Price up": "दाम बढ़ाओ",
    "Item": "चीज़",
    "Price": "दाम",
    "Quantity": "संख्या",
    "Rs 192 is split equally among 8 children: how much does one child get?": "192 रुपये 8 बच्चों में बराबर बँटे: एक बच्चे को कितने?",
    "One child?": "एक बच्चा?",
    "Each plate is one child's part, so count one plate.": "हर थाली एक बच्चे का हिस्सा है, एक थाली गिनो।",
    "Yes, Rs 24 a child.": "हाँ, हर बच्चे को 24 रुपये।",
    "Fewer things": "कम चीज़ें",
    "More things": "ज़्यादा चीज़ें",
    "rupees": "रुपये",
    "Tap Price tags first.": "पहले दाम लगाओ दबाओ।",
    "Tap Share to deal the next round.": "अगला दौर बाँटने के लिए बाँटो दबाओ।",
    "Fill the Total boxes first.": "पहले कुल वाले खाने भरो।",
    "Tap the Total box and write the cost of 4 bags.": "कुल वाला खाना दबाओ और 4 बैग का दाम लिखो।",
    "Tap Count first.": "पहले गिनो दबाओ।",
    "Pick Enough or Not enough first.": "पहले काफ़ी या काफ़ी नहीं चुनो।",
  },
  gu: {
    "Tap the Fill key under the bill.": "બિલ નીચે ભરો બટન દબાવો.",
    "Tap Fill to write the cost of 2 pencils in the Total box.": "ભરો દબાવો, 2 પેન્સિલની કિંમત કુલ ખાનામાં આવશે.",
    "Fill": "ભરો",
    "Shop Bill": "દુકાનનું બિલ",
    "The cost of many: multiply": "ઘણી વસ્તુઓની કિંમત: ગુણાકાર",
    "Tap Price tags to put a tag under every pencil.": "કિંમત લગાવો દબાવો, દરેક પેન્સિલ નીચે કિંમત આવશે.",
    "Tap the Price tags key at the bottom.": "નીચે કિંમત લગાવો બટન દબાવો.",
    "The cost of many is the price of one times how many.": "કુલ કિંમત એટલે એકની કિંમત ગુણ્યા વસ્તુઓની સંખ્યા.",
    "You learned: cost of many = price of one × how many.": "તમે શીખ્યા: કુલ કિંમત = એકની કિંમત × વસ્તુઓની સંખ્યા.",
    "One notebook costs Rs 32, so what do 5 notebooks cost?": "એક નોટબુક 32 રૂપિયાની છે, તો 5 નોટબુક કેટલાની?",
    "5 notebooks?": "5 નોટબુક?",
    "Add Rs 32 once for every notebook on the counter.": "દરેક નોટબુક માટે 32 રૂપિયા એક વાર ઉમેરો.",
    "Yes, 5 cost Rs 160.": "હા, 5 નોટબુક 160 રૂપિયાની.",
    "What do 6 erasers cost at Rs 8 each?": "8 રૂપિયાવાળા 6 રબર કેટલાના?",
    "6 erasers?": "6 રબર?",
    "Every eraser has its own tag, so add all the tags.": "દરેક રબર નીચે તેની કિંમત છે, બધી કિંમત ઉમેરો.",
    "Right, Rs 48 in all.": "સાચું, કુલ 48 રૂપિયા.",
    "A class buys 9 pens at Rs 26 each, so what do they cost in all?": "વર્ગ 26 રૂપિયાવાળી 9 પેન લે છે, કુલ કેટલા?",
    "9 pens?": "9 પેન?",
    "Nine tags of Rs 26 make the cost of all the pens.": "26 રૂપિયાની નવ કિંમત મળીને બધી પેનની કિંમત છે.",
    "Yes, Rs 234 for 9 pens.": "હા, 9 પેન 234 રૂપિયાની.",
    "Sharing money equally: divide": "પૈસા સરખા વહેંચવા: ભાગાકાર",
    "Tap Share to deal the 2 notes onto the 2 plates.": "2 નોટ 2 થાળીમાં મૂકવા વહેંચો દબાવો.",
    "Tap the Share key under the plates.": "થાળીઓ નીચે વહેંચો બટન દબાવો.",
    "To share money equally, divide it by the number of shares.": "પૈસા સરખા વહેંચવા ભાગની સંખ્યાથી ભાગાકાર કરો.",
    "You learned: share money equally by dividing it.": "તમે શીખ્યા: ભાગાકારથી પૈસા સરખા વહેંચો.",
    "Rs 216 is shared equally by 6 friends, so how much does each friend get?": "216 રૂપિયા 6 મિત્રોમાં સરખા વહેંચ્યા, દરેકને કેટલા?",
    "Each friend?": "દરેક મિત્ર?",
    "One plate is one friend's share, so add its money.": "એક થાળી એક મિત્રનો ભાગ છે, તેના પૈસા ઉમેરો.",
    "Yes, Rs 36 for each.": "હા, દરેકને 36 રૂપિયા.",
    "Share Rs 63 equally among 3 friends: how much is one share?": "63 રૂપિયા 3 મિત્રોમાં સરખા વહેંચો: એક ભાગ કેટલો?",
    "One share?": "એક ભાગ?",
    "Add up the notes and coins on just one plate.": "ફક્ત એક થાળીની નોટ અને સિક્કા ઉમેરો.",
    "Right, Rs 21 a share.": "સાચું, દરેક ભાગ 21 રૂપિયા.",
    "A bill: the cost of each thing and the total": "બિલ: દરેક વસ્તુની કિંમત અને કુલ",
    "A bill adds the cost of every line into one total.": "બિલ દરેક લીટીની કિંમત ઉમેરી કુલ બનાવે છે.",
    "You learned: line cost = price × how many; total = all lines added.": "તમે શીખ્યા: લીટી = કિંમત × સંખ્યા; કુલ = બધી લીટી ઉમેરો.",
    "Eraser": "રબર",
    "Notebook": "નોટબુક",
    "Crayon box": "ક્રેયોન ડબ્બો",
    "Tap each empty Total box to fill this bill, then find the bill total.": "દરેક ખાલી કુલ ખાનું ભરો, પછી બિલનો કુલ શોધો.",
    "Bill total?": "બિલનો કુલ?",
    "Add the three line totals, not the prices of one.": "ત્રણે લીટીના કુલ ઉમેરો, એકની કિંમત નહીં.",
    "Yes, the bill is Rs 157.": "હા, બિલ 157 રૂપિયાનું.",
    "Sharpener": "સંચો",
    "Fill in this bill the same way and find what it comes to.": "આ બિલ પણ એમ જ ભરો અને કુલ શોધો.",
    "Add the cost of both lines to get the bill total.": "બિલનો કુલ મેળવવા બંને લીટી ઉમેરો.",
    "Right, Rs 79 in all.": "સાચું, કુલ 79 રૂપિયા.",
    "Ruler": "ફૂટપટ્ટી",
    "Pencil": "પેન્સિલ",
    "What does this three-line bill come to in all?": "ત્રણ લીટીવાળા આ બિલનો કુલ કેટલો છે?",
    "Start with the top line and keep adding each line below it.": "ઉપરની લીટીથી શરૂ કરો, નીચેની દરેક લીટી ઉમેરતા જાઓ.",
    "Yes, Rs 261 for the bill.": "હા, બિલ 261 રૂપિયાનું.",
    "Is there enough money?": "શું પૈસા પૂરતા છે?",
    "Tap Count to count the money in the purse.": "પાકીટના પૈસા ગણવા ગણો દબાવો.",
    "Tap the Count key at the bottom.": "નીચે ગણો બટન દબાવો.",
    "Rs 30 is more than the Rs 25 price, so tap Enough.": "30 રૂપિયા 25 રૂપિયાની કિંમતથી વધુ છે, પૂરતા દબાવો.",
    "The purse holds more, so pick Enough.": "પાકીટમાં વધુ છે, તો પૂરતા પસંદ કરો.",
    "Pencil box": "પેન્સિલ બોક્સ",
    "Count the purse, compare it with the price, then find the difference.": "પાકીટ ગણો, કિંમત સાથે સરખાવો, પછી તફાવત શોધો.",
    "You learned: count the purse, compare, and find what is left or needed.": "તમે શીખ્યા: પાકીટ ગણો, સરખાવો, વધ્યા કે જોઈએ શોધો.",
    "Paint set": "રંગનો ડબ્બો",
    "The price is Rs 239: is the purse enough, and how much is left or more needed?": "કિંમત 239 રૂપિયા છે: શું પાકીટ પૂરતું છે, કેટલા વધ્યા કે વધુ જોઈએ?",
    "Left or needed?": "વધ્યા કે જોઈએ?",
    "Take the price away from the money in the purse.": "પાકીટના પૈસામાંથી કિંમત બાદ કરો.",
    "Yes, enough, Rs 7 left.": "હા, પૂરતા છે, 7 રૂપિયા વધ્યા.",
    "Pen set": "પેન સેટ",
    "Count the purse against a price of Rs 74: how much is left or more needed?": "પાકીટ ગણો, કિંમત 74 રૂપિયા છે: કેટલા વધ્યા કે વધુ જોઈએ?",
    "Count on from Rs 74 up to the money in the purse.": "74 રૂપિયાથી આગળ પાકીટના પૈસા સુધી ગણો.",
    "Right, Rs 6 is left.": "સાચું, 6 રૂપિયા વધ્યા.",
    "School bag": "દફતર",
    "The price is 4 bags at Rs 188 each: how much is left or more needed?": "કિંમત 188 રૂપિયાવાળા 4 દફતર: કેટલા વધ્યા કે વધુ જોઈએ?",
    "The price is more than the purse, so find the gap between them.": "કિંમત પાકીટથી વધુ છે, બંનેનો તફાવત શોધો.",
    "Yes, Rs 7 more needed.": "હા, 7 રૂપિયા વધુ જોઈએ.",
    "Count the price tags under the things, then add them up.": "વસ્તુઓ નીચેની કિંમત ગણો, પછી ઉમેરો.",
    "Many things never cost less than one thing, so multiply the price.": "ઘણી વસ્તુ એકથી સસ્તી ન હોય, કિંમતનો ગુણાકાર કરો.",
    "Sharing makes each pile smaller than the whole amount.": "વહેંચવાથી દરેક ઢગલો આખી રકમથી નાનો થાય.",
    "Count the money on one plate only and say it in rupees.": "ફક્ત એક થાળીના પૈસા ગણો, રૂપિયામાં કહો.",
    "Add the first two lines, then add the next one.": "પહેલી બે લીટી ઉમેરો, પછી આગળની ઉમેરો.",
    "The Total column holds the line costs, so add that column.": "કુલના ખાનામાં લીટીની કિંમત છે, તે ઉમેરો.",
    "Put the two amounts side by side and see which is bigger.": "બંને રકમ પાસે મૂકો અને જુઓ કઈ મોટી છે.",
    "Subtract the smaller amount from the bigger one, in rupees.": "મોટી રકમમાંથી નાની બાદ કરો, રૂપિયામાં.",
    "Look at the price of one. How many will you buy?": "એકની કિંમત જુઓ. કેટલી વસ્તુ લેશો?",
    "Share the money so that every plate gets the same.": "પૈસા એમ વહેંચો કે દરેક થાળીને સરખા મળે.",
    "Each line of a bill is the price of one times how many.": "બિલની દરેક લીટી એટલે એકની કિંમત ગુણ્યા વસ્તુઓની સંખ્યા.",
    "Count the money in the purse. Is it enough for the price?": "પાકીટના પૈસા ગણો. કિંમત માટે પૂરતા છે?",
    "Compare the purse money with the price, then choose again.": "પાકીટના પૈસા કિંમત સાથે સરખાવો, ફરી પસંદ કરો.",
    "Price of one times how many gives the cost of this line.": "એકની કિંમત ગુણ્યા વસ્તુઓની સંખ્યા, એ આ લીટીની કિંમત છે.",
    "each": "દરેક",
    "Total": "કુલ",
    "left": "વધ્યા",
    "more needed": "વધુ જોઈએ",
    "A shelf of things with price tags, and a purse waiting on the counter.": "કિંમતવાળી વસ્તુઓ અને કાઉન્ટર પર પાકીટ.",
    "You worked out every price and every bill by yourself.": "તમે દરેક કિંમત અને દરેક બિલ જાતે શોધ્યું.",
    "Free play: change the price and how many, and watch the cost grow.": "મુક્ત રમત: કિંમત અને સંખ્યા બદલો, કુલ કિંમત વધતી જુઓ.",
    "How much will a basket of school things cost at the shop?": "દુકાને શાળાની વસ્તુઓની ટોપલી કેટલાની થશે?",
    "Price tags": "કિંમત લગાવો",
    "Share": "વહેંચો",
    "Count": "ગણો",
    "Enough": "પૂરતા",
    "Not enough": "પૂરતા નથી",
    "Price down": "કિંમત ઘટાડો",
    "Price up": "કિંમત વધારો",
    "Item": "વસ્તુ",
    "Price": "કિંમત",
    "Quantity": "સંખ્યા",
    "Rs 192 is split equally among 8 children: how much does one child get?": "192 રૂપિયા 8 બાળકોમાં સરખા વહેંચ્યા: એક બાળકને કેટલા?",
    "One child?": "એક બાળક?",
    "Each plate is one child's part, so count one plate.": "દરેક થાળી એક બાળકનો ભાગ છે, એક થાળી ગણો.",
    "Yes, Rs 24 a child.": "હા, દરેક બાળકને 24 રૂપિયા.",
    "Fewer things": "ઓછી વસ્તુઓ",
    "More things": "વધુ વસ્તુઓ",
    "rupees": "રૂપિયા",
    "Tap Price tags first.": "પહેલાં કિંમત લગાવો દબાવો.",
    "Tap Share to deal the next round.": "આગળનો વારો વહેંચવા વહેંચો દબાવો.",
    "Fill the Total boxes first.": "પહેલાં કુલનાં ખાનાં ભરો.",
    "Tap the Total box and write the cost of 4 bags.": "કુલનું ખાનું દબાવો અને 4 દફતરની કિંમત લખો.",
    "Tap Count first.": "પહેલાં ગણો દબાવો.",
    "Pick Enough or Not enough first.": "પહેલાં પૂરતા કે પૂરતા નથી પસંદ કરો.",
  },
};

/* the colour roles (the owner, 2026-11-12): deep blue = rupees, amber = price / value of one piece, sky blue = how many,
   green = total, change and the answer. Text uses the deeper inks (4.5:1 on white). */
const SB_AMB = "#E69F00", SB_AMB_INK = "#8A5A00";
const SB_SKY = "#56B4E9", SB_SKY_INK = "#1D5E8C";
const SB_GRN = "#009E73", SB_GRN_INK = "#00634A";
const SB_BLU = "#1E4FA8", SB_BLU_INK = "#163C80";
const SB_PAPER = "#FFFDF7";
/* the deeper edges a chip wears on the cream oak desk (the owner's Option A, 2026-11-16) */
const SB_AMB_EDGE = "#B8770A", SB_SKY_EDGE = "#2F86C4", SB_GRN_EDGE = "#00805C", SB_DESK = "#EADCC0";
const sbRs = (v: number) => "Rs " + indian(v);
const sbVal = (k: string) => Number(String(k).replace(/\D/g, ""));
const sbIsNote = (k: string) => /^note/.test(k);
const sbSum = (a: number[]) => a.reduce((s, x) => s + x, 0);
const sbRange = (k: number) => Array.from({ length: Math.max(0, k) }, (_, i) => i);

/* the shop things (image agent's skins; the plain shape under each is the fallback) */
const SB_THING: any = {
  notebook: { a: 121 / 170, fill: "#2E7BC4" },
  eraser: { a: 141 / 74, fill: "#E3C29A" },
  pen: { a: 200 / 20, rot: true, fill: "#2C4A9A" },
  pencil: { a: 200 / 28, rot: true, fill: "#F2C230" },
  sharpener: { a: 120 / 75, fill: "#3D7CC9" },
  ruler: { a: 200 / 30, rot: true, fill: "#F5D33B" },
  crayons: { a: 180 / 96, fill: "#B5835A" },
};
/* one thing standing on bottom (a long thin thing stands up, or lies flat in a bill line) */
function sbThing(k: string, cx: number, bottom: number, maxW: number, maxH: number, lie = false) {
  const t = SB_THING[k];
  if (!t) return null;
  /* a long thin thing in a bill line lies on a slant, so it reads at icon size */
  if (t.rot && lie) {
    const L = Math.min(maxW * 1.25, 110), th = Math.max(10, L / t.a), cy = bottom - maxH / 2;
    return (
      <g transform={`rotate(-32 ${cx} ${cy})`} filter="url(#sb-shadow)">
        <rect x={cx - L / 2} y={cy - th / 2} width={L} height={th} rx={Math.min(6, th / 2)} fill={t.fill} stroke="#4A3423" strokeWidth={1.5} />
        <Skin name={k} x={cx - L / 2} y={cy - th / 2} w={L} h={th} fit="stretch" />
        <rect x={cx - L / 2} y={cy - th / 2} width={L} height={th} rx={Math.min(6, th / 2)} fill="none" stroke="#4A3423" strokeWidth={2} />
        {k === "ruler" && sbRange(Math.floor((L - 10) / 8)).map((j) => <line key={j} x1={cx - L / 2 + 6 + j * 8} y1={cy - th / 2 + 1}
          x2={cx - L / 2 + 6 + j * 8} y2={cy - th / 2 + (j % 2 ? th * 0.35 : th * 0.6)} stroke="#3A2A12" strokeWidth={1.6} />)}
      </g>
    );
  }
  if (t.rot && !lie) {
    const L = Math.min(maxH, maxW * t.a / 1.7), th = Math.min(maxW, (L / t.a) * 1.7), cy = bottom - L / 2;
    return (
      <g transform={`rotate(-90 ${cx} ${cy})`} filter="url(#sb-shadow-strong)">
        <rect x={cx - L / 2} y={cy - th / 2} width={L} height={th} rx={Math.min(6, th / 2)} fill={t.fill} stroke="#4A3423" strokeWidth={1.5} />
        <Skin name={k} x={cx - L / 2} y={cy - th / 2} w={L} h={th} fit="stretch" />
        <rect x={cx - L / 2} y={cy - th / 2} width={L} height={th} rx={Math.min(6, th / 2)} fill="none" stroke="#4A3423" strokeWidth={2} />
      </g>
    );
  }
  const w = Math.min(maxW, maxH * t.a), h = w / t.a, b = lie ? bottom - (maxH - h) / 2 : bottom;
  const pale = k === "eraser";
  return (
    <g filter={pale ? "url(#sb-shadow-strong)" : "url(#sb-shadow)"}>
      <rect x={cx - w / 2} y={b - h} width={w} height={h} rx={6} fill={t.fill} stroke="#4A3423" strokeWidth={1.5} />
      <Skin name={k} x={cx - w / 2} y={b - h} w={w} h={h} fit="stretch" />
      {pale && <rect x={cx - w / 2} y={b - h} width={w} height={h} rx={6} fill="#B98A5A" fillOpacity={0.18} />}
      <rect x={cx - w / 2} y={b - h} width={w} height={h} rx={6} fill="none" stroke={pale ? "#6B4420" : "#5B4636"} strokeWidth={pale ? 3 : 2.5} />
      {k === "notebook" && h > 40 && <line x1={cx - w / 2 + w * 0.075} y1={b - h + 8} x2={cx - w / 2 + w * 0.075} y2={b - 8}
        stroke="#FFFFFF" strokeOpacity={0.85} strokeWidth={Math.max(1.5, w * 0.018)} strokeDasharray={`${Math.max(4, h * 0.035)} ${Math.max(4, h * 0.035)}`} strokeLinecap="round" />}
    </g>
  );
}
/* a value chip (amber: the value of one piece) centred on cx, cy */
function sbChip(t: string, cx: number, cy: number, fs = T.micro, ink = SB_AMB_INK) {
  const w = t.length * fs * 0.6 + 10, h = fs + 4;
  return (
    <g filter="url(#sb-shadow)">
      <rect x={cx - w / 2} y={cy - h / 2} width={w} height={h} rx={8} fill="#FFFFFF" stroke={ink} strokeWidth={2} />
      <text x={cx} y={cy + 1} textAnchor="middle" dominantBaseline="central" fontSize={fs} fontWeight={700} fill={ink}>{t}</text>
    </g>
  );
}
const SB_NOTE_FILL: any = { 10: "#C9A27C", 20: "#C9D77A", 50: "#86CFD3", 100: "#B7A5D8", 200: "#F0B95A", 500: "#B9B8AE" };
const sbPieceH = (k: string, w: number) => (sbIsNote(k) ? Math.round(w * 0.46) : w);
/* one note or coin: x, y its top-left, w its width (a coin's diameter); lit = the one being counted */
function sbMoney(k: string, x: number, y: number, w: number, chip = true, lit = false) {
  const v = sbVal(k);
  if (sbIsNote(k)) {
    const h = sbPieceH(k, w);
    return (
      <g filter="url(#sb-shadow)">
        {lit && <rect x={x - 6} y={y - 6} width={w + 12} height={h + 12} rx={9} fill="none" stroke={SB_AMB} strokeWidth={5} />}
        <rect x={x - 3} y={y - 3} width={w + 6} height={h + 6} rx={7} fill="#FFFDF7" stroke="#6B4F2A" strokeWidth={1.2} />
        <rect x={x} y={y} width={w} height={h} rx={5} fill={SB_NOTE_FILL[v] || "#CFCFC4"} stroke="#5A4426" strokeWidth={1.5} />
        <Skin name={k} x={x} y={y} w={w} h={h} fit="stretch" />
        <rect x={x} y={y} width={w} height={h} rx={5} fill="none" stroke="#6B4F2A" strokeWidth={1.5} />
        {chip && sbChip(String(v), x - 4 + (String(v).length * 16.8 + 10) / 2, y + 4)}
      </g>
    );
  }
  const r = w / 2;
  return (
    <g filter="url(#sb-shadow)">
      {lit && <circle cx={x + r} cy={y + r} r={r + 6} fill="none" stroke={SB_AMB} strokeWidth={5} />}
      <circle cx={x + r} cy={y + r} r={r + 3} fill="#FFFDF7" stroke="#6B4F2A" strokeWidth={1.2} />
      <circle cx={x + r} cy={y + r} r={r} fill={v >= 10 ? "#D9B65A" : "#C7CCD1"} stroke="#4B4B4B" strokeWidth={1.5} />
      <Skin name={k} x={x} y={y} w={w} h={w} fit="stretch" />
      <circle cx={x + r} cy={y + r} r={r - 0.5} fill="none" stroke="#6B4F2A" strokeWidth={1.5} />
      {chip && sbChip(String(v), x + w - 2 + (String(v).length * 16.8 + 10) / 2 - 8, y + r)}
    </g>
  );
}

/* One entry per phase = one mount. `warm` is the guide steps' own board (never question 1's item). */
const PHASES = [
  {
    n: 1,
    concept: "The cost of many: multiply",
    conceptId: "M1.S2.T6.C27", objectiveIds: ["O9"],
    says: ["Look at the price of one. How many will you buy?"],
    steps: [{ say: "Tap Price tags to put a tag under every pencil.", on: "tags", hint: "Tap the Price tags key at the bottom." }],
    warm: { kind: "many", thing: "pencil", price: 5, count: 2 },
    ladder: ["Count the price tags under the things, then add them up.", "Many things never cost less than one thing, so multiply the price."],
    closing: "The cost of many is the price of one times how many.",
    learned: "You learned: cost of many = price of one × how many.",
    traceback: "The price tags stay under every thing and the running cost is written under each tag in turn, stopping one tag short.",
    items: [
      /* learn SB1: answer in the plan = Rs 160 (plan: zoo tickets; the owner's stationery counter: notebooks) */
      { qid: "M1.S2.T6.C27:SB1", kind: "many", thing: "notebook", price: 32, count: 5,
        say: "One notebook costs Rs 32, so what do 5 notebooks cost?", ask: "5 notebooks?", answer: 160,
        miss: "Add Rs 32 once for every notebook on the counter.", win: "Yes, 5 cost Rs 160." },
      /* practice 1: answer in the plan = Rs 48, because Rs 8 times 6 is Rs 48 in all (plan: sticker sheets) */
      { qid: "M1.S2.T6.C27:1", kind: "many", thing: "eraser", price: 8, count: 6,
        say: "What do 6 erasers cost at Rs 8 each?", ask: "6 erasers?", answer: 48,
        miss: "Every eraser has its own tag, so add all the tags.", win: "Right, Rs 48 in all." },
      /* practice 5: answer in the plan = Rs 234, because Rs 26 times 9 is Rs 234 in all (plan: museum tickets) */
      { qid: "M1.S2.T6.C27:5", kind: "many", thing: "pen", price: 26, count: 9,
        say: "A class buys 9 pens at Rs 26 each, so what do they cost in all?", ask: "9 pens?", answer: 234,
        miss: "Nine tags of Rs 26 make the cost of all the pens.", win: "Yes, Rs 234 for 9 pens." },
    ],
  },
  {
    n: 2,
    concept: "Sharing money equally: divide",
    conceptId: "M1.S2.T6.C28", objectiveIds: ["O9"],
    says: ["Share the money so that every plate gets the same."],
    steps: [{ say: "Tap Share to deal the 2 notes onto the 2 plates.", on: "share", hint: "Tap the Share key under the plates." }],
    warm: { kind: "share", total: 20, plates: 2, pile: ["note10"] },
    ladder: ["Sharing makes each pile smaller than the whole amount.", "Count the money on one plate only and say it in rupees."],
    closing: "To share money equally, divide it by the number of shares.",
    learned: "You learned: share money equally by dividing it.",
    traceback: "One plate is lit and its notes and coins are added one by one, stopping before the last piece.",
    items: [
      /* learn SB2: answer in the plan = Rs 36 each; 6 x (20 + 10 + 5 + 1) = 216 */
      { qid: "M1.S2.T6.C28:SB2", kind: "share", total: 216, plates: 6, pile: ["note20", "note10", "coin5", "coin1"],
        say: "Rs 216 is shared equally by 6 friends, so how much does each friend get?", ask: "Each friend?", answer: 36,
        miss: "One plate is one friend's share, so add its money.", win: "Yes, Rs 36 for each." },
      /* practice 2: answer in the plan = Rs 21 each; 3 x (20 + 1) = 63 */
      { qid: "M1.S2.T6.C28:2", kind: "share", total: 63, plates: 3, pile: ["note20", "coin1"],
        say: "Share Rs 63 equally among 3 friends: how much is one share?", ask: "One share?", answer: 21,
        miss: "Add up the notes and coins on just one plate.", win: "Right, Rs 21 a share." },
      /* practice 6: answer in the plan = Rs 24; 8 x (20 + 2 + 2) = 192 */
      { qid: "M1.S2.T6.C28:6", kind: "share", total: 192, plates: 8, pile: ["note20", "coin2", "coin2"],
        say: "Rs 192 is split equally among 8 children: how much does one child get?", ask: "One child?", answer: 24,
        miss: "Each plate is one child's part, so count one plate.", win: "Yes, Rs 24 a child." },
    ],
  },
  {
    n: 3,
    concept: "A bill: the cost of each thing and the total",
    conceptId: "M1.S2.T6.C29", objectiveIds: ["O10"],
    says: ["Each line of a bill is the price of one times how many."],
    steps: [{ say: "Tap Fill to write the cost of 2 pencils in the Total box.", on: "fill", hint: "Tap the Fill key under the bill." }],
    warm: { kind: "bill", lines: [{ thing: "pencil", name: "Pencil", price: 5, qty: 2 }] },
    ladder: ["Add the first two lines, then add the next one.", "The Total column holds the line costs, so add that column."],
    closing: "A bill adds the cost of every line into one total.",
    learned: "You learned: line cost = price × how many; total = all lines added.",
    traceback: "Each line is lit in turn and the running total is written under the bill, stopping before the last line is added.",
    items: [
      /* learn SB3: answer in the plan = Rs 157; 4 x 9 + 2 x 44 + 1 x 33 (plan: a party shop) */
      { qid: "M1.S2.T6.C29:SB3", kind: "bill", answer: 157,
        lines: [{ thing: "eraser", name: "Eraser", price: 9, qty: 4 }, { thing: "notebook", name: "Notebook", price: 44, qty: 2 }, { thing: "crayons", name: "Crayon box", price: 33, qty: 1 }],
        say: "Tap each empty Total box to fill this bill, then find the bill total.", ask: "Bill total?",
        miss: "Add the three line totals, not the prices of one.", win: "Yes, the bill is Rs 157." },
      /* practice 3: answer in the plan = Rs 79; 3 x 11 + 46 (plan: oranges and a melon) */
      { qid: "M1.S2.T6.C29:3", kind: "bill", answer: 79,
        lines: [{ thing: "sharpener", name: "Sharpener", price: 11, qty: 3 }, { thing: "notebook", name: "Notebook", price: 46, qty: 1 }],
        say: "Fill in this bill the same way and find what it comes to.", ask: "Bill total?",
        miss: "Add the cost of both lines to get the bill total.", win: "Right, Rs 79 in all." },
      /* practice 7: answer in the plan = Rs 261; 4 x 23 + 3 x 19 + 2 x 56 (plan: biscuits, juice, nuts) */
      { qid: "M1.S2.T6.C29:7", kind: "bill", answer: 261,
        lines: [{ thing: "ruler", name: "Ruler", price: 23, qty: 4 }, { thing: "pencil", name: "Pencil", price: 19, qty: 3 }, { thing: "crayons", name: "Crayon box", price: 56, qty: 2 }],
        say: "What does this three-line bill come to in all?", ask: "Bill total?",
        miss: "Start with the top line and keep adding each line below it.", win: "Yes, Rs 261 for the bill." },
    ],
  },
  {
    n: 4,
    concept: "Is there enough money?",
    conceptId: "M1.S2.T6.C30", objectiveIds: ["O10"],
    says: ["Count the money in the purse. Is it enough for the price?"],
    steps: [
      { say: "Tap Count to count the money in the purse.", on: "count", hint: "Tap the Count key at the bottom." },
      { say: "Rs 30 is more than the Rs 25 price, so tap Enough.", on: "enough", hint: "The purse holds more, so pick Enough." },
    ],
    warm: { kind: "purse", purse: ["note20", "coin10"], lines: [{ name: "Pencil box", price: 25, qty: 1, given: true }], enough: true },
    ladder: ["Put the two amounts side by side and see which is bigger.", "Subtract the smaller amount from the bigger one, in rupees."],
    closing: "Count the purse, compare it with the price, then find the difference.",
    learned: "You learned: count the purse, compare, and find what is left or needed.",
    traceback: "The purse total and the price are lit and the subtraction is written, the bigger amount first, without its result.",
    items: [
      /* learn SB4: answer in the plan = Yes. The money is Rs 246 and the rope costs Rs 239, so Rs 7 is left. (a paint set here) */
      { qid: "M1.S2.T6.C30:SB4", kind: "purse", purse: ["note200", "note20", "note20", "coin2", "coin2", "coin2"],
        lines: [{ name: "Paint set", price: 239, qty: 1, given: true }], enough: true, answer: 7,
        say: "The price is Rs 239: is the purse enough, and how much is left or more needed?", ask: "Left or needed?",
        miss: "Take the price away from the money in the purse.", win: "Yes, enough, Rs 7 left." },
      /* practice 4: answer in the plan = Yes. The purse holds Rs 80, and Rs 80 minus Rs 74 is Rs 6 left over */
      { qid: "M1.S2.T6.C30:4", kind: "purse", purse: ["note50", "coin10", "coin10", "coin10"],
        lines: [{ name: "Pen set", price: 74, qty: 1, given: true }], enough: true, answer: 6,
        say: "Count the purse against a price of Rs 74: how much is left or more needed?", ask: "Left or needed?",
        miss: "Count on from Rs 74 up to the money in the purse.", win: "Right, Rs 6 is left." },
      /* practice 8: answer in the plan = No. Rs 188 times 4 is Rs 752 in all. The money is Rs 745, and Rs 752 minus Rs 745 is Rs 7 more needed */
      { qid: "M1.S2.T6.C30:8", kind: "purse", purse: ["note500", "note200", "coin20", "coin20", "coin5"],
        lines: [{ name: "School bag", price: 188, qty: 4 }], enough: false, answer: 7,
        say: "The price is 4 bags at Rs 188 each: how much is left or more needed?", ask: "Left or needed?",
        miss: "The price is more than the purse, so find the gap between them.", win: "Yes, Rs 7 more needed." },
    ],
  },
];

/* The numbers the working area needs (they go into the sidecar too). */
const MODEL = {
  colours: { rupees: SB_BLU, price: SB_AMB, howMany: SB_SKY, total: SB_GRN },
  billColumns: ["Item", "Price", "Quantity", "Total"],
  money: { notes: [10, 20, 50, 100, 200, 500], coins: [1, 2, 5, 10, 20] },
};

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */
const judge = (item: any, v: any) => {
  if (item.parts) return judgeSlotParts(item, v);
  if (typeof item.answer === "number") return leadNumber(v) === item.answer;
  return String(v).trim().toLowerCase() === String(item.answer).trim().toLowerCase();
};
/* oracle: a second route (repeated addition / repeated subtraction / counting the pieces), sharing no code with judge or Work */
const oracle = () => PHASES.every((p: any) => p.items.every((it: any) => {
  if (it.kind === "many") { let s = 0; for (let i = 0; i < it.count; i++) s += it.price; return s === it.answer; }
  if (it.kind === "share") {
    let left = it.total, rounds = 0;
    const one = it.pile.reduce((s: number, k: string) => s + Number(k.slice(4)), 0);
    while (left >= it.plates * one && left > 0) { left -= it.plates * one; rounds++; }
    let each = 0; for (let k = 0; k < it.pile.length; k++) each += Number(it.pile[k].slice(4));
    return left === 0 && rounds === 1 && each === it.answer && it.answer * it.plates === it.total;
  }
  if (it.kind === "bill") { let s = 0; it.lines.forEach((l: any) => { for (let q = 0; q < l.qty; q++) s += l.price; }); return s === it.answer; }
  if (it.kind === "purse") {
    let m = 0; it.purse.forEach((k: string) => { m += Number(k.slice(4)); });
    let b = 0; for (let q = 0; q < it.lines[0].qty; q++) b += it.lines[0].price;
    return (m >= b) === it.enough && (m >= b ? m - b : b - m) === it.answer;
  }
  return false;
}));
/* the misconception: P1 price + count, P2 the money times the shares, P3 the prices of one added */
const nearMiss = (item: any) => {
  if (item.kind === "many") return item.price + item.count;
  if (item.kind === "share") return item.total * item.plates;
  if (item.kind === "bill") return item.lines.reduce((s: number, l: any) => s + l.price, 0);
  /* P4: the biggest note set against the price, the rest of the purse forgotten */
  if (item.kind === "purse") return Math.abs(item.lines[0].price * item.lines[0].qty - Math.max(...item.purse.map(sbVal)));
  return typeof item.answer === "number" ? item.answer + 1 : "~";
};
const answerForms = (item: any) => (item.parts ? item.answer.filter((x: number) => x >= 10).flatMap((x: number) => [String(x), indian(x), words(x)])
  : typeof item.answer === "number" ? [String(item.answer), indian(item.answer), words(item.answer)]
  : [String(item.answer)]);
const agentKey = (item: any) => item.answer;

const HOOK: any = {};
/* the dev driver: a guide step is performed through HOOK.demo; a question has its act done at once, then the answer sent */
const solve = (item: any, T: any) => (T.state().stage === "demo" ? HOOK.demo && HOOK.demo() : (HOOK.check && HOOK.check(), T.submit(item.answer)));
const answer = (item: any, v: any) => (item.pad === "enter" && HOOK.set ? HOOK.set(v) : undefined);
/* the agent's check(): performs the question's act at once (never gated); undefined in the guide steps so Enter does the step */
const check = () => (HOOK.check ? HOOK.check() : undefined);

/* the answer gate: true = locked from the question's opening (the owner's decision 2026-11-12; check's hint-key, keyboard,
   board-panel, hint-ladder-monotonic and one-line-bubble rows type straight into an open question and FAIL on it), false = locked
   once the child has touched the board in that question (PATTERNS 19, what the checks pass on) */
const SB_GATE_FROM_OPEN = false;
const SB_FREE: any = { kind: "free", thing: "notebook" };
const SB_KEY: any = { fill: "Fill", tags: "Price tags", share: "Share", count: "Count", enough: "Enough", short: "Not enough",
  "fp-less": "Fewer things", "fp-more": "More things", "fp-down": "Price down", "fp-up": "Price up" };
const sbFresh = (qk: string, it: any) => ({ qk, tags: false, tagN: 0, dealt: 0, dealtN: 0,
  filled: it && it.lines ? it.lines.map((l: any) => !!l.given) : [], cell: -1, typing: "", counted: 0, choice: null, nudge: false, tb: 0, fc: 4, fp: 25, picked: false, busy: false, touched: false });
const sbTbSteps = (it: any) => (it.kind === "many" ? it.count - 1 : it.kind === "share" ? it.pile.length - 1 : it.kind === "bill" ? it.lines.length : it.kind === "purse" ? 2 : 0);

/* ── the working area: 1472 x 520 shut, 900 open (bigPad); nothing under box.key ── */
function Work({ phase, n, item, index, stage, wrong, typed, captured, api, MODEL, step, stepOn, box, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();
  const tla = useTimeline();
  const busy = useRef(false);
  /* user mode or AI mode (read once a question opens; the agent's mount is never gated) */
  const [mode, setMode] = useState("user");
  const [armed, setArmed] = useState(false);
  const armedRef = useRef(false); armedRef.current = armed;
  const modeRef = useRef("user"); modeRef.current = mode;
  const P: any = PHASES[n - 1];
  const free = stage === "free";
  const demo = !free && (stage === "demo" || stage === "teach") && !!P.warm;
  const it: any = free ? SB_FREE : demo ? P.warm : item;
  const k = free ? "free" : it.kind;
  const won = !free && !demo && (stage === "win" || (stage === "idle" && index === P.items.length - 1));
  const asking = !free && !demo && stage === "ask";
  const live = asking || (demo && stage === "demo");
  /* the board is keyed to the ENTRY of a question, so an away-and-back opens it fresh */
  const base = free ? "free" : demo ? "w" + n : n + "." + index;
  const ent = useRef({ base: "", c: 0 });
  if (ent.current.base !== base) ent.current = { base, c: ent.current.c + 1 };
  const qk = base + "#" + ent.current.c;
  const [raw, setRaw] = useState<any>(() => sbFresh("", it));
  const S: any = raw.qk === qk ? raw : sbFresh(qk, it);
  const put = (o: any) => setRaw((p: any) => { const b = p.qk === qk ? p : sbFresh(qk, it); return { ...b, ...(typeof o === "function" ? o(b) : o) }; });
  const tbOn = useRef(false);
  const lastKey = useRef(0);
  const sRef = useRef(S); sRef.current = S;
  const itRef = useRef(it); itRef.current = it;
  const putRef = useRef(put); putRef.current = put;

  const lines: any[] = it.lines || [];
  const rounds = it.pile ? it.pile.length : 0;
  const purseN = it.purse ? it.purse.length : 0;
  const rightChoice = it.enough ? "enough" : "short";
  const allFilled = lines.every((_: any, i: number) => !!S.filled[i]);
  let needs = false;
  if (k === "many") needs = !S.tags;
  else if (k === "share") needs = S.dealt < rounds;
  else if (k === "bill") needs = !allFilled;
  else if (k === "purse") needs = !allFilled || S.counted < purseN || S.choice !== rightChoice;
  /* all = the win picture; the traceback keeps the child's own pick (it never shows the right one) */
  const doneState = (all = true) => ({ tags: true, tagN: it.count || 0, dealt: rounds, dealtN: 0, filled: lines.map(() => true), cell: -1, typing: "",
    counted: purseN, choice: k === "purse" ? (all ? rightChoice : S.choice) : null });
  const V: any = won ? { ...S, ...doneState() } : S;
  const tbv = asking && wrong ? S.tb : 0;

  /* ── layout, from box.w (never under the key's corner) ── */
  const AW = box ? box.w : W.w;
  const kx = box && box.key ? box.key.x - 12 : AW;
  const UW = Math.min(AW, kx);
  const keyRow = (ids: string[]) => {
    const kw = ids.length >= 4 ? 200 : ids.length === 2 ? 270 : 290, g = 20, kh = 76;
    const x0 = Math.round((UW - (ids.length * kw + (ids.length - 1) * g)) / 2);
    return ids.map((id, j) => ({ id, x: x0 + j * (kw + g), y: 520 - kh - 8, w: kw, h: kh }));
  };
  /* P1 / free: the counter row */
  const cnt = k === "free" ? S.fc : it.count || 0, price = k === "free" ? S.fp : it.price || 0;
  const cw = Math.min(170, (UW - 40) / Math.max(1, cnt)), rx0 = (UW - cw * cnt) / 2;
  const cells = sbRange(cnt).map((i) => ({ cx: rx0 + cw * (i + 0.5) }));
  const tagY = 302;
  /* P2: the tray and the plates */
  const np = it.plates || 0, perRow = np <= 4 ? np : Math.ceil(np / 2), nRows = np <= 4 ? 1 : 2;
  const pw = Math.min(nRows === 1 ? 260 : 220, (UW - 20) / Math.max(1, perRow) - 16), ph = Math.round(pw * 0.6);
  const plates = sbRange(np).map((i) => {
    const r = Math.floor(i / perRow), c = i % perRow, inRow = r === nRows - 1 ? np - perRow * r : perRow;
    const x0 = (UW - (inRow * (pw + 16) - 16)) / 2, x = x0 + c * (pw + 16), y = 118 + r * (ph + 10);
    return { x, y, cx: x + pw / 2, cy: y + ph / 2 };
  });
  const pileW = (key: string) => (sbIsNote(key) ? 104 : 52) + (np - 1) * 12;
  const trayX = 194;
  const pileX = (r: number) => trayX + 16 + sbSum(sbRange(r).map((j) => pileW(it.pile[j]) + 16));
  /* P3 / P4: the bill */
  const BW = Math.min(UW - 64, 880), bx = Math.round((UW - BW) / 2);
  const cf = [0.36, 0.18, 0.2, 0.26];
  const colX = cf.map((_, j) => bx + BW * sbSum(cf.slice(0, j)));
  const colW = cf.map((f) => BW * f);
  const hH = 62, lH = 86;
  const lineY = (i: number) => hH + i * lH;
  const cellBox = (i: number) => ({ x: colX[3] + 12, y: lineY(i) + 9, w: colW[3] - 24, h: lH - 18 });
  /* P4: the purse row */
  const pieces = (() => {
    const out: any[] = [];
    let nx = bx + 214, cxp = bx + 214;
    (it.purse || []).forEach((key: string) => {
      if (sbIsNote(key)) { const w = 150, h = sbPieceH(key, w); out.push({ key, x: nx, w, y: 226 - h / 2, cx: nx + w / 2, cy: 226 }); nx += w + 16; }
      else { const w = 76; out.push({ key, x: cxp, w, y: 314 - w / 2, cx: cxp + w / 2, cy: 314 }); cxp += w + 46; }
    });
    return out;
  })();
  const purseSum = sbSum((it.purse || []).map(sbVal));
  const billAmt = lines.length ? lines[0].price * lines[0].qty : 0;

  /* ── the acts: no hand (the chapter shows no people, hands or faces); the tags and the money move by themselves, a step
     about 0.35-0.45 s, the pad locked while a sequence runs so a double tap cannot start it twice ── */
  const inDemo = stage === "demo";
  const report = (name: string) => { if (inDemo) api.did(name); };
  const relock = (still: boolean) => api.lock(!!(asking && still && modeRef.current === "user" && (SB_GATE_FROM_OPEN || armedRef.current || sRef.current.touched) && !captured));
  const restoreQ = () => { if (sRef.current.nudge) { putRef.current({ nudge: false }); api.say(it.say); } };
  const runSeq = (count: number, ms: number, onStep: (i: number) => void, done: () => void) => {
    busy.current = true;
    put({ busy: true });
    api.lock(true);
    restoreQ();
    tla.run(sbRange(count).map((i) => [ms, () => { onStep(i); api.sfx.tick(); }]), () => { busy.current = false; put({ busy: false }); done(); });
  };
  const doTags = () => {
    if (k !== "many" || S.tags) { report("tags"); return; }
    if (busy.current) return;
    runSeq(cnt, 400, (i) => put({ tagN: i + 1 }), () => { put({ tags: true, tagN: cnt }); api.sfx.settle(); relock(false); report("tags"); });
  };
  const doShare = () => {
    if (k !== "share" || S.dealt >= rounds) { report("share"); return; }
    if (busy.current) return;
    const r = S.dealt;
    runSeq(np, 350, (i) => put((b: any) => (b.dealt > r ? {} : { dealtN: i + 1 })),
      () => { put((b: any) => ({ dealt: Math.max(b.dealt, r + 1), dealtN: 0 })); api.sfx.settle(); relock(r + 1 < rounds); report("share"); });
  };
  const doCount = () => {
    if (k !== "purse" || S.counted >= purseN) { report("count"); return; }
    if (busy.current) return;
    runSeq(purseN, 420, (i) => put((b: any) => ({ counted: Math.max(b.counted, i + 1) })),
      () => { put({ counted: purseN }); api.sfx.settle(); relock(true); report("count"); });
  };
  /* P4: the pick is graded with the number: a WRONG first pick is a miss (the traceback runs, first-try credit goes); a later
     wrong pick only nudges; the right pick unlocks the pad for the difference */
  const choose = (x: string) => {
    if (inDemo) { if (x === rightChoice) put({ choice: x }); api.did(x); return; }
    if (k !== "purse" || S.choice === rightChoice || busy.current || tbOn.current) return;
    if (x === rightChoice) { put({ choice: x, picked: true }); api.sfx.tick(); relock(false); restoreQ(); }
    else if (!S.picked) { put({ picked: true, nudge: false }); api.lock(false); api.submit("0"); }
    else { put({ nudge: true }); api.say("Compare the purse money with the price, then choose again."); }
  };
  /* P3's warm-up: the cost of the line is written into its Total box (the questions are the child's to fill) */
  const doFill = () => {
    if (k !== "bill" || allFilled) { report("fill"); return; }
    if (busy.current) return;
    runSeq(1, 500, () => {}, () => { put({ filled: lines.map(() => true) }); api.sfx.settle(); report("fill"); });
  };
  const act = (on: string) => {
    if (on === "fill") return doFill();
    if (on === "tags") return doTags();
    if (on === "share") return doShare();
    if (on === "count") return doCount();
    if (on === "enough" || on === "short") return choose(on);
    if (on === "fp-less") return put((b: any) => ({ fc: Math.max(1, b.fc - 1) }));
    if (on === "fp-more") return put((b: any) => ({ fc: Math.min(9, b.fc + 1) }));
    if (on === "fp-down") return put((b: any) => ({ fp: Math.max(1, b.fp - 1) }));
    if (on === "fp-up") return put((b: any) => ({ fp: Math.min(60, b.fp + 1) }));
  };
  const press = (id: string) => {
    if (asking && !S.touched) put({ touched: true });
    const t = Date.now();
    if (t - lastKey.current < 400 || busy.current) return;
    lastKey.current = t;
    act(id);
  };
  api.onEnter(stage === "demo" && stepOn ? () => act(stepOn) : null);

  /* a bill's Total box: tapped, it borrows the pad; Enter checks the line */
  const onKey = (key: string) => {
    const s = sRef.current, itc = itRef.current, ls = itc.lines || [], pu = putRef.current;
    const i = s.cell;
    if (i < 0 || !ls[i]) return;
    if (s.nudge && key !== "enter") { pu({ nudge: false }); api.say(itc.say); }
    if (/^\d$/.test(key)) { pu((b: any) => ({ typing: b.typing.length < 4 ? b.typing + key : b.typing })); return; }
    if (key === "back") { pu((b: any) => ({ typing: b.typing.slice(0, -1) })); return; }
    if (key === "clear") { pu({ typing: "" }); return; }
    if (key !== "enter" || !s.typing) return;
    if (Number(s.typing) === ls[i].price * ls[i].qty) {
      const f = s.filled.slice(); f[i] = true;
      const nx = f.findIndex((x: any) => !x);
      api.sfx.tick();
      if (nx < 0) { api.capture(null); pu({ filled: f, cell: -1, typing: "" }); if (s.nudge) api.say(itc.say); }
      else pu({ filled: f, cell: nx, typing: "" });
    } else {
      pu({ typing: "", nudge: true });
      api.say("Price of one times how many gives the cost of this line.");
    }
  };
  const tapCell = (i: number) => {
    if (asking && !S.touched) put({ touched: true });
    if (!asking || S.filled[i] || tbOn.current) return;
    restoreQ();
    put({ cell: i, typing: "" });
    api.capture(onKey);
  };

  /* the agent and the dev driver: the act done at once (AI mode is never gated) */
  HOOK.check = asking ? () => { tla.stop(); busy.current = false; put({ busy: false }); if (needs) { if (captured) api.capture(null); put(doneState()); } api.lock(false); return undefined; } : null;
  HOOK.demo = stage === "demo" && stepOn ? () => act(stepOn) : null;

  /* ANSWER GATED BY THE ACT (PATTERNS 19): locked only in a question that still needs its act, after a real touch, and never while
     the pad is lent to a bill box */
  /* ANSWER GATED BY THE ACT (the owner's decision 2026-11-12): from the question's opening in user mode, the Answer key and the
     pad stay dimmed until the act is done (never while the pad is lent to a bill box); AI mode and toolApi are never gated */
  useEffect(() => {
    if (tbOn.current || busy.current) return;
    if (asking) api.lock(!!(needs && mode === "user" && (SB_GATE_FROM_OPEN || armed || S.touched) && !captured));
  }, [qk, stage, needs, mode, captured, S.touched, armed]);
  /* REAL INPUT arms the gate for the rest of the mount (as C18): a trusted tap on the board, or Enter / Space on a guide step. From then
     on every question of the phase opens with the Answer key and the pad dimmed until its act is done; a tap on the dimmed key, a digit or
     a tap on the board off a control names the act. toolApi, HOOK.check and AI mode never arm it, so they stay ungated. */
  const capRef = useRef(false); capRef.current = !!captured;
  const gateRef = useRef({} as any);
  gateRef.current = { asking, needs, mode, stage, k, lines, purseN };
  useEffect(() => {
    const say1 = () => {
      const g = gateRef.current, s = sRef.current;
      putRef.current({ nudge: true });
      if (g.k === "many") api.say("Tap Price tags first.");
      else if (g.k === "share") api.say("Tap Share to deal the next round.");
      else if (g.k === "bill") api.say("Fill the Total boxes first.");
      else if (!g.lines.every((_: any, i: number) => !!s.filled[i])) api.say("Tap the Total box and write the cost of 4 bags.");
      else if (s.counted < g.purseN) api.say("Tap Count first.");
      else api.say("Pick Enough or Not enough first.");
    };
    const waiting = () => { const g = gateRef.current; return g.asking && g.needs && g.mode === "user" && !tbOn.current && !busy.current && !capRef.current; };
    const onDown = (e: any) => {
      const t: any = e.target;
      if (!e.isTrusted || !t || !t.closest) return;
      if (t.closest('[data-zone="work"]')) {
        setArmed(true);
        if (waiting() && !t.closest("[data-control]")) say1();
        return;
      }
      if (armedRef.current && waiting() && t.closest('[data-control="answer-open"],[data-control^="key-"]')) say1();
    };
    const onKd = (e: any) => {
      if (!e.isTrusted) return;
      const g = gateRef.current;
      if ((e.key === "Enter" || e.key === " ") && g.stage === "demo") setArmed(true);
      if (armedRef.current && waiting() && /^[0-9]$/.test(e.key)) say1();
    };
    window.addEventListener("pointerdown", onDown, true);
    window.addEventListener("keydown", onKd, true);
    return () => { window.removeEventListener("pointerdown", onDown, true); window.removeEventListener("keydown", onKd, true); };
  }, []);
  /* outside a question nothing is gated: released once when the stage changes (never while an act plays) */
  useEffect(() => { if (!tbOn.current && (stage === "demo" || stage === "teach" || free)) api.lock(false); }, [stage]);

  useEffect(() => {
    try { const T0: any = (window as any).toolApi || (window as any)[TOOL_ID]; const m = T0 && T0.getState && T0.getState().mode; if (m && m !== mode) setMode(m); } catch (e) { /* keep user */ }
  }, [qk]);
  /* the win line (a phase's last one gives way to its closing line) */
  useEffect(() => { if (stage === "win" && !free && !demo && it.win) api.say(it.win); }, [stage, qk]);

  /* the traceback: the working replayed, stopping one step before the answer (MISS HIDES THE ANSWER) */
  useEffect(() => {
    if (!wrong || stage !== "ask") return;
    tbOn.current = true;
    api.lock(true);
    if (captured) api.capture(null);
    tla.stop(); busy.current = false;
    put({ ...doneState(false), tb: 0 });
    const seq: any[] = sbRange(sbTbSteps(it)).map((s) => [s === 0 ? 500 : 900, () => put({ tb: s + 1 })]);
    seq.push([700, () => {}]);
    tl.run(seq, () => { tbOn.current = false; api.lock(false); if (k === "purse" && sRef.current.choice !== rightChoice) relock(true); });
  }, [wrong]);
  useEffect(() => () => { tl.stop(); tla.stop(); busy.current = false; if (tbOn.current) { tbOn.current = false; api.lock(false); } }, [qk]);

  api.share({ phase: n, count: it.count || null, price: it.price || null, plates: it.plates || null,
    lines: lines.map((l: any) => ({ name: l.name, price: l.price, qty: l.qty })), purse: it.purse || null,
    acted: !needs, complete: stage === "idle" });

  /* the one shop counter, the same in every phase (its wood skin over a plain fallback) */
  const counter = (y: number, h: number) => (
    <g filter="url(#sb-shadow)">
      <rect x={0} y={y} width={UW} height={h} rx={18} fill="url(#sb-counter-grad)" />
      {sbRange(Math.floor(UW / 46)).map((j) => <line key={"gr" + j} x1={23 + j * 46} y1={y + 6} x2={23 + j * 46} y2={y + h - 6} stroke="rgba(150,115,60,0.11)" strokeWidth={2} />)}
      <Skin name="counter" x={0} y={y} w={UW} h={h} />
      <rect x={3} y={y + 3} width={UW - 6} height={h - 6} rx={16} fill="none" stroke="rgba(120,90,40,0.25)" strokeWidth={3} />
    </g>
  );
  /* a working line drawn a token at a time (each a short label), centred on cx */
  const expr = (line: string, cx: number, y: number, fs: number, fill: string, anchor = "middle") => {
    const tk = line.split(" "), wOf = (t: string) => t.length * fs * 0.6, gap = fs * 0.35;
    const tot = sbSum(tk.map(wOf)) + gap * (tk.length - 1);
    let x = anchor === "start" ? cx : cx - tot / 2;
    return <g>{tk.map((t, j) => { const el = <text key={j} x={x + wOf(t) / 2} y={y} textAnchor="middle" dominantBaseline="central" fontSize={fs} fontWeight={700} fill={fill}>{t}</text>; x += wOf(t) + gap; return el; })}</g>;
  };
  const inv = (b: any) => <Invite x={b.x + b.w / 2} y={b.y + b.h / 2} w={b.w} h={b.h} C={C} />;
  const keys = (ids: string[], invite: string | null, off = false) => keyRow(ids).map((b, j) => (
    <g key={"k" + j} filter="url(#sb-shadow)">
      <Key id={b.id} label={tx(SB_KEY[b.id])} x={b.x} y={b.y} w={b.w} h={b.h} C={C} tone="key" disabled={off} onClick={() => press(b.id)}>
        <text y={1} textAnchor="middle" dominantBaseline="central" fontSize={T.label} fontWeight={700} fill={off ? "#66605A" : toneInk("key", C.ink)}>{tx(SB_KEY[b.id])}</text>
      </Key>
      {invite === b.id && inv(b)}
    </g>
  ));

  /* ── P1 and free play: the counter, one price tag under every thing ── */
  const drawMany = () => {
    const laid = free ? cnt : V.tags ? cnt : V.tagN;
    /* a notebook carries its price as a sticker on its bottom-right corner (the educator, 2026-11-16); other things keep it below */
    const bookTag = it.thing === "notebook";
    const bookW = Math.min(cw - 14, 196 * SB_THING.notebook.a);
    const bookTagAt = (c: any) => ({ x: c.cx + bookW / 2 - Math.min(cw - 8, 116) / 2 + 6, y: 294 - 30 });
    const runN = free || won ? cnt : tbv;
    const tagW = Math.min(cw - 8, 116), tfs = tagW >= 104 ? T.label : T.micro;
    /* free play: [- price +] [- count +] across the top, the cost at the foot */
    const px = free ? 80 : 0, nx = free ? 524 : 290;
    const totalChip = (
      <g filter="url(#sb-shadow)">
        <rect x={free ? UW / 2 - 130 : 524} y={free ? 432 : 0} width={260} height={80} rx={16} fill="url(#sb-grn-grad)" stroke={SB_GRN_EDGE} strokeWidth={3} />
        <text x={free ? UW / 2 : 654} y={free ? 474 : 42} textAnchor="middle" dominantBaseline="central" fontSize={T.speech} fontWeight={700} fill={SB_GRN_INK}>{sbRs(cnt * price)}</text>
      </g>
    );
    return (
      <g>
        <g filter="url(#sb-shadow)">
          <rect x={px} y={0} width={274} height={84} rx={16} fill="url(#sb-amb-grad)" stroke={SB_AMB_EDGE} strokeWidth={3} />
          <circle cx={px + 24} cy={42} r={8} fill="#FFFFFF" stroke={SB_AMB_EDGE} strokeWidth={2} />
          <text x={px + 146} y={44} textAnchor="middle" dominantBaseline="central" fontSize={T.speech} fontWeight={700} fill={SB_AMB_INK}>{sbRs(price)}</text>
        </g>
        <g filter="url(#sb-shadow)">
          <rect x={nx} y={0} width={218} height={84} rx={16} fill="url(#sb-sky-grad)" stroke={SB_SKY_EDGE} strokeWidth={3} />
          {(free || V.tags) ? <text x={nx + 109} y={44} textAnchor="middle" dominantBaseline="central" fontSize={T.speech} fontWeight={700} fill={SB_SKY_INK}>{"× " + cnt}</text>
            : <g>{sbThing(it.thing, nx + 46, 76, 50, 66)}<text x={nx + 140} y={44} textAnchor="middle" dominantBaseline="central" fontSize={T.speech} fontWeight={700} fill={SB_SKY_INK}>{String(cnt)}</text></g>}
        </g>
        {free && totalChip}
        {won && <g data-reveals="answer">{totalChip}</g>}
        {counter(100, 260)}
        {cells.map((c, i) => <g key={"t" + i}>{sbThing(it.thing, c.cx, 294, cw - 14, 196)}</g>)}
        {cells.map((c, i) => (i < laid ? (
          <g key={"g" + i} filter="url(#sb-shadow)" {...(bookTag ? { transform: `rotate(-8 ${bookTagAt(c).x} ${bookTagAt(c).y})` } : {})}>
            <rect x={(bookTag ? bookTagAt(c).x : c.cx) - tagW / 2} y={bookTag ? bookTagAt(c).y - 23 : tagY} width={tagW} height={46} rx={10} fill="url(#sb-amb-grad)" stroke="#A86A00" strokeWidth={3}
              {...(tbv > 0 && i < tbv ? { stroke: SB_GRN, strokeWidth: 4 } : {})} />
            <text x={bookTag ? bookTagAt(c).x : c.cx} y={bookTag ? bookTagAt(c).y : tagY + 23} textAnchor="middle" dominantBaseline="central" fontSize={tfs} fontWeight={700} fill={SB_AMB_INK}>{sbRs(price)}</text>
          </g>
        ) : null))}
        {cells.map((c, i) => (i < runN ? (
          (won && !free) ? <g key={"r" + i} data-reveals="answer"><text x={c.cx} y={404} textAnchor="middle" dominantBaseline="central" fontSize={T.prompt} fontWeight={700} fill={SB_GRN_INK}>{indian(price * (i + 1))}</text></g>
            : <text key={"r" + i} x={c.cx} y={404} textAnchor="middle" dominantBaseline="central" fontSize={T.prompt} fontWeight={700} fill={SB_GRN_INK}>{indian(price * (i + 1))}</text>
        ) : null))}
        {tbv > 0 && tbv === cnt - 1 && cells[cnt - 1] && <text x={cells[cnt - 1].cx} y={404} textAnchor="middle" dominantBaseline="central" fontSize={T.prompt} fontWeight={700} fill={SB_GRN_INK}>?</text>}
        {live && !V.tags && keys(["tags"], "tags")}
        {free && [["fp-down", px - 80, "−"], ["fp-up", px + 282, "+"], ["fp-less", nx - 80, "−"], ["fp-more", nx + 226, "+"]].map(([id, x, g]: any) => (
          <g key={id} filter="url(#sb-shadow)">
            <Key id={id} label={tx(SB_KEY[id])} x={x} y={6} w={72} h={72} C={C} tone="key" onClick={() => press(id)}>
              <text y={1} textAnchor="middle" dominantBaseline="central" fontSize={T.xl} fontWeight={700} fill={toneInk("key", C.ink)}>{g}</text>
            </Key>
          </g>
        ))}
      </g>
    );
  };

  /* a plate's pile: notes in a column on the left, coins in a column on the right */
  const pileOn = (keysOn: string[], cx: number, cy: number, sc: number, litN: number) => {
    const notes = keysOn.map((key, i) => ({ key, i })).filter((p) => sbIsNote(p.key));
    const coins = keysOn.map((key, i) => ({ key, i })).filter((p) => !sbIsNote(p.key));
    const nw = 84 * sc, nh = sbPieceH("note", nw), cd = 46 * sc;
    const totW = (notes.length ? nw : 0) + (notes.length && coins.length ? 10 : 0) + (coins.length ? cd + 34 : 0);
    const nx = cx - totW / 2, cxx = nx + (notes.length ? nw + 10 : 0);
    const nY = cy - (notes.length * nh + (notes.length - 1) * 6) / 2, cY = cy - (coins.length * cd + (coins.length - 1) * 8) / 2;
    return (
      <g>
        {notes.map((p, j) => <g key={"n" + j}>{sbMoney(p.key, nx, nY + j * (nh + 6), nw, true, p.i < litN)}</g>)}
        {coins.map((p, j) => <g key={"c" + j}>{sbMoney(p.key, cxx + (j % 2) * cd * 0.3, cY + j * (cd + 8), cd, true, p.i < litN)}</g>)}
      </g>
    );
  };
  /* ── P2: the tray dealt onto the plates ── */
  const drawShare = () => {
    const pile: string[] = it.pile;
    const sc = Math.min(1.15, pw / 200);
    const each = sbSum(pile.map(sbVal));
    const eachText = lang === "en" ? sbRs(each) + " " + tx("each") : each + " " + tx("rupees") + " " + tx("each");
    const eachW = Math.max(340, eachText.length * T.speech * 0.6 + 60);
    const trayW = pileX(rounds) - trayX;
    const tbText = tbv === 0 ? "" : tbv === 1 ? String(sbVal(pile[0]))
      : `${sbSum(pile.slice(0, tbv - 1).map(sbVal))} + ${sbVal(pile[tbv - 1])} = ${sbSum(pile.slice(0, tbv).map(sbVal))}`;
    return (
      <g>
        {counter(108, 296)}
        <rect x={0} y={18} width={178} height={64} rx={14} fill="#FFFFFF" stroke={SB_BLU} strokeWidth={3} filter="url(#sb-shadow)" />
        <text x={89} y={54} textAnchor="middle" dominantBaseline="central" fontSize={T.prompt} fontWeight={700} fill={SB_BLU_INK}>{sbRs(it.total)}</text>
        {V.dealt < rounds && <rect x={trayX} y={0} width={trayW} height={100} rx={16} fill="#F7EFE0" stroke="#A9865A" strokeWidth={3} filter="url(#sb-shadow)" />}
        {sbRange(rounds).map((r) => {
          if (r < V.dealt) return null;
          const left = r === V.dealt ? np - V.dealtN : np;
          const key = pile[r], w = sbIsNote(key) ? 104 : 52, y = 50 - sbPieceH(key, w) / 2;
          return <g key={"p" + r}>{sbRange(left).map((j) => <g key={j}>{sbMoney(key, pileX(r) + j * 12, y, w, j === left - 1)}</g>)}</g>;
        })}
        {plates.map((p, i) => {
          const got = pile.slice(0, V.dealt).concat(i < V.dealtN && V.dealt < rounds ? [pile[V.dealt]] : []);
          return (
            <g key={"pl" + i}>
              {tbv > 0 && i === 0 && <ellipse cx={p.cx} cy={p.cy} rx={pw / 2 + 8} ry={ph / 2 + 8} fill="none" stroke={SB_SKY} strokeWidth={5} />}
              <g filter="url(#sb-shadow)">
                <ellipse cx={p.cx} cy={p.cy} rx={pw / 2} ry={ph / 2} fill="#D9824B" stroke="#7A3E1A" strokeWidth={2.5} />
                <Skin name="plate" x={p.x} y={p.y} w={pw} h={ph} fit="stretch" />
              </g>
              {pileOn(got, p.cx, p.cy, sc, i === 0 ? tbv : 0)}
            </g>
          );
        })}
        {tbText && <g filter="url(#sb-shadow)">
          {/* the working sits where the emptied tray was, on white, clear of the plank and the Share key */}
          <rect x={194} y={14} width={Math.min(UW - 204, 420)} height={72} rx={14} fill="#FFFFFF" stroke={SB_GRN_EDGE} strokeWidth={2} />
          {expr(tbText, 194 + Math.min(UW - 204, 420) / 2, 50, T.speech, SB_GRN_INK)}
        </g>}
        {won && <g data-reveals="answer" filter="url(#sb-shadow)">
          <rect x={UW / 2 - eachW / 2} y={408} width={eachW} height={72} rx={16} fill="url(#sb-grn-grad)" stroke={SB_GRN_EDGE} strokeWidth={3} />
          <text x={UW / 2} y={444} textAnchor="middle" dominantBaseline="central" fontSize={T.speech} fontWeight={700} fill={SB_GRN_INK}>{eachText}</text>
        </g>}
        {live && !won && keys(["share"], V.dealt < rounds && !S.busy ? "share" : null, V.dealt >= rounds || S.busy)}
      </g>
    );
  };

  /* ── the bill: Item | Price | Quantity | Total ── */
  const drawBill = (totalRow: boolean) => {
    const L = lines.length, ruleY = lineY(L) + 6, totY = ruleY + 8, H = totalRow ? totY + 72 : lineY(L) + 8;
    const firstEmpty = lines.findIndex((_: any, i: number) => !V.filled[i]);
    const lt = lines.map((l: any) => l.price * l.qty);
    const tbLine = k === "bill" && tbv > 0 ? tbv - 1 : k === "purse" && tbv > 0 ? 0 : -1;
    const tbText = k !== "bill" || tbv === 0 ? "" : tbv === 1 ? indian(lt[0])
      : `${indian(sbSum(lt.slice(0, tbv - 1)))} + ${indian(lt[tbv - 1])} = ${tbv < L ? indian(sbSum(lt.slice(0, tbv))) : "?"}`;
    const head = ["Item", "Price", "Quantity", "Total"];
    return (
      <g filter="url(#sb-shadow-strong)">
        <rect x={bx} y={0} width={BW} height={H} rx={12} fill="url(#sb-bill-grad)" stroke="#7E6238" strokeWidth={3} />
        <Skin name="bill" x={bx} y={0} w={BW} h={H} opacity={0.55} />
        <rect x={bx} y={0} width={BW} height={hH} rx={12} fill={tint(C.panel, 0.2)} />
        {head.map((h, j) => <text key={h} x={j === 0 ? colX[0] + 18 : colX[j] + colW[j] / 2} y={35} textAnchor={j === 0 ? "start" : "middle"} dominantBaseline="central"
          fontSize={T.label} fontWeight={700} fill={C.ink}>{tx(h)}</text>)}
        {lines.map((l: any, i: number) => {
          const y = lineY(i), cb = cellBox(i), on = captured && V.cell === i && asking;
          return (
            <g key={"l" + i}>
              {i === tbLine && <rect x={bx + 4} y={y + 3} width={BW - 8} height={lH - 6} rx={10} fill="none" stroke={SB_SKY} strokeWidth={4} />}
              <line x1={bx + 10} y1={y} x2={bx + BW - 10} y2={y} stroke={C.rule} strokeWidth={2} />
              {l.thing ? sbThing(l.thing, colX[0] + 52, y + lH / 2 + 31, 84, 62, true) : null}
              <text x={colX[0] + (l.thing ? 106 : 18)} y={y + lH / 2 + 2} dominantBaseline="central" fontSize={T.label} fontWeight={600} fill={C.ink}>{tx(l.name)}</text>
              <text x={colX[1] + colW[1] / 2} y={y + lH / 2 + 2} textAnchor="middle" dominantBaseline="central" fontSize={T.prompt} fontWeight={700} fill={SB_AMB_INK}>{sbRs(l.price)}</text>
              <text x={colX[2] + colW[2] / 2} y={y + lH / 2 + 2} textAnchor="middle" dominantBaseline="central" fontSize={T.prompt} fontWeight={700} fill={SB_SKY_INK}>{String(l.qty)}</text>
              <rect x={cb.x} y={cb.y} width={cb.w} height={cb.h} rx={10} fill="#FFFFFF" stroke={on ? SB_GRN : V.filled[i] ? SB_GRN : C.dim}
                strokeWidth={on ? 4 : 2.5} strokeDasharray={V.filled[i] || on ? undefined : "8 6"} />
              {V.filled[i] ? <text x={cb.x + cb.w / 2} y={cb.y + cb.h / 2 + 2} textAnchor="middle" dominantBaseline="central" fontSize={T.prompt} fontWeight={700} fill={SB_GRN_INK}>{sbRs(lt[i])}</text>
                : on ? <g>
                  <text x={cb.x + 16} y={cb.y + cb.h / 2 + 2} dominantBaseline="central" fontSize={T.prompt} fontWeight={700} fill={SB_GRN_INK}>{"Rs " + S.typing}</text>
                  <rect className="c4-caret" x={cb.x + 16 + (3 + S.typing.length) * 21} y={cb.y + 10} width={3} height={cb.h - 20} fill={C.ink} />
                </g>
                : <text x={cb.x + 16} y={cb.y + cb.h / 2 + 2} dominantBaseline="central" fontSize={T.micro} fontWeight={600} fill="#767676">Rs</text>}
              {asking && !V.filled[i] && <Hit id={"line-" + (i + 1)} x={cb.x} y={cb.y} w={cb.w} h={Math.max(72, cb.h)} label={"Total of line " + (i + 1)}
                onPress={() => tapCell(i)} enabled={!on} />}
              {asking && !captured && i === firstEmpty && !tbOn.current && <Invite x={cb.x + cb.w / 2} y={cb.y + cb.h / 2} w={cb.w} h={cb.h} rx={10} C={C} />}
            </g>
          );
        })}
        {totalRow && <g>
          <line x1={bx + 10} y1={ruleY} x2={bx + BW - 10} y2={ruleY} stroke={C.ink} strokeWidth={3} />
          <text x={colX[0] + 18} y={totY + 35} dominantBaseline="central" fontSize={T.prompt} fontWeight={700} fill={C.ink}>{tx("Total")}</text>
          {tbText && expr(tbText, colX[0] + 150, totY + 35, T.prompt, SB_GRN_INK, "start")}
          <rect x={colX[3] + 12} y={totY + 6} width={colW[3] - 24} height={58} rx={10} fill="url(#sb-grn-grad)" stroke={SB_GRN_EDGE} strokeWidth={3} />
          {won && <g data-reveals="answer"><text x={colX[3] + colW[3] / 2} y={totY + 35} textAnchor="middle" dominantBaseline="central" fontSize={T.prompt} fontWeight={700} fill={SB_GRN_INK}>{sbRs(it.answer)}</text></g>}
        </g>}
      </g>
    );
  };

  /* ── P4: the purse beside the bill ── */
  const drawPurse = () => {
    const counted = V.counted, sumC = sbSum((it.purse || []).slice(0, counted).map(sbVal));
    const big = Math.max(purseSum, billAmt), small = Math.min(purseSum, billAmt);
    const ids = !live || won ? [] : counted < purseN ? (allFilled ? ["count"] : []) : allFilled && V.choice !== rightChoice ? ["enough", "short"] : [];
    const inviteId = inDemo ? stepOn : !allFilled ? null : counted < purseN ? "count" : null;
    const tagOn = counted > 0;
    return (
      <g>
        {drawBill(false)}
        <g filter="url(#sb-shadow)">
          <rect x={bx} y={182} width={196} height={170} rx={30} fill="#A0703F" stroke="#6B4423" strokeWidth={2} />
          <Skin name="purse" x={bx} y={182} w={196} h={170} fit="stretch" />
        </g>
        {pieces.map((p: any, i: number) => <g key={"m" + i}>{sbMoney(p.key, p.x, p.y, p.w, true, tbv === 0 && i === counted - 1 && counted < purseN)}</g>)}
        {tagOn && <g filter="url(#sb-shadow)">
          <rect x={bx} y={360} width={200} height={62} rx={14} fill="#FFFFFF" stroke={SB_BLU} strokeWidth={tbv > 0 ? 5 : 3} />
          <text x={bx + 100} y={391} textAnchor="middle" dominantBaseline="central" fontSize={T.prompt} fontWeight={700} fill={SB_BLU_INK}>{sbRs(sumC)}</text>
        </g>}
        {V.choice === rightChoice && <g filter="url(#sb-shadow)">
          <rect x={bx + 216} y={360} width={250} height={62} rx={14} fill="url(#sb-sky-grad)" stroke={SB_SKY_EDGE} strokeWidth={3} />
          <text x={bx + 341} y={391} textAnchor="middle" dominantBaseline="central" fontSize={T.label} fontWeight={700} fill={SB_SKY_INK}>{tx(SB_KEY[rightChoice])}</text>
        </g>}
        {tbv >= 2 && !won && <g filter="url(#sb-shadow)">
          <rect x={bx + 484} y={360} width={Math.max(370, UW - bx - 494)} height={62} rx={14} fill="#FFFFFF" stroke={SB_GRN_EDGE} strokeWidth={2} />
          {expr(`${indian(big)} − ${indian(small)} = ?`, bx + 500, 391, T.speech, SB_GRN_INK, "start")}
        </g>}
        {won && <g data-reveals="answer">
          {expr(`${indian(big)} − ${indian(small)} = ${indian(it.answer)}`, bx + 20, 476, T.speech, SB_GRN_INK, "start")}
          <rect x={bx + BW - 400} y={440} width={400} height={72} rx={16} fill="url(#sb-grn-grad)" stroke={SB_GRN_EDGE} strokeWidth={3} filter="url(#sb-shadow)" />
          <text x={bx + BW - 200} y={476} textAnchor="middle" dominantBaseline="central" fontSize={T.prompt} fontWeight={700} fill={SB_GRN_INK}>
            {lang === "en" ? sbRs(it.answer) + " " + (it.enough ? tx("left") : tx("more needed")) : it.answer + " " + tx("rupees") + " " + (it.enough ? tx("left") : tx("more needed"))}</text>
        </g>}
        {keys(ids, ids.includes(inviteId as any) ? inviteId : null)}
      </g>
    );
  };

  return (
    <g>
      <defs>
        <filter id="sb-shadow" x="-10%" y="-10%" width="130%" height="130%">
          <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#462D0A" floodOpacity="0.38" />
        </filter>
        <filter id="sb-shadow-strong" x="-12%" y="-12%" width="134%" height="140%">
          <feDropShadow dx="0" dy="6" stdDeviation="5" floodColor="#462D0A" floodOpacity="0.55" />
        </filter>
        <linearGradient id="sb-counter-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F0E5CE" />
          <stop offset="40%" stopColor="#EADCC0" />
          <stop offset="100%" stopColor="#DFCDAA" />
        </linearGradient>
        <linearGradient id="sb-amb-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFF4D4" />
          <stop offset="100%" stopColor="#F7D98F" />
        </linearGradient>
        <linearGradient id="sb-sky-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F0F8FF" />
          <stop offset="100%" stopColor="#BAE3FF" />
        </linearGradient>
        <linearGradient id="sb-grn-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#EBF9F5" />
          <stop offset="100%" stopColor="#B3EBDC" />
        </linearGradient>
        <linearGradient id="sb-blu-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F0F4FF" />
          <stop offset="100%" stopColor="#C6DAFE" />
        </linearGradient>
        <linearGradient id="sb-bill-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#FFFDF5" />
        </linearGradient>
      </defs>
      {(k === "bill" || k === "purse") && counter(k === "bill" ? 0 : 168, k === "bill" ? 420 : 254)}
      {(k === "many" || k === "free") && drawMany()}
      {k === "share" && drawShare()}
      {k === "bill" && drawBill(true)}
      {k === "bill" && inDemo && !allFilled && keys(["fill"], "fill")}
      {k === "purse" && drawPurse()}
    </g>
  );
}

/* the summary page's small drawing: the child's own last right answer as the sum it came from (digits only) */
function Thumb({ result, it, C, w, h, lang = "en", tx = (v: any) => v }: any) {
  const v = result && result.last ? leadNumber(result.last.value) : null;
  if (v === null || v === undefined) return null;
  const item: any = it || (result.last && result.last.it) || {};
  let line = String(v);
  if (item.kind === "many") line = `${item.count} × ${item.price} = ${indian(v)}`;
  else if (item.kind === "share") line = `${item.total} ÷ ${item.plates} = ${indian(v)}`;
  else if (item.kind === "bill") line = tx("Total") + " = " + indian(v);
  else if (item.kind === "purse") {
    const m = (item.purse || []).reduce((s: number, k: string) => s + sbVal(k), 0), b = item.lines ? item.lines[0].price * item.lines[0].qty : 0;
    line = `${Math.max(m, b)} − ${Math.min(m, b)} = ${indian(v)}`;
  }
  const fs = T.micro;
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      <rect x={10} y={h / 2 - 22} width={w - 20} height={44} rx={10} fill="#FFFFFF" stroke={SB_GRN_EDGE} strokeWidth={2} />
      <text x={w / 2} y={h / 2} textAnchor="middle" dominantBaseline="central" fontSize={fs} fontWeight={700} fill={SB_GRN_INK}>{line}</text>
    </g>
  );
}

function ShopBill(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, fitHost: () => null,
      board: true,
      keyOnly: true,
      bigPad: true,
      nextKey: true,
      navDots: true,
      StartArt, START_HOOK,
      }} />
  );
}

export default ShopBill;
