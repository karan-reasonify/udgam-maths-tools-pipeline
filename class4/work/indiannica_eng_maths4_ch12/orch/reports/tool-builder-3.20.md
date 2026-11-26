STATUS: ok (review gate; unpublished)
SLOTS: M2.S4.T8.C38.2D1
FILES: work/indiannica_eng_maths4_ch12/M2.S4.T8.C38.2D1/tool.tsx (+ ported pair)
CHECKS: Calendar Counter (class 4 ch 12). Full check 1 of 6: 98 pass, 0 warn, 0 fail, 4 info, ported (board-fit, labels-short, no-overlap, type-floor, hint-fit, hint-lines-clear, bubble-no-repeat all pass, en/hi/gu). Console errors [] in every probe.
START: quick check was green. The previous builder (3.13) had already written items 1, 2, 3, 4, 5, 6b, 6c, 6d, 6e, 6f and 7 into tool.tsx. I proved each one with real input (playkit, own Chrome, POOL=1, motion:true, nextKey:true) and left them unchanged.
CHANGED BY ME, item 6a only: the small context rack is now TWO COLUMNS OF FIVE months, in all three languages, English included. Col 1 is Jan Mar May Jul Oct; col 2 is Dec Apr Sep Nov Feb. Each month is a small block in rows of ten (10x12 cells, pitch 13), with its own rail. Labels stay at 32, end 16 left of the rail, and rows are 84 apart. Cells sit at work x 1000-1127 and 1296-1423, rows from y 104, clear of the key corner.
 - Why not a taller pitch: measured ink gaps at the 44 pitch were hi 1-3 and gu 1-2. Even 46 cannot clear a Devanagari ू over ि pair, and 10 rows at 52 do not fit 520. PREFLIGHT 25 forbids lowering the size.
 - Checked at full size and at 800x450 (ask-shut and win, en/hi/gu): no two labels touch. The big June/August blocks did not move. The rack still fades as the keypad opens.
PROOFS:
 1 p3-end: stage idle. first and count are aria-disabled. Tapping Count, then First: firstCounts stays "in", equation stays "+ Apr | = 16", 22 March stays green. Same in hi and gu.
 2 P3, Hint before Count gives the switch line (swMiss). The first Hint after Count gives the METHOD rung:
   Q1 "Read the two numbers the pencil wrote under the pages, then add them." / hi "पन्नों के नीचे पेंसिल से लिखी दोनों संख्याएँ पढ़ो, फिर जोड़ो।" / gu "પાનાંની નીચે પેન્સિલે લખેલી બંને સંખ્યા વાંચો, પછી ઉમેરો."
   Q2 "Add the November part and the December part written under the pages." / hi "पन्नों के नीचे लिखे नवंबर और दिसंबर के दिन जोड़ो।" / gu "પાનાંની નીચે લખેલા નવેમ્બર અને ડિસેમ્બરના દિવસો ઉમેરો."
   Q3 "Find how many more days the April page needs to make 16 in all." / hi "पता करो कि कुल 16 के लिए अप्रैल में कितने दिन और चाहिए।" / gu "કુલ 16 કરવા એપ્રિલમાં બીજા કેટલા દિવસ જોઈએ તે શોધો."
   Q1 Hint presses 2 and 3 then show ladder[0] and ladder[1], unchanged.
 3 P4 Q1, typing 3|1|2027 three times: "Your numbers are right: give the day and the month a 0 in front." / "A day or month with one digit still takes two places." / "Type a 0 before each one-digit day or month, then the year."
   Q2 30|4|2026 twice gives the April nought line, then the nought rung. A year slip 30|04|26 gives "Type the year in full, not only its last two digits."
   Restart, then a fresh Q1: the first Hint (before any answer) reads "Type the day in the first box, then the month, then the year." The sidecar json keeps the original miss and ladder.
 4 Exact repro (Q2: First x1, Last x2, Count refused, Last x1, Count): state.instruction and the bubble are back to "Now count from 12 November to 3 December, counting both dates." (en/hi/gu).
 5 Hint and a digit during the P4 Write act show no hint (the instruction stays, acting true). Same for a digit and Hint during the P3 Count lights.
 6b hi "365 दिन": the i-matra is inside the bar (baseline 42), at full size and at 800x450.
 6c Pencil subtotals render at stroke-width 5.76 (36 x 0.16; the default would be 3.6).
 6d Only June and August are ringed. All 31s share one x per column.
 6e P1 Q2 in the real flow: the Weeks key has its c4-pulse invite ring. Hint before Weeks shows "Now tap Weeks to lay out the days.", not "Count the blocks". The pack/gotoStep route arrives untouched, which is gate behaviour.
 6f After Sort, focus lands on answer-open.
 7 P2 Q1 rung 2 reads "Divide 1600 and 1700 by 400 and see whether anything is left over.", with hi and gu TR in place.
FAILURES: none
DECISIONS: context rack = two columns of five (item 6a)
RISKS: English rack changed too (visual re-look)
ESCALATE: no
GATED ACTS: P1 Q1 Sort, P1 Q2 Weeks, P2 Q1-Q3 Run, P3 Q1-Q3 Count (Count waits for the switches). Ungated: P1 Q3 (read off the page) and all of P4 (the writing is the answer).
RUNTIME GAP (already on the NOTES list): r31's actor.busy() guard cannot see the tool's own moves. The tool works round it with a capture-phase hold.
QUESTION: the context rack changed shape in English as well, so the visual reviewer should re-look at the p1 sort ask-shut and win frames, en/hi/gu (shots --pack --changed). On the p1 win, the big "31" box ends at x 882 and the widest col-1 hi/gu label (जुलाई/ઑક્ટો) starts about 10 units right of it. Tight but not touching: OK?
CLEANUP: my play-*.png and 3.13's leftover play-c38p-p3end.png deleted, scratchpad emptied. Nothing published.
