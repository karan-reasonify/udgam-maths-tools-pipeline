STATUS: ok (review round: full check 98 pass 0 warn 0 fail, ported; 2 full runs)
SLOTS: M1.S1.T2.C6.2D1
FILES: work/indiannica_eng_maths5_ch8/M1.S1.T2.C6.2D1/tool.tsx
ESCALATE: no
C6 Edge Walker review fixes. Quick check 33/0/0.
Full run 1 failed `zones`: the key's invite ring ran 4 units past the working area. Fixed by lifting the key row; full run 2 = 98/0/0, ported.
MUST (green win after a typed answer with no Write in cm): FIXED. On a win the metre sides are converted, so the labels read 100 cm and the sum and total use cm.
 Real keys: P2 Q1 350 -> "100 + 85 + 90 + 75 = 350 cm"; Q2 530 -> "200 + 150 + 180 = 530"; Q3 320 -> "100 + 60 + 100 + 60 = 320"; P4 Q3 700 -> "2 × (250 + 100) = 700" and "250 + 100 + 250 + 100 = 700".
 A P3 tag win reached without a tag now shows the full Length/Breadth labels and no tray.
Gate (rule 7): FIXED.
 - A TRUSTED hardware Enter on a guide step in user mode arms the next question (Q1). Real keys: Enter on P1's step, then Q1 opens locked, and a hardware Enter there says "Tap Walk first, then give the perimeter.".
 - HOOK, toolApi and the dev driver never arm it; a gotoStep re-entry is a fresh, ungated entry.
 - Hardware Enter now nudges too (not on a piece of the board). No nudge while an act plays.
 - When what is waiting changes, the new line is said at once: the stale "Put the Length tag on first." becomes "Tap a longer side first." after a short tag (proven in hi), then "Tap Walk first..." after a long tag. When the acts are done, the question comes back.
Tray (P3): FIXED. Flat tinted tags with no outline, shadow or button look. After a RIGHT tag a short-side tap changes nothing (proven).
Boundary label (rule 4): FIXED, P1-P4 (hi सीमा, gu સીમા).
 - It shows on the lit loop at its widest inner row, 12+ clear; for a figure too small inside, at the paper's corner with a dashed leader.
 - The lit loop is now one closed stroke (no corner nicks).
 - Start page: the chip sits beside the bed's right side with a leader and a dot on the outline.
Paper grid (light option): FIXED, hairlines at 1 px, opacity 0.45.
Hi/gu chips (rule 2): FIXED.
 - Pills are taller in hi/gu (60 one line, 108 two lines, 1.45 em pitch) with a lower baseline, so the matras stay inside; checked on the hi/gu wrong sheets.
 - Side labels now 40 (were 44) so the taller pills fit.
Labels clear of the paper and the strip (rule 1): FIXED.
 - The figure is fitted inside margins sized from the widest chip and the chip height, so every chip is 12+ inside the paper.
 - Strip moved down to y 366 (12 below the paper); the strip text sits lower in hi/gu.
 - Side effect: figures are about 10-15% smaller than before (P3 Q2 portrait rectangle the smallest). picture-scale passes.
Ant between the top chips at the badge apex: FIXED; the badge walk now starts at a bottom corner.
Fact chip "1 m = 100 cm": shows only after Write in cm, in the warm-up too (it was in the warm-up from the start and repeated the step line).
 - The key moves right of the chip, so the hi/gu chip no longer runs under the key's ring.
 - The Write in cm invite ring is dropped once a correction has been drawn.
P3 step-1 invite ring through the "9 cm" label: FIXED, the ring is drawn under the labels.
Summary thumbnails: FIXED. A smaller shape, and the number is sized to the room left (28-32), so it is clear of the shape in hi.
Start hi orphan word: line shortened to "क्यारी के एक चक्कर में चींटी कितना चलती है?" (now one line).
Focus after an act (cheap option): keyboard focus returns to the first live board control instead of BODY.
NOT DONE (runtime or kept as designed, rule 6): the Hint key/Escape not cutting the party; the hi summary row pitch; the emptied slot; board re-centring with the pad shut; the free-play dim Answer key; the unlabelled empty Sum strip (no decision); garden bed and frame stay plain.
Kept the earlier per-phase touch: Q2/Q3 reached by keyboard only stay ungated until a real tap.
