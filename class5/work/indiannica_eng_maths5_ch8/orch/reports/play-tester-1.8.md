STATUS: fixes-needed
SLOTS: M2.S2.T5.C21.2D1
FILES: none edited (report only)
CHECKS: real mouse + finger + keys, en/hi/gu, user + classroom + AI mode, motion on/off; no console or page error in any run
FAILURES: 0 must-fix, 5 should-fix
DECISIONS: 2 questions (items 6, 7)
RISKS: items 2 and 3 are runtime-wide (log on the runtime-gap list)
ESCALATE: none
REPORT:
PLAY TEST C21 Rows Times Squares (ch 8, r66 silent). Verdict: ISSUES (0 must-fix, 5 should-fix, 2 questions). Frames kept: work/.../M2.S2.T5.C21.2D1/play-G3-en-60-b.png, play-G4-en-2187-b.png.
CLEAN, proved with real input:
- Gate P1 Rows (9x5 full), P2 Fill, P3 Square (item 1, 15x9) / Fill (items 2-3 open square), P4 Split>Drop>Fill: all 12 questions won by finger and by mouse; Answer key + pad dimmed and untappable until the act is done, typed digits/Enter/Backspace ignored.
- Five nudges in en, hi, gu (no English left), number-free, once per lock; first digit, Enter, Backspace, tap or finger tap brings it, a plain letter does not.
- Keyboard-only warm-up (real Enter on body) meets Q1 locked; Enter on the Hint/Sound/Restart key never does the step nor counts as a touch (Hint Enter shows the hint, the next Enter aims at the page).
- Wrong typed answer BEFORE the act (goto Q2 of P2/P3/P4) then a tap: the act key is hidden in the traceback, the pad returns (12 keys, none disabled) in ~2.5 s, the right answer wins; restart / phase dot mid-traceback leaves nothing stuck.
- L+B slip (14 for 9x5, 23 for 16x7) draws the amber length/breadth edges; 60 in P3 draws the vermilion frame; 2xside gives rows only; hi/gu hints read right.
- Free play: Breadth+ stops at the length, Length- pulls the breadth down, floors L2/B1, caps L16/B10; double tap Rows = one row.
- Double tap (45 ms, mouse and touch), 4-click bursts, doubled and held Enter on every act key and guide step = one act/step; a key during the party (Hint, Escape, Restart, dot, Answer tap, digit, Enter) ends it at once, mascot cheer clears.
- Classroom: bubble taps skip neither a guide step nor a locked question; AI mode: check() does the act then judges, answer()+check() wins; Play again re-arms the gate; 024 typed = 24.
FINDINGS:
1 [should-fix] phases 1 and 4 - P4, walk the guide by taps; at Q1 tap the dim Answer key (nudge "Cut the length with the Split key first."), tap Split: the bubble returns to the question while Drop and Fill are still to do and the key is still dim; two more taps on the dim key do nothing, no hint (P1 Q1 9x5: question back after the 2nd row, 3 rows to go). Expected: question back when the act is DONE, or the next nudge (Drop, Fill); the tool.tsx comment says so. Repro: scratchpad pH.mjs 4 / pA.mjs.
2 [should-fix] every phase, keyboard only - Enter on Rows/Fill drops focus to BODY (also after Hint, Sound, Restart: runtime-wide) and the next Tab restarts from the page top: the 4 rows of P1 Q1 by keys took 4+9+9+9 = 31 Tabs; Enter on body does nothing. Expected: focus stays on or returns to the act key. Probe pF.mjs / pW.mjs.
3 [should-fix] runtime timing, user and classroom, en/hi/gu - win line stays 1.8 s ("Yes, 27 x 9 = 243 square centimetres."), closing 3.4 s in gu P4 (13 words) and hi P2, 4.3 s en P4, then the next question/summary comes by itself: tight for Class 5. Same constant in every tool. Probe pZ2.mjs 4 gu.
4 [should-fix] free play, en - Breadth- to 1 reads "1 squares" on the breadth pill (hi/gu fine). Repro: Free play, Breadth- x4.
5 [should-fix] phase 3 Q1 (15x9), en - type 60 after Square: the vermilion "Boundary" pill straddles the top edge of the board and the canvas card border (play-G3-en-60-b.png). Only this input reaches it.
6 [question] phase 4 Q1, en - type 2187 (27 x 81, "three times the length"): hint says "Three times the length is far too long for a breadth" but the frame draws the finished 27x9 board, no breadth three times as long (play-G4-en-2187-b.png); plan asked for the long breadth (same as visual-reviewer-1.21's question).
7 [question] phase 3 item 2 (4 cm stamp) - 4 x side = 16 = the area, so a child who adds the four sides (perimeter) is marked right with "Yes, 4 x 4 = 16 square centimetres." and the traceback can never run for that slip. Plan answer is 16: maths reviewer's call.
NOTE: a question reached with touched=false (gotoStep, AI mode) has the Answer key live and a wrong first answer does the act for the child; no child path reaches it (guide steps always touch; clicking the Hint key never advances a step).
