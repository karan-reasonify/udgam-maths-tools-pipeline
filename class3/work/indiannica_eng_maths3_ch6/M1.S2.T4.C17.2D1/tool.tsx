/* ═══ M1.S2.T4.C17.2D1 · share_into_groups · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists: header + its three controls, canvas, slot + pad, bubble + mascot,
   phase dots (user / AI mode), window.toolApi, the sound effects, the printed bubble, scoring, the
   events, idle and restart. THE LESSON IS SILENT (runtime r30): nothing is spoken; every line is
   printed on the bubble, which is the guide (it instructs; after a wrong act or answer the hint shows UNDER the
   pinned instruction and stays until the child acts again; r34). The lesson is action-driven: nothing moves
   on unless the child acts (a tap, a key, an answer); after a right answer the next question follows its
   short celebration by itself. The header's Hint key (r35) shows the hint on demand.
   This template is the FULL NEW STYLE and is used for a chapter whose pinned runtime is silent (a voiced runtime, r21
   and before, is scaffolded from lib/build/skeleton.voiced.tsx instead). Blocks that a given runtime has no support for
   are left out when `scaffold` writes this file (board, start page, theme).
   NO imports in this file; only the five host hooks. Follow docs/LAYOUT.md and docs/PATTERNS.md.
   Every English line the tool prints, in its data or drawn by Work (tx("...")), has a Hindi and a
   Gujarati entry in TR once the English is final (check's tr-coverage row lists what is missing).
   THE NEW LOOK (the owner, 2026-10-16; docs/LAYOUT.md §1d-§1e, docs/PATTERNS.md §15-§16): no question bar (only the blinking key at the top
   right), four small clickable phase dots, a big ONE-sentence bubble, digits as written, every act performed on screen (api.act). The question
   lives ONLY in the bubble: each item's `say` is the whole question in one sentence. Opt out (delete `keyOnly: true` / `navDots: true` below)
   only with a reason stated in the report.
   Edit, never rewrite. Built by `node cli.mjs scaffold`; concepts are verbatim (check compares them). */

const TOOL_ID = "share_into_groups";
const MEDIA_ID = "M1.S2.T4.C17.2D1";
const TOOL_NAME = "Share Into Groups";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
/* kept for the tool object's shape (and the sidecar); nothing speaks from r30 */
const VOICE = {"rate":0.92,"pitch":1.06};

/* printed on the bubble before phase 1's teach lines only (the plan's opening line; not shown when phase 1 has steps) */
const OPENING = ["A tray from the market, and some empty baskets and plates. Let us share it out."];
/* the whole-tool line: kept for the sidecar; the summary page (r44) does not show it */
const FINISH_LINE = "You shared things into equal groups, then took the groups the top number names.";
/* printed when the child opens Free play; its LAST piece stays on the bubble. Free play offers exactly this: the thing, the groups, Share, a tap on a group */
const FREE_LINE = "Free play. Pick a thing and a number of groups, then share and take groups.";

/* THE START PAGE (runtime r28; docs/LAYOUT.md §1c): a roti, a pizza and a chocolate bar on a table */
const START_HOOK = "How can a roti, a pizza or a whole tray be shared fairly?";
function StartArt({ box, C, lang, tx }: any) {
  const y0 = 250;
  return (
    <g>
      <defs>
        <clipPath id="sgStartDisc" clipPathUnits="objectBoundingBox"><circle cx={0.5} cy={0.5} r={0.5} /></clipPath>
        <filter id="sgStartShadow" x="-10%" y="-10%" width="120%" height="130%">
          <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#1A0D00" floodOpacity="0.18" />
        </filter>
        <linearGradient id="sgTableGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E5BE8A" />
          <stop offset="100%" stopColor="#C99858" />
        </linearGradient>
      </defs>
      <rect x={60} y={y0} width={box.w - 120} height={48} rx={24} fill="url(#sgTableGrad)" stroke={SG.woodEdge} strokeWidth={4} filter="url(#sgStartShadow)" />
      {[{ x: 250, k: "roti" }, { x: 590, k: "pizza" }].map((d) => (
        <g key={d.k} filter="url(#sgStartShadow)">
          <ellipse cx={d.x} cy={y0 - 4} rx={150} ry={26} fill="#FFFDF7" stroke={C.rule} strokeWidth={3} />
          <circle cx={d.x} cy={y0 - 118} r={120} fill={SG_THING[d.k].fill} stroke={SG_THING[d.k].edge} strokeWidth={3} />
          <Skin name={d.k} x={d.x - 120} y={y0 - 238} w={240} h={240} clip="url(#sgStartDisc)" />
        </g>
      ))}
      <g filter="url(#sgStartShadow)">
        <rect x={790} y={y0 - 118} width={340} height={340 / SG_AR} rx={12} fill={SG_THING.bar.fill} stroke={SG_THING.bar.edge} strokeWidth={3} />
        <Skin name="bar" x={790} y={y0 - 118} w={340} h={340 / SG_AR} fit="stretch" />
      </g>
    </g>
  );
}

/* Hindi and Gujarati (docs/PATTERNS.md §11): filled in the language pass, once the English is final.
   For that pass, the words Work and Thumb draw through tx(): "Cut", "Check", "Share", "Divide", "Take", "Lift", "Taken", "Left",
   "Equal", "Bigger", "Not halves", "left over: not equal", "each child", "of the bar", "rotis", "pizzas", "bars", "roti", "pizza", "bar".
   (The summary thumbnail draws a Yes / No answer as a sign, ≠ or =, so it has no word to translate.)
   Each item's win line (item.win, said with api.say at the win; data-borne, so tr-coverage does not list them):
   "Yes, 7 rotis are half of 14 rotis." · "Yes, half of 28 bars is 14 bars." · "Right, the parts are not equal, so neither is a half." ·
   "Yes, one quarter of 28 pizzas is 7 pizzas." · "Yes, one third of 30 rotis is 10 rotis." ·
   "Right, No: 2 bars are left over, so the 4 boxes are not equal." · "Yes, two fifths of 25 pizzas is 10 pizzas." ·
   "Yes, two thirds of 21 rotis is 14 rotis." · "Yes, five sixths of 30 bars is 25 bars." ·
   "Yes, each group has 10, so three fifths of 50 is 30." · "Yes, half of 90 bars is 45 bars." ·
   "Yes, each group has 7, so four ninths of 63 is 28."
   The lines said when a phase's guide steps are done (literal api.say calls in Work, listed by tr-coverage): "Now both children have a
   fair share." · "Now all 4 children have a fair share." · "You have taken two thirds of the bar." · "The plates under the cloth match the sums."
   Lines built at run time: a holder's chip with its count ("Taken 7"), the result chip ("5+5 = 10", "7 rotis") and the tag ("50 rotis") join digits with one TR word. */
/* Terms (one per idea, as sibling tool 1): half आधा / અડધો ભાગ · third एक तिहाई / ત્રીજો ભાગ · quarter एक चौथाई / ચોથો ભાગ ·
   two thirds दो तिहाई / 3 માંથી 2 ભાગ · other fractions "5 में से 2 भाग" / "5 માંથી 2 ભાગ" · equal बराबर / સરખા · roti रोटी / રોટલી ·
   pizza पिज़्ज़ा / પિઝા · chocolate bar चॉकलेट / ચોકલેટ · plate प्लेट / થાળી · basket टोकरी / ટોપલી · box डिब्बा / ડબ્બો ·
   fraction भिन्न / અપૂર્ણાંક · group समूह / જૂથ · the child is तुम / તમે. The keys Cut, Check, Share, Divide, Take, Lift are named
   in the bubble by their translated labels. */
