/* ═══ M1.S2.T3.C8.2D1 · share_out_bench · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists: header + its three controls, canvas, slot + pad, bubble + mascot,
   phase dots (user / AI mode), window.toolApi, sounds, the synced voice, scoring, the events,
   idle and restart. NO imports in this file; only the five host hooks. Follow docs/LAYOUT.md;
   the reference tool is work/indiannica_eng_maths4_ch1/M1.S1.T2.C4.2D1/tool.tsx.
   Edit, never rewrite. Built by `node cli.mjs scaffold`; concepts are verbatim (check compares them). */

const TOOL_ID = "share_out_bench";
const MEDIA_ID = "M1.S2.T3.C8.2D1";
const TOOL_NAME = "Share Out Bench";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
const VOICE = {"rate":0.92,"pitch":1.06};

/* spoken before phase 1's teach lines only (the plan's opening voice line) */
const OPENING = ["A pile on the left and empty bowls on the right. The lower number says how many bowls."];
/* the whole-tool line: spoken on the summary page */
const FINISH_LINE = "Every pile shared out, and the bowls nobody lifted still standing where they were filled.";
/* said when the child opens Free play from the summary page (the plan's free-play voice line) */
const FREE_LINE = "Free play. Any pile and any fraction that divides it. Both working lines and the leftover check are on.";

/* Hindi and Gujarati, keyed by the English line exactly (runtime r21: `lineFor(line, lang, TR)`); the English
   everywhere else stays what the checks read. NCERT class 4 fractions: भिन्न / અપૂર્ણાંક. A fraction in a
   Hindi or Gujarati line is written in words ("सात में से दो भाग" / "સાતમાંથી બે ભાગ"), never "2/7": the voice
   does not speak "/". The word "of" is का / નો. Share (the noun) is हिस्सा / હિસ્સો; divide is भाग दो /
   ભાગાકાર, so the working-line labels read "पहले भाग दो" and "પહેલા ભાગાકાર". Digits stay digits: the runtime
   speaks them in the language in use. A first draft; wants a native speaker's read. */
