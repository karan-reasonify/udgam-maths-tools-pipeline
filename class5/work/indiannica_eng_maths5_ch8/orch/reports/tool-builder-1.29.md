STATUS: ok (stage 2 done: Gemini visual pass + hi/gu language pass; full check clean, ported)
SLOTS: M2.S3.T7.C31.2D1
FILES: class5/work/indiannica_eng_maths5_ch8/M2.S3.T7.C31.2D1/tool.tsx (+ tool.tsx.pre-design written by design)
CHECKS: quick 33/0/0; full 98 pass 0 warn 0 fail 4 info (1 run this message), tr-coverage PASS, ported
FAILURES: none
DECISIONS: tiles over a photo lightened; letter chips widened to 40 for Gujarati; Thumb shadow filter removed
RISKS: hand outline still reads as a mitten (fingers together, as the photo is) for the visual reviewer; hi/gu terms need a native read
ESCALATE: none
1 VISUAL PASS: `design` ok on gemini-3.5-flash (55 KB). Its changes are cosmetic only: shadowed paper and tally cards, rounded chips with a gloss, a dashed total rule, thicker brackets and outline. The maths, gate, TR, PHASES and MODEL are untouched.
 - The CLI note "hand made but drawn by no <Skin>" is a false alarm: the hand IS drawn, by <Skin name={look.skin}> (a dynamic name the CLI cannot read). The phase-4 shots show it.
 - My fixes: (1) removed Gemini's filter="url(#ps-shadow)" on the summary Thumb, because that filter lives in Work's defs and a dangling filter hides the element; (2) the tiles over a photo are lighter (tint 0.22+0.30, cell skin 0.28; plain shapes keep 0.40/0.42/0.36), so the leaf and the hand read through. No screen has more than 40 skinned squares.
 - Looked at shots, --state wrong and --state start: nothing off its pill, no skin over a digit, no words added. M/H/L stay at 28 or more.
2 LANGUAGE PASS: a TR table of 112 keys in hi and gu. It covers every PHASES line, plus the hand-added runtime lines: the 3 nudges, the 12 win lines, OPENING, FINISH_LINE, START_HOOK, FREE_LINE, the tally and key words, and the M/H/L letters. Fit sheets: mount and wrong, hi and gu. Gujarati letter chips widened to 40.
 - Letters: hi M=अ (आधे से अधिक), H=आ (आधा), L=क (आधे से कम); gu M=વ (અડધાથી વધુ), H=અ (અડધું), L=ઓ (અડધાથી ઓછું). The sentences that name a letter use the same letter.
UNSURE TERMS (native read):
 - the letter scheme above (gu અ = half and hi अ = more than half are different letters; each language is consistent within itself);
 - tool name अधूरे वर्ग / અધૂરા ચોરસ;
 - "bracket" given as जोड़ने वाली रेखा / જોડતી રેખા;
 - "about" लगभग / આશરે; "estimate" अनुमान / અંદાજ;
 - "sq. cm" वर्ग सेमी / ચો. સેમી;
 - tally = तालिका / કોષ્ટક;
 - "sliver square" ज़रा-सा ढका वर्ग / થોડો જ ઢંકાયેલો ચોરસ;
 - "ringed" घेरे वाला / વર્તુળવાળો;
 - Grid key जाली / જાળી;
 - "row" पंक्ति / હરોળ.
Machine: disk at 1.4 GB free; no ENOSPC seen.
