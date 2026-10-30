# M3.S5.T8.C38.2D1 · thermometer_reader · Thermometer Reader
indiannica_eng_maths5_ch9 · indiannica_eng_maths5_ch9_v2 v2 (active) · "Measurements" · segment M3.S5 "Scales and Other Units" · topic M3.S5.T8 "Temperature" · printed p.142 to p.143

> Runtime supplies the standard chrome (bands, zones, header, runs box, slot + pad, bubble, phase bar, type scale, content colours, sounds, finished/idle/restart). `scaffold` puts each phase's concept, teach line, hint ladder, closing line and items into tool.tsx; they are not repeated here. Build the working area and the mechanics.

## What it is
**Description:** Dip a thermometer and watch the column move, see the four printed readings on two scales, find what one small mark is worth, and read the column by counting marks.
**Why:** Say what temperature is and what measures it, know the chapter's landmark readings on both scales, find what one small mark is worth, and read a thermometer by counting marks.
**Look:** A tall thermometer with a green liquid column, labels up its scale and small marks between them, and on one phase a second scale beside it marked only at four readings.
**Context:** Grade 5, the pages on temperature. An adult sees a thermometer read. What the pages are doing is asking children to read scales whose small marks are not all worth the same, so the one habit that matters is finding what one small mark is worth before reading.
**For the child:** Tap two labels and count the steps between them. Find what one small mark is worth. Then count the marks up from the label below the column.
**Teaching notes:** Before anyone reads a scale, find what one small mark is worth: count the steps between two labels, which is one more than the number of small marks. Different thermometers have different marks, so check each one. Use only the four readings the chapter pairs on the two scales; it gives no rule for changing scales, and the tool gives none. Room temperature is 21 deg C, which is 69.8 deg F. Celsius and Fahrenheit are the names of the two scales.
**Placement:** Explore
**Also mounted in:** M3.S5.T8

## Look
**Chrome:** dim #9AA4AC · ink #2B2B2B · rule #C9BCA6 · panel #F2E4CE · paper #FFFDF7 · accent #5B6770
**Voice:** rate 0.92, pitch 1.06 · figure: None

## Stage (tool-specific layout)
Three bands across 1600 by 900. The header runs 0 to 80 and is one line only: 'Thermometer Reader' in ink at the far left, a small dot set clear of the name, the phase title beside the dot on the same line, the host's navigation, and sound and restart as three round controls at the far right. The canvas runs 92 to 746, one rounded card on the paper colour. At its top left, at x 64, y 108 and 330 by 76, sits the running count: the number of gaps or marks counted. It is never a score. The working area is 1086 by 528 at x 64, y 202. The thermometer stands upright at x 480, y 220, a tube 60 wide and 470 tall with its bulb at the bottom, its tube, marks and labels in near-black ink and its liquid column green, labelled Reading. On the first phase a shelf runs along y 640 from x 700 to x 1100 with a bowl of ice, cups of water and a cup of tea on it, and the thermometer is dragged into each; the cups can then be dragged into a row along y 560, coldest at the left. On the second phase the Celsius scale runs up the left of the tube, and the other scale, violet, labelled Other scale, stands on the right with only four marks; the four landmark buttons, freezing water, room temperature, body temperature and boiling water, stand in a column at x 760, y 260. On the third phase a tapped label is deep blue, labelled Given, each gap between two neighbouring labels lights amber as it is counted, and the worth of one small mark is pinned beside the scale at x 600 in vermilion, labelled One mark. On the fourth the marks above the label below the column light one at a time as they are counted. Down the right of the canvas, in the same rectangle on every phase and never animated in or out, the question sits above the answer slot at x 1186, y 250 (356 by 92) that holds what the child has given, and under it the pad at x 1170, y 368 (388 by 363). The pad is ten number keys with a point key, a delete key, and a deg C key and a deg F key. The footer runs 758 to 900: the voice caption at the far left with its speaking dot beside it, measuring its own wrap and dropping a type size rather than spilling, and the phase bar at the right with the question count under it. There is no sidebar and no score box anywhere, and nothing is ever written over the working area. Content colours are the chapter's own, and the nine tools of this chapter share them. The measure the question gives, in the unit it is given in, is deep blue, labelled Given or Measure. The measure the working reaches, and a reading on a scale, is green, labelled Answer, Reading or Same measure. The places moved across the unit chart, and the worth of one small mark on a scale, are vermilion, labelled Move or One mark. A unit fact, the unit names on the chart and the other temperature scale are violet, labelled Unit fact, Unit or Other scale. The part taken away, and a part left over after sharing, are rose, labelled Taken away or Left over. The unit, column, mark or step being worked on now is amber. Grey is kept for a zero holding a place open inside a number, labelled Place holder, and for nothing else. Rulers, tapes, jugs, scales, thermometer tubes, chart lines, arrows, operation signs and step labels are near-black ink, and anything dimmed fades to half strength. Chrome never borrows one of the content colours, and each reading survives with the colour taken away, because a part is told by its written label before it is told by its colour.

