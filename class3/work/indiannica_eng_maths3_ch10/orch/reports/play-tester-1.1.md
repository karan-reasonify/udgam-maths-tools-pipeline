STATUS: ok
SLOTS: M1.S1.T3.C11.2D1
FILES: none edited (shots work/indiannica_eng_maths3_ch10/M1.S1.T3.C11.2D1/play-pt11-rp-*.png)
CHECKS: re-play of my findings on the rebuilt tool (status fresh, check 97 pass), real mouse AND touch through playkit, motion on and off, no dev driver except AI-mode toolApi; 0 console errors in all runs
FAILURES: none must-fix; 3 minor should-fix left (below)
DECISIONS: none
RISKS: only the three minor items below
ESCALATE: no
REPORT: work/indiannica_eng_maths3_ch10/orch/reports/play-tester-1.1.md
Re-play Morning or Night phases 1-2 (verdict CLEAN apart from 3 minor leftovers; 0 must-fix).
[clean] 1 real drags: the red hour hand follows the pointer (live sun 0..540 sampled during the drag) and releases right at 3/6/9/12 o'clock by mouse and finger, P1 steps, P1 questions, free play; a full real-drag flow from the start page (double tap on Start counted once, round 1 and 2 by drag, Kiko thinking at q1, 24 typed on keys, win, Next) works; the sun and the moon follow live and release right (P2 step 0/1, P2 q2). Nudge back: from 12 (t=0) 352/330/300 deg stay at 0, no round, no credit; from 12 after one round (720) a nudge to 345 deg gives 690 (11:30), no credit, back to 358 gives 720. Shots play-pt11-rp-b-hand-270.png, play-pt11-rp-c-nudge-mouse.png, play-pt11-rp-d-moon-mouse.png.
[clean] 2 P2 step 0: a wrong drag (to 14:00, hint shows) then a tap on the marker (mouse and finger) or Enter credits ONE step, marker at noon, gs 0 -> 1 (motion on and off). Page-timestamped gaps: two Enters 53-117 ms apart = one step; 537 ms apart = two steps; with motion on a second press during the glide is ignored. Shot play-pt11-rp-e-tap-after-wrong-drag.png.
[clean] 3 an act during the P1 replay (mouse and finger drag to the far end, tap on the hand, Enter) is ignored: marker ends at 23:00, Answer dimmed, the finish drag then unlocks, 2 wins. P2 q2 after a miss: the moon stays at 23:00 with the invite ring (no jump back to noon); Enter, a tap and a finger tap on the Enter key with nothing moved all draw "Slide the moon first, then press Enter." and the question returns once the moon moves; the third try wins once on a double Enter. Shots play-pt11-rp-j-p2q2-after-replay-mouse.png, play-pt11-rp-j-enter-nothing-mouse.png.
[clean] 4 free play (mouse and finger): hand tap +1 hour (480 -> 540), hand drag to 6/9/12/3 o'clock gives 360/540/720/900, the marker drags to the far end and noon, the six pictures glide the marker (alarm 390, lunch-box 760, bed 1290); chip reads a.m./p.m./midnight/noon with no a.m./p.m. at noon or midnight. Shot play-pt11-rp-k-free-hand-noon-mouse.png.
[clean] 5 P1 win strip: 12 a.m. + 12 p.m. = 24 coloured cells and the green tag "24 hours" when q1 was answered with nothing touched (shot play-pt11-rp-m-p1q1-win-unswept.png), and for q2, q3 and the phase end.
[clean] 6 phase 2: no frame pairs 12:00 with an a.m./p.m. label (steps, q1-q3 ask, miss, win, idle); q3 asks "what should the card say?" with the bare 12:00. Shot play-pt11-rp-n-p2q3-ask.png.
[clean] 7 AI mode (toolApi answer + check, global step indexes): every question of phases 1-3 - a wrong answer is a miss (tries 1), the right one wins; P2 Q2 day12 miss then night12 win, P3 Q2 eve miss then morn win, P3 Q3 1|30|morn miss then 1|30|eve win.
[clean] 8 negative <rect> width: not reproduced on the rebuilt tool either (setAttribute hook + console errors, P1 q2-q3 and P2 q2 misses with keypad open, motion on, CPU stalls 0, 60/70, 110/120 ms): 0 hits.
[clean] 9 nothing new broke: held/double Enter and double tap on a miss count one try; restart/phase dot mid-replay fine; Kiko cheer ends with the win; no console error.
[should-fix, minor, unchanged] a double tap on the Next key (mouse or finger) opens phase 2 with the wrong-act hint "Drag the marker, or tap it, to the middle." instead of the instruction (the 2nd tap lands on the board). Shot play-pt11-rp-r-after-next-mouse.png.
[should-fix, minor, reduced motion only] the 150 ms credit window is below a normal double click: two clicks on the P1 hand 162 and 175 ms apart still credit both guide steps (97 ms apart = one). Consider ~300 ms.
[question, minor, unchanged] free play: a second picture tapped while the first glides is silently ignored (alarm then plate 150 ms apart -> alarm only).
