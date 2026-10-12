/* ═══ M2.S3.T5.C16.2D1 · change_counter · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists: header + its three controls, canvas, slot + pad, bubble + mascot,
   phase dots (user / AI mode), window.toolApi, sounds, the synced voice, scoring, the events,
   idle and restart. NO imports in this file; only the five host hooks. Follow docs/LAYOUT.md.
   Built by `node cli.mjs scaffold`; concepts are verbatim (check compares them).

   The picture: a column frame with the dots on one dotted line, rupees left, paise right. The child
   taps a column to take it away (paise first; the paise cell stays shut when the paise on top are too
   few), breaks a rupee into a hundred paise (the rupees on top struck and written one less, a strip of a
   hundred cells joins the paise on top), and types the amount on the pad's point key. On phase 4 the
   bill is set under the money given, the change fills a tray, and it is added back to check. */

const TOOL_ID = "change_counter";
const MEDIA_ID = "M2.S3.T5.C16.2D1";
const TOOL_NAME = "Change Counter";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
const VOICE = {"rate":0.92,"pitch":1.06};

/* spoken before phase 1's teach lines only. The plan's line named a bill and a tray that phase 1 does not
   show, and asked the teach's own question; this one names what is on screen. */
const OPENING = ["Rupees on the left of the dot, paise on the right."];
/* the whole-tool line: spoken on the summary page */
const FINISH_LINE = "A rupee broken wherever the paise were too few, and every change added back to check.";
/* said when the child opens Free play from the summary page */
const FREE_LINE = "Free play. Tap the notes or the bill to type any amount, then take away and check.";

/* Hindi and Gujarati (docs/PATTERNS.md §11), keyed by the English byte for byte. Spoken money is written in
   words with its digits ("736 रुपये 40 पैसे"); drawn money (asks, notes, labels, the slot) keeps its digits
   with the rupee sign ("₹68.40"). Terms: रुपया / રૂપિયો, पैसे / પૈસા, नोट / નોટ, बिल / બિલ, कुल / કુલ,
   बाकी पैसे / બાકીના પૈસા (change), दिए गए पैसे / આપેલા પૈસા (money given), रुपया तोड़ो / રૂપિયો તોડો.
   A first draft by Claude for a native speaker's read. */
