/* ═══ M1.S2.T3.C8.2D1 · money_tray · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists: header + its three controls, canvas, slot + pad, bubble + mascot,
   phase dots (user / AI mode), window.toolApi, sounds, the synced voice, scoring, the events,
   idle and restart. NO imports in this file; only the five host hooks. Follow docs/LAYOUT.md;
   the reference tool is work/indiannica_eng_maths4_ch1/M1.S1.T2.C4.2D1/tool.tsx.
   Edit, never rewrite. Built by `node cli.mjs scaffold`; concepts are verbatim (check compares them). */

const TOOL_ID = "money_tray";
const MEDIA_ID = "M1.S2.T3.C8.2D1";
const TOOL_NAME = "Money Tray";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
const VOICE = {"rate":0.92,"pitch":1.06};

/* spoken before phase 1's teach lines only (the plan's opening voice line) */
const OPENING = ["A heap of notes and coins and a row of slots. What is each piece worth?"];
/* the whole-tool line: spoken on the summary page */
const FINISH_LINE = "Every piece in its slot, every group counted, and every total laid against the price.";
/* said when the child opens Free play from the summary page (the plan's free-play voice line) */
const FREE_LINE = "Free play. Any heap, with the reader, the rail and the gauge open.";

/* Hindi and Gujarati (docs/PATTERNS.md §11): every line above and below stays English, exactly as the checks
   read it; this table is keyed by that English, and the runtime looks each spoken or drawn line up in it.
   Fill it AFTER the English is final and reviewed (`node cli.mjs voice` lists every line still missing),
   then bake the voice. Empty = the tool runs in English only. */
/* Spoken money is written in words ("100 रुपये", digits kept for the runtime to spell); drawn money (the
   asks above the slot) keeps its digits behind the language-neutral "₹". A first draft: it wants a native
   speaker's read. */
const TR: any = {
  hi: {
    /* the tool, the opening, the summary, free play */
    "Money Tray": "पैसों की ट्रे",
    "A heap of notes and coins and a row of slots. What is each piece worth?": "नोटों और सिक्कों का एक ढेर, और खानों की एक कतार। हर नोट और सिक्का कितने का है?",
    "Every piece in its slot, every group counted, and every total laid against the price.": "हर नोट और सिक्का अपने खाने में, हर समूह गिना गया। हर कुल को कीमत के साथ रखा गया।",
    "Free play. Any heap, with the reader, the rail and the gauge open.": "मुक्त खेल। कोई भी ढेर छाँटो, समूह पढ़ो, पट्टी और मापक देखो।",
    /* phase 1 */
    "The value of each note and coin": "हर नोट और सिक्के का मूल्य",
    "Put each piece in the slot for its value.": "हर नोट और सिक्के को उसके मूल्य वाले खाने में रखो।",
    "How much money is in each group?": "हर समूह में कितने पैसे हैं?",
    "Work out the money in each group, then compare the two.": "हर समूह के पैसे निकालो, फिर दोनों की तुलना करो।",
    "Each note and coin is worth the value printed on it. A coin and a note of the same value are worth the same.":
      "हर नोट और सिक्का उतने का होता है जितना उस पर छपा है। एक ही मूल्य के सिक्के और नोट बराबर होते हैं।",
    "You learned: money is counted by value, not by how many pieces.": "तुमने सीखा: पैसे मूल्य से गिने जाते हैं, टुकड़ों की गिनती से नहीं।",
    "One purse holds a note of Rs 100. Another holds six coins of Rs 10. Which purse has more money?":
      "एक बटुए में 100 रुपये का एक नोट है। दूसरे में 10 रुपये के छह सिक्के हैं। किस बटुए में ज़्यादा पैसे हैं?",
    "Which purse has more money?": "किस बटुए में ज़्यादा पैसे?",
    "What value is printed on each piece?": "हर नोट और सिक्के पर कितना छपा है?",
    "Which is worth more, a coin of Rs 20 or a note of Rs 10?": "किसका मूल्य ज़्यादा है, 20 रुपये का सिक्का या 10 रुपये का नोट?",
    "Which is worth more?": "किसका मूल्य ज़्यादा?",
    "Is a note always worth more than a coin?": "क्या नोट हमेशा सिक्के से ज़्यादा का होता है?",
    "Which is more money, eight coins of Rs 2 or one note of Rs 20?": "ज़्यादा पैसे कौन से हैं, 2 रुपये के आठ सिक्के या 20 रुपये का एक नोट?",
    "Which is more money?": "ज़्यादा पैसे किसमें?",
    "Count the coins two rupees at a time.": "सिक्कों को दो-दो रुपये करके गिनो।",
    "The note": "नोट",
    "The coins": "सिक्के",
    "The coin": "सिक्का",
    "The same": "बराबर",
    /* phase 2 */
    "Counting a group of one note": "एक ही नोट के समूह को गिनना",
    "Every note in a group has the same value. Tap the group to lay its notes along the rail.":
      "एक समूह के हर नोट का मूल्य एक जैसा होता है। समूह को छूकर उसके नोट पट्टी पर रखो।",
    "What is each one worth?": "हर एक कितने का है?",
    "Lay the value down once for each piece, and keep adding.": "हर नोट या सिक्के के लिए उसका मूल्य एक बार रखो, और जोड़ते जाओ।",
    "Many notes of one value are counted by multiplying the number of notes by the value.":
      "एक ही मूल्य के कई नोट गुणा करके गिने जाते हैं। नोटों की संख्या को मूल्य से गुणा करो।",
    "You learned: count a group of one value with one multiplication.": "तुमने सीखा: एक ही मूल्य का समूह एक गुणा से गिनो।",
    "How much money is 9 notes of Rs 50?": "50 रुपये के 9 नोट कितने पैसे हैं?",
    "9 notes, each Rs 50. Total?": "₹50 के 9 नोट। कुल?",
    "How many notes are in the slot?": "खाने में कितने नोट हैं?",
    "What are 14 notes of Rs 500 worth?": "500 रुपये के 14 नोट कितने के हैं?",
    "14 notes, each Rs 500. Total?": "₹500 के 14 नोट। कुल?",
    "The tied stack holds 10 notes. What are those worth?": "बँधी गड्डी में 10 नोट हैं। वे कितने के हैं?",
    "A money box holds 27 coins of Rs 5. How much money is that?": "एक गुल्लक में 5 रुपये के 27 सिक्के हैं। ये कितने पैसे हुए?",
    "27 coins, each Rs 5. Total?": "₹5 के 27 सिक्के। कुल?",
    "Is 27 the number of coins, or the money?": "27 सिक्कों की संख्या है या पैसे?",
    /* phase 3 */
    "Adding the groups": "समूहों को जोड़ना",
    "Each group has its own count and its own value. Slide each group onto the rail.":
      "हर समूह की अपनी गिनती और अपना मूल्य है। हर समूह को पट्टी पर सरकाओ।",
    "Has every group been turned into rupees?": "क्या हर समूह को रुपयों में बदला गया?",
    "Do the multiplying inside each group first. The adding comes last.": "पहले हर समूह के अंदर गुणा करो। जोड़ना सबसे आखिर में।",
    "Find what each group is worth first, then add the groups.": "पहले हर समूह का मूल्य निकालो, फिर समूहों को जोड़ो।",
    "You learned: work out each group in rupees, then add.": "तुमने सीखा: हर समूह को रुपयों में निकालो, फिर जोड़ो।",
    "A cash box holds 3 notes of Rs 200, 4 notes of Rs 20 and 6 coins of Rs 5. How much money is in it?":
      "एक डिब्बे में 200 रुपये के 3 नोट और 20 रुपये के 4 नोट हैं। उसमें 5 रुपये के 6 सिक्के भी हैं। कुल कितने पैसे हैं?",
    "How much money in all?": "कुल कितने पैसे?",
    "What is the first group worth?": "पहला समूह कितने का है?",
    "Find the total of these notes: one of Rs 200, one of Rs 50, three of Rs 20 and three of Rs 10.":
      "इन नोटों का कुल निकालो। 200 और 50 रुपये का एक-एक नोट है। 20 और 10 रुपये के तीन-तीन नोट हैं।",
    "What is the total?": "कुल कितना है?",
    "What do the three notes of Rs 20 make?": "20 रुपये के तीन नोट कितने होते हैं?",
    "A box holds 60 coins. Half of them are coins of Rs 10, and the rest are coins of Rs 2. What are they all worth?":
      "एक डिब्बे में 60 सिक्के हैं। उनमें से आधे 10 रुपये के हैं, और बाकी 2 रुपये के। सब मिलाकर कितने के हैं?",
    "How much in the box?": "डिब्बे में कितने पैसे?",
    "How many coins of each kind are there?": "हर तरह के कितने सिक्के हैं?",
    /* phase 4 */
    "Is it enough?": "क्या पैसे काफ़ी हैं?",
    "Find the total first. Is it short, exactly enough, or more than enough?": "पहले कुल निकालो। क्या पैसे कम हैं, ठीक पूरे हैं, या ज़्यादा?",
    "Where does the total's bar end against the other bar?": "कुल की पट्टी दूसरी पट्टी के सामने कहाँ ख़त्म होती है?",
    "Set the two amounts side by side. Which is larger, or are they the same?": "दोनों रकमें साथ-साथ रखो। कौन बड़ी है, या दोनों बराबर हैं?",
    "Exactly enough is enough, and when two amounts are the same, neither is more.":
      "ठीक पूरे पैसे काफ़ी होते हैं। जब दो रकमें बराबर हों, तो कोई ज़्यादा नहीं।",
    "You learned: find the total, then compare it with the price.": "तुमने सीखा: कुल निकालो, फिर उसकी तुलना कीमत से करो।",
    "A class trip costs Rs 350. A child brings one note of Rs 200, five notes of Rs 20 and ten coins of Rs 5. Is that enough?":
      "कक्षा की सैर 350 रुपये की है। एक बच्चा 200 रुपये का एक नोट लाता है। साथ में 20 रुपये के पाँच नोट और 5 रुपये के दस सिक्के हैं। क्या इतने पैसे काफ़ी हैं?",
    "Is it enough for the trip?": "क्या सैर के लिए काफ़ी?",
    "A book costs Rs 250. A child has two notes of Rs 100 and four coins of Rs 10. Is it enough for the book?":
      "एक किताब 250 रुपये की है। एक बच्चे के पास 100 रुपये के दो नोट और 10 रुपये के चार सिक्के हैं। क्या किताब के लिए काफ़ी हैं?",
    "Is it enough for the book?": "क्या किताब के लिए काफ़ी?",
    "Six pieces tell you nothing yet. What do the two notes make, and what do the four coins?":
      "छह टुकड़े अभी कुछ नहीं बताते। दो नोट कितने के हैं, और चार सिक्के कितने के?",
    "One child has 8 notes of Rs 200. Another has 16 notes of Rs 100. Who has more money?":
      "एक बच्चे के पास 200 रुपये के 8 नोट हैं। दूसरे के पास 100 रुपये के 16 नोट हैं। किसके पास ज़्यादा पैसे हैं?",
    "Who has more money?": "किसके पास ज़्यादा पैसे?",
    "More notes need not mean more money. What does each child have?": "ज़्यादा नोट का मतलब ज़्यादा पैसे नहीं। हर बच्चे के पास कितने हैं?",
    "Short": "कम",
    "Exactly enough": "ठीक पूरे",
    "More than enough": "ज़्यादा",
    "First child": "पहला",
    "Second child": "दूसरा",
    "Neither": "कोई नहीं",
    /* words the picture draws */
    "sorted": "छँटे", "counted": "गिने", "added": "जोड़े गए",
    "notes": "नोट", "note": "नोट", "coins": "सिक्के", "coin": "सिक्का", "pieces": "टुकड़े", "each": "हर एक",
    "price": "कीमत", "money": "पैसे", "class trip": "कक्षा की सैर", "book": "किताब",
    "first child": "पहला बच्चा", "second child": "दूसरा बच्चा", "first": "पहला", "second": "दूसरा",
    "more": "ज़्यादा", "pairs": "जोड़ियाँ", "new": "नया", "heap": "ढेर",
  },
  gu: {
    /* the tool, the opening, the summary, free play */
    "Money Tray": "પૈસાની ટ્રે",
    "A heap of notes and coins and a row of slots. What is each piece worth?": "નોટો અને સિક્કાનો એક ઢગલો, અને ખાનાંની એક હાર. દરેક નોટ અને સિક્કો કેટલાનો છે?",
    "Every piece in its slot, every group counted, and every total laid against the price.": "દરેક નોટ અને સિક્કો પોતાના ખાનામાં, દરેક જૂથ ગણાયું. દરેક કુલ કિંમતની સામે મુકાયો.",
    "Free play. Any heap, with the reader, the rail and the gauge open.": "મુક્ત રમત. કોઈ પણ ઢગલો ગોઠવો, જૂથ વાંચો, પટ્ટી અને માપક જુઓ.",
    /* phase 1 */
    "The value of each note and coin": "દરેક નોટ અને સિક્કાનું મૂલ્ય",
    "Put each piece in the slot for its value.": "દરેક નોટ અને સિક્કાને તેના મૂલ્યવાળા ખાનામાં મૂકો.",
    "How much money is in each group?": "દરેક જૂથમાં કેટલા પૈસા છે?",
    "Work out the money in each group, then compare the two.": "દરેક જૂથના પૈસા શોધો, પછી બંનેની સરખામણી કરો.",
    "Each note and coin is worth the value printed on it. A coin and a note of the same value are worth the same.":
      "દરેક નોટ અને સિક્કો તેના પર છાપેલા મૂલ્ય જેટલો હોય છે. સરખા મૂલ્યના સિક્કો અને નોટ સરખા હોય છે.",
    "You learned: money is counted by value, not by how many pieces.": "તમે શીખ્યા: પૈસા મૂલ્યથી ગણાય, ટુકડાની સંખ્યાથી નહીં.",
    "One purse holds a note of Rs 100. Another holds six coins of Rs 10. Which purse has more money?":
      "એક પાકીટમાં 100 રૂપિયાની એક નોટ છે. બીજામાં 10 રૂપિયાના છ સિક્કા છે. કયા પાકીટમાં વધારે પૈસા છે?",
    "Which purse has more money?": "કયા પાકીટમાં વધુ પૈસા?",
    "What value is printed on each piece?": "દરેક નોટ અને સિક્કા પર કેટલું છાપેલું છે?",
    "Which is worth more, a coin of Rs 20 or a note of Rs 10?": "કોનું મૂલ્ય વધારે છે, 20 રૂપિયાનો સિક્કો કે 10 રૂપિયાની નોટ?",
    "Which is worth more?": "કોનું મૂલ્ય વધારે?",
    "Is a note always worth more than a coin?": "શું નોટ હંમેશાં સિક્કા કરતાં વધારે મૂલ્યની હોય?",
    "Which is more money, eight coins of Rs 2 or one note of Rs 20?": "વધારે પૈસા કયા છે, 2 રૂપિયાના આઠ સિક્કા કે 20 રૂપિયાની એક નોટ?",
    "Which is more money?": "વધુ પૈસા શેમાં?",
    "Count the coins two rupees at a time.": "સિક્કાને બે-બે રૂપિયા કરીને ગણો.",
    "The note": "નોટ",
    "The coins": "સિક્કા",
    "The coin": "સિક્કો",
    "The same": "સરખા",
    /* phase 2 */
    "Counting a group of one note": "એક જ નોટના જૂથની ગણતરી",
    "Every note in a group has the same value. Tap the group to lay its notes along the rail.":
      "જૂથની દરેક નોટનું મૂલ્ય સરખું હોય છે. જૂથને સ્પર્શ કરીને તેની નોટો પટ્ટી પર મૂકો.",
    "What is each one worth?": "દરેક કેટલાનું છે?",
    "Lay the value down once for each piece, and keep adding.": "દરેક નોટ કે સિક્કા માટે તેનું મૂલ્ય એક વાર મૂકો, અને ઉમેરતા જાઓ.",
    "Many notes of one value are counted by multiplying the number of notes by the value.":
      "એક જ મૂલ્યની ઘણી નોટો ગુણાકારથી ગણાય છે. નોટોની સંખ્યાને મૂલ્ય વડે ગુણો.",
    "You learned: count a group of one value with one multiplication.": "તમે શીખ્યા: એક જ મૂલ્યનું જૂથ એક ગુણાકારથી ગણાય.",
    "How much money is 9 notes of Rs 50?": "50 રૂપિયાની 9 નોટ કેટલા પૈસા થાય?",
    "9 notes, each Rs 50. Total?": "₹50ની 9 નોટ. કુલ?",
    "How many notes are in the slot?": "ખાનામાં કેટલી નોટ છે?",
    "What are 14 notes of Rs 500 worth?": "500 રૂપિયાની 14 નોટ કેટલાની થાય?",
    "14 notes, each Rs 500. Total?": "₹500ની 14 નોટ. કુલ?",
    "The tied stack holds 10 notes. What are those worth?": "બાંધેલી થોકડીમાં 10 નોટ છે. તે કેટલાની છે?",
    "A money box holds 27 coins of Rs 5. How much money is that?": "એક ગલ્લામાં 5 રૂપિયાના 27 સિક્કા છે. એ કેટલા પૈસા થયા?",
    "27 coins, each Rs 5. Total?": "₹5ના 27 સિક્કા. કુલ?",
    "Is 27 the number of coins, or the money?": "27 એ સિક્કાની સંખ્યા છે કે પૈસા?",
    /* phase 3 */
    "Adding the groups": "જૂથોનો સરવાળો",
    "Each group has its own count and its own value. Slide each group onto the rail.":
      "દરેક જૂથની પોતાની ગણતરી અને પોતાનું મૂલ્ય છે. દરેક જૂથને પટ્ટી પર સરકાવો.",
    "Has every group been turned into rupees?": "શું દરેક જૂથ રૂપિયામાં ફેરવાયું?",
    "Do the multiplying inside each group first. The adding comes last.": "પહેલાં દરેક જૂથમાં ગુણાકાર કરો. સરવાળો છેલ્લે.",
    "Find what each group is worth first, then add the groups.": "પહેલાં દરેક જૂથનું મૂલ્ય શોધો, પછી જૂથોનો સરવાળો કરો.",
    "You learned: work out each group in rupees, then add.": "તમે શીખ્યા: દરેક જૂથ રૂપિયામાં શોધો, પછી ઉમેરો.",
    "A cash box holds 3 notes of Rs 200, 4 notes of Rs 20 and 6 coins of Rs 5. How much money is in it?":
      "એક ડબ્બામાં 200 રૂપિયાની 3 નોટ અને 20 રૂપિયાની 4 નોટ છે. તેમાં 5 રૂપિયાના 6 સિક્કા પણ છે. કુલ કેટલા પૈસા છે?",
    "How much money in all?": "કુલ કેટલા પૈસા?",
    "What is the first group worth?": "પહેલું જૂથ કેટલાનું છે?",
    "Find the total of these notes: one of Rs 200, one of Rs 50, three of Rs 20 and three of Rs 10.":
      "આ નોટોનો કુલ શોધો. 200 અને 50 રૂપિયાની એક-એક નોટ છે. 20 અને 10 રૂપિયાની ત્રણ-ત્રણ નોટ છે.",
    "What is the total?": "કુલ કેટલા છે?",
    "What do the three notes of Rs 20 make?": "20 રૂપિયાની ત્રણ નોટ કેટલા થાય?",
    "A box holds 60 coins. Half of them are coins of Rs 10, and the rest are coins of Rs 2. What are they all worth?":
      "એક ડબ્બામાં 60 સિક્કા છે. તેમાંથી અડધા 10 રૂપિયાના છે, અને બાકીના 2 રૂપિયાના. બધા મળીને કેટલાના છે?",
    "How much in the box?": "ડબ્બામાં કેટલા પૈસા?",
    "How many coins of each kind are there?": "દરેક પ્રકારના કેટલા સિક્કા છે?",
    /* phase 4 */
    "Is it enough?": "શું પૈસા પૂરતા છે?",
    "Find the total first. Is it short, exactly enough, or more than enough?": "પહેલાં કુલ શોધો. પૈસા ઓછા છે, બરાબર છે, કે વધારે?",
    "Where does the total's bar end against the other bar?": "કુલની પટ્ટી બીજી પટ્ટીની સામે ક્યાં પૂરી થાય છે?",
    "Set the two amounts side by side. Which is larger, or are they the same?": "બંને રકમ બાજુ-બાજુમાં મૂકો. કઈ મોટી છે, કે બંને સરખી છે?",
    "Exactly enough is enough, and when two amounts are the same, neither is more.":
      "બરાબર પૈસા પૂરતા જ છે. બે રકમ સરખી હોય ત્યારે કોઈ વધારે નથી.",
    "You learned: find the total, then compare it with the price.": "તમે શીખ્યા: કુલ શોધો, પછી તેની કિંમત સાથે સરખામણી કરો.",
    "A class trip costs Rs 350. A child brings one note of Rs 200, five notes of Rs 20 and ten coins of Rs 5. Is that enough?":
      "વર્ગના પ્રવાસનો ખર્ચ 350 રૂપિયા છે. એક બાળક 200 રૂપિયાની એક નોટ લાવે છે. સાથે 20 રૂપિયાની પાંચ નોટ અને 5 રૂપિયાના દસ સિક્કા છે. શું એટલા પૈસા પૂરતા છે?",
    "Is it enough for the trip?": "પ્રવાસ માટે પૂરતા?",
    "A book costs Rs 250. A child has two notes of Rs 100 and four coins of Rs 10. Is it enough for the book?":
      "એક પુસ્તકની કિંમત 250 રૂપિયા છે. એક બાળક પાસે 100 રૂપિયાની બે નોટ અને 10 રૂપિયાના ચાર સિક્કા છે. શું પુસ્તક માટે પૂરતા છે?",
    "Is it enough for the book?": "પુસ્તક માટે પૂરતા?",
    "Six pieces tell you nothing yet. What do the two notes make, and what do the four coins?":
      "છ ટુકડા હજી કંઈ કહેતા નથી. બે નોટ કેટલાની છે, અને ચાર સિક્કા કેટલાના?",
    "One child has 8 notes of Rs 200. Another has 16 notes of Rs 100. Who has more money?":
      "એક બાળક પાસે 200 રૂપિયાની 8 નોટ છે. બીજા પાસે 100 રૂપિયાની 16 નોટ છે. કોની પાસે વધારે પૈસા છે?",
    "Who has more money?": "કોની પાસે વધુ પૈસા?",
    "More notes need not mean more money. What does each child have?": "વધારે નોટ એટલે વધારે પૈસા નહીં. દરેક બાળક પાસે કેટલા છે?",
    "Short": "ઓછા",
    "Exactly enough": "બરાબર",
    "More than enough": "વધારે",
    "First child": "પહેલું",
    "Second child": "બીજું",
    "Neither": "કોઈ નહીં",
    /* words the picture draws */
    "sorted": "ગોઠવ્યા", "counted": "ગણ્યા", "added": "ઉમેર્યા",
    "notes": "નોટ", "note": "નોટ", "coins": "સિક્કા", "coin": "સિક્કો", "pieces": "ટુકડા", "each": "દરેક",
    "price": "કિંમત", "money": "પૈસા", "class trip": "વર્ગ પ્રવાસ", "book": "પુસ્તક",
    "first child": "પહેલું બાળક", "second child": "બીજું બાળક", "first": "પહેલું", "second": "બીજું",
    "more": "વધારે", "pairs": "જોડી", "new": "નવો", "heap": "ઢગલો",
  },
};

