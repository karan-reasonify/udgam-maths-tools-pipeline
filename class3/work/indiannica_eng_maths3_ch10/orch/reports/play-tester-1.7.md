STATUS: fixes-needed
SLOTS: M1.S2.T6.C28.2D1 (phase 1 keyboard re-play, plus phases 1-2 regression; real keys, mouse and finger)
FILES: none (PNGs play-rr*.png in work/indiannica_eng_maths3_ch10/M1.S2.T6.C28.2D1/)
CHECKS: points 1, 3, 4, 5 CLEAN; point 2 mostly CLEAN (Flip year and Count weeks by keys win); one low should-fix open
FAILURES: should-fix 1 (low): keyboard focus is lost after Enter/Space on the Next/Last arrows and the month cards
DECISIONS: question F9 still open (Q2.1/Q2.2 accept the right KIND of spot)
RISKS: none; negative <rect> width not worse (0 errors, 2 more motion-ON probe runs plus both full-lesson runs)
ESCALATE: no
REPORT: work/indiannica_eng_maths3_ch10/orch/reports/play-tester-1.7.md
---
LAST RE-PLAY, C28 phase 1 keyboard (real keys, mouse and finger):
(1) CLEAN: Enter on the start page, Enter x3 on the steps, Tab to `week`, then Enter x4, Space x4 or Enter/Space mixed (500 ms apart): 4 rows counted, focus stays on `week`, Answer goes live on the 4th, the next Enter goes on to Answer, 28 + Enter wins; 4 quick presses (60 ms, reduced and real motion, Enter and Space) give exactly 4 rows (28 week blocks) and the same win. A partial row by mouse or finger is refused with "First tap 4 full rows of the calendar.". play-rr1-Enter-x4-500ms-.png, play-rr2-motion-space-60.png.
(2) Q1.2 and Q1.3 by keys only (Q1.1 to Q1.3, no pointer): CLEAN on the Flip year route: typing 12 / 365 with no act is refused with the nudge, Tab to Flip year + Enter or Tab to Count weeks + Space opens Answer, 12 and 365 win. [should-fix, low] the arrow route: Enter or Space on Next/Last (and on a month card) flips ONCE and focus drops to BODY, so Enter x11 on Next ends at February and the child must Tab back each time; the `week` fix keeps focus, the arrows do not. Repro: `phase=1&probe=1`, goto Q1.2, Tab to `next`, Enter x4, month stays February, focus BODY. play-rr3-q12-arrows.png.
(3) CLEAN: Q1.1 win has four rows in one column with 7/14/21 and the green 28, the chip is clear, first try (mouse) and after a miss (finger). play-rr4-q11-win-mouse-first.png, play-rr4-q11-win-touch-miss.png.
(4) CLEAN: after a card pick the free slots show a blue dashed mark (9 slot controls, 12 dashed rects) in mouse and finger; free play Next dims at Dec 2099 and Last at Jan 2000 (extra taps do nothing); decision 14 holds on every ask frame of Q2.1 to Q2.3 (tray, pick, drop, wrong spot, trace at 3 times) with no numeral beside Jul/Jun/Sep/Oct. play-rr6-touch-q21-picked.png, play-rr5-free-dec2099.png. Whole phases 1-2 by finger and by mouse with the Next key reach phase 3 clean (all 6 questions win, party at the phase end, no wrong-act hint).
(5) Negative <rect> width: not worse, 0 console errors in all runs.
