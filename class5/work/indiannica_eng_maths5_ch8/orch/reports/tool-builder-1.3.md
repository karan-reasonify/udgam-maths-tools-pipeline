STATUS: checked (full 98/0/0), port refused (plan url names C18)
SLOTS: M2.S2.T4.C16.2D1
FILES: work/indiannica_eng_maths5_ch8/M2.S2.T4.C16.2D1/tool.tsx
CHECKS: quick 32/0/0, full 98/0/0
ESCALATE: 2d_tool_url mismatch (C18) blocks the port
C16 Square Cover (M2.S2.T4.C16.2D1), class 5 ch 8: built, English only, on r66 (silent, keyOnly + navDots + nextKey + bigPad).
Preview: class5/work/indiannica_eng_maths5_ch8/M2.S2.T4.C16.2D1/M2.S2.T4.C16.2D1.preview.html
Check: quick 32/0/0; ONE full check 98 pass, 0 warn, 0 fail. PORT REFUSED: the plan's 2d_tool_url for this mount ends in /M2.S2.T4.C18.2D1/M2.S2.T4.C18.2D1.tsx, not C16's. That is a plan/mount question for the main session; I did not port by hand.
Phases:
1 The surface covered: warm-up 3x2 card (steps: String, then Cover). Q1 5x3 card: lay the string (the hand pushes the rope round, it reads 16 cm), Cover (the hand sweeps 3 rows of tiles), type the area 15. Q2 fence: Perimeter/Area choice (picture only). Q3 6x2 card (authored: same 16 cm string, area 12).
2 The unit square: says, no steps. A shelf of 1 cm / 1 m / 1 km squares (plain). Tapping one carries it onto the picture card: too small reads as a speck, the right one as a neat row, too big swallows the card. Q1 playground and Q3 stamp: sq. cm/sq. m/sq. km choice. Q2: "1 sq. m / 4 m / 1 sq. cm" choice.
3 Counting the squares: warm-up 5x2 (two Lay a row steps). 9x4=36, 8x2=16, 13x3=39: tap Lay a row until covered (the hand pushes each row in tile by tile), then type. Practice 8 (14x5=70) unused: a phase holds 3, and it is over the 40-skin cap.
4 Comparing by counting: warm-up 4x1 vs 3x2 (Count A, then Count B). Q1 10x2 vs 7x3 (B); Q2 9x3 vs 6x4 (A): one key, Count A then Count B (the hand taps the rows and the counters show 10, 20). Q3: 20 small vs 12 big: the Same size key redraws the big squares as small ones (48); Yes/No choice.
Answer gate (api.lock after a real tap, until the act is done; probed with playkit real clicks: the Answer key goes off after the first tap and back on when the act is done):
 1.1 and 1.3 string+cover · 3.x cover all rows · 4.1 and 4.2 count both · 4.3 Same size · 2.1 and 2.3 try one unit (the tap that touches also finishes the act, so it never visibly locks). Ungated: 1.2 fence, 2.2 the 1 m square (no real act there).
Skins: tile on every laid cell where the screen has 40 cells or fewer (cards, rects, free play, ph4 warm-up and 4.3); ph4 Q1 (41) and Q2 (51) plain. rope: one per side, slice-fit at its own aspect, vermilion wash over it. playground on the ph2 card. Unit shelf, stamp and garden are plain (no skin was made).
Departures from the brief:
- No runs box/running count: keyOnly fails one, and a total would print the answer. Counters appear only for counted patches.
- No sq. cm/sq. m/sq. km pad keys: unit questions are choices. Typed answers are the number only, and the unit is printed in the win picture.
- No tray under the figures: squares are laid by the act. Phase 2 uses a tap that carries the square, not a drag.
- Bubble lines say "square centimetres" etc.: the bubble splits a page at "sq. " plus space (one-page fail). Drawn labels and keys keep sq. cm.
- C16:2 became a choice because a typed 1 echoes "1 m". 1.3 is authored.
- Phase 3 is gated until the rectangle is full, so the brief's "one row short" path cannot be typed. The traceback still counts rows 9, 18, 27, 36.
Win lines are item.win (<=50 chars, so classroom timing passes). TR is empty: the language pass is still owed (86 lines + win lines + the drawn words through tx). The Thumb draws only pictures and digits, so it stays free of letters in every language.
Pipeline gap: the port's sidecar has no guide.answerGate field, so the gate note lives here only.
Runtime gaps: none.
Question: phase 3 gates the answer until every row is laid (so a short count is only a miscount). Should the gate open after the first row, so the one-row-short misconception can happen?
