/* ═══ M1.S2.T3.C10.2D1 · share_out_bench · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists. THE LESSON IS SILENT (runtime r30+): the bubble is the guide; the lesson is
   action-driven. THE NEW LOOK (keyOnly, navDots, nextKey, bigPad): the question lives only in the bubble, every act
   the child triggers is performed on screen with api.act. NO imports in this file; only the five host hooks.
   Edit, never rewrite. Built by `node cli.mjs scaffold`; concepts are verbatim (check compares them). */

const TOOL_ID = "share_out_bench";
const MEDIA_ID = "M1.S2.T3.C10.2D1";
const TOOL_NAME = "Share Out Bench";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
/* kept for the tool object's shape (and the sidecar); nothing speaks from r30 */
const VOICE = {"rate":0.92,"pitch":1.06};

const OPENING = ["A pile on the left and empty bowls on the right."];
const FINISH_LINE = "Every pile shared out, and the bowls nobody lifted still standing where they were filled.";
const FREE_LINE = "Free play: tap New pile for a new share, then run each key in turn.";
const START_HOOK = "How many bowls does this fraction need?";

/* the start page's object: a pile of counters and four empty bowls */
function StartArt({ box, C, lang, tx }: any) {
  return (
    <g>
      <g filter="url(#fShadowSoft)">
        {Array.from({ length: 24 }).map((_, i) => (
          <SobCounter key={i} x={150 + (i % 8) * 40} y={90 + Math.floor(i / 8) * 40} r={15} />
        ))}
      </g>
      {[0, 1, 2, 3].map((k) => (
        <g key={k} transform={`translate(${720 + k * 150},170)`}><SobBowl n={0} S={130} closed={false} C={C} /></g>
      ))}
    </g>
  );
}

/* Hindi and Gujarati (docs/PATTERNS.md §11): keyed by the English, byte for byte. Terms (one per idea, for a native speaker to check): fraction
   भिन्न / અપૂર્ણાંક, upper number ऊपर की संख्या / ઉપરની સંખ્યા, lower number नीचे की संख्या / નીચેની સંખ્યા (the chapter's terms), share (the noun) हिस्सा / હિસ્સો, pile ढेर / ઢગલો,
   bowl कटोरा / વાટકો, counter गोटी / ગોટી, divide first पहले भाग दो / પહેલા ભાગાકાર. A fraction in a line is written in words, never "3/4".
   "of" beside the pile's count reads कुल / કુલ ("total"), as the count stands to its right. Digits stay Latin. Data-borne lines (WIN) and the words
   Work draws through tx are listed by hand. */
