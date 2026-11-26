STATUS: fixes-needed (4 should-fix, 3 of them regressions from this round's own enlargements; 0 must-fix)
SLOT: M3.S4.T9.C41.2D1 Layer Stacker, FINAL VERIFY of orch/pending/C41-final-fixes.md items 2-6 (item 1/7 are play items, not judged)
Looked at: pack frames p1-step1/stepwrong/ask-open/end/party, p2-wrong/end/step1, p3-choice-wrong/end, p4-wrong/end/summary/free (en/hi/gu, 22:19 pack, full size) + real-input playkit frames (motion ON): P2 Q1 miss traceback sampled every 30-50 ms en/hi/gu, P3 Q1 miss traceback, P2 Q3 gu ask, P4 Q3 nudge en/hi/gu, free play at 8x6x5 en/hi/gu. No console errors. My play-vr189-* files deleted.
(2) P1 bubble: FIXED p1-end-en/p1-party-en read "One layer holds length times / breadth cubes, and the layers / multiply that count." (no sign at a line end; hi/gu tight forms still fine).
(2) handle gap: FIXED p1-step1/stepwrong en/hi/gu ring right vertex x657, handle disc x680-739 = 23 px (was 10).
(2) P1 result lines: NOT FIXED (declared height-bound): "9 x 2 = 18" / "3 x 18 = 54 cubes" digits 30 px tall (~42 px type), last line ends y615 of the 640 frame; accept or owner call.
(3) gu Q3 2 lines: FIXED (playkit P2 Q3 gu): "ખોખું 11 મી લાંબું, 5 મી પહોળું," / "2 મી ઊંચું; ઘનફળ ઘન મીટરમાં શોધો." (cap on 2 lines).
(3) Layer label 40: FIXED en/hi/gu, P2 and P3 (DOM CTM px = 40.0, amber 173,119,0).
(3) bottom layer held: FIXED P2 Q1 label on the bottom layer 0.96 s -> 2.15 s = 1.19 s, then layers 2/3/4 at +0.65 s each (en/hi/gu same); P3 Q1 bottom 0.93 -> 2.16 s = 1.23 s, then 0.33 s per layer.
(4) hi working line: FIXED p3-choice-wrong-hi/p3-end-hi bead ring bottom y~508, headline ink from y522 = 14 px (was 8; gu 14, en 26).
(4) Q3 cuboid violet: FIXED p3-choice-wrong/p3-end en/hi/gu top face hue 249 sat 0.54, side 249/0.34, same hue as the cube.
(5a) en "tenths" 32 px: FIXED p4-wrong/win-en, Q3 first reading: glass r78, word ~104 wide, ~20 px clear of the ring both ends.
(5b) hi "35"/"दशांश": FIXED p4-wrong/win-hi: "35" y478, word y530, ~25 px apart, no touch (gu same).
(5c) hi "1.5 सेमी": FIXED p4-end/party-hi text x109-227 in glass x92-243 = ~16-17 px each side (en 24, gu 22).
(5d) hi/gu summary: PARTLY. Crown/bindu clear of the pill top (one line, ink y334-365 in pill ~320-386; row 2 "110 घन मी" no longer tight). BUT see S4.
(5e) free play base: PARTLY. 4x3x1 base now ~302 x 225 (was ~270 x 200, ~+12%), still ~8% of the area; 8x6x5 still fits en/hi/gu (top y116, bottom y540, nothing clipped). But see S3.
(6) wording: FIXED. P4 Q3 nudge (touch lens once, press Answer) en "Use the Tenths lens on the / box first." hi "पहले डिब्बे पर दशांश लेंस / लगाओ।" gu "પહેલા ખોખા પર દશાંશ લેન્સ / વાપરો." (2 lines each); P3 Q3 miss en "Read the three edge labels: / 6 cm, 6 cm and 4 cm." 2 lines (hi/gu 2 lines).
NEW defects (all in the changed frames):
[S1 should-fix] P2 miss traceback, en/hi/gu: the amber lit-layer label (x758-871, now 40 px) runs into the Height handle ring (x706-765, moved +15 px): ink-to-ring distance 2.2 px (en) / 1.0 (hi) / 1.4 (gu) while the lit layer is layer 4, 10.6 / 7.8 / 15.6 px at layer 3 (Q1 11x6x4, y297 vs ring centre y282). Fix: start the label >= 25 px further right (x >= ~790) or draw it left-aligned from the ring's right edge + 12.
[S2 should-fix] p4-wrong/win en/hi/gu (and any Q with the correction line): the glass is bigger (r78) and its bottom ring now sits on the working line "...= 56 cu. cm / घन सेमी / ઘન સેમી": ring-to-text min distance en 12 px, hi 1 px (touching), gu 8 px. Fix: lift the lens ~15 px or shorten/lower the line so >= 12 px in hi.
[S3 should-fix] free play at 8x6 (max length/width, any height) en/hi/gu: the dimmed Height handle ring (x683-742) is 2 px from the Longer key (x744), was 26 px in 1.81; the bigger base pushed the handle right. Fix: >= 12 px between ring and key (move the keys right or clamp the handle).
[S4 should-fix] p4-summary-hi rows 3-4: the one-line "नहीं: घनाभ" / "नहीं: बाद में" end at x1523 / x1525 against the pill border x1525 (0-2 px right padding, the matra touches the edge); en 23-37 px, gu 16-32 px are fine. Fix: one step smaller for hi or trim the pill's left picture gap.
Unchanged since round: nothing skipped from the checklist; frames not re-looked: p1-again, hint-key, P2 ask-shut/win, P3 step/ask/win, P4 step/ask (no change in those items).
VERDICT: ISSUES (0 must-fix, 4 should-fix S1-S4; checklist items 2 bubble/gap, 3, 4, 5a-c, 6 FIXED; 2 result lines NOT FIXED (height-bound); 5d, 5e PARTLY)
