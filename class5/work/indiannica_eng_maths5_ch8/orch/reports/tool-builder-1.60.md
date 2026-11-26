STATUS: ok (last small fixes done; full check 98/0/0, ported)
SLOTS: M2.S3.T7.C31.2D1
FILES: class5/work/indiannica_eng_maths5_ch8/M2.S3.T7.C31.2D1/tool.tsx
CHECKS: quick 33/0/0; full 98 pass 0 warn 0 fail 4 info (1 run), ported. Gaps measured in playkit en/hi/gu, reduced motion ON: DOM ink box (bbox x, baseline-based y) to the traced path and to the board frame.
FAILURES: none
DECISIONS: letters and chips are now placed by box search (psSpot): the glyph or chip box in its own part, keeping 12 px off the frame first, then the farthest spot from the traced line. A letter whose part is too thin may use its square's clearer side.
RISKS: two stone half squares stay under 12 px in hi/gu (geometric limit: a 43% half in an 82-unit square); the P2 tip chip is 8-11 px in gu (leaf tip vs frame); the hand keeps its 55-unit limit
ESCALATE: none
1 Stone H: en clear (min 14.8). hi min 5.1 and gu min 7.3 / 11.5, all on the stone's right-hand 43% half square. The letter must stay inside the tinted half, which is too narrow (was hi 1.5, gu 4.2).
2 Hand thumb-side L letters: both are now 20+ px from the left frame in en/hi/gu (was ON the frame). They now lie on the thumb loop, which is drawn under their halo. Accepted: the item asked for the frame clearance first.
3 P2 (playkit): corner L chips 13-16 px from the outline, en/hi/gu. Tip chip: en 13 / 14.5 (line / frame), hi 10.2 / 13.5, gu 11.3 / 8.3: no box in the tip strip clears both lines in gu. Child's bare wrong letters (12 taps): en min 10.2, hi 15.4, gu 15.9 (was 4-11).
4 hi अनुमान: about 21 px above the tally card border (was 7-8). The sum row moved up 6, "estimate" up 8; the sum-to-estimate gap is unchanged.
5 Cup correction chips: min frame en 15.5, hi 15.5, gu 13.4; min line 15.4 or more (was 7 under the top frame).
Correction chips are 32 high (were 36). Nothing else changed. Deleted no PNGs.