const TR: any = {
  hi: {
    "Change Counter": "बाकी पैसों की गिनती",
    "Paise first, then rupees": "पहले पैसे, फिर रुपये",
    "Breaking a rupee into paise": "रुपये को पैसों में तोड़ना",
    "Taking paise from zero paise": "शून्य पैसे में से पैसे घटाना",
    "Change from a payment": "भुगतान से बाकी पैसे",
    "Rupees on the left of the dot, paise on the right.": "बिंदु के बाईं ओर रुपये, दाईं ओर पैसे।",
    "A rupee broken wherever the paise were too few, and every change added back to check.": "जहाँ पैसे कम थे, वहाँ एक रुपया तोड़ा। हर बार बाकी पैसे जोड़कर जाँचे।",
    "Free play. Tap the notes or the bill to type any amount, then take away and check.": "मुक्त खेल। नोटों या बिल पर टैप करके कोई भी रकम लिखो, फिर घटाओ और जाँचो।",
    /* phase 1 */
    "The paise always take two places after the dot.": "बिंदु के बाद पैसे हमेशा दो अंकों में लिखे जाते हैं।",
    "Which column do you take away first?": "पहले किस स्तंभ को घटाओगे?",
    "Work right of the dot before the left.": "बाईं ओर से पहले बिंदु के दाईं ओर हल करो।",
    "One column at a time: paise on the right, then rupees on the left.": "एक बार में एक स्तंभ: पहले दाईं ओर पैसे, फिर बाईं ओर रुपये।",
    "Take away the paise first, then the rupees, with the dots in one line.": "बिंदुओं को एक सीध में रखो। पहले पैसे घटाओ, फिर रुपये।",
    "You learned: take away the paise first, then the rupees.": "तुमने सीखा: पहले पैसे घटाओ, फिर रुपये।",
    "Take Rs 23.15 from Rs 68.40.": "68 रुपये 40 पैसे में से 23 रुपये 15 पैसे घटाओ।",
    "Take Rs 23.15 from Rs 68.40": "₹68.40 में से ₹23.15 घटाओ",
    "Which amount is on top? Start with the paise under it.": "ऊपर कौन-सी रकम है? उसके नीचे वाले पैसों से शुरू करो।",
    "Now take Rs 14.20 from Rs 39.65.": "अब 39 रुपये 65 पैसे में से 14 रुपये 20 पैसे घटाओ।",
    "Take Rs 14.20 from Rs 39.65": "₹39.65 में से ₹14.20 घटाओ",
    "Did you take away the paise as well as the rupees?": "क्या तुमने रुपयों के साथ पैसे भी घटाए?",
    "One more. Take Rs 102.35 from Rs 258.90.": "एक और। 258 रुपये 90 पैसे में से 102 रुपये 35 पैसे घटाओ।",
    "Take Rs 102.35 from Rs 258.90": "₹258.90 में से ₹102.35 घटाओ",
    "Read your answer across the dot. Are the paise there?": "अपना उत्तर बिंदु के दोनों ओर पढ़ो। क्या पैसे लिखे हैं?",
    /* phase 2 */
    "There are not enough paise on top. Where can more come from?": "ऊपर पैसे पूरे नहीं हैं। और पैसे कहाँ से आ सकते हैं?",
    "What does one rupee become?": "एक रुपया कितने पैसे बनता है?",
    "Break one rupee on top. Put its hundred paise with the paise on top, then take away.": "ऊपर का एक रुपया तोड़ो। उसके 100 पैसे ऊपर के पैसों में मिलाओ, फिर घटाओ।",
    "When the paise on top are fewer than the paise below, break one rupee into a hundred paise. The rupees on top go down by one.": "जब ऊपर के पैसे नीचे वालों से कम हों, एक रुपया तोड़ो। उससे 100 पैसे बनते हैं। ऊपर के रुपये एक कम हो जाते हैं।",
    "You learned: too few paise? Break a rupee into a hundred paise.": "तुमने सीखा: पैसे कम हों तो एक रुपया तोड़कर 100 पैसे बनाओ।",
    "Take Rs 138.85 from Rs 426.30.": "426 रुपये 30 पैसे में से 138 रुपये 85 पैसे घटाओ।",
    "Take Rs 138.85 from Rs 426.30": "₹426.30 में से ₹138.85 घटाओ",
    "Look at the paise on top and below. Which is more?": "ऊपर और नीचे के पैसे देखो। कौन-से ज़्यादा हैं?",
    "Now take Rs 27.80 from Rs 64.25.": "अब 64 रुपये 25 पैसे में से 27 रुपये 80 पैसे घटाओ।",
    "Take Rs 27.80 from Rs 64.25": "₹64.25 में से ₹27.80 घटाओ",
    "After a break, the rupees on top are one less. Did you use that?": "रुपया तोड़ने के बाद ऊपर के रुपये एक कम होते हैं। क्या तुमने यह ध्यान रखा?",
    "One more. Take Rs 315.95 from Rs 540.60.": "एक और। 540 रुपये 60 पैसे में से 315 रुपये 95 पैसे घटाओ।",
    "Take Rs 315.95 from Rs 540.60": "₹540.60 में से ₹315.95 घटाओ",
    "Add the hundred paise to the paise on top. What do you take from?": "100 पैसे ऊपर के पैसों में जोड़ो। अब किसमें से घटाओगे?",
    /* phase 3 */
    "The top has no paise at all. What do you break?": "ऊपर एक भी पैसा नहीं है। तुम क्या तोड़ोगे?",
    "Where can paise come from when there are none?": "जब पैसे हैं ही नहीं, तो पैसे कहाँ से आएँगे?",
    "Break one rupee on top. It gives a hundred paise, and the rupees become one less.": "ऊपर का एक रुपया तोड़ो। उससे 100 पैसे मिलते हैं, और रुपये एक कम हो जाते हैं।",
    "To take paise from zero paise, break one rupee into a hundred paise. The rupees go down by one, and the paise on top become a hundred.": "शून्य पैसे में से पैसे घटाने के लिए एक रुपया तोड़कर 100 पैसे बनाओ। रुपये एक कम होते हैं, और ऊपर 100 पैसे हो जाते हैं।",
    "You learned: from zero paise, a broken rupee gives a hundred paise.": "तुमने सीखा: शून्य पैसे हों तो तोड़ा हुआ रुपया 100 पैसे देता है।",
    "Take Rs 57.35 from Rs 300.": "300 रुपये में से 57 रुपये 35 पैसे घटाओ।",
    "Take Rs 57.35 from Rs 300": "₹300 में से ₹57.35 घटाओ",
    "How many paise are on top?": "ऊपर कितने पैसे हैं?",
    "Now take Rs 18.45 from Rs 90.": "अब 90 रुपये में से 18 रुपये 45 पैसे घटाओ।",
    "Take Rs 18.45 from Rs 90": "₹90 में से ₹18.45 घटाओ",
    "Were the paise taken away, or copied down from below?": "क्या पैसे घटाए गए, या नीचे से वैसे ही उतार लिए?",
    "A child takes Rs 125.30 from Rs 600. The child writes Rs 475.30. What went wrong, and what is the right answer?": "एक बच्चा 600 रुपये में से 125 रुपये 30 पैसे घटाता है। वह 475 रुपये 30 पैसे लिखता है। क्या गलत हुआ, और सही उत्तर क्या है?",
    "The right answer?": "सही उत्तर?",
    "Rs 600 has no paise on top. What must happen before the paise?": "600 रुपये में ऊपर कोई पैसा नहीं है। पैसे घटाने से पहले क्या करना होगा?",
    /* phase 4 */
    "The notes paid are on the left, with the bill under them. Set the bill in the frame.": "दिए गए नोट बाईं ओर हैं, उनके नीचे बिल है। बिल को ढाँचे में लगाओ।",
    "The change keeps both places of paise.": "बाकी पैसे लिखते समय पैसों के दोनों अंक लिखो।",
    "Which is taken from which?": "किसमें से क्या घटाया जाता है?",
    "The money given is the bill and the change together.": "बिल और बाकी पैसे मिलकर दिए गए पैसों के बराबर होते हैं।",
    "The change is the money given less the bill, and adding the change back to the bill checks it.": "दिए गए पैसों में से बिल घटाओ, तो बाकी पैसे मिलते हैं। बाकी पैसे बिल में जोड़कर जाँचो।",
    "You learned: change is money given less the bill; add back to check.": "तुमने सीखा: दिए पैसों में से बिल घटाओ, फिर जोड़कर जाँचो।",
    "A bill comes to Rs 736.40. The shopper pays with one Rs 500 note and three Rs 100 notes. How much change comes back?": "बिल 736 रुपये 40 पैसे का है। ग्राहक 500 रुपये का एक नोट और 100 रुपये के तीन नोट देता है। कितने पैसे वापस मिलेंगे?",
    "How much change?": "बाकी पैसे कितने?",
    "What was paid, and what was the bill?": "कितने पैसे दिए, और बिल कितने का था?",
    "A bag costs Rs 348.50 and shoes Rs 525.25. Socks cost Rs 64.60. The shopper pays Rs 1,200 for all three. How much is returned?": "थैले की कीमत 348 रुपये 50 पैसे है। जूतों की कीमत 525 रुपये 25 पैसे है। मोज़ों की कीमत 64 रुपये 60 पैसे है। ग्राहक तीनों के लिए 1,200 रुपये देता है। कितने पैसे लौटाए जाएँगे?",
    "How much is returned?": "कितने पैसे लौटाए?",
    "The bill's total is one step. What comes back to the shopper?": "बिल का कुल सिर्फ़ एक चरण है। ग्राहक को वापस क्या मिलता है?",
    "A shopper pays for a Rs 412.85 bill with a Rs 500 note. The shopper is handed Rs 87.15. Is the change right? Check by adding.": "ग्राहक 412 रुपये 85 पैसे के बिल के लिए 500 रुपये का नोट देता है। उसे 87 रुपये 15 पैसे वापस मिलते हैं। क्या बाकी पैसे सही हैं? जोड़कर जाँचो।",
    "Is the change right?": "क्या बाकी पैसे सही हैं?",
    "Add the change to the bill. Do they make the money given?": "बाकी पैसे बिल में जोड़ो। क्या दिए गए पैसे बनते हैं?",
    "Yes": "हाँ",
    "No": "नहीं",
    /* the working area's spoken lines */
    "The paise on top are too few to take from.": "ऊपर के पैसे घटाने के लिए कम हैं।",
    "Start with the paise, right of the dot.": "बिंदु के दाईं ओर के पैसों से शुरू करो।",
    "The bill is more than the money given.": "बिल दिए गए पैसों से ज़्यादा है।",
    "Now there are enough paise on top.": "अब ऊपर पूरे पैसे हैं।",
    "The change and the bill make the money given.": "बाकी पैसे और बिल मिलकर दिए गए पैसे बनते हैं।",
    "Paise are written with two digits after the dot.": "पैसे बिंदु के बाद दो अंकों से लिखो।",
    "The child wrote the 30 paise down. They had to come from a broken rupee.": "बच्चे ने 30 पैसे वैसे ही नीचे लिख दिए। वे एक तोड़े गए रुपये से आने थे।",
    "Yes. The bill and the change make Rs 500.00, the money given.": "हाँ। बिल और बाकी पैसे मिलकर 500 रुपये बनते हैं, जितने दिए गए थे।",
    /* the working area's words */
    "rupees": "रुपये",
    "paise": "पैसे",
    "paise on top": "ऊपर के पैसे",
    "bill": "बिल",
    "total": "कुल",
    "change": "बाकी पैसे",
    "steps": "चरण",
    "columns": "स्तंभ",
    "break a rupee": "रुपया तोड़ो",
    "check": "जाँचो",
    "bag": "थैला",
    "shoes": "जूते",
    "socks": "मोज़े",
  },
  gu: {
    "Change Counter": "બાકીના પૈસાની ગણતરી",
    "Paise first, then rupees": "પહેલાં પૈસા, પછી રૂપિયા",
    "Breaking a rupee into paise": "રૂપિયાને પૈસામાં તોડવો",
    "Taking paise from zero paise": "શૂન્ય પૈસામાંથી પૈસા બાદ કરવા",
    "Change from a payment": "ચુકવણીમાંથી બાકીના પૈસા",
    "Rupees on the left of the dot, paise on the right.": "બિંદુની ડાબી બાજુ રૂપિયા, જમણી બાજુ પૈસા.",
    "A rupee broken wherever the paise were too few, and every change added back to check.": "જ્યાં પૈસા ઓછા હતા ત્યાં રૂપિયો તોડ્યો. દરેક વખતે બાકીના પૈસા ઉમેરીને ચકાસ્યા.",
    "Free play. Tap the notes or the bill to type any amount, then take away and check.": "મુક્ત રમત. નોટ કે બિલ પર ટૅપ કરી કોઈ પણ રકમ લખો, પછી બાદ કરો અને ચકાસો.",
    /* phase 1 */
    "The paise always take two places after the dot.": "બિંદુ પછી પૈસા હંમેશાં બે અંકમાં લખાય છે.",
    "Which column do you take away first?": "પહેલાં કયા સ્તંભને બાદ કરશો?",
    "Work right of the dot before the left.": "ડાબી બાજુ પહેલાં બિંદુની જમણી બાજુ ગણો.",
    "One column at a time: paise on the right, then rupees on the left.": "એક વખતે એક સ્તંભ: પહેલાં જમણે પૈસા, પછી ડાબે રૂપિયા.",
    "Take away the paise first, then the rupees, with the dots in one line.": "બિંદુઓ એક લીટીમાં રાખો. પહેલાં પૈસા બાદ કરો, પછી રૂપિયા.",
    "You learned: take away the paise first, then the rupees.": "તમે શીખ્યા: પહેલાં પૈસા બાદ કરો, પછી રૂપિયા.",
    "Take Rs 23.15 from Rs 68.40.": "68 રૂપિયા 40 પૈસામાંથી 23 રૂપિયા 15 પૈસા બાદ કરો.",
    "Take Rs 23.15 from Rs 68.40": "₹68.40 માંથી ₹23.15 બાદ કરો",
    "Which amount is on top? Start with the paise under it.": "ઉપર કઈ રકમ છે? તેની નીચેના પૈસાથી શરૂ કરો.",
    "Now take Rs 14.20 from Rs 39.65.": "હવે 39 રૂપિયા 65 પૈસામાંથી 14 રૂપિયા 20 પૈસા બાદ કરો.",
    "Take Rs 14.20 from Rs 39.65": "₹39.65 માંથી ₹14.20 બાદ કરો",
    "Did you take away the paise as well as the rupees?": "શું તમે રૂપિયાની સાથે પૈસા પણ બાદ કર્યા?",
    "One more. Take Rs 102.35 from Rs 258.90.": "એક વધુ. 258 રૂપિયા 90 પૈસામાંથી 102 રૂપિયા 35 પૈસા બાદ કરો.",
    "Take Rs 102.35 from Rs 258.90": "₹258.90 માંથી ₹102.35 બાદ કરો",
    "Read your answer across the dot. Are the paise there?": "તમારો જવાબ બિંદુની બંને બાજુ વાંચો. શું પૈસા લખ્યા છે?",
    /* phase 2 */
    "There are not enough paise on top. Where can more come from?": "ઉપર પૈસા પૂરતા નથી. વધુ પૈસા ક્યાંથી આવી શકે?",
    "What does one rupee become?": "એક રૂપિયો કેટલા પૈસા બને?",
    "Break one rupee on top. Put its hundred paise with the paise on top, then take away.": "ઉપરનો એક રૂપિયો તોડો. તેના 100 પૈસા ઉપરના પૈસામાં ઉમેરો, પછી બાદ કરો.",
    "When the paise on top are fewer than the paise below, break one rupee into a hundred paise. The rupees on top go down by one.": "જ્યારે ઉપરના પૈસા નીચેના કરતાં ઓછા હોય, ત્યારે એક રૂપિયો તોડો. તેમાંથી 100 પૈસા બને. ઉપરના રૂપિયા એક ઓછા થાય.",
    "You learned: too few paise? Break a rupee into a hundred paise.": "તમે શીખ્યા: પૈસા ઓછા હોય તો રૂપિયો તોડી 100 પૈસા બનાવો.",
    "Take Rs 138.85 from Rs 426.30.": "426 રૂપિયા 30 પૈસામાંથી 138 રૂપિયા 85 પૈસા બાદ કરો.",
    "Take Rs 138.85 from Rs 426.30": "₹426.30 માંથી ₹138.85 બાદ કરો",
    "Look at the paise on top and below. Which is more?": "ઉપર અને નીચેના પૈસા જુઓ. કયા વધારે છે?",
    "Now take Rs 27.80 from Rs 64.25.": "હવે 64 રૂપિયા 25 પૈસામાંથી 27 રૂપિયા 80 પૈસા બાદ કરો.",
    "Take Rs 27.80 from Rs 64.25": "₹64.25 માંથી ₹27.80 બાદ કરો",
    "After a break, the rupees on top are one less. Did you use that?": "રૂપિયો તોડ્યા પછી ઉપરના રૂપિયા એક ઓછા થાય. શું તમે એ ધ્યાનમાં લીધું?",
    "One more. Take Rs 315.95 from Rs 540.60.": "એક વધુ. 540 રૂપિયા 60 પૈસામાંથી 315 રૂપિયા 95 પૈસા બાદ કરો.",
    "Take Rs 315.95 from Rs 540.60": "₹540.60 માંથી ₹315.95 બાદ કરો",
    "Add the hundred paise to the paise on top. What do you take from?": "100 પૈસા ઉપરના પૈસામાં ઉમેરો. હવે શેમાંથી બાદ કરશો?",
    /* phase 3 */
    "The top has no paise at all. What do you break?": "ઉપર એક પણ પૈસો નથી. તમે શું તોડશો?",
    "Where can paise come from when there are none?": "પૈસા જ ન હોય તો પૈસા ક્યાંથી આવે?",
    "Break one rupee on top. It gives a hundred paise, and the rupees become one less.": "ઉપરનો એક રૂપિયો તોડો. તેમાંથી 100 પૈસા મળે, અને રૂપિયા એક ઓછા થાય.",
    "To take paise from zero paise, break one rupee into a hundred paise. The rupees go down by one, and the paise on top become a hundred.": "શૂન્ય પૈસામાંથી પૈસા બાદ કરવા એક રૂપિયો તોડી 100 પૈસા બનાવો. રૂપિયા એક ઓછા થાય, અને ઉપર 100 પૈસા થાય.",
    "You learned: from zero paise, a broken rupee gives a hundred paise.": "તમે શીખ્યા: શૂન્ય પૈસા હોય તો તોડેલો રૂપિયો 100 પૈસા આપે.",
    "Take Rs 57.35 from Rs 300.": "300 રૂપિયામાંથી 57 રૂપિયા 35 પૈસા બાદ કરો.",
    "Take Rs 57.35 from Rs 300": "₹300 માંથી ₹57.35 બાદ કરો",
    "How many paise are on top?": "ઉપર કેટલા પૈસા છે?",
    "Now take Rs 18.45 from Rs 90.": "હવે 90 રૂપિયામાંથી 18 રૂપિયા 45 પૈસા બાદ કરો.",
    "Take Rs 18.45 from Rs 90": "₹90 માંથી ₹18.45 બાદ કરો",
    "Were the paise taken away, or copied down from below?": "પૈસા બાદ કર્યા, કે નીચેથી એમ ને એમ ઉતારી લીધા?",
    "A child takes Rs 125.30 from Rs 600. The child writes Rs 475.30. What went wrong, and what is the right answer?": "એક બાળક 600 રૂપિયામાંથી 125 રૂપિયા 30 પૈસા બાદ કરે છે. તે 475 રૂપિયા 30 પૈસા લખે છે. શું ભૂલ થઈ, અને સાચો જવાબ શું છે?",
    "The right answer?": "સાચો જવાબ?",
    "Rs 600 has no paise on top. What must happen before the paise?": "600 રૂપિયામાં ઉપર કોઈ પૈસો નથી. પૈસા બાદ કરતાં પહેલાં શું કરવું પડે?",
    /* phase 4 */
    "The notes paid are on the left, with the bill under them. Set the bill in the frame.": "આપેલી નોટ ડાબી બાજુ છે, તેની નીચે બિલ છે. બિલને માળખામાં મૂકો.",
    "The change keeps both places of paise.": "બાકીના પૈસા લખતી વખતે પૈસાના બંને અંક લખો.",
    "Which is taken from which?": "શેમાંથી શું બાદ થાય છે?",
    "The money given is the bill and the change together.": "બિલ અને બાકીના પૈસા મળીને આપેલા પૈસા જેટલા થાય.",
    "The change is the money given less the bill, and adding the change back to the bill checks it.": "આપેલા પૈસામાંથી બિલ બાદ કરો તો બાકીના પૈસા મળે. બાકીના પૈસા બિલમાં ઉમેરીને ચકાસો.",
    "You learned: change is money given less the bill; add back to check.": "તમે શીખ્યા: આપેલા પૈસામાંથી બિલ બાદ કરો, પછી ઉમેરીને ચકાસો.",
    "A bill comes to Rs 736.40. The shopper pays with one Rs 500 note and three Rs 100 notes. How much change comes back?": "બિલ 736 રૂપિયા 40 પૈસાનું છે. ગ્રાહક 500 રૂપિયાની એક નોટ અને 100 રૂપિયાની ત્રણ નોટ આપે છે. કેટલા પૈસા પાછા મળશે?",
    "How much change?": "બાકીના પૈસા કેટલા?",
    "What was paid, and what was the bill?": "કેટલા પૈસા આપ્યા, અને બિલ કેટલાનું હતું?",
    "A bag costs Rs 348.50 and shoes Rs 525.25. Socks cost Rs 64.60. The shopper pays Rs 1,200 for all three. How much is returned?": "થેલાની કિંમત 348 રૂપિયા 50 પૈસા છે. બૂટની કિંમત 525 રૂપિયા 25 પૈસા છે. મોજાંની કિંમત 64 રૂપિયા 60 પૈસા છે. ગ્રાહક ત્રણેય માટે 1,200 રૂપિયા આપે છે. કેટલા પૈસા પાછા અપાશે?",
    "How much is returned?": "કેટલા પૈસા પાછા?",
    "The bill's total is one step. What comes back to the shopper?": "બિલનો કુલ ફક્ત એક પગલું છે. ગ્રાહકને પાછું શું મળે?",
    "A shopper pays for a Rs 412.85 bill with a Rs 500 note. The shopper is handed Rs 87.15. Is the change right? Check by adding.": "ગ્રાહક 412 રૂપિયા 85 પૈસાના બિલ માટે 500 રૂપિયાની નોટ આપે છે. તેને 87 રૂપિયા 15 પૈસા પાછા મળે છે. શું બાકીના પૈસા સાચા છે? ઉમેરીને ચકાસો.",
    "Is the change right?": "બાકીના પૈસા સાચા છે?",
    "Add the change to the bill. Do they make the money given?": "બાકીના પૈસા બિલમાં ઉમેરો. શું આપેલા પૈસા જેટલા થાય છે?",
    "Yes": "હા",
    "No": "ના",
    /* the working area's spoken lines */
    "The paise on top are too few to take from.": "ઉપરના પૈસા બાદ કરવા માટે ઓછા છે.",
    "Start with the paise, right of the dot.": "બિંદુની જમણી બાજુના પૈસાથી શરૂ કરો.",
    "The bill is more than the money given.": "બિલ આપેલા પૈસા કરતાં વધારે છે.",
    "Now there are enough paise on top.": "હવે ઉપર પૂરતા પૈસા છે.",
    "The change and the bill make the money given.": "બાકીના પૈસા અને બિલ મળીને આપેલા પૈસા થાય છે.",
    "Paise are written with two digits after the dot.": "પૈસા બિંદુ પછી બે અંકથી લખો.",
    "The child wrote the 30 paise down. They had to come from a broken rupee.": "બાળકે 30 પૈસા એમ ને એમ નીચે લખી દીધા. તે તોડેલા રૂપિયામાંથી આવવા જોઈતા હતા.",
    "Yes. The bill and the change make Rs 500.00, the money given.": "હા. બિલ અને બાકીના પૈસા મળીને 500 રૂપિયા થાય, જેટલા આપ્યા હતા.",
    /* the working area's words */
    "rupees": "રૂપિયા",
    "paise": "પૈસા",
    "paise on top": "ઉપરના પૈસા",
    "bill": "બિલ",
    "total": "કુલ",
    "change": "બાકીના પૈસા",
    "steps": "પગલાં",
    "columns": "સ્તંભ",
    "break a rupee": "રૂપિયો તોડો",
    "check": "ચકાસો",
    "bag": "થેલો",
    "shoes": "બૂટ",
    "socks": "મોજાં",
  },
};

