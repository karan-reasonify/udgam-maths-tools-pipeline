STATUS: done. Review-round fixes applied; full check 99 pass, 0 warn, 0 fail; pair ported.
SLOTS: M3.S5.T10.C46.2D1 (Box Packer)
FILES: work/indiannica_eng_maths5_ch8/M3.S5.T10.C46.2D1/tool.tsx
CHECKS: quick 33/0/0; 1 full check 99/0/0 (ported, host plays all phases).
REAL INPUT (motion on): P1 Q1-Q3 by mouse, P3 Q1-Q3 by finger, P4 Q1-Q3 after a keyboard-only warm-up. Every question opens locked, stays locked mid-act and after a partial act; a typed answer before the act stays in ask; the key unlocks only when the act is complete, then wins. Also proved: P2 9-digit miss, the dial after a miss, the win pencil position; Enter, digit and Hint on P1.
MUST-FIX 1 gate bug FIXED: press locks synchronously before api.act when the act is still owed; doAct bumps S.actN when the act ends, re-running the lock effect after the act layer restores its old lock. The first real touch is now mount-wide (BP_TOUCH: a real key or piece tap, or a trusted Enter on a guide step, user mode only), so Q2/Q3 are gated from their first frame like Q1. This also covers the P3 items 2-3 decision.
MUST-FIX 2 FIXED: dial pill 122 wide, minus/plus 72 each, read-out type fitted to the pill (40 down to 28).
MUST-FIX 3 FIXED (all phases incl. free play): the base-area label left the face. It now sits UNDER the solid, 14 clear of the front-left bottom edge, on a dashed leader to that edge, fitted to 276 px (40 down to 28). No label is drawn on a face.
MUST-FIX 4 FIXED: once all three edges are packed the inert Pack edge key is not drawn; the line sits at y 366, the chip at 436 (36 clear), and the chip is fitted to the 290 column.
SHOULD-FIX:
- Act points use the pad-shut layout (oxA), so the hand and pencil land on target when the pad was open; the second offset pencil copy is gone (seen at real motion).
- A 9-digit typed height skips the written line; the card stays amber, then the right height shows.
- Hardware Enter on a locked question shows the nudge, never while an act plays or on a focused act key; after a nudge the Hint key re-shows the question; the question comes back after the next act.
- The dial follows the number its window shows: after the miss, minus went 6 to 5 and plus 5 to 6. A dial turn wipes the last written line.
- Keys get a pale veil while an act plays (still focusable); after a keyboard act the focus goes back to the key.
- P1/P2: solid bigger (Hmax 280, footprint 270x150), right edge 40 clear of the column; ruler and height chip fitted on its left.
- P1 hi/gu Given card 40 wider. P1 open-pad answer pill now ~40 clear of the solid.
- P2: pencil line (Check and win) in dark ink at width 4.6; the unlabelled amber triangle dropped; tank renamed box in P2 Q1 and P1 Q3 (say, ask, miss, win + hi/gu TR).
- P3: edge chip 22 left and 16 lower, clear of the cube tip; "5×5×5" written without spaces (no-break spaces are flattened by the bubble); step-1 ring 16 tighter; apart rows 14 further apart; the amber worked cube has a 4.5 amber outline.
- P4: amber strip is the next row's true footprint (one cube wide, whole edge long); Left over chip clamped inside the box; length chip moved down-left (clear of the height chip in hi/gu); hi chip "हाँ, पूरा भरा", gu "હા, પૂરો ભરાયો".
- Free play: Raise 118 and New base 162 wide, labels fitted with 12 clear; it shares the bigger P1 solid.
- Summary: each row draws its own picture (raised solid, joined cubes, packed box) plus the answer.
NOT DONE (why):
- P2 type 32 to 40 only for the base label (40); the Volume card stays 32/40 so the column keeps its room.
- The picture cannot fill a third of the 1472 area: it is held to the 880 composition so it stands in one place with the pad open (bigPad, rule 6).
- Rule 3 violet: no reviewer flagged it on C46; the wooden cubes stay beech.
- Runtime gaps not mine to fix (listed by you): act layer restores the pre-act lock; Escape/Hint do not end the party; focus drop to BODY.
RISKS: disk 99% (4.1 GB free).
ESCALATE: none.
