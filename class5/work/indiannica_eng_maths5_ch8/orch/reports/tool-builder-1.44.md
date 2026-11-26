STATUS: final (99/0/0, ported; host emulator plays all 4 phases to finished, user + AI)
SLOTS: M3.S5.T11.C51.2D1
FILES: work/indiannica_eng_maths5_ch8/M3.S5.T11.C51.2D1/tool.tsx -> output-preview pair (sidecar keeps MODEL.answerGate)
CHECKS: quick 33/0/0; full 99/0/0 (one full check this round)
MUST-FIX
FIXED P2 Q2.2 gate re-lock: Turn latches turned:true (tmLeft reads it; actsNow sets it). REAL INPUT: Turn x3 panel shut then x3 more with the panel open: Answer and choice-no/yes stay live every time, no nudge.
FIXED start hi Water on the jar: pictures re-laid evenly 68 apart, every bottom at y 268, all four labels on ONE baseline 330 (en/hi/gu full-size start sheets: 27+ px clear, nothing touches a picture).
FIXED P1 hi Length tab matra: tabs 72 tall (was 62), text 10+ clear of the tab top.
FIXED P2 Long chip on the cubes / answer chip over the pillar: a chip row above the tray (Unit cube, Long N, the answer chip); the cuboid fits the tray's inner box under it.
SHOULD-FIX / DECISIONS
FIXED violet unit cubes on every face (tray, shelf, legend, start page; 0.85 violet over the wood skin). SAMPLED: plain faces (143,123,234) h251 s0.73, (106,85,214) h250 s0.61, (85,52,200) h253 s0.59; skinned warm-up 9,704 face px hue 249-261, 95.5% sat >= 0.4 (the rest are edge anti-aliasing).
FIXED clear glass jars, water clipped to the glass's inner shape, soft lighter top; objects drawn AFTER the water with a 0.14 veil, own colours kept. SAMPLED: lemon under water (218,203,68) h54 s0.67; marble (103,172,230); stone grey-brown speckled pebble (no longer the egg skin).
FIXED lit rise SOLID amber (0.9 + dark edge) in the correction; green again at the win. Greater volume label 38 below its jar (scene raised 40).
FIXED level lines inside the glass +2; jar (P4/calc/warm-ups) 250x420 (was 200x360); P2 tray 628x288 (was 447x305).
FIXED labels: Long N, Unit cube, Left over, Push stick, Floating, Fully under at 40; Same cuboid 32 on a pill; Push stick label 30+ above its ring.
FIXED Q3 ruler: every 2nd number at 40, ticks each cm, unit and caption 32; Given card 130 tall (hi 2 lines clear); Q3 chips 360 wide, one text each.
FIXED Q2.2 choice labels shortened to 'The same' / 'A new one' (fit one line; TR keys renamed).
FIXED Q3 left-over: beside the keys under its own 40-px label, rose-edged cubes, scaled up.
FIXED hi unit tiles: Hindi tile type one step smaller (28) so the units clear the tile edges.
FIXED (a) Q2.1/Q2.3 right answer with one shelved cuboid: the shelf fills with every cuboid, all green, and the answer chip shows at the win (real input: shelf 1, type 4 -> 4 green cuboids + '4 different cuboids').
FIXED (b) a hardware DIGIT while locked nudges (real: Q2.1 '4' -> 'Set a cuboid on the shelf first.').
FIXED (c) the act keys (Wide/High/Turn/Shelf, Mark level) dim while a hand or pencil act runs; no nudge during an act.
FIXED (d) new nudges + hi/gu: 'Put a card in a bin first.' (tile tap/drop with no binned card), 'Make the tray full: change Wide or High.' (dim Shelf), 'Put an object in a jar first.' (dim Mark level; real input proven).
FIXED (e) one gentle ring on the next act at questions: object to lower, then Mark level, the stick after the first mark (P4 q1/q2).
FIXED (f) hi 'डुबोओ' -> 'डुबा दो' (2 nudges + the learned line).
FIXED (g) choices: right first in 2 of 8 only (2.2, 4.3); Q1.2 now cm / cu. cm / sq. cm; Q4.2 now All / Only part.
FIXED rule 7: a right answer reached without the act completes the picture at the win (actsNow).
FIXED hi/gu orphans: the Q1.2 line and the gu start hook shortened.
NOT FIXED (kept, decisions): the first-touch gate; either-unit sort; code-drawn cards; heap of 18 not drawn (legend + left over only).
NOT MINE (runtime): party not ended by Escape/Hint/digit; focus drop; hi summary rows; gu orphan words.
OPEN: images.json 'jar' and 'stone' skins are no longer drawn (clear jar and grey-brown pebble asked for): only 'cube' is skinned.
