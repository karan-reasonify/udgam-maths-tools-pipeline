# unit_ladder (M1.S2.T3.C10.2D1) MATHS REVIEW round 2 (changes only, English; reviewer: udgam-maths-reviewer, 2026-10-21)
Verdict: ISSUES (0 must-fix, 1 should-fix, 3 optional). Line numbers are tool.tsx at review time. Baseline: review-maths-1.md.
Evidence: quick check 29 pass 0 warn 0 fail; a full check run during this review: 92 pass, 0 warn, 1 FAIL = summary-thumbs in hi/gu only (TR empty), guide-steps passes. Longest bubble line 79 chars
(p3 ladder[1], unchanged). Frames seen: phase-1-wrong.png, sheet-mount.png, sheet-wrong.png, .build/hintframe-en-1-step.png, images-preview.png (all three skins are "blank face": no numerals, no marks).

## Round-1 items
1 Q3 correction lights the ref: CLOSED (p1Lane 793-800, signNode lit 749; value is the submitted "a|b|c" string, runtime 3427; the ghost && empty branch lights the same refs at lv >= 2 even if the string were an array). Nothing lit before a miss.
2 Q1 miss (142): CLOSED, hint matches the drawn stick (ticks every 10 cm are the long ones, 778); the tens stay unnumbered.
3 tray hints (130-132): CLOSED, true at each step (tray cells never shift: UL_TRAYX 283, a laid cell is dropped, 804-805); frame hintframe-en-1-step shows ruler left, stick middle, sign right.
4 near-copies (134, 153): CLOSED (rung 3 and Q3 win now differ from the closing).
5 step hints (163, 164, 193, 194, 223): CLOSED; each key named is on screen at that step and sits at UL_KEY (269); p3 step 2 no longer names its result.
6 ph4 Q3 board (916): CLOSED, four empty boxes while lv < 2 even after Step up is tapped; filled only in the correction (lv 2) or the win.
7 p2 ladder[0] (167): CLOSED. 8 p4 ladder (228): rung 1 CLOSED, rung 2 see NEW 1. 9 p4 closing (229): CLOSED.
Skins: stick (cream wash 0.6 uncounted, deep blue counted), sign, road reveal nothing before the child acts: counted blue sticks and their "100 cm" labels appear only in the Q1 correction (lv >= 2), and they differ from the
uncounted stick by size, place and label, not by colour alone.

## NEW 1 (should-fix) phase 4, ladder[1] (228)
"Count the places the smaller unit must fill, then put a digit in each." -> "Start the smaller part at the ones place and work to the left." (62)
Why: done literally the strongest rung does not exclude the phase's own near misses (6 km 38 m: 3, 8, 0 = 6,380; 9 km 7 m: 7, 0, 0 = 9,700; 305 cm: 5, 0 = 3|50), because it never says where the digits go. It also
re-asks what ML4's miss (236, "How many places do the metres take beside kilometres?") and Q3's miss (244) already asked. The new line settles the place of the digits, is not a copy of the closing (229), prints no number.

## Optional (leave if you disagree)
a. Tick tiers (778): 0, 50 and 100 are 18 px, the tens 13 px. Q1's miss says "the long marks ... are 10 cm apart"; a child counting only the 18 px marks finds 2 gaps. Cheapest: `i % 10 === 0 ? 13 : 6` (same tick at 0, 50, 100), or let the visual reviewer judge.
b. p2 ladder[0] (167) partly re-asks Q1's miss (what number is on the step) and Q3's miss ("Multiply the centimetres first") already names the part. Not a copy; leave.
c. Q1 miss literal reading: counting gaps gives 10, and a child who stops there may type 10 or 30. Covered by rung 2 and the correction; leave.

## Not verified here
The Q3 (tiles) correction is not in any check frame; read from source only. The visual reviewer should look at it once (a wrong tiles answer, the three refs lit beside the steps whose tile went back).