const TR: any = {
  hi: {
    "Share Out Bench": "बाँटो बेंच",
    "A pile on the left and empty bowls on the right.": "बाईं ओर ढेर है और दाईं ओर खाली कटोरे हैं।",
    "Every pile shared out, and the bowls nobody lifted still standing where they were filled.": "हर ढेर बाँट दिया गया। जो कटोरे किसी ने नहीं उठाए, वे वहीं खड़े रहे जहाँ भरे थे।",
    "Free play: tap New pile for a new share, then run each key in turn.": "मुक्त खेल: नया ढेर दबाओ, फिर हर कुंजी बारी-बारी से दबाओ।",
    "How many bowls does this fraction need?": "इस भिन्न को कितने कटोरे चाहिए?",
    "Yes, two bowls of 6 make 12.": "हाँ, 6 के दो कटोरे मिलकर 12 होते हैं।",
    "Yes, one bowl of 6 is one sixth of 36.": "हाँ, 6 का एक कटोरा 36 का छठा भाग है।",
    "Yes, one quarter of 28 is 7.": "हाँ, 28 की चौथाई 7 है।",
    "Yes, 24, and the other order had to carry 192.": "हाँ, 24; और दूसरे क्रम में 192 तक जाना पड़ा।",
    "Yes, 6 in each bowl, and 2 bowls make 12.": "हाँ, हर कटोरे में 6, और 2 कटोरे मिलकर 12।",
    "Yes, 36, and the other order would have divided 252.": "हाँ, 36; दूसरे क्रम में 252 को भाग देना पड़ता।",
    "Yes, 40 red and 32 blue make the 72 again.": "हाँ, 40 लाल और 32 नीली मिलकर फिर 72 होती हैं।",
    "Yes, 36 ripe and 60 not ripe make the 96.": "हाँ, 36 पके और 60 कच्चे मिलकर 96 होते हैं।",
    "Yes, 16 children come by bus.": "हाँ, 16 बच्चे बस से आते हैं।",
    "Yes, 27 kites are still left.": "हाँ, 27 पतंगें अभी बाकी हैं।",
    "Yes, 49 sweets are still in the jar.": "हाँ, जार में अभी 49 मिठाइयाँ हैं।",
    "Yes, 84 story books and 48 other books.": "हाँ, 84 कहानी की किताबें और 48 दूसरी किताबें।",
    "What of means here": "यहाँ “का” का मतलब",
    "Tap Open bowls: the lower number says how many.": "“कटोरे खोलो” दबाओ: नीचे की संख्या बताती है कि कितने।",
    "Tap the Open bowls key at the bottom.": "नीचे “कटोरे खोलो” कुंजी दबाओ।",
    "Now tap Deal out to share the pile equally.": "अब “बाँटो” दबाओ, ढेर बराबर बँट जाएगा।",
    "Tap the Deal out key.": "“बाँटो” कुंजी दबाओ।",
    "Tap Lift to tray: the upper number says how many bowls.": "“ट्रे में उठाओ” दबाओ: ऊपर की संख्या बताती है कितने कटोरे।",
    "Tap the Lift to tray key.": "“ट्रे में उठाओ” कुंजी दबाओ।",
    "How many bowls does the lower number ask you to open?": "नीचे की संख्या तुम्हें कितने कटोरे खोलने को कहती है?",
    "Open that many bowls, deal out, then lift as many as the upper number says.": "उतने कटोरे खोलो, बाँटो, फिर ऊपर की संख्या जितने उठाओ।",
    "Of means share into equal parts, then keep as many parts as the upper number says.": "“का” का मतलब: बराबर भाग करो, फिर ऊपर की संख्या जितने भाग रखो।",
    "You learned: of means share into equal groups, then keep some.": "तुमने सीखा: “का” यानी बराबर बाँटो, फिर कुछ रखो।",
    "Find two sevenths of 42.": "42 का सात में से दो भाग निकालो।",
    "Two sevenths of 42?": "42 का सात में से दो भाग?",
    "Which number of your fraction is written below the line?": "तुम्हारी भिन्न में रेखा के नीचे कौन सी संख्या है?",
    "What is one sixth of 36?": "36 का छठा भाग कितना है?",
    "One sixth of 36?": "36 का छठा भाग?",
    "Think about what \"of\" asks you to do with the pile.": "सोचो: “का” ढेर के साथ तुमसे क्या करवाता है?",
    "Find one quarter of 28.": "28 की चौथाई निकालो।",
    "A quarter of 28?": "28 की चौथाई?",
    "Each bowl must hold the same number of counters when the pile is shared.": "ढेर बँटने पर हर कटोरे में बराबर गोटियाँ होनी चाहिए।",
    "Divide first, then multiply": "पहले भाग दो, फिर गुणा करो",
    "Tap Both ways to try both orders and see the middle numbers.": "“दोनों तरीके” दबाओ और बीच की संख्याएँ देखो।",
    "Tap the Both ways key at the bottom.": "नीचे “दोनों तरीके” कुंजी दबाओ।",
    "How many bowls does the upper number ask you to lift?": "ऊपर की संख्या तुम्हें कितने कटोरे उठाने को कहती है?",
    "Divide by the lower number first, then multiply by the upper number.": "पहले नीचे की संख्या से भाग दो, फिर ऊपर की संख्या से गुणा करो।",
    "Divide by the lower number first, then multiply, and the numbers stay small.": "पहले नीचे की संख्या से भाग दो, फिर गुणा करो, संख्याएँ छोटी रहती हैं।",
    "You learned: divide first, then multiply, so the numbers stay small.": "तुमने सीखा: पहले भाग, फिर गुणा, तो संख्याएँ छोटी रहती हैं।",
    "share": "हिस्सा",
    "multiply": "गुणा",
    "Find three eighths of 64, and what multiplying first makes.": "64 का आठ में से तीन भाग और पहले गुणा से बनी संख्या निकालो।",
    "Share? Multiply?": "हिस्सा? गुणा?",
    "Multiplying first starts with the pile times the upper number.": "पहले गुणा में ढेर को ऊपर की संख्या से गुणा करते हैं।",
    "Find two ninths of 54, dividing before you multiply.": "54 का नौ में से दो भाग निकालो, गुणा से पहले भाग देकर।",
    "Two ninths of 54?": "54 का नौ में से दो भाग?",
    "One bowl is only part of the share; the upper number says how many go up.": "एक कटोरा हिस्से का एक भाग है; ऊपर की संख्या बताती है कितने ऊपर जाएँ।",
    "Now four sevenths of 63: share, and what multiplying first makes.": "अब 63 का सात में से चार भाग: हिस्सा, और पहले गुणा से बनी संख्या।",
    "Multiplying first carries the whole pile once for each bowl lifted.": "पहले गुणा में उठाए हर कटोरे के लिए पूरा ढेर एक बार आता है।",
    "One share found, the other still waiting": "एक हिस्सा मिला, दूसरा अभी बाकी",
    "taken": "लिया",
    "left": "बाकी",
    "Tap Count tray to count what you took.": "“ट्रे गिनो” दबाओ और अपना लिया हुआ हिस्सा गिनो।",
    "Tap the Count tray key.": "“ट्रे गिनो” कुंजी दबाओ।",
    "Now tap Count bench to count what is left.": "अब “बेंच गिनो” दबाओ और जो बचा है उसे गिनो।",
    "Tap the Count bench key.": "“बेंच गिनो” कुंजी दबाओ।",
    "Tap Leftover check to add the two counts back to the whole pile.": "“बाकी की जाँच” दबाओ: दोनों गिनती जोड़कर पूरा ढेर पाओ।",
    "Tap the Leftover check key.": "“बाकी की जाँच” कुंजी दबाओ।",
    "How many bowls are still on the bench, and what is in each?": "बेंच पर अभी कितने कटोरे हैं, और हर एक में कितना है?",
    "Take the tray's count away from the whole pile, or count what is on the bench.": "पूरे ढेर में से ट्रे की गिनती घटाओ, या बेंच का गिनो।",
    "The share taken and the share left are different numbers that add back to the whole.": "लिया हिस्सा और बाकी हिस्सा जुड़कर पूरा ढेर बनाते हैं।",
    "You learned: the share and what is left add back to the whole.": "तुमने सीखा: हिस्सा और बाकी जुड़कर पूरा ढेर बनता है।",
    "red": "लाल",
    "blue": "नीली",
    "A box of 72 pencils is five ninths red, the rest blue; how many of each?": "72 पेंसिलों में नौ में से पाँच भाग लाल, बाकी नीली; हर रंग की कितनी?",
    "Red? Blue?": "लाल? नीली?",
    "Count the pencils inside the bowls, not the bowls themselves.": "कटोरों के अंदर की पेंसिलें गिनो, कटोरों को नहीं।",
    "ripe": "पके",
    "not ripe": "कच्चे",
    "Of 96 mangoes, three eighths are ripe; how many are ripe and not ripe?": "96 आमों में आठ में से तीन भाग पके हैं; कितने पके, कितने कच्चे?",
    "Ripe? Not ripe?": "पके? कच्चे?",
    "A bowl on the bench holds as much as a tray bowl; count what is on the bench.": "बेंच के कटोरे में ट्रे के कटोरे जितना ही है; बेंच का गिनो।",
    "walk": "पैदल",
    "bus": "बस",
    "Of 40 children, three fifths walk, the rest come by bus; how many by bus?": "40 बच्चों में पाँच में से तीन भाग पैदल, बाकी बस से; बस से कितने?",
    "Children by bus?": "बस से कितने बच्चे?",
    "The walkers went up to the tray, so who is still on the bench?": "पैदल वाले ट्रे में गए, तो बेंच पर कौन है?",
    "Checking the answer against the question": "उत्तर को प्रश्न से मिलाकर जाँचना",
    "Tap Count tray to count the pile that was taken.": "“ट्रे गिनो” दबाओ और लिया हुआ ढेर गिनो।",
    "Tap Count bench to count the pile that was left.": "“बेंच गिनो” दबाओ और बचा हुआ ढेर गिनो।",
    "Tap Leftover check to add both piles back to the whole pile.": "“बाकी की जाँच” दबाओ: दोनों ढेर जुड़कर पूरा ढेर बनते हैं।",
    "Does the question point at the tray, or at the bench?": "प्रश्न ट्रे की ओर इशारा करता है, या बेंच की ओर?",
    "Say the last part of the question aloud, then count only that pile.": "प्रश्न का आखिरी भाग बोलो, फिर सिर्फ़ उसी ढेर को गिनो।",
    "Read the question again, because it may want the share or what is left.": "प्रश्न फिर पढ़ो, वह हिस्सा या बाकी माँग सकता है।",
    "You learned: answer the pile that the question asks for.": "तुमने सीखा: प्रश्न जिस ढेर को माँगे, वही बताओ।",
    "sold": "बिकी",
    "A shop with 45 kites sells two fifths of them; how many are left?": "दुकान 45 पतंगों का पाँच में से दो भाग बेचती है; कितनी बचीं?",
    "Kites left?": "कितनी पतंगें बचीं?",
    "Sold kites went up to the tray; which kites does the question want?": "बिकी पतंगें ट्रे में गईं; प्रश्न कौन सी पतंगें माँगता है?",
    "given away": "दे दी गईं",
    "in the jar": "जार में",
    "Five twelfths of 84 sweets are given away; how many are in the jar?": "84 मिठाइयों का बारह में से पाँच भाग बाँटा; जार में कितनी हैं?",
    "Sweets in the jar?": "जार में कितनी मिठाइयाँ?",
    "Which row is named like the end of the question?": "प्रश्न के अंत जैसे नाम वाली पंक्ति कौन सी है?",
    "story": "कहानी",
    "other": "अन्य",
    "Of 132 books, seven elevenths are story books; how many of each kind?": "132 किताबों में ग्यारह में से सात भाग कहानी की हैं; हर तरह की कितनी?",
    "Story? Other?": "कहानी? अन्य?",
    "This one wants two numbers: the story books and all the others.": "इसमें दो संख्याएँ चाहिए: कहानी की किताबें और बाकी सब।",
    "of": "कुल",
    "tray": "ट्रे",
    "bench": "बेंच",
    "together": "मिलाकर",
    "divide first": "पहले भाग दो",
    "multiply first": "पहले गुणा",
    "Open bowls": "कटोरे खोलो",
    "Deal out": "बाँटो",
    "Lift to tray": "ट्रे में उठाओ",
    "Count tray": "ट्रे गिनो",
    "Count bench": "बेंच गिनो",
    "Both ways": "दोनों तरीके",
    "Leftover check": "बाकी की जाँच",
    "New pile": "नया ढेर",
  },
  gu: {
    "Share Out Bench": "વહેંચો બેન્ચ",
    "A pile on the left and empty bowls on the right.": "ડાબી બાજુ ઢગલો છે અને જમણી બાજુ ખાલી વાટકા છે.",
    "Every pile shared out, and the bowls nobody lifted still standing where they were filled.": "દરેક ઢગલો વહેંચાઈ ગયો. જે વાટકા કોઈએ ન ઉપાડ્યા, તે ભરાયા ત્યાં જ ઊભા રહ્યા.",
    "Free play: tap New pile for a new share, then run each key in turn.": "મુક્ત રમત: નવો ઢગલો દબાવો, પછી દરેક કી વારાફરતી દબાવો.",
    "How many bowls does this fraction need?": "આ અપૂર્ણાંકને કેટલા વાટકા જોઈએ?",
    "Yes, two bowls of 6 make 12.": "હા, 6 ના બે વાટકા મળીને 12 થાય છે.",
    "Yes, one bowl of 6 is one sixth of 36.": "હા, 6 નો એક વાટકો 36 નો છઠ્ઠો ભાગ છે.",
    "Yes, one quarter of 28 is 7.": "હા, 28 નો ચોથો ભાગ 7 છે.",
    "Yes, 24, and the other order had to carry 192.": "હા, 24; અને બીજી રીતમાં 192 સુધી જવું પડ્યું.",
    "Yes, 6 in each bowl, and 2 bowls make 12.": "હા, દરેક વાટકામાં 6, અને 2 વાટકા મળીને 12.",
    "Yes, 36, and the other order would have divided 252.": "હા, 36; બીજી રીતમાં 252 ને ભાગવું પડત.",
    "Yes, 40 red and 32 blue make the 72 again.": "હા, 40 લાલ અને 32 વાદળી મળીને ફરી 72 થાય છે.",
    "Yes, 36 ripe and 60 not ripe make the 96.": "હા, 36 પાકી અને 60 કાચી મળીને 96 થાય છે.",
    "Yes, 16 children come by bus.": "હા, 16 બાળકો બસથી આવે છે.",
    "Yes, 27 kites are still left.": "હા, 27 પતંગ હજી બાકી છે.",
    "Yes, 49 sweets are still in the jar.": "હા, બરણીમાં હજી 49 મીઠાઈ છે.",
    "Yes, 84 story books and 48 other books.": "હા, 84 વાર્તાના પુસ્તકો અને 48 બીજા પુસ્તકો.",
    "What of means here": "અહીં “નો” નો અર્થ",
    "Tap Open bowls: the lower number says how many.": "“વાટકા ખોલો” દબાવો: નીચેની સંખ્યા કહે છે કે કેટલા.",
    "Tap the Open bowls key at the bottom.": "નીચે “વાટકા ખોલો” કી દબાવો.",
    "Now tap Deal out to share the pile equally.": "હવે “વહેંચો” દબાવો, ઢગલો સરખો વહેંચાશે.",
    "Tap the Deal out key.": "“વહેંચો” કી દબાવો.",
    "Tap Lift to tray: the upper number says how many bowls.": "“ટ્રેમાં ઉપાડો” દબાવો: ઉપરની સંખ્યા કહે છે કેટલા વાટકા.",
    "Tap the Lift to tray key.": "“ટ્રેમાં ઉપાડો” કી દબાવો.",
    "How many bowls does the lower number ask you to open?": "નીચેની સંખ્યા તમને કેટલા વાટકા ખોલવાનું કહે છે?",
    "Open that many bowls, deal out, then lift as many as the upper number says.": "એટલા વાટકા ખોલો, વહેંચો, પછી ઉપરની સંખ્યા જેટલા ઉપાડો.",
    "Of means share into equal parts, then keep as many parts as the upper number says.": "“નો” નો અર્થ: સરખા ભાગ કરો, પછી ઉપરની સંખ્યા જેટલા ભાગ રાખો.",
    "You learned: of means share into equal groups, then keep some.": "તમે શીખ્યા: “નો” એટલે સરખા ભાગ પાડો, પછી થોડા રાખો.",
    "Find two sevenths of 42.": "42 નો સાતમાંથી બે ભાગ શોધો.",
    "Two sevenths of 42?": "42 નો સાતમાંથી બે ભાગ?",
    "Which number of your fraction is written below the line?": "તમારા અપૂર્ણાંકમાં રેખાની નીચે કઈ સંખ્યા લખેલી છે?",
    "What is one sixth of 36?": "36 નો છઠ્ઠો ભાગ કેટલો છે?",
    "One sixth of 36?": "36 નો છઠ્ઠો ભાગ?",
    "Think about what \"of\" asks you to do with the pile.": "વિચારો: “નો” ઢગલા સાથે તમને શું કરાવે છે?",
    "Find one quarter of 28.": "28 નો ચોથો ભાગ શોધો.",
    "A quarter of 28?": "28 નો ચોથો ભાગ?",
    "Each bowl must hold the same number of counters when the pile is shared.": "ઢગલો વહેંચાય ત્યારે દરેક વાટકામાં સરખી ગોટીઓ હોવી જોઈએ.",
    "Divide first, then multiply": "પહેલા ભાગાકાર, પછી ગુણાકાર",
    "Tap Both ways to try both orders and see the middle numbers.": "“બંને રીત” દબાવો અને વચ્ચેની સંખ્યાઓ જુઓ.",
    "Tap the Both ways key at the bottom.": "નીચે “બંને રીત” કી દબાવો.",
    "How many bowls does the upper number ask you to lift?": "ઉપરની સંખ્યા તમને કેટલા વાટકા ઉપાડવાનું કહે છે?",
    "Divide by the lower number first, then multiply by the upper number.": "પહેલા નીચેની સંખ્યાથી ભાગાકાર, પછી ઉપરની સંખ્યાથી ગુણાકાર કરો.",
    "Divide by the lower number first, then multiply, and the numbers stay small.": "પહેલા નીચેની સંખ્યાથી ભાગાકાર, પછી ગુણાકાર, સંખ્યાઓ નાની રહે છે.",
    "You learned: divide first, then multiply, so the numbers stay small.": "તમે શીખ્યા: પહેલા ભાગાકાર, પછી ગુણાકાર, તો સંખ્યાઓ નાની રહે.",
    "share": "હિસ્સો",
    "multiply": "ગુણાકાર",
    "Find three eighths of 64, and what multiplying first makes.": "64 નો આઠમાંથી ત્રણ ભાગ અને પહેલા ગુણાકારથી બનેલી સંખ્યા શોધો.",
    "Share? Multiply?": "હિસ્સો? ગુણાકાર?",
    "Multiplying first starts with the pile times the upper number.": "પહેલા ગુણાકારમાં ઢગલાને ઉપરની સંખ્યાથી ગુણીએ છીએ.",
    "Find two ninths of 54, dividing before you multiply.": "54 નો નવમાંથી બે ભાગ શોધો, ગુણાકાર પહેલા ભાગાકાર કરીને.",
    "Two ninths of 54?": "54 નો નવમાંથી બે ભાગ?",
    "One bowl is only part of the share; the upper number says how many go up.": "એક વાટકો હિસ્સાનો એક ભાગ છે; ઉપરની સંખ્યા કહે છે કેટલા ઉપર જાય.",
    "Now four sevenths of 63: share, and what multiplying first makes.": "હવે 63 નો સાતમાંથી ચાર ભાગ: હિસ્સો, અને પહેલા ગુણાકારથી બનેલી સંખ્યા.",
    "Multiplying first carries the whole pile once for each bowl lifted.": "પહેલા ગુણાકારમાં ઉપાડેલા દરેક વાટકા માટે આખો ઢગલો એક વાર આવે છે.",
    "One share found, the other still waiting": "એક હિસ્સો મળ્યો, બીજો હજી બાકી",
    "taken": "લીધું",
    "left": "બાકી",
    "Tap Count tray to count what you took.": "“ટ્રે ગણો” દબાવો અને તમે લીધેલું ગણો.",
    "Tap the Count tray key.": "“ટ્રે ગણો” કી દબાવો.",
    "Now tap Count bench to count what is left.": "હવે “બેન્ચ ગણો” દબાવો અને જે બચ્યું છે તે ગણો.",
    "Tap the Count bench key.": "“બેન્ચ ગણો” કી દબાવો.",
    "Tap Leftover check to add the two counts back to the whole pile.": "“બાકીની ચકાસણી” દબાવો: બંને ગણતરી ભેગી કરી આખો ઢગલો મેળવો.",
    "Tap the Leftover check key.": "“બાકીની ચકાસણી” કી દબાવો.",
    "How many bowls are still on the bench, and what is in each?": "બેન્ચ પર હજી કેટલા વાટકા છે, અને દરેકમાં કેટલું છે?",
    "Take the tray's count away from the whole pile, or count what is on the bench.": "આખા ઢગલામાંથી ટ્રેની ગણતરી બાદ કરો, અથવા બેન્ચનું ગણો.",
    "The share taken and the share left are different numbers that add back to the whole.": "લીધેલો હિસ્સો અને બાકીનો હિસ્સો ભેગા થઈને આખો ઢગલો બને છે.",
    "You learned: the share and what is left add back to the whole.": "તમે શીખ્યા: હિસ્સો અને બાકી ભેગા થઈને આખો ઢગલો બને.",
    "red": "લાલ",
    "blue": "વાદળી",
    "A box of 72 pencils is five ninths red, the rest blue; how many of each?": "72 પેન્સિલમાં નવમાંથી પાંચ ભાગ લાલ, બાકીની વાદળી; દરેક રંગની કેટલી?",
    "Red? Blue?": "લાલ? વાદળી?",
    "Count the pencils inside the bowls, not the bowls themselves.": "વાટકાની અંદરની પેન્સિલ ગણો, વાટકા નહીં.",
    "ripe": "પાકી",
    "not ripe": "કાચી",
    "Of 96 mangoes, three eighths are ripe; how many are ripe and not ripe?": "96 કેરીમાં આઠમાંથી ત્રણ ભાગ પાકી છે; કેટલી પાકી, કેટલી કાચી?",
    "Ripe? Not ripe?": "પાકી? કાચી?",
    "A bowl on the bench holds as much as a tray bowl; count what is on the bench.": "બેન્ચના વાટકામાં ટ્રેના વાટકા જેટલું જ છે; બેન્ચનું ગણો.",
    "walk": "ચાલીને",
    "bus": "બસ",
    "Of 40 children, three fifths walk, the rest come by bus; how many by bus?": "40 બાળકોમાં પાંચમાંથી ત્રણ ભાગ ચાલીને, બાકીના બસથી; બસથી કેટલાં?",
    "Children by bus?": "બસથી કેટલાં બાળકો?",
    "The walkers went up to the tray, so who is still on the bench?": "ચાલીને આવનારા ટ્રેમાં ગયા, તો બેન્ચ પર કોણ છે?",
    "Checking the answer against the question": "જવાબને પ્રશ્ન સાથે ચકાસવો",
    "Tap Count tray to count the pile that was taken.": "“ટ્રે ગણો” દબાવો અને લીધેલો ઢગલો ગણો.",
    "Tap Count bench to count the pile that was left.": "“બેન્ચ ગણો” દબાવો અને બચેલો ઢગલો ગણો.",
    "Tap Leftover check to add both piles back to the whole pile.": "“બાકીની ચકાસણી” દબાવો: બંને ઢગલા ભેગા થઈને આખો ઢગલો બને.",
    "Does the question point at the tray, or at the bench?": "પ્રશ્ન ટ્રે તરફ ઈશારો કરે છે કે બેન્ચ તરફ?",
    "Say the last part of the question aloud, then count only that pile.": "પ્રશ્નનો છેલ્લો ભાગ બોલો, પછી ફક્ત એ જ ઢગલો ગણો.",
    "Read the question again, because it may want the share or what is left.": "પ્રશ્ન ફરી વાંચો, તે હિસ્સો કે બાકી માગી શકે.",
    "You learned: answer the pile that the question asks for.": "તમે શીખ્યા: પ્રશ્ન જે ઢગલો માગે તે જ કહો.",
    "sold": "વેચાયા",
    "A shop with 45 kites sells two fifths of them; how many are left?": "દુકાન 45 પતંગનો પાંચમાંથી બે ભાગ વેચે છે; કેટલા બચ્યા?",
    "Kites left?": "કેટલા પતંગ બચ્યા?",
    "Sold kites went up to the tray; which kites does the question want?": "વેચાયેલા પતંગ ટ્રેમાં ગયા; પ્રશ્ન કયા પતંગ માગે છે?",
    "given away": "આપી દીધી",
    "in the jar": "બરણીમાં",
    "Five twelfths of 84 sweets are given away; how many are in the jar?": "84 મીઠાઈનો બારમાંથી પાંચ ભાગ આપ્યો; બરણીમાં કેટલી છે?",
    "Sweets in the jar?": "બરણીમાં કેટલી મીઠાઈ?",
    "Which row is named like the end of the question?": "પ્રશ્નના અંત જેવા નામવાળી હરોળ કઈ છે?",
    "story": "વાર્તા",
    "other": "બીજા",
    "Of 132 books, seven elevenths are story books; how many of each kind?": "132 પુસ્તકોમાં અગિયારમાંથી સાત ભાગ વાર્તાના છે; દરેક પ્રકારના કેટલા?",
    "Story? Other?": "વાર્તા? બીજા?",
    "This one wants two numbers: the story books and all the others.": "આમાં બે સંખ્યા જોઈએ: વાર્તાના પુસ્તકો અને બાકીના બધા.",
    "of": "કુલ",
    "tray": "ટ્રે",
    "bench": "બેન્ચ",
    "together": "ભેગું",
    "divide first": "પહેલા ભાગાકાર",
    "multiply first": "પહેલા ગુણાકાર",
    "Open bowls": "વાટકા ખોલો",
    "Deal out": "વહેંચો",
    "Lift to tray": "ટ્રેમાં ઉપાડો",
    "Count tray": "ટ્રે ગણો",
    "Count bench": "બેન્ચ ગણો",
    "Both ways": "બંને રીત",
    "Leftover check": "બાકીની ચકાસણી",
    "New pile": "નવો ઢગલો",
  },
};