/* amounts are held in paise: top = the amount on top of the frame, bot = the one under it.
   Phase 4: top = the money given (paid = its notes), bot = the bill (lines = the slip's rows);
   the check item (op "add") has the bill on top and the change handed back under it. */
const PHASES = [
  {
    n: 1,
    concept: "Paise first, then rupees",
    conceptId: "M2.S3.T5.C16", objectiveIds: ["O7"],
    says: ["The paise always take two places after the dot.", "Which column do you take away first?"],
    ladder: ["Work right of the dot before the left.", "One column at a time: paise on the right, then rupees on the left."],
    closing: "Take away the paise first, then the rupees, with the dots in one line.",
    learned: "You learned: take away the paise first, then the rupees.",
    traceback: "The paise column lights and takes away first, its answer landing after the dot; then the rupees column takes away and its answer lands before the dot.",
    items: [
      /* learn ML1: answer in the plan = Rs 45.25 */
      { qid: "M2.S3.T5.C16:ML1", kind: "first", top: 6840, bot: 2315, say: "Take Rs 23.15 from Rs 68.40.", ask: "Take Rs 23.15 from Rs 68.40", answer: "45.25", winMs: 3600,
        miss: "Which amount is on top? Start with the paise under it." },
      /* practice 1: answer in the plan = Rs 25.45 */
      { qid: "M2.S3.T5.C16:1", kind: "first", top: 3965, bot: 1420, say: "Now take Rs 14.20 from Rs 39.65.", ask: "Take Rs 14.20 from Rs 39.65", answer: "25.45", winMs: 3600,
        miss: "Did you take away the paise as well as the rupees?" },
      /* practice 2: answer in the plan = Rs 156.55. Paise first: 90 less 35 is 55. Then 258 less 102 is 156 */
      { qid: "M2.S3.T5.C16:2", kind: "first", top: 25890, bot: 10235, say: "One more. Take Rs 102.35 from Rs 258.90.", ask: "Take Rs 102.35 from Rs 258.90", answer: "156.55", winMs: 3600,
        miss: "Read your answer across the dot. Are the paise there?" },
    ],
  },
  {
    n: 2,
    concept: "Breaking a rupee into paise",
    conceptId: "M2.S3.T5.C17", objectiveIds: ["O7"],
    says: ["There are not enough paise on top. Where can more come from?"],
    ladder: ["What does one rupee become?", "Break one rupee on top. Put its hundred paise with the paise on top, then take away."],
    closing: "When the paise on top are fewer than the paise below, break one rupee into a hundred paise. The rupees on top go down by one.",
    learned: "You learned: too few paise? Break a rupee into a hundred paise.",
    traceback: "The paise cell stays shut; a rupee is broken: the rupees on top are struck and written one less in amber, a strip of a hundred cells joins the paise on top, whose figure is written a hundred more, and both columns take away.",
    items: [
      /* learn ML2: answer in the plan = Rs 287.45 */
      { qid: "M2.S3.T5.C17:ML2", kind: "break", top: 42630, bot: 13885, say: "Take Rs 138.85 from Rs 426.30.", ask: "Take Rs 138.85 from Rs 426.30", answer: "287.45", winMs: 4600,
        miss: "Look at the paise on top and below. Which is more?" },
      /* practice 3: answer in the plan = Rs 36.45. Break one rupee into a hundred paise: Rs 63 and 125 paise, and 125 less 80 is 45 */
      { qid: "M2.S3.T5.C17:3", kind: "break", top: 6425, bot: 2780, say: "Now take Rs 27.80 from Rs 64.25.", ask: "Take Rs 27.80 from Rs 64.25", answer: "36.45", winMs: 4600,
        miss: "After a break, the rupees on top are one less. Did you use that?" },
      /* practice 4: answer in the plan = Rs 224.65. Break one rupee into a hundred paise: Rs 539 and 160 paise, then 160 less 95 is 65 and 539 less 315 is 224 */
      { qid: "M2.S3.T5.C17:4", kind: "break", top: 54060, bot: 31595, say: "One more. Take Rs 315.95 from Rs 540.60.", ask: "Take Rs 315.95 from Rs 540.60", answer: "224.65", winMs: 4600,
        miss: "Add the hundred paise to the paise on top. What do you take from?" },
    ],
  },
  {
    n: 3,
    concept: "Taking paise from zero paise",
    conceptId: "M2.S3.T5.C18", objectiveIds: ["O8"],
    says: ["The top has no paise at all. What do you break?"],
    ladder: ["Where can paise come from when there are none?", "Break one rupee on top. It gives a hundred paise, and the rupees become one less."],
    closing: "To take paise from zero paise, break one rupee into a hundred paise. The rupees go down by one, and the paise on top become a hundred.",
    learned: "You learned: from zero paise, a broken rupee gives a hundred paise.",
    traceback: "The paise cell stays shut over the grey zeros; a rupee is broken: the rupees on top are struck and written one less, a full strip of a hundred cells becomes the paise on top, and both columns take away.",
    items: [
      /* learn ML3: answer in the plan = Rs 242.65 */
      { qid: "M2.S3.T5.C18:ML3", kind: "zero", top: 30000, bot: 5735, say: "Take Rs 57.35 from Rs 300.", ask: "Take Rs 57.35 from Rs 300", answer: "242.65", winMs: 4600,
        miss: "How many paise are on top?" },
      /* practice 5: answer in the plan = Rs 71.55. Rs 90 is 90.00, and from zero paise one rupee is broken into a hundred paise: Rs 89 and 100 paise */
      { qid: "M2.S3.T5.C18:5", kind: "zero", top: 9000, bot: 1845, say: "Now take Rs 18.45 from Rs 90.", ask: "Take Rs 18.45 from Rs 90", answer: "71.55", winMs: 4600,
        miss: "Were the paise taken away, or copied down from below?" },
      /* practice 6: the plan's answer = the child wrote the 30 paise from the bottom instead of taking them away.
         From zero paise, break one rupee into a hundred paise: Rs 599 and 100 paise. 100 less 30 is 70 and 599 less
         125 is 474, so the answer is Rs 474.70. The slot takes the right amount; the win line says what went wrong. */
      { qid: "M2.S3.T5.C18:6", kind: "zero", top: 60000, bot: 12530, say: "A child takes Rs 125.30 from Rs 600. The child writes Rs 475.30. What went wrong, and what is the right answer?",
        ask: "The right answer?", answer: "474.70", winMs: 7000,
        miss: "Rs 600 has no paise on top. What must happen before the paise?" },
    ],
  },
  {
    n: 4,
    concept: "Change from a payment",
    conceptId: "M2.S3.T5.C19", objectiveIds: ["O8"],
    says: ["The notes paid are on the left, with the bill under them. Set the bill in the frame.", "The change keeps both places of paise."],
    ladder: ["Which is taken from which?", "The money given is the bill and the change together."],
    closing: "The change is the money given less the bill, and adding the change back to the bill checks it.",
    learned: "You learned: change is money given less the bill; add back to check.",
    traceback: "The bill is set under the money given and taken away, a rupee broken into a hundred paise at the paise column, and the change fills the tray with its amount written under it; on the check question the change is added back to the bill, a full strip of paise curls into a rupee, and the sum stands beside the money given.",
    items: [
      /* learn ML4: answer in the plan = Rs 63.60 */
      { qid: "M2.S3.T5.C19:ML4", kind: "change", top: 80000, bot: 73640, paid: [500, 100, 100, 100], lines: [],
        say: "A bill comes to Rs 736.40. The shopper pays with one Rs 500 note and three Rs 100 notes. How much change comes back?",
        ask: "How much change?", answer: "63.60", winMs: 9500,
        miss: "What was paid, and what was the bill?" },
      /* practice 7: answer in the plan = Rs 261.65. The bill comes to Rs 938.35, and Rs 1200 less Rs 938.35 is Rs 261.65. The bill is a step; the question asks for the amount returned */
      { qid: "M2.S3.T5.C19:7", kind: "change", top: 120000, bot: 93835, paid: [500, 500, 200], lines: [["bag", 34850], ["shoes", 52525], ["socks", 6460]],
        say: "A bag costs Rs 348.50 and shoes Rs 525.25. Socks cost Rs 64.60. The shopper pays Rs 1,200 for all three. How much is returned?",
        ask: "How much is returned?", answer: "261.65", winMs: 9500,
        miss: "The bill's total is one step. What comes back to the shopper?" },
      /* practice 8: answer in the plan = Yes. Rs 87.15 and Rs 412.85 make Rs 500.00, which is the money given */
      { qid: "M2.S3.T5.C19:8", kind: "check", op: "add", top: 41285, bot: 8715, paid: [500], lines: [],
        say: "A shopper pays for a Rs 412.85 bill with a Rs 500 note. The shopper is handed Rs 87.15. Is the change right? Check by adding.",
        ask: "Is the change right?", answer: "yes", choices: [{ id: "yes", label: "Yes" }, { id: "no", label: "No" }], winMs: 8000,
        miss: "Add the change to the bill. Do they make the money given?" },
    ],
  },
];

