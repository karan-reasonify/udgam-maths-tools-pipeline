/* ═══ M2.S3.T5.C16.2D1 · chunk_ladder · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists: header + its three controls, canvas, slot + pad, bubble + mascot,
   phase dots (user / AI mode), window.toolApi, sounds, the synced voice, scoring, the events,
   idle and restart. NO imports in this file; only the five host hooks. Follow docs/LAYOUT.md;
   the reference tool is work/indiannica_eng_maths4_ch1/M1.S1.T2.C4.2D1/tool.tsx.
   Edit, never rewrite. Built by `node cli.mjs scaffold`; concepts are verbatim (check compares them).

   Chunk Ladder: a ladder of the divisor's multiples beside a long division frame (phases 1-2), and a
   bar for the dividend with chunk cards and a chunk column (phases 3-4, two lanes on phase 4).
   Colours are the chapter's: dividend blue, divisor amber, quotient green, a multiple rose, what is
   left vermilion, a quotient zero grey. */

const TOOL_ID = "chunk_ladder";
const MEDIA_ID = "M2.S3.T5.C16.2D1";
const TOOL_NAME = "Chunk Ladder";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
const VOICE = {"rate":0.92,"pitch":1.06};

/* spoken before phase 1's teach lines only (the plan's opening voice line) */
const OPENING = ["A two-digit divisor and a ladder beside it. Climb until one rung is too big."];
/* the whole-tool line: spoken on the summary page */
const FINISH_LINE = "Every step said out loud, and every set of chunks landing on the same quotient.";
/* said when the child opens Free play from the summary page */
const FREE_LINE = "Free play. Tap New for another division, then climb, take a rung, and bring the digits down.";

/* Hindi and Gujarati, keyed by the English line exactly (runtime r13+: `lineFor(line, lang, TR)`); the
   English stays what the checks read. NCERT class 4 terms: भाज्य भाजक भागफल शेषफल / ભાજ્ય ભાજક ભાગફળ શેષ,
   गुणज / ગુણિત (multiple), इकाई दहाई सैकड़ा हज़ार / એકમ દશક શતક હજાર. Digits stay digits: the runtime
   speaks them in the language in use. The Work's lines built from numbers are Spoken objects { en, hi, gu }
   (the place words for them come from this table). A first draft; wants a native speaker's read. (The
   two-box labels are drawn by the runtime as written: r17 does not translate them.) */