/* ── the money itself: play notes and coins, drawn by value alone ─────────────────────────── */
const MT_NOTES = [10, 20, 50, 100, 200, 500];
const MT_COINS = [1, 2, 5, 10, 20];
const MT_BLUE = CONTENT.hundred;                    /* rupees: every amount and every printed value */
const MT_BLUE_INK = shade(CONTENT.hundred, 0.25);
const MT_SKY = "#56B4E9";                           /* a count of things, never money */
const MT_SKY_INK = shade("#56B4E9", 0.45);
const MT_NOTE = tint(CONTENT.hundred, 0.8);         /* a play note: one plain pale blue rectangle */
const MT_NOTE_EDGE = tint(CONTENT.hundred, 0.25);
const MT_STEEL = "#CBD2D9";                         /* a play coin: one plain steel disc */
const MT_STEEL_EDGE = "#7A8793";
const MT_LINE = CONTENT.line;                       /* rules, bands, the gauge's start line: near-black */
/* the drawn rupee: "Rs 225" in English, as the chapter's writeup prints it; the language-neutral "₹225" in
   Hindi and Gujarati. Work, Thumb and the slot's format set it for the language in use before they draw. */
let mtRupee = "Rs ";
const mtSetLang = (lang: any) => { mtRupee = lang && lang !== "en" ? "₹" : "Rs "; };
const mtRs = (x: number) => mtRupee + indian(x);
const mtAmount = (gs: any[]) => gs.reduce((a: number, g: any) => a + g.v * g.n, 0);
/* "c10 n100" -> [{ k: "coin", v: 10 }, { k: "note", v: 100 }] */
const mtHeap = (s: string) => s.split(" ").map((t: string) => ({ k: t[0] === "n" ? "note" : "coin", v: Number(t.slice(1)) }));
/* the words the slot shows for a chosen key, and the rupee sign beside a typed amount */
const MT_SHOWN: any = { note: "The note", coins: "The coins", coin: "The coin", same: "The same",
  short: "Short", exact: "Exactly enough", more: "More than enough", first: "First child", second: "Second child", neither: "Neither" };