const TR: any = {
  hi: {
    "Share Out Bench": "बाँटो बेंच",
    "A pile on the left and empty bowls on the right. The lower number says how many bowls.": "बाईं ओर ढेर है और दाईं ओर खाली कटोरे हैं। नीचे की संख्या बताती है कि कितने कटोरे चाहिए।",
    "Every pile shared out, and the bowls nobody lifted still standing where they were filled.": "हर ढेर बाँट दिया गया। जो कटोरे किसी ने नहीं उठाए, वे वहीं खड़े रहे जहाँ भरे थे।",
    "Free play. Any pile and any fraction that divides it. Both working lines and the leftover check are on.": "मुक्त खेल। दोनों हल की पंक्तियाँ और बाकी की जाँच चालू हैं। कोई भी ढेर और भिन्न लो: कटोरे खोलो, बाँटो, उठाओ।",

    "What of means here": "यहाँ “का” का मतलब",
    "This fraction is being taken of the whole pile. How many bowls do you need?": "इस भिन्न को पूरे ढेर में से लेना है। तुम्हें कितने कटोरे चाहिए?",
    "How many bowls does that number ask you to open?": "वह संख्या तुम्हें कितने कटोरे खोलने को कहती है?",
    "Think small: a quarter of 8 means 4 bowls of 2, and one bowl lifted.": "छोटा उदाहरण: 8 की चौथाई यानी 4 कटोरे, हर एक में 2। एक कटोरा उठाया।",
    "Of means split the number into as many equal parts as the lower number says. Then keep as many of those parts as the upper number says.": "“का” का मतलब: नीचे की संख्या जितने बराबर भाग बनाओ। फिर ऊपर की संख्या जितने भाग रखो।",
    "You learned: of means split into equal parts, then keep some of them": "तुमने सीखा: “का” यानी बराबर भागों में बाँटो, फिर कुछ भाग रखो",
    "What does 2/7 of 42 ask you to do, and what is the answer?": "42 का सात में से दो भाग तुम्हें क्या करने को कहता है? उत्तर क्या है?",
    "Two sevenths of 42?": "42 का सात में से दो भाग?",
    "Which number of your fraction is written below the line?": "तुम्हारे भिन्न में रेखा के नीचे कौन सी संख्या लिखी है?",
    "What does 1/6 of 36 mean, and what is it?": "36 का छठा भाग क्या बताता है? वह कितना है?",
    "One sixth of 36?": "36 का छठा भाग?",
    "Deal the whole pile out, then lift only as many bowls as the upper number says.": "पूरा ढेर बाँट दो, फिर ऊपर की संख्या जितने ही कटोरे उठाओ।",
    "Find 1/4 of 28.": "28 की चौथाई निकालो।",
    "A quarter of 28?": "28 की चौथाई?",
    "A quarter means four equal bowls. What does just one of them hold?": "चौथाई यानी चार बराबर कटोरे। उनमें से सिर्फ़ एक में कितना है?",

    "Divide first, then multiply": "पहले भाग दो, फिर गुणा करो",
    "Try it both ways round. Which one keeps the numbers small enough to do in your head?": "दोनों तरीकों से करके देखो। किसमें संख्याएँ इतनी छोटी रहती हैं कि मन में हल हो जाए?",
    "How many bowls does the upper number ask you to lift?": "ऊपर की संख्या तुम्हें कितने कटोरे उठाने को कहती है?",
    "Think small: for 3 eighths of 16, divide first. 16 ÷ 8 is 2, and 3 bowls of 2 make 6.": "छोटा उदाहरण: 16 का आठ में से तीन भाग, पहले भाग दो। 16 ÷ 8 = 2, और 3 कटोरे, हर एक में 2, कुल 6।",
    "Divide by the lower number first, then multiply by the upper number. The same answer arrives through much smaller numbers.": "पहले नीचे की संख्या से भाग दो, फिर ऊपर की संख्या से गुणा करो। उत्तर वही आता है, पर संख्याएँ बहुत छोटी रहती हैं।",
    "You learned: divide first, then multiply, so the numbers stay small": "तुमने सीखा: पहले भाग दो, फिर गुणा करो, तो संख्याएँ छोटी रहती हैं",
    "Find 3/8 of 64, dividing before you multiply. Then say what the other order would have given you to work with.": "64 का आठ में से तीन भाग निकालो, गुणा से पहले भाग देकर। फिर बताओ: दूसरे क्रम में किस संख्या को भाग देना पड़ता?",
    "Share? And the multiply line's middle?": "हिस्सा? और गुणा पंक्ति की बीच वाली संख्या?",
    "The share is what three bowls hold together. The multiply line starts with 64 times 3.": "हिस्सा वह है जो तीन कटोरे मिलकर रखते हैं। गुणा पंक्ति 64 गुणा 3 से शुरू होती है।",
    "Now take 2/9 of 54. Deal first, and watch which line fills in.": "अब 54 का नौ में से दो भाग लो। पहले बाँटो, और देखो कौन सी पंक्ति भरती है।",
    "Two ninths of 54?": "54 का नौ में से दो भाग?",
    "One bowl holds only part of the share. Two bowls go up to the tray.": "एक कटोरे में पूरा हिस्सा नहीं है। दो कटोरे ट्रे में जाते हैं।",
    "Find 4/7 of 63. Which number would multiplying first have made you divide?": "63 का सात में से चार भाग निकालो। पहले गुणा करते, तो तुम्हें किस संख्या को भाग देना पड़ता?",
    "Share? And what multiply first divides?": "हिस्सा? पहले गुणा करें तो किसे भाग दें?",
    "Four bowls go up, not one. The lower line has to carry 63 fours.": "चार कटोरे ऊपर जाते हैं, एक नहीं। नीचे की पंक्ति में 63 के चार गुने आते हैं।",

    "One share found, the other still waiting": "एक हिस्सा मिला, दूसरा अभी बाकी",
    "The bowls are dealt already. Lift your share, then count what stays on the bench.": "कटोरे पहले से बँटे हुए हैं। अपना हिस्सा उठाओ, फिर गिनो कि बेंच पर क्या बचा।",
    "How many bowls are still sitting on the bench, and what is in each of them?": "बेंच पर अभी कितने कटोरे रखे हैं, और हर एक में कितना है?",
    "Think small: one third of 12 is 4, so 8 stay on the bench.": "छोटा उदाहरण: 12 की तिहाई 4 है, इसलिए बेंच पर 8 बचे।",
    "The share taken and what is left are two different numbers. Put them back together and the pile is whole again.": "लिया हुआ हिस्सा और बाकी दो अलग संख्याएँ हैं। उन्हें फिर जोड़ दो तो ढेर पूरा हो जाता है।",
    "You learned: the share and what is left add back to the whole": "तुमने सीखा: हिस्सा और बाकी जोड़ने पर पूरा ढेर बनता है",
    "A box holds 72 pencils. 5/9 of them are red and the rest are blue. How many are there of each colour?": "एक डिब्बे में 72 पेंसिलें हैं। उनका नौ में से पाँच भाग लाल है, बाकी नीली। हर रंग की कितनी पेंसिलें हैं?",
    "Red pencils? Blue pencils?": "लाल पेंसिलें? नीली पेंसिलें?",
    "Count the pencils inside the bowls, not the bowls themselves.": "कटोरों के अंदर की पेंसिलें गिनो, कटोरों को नहीं।",
    "A farmer picks 96 mangoes and 3/8 of them are ripe. How many are ripe, and how many are not?": "एक किसान 96 आम तोड़ता है। उनका आठ में से तीन भाग पके हैं। कितने पके हैं, और कितने नहीं?",
    "How many ripe? How many not?": "कितने पके? कितने नहीं?",
    "Every bench bowl holds as many as a tray bowl. How many bowls stayed down?": "बेंच के कटोरे में भी उतना ही है जितना ट्रे के कटोरे में। कितने कटोरे बेंच पर रह गए?",
    "In a class of 40 children, 3/5 walk to school and the rest come by bus. How many come by bus?": "एक कक्षा में 40 बच्चे हैं। उनका पाँच में से तीन भाग पैदल स्कूल आता है, बाकी बस से। कितने बच्चे बस से आते हैं?",
    "How many come by bus?": "कितने बस से आते हैं?",
    "The walkers went up to the tray. Who is still standing on the bench?": "पैदल चलने वाले ट्रे में गए। बेंच पर अब भी कौन खड़ा है?",

    "Checking the answer against the question": "उत्तर को प्रश्न से मिलाकर जाँचना",
    "Read the question once more. Does it want what you took, or what is left?": "प्रश्न को एक बार फिर पढ़ो। क्या वह तुम्हारा लिया हुआ हिस्सा माँगता है, या बाकी?",
    "Does the question point at the tray, or at the bench?": "प्रश्न ट्रे की ओर इशारा करता है, या बेंच की ओर?",
    "Say the last sentence of the question to yourself. Then count only that pile.": "प्रश्न का आखिरी वाक्य मन में बोलो। फिर सिर्फ़ उसी ढेर को गिनो।",
    "Read the question again before the answer is written down, because it may want the share, or what is left, or both of them.": "उत्तर लिखने से पहले प्रश्न फिर पढ़ो। वह हिस्सा माँग सकता है, बाकी माँग सकता है, या दोनों।",
    "You learned: answer what the question asks, the share, the rest or both": "तुमने सीखा: जो प्रश्न माँगे वही बताओ: हिस्सा, बाकी या दोनों",
    "A shop has 45 kites and sells 2/5 of them. The question asks how many kites are left. What is the answer?": "एक दुकान में 45 पतंगें हैं। वह उनका पाँच में से दो भाग बेच देती है। प्रश्न पूछता है कि कितनी पतंगें बचीं। उत्तर क्या है?",
    "How many kites are left?": "कितनी पतंगें बचीं?",
    "The kites that were sold went up to the tray. Which kites is the question about?": "बिकी हुई पतंगें ट्रे में गईं। प्रश्न किन पतंगों के बारे में है?",
    "A jar holds 84 sweets and 5/12 of them are given away. How many sweets are still in the jar?": "एक जार में 84 मिठाइयाँ हैं। उनका बारह में से पाँच भाग बाँट दिया गया। जार में अभी कितनी मिठाइयाँ हैं?",
    "Sweets still in the jar?": "जार में कितनी मिठाइयाँ?",
    "Given away means up on the tray. The jar keeps the bowls on the bench.": "बाँट दिया यानी ट्रे में ऊपर। जार में बेंच के कटोरे रहते हैं।",
    "A library has 132 books and 7/11 of them are story books. How many are story books, and how many are not?": "एक पुस्तकालय में 132 किताबें हैं। उनका ग्यारह में से सात भाग कहानी की किताबें हैं। कहानी की कितनी किताबें हैं, और कितनी नहीं?",
    "Story books? Other books?": "कहानी की किताबें? अन्य किताबें?",
    "This one wants two numbers: the story books and all the others.": "इसमें दो संख्याएँ चाहिए: कहानी की किताबें और बाकी सब।",

    /* the working area's own words */
    "Open some bowls on the bench first.": "पहले बेंच पर कुछ कटोरे खोलो।",
    "A bowl holds twelve at the most. Open more bowls.": "एक कटोरे में ज़्यादा से ज़्यादा बारह आ सकते हैं। और कटोरे खोलो।",
    "of": "का", "together": "मिलाकर", "divide first": "पहले भाग दो", "multiply first": "पहले गुणा",
    "tray": "ट्रे", "bench": "बेंच", "share": "हिस्सा", "multiply": "गुणा", "other": "अन्य", "left": "बाकी",
    "red": "लाल", "blue": "नीली", "ripe": "पके", "not ripe": "कच्चे", "walk": "पैदल", "bus": "बस", "sold": "बिकी",
    "given away": "दे दी गईं", "in the jar": "जार में", "story": "कहानी",
    "A smaller pile": "छोटा ढेर", "A bigger pile": "बड़ा ढेर",
  },
  gu: {
    "Share Out Bench": "વહેંચો બેન્ચ",
    "A pile on the left and empty bowls on the right. The lower number says how many bowls.": "ડાબી બાજુ ઢગલો છે અને જમણી બાજુ ખાલી વાટકા છે. નીચેની સંખ્યા કહે છે કે કેટલા વાટકા જોઈએ.",
    "Every pile shared out, and the bowls nobody lifted still standing where they were filled.": "દરેક ઢગલો વહેંચાઈ ગયો. જે વાટકા કોઈએ ન ઉપાડ્યા, તે ભરાયા ત્યાં જ ઊભા રહ્યા.",
    "Free play. Any pile and any fraction that divides it. Both working lines and the leftover check are on.": "મુક્ત રમત. બંને ગણતરીની લીટીઓ અને બાકીની ચકાસણી ચાલુ છે. કોઈ પણ ઢગલો અને અપૂર્ણાંક લો: વાટકા ખોલો, વહેંચો, ઉપાડો.",

    "What of means here": "અહીં “નો” નો અર્થ",
    "This fraction is being taken of the whole pile. How many bowls do you need?": "આ અપૂર્ણાંક આખા ઢગલામાંથી લેવાનો છે. તમારે કેટલા વાટકા જોઈએ?",
    "How many bowls does that number ask you to open?": "તે સંખ્યા તમને કેટલા વાટકા ખોલવાનું કહે છે?",
    "Think small: a quarter of 8 means 4 bowls of 2, and one bowl lifted.": "નાનું ઉદાહરણ: 8 નો ચોથો ભાગ એટલે 4 વાટકા, દરેકમાં 2. એક વાટકો ઉપાડ્યો.",
    "Of means split the number into as many equal parts as the lower number says. Then keep as many of those parts as the upper number says.": "“નો” નો અર્થ: સંખ્યાને નીચેની સંખ્યા જેટલા સરખા ભાગમાં વહેંચો. પછી ઉપરની સંખ્યા જેટલા ભાગ રાખો.",
    "You learned: of means split into equal parts, then keep some of them": "તમે શીખ્યા: “નો” એટલે સરખા ભાગ પાડો, પછી થોડા ભાગ રાખો",
    "What does 2/7 of 42 ask you to do, and what is the answer?": "42 નો સાતમાંથી બે ભાગ તમને શું કરવાનું કહે છે? જવાબ શું છે?",
    "Two sevenths of 42?": "42 નો સાતમાંથી બે ભાગ?",
    "Which number of your fraction is written below the line?": "તમારા અપૂર્ણાંકમાં રેખાની નીચે કઈ સંખ્યા લખેલી છે?",
    "What does 1/6 of 36 mean, and what is it?": "36 નો છઠ્ઠો ભાગ શું બતાવે છે? તે કેટલો છે?",
    "One sixth of 36?": "36 નો છઠ્ઠો ભાગ?",
    "Deal the whole pile out, then lift only as many bowls as the upper number says.": "આખો ઢગલો વહેંચી દો, પછી ઉપરની સંખ્યા જેટલા જ વાટકા ઉપાડો.",
    "Find 1/4 of 28.": "28 નો ચોથો ભાગ શોધો.",
    "A quarter of 28?": "28 નો ચોથો ભાગ?",
    "A quarter means four equal bowls. What does just one of them hold?": "ચોથો ભાગ એટલે ચાર સરખા વાટકા. તેમાંથી ફક્ત એકમાં કેટલું છે?",

    "Divide first, then multiply": "પહેલા ભાગાકાર, પછી ગુણાકાર",
    "Try it both ways round. Which one keeps the numbers small enough to do in your head?": "બંને રીતે કરી જુઓ. કઈ રીતમાં સંખ્યાઓ એટલી નાની રહે છે કે મનમાં જ થઈ જાય?",
    "How many bowls does the upper number ask you to lift?": "ઉપરની સંખ્યા તમને કેટલા વાટકા ઉપાડવાનું કહે છે?",
    "Think small: for 3 eighths of 16, divide first. 16 ÷ 8 is 2, and 3 bowls of 2 make 6.": "નાનું ઉદાહરણ: 16 નો આઠમાંથી ત્રણ ભાગ, પહેલા ભાગાકાર કરો. 16 ÷ 8 = 2, અને 3 વાટકા, દરેકમાં 2, કુલ 6.",
    "Divide by the lower number first, then multiply by the upper number. The same answer arrives through much smaller numbers.": "પહેલા નીચેની સંખ્યાથી ભાગાકાર, પછી ઉપરની સંખ્યાથી ગુણાકાર કરો. જવાબ એ જ આવે છે, પણ સંખ્યાઓ ઘણી નાની રહે છે.",
    "You learned: divide first, then multiply, so the numbers stay small": "તમે શીખ્યા: પહેલા ભાગાકાર, પછી ગુણાકાર, તો સંખ્યાઓ નાની રહે છે",
    "Find 3/8 of 64, dividing before you multiply. Then say what the other order would have given you to work with.": "64 નો આઠમાંથી ત્રણ ભાગ શોધો, ગુણાકાર પહેલા ભાગાકાર કરીને. પછી કહો કે બીજી રીતે તમારે કઈ સંખ્યાને ભાગવી પડત.",
    "Share? And the multiply line's middle?": "હિસ્સો? અને ગુણાકાર લીટીની વચ્ચેની સંખ્યા?",
    "The share is what three bowls hold together. The multiply line starts with 64 times 3.": "હિસ્સો એટલે ત્રણ વાટકા મળીને જે થાય તે. ગુણાકારની લીટી 64 ગુણ્યા 3 થી શરૂ થાય છે.",
    "Now take 2/9 of 54. Deal first, and watch which line fills in.": "હવે 54 નો નવમાંથી બે ભાગ લો. પહેલા વહેંચો, અને જુઓ કઈ લીટી ભરાય છે.",
    "Two ninths of 54?": "54 નો નવમાંથી બે ભાગ?",
    "One bowl holds only part of the share. Two bowls go up to the tray.": "એક વાટકામાં પૂરો હિસ્સો નથી. બે વાટકા ટ્રેમાં જાય છે.",
    "Find 4/7 of 63. Which number would multiplying first have made you divide?": "63 નો સાતમાંથી ચાર ભાગ શોધો. પહેલા ગુણાકાર કરો તો કઈ સંખ્યાને ભાગવી પડે?",
    "Share? And what multiply first divides?": "હિસ્સો? પહેલા ગુણાકાર કરો તો કોને ભાગવું?",
    "Four bowls go up, not one. The lower line has to carry 63 fours.": "ચાર વાટકા ઉપર જાય છે, એક નહીં. નીચેની લીટીમાં 63 ના ચાર ગણા આવે છે.",

    "One share found, the other still waiting": "એક હિસ્સો મળ્યો, બીજો હજી બાકી",
    "The bowls are dealt already. Lift your share, then count what stays on the bench.": "વાટકા પહેલેથી વહેંચાયેલા છે. તમારો હિસ્સો ઉપાડો, પછી ગણો કે બેન્ચ પર શું રહ્યું.",
    "How many bowls are still sitting on the bench, and what is in each of them?": "બેન્ચ પર હજી કેટલા વાટકા છે, અને દરેકમાં કેટલું છે?",
    "Think small: one third of 12 is 4, so 8 stay on the bench.": "નાનું ઉદાહરણ: 12 નો ત્રીજો ભાગ 4 છે, તેથી બેન્ચ પર 8 રહે.",
    "The share taken and what is left are two different numbers. Put them back together and the pile is whole again.": "લીધેલો હિસ્સો અને બાકી રહેલું બે અલગ સંખ્યાઓ છે. તેમને ફરી ભેગા કરો તો ઢગલો પૂરો થઈ જાય છે.",
    "You learned: the share and what is left add back to the whole": "તમે શીખ્યા: હિસ્સો અને બાકી ભેગા કરતાં આખો ઢગલો બને",
    "A box holds 72 pencils. 5/9 of them are red and the rest are blue. How many are there of each colour?": "એક ડબ્બામાં 72 પેન્સિલ છે. તેમનો નવમાંથી પાંચ ભાગ લાલ છે, બાકીની વાદળી. દરેક રંગની કેટલી પેન્સિલ છે?",
    "Red pencils? Blue pencils?": "લાલ પેન્સિલ? વાદળી પેન્સિલ?",
    "Count the pencils inside the bowls, not the bowls themselves.": "વાટકાની અંદરની પેન્સિલ ગણો, વાટકા નહીં.",
    "A farmer picks 96 mangoes and 3/8 of them are ripe. How many are ripe, and how many are not?": "એક ખેડૂત 96 કેરી તોડે છે. તેમનો આઠમાંથી ત્રણ ભાગ પાકી છે. કેટલી પાકી છે અને કેટલી નથી?",
    "How many ripe? How many not?": "કેટલી પાકી? કેટલી નહીં?",
    "Every bench bowl holds as many as a tray bowl. How many bowls stayed down?": "બેન્ચના વાટકામાં પણ ટ્રેના વાટકા જેટલું જ છે. કેટલા વાટકા બેન્ચ પર રહ્યા?",
    "In a class of 40 children, 3/5 walk to school and the rest come by bus. How many come by bus?": "એક વર્ગમાં 40 બાળકો છે. તેમનો પાંચમાંથી ત્રણ ભાગ ચાલીને શાળાએ આવે છે, બાકીના બસથી. કેટલાં બાળકો બસથી આવે છે?",
    "How many come by bus?": "કેટલાં બાળકો બસથી આવે છે?",
    "The walkers went up to the tray. Who is still standing on the bench?": "ચાલીને આવનારા ટ્રેમાં ગયા. બેન્ચ પર હજી કોણ ઊભું છે?",

    "Checking the answer against the question": "જવાબને પ્રશ્ન સાથે ચકાસવો",
    "Read the question once more. Does it want what you took, or what is left?": "પ્રશ્ન ફરી એક વાર વાંચો. તે તમે લીધેલો હિસ્સો માગે છે કે બાકી રહેલું?",
    "Does the question point at the tray, or at the bench?": "પ્રશ્ન ટ્રે તરફ ઈશારો કરે છે કે બેન્ચ તરફ?",
    "Say the last sentence of the question to yourself. Then count only that pile.": "પ્રશ્નનું છેલ્લું વાક્ય મનમાં બોલો. પછી ફક્ત એ જ ઢગલો ગણો.",
    "Read the question again before the answer is written down, because it may want the share, or what is left, or both of them.": "જવાબ લખતા પહેલા પ્રશ્ન ફરી વાંચો. તે હિસ્સો માગી શકે, બાકી માગી શકે, અથવા બંને.",
    "You learned: answer what the question asks, the share, the rest or both": "તમે શીખ્યા: પ્રશ્ન જે માગે તે જ કહો: હિસ્સો, બાકી કે બંને",
    "A shop has 45 kites and sells 2/5 of them. The question asks how many kites are left. What is the answer?": "એક દુકાનમાં 45 પતંગ છે. તેનો પાંચમાંથી બે ભાગ વેચાઈ જાય છે. પ્રશ્ન પૂછે છે કે કેટલા પતંગ બાકી રહ્યા. જવાબ શું છે?",
    "How many kites are left?": "કેટલા પતંગ બાકી છે?",
    "The kites that were sold went up to the tray. Which kites is the question about?": "વેચાયેલા પતંગ ટ્રેમાં ગયા. પ્રશ્ન કયા પતંગ વિશે છે?",
    "A jar holds 84 sweets and 5/12 of them are given away. How many sweets are still in the jar?": "એક બરણીમાં 84 મીઠાઈ છે. તેનો બારમાંથી પાંચ ભાગ આપી દેવાયો. બરણીમાં હજી કેટલી મીઠાઈ છે?",
    "Sweets still in the jar?": "બરણીમાં કેટલી મીઠાઈ?",
    "Given away means up on the tray. The jar keeps the bowls on the bench.": "આપી દીધી એટલે ટ્રેમાં ઉપર. બરણીમાં બેન્ચના વાટકા રહે છે.",
    "A library has 132 books and 7/11 of them are story books. How many are story books, and how many are not?": "એક પુસ્તકાલયમાં 132 પુસ્તકો છે. તેમનો અગિયારમાંથી સાત ભાગ વાર્તાના પુસ્તકો છે. વાર્તાના કેટલા પુસ્તકો છે અને કેટલા નથી?",
    "Story books? Other books?": "વાર્તાના પુસ્તકો? બીજા પુસ્તકો?",
    "This one wants two numbers: the story books and all the others.": "આમાં બે સંખ્યા જોઈએ: વાર્તાના પુસ્તકો અને બાકીના બધા.",

    /* the working area's own words */
    "Open some bowls on the bench first.": "પહેલા બેન્ચ પર થોડા વાટકા ખોલો.",
    "A bowl holds twelve at the most. Open more bowls.": "એક વાટકામાં વધુમાં વધુ બાર સમાય. વધુ વાટકા ખોલો.",
    "of": "નો", "together": "ભેગું", "divide first": "પહેલા ભાગાકાર", "multiply first": "પહેલા ગુણાકાર",
    "tray": "ટ્રે", "bench": "બેન્ચ", "share": "હિસ્સો", "multiply": "ગુણાકાર", "other": "બીજા", "left": "બાકી",
    "red": "લાલ", "blue": "વાદળી", "ripe": "પાકી", "not ripe": "કાચી", "walk": "ચાલીને", "bus": "બસ", "sold": "વેચાયા",
    "given away": "આપી દીધી", "in the jar": "બરણીમાં", "story": "વાર્તા",
    "A smaller pile": "નાનો ઢગલો", "A bigger pile": "મોટો ઢગલો",
  },
};

