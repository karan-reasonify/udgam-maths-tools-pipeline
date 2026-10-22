# ruler_bench (M1.S1.T2.C5.2D1) MATHS REVIEW round 2 (changes only; reviewer: udgam-maths-reviewer, 2026-10-21)
Verdict: ISSUES (0 must-fix, 2 should-fix, 4 optional). Every round-1 item is closed; two of the new lines have a small fault of their own. Line numbers are tool.tsx now.
Quick check: 29 pass, 0 warn, 0 fail. Every printed line measured: the longest is ph3 step 1 (line 156) at exactly 80, so it stands.

## SHOULD-FIX
1. ph4 Q8 rungs (tool.tsx:223): rung 2 "Find 24 and 30 on the scale: the purple bar fills the gap between them." The 30 cm scale prints numerals only at 0, 5, 10 ... 30
   (line 1312, `c % 5 === 0`), so there is no "24" to find, and "purple" is a colour-only cue (the chapter wants every reading to survive without colour). Rung 3 repeats "purple bar".
   -> rung 2 "Look from the notebook's end to the dashed line: the bar fills that gap." (72)
   -> rung 3 "Count the centimetre spaces under the bar, one at a time." (57)   Neither prints or implies 6; no "purple".
2. ph1 Q2 rung 3 (tool.tsx:89): "Look at the cards in the bin you chose: which of cm, kg and L is there?" Q2 never asks the child to choose a bin (the bins are not tappable in a blank
   question; the keys are cm, kg, L), so "the bin you chose" points at an act that never happened. A child who would say "weight" is sent to the kg bin (the near miss).
   Each rung REPLACES the one before on the bubble (hint-pinned), so "that bin" would point at rung 2's line, which is no longer on screen: the rung must stand alone.
   It must not repeat rung 2 ("how much a thing holds") or the miss ("how much goes in"), and naming the capacity bin was the round-1 fault.
   -> builder's choice, e.g. "Of cm, kg and L, which one is a unit for water, milk and juice?" (62): no bin named, no repeat, still asks the child to pick the unit.

## OPTIONAL (not blocking)
3. ph2 Q3 (tool.tsx:131): the correction ends on the note "the hands differ", the right key is now "hand size". -> note "the hands differ in size" ties the two together.
4. ph3 Q6 (tool.tsx:184 against 160): the miss "Where does the key's left end sit, and where is the zero mark?" and rung 2 "Which mark is the zero mark on this ruler?" are near copies
   when read as one run (not new: the Q6 miss was not changed). -> Q6 miss "Does the key's left end sit on the first mark, or on another mark?"
5. ph2 Q4 (tool.tsx:113, phase rung 2 "Which hand fits more times along it?"): in the cloth picture both hands fit 9 times, so the rung asks for a difference the picture does not show
   (not new; the phase rungs are shared by ML2, Q3 and Q4). An item `ladder` replaces BOTH phase rungs, so Q4 would need two new strings; they must not copy Q4's miss
   ("Would the buyer's bigger handspans give the same cloth?"). Left to the builder, or leave as is.
6. Stale comment, tool.tsx:34 ("a crayon lies from it"): the crayon is gone. Not shown; tidy when next edited.

## Round-1 items: status (all CLOSED, with the evidence)
1 (must) ph3 rung 3 -> tool.tsx:160 "Put a finger on the object's left end and count one centimetre space at a time." (79). Done literally: ML3 crayon 0 to 7 = 7, Q5 pencil 0 to 12 = 12,
  Q6 key 1 to 6 = 5 (the plan's answer, no longer 6). No number printed.
2 (must) ph1 warm-up -> coin, weight bin, g card (62/57 chars; hints 31/43). The thing is in no question; the pair (weight, g) is no stored answer (rope m, bag kg, milk L, bucket L,
  rice kg, ribbon cm, juice mL). The judge (line 270) would also accept weight:g for the bag and the rice, so (weight, g) is an accepted pair; that is the owner's open "any unit
  of the family" question, not a leak: the warm-up does not tell the child which question thing goes in which bin, and with all three bins used by Q1 no one-thing warm-up could avoid an answer bin.
  The steps print no answer. The first step's hint is a definition, not an action; acceptable.
3 Q1 win / Q3 win -> lines 80, 98 as proposed; no unit named, no near copy of each other or of the closing.
4 Q1 miss -> line 79, no longer repeated by rung 3.
5 Q2 rung 3 -> line 89 as proposed (CLOSED as a round-1 item; see new finding 2 for its wording).
6 ML2 say -> line 122 "Two children count 9 and 12 handspans along the same bench: which is right?" (75). 9 x 12 = 12 x 9 = 108, answer "both" not printed.
7 ph2 step 2 hint -> line 109, now gives the key's place (middle, bottom), not a repeat; keys sit at x 50, 325, 600 (left, middle, right) so all three hints are true.
8 Q4 miss -> line 145, no "9" before a row is laid; Q3 label "hand size" (line 134), no echo of "differ".
9 Q8 miss and rungs -> lines 222-223: the miss no longer says "count from 24 to 30"; none gives 6 (but see new finding 1).
10 ph4 rung 3 -> line 200 (77): fingertip 1 cm, big step 1 m, towns many km: true, no false distance.
11 Q7 miss -> line 215: no "a few steps".
12 Start page -> StartArt (lines 33-50): the crayon and the vermilion mark are gone, every tick is plain ink, the "cm" first mark carries no hint of an object starting there; the picture no longer answers its hook.
Optional: ph3 closing line 161 (72) now reads "...and read the other end."; ph3 warm-up eraser from 1 to 4 (3 cm): not 7, 12 or 5.
Warm-up results by phase: ph1 coin (weight, g); ph2 desk 72 cm, counts 4 and 6 (no answer); ph3 3 cm (answers 7, 12, 5); ph4 pencil guess 15, measure 17, unit cm (answers m, m, 6).

## Skins (rope, bag, bottle)
Closed in code: each Skin sits inside rbThing keyed to the thing's id (lines 467-469), never to the bin or the answer; no tint or glow comes from a skin. The bin lights (flash) light the bin the
CHILD used, and the correction lights the right bin only after a miss. Rope and bag skins carry no printed text (frame play-p1-skins.png). The bottle skin (start page only) was not looked at: left to the
visual reviewer (check that it carries no "L" or "1 L" label). Mixed art (rope and bag skinned, jug plain) is also for the visual reviewer.

## Full check (CHROME_PATH set, pool 1)
93 pass, 0 warn, 1 fail, 4 info. The only FAIL is summary-thumbs in hi/gu (no TR table yet), as expected. guide-steps and guide-steps-real-wrong pass on all four phases: on phase 1 a real click on the weight bin
(the coin warm-up) and on the g card moves the step on at once, and a click elsewhere shows that step's hint. miss-shows-answer, hint-fit (none over 80), one-line-bubble and bubble-no-repeat pass.
