# Length Converter (M1.S1.T3.C11.2D1) - English visual re-look, round 2

Verdict: ISSUES (6 should-fix, 1 question; no must-fix). All gaps below are measured ink to ink on the full-size pack frames (a ring's stroke and shadow take about 4 px; a geometry gap of 12 reads smaller on screen).

Frames looked at (pack/pack.json, changed:true): p4-step1, p4-stepwrong, p4-ask-shut, p4-ask-open, p4-wrong, p4-win, p4-end, p4-summary, p4-free; plus the party frames p1-party-en and p4-party-en (and pixel crops of them).
Unchanged since round 1 (not re-judged): start-en; p1 step1, stepwrong, ask-shut, ask-open, wrong, win, hintkey, end; p2 step1, stepwrong, ask-shut, ask-open, wrong, win, end; p3 step1, stepwrong, ask-shut, ask-open, wrong, win, end; p1-again (sameAs p1-step1).

1. [should-fix] p4, step1/stepwrong/ask-shut/ask-open/wrong/win/end, en - "board 12+ px clear" is not met: unit-fact ring bottom y 187 (shadow 188-193) to the board's top outline y 196 = 8 px; board bottom outline (529-531) to the Carry/Borrow ring top (541) = 9-10 px; only the Answer tag (top 550) clears, by ~18. Fix: unit-fact chip 4 px higher (top 112, card top 93) and the board 4 px shorter or lower, so both gaps are 12+ ink to ink.
2. [should-fix] p4, wrong, en - the lit carry chip "1 m" (orange ring, y 250-306) touches the m column's header rule (rule ends y 249): 0-1 px, no background row between. In p4-win the unlit chip is 4-5 px clear. Fix: lower the carry row (or raise the header) so the ring clears the rule by 6+ px.
3. [should-fix] p4, wrong, en - unit-fact ring (right edge x 399) and the "74 cm + 69 cm" chip (left edge x 410) are 10 px apart (chips 16+). Fix: move the sum chip right 8 px or more (room to 1254).
4. [should-fix] p4, free, en - "Given 3 m 25 cm" chip (right edge 737) and the unit-fact chip (left edge 752) are 14 px apart (same pair in the P1 frames, unchanged since round 1). Fix: 16+ px. The five keys (160 wide, 14 apart) are fine.
5. [should-fix] p4, win/end/party, en - the answer boxes are crammed in their row: the sum rule ends y 459, the dashed box runs 461-525 (1 px under the rule), the board outline starts 529 (3 px under the box), and the digits (ink 486-517) sit 24 px from the box top but 6 px from its floor. Fix: give the answer row 6-8 px more height (raise the sum rule), then centre the digits in the box.
6. [should-fix] p4, ask-shut/ask-open/wrong and win, en - the bubble splits a length: "...2 m 74 cm and 1 m / 69 cm?" and "Yes, the rope was 4 m / 43 cm long." Fix: keep each length whole on one line, by rewording or with a non-breaking space ONLY if the wrapper splits on a literal " " (a wrapper that splits on /\s+/ ignores U+00A0); the TR keys change in the same edit.
7. [question] p4, summary row 4, en - the thumbnail reads "5 m 28 cm - 2 m 47 cm" with a short hyphen while the board uses a heavy dash; a true minus would read better. Your call.

CHECKED OK
- Summary: all 8 thumbnail lines right-aligned to one edge (text ends x 1517-1518); nearest learn line ends x 1105, nearest thumbnail starts 1202 (96 px; the other rows 300+); stars, Free play, Play again clear; the sums are right (13 m = 1,300 cm; 1,867 cm = 18 m 67 cm; 7,461 m = 7 km 461 m; 5 m 28 cm - 2 m 47 cm = 2 m 81 cm).
- Borrowed "4 m" and "128 cm" (p4-end): digit ink 27 px = about 40 px type; "5 m" and "28 cm" struck in ink, nothing red, no cross.
- Free play: fifth key Borrow with its line (3 bubble lines, no one-word last line), keys live, Answer dim, nothing to get right.
- Miss: only the working replays (cm column lit, "74 cm + 69 cm", carry "1 m"); 143, 3 m, 4 m, 43 cm never shown; answer boxes and slot empty, caret in the m box; the hint ("100 cm or more cannot stay in the cm column.") gives the act, not the answer. The green "Answer 4 m 43 cm" tag shows only at the win.
- Key corner 1254-1536 x 108-196 free in every p4 frame (board ends x 1137). Guide-step frames: Answer key flat and dim, no blink. Chips and keys 32+, one line, 4 content colours (given blue, second amber, answer green, unit fact vermilion).
- Kiko: standing in the guide steps, thinking (hand at chin, eyes up) in ask-shut, ask-open and wrong; cheering with gold/orange sparkles in both party frames, nothing cut at his box, sparkles and the left cone clear of the bubble (cone ends x 312, bubble starts 343), the right cone above the phase dots in p4. Bubbles at most 3 lines.

Runtime/known (not reported): corner Answer key live beside Carry/Borrow at ask-shut (gap K); scene shifts about 280 px when the keypad opens; the thin road in P3 ask; one party sparkle touches the canvas card's lower edge (volatile, runtime).
