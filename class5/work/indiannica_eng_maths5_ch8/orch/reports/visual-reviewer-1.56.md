STATUS: fixes-needed (minor)
SLOTS: M2.S2.T5.C21.2D1 (chunk 2, phase 2, changed frames)
FILES: none edited (report-only)
CHECKS: all 21 changed pack frames viewed at full size (p2 step1, stepwrong, ask-shut, ask-open, wrong, win, end x en/hi/gu); pixel-sampled the laid row; 2x crops of the garden, the Row chip and the answer line. Scratch crops deleted.
FAILURES: 0 must-fix, 2 should-fix (both minor), 0 new questions
ESCALATE: none
REPORT:
visual-reviewer-1.56 | C21 Rows Times Squares | phase 2 re-look of visual-reviewer-1.11 vs tool-builder-1.40 | Verdict: ISSUES (0 must-fix, 2 minor should-fix)
Fixed (vs 1.11):
- FIXED laid row colour: p2-step1/stepwrong/ask-shut/ask-open (en/hi/gu): the bottom row is now a clear violet over the marigold photo, deeper than the orange above it (sampled median hue 254-255, sat 0.55, value 0.74), not grey-lilac. Unlaid marigolds stay orange.
- FIXED "Row" label: chip "Row" / "पंक्ति" / "હરોળ" is on the laid row in all ask frames, 32+, dark violet ink, no touch with the 16 m / 9 m pills.
- FIXED all-laid grid: p2-wrong (en/hi/gu): all 112 cells read one violet wash with the flower texture still visible, no brown or mud; the answer green appears only on win.
- FIXED leaf-patch outlines: a light under-stroke now sits beneath the dark outline, so the dark top-row and centre patch cells keep an edge (wrong, win, ask; 2x crops).
- FIXED record line: one run with equal gaps, "16 × 7 = 112 sq. m" / "112 ચોરસ મી", unit on the result, left edge on the grid's left edge (win, wrong, end; all langs). No "=112".
- PARTLY the hi unit: "112 वर्ग मी" now has a space but it is very tight, a hair wide next to the glyph tail (win/wrong/end hi); gu "ચોરસ મી" has a clear gap.
New / remaining:
[should-fix, minor] p2 ask-shut, ask-open, step1, stepwrong, hi — the "पंक्ति" chip on the laid row is as tall as the row: at 16 x 7 (row ~45 px) it spans the whole row and sits on the grid's dark bottom outline and the line above it; at 9 x 6 it is ~3 px from the top. en and gu keep ~4-5 px clear. Fix: cap the hi chip height to the row minus ~8 px (smaller line pitch or padding) so its pill edges stay inside the row; rule 1 says clear of the outline.
[should-fix, minor] p2 win/wrong/end, hi — the space in "वर्ग मी" is only a few px wide beside the large unit text; widen it (a no-break space plus a thin extra) so it reads as two words like "वर्ग मीटर" in the bubble.
Clean (judged fine): win/end plain teal 14 x 9 grid (126 cells, plain right) with dark outline on every box, "9 m" upright and clear; Fill key, Answer / उत्तर / જવાબ, Close / बंद करें / બંધ કરો, Next / आगे / આગળ, Next phase / अगला चरण / આગલો તબક્કો all fit with no clipped matra; bubbles 2-3 lines, hi/gu matras clear of the outline; Kiko thinking at the ask frames; no giveaway before the answer; nothing red after a miss; the grid stays one size and place with the pad open or shut.
Not re-raised (KEEP list, rule 6): Answer key berry before the first touch, the emptied slot after a miss, the hint alone in the bubble, Latin "m" in hi/gu labels (earlier question, unchanged).
Not looked at: summary thumbnails, party frames and other phases (other chunks); a mid-Fill frame (the all-laid wrong frame shows the full laid state); hi/gu wording quality.