const mtShown = (v: any) => {
  const s = String(v === null || v === undefined ? "" : v);
  if (MT_SHOWN[s]) return MT_SHOWN[s];
  return /^[1-9]\d*$/.test(s) ? mtRupee + indian(Number(s)) : /^\d+$/.test(s) ? mtRupee + s : s;
};
/* the slot's text in the language in use (the runtime then looks a chosen key's words up in TR) */
const mtFormat = (v: any, _j?: any, o?: any) => { mtSetLang(o && o.lang); return mtShown(v); };
/* the free-play heaps, tipped out one after another */
const MT_FREE_HEAPS = ["n100 c10 c10 c20 n50 c5 c5 n10 c1 c2", "n200 n200 n100 c20 c10 c10 c10 c5",
  "n500 n50 n20 n20 c2 c2 c2 c1", "n100 n100 c10 c10 c10 c10 c10 c20 c20"].map(mtHeap);
const MT_FREE_PRICES = [100, 250, 350, 500];

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
    concept: "The value of each note and coin",
    conceptId: "M1.S2.T3.C8", objectiveIds: ["O3"],
    /* the plan's second sentence ("Which is worth more, the one note or the coins?") is question 1 itself */
    says: ["Put each piece in the slot for its value."],
    /* tries, as the plan writes it: A miss is answered three ways at once and none of them is the answer. First rung, from the item's own miss line: what value is printed on each piece? Second rung, the phase's: what is the whole handful worth? Third rung: the heap is cut to one note and two coins, and the child finds what the coins make before the larger heap comes back. The word pad and the number pad stay open behind all three rungs. */
    ladder: ["How much money is in each group?", "Work out the money in each group, then compare the two."],
    closing: "Each note and coin is worth the value printed on it. A coin and a note of the same value are worth the same.",
    /* the summary page's row: "You learned: ..." in at most 72 characters */
    learned: "You learned: money is counted by value, not by how many pieces.",
    /* the traceback for a miss, in one line (it goes into the sidecar) */
    traceback: "Every piece drops into the slot for its value, the reader writes the coins' count times their value, and the gauge lays both lots as bars from one line; the larger one glows and reads more.",
    items: [
      /* learn ML1: answer in the plan = The purse with the Rs 100 note, because six Rs 10 coins make only Rs 60 */
      { qid: "M1.S2.T3.C8:ML1", kind: "which", heap: mtHeap("c10 c10 n100 c10 c10 c10 c10"), lots: ["note", "coin"], near: "coins", winMs: 3400,
        choices: [{ id: "note", label: "The note" }, { id: "coins", label: "The coins" }, { id: "same", label: "The same" }],
        say: "One purse holds a note of Rs 100. Another holds six coins of Rs 10. Which purse has more money?", ask: "Which purse has more money?", answer: "note", miss: "What value is printed on each piece?" },
      /* practice 1: answer in the plan = The Rs 20 coin. A coin or a note is worth the value printed on it */
      { qid: "M1.S2.T3.C8:1", kind: "which", heap: mtHeap("n10 c20"), lots: ["coin", "note"], near: "note", winMs: 3000,
        choices: [{ id: "coin", label: "The coin" }, { id: "note", label: "The note" }, { id: "same", label: "The same" }],
        say: "Which is worth more, a coin of Rs 20 or a note of Rs 10?", ask: "Which is worth more?", answer: "coin", miss: "Is a note always worth more than a coin?" },
      /* practice 2: answer in the plan = The Rs 20 note. Eight Rs 2 coins make only Rs 16 */
      { qid: "M1.S2.T3.C8:2", kind: "which", heap: mtHeap("c2 c2 c2 n20 c2 c2 c2 c2 c2"), lots: ["coin", "note"], near: "coins", winMs: 3400,
        choices: [{ id: "coins", label: "The coins" }, { id: "note", label: "The note" }, { id: "same", label: "The same" }],
        say: "Which is more money, eight coins of Rs 2 or one note of Rs 20?", ask: "Which is more money?", answer: "note", miss: "Count the coins two rupees at a time." },
    ],
  },
  {
    n: 2,
    concept: "Counting a group of one note",
    conceptId: "M1.S2.T3.C9", objectiveIds: ["O3"],
    /* the plan's "How much is the whole group?" is question 1 itself; the teach names the act instead */
    says: ["Every note in a group has the same value. Tap the group to lay its notes along the rail."],
    /* tries, as the plan writes it: First rung, from the item: how many notes are in the slot? Second rung, the phase's: what is each one worth? Third rung: the slot is cut to three notes, laid down one at a time along the rail, before the larger group comes back. The number pad stays open. */
    ladder: ["What is each one worth?", "Lay the value down once for each piece, and keep adding."],
    closing: "Many notes of one value are counted by multiplying the number of notes by the value.",
    /* the summary page's row: "You learned: ..." in at most 72 characters */
    learned: "You learned: count a group of one value with one multiplication.",
    /* the traceback for a miss, in one line (it goes into the sidecar) */
    traceback: "The pieces are laid along the rail one at a time while the total climbs, the child's number is drawn as a bar beside the rail, and the reader writes count times value and the amount.",
    items: [
      /* learn ML2: answer in the plan = Rs 450 */
      { qid: "M1.S2.T3.C9:ML2", kind: "group", group: { v: 50, k: "note", n: 9 }, near: 59, winMs: 3600,
        say: "How much money is 9 notes of Rs 50?", ask: "9 notes, each Rs 50. Total?", answer: 450, miss: "How many notes are in the slot?" },
      /* practice 3: answer in the plan = Rs 7000, because 14 times 500 is 7000 */
      { qid: "M1.S2.T3.C9:3", kind: "group", group: { v: 500, k: "note", n: 14 }, near: 514, winMs: 3400,
        say: "What are 14 notes of Rs 500 worth?", ask: "14 notes, each Rs 500. Total?", answer: 7000, miss: "The tied stack holds 10 notes. What are those worth?" },
      /* practice 4: answer in the plan = Rs 135, because 27 times 5 is 135 */
      { qid: "M1.S2.T3.C9:4", kind: "group", group: { v: 5, k: "coin", n: 27 }, near: 27, winMs: 3600,
        say: "A money box holds 27 coins of Rs 5. How much money is that?", ask: "27 coins, each Rs 5. Total?", answer: 135, miss: "Is 27 the number of coins, or the money?" },
    ],
  },
  {
    n: 3,
    concept: "Adding the groups",
    conceptId: "M1.S2.T3.C10", objectiveIds: ["O4"],
    says: ["Each group has its own count and its own value. Slide each group onto the rail."],
    /* tries, as the plan writes it: First rung, from the item: what is the first group worth? Second rung, the phase's: has every group been turned into rupees? Third rung: the tray is cut to two groups, and the child finds each amount before sliding either onto the rail. The number pad stays open. */
    ladder: ["Has every group been turned into rupees?", "Do the multiplying inside each group first. The adding comes last."],
    closing: "Find what each group is worth first, then add the groups.",
    /* the summary page's row: "You learned: ..." in at most 72 characters */
    learned: "You learned: work out each group in rupees, then add.",
    /* the traceback for a miss, in one line (it goes into the sidecar) */
    traceback: "The group cards write each amount, every group slides onto the rail whole while the total climbs to the answer, and the child's number is drawn as a bar beside the rail.",
    items: [
      /* learn ML3: answer in the plan = Rs 710 */
      { qid: "M1.S2.T3.C10:ML3", kind: "total", near: 225, winMs: 3600,
        groups: [{ v: 200, k: "note", n: 3 }, { v: 20, k: "note", n: 4 }, { v: 5, k: "coin", n: 6 }],
        say: "A cash box holds 3 notes of Rs 200, 4 notes of Rs 20 and 6 coins of Rs 5. How much money is in it?", ask: "How much money in all?", answer: 710, miss: "What is the first group worth?" },
      /* practice 5: answer in the plan = Rs 340. The groups are Rs 200, Rs 50, Rs 60 and Rs 30 */
      { qid: "M1.S2.T3.C10:5", kind: "total", near: 280, winMs: 3600,
        groups: [{ v: 200, k: "note", n: 1 }, { v: 50, k: "note", n: 1 }, { v: 20, k: "note", n: 3 }, { v: 10, k: "note", n: 3 }],
        say: "Find the total of these notes: one of Rs 200, one of Rs 50, three of Rs 20 and three of Rs 10.", ask: "What is the total?", answer: 340, miss: "What do the three notes of Rs 20 make?" },
      /* practice 7: answer in the plan = Rs 360. Thirty coins of Rs 10 make Rs 300 and thirty coins of Rs 2 make Rs 60. The question asks for money, not coins */
      { qid: "M1.S2.T3.C10:7", kind: "total", near: 60, winMs: 3400,
        groups: [{ v: 10, k: "coin", n: 30 }, { v: 2, k: "coin", n: 30 }],
        say: "A box holds 60 coins. Half of them are coins of Rs 10, and the rest are coins of Rs 2. What are they all worth?", ask: "How much in the box?", answer: 360, miss: "How many coins of each kind are there?" },
    ],
  },
  {
    n: 4,
    concept: "Is it enough?",
    conceptId: "M1.S2.T3.C11", objectiveIds: ["O4"],
    says: ["Find the total first. Is it short, exactly enough, or more than enough?"],
    /* tries, as the plan writes it: First rung, from the item: what is the total? Second rung, the phase's: where does the total's bar end against the price's? Third rung: the tray is cut to one note laid against a price card of the same value, and the child reads the gauge before the larger tray comes back. The word pad and the number pad stay open. */
    ladder: ["Where does the total's bar end against the other bar?", "Set the two amounts side by side. Which is larger, or are they the same?"],
    closing: "Exactly enough is enough, and when two amounts are the same, neither is more.",
    /* the summary page's row: "You learned: ..." in at most 72 characters */
    learned: "You learned: find the total, then compare it with the price.",
    /* the traceback for a miss, in one line (it goes into the sidecar) */
    traceback: "Every group slides onto the rail, and the gauge lays the total under the price (or the two totals, note for note) from one line and reads short, exactly enough or neither.",
    items: [
      /* learn ML4: answer in the plan = Yes, exactly enough. The money comes to Rs 350, the same as the price */
      { qid: "M1.S2.T3.C11:ML4", kind: "enough", price: 350, what: "class trip", near: "short", winMs: 3800,
        groups: [{ v: 200, k: "note", n: 1 }, { v: 20, k: "note", n: 5 }, { v: 5, k: "coin", n: 10 }],
        choices: [{ id: "short", label: "Short" }, { id: "exact", label: "Exactly enough" }, { id: "more", label: "More than enough" }],
        say: "A class trip costs Rs 350. A child brings one note of Rs 200, five notes of Rs 20 and ten coins of Rs 5. Is that enough?", ask: "Is it enough for the trip?", answer: "exact", miss: "What is the total?" },
      /* practice 6: answer in the plan = No. The money comes to Rs 240, which is Rs 10 short of the price */
      { qid: "M1.S2.T3.C11:6", kind: "enough", price: 250, what: "book", near: "more", winMs: 3800,
        groups: [{ v: 100, k: "note", n: 2 }, { v: 10, k: "coin", n: 4 }],
        choices: [{ id: "short", label: "Short" }, { id: "exact", label: "Exactly enough" }, { id: "more", label: "More than enough" }],
        say: "A book costs Rs 250. A child has two notes of Rs 100 and four coins of Rs 10. Is it enough for the book?", ask: "Is it enough for the book?", answer: "short", miss: "Six pieces tell you nothing yet. What do the two notes make, and what do the four coins?" },
      /* practice 8: answer in the plan = Neither. Both have Rs 1600 */
      { qid: "M1.S2.T3.C11:8", kind: "who", near: "second", winMs: 3800,
        groups: [{ v: 200, k: "note", n: 8 }], other: [{ v: 100, k: "note", n: 16 }],
        choices: [{ id: "first", label: "First child" }, { id: "second", label: "Second child" }, { id: "neither", label: "Neither" }],
        say: "One child has 8 notes of Rs 200. Another has 16 notes of Rs 100. Who has more money?", ask: "Who has more money?", answer: "neither", miss: "More notes need not mean more money. What does each child have?" },
    ],
  },
];