const TR: any = {
  hi: {
    "Now both children have a fair share.": "अब दोनों बच्चों के पास बराबर हिस्सा है।",
    "Now all 4 children have a fair share.": "अब चारों बच्चों के पास बराबर हिस्सा है।",
    "You have taken two thirds of the bar.": "तुमने चॉकलेट का दो तिहाई ले लिया।",
    "Now tap the groups the top number names.": "अब ऊपर की संख्या जितने समूह दबाओ।",
    "The plates under the cloth match the sums.": "कपड़े के नीचे की प्लेटें हिसाब से मेल खाती हैं।",
    "Share Into Groups": "बराबर समूहों में बाँटो",
    "How can a roti, a pizza or a whole tray be shared fairly?": "एक रोटी, एक पिज़्ज़ा या पूरी ट्रे बराबर कैसे बाँटें?",
    "Free play. Pick a thing and a number of groups, then share and take groups.": "खुला खेल। कोई चीज़ और समूहों की संख्या चुनो, फिर बाँटो और समूह लो।",
    "A tray from the market, and some empty baskets and plates. Let us share it out.": "बाज़ार से एक ट्रे, और कुछ खाली टोकरियाँ और प्लेटें। चलो इसे बाँटें।",
    "Share into equal groups: half of a collection": "बराबर समूहों में बाँटो: संग्रह का आधा",
    "Half means 2 equal groups. Share fairly, and each group is the same.": "आधा मतलब 2 बराबर समूह। बराबर बाँटो, हर समूह एक जैसा होगा।",
    "Tap Cut to cut the roti into 2 parts for 2 children.": "काटो दबाओ और रोटी को 2 बच्चों के लिए 2 भागों में काटो।",
    "Tap the Cut key under the roti.": "रोटी के नीचे काटो बटन दबाओ।",
    "Tap Check to see if the 2 parts are the same size.": "जाँचो दबाओ और देखो कि 2 भाग बराबर हैं या नहीं।",
    "The Check key lays one part on the other.": "जाँचो बटन एक भाग को दूसरे पर रखता है।",
    "The parts match, so tap Share to give each child one half.": "भाग बराबर हैं, तो बाँटो दबाओ और हर बच्चे को आधा दो।",
    "Tap the Share key to hand out the parts.": "भाग देने के लिए बाँटो बटन दबाओ।",
    "Make 2 equal groups, then take 1 of them.": "2 बराबर समूह बनाओ, फिर उनमें से 1 लो।",
    "Half is the count in just 1 of the groups.": "आधा, सिर्फ़ 1 समूह की गिनती है।",
    "Half is one of 2 equal groups, so unequal parts are never halves.": "आधा 2 बराबर समूहों में से एक है, असमान भाग आधे नहीं होते।",
    "You learned: half is one of 2 equal groups, of a roti or of a tray.": "तुमने सीखा: आधा 2 बराबर समूहों में से एक है, रोटी का या ट्रे का।",
    "Share the 14 rotis into 2 equal baskets: how many rotis make half?": "14 रोटियाँ 2 बराबर टोकरियों में बाँटो: आधी कितनी रोटियाँ हैं?",
    "Half of 14 rotis?": "14 रोटियों का आधा?",
    "The 2 baskets must hold the same number of rotis.": "2 टोकरियों में बराबर रोटियाँ होनी चाहिए।",
    "Take 1 of the 2 baskets: that is half.": "2 टोकरियों में से 1 लो: वही आधा है।",
    "Count the rotis in one basket only.": "सिर्फ़ एक टोकरी की रोटियाँ गिनो।",
    "Yes, 7 rotis are half of 14 rotis.": "हाँ, 14 रोटियों का आधा 7 रोटियाँ हैं।",
    "What is half of these 28 chocolate bars, shared into 2 boxes?": "इन 28 चॉकलेट को 2 डिब्बों में बाँटो: आधी कितनी हैं?",
    "Half of 28 bars?": "28 चॉकलेट का आधा?",
    "Both boxes get the same number of bars.": "दोनों डिब्बों में बराबर चॉकलेट आती हैं।",
    "Only 1 of the 2 boxes is half, not both.": "2 में से सिर्फ़ 1 डिब्बा आधा है, दोनों नहीं।",
    "Count that one box's bars in twos: 2, 4, 6.": "उस एक डिब्बे की चॉकलेट दो-दो करके गिनो: 2, 4, 6।",
    "Yes, half of 28 bars is 14 bars.": "हाँ, 28 चॉकलेट का आधा 14 चॉकलेट है।",
    "This roti is cut for 2 children: is it a fair share?": "यह रोटी 2 बच्चों के लिए कटी है: क्या यह बराबर बँटवारा है?",
    "Is it fair?": "क्या यह बराबर है?",
    "Yes": "हाँ",
    "No": "नहीं",
    "Compare the 2 parts: is one bigger than the other?": "2 भागों की तुलना करो: क्या एक भाग दूसरे से बड़ा है?",
    "Fair means both parts are exactly the same size.": "बराबर मतलब दोनों भाग बिल्कुल एक जितने हों।",
    "Look at the 2 cut lines: do they make one straight line?": "2 कटी रेखाएँ देखो: क्या वे एक सीधी रेखा बनाती हैं?",
    "Right, the parts are not equal, so neither is a half.": "सही, भाग बराबर नहीं हैं, इसलिए कोई भी आधा नहीं है।",
    "Take one group: a third or a quarter": "एक समूह लो: एक तिहाई या एक चौथाई",
    "The bottom number says how many groups. Share, then take one.": "नीचे की संख्या बताती है कितने समूह। बाँटो, फिर एक लो।",
    "Tap Cut to cut the pizza into 4 parts for 4 children.": "काटो दबाओ और पिज़्ज़ा को 4 बच्चों के लिए 4 भागों में काटो।",
    "Tap the Cut key under the pizza.": "पिज़्ज़ा के नीचे काटो बटन दबाओ।",
    "Tap Check to see if all 4 parts are the same size.": "जाँचो दबाओ और देखो कि चारों भाग बराबर हैं या नहीं।",
    "The Check key lays one part on each other part.": "जाँचो बटन एक भाग को हर दूसरे भाग पर रखता है।",
    "The parts match, so tap Share to give each child one quarter.": "भाग बराबर हैं, तो बाँटो दबाओ और हर बच्चे को एक चौथाई दो।",
    "Tap the Share key to hand out the 4 parts.": "4 भाग देने के लिए बाँटो बटन दबाओ।",
    "The bottom number of the card says how many groups.": "कार्ड की नीचे की संख्या समूहों की गिनती है।",
    "Read the bottom number, then look at one group.": "नीचे की संख्या पढ़ो, फिर एक समूह देखो।",
    "A third or a quarter is what one of 3 or 4 equal groups holds.": "एक तिहाई या एक चौथाई, 3 या 4 बराबर समूहों में से एक है।",
    "You learned: a quarter is one of 4 equal groups, a third one of 3.": "तुमने सीखा: एक चौथाई 4 बराबर समूहों में से एक, एक तिहाई 3 में से एक।",
    "Share the 28 pizzas onto 4 equal plates: how many pizzas are one quarter?": "28 पिज़्ज़ा 4 बराबर प्लेटों में बाँटो: एक चौथाई कितने पिज़्ज़ा हैं?",
    "One quarter of 28?": "28 का एक चौथाई?",
    "One quarter is what one plate holds.": "एक चौथाई उतना है जितना एक प्लेट में है।",
    "The 4 plates hold the same number each.": "चारों प्लेटों में बराबर पिज़्ज़ा हैं।",
    "Count the pizzas on one plate only.": "सिर्फ़ एक प्लेट के पिज़्ज़ा गिनो।",
    "Yes, one quarter of 28 pizzas is 7 pizzas.": "हाँ, 28 पिज़्ज़ा का एक चौथाई 7 पिज़्ज़ा है।",
    "How many of these 30 rotis are one third, once shared into 3 baskets?": "इन 30 रोटियों को 3 टोकरियों में बाँटो: एक तिहाई कितनी हैं?",
    "One third of 30?": "30 का एक तिहाई?",
    "The bottom number 3 means 3 baskets: count one.": "नीचे की संख्या 3 मतलब 3 टोकरियाँ: एक गिनो।",
    "Each of the 3 baskets gets the same number.": "तीनों टोकरियों में बराबर रोटियाँ आती हैं।",
    "Count the rotis in the first basket only.": "सिर्फ़ पहली टोकरी की रोटियाँ गिनो।",
    "Yes, one third of 30 rotis is 10 rotis.": "हाँ, 30 रोटियों का एक तिहाई 10 रोटियाँ है।",
    "Can these 22 bars be shared into 4 equal boxes to find one quarter?": "क्या 22 चॉकलेट 4 बराबर डिब्बों में बँटकर एक चौथाई देंगी?",
    "4 equal boxes?": "4 बराबर डिब्बे?",
    "After sharing, is any bar left on the tray?": "बाँटने के बाद क्या ट्रे पर कोई चॉकलेट बची है?",
    "Fair shares use every bar, and every box gets the same.": "बराबर बँटवारे में हर चॉकलेट बँटती है, हर डिब्बे को बराबर।",
    "Count the bars on the tray after sharing.": "बाँटने के बाद ट्रे की चॉकलेट गिनो।",
    "Right, No: 2 bars are left over, so the 4 boxes are not equal.": "सही, नहीं: 2 चॉकलेट बच गईं, इसलिए 4 डिब्बे बराबर नहीं।",
    "Take more than one group: two thirds": "एक से ज़्यादा समूह लो: दो तिहाई",
    "Share into the groups the bottom number asks for. Then take as many groups as the top number says.": "नीचे की संख्या जितने समूहों में बाँटो। फिर ऊपर की संख्या जितने समूह लो।",
    "Tap Cut to cut the chocolate bar into 3 equal parts.": "काटो दबाओ और चॉकलेट को 3 बराबर भागों में काटो।",
    "Tap the Cut key under the bar.": "चॉकलेट के नीचे काटो बटन दबाओ।",
    "Tap one part to take it: that is one third.": "एक भाग दबाकर लो: वह एक तिहाई है।",
    "Tap any one part of the bar.": "चॉकलेट का कोई एक भाग दबाओ।",
    "Tap one more part: 2 of the 3 parts are two thirds.": "एक और भाग दबाओ: 3 में से 2 भाग दो तिहाई हैं।",
    "Tap a part that is not taken yet.": "वह भाग दबाओ जो अभी लिया नहीं।",
    "Read the top number of the card again.": "कार्ड की ऊपर की संख्या फिर से पढ़ो।",
    "Add up all the groups you take.": "जो समूह लिए, सब जोड़ो।",
    "The top number says how many of the equal groups to take.": "ऊपर की संख्या बताती है कितने बराबर समूह लेने हैं।",
    "You learned: two fifths is 2 of 5 equal groups, taken together.": "तुमने सीखा: 5 में से 2 भाग मतलब 5 बराबर समूहों में से 2 लेना।",
    "Share the 25 pizzas onto 5 plates: how many pizzas are two fifths?": "25 पिज़्ज़ा 5 प्लेटों में बाँटो: 5 में से 2 भाग कितने पिज़्ज़ा हैं?",
    "Two fifths of 25?": "25 के 5 में से 2 भाग?",
    "One plate of the 5 is one fifth.": "5 प्लेटों में से एक प्लेट 5 में से 1 भाग है।",
    "Two fifths is 2 of the 5 plates, not 1.": "5 में से 2 भाग मतलब 2 प्लेटें, 1 नहीं।",
    "Count one plate, then add the second plate's pizzas.": "एक प्लेट गिनो, फिर दूसरी प्लेट के पिज़्ज़ा जोड़ो।",
    "Yes, two fifths of 25 pizzas is 10 pizzas.": "हाँ, 25 पिज़्ज़ा के 5 में से 2 भाग 10 पिज़्ज़ा हैं।",
    "How many of these 21 rotis are two thirds, once shared into 3 baskets?": "इन 21 रोटियों को 3 टोकरियों में बाँटो: दो तिहाई कितनी हैं?",
    "Two thirds of 21?": "21 का दो तिहाई?",
    "Each of the 3 baskets is one third.": "3 टोकरियों में से हर एक, एक तिहाई है।",
    "The top number 2 says take 2 of the baskets.": "ऊपर की संख्या 2 कहती है 2 टोकरियाँ लो।",
    "Add the rotis in 2 baskets together.": "2 टोकरियों की रोटियाँ जोड़ो।",
    "Yes, two thirds of 21 rotis is 14 rotis.": "हाँ, 21 रोटियों का दो तिहाई 14 रोटियाँ है।",
    "What is five sixths of these 30 bars, shared into 6 boxes?": "इन 30 चॉकलेट को 6 डिब्बों में बाँटो: 6 में से 5 भाग कितने हैं?",
    "Five sixths of 30?": "30 के 6 में से 5 भाग?",
    "First find how many bars one box gets.": "पहले देखो एक डिब्बे में कितनी चॉकलेट आती हैं।",
    "Five sixths takes 5 boxes and leaves 1.": "6 में से 5 भाग में 5 डिब्बे लो, 1 छोड़ो।",
    "Add 5 of the boxes, one box at a time.": "5 डिब्बे एक-एक करके जोड़ो।",
    "Yes, five sixths of 30 bars is 25 bars.": "हाँ, 30 चॉकलेट के 6 में से 5 भाग 25 चॉकलेट हैं।",
    "A fraction of a collection without the picture": "बिना चित्र के संग्रह का भिन्न",
    "The cloth hides everything. Share the number first. Then take the groups the top number names.": "कपड़ा सब छिपा देता है। पहले संख्या बाँटो। फिर ऊपर की संख्या जितने समूह लो।",
    "Tap Divide to share the 20 rotis under the cloth into 4 groups.": "भाग दो दबाओ और कपड़े के नीचे की 20 रोटियाँ 4 समूहों में बाँटो।",
    "Tap the Divide key first.": "पहले भाग दो बटन दबाओ।",
    "Tap Take to take 3 of the 4 groups.": "लो दबाओ और 4 में से 3 समूह लो।",
    "Now tap the Take key.": "अब लो बटन दबाओ।",
    "Tap Lift to lift the cloth and check the groups.": "उठाओ दबाओ, कपड़ा उठाओ और समूह जाँचो।",
    "Tap the Lift key to look under the cloth.": "कपड़े के नीचे देखने को उठाओ बटन दबाओ।",
    "Say how many groups the top number takes.": "बताओ ऊपर की संख्या कितने समूह लेती है।",
    "Find one group first, then take that many groups.": "पहले एक समूह निकालो, फिर उतने समूह लो।",
    "Divide by the bottom number, then take the groups the top number names.": "नीचे की संख्या से भाग दो, फिर ऊपर की संख्या जितने समूह लो।",
    "You learned: divide by the bottom number, then multiply by the top.": "तुमने सीखा: नीचे की संख्या से भाग दो, फिर ऊपर की से गुणा करो।",
    "50 rotis are under the cloth: how many rotis are three fifths of them?": "कपड़े के नीचे 50 रोटियाँ हैं: 5 में से 3 भाग कितनी हैं?",
    "Three fifths of 50?": "50 के 5 में से 3 भाग?",
    "First divide 50 by the bottom number, 5.": "पहले 50 को नीचे की संख्या 5 से भाग दो।",
    "One fifth is one of 5 equal groups: now take 3 groups.": "5 में से 1 भाग एक बराबर समूह है: अब 3 समूह लो।",
    "Add one group 3 times to find three fifths.": "5 में से 3 भाग के लिए एक समूह 3 बार जोड़ो।",
    "Yes, each group has 10, so three fifths of 50 is 30.": "हाँ, हर समूह में 10 हैं, इसलिए 50 के 5 में से 3 भाग 30 हैं।",
    "90 bars are under the cloth: how many bars are half of them?": "कपड़े के नीचे 90 चॉकलेट हैं: उनका आधा कितनी चॉकलेट है?",
    "Half of 90?": "90 का आधा?",
    "Share 90 into 2 equal groups: one group is half.": "90 को 2 बराबर समूहों में बाँटो: एक समूह आधा है।",
    "Split 90 into 80 and 10, then halve each part.": "90 को 80 और 10 में तोड़ो, फिर हर भाग का आधा करो।",
    "Join the two halves you found into one group.": "जो दो आधे मिले, उन्हें एक समूह में मिलाओ।",
    "Yes, half of 90 bars is 45 bars.": "हाँ, 90 चॉकलेट का आधा 45 चॉकलेट है।",
    "63 pizzas are under the cloth: how many pizzas are four ninths of them?": "कपड़े के नीचे 63 पिज़्ज़ा हैं: 9 में से 4 भाग कितने हैं?",
    "Four ninths of 63?": "63 के 9 में से 4 भाग?",
    "Divide 63 by 9 first: use the 9 times table.": "पहले 63 को 9 से भाग दो: 9 का पहाड़ा लगाओ।",
    "Then take 4 of the 9 equal groups.": "फिर 9 बराबर समूहों में से 4 लो।",
    "Use the times table for 4 groups of that size.": "उतने बड़े 4 समूहों के लिए पहाड़ा लगाओ।",
    "Yes, each group has 7, so four ninths of 63 is 28.": "हाँ, हर समूह में 7 हैं, इसलिए 63 के 9 में से 4 भाग 28 हैं।",
    "Cut": "काटो", "Check": "जाँचो", "Share": "बाँटो", "Divide": "भाग दो", "Take": "लो", "Lift": "उठाओ",
    "Taken": "लिया", "Left": "बचा", "Equal": "बराबर", "Bigger": "बड़ा", "Not halves": "आधे नहीं",
    "left over: not equal": "बचे: बराबर नहीं", "each child": "हर बच्चा", "of the bar": "चॉकलेट का",
    "rotis": "रोटियाँ", "pizzas": "पिज़्ज़ा", "bars": "चॉकलेट", "roti": "रोटी", "pizza": "पिज़्ज़ा", "bar": "चॉकलेट",
  },
  gu: {
    "Now both children have a fair share.": "હવે બંને બાળકો પાસે સરખો ભાગ છે.",
    "Now all 4 children have a fair share.": "હવે ચારેય બાળકો પાસે સરખો ભાગ છે.",
    "You have taken two thirds of the bar.": "તમે ચોકલેટના 3 માંથી 2 ભાગ લીધા.",
    "Now tap the groups the top number names.": "હવે ઉપરની સંખ્યા જેટલા જૂથ દબાવો.",
    "The plates under the cloth match the sums.": "કપડા નીચેની થાળીઓ હિસાબ સાથે મળે છે.",
    "Share Into Groups": "સરખા જૂથોમાં વહેંચો",
    "How can a roti, a pizza or a whole tray be shared fairly?": "એક રોટલી, એક પિઝા કે આખી ટ્રે સરખી કેવી રીતે વહેંચાય?",
    "Free play. Pick a thing and a number of groups, then share and take groups.": "મુક્ત રમત. કોઈ વસ્તુ અને જૂથોની સંખ્યા પસંદ કરો, પછી વહેંચો અને જૂથ લો.",
    "A tray from the market, and some empty baskets and plates. Let us share it out.": "બજારમાંથી એક ટ્રે, અને થોડી ખાલી ટોપલીઓ અને થાળીઓ. ચાલો વહેંચીએ.",
    "Share into equal groups: half of a collection": "સરખા જૂથોમાં વહેંચો: સમૂહનો અડધો ભાગ",
    "Half means 2 equal groups. Share fairly, and each group is the same.": "અડધો ભાગ એટલે 2 સરખા જૂથ. સરખું વહેંચો, દરેક જૂથ સરખું થશે.",
    "Tap Cut to cut the roti into 2 parts for 2 children.": "કાપો દબાવો અને રોટલીને 2 બાળકો માટે 2 ભાગમાં કાપો.",
    "Tap the Cut key under the roti.": "રોટલી નીચે કાપો બટન દબાવો.",
    "Tap Check to see if the 2 parts are the same size.": "તપાસો દબાવો અને જુઓ કે 2 ભાગ સરખા છે કે નહીં.",
    "The Check key lays one part on the other.": "તપાસો બટન એક ભાગને બીજા પર મૂકે છે.",
    "The parts match, so tap Share to give each child one half.": "ભાગ સરખા છે, તો વહેંચો દબાવો અને દરેક બાળકને અડધો ભાગ આપો.",
    "Tap the Share key to hand out the parts.": "ભાગ આપવા વહેંચો બટન દબાવો.",
    "Make 2 equal groups, then take 1 of them.": "2 સરખા જૂથ બનાવો, પછી તેમાંથી 1 લો.",
    "Half is the count in just 1 of the groups.": "અડધો ભાગ એટલે ફક્ત 1 જૂથની ગણતરી.",
    "Half is one of 2 equal groups, so unequal parts are never halves.": "અડધો ભાગ 2 સરખા જૂથમાંથી એક છે, અસમાન ભાગ અડધા નથી.",
    "You learned: half is one of 2 equal groups, of a roti or of a tray.": "તમે શીખ્યા: અડધો ભાગ 2 સરખા જૂથમાંથી એક છે, રોટલીનો કે ટ્રેનો.",
    "Share the 14 rotis into 2 equal baskets: how many rotis make half?": "14 રોટલી 2 સરખી ટોપલીમાં વહેંચો: અડધી કેટલી રોટલી છે?",
    "Half of 14 rotis?": "14 રોટલીનો અડધો ભાગ?",
    "The 2 baskets must hold the same number of rotis.": "2 ટોપલીમાં સરખી રોટલી હોવી જોઈએ.",
    "Take 1 of the 2 baskets: that is half.": "2 ટોપલીમાંથી 1 લો: એ જ અડધો ભાગ છે.",
    "Count the rotis in one basket only.": "ફક્ત એક ટોપલીની રોટલી ગણો.",
    "Yes, 7 rotis are half of 14 rotis.": "હા, 14 રોટલીનો અડધો ભાગ 7 રોટલી છે.",
    "What is half of these 28 chocolate bars, shared into 2 boxes?": "આ 28 ચોકલેટ 2 ડબ્બામાં વહેંચો: અડધી કેટલી છે?",
    "Half of 28 bars?": "28 ચોકલેટનો અડધો ભાગ?",
    "Both boxes get the same number of bars.": "બંને ડબ્બામાં સરખી ચોકલેટ આવે છે.",
    "Only 1 of the 2 boxes is half, not both.": "2 માંથી ફક્ત 1 ડબ્બો અડધો ભાગ છે, બંને નહીં.",
    "Count that one box's bars in twos: 2, 4, 6.": "એ એક ડબ્બાની ચોકલેટ બે-બે કરીને ગણો: 2, 4, 6.",
    "Yes, half of 28 bars is 14 bars.": "હા, 28 ચોકલેટનો અડધો ભાગ 14 ચોકલેટ છે.",
    "This roti is cut for 2 children: is it a fair share?": "આ રોટલી 2 બાળકો માટે કાપી છે: શું આ સરખી વહેંચણી છે?",
    "Is it fair?": "શું આ સરખું છે?",
    "Yes": "હા",
    "No": "ના",
    "Compare the 2 parts: is one bigger than the other?": "2 ભાગની સરખામણી કરો: શું એક ભાગ બીજાથી મોટો છે?",
    "Fair means both parts are exactly the same size.": "સરખું એટલે બંને ભાગ બરાબર એકસરખા હોય.",
    "Look at the 2 cut lines: do they make one straight line?": "2 કાપની રેખાઓ જુઓ: શું તે એક સીધી રેખા બનાવે છે?",
    "Right, the parts are not equal, so neither is a half.": "સાચું, ભાગ સરખા નથી, એટલે કોઈ પણ અડધો ભાગ નથી.",
    "Take one group: a third or a quarter": "એક જૂથ લો: ત્રીજો ભાગ કે ચોથો ભાગ",
    "The bottom number says how many groups. Share, then take one.": "નીચેની સંખ્યા કહે છે કેટલા જૂથ. વહેંચો, પછી એક લો.",
    "Tap Cut to cut the pizza into 4 parts for 4 children.": "કાપો દબાવો અને પિઝાને 4 બાળકો માટે 4 ભાગમાં કાપો.",
    "Tap the Cut key under the pizza.": "પિઝા નીચે કાપો બટન દબાવો.",
    "Tap Check to see if all 4 parts are the same size.": "તપાસો દબાવો અને જુઓ કે ચારેય ભાગ સરખા છે કે નહીં.",
    "The Check key lays one part on each other part.": "તપાસો બટન એક ભાગને દરેક બીજા ભાગ પર મૂકે છે.",
    "The parts match, so tap Share to give each child one quarter.": "ભાગ સરખા છે, તો વહેંચો દબાવો અને દરેક બાળકને ચોથો ભાગ આપો.",
    "Tap the Share key to hand out the 4 parts.": "4 ભાગ આપવા વહેંચો બટન દબાવો.",
    "The bottom number of the card says how many groups.": "કાર્ડની નીચેની સંખ્યા જૂથોની ગણતરી છે.",
    "Read the bottom number, then look at one group.": "નીચેની સંખ્યા વાંચો, પછી એક જૂથ જુઓ.",
    "A third or a quarter is what one of 3 or 4 equal groups holds.": "ત્રીજો કે ચોથો ભાગ એટલે 3 કે 4 સરખા જૂથમાંથી એક જૂથ.",
    "You learned: a quarter is one of 4 equal groups, a third one of 3.": "તમે શીખ્યા: ચોથો ભાગ 4 સરખા જૂથમાંથી એક, ત્રીજો ભાગ 3 માંથી એક.",
    "Share the 28 pizzas onto 4 equal plates: how many pizzas are one quarter?": "28 પિઝા 4 સરખી થાળીમાં વહેંચો: ચોથો ભાગ કેટલા પિઝા છે?",
    "One quarter of 28?": "28 નો ચોથો ભાગ?",
    "One quarter is what one plate holds.": "ચોથો ભાગ એટલે એક થાળીમાં જેટલા છે તેટલા.",
    "The 4 plates hold the same number each.": "ચારેય થાળીમાં સરખા પિઝા છે.",
    "Count the pizzas on one plate only.": "ફક્ત એક થાળીના પિઝા ગણો.",
    "Yes, one quarter of 28 pizzas is 7 pizzas.": "હા, 28 પિઝાનો ચોથો ભાગ 7 પિઝા છે.",
    "How many of these 30 rotis are one third, once shared into 3 baskets?": "આ 30 રોટલી 3 ટોપલીમાં વહેંચો: ત્રીજો ભાગ કેટલી છે?",
    "One third of 30?": "30 નો ત્રીજો ભાગ?",
    "The bottom number 3 means 3 baskets: count one.": "નીચેની સંખ્યા 3 એટલે 3 ટોપલી: એક ગણો.",
    "Each of the 3 baskets gets the same number.": "ત્રણેય ટોપલીમાં સરખી રોટલી આવે છે.",
    "Count the rotis in the first basket only.": "ફક્ત પહેલી ટોપલીની રોટલી ગણો.",
    "Yes, one third of 30 rotis is 10 rotis.": "હા, 30 રોટલીનો ત્રીજો ભાગ 10 રોટલી છે.",
    "Can these 22 bars be shared into 4 equal boxes to find one quarter?": "શું 22 ચોકલેટ 4 સરખા ડબ્બામાં વહેંચીને ચોથો ભાગ મળશે?",
    "4 equal boxes?": "4 સરખા ડબ્બા?",
    "After sharing, is any bar left on the tray?": "વહેંચ્યા પછી શું ટ્રે પર કોઈ ચોકલેટ બાકી છે?",
    "Fair shares use every bar, and every box gets the same.": "સરખી વહેંચણીમાં દરેક ચોકલેટ વહેંચાય, દરેક ડબ્બાને સરખું.",
    "Count the bars on the tray after sharing.": "વહેંચ્યા પછી ટ્રે પરની ચોકલેટ ગણો.",
    "Right, No: 2 bars are left over, so the 4 boxes are not equal.": "સાચું, ના: 2 ચોકલેટ વધી, એટલે 4 ડબ્બા સરખા નથી.",
    "Take more than one group: two thirds": "એકથી વધુ જૂથ લો: 3 માંથી 2 ભાગ",
    "Share into the groups the bottom number asks for. Then take as many groups as the top number says.": "નીચેની સંખ્યા જેટલા જૂથમાં વહેંચો. પછી ઉપરની સંખ્યા જેટલા જૂથ લો.",
    "Tap Cut to cut the chocolate bar into 3 equal parts.": "કાપો દબાવો અને ચોકલેટને 3 સરખા ભાગમાં કાપો.",
    "Tap the Cut key under the bar.": "ચોકલેટ નીચે કાપો બટન દબાવો.",
    "Tap one part to take it: that is one third.": "એક ભાગ દબાવીને લો: એ ત્રીજો ભાગ છે.",
    "Tap any one part of the bar.": "ચોકલેટનો કોઈ એક ભાગ દબાવો.",
    "Tap one more part: 2 of the 3 parts are two thirds.": "એક વધુ ભાગ દબાવો: 3 માંથી 2 ભાગ લીધા.",
    "Tap a part that is not taken yet.": "હજી ન લીધેલો ભાગ દબાવો.",
    "Read the top number of the card again.": "કાર્ડની ઉપરની સંખ્યા ફરી વાંચો.",
    "Add up all the groups you take.": "લીધેલા બધા જૂથ ઉમેરો.",
    "The top number says how many of the equal groups to take.": "ઉપરની સંખ્યા કહે છે કેટલા સરખા જૂથ લેવા.",
    "You learned: two fifths is 2 of 5 equal groups, taken together.": "તમે શીખ્યા: 5 માંથી 2 ભાગ એટલે 5 સરખા જૂથમાંથી 2 લેવા.",
    "Share the 25 pizzas onto 5 plates: how many pizzas are two fifths?": "25 પિઝા 5 થાળીમાં વહેંચો: 5 માંથી 2 ભાગ કેટલા પિઝા છે?",
    "Two fifths of 25?": "25 ના 5 માંથી 2 ભાગ?",
    "One plate of the 5 is one fifth.": "5 થાળીમાંથી એક થાળી 5 માંથી 1 ભાગ છે.",
    "Two fifths is 2 of the 5 plates, not 1.": "5 માંથી 2 ભાગ એટલે 2 થાળી, 1 નહીં.",
    "Count one plate, then add the second plate's pizzas.": "એક થાળી ગણો, પછી બીજી થાળીના પિઝા ઉમેરો.",
    "Yes, two fifths of 25 pizzas is 10 pizzas.": "હા, 25 પિઝાના 5 માંથી 2 ભાગ 10 પિઝા છે.",
    "How many of these 21 rotis are two thirds, once shared into 3 baskets?": "આ 21 રોટલી 3 ટોપલીમાં વહેંચો: 3 માંથી 2 ભાગ કેટલી છે?",
    "Two thirds of 21?": "21 ના 3 માંથી 2 ભાગ?",
    "Each of the 3 baskets is one third.": "3 ટોપલીમાંથી દરેક ત્રીજો ભાગ છે.",
    "The top number 2 says take 2 of the baskets.": "ઉપરની સંખ્યા 2 કહે છે 2 ટોપલી લો.",
    "Add the rotis in 2 baskets together.": "2 ટોપલીની રોટલી ઉમેરો.",
    "Yes, two thirds of 21 rotis is 14 rotis.": "હા, 21 રોટલીના 3 માંથી 2 ભાગ 14 રોટલી છે.",
    "What is five sixths of these 30 bars, shared into 6 boxes?": "આ 30 ચોકલેટ 6 ડબ્બામાં વહેંચો: 6 માંથી 5 ભાગ કેટલી છે?",
    "Five sixths of 30?": "30 ના 6 માંથી 5 ભાગ?",
    "First find how many bars one box gets.": "પહેલાં જુઓ એક ડબ્બામાં કેટલી ચોકલેટ આવે છે.",
    "Five sixths takes 5 boxes and leaves 1.": "6 માંથી 5 ભાગમાં 5 ડબ્બા લો, 1 છોડો.",
    "Add 5 of the boxes, one box at a time.": "5 ડબ્બા એક-એક કરીને ઉમેરો.",
    "Yes, five sixths of 30 bars is 25 bars.": "હા, 30 ચોકલેટના 6 માંથી 5 ભાગ 25 ચોકલેટ છે.",
    "A fraction of a collection without the picture": "ચિત્ર વિના સમૂહનો અપૂર્ણાંક",
    "The cloth hides everything. Share the number first. Then take the groups the top number names.": "કપડું બધું ઢાંકી દે છે. પહેલાં સંખ્યા વહેંચો. પછી ઉપરની સંખ્યા જેટલા જૂથ લો.",
    "Tap Divide to share the 20 rotis under the cloth into 4 groups.": "ભાગ કરો દબાવો અને કપડા નીચેની 20 રોટલી 4 જૂથમાં વહેંચો.",
    "Tap the Divide key first.": "પહેલાં ભાગ કરો બટન દબાવો.",
    "Tap Take to take 3 of the 4 groups.": "લો દબાવો અને 4 માંથી 3 જૂથ લો.",
    "Now tap the Take key.": "હવે લો બટન દબાવો.",
    "Tap Lift to lift the cloth and check the groups.": "ઉપાડો દબાવો, કપડું ઉપાડો અને જૂથ તપાસો.",
    "Tap the Lift key to look under the cloth.": "કપડા નીચે જોવા ઉપાડો બટન દબાવો.",
    "Say how many groups the top number takes.": "કહો ઉપરની સંખ્યા કેટલા જૂથ લે છે.",
    "Find one group first, then take that many groups.": "પહેલાં એક જૂથ શોધો, પછી એટલા જૂથ લો.",
    "Divide by the bottom number, then take the groups the top number names.": "નીચેની સંખ્યાથી ભાગો, પછી ઉપરની સંખ્યા જેટલા જૂથ લો.",
    "You learned: divide by the bottom number, then multiply by the top.": "તમે શીખ્યા: નીચેની સંખ્યાથી ભાગો, પછી ઉપરની સંખ્યાથી ગુણો.",
    "50 rotis are under the cloth: how many rotis are three fifths of them?": "કપડા નીચે 50 રોટલી છે: 5 માંથી 3 ભાગ કેટલી છે?",
    "Three fifths of 50?": "50 ના 5 માંથી 3 ભાગ?",
    "First divide 50 by the bottom number, 5.": "પહેલાં 50 ને નીચેની સંખ્યા 5 થી ભાગો.",
    "One fifth is one of 5 equal groups: now take 3 groups.": "5 માંથી 1 ભાગ એક સરખું જૂથ છે: હવે 3 જૂથ લો.",
    "Add one group 3 times to find three fifths.": "5 માંથી 3 ભાગ માટે એક જૂથ 3 વાર ઉમેરો.",
    "Yes, each group has 10, so three fifths of 50 is 30.": "હા, દરેક જૂથમાં 10 છે, એટલે 50 ના 5 માંથી 3 ભાગ 30 છે.",
    "90 bars are under the cloth: how many bars are half of them?": "કપડા નીચે 90 ચોકલેટ છે: તેનો અડધો ભાગ કેટલી છે?",
    "Half of 90?": "90 નો અડધો ભાગ?",
    "Share 90 into 2 equal groups: one group is half.": "90 ને 2 સરખા જૂથમાં વહેંચો: એક જૂથ અડધો ભાગ છે.",
    "Split 90 into 80 and 10, then halve each part.": "90 ને 80 અને 10 માં તોડો, પછી દરેક ભાગનો અડધો કરો.",
    "Join the two halves you found into one group.": "મળેલા બે અડધા ભાગને એક જૂથમાં જોડો.",
    "Yes, half of 90 bars is 45 bars.": "હા, 90 ચોકલેટનો અડધો ભાગ 45 ચોકલેટ છે.",
    "63 pizzas are under the cloth: how many pizzas are four ninths of them?": "કપડા નીચે 63 પિઝા છે: 9 માંથી 4 ભાગ કેટલા છે?",
    "Four ninths of 63?": "63 ના 9 માંથી 4 ભાગ?",
    "Divide 63 by 9 first: use the 9 times table.": "પહેલાં 63 ને 9 થી ભાગો: 9 નો ઘડિયો વાપરો.",
    "Then take 4 of the 9 equal groups.": "પછી 9 સરખા જૂથમાંથી 4 લો.",
    "Use the times table for 4 groups of that size.": "એટલા મોટા 4 જૂથ માટે ઘડિયો વાપરો.",
    "Yes, each group has 7, so four ninths of 63 is 28.": "હા, દરેક જૂથમાં 7 છે, એટલે 63 ના 9 માંથી 4 ભાગ 28 છે.",
    "Cut": "કાપો", "Check": "તપાસો", "Share": "વહેંચો", "Divide": "ભાગ કરો", "Take": "લો", "Lift": "ઉપાડો",
    "Taken": "લીધું", "Left": "બાકી", "Equal": "સરખા", "Bigger": "મોટો", "Not halves": "અડધા નથી",
    "left over: not equal": "વધ્યા: સરખા નથી", "each child": "દરેક બાળક", "of the bar": "ચોકલેટનો",
    "rotis": "રોટલી", "pizzas": "પિઝા", "bars": "ચોકલેટ", "roti": "રોટલી", "pizza": "પિઝા", "bar": "ચોકલેટ",
  },
};