/* One entry per phase = one mount.
   says    the teach run, said before anything is asked (numbers are turned into words for the voice)
   ladder  rungs 2 and 3 of the hint ladder (rung 1 is each item's own miss line); never the answer
   closing one closing line for this phase, said once when it goes idle
   learned the summary page's row for this phase: "You learned: ..." (at most 72 characters)
   traceback what the working area redraws after a miss, in one line (for the sidecar)
   items   the authored fallback: three a phase, the third tests whether the phase landed.
           qid   the plan's question id (<conceptId>:ML<n> or <conceptId>:<q_no>); null for an item you author
           kind  your name for the item type (the Work, judge and oracle switch on it)
           pile / num / den  the bench: the whole pile, the fraction's upper and lower number
           want  what the slot is asked for: "share" · "rest" · "both" · "other" (share + the × line's middle)
           tray / bench  the question's own word for each pile (at most 10 characters, drawn as the row labels)
           say   the spoken question; ask = the short prompt above the slot (<= 3 lines of ~15 chars)
           answer what the slot must produce; miss = rung 1, never the answer
           parts?  [{ label }, { label }] with answer [a, b]: two boxes in the slot */
const PHASES = [
  {
    n: 1,
    concept: "What of means here",
    conceptId: "M1.S2.T3.C8", objectiveIds: ["O3"],
    says: ["This fraction is being taken of the whole pile. How many bowls do you need?"],
    ladder: ["How many bowls does that number ask you to open?", "Think small: a quarter of 8 means 4 bowls of 2, and one bowl lifted."],
    closing: "Of means split the number into as many equal parts as the lower number says. Then keep as many of those parts as the upper number says.",
    learned: "You learned: of means split into equal parts, then keep some of them",
    traceback: "The bench opens a bowl for each part the lower number names, deals the pile out round by round, lifts as many bowls as the upper number says and writes the share under the tray.",
    items: [
      /* learn ML1: answer in the plan = It asks you to split 42 into seven equal groups and keep two of them, which is 12 */
      { qid: "M1.S2.T3.C8:ML1", kind: "of", pile: 42, num: 2, den: 7, want: "share", winMs: 3800,
        say: "What does 2/7 of 42 ask you to do, and what is the answer?", ask: "Two sevenths of 42?", answer: 12,
        miss: "Which number of your fraction is written below the line?" },
      /* practice 1: answer in the plan = It means splitting 36 into six equal groups and keeping one of them, which is 6 */
      { qid: "M1.S2.T3.C8:1", kind: "of", pile: 36, num: 1, den: 6, want: "share", winMs: 3800,
        say: "What does 1/6 of 36 mean, and what is it?", ask: "One sixth of 36?", answer: 6,
        miss: "Deal the whole pile out, then lift only as many bowls as the upper number says." },
      /* practice 2: answer in the plan = 7 */
      { qid: "M1.S2.T3.C8:2", kind: "of", pile: 28, num: 1, den: 4, want: "share", winMs: 3800,
        say: "Find 1/4 of 28.", ask: "A quarter of 28?", answer: 7,
        miss: "A quarter means four equal bowls. What does just one of them hold?" },
    ],
  },
  {
    n: 2,
    concept: "Divide first, then multiply",
    conceptId: "M1.S2.T3.C9", objectiveIds: ["O3"],
    says: ["Try it both ways round. Which one keeps the numbers small enough to do in your head?"],
    ladder: ["How many bowls does the upper number ask you to lift?", "Think small: for 3 eighths of 16, divide first. 16 ÷ 8 is 2, and 3 bowls of 2 make 6."],
    closing: "Divide by the lower number first, then multiply by the upper number. The same answer arrives through much smaller numbers.",
    learned: "You learned: divide first, then multiply, so the numbers stay small",
    traceback: "Both working lines are written out in step, dividing first and multiplying first, until they land on the same share, with the big number the multiply line had to carry ringed.",
    items: [
      /* learn ML2: answer in the plan = 24, and the other order would have asked for 192 divided by 8 */
      { qid: "M1.S2.T3.C9:ML2", kind: "order", pile: 64, num: 3, den: 8, want: "other", winMs: 5000,
        parts: [{ label: "share" }, { label: "multiply" }], answer: [24, 192],
        say: "Find 3/8 of 64, dividing before you multiply. Then say what the other order would have given you to work with.",
        ask: "Share? And the multiply line's middle?",
        miss: "The share is what three bowls hold together. The multiply line starts with 64 times 3." },
      /* practice 3: answer in the plan = 12, and dividing fifty-four by nine came first */
      { qid: "M1.S2.T3.C9:3", kind: "order", pile: 54, num: 2, den: 9, want: "share", winMs: 4600,
        say: "Now take 2/9 of 54. Deal first, and watch which line fills in.", ask: "Two ninths of 54?", answer: 12,
        miss: "One bowl holds only part of the share. Two bowls go up to the tray." },
      /* practice 4: answer in the plan = 36, and the other order would have made you divide 252 */
      { qid: "M1.S2.T3.C9:4", kind: "order", pile: 63, num: 4, den: 7, want: "other", winMs: 5000,
        parts: [{ label: "share" }, { label: "multiply" }], answer: [36, 252],
        say: "Find 4/7 of 63. Which number would multiplying first have made you divide?",
        ask: "Share? And what multiply first divides?",
        miss: "Four bowls go up, not one. The lower line has to carry 63 fours." },
    ],
  },
  {
    n: 3,
    concept: "One share found, the other still waiting",
    conceptId: "M1.S2.T3.C10", objectiveIds: ["O4"],
    says: ["The bowls are dealt already. Lift your share, then count what stays on the bench."],
    ladder: ["How many bowls are still sitting on the bench, and what is in each of them?", "Think small: one third of 12 is 4, so 8 stay on the bench."],
    closing: "The share taken and what is left are two different numbers. Put them back together and the pile is whole again.",
    learned: "You learned: the share and what is left add back to the whole",
    traceback: "The share is lifted, the tray and the bench are counted on lines of their own, and the two counts are added back against the pile the bench began with.",
    items: [
      /* learn ML3: answer in the plan = 40 red pencils and 32 blue ones */
      { qid: "M1.S2.T3.C10:ML3", kind: "count", pile: 72, num: 5, den: 9, want: "both", winMs: 4800,
        tray: "red", bench: "blue", take: "gPointer", rest: "gHundred",
        parts: [{ label: "red" }, { label: "blue" }], answer: [40, 32],
        say: "A box holds 72 pencils. 5/9 of them are red and the rest are blue. How many are there of each colour?",
        ask: "Red pencils? Blue pencils?", miss: "Count the pencils inside the bowls, not the bowls themselves." },
      /* practice 5: answer in the plan = 36 are ripe and 60 are not */
      { qid: "M1.S2.T3.C10:5", kind: "count", pile: 96, num: 3, den: 8, want: "both", winMs: 4800,
        tray: "ripe", bench: "not ripe", parts: [{ label: "ripe" }, { label: "not ripe" }], answer: [36, 60],
        say: "A farmer picks 96 mangoes and 3/8 of them are ripe. How many are ripe, and how many are not?",
        ask: "How many ripe? How many not?", miss: "Every bench bowl holds as many as a tray bowl. How many bowls stayed down?" },
      /* practice 6: answer in the plan = 16 come by bus, because 24 walk */
      { qid: "M1.S2.T3.C10:6", kind: "count", pile: 40, num: 3, den: 5, want: "rest", winMs: 4800,
        tray: "walk", bench: "bus", answer: 16,
        say: "In a class of 40 children, 3/5 walk to school and the rest come by bus. How many come by bus?",
        ask: "How many come by bus?", miss: "The walkers went up to the tray. Who is still standing on the bench?" },
    ],
  },
  {
    n: 4,
    concept: "Checking the answer against the question",
    conceptId: "M1.S2.T3.C11", objectiveIds: ["O4"],
    says: ["Read the question once more. Does it want what you took, or what is left?"],
    ladder: ["Does the question point at the tray, or at the bench?", "Say the last sentence of the question to yourself. Then count only that pile."],
    closing: "Read the question again before the answer is written down, because it may want the share, or what is left, or both of them.",
    learned: "You learned: answer what the question asks, the share, the rest or both",
    traceback: "Both piles are counted on their own lines and the one the question is pointing at is ringed; nothing is marked and nothing is cleared.",
    items: [
      /* learn ML4: answer in the plan = 27 kites are left */
      { qid: "M1.S2.T3.C11:ML4", kind: "check", pile: 45, num: 2, den: 5, want: "rest", winMs: 4800,
        tray: "sold", bench: "left", answer: 27,
        say: "A shop has 45 kites and sells 2/5 of them. The question asks how many kites are left. What is the answer?",
        ask: "How many kites are left?", miss: "The kites that were sold went up to the tray. Which kites is the question about?" },
      /* practice 7: answer in the plan = 49 sweets, because 35 were given away */
      { qid: "M1.S2.T3.C11:7", kind: "check", pile: 84, num: 5, den: 12, want: "rest", winMs: 4800,
        tray: "given away", bench: "in the jar", answer: 49,
        say: "A jar holds 84 sweets and 5/12 of them are given away. How many sweets are still in the jar?",
        ask: "Sweets still in the jar?", miss: "Given away means up on the tray. The jar keeps the bowls on the bench." },
      /* practice 8: answer in the plan = 84 are story books and 48 are not */
      { qid: "M1.S2.T3.C11:8", kind: "check", pile: 132, num: 7, den: 11, want: "both", winMs: 4800,
        tray: "story", bench: "other", parts: [{ label: "story" }, { label: "other" }], answer: [84, 48],
        say: "A library has 132 books and 7/11 of them are story books. How many are story books, and how many are not?",
        ask: "Story books? Other books?", miss: "This one wants two numbers: the story books and all the others." },
    ],
  },
];