## Opening (first frame of every mount)
Every mount comes up already furnished for its phase with nothing yet read. On the first phase the thermometer stands beside a shelf with a bowl of ice, cups of water and a cup of tea. On the second it stands with the Celsius scale on the left, the other scale on the right marked at four readings, and four landmark buttons below. On the third a scale stands with its labels and small marks and no column yet. On the fourth the column stops between two labels. One thing moves, once: the thermometer, the first landmark button, or the lowest label gives one slow pulse while the voice speaks its opening line.

## Phases (what each mount shows and does; the words are in tool.tsx)

### 1 · Hot and cold
**Screen:** a thermometer beside a shelf of a bowl of ice, cups of water and a cup of tea
**Does:** dips the thermometer into each and puts them in order from coldest to hottest
**Win:** the cups line up from coldest to hottest, each with its column height beside it
**Feels:** the column climbing in the tea and dropping in the ice
**Goal:** temperature is how hot or cold something is, and a thermometer measures it
**Observe:** The column rose in the tea and sank in the ice water.
**Wrong (each is a traceback on the working area):**
- orders the cups by how much water is in them → each cup's column height is drawn beside it in green, the tallest column is lit amber, and the child's row stays as it was set
- builds the row from hottest to coldest → the row stays, and the word Coldest is written in ink at the left end of the row with an arrow pointing to the right towards Hottest
**Misconception to break:** Thinking a thermometer tells how much water is in the glass, because its column goes up and down like a level.

### 2 · Two scales
**Screen:** the thermometer with the Celsius scale on the left, the other scale on the right marked at four readings, and four landmark buttons
**Does:** taps each landmark button and reads the column on both scales
**Win:** each landmark shows its two readings side by side, joined by a straight line at its true mark
**Feels:** each landmark lighting up on both sides of the tube at once
**Goal:** water freezes at 0 deg C and boils at 100 deg C; the chapter pairs each landmark with a reading on the other scale, and gives no rule for others
**Observe:** The same landmark sat at two different numbers on the two sides of the tube.
**Wrong (each is a traceback on the working area):**
- types the Celsius reading when the other scale's reading is asked → the column stays at the landmark, the violet scale's mark at the column's top is lit amber with its reading beside it, and the child's typed answer stays in the slot
- taps the room temperature landmark when body temperature is asked → the column rises to the landmark tapped with its name written beside it in ink, and the body temperature button is lit amber
**Misconception to break:** Thinking the Fahrenheit reading is the hotter one because its number is bigger, when the two readings are the same temperature.

