STATUS: ok
SLOTS: M1.S1.T3.C11.2D1
CHECKS: quick 33/0/0; full 97 pass 1 warn 0 fail (C4_CHROME_POOL=1, motion on+reduced), ported; NOT uploaded
FAILURES: none. WARN miss-shows-answer is the owner's decision (1): after a miss the working stays hidden, so the answer is not drawn.
DONE (C6-C11-working-on-demand + formula addendum), real questions only; the guide steps keep the whole working:
- Acts only light the figure and draw no working. Before the answer the card shows only what the question gives (P3 "Perimeter 36 cm", P4-Q2 "1 lap = 45 m") and is not drawn when empty. The figure keeps its size and place.
- Right answer: formula + substitution + result in green. Wrong answer: bubble hint only, the traceback is off, the pad returns, a retype wins. Hint key, first press: formula + substitution, no total (presses 2-3 still none).
- getState: adds working_shown (bool); no total or substitution in it before shown.
- Formula style (all phases):
  - P1: "Perimeter of a square = 4 × side" / "= 4 × 19 cm" / "= 76 cm"
  - P2: "Perimeter = sum of the sides" / "= 13 + 15 + 17" (Q3: "= 1 m + 80 cm + 65 cm", "= 100 + 80 + 65") / "= 45 cm"
  - P3: "Perimeter = 2 × (length + breadth)" / "36 = 2 × (length + 7)" / "length = 36 ÷ 2 − 7" / "= 18 − 7" / "= 11 cm"
  - P4: "Distance = 4 × side × laps" / "= 4 × 34 tenths × 5" / "= 680 tenths" / "= 68 m"; Q2: "Distance = 1 lap × laps" / "= 45 m × 3" / "= 135 m"
  - A long formula wraps at "=". The rows shrink together to stay inside the card.
- NEW TR words (hi/gu, native read owed): Perimeter of a square (वर्ग का परिमाप / ચોરસની પરિમિતિ), side (भुजा / બાજુ), sum of the sides (भुजाओं का जोड़ / બાજુઓનો સરવાળો), length (लंबाई / લંબાઈ), breadth (चौड़ाई / પહોળાઈ), Distance (दूरी / અંતર), laps (चक्कर / ચક્કર).
- PROOF, real input (28 + 16 playkit sessions):
  - every phase Q1-Q3: mouse/finger/keys en, finger hi/gu, motion on keys en + mouse gu/en;
  - after the acts: no working text, total hidden, getState clean;
  - hint 1: steps, no total; hint 3: no total;
  - wrong: no working, hint in the bubble;
  - right: working + total; keyboard Enter answers after an act;
  - guide steps (motion on): full formula working.
- Kept: the gate and nudges, the focus refocus, the tenths-slip rung, the P2 Q3 strip fit, free play (unchanged), AI mode.
