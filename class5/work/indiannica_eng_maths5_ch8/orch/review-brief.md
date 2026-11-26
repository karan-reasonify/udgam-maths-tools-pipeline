# Chapter 8 review brief (class 5, indiannica_eng_maths5_ch8, runtime r66 silent) — shared by visual reviewers and play testers
Report format: must-fix / should-fix / question, ONE line each, naming the frame file (or the probe steps), the language and what is wrong; at most 40 lines; "clean: <frames>" for what you judged fine. Report-only: never edit a tool or lib file. Temp images go in your session scratchpad and are deleted after.

## Visual standards (all three languages en/hi/gu; the LONGEST language binds)
- nothing clipped, overlapping, off its pill, or too small (labels 40+, digits 64+ where LAYOUT says so); text must fit its box in hi/gu
- a label or digit drawn over a SKIN (carton, wooden cube, tile, jar, leaf, hand, rope, path) needs clear contrast and must not be crossed by the picture's edge (owner feedback 2026-11-16: the C51 "Space" label sat on the cube's point)
- a picture must read as its object; a named solid/square must be drawn as that shape; a skin must not contradict a name on screen
- screens with more than 40 cells/skins are all plain (no half-skinned grid); every unit-square box has a dark outline; counted boxes deeper fill; the grid is the biggest square beside the OPEN keypad at one fixed size
- the Start/Enter/Answer keys wear the berry colours; Kiko and the bubble are never covered; nothing of the working area under the key's corner; no "Boundary"-style colour on something that is not the boundary
- hi/gu: flag a line obviously left in English or an obvious garble, but do NOT judge translation quality (a native speaker reviews later)
- summary thumbnails: a real picture per question (no blank box, no English words in hi/gu)
Docs: class5/docs/LAYOUT.md, docs/REVIEW_PACK.md. Frames: work/indiannica_eng_maths5_ch8/<slot>/pack/ (pack.json describes them; never rebuild the pack). Your frame list: `node ../orch.mjs chunks --class 5 --ch 8 --slot <slot> --mode full --chunk <k>` (from class5/).

## Tool notes
- C6 Edge Walker: marigold-bed photo is low contrast against the vermilion Boundary: it needs its dark outline and written label; ant skin; the "1 m = 100 cm" chip only after Write in cm; rectangles in P3/P4 are drawn with clamped proportions (not to scale: fine if the longer side is longer)
- C11 Square and Triangle: rope = one continuous twisted piece per side, no knots mid-side; earth-path strips round the pond (P4); ant; the Tenths lens; 3.4 m labels
- C16 Square Cover: rope one piece per side at 9:1; the 1 cm/1 m/1 km shelf squares plain and sized plausibly; tile skin only on <=40-cell screens; the edge-ring correction lights the inside block amber
- C21 Rows Times Squares: tile skin on grids of <=40 cells only; garden and ribbon skins; the L+B traceback edges are AMBER; labels under the picture; phase 3 items 2-3 open already square
- C31 Part Squares: leaf/hand skins and the lighter tile over the photo; M/H/L letters in the squares stay >=28 and legible in hi/gu; the hand outline reads as a mitten (judge); left-out squares warm white (not violet)
- C36 Cube Counter: the wooden beech cube is tinted blue-violet (#6A4FD0 at 0.5): it must read violet (the unit colour), not mauve/rose; carton skin on the open box walls; the classroom card has a 1 m cube 64 high standing on the floor at the right (board and desks readable); the shelf says "Not drawn to size."; phase 4 stack width with the keypad shut; layer chips; the legend card; the summary thumbnails are digits+cubes only
- C26 Work Back and Split: tile skin only on <=40-cell grids (all others plain); rope one piece per side at 9:1; the 'Not floor' amber label must fit the 16x7 L-corner (161x46) in hi/gu; the "3 m" and "6 m" labels at the L notch must not read as one pair; the nearly empty phase 3 opening; the product line is hidden under the dials from item 2
- C41 Layer Stacker: ALL phase 3 solids are plain tinted faces (a skin would answer "is it a cube?"); the "units: cm/m" chip is a read-out, not a toggle; Yes/No choice keys; the Tenths lens is plain glass; carton skin in P2/P4; cube skin on small bases only (<=40 skins a screen)
- C46 Box Packer: the lit amber strip along the NEXT row's own footprint (floor), Divide line plain ink, the "Yes, no gap" chip and the full 30-cube box at the end of the Yes/No correction; the typed-height correction line "34x6,936=2,35,824" fits the 290 px column at >=28; cube/carton skins <=40; the dial in phase 2 is an optional aid
- C51 Three Measures (first review after its builder reports): start page labels Length/Surface/Space/Water on ONE baseline with "Space" clear below the cube (owner feedback); jar/stone/cube skins <=3 and contrast of labels over them; the Push stick; Mark level line
