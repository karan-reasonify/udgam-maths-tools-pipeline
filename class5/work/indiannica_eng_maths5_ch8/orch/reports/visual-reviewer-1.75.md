STATUS: fixes-needed (visual verdict ISSUES: 0 must-fix, 2 should-fix, 2 question)
SLOTS: M3.S5.T10.C46.2D1 chunk 2 RE-LOOK (phase 2: dial, typed height, multiply-back line), en/hi/gu
FILES: none edited (report only)
CHECKS: all 21 changed pack frames at full size (pack 19:37 is newer than tool.tsx 19:24 and the preview 19:28) + playkit real-input probes, own prefix vr175, deleted
FAILURES: none (no console errors, no stuck state)
REPORT:
visual-reviewer-1.75 | C46 Box Packer | CHUNK 2 re-look | r66 | en/hi/gu | VERDICT: ISSUES (0 must-fix, 2 should-fix, 2 questions)
Looked at: p2 step1, stepwrong, ask-shut, ask-open, wrong, win, end x en/hi/gu (none sameAs/carried). Extra: guide taps, dial x3 + Check, typed 6936 at real speed (frames 0.5/1.3/2.4 s, en/hi/gu), items 2 and 3 via gotoStep with the dial at 9 + Check (not in the pack), DOM text sizes and ink pixels.
fixed: dial pill; base chip off the top face; solid off the dial column; multiply-back line ink; amber triangle; tank -> box (all vs report 1.36).
1.36 must-fix dial read-out wider than its pill: FIXED. Pill 122 wide, -/+ 72 each; en "9 cm" 98 wide (13 px each side), "10 m" 80; hi/gu "9 सेमी"/"9 સેમી" 81/71 wide, nothing touches the outline (typed 6936 and item 3 frames, all langs).
1.36 must-fix base chip crossed by the face edges: FIXED. The chip now sits UNDER the solid on a dashed leader; no corner is on a face in step1/ask/win/end (chip right edge 27+ px left of the front-left bottom edge in the 9-layer frame; hi/gu "34 वर्ग मी", "13 वर्ग सेमी", "34 ચોરસ મી" fit with 13+ px clear, matras inside).
1.36 should-fix crowded right edge: FIXED. Solid right corner x 900 is 40 px from the "-" key/rule column (x 940), was 7. The green answer chip is still 13 px above the Check key (frames win/end, all langs): above the 12 px floor, left alone.
1.36 should-fix picture too small: NOT FIXED (builder: not done, kept to the 880 composition). Tile 365 x 220 (10% of the 1472 x 528 area), 10-layer solid 365 x 490 (23%); shut frames leave ~495 px empty at left. Unchanged size, only moved 33 px left.
1.36 should-fix multiply-back line weak: FIXED (darkness). Check line and win/end line are now #2A2A2A at 5 px stroke (was thin grey); still a little lighter than the 7 px miss line in p2-wrong: acceptable.
1.36 question amber triangle: FIXED. Typed 6936 at real speed: no triangle at 0.5/1.3/2.4 s in en/hi/gu; correction line "34x6,936=2,35,824" still bold ink, 270 of 290 px, volume card amber.
1.36 question tank: FIXED. "box" in P2 Q1 and Q2/Q3 (bubble, hint, win), hi "डिब्बा", gu "ડબ્બો"; picture stays a plank pile (reads as layered volume).
No new overlap, clipping or colour defect: Kiko thinking in ask-shut/open (no puff, keyOnly), Answer berry/Check flat until the dial moves then brown, nothing red after a miss, whole answer 34x6=204 + 6 m green, header discs, Next / Next phase keys fit in all three languages, no English left in hi/gu. Items 2 and 3 (not in the pack): viewed en i2 ask, hi i2 Check, gu i3 Check and measured every text size in all six; clean apart from the findings below.
[should-fix] p2-ask/dial/win/end + items 2-3, hi and gu - the dial read-out is fitted to 28 px ("0 सेमी", "9 સેમી"; en 40, "10 मी" 32) while the 122 px pill has 20-25 px spare each side (text 71-82 wide). Fit to about 34 (about 98 wide, 12 clear) so the unit read-out matches the other languages.
[should-fix] p2 all frames, all langs - the picture is still small (see "NOT FIXED" above): scale the solid up (or accept the 880 composition with the owner's word); the 40/64 floors hold, the fill rule does not.
[question] p2 stepwrong hi/gu and item 2 hi bubble - a one-word last line ("है।", "છે.", "है?"): cosmetic per rule 2; shorten the TR line only if it is free.
[question] p2-end all langs - the answer chip is 13 px above the Check key: leave, or lift the chip 8 px if the column has room.
Clean (measured / judged): all other p2 frames and the typed 6936 correction in en/hi/gu.
