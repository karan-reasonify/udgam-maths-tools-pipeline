/* ═══ M1.S1.T2.C8.2D1 · tenths_builder · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists: header + its three controls, canvas, slot + pad, bubble + mascot,
   phase dots (user / AI mode), window.toolApi, sounds, the synced voice, scoring, the events,
   idle and restart. NO imports in this file; only the five host hooks. Follow docs/LAYOUT.md.
   Edit, never rewrite. Built by `node cli.mjs scaffold`; concepts are verbatim (check compares them).

   The picture (board layout, LAYOUT.md §1b): chocolate bars on a cutting board on the left, a fraction card
   and a decimal card on the right, the buttons along the foot. The board and its bars have ONE size and place, the
   panel shut or open (laid out for the open panel, 1086): a bar is ten slots of `cell` (75), and a cut piece is
   inset TB_GAP / 2 inside its slot, so a cut row is as long as a whole bar. Only the cards follow `box.w`. The card that holds the form a question asks for stays covered until the
   answer is given; the other card may read the child's shading live. The skins (images.tsx "piece",
   "disc") are only the look: every cut, count, tint and label is drawn here in code. */

const TOOL_ID = "tenths_builder";
const MEDIA_ID = "M1.S1.T2.C8.2D1";
const TOOL_NAME = "Tenths Builder";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
const VOICE = {"rate":0.92,"pitch":1.06};

/* the lesson is silent (r30): every line is printed on the bubble. Every phase has guide steps, which replace the
   opening and the teach lines (the runtime never shows them in a steps phase), so there are none */
const OPENING: string[] = [];
/* the whole-tool line: printed on the summary page */
const FINISH_LINE = "You cut, shaded and traded tenths, and counted every one.";
/* printed when the child opens Free play (the plan's free-play line) */
const FREE_LINE = "Free play: cut, shade and trade as many strips as you like.";

/* Hindi and Gujarati (docs/PATTERNS.md §11): every line above and below stays English, exactly as the checks
   read it; this table is keyed by that English, and the runtime looks each spoken or drawn line up in it.
   Fill it AFTER the English is final and reviewed (`node cli.mjs voice` lists every line still missing),
   then bake the voice. Empty = the tool runs in English only. */
const TR: any = {
  hi: {
    "Tenths Builder": "दशांश बनाओ",
    "One tenth": "एक दशांश",
    "Tenths as decimals": "दशांश, दशमलव रूप में",
    "Wholes and tenths together": "पूर्ण और दशांश एक साथ",
    "Ten tenths make one whole": "दस दशांश से एक पूर्ण",
    "You cut, shaded and traded tenths, and counted every one.": "तुमने दशांश काटे, रंगे और बदले, और हर एक को गिना।",
    "Free play: cut, shade and trade as many strips as you like.": "मुक्त खेल: जितनी चाहो, पट्टियाँ काटो, रंगो और बदलो।",
    /* phase 1 */
    "Tap Cut to cut the strip into ten parts, all the same width.": "'काटो' दबाकर दस बराबर भाग करो।",
    "Count all the parts first, one by one.": "पहले सारे भाग एक-एक करके गिनो।",
    "A tenth comes only from ten parts of one size.": "दसों भाग एक नाप के हों, तभी दशांश।",
    "One of ten equal parts is one tenth, and it is written 0.1.": "दस बराबर भागों में से एक भाग एक दशांश है, और इसे 0.1 लिखते हैं।",
    "You learned: one of ten equal parts is one tenth, written 0.1": "तुमने सीखा: दस बराबर भागों में से एक, एक दशांश यानी 0.1",
    "What fraction of the strip is one part?": "एक भाग पट्टी का कौन-सा भिन्न है?",
    "One part, as a fraction?": "एक भाग का भिन्न?",
    "Which number goes on top: the part you take, or all the parts?": "ऊपर क्या आएगा: लिया भाग, या सारे भाग?",
    "Shade a part and write it as a decimal.": "एक भाग रंगो और उसे दशमलव में लिखो।",
    "Shaded part, as a decimal?": "रंगा भाग, दशमलव में?",
    "One part is less than a whole, so what goes before the point?": "भाग पूरे से छोटा है, पहले क्या आएगा?",
    "Is this shaded part a tenth?": "क्या यह रंगा भाग एक दशांश है?",
    "Is it a tenth?": "क्या यह दशांश है?",
    "Would ten parts the size of the shaded one fill this strip exactly?": "ऐसे दस भाग क्या पट्टी ठीक भरेंगे?",
    "Yes": "हाँ",
    "No": "नहीं",
    "yes": "हाँ",
    "no": "नहीं",
    "Yes, 1/10: one part out of ten.": "हाँ, 1 बटा 10: दस में से एक भाग।",
    "Yes, 0.1: the 0 before the point means no whole strips.": "हाँ, 0.1: बिंदु से पहले 0, पूरी पट्टी नहीं।",
    "Right, unequal parts are not tenths.": "सही, असमान भाग दशांश नहीं होते।",
    /* phase 2 */
    "Tap one part to shade it.": "एक भाग दबाकर रंगो।",
    "Tap another part and watch the digit after the point.": "दूसरा भाग दबाओ, बिंदु के बाद देखो।",
    "Shade the parts one at a time, and count as you go.": "एक-एक भाग रंगो, और साथ-साथ गिनो।",
    "Say the amount in tenths first, then write it.": "पहले बोलो कितने दशांश हैं, फिर लिखो।",
    "A number of tenths is written with that digit after the point.": "दशांश की गिनती बिंदु के बाद लिखते हैं।",
    "You learned: tenths are written as the digit after the point": "तुमने सीखा: दशांश बिंदु के बाद वाला अंक है",
    "Shade 8 parts and write the decimal.": "8 भाग रंगो और दशमलव लिखो।",
    "8 parts shaded: decimal?": "8 भाग रंगे: दशमलव?",
    "Count only the shaded parts, each one a tenth.": "केवल रंगे भाग गिनो, हर एक दशांश है।",
    "Write 9/10 as a decimal.": "9 बटा 10 को दशमलव में लिखो।",
    "This fraction as a decimal?": "यह भिन्न, दशमलव में?",
    "Shade that many tenths and count them.": "उतने दशांश रंगो और गिनो।",
    "Write 0.8 as a fraction.": "0.8 को भिन्न में लिखो।",
    "What fraction is it?": "यह कौन-सा भिन्न है?",
    "Shade the tenths in 0.8, then look at the whole strip.": "इतने दशांश रंगो, फिर पूरी पट्टी देखो।",
    "Yes, 0.8: eight of the ten parts are shaded.": "हाँ, 0.8: दस में से आठ भाग रंगे हैं।",
    "Right, 9 tenths and 0.9 are the same amount.": "सही, 9 दशांश और 0.9 एक ही मात्रा हैं।",
    "Yes, zero point eight means 8 tenths.": "हाँ, शून्य दशमलव आठ यानी 8 दशांश।",
    /* phase 3 */
    "Tap one part of the cut strip.": "कटी हुई पट्टी का एक भाग दबाओ।",
    "Tap another part and watch which side of the point changes.": "दूसरा भाग दबाओ, बिंदु की कौन ओर बदली?",
    "Look at the full strips, then at the shaded parts.": "पहले पूरी पट्टियाँ देखो, फिर रंगे भाग।",
    "Say the wholes, then the point, then the tenths.": "पहले पूर्ण बोलो, फिर बिंदु, फिर दशांश।",
    "Whole strips give the whole number part, and tenths give the decimal part.": "पूरी पट्टियों से पूर्ण संख्या भाग बनता है, और दशांश से दशमलव भाग।",
    "You learned: wholes go before the point, tenths after it": "तुमने सीखा: पूर्ण बिंदु से पहले, दशांश उसके बाद",
    "Shade 9 tenths of the cut strip, then write all the strips as one decimal.": "कटी हुई पट्टी के 9 दशांश रंगो, फिर सब पट्टियाँ मिलाकर एक दशमलव में लिखो।",
    "2 wholes, 9 tenths: decimal?": "2 पूर्ण, 9 दशांश: दशमलव?",
    "Count the whole strips, and that count goes before the point.": "पूरी पट्टियों की गिनती बिंदु से पहले।",
    "Shade 1 tenth of the cut strip, then write all the strips as one decimal.": "कटी हुई पट्टी का 1 दशांश रंगो, फिर सब पट्टियाँ मिलाकर एक दशमलव में लिखो।",
    "5 wholes, 1 tenth: decimal?": "5 पूर्ण, 1 दशांश: दशमलव?",
    "The tenth on the last strip goes after the point.": "आखिरी पट्टी का दशांश बिंदु के बाद।",
    "Name the whole number part and the decimal part of 7.9.": "7.9 का पूर्ण संख्या भाग और दशमलव भाग बताओ।",
    "Split 7.9 at the point.": "7.9 को बिंदु पर बाँटो।",
    "Digits before the point count whole strips.": "बिंदु से पहले का अंक पूर्ण गिनता है।",
    "whole part": "पूर्ण भाग",
    "tenths": "दशांश",
    "Yes, 2.9: the point sits between wholes and tenths.": "हाँ, 2.9: बिंदु पूर्ण और दशांश के बीच है।",
    "Yes, 5.1: five wholes, then one tenth.": "हाँ, 5.1: पाँच पूर्ण, फिर एक दशांश।",
    "Yes: whole number part 7, decimal part 9.": "हाँ: पूर्ण भाग 7, दशमलव भाग 9।",
    /* phase 4 */
    "Tap Lots of 9.": "'9 के समूह' दबाओ।",
    "Add one more lot of 9.": "9 का एक और समूह जोड़ो।",
    "Tap Trade to swap ten tenths for one whole strip.": "'बदलो' दबाकर दस दशांश की पट्टी लो।",
    "Fewer than ten tenths cannot make a whole, so they stay tenths.": "दस से कम दशांश, दशांश ही रहते हैं।",
    "Wholes go before the point, loose tenths after it.": "पूर्ण बिंदु से पहले, दशांश बाद में।",
    "Ten tenths make one whole, so a count of tenths is read as ones and tenths.": "दस दशांश से एक पूर्ण बनता है, इसलिए दशांश को इकाई और दशांश में पढ़ते हैं।",
    "You learned: ten tenths make one whole, so read wholes, then tenths": "तुमने सीखा: दस दशांश से एक पूर्ण, इसलिए पहले पूर्ण पढ़ो, फिर दशांश",
    "Add 3 lots of 9 tenths, trade, then write the decimal.": "9 दशांश के 3 समूह जोड़ो, बदलो, फिर दशमलव लिखो।",
    "3 lots of 9 tenths: decimal?": "9 दशांश के 3 समूह: दशमलव?",
    "How many full strips of ten can you make from these tenths?": "इनसे कितनी पूरी पट्टियाँ बनेंगी?",
    "What decimal is 53 tenths?": "53 दशांश कौन-सी दशमलव संख्या है?",
    "53 tenths: decimal?": "53 दशांश: दशमलव?",
    "Keep tapping Trade while you can, then read wholes and tenths.": "'बदलो' दबाते रहो, फिर संख्या पढ़ो।",
    "Write 4 lots of 6 tenths as a decimal.": "6 दशांश के 4 समूहों को दशमलव में लिखो।",
    "4 lots of 6 tenths: decimal?": "6 दशांश के 4 समूह: दशमलव?",
    "Find the tenths in 4 lots, then the wholes hiding in them.": "4 समूहों के दशांश गिनो, फिर पूर्ण।",
    "Yes, 2.7: two wholes and seven tenths.": "हाँ, 2.7: दो पूर्ण और सात दशांश।",
    "That is 5.3: five wholes, three tenths left.": "यह 5.3 है: पाँच पूर्ण, तीन दशांश बचे।",
    "Yes, 2.4: twenty tenths traded, four left.": "हाँ, 2.4: बीस दशांश बदले, चार बचे।",
    /* the working area and the summary drawing */
    "Fraction": "भिन्न",
    "Decimal": "दशमलव",
    "Whole number part": "पूर्ण भाग",
    "Decimal part": "दशमलव भाग",
    "Whole": "पूर्ण",
    "whole": "पूर्ण",
    "wholes": "पूर्ण",
    "Not a tenth": "दशांश नहीं",
    "A tenth": "एक दशांश",
    "Cut": "काटो",
    "Shape": "आकार",
    "Trade": "बदलो",
    "Lots of 9": "9 के समूह",
    "Lots of 6": "6 के समूह",
    /* the phase 4 counter, one exact line a count (built at run time as "<n> of <m> lots") */
    "0 of 3 lots": "3 में से 0 समूह", "1 of 3 lots": "3 में से 1 समूह", "2 of 3 lots": "3 में से 2 समूह", "3 of 3 lots": "3 में से 3 समूह",
    "0 of 4 lots": "4 में से 0 समूह", "1 of 4 lots": "4 में से 1 समूह", "2 of 4 lots": "4 में से 2 समूह", "3 of 4 lots": "4 में से 3 समूह",
    "4 of 4 lots": "4 में से 4 समूह",
    "Tenths": "दशांश",
    /* the card keys' labels (read by a screen reader) */
    "Fraction card": "भिन्न कार्ड",
    "Decimal card": "दशमलव कार्ड",
    /* the guide steps' hints (r34: shown under the instruction after another act) */
    "Tap the Cut key first.": "पहले 'काटो' दबाओ।",
    "Tap any chocolate piece on the strip.": "पट्टी का कोई भी चॉकलेट टुकड़ा दबाओ।",
    "Tap one more piece.": "एक और टुकड़ा दबाओ।",
    "The cut strip is the one at the bottom.": "कटी हुई पट्टी सबसे नीचे वाली है।",
    "Tap one more piece of that strip.": "उसी पट्टी का एक और टुकड़ा दबाओ।",
    "The Lots of 9 key adds nine tenths.": "'9 के समूह' बटन नौ दशांश जोड़ता है।",
    "Use the Lots of 9 key again.": "'9 के समूह' बटन फिर से दबाओ।",
    "Now use the Trade key.": "अब 'बदलो' दबाओ।",
    /* the start page (printed, not spoken) */
    "One chocolate bar. Can you cut it so everyone gets the same?": "एक चॉकलेट बार। क्या तुम इसे ऐसे काट सकते हो कि सबको बराबर मिले?",
  },
  gu: {
    "Tenths Builder": "દશાંશ બનાવો",
    "One tenth": "એક દશાંશ",
    "Tenths as decimals": "દશાંશ, દશાંશ સંખ્યા રૂપે",
    "Wholes and tenths together": "પૂર્ણ અને દશાંશ સાથે",
    "Ten tenths make one whole": "દસ દશાંશથી એક પૂર્ણ",
    "You cut, shaded and traded tenths, and counted every one.": "તમે દશાંશ કાપ્યા, રંગ્યા અને બદલ્યા, અને દરેકને ગણ્યા.",
    "Free play: cut, shade and trade as many strips as you like.": "મુક્ત રમત: ગમે તેટલી પટ્ટીઓ કાપો, રંગો અને બદલો.",
    /* phase 1 */
    "Tap Cut to cut the strip into ten parts, all the same width.": "'કાપો' દબાવી દસ સરખા ભાગ કરો.",
    "Count all the parts first, one by one.": "પહેલાં બધા ભાગ એક પછી એક ગણો.",
    "A tenth comes only from ten parts of one size.": "દસેય ભાગ એક માપના હોય તો જ દશાંશ બને.",
    "One of ten equal parts is one tenth, and it is written 0.1.": "દસ સરખા ભાગમાંથી એક ભાગ એક દશાંશ છે, અને તેને 0.1 લખાય.",
    "You learned: one of ten equal parts is one tenth, written 0.1": "તમે શીખ્યા: દસ સરખા ભાગમાંથી એક, એક દશાંશ એટલે 0.1",
    "What fraction of the strip is one part?": "એક ભાગ પટ્ટીનો કયો અપૂર્ણાંક છે?",
    "One part, as a fraction?": "એક ભાગ, અપૂર્ણાંકમાં?",
    "Which number goes on top: the part you take, or all the parts?": "ઉપર શું આવે: લીધેલો ભાગ કે બધા?",
    "Shade a part and write it as a decimal.": "એક ભાગ રંગો, પછી દશાંશ સંખ્યા લખો.",
    "Shaded part, as a decimal?": "રંગેલો ભાગ, દશાંશ સંખ્યામાં?",
    "One part is less than a whole, so what goes before the point?": "ભાગ આખાથી નાનો છે, બિંદુ પહેલાં શું?",
    "Is this shaded part a tenth?": "શું આ રંગેલો ભાગ એક દશાંશ છે?",
    "Is it a tenth?": "શું આ દશાંશ છે?",
    "Would ten parts the size of the shaded one fill this strip exactly?": "આવા દસ ભાગ પટ્ટી બરાબર ભરશે?",
    "Yes": "હા",
    "No": "ના",
    "yes": "હા",
    "no": "ના",
    "Yes, 1/10: one part out of ten.": "હા, દસમાંથી 1 ભાગ, એટલે એક દશાંશ.",
    "Yes, 0.1: the 0 before the point means no whole strips.": "હા, 0.1: બિંદુ પહેલાં 0 એટલે એકેય આખી પટ્ટી નથી.",
    "Right, unequal parts are not tenths.": "સાચું, અસમાન ભાગ દશાંશ નથી.",
    /* phase 2 */
    "Tap one part to shade it.": "એક ભાગ દબાવીને રંગો.",
    "Tap another part and watch the digit after the point.": "બીજો ભાગ દબાવો, બિંદુ પછીનો અંક જુઓ.",
    "Shade the parts one at a time, and count as you go.": "એક એક ભાગ રંગો, અને સાથે સાથે ગણો.",
    "Say the amount in tenths first, then write it.": "પહેલાં બોલો કેટલા દશાંશ છે, પછી લખો.",
    "A number of tenths is written with that digit after the point.": "જેટલા દશાંશ હોય, બિંદુ પછી એ જ અંક લખાય.",
    "You learned: tenths are written as the digit after the point": "તમે શીખ્યા: દશાંશ બિંદુ પછીના અંકથી લખાય છે",
    "Shade 8 parts and write the decimal.": "8 ભાગ રંગો અને દશાંશ સંખ્યા લખો.",
    "8 parts shaded: decimal?": "8 ભાગ રંગ્યા: દશાંશ સંખ્યા?",
    "Count only the shaded parts, each one a tenth.": "ફક્ત રંગેલા ભાગ ગણો, દરેક એક દશાંશ.",
    "Write 9/10 as a decimal.": "દસમાંથી 9 ને દશાંશ સંખ્યામાં લખો.",
    "This fraction as a decimal?": "આ અપૂર્ણાંક, દશાંશ સંખ્યામાં?",
    "Shade that many tenths and count them.": "એટલા દશાંશ રંગો અને ગણો.",
    "Write 0.8 as a fraction.": "0.8 ને અપૂર્ણાંકમાં લખો.",
    "What fraction is it?": "એ કયો અપૂર્ણાંક છે?",
    "Shade the tenths in 0.8, then look at the whole strip.": "એટલા દશાંશ રંગો, પછી આખી પટ્ટી જુઓ.",
    "Yes, 0.8: eight of the ten parts are shaded.": "હા, 0.8: દસમાંથી આઠ ભાગ રંગેલા છે.",
    "Right, 9 tenths and 0.9 are the same amount.": "સાચું, 9 દશાંશ અને 0.9 એકસરખા છે.",
    "Yes, zero point eight means 8 tenths.": "હા, શૂન્ય દશાંશ આઠ એટલે 8 દશાંશ.",
    /* phase 3 */
    "Tap one part of the cut strip.": "કાપેલી પટ્ટીનો એક ભાગ દબાવો.",
    "Tap another part and watch which side of the point changes.": "બીજો ભાગ દબાવો, બિંદુની કઈ બાજુ બદલાય?",
    "Look at the full strips, then at the shaded parts.": "પહેલાં આખી પટ્ટીઓ જુઓ, પછી રંગેલા ભાગ.",
    "Say the wholes, then the point, then the tenths.": "પૂર્ણ બોલો, પછી બિંદુ, પછી દશાંશ.",
    "Whole strips give the whole number part, and tenths give the decimal part.": "આખી પટ્ટીઓથી પૂર્ણાંક ભાગ બને, અને દશાંશથી દશાંશ ભાગ.",
    "You learned: wholes go before the point, tenths after it": "તમે શીખ્યા: પૂર્ણ બિંદુની પહેલાં, દશાંશ એની પછી",
    "Shade 9 tenths of the cut strip, then write all the strips as one decimal.": "કાપેલી પટ્ટીના 9 દશાંશ રંગો, પછી બધી પટ્ટીઓ મળીને એક દશાંશ સંખ્યામાં લખો.",
    "2 wholes, 9 tenths: decimal?": "2 પૂર્ણ, 9 દશાંશ: દશાંશ સંખ્યા?",
    "Count the whole strips, and that count goes before the point.": "આખી પટ્ટીઓની ગણતરી બિંદુ પહેલાં.",
    "Shade 1 tenth of the cut strip, then write all the strips as one decimal.": "કાપેલી પટ્ટીનો 1 દશાંશ રંગો, પછી બધી પટ્ટીઓ મળીને એક દશાંશ સંખ્યામાં લખો.",
    "5 wholes, 1 tenth: decimal?": "5 પૂર્ણ, 1 દશાંશ: દશાંશ સંખ્યા?",
    "The tenth on the last strip goes after the point.": "છેલ્લી પટ્ટીનો દશાંશ બિંદુ પછી આવે.",
    "Name the whole number part and the decimal part of 7.9.": "7.9 નો પૂર્ણાંક ભાગ અને દશાંશ ભાગ કહો.",
    "Split 7.9 at the point.": "7.9 ને બિંદુ પાસે વહેંચો.",
    "Digits before the point count whole strips.": "બિંદુ પહેલાંના અંક આખી પટ્ટીઓ ગણે છે.",
    "whole part": "પૂર્ણ ભાગ",
    "tenths": "દશાંશ",
    "Yes, 2.9: the point sits between wholes and tenths.": "હા, 2.9: બિંદુ પૂર્ણ અને દશાંશની વચ્ચે છે.",
    "Yes, 5.1: five wholes, then one tenth.": "હા, 5.1: પાંચ પૂર્ણ, પછી એક દશાંશ.",
    "Yes: whole number part 7, decimal part 9.": "હા: પૂર્ણાંક ભાગ 7, દશાંશ ભાગ 9.",
    /* phase 4 */
    "Tap Lots of 9.": "'9 ના જૂથ' દબાવો.",
    "Add one more lot of 9.": "9 નું હજી એક જૂથ ઉમેરો.",
    "Tap Trade to swap ten tenths for one whole strip.": "'બદલો' દબાવી દસ દશાંશની આખી પટ્ટી લો.",
    "Fewer than ten tenths cannot make a whole, so they stay tenths.": "દસથી ઓછા દશાંશ, દશાંશ જ રહે.",
    "Wholes go before the point, loose tenths after it.": "પૂર્ણ બિંદુ પહેલાં, દશાંશ પછી.",
    "Ten tenths make one whole, so a count of tenths is read as ones and tenths.": "દસ દશાંશથી એક પૂર્ણ બને, તેથી દશાંશની ગણતરી એકમ અને દશાંશમાં વંચાય.",
    "You learned: ten tenths make one whole, so read wholes, then tenths": "તમે શીખ્યા: દસ દશાંશથી એક પૂર્ણ, તેથી પહેલાં પૂર્ણ વાંચો, પછી દશાંશ",
    "Add 3 lots of 9 tenths, trade, then write the decimal.": "9 દશાંશના 3 જૂથ ઉમેરો, બદલો, પછી દશાંશ સંખ્યા લખો.",
    "3 lots of 9 tenths: decimal?": "9 દશાંશના 3 જૂથ: દશાંશ સંખ્યા?",
    "How many full strips of ten can you make from these tenths?": "આમાંથી કેટલી આખી પટ્ટીઓ બને?",
    "What decimal is 53 tenths?": "53 દશાંશ કઈ દશાંશ સંખ્યા છે?",
    "53 tenths: decimal?": "53 દશાંશ: દશાંશ સંખ્યા?",
    "Keep tapping Trade while you can, then read wholes and tenths.": "'બદલો' દબાવતા રહો, પછી સંખ્યા વાંચો.",
    "Write 4 lots of 6 tenths as a decimal.": "6 દશાંશના 4 જૂથને દશાંશ સંખ્યામાં લખો.",
    "4 lots of 6 tenths: decimal?": "6 દશાંશના 4 જૂથ: દશાંશ સંખ્યા?",
    "Find the tenths in 4 lots, then the wholes hiding in them.": "4 જૂથના દશાંશ ગણો, પછી પૂર્ણ.",
    "Yes, 2.7: two wholes and seven tenths.": "હા, 2.7: બે પૂર્ણ અને સાત દશાંશ.",
    "That is 5.3: five wholes, three tenths left.": "એ 5.3 છે: પાંચ પૂર્ણ, ત્રણ દશાંશ બાકી.",
    "Yes, 2.4: twenty tenths traded, four left.": "હા, 2.4: વીસ દશાંશ બદલ્યા, ચાર બાકી.",
    /* the working area and the summary drawing */
    "Fraction": "અપૂર્ણાંક",
    "Decimal": "દશાંશ સંખ્યા",
    "Whole number part": "પૂર્ણાંક ભાગ",
    "Decimal part": "દશાંશ ભાગ",
    "Whole": "પૂર્ણ",
    "whole": "પૂર્ણ",
    "wholes": "પૂર્ણ",
    "Not a tenth": "દશાંશ નથી",
    "A tenth": "એક દશાંશ",
    "Cut": "કાપો",
    "Shape": "આકાર",
    "Trade": "બદલો",
    "Lots of 9": "9 ના જૂથ",
    "Lots of 6": "6 ના જૂથ",
    /* the phase 4 counter, one exact line a count (built at run time as "<n> of <m> lots") */
    "0 of 3 lots": "3 માંથી 0 જૂથ", "1 of 3 lots": "3 માંથી 1 જૂથ", "2 of 3 lots": "3 માંથી 2 જૂથ", "3 of 3 lots": "3 માંથી 3 જૂથ",
    "0 of 4 lots": "4 માંથી 0 જૂથ", "1 of 4 lots": "4 માંથી 1 જૂથ", "2 of 4 lots": "4 માંથી 2 જૂથ", "3 of 4 lots": "4 માંથી 3 જૂથ",
    "4 of 4 lots": "4 માંથી 4 જૂથ",
    "Tenths": "દશાંશ",
    /* the card keys' labels (read by a screen reader) */
    "Fraction card": "અપૂર્ણાંક કાર્ડ",
    "Decimal card": "દશાંશ સંખ્યા કાર્ડ",
    /* the guide steps' hints (r34: shown under the instruction after another act) */
    "Tap the Cut key first.": "પહેલાં 'કાપો' દબાવો.",
    "Tap any chocolate piece on the strip.": "પટ્ટીનો કોઈ પણ ચોકલેટ ટુકડો દબાવો.",
    "Tap one more piece.": "હજી એક ટુકડો દબાવો.",
    "The cut strip is the one at the bottom.": "કાપેલી પટ્ટી સૌથી નીચેની છે.",
    "Tap one more piece of that strip.": "એ જ પટ્ટીનો હજી એક ટુકડો દબાવો.",
    "The Lots of 9 key adds nine tenths.": "'9 ના જૂથ' બટન નવ દશાંશ ઉમેરે છે.",
    "Use the Lots of 9 key again.": "'9 ના જૂથ' બટન ફરી દબાવો.",
    "Now use the Trade key.": "હવે 'બદલો' દબાવો.",
    /* the start page (printed, not spoken) */
    "One chocolate bar. Can you cut it so everyone gets the same?": "એક ચોકલેટ બાર. શું તમે એને એવી રીતે કાપી શકો કે બધાને સરખું મળે?",
  },
};

