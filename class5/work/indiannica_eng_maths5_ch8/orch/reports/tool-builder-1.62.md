STATUS: done · SLOTS: M3.S4.T9.C41.2D1 · CHECKS: quick 33/0/0, full 99 PASS / 0 WARN / 0 FAIL (1 run), ported; host emulator plays all 4 phases
Only the 4 items were changed; the KEEP list is untouched. Gaps below were measured with real input via playkit, from the DOM bounding boxes, in en/hi/gu.
1 FIXED: the lit-layer label now starts at handle offset + 45, about 15 past the ring. P2 Q1 miss, motion ON, sampled every 50 ms through the whole traceback: closest label-to-ring gap is 17 (en), 16 (hi), 17 (gu) px; it was 2.2 / 1.0 / 1.4. P3 keeps its own place, since it has no handle.
2 FIXED: the lens sits 21 higher over its edge label (y - 35). The gap from the glass box to the working line under it is now 15.5 px in all three (P4 Q1 after a 560 miss). The glass, the word "tenths" at 32 and the hi "1.5 सेमी" are unchanged.
3 FIXED: the free-play frame is 20 to the left. At 8x6x5 the dimmed handle ring is now 22.8 px from the Longer key (it was 2); the solid is the same size.
4 FIXED: in hi/gu the thumbnail picture is narrower (44 wide; en keeps 72), so the one line is centred in more room. Right padding: hi "नहीं: बाद में" 15, gu "ના: પછી" 44, en 36-52.
Accepted as before: the P1 result lines stay at 40 px; that layout is height-bound.
