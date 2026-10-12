/* ═══ M1.S1.T2.C4.2D1 · share_bench · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists: header + its three controls, canvas, slot + pad, bubble + mascot,
   phase dots (user / AI mode), window.toolApi, sounds, the synced voice, scoring, the events,
   idle and restart. NO imports in this file; only the five host hooks. Follow docs/LAYOUT.md;
   the reference tool is work/indiannica_eng_maths4_ch1/M1.S1.T2.C4.2D1/tool.tsx.
   Edit, never rewrite. Built by `node cli.mjs scaffold`; concepts are verbatim (check compares them). */

const TOOL_ID = "share_bench";
const MEDIA_ID = "M1.S1.T2.C4.2D1";
const TOOL_NAME = "Share Bench";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
const VOICE = {"rate":0.92,"pitch":1.06};

/* spoken before phase 1's teach lines only. The plan's line spoke of a heap and plates, but phase 1
   opens on the fact card, so the line names what is on the screen */
const OPENING = ["Counters in equal rows, on a card that turns round."];
/* the whole-tool line: spoken on the summary page */
const FINISH_LINE = "Every heap shared, every leftover smaller than the plates, and every heap rebuilt.";
/* said when the child opens Free play from the summary page (free play is the bench: any heap, any plates) */
const FREE_LINE = "Free play. Any heap, any plates. Deal it out, then check it.";

/* Hindi and Gujarati, keyed by the English line exactly (runtime r13+: `lineFor(line, lang, TR)`); the
   English stays what the checks read. NCERT class 4 terms: भाज्य भाजक भागफल शेषफल / ભાજ્ય ભાજક ભાગફળ શેષ.
   Digits stay digits: the runtime speaks them in the language in use. A first draft; wants a native
   speaker's read. (The two-box labels are drawn by the runtime as written: r17 does not translate them.) */
