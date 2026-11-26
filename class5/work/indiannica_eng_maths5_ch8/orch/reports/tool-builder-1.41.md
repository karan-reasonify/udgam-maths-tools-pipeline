STATUS: done. C36 review-round fixes applied; full check 98/0/0 (1 of 6), ported; stage final.
SLOTS: M3.S4.T8.C36.2D1 · FILES: work/indiannica_eng_maths5_ch8/M3.S4.T8.C36.2D1/tool.tsx
MUST-FIX, visual:
(a) Violet: FIXED. Each face now gets its own overlay at 0.85 over the beech skin (left = violet, right = a 0.12 shade, top = a 0.15 tint), so the wood no longer shows through. The open boxes' front walls are now a 0.1 kraft wash with no carton skin; the back walls keep it. Pixel hues sampled from real shots (HSV saturation):
- P3 counted cubes: left 258/0.53, right 260/0.52.
- P4 resting stack: left 258/0.53, right 260/0.52, top 261/0.42.
- P1 pencil box (seen through its wall): left 262/0.47, right 264/0.46, top 261/0.42 (was 331-344).
- Answer green: 156-157/0.50-0.61 (was khaki).
- The legend icon and the shelf cubes use the same method.
(b) P2: FIXED. The cube is 150 high, labelled "1 m" on three edges. The third label is now on the right silhouette edge, outside it by 18. The "1 cu. m" chip now ends at stage x 950 (drawer at 980; measured in hi, text at 764-901).
(c) P4: FIXED. The running-count pill is sized to its text ("22 unit cubes" fits). The layer row moved down 30 and the chips sit lower, so the "11" chips clear the legend card (~20) and the pill (hand-checked Q3 in en and hi).
SHOULD-FIX:
- Legend card: icon 14-16 inside the card, text centred, hi second line +4. Fixed.
- P3 warm-up solid: drawn at Q1's cube size. Fixed.
- P3 single row: about 1.4x (cell cap 56 -> 80). Fixed.
- P3 colours: a row being counted is amber, counted rows violet, not-yet-counted cubes plain beech. P4 laid-out layers are violet; only a layer lit by the correction is amber. Fixed.
- Row counts are now 40 on the end cube.
- P1 amber frame: starts at y 80 or lower, clear of the headings; "Greater volume" starts to the right of the frame. Fixed.
- P2 grain: now a neutral white crystal, about 2x bigger. The 1 mm cube settles right beside the ring, from a tap and in the correction. Fixed.
- P2 unit chip: moved to the card's bottom-left, 190 wide, clear of the classroom window. Fixed.
- hi shelf labels: moved down 8. "Not drawn to size." moved above the shelf.
- P2 Q2 unit-cube picture: 1.15x. Fixed.
- Thumbnails: each is a cube inside its box plus a number or unit word ("24 cubes", "cu. mm", "36 cu. cm"), all through tx. Fixed.
PLAY TESTER (re-proved with real playkit input, reduced motion ON and OFF):
(1) Double tap: one press per 300 ms on every key and piece. A double tap now gives 1 Fill, 1 warm-up step, 1 lift. Fixed.
(2) Gate: touch() locks at once when the act is still needed. After one Fill, one row (Q3.1 reached by gotoStep) or one lift, the key stays locked until every act is done. Fixed.
(3) Both boxes full, nothing picked, Enter: says "Tap the box that takes up more space." ("solid" on Q1.2); the question returns on a pick. TR added. Fixed.
(4) Q4.1 miss is now "Add up the cubes of all 4 layers.", and P4 ladder[1] is "Multiply the cubes in one layer by the number of layers." TR keys updated. Fixed.
Also re-proved:
- A keyboard-only warm-up (Enter) leaves Q4.1 locked.
- A wrong answer typed before the act gives the correction, then live keys, a lift, then 24 wins.
- A nudge never shows while an act runs.
NOT FIXED:
- P4 resting stack 2x2 or scaled up: four layers must stand side by side at the 900 open width so nothing moves when the keypad opens. A 2x2 arrangement would make cubes smaller (height-bound, ~38).
- P2 Enter is a live berry key before a cube is placed: this is the pad:"enter" design. It never costs a try and says the nudge.
- Runtime items: Escape/Enter/Hint not ending the party, focus loss, summary rows, the emptied slot.
- The empty "1 m" label left on the shelf after its cube moves (a question, kept as a "moved" cue).
