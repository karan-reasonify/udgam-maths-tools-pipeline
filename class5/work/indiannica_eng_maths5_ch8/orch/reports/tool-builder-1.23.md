STATUS: done. Fix round C46 applied; full check 98 pass, 0 warn, 0 fail; pair ported.
SLOTS: M3.S5.T10.C46.2D1 (Box Packer)
FILES: work/indiannica_eng_maths5_ch8/M3.S5.T10.C46.2D1/tool.tsx
CHECKS: quick 32/0/0. Full 98/0/0, ported; the host plays every phase. The session restart killed my own check while a second run was on the slot, so the clean pass is a run on the unchanged final source.
FAILURES: none.
DECISIONS:
M1 After a wrong No on C48:8 the correction's last step draws the full fill (30 cubes) and writes "5×3×2=30" plus a green "Yes, no gap" chip. The chip is shorter than the asked "Yes: ..., none left over", which runs wider than the 290 px column. Seen in playkit.
P2 (i) ungated: lock is never called for the dial. Minus, plus and Check stay as an optional aid. No Invite at a question; the warm-up keeps both steps.
P2 (ii) at the win the pencil writes "34×6=204" and the green "6 m" shows.
P2 (iii) a typed height above 10 (204, 6936): the solid stands at the dial's top with an amber arrow, the card is lit amber, and the child's own line is written ("34×6,936=2,35,824", Indian commas, font fitted to the column at 28 or more). Then the right height and its line. 6936 seen with motion on.
P2 (iv) the next minus, plus or Check press after a miss clears the correction. Proved: dial back to 1.
P2 (v) the lines now carry one idea each: miss 2.1 "Set it up as 34 times a missing number makes 204."; miss 2.3 "Count up in 13s until you reach 117."; ladder "Use your times tables to find the missing factor." / "Multiply your height back by the base area to check it."; step 2 "Tap Check to write the base area times this height." Miss 2.2 kept.
S1 BP4 and C48:7 corrections end on the full fill, with the rose Left over kept.
S2 a correction counts as the act (phases 1, 3, 4). The act keys go quiet, so a miss before the act never locks the pad. Proved: miss 31, then raise is off and answer-open is live.
S3 nudge: a trusted tap on the locked Answer, a digit or a choice key, or a typed digit, prints "Tap Raise to build the box first." (or the Join / Pack edge line). The question comes back (api.say(item.say)) when the act is done. Proved on P1: tap locked Answer, nudge; 7 Raise, question again.
S4 a trusted Enter on a guide step (not a header control or phase dot, user mode only) or a real tap counts as the touch for question 1. Never from HOOK.check or toolApi. Proved: keyboard-only warm-up, Q1 opens with answer-open(off).
S5 near-repeats reworded: P1 ladder; P3 ladder; miss 4.1 "How many whole 3 cm cubes fit along the 9 cm edge?"; miss 4.3 "Divide each edge by 3 and look for a remainder."
S6 the row about to be packed gets an amber strip on its own footprint (far floor edges and the back corner wall). The near-rim amber line is gone.
S7 the Divide line is in ink; the ask is now "Is the box full?".
S8 MODEL.answerGate (P1 Raise, P2 ungated, P3 Join, P4 three Pack edge taps, the nudge, the trusted-Enter rule) reaches the ported .json.
Gate re-proved with real clicks: P1 unlocked untouched, locked after the first tap, unlocked after 7 Raise. P2 never locked. P4 Q3 locked after the first Pack; after three Pack edge taps the choice keys show.
RISKS: the TR keys are not written yet (language pass); the new nudge lines and "Yes, no gap" need hi/gu. The disk is nearly full (about 1.7 GB free); a full check passed, but heavy runs may hit ENOSPC.
ESCALATE: none.
