STATUS: fixes-needed
SLOTS: M2.S3.T6.C26.2D1 (chunk 3, phase 3, re-look)
FILES: none edited; my extras (play-vr165-*.png, crops) deleted
CHECKS: 21 changed pack frames p3-*-en/hi/gu at 1600x900 (none carried, none sameAs), pixel crops at 2-5x, real-input playkit probe (item 2, 2 dial taps, en), 0 page errors
FAILURES: none (0 must-fix, 3 should-fix, 2 questions)
DECISIONS: none taken (report-only)
RISKS: the picture-size fix touches every phase-3 frame
ESCALATE: no
REPORT: work/indiannica_eng_maths5_ch8/orch/reports/visual-reviewer-1.65.md
visual-reviewer-1.65 · M2.S3.T6.C26.2D1 "Work Back and Split" · CHUNK 3 (phase 3, 21 frames) · RE-LOOK of visual-reviewer-1.29 vs tool-builder-1.42 · r66
Verdict: ISSUES (0 must-fix, 3 should-fix, 2 questions)
fixed (1.29 items): hi length caption under the blue bar (all hi frames with a bar): 6/19/14 सेमी now sits 8-10 px below the bar, matra clear (gu was clear); card + dial now in one top row; card value 72 / unit 40, dial caption "Breadth, cm" 40, length and side labels 40; salmon tile skin: real input item 2 (9x2 tiles) is now violet (146,117,190 = hue 262, sat 0.38), no longer #E0ADAC; plain unit cells are violet (169,153,221 = hue 254, was #D490B6 pink); hi "= 152" vs the "वर्ग सेमी" line under it: clear (about 25 px); 1.29's two-invite ask-shut = KEEP (rule 6).
PARTLY: [1.29 s1 picture small] cells 22 -> 27 px: the 19x8 grid is about 514 x 217 px (about 14% of the working area). Every item is capped at about 500 px wide (9x2 draws 55-px cells, 14x7 30, 19x8 27) while the room beside the open pad is 920 wide; blank band about 60 px above the grid and about 230 px right of it. See should-fix 1.
PARTLY: [1.29 s3 hi "वर्ग सेमी" word gap] was about 3 px, now about 6-7 px (card line and the green third line, p3-win/wrong/end-hi): reads as two words but still tight; cosmetic, not a must-fix.
[should-fix] phase 3, wrong/win/ask-open (19 x 8, 152), en - the Area card value "152 sq. cm" runs to 5 px from the card's right border (left gap 33 px, so it is off-centre; hi/gu have 35-44 px) - fix: centre the value block in the card or shrink the unit so >= 12 px stay clear in the longest case.
[should-fix] phase 3, wrong/win/end, en + gu (hi 11 px) - the side label "8 cm" / "8 सेमी" / "7 cm" ends about 8 px from the green side line (rule 1 wants >= 12 clear) - fix: move the label 6-8 px left or shorten its box.
[should-fix] phase 3, wrong/win/end/ask-open - grid still small (see PARTLY): raise the width cap so 19 columns draw at about 34 px (646 wide; 8 rows = 272 px, still clear of the "Breadth" caption above, and the "8 cm" label at x 200 fits), same size and place pad shut and open; 14 x 7 and 9 x 2 follow.
[question] phase 3 opening (step1, stepwrong, ask-shut, ask-open, en/hi/gu) - still only the length bar plus a 1-row dashed slot at the bottom-left; about 70% of the area blank. The review brief lists "the nearly empty phase 3 opening" as designed: keep, or draw the bar and slot at the same larger scale as the grid?
[question] phase 3, wrong/win/end - plain unit cells (169,153,221) have sat 0.31 (rule 3 asks >= 0.4 for counted cells); the item-2 tile is deeper (0.38). Hue is right (254) and it reads violet; accept, or deepen the plain tint so plain and tile screens match?
clean: p3-step1/stepwrong en+hi+gu (one sentence, hint replaces the instruction, fits, Answer dim), ask-open en+hi+gu (grid does not move between shut and open, Close gold, Enter berry, hi 3-line bubble and gu 3-line bubble inside with room), win/end en+hi+gu (green answer line, Next / आगे / આગળ / Next phase / अगला चरण / આગલો તબક્કો fit their keys), no English word left in hi/gu, every unit box dark-outlined, row label "Row/पंक्ति/હાર" clear, Kiko thinking at the questions, 9th-row spill and wrong-correction unchanged by this fix.
Not looked at: phases 1, 2, 4, summary, free play, party (other chunks).