/* The numbers, rows, sizes and targets the working area needs (they go into the sidecar too). */
const MODEL = {
  notes: MT_NOTES, coins: MT_COINS, stackOf: 10,
  tray: { noteSlot: [110, 128], coinSlot: [132, 128], rows: ["notes", "coins"] },
  colours: { rupees: "#0072B2", count: "#56B4E9", note: "pale blue", coin: "steel", rules: "#2B2B2B" },
  rail: "one question at a time the full rail is the group's or the groups' whole amount; its bars carry no amount until the answer",
  gauge: "drawn after the answer only: the price (or the first amount) over the total, both from one near-black line, to one scale",
};

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* judge: is this value right for this item? (an amount compares as a number; a word key by its id) */
const judge = (item: any, v: any) => {
  if (item.parts) return judgeSlotParts(item, v);
  if (typeof item.answer === "number") return leadNumber(v) === item.answer;
  return String(v).trim().toLowerCase() === String(item.answer).trim().toLowerCase();
};
/* oracle: every answer re-derived from the item's own money by counting it out piece by piece
   (repeated addition), a second route that shares no code with judge or the picture */
const oracle = () => PHASES.every((p: any) => p.items.every((it: any) => {
  const countOut = (list: any[]) => { let s = 0; for (const g of list) for (let k = 0; k < g.n; k++) s += g.v; return s; };
  if (it.kind === "which") {
    let notes = 0, coins = 0, many = 0;
    for (const pc of it.heap) { if (pc.k === "note") notes += pc.v; else { coins += pc.v; many += 1; } }
    const want = notes === coins ? "same" : notes > coins ? "note" : many > 1 ? "coins" : "coin";
    return want === it.answer && it.choices.filter((c: any) => c.id === it.answer).length === 1;
  }
  if (it.kind === "group") return countOut([it.group]) === it.answer;
  if (it.kind === "total") return countOut(it.groups) === it.answer;
  if (it.kind === "enough") { const t = countOut(it.groups); return (t < it.price ? "short" : t === it.price ? "exact" : "more") === it.answer; }
  if (it.kind === "who") { const a = countOut(it.groups), b = countOut(it.other); return (a === b ? "neither" : a > b ? "first" : "second") === it.answer; }
  return false;
}));
/* the most likely wrong answer (the item's misconception: 9 + 50, the counts added, the longer pile); judge must reject it */
const nearMiss = (item: any) => (item.near !== undefined ? item.near : typeof item.answer === "number" ? item.answer + 1 : "~");
/* the forms of an answer that no question, hint or ladder line may print (a word key's answer is a choice
   between lots the question itself has to name, so it has no printed form to hide) */
const answerForms = (item: any) => (typeof item.answer === "number" ? [String(item.answer), indian(item.answer), words(item.answer)] : []);
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => item.answer;

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => T.submit(item.answer);
/* the agent's answer(): every answer here is typed (an amount) or a word key, so the runtime gives it */
const answer = (_item: any, _v: any) => undefined;
/* the agent's check() before Enter: nothing waits on the working area */
const check = () => undefined;

/* ── drawing helpers (called, never mounted) ─────────────────────────────────────────────── */

/* a play note, top-left at x,y */
function mtNoteG(key: any, x: number, y: number, w: number, h: number, v: number, o: any = {}) {
  return (
    <g key={key}>
      <rect x={x} y={y} width={w} height={h} rx={7} fill={MT_NOTE} stroke={o.ring || MT_NOTE_EDGE} strokeWidth={o.ring ? 6 : 2} filter="url(#fShadowSoft)" />
      {o.label !== false && <text x={x + w / 2} y={y + h / 2 + (o.fs || T.micro) * 0.36} textAnchor="middle" fontSize={o.fs || T.micro} fontWeight={700} fill={MT_BLUE_INK}>{mtRs(v)}</text>}
    </g>
  );
}
/* a coin's value on two lines ("Rs" over the number), as a coin carries it, so it fits the disc */
function mtCoinText(cx: number, cy: number, v: number, fs: number = T.micro) {
  return (
    <g>
      <text x={cx} y={cy - fs * 0.12} textAnchor="middle" fontSize={fs} fontWeight={700} fill={MT_BLUE_INK}>{mtRupee.trim()}</text>
      <text x={cx} y={cy + fs * 0.82} textAnchor="middle" fontSize={fs} fontWeight={700} fill={MT_BLUE_INK}>{indian(v)}</text>
    </g>
  );
}
/* a play coin, centred at cx,cy */
function mtCoinG(key: any, cx: number, cy: number, r: number, v: number, o: any = {}) {
  return (
    <g key={key}>
      <circle cx={cx} cy={cy} r={r} fill={MT_STEEL} stroke={o.ring || MT_STEEL_EDGE} strokeWidth={o.ring ? 6 : 2} filter="url(#fShadowSoft)" />
      {o.label !== false && mtCoinText(cx, cy, v, o.fs)}
    </g>
  );
}
/* the sky-blue count on a tied stack of ten */
function mtTen(key: any, cx: number, cy: number) {
  return (
    <g key={key}>
      <circle cx={cx} cy={cy} r={22} fill="#FFFFFF" stroke={MT_SKY} strokeWidth={3} />
      <text x={cx} y={cy + 10} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={MT_SKY_INK}>10</text>
    </g>
  );
}
/* ten of one value tied with a near-black band (inside a slot only, where every piece has one value) */
function mtStackG(key: any, k: string, x: number, y: number, w: number, h: number, v: number, lift: number = 0) {
  if (k === "note") return (
    <g key={key}>
      {[8, 4].map((d) => <rect key={d} x={x + d} y={y - d} width={w} height={h} rx={7} fill={MT_NOTE} stroke={MT_NOTE_EDGE} strokeWidth={2} />)}
      <rect x={x} y={y} width={w} height={h} rx={7} fill={MT_NOTE} stroke={MT_NOTE_EDGE} strokeWidth={2} />
      <rect x={x + 7} y={y - 3} width={10} height={h + 6} rx={3} fill={MT_LINE} />
      <text x={x + 18 + (w - 18) / 2} y={y + h / 2 + 10} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={MT_BLUE_INK}>{mtRs(v)}</text>
      {/* the count sits clear above the stack's top-right corner, off every printed value */}
      {mtTen("t", x + w - 20, y - 34 - lift)}
    </g>
  );
  const r = w / 2, cx = x + r, cy = y + r;
  return (
    <g key={key}>
      {[8, 4].map((d) => <circle key={d} cx={cx + d} cy={cy - d} r={r} fill={MT_STEEL} stroke={MT_STEEL_EDGE} strokeWidth={2} />)}
      <circle cx={cx} cy={cy} r={r} fill={MT_STEEL} stroke={MT_LINE} strokeWidth={6} />
      {mtCoinText(cx, cy, v)}
      {mtTen("t", cx + r * 0.55, cy - r - 30 - lift)}
    </g>
  );
}
/* a group's pieces: tied stacks of ten first (only past ten), then the loose ones */
const mtCells = (n: number) => {
  const st = n > 10 ? Math.floor(n / 10) : 0;
  return [...Array(st).fill(10), ...Array(n - 10 * st).fill(1)].map((c: number) => ({ c }));
};
/* where each piece of a group lies inside a box: rows, and overlapping only when the box is small */
function mtPileLayout(box: any, k: string, cells: any[], big: boolean, topAt?: number) {
  const pw = k === "note" ? (big ? 124 : 116) : big ? 72 : 60;
  const ph = k === "note" ? (big ? 56 : 48) : pw;
  const stacks = cells.some((c: any) => c.c === 10);
  const gx = k === "coin" ? (stacks ? 18 : 6) : 12, gy = stacks ? 44 : 22;
  const m = cells.length, aw = box.w - 24;
  let rows = 1;
  while (rows < 3 && Math.ceil(m / rows) * (pw + gx) - gx > aw) rows++;
  const per = Math.ceil(m / rows);
  /* room for a tied stack's count above it (topAt: one reserve for trays set side by side, so their rows line up) */
  const top = topAt !== undefined ? topAt : stacks ? 58 : 0;
  const dx = per > 1 ? Math.min(pw + gx, (aw - pw) / (per - 1)) : 0;
  const dy = rows > 1 ? Math.min(ph + gy, (box.h - top - ph) / (rows - 1)) : 0;
  const usedW = pw + dx * (per - 1), usedH = ph + dy * (rows - 1);
  const x0 = box.x + (box.w - usedW) / 2, y0 = box.y + top + (box.h - top - usedH) / 2;
  return cells.map((c: any, j: number) => {
    const col = j % per, row = Math.floor(j / per);
    const openRight = dx >= pw || col === per - 1 || j === m - 1;
    const openBelow = dy >= ph || j + per >= m;
    return { ...c, x: x0 + col * dx, y: y0 + row * dy, w: pw, h: ph, label: openRight && openBelow };
  });
}
function mtPieceAt(key: any, k: string, p: any, v: number, lift: number = 0) {
  if (p.c === 10) return mtStackG(key, k, p.x, p.y, p.w, p.h, v, lift);
  return k === "note" ? mtNoteG(key, p.x, p.y, p.w, p.h, v, { label: p.label }) : mtCoinG(key, p.x + p.w / 2, p.y + p.h / 2, p.w / 2, v, { label: p.label });
}
/* the empty place a laid piece leaves in its box */
function mtSpotG(key: any, k: string, p: any) {
  return k === "note"
    ? <rect key={key} x={p.x} y={p.y} width={p.w} height={p.h} rx={7} fill="none" stroke={MT_NOTE_EDGE} strokeWidth={2} strokeDasharray="8 6" />
    : <circle key={key} cx={p.x + p.w / 2} cy={p.y + p.h / 2} r={p.w / 2} fill="none" stroke={MT_STEEL_EDGE} strokeWidth={2} strokeDasharray="8 6" />;
}
/* a row of short texts, each its own label: [{ t, c, w? }] */
function mtRow(key: string, x: number, y: number, parts: any[], size: number, anchor: string = "start") {
  const wOf = (s: string) => s.length * size * 0.62;
  const gap = size * 0.4;
  const total = parts.reduce((a: number, p: any) => a + wOf(p.t), 0) + gap * (parts.length - 1);
  let cx = anchor === "middle" ? x - total / 2 : anchor === "end" ? x - total : x;
  return parts.map((p: any, j: number) => {
    const el = <text key={key + j} x={cx} y={y} fontSize={size} fontWeight={p.w || 700} fill={p.c}>{p.t}</text>;
    cx += wOf(p.t) + gap;
    return el;
  });
}
const mtRowW = (parts: any[], size: number) => parts.reduce((a: number, p: any) => a + p.t.length * size * 0.62, 0) + size * 0.4 * (parts.length - 1);
/* the sum rail: a track (the panel colour on a near-black baseline, never an answer box) that takes
   amounts laid end to end, deep blue, to one scale (full = the whole rail). A bar too short for its label
   carries it above the rail when `above` is set (the amounts, after the answer) */
function mtRailG(key: any, C: any, box: any, segs: any[], full: number, above: boolean = false) {
  const inner = box.w - 8, sc = full > 0 ? inner / full : 0;
  let acc = 0;
  return (
    <g key={key} pointerEvents="none">
      <rect x={box.x} y={box.y} width={box.w} height={box.h} rx={12} fill={tint(C.panel, 0.35)} stroke={C.rule} strokeWidth={2} />
      <rect x={box.x + 6} y={box.y + box.h - 9} width={box.w - 12} height={3} rx={1.5} fill={MT_LINE} />
      <rect x={box.x + 6} y={box.y + box.h - 19} width={3} height={13} fill={MT_LINE} />
      <rect x={box.x + box.w - 9} y={box.y + box.h - 19} width={3} height={13} fill={MT_LINE} />
      {segs.map((sg: any, j: number) => {
        const x = box.x + 4 + acc * sc, w = Math.max(2, sg.a * sc - 2);
        acc += sg.a;
        const t = sg.t || "", fits = t && t.length * T.micro * 0.56 + 10 <= w;
        return (
          <g key={j}>
            <rect x={x} y={box.y + 6} width={w} height={box.h - 18} rx={4} fill={MT_BLUE} />
            {fits && <text x={x + w / 2} y={box.y + (box.h - 12) / 2 + 10} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill="#FFFFFF">{t}</text>}
            {!fits && t && above && <text x={x + w / 2} y={box.y - 8} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={MT_BLUE_INK}>{t}</text>}
          </g>
        );
      })}
    </g>
  );
}
/* the child's own number beside the rail, unmarked: an amount is a tinted bar to the rail's scale; a
   count typed as money (count: { n, word }) is a row of sky-blue count dots, "60 coins", never a money bar */
