/* ═══ M2.S4.T7.C24.2D1 · key_chooser · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists: header + its three controls, canvas, slot + pad, bubble + mascot,
   phase dots (user / AI mode), window.toolApi, sounds, the synced voice, scoring, the events,
   idle and restart. NO imports in this file; only the five host hooks. Follow docs/LAYOUT.md;
   the reference tool is work/indiannica_eng_maths4_ch1/M1.S1.T2.C4.2D1/tool.tsx.
   Edit, never rewrite. Built by `node cli.mjs scaffold`; concepts are verbatim (check compares them). */

const TOOL_ID = "key_chooser";
const MEDIA_ID = "M2.S4.T7.C24.2D1";
const TOOL_NAME = "Key Chooser";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
const VOICE = {"rate":0.92,"pitch":1.06};

/* spoken before phase 1's teach lines only (the plan's opening voice line) */
const OPENING = ["A card of numbers and a key dial. Which key turns every number into symbols?"];
/* the whole-tool line: spoken on the summary page */
const FINISH_LINE = "A key checked against every number, and a pictograph asked its questions.";
/* said when the child opens Free play from the summary page (the plan's free-play voice line, cut to what
   free play really offers: a new card, the dial and the checker) */
const FREE_LINE = "Free play. Try any key on any card, and watch the checker lay out every row.";

/* Hindi and Gujarati (docs/PATTERNS.md §11): every line above and below stays English, exactly as the checks
   read it; this table is keyed by that English, and the runtime looks each spoken or drawn line up in it.
   Fill it AFTER the English is final and reviewed (`node cli.mjs voice` lists every line still missing),
   then bake the voice. Empty = the tool runs in English only.
   Terms: key कुंजी / ચાવી, symbol प्रतीक / પ્રતીક, pictograph चित्रालेख / ચિત્રાલેખ, data आँकड़े / માહિતી,
   row पंक्ति / હાર, fits ठीक बैठती / બંધબેસે (a key is feminine in both). */