/* The numbers, rows, sizes and targets the working area needs (they go into the sidecar too). */
const MODEL = {
  unit: "paise",                               /* every amount is held in paise: Rs 68.40 = 6840 */
  notes: [500, 200, 100, 50, 20, 10],          /* play notes, all one size */
  coins: [5, 2, 1],                            /* play coins, all one size; no coin below one rupee */
  stripCells: 100,                             /* a strip is one rupee: ten blocks of ten cells */
  frame: {
    lesson: { x: 60, w: 400, dot: 300, pitch: 48, first: 48, sign: 100 },    /* phases 1-3 */
    counter: { x: 290, w: 410, dot: 560, pitch: 44, first: 46, sign: 322 },  /* phase 4 and free play */
  },
  rows: { head: 52, rewrite: 104, top: 172, bottom: 252, rule: 282, answer: 352, cardY: 16, cardH: 368 },
  cells: { x: 540, y: 16, w: 530, h: 268, slots: [580, 830], top: 88, cell: 16, gap: 5 },
  /* phase 4 and free play: the paise on top under the frame's paise side, beside the break key (16 or more
     clear of the frame, the break key and the check key); one strip (cells 14 x 7), or two narrower ones
     when a broken rupee joins paise already there */
  cells4: { x: 574, y: 400, w: 190, h: 126, top: 446, one: { x: 585, cw: 14 }, two: { x: [578, 673], cw: 6 }, ch: 7, gap: 3 },
  tray: { x: 786, y: 16, w: 300, h: 336 },
  checkKey: { x: 786, y: 364, w: 300, h: 72 },
  breakKey: { lesson: { x: 60, y: 430, w: 280 }, counter: { x: 296, y: 430, w: 260 } },
  paidPanel: { x: 0, y: 16, w: 260, h: 268 },
  /* the bill slip stands on the floor of the working area; its height follows its rows (see slipBox) */
  slip: { x: 0, w: 260, floor: 524 },
  freeStart: { top: 50000, bot: 34765 },
};

/* ── money helpers (cc = change counter; runtime names are not reused) ─────────────────── */
const ccP2 = (p: number) => String(Math.round(p) % 100).padStart(2, "0");
const ccRs = (p: number) => Math.floor(Math.round(p) / 100);
/* the written form with Indian commas (1,200.00), as the frame and the labels print it */
const ccAmt = (p: number) => indian(ccRs(p)) + "." + ccP2(p);
/* the form the slot types (no commas: every answer here is under 1,000) */
const ccPlain = (p: number) => String(ccRs(p)) + "." + ccP2(p);
/* notes and coins for a number of rupees, largest first */
const ccPieces = (rupees: number) => {
  const out: number[] = [];
  let r = Math.max(0, Math.floor(rupees));
  for (const v of [...MODEL.notes, ...MODEL.coins]) while (r >= v) { out.push(v); r -= v; }
  return out;
};
const ccClean = (v: any) => String(v ?? "").trim().replace(/^(rs\.?|₹)\s*/i, "").trim();
/* an amount holds at most two places after the dot, and a point typed first stands after a 0 */
const ccTwoPlaces = (s: string) => {
  const c = s.replace(/^(\d*\.\d\d)\d+$/, "$1");
  return c.startsWith(".") ? "0" + c : c;
};
/* drawn money: "Rs 45.25" in English; the language-neutral rupee sign in Hindi and Gujarati ("₹45.25") */
const ccRsOf = (lang: any) => (lang && lang !== "en" ? "₹" : "Rs ");
const ccFormat = (v: any, j?: any, o?: any) => {
  const s = String(v ?? "");
  if (s === "yes") return "Yes";
  if (s === "no") return "No";
  return /^[0-9.]+$/.test(s) ? ccRsOf(o && o.lang) + ccTwoPlaces(s) : s;
};
/* the chapter's content colours as ink: rupees deep blue, paise green, the dot vermilion, a broken or
   carried rupee amber, change reddish purple, the zeros of a whole-rupee amount grey */