const TR: any = {
  hi: {
    "Chunk Ladder": "टुकड़ों की सीढ़ी",
    "A two-digit divisor and a ladder beside it. Climb until one rung is too big.": "दो अंकों का भाजक और उसके पास एक सीढ़ी। तब तक चढ़ो जब तक कोई पायदान बहुत बड़ा न हो।",
    "Every step said out loud, and every set of chunks landing on the same quotient.": "हर चरण ज़ोर से बोला, और टुकड़ों के हर सेट से वही भागफल मिला।",
    "Free play. Tap New for another division, then climb, take a rung, and bring the digits down.": "मुक्त खेल। दूसरे भाग के लिए नया दबाओ, फिर चढ़ो, पायदान लो, और अंक नीचे लाओ।",
    "Try multiples until one is too big": "गुणज आज़माओ, जब तक कोई बहुत बड़ा न हो",
    "Climb one rung at a time. Which rung is too big?": "एक-एक पायदान चढ़ो। कौन सा पायदान बहुत बड़ा है?",
    "Tap the climber beside the ladder to write the next rung.": "अगला पायदान लिखने के लिए सीढ़ी के पास की गोटी पर टैप करो।",
    "Have you written the rung above it?": "क्या तुमने उसके ऊपर वाला पायदान लिखा?",
    "Say each rung as you climb. Stop at the first one bigger than the number, and take the one before it.": "चढ़ते हुए हर पायदान बोलो। संख्या से बड़े पहले पायदान पर रुको, और उससे पहले वाला लो।",
    "Write multiples of the divisor until one passes the number, and take the one before it.": "भाजक के गुणज लिखो जब तक कोई संख्या से आगे न निकल जाए, और उससे पहले वाला लो।",
    "You learned: stop at the first multiple too big, take the one before.": "तुमने सीखा: पहले बहुत बड़े गुणज पर रुको, उससे पहले वाला लो।",
    "How many 16s in 75?": "75 में 16 कितनी बार?",
    "How many times does 16 go into 75? Write multiples of 16 until one is too big.": "75 में 16 कितनी बार जाता है? 16 के गुणज लिखो जब तक कोई बहुत बड़ा न हो।",
    "Which rung did you stop on?": "तुम किस पायदान पर रुके?",
    "How many 17s in 90?": "90 में 17 कितनी बार?",
    "How many times does 17 go into 90, and what is left?": "90 में 17 कितनी बार जाता है, और क्या बचता है?",
    "Is what is left under your rung smaller than 17?": "क्या तुम्हारे पायदान के नीचे जो बचा, वह 17 से छोटा है?",
    "How many 19s in 83?": "83 में 19 कितनी बार?",
    "Write the multiples of 19 up to 19 times 5. How many times does 19 go into 83?": "19 के गुणज 19 गुणा 5 तक लिखो। 83 में 19 कितनी बार जाता है?",
    "Which multiple of 19 is the first one bigger than 83?": "19 का पहला कौन सा गुणज 83 से बड़ा है?",
    "Say what is left at every step": "हर चरण पर बताओ कि क्या बचा",
    "What is left here? Where will it go next?": "यहाँ क्या बचा? यह आगे कहाँ जाएगा?",
    "Take a rung, type what is left in the dashed box, then bring the next digit down.": "एक पायदान लो, बिंदीदार खाने में जो बचा वह लिखो, फिर अगला अंक नीचे लाओ।",
    "What is the working number take away that rung?": "अभी की संख्या में से वह पायदान घटाओ, तो क्या आता है?",
    "What is left must be smaller than the divisor. Write it, then bring the next digit down beside it.": "जो बचे वह भाजक से छोटा होना चाहिए। उसे लिखो, फिर उसके पास अगला अंक नीचे लाओ।",
    "What is left at each step joins the next digit to make the next number.": "हर चरण में जो बचता है, वह अगले अंक से जुड़कर अगली संख्या बनाता है।",
    "You learned: what is left at each step joins the next digit.": "तुमने सीखा: हर चरण में जो बचे, वह अगले अंक से जुड़ता है।",
    "Quotient and remainder?": "भागफल और शेषफल?",
    "Divide 5,948 by 14, saying what is left at every step.": "5,948 को 14 से भाग दो, और हर चरण पर बताओ कि क्या बचा।",
    "Which rung did this step take?": "इस चरण ने कौन सा पायदान लिया?",
    "How many tens are left?": "कितनी दहाई बचीं?",
    "150 tens divided by 21 gives 7 tens. How many tens are left?": "150 दहाई को 21 से भाग देने पर 7 दहाई मिलती हैं। कितनी दहाई बचीं?",
    "What is 21 times 7? Take it away from 150.": "21 गुणा 7 कितना है? उसे 150 में से घटाओ।",
    "Divide 3,875 by 17, and say what is left at every step.": "3,875 को 17 से भाग दो, और हर चरण पर बताओ कि क्या बचा।",
    "Is what is left at each step smaller than 17?": "क्या हर चरण पर जो बचा, वह 17 से छोटा है?",
    "Taking away chunks you know": "जाने-पहचाने टुकड़े घटाना",
    "Take away a chunk you can work out. How much is left now?": "ऐसा टुकड़ा घटाओ जो तुम निकाल सको। अब कितना बचा?",
    "Drag a chunk card onto the bar, or tap it.": "टुकड़े का कार्ड पट्टी पर खींचो, या उस पर टैप करो।",
    "Is what is left smaller than the divisor yet?": "क्या जो बचा, वह अब भाजक से छोटा है?",
    "Add up the chunk sizes, not the amounts taken away.": "टुकड़ों के आकार जोड़ो, घटाई गई मात्राएँ नहीं।",
    "Take away chunks of the divisor that are easy to work out, until less than the divisor is left. The chunk sizes add up to the quotient.": "भाजक के ऐसे टुकड़े घटाओ जो आसानी से निकलें, जब तक भाजक से कम न बचे। टुकड़ों के आकार जोड़ने पर भागफल मिलता है।",
    "You learned: the chunk sizes you take away add up to the quotient.": "तुमने सीखा: घटाए गए टुकड़ों के आकार जोड़ने पर भागफल मिलता है।",
    "Eggs for each shop?": "हर दुकान को कितने अंडे?",
    "1,008 eggs are shared equally among 12 shops. Take away chunks: 50 for each shop first, then 30 each, then whatever is left.": "1,008 अंडे 12 दुकानों में बराबर बाँटे जाते हैं। टुकड़े घटाओ: पहले हर दुकान को 50, फिर हर एक को 30, फिर जो बचे।",
    "Which chunk did you take last?": "तुमने आखिरी टुकड़ा कौन सा लिया?",
    "Books for each library?": "हर पुस्तकालय को कितनी किताबें?",
    "A school sends 1,350 books equally to 18 libraries. Use chunks of 50, 20 and 5 to find how many each library gets.": "एक स्कूल 1,350 किताबें 18 पुस्तकालयों को बराबर भेजता है। 50, 20 और 5 के टुकड़ों से पता करो कि हर पुस्तकालय को कितनी मिलती हैं।",
    "Did you add the chunk sizes, or the books taken away?": "तुमने टुकड़ों के आकार जोड़े, या घटाई गई किताबें?",
    "What is the quotient?": "भागफल क्या है?",
    "Find 2,691 divided by 23 by taking away chunks. What is the quotient?": "टुकड़े घटाकर 2,691 ÷ 23 निकालो। भागफल क्या है?",
    "Which chunk sizes are in your column?": "तुम्हारे स्तंभ में टुकड़ों के कौन से आकार हैं?",
    "Different chunks, the same quotient": "अलग टुकड़े, वही भागफल",
    "Use different chunks this time. Does the answer change?": "इस बार अलग टुकड़े लो। क्या उत्तर बदलता है?",
    "The first lane is done. Take your own chunks in the second lane.": "पहली लेन पूरी हो गई। दूसरी लेन में अपने टुकड़े लो।",
    "What does yours add up to?": "तुम्हारे टुकड़ों का जोड़ कितना है?",
    "Add up the chunk sizes in each lane, and compare the two totals.": "हर लेन में टुकड़ों के आकार जोड़ो, और दोनों जोड़ों की तुलना करो।",
    "Different chunks add up to the same quotient.": "अलग-अलग टुकड़े जोड़ने पर वही भागफल मिलता है।",
    "You learned: different chunks add up to the same quotient.": "तुमने सीखा: अलग टुकड़े जोड़ने पर भी वही भागफल मिलता है।",
    "Eggs for each shop now?": "अब हर दुकान को कितने अंडे?",
    "Share the same 1,008 eggs among 12 shops, using the chunks 70, 10 and 4. How many does each shop get now?": "वही 1,008 अंडे 12 दुकानों में 70, 10 और 4 के टुकड़ों से बाँटो। अब हर दुकान को कितने मिलते हैं?",
    "What does the first lane's column add up to?": "पहली लेन के स्तंभ का जोड़ कितना है?",
    "The quotient in each lane?": "हर लेन में भागफल?",
    "Two children divide 1,904 by 28. One uses the chunks 50, 10 and 8, and the other uses 60 and 8. Show that both get the same quotient.": "दो बच्चे 1,904 को 28 से भाग देते हैं। एक 50, 10 और 8 के टुकड़े लेता है, और दूसरा 60 और 8। दिखाओ कि दोनों को वही भागफल मिलता है।",
    "What does the second lane's column add up to?": "दूसरी लेन के स्तंभ का जोड़ कितना है?",
    "Pencils for each class?": "हर कक्षा को कितनी पेंसिलें?",
    "1,248 pencils are shared equally among 16 classes. The first lane took 50, 20 and 8 for each class. Take different chunks. How many does each class get?": "1,248 पेंसिलें 16 कक्षाओं में बराबर बाँटी जाती हैं। पहली लेन ने हर कक्षा के लिए 50, 20 और 8 लिए। अलग टुकड़े लो। हर कक्षा को कितनी मिलती हैं?",
    "Which chunks did your lane take for each class?": "तुम्हारी लेन ने हर कक्षा के लिए कौन से टुकड़े लिए?",
    /* the Work's own lines and words */
    "Type what is left, then press Enter.": "जो बचा वह लिखो, फिर एंटर दबाओ।",
    "That is a lot of chunks. Try a bigger one.": "ये बहुत सारे टुकड़े हैं। कोई बड़ा टुकड़ा लो।",
    "Nothing is left. Add up the chunk sizes.": "कुछ नहीं बचा। टुकड़ों के आकार जोड़ो।",
    "Type how many for each, then press Enter.": "हर एक के लिए कितने, वह लिखो, फिर एंटर दबाओ।",
    "ones": "इकाई", "tens": "दहाई", "hundreds": "सैकड़े", "thousands": "हज़ार",
    "one": "इकाई", "ten": "दहाई", "hundred": "सैकड़ा", "thousand": "हज़ार",
    "quotient": "भागफल", "remainder": "शेषफल", "yours": "तुम्हारा", "too big": "बहुत बड़ा", "fits": "समाता है", "each": "हर एक", "taken": "घटाए", "any": "कोई भी",
    "New": "नया", "New division": "नया भाग", "Climb one rung": "एक पायदान चढ़ो", "Type what is left": "जो बचा वह लिखो",
    "Take the climber's rung": "गोटी वाला पायदान लो", "Bring the next digit down": "अगला अंक नीचे लाओ", "Your own chunk": "तुम्हारा अपना टुकड़ा",
    /* the summary page's little drawings (Thumb) */
    "r": "शे", "left": "बचे",
    /* the frame's lines for the questions' own divisions (literal api.say calls, so the voice bake finds them) */
    "6 tens left.": "6 दहाई बचे।", "12 ones left.": "12 इकाई बचे।", "4 hundreds left.": "4 सैकड़े बचे।", "13 tens left.": "13 दहाई बचे।", "16 ones left.": "16 इकाई बचे।",
    "6 tens are 60 ones. With 8 more, that makes 68 ones.": "6 दहाई यानी 60 इकाई। 8 और मिलाकर 68 इकाई बनते हैं।",
    "4 hundreds are 40 tens. With 7 more, that makes 47 tens.": "4 सैकड़े यानी 40 दहाई। 7 और मिलाकर 47 दहाई बनते हैं।",
    "13 tens are 130 ones. With 5 more, that makes 135 ones.": "13 दहाई यानी 130 इकाई। 5 और मिलाकर 135 इकाई बनते हैं।",
  },
  gu: {
    "Chunk Ladder": "ટુકડાની સીડી",
    "A two-digit divisor and a ladder beside it. Climb until one rung is too big.": "બે અંકનો ભાજક અને તેની બાજુમાં એક સીડી. કોઈ પગથિયું બહુ મોટું થાય ત્યાં સુધી ચઢો.",
    "Every step said out loud, and every set of chunks landing on the same quotient.": "દરેક પગલું મોટેથી બોલાયું, અને ટુકડાના દરેક સેટથી એ જ ભાગફળ મળ્યું.",
    "Free play. Tap New for another division, then climb, take a rung, and bring the digits down.": "મુક્ત રમત. બીજા ભાગાકાર માટે નવો દબાવો, પછી ચઢો, પગથિયું લો, અને અંકો નીચે લાવો.",
    "Try multiples until one is too big": "ગુણિત અજમાવો, જ્યાં સુધી કોઈ બહુ મોટો ન થાય",
    "Climb one rung at a time. Which rung is too big?": "એક-એક પગથિયું ચઢો. કયું પગથિયું બહુ મોટું છે?",
    "Tap the climber beside the ladder to write the next rung.": "આગળનું પગથિયું લખવા સીડીની બાજુની ગોટી પર ટૅપ કરો.",
    "Have you written the rung above it?": "શું તમે તેની ઉપરનું પગથિયું લખ્યું?",
    "Say each rung as you climb. Stop at the first one bigger than the number, and take the one before it.": "ચઢતાં દરેક પગથિયું બોલો. સંખ્યાથી મોટા પહેલા પગથિયે અટકો, અને તેની પહેલાંનું લો.",
    "Write multiples of the divisor until one passes the number, and take the one before it.": "ભાજકના ગુણિત લખો જ્યાં સુધી કોઈ સંખ્યાથી આગળ ન જાય, અને તેની પહેલાંનો લો.",
    "You learned: stop at the first multiple too big, take the one before.": "તમે શીખ્યા: પહેલા બહુ મોટા ગુણિતે અટકો, તેની પહેલાંનો લો.",
    "How many 16s in 75?": "75 માં 16 કેટલી વાર?",
    "How many times does 16 go into 75? Write multiples of 16 until one is too big.": "75 માં 16 કેટલી વાર જાય છે? 16 ના ગુણિત લખો જ્યાં સુધી કોઈ બહુ મોટો ન થાય.",
    "Which rung did you stop on?": "તમે કયા પગથિયે અટક્યા?",
    "How many 17s in 90?": "90 માં 17 કેટલી વાર?",
    "How many times does 17 go into 90, and what is left?": "90 માં 17 કેટલી વાર જાય છે, અને શું વધે છે?",
    "Is what is left under your rung smaller than 17?": "શું તમારા પગથિયા નીચે જે વધ્યું, તે 17 કરતાં નાનું છે?",
    "How many 19s in 83?": "83 માં 19 કેટલી વાર?",
    "Write the multiples of 19 up to 19 times 5. How many times does 19 go into 83?": "19 ના ગુણિત 19 ગુણ્યા 5 સુધી લખો. 83 માં 19 કેટલી વાર જાય છે?",
    "Which multiple of 19 is the first one bigger than 83?": "19 નો પહેલો કયો ગુણિત 83 કરતાં મોટો છે?",
    "Say what is left at every step": "દરેક પગલે કહો કે શું વધ્યું",
    "What is left here? Where will it go next?": "અહીં શું વધ્યું? તે આગળ ક્યાં જશે?",
    "Take a rung, type what is left in the dashed box, then bring the next digit down.": "એક પગથિયું લો, તૂટક ખાનામાં જે વધ્યું તે લખો, પછી આગળનો અંક નીચે લાવો.",
    "What is the working number take away that rung?": "અત્યારની સંખ્યામાંથી તે પગથિયું બાદ કરો, તો શું આવે?",
    "What is left must be smaller than the divisor. Write it, then bring the next digit down beside it.": "જે વધે તે ભાજક કરતાં નાનું હોવું જોઈએ. તે લખો, પછી તેની બાજુમાં આગળનો અંક નીચે લાવો.",
    "What is left at each step joins the next digit to make the next number.": "દરેક પગલે જે વધે, તે આગળના અંક સાથે જોડાઈને આગળની સંખ્યા બનાવે છે.",
    "You learned: what is left at each step joins the next digit.": "તમે શીખ્યા: દરેક પગલે જે વધે, તે આગળના અંક સાથે જોડાય છે.",
    "Quotient and remainder?": "ભાગફળ અને શેષ?",
    "Divide 5,948 by 14, saying what is left at every step.": "5,948 ને 14 વડે ભાગો, અને દરેક પગલે કહો કે શું વધ્યું.",
    "Which rung did this step take?": "આ પગલે કયું પગથિયું લીધું?",
    "How many tens are left?": "કેટલા દશક વધ્યા?",
    "150 tens divided by 21 gives 7 tens. How many tens are left?": "150 દશકને 21 વડે ભાગતાં 7 દશક મળે છે. કેટલા દશક વધ્યા?",
    "What is 21 times 7? Take it away from 150.": "21 ગુણ્યા 7 કેટલા? તેને 150 માંથી બાદ કરો.",
    "Divide 3,875 by 17, and say what is left at every step.": "3,875 ને 17 વડે ભાગો, અને દરેક પગલે કહો કે શું વધ્યું.",
    "Is what is left at each step smaller than 17?": "શું દરેક પગલે જે વધ્યું, તે 17 કરતાં નાનું છે?",
    "Taking away chunks you know": "જાણીતા ટુકડા બાદ કરવા",
    "Take away a chunk you can work out. How much is left now?": "એવો ટુકડો બાદ કરો જે તમે ગણી શકો. હવે કેટલું વધ્યું?",
    "Drag a chunk card onto the bar, or tap it.": "ટુકડાનું કાર્ડ પટ્ટી પર ખેંચો, અથવા તેના પર ટૅપ કરો.",
    "Is what is left smaller than the divisor yet?": "શું જે વધ્યું, તે હવે ભાજક કરતાં નાનું છે?",
    "Add up the chunk sizes, not the amounts taken away.": "ટુકડાનાં માપ ઉમેરો, બાદ કરેલી રકમ નહીં.",
    "Take away chunks of the divisor that are easy to work out, until less than the divisor is left. The chunk sizes add up to the quotient.": "ભાજકના એવા ટુકડા બાદ કરો જે સહેલાઈથી ગણાય, જ્યાં સુધી ભાજક કરતાં ઓછું ન વધે. ટુકડાનાં માપનો સરવાળો ભાગફળ છે.",
    "You learned: the chunk sizes you take away add up to the quotient.": "તમે શીખ્યા: બાદ કરેલા ટુકડાનાં માપનો સરવાળો ભાગફળ છે.",
    "Eggs for each shop?": "દરેક દુકાનને કેટલાં ઈંડાં?",
    "1,008 eggs are shared equally among 12 shops. Take away chunks: 50 for each shop first, then 30 each, then whatever is left.": "1,008 ઈંડાં 12 દુકાનોમાં સરખાં વહેંચાય છે. ટુકડા બાદ કરો: પહેલાં દરેક દુકાનને 50, પછી દરેકને 30, પછી જે વધે તે.",
    "Which chunk did you take last?": "તમે છેલ્લો ટુકડો કયો લીધો?",
    "Books for each library?": "દરેક પુસ્તકાલયને કેટલાં પુસ્તકો?",
    "A school sends 1,350 books equally to 18 libraries. Use chunks of 50, 20 and 5 to find how many each library gets.": "એક શાળા 1,350 પુસ્તકો 18 પુસ્તકાલયોને સરખાં મોકલે છે. 50, 20 અને 5 ના ટુકડાથી શોધો કે દરેક પુસ્તકાલયને કેટલાં મળે.",
    "Did you add the chunk sizes, or the books taken away?": "તમે ટુકડાનાં માપ ઉમેર્યાં, કે બાદ કરેલાં પુસ્તકો?",
    "What is the quotient?": "ભાગફળ શું છે?",
    "Find 2,691 divided by 23 by taking away chunks. What is the quotient?": "ટુકડા બાદ કરીને 2,691 ÷ 23 શોધો. ભાગફળ શું છે?",
    "Which chunk sizes are in your column?": "તમારા સ્તંભમાં ટુકડાનાં કયાં માપ છે?",
    "Different chunks, the same quotient": "જુદા ટુકડા, એ જ ભાગફળ",
    "Use different chunks this time. Does the answer change?": "આ વખતે જુદા ટુકડા લો. શું જવાબ બદલાય છે?",
    "The first lane is done. Take your own chunks in the second lane.": "પહેલી લેન પૂરી થઈ. બીજી લેનમાં તમારા ટુકડા લો.",
    "What does yours add up to?": "તમારા ટુકડાનો સરવાળો કેટલો છે?",
    "Add up the chunk sizes in each lane, and compare the two totals.": "દરેક લેનમાં ટુકડાનાં માપ ઉમેરો, અને બંને સરવાળાની સરખામણી કરો.",
    "Different chunks add up to the same quotient.": "જુદા જુદા ટુકડાનો સરવાળો એ જ ભાગફળ આપે છે.",
    "You learned: different chunks add up to the same quotient.": "તમે શીખ્યા: જુદા ટુકડાનો સરવાળો પણ એ જ ભાગફળ આપે છે.",
    "Eggs for each shop now?": "હવે દરેક દુકાનને કેટલાં ઈંડાં?",
    "Share the same 1,008 eggs among 12 shops, using the chunks 70, 10 and 4. How many does each shop get now?": "એ જ 1,008 ઈંડાં 12 દુકાનોમાં 70, 10 અને 4 ના ટુકડાથી વહેંચો. હવે દરેક દુકાનને કેટલાં મળે?",
    "What does the first lane's column add up to?": "પહેલી લેનના સ્તંભનો સરવાળો કેટલો છે?",
    "The quotient in each lane?": "દરેક લેનમાં ભાગફળ?",
    "Two children divide 1,904 by 28. One uses the chunks 50, 10 and 8, and the other uses 60 and 8. Show that both get the same quotient.": "બે બાળકો 1,904 ને 28 વડે ભાગે છે. એક 50, 10 અને 8 ના ટુકડા લે છે, અને બીજું 60 અને 8. બતાવો કે બંનેને એ જ ભાગફળ મળે છે.",
    "What does the second lane's column add up to?": "બીજી લેનના સ્તંભનો સરવાળો કેટલો છે?",
    "Pencils for each class?": "દરેક વર્ગને કેટલી પેન્સિલ?",
    "1,248 pencils are shared equally among 16 classes. The first lane took 50, 20 and 8 for each class. Take different chunks. How many does each class get?": "1,248 પેન્સિલ 16 વર્ગોમાં સરખી વહેંચાય છે. પહેલી લેને દરેક વર્ગ માટે 50, 20 અને 8 લીધા. જુદા ટુકડા લો. દરેક વર્ગને કેટલી મળે?",
    "Which chunks did your lane take for each class?": "તમારી લેને દરેક વર્ગ માટે કયા ટુકડા લીધા?",
    /* the Work's own lines and words */
    "Type what is left, then press Enter.": "જે વધ્યું તે લખો, પછી એન્ટર દબાવો.",
    "That is a lot of chunks. Try a bigger one.": "આ તો ઘણા ટુકડા છે. કોઈ મોટો ટુકડો લો.",
    "Nothing is left. Add up the chunk sizes.": "કંઈ વધ્યું નથી. ટુકડાનાં માપ ઉમેરો.",
    "Type how many for each, then press Enter.": "દરેક માટે કેટલા તે લખો, પછી એન્ટર દબાવો.",
    "ones": "એકમ", "tens": "દશક", "hundreds": "શતક", "thousands": "હજાર",
    "one": "એકમ", "ten": "દશક", "hundred": "શતક", "thousand": "હજાર",
    "quotient": "ભાગફળ", "remainder": "શેષ", "yours": "તમારું", "too big": "બહુ મોટું", "fits": "સમાય છે", "each": "દરેક", "taken": "બાદ", "any": "કોઈ પણ",
    "New": "નવો", "New division": "નવો ભાગાકાર", "Climb one rung": "એક પગથિયું ચઢો", "Type what is left": "જે વધ્યું તે લખો",
    "Take the climber's rung": "ગોટીવાળું પગથિયું લો", "Bring the next digit down": "આગળનો અંક નીચે લાવો", "Your own chunk": "તમારો પોતાનો ટુકડો",
    /* the summary page's little drawings (Thumb) */
    "r": "શે", "left": "વધ્યા",
    /* the frame's lines for the questions' own divisions (literal api.say calls, so the voice bake finds them) */
    "6 tens left.": "6 દશક વધ્યા.", "12 ones left.": "12 એકમ વધ્યા.", "4 hundreds left.": "4 શતક વધ્યા.", "13 tens left.": "13 દશક વધ્યા.", "16 ones left.": "16 એકમ વધ્યા.",
    "6 tens are 60 ones. With 8 more, that makes 68 ones.": "6 દશક એટલે 60 એકમ. 8 વધુ ઉમેરતાં 68 એકમ થાય.",
    "4 hundreds are 40 tens. With 7 more, that makes 47 tens.": "4 શતક એટલે 40 દશક. 7 વધુ ઉમેરતાં 47 દશક થાય.",
    "13 tens are 130 ones. With 5 more, that makes 135 ones.": "13 દશક એટલે 130 એકમ. 5 વધુ ઉમેરતાં 135 એકમ થાય.",
  },
};
/* a place word in one language (for the Spoken lines Work builds from numbers) */
const clIn = (lg: string, w: string) => (TR[lg] && TR[lg][w]) || w;