const TR: any = {
  hi: {
    "Share Bench": "बाँटने की मेज़",
    "Counters in equal rows, on a card that turns round.": "घूमने वाले कार्ड पर बराबर पंक्तियों में गोटियाँ।",
    "Every heap shared, every leftover smaller than the plates, and every heap rebuilt.": "हर ढेर बँटा, हर बचा हुआ प्लेटों से कम रहा, और हर ढेर फिर से बना।",
    "Free play. Any heap, any plates. Deal it out, then check it.": "मुक्त खेल। कोई भी ढेर, कितनी भी प्लेटें। बाँटो, फिर जाँचो।",
    "One multiplication, two divisions": "एक गुणा, दो भाग",
    "Read the rows one way. Now turn the card. What does each way divide by?": "पंक्तियों को एक तरह से पढ़ो। अब कार्ड घुमाओ। हर तरह से किससे भाग होता है?",
    "How many are in each row, and how many rows are there?": "हर पंक्ति में कितने हैं, और कितनी पंक्तियाँ हैं?",
    "Turn the card and count the rows again.": "कार्ड घुमाओ और पंक्तियाँ फिर से गिनो।",
    "A multiplication fact with no zero in it gives two division facts, one for each number that was multiplied.": "जिस गुणा तथ्य में शून्य न हो, उससे भाग के दो तथ्य बनते हैं, गुणा की गई हर संख्या के लिए एक।",
    "You learned: one multiplication gives two division facts.": "तुमने सीखा: एक गुणा से भाग के दो तथ्य बनते हैं।",
    "Two division facts": "भाग के दो तथ्य",
    "9 times 13 is 117. Write the two division facts this one multiplication gives.": "9 गुणा 13 बराबर 117 है। इस एक गुणा से बनने वाले भाग के दो तथ्य लिखो।",
    "What is the product on the card?": "कार्ड पर गुणनफल क्या है?",
    "6 times 17 is 102. Write both division facts it gives.": "6 गुणा 17 बराबर 102 है। इससे बनने वाले भाग के दोनों तथ्य लिखो।",
    "Count 17 in each row. How many rows make 102?": "हर पंक्ति में 17 गिनो। कितनी पंक्तियों से 102 बनते हैं?",
    "How many takes of 12?": "12 कितनी बार उठाए?",
    "Take 12 away from 84 again and again until nothing is left. How many times did you take it away, and what division does that show?": "84 में से 12 बार-बार निकालो, जब तक कुछ न बचे। कितनी बार निकाला, और इससे कौन सा भाग दिखता है?",
    "Each take lifts 12 off the heap. How many takes empty the tray?": "हर बार ढेर से 12 उठते हैं। कितनी बार में ट्रे खाली होती है?",
    "Naming the four numbers": "चारों संख्याओं के नाम",
    "Deal one to every plate each round, until a round cannot go.": "हर चक्कर में हर प्लेट पर एक रखो, जब तक पूरा चक्कर न चल सके।",
    "Into how many parts is it shared?": "इसे कितने हिस्सों में बाँटा गया है?",
    "Say what is shared, into how many parts, how many each, and what is left.": "बताओ क्या बँटा, कितने हिस्सों में, हर एक को कितने, और क्या बचा।",
    "The dividend is shared by the divisor, the quotient is each share, and the remainder is what is left.": "भाज्य को भाजक से बाँटा जाता है, भागफल हर एक का हिस्सा है, और शेषफल वह है जो बचता है।",
    "You learned: dividend, divisor, quotient and remainder.": "तुमने सीखा: भाज्य, भाजक, भागफल और शेषफल।",
    "Deal, then tag all four": "बाँटो, फिर चारों पर नाम लगाओ",
    "79 marbles are shared equally among 6 bags. Name the dividend, the divisor, the quotient and the remainder.": "79 कंचे 6 थैलियों में बराबर बाँटे गए। भाज्य, भाजक, भागफल और शेषफल बताओ।",
    "Which number is being shared?": "कौन सी संख्या बाँटी जा रही है?",
    "95 ÷ 8: which is which?": "95 ÷ 8: कौन क्या है?",
    "In 95 divided by 8, which number is the dividend and which is the divisor?": "95 को 8 से भाग देने में, कौन सी संख्या भाज्य है और कौन सी भाजक?",
    "Which one is dealt out, and which one says how many plates?": "कौन सी बाँटी जाती है, और कौन सी बताती है कि कितनी प्लेटें?",
    "65 seeds, 4 pots": "65 बीज, 4 गमले",
    "65 seeds are planted equally in 4 pots. Find the quotient and the remainder, and say what each one means.": "65 बीज 4 गमलों में बराबर बोए गए। भागफल और शेषफल निकालो, और बताओ हर एक का क्या मतलब है।",
    "Deal a seed to every pot each round. How many rounds go?": "हर चक्कर में हर गमले में एक बीज डालो। कितने चक्कर चलते हैं?",
    "Why the remainder stays small": "शेषफल छोटा क्यों रहता है",
    "Look at the dish. Could every plate still take one more?": "कटोरी देखो। क्या हर प्लेट अब भी एक और ले सकती है?",
    "How many plates are there?": "कितनी प्लेटें हैं?",
    "If the dish holds as many as the plates, deal one more round.": "अगर कटोरी में प्लेटों जितने हैं, तो एक चक्कर और बाँटो।",
    "The remainder is always smaller than the divisor. Divisor times quotient, add the remainder, gives back the dividend.": "शेषफल हमेशा भाजक से छोटा होता है। भाजक गुणा भागफल, फिर शेषफल जोड़ो, तो भाज्य वापस मिलता है।",
    "You learned: the remainder is always smaller than the divisor.": "तुमने सीखा: शेषफल हमेशा भाजक से छोटा होता है।",
    "58 among 7 friends": "7 दोस्तों में 58",
    "A child shares 58 stickers among 7 friends, gives 7 each, and says 9 are left over. What is the mistake, and what is the right answer?": "एक बच्चा 58 स्टिकर 7 दोस्तों में बाँटता है, हर एक को 7 देता है, और कहता है 9 बचे। गलती क्या है, और सही उत्तर क्या है?",
    "How many counters are in the dish?": "कटोरी में कितनी गोटियाँ हैं?",
    "Find the quotient and remainder of 71 divided by 9, and check the answer by multiplying back.": "71 को 9 से भाग देकर भागफल और शेषफल निकालो, और वापस गुणा करके उत्तर जाँचो।",
    "Multiply back, then add what is left over. Does it make 71?": "वापस गुणा करो, फिर जो बचा उसे जोड़ो। क्या 71 बनता है?",
    "÷ 5 leaves 6? Why not?": "÷ 5 में 6 बचे? क्यों नहीं?",
    "A child divides a number by 5 and says the remainder is 6. How do you know straight away that this cannot be right?": "एक बच्चा किसी संख्या को 5 से भाग देकर कहता है कि शेषफल 6 है। तुम तुरंत कैसे जानते हो कि यह सही नहीं हो सकता?",
    "Compare the dish with the plates.": "कटोरी की तुलना प्लेटों से करो।",
    "6 is more than 5": "6, 5 से ज़्यादा है",
    "6 is even": "6 सम है",
    "it must be 0": "यह 0 होना चाहिए",
    "5 is odd": "5 विषम है",
    "Dividing by one, by itself and by zero": "एक से, खुद से और शून्य से भाग",
    "Try one plate. Now as many plates as counters. Now no plates at all.": "एक प्लेट लेकर देखो। अब गोटियों जितनी प्लेटें। अब एक भी प्लेट नहीं।",
    "Where would the first counter go?": "पहली गोटी कहाँ जाएगी?",
    "Name the rule for one plate, for as many plates as counters, and for no plates.": "एक प्लेट, गोटियों जितनी प्लेटें, और कोई प्लेट नहीं: हर एक का नियम बताओ।",
    "Dividing by one leaves a number alone. A number other than zero divided by itself is one. Dividing by zero is not possible.": "एक से भाग देने पर संख्या वही रहती है। शून्य के सिवा कोई भी संख्या खुद से भाग देने पर एक होती है। शून्य से भाग संभव नहीं।",
    "You learned: 34 ÷ 1 = 34, 34 ÷ 34 = 1, and 34 ÷ 0 is not possible.": "तुमने सीखा: 34 ÷ 1 = 34, 34 ÷ 34 = 1, और 34 ÷ 0 संभव नहीं।",
    "not possible": "संभव नहीं",
    "Work out 34 divided by 1, 34 divided by 34, and 0 divided by 34. Then say what 34 divided by 0 is.": "34 ÷ 1, 34 ÷ 34 और 0 ÷ 34 निकालो। फिर बताओ कि 34 ÷ 0 क्या है।",
    "Turn the dial to no plates in your head. Is there anywhere to deal?": "मन में सोचो कि एक भी प्लेट नहीं है। क्या बाँटने की कोई जगह है?",
    "Fill in the blanks": "खाली जगह भरो",
    "Fill in the blanks for 527. Divide it by 1, then by itself, and divide 0 by it.": "527 के लिए खाली जगह भरो। इसे 1 से भाग दो, फिर खुद से, और 0 को इससे भाग दो।",
    "Which rule fits each line: one plate, as many plates as counters, or an empty tray?": "हर पंक्ति पर कौन सा नियम लगता है: एक प्लेट, गोटियों जितनी प्लेटें, या खाली ट्रे?",
    "Is zero divided by zero equal to one, to zero, or not possible? Say which rule decides it.": "शून्य भाग शून्य, एक है, शून्य है, या संभव नहीं? बताओ कौन सा नियम इसे तय करता है।",
    "With no plates, where would a share go?": "कोई प्लेट न हो, तो हिस्सा कहाँ जाएगा?",
    /* the bench's own words */
    "dividend": "भाज्य", "divisor": "भाजक", "quotient": "भागफल", "remainder": "शेषफल",
    "rows": "पंक्तियाँ", "in a row": "एक पंक्ति में", "take": "बार", "takes": "बार", "heap": "ढेर", "plates": "प्लेटें",
    "left over": "बचे", "round": "चक्कर", "rounds": "चक्कर", "empty tray": "खाली ट्रे",
    "nowhere to put shares": "हिस्से रखने की जगह नहीं", "Into the dish": "कटोरी में डालो", "Deal a round": "एक चक्कर बाँटो",
    "Put the rest in the dish": "बाकी कटोरी में डालो", "Check it": "जाँचो", "a number ÷ itself": "संख्या ÷ वही संख्या",
    "0 ÷ a number": "0 ÷ कोई संख्या", "not for 0": "0 के लिए नहीं", "Turn the card": "कार्ड घुमाओ",
    "Take 12 from the heap": "ढेर से 12 उठाओ", "Close the dish": "कटोरी बंद करो", "One less in the heap": "ढेर में एक कम",
    "One more in the heap": "ढेर में एक और", "One plate fewer": "एक प्लेट कम", "One more plate": "एक प्लेट और",
    /* the summary page's little drawings (Thumb) */
    "7 takes of 12": "12 के 7 बार", "remainder 1": "शेषफल 1", "remainder 2": "शेषफल 2", "remainder 8": "शेषफल 8",
    "dividend 95": "भाज्य 95", "divisor 8": "भाजक 8", "÷ 5 leaves 6?": "÷ 5 में 6 बचे?",
  },
  gu: {
    "Share Bench": "વહેંચણીનું ટેબલ",
    "Counters in equal rows, on a card that turns round.": "ફરતા કાર્ડ પર સરખી હારમાં ગોટીઓ.",
    "Every heap shared, every leftover smaller than the plates, and every heap rebuilt.": "દરેક ઢગલો વહેંચાયો, દરેક વધેલું પ્લેટ કરતાં ઓછું રહ્યું, અને દરેક ઢગલો ફરી બન્યો.",
    "Free play. Any heap, any plates. Deal it out, then check it.": "મુક્ત રમત. કોઈ પણ ઢગલો, ગમે તેટલી પ્લેટ. વહેંચો, પછી ચકાસો.",
    "One multiplication, two divisions": "એક ગુણાકાર, બે ભાગાકાર",
    "Read the rows one way. Now turn the card. What does each way divide by?": "હારને એક રીતે વાંચો. હવે કાર્ડ ફેરવો. દરેક રીતે શાનાથી ભાગાકાર થાય છે?",
    "How many are in each row, and how many rows are there?": "દરેક હારમાં કેટલા છે, અને કેટલી હાર છે?",
    "Turn the card and count the rows again.": "કાર્ડ ફેરવો અને હાર ફરી ગણો.",
    "A multiplication fact with no zero in it gives two division facts, one for each number that was multiplied.": "શૂન્ય વગરના ગુણાકારના તથ્યથી ભાગાકારના બે તથ્ય મળે છે, ગુણેલી દરેક સંખ્યા માટે એક.",
    "You learned: one multiplication gives two division facts.": "તમે શીખ્યા: એક ગુણાકારથી ભાગાકારના બે તથ્ય મળે છે.",
    "Two division facts": "ભાગાકારના બે તથ્ય",
    "9 times 13 is 117. Write the two division facts this one multiplication gives.": "9 ગુણ્યા 13 બરાબર 117 થાય. આ એક ગુણાકારથી મળતા ભાગાકારના બે તથ્ય લખો.",
    "What is the product on the card?": "કાર્ડ પર ગુણનફળ કેટલું છે?",
    "6 times 17 is 102. Write both division facts it gives.": "6 ગુણ્યા 17 બરાબર 102 થાય. તેનાથી મળતા ભાગાકારના બંને તથ્ય લખો.",
    "Count 17 in each row. How many rows make 102?": "દરેક હારમાં 17 ગણો. કેટલી હારથી 102 બને?",
    "How many takes of 12?": "12 કેટલી વાર ઉપાડ્યા?",
    "Take 12 away from 84 again and again until nothing is left. How many times did you take it away, and what division does that show?": "84 માંથી 12 વારંવાર કાઢો, જ્યાં સુધી કંઈ ન બચે. કેટલી વાર કાઢ્યા, અને તે કયો ભાગાકાર બતાવે છે?",
    "Each take lifts 12 off the heap. How many takes empty the tray?": "દરેક વાર ઢગલામાંથી 12 ઊપડે છે. કેટલી વારમાં ટ્રે ખાલી થાય?",
    "Naming the four numbers": "ચારેય સંખ્યાનાં નામ",
    "Deal one to every plate each round, until a round cannot go.": "દરેક ફેરામાં દરેક પ્લેટમાં એક મૂકો, જ્યાં સુધી પૂરો ફેરો ન થઈ શકે.",
    "Into how many parts is it shared?": "તેને કેટલા ભાગમાં વહેંચ્યું છે?",
    "Say what is shared, into how many parts, how many each, and what is left.": "કહો શું વહેંચાયું, કેટલા ભાગમાં, દરેકને કેટલા, અને શું વધ્યું.",
    "The dividend is shared by the divisor, the quotient is each share, and the remainder is what is left.": "ભાજ્યને ભાજક વડે વહેંચાય છે, ભાગફળ દરેકનો ભાગ છે, અને શેષ એ છે જે વધે છે.",
    "You learned: dividend, divisor, quotient and remainder.": "તમે શીખ્યા: ભાજ્ય, ભાજક, ભાગફળ અને શેષ.",
    "Deal, then tag all four": "વહેંચો, પછી ચારેય પર નામ લગાડો",
    "79 marbles are shared equally among 6 bags. Name the dividend, the divisor, the quotient and the remainder.": "79 લખોટી 6 થેલીમાં સરખી વહેંચી. ભાજ્ય, ભાજક, ભાગફળ અને શેષ કહો.",
    "Which number is being shared?": "કઈ સંખ્યા વહેંચાઈ રહી છે?",
    "95 ÷ 8: which is which?": "95 ÷ 8: કોણ શું છે?",
    "In 95 divided by 8, which number is the dividend and which is the divisor?": "95 ને 8 વડે ભાગવામાં, કઈ સંખ્યા ભાજ્ય છે અને કઈ ભાજક?",
    "Which one is dealt out, and which one says how many plates?": "કઈ વહેંચાય છે, અને કઈ કહે છે કે કેટલી પ્લેટ?",
    "65 seeds, 4 pots": "65 બી, 4 કૂંડાં",
    "65 seeds are planted equally in 4 pots. Find the quotient and the remainder, and say what each one means.": "65 બી 4 કૂંડામાં સરખાં વાવ્યાં. ભાગફળ અને શેષ શોધો, અને દરેકનો અર્થ કહો.",
    "Deal a seed to every pot each round. How many rounds go?": "દરેક ફેરામાં દરેક કૂંડામાં એક બી મૂકો. કેટલા ફેરા થાય?",
    "Why the remainder stays small": "શેષ નાની કેમ રહે છે",
    "Look at the dish. Could every plate still take one more?": "વાટકી જુઓ. શું દરેક પ્લેટ હજી એક વધુ લઈ શકે?",
    "How many plates are there?": "કેટલી પ્લેટ છે?",
    "If the dish holds as many as the plates, deal one more round.": "જો વાટકીમાં પ્લેટ જેટલા હોય, તો એક ફેરો વધુ વહેંચો.",
    "The remainder is always smaller than the divisor. Divisor times quotient, add the remainder, gives back the dividend.": "શેષ હંમેશાં ભાજક કરતાં નાની હોય છે. ભાજક ગુણ્યા ભાગફળ, વત્તા શેષ, ફરી ભાજ્ય આપે છે.",
    "You learned: the remainder is always smaller than the divisor.": "તમે શીખ્યા: શેષ હંમેશાં ભાજક કરતાં નાની હોય છે.",
    "58 among 7 friends": "7 મિત્રોમાં 58",
    "A child shares 58 stickers among 7 friends, gives 7 each, and says 9 are left over. What is the mistake, and what is the right answer?": "એક બાળક 58 સ્ટીકર 7 મિત્રોમાં વહેંચે છે, દરેકને 7 આપે છે, અને કહે છે 9 વધ્યા. ભૂલ શું છે, અને સાચો જવાબ શું છે?",
    "How many counters are in the dish?": "વાટકીમાં કેટલી ગોટીઓ છે?",
    "Find the quotient and remainder of 71 divided by 9, and check the answer by multiplying back.": "71 ને 9 વડે ભાગીને ભાગફળ અને શેષ શોધો, અને પાછો ગુણાકાર કરીને જવાબ ચકાસો.",
    "Multiply back, then add what is left over. Does it make 71?": "પાછો ગુણાકાર કરો, પછી વધેલું ઉમેરો. શું 71 બને છે?",
    "÷ 5 leaves 6? Why not?": "÷ 5 માં 6 વધે? કેમ નહીં?",
    "A child divides a number by 5 and says the remainder is 6. How do you know straight away that this cannot be right?": "એક બાળક કોઈ સંખ્યાને 5 વડે ભાગીને કહે છે કે શેષ 6 છે. તમે તરત કેવી રીતે જાણો કે આ સાચું ન હોઈ શકે?",
    "Compare the dish with the plates.": "વાટકીની સરખામણી પ્લેટ સાથે કરો.",
    "6 is more than 5": "6, 5 કરતાં વધારે છે",
    "6 is even": "6 બેકી છે",
    "it must be 0": "તે 0 હોવી જોઈએ",
    "5 is odd": "5 એકી છે",
    "Dividing by one, by itself and by zero": "એકથી, પોતાનાથી અને શૂન્યથી ભાગાકાર",
    "Try one plate. Now as many plates as counters. Now no plates at all.": "એક પ્લેટ લઈને જુઓ. હવે ગોટીઓ જેટલી પ્લેટ. હવે એક પણ પ્લેટ નહીં.",
    "Where would the first counter go?": "પહેલી ગોટી ક્યાં જશે?",
    "Name the rule for one plate, for as many plates as counters, and for no plates.": "એક પ્લેટ, ગોટીઓ જેટલી પ્લેટ, અને એક પણ પ્લેટ નહીં: દરેકનો નિયમ કહો.",
    "Dividing by one leaves a number alone. A number other than zero divided by itself is one. Dividing by zero is not possible.": "એકથી ભાગતાં સંખ્યા એ જ રહે છે. શૂન્ય સિવાયની સંખ્યાને પોતાનાથી ભાગતાં એક મળે છે. શૂન્યથી ભાગાકાર શક્ય નથી.",
    "You learned: 34 ÷ 1 = 34, 34 ÷ 34 = 1, and 34 ÷ 0 is not possible.": "તમે શીખ્યા: 34 ÷ 1 = 34, 34 ÷ 34 = 1, અને 34 ÷ 0 શક્ય નથી.",
    "not possible": "શક્ય નથી",
    "Work out 34 divided by 1, 34 divided by 34, and 0 divided by 34. Then say what 34 divided by 0 is.": "34 ÷ 1, 34 ÷ 34 અને 0 ÷ 34 શોધો. પછી કહો કે 34 ÷ 0 શું છે.",
    "Turn the dial to no plates in your head. Is there anywhere to deal?": "મનમાં વિચારો કે એક પણ પ્લેટ નથી. વહેંચવાની કોઈ જગ્યા છે?",
    "Fill in the blanks": "ખાલી જગ્યા પૂરો",
    "Fill in the blanks for 527. Divide it by 1, then by itself, and divide 0 by it.": "527 માટે ખાલી જગ્યા પૂરો. તેને 1 વડે ભાગો, પછી પોતાનાથી, અને 0 ને તેનાથી ભાગો.",
    "Which rule fits each line: one plate, as many plates as counters, or an empty tray?": "દરેક લીટીમાં કયો નિયમ લાગે: એક પ્લેટ, ગોટીઓ જેટલી પ્લેટ, કે ખાલી ટ્રે?",
    "Is zero divided by zero equal to one, to zero, or not possible? Say which rule decides it.": "શૂન્ય ભાગ્યા શૂન્ય એક છે, શૂન્ય છે, કે શક્ય નથી? કહો કયો નિયમ એ નક્કી કરે છે.",
    "With no plates, where would a share go?": "એક પણ પ્લેટ ન હોય, તો ભાગ ક્યાં જાય?",
    /* the bench's own words */
    "dividend": "ભાજ્ય", "divisor": "ભાજક", "quotient": "ભાગફળ", "remainder": "શેષ",
    "rows": "હાર", "in a row": "એક હારમાં", "take": "વાર", "takes": "વાર", "heap": "ઢગલો", "plates": "પ્લેટ",
    "left over": "વધ્યા", "round": "ફેરો", "rounds": "ફેરા", "empty tray": "ખાલી ટ્રે",
    "nowhere to put shares": "ભાગ મૂકવાની જગ્યા નથી", "Into the dish": "વાટકીમાં મૂકો", "Deal a round": "એક ફેરો વહેંચો",
    "Put the rest in the dish": "બાકીનું વાટકીમાં મૂકો", "Check it": "ચકાસો", "a number ÷ itself": "સંખ્યા ÷ એ જ સંખ્યા",
    "0 ÷ a number": "0 ÷ કોઈ સંખ્યા", "not for 0": "0 માટે નહીં", "Turn the card": "કાર્ડ ફેરવો",
    "Take 12 from the heap": "ઢગલામાંથી 12 ઉપાડો", "Close the dish": "વાટકી બંધ કરો", "One less in the heap": "ઢગલામાં એક ઓછો",
    "One more in the heap": "ઢગલામાં એક વધુ", "One plate fewer": "એક પ્લેટ ઓછી", "One more plate": "એક પ્લેટ વધુ",
    /* the summary page's little drawings (Thumb) */
    "7 takes of 12": "12 ના 7 વાર", "remainder 1": "શેષ 1", "remainder 2": "શેષ 2", "remainder 8": "શેષ 8",
    "dividend 95": "ભાજ્ય 95", "divisor 8": "ભાજક 8", "÷ 5 leaves 6?": "÷ 5 માં 6 વધે?",
  },
};

