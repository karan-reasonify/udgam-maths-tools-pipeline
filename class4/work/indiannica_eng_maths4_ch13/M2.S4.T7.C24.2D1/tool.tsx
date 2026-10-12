/* ═══ M2.S4.T7.C24.2D1 · shop_divider · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists: header + its three controls, canvas, slot + pad, bubble + mascot,
   phase dots (user / AI mode), window.toolApi, sounds, the synced voice, scoring, the events,
   idle and restart. NO imports in this file; only the five host hooks. Follow docs/LAYOUT.md;
   the reference tool is work/indiannica_eng_maths4_ch1/M1.S1.T2.C4.2D1/tool.tsx.
   Edit, never rewrite. Built by `node cli.mjs scaffold`; concepts are verbatim (check compares them). */

const TOOL_ID = "shop_divider";
const MEDIA_ID = "M2.S4.T7.C24.2D1";
const TOOL_NAME = "Shop Divider";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
const VOICE = {"rate":0.92,"pitch":1.06};

/* spoken before phase 1's teach lines only (the plan's opening voice line) */
const OPENING = ["A till of rupees and a shelf of things. What is the question asking for?"];
/* the whole-tool line: spoken on the summary page */
const FINISH_LINE = "Every cost of one found, every count of things given, and every rupee left kept.";
/* said when the child opens Free play from the summary page (the plan's free-play voice line) */
const FREE_LINE = "Free play. Fill the till, set a price, buy on the lane, and check with the tray.";

/* Hindi and Gujarati (docs/PATTERNS.md §11): every line above and below stays English, exactly as the checks
   read it; this table is keyed by that English, and the runtime looks each spoken or drawn line up in it.
   Fill it AFTER the English is final and reviewed (`node cli.mjs voice` lists every line still missing),
   then bake the voice. Empty = the tool runs in English only. */
/* Chapter terms (first drafts for a native speaker): rupee रुपया / રૂપિયો, note नोट / નોટ, coin सिक्का / સિક્કો,
   price कीमत / કિંમત, cost खर्च / ખર્ચ, bill बिल / બિલ, total कुल / કુલ, remainder शेष / શેષ, till गल्ला / ગલ્લો,
   pile ढेर / ઢગલો, lane पट्टी / પટ્ટી, shelf शेल्फ़ / છાજલી, tray ट्रे / ટ્રે, table तालिका / કોષ્ટક,
   tag टैग / ટૅગ, check जाँचो / ચકાસો, ticket टिकट / ટિકિટ, row पंक्ति / હાર.
   Spoken money is in words ("522 रुपये"); drawn money keeps its digits with the sign "₹". */