/* The numbers, rows, sizes and targets the working area needs (they go into the sidecar too). */
const MODEL = {
  pile: { x: 0, y: 164, w: 200, h: 240, maxTokens: 144 },
  bench: { x: 214, pitch: 72, bowls: 12, trayY: 4, railY: 176, rowH: 156, maxPerBowl: 12 },
  lines: [350, 410, 470],
  fraction: { x: 0, y: 0, w: 200, h: 156, drawn: "stacked" },
};

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* judge: is this value right for this item? (numbers compare as numbers) */
const judge = (item: any, v: any) => {
  if (item.parts) return judgeSlotParts(item, v);
  if (typeof item.answer === "number") return leadNumber(v) === item.answer;
  return String(v).trim().toLowerCase() === String(item.answer).trim().toLowerCase();
};
/* oracle: every answer re-derived by a second route that shares no code with judge or Work.
   It works the other order (multiply the pile by the upper number, then divide), takes what is
   left by counting the pile down, and checks the fraction it used is the one the question says. */
const oracle = () => PHASES.every((p: any) => p.items.every((it: any) => {
  if (!it.pile || !it.den || it.pile % it.den) return false;
  if (!String(it.say).includes(it.num + "/" + it.den)) return false;
  if (!new RegExp("(^|[^\\d])" + it.pile + "([^\\d]|$)").test(String(it.say))) return false;
  const big = it.pile * it.num;
  const share = big / it.den;
  let rest = it.pile;
  for (let k = 0; k < share; k++) rest -= 1;      /* the share taken away from the pile, one at a time */
  const want = it.want === "both" ? [share, rest] : it.want === "other" ? [share, big] : it.want === "rest" ? rest : share;
  return JSON.stringify(want) === JSON.stringify(it.answer);
}));
/* the most likely wrong answer (the misconception); judge must reject it */
const nearMiss = (item: any) => {
  const per = item.pile / item.den;
  if (item.kind === "of") return item.pile - item.den;                       /* of read as take away */
  if (item.want === "other") return [per, item.pile * item.num].join("|");   /* one bowl handed in */
  if (item.kind === "order") return per;                                     /* what one bowl holds */
  if (item.want === "both") return [per * item.num, item.den - item.num].join("|"); /* the bowls counted, not what is in them */
  return per * item.num;                                                     /* the share, when the question wanted the rest */
};
/* the forms of an answer that no question, hint or ladder line may print. A number the question
   itself names (the pile, or one of the fraction's own numbers) is the question, not the answer. */