/* One entry per phase = one mount (see the skeleton notes in docs/PATTERNS.md §9b, §16).
   Item fields of this tool: kind  share (a tray dealt into `den` holders, `num` of them taken) · fair (a whole cut for 2 children,
   is it fair?) · even (a tray: can it be dealt into `den` equal holders?) · cloth (the same sharing, numbers only, under a cloth);
   thing roti | pizza | bar; total; den (the bottom number: groups); num (the top number: groups taken); near (the misconception);
   win (the line said at the right answer). A phase's `warm` is what its guide steps work: never one of its questions. */
const PHASES = [
  {
    n: 1,
    concept: "Share into equal groups: half of a collection",
    conceptId: "M1.S2.T4.C17", objectiveIds: ["O5"],
    says: ["Half means 2 equal groups. Share fairly, and each group is the same."],
    /* the owner's opening: one roti shared fairly between 2 children (cut, check the parts are equal, hand them out) */
    warm: { kind: "whole", thing: "roti", k: 2 },
    stepHold: 2200,
    steps: [
      { say: "Tap Cut to cut the roti into 2 parts for 2 children.", on: "cut", hint: "Tap the Cut key under the roti." },
      { say: "Tap Check to see if the 2 parts are the same size.", on: "check", hint: "The Check key lays one part on the other." },
      { say: "The parts match, so tap Share to give each child one half.", on: "share", hint: "Tap the Share key to hand out the parts." },
    ],
    /* tries, as the plan writes it: First rung: count the things in one basket. Second rung: count the things in the other basket and say if they match. Third rung: the same task with a smaller tray, before the full tray returns. */
    ladder: ["Make 2 equal groups, then take 1 of them.", "Half is the count in just 1 of the groups."],
    closing: "Half is one of 2 equal groups, so unequal parts are never halves.",
    learned: "You learned: half is one of 2 equal groups, of a roti or of a tray.",
    traceback: "The tray is shared into the holders, the taken one is rimmed blue and counted, and the count is written.",
    items: [
      /* learn SG1: answer in the plan = 7 mangoes (mangoes become rotis: the owner's three things) */
      { qid: "M1.S2.T4.C17:SG1", kind: "share", thing: "roti", total: 14, den: 2, num: 1, near: 2,
        say: "Share the 14 rotis into 2 equal baskets: how many rotis make half?", ask: "Half of 14 rotis?", answer: 7,
        miss: "The 2 baskets must hold the same number of rotis.",
        ladder: ["Take 1 of the 2 baskets: that is half.", "Count the rotis in one basket only."],
        win: "Yes, 7 rotis are half of 14 rotis." },
      /* practice 1: answer in the plan = 14 bananas, because two equal trays of 14 bananas make 28 (bananas become bars) */
      { qid: "M1.S2.T4.C17:1", kind: "share", thing: "bar", total: 28, den: 2, num: 1, near: 28,
        say: "What is half of these 28 chocolate bars, shared into 2 boxes?", ask: "Half of 28 bars?", answer: 14,
        miss: "Both boxes get the same number of bars.",
        ladder: ["Only 1 of the 2 boxes is half, not both.", "Count that one box's bars in twos: 2, 4, 6."],
        win: "Yes, half of 28 bars is 14 bars." },
      /* REPLACES practice 5 (50 flowers, half red: more than the 30-thing tray, and red or not red cannot be drawn on a roti, a pizza
         or a bar) with the owner's fair-share check: a roti cut into 2 unequal parts for 2 children */
      { qid: null, kind: "fair", thing: "roti", cuts: [30, 246],
        say: "This roti is cut for 2 children: is it a fair share?", ask: "Is it fair?", answer: "no",
        choices: [{ id: "yes", label: "Yes" }, { id: "no", label: "No" }],
        miss: "Compare the 2 parts: is one bigger than the other?",
        ladder: ["Fair means both parts are exactly the same size.", "Look at the 2 cut lines: do they make one straight line?"],
        win: "Right, the parts are not equal, so neither is a half." },
    ],
  },
  {
    n: 2,
    concept: "Take one group: a third or a quarter",
    conceptId: "M1.S2.T4.C18", objectiveIds: ["O5"],
    says: ["The bottom number says how many groups. Share, then take one."],
    /* the owner's opening for a quarter: one pizza shared fairly among 4 children */
    warm: { kind: "whole", thing: "pizza", k: 4 },
    stepHold: 2200,
    steps: [
      { say: "Tap Cut to cut the pizza into 4 parts for 4 children.", on: "cut", hint: "Tap the Cut key under the pizza." },
      { say: "Tap Check to see if all 4 parts are the same size.", on: "check", hint: "The Check key lays one part on each other part." },
      { say: "The parts match, so tap Share to give each child one quarter.", on: "share", hint: "Tap the Share key to hand out the 4 parts." },
    ],
    /* tries, as the plan writes it: First rung: read the bottom number on the fraction card. Second rung: set that many pouches and share. Third rung: the same task with a smaller tray, before the full tray returns. */
    ladder: ["The bottom number of the card says how many groups.", "Read the bottom number, then look at one group."],
    closing: "A third or a quarter is what one of 3 or 4 equal groups holds.",
    learned: "You learned: a quarter is one of 4 equal groups, a third one of 3.",
    traceback: "The tray is shared into the holders, one is taken and counted; for 22 bars the 2 left over are ringed.",
    items: [
      /* learn SG2: answer in the plan = 7 pencils (pencils become pizzas) */
      { qid: "M1.S2.T4.C18:SG2", kind: "share", thing: "pizza", total: 28, den: 4, num: 1, near: 14,
        say: "Share the 28 pizzas onto 4 equal plates: how many pizzas are one quarter?", ask: "One quarter of 28?", answer: 7,
        miss: "One quarter is what one plate holds.",
        ladder: ["The 4 plates hold the same number each.", "Count the pizzas on one plate only."],
        win: "Yes, one quarter of 28 pizzas is 7 pizzas." },
      /* practice 2: answer in the plan = 10 books, because three equal shelves of 10 books make 30 (books become rotis) */
      { qid: "M1.S2.T4.C18:2", kind: "share", thing: "roti", total: 30, den: 3, num: 1, near: 15,
        say: "How many of these 30 rotis are one third, once shared into 3 baskets?", ask: "One third of 30?", answer: 10,
        miss: "The bottom number 3 means 3 baskets: count one.",
        ladder: ["Each of the 3 baskets gets the same number.", "Count the rotis in the first basket only."],
        win: "Yes, one third of 30 rotis is 10 rotis." },
      /* practice 6: answer in the plan = No. 22 mangoes cannot be shared into four equal baskets, because two mangoes are left over
         (mangoes become bars; the plan's own equal-share check) */
      { qid: "M1.S2.T4.C18:6", kind: "even", thing: "bar", total: 22, den: 4,
        say: "Can these 22 bars be shared into 4 equal boxes to find one quarter?", ask: "4 equal boxes?", answer: "no",
        choices: [{ id: "yes", label: "Yes" }, { id: "no", label: "No" }],
        miss: "After sharing, is any bar left on the tray?",
        ladder: ["Fair shares use every bar, and every box gets the same.", "Count the bars on the tray after sharing."],
        win: "Right, No: 2 bars are left over, so the 4 boxes are not equal." },
    ],
  },
  {
    n: 3,
    concept: "Take more than one group: two thirds",
    conceptId: "M1.S2.T4.C19", objectiveIds: ["O6"],
    says: ["Share into the groups the bottom number asks for. Then take as many groups as the top number says."],
    /* a whole again, for 3 children: one chocolate bar cut in 3, two parts taken */
    warm: { kind: "bar", thing: "bar", k: 3 },
    steps: [
      { say: "Tap Cut to cut the chocolate bar into 3 equal parts.", on: "cut", hint: "Tap the Cut key under the bar." },
      { say: "Tap one part to take it: that is one third.", on: "take", hint: "Tap any one part of the bar." },
      { say: "Tap one more part: 2 of the 3 parts are two thirds.", on: "take", hint: "Tap a part that is not taken yet." },
    ],
    /* tries, as the plan writes it: First rung: read the top number on the fraction card. Second rung: tap one bowl and read the counter, then tap another. Third rung: the same task with the marbles already shared, before the full task returns. */
    ladder: ["Read the top number of the card again.", "Add up all the groups you take."],
    closing: "The top number says how many of the equal groups to take.",
    learned: "You learned: two fifths is 2 of 5 equal groups, taken together.",
    traceback: "The tray is shared, the groups the top number names are rimmed blue, each is counted and the sum is written.",
    items: [
      /* learn SG3: answer in the plan = 10 marbles (marbles become pizzas) */
      { qid: "M1.S2.T4.C19:SG3", kind: "share", thing: "pizza", total: 25, den: 5, num: 2, near: 5,
        say: "Share the 25 pizzas onto 5 plates: how many pizzas are two fifths?", ask: "Two fifths of 25?", answer: 10,
        miss: "One plate of the 5 is one fifth.",
        ladder: ["Two fifths is 2 of the 5 plates, not 1.", "Count one plate, then add the second plate's pizzas."],
        win: "Yes, two fifths of 25 pizzas is 10 pizzas." },
      /* practice 3: answer in the plan = 14 laddoos, because each of the three plates holds 7 laddoos and two plates hold 14 (laddoos become rotis) */
      { qid: "M1.S2.T4.C19:3", kind: "share", thing: "roti", total: 21, den: 3, num: 2, near: 7,
        say: "How many of these 21 rotis are two thirds, once shared into 3 baskets?", ask: "Two thirds of 21?", answer: 14,
        miss: "Each of the 3 baskets is one third.",
        ladder: ["The top number 2 says take 2 of the baskets.", "Add the rotis in 2 baskets together."],
        win: "Yes, two thirds of 21 rotis is 14 rotis." },
      /* practice 7: answer in the plan = 25 pencils, because each of the six pouches holds 5 pencils and five pouches hold 25 (pencils become bars) */
      { qid: "M1.S2.T4.C19:7", kind: "share", thing: "bar", total: 30, den: 6, num: 5, near: 5,
        say: "What is five sixths of these 30 bars, shared into 6 boxes?", ask: "Five sixths of 30?", answer: 25,
        miss: "First find how many bars one box gets.",
        ladder: ["Five sixths takes 5 boxes and leaves 1.", "Add 5 of the boxes, one box at a time."],
        win: "Yes, five sixths of 30 bars is 25 bars." },
    ],
  },
  {
    n: 4,
    concept: "A fraction of a collection without the picture",
    conceptId: "M1.S2.T4.C20", objectiveIds: ["O6"],
    says: ["The cloth hides everything. Share the number first. Then take the groups the top number names."],
    /* the steps write the two sums with the pencil on a warm-up (20 rotis, three quarters), then lift the cloth */
    warm: { kind: "cloth", thing: "roti", total: 20, den: 4, num: 3 },
    stepHold: 2200,
    steps: [
      { say: "Tap Divide to share the 20 rotis under the cloth into 4 groups.", on: "divide", hint: "Tap the Divide key first." },
      { say: "Tap Take to take 3 of the 4 groups.", on: "take", hint: "Now tap the Take key." },
      { say: "Tap Lift to lift the cloth and check the groups.", on: "lift", hint: "Tap the Lift key to look under the cloth." },
    ],
    /* tries, as the plan writes it: First rung: divide the total by the bottom number only. Second rung: say how many groups the top number takes. Third rung: the same task with the cloth lifted for one look at the plates. */
    ladder: ["Say how many groups the top number takes.", "Find one group first, then take that many groups."],
    closing: "Divide by the bottom number, then take the groups the top number names.",
    learned: "You learned: divide by the bottom number, then multiply by the top.",
    traceback: "The cloth lifts: one plate a group with its count, the taken plates rimmed blue, and the two sums written in full.",
    items: [
      /* learn SG4: answer in the plan = 30 laddoos (laddoos become rotis) */
      { qid: "M1.S2.T4.C20:SG4", kind: "cloth", thing: "roti", total: 50, den: 5, num: 3, near: 10,
        say: "50 rotis are under the cloth: how many rotis are three fifths of them?", ask: "Three fifths of 50?", answer: 30,
        miss: "First divide 50 by the bottom number, 5.",
        ladder: ["One fifth is one of 5 equal groups: now take 3 groups.", "Add one group 3 times to find three fifths."],
        win: "Yes, each group has 10, so three fifths of 50 is 30." },
      /* practice 4: answer in the plan = 45 bangles, because 90 bangles shared into two equal groups gives 45 in each group (bangles become bars) */
      { qid: "M1.S2.T4.C20:4", kind: "cloth", thing: "bar", total: 90, den: 2, num: 1, near: 2,
        say: "90 bars are under the cloth: how many bars are half of them?", ask: "Half of 90?", answer: 45,
        miss: "Share 90 into 2 equal groups: one group is half.",
        ladder: ["Split 90 into 80 and 10, then halve each part.", "Join the two halves you found into one group."],
        win: "Yes, half of 90 bars is 45 bars." },
      /* practice 8: answer in the plan = 28 bananas, because 63 bananas shared into nine equal groups gives 7 in each group and four groups hold 28 (bananas become pizzas) */
      { qid: "M1.S2.T4.C20:8", kind: "cloth", thing: "pizza", total: 63, den: 9, num: 4, near: 7,
        say: "63 pizzas are under the cloth: how many pizzas are four ninths of them?", ask: "Four ninths of 63?", answer: 28,
        miss: "Divide 63 by 9 first: use the 9 times table.",
        ladder: ["Then take 4 of the 9 equal groups.", "Use the times table for 4 groups of that size."],
        win: "Yes, each group has 7, so four ninths of 63 is 28." },
    ],
  },
];

