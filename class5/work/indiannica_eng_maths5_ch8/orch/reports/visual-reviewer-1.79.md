STATUS: fixes-needed
SLOTS: M3.S4.T9.C41.2D1 (phase 2, changed chunk 2, re-look)
REPORT:
M3.S4.T9.C41.2D1 Layer Stacker, phase 2, RE-LOOK of visual-reviewer-1.32 (21 changed frames, en/hi/gu, full size). Verdict: ISSUES (0 must-fix, 2 should-fix low, 2 questions).
Frames: all 21 chunk-2 pack frames (p2 step1, stepwrong, ask-shut, ask-open, wrong, win, end x en/hi/gu) + real-input playkit frames (untouched Q1 sampled 0.3/1.5/5 s, tap1 mid/rest, gated Answer + typed 264, full stack, miss traceback every 60-100 ms and at 0.4-5.9 s in en/hi/gu, Q2 en, Q3 en/hi/gu, Hint key). Pixels sampled with PIL; label sizes from the SVG CTM.
fixed (vs 1.32):
1 gate release: FIXED. Q1 real mouse AND finger, motion ON, en/hi/gu: tap 1 locks, still locked at rest with 1, 2 and 3 layers (Answer aria-disabled, key flat and dim, no ring); Answer click shows "Stack the layers up to the top of the box first." / hi / gu nudge; typed 264 + Enter at 1/4 stays typed "" tries 0 score 0; layer 4 makes the key live; 264 wins (score 5). Keyboard-only through the handle: same hold. Double tap = 1 layer; drag down/sideways = 0.
2 labels: FIXED. Edge labels and units read-out measure 40 px in en/hi/gu; 29-42 px clear of the box edges and the handle ring (11 cm/6 cm under the box, hi/gu still one line). PARTLY on the box size: not enlarged, box + labels is about 32% of the canvas and the right half is empty with the pad shut (builder: height-bound; accepted unless the owner wants it bigger).
3 violet: FIXED. Sampled hue 250, sat 0.4-0.6 on every face of the full stack (p2-wrong/win/end, real 4-layer frame) and the first layer; all 4 layers one colour; no grey/mauve.
4 two invites: FIXED. Handle ring is a pale pulse at 0.3 s (max r-g 56), gone at 1.5 s and 5 s; the Answer key is the only invite at rest; ring hidden with the pad open; guide steps keep the runtime ring.
5 working line: FIXED. "11 × 6 = 66" / "11 × 6 × 4 = 264 cu. cm" evenly spaced in en/hi/gu; p2-end hi/gu line 2 now starts with the word (लंबाई× / લંબાઈ×), no hanging sign.
6 hi question: FIXED. p2-ask-shut/open-hi is 2 lines, "हैं?" no longer alone.
7 units chip: FIXED. Plain 40 px label, no border/shadow, not in the controls list.
8 (question: thin strip of cubes under the carton): unchanged, still reads as a cutaway base layer; fine.
should-fix (low):
- Q3 gu (extra frame, question at 11 m x 5 m x 2 m): "ખોખું 11 મી લાંબું, 5 મી પહોળું, 2 મી ઊંચું છે; ઘનફળ ઘન મીટરમાં શોધો." wraps to 3 lines, "શોધો." alone on line 3, text 15-20 px from the bubble's top and bottom (nothing clipped). Same shape as finding 6: drop "છે;" so it takes 2 lines. hi Q3 and en are fine.
- miss traceback, all langs: the amber lit-layer label "Layer" / "परत" / "થર" is 32 px (fill 173,119,0) on a screen where edge labels are 40 and half the canvas is empty; gu "થર" reads small. Scale it to 40 (it stays clear of the handle line at x 758 vs 720).
question:
- miss traceback: bubble says "Look at the bottom layer" but the lit layer is the bottom one only for the first ~0.3 s, then climbs to layer 2 (0.4 s), 3 (1.0 s) and 4. Intended walk? If so consider holding the bottom layer lit about 1.2 s before climbing (not in the pack: its p2-wrong shows only the final state).
- Q2/Q3 asks: only the Q1 ask is in the pack; Q2 (9x7x2) and Q3 (11x5x2 m) draw the same way and are clean in en/hi/gu except the gu Q3 bubble above.
clean: p2-step1/stepwrong en/hi/gu (Answer flat, hint alone, 1-2 lines), ask-open (Close, slot, berry Enter), wrong/win/end layouts, Next / Next phase fit their key in all 3 languages, header, Kiko thinking at the asks, no English left in hi/gu, no giveaway before the answer (only after a miss, by design). Party frames not in P2's chunk. Kept per rule 6: first-touch gate (typed wrong answer on an untouched Q1 is accepted as a miss and draws all 4 layers), emptied slot after a miss, focus to BODY after Enter.
