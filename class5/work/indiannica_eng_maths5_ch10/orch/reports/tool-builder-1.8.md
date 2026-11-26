STATUS: ok
SLOTS: M3.S5.T9.C30.2D1
FILES: class5/work/indiannica_eng_maths5_ch10/M3.S5.T9.C30.2D1/tool.tsx (+ re-ported pair)
CHECKS: check --no-render 32/0/0; full check 1: 93/0/2 (guide-steps, action-anim: the hold also caught the FIRST step at a phase's open); fixed; full check 2: 95 pass 0 warn 0 fail, ported
FAILURES: none
DECISIONS: play-tester-1.22 double-tap fix: real act presses (act key, month cards) and the act nudge held 800 ms when a question's entry opens (next question, next(), gotoStep(), restart) and after the LAST guide step's act; never during the steps; toolApi/HOOK paths unguarded
RISKS: none
ESCALATE: no
REPORT: work/indiannica_eng_maths5_ch10/orch/reports/tool-builder-1.8.md
Probe (reduced motion, playkit): P1-P4, Enter for step 1, then a double tap on "count" at 45/300/500/700 ms, mouse and finger (32 runs; the first build also 45/150/300/500/600/700 = 48 runs): Q1 opens untouched (no shade, no cut, no jump), Answer key disabled, question showing. Two Enters 50 ms apart at the last step: Q1 untouched. No wording change; no frame should change.