/* One entry per phase = one mount. Item fields of this tool:
   kind     name (fraction of one part) · dec1 (one tenth as a decimal) · unequal (unequal parts, yes/no) ·
            shade / fracdec (tenths to a decimal) · decfrac (a decimal to a fraction) · mixed (wholes and
            tenths to a decimal) · split (a decimal's two parts) · lots / loose (tenths traded into wholes)
   wholes, tenths   the shaded amount the item is about; lot, lots: Lots of; total: loose tenths given
   near     the item's misconception (judge must reject it), typed as the slot types it ("8|0" = 8 . 0)
   parts    SLOT_FRACTION (a fraction, [a, b]) · SLOT_DECIMAL (a decimal, ["2", "9"] = 2.9, the point drawn) ·
            two labelled boxes (split); the slot draws them all side by side (sideBySide)
   teachLive (phase)  the cards read the shading live during the teach (phases 2 and 3) */
const PHASES = [
  {
    n: 1,
    concept: "One tenth",
    conceptId: "M1.S1.T2.C5", objectiveIds: ["O1"],
    /* guide steps (PATTERNS §9b): each waits for ONE click of the control its `on` names; `hint` shows under the
       instruction after any other act, or on the Hint key */
    steps: [{ say: "Tap Cut to cut the strip into ten parts, all the same width.", on: "cut", hint: "Tap the Cut key first." }],
    /* the cut is reported when the knife (api.act, about 1.3 s) has passed every line; the settle plays out in the hold */
    stepHold: 1800,
    ladder: ["Count all the parts first, one by one.", "A tenth comes only from ten parts of one size."],
    closing: "One of ten equal parts is one tenth, and it is written 0.1.",
    learned: "You learned: one of ten equal parts is one tenth, written 0.1",
    traceback: "The strip is cut and its parts counted one by one; one part lights up and the card fills with the whole right answer.",
    items: [
      /* practice 1: answer in the plan = All 10 parts make the whole strip, and one part is one tenth, 1/10 */
      { qid: "M1.S1.T2.C5:1", kind: "name", tenths: 1, parts: SLOT_FRACTION, answer: [1, 10], near: "1|1",
        say: "What fraction of the strip is one part?",
        ask: "One part, as a fraction?",
        miss: "Which number goes on top: the part you take, or all the parts?" },
      /* learn TB1: answer in the plan = 1/10, which is written 0.1 and read as zero point one */
      { qid: "M1.S1.T2.C5:TB1", kind: "dec1", tenths: 1, parts: SLOT_DECIMAL, answer: ["0", "1"], near: "1|0",
        say: "Shade a part and write it as a decimal.",
        ask: "Shaded part, as a decimal?",
        miss: "One part is less than a whole, so what goes before the point?" },
      /* authored: the phase has only two plan questions; this one tests its misconception (a part of a
         strip cut into unequal pieces is not a tenth) */
      { qid: null, kind: "unequal", choices: [{ id: "yes", label: "Yes" }, { id: "no", label: "No" }], answer: "no", near: "yes",
        say: "Is this shaded part a tenth?",
        ask: "Is it a tenth?",
        miss: "Would ten parts the size of the shaded one fill this strip exactly?" },
    ],
  },
  {
    n: 2,
    concept: "Tenths as decimals",
    conceptId: "M1.S1.T2.C6", objectiveIds: ["O1"],
    teachLive: true,
    /* stepHold (r33): the last act's result (0.3 on the cards) stays this long before the question opens and resets */
    /* every step is ONE click of one control (the same `on` may repeat: steps run in order) */
    steps: [
      { say: "Tap one part to shade it.", on: "shade", hint: "Tap any chocolate piece on the strip." },
      { say: "Tap another part and watch the digit after the point.", on: "shade", hint: "Tap one more piece." },
    ],
    stepHold: 1800,
    ladder: ["Shade the parts one at a time, and count as you go.", "Say the amount in tenths first, then write it."],
    closing: "A number of tenths is written with that digit after the point.",
    learned: "You learned: tenths are written as the digit after the point",
    traceback: "The shaded tenths are numbered one by one beside any wholes the answer claimed, and the decimal card fills with a 0 before the point.",
    items: [
      /* learn TB2: answer in the plan = 8/10, which is written 0.8 */
      { qid: "M1.S1.T2.C6:TB2", kind: "shade", tenths: 8, parts: SLOT_DECIMAL, answer: ["0", "8"], near: "8|0",
        say: "Shade 8 parts and write the decimal.",
        ask: "8 parts shaded: decimal?",
        miss: "Count only the shaded parts, each one a tenth." },
      /* practice 2: answer in the plan = 0.9 */
      { qid: "M1.S1.T2.C6:2", kind: "fracdec", tenths: 9, parts: SLOT_DECIMAL, answer: ["0", "9"], near: "9|0",
        say: "Write 9/10 as a decimal.",
        ask: "This fraction as a decimal?",
        miss: "Shade that many tenths and count them." },
      /* practice 3: answer in the plan = Zero point eight. It is 8 tenths, 8/10 */
      { qid: "M1.S1.T2.C6:3", kind: "decfrac", tenths: 8, parts: SLOT_FRACTION, answer: [8, 10], near: "2|10",
        say: "Write 0.8 as a fraction.",
        ask: "What fraction is it?",
        miss: "Shade the tenths in 0.8, then look at the whole strip." },
    ],
  },
  {
    n: 3,
    concept: "Wholes and tenths together",
    conceptId: "M1.S1.T2.C7", objectiveIds: ["O1"],
    teachLive: true,
    steps: [
      { say: "Tap one part of the cut strip.", on: "shade", hint: "The cut strip is the one at the bottom." },
      { say: "Tap another part and watch which side of the point changes.", on: "shade", hint: "Tap one more piece of that strip." },
    ],
    stepHold: 1800,
    ladder: ["Look at the full strips, then at the shaded parts.", "Say the wholes, then the point, then the tenths."],
    closing: "Whole strips give the whole number part, and tenths give the decimal part.",
    learned: "You learned: wholes go before the point, tenths after it",
    traceback: "The whole strips light one by one and their count moves before the point; then the tenths are numbered and their count goes after it.",
    items: [
      /* learn TB3: answer in the plan = 2.9 */
      { qid: "M1.S1.T2.C7:TB3", kind: "mixed", wholes: 2, tenths: 9, parts: SLOT_DECIMAL, answer: ["2", "9"], near: "0|29",
        say: "Shade 9 tenths of the cut strip, then write all the strips as one decimal.",
        ask: "2 wholes, 9 tenths: decimal?",
        miss: "Count the whole strips, and that count goes before the point." },
      /* practice 4: answer in the plan = 5.1, because 5 + 1/10 = 5.1 */
      { qid: "M1.S1.T2.C7:4", kind: "mixed", wholes: 5, tenths: 1, parts: SLOT_DECIMAL, answer: ["5", "1"], near: "0|51",
        say: "Shade 1 tenth of the cut strip, then write all the strips as one decimal.",
        ask: "5 wholes, 1 tenth: decimal?",
        miss: "The tenth on the last strip goes after the point." },
      /* practice 5: answer in the plan = The whole number part is 7 and the decimal part is 9 tenths */
      { qid: "M1.S1.T2.C7:5", kind: "split", wholes: 7, tenths: 9, parts: [{ label: "whole part" }, { label: "tenths" }], answer: [7, 9], near: "0|79",
        say: "Name the whole number part and the decimal part of 7.9.",
        ask: "Split 7.9 at the point.",
        miss: "Digits before the point count whole strips." },
    ],
  },
  {
    n: 4,
    concept: "Ten tenths make one whole",
    conceptId: "M1.S1.T2.C8", objectiveIds: ["O2"],
    steps: [
      { say: "Tap Lots of 9.", on: "lots", hint: "The Lots of 9 key adds nine tenths." },
      { say: "Add one more lot of 9.", on: "lots", hint: "Use the Lots of 9 key again." },
      { say: "Tap Trade to swap ten tenths for one whole strip.", on: "trade", hint: "Now use the Trade key." },
    ],
    /* the trade is reported once the hand's sweep (api.act) and the merge are over; the new whole stays on the board in this hold */
    stepHold: 1800,
    ladder: ["Fewer than ten tenths cannot make a whole, so they stay tenths.", "Wholes go before the point, loose tenths after it."],
    closing: "Ten tenths make one whole, so a count of tenths is read as ones and tenths.",
    learned: "You learned: ten tenths make one whole, so read wholes, then tenths",
    traceback: "The tenths slide together ten at a time into whole strips, and the decimal card fills its two sides as they close.",
    items: [
      /* learn TB4: answer in the plan = 27 tenths, which is 2 ones and 7 tenths, written 2.7 */
      { qid: "M1.S1.T2.C8:TB4", kind: "lots", lot: 9, lots: 3, parts: SLOT_DECIMAL, answer: ["2", "7"], near: "27|0",
        say: "Add 3 lots of 9 tenths, trade, then write the decimal.",
        ask: "3 lots of 9 tenths: decimal?",
        miss: "How many full strips of ten can you make from these tenths?" },
      /* practice 6: answer in the plan = 5 ones and 3 tenths, so 53/10 = 5.3 */
      { qid: "M1.S1.T2.C8:6", kind: "loose", total: 53, parts: SLOT_DECIMAL, answer: ["5", "3"], near: "53|0",
        say: "What decimal is 53 tenths?",
        ask: "53 tenths: decimal?",
        miss: "Keep tapping Trade while you can, then read wholes and tenths." },
      /* practice 7: answer in the plan = 24 tenths, which is 2 ones and 4 tenths, written 2.4 */
      { qid: "M1.S1.T2.C8:7", kind: "lots", lot: 6, lots: 4, parts: SLOT_DECIMAL, answer: ["2", "4"], near: "24|0",
        say: "Write 4 lots of 6 tenths as a decimal.",
        ask: "4 lots of 6 tenths: decimal?",
        miss: "Find the tenths in 4 lots, then the wholes hiding in them." },
      /* practice 8 (M1.S1.T2.C8:8, 6.1 has 61 tenths) is unused: three questions a phase, and the
         live Tenths tally would print its answer */
    ],
  },
];

