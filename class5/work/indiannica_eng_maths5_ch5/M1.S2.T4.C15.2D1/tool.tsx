/* ═══ M1.S2.T4.C15.2D1 · decimal_reader · tool-specific part (remade 2026-10-17 on r55, the new look) ═══════════
   The runtime (prepended at build) draws everything outside the working area. The lesson is silent and action-driven:
   the bubble is the guide, nothing moves on unless the child acts. keyOnly: no question bar, the question lives in the
   bubble (one sentence), the key's corner box.key stays empty, every act is performed on screen (api.act).
   Phases 1-3: a decimal on digit tiles over a place strip; the child builds a reading from word chips (tap or drag
   into a row, tap a row's chip to take it out), then presses Enter (pad: "enter"). The guide steps read the book's
   example with the Read key: the hand points at each part as its word lands.
   Phase 4: the words of a decimal in a tray over an empty place strip; the guide steps carry the book's example
   word by word onto the strip; each question is typed on the pad (pointKey) and the strip shows where each typed
   digit lands. NO imports; only the five host hooks. */

const TOOL_ID = "decimal_reader";
const MEDIA_ID = "M1.S2.T4.C15.2D1";
const TOOL_NAME = "Decimal Reader";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
/* kept for the tool object's shape (and the sidecar); nothing speaks from r30 */
const VOICE = {"rate":0.92,"pitch":1.06};

/* the plan's opening line (not shown: phase 1 opens on its guide step) */
const OPENING = ["A decimal on the tiles, waiting to be read aloud."];
/* not shown from r44; kept for the sidecar */
const FINISH_LINE = "Two readings of one number, and both of them right.";
/* printed when the child opens Free play: tap the tiles to set a decimal, then the two Read keys */
const FREE_LINE = "Free play. Set any decimal on the tiles, then read it both ways.";

const START_HOOK = "How many ways can you read 46.29 out loud?";

/* Hindi and Gujarati, keyed by the English byte for byte (PATTERNS §11). Terms: point दशमलव / પોઇન્ટ, and और / અને,
   places दशांश शतांश सहस्रांश / દશાંશ શતાંશ સહસ્રાંશ, इकाई दहाई सैकड़ा / એકમ દશક શતક. Number words on the chips are the
   runtime's wordsIn (drLab), not TR. A first draft: a native speaker should read it. */
