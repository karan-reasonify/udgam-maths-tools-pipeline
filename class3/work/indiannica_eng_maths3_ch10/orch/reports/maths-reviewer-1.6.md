STATUS: fixes-needed
SLOTS: M1.S2.T4.C17.2D1
FILES: none (read-only review)
CHECKS: check --no-render 30 pass 0 warn 0 fail (plan-answers: 0 of 9 carry a plan answer, all authored, qid null); every changed number recomputed by node
FAILURES: 1 must-fix (win lines chain a false equality), 6 should-fix
DECISIONS: the phase `ladder` lines are dead text (every item has its own ladder; `rungOf` reads `it.ladder` first), so they are not counted as repeats; the caller's 645 and "three hour blocks then 30 min" describe the OLD 3.2 (10:15 + 3 h 30); judged on the new item
RISKS: none beyond the findings
ESCALATE: no
REPORT: work/indiannica_eng_maths3_ch10/orch/reports/maths-reviewer-1.6.md
Verdict: ISSUES. maths-reviewer-1.6, changes-only re-look, Time Converter (class 3 ch 10, r3 silent, missHidesAnswer strict).
1 CLEAN: StartArt `j < 6` = 30 min beside the clock at A 180 (minute hand on 6, hour hand 15 deg) = 12:30.
2 CLEAN: 1.1 4 h = 240 (48 tiles, 4 rows, bottom y 334: fits; near 4, miss fits); 1.2 150, near 230, miss fits both slips; 1.3 85 = 17 tiles (12 + 5), near 125, forgot 25/26: none is an answer.
3 CLEAN maths: 3.1 9:30 a.m. to 1:45 p.m. = 2 h 30 + 1 h 45 = 3 h 75 = 4 h 15, [4,15], near [3,75]; no length or total in a question (`showLen`/`showTotal` false in ask), no "15" echoed; train only on `it.train`, x 0-300 y 56-87, clear of the labels. 3.2 is now 10:30 a.m. + 2 h 45 = 795 = 1:15 p.m.; near 675 = 11:15 a.m. (minutes added, hours lost: right); trace "10:30+2 h=12:30", win 2 hour blocks + the 45-min block; the live end label gives no length, no settle, no done state; trace lines at y 404 no longer overprint it. 3.3 2:15 to 4:45 p.m. = [2,30], near [3,0] = 3 tiles touched. Ladders right; times all distinct.
4 CLEAN: dates 6-8, 15-18, 3-7 (no 12 or 24); learned 55 chars; letter-free Thumb accepted.
5 CLEAN on strip, mini strip, wheel, StartArt, end label (tcTime) and Thumb rule; noon ink. One trace exception below.
6 ISSUES: see the must-fix; the other lines read well.
[must-fix] phase 3, items 1 and 3 (tcLines: `L.push("=" + tcDurStr(d, tx))`) — stacked win lines chain: 3.1 "75=1 h 15" then "=4 h 15 min" reads 75 = 1 h 15 = 4 h 15 min (false; 75 and 15 have no unit); 3.3 "4:15+30 min=4:45" then "=2 h 30 min" reads 4:45 = 2 h 30 min (a clock time equal to a length, the confusion phase 3 breaks) — rule 1 — carry line "75 min=1 h+15 min" (4 tokens), totals with no leading "=": "4 h 15 min"; 3.3 "2 h+30 min" (3 tokens).
[should-fix] phase 3, item 1 (drawBar `showLen = crossing && (free || warm)`) — decision A also hides the piece lengths at the WIN: a first-try child sees "2+1=3 h", "30+45=75 min" with nothing over the pieces (brief win: "its two pieces are added above it") — `(free || warm || win)`, the "+" too.
[should-fix] phase 3, item 1 (miss "Count from the start to noon, then from noon to the end.") — near [3,75] is the carry slip, but the trace ends on "2+1=3 h", "30+45=75 min" (the child's own answer) and the miss names noon, not the carry (only rung 3 does); it is also a near copy of says "Count to noon, then on from noon." — rules 4, 5, 7 — e.g. miss "Add both pieces, and turn 60 of the minutes into one more hour."; rung 3 then "Add the hours of both pieces, then the minutes of both pieces."
[should-fix] phase 1, item 3 (miss "Do not put the 1 and the 25 together: change the hour into minutes.") — the first clause fits only the join (125); a child who typed 25 or 26 is told not to join (the 1.2 rule) — e.g. "Change the 1 hour into minutes before you add the 25."
[should-fix] phase 3 trace (`stroke={TC_PM}` on "th"+j and "bh"+j) — every lit hour block and both noon pieces are outlined p.m. amber, the a.m. ones too (9:30 a.m. to noon; 10:30 to 11:30 a.m.), so amber stops meaning p.m. on the strip — hour blocks TC_HOUR; the a.m. piece shade(TC_AM), the p.m. piece TC_PM (brief: "the second piece lights amber").
[should-fix] near copies (BUILD_CARD §1) — 1.2 rung "Each round of the minute hand is sixty minutes, so count both rounds." ~ 1.3 rung "A full round of the minute hand is sixty minutes, and the 25 comes after it."; 2.1 rung "Count the tiles in one row, then take that many three times over." ~ 2.2 miss "A day is not sixty hours, so count the tiles in one row." — own words.
[should-fix] phase 3, item 2 (comment `/* near 675 = 10:45 a.m. ...`) — 675 is 11:15 a.m. (the builder's report says 10:45 too); the value is right, fix the comment.
