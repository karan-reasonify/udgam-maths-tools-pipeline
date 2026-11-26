# M3.S4.T8.C36.2D1 · cube_counter · Cube Counter
indiannica_eng_maths5_ch8 · indiannica_eng_maths5_ch8_v3 v3 (active) · "Perimeter, Area, and Volume" · segment M3.S4 "Cubes That Fill" · topic M3.S4.T8 "Unit Cubes" · printed p.129

> Runtime supplies the standard chrome (bands, zones, header, runs box, slot + pad, bubble, phase bar, type scale, content colours, sounds, finished/idle/restart). `scaffold` puts each phase's concept, teach line, hint ladder, closing line and items into tool.tsx; they are not repeated here. Build the working area and the mechanics.

## What it is
**Description:** Fill solids with unit cubes, pick the unit cube that fits, count cubes by rows, and lift a stack apart layer by layer to count the hidden cubes.
**Why:** Meet volume as the space a solid takes up, pick the unit cube that fits, find a volume by counting unit cubes by rows, and count the cubes hidden in a stack.
**Look:** Solids drawn in three faces with a tray of violet unit cubes under them, a unit shelf on the second phase, and the Lift layer control and See-through switch on the last two.
**Context:** Grade 5, the first volume page and Exercise 8.4's counted blocks. An adult sees counting. What the page is doing is naming a third measure: the volume is the space a solid takes up, counted in unit cubes, and every cube counts whether it can be seen or not.
**For the child:** Fill it with cubes. Count by rows and layers. Lift the layers to find hidden cubes.
**Teaching notes:** Fill a small box with unit cubes before the tool opens; the count is the volume. Say the unit every time, cu. cm for a small box and cu. m for a room. Count by rows and layers, never by the faces that can be seen, and build a stack, then take it apart layer by layer, to check the hidden cubes. Keep the three measures apart: a length, a surface and a space. The printed blocks are the child's to count.
**Placement:** Explore
**Also mounted in:** M3.S4.T8

## Look
**Chrome:** dim #9AA4AC · ink #2B2B2B · rule #C9BCA6 · panel #F2E4CE · paper #FFFDF7 · accent #5B6770
**Voice:** rate 0.92, pitch 1.06 · figure: None

## Stage (tool-specific layout)
Three bands across 1600 by 900. The header runs 0 to 80 and is one line only: 'Cube Counter' in ink at the far left, a small dot set clear of the name, the phase title beside the dot on the same line, the host's navigation, and sound and restart as three round controls at the far right. The canvas runs 92 to 746, one rounded card on the paper colour. At its top left, at x 64, y 108 and 330 by 76, sits the running count: the number of cubes counted. It is never a score. The working area is 1086 by 528 at x 64, y 202. The solids stand on a table top drawn along y 640, in three visible faces at x 160, y 260 inside a box 600 by 380, every unit cube 44 across. The tray of violet unit cubes, each labelled Unit cube, runs along y 680 from x 120. On the first phase the two open boxes stand at x 160 and x 480 with a counter under each, and the Fill button at x 820, y 250. On the second phase the unit shelf stands at x 820, y 330 with three cubes labelled by their edges, beside a picture card at x 160, y 260. On the later phases a tapped row lights amber as it is counted; the Lift layer control at x 820, y 420 lifts the top layer up and to the right, lit amber and labelled Layer; and the See-through switch at x 820, y 500 draws every cube in outline. The volume reached is green. Down the right of the canvas, in the same rectangle on every phase and never animated in or out, the question sits above the answer slot at x 1186, y 250 (356 by 92) that holds what the child has given, and under it the pad at x 1170, y 368 (388 by 363). The pad is ten number keys with cu. mm, cu. cm and cu. m keys. The footer runs 758 to 900: the voice caption at the far left with its speaking dot beside it, measuring its own wrap and dropping a type size rather than spilling, and the phase bar at the right with the question count under it. There is no sidebar and no score box anywhere, and nothing is ever written over the working area. Content colours are the chapter's own, and the ten tools of this chapter share them. The lengths the question gives, as a side, a length, a breadth, a height, an edge or a base area, are deep blue, labelled Given or by their own name. The perimeter, area, volume or missing side the working reaches is green, labelled Answer. The boundary that a perimeter walks round is vermilion, labelled Boundary. The unit being counted, one unit square, one unit cube, one row or one layer, is violet, labelled Unit square, Unit cube, Row or Layer. The part squares of an estimate and the space left over where no whole cube fits are rose, labelled More than half, Half or Left over. The side, square, cube, layer or step being worked on now is amber. Grey is kept for a zero holding a place open, and nothing on this stage is ever grey. A square or cube that is not being counted stays warm white inside its near-black outline, grid lines, unit words and signs are near-black ink, and anything dimmed fades to half strength. Chrome never borrows one of them, and each reading survives with the colour taken away, because a part is told by its written label before it is told by its colour.

## Opening (first frame of every mount)
Every mount comes up already furnished for its phase with nothing yet counted. On the first phase two open boxes stand side by side, empty, with the Fill button. On the second the unit shelf stands beside a picture card. On the third a solid of unit cubes stands on the table top, its rows uncounted. On the fourth a stack stands with only its front faces showing and the Lift layer control beside it. One thing moves, once: the Fill button, the unit shelf or the Lift layer control gives one slow pulse while the voice speaks its opening line.

## Phases (what each mount shows and does; the words are in tool.tsx)

