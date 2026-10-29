STATUS: fixes-needed
SLOTS: M1.S2.T6.C28.2D1 (Calendar Explorer, Gujarati confirm-only look; round-2 frames of pack 09:32, all 36 changed gu frames judged, key ones at full size and zoomed)
FILES: none
CHECKS: closed from round 1: "4 અઠવાડિયાં" chip text fits; 2042/2046 labels (p3-choice-wrong) now below the ruler; date ring sized to its cell; hop arcs clear of digits; stray dashed ring gone; rivets clear; taller strip cards and "લીપ વર્ષ" tag clear of the card; summary thumbnails differ; wrists round
FAILURES: 2 regressions + 1 still open
 - [must-fix] p1-win-gu (regression): the 4th row ("28") draws beside row 1 at x 855-1130, y 340-370 and its "28" label collides with the "28 દિવસ" chip (y 298-346); if mid-slide, hold the pack frame until the row is in place, else stack rows in one column as p4-win does
 - [must-fix] p4-win-gu (regression): the widened "4 અઠવાડિયાં" chip (x 862-1125, y 112-163) now sits on the enlarged row label "7 દિવસ" and its bottom border cuts the top of "િ" (zoom 850-1140, 100-210); lower the rows 10 units or narrow the chip
 - [still open, small] p2-end-gu: the dropped "ઑક્ટો" card in the slot (x 858-935) still touches both outlines, and the September/October green rings meet at x 857; tray cards (p2-ask-shut, p1) are inside their cards now
DECISIONS: none
RISKS: p3-choice-wrong "લીપ વર્ષ" tag is 4 units above the "2044" marker chip (crowded, not overlapping); not asked, not blocking
ESCALATE: no
