STATUS: fixes-needed
SLOTS: M1.S2.T6.C28.2D1 (class 3 ch 10, Calendar Explorer, English confirm look)
FILES: none
CHECKS: confirm-only look at the rebuilt English pack (start, p1 step1/hintkey/wrong/win/end, p2 step1/stepwrong/ask-shut/ask-open/wrong/win/end, p3 step1/ask-shut/wrong/win/choice/choice-wrong/end, p4 step1/ask-shut/wrong/win/end/summary/free, p1-party, p4-party) plus a zoom of the summary thumbnails and of p1-end
FAILURES: 1 regression must-fix (p1-win); of the 4 earlier must-fix, 3 are closed and 1 has a small residual (p4-summary "Wednesday")
DECISIONS: none
RISKS: none beyond the two items below
ESCALATE: no
REPORT: work/indiannica_eng_maths3_ch10/orch/reports/visual-reviewer-1.10.md
Verdict: ISSUES (1 regression, 1 residual). Everything else from round 1's must-fix list is closed.
[must-fix, regression] p1-win: the new 4th week row ("28 days") is laid out on the same line as the 7 row, at the right (bars x 855-1075, y 340-370), and the green "28 days" chip sits on top of it: the "28" label (x 1090-1128) is cut by the chip's lower edge. Rows 14 and 21 are stacked below as before. Fix: lay row 28 under row 21 (y about 470) and keep the chip clear of every row label.
[residual, small] p4-summary: the thumbnails and the icons are fixed ("1 more day", "Year 2045"), but the "y" of "Wednesday" still runs about 4 px past the pill's right edge (x 1526-1531). Fix: font one size down or widen that pill.
[watch, not a must-fix] p1-end: the "365 days" chip touches the top edge of the 4th 52-week block (y 347-348). A few px of room would do.
Closed: p4 invite ring now fits its cell (no strike-through of heading or date); p4-end/p4-party "Wednesday" chip inside its pill and the box; p3-choice-wrong ghost years no longer overlap each other or the marker (they now sit below the ruler and are cleared at the win); p4-win and p4-end show the full route and the 28 row; p3-end "Year 2045" chip; fist wrists clipped, no tan slivers; party frames fine (cones clear of bubble and pills).
