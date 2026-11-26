STATUS: ok
SLOTS: M2.S4.T8.C38.2D1
FILES: class4/work/indiannica_eng_maths4_ch12/M2.S4.T8.C38.2D1/tool.tsx (+ ported pair)
CHECKS: check --no-render 32/0/0; check 98 pass 0 warn 0 fail (2 of 6), ported; playkit motion:true lock proof
FAILURES: none
DECISIONS: rack = 12 rows of 22x26 cells in tens; Hint key under the lock shows the switch line when a switch is unset or wrong
RISKS: hi/gu hint lines need a native read
ESCALATE: none
REPORT:
C38 calendar_counter (tool-builder-3.4), educator feedback edit; edited in place, nothing rewritten.
1 NO HAND: the 4 api.act({tool:"hand"}) calls are gone (tapAt for open/switch/sep, sort, weeks, count sweep); no hand svg. The 3 pencil writes stay. A local beats() on useTimeline makes the pieces move by themselves: Sort 12x110 ms, Weeks 4x300 ms + the yellow day, Count lighting 60-220 ms a day, same ticks/settle. Taps act at once. Reduced motion: synchronous.
Lock proof (playkit, motion:true, digit typed after each act): Sort refused 0.8 s, accepted 1.7 s; Weeks refused 0.8, accepted 1.7; Run (3 years) refused 0.8 and 1.7, open 2.5; Count ML3 refused 0.8 and 1.7, accepted after actDone. touched, real Enter in the demo, and the r31 miss-clears/wrong.value traceback unchanged.
2 COUNTABLE DAYS: the rack is now 12 ROWS, every day a 22x26 cell with a 1.8 ink outline, in tens with a 10-unit gap (10+10+10+1). Rows grouped 31 / 30 / Feb, names at 32 on the left, rack edge, count chips at the row end (x<=896 with the pad open). Weeks ruler: 22-unit cells, darker outline, a 4-unit gap between the 13 week rows, labels re-spaced (ends y 516). Phase 3 pages and the wall cards unchanged (the wall is an overview, about 14x11 cells).
3 HINTS: 40 lines rewritten with hi+gu TR keys, old keys gone. No rung is a question now. P3 follows the NOTES ladder: miss = what to do with the switches, L0 = month lengths, L1 = partial counts (e.g. "From 12 to 30 is 19 days; December adds 3 days: add them."). Same for P1, P2, P4, both missNought lines and CC_MISS_YEAR. P1 rungs now say "row" (the bars became rows).
FEED2 replay: in the educator's state the Hint key while locked showed "Now tap Count to light the days."; now it shows the question's switch line when a switch is unset or wrong.
Hindi fix: the labels are now quoted (‘पहला दिन’).
Check: quick 32/0/0; FULL 98 pass 0 warn 0 fail (2 of 6 runs), ported. action-anim passed. The live copy was not published, so status shows "edited since".
Note: after a typed miss in P3 the switches are already right and rung 1 repeats the switch rule; harmless, as the owner's rung order puts it there.
Native check: the new hi/gu lines.