const TR: any = {
  hi: {
    "Shop Divider": "दुकान का बँटवारा",
    "The cost of one": "एक का खर्च",
    "The price of one ticket": "एक टिकट की कीमत",
    "How many can be bought": "कितनी चीज़ें खरीद सकते हैं",
    "Money left over": "बचे हुए रुपये",
    "A till of rupees and a shelf of things. What is the question asking for?": "रुपयों से भरा गल्ला और चीज़ों से भरी शेल्फ़। सवाल क्या पूछ रहा है?",
    "Every cost of one found, every count of things given, and every rupee left kept.": "हर एक का खर्च मिला, हर गिनती बताई, और बचा हर रुपया संभाला।",
    "Free play. Fill the till, set a price, buy on the lane, and check with the tray.": "मुक्त खेल। गल्ला भरो, कीमत चुनो, पट्टी पर खरीदो और ट्रे से जाँचो।",
    /* phase 1 */
    "Tap a row of the till to deal its notes, one to each pile, so every pile gets the same.": "गल्ले की किसी पंक्ति पर टैप करो। उसके नोट हर ढेर में एक-एक करके बँटेंगे, ताकि सबको बराबर मिले।",
    "Start at the top. When too few are left to go round, a tap changes them for smaller ones.": "ऊपर से शुरू करो। जब सबके लिए कम पड़ें, तो टैप से वे छोटे मूल्य में बदल जाते हैं।",
    "Each pile keeps hundreds on top, then tens, then ones.": "हर ढेर में सबसे ऊपर सैकड़ा, फिर दहाई, फिर इकाई।",
    "What does one pile hold?": "एक ढेर में कितना है?",
    "Try a small one: Rs 20 shared by 4 is Rs 5 each. Share this total the same way.": "छोटा सोचो: 20 रुपये 4 ढेरों में बाँटो। हर एक को 5 रुपये मिलेंगे। इस कुल को भी ऐसे ही बाँटो।",
    "When each thing costs the same, the cost of one is the total cost divided by the number of things.": "हर चीज़ का खर्च बराबर हो, तो कुल खर्च को गिनती से भाग दो। यही एक का खर्च है।",
    "You learned: total cost divided by the things is the cost of one.": "तुमने सीखा: कुल खर्च को चीज़ों की संख्या से भाग दो, तो एक का खर्च।",
    "6 lunch boxes cost Rs 522. What does one lunch box cost?": "6 लंच बॉक्स का खर्च 522 रुपये है। एक लंच बॉक्स का खर्च क्या है?",
    "Cost of one lunch box?": "एक लंच बॉक्स का खर्च?",
    "Six boxes share the Rs 522, so one box costs less than the total. Share it, do not multiply.": "522 रुपये छह बॉक्स में बँटते हैं। तो एक बॉक्स कुल से सस्ता है। बाँटो, गुणा मत करो।",
    "5 caps cost Rs 465. Find the cost of one cap.": "5 टोपियों का खर्च 465 रुपये है। एक टोपी का खर्च पता करो।",
    "Cost of one cap?": "एक टोपी का खर्च?",
    "Deal the Rs 465 into five equal piles. One pile pays for one cap.": "465 रुपये पाँच बराबर ढेरों में बाँटो। एक ढेर एक टोपी का खर्च है।",
    "Now 9 chairs cost Rs 3,006. What is the price of one chair?": "अब 9 कुर्सियों का खर्च 3,006 रुपये है। एक कुर्सी की कीमत क्या है?",
    "Price of one chair?": "एक कुर्सी की कीमत?",
    "Rs 3,006 has zeros in it. Keep dealing until the till is empty.": "3,006 रुपये में शून्य हैं। गल्ला खाली होने तक बाँटते रहो।",
    /* phase 2 */
    "Each row of the ticket table shows the tickets bought and the amount spent.": "टिकट तालिका की हर पंक्ति में खरीदे गए टिकट और खर्च की रकम है।",
    "A bill lists the things bought and what they cost. Cost is the price to be paid.": "बिल में खरीदी चीज़ें और उनके खर्च लिखे होते हैं। खर्च यानी जो कीमत चुकानी है।",
    "Tap a row to share its amount among its tickets.": "किसी पंक्ति पर टैप करो और उसकी रकम उसके टिकटों में बाँटो।",
    "Which is more: what one ticket costs, or what all the tickets cost together?": "कौन ज़्यादा है: एक टिकट का खर्च, या सारे टिकटों का कुल खर्च?",
    "Try a small row: 2 tickets for Rs 60 cost Rs 30 each. Share this row the same way.": "छोटी पंक्ति सोचो: 60 रुपये में 2 टिकट। तो हर टिकट 30 रुपये का। इस पंक्ति को भी ऐसे ही बाँटो।",
    "The price of one ticket is the amount spent divided by the tickets. The total spent adds the amounts spent.": "रकम को टिकटों की संख्या से भाग दो, तो एक टिकट की कीमत मिलती है। कुल खर्च में सारी रकमें जुड़ती हैं।",
    "You learned: amount spent divided by tickets is one ticket's price.": "तुमने सीखा: खर्च को टिकटों से भाग दो, तो एक टिकट की कीमत।",
    "In one row, 6 tickets cost Rs 858. In the other, 8 tickets cost Rs 560. Find each row's price of one ticket, then the total spent.": "एक पंक्ति में 6 टिकट 858 रुपये के हैं। दूसरी में 8 टिकट 560 रुपये के हैं। हर पंक्ति में एक टिकट की कीमत निकालो, फिर कुल खर्च।",
    "Total spent?": "कुल खर्च?",
    "Add what every row spent. One ticket from each row is not the total.": "हर पंक्ति का खर्च जोड़ो। हर पंक्ति से एक टिकट जोड़ना कुल नहीं है।",
    "4 tickets cost Rs 332. What is one ticket's price?": "4 टिकट 332 रुपये के हैं। एक टिकट की कीमत क्या है?",
    "Price of one ticket?": "एक टिकट की कीमत?",
    "The Rs 332 paid for all 4 tickets. One ticket is only one share of it.": "332 रुपये चारों टिकटों के हैं। एक टिकट उसका सिर्फ़ एक हिस्सा है।",
    "A bill shows Rs 861 spent on 7 tickets. What does one ticket cost?": "एक बिल में 7 टिकटों पर 861 रुपये खर्च लिखा है। एक टिकट का खर्च क्या है?",
    "Cost of one ticket?": "एक टिकट का खर्च?",
    "Try 7 tickets at your price. Does it make the bill's Rs 861?": "तुम्हारी कीमत पर 7 टिकट का खर्च देखो। क्या वह बिल के 861 रुपये बनता है?",
    /* phase 3 */
    "Now the price of one thing is known, and the till holds the money.": "अब एक चीज़ की कीमत पता है, और गल्ले में रुपये हैं।",
    "Tap a price tag to pay it out along the lane. The 10 and 100 tags buy many at once.": "कीमत के टैग पर टैप करो और पट्टी पर रुपये चुकाओ। 10 और 100 वाले टैग एक बार में कई लेते हैं।",
    "Is the answer a number of rupees, or a number of things?": "उत्तर रुपयों की संख्या है या चीज़ों की?",
    "Try a small one: Rs 20 buys 4 things at Rs 5 each. Now look again at what this one asks.": "छोटा सोचो: 5 रुपये वाली 4 चीज़ें 20 रुपये की हैं। अब देखो यह सवाल क्या पूछता है।",
    "How many things an amount buys is the money divided by the price of one, and the answer counts things.": "रकम को एक की कीमत से भाग दो, तो पता चलता है कितनी चीज़ें आएँगी। उत्तर चीज़ें गिनता है।",
    "You learned: money divided by the price of one gives a count of things.": "तुमने सीखा: रकम को एक की कीमत से भाग दो, तो चीज़ों की गिनती।",
    "A notebook costs Rs 9. How many notebooks can Rs 1,467 buy?": "एक कॉपी 9 रुपये की है। 1,467 रुपये में कितनी कॉपियाँ आएँगी?",
    "How many notebooks?": "कितनी कॉपियाँ?",
    "Count what the lane buys, one price at a time.": "पट्टी जो खरीदती है उसे गिनो, हर बार एक कीमत।",
    "Kites are Rs 7 each, and the till holds Rs 1,582. How many kites?": "एक पतंग 7 रुपये की है। गल्ले में 1,582 रुपये हैं। कितनी पतंगें?",
    "How many kites?": "कितनी पतंगें?",
    "Try your kites at Rs 7 each. Do they cost Rs 1,582?": "अपनी पतंगें 7 रुपये के हिसाब से गिनो। क्या कुल 1,582 रुपये बनते हैं?",
    "A box holds 18 coins, the same number each of Rs 10, Rs 5 and Rs 2. How much money is in it?": "एक डिब्बे में 18 सिक्के हैं। 10 रुपये, 5 रुपये और 2 रुपये वाले बराबर-बराबर हैं। उसमें कुल कितने रुपये हैं?",
    "Money in the box?": "डिब्बे में कितने रुपये?",
    "Each kind of coin makes one row. Find what each row is worth, then add the rows.": "हर तरह के सिक्कों की एक पंक्ति बनती है। हर पंक्ति की रकम निकालो, फिर जोड़ो।",
    /* phase 4 */
    "This time a little money stays in the till when the lane stops.": "इस बार पट्टी रुकने पर गल्ले में थोड़े रुपये बच जाते हैं।",
    "Type how many things in the first box, then the rupees left in the second.": "पहले खाने में चीज़ों की गिनती लिखो, फिर दूसरे में बचे रुपये।",
    "Put the money left beside the price. Which is bigger?": "बचे रुपये को कीमत के पास रखकर देखो। कौन बड़ा है?",
    "Try a small one: Rs 19 at Rs 5 each buys 3, with Rs 4 left. Now this till.": "छोटा सोचो: 19 रुपये में 5 रुपये वाली 3 चीज़ें आती हैं। 4 रुपये बचते हैं। अब यह गल्ला।",
    "In a how-many division, the remainder is the money left over, too little to buy one more.": "कितनी चीज़ें वाले भाग में शेष बचे रुपये होते हैं। वे एक और चीज़ के लिए कम पड़ते हैं।",
    "You learned: the rupees left when the lane stops are the remainder.": "तुमने सीखा: पट्टी रुकने पर बचे रुपये ही शेष हैं।",
    "Pencils cost Rs 6 each. How many can Rs 1,597 buy, and how much money is left?": "एक पेंसिल 6 रुपये की है। 1,597 रुपये में कितनी पेंसिलें आएँगी? और कितने रुपये बचेंगे?",
    "Pencils and money left?": "पेंसिलें और बचे रुपये?",
    "What the lane could not spend is part of the answer too.": "पट्टी जो खर्च नहीं कर पाई, वह भी उत्तर का हिस्सा है।",
    "Erasers are Rs 4 each and the till holds Rs 150. How many erasers, and what is left?": "एक रबड़ 4 रुपये की है। गल्ले में 150 रुपये हैं। कितनी रबड़, और कितना बचा?",
    "Erasers and money left?": "रबड़ और बचे रुपये?",
    "4 times the erasers, plus the rupees left, must make Rs 150 again.": "रबड़ों का 4 गुना और बचे रुपये जोड़ो। फिर से 150 रुपये बनने चाहिए।",
    "Juice packs cost Rs 12 each. How many packs does Rs 500 pay for, and what stays in the till?": "जूस का एक पैकेट 12 रुपये का है। 500 रुपये में कितने पैकेट आएँगे? और गल्ले में क्या बचेगा?",
    "Packs and money left?": "पैकेट और बचे रुपये?",
    "Any pack not fully paid for does not count.": "जिस पैकेट के पूरे रुपये नहीं चुके, वह नहीं गिना जाता।",
    /* the answer boxes' names (two-box and one-box slots) */
    "notebooks": "कॉपियाँ", "kites": "पतंगें", "pencils": "पेंसिलें", "erasers": "रबड़", "packs": "पैकेट", "Rs left": "₹ बचे",
    /* words the picture draws */
    "tickets": "टिकट", "spent": "खर्च", "one ticket": "एक टिकट", "total": "कुल", "left": "बचे", "money left": "बचे रुपये",
    "check": "जाँचो", "empty": "खाली", "price": "कीमत", "things": "चीज़ें",
    "one lunch box": "एक लंच बॉक्स", "one cap": "एक टोपी", "one chair": "एक कुर्सी", "spent in all": "कुल खर्च", "in the box": "डिब्बे में",
    /* the question card */
    "6 lunch boxes": "6 लंच बॉक्स", "cost Rs 522": "खर्च ₹522", "one box: Rs ?": "एक बॉक्स: ₹ ?",
    "5 caps": "5 टोपियाँ", "cost Rs 465": "खर्च ₹465", "one cap: Rs ?": "एक टोपी: ₹ ?",
    "9 chairs": "9 कुर्सियाँ", "cost Rs 3,006": "खर्च ₹3,006", "one chair: Rs ?": "एक कुर्सी: ₹ ?",
    "6 for Rs 858": "6 टिकट ₹858", "8 for Rs 560": "8 टिकट ₹560", "total spent: Rs ?": "कुल खर्च: ₹ ?",
    "4 tickets": "4 टिकट", "Rs 332 spent": "₹332 खर्च", "one ticket: Rs ?": "एक टिकट: ₹ ?",
    "bill: 7 tickets": "बिल: 7 टिकट", "Rs 861 spent": "₹861 खर्च",
    "notebook Rs 9": "कॉपी ₹9", "Rs 1,467 to spend": "खर्च को ₹1,467", "notebooks: ?": "कॉपियाँ: ?",
    "kite Rs 7": "पतंग ₹7", "Rs 1,582 to spend": "खर्च को ₹1,582", "kites: ?": "पतंगें: ?",
    "18 coins": "18 सिक्के", "Rs 10, 5, 2": "₹10, 5, 2", "same number each": "हर तरह के बराबर", "money: Rs ?": "रकम: ₹ ?",
    "pencil Rs 6": "पेंसिल ₹6", "Rs 1,597 to spend": "खर्च को ₹1,597", "pencils: ?": "पेंसिलें: ?", "left: Rs ?": "बचे: ₹ ?",
    "eraser Rs 4": "रबड़ ₹4", "Rs 150 to spend": "खर्च को ₹150", "erasers: ?": "रबड़: ?",
    "juice pack Rs 12": "जूस पैकेट ₹12", "Rs 500 to spend": "खर्च को ₹500", "packs: ?": "पैकेट: ?",
    /* the corrections' notes (drawn, never spoken): one entry per case */
    "Rs 3,132 pays for 36 boxes, not 1": "₹3,132 में 36 बॉक्स आते हैं, 1 नहीं",
    "Rs 2,325 pays for 25 caps, not 1": "₹2,325 में 25 टोपियाँ आती हैं, 1 नहीं",
    "Rs 27,054 pays for 81 chairs, not 1": "₹27,054 में 81 कुर्सियाँ आती हैं, 1 नहीं",
    "Rs 213 pays for 2 tickets, but 14 were bought": "₹213 में 2 टिकट आते हैं, पर 14 खरीदे गए",
    "Rs 9 buys 1 notebook, so Rs 1,467 buys fewer than 1,467 notebooks": "₹9 में 1 कॉपी, तो ₹1,467 में 1,467 से कम कॉपियाँ",
    "Rs 7 buys 1 kite, so Rs 1,582 buys fewer than 1,582 kites": "₹7 में 1 पतंग, तो ₹1,582 में 1,582 से कम पतंगें",
    "Rs 1 left is less than Rs 6, one pencil's price": "बचे ₹1, एक पेंसिल की कीमत ₹6 से कम हैं",
    "Rs 2 left is less than Rs 4, one eraser's price": "बचे ₹2, एक रबड़ की कीमत ₹4 से कम हैं",
    "Rs 8 left is less than Rs 12, one pack's price": "बचे ₹8, एक पैकेट की कीमत ₹12 से कम हैं",
  },
  gu: {
    "Shop Divider": "દુકાનની વહેંચણી",
    "The cost of one": "એકનો ખર્ચ",
    "The price of one ticket": "એક ટિકિટની કિંમત",
    "How many can be bought": "કેટલી વસ્તુઓ ખરીદી શકાય",
    "Money left over": "વધેલા રૂપિયા",
    "A till of rupees and a shelf of things. What is the question asking for?": "રૂપિયાથી ભરેલો ગલ્લો અને વસ્તુઓથી ભરેલી છાજલી. પ્રશ્ન શું પૂછે છે?",
    "Every cost of one found, every count of things given, and every rupee left kept.": "એકનો દરેક ખર્ચ મળ્યો, દરેક ગણતરી કહી, વધેલો દરેક રૂપિયો સાચવ્યો.",
    "Free play. Fill the till, set a price, buy on the lane, and check with the tray.": "મુક્ત રમત. ગલ્લો ભરો, કિંમત પસંદ કરો, પટ્ટી પર ખરીદો અને ટ્રેથી ચકાસો.",
    /* phase 1 */
    "Tap a row of the till to deal its notes, one to each pile, so every pile gets the same.": "ગલ્લાની કોઈ હાર પર ટૅપ કરો. તેની નોટો દરેક ઢગલામાં એક-એક વહેંચાશે, જેથી બધાને સરખું મળે.",
    "Start at the top. When too few are left to go round, a tap changes them for smaller ones.": "ઉપરથી શરૂ કરો. બધાને ઓછા પડે ત્યારે ટૅપ કરવાથી તે નાના મૂલ્યમાં બદલાય છે.",
    "Each pile keeps hundreds on top, then tens, then ones.": "દરેક ઢગલામાં સૌથી ઉપર શતક, પછી દશક, પછી એકમ.",
    "What does one pile hold?": "એક ઢગલામાં કેટલું છે?",
    "Try a small one: Rs 20 shared by 4 is Rs 5 each. Share this total the same way.": "નાનું વિચારો: 20 રૂપિયા 4 ઢગલામાં વહેંચો. દરેકને 5 રૂપિયા મળે. આ કુલ પણ એમ જ વહેંચો.",
    "When each thing costs the same, the cost of one is the total cost divided by the number of things.": "દરેક વસ્તુનો ખર્ચ સરખો હોય, તો કુલ ખર્ચને વસ્તુઓની સંખ્યાથી ભાગો. એ જ એકનો ખર્ચ છે.",
    "You learned: total cost divided by the things is the cost of one.": "તમે શીખ્યા: કુલ ખર્ચને વસ્તુઓની સંખ્યાથી ભાગો, તો એકનો ખર્ચ મળે.",
    "6 lunch boxes cost Rs 522. What does one lunch box cost?": "6 લંચ બૉક્સનો ખર્ચ 522 રૂપિયા છે. એક લંચ બૉક્સનો ખર્ચ કેટલો?",
    "Cost of one lunch box?": "એક લંચ બૉક્સનો ખર્ચ?",
    "Six boxes share the Rs 522, so one box costs less than the total. Share it, do not multiply.": "522 રૂપિયા છ બૉક્સમાં વહેંચાય છે. એટલે એક બૉક્સ કુલ કરતાં સસ્તું છે. વહેંચો, ગુણાકાર નહીં.",
    "5 caps cost Rs 465. Find the cost of one cap.": "5 ટોપીનો ખર્ચ 465 રૂપિયા છે. એક ટોપીનો ખર્ચ શોધો.",
    "Cost of one cap?": "એક ટોપીનો ખર્ચ?",
    "Deal the Rs 465 into five equal piles. One pile pays for one cap.": "465 રૂપિયા પાંચ સરખા ઢગલામાં વહેંચો. એક ઢગલો એક ટોપીનો ખર્ચ છે.",
    "Now 9 chairs cost Rs 3,006. What is the price of one chair?": "હવે 9 ખુરશીનો ખર્ચ 3,006 રૂપિયા છે. એક ખુરશીની કિંમત કેટલી?",
    "Price of one chair?": "એક ખુરશીની કિંમત?",
    "Rs 3,006 has zeros in it. Keep dealing until the till is empty.": "3,006 રૂપિયામાં શૂન્ય છે. ગલ્લો ખાલી થાય ત્યાં સુધી વહેંચતા રહો.",
    /* phase 2 */
    "Each row of the ticket table shows the tickets bought and the amount spent.": "ટિકિટ કોષ્ટકની દરેક હારમાં ખરીદેલી ટિકિટ અને ખર્ચેલી રકમ છે.",
    "A bill lists the things bought and what they cost. Cost is the price to be paid.": "બિલમાં ખરીદેલી વસ્તુઓ અને તેમના ખર્ચ લખેલા હોય. ખર્ચ એટલે ચૂકવવાની કિંમત.",
    "Tap a row to share its amount among its tickets.": "કોઈ હાર પર ટૅપ કરો અને તેની રકમ તેની ટિકિટોમાં વહેંચો.",
    "Which is more: what one ticket costs, or what all the tickets cost together?": "શું વધારે છે: એક ટિકિટનો ખર્ચ, કે બધી ટિકિટોનો કુલ ખર્ચ?",
    "Try a small row: 2 tickets for Rs 60 cost Rs 30 each. Share this row the same way.": "નાની હાર વિચારો: 60 રૂપિયામાં 2 ટિકિટ. તો દરેક ટિકિટ 30 રૂપિયાની. આ હાર પણ એમ જ વહેંચો.",
    "The price of one ticket is the amount spent divided by the tickets. The total spent adds the amounts spent.": "રકમને ટિકિટોની સંખ્યાથી ભાગો, તો એક ટિકિટની કિંમત મળે. કુલ ખર્ચમાં બધી રકમો ઉમેરાય.",
    "You learned: amount spent divided by tickets is one ticket's price.": "તમે શીખ્યા: ખર્ચને ટિકિટોથી ભાગો, તો એક ટિકિટની કિંમત.",
    "In one row, 6 tickets cost Rs 858. In the other, 8 tickets cost Rs 560. Find each row's price of one ticket, then the total spent.": "એક હારમાં 6 ટિકિટ 858 રૂપિયાની છે. બીજીમાં 8 ટિકિટ 560 રૂપિયાની છે. દરેક હારમાં એક ટિકિટની કિંમત શોધો, પછી કુલ ખર્ચ.",
    "Total spent?": "કુલ ખર્ચ?",
    "Add what every row spent. One ticket from each row is not the total.": "દરેક હારનો ખર્ચ ઉમેરો. દરેક હારમાંથી એક ટિકિટ એ કુલ નથી.",
    "4 tickets cost Rs 332. What is one ticket's price?": "4 ટિકિટ 332 રૂપિયાની છે. એક ટિકિટની કિંમત કેટલી?",
    "Price of one ticket?": "એક ટિકિટની કિંમત?",
    "The Rs 332 paid for all 4 tickets. One ticket is only one share of it.": "332 રૂપિયા ચારેય ટિકિટના છે. એક ટિકિટ તેનો ફક્ત એક ભાગ છે.",
    "A bill shows Rs 861 spent on 7 tickets. What does one ticket cost?": "એક બિલમાં 7 ટિકિટ પર 861 રૂપિયા ખર્ચ લખ્યો છે. એક ટિકિટનો ખર્ચ કેટલો?",
    "Cost of one ticket?": "એક ટિકિટનો ખર્ચ?",
    "Try 7 tickets at your price. Does it make the bill's Rs 861?": "તમારી કિંમતે 7 ટિકિટનો ખર્ચ ગણો. શું એ બિલના 861 રૂપિયા થાય છે?",
    /* phase 3 */
    "Now the price of one thing is known, and the till holds the money.": "હવે એક વસ્તુની કિંમત ખબર છે, અને ગલ્લામાં રૂપિયા છે.",
    "Tap a price tag to pay it out along the lane. The 10 and 100 tags buy many at once.": "કિંમતના ટૅગ પર ટૅપ કરો અને પટ્ટી પર રૂપિયા ચૂકવો. 10 અને 100 વાળા ટૅગ એકસાથે ઘણું ખરીદે છે.",
    "Is the answer a number of rupees, or a number of things?": "જવાબ રૂપિયાની સંખ્યા છે કે વસ્તુઓની?",
    "Try a small one: Rs 20 buys 4 things at Rs 5 each. Now look again at what this one asks.": "નાનું વિચારો: 5 રૂપિયાવાળી 4 વસ્તુઓ 20 રૂપિયામાં આવે. હવે જુઓ આ પ્રશ્ન શું પૂછે છે.",
    "How many things an amount buys is the money divided by the price of one, and the answer counts things.": "રકમને એકની કિંમતથી ભાગો, તો ખબર પડે કેટલી વસ્તુઓ આવે. જવાબ વસ્તુઓ ગણે છે.",
    "You learned: money divided by the price of one gives a count of things.": "તમે શીખ્યા: રકમને એકની કિંમતથી ભાગો, તો વસ્તુઓની ગણતરી મળે.",
    "A notebook costs Rs 9. How many notebooks can Rs 1,467 buy?": "એક નોટબુક 9 રૂપિયાની છે. 1,467 રૂપિયામાં કેટલી નોટબુક આવે?",
    "How many notebooks?": "કેટલી નોટબુક?",
    "Count what the lane buys, one price at a time.": "પટ્ટી જે ખરીદે તે ગણો, દર વખતે એક કિંમત.",
    "Kites are Rs 7 each, and the till holds Rs 1,582. How many kites?": "એક પતંગ 7 રૂપિયાનો છે. ગલ્લામાં 1,582 રૂપિયા છે. કેટલા પતંગ?",
    "How many kites?": "કેટલા પતંગ?",
    "Try your kites at Rs 7 each. Do they cost Rs 1,582?": "તમારા પતંગ 7 રૂપિયાના હિસાબે ગણો. શું કુલ 1,582 રૂપિયા થાય છે?",
    "A box holds 18 coins, the same number each of Rs 10, Rs 5 and Rs 2. How much money is in it?": "એક ડબ્બામાં 18 સિક્કા છે. 10, 5 અને 2 રૂપિયાવાળા સિક્કા સરખી સંખ્યામાં છે. તેમાં કુલ કેટલા રૂપિયા છે?",
    "Money in the box?": "ડબ્બામાં કેટલા રૂપિયા?",
    "Each kind of coin makes one row. Find what each row is worth, then add the rows.": "દરેક જાતના સિક્કાની એક હાર બને. દરેક હારની રકમ શોધો, પછી ઉમેરો.",
    /* phase 4 */
    "This time a little money stays in the till when the lane stops.": "આ વખતે પટ્ટી અટકે ત્યારે ગલ્લામાં થોડા રૂપિયા વધે છે.",
    "Type how many things in the first box, then the rupees left in the second.": "પહેલા ખાનામાં વસ્તુઓની ગણતરી લખો, પછી બીજામાં વધેલા રૂપિયા.",
    "Put the money left beside the price. Which is bigger?": "વધેલા રૂપિયાને કિંમતની બાજુમાં મૂકો. કયું મોટું છે?",
    "Try a small one: Rs 19 at Rs 5 each buys 3, with Rs 4 left. Now this till.": "નાનું વિચારો: 19 રૂપિયામાં 5 રૂપિયાવાળી 3 વસ્તુ આવે. 4 રૂપિયા વધે. હવે આ ગલ્લો.",
    "In a how-many division, the remainder is the money left over, too little to buy one more.": "કેટલી વસ્તુ-વાળા ભાગાકારમાં શેષ એટલે વધેલા રૂપિયા. તે એક વધુ ખરીદવા ઓછા પડે.",
    "You learned: the rupees left when the lane stops are the remainder.": "તમે શીખ્યા: પટ્ટી અટકે ત્યારે વધેલા રૂપિયા જ શેષ છે.",
    "Pencils cost Rs 6 each. How many can Rs 1,597 buy, and how much money is left?": "એક પેન્સિલ 6 રૂપિયાની છે. 1,597 રૂપિયામાં કેટલી પેન્સિલ આવે? અને કેટલા રૂપિયા વધે?",
    "Pencils and money left?": "પેન્સિલ અને વધેલા રૂપિયા?",
    "What the lane could not spend is part of the answer too.": "પટ્ટી જે ખર્ચી ન શકી, તે પણ જવાબનો ભાગ છે.",
    "Erasers are Rs 4 each and the till holds Rs 150. How many erasers, and what is left?": "એક રબર 4 રૂપિયાનું છે. ગલ્લામાં 150 રૂપિયા છે. કેટલાં રબર, અને કેટલું વધ્યું?",
    "Erasers and money left?": "રબર અને વધેલા રૂપિયા?",
    "4 times the erasers, plus the rupees left, must make Rs 150 again.": "રબરના 4 ગણા અને વધેલા રૂપિયા ઉમેરો. ફરી 150 રૂપિયા થવા જોઈએ.",
    "Juice packs cost Rs 12 each. How many packs does Rs 500 pay for, and what stays in the till?": "જ્યૂસનું એક પેકેટ 12 રૂપિયાનું છે. 500 રૂપિયામાં કેટલાં પેકેટ આવે? અને ગલ્લામાં શું વધે?",
    "Packs and money left?": "પેકેટ અને વધેલા રૂપિયા?",
    "Any pack not fully paid for does not count.": "જે પેકેટના પૂરા રૂપિયા ન ચૂકવાયા, તે ગણાય નહીં.",
    /* the answer boxes' names */
    "notebooks": "નોટબુક", "kites": "પતંગ", "pencils": "પેન્સિલ", "erasers": "રબર", "packs": "પેકેટ", "Rs left": "₹ વધ્યા",
    /* words the picture draws */
    "tickets": "ટિકિટ", "spent": "ખર્ચ", "one ticket": "એક ટિકિટ", "total": "કુલ", "left": "વધ્યા", "money left": "વધેલા રૂપિયા",
    "check": "ચકાસો", "empty": "ખાલી", "price": "કિંમત", "things": "વસ્તુઓ",
    "one lunch box": "એક લંચ બૉક્સ", "one cap": "એક ટોપી", "one chair": "એક ખુરશી", "spent in all": "કુલ ખર્ચ", "in the box": "ડબ્બામાં",
    /* the question card */
    "6 lunch boxes": "6 લંચ બૉક્સ", "cost Rs 522": "ખર્ચ ₹522", "one box: Rs ?": "એક બૉક્સ: ₹ ?",
    "5 caps": "5 ટોપી", "cost Rs 465": "ખર્ચ ₹465", "one cap: Rs ?": "એક ટોપી: ₹ ?",
    "9 chairs": "9 ખુરશી", "cost Rs 3,006": "ખર્ચ ₹3,006", "one chair: Rs ?": "એક ખુરશી: ₹ ?",
    "6 for Rs 858": "6 ટિકિટ ₹858", "8 for Rs 560": "8 ટિકિટ ₹560", "total spent: Rs ?": "કુલ ખર્ચ: ₹ ?",
    "4 tickets": "4 ટિકિટ", "Rs 332 spent": "₹332 ખર્ચ", "one ticket: Rs ?": "એક ટિકિટ: ₹ ?",
    "bill: 7 tickets": "બિલ: 7 ટિકિટ", "Rs 861 spent": "₹861 ખર્ચ",
    "notebook Rs 9": "નોટબુક ₹9", "Rs 1,467 to spend": "ખર્ચવા ₹1,467", "notebooks: ?": "નોટબુક: ?",
    "kite Rs 7": "પતંગ ₹7", "Rs 1,582 to spend": "ખર્ચવા ₹1,582", "kites: ?": "પતંગ: ?",
    "18 coins": "18 સિક્કા", "Rs 10, 5, 2": "₹10, 5, 2", "same number each": "દરેક જાત સરખી", "money: Rs ?": "રકમ: ₹ ?",
    "pencil Rs 6": "પેન્સિલ ₹6", "Rs 1,597 to spend": "ખર્ચવા ₹1,597", "pencils: ?": "પેન્સિલ: ?", "left: Rs ?": "વધ્યા: ₹ ?",
    "eraser Rs 4": "રબર ₹4", "Rs 150 to spend": "ખર્ચવા ₹150", "erasers: ?": "રબર: ?",
    "juice pack Rs 12": "જ્યૂસ પેકેટ ₹12", "Rs 500 to spend": "ખર્ચવા ₹500", "packs: ?": "પેકેટ: ?",
    /* the corrections' notes (drawn, never spoken): one entry per case */
    "Rs 3,132 pays for 36 boxes, not 1": "₹3,132માં 36 બૉક્સ આવે, 1 નહીં",
    "Rs 2,325 pays for 25 caps, not 1": "₹2,325માં 25 ટોપી આવે, 1 નહીં",
    "Rs 27,054 pays for 81 chairs, not 1": "₹27,054માં 81 ખુરશી આવે, 1 નહીં",
    "Rs 213 pays for 2 tickets, but 14 were bought": "₹213માં 2 ટિકિટ આવે, પણ 14 ખરીદી હતી",
    "Rs 9 buys 1 notebook, so Rs 1,467 buys fewer than 1,467 notebooks": "₹9માં 1 નોટબુક, તો ₹1,467માં 1,467થી ઓછી નોટબુક",
    "Rs 7 buys 1 kite, so Rs 1,582 buys fewer than 1,582 kites": "₹7માં 1 પતંગ, તો ₹1,582માં 1,582થી ઓછા પતંગ",
    "Rs 1 left is less than Rs 6, one pencil's price": "વધેલા ₹1, એક પેન્સિલની કિંમત ₹6થી ઓછા છે",
    "Rs 2 left is less than Rs 4, one eraser's price": "વધેલા ₹2, એક રબરની કિંમત ₹4થી ઓછા છે",
    "Rs 8 left is less than Rs 12, one pack's price": "વધેલા ₹8, એક પેકેટની કિંમત ₹12થી ઓછા છે",
  },
};