const TR: any = {
  hi: {
    "Key Chooser": "कुंजी चुनो",
    "A card of numbers and a key dial. Which key turns every number into symbols?": "संख्याओं का एक कार्ड और कुंजी का एक डायल। कौन-सी कुंजी हर संख्या को प्रतीकों में बदलती है?",
    "A key checked against every number, and a pictograph asked its questions.": "हर संख्या पर कुंजी जाँची, और चित्रालेख से उसके प्रश्न पूछे।",
    "Free play. Try any key on any card, and watch the checker lay out every row.": "मुक्त खेल। किसी भी कार्ड पर कोई भी कुंजी आज़माओ, और हर पंक्ति बनती देखो।",
    /* phase 1 */
    "A key that fits the data": "आँकड़ों पर ठीक बैठती कुंजी",
    "Try this key on every number. Does each one come out in whole symbols?": "यह कुंजी हर संख्या पर आज़माओ। क्या हर संख्या पूरे प्रतीकों में बनती है?",
    "Has every number been checked?": "क्या हर संख्या जाँच ली?",
    "Try the key on two numbers first, then on the rest.": "पहले दो संख्याओं पर कुंजी आज़माओ, फिर बाकी पर।",
    "A key that turns every number into whole symbols fits the data. Check every number, not only the first.": "जो कुंजी हर संख्या को पूरे प्रतीकों में बदले, वह ठीक बैठती है। हर संख्या जाँचो, सिर्फ़ पहली नहीं।",
    "You learned: a key fits when every number gives whole symbols.": "तुमने सीखा: कुंजी तब ठीक बैठती है जब हर संख्या पूरे प्रतीक दे।",
    "Points scored by four teams are 30, 45, 60 and 15. Would a key of one symbol for 15 points work?": "चार टीमों के अंक 30, 45, 60 और 15 हैं। क्या एक प्रतीक के लिए 15 अंक की कुंजी चलेगी?",
    "Does a key of 15 fit?": "15 की कुंजी ठीक बैठती है?",
    "What does the key leave over from each number?": "कुंजी हर संख्या में से कितना बचा छोड़ती है?",
    "The data is 12, 20 and 8. What about a key of 4?": "आँकड़े 12, 20 और 8 हैं। 4 की कुंजी कैसी रहेगी?",
    "Does a key of 4 fit?": "4 की कुंजी ठीक बैठती है?",
    "Lay the key along each row. Is anything left at the end?": "हर पंक्ति पर कुंजी बिछाओ। क्या आख़िर में कुछ बचता है?",
    "The data is 12, 18 and 20. Try a key of 6 the same way.": "आँकड़े 12, 18 और 20 हैं। इसी तरह 6 की कुंजी आज़माओ।",
    "Does a key of 6 fit?": "6 की कुंजी ठीक बैठती है?",
    "Check the last number too, not only the first two.": "पहली दो ही नहीं, आख़िरी संख्या भी जाँचो।",
    /* phase 2 */
    "When a half is needed": "जब आधा चाहिए",
    "What is left over? Is it exactly half of the key?": "कितना बचा? क्या वह कुंजी का ठीक आधा है?",
    "Halve the key. Does the leftover match that half?": "कुंजी का आधा करो। क्या बचा हुआ उस आधे के बराबर है?",
    "Lay the leftover against the key's symbol folded in two.": "बचे हुए को कुंजी के प्रतीक से मिलाओ, जो आधा मुड़ा है।",
    "A key may leave a half symbol, when what is left over is exactly half the key.": "कुंजी से आधा प्रतीक आ सकता है, जब बचा हुआ ठीक कुंजी का आधा हो।",
    "You learned: a key may leave a half symbol, if exactly half is left.": "तुमने सीखा: ठीक आधा बचे, तो कुंजी से आधा प्रतीक आ सकता है।",
    "The data is 20, 50 and 35, and the key is 10. How many symbols does 35 need?": "आँकड़े 20, 50 और 35 हैं, और कुंजी 10 है। 35 के लिए कितने प्रतीक चाहिए?",
    "Symbols for 35?": "35 के लिए प्रतीक?",
    "Look at the end of the row for 35. How much is loose there?": "35 वाली पंक्ति का आख़िरी सिरा देखो। वहाँ कितना खुला बचा है?",
    "With a key of 4, how many symbols show 18?": "4 की कुंजी से, 18 दिखाने को कितने प्रतीक लगेंगे?",
    "Symbols for 18?": "18 के लिए प्रतीक?",
    "How many are left once the whole symbols are laid?": "पूरे प्रतीक बिछाने के बाद कितने बचते हैं?",
    "The data is 60, 90 and 80. The dial holds two keys. Which one fits every number?": "आँकड़े 60, 90 और 80 हैं। डायल में दो कुंजियाँ हैं। कौन-सी हर संख्या पर ठीक बैठती है?",
    "Which key fits?": "कौन-सी कुंजी ठीक है?",
    "With 30, what does 80 leave over?": "30 की कुंजी से 80 में कितना बचता है?",
    /* phase 3 */
    "Too many symbols": "बहुत ज़्यादा प्रतीक",
    "It fits, but how many symbols is that? Try a bigger key.": "यह ठीक बैठती है, पर इसमें कितने प्रतीक हैं? बड़ी कुंजी आज़माओ।",
    "Is there a larger key that still fits?": "क्या कोई बड़ी कुंजी भी ठीक बैठती है?",
    "Try two keys and compare how many symbols each one needs.": "दो कुंजियाँ आज़माओ और देखो हर एक को कितने प्रतीक चाहिए।",
    "Too small a key gives too many symbols. Choose one that fits every number and keeps the rows short.": "बहुत छोटी कुंजी से बहुत ज़्यादा प्रतीक बनते हैं। ऐसी कुंजी चुनो जो हर संख्या पर ठीक बैठे और पंक्तियाँ छोटी रखे।",
    "You learned: too small a key gives too many symbols to draw.": "तुमने सीखा: बहुत छोटी कुंजी से बनाने को बहुत ज़्यादा प्रतीक होते हैं।",
    "A fair counted 300, 500 and 450 visitors on three days. A key of 5 fits every number. Is it a good key?": "एक मेले में तीन दिनों में 300, 500 और 450 लोग आए। 5 की कुंजी हर संख्या पर ठीक बैठती है। क्या यह अच्छी कुंजी है?",
    "Is 5 a good key?": "क्या 5 अच्छी कुंजी है?",
    "How many symbols would this key need?": "इस कुंजी को कितने प्रतीक चाहिए होंगे?",
    "This card fits a key of 2 as well. How many symbols does the whole card need with this key?": "यह कार्ड भी 2 की कुंजी पर ठीक बैठता है। इस कुंजी से पूरे कार्ड को कितने प्रतीक चाहिए?",
    "Symbols in all?": "कुल कितने प्रतीक?",
    "Read the count under each name, then add them.": "हर नाम के नीचे की गिनती पढ़ो, फिर उन्हें जोड़ो।",
    "The data is 700, 400 and 900 tickets. The dial holds two keys, and both fit. Which is the better key?": "आँकड़े 700, 400 और 900 टिकट हैं। डायल में दो कुंजियाँ हैं, और दोनों ठीक बैठती हैं। कौन-सी कुंजी बेहतर है?",
    "Which is the better key?": "बेहतर कुंजी कौन-सी है?",
    "Turn the dial. Which key keeps every row short?": "डायल घुमाओ। कौन-सी कुंजी हर पंक्ति छोटी रखती है?",
    /* phase 4 */
    "Asking the pictograph questions": "चित्रालेख से प्रश्न पूछना",
    "Can the pictures answer this one? What does the data hold?": "क्या चित्र इसका उत्तर दे सकते हैं? आँकड़ों में क्या है?",
    "Does anything on the pictograph bear on this question?": "क्या चित्रालेख पर कुछ भी इस प्रश्न से जुड़ा है?",
    "Read the title and the key. Is that what the question asks about?": "शीर्षक और कुंजी पढ़ो। क्या प्रश्न उसी के बारे में है?",
    "A pictograph answers questions about its own data, such as the most, the least, the same and how many more.": "चित्रालेख अपने ही आँकड़ों के प्रश्नों का उत्तर देता है। जैसे सबसे ज़्यादा, सबसे कम, बराबर और कितना ज़्यादा।",
    "You learned: a pictograph answers questions about its own data only.": "तुमने सीखा: चित्रालेख सिर्फ़ अपने आँकड़ों के प्रश्नों का उत्तर देता है।",
    "Points scored by four teams, one symbol for 25 points. How many points did the top team score?": "चार टीमों के अंक, एक प्रतीक 25 अंक का। सबसे आगे वाली टीम ने कितने अंक बनाए?",
    "Top team's points?": "सबसे आगे टीम के अंक?",
    "The question asks for points. What is one symbol worth?": "प्रश्न अंक पूछता है। एक प्रतीक कितने का है?",
    "Five groups made paper boats, and each symbol stands for 3 boats. Two groups made the same number. How many boats did each make?": "पाँच समूहों ने कागज़ की नावें बनाईं, और हर प्रतीक 3 नावों का है। दो समूहों ने बराबर नावें बनाईं। हर एक ने कितनी नावें बनाईं?",
    "How many boats each?": "हर एक की कितनी नावें?",
    "Find the two rows of the same length. Read one of them with the key.": "बराबर लंबाई की दो पंक्तियाँ ढूँढो। उनमें से एक को कुंजी से पढ़ो।",
    "Four houses ran laps, and the key is 50 laps. Who ran the fastest?": "चार सदनों ने चक्कर लगाए, और कुंजी 50 चक्कर है। सबसे तेज़ कौन दौड़ा?",
    "Who ran fastest?": "सबसे तेज़ कौन?",
    "What does the title say the data is?": "शीर्षक के अनुसार आँकड़े किस बारे में हैं?",
    /* the word keys (and the slot, the correction and the summary show them too) */
    "fits": "ठीक बैठती", "does not fit": "नहीं बैठती",
    "3": "3", "4": "4", "5": "5", "3 and a half": "साढ़े 3", "4 and a half": "साढ़े 4",
    "a good key": "अच्छी कुंजी", "too many": "बहुत ज़्यादा",
    "Yamuna": "यमुना", "Ganga": "गंगा", "Narmada": "नर्मदा", "Kaveri": "कावेरी", "not in this data": "इन आँकड़ों में नहीं",
    /* what the working area and the summary draw */
    "symbols": "प्रतीक", "rows lit": "जली पंक्तियाँ", "of": "में से", "key": "कुंजी", "new card": "नया कार्ड", "title": "शीर्षक",
    "fits every row": "हर पंक्ति में ठीक", "too many symbols": "बहुत ज़्यादा प्रतीक", "short rows": "छोटी पंक्तियाँ", "120 symbols": "120 प्रतीक",
    "Points": "अंक", "Data": "आँकड़े", "Visitors": "आगंतुक", "Tickets": "टिकट", "Laps": "चक्कर", "Boats": "नावें",
    "Points scored": "बनाए गए अंक", "Boats made": "बनाई गई नावें", "Laps run": "दौड़े गए चक्कर",
    "points": "अंक", "boats": "नावें", "laps": "चक्कर",
    "top team?": "सबसे आगे?", "same two?": "बराबर वाले दो?", "fastest?": "सबसे तेज़?",
    "Team A": "टीम A", "Team B": "टीम B", "Team C": "टीम C", "Team D": "टीम D",
    "Day 1": "दिन 1", "Day 2": "दिन 2", "Day 3": "दिन 3",
    "Group A": "समूह A", "Group B": "समूह B", "Group C": "समूह C", "Group D": "समूह D", "Group E": "समूह E",
  },
  gu: {
    "Key Chooser": "ચાવી પસંદ કરો",
    "A card of numbers and a key dial. Which key turns every number into symbols?": "સંખ્યાઓનું એક કાર્ડ અને ચાવીનું એક ડાયલ. કઈ ચાવી દરેક સંખ્યાને પ્રતીકોમાં ફેરવે છે?",
    "A key checked against every number, and a pictograph asked its questions.": "દરેક સંખ્યા પર ચાવી ચકાસી, અને ચિત્રાલેખને તેના પ્રશ્નો પૂછ્યા.",
    "Free play. Try any key on any card, and watch the checker lay out every row.": "મુક્ત રમત. કોઈ પણ કાર્ડ પર કોઈ પણ ચાવી અજમાવો, અને દરેક હાર બનતી જુઓ.",
    /* phase 1 */
    "A key that fits the data": "માહિતીમાં બંધબેસતી ચાવી",
    "Try this key on every number. Does each one come out in whole symbols?": "આ ચાવી દરેક સંખ્યા પર અજમાવો. શું દરેક સંખ્યા પૂરાં પ્રતીકોમાં બને છે?",
    "Has every number been checked?": "શું દરેક સંખ્યા ચકાસી લીધી?",
    "Try the key on two numbers first, then on the rest.": "પહેલાં બે સંખ્યાઓ પર ચાવી અજમાવો, પછી બાકીની પર.",
    "A key that turns every number into whole symbols fits the data. Check every number, not only the first.": "જે ચાવી દરેક સંખ્યાને પૂરાં પ્રતીકોમાં ફેરવે, તે બંધબેસે છે. દરેક સંખ્યા ચકાસો, ફક્ત પહેલી નહીં.",
    "You learned: a key fits when every number gives whole symbols.": "તમે શીખ્યા: દરેક સંખ્યા પૂરાં પ્રતીક આપે ત્યારે ચાવી બંધબેસે છે.",
    "Points scored by four teams are 30, 45, 60 and 15. Would a key of one symbol for 15 points work?": "ચાર ટીમના ગુણ 30, 45, 60 અને 15 છે. શું એક પ્રતીક માટે 15 ગુણની ચાવી ચાલશે?",
    "Does a key of 15 fit?": "શું 15 ની ચાવી બંધબેસે છે?",
    "What does the key leave over from each number?": "ચાવી દરેક સંખ્યામાંથી કેટલું બાકી રાખે છે?",
    "The data is 12, 20 and 8. What about a key of 4?": "માહિતી 12, 20 અને 8 છે. 4 ની ચાવી કેવી રહેશે?",
    "Does a key of 4 fit?": "શું 4 ની ચાવી બંધબેસે છે?",
    "Lay the key along each row. Is anything left at the end?": "દરેક હાર પર ચાવી ગોઠવો. શું છેલ્લે કંઈ બાકી રહે છે?",
    "The data is 12, 18 and 20. Try a key of 6 the same way.": "માહિતી 12, 18 અને 20 છે. એ જ રીતે 6 ની ચાવી અજમાવો.",
    "Does a key of 6 fit?": "શું 6 ની ચાવી બંધબેસે છે?",
    "Check the last number too, not only the first two.": "પહેલી બે જ નહીં, છેલ્લી સંખ્યા પણ ચકાસો.",
    /* phase 2 */
    "When a half is needed": "જ્યારે અડધું જોઈએ",
    "What is left over? Is it exactly half of the key?": "કેટલું બાકી રહ્યું? શું તે ચાવીનું બરાબર અડધું છે?",
    "Halve the key. Does the leftover match that half?": "ચાવીનું અડધું કરો. શું બાકી રહેલું એ અડધા જેટલું છે?",
    "Lay the leftover against the key's symbol folded in two.": "બાકી રહેલાને ચાવીના પ્રતીક સાથે મેળવો, જે અડધું વાળેલું છે.",
    "A key may leave a half symbol, when what is left over is exactly half the key.": "બાકી રહેલું બરાબર ચાવીનું અડધું હોય, તો અડધું પ્રતીક આવી શકે.",
    "You learned: a key may leave a half symbol, if exactly half is left.": "તમે શીખ્યા: બરાબર અડધું બાકી રહે, તો ચાવીથી અડધું પ્રતીક આવી શકે.",
    "The data is 20, 50 and 35, and the key is 10. How many symbols does 35 need?": "માહિતી 20, 50 અને 35 છે, અને ચાવી 10 છે. 35 માટે કેટલાં પ્રતીક જોઈએ?",
    "Symbols for 35?": "35 માટે પ્રતીક?",
    "Look at the end of the row for 35. How much is loose there?": "35 વાળી હારનો છેડો જુઓ. ત્યાં કેટલું છૂટું છે?",
    "With a key of 4, how many symbols show 18?": "4 ની ચાવીથી, 18 બતાવવા કેટલાં પ્રતીક જોઈએ?",
    "Symbols for 18?": "18 માટે પ્રતીક?",
    "How many are left once the whole symbols are laid?": "પૂરાં પ્રતીક ગોઠવ્યા પછી કેટલા બાકી રહે છે?",
    "The data is 60, 90 and 80. The dial holds two keys. Which one fits every number?": "માહિતી 60, 90 અને 80 છે. ડાયલમાં બે ચાવી છે. કઈ ચાવી દરેક સંખ્યામાં બંધબેસે છે?",
    "Which key fits?": "કઈ ચાવી બંધબેસે?",
    "With 30, what does 80 leave over?": "30 ની ચાવીથી 80 માં કેટલું બાકી રહે છે?",
    /* phase 3 */
    "Too many symbols": "ઘણાં વધારે પ્રતીક",
    "It fits, but how many symbols is that? Try a bigger key.": "તે બંધબેસે છે, પણ એમાં કેટલાં પ્રતીક થાય? મોટી ચાવી અજમાવો.",
    "Is there a larger key that still fits?": "શું કોઈ મોટી ચાવી પણ બંધબેસે છે?",
    "Try two keys and compare how many symbols each one needs.": "બે ચાવી અજમાવો અને સરખાવો કે દરેકને કેટલાં પ્રતીક જોઈએ.",
    "Too small a key gives too many symbols. Choose one that fits every number and keeps the rows short.": "બહુ નાની ચાવીથી ઘણાં વધારે પ્રતીક બને છે. એવી ચાવી પસંદ કરો જે દરેક સંખ્યામાં બંધબેસે અને હાર ટૂંકી રાખે.",
    "You learned: too small a key gives too many symbols to draw.": "તમે શીખ્યા: બહુ નાની ચાવીથી દોરવા માટે ઘણાં વધારે પ્રતીક થાય.",
    "A fair counted 300, 500 and 450 visitors on three days. A key of 5 fits every number. Is it a good key?": "એક મેળામાં ત્રણ દિવસમાં 300, 500 અને 450 મુલાકાતી આવ્યા. 5 ની ચાવી દરેક સંખ્યામાં બંધબેસે છે. શું તે સારી ચાવી છે?",
    "Is 5 a good key?": "શું 5 સારી ચાવી છે?",
    "How many symbols would this key need?": "આ ચાવીને કેટલાં પ્રતીક જોઈશે?",
    "This card fits a key of 2 as well. How many symbols does the whole card need with this key?": "આ કાર્ડમાં પણ 2 ની ચાવી બંધબેસે છે. આ ચાવીથી આખા કાર્ડને કેટલાં પ્રતીક જોઈએ?",
    "Symbols in all?": "કુલ કેટલાં પ્રતીક?",
    "Read the count under each name, then add them.": "દરેક નામ નીચેની ગણતરી વાંચો, પછી તેનો સરવાળો કરો.",
    "The data is 700, 400 and 900 tickets. The dial holds two keys, and both fit. Which is the better key?": "માહિતી 700, 400 અને 900 ટિકિટ છે. ડાયલમાં બે ચાવી છે, અને બંને બંધબેસે છે. કઈ ચાવી વધુ સારી છે?",
    "Which is the better key?": "કઈ ચાવી વધુ સારી છે?",
    "Turn the dial. Which key keeps every row short?": "ડાયલ ફેરવો. કઈ ચાવી દરેક હાર ટૂંકી રાખે છે?",
    /* phase 4 */
    "Asking the pictograph questions": "ચિત્રાલેખને પ્રશ્નો પૂછવા",
    "Can the pictures answer this one? What does the data hold?": "શું ચિત્રો આનો જવાબ આપી શકે? માહિતીમાં શું છે?",
    "Does anything on the pictograph bear on this question?": "શું ચિત્રાલેખ પર કંઈ પણ આ પ્રશ્ન સાથે જોડાયેલું છે?",
    "Read the title and the key. Is that what the question asks about?": "શીર્ષક અને ચાવી વાંચો. શું પ્રશ્ન એના વિશે જ છે?",
    "A pictograph answers questions about its own data, such as the most, the least, the same and how many more.": "ચિત્રાલેખ પોતાની જ માહિતીના પ્રશ્નોના જવાબ આપે છે. જેમ કે સૌથી વધુ, સૌથી ઓછું, સરખું અને કેટલું વધારે.",
    "You learned: a pictograph answers questions about its own data only.": "તમે શીખ્યા: ચિત્રાલેખ ફક્ત પોતાની માહિતીના પ્રશ્નોના જવાબ આપે છે.",
    "Points scored by four teams, one symbol for 25 points. How many points did the top team score?": "ચાર ટીમના ગુણ, એક પ્રતીક 25 ગુણનું. સૌથી આગળની ટીમે કેટલા ગુણ મેળવ્યા?",
    "Top team's points?": "સૌથી આગળ ટીમના ગુણ?",
    "The question asks for points. What is one symbol worth?": "પ્રશ્ન ગુણ પૂછે છે. એક પ્રતીક કેટલાનું છે?",
    "Five groups made paper boats, and each symbol stands for 3 boats. Two groups made the same number. How many boats did each make?": "પાંચ જૂથે કાગળની હોડી બનાવી, અને દરેક પ્રતીક 3 હોડીનું છે. બે જૂથે સરખી હોડી બનાવી. દરેકે કેટલી હોડી બનાવી?",
    "How many boats each?": "દરેકની કેટલી હોડી?",
    "Find the two rows of the same length. Read one of them with the key.": "સરખી લંબાઈની બે હાર શોધો. એમાંથી એકને ચાવીથી વાંચો.",
    "Four houses ran laps, and the key is 50 laps. Who ran the fastest?": "ચાર હાઉસે ચક્કર લગાવ્યા, અને ચાવી 50 ચક્કર છે. સૌથી ઝડપી કોણ દોડ્યું?",
    "Who ran fastest?": "સૌથી ઝડપી કોણ?",
    "What does the title say the data is?": "શીર્ષક મુજબ માહિતી શેના વિશે છે?",
    /* the word keys (and the slot, the correction and the summary show them too) */
    "fits": "બંધબેસે છે", "does not fit": "બંધબેસતી નથી",
    "3": "3", "4": "4", "5": "5", "3 and a half": "સાડા 3", "4 and a half": "સાડા 4",
    "a good key": "સારી ચાવી", "too many": "ઘણાં વધારે",
    "Yamuna": "યમુના", "Ganga": "ગંગા", "Narmada": "નર્મદા", "Kaveri": "કાવેરી", "not in this data": "માહિતીમાં નથી",
    /* what the working area and the summary draw */
    "symbols": "પ્રતીક", "rows lit": "ઝળકતી હાર", "of": "માંથી", "key": "ચાવી", "new card": "નવું કાર્ડ", "title": "શીર્ષક",
    "fits every row": "બધી હાર બંધબેસે", "too many symbols": "ઘણાં વધારે પ્રતીક", "short rows": "ટૂંકી હાર", "120 symbols": "120 પ્રતીક",
    "Points": "ગુણ", "Data": "માહિતી", "Visitors": "મુલાકાતી", "Tickets": "ટિકિટ", "Laps": "ચક્કર", "Boats": "હોડી",
    "Points scored": "મેળવેલા ગુણ", "Boats made": "બનાવેલી હોડી", "Laps run": "દોડેલા ચક્કર",
    "points": "ગુણ", "boats": "હોડી", "laps": "ચક્કર",
    "top team?": "સૌથી આગળ?", "same two?": "સરખા બે?", "fastest?": "સૌથી ઝડપી?",
    "Team A": "ટીમ A", "Team B": "ટીમ B", "Team C": "ટીમ C", "Team D": "ટીમ D",
    "Day 1": "દિવસ 1", "Day 2": "દિવસ 2", "Day 3": "દિવસ 3",
    "Group A": "જૂથ A", "Group B": "જૂથ B", "Group C": "જૂથ C", "Group D": "જૂથ D", "Group E": "જૂથ E",
  },
};