/* The numbers, rows, sizes and targets the working area needs (they go into the sidecar too). */
const MODEL = { things: ["roti", "pizza", "bar"], trayMax: 30, holdersMin: 2, holdersMax: 6, freeTotal: 24, wholeDisc: 300, wholeBar: [320, 85] };

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* judge: is this value right for this item? (numbers compare as numbers; Yes / No by its id) */
const judge = (item: any, v: any) => {
  if (item.parts) return judgeSlotParts(item, v);
  if (typeof item.answer === "number") return leadNumber(v) === item.answer;
  return String(v).trim().toLowerCase() === String(item.answer).trim().toLowerCase();
};
/* oracle: a second route that shares no code with judge or Work: deal the things one at a time round the groups,
   then add up the groups taken; Yes / No from what is left after the dealing, or from the two parts' angles */
const oracle = () => PHASES.every((p: any) => p.items.every((it: any) => {
  if (it.kind === "fair") {
    const a = it.cuts[1] - it.cuts[0], b = 360 - a;
    return it.answer === (a === b ? "yes" : "no");
  }
  const g = Array.from({ length: it.den }, () => 0);
  let left = it.total;
  for (let i = 0; left > 0 && i < 1000; i++) { g[i % it.den]++; left--; }
  const fair = g.every((x) => x === g[0]);
  if (it.kind === "even") return it.answer === (fair ? "yes" : "no");
  if (!fair) return false;
  return g.slice(0, it.num).reduce((s, x) => s + x, 0) === it.answer;
}));
/* the most likely wrong answer (the misconception); judge must reject it */
const nearMiss = (item: any) => (item.choices ? (item.answer === "no" ? "yes" : "no")
  : typeof item.answer === "number" ? (item.near ?? item.answer + 1) : "~");