const CC = {
  rup: shade(CONTENT.hundred, 0.25), pai: shade(CONTENT.one, 0.25), dot: shade(CONTENT.pointer, 0.2),
  amb: shade(CONTENT.ten, 0.4), chg: shade(CONTENT.bead, 0.25), zero: "#767676",
  cnt: shade("#56B4E9", 0.45),   /* a count of things (how many notes of one value): sky blue, not money */
};

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* judge: an amount with paise in its written form, both places ("63.60", not "63.6" or "63.06"); a
   whole-rupee amount either way ("141" or "141.00", the chapter's rule); a choice by its id */
const judge = (item: any, v: any) => {
  if (item.choices) return String(v ?? "").trim().toLowerCase() === item.answer;
  const s = ccClean(v);
  return s === item.answer || (/\.00$/.test(item.answer) && s === item.answer.slice(0, -3));
};
/* oracle: a second route. The amounts are read back out of the spoken question, and the change is found
   the shopkeeper's way, counting UP from what is taken to what it is taken from (paise to the next whole
   rupee, then whole rupees, then the paise on top); the check item adds with its carry */
const oracle = () => PHASES.every((p: any) => p.items.every((it: any) => {
  const said = (it.say.match(/Rs [\d,]+(\.\d\d)?/g) || []).map((s: string) => {
    const [r, q] = s.slice(3).replace(/,/g, "").split(".");
    return Number(r) * 100 + Number(q || 0);
  });
  if (it.op === "add") {
    let paise = (it.top % 100) + (it.bot % 100), carry = 0;
    while (paise >= 100) { paise -= 100; carry += 1; }
    const rupees = Math.floor(it.top / 100) + Math.floor(it.bot / 100) + carry;
    const paid = it.paid.reduce((a: number, b: number) => a + b, 0);
    return said.includes(it.top) && said.includes(it.bot) && said.includes(paid * 100) && ((paise === 0 && rupees === paid) === (it.answer === "yes"));
  }
  const up = (100 - (it.bot % 100)) % 100, from = it.bot + up;
  const back = up + (Math.floor(it.top / 100) * 100 - from) + (it.top % 100);
  const written = Math.floor(back / 100) + "." + (back % 100 < 10 ? "0" : "") + (back % 100);
  const paid = it.paid ? it.paid.reduce((a: number, b: number) => a + b, 0) * 100 : it.top;
  const sayOk = it.lines && it.lines.length
    ? said.slice(0, it.lines.length).reduce((a: number, b: number) => a + b, 0) === it.bot && said.includes(it.top)
    : said.includes(it.bot) && (it.paid ? paid === it.top : said.includes(it.top));
  return written === it.answer && sayOk && paid === it.top;
}));
/* the item's misconception, which judge must reject */
const nearMiss = (item: any) => {
  const tr = Math.floor(item.top / 100), br = Math.floor(item.bot / 100), tp = item.top % 100, bp = item.bot % 100;
  if (item.choices) return "no";                                                     /* "the change is wrong" */
  if (item.kind === "first") return String(tr - br);                                 /* the rupees only: Rs 45 */
  if (item.kind === "break") return (tr - br) + "." + String(Math.abs(bp - tp)).padStart(2, "0"); /* smaller paise from larger: 288.55 */
  if (item.kind === "zero") return (tr - br) + "." + String(bp).padStart(2, "0");   /* the bottom paise copied down: 243.35 */
  return ccPlain(item.bot);                                                          /* the bill given as the change: 736.40 */
};
/* the forms of an answer that no question, hint or ladder line may print */
const answerForms = (item: any) => (item.choices ? [String(item.answer)] : [item.answer, "Rs " + item.answer, speakable("Rs " + item.answer)]);
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => (!item.choices && /\.00$/.test(item.answer) ? item.answer.slice(0, -3) : item.answer);

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => T.submit(item.answer);
/* the agent's answer(): an amount keeps its point and both paise places (toolApi.answer would strip the
   point, PATTERNS §4), so it is set in the slot as typed; a choice goes to the runtime */
const answer = (item: any, v: any) => (item.choices ? undefined : HOOK.type ? HOOK.type(v) : undefined);
/* nothing waits on the working area: check() presses Enter */
const check = () => undefined;

/* the four steps of adding the change back to the bill (the check): the change slides onto the frame under
   the bill, the bill's paise then the change's pour into one strip, a full strip curls into a rupee that is
   carried, the paise and then the rupees of the sum land, and the sum stands beside the money given */
const ccCheckSteps = (put: (o: any) => void, b: any) => {
  const bill = b.op === "add" ? b.top : b.bot, change = b.op === "add" ? b.bot : b.top - b.bot;
  const full = (bill % 100) + (change % 100) >= 100;
  const s: any[] = [[700, () => put({ check: 1, set: true, tray: false })], [800, () => put({ check: 2 })], [900, () => put({ check: 3 })]];
  if (full) s.push([60, () => put({ check: 4, go: false })], [820, () => put({ go: true })]);
  s.push([800, () => put({ check: 5, go: false })], [800, () => put({ check: 6 })], [0, () => put({ check: 7 })]);
  return s;
};

/* ── the working area: 1086 x 528, origin at its top-left ──────────────────────────────────── */
function Work({ phase, n, item, index, stage, wrong, typed, captured, api, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();
  const free = stage === "free";
  const key = free ? "free" : n + ":" + index;
  const G = free || n === 4 ? "counter" : "lesson";
  const F = (MODEL.frame as any)[G], R = MODEL.rows;
  const RM = reducedMotion();
  const RS = ccRsOf(lang);   /* "Rs " or "₹" before every amount the picture draws */

  /* free play's own payment and bill */
  const [fa, setFa] = useState<any>(MODEL.freeStart);
  const fresh = (): any => (free
    ? { key, top: fa.top, bot: fa.bot, op: "sub", set: true, broken: 0, open: 0, shut: false, land: 0, taken: false, tray: false, check: 0 }
    : { key, top: item.top, bot: item.bot, op: item.op || "sub", set: n !== 4, broken: 0, open: 0, shut: false, land: 0, taken: false, tray: item.op === "add", check: 0 });
  /* the child's own work on this question */
  const [raw, setRaw] = useState<any>(null);
  const own = raw && raw.key === key ? raw : fresh();
  /* a correction or a win, drawn over the child's own work (it never writes into it) */
  const [dm, setDm] = useState<any>(null);
  const v = dm && dm.key === key ? dm : own;
  const shown = !!(dm && dm.key === key);

  const add = (b: any) => b.op === "add";
  const enough = (b: any) => add(b) || (b.top % 100) + (b.broken >= 3 ? 100 : 0) >= b.bot % 100;
  const live = (free || stage === "ask" || stage === "teach") && !tl.busy && !(free && captured);
  /* free play only: a bill more than the money given has no change, so nothing breaks or takes away */
  const over = (b: any) => !add(b) && b.top < b.bot;
  const canBreak = own.set && !add(own) && !over(own) && own.broken === 0 && !enough(own) && ccRs(own.top) >= 1 && own.check === 0;
  /* a refusal is spoken only once the teach is over, so it never cuts the teach or the question short */
  const talk = stage !== "teach";
  const paidAmt = free ? fa.top : (item.paid || []).reduce((a: number, b: number) => a + b, 0) * 100;
  const billAmt = free ? fa.bot : item.op === "add" ? item.top : item.bot;

  /* ── the child's acts ── */
  const act = (o: any) => { setDm(null); setRaw({ ...own, ...o }); };
  const tapPaise = () => {
    if (!live || !own.set || own.open >= 1) return;
    if (over(own)) { if (talk) api.say("The bill is more than the money given."); return; }
    if (!enough(own)) { act({ shut: true }); if (talk) api.say("The paise on top are too few to take from."); return; }
    api.sfx.tick();
    act({ open: 1, shut: false, ...(free ? { land: 1 } : {}) });
  };
  const tapRupees = () => {
    if (!live || !own.set || own.open >= 2) return;
    if (over(own)) { if (talk) api.say("The bill is more than the money given."); return; }
    if (own.open < 1) { if (talk) api.say("Start with the paise, right of the dot."); return; }
    api.sfx.tick();
    const next = { ...own, open: 2, ...(free ? { land: 2 } : {}) };
    act(next);
    if (free && !add(own)) tl.run([[700, () => {}], [0, () => { setRaw({ ...next, tray: true }); api.sfx.tick(); }]]);
  };
  const tapBreak = () => {
    if (!live || !canBreak) return;
    /* the refusal the bubble holds is out of date once the rupee is broken: say what is true now */
    const refused = own.shut && talk;
    setDm(null);
    let cur = { ...own, shut: false, broken: 1 };
    setRaw(cur);
    api.sfx.tick();
    const put = (o: any) => { cur = { ...cur, ...o }; setRaw(cur); };
    tl.run([[520, () => {}], [60, () => put({ broken: 2, go: false })], [820, () => put({ go: true })],
      [0, () => { put({ broken: 3, go: false }); api.sfx.tick(); if (refused) api.say("Now there are enough paise on top."); }]]);
  };
  const tapCheck = () => {
    if (!live) return;
    if (!free) {
      if (n !== 4 || !add(own) || own.set) return;
      api.sfx.tick();
      act({ set: true, tray: false, check: 1 });
      return;
    }
    if (!own.tray && own.check < 7) return;
    let cur = { ...own, check: 0, tray: true, go: false };
    setRaw(cur);
    const put = (o: any) => { cur = { ...cur, ...o }; setRaw(cur); };
    tl.run(ccCheckSteps(put, cur), () => api.say("The change and the bill make the money given."));
  };
  const drag = useDrag((pl: any, at: any, moved: boolean) => {
    if (pl !== "bill" || free || own.set || !live) return;
    const inFrame = !moved || isNaN(at.x) || (at.x >= F.x - 20 && at.x <= F.x + F.w + 20 && at.y >= R.cardY - 20 && at.y <= R.cardY + R.cardH + 20);
    if (inFrame) { api.sfx.tick(); act({ set: true }); }
  });
  const d0 = useRef<any>(null);
  if (drag.drag && !d0.current) d0.current = { x: drag.drag.x, y: drag.drag.y };
  if (!drag.drag) d0.current = null;

  /* free play: the pad is lent to the notes or the bill slip to type a new amount */
  const [ft, setFt] = useState<any>(null);
  const ftRef = useRef<any>(null);
  ftRef.current = ft;
  const faRef = useRef<any>(fa);
  faRef.current = fa;
  /* what was typed becomes the new payment or bill (an empty or zero amount leaves it as it was) */
  const commitTyping = (f: any) => {
    const m = /^(\d{1,4})(?:\.(\d{0,2}))?$/.exec(f.v);
    if (!m) return;
    const p = Number(m[1]) * 100 + Number((m[2] || "").padEnd(2, "0"));
    if (p <= 0) return;
    const nf = { ...faRef.current, [f.which]: p };
    faRef.current = nf;
    setFa(nf);
    setDm(null);
    setRaw({ key: "free", top: nf.top, bot: nf.bot, op: "sub", set: true, broken: 0, open: 0, shut: false, land: 0, taken: false, tray: false, check: 0 });
  };
  const onKey = (k: string) => {
    const f = ftRef.current;
    if (!f) return;
    if (k === "enter") {
      commitTyping(f);
      ftRef.current = null;
      setFt(null);
      api.capture(null);
      return;
    }
    const put = (s: string) => { const nf = { ...f, v: s }; ftRef.current = nf; setFt(nf); };
    if (k === "clear") { put(""); return; }
    if (k === "back") { put(f.v.slice(0, -1)); return; }
    if (k === "point") { if (!f.v.includes(".")) put((f.v || "0") + "."); return; }
    if (/^\d$/.test(k)) {
      const [r, q] = f.v.split(".");
      if (q !== undefined ? q.length < 2 : r.length < 4) put(f.v + k);
    }
  };
  /* a tap on the other panel while one is being typed commits that one and opens the other */
  const openType = (which: string) => {
    if (tl.busy) return;
    if (ftRef.current && ftRef.current.which !== which) commitTyping(ftRef.current);
    const f = { which, v: "" };
    ftRef.current = f;
    setFt(f);
    api.capture(onKey);
  };
  useEffect(() => { if (!captured && ft) setFt(null); }, [captured]);

  /* the answer is typed in the slot; Enter on a lone point is like Enter on nothing ("25." is still an answer) */
  api.onEnter((x: any) => { if (/^0?\.$/.test(String(x ?? ""))) return; api.submit(x); });
  /* a third place after the dot is never kept (the slot's format already never shows it) */
  useEffect(() => {
    if (stage !== "ask") return;
    const s = String(typed ?? ""), c = /^[0-9.]+$/.test(s) ? ccTwoPlaces(s) : s;
    if (c !== s) api.setTyped(c);
  }, [typed]);
  HOOK.type = (x: any) => {
    const s = ccClean(x).replace(/[^0-9.]/g, "").slice(0, 9);
    if (!s) return false;
    api.setTyped(s);
    return true;
  };

  /* a new question (or free play) starts still: nothing left running from the last one's win */
  useEffect(() => { tl.stop(); }, [key]);

  /* the traceback: the maths redrawn from the start on a layer over the child's work, ending on the whole
     answer (the answer line, and on phase 4 the change in the tray, or the check's sum) */
  useEffect(() => {
    if (!wrong || stage !== "ask" || free) return;
    api.lock(true);
    const b0 = { ...fresh(), set: true, tray: false, check: 0 };
    let d: any = { ...b0 };
    const D = (o: any) => { d = { ...d, ...o }; setDm(d); };
    const steps: any[] = [[300, () => D({})]];
    if (add(b0)) steps.push(...ccCheckSteps(D, b0));
    else {
      /* the bill given as the change: the slip's total and the tray's name are ringed together once first */
      if (n === 4 && ccClean(wrong.value) === ccPlain(b0.bot)) steps.push([1800, () => D({ ring: true })], [0, () => D({ ring: false })]);
      steps.push([600, () => D({ lit: true })]);
      if (!enough(b0)) {
        steps.push([900, () => D({ shut: true })], [520, () => D({ shut: false, broken: 1 })], [60, () => D({ broken: 2, go: false })],
          [820, () => D({ go: true })], [500, () => D({ broken: 3, go: false })]);
      }
      steps.push([900, () => D({ open: 1, taken: true, land: 1 })], [700, () => D({ open: 2, land: 2 })]);
      if (n === 4) steps.push([0, () => D({ tray: true })]);
    }
    /* an amount whose paise were given one place ("63.6"): once the correction stands, say why it is two */
    const onePlace = /\.\d$/.test(ccClean(wrong.value));
    tl.run(steps, () => { api.lock(false); if (onePlace) api.say("Paise are written with two digits after the dot."); });
  }, [wrong]);

  /* the win: the child's answer worked on the frame (paise first), then on phase 4 the change fills the
     tray and is added back to the bill */
  useEffect(() => {
    if (stage !== "win" || free) return;
    if (item.qid === "M2.S3.T5.C18:6") api.say("The child wrote the 30 paise down. They had to come from a broken rupee.");
    if (item.qid === "M2.S3.T5.C19:8") api.say("Yes. The bill and the change make Rs 500.00, the money given.");
    const b0 = { ...own, set: true, shut: false, go: false };
    let d: any = { ...b0, broken: own.broken >= 3 ? 3 : 0 };
    const D = (o: any) => { d = { ...d, ...o }; setDm(d); };
    const steps: any[] = [[200, () => D({})]];
    if (add(b0)) steps.push(...ccCheckSteps(D, b0));
    else {
      if (!enough({ ...d })) {
        steps.push([420, () => D({ broken: 1 })], [60, () => D({ broken: 2, go: false })], [720, () => D({ go: true })], [300, () => D({ broken: 3, go: false })]);
      }
      steps.push([700, () => D({ lit: true, open: 1, taken: true, land: 1 })], [800, () => D({ open: 2, land: 2 })]);
      if (n === 4) steps.push([900, () => D({ tray: true })], ...ccCheckSteps(D, b0));
    }
    tl.run(steps);
  }, [stage]);

  /* what the host and the agent read back (toolApi.getState). Before the answer: the child's own work only,
     so nothing answers the question (a correction's picture is not reported); once it is won: what the
     picture draws (the landed columns, the break, the change, the check) */
  const S = shown && (stage === "win" || stage === "idle") ? v : own;
  api.share({
    phase: n, given: ccAmt(free ? fa.top : n === 4 ? paidAmt : own.top), bill: ccAmt(free || n === 4 ? billAmt : own.bot),
    broken: S.broken >= 3, paiseLeft: S.land >= 1 && !add(S) ? ccP2(S.top - S.bot) : null,
    rupeesLeft: S.land >= 2 && !add(S) ? String(ccRs(S.top - S.bot)) : null,
    change: S.tray || (S.check >= 1 && !add(S)) || add(S) ? ccAmt(add(S) ? S.bot : S.top - S.bot) : null, checked: S.check >= 7,
  });

  /* ── drawing (helpers are called, never mounted) ── */
  const colX = (k: number) => F.dot - F.first - k * F.pitch - (k >= 3 ? 14 : 0) - (k >= 5 ? 14 : 0);   /* rupee digit k (0 = ones) */
  const pX = (j: number) => F.dot + F.first + j * F.pitch;                                           /* paise digit j (0 = tens) */
  const pMid = (pX(0) + pX(1)) / 2;
  /* one line of the frame as ONE text (it reads "68.40"): each digit in its column, the dot on the dotted line */
  const line = (id: string, p: number, y: number, o: any = {}) => {
    const r = String(ccRs(p)), q = ccP2(p), sp: any[] = [];
    const size = o.size || T.xl;
    if (!o.paiseOnly) {
      for (let i = 0; i < r.length; i++) {
        const k = r.length - 1 - i;
        sp.push(<tspan key={"r" + i} x={colX(k)} fill={o.ink || CC.rup}>{r[i]}</tspan>);
        if (k === 3 || k === 5) sp.push(<tspan key={"c" + i} x={(colX(k) + colX(k - 1)) / 2} fill={o.ink || CC.rup}>,</tspan>);
      }
      if (!o.noDot) sp.push(<tspan key="dot" x={F.dot} fill={CC.dot} fontSize={o.size ? size : T.display}>.</tspan>);
    }
    if (!o.rupeesOnly) {
      const zero = q === "00" && !o.ink;
      for (let j = 0; j < 2; j++) sp.push(<tspan key={"p" + j} x={pX(j)} fill={zero ? CC.zero : o.ink || CC.pai}>{q[j]}</tspan>);
    }
    const dot = !o.paiseOnly && !o.noDot;
    return (
      <g key={id}>
        <text y={y} textAnchor="middle" fontSize={size} fontWeight={700}>{sp}</text>
        {/* the dot drawn round and clear over the printed point, sitting on the dotted line */}
        {dot && <circle cx={F.dot} cy={y - 8} r={9} fill={CC.dot} />}
      </g>
    );
  };
  /* the one invite: a slow pulse around the one thing to touch (the runtime's pulse, on a rectangle) */
  const pulse = (x: number, y: number, w: number, h: number) => (
    <rect className="c4-pulse" x={x} y={y} width={w} height={h} rx={16} fill="none" stroke={C.accent} strokeWidth={5} pointerEvents="none" />
  );
  const strike = (id: string, x1: number, x2: number, y: number) => (
    <line key={id} x1={x1} y1={y} x2={x2} y2={y} stroke={C.ink} strokeWidth={4} strokeLinecap="round" />
  );

  /* the frame's two lines and its answer, in take-away or (on the check) adding form */
  const inCheck = v.check >= 1;
  const bill = add(v) ? v.top : v.bot, change = add(v) ? v.bot : v.top - v.bot;
  const upper = inCheck ? bill : v.top, lower = inCheck ? change : v.bot;
  const result = inCheck || add(v) ? bill + change : v.top - v.bot;
  const paiseLanded = inCheck ? v.check >= 5 : v.land >= 1;
  const rupeesLanded = inCheck ? v.check >= 6 : v.land >= 2;
  const struck = !inCheck && v.broken >= 1;
  const paiseStruck = !inCheck && v.broken >= 3;
  const carried = inCheck && v.check >= 5 && (bill % 100) + (change % 100) >= 100;
  const rDigits = String(ccRs(upper)).length;
  const bandP = v.set && (v.lit || v.open >= 1);
  const bandR = v.set && v.open >= 2;

  const frame = () => (
    <g>
      <rect x={F.x} y={R.cardY} width={F.w} height={R.cardH} rx={RAD.panel} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} filter="url(#fShadowSoft)" />
      {bandR && <rect x={F.x + 12} y={124} width={F.dot - F.x - 24} height={252} rx={12} fill={tint(CONTENT.hundred, 0.9)} />}
      {bandP && <rect x={F.dot + 12} y={124} width={F.x + F.w - F.dot - 24} height={252} rx={12} fill={tint(CONTENT.one, 0.88)} />}
      <text x={colX(1)} y={R.head} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={CC.rup}>{tx("rupees")}</text>
      <text x={pMid} y={R.head} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={CC.pai}>{tx("paise")}</text>
      <line x1={F.dot} y1={70} x2={F.dot} y2={R.cardY + R.cardH - 14} stroke={C.ink} strokeWidth={4} strokeDasharray="1 11" strokeLinecap="round" />
      <line x1={F.x + 24} y1={R.rule} x2={F.x + F.w - 24} y2={R.rule} stroke={C.ink} strokeWidth={3} />
      {v.set && (
        <g>
          {line("top", upper, R.top)}
          {line("bot", lower, R.bottom)}
          <text x={F.sign} y={R.bottom} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={C.ink}>{inCheck ? "+" : "−"}</text>
          {struck && strike("sr", colX(rDigits - 1) - 22 - (rDigits >= 4 ? 8 : 0), colX(0) + 22, R.top - 20)}
          {struck && line("rr", upper - 100, R.rewrite, { size: T.label, ink: CC.amb, noDot: true, rupeesOnly: true })}
          {paiseStruck && strike("sp", pX(0) - 22, pX(1) + 22, R.top - 20)}
          {paiseStruck && (
            <text x={pMid} y={R.rewrite} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={CC.amb}>{String((upper % 100) + 100)}</text>
          )}
          {carried && (
            <g>
              <circle cx={colX(0)} cy={R.rewrite - 10} r={22} fill="#FFFFFF" stroke={CC.amb} strokeWidth={3} />
              <text x={colX(0)} y={R.rewrite + 1} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={CC.amb}>1</text>
            </g>
          )}
          {!paiseLanded && [0, 1].map((j) => (
            <rect key={"pb" + j} x={pX(j) - 19} y={R.answer - 48} width={38} height={58} rx={6} fill="none" stroke={mix(C.ink, "#FFFFFF", 0.45)} strokeWidth={2} strokeDasharray="6 6" />
          ))}
          {!rupeesLanded && (
            <rect x={colX(2) - 22} y={R.answer - 48} width={colX(0) - colX(2) + 44} height={58} rx={6} fill="none" stroke={mix(C.ink, "#FFFFFF", 0.45)} strokeWidth={2} strokeDasharray="6 6" />
          )}
          {v.shut && !paiseLanded && (
            <g>
              {/* the paise cell shut: a closed box with its lid down */}
              <rect x={pX(0) - 30} y={R.answer - 44} width={pX(1) - pX(0) + 60} height={58} rx={8} fill={tint(C.panel, 0.25)} stroke={C.ink} strokeWidth={2.5} />
              <rect x={pX(0) - 38} y={R.answer - 56} width={pX(1) - pX(0) + 76} height={18} rx={6} fill={shade(C.panel, 0.2)} stroke={C.ink} strokeWidth={2.5} />
            </g>
          )}
          {paiseLanded && line("ans", result, R.answer, rupeesLanded ? {} : { paiseOnly: true })}
        </g>
      )}
    </g>
  );

  /* a strip of a hundred cells in ten blocks of ten: `fill` shaded, the last `gone` of them taken away, and
     `more` cells after them (the check's pour: the change's paise, green like every cell of paise) */
  const strip = (id: string, x: number, y: number, cw: number, ch: number, gap: number, fill: number, o: any = {}) => {
    const cells: any[] = [];
    const gone = o.gone || 0, more = o.more || 0;
    for (let c = 0; c < 100; c++) {
      const bx = x + Math.floor(c / 10) * (cw + gap), cy = y + (c % 10) * ch;
      const f = c < fill - gone ? CONTENT.one : c < fill ? tint(C.panel, 0.15) : c < fill + more ? CONTENT.one : "#FFFFFF";
      cells.push(<rect key={c} x={bx} y={cy} width={cw} height={ch} fill={f} stroke={mix(C.ink, "#FFFFFF", 0.55)} strokeWidth={1} />);
    }
    const w = 10 * cw + 9 * gap;
    return (
      <g key={id}>
        {cells}
        <rect x={x - 3} y={y - 3} width={w + 6} height={10 * ch + 6} rx={4} fill="none" stroke={o.edge || C.ink} strokeWidth={o.edge ? 4 : 2} />
      </g>
    );
  };
  const coin = (id: string, x: number, y: number, label: string, r = 36) => (
    <g key={id} pointerEvents="none">
      <circle cx={x} cy={y} r={r} fill="url(#gTen)" stroke={shade(CONTENT.ten, 0.3)} strokeWidth={3} />
      <text x={x} y={y + 10} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={C.ink}>{label}</text>
    </g>
  );
  const moving = (id: string, s: any, e: any, go: boolean, label: string) => {
    const at = go ? e : s;
    return (
      <g key={id} pointerEvents="none" style={{ transform: `translate(${at.x}px, ${at.y}px)`, transition: RM ? "none" : "transform 760ms ease-in-out" } as any}>
        {coin(id + "c", 0, 0, label)}
      </g>
    );
  };

  /* phases 1-3: the paise on top as cells; a broken rupee's strip lies left of them */
  const cellsPanel = () => {
    const K = MODEL.cells, tp = v.top % 100, bp = v.bot % 100;
    const hasL = !inCheck && v.broken >= 3;
    const goneL = v.taken && hasL ? Math.min(bp, 100) : 0;
    const goneR = v.taken ? bp - goneL : 0;
    return (
      <g>
        <rect x={K.x} y={K.y} width={K.w} height={K.h} rx={RAD.panel} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} />
        <text x={K.x + K.w / 2} y={K.y + 44} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={CC.pai}>{tx("paise on top")}</text>
        {hasL && strip("L", K.slots[0], K.top, K.cell, K.cell, K.gap, 100, { gone: goneL, edge: CC.amb })}
        {strip("R", hasL ? K.slots[1] : K.x + (K.w - (10 * K.cell + 9 * K.gap)) / 2, K.top, K.cell, K.cell, K.gap, tp, { gone: goneR })}
      </g>
    );
  };
  /* phase 4 and free play: the same paise on top, under the frame. From zero paise the broken rupee's
     strip alone becomes the paise on top; the bill's paise are lifted off it when the column takes away */
  const cellsCard = () => {
    if (!v.set || inCheck || add(v)) return null;
    const K = MODEL.cells4, tp = v.top % 100, bp = v.bot % 100;
    const hasL = v.broken >= 3;
    const goneL = v.taken && hasL ? Math.min(bp, 100) : 0;
    const goneR = v.taken ? bp - goneL : 0;
    const two = hasL && tp > 0;
    return (
      <g>
        <rect x={K.x} y={K.y} width={K.w} height={K.h} rx={RAD.panel} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} />
        <text x={K.x + K.w / 2} y={K.y + 30} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={CC.pai}>{tx("paise on top")}</text>
        {two && strip("L4", K.two.x[0], K.top, K.two.cw, K.ch, K.gap, 100, { gone: goneL, edge: CC.amb })}
        {two && strip("R4", K.two.x[1], K.top, K.two.cw, K.ch, K.gap, tp, { gone: goneR })}
        {!two && hasL && strip("L4", K.one.x, K.top, K.one.cw, K.ch, K.gap, 100, { gone: goneL, edge: CC.amb })}
        {!two && !hasL && strip("R4", K.one.x, K.top, K.one.cw, K.ch, K.gap, tp, { gone: goneR })}
      </g>
    );
  };

  /* play notes and coins, each printed with its value; k > 1 = that many of it, a count in sky blue set in
     its own lane above the note (clear of the note and of the row above) */
  const countTag = (x: number, y: number, k: number) => {
    const w = 22 + String(k).length * 17;
    return (
      <g>
        <rect x={x - w} y={y} width={w} height={28} rx={10} fill="#FFFFFF" stroke={CC.cnt} strokeWidth={2.5} />
        <text x={x - w / 2} y={y + 23} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={CC.cnt}>{"×" + k}</text>
      </g>
    );
  };
  const note = (id: string, x: number, y: number, val: number, k = 1) => (
    <g key={id}>
      <rect x={x} y={y} width={108} height={40} rx={6} fill={tint(CONTENT.hundred, 0.78)} stroke={shade(CONTENT.hundred, 0.2)} strokeWidth={2} />
      <text x={x + 54} y={y + 30} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={CC.rup}>{RS + val}</text>
      {k > 1 && countTag(x + 108, y - 30, k)}
    </g>
  );
  /* what is not drawn as a note or coin, still shown so the picture adds up to the amount: a quiet chip */
  const restChip = (id: string, x: number, y: number, rest: number) => {
    const s = lang !== "en" ? "+ ₹" + rest : ("+ Rs " + rest).length > 7 ? "+Rs " + rest : "+ Rs " + rest;
    return (
      <g key={id}>
        <rect x={x} y={y} width={108} height={40} rx={6} fill={tint(CONTENT.hundred, 0.92)} stroke={shade(CONTENT.hundred, 0.2)} strokeWidth={2} strokeDasharray="6 5" />
        <text x={x + 54} y={y + 30} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={CC.rup}>{s}</text>
      </g>
    );
  };
  const disc = (id: string, x: number, y: number, val: number) => (
    <g key={id}>
      <circle cx={x} cy={y} r={32} fill="#C8D0D6" stroke="#7D8A94" strokeWidth={2} />
      <text x={x} y={y + 10} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={CC.rup}>{RS + val}</text>
    </g>
  );
  /* notes two across (10 apart) in at most two rows, coins in one row under them (a greedy amount never needs
     more than three coins). More than four notes: each value is drawn once with how many of it, each row with
     a lane above it for the count; at most four tiles, the last a "+ Rs n" chip for whatever is left (the
     smallest values and the coins), so what is drawn always adds up to the amount */
  const money = (id: string, pieces: number[], x: number, y: number, coinY: number, laneY: number) => {
    const ns = pieces.filter((p) => p >= 10), cs = pieces.filter((p) => p < 10);
    if (ns.length <= 4) return (
      <g key={id}>
        {ns.map((p, i) => note(id + "n" + i, x + (i % 2) * 118, y + Math.floor(i / 2) * 50, p))}
        {cs.slice(0, 3).map((p, i) => disc(id + "c" + i, x + 34 + i * 76, coinY, p))}
      </g>
    );
    const tiles = Array.from(new Set(ns)).map((val) => ({ val, k: ns.filter((b) => b === val).length }));
    const coins = cs.reduce((a, b) => a + b, 0), all = pieces.reduce((a, b) => a + b, 0);
    const show = tiles.length + (coins > 0 ? 1 : 0) > 4 ? tiles.slice(0, 3) : tiles;
    const rest = all - show.reduce((a, t) => a + t.val * t.k, 0);
    const at = (i: number) => ({ x: x + (i % 2) * 118, y: laneY + 30 + Math.floor(i / 2) * 76 });
    return (
      <g key={id}>
        {show.map((t, i) => note(id + "n" + i, at(i).x, at(i).y, t.val, t.k))}
        {rest > 0 && restChip(id + "r", at(show.length).x, at(show.length).y, rest)}
      </g>
    );
  };

  /* phase 4 and free play: the money given, the bill slip, the change tray */
  const typing = (which: string) => ft && ft.which === which;
  const paidPanel = () => {
    const P = MODEL.paidPanel;
    const pieces = free ? ccPieces(ccRs(fa.top)) : item.paid || [];
    const label = typing("top") ? RS + ft.v : RS + (paidAmt % 100 ? ccAmt(paidAmt) : indian(ccRs(paidAmt)));
    return (
      <g>
        <rect x={P.x} y={P.y} width={P.w} height={P.h} rx={RAD.panel} fill={tint(C.panel, 0.55)} stroke={typing("top") ? C.accent : C.rule} strokeWidth={typing("top") ? 4 : 2} />
        {money("paid", pieces, 12, 36, 170, 28)}
        <text x={P.x + 20} y={240} fontSize={T.label} fontWeight={700} fill={CC.rup}>{label}</text>
        {typing("top") && <rect className="c4-caret" x={P.x + 26 + label.length * 19} y={212} width={4} height={34} rx={2} fill={C.accent} />}
        {v.check >= 7 && <text x={P.x + 20} y={270} fontSize={T.label} fontWeight={700} fill={C.ink}>{"= " + RS + ccAmt(bill + change)}</text>}
        {free && <Hit id="type-paid" x={P.x} y={P.y} w={P.w} h={P.h} onPress={() => openType("top")} label="type the money given" enabled={!typing("top") && !tl.busy} />}
      </g>
    );
  };
  /* the slip's height follows its rows: the heading, a row a thing bought, the rule and the total */
  const slipRows = free ? [] : item.lines || [];
  const slipRule = slipRows.length ? 74 + 32 * (slipRows.length - 1) + 22 : 60;
  const slipH = slipRule + 64;
  const SB = { x: MODEL.slip.x, w: MODEL.slip.w, h: slipH, y: MODEL.slip.floor - slipH };
  const slipFace = () => {
    const S = SB;
    const total = typing("bot") ? RS + ft.v : RS + ccAmt(billAmt);
    const ty = S.y + slipRule + 40;
    return (
      <g>
        <rect x={S.x} y={S.y} width={S.w} height={S.h} rx={10} fill="#FFFFFF" stroke={typing("bot") ? C.accent : C.ink} strokeWidth={typing("bot") ? 4 : 2} filter="url(#fShadowSoft)" />
        <text x={S.x + 16} y={S.y + 36} fontSize={T.micro} fontWeight={700} fill={C.ink}>{tx("bill")}</text>
        {slipRows.map((r: any, i: number) => (
          <g key={"ln" + i}>
            <text x={S.x + 16} y={S.y + 74 + i * 32} fontSize={T.micro} fontWeight={500} fill={C.ink}>{tx(r[0])}</text>
            <text x={S.x + S.w - 16} y={S.y + 74 + i * 32} textAnchor="end" fontSize={T.micro} fontWeight={500} fill={C.ink}>{ccAmt(r[1])}</text>
          </g>
        ))}
        <line x1={S.x + 14} y1={S.y + slipRule} x2={S.x + S.w - 14} y2={S.y + slipRule} stroke={C.ink} strokeWidth={2} />
        <text x={S.x + 16} y={ty} fontSize={T.micro} fontWeight={700} fill={C.ink}>{tx("total")}</text>
        <text x={S.x + S.w - 16} y={ty} textAnchor="end" fontSize={T.micro} fontWeight={700} fill={C.ink}>{total}</text>
        {v.ring && <rect x={S.x + 6} y={ty - 30} width={S.w - 12} height={42} rx={12} fill="none" stroke={C.ink} strokeWidth={4} pointerEvents="none" />}
        {typing("bot") && <rect className="c4-caret" x={S.x + S.w - 12} y={ty - 26} width={4} height={32} rx={2} fill={C.accent} />}
      </g>
    );
  };
  const slip = () => {
    const S = SB;
    const canDrag = !free && n === 4 && !add(own) && !own.set && live;
    if (free) return (
      <g>
        {slipFace()}
        <Hit id="type-bill" x={S.x} y={S.y} w={S.w} h={S.h} onPress={() => openType("bot")} label="type the bill" enabled={!typing("bot") && !tl.busy} />
      </g>
    );
    if (!canDrag) return slipFace();
    const dd = drag.drag && drag.drag.payload === "bill" && d0.current ? { x: drag.drag.x - d0.current.x, y: drag.drag.y - d0.current.y } : { x: 0, y: 0 };
    return (
      <g {...control("bill", "bill slip: set it under the money given")} {...drag.bind("bill")} {...drag.keys("bill")}
        transform={`translate(${dd.x},${dd.y})`} filter={drag.drag ? "url(#fLift)" : undefined}>
        {slipFace()}
      </g>
    );
  };
  const tray = () => {
    const Y = MODEL.tray;
    const amt = add(v) ? v.bot : v.top - v.bot;
    const K = { x: Y.x + 66, y: Y.y + 104, cw: 14, ch: 12, gap: 3 };
    const billP = bill % 100, chP = change % 100;
    return (
      <g>
        <rect x={Y.x} y={Y.y} width={Y.w} height={Y.h} rx={RAD.panel} fill="#FFFFFF" stroke={shade(CONTENT.bead, 0.1)} strokeWidth={3} />
        <text x={Y.x + 16} y={Y.y + 40} fontSize={T.micro} fontWeight={600} fill={CC.chg}>{tx("change")}</text>
        {v.ring && <rect x={Y.x + 6} y={Y.y + 10} width={lang === "en" ? 124 : lang === "gu" ? 172 : 150} height={42} rx={12} fill="none" stroke={CC.chg} strokeWidth={4} pointerEvents="none" />}
        {v.tray && !inCheck && (
          <text x={Y.x + Y.w - 16} y={Y.y + 42} textAnchor="end" fontSize={(RS + ccAmt(amt)).length > 9 ? T.micro : T.label} fontWeight={700} fill={CC.chg}>{RS + ccAmt(amt)}</text>
        )}
        {v.tray && !inCheck && money("tray", ccPieces(ccRs(amt)), Y.x + 32, Y.y + 72, Y.y + 208, Y.y + 50)}
        {v.tray && !inCheck && strip("ts", Y.x + 32, Y.y + 252, 12, 7, 3, amt % 100)}
        {inCheck && v.check >= 2 && v.check <= 3 && strip("pour", K.x, K.y, K.cw, K.ch, K.gap, billP, { more: v.check >= 3 ? Math.min(chP, 100 - billP) : 0 })}
        {inCheck && v.check === 4 && moving("curl", { x: K.x + 83, y: K.y + 60 }, { x: colX(0), y: R.rewrite - 10 }, !!v.go, RS + "1")}
        {inCheck && v.check >= 5 && billP + chP < 100 && billP + chP > 0 && strip("rest", K.x, K.y, K.cw, K.ch, K.gap, billP, { more: chP })}
        {inCheck && v.check >= 5 && billP + chP > 100 && strip("rest", K.x, K.y, K.cw, K.ch, K.gap, 0, { more: billP + chP - 100 })}
      </g>
    );
  };

  /* the break's rupee: it rises from the struck figure and crosses the dotted line to the paise */
  const breakCoin = () => {
    if (inCheck || v.broken !== 2) return null;
    const s = { x: colX(0) + 10, y: R.top - 64 };
    const K4 = MODEL.cells4;
    const e = G === "lesson" ? { x: MODEL.cells.slots[0] + 102, y: MODEL.cells.top + 80 }
      : { x: (v.top % 100 ? K4.two.x[0] + 43 : K4.one.x + 83), y: K4.top + 35 };
    return moving("brk", s, e, !!v.go, RS + "1");
  };

  /* the running count: columns taken away (phase 4 adds the check as a third step) */
  const total = G === "counter" ? 3 : 2;
  const done = stage === "win" || stage === "idle" ? total : Math.min(total, own.open + (own.check >= 1 ? 1 : 0));
  const runs = () => (
    <g data-zone="runs">
      <rect x={0} y={-94} width={330} height={76} rx={RAD.panel} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} />
      <text x={24} y={-44} fontSize={T.label} fontWeight={600} fill={C.ink}>{tx(G === "counter" ? "steps" : "columns")}</text>
      <text x={306} y={-38} textAnchor="end" fontSize={T.speech} fontWeight={700} fill={C.ink}>{done + " / " + total}</text>
    </g>
  );

  /* the keys on the working area */
  const BK = (MODEL.breakKey as any)[G], CK = MODEL.checkKey;
  const showBreak = free || n >= 2;
  const checkOn = live && (free ? own.tray || own.check >= 7 : n === 4 && add(own) && !own.set);
  const keyText = (s: string, on: boolean) => (
    <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={on ? C.ink : mix(C.ink, "#FFFFFF", 0.4)}>{tx(s)}</text>
  );

  /* the one invite */
  let inv: any = null;
  if (live && !free && !shown) {
    const S = SB;
    const colP = [F.dot + 8, 124, F.x + F.w - F.dot - 18, 252], colR = [F.x + 10, 124, F.dot - F.x - 18, 252];
    if (G === "counter" && !own.set) inv = add(own) ? [CK.x + 2, CK.y - 4, CK.w - 4, 82] : [S.x + 4, S.y + 4, S.w - 8, S.h - 8];
    else if (own.set && own.open === 0) inv = own.shut && canBreak ? [BK.x - 6, BK.y - 6, BK.w + 12, 86] : colP;
    else if (own.set && own.open === 1) inv = colR;
  }

  const hitsOn = live && own.set;
  return (
    <g>
      {runs()}
      {frame()}
      {G === "lesson" && cellsPanel()}
      {G === "counter" && cellsCard()}
      {G === "counter" && paidPanel()}
      {G === "counter" && tray()}
      {G === "counter" && slip()}
      {/* the keyboard order is the method's: the paise first, the break, then the rupees, then the check */}
      {hitsOn && own.open === 0 && <Hit id="col-paise" x={F.dot + 8} y={128} w={F.x + F.w - F.dot - 18} h={248} onPress={tapPaise} label={add(own) ? "add the paise" : "take away the paise"} />}
      {showBreak && (
        <Key id="break" x={BK.x} y={BK.y} w={BK.w} h={72} C={C} onClick={tapBreak} disabled={!(live && canBreak)} label="break a rupee into a hundred paise">
          {keyText("break a rupee", live && canBreak)}
        </Key>
      )}
      {hitsOn && own.open <= 1 && <Hit id="col-rupees" x={F.x + 10} y={128} w={F.dot - F.x - 18} h={248} onPress={tapRupees} label={add(own) ? "add the rupees" : "take away the rupees"} />}
      {G === "counter" && (
        <Key id="check" x={CK.x} y={CK.y} w={CK.w} h={CK.h} C={C} onClick={tapCheck} disabled={!checkOn} label="check by adding the change to the bill">
          {keyText("check", !!checkOn)}
        </Key>
      )}
      {breakCoin()}
      {inv && pulse(inv[0], inv[1], inv[2], inv[3])}
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase */
function Thumb({ result, C, w, h, lang = "en", tx = (v: any) => v }: any) {
  const last = result && result.last;
  if (!last || last.value === null || last.value === undefined) return null;
  const sh = last.shared || {};
  const ph: any = PHASES.find((p: any) => p.n === sh.phase);
  const it = ph ? ph.items[last.item] : null;
  const card = <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />;
  /* the check question: the change that was checked, with its own paise on a strip as the tray shows them */
  if (it && it.choices) {
    const two = h >= 76, s = Math.min(40, h - 20), cell = s / 10, p = it.bot % 100;
    return (
      <g>
        {card}
        {two ? (
          <g>
            <text x={16} y={h / 2 - 6} fontSize={T.micro} fontWeight={600} fill={CC.chg}>{tx("change")}</text>
            <text x={16} y={h / 2 + 28} fontSize={T.micro} fontWeight={700} fill={C.ink}>{ccRsOf(lang) + ccAmt(it.bot)}</text>
          </g>
        ) : <text x={16} y={h / 2 + 10} fontSize={T.micro} fontWeight={700} fill={CC.chg}>{ccRsOf(lang) + ccAmt(it.bot)}</text>}
        <g>
          {Array.from({ length: 100 }).map((_, c) => (
            <rect key={c} x={w - 16 - s + Math.floor(c / 10) * cell} y={h / 2 - s / 2 + (c % 10) * cell} width={cell} height={cell}
              fill={c < p ? CONTENT.one : "#FFFFFF"} stroke={mix(C.ink, "#FFFFFF", 0.6)} strokeWidth={0.6} />
          ))}
          <rect x={w - 16 - s} y={h / 2 - s / 2} width={s} height={s} fill="none" stroke={C.ink} strokeWidth={1.5} />
        </g>
      </g>
    );
  }
  const amt = ccClean(last.value);
  const [r, q] = amt.split(".");
  return (
    <g>
      {card}
      <text x={w - 16} y={h / 2 + 12} textAnchor="end" fontSize={T.label} fontWeight={700}>
        <tspan fill={C.ink}>{ccRsOf(lang)}</tspan><tspan fill={CC.rup}>{r}</tspan><tspan fill={CC.dot}>.</tspan><tspan fill={CC.pai}>{q || ""}</tspan>
      </text>
    </g>
  );
}

function ChangeCounter(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, pointKey: true, format: ccFormat, fitHost: () => null }} />
  );
}

export default ChangeCounter;
