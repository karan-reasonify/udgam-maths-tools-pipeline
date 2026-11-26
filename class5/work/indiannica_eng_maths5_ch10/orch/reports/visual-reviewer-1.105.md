STATUS: ISSUES (0 must-fix, 7 should-fix, 0 questions)
visual-reviewer-1.105 | class 5 ch 10 | M3.S5.T8.C29.2D1 Month Calendar | GUJARATI | round-4 re-look (75/108 changed). All widths measured from 1600x900 pixels or the live DOM.
Looked at (gu, flagged changed, full size): p1 step1 stepwrong ask-shut ask-open wrong win hintkey end; p3 step1 stepwrong ask-shut ask-open wrong win end; p4 step1 stepwrong ask-shut ask-open wrong win end summary free; party p1+p4. Extra live frames (playkit, real speed): P3 Q1 miss at 0.25/1.0/2.4/5.0 s + a 20 ms DOM poll; 16 frames over the Jump ring pulse; P1 Q3 pad shut/open (tray ends x940, pad x980, clear).
Unchanged since round 3 (not looked at): start; p2 step1 stepwrong ask-shut ask-open wrong win choice choice-line choice-wrong end; p1-again (sameAs p1-step1).
Round-4 fixes:
1 PARTLY: pill 44 tall, word + 16 (45.3 wide, a disc) OK. Ring (56 + 5 stroke) is flat-clipped by the 6-px-in clip to rows 284-341 (58) at rest and in every pulse frame, so it sits 4 px clear of the row rules (rows 280-283 / 342-345), needed >= 6 (was 0-1). Sides 17-24 px OK.
2 PARTLY: order is right (0.25 s: only the amber dashed row ring, no arc, no +7, no violet cell), but it stands alone 0.66 s, not 1.3 s. Poll: ring 0-0.66 s; arc 1 + "+7" + cell 8 at 0.68 s; arc 2 at 1.98 s; then every 0.65 s. The 1300 hold is on `j === 1` in the traceback tl.run list and tl.run does fn-then-wait, so it holds arc 1, not the ring.
3 OK: end dots 13 px from 22 and 13 from 29 (was 2.8); bow ends x296, column rule x303 = 6 px clear (9 to the stroke centre); "+7" ink 11 px over the row rule, 13 off the column rule.
4 OK: legend starts x418 (stage 352), ink gaps 26 / 26 equal.
5 PARTLY: chips are own word + 28 and centred (ગુરુવાર 120 wide, centre 468.5 vs column 469; P4 સોમવાર 128, બુધવાર 121); headers OK (matras 8 px over the bottom rule at બુધ/ગુરુ/શુક્ર, top >= 9, side >= 10, P3 and P4). NOT MET: P3 ગુરુવાર chip is 52 tall in a 66 cell, 5 px under the header rule, 6 px over the row rule (needed >= 8; was 4 / 5-6).
6 PARTLY: P1 cards 102 wide, one size, abbreviations, side air 9/10 at ઑક્ટો OK; "2050 ના" 15 px left, 13 right OK. NOT MET: badges (outline y115-152) are 6 px clear of the lane frame (y159; 10 px to the card tops), needed 8.
Findings:
[should-fix] p3, ask-shut/ask-open/step1/stepwrong, gu — Jump ring 4 px from the row rules, cropped flat top and bottom (stroke 3.5 vs 4.8 at the sides) — shrink the ring (<= 52 incl. stroke) or move the clip in to >= 8 px.
[should-fix] p3, wrong/correction, gu — the amber ring is alone only 0.66 s, then arc 1 holds 1.3 s — put the 1300 on step j === 0, the 650 on j === 1.
[should-fix] p3, end, gu — ગુરુવાર chip 5 / 6 px from the rules — chip <= 50 tall incl. its border (now 52-54).
[should-fix] p1, end, gu — month badges 6 px above the lane frame — raise them 2 px or lower the strip 2 px.
[should-fix] p3, ask-shut/step1, gu — after the pill went 46 -> 44 the white "કૂદ" fills the disc: the ૂ curl is 4 px above the face bottom (was 5) and ~2 px from the round edge — type 26 in gu, or pill 46.
[should-fix] p4, summary, gu — thumbs 3-4 (ગુરુ, બુધ): the week-strip icon is top-aligned, its blue bar 1-2 px over the thumb's top border (y318 vs 319), 11 px clear at the bottom — centre it in the box.
[should-fix] p4, wrong/win/end, gu — leftover-day arc end dots sit 6-7 px over 1 2 3 (3 is 6); in p4-end the dot is on the stem of the 1 and it reads "i" — lift the dot to >= 10 px or move it off the digit's axis.
Also fine: no red or cross after a miss, no English left (answer-box labels not rated), digits Latin, nothing under the open pad (p1/p3/p4 ask-open, P1 Q3 probe), summary rows/keys clear, party frames festive and the cheer reads (cone/pills not rated).
Also: the pink invite ring in P1 step1/ask wraps the target row on its rules, an intentional guide outline: fine. The teal-vs-violet landed cells question from round 3 stands.
