STATUS: ok
SLOTS: M2.S2.T4.C16.2D1 (RE-LOOK, chunk 3 of 3: phase 4, summary, free play)
FILES: none (report-only; my play-vr173-*.png and scratch crops deleted)
CHECKS: 24 changed pack frames (p4 step1/stepwrong/ask-shut/ask-open/wrong/win/end/summary x en,hi,gu) opened at 1600x900, plus party x3 and free en/hi, plus playkit real-flow frames en (warm-up, Q1 locked, counted, miss, win, Q2, Q3) and crops of the summary thumbnails and hi rows
FAILURES: 0 must-fix, 0 should-fix, 3 low/questions
REPORT: work/indiannica_eng_maths5_ch8/orch/reports/visual-reviewer-1.73.md

C16 Square Cover, phase 4 + summary + free play, RE-LOOK, runtime r66 silent. Verdict: CLEAN (0 must-fix, 0 should-fix; 3 low items left open by the builder's own list).
fixed (vs visual-reviewer-1.20, tool-builder-1.43):
- amber over violet read brown (p4-wrong en/hi/gu): FIXED. Patch B is now a clear amber (#D89B20-like) with its dark outline and the 21; the real-flow miss frame is the same. At the win the lit patch is clear green (pack win teal, real flow a deeper green), the other patch stays violet or white.
- thumbnails rows 1 and 3 identical 6-box grid (p4-summary en/hi/gu): FIXED. Row 1 is a real 6x2 beside 12, row 3 a real 13x3 beside 39 (counted in a 3x crop; boxes about 10 px, dark outlined, one violet).
- thumbnail row 4 tiny "=/": FIXED. Drawn not-equal, about 37 px wide with two bars and a slash, dark ink, about 40 px clear on the left and 15 px on the right of the big violet square. No English in hi/gu thumbnails.
- Patch A/B label stair-step: FIXED. Labels share one line and counts share one line in ask, wrong, win (y 219 / 413), Q2 (185 / 433), Q3 and end (153 / 479); every language. Seen on the real flow too (Q1 win, Q2 win).
- warm-up pair vs question (question in 1.20): FIXED. The step pair is now plain with dark outlines like the questions, cell about 107, no cream tile; the step picture fills the left 60 % and the area right of it is the open-pad room, as in the question.
- hi summary row pitch: NOT FIXED (builder listed it, low). Headings and "तुमने सीखा" lines are 3-4 px apart in a 3x crop; nothing touches, readable at about 28 px; English and Gujarati fine.
- Orphan words: hi p4-stepwrong "है।" alone on line 2 and gu p4-win "20." alone: NOT FIXED (cosmetic, builder left them; gu stepwrong now fits on one line).
- Party frames (win changed): sparkles round the cheering Kiko now show in en, hi and gu (the earlier question about missing sparkles is gone); cones beside the bubble and above the pills, confetti only over the stage, Kiko whole.
- Free play en/hi: unchanged since round 1 (same pixels, not rebuilt); still clean: Lay a row and New shape keys live, 4 cm / 3 cm labels deep blue, Answer flat, all words translated.
New defects from the moved layout: none. Checked: no label or matra touches a grid in hi/gu (nukta of "टुकड़ा" about 12 px above the grid), Close / Answer / Next / Summary keys berry or yellow and fitting in all three languages, nothing under the key corner, Kiko thinking at every ask and miss frame and standing in the guide steps, counts 40 px dark, grids dark-outlined at fixed size with the pad shut or open, skins 32 cells or fewer on the end screen.
[question, low] p4 Q2 and Q3, real flow en: Q2 opens with the Count A key ringed AND the berry Answer key live (Q3 the same with Same size); only the Count/Same size key is ringed, so it is one invite, but the gate that holds Q1 flat does not hold them (builder says by design: touched carries from the warm-up only into Q1). Keep or gate Q2/Q3 too?
[question, low] p4 pack route: ask-shut/ask-open show a live berry Answer key and win shows Patch A unfilled because the pack skips the acts (same caveat as 1.18-1.20). I judged those states on real-flow frames: Q1 opens with Answer flat and Count A the only invite; after Count A the Answer key stays flat and Count B is the invite; after both counts it turns berry; win shows A violet 20 and B green 21.
[nit] p4 summary en/hi/gu thumbnail row 4: the not-equal sign sits closer to the big square (15 px) than to the small one (about 40 px); fine as drawn.
unchanged since round 1: p4-free-en/hi/gu (not rebuilt), start pages (not in this chunk).