/* ── the bench: the chapter's own colours and fixed places (working-area units) ─────────── */
const BLUE = CONTENT.hundred;  /* the dividend: the heap being shared, and any total */
const AMBER = CONTENT.ten;     /* the divisor: the plates */
const GREEN = CONTENT.one;     /* the quotient: each plate's share */
const VERM = CONTENT.pointer;  /* what is left over */
/* coloured numerals take a deeper ink (amber needs more of it to read at 4.5:1 on white) */
const inkOf = (c: string) => shade(c, c === AMBER ? 0.38 : 0.25);
const BX = {
  tray: { x: 0, y: 0, w: 300, h: 300 },
  plates: { x: 330, y: 0, w: 510, h: 300 },
  dial: { x: 330, y: 318, w: 510, h: 72 },
  dish: { x: 860, y: 0, w: 226, h: 196 },
};
const DISH = { cx: 973, cy: 116 };
const DEAL_KEY = { x: 860, y: 214, w: 226, h: 72 };
const TAGS = ["dividend", "divisor", "quotient", "remainder"];
const TARGETS = ["heap", "plates", "share", "dish"];
const CASES = ["one", "self", "empty", "none"];

/* the tray lays its counters in rows of ten; a take lands as a row of twelve on the bench */
const trayAt = (i: number) => ({ x: 24 + (i % 10) * 28, y: 24 + Math.floor(i / 10) * 28 });
const takeAt = (t: number, j: number) => ({ x: 390 + j * 28, y: 26 + t * 40 });
/* the plates: up to five in a row, then two rows, then rows of ten; every plate on one deal the same size */
const plateSpots = (n: number) => {
  if (n <= 0) return [];
  const cols = n <= 5 ? n : n <= 10 ? Math.ceil(n / 2) : 10, rows = Math.ceil(n / cols);
  const cw = BX.plates.w / cols, ch = BX.plates.h / rows;
  const R = Math.min(cw * 0.42, (ch - 34) * 0.46, n === 1 ? 118 : 64);
  return Array.from({ length: n }, (_, i) => {
    const r = Math.floor(i / cols), c = i % cols, inRow = r === rows - 1 ? n - r * cols : cols;
    return { x: BX.plates.x + (BX.plates.w - inRow * cw) / 2 + (c + 0.5) * cw, y: BX.plates.y + r * ch + (ch - 34) / 2, R };
  });
};
/* one plate's counters, in a small square, inside the rim */
const onPlate = (R: number, k: number) => {
  if (k <= 0) return [];
  const cols = Math.max(1, Math.ceil(Math.sqrt(k))), rows = Math.ceil(k / cols);
  const pitch = Math.min(24, (R * 1.3) / Math.max(cols, rows));
  return Array.from({ length: k }, (_, i) => ({ dx: ((i % cols) - (cols - 1) / 2) * pitch, dy: (Math.floor(i / cols) - (rows - 1) / 2) * pitch, r: pitch * 0.42 }));
};
const dishAt = (i: number, total: number) => {
  const cols = 6, rows = Math.max(1, Math.ceil(total / cols)), row = Math.floor(i / cols);
  const inRow = row === rows - 1 ? total - row * cols : cols;
  return { x: DISH.cx + ((i % cols) - (inRow - 1) / 2) * 24, y: DISH.cy + (row - (rows - 1) / 2) * 24 };
};
const plateWord = (p: number) => (p <= 0 ? "no plates" : p === 1 ? "1 plate" : `${p} plates`);

/* what the deal control does next: a round from the tray, the rest into the dish, or one more round
   from a dish that still holds as many as the plates (a leftover that could go round is not a remainder) */
const nextDeal = (b: any) => (b.plates <= 0 ? null : b.tray >= b.plates ? "tray" : b.tray > 0 ? "spill" : b.dish >= b.plates ? "dish" : null);
const afterDeal = (b: any, how: string) => (how === "spill" ? { ...b, tray: 0, dish: b.dish + b.tray }
  : { ...b, [how]: b[how] - b.plates, shares: b.shares.map((s: number) => s + 1), rounds: b.rounds + 1 });
const dealtOut = (b0: any) => { let b = b0; for (let g = 0; g < 400; g++) { const h = nextDeal(b); if (!h) break; b = afterDeal(b, h); } return b; };
const fresh = (heap: number, plates: number) => ({ heap0: heap, tray: heap, plates, shares: Array(Math.max(plates, 0)).fill(0), dish: 0, rounds: 0, takes: 0, rebuilt: null });
/* how each item's bench is laid out when it opens */
const benchOf = (it: any) => {
  const k = it.kind;
  if (k === "stuck" || k === "why") {
    const b = fresh(it.heap || 0, it.plates);
    return { ...b, tray: 0, shares: Array(it.plates).fill(it.dealt), rounds: it.dealt, dish: k === "why" ? it.dish : it.heap - it.dealt * it.plates };
  }
  if (k === "rules") return fresh(it.heap, 1);
  if (k === "zero") return fresh(0, 0);
  if (k === "free") return fresh(23, 4);
  if (k === "facts") return fresh(it.rows * it.per, 0);
  return fresh(it.heap || 0, it.plates || 0);
};
const tagsFrom = (v: any) => {
  const ts = String(Array.isArray(v) ? v.join(" ") : v ?? "").trim().toLowerCase().split(/[\s,|]+/).filter(Boolean);
  if (ts.length !== TAGS.length || ts.some((t) => !TARGETS.includes(t))) return null;
  const o: any = {};
  TAGS.forEach((name, i) => { o[name] = ts[i] === "share" ? { t: "share", k: 0 } : { t: ts[i] }; });
  return o;
};
const tagCode = (o: any) => TAGS.map((name) => (o[name] ? o[name].t : "-")).join(" ");

/* One entry per phase = one mount.
   says    the teach run, said before anything is asked (numbers are turned into words for the voice)
   ladder  rungs 2 and 3 of the hint ladder (rung 1 is each item's own miss line); never the answer
   closing one closing line for this phase, said once when it goes idle
   learned the summary page's row for this phase: "You learned: ..." (at most 72 characters)
   traceback what the working area redraws after a miss, in one line (for the sidecar)
   items   three a phase, all the plan's own questions (qid); kind drives the bench.
           parts [{ label }] with answer [a, b]: one box a part in the slot; typed reads "16|1"
           thumb the summary page's two lines for this answer */