function mtMineG(key: any, box: any, v: number, full: number, count?: any) {
  if (count) {
    /* dots big enough to count: one row up to 30, then two rows (60 coins read as two rows of 30) */
    const rows = count.n > 30 ? 2 : 1, per = Math.ceil(count.n / rows);
    const sp = Math.min(24, (box.w - 220) / Math.max(1, per)), r = Math.max(5, Math.min(8, sp * 0.36));
    const rowY = (k: number) => (rows > 1 ? box.y + box.h / 2 - 11 + k * 22 : box.y + box.h / 2);
    return (
      <g key={key} pointerEvents="none">
        {Array.from({ length: count.n }, (_x: any, i: number) => (
          <circle key={i} cx={box.x + 10 + sp * (i % per) + sp / 2} cy={rowY(Math.floor(i / per))} r={r} fill={MT_SKY} stroke={MT_SKY_INK} strokeWidth={1} />
        ))}
        <text x={box.x + 10 + sp * per + 16} y={box.y + box.h / 2 + 11} fontSize={T.label} fontWeight={700} fill={MT_SKY_INK}>{count.n + " " + count.word}</text>
      </g>
    );
  }
  const sc = full > 0 ? (box.w - 8) / full : 0;
  const len = Math.max(8, Math.min(v * sc, box.w));
  /* the child's amount after the bar, or inside its end when a long number would run past the area */
  const t = mtRs(v), after = box.x + 4 + len + 14 + t.length * T.label * 0.6 <= 1076;
  return (
    <g key={key} pointerEvents="none">
      <rect x={box.x + 4} y={box.y} width={len} height={box.h} rx={6} fill={mix(MT_LINE, "#FFFFFF", 0.84)} stroke={MT_LINE} strokeWidth={2.5} strokeDasharray="10 7" />
      <text x={after ? box.x + 4 + len + 14 : box.x + 4 + len - 14} y={box.y + box.h / 2 + 11} textAnchor={after ? "start" : "end"} fontSize={T.label} fontWeight={700} fill={MT_LINE}>{t}</text>
    </g>
  );
}
/* the enough gauge: each lane's money as bars from one near-black line, all to one scale.
   lanes: [{ name, segs: [amounts], price? }]; o: { wide, bars, glow, tag, word, gap, tx } */
function mtGaugeG(key: any, C: any, box: any, lanes: any[], o: any) {
  const tx = o.tx || ((v: any) => v);
  const wide = !!o.wide;
  const fs = o.fs || T.micro;
  const x0 = wide ? box.x + 150 : box.x + 22;
  const maxLen = wide ? box.w - 190 : box.w - 50;
  /* a lane drawn solid is one bar; otherwise each piece or group is its own segment */
  const segsOf = (l: any) => (o.solid ? [l.segs.reduce((a: number, b: number) => a + b, 0)] : l.segs);
  const tot = lanes.map((l: any) => l.segs.reduce((a: number, b: number) => a + b, 0));
  const sc = maxLen / Math.max(1, ...tot);
  const barY = (j: number) => box.y + (o.top || (wide ? 16 : 52)) + j * (o.pitch || (wide ? 52 : 100));
  const bh = o.bh || (wide ? 40 : 44);
  const wordY = box.y + box.h - (o.wordPad || 22);
  const quiet = mix(C.ink, "#FFFFFF", 0.3);
  return (
    <g key={key} pointerEvents="none">
      <rect x={box.x} y={box.y} width={box.w} height={box.h} rx={16} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={2} />
      <rect x={x0 - 4} y={barY(0) - 6} width={4} height={barY(lanes.length - 1) + bh + 12 - barY(0)} fill={MT_LINE} />
      {lanes.map((l: any, j: number) => {
        const y = barY(j), len = tot[j] * sc;
        let acc = 0;
        /* the lane's total goes after its bar when there is room, else inside it on a plain patch */
        const label = mtRs(tot[j]), lw = label.length * fs * 0.6;
        const inside = x0 + len + 12 + label.length * fs * 0.56 > box.x + box.w - 4 && lw + 20 <= len;
        return (
          <g key={j}>
            {/* the lane's name stands clear of the near-black line: left of it on a wide gauge, above the bar
                and 10 in from the line on a narrow one */}
            <text x={wide ? x0 - 18 : x0 + 10} y={wide ? y + bh / 2 + fs * 0.36 : y - 12} textAnchor={wide ? "end" : "start"} fontSize={fs} fontWeight={600} fill={quiet}>{tx(l.name)}</text>
            {o.bars && segsOf(l).map((a: number, q: number) => {
              const x = x0 + acc * sc, w = Math.max(2, a * sc - 2);
              acc += a;
              return <rect key={q} x={x} y={y} width={w} height={bh} rx={4} fill={l.price ? MT_NOTE : MT_BLUE} stroke={l.price ? MT_BLUE : "none"} strokeWidth={2} />;
            })}
            {/* the lane's total sits on a plain patch of its bar, so no separator runs through it */}
            {o.bars && tot[j] > 0 && inside && !l.price && segsOf(l).length > 1 &&
              <rect x={x0 + len - lw - 22} y={y} width={lw + 20} height={bh} rx={4} fill={MT_BLUE} />}
            {o.bars && tot[j] > 0 && <text x={inside ? x0 + len - 12 : x0 + len + 12} y={y + bh / 2 + fs * 0.36} textAnchor={inside ? "end" : "start"} fontSize={fs} fontWeight={700}
              fill={l.price || !inside ? MT_BLUE_INK : "#FFFFFF"}>{label}</text>}
            {o.bars && o.glow === j && <rect x={x0 - 6} y={y - 6} width={len + 10} height={bh + 12} rx={8} fill="none" stroke={C.accent} strokeWidth={4} />}
            {o.tag && o.tag.lane === j && <text x={box.x + box.w - 18} y={y - 12} textAnchor="end" fontSize={fs} fontWeight={700} fill={C.ink}>{tx(o.tag.text)}</text>}
          </g>
        );
      })}
      {o.bars && o.gap && (() => {
        const a = x0 + o.gap.from * sc, b = x0 + o.gap.to * sc, y = barY(1) + bh + 4;
        return (
          <g>
            <path d={`M${a} ${y} v10 H${b} v-10`} fill="none" stroke={MT_LINE} strokeWidth={3} />
            <text x={(a + b) / 2} y={wordY} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={MT_LINE}>{mtRs(o.gap.to - o.gap.from)}</text>
          </g>
        );
      })()}
      {/* note for note: under each note of the first lane, a bracket over the two notes of the second
          that make the same money, and nothing left over at either end */}
      {o.bars && o.pairs && (() => {
        const per = o.pairs.each, y = barY(1) + bh + 4;
        return (
          <g>
            {Array.from({ length: o.pairs.n }, (_x: any, k: number) => {
              const a = x0 + k * per * sc + 3, b = x0 + (k + 1) * per * sc - 5;
              return <path key={k} d={`M${a} ${y} v10 H${b} v-10`} fill="none" stroke={MT_LINE} strokeWidth={3} />;
            })}
            <text x={box.x + box.w - 18} y={wordY} textAnchor="end" fontSize={T.label} fontWeight={700} fill={MT_SKY_INK}>{o.pairs.n + " " + tx("pairs")}</text>
          </g>
        );
      })()}
      {o.word && (() => {
        /* a narrow gauge writes a long reading on two lines rather than past its edge */
        const w = tx(o.word), one = w.length * T.label * 0.6 <= box.x + box.w - 16 - x0;
        const lines = one ? [w] : wrapText(w, 10).slice(0, 2);
        const size = one ? T.label : T.micro;
        return lines.map((ln: string, q: number) => (
          <text key={q} x={x0 + (wide ? 0 : 10)} y={wordY - (lines.length - 1 - q) * 30} fontSize={size} fontWeight={700} fill={C.ink}>{ln}</text>
        ));
      })()}
    </g>
  );
}
/* the tray's slot for a piece (phase 1 and free play): notes along the top row, coins along the bottom */
/* big = phase 1, which has the room: a taller heap and taller slots; free play keeps the smaller set,
   because its rail and reader need the foot of the area */
const mtSlotRect = (pc: any, big: boolean = false) => (pc.k === "note"
  ? { x: MT_NOTES.indexOf(pc.v) * 136, y: big ? 128 : 112, w: 128, h: big ? 150 : 128 }
  : { x: MT_COINS.indexOf(pc.v) * 164, y: big ? 290 : 252, w: 152, h: big ? 150 : 128 });
const MT_TRAY_W = 808;          /* the tray's width; the gauge stands to its right */
/* the heap: every piece separate, none overlapping (x, y = centre; hw, hh = the finger box). With
   `order` (phase 1) the pieces lie as the question's two lots, each in its own patch with a gap between */
function mtHeapLayout(heap: any[], width: number, big: boolean, order: any) {
  const hw = (pc: any) => (pc.k === "note" ? (big ? 144 : 124) : big ? 92 : 76);
  const hh = big ? 104 : 80, cy0 = big ? 58 : 50;
  const jit = big ? [0, 3, -3, 4, -4, 2] : [0, 5, -4, 6, -5, 3];
  const all = heap.map((pc: any, i: number) => ({ pc, i }));
  const lotsIn = order ? order.map((k: string) => all.filter((e: any) => e.pc.k === k)) : [all];
  const pad = order ? 14 : 12, lotGap = order ? 40 : 0;
  const inner = (g: any[], gp: number) => g.reduce((a: number, e: any) => a + hw(e.pc), 0) + gp * Math.max(0, g.length - 1);
  const totalW = (gp: number) => lotsIn.reduce((a: number, g: any[]) => a + inner(g, gp) + 2 * pad, 0) + lotGap * (lotsIn.length - 1);
  let gap = 16;
  if (!order) gap = heap.length > 1 ? Math.min(40, (width - 2 * pad - inner(all, 0)) / (heap.length - 1)) : 0;
  else while (gap > 4 && totalW(gap) > width) gap -= 2;
  let x = order ? (width - totalW(gap)) / 2 : 0;
  const pos: any[] = [], lots: any[] = [];
  lotsIn.forEach((g: any[]) => {
    const w = order ? inner(g, gap) + 2 * pad : width;
    lots.push({ x, w });
    let px = order ? x + pad : (width - inner(all, gap)) / 2;
    g.forEach((e: any) => {
      const w2 = hw(e.pc);
      pos[e.i] = { x: px + w2 / 2, y: cy0 + jit[e.i % jit.length], hw: w2, hh };
      px += w2 + gap;
    });
    x += w + lotGap;
  });
  return { pos, lots, h: big ? 116 : 100 };
}
/* the reading the gauge settles on: the answer keys' own words */
const MT_READ: any = MT_SHOWN;
const mtItemOf = (kind: string, i: number) => {
  for (const p of PHASES as any[]) { const it = p.items[i]; if (it && it.kind === kind) return it; }
  return null;
};
const mtBlank = (ik: string) => ({ ik, placed: [] as number[], lit: -1, laid: 0, rail: [] as number[], show: null as any, heapNo: 0, price: 1, pick: null as any });

/* ── the working area: 1086 x 528, origin at its top-left ────────────────────────────────────
   Countable things use CONTENT colours (url(#gHundred|gTen|gOne|gBead|gPointer)); coloured numerals
   and words use a deeper ink, shade(colour, 0.25), so they read at 4.5:1. Type uses T.* only.
   Pieces: drag = useDrag(onDrop) then {...control(id, label), ...drag.bind(pay), ...drag.keys(pay)};
   taps = <Hit id x y w h onPress label />. One <Invite/> marks the one thing to touch.
   Nothing is written here that the voice already says. `wrong` = { value, tries } after a miss:
   lock, redraw the mathematics in steps (the traceback), unlock; never mark it, never reset it.
   stage === "free" is Free play (the plan's writeup.freePlay): no target, every control unlocked. */
