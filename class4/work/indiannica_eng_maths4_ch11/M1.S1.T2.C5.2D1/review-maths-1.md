# ruler_bench (M1.S1.T2.C5.2D1) MATHS REVIEW round 1 (English only; reviewer: udgam-maths-reviewer, 2026-10-21)
Verdict: ISSUES (2 must-fix, 10 should-fix, 5 questions). Maths right everywhere recomputed (answers 7, 12, 5, 6; the choices; bench 108; cloth 108/162; desk 72; bus 10 m; pitch 20 m).
Three questions a phase; all lines <= 80 chars; no "a/b"; corrections end on the whole right answer and mark nothing. Line numbers are the reviewer's, from tool.tsx at review time.

## MUST-FIX
1. ph3 Q6 (tool.tsx:161, rung 3): "Put a finger on the zero mark and count one centimetre space at a time." Done literally on the key (mark 1 to mark 6) this gives 6, the plan's WRONG answer.
   -> "Put a finger on the object's left end and count one centimetre space at a time." (79; right for all three items)
2. ph1 warm-up (tool.tsx:63-66): the bottle goes in the capacity bin with the L card and the hint "L stands for litres, a unit of capacity." That result is Q1's milk answer and Q2's whole answer
   (PATTERNS 9b: a warm-up result must be none of the phase's answers). Q3's juice (mL) also uses capacity, so changing only the card does not help: the thing must change KIND. Only g, mm and km
   are unused as answers. Use a coin: weight bin, g card (a new drawing and MODEL.things.coin: name "coin", kind weight, unit "g"); keep the bottle for StartArt.
   step1 say "You weigh a coin, so tap the weight bin to put the coin in it." hint "Weight is how heavy a thing is."
   step2 say "Now tap the g card in that bin to give the coin its unit." hint "g stands for grams, a small unit of weight."

## SHOULD-FIX (old -> new)
3. ph1 (81, 99): Q1 win, Q3 win and the closing are near copies ("a unit of its/their (own) kind"). Never name a unit (the judge accepts any unit of the right family).
   Q1 win -> "Yes, each one went in the right bin with a card that fits."  Q3 win -> "Yes, the rice, ribbon and juice each got a card from the right bin."
4. ph1 Q1 (80 vs 69): the miss "Ask of each thing: how long is it, how heavy, or how much does it hold?" is repeated by rung 3. Q1 miss -> "Take one thing at a time and ask what you want to know about it."
5. ph1 Q2 (90): rung 3 "Find which of cm, kg and L sits among the capacity bin's cards." names the bin that rung 2 asked the child to find.
   -> "Look at the cards in the bin you chose: which of cm, kg and L is there?"
6. ph2 ML2 (123): the say drops "the same bench". Old "One child counts 9 handspans along a bench, another counts 12: which is right?" -> "Two children count 9 and 12 handspans along the same bench: which is right?" (75)
7. ph2 step 2 (110): hint "This time, tap the small hand." repeats the instruction shown with it. -> "The small hand's key is in the middle at the bottom."
8. ph2 Q4 (146): the miss prints "9" before the child has laid a row. -> "Would the buyer's bigger handspans give the same cloth?" Also Q3's right label "hands differ" (135) echoes the question's "differ": consider "hand size".
9. ph4 Q8 (223-224): miss and both rungs all say "count from 24 to 30". New trio (none gives 6): miss "Compare the two cards: how far is the guess from the measure?";
   rung 2 "Find 24 and 30 on the scale: the purple bar fills the gap between them."; rung 3 "Count the centimetre spaces under the purple bar, one at a time."
10. ph4 rung 3 (201): "...and the road between towns 1 km" states a false distance. -> "A fingertip is about 1 cm, a big step about 1 m, and towns are many km apart." (77)
11. ph4 Q7 (216): "a few steps" is wrong for 20 m (about 20 big steps). -> "Walk the pitch in your head: is it a short walk, or a long ride?"
12. Start page (32-50): the hook "Where does a ruler start when no 0 is printed on it?" is answered by its own picture (a crayon from a vermilion first mark). Drop the crayon, or draw the first mark in plain ink.
Optional: P3 closing loses the book's "read the other end": "Start at the zero mark, even if no 0 is printed, and read the other end." (72). Nit: the warm-up's printed mark 5 equals Q6's answer; eraser 1 to 4 (3 cm) avoids it.

## Departures: all accepted (unit-only ML4/:7; tap-then-tap; whole-row handspan tap; whole-cm slides, no mm box; no running count; one sentence <= 80). Not built: the "estimate card locks" misconception (no plan question tests it).
(English lines are not in TR yet: no TR key to keep in step; the language pass comes after.)

## Questions for the owner (logged in NOTES.md, not for the builder)
- Q8's near miss 7, ML3's 8 and Q5's 13 are the default answer+1 (counting ticks, not spaces), not an error the writeup names; coherent with the count traceback.
- ph1 Q2: the bins and all unit cards are on screen before the answer, so "L" can be read off the capacity bin (plan-faithful: the plan's screen lists the cards).
- ph3/ph4 typed answers show a bare number; the brief wants a unit tag in the slot (a one-box parts [{label:"cm"}] would add it; the say line names the unit). Default: add the unit tag via a one-box parts if it fits.
- The sort judge accepts any unit of the right family (a rope in km); the plan says "which unit could each take".
- The cards, steps and sentences say "guess"; the book's key term is "estimate".