/* the one-sentence win line said at every right answer (data-borne: add each to TR by hand at the language pass) */
const WIN: Record<string, string> = {
  "M1.S2.T3.C10:ML1": "Yes, two bowls of 6 make 12.",
  "M1.S2.T3.C10:1": "Yes, one bowl of 6 is one sixth of 36.",
  "M1.S2.T3.C10:2": "Yes, one quarter of 28 is 7.",
  "M1.S2.T3.C11:ML2": "Yes, 24, and the other order had to carry 192.",
  "M1.S2.T3.C11:3": "Yes, 6 in each bowl, and 2 bowls make 12.",
  "M1.S2.T3.C11:4": "Yes, 36, and the other order would have divided 252.",
  "M1.S2.T3.C12:ML3": "Yes, 40 red and 32 blue make the 72 again.",
  "M1.S2.T3.C12:5": "Yes, 36 ripe and 60 not ripe make the 96.",
  "M1.S2.T3.C12:6": "Yes, 16 children come by bus.",
  "M1.S2.T3.C13:ML4": "Yes, 27 kites are still left.",
  "M1.S2.T3.C13:7": "Yes, 49 sweets are still in the jar.",
  "M1.S2.T3.C13:8": "Yes, 84 story books and 48 other books.",
};

/* One entry per phase = one mount.
   warm  the warm-up bench the guide steps work on (never a question's own numbers, its result is none of the phase's answers)
   items pile / num / den: the bench of the question; want: share | other | rest | both (what the answer asks for);
         tray / bench: the question's own word for each pile (at most 10 characters when it is a two-box label) */
