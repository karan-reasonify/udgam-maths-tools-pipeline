STATUS: done. C21 Rows Times Squares review-round fixes. Full check 98 pass / 0 warn / 0 fail; ported (output-preview/indiannica_eng_maths5_ch8/M2.S2.T5.C21.2D1/).
MUST-FIX
- P3 q3 "20 cm" (and the q2 "4 cm") side label: centred on the WHOLE side from the first frame (it used the one laid row). FIXED; real-input frame at q3 open shows it on mid-side, clear of the Fill ring.
- Summary thumbnails: the rectangle sits in a fixed 56-wide box, the equation starts 14 to its right as "33×11=363", shrunk to fit with textLength. FIXED (seen on the summary page).
COLOURS (rule 3), pixels sampled from playkit frames
- Plain grids: laid fill #B39DDB (hue 261, sat 0.46).
- Tile skins (7x3, 6x4, 4x4 stamp): overlay #A594E0 at 0.85, about hue 257 / sat 0.46 by calculation. Measured 266 / 0.41 with the previous #AA92DD, so the shade was changed once more.
- Garden: laid rows #6A55E0 at 0.82, measured hue 254 / sat 0.43-0.44 on the full 112-cell grid; unlaid marigolds stay orange.
- Garden cells: a light under-stroke sits beneath the dark outline.
- "Row" chip (32, deep violet ink) on the laid bottom row in P1/P2/free play.
EQUATION LINE
- ONE text run with real spaces ("15 × 15 = 225 sq. cm"), the unit on the result, the left edge on the grid's left edge.
- Marked data-role="reading", so labels-short does not count it as a sentence.
- hi "वर्ग सेमी" keeps its space (the old 3-piece layout overlapped it).
- The line is hidden at the boundary step (it showed "15 × 0").
PHASE 4
- The strip is 64 tall with the length pills wholly inside.
- The empty rectangle is drawn as a dark dashed outline at its final size and place.
- The clue card's line pitch is 1.45 em.
- No "= ?" pill exists beside the strip, so that item does not apply.
SIZES
- The cell cap went from 72 to 100: 7x3 cell 100, 6x4 cell 89, 4x4 stamp cell 89 (grid 356).
- Free play uses the whole card: grid on the left (8x5 at cell 72), its five keys in a column at the right below the key corner. The "8 squares" pill is clear of every key.
- hi/gu chips are 1.55 em tall with the text set lower, so the repha stays inside.
OTHER
- The "Boundary" pill sits inside the grid's top-left corner, never over the card edge (seen in gu mid-traceback).
PLAY TESTER
- (1) Nudge sequence FIXED, real clicks in P4 Q1: dim Answer -> "Cut ... Split"; Split -> "Stand one part up ... Drop"; tap again -> same; Drop -> "Stack ... Fill"; Fill -> the question. P1 q2 in hi: the Rows nudge stays until the grid is full, then the question.
- (4) "1 square" (singular, new TR key) FIXED.
- (5) Boundary pill FIXED (see OTHER).
- (6) The P4 Q1 miss is now "Is the breadth three times the length, or one third of it?", with the TR keys renamed; 2187 shows it.
- (7) The 4 cm stamp is kept, by decision.
- (2) Focus drop after Enter and (3) win/closing timing are runtime; not touched.
RULE 7
- A right answer reached without the act ends on the full, correct working (render-time completion at win/idle).
- Enter counts as a touch only when isTrusted.
- The nudge never shows while an act plays.
NOT FIXED (runtime, by the coordinator's list)
- The hi title underline on the start page.
… truncated: 7 more lines (reports are capped at 40)
