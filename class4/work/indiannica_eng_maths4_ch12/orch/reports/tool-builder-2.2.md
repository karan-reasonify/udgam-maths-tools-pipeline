STATUS: ok (built, full check 96 pass / 0 warn / 0 fail, ported)
SLOTS: M1.S2.T3.C13.2D1 day_dial
FILES: class4/work/indiannica_eng_maths4_ch12/M1.S2.T3.C13.2D1/tool.tsx; output-preview/indiannica_eng_maths4_ch12/M1.S2.T3.C13.2D1/M1.S2.T3.C13.2D1.tsx + .json; NOTES.md runtime-gap line
CHECKS: quick clean; full 3 of 6 used (finger-boxes, summary-thumbs, one-line-bubble, classroom, card-answer, text-contrast fixed); last 96/0/0
FAILURES: none
DECISIONS: label-only a.m./p.m. choice keys after the act (r30 gap: parts+choices in one item impossible, logged in NOTES.md); cardAnswer dropped (card-answer FAILs a tool with no card question), choices sit in the panel; P1 Q1 authored (12 hours to noon); ML2 split: 6:10 wake-up = phase 2 warm-up, lunch 1:15 = Q1; C12:7 unused; skins wall_clock/sun/moon drawn; day cards plain (no skins made)
RISKS: the answer is the label only, the hours/minutes come from the hops on the tag; Gemini pass not run (main session's); TR empty (language pass later); guide.answerGate written as MODEL.answerGate (port regenerates the sidecar)
ESCALATE: owner question: is label-only enough for phases 3-4, or should the time be typed too once the runtime takes parts+choices?
