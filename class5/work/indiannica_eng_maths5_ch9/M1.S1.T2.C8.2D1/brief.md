# M1.S1.T2.C8.2D1 · metric_chart · Chart Builder
indiannica_eng_maths5_ch9 · indiannica_eng_maths5_ch9_v2 v2 (active) · "Measurements" · segment M1.S1 "Measuring Big and Small" · topic M1.S1.T2 "The Metric Chart" · printed p.135 to p.136

> Runtime supplies the standard chrome (bands, zones, header, runs box, slot + pad, bubble, phase bar, type scale, content colours, sounds, finished/idle/restart). `scaffold` puts each phase's concept, teach line, hint ladder, closing line and items into tool.tsx; they are not repeated here. Build the working area and the mechanics.

## What it is
**Description:** Build the metric chart from kilo to milli around the base unit, see each unit grow ten times to the left, and read a measure written one digit to a unit as one decimal with its unit.
**Why:** Name the standard units, read the prefixes against the base unit, see that each unit is 10 times the unit to its right, and read a measure written one digit to a unit as one decimal with its unit.
**Look:** A chart of seven columns from kilo to milli with the base unit in the middle, three standard unit cards above it, and digit tiles that drop into the columns.
**Context:** Grade 5, the pages on metric measures. An adult sees a place value chart with unit names on it. What the pages are doing is making every unit a neighbour of every other: each is 10 times the unit to its right, and a measure written one digit to a unit is already a decimal, once its unit is named.
**For the child:** Build the chart. Step left and watch ten of a unit make one. Drop one digit under each unit, set the point after the unit asked for, and say the unit with the decimal.
**Teaching notes:** Lay the chart out by hand first, with the base unit card in the middle. Keep the page's words: the kilogram is the standard unit of weight, and the gram is the base unit the prefixes are added to. Say each unit is 10 times the unit to its right, never that the units are tens of the standard unit. When the smallest unit is asked for, say the smallest unit in the chart, because smaller metric units exist. Name the unit with every decimal. The nine flashcard words, metre, gram, litre and the six prefixes, are the cards of this chart.
**Placement:** Explore
**Also mounted in:** M1.S1.T2

## Look
**Chrome:** dim #9AA4AC · ink #2B2B2B · rule #C9BCA6 · panel #F2E4CE · paper #FFFDF7 · accent #5B6770
**Voice:** rate 0.92, pitch 1.06 · figure: None

## Stage (tool-specific layout)
Three bands across 1600 by 900. The header runs 0 to 80 and is one line only: 'Chart Builder' in ink at the far left, a small dot set clear of the name, the phase title beside the dot on the same line, the host's navigation, and sound and restart as three round controls at the far right. The canvas runs 92 to 746, one rounded card on the paper colour. At its top left, at x 64, y 108 and 330 by 76, sits the running count: the number of units placed on the chart. It is never a score. The working area is 1086 by 528 at x 64, y 202. The chart fills the lower part of the area: seven columns, each 140 wide, from x 90 to x 1070, headed kilo, hecto, deca, the base unit, deci, centi and milli from left to right, with three rows at y 430, y 520 and y 610 for length, weight and capacity. The unit names in the cells are violet, labelled Unit, and the base unit column in the middle, metre, gram and litre, has a heavier ink outline. Above the chart, along y 240, stand the three standard unit cards, metre, kilogram and litre, each 200 by 110, with the tray of things beside them at x 820, y 240 on the first phase. On the second phase the six prefix cards lie face down over their column heads, and a turned card shows its worth against the base unit as a violet Unit fact on a strip at y 360. On the third phase the amber marker sits over one column, the Step left button stands at x 900, y 250, and ten small bars of the unit to the right slide together into one bar of the new unit along y 330, the step drawn as a vermilion arrow labelled Move. On the fourth phase the deep blue digit tiles, labelled Given, wait in a tray at x 120, y 250, drop one to a column, and the point snaps into the gap just after the column it is dropped on; a grey zero, labelled Place holder, fills a column left open. The decimal read back sits in green, labelled Answer, at x 120, y 690, with its unit name. Down the right of the canvas, in the same rectangle on every phase and never animated in or out, the question sits above the answer slot at x 1186, y 250 (356 by 92) that holds what the child has given, and under it the pad at x 1170, y 368 (388 by 363). The pad is ten number keys with a point key, a delete key, and one key for each unit name of the row in use. The footer runs 758 to 900: the voice caption at the far left with its speaking dot beside it, measuring its own wrap and dropping a type size rather than spilling, and the phase bar at the right with the question count under it. There is no sidebar and no score box anywhere, and nothing is ever written over the working area. Content colours are the chapter's own, and the nine tools of this chapter share them. The measure the question gives, in the unit it is given in, is deep blue, labelled Given or Measure. The measure the working reaches, and a reading on a scale, is green, labelled Answer, Reading or Same measure. The places moved across the unit chart, and the worth of one small mark on a scale, are vermilion, labelled Move or One mark. A unit fact, the unit names on the chart and the other temperature scale are violet, labelled Unit fact, Unit or Other scale. The part taken away, and a part left over after sharing, are rose, labelled Taken away or Left over. The unit, column, mark or step being worked on now is amber. Grey is kept for a zero holding a place open inside a number, labelled Place holder, and for nothing else. Rulers, tapes, jugs, scales, thermometer tubes, chart lines, arrows, operation signs and step labels are near-black ink, and anything dimmed fades to half strength. Chrome never borrows one of the content colours, and each reading survives with the colour taken away, because a part is told by its written label before it is told by its colour.

