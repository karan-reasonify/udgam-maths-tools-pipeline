STATUS: ok (review-round fixes applied; full check 98/0/0, ported)
SLOTS: M2.S3.T7.C31.2D1
FILES: class5/work/indiannica_eng_maths5_ch8/M2.S3.T7.C31.2D1/tool.tsx
CHECKS: quick 33/0/0; full 98 pass 0 warn 0 fail 4 info (1 run), tr-coverage PASS, ported
FAILURES: none
DECISIONS: tally card 360 wide (340 clipped "More than half" plus its value); hand cells stay 55, so letters clear the cut line by only about 4 px there
RISKS: hi/gu glyph clearances at 55-unit hand cells; free play not re-shot (layout constants only)
ESCALATE: none
MUST-FIX (real input, playkit):
- P2 warm-up: only the step's own square counts. Sliver at step 1: hint shown, nothing marked, no advance. Big square at step 2: hint, no flip. Other sliver at step 3: hint. FIXED.
- P2 Q1/Q3: the win completes the true working. All 12 edges tapped M, then 7 typed: the board ends with 7 M + 5 L, each wrong mark ringed amber, and the tally reads 7/5. FIXED. The same completion runs for every mode (numbers, pairs) when a right answer is typed without the act.
- P3: a tapped half tints only its inside half (clipped to the outline); its letter sits at the centre of that half, clear of the cut. The correction lights only inside halves; the fold shows at step 1 only (no leftover amber cell). FIXED.
- gu L badge: letter chips are 46 wide in gu (40 en/hi), in the legend and in the correction badges. FIXED.
SHOULD-FIX / DECISIONS:
- Step pictures are drawn on the question's grid size and place (P1 5x3 in 9x6, P2 in 7x3, P3 in 6x4). FIXED.
- Tally card centred between the paper and the open pad. FIXED, at 360 not 300: 300 and 340 both clipped "More than half" plus its value.
- Rule 3: counted tiles are now #9C8BF2 violet at 0.82 over the floor tile and photo, and part squares are rose. M badge in the correction uses the rose chip. FIXED.
- Letters: M and H sit inside the part they name, L in the outside part; paper halo 8. FIXED.
- Wrong tap on an edge square: deeper orange outside the line plus a dark edge, inside left on the photo. FIXED.
- Summary thumbnails: each phase's own shape with its coloured squares and the answer. FIXED.
- Free play: tally uses an H row (Half) instead of Half pairs; centred layout. The arch icon stays only where pairs are counted. FIXED.
- Hand photo mirrored so its thumb is on the traced thumb's side. FIXED.
- P3 halves stay unmarked until tapped. The miss now says "Join the halves two at a time, then count the joins."; the Half row wears a half-square icon instead of the H letter. FIXED. TR updated.
- P3 step 1 now says "cut straight across, side to side". FIXED. TR updated.
- P4 sum and "estimate" raised to 32. FIXED.
- hi "वर्ग सेमी" now has an en space. FIXED.
- PT3 double tap: a 2nd tap on the same square or Pair within 400 ms is ignored. The warm-up Pair double tap no longer reaches Q1 (proved). FIXED.
- PT4 squares and Pair work again once the traceback ends; a tap clears the correction layer (P1 and P3 proved). FIXED.
- PT5 a light wash dims the squares while the pencil or hand acts. FIXED.
- PT7 Pair is off during the teach lines (proved: no pair, Q1 opens on its question). FIXED.
- PT8 the slot is emptied when the gate shuts (proved: a typed 3 is cleared at the first Pair). FIXED.
- Rule 7: a hardware Enter while shut re-says the nudge; the nudge waits until the first act ends. Touch comes only from real taps. FIXED.
- The squares stop taking taps after the win. FIXED.
- Also fixed: the dangling Thumb shadow filter, which my stage-2 report claimed was removed and was not.
NOT FIXED: focus to BODY, hi summary rows, hi/gu chrome (runtime, as told); gu "છે." alone on line 2 (cosmetic, no shorter TR); first-touch gate (rule 6, kept).