### 1 · Space taken up
**Screen:** an open shoebox and an open pencil box side by side, both empty, and the Fill button
**Does:** fills each box with cubes and taps the one that takes up more space
**Win:** the shoebox's counter runs far past the pencil box's, and the shoebox lights green, labelled Greater volume
**Feels:** one box filling long after the other has stopped
**Goal:** the volume of a solid is the amount of space it takes up
**Observe:** The bigger box held many more cubes before it was full.
**Wrong (each is a traceback on the working area):**
- taps the taller box as the one that takes up more space → both boxes are filled again in steps side by side, and the counter with the greater count is lit amber
- taps before either box is full → the box that is not yet full is lit amber, and the Fill button pulses once
**Misconception to break:** Choosing the longer box, though a long thin box can take up less space than a short wide one.

### 2 · The unit cube
**Screen:** the unit shelf with cubes of edge 1 mm, 1 cm and 1 m, and a picture card of a classroom
**Does:** drags the unit cube that fits onto the picture card
**Win:** the 1 m cube settles on the classroom card and the unit reads cu. m
**Feels:** a cube that fits the thing settling onto it
**Goal:** a unit cube with edges of 1 cm has a volume of 1 cu. cm, and other things use cu. mm or cu. m
**Observe:** A unit cube too small for a big thing would take a very long time to count.
**Wrong (each is a traceback on the working area):**
- drags the cube with edges of one centimetre onto the classroom → cubes of that size start to fill the classroom card in a row in steps and barely cross it, and the cube with edges of one metre is lit amber
- drags the cube with edges of one metre onto a grain of sugar → the metre cube is drawn beside the grain, far too big to be a unit for it, and the cube with edges of one millimetre is lit amber
**Misconception to break:** Choosing cu. cm because it is the unit met most often, though a classroom would need far too many of them to count.

### 3 · Counting cubes
**Screen:** a solid of unit cubes of 1 cm, 9 in a row and 2 rows side by side, one cube high
**Does:** taps each row to count it and types the volume
**Win:** the running count reads 18, and 18 cu. cm lands green
**Feels:** row after row lighting up and the count climbing
**Goal:** the number of unit cubes that fill a solid is its volume, counted by rows
**Observe:** Lifting the top layer showed cubes that could not be seen from the front.
**Wrong (each is a traceback on the working area):**
- counts the faces that can be seen → the See-through switch turns on in steps, each cube's outline lights once as it is counted, and the child's number stays beside the count
- counts one row and stops → the next row is lit amber behind the first, and the Row tap pulses on it
**Misconception to break:** Counting the faces that can be seen instead of the cubes, which counts some cubes more than once.

### 4 · Hidden cubes count too
**Screen:** a stack 4 layers high with 6 cubes in each layer, only its front faces showing
**Does:** taps Lift layer again and again, counting each layer as it comes into view, and types the volume
**Win:** four lifted layers of six stand in a row, the count reads 24, and 24 cu. cm lands green
**Feels:** hidden cubes coming into view as each layer lifts away
**Goal:** cubes hidden behind or under others take up space and are counted
**Wrong (each is a traceback on the working area):**
- counts only the cubes seen from the front → the Lift layer control lifts the top layer in steps, and the cubes that were hidden light amber as they come into view
- counts the top layer twice after lifting it → the lifted layer carries a small label Counted in ink, and the layer beneath is lit amber
**Misconception to break:** Counting only the cubes that can be seen from the front, which leaves the hidden ones out.

## Delight
On the fourth phase, when the last layer is lifted, the lifted layers stand in a neat row and each one gives a small hop as its count is added.

**General miss line:** Lift the layers and look again. Did every cube get counted once?

## Answer key
The volume of a solid is the amount of space it takes up. A cube whose edges are all 1 cm long is a unit cube, with a volume of 1 cu. cm; volume is measured in cubic units, cu. mm for very small things, cu. cm for small ones and cu. m for large ones. The number of unit cubes that fill a solid is its volume; count them by rows and layers. Cubes hidden behind or under others take up space and are counted too.

## Student controls
- **Fill button**: pours unit cubes into the chosen solid until it is full
- **Unit shelf**: picks a unit cube with edges of 1 mm, 1 cm or 1 m for a thing to be measured
- **Row tap**: counts one row of cubes and adds it to the running count
- **Lift layer control**: lifts the top layer up and aside to show the layer beneath
- **See-through switch**: draws every cube in outline so hidden cubes show
- **Number pad**: types a count or a volume, with cu. mm, cu. cm and cu. m keys

## State fields (getState, a resume contract)
phase, solid, filled, unit_picked, rows_counted, layers_lifted, see_through, count, answer, complete

## Textbook (this topic)
**Pages:** 129
**Key terms:** volume, solid, unit cube, cu. cm, cubic units, layers
Volume is the amount of space a solid takes up, measured by counting the unit cubes that fill it, in cu. mm, cu. cm or cu. m. The amount of space a solid takes up is its volume. To measure it we count unit cubes, and a cube with every edge 1 cm long has a volume of 1 cu. cm. Volume is always measured in cubic units, such as cu. cm and cu. m. Every cube in a stack counts, even a hidden one. The amount of space a solid takes up is its volume. The brick takes up more space than the matchbox. So the brick has the greater volume. A cube whose edges are all 1 cm long is a unit cube. Its volume is 1 cubic centimetre, written 1 cu. cm. Volume is always measured in cubic units, such as cu. mm, cu. cm and cu. m. Count the cubes that fill it. 5 + 5 = 10, so 10 unit cubes fill it. Each is 1 cu. cm, so the volume is 10 cu. cm. Yes. Every cube takes up space, seen or not. A stack of 3 layers with 7 cubes in each layer has 3 x 7 = 21 cubes. Its volume is 21 cu. cm, counting the hidden ones.
