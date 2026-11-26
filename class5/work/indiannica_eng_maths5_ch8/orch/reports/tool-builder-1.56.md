STATUS: done. Final fix list (10 items) applied, nothing else changed; full check 99 pass, 0 warn, 0 fail; pair ported.
SLOTS: M3.S5.T10.C46.2D1 (Box Packer)
FILES: work/indiannica_eng_maths5_ch8/M3.S5.T10.C46.2D1/tool.tsx
CHECKS: quick 33/0/0; full 99/0/0 (reduced motion), host plays every phase. Motion ON was proved with playkit (motion:true), since the check has no motion switch.
1 FIXED: Thumb draws each row from its item: raise = its own height in layers, dial = the child's height in layers, join = nx x ny cubes, pack = the box filled with every whole cube (the yes row is a full box). Rows 135 and 9 now differ.
2 FIXED: P1 Q3 miss "Stack 3 layers of 45 cubic metres."; P2 Q2 miss "Say the 14 times table until you reach 56."; P3 Q2 miss "Multiply 8 cubic centimetres by the number of cubes."; P4 Q2 miss "How many 2 cm cubes fit along the 3 cm edge?" (hi/gu TR, old keys gone). hi वाला / gu પાયાવાળો fixed. At tb 1 of a typed height above 10 the dial window is blank, never "10 m".
3 FIXED, proven en/hi/gu at real motion: joined is set when the hand's act ends; the slide only moves the cubes. Within 60 ms of the act end: Answer tap, digit 7 and a second Join show no nudge and start no second push (acting false, joined true).
4 FIXED: a typed height of more than 4 digits gets no written line; the amber card and the right height remain.
5 FIXED, proven en/hi/gu: a keyboard Enter/Space on an act key refocuses it at once (the runtime's press handler blurs after every press, usePress -> pointerBlur). Tab to Raise, Space: focus on raise at +60 ms, +760 ms and after the act; digit 4 on the focused key keeps it there (nudge shown); the next Enter raises (layers 2). Mouse/finger presses keep the runtime's blur, so a physical Enter still answers.
RUNTIME GAP: the press handler blurs on every press and every digit.
6 FIXED: ruler ticks shortened to 8/12 and the ruler chip ends 12 before them.
A new width estimate (zero-advance Devanagari/Gujarati marks count 0) fits chips, cards and the dial. hi/gu Given line 1 now 34, base-area chip 40, ruler chip 32.
7 FIXED: the dial read-out is fitted with the same estimate (12 clear each side): hi/gu ~34.
8 FIXED: the P3 step-1 invite is a hexagon hugging the front cube (c4-pulse, theme Enter colour), so no sliver of the middle cube is inside it. The contact shadow is drawn inside the block's own footprint.
9 FIXED:
- (a)(b) The box now stands in y 84-504 and the Left over pill sits in the lane above it, clamped to x <= 540, with a dashed leader down to the left-over space. It touches no rim, wall or cube (seen en/gu after the first warm-up Pack edge and after Q1's three).
- (c) Free play (no keypad) gets a bigger board: footprint 380x210, column moved to x 680 (clear of the key corner); the unlabelled tick ruler is dropped (the card gives the height).
10: asks "Volume of this box?" / "Height of this box?" are now "What volume?" / "How high?" (+TR). No "tank" is left in the file. gu end key "આગલો તબક્કો" is runtime chrome, not touched.
KEEP respected: gate, first touch, base label under the solid, dial pill 122, ink, amber footprint, nudges, guards, AI mode, the 880 composition for P1/P2.
RISKS: disk 99% (3.1 GB free).
ESCALATE: none.
