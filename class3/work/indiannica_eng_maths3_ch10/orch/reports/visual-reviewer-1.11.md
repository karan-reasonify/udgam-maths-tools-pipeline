STATUS: fixes-needed
SLOTS: M1.S2.T6.C28.2D1 (Hindi, final confirm-only look)
FILES: none
CHECKS: viewed 24 changed hi pack frames at full size (start, p1-step1/wrong/hintkey/win/end, p2-ask-shut/wrong/win/end, p3-ask?/choice/choice-wrong/win/end, p4-step1/ask-shut/wrong/win/end/summary) + 1 zoom of p1-win; party frames unchanged (same hash)
FAILURES: 1 regression (below); earlier 4 must-fix all closed
DECISIONS: none
RISKS: none other
ESCALATE: no
[REGRESSION, must-fix] p1-win-hi - after the right answer (4 x 7 = 28) the week counter draws the 4th row of seven boxes BESIDE row 1 (x 855-1077, y 340-368), not under row 3; the "28 दिन" chip's bottom edge overlaps its top, and its "28" label touches the panel's right edge. Rows 14 and 21 are stacked under row 1 on the left (p4-win-hi stacks all four rows correctly). Fix: put the 4th row at the next row slot (under 21, label "28") for the p1 weeks counter, same as p4-win.
Closed (confirmed in the new frames): weekday headings बु गु शु now clear of the rule (all calendar frames); summary chip "1 दिन ज़्यादा" fits beside its icon (p4-summary); p4 ring fits its cell with the heading and digit below clear (p4-step1/ask-shut); p3-choice-wrong ghost labels 2042 / 2046 sit below the ruler, no collision; hop arcs clear of 10/17/24; "मुक्त खेल" and the 365-day closing lines fit (p1-end is three lines, inside the bubble).
Still open, unchanged since round 1 and not re-listed (should-fix): p2-wrong the July calendar over a fist.
REPORT: work/indiannica_eng_maths3_ch10/orch/reports/visual-reviewer-1.11.md