function Work({ phase, n, item, index, stage, wrong, typed, api, MODEL, lang = "en", tx = (v: any) => v }: any) {
  /* every English word the picture draws goes through tx("...") (its key is added to TR) */
  mtSetLang(lang);
  const C = api.C;
  const tl = useTimeline();   /* the traceback and the win */
  const free = stage === "free";
  const kind = free ? "free" : item ? item.kind : "";
  const ik = free ? "free" : n + ":" + index;
  /* the child's own work for this question: pieces sorted, pieces laid, groups on the rail, and `show`,
     the traceback or the win drawn over it; a new question starts clean */
  const [st, setSt] = useState<any>(() => mtBlank(ik));
  const s = st.ik === ik ? st : mtBlank(ik);
  const put = (patch: any) => setSt((o: any) => {
    const b = o.ik === ik ? o : mtBlank(ik);
    return { ...b, ...(typeof patch === "function" ? patch(b) : patch) };
  });
  const held = useRef(false);
  const lockPad = (b: boolean) => { held.current = b; api.lock(b); };
  /* how long a piece dropped in the wrong slot keeps its value lit (a pause, not a motion: it stays
     under reduced motion too) */
  const litTimer = useRef<any>(null);
  const unlight = () => { if (litTimer.current) { clearTimeout(litTimer.current); litTimer.current = null; } };
  useEffect(() => () => { tl.stop(); unlight(); if (held.current) { held.current = false; api.lock(false); } }, [ik]);

  /* Enter always answers from the slot: nothing on the working area waits for it */
  api.onEnter(null);

  const act = (stage === "ask" || stage === "teach" || free) && !tl.busy;
  const shown = s.show;
  const step = shown ? shown.step : -1;
  const trace = !!shown && shown.mode === "trace";
  const mine = trace && wrong && item && typeof item.answer === "number" ? Number(leadNumber(wrong.value)) : NaN;
  const quiet = mix(C.ink, "#FFFFFF", 0.3);

  /* phase 1 and free play: a heap above the tray */
  const heap: any[] = free ? MT_FREE_HEAPS[s.heapNo % MT_FREE_HEAPS.length] : kind === "which" ? item.heap : [];
  const big1 = kind === "which";
  const heapL = mtHeapLayout(heap, free ? 960 : 1086, big1, big1 ? item.lots : null);
  const heapPos = heapL.pos;
  /* phase 2: one group, laid along the rail a piece (or a tied ten) at a time */
  const grp = kind === "group" ? item.group : null;
  const cells2 = grp ? mtCells(grp.n) : [];
  const counted = cells2.slice(0, s.laid).reduce((a: number, c: any) => a + c.c, 0);
  /* phases 3 and 4: groups slid onto the rail */
  const groups: any[] = kind === "total" || kind === "enough" || kind === "who" ? item.groups : [];
  const railY = kind === "enough" ? 330 : 364;

  const place = (i: number) => {
    api.sfx.tick();
    put((o: any) => ({ placed: o.placed.includes(i) ? o.placed : [...o.placed, i], lit: -1, pick: free ? { k: heap[i].k, v: heap[i].v } : o.pick }));
  };
  /* a piece settles only in the slot for its value; anywhere else it goes back to the heap, its value lit.
     A tap (or Enter) puts it where it belongs. */
  const dropPiece = (i: number, p: any, moved: boolean) => {
    const pc = heap[i];
    if (!pc || s.placed.includes(i)) return;
    /* the slot it was dropped on: its own, or the same value's slot for the other kind (a Rs 20 coin on
       the Rs 20 note slot is worth the same, so it goes on to its own kind's slot); a wrong value bounces */
    const inside = (r: any, m: number) => isFinite(p.x) && isFinite(p.y) && p.x > r.x - m && p.x < r.x + r.w + m && p.y > r.y - m && p.y < r.y + r.h + m;
    const own = inside(mtSlotRect(pc, big1), 14);
    const other = inside(mtSlotRect({ k: pc.k === "note" ? "coin" : "note", v: pc.v }, big1), 4)
      && (pc.k === "note" ? MT_COINS : MT_NOTES).includes(pc.v);
    if (!moved || own || other) { unlight(); place(i); return; }
    unlight();
    put({ lit: i });
    litTimer.current = setTimeout(() => { litTimer.current = null; put({ lit: -1 }); }, 1800);
  };
  /* a group goes onto the rail whole, when it is dropped near the rail or tapped */
  const dropGroup = (g: number, p: any, moved: boolean) => {
    if (s.rail.includes(g)) return;
    if (moved && isFinite(p.y) && p.y < railY - 70) return;
    api.sfx.tick();
    put((o: any) => ({ rail: o.rail.includes(g) ? o.rail : [...o.rail, g] }));
  };
  const layNext = () => {
    if (!act || s.laid >= cells2.length) return;
    api.sfx.tick();
    put((o: any) => ({ laid: Math.min(cells2.length, o.laid + 1) }));
  };
  const drag = useDrag((pay: any, p: any, moved: boolean) => {
    if (!act || !pay) return;
    if (pay.t === "piece") dropPiece(pay.i, p, moved);
    if (pay.t === "group") dropGroup(pay.g, p, moved);
  });
  const dragging = drag.drag && drag.drag.moved ? drag.drag : null;

  /* the traceback and the win redraw the maths in steps and end on the whole right answer */
  const reveal = (mode: string) => {
    const S: any[] = [];
    const slow = mode === "trace" ? 1 : 0.7;
    const at = (ms: number, f: any) => S.push([Math.round(ms * slow), f]);
    const show = (k: number) => ({ show: { mode, step: k } });
    if (kind === "which") {
      at(250, () => put(show(0)));
      heap.forEach((_pc: any, i: number) => {
        if (!s.placed.includes(i)) at(240, () => put((o: any) => ({ placed: o.placed.includes(i) ? o.placed : [...o.placed, i], lit: -1 })));
      });
      at(500, () => put(show(1)));
      at(600, () => put(show(2)));
      at(300, () => put(show(3)));
    } else if (kind === "group") {
      at(250, () => put({ ...show(0), laid: 0 }));
      cells2.forEach((_c: any, j: number) => at(j === cells2.length - 1 ? 500 : 320, () => put({ ...show(1), laid: j + 1 })));
      at(300, () => put(show(2)));
    } else if (kind === "total" || kind === "enough") {
      at(250, () => put({ ...show(0), rail: [] }));
      groups.forEach((_g: any, j: number) => at(480, () => put((o: any) => ({ ...show(1), rail: [...o.rail.filter((x: number) => x !== j), j] }))));
      at(400, () => put(show(2)));
      if (kind === "enough") { at(600, () => put(show(3))); at(300, () => put(show(4))); }
    } else if (kind === "who") {
      at(300, () => put(show(2)));
      at(700, () => put(show(3)));
      at(300, () => put(show(4)));
    }
    return S;
  };
  useEffect(() => {
    if (free || !wrong || stage !== "ask") return;
    lockPad(true);
    tl.run(reveal("trace"), () => lockPad(false));
  }, [wrong]);
  useEffect(() => {
    if (free || stage !== "win") return;
    if (s.show) { put({ show: { mode: "win", step: 9 } }); return; }
    tl.run(reveal("win"));
  }, [stage, ik]);

  /* what the host and the agent read back (toolApi.getState): no amount before it is answered */
  const done = stage === "win" || stage === "idle";
  const shared: any = { phase: free ? "free" : n };
  if (kind === "which" || free) {
    shared.heap = heap.length - s.placed.length;
    shared.slots = s.placed.map((i: number) => heap[i].k + " " + heap[i].v);
  }
  if (grp) { shared.slots = [{ value: grp.v, kind: grp.k, count: grp.n }]; shared.counted = counted; }
  if (groups.length) { shared.slots = groups.map((g: any) => ({ value: g.v, kind: g.k, count: g.n })); shared.onRail = s.rail.length; }
  if (kind === "who") shared.other = item.other.map((g: any) => ({ value: g.v, kind: g.k, count: g.n }));
  shared.price = kind === "enough" ? item.price : null;
  shared.groupAmounts = done && groups.length ? groups.map((g: any) => g.v * g.n) : null;
  shared.total = done ? (grp ? grp.v * grp.n : groups.length ? mtAmount(groups) : null) : null;
  shared.otherTotal = done && kind === "who" ? mtAmount(item.other) : null;
  shared.reading = done && (kind === "enough" || kind === "who") ? MT_READ[item.answer] : null;
  if (free) {
    /* free play has no answer to keep back: the agent reads the gauge as the child sees it */
    const fp = MT_FREE_PRICES[s.price % MT_FREE_PRICES.length];
    const amounts = [...MT_NOTES.map((v: number) => ({ k: "note", v })), ...MT_COINS.map((v: number) => ({ k: "coin", v }))]
      .map((sl: any) => s.placed.filter((i: number) => heap[i].k === sl.k && heap[i].v === sl.v).length * sl.v).filter((a: number) => a > 0);
    const ft = amounts.reduce((a: number, b: number) => a + b, 0);
    shared.price = fp;
    shared.groupAmounts = amounts;
    shared.total = ft;
    shared.reading = ft > 0 ? (ft < fp ? MT_READ.short : ft === fp ? MT_READ.exact : MT_READ.more) : null;
  }
  api.share(shared);

  /* the running count: pieces sorted, notes counted, groups added (never a score, never counting down) */
  const runs = (label: string, a: number, b: number) => (
    <g data-zone="runs" pointerEvents="none">
      <rect x={0} y={-94} width={330} height={76} rx={RAD.panel} fill={tint(C.panel, 0.45)} stroke={C.rule} strokeWidth={2} />
      <text x={24} y={-44} fontSize={T.label} fontWeight={600} fill={quiet}>{tx(label)}</text>
      <text x={306} y={-42} textAnchor="end" fontSize={T.prompt} fontWeight={700} fill={C.ink}>{a + " / " + b}</text>
    </g>
  );
  /* "3 × Rs 200": the count in sky blue, the value in deep blue, one label */
  const expr = (key: string, x: number, y: number, cnt: number, v: number, size: number, anchor: string = "start") => (
    <text key={key} x={x} y={y} textAnchor={anchor} fontSize={size} fontWeight={700}>
      <tspan fill={MT_SKY_INK}>{cnt + " × "}</tspan><tspan fill={MT_BLUE_INK}>{mtRs(v)}</tspan>
    </text>
  );
  const exprW = (cnt: number, v: number, size: number) => (String(cnt).length + 3 + mtRs(v).length) * size * 0.56;

  /* ── the tray and the heap (phase 1, free play) ── */
  const trayEls = (hits: boolean) => [...MT_NOTES.map((v: number) => ({ k: "note", v })), ...MT_COINS.map((v: number) => ({ k: "coin", v }))].map((sl: any) => {
    const r = mtSlotRect(sl, big1);
    const inSlot = s.placed.filter((i: number) => heap[i] && heap[i].k === sl.k && heap[i].v === sl.v);
    const m = inSlot.length;
    const picked = free && s.pick && s.pick.k === sl.k && s.pick.v === sl.v;
    /* a piece dropped in the wrong place lights its own slot while it goes back */
    const litHere = s.lit >= 0 && heap[s.lit] && heap[s.lit].k === sl.k && heap[s.lit].v === sl.v;
    /* phase 1's slots are taller: the value at 32, the pieces lower and larger */
    const top = big1 ? 12 : 0, cr = big1 ? 34 : 30, lf = big1 ? T.label : T.micro;
    return (
      <g key={"slot-" + sl.k + sl.v}>
        <rect x={r.x} y={r.y} width={r.w} height={r.h} rx={14} fill={litHere ? tint(MT_BLUE, 0.88) : "#FFFFFF"}
          stroke={litHere ? MT_BLUE : picked ? C.accent : MT_LINE} strokeWidth={litHere ? 5 : picked ? 4 : 2} />
        <text x={r.x + 12} y={r.y + 34 + (big1 ? 2 : 0)} fontSize={lf} fontWeight={700} fill={MT_BLUE_INK}>{mtRs(sl.v)}</text>
        {m === 0 && (sl.k === "note"
          ? <rect x={r.x + 8} y={r.y + 58 + top} width={112} height={46} rx={7} fill="none" stroke={MT_NOTE_EDGE} strokeWidth={2} strokeDasharray="8 6" />
          : <circle cx={r.x + r.w / 2} cy={r.y + 84 + top} r={cr} fill="none" stroke={MT_STEEL_EDGE} strokeWidth={2} strokeDasharray="8 6" />)}
        {inSlot.map((i: number, j: number) => {
          if (sl.k === "note") {
            const dy = m > 1 ? Math.min(10, 24 / (m - 1)) : 0;
            return mtNoteG("p" + i, r.x + 8, r.y + 52 + top + j * dy, 112, 46, sl.v, { label: j === m - 1 });
          }
          const rows = m > 3 ? 2 : 1, per = Math.ceil(m / rows);
          const col = j % per, row = Math.floor(j / per);
          const dx = per > 1 ? Math.min(64, (r.w - 24 - 2 * cr) / (per - 1)) : 0;
          const x0 = r.x + (r.w - (2 * cr + dx * (per - 1))) / 2 + cr;
          const cy = big1 ? r.y + (rows > 1 ? 78 + row * 26 : 94) : r.y + (rows > 1 ? 74 + row * 24 : 84);
          return mtCoinG("p" + i, x0 + col * dx, cy, cr, sl.v, { label: j === m - 1 });
        })}
        {hits && m > 0 && <Hit id={"slot-" + sl.k + "-" + sl.v} x={r.x} y={r.y} w={r.w} h={r.h} onPress={() => put({ pick: { k: sl.k, v: sl.v } })}
          label={"read the " + sl.k + "s of " + mtRs(sl.v)} />}
      </g>
    );
  });
  const heapEls = () => heap.map((pc: any, i: number) => {
    if (s.placed.includes(i)) return null;
    const hp = heapPos[i];
    const mine2 = dragging && dragging.payload && dragging.payload.t === "piece" && dragging.payload.i === i;
    const cx = mine2 ? dragging.x : hp.x, cy = mine2 ? dragging.y : hp.y;
    const ring = s.lit === i ? MT_BLUE : undefined;
    const label = (pc.k === "note" ? "note of " : "coin of ") + mtRs(pc.v);
    return (
      <g key={"pc" + i} {...(act ? { ...control("piece-" + i, label), ...drag.bind({ t: "piece", i }), ...drag.keys({ t: "piece", i }) } : {})}>
        <rect x={cx - hp.hw / 2} y={cy - hp.hh / 2} width={hp.hw} height={hp.hh} fill="transparent" />
        {/* a piece in the hand lifts a little */}
        <g filter={mine2 ? "url(#fLift)" : undefined} transform={mine2 ? `translate(${cx} ${cy}) scale(1.06) translate(${-cx} ${-cy})` : undefined}>
          {pc.k === "note"
            ? (big1 ? mtNoteG("n", cx - 68, cy - 31, 136, 62, pc.v, { ring, fs: T.label }) : mtNoteG("n", cx - 60, cy - 27, 120, 54, pc.v, { ring }))
            : mtCoinG("c", cx, cy, big1 ? 40 : 34, pc.v, { ring, fs: big1 ? T.label : T.micro })}
        </g>
      </g>
    );
  });
  const heapNext = heap.findIndex((_pc: any, i: number) => !s.placed.includes(i));
  /* the one invite, a ring the shape of the piece or box it invites, drawn behind it so it never crosses
     a printed value */
  const pulseRect = (x: number, y: number, w: number, h: number, rx: number = 12) =>
    <rect className="c4-pulse" x={x} y={y} width={w} height={h} rx={rx} fill="none" stroke={C.accent} strokeWidth={5} pointerEvents="none" />;
  const heapInvite = () => {
    if (!act || shown || heapNext < 0 || s.lit >= 0) return null;
    const hp = heapPos[heapNext], pc = heap[heapNext];
    if (pc.k === "coin") return <Invite x={hp.x} y={hp.y} r={(big1 ? 40 : 34) + 9} C={C} />;
    const w = big1 ? 136 : 120, h = big1 ? 62 : 54;
    return pulseRect(hp.x - w / 2 - 9, hp.y - h / 2 - 9, w + 18, h + 18, 12);
  };
  /* the child's number, when it is the count of the pieces typed as money, is drawn as that count */
  const pieceCount = grp ? grp.n : groups.reduce((a: number, g: any) => a + g.n, 0);
  const countWord = grp ? (grp.k === "note" ? "notes" : "coins")
    : groups.every((g: any) => g.k === "coin") ? "coins" : groups.every((g: any) => g.k === "note") ? "notes" : "pieces";
  const mineCount = isFinite(mine) && mine === pieceCount ? { n: pieceCount, word: tx(countWord) } : null;

  if (free) {
    const price = MT_FREE_PRICES[s.price % MT_FREE_PRICES.length];
    const filled: any[] = [];
    [...MT_NOTES.map((v: number) => ({ k: "note", v })), ...MT_COINS.map((v: number) => ({ k: "coin", v }))].forEach((sl: any) => {
      const m = s.placed.filter((i: number) => heap[i].k === sl.k && heap[i].v === sl.v).length;
      if (m) filled.push({ ...sl, n: m });
    });
    const total = mtAmount(filled);
    const pick = s.pick ? filled.find((g: any) => g.k === s.pick.k && g.v === s.pick.v) : null;
    const reading = total < price ? MT_READ.short : total === price ? MT_READ.exact : MT_READ.more;
    const gx = MT_TRAY_W + 20, gw = 1086 - MT_TRAY_W - 20;
    const rw = tx(reading), oneLine = rw.length * T.label * 0.6 <= gw - 20;
    return (
      <g>
        {runs("sorted", s.placed.length, heap.length)}
        <rect x={0} y={0} width={960} height={100} rx={16} fill={tint(C.panel, 0.5)} stroke={C.rule} strokeWidth={2} />
        {/* toy keys, like the pad's: tip out another heap, and change the price the money is laid against */}
        <Key id="new-heap" x={976} y={0} w={110} h={94} C={C} label="tip out a new heap"
          onClick={() => put({ heapNo: s.heapNo + 1, placed: [], lit: -1, pick: null })}>
          <text y={-6} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={C.ink}>{tx("new")}</text>
          <text y={26} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={C.ink}>{tx("heap")}</text>
        </Key>
        {trayEls(true)}
        <Key id="price-card" x={gx} y={112} w={gw} h={74} C={C} label="change the price" onClick={() => put({ price: s.price + 1 })}>
          <text x={-gw / 2 + 18} y={10} fontSize={T.micro} fontWeight={600} fill={quiet}>{tx("price")}</text>
          <text x={gw / 2 - 18} y={12} textAnchor="end" fontSize={T.label} fontWeight={700} fill={MT_BLUE_INK}>{mtRs(price)}</text>
        </Key>
        {mtGaugeG("gauge", C, { x: gx, y: 200, w: gw, h: 180 },
          [{ name: "price", segs: [price], price: true }, { name: "money", segs: filled.map((g: any) => g.v * g.n) }],
          { bars: true, solid: true, tx, top: 46, pitch: 76, bh: 36 })}
        {total > 0 && (
          <g pointerEvents="none">
            {(oneLine ? [rw] : wrapText(rw, 10).slice(0, 2)).map((ln: string, q: number, a: string[]) => (
              <text key={q} x={gx + 10} y={oneLine ? 428 : 412 + q * 30} fontSize={oneLine ? T.label : T.micro} fontWeight={700} fill={C.ink}>{ln}</text>
            ))}
          </g>
        )}
        {pick && (
          <g pointerEvents="none">
            {expr("rd", 16, 428, pick.n, pick.v, T.label)}
            <text x={16 + exprW(pick.n, pick.v, T.label) + 14} y={428} fontSize={T.label} fontWeight={700} fill={MT_BLUE_INK}>{"= " + mtRs(pick.n * pick.v)}</text>
          </g>
        )}
        {mtRailG("rail", C, { x: 0, y: 452, w: 880, h: 66 }, filled.map((g: any) => ({ a: g.v * g.n, t: mtRs(g.v * g.n) })), Math.max(total, price))}
        {total > 0 && <text x={900} y={500} fontSize={T.prompt} fontWeight={700} fill={MT_BLUE_INK} pointerEvents="none">{mtRs(total)}</text>}
        {heapEls()}
      </g>
    );
  }

  /* ── phase 1: sort the heap, then which lot is worth more ── */
  if (kind === "which") {
    const notes = heap.filter((pc: any) => pc.k === "note"), coins = heap.filter((pc: any) => pc.k === "coin");
    const noteSum = notes.reduce((a: number, pc: any) => a + pc.v, 0), coinSum = coins.reduce((a: number, pc: any) => a + pc.v, 0);
    const big = noteSum > coinSum ? 0 : coinSum > noteSum ? 1 : -1;
    const multi = coins.length > 1 ? coins : notes.length > 1 ? notes : null;
    return (
      <g>
        {runs("sorted", s.placed.length, heap.length)}
        {/* the question's two lots, each in its own patch, a gap between them */}
        {heapL.lots.map((l: any, q: number) => (
          <rect key={"lot" + q} x={l.x} y={0} width={l.w} height={heapL.h} rx={16} fill={tint(C.panel, 0.5)} stroke={C.rule} strokeWidth={2} />
        ))}
        {trayEls(false)}
        {mtGaugeG("gauge", C, { x: MT_TRAY_W + 20, y: 128, w: 1086 - MT_TRAY_W - 20, h: 312 },
          [{ name: notes.length > 1 ? "notes" : "note", segs: notes.map((pc: any) => pc.v) }, { name: coins.length > 1 ? "coins" : "coin", segs: coins.map((pc: any) => pc.v) }],
          { bars: step >= 2, glow: step >= 3 ? big : -1, tag: step >= 3 && big >= 0 ? { lane: big, text: "more" } : null, tx, top: 70, pitch: 130, bh: 52, fs: T.label })}
        {step >= 1 && multi && (
          <g pointerEvents="none">
            <rect x={0} y={454} width={MT_TRAY_W} height={60} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={2} />
            {expr("rd", 20, 496, multi.length, multi[0].v, T.label)}
            <text x={20 + exprW(multi.length, multi[0].v, T.label) + 14} y={496} fontSize={T.label} fontWeight={700} fill={MT_BLUE_INK}>{"= " + mtRs(multi.length * multi[0].v)}</text>
          </g>
        )}
        {heapInvite()}
        {heapEls()}
      </g>
    );
  }

  /* ── phase 2: one group, counted by laying it along the rail ── */
  if (kind === "group") {
    /* a tied stack's "10" rides higher here, above the invite ring around it, so the reserve is larger */
    const lay = mtPileLayout({ x: 0, y: 64, w: 700, h: 218 }, grp.k, cells2, true, grp.n > 10 ? 72 : undefined);
    const full = grp.v * grp.n;
    const segs: any[] = [];
    cells2.slice(0, s.laid).forEach((c: any) => { for (let q = 0; q < c.c; q++) segs.push({ a: grp.v, t: mtRs(grp.v) }); });
    const word = grp.k === "note" ? "notes" : "coins";
    const next = s.laid < cells2.length ? lay[s.laid] : null;
    const rail = { x: 0, y: 318, w: 880, h: 66 };
    return (
      <g>
        {runs("counted", counted, grp.n)}
        <rect x={0} y={0} width={700} height={290} rx={18} fill="#FFFFFF" stroke={MT_LINE} strokeWidth={2} />
        <text x={20} y={46} fontSize={T.label} fontWeight={700} fill={MT_BLUE_INK}>{mtRs(grp.v)}</text>
        <text x={20 + mtRs(grp.v).length * T.label * 0.62 + 14} y={46} fontSize={T.label} fontWeight={600} fill={quiet}>{tx(word)}</text>
        {/* a tied stack gets a rounded-square ring (a circle round a banded coin read as a second band) */}
        {act && !shown && next && (next.c === 10
          ? pulseRect(next.x - 10, next.y - 14, next.w + 26, next.h + 24, grp.k === "coin" ? 18 : 12)
          : grp.k === "coin" ? <Invite x={next.x + next.w / 2} y={next.y + next.h / 2} r={next.w / 2 + 9} C={C} />
          : pulseRect(next.x - 8, next.y - 8, next.w + 16, next.h + 16))}
        {lay.map((p: any, j: number) => (j < s.laid ? mtSpotG("s" + j, grp.k, p) : mtPieceAt("p" + j, grp.k, p, grp.v, 14)))}
        {/* the box is a control only while there is a piece left to lay */}
        {act && s.laid < cells2.length && <Hit id="group-box" x={0} y={0} w={700} h={290} onPress={layNext}
          label={"lay the next " + (grp.k === "note" ? "note" : "coin") + " on the rail"} />}
        <g pointerEvents="none">
          <rect x={730} y={0} width={356} height={290} rx={18} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={2} />
          <rect x={758} y={24} width={124} height={80} rx={14} fill="#FFFFFF" stroke={MT_SKY} strokeWidth={step >= 1 ? 5 : 3} />
          {counted > 0 && <text x={820} y={84} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={MT_SKY_INK}>{counted}</text>}
          <text x={900} y={76} fontSize={T.label} fontWeight={600} fill={quiet}>{tx(word)}</text>
          {step >= 2
            ? expr("ex", 758, 168, grp.n, grp.v, T.speech)
            : <text x={758} y={168} fontSize={T.speech} fontWeight={700}><tspan fill={quiet}>{tx("each") + " "}</tspan><tspan fill={MT_BLUE_INK}>{mtRs(grp.v)}</tspan></text>}
          <rect x={758} y={190} width={300} height={4} rx={2} fill={MT_LINE} />
          <rect x={758} y={206} width={300} height={70} rx={14} fill="#FFFFFF" stroke={step >= 2 ? C.accent : MT_LINE} strokeWidth={step >= 2 ? 4 : 2} strokeDasharray={step >= 2 ? undefined : "10 8"} />
          {step >= 2 && <text x={908} y={260} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={MT_BLUE_INK}>{mtRs(full)}</text>}
        </g>
        {mtRailG("rail", C, rail, segs, full)}
        {shown && segs.length > 0 && <text x={900} y={rail.y + 47} fontSize={T.prompt} fontWeight={700} fill={MT_BLUE_INK} pointerEvents="none">{mtRs(grp.v * counted)}</text>}
        {trace && isFinite(mine) && mine > 0 && mtMineG("mine", { x: 0, y: 408, w: 880, h: 40 }, mine, full, mineCount)}
      </g>
    );
  }

  /* ── phases 3 and 4: groups in the tray, slid onto the rail; the price, or a second tray ── */
  if (groups.length) {
    const who = kind === "who";
    const lists: any[] = who ? [item.groups[0], item.other[0]] : groups;
    const nG = lists.length;
    const bw = (1086 - 16 * (nG - 1)) / nG;
    const full = mtAmount(groups);
    const tall = kind === "total";          /* phase 3 has the room for bigger pieces */
    const enough = kind === "enough";
    const boxH = tall ? 244 : enough ? 214 : 222, cardY = boxH + (tall || who ? 44 : 34);
    /* phase 4's rail is the gauge's money lane (x0 150, 780 long); phase 3's runs under the cards */
    const gx0 = 150, laneW = 780;
    const rail = tall ? { x: 0, y: 364, w: 880, h: 66 } : { x: gx0 - 4, y: 330, w: laneW + 8, h: 56 };
    /* the money lane is drawn to its own total until the answer (the price bar is not there yet, so its
       length says nothing), then to the gauge's one scale beside the price */
    const railFull = enough && step >= 3 ? Math.max(item.price, full) : full;
    const segs = s.rail.map((g: number) => {
      const G = groups[g], a = G.v * G.n;
      return { a, t: step >= 2 ? mtRs(a) : G.n + " × " + mtRs(G.v) };
    });
    /* one card size for every card on the screen: the largest at which the longest still fits */
    const room = bw - 12;
    const oneW = (G: any, sz: number) => exprW(G.n, G.v, sz) + 14 + ("= " + mtRs(G.n * G.v)).length * sz * 0.56;
    const card = lists.every((G: any) => oneW(G, T.label) <= room) ? { size: T.label, two: false }
      : lists.every((G: any) => oneW(G, T.micro) <= room) || !tall ? { size: T.micro, two: false }
      : { size: lists.every((G: any) => exprW(G.n, G.v, T.label) <= room) ? T.label : T.micro, two: true };
    /* two trays side by side keep their rows level */
    const topAll = who && lists.some((G: any) => G.n > 10) ? 58 : undefined;
    const onRail = s.rail.reduce((a: number, g: number) => a + groups[g].v * groups[g].n, 0);
    const nextG = who ? -1 : groups.findIndex((_g: any, j: number) => !s.rail.includes(j));
    const dragG = dragging && dragging.payload && dragging.payload.t === "group" ? dragging : null;
    const reading = kind === "enough" ? (full < item.price ? "short" : full === item.price ? "exact" : "more")
      : kind === "who" ? (full === mtAmount(item.other) ? "neither" : full > mtAmount(item.other) ? "first" : "second") : "";
    return (
      <g>
        {!who && runs("added", s.rail.length, groups.length)}
        {lists.map((G: any, j: number) => {
          const b = { x: j * (bw + 16), y: 0, w: bw, h: boxH };
          /* the pieces keep at least 10 units of clear floor above the box's bottom edge */
          const lay = mtPileLayout({ x: b.x, y: 52, w: b.w, h: boxH - 62 }, G.k, mtCells(G.n), tall, topAll);
          const isOn = !who && s.rail.includes(j);
          const live = !who && act && !isOn;
          const word = G.k === "note" ? (G.n > 1 ? "notes" : "note") : G.n > 1 ? "coins" : "coin";
          const sumT = "= " + mtRs(G.n * G.v);
          const cardSize = card.size, two = card.two;
          /* the card keeps the room for its amount, so nothing moves when the amount is written in */
          const cw = exprW(G.n, G.v, cardSize) + (two ? 0 : 14 + sumT.length * cardSize * 0.56);
          const cx0 = b.x + (b.w - cw) / 2;
          return (
            <g key={"g" + j}>
              <g {...(live ? { ...control("group-" + j, G.n + " " + word + " of " + mtRs(G.v)), ...drag.bind({ t: "group", g: j }), ...drag.keys({ t: "group", g: j }) } : {})}>
                <rect x={b.x} y={b.y} width={b.w} height={b.h} rx={18} fill="#FFFFFF" stroke={MT_LINE} strokeWidth={2} strokeDasharray={isOn ? "10 8" : undefined} />
                {/* the invite runs just inside the border; the heading stands well clear of it */}
                {act && !shown && nextG === j && pulseRect(b.x + 4, b.y + 4, b.w - 8, b.h - 8, 16)}
                <text x={b.x + 22} y={42} fontSize={T.label} fontWeight={700} fill={MT_BLUE_INK}>{mtRs(G.v)}</text>
                <text x={b.x + 22 + mtRs(G.v).length * T.label * 0.62 + 12} y={42} fontSize={T.micro} fontWeight={600} fill={quiet}>{tx(word)}</text>
                {who && <text x={b.x + b.w - 22} y={42} textAnchor="end" fontSize={T.micro} fontWeight={700} fill={C.ink}>{tx(j === 0 ? "first child" : "second child")}</text>}
                {lay.map((p: any, q: number) => mtPieceAt("p" + q, G.k, p, G.v))}
              </g>
              <g pointerEvents="none">
                {expr("c" + j, cx0, cardY, G.n, G.v, cardSize)}
                {step >= 2 && (two
                  ? <text x={b.x + b.w / 2} y={cardY + 32} textAnchor="middle" fontSize={cardSize} fontWeight={700} fill={MT_BLUE_INK}>{sumT}</text>
                  : <text x={cx0 + exprW(G.n, G.v, cardSize) + 14} y={cardY} fontSize={cardSize} fontWeight={700} fill={MT_BLUE_INK}>{sumT}</text>)}
              </g>
            </g>
          );
        })}
        {/* phase 4: the gauge, with the rail as its money lane; the price bar, the gap and the reading come
            only with the answer (drawn earlier, the two ends would answer the question by eye) */}
        {enough && (() => {
          const gsc = laneW / railFull;
          const priceLen = item.price * gsc, moneyLen = full * gsc;
          const g0 = 266;   /* the panel's top; the price lane, the money lane (the rail) and the reading below it */
          const bottom = g0 + (step >= 3 ? 184 : 136);
          return (
            <g pointerEvents="none">
              <rect x={0} y={g0} width={1086} height={bottom - g0} rx={16} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={2} />
              <text x={gx0 - 18} y={g0 + 44} textAnchor="end" fontSize={T.micro} fontWeight={600} fill={quiet}>{tx("price")}</text>
              <text x={gx0 - 18} y={g0 + 102} textAnchor="end" fontSize={T.micro} fontWeight={600} fill={quiet}>{tx("money")}</text>
              {/* before the answer the price is a tag at the lane's left, so nothing marks where the money
                  lane ends; with the answer it becomes a bar to the same scale, its amount after it */}
              {step >= 3
                ? <rect x={gx0} y={g0 + 14} width={Math.max(2, priceLen - 2)} height={40} rx={4} fill={MT_NOTE} stroke={MT_BLUE} strokeWidth={2} />
                : <text x={gx0 + 16} y={g0 + 45} fontSize={T.label} fontWeight={600}>
                    <tspan fill={quiet} fontSize={T.micro}>{tx(item.what) + "  "}</tspan><tspan fill={MT_BLUE_INK} fontWeight={700}>{mtRs(item.price)}</tspan>
                  </text>}
              {step >= 3 && <text x={gx0 + laneW + 16} y={g0 + 45} fontSize={T.label} fontWeight={700} fill={MT_BLUE_INK}>{mtRs(item.price)}</text>}
              {step >= 3 && full < item.price && (
                <g>
                  <path d={`M${gx0 + moneyLen} ${g0 + 124} v10 H${gx0 + priceLen} v-10`} fill="none" stroke={MT_LINE} strokeWidth={3} />
                  <text x={gx0 + (moneyLen + priceLen) / 2} y={g0 + 164} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={MT_LINE}>{mtRs(item.price - full)}</text>
                </g>
              )}
              {step >= 4 && <text x={gx0} y={g0 + 164} fontSize={T.label} fontWeight={700} fill={C.ink}>{tx(MT_READ[reading])}</text>}
            </g>
          );
        })()}
        {!who && mtRailG("rail", C, rail, segs, enough ? railFull : full, tall && step >= 2)}
        {/* the gauge's one near-black start line, over both lanes */}
        {enough && <rect x={gx0 - 4} y={272} width={4} height={120} fill={MT_LINE} pointerEvents="none" />}
        {!who && shown && segs.length > 0 && (
          <text x={enough ? gx0 + laneW + 16 : rail.x + rail.w + 20} y={enough ? rail.y + 37 : rail.y + rail.h / 2 + 14} fontSize={enough ? T.label : T.prompt} fontWeight={700} fill={MT_BLUE_INK} pointerEvents="none">{mtRs(onRail)}</text>
        )}
        {tall && trace && isFinite(mine) && mine > 0 && mtMineG("mine", { x: 0, y: 452, w: 880, h: 40 }, mine, full, mineCount)}
        {who && step >= 3 && mtGaugeG("gauge", C, { x: 0, y: 292, w: 1086, h: 172 },
          [{ name: "first", segs: Array(item.groups[0].n).fill(item.groups[0].v) }, { name: "second", segs: Array(item.other[0].n).fill(item.other[0].v) }],
          { wide: true, bars: true, word: step >= 4 ? MT_READ[reading] : null, tx, top: 14, pitch: 50, bh: 40, wordPad: 18,
            pairs: step >= 4 && full === mtAmount(item.other) ? { n: item.groups[0].n, each: item.groups[0].v } : null })}
        {dragG && (() => {
          const G = groups[dragG.payload.g];
          const w = exprW(G.n, G.v, T.label) + 40;
          return (
            <g pointerEvents="none">
              <rect x={dragG.x - w / 2} y={dragG.y - 32} width={w} height={64} rx={14} fill="#FFFFFF" stroke={C.accent} strokeWidth={4} filter="url(#fLift)" />
              {expr("gh", dragG.x, dragG.y + 11, G.n, G.v, T.label, "middle")}
            </g>
          );
        })()}
      </g>
    );
  }
  return <g />;
}

