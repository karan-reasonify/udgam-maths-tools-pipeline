STATUS: partial (17 of 18 items closed in tool.tsx; item 3 is a runtime gap, not a tool fix)
SLOTS: M1.S1.T2.C5.2D1 Pattern Strip (class 4 ch 10)
FILES: class4/work/indiannica_eng_maths4_ch10/M1.S1.T2.C5.2D1/tool.tsx (ported pair re-made by the check)
CHECKS: quick 30/0/0 · ONE full check 95 pass / 0 warn / 0 fail / 3 info, ported (1 of 6 full runs) · looked once at shots ask + wrong: clean
FAILURES: none
AUDIT (code + real input + shots): the earlier builder had already done 1, 2, 4, 5, 6, 7, 9, 11, 12, 13, 14, 15, 16, 17, 18 before the limit. Proved by me: 1 12-vertex plus, dot on an arm (tiles + dial) · 2 Copy light label 3.18:1 measured · 4 filled two-tip moon · 5 strokes 8, head inside the rim, arcs r65/r46, ccw arc gone on win, turn dots dropped · 6 blank boxes/rings/track/rim in ink at 30% white (5:1) · 7 turn-back mark 7 px, tiles 16 further apart · 12 closing true + hi/gu TR keys present · 13 start-page tiles carry the cell skin · 14 cell-2 at step 2 shows the hint, only cell-4 advances · 15 Enter on a part row: no try, "Fill every box first.", in getState().nudge · 17 double tap on a ring number adds once · 18 no controls in the dwell, 2nd tap ignored.
DECISIONS (changed by me, tool.tsx only):
 8 P4 digits: ring 48 to 60 (pr 42 to 50, R 112 to 120; Q4.3 R 140, pr 50), order line 48 to 56; "last" label already T.prompt = 40. Two teams: boxes 64 / gap 12, digits 44, the pot moved BETWEEN the rings, the two order lines 72 apart (they read as one row of ten before); ring Hit targets at least 2*pr+8.
 9 Settled ring: pot raised to y 70 so ~40 px of air sits under it (was 7); boxes 60, digits scale to the box (none clipped mid-way); ring line + flag at the drawn start kept.
 10 Thumbs: arrow rows are 4 bigger cells (row 2 legible); row 4 reads "2 -> 3" (last, drawn arrow, first) beside the ring, digits only so no TR needed. Rows 1 and 3 already show amber circle / square squares.
 16 Hardened: act() and HOOK.set clear wrongRow, so Enter is inert only until the row changes (changing away and back can be sent again).
 extra: the start flag points into the ring on right-hand places (it overlapped place 2 on the two-team rings).
RISKS: Item 3 (p4-summary hi matras touch the line above) is NOT fixable from tool.tsx: the summary rows are the runtime's and shortening a hi line does not move the pitch. The HEAD runtime.tsx (lines 2558-2563, dated 2026-10-19) already gives hi/gu rows more pitch; the pin r28 apparently lacks it (frozen not read). RUNTIME GAP for the main session's gap list: pin the newest freeze for ch 10, or accept. Also: Q4.3's walk arrow between places 2 and 3 is short on the bigger ring (a head with little shaft).
ESCALATE: no
FRAMES CHANGED: P4 Q4.1 ask/win/wrong, Q4.2 ask/wrong, Q4.3 ask/wrong, P4 Free play, summary rows 2 and 4. P1-P3 pictures unchanged; TR table unchanged. Probe files deleted.