const PHASES = [
  {
    n: 1,
    concept: "What of means here",
    conceptId: "M1.S2.T3.C10", objectiveIds: ["O3"],
    warm: { kind: "of", pile: 16, num: 1, den: 4 },
    steps: [
      { say: "Tap Open bowls: the lower number says how many.", on: "open", hint: "Tap the Open bowls key at the bottom." },
      { say: "Now tap Deal out to share the pile equally.", on: "deal", hint: "Tap the Deal out key." },
      { say: "Tap Lift to tray: the upper number says how many bowls.", on: "lift", hint: "Tap the Lift to tray key." },
    ],
    /* tries: rung 1 is each item's own miss */
    ladder: ["How many bowls does the lower number ask you to open?", "Open that many bowls, deal out, then lift as many as the upper number says."],
    closing: "Of means share into equal parts, then keep as many parts as the upper number says.",
    learned: "You learned: of means share into equal groups, then keep some.",
    traceback: "The bench opens a bowl for each part the lower number names, deals the pile out round by round, lifts as many bowls as the upper number says and writes the share on a working line.",
    items: [
      /* learn ML1: answer in the plan = It asks you to split 42 into seven equal groups and keep two of them, which is 12 */
      { qid: "M1.S2.T3.C10:ML1", kind: "of", pile: 42, num: 2, den: 7, want: "share", winMs: 4000,
        say: "Find two sevenths of 42.", ask: "Two sevenths of 42?", answer: 12,
        miss: "Which number of your fraction is written below the line?" },
      /* practice 1: answer in the plan = It means splitting 36 into six equal groups and keeping one of them, which is 6 */
      { qid: "M1.S2.T3.C10:1", kind: "of", pile: 36, num: 1, den: 6, want: "share", winMs: 4000,
        say: "What is one sixth of 36?", ask: "One sixth of 36?", answer: 6,
        miss: 'Think about what "of" asks you to do with the pile.' },
      /* practice 2: answer in the plan = 7 */
      { qid: "M1.S2.T3.C10:2", kind: "of", pile: 28, num: 1, den: 4, want: "share", winMs: 4000,
        say: "Find one quarter of 28.", ask: "A quarter of 28?", answer: 7,
        miss: "Each bowl must hold the same number of counters when the pile is shared." },
    ],
  },
  {
    n: 2,
    concept: "Divide first, then multiply",
    conceptId: "M1.S2.T3.C11", objectiveIds: ["O3"],
    warm: { kind: "order", pile: 24, num: 3, den: 8, pre: "lifted" },
    steps: [
      { say: "Tap Both ways to try both orders and see the middle numbers.", on: "both-ways", hint: "Tap the Both ways key at the bottom." },
    ],
    ladder: ["How many bowls does the upper number ask you to lift?", "Divide by the lower number first, then multiply by the upper number."],
    closing: "Divide by the lower number first, then multiply, and the numbers stay small.",
    learned: "You learned: divide first, then multiply, so the numbers stay small.",
    traceback: "Both working lines are written out in step, dividing first and multiplying first, until they land on the same share, with the big number the multiply line had to carry ringed.",
    items: [
      /* learn ML2: answer in the plan = 24, and the other order would have asked for 192 divided by 8 */
      { qid: "M1.S2.T3.C11:ML2", kind: "order", pile: 64, num: 3, den: 8, want: "other", winMs: 4000,
        parts: [{ label: "share" }, { label: "multiply" }], answer: [24, 192],
        say: "Find three eighths of 64, and what multiplying first makes.",
        ask: "Share? Multiply?", miss: "Multiplying first starts with the pile times the upper number." },
      /* practice 3: answer in the plan = 12, and dividing fifty-four by nine came first */
      { qid: "M1.S2.T3.C11:3", kind: "order", pile: 54, num: 2, den: 9, want: "share", winMs: 4000,
        say: "Find two ninths of 54, dividing before you multiply.", ask: "Two ninths of 54?", answer: 12,
        miss: "One bowl is only part of the share; the upper number says how many go up." },
      /* practice 4: answer in the plan = 36, and the other order would have made you divide 252 */
      { qid: "M1.S2.T3.C11:4", kind: "order", pile: 63, num: 4, den: 7, want: "other", winMs: 4000,
        parts: [{ label: "share" }, { label: "multiply" }], answer: [36, 252],
        say: "Now four sevenths of 63: share, and what multiplying first makes.",
        ask: "Share? Multiply?", miss: "Multiplying first carries the whole pile once for each bowl lifted." },
    ],
  },
  {
    n: 3,
    concept: "One share found, the other still waiting",
    conceptId: "M1.S2.T3.C12", objectiveIds: ["O4"],
    warm: { kind: "count", pile: 12, num: 1, den: 3, pre: "lifted", tray: "taken", bench: "left" },
    steps: [
      { say: "Tap Count tray to count what you took.", on: "count-tray", hint: "Tap the Count tray key." },
      { say: "Now tap Count bench to count what is left.", on: "count-bench", hint: "Tap the Count bench key." },
      { say: "Tap Leftover check to add the two counts back to the whole pile.", on: "leftover", hint: "Tap the Leftover check key." },
    ],
    ladder: ["How many bowls are still on the bench, and what is in each?", "Take the tray's count away from the whole pile, or count what is on the bench."],
    closing: "The share taken and the share left are different numbers that add back to the whole.",
    learned: "You learned: the share and what is left add back to the whole.",
    traceback: "The share is lifted, the tray and the bench are counted on lines of their own, and the two counts are added back against the pile the bench began with.",
    items: [
      /* learn ML3: answer in the plan = 40 red pencils and 32 blue ones */
      /* plan question: A box holds 72 pencils. 5/9 of them are red and the rest are blue. How many are there of each colour? */
      { qid: "M1.S2.T3.C12:ML3", kind: "count", pile: 72, num: 5, den: 9, want: "both", tray: "red", bench: "blue", noRing: true, winMs: 4000,
        parts: [{ label: "red" }, { label: "blue" }], answer: [40, 32],
        say: "A box of 72 pencils is five ninths red, the rest blue; how many of each?",
        ask: "Red? Blue?", miss: "Count the pencils inside the bowls, not the bowls themselves." },
      /* practice 5: answer in the plan = 36 are ripe and 60 are not */
      /* plan question: A farmer picks 96 mangoes and 3/8 of them are ripe. How many are ripe, and how many are not? */
      { qid: "M1.S2.T3.C12:5", kind: "count", pile: 96, num: 3, den: 8, want: "both", tray: "ripe", bench: "not ripe", winMs: 4000,
        parts: [{ label: "ripe" }, { label: "not ripe" }], answer: [36, 60],
        say: "Of 96 mangoes, three eighths are ripe; how many are ripe and not ripe?",
        ask: "Ripe? Not ripe?", miss: "A bowl on the bench holds as much as a tray bowl; count what is on the bench." },
      /* practice 6: answer in the plan = 16 come by bus, because 24 walk */
      /* plan question: In a class of 40 children, 3/5 walk to school and the rest come by bus. How many come by bus? */
      { qid: "M1.S2.T3.C12:6", kind: "count", pile: 40, num: 3, den: 5, want: "rest", tray: "walk", bench: "bus", winMs: 4000,
        say: "Of 40 children, three fifths walk, the rest come by bus; how many by bus?", ask: "Children by bus?", answer: 16,
        miss: "The walkers went up to the tray, so who is still on the bench?" },
    ],
  },
  {
    n: 4,
    concept: "Checking the answer against the question",
    conceptId: "M1.S2.T3.C13", objectiveIds: ["O4"],
    warm: { kind: "check", pile: 20, num: 2, den: 5, pre: "lifted", tray: "taken", bench: "left" },
    steps: [
      { say: "Tap Count tray to count the pile that was taken.", on: "count-tray", hint: "Tap the Count tray key." },
      { say: "Tap Count bench to count the pile that was left.", on: "count-bench", hint: "Tap the Count bench key." },
      { say: "Tap Leftover check to add both piles back to the whole pile.", on: "leftover", hint: "Tap the Leftover check key." },
    ],
    ladder: ["Does the question point at the tray, or at the bench?", "Say the last part of the question aloud, then count only that pile."],
    closing: "Read the question again, because it may want the share or what is left.",
    learned: "You learned: answer the pile that the question asks for.",
    traceback: "Both piles are counted on their own lines and the one the question is pointing at is lit; nothing is marked and nothing is cleared.",
    items: [
      /* learn ML4: answer in the plan = 27 kites are left */
      /* plan question: A shop has 45 kites and sells 2/5 of them. The question asks how many kites are left. What is the answer? */
      { qid: "M1.S2.T3.C13:ML4", kind: "check", pile: 45, num: 2, den: 5, want: "rest", tray: "sold", bench: "left", winMs: 4000,
        say: "A shop with 45 kites sells two fifths of them; how many are left?", ask: "Kites left?", answer: 27,
        miss: "Sold kites went up to the tray; which kites does the question want?" },
      /* practice 7: answer in the plan = 49 sweets, because 35 were given away */
      /* plan question: A jar holds 84 sweets and 5/12 of them are given away. How many sweets are still in the jar? */
      { qid: "M1.S2.T3.C13:7", kind: "check", pile: 84, num: 5, den: 12, want: "rest", tray: "given away", bench: "in the jar", winMs: 4000,
        say: "Five twelfths of 84 sweets are given away; how many are in the jar?", ask: "Sweets in the jar?", answer: 49,
        miss: "Which row is named like the end of the question?" },
      /* practice 8: answer in the plan = 84 are story books and 48 are not */
      /* plan question: A library has 132 books and 7/11 of them are story books. How many are story books, and how many are not? */
      { qid: "M1.S2.T3.C13:8", kind: "check", pile: 132, num: 7, den: 11, want: "both", tray: "story", bench: "other", winMs: 4000,
        parts: [{ label: "story" }, { label: "other" }], answer: [84, 48],
        say: "Of 132 books, seven elevenths are story books; how many of each kind?", ask: "Story? Other?",
        miss: "This one wants two numbers: the story books and all the others." },
    ],
  },
];