/* the strips, cells and cards the working area draws (they go into the sidecar too) */
const TB_UNEQUAL = [150, 40, 90, 50, 70, 60, 110, 45, 55, 50];
const MODEL = { tenthsPerStrip: 10, stripLength: 750, cellWidth: 75, cutGap: 8, cutModel: "each piece inset gap/2 in its slot",
  unequalWidths: TB_UNEQUAL, unequalScale: "stripLength / 720",
  cards: ["fraction", "decimal"], controls: ["Cut", "Trade", "Lots of", "part tap"] };

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* the final picture of an item: whole strips and loose tenths */
const tbModel = (it: any) => {
  const tot = !it ? 0 : it.kind === "lots" ? it.lot * it.lots : it.kind === "loose" ? it.total : (it.wholes || 0) * 10 + (it.tenths || 0);
  return { w: Math.floor(tot / 10), t: tot % 10, tot };
};

/* judge: a fraction is right in any equal form (8/10 or 4/5); a decimal in its two boxes by the runtime's
   judgeSlotDecimal (the whole part by value, the tenths digit for digit: "0|8" right, "0|80" not); the split's
   two labelled boxes by value; a word choice by its id */
const judge = (item: any, v: any) => {
  if (item.parts === SLOT_FRACTION) {
    const [a, b] = slotPartsOf(v, 2);
    return a !== "" && b !== "" && Number(b) > 0 && Number(a) * item.answer[1] === Number(b) * item.answer[0];
  }
  if (item.parts === SLOT_DECIMAL) return judgeSlotDecimal(item, v);
  if (item.parts) return judgeSlotParts(item, v);
  if (typeof item.answer === "number") return /^\d+$/.test(String(v ?? "").trim()) && Number(v) === item.answer;
  return String(v ?? "").trim().toLowerCase() === String(item.answer).toLowerCase();
};
/* oracle: every answer re-derived from the item's own amounts, in whole tenths (no strings shared with judge) */
const oracle = () => PHASES.every((p: any) => p.items.every((it: any) => {
  const tenthsInAll = it.kind === "lots" ? it.lot * it.lots : it.kind === "loose" ? it.total : (it.wholes || 0) * 10 + (it.tenths || 0);
  if (it.kind === "unequal") return TB_UNEQUAL.length === 10 && new Set(TB_UNEQUAL).size > 1 && it.answer === "no";
  if (it.kind === "split") return it.answer[0] * 10 + it.answer[1] === tenthsInAll;
  if (it.parts === SLOT_FRACTION) return it.answer[0] * 10 === tenthsInAll * it.answer[1];
  /* a decimal: one digit after the point (tenths), and wholes x 10 + tenths is every tenth the item holds */
  const [i, f] = it.answer;
  return it.parts === SLOT_DECIMAL && /^\d+$/.test(i) && /^\d$/.test(f) && Number(i) * 10 + Number(f) === tenthsInAll;
}));
/* the most likely wrong answer (the misconception); judge must reject it */
const nearMiss = (item: any) => item.near;
/* the forms of an answer that no question, hint or ladder line may print: a fraction as itself and
   in words (its denominator 10 alone is the question, not the answer), a decimal written ("2.9") and spoken */
const tbWritten = (item: any) => item.answer[0] + "." + item.answer[1];
const answerForms = (item: any) => (item.parts === SLOT_FRACTION ? [`${item.answer[0]}/${item.answer[1]}`, fractionWords(item.answer[0], item.answer[1])]
  : item.parts === SLOT_DECIMAL ? [tbWritten(item), speakable(tbWritten(item))]
  : item.parts ? [] : typeof item.answer === "number" ? [String(item.answer), words(item.answer)]
  : item.choices ? [String(item.answer)] : [String(item.answer), speakable(item.answer)]);
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it: a decimal is ["2", "9"] */
const agentKey = (item: any) => item.answer;

const solve = (item: any, T: any) => T.submit(item.answer);
/* the agent's answer(): every decimal is two boxes now, and toolApi.answer() takes "2.9", [2, 9] or "2|9" for it,
   so the tool needs no answer path of its own */
const answer = () => undefined;
/* the agent's check() before Enter: nothing waits on the working area, so Enter answers */
const check = () => undefined;
/* what the slot shows for a typed value: a chosen Yes/No by its key's label (the runtime then puts it into Hindi or
   Gujarati through TR); everything else as typed */
const tbFormat = (v: any) => (v === "yes" ? "Yes" : v === "no" ? "No" : v);

/* ── the working area: box.w x 528 (1472 shut, 1086 open), origin at its top-left ──────────── */
const TB_BLUE = CONTENT.hundred, TB_GREEN = CONTENT.one, TB_AMBER = CONTENT.ten, TB_VERM = CONTENT.pointer;
const TB_INK = "#2B2B2B", TB_GREY = "#767676", TB_CHIP = "#FFFDF7";
/* chocolate and cake drawn in code: the fallback under a skin, and the piece under a shaded tint */
const TB_CHOC = "#8C4E32", TB_CHOC_RIM = "#5A2C18", TB_CHOC_IN = "#7E4329", TB_CHOC_HI = "#BC7E5E", TB_CUT = "#2E1B10";
const TB_CAKE = "#E9B566", TB_CRUST = "#C4823F", TB_CAKE_RIM = "#8A5A2B";
/* TB_BY: the foot row's top; a key paints to TB_BY + 77 and its pulse to TB_BY + 79, inside the 520-high working area (keyOnly) */
const TB_GAP = 10, TB_PAD = 24, TB_TOP = 8, TB_BY = 436, TB_HUG = 36;
/* a shaded piece reads by shape as well as by colour (blue over milk chocolate is close in greyscale): it is
   lifted TB_LIFT with the runtime's lift shadow, tinted at TB_TINT and ringed light inside */
const TB_LIFT = 6, TB_TINT = 0.88;
/* ON A DARK SKIN (IMAGES.md §7, the owner 2026-10-17): blue over milk chocolate is close in brightness, so an UNCOUNTED piece
   wears a pale cream wash over its chocolate (TB_WASH at TB_WASH_A, the tile still showing) and a COUNTED piece a deep blue
   (TB_COUNT at TB_TINT); the two stand more than 3:1 apart in luminance, each with a near-black outline (TB_CUT). The uncut
   slab keeps its chocolate (nothing is counted yet). TB_WASHED is the washed piece's flat colour (the summary drawing) */
const TB_WASH = "#FFF1D6", TB_WASH_A = 0.40, TB_COUNT = "#00466F", TB_WASHED = "#BA8F74";
/* the cards' titles and the fraction card's digits in the wide card (the panel shut), read from the last bench */
const TB_TITLE = 36, TB_FD = 64;
/* the layout: the cutting board and its bars on the left at ONE fixed size and place (laid out for the open panel, so
   nothing under the child's finger moves when the keypad opens), the two cards on the right in the room box.w leaves.
   A bar is ten SLOTS of `cell`; a cut piece is inset TB_GAP / 2 inside its slot, so a cut row is exactly as long as a
   whole bar (ten tenths are one whole), and a trade grows the pieces back to their slots.
   Always: cell 75 (bar 750, a cut piece 65), board 798 wide; cards 262 wide open (1086), 648 shut (1472). */
function tbLay(bw: number) {
  const t = Math.max(0, Math.min(1, (bw - 1086) / 386));
  const cell = 75;
  const len = cell * 10, boardW = len + 2 * TB_PAD, cx = boardW + 20;
  return { t, cell, len, x0: TB_PAD, boardW, cx, cw: bw - 6 - cx, r: Math.round(150 + 20 * t) };
}
const tbDeep = (c: string) => shade(c, 0.25);
const tbR = (w: number, h: number) => Math.max(3, Math.min(9, w * 0.1, h * 0.12));
/* one chocolate square in code: rim, a pressed inner panel, a light bevel along the top and the left */
const tbChoc = (x: number, y: number, w: number, h: number, key?: any) => {
  const r = tbR(w, h), i = Math.min(12, Math.max(5, Math.min(w, h) * 0.15)), inner = w > 2 * i + 8 && h > 2 * i + 8;
  return (
    <g key={key}>
      <rect x={x} y={y} width={w} height={h} rx={r} fill={TB_CHOC} stroke={TB_CHOC_RIM} strokeWidth={1.5} />
      {inner && <rect x={x + i} y={y + i} width={w - 2 * i} height={h - 2 * i} rx={Math.max(2, r * 0.6)} fill={TB_CHOC_IN} />}
      {inner && <path d={`M ${x + i + 2} ${y + h - i} H ${x + w - i - 2}`} stroke={TB_CHOC_HI} strokeOpacity={0.55} strokeWidth={2} strokeLinecap="round" />}
      <path d={`M ${x + r} ${y + 2.5} H ${x + w - r} M ${x + 2.5} ${y + r} V ${y + h - r}`} fill="none" stroke={TB_CHOC_HI} strokeWidth={2.5} strokeLinecap="round" />
    </g>
  );
};
/* the generated tile over a piece, stretched to it (drawn only when images.tsx has it; the square in code stays the
   whole drawing without it) */