/* a quotient-and-remainder answer: two boxes in the slot (BUILD_CARD §7) */
const CL_PARTS = [{ label: "quotient" }, { label: "remainder" }];

/* One entry per phase = one mount.
   kinds: climb  = climb the ladder, type how many times (phase 1)
          frame  = work the long division on the frame: take a rung, type what is left into the frame's
                   dashed box (the pad is lent to it, api.capture), bring the next digit down; the finished
                   frame gives its quotient and remainder. A quotient and remainder typed in the slot boxes
                   before the frame is done is judged as it stands (right: the frame finishes itself; wrong:
                   the traceback), so the keyboard and the agent answer as on any two-part question
          left   = one step of a division, type what is left (in the frame's dashed box or in the slot)
          chunks = take chunk cards off the bar, type the sum of the chunk sizes (phase 3)
          lanes  = the same dividend in two lanes, the first done, the child's own chunks in the second */
const PHASES = [
  {
    n: 1,
    concept: "Try multiples until one is too big",
    conceptId: "M2.S3.T5.C16", objectiveIds: ["O7"],
    says: ["Climb one rung at a time. Which rung is too big?", "Tap the climber beside the ladder to write the next rung."],
    ladder: ["Have you written the rung above it?", "Say each rung as you climb. Stop at the first one bigger than the number, and take the one before it."],
    closing: "Write multiples of the divisor until one passes the number, and take the one before it.",
    learned: "You learned: stop at the first multiple too big, take the one before.",
    traceback: "The ladder climbs again rung by rung, the first rung bigger than the number lights as too big, and the rung below it goes into the frame with what is left.",
    items: [
      /* learn ML1: answer in the plan = 4 times, with 11 left, because 16 times 5 is 80, which is more than 75 */
      { qid: "M2.S3.T5.C16:ML1", kind: "climb", n: 75, d: 16, answer: 4, winMs: 3400, ask: "How many 16s in 75?",
        say: "How many times does 16 go into 75? Write multiples of 16 until one is too big.", miss: "Which rung did you stop on?" },
      /* practice 1: answer in the plan = 5 times, with 5 left, because 17 times 5 is 85 and 17 times 6 is 102 */
      { qid: "M2.S3.T5.C16:1", kind: "climb", n: 90, d: 17, parts: CL_PARTS, answer: [5, 5], winMs: 3400, ask: "How many 17s in 90?",
        say: "How many times does 17 go into 90, and what is left?", miss: "Is what is left under your rung smaller than 17?" },
      /* practice 2: answer in the plan = 19, 38, 57, 76 and 95, so 19 goes into 83 four times, with 7 left */
      { qid: "M2.S3.T5.C16:2", kind: "climb", n: 83, d: 19, answer: 4, winMs: 3400, ask: "How many 19s in 83?",
        say: "Write the multiples of 19 up to 19 times 5. How many times does 19 go into 83?", miss: "Which multiple of 19 is the first one bigger than 83?" },
    ],
  },
  {
    n: 2,
    concept: "Say what is left at every step",
    conceptId: "M2.S3.T5.C17", objectiveIds: ["O7"],
    says: ["What is left here? Where will it go next?", "Take a rung, type what is left in the dashed box, then bring the next digit down."],
    ladder: ["What is the working number take away that rung?", "What is left must be smaller than the divisor. Write it, then bring the next digit down beside it."],
    closing: "What is left at each step joins the next digit to make the next number.",
    learned: "You learned: what is left at each step joins the next digit.",
    traceback: "Your quotient times the divisor, add your remainder, is laid against the dividend; then the frame is worked again step by step, ending on the quotient and remainder beside yours.",
    /* unused: M2.S3.T5.C17:8 (a missing dividend, 26 times 58 add 9): it needs the missing number bay,
       a second picture in a phase about the leftover, and a phase holds three questions */
    items: [
      /* learn ML2: answer in the plan = 424 remainder 12. The frame opens part way through, as the plan's
         opening says: the first step done and the middle step's rung taken, its left slot empty */
      { qid: "M2.S3.T5.C17:ML2", kind: "frame", n: 5948, d: 14, from: 4, parts: CL_PARTS, answer: [424, 12], winMs: 2800,
        ask: "Quotient and remainder?", say: "Divide 5,948 by 14, saying what is left at every step.", miss: "Which rung did this step take?" },
      /* practice 3: answer in the plan = 3 tens, because 21 times 7 is 147 */
      { qid: "M2.S3.T5.C17:3", kind: "left", n: 150, d: 21, q: 7, unit: "tens", answer: 3, winMs: 2600, ask: "How many tens are left?",
        say: "150 tens divided by 21 gives 7 tens. How many tens are left?", miss: "What is 21 times 7? Take it away from 150." },
      /* practice 4: answer in the plan = 227 remainder 16: 4 hundreds are left after the first step, 13 tens after the second, and 16 at the end */
      { qid: "M2.S3.T5.C17:4", kind: "frame", n: 3875, d: 17, from: 0, parts: CL_PARTS, answer: [227, 16], winMs: 2800,
        ask: "Quotient and remainder?", say: "Divide 3,875 by 17, and say what is left at every step.", miss: "Is what is left at each step smaller than 17?" },
    ],
  },
  {
    n: 3,
    concept: "Taking away chunks you know",
    conceptId: "M2.S3.T5.C18", objectiveIds: ["O8"],
    says: ["Take away a chunk you can work out. How much is left now?", "Drag a chunk card onto the bar, or tap it."],
    ladder: ["Is what is left smaller than the divisor yet?", "Add up the chunk sizes, not the amounts taken away."],
    closing: "Take away chunks of the divisor that are easy to work out, until less than the divisor is left. The chunk sizes add up to the quotient.",
    learned: "You learned: the chunk sizes you take away add up to the quotient.",
    traceback: "The last chunks are taken off the bar, the amounts taken add up to the dividend, and the chunk sizes add up to the quotient.",
    items: [
      /* learn ML3: answer in the plan = 84 eggs for each shop, because 50, 30 and 4 add up to 84 */
      { qid: "M2.S3.T5.C18:ML3", kind: "chunks", n: 1008, d: 12, ref: [50, 30, 4], answer: 84, winMs: 3400, ask: "Eggs for each shop?",
        say: "1,008 eggs are shared equally among 12 shops. Take away chunks: 50 for each shop first, then 30 each, then whatever is left.", miss: "Which chunk did you take last?" },
      /* practice 5: answer in the plan = 75 books each, because 50, 20 and 5 add up to 75 and nothing is left */
      { qid: "M2.S3.T5.C18:5", kind: "chunks", n: 1350, d: 18, ref: [50, 20, 5], answer: 75, winMs: 3400, ask: "Books for each library?",
        say: "A school sends 1,350 books equally to 18 libraries. Use chunks of 50, 20 and 5 to find how many each library gets.", miss: "Did you add the chunk sizes, or the books taken away?" },
      /* practice 6: answer in the plan = 117, for example as 100, 10 and 7 twenty-threes, with nothing left */
      { qid: "M2.S3.T5.C18:6", kind: "chunks", n: 2691, d: 23, ref: [100, 10, 7], answer: 117, winMs: 3400, ask: "What is the quotient?",
        say: "Find 2,691 divided by 23 by taking away chunks. What is the quotient?", miss: "Which chunk sizes are in your column?" },
    ],
  },
  {
    n: 4,
    concept: "Different chunks, the same quotient",
    conceptId: "M2.S3.T5.C19", objectiveIds: ["O8"],
    says: ["Use different chunks this time. Does the answer change?", "The first lane is done. Take your own chunks in the second lane."],
    ladder: ["What does yours add up to?", "Add up the chunk sizes in each lane, and compare the two totals."],
    closing: "Different chunks add up to the same quotient.",
    learned: "You learned: different chunks add up to the same quotient.",
    traceback: "The second lane takes its own chunks beside the first, and both chunk columns are added on the same tick to one quotient.",
    items: [
      /* learn ML4: answer in the plan = Yes, still 84 each, because 70, 10 and 4 also add up to 84.
         Asked as the number the yes rests on (a yes or no would be a coin toss) */
      { qid: "M2.S3.T5.C19:ML4", kind: "lanes", n: 1008, d: 12, laneA: [50, 30, 4], ref: [70, 10, 4], answer: 84, winMs: 3800, ask: "Eggs for each shop now?",
        say: "Share the same 1,008 eggs among 12 shops, using the chunks 70, 10 and 4. How many does each shop get now?", miss: "What does the first lane's column add up to?" },
      /* practice 7: answer in the plan = Both get 68: 50, 10 and 8 make 68, and 60 and 8 make 68, with nothing left either way */
      { qid: "M2.S3.T5.C19:7", kind: "lanes", n: 1904, d: 28, laneA: [50, 10, 8], ref: [60, 8], answer: 68, winMs: 3800, ask: "The quotient in each lane?",
        say: "Two children divide 1,904 by 28. One uses the chunks 50, 10 and 8, and the other uses 60 and 8. Show that both get the same quotient.", miss: "What does the second lane's column add up to?" },
      /* authored: the plan has only two questions for this concept, and a phase holds three.
         16 times 78 is 1,248; the first lane took 50, 20 and 8 */
      { qid: null, kind: "lanes", n: 1248, d: 16, laneA: [50, 20, 8], ref: [70, 8], answer: 78, winMs: 3800, ask: "Pencils for each class?",
        say: "1,248 pencils are shared equally among 16 classes. The first lane took 50, 20 and 8 for each class. Take different chunks. How many does each class get?", miss: "Which chunks did your lane take for each class?" },
    ],
  },
];

/* ── this tool's pictures: colours, sizes, the long division ─────────────────────────────── */
const CL_INK = { blue: shade(CONTENT.hundred, 0.25), amber: shade(CONTENT.ten, 0.4), green: shade(CONTENT.one, 0.25),
  rose: shade(CONTENT.bead, 0.25), verm: shade(CONTENT.pointer, 0.25), zero: "#767676" };
