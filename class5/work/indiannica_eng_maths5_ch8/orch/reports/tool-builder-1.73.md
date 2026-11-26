STATUS: done, NOT uploaded. C21 one-tap fill (educator 2026-11-17, owner's "One tap fills all rows"). Quick 33/0/0; full 98 pass / 0 warn / 0 fail (motion-on rows and reduced renders; summary, free play and AI-agent rows included); PORTED.
Phase 1 (guide + Q1-Q3): the key is now "Stack rows" (hi पंक्तियाँ लगाओ, gu હરોળ ગોઠવો; widened to 284, right edge kept). ONE tap stacks every row in one sweep (ms = 250/row, 0.7-1.3 s; the runtime tempo plays it about 1.5x, measured ~1.5 s for 5 rows and ~2 s for 8). Row numbers appear as each row lands. Both side labels stay on throughout and the pad opens when the sweep ENDS.
Gate: lock(touched && (!done || busy)), so the Answer key stays locked until the act has finished, not when the last row lands. Phases 2-4 and free play (one row a tap, "Rows") unchanged.
Text (hi/gu TR for each): the 2 guide steps became 1 step, "Tap Stack rows to fill the rectangle with rows of squares." (hint "One tap on Stack rows fills every row."); nudge "Tap Stack rows first."; ladder rung 1 "Find the squares in one row and the number of rows."; MODEL.answerGate updated. The 6 stale TR keys were removed. Asks, misses and win lines are unchanged.
Real input (playkit) = Q1-Q3 + guide in en motion mouse, en reduced finger, hi motion keyboard-only, gu reduced mouse, hi reduced finger:
- Answer live while the sweep plays: 0 of 94-163 samples every 12 ms (motion runs). In reduced motion the act ends at once.
- The pad is live after the act, and typed answer + Enter wins all 12 runs (3 questions x 4 runs; Enter via the pad or the keyboard).
- A digit + Enter before the tap shows the nudge with tries 0.
- A double tap (40 ms apart) = one act.
Frames hi/gu Q2 6x4: labels and rows clear, no overlaps. Probe frames deleted by exact name. The play tester's play-G3/G4 are left in place.