/* the summary page's small drawing of the child's last right answer in a phase:
   result.last = { value, answer, kind, item, shared } (shared = what api.share held at that moment) */
function Thumb({ result, C, w, h, lang = "en", tx = (v: any) => v }: any) {
  mtSetLang(lang);
  const last = result && result.last;
  if (!last) return null;
  const it: any = mtItemOf(last.kind, last.item);
  if (!it) return null;
  const frame = <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />;
  /* two bars from one line, to one scale, with their amounts */
  const bars = (a: number, b: number, priceFirst: boolean, glow: number) => {
    const sc = (w - 164) / Math.max(a, b, 1);
    return (
      <g>
        <rect x={14} y={12} width={a * sc} height={24} rx={4} fill={priceFirst ? MT_NOTE : MT_BLUE} stroke={glow === 0 ? C.accent : priceFirst ? MT_BLUE : "none"} strokeWidth={glow === 0 ? 4 : 2} />
        <rect x={14} y={46} width={b * sc} height={24} rx={4} fill={MT_BLUE} stroke={glow === 1 ? C.accent : "none"} strokeWidth={4} />
        <rect x={10} y={6} width={3} height={70} fill={MT_LINE} />
        <text x={w - 14} y={34} textAnchor="end" fontSize={T.micro} fontWeight={700} fill={MT_BLUE_INK}>{mtRs(a)}</text>
        <text x={w - 14} y={68} textAnchor="end" fontSize={T.micro} fontWeight={700} fill={MT_BLUE_INK}>{mtRs(b)}</text>
      </g>
    );
  };
  let body: any = null;
  if (it.kind === "which") {
    const a = it.heap.filter((pc: any) => pc.k === "note").reduce((x: number, pc: any) => x + pc.v, 0);
    const b = it.heap.filter((pc: any) => pc.k === "coin").reduce((x: number, pc: any) => x + pc.v, 0);
    body = bars(a, b, false, a > b ? 0 : b > a ? 1 : -1);
  } else if (it.kind === "group") {
    body = (
      <g>
        <text x={16} y={34} fontSize={T.micro} fontWeight={700}><tspan fill={MT_SKY_INK}>{it.group.n + " × "}</tspan><tspan fill={MT_BLUE_INK}>{mtRs(it.group.v)}</tspan></text>
        <text x={16} y={70} fontSize={T.micro} fontWeight={700} fill={MT_BLUE_INK}>{"= " + mtRs(it.group.v * it.group.n)}</text>
      </g>
    );
  } else if (it.kind === "total") {
    const all = mtAmount(it.groups), sc = (w - 28) / all;
    let acc = 0;
    body = (
      <g>
        {it.groups.map((G: any, j: number) => { const x = 14 + acc * sc, ww = Math.max(2, G.v * G.n * sc - 2); acc += G.v * G.n; return <rect key={j} x={x} y={12} width={ww} height={24} rx={4} fill={MT_BLUE} />; })}
        <text x={16} y={70} fontSize={T.micro} fontWeight={700} fill={MT_BLUE_INK}>{"= " + mtRs(all)}</text>
      </g>
    );
  } else if (it.kind === "enough") {
    body = bars(it.price, mtAmount(it.groups), true, -1);
  } else if (it.kind === "who") {
    body = bars(mtAmount(it.groups), mtAmount(it.other), false, -1);
  }
  return <g>{frame}{body}</g>;
}

function MoneyTray(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, format: mtFormat, winMs: 3400, fitHost: () => null }} />
  );
}

export default MoneyTray;
