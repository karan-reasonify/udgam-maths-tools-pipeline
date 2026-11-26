STATUS: ISSUES (1 must-fix, 7 should-fix, 0 questions)
visual-reviewer-1.77 | class 5 ch 10 | M3.S5.T8.C29.2D1 Month Calendar | HINDI only | re-look round 3 (87/108 changed)
Looked at (full 1600x900, all flagged changed): P1 step1 stepwrong ask-shut ask-open wrong win hintkey end party; P2 wrong win choice-wrong end;
P3 step1 stepwrong ask-shut ask-open wrong win end; P4 step1 stepwrong ask-shut ask-open wrong win end summary free party. Widths measured from pixels.
Extra: P3 miss played at real speed (frames 0.1-0.4 s after the miss) to see correction step 1. p1-again = sameAs p1-step1 (skipped).
Unchanged since round 2 (not looked at): start-hi, P2 step1/stepwrong/ask-shut/ask-open/choice/choice-line.
Clean on every frame: no English left (digits only), no red/cross after a miss, nothing under the open pad (nearest: P2 chip 965 vs drawer 980).
ROUND-3 FIXES (hi):
M1 day-name row: NOT FIXED (P4 मंगल) / PARTLY (rest). P4 मंगल headline is 2 px L / 1 px R from the cell rules (target >=8): letters touch the lines.
   ि and the मंगल dot: 3 px under the top line in P1, 2 px in P3/P4 (target >=4); ु: 5 px (P1, to the ring) / 4 px (P3/P4) above the bottom line (ok).
   Day chips are one width (186 = widest word x1.1 + 28), not word + 28: 32-43 px a side on short words; P3 गुरुवार sits low (14 px over, 4 px under).
M2 Jump pill: PARTLY. Pill 48 tall ok (46 + rim); tail under कूद 5 px inside the rim ok; waits in the landing cell under the date ok.
   Ring is 2 px from the top and bottom rules (ring 64 in a 68 px cell; target >=6); sides 12 px ok.
M3 P3: OK. One 4 px violet arc per jump, date to date, end dot; "+7" in the next column (24 px from the rule, 14 px above the lower rule);
   amber dashed ring on the counted row is correction step 1 (seen live, before the dates); landed cells violet, green on the final correction.
M4 P1 cards: PARTLY. All names one size; short forms in; no matra on an outline (4-5 px clear); badges 7 px under the tool top (23 under the card edge),
   badge 7 clear of the drawer (17 to the row, 50 to the badge; the panel-open month question is not in the pack: inferred); उत्तर legend by "7 महीने" ok.
   Side air (target >=8): जुला॰ 7/7, अक्टू॰ 8/7, अप्रैल 11/8.
M5: legend NOT FIXED (gaps 58 and 22 px, start x 418 ok); leap rings separate ok; thumb icon 40 ok; P2 chip-to-strip 25 px (26 asked: ok); 29th ring inside
   its cell ok; P3 गुरुवार chip centred in row 1 (413.5) ok; P4 legend has कूद ok; hop arcs have end dots ok; "2050 नहीं" one line, but 7 px air (see 7).
FINDINGS
1 [must-fix] p4 every frame with the grid (step1..free), hi - header cell मंगल (90 px wide): headline ink 2 px from the left rule, 1 px from the right - fix: widen the hi columns to ~100 (move the legend/Week key right, both stay left of x 964) or shorten the word to <=74 px.
2 [should-fix] p1, p3, p4 header row, hi - ि/dot 3 px (P1) and 2 px (P3/P4) under the top line, names ride 1 px high - fix: shift names down 1 px (P1 4/4); P3/P4 need a 54 tall header to reach 4/4.
3 [should-fix] p3 step1/stepwrong/ask-shut/ask-open, hi - invite ring round the Jump pill touches the row (2 px to both rules, x 208-289 / y 277-340 in a 275-342 cell) - fix: draw it hugging the pill, outer box <=56 tall (>=6 px clear).
4 [should-fix] p3 every frame, hi - legend entries ज्ञात / कूद / उत्तर are 58 px then 22 px apart (not equal 24) - fix: place from the real rendered widths (text boxes), not the estimate.
5 [should-fix] p3 wrong/win, hi - arc end dots sit 2.8 px from the digits 22 and 29 (5 px at 15) - fix: end the arc 8 px further from the digit (above-right of the cell).
6 [should-fix] p1 end/party, hi - जुला॰ 7/7 and अक्टू॰ 8/7 px inside the card outline (target >=8) - fix: card 104 wide, or the 32 px names tracked tighter by 1 px.
7 [should-fix] p4 summary, hi - row 2 thumb "2050 नहीं": 7 px between the text and the row outline (11 on row 1) - fix: icon 40 wide there or a 4 px wider row.
8 [should-fix] p4 wrong/win/end/party, hi - the thick cut line runs 6-7 px past row 5 into the empty cell below, rounded stub - fix: end it at the row-5 bottom rule (y 553).
Known-not-changed items (answer-box labels, summary "You learned", orphan words, two invites, party cone) not rated again.