const answerForms = (item: any) => {
  const own = [item.pile, item.num, item.den];
  const xs = Array.isArray(item.answer) ? item.answer : [item.answer];
  return xs.flatMap((x: number) => (own.indexOf(x) >= 0 ? [words(x)] : [String(x), indian(x), words(x)]));
};
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => item.answer;

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => (T.state().stage === "demo" ? HOOK.demo && HOOK.demo() : T.submit(item.answer));
/* the agent's answer() for an item made on the working area: set it as a child would; undefined = type it */
const answer = (item: any, v: any) => (item.pad === "enter" && HOOK.set ? HOOK.set(v) : undefined);
/* the agent's check() before Enter: e.g. drop a token that waits; undefined = press Enter */
const check = () => (HOOK.check ? HOOK.check() : undefined);

/* ── the bench: where everything stands in the working area (1086 x 528) ─────────────────── */
const SOB = { x0: 214, pitch: 72, cols: 12, trayY: 4, railY: 176, rowH: 156, rim: 44, wide: 864,
  lineY: [350, 410, 470], lineH: 54, termX: 452, room: 616 };
const SOB_PILE = { x: 0, y: 164, w: 200, h: 240 };
const sobL = (k: number) => SOB.x0 + k * SOB.pitch;
const sobM = (k: number) => sobL(k) + SOB.pitch / 2;
const sobTop = (up: boolean) => (up ? SOB.trayY : SOB.railY);
const sobNone = () => [false, false, false, false, false, false, false, false, false, false, false, false];
const SOB_FREE = { kind: "free", pile: 24, num: 0, den: 0, pre: "whole", tray: "tray", bench: "bench", want: "share" };
const SOB_HEX: Record<string, string> = { gOne: CONTENT.one, gHundred: CONTENT.hundred, gTen: CONTENT.ten, gPointer: CONTENT.pointer };
const sobSetup = (it: any) => ({
  kind: it.kind, pile: it.pile, num: it.num, den: it.den, want: it.want || "share",
  pre: it.kind === "count" || it.kind === "check" ? "dealt" : "whole",
  tray: it.tray || "tray", bench: it.bench || "bench", take: it.take || "gHundred", rest: it.rest || "gTen",
});
const sobStart = (c: any) => ({ open: c.pre === "dealt" ? c.den : 0, rounds: c.pre === "dealt" ? c.pile / c.den : 0, up: sobNone() });
/* the pile's token grid: neat separated rows, never overlapping, at most a hundred and forty-four */
const sobGrid = (pile: number) => {
  const cols = pile > 100 ? 12 : pile > 48 ? 10 : 8, pitch = pile > 100 ? 16 : pile > 48 ? 19 : 24;
  return { cols, pitch, r: pitch * 0.4, x: (SOB_PILE.w - cols * pitch) / 2 + pitch / 2, y: SOB_PILE.y + 12 + pitch / 2 };
};
const sobNum = (v: any) => (typeof v === "number" ? indian(v) : String(v));
/* a text's ink width, near enough to keep the working lines from ever touching */
const sobInk = (s: string, size: number) => {
  let w = 0;
  for (const ch of s) w += ch === " " ? 0.3 : ch === "1" ? 0.5 : ch >= "0" && ch <= "9" ? 0.58 : 0.62;
  return w * size;
};
const sobWide = (terms: any[], size: number) => terms.reduce((w: number, t: any) =>
  w + (t === "|" ? 34 : typeof t === "string" ? sobInk(t, size) + 12
    : (t.v === null || t.v === undefined ? 58 : sobInk(sobNum(t.v), size)) + 12 + (t.ring ? 28 : 0)), 0);

const SOB_CSS = `
.sob-move{transition:transform 340ms cubic-bezier(.3,.7,.3,1)}
.sob-grab{cursor:grab}
.sob-shake{animation:sobShake .45s ease-in-out 1}
@keyframes sobShake{0%,100%{transform:translateX(0)}25%{transform:translateX(-9px)}75%{transform:translateX(9px)}}
@media (prefers-reduced-motion:reduce){.sob-move{transition:none}.sob-shake{animation:none}}
`;

