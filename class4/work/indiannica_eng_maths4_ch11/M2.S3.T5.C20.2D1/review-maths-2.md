# weighing_bench (M2.S3.T5.C20.2D1) MATHS REVIEW round 2 (changes only; English; reviewer: udgam-maths-reviewer, 2026-10-21)
Verdict: ISSUES (1 must-fix, 3 should-fix, 1 question). Quick check 29/0/0. No wrong answers, no giveaway; closings are 74 / 78 / 80 / 72 (none over 80).
Line numbers are tool.tsx at review time. Played with real clicks (playkit): the eraser miss, phase 3 item 3 and phase 4 item 3, three misses each.

## Round 1, item by item
1 must-fix eraser correction: CLOSED. Played: the replay ends level, the eraser against the 20 g weight, a copy in the grams tray, tag and pan counter both read 20 g.
2 corrections redrawn: phase 4 CLOSED (second board beside the right one for the place items and the fix item: 4 7 0 0 under "4 kg 700 g", then the right board and the slots). Phase 3 NOT CLOSED: the heaps are capped (finding A).
3 closings over 80: CLOSED (74 and 78).
4 repeated hints: phase 2 item 2 miss no longer repeats rung 2, CLOSED, but its new wording is inexact (finding D); phase 3 rung 3 CLOSED; phase 3 item 3 miss still near-repeats rung 2, NOT CLOSED (finding B).
5 phase 3 wins: CLOSED. 7 sort nearMiss (trays swapped, judge rejects all four): CLOSED. 8 answerForms: CLOSED. 9 Q3 say: CLOSED.
6 phase 4 item 3 own ladder: CLOSED (it has one), new fault: rung 2 repeats that item's miss (finding C).
Free play: counter regroup CLOSED ("3 kg 200 g"). Skins and tints: no text on the keyring, sack or weight pictures; only weights are tinted (kg blue, g green); on the pans a kg weight (104 wide, labelled "1 kg") and the 100 g slabs (46 wide, counter under the pan) differ by size and label without colour. NOT so in the heaps (A).

## MUST-FIX
A. Phase 3 correction (tool.tsx:872, 1076-1078; wbPile 506-515). wbPile draws at most 25 blocks of a kind, so every phase 3 near miss is capped: 63 kg draws 25 blocks, 27 kg draws 25, and item 3's 254 kg draws 25 beside the card's own 25,400 g (25 bars and 4 slabs): two heaps of the same height, labelled "254 kg 0 g" and "25,400 g" (played frame; sheet-wrong.png shows the 63 kg case). The picture of the misconception says "the same size" where the child's answer is ten times too big, the opposite of the brief ("a heap far larger than the card"), so the correction does not show WHY. A 1 kg block and a 1,000 g bar are also both 31 x 20 in the heaps and the brass skin is shared, so with the tint taken away only the labels tell them apart. Fix in wbPile for all three items, not one special case: show the overflow (a torn top or "and many more" mark when a kind is capped) and make sure a heap that is really ten times bigger never draws equal to the other.

## SHOULD-FIX
B. Phase 3, item 3 miss (line 212) "Take away the whole thousands, and see what is left." then rung 2 (line 194) "How many whole kilograms fit, and what is left?" (played: misses 1 and 2): a near repeat. Item 2's miss (line 208) echoes rung 2 less closely. Change item 3's miss; e.g. (builder's wording, the book says remainder, keep clear of the closing "Divide by 1,000: ...") "Count every 1,000 in 25,400, even if there are many." (52).
C. Phase 4, item 3 miss (line 250) "The grams are the last three digits, so read them again." then rung 2 (line 248) "Which three digits of 4,070 are the grams?": a near repeat (played, misses 1 and 2). It came from my round 1 wording of rung 2; change the MISS, keep the rung; e.g. (builder's wording, depends on what was typed, so no number) "Change your kilograms and grams back into grams: do they match?" (61).
D. Phase 2, item 2 miss (line 175) "Each of the 5 kilogram weights is as heavy as the pile you built." After a miss the pan no longer holds that pile (the correction swaps it for the typed grams, then 5,000 g) and the child typed, not built. Minor; e.g. "Each of the 5 kilogram weights is as heavy as the pile that levelled 1 kg." (72).

## QUESTION (owner)
Free play stops at 30 weights (line 764): the 50 kg cement bag never levels and the tap at 30 does nothing, silently; FREE_LINE says "any thing". No maths changes and the beam stays truthful (the cement pan stays down), so I would keep it; if the owner wants it to level, raise the cap to 55 (a heap draws at most 25 of a kind anyway) or print one short line at the cap.

## For the visual reviewer (not judged here)
The phase 4 second board's headers use T.micro and its label sits close above the right board; the phase 3 heap labels in hi/gu.
