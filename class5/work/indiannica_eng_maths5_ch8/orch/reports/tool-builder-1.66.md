STATUS: final (full 99/0/0, ported)
SLOTS: M2.S2.T4.C16.2D1 | FILES: tool.tsx (one line: phase 4 Patch label offset); output-preview pair
CHECKS: quick 33/0/0; full 99 pass 0 warn 0 fail (its motion-ON rows + reduced motion), ported, host plays every phase
FIX: Patch A/B labels stand above the grid at en 16 / hi 29 / gu 26 in 4.1, 4.2 and the warm-up (were 16 everywhere), and in 4.3 at en 26 / hi 30 / gu 26 (hi was 26).
MEASURED (playkit real flow; pixels from the grid's top line to the label's lowest ink; Patch B / Patch A):
- en: warm-up 14/68, 4.1 14/36, 4.2 14/39, 4.3 win 24/68
- hi: warm-up 15/69, 4.1 15/37, 4.2 15/40, 4.3 win 16/60 (were 1 and 11)
- gu: warm-up 15/69, 4.1 15/37, 4.2 15/40, 4.3 win 15/59 (were 5)
Nothing else changed.