/* the forms of an answer that no question, hint or ladder line may print (a Yes / No answer has none: "no" is an ordinary word) */
const answerForms = (item: any) => (item.choices ? []
  : typeof item.answer === "number" ? [String(item.answer), indian(item.answer), words(item.answer)] : [String(item.answer)]);
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => item.answer;

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
/* THE ANSWER GATE (the owner, 2026-10-24; first made in the ported pair, carried here): once the child has acted on the board (SG_CHILD: a real
   tap on a key or a piece, or Enter on a guide step), each question's Answer key and keypad stay locked (api.lock: the corner key is drawn flat
   and dimmed, no blink, digits ignored) until the child has done that question's act. The agent's check() performs the act (SG_AGENT: the mount
   is then agent-driven and ungated); AI mode, and a run driven only through toolApi (approve, hostsim), are never gated. */
const SG_AGENT = { on: false };
const SG_CHILD = { on: false };
const solve = (item: any, T: any) => (T.state().stage === "demo" ? HOOK.demo && HOOK.demo() : T.submit(item.answer));
/* the agent's answer() for an item made on the working area: none here, every answer is typed or chosen */
const answer = (item: any, v: any) => undefined;
/* the agent's check() before Enter: nothing waits on the working area, so it presses Enter (and in a steps phase performs the step) */
const check = () => (HOOK.check ? HOOK.check() : undefined);

/* ── the drawing: plain shapes in code, a <Skin> over every roti, pizza and bar (images.tsx) ─────────────────── */
/* role colours: blue = Taken, amber = Left, vermilion = Bigger; deep ink for words on them */
const SG = { taken: "#0072B2", left: "#E69F00", bigger: "#D55E00", cream: "#FFF6DF", deep: "#0A3C6E",
  wood: "#DDB27A", woodEdge: "#A0703A", woodIn: "#EBCB98", cloth: "#7E4C6C", clothHi: "#9C6A89", paper: "#FFFDF4", line: "#D9CDB8" };
const SG_THING: any = {
  roti: { fill: "#E8C28A", edge: "#A5743A", holder: "basket", word: "rotis" },
  pizza: { fill: "#F0C863", edge: "#B0732D", holder: "plate", word: "pizzas" },
  bar: { fill: "#6B4226", edge: "#3A2212", holder: "box", word: "bars" },
};
const SG_AR = 200 / 53;   /* the bar picture's own shape, 3.77 : 1, never stretched */
/* ONE size and place whether the keypad is open or shut (LAYOUT §3): the picture is laid out once, 880 wide, at x 10 of the working
   area, so it fits the open area (900 with bigPad) and never moves when the panel slides in */
const SG_FW = 880, SG_X0 = 10;
const SG_TRAY = { x: 0, y: 0, w: 670, h: 160 };
const SG_CARD = { x: 700, y: 0, w: 180, h: 170 };      /* the fraction card: top right on the tray and cloth screens */
const SG_CARD_W = { x: 10, y: 336, w: 210, h: 170 };   /* bottom left, under the whole, on the sharing screens */
const SG_HY = 196, SG_HH = 230, SG_KY = 440;
const SG_P = { x: 165, y: 172 }, SG_R = 150;                 /* a whole roti or pizza: a disc 300 across, at the left */
const SG_BAR = { x: 476, y: 247, w: 320, h: 320 / SG_AR };   /* a whole chocolate bar, its own 3.77 : 1, held in front of the 3 children at their hands */
/* the children: figure skins child_a..d (images.json made 110x240, 73x240, 72x240, 82x240), 2, 3 or 4 of them in that order,
   standing on one baseline right of the whole */
const SG_FIGS = ["child_a", "child_b", "child_c", "child_d"], SG_FIG_AR = [110 / 240, 73 / 240, 72 / 240, 82 / 240], SG_FEET = 430;
const SG_KIDS_X = [345, 880];

const sgPol = (cx: number, cy: number, r: number, deg: number) => ({ x: cx + r * Math.sin((deg * Math.PI) / 180), y: cy - r * Math.cos((deg * Math.PI) / 180) });
const sgWedge = (cx: number, cy: number, r: number, a: number, w: number) => {
  const p = sgPol(cx, cy, r, a), q = sgPol(cx, cy, r, a + w);
  return `M ${cx} ${cy} L ${p.x} ${p.y} A ${r} ${r} 0 ${w > 180 ? 1 : 0} 1 ${q.x} ${q.y} Z`;
};
/* the parts of a disc cut along `cuts` (angles clockwise from the top), each { a, w } */
const sgParts = (cuts: number[]) => cuts.map((a, i) => ({ a, w: (i + 1 < cuts.length ? cuts[i + 1] : cuts[0] + 360) - a }));
const sgMid = (pt: any, d = 1) => sgPol(SG_P.x, SG_P.y, SG_R * (pt.w >= 180 ? 0.45 : 0.58) * d, pt.a + pt.w / 2);
/* the biggest grid of k things in a W x H box (ar = width / height of one thing) */
const sgFit = (k: number, W: number, H: number, ar: number, max: number) => {
  let best: any = null;
  for (let cols = 1; cols <= Math.max(1, k); cols++) {
    const rows = Math.ceil(Math.max(1, k) / cols), cw = W / cols, ch = H / rows;
    const iw = Math.min(cw * 0.88, ch * 0.88 * ar, max);
    if (!best || iw > best.iw + 0.01) best = { cols, rows, cw, ch, iw, ih: iw / ar };
  }
  return best;
};
const sgCell = (g: any, j: number, x: number, y: number, H: number) => {
  const r = Math.floor(j / g.cols), c = j % g.cols, top = y + (H - g.rows * g.ch) / 2;
  return { x: x + c * g.cw + (g.cw - g.iw) / 2, y: top + r * g.ch + (g.ch - g.ih) / 2, w: g.iw, h: g.ih };
};
/* the share screen: the tray, the holders, the dealing order (round by round, one thing a holder, there and back) */
const sgShareLay = (it: any) => {
  const bar = it.thing === "bar", ar = bar ? SG_AR : 1, max = bar ? 130 : 64;
  const n = it.den, cap = Math.floor(it.total / n), full = cap * n, rem = it.total - full;
  const hw = Math.min(420, (SG_FW - 16 * (n - 1)) / n), hx = (SG_FW - (n * hw + 16 * (n - 1))) / 2;
  const holders = Array.from({ length: n }, (_, h) => ({ x: hx + h * (hw + 16), y: SG_HY, w: hw, h: SG_HH }));
  const tg = sgFit(it.total, SG_TRAY.w - 40, SG_TRAY.h - 24, ar, max);
  const hg = sgFit(cap, hw - 28, SG_HH - 48, ar, max);
  const order: number[] = [];
  for (let r = 0; r < cap; r++) for (let j = 0; j < n; j++) order.push(r % 2 ? n - 1 - j : j);
  return { bar, n, cap, full, rem, holders, order,
    tray: (j: number) => sgCell(tg, j, SG_TRAY.x + 20, SG_TRAY.y + 12, SG_TRAY.h - 24),
    inHolder: (h: number, j: number) => sgCell(hg, j, holders[h].x + 14, holders[h].y + 36, SG_HH - 48) };
};
/* the cloth screen: one plate a group on the tray, the slate's two sums in columns */
const sgClothLay = (it: any, warm = false) => {
  const n = it.den, pw = Math.min(150, (650 - 10 * (n - 1)) / n), px = (SG_TRAY.w - (n * pw + 10 * (n - 1))) / 2;
  const g = it.total / n;
  return { n, g, ans: g * it.num, plates: Array.from({ length: n }, (_, h) => ({ x: px + h * (pw + 10), y: 36, w: pw, h: 140 })),
    cols: [110, 215, 305, 395, 520], lines: warm ? [318, 402] : [338, 456], size: warm ? 52 : 60 };
};
const sgSum = (it: any, L: any, line: number) => (line === 0 ? [String(it.total), "÷", String(it.den), "=", String(L.g)] : [String(L.g), "×", String(it.num), "=", String(L.ans)]);

/* one thing (a small roti, pizza or bar): the plain shape, then its picture. A bar is a bevelled chocolate tile with square segments;
   it is dark, so its role is a wash: a BLUE hue and a blue rim when taken, a cream wash when left (>= 3 : 1 apart, measured) */
function sgThing(name: string, b: any, wash: string, k: any, skinned = true) {
  const th = SG_THING[name];
  if (name === "bar") {
    const rx = Math.min(6, b.h * 0.22), segs = Math.max(2, Math.round(b.w / b.h)), gw = Math.max(1.5, b.h * 0.07);
    return (
      <g key={k}>
        <rect x={b.x} y={b.y} width={b.w} height={b.h} rx={rx} fill={th.fill} stroke={th.edge} strokeWidth={2} />
        {skinned && <Skin name="bar" x={b.x} y={b.y} w={b.w} h={b.h} fit="stretch" />}
        {Array.from({ length: segs - 1 }, (_, s) => {
          const gx = b.x + ((s + 1) * b.w) / segs;
          return (
            <g key={"g" + s}>
              <line x1={gx} y1={b.y + 3} x2={gx} y2={b.y + b.h - 3} stroke="#2A160A" strokeWidth={gw} strokeOpacity={0.8} />
              <line x1={gx + gw} y1={b.y + 4} x2={gx + gw} y2={b.y + b.h - 4} stroke="#FFFFFF" strokeWidth={gw * 0.6} strokeOpacity={0.25} />
            </g>
          );
        })}
        {wash === "taken" && <rect x={b.x} y={b.y} width={b.w} height={b.h} rx={rx} fill={SG.taken} fillOpacity={0.5} stroke={SG.taken} strokeWidth={2.5} />}
        {wash === "left" && <rect x={b.x} y={b.y} width={b.w} height={b.h} rx={rx} fill={SG.cream} fillOpacity={0.62} stroke="#C9A36A" strokeWidth={2} />}
      </g>
    );
  }
  const r = b.w / 2;
  return (
    <g key={k}>
      <circle cx={b.x + r} cy={b.y + r} r={r} fill={th.fill} stroke={th.edge} strokeWidth={2} />
      {skinned && <Skin name={name} x={b.x} y={b.y} w={b.w} h={b.h} clip="url(#sgDiscClip)" />}
    </g>
  );
}
/* a holder, plain code, recognisable before anything is shared: a wicker basket with a handle (rotis), a round-cornered plate
   (pizzas), an open box with its flaps (bars); its outline carries the role (blue Taken, amber Left) */
function sgHolder(kind: string, b: any, role: string, C: any) {
  const rim = role === "taken" ? SG.taken : role === "left" ? SG.left : "", sw = 7;
  const { x, y, w, h } = b;
  if (kind === "basket") {
    const body = `M ${x + 4} ${y + 24} H ${x + w - 4} L ${x + w - 18} ${y + h - 12} Q ${x + w - 20} ${y + h} ${x + w - 34} ${y + h} H ${x + 34} Q ${x + 20} ${y + h} ${x + 18} ${y + h - 12} Z`;
    const rows: number[] = [];
    for (let yy = y + 50; yy < y + h - 10; yy += 24) rows.push(yy);
    return (
      <g filter="url(#sgSoftShadow)">
        <path d={`M ${x + w * 0.24} ${y + 26} Q ${x + w / 2} ${y - 22} ${x + w * 0.76} ${y + 26}`} fill="none" stroke="#A9732F" strokeWidth={7} strokeLinecap="round" />
        <path d={body} fill="url(#sgBasketGrad)" stroke={rim || "#9C6B30"} strokeWidth={rim ? sw : 3} strokeLinejoin="round" />
        {rows.map((yy, r) => <line key={r} x1={x + 16} y1={yy} x2={x + w - 16} y2={yy} stroke="#A8742F" strokeWidth={2.5} strokeOpacity={0.55} />)}
        <rect x={x} y={y + 14} width={w} height={20} rx={10} fill="#C98F45" stroke={rim || "#8E5E28"} strokeWidth={rim ? sw : 3} />
      </g>
    );
  }
  if (kind === "plate") {
    const r = Math.min(w, h) * 0.32;
    return (
      <g filter="url(#sgSoftShadow)">
        <rect x={x} y={y + 8} width={w} height={h - 8} rx={r} fill="url(#sgPlateGrad)" stroke={rim || "#A8977A"} strokeWidth={rim ? sw : 3.5} />
        <rect x={x + 9} y={y + 17} width={w - 18} height={h - 26} rx={Math.max(6, r - 8)} fill="none" stroke="#FFFFFF" strokeWidth={4} />
        <rect x={x + 16} y={y + 24} width={w - 32} height={h - 40} rx={Math.max(6, r - 14)} fill="#EFE6D6" stroke="#C9B89A" strokeWidth={3} />
        <ellipse cx={x + w / 2} cy={y + 8 + (h - 8) / 2} rx={(w - 32) * 0.34} ry={(h - 40) * 0.34} fill="none" stroke="#DCCDB4" strokeWidth={3} />
      </g>
    );
  }
  return (
    <g filter="url(#sgSoftShadow)">
      <path d={`M ${x + 6} ${y + 22} L ${x - 4} ${y + 4} H ${x + w * 0.47} L ${x + w * 0.5} ${y + 22} Z`} fill="#C8935A" stroke="#8C5E2C" strokeWidth={2.5} strokeLinejoin="round" />
      <path d={`M ${x + w * 0.5} ${y + 22} L ${x + w * 0.53} ${y + 4} H ${x + w + 4} L ${x + w - 6} ${y + 22} Z`} fill="#C8935A" stroke="#8C5E2C" strokeWidth={2.5} strokeLinejoin="round" />
      <rect x={x} y={y + 20} width={w} height={h - 20} rx={8} fill="#D9A86C" stroke={rim || "#8C5E2C"} strokeWidth={rim ? sw : 3} />
      <rect x={x + 10} y={y + 30} width={w - 20} height={h - 40} rx={6} fill="#C4904F" />
    </g>
  );
}
/* a written label on a chip: Taken (blue, white words), Left (amber, dark words) or plain (white, dark words) */
function sgChip(x: number, y: number, w: number, h: number, text: string, role: string, size: number) {
  const fill = role === "taken" ? SG.taken : role === "left" ? SG.left : "#FFFFFF";
  const edge = role === "taken" ? shade(SG.taken, 0.25) : role === "left" ? shade(SG.left, 0.3) : role === "bigger" ? SG.bigger : "#2B2B2B";
  return (
    <g pointerEvents="none" filter="url(#sgChipShadow)">
      <rect x={x} y={y} width={w} height={h} rx={h / 2} fill={fill} stroke={edge} strokeWidth={role === "bigger" ? 5 : 3.5} />
      <text x={x + w / 2} y={y + h / 2 + size * 0.35} textAnchor="middle" fontSize={size} fontWeight={700} fill={role === "taken" ? "#FFFFFF" : "#2B2B2B"}>{text}</text>
    </g>
  );
}
/* a fraction card in box c: the top number over a line over the bottom number, a label under it (a blank top stays blank) */
function sgCard(c: any, top: any, bot: any, label: string) {
  const cx = c.x + c.w / 2;
  return (
    <g pointerEvents="none" filter="url(#sgCardShadow)">
      <rect x={c.x} y={c.y} width={c.w} height={c.h} rx={22} fill="url(#sgCardGrad)" stroke="#2B2B2B" strokeWidth={3.5} />
      {top !== "" && <text x={cx} y={c.y + 54} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill="#2B2B2B">{top}</text>}
      <line x1={cx - 44} y1={c.y + 68} x2={cx + 44} y2={c.y + 68} stroke="#2B2B2B" strokeWidth={6} strokeLinecap="round" />
      <text x={cx} y={c.y + 118} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill="#2B2B2B">{bot}</text>
      <text x={cx} y={c.y + 148} textAnchor="middle" fontSize={T.label} fontWeight={600} fill="#2B2B2B">{label}</text>
    </g>
  );
}
/* a child: the FIGURE skin (a real picture, IMAGES.md figure) in a box of exactly its own made aspect, no clip, no stretch, standing
   on one baseline; under it only a ground shadow at the feet (the plain fallback skins-fallback counts): no body shape, so nothing
   can show through the picture's transparent gap between the legs */