const tbTile = (x: number, y: number, w: number, h: number, key?: any) => <Skin key={key} name="piece" fit="stretch" x={x} y={y} w={w} h={h} />;
/* the tint over a shaded piece or bar, with a light ring inside it */
const tbTint = (x: number, y: number, w: number, h: number, r: number, fill: string) => (
  <g>
    <rect x={x + 1} y={y + 1} width={Math.max(1, w - 2)} height={Math.max(1, h - 2)} rx={Math.max(2, r - 1)} fill={fill === TB_BLUE ? TB_COUNT : fill} fillOpacity={TB_TINT}
      stroke={TB_CUT} strokeWidth={2.5} />
    {w > 16 && h > 16 && <rect x={x + 5} y={y + 5} width={w - 10} height={h - 10} rx={Math.max(2, r - 3)} fill="none" stroke="#FFFFFF" strokeOpacity={0.7} strokeWidth={2.5} />}
  </g>
);
/* a piece: the square in code, then its tile (`skin`), then (shaded) the blue (given) tint over it, lifted. Work passes
   skin = false for SHADED pieces on a screen of more than 40 pieces, so the skins stay at most 40 (53 loose tenths are 60) */
/* `lift: false` draws a shaded piece flat (no lift shadow): the half-scale correction, whose small pieces would show the
   shadow filter's rectangular edge */
/* `wash`: how much of the cream wash an uncounted piece wears (0 to 1). 0 keeps it plain chocolate: the pieces the knife frees
   while it is still passing, so the bar does not change colour at the knife line; Work fades the cut strip's wash in after the cut */
const tbPiece = (x: number, y: number, w: number, h: number, fill: string | null, key?: any, skin = true, lift = true, wash = 1) => (fill ? (
  <g key={key} transform={lift ? `translate(0,${-TB_LIFT})` : undefined} filter={lift ? "url(#fLift)" : undefined}>
    {tbChoc(x, y, w, h)}
    {skin && tbTile(x, y, w, h)}
    {tbTint(x, y, w, h, tbR(w, h), fill)}
  </g>
) : (
  <g key={key}>
    {tbChoc(x, y, w, h)}
    {skin && tbTile(x, y, w, h)}
    {wash > 0 && <rect x={x + 1} y={y + 1} width={Math.max(1, w - 2)} height={Math.max(1, h - 2)} rx={Math.max(2, tbR(w, h) - 1)} fill={TB_WASH} fillOpacity={TB_WASH_A * wash}
      stroke={TB_CUT} strokeWidth={2.5} />}
  </g>
));
/* the chocolate gradient a slab is filled with (top-lit, the tile's colours); `id` differs per drawing so two never clash */
const tbSlabGrad = (id: string) => (
  <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stopColor="#A2603E" />
    <stop offset="1" stopColor="#77401F" />
  </linearGradient>
);
/* a WHOLE bar of chocolate: ONE slab, drawn in code (one rounded outline, one top-lit gradient, one bevel, one long
   pressed panel and a soft gloss, in the tile's colours; no squares on it, so nothing shows ten before the cut); a
   shaded slab is lifted under one tint. `skin` (the uncut bar, PATTERNS §16d): the image pass's smooth whole bar ("slab",
   no grooves, so no part exists before the cut) stretched over it; the slab in code stays the fallback under it */
const tbSlab = (x: number, y: number, w: number, h: number, fill: string | null, key?: any, gid = "tbChocG", lift = true, skin = false) => {
  const r = Math.max(4, Math.min(12, h * 0.16)), i = Math.min(12, Math.max(5, h * 0.16)), inner = h > 2 * i + 8;
  const body = (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={r} fill={`url(#${gid})`} stroke={TB_CHOC_RIM} strokeWidth={1.5} />
      {inner && <rect x={x + 3} y={y + 3} width={w - 6} height={i - 3} rx={Math.max(2, r * 0.6)} fill={TB_CHOC_HI} fillOpacity={0.3} />}
      {inner && <rect x={x + i} y={y + i} width={w - 2 * i} height={h - 2 * i} rx={Math.max(2, r * 0.6)} fill={TB_CHOC_IN} fillOpacity={0.6} stroke={TB_CHOC_RIM} strokeOpacity={0.35} strokeWidth={1.5} />}
      {inner && <path d={`M ${x + i + 2} ${y + h - i} H ${x + w - i - 2}`} stroke={TB_CHOC_HI} strokeOpacity={0.5} strokeWidth={2} strokeLinecap="round" />}
      <path d={`M ${x + r} ${y + 2.5} H ${x + w - r} M ${x + 2.5} ${y + r} V ${y + h - r}`} fill="none" stroke={TB_CHOC_HI} strokeWidth={2.5} strokeLinecap="round" />
      <path d={`M ${x + r} ${y + h - 2.5} H ${x + w - r} M ${x + w - 2.5} ${y + r} V ${y + h - r}`} fill="none" stroke={TB_CHOC_RIM} strokeOpacity={0.6} strokeWidth={2.5} strokeLinecap="round" />
      {h > 24 && <rect x={x + w * 0.04} y={y + h * 0.17} width={w * 0.46} height={Math.max(3, h * 0.09)} rx={Math.max(1.5, h * 0.045)} fill="#FFFFFF" fillOpacity={0.16} />}
      {skin && (
        /* the slab picture is darker and redder than the piece tiles: a linear lift per channel (in sRGB) takes its mid-tone
           (111,42,23) to the pieces' (139,68,40) and its highlight (134,61,40) to theirs (169,97,62); then the pieces' lit
           bevel (light top and left, dark bottom and right) and a soft gloss, at low opacity, with no groove: one uncut bar */
        <g clipPath={`url(#${gid}Clip)`}>
          <defs>
            <clipPath id={`${gid}Clip`}><rect x={x} y={y} width={w} height={h} rx={r} /></clipPath>
            <filter id={`${gid}Tone`} colorInterpolationFilters="sRGB">
              <feComponentTransfer>
                <feFuncR type="linear" slope={1.304} intercept={-0.023} />
                <feFuncG type="linear" slope={1.526} intercept={0.015} />
                <feFuncB type="linear" slope={1.294} intercept={0.04} />
              </feComponentTransfer>
            </filter>
          </defs>
          <g filter={`url(#${gid}Tone)`}><Skin name="slab" fit="stretch" x={x} y={y} w={w} h={h} /></g>
          <path d={`M ${x + r} ${y + 3} H ${x + w - r} M ${x + 3} ${y + r} V ${y + h - r}`} fill="none" stroke={TB_CHOC_HI} strokeOpacity={0.5} strokeWidth={4} strokeLinecap="round" />
          <path d={`M ${x + r} ${y + h - 3} H ${x + w - r} M ${x + w - 3} ${y + r} V ${y + h - r}`} fill="none" stroke={TB_CHOC_RIM} strokeOpacity={0.45} strokeWidth={4} strokeLinecap="round" />
          <rect x={x + w * 0.02} y={y + h * 0.1} width={w * 0.96} height={Math.max(4, h * 0.07)} rx={Math.max(2, h * 0.035)} fill="#FFFFFF" fillOpacity={0.1} />
        </g>
      )}
    </g>
  );
  return fill ? (
    <g key={key} transform={lift ? `translate(0,${-TB_LIFT})` : undefined} filter={lift ? "url(#fLift)" : undefined}>{body}{tbTint(x, y, w, h, r, fill)}</g>
  ) : <g key={key}>{body}</g>;
};
/* a label on a light chip, so its contrast never depends on the chocolate or the picture under it */
/* `hh`: the chip's height (40; less on a thin strip, so the chip never spills over the strip's edges); `fs`: the type size
   (32, the floor for a caption; 36 for the counting digits); `pad`: the room beside the text. A Hindi or Gujarati word's reph
   and matras rise about 1.1 em and its ू hangs 0.4 em, so its chip is TB_DEV_HH tall (Work passes that hh) */
const TB_DEV_HH = 56;
const tbChip = (x: number, yMid: number, text: string, ink: string, anchor: string, key?: any, hh = 40, fs = T.label, pad = 18) => {
  const w = Math.round(String(text).length * fs * 0.6) + pad;
  const x1 = anchor === "middle" ? x - w / 2 : anchor === "end" ? x - w : x;
  return (
    <g key={key}>
      <rect x={x1} y={yMid - hh / 2} width={w} height={hh} rx={Math.min(12, hh / 2)} fill={TB_CHIP} fillOpacity={0.95} />
      <text x={x1 + w / 2} y={yMid + Math.round(fs * 0.36)} textAnchor="middle" fontSize={fs} fontWeight={700} fill={ink}>{text}</text>
    </g>
  );
};
const tbCount = (cells: boolean[]) => cells.filter(Boolean).length;
/* shaded tenths packed from the left, in strips of ten (at least one strip) */
const tbPack = (count: number) => Array.from({ length: Math.max(10, Math.ceil(count / 10) * 10) }, (_, k) => k < count);
const tbChunks = (count: number) => { const a: number[] = []; let c = count; while (c > 10) { a.push(10); c -= 10; } a.push(c); return a; };
const tbCut = (count: number, extra: any = {}) => ({ kind: "cut", cells: Array.from({ length: 10 }, (_, j) => j < count), ...extra });
const tbNums = (upto: number) => Array.from({ length: 10 }, (_, j) => (j < upto ? String(j + 1) : null));
const tbWholes = (w: number, lit = 0) => Array.from({ length: w }, (_, j) => ({ kind: "whole", ring: j < lit, n: j < lit ? String(j + 1) : null }));
/* what each card shows while a question is open: [fraction card, decimal card] */
const TB_SHOW: any = { name: ["ask", "whole"], dec1: ["live", "ask"], unequal: ["off", "off"], shade: ["live", "ask"],
  fracdec: ["given", "ask"], decfrac: ["ask", "given"], mixed: ["live", "ask"], split: ["off", "given"], lots: ["live", "ask"], loose: ["live", "ask"] };
/* a question's opening picture. Phase 1's first question is asked about the strip its guide step has just cut, so it
   opens cut whenever it is asked (`asking`), and uncut only for the cut step itself (teach / demo) */
const tbSetup = (it: any, asking = true) => {
  const base = { cut: true, shape: "strip", wholes: 0, cells: tbPack(0), whole: false, lots: 0 };
  if (!it || !it.kind) return { ...base, cut: false };
  if (it.kind === "name") return { ...base, cut: asking };
  if (it.kind === "mixed" || it.kind === "split") return { ...base, wholes: it.wholes };
  if (it.kind === "loose") return { ...base, cells: tbPack(it.total) };
  return base;
};
const tbFree = () => ({ cut: false, shape: "strip", wholes: 0, cells: tbPack(0), whole: false, lots: 0 });
/* the unequal strip beside a true tenth: the correction's end and the win */
const tbUnequalEnd = () => [{ kind: "unequal", ring: true, note: { text: "Not a tenth" } }, tbCut(1, { hi: [0], note: { text: "A tenth" } })];

/* the traceback: steps that redraw the maths on the demo layer (never the child's own shading), ending
   on the whole right answer */
function tbTrace(it: any, v: any, put: (d: any) => void) {
  const M = tbModel(it), steps: any[] = [];
  const k = it.kind;
  if (k === "name") {
    steps.push([350, () => put({ strips: [tbCut(0)] })]);
    for (let j = 1; j <= 10; j++) steps.push([220, () => put({ strips: [tbCut(0, { nums: tbNums(j) })] })]);
    steps.push([450, () => put({ strips: [tbCut(1, { hi: [0], nums: tbNums(10) })], frac: { show: true, a: 1, b: 10, role: "work" } })]);
    steps.push([300, () => put({ strips: [tbCut(1, { hi: [0], nums: tbNums(10) })], frac: { show: true, a: 1, b: 10, role: "result" } })]);
  } else if (k === "dec1") {
    const view = [{ kind: "whole", ring: true }, tbCut(1, { hi: [0] })];
    steps.push([500, () => put({ strips: view })]);
    steps.push([450, () => put({ strips: view, dec: { show: true, w: 0, t: 1, role: "work" } })]);
    steps.push([300, () => put({ strips: view, dec: { show: true, w: 0, t: 1, role: "result" } })]);
  } else if (k === "unequal") {
    steps.push([500, () => put({ strips: [{ kind: "unequal", ring: true }] })]);
    steps.push([500, () => put({ strips: [{ kind: "unequal", ring: true }, tbCut(1, { hi: [0] })] })]);
    steps.push([300, () => put({ strips: tbUnequalEnd() })]);
  } else if (k === "shade" || k === "fracdec") {
    /* the whole box typed 1 to 9 ("8|0") is drawn as that many thin wholes; 10 or more (80, 12) draws none */
    const typedN = Math.floor(Number(slotPartsOf(v, 2)[0]) || 0);
    const u = typedN >= 1 && typedN <= 9 ? typedN : 0;
    const thin = Array.from({ length: u }, (_, j) => (j === 0 ? { kind: "thin", note: { text: u === 1 ? "whole" : "wholes", num: u } } : { kind: "thin" }));
    const hi = Array.from({ length: M.t }, (_, j) => j);
    const frac = { show: true, a: M.t, b: 10, role: "given" };
    steps.push([450, () => put({ strips: [...thin, tbCut(M.t, { hi })], frac })]);
    for (let j = 1; j <= M.t; j++) steps.push([220, () => put({ strips: [...thin, tbCut(M.t, { hi, nums: tbNums(j) })], frac })]);
    steps.push([450, () => put({ strips: [...thin, tbCut(M.t, { hi, nums: tbNums(M.t) })], frac, dec: { show: true, w: 0, t: M.t, role: "work" } })]);
    steps.push([300, () => put({ strips: [...thin, tbCut(M.t, { hi, nums: tbNums(M.t) })], frac, dec: { show: true, w: 0, t: M.t, role: "result" } })]);
  } else if (k === "decfrac") {
    steps.push([350, () => put({ strips: [tbCut(M.t)] })]);
    for (let j = 1; j <= M.t; j++) steps.push([220, () => put({ strips: [tbCut(M.t, { nums: tbNums(j) })] })]);
    steps.push([450, () => put({ strips: [tbCut(M.t, { nums: tbNums(M.t) })], frac: { show: true, a: M.t, b: 10, role: "work" } })]);
    steps.push([300, () => put({ strips: [tbCut(M.t, { nums: tbNums(M.t) })], frac: { show: true, a: M.t, b: 10, role: "result" } })]);
  } else if (k === "mixed" || k === "split") {
    const end = k === "split" ? "given" : "result";
    steps.push([350, () => put({ strips: [...tbWholes(M.w), tbCut(M.t)], labels: "hi" })]);
    for (let j = 1; j <= M.w; j++) steps.push([280, () => put({ strips: [...tbWholes(M.w, j), tbCut(M.t)], labels: "hi" })]);
    steps.push([400, () => put({ strips: [...tbWholes(M.w, M.w), tbCut(M.t)], labels: "hi", dec: { show: true, w: M.w, t: null, role: k === "split" ? "given" : "work" } })]);
    for (let j = 1; j <= M.t; j++) steps.push([200, () => put({ strips: [...tbWholes(M.w, M.w), tbCut(M.t, { nums: tbNums(j) })], labels: "hi", dec: { show: true, w: M.w, t: null, role: k === "split" ? "given" : "work" } })]);
    steps.push([400, () => put({ strips: [...tbWholes(M.w, M.w), tbCut(M.t, { nums: tbNums(M.t) })], labels: "hi", dec: { show: true, w: M.w, t: M.t, role: k === "split" ? "given" : "work" } })]);
    steps.push([300, () => put({ strips: [...tbWholes(M.w, M.w), tbCut(M.t, { nums: tbNums(M.t) })], labels: "hi", dec: { show: true, w: M.w, t: M.t, role: end },
      frac: { show: true, w: M.w, a: M.t, b: 10, role: "given" } })]);
  } else if (k === "lots" || k === "loose") {
    const view = (w: number, loose: number, flash: boolean) => [...tbWholes(w), ...tbChunks(loose).map((c, j) => tbCut(c, j === 0 && flash ? { flash: true } : {}))];
    steps.push([450, () => put({ strips: view(0, M.tot, false), tally: M.tot })]);
    for (let w = 1; w <= M.w; w++) {
      const before = w - 1, left = M.tot - 10 * before;
      steps.push([650, () => put({ strips: view(before, left, true), tally: M.tot, dec: before ? { show: true, w: before, t: null, role: "work" } : undefined })]);
      steps.push([300, () => put({ strips: view(w, left - 10, false), tally: M.tot, dec: { show: true, w, t: null, role: "work" } })]);
    }
    steps.push([450, () => put({ strips: view(M.w, M.t, false), tally: M.tot, dec: { show: true, w: M.w, t: M.t, role: "work" } })]);
    steps.push([300, () => put({ strips: view(M.w, M.t, false), tally: M.tot, dec: { show: true, w: M.w, t: M.t, role: "result" },
      frac: { show: true, a: M.tot, b: 10, role: "given" } })]);
  }
  return steps;
}

