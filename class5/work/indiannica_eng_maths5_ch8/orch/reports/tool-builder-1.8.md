STATUS: done (checked, ported) · SLOTS: M3.S4.T9.C41.2D1 · CHECKS: 98/0/0
M3.S4.T9.C41.2D1 Layer Stacker (class 5 ch 8, r66 silent): BUILT. Full check 98 PASS / 0 WARN / 0 FAIL (3 full runs), ported; host emulator plays every phase.
Preview: class5/work/indiannica_eng_maths5_ch8/M3.S4.T9.C41.2D1/M3.S4.T9.C41.2D1.preview.html · pair in output-preview/.
Phases (isometric solid fitted to its full size in x 130-630, controls x 664-880, rows y 462/508; all inside the 900 open width, bigPad kept):
1 Layers of cubes: warm-up 4x3 base, steps Tap base (pencil writes 4 × 3 = 12) -> push Height handle (layer 2, pencil 2 × 12 = 24). Q 7x5x2=70, 7x2x2=28, 9x2x3=54: stack to the dashed height.
2 L x B x H: carton box, warm-up 5x3x2 (lift, lift, pencil 5 × 3 × 2 = 30 cu. cm). Q 264, 126, 110 cu. m: fill the box layer by layer to its lid.
3 Equal edges: wooden block, warm-up 3x3x3, three bead runs (length, breadth, height) -> Cube. Q 729 (9 cm), 1000 (10 m), 6x6x4 Yes/No = No.
4 Edge in tenths: carton box, warm-up 5x1.5x2 (Multiply -> lens reads 15 tenths -> Multiply writes 15 × 10 = 150 tenths = 15 cu. cm). Q 8x3.5x2=56, 6x2.5x4=60: Multiply (8 × 2 = 16) + lens (35 tenths); Q3 4x2.5x1.5 Yes/No = No.
Answer gate (user mode, after a real tap on a Work piece; HOOK.check does the acts at once, so AI/toolApi never gated), verified with playkit real clicks:
 P1 layers==h (grip, tap or drag up) · P2 layers==h (4/2/2 lifts) · P3 three bead runs (all 3 Qs) · P4 Q1-2 Multiply + lens · P4 Q3 lens over both tenths edges. No ungated question.
Giveaways: no running count before the answer; Cube/Cuboid label, Taught later card and products only at the traceback/win; P3 solids all drawn alike (same skin), P4 rows show 16 and 35 only, never 560/56.
Skins: cube = per-cube on base layers <=40 (P1, start page), one stretched block over every P3 solid; carton clipped per face (P2, P4). Upper P1 layers and big bases = tinted plain faces. Controls plain.
Departures from the writeup:
- Running count box dropped (keyOnly has no runs zone, and it would print the answer).
- No cu. cm / cu. m pad keys, no point key: answers are plain numbers; the say lines ask for the unit in words ("cubic centimetres"), the unit is drawn on the board rows.
- Units switch: shows the question's unit (plain, inert) in phase 2; live only in free play (a live switch in a question would contradict the ask).
- Height handle: a tap stacks one layer, a drag up stacks as many as it travels (both through api.act hand push).
- Cube/Cuboid label sits in the right column, not under the solid (rows live under it). No spin delight on Cube (skipped).
- Yes/No questions use choices in the keypad panel (no cardAnswer).
- Plan answers fixed (scaffold had 7/9/9/11/10/6/null); ladders rewritten (plan meta text), each item its own miss and one-sentence win line; long says shortened for one-page.
- Free play: base Longer / Wider keys (2-8 x 2-6), handle cycles 1-5, Units switch live, live L × B × H = V row.
Runtime notes (not edited): getState() exposes no `locked` (read the Answer key's aria-disabled); after api.lock(false) at the end of an act the runtime opens the keypad panel by itself (gate release looks like a traceback return) - harmless here, worth a look.
TR empty (language pass later); thumbs use digits/signs only so hi/gu pass.
Question: is drawing P3 Q3 (6x6x4) with the same stretched wooden-cube skin as the true cubes acceptable, or should every P3 solid be plain tinted faces?