const PHASES = [
  {
    n: 1,
    concept: "One multiplication, two divisions",
    conceptId: "M1.S1.T2.C4", objectiveIds: ["O1"],
    says: ["Read the rows one way. Now turn the card. What does each way divide by?"],
    /* tries, as the plan writes it: first rung the item's miss; second, rows and how many in each; third, turn and count again */
    ladder: ["How many are in each row, and how many rows are there?", "Turn the card and count the rows again."],
    closing: "A multiplication fact with no zero in it gives two division facts, one for each number that was multiplied.",
    learned: "You learned: one multiplication gives two division facts.",
    traceback: "The card turns on its own: the rows light one at a time while their count climbs, and both division facts fill in.",
    items: [
      /* learn ML1: answer in the plan = 117 divided by 13 is 9, and 117 divided by 9 is 13 */
      { qid: "M1.S1.T2.C4:ML1", kind: "facts", rows: 9, per: 13, parts: [{ label: "117 ÷ 13" }, { label: "117 ÷ 9" }], answer: [9, 13], winMs: 4200,
        ask: "Two division facts", say: "9 times 13 is 117. Write the two division facts this one multiplication gives.", miss: "What is the product on the card?",
        thumb: ["117 ÷ 13 = 9", "117 ÷ 9 = 13"] },
      /* practice 1: answer in the plan = 102 divided by 17 is 6, and 102 divided by 6 is 17 */
      { qid: "M1.S1.T2.C4:1", kind: "facts", rows: 6, per: 17, parts: [{ label: "102 ÷ 17" }, { label: "102 ÷ 6" }], answer: [6, 17], winMs: 4200,
        ask: "Two division facts", say: "6 times 17 is 102. Write both division facts it gives.", miss: "Count 17 in each row. How many rows make 102?",
        thumb: ["102 ÷ 17 = 6", "102 ÷ 6 = 17"] },
      /* practice 2: answer in the plan = 7 times, which shows that 84 divided by 12 is 7 */
      { qid: "M1.S1.T2.C4:2", kind: "takes", heap: 84, take: 12, answer: 7, winMs: 2800,
        ask: "How many takes of 12?", say: "Take 12 away from 84 again and again until nothing is left. How many times did you take it away, and what division does that show?",
        miss: "Each take lifts 12 off the heap. How many takes empty the tray?", thumb: ["84 ÷ 12 = 7", "7 takes of 12"] },
    ],
  },
  {
    n: 2,
    concept: "Naming the four numbers",
    conceptId: "M1.S1.T2.C5", objectiveIds: ["O1"],
    says: ["Deal one to every plate each round, until a round cannot go."],
    /* tries, as the plan writes it: which number is shared; into how many parts; then say each of the four */
    ladder: ["Into how many parts is it shared?", "Say what is shared, into how many parts, how many each, and what is left."],
    closing: "The dividend is shared by the divisor, the quotient is each share, and the remainder is what is left.",
    learned: "You learned: dividend, divisor, quotient and remainder.",
    traceback: "The heap is dealt a round at a time; the heap, the plates, one plate and the dish light in turn, and each number settles over its name.",
    items: [
      /* learn ML2: answer in the plan = The dividend is 79, the divisor is 6, the quotient is 13 and the remainder is 1.
         Made on the bench: the four tags dropped on the heap, the plates, one plate's share and the dish */
      { qid: "M1.S1.T2.C5:ML2", kind: "tags", heap: 79, plates: 6, pad: "enter", answer: "heap plates share dish", winMs: 3600,
        ask: "Deal, then tag all four", say: "79 marbles are shared equally among 6 bags. Name the dividend, the divisor, the quotient and the remainder.",
        miss: "Which number is being shared?", thumb: ["79 ÷ 6 = 13", "remainder 1"] },
      /* practice 3: answer in the plan = 95 is the dividend and 8 is the divisor */
      { qid: "M1.S1.T2.C5:3", kind: "name2", heap: 95, plates: 8, parts: [{ label: "dividend" }, { label: "divisor" }], answer: [95, 8], winMs: 2800,
        ask: "95 ÷ 8: which is which?", say: "In 95 divided by 8, which number is the dividend and which is the divisor?",
        miss: "Which one is dealt out, and which one says how many plates?", thumb: ["dividend 95", "divisor 8"] },
      /* practice 4: answer in the plan = The quotient is 16, the seeds in each pot, and the remainder is 1, the seed left over */
      { qid: "M1.S1.T2.C5:4", kind: "share", heap: 65, plates: 4, parts: [{ label: "quotient" }, { label: "remainder" }], answer: [16, 1], winMs: 4200,
        ask: "65 seeds, 4 pots", say: "65 seeds are planted equally in 4 pots. Find the quotient and the remainder, and say what each one means.",
        miss: "Deal a seed to every pot each round. How many rounds go?", thumb: ["65 ÷ 4 = 16", "remainder 1"] },
    ],
  },
  {
    n: 3,
    concept: "Why the remainder stays small",
    conceptId: "M1.S1.T2.C6", objectiveIds: ["O2"],
    says: ["Look at the dish. Could every plate still take one more?"],
    /* tries, as the plan writes it: how many in the dish; how many plates; then decide whether to deal again */
    ladder: ["How many plates are there?", "If the dish holds as many as the plates, deal one more round."],
    closing: "The remainder is always smaller than the divisor. Divisor times quotient, add the remainder, gives back the dividend.",
    learned: "You learned: the remainder is always smaller than the divisor.",
    traceback: "Every plate lights with a dish counter to match, one more round is dealt from the dish, the lid closes, and the check bar rebuilds the heap.",
    items: [
      /* learn ML3: answer in the plan = 9 left over is too many, because 7 of them could give every friend one more. The answer is 8 each, with 2 left over */
      { qid: "M1.S1.T2.C6:ML3", kind: "stuck", heap: 58, plates: 7, dealt: 7, child: [7, 9], parts: [{ label: "quotient" }, { label: "remainder" }], answer: [8, 2], winMs: 4400,
        ask: "58 among 7 friends", say: "A child shares 58 stickers among 7 friends, gives 7 each, and says 9 are left over. What is the mistake, and what is the right answer?",
        miss: "How many counters are in the dish?", thumb: ["58 ÷ 7 = 8", "remainder 2"] },
      /* practice 5: answer in the plan = 7 remainder 8, and 9 times 7 is 63, add 8 makes 71 */
      { qid: "M1.S1.T2.C6:5", kind: "check", heap: 71, plates: 9, parts: [{ label: "quotient" }, { label: "remainder" }], answer: [7, 8], winMs: 4800,
        ask: "71 ÷ 9", say: "Find the quotient and remainder of 71 divided by 9, and check the answer by multiplying back.",
        miss: "Multiply back, then add what is left over. Does it make 71?", thumb: ["71 ÷ 9 = 7", "remainder 8"] },
      /* practice 6: answer in the plan = The remainder must be smaller than the divisor, and 6 is not smaller than 5, so one more 5 could still be shared out */
      { qid: "M1.S1.T2.C6:6", kind: "why", plates: 5, dealt: 3, dish: 6, answer: "6 > 5", winMs: 3400,
        choices: [{ id: "6 > 5", label: "6 is more than 5" }, { id: "6 is even", label: "6 is even" }, { id: "it must be 0", label: "it must be 0" }, { id: "5 is odd", label: "5 is odd" }],
        ask: "÷ 5 leaves 6? Why not?", say: "A child divides a number by 5 and says the remainder is 6. How do you know straight away that this cannot be right?",
        miss: "Compare the dish with the plates.", thumb: ["÷ 5 leaves 6?", "6 > 5"] },
    ],
  },
  {
    n: 4,
    concept: "Dividing by one, by itself and by zero",
    conceptId: "M1.S1.T2.C7", objectiveIds: ["O2"],
    says: ["Try one plate. Now as many plates as counters. Now no plates at all."],
    /* tries, as the plan writes it: how many plates the dial set; where the first counter would go; each case in turn */
    ladder: ["Where would the first counter go?", "Name the rule for one plate, for as many plates as counters, and for no plates."],
    closing: "Dividing by one leaves a number alone. A number other than zero divided by itself is one. Dividing by zero is not possible.",
    learned: "You learned: 34 ÷ 1 = 34, 34 ÷ 34 = 1, and 34 ÷ 0 is not possible.",
    traceback: "Each case is dealt again; with no plates the deal never starts, the stage says there is nowhere to put a share, and no number appears.",
    items: [
      /* learn ML4: answer in the plan = 34 divided by 1 is 34, 34 divided by 34 is 1, 0 divided by 34 is 0, and 34 divided by 0 is not possible.
         The rule bay deals the first three on the bench; the child names the fourth */
      { qid: "M1.S1.T2.C7:ML4", kind: "rules", heap: 34, answer: "not possible", winMs: 2800,
        choices: [{ id: "0", label: "0" }, { id: "1", label: "1" }, { id: "34", label: "34" }, { id: "not possible", label: "not possible" }],
        ask: "34 ÷ 0 = ?", say: "Work out 34 divided by 1, 34 divided by 34, and 0 divided by 34. Then say what 34 divided by 0 is.",
        miss: "Turn the dial to no plates in your head. Is there anywhere to deal?", thumb: ["34 ÷ 0", "not possible"] },
      /* practice 7: answer in the plan = 527, then 1, then 0, and the last is not possible (the last blank is written in by the bench) */
      { qid: "M1.S1.T2.C7:7", kind: "blanks", n: 527, parts: [{ label: "÷ 1" }, { label: "÷ 527" }, { label: "0 ÷" }], answer: [527, 1, 0], winMs: 3600,
        ask: "Fill in the blanks", say: "Fill in the blanks for 527. Divide it by 1, then by itself, and divide 0 by it.",
        miss: "Which rule fits each line: one plate, as many plates as counters, or an empty tray?", thumb: ["527 ÷ 527 = 1", "0 ÷ 527 = 0"] },
      /* practice 8: answer in the plan = Not possible. Dividing by zero is not possible for any number, zero included. The rules that give one and zero hold only when the divisor is other than zero */
      { qid: "M1.S1.T2.C7:8", kind: "zero", answer: "not possible", winMs: 2800,
        choices: [{ id: "1", label: "1" }, { id: "0", label: "0" }, { id: "not possible", label: "not possible" }],
        ask: "0 ÷ 0 = ?", say: "Is zero divided by zero equal to one, to zero, or not possible? Say which rule decides it.",
        miss: "With no plates, where would a share go?", thumb: ["0 ÷ 0", "not possible"] },
    ],
  },
];

/* The numbers, rows, sizes and targets the working area needs (they go into the sidecar too). */
const MODEL = {
  colours: { dividend: BLUE, divisor: AMBER, quotient: GREEN, remainder: VERM },
  tray: { perRow: 10, max: 99 }, plates: { perRow: 10, max: 34 }, dish: { perRow: 6 },
  tags: TAGS, tagTargets: TARGETS, ruleBay: ["1 plate", "as many plates as counters", "empty tray", "no plates"],
};

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* judge: two boxes by judgeSlotParts; the tags by where each one lies; numbers as numbers */
const judge = (item: any, v: any) => {
  if (item.parts) return judgeSlotParts(item, v);
  if (item.kind === "tags") return String(v ?? "").trim().toLowerCase().split(/[\s,|]+/).join(" ") === item.answer;
  if (typeof item.answer === "number") return leadNumber(v) === item.answer;
  return String(v ?? "").trim().toLowerCase() === String(item.answer).trim().toLowerCase();
};
/* oracle: every answer re-derived by taking the divisor away again and again (the sharing itself),
   a route that shares no code with judge or the bench, and every number checked against the question */
const takeAway = (a: number, b: number) => { let q = 0, r = a; while (b > 0 && r >= b) { r -= b; q += 1; } return [q, r]; };
const oracle = () => PHASES.every((p: any) => p.items.every((it: any) => {
  const said = (x: any) => new RegExp(`(^|\\D)${x}(\\D|$)`).test(it.say);
  switch (it.kind) {
    case "facts": {
      const prod = it.rows * it.per;
      return said(prod) && said(it.rows) && said(it.per) && it.parts[0].label === `${prod} ÷ ${it.per}` && it.parts[1].label === `${prod} ÷ ${it.rows}`
        && takeAway(prod, it.per)[0] === it.answer[0] && takeAway(prod, it.rows)[0] === it.answer[1] && takeAway(prod, it.per)[1] === 0;
    }
    case "takes": { const [q, r] = takeAway(it.heap, it.take); return r === 0 && q === it.answer && said(it.heap) && said(it.take); }
    case "tags": return it.answer === ["heap", "plates", "share", "dish"].join(" ") && said(it.heap) && said(it.plates);
    case "name2": return it.answer[0] === it.heap && it.answer[1] === it.plates && said(it.heap) && said(it.plates);
    case "share": case "check": case "stuck": {
      const [q, r] = takeAway(it.heap, it.plates);
      const story = it.kind !== "stuck" || (it.child[0] * it.plates + it.child[1] === it.heap && it.child[1] >= it.plates);
      return q === it.answer[0] && r === it.answer[1] && r < it.plates && said(it.heap) && said(it.plates) && story;
    }
    case "why": return it.dish >= it.plates && it.answer === `${it.dish} > ${it.plates}` && said(it.dish) && said(it.plates);
    case "rules": return it.answer === "not possible" && takeAway(it.heap, 1)[0] === it.heap && takeAway(it.heap, it.heap)[0] === 1 && takeAway(0, it.heap)[0] === 0;
    case "blanks": return said(it.n) && it.answer[0] === takeAway(it.n, 1)[0] && it.answer[1] === takeAway(it.n, it.n)[0] && it.answer[2] === takeAway(0, it.n)[0];
    case "zero": return it.answer === "not possible";
  }
  return false;
}));
/* the item's own misconception; judge must reject it */
const nearMiss = (item: any) => {
  switch (item.kind) {
    case "facts": return [item.answer[0], item.answer[0]].join("|");               /* one division written twice: undone one way only */
    case "takes": return item.take;                                                 /* twelve: the size of a take, not how many takes */
    case "tags": return "heap share plates dish";                                   /* the smaller number (the plates) called the quotient */
    case "name2": return [item.plates, item.heap].join("|");                        /* the two swapped */
    case "share": return [item.plates, item.answer[1]].join("|");                   /* the divisor called the quotient */
    case "stuck": return item.child.join("|");                                      /* 7 each, 9 left: the leftover could still go round */
    case "check": return [item.answer[0], 0].join("|");                             /* the dish left out: plates times share taken for the whole heap */
    case "why": return "it must be 0";                                             /* a division must leave nothing */
    case "rules": return "0";                                                       /* nothing handed out, so zero */
    case "blanks": return "1|1|0";                                                  /* dividing by one read as dividing by itself */
    case "zero": return "1";                                                        /* read as a number divided by itself */
  }
  return "~";
};
/* the forms of an answer that no question, hint or ladder line may print */
const answerForms = (item: any) => {
  switch (item.kind) {
    case "facts": case "name2": case "blanks": return [];   /* the numbers are the question itself: the answer is which goes where */
    case "tags": return [];                                 /* the four names are the question's own words */
    case "zero": return [];                                 /* the question reads out its three choices */
    case "takes": return [String(item.answer), words(item.answer)];
    case "share": case "stuck": case "check": return item.answer.filter((x: number) => x >= 10).flatMap((x: number) => [String(x), indian(x), words(x)]);
  }
  const c = (item.choices || []).find((x: any) => x.id === item.answer);
  return [String(item.answer), ...(c && c.label !== item.answer ? [c.label] : [])];
};
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => item.answer;
/* the slot shows a tag answer as nothing: the answer is the tags on the bench */
const format = (v: any, k?: number) => (k === undefined && /^(heap|plates|share|dish|-)(\s|$)/.test(String(v ?? "")) ? "" : v);

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => {
  if (item.kind === "tags" && HOOK.set) { HOOK.set(item.answer); setTimeout(() => HOOK.enter && HOOK.enter(), 60); return; }
  return T.submit(item.answer);
};
/* the agent's answer() for the tags: they are dropped as a child would drop them; undefined = type it */
const answer = (item: any, v: any) => (item.kind === "tags" && HOOK.set ? HOOK.set(v) : undefined);
/* the agent's check() before Enter: nothing waits on the bench, so Enter */
const check = () => undefined;

const SB_CSS = `
.sb-fly{transition:transform 430ms cubic-bezier(.3,.7,.25,1)}
.sb-turn{transition:transform 820ms cubic-bezier(.45,.1,.25,1)}
.sb-lid{transition:transform 380ms ease}
.sb-wob{transform-box:fill-box;transform-origin:0% 100%;animation:sbWob 460ms ease-in-out 2}
@keyframes sbWob{0%,100%{transform:rotate(0)}30%{transform:rotate(-5deg)}70%{transform:rotate(3deg)}}
.sb-in{animation:sbIn 420ms ease-out both}
@keyframes sbIn{from{opacity:0}to{opacity:1}}
.sb-grab{cursor:grab}
@media (prefers-reduced-motion:reduce){.sb-fly,.sb-turn,.sb-lid{transition:none}.sb-wob,.sb-in{animation:none}}
`;

