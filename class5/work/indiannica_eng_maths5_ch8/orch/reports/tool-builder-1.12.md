STATUS: done. C21 Rows Times Squares fix round (maths review). Full check 97 pass / 0 warn / 0 fail; PORTED to output-preview/indiannica_eng_maths5_ch8/M2.S2.T5.C21.2D1/ (host emulator: all 4 phases finish).
SLOTS: M2.S2.T5.C21.2D1 · FILES: work/.../M2.S2.T5.C21.2D1/tool.tsx only
Per finding:
1 Phase 3 items 2 and 3 open square (b0 = L, one row laid, act = Fill, breadth chip = the side). The rectangle-then-Square stays only for the warm-up (14 from 8) and the learn item (15 x 9).
2 Stamp say: "This stamp is a square of side 4 cm; what is its area in square centimetres?" (a semicolon, not a full stop: two sentences failed one-page).
3 Traceback: the vermilion Boundary only for 2(L+B), which is also 4 x side on a square. For L+B: one length edge and one breadth edge in vermilion, no label. For 2 x side: rows only.
4 Free play: Breadth+ stops at the length; Length- pulls the breadth down with it.
5 Phase 2 closing is "So the area of a rectangle is length times breadth in square units." with your comma DROPPED: in the last run a phase 2 closing with a comma failed one-line-bubble (the part after the comma never reached the bubble). Phase 3 ladder rung 1: "Both sides of a square are the same length."
6 Phase 3 step: "Tap Square to make this board a square." / hint "Tap the Square key under the board." Phase 4 step 3: "Tap Fill to stack the rows on the rectangle." / hint "The Fill key is under the picture."
7 Phase 3 item 1 miss: "Adding the four sides gives the way round the edge, not the area."
8 Phase 2 learned: "You learned: area = length × breadth, in square units."
Decisions applied: the "L × B = ?" line shows in the warm-up and on the learn item; from item 2 on, only the side labels until the win or the correction. The 4 cm stamp and the 9 cm part labels are kept.
Extra rules:
(1) A number-free nudge while locked, one literal per act: "Lay all the rows with the Rows key first." / "Stack the rows with the Fill key first." / "Make the board a square with the Square key first." / "Cut the length with the Split key first." / "Stand one part up with the Drop key first." It shows on a tap on the locked Answer key or a typed key. After each act the next nudge shows, and once the act is done the question comes back.
(2) A real Enter on a guide step counts as a touch. It only counts when the Enter is aimed at the page, a pad key or an act key; the first full run failed hint-key because the header Hint key's Enter counted.
Ladder rungs are now new moves:
- P1: "Add the squares of one row again for every row."
- P2: "Multiply the two side numbers to count the unit squares."
- P3 rung 2: "Count the squares in one row, then take that many rows."
- P4: "Each cut part of the strip has the same length." / "Ask what number times 3 gives the length, then multiply."
Gate re-proved with REAL clicks (playkit):
- P1 Q1 (Rows x4), P2 Q1 (steps done by keyboard Enter: still locked), P3 Q2 (opens square, Fill), P4 Q1 (Split, Drop, Fill).
- Each time: before the act only the act key is live, the locked Answer tap shows the nudge and typing is refused. After the act the question is back, the Answer key is live and the right answer wins. No console errors.
Sidecar: the port does not write guide.answerGate and I may edit only tool.tsx, so I put the gate note in MODEL.answerGate, which ports into the .json. Pipeline gap: the port has no guide.answerGate.
Full checks this message: 3 (the 1st failed hint-key, fixed; the 3rd re-ported after the MODEL note). TR still empty: the language pass is pending. The 5 nudge lines are api.say literals, and the win lines are item data (add those by hand).
