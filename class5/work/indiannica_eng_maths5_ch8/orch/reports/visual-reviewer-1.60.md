STATUS: ISSUES
SLOTS: M3.S4.T8.C36.2D1 (phase 2, changed chunk 2)
FILES: none edited (report-only)
SUMMARY: 0 must-fix, 3 should-fix, 2 questions
visual-reviewer-1.60 · C36 Cube Counter (M3.S4.T8.C36.2D1) · phase 2, changed chunk 2/4 · en/hi/gu
Frames: all 24 changed pack frames at full size (open, ask-shut, wrong, win, choice, choice-line, choice-wrong, end x en/hi/gu; none sameAs/carried), plus pixel sampling and crops of chips/cube (scratchpad, deleted). Checked against visual-reviewer-1.24 and tool-builder-1.41.
FIXED (earlier must-fixes, verified):
- "1 cu. m" chip cut by the drawer (choice-wrong, en/hi/gu): FIXED. Chip border x712-951, drawer border x979 (28 px clear); the whole "1 cu. m / 1 घन मी / 1 ઘન મી" reads in full.
- "1 m" on the cube's silhouette edge (choice, choice-line, choice-wrong, all langs): FIXED. Label starts x637, edge/blue line ends x616 (about 21 px clear), label sits beside the vertical edge at mid-height; bottom two labels clear of their lines by 20+ px. Label-to-chip gap 24 en / 19 hi / 30 gu (fine).
- Mauve cube: FIXED, reads violet. Sampled (5x5 mean) on the shelf 1 m / 1 cm / 1 mm cubes and the choice unit cube, identical in en/hi/gu: left #7B5BC2 H259 S0.53, right #6B4FA7 H259 S0.53, top #9174C7 H261 S0.42 (was #B085A0 mauve). The "Unit cube" title is #503B9C H253: same violet family, so the legend no longer contradicts. Answer cube (win/wrong/choice-wrong) is solid green: left #219E73 H159 S0.79, right #1D8A62, top #45AF85. Silhouette edges clean (only a faint lighter stripe on the left edge at 2x, invisible at full size).
- Item 3: the 1 mm cube now settles right beside the ring (end, 3 langs): FIXED. Grain is neutral white/grey, no violet: FIXED (size: see below).
- hi shelf labels: FIXED (ikaar tops about 11 px under the board; "Not drawn to size." caption now above the shelf, clear). hi/gu chip "घन मिमी / ઘન મિમી" widened to 190 wide, 30 px side padding, text clear of the border: FIXED.
- gu choice-wrong hint now one line (no lone "છે."): FIXED. hi "है।" alone on line 2 (choice-wrong) and gu "છે." alone (win) remain: cosmetic, fix-rule 2, not raised.
- Not re-raised (KEEP / builder-kept): live berry Enter before the first pick (rule 6), "1 m" left on the shelf after its cube moves (kept as a moved cue).
PARTLY:
- Unit-cube picture size (choice/choice-line): now about 345 x 375, about 28% of the open 900x520 area (was about 19%) but only about 15% with the pad shut (about 830 px empty at the right). See should-fix 3.
- Grain picture (end, item 3): grain 25 -> 45 px, neutral, but still tiny. See should-fix 2.
SHOULD-FIX
[should-fix] phase 2, win/wrong (item 1) and end (item 3), en/hi/gu — the unit chip ("cu. m" / "cu. mm" / hi, gu) sits in the picture card's bottom-left corner: x127-319, y440-497 inside the paper x118-650, y138-500, i.e. about 3-4 px above the picture's bottom edge and about 9 px from its left edge (rule 1: at least 12 px clear) — move it up and in by about 14 px, same place in all three languages.
[should-fix] phase 2, end (item 3), en/hi/gu — sugar grain + dashed ring + 1 mm cube are about 170 x 130 inside a 530 x 360 lavender card (about 12%; the white grain reads as a small cube-outline icon) — scale the whole group about 2x (ring about 260, grain about 90, green cube about 60), keep the cube beside the ring and the chip clear of it.
[should-fix] phase 2, choice/choice-line/choice-wrong, en/hi/gu — the unit-cube group is still under a third of the working area, and a big blank right side with the pad shut — it is height-bound only by choice (title y155, labels y530, panel y92-640): scale about 1.3x and keep its place so it does not move when the pad opens (the label and chip clearances above must hold at the new size).
QUESTIONS
[question] phase 2, open/ask-shut/wrong, hi — the caption "माप के अनुसार नहीं बना।": the chandrabindu of "नहीं" almost touches "बना" (word gap about 4 px) — acceptable, or add a no-break thin gap?
[question] phase 2, choice-wrong, hi — "1 मी" (ends x693) to the "1 घन मी" chip (starts x712) is 19 px, reads as one run; shifting the chip right about 8 px still leaves 20 px to the drawer — do it?
CLEAN (judged fine): Kiko thinking pose and bubbles in every ask frame, bubbles unclipped in hi/gu, phase dots, header trio, berry Enter/Answer/Next/Next phase keys, "Not drawn to size." in all three languages, classroom card (board and desks readable, 1 m cube on the floor at the right), no red or cross after a miss, no English left in hi/gu. Unchanged since round 1: none (all 24 frames changed).
