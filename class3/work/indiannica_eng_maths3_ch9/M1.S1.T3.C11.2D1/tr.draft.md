# Length Converter (M1.S1.T3.C11.2D1), class 3 ch 9: Hindi and Gujarati draft

Draft for the language pass (`TR` in `tool.tsx`, PATTERNS section 11). Keys are the English byte for byte (the script that wrote
this file checked that every English cell occurs verbatim in `tool.tsx`, that every digit group of the English is in both
translations, that no cell has a `|`, that no hi/gu cell has Latin letters, that learned lines carry no full stop and are at
most 72 characters, and that every bubble line keeps its full stop `।` / `.` and every question its `?`). Built from the digest
`c33473ae57a9b37d` (111 printed lines) plus the 12 item `win` lines (data, `api.say(item.win)`, taken from `tool.tsx`).
Not for a native speaker's final word: see "Please have a native speaker read" at the end.

## How to use

- Section A is the whole printed text in file order (digest order; each item's `win` line sits right after its two ladder rungs).
- Section B is the words `Work` draws through `tx()` that the digest does not list (key labels and tag words). Without an entry they stay English.
- Section C is text that is in the source but not printed now (kept so a later change cannot show English). Optional.
- No `aria-label` exists in `tool.tsx` (Grep found none); a `Key`'s label is `tx(LC_KEYS[...])`, so Section B covers it.
- `traceback` strings are sidecar notes, not printed: not translated.
- Units: English `cm` / `m` / `km` become short Hindi सेमी / मी / किमी and Gujarati સેમી / મી / કિમી (the three one-word rows `m`, `cm`, `km` in section A; `Work`, the chips, the answer slot and the summary thumbnails all look them up; the summary thumbnail prints nothing for a unit that has no entry). The long words (centimetres, metres, kilometres) become सेंटीमीटर / मीटर / किलोमीटर and સેન્ટીમીટર / મીટર / કિલોમીટર, as in Measure It. Digits, `+`, `−`, `=` stay as written.
- The four `You learned:` lines and the concept titles have no full stop, as in the English. Question lines keep `?`.

## Term choices (used the same way in every row)

| English | Hindi | Gujarati | Note |
|---|---|---|---|
| carry (key, act) | हासिल / हासिल लो | વદી / વદી લો | PATTERNS 11 fixes हासिल / વદી; Gujarati to be confirmed |
| borrow (key, act) | उधार / उधार लो | ઉછીના / ઉછીના લો | not fixed by PATTERNS; to be confirmed |
| column | खाना | કૉલમ | "m column" = मी का खाना / મી કૉલમ |
| break (key) | तोड़ो | તોડો | imperative on the key, like Measure It's Mark and Halves |
| cut (key) | काटो | કાપો | |
| slide (key) | सरकाओ | સરકાવો | |
| leftover / left over / Left | बचा हुआ / बचा | બાકી | |
| rod, ribbon, post | छड़, रिबन, खंभा | સળિયો, રિબન, થાંભલો | छड़ / સળિયા as in Measure It |
| tap (a key) | बटन छुओ | બટનને સ્પર્શ કરો | as in Measure It |
| Answer / Given | उत्तर / दिया है | જવાબ / આપેલું | |
| hundreds, tens place | सैकड़ा, दहाई | શતક, દશક | PATTERNS 11 |
| zero | शून्य | શૂન્ય | |
| train track | रेलवे लाइन | રેલવે લાઇન | not पटरी, which is the ruler |

## A. Printed lines, in file order

| English | Hindi | Gujarati |
|---|---|---|
| Length Converter | लंबाई बदलो | લંબાઈ બદલો |
| Free play: break rods, cut ribbons, slide posts and carry centimetres. | मुक्त खेल: छड़ तोड़ो, रिबन काटो, खंभा सरकाओ, हासिल लो। | મુક્ત રમત: સળિયો તોડો, રિબન કાપો, થાંભલો સરકાવો, વદી લો. |
| How many centimetres hide inside one metre rod? | एक मीटर की छड़ में कितने सेंटीमीटर छिपे हैं? | એક મીટરના સળિયામાં કેટલા સેન્ટીમીટર છુપાયેલા છે? |
| Metres into centimetres: multiply by 100 | मीटर से सेंटीमीटर: 100 से गुणा करो | મીટરમાંથી સેન્ટીમીટર: 100 વડે ગુણો |
| Tap Break to break each metre rod into centimetres. | तोड़ो बटन छुओ। हर छड़ सेंटीमीटर में टूटेगी। | તોડો બટનને સ્પર્શ કરો. દરેક સળિયો સેન્ટીમીટરમાં તૂટશે. |
| The Break key is under the rods. | तोड़ो बटन छड़ों के नीचे है। | તોડો બટન સળિયાની નીચે છે. |
| Break one metre at a time and count the lots of 100. | एक बार में एक मीटर तोड़ो। 100 के समूह गिनो। | એક વારમાં એક મીટર તોડો. 100 ના સમૂહ ગણો. |
| Write the hundreds from the rods, then the centimetres from the piece. | छड़ों से सैकड़े लिखो। फिर टुकड़े से सेंटीमीटर लिखो। | સળિયા પરથી શતક લખો. પછી ટુકડા પરથી સેન્ટીમીટર લખો. |
| To change metres into centimetres multiply by 100 and add the centimetres. | सेंटीमीटर के लिए मीटर को 100 से गुणा करो। फिर सेंटीमीटर जोड़ो। | મીટરમાંથી સેન્ટીમીટર બનાવવા 100 વડે ગુણો. પછી સેન્ટીમીટર ઉમેરો. |
| You learned: 1 m is 100 cm, so multiply metres by 100 for centimetres | तुमने सीखा: 1 मी में 100 सेमी होते हैं, इसलिए मीटर को 100 से गुणा करो | તમે શીખ્યા: 1 મીમાં 100 સેમી હોય છે, તેથી મીટરને 100 વડે ગુણો |
| How many centimetres long is a kite string of 6 m 37 cm? | पतंग की डोर 6 मी 37 सेमी लंबी है। यह कितने सेंटीमीटर लंबी है? | પતંગની દોરી 6 મી 37 સેમી લાંબી છે. તે કેટલા સેન્ટીમીટર લાંબી છે? |
| 6 m 37 cm in cm? | 6 मी 37 सेमी में कितने सेमी? | 6 મી 37 સેમીમાં કેટલા સેમી? |
| Change the metres into centimetres before you add the piece. | पहले मीटर को सेंटीमीटर बनाओ। फिर टुकड़ा जोड़ो। | પહેલાં મીટરને સેન્ટીમીટરમાં બદલો. પછી ટુકડો ઉમેરો. |
| Count 100 cm for every rod, then add the short piece. | हर छड़ के 100 सेमी गिनो। फिर छोटा टुकड़ा जोड़ो। | દરેક સળિયાના 100 સેમી ગણો. પછી નાનો ટુકડો ઉમેરો. |
| Six rods make 600 cm, so add the 37 cm piece to that. | छह छड़ों के 600 सेमी होते हैं। इसमें 37 सेमी का टुकड़ा जोड़ो। | છ સળિયાના 600 સેમી થાય. તેમાં 37 સેમીનો ટુકડો ઉમેરો. |
| Yes, 6 m 37 cm is 637 cm. | हाँ, 6 मी 37 सेमी यानी 637 सेमी। | હા, 6 મી 37 સેમી એટલે 637 સેમી. |
| A garden hose is 5 m 7 cm long; write its length in centimetres. | बगीचे का पाइप 5 मी 7 सेमी लंबा है। उसकी लंबाई सेंटीमीटर में लिखो। | બગીચાની નળી 5 મી 7 સેમી લાંબી છે. તેની લંબાઈ સેન્ટીમીટરમાં લખો. |
| 5 m 7 cm in cm? | 5 मी 7 सेमी में कितने सेमी? | 5 મી 7 સેમીમાં કેટલા સેમી? |
| The metres make hundreds of centimetres. | मीटर से सैकड़ों सेंटीमीटर बनते हैं। | મીટરથી સેંકડો સેન્ટીમીટર બને છે. |
| A 7 cm piece has no tens, so the tens place needs a zero. | 7 सेमी के टुकड़े में दहाई नहीं है। इसलिए दहाई के स्थान पर शून्य चाहिए। | 7 સેમીના ટુકડામાં દશક નથી. તેથી દશકના સ્થાને શૂન્ય જોઈએ. |
| Five rods make 500 cm, and the 7 cm piece adds only 7 more. | पाँच छड़ों के 500 सेमी होते हैं। 7 सेमी का टुकड़ा बस 7 और जोड़ता है। | પાંચ સળિયાના 500 સેમી થાય. 7 સેમીનો ટુકડો ફક્ત 7 વધુ ઉમેરે છે. |
| Right, the hose is 507 cm long, with a zero for the tens. | सही, पाइप 507 सेमी लंबा है। दहाई में शून्य लिखा है। | સાચું, નળી 507 સેમી લાંબી છે. દશકમાં શૂન્ય લખ્યું છે. |
| Change 13 m, the length of a school wall, into centimetres. | स्कूल की दीवार 13 मी लंबी है। इसे सेंटीमीटर में बदलो। | શાળાની દીવાલ 13 મી લાંબી છે. તેને સેન્ટીમીટરમાં બદલો. |
| 13 m in cm? | 13 मी में कितने सेमी? | 13 મીમાં કેટલા સેમી? |
| The wall has no short piece; every rod is a whole metre. | दीवार में कोई छोटा टुकड़ा नहीं है। हर छड़ पूरा एक मीटर है। | દીવાલમાં કોઈ નાનો ટુકડો નથી. દરેક સળિયો પૂરો એક મીટર છે. |
| Count the rods in centimetres: 100 cm, 200 cm, 300 cm and on. | छड़ों को सेंटीमीटर में गिनो। 100 सेमी, 200 सेमी, 300 सेमी, और आगे। | સળિયાને સેન્ટીમીટરમાં ગણો. 100 સેમી, 200 સેમી, 300 સેમી, અને આગળ. |
| Ten rods make 1,000 cm; count on 100 cm for each rod after them. | दस छड़ों के 1,000 सेमी होते हैं। इसके बाद हर छड़ पर 100 सेमी जोड़ते जाओ। | દસ સળિયાના 1,000 સેમી થાય. પછી દરેક સળિયા પર 100 સેમી ઉમેરતા જાઓ. |
| Well done, the wall is 1,300 cm long. | शाबाश, दीवार 1,300 सेमी लंबी है। | શાબાશ, દીવાલ 1,300 સેમી લાંબી છે. |
| Centimetres into metres: divide by 100 | सेंटीमीटर से मीटर: 100 से भाग दो | સેન્ટીમીટરમાંથી મીટર: 100 વડે ભાગો |
| Tap Cut to cut the ribbon into pieces of 1 m. | काटो बटन छुओ। रिबन 1 मी के टुकड़ों में कटेगा। | કાપો બટનને સ્પર્શ કરો. રિબન 1 મીના ટુકડામાં કપાશે. |
| The Cut key is under the ribbon. | काटो बटन रिबन के नीचे है। | કાપો બટન રિબનની નીચે છે. |
| Each 100 cm makes one metre piece. | हर 100 सेमी से एक मीटर का टुकड़ा बनता है। | દરેક 100 સેમીથી એક મીટરનો ટુકડો બને છે. |
| Metres first, then the centimetres that do not make a metre. | पहले मीटर, फिर बचे हुए सेंटीमीटर। | પહેલાં મીટર, પછી બાકી રહેલા સેન્ટીમીટર. |
| Divide by 100 for metres and the last two digits are the centimetres. | मीटर के लिए 100 से भाग दो। आख़िरी दो अंक सेंटीमीटर हैं। | મીટર માટે 100 વડે ભાગો. છેલ્લા બે અંક સેન્ટીમીટર છે. |
| You learned: 100 cm make 1 m, and the last two digits are the cm | तुमने सीखा: 100 सेमी का 1 मी होता है, और आख़िरी दो अंक सेमी हैं | તમે શીખ્યા: 100 સેમીનો 1 મી થાય, અને છેલ્લા બે અંક સેમી છે |
| How many metres and centimetres is a ribbon of 834 cm on a reel? | रील पर लिपटा रिबन 834 सेमी का है। वह कितने मीटर और सेंटीमीटर का है? | રીલ પરની રિબન 834 સેમીની છે. તે કેટલા મીટર અને સેન્ટીમીટરની છે? |
| 834 cm in m and cm? | 834 सेमी में कितने मी और सेमी? | 834 સેમીમાં કેટલા મી અને સેમી? |
| Only the 1 m pieces count as metres. | सिर्फ़ 1 मी के टुकड़े ही मीटर गिने जाते हैं। | ફક્ત 1 મીના ટુકડા જ મીટર ગણાય છે. |
| The piece left over is shorter than 1 m, so it stays in centimetres. | बचा हुआ टुकड़ा 1 मी से छोटा है। इसलिए वह सेंटीमीटर में ही रहता है। | બાકી રહેલો ટુકડો 1 મીથી નાનો છે. તેથી તે સેન્ટીમીટરમાં જ રહે છે. |
| The last two digits of 834 are the centimetres left over. | 834 के आख़िरी दो अंक बचे हुए सेंटीमीटर हैं। | 834 ના છેલ્લા બે અંક બાકી સેન્ટીમીટર છે. |
| Yes, 834 cm is 8 m 34 cm. | हाँ, 834 सेमी यानी 8 मी 34 सेमी। | હા, 834 સેમી એટલે 8 મી 34 સેમી. |
| metres | मीटर | મીટર |
| m | मी | મી |
| left over | बचा हुआ | બાકી |
| cm | सेमी | સેમી |
| Write a ribbon of 605 cm in metres and centimetres. | रिबन 605 सेमी का है। उसकी लंबाई मीटर और सेंटीमीटर में लिखो। | રિબન 605 સેમીની છે. તેની લંબાઈ મીટર અને સેન્ટીમીટરમાં લખો. |
| 605 cm in m and cm? | 605 सेमी में कितने मी और सेमी? | 605 સેમીમાં કેટલા મી અને સેમી? |
| Count the 1 m pieces, then look at the tiny piece left. | 1 मी के टुकड़े गिनो। फिर बचा हुआ छोटा टुकड़ा देखो। | 1 મીના ટુકડા ગણો. પછી બાકી રહેલો નાનો ટુકડો જુઓ. |
| The tiny end piece is not a whole metre; leave it out of the metres. | आख़िरी छोटा टुकड़ा पूरा मीटर नहीं है। उसे मीटर में मत गिनो। | છેલ્લો નાનો ટુકડો પૂરો મીટર નથી. તેને મીટરમાં ન ગણો. |
| Take away the 1 m pieces; the centimetres under 100 are the rest. | 1 मी के टुकड़े हटा दो। 100 से कम सेंटीमीटर बाकी बचते हैं। | 1 મીના ટુકડા કાઢી નાખો. 100 થી ઓછા સેન્ટીમીટર બાકી રહે છે. |
| Right, the ribbon is 6 m 5 cm long. | सही, रिबन 6 मी 5 सेमी लंबा है। | સાચું, રિબન 6 મી 5 સેમી લાંબી છે. |
| Change a ribbon as long as a train coach, 1,867 cm, into m and cm. | रेल के डिब्बे जितना लंबा रिबन 1,867 सेमी का है। उसे मी और सेमी में बदलो। | રેલના ડબ્બા જેટલી લાંબી રિબન 1,867 સેમીની છે. તેને મી અને સેમીમાં બદલો. |
| 1,867 cm in m and cm? | 1,867 सेमी में कितने मी और सेमी? | 1,867 સેમીમાં કેટલા મી અને સેમી? |
| Count the whole 1 m pieces, row by row. | पूरे 1 मी के टुकड़े गिनो, एक-एक पंक्ति करके। | આખા 1 મીના ટુકડા ગણો, એક એક હરોળ કરીને. |
| Count the rows of 5 m first, then the single pieces after them. | पहले 5 मी की पंक्तियाँ गिनो। फिर उनके बाद के अकेले टुकड़े। | પહેલાં 5 મીની હરોળ ગણો. પછી તેના પછીના એકલા ટુકડા. |
| Cover the last two digits of 1,867; the digits before them are the metres. | 1,867 के आख़िरी दो अंक ढक दो। उनसे पहले के अंक मीटर हैं। | 1,867 ના છેલ્લા બે અંક ઢાંકી દો. તેની પહેલાંના અંક મીટર છે. |
| Well done, 1,867 cm makes 18 m 67 cm. | शाबाश, 1,867 सेमी से 18 मी 67 सेमी बनता है। | શાબાશ, 1,867 સેમીમાંથી 18 મી 67 સેમી બને છે. |
| Kilometres and metres: use 1000 | किलोमीटर और मीटर: 1000 का उपयोग करो | કિલોમીટર અને મીટર: 1000 વાપરો |
| Tap Slide to move the post along the road 1 km at a time. | सरकाओ बटन छुओ। खंभा एक बार में 1 किमी आगे जाएगा। | સરકાવો બટનને સ્પર્શ કરો. થાંભલો એક વારમાં 1 કિમી આગળ જશે. |
| The Slide key is under the road. | सरकाओ बटन सड़क के नीचे है। | સરકાવો બટન રસ્તાની નીચે છે. |
| Slide one kilometre at a time and count the stops. | एक बार में एक किलोमीटर सरकाओ। पड़ाव गिनो। | એક વારમાં એક કિલોમીટર સરકાવો. પડાવ ગણો. |
| Kilometres to metres is times 1,000, and back is divided by 1,000. | किलोमीटर से मीटर: 1,000 से गुणा। मीटर से किलोमीटर: 1,000 से भाग। | કિલોમીટરથી મીટર: 1,000 વડે ગુણાકાર. મીટરથી કિલોમીટર: 1,000 વડે ભાગાકાર. |
| Multiply km by 1,000 for metres and divide by 1,000 for kilometres. | मीटर के लिए किमी को 1,000 से गुणा करो। किलोमीटर के लिए 1,000 से भाग दो। | મીટર માટે કિમીને 1,000 વડે ગુણો. કિલોમીટર માટે 1,000 વડે ભાગો. |
| You learned: 1 km is 1,000 m, so multiply or divide by 1,000 | तुमने सीखा: 1 किमी में 1,000 मी होते हैं, इसलिए 1,000 से गुणा या भाग करो | તમે શીખ્યા: 1 કિમીમાં 1,000 મી હોય છે, તેથી 1,000 વડે ગુણો અથવા ભાગો |
| How many metres long is a road of 6 km 275 m from the village to the river? | गाँव से नदी तक की सड़क 6 किमी 275 मी लंबी है। वह कितने मीटर लंबी है? | ગામથી નદી સુધીનો રસ્તો 6 કિમી 275 મી લાંબો છે. તે કેટલા મીટર લાંબો છે? |
| 6 km 275 m in m? | 6 किमी 275 मी में कितने मी? | 6 કિમી 275 મીમાં કેટલા મી? |
| One kilometre is 1,000 m. | एक किलोमीटर में 1,000 मी होते हैं। | એક કિલોમીટરમાં 1,000 મી હોય છે. |
| Change each kilometre into 1,000 m before you add the rest. | हर किलोमीटर को 1,000 मी में बदलो। फिर बाकी जोड़ो। | દરેક કિલોમીટરને 1,000 મીમાં બદલો. પછી બાકીનું ઉમેરો. |
| 6 km is 6,000 m, so add the 275 m to it. | 6 किमी के 6,000 मी होते हैं। इसमें 275 मी जोड़ो। | 6 કિમીના 6,000 મી થાય. તેમાં 275 મી ઉમેરો. |
| Yes, 6 km 275 m is 6,275 m. | हाँ, 6 किमी 275 मी यानी 6,275 मी। | હા, 6 કિમી 275 મી એટલે 6,275 મી. |
| A train track is 3,000 m long; write its length in kilometres. | रेलवे लाइन 3,000 मी लंबी है। उसकी लंबाई किलोमीटर में लिखो। | રેલવે લાઇન 3,000 મી લાંબી છે. તેની લંબાઈ કિલોમીટરમાં લખો. |
| 3,000 m in km? | 3,000 मी में कितने किमी? | 3,000 મીમાં કેટલા કિમી? |
| Every 1,000 m along the road makes one kilometre. | सड़क पर हर 1,000 मी से एक किलोमीटर बनता है। | રસ્તા પર દર 1,000 મીથી એક કિલોમીટર બને છે. |
| Count the posts the slide planted; each stands 1 km further on. | सरकाने से लगे खंभे गिनो। हर खंभा पिछले से 1 किमी आगे है। | સરકાવવાથી લાગેલા થાંભલા ગણો. દરેક થાંભલો પાછલા કરતાં 1 કિમી આગળ છે. |
| Divide the metres by 1,000 to find the kilometres. | किलोमीटर पाने के लिए मीटर को 1,000 से भाग दो। | કિલોમીટર મેળવવા મીટરને 1,000 વડે ભાગો. |
| Right, the track is 3 km long. | सही, रेलवे लाइन 3 किमी लंबी है। | સાચું, રેલવે લાઇન 3 કિમી લાંબી છે. |
| Change a cycle path of 7,461 m into kilometres and metres. | साइकिल पथ 7,461 मी लंबा है। उसे किलोमीटर और मीटर में बदलो। | સાઇકલ માર્ગ 7,461 મી લાંબો છે. તેને કિલોમીટર અને મીટરમાં બદલો. |
| 7,461 m in km and m? | 7,461 मी में कितने किमी और मी? | 7,461 મીમાં કેટલા કિમી અને મી? |
| Count whole kilometres first, 1,000 m for each. | पहले पूरे किलोमीटर गिनो, हर एक के 1,000 मी। | પહેલાં આખા કિલોમીટર ગણો, દરેકના 1,000 મી. |
| The part of the road after the last post is under 1 km, so it stays in metres. | आख़िरी खंभे के बाद का हिस्सा 1 किमी से कम है। इसलिए वह मीटर में ही रहता है। | છેલ્લા થાંભલા પછીનો ભાગ 1 કિમીથી ઓછો છે. તેથી તે મીટરમાં જ રહે છે. |
| The last three digits of 7,461 are the metres left over. | 7,461 के आख़िरी तीन अंक बचे हुए मीटर हैं। | 7,461 ના છેલ્લા ત્રણ અંક બાકી રહેલા મીટર છે. |
| Well done, 7,461 m makes 7 km 461 m. | शाबाश, 7,461 मी से 7 किमी 461 मी बनता है। | શાબાશ, 7,461 મીમાંથી 7 કિમી 461 મી બને છે. |
| kilometres | किलोमीटर | કિલોમીટર |
| km | किमी | કિમી |
| Adding and subtracting lengths | लंबाइयों का जोड़ और घटाव | લંબાઈનો સરવાળો અને બાદબાકી |
| Tap the cm column to add the centimetres first. | सेमी के खाने को छुओ। पहले सेंटीमीटर जोड़ो। | સેમીની કૉલમને સ્પર્શ કરો. પહેલાં સેન્ટીમીટર ઉમેરો. |
| The cm column is the right half of the board. | सेमी का खाना बोर्ड का दायाँ आधा भाग है। | સેમીની કૉલમ બોર્ડનો જમણો અડધો ભાગ છે. |
| That is more than 100 cm, so tap Carry. | यह 100 सेमी से ज़्यादा है। इसलिए हासिल बटन छुओ। | આ 100 સેમીથી વધુ છે. તેથી વદી બટનને સ્પર્શ કરો. |
| The Carry key is under the board. | हासिल बटन बोर्ड के नीचे है। | વદી બટન બોર્ડની નીચે છે. |
| Start with the small unit in every sum. | हर सवाल में छोटी इकाई से शुरू करो। | દરેક દાખલામાં નાના એકમથી શરૂ કરો. |
| Carry or borrow where the cm column needs it. | सेमी के खाने में ज़रूरत हो तो हासिल या उधार लो। | સેમીની કૉલમમાં જરૂર હોય ત્યાં વદી કે ઉછીના લો. |
| Carry 100 cm as 1 m, or borrow 1 m as 100 cm. | 100 सेमी का 1 मी हासिल लो। 1 मी के 100 सेमी उधार लो। | 100 સેમીનો 1 મી વદી લો. 1 મીના 100 સેમી ઉછીના લો. |
| You learned: add and subtract lengths in m and cm columns, cm first | तुमने सीखा: मी और सेमी के खानों में लंबाइयाँ जोड़ो और घटाओ, पहले सेमी | તમે શીખ્યા: મી અને સેમીની કૉલમમાં લંબાઈ ઉમેરો અને બાદ કરો, પહેલાં સેમી |
| How long was a rope cut into pieces of 2 m 74 cm and 1 m 69 cm? | रस्सी के दो टुकड़े: 2 मी 74 सेमी और 1 मी 69 सेमी। रस्सी कितनी लंबी थी? | દોરડાના બે ટુકડા: 2 મી 74 સેમી અને 1 મી 69 સેમી. દોરડું કેટલું લાંબું હતું? |
| 2 m 74 cm + 1 m 69 cm | 2 मी 74 सेमी + 1 मी 69 सेमी | 2 મી 74 સેમી + 1 મી 69 સેમી |
| 100 cm or more cannot stay in the cm column. | 100 सेमी या ज़्यादा सेमी के खाने में नहीं रह सकते। | સેમીની કૉલમમાં 100 સેમી કે વધુ રહી શકે નહીં. |
| The carried 1 m joins the metres column too. | हासिल का 1 मी, मीटर के खाने में भी जुड़ता है। | વદીનો 1 મી, મીટરની કૉલમમાં પણ ઉમેરાય છે. |
| Take 100 cm off the centimetres total, then add 1 m to the metres. | सेंटीमीटर के जोड़ में से 100 सेमी घटाओ। फिर मीटर में 1 मी जोड़ो। | સેન્ટીમીટરના સરવાળામાંથી 100 સેમી બાદ કરો. પછી મીટરમાં 1 મી ઉમેરો. |
| Yes, the rope was 4 m 43 cm long. | हाँ, रस्सी 4 मी 43 सेमी लंबी थी। | હા, દોરડું 4 મી 43 સેમી લાંબું હતું. |
| m column | मी का खाना | મી કૉલમ |
| cm column | सेमी का खाना | સેમી કૉલમ |
| How long are two ribbons of 3 m 45 cm and 2 m 55 cm laid end to end? | 3 मी 45 सेमी और 2 मी 55 सेमी के दो रिबन एक के बाद एक रखे हैं। कुल लंबाई कितनी? | 3 મી 45 સેમી અને 2 મી 55 સેમીની બે રિબન એક પછી એક મૂકી છે. કુલ લંબાઈ કેટલી? |
| 3 m 45 cm + 2 m 55 cm | 3 मी 45 सेमी + 2 मी 55 सेमी | 3 મી 45 સેમી + 2 મી 55 સેમી |
| Keep metres and centimetres in their own columns. | मीटर और सेंटीमीटर को अपने-अपने खानों में रखो। | મીટર અને સેન્ટીમીટરને પોતપોતાની કૉલમમાં રાખો. |
| Count the metres again with the carried 1 m added. | हासिल का 1 मी जोड़कर मीटर फिर से गिनो। | વદીનો 1 મી ઉમેરીને મીટર ફરી ગણો. |
| 45 cm and 55 cm fill a whole metre exactly. | 45 सेमी और 55 सेमी से ठीक एक मीटर भरता है। | 45 સેમી અને 55 સેમીથી બરાબર એક મીટર ભરાય છે. |
| Yes, they make 6 m and 0 cm, which is 6 m. | हाँ, ये 6 मी और 0 सेमी हैं, यानी 6 मी। | હા, તે 6 મી અને 0 સેમી છે, એટલે કે 6 મી. |
| How much cloth is left when a tailor cuts 2 m 47 cm from 5 m 28 cm? | दर्ज़ी ने 5 मी 28 सेमी कपड़े में से 2 मी 47 सेमी काटा। कितना कपड़ा बचा? | દરજીએ 5 મી 28 સેમી કાપડમાંથી 2 મી 47 સેમી કાપ્યું. કેટલું કાપડ બાકી રહ્યું? |
| 5 m 28 cm − 2 m 47 cm | 5 मी 28 सेमी − 2 मी 47 सेमी | 5 મી 28 સેમી − 2 મી 47 સેમી |
| Look at the top row after the borrow. | उधार लेने के बाद ऊपर की पंक्ति देखो। | ઉછીના લીધા પછી ઉપરની હરોળ જુઓ. |
| Subtract each column on its own, centimetres first. | हर खाने को अलग-अलग घटाओ, पहले सेंटीमीटर। | દરેક કૉલમ અલગ-અલગ બાદ કરો, પહેલાં સેન્ટીમીટર. |
| Take 47 cm from 128 cm, then take 2 m from 4 m. | 128 सेमी में से 47 सेमी घटाओ। फिर 4 मी में से 2 मी घटाओ। | 128 સેમીમાંથી 47 સેમી બાદ કરો. પછી 4 મીમાંથી 2 મી બાદ કરો. |
| Yes, 2 m 81 cm of cloth is left. | हाँ, 2 मी 81 सेमी कपड़ा बचा है। | હા, 2 મી 81 સેમી કાપડ બાકી છે. |
| Break the rods before you answer. | उत्तर देने से पहले छड़ें तोड़ो। | જવાબ આપતાં પહેલાં સળિયા તોડો. |
| The rods are still whole, so tap Break first. | छड़ें अभी पूरी हैं। इसलिए पहले तोड़ो बटन छुओ। | સળિયા હજી આખા છે. તેથી પહેલાં તોડો બટનને સ્પર્શ કરો. |
| Cut the ribbon before you answer. | उत्तर देने से पहले रिबन काटो। | જવાબ આપતાં પહેલાં રિબન કાપો. |
| The ribbon is still in one piece, so tap Cut first. | रिबन अभी एक ही टुकड़े में है। इसलिए पहले काटो बटन छुओ। | રિબન હજી એક જ ટુકડામાં છે. તેથી પહેલાં કાપો બટનને સ્પર્શ કરો. |
| Slide the post along the road before you answer. | उत्तर देने से पहले खंभे को सड़क पर सरकाओ। | જવાબ આપતાં પહેલાં થાંભલાને રસ્તા પર સરકાવો. |
| The post has not moved yet, so tap Slide first. | खंभा अभी हिला नहीं है। इसलिए पहले सरकाओ बटन छुओ। | થાંભલો હજી ખસ્યો નથી. તેથી પહેલાં સરકાવો બટનને સ્પર્શ કરો. |
| Look at the cm column, then tap Carry or Borrow. | सेमी का खाना देखो। फिर हासिल या उधार बटन छुओ। | સેમીની કૉલમ જુઓ. પછી વદી કે ઉછીના બટનને સ્પર્શ કરો. |
| Choose Carry or Borrow for the cm column first. | पहले सेमी के खाने के लिए हासिल या उधार चुनो। | પહેલાં સેમીની કૉલમ માટે વદી કે ઉછીના પસંદ કરો. |
| Check the cm column again before you choose. | चुनने से पहले सेमी के खाने को फिर से देखो। | પસંદ કરતાં પહેલાં સેમીની કૉલમ ફરી જુઓ. |
| Look at the cm column: do the centimetres fit? | सेमी का खाना देखो। क्या सेंटीमीटर समा जाते हैं? | સેમીની કૉલમ જુઓ: શું સેન્ટીમીટર સમાય છે? |

## B. Words `Work` draws through `tx()` (not in the digest)

| English | Hindi | Gujarati |
|---|---|---|
| Break | तोड़ो | તોડો |
| Cut | काटो | કાપો |
| Slide | सरकाओ | સરકાવો |
| Carry | हासिल | વદી |
| Borrow | उधार | ઉછીના |
| Left | बचा | બાકી |
| Given | दिया है | આપેલું |
| Answer | उत्तर | જવાબ |

## C. In the source but not printed now (optional)

OPENING (not shown: phase 1 has steps), the four phase `says` (replaced by `steps`) and FINISH_LINE (hidden from r44).

| English | Hindi | Gujarati |
|---|---|---|
| A metre rod, a long road and a board for adding. | एक मीटर की छड़, एक लंबी सड़क और जोड़ने का बोर्ड। | એક મીટરનો સળિયો, એક લાંબો રસ્તો અને સરવાળા માટેનું બોર્ડ. |
| Break the metres into centimetres. Then add the rest. | मीटर को सेंटीमीटर में तोड़ो। फिर बाकी जोड़ो। | મીટરને સેન્ટીમીટરમાં તોડો. પછી બાકીનું ઉમેરો. |
| Gather the centimetres into metres. What is left over? | सेंटीमीटर इकट्ठे करके मीटर बनाओ। क्या बच गया? | સેન્ટીમીટર ભેગા કરીને મીટર બનાવો. શું બાકી રહ્યું? |
| Slide the post along the road. How many metres is each step? | खंभे को सड़क पर सरकाओ। हर कदम कितने मीटर का है? | થાંભલાને રસ્તા પર સરકાવો. દરેક ડગલું કેટલા મીટરનું છે? |
| Write the lengths in two columns. Start with the small unit. | लंबाइयों को दो खानों में लिखो। छोटी इकाई से शुरू करो। | લંબાઈ બે કૉલમમાં લખો. નાના એકમથી શરૂ કરો. |
| You changed the unit and kept the length the same. | तुमने इकाई बदली और लंबाई वही रखी। | તમે એકમ બદલ્યો અને લંબાઈ એ જ રાખી. |

## Notes on length

Rows are about the same length as the English; where a Hindi or Gujarati bubble line says the same in two short sentences (for example the Tap Break / Tap Cut / Tap Slide steps, the Break one metre at a time rung, the Write the hundreds rung, the Change the metres before you add rung, the km to m rung, and many more) the bubble can page on the `।` / `.` and keep the larger font. No row is more than 25 percent longer than its English.

Rows over 25 percent longer than the English (strings over 40 characters):
- none

Bubble sentences still over about 45 characters in Hindi or Gujarati (PATTERNS 11 says the font drops there; all are 46 to 61, most are digit-heavy question lines that mirror a long English sentence; FREE_LINE (the Free play line) must stay one sentence because its last piece stays on screen):
- hi 54: मुक्त खेल: छड़ तोड़ो, रिबन काटो, खंभा सरकाओ, हासिल लो।   [English: Free play: break rods, cut ribbons, ...]
- gu 56: મુક્ત રમત: સળિયો તોડો, રિબન કાપો, થાંભલો સરકાવો, વદી લો.   [English: Free play: break rods, cut ribbons, ...]
- hi 47: रेल के डिब्बे जितना लंबा रिबन 1,867 सेमी का है।   [English: Change a ribbon as long as a train c...]
- gu 46: ગામથી નદી સુધીનો રસ્તો 6 કિમી 275 મી લાંબો છે.   [English: How many metres long is a road of 6 ...]
- hi 47: सेमी के खाने में ज़रूरत हो तो हासिल या उधार लो।   [English: Carry or borrow where the cm column ...]
- gu 46: સેમીની કૉલમમાં જરૂર હોય ત્યાં વદી કે ઉછીના લો.   [English: Carry or borrow where the cm column ...]
- hi 49: रस्सी के दो टुकड़े: 2 मी 74 सेमी और 1 मी 69 सेमी।   [English: How long was a rope cut into pieces ...]
- gu 48: દોરડાના બે ટુકડા: 2 મી 74 સેમી અને 1 મી 69 સેમી.   [English: How long was a rope cut into pieces ...]
- hi 50: 100 सेमी या ज़्यादा सेमी के खाने में नहीं रह सकते।   [English: 100 cm or more cannot stay in the cm...]
- hi 61: 3 मी 45 सेमी और 2 मी 55 सेमी के दो रिबन एक के बाद एक रखे हैं।   [English: How long are two ribbons of 3 m 45 c...]
- gu 58: 3 મી 45 સેમી અને 2 મી 55 સેમીની બે રિબન એક પછી એક મૂકી છે.   [English: How long are two ribbons of 3 m 45 c...]
- hi 54: दर्ज़ी ने 5 मी 28 सेमी कपड़े में से 2 मी 47 सेमी काटा।   [English: How much cloth is left when a tailor...]
- gu 50: દરજીએ 5 મી 28 સેમી કાપડમાંથી 2 મી 47 સેમી કાપ્યું.   [English: How much cloth is left when a tailor...]
- gu 46: પહેલાં સેમીની કૉલમ માટે વદી કે ઉછીના પસંદ કરો.   [English: Choose Carry or Borrow for the cm co...]
- hi 48: एक मीटर की छड़, एक लंबी सड़क और जोड़ने का बोर्ड।   [English: A metre rod, a long road and a board...]
- gu 57: એક મીટરનો સળિયો, એક લાંબો રસ્તો અને સરવાળા માટેનું બોર્ડ.   [English: A metre rod, a long road and a board...]

## Please have a native speaker read (most doubtful first)

1. Gujarati carry `વદી` (the Carry key, the lines that tap or name Carry, the free-play line) and borrow `ઉછીના` as a one-word key label and in the lines that name Borrow. If the class 3 book says `હાથ પર` or another word, change it in one find-and-replace. Hindi हासिल / उधार are the usual school words.
2. Title: Hindi `लंबाई बदलो`, Gujarati `લંબાઈ બદલો` (alternative: "लंबाई की इकाई बदलो").
3. Gujarati: `શતક` for the hundreds place ("Write the hundreds from the rods") but `સેંકડો` for "hundreds of centimetres"; `પડાવ` for the stops of the post ("count the stops"); `હરોળ` for row; `સમૂહ` for "lots of 100"; `દાખલો` for sum ("Start with the small unit in every sum").
4. Hindi/Gujarati restructures that change the word order, not the meaning: the "Tap Break / Cut / Slide to ..." steps put the key first ("Tap Break to break each metre rod ..." becomes "Tap the Break key. Each rod will break ..."); the "Kilometres to metres is times 1,000, and back is divided by 1,000" rung spells out both directions (km to m, m to km); "laid end to end" is "एक के बाद एक" / "એક પછી એક"; "the centimetres that do not make a metre" is "बचे हुए" / "બાકી રહેલા".
5. Key words as one-word labels: तोड़ो / काटो / सरकाओ and તોડો / કાપો / સરકાવો (imperatives), tag words दिया है / આપેલું, बचा / બાકી.
6. Cultural words: खंभा / થાંભલો for the kilometre post, रेलवે लाइन for the track (पटरी is the ruler), साइकिल पथ / સાઇકલ માર્ગ, रेल का डिब्बा / રેલનો ડબ્બો, पतंग की डोर / પતંગની દોરી, बगीचे का पाइप / બગીચાની નળી.

## Changed while drafting

Re-ran at the end: `node orch.mjs digest --class 3 --ch 9 --slot M1.S1.T3.C11.2D1 --strings` (hash c33473ae57a9b37d, 111 lines) is identical to the first run, `tool.tsx` is byte-identical to the one read at the start (md5 c8d67ac2...), and the set of `tx(`, `tu(`, `U(`, `win:`, `LC_KEYS` and `api.say(` literals is unchanged. No new or changed English line, so nothing to add.