const TR: any = {
  hi: {
    "Decimal Reader": "दशमलव पाठक",
    "A decimal on the tiles, waiting to be read aloud.": "टाइलों पर एक दशमलव संख्या, पढ़े जाने का इंतज़ार कर रही है।",
    "Two readings of one number, and both of them right.": "एक संख्या की दो पढ़ाइयाँ, और दोनों सही।",
    "Free play. Set any decimal on the tiles, then read it both ways.": "खुला खेल। टाइलों पर कोई भी दशमलव संख्या बनाओ, फिर उसे दोनों तरह से पढ़ो।",
    "How many ways can you read 46.29 out loud?": "46.29 को तुम कितनी तरह से बोलकर पढ़ सकते हो?",
    /* phase 1 */
    "Reading with and": "और से पढ़ना",
    "Say the whole number, then and. Which place is the last digit in?": "पूर्ण संख्या बोलो, फिर और। अंतिम अंक किस स्थान पर है?",
    "Tap Read with and to read 46.29 word by word.": "46.29 को शब्दों में पढ़ने के लिए और से पढ़ो दबाओ।",
    "The Read with and key is at the bottom.": "और से पढ़ो बटन नीचे है।",
    "Name the place of the last digit to end the reading.": "पढ़ना अंतिम अंक के स्थान के नाम पर खत्म करो।",
    "Say the whole number, and, the number after the point, then the last place.": "पूर्ण संख्या, और, दशमलव के बाद की संख्या, फिर अंतिम स्थान बोलो।",
    "The last digit's place always ends a reading with and.": "और से पढ़ना हमेशा अंतिम अंक के स्थान पर खत्म होता है।",
    "You learned: say and for the point, then name the last digit's place.": "तुमने सीखा: दशमलव की जगह और बोलो, फिर अंतिम अंक का स्थान।",
    "Read 312.46 with and: tap its words into the row, then press Enter.": "312.46 को और से पढ़ो: उसके शब्द पंक्ति में टैप करो, फिर एंटर दबाओ।",
    "Read 312.46 with and": "312.46 को और से पढ़ो",
    "Which digit comes last after the point?": "दशमलव के बाद अंतिम अंक कौन-सा है?",
    "Now read 4.3 with and.": "अब 4.3 को और से पढ़ो।",
    "Now read 4.3 with and": "अब 4.3 और से पढ़ो",
    "Say the name of the place the 3 is in.": "3 जिस स्थान पर है, उसका नाम बोलो।",
    "How is 106.72 read with and?": "106.72 को और से कैसे पढ़ते हैं?",
    "Read 106.72 with and": "106.72 को और से पढ़ो",
    "Read the two digits after the point as one number.": "दशमलव के बाद के दोनों अंकों को एक संख्या की तरह पढ़ो।",
    "Yes, three hundred twelve and forty-six hundredths.": "हाँ, तीन सौ बारह और छियालीस शतांश।",
    "Yes, four and three tenths.": "हाँ, चार और तीन दशांश।",
    "Yes, one hundred six and seventy-two hundredths.": "हाँ, एक सौ छह और बहत्तर शतांश।",
    /* phase 2 */
    "Reading with point": "दशमलव से पढ़ना",
    "Now say point, and one digit at a time. Both ways are right.": "अब दशमलव बोलो, और एक-एक अंक। दोनों तरीके सही हैं।",
    "Tap Read with point to read 46.29 the other way.": "46.29 को दूसरी तरह पढ़ने के लिए दशमलव से पढ़ो दबाओ।",
    "Find the Read with point key at the bottom.": "नीचे दशमलव से पढ़ो बटन ढूँढो।",
    "Say point, then one word for each digit in order.": "दशमलव बोलो, फिर क्रम से हर अंक के लिए एक शब्द।",
    "Read the whole number, say point, then say each digit after it, one by one.": "पूर्ण संख्या पढ़ो, दशमलव बोलो, फिर उसके बाद हर अंक एक-एक करके बोलो।",
    "Both ways are right, and with point each digit gets its own word.": "दोनों तरीके सही हैं, और दशमलव से हर अंक का अपना शब्द होता है।",
    "You learned: with point, each digit after the point is said alone.": "तुमने सीखा: दशमलव से पढ़ते समय हर अंक अलग बोला जाता है।",
    "The top row reads 9.305 with and, so build its reading with point below.": "ऊपर 9.305 और से पढ़ा गया है, अब नीचे इसे दशमलव से बनाओ।",
    "Read 9.305 with point": "9.305 को दशमलव से पढ़ो",
    "With point, the digits after it are never joined into one number.": "दशमलव से पढ़ते समय बाद के अंक कभी एक संख्या नहीं बनते।",
    "How is 27.58 read with point?": "27.58 को दशमलव से कैसे पढ़ते हैं?",
    "Read 27.58 with point": "27.58 को दशमलव से पढ़ो",
    "Look again at the two digits after the point.": "दशमलव के बाद के दोनों अंकों को फिर से देखो।",
    "Say 30.04 both ways, tapping a row's name to work in it.": "30.04 को दोनों तरह से पढ़ो, पंक्ति चुनने के लिए उसका नाम टैप करो।",
    "Read 30.04 both ways": "30.04 को दोनों तरह से पढ़ो",
    "The and row ends on a place name; the point row says every digit.": "और वाली पंक्ति स्थान के नाम पर खत्म होती है; दशमलव वाली हर अंक बोलती है।",
    "In the and row name the last place, and in the point row say the zero too.": "और वाली पंक्ति में अंतिम स्थान बोलो; दशमलव वाली में शून्य भी बोलो।",
    "With and, the digits after the point are one number; with point, each is a word.": "और से बाद के अंक एक संख्या हैं; दशमलव से हर अंक एक शब्द है।",
    "Yes, nine point three zero five, one word a digit.": "हाँ, नौ दशमलव तीन शून्य पाँच, हर अंक का एक शब्द।",
    "Yes, twenty-seven point five eight.": "हाँ, सत्ताईस दशमलव पाँच आठ।",
    "Yes, both readings say 30.04.": "हाँ, दोनों पढ़ाइयाँ 30.04 ही कहती हैं।",
    /* phase 3 */
    "When the whole number part is zero": "जब पूर्ण संख्या वाला भाग शून्य हो",
    "The whole number part is zero. Say it both ways.": "पूर्ण संख्या वाला भाग शून्य है। इसे दोनों तरह से बोलो।",
    "Tap Read with and to read 0.803.": "0.803 पढ़ने के लिए और से पढ़ो दबाओ।",
    "Start with the key at the bottom.": "नीचे वाले बटन से शुरू करो।",
    "Flip the Zero and switch to put zero and in front.": "आगे शून्य और लगाने के लिए शून्य और स्विच पलटो।",
    "The switch sits left of the key.": "स्विच बटन के बाईं ओर है।",
    "Now the same key reads it with point.": "अब वही बटन इसे दशमलव से पढ़ता है।",
    "Tap the key again: it has a new name.": "बटन फिर दबाओ: उसका नाम नया है।",
    "Add the name of the last digit's place.": "अंतिम अंक के स्थान का नाम जोड़ो।",
    "The last digit is in the third place after the point; say that place's name.": "अंतिम अंक दशमलव के बाद तीसरे स्थान पर है; उस स्थान का नाम बोलो।",
    "A zero whole part may be read with zero and, or without it.": "शून्य पूर्ण भाग को शून्य और के साथ या उसके बिना पढ़ सकते हैं।",
    "You learned: a zero whole part may be read with zero and, or without.": "तुमने सीखा: शून्य पूर्ण भाग शून्य और के साथ या बिना पढ़ सकते हैं।",
    "Read 0.26 in both ways, with and on top and with point below.": "0.26 को दोनों तरह से पढ़ो: ऊपर और से, नीचे दशमलव से।",
    "Read 0.26 both ways": "0.26 को दोनों तरह से पढ़ो",
    "Each row ends in its own way: look at both.": "हर पंक्ति अपनी तरह से खत्म होती है: दोनों को देखो।",
    "Name the last place in the and row, then give each digit a word below.": "और वाली पंक्ति में अंतिम स्थान बोलो, फिर नीचे हर अंक को एक शब्द दो।",
    "With point say zero, point, then each digit; with and end on the last place.": "दशमलव से शून्य, दशमलव, फिर हर अंक बोलो; और से अंतिम स्थान पर रुको।",
    "How is 0.9 read with point?": "0.9 को दशमलव से कैसे पढ़ते हैं?",
    "Read 0.9 with point": "0.9 को दशमलव से पढ़ो",
    "Start with the whole number part, even when it is zero.": "पूर्ण संख्या वाले भाग से शुरू करो, चाहे वह शून्य हो।",
    "Say the whole number part, then the word point.": "पूर्ण संख्या वाला भाग बोलो, फिर शब्द दशमलव।",
    "With point there is no place name: the digit stands alone.": "दशमलव से पढ़ने में स्थान का नाम नहीं होता: अंक अकेला बोलो।",
    "Read 0.415 with and.": "0.415 को और से पढ़ो।",
    "Read 0.415 with and": "0.415 और से पढ़ो",
    "The three digits after the point make one number.": "दशमलव के बाद के तीनों अंक एक संख्या बनाते हैं।",
    "Yes, both ways say 0.26.": "हाँ, दोनों तरीके 0.26 ही कहते हैं।",
    "Yes, zero point nine.": "हाँ, शून्य दशमलव नौ।",
    "Yes, four hundred fifteen thousandths.": "हाँ, चार सौ पंद्रह सहस्रांश।",
    /* phase 4 */
    "From words to a decimal": "शब्दों से दशमलव संख्या",
    "Hundredths need two places after the point. Which place is empty?": "शतांश को दशमलव के बाद दो स्थान चाहिए। कौन-सा स्थान खाली है?",
    "Tap fifteen to write it before the point.": "पंद्रह को दशमलव से पहले लिखने के लिए उसे टैप करो।",
    "Look at the start of the word row.": "शब्दों की पंक्ति की शुरुआत देखो।",
    "Tap the word and: it becomes the point.": "शब्द और को टैप करो: वह दशमलव बन जाता है।",
    "It is the short word after fifteen.": "यह पंद्रह के बाद वाला छोटा शब्द है।",
    "Tap hundredths: it needs two places after the point.": "शतांश को टैप करो: उसे दशमलव के बाद दो स्थान चाहिए।",
    "It is the word at the end of the row.": "यह पंक्ति के अंत वाला शब्द है।",
    "Tap four to write it in the hundredths place.": "चार को शतांश के स्थान पर लिखने के लिए उसे टैप करो।",
    "Find the word just before hundredths.": "शतांश से ठीक पहले वाला शब्द ढूँढो।",
    "Thousandths need three places after the point.": "सहस्रांश को दशमलव के बाद तीन स्थान चाहिए।",
    "Write the last digit where the last word says, then check the places before it.": "अंतिम अंक वहाँ लिखो जहाँ अंतिम शब्द कहे, फिर उससे पहले के स्थान जाँचो।",
    "Every empty place between the point and the last digit gets a 0.": "दशमलव और अंतिम अंक के बीच हर खाली स्थान में 0 आता है।",
    "You learned: zeros hold the empty places after the point.": "तुमने सीखा: दशमलव के बाद के खाली स्थान 0 भरता है।",
    "Write eight and nineteen thousandths as a decimal.": "आठ और उन्नीस सहस्रांश को दशमलव संख्या में लिखो।",
    "8 and 19 thousandths": "8 और 19 सहस्रांश",
    "Look at the last word: which place does it name?": "अंतिम शब्द देखो: वह किस स्थान का नाम है?",
    "Now type sixty and five tenths with its point.": "अब साठ और पाँच दशांश को दशमलव के साथ टाइप करो।",
    "60 and 5 tenths": "60 और 5 दशांश",
    "Which place does the word tenths name?": "शब्द दशांश किस स्थान का नाम है?",
    "Tenths need just one place after the point.": "दशांश को दशमलव के बाद बस एक स्थान चाहिए।",
    "Put the last digit where the last word says, then look at each place before it.": "अंतिम अंक वहाँ रखो जहाँ अंतिम शब्द कहे, फिर उससे पहले का हर स्थान देखो।",
    "Last one, twelve and six hundredths, as a decimal.": "आख़िरी: बारह और छह शतांश को दशमलव संख्या में लिखो।",
    "12 and 6 hundredths": "12 और 6 शतांश",
    "Find the place that hundredths names on the strip.": "पट्टी पर वह स्थान ढूँढो जिसका नाम शतांश है।",
    "Count two places after the point for hundredths.": "शतांश के लिए दशमलव के बाद दो स्थान गिनो।",
    "Find where the last word puts the last digit, then look back to the point.": "देखो अंतिम शब्द अंतिम अंक को कहाँ रखता है, फिर दशमलव तक पीछे देखो।",
    "Yes, 8.019, with a 0 in the empty tenths place.": "हाँ, 8.019, जिसमें खाली दशांश स्थान पर 0 है।",
    "Yes, 60.5, with no empty place after the point.": "हाँ, 60.5, जिसमें दशमलव के बाद कोई खाली स्थान नहीं।",
    "Yes, 12.06 is twelve and six hundredths.": "हाँ, 12.06 यानी बारह और छह शतांश।",
    /* the picture's words */
    "Hundreds": "सैकड़ा", "Tens": "दहाई", "Ones": "इकाई", "Tenths": "दशांश", "Hundredths": "शतांश", "Thousandths": "सहस्रांश",
    "and": "और", "point": "दशमलव", "tenths": "दशांश", "hundredths": "शतांश", "thousandths": "सहस्रांश",
    "with and": "और से", "with point": "दशमलव से", "Read with and": "और से पढ़ो", "Read with point": "दशमलव से पढ़ो",
    "Zero and": "शून्य और", "Answer": "उत्तर", "Place holder": "स्थानधारक", "Take out": "हटाओ",
    /* Work's own lines: Enter on an unfinished reading, and a 0 typed in front of the whole number */
    "Build the reading first.": "पहले पढ़ना बनाओ।",
    "Fill both rows.": "दोनों पंक्तियाँ भरो।",
    "Write it with no 0 in front of 8.": "8 के आगे 0 लगाए बिना लिखो।",
    "Write it with no 0 in front of 60.": "60 के आगे 0 लगाए बिना लिखो।",
    "Write it with no 0 in front of 12.": "12 के आगे 0 लगाए बिना लिखो।",
  },
  gu: {
    "Decimal Reader": "દશાંશ વાચક",
    "A decimal on the tiles, waiting to be read aloud.": "ટાઇલ્સ પર એક દશાંશ સંખ્યા, વંચાવાની રાહ જુએ છે.",
    "Two readings of one number, and both of them right.": "એક સંખ્યાનાં બે વાંચન, અને બંને સાચાં.",
    "Free play. Set any decimal on the tiles, then read it both ways.": "મુક્ત રમત. ટાઇલ્સ પર કોઈ પણ દશાંશ સંખ્યા બનાવો, પછી તેને બંને રીતે વાંચો.",
    "How many ways can you read 46.29 out loud?": "46.29 ને તમે કેટલી રીતે બોલીને વાંચી શકો?",
    /* phase 1 */
    "Reading with and": "અને સાથે વાંચવું",
    "Say the whole number, then and. Which place is the last digit in?": "પૂર્ણ સંખ્યા બોલો, પછી અને. છેલ્લો અંક કયા સ્થાને છે?",
    "Tap Read with and to read 46.29 word by word.": "46.29 ને શબ્દોમાં વાંચવા અને સાથે વાંચો દબાવો.",
    "The Read with and key is at the bottom.": "અને સાથે વાંચો બટન નીચે છે.",
    "Name the place of the last digit to end the reading.": "છેલ્લા અંકના સ્થાનના નામથી વાંચન પૂરું કરો.",
    "Say the whole number, and, the number after the point, then the last place.": "પૂર્ણ સંખ્યા, અને, પોઇન્ટ પછીની સંખ્યા, પછી છેલ્લું સ્થાન બોલો.",
    "The last digit's place always ends a reading with and.": "અને સાથેનું વાંચન હંમેશા છેલ્લા અંકના સ્થાનથી પૂરું થાય છે.",
    "You learned: say and for the point, then name the last digit's place.": "તમે શીખ્યા: પોઇન્ટ માટે અને બોલો, પછી છેલ્લા અંકનું સ્થાન.",
    "Read 312.46 with and: tap its words into the row, then press Enter.": "312.46 ને અને સાથે વાંચો: તેના શબ્દો હરોળમાં ટેપ કરો, પછી એન્ટર દબાવો.",
    "Read 312.46 with and": "312.46 ને અને સાથે વાંચો",
    "Which digit comes last after the point?": "પોઇન્ટ પછી છેલ્લો અંક કયો છે?",
    "Now read 4.3 with and.": "હવે 4.3 ને અને સાથે વાંચો.",
    "Now read 4.3 with and": "હવે 4.3 અને સાથે વાંચો",
    "Say the name of the place the 3 is in.": "3 જે સ્થાને છે તેનું નામ બોલો.",
    "How is 106.72 read with and?": "106.72 ને અને સાથે કેવી રીતે વંચાય?",
    "Read 106.72 with and": "106.72 ને અને સાથે વાંચો",
    "Read the two digits after the point as one number.": "પોઇન્ટ પછીના બંને અંકોને એક સંખ્યા તરીકે વાંચો.",
    "Yes, three hundred twelve and forty-six hundredths.": "હા, ત્રણસો બાર અને છેતાલીસ શતાંશ.",
    "Yes, four and three tenths.": "હા, ચાર અને ત્રણ દશાંશ.",
    "Yes, one hundred six and seventy-two hundredths.": "હા, એકસો છ અને બોતેર શતાંશ.",
    /* phase 2 */
    "Reading with point": "પોઇન્ટ સાથે વાંચવું",
    "Now say point, and one digit at a time. Both ways are right.": "હવે પોઇન્ટ બોલો, અને એક એક અંક. બંને રીત સાચી છે.",
    "Tap Read with point to read 46.29 the other way.": "46.29 ને બીજી રીતે વાંચવા પોઇન્ટ સાથે વાંચો દબાવો.",
    "Find the Read with point key at the bottom.": "નીચે પોઇન્ટ સાથે વાંચો બટન શોધો.",
    "Say point, then one word for each digit in order.": "પોઇન્ટ બોલો, પછી ક્રમમાં દરેક અંક માટે એક શબ્દ.",
    "Read the whole number, say point, then say each digit after it, one by one.": "પૂર્ણ સંખ્યા વાંચો, પોઇન્ટ બોલો, પછી તેના પછીનો દરેક અંક એક પછી એક બોલો.",
    "Both ways are right, and with point each digit gets its own word.": "બંને રીત સાચી છે, અને પોઇન્ટ સાથે દરેક અંકનો પોતાનો શબ્દ હોય છે.",
    "You learned: with point, each digit after the point is said alone.": "તમે શીખ્યા: પોઇન્ટ સાથે વાંચતાં દરેક અંક અલગ બોલાય છે.",
    "The top row reads 9.305 with and, so build its reading with point below.": "ઉપર 9.305 અને સાથે વંચાયું છે, હવે નીચે તેને પોઇન્ટ સાથે બનાવો.",
    "Read 9.305 with point": "9.305 ને પોઇન્ટ સાથે વાંચો",
    "With point, the digits after it are never joined into one number.": "પોઇન્ટ સાથે વાંચતાં પછીના અંકો ક્યારેય એક સંખ્યા બનતા નથી.",
    "How is 27.58 read with point?": "27.58 ને પોઇન્ટ સાથે કેવી રીતે વંચાય?",
    "Read 27.58 with point": "27.58 ને પોઇન્ટ સાથે વાંચો",
    "Look again at the two digits after the point.": "પોઇન્ટ પછીના બંને અંકો ફરીથી જુઓ.",
    "Say 30.04 both ways, tapping a row's name to work in it.": "30.04 ને બંને રીતે વાંચો, હરોળ પસંદ કરવા તેનું નામ ટેપ કરો.",
    "Read 30.04 both ways": "30.04 ને બંને રીતે વાંચો",
    "The and row ends on a place name; the point row says every digit.": "અને વાળી હરોળ સ્થાનના નામે પૂરી થાય છે; પોઇન્ટ વાળી દરેક અંક બોલે છે.",
    "In the and row name the last place, and in the point row say the zero too.": "અને વાળી હરોળમાં છેલ્લું સ્થાન બોલો; પોઇન્ટ વાળીમાં શૂન્ય પણ બોલો.",
    "With and, the digits after the point are one number; with point, each is a word.": "અને સાથે પછીના અંકો એક સંખ્યા છે; પોઇન્ટ સાથે દરેક અંક એક શબ્દ છે.",
    "Yes, nine point three zero five, one word a digit.": "હા, નવ પોઇન્ટ ત્રણ શૂન્ય પાંચ, દરેક અંકનો એક શબ્દ.",
    "Yes, twenty-seven point five eight.": "હા, સત્તાવીસ પોઇન્ટ પાંચ આઠ.",
    "Yes, both readings say 30.04.": "હા, બંને વાંચન 30.04 જ કહે છે.",
    /* phase 3 */
    "When the whole number part is zero": "જ્યારે પૂર્ણ સંખ્યાનો ભાગ શૂન્ય હોય",
    "The whole number part is zero. Say it both ways.": "પૂર્ણ સંખ્યાનો ભાગ શૂન્ય છે. તેને બંને રીતે બોલો.",
    "Tap Read with and to read 0.803.": "0.803 વાંચવા અને સાથે વાંચો દબાવો.",
    "Start with the key at the bottom.": "નીચેના બટનથી શરૂ કરો.",
    "Flip the Zero and switch to put zero and in front.": "આગળ શૂન્ય અને મૂકવા શૂન્ય અને સ્વિચ ફેરવો.",
    "The switch sits left of the key.": "સ્વિચ બટનની ડાબી બાજુ છે.",
    "Now the same key reads it with point.": "હવે એ જ બટન તેને પોઇન્ટ સાથે વાંચે છે.",
    "Tap the key again: it has a new name.": "બટન ફરી દબાવો: તેનું નામ નવું છે.",
    "Add the name of the last digit's place.": "છેલ્લા અંકના સ્થાનનું નામ ઉમેરો.",
    "The last digit is in the third place after the point; say that place's name.": "છેલ્લો અંક પોઇન્ટ પછી ત્રીજા સ્થાને છે; તે સ્થાનનું નામ બોલો.",
    "A zero whole part may be read with zero and, or without it.": "શૂન્ય પૂર્ણ ભાગને શૂન્ય અને સાથે કે તેના વગર વાંચી શકાય.",
    "You learned: a zero whole part may be read with zero and, or without.": "તમે શીખ્યા: શૂન્ય પૂર્ણ ભાગ શૂન્ય અને સાથે કે વગર વંચાય.",
    "Read 0.26 in both ways, with and on top and with point below.": "0.26 ને બંને રીતે વાંચો: ઉપર અને સાથે, નીચે પોઇન્ટ સાથે.",
    "Read 0.26 both ways": "0.26 ને બંને રીતે વાંચો",
    "Each row ends in its own way: look at both.": "દરેક હરોળ પોતાની રીતે પૂરી થાય છે: બંને જુઓ.",
    "Name the last place in the and row, then give each digit a word below.": "અને વાળી હરોળમાં છેલ્લું સ્થાન બોલો, પછી નીચે દરેક અંકને એક શબ્દ આપો.",
    "With point say zero, point, then each digit; with and end on the last place.": "પોઇન્ટ સાથે શૂન્ય, પોઇન્ટ, પછી દરેક અંક બોલો; અને સાથે છેલ્લા સ્થાને અટકો.",
    "How is 0.9 read with point?": "0.9 ને પોઇન્ટ સાથે કેવી રીતે વંચાય?",
    "Read 0.9 with point": "0.9 ને પોઇન્ટ સાથે વાંચો",
    "Start with the whole number part, even when it is zero.": "પૂર્ણ સંખ્યાના ભાગથી શરૂ કરો, ભલે તે શૂન્ય હોય.",
    "Say the whole number part, then the word point.": "પૂર્ણ સંખ્યાનો ભાગ બોલો, પછી શબ્દ પોઇન્ટ.",
    "With point there is no place name: the digit stands alone.": "પોઇન્ટ સાથે સ્થાનનું નામ નથી હોતું: અંક એકલો બોલો.",
    "Read 0.415 with and.": "0.415 ને અને સાથે વાંચો.",
    "Read 0.415 with and": "0.415 અને સાથે વાંચો",
    "The three digits after the point make one number.": "પોઇન્ટ પછીના ત્રણેય અંકો એક સંખ્યા બનાવે છે.",
    "Yes, both ways say 0.26.": "હા, બંને રીત 0.26 જ કહે છે.",
    "Yes, zero point nine.": "હા, શૂન્ય પોઇન્ટ નવ.",
    "Yes, four hundred fifteen thousandths.": "હા, ચારસો પંદર સહસ્રાંશ.",
    /* phase 4 */
    "From words to a decimal": "શબ્દોથી દશાંશ સંખ્યા",
    "Hundredths need two places after the point. Which place is empty?": "શતાંશને પોઇન્ટ પછી બે સ્થાન જોઈએ. કયું સ્થાન ખાલી છે?",
    "Tap fifteen to write it before the point.": "પંદરને પોઇન્ટ પહેલાં લખવા તેને ટેપ કરો.",
    "Look at the start of the word row.": "શબ્દોની હરોળની શરૂઆત જુઓ.",
    "Tap the word and: it becomes the point.": "શબ્દ અને ને ટેપ કરો: તે પોઇન્ટ બને છે.",
    "It is the short word after fifteen.": "તે પંદર પછીનો નાનો શબ્દ છે.",
    "Tap hundredths: it needs two places after the point.": "શતાંશને ટેપ કરો: તેને પોઇન્ટ પછી બે સ્થાન જોઈએ.",
    "It is the word at the end of the row.": "તે હરોળના છેડાનો શબ્દ છે.",
    "Tap four to write it in the hundredths place.": "ચારને શતાંશના સ્થાને લખવા તેને ટેપ કરો.",
    "Find the word just before hundredths.": "શતાંશની બરાબર પહેલાંનો શબ્દ શોધો.",
    "Thousandths need three places after the point.": "સહસ્રાંશને પોઇન્ટ પછી ત્રણ સ્થાન જોઈએ.",
    "Write the last digit where the last word says, then check the places before it.": "છેલ્લો શબ્દ કહે ત્યાં છેલ્લો અંક લખો, પછી તેની પહેલાંનાં સ્થાન તપાસો.",
    "Every empty place between the point and the last digit gets a 0.": "પોઇન્ટ અને છેલ્લા અંક વચ્ચેના દરેક ખાલી સ્થાને 0 આવે છે.",
    "You learned: zeros hold the empty places after the point.": "તમે શીખ્યા: પોઇન્ટ પછીનાં ખાલી સ્થાન 0 સાચવે છે.",
    "Write eight and nineteen thousandths as a decimal.": "આઠ અને ઓગણીસ સહસ્રાંશને દશાંશ સંખ્યામાં લખો.",
    "8 and 19 thousandths": "8 અને 19 સહસ્રાંશ",
    "Look at the last word: which place does it name?": "છેલ્લો શબ્દ જુઓ: તે કયા સ્થાનનું નામ છે?",
    "Now type sixty and five tenths with its point.": "હવે સાઠ અને પાંચ દશાંશને પોઇન્ટ સાથે ટાઇપ કરો.",
    "60 and 5 tenths": "60 અને 5 દશાંશ",
    "Which place does the word tenths name?": "શબ્દ દશાંશ કયા સ્થાનનું નામ છે?",
    "Tenths need just one place after the point.": "દશાંશને પોઇન્ટ પછી ફક્ત એક સ્થાન જોઈએ.",
    "Put the last digit where the last word says, then look at each place before it.": "છેલ્લો શબ્દ કહે ત્યાં છેલ્લો અંક મૂકો, પછી તેની પહેલાંનું દરેક સ્થાન જુઓ.",
    "Last one, twelve and six hundredths, as a decimal.": "છેલ્લું: બાર અને છ શતાંશને દશાંશ સંખ્યામાં લખો.",
    "12 and 6 hundredths": "12 અને 6 શતાંશ",
    "Find the place that hundredths names on the strip.": "પટ્ટી પર એ સ્થાન શોધો જેનું નામ શતાંશ છે.",
    "Count two places after the point for hundredths.": "શતાંશ માટે પોઇન્ટ પછી બે સ્થાન ગણો.",
    "Find where the last word puts the last digit, then look back to the point.": "છેલ્લો શબ્દ છેલ્લો અંક ક્યાં મૂકે છે તે શોધો, પછી પોઇન્ટ સુધી પાછળ જુઓ.",
    "Yes, 8.019, with a 0 in the empty tenths place.": "હા, 8.019, જેમાં ખાલી દશાંશ સ્થાને 0 છે.",
    "Yes, 60.5, with no empty place after the point.": "હા, 60.5, જેમાં પોઇન્ટ પછી કોઈ ખાલી સ્થાન નથી.",
    "Yes, 12.06 is twelve and six hundredths.": "હા, 12.06 એટલે બાર અને છ શતાંશ.",
    /* the picture's words */
    "Hundreds": "શતક", "Tens": "દશક", "Ones": "એકમ", "Tenths": "દશાંશ", "Hundredths": "શતાંશ", "Thousandths": "સહસ્રાંશ",
    "and": "અને", "point": "પોઇન્ટ", "tenths": "દશાંશ", "hundredths": "શતાંશ", "thousandths": "સહસ્રાંશ",
    "with and": "અને સાથે", "with point": "પોઇન્ટ સાથે", "Read with and": "અને સાથે વાંચો", "Read with point": "પોઇન્ટ સાથે વાંચો",
    "Zero and": "શૂન્ય અને", "Answer": "જવાબ", "Place holder": "સ્થાનધારક", "Take out": "કાઢો",
    "Build the reading first.": "પહેલાં વાંચન બનાવો.",
    "Fill both rows.": "બંને હરોળ ભરો.",
    "Write it with no 0 in front of 8.": "8 ની આગળ 0 મૂક્યા વગર લખો.",
    "Write it with no 0 in front of 60.": "60 ની આગળ 0 મૂક્યા વગર લખો.",
    "Write it with no 0 in front of 12.": "12 ની આગળ 0 મૂક્યા વગર લખો.",
  },
};