const CL_PAINT: Record<string, [string, string]> = { work: ["gHundred", "blue"], rung: ["gBead", "rose"], left: ["gPointer", "verm"], divisor: ["gTen", "amber"], total: ["gBead", "rose"] };
/* the frame on the left, the middle column (the working number's tag on its row, the two bars laid side
   by side, the check), the ladder on the right: nine rungs, the divisor times one at the foot, the
   climber standing to its left */
const CL_LAD = { railL: 756, railR: 930, px: 764, pw: 158, ph: 44, foot: 490, pitch: 56, cx: 714, tag: 944 };
const clRungY = (k: number) => CL_LAD.foot - (k - 1) * CL_LAD.pitch;
const CL_CZ = { x: 358, base: 480, maxH: 280, barA: 386, barB: 516, barW: 90 };
/* the long division frame: big for one step (phase 1), normal for up to three steps */
const CL_FRB = { cw: 64, fs: T.xl, row: 76, yQ: 96, yBar: 118, yD: 184, divR: 140, bx: 150, x0: 196, under: 18 };
const CL_FR = { cw: 46, fs: T.prompt, row: 56, yQ: 52, yBar: 72, yD: 112, divR: 96, bx: 106, x0: 142, under: 14 };
/* the chunk cards (times the divisor) and the bar */
const CL_CARDS = [100, 50, 20, 10];
const CL_BAR = { top: 70, h: 400 };
/* one lane (phase 3) is drawn large across the area; two lanes (phase 4) share it */
const CL_P3 = { cards: { x: 110, w: 260, h: 84, pitch: 94, top: 30, fs: T.prompt }, bar: 460, bw: 130, col: 640, sizeX: 110, amtX: 320, fs: T.prompt, pitchMax: 52 };
const CL_P4 = { cards: { x: 443, w: 200, h: 76, pitch: 90, top: 40, fs: T.label }, bar: 703, bw: 90, col: 813, sizeX: 80, amtX: 206, fs: T.label, pitchMax: 44,
  barA: 63, colA: 173, rule: 413 };
const CL_PLACE = ["ones", "tens", "hundreds", "thousands"];

/* the long division the frame draws, step by step: where the step ends, its working number, the
   rung it takes and what it leaves */
const clSteps = (n: number, d: number) => {
  const ds = String(n).split("").map(Number);
  let i = 0, cur = ds[0];
  while (cur < d && i < ds.length - 1) { i += 1; cur = cur * 10 + ds[i]; }
  const out: any[] = [];
  for (;;) {
    const q = Math.floor(cur / d), left = cur - q * d;
    out.push({ end: i, work: cur, q, left });
    if (i >= ds.length - 1) break;
    i += 1; cur = left * 10 + ds[i];
  }
  return out;
};
const clQuot = (steps: any[]) => Number(steps.map((s: any) => s.q).join(""));
const clSum = (a: number[]) => a.reduce((x, y) => x + y, 0);
const clNum = (v: number) => (Math.abs(v) >= 1000 ? indian(v) : String(v));
const clPlural = (v: number, name: string) => (v === 1 ? name.replace(/s$/, "") : name);
const clPlace = (s: any, st: any) => s.unit || CL_PLACE[String(s.n).length - 1 - st.end] || "";
/* the frame's acts: take (a rung), left (write what is left), down (bring the next digit down) */
const clTotal = (s: any) => s.steps.length * 3 - 1;
const clAct = (s: any) => (s.fp >= clTotal(s) ? null : { kind: ["take", "left", "down"][s.fp % 3], s: Math.floor(s.fp / 3) });
const clCmp = (a: number, ka: string, b: number, kb: string, max: number) => ({ a: { v: a, k: ka }, b: { v: b, k: kb }, max });
/* the chunks still to take: the plan's own when none is taken yet, else the biggest cards that fit, then the rest in one */
const clRest = (left: number, d: number, ref: any) => {
  if (ref && clSum(ref) * d <= left) return ref.slice();
  const out: number[] = [];
  let L = left;
  for (const c of CL_CARDS) while (c * d <= L && out.length < 6) { out.push(c); L -= c * d; }
  const k = Math.floor(L / d);
  if (k > 0) out.push(k);
  return out;
};
const clInit = (it: any) => {
  const kind = it.kind || "climb", n = it.n || 75, d = it.d || 16, steps = clSteps(n, d);
  const s: any = { kind, n, d, unit: it.unit || null, steps, top: 1, cl: 1, big: null, fit: null, fp: 0, kt: [], trial: null,
    cmp: null, check: false, lane: [], laneA: it.laneA || [], sumTaken: false, sumEach: false, refuse: null, anyOpen: false, touched: false,
    typing: null, mine: null, anyV: "", anyStale: false, opened: -1 };
  if (kind === "left") { s.fp = 1; s.kt = [it.q]; s.top = it.q; s.cl = it.q; }
  if (kind === "frame" && it.from) {
    s.fp = it.from;
    s.kt = steps.map((st: any) => st.q).slice(0, Math.floor((it.from + 2) / 3));
    s.top = Math.min(9, Math.max(1, ...s.kt) + 1);
    s.cl = s.kt[s.kt.length - 1] || 1;
  }
  return s;
};

/* The numbers, rows, sizes and targets the working area needs (they go into the sidecar too). */
const MODEL = { ladderRungs: 9, chunkCards: CL_CARDS, typedChunkCard: true,
  frame: "long division; what is left is written at every step before the next digit comes down",
  colours: { dividend: CONTENT.hundred, divisor: CONTENT.ten, quotient: CONTENT.one, multiple: CONTENT.bead, leftover: CONTENT.pointer, quotientZero: CL_INK.zero } };

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* judge: is this value right for this item? (numbers compare as numbers) */
const judge = (item: any, v: any) => {
  if (item.parts) return judgeSlotParts(item, v);
  if (typeof item.answer === "number") return leadNumber(v) === item.answer;
  return String(v).trim().toLowerCase() === String(item.answer).trim().toLowerCase();
};
/* oracle: every answer re-derived by counting the divisor up, one at a time (no code shared with
   judge, the frame or the bar) */
const oracle = () => PHASES.every((p: any) => p.items.every((it: any) => {
  let s = 0, k = 0;
  while (s + it.d <= it.n) { s += it.d; k += 1; }
  const r = it.n - s, add = (a: number[]) => a.reduce((x, y) => x + y, 0);
  if (it.kind === "climb") return it.parts ? it.answer[0] === k && it.answer[1] === r : it.answer === k;
  if (it.kind === "frame") return it.answer[0] === k && it.answer[1] === r;
  if (it.kind === "left") return it.answer === it.n - it.d * it.q && it.answer >= 0 && it.answer < it.d;
  if (it.kind === "chunks") return r === 0 && it.answer === k && add(it.ref) === k;
  if (it.kind === "lanes") return r === 0 && it.answer === k && add(it.ref) === k && add(it.laneA) === k && it.ref.join() !== it.laneA.join();
  return false;
}));
/* the misconception of each kind; judge must reject it */
const nearMiss = (item: any) => {
  if (item.parts) return [item.answer[0] - 1, item.answer[1] + item.d];   /* stopped one multiple early: what is left is not smaller than the divisor */
  if (item.kind === "climb") return item.answer - 1;                        /* stopped at the rung that looked near enough */
  if (item.kind === "left") return 0;                                       /* skipped the leftover */
  if (item.kind === "chunks") return item.n;                                /* added the amounts taken away, not the chunk sizes */
  if (item.kind === "lanes") return item.answer - item.ref[item.ref.length - 1]; /* stopped before the last chunk */
  return typeof item.answer === "number" ? item.answer + 1 : "~";
};
/* the forms of an answer that no question, hint or ladder line may print */
const answerForms = (item: any) => (item.parts ? item.answer.filter((x: number) => x >= 10).flatMap((x: number) => [String(x), indian(x), words(x)])
  : typeof item.answer === "number" ? [String(item.answer), indian(item.answer), words(item.answer)] : [String(item.answer)]);
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => item.answer;
/* numbers from 1,000 in the slot take their commas */
const format = (v: any) => (/^[1-9]\d{3,8}$/.test(String(v ?? "")) ? indian(Number(v)) : String(v ?? ""));

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => (T.state().stage === "demo" ? HOOK.demo && HOOK.demo() : T.submit(item.answer));
/* the agent answers every item as typed (the frame items' quotient and remainder go in the slot's boxes) */
const answer = (item: any, v: any) => undefined;
/* the agent's check() before Enter; undefined = press Enter */
const check = () => (HOOK.check ? HOOK.check() : undefined);

/* a tap target that holds the pad once opened: while it holds it (`holding`), Enter passes to the
   window, so the runtime hands it to the capture fn (no keyboard trap, as the runtime's answer boxes) */
function ClHit({ id, x, y, w, h, onPress, label, holding }: any) {
  const p = usePress(onPress);
  const keys = (e: any) => { if (e.key === "Enter" && holding) return; p.keys(e); };
  return (
    <rect className="c4-hit" data-control={id} role="button" tabIndex={0} aria-label={label || id}
      x={x} y={y} width={w} height={h} fill="transparent" {...p.bind()} onKeyDown={keys} />
  );
}

/* ── the working area: 1086 x 528, origin at its top-left ──────────────────────────────────── */
const CL_CSS = `
.cl-move{transition:transform 300ms cubic-bezier(.3,.7,.25,1)}
.cl-grab{cursor:grab}
@media (prefers-reduced-motion:reduce){.cl-move{transition:none}}
`;

