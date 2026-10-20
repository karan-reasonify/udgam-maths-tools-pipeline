STATUS: ok
C30 Tile Bench (class 4 ch10), one round applied. Full check 95 pass / 0 warn / 0 fail (1 full run), ported; shots + shots --state wrong looked at. PHASES item data untouched (answers, near, choices); only two `miss` lines changed, TR keys renamed in place (hi + gu).
VISUAL
1 Gap = the true gap: closed-in cells painted under the tiles in solid #9B1F6E, so the tile outlines are the smooth edge, plus a thin #5C0F40 edge (tile outlines clipped to the gap). Overlap hatch = purple lines 7 wide, clipped to the true shared part of each tile pair (new lapPairs; scanBench and getState untouched).
2 Bench laid out once for the 1086 open width: BW 1046, ox pinned 0 (no 272 jump, same size and place shut). Needed bigPad:false (departure: the standard panel, since 900 was too narrow). Toran items r38 (76), legend names 40 on a plain cream strip (no bench dots), rows r34 spread over the bench with the legend clear. All hard-coded bench numbers now come from BW/BH.
3 hi/gu quoted key names carry   (8 + 8 spots; the runtime wraps only on ASCII space, checked).
4 P1 Q2 hint now "The coins already touch: look in the space between four of them."; coins are silver discs with a rim (bench, legend, tray, Circle).
5 One paint (blue) for the tray, the copy in the hand, given and laid copies; start-page tray shapes too.
6 P3: dashed seat circle gone once filled (and under a correction ghost); child's seats get a solid dark outline; the correction keeps lap hatch + only the wrong seats' ghosts; --state wrong now rebuilds the child's seats from the submitted row.
7 P2: trace points clamped inside the bench rim; end dot only while drawing (none at rest).
8 P3 Q3 tray plate shows the row's down/up/down copies.
9 P4 thumbs: row 4 = a touching-brick wall (differs from row 1), shapes 20px, label 2px lower (+8 gap); word cards centred, 24 clear all round, flat paper, word 40 (gu 44); cap = flat vermillion disc, 24-tooth crimp, lighter top ring, coin size; Q2 hint "Row 3 starts like row 1: count its coins too."
10 gu key labels 37 (hi 32), keys widened (22/char); gu cards 44 / meaning 31.
PLAY (real keys/mouse probed)
11 digits 1-3 tap the seats (seat 1 turned twice by "1","1"; typed stays empty).
12 Enter or the pink key with <3 seats: bubble "Set all three seats first.", getState().nudge set, tries stays 0; the next seat tap restores the question.
13 aria "Seat" and the 6 free-play shape names go through tx, TR hi/gu added.
14 answer("DOWN,UP,DOWN") draws the seats and wins (lower-cased, validated up/down).
Frames changed: all (bench 860 -> 1046, one paint, bigPad off); P1 Q2 + P2 Q3/Q4 (coins, gap fill); P1 Q3 hatch; P3 Q1 (seats, wrong); P3 Q3 tray; P4 Q1-Q3 and summary row 4; start page tray; hi/gu keys, cards, quoted names.
Open for the owner: bigPad:false also narrows the answer panel for every phase (gu Yes/No key size stays a runtime item); the shut bench is left-aligned by LAYOUT §3, not centred.
