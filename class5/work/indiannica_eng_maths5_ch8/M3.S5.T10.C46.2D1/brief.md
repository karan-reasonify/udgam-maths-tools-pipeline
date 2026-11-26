# M3.S5.T10.C46.2D1 · box_packer · Box Packer
indiannica_eng_maths5_ch8 · indiannica_eng_maths5_ch8_v3 v3 (active) · "Perimeter, Area, and Volume" · segment M3.S5 "Using Volume" · topic M3.S5.T10 "Filling Boxes" · printed p.131 to p.132

> Runtime supplies the standard chrome (bands, zones, header, runs box, slot + pad, bubble, phase bar, type scale, content colours, sounds, finished/idle/restart). `scaffold` puts each phase's concept, teach line, hint ladder, closing line and items into tool.tsx; they are not repeated here. Build the working area and the mechanics.

## What it is
**Description:** Raise a base into a solid for base area x height, work back to a height, build a block from equal cubes, and pack small cubes edge by edge to see how many really fit.
**Why:** Find a volume as base area x height, work back to a height from a volume and a base area, find a block's volume from equal cubes, and check how many small cubes really fit along each edge of a box.
**Look:** A base tile that rises into a solid, a volume card and Height dial on the second phase, a row of equal cubes on the third, and an open box with small cubes and the Divide card on the last.
**Context:** Grade 5, the last worked examples on volume and Exercise 8.4. An adult sees a formula and a division. What the pages are doing is reading length x breadth as one base area, working back to a height, and counting how many small cubes fit a box, where the division of volumes is right only when each edge takes a whole number of cubes.
**For the child:** Raise the base to find the volume. Pack the box one edge at a time. Whole cubes only.
**Teaching notes:** Measure a small box and one cube, divide the volumes on paper, then pack the box with whole cubes before the tool opens. Base area times height is length times breadth times height, with the first two already multiplied. Work back to a height by asking what times the base area gives the volume, and multiply back. A block of equal cubes is the count times one cube. Before trusting a division, check how many small cubes fit along each edge; a space left over along any edge means fewer fit. The printed bases, heights and tray are the child's to work.
**Placement:** Explore
**Also mounted in:** M3.S5.T10

## Look
**Chrome:** dim #9AA4AC · ink #2B2B2B · rule #C9BCA6 · panel #F2E4CE · paper #FFFDF7 · accent #5B6770
**Voice:** rate 0.92, pitch 1.06 · figure: None

## Stage (tool-specific layout)
Three bands across 1600 by 900. The header runs 0 to 80 and is one line only: 'Box Packer' in ink at the far left, a small dot set clear of the name, the phase title beside the dot on the same line, the host's navigation, and sound and restart as three round controls at the far right. The canvas runs 92 to 746, one rounded card on the paper colour. At its top left, at x 64, y 108 and 330 by 76, sits the running count: the number of small cubes packed or joined. It is never a score. The working area is 1086 by 528 at x 64, y 202. The base tile lies at x 160, y 520, 400 by 120, deep blue, labelled Given with its area. The Height handle is a round grip at its right edge; each unit of height it raises adds one base's worth to the running volume, written beside the solid at x 600, y 300. The volume card and the Height dial stand at x 820, y 250 and x 820, y 340, and the Check line runs along y 690 from x 120. On the third phase the row of equal cubes lies along y 500 from x 160, and the Join button stands at x 820, y 420. On the fourth phase the open box stands in three visible faces at x 160, y 260 inside a box 600 by 400 with its edges labelled; the Pack edge button at x 820, y 420 lays whole cubes along one edge at a time, and any space too small for a whole cube turns rose, labelled Left over. The Divide card stands at x 820, y 520. The answer reached is green. Down the right of the canvas, in the same rectangle on every phase and never animated in or out, the question sits above the answer slot at x 1186, y 250 (356 by 92) that holds what the child has given, and under it the pad at x 1170, y 368 (388 by 363). The pad is ten number keys with cm, sq. cm and cu. cm keys. The footer runs 758 to 900: the voice caption at the far left with its speaking dot beside it, measuring its own wrap and dropping a type size rather than spilling, and the phase bar at the right with the question count under it. There is no sidebar and no score box anywhere, and nothing is ever written over the working area. Content colours are the chapter's own, and the ten tools of this chapter share them. The lengths the question gives, as a side, a length, a breadth, a height, an edge or a base area, are deep blue, labelled Given or by their own name. The perimeter, area, volume or missing side the working reaches is green, labelled Answer. The boundary that a perimeter walks round is vermilion, labelled Boundary. The unit being counted, one unit square, one unit cube, one row or one layer, is violet, labelled Unit square, Unit cube, Row or Layer. The part squares of an estimate and the space left over where no whole cube fits are rose, labelled More than half, Half or Left over. The side, square, cube, layer or step being worked on now is amber. Grey is kept for a zero holding a place open, and nothing on this stage is ever grey. A square or cube that is not being counted stays warm white inside its near-black outline, grid lines, unit words and signs are near-black ink, and anything dimmed fades to half strength. Chrome never borrows one of them, and each reading survives with the colour taken away, because a part is told by its written label before it is told by its colour.