function sgChild(cx: number, i: number, H: number, skinned = true) {
  const w = H * SG_FIG_AR[i], x = cx - w / 2, y = SG_FEET - H;
  return (
    <g key={"kid" + i} pointerEvents="none">
      <ellipse cx={cx} cy={SG_FEET - 2} rx={w * 0.5} ry={7} fill="#000000" fillOpacity={0.16} />
      {skinned && <Skin name={SG_FIGS[i]} x={x} y={y} w={w} h={H} />}
    </g>
  );
}
/* where the children stand: in a row right of the whole, spread evenly; 300 tall (290 for four) */
const sgKidH = (k: number) => (k === 4 ? 290 : 300);
const sgKids = (k: number) => {
  const H = sgKidH(k), ws = SG_FIG_AR.slice(0, k).map((a) => a * H);
  const gap = (SG_KIDS_X[1] - SG_KIDS_X[0] - ws.reduce((s, v) => s + v, 0)) / (k + 1);
  let x = SG_KIDS_X[0] + gap;
  return ws.map((v) => { const cx = x + v / 2; x += v + gap; return cx; });
};
const sgKidX = (i: number, k: number) => sgKids(k)[i];
const sgFresh = (ek: number, p: any) => ({ ek, dealt: 0, taken: [], cuts: 0, parted: false, ghost: null, eq: false, given: 0, tk: [],
  pc1: 0, pc2: 0, lift: 0, demo: 0, fthing: (p && p.fthing) || "roti", fgroups: (p && p.fgroups) || 3 });

/* ── the working area ────────────────────────────────────────────────────────────────────────
   keyOnly: 64,108, 1472 x 520 shut, 900 x 520 open (bigPad); the picture is laid out once at 880 wide, at x 10, open or shut.
   Screens: a whole shared among children (phase 1-2 steps; phase 1's fair check), a whole bar cut in 3 (phase 3 steps), a tray dealt
   into holders (the share questions and free play), a cloth with plates and a slate (phase 4). Every act through api.act. */