/* One entry per phase = one mount.
   says    the teach run, said before anything is asked (numbers are turned into words for the voice)
   ladder  rungs 2 and 3 of the hint ladder (rung 1 is each item's own miss line); never the answer
   closing one closing line for this phase, said once when it goes idle
   learned the summary page's row for this phase: "You learned: ..." (at most 72 characters)
   traceback what the working area redraws after a miss, in one line (for the sidecar)
   demo?   { ... } when the phase opens on the child's one physical act (see api.demoDone)
   items   the authored fallback: three a phase, the third tests whether the phase landed.
           qid   the plan's question id (<conceptId>:ML<n> or <conceptId>:<q_no>); null for an item you author
           kind  your name for the item type (the Work, judge and oracle switch on it)
           say   the spoken question; ask = the short prompt above the slot (<= 3 lines of ~15 chars)
           answer what the slot or the working area must produce; miss = rung 1, never the answer
           choices? [{ id, label }] for a word answer; pad?: "enter" when it is made on the working area
           parts?  [{ label, unit? }, …] with answer [a, b]: two boxes in the slot (quotient · remainder;
                   label at most 10 characters, e.g. { label: "each bowl", unit: "mL" }); typed reads "16|1".
                   A fraction: parts: SLOT_FRACTION, answer [3, 4] (drawn stacked). A mixed number or a
                   tidied answer: parts: SLOT_MIXED, answer [1, 2, 3] · [5, null, null] · [null, 7, 10]
                   (null = that box stays empty; the slot never says which kind the answer is)
                   A decimal: answer "0.09", a string in its written form (so "0.30" is not "0.3" and ".3"
                   is not "0.3"), with pointKey: true in the tool object below (the pad's point key) */
