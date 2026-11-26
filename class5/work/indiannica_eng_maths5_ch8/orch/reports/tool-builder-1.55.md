STATUS: done · SLOTS: M3.S4.T9.C41.2D1 · CHECKS: quick 33/0/0; full 99 PASS / 0 WARN / 0 FAIL (1 run), ported; host emulator plays all 4 phases
Only the 8 items in C41-final-fixes.md were changed. KEEP list untouched (sync lock + hold(), markReal, the nudges, upward-only drag, Enter guard, AI mode, ring/labels/violet).
1 FIXED: press() ignores a second press within 300 ms (pressAt) on every act key, the handle drag included. Real input, reduced motion, en/hi/gu, mouse AND finger, true 45 ms doubleTap:
   - P3 warm-up bead -> guideStep 1 (was 2).
   - P2 Q2 handle -> layers 1, key still off.
   - P3 Q2 bead -> one run, key still off.
2 FIXED:
   - P1 closing reworded with no sign: "One layer holds length times breadth cubes, and the layers multiply that count." (TR keys hi/gu moved).
   - Height handle 15 px further right in phases 1-2. Free play keeps 46 px so it stays clear of the Longer/Wider keys.
   NOT raised: the P1 result rows stay 40 px. They are height-bound: two rows at 1.45 em under the solid's labels inside 520; 56 px would need an 81 px pitch.
3 FIXED:
   - gu P2 Q3 without "છે;".
   - The lit-layer label (Layer/परत/થર) is 40 px.
   - The bottom layer now stays lit 1.2 s before the layers climb. tl.run is [ms, fn] = fn, then wait, so the k=0 entry carries the 1200.
   Real input, motion ON, P2 miss: the label sits on the bottom layer from 62 ms to 1,219-1,241 ms in en/hi/gu, then layers 2/3/4 at about 0.65 s each.
4 FIXED: the P3 Q3 hi working rows are 6 px lower, and the Q3 correction cuboid turns violet like the cube.
5 FIXED:
   (a) Glass radius 64 -> 78; the word stays 32.
   (b) Count at y -12 and word at y +42, 54 apart (1.45 em + 8).
   (c) The larger glass gives hi "1.5 सेमी" room; the lens is kept at least 82 from the working area's left edge.
   (d) hi/gu summary thumbnails use one 28 px line ("नहीं: घनाभ", "110 घन मी"). Measured: line box y 14-53 in the 66 pill, ink x 93-235 inside 236.
   (e) Free play frame 420 tall (it has no first working row), so the base is drawn bigger; 8x6x5 still fits.
6 FIXED: P4 Q3 nudge is now "Use the Tenths lens on the box first." (hi "पहले डिब्बे पर दशांश लेंस लगाओ।", gu "પહેલા ખોખા પર દશાંશ લેન્સ વાપરો."; the old key is dropped). P3 Q3 miss is now "Read the three edge labels: 6 cm, 6 cm and 4 cm." (+hi/gu). P4 Q1/Q2 misses kept as decided.
7 FIXED: the Hint key (tap, or Enter/Space on it) over a nudge clears the nudge flag and says the question again. Real input, en/hi/gu: nudge -> Hint -> question -> Hint -> question; no console errors.
8: no keepFocus anywhere in the tool (no Hit keep). Disabled and mid-act keys keep the half-strength grey label. Native-read list unchanged.
Not done / for the main session: none. Reduced motion OFF was proved by my own playkit runs (items 3, 7 and the earlier gate matrix); check's real-input rows ran at its default.
