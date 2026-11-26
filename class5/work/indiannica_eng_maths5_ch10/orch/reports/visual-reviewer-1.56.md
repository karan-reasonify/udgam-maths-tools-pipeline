STATUS: ISSUES (1 must-fix, 1 should-fix, 2 questions)
Visual review, Hindi frames only, round 3 re-look. Class 5 ch 10, slot M1.S2.T3.C9.2D1 (Big to Small Converter), pack built 13:46, runtime r66. All at full 1600x900.
Looked at (37 Hindi frames, all flagged changed): p1 step1, stepwrong, ask-shut, ask-open, wrong, win, hintkey, end; p2 step1, stepwrong, ask-shut, ask-open, wrong, win, end; p3 step1, stepwrong, ask-shut, ask-open, wrong, win, end; p4 step1, stepwrong, ask-shut, ask-open, wrong, win, choice, choice-line, choice-wrong, end, summary, free; party p1 and p4 (never compared, looked at anyway). Ink measured on pixels (crops in scratch, deleted).
Unchanged since round 2: start-hi. Skipped as sameAs: p1-again-hi (= p1-step1-hi).

ROUND-3 FIXES
1 Lit unit-fact pills: OK. Pill outer 258x42 (phase 3 "1 मिनट=60 सेकंड"), 226x42 (phase 1 "1 दिन=24 घंटे"), 258x42 (phase 2/4 "1 घंटा=60 मिनट"). Text ink air per side: ph3 15/14, ph2/4 25/23, ph1 28/26 px (all >= 12); top 4, bottom 4-5 px (centred). No glyph or matra touches the outline in any lit frame (p1/p2/p3 wrong+win, p4 wrong+win+choice-wrong+end; p1/p2/p3-end show no lit pill). Visible air to the rung outlines above/below is 3-4 px (6 nominal stroke-centre to stroke-centre); see question 1.
2 Ladder column moved right: OK. Rungs 98-298, pill max 69-326, main area from 344: 18 px clear, 29 px from the card edge, nothing overlaps.
3 Few given bars grow: OK. 2/3 bars are 182 wide (p1-step1, p3-step1, p4-ask, p4-choice); the area reads filled, no longer ~75% empty. Exception: question 2.
4 Bubble "3 और 3/4 घंटे" / "2 और 3/4 घंटे": OK (p4-ask, p4-win "हाँ, 3 और 3/4 घंटे 225 मिनट होते हैं।", p4-choice*, p4-choice-wrong).
5 Operator gaps: OK. p3-wrong/win "26 × 60 सेकंड + 15 सेकंड": 17 before "+", 10 after. p3-end line 3 "65 × 60 सेकंड = 3,900 सेकंड": 15 before "=", 10 after. p4-wrong "3 × 60 मिनट + 3/4 × 60 मिनट": 22-31 around the signs.
6 Tray chip: OK. "15 मिनट" chip 160x48 (17/16 air each side), "20 सेकंड" 139 wide (8/8), "50 मिनट" and "15 सेकंड" 12 px air; text sits 7 px under the chip top and 9 px above its foot, not on the foot; chip clear of the pad (tray ends x 946, pad x 980).
7 p4-summary: PARTLY. Rows keep "="; bar piles 41 tall with 13 above / 12 below in rows 1-3 OK; stacked fraction centred 4 px from the thumb's top / 5 px from the bottom (accepted). NEW DEFECT below.
8 p4-free key reads "अधिक": OK.
Also fine: no English on screen except digits, no red or cross after a miss, nothing under the open pad, bubble matras clear of the outline, party frames festive with Kiko cheering and sparkles/cones clear of bubble and pills.

FINDINGS
[must-fix] phase 4, summary (p4-summary-hi), hi — row 4 "2 3/4 = 165 मिनट": the stacked fraction's bar runs ~4 px INTO the "=" sign (bar ends x~1361, "=" starts x~1357, y~429), so it reads "3/4=" glued together — leave >= 10 px between the fraction's bar and the "=" (narrow the fraction cell or shift the "=" right; the row has room: text ends at the thumb's right edge, drop the 2-to-fraction gap if needed). en and gu probably carry the same overlap (not my share: check them in the re-look).
[should-fix] phase 4, choice and choice-wrong frames, hi — the choice key "2 और 3/4 घंटे" wraps to two lines ("2 और 3/4" / "घंटे", orphan word) while "150 मिनट" is one line; LAYOUT 3 wants word tiles on ONE line in hi/gu — shorten the Hindi key text in TR (e.g. "2¾ घंटे") so it fits 258 px at the key size.
[question] phase 1-4, lit pills — visible air between the lit pill outline and the neighbouring rung outline is 3-4 px above and below (the brief says 6 px; 6 is the stroke-centre figure). Nothing touches or overlaps; accept 3-4 px visible, or open the rung pitch by ~3 px.
[question] phase 4, step1 and stepwrong, hi — the 60-cell hour bar is only ~85 tall (470 wide) with ~235 px of empty area under it (picture ~17% of the working area; its "1 घंटा" label ~32 px). LAYOUT 3 asks a lone picture to fill about a third and labels 40+; not part of this round's fixes, and the ask frames (3 bars under the bar) fill well. Scale the bar taller if it is cheap, else accept.
Known not changed, not rated: summary "You learned" size/row spacing, orphan last words in bubbles, hint-only bubble after a miss, neutral "Choose your answer." band.