/* a name tag: a luggage label, all four alike (a colour would match it to its thing and answer for the child) */
function SbTag({ x, y, name, C, lifted }: any) {
  return (
    <g transform={`translate(${x},${y - (lifted ? 8 : 0)})`} filter={lifted ? "url(#fLift)" : "url(#fShadowSoft)"}>
      <path d="M 20 0 H 184 V 72 H 20 L 0 36 Z" fill="#FFFFFF" stroke={C.ink} strokeWidth={2.5} strokeLinejoin="round" />
      <circle cx={20} cy={36} r={6} fill={C.paper} stroke={C.ink} strokeWidth={2} />
      <text x={108} y={46} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={C.ink}>{name}</text>
    </g>
  );
}
const railAt = (k: number) => ({ x: 126 + k * 196, y: 476 });

/* ── the working area: 1086 x 528, origin at its top-left ──────────────────────────────────── */
function Work({ phase, item, index, stage, wrong, part, api, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  /* a count of plates in the language in use (English: plateWord) */
  const plateW = (p: number) => (lang === "hi" ? (p <= 0 ? "कोई प्लेट नहीं" : p === 1 ? "1 प्लेट" : `${p} प्लेटें`)
    : lang === "gu" ? (p <= 0 ? "કોઈ પ્લેટ નહીં" : `${p} પ્લેટ`) : plateWord(p));
  const tl = useTimeline();
  const free = stage === "free";
  const [cfg, setCfg] = useState<any>(() => phase.items[0]);
  const kind = cfg.kind;
  const [bench, setBenchS] = useState<any>(() => benchOf(phase.items[0]));
  const benchRef = useRef<any>(bench);
  const setBench = (b: any) => { benchRef.current = b; setBenchS(b); };
  const pend = useRef<any>(null);                     /* the bench a flight will land on */
  const [fly, setFly] = useState<any>(null);          /* counters in flight */
  const [turned, setTurned] = useState(false);        /* the fact card, a quarter turn round */
  const [rowLit, setRowLit] = useState(-1);
  const [rowsRun, setRowsRun] = useState<any>(null);  /* rows counted so far in a traceback */
  const [lineLit, setLineLit] = useState<any>(null);  /* the line being written (else the caret's box) */
  const [shown, setShown] = useState<any>({});        /* what is written on the bench: results and rule cases */
  const [tags, setTagsS] = useState<any>({});
  const tagsRef = useRef<any>({});
  const setTags = (t: any) => { tagsRef.current = t; setTagsS(t); };
  const [lit, setLit] = useState<any>({});
  const [names, setNames] = useState<any>(null);      /* the four numbers settled over their names */
  const [cb, setCb] = useState<any>(null);            /* the check bar */
  const [note, setNote] = useState<any>(null);        /* nowhere to put shares, or 6 > 5 */
  const [wob, setWob] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [touched, setTouched] = useState<any>({});
  const touch = (k: string) => setTouched((t: any) => (t[k] ? t : { ...t, [k]: true }));
  const setupFor = useRef(0);
  const busy = tl.busy;
  const asking = stage === "ask" && !busy;

  const flush = () => { if (pend.current) { setBench(pend.current); pend.current = null; } setFly(null); };
  const play = (steps: any[], done?: () => void) => { flush(); tl.run(steps, done); };

  const setup = (it: any) => {
    tl.stop(); pend.current = null;
    setCfg(it); setBench(benchOf(it)); setFly(null); setTurned(false); setRowLit(-1); setRowsRun(null); setLineLit(null);
    setShown({}); setTags({}); setLit({}); setNames(null); setCb(null); setNote(null); setRevealed(false); setTouched({});
    api.lock(false);
  };
  useEffect(() => { if (stage === "ask" && setupFor.current !== index) { setupFor.current = index; setup(item); } }, [stage, index]);
  useEffect(() => { if (free) { setupFor.current = -2; setup({ kind: "free" }); } }, [free]);
  /* the card turns with the box being typed into: the first division reads the rows, the second the turned card */
  useEffect(() => { if (kind === "facts" && stage === "ask" && !busy) setTurned(part === 1); }, [part]);

  /* ── motions, built from a simulated bench so a long run stays exact ── */
  const dealSteps = (b: any, how: string, anim: boolean, fastMs = 90) => {
    const nb = afterDeal(b, how);
    if (!anim) return [[fastMs, () => { setBench(nb); api.sfx.tick(); }]];
    const spots = plateSpots(b.plates);
    let from: any[], to: any[], mid: any, paint = "gHundred";
    if (how === "spill") {
      mid = { ...b, tray: 0 };
      from = Array.from({ length: b.tray }, (_, i) => trayAt(i));
      to = Array.from({ length: b.tray }, (_, i) => dishAt(b.dish + i, b.dish + b.tray));
    } else {
      mid = { ...b, [how]: b[how] - b.plates };
      from = spots.map((_, k) => (how === "tray" ? trayAt(b.tray - 1 - k) : dishAt(b.dish - 1 - k, b.dish)));
      to = spots.map((p, k) => { const q = onPlate(p.R, b.shares[k] + 1)[b.shares[k]]; return { x: p.x + q.dx, y: p.y + q.dy }; });
      if (how === "dish") paint = "gPointer";
    }
    return [
      [30, () => { pend.current = nb; setBench(mid); setFly(from.map((p) => ({ ...p, paint }))); }],
      [40, () => setFly(to.map((p) => ({ ...p, paint })))],
      [450, () => { setFly(null); setBench(nb); pend.current = null; api.sfx.tick(); }],
    ];
  };
  const dealAllSteps = (b0: any, animFirst: number, fastMs: number) => {
    let b = b0, k = 0;
    const S: any[] = [];
    for (let g = 0; g < 400; g++) {
      const h = nextDeal(b);
      if (!h) break;
      S.push(...dealSteps(b, h, k < animFirst || h !== "tray", fastMs));
      b = afterDeal(b, h); k += 1;
    }
    return { S, b };
  };
  const takeSteps = (b: any, anim: boolean) => {
    const k = cfg.take, nb = { ...b, tray: b.tray - k, takes: b.takes + 1 };
    if (!anim) return [[140, () => { setBench(nb); api.sfx.tick(); }]];
    const from = Array.from({ length: k }, (_, j) => trayAt(b.tray - k + j));
    const to = Array.from({ length: k }, (_, j) => takeAt(b.takes, j));
    return [
      [30, () => { pend.current = nb; setBench({ ...b, tray: b.tray - k }); setFly(from.map((p) => ({ ...p, paint: "gHundred" }))); }],
      [40, () => setFly(to.map((p) => ({ ...p, paint: "gHundred" })))],
      [470, () => { setFly(null); setBench(nb); pend.current = null; api.sfx.tick(); }],
    ];
  };
  /* the check bar: plates times one plate's share, rebuilt in rows of ten in the tray, then the dish added */
  const checkSteps = (b: any, slow: number) => {
    const q = b.shares[0] || 0, p = b.plates, r = b.dish, g = p * q, S: any[] = [];
    const ms = (x: number) => Math.round(x * slow);
    S.push([60, () => { setCb({ p, q, r, step: 1 }); setBench({ ...benchRef.current, rebuilt: { g: 0, v: 0 } }); }], [ms(500), () => {}]);
    const chunks: number[] = [];
    for (let t = 10; t < g; t += 10) chunks.push(t);
    chunks.push(g);
    chunks.forEach((t) => S.push([ms(170), () => { setBench({ ...benchRef.current, rebuilt: { g: t, v: 0 } }); api.sfx.tick(); }]));
    S.push([ms(300), () => setCb({ p, q, r, step: 2 })], [ms(slow >= 1 ? 1300 : 700), () => {}]);
    S.push([60, () => setCb({ p, q, r, step: 3 })], [ms(450), () => { setBench({ ...benchRef.current, rebuilt: { g, v: r } }); api.sfx.tick(); }]);
    S.push([ms(500), () => setCb({ p, q, r, step: 4 })], [ms(500), () => {}]);
    return S;
  };
  const colsOf = (b: any) => [
    { n: b.heap0, name: "dividend", c: BLUE, at: "heap" },
    { n: b.plates, name: "divisor", c: AMBER, at: "dial" },
    { n: b.shares[0] || 0, name: "quotient", c: GREEN, at: "plate" },
    { n: b.dish, name: "remainder", c: VERM, at: "dish" },
  ];
  const namingSteps = (count: number, slow: number) => {
    const S: any[] = [];
    for (let k = 1; k <= count; k++) {
      const kk = k;
      S.push([Math.round(650 * slow), () => {
        const cols = colsOf(benchRef.current).slice(0, kk), at = cols[kk - 1].at;
        setNames(cols); setLit(at === "plate" ? { plates: [0] } : { [at]: true }); api.sfx.tick();
      }]);
    }
    S.push([Math.round(700 * slow), () => setLit({})]);
    return S;
  };
  const factsSteps = (slow: number) => {
    const R = cfg.rows, P = cfg.per, S: any[] = [];
    const ms = (x: number) => Math.round(x * slow);
    S.push([60, () => { setTurned(false); setRowsRun(0); setLineLit(0); }], [ms(900), () => {}]);
    for (let r = 0; r < R; r++) { const j = r; S.push([ms(230), () => { setRowLit(j); setRowsRun(j + 1); }]); }
    S.push([ms(420), () => { setRowLit(-1); setShown((s: any) => ({ ...s, 0: R })); api.sfx.tick(); }]);
    S.push([ms(500), () => { setTurned(true); setRowsRun(0); setLineLit(1); }], [ms(1000), () => {}]);
    for (let c = 0; c < P; c++) { const j = c; S.push([ms(190), () => { setRowLit(j); setRowsRun(j + 1); }]); }
    S.push([ms(420), () => { setRowLit(-1); setRowsRun(null); setShown((s: any) => ({ ...s, 1: P })); api.sfx.tick(); }], [ms(400), () => setLineLit(null)]);
    return S;
  };
  /* the rule bay: one plate, as many plates as counters, an empty tray, no plates at all */
  const caseSteps = (c: string, animFirst: number, gap: number) => {
    const h = cfg.heap, p = c === "one" ? 1 : c === "none" ? 0 : h, e = c === "empty";
    const b0 = fresh(e ? 0 : h, p);
    const S: any[] = [[60, () => { setBench(b0); setNote(p === 0 ? { kind: "caption" } : null); setLit({ dial: true }); }], [gap, () => setLit({})]];
    if (p > 0) S.push(...dealAllSteps(b0, animFirst, 55).S);
    S.push([300, () => setShown((s: any) => ({ ...s, [c]: true }))]);
    return S;
  };
  const cmpNote = { kind: "cmp", a: cfg.dish, b: cfg.plates };

  /* ── the child's controls ── */
  const how = nextDeal(bench);
  const dealKinds = ["tags", "name2", "share", "stuck", "check", "why", "free"];
  const canDeal = (asking || (free && !busy)) && dealKinds.includes(kind) && !!how;
  const deal = () => {
    const b = benchRef.current, h = nextDeal(b);
    if (!canDeal || !h) return;
    touch("deal"); setLit({}); setCb(null); if (kind !== "rules") setNote(null);
    const b1 = b.rebuilt ? { ...b, rebuilt: null } : b;
    if (b1 !== b) setBench(b1);
    play(dealSteps(b1, h, true));
  };
  const lidOpen = !(bench.plates > 0 && bench.tray === 0 && bench.dish < bench.plates && (bench.rounds > 0 || bench.dish > 0));
  const lidLive = (asking || (free && !busy)) && ["stuck", "why", "free"].includes(kind) && bench.plates > 0 && bench.dish >= bench.plates;
  const tryLid = () => {
    if (!lidLive) return;
    touch("lid"); setWob((w) => w + 1);
    const p = benchRef.current.plates;
    play([[40, () => setLit({ plates: "all", dish: p })], [1600, () => setLit({})]]);
  };
  const takeLive = asking && kind === "takes" && bench.tray >= cfg.take;
  const takeOne = () => { if (!takeLive) return; touch("take"); play(takeSteps(benchRef.current, true)); };
  const cardLive = asking && kind === "facts";
  const turnCard = () => { if (!cardLive) return; touch("card"); setTurned((v) => !v); api.sfx.tick(); };
  const casesLive = asking && kind === "rules";
  const runCase = (c: string) => { if (!casesLive) return; touch("case"); play(caseSteps(c, 1, 250)); };
  const freeLive = free && !busy;
  const setFree = (heap: number, plates: number) => {
    const b = fresh(Math.min(Math.max(heap, 0), 99), Math.min(Math.max(plates, 0), 20));
    setBench(b); setCb(null); setLit({}); setNote(null); api.sfx.tick();
  };
  const canCheck = freeLive && bench.plates > 0 && bench.tray === 0 && !bench.rebuilt && (bench.rounds > 0 || bench.dish > 0) && bench.dish < bench.plates;
  const runCheck = () => { if (canCheck) play(checkSteps(benchRef.current, 1)); };

  /* the tags: drag one onto the thing it names; a tap (or Enter) moves it on to the next thing */
  const tagsLive = asking && kind === "tags";
  const targetAt = (p: any) => {
    const inR = (r: any) => p.x >= r.x && p.x <= r.x + r.w && p.y >= r.y && p.y <= r.y + r.h;
    if (inR(BX.tray)) return { t: "heap" };
    if (inR(BX.dial)) return { t: "plates" };
    if (inR(BX.dish)) return { t: "dish" };
    const k = plateSpots(benchRef.current.plates).findIndex((s) => Math.hypot(p.x - s.x, p.y - s.y) <= s.R + 24);
    return k >= 0 ? { t: "share", k } : null;
  };
  const placeTag = (name: string, tgt: any) => {
    const ts = { ...tagsRef.current };
    if (tgt) TAGS.forEach((t) => { if (t !== name && ts[t] && ts[t].t === tgt.t) delete ts[t]; }); /* one tag a thing: the other goes back */
    if (tgt) ts[name] = tgt; else delete ts[name];
    setTags(ts); setNames(null); touch("tag"); api.sfx.tick();
  };
  const cycleTag = (name: string) => {
    const ts = tagsRef.current, cur = ts[name] ? TARGETS.indexOf(ts[name].t) : -1;
    for (let s = cur + 1; s <= TARGETS.length; s++) {
      if (s === TARGETS.length) { placeTag(name, null); return; }
      if (!TAGS.some((t) => t !== name && ts[t] && ts[t].t === TARGETS[s])) { placeTag(name, TARGETS[s] === "share" ? { t: "share", k: 0 } : { t: TARGETS[s] }); return; }
    }
  };
  const drag = useDrag((pay: any, p: any, moved: boolean) => {
    if (pay.src === "heap") { if (!moved || p.x > BX.tray.x + BX.tray.w) takeOne(); return; }
    if (pay.src === "tag" && tagsLive) { if (!moved) cycleTag(pay.name); else placeTag(pay.name, targetAt(p)); }
  });

  /* Enter answers the tags once all four lie on the bench */
  const enterFn: any = tagsLive ? () => { const c = tagCode(tagsRef.current); if (!c.includes("-")) api.submit(c); } : null;
  api.onEnter(enterFn);
  HOOK.enter = () => (enterFn ? enterFn() : undefined);
  HOOK.set = (v: any) => {
    if (kind !== "tags" || stage !== "ask") return false;
    const ts = tagsFrom(v);
    if (!ts) return false;
    flush(); tl.stop();
    setBench(dealtOut(benchRef.current)); setTags(ts);
    return true;
  };

  /* ── the win: the maths finishes moving ── */
  useEffect(() => {
    if (stage !== "win") return;
    const b0 = benchRef.current, S: any[] = [[30, () => setRevealed(true)]];
    if (kind === "facts") S.push(...factsSteps(0.45));
    else if (kind === "takes") {
      let b = b0;
      while (b.tray >= cfg.take) { S.push(...takeSteps(b, false)); b = { ...b, tray: b.tray - cfg.take, takes: b.takes + 1 }; }
      S.push([250, () => { setShown({ 0: cfg.answer }); api.sfx.tick(); }]);
    } else if (kind === "tags" || kind === "share") { const r = dealAllSteps(b0, kind === "share" ? 1 : 0, 60); S.push(...r.S, ...namingSteps(4, 0.5)); }
    else if (kind === "name2") S.push([60, () => setTags({ dividend: { t: "heap" }, divisor: { t: "plates" } })], ...namingSteps(2, 0.6));
    else if (kind === "check" || kind === "stuck") { const r = dealAllSteps(b0, 1, 60); S.push(...r.S, ...checkSteps(r.b, 0.45)); }
    else if (kind === "why") { const r = dealAllSteps(b0, 1, 60); S.push(...r.S, [300, () => setNote(cmpNote)]); }
    else if (kind === "rules") S.push(...caseSteps("none", 0, 300));
    else if (kind === "blanks") [0, 1, 2, 3].forEach((k) => S.push([420, () => { setLineLit(k); setShown((s: any) => ({ ...s, [k]: true })); api.sfx.tick(); }]));
    else if (kind === "zero") S.push([300, () => setNote({ kind: "caption" })], [500, () => setLit({ rule: "both" })]);
    play(S);
  }, [stage]);

  /* ── the traceback: the mathematics redrawn in steps, ending on the whole right answer;
     nothing marked, nothing cleared (the child's answer stays in the slot, the tags where they lie) ── */
  useEffect(() => {
    if (!wrong || stage !== "ask") return;
    api.lock(true);
    const b0 = benchRef.current, S: any[] = [[60, () => { setRevealed(true); setCb(null); if (kind !== "rules") setNote(null); setTouched({ card: true, take: true, deal: true, tag: true, lid: true, case: true }); }]];
    if (kind === "facts") S.push(...factsSteps(1));
    else if (kind === "takes") {
      const start = benchOf(cfg);
      S.push([60, () => { setBench(start); setShown({}); }], [500, () => {}]);
      let b = start;
      for (let t = 0; t < cfg.answer; t++) { S.push(...takeSteps(b, true), [260, () => {}]); b = { ...b, tray: b.tray - cfg.take, takes: b.takes + 1 }; }
      S.push([300, () => { setShown({ 0: cfg.answer }); api.sfx.tick(); }], [500, () => {}]);
    } else if (kind === "tags") {
      /* the tags stay where the child dropped them (an agent's typed answer is laid out the same way) */
      const mine = TAGS.every((t) => tagsRef.current[t]) ? tagsRef.current : tagsFrom(wrong.value) || tagsRef.current;
      if (mine !== tagsRef.current) S.push([10, () => setTags(mine)]);
      const r = dealAllSteps(b0, 2, 110);
      S.push(...r.S);
      /* the remainder tag on a plate: the dish's counter is carried there, the plates stand unequal, and it walks back */
      const onPl = mine.remainder && mine.remainder.t === "share" ? mine.remainder.k || 0 : -1;
      if (onPl >= 0 && r.b.dish > 0) {
        const b = r.b, sp = plateSpots(b.plates)[onPl], q = onPlate(sp.R, b.shares[onPl] + 1)[b.shares[onPl]];
        const up = { ...b, dish: b.dish - 1, shares: b.shares.map((s: number, i: number) => (i === onPl ? s + 1 : s)) };
        const from = dishAt(b.dish - 1, b.dish), to = { x: sp.x + q.dx, y: sp.y + q.dy };
        S.push(
          [30, () => { pend.current = up; setBench({ ...b, dish: b.dish - 1 }); setFly([{ ...from, paint: "gPointer" }]); }],
          [40, () => setFly([{ ...to, paint: "gPointer" }])],
          [460, () => { setFly(null); setBench(up); pend.current = null; setLit({ plates: "all" }); api.sfx.tick(); }],
          [1500, () => setLit({ dishAll: true })], [900, () => {}],
          [30, () => { pend.current = b; setBench({ ...b, dish: b.dish - 1 }); setFly([{ ...to, paint: "gPointer" }]); }],
          [40, () => setFly([{ ...from, paint: "gPointer" }])],
          [460, () => { setFly(null); setBench(b); pend.current = null; setLit({}); api.sfx.tick(); }],
        );
      }
      S.push(...namingSteps(4, 1));
    } else if (kind === "name2") {
      S.push([400, () => setLit({ heap: true })], [900, () => {}]);
      if (nextDeal(b0) === "tray") S.push(...dealSteps(b0, "tray", true), [500, () => {}]); /* one round: this is the number being shared */
      S.push([200, () => setTags({ dividend: { t: "heap" }, divisor: { t: "plates" } })], ...namingSteps(2, 1));
    } else if (kind === "share") { const r = dealAllSteps(b0, 2, 130); S.push(...r.S, ...namingSteps(4, 1)); }
    else if (kind === "check") { const r = dealAllSteps(b0, 2, 130); S.push(...r.S, ...checkSteps(r.b, 1)); }
    else if (kind === "stuck" || kind === "why") {
      let b = b0;
      if (nextDeal(b) === "dish") {
        const p = b.plates;
        S.push([60, () => setLit({ plates: "all", dish: p })], [1400, () => {}], ...dealSteps(b, "dish", true), [500, () => setLit({})]);
        b = afterDeal(b, "dish");
      }
      const r = dealAllSteps(b, 1, 130);
      S.push(...r.S);
      if (kind === "stuck") S.push(...checkSteps(r.b, 1));
      else S.push([400, () => setNote(cmpNote)], [600, () => {}]);
    } else if (kind === "rules") {
      ["one", "self", "empty", "none"].forEach((c) => S.push(...caseSteps(c, 1, 300), [400, () => {}]));
    } else if (kind === "blanks") {
      [0, 1, 2, 3].forEach((k) => S.push([750, () => { setLineLit(k); setShown((s: any) => ({ ...s, [k]: true })); api.sfx.tick(); }]));
      S.push([700, () => setLineLit(null)]);
    } else if (kind === "zero") {
      /* both "always" rules are ringed, the one the child's answer leaned on first */
      const first = String(wrong.value) === "0" ? "zero" : "self";
      S.push([500, () => setNote({ kind: "caption" })], [900, () => setLit({ rule: first })], [1100, () => setLit({ rule: "both" })], [700, () => {}]);
    }
    play(S, () => api.lock(false));
  }, [wrong]);

  /* ── what the host and the agent read back (toolApi.getState) ── */
  const asked = ["share", "stuck", "check"].includes(kind);
  const showRounds = free || (!asked && kind !== "why") || revealed || stage === "win" || stage === "idle";
  const showTakes = revealed || stage === "win" || stage === "idle";
  api.share({
    heap: bench.heap0, plates: bench.plates, rounds: showRounds ? bench.rounds : null, leftover: showRounds ? bench.dish : null,
    tags: kind === "tags" ? tagCode(tags) : null, factCard: kind === "facts" ? (turned ? "turned" : "rows") : null,
    ruleCase: kind === "rules" ? CASES.filter((c) => shown[c]) : null, complete: stage === "idle",
  });

  /* ── drawing ── */
  const onBench = !["facts", "takes", "blanks"].includes(kind);
  const spots = plateSpots(bench.plates);
  const labelsOn = showRounds && kind !== "why" && (bench.rounds > 0 || bench.tray < bench.plates);
  const dishLabel = showRounds && bench.dish > 0 && kind !== "why";
  const quiet = mix(C.ink, C.panel, 0.5);
  const dragging = drag.drag && drag.drag.moved ? drag.drag.payload : null;
  const heapOut = dragging && dragging.src === "heap" ? cfg.take : 0;
  const lineOn = (k: number) => (lineLit !== null ? lineLit === k : stage === "ask" && part === k);
  const DEAL_INV = { x: DEAL_KEY.x + DEAL_KEY.w / 2, y: DEAL_KEY.y + 36, r: 60 };
  const invite = (() => {
    if (stage !== "ask" || busy) return null;
    if (kind === "facts") return touched.card ? null : { x: 220, y: 232, r: 100 };
    if (kind === "takes") return touched.take ? null : { x: 150, y: 150, r: 100 };
    if (kind === "tags") {
      if (how) return touched.deal ? null : DEAL_INV;
      const k = TAGS.findIndex((t) => !tags[t]);
      return k < 0 || touched.tag ? null : { ...railAt(k), r: 64 };
    }
    if (kind === "share" || kind === "check") return touched.deal || !how ? null : DEAL_INV;
    if (kind === "stuck" || kind === "why") return lidLive && !touched.lid ? { x: DISH.cx, y: 104, r: 84 } : !touched.deal && how ? DEAL_INV : null;
    if (kind === "rules") return touched.case ? null : { x: 973, y: 76, r: 60 };
    return null;
  })();

  /* the running count: rounds dealt against the heap (rows on the fact card; takes on the heap of 84) */
  const runItems: any[] = (() => {
    if (kind === "facts") {
      const rows = turned ? cfg.per : cfg.rows, per = turned ? cfg.rows : cfg.per;
      return [{ n: rowsRun !== null ? rowsRun : rows, w: "rows" }, { n: per, w: "in a row", end: true }];
    }
    if (kind === "takes") return [showTakes ? { n: bench.takes, w: bench.takes === 1 ? "take" : "takes" } : null, { n: cfg.heap, w: "heap", pre: true, end: true }];
    if (kind === "why") return [{ n: bench.plates, w: "plates" }, { n: bench.dish, w: "left over", end: true }];
    if (kind === "blanks") return [null, { n: cfg.n, w: "heap", pre: true, end: true }];
    return [showRounds ? { n: bench.rounds, w: bench.rounds === 1 ? "round" : "rounds" } : null, { n: bench.heap0 ?? 0, w: "heap", pre: true, end: true }];
  })();
  const num = (v: any) => (typeof v === "number" && v >= 1000 ? indian(v) : String(v));

  const card = kind === "facts" && (() => {
    const R = cfg.rows, P = cfg.per, s = Math.min(32, 400 / Math.max(R, P)), cx = 220, cy = 232;
    const at = (r: number, c: number) => ({ x: cx + (c - (P - 1) / 2) * s, y: cy + (r - (R - 1) / 2) * s });
    const rot = `translate(${cx}px,${cy}px) rotate(${turned ? 90 : 0}deg) translate(${-cx}px,${-cy}px)`;
    const band = rowLit < 0 ? null : turned
      ? { x: at(0, rowLit).x - s / 2, y: at(0, 0).y - s / 2, w: s, h: R * s }
      : { x: at(0, 0).x - s / 2, y: at(rowLit, 0).y - s / 2, w: P * s, h: s };
    return (
      <g>
        <rect x={0} y={12} width={440} height={440} rx={RAD.card} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} filter="url(#fShadowSoft)" />
        <g className="sb-turn" style={{ transform: rot } as any}>
          {band && <rect x={band.x - 3} y={band.y - 3} width={band.w + 6} height={band.h + 6} rx={s / 2} fill={tint(AMBER, 0.7)} stroke={AMBER} strokeWidth={3} />}
          <g filter="url(#fShadowSoft)">
            {Array.from({ length: R * P }).map((_, i) => { const p = at(Math.floor(i / P), i % P); return <Disc key={i} x={p.x} y={p.y} r={s * 0.38} paint="gHundred" flat />; })}
          </g>
        </g>
        <text x={250} y={506} textAnchor="end" fontSize={T.speech} fontWeight={700} fill={C.ink}>{`${R} × ${P} =`}</text>
        <text x={268} y={506} fontSize={T.speech} fontWeight={700} fill={inkOf(BLUE)}>{R * P}</text>
        {[0, 1].map((k) => {
          const y = 150 + k * 180, on = lineOn(k);
          return (
            <g key={"l" + k}>
              {on && <rect x={492} y={y - 72} width={594} height={126} rx={RAD.panel} fill={tint(C.accent, 0.86)} />}
              <text x={846} y={y + 18} textAnchor="end" fontSize={T.xl} fontWeight={700} fill={C.ink}>{`${R * P} ÷ ${k === 0 ? P : R} =`}</text>
              <rect x={866} y={y - 48} width={150} height={92} rx={16} fill="#FFFFFF" stroke={on ? C.accent : C.rule} strokeWidth={on ? 4 : 2} />
              {shown[k] !== undefined && <text x={941} y={y + 18} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={inkOf(GREEN)}>{shown[k]}</text>}
            </g>
          );
        })}
        {cardLive && <Hit id="card" label={tx("Turn the card")} x={0} y={12} w={440} h={440} onPress={turnCard} />}
      </g>
    );
  })();

  return (
    <g>
      <style>{SB_CSS}</style>

      {/* the running count, in the runs zone (64,108) */}
      <g data-zone="runs">
        <rect x={0} y={-94} width={330} height={76} rx={RAD.panel} fill="url(#gPanel)" stroke={C.rule} strokeWidth={2} />
        {runItems.map((r, k) => r && (
          <text key={k} x={r.end ? 312 : 18} y={-42} textAnchor={r.end ? "end" : "start"} fontSize={T.micro} fontWeight={500} fill={C.ink}>
            {r.pre
              ? [<tspan key="w">{tx(r.w) + " "}</tspan>, <tspan key="n" fontSize={T.prompt} fontWeight={700}>{num(r.n)}</tspan>]
              : [<tspan key="n" fontSize={T.prompt} fontWeight={700}>{num(r.n)}</tspan>, <tspan key="w">{" " + tx(r.w)}</tspan>]}
          </text>
        ))}
      </g>

      {card}

      {/* the tray: the heap in rows of ten (a rebuilt heap comes back into it, green shares then the dish) */}
      {(onBench || kind === "takes") && kind !== "why" && (
        <g>
          <rect x={0} y={0} width={300} height={300} rx={RAD.panel} fill="url(#gPanel)" stroke={lit.heap ? inkOf(BLUE) : C.rule} strokeWidth={lit.heap ? 5 : 2} />
          <g filter="url(#fShadowSoft)">
            {Array.from({ length: Math.max(0, bench.tray - heapOut) }).map((_, i) => { const p = trayAt(i); return <Disc key={"t" + i} x={p.x} y={p.y} r={11} paint="gHundred" flat />; })}
            {bench.rebuilt && Array.from({ length: Math.max(0, (bench.heap0 || 0) - bench.rebuilt.g - bench.rebuilt.v) }).map((_, i) => {
              const p = trayAt(bench.rebuilt.g + bench.rebuilt.v + i); return <circle key={"o" + i} cx={p.x} cy={p.y} r={10} fill="none" stroke={shade(C.rule, 0.2)} strokeWidth={2} strokeDasharray="4 3" />;
            })}
            {bench.rebuilt && Array.from({ length: bench.rebuilt.g + bench.rebuilt.v }).map((_, i) => {
              const p = trayAt(i); return <Disc key={"r" + i} x={p.x} y={p.y} r={11} paint={i < bench.rebuilt.g ? "gOne" : "gPointer"} flat />;
            })}
          </g>
          {takeLive && (
            <g className="sb-grab c4-piece" {...control("heap", tx("Take 12 from the heap"))} {...drag.bind({ src: "heap" })} {...drag.keys({ src: "heap" })}>
              <rect x={0} y={0} width={300} height={300} rx={RAD.panel} fill="transparent" />
            </g>
          )}
        </g>
      )}

      {/* phase 1, the last question: every take lands as a row of twelve, and the division is written beside it */}
      {kind === "takes" && (
        <g>
          <rect x={356} y={0} width={376} height={292} rx={RAD.panel} fill="none" stroke={C.rule} strokeWidth={2.5} strokeDasharray="12 10" />
          {Array.from({ length: bench.takes }).map((_, t) => (
            <g key={"k" + t}>
              <rect x={372} y={8 + t * 40} width={344} height={36} rx={18} fill={tint(AMBER, 0.8)} stroke={AMBER} strokeWidth={2.5} />
              <g filter="url(#fShadowSoft)">{Array.from({ length: cfg.take }).map((__, j) => { const p = takeAt(t, j); return <Disc key={j} x={p.x} y={p.y} r={11} paint="gHundred" flat />; })}</g>
            </g>
          ))}
          <text x={700} y={402} textAnchor="end" fontSize={T.xl} fontWeight={700} fill={C.ink}>{`${cfg.heap} ÷ ${cfg.take} =`}</text>
          <rect x={720} y={340} width={150} height={92} rx={16} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} />
          {shown[0] !== undefined && <text x={795} y={402} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={inkOf(GREEN)}>{shown[0]}</text>}
          {shown[0] !== undefined && (
            <g className="sb-in">
              <text x={700} y={496} textAnchor="end" fontSize={T.speech} fontWeight={700} fill={C.ink}>{`${cfg.answer} × ${cfg.take} =`}</text>
              <text x={718} y={496} fontSize={T.speech} fontWeight={700} fill={inkOf(BLUE)}>{cfg.heap}</text>
            </g>
          )}
        </g>
      )}

      {/* phase 4, the blanks: each line lights while its box has the caret */}
      {kind === "blanks" && [0, 1, 2, 3].map((k) => {
        const N = cfg.n, y = 70 + k * 118, on = lineOn(k);
        if (k === 3 && !shown[3]) return null;
        const lhs = [`${N} ÷ 1 =`, `${N} ÷ ${N} =`, `0 ÷ ${N} =`, `${N} ÷ 0 =`][k];
        return (
          <g key={"b" + k} className={k === 3 ? "sb-in" : ""}>
            {on && <rect x={130} y={y - 56} width={690} height={104} rx={RAD.panel} fill={tint(C.accent, 0.86)} />}
            <text x={600} y={y + 18} textAnchor="end" fontSize={T.xl} fontWeight={700} fill={C.ink}>{lhs}</text>
            {k < 3 && <rect x={620} y={y - 44} width={170} height={84} rx={16} fill="#FFFFFF" stroke={on ? C.accent : C.rule} strokeWidth={on ? 4 : 2} />}
            {k < 3 && (
              <g>
                {k === 0 && <circle cx={880} cy={y} r={26} fill={tint(AMBER, 0.78)} stroke={AMBER} strokeWidth={3} />}
                {k === 1 && [0, 1, 2].map((j) => <circle key={j} cx={858 + j * 22} cy={y} r={10} fill={tint(AMBER, 0.78)} stroke={AMBER} strokeWidth={2.5} />)}
                {k === 2 && <rect x={852} y={y - 24} width={56} height={48} rx={10} fill="url(#gPanel)" stroke={C.rule} strokeWidth={2.5} />}
                <text x={922} y={y + 10} fontSize={T.micro} fontWeight={600} fill={C.ink}>{[plateW(1), plateW(N), tx("empty tray")][k]}</text>
              </g>
            )}
            {shown[k] && (k < 3
              ? <text x={705} y={y + 18} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={inkOf(GREEN)}>{cfg.answer[k]}</text>
              : <text x={622} y={y + 14} fontSize={T.speech} fontWeight={700} fill={C.ink}>{tx("not possible")}</text>)}
          </g>
        );
      })}

      {onBench && (
        <g>
          {/* the plates, in amber; each one's share, in green, printed under it as it settles */}
          {spots.map((s, k) => {
            const cnt = bench.shares[k] || 0, on = lit.plates === "all" || (Array.isArray(lit.plates) && lit.plates.includes(k));
            return (
              <g key={"p" + k}>
                {on && <circle cx={s.x} cy={s.y} r={s.R + 7} fill="none" stroke={inkOf(AMBER)} strokeWidth={5} />}
                <circle cx={s.x} cy={s.y} r={s.R} fill={tint(AMBER, on ? 0.55 : 0.78)} stroke={AMBER} strokeWidth={3.5} />
                <circle cx={s.x} cy={s.y} r={s.R * 0.78} fill={tint(AMBER, 0.9)} stroke={tint(AMBER, 0.45)} strokeWidth={1.5} />
                <g filter="url(#fShadowSoft)">{onPlate(s.R, cnt).map((q, i) => <Disc key={i} x={s.x + q.dx} y={s.y + q.dy} r={q.r} paint="gOne" flat />)}</g>
                {labelsOn && <text x={s.x} y={s.y + s.R + (s.R > 30 ? 32 : 27)} textAnchor="middle" fontSize={s.R > 30 ? T.label : T.micro} fontWeight={700} fill={inkOf(GREEN)}>{cnt}</text>}
              </g>
            );
          })}
          {(note && note.kind === "caption") || (free && bench.plates === 0) || kind === "zero" ? (
            <g>
              <rect x={385} y={90} width={400} height={120} rx={24} fill="#FFFFFF" stroke={C.rule} strokeWidth={3} strokeDasharray="12 10" />
              {((note && note.kind === "caption") || free) && <text className="sb-in" x={585} y={162} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={C.ink}>{tx("nowhere to put shares")}</text>}
            </g>
          ) : null}

          {/* the plate dial */}
          <rect x={BX.dial.x} y={BX.dial.y} width={BX.dial.w} height={BX.dial.h} rx={RAD.panel} fill="#FFFFFF" stroke={lit.dial ? inkOf(AMBER) : C.rule} strokeWidth={lit.dial ? 5 : 2} />
          <text x={free ? 585 : 480} y={366} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={inkOf(AMBER)}>{plateW(bench.plates)}</text>

          {/* the leftover dish, apart from the plates; its lid stays open while it holds as many as the plates
              (not on the rules questions, where the rule bay stands in the right column) */}
          {kind !== "rules" && kind !== "zero" && (<g>
          {lit.dishAll && <path d="M 870 72 Q 876 176 973 176 Q 1070 176 1076 72 Z" fill="none" stroke={inkOf(VERM)} strokeWidth={5} />}
          <path d="M 878 78 Q 884 166 973 166 Q 1062 166 1068 78 Z" fill={tint(VERM, lit.dishAll ? 0.62 : 0.84)} stroke={VERM} strokeWidth={3.5} />
          <g filter="url(#fShadowSoft)">
            {Array.from({ length: bench.dish }).map((_, i) => {
              const p = dishAt(i, bench.dish), on = typeof lit.dish === "number" && i >= bench.dish - lit.dish;
              return (
                <g key={"d" + i}>
                  {on && <circle cx={p.x} cy={p.y} r={13} fill="none" stroke={inkOf(AMBER)} strokeWidth={4} />}
                  <Disc x={p.x} y={p.y} r={9.5} paint="gPointer" flat />
                </g>
              );
            })}
          </g>
          <ellipse cx={DISH.cx} cy={78} rx={95} ry={9} fill="none" stroke={VERM} strokeWidth={3} />
          <g className="sb-lid" style={{ transform: `translate(868px,74px) rotate(${lidOpen ? -14 : 0}deg) translate(-868px,-74px)` } as any}>
            <g key={"w" + wob} className={wob ? "sb-wob" : undefined}>
              <rect x={868} y={58} width={210} height={16} rx={8} fill={tint(VERM, 0.55)} stroke={VERM} strokeWidth={3} />
              <circle cx={DISH.cx} cy={51} r={7} fill={tint(VERM, 0.55)} stroke={VERM} strokeWidth={3} />
            </g>
          </g>
          {dishLabel && <text x={DISH.cx} y={202} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={inkOf(VERM)}>{bench.dish}</text>}
          {lidLive && <Hit id="dish-lid" label={tx("Close the dish")} x={BX.dish.x} y={BX.dish.y} w={BX.dish.w} h={BX.dish.h} onPress={tryLid} />}
          </g>)}

          {/* the deal control (the rule bay stands in its place on the rules question) */}
          {kind !== "rules" && (
            <Key id="deal" label={tx(how === "spill" ? "Put the rest in the dish" : "Deal a round")} x={DEAL_KEY.x} y={DEAL_KEY.y} w={DEAL_KEY.w} h={DEAL_KEY.h} C={C} disabled={!canDeal} onClick={deal}>
              <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={canDeal ? C.ink : quiet}>{tx(how === "spill" ? "Into the dish" : "Deal a round")}</text>
            </Key>
          )}
          {kind === "rules" && CASES.map((c, k) => {
            const label = c === "one" ? plateW(1) : c === "self" ? plateW(cfg.heap) : c === "empty" ? tx("empty tray") : plateW(0);
            return (
              <Key key={c} id={"rule-" + c} label={label} x={860} y={40 + k * 88} w={226} h={72} C={C} disabled={!casesLive} onClick={() => runCase(c)}>
                <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={casesLive ? C.ink : quiet}>{label}</text>
              </Key>
            );
          })}
          {free && (
            <g>
              <text x={150} y={370} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={inkOf(BLUE)}>{bench.heap0}</text>
              {[["heap-less", "One less in the heap", 0, -1, 0], ["heap-more", "One more in the heap", 228, 1, 0], ["plates-less", "One plate fewer", 330, 0, -1], ["plates-more", "One more plate", 768, 0, 1]].map(([id, label, x, dh, dp]: any) => (
                <Key key={id} id={id} label={tx(label)} x={x} y={318} w={72} h={72} C={C} disabled={!freeLive} onClick={() => setFree(benchRef.current.heap0 + dh, benchRef.current.plates + dp)}>
                  <text y={15} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={freeLive ? C.ink : quiet}>{dh + dp > 0 ? "+" : "−"}</text>
                </Key>
              ))}
              <Key id="check-bar" label={tx("Check it")} x={860} y={298} w={226} h={72} C={C} disabled={!canCheck} onClick={runCheck}>
                <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={canCheck ? C.ink : quiet}>{tx("Check it")}</text>
              </Key>
            </g>
          )}
        </g>
      )}

      {/* the foot of the bench: the check bar, the four names, the rule lines, 6 > 5, 0 ÷ 0 */}
      {cb && (
        <g className="sb-in">
          <rect x={0} y={424} width={840} height={100} rx={RAD.panel} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} />
          <text x={300} y={490} textAnchor="end" fontSize={T.speech} fontWeight={700} fill={C.ink}>
            <tspan fill={inkOf(AMBER)}>{cb.p}</tspan>{" × "}<tspan fill={inkOf(GREEN)}>{cb.q}</tspan>{" ="}
          </text>
          {cb.step >= 2 && <text x={318} y={490} fontSize={T.speech} fontWeight={700} fill={inkOf(GREEN)}>{cb.p * cb.q}</text>}
          {cb.step >= 3 && (
            <text x={690} y={490} textAnchor="end" fontSize={T.speech} fontWeight={700} fill={C.ink}>
              <tspan fill={inkOf(GREEN)}>{cb.p * cb.q}</tspan>{" + "}<tspan fill={inkOf(VERM)}>{cb.r}</tspan>{" ="}
            </text>
          )}
          {cb.step >= 4 && <text x={708} y={490} fontSize={T.speech} fontWeight={700} fill={inkOf(BLUE)}>{cb.p * cb.q + cb.r}</text>}
        </g>
      )}
      {names && (
        <g>
          {names.map((col: any, k: number) => {
            const x = [110, 320, 530, 745][k];
            return (
              <g key={"n" + k} className="sb-in">
                <text x={x} y={474} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={inkOf(col.c)}>{col.n}</text>
                <text x={x} y={514} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx(col.name)}</text>
              </g>
            );
          })}
          {names.length > 1 && <text x={215} y={470} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={C.ink}>÷</text>}
          {names.length > 2 && <text x={425} y={470} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={C.ink}>=</text>}
          {names.length > 3 && <line x1={640} y1={432} x2={640} y2={520} stroke={C.rule} strokeWidth={3} strokeLinecap="round" />}
        </g>
      )}
      {note && note.kind === "cmp" && (
        <g className="sb-in">
          <text x={300} y={474} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={inkOf(VERM)}>{note.a}</text>
          <text x={300} y={514} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("left over")}</text>
          <text x={420} y={474} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={C.ink}>&gt;</text>
          <text x={540} y={474} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={inkOf(AMBER)}>{note.b}</text>
          <text x={540} y={514} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("plates")}</text>
        </g>
      )}
      {kind === "rules" && CASES.map((c, k) => {
        const h = cfg.heap, x = k % 2 === 0 ? 230 : 560, y = 458 + Math.floor(k / 2) * 54;
        const lhs = c === "one" ? `${h} ÷ 1 =` : c === "self" ? `${h} ÷ ${h} =` : c === "empty" ? `0 ÷ ${h} =` : `${h} ÷ 0 =`;
        const res = c === "one" ? h : c === "self" ? 1 : c === "empty" ? 0 : tx("not possible");
        const done = c === "none" ? shown.none && revealed : shown[c];
        return (
          <g key={"r" + c}>
            <text x={x} y={y} textAnchor="end" fontSize={T.label} fontWeight={700} fill={C.ink}>{lhs}</text>
            <text x={x + 16} y={y} fontSize={T.label} fontWeight={700} fill={done && c !== "none" ? inkOf(GREEN) : C.ink}>{done ? res : "?"}</text>
          </g>
        );
      })}
      {kind === "zero" && note && (
        <g className="sb-in">
          <text x={515} y={262} textAnchor="end" fontSize={T.speech} fontWeight={700} fill={C.ink}>0 ÷ 0 =</text>
          <text x={531} y={262} fontSize={T.speech} fontWeight={700} fill={C.ink}>{tx("not possible")}</text>
          {[["self", "a number ÷ itself", "= 1", 0], ["zero", "0 ÷ a number", "= 0", 430]].map(([id, lhs, rhs, x]: any) => {
            const on = lit.rule === id || lit.rule === "both";
            return (
              <g key={id}>
                <rect x={x} y={426} width={410} height={98} rx={RAD.panel} fill="#FFFFFF" stroke={on ? C.accent : C.rule} strokeWidth={on ? 4 : 2} />
                <text x={x + 290} y={464} textAnchor="end" fontSize={T.micro} fontWeight={700} fill={C.ink}>{tx(lhs)}</text>
                <text x={x + 302} y={464} fontSize={T.micro} fontWeight={700} fill={C.ink}>{rhs}</text>
                <text x={x + 205} y={504} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("not for 0")}</text>
              </g>
            );
          })}
        </g>
      )}

      {/* the name tags: on the rail, or lying on the thing each one names */}
      {(kind === "tags" || kind === "name2") && TAGS.map((name, k) => {
        const pl = tags[name];
        if (kind === "name2" && !pl) return null;
        const held = dragging && dragging.src === "tag" && dragging.name === name;
        const sp = pl && pl.t === "share" ? spots[pl.k || 0] : null;
        const anchor = !pl ? railAt(k) : pl.t === "heap" ? { x: 150, y: 150 } : pl.t === "plates" ? { x: 746, y: 354 } : pl.t === "dish" ? { x: DISH.cx, y: 118 } : sp ? { x: sp.x, y: sp.y } : railAt(k);
        const x = held ? drag.drag.x - 92 : anchor.x - 92, y = held ? drag.drag.y - 36 : anchor.y - 36;
        const pay = { src: "tag", name };
        return (
          <g key={"g" + name} className={tagsLive ? "sb-grab c4-piece" : ""}
            {...(tagsLive ? { ...control("tag-" + name, "The " + name + " tag"), ...drag.bind(pay), ...drag.keys(pay) } : {})}>
            <SbTag x={x} y={y} name={tx(name)} C={C} lifted={held} />
          </g>
        );
      })}

      {/* counters in flight, and the take under the finger */}
      {fly && (
        <g filter="url(#fShadowSoft)" pointerEvents="none">
          {fly.map((f: any, i: number) => (
            <g key={"f" + i} className="sb-fly" style={{ transform: `translate(${f.x}px,${f.y}px)` } as any}>
              <Disc x={0} y={0} r={11} paint={f.paint} flat />
            </g>
          ))}
        </g>
      )}
      {heapOut > 0 && (
        <g pointerEvents="none" filter="url(#fLift)">
          {Array.from({ length: heapOut }).map((_, j) => <Disc key={j} x={drag.drag.x - 154 + j * 28} y={drag.drag.y} r={11} paint="gHundred" flat />)}
        </g>
      )}

      {invite && <Invite x={invite.x} y={invite.y} r={invite.r} C={C} />}
    </g>
  );
}

/* the summary page's small drawing: the child's last right answer of the phase, as its division */
function Thumb({ result, C, w, h, tx = (v: any) => v }: any) {
  const L = (result && result.last) || {};
  const hit = PHASES.flatMap((p: any) => p.items).find((it: any) => it.kind === L.kind && JSON.stringify(it.answer) === JSON.stringify(L.answer));
  const lines = hit ? hit.thumb : [String(L.value ?? "")];
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      {lines.map((ln: string, i: number) => (
        <text key={i} x={w / 2} y={h / 2 - 6 + (i - (lines.length - 1) / 2) * 34 + 10} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={C.ink}>{tx(ln)}</text>
      ))}
    </g>
  );
}

function ShareBench(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, format, fitHost: () => null }} />
  );
}

export default ShareBench;