## Opening (first frame of every mount)
Every mount comes up already furnished for its phase with nothing yet raised or packed. On the first phase a base tile lies flat with its area written on it and the Height handle beside it. On the second a base tile lies beside a volume card with the Height dial. On the third a row of equal cubes waits apart, with the Join button. On the fourth an open box stands empty with a heap of small cubes and the Divide card. One thing moves, once: the Height handle, the Height dial, the Join button or the Pack edge button gives one slow pulse while the voice speaks its opening line.

## Phases (what each mount shows and does; the words are in tool.tsx)

### 1 · Base area times height
**Screen:** a base tile labelled 24 sq. cm, flat on the table top, and the Height handle
**Does:** drags the handle up seven steps, one base's worth each, and types the volume
**Win:** the line reads 24 x 7 = 168, and 168 cu. cm lands green
**Feels:** a flat tile rising into a solid, a layer at a time
**Goal:** the volume of a cuboid is base area x height
**Observe:** Each unit of height added one whole base's worth to the volume.
**Wrong (each is a traceback on the working area):**
- types the base area added to the height → the solid rises again in steps, one base's worth at a time, and the running volume is shown beside the child's number
- stops the Height handle one unit short → the gap under the height mark is lit amber, and the missing layer is drawn as a ghost while the child's solid stays
**Misconception to break:** Adding the base area and the height, which mixes a surface with a length.

### 2 · A height worked back
**Screen:** a base tile labelled 34 sq. m, a volume card reading 204 cu. m, and the Height dial
**Does:** turns the Height dial until the solid meets the card, then taps Check
**Win:** the dial stops at six, the Check line reads 34 x 6 = 204, and 6 m lands green
**Feels:** the dial stopping just where the solid meets the card
**Goal:** a height is the number that times the base area gives the volume
**Observe:** The Check line multiplied the found height back and landed on the volume.
**Wrong (each is a traceback on the working area):**
- types the volume times the base area → the Height dial raises the solid in steps to the child's number, spilling far past the volume card, and the card is lit amber
- stops the Height dial where the solid falls short of the card → the Check line multiplies the child's height back, and the gap between it and the volume card is lit amber
**Misconception to break:** Multiplying the volume by the base area, which gives a far bigger number, not a height.

