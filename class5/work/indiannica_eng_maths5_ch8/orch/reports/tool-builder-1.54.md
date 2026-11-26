STATUS: final (full 99/0/0, ported)
SLOTS: M2.S2.T4.C16.2D1
FILES: work/indiannica_eng_maths5_ch8/M2.S2.T4.C16.2D1/tool.tsx; output-preview pair
CHECKS: quick 33/0/0; ONE full check 99 pass 0 warn 0 fail, ported; host emulator plays every phase. The full check runs its motion-ON rows (board-panel, action-anim, phase-party, miss-clears-slot) and the rest at reduced motion.
1 FIXED (must, gate released after the first act):
- pressKey and tryUnit now lock SYNCHRONOUSLY (gate.current = true; api.lock(true)) before the act starts when the question is open and its act incomplete.
- play() re-asserts api.lock(true) in the act's completion while the gate holds (hold); the gate effect releases it only when the act is COMPLETE.
- PROOF (playkit, real input, questions entered untouched by gotoStep): 9 runs = en mouse/finger/keyboard x motion ON and OFF, hi mouse ON + finger OFF, gu mouse ON + keyboard ON.
- P1.3 (String only), P3.2 (1 of 2 rows), P3.3 (2 of 3 rows), P4.2 (Count A only): Answer key disabled, typed answer + Enter (or the choice key) never won: 36/36 not won, 0 wins.
- After the last act the key is live on every item, P4.3 Same size too: 45/45.
2 FIXED (must, rule 7):
- finished() is the one finished-working state (the agent's HOOK.check uses it too). A useEffect puts it at win/idle when the act is incomplete.
- PROOF (untouched, typed or chosen right answer; en ON/OFF, hi ON, gu OFF):
  - P1.3: rope + 12 tiles, coil gone.
  - P3.2 rows_laid 2; P3.3 rows_laid 3.
  - P4.2 counts 27/24 drawn.
  - P4.3 big squares converted to 48.
3 FIXED: drawRectTb draws the rows the child did not lay with tileCell. Correction cell (133,105,200) stdev (0.9,1.8,2.8) = a laid tile (133,105,200) stdev (1.0,1.9,3.1); before: flat, stdev 0.
4 FIXED: the ring correction's inside block and lit row are amber at 0.85. Sampled (216,150,30), hue 39, sat 0.76 (before: tan (184,130,86), hue 27).
5 FIXED:
- The card's Area label sits 66 under the rope in hi, 58 in gu, 54 in en (hi/gu sheets: clear).
- The garden picture and its labels moved 16 right; "Boundary" ink now starts about 44 clear of the panel border.
6 FIXED:
- (a) Once the string is laid, the card nudge says "Now cover the card before you answer." (hi/gu TR added).
- (b) 2.3 is in the natural order sq. cm / sq. m / sq. km (answer first). Ids, judge and the nudge do not depend on the order.
- (c) The 4.3 win line is "Right, the squares differ, so counts cannot tell." (hi सही..., gu સાચું...; keys changed in the same edit).
7 FIXED:
- The tapped shelf square goes back to violet at the win and phase end.
- On the stamp, the fitting row is the stamp's own width: 2 cells over the 140-wide stamp, not 6 across the card.
- The card's top margin is now 112 (was 84), so the open hand pushing the string along the top edge stays inside the board (card 5x3 is now 465x279).
- Orphan words left as they are.
- Disabled key label ink is shade(dim, 0.4), readable (the free-play Lay a row once the shape is full).
8 RUNTIME GAP (not fixed, as told): the runtime Key has no keepFocus, so Enter cannot repeat an act key (keyboard-only P3: focus drops to BODY after the first row). The keyboard-only proof above focused the key before each press.
KEEP untouched: Hint re-shows the question, touched per question (warm-up carry), no nudge mid-act, units dead during the correction, P1 tile correction squares, AI mode, thumbnails, double-tap guard, Boundary outside the fence.
Note: gotoStep to a phase's FIRST question reopens its warm-up, so a probe must do the steps first; my first amber probe tripped on it.
