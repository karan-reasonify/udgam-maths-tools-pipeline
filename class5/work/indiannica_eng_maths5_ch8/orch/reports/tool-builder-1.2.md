STATUS: ok
SLOTS: M1.S1.T3.C11.2D1
FILES: work/indiannica_eng_maths5_ch8/M1.S1.T3.C11.2D1/tool.tsx
CHECKS: full 97 pass 0 warn 0 fail, ported
FAILURES: none
DECISIONS: pointKey on; plan items kept (decimal typed is 31.2); answer gate on every question
RISKS: P4 gate waits for all N laps
ESCALATE: none
C11 M1.S1.T3.C11.2D1 Square and Triangle — built, full check 97 pass / 0 warn / 0 fail (3 full runs), ported.
Preview: class5/work/indiannica_eng_maths5_ch8/M1.S1.T3.C11.2D1/M1.S1.T3.C11.2D1.preview.html · pair: class5/output-preview/indiannica_eng_maths5_ch8/M1.S1.T3.C11.2D1/
Phases (one act key at the bottom centre, label follows the act; warm-ups never use a question's numbers):
 1 Four equal sides: warm-up square 12 cm. Copy side (hand carries the "19 cm" chip onto the 3 blank sides), Times 4 (hand sweeps the sides; strip reads 19+19+19+19 / 4 × 19), type 76/36/92.
 2 Three sides of a triangle: warm-up 6-8-10. Walk x3 (hand carries the ant one side a tap; strip builds 13 + 15 + 17), type 45/21/245 (Q3 1 m, 80 cm, 65 cm: strip keeps the units).
 3 Working back to a side: warm-up P30 B5. Halve (rope loop: top+right half stays, other half dims, "36 ÷ 2 = 18 cm"), Take away (breadth lifted off, length green unlabelled, "18 − 7"), type 11/7/16.
 4 Laps and tenths: warm-up 2.3 m, 1 lap. Lens (lens over a side reads 34 tenths), Lap x N (ant walks the earth path, Laps: k counter only), type 68 / 135 (field, Lap x3, no lens) / 31.2.
Answer gate (every question gated, none ungated): P1 copy+times · P2 three walks · P3 halve+take · P4 lens + all N laps (Q2: 3 laps). Locks only after a real key press in user mode (toolApi mode read too); agent check() does the acts at once. Proved with playkit on Q1 of each phase: Answer key aria-disabled and digit refused before the act, live after; miss empties slot; traceback ends on the whole answer; right answer wins.
Traceback: sides light one by one, then the working lines appear, ending on the green answer (P2 Q3 lights the 1 m side amber + "1 m = 100 cm"; P3 adds check 2 × (11 + 7) = 36; P4 lens/tenths, 4 × 34 = 136 tenths, 5 × 136 = 680 tenths, = 68 m). Inside pointerEvents none, clears when the child types.
Skins drawn: ant (rotated to walk, plain SVG ant under it), rope (perimeter string, 200x22 pieces at 9:1 along each side, short sides one piece scaled whole, vermilion code over it), path (one earth strip a side). Outlines, pond, lens plain.
Departures: no runs box (keyOnly forbids it; lap count is in the working area); unit keys cm/m not on the pad (units live in the question); Take away is a tapped key, not a drag; brief's stage coordinates replaced by the keyOnly/bigPad layout (900-wide frame, centred when shut); plan items kept, so the decimal typed is 31.2 (P4 Q3), not 13.6 (13.6 m only appears at the warm-up/win as one lap); closings P3/P4 shortened under 80 chars (long ones never reached the bubble); every item has a one-sentence win line (needs TR at the language pass); equations drawn as tspans with gaps, not spaces (labels-short).
Free play: Square/Triangle toggle, Longer (+1 cm), Lap (ant walks round; laps and total shown) — matches FREE_LINE.
Runtime gaps: none. TR empty (language pass later). Design pass not run (waiting for "visual pass").
Least sure: P4 gates on ALL N laps (5 taps on Q1) — should one lap be enough before the Answer key wakes?
Also: gate armed by a press on the act key (not by Enter on a guide step): a keyboard-only child who does the warm-up with Enter reaches Q1 ungated until the first act-key press. Gate re-checked on P1 Q2 (disabled until Times 4).
Rope: several 200x22 tiles per side (knots mid-side on long sides) instead of one stretched piece; visual reviewer to judge.
guide.answerGate sidecar note: nothing in port/lib writes it and I may not hand-edit the pair, so the main session must add it (acts as listed above; no ungated question).
