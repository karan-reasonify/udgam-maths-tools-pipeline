STATUS: ok
SLOTS: M1.S1.T3.C11.2D1
FILES: work/indiannica_eng_maths5_ch8/M1.S1.T3.C11.2D1/tool.tsx (pre-round backup: scratchpad c11-before-final.tsx)
CHECKS: quick 33/0/0; full 98 pass 0 warn 0 fail 4 info (C4_CHROME_POOL=1; motion-on rows action-anim/party/one-line-bubble + reduced-motion shots), ported 20:2x
FAILURES: none
DECISIONS: hi Q3 strip settles at 32 px (measured fit), under the 34-36 the list named; all 10 items done after the 19:50 restart cut
RISKS: none new; KEEP list untouched (gate, nudges, Lap gone in correction, AI, classroom)
ESCALATE: none
1 FREE PLAY: the paper is 408 tall in free play, so the figure and every label end above the key row. The 3 keys are laid left to right from the paper's left edge (no negative x with the pad open). Free play is one mode for every mount.
  Real input en/hi/gu: paper bottom 516 px < keys top 532; Triangle/Lap play with no errors.
2 SUM STRIP: the line size is now a MEASURED fit: getBBox of every drawn line, factor kept per question, card width 383 = 420 - 2x19.
  P2 Q3 real input, correction AND win:
  - en "1 m + 80 cm + 65 cm" at 36, 28 px inside the card's right border;
  - hi at 32, 36 px inside;
  - gu at 36, 32 px inside.
3 HI/GU LABELS:
  - estimates made safe (stacked x1.12, one-line x1.08), 20 px inset;
  - top/bottom labels 26 from their side;
  - ghost slots inset;
  - triangle laid out at the largest scale where NO label needs clamping (loop at 0.96 per try);
  - P3 breadth label 16 clear of the rope and 20 inside the paper.
4 ANSWER LINE: "= 76 cm" etc drawn at 56-60 (54 en Q3, 60 gu), its own row height.
5 P2 Q3 TRIANGLE: scaled to the paper and centred both ways with its labels (no empty band under "1 m").
6 THUMB: prints item.answer (the book's form: 31.2 m, 68 m), never what was typed.
7 RUNG 1: the slip line shows ONLY for 10x the answer; any other first miss gets the generic rung.
  - Q1: generic "Find one lap in tenths before the laps."; slip "Your answer counts tenths; divide by ten for metres."; ladder "Multiply a side's tenths by 4, then by the laps." / "Ten tenths make one metre, so divide by ten."
  - Q3: generic "Read each side as 26 tenths first."; slip "That is a count of tenths; divide it by ten for metres."; ladder "Times 4 gives one lap, then times 3 gives three laps." / "Your count is in tenths; ten tenths make a metre."
  - The 2 new slip lines have hi/gu TR.
  - Mechanism: judge swaps item.miss to item.slip only when v == 10 x answer. The ladder stays monotonic (2nd miss -> ladder[0]).
  - Real input en/hi/gu: Q1 13.6 -> generic; Q1 680 -> slip, then 13.6 -> ladder[0]; Q3 3.12 -> generic; Q3 312 -> slip.
8 BOUNDARY: P4 caption sits against the inner ring edge (18 above it, not mid-pond); P3 caption at 0.5 with the halved rope.
9 FOCUS: "was in the work zone" is read BEFORE the act. After it, focus lands on the next act key, or on the live Answer key once none is left.
  Real keys P2: walk -> walk -> walk -> answer-open, never BODY.
  Free-play keys are never dimmed (no disabled state), so their labels stay full ink.
10 play-p115-q1-13.6.png deleted by exact name; the other agents' PNGs left in place.