/* The numbers, rows, sizes and targets the working area needs (they go into the sidecar too). */
const MODEL = {
  pile: { maxTokens: 144 },
  bench: { bowls: 12, maxPerBowl: 12, rowH: 146, trayY: 0, benchY: 150 },
  lines: { y: 300, h: 40, pitch: 42 },
  keys: { y: 432, h: 72 },
};

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

const judge = (item: any, v: any) => {
  if (item.parts) return judgeSlotParts(item, v);
  if (typeof item.answer === "number") return leadNumber(v) === item.answer;
  return String(v).trim().toLowerCase() === String(item.answer).trim().toLowerCase();
};
/* oracle: every answer re-derived by a second route that shares no code with judge or Work: multiply the pile by the
   upper number and then divide, take what is left by counting the pile down, and check the question names the pile */
const oracle = () => PHASES.every((p: any) => p.items.every((it: any) => {
  if (!it.pile || !it.den || it.pile % it.den) return false;
  if (!new RegExp("(^|[^\\d])" + it.pile + "([^\\d]|$)").test(String(it.say))) return false;
  const big = it.pile * it.num;
  const share = big / it.den;
  let rest = it.pile;
  for (let k = 0; k < share; k++) rest -= 1;
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
const agentKey = (item: any) => item.answer;

const HOOK: any = {};
const solve = (item: any, T: any) => (T.state().stage === "demo" ? HOOK.demo && HOOK.demo() : T.submit(item.answer));
const answer = (item: any, v: any) => (item.pad === "enter" && HOOK.set ? HOOK.set(v) : undefined);
const check = () => (HOOK.check ? HOOK.check() : undefined);

/* ── the bench: where everything stands in the working area ───────────────────────────────── */
const SOB_FREE = [
  { kind: "free", pile: 24, num: 3, den: 8 }, { kind: "free", pile: 30, num: 2, den: 5 }, { kind: "free", pile: 36, num: 5, den: 6 },
  { kind: "free", pile: 48, num: 3, den: 4 }, { kind: "free", pile: 20, num: 1, den: 5 },
];
const SOB_LABEL: Record<string, string> = { "open": "Open bowls", "deal": "Deal out", "lift": "Lift to tray", "count-tray": "Count tray",
  "count-bench": "Count bench", "both-ways": "Both ways", "leftover": "Leftover check", "new-pile": "New pile" };
const sobRange = (m: number) => Array.from({ length: m }, (_, k) => k);
const sobNone = () => sobRange(12).map(() => false);
/* the bench of one question (or the warm-up, or a free-play pile) */
const sobCfg = (it: any) => ({
  kind: it.kind, P: it.pile, n: it.num, d: it.den, R: it.pile / it.den, want: it.want || "share",
  tray: it.tray || "tray", bench: it.bench || "bench", noRing: !!it.noRing,
  pre: it.pre || (it.kind === "count" || it.kind === "check" ? "lifted" : "whole"),
});
/* the keys, in the order a child presses them */
const sobSeq = (c: any, demo: boolean) => (c.kind === "free" ? ["open", "deal", "lift", "both-ways", "leftover"]
  : c.kind === "of" ? ["open", "deal", "lift"]
  : c.kind === "order" ? (demo ? ["both-ways"] : ["open", "deal", "lift", "both-ways"])
  : demo ? ["count-tray", "count-bench", "leftover"] : ["count-tray", "count-bench"]);
const sobFresh = (c: any, ek: string) => {
  const lifted = c.pre === "lifted", up = sobNone();
  if (lifted) for (let k = 0; k < c.n; k++) up[k] = true;
  return { ek, open: lifted ? c.d : 0, rounds: lifted ? c.R : 0, up, ct: 0, cb: 0, w: [0, 0, 0], lit: null as any, glow: null as any, told: false, done: false, acts: [] as string[] };
};
/* hd: Hindi or Gujarati, whose labels rise and fall further, so the bowls start 8 lower and are a little smaller; m: the same margin each side of a row */
const sobGeo = (bw: number, bk: any, d: number, hd: boolean) => {
  const kx = bk ? bk.x - 12 : bw;
  const x0 = 214, xr = Math.min(bw, kx) - 6, m = 14;
  const pitch = Math.max(44, Math.min(110, (xr - x0 - 2 * m) / Math.max(d, 5)));
  return { x0, xr, m, hd, pitch, top: hd ? 52 : 44, S: Math.max(36, Math.min(hd ? 60 : 68, pitch - 10)), trayY: 0, benchY: 150, rowH: 146, lineY: 300, keyY: 432 };
};
/* the pile's token grid: neat separated rows, never overlapping, at most a hundred and forty-four */
const sobGrid = (pile: number) => {
  const cols = pile > 100 ? 12 : pile > 48 ? 10 : 8, pitch = pile > 100 ? 16 : pile > 48 ? 19 : 24;
  return { cols, pitch, r: pitch * 0.4, x: (200 - cols * pitch) / 2 + pitch / 2, y: 216 + pitch / 2 };
};
/* a text's ink width, near enough to keep the working lines from ever touching */
const sobInk = (s: string, size: number) => {
  let w = 0;
  for (const ch of s) w += ch === " " ? 0.3 : ch === "1" ? 0.5 : ch >= "0" && ch <= "9" ? 0.58 : 0.62;
  return w * size;
};
const sobTW = (t: any, size: number) => (t === "|" ? 34 : typeof t === "string" ? sobInk(t, size) + 12
  : (t.v === null || t.v === undefined ? 58 : sobInk(String(t.v), size)) + 12 + (t.ring ? 28 : 0));
const sobLay = (terms: any[], size: number, x0: number) => {
  let x = x0;
  return terms.map((t: any) => { const w = sobTW(t, size); const r = { x, w }; x += w; return r; });
};
/* the working lines of a bench; tv(x) is the number to print for x, or null for an empty box */
const sobLines = (c: any, tv: (x: number) => any, ring: boolean) => {
  const sh = c.n * c.R, rest = c.P - sh, big = c.P * c.n;
  const V = (x: number, extra?: any) => ({ v: tv(x), ...(extra || {}) });
  const A = { label: "divide first", terms: [c.P + " ÷ " + c.d, "=", V(c.R), "|", c.n + " ×", V(c.R), "=", V(sh)] };
  const B = { label: "multiply first", terms: [c.P + " × " + c.n, "=", V(big, { ring }), "|", V(big), "÷ " + c.d, "=", V(sh)] };
  const T = { label: c.tray, terms: [c.n + " × " + c.R, "=", V(sh)] };
  const N = { label: c.bench, terms: [(c.d - c.n) + " × " + c.R, "=", V(rest)] };
  const G = { label: "together", terms: [sh + " + " + rest, "=", V(c.P)] };
  return c.kind === "of" ? [A] : c.kind === "order" ? [A, B] : c.kind === "free" ? [A, B, G] : [T, N, G];
};

const SOB_CSS = `
.sob-move{transition:transform 340ms cubic-bezier(.3,.7,.3,1)}
@media (prefers-reduced-motion:reduce){.sob-move{transition:none}}
`;

/* a counter: cream with a dark outline, so it reads on the clay inside a bowl and on the white card alike */
function SobCounter({ x, y, r }: any) {
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill="#FFF4DC" stroke="#4A3B2A" strokeWidth={Math.max(1.3, r * 0.2)} />
      <ellipse cx={x - r * 0.25} cy={y - r * 0.35} rx={r * 0.4} ry={r * 0.18} fill="#FFFFFF" fillOpacity={0.75} />
    </g>
  );
}
/* where the counters of a bowl lie: a hex-packed heap that fills outward from the middle, so each counter keeps its place as the bowl fills */
const SOB_LAT = (() => {
  const pts: number[][] = [];
  for (let i = -3; i <= 3; i++) for (let j = -3; j <= 3; j++) pts.push([i + j / 2, j * 0.8660254]);
  return pts.sort((p, q) => Math.round(Math.hypot(p[0], p[1]) * 1000) - Math.round(Math.hypot(q[0], q[1]) * 1000) || Math.atan2(p[1], p[0]) - Math.atan2(q[1], q[0])).slice(0, 12);
})();

/* one bowl, centred on its own origin in a square box S: the plain drawn disc first (the fallback), the clay bowl picture over it,
   a ring in the pile's colour once the bowls are lifted (blue taken, amber left), and the counters standing in the mouth */
function SobBowl({ n, S, closed, ring, C }: any) {
  const r = S / 2;
  if (closed) return <circle cx={0} cy={0} r={r - 2} fill="none" stroke={shade(C.rule, 0.5)} strokeWidth={3.5} strokeDasharray="7 6" />;
  const rc = S * (Math.min(n || 0, 12) <= 7 ? 0.11 : 0.074), a = 2.1 * rc;
  return (
    <g>
      <circle cx={0} cy={0} r={r} fill={shade(C.rule, 0.2)} stroke={shade(C.rule, 0.45)} strokeWidth={2} />
      <circle cx={0} cy={0} r={r * 0.72} fill={shade(C.rule, 0.45)} />
      <Skin name="bowl" x={-r} y={-r} w={S} h={S} />
      {ring && <circle cx={0} cy={0} r={r + 2} fill="none" stroke={ring} strokeWidth={4} />}
      {SOB_LAT.slice(0, Math.min(n || 0, 12)).map((p: number[], i: number) => <SobCounter key={i} x={p[0] * a} y={p[1] * a} r={rc} />)}
    </g>
  );
}

/* ── the working area: origin at its top-left, box.w wide (1472 shut, 900 with the keypad open), 520 tall ──
   The fraction and the pile stand at the left, the tray above the bench at the right, the working lines under
   them, and ONE key at the bottom centre whose label follows the act (Open, Deal, Lift ...). Nothing prints
   the share before it is answered; after a miss the bench redraws the whole thing and writes the answer. */
function Work({ phase, n, item, index, stage, wrong, api, step, stepOn, box, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();
  const [freeIdx, setFreeIdx] = useState(0);
  const free = stage === "free";
  const warm = !free && (stage === "demo" || stage === "teach") && !!phase.warm;
  const loose = free || warm;
  const cfg: any = sobCfg(free ? SOB_FREE[freeIdx] : warm ? phase.warm : item);
  const demo = stage === "demo" || stage === "teach";

  /* the board belongs to the ENTRY of a question: a new question, a restart or a new pile starts it afresh */
  const qk = free ? "f" + freeIdx : warm ? "w" + phase.n : "q" + phase.n + ":" + index;
  const ent = useRef<any>({ qk: "", n: 0, st: "" });
  if (ent.current.qk !== qk || (stage === "teach" && ent.current.st !== "teach")) ent.current = { qk, n: ent.current.n + 1, st: stage };
  else ent.current.st = stage;
  const ek = qk + "#" + ent.current.n;
  const sRef = useRef<any>(null);
  if (!sRef.current || sRef.current.ek !== ek) sRef.current = sobFresh(cfg, ek);
  const [, bump] = useState(0);
  const put = (p: any) => { if (sRef.current.ek !== ek) return; sRef.current = { ...sRef.current, ...p }; bump((x: number) => x + 1); };
  const S = sRef.current;
  const locked = useRef(false);
  const busy = useRef(false);
  const lastDone = useRef(0);
  useEffect(() => () => { tl.stop(); if (locked.current) { locked.current = false; api.lock(false); } }, [ek]);

  const bw = box ? box.w : W.w;
  const hi = lang === "hi", hd = hi || lang === "gu";
  const G = sobGeo(bw, box && box.key, cfg.d, hd);
  const dealt = S.open === cfg.d && S.rounds === cfg.R;
  const lifted = S.up.slice(0, cfg.d).filter(Boolean).length;
  const pileLeft = Math.max(0, cfg.P - S.rounds * S.open);
  const isWin = stage === "win" || stage === "idle";
  const reveal = S.told || isWin;
  const asked = loose ? [] : (Array.isArray(item.answer) ? item.answer : [item.answer]).filter((x: any) => typeof x === "number");
  /* a figure is printed only once it is no answer of this question, or the question is answered */
  const tells = (v: number) => reveal || loose || asked.indexOf(v) < 0;
  const counted = (k: number) => (S.up[k] ? k < S.ct : k >= cfg.n && k - cfg.n < S.cb);
  const countKind = cfg.kind === "count" || cfg.kind === "check";
  const showR = (k: number) => reveal || (countKind ? counted(k) : dealt && tells(cfg.R));
  const LINES = sobLines(cfg, (x: number) => (tells(x) ? x : null), reveal || loose);
  const LENS = LINES.map((l: any) => l.terms.length);
  const TX0 = 250;
  const lineSize = Math.min(...LINES.map((l: any) => (sobLay(l.terms, T.label, TX0).reduce((a: number, r: any) => a + r.w, 0) <= G.xr - TX0 - 10 ? T.label : T.micro)));
  const lineAt = (i: number) => G.lineY + i * (hi ? 44 : 42);
  const bx = (k: number) => G.x0 + G.m + k * G.pitch + G.pitch / 2;
  const cupY = (row: number) => row + G.top + G.S / 2;
  const seq = sobSeq(cfg, demo);
  const cur = seq.find((id: string) => S.acts.indexOf(id) < 0) || "";

  /* ── the acts: each one is PERFORMED on screen by a tool of the action kit ── */
  const writeAct = (idx: number[], then: () => void) => {
    const at: any[] = [], seg: number[] = [];
    idx.forEach((i: number) => {
      const lay = sobLay(LINES[i].terms, lineSize, TX0);
      lay.forEach((r: any) => { at.push({ x: r.x + r.w / 2, y: lineAt(i) + (hi ? 21 : 20) }); seg.push(i); });
    });
    return api.act({ tool: "pencil", moves: "push", ms: 900, at, onPoint: (p: number) => {
      const i = seg[p], upto = seg.slice(0, p + 1).filter((s: number) => s === i).length;
      const w = sRef.current.w.slice(); w[i] = upto; put({ w });
    } }).then((ok: boolean) => { if (ok) then(); return ok; });
  };
  const ACTS: any = {
    open: () => api.act({ tool: "hand", moves: "tap", ms: 800, at: sobRange(cfg.d).map((k: number) => ({ x: bx(k), y: cupY(G.benchY) })),
      onPoint: (i: number) => put({ open: i + 1 }) }).then((ok: boolean) => { if (ok) put({ open: cfg.d }); return ok; }),
    deal: () => api.act({ tool: "hand", moves: "push", ms: 900, from: { x: 120, y: G.benchY + 150 },
      at: sobRange(cfg.R).map((r: number) => ({ x: G.x0 + 40 + (r / Math.max(1, cfg.R - 1)) * (cfg.d * G.pitch - 70), y: cupY(G.benchY) + 14 })),
      to: { x: G.x0 + cfg.d * G.pitch, y: cupY(G.benchY) + 14 }, onPoint: (r: number) => put({ rounds: r + 1 }) })
      .then((ok: boolean) => { if (ok) put({ rounds: cfg.R }); return ok; }),
    lift: () => api.act({ tool: "hand", moves: "tap", ms: 800, at: sobRange(cfg.n).map((k: number) => ({ x: bx(k), y: cupY(G.benchY) })),
      onPoint: (i: number) => { const up = sRef.current.up.slice(); up[i] = true; put({ up }); } })
      .then((ok: boolean) => { if (ok) { const up = sobNone(); for (let k = 0; k < cfg.n; k++) up[k] = true; put({ up }); } return ok; }),
    "count-tray": () => api.act({ tool: "hand", moves: "tap", ms: 800, at: sobRange(cfg.n).map((k: number) => ({ x: bx(k), y: cupY(G.trayY) })),
      onPoint: (i: number) => put({ ct: i + 1 }) }).then((ok: boolean) => { if (ok) put({ ct: cfg.n }); return ok; }),
    "count-bench": () => api.act({ tool: "hand", moves: "tap", ms: 800, at: sobRange(cfg.d - cfg.n).map((k: number) => ({ x: bx(cfg.n + k), y: cupY(G.benchY) })),
      onPoint: (i: number) => put({ cb: i + 1 }) }).then((ok: boolean) => { if (ok) put({ cb: cfg.d - cfg.n }); return ok; }),
    "both-ways": () => writeAct([0, 1], () => put({ w: [LENS[0], LENS[1], 0] })),
    leftover: () => (cfg.kind === "free" ? writeAct([2], () => put({ w: [LENS[0], LENS[1], LENS[2]] }))
      : writeAct([0, 1, 2], () => put({ w: [LENS[0], LENS[1], LENS[2]] }))),
  };
  const run = async (id: string) => {
    if (!id || busy.current || tl.busy || !ACTS[id]) return;
    if (!(stage === "demo" || stage === "ask" || free)) return;
    if (Date.now() - lastDone.current < 400) return;
    busy.current = true;
    const ok = await ACTS[id]();
    busy.current = false;
    lastDone.current = Date.now();
    if (!ok) return;
    api.sfx.settle();
    put({ acts: [...sRef.current.acts, id] });
    api.did(id);
  };
  api.onEnter(stage === "demo" && stepOn ? () => run(cur || stepOn) : null);

  /* ── the bench redrawing the whole thing, and ending on the answer (a miss and a win alike) ── */
  const finish = (slow: number) => {
    const c = cfg, S0 = sRef.current, st: any[] = [];
    if (S0.done) return st;
    const s = (ms: number, fn: () => void) => st.push([Math.round(ms * slow), fn]);
    const dealtOk = S0.open === c.d && S0.rounds === c.R;
    s(60, () => put({ w: [0, 0, 0], glow: null }));
    if (!dealtOk) {
      if (S0.rounds > 0) s(420, () => put({ rounds: 0, up: sobNone() }));
      s(240, () => put({ open: 0, lit: "den" }));
      for (let k = 1; k <= c.d; k++) { const j = k; s(90, () => put({ open: j })); }
      s(240, () => {});
      for (let r = 1; r <= c.R; r++) { const j = r; s(c.R > 6 ? 125 : 170, () => { put({ rounds: j }); api.sfx.tick(); }); }
      s(240, () => put({ lit: null }));
    }
    const upOk = dealtOk && S0.up.slice(0, c.d).filter(Boolean).length === c.n;
    if (!upOk) {
      s(300, () => put({ up: sobNone() }));
      s(260, () => put({ lit: "num" }));
      for (let k = 0; k < c.n; k++) { const j = k; s(c.n > 4 ? 240 : 320, () => { const up = sRef.current.up.slice(); up[j] = true; put({ up }); api.sfx.tick(); }); }
      s(260, () => put({ lit: null }));
    }
    const glow = countKind ? (c.want === "share" ? "tray" : c.want === "rest" ? "bench" : "both") : null;
    LENS.forEach((len: number, i: number) => {
      s(i === 0 ? 620 : 720, () => put({ told: true, w: LENS.map((l: number, j: number) => (j <= i ? l : 0)), glow: i === LENS.length - 1 ? glow : null }));
    });
    s(320, () => put({ done: true, acts: seq }));
    return st;
  };
  /* the traceback: nothing is marked, nothing is cleared, and it ends on the whole right answer */
  useEffect(() => {
    if (!wrong || stage !== "ask") return;
    api.lock(true); locked.current = true;
    tl.run([[420, () => {}], ...finish(1)], () => { locked.current = false; api.lock(false); });
  }, [wrong]);
  /* the win: the same working, at the pace of a nod, and the one-sentence win line */
  useEffect(() => {
    if (stage !== "win") return;
    tl.run(finish(0.65));
    if (WIN[item.qid]) api.say(WIN[item.qid]);
  }, [stage]);

  /* what the host and the agent read back (toolApi.getState); a figure the question asks for stays null until it is told */
  const sh = cfg.n * cfg.R, restN = cfg.P - sh;
  api.share({
    pile: cfg.P, numerator: cfg.n, denominator: cfg.d, bowls: S.open,
    perBowl: dealt && tells(cfg.R) ? cfg.R : null,
    tray: dealt && lifted === cfg.n && tells(sh) ? sh : null,
    leftOnBench: dealt && lifted === cfg.n && tells(restN) ? restN : null,
    complete: stage === "idle",
  });

  /* ── drawing ── */
  const grid = sobGrid(cfg.P);
  const takeInk = shade(CONTENT.hundred, 0.25);
  const rowGlow = (r: string) => S.glow === r || S.glow === "both";
  const canKey = (stage === "demo" || stage === "ask" || free) && !tl.busy && !S.done;
  const kw = 320, kh = 72;
  const keys = [...(cur && !S.done && !isWin ? [cur] : []), ...(free ? ["new-pile"] : [])];
  const kws = keys.map((id: string) => (id === "new-pile" ? 250 : kw));
  const kTot = kws.reduce((a: number, b: number) => a + b, 0) + 20 * Math.max(0, keys.length - 1);
  let kx0 = Math.max(0, Math.round((bw - kTot) / 2));
  const keyBox = keys.map((id: string, j: number) => { const b = { id, x: kx0, w: kws[j] }; kx0 += kws[j] + 20; return b; });
  const label = (id: string) => tx(SOB_LABEL[id] || id);
  const newPile = () => { if (busy.current || tl.busy) return; tl.stop(); setFreeIdx((i: number) => (i + 1) % SOB_FREE.length); api.did("new-pile"); };
  const pileCx = 100;
  const invite = demo && stage === "demo" && stepOn && cur && canKey ? keyBox.find((b: any) => b.id === cur) : null;

  return (
    <g>
      <style>{SOB_CSS}</style>

      {/* the fraction being taken, upper number over a level rule over lower number */}
      <g>
        {S.lit === "num" && <rect x={36} y={4} width={128} height={72} rx={14} fill={tint(C.accent, 0.78)} />}
        {S.lit === "den" && <rect x={36} y={92} width={128} height={72} rx={14} fill={tint(C.accent, 0.78)} />}
        <text x={pileCx} y={62} textAnchor="middle" fontSize={T.display} fontWeight={700} fill={takeInk}>{cfg.n}</text>
        <line x1={44} y1={80} x2={156} y2={80} stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
        <text x={pileCx} y={152} textAnchor="middle" fontSize={T.display} fontWeight={700} fill={C.ink}>{cfg.d}</text>
        <text x={8} y={206} fontSize={T.label} fontWeight={600} fill={C.ink}>{tx("of")}</text>
        <text x={192} y={208} textAnchor="end" fontSize={T.xl} fontWeight={700} fill={C.ink}>{cfg.P}</text>
      </g>

      {/* the pile: identical counters in neat rows; each one goes into a bowl as it is dealt */}
      <g>
        {sobRange(pileLeft).map((i: number) => (
          <SobCounter key={i} x={grid.x + (i % grid.cols) * grid.pitch} y={grid.y + 10 + Math.floor(i / grid.cols) * grid.pitch} r={grid.r} />
        ))}
      </g>

      {/* the tray above, the bench below: the same rectangles on every phase */}
      <rect x={G.x0} y={G.trayY} width={G.xr - G.x0} height={G.rowH} rx={20} fill={tint(C.panel, 0.4)}
        stroke={rowGlow("tray") ? C.accent : C.rule} strokeWidth={rowGlow("tray") ? 6 : 2} />
      <text x={G.x0 + 16} y={G.trayY + (hd ? 38 : 29)} fontSize={lang === "gu" ? 36 : T.label} fontWeight={700} fill={C.ink}>{tx(cfg.tray)}</text>
      {cfg.tray !== "tray" && <text x={G.xr - 16} y={G.trayY + (hd ? 38 : 29)} textAnchor="end" fontSize={lang === "gu" ? 36 : T.label} fontWeight={700} fill={C.ink}>{tx("tray")}</text>}
      <rect x={G.x0} y={G.benchY} width={G.xr - G.x0} height={G.rowH} rx={20} fill={tint(C.panel, 0.2)}
        stroke={rowGlow("bench") ? C.accent : C.rule} strokeWidth={rowGlow("bench") ? 6 : 2} />
      <text x={G.x0 + 16} y={G.benchY + (hd ? 38 : 29)} fontSize={lang === "gu" ? 36 : T.label} fontWeight={700} fill={C.ink}>{tx(cfg.bench)}</text>
      {cfg.bench !== "bench" && <text x={G.xr - 16} y={G.benchY + (hd ? 38 : 29)} textAnchor="end" fontSize={lang === "gu" ? 36 : T.label} fontWeight={700} fill={C.ink}>{tx("bench")}</text>}

      {/* the seats on the bench: a bowl not yet opened, or one that went up to the tray */}
      {sobRange(cfg.d).map((k: number) => (k < S.open && !S.up[k] ? null : (
        <g key={"p" + k} transform={`translate(${bx(k)},${G.benchY + G.top + G.S / 2})`}><SobBowl closed S={G.S} C={C} /></g>
      )))}

      {/* the bowls themselves: lifted to the tray, or standing full on the bench */}
      {sobRange(Math.min(S.open, cfg.d)).map((k: number) => {
        const up = !!S.up[k], row = up ? G.trayY : G.benchY;
        const ringC = lifted === 0 || cfg.noRing ? null : up ? CONTENT.hundred : CONTENT.ten;
        return (
          <g key={"b" + k}>
            <g className="sob-move" style={{ transform: `translate(${bx(k)}px, ${row + G.top + G.S / 2}px)` } as any}>
              <SobBowl n={S.rounds} S={G.S} ring={ringC} C={C} />
            </g>
            {showR(k) && (
              <g className="sob-move" style={{ transform: `translate(${bx(k)}px, ${row + G.top + G.S + 30}px)` } as any}>
                <text x={0} y={0} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{cfg.R}</text>
              </g>
            )}
          </g>
        );
      })}

      {/* the working lines: each step written as it happens */}
      {LINES.map((ln: any, i: number) => {
        const w = S.w[i];
        if (!w) return null;
        const lay = sobLay(ln.terms, lineSize, TX0);
        return (
          <g key={"l" + i}>
            <rect x={0} y={lineAt(i)} width={G.xr} height={hi ? 42 : 40} rx={12} fill="#FFFFFF" stroke={C.rule} strokeWidth={1.5} />
            <text x={14} y={lineAt(i) + (hi ? 33 : 29)} fontSize={T.micro} fontWeight={700} fill={C.ink}>{tx(ln.label)}</text>
            {ln.terms.slice(0, w).map((t: any, j: number) => {
              const r = lay[j];
              if (t === "|") return null;
              if (typeof t === "string") return <text key={j} x={r.x} y={lineAt(i) + (hi ? 31 : 30)} fontSize={lineSize} fontWeight={600} fill={C.ink}>{t}</text>;
              if (t.v === null || t.v === undefined) return <rect key={j} x={r.x} y={lineAt(i) + 3} width={58} height={34} rx={10} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} strokeDasharray="6 5" />;
              const tw = sobInk(String(t.v), lineSize);
              return (
                <g key={j}>
                  {t.ring && <ellipse cx={r.x + 14 + tw / 2} cy={lineAt(i) + (hi ? 21 : 20)} rx={tw / 2 + 15} ry={19} fill="none" stroke={C.accent} strokeWidth={4} />}
                  <text x={r.x + (t.ring ? 14 : 0)} y={lineAt(i) + (hi ? 31 : 30)} fontSize={lineSize} fontWeight={700} fill={C.ink}>{t.v}</text>
                </g>
              );
            })}
          </g>
        );
      })}

      {/* ONE key at the bottom centre, its label following the act; in free play New pile stands beside it */}
      {keyBox.map((b: any) => (
        <Key key={"k" + b.id} id={b.id} label={label(b.id)} x={b.x} y={G.keyY} w={b.w} h={kh} C={C} tone="key"
          disabled={!canKey} onClick={() => (b.id === "new-pile" ? newPile() : run(b.id))}>
          <text y={11} textAnchor="middle" fontSize={Math.max(T.micro, Math.min(T.label, (b.w - 40) / (label(b.id).length * 0.62)))} fontWeight={700} fill={toneInk("key", C.ink)}>{label(b.id)}</text>
        </Key>
      ))}
      {invite && <Invite x={invite.x + invite.w / 2} y={G.keyY + kh / 2} w={invite.w} h={kh} C={C} />}
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase: the fraction that was taken, stacked,
   then one row a count the child wrote, each beside the colour of its pile (green the pile, blue the tray, amber the
   bench, rose the other way round). It holds no word, so it reads the same in every language. */
function Thumb({ n, result, it, C, w, h, lang = "en", tx = (v: any) => v }: any) {
  const L = (result && result.last) || {};
  const q = it || PHASES[n - 1].items[L.item];
  if (!q || L.value === null || L.value === undefined) return null;
  const vals = q.parts ? slotPartsOf(L.value, 2) : [String(L.value)];
  const rows = q.want === "both" ? [[CONTENT.hundred, vals[0]], [CONTENT.ten, vals[1]]]
    : q.want === "other" ? [[CONTENT.hundred, vals[0]], [CONTENT.bead, vals[1]]]
      : q.want === "rest" ? [[CONTENT.one, String(q.pile)], [CONTENT.ten, vals[0]]]
        : [[CONTENT.one, String(q.pile)], [CONTENT.hundred, vals[0]]];
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      <text x={30} y={h / 2 - 8} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={C.ink}>{q.num}</text>
      <line x1={10} y1={h / 2} x2={50} y2={h / 2} stroke={C.ink} strokeWidth={3} strokeLinecap="round" />
      <text x={30} y={h / 2 + 30} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={C.ink}>{q.den}</text>
      {rows.map((r: any, i: number) => (
        <g key={i}>
          <circle cx={100} cy={h / 2 + (i ? 22 : -22)} r={12} fill={r[0]} stroke="#00000033" strokeWidth={1.5} />
          <text x={w - 14} y={h / 2 + (i ? 32 : -12)} textAnchor="end" fontSize={T.micro} fontWeight={700} fill={C.ink}>{r[1]}</text>
        </g>
      ))}
    </g>
  );
}

function ShareOutBench(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, fitHost: () => null,
      /* the board layout (LAYOUT.md §1b) with the new look: no question bar, only the blinking key at the top right */
      board: true, keyOnly: true, bigPad: true, nextKey: true, navDots: true,
      /* the start page: the tool's name, StartArt, START_HOOK, a Start key (above) */
      StartArt, START_HOOK,
      }} />
  );
}

export default ShareOutBench;
