STATUS: fixes-needed
SLOTS: M1.S2.T6.C28.2D1 (phases 1-2 re-play; en; real mouse + finger via playkit)
FILES: none (PNGs play-re*.png in work/indiannica_eng_maths3_ch10/M1.S2.T6.C28.2D1/)
CHECKS: re-played every earlier finding with real mouse AND finger (8 of 9 CLEAN, listed in REPORT); also whole phases 1-2 by finger with the Next key into phase 3, AI mode, free play, queue edge cases
FAILURES: must-fix 1 NEW (keyboard-only child cannot count the rows in Q1.1); should-fix 2 (Q1.1 win chip overlaps the 4th week block; two dead-looking taps still open)
DECISIONS: question 1 still open (F9: Q2.1/Q2.2 accept the right KIND of spot: July on May's knuckle + 31 wins)
RISKS: none new; the negative <rect> width not worse (0 console errors in 2 more motion-ON runs with ten double clicks on Answer and a Close/Answer mash during the traceback)
ESCALATE: no
REPORT: work/indiannica_eng_maths3_ch10/orch/reports/play-tester-1.7.md
---
RE-PLAY of my findings, C28 phases 1-2 (preview rebuilt, mouse and finger):
(1) KEYBOARD GATE BYPASS: CLEAN. Enter on the start page, Enter x3 on the steps, then 28 (Q1.1) / 31 (Q2.1) + Enter is refused and the bubble says "First tap 4 full rows of the calendar." / "First put the July card on a knuckle or a dip."; a real keyboard-only run also gates Q2.2. play-re1-enter-only-p1.png, -p2.png. AI mode answer()/check() still go through ungated.
[must-fix] NEW, phase 1 Q1.1 keyboard: the gate is now armed but the question cannot be finished by keys. Repro: `phase=1&probe=1&startpage=1`, Enter, Enter x3, Tab until the `week` rows control is focused (it is), Enter or Space x4: no row counts, counter stays empty, Answer stays dim, the nudge repeats. Every other keyboard act works (Flip year, Count weeks, month card, card pick + slot, free-play dates). Same with the gate unarmed, so Enter/Space on `week` in ask never counted; the fix makes it a dead end. Should: Enter/Space on the rows control counts the first free full row. play-re12-keyboard-rows-armed-true.png.
(2) Q1.2 arrows Jan to Dec (11 taps) count January and open the gate: CLEAN. Nudges CLEAN: partial row, blank row, dead cards, dim Next arrow, dim Answer key and the Hint key all show the question's nudge (Q1.2 to Q2.3 have theirs). play-re2-mouse-q11-nudges.png, play-re2-touch-q12-arrows.png.
[should-fix] still open (low): (a) after picking a card in Q2.x nothing marks the slots to tap or drop on (play-re7-q21-picked.png); (b) free play Next at Dec 2099 and Last at Jan 2000 still look live and show nothing (play-re9-free-dec2099.png).
(3) Grid view and Last month in the guide steps: CLEAN (view toggles / page flips, no hint; Dec 2025 then Next to Jan 2026 does not credit step 3, it stays 2/3). play-re3-mouse-prev-at-step3.png.
(4) Win after a miss complete: Q1.1 (4 rows, 7/14/21/28), Q1.2 (all 12 cards lit incl. Dec), Q1.3 (52 weeks, 364 days, 1 day left, 365): CLEAN. play-re4-q12-win-after-miss.png, play-re4-q13-win-after-miss.png.
[should-fix] NEW, phase 1 Q1.1 win (first try or after a miss): the "28 days" chip lies over the end of the 4th week block and half of its "28" label, which also reaches the panel edge. play-re6-q11-win-first-try.png, play-re4-q11-win-after-miss.png.
(5) CLEAN: 12 cards tapped 1.1 s apart (mouse and finger) all count and open the gate; 120 ms mash queues in order; queued taps do not leak into a phase dot or restart; two Enters 50 ms apart in reduced motion do one step in phases 1 and 2; a double tap on every step control one.
(6) CLEAN: decision 14 on every ask frame of Q2.1/Q2.2/Q2.3 (tray, pick, drop, wrong-kind spot, ghost walk, trace at 4 times, typing; mouse and finger): no numeral beside Jul/Jun/Sep/Oct before the win. play-re8-mouse-q21-trace-end.png, -q23-trace-end.png.
(7)(8) Negative <rect>: not worse (0 errors). Whole phases 1-2 by finger with the Next key opens phase 3 clean (no wrong-act hint); nothing moves by itself.