/* one bowl, drawn from the middle of its column: a cup with its counters standing in it */
function SobBowl({ n, paint, closed, C }: any) {
  const y = SOB.rim;
  const d = `M -31 ${y} L 31 ${y} L 27 ${y + 58} Q 25 ${y + 76} 8 ${y + 76} L -8 ${y + 76} Q -25 ${y + 76} -27 ${y + 58} Z`;
  if (closed) return <path d={d} fill="none" stroke={C.rule} strokeWidth={2.5} strokeDasharray="7 6" />;
  return (
    <g>
      <path d={d} fill="#FFFFFF" stroke={shade(C.rule, 0.45)} strokeWidth={2.5} />
      <g filter="url(#fShadowSoft)">
        {Array.from({ length: Math.min(n || 0, 12) }).map((_, i) => (
          <Disc key={i} x={((i % 3) - 1) * 17} y={y + 62 - Math.floor(i / 3) * 15} r={7} paint={paint} flat />
        ))}
      </g>
      <ellipse cx={0} cy={y} rx={31} ry={5} fill="none" stroke={shade(C.rule, 0.45)} strokeWidth={2} />
    </g>
  );
}

/* one working line under the bench: a label at the left, then the steps as they happen.
   A "×" always keeps a number beside it, so no line ever reads as a cross. */
function SobLine({ y, label, swatch, terms, size, C }: any) {
  let x = SOB.termX;
  const out: any[] = [];
  terms.forEach((t: any, i: number) => {
    if (t === "|") { x += 34; return; }
    if (typeof t === "string") {
      out.push(<text key={i} x={x} y={y + 37} fontSize={size} fontWeight={600} fill={C.ink}>{t}</text>);
      x += sobInk(t, size) + 12;
      return;
    }
    if (t.v === null || t.v === undefined) {
      out.push(<rect key={i} x={x} y={y + 7} width={58} height={40} rx={10} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} strokeDasharray="6 5" />);
      x += 70;
      return;
    }
    const s = sobNum(t.v), w = sobInk(s, size);
    if (t.ring) x += 14;
    out.push(
      <g key={i}>
        {t.ring && <ellipse cx={x + w / 2} cy={y + 26} rx={w / 2 + 15} ry={25} fill="none" stroke={C.accent} strokeWidth={4} />}
        <text x={x} y={y + 37} fontSize={size} fontWeight={700} fill={C.ink}>{s}</text>
      </g>
    );
    x += w + 12 + (t.ring ? 14 : 0);
  });
  return (
    <g>
      <rect x={SOB.x0} y={y} width={SOB.wide} height={SOB.lineH} rx={14} fill="#FFFFFF" stroke={C.rule} strokeWidth={1.5} />
      {swatch && <Disc x={SOB.x0 + 22} y={y + 27} r={11} paint={swatch} />}
      {label && <text x={SOB.x0 + (swatch ? 42 : 14)} y={y + 36} fontSize={T.micro} fontWeight={600} fill={C.ink}>{label}</text>}
      {out}
    </g>
  );
}

/* ── the working area: 1086 x 528, origin at its top-left ────────────────────────────────────
   The pile stands at the left under the fraction, the bowl rail at the right with the tray above
   it, and the working lines under the bench. The child opens bowls, deals the pile out, lifts the
   bowls the upper number asks for, and reads both piles. Nothing prints the share before it is
   answered; after a miss the bench redraws the whole thing and writes the answer on its lines. */
