STATUS: fixes-needed
SLOTS: M1.S1.T3.C11.2D1
FILES: class3/work/indiannica_eng_maths3_ch10/M1.S1.T3.C11.2D1/images.json, images.tsx (generated, 10 keys + TOOL_THEME, 63.0 KB of 120), images-preview.png
CHECKS: images make --dry (no warnings); images make (10 made); images sheet; every raw viewed; final no-force make = 10 library hits, $0
FAILURES: lamp (must-fix: baked glow halo, cut note white fringe 42%; the clean re-make was refused twice as 19-20% opaque)
DECISIONS: 10 object skins (doc says 3, CLI accepted); sun/moon/school/lamp cartoon, six cards photo; theme preset chocolate; scenes' sky/ground/light builder-drawn; clock, strip, time card, buttons, pad plain
RISKS: lamp halo on dark sky; mixed cartoon and photo looks; lunchbox latch has a faint embossed mark (unreadable at size)
ESCALATE: no
Elements (phases 1, 2, 3 only):
- day strip (sky-blue a.m. and amber p.m. bands, ticks, midnight/noon labels) + hours accumulating on it · plain: marks and the a.m./p.m. meaning ARE the maths
- wall clock dial, numerals, hands, Plain clock view · plain: marks (owner decision 5); time card, a.m./p.m./Noon-and-midnight buttons, Answer tag, running count, pad · plain: digits and controls
- sun marker, slider thumb, high sun, sunrise sun · sun
- moon over the street lamp at each end, thumb after sunset · moon
- school morning · school (one building cut out; the sky, ground and sunrise light are builder-drawn)
- street at night · lamp (one lamp cut out; the dark sky and road are builder-drawn)
- six picture cards · alarm, bag, lunchbox, football, plate, bed
- people: none shown ("figure: None"), so no figure skins. Name-key pictures: none (no key names an object); the ZKEY grep was refused by permissions, the answer is the same either way.
Keys (all tile, 1:1 unless noted):
sun · golden sun disc · 159x160 · 6.1 KB · new $0.039 (2.5) · "Sun slider ... a high sun at the middle"
moon · pale cream crescent moon · 147x160 · 5.0 KB · new $0.039 (2.5) · "a moon over a street lamp"
school · small cream school, bell tower and flag · 200x188 · 8.2 KB · new $0.078 (2.5, one re-make: first drew a plain house) · "a sunrise over a small school"
lamp · street lamp with glowing lantern · 97x220 (3:4) · 4.1 KB · new $0.039 + $0.117 spent on rejected attempts (2.5) · "a moon over a street lamp"
alarm · mustard twin-bell alarm clock, BLANK cream face · 138x160 · 7.5 KB · new $0.067 (3.1) · "Picture cards: an alarm clock"
bag · orange canvas school backpack · 161x180 · 9.4 KB · new $0.067 (3.1; billed although ch 9 has the same object words, not a hit) · "a school bag"
lunchbox · orange plastic lunch box, closed · 160x115 · 4.4 KB · new $0.067 (3.1) · "a lunch box"
football · orange leather football, black panels · 159x160 · 7.2 KB · new $0.067 (3.1) · "a football"
plate · terracotta ceramic dinner plate, empty · 160x160 · 6.5 KB · new $0.067 (3.1; the photo's standing "no plate" did not stop it) · "a dinner plate"
bed · wooden single bed, mustard quilt, peach pillow, top view · 104x160 · 4.6 KB · new $0.067 (3.1) · "a bed"
theme · preset chocolate (ink 5.74/4.76/7.51:1, keys vs panel 5.11:1) · brown keys, berry Enter clash with neither a.m. sky blue nor p.m. amber; mini keypad on the sheet is readable.
Total 63.0 KB of 120 (60 + 6 photos x 10). Look: cards photo, no reference (roti.png is another object); sun, moon, school, lamp cartoon.
Money this run: $0.731 + $0.039 school re-make + $0.078 lamp re-make (2 rejected) = $0.848; ledger total $3.997. A final no-force make re-cut everything free ($0, 10 library hits).
Seen: sun (8 soft rays, reads as a sun), moon (crescent with craters, slightly biscuit-like), school (bell tower, flag, now reads as a school), alarm (real brass bells, truly blank face, no digits), bag, football (real leather, stitching), plate (glazed terracotta, reads as a plate), bed (top view, grid quilt) all one object on white, no text, hands, wrapper; cuts have no white fringe on the sheet (only the lamp, below); tiles drawn ten times and tinted stand apart.
Findings:
[must-fix] lamp - the cut keeps a cream glow disc round the lantern (CLI: white fringe 42%); on a dark night sky it would show as a pale disc. The re-make (no glow, curved arm) is a clean lamp but the cut refused it twice as 19-20% opaque (a thin pole), so the first lamp is kept in images.tsx. Fix: builder uses the lamp only on the cream paper below the strip, or draws the lamp in code on the dark sky; or the main session allows one more re-make (wider base or a tile at 1:1).
[question] object cap - IMAGES.md section 3 says at most 3 object skins; the CLI accepted 10 and ch 9 C5 already uses 11. I followed the task's list. If the owner wants 3: bag, lunchbox, football (school, lunch, play) and the rest plain.
[question] look - sun, moon, school, lamp are cartoon (a photo of the sun or moon on white is impossible, the Stage says "painted"), mixed with six photo cards. OK, or all cartoon?
[question] lunchbox - two-tone orange box with a hinge and a latch; the latch has a faint embossed mark, unreadable at shipped size. Reads as a lunch box at card size.
Rules written into each why for the builder and the design pass: the alarm face stays blank (draw no hands or marks); each card is drawn on its own cream card (the orange cards would sink on the amber p.m. half).
