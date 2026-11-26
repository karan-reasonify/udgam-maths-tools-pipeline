STATUS: ok (C31 maths-review fixes all applied; full check clean, ported)
SLOTS: M2.S3.T7.C31.2D1
FILES: class5/work/indiannica_eng_maths5_ch8/M2.S3.T7.C31.2D1/tool.tsx
CHECKS: quick 32/0/0; full 97 pass 0 warn 0 fail 5 info (1 run for this fix message), ported; MODEL.answerGate present in ported .json
FAILURES: none
DECISIONS: S5 kept one click a step (step 2 "Now tap a sliver square twice, until it reads L.", step 3 "Tap it once more, so it reads L for less than half."); nudge said once when the gate shuts
RISKS: the M briefly shows on the sliver between warm-up steps 2 and 3 (announced by step 2)
ESCALATE: none
M1: the ringed-square ladder is now "Is the leaf in more than half of the ringed square?" / "Look at the letter in the ringed square." (proved with real Hint presses).
S1: each phase has a nudge (P1 "Tap every whole square first.", P2 "Mark every edge square first.", P3/P4 "Pair the halves first."). It is said once when the gate shuts, and the question is said again when the act is done.
S2: every miss and rung is rewritten so each gives one new idea: misses point at the board, and rungs build (P1 point at each number, then find the biggest; P2 recheck the L squares, then finger-count the M squares; P3 count the brackets, then halve the Half line; P4 Whole + More than half first, then Half pairs and never Left out). The P4 closing is now "So an area found from part squares is an estimate."
S3: a shape with no part squares (free play, Grid) shows "12 sq. cm" with no "about".
S4/S7: the P4 teach is "Each square is one square centimetre." then "Part squares are only rounded, so the total is about, not exact." "estimate" shows at a traceback's end too, under the rebuilt sum.
S5: the warm-up's step 2 is reworded (see DECISIONS).
S6: a left-out square in the traceback, and a refused P1 edge square, are washed warm white, not violet.
S8: the P2 L chip reads "Less than half". "Left out" stays for P4 and free play.
Extra rules:
- The lock follows a real tap on a square or the Pair key only. HOOK.check, toolApi and the dev driver never set it. A warm-up Enter does not carry into the question.
- A miss counts as the act, so the pad never stays shut.
- MODEL.answerGate lists the acts per phase and P2 Q2 as ungated.
- TR is untouched.
Real clicks (playkit):
- P1: a keyboard-only warm-up (Enter on Start and the 3 steps), then Q1. The 1st tap shut the keys with the nudge on the bubble. After 18 taps the keys opened and the question came back. 18 then won.
- P3: a wrong typed 4 before the act, then the correction, then a Pair tap: the keys stayed open, and 5 won.
- P4: the keys were shut after 1 Pair and open after 3. A miss with 44 shows the new miss line.
Not done: design (as told), and the language pass.
