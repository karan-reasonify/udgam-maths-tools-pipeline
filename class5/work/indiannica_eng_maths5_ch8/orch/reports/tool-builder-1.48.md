STATUS: done. C21 Rows Times Squares final small fix round: the six listed items only. Quick 33/0/0; full check 98 pass / 0 warn / 0 fail, with motion-on rows (action-anim, phase-party, next-key) and reduced-motion renders; PORTED to output-preview/.../M2.S2.T5.C21.2D1/.
1 [FIXED] Dim key label.
- A disabled key or a key mid-act now draws its label in dim ink #7A736A. This covers the free-play Length-/Length+/Breadth-/Breadth+/Rows keys and the act key Rows/Fill/Square/Split/Drop while busy.
- Proved with real input (playkit, motion on): label fill rgb(122,115,106) on face rgb(249,243,233) = 4.24:1.
  - en/hi/gu free play: "Length −" / "Breadth −" / "Rows" (लंबाई − / चौड़ाई − / पंक्ति; લંબાઈ − / પહોળાઈ − / હરોળ).
  - Split mid-act in en/hi/gu (Split / काटो / કાપો).
- The other act keys share the same Key line.
2 [FIXED] Row chip.
- The chip is opaque paper with its outline: fillOpacity 0.96 removed on all chips, so no grid line shows through.
- Its height is capped at row - 8; the font steps down to fit, never under 28; the chip is skipped when a row cannot hold 28 type.
- hi sheet: पंक्ति sits inside the 16x7 garden row and the 9x5 row.
3 [FIXED] hi unit space.
- The unit's words are tspans with a real gap (0.34 em hi/gu, 0.26 em en), so "वर्ग सेमी" / "वर्ग मी" read as two words (hi wrong sheet, P2/P3/P4). The TR key "sq. cm"/"sq. m" is unchanged.
- Summary thumbnails now end 12 or more from the pill edge.
4 [PARTLY] Free-play grid.
- The grid room is now y 66 to 444 (was 70 to 424): 8x5 grid at cell 75.6 = 605x378 (was 570x355).
- The cap was not the limit: height is. The line above (ends y 54) and the length pill below (ends y 508) both keep 12 or more clear, so cell 85 (425 tall) cannot fit without moving the line or the pill into the grid.
5 [FIXED] Pill clearances.
- The Boundary pill width is now text x 0.68 em + 2 x padding in en (0.62 hi/gu), so the "y" tail stays inside.
- The rotated side-length pill moves out by half its height + 13, so the hi/gu "15 cm"/"20 cm"/"4 cm" pills are 13 clear of the grid outline (en unchanged at 38).
6 [FIXED] Nudge flag on gotoStep. The nudge flag is valid only for its own question entry (qk or "-"+qk), and the nudge-chain memory resets on every question change, so gotoStep q2 -> q3 shows the nudge on the first digit.
KEEP respected: the nudge chain, act-less win pictures, the traceback after a wrong typed answer, the 2187 line, the first-touch gate: untouched.
Files: only tool.tsx (ported pair by check).
Deleted by exact name: play-p118-a4-free-en.png, and my own probe frames play-f1-free-{en,hi,gu}.png.