/* ── numbers in words, places, readings ─────────────────────────────────────────────────────── */
const DR_ONES = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen",
  "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
const DR_TENS = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];
function drName(x: number): string {
  return x < 20 ? DR_ONES[x] : x < 100 ? DR_TENS[Math.floor(x / 10)] + (x % 10 ? "-" + DR_ONES[x % 10] : "")
    : DR_ONES[Math.floor(x / 100)] + " hundred" + (x % 100 ? " " + drName(x % 100) : "");
}
/* a chip keeps its English word as its id (the rows, judge and the agent read it); what it SHOWS is the language's:
   a number word is the runtime's own number in words (wordsIn: any number free play makes), every other word via TR.
   Hindi and Gujarati read a decimal in the same order as English (46.29: छियालीस और उनतीस शतांश / छियालीस दशमलव दो नौ),
   so one chip order serves all three languages */
const DR_NUM: any = Object.fromEntries(Array.from({ length: 1000 }, (_, x) => [drName(x), x]));
const drLab = (c: string, lang: string, tx: any) => (lang && lang !== "en" && DR_NUM[c] !== undefined ? wordsIn(DR_NUM[c], lang) : tx(c));
const DR_PLACES = ["tenths", "hundredths", "thousandths"];
const DR_NAMES = ["Hundreds", "Tens", "Ones", "Tenths", "Hundredths", "Thousandths"];
/* the two readings of a decimal written "46.29" as chips (A: with and, B: with point); zero: "zero and" before a zero whole */
function drRead(dec: string, zero: boolean) {
  const [w, d = ""] = String(dec).split(".");
  const wn = Number(w || "0");
  if (!d) return { A: [drName(wn)], B: [drName(wn)] };   /* no decimal part at all; zeros after the point are still read */
  const A = (wn === 0 ? (zero ? ["zero", "and"] : []) : [drName(wn), "and"]).concat([drName(Number(d)), DR_PLACES[d.length - 1]]);
  const B = [drName(wn), "point"].concat(d.split("").map((c) => DR_ONES[Number(c)]));
  return { A, B };
}
const drNorm = (s: any) => String(s ?? "").toLowerCase().replace(/\s+/g, " ").trim();
const drRowsOf = (it: any) => (it.rows === "both" ? ["A", "B"] : it.rows === "and" ? ["A"] : ["B"]);
/* one reading against the one asked for; a zero whole part read with and may keep or drop "zero and" */
const drRowOk = (it: any, want: string, got: string, isAnd: boolean) => {
  const g = drNorm(got), w = drNorm(want);
  if (!g) return false;
  if (g === w) return true;
  return isAnd && /^0\./.test(String(it.dec)) && (g === "zero and " + w || "zero and " + g === w);
};
/* every chip a row may hold for this item */
const drPool = (it: any) => Array.from(new Set([...(it.bank || []), ...(it.given || []), "zero", "and"]));
/* a reading cut into the chips it is built from (longest chip first) */
function drChipsOf(s: any, chips: string[]) {
  const ws = [...chips].sort((a, b) => b.length - a.length);
  let rest = drNorm(s);
  const out: string[] = [];
  while (rest) {
    const w = ws.find((x) => rest === x || rest.startsWith(x + " "));
    if (!w) return null;
    out.push(w);
    rest = rest.slice(w.length).trim();
  }
  return out;
}
/* a typed decimal kept to the strip: at most two whole digits and three after the point */
const drClip = (s: any) => {
  const m = /^(\d*)(\.?)(\d*)$/.exec(String(s ?? ""));
  return m ? m[1].slice(0, 2) + m[2] + m[3].slice(0, 3) : String(s ?? "");
};

/* ── sizes (working-area units) ───────────────────────────────────────────────────────────────
   tiles 128 x 100 at a 192 pitch (a place name at 32 needs it), the point in its own 128-wide slot; reading rows 72 tall;
   the correction's answer lane; the word bank along the foot. Phase 4 is laid out for 1086 (the keypad open) at one place. */
/* heights leave Devanagari and Gujarati room: their ink rises about 1.09 em over the baseline and falls 0.40 under it, so a
   32 label needs about 48 of ink and every box round one is 60 or more */
/* phases 1-3: tiles 0-76, the bracket under them, the place names (a lit name's box 92-150), the word bank (one line at
   160, laid out on the whole 1472: a reading is answered on the working area, so no panel opens over it), the rows 16 under
   it (A, then B 16 under A: the row keys' edge), the correction's answer lane 12 under the last row; with no bank (the guide
   steps, free play) the rows start at 160 and the act keys stand at 438 */
