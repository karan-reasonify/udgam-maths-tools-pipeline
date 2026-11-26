STATUS: fixes-needed
SLOTS: M1.S1.T3.C11.2D1
FILES: none edited (report-only)
CHECKS: 21/21 changed chunk-2 frames viewed at full size (p2 step1/stepwrong/ask-shut/ask-open/wrong/win/end x en/hi/gu); pixel measures of the strip border and label ink; extra gotoStep frames for Q2/Q3 (en, hi viewed)
FAILURES: 1 must-fix, 2 should-fix, 2 questions
DECISIONS: none for the owner beyond the two questions
RISKS: the Q3 strip line crosses its own panel in en and hi
ESCALATE: none
REPORT:
visual-reviewer-1.44 | M1.S1.T3.C11.2D1 "Square and Triangle" | RE-LOOK chunk 2 (phase 2), en/hi/gu | runtime r66 | vs visual-reviewer-1.8 + tool-builder-1.38
Verdict: ISSUES (1 must-fix, 2 should-fix, 2 questions)
Frames: all 21 changed frames of chunk 2, full size, none sameAs/carried; extra: gotoStep Q2 (en, hi) and Q3 (hi) untouched asks (my own play-v144-* PNGs and scratch deleted).
Fixed (from 1.8): "65 cm" on the paper edge, FIXED (p2-end en/hi/gu: label 53-59 px clear of the paper border, was 4-7 px or crossing); picture size, PARTLY (paper 468x512, Q1/Q2 triangle ~320x375 was 230x250, side labels 44 digit over 32 unit, strip lines now 40 on all 4 Q3 lines; see should-fix 2); squared paper counting invite, FIXED (faint 1 px hairline, no longer reads as 1 cm cells); written Boundary, FIXED (Boundary / सीमा / સીમા on every lit vermilion edge in wrong/win/end, clear of the edges and the ant); Walk ring now under its label, FIXED (step1/ask frames, all 3); gu key labels fit. Pack-shortcut note (two cues in untouched ask frames) acknowledged, and the 220 px paper slide shut->open is left per review-fix-rules 6 (not re-raised).
MUST-FIX
[must-fix] p2-end-en and p2-end-hi (Q3 Sum strip, line 1 "1 m + 80 cm + 65 cm" / "1 मी + 80 सेमी + 65 सेमी") — the 40 px line is wider than its panel: ink x 784-1192 (en) and 783-1193 (hi) against the panel's right border at x 1183-1184, so the last "cm"/"सेमी" stands ~9 px OUTSIDE the panel (gu ends x1150, fits). Not fixed from 1.8 (hi was flush) and now en crosses too: the builder's "fit to the longest line" under-estimates the width. Fix: fit line 1 to the measured panel width minus 2 x 19 (size 34-36 for that question) or widen the panel to ~480 (78 px free before the Next phase key at x1258).
SHOULD-FIX
[should-fix] p2-step1-hi / p2-stepwrong-hi (and p2-ask-shut-hi 15 सेमी, Q2 7 सेमी) — right side label "8 / सेमी": ink x677-743 is 9 px from the triangle's vertical edge (x668) and 8 px from the paper border (x751); Q2 hi 7 सेमी is ~11 px from the border. Rule 1 wants >= 12 px clear in the longest language, and the builder's "14+ inside the paper" does not hold in hi (en 24 px, gu 15 px). Clamp 14+ from the border and edge in hi, or nudge the label/figure ~10 px left.
[should-fix] p2-end en/hi/gu (and Q3 ask) — Q3 triangle is ~300x170 and sits in the top 55% of the 468x512 paper, ~190 px of paper empty under "1 m"; Q1/Q2 fill their paper, Q3 does not (rule 11). Centre it vertically and scale it up (the 1 m base can go from 320 to ~380 px).
QUESTIONS
[question] p2 ask/win/end, all langs — the Sum strip is a blank 420x410 card in every ask frame and at most ~40% filled even at the end (4 lines, 40 px). Accept as the working card that fills while the ant walks, or shrink it / give the lines more room (and the ask frames more picture)?
[question] p2-win/wrong/end — the brief's green "labelled Answer" is still only the unit line "= 45 cm" (no written "Answer"); Boundary now has its word. Accept as is?
CLEAN (judged fine, no change since 1.8 needed): Next / Next phase / आगे / આગળ keys berry and fit (hi "अगला चरण", gu "આગલો તબક્કો" inside the key); bubble lines fit in 2-3 lines in all 3 languages, no matra touching, hint alone in bubble (keyOnly, by design); Kiko thinking at the asks; header three discs untouched; nothing red, no cross after a miss; slot empty after the miss (kept); no English word left in hi/gu frames; no console errors in the extra frames; Q2 labels (5/7/9) clear of edges in en and hi.
