STATUS: final. C26 review fixes in; full check 98 pass / 0 warn / 0 fail (3 full runs this message), ported.
MUST-FIX L box lines: every unit-box line is now INK at 2.4 (the outer edge is 4.5), in all L frames, part pieces and free play. FIXED.
PICTURE SIZE (rule 5): one fixed layout in x 0..900, identical with the pad shut and open.
- P1 square: target 384 px (16x16 at 24-px cells); the side label sits under it.
- P2 rope square: 360 px with the rope at its 9:1 shape; Fold/Fill moved under the card.
- P3 grid: card and dial in a top row, grid below, about 28-px cells (it was 22).
- P4 L: Cut keys and Join in a column to the right, the figure scaled to the room left of them (28-30-px cells; it was 27).
- Copies: 3 to a row, tiles 156 px.
- NOT reaching 48-px L cells: that figure needs the 1472-wide shut room; keeping one size and place for the 900-wide open room caps it.
LABELS: card title 40; card value 72 with the unit at 40 beside it (auto-fit); dial caption 40; side labels 40 (fold 36); key words 40.
COLOURS: counted squares now violet #6A4FC4 (hue about 254): plain cells tint 0.42; tiles and copies under a 0.72 violet overlay; summary thumbnails violet. Amber spill and green answer unchanged.
HI/GU TYPE: a Hindi label under an outline sits 8 lower (P1 side, P3 length, P4 bottom, P2 sides). Sums put the unit on the result line when it fits (en/gu), else on its own line at 1.6 em (Hindi always). hi/gu equations written without spaces (21×21=441). Hindi hook shortened; start labels +12.
LABEL FIT: 441 pill sized to text + padding, inside the rope. Part pills capped to the piece width minus 16; a strip too thin for its pill puts it beside the strip. Notch labels 40 px: the riser label moves up when it would sit within 40 of the tread label.
P2: Fold/Fill hidden during a correction and once the square is full. "Boundary" label added under the rope before Fold; "Row" label beside the top row (P1, P3).
BUBBLE: square units in words ("square centimetres/metres"). Three questions shortened to stay one page (P3 Q1, P3 Q3, P4 Q2); TR keys moved with them. P4 win lines are now neutral ("the two parts add up to 108 square metres"; Q3 "the patch covers 98 square metres").
PLAY TESTER:
(1) WorkBackArea reads AI mode as the runtime does (operatorMode "ai" or a phase without navigable dots): never gated. Proved: in AI mode a real Cut press, then agent answer(108) true and Q2 answer('45') true -> win.
(2) The cut-DOWN board ("72 + 36") now matches the neutral win line. Proved.
(3) Double tap: a second press within 450 ms of an act ending, or of a guide-step dial press, is ignored. Proved: P2 fold, P4 cut, P1 plus each advance one step only.
(4) A dial press that does not move counts nothing. Proved: P1 Q2 minus at 1 and P3 Q1 minus at 0 keep the key locked; plus then unlocks.
(5) No nudge while an act plays. Proved: a digit mid-Fold keeps the question.
(6) Hint key after a nudge restores the question. Proved.
DECISIONS APPLIED: the cut line fades after Join (0.4 -> 0, 0.9 s); free-play sentences have their own TR keys.
NOT FIXED (runtime or lib, not mine):
- The dimmed Answer key in free play is the runtime's chrome: a tool cannot hide it.
- hi summary rows, hi chrome, focus drop, party timing.