function Work({ item, index, stage, wrong, typed, captured, api, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  /* a count with its place word in each language: "1 ten", "3 दहाई", "3 દશક" */
  const plIn = (lg: string, v: number, name: string) => clIn(lg, clPlural(v, name));
  const tl = useTimeline();
  const free = stage === "free";
  const [S, setS] = useState<any>(() => clInit(item || {}));
  const SR = useRef<any>(S);
  const put = (p: any) => {
    const cur = SR.current;
    SR.current = { ...cur, ...(typeof p === "function" ? p(cur) : p) };
    setS(SR.current);
  };
  const setupFor = useRef(-1);
  const busy = tl.busy;
  const LIT = shade(C.accent, 0.12);
  const quiet = mix(C.ink, C.panel, 0.5);
  const say = (line: any) => api.say(line);   /* a line built from numbers is a Spoken object { en, hi, gu } */
  const tick = () => api.sfx.tick();

  /* the pad lent to the frame's dashed box (api.capture): a stable key handler that calls the latest one */
  const keyRef = useRef<any>(null);
  const onKey = useCallback((k: string) => { if (keyRef.current) keyRef.current(k); }, []);
  /* the runtime takes the pad back by itself (a tap on an answer box, the next question, a phase change):
     `captured` says so, and a half-typed box then empties again */
  const held = !!captured;
  useEffect(() => {
    if (held) return;
    if (SR.current.typing) put({ typing: null });
    if (SR.current.anyOpen) put({ anyOpen: false, anyV: "", anyStale: false });
  }, [held]);

  const reset = (it: any) => {
    tl.stop();
    api.capture(null);
    const s = clInit(it || {});
    SR.current = s;
    setS(s);
    api.lock(false);
  };
  useEffect(() => {
    if (stage === "ask" && setupFor.current !== index) { setupFor.current = index; reset(item); }
  }, [stage, index]);
  /* free play (the plan's freePlay): any division on the ladder and the frame, nothing to get right */
  useEffect(() => {
    if (!free) return;
    setupFor.current = -2;
    reset({ kind: "free", n: 1174, d: 18 });
  }, [free]);

  const kind = S.kind;
  const ladderKinds = kind === "climb" || kind === "left" || kind === "frame" || kind === "free";
  const laneKinds = kind === "chunks" || kind === "lanes";
  const open = (stage === "ask" || free) && !busy;
  const ladderLive = open && ladderKinds;
  const frameLive = open && (kind === "frame" || kind === "free");
  const act = kind === "frame" || kind === "free" ? clAct(S) : null;
  const laneLeft = S.n - S.d * clSum(S.lane);
  const lanesLive = open && laneKinds && laneLeft >= S.d;
  const setK = (arr: any[], s: number, v: any) => { const a = arr.slice(); a[s] = v; return a; };
  const qrOf = (s: any) => [clQuot(s.steps), s.steps[s.steps.length - 1].left];

  /* ── the ladder: the climber writes each rung as it reaches it ── */
  /* a why-picture (bars laid side by side, a rung tried) stays until the child acts again: no timer, so
     it reads the same with or without reduced motion */
  const calm = () => { const c = SR.current; if (c.cmp || c.trial || c.refuse) put({ cmp: null, trial: null, refuse: null }); };
  const moveTo = (k0: number) => {
    calm();
    const s = SR.current, k = Math.min(9, Math.max(1, Math.round(k0)));
    const fresh = k > s.top;
    put({ cl: k, top: Math.max(s.top, k), touched: true });
    tick();
    if (fresh) say({ en: `${s.d} times ${k} is ${clNum(k * s.d)}.`, hi: `${s.d} गुणा ${k} बराबर ${clNum(k * s.d)}।`, gu: `${s.d} ગુણ્યા ${k} બરાબર ${clNum(k * s.d)}.` });
  };
  const climb = () => { if (!ladderLive) return; const s = SR.current; moveTo(s.cl >= 9 ? 1 : s.cl + 1); };

  /* ── the frame: take a rung, write what is left, bring the next digit down ── */
  const finishFrame = () => {
    const s = SR.current, [q, r] = qrOf(s);
    if (s.kind === "free") { put({ check: true }); say({ en: `${q} times ${s.d}, add ${r}, makes ${clNum(s.n)}.`,
      hi: `${q} गुणा ${s.d}, फिर ${r} जोड़ो, तो ${clNum(s.n)} बनता है।`, gu: `${q} ગુણ્યા ${s.d}, વત્તા ${r}, બરાબર ${clNum(s.n)}.` }); return; }
    if (stage === "ask") tl.run([[900, () => api.submit([q, r])]]);
  };
  const doTake = () => {
    if (!frameLive || !clAct(SR.current) || clAct(SR.current).kind !== "take") return;
    calm();
    const s = SR.current, a: any = clAct(s);
    const st = s.steps[a.s], k = s.cl, prod = k * s.d;
    if (st.work < s.d) {                       /* nothing fits: a grey 0 goes in the quotient, and all of it is left */
      put({ kt: setK(s.kt, a.s, 0), fp: s.fp + 1, cmp: null, touched: true });
      tick();
      say({ en: `${s.d} does not go into ${st.work}. Write 0.`, hi: `${st.work} में ${s.d} नहीं जाता। 0 लिखो।`, gu: `${st.work} માં ${s.d} જતો નથી. 0 લખો.` });
      return;
    }
    if (prod > st.work) {                      /* too big: laid against the number, it springs back */
      put({ trial: { s: a.s, k, what: "prod" }, cmp: clCmp(st.work, "work", prod, "rung", 10 * s.d) });
      say({ en: `${clNum(prod)} is more than ${clNum(st.work)}.`, hi: `${clNum(prod)}, ${clNum(st.work)} से ज़्यादा है।`, gu: `${clNum(prod)}, ${clNum(st.work)} કરતાં વધારે છે.` });
      return;
    }
    put({ kt: setK(s.kt, a.s, k), fp: s.fp + 1, cmp: null, touched: true });
    tick();
    say({ en: `${s.d} times ${k} is ${clNum(prod)}.`, hi: `${s.d} गुणा ${k} बराबर ${clNum(prod)}।`, gu: `${s.d} ગુણ્યા ${k} બરાબર ${clNum(prod)}.` });
  };
  /* the dashed box under a step: a tap lends it the pad, and the child types what is left */
  const leftAct = (s: any) => (s.kind === "left" ? (s.fp < 2 ? { kind: "left", s: 0 } : null) : clAct(s));
  const leftLive = (stage === "ask" && !busy && kind === "left") || frameLive;
  const doLeft = () => {
    const s = SR.current, a = leftAct(s);
    if (!leftLive || !a || a.kind !== "left") return;
    calm();
    const st = s.steps[a.s], k = s.kt[a.s];
    const again = !!(s.typing && s.typing.s === a.s);
    put({ typing: again ? s.typing : { s: a.s, v: "" }, touched: true, opened: a.s });
    api.capture(onKey);
    if (!again) say({ en: `${clNum(st.work)} take away ${clNum(k * s.d)}. Type what is left, then press Enter.`,
      hi: `${clNum(st.work)} में से ${clNum(k * s.d)} घटाओ। जो बचा वह लिखो, फिर एंटर दबाओ।`, gu: `${clNum(st.work)} માંથી ${clNum(k * s.d)} બાદ કરો. જે વધ્યું તે લખો, પછી એન્ટર દબાવો.` });
  };
  /* Enter in the box: what is left is checked by adding it back; it must also be smaller than the divisor */
  const enterLeft = () => {
    const s = SR.current, t = s.typing;
    if (!t) return;
    if (t.v === "") { api.say("Type what is left, then press Enter."); return; }
    const x = Number(t.v), st = s.steps[t.s], k = s.kt[t.s], prod = k * s.d, left = st.work - prod;
    if (s.kind === "left") { api.capture(null); put({ typing: null }); api.submit(x); return; }   /* the question's own answer */
    if (x !== left) {                          /* not what is left: the rung and the child's number, stacked against the number */
      put({ typing: { ...t, stale: true }, cmp: { a: { v: st.work, k: "work" }, b: { v: prod + x, k: "total", stack: [prod, x] }, max: Math.max(st.work, prod + x) * 1.15 } });
      say({ en: `${clNum(prod)} add ${x} makes ${clNum(prod + x)}, not ${clNum(st.work)}.`,
        hi: `${clNum(prod)} में ${x} जोड़ने पर ${clNum(prod + x)} बनता है, ${clNum(st.work)} नहीं।`, gu: `${clNum(prod)} વત્તા ${x} બરાબર ${clNum(prod + x)}, ${clNum(st.work)} નહીં.` });
      return;
    }
    if (left >= s.d) {                         /* right, but not smaller than the divisor: the rung was too small */
      const up = Math.min(9, k + 1);
      api.capture(null);
      /* the tried rung and its leftover stay drawn, laid against the divisor, until the next act; the
         step goes back to taking a rung, with the climber on the rung that still fits */
      put((c: any) => ({ typing: null, trial: { s: t.s, k, what: "left", left }, cmp: clCmp(left, "left", s.d, "divisor", Math.max(2 * s.d, left) * 1.15),
        kt: setK(c.kt, t.s, undefined), fp: c.fp - 1, cl: up, top: Math.max(c.top, up) }));
      say({ en: `${left} left is too many. One more ${s.d} fits.`, hi: `${left} बचे, यह बहुत ज़्यादा है। एक और ${s.d} समाता है।`, gu: `${left} વધ્યા, એ બહુ વધારે છે. એક વધુ ${s.d} સમાય છે.` });
      return;
    }
    api.capture(null);
    put({ typing: null, fp: s.fp + 1 });
    tick();
    /* the questions' own frames (5,948 ÷ 14 and 3,875 ÷ 17) say one of these five, each a literal so the voice
       bake records it; free play's random divisions fall through to a Spoken object (silent in hi and gu) */
    const leftTxt = `${left} ${clPlural(left, clPlace(s, st))} left.`;
    switch (leftTxt) {
      case "6 tens left.": api.say("6 tens left."); break;
      case "12 ones left.": api.say("12 ones left."); break;
      case "4 hundreds left.": api.say("4 hundreds left."); break;
      case "13 tens left.": api.say("13 tens left."); break;
      case "16 ones left.": api.say("16 ones left."); break;
      default: say({ en: leftTxt, hi: `${left} ${plIn("hi", left, clPlace(s, st))} बचे।`, gu: `${left} ${plIn("gu", left, clPlace(s, st))} વધ્યા.` });
    }
    if (SR.current.fp >= clTotal(SR.current)) finishFrame();
  };
  keyRef.current = (k: string) => {
    if (stage !== "ask" && stage !== "free") return;
    if (SR.current.typing) leftKey(k);
    else if (SR.current.anyOpen) anyKey(k);
  };
  const leftKey = (k: string) => {
    const s = SR.current, t = s.typing;
    if (!t) return;
    /* after a refused number, it stays (unmarked) beside its why-picture; the next key starts afresh */
    if (/^\d$/.test(k)) { put({ cmp: null, typing: { s: t.s, v: t.stale || t.v === "0" ? k : t.v.length < 3 ? t.v + k : t.v } }); return; }
    if (k === "back") { put({ cmp: null, typing: { s: t.s, v: t.stale ? "" : t.v.slice(0, -1) } }); return; }
    if (k === "clear") { put({ cmp: null, typing: { s: t.s, v: "" } }); return; }
    if (k === "enter") enterLeft();
  };
  const doDown = () => {
    if (!frameLive || !clAct(SR.current) || clAct(SR.current).kind !== "down") return;
    calm();
    const s = SR.current, a: any = clAct(s);
    const st = s.steps[a.s], nx = s.steps[a.s + 1], dig = Number(String(s.n)[nx.end]);
    const p1 = clPlace(s, st), p2 = clPlace(s, nx);
    put({ fp: s.fp + 1, touched: true });
    tick();
    const downTxt = `${st.left} ${clPlural(st.left, p1)} are ${st.left * 10} ${p2}. With ${dig} more, that makes ${nx.work} ${clPlural(nx.work, p2)}.`;
    if (st.left > 0) switch (downTxt) {   /* the questions' own frames: literals, so the voice bake records them */
      case "6 tens are 60 ones. With 8 more, that makes 68 ones.": api.say("6 tens are 60 ones. With 8 more, that makes 68 ones."); break;
      case "4 hundreds are 40 tens. With 7 more, that makes 47 tens.": api.say("4 hundreds are 40 tens. With 7 more, that makes 47 tens."); break;
      case "13 tens are 130 ones. With 5 more, that makes 135 ones.": api.say("13 tens are 130 ones. With 5 more, that makes 135 ones."); break;
      default: say({ en: downTxt,
        hi: `${st.left} ${plIn("hi", st.left, p1)} यानी ${st.left * 10} ${clIn("hi", p2)}। ${dig} और मिलाकर ${nx.work} ${plIn("hi", nx.work, p2)} बनते हैं।`,
        gu: `${st.left} ${plIn("gu", st.left, p1)} એટલે ${st.left * 10} ${clIn("gu", p2)}. ${dig} વધુ ઉમેરતાં ${nx.work} ${plIn("gu", nx.work, p2)} થાય.` });
    }
    else say({ en: `Nothing is left, so the next number is ${nx.work} ${clPlural(nx.work, p2)}.`,
      hi: `कुछ नहीं बचा, इसलिए अगली संख्या ${nx.work} ${plIn("hi", nx.work, p2)} है।`, gu: `કંઈ વધ્યું નથી, તેથી આગળની સંખ્યા ${nx.work} ${plIn("gu", nx.work, p2)} છે.` });
  };
  const newDivision = () => {
    if (!free) return;
    const nn = 1000 + Math.floor(Math.random() * 9000), dd = 11 + Math.floor(Math.random() * 89);
    reset({ kind: "free", n: nn, d: dd });
    say({ en: `Divide ${clNum(nn)} by ${dd}.`, hi: `${clNum(nn)} को ${dd} से भाग दो।`, gu: `${clNum(nn)} ને ${dd} વડે ભાગો.` });
  };

  /* ── the bar: chunk cards come off it ── */
  const takeChunk = (c: number) => {
    if (!lanesLive) return false;
    calm();
    const s = SR.current, left = s.n - s.d * clSum(s.lane);
    if (!(c > 0) || left < s.d) return false;
    if (s.lane.length >= 9) { api.say("That is a lot of chunks. Try a bigger one."); return false; }
    const amt = c * s.d;
    if (amt > left) {                          /* laid against what is left, it runs past its end and goes back */
      put({ refuse: { amt, c } });
      say({ en: `${clNum(amt)} is more than the ${clNum(left)} left.`, hi: `${clNum(amt)}, बचे हुए ${clNum(left)} से ज़्यादा है।`, gu: `${clNum(amt)}, વધેલા ${clNum(left)} કરતાં વધારે છે.` });
      return false;
    }
    const nl = left - amt;
    if (s.anyOpen) api.capture(null);
    put({ lane: [...s.lane, c], touched: true, anyOpen: false, anyV: "", anyStale: false, refuse: null });
    tick();
    if (nl < s.d && nl === 0) api.say("Nothing is left. Add up the chunk sizes.");
    else if (nl < s.d) say({ en: `Only ${nl} left, less than ${s.d}. Add up the chunk sizes.`, hi: `सिर्फ़ ${nl} बचे, ${s.d} से कम। टुकड़ों के आकार जोड़ो।`, gu: `ફક્ત ${nl} વધ્યા, ${s.d} કરતાં ઓછા. ટુકડાનાં માપ ઉમેરો.` });
    else say({ en: `${c} each takes away ${clNum(amt)}. ${clNum(nl)} left.`, hi: `हर एक को ${c}, यानी ${clNum(amt)} घटे। ${clNum(nl)} बचे।`, gu: `દરેકને ${c}, એટલે ${clNum(amt)} બાદ થયા. ${clNum(nl)} વધ્યા.` });
    return true;
  };
  /* the ? card works as the frame's box: a tap lends it the pad, the child types how many for each,
     and Enter (or a tap on the card) takes that chunk; digits typed before the tap stay the answer */
  const anyAct = (moved: boolean) => {
    const s = SR.current;
    if (!lanesLive) return;
    if (!s.anyOpen) {
      if (moved) return;
      calm();
      put({ anyOpen: true, anyV: "", anyStale: false, touched: true });
      api.capture(onKey);
      api.say("Type how many for each, then press Enter.");
      return;
    }
    takeAny(true);
  };
  const takeAny = (fromTap: boolean) => {
    const s = SR.current, v = s.anyV ? Number(s.anyV) : 0;
    if (!v) {
      if (fromTap) { api.capture(null); put({ anyOpen: false, anyV: "", anyStale: false }); }   /* an empty card closes */
      else api.say("Type how many for each, then press Enter.");
      return;
    }
    if (!takeChunk(v)) put({ anyStale: true });   /* refused: the number stays, the next key starts afresh */
  };
  const anyKey = (k: string) => {
    const s = SR.current;
    if (/^\d$/.test(k)) { calm(); put({ anyV: s.anyStale || s.anyV === "0" ? k : s.anyV.length < 3 ? s.anyV + k : s.anyV, anyStale: false }); return; }
    if (k === "back") { calm(); put({ anyV: s.anyStale ? "" : s.anyV.slice(0, -1), anyStale: false }); return; }
    if (k === "clear") { calm(); put({ anyV: "", anyStale: false }); return; }
    if (k === "enter") takeAny(false);
  };

  const drag = useDrag((pay: any, p: any, moved: boolean) => {
    if (!pay) return;
    if (pay.src === "climber") {
      if (!ladderLive) return;
      if (!moved) { climb(); return; }
      if ((kind === "frame" || kind === "free") && p.x < 336 && p.y > -20 && p.y < 520) { doTake(); return; }
      if (p.x > 640 && p.x < 1010) moveTo(Math.round((CL_LAD.foot - p.y) / CL_LAD.pitch) + 1);
      return;
    }
    if (pay.src === "card") {
      if (!lanesLive) return;
      const G = kind === "lanes" ? CL_P4 : CL_P3;
      const over = p.x > G.bar - 80 && p.x < G.bar + G.bw + 60 && p.y > 10 && p.y < 520;
      if (moved && !over) return;
      if (pay.c === "any") anyAct(moved);
      else takeChunk(pay.c);
    }
  });

  /* both cells (the frame's box, the ? card) take their Enter through api.capture */
  api.onEnter(null);

  /* ── motions: the climb shown, the frame worked, the chunks taken ── */
  const revealClimb = (s0: any, mv: any) => {
    const st = s0.steps[0], d = s0.d, q = st.q, big = Math.min(9, q + 1), max = 10 * d, slow = mv !== null;
    const out: any[] = [[slow ? 300 : 60, () => put({ fp: 0, kt: [], big: null, fit: null, check: false, cmp: null, trial: null })]];
    let from = s0.top + 1;
    if (slow) {
      const qc = leadNumber(slotPartsOf(mv, 2)[0]);
      from = 1;
      if (qc !== null && qc >= 1 && qc < q) {
        /* the child's rung: what is left under it is not smaller than the divisor, so the climb goes on */
        const lc = st.work - qc * d;
        out.push([700, () => put((c: any) => ({ cl: qc, top: Math.max(c.top, qc), kt: [qc], fp: 1 }))]);
        out.push([900, () => put({ fp: 2, cmp: clCmp(lc, "left", d, "divisor", Math.max(2 * d, lc) * 1.15) })]);
        out.push([1700, () => put({ fp: 0, kt: [], cmp: null })]);
        from = qc + 1;
      } else if (qc !== null && qc > q && qc <= 9) {
        /* the child's rung is too big: laid against the number, it runs past it */
        out.push([700, () => put((c: any) => ({ cl: qc, top: Math.max(c.top, qc), cmp: clCmp(st.work, "work", qc * d, "rung", max) }))]);
        out.push([1600, () => put({ cmp: null })]);
      }
    }
    for (let k = from; k <= big; k++) {
      const kk = k;
      out.push([slow ? 440 : 280, () => { put((c: any) => ({ cl: kk, top: Math.max(c.top, kk), cmp: clCmp(st.work, "work", kk * d, "rung", max) })); tick(); }]);
    }
    out.push([slow ? 800 : 650, () => put({ big: q < 9 ? big : null, cl: big, cmp: clCmp(st.work, "work", big * d, "rung", max) })]);
    out.push([slow ? 900 : 650, () => put({ fit: q, cl: q, cmp: clCmp(st.work, "work", q * d, "rung", max) })]);
    out.push([500, () => { put({ kt: [q], fp: 1 }); tick(); }]);
    out.push([450, () => put({ fp: 2, cmp: null })]);
    out.push([300, () => put({ check: true })]);
    return out;
  };
  const fastActs = (s0: any, ms: number) => {
    const out: any[] = [];
    for (let f = s0.fp; f < clTotal(s0); f++) {
      const ff = f, a = { kind: ["take", "left", "down"][f % 3], s: Math.floor(f / 3) }, st = s0.steps[a.s];
      out.push([ms, () => {
        if (a.kind === "take") put((c: any) => ({ kt: setK(c.kt, a.s, st.q), cl: Math.max(1, st.q), top: Math.max(c.top, Math.min(9, st.q + 1)), fp: ff + 1, trial: null, cmp: null }));
        else put({ fp: ff + 1 });
        tick();
      }]);
    }
    return out;
  };
  const restChunks = (s0: any, ms: number) => {
    const left = s0.n - s0.d * clSum(s0.lane);
    const ref = s0.lane.length ? null : (item && item.ref) || null;
    return clRest(left, s0.d, ref).map((c: number) => [ms, () => { put((x: any) => ({ lane: [...x.lane, c] })); tick(); }]);
  };

  /* the win: the maths moving to the answer the child gave */
  useEffect(() => {
    if (stage !== "win") return;
    api.capture(null);
    put({ typing: null, trial: null, cmp: null, refuse: null });
    const s = SR.current;
    if (s.check || s.sumEach) return;          /* already drawn by the traceback */
    if (s.kind === "climb") tl.run(revealClimb(s, null));
    else if (s.kind === "left") tl.run([[60, () => { put({ fp: 2, cmp: null }); tick(); }], [450, () => put({ check: true })]]);
    else if (s.kind === "frame") tl.run([...fastActs(s, 240), [260, () => put({ check: true, cmp: null, trial: null })]]);
    else if (s.kind === "chunks" || s.kind === "lanes") tl.run([[20, () => put({ anyOpen: false, refuse: null })], ...restChunks(s, 360), [360, () => put({ sumTaken: true, sumEach: true })]]);
  }, [stage]);

  /* the traceback: the mathematics redrawn in steps, ending on the whole right answer; nothing
     marked, nothing cleared from the slot */
  useEffect(() => {
    if (!wrong || stage !== "ask") return;
    api.lock(true);
    api.capture(null);
    put({ typing: null, trial: null, cmp: null, refuse: null });
    const s = SR.current, done = () => api.lock(false);
    if (s.kind === "climb") tl.run(revealClimb(s, wrong.value), done);
    else if (s.kind === "left") {
      const st = s.steps[0], k = s.kt[0];
      tl.run([[1700, () => put({ fp: 1, check: false, cmp: clCmp(st.work, "work", k * s.d, "rung", 10 * s.d) })],
        [1000, () => { put({ fp: 2 }); tick(); }], [300, () => put({ cmp: null, check: true })]], done);
    } else if (s.kind === "frame") {
      /* the child's quotient times the divisor, add the child's remainder, laid against the dividend (or,
         when that makes the dividend, the remainder against the divisor); then the frame is worked again
         and ends on the true check with the child's own beside it */
      const ps = slotPartsOf(wrong.value, 2), mq = leadNumber(ps[0]), mr = leadNumber(ps[1]);
      const mine = mq !== null && mr !== null ? { q: mq, r: mr } : null;
      const why: any[] = [];
      if (mine) {
        const tot = mine.q * s.d + mine.r;
        if (tot !== s.n) why.push([2600, () => put({ cmp: clCmp(s.n, "work", tot, "total", Math.max(s.n, tot) * 1.15) })]);
        else why.push([2600, () => put({ cmp: clCmp(mine.r, "left", s.d, "divisor", Math.max(2 * s.d, mine.r) * 1.15) })]);
        why.push([300, () => put({ cmp: null })]);
      }
      tl.run([[400, () => put({ fp: 0, kt: [], trial: null, cmp: null, check: false, cl: 1, mine })], ...why, ...fastActs({ ...s, fp: 0 }, 460),
        [400, () => put({ check: true })]], done);
    } else if (s.kind === "chunks") {
      tl.run([[200, () => put({ anyOpen: false, refuse: null, sumTaken: false, sumEach: false })], ...restChunks(s, 520),
        [700, () => put({ sumTaken: true })], [1100, () => put({ sumEach: true })], [300, () => {}]], done);
    } else if (s.kind === "lanes") {
      tl.run([[200, () => put({ anyOpen: false, refuse: null, sumTaken: false, sumEach: false })], ...restChunks(s, 520),
        [700, () => put({ sumEach: true })], [300, () => {}]], done);
    } else done();
  }, [wrong]);

  /* what the host and the agent read back (toolApi.getState) */
  api.share({
    dividend: S.n, divisor: S.d, rungs: S.top, climber: S.cl, frameStep: act ? act.s + 1 : null, frameAct: act ? act.kind : null,
    leftAtStep: S.steps.filter((_: any, s: number) => S.fp > 3 * s + 1 && S.kt[s] !== undefined).map((st: any) => st.left),
    leftTyping: S.typing ? S.typing.v : null,
    chunks: kind === "lanes" ? S.laneA : S.lane, secondChunks: kind === "lanes" ? S.lane : null, chunkCardOpen: S.anyOpen,
    quotient: (stage === "win" || stage === "idle") && item ? item.answer : null,
  });

  /* ── drawing ── */
  const F = kind === "climb" ? CL_FRB : CL_FR;
  const digs = String(S.n).split("");
  const colX = (j: number) => F.x0 + j * F.cw;
  const rowP = (s: number) => F.yD + F.row * (2 * s + 1);
  const rowL = (s: number) => F.yD + F.row * (2 * s + 2);
  const cells = (str: string, end: number, y: number, fill: string, key: string) => str.split("").map((ch: string, i: number) => (
    <text key={key + i} x={colX(end - (str.length - 1 - i))} y={y} textAnchor="middle" fontSize={F.fs} fontWeight={700} fill={fill}>{ch}</text>
  ));
  const trial = S.trial;
  const last = S.steps.length - 1;
  const curStep = kind === "climb" || kind === "left" ? 0 : act ? act.s : null;
  const cz = CL_CZ;

  const qCell = (s: number, lit: boolean) => {
    const st = S.steps[s];
    return <rect key={"qc" + s} x={colX(st.end) - F.cw / 2 + 4} y={F.yQ - F.fs * 0.8} width={F.cw - 8} height={F.fs * 0.98} rx={8}
      fill="#FFFFFF" stroke={lit ? LIT : C.rule} strokeWidth={lit ? 4 : 2.5} strokeDasharray="7 6" />;
  };
  const slotW = (s: number) => Math.max(2, String(S.steps[s].work).length) * F.cw;
  const lSlot = (s: number, lit: boolean) => {
    const st = S.steps[s], w = slotW(s);
    return <rect key={"ls" + s} x={colX(st.end) + F.cw / 2 - w + 3} y={rowL(s) - F.fs * 0.8} width={w - 6} height={F.fs * 0.98} rx={8}
      fill="#FFFFFF" stroke={lit ? LIT : C.rule} strokeWidth={lit ? 4 : 2.5} strokeDasharray="7 6" />;
  };
  const arrowEnd = (s: number) => rowL(s) - F.fs * 0.9;
  const arrow = (s: number, lit: boolean) => {
    const st = S.steps[s], x = colX(st.end + 1), y0 = F.yD + 12, y1 = arrowEnd(s), c = lit ? LIT : C.rule;
    return (
      <g key={"ar" + s}>
        <line x1={x} y1={y0} x2={x} y2={y1 - 6} stroke={c} strokeWidth={lit ? 5 : 3} strokeDasharray={lit ? undefined : "6 6"} strokeLinecap="round" />
        <path d={`M ${x - 11} ${y1 - 13} L ${x} ${y1} L ${x + 11} ${y1 - 13}`} fill="none" stroke={c} strokeWidth={lit ? 5 : 3} strokeLinecap="round" strokeLinejoin="round" />
      </g>
    );
  };

  /* the frame's targets: the one act that is next is lit; the ones after it wait unlit */
  const targets: any[] = [], hits: any[] = [];
  let invite: any = null;
  const typingAt = S.typing ? S.typing.s : -1;
  const leftHit = (s: number) => {
    const st = S.steps[s], w = Math.max(slotW(s), 72);
    hits.push(<ClHit key="h-left" id="write-left" label={tx("Type what is left")} x={colX(st.end) + F.cw / 2 - w} y={rowL(s) - F.fs * 0.32 - 36} w={w} h={72}
      onPress={doLeft} holding={held && typingAt === s} />);
    if (typingAt !== s && S.opened !== s) invite = { x: colX(st.end) + F.cw / 2 - slotW(s) / 2, y: rowL(s) - F.fs * 0.32, r: 36 };
  };
  if (kind === "climb" && !(S.fp > 0)) targets.push(qCell(0, false));
  if (kind === "left" && S.fp < 2) {
    targets.push(lSlot(0, stage === "ask"));
    if (leftLive) leftHit(0);
  }
  if (act && (kind === "frame" || kind === "free")) {
    const st = S.steps[act.s], s = act.s;
    if (act.kind === "take") {
      targets.push(qCell(s, frameLive));
      targets.push(lSlot(s, false));
      if (s < last) targets.push(arrow(s, false));
      if (frameLive) {
        hits.push(<Hit key="h-take" id="take-rung" label={tx("Take the climber's rung")} x={colX(st.end) - 36} y={F.yQ - F.fs * 0.32 - 36} w={72} h={72} onPress={doTake} />);
        invite = { x: colX(st.end), y: F.yQ - F.fs * 0.32, r: 34 };
      }
    } else if (act.kind === "left") {
      if (!(trial && trial.what === "left")) targets.push(lSlot(s, frameLive));
      if (s < last) targets.push(arrow(s, false));
      if (frameLive) leftHit(s);
    } else {
      targets.push(arrow(s, frameLive));
      if (frameLive) {
        const y0 = F.yD + 4, h = Math.max(72, arrowEnd(s) - y0);
        hits.push(<Hit key="h-down" id="bring-down" label={tx("Bring the next digit down")} x={colX(st.end + 1) - 36} y={y0} w={72} h={h} onPress={doDown} />);
        invite = { x: colX(st.end + 1), y: y0 + h / 2, r: 34 };
      }
    }
  }
  if (!invite && stage === "ask" && !busy && kind === "climb" && !S.touched) invite = { x: CL_LAD.cx, y: clRungY(S.cl), r: 34 };

  const frameG = ladderKinds ? (
    <g>
      {curStep !== null && (() => {
        const st = S.steps[curStep], len = String(st.work).length, y = curStep === 0 ? F.yD : rowL(curStep - 1);
        return <rect x={colX(st.end - len + 1) - F.cw / 2 + 3} y={y - F.fs * 0.8} width={len * F.cw - 6} height={F.fs * 0.98} rx={10} fill={tint(CONTENT.hundred, 0.86)} />;
      })()}
      {targets}
      <text x={F.divR} y={F.yD} textAnchor="end" fontSize={F.fs} fontWeight={700} fill={CL_INK.amber}>{S.d}</text>
      <path d={`M ${F.bx} ${F.yBar} C ${F.bx + 17} ${F.yBar + 22} ${F.bx + 17} ${F.yD - 8} ${F.bx} ${F.yD + 16}`} fill="none" stroke={CONTENT.line} strokeWidth={4} strokeLinecap="round" />
      <line x1={F.bx} y1={F.yBar} x2={colX(digs.length - 1) + F.cw / 2 + 6} y2={F.yBar} stroke={CONTENT.line} strokeWidth={4} strokeLinecap="round" />
      {digs.map((ch: string, j: number) => (
        <text key={"d" + j} x={colX(j)} y={F.yD} textAnchor="middle" fontSize={F.fs} fontWeight={700} fill={CL_INK.blue}>{ch}</text>
      ))}
      {digs.length >= 4 && (() => {
        const x = colX(digs.length - 4) + F.cw / 2, y = F.yD;
        return (
          <g>
            <circle cx={x} cy={y - 3} r={4} fill={CL_INK.blue} />
            <path d={`M ${x + 3.5} ${y - 2} C ${x + 4} ${y + 4} ${x + 1} ${y + 8} ${x - 3} ${y + 10}`} fill="none" stroke={CL_INK.blue} strokeWidth={3} strokeLinecap="round" />
          </g>
        );
      })()}
      {S.steps.map((st: any, s: number) => {
        const tr = trial && trial.s === s ? trial : null;
        const k = tr ? tr.k : S.kt[s];
        const has = k !== undefined && k !== null && (!!tr || S.fp > 3 * s);
        const g: any[] = [];
        if (has) {
          const prod = String(k * S.d), wlen = String(st.work).length, plen = prod.length;
          g.push(<text key="q" x={colX(st.end)} y={F.yQ} textAnchor="middle" fontSize={F.fs} fontWeight={700} fill={k === 0 ? CL_INK.zero : CL_INK.green}>{k}</text>);
          g.push(...cells(prod, st.end, rowP(s), k === 0 ? CL_INK.zero : CL_INK.rose, "p"));
          g.push(<text key="m" x={colX(st.end - plen + 1) - F.cw * 0.78} y={rowP(s)} textAnchor="middle" fontSize={F.fs} fontWeight={700} fill={C.ink}>−</text>);
          const c0 = st.end - Math.max(wlen, plen) + 1;
          g.push(<line key="u" x1={colX(c0) - F.cw / 2 + 2} y1={rowP(s) + F.under} x2={colX(st.end) + F.cw / 2 - 2} y2={rowP(s) + F.under} stroke={CONTENT.line} strokeWidth={3} strokeLinecap="round" />);
        }
        const lv = tr && tr.what === "left" ? tr.left : S.fp > 3 * s + 1 && S.kt[s] !== undefined && S.kt[s] !== null ? st.work - S.kt[s] * S.d : null;
        if (lv !== null) g.push(...cells(String(lv), st.end, rowL(s), CL_INK.verm, "l"));
        else if (typingAt === s) {
          /* what the child is typing into the box, and the box's own caret while it holds the pad */
          g.push(...cells(S.typing.v, st.end, rowL(s), CL_INK.verm, "t"));
          if (held) g.push(<rect key="caret" className="c4-caret" x={colX(st.end) + F.cw / 2 - 5} y={rowL(s) - F.fs * 0.74} width={4} height={F.fs * 0.8} rx={2} fill={C.accent} />);
        }
        if (S.fp > 3 * s + 2 && s < last) g.push(<text key="b" x={colX(st.end + 1)} y={rowL(s)} textAnchor="middle" fontSize={F.fs} fontWeight={700} fill={CL_INK.blue}>{digs[st.end + 1]}</text>);
        return <g key={"s" + s}>{g}</g>;
      })}
      {hits}
    </g>
  ) : null;

  /* the working number's tag, on its own row just right of the frame and in the same pale blue as its
     cells; at the end, the check (quotient times divisor, add the remainder, makes the dividend); after
     a miss on the whole division, the child's own check beside it */
  const [cq, cr] = kind === "left" ? [S.kt[0], S.steps[0].work - S.kt[0] * S.d] : qrOf(S);
  const checkLines = (q: number, r: number, y1: number, y2: number, fs: number, key: string) => (
    <g key={key}>
      <text x={cz.x} y={y1} fontSize={fs} fontWeight={700} fill={C.ink}><tspan fill={CL_INK.green}>{q}</tspan> × <tspan fill={CL_INK.amber}>{S.d}</tspan></text>
      <text x={cz.x} y={y2} fontSize={fs} fontWeight={700} fill={C.ink}>+ <tspan fill={CL_INK.verm}>{r}</tspan> = <tspan fill={q * S.d + r === S.n ? CL_INK.blue : C.ink}>{clNum(q * S.d + r)}</tspan></text>
    </g>
  );
  const mineG = ladderKinds && S.mine ? (S.check ? (
    <g>
      <text x={cz.x} y={190} fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("yours")}</text>
      {checkLines(S.mine.q, S.mine.r, 232, 276, T.label, "mine")}
    </g>
  ) : (
    <g>
      <text x={cz.x} y={24} fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("yours")}</text>
      {checkLines(S.mine.q, S.mine.r, 64, 108, T.label, "mine")}
    </g>
  )) : null;
  const tagStep = kind === "left" ? (S.fp < 2 ? 0 : null) : (kind === "frame" || kind === "free") && act ? act.s : null;
  const windowG = !ladderKinds ? null : S.check ? checkLines(cq, cr, 66, 124, T.speech, "check")
    : tagStep !== null && !S.cmp && !S.mine ? (() => {
      const st = S.steps[tagStep], y = tagStep === 0 ? F.yD : rowL(tagStep - 1), place = tx(clPlace(S, st)), num = clNum(st.work);
      const fx = colX(digs.length - 1) + F.cw / 2 + 8, w = (num.length + place.length + 1) * T.label * 0.58 + 26;
      return (
        <g>
          <line x1={fx} y1={y - F.fs * 0.3} x2={cz.x - 12} y2={y - F.fs * 0.3} stroke={tint(CONTENT.hundred, 0.55)} strokeWidth={3} strokeDasharray="4 5" />
          <rect x={cz.x - 12} y={y - 32} width={w} height={44} rx={12} fill={tint(CONTENT.hundred, 0.86)} />
          <text x={cz.x} y={y} fontSize={T.label} fontWeight={700} fill={CL_INK.blue}>{num}<tspan fontWeight={600} fill={C.ink}>{" " + place}</tspan></text>
        </g>
      );
    })() : null;

  /* two bars laid side by side: the longer runs past the dashed line */
  const cmpG = ladderKinds && S.cmp ? (() => {
    const c = S.cmp, hOf = (v: number) => Math.max(6, Math.min(cz.maxH + 24, (v / c.max) * cz.maxH));
    const ha = hOf(c.a.v), hb = hOf(c.b.v), pa = CL_PAINT[c.a.k], pb = CL_PAINT[c.b.k];
    return (
      <g pointerEvents="none">
        <rect x={cz.barA} y={cz.base - ha} width={cz.barW} height={ha} rx={8} fill={`url(#${pa[0]})`} stroke={(CL_INK as any)[pa[1]]} strokeWidth={2} />
        {c.b.stack ? (() => {
          /* the rung with the child's leftover on top of it: together they should make the number */
          const h0 = hOf(c.b.stack[0]), h1 = Math.max(0, hb - h0);
          return (
            <g>
              <rect x={cz.barB} y={cz.base - h0} width={cz.barW} height={h0} rx={8} fill="url(#gBead)" stroke={CL_INK.rose} strokeWidth={2} />
              {h1 > 0 && <rect x={cz.barB} y={cz.base - hb} width={cz.barW} height={h1} rx={6} fill="url(#gPointer)" stroke={CL_INK.verm} strokeWidth={2} />}
            </g>
          );
        })() : <rect x={cz.barB} y={cz.base - hb} width={cz.barW} height={hb} rx={8} fill={`url(#${pb[0]})`} stroke={(CL_INK as any)[pb[1]]} strokeWidth={2} />}
        <line x1={cz.barA - 12} y1={cz.base - ha} x2={cz.barB + cz.barW + 12} y2={cz.base - ha} stroke={C.ink} strokeWidth={2.5} strokeDasharray="8 7" />
        <line x1={cz.barA - 18} y1={cz.base} x2={cz.barB + cz.barW + 18} y2={cz.base} stroke={CONTENT.line} strokeWidth={3} strokeLinecap="round" />
        <text x={cz.barA + cz.barW / 2} y={cz.base - ha - 12} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={(CL_INK as any)[pa[1]]}>{clNum(c.a.v)}</text>
        <text x={cz.barB + cz.barW / 2} y={cz.base - hb - 12} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={(CL_INK as any)[pb[1]]}>{clNum(c.b.v)}</text>
      </g>
    );
  })() : null;

  /* the ladder of multiples and its climber */
  const clDrag = drag.drag && drag.drag.payload && drag.drag.payload.src === "climber" && drag.drag.moved ? drag.drag : null;
  const ladderG = ladderKinds ? (
    <g>
      <line x1={CL_LAD.railL} y1={clRungY(9) - 34} x2={CL_LAD.railL} y2={clRungY(1) + 30} stroke={CONTENT.line} strokeWidth={4} strokeLinecap="round" />
      <line x1={CL_LAD.railR} y1={clRungY(9) - 34} x2={CL_LAD.railR} y2={clRungY(1) + 30} stroke={CONTENT.line} strokeWidth={4} strokeLinecap="round" />
      {Array.from({ length: 9 }).map((_, i) => {
        const k = i + 1, y = clRungY(k), on = k <= S.top, big = S.big === k, fit = S.fit === k;
        return (
          <g key={"r" + k}>
            <rect x={CL_LAD.px} y={y - CL_LAD.ph / 2} width={CL_LAD.pw} height={CL_LAD.ph} rx={10} fill={on ? tint(CONTENT.bead, 0.86) : "#FFFFFF"}
              stroke={big ? CONTENT.line : fit ? CONTENT.one : on ? CONTENT.bead : C.rule} strokeWidth={big || fit ? 4 : 2} strokeDasharray={on || big || fit ? undefined : "6 6"} />
            <text x={CL_LAD.px + 14} y={y + 10} fontSize={T.micro} fontWeight={700} fill={on ? C.ink : CL_INK.zero}>{"×" + k}</text>
            {on && <text x={CL_LAD.px + CL_LAD.pw - 14} y={y + 11} textAnchor="end" fontSize={T.label} fontWeight={700} fill={CL_INK.rose}>{clNum(k * S.d)}</text>}
            {big && <text x={CL_LAD.tag} y={y + 10} fontSize={T.micro} fontWeight={700} fill={C.ink}>{tx("too big")}</text>}
            {fit && <text x={CL_LAD.tag} y={y + 10} fontSize={T.micro} fontWeight={700} fill={CL_INK.green}>{tx("fits")}</text>}
          </g>
        );
      })}
      <g className="cl-move" style={{ transform: `translate(${clDrag ? clDrag.x : CL_LAD.cx}px, ${clDrag ? clDrag.y : clRungY(S.cl)}px)` } as any}
        {...(ladderLive ? { className: (clDrag ? "" : "cl-move ") + "cl-grab c4-piece", ...control("climber", tx("Climb one rung")), ...drag.bind({ src: "climber" }), ...drag.keys({ src: "climber" }) } : {})}>
        <rect x={-36} y={-36} width={72} height={72} rx={18} fill="transparent" />
        <path d="M 14 -13 L 36 0 L 14 13 Z" fill={shade(CONTENT.ten, 0.15)} />
        <Disc x={0} y={0} r={23} paint="gTen" lift={!!clDrag} />
      </g>
    </g>
  ) : null;

  /* ── the bar, the chunk cards and the chunk column ── */
  const P: any = kind === "lanes" ? CL_P4 : CL_P3;
  const rowsN = Math.max(S.lane.length, kind === "lanes" ? S.laneA.length : 0, 1);
  const pitch = Math.min(P.pitchMax, 330 / rowsN);
  const rowTop = 60 + P.fs;
  const sumY = rowTop + (rowsN - 1) * pitch + P.fs + 26;
  const laneG = (key: string, bx: number, cx: number, chunks: number[], showTaken: boolean) => {
    const H = CL_BAR.h, top = CL_BAR.top, base = top + H, sc = H / S.n, left = S.n - S.d * clSum(chunks), bw = P.bw;
    let y = top;
    return (
      <g key={key}>
        <text x={bx + bw / 2} y={52} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={CL_INK.blue}>{clNum(S.n)}</text>
        {chunks.map((c: number, i: number) => {
          const h = c * S.d * sc, r = <rect key={"g" + i} x={bx} y={y} width={bw} height={h} fill={tint(CONTENT.bead, 0.8)} stroke={CONTENT.bead} strokeWidth={1.5} />;
          y += h;
          return r;
        })}
        {left > 0 && <rect x={bx} y={base - left * sc} width={bw} height={left * sc} fill="url(#gHundred)" />}
        <rect x={bx} y={top} width={bw} height={H} fill="none" stroke={CONTENT.line} strokeWidth={3} />
        <text x={bx + bw / 2} y={512} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={left < S.d ? CL_INK.verm : CL_INK.blue}>{lang === "hi" ? `${clNum(left)} बचे` : lang === "gu" ? `${clNum(left)} વધ્યા` : `${clNum(left)} left`}</text>
        <text x={cx + P.sizeX} y={52} textAnchor="end" fontSize={T.micro} fontWeight={700} fill={CL_INK.green}>{tx("each")}</text>
        <text x={cx + P.amtX} y={52} textAnchor="end" fontSize={T.micro} fontWeight={700} fill={CL_INK.rose}>{tx("taken")}</text>
        {chunks.map((c: number, i: number) => (
          <g key={"row" + i}>
            <text x={cx + P.sizeX} y={rowTop + i * pitch} textAnchor="end" fontSize={P.fs} fontWeight={700} fill={CL_INK.green}>{c}</text>
            <text x={cx + P.amtX} y={rowTop + i * pitch} textAnchor="end" fontSize={P.fs} fontWeight={700} fill={CL_INK.rose}>{clNum(c * S.d)}</text>
          </g>
        ))}
        {(S.sumEach || (showTaken && S.sumTaken)) && <line x1={cx + 8} y1={sumY - P.fs - 10} x2={cx + P.amtX + 6} y2={sumY - P.fs - 10} stroke={CONTENT.line} strokeWidth={3} strokeLinecap="round" />}
        {S.sumEach && <rect x={cx + P.sizeX - 86} y={sumY - P.fs * 0.9} width={96} height={P.fs * 1.22} rx={10} fill={tint(CONTENT.one, 0.82)} />}
        {S.sumEach && <text x={cx + P.sizeX} y={sumY} textAnchor="end" fontSize={P.fs} fontWeight={700} fill={CL_INK.green}>{clSum(chunks)}</text>}
        {showTaken && S.sumTaken && <text x={cx + P.amtX} y={sumY} textAnchor="end" fontSize={P.fs} fontWeight={700} fill={CL_INK.rose}>{clNum(clSum(chunks) * S.d)}</text>}
      </g>
    );
  };
  const CD = P.cards;
  const cardDrag = drag.drag && drag.drag.payload && drag.drag.payload.src === "card" && drag.drag.moved ? drag.drag : null;
  const fitIdx = CL_CARDS.findIndex((c) => c * S.d <= laneLeft);
  if (!invite && stage === "ask" && !busy && laneKinds && lanesLive && !S.touched && fitIdx >= 0)
    invite = { x: CD.x + 44, y: CD.top + fitIdx * CD.pitch + CD.h / 2, r: 34 };
  const cardsG = laneKinds ? [...CL_CARDS, "any"].map((c: any, i: number) => {
    const x = CD.x, y = CD.top + i * CD.pitch, w = CD.w, h = CD.h, isAny = c === "any";
    const moving = cardDrag && cardDrag.payload.c === c;
    const dx = moving ? cardDrag.x - (x + w / 2) : 0, dy = (moving ? cardDrag.y - (y + h / 2) : 0) + (S.refuse && S.refuse.c === c ? -10 : 0);
    const typedN = isAny && S.anyOpen && S.anyV ? Number(S.anyV) : null;
    const size = isAny ? typedN : c;
    const amt = size && size > 0 && size <= 999 ? size * S.d : null;
    const leftText = isAny ? (S.anyOpen ? S.anyV : "?") : String(c);
    const cardCaret = isAny && S.anyOpen && held;
    const keysFor = (p: any) => { const k = drag.keys(p); return { onKeyDown: (e: any) => { if (e.key === "Enter" && isAny && S.anyOpen && held) return; k.onKeyDown(e); } }; };
    const rightText = amt ? clNum(amt) : isAny && !S.anyOpen ? tx("any") : "";
    const pay = { src: "card", c };
    const live = lanesLive;
    return (
      <g key={"card" + c} className={live ? (moving ? "cl-grab c4-piece" : "cl-move cl-grab c4-piece") : ""} style={{ transform: `translate(${dx}px, ${dy}px)` } as any}
        {...(live ? { ...control("card-" + c, isAny ? tx("Your own chunk") : "Take " + c + " for each"), ...drag.bind(pay), ...keysFor(pay) } : { "aria-disabled": "true" })}>
        {live && <rect x={x} y={y + EDGE} width={w} height={h} rx={RAD.key} fill={shade(C.rule, 0.08)} />}
        <rect x={x} y={y} width={w} height={h} rx={RAD.key} fill={live ? "url(#gKey)" : tint(C.panel, 0.55)}
          stroke={isAny && S.anyOpen ? LIT : live ? C.rule : tint(C.rule, 0.35)} strokeWidth={isAny && S.anyOpen ? 4 : 2} />
        {live && <path d={`M ${x + 18} ${y + 3} H ${x + w - 18}`} stroke="#FFFFFF" strokeOpacity={0.95} strokeWidth={3} strokeLinecap="round" />}
        {leftText !== "" && <text x={x + 20} y={y + h / 2 + CD.fs * 0.36} fontSize={CD.fs} fontWeight={700} fill={live ? CL_INK.green : quiet}>{leftText}</text>}
        {cardCaret && <rect className="c4-caret" x={x + 22 + leftText.length * CD.fs * 0.62} y={y + h / 2 - CD.fs * 0.42} width={4} height={CD.fs * 0.8} rx={2} fill={C.accent} />}
        {rightText && <text x={x + w - 18} y={y + h / 2 + (amt ? CD.fs : T.micro) * 0.36} textAnchor="end" fontSize={amt ? CD.fs : T.micro} fontWeight={700} fill={live ? (amt ? CL_INK.rose : C.ink) : quiet}>{rightText}</text>}
      </g>
    );
  }) : null;
  const refuseG = laneKinds && S.refuse ? (() => {
    const bx = P.bar, H = CL_BAR.h, base = CL_BAR.top + H, sc = H / S.n, h = Math.min(S.refuse.amt * sc, H + 50), ft = base - laneLeft * sc;
    return (
      <g pointerEvents="none">
        <rect x={bx - 48} y={base - h} width={36} height={h} rx={6} fill="url(#gBead)" stroke={CL_INK.rose} strokeWidth={2} />
        <line x1={bx - 58} y1={ft} x2={bx + P.bw} y2={ft} stroke={C.ink} strokeWidth={2.5} strokeDasharray="8 6" />
      </g>
    );
  })() : null;

  return (
    <g>
      <style>{CL_CSS}</style>

      {/* the division at hand, in the runs zone (64,108) */}
      <g data-zone="runs">
        <rect x={0} y={-94} width={330} height={76} rx={RAD.panel} fill="url(#gPanel)" stroke={C.rule} strokeWidth={2} />
        <text x={18} y={-40} fontSize={T.speech} fontWeight={700} fill={C.ink}>
          <tspan fill={CL_INK.blue}>{clNum(S.n)}</tspan> ÷ <tspan fill={CL_INK.amber}>{S.d}</tspan>
        </text>
      </g>

      {frameG}
      {ladderG}
      {windowG}
      {mineG}
      {cmpG}

      {kind === "lanes" && laneG("A", CL_P4.barA, CL_P4.colA, S.laneA, false)}
      {kind === "lanes" && <line x1={CL_P4.rule} y1={20} x2={CL_P4.rule} y2={510} stroke={CONTENT.line} strokeWidth={3} strokeLinecap="round" />}
      {laneKinds && laneG("B", P.bar, P.col, S.lane, kind === "chunks")}
      {refuseG}
      {cardsG}

      {free && (
        <Key id="new-division" label={tx("New division")} x={962} y={447} w={104} h={76} C={C} onClick={newDivision}>
          <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={C.ink}>{tx("New")}</text>
        </Key>
      )}

      {invite && <Invite x={invite.x} y={invite.y} r={invite.r} C={C} />}
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase */
function Thumb({ n, result, C, w, h, tx = (v: any) => v }: any) {
  const L = result && result.last;
  if (!L) return null;
  const it: any = (((PHASES[(n || 1) - 1] || {}) as any).items || [])[L.item] || {};
  if (!it.n) return null;
  const ps = it.parts ? slotPartsOf(L.value, 2) : [String(leadNumber(L.value) ?? "")];
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      <text x={w - 16} y={h / 2 - 6} textAnchor="end" fontSize={T.micro} fontWeight={700} fill={C.ink}>
        <tspan fill={CL_INK.blue}>{clNum(it.n)}</tspan> ÷ <tspan fill={CL_INK.amber}>{it.d}</tspan>
      </text>
      <text x={w - 16} y={h / 2 + 28} textAnchor="end" fontSize={T.micro} fontWeight={700} fill={C.ink}>
        {it.kind === "left" ? <tspan><tspan fill={CL_INK.verm}>{ps[0]}</tspan> {tx(it.unit)} {tx("left")}</tspan>
          : <tspan>= <tspan fill={CL_INK.green}>{ps[0]}</tspan>{it.parts ? <tspan> {tx("r")} <tspan fill={CL_INK.verm}>{ps[1]}</tspan></tspan> : null}</tspan>}
      </text>
    </g>
  );
}

function ChunkLadder(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, format, fitHost: () => null }} />
  );
}

export default ChunkLadder;
