STATUS: final, NOT uploaded (full 99/0/0, ported)
SLOTS: M2.S2.T4.C16.2D1 | FILES: tool.tsx; output-preview pair
CHECKS: quick 33/0/0; full 99 pass 0 warn 0 fail (motion-ON rows + reduced motion), ported, host plays every phase
FEED1 (P1):
- The rope's label reads "Perimeter 16 cm" (hi परिमाप 16 सेमी, gu પરિમિતિ 16 સેમી), in vermilion, from the moment the string is laid, on every card.
- After a RIGHT answer, and in the guide once the warm-up card is covered: top "Perimeter: 5+3+5+3=16 cm", "5 cm" under the long side, "3 cm" beside the short one, bottom "Area: 5×3=15 sq. cm" (replaces "Area 15 sq. cm"); each card's own numbers.
- Nothing of it is drawn or in state before the answer. Built from existing TR words (no new keys); no spaces inside the sums (labels-short). Labels 12+ clear; card/rope sizes unchanged; the correction keeps its "Area N sq. cm".
FEED2 (P4 4.1-4.3):
- Count A / Count B light the squares ONE BY ONE (hand sweep), no number, no tally. The Answer pad opens after both, as before.
- Counts under the patches (and 20 / 48 in 4.3) appear only once answered (win, or the correction after a miss). getState patch_a/patch_b stay null until then; no hidden text or aria. The warm-up keeps its numbers.
- 4.3 still shows the converted dashed small squares after Same size (the act's result); only the counts are hidden.
PROOF (playkit, 7 runs: en mouse/finger/keyboard x motion ON/OFF, hi mouse ON, gu finger OFF; working-area DOM text scanned):
- P1 before the answer: "Perimeter 16 cm" only. After the right 15: the sum, 5 cm, 3 cm, the area line. The guide hold shows the 3x2 version.
- P4.1 open / after Count A / after Count B: "Patch A | Patch B" only, patch_a/b null; Answer off after A, live after B.
- After a wrong choice: 20 | 21 + "Patch B covers more". 4.2 right: 27 | 24 at the win. 4.3 after No: 20 | 48.
- Gate re-proved (mouse ON, keys OFF, finger ON): P1.3, P3.3 and P4.2 never win before the last act; after it the answer wins.
KEEP held: gate at the act's end, finished() boards, rope vs the Cover ring, Patch label clearance (labels unchanged), Hint re-says the question.