/* the word keys: one id a choice across the tool, so the slot can show the chosen words (kcFormat) */
const KC_CHOICE: Record<string, string> = {
  fits: "fits", nofit: "does not fit",
  s3: "3", s3h: "3 and a half", s4: "4", s4h: "4 and a half", s5: "5",
  good: "a good key", many: "too many",
  yamuna: "Yamuna", ganga: "Ganga", narmada: "Narmada", none: "not in this data",
};
const kcChoices = (...ids: string[]) => ids.map((id) => ({ id, label: KC_CHOICE[id] }));

/* One entry per phase = one mount.
   Item fields of this tool:
     rows   [name, number] on the data card; key the key the question names; start the dial's first key
     dial   the trial keys the dial turns through (smallest first); focus the row a half question asks about
     pict   phase 4's finished pictograph { title, unit, key, rows: [name, symbols] }; target the rows it reads
     near   the item's misconception (nearMiss) */
const PHASES = [
  {
    n: 1,
    concept: "A key that fits the data",
    conceptId: "M2.S4.T7.C24", objectiveIds: ["O11"],
    says: ["Try this key on every number. Does each one come out in whole symbols?"],
    /* tries, as the plan writes it: First rung, from the item's own miss line: what does the key leave over from this number? Second rung, the phase's: has every number been checked? Third rung: the card is cut to two numbers, and the child tries the key on both. */
    ladder: ["Has every number been checked?", "Try the key on two numbers first, then on the rest."],
    closing: "A key that turns every number into whole symbols fits the data. Check every number, not only the first.",
    learned: "You learned: a key fits when every number gives whole symbols.",
    traceback: "The checker lays out every row in turn with the question's key; a row with anything left over stays unlit, and the board ends on fits or does not fit.",
    items: [
      /* learn ML1: answer in the plan = Yes. It gives 2, 3, 4 and 1 symbols, all whole */
      { qid: "M2.S4.T7.C24:ML1", kind: "fit", title: "Points", rows: [["Team A", 30], ["Team B", 45], ["Team C", 60], ["Team D", 15]], key: 15, dial: [5, 10, 15, 20, 30],
        say: "Points scored by four teams are 30, 45, 60 and 15. Would a key of one symbol for 15 points work?", ask: "Does a key of 15 fit?",
        choices: kcChoices("fits", "nofit"), answer: "fits", near: "nofit", miss: "What does the key leave over from each number?" },
      /* practice 1: answer in the plan = Yes: 3, 5 and 2 symbols */
      { qid: "M2.S4.T7.C24:1", kind: "fit", title: "Data", rows: [["A", 12], ["B", 20], ["C", 8]], key: 4, dial: [2, 3, 4, 5, 6],
        say: "The data is 12, 20 and 8. What about a key of 4?", ask: "Does a key of 4 fit?",
        choices: kcChoices("fits", "nofit"), answer: "fits", near: "nofit", miss: "Lay the key along each row. Is anything left at the end?" },
      /* practice 2: answer in the plan = No. 12 and 18 give 2 and 3 symbols, but 20 is 3 symbols with 2 left over */
      { qid: "M2.S4.T7.C24:2", kind: "fit", title: "Data", rows: [["A", 12], ["B", 18], ["C", 20]], key: 6, dial: [2, 3, 4, 5, 6],
        say: "The data is 12, 18 and 20. Try a key of 6 the same way.", ask: "Does a key of 6 fit?",
        choices: kcChoices("fits", "nofit"), answer: "nofit", near: "fits", miss: "Check the last number too, not only the first two." },
    ],
  },
  {
    n: 2,
    concept: "When a half is needed",
    conceptId: "M2.S4.T7.C25", objectiveIds: ["O11"],
    says: ["What is left over? Is it exactly half of the key?"],
    /* tries, as the plan writes it: First rung, from the item: what is left over? Second rung, the phase's: is that exactly half of the key? Third rung: the card is cut to one number with a small leftover, and the child lays it against the folded symbol. */
    ladder: ["Halve the key. Does the leftover match that half?", "Lay the leftover against the key's symbol folded in two."],
    closing: "A key may leave a half symbol, when what is left over is exactly half the key.",
    learned: "You learned: a key may leave a half symbol, if exactly half is left.",
    traceback: "The row is laid out in whole symbols, the leftover is laid against half the key, and a half symbol closes the row only when the two match.",
    items: [
      /* learn ML2: answer in the plan = 2, 5, and 3 and a half (asked here for 35, the number with the half) */
      { qid: "M2.S4.T7.C25:ML2", kind: "half", title: "Data", rows: [["A", 20], ["B", 50], ["C", 35]], key: 10, dial: [5, 10, 20], focus: 2,
        say: "The data is 20, 50 and 35, and the key is 10. How many symbols does 35 need?", ask: "Symbols for 35?",
        choices: kcChoices("s3", "s4", "s3h"), answer: "s3h", near: "s3", miss: "Look at the end of the row for 35. How much is loose there?" },
      /* practice 3: answer in the plan = 4 and a half: 16 is 4 symbols, and the 2 left over is half of 4 */
      { qid: "M2.S4.T7.C25:3", kind: "half", title: "Data", rows: [["A", 18]], key: 4, dial: [2, 3, 4, 5, 6], focus: 0,
        say: "With a key of 4, how many symbols show 18?", ask: "Symbols for 18?",
        choices: kcChoices("s4h", "s4", "s5"), answer: "s4h", near: "s4", miss: "How many are left once the whole symbols are laid?" },
      /* practice 4: answer in the plan = 20. It gives 3, 4 and a half, and 4 symbols. With 30, 80 leaves 20 over, which is neither a whole symbol nor half of 30
         (the plan's "30 or 20" are the dial's two keys, so the question does not print its own answer) */
      { qid: "M2.S4.T7.C25:4", kind: "which", title: "Data", rows: [["A", 60], ["B", 90], ["C", 80]], start: 30, dial: [20, 30],
        say: "The data is 60, 90 and 80. The dial holds two keys. Which one fits every number?", ask: "Which key fits?",
        answer: 20, near: 30, miss: "With 30, what does 80 leave over?" },
    ],
  },
  {
    n: 3,
    concept: "Too many symbols",
    conceptId: "M2.S4.T7.C26", objectiveIds: ["O12"],
    says: ["It fits, but how many symbols is that? Try a bigger key."],
    /* tries, as the plan writes it: First rung, from the item: how many symbols would this key need? Second rung, the phase's: is there a larger key that still fits? Third rung: the card is cut to two numbers, and the child tries two keys and compares the counts. */
    ladder: ["Is there a larger key that still fits?", "Try two keys and compare how many symbols each one needs."],
    closing: "Too small a key gives too many symbols. Choose one that fits every number and keeps the rows short.",
    learned: "You learned: too small a key gives too many symbols to draw.",
    traceback: "Every row is laid out under the key and runs off the board with its count written under its name; the symbol count shows the total, then the better key is set and the rows draw back.",
    items: [
      /* learn ML3: answer in the plan = No. It needs 60, 100 and 90 symbols, far too many to draw. A key of 50 gives 6, 10 and 9 */
      { qid: "M2.S4.T7.C26:ML3", kind: "good", title: "Visitors", rows: [["Day 1", 300], ["Day 2", 500], ["Day 3", 450]], key: 5, dial: [5, 10, 25, 50, 100],
        say: "A fair counted 300, 500 and 450 visitors on three days. A key of 5 fits every number. Is it a good key?", ask: "Is 5 a good key?",
        choices: kcChoices("good", "many"), answer: "many", near: "good", miss: "How many symbols would this key need?" },
      /* practice 5: answer in the plan = 120 symbols, far too many. A key of 20 gives 4, 6 and 2
         (the data is not read aloud: 120 is also one of its numbers) */
      { qid: "M2.S4.T7.C26:5", kind: "total", title: "Data", rows: [["A", 80], ["B", 120], ["C", 40]], key: 2, dial: [2, 4, 10, 20, 40],
        say: "This card fits a key of 2 as well. How many symbols does the whole card need with this key?", ask: "Symbols in all?",
        answer: 120, near: 60, miss: "Read the count under each name, then add them." },
      /* practice 6: answer in the plan = 100. It gives 7, 4 and 9 symbols. A key of 10 fits too, but gives 70, 40 and 90, far too many */
      { qid: "M2.S4.T7.C26:6", kind: "better", title: "Tickets", rows: [["A", 700], ["B", 400], ["C", 900]], start: 10, dial: [10, 100],
        say: "The data is 700, 400 and 900 tickets. The dial holds two keys, and both fit. Which is the better key?", ask: "Which is the better key?",
        answer: 100, near: 10, miss: "Turn the dial. Which key keeps every row short?" },
    ],
  },
  {
    n: 4,
    concept: "Asking the pictograph questions",
    conceptId: "M2.S4.T7.C27", objectiveIds: ["O12"],
    says: ["Can the pictures answer this one? What does the data hold?"],
    /* tries, as the plan writes it: First rung, from the item: what does the title say the data is? Second rung, the phase's: does anything on the pictograph bear on this question? Third rung: the stack is cut to two cards, one the data can answer and one it cannot, and the child sorts them. */
    ladder: ["Does anything on the pictograph bear on this question?", "Read the title and the key. Is that what the question asks about?"],
    closing: "A pictograph answers questions about its own data, such as the most, the least, the same and how many more.",
    learned: "You learned: a pictograph answers questions about its own data only.",
    traceback: "The row the question asks about is banded and read with the key until its value lands in its tag, or the card finds nothing on the pictograph and slides into the tray headed not in this data.",
    items: [
      /* learn ML4: answer in the plan = Team A the most, 175; Team C the fewest, 75; Teams B and D the same, 125 each. It cannot tell how many players a team has */
      { qid: "M2.S4.T7.C27:ML4", kind: "read", reads: "most", target: [0], card: "top team?",
        pict: { title: "Points scored", unit: "points", key: 25, rows: [["Team A", 7], ["Team B", 5], ["Team C", 3], ["Team D", 5]] },
        say: "Points scored by four teams, one symbol for 25 points. How many points did the top team score?", ask: "Top team's points?",
        answer: 175, near: 7, miss: "The question asks for points. What is one symbol worth?" },
      /* practice 7: answer in the plan = Group B the most, 24; Group C the fewest, 6; Groups A and D the same, 15 each */
      { qid: "M2.S4.T7.C27:7", kind: "read", reads: "same", target: [0, 3], card: "same two?",
        pict: { title: "Boats made", unit: "boats", key: 3, rows: [["Group A", 5], ["Group B", 8], ["Group C", 2], ["Group D", 5], ["Group E", 7]] },
        say: "Five groups made paper boats, and each symbol stands for 3 boats. Two groups made the same number. How many boats did each make?", ask: "How many boats each?",
        answer: 15, near: 5, miss: "Find the two rows of the same length. Read one of them with the key." },
      /* practice 8: answer in the plan = A key of 50 gives 3, 5, 2 and 4 symbols. Yamuna ran the most, 250 laps. The pictograph cannot say how fast anyone ran, because speed is not in its data */
      { qid: "M2.S4.T7.C27:8", kind: "notin", about: "speed", card: "fastest?",
        pict: { title: "Laps run", unit: "laps", key: 50, rows: [["Ganga", 3], ["Yamuna", 5], ["Kaveri", 2], ["Narmada", 4]] },
        say: "Four houses ran laps, and the key is 50 laps. Who ran the fastest?", ask: "Who ran fastest?",
        choices: kcChoices("yamuna", "ganga", "narmada", "none"), answer: "none", near: "yamuna", miss: "What does the title say the data is?" },
    ],
  },
];