const PHASES = [
  {
    n: 1,
    concept: "The cost of one",
    conceptId: "M2.S4.T7.C24", objectiveIds: ["O11"],
    says: ["Tap a row of the till to deal its notes, one to each pile, so every pile gets the same.", "Start at the top. When too few are left to go round, a tap changes them for smaller ones.", "Each pile keeps hundreds on top, then tens, then ones."],
    /* tries, as the plan writes it: first rung the item's own miss; second, what does one pile hold?; third, a
       small case (the plan's cut-down mat of twenty rupees among four) said aloud, not dealt (see the report) */
    ladder: ["What does one pile hold?", "Try a small one: Rs 20 shared by 4 is Rs 5 each. Share this total the same way."],
    closing: "When each thing costs the same, the cost of one is the total cost divided by the number of things.",
    /* the summary page's row: "You learned: ..." in at most 72 characters */
    learned: "You learned: total cost divided by the things is the cost of one.",
    /* the traceback for a miss, in one line (it goes into the sidecar) */
    traceback: "The mat deals the till onto the piles to the end, one pile is lit with its amount, and the frame writes the division down to the cost of one.",
    items: [
      /* learn ML1: answer in the plan = Rs 87 */
      { qid: "M2.S4.T7.C24:ML1", kind: "share", things: 6, total: 522, short: "boxes", unit: "rupees", thumb: "one lunch box", near: 3132, winMs: 2800,
        card: [["6 lunch boxes", "n"], ["cost Rs 522", "m"], ["one box: Rs ?", "q"]],
        say: "6 lunch boxes cost Rs 522. What does one lunch box cost?", ask: "Cost of one lunch box?", answer: 87,
        miss: "Six boxes share the Rs 522, so one box costs less than the total. Share it, do not multiply." },
      /* practice 1: answer in the plan = Rs 93, because 465 divided by 5 is 93 */
      { qid: "M2.S4.T7.C24:1", kind: "share", things: 5, total: 465, short: "caps", unit: "rupees", thumb: "one cap", near: 2325, winMs: 2800,
        card: [["5 caps", "n"], ["cost Rs 465", "m"], ["one cap: Rs ?", "q"]],
        say: "5 caps cost Rs 465. Find the cost of one cap.", ask: "Cost of one cap?", answer: 93,
        miss: "Deal the Rs 465 into five equal piles. One pile pays for one cap." },
      /* practice 2: answer in the plan = Rs 334, because 3006 divided by 9 is 334 */
      { qid: "M2.S4.T7.C24:2", kind: "share", things: 9, total: 3006, short: "chairs", unit: "rupees", thumb: "one chair", near: 27054, winMs: 2800,
        card: [["9 chairs", "n"], ["cost Rs 3,006", "m"], ["one chair: Rs ?", "q"]],
        say: "Now 9 chairs cost Rs 3,006. What is the price of one chair?", ask: "Price of one chair?", answer: 334,
        miss: "Rs 3,006 has zeros in it. Keep dealing until the till is empty." },
    ],
  },
  {
    n: 2,
    concept: "The price of one ticket",
    conceptId: "M2.S4.T7.C25", objectiveIds: ["O11"],
    says: ["Each row of the ticket table shows the tickets bought and the amount spent.", "A bill lists the things bought and what they cost. Cost is the price to be paid.", "Tap a row to share its amount among its tickets."],
    /* tries: first rung the item's own miss; second, is your number a row's amount or one ticket's price?;
       third, the plan's cut-down row of two tickets for sixty rupees, said aloud */
    ladder: ["Which is more: what one ticket costs, or what all the tickets cost together?","Try a small row: 2 tickets for Rs 60 cost Rs 30 each. Share this row the same way."],
    closing: "The price of one ticket is the amount spent divided by the tickets. The total spent adds the amounts spent.",
    /* the summary page's row: "You learned: ..." in at most 72 characters */
    learned: "You learned: amount spent divided by tickets is one ticket's price.",
    /* the traceback for a miss, in one line (it goes into the sidecar) */
    traceback: "The row opens on the mat and its amount is dealt to one pile a ticket; the price settles in its row, and the total line adds the amounts spent.",
    items: [
      /* learn ML2: answer in the plan = Rs 143 and Rs 70 for one ticket, and Rs 1418 spent in all.
         The slot takes the total spent; each row's price is found on the mat and settles in the table. */
      { qid: "M2.S4.T7.C25:ML2", kind: "tickets", target: "total", rows: [{ n: 6, spent: 858 }, { n: 8, spent: 560 }], unit: "rupees", thumb: "spent in all", near: 213, winMs: 2800,
        card: [["6 for Rs 858", "m"], ["8 for Rs 560", "m"], ["total spent: Rs ?", "q"]],
        say: "In one row, 6 tickets cost Rs 858. In the other, 8 tickets cost Rs 560. Find each row's price of one ticket, then the total spent.",
        ask: "Total spent?", answer: 1418,
        miss: "Add what every row spent. One ticket from each row is not the total." },
      /* practice 3: answer in the plan = Rs 83, because 332 divided by 4 is 83 */
      { qid: "M2.S4.T7.C25:3", kind: "tickets", target: "price", rows: [{ n: 4, spent: 332 }], unit: "rupees", thumb: "one ticket", near: 332, winMs: 2800,
        card: [["4 tickets", "n"], ["Rs 332 spent", "m"], ["one ticket: Rs ?", "q"]],
        say: "4 tickets cost Rs 332. What is one ticket's price?", ask: "Price of one ticket?", answer: 83,
        miss: "The Rs 332 paid for all 4 tickets. One ticket is only one share of it." },
      /* practice 4: answer in the plan = Rs 123. The bill lists the things bought and their prices, and cost is the price to be paid, here for one ticket */
      { qid: "M2.S4.T7.C25:4", kind: "tickets", target: "price", rows: [{ n: 7, spent: 861 }], unit: "rupees", thumb: "one ticket", near: 861, winMs: 2800,
        card: [["bill: 7 tickets", "n"], ["Rs 861 spent", "m"], ["one ticket: Rs ?", "q"]],
        say: "A bill shows Rs 861 spent on 7 tickets. What does one ticket cost?", ask: "Cost of one ticket?", answer: 123,
        miss: "Try 7 tickets at your price. Does it make the bill's Rs 861?" },
    ],
  },
  {
    n: 3,
    concept: "How many can be bought",
    conceptId: "M2.S4.T7.C26", objectiveIds: ["O12"],
    says: ["Now the price of one thing is known, and the till holds the money.", "Tap a price tag to pay it out along the lane. The 10 and 100 tags buy many at once."],
    /* tries: first rung the item's own miss; second, rupees or things?; third, the plan's cut-down till of
       twenty rupees at a price of five, said aloud */
    ladder: ["Is the answer a number of rupees, or a number of things?", "Try a small one: Rs 20 buys 4 things at Rs 5 each. Now look again at what this one asks."],
    closing: "How many things an amount buys is the money divided by the price of one, and the answer counts things.",
    /* the summary page's row: "You learned: ..." in at most 72 characters */
    learned: "You learned: money divided by the price of one gives a count of things.",
    /* the traceback for a miss, in one line (it goes into the sidecar) */
    traceback: "The lane pays the price out, a hundred, then ten, then one at a time, the things stand in rows of ten, and the frame writes the count.",
    items: [
      /* learn ML3: answer in the plan = 163 notebooks */
      { qid: "M2.S4.T7.C26:ML3", kind: "buy", price: 9, money: 1467, noun: "notebooks", one: "notebook", unit: "things", near: "13203", winMs: 2800,
        parts: [{ label: "notebooks" }],
        card: [["notebook Rs 9", "m"], ["Rs 1,467 to spend", "m"], ["notebooks: ?", "q"]],
        say: "A notebook costs Rs 9. How many notebooks can Rs 1,467 buy?", ask: "How many notebooks?", answer: [163],
        miss: "Count what the lane buys, one price at a time." },
      /* practice 5: answer in the plan = 226 kites, because 1582 divided by 7 is 226. The answer is a number of kites, not rupees */
      { qid: "M2.S4.T7.C26:5", kind: "buy", price: 7, money: 1582, noun: "kites", one: "kite", unit: "things", near: "11074", winMs: 2800,
        parts: [{ label: "kites" }],
        card: [["kite Rs 7", "m"], ["Rs 1,582 to spend", "m"], ["kites: ?", "q"]],
        say: "Kites are Rs 7 each, and the till holds Rs 1,582. How many kites?", ask: "How many kites?", answer: [226],
        miss: "Try your kites at Rs 7 each. Do they cost Rs 1,582?" },
      /* practice 7: answer in the plan = Rs 102. There are 6 coins of each kind, so Rs 60, Rs 30 and Rs 12 */
      { qid: "M2.S4.T7.C26:7", kind: "coins", coins: 18, kinds: [10, 5, 2], unit: "rupees", thumb: "in the box", near: 6, winMs: 2800,
        card: [["18 coins", "n"], ["Rs 10, 5, 2", "m"], ["same number each", "i"], ["money: Rs ?", "q"]],
        say: "A box holds 18 coins, the same number each of Rs 10, Rs 5 and Rs 2. How much money is in it?", ask: "Money in the box?", answer: 102,
        miss: "Each kind of coin makes one row. Find what each row is worth, then add the rows." },
    ],
  },
  {
    n: 4,
    concept: "Money left over",
    conceptId: "M2.S4.T7.C27", objectiveIds: ["O12"],
    says: ["This time a little money stays in the till when the lane stops.", "Type how many things in the first box, then the rupees left in the second."],
    /* tries: first rung the item's own miss; second, the money left beside the price; third, a cut-down till
       said aloud (nineteen rupees at five: 3 and 4 left, two different numbers so the boxes stay apart; the
       plan's seventeen gives a remainder of 2, item 2's) */
    ladder: ["Put the money left beside the price. Which is bigger?", "Try a small one: Rs 19 at Rs 5 each buys 3, with Rs 4 left. Now this till."],
    closing: "In a how-many division, the remainder is the money left over, too little to buy one more.",
    /* the summary page's row: "You learned: ..." in at most 72 characters */
    learned: "You learned: the rupees left when the lane stops are the remainder.",
    /* the traceback for a miss, in one line (it goes into the sidecar) */
    traceback: "The lane pays out until it stops, what is left drops into the money left tray, the frame writes the count and the remainder, and the check multiplies back.",
    items: [
      /* learn ML4: answer in the plan = 266 pencils, with Rs 1 left */
      { qid: "M2.S4.T7.C27:ML4", kind: "left", price: 6, money: 1597, noun: "pencils", one: "pencil", near: "266|0", winMs: 2800,
        parts: [{ label: "pencils" }, { label: "Rs left" }],
        card: [["pencil Rs 6", "m"], ["Rs 1,597 to spend", "m"], ["pencils: ?", "q"], ["left: Rs ?", "q"]],
        say: "Pencils cost Rs 6 each. How many can Rs 1,597 buy, and how much money is left?", ask: "Pencils and money left?", answer: [266, 1],
        miss: "What the lane could not spend is part of the answer too." },
      /* practice 6: answer in the plan = 37 erasers, with Rs 2 left, because 4 times 37 is 148 */
      { qid: "M2.S4.T7.C27:6", kind: "left", price: 4, money: 150, noun: "erasers", one: "eraser", near: "37|0", winMs: 2800,
        parts: [{ label: "erasers" }, { label: "Rs left" }],
        card: [["eraser Rs 4", "m"], ["Rs 150 to spend", "m"], ["erasers: ?", "q"], ["left: Rs ?", "q"]],
        say: "Erasers are Rs 4 each and the till holds Rs 150. How many erasers, and what is left?", ask: "Erasers and money left?", answer: [37, 2],
        miss: "4 times the erasers, plus the rupees left, must make Rs 150 again." },
      /* practice 8: answer in the plan = 41 packs, with Rs 8 left, because 12 times 41 is 492 */
      { qid: "M2.S4.T7.C27:8", kind: "left", price: 12, money: 500, noun: "packs", one: "pack", near: "42|0", winMs: 2800,
        parts: [{ label: "packs" }, { label: "Rs left" }],
        card: [["juice pack Rs 12", "m"], ["Rs 500 to spend", "m"], ["packs: ?", "q"], ["left: Rs ?", "q"]],
        say: "Juice packs cost Rs 12 each. How many packs does Rs 500 pay for, and what stays in the till?", ask: "Packs and money left?", answer: [41, 8],
        miss: "Any pack not fully paid for does not count." },
    ],
  },
];

/* The numbers, rows, sizes and targets the working area needs (they go into the sidecar too). */
const MODEL = {
  money: "whole rupees only: Rs 100 notes, Rs 10 notes and Rs 1 coins (no paise anywhere)",
  till: { x: 0, y: 86, w: 280, h: 348, rows: ["Rs 100", "Rs 10", "Rs 1"] },
  mat: { x: 296, y: 86, w: 504, h: 348, piles: "one a thing, a ten-frame of notes a row" },
  table: { x: 296, y: 96, w: 504, columns: ["tickets", "spent", "one ticket"], total: "under spent only" },
  lane: { tags: [1, 10, 100], shelf: "rows of ten, ten rows a square" },
  frame: { x: 816, y: 86, w: 270, h: 310, layout: "long division, quotient on top" },
  tray: { x: 816, y: 404, w: 270, h: 122 },
  units: { rupees: "Rs before the number", things: "a box named for the things", left: "pencils | Rs left" },
};