## Opening (first frame of every mount)
Every mount comes up already furnished for its phase with nothing yet placed. On the first phase the three standard unit cards, metre, kilogram and litre, stand above the chart with a tray of things below them: a ribbon, a bag of rice, a bucket of water and more. On the second the chart lies with its six prefix cards face down and the base unit column lit. On the third one row of the chart lies with the marker on a unit and ten small bars of the unit to its right beside it. On the fourth a row lies empty with the deep blue digit tiles in their tray and the point loose above. One thing moves, once: the first thing in the tray, the first prefix card, the Step left button or the loose point gives one slow pulse while the voice speaks its opening line.

## Phases (what each mount shows and does; the words are in tool.tsx)

### 1 · Standard units
**Screen:** three standard unit cards, metre, kilogram and litre, and a tray of things to measure
**Does:** drags each thing onto the standard unit that measures it
**Win:** every thing sits on its standard unit, and the three cards light together
**Feels:** the three cards lighting together once every thing is home
**Goal:** the metre measures length, the kilogram measures weight and the litre measures capacity; these are the standard units
**Observe:** The gram sat in the middle column, but the kilogram card was the one the rice bag went on.
**Wrong (each is a traceback on the working area):**
- drops the bag of rice on the litre card → the bag stays on the litre card, the kilogram card beside it is lit amber, and the word Weight is written in ink under the kilogram card while the rest of the child's sorting stays
- drops a long ribbon on the kilogram card → the ribbon stays where it was put, the metre card is lit amber, and the ribbon is drawn lying along a tape beside it, in steps
**Misconception to break:** Choosing the gram for the standard unit of weight, because the gram sits in the middle column. The middle column holds the base unit, and the standard unit of weight is the kilogram.

### 2 · Prefixes and the base unit
**Screen:** the chart with its prefix cards face down and the base unit column lit
**Does:** turns each prefix card and reads what it is worth against the base unit
**Win:** all six prefix cards face up, worth from a thousand times to a thousandth, with the base unit between them
**Feels:** a row of face-down cards turning into a ladder from a thousand times to a thousandth
**Goal:** kilo, hecto and deca make bigger units and deci, centi and milli smaller ones, all added to the base unit metre, gram or litre
**Observe:** The prefix cards to the left of the base unit showed times, and the ones to its right showed parts.
**Wrong (each is a traceback on the working area):**
- types a hundredth, with the point key, for what a hectogram is worth in grams → the hecto card stays face up with its worth, a hundred times, in violet, and a bar of one gram is drawn beside a bar a hundred times as long, while the child's typed answer stays in the slot
- types ten for how many grams make a hectogram → the hecto card is lit amber, and ten bars of deca slide under it in steps, then ten more rows of them, so the hundred grams can be counted
**Misconception to break:** Taking hecto for 1/100, because it sounds like hundredths; the prefixes for hundredths and thousandths are centi and milli.

