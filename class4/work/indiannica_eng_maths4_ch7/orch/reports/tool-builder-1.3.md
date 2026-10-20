STATUS: ok
SLOTS: M2.S4.T8.C35.2D1 (Like Pieces Bench), round 4
FILES: class4/work/indiannica_eng_maths4_ch7/M2.S4.T8.C35.2D1/tool.tsx (3 Edits, line endings untouched)
CHECKS: quick 30/0/0 before and after; full 95 pass/0 warn/0 fail, run 2 of 4 on the final source (run 1 also 95/0/0 before edit b); tr-coverage passes; viewed sheet-ask + sheet-wrong en/gu, no clip or overlap
FAILURES: none
AUDIT (already in, read in source + seen on sheets): 1 typed value on card, right answer in LpAnswer (placed in the top row beside the count, NOT beside the card); 2 hi/gu pitch 51, chip h 108; 3 Same size + TR; 4 thumb whole at cx, choice thumb; 5 wash 0.5, one clipped skin, plain whole + ring outside; 6 R from 128 down, sparse frac 64, labels 40; 7 chips 32 bold ink, w 204; 8 ring gated on !box.open; 10 Enter act, card-tap nudge x4 literals with TR, focus to next key; 11 New sum fixed x 485 + 500 ms ignore
APPLIED a: LpAnswer non-sparse (P3, P4 Q7) h 100 -> 80, fraction 40 -> 36, y0 38 -> 33, label y 62 -> 50 (the lifted gathered plate's ring, ink top y 87, painted into the box bottom)
APPLIED b: LpAnswer sparse (P1, P2) fraction 52 -> 64, y0 60 -> 55, label T.label -> T.prompt, box x 540/w 340 -> x 580/w 300 ("counted" touched the box edge on sheet-wrong)
APPLIED c (item 9): count after Gather Math.max(S.m, it.a) -> Math.max(S.m, it.a) - (S.g ? plan.W * it.d : 0), the navy slices still on screen (P3 ML3 reads 6, was 15); Reduce leaves it
DECISIONS: "counted" label stays 32 on sparse screens (40 would hit LpAnswer); no English line changed so no TR key changed
RISKS: (1) RUNTIME GAP to log, item 10 Hint half NOT done: the first Hint-key rung is the item's miss (rungOf), so a tool cannot make it "Tap the blinking <act> key." while the card waits (card tap does say it). (2) Question: the count now drops at Gather (15 -> 6) because the plate turns plain; keep, or restore the old total?
ESCALATE: no