const DR = { tw: 124, th: 76, pgap: 44, ny: 132, bk: 160, rh: 72, rgap: 16, ah: 58, by: 438, bh: 72, lane: 214, nw: 202, w4: 1086, full: 1472 };
/* phase 4, scaled up and centred in the 520: the word tray at 36, tiles 130 x 110 at 150, names at 40 (58 under the tiles),
   the place holder 80 under the names, the decimal 90 under that; laid out for the keypad-open width (1086) */
const P4 = { tw: 130, th: 110, ty: 36, y: 150, fs: T.prompt };
const P4_NY = P4.y + P4.th + 58, P4_PH = P4_NY + 80, P4_ANS = P4_PH + 90;
const DR_EX: any = { 1: "46.29", 2: "46.29", 3: "0.803" };
const DR_EX4 = { words: ["fifteen", "and", "four", "hundredths"], whole: "15", num: "4", place: 2 };
const MODEL = {
  tiles: "one digit tile a place, 124 x 76 (phase 4: 130 x 110), spaced so the place names under them keep a clear gap, the point in its own slot",
  places: DR_NAMES, rows: { first: DR.bk + DR.bh + DR.rgap, height: DR.rh, apart: DR.rh + DR.rgap }, bank: DR.bk,
  examples: { readWithAnd: DR_EX[1], readWithPoint: DR_EX[2], zeroWhole: DR_EX[3], fromWords: DR_EX4.words.join(" ") },
  writeStrip: ["Tens", "Ones", "Tenths", "Hundredths", "Thousandths"],
};

/* a label's width in em: Latin about 0.6 a character; Devanagari and Gujarati about 0.75 a letter and 0.25 a vowel sign */
const DR_MARK = /[ऀ-ःऺ-ॏ॑-ॗॢॣઁ-ઃ઼ા-્ૢૣ]/g;
const DR_INDIC = /[ऀ-૿]/;
const drEm = (s: any) => {
  const t = String(s), m = (t.match(DR_MARK) || []).length;
  /* Gujarati letters run wider than Devanagari in the rendered face (ઓગણીસ at 40 is about 160 wide) */
  if (/[઀-૿]/.test(t)) return (t.length - m) * 0.9 + m * 0.3;
  return DR_INDIC.test(t) ? (t.length - m) * 0.75 + m * 0.25 : t.length * 0.6;
};
/* a chip's width: its words (Poppins 600 Latin measures 0.6 em a character) plus 16 a side; Devanagari and Gujarati,
   whose letters vary more, 22 a side on a generous estimate */
const drChipW = (s: any, size = T.label) => Math.max(88, Math.round(drEm(s) * size + (DR_INDIC.test(String(s)) ? 44 : 32)));
/* chips laid left to right from x0 */
function drLay(labels: string[], x0: number, size = T.label, gap = 12) {
  let x = x0;
  return labels.map((c) => { const w = drChipW(c, size); const e = { x, w }; x += w + gap; return e; });
}
/* the word bank under the place names, one line 10 apart: every bank of the plan fits the 1472 in all three languages
   (measured); a second line would need the rows moved down (ponytail: not handled, no bank needs it) */
function drBank(labels: string[], room: number) {
  const lines: any[][] = [[]];
  let used = 0;
  labels.forEach((c, k) => {
    const w = drChipW(c);
    if (lines[lines.length - 1].length && used + 10 + w > room - 8) { lines.push([]); used = 0; }
    used += (lines[lines.length - 1].length ? 10 : 0) + w;
    lines[lines.length - 1].push({ k, w });
  });
  const y0 = DR.bk;
  const out: any[] = [];
  lines.forEach((L, li) => {
    const tot = L.reduce((a: number, e: any) => a + e.w, 0) + 10 * (L.length - 1);
    let x = Math.round((room - tot) / 2);
    L.forEach((e: any) => { out.push({ ...e, x, y: y0 + li * (DR.bh + 8) }); x += e.w + 10; });
  });
  return out;
}
/* the tiles: nw whole places, nd places after the point, centred in room; neighbours stand far enough apart that
   their place names (32, one line each, in the language on show) keep a clear gap */
function drCols(nw: number, nd: number, room: number, y = 0, tx = (v: any) => v, tw = DR.tw, fs = T.label) {
  const names = DR_NAMES.slice(3 - nw, 3).concat(DR_NAMES.slice(3, 3 + nd));
  const nwid = names.map((nm) => drEm(tx(nm)) * fs);
  const cs = [0];
  for (let k = 1; k < names.length; k++) cs.push(cs[k - 1] + Math.max(tw + 28, (nwid[k - 1] + nwid[k]) / 2 + 28) + (k === nw ? DR.pgap : 0));
  const left = Math.max(tw, nwid[0]) / 2, right = Math.max(tw, nwid[nwid.length - 1]) / 2;
  const total = left + cs[cs.length - 1] + right;
  const c0 = Math.max(0, Math.round((room - total) / 2)) + left;
  const xs = cs.map((c) => Math.round(c0 + c - tw / 2));
  const px = Math.round((xs[nw - 1] + tw + xs[nw]) / 2);
  return { nw, nd, xs, px, y, names, tw };
}
/* a decimal written into the five-place strip (Tens, Ones, Tenths, Hundredths, Thousandths) */
function drStrip(s: string) {
  const [w = "", d] = String(s ?? "").split(".");
  const ws = w.slice(-2);
  const cells = [ws.length === 2 ? ws[0] : "", ws.length ? ws[ws.length - 1] : ""].concat([0, 1, 2].map((j) => (d || "")[j] || ""));
  return { cells, point: d !== undefined };
}
/* free play's tiles (Tens, Ones, then three places) as a decimal */
function drFreeDec(d: string[]) {
  const whole = Number((d[0] || "") + (d[1] || "0"));
  let last = -1;
  for (let j = 0; j < 3; j++) if (d[2 + j] !== "") last = j;
  return last < 0 ? String(whole) : whole + "." + d.slice(2, 3 + last).map((x) => x || "0").join("");
}

/* drawing helpers, called (never mounted) */
function drTile(key: any, x: number, y: number, ch: string, o: any, C: any) {
  const w = o.w || DR.tw, h = o.h || DR.th;
  return (
    <g key={key} pointerEvents="none">
      <rect x={x} y={y} width={w} height={h} rx={16} fill={o.lit ? tint(CONTENT.ten, 0.82) : "#FFFFFF"}
        stroke={o.lit ? CONTENT.ten : o.dash ? C.rule : shade(C.rule, 0.25)} strokeWidth={o.lit ? 4 : 2.5}
        strokeDasharray={o.dash ? "10 8" : undefined} filter="url(#fShadowSoft)" />
      {ch ? <text x={x + w / 2} y={y + h / 2 + 25} textAnchor="middle" fontSize={T.display} fontWeight={700}
        fill={ch === "0" ? "#767676" : o.ink}>{ch}</text> : null}
    </g>
  );
}
function drPoint(key: any, px: number, y: number, on: boolean, C: any, h = DR.th) {
  return on ? <circle key={key} cx={px} cy={y + h - 18} r={12} fill={C.ink} pointerEvents="none" />
    : <circle key={key} cx={px} cy={y + h - 18} r={12} fill="none" stroke={C.rule} strokeWidth={2.5} strokeDasharray="5 5" pointerEvents="none" />;
}
/* a place name; lit, it sits in an amber box with room for Devanagari and Gujarati ink (1.09 em over the baseline, 0.40 under) */
function drNameAt(key: any, cx: number, y: number, name: string, lit: boolean, C: any, fs = T.label) {
  const lw = drEm(name) * fs;
  return (
    <g key={key} pointerEvents="none">
      {lit && <rect x={cx - lw / 2 - 16} y={y - Math.round(fs * 1.25)} width={lw + 32} height={Math.round(fs * 1.8)} rx={12} fill={tint(CONTENT.ten, 0.75)} stroke={CONTENT.ten} strokeWidth={3} />}
      <text x={cx} y={y} textAnchor="middle" fontSize={fs} fontWeight={lit ? 700 : 600} fill={lit ? shade(CONTENT.ten, 0.45) : C.ink}>{name}</text>
    </g>
  );
}
function drChipFace(x: number, y: number, w: number, h: number, label: string, o: any, C: any) {
  const fs = o.fs || T.label;
  return (
    <g>
      {o.toy && <rect x={x} y={y + EDGE} width={w} height={h} rx={18} fill={shade(C.rule, 0.08)} />}
      <rect className={o.ctl ? "c4-face" : undefined} x={x} y={y} width={w} height={h} rx={18} fill={o.fill || "url(#gKey)"} stroke={o.stroke || C.rule} strokeWidth={o.sw || 2} strokeDasharray={o.dash ? "8 6" : undefined} />
      <text x={x + w / 2} y={y + h / 2 + Math.round(fs * 0.34)} textAnchor="middle" fontSize={fs} fontWeight={600} fill={o.ink || C.ink}>{label}</text>
    </g>
  );
}

/* the start page: 46.29 on its tiles with its reading with and under it */
function StartArt({ box, C, lang = "en", tx = (v: any) => v }: any) {
  const cols = drCols(2, 2, box.w, 10, tx);
  const ink = shade(CONTENT.hundred, 0.25);
  const chips = drRead("46.29", false).A.map((c) => drLab(c, lang, tx));
  const L = drLay(chips, 0, T.label, 16);
  const lw = L[L.length - 1].x + L[L.length - 1].w, dx = Math.round((box.w - lw) / 2);
  return (
    <g>
      {"4629".split("").map((ch, k) => drTile("t" + k, cols.xs[k], cols.y, ch, { ink }, C))}
      {drPoint("pt", cols.px, cols.y, true, C)}
      {cols.names.map((nm: string, k: number) => drNameAt("n" + k, cols.xs[k] + DR.tw / 2, cols.y + DR.ny, tx(nm), false, C))}
      {L.map((e: any, k: number) => <g key={"c" + k}>{drChipFace(dx + e.x, 236, e.w, 72, chips[k], { fill: tint(CONTENT.one, 0.85), stroke: CONTENT.one, ink: shade(CONTENT.one, 0.25) }, C)}</g>)}
    </g>
  );
}

/* One entry per phase = one mount. Items of this tool:
   kind "and" | "point" | "both": a reading built from word chips (rows: the rows the child builds, top = with and,
        bottom = with point; bank: the chips on offer, each a stamp that can be used again; given: the top row already
        built; first: the row that starts live; answer: the reading in words, "top|bottom" when both; near: the misconception)
   kind "write": a decimal typed on the pad from its words (words: the tray; place: 1 tenths, 2 hundredths, 3 thousandths) */