### 3 · Small cubes make a block
**Screen:** a row of six equal cubes, each with an edge of 5 cm, and the Join button
**Does:** finds one cube's volume, taps Join, and types the block's volume
**Win:** the cubes slide into a block, the line reads 6 x 125 = 750, and 750 cu. cm lands green
**Feels:** equal cubes sliding together into one block
**Goal:** a block made of equal cubes has the count times one cube's volume
**Observe:** Along one edge a thin rose strip was left where no whole cube would go.
**Wrong (each is a traceback on the working area):**
- types the count times the edge → one cube is filled with tiny unit cubes in steps to show its volume, and that volume is lit amber beside the child's number
- types one cube's volume as the block's → the Join button pulls the cubes apart again in steps, and the count is lit amber
**Misconception to break:** Multiplying the count by the edge instead of by one cube's volume.

### 4 · Cubes that really fit
**Screen:** an open box 9 cm by 6 cm by 4 cm, a heap of 3 cm cubes, and the Divide card
**Does:** reads the Divide card, then taps Pack edge along each edge in turn and types how many whole cubes fit
**Win:** three cubes go along one edge, two along the next and one up the last with a rose Left over strip, and six lands green beside the Divide card's eight
**Feels:** the last whole cube going in, and a thin strip of space left over
**Goal:** check how many small cubes fit along each edge; space left over means fewer fit than a division gives
**Wrong (each is a traceback on the working area):**
- types the Divide card's number as the answer without packing the box → the box is packed in steps, one edge at a time, the rose Left over strip is lit, and the packed count is set beside the Divide card's number
- packs one edge and multiplies by the Divide card → the other two edges light amber one after another, waiting to be packed
**Misconception to break:** Trusting the division of the volumes, which counts pieces of cubes that cannot go in as whole cubes.

## Delight
On the fourth phase, when the last whole cube goes in, the Divide card gives a small shrug beside the packed box, and the rose Left over strip glows once.

**General miss line:** Pack that edge again, one whole cube at a time.

## Answer key
The base area of a cuboid is length x breadth, so its volume is base area x height. A height is the number that times the base area gives the volume; check by multiplying back. A block made of equal cubes has a volume of the count times one cube's volume. To find how many small cubes fit in a box, check how many fit along each edge, whole cubes only, and multiply those numbers. A space left over along any edge means fewer cubes fit than a division of the volumes gives.

## Student controls
- **Height handle**: raises the base tile into a solid, one unit of height at a time
- **Height dial**: tries heights on a known base until the volume card is met
- **Check line**: multiplies the found height back by the base area
- **Join button**: slides a row of equal small cubes together into a block
- **Pack edge button**: lays whole small cubes along one edge of the box at a time
- **Divide card**: shows the box's volume divided by one cube's volume beside the cubes packed
- **Number pad**: types a volume, a height or a count, with cm, sq. cm and cu. cm keys

## State fields (getState, a resume contract)
phase, base_area, height, volume, tries, cubes_joined, packed_length, packed_breadth, packed_height, left_over, answer, complete

## Textbook (this topic)
**Pages:** 131, 132
**Key terms:** base area, height, equal cubes, fit, left over, edge
Volume is base area x height, a height is worked back from a volume, equal cubes build a block, and a count of cubes that fit is checked along each edge. The volume of a box is its base area x its height. A height can be worked back by asking what number times the base area gives the volume. A block cut into equal cubes has the volume of one cube times the number of cubes. To find how many cubes fit in a box, check along each edge, because the volumes alone can give too many. The base area is length x breadth. So the volume is base area x height. 30 x 3 = 90, so the volume of the tank is 90 cu. m. Base area x height is the volume. So 35 x height gives 175. 35 x 5 = 175, so the box is 5 cm high. One small cube has a volume of 3 x 3 x 3 = 27 cu. cm. The block is made of 8 of them. 8 x 27 = 216, so the block is 216 cu. cm. Dividing the volumes, 540 divided by 27 is 20. But check how many fit along each edge. Along the 10 cm edge only 3 cubes fit, with 1 cm left over. Along the 9 cm edge 3 fit. Along the 6 cm edge 2 fit. So only 3 x 3 x 2 = 18 whole cubes fit, not 20.