/* ── the shop's own drawing and arithmetic (module level; called, never mounted) ─────────────── */
const SD_SKY = "#56B4E9";
const SD_NOTE = "#D3E6F5", SD_NOTE_EDGE = "#2F6F9F";
const SD_STEEL = "#C9CFD6", SD_STEEL_EDGE = "#6B7580", SD_BAND = "#6E5E48";
/* rupees deep blue, a count of things sky blue, money left reddish purple: the deeper ink for words */
const SD_INK: any = { money: shade(CONTENT.hundred, 0.25), count: shade(SD_SKY, 0.45), left: shade(CONTENT.bead, 0.35) };
const SD_KINDS = ["h", "t", "o"];
const SD_FACE: any = { h: "Rs 100", t: "Rs 10", o: "Rs 1" };
const SD_ROW_Y = [80, 194, 308];
const SD_ROW_H = 108;
/* the till and the mat stand from y 74 to 424; the readings under them sit at y 462 and 496 */
const SD_TOP = 74, SD_BOT = 424;
/* the coin box of practice 7: six each of Rs 10, Rs 5 and Rs 2, mixed */
const SD_BOX = [10, 5, 2, 5, 10, 2, 2, 10, 5, 10, 2, 5, 5, 2, 10, 2, 5, 10];
/* the unit the slot shows for the question on screen (set by Work as it draws; the slot draws after it) */
const SD_NOW: any = { unit: null };
const sdRs = (a: number) => "Rs " + indian(a);
/* drawn money in the language on screen: English writes "Rs 87"; Hindi and Gujarati write the rupee sign "₹87",
   the same in both, so no language-specific abbreviation can go wrong (the spoken lines say रुपये / રૂપિયા) */
const sdSign = (lang: string) => (lang && lang !== "en" ? "₹" : "Rs");
const sdRsL = (a: number, lang: string) => (lang && lang !== "en" ? "₹" : "Rs ") + indian(a);
const sdSplit = (a: number) => ({ h: Math.floor(a / 100), t: Math.floor((a % 100) / 10), o: a % 10 });
const sdSum = (m: any) => m.h * 100 + m.t * 10 + m.o;

/* the book's long division, one step per quotient digit: the part divided, the digit, what it takes, what is left */
function sdSteps(dividend: number, divisor: number) {
  const ds = String(dividend).split("").map(Number), L = ds.length;
  let i = 0, part = ds[0];
  while (part < divisor && i < L - 1) { i++; part = part * 10 + ds[i]; }
  const out: any[] = [];
  for (;;) {
    const q = Math.floor(part / divisor), prod = q * divisor, rem = part - prod;
    out.push({ end: i, part, q, prod, rem });
    if (i >= L - 1) break;
    i++; part = rem * 10 + ds[i];
  }
  return out;
}

/* dealing a till onto n piles: a round while every pile can have a note, else change what is left for smaller ones */
function sdDealPlan(till: any, n: number) {
  const t = { ...till }, ops: any[] = [];
  if (!n) return ops;
  SD_KINDS.forEach((k, j) => {
    while (t[k] >= n) { ops.push({ op: "round", k }); t[k] -= n; }
    if (t[k] > 0 && j < 2) { ops.push({ op: "change", k }); t[SD_KINDS[j + 1]] += 10 * t[k]; t[k] = 0; }
  });
  return ops;
}
/* a row may be changed for the next smaller one only when too few are left to go round AND every row above
   it is empty: the notes above are dealt or changed first, so no pile ever gets ten of a kind and the till
   never holds more than it can show (the order the book's division takes; there is never a dead end) */
function sdCanChange(till: any, k: string, n: number) {
  const j = SD_KINDS.indexOf(k);
  return j < 2 && till[k] > 0 && till[k] < n && SD_KINDS.slice(0, j).every((q) => till[q] === 0);
}
function sdApply(s: any, o: any) {
  const j = SD_KINDS.indexOf(o.k);
  if (o.op === "round") {
    if (s.till[o.k] < s.piles) return s;
    return { ...s, flash: null, till: { ...s.till, [o.k]: s.till[o.k] - s.piles }, pile: { ...s.pile, [o.k]: s.pile[o.k] + 1 } };
  }
  const nk = SD_KINDS[j + 1];
  if (!nk || !s.till[o.k]) return s;
  return { ...s, flash: nk, till: { ...s.till, [o.k]: 0, [nk]: s.till[nk] + 10 * s.till[o.k] } };
}
/* paying a price out of a till: 100 at a time while it can, then 10, then 1 */
function sdPayPlan(a: number, price: number) {
  const ops: number[] = [];
  for (const m of [100, 10, 1]) while (a >= m * price) { ops.push(m); a -= m * price; }
  return ops;
}

function sdInit(key: string, item: any, cfg: any) {
  const z = { h: 0, t: 0, o: 0 };
  const b: any = { key, acted: false, till: z, pile: z, piles: 0, open: null, fr: 0, priced: [], amt: 0, bought: 0, tray: 0,
    trayed: false, sorted: 0, fk: 0, lit: false, chip: null, cl: false, flash: null, ck: null, fa: 0, fp: 1, fadd: false, hintRow: null };
  if (key === "free") return { ...b, fa: cfg.a, fp: cfg.p, amt: cfg.a };
  if (!item) return b;
  if (item.kind === "share") return { ...b, till: sdSplit(item.total), piles: item.things };
  if (item.kind === "tickets") return { ...b, priced: item.rows.map(() => false) };
  if (item.kind === "buy" || item.kind === "left") return { ...b, amt: item.money };
  return b;
}

/* loose notes or coins in a grid (a ten-frame: 2 by 5 standing, or 5 by 2 lying): cols across, px x py apart */
function sdGrid(x: number, y: number, count: number, coin: boolean, cols: number, px: number, py: number, pw: number, ph: number, kk: string) {
  const out: any[] = [];
  for (let i = 0; i < count; i++) {
    const c = i % cols, r = Math.floor(i / cols), x0 = x + c * px, y0 = y + r * py;
    out.push(coin
      ? <circle key={kk + i} cx={x0 + pw / 2} cy={y0 + ph / 2} r={Math.min(pw, ph) / 2} fill={SD_STEEL} stroke={SD_STEEL_EDGE} strokeWidth={1.5} />
      : <rect key={kk + i} x={x0} y={y0} width={pw} height={ph} rx={2} fill={SD_NOTE} stroke={SD_NOTE_EDGE} strokeWidth={1.5} />);
  }
  return out;
}

/* one row of the till: each ten as a banded bundle of notes (or a roll of coins) on top, the rest in a
   ten-frame lying five by two under them; big enough to count from the back of the room */
function sdTillRow(x: number, y: number, count: number, coin: boolean) {
  const b = Math.floor(count / 10), l = count % 10, out: any[] = [];
  /* bundles close up rather than leave the row (the tap rules keep a till row within 5 bundles in every item) */
  const bp = b > 5 ? 148 / (b - 1) : 37;
  for (let i = 0; i < b; i++) {
    const bx = x + i * bp, by = y + 5;
    out.push(coin ? (
      <g key={"b" + i}>
        <rect x={bx} y={by} width={34} height={44} rx={9} fill={SD_STEEL} stroke={SD_STEEL_EDGE} strokeWidth={1.5} />
        {[1, 2, 3, 4].map((r) => <line key={r} x1={bx + 4} y1={by + r * 8.8} x2={bx + 30} y2={by + r * 8.8} stroke={SD_STEEL_EDGE} strokeWidth={1} />)}
      </g>
    ) : (
      <g key={"b" + i}>
        <rect x={bx} y={by} width={34} height={44} rx={3} fill={SD_NOTE} stroke={SD_NOTE_EDGE} strokeWidth={1.5} />
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((r) => <line key={r} x1={bx + 2} y1={by + r * 4.4} x2={bx + 32} y2={by + r * 4.4} stroke={SD_NOTE_EDGE} strokeWidth={0.8} />)}
        <rect x={bx + 13} y={by - 1} width={8} height={46} fill={SD_BAND} />
      </g>
    ));
  }
  /* bundles and two lines of loose ones: the lower line ends 5 above the row's edge */
  out.push(...sdGrid(x, y + (b ? 54 : 30), l, coin, 5, 37, 27, 34, 22, "l"));
  return out;
}

/* things bought: rows of ten (a gap after the fifth), ten rows to a square, squares left to right */
function sdThings(b: number, x0: number, y0: number, w: number) {
  const Q = Math.max(1, Math.ceil(b / 100)), gap = 14;
  const p = Math.min(15, Math.floor((w - (Q - 1) * gap - 3 * Q + 2) / (10 * Q))), s = p - 2, side = 10 * p + 1;
  const out: any[] = [];
  for (let i = 0; i < b; i++) {
    const q = Math.floor(i / 100), r = Math.floor((i % 100) / 10), c = i % 10;
    out.push(<rect key={i} x={x0 + q * (side + gap) + c * p + (c >= 5 ? 3 : 0)} y={y0 + r * (p + 3)} width={s} height={s} rx={2}
      fill={SD_SKY} stroke={shade(SD_SKY, 0.3)} strokeWidth={1} />);
  }
  return out;
}
/* how tall sdThings stands for a count (the shelf sits under it) */
const sdThingsH = (b: number, w: number) => {
  const Q = Math.max(1, Math.ceil(b / 100)), p = Math.min(15, Math.floor((w - (Q - 1) * 14 - 3 * Q + 2) / (10 * Q)));
  return 10 * (p + 3) - 5;
};

/* the total spent added in columns, as the book adds money: the amounts spent, a rule, the sum (when lit) */
function sdAddFrame(C: any, rows: any[], lit: boolean, sign: string = "Rs") {
  const x0 = 816, y0 = 80, dw = 26, sum = rows.reduce((a: number, r: any) => a + r.spent, 0);
  const L = Math.max(String(sum).length, ...rows.map((r: any) => String(r.spent).length));
  const col = (i: number) => x0 + 120 + dw * i + dw / 2;
  const digits = (str: string, y: number, fill: string, kk: string) => str.split("").map((ch, i) => (
    <text key={kk + i} x={col(L - str.length + i)} y={y} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={fill}>{ch}</text>));
  const yOf = (k: number) => y0 + 90 + k * 40, yS = yOf(rows.length - 1) + 54;
  return (
    <g pointerEvents="none">
      <rect x={x0} y={y0} width={270} height={310} rx={RAD.panel} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} />
      <text x={col(L - 1) + dw / 2} y={y0 + 46} textAnchor="end" fontSize={T.micro} fontWeight={600} fill={C.ink}>{sign}</text>
      {rows.map((r: any, k: number) => (
        <g key={k}>
          {k > 0 && <text x={col(0) - 34} y={yOf(k)} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={C.ink}>+</text>}
          {digits(String(r.spent), yOf(k), SD_INK.money, "r" + k)}
        </g>
      ))}
      <line x1={col(0) - 50} y1={yOf(rows.length - 1) + 14} x2={col(L - 1) + dw / 2 + 4} y2={yOf(rows.length - 1) + 14} stroke={C.ink} strokeWidth={3} />
      {lit && digits(String(sum), yS, SD_INK.money, "s")}
      {lit && sum >= 1000 && <path d={`M ${col(L - 4) + dw / 2} ${yS - 3} q 1 6 -4 11`} fill="none" stroke={SD_INK.money} strokeWidth={3.2} strokeLinecap="round" />}
    </g>
  );
}

/* the one invite, around a whole piece (the runtime's pulse on a rounded box, so no numeral is crossed) */
function sdPulse(C: any, x: number, y: number, w: number, h: number) {
  return <rect className="c4-pulse" x={x} y={y} width={w} height={h} rx={16} fill="none" stroke={C.accent} strokeWidth={5} pointerEvents="none" />;
}

/* the division frame: divisor, bracket, dividend (Indian comma as a mark between digit cells), the quotient
   on top, and each step's product and what is brought down, one step at a time */
function sdFrame(C: any, a: number, d: number, shown: number, qInk: string, rInk: string, y0: number = 80) {
  const x0 = 816, dw = 26, ds = String(a), L = ds.length, st = sdSteps(a, d);
  const bx = x0 + 88, yDiv = y0 + 84;
  const col = (i: number) => bx + 8 + dw * i + dw / 2;
  const row = (r: number) => yDiv + 36 * r;
  const digits = (str: string, end: number, y: number, fill: string, kk: string) => str.split("").map((ch, i) => (
    <text key={kk + i} x={col(end - str.length + 1 + i)} y={y} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={fill}>{ch}</text>));
  return (
    <g pointerEvents="none">
      <rect x={x0} y={y0} width={270} height={310} rx={RAD.panel} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} />
      <text x={bx - 8} y={yDiv} textAnchor="end" fontSize={T.label} fontWeight={700} fill={C.ink}>{d}</text>
      <path d={`M ${bx} ${yDiv - 30} Q ${bx + 12} ${yDiv - 10} ${bx} ${yDiv + 10}`} fill="none" stroke={C.ink} strokeWidth={3} strokeLinecap="round" />
      <line x1={bx} y1={yDiv - 30} x2={col(L - 1) + dw / 2 + 4} y2={yDiv - 30} stroke={C.ink} strokeWidth={3} strokeLinecap="round" />
      {digits(ds, L - 1, yDiv, C.ink, "a")}
      {L >= 4 && <path d={`M ${col(L - 4) + dw / 2} ${yDiv - 3} q 1 6 -4 11`} fill="none" stroke={C.ink} strokeWidth={3.2} strokeLinecap="round" />}
      {st.map((s: any, k: number) => {
        if (k >= shown) return null;
        const ps = String(s.prod), first = s.end - ps.length + 1;
        return (
          <g key={k}>
            <text x={col(s.end)} y={yDiv - 40} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={qInk}>{s.q}</text>
            {digits(ps, s.end, row(2 * k + 1), C.ink, "p" + k)}
            <text x={col(first) - 22} y={row(2 * k + 1)} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={C.ink}>−</text>
            <line x1={col(first) - dw / 2 - 16} y1={row(2 * k + 1) + 9} x2={col(s.end) + dw / 2} y2={row(2 * k + 1) + 9} stroke={C.ink} strokeWidth={2} />
            {k < st.length - 1
              ? digits(String(st[k + 1].part), s.end + 1, row(2 * k + 2), C.ink, "n" + k)
              : digits(String(s.rem), s.end, row(2 * k + 2), s.rem ? rInk : C.ink, "r")}
          </g>
        );
      })}
    </g>
  );
}