/* where the strips go: thin ones (a correction's wholes) are 20 tall, the rest share the room left */
function tbPlace(specs: any[], avail: number, cell = 96) {
  const nThin = specs.filter((q) => q.kind === "thin").length, nNorm = specs.length - nThin;
  /* a note chip stands above its bar (TB_NOTE_DY, a Hindi chip TB_DEV_HH tall), clear of the bar's ring */
  const noted = specs.some((q) => q.note) ? 72 : 0;
  /* claimed wholes: slabs 22 tall, unlabelled (the note "8 wholes" says it), so the board keeps its air */
  const gT = 6, hT = 22, gN = nNorm <= 2 ? (noted ? 88 : 20) : nNorm <= 4 ? 12 : 4;
  const thinAll = nThin ? nThin * hT + (nThin - 1) * gT + (nNorm ? 18 : 0) : 0;
  /* ONE bar: tall pieces (220), so the strip and its board fill about a third of the working area; two bars 110 (80
     beside a correction's wholes); three or four at most 64; five or more at most 52, room for a Hindi chip */
  const cap = nNorm <= 1 && !nThin ? 220 : nNorm <= 2 ? (nThin ? 80 : 110) : nNorm <= 4 ? 64 : 52;
  const hN = nNorm ? Math.min(cap, Math.floor((avail - noted - thinAll - (nNorm - 1) * gN) / nNorm)) : 0;
  const total = noted + thinAll + nNorm * hN + Math.max(0, nNorm - 1) * gN;
  let y = TB_TOP + Math.max(0, (avail - total) / 2) + noted;
  return specs.map((q, j) => {
    const thin = q.kind === "thin", h = thin ? hT : hN, r = { y, h };
    const next = specs[j + 1];
    y += h + (thin ? (next && next.kind !== "thin" ? 18 : gT) : gN);
    return r;
  });
}

/* one slice of the cake as a tap target (its own press hook): the slice's own wedge is the finger area */
function TbSlice({ j, cx, cy, r, enabled, onPress }: any) {
  const p = usePress(onPress, enabled);
  const pt = (deg: number) => [cx + r * Math.cos((deg * Math.PI) / 180), cy + r * Math.sin((deg * Math.PI) / 180)];
  const [x1, y1] = pt(-90 + 36 * j), [x2, y2] = pt(-90 + 36 * (j + 1));
  return (
    <path {...control("slice-" + (j + 1), "Shade or clear slice " + (j + 1))} className="c4-hit" {...p.bind()} onKeyDown={p.keys}
      d={`M ${cx.toFixed(1)} ${cy.toFixed(1)} L ${x1.toFixed(1)} ${y1.toFixed(1)} A ${r} ${r} 0 0 1 ${x2.toFixed(1)} ${y2.toFixed(1)} Z`} fill="transparent" />
  );
}