function Work({ phase, item, index, stage, wrong, api, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();
  const [cfg, setCfg] = useState<any>(() => sobSetup(stage === "free" ? SOB_FREE : item));
  const cfgRef = useRef(cfg); cfgRef.current = cfg;
  const [bs, setBs] = useState<any>(() => sobStart(cfgRef.current));
  const bsRef = useRef(bs); bsRef.current = bs;
  const [lit, setLit] = useState<string | null>(null);   /* the fraction's number doing its job */
  const [show, setShow] = useState(0);                    /* how far the working lines are written */
  const [glow, setGlow] = useState<string | null>(null);  /* the pile being counted */
  const [shake, setShake] = useState(false);
  const setupFor = useRef<any>(null);
  const wasStage = useRef(stage);
  const free = stage === "free";
  const busy = tl.busy;
  /* "12 of 42": in Hindi and Gujarati the pile is the total ("कुल 42" / "કુલ 42"), so the big count stays on the left */
  const ofN = (n: number) => (lang === "hi" ? "कुल " + n : lang === "gu" ? "કુલ " + n : "of " + n);

  /* Enter and choice taps go here first while the working area owns the answer */
  api.onEnter(null);

  const put = (p: any) => { const nx = { ...bsRef.current, ...p }; bsRef.current = nx; setBs(nx); };
  /* a correction stands on its own layer: the written lines (and the ring) clear the moment the child
     touches the bench again, so nothing the tool drew is left half undone by the child's own next act */
  const showRef = useRef(show); showRef.current = show;
  const mine = () => { if (stage === "ask" && showRef.current) { showRef.current = 0; setShow(0); setGlow(null); } };
  const reset = (it: any) => {
    tl.stop();
    const c = sobSetup(it);
    setCfg(c); cfgRef.current = c;
    const b = sobStart(c); setBs(b); bsRef.current = b;
    setLit(null); setShow(0); setGlow(null); setShake(false);
    api.lock(false);
  };

  useEffect(() => {
    const key = free ? "free" : phase.n + ":" + index;
    const entered = stage === "teach" && wasStage.current !== "teach";
    wasStage.current = stage;
    if (free) { if (setupFor.current !== "free") { setupFor.current = "free"; reset(SOB_FREE); } return; }
    if (stage !== "teach" && stage !== "ask") return;
    if (setupFor.current !== key || entered) { setupFor.current = key; reset(item); }
  }, [stage, index, phase.n]);

  const per = bs.open > 0 ? bs.rounds : 0;
  const dealt = bs.open > 0 && bs.rounds > 0 && bs.rounds * bs.open === cfg.pile;
  const pileLeft = cfg.pile - bs.rounds * bs.open;
  const lifted = bs.up.filter((u: boolean, k: number) => u && k < bs.open).length;
  const canAct = !busy && (stage === "ask" || free);

  /* ── what the child does ── */
  const shakeIt = () => tl.run([[440, () => setShake(true)], [10, () => setShake(false)]]);
  const openTo = (k: number) => {
    if (!canAct || bsRef.current.rounds > 0) return;
    mine();
    put({ open: bsRef.current.open === k ? k - 1 : k });
    api.sfx.tick();
  };
  const deal = () => {
    if (!canAct || bsRef.current.rounds > 0) return;
    mine();
    const c = cfgRef.current, open = bsRef.current.open;
    if (!open) { api.say("Open some bowls on the bench first."); return; }
    /* built from the pile and the bowls, so it is never baked: shown in hi/gu (numbers as words), silent there */
    if (c.pile % open) { shakeIt(); api.say({ en: c.pile + " will not share out evenly into " + open + " bowls.",
      hi: wordsIn(c.pile, "hi") + " को " + wordsIn(open, "hi") + " कटोरों में बराबर नहीं बाँटा जा सकता।",
      gu: wordsIn(c.pile, "gu") + " ને " + wordsIn(open, "gu") + " વાટકામાં સરખા ભાગે વહેંચી શકાય નહીં." }); return; }
    if (c.pile / open > 12) { shakeIt(); api.say("A bowl holds twelve at the most. Open more bowls."); return; }
    const S: any[] = [];
    for (let r = 1; r <= c.pile / open; r++) { const j = r; S.push([170, () => { put({ rounds: j }); api.sfx.tick(); }]); }
    tl.run(S);
  };
  const pourBack = () => {
    if (!canAct || bsRef.current.rounds === 0) return;
    mine(); setShow(0); setGlow(null);
    put({ rounds: 0, up: sobNone() });
    api.sfx.tick();
  };
  const lift = (k: number, v: boolean) => {
    const b = bsRef.current;
    if (!canAct || b.rounds * b.open !== cfgRef.current.pile || b.rounds === 0 || b.up[k] === v) return;
    mine();
    const up = b.up.slice(); up[k] = v;
    put({ up });
    api.sfx.tick();
  };
  const resize = (d: number) => {
    if (!canAct) return;
    const c = cfgRef.current, pile = Math.max(2, Math.min(144, c.pile + d));
    if (pile === c.pile) return;
    mine();
    const nx = { ...c, pile }; cfgRef.current = nx; setCfg(nx);
    put({ rounds: 0, up: sobNone() });
    api.sfx.tick();
  };

  const drag = useDrag((pay: any, p: any, moved: boolean) => {
    if (pay.src === "pile") { if (!moved || (p.x > SOB.x0 - 20 && p.y < 348)) deal(); return; }
    if (!moved) { lift(pay.k, !bsRef.current.up[pay.k]); return; }
    if (p.x < SOB.x0 - 20 || p.y > 348) return;          /* let go off the bench: the bowl goes back */
    lift(pay.k, p.y < SOB.railY - 10);
  });

  /* ── the bench redrawing the whole thing, and ending on the answer (a miss and a win alike) ── */
  const answerSteps = (slow: number) => {
    const c = cfgRef.current, cur = bsRef.current, S: any[] = [];
    const s = (ms: number, fn: () => void) => S.push([Math.round(ms * slow), fn]);
    const p = c.pile / c.den;
    const dealtOk = cur.open === c.den && cur.rounds === p;
    s(60, () => { setShow(0); setGlow(null); });
    if (!dealtOk) {
      if (cur.rounds > 0) s(420, () => put({ rounds: 0, up: sobNone() }));
      s(240, () => { put({ open: 0 }); setLit("den"); });
      for (let k = 1; k <= c.den; k++) { const j = k; s(90, () => put({ open: j })); }
      s(240, () => {});
      for (let r = 1; r <= p; r++) { const j = r; s(p > 6 ? 125 : 170, () => { put({ rounds: j }); api.sfx.tick(); }); }
      s(240, () => setLit(null));
    }
    const upOk = dealtOk && cur.up.filter((u: boolean, k: number) => u && k < c.den).length === c.num;
    if (!upOk) {
      s(300, () => put({ up: sobNone() }));
      s(260, () => setLit("num"));
      for (let k = 0; k < c.num; k++) {
        const j = k;
        s(c.num > 4 ? 240 : 320, () => { const up = bsRef.current.up.slice(); up[j] = true; put({ up }); api.sfx.tick(); });
      }
      s(260, () => setLit(null));
    }
    if (c.kind === "of") { s(600, () => setShow(1)); s(760, () => setShow(2)); }
    else if (c.kind === "order") { s(820, () => setShow(1)); s(1000, () => setShow(2)); }
    else {
      s(620, () => { setShow(1); setGlow("tray"); });
      s(720, () => { setShow(2); setGlow("bench"); });
      s(720, () => { setShow(3); setGlow(null); });
    }
    s(320, () => setGlow(null));
    return S;
  };

  /* the traceback: nothing is marked, nothing is cleared, and it ends on the whole right answer */
  useEffect(() => {
    if (!wrong || stage !== "ask") return;
    api.lock(true);
    tl.run([[420, () => {}], ...answerSteps(1)], () => api.lock(false));
  }, [wrong]);

  /* the win: the same working, at the pace of a nod */
  useEffect(() => {
    if (stage !== "win") return;
    tl.run(answerSteps(0.65));
  }, [stage]);

  /* ── the working lines under the bench ── */
  const share = cfg.den ? (cfg.pile / cfg.den) * cfg.num : 0;
  const rows: any[] = [];
  if (free) {
    if (dealt) {
      const q = per, sh = lifted * q, big = cfg.pile * lifted;
      rows.push({ label: "divide first", terms: [cfg.pile + " ÷ " + bs.open, "=", { v: q }, "|", lifted + " ×", { v: q }, "=", { v: sh }] });
      rows.push({ label: "multiply first", terms: [cfg.pile + " × " + lifted, "=", { v: big, ring: true }, "|", { v: big }, "÷ " + bs.open, "=", { v: sh }] });
      rows.push({ label: "together", terms: [sh + " + " + (cfg.pile - sh), "=", { v: cfg.pile }] });
    }
  } else if (cfg.kind === "of") {
    if (show >= 1) rows.push({ label: cfg.tray, swatch: cfg.take,
      terms: [cfg.pile + " ÷ " + cfg.den, "=", { v: cfg.pile / cfg.den }, "|", cfg.num + " ×", { v: cfg.pile / cfg.den }, "=", { v: show >= 2 ? share : null }] });
  } else if (cfg.kind === "order") {
    const mid = dealt && bs.open === cfg.den ? cfg.pile / cfg.den : show >= 1 ? cfg.pile / cfg.den : null;
    const big = cfg.pile * cfg.num;
    rows.push({ label: "divide first",
      terms: [cfg.pile + " ÷ " + cfg.den, "=", { v: mid, ring: show >= 2 }, "|", cfg.num + " ×", { v: mid }, "=", { v: show >= 2 ? share : null }] });
    rows.push({ label: "multiply first",
      terms: [cfg.pile + " × " + cfg.num, "=", { v: show >= 1 ? big : null, ring: show >= 1 }, "|", { v: show >= 1 ? big : null }, "÷ " + cfg.den, "=", { v: show >= 2 ? share : null }] });
  } else if (show >= 1) {
    const rest = cfg.pile - share, ringT = cfg.want === "share", ringB = cfg.want === "rest";
    rows.push({ label: cfg.tray, swatch: cfg.take, terms: [cfg.num + " × " + cfg.pile / cfg.den, "=", { v: share, ring: show >= 3 && ringT }] });
    if (show >= 2) rows.push({ label: cfg.bench, swatch: cfg.rest, terms: [(cfg.den - cfg.num) + " × " + cfg.pile / cfg.den, "=", { v: rest, ring: show >= 3 && ringB }] });
    if (show >= 3) rows.push({ label: "together", terms: [share + " + " + rest, "=", { v: cfg.pile }] });
  }
  /* how many lines this phase writes: the space is ruled from the first frame, so the working always
     has somewhere of its own to go and nothing is ever written over the bench */
  const lineSlots = free ? 3 : cfg.kind === "of" ? 1 : cfg.kind === "order" ? 2 : 3;
  const lineSize = rows.length
    ? Math.min(...rows.map((r: any) => [T.speech, T.label, T.micro].find((z) => sobWide(r.terms, z) <= SOB.room) || T.micro))
    : T.speech;

  /* ── what the host and the agent read back (toolApi.getState) ── */
  api.share({
    pile: cfg.pile, numerator: free ? lifted : cfg.num, denominator: free ? bs.open : cfg.den,
    bowls: bs.open, perBowl: dealt ? per : 0, tray: dealt ? lifted * per : 0,
    leftOnBench: dealt ? (bs.open - lifted) * per : 0, answered: stage === "win" || stage === "idle",
  });

  /* ── drawing ── */
  /* No readout prints a number the question asks for until the child has taken a share or been shown
     the working: with a unit fraction the bowls hold the answer itself (1/6 of 36 fills six bowls with
     six), so the figure under a bowl waits for the first lift, and the running count steps over the one
     round that would land on it. Every other question prints both from the moment the pile settles. */
  const asked = (Array.isArray(item.answer) ? item.answer : [item.answer]).filter((x: any) => typeof x === "number");
  const told = free || lifted > 0 || show > 0 || stage === "win" || stage === "idle";
  const tells = (v: number) => told || asked.indexOf(v) < 0;
  const grid = sobGrid(cfg.pile);
  const numShown = free ? (lifted || null) : cfg.num;
  const denShown = free ? (bs.open || null) : cfg.den;
  const takeInk = shade(SOB_HEX[cfg.take] || CONTENT.hundred, 0.25);
  const dragging = drag.drag && drag.drag.moved ? drag.drag : null;
  const pileLive = canAct && bs.rounds === 0 && pileLeft > 0;
  /* one pulse, on the one thing there is to do next: open the bowls, deal the pile out, lift a bowl */
  const bowl0 = { x: sobM(0), y: SOB.railY + 84, r: 46 };
  const invite = !canAct || wrong || (stage !== "ask" && !free) ? null
    : !dealt ? (bs.open === 0 ? bowl0 : { x: SOB_PILE.w / 2, y: SOB_PILE.y + 120, r: 76 })
      : lifted === 0 ? bowl0 : null;
  const dealtCount = bs.rounds * bs.open;
  const dealtShown = tells(dealtCount) ? dealtCount : Math.max(0, dealtCount - bs.open);
  const padY = SOB.trayY + 30;

  return (
    <g>
      <style>{SOB_CSS}</style>

      {/* the running count: tokens dealt against the tokens the pile began with */}
      <g data-zone="runs">
        <rect x={0} y={-94} width={330} height={76} rx={RAD.panel} fill="url(#gPanel)" stroke={C.rule} strokeWidth={2} />
        <Disc x={34} y={-56} r={15} paint="gOne" />
        <text x={186} y={-36} textAnchor="end" fontSize={T.xl} fontWeight={700} fill={C.ink}>{dealtShown}</text>
        <text x={200} y={-40} fontSize={T.label} fontWeight={600} fill={C.ink}>{ofN(cfg.pile)}</text>
      </g>

      {/* the fraction being taken, upper number over a level rule over lower number */}
      <g>
        {lit === "num" && <rect x={22} y={2} width={100} height={58} rx={14} fill={tint(C.accent, 0.78)} />}
        {lit === "den" && <rect x={22} y={72} width={100} height={58} rx={14} fill={tint(C.accent, 0.78)} />}
        {numShown === null
          ? <rect x={48} y={8} width={48} height={44} rx={10} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} strokeDasharray="6 5" />
          : <text x={72} y={50} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={takeInk}>{numShown}</text>}
        <line x1={28} y1={66} x2={116} y2={66} stroke={C.ink} strokeWidth={5} strokeLinecap="round" />
        {denShown === null
          ? <rect x={48} y={78} width={48} height={44} rx={10} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} strokeDasharray="6 5" />
          : <text x={72} y={116} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={C.ink}>{denShown}</text>}
        {/* the word the whole phase is about, standing between the fraction and the pile it is taken of */}
        <text x={72} y={152} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={C.ink}>{tx("of")}</text>
      </g>

      {/* the pile: identical counters in neat rows, dragged or tapped onto the bench */}
      <g className={shake ? "sob-shake" : ""}
        {...(pileLive ? { ...control("pile", "Deal the pile out into the open bowls"), ...drag.bind({ src: "pile" }), ...drag.keys({ src: "pile" }) } : {})}>
        {!pileLeft && <rect x={SOB_PILE.x} y={SOB_PILE.y} width={SOB_PILE.w} height={SOB_PILE.h} rx={18}
          fill="#FFFFFF" fillOpacity={0.5} stroke={C.rule} strokeWidth={2} strokeDasharray="8 7" />}
        {/* the whole heap answers to a finger, not only the counters in it */}
        <rect x={SOB_PILE.x} y={SOB_PILE.y} width={SOB_PILE.w} height={SOB_PILE.h} fill="transparent" />
        <g filter="url(#fShadowSoft)">
          {Array.from({ length: Math.max(0, pileLeft) }).map((_, i) => (
            <Disc key={i} x={grid.x + (i % grid.cols) * grid.pitch} y={grid.y + Math.floor(i / grid.cols) * grid.pitch} r={grid.r} paint="gOne" flat />
          ))}
        </g>
      </g>
      {canAct && bs.rounds > 0 && (
        <Hit id="pile-back" label="Pour the bowls back into the pile" x={SOB_PILE.x} y={SOB_PILE.y} w={SOB_PILE.w} h={SOB_PILE.h} onPress={pourBack} />
      )}

      {/* the tray above, the bench below: the same rectangles on every phase */}
      <rect x={SOB.x0} y={SOB.trayY} width={SOB.wide} height={SOB.rowH} rx={20} fill={tint(C.panel, 0.4)}
        stroke={glow === "tray" ? C.accent : C.rule} strokeWidth={glow === "tray" ? 5 : 2} />
      <text x={SOB.x0 + 16} y={padY} fontSize={T.label} fontWeight={700} fill={C.ink}>{tx(cfg.tray)}</text>
      <rect x={SOB.x0} y={SOB.railY} width={SOB.wide} height={SOB.rowH} rx={20} fill={tint(C.panel, 0.2)}
        stroke={glow === "bench" ? C.accent : C.rule} strokeWidth={glow === "bench" ? 5 : 2} />
      <text x={SOB.x0 + 16} y={SOB.railY + 30} fontSize={T.label} fontWeight={700} fill={C.ink}>{tx(cfg.bench)}</text>

      {/* the places nobody has opened yet */}
      {Array.from({ length: SOB.cols }).map((_, k) => (k < bs.open ? null : (
        <g key={"p" + k} transform={`translate(${sobM(k)},${SOB.railY})`}><SobBowl closed C={C} /></g>
      )))}
      {canAct && bs.rounds === 0 && Array.from({ length: SOB.cols }).map((_, k) => (
        <Hit key={"h" + k} id={"place-" + (k + 1)} label={"Open " + (k + 1) + (k ? " bowls" : " bowl")}
          x={sobL(k)} y={SOB.railY} w={SOB.pitch} h={SOB.rowH} onPress={() => openTo(k + 1)} />
      ))}

      {/* the bowls themselves: lifted to the tray, or standing full on the bench */}
      {Array.from({ length: bs.open }).map((_, k) => {
        const up = dealt && bs.up[k];
        const held = dragging && dragging.payload.src === "bowl" && dragging.payload.k === k;
        const paint = !dealt || lifted === 0 ? "gOne" : up ? cfg.take : cfg.rest;
        const live = canAct && dealt;
        const pay = { src: "bowl", k };
        return (
          <g key={"b" + k} className={"sob-move" + (live ? " c4-piece sob-grab" : "")}
            style={{ transform: `translate(${sobM(k)}px, ${sobTop(up)}px)` } as any}
            {...(live ? { ...control("bowl-" + (k + 1), up ? "Put bowl " + (k + 1) + " back on the bench" : "Lift bowl " + (k + 1) + " to the tray"), ...drag.bind(pay), ...drag.keys(pay) } : {})}>
            <rect x={-36} y={0} width={SOB.pitch} height={SOB.rowH} fill="transparent" />
            {held ? <SobBowl closed C={C} /> : <SobBowl n={bs.rounds} paint={paint} C={C} />}
            {dealt && !held && tells(bs.rounds) && <text x={0} y={150} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{bs.rounds}</text>}
          </g>
        );
      })}

      {/* the piece under the finger */}
      {dragging && (
        <g pointerEvents="none" transform={`translate(${Math.max(60, Math.min(1026, dragging.x))},${Math.max(30, Math.min(400, dragging.y))})`}>
          {dragging.payload.src === "pile"
            ? <g filter="url(#fLift)">{[-18, 0, 18].map((dx) => <Disc key={dx} x={dx} y={0} r={11} paint="gOne" flat />)}</g>
            : <g filter="url(#fLift)"><SobBowl n={bs.rounds} paint={cfg.take} C={C} /></g>}
        </g>
      )}

      {/* the working lines: ruled and waiting, then each step written as it happens */}
      {Array.from({ length: lineSlots }).map((_, i) => (
        <rect key={"f" + i} x={SOB.x0} y={SOB.lineY[i]} width={SOB.wide} height={SOB.lineH} rx={14}
          fill="#FFFFFF" fillOpacity={0.55} stroke={C.rule} strokeWidth={1.5} strokeDasharray="9 8" />
      ))}
      {rows.map((r: any, i: number) => (
        <SobLine key={i} y={SOB.lineY[i]} label={tx(r.label)} swatch={r.swatch} terms={r.terms} size={lineSize} C={C} />
      ))}

      {/* free play: any pile the bench can take */}
      {free && (
        <g>
          <Key id="pile-fewer" label={tx("A smaller pile")} x={4} y={424} w={88} h={72} C={C} onClick={() => resize(-1)}>
            <text y={12} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={C.ink}>−</text>
          </Key>
          <Key id="pile-more" label={tx("A bigger pile")} x={104} y={424} w={88} h={72} C={C} onClick={() => resize(1)}>
            <text y={12} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={C.ink}>+</text>
          </Key>
        </g>
      )}

      {invite && <Invite x={invite.x} y={invite.y} r={invite.r} C={C} />}
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase:
   the fraction that was taken, stacked, and the count (or counts) the child wrote */
function Thumb({ result, C, w, h, lang = "en", tx = (v: any) => v }: any) {
  const L = (result && result.last) || {};
  const it = PHASES.reduce((a: any[], p: any) => a.concat(p.items), [])
    .find((x: any) => x.kind === L.kind && JSON.stringify(x.answer) === JSON.stringify(L.answer));
  if (!it) return null;
  const rest = it.bench && it.bench.length <= 8 ? it.bench : "left";
  const ofPile = lang === "hi" ? "कुल " + it.pile : lang === "gu" ? "કુલ " + it.pile : "of " + it.pile;
  const lines = it.want === "both" ? [tx(it.tray) + " " + it.answer[0], tx(rest) + " " + it.answer[1]]
    : it.want === "other" ? [tx("share") + " " + it.answer[0], tx("other") + " " + indian(it.answer[1])]
      : it.want === "rest" ? [ofPile, tx(rest) + " " + it.answer]
        : [ofPile, "= " + it.answer];
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      <text x={25} y={h / 2 - 8} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={C.ink}>{it.num}</text>
      <line x1={8} y1={h / 2} x2={42} y2={h / 2} stroke={C.ink} strokeWidth={3} strokeLinecap="round" />
      <text x={25} y={h / 2 + 30} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={C.ink}>{it.den}</text>
      <text x={w - 14} y={h / 2 - 8} textAnchor="end" fontSize={T.micro} fontWeight={500} fill={C.ink}>{lines[0]}</text>
      <text x={w - 14} y={h / 2 + 28} textAnchor="end" fontSize={T.micro} fontWeight={700} fill={C.ink}>{lines[1]}</text>
    </g>
  );
}

function ShareOutBench(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, fitHost: () => null }} />
  );
}

export default ShareOutBench;