const PHASES = [
  {
    n: 1,
    concept: "Reading with and",
    conceptId: "M1.S2.T4.C15", objectiveIds: ["O5"],
    says: ["Say the whole number, then and. Which place is the last digit in?"],
    steps: [{ say: "Tap Read with and to read 46.29 word by word.", on: "read-and", hint: "The Read with and key is at the bottom." }],
    stepHold: 2600,
    ladder: ["Name the place of the last digit to end the reading.", "Say the whole number, and, the number after the point, then the last place."],
    closing: "The last digit's place always ends a reading with and.",
    learned: "You learned: say and for the point, then name the last digit's place.",
    traceback: "The digits after the point light together under one bracket, the place name under the last tile lights, and the right reading is laid out word by word.",
    items: [
      { qid: "M1.S2.T4.C15:DR1", kind: "and", rows: "and", dec: "312.46", pad: "enter", winMs: 3000,
        bank: ["forty-six", "and", "tenths", "three hundred twelve", "zero", "six", "hundredths", "four"],
        answer: "three hundred twelve and forty-six hundredths", near: "three hundred twelve and forty-six tenths",
        say: "Read 312.46 with and: tap its words into the row, then press Enter.", ask: "Read 312.46 with and",
        miss: "Which digit comes last after the point?" },
      { qid: "M1.S2.T4.C15:1", kind: "and", rows: "and", dec: "4.3", pad: "enter", winMs: 3000,
        bank: ["tenths", "four", "thirty", "hundredths", "zero", "and", "three"],
        answer: "four and three tenths", near: "four and three",
        say: "Now read 4.3 with and.", ask: "Now read 4.3 with and",
        miss: "Say the name of the place the 3 is in." },
      { qid: "M1.S2.T4.C15:4", kind: "and", rows: "and", dec: "106.72", pad: "enter", winMs: 3000,
        bank: ["seventy-two", "hundredths", "one hundred six", "zero", "and", "seven", "two", "tenths"],
        answer: "one hundred six and seventy-two hundredths", near: "one hundred six and seven two hundredths",
        say: "How is 106.72 read with and?", ask: "Read 106.72 with and",
        miss: "Read the two digits after the point as one number." },
    ],
  },
  {
    n: 2,
    concept: "Reading with point",
    conceptId: "M1.S2.T4.C16", objectiveIds: ["O5"],
    says: ["Now say point, and one digit at a time. Both ways are right."],
    steps: [{ say: "Tap Read with point to read 46.29 the other way.", on: "read-point", hint: "Find the Read with point key at the bottom." }],
    stepHold: 2600,
    ladder: ["Say point, then one word for each digit in order.", "Read the whole number, say point, then say each digit after it, one by one."],
    closing: "Both ways are right, and with point each digit gets its own word.",
    learned: "You learned: with point, each digit after the point is said alone.",
    traceback: "Each digit after the point lights in turn, a zero too, and the right reading is laid out one word per digit.",
    items: [
      { qid: "M1.S2.T4.C16:DR2", kind: "point", rows: "point", dec: "9.305", pad: "enter", winMs: 3000,
        given: ["nine", "and", "three hundred five", "thousandths"],
        bank: ["three", "point", "nine", "three hundred five", "zero", "thousandths", "five", "and"],
        answer: "nine point three zero five", near: "nine point three hundred five",
        say: "The top row reads 9.305 with and, so build its reading with point below.", ask: "Read 9.305 with point",
        miss: "With point, the digits after it are never joined into one number." },
      { qid: "M1.S2.T4.C16:2", kind: "point", rows: "point", dec: "27.58", pad: "enter", winMs: 3000,
        given: ["twenty-seven", "and", "fifty-eight", "hundredths"],
        bank: ["five", "twenty-seven", "zero", "fifty-eight", "point", "hundredths", "eight", "and"],
        answer: "twenty-seven point five eight", near: "twenty-seven point fifty-eight",
        say: "How is 27.58 read with point?", ask: "Read 27.58 with point",
        miss: "Look again at the two digits after the point." },
      { qid: "M1.S2.T4.C16:8", kind: "both", rows: "both", dec: "30.04", pad: "enter", winMs: 3000, first: "A",
        bank: ["point", "four", "thirty", "zero", "three", "and", "hundredths", "tenths"],
        answer: "thirty and four hundredths|thirty point zero four", near: "thirty and four hundredths|thirty point four",
        say: "Say 30.04 both ways, tapping a row's name to work in it.", ask: "Read 30.04 both ways",
        miss: "The and row ends on a place name; the point row says every digit.",
        ladder: ["In the and row name the last place, and in the point row say the zero too.",
          "With and, the digits after the point are one number; with point, each is a word."] },
    ],
  },
  {
    n: 3,
    concept: "When the whole number part is zero",
    conceptId: "M1.S2.T4.C17", objectiveIds: ["O5"],
    says: ["The whole number part is zero. Say it both ways."],
    steps: [
      { say: "Tap Read with and to read 0.803.", on: "read-and", hint: "Start with the key at the bottom." },
      { say: "Flip the Zero and switch to put zero and in front.", on: "zero-and", hint: "The switch sits left of the key." },
      { say: "Now the same key reads it with point.", on: "read-point", hint: "Tap the key again: it has a new name." },
    ],
    stepHold: 2600,
    /* the phase's rungs serve C17:6 only: DR3 and C17:3 carry their own */
    ladder: ["Add the name of the last digit's place.", "The last digit is in the third place after the point; say that place's name."],
    closing: "A zero whole part may be read with zero and, or without it.",
    learned: "You learned: a zero whole part may be read with zero and, or without.",
    traceback: "The zero whole part and the digits after the point light, the last place name lights, and the right readings are laid out.",
    items: [
      { qid: "M1.S2.T4.C17:DR3", kind: "both", rows: "both", dec: "0.26", pad: "enter", winMs: 3000, first: "A",
        bank: ["two", "zero", "twenty-six", "point", "and", "six", "hundredths", "tenths"],
        answer: "twenty-six hundredths|zero point two six", near: "twenty-six|zero point two six",
        say: "Read 0.26 in both ways, with and on top and with point below.", ask: "Read 0.26 both ways",
        miss: "Each row ends in its own way: look at both.",
        ladder: ["Name the last place in the and row, then give each digit a word below.",
          "With point say zero, point, then each digit; with and end on the last place."] },
      { qid: "M1.S2.T4.C17:3", kind: "point", rows: "point", dec: "0.9", pad: "enter", winMs: 3000,
        bank: ["nine", "point", "ninety", "zero", "and", "tenths"],
        answer: "zero point nine", near: "point nine",
        say: "How is 0.9 read with point?", ask: "Read 0.9 with point",
        miss: "Start with the whole number part, even when it is zero.",
        ladder: ["Say the whole number part, then the word point.", "With point there is no place name: the digit stands alone."] },
      { qid: "M1.S2.T4.C17:6", kind: "and", rows: "and", dec: "0.415", pad: "enter", winMs: 3000,
        bank: ["thousandths", "four hundred fifteen", "zero", "and", "four", "one", "five", "hundredths"],
        answer: "four hundred fifteen thousandths", near: "four hundred fifteen",
        say: "Read 0.415 with and.", ask: "Read 0.415 with and",
        miss: "The three digits after the point make one number." },
    ],
  },
  {
    n: 4,
    concept: "From words to a decimal",
    conceptId: "M1.S2.T4.C18", objectiveIds: ["O6"],
    says: ["Hundredths need two places after the point. Which place is empty?"],
    steps: [
      { say: "Tap fifteen to write it before the point.", on: "word-whole", hint: "Look at the start of the word row." },
      { say: "Tap the word and: it becomes the point.", on: "word-and", hint: "It is the short word after fifteen." },
      { say: "Tap hundredths: it needs two places after the point.", on: "word-place", hint: "It is the word at the end of the row." },
      { say: "Tap four to write it in the hundredths place.", on: "word-num", hint: "Find the word just before hundredths." },
    ],
    stepHold: 2600,
    /* the phase's rungs serve DR4 only: the other two carry their own */
    ladder: ["Thousandths need three places after the point.", "Write the last digit where the last word says, then check the places before it."],
    closing: "Every empty place between the point and the last digit gets a 0.",
    learned: "You learned: zeros hold the empty places after the point.",
    traceback: "The place named by the last word lights, the places before it light one by one, and the right decimal is laid out with a grey 0 in each empty place.",
    items: [
      { qid: "M1.S2.T4.C18:DR4", kind: "write", words: ["eight", "and", "nineteen", "thousandths"], place: 3,
        answer: "8.019", near: "8.19", winMs: 3000,
        say: "Write eight and nineteen thousandths as a decimal.", ask: "8 and 19 thousandths",
        miss: "Look at the last word: which place does it name?" },
      { qid: "M1.S2.T4.C18:5", kind: "write", words: ["sixty", "and", "five", "tenths"], place: 1,
        answer: "60.5", near: "60.05", winMs: 3000,
        say: "Now type sixty and five tenths with its point.", ask: "60 and 5 tenths",
        miss: "Which place does the word tenths name?",
        ladder: ["Tenths need just one place after the point.", "Put the last digit where the last word says, then look at each place before it."] },
      { qid: "M1.S2.T4.C18:7", kind: "write", words: ["twelve", "and", "six", "hundredths"], place: 2,
        answer: "12.06", near: "12.6", winMs: 3000,
        say: "Last one, twelve and six hundredths, as a decimal.", ask: "12 and 6 hundredths",
        miss: "Find the place that hundredths names on the strip.",
        ladder: ["Count two places after the point for hundredths.", "Find where the last word puts the last digit, then look back to the point."] },
    ],
  },
];

/* phase 4: the first rung for a decimal typed with a 0 in front of its whole number (each in TR); DR_MISS keeps the plan's */
const DR_ZERO: any = { "M1.S2.T4.C18:DR4": "Write it with no 0 in front of 8.", "M1.S2.T4.C18:5": "Write it with no 0 in front of 60.",
  "M1.S2.T4.C18:7": "Write it with no 0 in front of 12." };
const DR_MISS: any = {};

/* the win line of each question: one literal sentence a question */
function drWin(api: any, qid: string) {
  switch (qid) {
    case "M1.S2.T4.C15:DR1": api.say("Yes, three hundred twelve and forty-six hundredths."); break;
    case "M1.S2.T4.C15:1": api.say("Yes, four and three tenths."); break;
    case "M1.S2.T4.C15:4": api.say("Yes, one hundred six and seventy-two hundredths."); break;
    case "M1.S2.T4.C16:DR2": api.say("Yes, nine point three zero five, one word a digit."); break;
    case "M1.S2.T4.C16:2": api.say("Yes, twenty-seven point five eight."); break;
    case "M1.S2.T4.C16:8": api.say("Yes, both readings say 30.04."); break;
    case "M1.S2.T4.C17:DR3": api.say("Yes, both ways say 0.26."); break;
    case "M1.S2.T4.C17:3": api.say("Yes, zero point nine."); break;
    case "M1.S2.T4.C17:6": api.say("Yes, four hundred fifteen thousandths."); break;
    case "M1.S2.T4.C18:DR4": api.say("Yes, 8.019, with a 0 in the empty tenths place."); break;
    case "M1.S2.T4.C18:5": api.say("Yes, 60.5, with no empty place after the point."); break;
    case "M1.S2.T4.C18:7": api.say("Yes, 12.06 is twelve and six hundredths."); break;
    default: break;
  }
}

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* judge: a reading row by row (a zero whole part with or without "zero and"); a decimal exactly as written */
const judge = (item: any, v: any) => {
  if (item.kind === "write") return String(v ?? "").trim() === String(item.answer);
  const want = String(item.answer).split("|"), got = String(v ?? "").split("|");
  if (want.length !== got.length) return false;
  const rs = drRowsOf(item);
  return want.every((w, k) => drRowOk(item, w, got[k], rs[k] === "A"));
};
/* oracle: every answer re-derived from the digits (or the words) by a number namer of its own */
const oracle = () => {
  const ones = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen",
    "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
  const tens = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];
  const nm = (x: number): string => (x < 20 ? ones[x] : x < 100 ? tens[Math.floor(x / 10)] + (x % 10 ? "-" + ones[x % 10] : "")
    : ones[Math.floor(x / 100)] + " hundred" + (x % 100 ? " " + nm(x % 100) : ""));
  const back: any = {};
  for (let x = 0; x < 1000; x++) back[nm(x)] = x;
  const plc = ["tenths", "hundredths", "thousandths"];
  const can = (s: string, pool: string[]): boolean => !s || pool.some((w) => (s === w || s.indexOf(w + " ") === 0) && can(s.slice(w.length).trim(), pool));
  return PHASES.every((p: any) => p.items.every((it: any) => {
    if (it.kind === "write") {
      const [w, a, f, pl] = it.words;
      const k = plc.indexOf(pl) + 1, fr = back[f];
      if (a !== "and" || k < 1 || back[w] === undefined || fr === undefined || String(fr).length > k) return false;
      return String(back[w]) + "." + String(fr).padStart(k, "0") === it.answer && k === it.place && it.near !== it.answer;
    }
    const [w, d] = String(it.dec).split(".");
    const andR = (Number(w) ? nm(Number(w)) + " and " : "") + nm(Number(d)) + " " + plc[d.length - 1];
    const ptR = nm(Number(w)) + " point " + d.split("").map((c) => ones[Number(c)]).join(" ");
    const want = it.rows === "both" ? [andR, ptR] : it.rows === "and" ? [andR] : [ptR];
    const pool = (it.bank || []).concat(["zero", "and"]);
    return want.join("|") === it.answer && want.every((r) => can(r, pool)) && (!it.given || it.given.join(" ") === andR);
  }));
};
/* the most likely wrong answer (the misconception); judge must reject it */
const nearMiss = (item: any) => item.near;
/* the forms of an answer that no question, hint or ladder line may print */
const answerForms = (item: any) => (item.kind === "write" ? [String(item.answer), speakable(item.answer)]
  : String(item.answer).split("|").flatMap((w, k) => (drRowsOf(item)[k] === "A" && /^0\./.test(String(item.dec)) ? [w, "zero and " + w] : [w])));
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => item.answer;
/* the slot shows a typed decimal, kept to the strip; a reading lives in the rows */
const format = (v: any) => (/[a-z]/i.test(String(v ?? "")) ? "" : drClip(v));

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => (T.state().stage === "demo" ? HOOK.demo && HOOK.demo() : T.submit(item.answer));
/* the agent's answer(): a reading is set into the rows as a child would; a decimal is typed with its point */
const answer = (item: any, v: any) => (item.pad === "enter" ? (HOOK.set ? HOOK.set(v) : false) : HOOK.type ? HOOK.type(v) : undefined);
/* Enter does the rest (undefined), also in a guide step, so the agent's check() reaches api.onEnter */
const check = () => undefined;