/* the slot carries the unit its question asks for: rupees are written Rs 87 (a count of things has its own
   named box, `parts`, so it never reads as money) */
const sdFormat = (v: any, j: any, o?: any) => {
  const s = String(v === undefined || v === null ? "" : v);
  const shown = /^[1-9]\d{3,}$/.test(s) ? indian(Number(s)) : s;
  if ((j !== undefined && j !== null) || SD_NOW.unit !== "rupees") return shown;
  return o && o.lang && o.lang !== "en" ? "₹" + shown : "Rs " + shown;
};

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* judge: is this value right for this item? (numbers compare as numbers) */
const judge = (item: any, v: any) => {
  if (item.parts) return judgeSlotParts(item, v);
  if (typeof item.answer === "number") return leadNumber(v) === item.answer;
  return String(v).trim().toLowerCase() === String(item.answer).trim().toLowerCase();
};
/* oracle: every answer re-derived by multiplying back (a second route that shares no code with judge or Work) */
const oracle = () => PHASES.every((p: any) => p.items.every((it: any) => {
  const a = Array.isArray(it.answer) ? it.answer : [it.answer];
  if (it.kind === "share") return a[0] * it.things === it.total;
  if (it.kind === "tickets" && it.target === "total")
    return it.rows.every((r: any) => r.spent % r.n === 0) && it.rows.reduce((s: number, r: any) => s + r.spent, 0) === a[0];
  if (it.kind === "tickets") return a[0] * it.rows[0].n === it.rows[0].spent;
  if (it.kind === "buy") return a[0] * it.price === it.money;
  if (it.kind === "coins") return it.kinds.reduce((s: number, k: number) => s + (it.coins / it.kinds.length) * k, 0) === a[0];
  if (it.kind === "left") return a[0] * it.price + a[1] === it.money && a[1] >= 0 && a[1] < it.price;
  return false;
}));
/* the item's own misconception (multiplying, the amount spent as the price, one ticket from each row, dropping
   or spending the money left); judge must reject it */
const nearMiss = (item: any) => item.near;
/* the forms of an answer that no question, hint or ladder line may print */
const answerForms = (item: any) => (item.parts ? item.answer.filter((x: number) => x >= 10).flatMap((x: number) => [String(x), indian(x), words(x)])
  : typeof item.answer === "number" ? [String(item.answer), indian(item.answer), words(item.answer)]
  : /^\d*\.\d+$/.test(String(item.answer)) ? [String(item.answer), speakable(item.answer)] : [String(item.answer)]);
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => item.answer;

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => (T.state().stage === "demo" ? HOOK.demo && HOOK.demo() : T.submit(item.answer));
/* the agent's answer() for an item made on the working area: set it as a child would; undefined = type it */
const answer = (item: any, v: any) => (item.pad === "enter" && HOOK.set ? HOOK.set(v) : undefined);
/* the agent's check() before Enter: e.g. drop a token that waits; undefined = press Enter */
const check = () => (HOOK.check ? HOOK.check() : undefined);

/* ── the working area: 1086 x 528, origin at its top-left ────────────────────────────────────
   Countable things use CONTENT colours (url(#gHundred|gTen|gOne|gBead|gPointer)); coloured numerals
   and words use a deeper ink, shade(colour, 0.25), so they read at 4.5:1. Type uses T.* only.
   Pieces: drag = useDrag(onDrop) then {...control(id, label), ...drag.bind(pay), ...drag.keys(pay)};
   taps = <Hit id x y w h onPress label />. One <Invite/> marks the one thing to touch.
   Nothing is written here that the voice already says. `wrong` = { value, tries } after a miss:
   lock, redraw the mathematics in steps (the traceback), unlock; never mark it, never reset it.
   stage === "free" is Free play (the plan's writeup.freePlay): no target, every control unlocked. */
