STATUS: ok (skins made; 3 questions for the owner)
SLOTS: M1.S1.T2.C6.2D1
FILES: class3/work/indiannica_eng_maths3_ch10/M1.S1.T2.C6.2D1/images.json, images.tsx (generated), images-preview.png; assets/skins (pot new; backpack, bus library hits)
CHECKS: images make ok (theme validator passed, no-red clear, 28.2 KB of 90); raw pictures and sheet viewed
FAILURES: none open (kettle rejected x2 for an enclosed handle gap read as near-white 24%, bench re-make rejected x2; replaced by pot and backpack)
DECISIONS: three photo scene props, one per scene (school hall: backpack; bus stop: bus; kitchen: pot); theme derived from the backpack, never the bus yellow (amber p.m. colour); clocks, digits, tints, buttons, pad, Kiko plain; no figures; railway and football scenes skipped
RISKS: scene props are decoration (IMAGES.md section 2 lists decoration as plain), owner may prefer none or only the bus; bus cut has small dark wedges under the wheels
ESCALATE: no
Elements (brief Description, For the child, Look, Student controls, Stage; scope = the owner's 3 phases):
- wall clock / kitchen clock (face, rim, numerals, minute marks, both hands, the 5..60 ring) · plain: marks and digits; a clock picture beside the real dial would teach a wrong model
- digital clock, words card, answer tag, running count · plain: digits and words
- Past / To tint, lit half or quarter of the face · plain: the maths itself, drawn in code
- Minutes / Past and to / Plain dial buttons, number pad, Kiko, header controls · plain: chrome and the mascot
- school hall scene (phase 1) · backpack
- bus stop scene (phase 3) · bus
- kitchen scene (phase 3, folded from the brief's phase 4) · pot
- phase 2 (plain wall, minutes round the edge) · plain: the brief names no object there
- railway station, football ground (brief phases 3/4 small scenes) · none: outside the 3-phase scope and past the 3-skin cap
- people: none named in Description / For the child / Look / Stage ("figure: None"), so no figure skins
- name-keys (runtime has keyOnly/ZKEY): none, no key here names an object

Keys (all photo tiles, side view, natural colours; one shared style):
backpack · orange canvas school backpack with tan straps, front view · tile · 138x180 · 8.0 KB · library hit (free) · "a wall clock in a school hall": a school bag set down beside the clock
bus · yellow school bus, side on · tile · 480x175 · 12.6 KB · library hit (free) · "the wall clock at a bus stop": the bus waiting at the stop
pot · copper cooking pot with a lid, side on · tile · 200x150 · 7.6 KB · new $0.067 (gemini-3.1-flash-image) · "a kitchen clock ... a time card waiting beside it": the kitchen pot
theme · derived from backpack (ochre canvas): brown keys, soft butter keys, berry-pink Enter; validator ink 5.3/4.99/8.69:1, keys vs panel 4.57:1, no-red clear. Deliberately NOT from the bus: its yellow is the amber p.m. content colour and chrome never borrows one of the five.
Slot total 28.2 KB of 90 (3 photos). Look: photo for all three, no reference photograph (none of a bus, bag or pot in assets/refs). Placement is in each `why`: beside, never over, the dial, digital clock, words card or answer tag, hidden in the Plain dial view.
Money this run (my attempts): 6 billed pictures about $0.40 (see below); the ledger total also holds other agents' calls.

Looked at (raw + images-preview.png): bench: n/a (dropped, below). backpack: one object, white background, no text/logo/hands, a real canvas and leather photograph, cut clean. bus: one object, real toy-like photo, no text; cut clean except small dark shadow wedges under the wheels. pot: one copper pot, hammered real metal texture, no text, no hands, cut clean, no shadow crescent. Keypad: brown keys, readable digits, berry Enter, belongs with the backpack.

Rejected attempts (kept as .rejectedN): kettle x2 (copper kettle, good photos) near-white 24.4% and 24.6%: the arched handle encloses a large white gap, so the cut counts it as white object; replaced by the pot (no big loop). bench x1 first (plain honey-wood bench, accepted): its floor shadow stayed as an opaque grey smear between the legs (a grey shadow patch on the sheet); the one allowed re-make with a "solid base" prompt came back as a trestle bench with a white gap, near-white 22.4% and 28.3%, rejected twice. The accepted bench was dropped for the free backpack (clean cut). Old bench skin dbf30e21 stays in assets/skins unused.

Findings:
[question] bus - small dark shadow wedges under both wheels on the cut (library skin, accepted in an earlier chapter, not re-made here) - leave, or re-make once with `--force --only bus` if the owner minds.
[question] all three - IMAGES.md section 2 lists a background or decoration as plain; these are scene props made at the caller's direction, not objects the child acts on. Owner may prefer none, or only the bus (the one the brief names: "a bus stop").
[question] school hall - a backpack stands for the hall (a bench or board were the other candidates; the bench failed the cut). Owner may prefer a different school object.
Files: class3/work/indiannica_eng_maths3_ch10/M1.S1.T2.C6.2D1/images.json, images.tsx, images-preview.png.
