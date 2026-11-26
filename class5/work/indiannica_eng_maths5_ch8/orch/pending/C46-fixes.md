C46 maths-review fixes (maths-reviewer-1.8, 2026-11-16) — send to tool-builder-1.9 (a38a6e75c6cbcca6d) when an Opus slot is free. ONE MUST-FIX.
MUST-FIX:
M1. Phase 4 C48:8 (Yes/No) correction after a wrong "No": runs three edge rows the child packed, then writes only "5x3x2=30"; "Yes" is never written and no full box is drawn. Fix: at the correction's last step draw the win's full fill (30 cubes, within the 37-skin cap) and write a green "Yes: 5x3x2=30, none left over" beside the product.
PHASE 2 DECISION (main session, taking the reviewer's option b): the typed number is the child's OWN work; the tool multiplies back AFTER.
 (i) no gate in phase 2 (api.lock never for kind "dial"; pad open from frame one; no Invite on + / Check at a question, keep both in the warm-up steps); keep - + Check on screen as an optional try-it aid so the typed number is never one the tool chose; name P2 ungated in the report.
 (ii) multiply-back after the answer: the win writes 34x6=204 (pencil) and the green 6 m; the miss path already does it for 1..10.
 (iii) a typed number above the dial's top (204, 6936) must draw the plan's picture (solid rises past the card, card amber): raise to the stand's top and write the child's own multiply-back ("34x204=6936"; fit the 6936 line to the 290 px column), card amber, then the right height.
 (iv) after any miss clear tb on the next dial press (the dial is dead after a miss while + - Check stay tappable).
 (v) words: step 2, ladder[0], ladder[1], miss 2.1 and 2.3 all say "try a height, multiply it back, compare" (one idea five lines) and 2.1 names Check while Check is disabled at 0; rewrite to the textbook (set up "base x ? = volume", which number times the base, multiply back to check), one new idea each; keep 2.2.
SHOULD-FIX:
S1. BP4 / C48:7 corrections end on the three edge rows only: at tb 4 use the win's `list` (full fill), keep the rose Left over.
S2. A miss BEFORE the act (pad open until the first touch): the traceback draws the finished board, then one tap sets touched with actDone false and locks the pad behind keys that draw nothing (BP1: Raise over a solid already 7 high; Join/Pack likewise). Fix: actDone ||= S.tb > 0, or clear tb on the next press.
S3. Nudge line while the gate locks the Answer key: P1 "Tap Raise to build the box first.", P3 "Tap Join to build the block first.", P4 "Tap Pack edge to fill each edge first." (number-free, names a live key), hi/gu TR later; restore the question via api.say(item.say) when the act completes (PATTERNS 19, PREFLIGHT 29).
S4. Enter on a guide step must count as a touch (a ref set on a demo press or Enter, user mode only, read by the gate).
S5. Near-repeats within a phase run: P1 ladder[1] vs the closing; ladder[0] vs misses 1.1-1.3; P3 ladder[0], ladder[1] and the closing (one sentence three times); P4 ladder[0] vs miss 4.1; miss 4.3 vs the closing. Reword each rung with one new idea (a changed English line changes its TR key).
S6. Phase 4 amber edge: the lit amber line and "9 cm" chips sit on the NEAR rims while the cubes pack against the FAR corner walls (opposite sides of the box): light the row's own footprint (an amber strip on the floor along the row) or label the rims the rows follow. Visual reviewer to confirm.
S7. The Divide line "216/27=8" is violet (violet = unit cube/row/layer in this chapter; 8 is the trap number): ink it. Slot label "Filled with none spare?" -> "Is the box full?".
S8. (main session) sidecar guide.answerGate.
MAIN-SESSION DECISIONS: keep BP4 = 6 and C48:7 = 10 equal to a box label (plan numbers); keep "-" as the dial's undo (two-way dial); Yes/No Yes-first fine (only choice item).
