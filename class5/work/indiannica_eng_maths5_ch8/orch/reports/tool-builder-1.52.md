STATUS: done. C26 final fix round (13 items) applied; full check 98 pass / 0 warn / 0 fail; ported. 2 full runs: the first failed zones on hi-idle3 [phone], where the warm-up L's left label "4 मी" ran 3 units out of the work area. Fixed by moving the L 12 right.
1 MUST card value: the value line is now centred (textAnchor middle). The unit drops to 36 when value + unit would leave less than 12 each side of the card.
  - Proved in playkit (left / right margin): en 17/17 (256 sq. cm), 25/25 (152 sq. cm); hi 44/44, 49/49; gu 26/25, 32/32.
2+11 MUST part pill always drawn. Each part gets one of: a one-line pill inside (32, else 28); a two-line pill inside (number 32 over unit 28); or, for a thin strip, a pill over the empty tread, lifted 12. The `!apart || fits` condition is gone.
  - Proved in playkit: free play after Cut down shows "36 sq. m" in en; hi and gu show "36" over "वर्ग मी" / "ચોરસ મી" (screenshots checked).
  - Proved in playkit: P4 Q3 wrong 112 while the parts are apart shows "18 sq. m" / "18 वर्ग मी" / "18 ચોરસ મી" over the tread notch.
3 violet saturation: plain counted cells now tint 0.26 (was 0.42); the tile/copies overlay is now 0.84 (was 0.72); same hue #6A4FC4. I did not sample pixels.
4 square size: cell = min(385/A, room/(A+1)). Outlines: q1 384, q3 375, q2 344 (was 288), guide step 366.
  - q2 stops short of 385 so one spill row still fits in the room.
5 gu result line: Gujarati is measured narrower (0.47 em), so "= 256 ચોરસ સેમી" stays on the result line.
  - hi/gu: 4 px word spacing on every drawn label and on the card unit, so "वर्ग मी" no longer reads as one word.
  - P4 win: the bubble turns nbsp into a plain space (PATTERNS 18), so I shortened the hi/gu line instead: "हाँ, कुल 108 वर्ग मी।" / "હા, કુલ 108 ચોરસ મી.". It now fits on one line.
6 fold column: moved 20 right (card and Fold/Fill at x 662, width 230). The equation block starts 16 lower (306 / 352 / 404).
7 P3 grid: now 30-px cells (19 columns = 570 px). The spare row is now 1 instead of 2: the card/dial row above the grid caps its height, so 34 px does not fit.
  - The breadth label is 6 further from the green line (at least 12 clear).
8 L labels: the riser label always stays at mid-height. When it would crowd the tread label, the tread label moves past the corner, right of the figure.
  - Q3's "18" pill sits over the tread (see 2); the sum under the Cut down key is 16 lower.
9 sizes: the rope square is 372 (was 360) and the L moved 12 right. The fixed 900-wide layout (one size and place with the pad shut or open) does not allow more; the copies tiles stay 156.
10 warm-up hints, proved by real clicks in en/hi/gu (tapping the disabled Answer key, then reading the hint), with new hi/gu TR and the old keys removed:
  - "Tap the Fold key beside the square."
  - "Fill is the key beside the square, where Fold was."
  - "Cut across is the first key beside the floor."
  - "Join is the key beside the floor."
  - Other place words checked against the layout: "on the right of the number" and "beside the dial" are correct.
12 P1 wrong 128: the correction hides the sum while it draws a clamped side (18).
13 Q3 says "patch" everywhere, each with TR:
  - nudge: "Cut the patch first."
  - correction label: "Not patch"
  - miss: "Part of the big rectangle is not part of the patch."
keepFocus pattern: the tool moves no focus itself (the runtime's Key/usePress does), so there was nothing to fix.
Motion: one full check covers both. action-anim and phase-party run motion ON; the render rows run reduced motion. check has no separate switch.
Not done: nothing. Only my own play-c26f-*.png were deleted, by exact name.
