STATUS: final (full 99/0/0, ported)
SLOTS: M2.S2.T4.C16.2D1
FILES: work/indiannica_eng_maths5_ch8/M2.S2.T4.C16.2D1/tool.tsx; output-preview pair
CHECKS: quick 33/0/0; full 99 pass 0 warn 0 fail twice (2 of 6), last one ported; host emulator plays every phase
VIOLET PROOF (playkit real-flow shots, pixels sampled over the cells): P1 covered card / P1 win / P3 9x4 covered / P4.3 tile patches: hue median 258 (p10-p90 257-262), saturation median 0.45-0.46 (p10 0.37-0.41), rgb median (133,104,198). Before: hue 274, sat 0.32. How: the tile skin now wears #6A4FD0 at 0.8 (a bluer violet, because the tile photo is warm); the plain path is #8A6CCB (hue 259, sat 0.50). The start page, the 1 m square, the thumbnails and the correction squares all use the same pair.
FIXED, P1:
- Rope lies 12 units OUTSIDE the card, so every tile shows whole. The act's hand follows the rope; "16 cm" is above the rope.
- The orange bullseye coil is now a hank of three rope-skin pieces, and it goes once the string is laid.
- Warm-up card 3x2 is now 462x308 (was 333x222), the question card 5x3 is 510x306, both in the same place.
- The correction squares use tileCell (tile skin + violet, as the child lays them). Counting numbers are 44 px in ink with a paper halo.
- The Area label is lower (+8): hi clears the rope/outline.
- Boundary/सीमा/સીમા is outside the fence, left of the posts, with a paper halo.
FIXED, P2:
- Shelf squares are 48/78/102, all inside their 118 tiles.
- The shelf ring stands down while the keypad is open or a correction shows.
- The stamp is neutral paper: an ink perforated edge, a grey-blue picture.
- Units are not live during the correction (playkit: 0 unit controls mid-correction).
FIXED, P3:
- The tiles now read violet (above).
- The 5x2 warm-up is 680x272 (cell 136), the size of the questions (cap 110 -> 170).
- The Area label is +10 lower.
- The P3.2 miss is "Count the squares in both rows." with its hi/gu TR changed in the same edit.
FIXED, P4:
- A lit patch (amber after a miss, green at the win) is drawn at 0.85: it reads amber/green, keeps the outline and the 21.
- Patch A/B labels sit on one line; counts sit on one line (4.3 too).
- The warm-up pair is drawn like its questions (plain, no skin), cell up to 107 (cap 90 -> 120).
- Thumbnails: rows 1 and 3 draw the child's real 6x2 and 13x3. The row 4 ≠ is a drawn sign about 32 tall with 20+ px clear each side (Poppins rendered the glyph as "=/").
FIXED, play tester:
- Q1: the Hint key on a locked question re-shows the QUESTION (playkit: nudge -> Hint -> the question).
- Q2: touched is per question. A warm-up's touch carries into the question it opens, so P1/P3/P4 Q1 stay gated after a real warm-up. P2.1 and P2.3 are each gated from their own first unit tap (playkit: P2.3 opens ungated after P2.1 was touched).
- Rule 7: no nudge while an act runs; an act that changes what waits restores the question.
NOT FIXED (runtime gaps / pack, listed for the main session): Key has no keepFocus (Enter cannot repeat an act key); Escape/Hint do not end the party; classroom line timing; hi summary row pitch; the pack route skips the acts (its ask/win frames show empty boards); gu "છે." alone on line 2 and hi "है।" alone (cosmetic, left).
