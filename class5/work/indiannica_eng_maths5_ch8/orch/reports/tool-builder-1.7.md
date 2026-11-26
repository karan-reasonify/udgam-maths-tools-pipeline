STATUS: done (checked 97/0/0, ported; English only, design pass not run)
SLOTS: M3.S4.T8.C36.2D1
FILES: work/indiannica_eng_maths5_ch8/M3.S4.T8.C36.2D1/tool.tsx
Cube Counter (cube_counter), M3.S4.T8.C36.2D1, class 5 ch 8, pinned to r66 (silent). Built and checked; English only (TR empty, waiting for the language pass); design pass not run.
Preview: class5/work/indiannica_eng_maths5_ch8/M3.S4.T8.C36.2D1/M3.S4.T8.C36.2D1.preview.html · ported pair: class5/output-preview/indiannica_eng_maths5_ch8/M3.S4.T8.C36.2D1/
Phases:
1 Space taken up: tap Fill twice (the hand fills one box and then the other, row by row, a count of cubes beside each box), then tap the box with the greater volume and press Enter. Shoebox v pencil box (CC1), school bag v pencil built from cubes (C35:1), tall box v wide box (authored).
2 The unit cube: tap the 1 mm, 1 cm or 1 m cube on the shelf; the hand carries it onto the picture card (classroom CC2, grain of sugar C36:4), then Enter. C36:2 is a choice of 1 cu. mm / 1 cu. cm / 1 cu. m for a cube whose edges are labelled 1 m.
3 Counting cubes: guide steps on a warm-up solid of 2 rows of 3. Then Count row (the hand taps each cube of the row and it lights amber; the row's count shows on its end cube when there is more than one row), then the typed volume: 18 (CC3), 7 (C37:3), 36 (C37:8).
4 Hidden cubes: guide steps on a warm-up stack of 3 layers of 4. Then Lift layer (the hand carries each layer to its own place in a row; each layer gets a chip with its number of cubes), See-through to show hidden cubes, then the typed answer: 24 (CC4), 27 (C38:6), 22 (C38:7, a layer of 11 is 6x2 minus one back corner).
Answer gates (lock only after a real tap; AI mode never gated; checked with real playkit clicks before and after each act): P1 all three: both boxes filled. P2 Q1/Q3: the cube carried onto the card is the answer, and Enter blinks only once it is there (no lock). P2 Q2 is UNGATED (a choice question with no act). P3 all three: every row counted. P4 all three: every layer lifted. A bare Enter after a miss costs no try (playkit).
Check: quick check clean; full check 3 of 6: 97 pass, 0 warn, 0 fail, ported, host emulator plays every phase. Looked at sheet-ask and sheet-wrong.
Departures from the plan:
- C35 has only 2 plan questions, so 1.3 (tall v wide box) is authored and targets the misconception. CC1's "what is that space called" is answered in the win line, because a tap cannot name it.
- C37:5 is unused (the same shape as CC3). C36:2 is a choice question: typing "1" would repeat the "1 m" in the question.
- The child taps a shelf cube instead of dragging it (the hand carries it). Count row is one key, because tap targets on each row of an isometric solid overlap. See-through appears only in phase 4 and free play.
- There is no running total (keyOnly has no runs box, and the total would show the answer). The pad has no cu. unit keys; the unit is written in the green answer label. The bubble says "cubic centimetres"; only drawn labels say cu. cm.
- Phase 1 has no teach line and OPENING is empty (see the runtime gaps). FREE_LINE now reads "Free play. Lift the layers and count every cube.", since there is no build control.
- Skins: every unit cube is the wooden cube skin tinted violet, then amber when counted and green at the answer. The open boxes have the carton skin on their walls. The bag, pencil and picture cards are plain. At most 38 skins on any screen.
- Phases 1-2 use the full 1472 width (they never open the keypad). Phases 3-4 are laid out at the open width of 900, so nothing moves when the keypad opens.
- The summary thumbnails draw cubes and digits only, no words: a word failed summary-thumbs in hi/gu while TR is empty. Words can come back in the language pass.
Runtime gaps (worked round, runtime not edited):
1) In a classroom, a one-sentence teach line before the first question waits for a tap forever (held=true), so next-key's classroom run timed out. Worked round with an empty phase 1 teach.
2) An act's `hold` piece keeps travelling with the hand as it leaves, so a carried layer flew off the board. Worked round with a small CcHold that stops drawing the piece when it lands.
Least sure: the violet tint over the beech skin looks mauve, and phase 4 cubes are about 43 units wide with four layer places in a row. Should the stack layout use more of the shut width, even though it would move when the keypad opens?