/* The numbers, rows, sizes and targets the working area needs (they go into the sidecar too). */
const MODEL = {
  rowsMax: 5,          /* rows on the board */
  shownMax: 14,        /* symbols a row can hold before it runs off the board's edge */
  freeDial: [2, 3, 4, 5, 6, 10, 15, 20, 25, 30, 50, 100],
  freeCards: [
    { title: "Points", rows: [["Team A", 30], ["Team B", 45], ["Team C", 60], ["Team D", 15]] },
    { title: "Visitors", rows: [["Day 1", 300], ["Day 2", 500], ["Day 3", 450]] },
    { title: "Laps", rows: [["Ganga", 150], ["Yamuna", 250], ["Kaveri", 100], ["Narmada", 200]] },
    { title: "Boats", rows: [["Group A", 15], ["Group B", 24], ["Group C", 6], ["Group D", 15], ["Group E", 21]] },
    { title: "Tickets", rows: [["A", 700], ["B", 400], ["C", 900]] },
  ],
};

/* the checker's arithmetic (the picture's route) */
const kcWhole = (v: number, k: number) => Math.floor(v / k);
const kcLeft = (v: number, k: number) => v - Math.floor(v / k) * k;
const kcHalfOk = (v: number, k: number) => { const l = kcLeft(v, k); return l > 0 && l * 2 === k; };
/* 3.5 -> "3½", 60 -> "60" */
const kcNum = (x: number) => { const w = Math.floor(x), h = x - w >= 0.5; return (w === 0 && h ? "" : indian(w)) + (h ? "½" : ""); };
/* what the slot shows for a chosen word key */
const kcFormat = (v: any) => (KC_CHOICE[String(v)] !== undefined ? KC_CHOICE[String(v)] : v);
/* the tray's heading on two lines: "not in" / "this data" in English; a translation of "not in this data" is split
   at its middle word, since Hindi and Gujarati put the "not" last ("इन आँकड़ों / में नहीं") */