### 3 · Ten times the unit to its right
**Screen:** one row of the chart with the marker on a unit and ten small bars of the unit to its right
**Does:** presses Step left and watches ten bars of one unit fill one bar of the next
**Win:** ten bars click together into one, and the step is labelled Move, ten times
**Feels:** ten small bars clicking together into one bar of the next unit
**Goal:** each unit is 10 times the unit to its right, and 1/10 of the unit to its left
**Observe:** Every Step left made ten bars click into one.
**Wrong (each is a traceback on the working area):**
- counts one step from centilitres to litres and types ten → the marker's path is replayed on the row, two vermilion Move arrows are drawn under it in steps, each labelled ten times, and the child's answer stays in the slot
- types that the unit to the left is a tenth of the unit to its right → ten small bars slide together again, slowly, into one bar of the unit to the left, and that bar is lit amber beside the child's answer
**Misconception to break:** Counting only one step from cL to the litre, when the litre is two steps to the left, and so giving ten times too few centilitres.

### 4 · A measure on the chart
**Screen:** a row of the chart with deep blue digit tiles waiting in a tray and the point loose above
**Does:** drops one digit under each unit, sets the point after the unit asked for, and reads the decimal with its unit
**Win:** the decimal and its unit turn green together
**Feels:** the decimal and its unit turning green together
**Goal:** a measure written one digit to a unit is read as one decimal, with the point just after the digit of the unit chosen and that unit named
**Observe:** The same digits read as a different decimal each time the point moved to another unit.
**Wrong (each is a traceback on the working area):**
- sets the point after the base unit's digit when kilograms are asked for → the point stays where it was set, the measure is read back in grams beside it, and the kilograms column the question asked for is lit amber
- slides the next digit into a column that should hold nothing → each digit is read back in the column it sits in, the empty column is lit amber, and a grey zero waits beside it for the child to drop in
- types the decimal without pressing a unit key → the decimal waits in the slot uncoloured, and the unit keys on the pad and the unit names of the row are lit amber
**Misconception to break:** Setting the point after the L digit and reading 3725 with no unit named, so nobody can tell what the number measures.

## Delight
When the last prefix card turns over on the second phase, the whole row of worths slides into one line under the chart, a thousand times at one end and a thousandth at the other, and the base unit glows once in the middle.

**General miss line:** Look along the row. Which unit is next to which?

## Answer key
The standard unit of length is the metre, the standard unit of weight is the kilogram, and the standard unit of capacity is the litre. The chart adds a prefix to a base unit, metre, gram or litre: kilo means 1000 times, hecto 100 times, deca 10 times, deci 1/10, centi 1/100 and milli 1/1000. Each unit is 10 times the unit to its right, and 1/10 of the unit to its left. The smallest units in the chart are the millimetre, the milligram and the millilitre. A measure written one digit to a unit is read as one decimal: the point goes just after the digit of the unit you choose, and that unit is named with the decimal.

## Student controls
- **Thing drag**: drops a thing onto a standard unit card on the first phase
- **Prefix card**: lights what the prefix is worth against the base unit
- **Step left**: moves the marker one column left and fills one unit with ten of the unit to its right
- **Digit tiles**: drop one digit under each column of a row
- **Point**: is set just after the digit of the unit chosen
- **Number pad**: types a number, a decimal or a unit name

## State fields (getState, a resume contract)
phase, row, placed, marker, digits, point_after, answer, complete

## Textbook (this topic)
**Pages:** 135, 136
**Key terms:** standard unit, base unit, metre, kilogram, litre, gram, prefix, kilo, hecto, deca, deci, centi, milli
The metre, the kilogram and the litre are the standard units, the prefixes kilo to milli make bigger and smaller units, and each unit is 10 times the unit to its right. The standard units are the metre, the kilogram and the litre. Prefixes such as kilo and milli are added to a base unit to make bigger and smaller units. On the chart, each unit is ten times the unit to its right, and a measure can be read off it as one decimal with its unit. The standard unit of length is the metre (m). The standard unit of weight is the kilogram (kg). The standard unit of capacity is the litre (L). The chart adds a prefix to a base unit: metre, gram or litre. Kilo means 1000 times, hecto means 100 times and deca means 10 times. Deci means 1/10, centi means 1/100 and milli means 1/1000. So 1 kg = 1000 g, because the base unit the prefixes are added to is the gram. Each unit is 10 times the unit to its right. So 1 dam = 10 m, and 1 hm = 10 dam. Each unit is also 1/10 of the unit to its left. So 1 cm = 10 mm, and 1 mm is 1/10 of a centimetre. Write one digit under each unit of the chart. Put 3 under kg, 4 under hg, 7 under dag and 5 under g. The point goes just after the kg digit, so 3 kg 4 hg 7 dag 5 g is 3.475 kg. Name the unit with the decimal: 3.475 kg.