function Work({ phase, n, item, index, stage, wrong, typed, part, answerOn, cardKind, api, MODEL, box, step, stepOn, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();   /* the traceback */
  const act = useTimeline();  /* the child's own motion: the knife sweep and the pieces settling apart, a trade closing */
  const [s, setS] = useState<any>(() => (stage === "free" ? tbFree() : tbSetup(item, stage !== "teach" && stage !== "demo")));
  const [demo, setDemo] = useState<any>(null);
  const [anim, setAnim] = useState<any>({});
  /* the board's and cards' opacity during the short fade when a warm-up gives way to the question */
  const [veil, setVeil] = useState(1);
  const prevStage = useRef(stage);
  /* the wrong answer the correction answered: until the child types something new the card shows the correction's own
     answer, not the stale digits (cardAnswer, r49) */
  const staleTyped = useRef<any>(null);
  /* an act performed on screen (api.act, PATTERNS §15) is playing: the picture is busy (no invite, the card waits, a second
     start is ignored) until it resolves */
  const [acting, setActing] = useState(false);
  /* the foot keys' 400 ms double-tap guard (PATTERNS §16c) */
  const lastKey = useRef(0);
  /* Enter's 400 ms guard (two Enters never do two steps), and the last piece tapped (a second tap on the SAME piece within
     350 ms is one tap, never shade-then-clear) */
  const lastEnter = useRef(0), lastTap = useRef({ j: -1, t: 0 });
  /* the key a keyboard press started an act from: focus goes back to it (or the next live key) when the act is over */
  const refocus = useRef<string | null>(null);
  /* the spread of the pieces being cut or traded: 1 = settled apart by TB_GAP, 0 = tight (one bar); it eases on the
     runtime's useSlide (and jumps under reduced motion) */
  const closing = !!anim.knife || !!anim.trade || !!(demo && demo.strips && demo.strips.some((q: any) => q.flash));
  const sl = useSlide(closing ? 0 : 1);
  /* the cut strip's cream wash: 0 while the knife passes, then it fades in over the runtime's slide (280 ms; at once under
     reduced motion), so the bar never flashes pale at the end of the cut */
  const washK = useSlide(anim.knife ? 0 : 1);
  const L = tbLay(box && box.w ? box.w : BOARD_OPEN_W);
  /* free play has no question: it can open after ANY phase (a classroom explores between phases), when `item` is
     that phase's last question, so nothing in free play may read the question's kind */
  const k = stage === "free" ? "free" : item.kind;
  const free = stage === "free";
  const won = !free && (stage === "win" || stage === "idle");
  /* "demo" = a guide step waits for the child's act (the question and the Answer key wait): the picture is live */
  const live = stage === "teach" || stage === "demo" || stage === "ask" || free;
  const busy = tl.busy || act.busy || acting;
  const M = tbModel(item);

  /* the winning line: one literal a question, so each has its Hindi and Gujarati entry in TR */
  const sayWin = (q: any) => {
    if (q === "M1.S1.T2.C5:1") api.say("Yes, 1/10: one part out of ten.");
    else if (q === "M1.S1.T2.C5:TB1") api.say("Yes, 0.1: the 0 before the point means no whole strips.");
    else if (q === null) api.say("Right, unequal parts are not tenths.");
    else if (q === "M1.S1.T2.C6:TB2") api.say("Yes, 0.8: eight of the ten parts are shaded.");
    else if (q === "M1.S1.T2.C6:2") api.say("Right, 9 tenths and 0.9 are the same amount.");
    else if (q === "M1.S1.T2.C6:3") api.say("Yes, zero point eight means 8 tenths.");
    else if (q === "M1.S1.T2.C7:TB3") api.say("Yes, 2.9: the point sits between wholes and tenths.");
    else if (q === "M1.S1.T2.C7:4") api.say("Yes, 5.1: five wholes, then one tenth.");
    else if (q === "M1.S1.T2.C7:5") api.say("Yes: whole number part 7, decimal part 9.");
    else if (q === "M1.S1.T2.C8:TB4") api.say("Yes, 2.7: two wholes and seven tenths.");
    else if (q === "M1.S1.T2.C8:6") api.say("That is 5.3: five wholes, three tenths left.");
    else if (q === "M1.S1.T2.C8:7") api.say("Yes, 2.4: twenty tenths traded, four left.");
  };

  /* every question opens furnished for itself */
  useEffect(() => { staleTyped.current = null; setS(stage === "free" ? tbFree() : tbSetup(item, stage !== "teach" && stage !== "demo")); setDemo(null); setAnim({}); setVeil(1); }, [index]);
  useEffect(() => {
    const was = prevStage.current;
    prevStage.current = stage;
    if (stage === "free") { tl.stop(); act.stop(); setDemo(null); setAnim({}); setVeil(1); setS(tbFree()); api.lock(false); }
    /* a warm-up (guide steps that shade, add lots or trade; not phase 1's cut, which the question keeps) runs on the
       first question's own picture, so when the last step opens the question the picture goes back to that question's
       opening: nothing shaded, no lots, no traded wholes, the cards blank. A short fade, none under reduced motion. */
    else if (stage === "ask" && (was === "teach" || was === "demo") && (phase.steps ? !phase.steps.some((st: any) => st.on === "cut") : phase.teachLive)) {
      /* an act still playing (a trade's merge, when reduced motion opens the question at once) is stopped first, so it
         can never finish on top of the question's fresh picture */
      act.stop(); tl.stop();
      setS(tbSetup(item)); setDemo(null); setAnim({}); api.sfx.tick();
      if (!reducedMotion()) act.run([[60, () => setVeil(0.35)], [70, () => setVeil(0.65)], [70, () => setVeil(0.9)]], () => setVeil(1));
    }
    /* phase 1's question reached without the cut step (a jump straight to it) still opens on a cut strip, as after the
       step, so the question, its correction and its end state all show Cut quiet and Shape live */
    else if (stage === "ask" && (was === "teach" || was === "demo") && item.kind === "name") setS((o: any) => (o.cut ? o : { ...o, cut: true, whole: false }));
    else if (stage === "win") { tl.stop(); act.stop(); setDemo(null); setAnim({}); setVeil(1); api.lock(false); sayWin(item.qid); }
  }, [stage]);

  /* the traceback: lock, redraw on the demo layer, unlock; the child's shading is never touched */
  useEffect(() => {
    if (!wrong || stage !== "ask") return;
    staleTyped.current = wrong.value;
    api.lock(true);
    act.stop(); setAnim({}); setVeil(1);
    tl.run(tbTrace(item, wrong.value, setDemo), () => api.lock(false));
  }, [wrong]);

  /* r50: after a miss the card shows the correction's own answer; the moment the child types something NEW the card goes back to
     being the answer box (the correction's cards are cleared, its strips stay), so what is typed is seen */
  useEffect(() => {
    if (!demo || staleTyped.current === null || stage !== "ask" || tl.busy) return;
    if (String(typed) === String(staleTyped.current)) return;
    if (demo.frac === undefined && demo.dec === undefined) return;
    setDemo((d: any) => (d ? { ...d, frac: undefined, dec: undefined } : d));
  }, [typed]);

  /* the child's acts: the first line of each wipes the correction layer */
  const count = tbCount(s.cells);
  /* the hold after a phase's last guide step (stage "demo", no step waiting): every act is inert, so nothing a tap does there
     can carry into the question */
  const holding = stage === "demo" && !stepOn;
  const can = live && !busy && !holding;
  /* GUIDE STEPS: every act reports itself with api.did(name) AT THE CLICK (r34/r35): the step it names moves on at
     once; any other act shows the waiting step's hint. A tap that does nothing (a disabled key) reports nothing.
     Only while a guide step waits (stage "demo"): a question or free play (also between phases, r38) reports nothing. */
  const report = (name: string) => { if (stage === "demo") api.did(name); };
  /* Cut: the kit's knife slices at each of the nine lines (api.act; it plays the cut sound), the slab giving way to a piece in
     each slot it has passed (onPoint); when it resolves true the ten pieces settle apart inside their slots (TB_GAP) with the
     settle sound, keep their gaps for the rest of the question, and the step is reported. A second start is ignored. */
  const doCut = () => {
    if (!can || s.cut || tapRow < 0) return;
    const p = place[tapRow];
    setDemo(null); setActing(true);
    api.act({ tool: "knife", moves: "slice", at: Array.from({ length: 9 }, (_, j) => ({ x: L.x0 + (j + 1) * L.cell, y: p.y + p.h / 2 })),
      onPoint: (i: number) => setAnim({ knife: i + 1 }) }).then((ok: boolean) => {
      setActing(false);
      if (ok !== true) { setAnim({}); return; }
      setS((o: any) => ({ ...o, cut: true, cells: o.whole ? tbPack(10) : o.cells, whole: false }));
      setAnim({ settle: true }); api.sfx.settle(); report("cut");
      act.run([[400, () => {}]], () => setAnim({}));
    });
  };
  /* a part (or the slab before the cut, or a cake slice): shade or clear that one */
  const doTap = (j: number) => {
    if (!can) return;
    const t = Date.now();
    if (lastTap.current.j === j && t - lastTap.current.t < 350) return;
    lastTap.current = { j, t };
    setDemo(null); api.sfx.tick();
    setS((o: any) => { if (!o.cut) return { ...o, whole: !o.whole }; const c = o.cells.slice(); c[j] = !c[j]; return { ...o, cells: c }; });
    /* shading a part is the "shade" act; clearing one (a second tap on the same part) is not, so a step that waits for
       another part keeps waiting and shows its hint */
    report(s.cut && s.cells[j] ? "clear" : "shade");
  };
  const doShape = () => {
    if (!can || !s.cut) return;
    setDemo(null); api.sfx.tick();
    setS((o: any) => ({ ...o, shape: o.shape === "strip" ? "circle" : "strip" }));
    report("shape");
  };
  /* the cut strips' rows for a state (wholes first, then one strip a ten cells), exactly as tbPlace lays them out now */
  const rowsFor = (wholes: number, cells: boolean[]) =>
    tbPlace([...tbWholes(wholes), ...Array.from({ length: Math.ceil(cells.length / 10) }, () => ({ kind: "cut" }))], avail, L.cell).slice(wholes);
  /* Lots of N: the drawn hand carries N chocolate pieces from the key onto the strip (api.act carry, the carried piece in `hold`),
     each landing in the next empty slot as it passes it (onPoint; the first landing adds the strip the lot needs, so nothing
     changes before the act has started); the lot is counted and reported only when it resolves true */
  const doLots = () => {
    if (!can || k !== "lots" || s.lots >= item.lots) return;
    const cnt = count, lot = item.lot, c = L.cell;
    const len = Math.max(10, Math.ceil((cnt + lot) / 10) * 10);
    const rows = rowsFor(s.wholes, Array.from({ length: len }, () => false)), ph = rows[0].h, pw = c - TB_GAP;
    setDemo(null); setActing(true);
    api.act({ tool: "hand", moves: "carry", from: { x: BX.lots + BW.lots / 2, y: TB_BY + 10 },
      at: Array.from({ length: lot }, (_, i) => { const g = cnt + i, r = rows[Math.floor(g / 10)]; return { x: L.x0 + (g % 10) * c + c / 2, y: r.y + r.h / 2 }; }),
      hold: tbPiece(-pw / 2, -ph / 2, pw, ph, TB_BLUE, "hold", skinsOn),
      onPoint: (i: number) => setS((o: any) => {
        const cc = o.cells.concat(Array.from({ length: Math.max(0, len - o.cells.length) }, () => false));
        cc[cnt + i] = true;
        return { ...o, cells: cc };
      }) }).then((ok: boolean) => {
      setActing(false);
      if (ok !== true) return;
      setS((o: any) => ({ ...o, lots: o.lots + 1 }));
      report("lots");
    });
  };
  const canTrade = count >= 10 && (!free || s.wholes < 9);
  /* Trade: the drawn hand sweeps along the first strip (api.act sweep) while its ten pieces slide together (their gaps close,
     the strip lit amber with Trade); when it resolves true they are one whole slab in the row of wholes, with the trade sound */
  const doTrade = () => {
    if (!can || !canTrade) return;
    const r = rowsFor(s.wholes, s.cells)[0], y = r.y + r.h / 2, c = L.cell;
    setDemo(null); setActing(true);
    setAnim({ trade: true });
    api.act({ tool: "hand", moves: "sweep", from: { x: L.x0, y }, at: Array.from({ length: 10 }, (_, j) => ({ x: L.x0 + j * c + c / 2, y })),
      to: { x: L.x0 + L.len, y } }).then((ok: boolean) => {
      setActing(false); setAnim({});
      if (ok !== true) return;
      api.sfx.trade();
      setS((o: any) => (free ? { ...o, wholes: o.wholes + 1, cut: false, cells: tbPack(0), shape: "strip" }
        : { ...o, wholes: o.wholes + 1, cells: tbPack(tbCount(o.cells) - 10) }));
      report("trade");
    });
  };
  /* a foot key's press, guarded against a double tap (400 ms). During a guide step only the step's own key acts: any other key
     is a wrong act (the step's hint, nothing changes). A keyboard press (the key has the focus) gets the focus back after the act */
  const pressKey = (id: string, fn: () => void) => () => {
    const t = Date.now();
    if (t - lastKey.current < 400) return;
    lastKey.current = t;
    if (stage === "demo" && stepOn && stepOn !== id) { report(id); return; }
    const a: any = document.activeElement;
    refocus.current = a && a.getAttribute && a.getAttribute("data-control") === id ? id : null;
    fn();
  };
  useEffect(() => {
    if (!refocus.current || busy) return;
    const want = refocus.current;
    refocus.current = null;
    const liveKey = (id: string) => {
      const e: any = document.querySelector('[data-zone="work"] [data-control="' + id + '"]');
      return e && e.getAttribute("aria-disabled") !== "true" ? e : null;
    };
    /* the key itself, else the next live key, else the card the last act just opened (it blinks: the answer is next) */
    const e = liveKey(want) || ["lots", "trade", "cut", "answer-open"].map(liveKey).find(Boolean);
    if (e && e.focus) e.focus();
  });

  /* Enter, the agent's toolApi.check() and the dev solve() perform ONE click of the CURRENT step: the same act the
     child's own tap does (a shade taps the first unshaded part), which reports itself; two Enters within 400 ms are one */
  const stepAct = (on: string) => {
    const t = Date.now();
    if (t - lastEnter.current < 400) return;
    lastEnter.current = t;
    if (on === "cut") doCut();
    else if (on === "trade") doTrade();
    else if (on === "lots") doLots();
    else if (on === "shade" && s.cut) { const j = s.cells.indexOf(false); doTap(j < 0 ? 0 : j); }
  };
  api.onEnter(stage === "demo" && stepOn ? () => stepAct(stepOn) : null);

  /* what the host and the agent read back (toolApi.getState) */
  const tallyOwn = s.wholes * 10 + (s.cut ? count : s.whole ? 10 : 0);
  const partStrips = Math.max(1, Math.ceil(s.cells.length / 10));
  api.share({ cut: s.cut, shape: s.shape, wholes: s.wholes, shaded: count, strips: s.wholes + partStrips, lots: s.lots, tenths: tallyOwn });

  /* which keys this question has (keyOnly, PATTERNS §16c): ONE key at the bottom centre whose label follows the act (phase 1's
     Cut, which leaves after the cut; free play's Cut, then Trade), or phase 4's two keys side by side (Lots of and Trade: the
     child chooses when to add a lot and when to trade). The Shape switch stays off (the owner, 2026-10-08); the cake drawing
     stays in the code. The foot row's room stays reserved (anyBtn), so the strips never move when a key leaves */
  const phase1 = n === 1 && (k === "name" || k === "dec1");
  const hasCut = free || phase1;
  const hasLots = !free && k === "lots";
  const hasTrade = free || k === "lots" || k === "loose";
  const anyBtn = free || phase1 || hasLots || hasTrade;
  const avail = anyBtn ? TB_BY - 8 - 2 * TB_TOP : 520 - 2 * TB_TOP;
  const boardH = avail + 2 * TB_TOP;
  /* the foot: the keys centred under the board, spreading as the room grows; the Tenths tally at its left end and the
     count of lots at its right end (phase 4, free play) */
  /* the foot row, like the board, has one size and place, the panel shut or open */
  const bGap = 24;
  const BW: any = { cut: 200, trade: 140, lots: 190 };
  const footRow = free ? [s.cut ? "trade" : "cut"] : phase1 ? (s.cut ? [] : ["cut"]) : hasLots ? ["lots", "trade"] : hasTrade ? ["trade"] : [];
  /* the Tenths tally: its word (32) and its count (40) side by side in a 72-tall chip, as wide as the word needs */
  const TW = 14 + Math.ceil(String(tx("Tenths")).length * T.label * (lang === "en" ? 0.56 : 0.5)) + 12 + 50 + 14;
  /* the count of lots, "<n> of <m> lots" (an exact TR line for every count); its width is estimated from its characters */
  const lotsNow = won || demo ? item.lots : s.lots;
  const cntText = hasLots ? tx(lotsNow + " of " + item.lots + " lots") : "";
  const cntSize = T.label, cntW = Math.ceil(cntText.length * cntSize * (lang === "en" ? 0.56 : 0.52));
  /* the keys: centred under the board, but never over the tally (left) or the count (right) */
  const footW = footRow.reduce((a: number, id: string) => a + BW[id], 0) + Math.max(0, footRow.length - 1) * bGap;
  const footLo = free || n === 4 ? TW + 16 : 0, footHi = L.boardW - (hasLots ? cntW + 28 : 0);
  const BX: any = {};
  footRow.reduce((x: number, id: string) => { BX[id] = Math.round(x); return x + BW[id] + bGap; }, Math.max(footLo, Math.min(footHi - footW, (L.boardW - footW) / 2)));

  /* what the strips area shows: the correction, the win, or the child's own strips */
  const ownSpecs = () => {
    if (!free && k === "unequal") return [{ kind: "unequal" }];
    if (!s.cut) return [...tbWholes(s.wholes), { kind: "uncut", on: s.whole }];
    const parts: any[] = [];
    for (let j = 0; j < s.cells.length; j += 10) parts.push({ kind: "cut", cells: s.cells.slice(j, j + 10), own: true, flash: !!anim.trade && j === 0 });
    return [...tbWholes(s.wholes), ...parts];
  };
  const winSpecs = () => (k === "unequal" ? tbUnequalEnd() : [...tbWholes(M.w), tbCut(M.t)]);
  const specs = demo && demo.strips ? demo.strips : won ? winSpecs() : ownSpecs();
  const showCircle = !demo && !won && s.cut && s.shape === "circle" && s.wholes === 0 && s.cells.length === 10 && k !== "unequal";
  const place = tbPlace(specs, avail, L.cell);
  /* the skins are only the look: none while the summary page hides the working area */
  const skinsOn = stage !== "summary";
  /* at most 40 skins a screen: shaded pieces wear the tile only while the screen holds 40 pieces or fewer */
  const skinAll = skinsOn && specs.filter((q: any) => q.kind === "cut").length * 10 <= 40;
  /* nothing on the board (the split question): no board, and the cards stand centred in the area */
  const bare = !showCircle && specs.length === 0;
  const CX = bare ? Math.round(((box && box.w) || BOARD_OPEN_W) / 2 - L.cw / 2) : L.cx;

  /* the cards */
  /* a live card stays blank until there is something to read: a shaded part, a whole, or the whole strip shaded */
  const nothing = !s.wholes && !s.whole && (!s.cut || count === 0);
  /* the uncut strip shaded whole reads 10/10; wholes with no tenth shaded yet read just the whole number ("2") */
  const liveFrac = nothing ? { show: false } : n === 4 && !free ? { show: true, a: tallyOwn, b: 10, role: "given" }
    : s.wholes && count === 0 && !s.whole ? { show: true, w: s.wholes, a: null, b: 10, role: "given" }
    : { show: true, w: s.wholes || undefined, a: s.cut ? count : s.whole ? 10 : 0, b: 10, role: "given" };
  const liveDec = nothing ? { show: false } : { show: true, w: Math.floor(tallyOwn / 10), t: tallyOwn % 10, role: "given" };
  const modeCard = (which: number) => {
    const mode = free ? "live" : (stage === "teach" || stage === "demo") && phase.teachLive ? "live" : (TB_SHOW[k] || ["off", "off"])[which];
    if (won) {
      if (k === "unequal") return { show: false };
      /* both cards fill at the win, each in its own form; the card the child did NOT answer stays covered only when it would
         give the next question away (the next question asks for that very card, of the same amount: Q1 names 1/10, and the
         decimal 0.1 is Q2's answer) */
      const asked = (TB_SHOW[k] || []).indexOf("ask"), nx = phase.items && phase.items[index + 1];
      if (which !== asked && nx && nx.kind && (TB_SHOW[nx.kind] || []).indexOf("ask") === which) {
        const nm = tbModel(nx);
        if (nm.w === M.w && nm.t === M.t) return { show: false };
      }
      /* at the win only the card the child answered (its TB_SHOW mode is "ask") turns green; a card the question gave,
         or one that read the shading, stays the given blue */
      const role = (TB_SHOW[k] || [])[which] === "ask" ? "result" : "given";
      return which === 0 ? { show: true, w: n === 3 ? M.w : undefined, a: n === 4 ? M.tot : M.t, b: 10, role }
        : { show: true, w: M.w, t: M.t, role };
    }
    if (mode === "ask") return { show: false, ask: stage === "ask" };
    if (mode === "off") return { show: false };
    if (mode === "whole") return s.whole && !s.cut ? { show: true, w: 1, t: 0, role: "given" } : { show: false };
    if (mode === "given") return which === 0 ? { show: true, a: item.tenths, b: 10, role: "given" } : { show: true, w: M.w, t: M.t, role: "given" };
    return which === 0 ? liveFrac : liveDec;
  };
  let frac: any = modeCard(0), dec: any = modeCard(1);
  if (demo && demo.frac !== undefined) frac = demo.frac;
  if (demo && demo.dec !== undefined) dec = demo.dec;
  const labelsOn = !(k === "split" && !won && !(demo && demo.labels)) ;
  const labelsHi = !!(demo && demo.labels === "hi") || (won && k === "split");
  const roleInk = (role: string) => (role === "result" ? tbDeep(TB_GREEN) : role === "work" ? shade(TB_AMBER, 0.3) : tbDeep(TB_BLUE));

  /* the Tenths tally (phase 4 and Free play), at the left end of the foot row (keyOnly has no runs box) */
  const showTally = (free || n === 4) && stage !== "summary";
  const tally = demo && demo.tally !== undefined ? demo.tally : won ? M.tot : tallyOwn;

  /* ── drawing helpers: called, never mounted ── */
  const noteText = (nt: any) => (nt.num !== undefined ? nt.num + " " : "") + tx(nt.text);
  /* word chips in Hindi and Gujarati are taller (reph and matras above, ू below); a note stands clear above its bar's ring */
  const dev = lang !== "en", noteHH = dev ? TB_DEV_HH : 40, noteDY = dev ? 50 : 42;
  const wordHH = (h: number) => (dev ? Math.min(TB_DEV_HH, h - 2) : Math.min(40, h - 8));
  const stripG = (q: any, y: number, h: number, key: any) => {
    const x0 = L.x0, c = L.cell, len = L.len;
    const note = q.note ? tbChip(x0 + 2, y - noteDY, noteText(q.note), shade(TB_AMBER, 0.45), "start", undefined, noteHH) : null;
    if (q.kind === "whole" || q.kind === "thin") {
      /* a whole strip is one solid slab (shaded blue, lifted), labelled; a correction's claimed wholes too */
      const yl = y - TB_LIFT;
      return (
        <g key={key}>
          {note}
          {tbSlab(x0, y, len, h, TB_BLUE)}
          {q.ring && <rect x={x0 - 4} y={yl - 4} width={len + 8} height={h + 8} rx={12} fill="none" stroke={TB_AMBER} strokeWidth={5} />}
          {q.kind === "whole" && h >= 36 && tbChip(x0 + 12, yl + h / 2, tx("Whole"), tbDeep(TB_BLUE), "start", undefined, wordHH(h))}
          {q.n && h >= 36 && tbChip(x0 + len - 12, yl + h / 2, q.n, tbDeep(TB_BLUE), "end", undefined, Math.min(46, h - 8), 36)}
        </g>
      );
    }
    if (q.kind === "uncut") {
      /* the bar before the cut: ONE solid slab, already chocolate (the tile stretched over it). As the kit's knife passes
         each line (api.act onPoint), the slots it has passed give way to pieces (tight in their slots) with their cut lines;
         when it resolves the strip is cut and the pieces settle apart */
      const kn = anim.knife || 0;
      return (
        <g key={key}>
          {tbSlab(x0, y, len, h, q.on ? TB_BLUE : null, undefined, "tbChocG", true, skinsOn)}
          {Array.from({ length: kn }, (_, j) => tbPiece(x0 + j * c, y, c, h, q.on ? TB_BLUE : null, "p" + j, skinsOn, true, 0))}
          {Array.from({ length: kn }, (_, j) => (
            <line key={"k" + j} x1={x0 + (j + 1) * c} y1={y - 3} x2={x0 + (j + 1) * c} y2={y + h + 3} stroke={TB_CUT} strokeWidth={3} strokeLinecap="round" />
          ))}
        </g>
      );
    }
    if (q.kind === "unequal") {
      /* the same bar cut into ten UNEQUAL pieces (the widths scaled to this bar), each inset in its own slot like the
         equal ones, so the row is still as long as the bar */
      const sc = len / 720;
      const xs = TB_UNEQUAL.reduce((a: number[], wd: number, j: number) => [...a, j ? a[j - 1] + TB_UNEQUAL[j - 1] * sc : x0], [] as number[]);
      const g2 = TB_GAP / 2;
      return (
        <g key={key}>
          {note}
          {TB_UNEQUAL.map((wd, j) => tbPiece(xs[j] + g2, y, wd * sc - TB_GAP, h, j === 0 ? TB_BLUE : null, j, skinsOn))}
          {q.ring && <rect x={xs[0] + g2 - 5} y={y - TB_LIFT - 5} width={TB_UNEQUAL[0] * sc - TB_GAP + 10} height={h + 10} rx={12} fill="none" stroke={TB_AMBER} strokeWidth={6} />}
        </g>
      );
    }
    /* a bar cut into ten equal pieces: each sits in its slot of `cell`, inset ins on both sides (TB_GAP / 2 once
       settled; none while the knife sweeps or while a trade grows them back into one bar) */
    const ap = q.flash || (q.own && anim.settle) ? sl : 1;
    const ins = (TB_GAP / 2) * ap, pw = c - 2 * ins;
    const hi = q.hi || [];
    const up = (j: number) => (q.cells[j] ? TB_LIFT : 0);
    return (
      <g key={key}>
        {note}
        {q.cells.map((on: boolean, j: number) => tbPiece(x0 + j * c + ins, y, pw, h, on ? TB_BLUE : null, j, on ? skinAll : skinsOn, true, washK))}
        {hi.map((j: number) => <rect key={"h" + j} x={x0 + j * c + ins + 4} y={y + 4 - up(j)} width={pw - 8} height={h - 8} rx={6} fill="none" stroke={TB_AMBER} strokeWidth={5} />)}
        {q.nums && h >= 36 && q.nums.map((t: any, j: number) => t && tbChip(x0 + j * c + c / 2, y + h / 2 - up(j), t, q.cells[j] ? tbDeep(TB_BLUE) : TB_INK, "middle", "n" + j, Math.min(46, h - 8), 36))}
        {q.flash && (
          <g>
            {/* the brief: "each ten lights amber until it is traded" (amber, the tool's highlight colour; never a red cue) */}
            <rect x={x0 - 5} y={y - TB_LIFT - 5} width={len + 10} height={h + TB_LIFT + 10} rx={12} fill="none" stroke={TB_AMBER} strokeWidth={6} />
            <rect x={x0 + len / 2 - 70} y={y + h / 2 - 25} width={140} height={44} rx={22} fill={shade(TB_AMBER, 0.45)} />
            <text x={x0 + len / 2} y={y + h / 2 + 8} textAnchor="middle" fontSize={T.label} fontWeight={700} fill="#FFFFFF">{tx("Trade")}</text>
          </g>
        )}
      </g>
    );
  };
  /* the same whole as a round cake cut into ten equal slices: a shaded slice is tinted and ringed light */
  const circ = { cx: L.x0 + L.len / 2, cy: TB_TOP + avail / 2, r: L.r };
  const circleG = () => {
    const { cx, cy, r } = circ;
    const pt = (deg: number, rr = r) => [cx + rr * Math.cos((deg * Math.PI) / 180), cy + rr * Math.sin((deg * Math.PI) / 180)];
    const sec = (j: number, rr = r) => {
      const [x1, y1] = pt(-90 + 36 * j, rr), [x2, y2] = pt(-90 + 36 * (j + 1), rr);
      return `M ${cx.toFixed(1)} ${cy.toFixed(1)} L ${x1.toFixed(1)} ${y1.toFixed(1)} A ${rr} ${rr} 0 0 1 ${x2.toFixed(1)} ${y2.toFixed(1)} Z`;
    };
    const cells = s.cells.slice(0, 10);
    return (
      <g>
        <defs>{cells.map((_: any, j: number) => <clipPath key={j} id={"tbSec" + j}><path d={sec(j)} /></clipPath>)}</defs>
        <circle cx={cx} cy={cy} r={r} fill={TB_CAKE} filter="url(#fShadow)" />
        <circle cx={cx} cy={cy} r={r - 8} fill="none" stroke={TB_CRUST} strokeWidth={16} />
        <circle cx={cx} cy={cy} r={r * 0.55} fill="none" stroke={tint(TB_CAKE, 0.25)} strokeWidth={10} strokeOpacity={0.6} />
        {skinsOn && cells.map((on: boolean, j: number) => !on && <Skin key={"s" + j} name="disc" x={cx - r} y={cy - r} w={2 * r} h={2 * r} clip={`url(#tbSec${j})`} />)}
        {cells.map((on: boolean, j: number) => on && (
          <g key={"t" + j}>
            <path d={sec(j)} fill={TB_BLUE} fillOpacity={TB_TINT} />
            <path d={sec(j, r - 7)} fill="none" stroke="#FFFFFF" strokeOpacity={0.7} strokeWidth={2.5} strokeLinejoin="round" />
          </g>
        ))}
        {cells.map((_: any, j: number) => { const [x1, y1] = pt(-90 + 36 * j); return <line key={"c" + j} x1={cx} y1={cy} x2={x1} y2={y1} stroke={TB_CUT} strokeWidth={2.5} strokeLinecap="round" />; })}
        <circle cx={cx} cy={cy} r={r} fill="none" stroke={TB_CAKE_RIM} strokeWidth={3} />
      </g>
    );
  };
  /* the cutting board under the bars (and under the cake): drawn in code from the chrome colours */
  const wood = mix(mix(C.panel, C.rule, 0.3), TB_AMBER, 0.07);
  /* the "wholes" correction (a decimal answered with wholes, "8|0"): drawn at HALF scale so the claimed whole bars (two
     columns) and the strip of ten tenths stay in ONE scale, the strip exactly as long as a bar */
  const thinN = specs.filter((q: any) => q.kind === "thin").length;
  const half: any = !showCircle && thinN > 0 ? (() => {
    const unit = (L.len - 12) / 2, rows = Math.ceil(thinN / 2), bh = 44, gp = 12;
    const total = 64 + rows * bh + (rows - 1) * gp + 18 + bh;
    const y0 = TB_TOP + Math.max(0, (avail - total) / 2) + 64, ys = y0 + rows * (bh + gp) - gp + 18;
    return { unit, rows, bh, gp, y0, ys, top: y0 - noteHH - 6 - TB_LIFT, bot: ys + bh };
  })() : null;
  const halfG = () => {
    const { unit, rows, bh, gp, y0, ys } = half;
    const thin = specs.filter((q: any) => q.kind === "thin"), cut = specs.find((q: any) => q.kind === "cut");
    /* drawn flat (no lift, no lift shadow): at half scale the shadow filter's edge would show as a band */
    const c = unit / 10, ins = 3, up = (_j: number) => 0;
    return (
      <g>
        {thin[0] && thin[0].note && tbChip(L.x0 + 2, y0 - noteHH / 2 - 6, noteText(thin[0].note), shade(TB_AMBER, 0.45), "start", undefined, noteHH)}
        {thin.map((_: any, i: number) => { const col = i < rows ? 0 : 1, row = col ? i - rows : i;
          return tbSlab(L.x0 + col * (unit + gp), y0 + row * (bh + gp), unit, bh, TB_BLUE, "w" + i, "tbChocG", false); })}
        {cut && cut.cells.map((on: boolean, j: number) => tbPiece(L.x0 + j * c + ins, ys, c - 2 * ins, bh, on ? TB_BLUE : null, "c" + j, skinsOn, false))}
        {cut && (cut.hi || []).map((j: number) => <rect key={"h" + j} x={L.x0 + j * c + ins + 2} y={ys + 2 - up(j)} width={c - 2 * ins - 4} height={bh - 4} rx={5} fill="none" stroke={TB_AMBER} strokeWidth={4} />)}
        {/* one digit a 37-wide piece: 32 on a chip with a little room beside it, so neighbours never touch */}
        {cut && cut.nums && cut.nums.map((t: any, j: number) => t && tbChip(L.x0 + j * c + c / 2, ys + bh / 2 - up(j), t, cut.cells[j] ? tbDeep(TB_BLUE) : TB_INK, "middle", "n" + j, 38, T.label, 6))}
      </g>
    );
  };
  /* the board hugs what lies on it (TB_HUG round the bars, their notes and the lift, or round the cake), and so it
     sits centred in the room above the buttons, as the bars do */
  const boardG = () => {
    if (bare) return null;
    const top = showCircle ? circ.cy - circ.r : half ? half.top : Math.min(...specs.map((q: any, j: number) => place[j].y - (q.note ? noteDY + noteHH / 2 : 0) - TB_LIFT));
    const bot = showCircle ? circ.cy + circ.r : half ? half.bot : Math.max(...specs.map((_: any, j: number) => place[j].y + place[j].h));
    /* the board and its shadow (8 below) end inside the working area */
    const by = Math.max(0, Math.round(top - TB_HUG)), bh = Math.min(boardH - 8, Math.round(bot + TB_HUG)) - by;
    return (
      <g>
        <rect x={0} y={by + 8} width={L.boardW} height={bh} rx={26} fill={shade(wood, 0.16)} filter="url(#fShadow)" />
        <rect x={0} y={by} width={L.boardW} height={bh} rx={26} fill={wood} stroke={shade(C.rule, 0.1)} strokeWidth={2} />
        <rect x={7} y={by + 7} width={L.boardW - 14} height={bh - 14} rx={20} fill="none" stroke={tint(wood, 0.5)} strokeWidth={3} />
        {[0.2, 0.5, 0.8].map((f, j) => {
          const gy = by + bh * f;
          return <path key={j} d={`M 30 ${gy.toFixed(1)} C ${(L.boardW * 0.3).toFixed(1)} ${(gy - 12).toFixed(1)} ${(L.boardW * 0.62).toFixed(1)} ${(gy + 14).toFixed(1)} ${(L.boardW - 30).toFixed(1)} ${(gy + 2).toFixed(1)}`}
            fill="none" stroke={shade(wood, 0.08)} strokeWidth={2} strokeLinecap="round" />;
        })}
      </g>
    );
  };
  /* r49 CARD ANSWER: the question's answer is given ON the card it asks for. While the keypad is shut that card blinks and a tap
     on it opens the keypad (data-control "answer-open"); with the keypad open its two boxes are the answer boxes (part-1,
     part-2: the digits fill them as they are typed, the caret sits in one, a tap picks one). */
  const cardWhich = cardKind === "fraction" ? 0 : cardKind === "decimal" ? 1 : -1;
  const asking = stage === "ask" && cardWhich >= 0;
  const cardOpen = asking && !!(box && box.open);
  const tv = slotPartsOf(typed, 2);
  const showTyped = asking && String(typed || "") !== "" && !(demo && staleTyped.current !== null && String(typed) === String(staleTyped.current));
  /* the typed digits are set at the size the card's finished answer is drawn at (the fraction card's 56, the decimal card's 72),
     the SAME size in both boxes whatever each holds, and step down together (never one box alone) only when the longer of the
     two will not fit its box; their baselines are the finished answer's baselines, so nothing jumps when the answer lands */
  const typedLen = Math.max(String(tv[0] || "").length, String(tv[1] || "").length);
  /* the cards. WIDE (the panel shut, 648 wide), under the key's corner from y 98: the fraction card 150 tall, its title at the
     left and the fraction at the right; the decimal card 258 tall. NARROW (the panel open, 262 wide, nowhere near the key's
     corner) from y 8: the fraction card 190 tall with its title on top; the decimal card 306 tall. Titles 36 / 28, fraction
     digits 64 / 56, part labels 32 / 28; Hindi and Gujarati lines get 1.6 em of pitch and room for their reph and matras */
  const wide = L.t >= 0.25;
  const cTitle = wide ? TB_TITLE : T.micro, cFd = wide ? TB_FD : T.xl;
  const FY = wide ? (box && box.key ? box.key.y + box.key.h : 88) + 10 : 8, FH = wide ? 150 : 190, DY = FY + FH + (wide ? 10 : 12), DH = 516 - DY;
  const boxSize = (which: number, w: number) => (which === 0 ? [cFd, T.xl, T.speech, T.prompt, T.label, T.micro] : [T.display, T.xl, T.speech, T.prompt, T.label])
    .find((sz) => typedLen * sz * 0.58 <= w - 12) || T.micro;
  const aBox = (which: number, j: number, x: number, y: number, w: number, h: number, ask: boolean) => {
    const mine = asking && which === cardWhich;
    const val = mine && showTyped ? String(tv[j] || "") : "";
    const on = mine && cardOpen && part === j && !busy;
    const size = boxSize(which, w);
    return (
      <g key={"ab" + which + j}>
        <rect x={x} y={y} width={w} height={h} rx={10} fill={on ? tint(TB_AMBER, 0.88) : "none"} stroke={mine && cardOpen ? (on ? shade(TB_AMBER, 0.15) : TB_AMBER) : ask ? TB_AMBER : C.rule}
          strokeWidth={on ? 5 : 3} strokeDasharray={mine && cardOpen ? undefined : "8 7"} />
        {val && <text x={x + w / 2} y={y + h / 2 + size * 0.36} textAnchor="middle" fontSize={size} fontWeight={700} fill={TB_INK}>{val}</text>}
        {on && <rect className="c4-caret" x={x + w / 2 + val.length * size * 0.29 + 5} y={y + h / 2 - size * 0.4} width={3} height={size * 0.8} rx={1.5} fill={C.accent} />}
      </g>
    );
  };
  const cardHits = (x: number, y: number, w: number, h: number, halves: any[]) => {
    if (!asking || busy) return null;
    if (!cardOpen) {
      if (!cardReadyNow) return null;
      return (
        <g>
          <SlotPartBox id="answer-open" label={tx(cardWhich === 0 ? "Fraction card" : "Decimal card")} x={x} y={y} w={w} h={h} on={false} enabled onPick={() => api.openAnswer && api.openAnswer()} />
          <BlinkRing x={x} y={y} w={w} h={h} rx={18} C={C} sw={5} m={4} />
        </g>
      );
    }
    return (
      <g>
        {halves.map((r: any, j: number) => (
          <SlotPartBox key={j} id={"part-" + (j + 1)} label={item.parts[j].label + " box"} x={r.x} y={r.y} w={r.w} h={r.h} on={part === j} enabled onPick={() => api.pickPart && api.pickPart(j)} />
        ))}
      </g>
    );
  };
  const fracCard = () => {
    const X = CX, ask = !!frac.ask, y = FY, bw = wide ? 96 : 88, bar = bw / 2 + 4;
    /* the title's own width (estimated), so the fraction and its answer boxes never stand under it */
    const tW = 20 + Math.ceil(String(tx("Fraction")).length * cTitle * (dev ? 0.52 : 0.56));
    const fx = X + Math.round(wide ? Math.max(L.cw * 0.66, tW + 150) : Math.min(L.cw - 14 - bw / 2, Math.max(L.cw * 0.62, tW + 14 + bw / 2)));
    /* baselines: the title, the numerator, the bar, the denominator, a whole number beside the fraction; the answer boxes' tops */
    const Y = wide ? { t: 88, a: 62, bar: 75, b: 136, w: 99, ba: 10, bb: 84 } : { t: 40, a: 100, bar: 114, b: 172, w: 136, ba: 52, bb: 124 };
    const col = roleInk(frac.role);
    return (
      <g>
        <rect x={X} y={y} width={L.cw} height={FH} rx={18} fill="#FFFFFF" stroke={ask ? TB_AMBER : C.rule} strokeWidth={ask ? 4 : 2} filter="url(#fShadowSoft)" />
        <text x={X + 20} y={y + Y.t} fontSize={cTitle} fontWeight={600} fill={C.ink}>{tx("Fraction")}</text>
        {frac.show && frac.a === null ? (
          /* wholes and no tenth shaded yet: just the whole number */
          <text x={fx} y={y + Y.w} textAnchor="middle" fontSize={cFd} fontWeight={700} fill={col}>{String(frac.w)}</text>
        ) : frac.show ? (
          <g>
            {frac.w ? <text x={fx - (wide ? 124 : 110)} y={y + Y.w} textAnchor="middle" fontSize={cFd} fontWeight={700} fill={col}>{frac.w + " +"}</text> : null}
            <text x={fx} y={y + Y.a} textAnchor="middle" fontSize={cFd} fontWeight={700} fill={col}>{String(frac.a)}</text>
            <line x1={fx - bar} y1={y + Y.bar} x2={fx + bar} y2={y + Y.bar} stroke={TB_INK} strokeWidth={5} strokeLinecap="round" />
            <text x={fx} y={y + Y.b} textAnchor="middle" fontSize={cFd} fontWeight={700} fill={col}>{String(frac.b)}</text>
          </g>
        ) : (
          <g>
            {aBox(0, 0, fx - bw / 2, y + Y.ba, bw, 56, ask)}
            <line x1={fx - bar} y1={y + Y.bar} x2={fx + bar} y2={y + Y.bar} stroke={TB_INK} strokeWidth={5} strokeLinecap="round" />
            {aBox(0, 1, fx - bw / 2, y + Y.bb, bw, 56, ask)}
          </g>
        )}
        {/* the two finger boxes split at the bar (both at least 72 tall) */}
        {cardWhich === 0 && cardHits(X, y, L.cw, FH, [{ x: X, y, w: L.cw, h: Y.bar }, { x: X, y: y + Y.bar, w: L.cw, h: FH - Y.bar }])}
      </g>
    );
  };
  const decCard = () => {
    /* the two sides 232 apart in the wide card, 120 in the narrow one */
    const sp = wide ? 116 : 60, px = Math.round(CX + L.cw / 2 - 2), wx = px - sp, tx2 = px + sp, y = DY;
    /* the title, the digits' baseline (the answer boxes' bottom is base + 10), the labels' first baseline and pitch: Hindi and
       Gujarati 1.6 em, their first line low enough that its reph clears the boxes */
    const t0 = wide ? 48 : 40, base = y + (wide ? 130 : 122), lsz = wide ? 32 : T.micro;
    const labH = dev ? Math.round(lsz * 1.6) : lsz + (wide ? 4 : 2), lab0 = base + 12 + (dev ? Math.round(lsz * 1.1) + 8 : Math.round(lsz * 0.75) + 10);
    /* the part labels' line breaks are authored, never a wrap: "Whole number" / "part" and "Decimal" / "part" (Hindi and
       Gujarati: the word, then भाग / ભાગ); in the narrow card English takes one word a line */
    const labLines = (s: string) => {
      const i = s.lastIndexOf(" ");
      return wide || dev ? (i > 0 ? [s.slice(0, i), s.slice(i + 1)] : [s]) : s.split(" ");
    };
    const ask = !!dec.ask;
    const col = roleInk(dec.role);
    const box = (x: number) => <rect x={x - 34} y={base - 66} width={68} height={76} rx={10} fill="none" stroke={ask ? TB_AMBER : C.rule} strokeWidth={3} strokeDasharray="8 7" />;
    const abox = (j: number, x: number) => aBox(1, j, x - 42, base - 62, 84, 72, ask);
    const labelInk = labelsHi ? shade(TB_AMBER, 0.45) : shade(C.accent, 0.2);
    return (
      <g>
        <rect x={CX} y={y} width={L.cw} height={DH} rx={18} fill="#FFFFFF" stroke={ask ? TB_AMBER : C.rule} strokeWidth={ask ? 4 : 2} filter="url(#fShadowSoft)" />
        <text x={CX + 20} y={y + t0} fontSize={cTitle} fontWeight={600} fill={C.ink}>{tx("Decimal")}</text>
        {dec.show ? (
          <g>
            <text y={base} textAnchor="middle" fontSize={T.display} fontWeight={700}>
              <tspan x={wx} fill={dec.w === 0 ? TB_GREY : col}>{String(dec.w)}</tspan>
              <tspan x={px} fill={TB_INK}>.</tspan>
              {dec.t !== null && dec.t !== undefined && <tspan x={tx2} fill={dec.t === 0 ? TB_GREY : col}>{String(dec.t)}</tspan>}
            </text>
            {(dec.t === null || dec.t === undefined) && box(tx2)}
          </g>
        ) : (
          <g>
            {abox(0, wx)}
            <text x={px} y={base} textAnchor="middle" fontSize={T.display} fontWeight={700} fill={TB_INK}>.</text>
            {abox(1, tx2)}
          </g>
        )}
        <circle cx={px} cy={base - 7} r={8} fill={TB_INK} />
        {labelsOn && labLines(tx("Whole number part")).map((l, j) => (
          <text key={"w" + j} x={wx} y={lab0 + j * labH} textAnchor="middle" fontSize={lsz} fontWeight={600} fill={labelInk}>{l}</text>
        ))}
        {labelsOn && labLines(tx("Decimal part")).map((l, j) => (
          <text key={"d" + j} x={tx2} y={lab0 + j * labH} textAnchor="middle" fontSize={lsz} fontWeight={600} fill={labelInk}>{l}</text>
        ))}
        {cardWhich === 1 && cardHits(CX, y, L.cw, DH, [{ x: CX, y, w: px - CX, h: DH }, { x: px, y, w: CX + L.cw - px, h: DH }])}
      </g>
    );
  };

  /* the one thing to touch */
  let invite: any = null;
  if (live && !busy && !demo) {
    /* a guide step: the invite goes on the control its act needs (stepOn); "part" = the next part to shade */
    if (stage === "demo" && stepOn) invite = stepOn === "cut" ? (s.cut ? null : "cut") : stepOn === "trade" ? (canTrade ? "trade" : null)
      : stepOn === "lots" ? (s.lots < item.lots ? "lots" : null) : stepOn === "shade" ? "part" : null;
    else if (stage === "demo") invite = null;   /* the hold after the last act (r33): nothing invites, the result shows */
    else if (hasCut && !s.cut) invite = "cut";
    else if (hasTrade && canTrade) invite = "trade";
    else if (hasLots && s.lots < item.lots) invite = "lots";
    /* a question that says "Shade N parts": the pulse goes round the next part to shade and the card waits until N are shaded
       (the owner, 2026-10-08: "the card should wait until the child has shaded") */
    else if (stage === "ask" && (k === "dec1" || k === "shade" || k === "mixed") && count < M.t) invite = "part";
  }
  /* r49: while an act on the picture still waits (cut, lots, trade, or the parts to shade) the card neither blinks nor takes a tap, and the bubble does not
     say "tap the card": the picture first */
  const cardReadyNow = !invite && !busy;
  useEffect(() => { if (api.cardReady) api.cardReady(cardReadyNow, !!invite); }, [cardReadyNow, !!invite]);
  const tapRow = (() => { for (let j = specs.length - 1; j >= 0; j--) if (specs[j].kind === "cut" || specs[j].kind === "uncut") return j; return -1; })();
  /* no part taps over the half-scale correction (its parts are too small to be finger boxes); the child's next act,
     a typed answer, goes on as usual */
  const tappable = live && (free || n <= 3) && k !== "unequal" && !showCircle && !half && tapRow >= 0;
  const btnOn = live && !busy && !holding;
  const hitY = tapRow >= 0 ? place[tapRow].y + place[tapRow].h / 2 - Math.max(72, place[tapRow].h) / 2 : 0;
  const hitH = tapRow >= 0 ? Math.max(72, place[tapRow].h) : 72;
  const pitch = L.cell;
  /* the foot keys: keyed by their place in the row, so a key whose label follows the act (free play's Cut, then Trade)
     changes without a remount; data-control is the act it does now */
  const KEYS: any = {
    cut: { label: "Cut", on: btnOn && !s.cut, fn: doCut, aria: "Cut the strip into ten equal parts" },
    lots: { label: item && item.lot === 9 ? "Lots of 9" : "Lots of 6", on: btnOn && hasLots && s.lots < item.lots, fn: doLots, aria: "Add " + (item && item.lot) + " more tenths" },
    trade: { label: "Trade", on: btnOn && canTrade, fn: doTrade, aria: "Trade ten tenths for one whole" },
  };

  return (
    <g>
      {showTally && (
        <g>
          <rect x={0} y={TB_BY} width={TW} height={72} rx={RAD.panel} fill="url(#gPanel)" stroke={C.rule} strokeWidth={2} />
          {/* both centred on the chip's middle; a Hindi or Gujarati word's anusvara and matras keep 12 clear of its top */}
          <text x={14} y={TB_BY + 47} fontSize={T.label} fontWeight={600} fill={C.ink}>{tx("Tenths")}</text>
          <text x={TW - 14} y={TB_BY + 51} textAnchor="end" fontSize={T.prompt} fontWeight={700} fill={tbDeep(TB_BLUE)}>{String(tally)}</text>
        </g>
      )}
      <defs>{tbSlabGrad("tbChocG")}</defs>
      {/* the board, the bars and the cards are plain drawing (no data-control): a tap on them reaches the working area
          as an inert tap, which the runtime answers with the waiting step's hint (r41) */}
      <g opacity={veil < 1 ? veil : undefined}>
        {boardG()}
        {showCircle ? circleG() : half ? halfG() : specs.map((q: any, j: number) => stripG(q, place[j].y, place[j].h, j))}
      </g>
      <g opacity={veil < 1 ? veil : undefined}>
        {fracCard()}
        {decCard()}
      </g>
      {footRow.map((id: string, j: number) => {
        const b = KEYS[id];
        return (
          <Key key={"act" + j} id={id} x={BX[id]} y={TB_BY} w={BW[id]} h={72} C={C} disabled={!b.on} onClick={pressKey(id, b.fn)} label={b.aria}>
            <text x={0} y={11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={b.on ? C.ink : tint(C.ink, 0.34)}>{tx(b.label)}</text>
          </Key>
        );
      })}
      {hasLots && (
        <text x={L.boardW - 12} y={TB_BY + 46} textAnchor="end" fontSize={cntSize} fontWeight={600} fill={C.ink}>{cntText}</text>
      )}
      {tappable && specs[tapRow].kind === "uncut" && (
        <Hit id="strip" x={L.x0} y={hitY} w={L.len} h={hitH} onPress={() => doTap(0)} label="Shade the whole strip" enabled={!busy} />
      )}
      {tappable && specs[tapRow].kind === "cut" && Array.from({ length: 10 }).map((_, j) => (
        <Hit key={j} id={"tenth-" + (j + 1)} x={L.x0 + j * pitch} y={hitY} w={pitch} h={hitH}
          onPress={() => doTap(j)} label={"Shade or clear tenth " + (j + 1)} enabled={!busy} />
      ))}
      {/* the cake: each slice is its own control; a tap shades THAT slice, a second tap clears it */}
      {live && showCircle && Array.from({ length: 10 }).map((_, j) => (
        <TbSlice key={j} j={j} cx={circ.cx} cy={circ.cy} r={circ.r} enabled={can && s.cut} onPress={() => doTap(j)} />
      ))}
      {/* the one pulse (Invite's own class), drawn round the button so it never crosses its label */}
      {invite && invite !== "part" && BX[invite] !== undefined && <rect className="c4-pulse" x={BX[invite] - 7} y={TB_BY - 7} width={BW[invite] + 14} height={86} rx={RAD.key + 6}
        fill="none" stroke={C.accent} strokeWidth={5} pointerEvents="none" />}
      {/* a shading step: the pulse goes round the next part to tap */}
      {invite === "part" && tappable && specs[tapRow].kind === "cut" && (() => {
        const j = specs[tapRow].cells.indexOf(false);
        if (j < 0) return null;
        const p = place[tapRow];
        return <rect className="c4-pulse" x={L.x0 + j * L.cell - 3} y={p.y - 7} width={L.cell + 6} height={p.h + 14} rx={RAD.key}
          fill="none" stroke={C.accent} strokeWidth={5} pointerEvents="none" />;
      })()}
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase */
function Thumb({ result, C, w, h, n, lang = "en", tx = (v: any) => v }: any) {
  const L = result && result.last;
  if (!L) return null;
  const ph: any = PHASES[(n || 1) - 1];
  /* phase 1's row says "one tenth, written 0.1": its drawing is the 1/10 question, whichever was answered last */
  const it: any = ph && ph.items[n === 1 ? 0 : L.item];
  if (!it) return null;
  const M = tbModel(it);
  const ink = tbDeep(TB_GREEN);
  /* wholes are thin bars as wide as the strip, stacked above it; the block is centred in the box and scaled down to its
     inner height (7 wholes and the tile row are taller than the card) */
  const k = Math.min(1, (h - 12) / ((M.w ? M.w * 7 + 2 : 0) + 22));
  const bh = 5 * k, bg = 2 * k, top = M.w ? M.w * (bh + bg) + 2 * k : 0, th = 22 * k;
  const y0 = h / 2 - (top + th) / 2;
  let x = 10;
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      {it.kind === "unequal" ? (
        <g>{TB_UNEQUAL.map((wd, j) => { const ww = (wd / 720) * 120; const r = <rect key={j} x={x} y={h / 2 - 12} width={ww - 1.5} height={24} rx={2} fill={j === 0 ? TB_COUNT : TB_WASHED} stroke={TB_CUT} strokeWidth={1.2} />; x += ww; return r; })}</g>
      ) : (
        <g>
          {Array.from({ length: M.w }).map((_, j) => <rect key={"w" + j} x={10} y={y0 + j * (bh + bg)} width={118.5} height={bh} rx={Math.min(2, bh / 2)} fill={TB_COUNT} />)}
          {Array.from({ length: 10 }).map((_, j) => <rect key={j} x={10 + j * 12} y={y0 + top} width={10.5} height={th} rx={2} fill={j < M.t ? TB_COUNT : TB_WASHED} stroke={TB_CUT} strokeWidth={1.2} />)}
        </g>
      )}
      {it.parts === SLOT_FRACTION ? (
        <g>
          <text x={w - 40} y={h / 2 - 8} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={ink}>{String(it.answer[0])}</text>
          <line x1={w - 62} y1={h / 2} x2={w - 18} y2={h / 2} stroke={TB_INK} strokeWidth={3} />
          <text x={w - 40} y={h / 2 + 28} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={ink}>{String(it.answer[1])}</text>
        </g>
      ) : (
        <text x={w - 16} y={h / 2 + 12} textAnchor="end" fontSize={T.label} fontWeight={700} fill={ink}>
          {it.choices ? tx("No") : Array.isArray(it.answer) ? it.answer[0] + "." + it.answer[1] : String(it.answer)}
        </text>
      )}
    </g>
  );
}

/* the START PAGE's picture (LAYOUT.md §1c), in a 1200 x 340 box, still: one whole chocolate bar, UNCUT (one slab), on a
   cutting board, the knife resting beside it. It asks the hook's question and answers nothing: no cut, no digit, no
   word, no shading. */
function TbStartArt({ C }: any) {
  const wood = mix(mix(C.panel, C.rule, 0.3), TB_AMBER, 0.07);
  return (
    <g>
      <defs>{tbSlabGrad("tbChocGS")}</defs>
      {/* the cutting board: its edge, its face, a soft inner rim, the grain, a hanging hole */}
      <rect x={40} y={46} width={970} height={270} rx={36} fill={shade(wood, 0.16)} filter="url(#fShadow)" />
      <rect x={40} y={36} width={970} height={270} rx={36} fill={wood} stroke={shade(C.rule, 0.1)} strokeWidth={2} />
      <rect x={50} y={46} width={950} height={250} rx={28} fill="none" stroke={tint(wood, 0.5)} strokeWidth={3} />
      {[86, 171, 258].map((gy, j) => (
        <path key={j} d={`M 76 ${gy} C 330 ${gy - 16} 640 ${gy + 18} 974 ${gy + 2}`} fill="none" stroke={shade(wood, 0.08)} strokeWidth={2.5} strokeLinecap="round" />
      ))}
      <circle cx={972} cy={74} r={13} fill={C.paper} stroke={shade(wood, 0.2)} strokeWidth={3} />
      {/* the whole bar, one slab, with a soft shadow */}
      <g filter="url(#fShadowSoft)">{tbSlab(95, 113, 860, 116, null, "slab", "tbChocGS", true, true)}</g>
      {/* the knife, resting beside the board */}
      <g transform="translate(1110,180) rotate(-58)" filter="url(#fShadowSoft)">
        <rect x={0} y={-17} width={104} height={34} rx={14} fill="#4A3426" stroke={TB_INK} strokeWidth={2} />
        <circle cx={30} cy={0} r={4.5} fill="#D9C8A8" />
        <circle cx={74} cy={0} r={4.5} fill="#D9C8A8" />
        <rect x={-14} y={-20} width={16} height={40} rx={4} fill="#A9B1B8" stroke={TB_INK} strokeWidth={2} />
        <path d="M -14 -16 L -170 -16 Q -186 -14 -184 2 L -150 14 L -14 14 Z" fill="#E4E9ED" stroke={TB_INK} strokeWidth={2} strokeLinejoin="round" />
        <path d="M -22 -9 L -160 -9" stroke="#FFFFFF" strokeWidth={2.5} strokeLinecap="round" />
      </g>
    </g>
  );
}
/* printed on the start page under the picture (not spoken); it asks, it never answers */
const START_HOOK = "One chocolate bar. Can you cut it so everyone gets the same?";

/* no `bigPad`: a strip of ten tenths at the 72 finger floor, the two cards and phase 4's foot row (tally, Lots of, Trade, the
   count of lots) need the standard panel's 1086 (pieces 75 wide); in 900 the pieces would be 56 (BUILD_CARD: a strip of ten) */
function TenthsBuilder(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, sideBySide: true, board: true, nextKey: true, cardAnswer: true, keyOnly: true, navDots: true,
      StartArt: TbStartArt, START_HOOK, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, format: tbFormat, winMs: 3000, fitHost: () => null }} />
  );
}

export default TenthsBuilder;