const kcTrayLines = (lang: string, tx: any) => {
  if (lang === "en") return [tx("not in"), tx("this data")];
  const w = String(tx("not in this data")).split(" "), h = Math.ceil(w.length / 2);
  return [w.slice(0, h).join(" "), w.slice(h).join(" ")];
};
/* a Devanagari or Gujarati sign drawn above or below its letter (u, e, ai, the dot, the halant, the nukta): it
   takes no width of its own; the signs drawn beside a letter (aa, i, ii, o, au) keep theirs */
const kcMark = (c: number) => (c >= 0x900 && c <= 0x902) || c === 0x93a || c === 0x93c || (c >= 0x941 && c <= 0x948) || c === 0x94d
  || (c >= 0x951 && c <= 0x957) || c === 0x962 || c === 0x963
  || c === 0xa81 || c === 0xa82 || c === 0xabc || (c >= 0xac1 && c <= 0xac5) || c === 0xac7 || c === 0xac8 || c === 0xacd || c === 0xae2 || c === 0xae3;
/* a vowel sign drawn beside its letter (aa, i, ii, o, au, the visarga): narrower than a letter */
const kcBeside = (c: number) => c === 0x903 || (c >= 0x93e && c <= 0x940) || (c >= 0x949 && c <= 0x94c)
  || c === 0xa83 || (c >= 0xabe && c <= 0xac0) || c === 0xac9 || c === 0xacb || c === 0xacc;

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* judge: is this value right for this item? (numbers compare as numbers; a word key by its id or words) */
const judge = (item: any, v: any) => {
  if (item.choices) {
    const s = String(v ?? "").trim().toLowerCase();
    return s === String(item.answer).toLowerCase() || s === KC_CHOICE[item.answer].toLowerCase();
  }
  return leadNumber(v) === item.answer;
};
/* oracle: every answer re-derived by taking the key away again and again (repeated subtraction), a route that
   shares no code with judge or the checker's division */
const kcTakeAway = (v: number, k: number) => { let n = 0, left = v; while (left >= k) { left -= k; n += 1; } return { n, left }; };
const kcOracle = (it: any): any => {
  const vs: number[] = it.rows ? it.rows.map((r: any) => r[1]) : [];
  const fitsWith = (k: number, halves: boolean) => vs.every((v) => { const t = kcTakeAway(v, k); return t.left === 0 || (halves && t.left + t.left === k); });
  const longest = (k: number) => Math.max(...vs.map((v) => kcTakeAway(v, k).n));
  if (it.kind === "fit") return fitsWith(it.key, false) ? "fits" : "nofit";
  if (it.kind === "half") { const t = kcTakeAway(vs[it.focus], it.key); return t.left === 0 ? "s" + t.n : t.left + t.left === it.key ? "s" + t.n + "h" : null; }
  if (it.kind === "which") { const ok = it.dial.filter((k: number) => fitsWith(k, true)); return ok.length === 1 ? ok[0] : null; }
  if (it.kind === "good") return fitsWith(it.key, true) && longest(it.key) > MODEL.shownMax ? "many" : "good";
  if (it.kind === "total") return fitsWith(it.key, false) ? vs.reduce((a, v) => a + kcTakeAway(v, it.key).n, 0) : null;
  if (it.kind === "better") { const ok = it.dial.filter((k: number) => fitsWith(k, true) && longest(k) <= MODEL.shownMax); return ok.length === 1 ? ok[0] : null; }
  if (it.kind === "read") {
    const syms: number[] = it.pict.rows.map((r: any) => r[1]);
    if (it.reads === "most") return Math.max(...syms) * it.pict.key;
    const twin = syms.find((x, i) => syms.indexOf(x) !== i);
    return twin === undefined ? null : twin * it.pict.key;
  }
  if (it.kind === "notin") return it.about === it.pict.unit || it.about === it.pict.title ? null : "none";
  return null;
};
const oracle = () => PHASES.every((p: any) => p.items.every((it: any) => kcOracle(it) === it.answer
  && (!it.choices || it.choices.filter((c: any) => c.id === it.answer).length === 1)));
/* the most likely wrong answer (the misconception); judge must reject it */
const nearMiss = (item: any) => item.near;
/* the forms of an answer that no question, hint or ladder line may print */
const answerForms = (item: any) => (item.choices ? [KC_CHOICE[item.answer]]
  : [String(item.answer), indian(item.answer), words(item.answer)]);
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => item.answer;

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => (T.state().stage === "demo" ? HOOK.demo && HOOK.demo() : T.submit(item.answer));
/* every answer is typed or a word key: nothing is set on the working area for the agent */
const answer = (item: any, v: any) => (item.pad === "enter" && HOOK.set ? HOOK.set(v) : undefined);
const check = () => (HOOK.check ? HOOK.check() : undefined);

/* ── the working area: 1086 x 528, origin at its top-left ────────────────────────────────────
   left: the data card (0..240), the key dial under it; right: the checker board, one row a number.
   A row: its name, its symbols (green, one key's worth each, a half is the left half), and a tag at its end
   (what is still to lay while laying; then a lamp when the row lights, or the loose leftover in amber).
   Phase 1 lays whole symbols only; phase 2 lets the child lay the leftover against half the key; from
   phase 3 the checker lays every row itself and closes a half. Phase 4 is the finished pictograph. */
const KC = { card: 240, bx: 256, bw: 830, nameX: 268, sx: 410, pitch: 40, r: 16, tagX: 988, tagW: 92, rowH: 72, gap: 78, top: 8, top4: 62, dialY: 300 };

