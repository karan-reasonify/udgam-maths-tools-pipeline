STATUS: done. C21 Rows Times Squares stage 2 (polish, Gemini pass, hi/gu). Final full check 98 pass / 0 warn / 0 fail; ported to output-preview/indiannica_eng_maths5_ch8/M2.S2.T5.C21.2D1/.
1 POLISH (C21-polish.md):
- First ladder rungs are new moves: P2 "Look at the two side numbers on the picture.", P3 "Read the side number under the square.", P4 "Read the number on one cut part of the strip."
- P3 second rung: "Multiply the side number by the same number again."
- P2 Q2 miss is gentler: "Think of the card covered in rows of unit squares."
- P3 learn item: "Turn the board into a 15 cm square; what is its area in square centimetres?" ("Make this board a square" no longer appears three times.)
- P4 step 1: "Tap Split to cut the strip." Its hint became "One tap on Split cuts it in three.", because "...under the picture" was a near copy of step 3's hint.
- The L+B traceback edges are AMBER now.
- The nudge is said ONCE per lock: the first act that obeys it brings the question back, and later locked taps keep the question on the bubble.
- Quick check 32/0/0.
2 GEMINI PASS: ok on gemini-3.5-flash, syntax/text/pictures/mount all proved.
- "Words added: stroke fill" was a false alarm: it is the SVG attribute paintOrder="stroke fill" on the row numbers.
- Gemini's changes:
  - pill chips with a soft shadow;
  - rounded grid corners and a faint drop shadow under each grid;
  - a paper halo on the row numbers;
  - a plain cell behind each tile skin.
- I reverted Gemini's strokeOpacity 0.65 on the grid lines (2 places) so every box keeps a DARK outline (LAYOUT §3).
- Maths, gate, PHASES, MODEL and TR are untouched; the gate code is checked present.
- shots ask/wrong/start look right. Screens of more than 40 cells stay plain; tile skins only on 7x3, 6x4 and 4x4. The start page grid (9x5 = 45 cells) is plain.
3 LANGUAGE PASS: TR has 101 keys in hi and gu.
- It covers every PHASES line, the 12 win lines (item data, added by hand), the 5 nudge api.say lines (added by hand), OPENING/FREE_LINE/START_HOOK/FINISH_LINE, the key labels, and the tx words (squares, Boundary, "Breadth =", "one third of length", sq. cm, sq. m).
- Bubble lines spell out वर्ग सेंटीमीटर / ચોરસ સેન્ટિમીટર; drawn labels use वर्ग सेमी / ચોરસ સેમી.
- hi/gu lines avoid commas where the English closing had one, and every line is 80 characters or less.
- shots --lang hi and --lang gu (ask + wrong) fit: no overflow, and the rotated labels sit on their pills.
- tr-coverage passes.
- Nudge-once and the gate re-proved with real clicks in Hindi (P1): locked tap -> nudge; Rows -> question back; second locked tap -> question stays; full -> 45 wins; no console errors.
4 Full checks this message: 1 (98/0/0). No ENOSPC or timeouts.
Terms to confirm with a native speaker:
- hi: पंक्ति (row) and the key labels पंक्ति / भरो / वर्ग / काटो / रखो; तख्ता (board); टिकट (stamp); एक तिहाई; सीमा (Boundary); इकाई वर्ग; वर्ग मी / वर्ग सेमी.
- gu: હરોળ (row); key labels હરોળ / ભરો / ચોરસ / કાપો / મૂકો; પાટિયું (board); ટિકિટ (stamp, not ટપાલ ટિકિટ); એક તૃતીયાંશ; ઘેરાવો (way round the edge); ફરસ (floor); સીમા; ચોરસ મી / ચોરસ સેમી.
- Units in labels stay Latin (cm, m), as the runtime does.
