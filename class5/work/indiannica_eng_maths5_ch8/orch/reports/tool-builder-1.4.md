STATUS: checked (full 97/0/0); port blocked by plan url mismatch (C23 url on C21 slot)
SLOTS: M2.S2.T5.C21.2D1
FILES: work/indiannica_eng_maths5_ch8/M2.S2.T5.C21.2D1/tool.tsx
ESCALATE: port: plan 2d_tool_url names M2.S2.T5.C23.2D1
C21 Rows Times Squares (M2.S2.T5.C21.2D1), ch 8, r66 silent. Preview: class5/work/indiannica_eng_maths5_ch8/M2.S2.T5.C21.2D1/M2.S2.T5.C21.2D1.preview.html
Phases (a grid of unit squares, rows stacked from the bottom; one key at the foot whose label follows the act; every act is api.act):
1 Rows: one tap of Rows = one row (hand push), rows numbered; warm-up 7x3; Q 9x5=45, 6x4=24, 12x8=96.
2 Fill: one tap stacks every row; warm-up 9 m x 6 m garden; Q 16x7=112 sq. m (garden skin), 8x6=48 sq. cm, 14x9=126 sq. m.
3 Square: the breadth is pulled up to the side (rows fill as it rises, a dashed target); warm-up 14 from 8; Q 15=225, 4=16, 20=400.
4 Split (scissors, ribbon strip in 3), Drop (hand carries one part to stand as the breadth), Fill; warm-up 18->6; Q 27->9=243, 24->8=192 (authored), 33->11=363.
Gate (PATTERNS 19): every question is gated by its act: P1 Rows until full, P2 Fill, P3 Square, P4 Split+Drop+Fill. Locked only after a real tap on the board; HOOK.check does the act at once (agent never gated). Proved with playkit real clicks (P1, P4): answer key absent and typing refused before the act, right answer wins after. No ungated question.
Check: quick 32/0/0; full 97 pass, 0 warn, 0 fail (2 full runs). PORT FAILED (not the tool): the plan's 2d_tool_url for this slot ends .../M2.S2.T5.C23.2D1/M2.S2.T5.C23.2D1.tsx, not this slot id; main session must resolve (re-keyed plan/remap). So no sidecar .json yet: its guide.answerGate note (above) must be written when it ports.
The line under the picture: "L x B = ?" once the act is done; the answer (green) only at the win, in the warm-up and at the end of a traceback; drawn as 3 short texts (labels-short).
Traceback: act completed if needed, a vermilion Boundary first when the miss is L+B / perimeter / 2 or 4 x side, rows light amber one at a time beside "L x k", ends on "L x B = A unit" in green; pointerEvents none; clears when the child types.
Skins (main-session cap): tile per counted square only on screens of <=40 cells (P1 warm 7x3 and 6x4, P3 stamp 4x4); every bigger grid plain (dark outline every box, violet fill counted); garden skin under the 9x6 and 16x7 gardens; ribbon skin on the P4 strip parts and the standing part.
Departures: (1) phase 1 plan question M2.S2.T5.C20:4 (7x6 "product and count") unused, listed in MODEL.unusedQuestionIds; (2) phase 4 item 2 authored (24 cm, 192): plan has only two questions for C23; (3) no running count (it would print the answer; keyOnly fails a runs box); (4) no sq. cm / sq. m pad keys: plain number answer, the unit in the question ("in square metres") and on the line; the "m not sq. m" misconception cannot occur; (5) no drag handle: taps (one click a step, no drag timeouts); (6) record card reduced to the one line; (7) question says use "square metres/centimetres" (a "sq." period may page the bubble); (8) all ladder rung-3 lines rewritten (plan meta-text), learned lines cut to <=72, closings one sentence; phase 2 closing reworded without a comma (one-line-bubble).
Runtime gaps: no unit keys on the pad (above). Nothing else.
Language: TR empty (language pass pending); win lines are item.win data (add to TR by hand); Work words via tx: squares, Boundary, Breadth =, one third of length, sq. cm/sq. m, key labels.
Least sure: phase 3 starts each "square" item as a shorter rectangle (e.g. the 4 cm stamp drawn 4x2, labelled 2 cm) so Square has something to pull up; is drawing a named square as a rectangle first acceptable, or should Q2/Q3 open square with only Fill?