/* a switch that reports its state (aria-pressed); aria-disabled while it cannot act */
function DRToggle({ id, x, y, w, h, on, enabled = true, onPress, label, text, C }: any) {
  const p = usePress(onPress, enabled);
  const dy = p.down ? EDGE : 0;
  return (
    <g className={"c4-ctl" + (p.down ? " is-down" : "")} data-control={id} role="button" aria-label={label} aria-pressed={on ? "true" : "false"}
      aria-disabled={enabled ? undefined : "true"} tabIndex={0} {...p.bind()} onKeyDown={p.keys}>
      <rect x={x} y={y + EDGE} width={w} height={h} rx={18} fill={shade(C.rule, 0.08)} />
      <rect className="c4-face" x={x} y={y + dy} width={w} height={h} rx={18} fill="url(#gKey)" stroke={on ? C.accent : C.rule} strokeWidth={on ? 3 : 2} />
      <rect x={x + 16} y={y + h / 2 - 17 + dy} width={60} height={34} rx={17} fill={on ? C.accent : tint(C.rule, 0.4)} stroke={on ? shade(C.accent, 0.2) : C.rule} strokeWidth={2} />
      <circle cx={x + (on ? 59 : 33)} cy={y + h / 2 + dy} r={13} fill="#FFFFFF" stroke={shade(C.rule, 0.2)} strokeWidth={1.5} />
      <text x={x + 92} y={y + h / 2 + 11 + dy} fontSize={T.label} fontWeight={600} fill={C.ink}>{text}</text>
    </g>
  );
}

