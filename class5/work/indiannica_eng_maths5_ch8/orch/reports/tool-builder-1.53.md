STATUS: final (99/0/0, ported; host emulator plays all 4 phases to finished, user + AI)
SLOTS: M3.S5.T11.C51.2D1
FILES: work/indiannica_eng_maths5_ch8/M3.S5.T11.C51.2D1/tool.tsx -> output-preview pair
CHECKS: quick 33/0/0; full 99/0/0 (its reduced-motion rows and its motion-on rows: board-panel, action-anim, phase-party, miss-clears-slot); one full run
ITEMS (C51-final-fixes.md, all 17; nothing else changed)
1 FIXED hi box card label: the box picture sits 6 higher in its card (lit cubes too).
2 FIXED Wide/High keys 136 wide (tray 600, keys moved 28 left), hi/gu key text 28. REAL INPUT clear each side: en Wide 17 / High 20; hi 22 / 23; gu 'પહોળાઈ 1' 13 / 'ઊંચાઈ 1' 23.
3 FIXED Q2 correction pill 254x52, lifted: REAL INPUT Q2.2 wrong 'Yes': text clear L/R en 19/19, hi 42/42, gu 36/35; piece top 16 below the pill in all three.
4 FIXED tick labels: digits 1 and 2, then '3 cm/सेमी/સેમી' once at the top. REAL INPUT Q3.3 miss '3': no matra line stacked; label ends 13 (hi), 27 (en), 26 (gu) before the Given card.
5 FIXED key on the mat drawn at 0.82 inside a 160-wide ring box (bow 14 clear); the ring is drawn UNDER the picture; free play puts the key first so its box stays inside.
6 FIXED answer chip grows to its text (>= 24 clear), hi/gu chip type 40; hi/gu 'Long N' one step smaller (32) and lower in its pill; 'Left over' 20+ under the key row; left-over cubes b 12.
7 FIXED gu 'Greater volume', the Given caption and Mark level at 44; the winning object gets a green outline. Long/Wide/High after Turn kept (owner call).
8 FIXED gu 2.1 win shortened ('...લંબઘન બને.'), no orphan.
9 FIXED warm-up hints: 'Shelf is on the right of Turn.', 'Wide is the top left key.', 'The Shelf key sits next to Turn.', 'Turn is the bottom left key.', 'Shelf is the bottom right key.' + hi/gu.
10 FIXED 3.3 miss 'Read how far the water rose on the ruler, then use the whole base.'; 3.2 miss 'Read how far each jar's water climbed, not how heavy each one feels.' + hi/gu.
11 FIXED 3.2 lemon first (objs and choices: lemon jar on the left), 4.1 'Push it under first' first; 2.2 and 4.3 unchanged. Gate, nudges, mats, actsNow and the answer ids follow the order (no change needed: ids unchanged).
12 FIXED 1.3 win 'Yes, grass is an area.'; 3.2 win 'Yes, the lemon's jar rose more.'; 4.2 say 'Why push a floating ball under before reading?' + hi/gu; old keys dropped.
13 FIXED 1.1 correction keeps the child's own unit where it was the right kind, else m / sq. m / cu. m.
14 FIXED 4.1 nudge 'Use the Push stick first.' + hi/gu.
15 FIXED Mark and Push take the same 400 ms guard as the other keys. REAL INPUT reduced motion, Q3.1 key+stone lowered: doubleTap 45 ms mouse -> marks [1,0] (one act) in en/hi/gu; a second double tap later marks jar 2 (also one act).
16 FIXED a Hint-key press while a nudge shows gives the QUESTION back. REAL INPUT Q2.1: dim Answer -> 'Set a cuboid on the shelf first.' -> bulb -> 'How many different cuboids can you make with 18 unit cubes?' (hi, gu the same).
17 FIXED getState().shelf at a count question's win lists every cuboid (agrees with the picture). The 4.2 hand/label overlap and the live Mark key in 4.2 left as decided.
ALSO: keepFocus: the tool keeps no focus of its own after an act (no such pattern). Dim key labels use #6B5E50 on the flat key (readable).
KEPT: start page and Space label, Q2.2 latch, clear jars, objects after water, solid amber rise, green win, rings, answer dim until the second mark, violet cubes.
RUNTIME GAPS: none. No runtime or lib edits.