### 3 · What one small mark is worth
**Screen:** a scale with its labels and small marks, and no column yet
**Does:** taps two neighbouring labels, counts the steps between them, and types what one small mark is worth
**Win:** the worth of one small mark is pinned beside the scale in vermilion
**Feels:** the steps lighting one by one and one mark's worth snapping into place
**Goal:** find what one small mark is worth: the gap between two labels, divided by the number of steps between them
**Observe:** On one thermometer a small mark was worth one degree, and on another it was worth more.
**Wrong (each is a traceback on the working area):**
- shares the difference between the labels among the small marks instead of the steps → the steps between the two labels light again one at a time in amber, and the worth of one small mark is shown beside them, while the child's answer stays in the slot
- types one for what one small mark is worth without looking at the labels → the two labels are lit deep blue, the steps between them are counted again one at a time, and the worth the labels give is pinned beside the child's
**Misconception to break:** Counting the 4 marks as 4 steps, when 4 marks cut the gap into 5 steps, which gives two and a half degrees a step.

### 4 · Reading a thermometer
**Screen:** a thermometer whose column stops between two labels
**Does:** finds what one small mark is worth, counts the marks above the label below the column, and types the reading
**Win:** the counted marks glow, and the reading turns green
**Feels:** the counted marks glowing up to the top of the column
**Goal:** find what one small mark is worth, count the marks from the label below the column, and add
**Observe:** There was always one more step than there were small marks between two labels.
**Wrong (each is a traceback on the working area):**
- counts the marks above the label as one degree each on a scale where a mark is worth more → the column is drawn at the child's reading beside the real one, so the two tops are seen apart, and the worth of one small mark is pinned beside the scale
- types the nearest label as the reading → the column is drawn at the child's reading beside the real one, and the marks between the label and the real top light one at a time
**Misconception to break:** Taking each mark as one degree without checking, and so reading 63 deg C.

## Delight
On the second phase, when the boiling water landmark is tapped, a few small bubbles rise inside the drawn cup beside the tube as the column climbs to the top label.

**General miss line:** What is one small mark worth here? Count the steps between two labels.

## Answer key
Temperature measures how hot or cold something is, and a thermometer measures it. On the Celsius scale water freezes at 0 deg C and boils at 100 deg C. Water boils at 100 deg C, which is 212 deg F. Normal body temperature is about 37 deg C, which is about 98.6 deg F. Before reading a scale, find what one small mark is worth: the gap between two neighbouring labels, divided by the number of steps between them, which is one more than the number of small marks. Then count the marks from the label below the column and add.

## Student controls
- **Thermometer drag**: dips the thermometer into a cup or thing on the first phase
- **Landmark buttons**: set the column at one of the four printed readings
- **Label tap**: picks two neighbouring labels and lights the gaps between them
- **Mark tap**: lights the small marks above a label as they are counted
- **Number pad**: types the worth of one small mark or a reading

## State fields (getState, a resume contract)
phase, labels, marks_between, one_mark, column, counted, answer, complete

## Textbook (this topic)
**Pages:** 142, 143
**Key terms:** temperature, thermometer, Celsius scale, Fahrenheit scale, deg C, deg F, scale, mark
Temperature is measured with a thermometer on the Celsius or the Fahrenheit scale, and a scale is read by first finding what one small mark is worth. Temperature tells how hot or cold something is, and a thermometer measures it on the Celsius scale or the Fahrenheit scale. To read a scale, first find what one small mark is worth, then count the marks up from the label below the column. Temperature measures how hot or cold something is. A thermometer measures temperature. A doctor uses a clinical thermometer to check the temperature of a body. On the Celsius scale, water freezes at 0 deg C and boils at 100 deg C. On the Fahrenheit scale, it freezes at 32 deg F. Water boils at 100 deg C, which is 212 deg F. Normal body temperature is about 37 deg C, which is about 98.6 deg F. From one label to the next is 10 degrees. The 4 marks cut that gap into 5 equal steps. 10 divided by 5 is 2, so one small mark is worth 2 degrees here. Find what one small mark is worth before reading a scale. Each small mark is worth 2 degrees on this scale. 3 marks are 3 x 2 = 6 degrees. 30 + 6 = 36, so the thermometer reads 36 deg C.