function Work({ phase, n, item, index, stage, wrong, typed, api, MODEL, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();
  const free = stage === "free";
  const sig = free ? "free" : n + ":" + index;
  const p4 = !free && n === 4;
  const auto = free || n >= 3;            /* the checker lays every row out and closes a half by itself */
  const G = CONTENT.one, GE = shade(CONTENT.one, 0.3), AM = CONTENT.ten, SKY = "#56B4E9";
  const autoRef = useRef(auto); autoRef.current = auto;
  const fastNow = () => reducedMotion();

  const cardOf = (fc: number) => MODEL.freeCards[fc % MODEL.freeCards.length];
  const layRow = (v: number, key: number, on: boolean, fast: boolean) => {
    const w = kcWhole(v, key), shown = on ? (fast ? w : 0) : 0;
    return { on, shown, half: on && autoRef.current && shown >= w && kcHalfOk(v, key) ? 2 : 0 };
  };
  const fresh = (): any => {
    if (free) { const key = 10; return { sig, fc: 0, key, rows: cardOf(0).rows.map((r: any) => layRow(r[1], key, true, true)), demo: null, bands: [] }; }
    if (p4) return { sig, key: item.pict.key, rows: [], demo: null, bands: [] };
    const key = item.start ?? item.key;
    return { sig, key, rows: item.rows.map((r: any, k: number) => layRow(r[1], key, auto || (item.kind === "half" && k === item.focus), true)), demo: null, bands: [] };
  };
  const [S, setS] = useState<any>(fresh);
  const s = S.sig === sig ? S : fresh();
  const sigRef = useRef(sig); sigRef.current = sig;
  const freshRef = useRef(fresh); freshRef.current = fresh;
  const put = (fn: (p: any) => any) => setS((prev: any) => { const base = prev.sig === sigRef.current ? prev : freshRef.current(); return { ...base, ...fn(base) }; });

  const vals: number[] = p4 ? [] : (free ? cardOf(s.fc).rows : item.rows).map((r: any) => r[1]);
  const names: string[] = p4 ? item.pict.rows.map((r: any) => r[0]) : (free ? cardOf(s.fc).rows : item.rows).map((r: any) => r[0]);
  const valsRef = useRef(vals); valsRef.current = vals;
  const keyRef = useRef(s.key); keyRef.current = s.key;

  const timers = useRef<any[]>([]);
  const later = (fn: () => void, ms: number) => { timers.current.push(setTimeout(fn, ms)); };
  useEffect(() => () => timers.current.forEach(clearTimeout), []);
  /* a new question, a new phase or free play: a fresh board, nothing of the last one still running */
  useEffect(() => {
    timers.current.forEach(clearTimeout); timers.current = [];
    tl.stop();
    setS((prev: any) => (prev.sig === sig ? prev : freshRef.current()));
  }, [sig]);

  /* the checker lays a row one key's worth at a time; past the board's edge it jumps to the end */
  useEffect(() => {
    if (p4 || S.sig !== sig) return;
    const pending = S.rows.some((r: any, k: number) => r.on && r.shown < kcWhole(vals[k], S.key));
    if (!pending) return;
    const t = setTimeout(() => {
      const ends = S.rows.some((r: any, k: number) => { const w = kcWhole(vals[k], S.key); return r.on && r.shown < w && (r.shown + 1 >= w || r.shown + 1 >= MODEL.shownMax); });
      put((p: any) => ({ rows: p.rows.map((r: any, k: number) => {
        const v = valsRef.current[k], w = kcWhole(v, p.key);
        if (!r.on || r.shown >= w) return r;
        const nx = r.shown + 1 >= MODEL.shownMax ? w : r.shown + 1;
        return { ...r, shown: nx, half: nx >= w && autoRef.current && kcHalfOk(v, p.key) ? 2 : r.half };
      }) }));
      if (ends) api.sfx.tick();
    }, 95);
    return () => clearTimeout(t);
  }, [S]);

  /* the checker's verbs (the child's acts and the traceback both use them) */
  const lay = (k: number) => {
    const f = fastNow();
    put((p: any) => ({ rows: p.rows.map((r: any, j: number) => (j === k ? layRow(valsRef.current[j], p.key, true, f) : r)) }));
    if (f) api.sfx.tick();
  };
  const setKey = (key: number) => {
    const f = fastNow();
    put(() => ({ key, rows: valsRef.current.map((v: number) => layRow(v, key, autoRef.current, f)) }));
  };
  /* the leftover laid against the key's symbol folded in two: it stays when they match, else it comes back off */
  const tryHalf = (k: number) => {
    const ok = kcHalfOk(valsRef.current[k], keyRef.current);
    put((p: any) => ({ rows: p.rows.map((r: any, j: number) => (j === k ? { ...r, half: 1 } : r)) }));
    later(() => {
      put((p: any) => ({ rows: p.rows.map((r: any, j: number) => (j === k ? { ...r, half: kcHalfOk(valsRef.current[j], p.key) ? 2 : 3 } : r)) }));
      if (ok) api.sfx.tick();
    }, fastNow() ? 30 : 900);
  };

  const live = (stage === "ask" || stage === "teach" || free) && !tl.busy;
  const clearDemo = () => { if (S.demo) put(() => ({ demo: null })); };
  const tapRow = (k: number) => {
    if (!live) return;
    clearDemo();
    if (p4) put((p: any) => ({ bands: p.bands.includes(k) ? p.bands.filter((x: number) => x !== k) : [...p.bands, k] }));
    else lay(k);
  };
  const tapTag = (k: number) => { if (!live) return; clearDemo(); tryHalf(k); };
  const dial: number[] = free ? MODEL.freeDial : (item.dial || []);
  const di = dial.indexOf(s.key);
  const turn = (d: number) => {
    if (!live) return;
    const nk = dial[di + d];
    if (nk === undefined) return;
    clearDemo(); setKey(nk); api.sfx.tick();
  };
  const newCard = () => {
    if (!live) return;
    const f = fastNow();
    put((p: any) => { const fc = p.fc + 1; return { fc, rows: cardOf(fc).rows.map((r: any) => layRow(r[1], p.key, true, f)) }; });
  };

  /* Enter and choice taps go straight to the runtime: every answer is typed or a word key */
  api.onEnter(null);

  /* the traceback: the checker redraws the maths and ends on the whole right answer (written under the
     board, or landing in a row's tag, or the card in the tray); nothing is marked, the child's answer stays */
  useEffect(() => {
    if (!wrong || stage !== "ask" || free) return;
    api.lock(true);
    const it = item, f = fastNow(), vs = vals;
    const wait = (ms: number) => (f ? 25 : ms);
    const gapOf = (v: number, key: number) => wait(Math.min(kcWhole(v, key), MODEL.shownMax) * 95 + 520);
    const steps: any[] = [[wait(300), () => put(() => ({ demo: null }))]];
    const layAll = (key: number) => vs.forEach((v: number, k: number) => steps.push([gapOf(v, key), () => lay(k)]));
    const halves = (key: number) => vs.forEach((v: number, k: number) => { if (kcLeft(v, key) > 0) steps.push([wait(1300), () => tryHalf(k)]); });
    const verdict = (extra?: any) => steps.push([0, () => put(() => ({ demo: { verdict: true, ...(extra || {}) } }))]);
    /* the dial turns back to the question's key only if the child left it elsewhere: rows the child laid out
       with that key stay as they are (a correction resets nothing) */
    const keyBack = (key: number) => { if (keyRef.current !== key) setKey(key); };
    if (it.kind === "fit") { steps.push([wait(300), () => keyBack(it.key)]); layAll(it.key); verdict(); }
    else if (it.kind === "half") {
      steps.push([wait(300), () => keyBack(it.key)]);
      steps.push([gapOf(vs[it.focus], it.key), () => lay(it.focus)]);
      steps.push([wait(1300), () => tryHalf(it.focus)]);
      verdict();
    } else if (it.kind === "which") {
      const tried = leadNumber(wrong.value);
      const other = tried !== null && it.dial.includes(tried) && tried !== it.answer ? tried : it.dial.find((k: number) => k !== it.answer);
      steps.push([wait(300), () => setKey(other)]); layAll(other); halves(other);
      steps.push([wait(500), () => setKey(it.answer)]); layAll(it.answer); halves(it.answer);
      verdict();
    } else if (it.kind === "good" || it.kind === "total") {
      steps.push([gapOf(Math.max(...vs), it.key), () => setKey(it.key)]);
      verdict({ total: true });
    } else if (it.kind === "better") {
      const other = it.dial.find((k: number) => k !== it.answer);
      steps.push([wait(1900), () => setKey(other)]);
      steps.push([wait(1500), () => setKey(it.answer)]);
      verdict();
    } else if (it.kind === "read") {
      steps.push([wait(900), () => put(() => ({ demo: { bands: it.target } }))]);
      steps.push([wait(1100), () => put(() => ({ demo: { bands: it.target, mult: true } }))]);
      steps.push([0, () => put(() => ({ demo: { bands: it.target, mult: true, value: true } }))]);
    } else if (it.kind === "notin") {
      steps.push([wait(1000), () => put(() => ({ demo: { cardAt: "board" } }))]);
      steps.push([wait(1300), () => put(() => ({ demo: { cardAt: "board", ring: true } }))]);
      steps.push([0, () => put(() => ({ demo: { cardAt: "tray" } }))]);
    }
    tl.run(steps, () => api.lock(false));
  }, [wrong]);

  /* a win: every row laid out under the key the answer names (the rows light, or a loose leftover shows why not) */
  useEffect(() => {
    if (stage !== "win" || free || !["fit", "which", "better"].includes(item.kind)) return;
    const key = item.kind === "fit" ? item.key : item.answer;
    put(() => ({ key, rows: valsRef.current.map((v: number) => ({ on: true, shown: kcWhole(v, key), half: n >= 2 && kcHalfOk(v, key) ? 2 : 0 })) }));
  }, [stage]);

  /* what the correction left, or the win showing the answer the child gave */
  const winDemo = stage === "win" && !free ? { verdict: true, total: true, bands: item.target, mult: true, value: true, cardAt: item.kind === "notin" ? "tray" : "stack" } : null;
  const dm: any = s.demo || winDemo;

  /* one row, read off the board */
  const rowTop = (k: number) => (p4 ? KC.top4 : KC.top) + k * KC.gap;
  const info = (k: number) => {
    const v = vals[k], r = s.rows[k] || { on: false, shown: 0, half: 0 };
    const w = kcWhole(v, s.key), left = kcLeft(v, s.key);
    const forced = stage === "win" && !free && item.kind === "half" && k === item.focus && item.key === s.key;
    const done = forced || (r.on && r.shown >= w);
    const halfOn = forced ? left * 2 === s.key : r.half === 2;
    const lit = done && (left === 0 || halfOn);
    const shown = forced ? w : r.on ? Math.min(r.shown, w) : 0;
    return { v, r, w, left, done, halfOn, lit, shown, trying: !forced && r.half === 1, tried: !forced && r.half === 3,
      count: done ? w + (halfOn ? 0.5 : 0) : shown };
  };

  /* what the host and the agent read back (toolApi.getState); the symbol total of a count question stays
     out until it is answered */
  const hideTotal = !free && !p4 && item.kind === "total" && !(dm && dm.total);
  /* phase 4 counts only the row the child banded last (or the row a correction reads), nothing before */
  const bandsNow: number[] = p4 ? ((dm && dm.bands) || s.bands) : [];
  const symbolCount = p4 ? (bandsNow.length ? item.pict.rows[bandsNow[bandsNow.length - 1]][1] : null) : vals.reduce((a, v, k) => a + info(k).count, 0);
  const litCount = p4 ? 0 : vals.filter((v, k) => info(k).lit).length;
  /* (never a field named `key`: the dev driver's state reads the agent's answer under that name) */
  api.share(p4 ? { pictograph: item.pict.title, pictKey: item.pict.key, symbolCount, questions: item.card }
    : { data: vals, trialKey: s.key, leftovers: vals.map((v, k) => (info(k).done ? info(k).left : null)), symbolCount: hideTotal ? null : symbolCount, rowsLit: litCount });

  /* ── drawing helpers (called, never mounted) ── */
  const sym = (cx: number, cy: number, r: number, key?: any) => (
    <g key={key}>
      <circle cx={cx} cy={cy} r={r} fill="url(#gOne)" stroke={GE} strokeWidth={2} />
      <ellipse cx={cx - r * 0.3} cy={cy - r * 0.42} rx={r * 0.42} ry={r * 0.2} fill="#FFFFFF" fillOpacity={0.45} />
    </g>
  );
  const halfSym = (cx: number, cy: number, r: number, dashed?: boolean, key?: any) => (
    <path key={key} d={`M ${cx} ${cy - r} A ${r} ${r} 0 0 0 ${cx} ${cy + r} Z`} fill="url(#gOne)" stroke={GE} strokeWidth={2} strokeDasharray={dashed ? "5 4" : undefined} />
  );
  const lamp = (cx: number, cy: number, sc = 1) => (
    <g>
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => { const a = (i * Math.PI) / 4; return (
        <line key={i} x1={cx + Math.cos(a) * 15 * sc} y1={cy + Math.sin(a) * 15 * sc} x2={cx + Math.cos(a) * 22 * sc} y2={cy + Math.sin(a) * 22 * sc} stroke={C.ink} strokeWidth={3} strokeLinecap="round" />
      ); })}
      <circle cx={cx} cy={cy} r={10 * sc} fill="#FFFFFF" stroke={C.ink} strokeWidth={3} />
    </g>
  );
  const symX = (i: number) => KC.sx + KC.r + 2 + i * KC.pitch;
  /* a text's width, roughly: a Latin letter or digit about 0.56 of the size; a Hindi or Gujarati letter 0.72, or
     0.3 when a halant makes it a half letter; a vowel sign beside its letter 0.3; a sign above or below nothing */
  const tw = (str: string, size: number) => {
    const cs = Array.from(str).map((ch) => ch.charCodeAt(0));
    return cs.reduce((a: number, c: number, i: number) => {
      const next = cs[i + 1] === 0x93c || cs[i + 1] === 0xabc ? cs[i + 2] : cs[i + 1];
      return a + (kcMark(c) ? 0 : kcBeside(c) ? 0.3 : c >= 0x900 && c < 0xb00 ? (next === 0x94d || next === 0xacd ? 0.3 : 0.72) : 0.56);
    }, 0) * size;
  };
  const tagC = KC.tagX + KC.tagW / 2;

  /* the running count, each reading under its label: every symbol on the board (a half is a half; in phase 4
     the banded row's), and the rows lit against the rows */
  const runs = (
    <g data-zone="runs">
      <rect x={0} y={-94} width={330} height={76} rx={RAD.panel} fill="url(#gPanel)" stroke={C.rule} strokeWidth={2} />
      <text x={18} y={lang === "en" ? -66 : -62} fontSize={T.micro} fontWeight={500} fill={C.ink}>{tx("symbols")}</text>
      {sym(30, -37, 11)}
      {hideTotal
        ? <rect x={48} y={-53} width={84} height={31} rx={8} fill="#FFFFFF" stroke={C.ink} strokeWidth={2} strokeDasharray="7 5" />
        : symbolCount !== null && <text x={48} y={-26} fontSize={T.label} fontWeight={700} fill={C.ink}>{kcNum(symbolCount)}</text>}
      {!p4 && (
        <g transform={lang === "en" ? undefined : "translate(-30 0)"}>
          <text x={190} y={lang === "en" ? -66 : -62} fontSize={T.micro} fontWeight={500} fill={C.ink}>{tx("rows lit")}</text>
          {lamp(203, -36, 0.55)}
          {/* "3 of 4" in English; Hindi and Gujarati say it the other way round ("4 में से 3", "4 માંથી 3") */}
          <text x={222} y={-26} fontSize={T.micro} fontWeight={700} fill={C.ink}>{lang === "en" ? `${litCount} ${tx("of")} ${vals.length}` : `${vals.length} ${tx("of")} ${litCount}`}</text>
        </g>
      )}
    </g>
  );

  /* the data card and the key dial (phases 1 to 3, free play) */
  const cardRows = free ? cardOf(s.fc).rows : p4 ? [] : item.rows;
  const cardH = 56 + cardRows.length * 44 + 10;
  const dataCard = !p4 && (
    <g>
      <rect x={0} y={0} width={KC.card} height={cardH} rx={RAD.panel} fill="#FFFFFF" stroke={C.ink} strokeWidth={2} filter="url(#fShadowSoft)" />
      <text x={16} y={38} fontSize={T.label} fontWeight={700} fill={C.ink}>{tx(free ? cardOf(s.fc).title : item.title)}</text>
      <line x1={16} x2={KC.card - 16} y1={52} y2={52} stroke={C.ink} strokeWidth={1.5} />
      {cardRows.map((r: any, j: number) => (
        <g key={j}>
          <text x={16} y={90 + j * 44} fontSize={T.micro} fontWeight={500} fill={C.ink}>{tx(r[0])}</text>
          <text x={KC.card - 16} y={90 + j * 44} textAnchor="end" fontSize={T.label} fontWeight={700} fill={C.ink}>{indian(r[1])}</text>
        </g>
      ))}
    </g>
  );
  const dialOn = live;
  /* the dial: its caption between the two arrows, and under them the key itself, symbol = value (as the
     pictograph's key strip writes it), so "= 100" never squeezes between the arrows (panel 300..440; free
     play's new-card key starts at 452) */
  const DY = KC.dialY;
  const dialText = `= ${indian(s.key)}`, dialX = KC.card / 2 - (28 + 10 + tw(dialText, T.label)) / 2;
  const dialPanel = !p4 && (
    <g>
      <rect x={0} y={DY} width={KC.card} height={140} rx={RAD.panel} fill="#FFFFFF" stroke={C.ink} strokeWidth={2} />
      <text x={KC.card / 2} y={DY + 54} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("key")}</text>
      <Key id="dial-down" label="smaller key" x={2} y={DY + 8} w={72} h={72} C={C} disabled={!dialOn || di <= 0} onClick={() => turn(-1)}>
        <path d="M 9 -14 L -11 0 L 9 14 Z" fill={dialOn && di > 0 ? C.ink : mix(C.ink, C.panel, 0.5)} />
      </Key>
      <Key id="dial-up" label="larger key" x={KC.card - 74} y={DY + 8} w={72} h={72} C={C} disabled={!dialOn || di >= dial.length - 1} onClick={() => turn(1)}>
        <path d="M -9 -14 L 11 0 L -9 14 Z" fill={dialOn && di < dial.length - 1 ? C.ink : mix(C.ink, C.panel, 0.5)} />
      </Key>
      {sym(dialX + 14, DY + 117, 14)}
      <text x={dialX + 38} y={DY + 128} fontSize={T.label} fontWeight={700} fill={C.ink}>{dialText}</text>
    </g>
  );

  /* the checker board (phases 1 to 3, free play) */
  const boardRows = !p4 && vals.map((v, k) => {
    const y = rowTop(k), f = info(k), over = f.done && f.w > MODEL.shownMax;
    /* a Hindi or Gujarati name's vowel sign rises above its line: an overflowing row's name and count sit 2 lower */
    const lo = lang === "en" ? 0 : 2;
    const vis = Math.min(f.shown, MODEL.shownMax);
    return (
      <g key={k}>
        <rect x={KC.bx} y={y} width={KC.bw} height={KC.rowH} rx={14} fill={f.lit ? "#FFFFFF" : tint(C.panel, 0.5)}
          stroke={f.lit ? C.ink : tint(C.rule, 0.1)} strokeWidth={f.lit ? 3 : 1.5} />
        <text x={KC.nameX} y={y + (over ? 32 + lo : 46)} fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx(names[k])}</text>
        {over && (
          <g>
            {sym(KC.nameX + 9, y + 54 + lo, 8)}
            <text x={KC.nameX + 24} y={y + 64 + lo} fontSize={T.micro} fontWeight={700} fill={C.ink}>{kcNum(f.count)}</text>
          </g>
        )}
        {Array.from({ length: vis }).map((_, i) => sym(symX(i), y + 36, KC.r, i))}
        {(f.halfOn || f.trying) && f.w < MODEL.shownMax && halfSym(symX(f.w), y + 36, KC.r, f.trying, "h")}
        {over && <path d={`M ${KC.sx + MODEL.shownMax * KC.pitch + 2} ${y + 4} l 8 8 l -8 8 l 8 8 l -8 8 l 8 8 l -8 8 l 8 8 l -8 8`} fill="none" stroke={C.ink} strokeWidth={2.5} strokeLinejoin="round" />}
        {/* the tag at the row's end */}
        {f.r.on && !f.done && <text x={tagC} y={y + 47} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{indian(f.v - f.shown * s.key)}</text>}
        {f.lit && lamp(tagC, y + 36)}
        {f.done && !f.lit && !f.trying && !f.tried && (
          <g>
            <rect x={KC.tagX + 6} y={y + 12} width={KC.tagW - 12} height={48} rx={10} fill={tint(AM, 0.8)} stroke={AM} strokeWidth={2.5} strokeDasharray="7 4" />
            <text x={tagC} y={y + 47} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={shade(AM, 0.4)}>{indian(f.left)}</text>
          </g>
        )}
        {f.done && !f.lit && (f.trying || f.tried) && (
          <g>
            <rect x={KC.tagX + 8} y={y + 5} width={KC.tagW - 16} height={32} rx={8} fill={tint(AM, 0.8)} stroke={AM} strokeWidth={2} strokeDasharray="6 4" />
            <text x={tagC} y={y + 31} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={shade(AM, 0.4)}>{indian(f.left)}</text>
            {halfSym(KC.tagX + 22, y + 55, 10)}
            <text x={KC.tagX + 34} y={y + 66} fontSize={T.micro} fontWeight={700} fill={shade(G, 0.4)}>{kcNum(s.key / 2)}</text>
          </g>
        )}
      </g>
    );
  });

  /* the finished pictograph (phase 4): a title, a key, rows of symbols; a band lies behind a row read */
  const pict = p4 ? item.pict : null;
  const bandsShown: number[] = (dm && dm.bands) || s.bands;
  const pictRows = p4 && pict.rows.map((r: any, k: number) => {
    const y = rowTop(k), n2 = r[1], banded = bandsShown.includes(k);
    return (
      <g key={k}>
        <rect x={KC.bx} y={y} width={KC.bw} height={KC.rowH} rx={14} fill="#FFFFFF" stroke={C.ink} strokeWidth={1.5} />
        {banded && <rect x={KC.sx - 6} y={y + 8} width={n2 * KC.pitch + 8} height={KC.rowH - 16} rx={12} fill={tint(SKY, 0.5)} stroke={SKY} strokeWidth={2} />}
        <text x={KC.nameX} y={y + 46} fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx(r[0])}</text>
        {Array.from({ length: n2 }).map((_, i) => sym(symX(i), y + 36, KC.r, i))}
        {dm && dm.value && item.target && item.target.includes(k) && (
          <text x={tagC} y={y + 47} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{indian(n2 * pict.key)}</text>
        )}
      </g>
    );
  });
  const stripX = Math.max(800, 730 + tw(tx("key"), T.micro) + (lang === "en" ? 23 : 35));
  const pictHead = p4 && (
    <g>
      {/* each strip carries its own name ("title", "key"), the words the hints use */}
      <rect x={KC.bx} y={0} width={444} height={50} rx={10} fill="#FFFFFF" stroke={dm && dm.ring ? C.accent : C.ink} strokeWidth={dm && dm.ring ? 5 : 2} />
      <text x={KC.bx + 18} y={36} fontSize={T.label} fontWeight={700} fill={C.ink}>{tx(pict.title)}</text>
      <text x={KC.bx + 428} y={34} textAnchor="end" fontSize={T.micro} fontWeight={500} fill={mix(C.ink, "#FFFFFF", 0.3)}>{tx("title")}</text>
      <rect x={716} y={0} width={370} height={50} rx={10} fill="#FFFFFF" stroke={dm && dm.ring ? C.accent : C.ink} strokeWidth={dm && dm.ring ? 5 : 2} />
      <text x={730} y={34} fontSize={T.micro} fontWeight={500} fill={mix(C.ink, "#FFFFFF", 0.3)}>{tx("key")}</text>
      {/* the symbol sits clear of the caption, however long the caption runs in the language in use */}
      {sym(stripX, 25, 15)}
      <text x={stripX + 24} y={36} fontSize={T.label} fontWeight={600} fill={C.ink}>{`= ${indian(pict.key)} ${tx(pict.unit)}`}</text>
    </g>
  );
  /* the question card and the tray headed "not in this data" (phase 4) */
  const cardAt = p4 ? ((dm && dm.cardAt) || "stack") : "stack";
  const CP: any = { stack: [10, 10], board: [560, 170], tray: [10, 392] };
  const qCard = (x: number, y: number) => (
    <g pointerEvents="none" filter="url(#fShadowSoft)">
      <rect x={x} y={y} width={220} height={110} rx={14} fill="#FFFFFF" stroke={C.ink} strokeWidth={2} />
      <circle cx={x + 30} cy={y + 30} r={17} fill={tint(C.accent, 0.8)} stroke={C.ink} strokeWidth={2} />
      <text x={x + 30} y={y + 40} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={C.ink}>?</text>
      <text x={x + 110} y={y + 86} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{tx(item.card)}</text>
    </g>
  );
  const leftCol = p4 && (
    <g>
      {Array.from({ length: Math.max(0, 2 - index) }).map((_, j) => (
        <rect key={j} x={10 + (2 - index - j) * 6} y={10 + (2 - index - j) * 6} width={220} height={110} rx={14} fill={tint(C.panel, 0.4)} stroke={C.ink} strokeWidth={1.5} />
      ))}
      <rect x={0} y={300} width={KC.card} height={220} rx={16} fill="none" stroke={C.ink} strokeWidth={2} strokeDasharray="10 8" />
      {/* Hindi and Gujarati marks rise above and fall below the line: their two lines sit 38 apart, not 32 */}
      <text x={KC.card / 2} y={336} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{kcTrayLines(lang, tx)[0]}</text>
      <text x={KC.card / 2} y={lang === "en" ? 368 : 374} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{kcTrayLines(lang, tx)[1]}</text>
      {cardAt === "stack" && qCard(CP.stack[0], CP.stack[1])}
    </g>
  );

  /* the answer written out after a correction (and on a win): at most four words a label */
  const chipY = p4 ? rowTop(pict.rows.length) + 6 : 404;
  const chip = () => {
    if (free || !dm) return null;
    const it = item, cx = KC.bx + KC.bw / 2;
    if (p4) {
      if (it.kind !== "read" || !dm.mult) return null;
      const syms = pict.rows[it.target[0]][1];
      const a = `${syms} × ${indian(pict.key)}`, b = `= ${indian(syms * pict.key)}`;
      const wa = tw(a, T.label), wb = dm.value ? tw(b, T.label) + 16 : 0, W2 = wa + wb + 48;
      return (
        <g>
          <rect x={cx - W2 / 2} y={chipY} width={W2} height={62} rx={31} fill="#FFFFFF" stroke={C.ink} strokeWidth={2.5} />
          <text x={cx - W2 / 2 + 24} y={chipY + 42} fontSize={T.label} fontWeight={700} fill={C.ink}>{a}</text>
          {dm.value && <text x={cx - W2 / 2 + 24 + wa + 16} y={chipY + 42} fontSize={T.label} fontWeight={700} fill={C.ink}>{b}</text>}
        </g>
      );
    }
    if (!dm.verdict) return null;
    const keyOf = it.kind === "which" || it.kind === "better" ? it.answer : it.key;
    const text = it.kind === "fit" || it.kind === "half" ? KC_CHOICE[it.answer] : it.kind === "which" ? "fits every row"
      : it.kind === "good" ? "too many symbols" : it.kind === "total" ? `${indian(it.answer)} symbols` : "short rows";
    const keyText = `= ${indian(keyOf)}`;
    const mini = it.kind === "half" ? { w: kcWhole(it.rows[it.focus][1], it.key) } : null;
    const lead = it.kind === "total" ? 0 : mini ? mini.w * 28 + 28 + 18 : 30 + 8 + tw(keyText, T.label) + 18;
    const W2 = lead + tw(tx(text), T.label) + 48, x0 = cx - W2 / 2;
    /* Hindi and Gujarati widths are only estimates: their words sit centred in the room kept for them, so any
       error splits evenly between the two ends */
    const wordX = lang === "en" ? x0 + 24 + lead : x0 + 24 + lead + tw(tx(text), T.label) / 2;
    return (
      <g>
        <rect x={x0} y={chipY} width={W2} height={64} rx={32} fill="#FFFFFF" stroke={C.ink} strokeWidth={2.5} />
        {mini && Array.from({ length: mini.w }).map((_, i) => sym(x0 + 38 + i * 28, chipY + 32, 12, i))}
        {mini && halfSym(x0 + 38 + mini.w * 28, chipY + 32, 12)}
        {!mini && it.kind !== "total" && sym(x0 + 38, chipY + 32, 14)}
        {!mini && it.kind !== "total" && <text x={x0 + 60} y={chipY + 43} fontSize={T.label} fontWeight={700} fill={C.ink}>{keyText}</text>}
        <text x={wordX} y={chipY + 43} textAnchor={lang === "en" ? undefined : "middle"} fontSize={T.label} fontWeight={700} fill={C.ink}>{tx(text)}</text>
      </g>
    );
  };

  /* the one thing that invites a finger, while a question waits */
  const invite = () => {
    if (stage !== "ask" || s.demo || tl.busy) return null;
    const anyOn = s.rows.some((r: any) => r.on);
    if (p4) return s.bands.length ? null : <Invite x={symX(0) + 20} y={rowTop(0) + 36} r={34} C={C} />;
    if (item.kind === "half") { const f = info(item.focus); return f.done && !f.lit && !f.tried && !f.trying ? <Invite x={tagC} y={rowTop(item.focus) + 36} r={42} C={C} /> : null; }
    if (item.kind === "fit" || item.kind === "which") return anyOn ? null : <Invite x={symX(0) + 20} y={rowTop(0) + 36} r={34} C={C} />;
    if (item.kind === "good" || item.kind === "better") return s.key === (item.start ?? item.key) ? <Invite x={KC.card - 38} y={KC.dialY + 44} r={36} C={C} /> : null;
    return null;
  };

  const halfTaps = !free && n === 2;
  return (
    <g>
      {runs}
      {dataCard}
      {dialPanel}
      {free && (
        <Key id="new-card" label="new card" x={0} y={452} w={KC.card} h={72} C={C} disabled={!live} onClick={newCard}>
          <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={C.ink}>{tx("new card")}</text>
        </Key>
      )}
      {pictHead}
      {boardRows}
      {pictRows}
      {leftCol}
      {live && (p4 ? pict.rows : vals).map((_: any, k: number) => (
        <Hit key={"row" + k} id={"row-" + (k + 1)} x={KC.bx} y={rowTop(k)} w={KC.tagX - KC.bx - 4} h={KC.rowH}
          label={(p4 ? "mark the row " : "check the row ") + names[k]} onPress={() => tapRow(k)} />
      ))}
      {live && halfTaps && vals.map((v, k) => {
        const f = info(k);
        return f.done && f.left > 0 && !f.halfOn && !f.trying ? (
          <Hit key={"tag" + k} id={"half-" + (k + 1)} x={KC.tagX} y={rowTop(k)} w={KC.tagW} h={KC.rowH}
            label={"try a half on the row " + names[k]} onPress={() => tapTag(k)} />
        ) : null;
      })}
      <g pointerEvents="none">
        {chip()}
        {p4 && cardAt !== "stack" && qCard(CP[cardAt][0], CP[cardAt][1])}
      </g>
      {invite()}
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase:
   result.last = { value, answer, kind, item, shared } (shared = what api.share held at that moment) */
function Thumb({ n, result, C, w, h, lang = "en", tx = (v: any) => v }: any) {
  const last = result && result.last;
  const ph: any = PHASES[(n || 1) - 1];
  const it: any = last && ph && ph.items[last.item];
  if (!it) return null;
  const G = shade(CONTENT.one, 0.3), en = lang === "en";
  const disc = (cx: number, cy: number, r: number) => <circle cx={cx} cy={cy} r={r} fill="url(#gOne)" stroke={G} strokeWidth={2} />;
  const key = it.pict ? it.pict.key : it.kind === "which" || it.kind === "better" ? it.answer : it.key;
  const unit = it.pict ? " " + tx(it.pict.unit) : "";
  const second = it.choices ? tx(KC_CHOICE[it.answer]) : it.kind === "total" ? `${indian(it.answer)} ${tx("symbols")}`
    : it.kind === "read" ? `${indian(it.answer)}${unit}` : it.kind === "which" ? tx("fits every row") : tx("short rows");
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      {it.kind === "notin" ? (
        <g>
          <rect x={14} y={14} width={44} height={h - 28} rx={8} fill="#FFFFFF" stroke={C.ink} strokeWidth={2} />
          <text x={36} y={h / 2 + 10} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={C.ink}>?</text>
          {/* Hindi and Gujarati: 38 apart, not 32, and line 1 lifted 3 */}
          <text x={72} y={h / 2 - (en ? 6 : 9)} fontSize={T.micro} fontWeight={600} fill={C.ink}>{kcTrayLines(lang, tx)[0]}</text>
          <text x={72} y={h / 2 + (en ? 26 : 29)} fontSize={T.micro} fontWeight={600} fill={C.ink}>{kcTrayLines(lang, tx)[1]}</text>
        </g>
      ) : (
        <g>
          {/* Hindi and Gujarati: the number line 3 higher and the words 3 lower, so their marks clear each other */}
          {disc(26, en ? 24 : 21, 12)}
          <text x={46} y={en ? 34 : 31} fontSize={T.micro} fontWeight={700} fill={C.ink}>{`= ${indian(key)}${unit}`}</text>
          <text x={16} y={h - (en ? 12 : 9)} fontSize={T.micro} fontWeight={600} fill={C.ink}>{second}</text>
        </g>
      )}
    </g>
  );
}

function KeyChooser(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, format: kcFormat, fitHost: () => null }} />
  );
}

export default KeyChooser;
