STATUS: final (full 99/0/0, ported)
SLOTS: M2.S2.T4.C16.2D1
FILES: work/indiannica_eng_maths5_ch8/M2.S2.T4.C16.2D1/tool.tsx; output-preview pair
CHECKS: quick 33/0/0; full 99 pass 0 warn 0 fail (its motion-ON rows + reduced motion), ported, host plays every phase
1 FIXED (must): the gate holds while an act is still playing (want = ask && (!actDone || playing) && touched), and play()'s .then bumps an actEnd tick, so it opens only when the act ENDS, not at the last onPoint. Lock at the press, hold, finished(): unchanged.
  PROOF (playkit, real motion, in-page poll every 12 ms after the last act's tap; en mouse, en finger, hi mouse, gu finger):
  - P1.3 Cover: Answer live at 1090-1092 ms, act ended in the same sample, 0 samples live-while-acting; real keys right after gave typed "1" then "12", Enter -> win, tries 0 (4/4).
  - P4.2 Count B: same timing, 0 live-while-acting; Answer -> Patch A -> win (4/4).
2 FIXED: finished() sets str only for a card (otherwise the board's own S.str). AI gotoStep + check + answer: P3.2, P4.2 and P4.3 string_laid=false; P1.3 true.
3 FIXED: the card's bottom margin is 128 -> 142. The 5x3 card is now 440x264, the 3x2 399x266, the 6x2 unchanged. The rope's lower edge is ~17 units above the Cover key's invite ring (was 1-2); the hand stays inside the board (top margin kept at 112).
4 FIXED: in 4.3 the Patch A/B labels stand 26 above the taller grid (was 16), so the hi nukta and gu descender are ~16 clear (en more).
5 LEFT as told: gotoStep during a touched warm-up opens P3.2 gated (a host verb). The 4.3 closing replacing its win line is by design.
Runtime gap still open: an act key loses focus after Enter (keyboard-only).
