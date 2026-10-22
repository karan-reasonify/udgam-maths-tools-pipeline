# weighing_bench (M2.S3.T5.C20.2D1) MATHS REVIEW round 1 (English only; reviewer: udgam-maths-reviewer, 2026-10-21)
Verdict: ISSUES (1 must-fix, no wrong maths, NO giveaways). All 12 answers recompute; every nearMiss is rejected by judge; 3 questions a phase; no "a/b"; commas right.
Line numbers are the reviewer's, taken from tool.tsx at review time (they move as you edit).

## MUST-FIX
1. Phase 1, item 3, the eraser correction (tool.tsx:818-821, 945-949). The last replay step sets `demo` to the ghost copy only: that takes the balanced 20 g weight off the pan, puts the 1 kg
   back and leaves the tag reading "20 kg" (it flips to "20 g" only when `done`). The correction ends with the eraser copy in the grams tray under a "20 kg" tag, not on the whole right answer
   "20 g" (Rule 4). Fix: in the last step keep `left:{thing:"eraser"}, right:{chip:20}` beside the ghosts, or show "20 g" in the tag once a ghost exists.

## SHOULD-FIX
2. Phase 3 and 4 corrections only reveal the answer (tool.tsx:829-835): the misconception is not redrawn although the brief's wrong-paths ask for it. Phase 3: the child's 63 kg or 5 kg is not
   drawn (`wbPile` can draw a capped heap of kg blocks without a balance). Phase 4: the child's typed digits are overwritten, not laid beside the right board; the phase 4 fix item (4 kg 700 g)
   is not redrawn either. "No balance in phases 3 and 4" does not excuse this (Rule 4/5).
3. Closings over 80 characters (`one-line-bubble` cannot see the two-piece cut): phase 2 (line 161) is 89, phase 4 (line 229) is 91. Use
   "1,000 g make 1 kg, so kilograms become grams by multiplying by 1,000 only." (74) and "Beside kilograms the grams take three places, and a zero holds each empty one." (78).
4. Hints repeat within a phase. Phase 2 item 2 `miss` (line 174) "Each kilogram weight levels how many grams?" ~ its ladder rung 2 "How many grams levelled one kilogram?": change the miss to
   "Each of the 5 kilogram weights is as heavy as the pile you built." (65). Phase 3 rung 3 (line 193) overlaps item 2's miss ("whole thousands"), item 3's miss and rung 2 ("what is left"):
   change rung 3 to "Each 1,000 g makes a kilogram; the grams that cannot make one more stay grams." (78).
5. Phase 3 wins (lines 203/207/211) all use "X g is Y kg Z g". Reword two. Item 2: "Right: 2 whole kilograms, and 750 g left over." Item 3: "Yes: 25 whole kilograms, and 400 g stay as grams."
6. Phase 4 ladder (line 228) "Which boxes are still empty?" does not fit item 3 (the fix item: no box is empty). Give item 3 its own `ladder`. Rung 2: "Which three digits of 4,070 are the grams?" (42).
   Rung 3: your wording; it may name the zero in the hundreds but not "70".
7. `nearMiss` for sorts (line 296) returns "kg,kg". The writeup's error is reading the raised pan as heavier, which swaps the trays: use "g,kg" for cement/spoon and "kg,g" for letter/onions.
8. `answerForms` (line 311): add "N kilograms and M grams" in words, so the giveaway scan covers every form of the pair.
9. Q3 `say` (line 143): "so" is clumsy. Use "A child wrote 20 kg for an eraser: which tray is right for it?" (62).
(English lines are not in TR yet: no TR key to keep in step; the language pass comes after.)

## Departures: accepted (1 warm-ups, 2 answer keys kg,g / g,kg, 3 warm-up numbers share nothing with answers, 4 no balance in phases 3-4 (but see 2), 6 ten-thousands box always shown).
## Free play (accepted, two defaults for the builder)
- The pan stops at 30 weights, so the 50 kg cement bag can never level: your call (raise the cap if 50 fit without crowding, else say so in one line).
- 12 hundred-gram weights plus 2 kg read "2 kg 1,200 g" (not regrouped): default = regroup the counter ("3 kg 200 g").

## Questions for the owner (logged in NOTES.md, not for the builder)
- Place board headers read "TTh Th H T O" but the brief says words (full words do not fit the 116-wide boxes): do they match the chapter 1 chart?
- Phase 1 Q3 (the eraser) is a tray act; the brief's Stage text names a two-key word pad on phase 1, dropped here (same answer "g" as the v2 build).
- Phase 2 step 2 puts all nine remaining 100 g weights on in one carry (the child never decides when it levels); accepted, consistent with the Delight.