/* ── the working area: 64,108, 1472 x 520 (keyOnly), origin at its top-left; nothing under box.key ── */
function Work({ n, item, index, stage, wrong, typed, api, stepOn, box, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const lab = (c: string) => drLab(c, lang, tx);
  const tl = useTimeline();
  const free = stage === "free";
  /* a phase opens on "teach" for one frame before "demo": draw the warm-up then too (PATTERNS §18) */
  const demoSt = stage === "demo" || stage === "teach";
  const it: any = (!free && item) || {};
  const write = !free && n === 4;
  const done = stage === "win" || stage === "idle";
  const bw = box ? box.w : W.w;
  const kx = box && box.key ? box.key.x - 12 : bw;
  const BLUE = shade(CONTENT.hundred, 0.25), GREEN = shade(CONTENT.one, 0.25), AMBER = CONTENT.ten, AMBER_INK = shade(CONTENT.ten, 0.45);

  const sk = free ? "free" : n + ":" + index + ":" + (demoSt ? "d" : "q");
  const fresh = () => ({ sk, A: demoSt && n === 2 ? drRead(DR_EX[2], false).A : [] as string[], B: [] as string[],
    act: it.first || (it.rows === "point" ? "B" : "A"), demo: null as any, judged: null as any, zero: false,
    w4: {} as any, moving: "", d: ["4", "6", "2", "9", ""] });
  const [raw, setRaw] = useState<any>(fresh);
  const st = raw.sk === sk ? raw : fresh();
  const S = useRef<any>(st);
  S.current = st;
  const put = (patch: any) => setRaw((p: any) => {
    const b = p.sk === sk ? p : fresh();
    return { ...b, ...(typeof patch === "function" ? patch(b) : patch) };
  });
  const busy = useRef(false);      /* a correction is running */
  const playing = useRef(false);   /* an act is being performed */
  const lastKey = useRef(0);
  /* a second tap on the SAME piece within 350 ms is the same tap (a double tap never adds or takes out twice); only an
     accepted tap stamps the time, so a refused one never extends the guard */
  const lastTap = useRef({ id: "", t: 0 });
  const recent = (id: string) => lastTap.current.id === id && Date.now() - lastTap.current.t < 350;
  const stamp = (id: string) => { lastTap.current = { id, t: Date.now() }; };
  /* when an act ends, the keyboard goes on from the key that started it, or the next live one */
  const focusCtl = (id: string) => setTimeout(() => { const el: any = document.querySelector('[data-zone="work"] [data-control="' + id + '"]'); if (el && el.focus) el.focus(); }, 60);
  /* a chip used by key (drag.keys) never keeps the focus, or the next Enter would use it again: Enter then sends the rows */
  const dropFocus = () => { const a: any = document.activeElement; if (a && a.blur && a.closest && a.closest('[data-zone="work"]')) a.blur(); };

  /* the decimal in play and its tiles (phases 1-3 and free play) */
  const dec = free ? drFreeDec(st.d) : demoSt && n < 4 ? DR_EX[n] : String(it.dec || "0.0");
  const [w0, d0 = ""] = dec.split(".");
  const cols = free ? drCols(2, 3, kx, 0, tx) : drCols(Math.max(1, w0.length), Math.max(1, d0.length), kx, 0, tx);
  const rowsNeeded = drRowsOf(it);
  const editable = (r: string) => !free && !demoSt && !write && rowsNeeded.includes(r);
  const showRow = (r: string) => free || (demoSt ? r === "A" || n > 1 : editable(r) || (r === "A" && !!it.given));
  const liveRows = stage === "ask" && !write;
  /* the rows sit under the bank when there is one (a question), at its place when there is none (the guide steps, free play) */
  const hasBank = (liveRows || done) && !write && !free && !demoSt && (it.bank || []).length > 0;
  const rowBase = hasBank ? DR.bk + DR.bh + DR.rgap : DR.bk;
  const rowTop = (r: string) => (r === "B" && showRow("A") ? rowBase + DR.rh + DR.rgap : rowBase);

  /* ── phase 4's strip (Tens, Ones, Tenths, Hundredths, Thousandths), laid out for the keypad-open width ── */
  const c4 = drCols(2, 3, DR.w4, P4.y, tx, P4.tw, P4.fs);
  const ex4: any = demoSt && n === 4 ? DR_EX4 : it;
  const roles = ["whole", "and", "num", "place"];
  const trayLabels = write || (demoSt && n === 4) ? (ex4.words || []).map((w: string) => lab(w)) : [];
  const trayL = drLay(trayLabels, 0, P4.fs, 18);
  const trayW = trayL.length ? trayL[trayL.length - 1].x + trayL[trayL.length - 1].w : 0;
  const tray = trayL.map((e: any, k: number) => ({ ...e, x: e.x + Math.round((DR.w4 - trayW) / 2), y: P4.ty, k, role: roles[k], c: trayLabels[k], word: (ex4.words || [])[k] }));

  /* ── acts performed on screen ── */
  const ptsFor = (r: string, chips: string[]) => {
    /* the hand points at the lower part of each tile, so it stays inside the working area */
    const ty = cols.y + DR.th - 20, nw = cols.nw;
    const mid = (a: number, b: number) => Math.round((cols.xs[a] + cols.xs[b] + DR.tw) / 2);
    const whole = { x: mid(0, nw - 1), y: ty }, pt = { x: cols.px, y: ty };
    if (chips.length === 1) return [whole];
    if (r === "B") return [whole, pt].concat(d0.split("").map((_, j) => ({ x: cols.xs[nw + j] + DR.tw / 2, y: ty })));
    const tail = [{ x: mid(nw, nw + d0.length - 1), y: ty }, { x: cols.xs[nw + d0.length - 1] + DR.tw / 2, y: DR.ny - 12 }];
    return chips.length === 2 ? tail : [whole, pt].concat(tail);
  };
  /* Read with and / Read with point: the hand points at each part as its word lands in the row */
  const readRow = (r: string, on: string) => {
    if (playing.current) return;
    const R = drRead(dec, r === "A" && free ? st.zero : false);
    const chips = r === "A" ? R.A : R.B;
    playing.current = true;
    put({ [r]: [] });
    api.act({ tool: "hand", moves: "tap", at: ptsFor(r, chips), onPoint: (i: number) => put({ [r]: chips.slice(0, i + 1) }) }).then((ok: boolean) => {
      playing.current = false;
      if (!ok) return;
      put({ [r]: chips });
      api.sfx.settle();
      if (demoSt) api.did(on);
      focusCtl(demoSt && n === 3 && on === "read-and" ? "zero-and" : on);
    });
  };
  /* the Zero and switch: puts "zero and" in front of the reading with and, or takes it away */
  const flipZero = (on: string) => {
    const A = S.current.A, hasZero = A[0] === "zero" && A[1] === "and", isOn = free ? !!S.current.zero : hasZero;
    if (demoSt && isOn) { api.did(on); return; }
    api.sfx.tick();
    put({ A: isOn ? (hasZero ? A.slice(2) : A) : A.length && !hasZero ? ["zero", "and", ...A] : A, zero: !isOn });
    if (demoSt) { api.did(on); focusCtl("read-point"); }
  };
  /* phase 4's guide steps: the hand carries a word of the tray onto the strip */
  const carry4 = (role: string) => {
    if (playing.current) return;
    const id = "word-" + role;
    if (S.current.w4[role]) { api.did(id); return; }
    const e = tray.find((t: any) => t.role === role);
    if (!e) return;
    const pc = c4.xs[1 + ex4.place] + P4.tw / 2;
    const tgt = role === "whole" ? { x: Math.round((c4.xs[0] + c4.xs[1] + P4.tw) / 2), y: c4.y + P4.th / 2 }
      : role === "and" ? { x: c4.px, y: c4.y + P4.th - 18 } : role === "place" ? { x: pc, y: P4_NY - 14 } : { x: pc, y: c4.y + P4.th / 2 };
    const hold = (
      <g>
        <rect x={-e.w / 2} y={-DR.bh / 2} width={e.w} height={DR.bh} rx={18} fill="url(#gKey)" stroke={C.accent} strokeWidth={3} />
        <text y={Math.round(P4.fs * 0.34)} textAnchor="middle" fontSize={P4.fs} fontWeight={600} fill={C.ink}>{e.c}</text>
      </g>
    );
    playing.current = true;
    put({ moving: role });
    api.act({ tool: "hand", moves: "carry", from: { x: e.x + e.w / 2, y: e.y + DR.bh - 10 }, at: [tgt], hold,
      onPoint: () => put((b: any) => ({ w4: { ...b.w4, [role]: true } })) }).then((ok: boolean) => {
      playing.current = false;
      put((b: any) => ({ moving: "", w4: ok ? { ...b.w4, [role]: true } : b.w4 }));
      if (!ok) return;
      api.sfx.settle();
      if (role !== "num") { api.did(id); focusCtl("word-" + ({ whole: "and", and: "place", place: "num" } as any)[role]); return; }
      tl.run([[380, () => { put((b: any) => ({ w4: { ...b.w4, fill: true } })); api.sfx.settle(); }]], () => api.did(id));
    });
  };
  const doAct = (on: string) => {
    if (on === "read-and") readRow("A", on);
    else if (on === "read-point") readRow("B", on);
    else if (on === "zero-and") flipZero(on);
    else if (on.indexOf("word-") === 0) carry4(on.slice(5));
  };
  /* every tap on a control: a 400 ms guard; during a guide step the awaited act is done, any other is reported */
  const press = (on: string) => {
    const t = Date.now();
    if (t - lastKey.current < 400) return;
    lastKey.current = t;
    if (demoSt) { if (on !== stepOn) { api.did(on); return; } doAct(on); return; }
    if (free) doAct(on);
  };

  /* ── the questions of phases 1-3: chips into the rows (each act wipes the correction's answer lane) ── */
  const canAct = () => !busy.current && !playing.current && liveRows;
  const fits = (chips: string[]) => { const L = drLay(chips.map((c) => lab(c)), DR.lane + 12); return !L.length || L[L.length - 1].x + L[L.length - 1].w <= bw - 12; };
  const dropWord = (word: string, at: any) => {
    if (!canAct()) return;
    const s = S.current;
    let r = s.act, pos = -1;
    if (at) {
      /* a drag lands in the row it is dropped on, between the chips it falls between; dropped anywhere else it goes back */
      const inRow = (q: string) => editable(q) && at.y >= rowTop(q) - 8 && at.y <= rowTop(q) + DR.rh + 4;
      if (inRow("A")) r = "A"; else if (inRow("B")) r = "B"; else return;
      pos = drLay(s[r].map((c: string) => lab(c)), DR.lane + 12).filter((e: any) => e.x + e.w / 2 < at.x).length;
    }
    if (!editable(r) || (!at && recent("w:" + word))) return;
    const row = s[r].slice();
    row.splice(pos < 0 ? row.length : pos, 0, word);
    if (!fits(row)) return;
    if (!at) stamp("w:" + word);
    api.sfx.tick();
    put({ [r]: row, act: r, demo: null });
  };
  /* a row's chip: a tap (or Enter) takes it out, a drag moves it within the rows, a drag anywhere else takes it out */
  /* the guard is the row's, not the chip's: once a chip is out the next one slides under the same finger, so a double tap
     keyed by index took out two (measured); only an accepted tap stamps it */
  const takeOut = (r: string, k: number) => {
    if (!canAct() || recent("row" + r)) return;
    stamp("row" + r);
    put((b: any) => ({ [r]: b[r].filter((_: any, j: number) => j !== k), act: r, demo: null }));
  };
  const moveChip = (r: string, k: number, at: any) => {
    if (!at) { takeOut(r, k); return; }
    if (!canAct()) return;
    const inRow = (q: string) => editable(q) && at.y >= rowTop(q) - 8 && at.y <= rowTop(q) + DR.rh + 4;
    const to = inRow("A") ? "A" : inRow("B") ? "B" : "";
    const s = S.current, word = s[r][k];
    if (word === undefined) return;
    const from = s[r].filter((_: any, j: number) => j !== k);
    if (!to) { put({ [r]: from, act: r, demo: null }); return; }
    const base = to === r ? from : s[to];
    const pos = drLay(base.map((c: string) => lab(c)), DR.lane + 12).filter((e: any) => e.x + e.w / 2 < at.x).length;
    const row = base.slice();
    row.splice(pos, 0, word);
    if (!fits(row)) return;
    api.sfx.tick();
    put(to === r ? { [r]: row, act: r, demo: null } : { [r]: from, [to]: row, act: to, demo: null });
  };
  const pickRow = (r: string) => { if (canAct()) put({ act: r, demo: null }); };
  const drag = useDrag((p: any, at: any, moved: boolean) => {
    if (!p) return;
    const pt = moved && at && isFinite(at.x) && isFinite(at.y) ? at : null;
    if (p.from) moveChip(p.from, p.k, pt); else dropWord(p.word, pt);
    dropFocus();
  });
  /* a nudge said with api.say stays until something replaces it (PATTERNS §18): the child's next change to a row brings
     the question back */
  const nudged = useRef(false);
  useEffect(() => {
    if (!nudged.current || !liveRows || stage !== "ask") return;
    nudged.current = false;
    api.say(it.say);
  }, [(st.A || []).join(" "), (st.B || []).join(" ")]);   /* by content: an untouched question builds fresh rows on every render */
  const valRead = (s: any) => (rowsNeeded.every((r) => s[r].length) ? rowsNeeded.map((r) => s[r].join(" ")).join("|") : null);
  const submitRows = () => {
    if (busy.current || playing.current) return;
    const v = valRead(S.current);
    /* Enter on an empty or half-built reading says what is missing (r64 leaves this hint to the tool) */
    if (!v) {
      nudged.current = true;
      if (rowsNeeded.length > 1 && (S.current.A.length || S.current.B.length)) api.say("Fill both rows.");
      else api.say("Build the reading first.");
      return;
    }
    if (v === S.current.judged) return;
    S.current = { ...S.current, judged: v };
    put({ judged: v });
    api.answerReady(false);
    api.submit(v);
  };
  /* Enter: in a guide step it performs the step (400 ms guard: two Enters never finish two steps); at a reading question
     it sends the rows; a typed decimal is the pad's */
  const enterStep = () => {
    const t = Date.now();
    if (t - lastKey.current < 400) return;
    lastKey.current = t;
    doAct(stepOn);
  };
  api.onEnter(demoSt && stepOn ? enterStep : liveRows ? submitRows : null);
  const vNow = liveRows ? valRead(st) : null;
  useEffect(() => { if (liveRows) api.answerReady(!!vNow && vNow !== st.judged); }, [vNow, st.judged, stage]);

  /* the dev driver and the agent */
  HOOK.demo = () => (stepOn ? doAct(stepOn) : undefined);
  HOOK.set = (v: any) => {
    if (!liveRows || busy.current) return false;
    const parts = String(v ?? "").split("|");
    if (parts.length !== rowsNeeded.length) return false;
    const rows = parts.map((p) => drChipsOf(p, drPool(it)));
    if (rows.some((r) => !r)) return false;
    const patch: any = { demo: null };
    rowsNeeded.forEach((r, k) => { patch[r] = rows[k]; });
    S.current = { ...S.current, ...patch };
    put(patch);
    return true;
  };
  HOOK.type = (v: any) => {
    if (!write || stage !== "ask") return false;
    api.setTyped(drClip(String(v ?? "")));
    return true;
  };

  /* a typed decimal is kept to the strip's places; a 0 typed in front of the whole number makes this question's first rung
     its own line (the judging stays exact: "08.019" is still a miss) */
  useEffect(() => {
    if (!write || stage !== "ask") return;
    if (DR_MISS[it.qid] === undefined) DR_MISS[it.qid] = it.miss;
    const t0 = String(typed || "");   /* the leading-zero line only when the zeros in front are the one thing wrong */
    it.miss = /^0\d/.test(t0) && DR_ZERO[it.qid] && t0.replace(/^0+(?=\d)/, "") === String(it.answer) ? DR_ZERO[it.qid] : DR_MISS[it.qid];
    if (!typed) return;
    const c = drClip(typed);
    if (c !== String(typed)) api.setTyped(c);
  }, [typed, stage]);
  /* phase 4: the correction's decimal stays on the strip until the child types something new */
  useEffect(() => { if (write && st.demo && !busy.current && typed !== st.demo.typedAt) put({ demo: null }); }, [typed]);

  /* ── the traceback: light the places, then lay out the whole right answer ── */
  useEffect(() => {
    if (!wrong || stage !== "ask" || free) return;
    api.lock(true);
    busy.current = true;
    /* each step holds the lock again, so nothing typed during the correction lands */
    const setD = (d: any) => { api.lock(true); put((b: any) => ({ demo: { ...(b.demo || {}), ...d } })); };
    const steps: any[] = [[60, () => put({ demo: { tiles: [], model: 0, typedAt: typed } })]];
    if (write) {
      const pl = it.place, cards = String(it.answer).replace(".", "").length + 1;
      steps.push([500, () => setD({ label: 1 + pl })]);
      for (let j = 0; j < pl; j++) steps.push([420, () => setD({ tiles: Array.from({ length: j + 1 }, (_, q) => 2 + q) })]);
      for (let k = 1; k <= cards; k++) steps.push([240, () => setD({ model: k })]);
    } else {
      const nw = w0.length, nd = d0.length;
      const decCols = Array.from({ length: nd }, (_, j) => nw + j);
      const got = String(wrong.value ?? "").split("|"), want = String(it.answer).split("|");
      const bad = rowsNeeded.filter((r, k) => !drRowOk(it, want[k], got[k] ?? "", r === "A"));
      if (bad.includes("A")) {
        steps.push([480, () => setD({ tiles: decCols, bracket: true })]);
        steps.push([480, () => setD({ label: nw + nd - 1 })]);
      }
      if (bad.includes("B")) {
        const z = w0 === "0" ? [nw - 1] : [];
        steps.push([380, () => setD({ tiles: z, bracket: false, label: null })]);
        decCols.forEach((_, j) => steps.push([380, () => setD({ tiles: z.concat(decCols.slice(0, j + 1)) })]));
      }
      const count = drModel(it).reduce((a: number, g: string[]) => a + g.length, 0);
      for (let k = 1; k <= count; k++) steps.push([220, () => setD({ model: k })]);
    }
    tl.run(steps, () => { busy.current = false; api.lock(false); });
  }, [wrong]);
  /* a new question stops a correction still running */
  useEffect(() => () => { tl.stop(); if (busy.current) { busy.current = false; api.lock(false); } }, [index]);
  /* the win line */
  useEffect(() => { if (stage === "win" && !free) drWin(api, it.qid); }, [stage]);

  /* free play: a tap on a tile changes its digit; the readings are read again with the keys */
  const fpTile = (k: number) => {
    if (recent("tile" + k)) return;
    stamp("tile" + k);
    api.sfx.tick();
    put((b: any) => {
      const d = b.d.slice(), c = d[k];
      d[k] = k === 1 ? String((Number(c || "0") + 1) % 10) : k === 0 ? (c === "" ? "1" : c === "9" ? "" : String(Number(c) + 1))
        : c === "" ? "1" : c === "9" ? "0" : c === "0" ? "" : String(Number(c) + 1);
      return { d, A: [], B: [] };
    });
  };

  /* what the host and the agent read back (toolApi.getState) */
  api.share({ decimal: write ? (stage === "ask" ? drClip(typed || "") || null : null) : dec,
    readingAnd: st.A.join(" "), readingPoint: st.B.join(" "), zeroAnd: st.A[0] === "zero" && st.A[1] === "and",
    chips: st.A.length + st.B.length, answer: done ? (write ? typed || null : valRead(st)) : null, complete: stage === "idle" });

  /* ── drawing ── */
  const g = drag.drag;
  const demo = st.demo || {};
  /* the one invite hugs the key or chip it rings (x, y its centre; the runtime draws the ring 6 outside the box) */
  const inv = (x: number, y: number, w: number, h: number) => <Invite key="invite" x={x} y={y} w={w} h={h} rx={18} C={C} />;

  const rowName = (r: string, live: boolean) => {
    const y = rowTop(r), text = tx(r === "A" ? "with and" : "with point"), on = live && st.act === r;
    if (live) return (
      <Key key={"name" + r} id={r === "A" ? "row-and" : "row-point"} label={text} x={0} y={y} w={DR.nw} h={DR.rh} C={C}
        primary={on} onClick={() => pickRow(r)}>
        <text x={0} y={11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={on ? "#FFFFFF" : C.ink}>{text}</text>
      </Key>
    );
    return <text key={"name" + r} x={DR.nw / 2} y={y + DR.rh / 2 + 11} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={C.ink} pointerEvents="none">{text}</text>;
  };
  /* mode: own (the child's row; a tap on a chip takes it out) · given (already built) · win (green) */
  const lane = (r: string, chips: string[], mode: string) => {
    const y = rowTop(r), on = mode === "own" && st.act === r && liveRows;
    const labels = chips.map((c) => lab(c));
    const L = drLay(labels, DR.lane + 12);
    const sty = mode === "win" ? { fill: tint(CONTENT.one, 0.85), stroke: CONTENT.one, ink: GREEN } : mode === "given" ? { fill: tint(C.panel, 0.5), stroke: C.rule, ink: C.ink }
      : { fill: "#FFFFFF", stroke: shade(C.rule, 0.2), ink: C.ink };
    return (
      <g key={"row" + r}>
        <rect x={DR.lane} y={y} width={bw - DR.lane} height={DR.rh} rx={16} fill={on ? tint(C.panel, 0.45) : "#FFFFFF"}
          stroke={on ? C.accent : C.rule} strokeWidth={on ? 3 : 2} pointerEvents="none" />
        {L.map((e: any, k: number) => {
          const live = mode === "own" && liveRows, pay = { word: chips[k], from: r, k };
          return (
            <g key={r + k} {...(live ? { ...control("row" + r + "-" + (k + 1), tx("Take out") + " " + labels[k]), ...drag.bind(pay), ...drag.keys(pay) } : {})}>
              {live && <rect x={e.x} y={y} width={e.w} height={DR.rh} fill="transparent" />}
              {drChipFace(e.x, y + 4, e.w, DR.rh - 8, labels[k], live ? { ...sty, ctl: true } : sty, C)}
            </g>
          );
        })}
        {on && <rect x={(L.length ? L[L.length - 1].x + L[L.length - 1].w : DR.lane + 12) + 6} y={y + 14} width={4} height={44} rx={2} fill={C.accent} pointerEvents="none" />}
      </g>
    );
  };
  /* the correction's right reading(s), chip by chip, in green */
  const answerLane = (y: number) => {
    let x = DR.lane + 12, k = 0;
    const out: any[] = [];
    drModel(it).forEach((grp: string[], gi: number) => {
      if (gi) x += 36;
      grp.forEach((c: string) => {
        const cl = lab(c), w = drChipW(cl);
        if (k < demo.model) out.push(<g key={"m" + k}>{drChipFace(x, y, w, DR.ah, cl,{ fill: tint(CONTENT.one, 0.88), stroke: CONTENT.one, ink: GREEN }, C)}</g>);
        x += w + 10; k++;
      });
    });
    return (
      <g key="lane-answer" pointerEvents="none">
        <text x={DR.nw / 2} y={y + DR.ah / 2 + 11} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={GREEN}>{tx("Answer")}</text>
        {out}
      </g>
    );
  };
  const keyAt = (id: string, label: string, x: number, y: number, w: number) => (
    <Key key={"act-" + x} id={id} label={tx(label)} x={x} y={y} w={w} h={DR.bh} C={C} tone="key" onClick={() => press(id)}>
      <text y={Math.round(T.label * 0.34)} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={toneInk("key", C.ink)}>{tx(label)}</text>
    </Key>
  );
  const READ: any = { "read-and": "Read with and", "read-point": "Read with point" };

  /* ── Phase 4: from words to a decimal ── */
  if (write || (demoSt && n === 4)) {
    const plc = 1 + ex4.place;                                 /* the strip column of the place the last word names */
    const ans = demoSt ? DR_EX4.whole + "." + "0".repeat(DR_EX4.place - 1) + DR_EX4.num : String(it.answer);
    const full = drStrip(ans);
    let cells: string[], point: boolean, ink = BLUE, lit: number[] = [], label: any = null, caps = false, showAns = false;
    if (demoSt) {
      const w4 = st.w4, f = full.cells;
      cells = [w4.whole ? f[0] : "", w4.whole ? f[1] : "", ...[2, 3, 4].map((j) => (j === plc && w4.num ? f[j] : j < plc && w4.fill ? f[j] : ""))];
      point = !!w4.and;
      caps = !!w4.fill;
      label = w4.place ? plc : null;
    } else if (done) {
      cells = full.cells; point = true; ink = GREEN; label = plc; caps = true; showAns = true;
    } else if (st.demo) {
      const order = [0, 1, -1, 2, 3, 4].filter((j) => j < 0 || full.cells[j] !== "");
      cells = ["", "", "", "", ""];
      point = false;
      order.slice(0, demo.model || 0).forEach((j) => { if (j < 0) point = true; else cells[j] = full.cells[j]; });
      ink = GREEN; lit = demo.tiles || []; label = demo.label ?? null;
      caps = (demo.model || 0) >= order.length; showAns = caps;
    } else {
      const m = drStrip(drClip(typed || ""));
      cells = m.cells; point = m.point;
    }
    const lastNz = [4, 3, 2].find((j) => cells[j] !== "" && cells[j] !== "0") ?? 1;
    const hangPlace = label === plc && (demoSt ? st.w4.place : true);
    const nextRole = demoSt && stepOn ? stepOn.slice(5) : "";
    return (
      <g>
        {tray.map((e: any) => {
          const used = demoSt && (st.w4[e.role] || st.moving === e.role);
          const last = e.k === 3 && hangPlace;
          return (
            <g key={"tray" + e.k}>
              {drChipFace(e.x, e.y, e.w, DR.bh, e.c, { fs: P4.fs, ...(used ? { fill: tint(C.panel, 0.6), dash: true } : last ? { fill: tint(AMBER, 0.75), stroke: AMBER, sw: 3, ink: AMBER_INK }
                : demoSt ? { toy: true } : { fill: "#FFFFFF", stroke: shade(C.rule, 0.2) }) }, C)}
              {demoSt && !used && <Hit id={"word-" + e.role} x={e.x} y={e.y} w={e.w} h={DR.bh} label={e.c} onPress={() => press("word-" + e.role)} />}
            </g>
          );
        })}
        {cells.map((ch: string, j: number) => drTile("t" + j, c4.xs[j], c4.y, ch, { ink, lit: lit.includes(j), w: P4.tw, h: P4.th }, C))}
        {drPoint("pt", c4.px, c4.y, point, C, P4.th)}
        {c4.names.map((nm: string, j: number) => drNameAt("n" + j, c4.xs[j] + P4.tw / 2, P4_NY, tx(nm), label === j, C, P4.fs))}
        {caps && [2, 3].map((j) => (cells[j] === "0" && j < lastNz ? (
          <text key={"ph" + j} x={c4.xs[j] + P4.tw / 2} y={P4_PH} textAnchor="middle" fontSize={P4.fs} fontWeight={600} fill="#767676" pointerEvents="none">{tx("Place holder")}</text>
        ) : null))}
        {showAns && <text key="ans" x={DR.w4 / 2} y={P4_ANS} textAnchor="middle" fontSize={T.display} fontWeight={700} fill={GREEN} pointerEvents="none">{String(it.answer)}</text>}
        {demoSt && nextRole && !playing.current && (() => { const e = tray.find((t: any) => t.role === nextRole); return e && !st.w4[nextRole] ? inv(e.x + e.w / 2, e.y + DR.bh / 2, e.w, DR.bh) : null; })()}
      </g>
    );
  }

  /* ── Phases 1-3 and free play: the tiles, the place strip, the reading rows ── */
  const digits = free ? st.d.map((c: string, k: number) => (k === 1 ? c || "0" : c)) : (w0 + d0).split("");
  if (free) {
    let last = -1;
    for (let j = 0; j < 3; j++) if (st.d[2 + j] !== "") last = j;
    for (let j = 0; j < last; j++) if (!digits[2 + j]) digits[2 + j] = "0";
  }
  const tileInk = done ? GREEN : BLUE;
  const lit = (k: number) => !!(demo.tiles && demo.tiles.includes(k));
  const both = it.rows === "both";
  const bankLabels = liveRows || done ? (it.bank || []).map((c: string) => lab(c)) : [];
  /* the bank uses the whole width and never moves with box.w: a reading is answered on the working area, so no panel opens
     over it (a host that forces the panel open covers the bank's right end, above the drawer's Enter key) */
  const bank = drBank(bankLabels, DR.full).map((e: any) => ({ ...e, c: bankLabels[e.k], word: it.bank[e.k] }));
  const alY = (showRow("B") ? rowTop("B") : rowTop("A")) + DR.rh + 12;
  const other = st.act === "A" ? "B" : "A";
  /* the action keys at the bottom centre: ONE key that follows the guide's act (Read with and, then Read with point),
     none after the last; in free play the two Read keys side by side (both stay real choices) */
  const kw = 340, ky = DR.by;
  const actKeys: any[] = [];
  if (demoSt && n < 4) {
    const id = stepOn === "read-and" || stepOn === "read-point" ? stepOn : stepOn === "zero-and" ? "read-point" : "";
    if (id) actKeys.push({ id, x: Math.round(bw / 2 - kw / 2) });
  } else if (free) {
    actKeys.push({ id: "read-and", x: Math.round(bw / 2 - kw - 12) }, { id: "read-point", x: Math.round(bw / 2 + 12) });
  }
  const zeroWhole = /^0\.\d*[1-9]/.test(dec);
  const showSwitch = (demoSt && n === 3) || (free && zeroWhole);
  const swX = (free ? Math.round(bw / 2 - kw - 12) : Math.round(bw / 2 - kw / 2)) - 324;
  const isZero = free ? !!st.zero : st.A[0] === "zero" && st.A[1] === "and";
  return (
    <g>
      {digits.map((c: string, k: number) => drTile("t" + k, cols.xs[k], cols.y, c, { ink: tileInk, lit: lit(k) }, C))}
      {drPoint("pt", cols.px, cols.y, true, C)}
      {demo.bracket && (() => {
        const x1 = cols.xs[w0.length] + 8, x2 = cols.xs[w0.length + d0.length - 1] + DR.tw - 8;
        return <path key="bracket" d={`M ${x1} ${DR.th + 3} V ${DR.th + 8} H ${x2} V ${DR.th + 3}`} fill="none" stroke={AMBER} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" pointerEvents="none" />;
      })()}
      {cols.names.map((nm: string, k: number) => drNameAt("n" + k, cols.xs[k] + DR.tw / 2, DR.ny, tx(nm), demo.label === k, C))}
      {free && digits.map((_: any, k: number) => (
        <Hit key={"ft" + k} id={"tile-" + cols.names[k].toLowerCase()} x={cols.xs[k]} y={cols.y} w={DR.tw} h={DR.th} label={tx(cols.names[k])} onPress={() => fpTile(k)} />
      ))}
      {showRow("A") && rowName("A", both && liveRows)}
      {showRow("B") && rowName("B", both && liveRows)}
      {showRow("A") && lane("A", st.A.length || !it.given || free || demoSt ? st.A : it.given, demoSt || done ? "win" : editable("A") ? "own" : "given")}
      {showRow("B") && lane("B", st.B, demoSt || done ? "win" : free ? "given" : "own")}
      {demo.model !== undefined && demo.model > 0 && answerLane(alY)}
      {bank.map((e: any) => (
        <g key={"word" + e.k} {...(liveRows ? { ...control("word-" + (e.k + 1), e.c), ...drag.bind({ word: e.word }), ...drag.keys({ word: e.word }) } : { "aria-hidden": "true" })}>
          {drChipFace(e.x, e.y, e.w, DR.bh, e.c, liveRows ? { toy: true, ctl: true } : { fill: tint(C.panel, 0.6) }, C)}
        </g>
      ))}
      {g && g.moved && g.payload && (() => {
        const gl = lab(g.payload.word), w = drChipW(gl);
        return (
          <g pointerEvents="none" filter="url(#fLift)">
            <rect x={g.x - w / 2} y={g.y - DR.bh / 2} width={w} height={DR.bh} rx={18} fill="url(#gKey)" stroke={C.accent} strokeWidth={3} />
            <text x={g.x} y={g.y + 11} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={C.ink}>{gl}</text>
          </g>
        );
      })()}
      {showSwitch && <DRToggle id="zero-and" x={swX} y={ky} w={300} h={DR.bh} on={isZero} enabled={free || stepOn === "zero-and"}
        onPress={() => press("zero-and")} label={tx("Zero and")} text={tx("Zero and")} C={C} />}
      {actKeys.map((b: any) => keyAt(b.id, READ[b.id], b.x, ky, kw))}
      {demoSt && stepOn && !playing.current && (stepOn === "zero-and" ? inv(swX + 150, ky + DR.bh / 2, 300, DR.bh)
        : actKeys.length ? inv(actKeys[0].x + kw / 2, ky + DR.bh / 2, kw, DR.bh) : null)}
      {liveRows && both && !busy.current && !st.demo && st[st.act].length > 0 && !st[other].length && inv(DR.nw / 2, rowTop(other) + DR.rh / 2, DR.nw, DR.rh)}
      {free && !st.A.length && !st.B.length && inv(actKeys[0].x + kw / 2, ky + DR.bh / 2, kw, DR.bh)}
    </g>
  );
}
/* the right reading(s) of a reading item, as groups of chips (for the correction's lane) */
const drModel = (it: any) => String(it.answer).split("|").map((r) => drChipsOf(r, drPool(it)) || [r]);

/* the summary page's small drawing of the child's last right answer in a phase */
function Thumb({ n, result, it, C, w, h, tx = (v: any) => v }: any) {
  const last = result && result.last;
  if (!last) return null;
  const item = it || last.it || (PHASES[n - 1] && PHASES[n - 1].items[last.item]) || {};
  /* the decimal the child read or wrote, in green, scaled to the card's inner height (digits only: the same in every language) */
  const dec = item.kind === "write" ? String(last.value ?? item.answer ?? "") : String(item.dec ?? "");
  const fs = Math.max(T.micro, Math.min(T.xl, h - 24));
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      <text x={w / 2} y={Math.round(h / 2 + fs * 0.36)} textAnchor="middle" fontSize={fs} fontWeight={700} fill={shade(CONTENT.one, 0.25)}>{dec}</text>
    </g>
  );
}

function DecimalReader(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, format, fitHost: () => null,
      board: true,
      keyOnly: true,
      /* the standard panel: phase 4's five-place strip with its place names at 32 needs about 1,000 wide (the wide pad leaves 900) */
      bigPad: false,
      /* phase 4's decimals are typed with the point (writing the places, the empty one's 0 included, is the lesson) */
      pointKey: true,
      nextKey: true,
      navDots: true,
      StartArt, START_HOOK,
      }} />
  );
}

export default DecimalReader;