function Work({ phase, n, item, index, stage, wrong, typed, api, MODEL, lang = "en", tx = (v: any) => v }: any) {
  /* every English word the picture draws goes through tx("...") (its key is added to TR); a number in words
     is wordsIn(n, lang) */
  const C = api.C;
  const tl = useTimeline();
  const free = stage === "free";
  /* one state a question (and one for Free play); a new question starts from its own furnished shop */
  const key = free ? "free" : n + ":" + index;
  const it: any = free ? null : item;
  const kind = free ? "free" : (it && it.kind) || "";
  const cfg = useRef({ a: 125, p: 6 });
  const itemOf = (k0: string) => {
    if (k0 === "free") return null;
    const [a, b] = k0.split(":").map(Number);
    return PHASES[a - 1] ? PHASES[a - 1].items[b] : null;
  };
  const [raw, setRaw] = useState<any>(null);
  const S = raw && raw.key === key ? raw : sdInit(key, it, cfg.current);
  const mod = (k0: string, f: (s: any) => any) => setRaw((r: any) => f(r && r.key === k0 ? r : sdInit(k0, itemOf(k0), cfg.current)));
  const busy = tl.busy || !!S.ck;
  const canAct = !busy && (stage === "ask" || stage === "teach" || free);
  const lockRef = useRef(false);
  const hintTimer = useRef<any>(null);
  const laneKind = kind === "buy" || kind === "left" || free;
  const priceNow = free ? S.fp : it && it.price ? it.price : 0;
  /* money as drawn in the language on screen ("Rs 87" / "₹87"); the chips keep their English text as TR keys */
  const rs = (a: number) => sdRsL(a, lang);

  /* Enter and choice taps go here first while the working area owns the answer */
  api.onEnter(null);
  SD_NOW.unit = !free && it && !it.parts && it.unit === "rupees" ? "rupees" : null;

  /* a new question (or a phase jump) stops any motion and gives the pad back */
  useEffect(() => () => {
    tl.stop();
    if (hintTimer.current) { clearTimeout(hintTimer.current); hintTimer.current = null; }
    if (lockRef.current) { lockRef.current = false; api.lock(false); }
  }, [key]);

  /* the maths finished to the end: the child's own work is completed from where it stands, then read out.
     how = "win" (fast, after a right answer) or "wrong" (the traceback, at walking pace) */
  const plan = (how: string, v: any) => {
    const k0 = key, win = how === "win", pace = win ? 70 : 190, slow = win ? 200 : 460;
    const out: any[] = [];
    const put = (f: any, tick?: boolean) => () => { mod(k0, f); if (tick) api.sfx.tick(); };
    out.push([win ? 40 : 320, put((s: any) => ({ ...s, fk: 0, lit: false, cl: false, ck: null, flash: null, chip: null, fadd: false }))]);
    if (kind === "share") {
      /* the multiplying error, set beside the till for what it is: the cost of many, not of one */
      if (!win && leadNumber(String(v)) === it.total * it.things)
        out.push([420, put((s: any) => ({ ...s, chip: [sdRs(it.total * it.things) + " pays for " + it.things * it.things + " " + it.short + ", not 1"] }))]);
      sdDealPlan(S.till, S.piles).forEach((o: any) => out.push([pace, put((s: any) => sdApply(s, o), true)]));
      out.push([slow, put((s: any) => ({ ...s, lit: true }))]);
      sdSteps(it.total, it.things).forEach((_: any, j: number) => out.push([slow, put((s: any) => ({ ...s, fk: j + 1 }))]));
    } else if (kind === "tickets" && it.target === "total") {
      const rows = it.rows, last = rows.length - 1, sumP = rows.reduce((a: number, r: any) => a + r.spent / r.n, 0);
      const sumN = rows.reduce((a: number, r: any) => a + r.n, 0);
      /* one ticket from each row: two tickets priced, where every row's tickets were bought */
      if (!win && leadNumber(String(v)) === sumP)
        out.push([420, put((s: any) => ({ ...s, chip: [sdRs(sumP) + " pays for " + rows.length + " tickets, but " + sumN + " were bought"] }))]);
      out.push([pace, put((s: any) => ({ ...s, open: null }))]);
      rows.forEach((_: any, j: number) => {
        if (!S.priced[j]) out.push([slow, put((s: any) => ({ ...s, fr: j, priced: s.priced.map((x: boolean, i: number) => x || i === j) }), true)]);
      });
      /* the frame turns to the sum the question asks for: the amounts spent, added in columns */
      out.push([slow, put((s: any) => ({ ...s, fr: last, fadd: true }))]);
      out.push([slow, put((s: any) => ({ ...s, lit: true }))]);
    } else if (kind === "tickets") {
      const r = it.rows[0], till0 = S.open === 0 ? S.till : sdSplit(r.spent);
      if (S.open !== 0) out.push([slow, put((s: any) => ({ ...s, open: 0, fr: 0, till: sdSplit(r.spent), pile: { h: 0, t: 0, o: 0 }, piles: r.n }))]);
      sdDealPlan(till0, r.n).forEach((o: any) => out.push([pace, put((s: any) => sdApply(s, o), true)]));
      out.push([slow, put((s: any) => ({ ...s, lit: true }))]);
      sdSteps(r.spent, r.n).forEach((_: any, j: number) => out.push([slow, put((s: any) => ({ ...s, fk: j + 1 }))]));
      out.push([slow, put((s: any) => ({ ...s, open: null, priced: [true] }))]);
    } else if (kind === "buy" || kind === "left") {
      const p = it.price, q = Math.floor(it.money / p), r = it.money % p;
      /* the multiplying error: each thing costs more than a rupee, so there are fewer things than rupees */
      if (!win && kind === "buy" && Number(slotPartsOf(v, 1)[0]) === it.money * p)
        out.push([420, put((s: any) => ({ ...s, chip: [sdRs(p) + " buys 1 " + it.one + ", so " + sdRs(it.money) + " buys fewer than " + indian(it.money) + " " + it.noun] }))]);
      sdPayPlan(S.amt, p).forEach((m: number) => out.push([pace, put((s: any) => ({ ...s, amt: s.amt - m * p, bought: s.bought + m }), true)]));
      if (kind === "left") {
        out.push([slow, put((s: any) => (s.trayed ? s : { ...s, tray: s.amt, amt: 0, trayed: true }))]);
        /* the rupees left counted as one more thing: they cannot pay its price */
        if (!win && Number(slotPartsOf(v, 2)[0]) === q + 1)
          out.push([slow, put((s: any) => ({ ...s, chip: [sdRs(r) + " left is less than " + sdRs(p) + ", one " + it.one + "'s price"] }))]);
      }
      out.push([slow, put((s: any) => ({ ...s, lit: true }))]);
      sdSteps(it.money, p).forEach((_: any, j: number) => out.push([slow, put((s: any) => ({ ...s, fk: j + 1 }))]));
      if (kind === "left") out.push([slow, put((s: any) => ({ ...s, cl: true }))]);
    } else if (kind === "coins") {
      const each = it.coins / it.kinds.length;
      for (let r = S.sorted; r < each; r++) out.push([pace, put((s: any) => ({ ...s, sorted: Math.min(each, s.sorted + 1) }), true)]);
      it.kinds.forEach((_: any, j: number) => out.push([slow, put((s: any) => ({ ...s, fk: j + 1 }))]));
      out.push([slow, put((s: any) => ({ ...s, lit: true }))]);
    }
    return out;
  };

  /* the traceback: the pad locks, the maths is finished and read, the pad re-opens; nothing is marked */
  useEffect(() => {
    if (!wrong || stage !== "ask" || free) return;
    lockRef.current = true;
    api.lock(true);
    tl.run(plan("wrong", wrong.value), () => { lockRef.current = false; api.lock(false); });
  }, [wrong]);

  /* a right answer: the maths moves to its end */
  useEffect(() => {
    if (stage === "win" && !free) tl.run(plan("win", null));
  }, [stage, key]);

  /* ── the child's acts ── */
  const tapTill = (k: string) => {
    if (!canAct || !S.piles) return;
    const n0 = S.piles, c = S.till[k], j = SD_KINDS.indexOf(k), k0 = key;
    if (c >= n0) {
      const rounds = Math.floor(c / n0);
      const steps: any[] = [[0, () => mod(k0, (s: any) => ({ ...s, acted: true }))]];
      for (let r = 0; r < rounds; r++) steps.push([150, () => { mod(k0, (s: any) => sdApply(s, { op: "round", k })); api.sfx.tick(); }]);
      /* a ticket row dealt to the end: its price settles in the table and the table comes back */
      const empties = c % n0 === 0 && SD_KINDS.every((q) => q === k || S.till[q] === 0);
      if (empties && kind === "tickets" && it.target === "total" && S.open !== null) {
        const row = S.open, full = sdSteps(it.rows[row].spent, it.rows[row].n).length;
        steps.push([900, () => mod(k0, (s: any) => ({ ...s, fk: full }))]);
        steps.push([0, () => { mod(k0, (s: any) => ({ ...s, open: null, fr: row, priced: s.priced.map((x: boolean, i: number) => x || i === row) })); api.sfx.tick(); }]);
      }
      tl.run(steps);
    } else if (sdCanChange(S.till, k, n0)) {
      mod(k0, (s: any) => ({ ...sdApply(s, { op: "change", k }), acted: true }));
      api.sfx.tick();
    } else {
      /* a tap that cannot act (a lower row while a row above still holds notes): no sound, no mark; the top
         row that still holds notes is ringed for a moment, so the child sees where to tap */
      const top = SD_KINDS.find((q) => S.till[q] > 0);
      if (top && top !== k) {
        mod(k0, (s: any) => ({ ...s, hintRow: top }));
        if (hintTimer.current) clearTimeout(hintTimer.current);
        hintTimer.current = setTimeout(() => mod(k0, (s: any) => ({ ...s, hintRow: null })), 1400);
      }
    }
  };
  const openRow = (j: number) => {
    if (!canAct || S.open !== null || S.priced[j]) return;
    const r = it.rows[j];
    mod(key, (s: any) => ({ ...s, acted: true, open: j, fr: j, fk: 0, till: sdSplit(r.spent), pile: { h: 0, t: 0, o: 0 }, piles: r.n, flash: null }));
    api.sfx.tick();
  };
  const pay = (m: number) => {
    const p = priceNow;
    if (!canAct || S.trayed || !p || S.amt < m * p) return;
    const k0 = key, after = S.amt - m * p;
    mod(k0, (s: any) => ({ ...s, acted: true, amt: s.amt - m * p, bought: s.bought + m }));
    api.sfx.tick();
    /* the lane stops when what is left is less than the price: the rest goes to the money left tray */
    if (after < p && (kind === "left" || free))
      tl.run([[500, () => {}], [0, () => mod(k0, (s: any) => (s.trayed ? s : { ...s, tray: s.amt, amt: 0, trayed: true }))]]);
  };
  const sortRound = () => {
    const each = it.coins / it.kinds.length;
    if (!canAct || S.sorted >= each) return;
    mod(key, (s: any) => ({ ...s, acted: true, sorted: Math.min(each, s.sorted + 1) }));
    api.sfx.tick();
  };
  /* the check: every thing on the shelf goes back into the till as its price, then the money left tips in */
  const runCheck = () => {
    if (!canAct || !S.trayed) return;
    const k0 = key, p = priceNow, tr = S.tray;
    let b = S.bought, a = S.amt;
    const seq = [...Array(b % 10).fill(1), ...Array(Math.floor((b % 100) / 10)).fill(10), ...Array(Math.floor(b / 100)).fill(100)];
    const steps: any[] = [];
    seq.forEach((m: number) => {
      b -= m; a += m * p;
      const bb = b, aa = a;
      steps.push([170, () => { mod(k0, (s: any) => ({ ...s, ck: { b: bb, a: aa, tr, lit: false } })); api.sfx.tick(); }]);
    });
    const af = a + tr;
    steps.push([1600, () => { mod(k0, (s: any) => ({ ...s, ck: { b: 0, a: af, tr: 0, lit: true } })); api.sfx.tick(); }]);
    steps.push([0, () => mod(k0, (s: any) => ({ ...s, ck: null }))]);
    tl.run(steps);
  };
  const setFree = (a: number, p: number) => {
    cfg.current = { a, p };
    tl.stop();
    mod("free", () => sdInit("free", null, { a, p }));
    api.sfx.tick();
  };

  /* what the host and the agent read back (toolApi.getState); never the answer */
  api.share(free ? { amount: S.fa, price: S.fp }
    : kind === "share" ? { amount: it.total, piles: it.things, unit: "rupees", thumb: it.thumb }
    : kind === "tickets" ? { tickets: it.rows.map((r: any) => r.n), spent: it.rows.map((r: any) => r.spent), open: S.open, unit: "rupees", thumb: it.thumb }
    : kind === "coins" ? { coins: it.coins, unit: "rupees", thumb: it.thumb }
    : it ? { amount: it.money, price: it.price, unit: kind === "left" ? "things and rupees left" : "things", noun: it.noun } : {});

  /* ── the picture (drawing helpers are called, never mounted) ── */
  const card = () => {
    const segs = it.card || [];
    /* widths are measured on the words as drawn, in the language on screen */
    const chars = segs.reduce((a: number, sg: any) => a + tx(sg[0]).length, 0);
    const fits = (z: number) => chars * z * 0.6 + (segs.length - 1) * 44 <= 1040;
    const size = fits(T.prompt) ? T.prompt : fits(T.label) ? T.label : T.micro;
    let x = 22;
    return (
      <g pointerEvents="none">
        <rect x={0} y={0} width={W.w} height={70} rx={RAD.panel} fill={tint(C.panel, 0.45)} stroke={C.rule} strokeWidth={2} />
        {segs.map((sg: any, j: number) => {
          const w = tx(sg[0]).length * size * 0.58, x0 = x;
          x += w + 44;
          const fill = sg[1] === "m" ? SD_INK.money : sg[1] === "n" ? SD_INK.count : C.ink;
          return (
            <g key={j}>
              <text x={x0} y={size === T.prompt ? 48 : 46} fontSize={size} fontWeight={sg[1] === "q" ? 700 : 600} fill={fill}>{tx(sg[0])}</text>
              {sg[1] === "q" && <line x1={x0} y1={59} x2={x0 + tx(sg[0]).length * size * 0.52} y2={59} stroke={C.ink} strokeWidth={3} strokeLinecap="round" />}
              {j < segs.length - 1 && <circle cx={x0 + w + 22} cy={35} r={4} fill={C.dim} />}
            </g>
          );
        })}
      </g>
    );
  };

  const till = (m: any, tap: boolean, start: number | null) => (
    <g>
      <g pointerEvents="none">
        <rect x={0} y={SD_TOP} width={280} height={SD_BOT - SD_TOP} rx={RAD.panel} fill={tint(C.panel, 0.35)} stroke={C.rule} strokeWidth={2} />
        {SD_KINDS.map((k, j) => (
          <g key={k}>
            <rect data-tillrow={k} x={8} y={SD_ROW_Y[j]} width={264} height={SD_ROW_H} rx={12} fill="#FFFFFF"
              stroke={S.flash === k ? CONTENT.ten : tint(C.rule, 0.1)} strokeWidth={S.flash === k ? 4 : 1.5} />
            <text x={44} y={SD_ROW_Y[j] + 48} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={SD_INK.money}>{sdSign(lang)}</text>
            <text x={44} y={SD_ROW_Y[j] + 82} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={SD_INK.money}>{SD_FACE[k].slice(3)}</text>
            <g data-tillk={k} data-count={m[k]}>{sdTillRow(82, SD_ROW_Y[j], m[k], k === "o")}</g>
          </g>
        ))}
        {start !== null && <text x={140} y={462} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={SD_INK.money}>{rs(start)}</text>}
        {start !== null && S.ck && S.ck.lit && <rect x={40} y={426} width={200} height={50} rx={14} fill="none" stroke={SD_INK.money} strokeWidth={3} />}
        {/* after a tap that could not act: the row to tap first, ringed for a moment (the invite's colour, still) */}
        {tap && S.hintRow && S.till[S.hintRow] > 0 && (
          <rect x={3} y={SD_ROW_Y[SD_KINDS.indexOf(S.hintRow)] - 3} width={274} height={SD_ROW_H + 6} rx={16}
            fill="none" stroke={C.accent} strokeWidth={5} />
        )}
      </g>
      {tap && SD_KINDS.map((k, j) => (
        <Hit key={k} id={"till-" + k} x={8} y={SD_ROW_Y[j]} w={264} h={SD_ROW_H} onPress={() => tapTill(k)}
          label={"deal the " + SD_FACE[k] + (k === "o" ? " coins" : " notes")} />
      ))}
    </g>
  );

  /* a correction's note: the child's number said for what it is, in words (one or two lines) */
  const chipAt = (x: number, y: number) => (S.chip ? (
    <g data-role="reading" pointerEvents="none">
      {S.chip.map((ln: string, j: number) => <text key={j} x={x} y={y + j * 30} fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx(ln)}</text>)}
    </g>
  ) : null);

  /* the piles: up to six in one row, each row of the pile beside the same row of the till; seven to nine
     in two rows (never narrower than five across), each pile with its own three rows lying flat */
  const mat = () => {
    const n0 = S.piles || 1, two = n0 > 6, per = two ? Math.ceil(n0 / 2) : n0, cw = 504 / per;
    const ph = two ? (SD_BOT - SD_TOP - 8) / 2 : SD_BOT - SD_TOP;
    return (
      <g pointerEvents="none">
        {Array.from({ length: n0 }).map((_, p) => {
          /* the lit pile is the first of the last row, straight above its amount under the mat */
          const lastRow = two ? per : 0;
          const x = 296 + (p % per) * cw, y = SD_TOP + Math.floor(p / per) * (ph + 8), on = S.lit && p === lastRow;
          /* two rows: each kind of note or coin in a three-by-three block (a pile never holds more than nine of a kind) */
          const kh = ph / 3, px = 26, pw = 23, py = Math.floor((kh - 6) / 3), nh = py - 3;
          return (
            <g key={p}>
              <rect data-card={p} x={x + 3} y={y} width={cw - 6} height={ph} rx={14} fill={tint(C.panel, 0.2)}
                stroke={on ? SD_INK.money : C.rule} strokeWidth={on ? 4 : 1.5} />
              {/* two rows: the same faint hairlines between the Rs 100, Rs 10 and Rs 1 blocks as the one-row mat */}
              {two && [1, 2].map((q) => <line key={"h" + q} x1={x + 8} y1={y + q * kh} x2={x + cw - 8} y2={y + q * kh} stroke={tint(C.rule, 0.2)} strokeWidth={1.5} />)}
              {SD_KINDS.map((k, j) => (
                <g key={k} data-pk={p + "-" + k}>{two
                  ? sdGrid(x + (cw - (2 * px + pw)) / 2, y + j * kh + (kh - (py * 2 + nh)) / 2, S.pile[k], k === "o", 3, px, py, pw, nh, "g")
                  : sdGrid(x + (cw - 48) / 2, SD_ROW_Y[j] + 8, S.pile[k], k === "o", 2, 26, 19, 22, 15, "g")}</g>
              ))}
            </g>
          );
        })}
        {!two && <line x1={296} y1={SD_ROW_Y[1] - 3} x2={800} y2={SD_ROW_Y[1] - 3} stroke={tint(C.rule, 0.2)} strokeWidth={1.5} />}
        {!two && <line x1={296} y1={SD_ROW_Y[2] - 3} x2={800} y2={SD_ROW_Y[2] - 3} stroke={tint(C.rule, 0.2)} strokeWidth={1.5} />}
        {S.lit && <text x={300} y={462} fontSize={T.prompt} fontWeight={700} fill={SD_INK.money}>{rs(sdSum(S.pile))}</text>}
      </g>
    );
  };

  /* the table stands centred in the space left of the frame (the till is away in table view); a lone row
     is centred up and down as well */
  const tableShift = () => ({ dx: -148, dy: it.rows.length === 1 ? 96 : 0 });
  const table = () => {
    const rows = it.rows, tot = it.target === "total", ty = 140 + rows.length * 88, { dx, dy } = tableShift();
    return (
      <g transform={`translate(${dx},${dy})`}>
        <g pointerEvents="none">
          <text x={358} y={124} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("tickets")}</text>
          <text x={515} y={124} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("spent")}</text>
          <text x={705} y={124} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("one ticket")}</text>
          {rows.map((r: any, j: number) => {
            const y = 140 + j * 88;
            return (
              <g key={j}>
                <rect x={296} y={y} width={504} height={80} rx={12} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} />
                <text x={358} y={y + 54} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={SD_INK.count}>{r.n}</text>
                <text x={515} y={y + 54} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={SD_INK.money}>{rs(r.spent)}</text>
                {S.priced[j]
                  ? <text x={705} y={y + 54} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={SD_INK.money}>{rs(r.spent / r.n)}</text>
                  : <rect x={632} y={y + 12} width={146} height={56} rx={10} fill="none" stroke={C.ink} strokeWidth={2} strokeDasharray="8 8" />}
              </g>
            );
          })}
          {tot && (
            <g>
              <line x1={425} y1={ty} x2={605} y2={ty} stroke={C.ink} strokeWidth={3} />
              <text x={358} y={ty + 50} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("total")}</text>
              {S.lit
                ? <text x={515} y={ty + 52} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={SD_INK.money}>{rs(rows.reduce((a: number, r: any) => a + r.spent, 0))}</text>
                : <rect x={440} y={ty + 12} width={150} height={56} rx={10} fill="none" stroke={C.ink} strokeWidth={2} strokeDasharray="8 8" />}
              {S.lit && <rect x={414} y={ty + 8} width={202} height={64} rx={12} fill="none" stroke={SD_INK.money} strokeWidth={3} />}
            </g>
          )}
        </g>
        {chipAt(300, ty + 118)}
        {rows.map((_: any, j: number) => (canAct && S.open === null && !S.priced[j]
          ? <Hit key={j} id={"row-" + (j + 1)} x={296} y={140 + j * 88} w={504} h={80} onPress={() => openRow(j)} label={"share row " + (j + 1)} /> : null))}
      </g>
    );
  };

  const lane = (p: number) => (
    <g>
      {[1, 10, 100].map((m, j) => {
        const cost = m * p, off = !canAct || S.trayed || S.amt < cost, lab = String(m), w = 26 + lab.length * 19;
        return (
          <Key key={m} id={"tag-" + m} x={296 + j * 177} y={88 + (free ? 10 : 0)} w={150} h={76} C={C} disabled={off} onClick={() => pay(m)}
            label={"pay " + sdRs(cost) + " for " + m + " " + (m === 1 ? (free ? "thing" : it.one) : (free ? "things" : it.noun))}>
            <rect x={-w / 2} y={-29} width={18} height={18} rx={3} fill={SD_SKY} stroke={shade(SD_SKY, 0.3)} strokeWidth={1.5} />
            <text x={-w / 2 + 26} y={-8} fontSize={T.label} fontWeight={700} fill={off ? C.dim : SD_INK.count}>{lab}</text>
            <text x={0} y={30} textAnchor="middle" fontSize={rs(cost).length > 6 ? T.micro : T.label} fontWeight={700} fill={off ? C.dim : SD_INK.money}>{rs(cost)}</text>
          </Key>
        );
      })}
      <g pointerEvents="none">
        {sdThings(S.ck ? S.ck.b : S.bought, 296, 182, 504)}
        <rect x={296} y={182 + sdThingsH(300, 504) + 6} width={504} height={6} rx={3} fill={C.ink} />
        {(S.lit || (free && S.trayed && !S.ck)) &&
          <text x={300} y={416} fontSize={T.prompt} fontWeight={700} fill={SD_INK.count}>{indian(S.bought) + " " + tx(free ? "things" : it.noun)}</text>}
        {(S.cl || (free && S.trayed && !S.ck)) && (
          <g data-role="reading">
            <text x={300} y={456} fontSize={T.label} fontWeight={600} fill={C.ink}>
              {indian(S.bought) + " × " + rs(p) + " + " + rs(S.tray) + " = " + rs(S.bought * p + S.tray)}</text>
          </g>
        )}
      </g>
      {chipAt(10, 496)}
    </g>
  );

  const tray = () => {
    const amt = S.ck ? S.ck.tr : S.tray, nt = Math.floor(amt / 10), no = amt % 10, pieces: any[] = [];
    for (let i = 0; i < nt + no; i++) {
      /* four across at most, so the coins never press on the check key (at least 24 units clear of it) */
      const cx = 846 + (i % 4) * 25, cy = 461 + Math.floor(i / 4) * 24;
      pieces.push(i < nt
        ? <rect key={i} x={cx - 10} y={cy - 7} width={20} height={14} rx={2} fill={SD_NOTE} stroke={SD_NOTE_EDGE} strokeWidth={1.5} />
        : <circle key={i} cx={cx} cy={cy} r={10} fill={SD_STEEL} stroke={SD_STEEL_EDGE} strokeWidth={2} />);
    }
    const shown = !S.ck && (S.lit || (free && S.trayed));
    return (
      <g>
        <g pointerEvents="none">
          <rect x={816} y={404} width={270} height={122} rx={RAD.panel} fill={tint(CONTENT.bead, 0.86)} stroke={SD_INK.left} strokeWidth={2} />
          {shown
            ? <text x={830} y={438} fontSize={T.label} fontWeight={700} fill={SD_INK.left}>{rs(S.tray) + " " + tx("left")}</text>
            : <text x={830} y={436} fontSize={T.micro} fontWeight={600} fill={SD_INK.left}>{tx("money left")}</text>}
          {pieces}
        </g>
        <Key id="check" x={984} y={446} w={94} h={72} C={C} disabled={!canAct || !S.trayed} onClick={runCheck} label="check: pay it all back">
          <text x={0} y={10} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={!canAct || !S.trayed ? C.dim : C.ink}>{tx("check")}</text>
        </Key>
      </g>
    );
  };

  const coinsScene = () => {
    const kinds = it.kinds, each = it.coins / kinds.length, seen: any = {};
    const inBox = SD_BOX.map((v) => { seen[v] = (seen[v] || 0) + 1; return seen[v] > S.sorted; });
    const coin = (cx: number, cy: number, v: number, kk: string) => (
      <g key={kk}>
        <circle cx={cx} cy={cy} r={24} fill={SD_STEEL} stroke={SD_STEEL_EDGE} strokeWidth={2} />
        <text x={cx} y={cy + 10} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={C.ink}>{v}</text>
      </g>
    );
    const total = kinds.reduce((a: number, k: number) => a + each * k, 0);
    return (
      <g>
        <g pointerEvents="none">
          <rect x={0} y={80} width={280} height={364} rx={RAD.panel} fill={tint(C.panel, 0.35)} stroke={C.rule} strokeWidth={2} />
          {SD_BOX.map((v, i) => (inBox[i] ? coin(50 + (i % 4) * 60, 126 + Math.floor(i / 4) * 62, v, "x" + i) : null))}
          {kinds.map((k: number, j: number) => {
            const cy = 136 + j * 104;
            return (
              <g key={k}>
                <rect x={296} y={cy - 44} width={504} height={88} rx={14} fill="#FFFFFF" stroke={C.rule} strokeWidth={1.5} />
                <text x={306} y={cy + 11} fontSize={T.label} fontWeight={700} fill={SD_INK.money}>{rs(k)}</text>
                {Array.from({ length: S.sorted }).map((_, c) => coin(430 + c * 62, cy, k, "s" + k + "-" + c))}
              </g>
            );
          })}
          <g data-role="reading">
            {kinds.map((k: number, j: number) => (j < S.fk
              ? <text key={k} x={826} y={150 + j * 56} fontSize={T.label} fontWeight={600} fill={C.ink}>{each + " × " + k + " = " + rs(each * k)}</text> : null))}
          </g>
          {S.lit && <line x1={826} y1={318} x2={1070} y2={318} stroke={C.ink} strokeWidth={3} />}
          {S.lit && <text x={826} y={370} fontSize={T.prompt} fontWeight={700} fill={SD_INK.money}>{rs(total)}</text>}
        </g>
        {canAct && S.sorted < each && <Hit id="box" x={0} y={80} w={280} h={364} onPress={sortRound} label="sort one of each coin" />}
      </g>
    );
  };

  const freeBar = () => {
    const plus = (m: number) => "+" + rs(m);
    const add = [[100, plus(100), 0, 136], [10, plus(10), 144, 124], [1, plus(1), 276, 112]];
    return (
      <g>
        {add.map(([m, lab, x, w]: any) => (
          <Key key={m} id={"add-" + m} x={x} y={2} w={w} h={72} C={C} disabled={S.fa + m > 1999} onClick={() => setFree(S.fa + m, S.fp)} label={"add Rs " + m}>
            <text x={0} y={11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={S.fa + m > 1999 ? C.dim : SD_INK.money}>{lab}</text>
          </Key>
        ))}
        <Key id="empty" x={396} y={2} w={124} h={72} C={C} disabled={S.fa === 0} onClick={() => setFree(0, S.fp)} label="empty the till">
          <text x={0} y={11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={S.fa === 0 ? C.dim : C.ink}>{tx("empty")}</text>
        </Key>
        <Key id="price-down" x={624} y={2} w={80} h={72} C={C} disabled={S.fp <= 5} onClick={() => setFree(S.fa, S.fp - 1)} label="lower the price">
          <text x={0} y={12} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={S.fp <= 5 ? C.dim : C.ink}>−</text>
        </Key>
        <text x={820} y={50} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={SD_INK.money}>{tx("price") + " " + rs(S.fp)}</text>
        <Key id="price-up" x={936} y={2} w={80} h={72} C={C} disabled={S.fp >= 20} onClick={() => setFree(S.fa, S.fp + 1)} label="raise the price">
          <text x={0} y={14} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={S.fp >= 20 ? C.dim : C.ink}>+</text>
        </Key>
      </g>
    );
  };

  /* the division frame for what is on the counter */
  const frame = () => {
    if (free) return sdFrame(C, S.fa, S.fp, S.trayed && !S.ck ? 9 : 0, SD_INK.count, SD_INK.left, 90);
    if (kind === "share") return sdFrame(C, it.total, it.things, S.fk, SD_INK.money, SD_INK.left);
    if (kind === "tickets" && S.fadd) return sdAddFrame(C, it.rows, S.lit, sdSign(lang));
    if (kind === "tickets") { const r = it.rows[S.fr || 0]; return sdFrame(C, r.spent, r.n, S.fk, SD_INK.money, SD_INK.left); }
    if (kind === "buy" || kind === "left") return sdFrame(C, it.money, it.price, S.fk, SD_INK.count, SD_INK.left);
    return null;
  };

  /* the one invite, around the whole of the one thing to touch (a till row, a table row, the tag, the box),
     until the child's first act */
  let inv: any = null;
  if (stage === "ask" && !wrong && !S.acted && !busy && it) {
    /* the till row's ring sits in the gutter round the row, clear of the bundles inside it */
    if (kind === "share") { const o = sdDealPlan(S.till, S.piles)[0]; if (o) inv = [3, SD_ROW_Y[SD_KINDS.indexOf(o.k)] - 3, 274, SD_ROW_H + 6]; }
    else if (kind === "tickets") {
      const j = it.rows.findIndex((_: any, i: number) => !S.priced[i]), { dx, dy } = tableShift();
      if (S.open === null && j >= 0) inv = [300 + dx, 144 + j * 88 + dy, 496, 72];
    }
    else if (kind === "buy" || kind === "left") inv = [292, 84, 158, 86];
    else if (kind === "coins") inv = [8, 88, 264, 348];
  }

  let body: any = null;
  if (kind === "coins") body = coinsScene();
  else if (laneKind) body = (
    <g>
      {/* in Free play the add and price keys stand above: the till stands 10 lower, clear of them */}
      <g transform={`translate(0,${free ? 10 : 0})`}>{till(sdSplit(S.ck ? S.ck.a : S.amt), false, free ? S.fa : it.money)}</g>
      {lane(priceNow)}
      {(kind === "left" || free) && tray()}
      {frame()}
    </g>
  );
  else if (kind === "share") body = <g>{till(S.till, canAct, it.total)}{mat()}{chipAt(10, 496)}{frame()}</g>;
  else if (kind === "tickets") body = S.open !== null ? (
    <g>
      {till(S.till, canAct, it.rows[S.open].spent)}
      {mat()}
      <text x={300} y={496} fontSize={T.micro} fontWeight={600} fill={C.ink} pointerEvents="none">
        {it.rows[S.open].n + " " + tx("tickets") + ", " + rs(it.rows[S.open].spent)}</text>
      {frame()}
    </g>
  ) : <g>{table()}{frame()}</g>; /* the till comes out only when a row is opened */

  return (
    <g>
      {free ? freeBar() : it ? card() : null}
      {body}
      {inv && sdPulse(C, inv[0], inv[1], inv[2], inv[3])}
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase:
   result.last = { value, answer, kind, item, shared } (shared = what api.share held at that moment) */
function Thumb({ result, C, w, h, lang = "en", tx = (v: any) => v }: any) {
  const last = result && result.last;
  if (!last || last.value === null || last.value === undefined) return null;
  const sh = last.shared || {};
  let top = "", sub = "", ink = SD_INK.money;
  if (last.kind === "left") {
    const [q, r] = slotPartsOf(last.value, 2);
    top = q + " " + tx(sh.noun || "things"); sub = sdRsL(Number(r), lang) + " " + tx("left"); ink = SD_INK.count;
  } else if (last.kind === "buy") {
    top = indian(Number(slotPartsOf(last.value, 1)[0])) + " " + tx(sh.noun || "things"); ink = SD_INK.count;
  } else {
    top = sdRsL(Number(String(last.value).replace(/\D/g, "")), lang); sub = sh.thumb ? tx(sh.thumb) : "";
  }
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      {sub ? (
        <g>
          <text x={w / 2} y={h / 2 - 6} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={ink}>{top}</text>
          <text x={w / 2} y={h / 2 + 28} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={last.kind === "left" ? SD_INK.left : C.ink}>{sub}</text>
        </g>
      ) : <text x={w / 2} y={h / 2 + 12} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={ink}>{top}</text>}
    </g>
  );
}

function ShopDivider(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, format: sdFormat, winMs: 2800, fitHost: () => null }} />
  );
}

export default ShopDivider;
