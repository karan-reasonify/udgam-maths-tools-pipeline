STATUS: ok
C10 Step Track M1.S2.T3.C10.2D1 · tool-builder-1.3 · one fix round. Full check 95/0/0 (2 full runs, ported), quick check clean.
DESIGN CALL (please confirm): item 3 needs bigPad:false. Stones 145/125 only fit the 1086 open room; with bigPad:true the open room is 900 (stones 115/97 at best). I set bigPad:false (standard 372 panel) and one constant ROOM=1086; undo = bigPad:true + ROOM=900. Result: 7 stones 139 wide, 8 stones 117 (zero bar of the count-down needs a 36 left margin), 5-6 stones 150 cap, letters 116, digits 55% of stone (42% for 3 digits).
MUST
1 socks: fallback sock drawn only when the skin is off (SKINS/TOOL_IMAGES test), skin gets a dark outline by an SVG dilate filter on its own silhouette; button fallback likewise. Socks now 70x96 (skin ratio).
2 p3-end confirmed: it is P3 Q3's own board (31..43, +2 arcs) with one small button on each odd stone (the dot is now a mini button, matches "one button left over").
SHOULD visual
3 ox is 0 except free play: size and place fixed from ROOM, no 286 slide shut/open; bars, key row, strip, tray re-laid for 1086.
4 unlabelled arcs full vermilion, 5.5 px, dashed 14/10; labels 40 (36 at 8 stones), pill sized to the text.
5 NOT DONE, runtime gap: the two-box part labels ("next"/"end") are drawn by the runtime answer slot (runtime.tsx ~1952, T.micro 28, weight 500, grey ink), not by tool.tsx. At 32+ dark they fit: hi/gu measured in the 162 box (bigPad false) and 250 box (true). Please log it on the gap list.
6 P1 Q2 "...fills the next stone after 5, 11, 17, 23?" (same fix for P4 Q2 "...the next stone after 9, 18, 36, 72?", two blanks); TR hi+gu rewritten.
7 start page: every arc carries a "?" pill (no +3).
8 P2: strip y 362, KEYROW y 442; landing numbers 40 bold dark on a paper halo, clear of the stones; strip letters bold C.ink 34 (cell 38); place numbers 40 on their own chip across the stone's lower edge.
9 P3: buttons 96 (socks 70x96), tray 1058 wide, each pair in a soft capsule, leftover keeps its own button colour inside the purple ring (no wash), brackets "10"/"4" at 40 with room under the socks, "buttons" everywhere (EN + hi बटन + gu બટન; Hit label too).
10 gu NBSP between a Latin letter and its particle (21 places); gu hint "એક કૂદકામાં કેટલા પડાવ?"; the four "Tap the X key at the bottom." hints in hi/gu are now one line ("नीचे 'X' पर टैप करो।"), step1 hi/gu shortened to two lines; remaining tap lines bind "टैप करो"/"ટૅપ કરો" with NBSP so no one-word last line.
SHOULD play
11 perform + pressKey return while busy OR a traceback runs. 12 board keyed by a visit number (question change, or a question re-entering ask after its win): proven by probe on both routes (gotoStep away and back, win then gotoStep same question: arcs []). 13 free play: "That step goes past zero." on the bubble (hi/gu in TR), cleared back to the free line on the next change; no act on an empty stone list. 14 getState().paired = min(pairN, P): 9 buttons paired = 4 pairs, leftOver 1.
PHASE 4 look (shots ask + wrong, full-size, plus the maker by probe): stones 150 and digits ~80 read well; label pills 40 clear; no element reaches the key corner (the widest track ends at x 1062 of the 1086 room, the key starts at 1178). One thing fixed: the two arcs into each maker stone ended on one arrowhead and read as one tangle, they now land 44 apart (-22/+22) so both arrowheads show (also the purple ghost). Seen, left: the Match bars under P4 Q1 are fine; "Compare" key still shows after a win on P1/P3 tracks (old, harmless).
Frames changed: all (p1-p4 ask/step/wrong/win/end, open and shut; track larger and no longer centred when shut), start page, p2 strip frames, p3 tray frames, hi/gu step1 + stepwrong frames, p4-free only after a past-zero tap. Temp shots and probes deleted.