function Work({ phase, n, item, index, stage, wrong, typed, api, MODEL, step, stepOn, box, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();
  const free = stage === "free";
  const warm = !free && !!(phase && phase.steps && phase.warm) && (stage === "demo" || stage === "teach");
  /* the board belongs to an ENTRY of a question (PATTERNS §18): rebuilt whenever the question key changes */
  const qk = free ? "free" : n + ":" + index + ":" + (warm ? "w" : "q");
  const ent = useRef({ qk: "", n: 0 });
  if (ent.current.qk !== qk) ent.current = { qk, n: ent.current.n + 1 };
  const ek = ent.current.n;
  const [raw, setRaw] = useState<any>(null);
  const S = raw && raw.ek === ek ? raw : sgFresh(ek, raw);
  const put = (o: any) => setRaw((p: any) => ({ ...(p && p.ek === ek ? p : sgFresh(ek, p)), ...o }));
  const it: any = free ? { kind: "share", thing: S.fthing, total: MODEL.freeTotal, den: S.fgroups, num: 1 } : warm ? phase.warm : item || {};
  const kind = it.kind;
  const level = free || warm ? 0 : stage === "win" || stage === "idle" ? 3 : S.demo;
  const asking = free || warm || stage === "ask";
  const x0 = SG_X0;
  const X = (p: any) => ({ x: p.x + x0, y: p.y });
  const th = SG_THING[it.thing] || SG_THING.roti;

  const pieces = it.total || (kind === "fair" ? 2 : kind === "whole" ? it.k : 1);
  const skinned = pieces > 0 && pieces <= 40;

  /* one act at a time */
  const busy = useRef(false);
  /* the typed answer at the last miss: the worked answer leaves the screen when the child starts a retry (the owner's rule) */
  const missTyped = useRef<any>(undefined);
  useEffect(() => () => { tl.stop(); missTyped.current = undefined; }, [ek]);
  const run = (o: any, after: () => void) => {
    if (busy.current) return;
    busy.current = true;
    api.act(o).then((ok: boolean) => { busy.current = false; if (ok) after(); });
  };

  /* the whole (phases 1-2 steps, phase 1's fair question) */
  const fairQ = kind === "fair";
  const cuts: number[] = fairQ ? it.cuts : kind === "whole" ? Array.from({ length: it.k }, (_, i) => (360 * i) / it.k) : [];
  const parts = sgParts(cuts);
  const parted = fairQ || S.parted;
  const small = fairQ ? (parts[0].w < parts[1].w ? 0 : 1) : 0, big = 1 - small;
  const kids = kind === "whole" || fairQ ? (fairQ ? 2 : it.k) : kind === "bar" ? it.k : 0;
  /* which child gets which part: the parts left to right go to the children left to right */
  const kidOf = parts.map((pt, i) => i).sort((a, b) => sgMid(parts[a]).x - sgMid(parts[b]).x);
  const kidFor = (i: number) => kidOf.indexOf(i);
  const ghostAt = (j: number) => parts[j].a - parts[fairQ ? small : 0].a;
  const ghost = fairQ && level >= 1 ? ghostAt(big) : S.ghost;
  const holdY = (k: number) => SG_FEET - sgKidH(k) * 0.47;
  /* the fair question answered: each child holds the part they were given, the bigger one marked */
  const fairWin = fairQ && (stage === "win" || stage === "idle");

  const L = kind === "share" || kind === "even" ? sgShareLay(it) : null;
  const CL = kind === "cloth" ? sgClothLay(it, warm) : null;
  const dealt = L ? (level ? L.full : S.dealt) : 0;
  const shared = !!L && dealt >= L.full;
  const roles = !!L && kind === "share" && shared;
  let taken: boolean[] = L ? Array.from({ length: L.n }, (_, h) => !!S.taken[h]) : [];
  if (L && level && kind === "share" && taken.filter(Boolean).length !== it.num) taken = taken.map((_, h) => h < it.num);
  const takenN = taken.filter(Boolean).length;
  /* the question's own act: Share (the deal); on "more than one group" questions also one tap on a group after it; Check on the fair roti.
     Phase 4's cloth questions offer no act, so they are not gated */
  const needAct = !free && !warm && stage === "ask" && (kind === "share" || kind === "even" || kind === "fair");
  const actDone = kind === "fair" ? !!S.eq : kind === "share" ? shared && (it.num < 2 || !!S.took) : kind === "even" ? shared : true;
  const gated = needAct && !actDone;

  const s1 = CL ? sgSum(it, CL, 0) : [], s2 = CL ? sgSum(it, CL, 1) : [];
  const len1 = s1.join("").length, len2 = s2.join("").length;
  const lift = CL ? (level >= 1 ? 1 : S.lift) : 0;

  /* the acts: each performed on screen, then reported with api.did (the guide steps move on the awaited one) */
  const doCut = () => {
    if (S.parted) { api.did("cut"); return; }
    const pts = kind === "bar" ? [1, 2].map((j) => X({ x: SG_BAR.x + (SG_BAR.w * j) / 3, y: SG_BAR.y + SG_BAR.h / 2 }))
      : cuts.map((a) => X(sgPol(SG_P.x, SG_P.y, SG_R * 0.55, a)));
    run({ tool: "knife", moves: "slice", at: pts, onPoint: (i: number) => put({ cuts: i + 1 }) },
      () => { put({ cuts: pts.length, parted: true }); api.sfx.settle(); api.did("cut"); });
  };
  const doCheck = () => {
    if (S.eq || !parted) { api.did("check"); return; }
    const src = fairQ ? small : 0, targets = fairQ ? [big] : parts.map((_, j) => j).filter((j) => j !== 0);
    const at = [src, ...targets].map((j) => X(sgMid(parts[j])));
    run({ tool: "hand", moves: "tap", at, onPoint: (i: number) => put({ ghost: i === 0 ? 0 : ghostAt(targets[i - 1]) }) },
      () => { put({ eq: true, ghost: fairQ ? ghostAt(big) : null }); api.sfx.settle(); api.did("check"); });
  };
  const doGive = () => {
    if (S.given >= parts.length || !S.eq) { api.did("share"); return; }
    const at = parts.map((_, i) => X({ x: sgKidX(kidFor(i), parts.length), y: holdY(parts.length) }));
    const hold = <g><circle r={26} fill={th.fill} stroke={th.edge} strokeWidth={2} />{skinned && <Skin name={it.thing} x={-26} y={-26} w={52} h={52} clip="url(#sgDiscClip)" opacity={1} />}</g>;
    run({ tool: "hand", moves: "carry", from: X(SG_P), at, hold, onPoint: (i: number) => put({ given: i + 1 }) },
      () => {
        put({ given: parts.length }); api.sfx.settle();
        /* the step is done: say what it shows at once (BEFORE the step moves on, so the question still comes after it), so the old
           instruction does not stand while the result is held */
        if (parts.length === 2) api.say("Now both children have a fair share.");
        else api.say("Now all 4 children have a fair share.");
        api.did("share");
      });
  };
  const doShare = () => {
    if (!L || S.dealt >= L.full) { api.did("share"); return; }
    const at = L.order.map((h) => X({ x: L.holders[h].x + L.holders[h].w / 2, y: L.holders[h].y + SG_HH / 2 }));
    const hb = L.bar ? { x: -45, y: -12, w: 90, h: 90 / SG_AR } : { x: -24, y: -24, w: 48, h: 48 };
    run({ tool: "hand", moves: "carry", from: X({ x: SG_TRAY.w / 2, y: SG_TRAY.h / 2 }), at, hold: <g>{sgThing(it.thing, hb, "", "hold", skinned)}</g>,
      onPoint: (i: number) => put({ dealt: i + 1 }) },
      () => {
        put({ dealt: L.full }); api.sfx.settle();
        if (needAct && kind === "share" && it.num >= 2 && !S.took) api.say("Now tap the groups the top number names.");
        api.did("share");
      });
  };
  const takeHolder = (h: number) => {
    if (busy.current) return;
    SG_CHILD.on = true;
    missTyped.current = undefined;
    tl.stop();
    const t = taken.map((v, j) => (j === h ? !v : v));
    if (gated && it.num >= 2 && item && item.say) api.say(item.say);   /* the nudge has done its job: the question comes back */
    put({ taken: t, demo: 0, took: true });
    api.sfx.tick();
    api.did("take");
  };
  const takePiece = (i: number) => {
    if (!S.parted) { api.did("take"); return; }
    const j = i ?? [0, 1, 2].find((q) => !S.tk[q]);
    if (j === undefined || S.tk[j]) { api.did("again"); return; }
    const t = [0, 1, 2].map((q) => q === j || !!S.tk[q]);
    put({ tk: t });
    api.sfx.tick();
    if (t.filter(Boolean).length === 2) api.say("You have taken two thirds of the bar.");
    api.did("take");
  };
  const write = (line: number) => {
    const toks = line === 0 ? s1 : s2, y = CL.lines[line];
    run({ tool: "pencil", moves: "write", text: toks, at: CL.cols.map((x: number) => X({ x, y })), size: CL.size, align: "middle",
      onPoint: (j: number) => put(line === 0 ? { pc1: j + 1 } : { pc2: j + 1 }) },
      () => { put(line === 0 ? { pc1: len1 } : { pc2: len2 }); api.did(line === 0 ? "divide" : "take"); });
  };
  const doLift = () => {
    if (S.lift >= 1 || S.pc2 < len2) { api.did("lift"); return; }
    run({ tool: "hand", moves: "push", from: X({ x: 335, y: 180 }), at: [X({ x: 335, y: 110 }), X({ x: 335, y: 40 })],
      onPoint: (i: number) => put({ lift: (i + 1) / 2 }) },
      () => { put({ lift: 1 }); api.sfx.settle(); api.say("The plates under the cloth match the sums."); api.did("lift"); });
  };
  const act = (on: any, arg?: any) => {
    if (busy.current) return;
    if (S.demo) { missTyped.current = undefined; tl.stop(); put({ demo: 0 }); }
    if (on === "cut") return doCut();
    if (on === "check") return doCheck();
    if (on === "share") return kind === "whole" ? doGive() : doShare();
    if (on === "take") return kind === "bar" ? takePiece(arg) : kind === "cloth" ? (S.pc1 < len1 ? api.did("take") : S.pc2 >= len2 ? api.did("take") : write(1)) : null;
    if (on === "divide") return S.pc1 >= len1 ? api.did("divide") : write(0);
    if (on === "lift") return doLift();
  };
  /* Enter, the agent's check() and the dev solve() perform the CURRENT step */
  api.onEnter(stage === "demo" && stepOn ? () => act(stepOn) : null);
  HOOK.demo = () => act(stepOn);
  const gateHeld = useRef(false);
  const stageNow = useRef(stage);
  stageNow.current = stage;
  useEffect(() => {
    const f = (e: any) => { if (e.isTrusted && e.key === "Enter" && stageNow.current === "demo") SG_CHILD.on = true; };
    window.addEventListener("keydown", f, true);
    return () => window.removeEventListener("keydown", f, true);
  }, []);
  useEffect(() => () => { if (gateHeld.current) { gateHeld.current = false; api.lock(false); } }, [ek]);
  useEffect(() => {
    let ai = false;
    try { ai = (window as any).toolApi.getState().mode === "ai"; } catch (e) {}
    const want = gated && SG_CHILD.on && !ai && !SG_AGENT.on;
    if (want && !gateHeld.current) { gateHeld.current = true; api.lock(true); }
    else if (!want && gateHeld.current) { gateHeld.current = false; api.lock(false); }
  }, [gated, ek, stage]);
  /* the agent's check() at a gated question performs the act at once (no Enter while the gate was held: its answer was refused) */
  HOOK.check = stage === "ask" && gated ? () => {
    const held = gateHeld.current;
    SG_AGENT.on = true;
    if (kind === "fair") put({ eq: true, ghost: ghostAt(big) });
    else put({ dealt: L.full, ...(it.num >= 2 ? { taken: taken.map((_, h) => h === 0), took: true } : {}) });
    return held ? true : undefined;
  } : undefined;

  /* the traceback: redraw the maths in three beats, ending on the whole right answer. The pad is NOT locked (the play test): the child
     may retry at once, and the first key or tap takes the worked answer off the screen so it cannot be copied (the owner's decision) */
  useEffect(() => {
    if (!wrong || stage !== "ask") return;
    missTyped.current = typed;
    put({ demo: 1 });
    tl.run([[800, () => put({ demo: 2 })], [900, () => put({ demo: 3 })]]);
  }, [wrong]);
  useEffect(() => {
    if (missTyped.current === undefined || typed === missTyped.current) return;
    missTyped.current = undefined;
    tl.stop();
    put({ demo: 0 });
  }, [typed]);

  /* the win line, one tick after the win (so the runtime swaps a phase's last one for its closing) */
  useEffect(() => {
    if (stage !== "win" || free || !item || !item.win) return;
    const t = setTimeout(() => api.say(item.win), 0);
    return () => clearTimeout(t);
  }, [stage, n, index]);

  /* what the host and the agent read back (toolApi.getState): never a count that answers the question */
  api.share({ complete: stage === "idle", thing: it.thing || null, total: it.total || null, holders: L ? L.n : null, shared,
    taken: L ? takenN : null, covered: CL ? lift < 1 : null });

  /* the one key for a sequence (keyOnly §16c): its label follows the act; none after the last */
  let keyId = "", keyOff = false;
  if (kind === "whole") keyId = !S.parted ? "cut" : !S.eq ? "check" : S.given < parts.length ? "share" : "";
  else if (fairQ) { keyId = "check"; keyOff = S.eq || !asking; }
  else if (kind === "bar") keyId = !S.parted ? "cut" : "";
  else if (kind === "cloth") keyId = warm ? (S.pc1 < len1 ? "divide" : S.pc2 < len2 ? "take" : S.lift < 1 ? "lift" : "") : "";
  else if (L) { keyId = "share"; keyOff = shared || !asking; }
  const KEY_LABEL: any = { cut: "Cut", check: "Check", share: "Share", divide: "Divide", take: "Take", lift: "Lift" };
  const lastKey = useRef(0);
  const pressKey = (id: string) => {
    const t = Date.now();
    if (t - lastKey.current < 400) return;
    lastKey.current = t;
    SG_CHILD.on = true;
    act(id);
  };
  const keyBox = free ? { x: 696, y: SG_KY, w: 160, h: 72 } : { x: SG_FW / 2 - 120, y: SG_KY, w: 240, h: 72 };
  const invOn = asking && !level && (warm ? stepOn : kind === "fair" ? (S.eq ? "" : "check") : L && !shared && !free ? "share" : "");

  /* ── drawing ── */
  const wholeView = () => {
    const kidsN = kids, H = sgKidH(kidsN);
    return (
      <g>
        <defs>{parts.map((pt, i) => <clipPath key={i} id={"sgw" + i}><path d={sgWedge(SG_P.x, SG_P.y, SG_R, pt.a, pt.w)} /></clipPath>)}
          <clipPath id="sgWhole"><circle cx={SG_P.x} cy={SG_P.y} r={SG_R} /></clipPath></defs>
        {Array.from({ length: kidsN }, (_, i) => sgChild(sgKidX(i, kidsN), i, H, skinned))}
        {!parted ? (
          <g filter="url(#sgSoftShadow)">
            <circle cx={SG_P.x} cy={SG_P.y} r={SG_R} fill={th.fill} stroke={th.edge} strokeWidth={3} />
            {skinned && <Skin name={it.thing} x={SG_P.x - SG_R} y={SG_P.y - SG_R} w={2 * SG_R} h={2 * SG_R} clip="url(#sgWhole)" />}
            {cuts.slice(0, S.cuts).map((a, i) => { const q = sgPol(SG_P.x, SG_P.y, SG_R, a); return <line key={i} x1={SG_P.x} y1={SG_P.y} x2={q.x} y2={q.y} stroke="#2B2B2B" strokeWidth={4.5} strokeLinecap="round" />; })}
          </g>
        ) : parts.map((pt, i) => {
          const m = sgPol(0, 0, 8, pt.a + pt.w / 2), c = sgMid(pt);
          const given = fairQ ? fairWin : i < S.given, kxp = sgKidX(kidFor(i), parts.length);
          /* a share handed over is held in front of its child, at the hands */
          const tf = given ? `translate(${kxp} ${holdY(parts.length)}) scale(0.42) translate(${-c.x} ${-c.y})` : `translate(${m.x} ${m.y})`;
          /* the correction: the bit of the bigger part that the smaller part does not cover, in the Bigger colour */
          const extra = fairQ && level >= 2 && i === big ? sgWedge(SG_P.x, SG_P.y, SG_R, pt.a + parts[small].w, pt.w - parts[small].w) : "";
          return (
            <g key={i} transform={tf} filter="url(#sgSoftShadow)">
              <path d={sgWedge(SG_P.x, SG_P.y, SG_R, pt.a, pt.w)} fill={th.fill} stroke={th.edge} strokeWidth={3} />
              {skinned && <Skin name={it.thing} x={SG_P.x - SG_R} y={SG_P.y - SG_R} w={2 * SG_R} h={2 * SG_R} clip={"url(#sgw" + i + ")"} />}
              {extra && <path d={extra} fill={SG.bigger} fillOpacity={0.35} stroke={SG.bigger} strokeWidth={7} strokeLinejoin="round" pointerEvents="none" />}
              <path d={sgWedge(SG_P.x, SG_P.y, SG_R, pt.a, pt.w)} fill="none" stroke="#2B2B2B" strokeWidth={given ? 8 : 4} strokeLinejoin="round" />
            </g>
          );
        })}
        {ghost !== null && ghost !== undefined && parted && !fairWin && (
          <g transform={`rotate(${ghost} ${SG_P.x} ${SG_P.y})`} pointerEvents="none">
            {(() => { const pt = parts[fairQ ? small : 0], m = sgPol(0, 0, 8, pt.a + pt.w / 2); return (
              <path transform={`translate(${m.x} ${m.y})`} d={sgWedge(SG_P.x, SG_P.y, SG_R, pt.a, pt.w)} fill="#FFFFFF" fillOpacity={0.55} stroke="#2B2B2B" strokeWidth={5} strokeDasharray="14 9" />
            ); })()}
          </g>
        )}
        {kind === "whole" && sgCard(SG_CARD_W, 1, it.k, tx("each child"))}
        {kind === "whole" && S.eq && sgChip(470, 24, 200, 56, tx("Equal"), "", 32)}
        {fairQ && level >= 2 && sgChip(370, 24, 200, 56, tx("Bigger"), "bigger", 32)}
        {fairQ && level >= 3 && sgChip(600, 24, 250, 56, tx("Not halves"), "", 32)}
      </g>
    );
  };

  const barView = () => {
    /* cut, each third moves in front of its own child (offset from its place in the whole bar) */
    const w3 = SG_BAR.w / 3, offs = [0, 1, 2].map((i) => (S.parted ? sgKidX(i, 3) - w3 / 2 - (SG_BAR.x + i * w3) : 0));
    const tk = S.tk.filter(Boolean).length;
    const firstFree = [0, 1, 2].find((q) => !S.tk[q]);
    return (
      <g>
        <defs>{[0, 1, 2].map((i) => <clipPath key={i} id={"sgbp" + i}><rect x={SG_BAR.x + i * w3 + offs[i]} y={SG_BAR.y} width={w3} height={SG_BAR.h} /></clipPath>)}</defs>
        {Array.from({ length: 3 }, (_, i) => sgChild(sgKidX(i, 3), i, sgKidH(3), skinned))}
        {[0, 1, 2].map((i) => {
          const pr = { x: SG_BAR.x + i * w3 + offs[i], y: SG_BAR.y, w: w3, h: SG_BAR.h }, on = !!S.tk[i];
          return (
            <g key={i} filter="url(#sgSoftShadow)">
              <rect x={pr.x} y={pr.y} width={pr.w} height={pr.h} fill={SG_THING.bar.fill} />
              {skinned && <Skin name="bar" x={SG_BAR.x + offs[i]} y={SG_BAR.y} w={SG_BAR.w} h={SG_BAR.h} fit="stretch" clip={"url(#sgbp" + i + ")"} />}
              {/* square segments: each third is 2 x 2 squares of chocolate */}
              <line x1={pr.x + pr.w / 2} y1={pr.y + 4} x2={pr.x + pr.w / 2} y2={pr.y + pr.h - 4} stroke="#2A160A" strokeWidth={3} strokeOpacity={0.8} />
              <line x1={pr.x + 4} y1={pr.y + pr.h / 2} x2={pr.x + pr.w - 4} y2={pr.y + pr.h / 2} stroke="#2A160A" strokeWidth={3} strokeOpacity={0.8} />
              {S.parted && <rect x={pr.x} y={pr.y} width={pr.w} height={pr.h} fill={on ? SG.taken : SG.cream} fillOpacity={on ? 0.5 : 0.62} />}
              <rect x={pr.x} y={pr.y} width={pr.w} height={pr.h} fill="none" stroke={on ? SG.taken : "#2B2B2B"} strokeWidth={on ? 7 : 3.5} />
              {on && sgChip(pr.x + pr.w / 2 - 56, pr.y + pr.h + 8, 112, 42, tx("Taken"), "taken", 28)}
              {S.parted && !on && asking && <Hit id="take" x={pr.x - 3} y={pr.y - 14} w={pr.w + 6} h={pr.h + 28} label={"Part " + (i + 1)} onPress={() => { SG_CHILD.on = true; act("take", i); }} />}
            </g>
          );
        })}
        {!S.parted && [1, 2].slice(0, S.cuts).map((j) => <line key={j} x1={SG_BAR.x + w3 * j} y1={SG_BAR.y - 4} x2={SG_BAR.x + w3 * j} y2={SG_BAR.y + SG_BAR.h + 4} stroke="#2B2B2B" strokeWidth={4.5} />)}
        {sgCard(SG_CARD_W, tk ? tk : "", 3, tx("of the bar"))}
        {stepOn === "take" && firstFree !== undefined && S.parted && <Invite x={SG_BAR.x + firstFree * w3 + offs[firstFree] + w3 / 2} y={SG_BAR.y + SG_BAR.h / 2} w={w3} h={SG_BAR.h} rx={4} C={C} />}
      </g>
    );
  };

  const shareView = () => {
    const trayN = it.total - dealt, kindH = th.holder;
    const trayH = shared && !L.rem ? 96 : SG_TRAY.h;
    const fillN = L.holders.map((_, h) => L.order.slice(0, dealt).filter((q) => q === h).length);
    const tapOk = roles && asking;
    const g = L.cap, word = tx(th.word);
    const sum = it.num === 1 ? g + " " + word : Array.from({ length: it.num }, () => String(g)).join("+") + " = " + g * it.num;   /* one label (labels-short): no spaces inside the sum */
    const showLeft = L.rem > 0 && ((kind === "even" && level >= 2) || (free && shared));
    const lb = showLeft ? Array.from({ length: L.rem }, (_, j) => L.tray(j)) : [];
    return (
      <g>
        <g filter="url(#sgTrayShadow)">
          <rect x={SG_TRAY.x} y={SG_TRAY.y} width={SG_TRAY.w} height={trayH} rx={24} fill="url(#sgTrayGrad)" stroke={SG.woodEdge} strokeWidth={4} />
          <rect x={SG_TRAY.x + 10} y={SG_TRAY.y + 10} width={SG_TRAY.w - 20} height={trayH - 20} rx={16} fill="url(#sgTrayInGrad)" stroke="#BFA275" strokeWidth={1.5} />
        </g>
        {Array.from({ length: trayN }, (_, j) => sgThing(it.thing, L.tray(j), "", "t" + j, skinned))}
        {lb.length > 0 && (() => { const x1 = Math.min(...lb.map((b) => b.x)) - 8, y1 = Math.min(...lb.map((b) => b.y)) - 8, x2 = Math.max(...lb.map((b) => b.x + b.w)) + 8, y2 = Math.max(...lb.map((b) => b.y + b.h)) + 8;
          return <rect x={x1} y={y1} width={x2 - x1} height={y2 - y1} rx={12} fill="none" stroke="#2B2B2B" strokeWidth={5} strokeDasharray="12 8" pointerEvents="none" />; })()}
        {/* the line under the tray the brief promises when the groups cannot be equal (the 22 bars' correction, and free play) */}
        {((kind === "even" && level >= 3) || (free && showLeft)) && sgChip(230, 96, 420, 52, L.rem + " " + tx("left over: not equal"), "", 32)}
        {kind === "share" && !free && level >= 3 && sgChip(SG_TRAY.w / 2 - Math.min(300, 40 + sum.length * 13), trayH / 2 - 36, Math.min(600, 80 + sum.length * 26), 72, sum, "", 44)}
        {sgCard(SG_CARD, kind === "share" ? it.num : 1, it.den, word)}
        {L.holders.map((b, h) => {
          const role = roles ? (taken[h] ? "taken" : "left") : "";
          /* the count joins the role's word on its chip, at the correction, the win and in free play (a narrow tab keeps the word only:
             the result chip on the tray carries the counts, and neighbouring tabs keep their clearance) */
          const counted = (level >= 2 || free) && kind === "share";
          const cw = Math.min(140, b.w - 18);
          return (
            <g key={"h" + h}>
              {sgHolder(kindH, b, role, C)}
              {Array.from({ length: fillN[h] }, (_, j) => sgThing(it.thing, L.inHolder(h, j), roles && L.bar ? role : "", "i" + h + "-" + j, skinned))}
              {role && sgChip(b.x + b.w / 2 - cw / 2, SG_HY - 16, cw, 38, tx(role === "taken" ? "Taken" : "Left") + (counted && cw >= 128 ? " " + fillN[h] : ""), role, 28)}
              {tapOk && kind === "share" && <Hit id={"holder-" + (h + 1)} x={b.x} y={b.y} w={b.w} h={b.h} label={"Group " + (h + 1)} onPress={() => takeHolder(h)} />}
              {gated && shared && h === 0 && <Invite x={b.x + b.w / 2} y={b.y + b.h / 2} w={b.w} h={b.h} rx={16} C={C} />}
            </g>
          );
        })}
      </g>
    );
  };

  const clothView = () => {
    const showRoles = warm ? S.lift >= 1 && S.pc2 >= len2 : level >= 2;
    const cTop = 14, cBot = cTop + 182 * (1 - lift), word = tx(th.word);
    const pc = [S.pc1, S.pc2];
    const sumRow = (toks: string[], line: number) => {
      const y = CL.lines[line];
      let off = 0;
      return toks.map((t, j) => {
        const x = CL.cols[j], start = off;
        off += t.length;
        const unknown = !warm && (line === 0 ? j === 4 : j === 0 || j === 4);
        if (warm) return <PencilText key={j} text={t} x={x} y={y} size={CL.size} align="middle" chars={Math.max(0, Math.min(t.length, pc[line] - start))} />;
        if (unknown && level < 3) return <rect key={j} x={x - 52} y={y - CL.size} width={104} height={CL.size + 16} rx={12} fill="#FFFFFF" stroke="#2B2B2B" strokeWidth={3.5} filter="url(#sgSoftShadow)" />;
        /* the sign is printed WITH its number ("× 3"), so a × reads as multiplication, never as a cross mark (wrong-is-unmarked) */
        if (j === 2) return null;
        if (j === 1) return <text key={j} x={(CL.cols[1] + CL.cols[2]) / 2} y={y} textAnchor="middle" fontSize={CL.size} fontWeight={700} fill="#2B2B2B">{t + " " + toks[2]}</text>;
        return <text key={j} x={x} y={y} textAnchor="middle" fontSize={CL.size} fontWeight={700} fill={unknown ? shade(SG.taken, 0.25) : "#2B2B2B"}>{t}</text>;
      });
    };
    return (
      <g>
        <g filter="url(#sgTrayShadow)">
          <rect x={SG_TRAY.x} y={cTop} width={SG_TRAY.w} height={182} rx={24} fill="url(#sgTrayGrad)" stroke={SG.woodEdge} strokeWidth={4} />
        </g>
        {lift > 0 && CL.plates.map((b, h) => {
          const role = showRoles ? (h < it.num ? "taken" : "left") : "";
          const pg = sgFit(CL.g, b.w - 30, b.h - 40, 1, 44);
          return (
            <g key={"p" + h}>
              {sgHolder("plate", b, role, C)}
              {warm ? Array.from({ length: CL.g }, (_, j) => sgThing(it.thing, sgCell(pg, j, b.x + 15, b.y + 24, b.h - 40), "", "w" + h + j, skinned))
                : <text x={b.x + b.w / 2} y={b.y + b.h / 2 + 18} textAnchor="middle" fontSize={Math.max(T.label + 4, Math.min(T.xl, b.w * 0.6))} fontWeight={700} fill="#2B2B2B">{CL.g}</text>}
            </g>
          );
        })}
        {showRoles && [["taken", 0, it.num], ["left", it.num, it.den]].map(([role, a, z]: any) => {
          if (z <= a) return null;
          const xa = CL.plates[a].x, xz = CL.plates[z - 1].x + CL.plates[z - 1].w, w = Math.max(120, xz - xa);
          return <g key={role}>{sgChip(xa + (xz - xa) / 2 - w / 2, 202, w, 40, tx(role === "taken" ? "Taken" : "Left"), role, 30)}</g>;
        })}
        {cBot - cTop > 4 && (
          <g pointerEvents="none" filter="url(#sgClothShadow)">
            <path d={`M 0 ${cTop + 28} Q 0 ${cTop} 28 ${cTop} H ${SG_TRAY.w - 28} Q ${SG_TRAY.w} ${cTop} ${SG_TRAY.w} ${cTop + 28} V ${cBot - 10} Q 620 ${cBot + 8} 560 ${cBot - 4} Q 490 ${cBot + 10} 420 ${cBot - 4} Q 340 ${cBot + 10} 260 ${cBot - 4} Q 180 ${cBot + 10} 100 ${cBot - 4} Q 40 ${cBot + 8} 0 ${cBot - 10} Z`} fill="url(#sgClothGrad)" stroke="#4E2C43" strokeWidth={3.5} />
            {[120, 260, 400, 540].map((x) => <path key={x} d={`M ${x} ${cTop + 8} Q ${x + 14} ${(cTop + cBot) / 2} ${x} ${cBot - 14}`} fill="none" stroke={SG.clothHi} strokeWidth={5} strokeLinecap="round" />)}
            {cBot - cTop > 120 && (
              <g filter="url(#sgSoftShadow)">
                <line x1={500} y1={cBot - 72} x2={530} y2={cBot - 100} stroke="#2B2B2B" strokeWidth={3.5} />
                <rect x={370} y={cBot - 74} width={260} height={62} rx={16} fill="#FFFDF4" stroke="#2B2B2B" strokeWidth={3.5} />
                <text x={500} y={cBot - 30} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill="#2B2B2B">{it.total + " " + word}</text>
              </g>
            )}
          </g>
        )}
        <g filter="url(#sgSlateShadow)">
          <rect x={0} y={252} width={SG_TRAY.w} height={warm ? 180 : 260} rx={20} fill="url(#sgPaperGrad)" stroke={C.rule} strokeWidth={3.5} />
          {CL.lines.map((y: number) => <line key={y} x1={24} y1={y + 12} x2={SG_TRAY.w - 24} y2={y + 12} stroke={SG.line} strokeWidth={2} />)}
          {sumRow(s1, 0)}
          {sumRow(s2, 1)}
        </g>
        {sgCard(SG_CARD, it.num, it.den, word)}
      </g>
    );
  };

  const freeKeys = () => {
    const things = ["roti", "pizza", "bar"], x = 24;
    return (
      <g>
        {things.map((t, j) => (
          <Key key={"th" + j} id={"thing-" + t} label={tx(t)} x={x + j * 80} y={SG_KY} w={72} h={72} C={C} tone={S.fthing === t ? "enter" : "key"}
            onClick={() => put({ fthing: t, dealt: 0, taken: [] })}>
            {t === "bar" ? sgThing("bar", { x: -30, y: -8, w: 60, h: 60 / SG_AR }, "", "k", skinned) : sgThing(t, { x: -24, y: -24, w: 48, h: 48 }, "", "k", skinned)}
          </Key>
        ))}
        {[2, 3, 4, 5, 6].map((g, j) => (
          <Key key={"gr" + j} id={"groups-" + g} label={g + " groups"} x={x + 264 + j * 80} y={SG_KY} w={72} h={72} C={C} tone={S.fgroups === g ? "enter" : "key"}
            onClick={() => put({ fgroups: g, dealt: 0, taken: [] })}>
            <text y={13} textAnchor="middle" fontSize={T.label + 4} fontWeight={700} fill={toneInk(S.fgroups === g ? "enter" : "key", C.ink)}>{g}</text>
          </Key>
        ))}
      </g>
    );
  };

  return (
    <g transform={`translate(${x0} 0)`}>
      <defs>
        <clipPath id="sgDiscClip" clipPathUnits="objectBoundingBox"><circle cx={0.5} cy={0.5} r={0.5} /></clipPath>
        <filter id="sgSoftShadow" x="-10%" y="-10%" width="120%" height="130%">
          <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#1A0D00" floodOpacity="0.14" />
        </filter>
        <filter id="sgTrayShadow" x="-5%" y="-5%" width="110%" height="120%">
          <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#1A0D00" floodOpacity="0.16" />
        </filter>
        <filter id="sgCardShadow" x="-10%" y="-10%" width="120%" height="130%">
          <feDropShadow dx="0" dy="6" stdDeviation="5" floodColor="#2B2B2B" floodOpacity="0.12" />
        </filter>
        <filter id="sgChipShadow" x="-10%" y="-15%" width="120%" height="140%">
          <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#000000" floodOpacity="0.15" />
        </filter>
        <filter id="sgClothShadow" x="-5%" y="0%" width="110%" height="130%">
          <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#28081E" floodOpacity="0.22" />
        </filter>
        <filter id="sgSlateShadow" x="-5%" y="-5%" width="110%" height="120%">
          <feDropShadow dx="0" dy="5" stdDeviation="5" floodColor="#1A0D00" floodOpacity="0.12" />
        </filter>
        <linearGradient id="sgTrayGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#EAD1AA" />
          <stop offset="100%" stopColor="#C89D61" />
        </linearGradient>
        <linearGradient id="sgTrayInGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FAF2E5" />
          <stop offset="100%" stopColor="#E3C493" />
        </linearGradient>
        <linearGradient id="sgCardGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#F5EFE3" />
        </linearGradient>
        <linearGradient id="sgPaperGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFDF7" />
          <stop offset="100%" stopColor="#F7EEDC" />
        </linearGradient>
        <linearGradient id="sgClothGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#915B7E" />
          <stop offset="100%" stopColor="#673B57" />
        </linearGradient>
        <linearGradient id="sgBasketGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#EBC285" />
          <stop offset="100%" stopColor="#C99452" />
        </linearGradient>
        <linearGradient id="sgPlateGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#EFE8DC" />
        </linearGradient>
      </defs>
      {(kind === "whole" || kind === "fair") && wholeView()}
      {kind === "bar" && barView()}
      {L && shareView()}
      {CL && clothView()}
      {free && freeKeys()}
      {keyId && (
        <Key key="act0" id={keyId} label={tx(KEY_LABEL[keyId])} x={keyBox.x} y={keyBox.y} w={keyBox.w} h={keyBox.h} C={C} tone="key" disabled={keyOff}
          onClick={() => pressKey(keyId)}>
          <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={keyOff ? C.dim : toneInk("key", C.ink)}>{tx(KEY_LABEL[keyId])}</text>
        </Key>
      )}
      {keyId && invOn === keyId && !keyOff && <Invite x={keyBox.x + keyBox.w / 2} y={keyBox.y + keyBox.h / 2} w={keyBox.w} h={keyBox.h} rx={RAD.key} C={C} />}
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase: the groups (taken ones blue) and the count; a Yes / No
   answer about a fair share draws its object (the roti cut in 2 unequal parts, or a bar) and the sign ≠ (no word: nothing English in hi / gu) */
function Thumb({ result, it, C, w, h, lang = "en", tx = (v: any) => v }: any) {
  const last = result && result.last;
  if (!last || last.value === null || last.value === undefined) return null;
  const item = it || {};
  const frame = <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />;
  if (item.choices) {
    const no = String(last.value).toLowerCase() === "no", r = h * 0.38, cx = 14 + r, cy = h / 2;
    const sx = w - 46, sy = h / 2;
    const sign = (
      <g stroke={C.ink} strokeWidth={5} strokeLinecap="round">
        <line x1={sx - 18} y1={sy - 8} x2={sx + 18} y2={sy - 8} />
        <line x1={sx - 18} y1={sy + 8} x2={sx + 18} y2={sy + 8} />
        {no && <line x1={sx + 10} y1={sy - 20} x2={sx - 10} y2={sy + 20} />}
      </g>
    );
    if (item.kind === "fair") {
      const pa = sgPol(cx, cy, r, item.cuts[0]), pb = sgPol(cx, cy, r, item.cuts[1]);
      return (
        <g>
          {frame}
          <defs><clipPath id="sgThumbDisc" clipPathUnits="objectBoundingBox"><circle cx={0.5} cy={0.5} r={0.5} /></clipPath></defs>
          <circle cx={cx} cy={cy} r={r} fill={SG_THING.roti.fill} stroke={SG_THING.roti.edge} strokeWidth={2} />
          <Skin name="roti" x={cx - r} y={cy - r} w={2 * r} h={2 * r} clip="url(#sgThumbDisc)" />
          <path d={`M ${pa.x} ${pa.y} L ${cx} ${cy} L ${pb.x} ${pb.y}`} fill="none" stroke="#2B2B2B" strokeWidth={3} />
          {sign}
        </g>
      );
    }
    const bw = Math.min(w * 0.55, 130), bh = bw / SG_AR, by = h / 2 - bh / 2, cut = bw * 0.64;
    return (
      <g>
        {frame}
        <defs>
          <clipPath id="sgThumbBarA"><rect x={14} y={by} width={cut - 3} height={bh} /></clipPath>
          <clipPath id="sgThumbBarB"><rect x={14 + cut + 3} y={by} width={bw - cut - 3} height={bh} /></clipPath>
        </defs>
        <rect x={14} y={by} width={cut - 3} height={bh} rx={4} fill={SG_THING.bar.fill} />
        <rect x={17 + cut + 3} y={by} width={bw - cut - 3} height={bh} rx={4} fill={SG_THING.bar.fill} />
        <Skin name="bar" x={14} y={by} w={bw} h={bh} fit="stretch" clip="url(#sgThumbBarA)" />
        <g transform="translate(3 0)"><Skin name="bar" x={14} y={by} w={bw} h={bh} fit="stretch" clip="url(#sgThumbBarB)" /></g>
        {sign}
      </g>
    );
  }
  const den = item.den || 2, num = item.num || 0;
  const bw = Math.min(28, (w * 0.56 - 5 * (den - 1)) / den);
  return (
    <g>
      {frame}
      {Array.from({ length: den }, (_, i) => (
        <rect key={i} x={12 + i * (bw + 5)} y={h / 2 - bw / 2} width={bw} height={bw} rx={6} fill={i < num ? SG.taken : "#FFFFFF"} stroke={i < num ? shade(SG.taken, 0.25) : SG.left} strokeWidth={3} />
      ))}
      <text x={w - 14} y={h / 2 + 12} textAnchor="end" fontSize={T.label} fontWeight={700} fill={C.ink}>{String(last.value)}</text>
    </g>
  );
}

function ShareIntoGroups(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, fitHost: () => null,
      /* the board layout (LAYOUT.md §1b) */
      board: true,
      /* KEY ONLY (the new look; LAYOUT.md §1d, PATTERNS.md §16): the question lives only in the bubble; nothing under props.box.key */
      keyOnly: true,
      /* the wide keypad (PATTERNS.md 9g): the picture is laid out 880 wide, so it fits x 64 to 964 with the panel open */
      bigPad: true,
      /* the Next key (PATTERNS.md 9d): nothing moves on by itself */
      nextKey: true,
      /* NAV DOTS (LAYOUT.md §1d) */
      navDots: true,
      /* the start page: the tool's name, StartArt, START_HOOK, a Start key */
      StartArt, START_HOOK,
      /* the keypad colours: the image agent's TOOL_THEME (images.tsx) is picked up by the runtime */
      }} />
  );
}

export default ShareIntoGroups;