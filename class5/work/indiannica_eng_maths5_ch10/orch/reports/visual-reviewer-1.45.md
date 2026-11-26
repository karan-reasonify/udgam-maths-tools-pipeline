STATUS: ISSUES (0 must-fix, 2 should-fix, 1 question)
visual-reviewer-1.45 | class 5 ch 10 | M2.S4.T6.C24.2D1 Time Column Adder | round 2 | Gujarati (gu) only | 1600x900, pack r66
LOOKED AT (full size): start, p1-p4 step1/stepwrong/ask-shut/ask-open/wrong/win/end (p1 also hintkey), p4 summary, p4 free, party p1+p4 = all 36 changed gu frames. p1-again-gu = sameAs p1-step1-gu (skipped).
EXTRA FRAMES (playkit, gu): 3-box slot typed in p1 Q3 and p2 Q3; P4 Q3 relay ask, typed 0|65 and own miss; miss frames p2 Q3, p3 Q2, p3 Q3, p4 Q2 (+ en p3 Q2 to compare). No console errors.
VERDICT: no must-fix. Nothing clipped, overlapping or under the open pad; no English left (digits only); nothing red or crossed after a miss (strikes are ink); Kiko thinks in ask/wrong, stands in steps; Answer key flat in steps, berry in asks.
FIXES
1 OK  Frame bigger: columns 190 wide, digits ~72, fills 112-528 high (keys to 628, canvas 640, bubble 656). Open pad: frame/labels end x 665-855, drawer starts 980 (125+ px air). Same size and place shut/open.
2 OK  Carry word "વદી" (p2) and Borrow word "ઉછીનું" (p3, p4): violet, ~38 px bold, in the label column on the tile/new-top row; touches no tile, digit or edge. Tile-to-digit 7 px (shadow reaches the digit top, p2-end): tight, not touching.
3 OK  "0 સ્થાનધારક" chip (p4-wrong, p4-win, p4 Q2 miss): 7 px under its row's આપેલ, 13-14 px above the next label, grey 28 px, one line, reads as that row's.
4 OK  Summary thumbs (p4-summary): one line each, 30 px bold, 15-16 px clear of the border left and right (tightest "7 ક 25 મિ 50 સે").
5 OK  Wrong-drop/step hints (p1-p4 stepwrong, wrong, hintkey, 4 extra misses): plain one-sentence hint, 1 or 2 lines at 56 px, never 3, nothing touches the outline. Wording reads as hints.
6 OK  P4 Q3 relay own miss "60 સેકન્ડની એક મિનિટ: આખી મિનિટ મિનિટના ખાનામાં લખો." fits 2 lines; slot empty, whole right picture (1 મિનિટ 5 સેકન્ડ x4) shown.
7 OK  3-box slot (p1 Q3 "7|25|50", p2 Q3 "6|16|30"): digits ~40 px, 50+ px from the box sides, 12 px above the box bottom, 11 px under the box name; caret clear.
8 TIGHT (known) "ઉછીનું" above "આપેલ": 10 px ink-to-ink at its tail (x 642 in p3 frames, x 752 in p4 frames), 11 px under "છ", 25 px elsewhere; the two stack at 51 px pitch. Frames: p3-wrong, p3-win, p3-end, p4-wrong, p4-win (+ p3 Q2/Q3 miss). "વદી" over આપેલ: 23 px straight down (p2-wrong/win/end), ~10 px diagonal to the આ top: fine.
FINDINGS
[should-fix] p3 Q2 correction (extra frame, all languages, en has it too) - "ઉછીનું"/"Borrow" is on screen twice: tile label in the minutes column (x 390-478, y 172-215) and the row label (x 545-650, y 236-290); the "60 મિનિટ" tile top is 6 px under the header band (y 160). Fix: drop the column copy or move the row label; give the tile 12+ px under the band.
[should-fix] p3, p4 frames - the Borrow word is 10 px over its આપેલ (item 8). Fix: lift the word ~10 px or push the label row down; known, builder chose not to.
[question] p3 Q2 ask (grey "0" under the hours, extra frame) has no "સ્થાનધારક" chip, but p4's grey zeros do. Intended (chip is phase 4 only)?
NITS (no action needed): p4-end "દરેક" is 9 px over the row-1 pill border; relay ask-open: blue seconds-block grid ends 20 px from the drawer; p4 "1 . 05" shows a wider gap before the point than "4 . 20" (narrow 1 in the aligned column); p2/p3 struck digits sit 7-9 px under the new top number (readable).
NATIVE GUJARATI READER SHOULD CHECK (not rated): વદી (carry) and ઉછીનું (borrow; header says "ઉછીનો", masculine, label neuter); પુનઃસમૂહન (Regroup key, heavy word); સીધમાં ગોઠવો (Line up, also "ચિહ્ન એક સીધમાં"); તોડો (Break); સ્થાનધારક; શતાંશ; દશાંશ ચિહ્ન; ચોકઠું (frame); સ્તંભ; "પેન્સિલે લખેલી" (instrumental); બાદ કરો; "60 પર વદી" in the p2 closing line and "દરેક એકમ પોતાના સ્તંભમાં" in the p1 summary row; abbreviations ક / મિ / સે on tiles and thumbs; દોડવીર, ટીમનો સમય, સરખો સમય?, દરેક; સારાંશ, મુક્ત રમત, નવો દાખલો.
NOT RATED (known runtime-drawn): summary "You learned" size/row gaps, orphan last words, two invites before first touch, answer-box labels ~6 px under the slot outline, party cone vs pills.
Scratch: extra frames (play-vrx-*) and crops deleted; repro: playkit play({id,ch:10,phase,lang:"gu"}) + h.gotoQuestion / h.typeAnswer(t,"7|25|50",{enter:false}) / h.wrongAnswer, then wait 5.5 s.
