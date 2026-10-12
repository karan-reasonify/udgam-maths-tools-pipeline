# M2.S2.T3.C8.2D1 · smaller_to_bigger · Left Hop Converter
indiannica_eng_maths5_ch9 · indiannica_eng_maths5_ch9_v1 v1 (active) · "Measurements" · segment M2.S2 "Up and Down the Chart" · topic M2.S2.T3 "Smaller Units to Bigger Units" · printed p.136 to p.138

> Runtime supplies the standard chrome (bands, zones, header, runs box, slot + pad, bubble, phase bar, type scale, content colours, sounds, finished/idle/restart). `scaffold` puts each phase's concept, teach line, hint ladder, closing line and items into tool.tsx; they are not repeated here. Build the working area and the mechanics.

## What it is
**Description:** Pin the unit you have and the unit you want, hop the measure left one place at a time, and watch the number divided by 10 at each hop, then clip the unit onto the decimal.
**Why:** Change a measure from a smaller unit to a bigger one by counting the places from the unit you have to the unit you want and dividing the number by 10 for each, write a mixed measure as one decimal, split a measure into two units, and name the unit of every decimal.
**Look:** One row of the unit chart with digit tiles in its columns, two pins for the unit you have and the unit you want, and a point that hops left.
**Context:** Grade 5, the pages on converting smaller units into bigger ones. An adult sees decimal points moving. What the pages are doing is making a conversion a matter of counting places between two units, where each place to the left divides the number by 10.
**For the child:** Pin the unit you have and the unit you want. Hop left once for each place, and divide the number by 10 each time. Clip the unit onto the decimal.
**Teaching notes:** Count the places from the unit you have to the unit you want, wherever those two units sit on the chart, and not from the middle of the chart. It is the number that is divided by 10 for each place to the left. Say the unit aloud with every decimal, and accept any correct form when a question does not name the unit. The zeros after the point hold empty places open: 36 g is 0.036 kg, not 0.36 kg.
**Placement:** Explore
**Also mounted in:** M2.S2.T3

## Look
**Chrome:** dim #9AA4AC · ink #2B2B2B · rule #C9BCA6 · panel #F2E4CE · paper #FFFDF7 · accent #5B6770
**Voice:** rate 0.92, pitch 1.06 · figure: None

## Stage (tool-specific layout)
Three bands across 1600 by 900. The header runs 0 to 80 and is one line only: 'Left Hop Converter' in ink at the far left, a small dot set clear of the name, the phase title beside the dot on the same line, the host's navigation, and sound and restart as three round controls at the far right. The canvas runs 92 to 746, one rounded card on the paper colour. At its top left, at x 64, y 108 and 330 by 76, sits the running count: the number of hops the point has made. It is never a score. The working area is 1086 by 528 at x 64, y 202. One row of the chart runs across the middle of the area at y 380: seven columns, each 140 wide, from x 90 to x 1070, headed kilo to milli with the base unit in the middle and the unit names violet, labelled Unit. The given measure stands in deep blue digit tiles, labelled Given, one to a column, with the point in the gap after its unit. The deep blue have pin stands over the unit you have at y 300, and the green want pin is dragged along the same line to the unit you want. The Hop button stands at x 900, y 230. Each hop moves the point one gap to the left and draws a vermilion arrow under the row along y 470, labelled Move, divide the number by 10. A grey zero, labelled Place holder, drops into any column between the point and the digits that would otherwise stand empty. The Cut handle is a short upright bar that slides along the gaps of the row. The unit tags wait in a tray at x 120, y 560, and the answer is read in green, labelled Answer, at x 120, y 660, only once a tag is clipped to it. The unit in use is amber. Down the right of the canvas, in the same rectangle on every phase and never animated in or out, the question sits above the answer slot at x 1186, y 250 (356 by 92) that holds what the child has given, and under it the pad at x 1170, y 368 (388 by 363). The pad is ten number keys with a point key and a delete key. The footer runs 758 to 900: the voice caption at the far left with its speaking dot beside it, measuring its own wrap and dropping a type size rather than spilling, and the phase bar at the right with the question count under it. There is no sidebar and no score box anywhere, and nothing is ever written over the working area. Content colours are the chapter's own, and the nine tools of this chapter share them. The measure the question gives, in the unit it is given in, is deep blue, labelled Given or Measure. The measure the working reaches, and a reading on a scale, is green, labelled Answer, Reading or Same measure. The places moved across the unit chart, and the worth of one small mark on a scale, are vermilion, labelled Move or One mark. A unit fact, the unit names on the chart and the other temperature scale are violet, labelled Unit fact, Unit or Other scale. The part taken away, and a part left over after sharing, are rose, labelled Taken away or Left over. The unit, column, mark or step being worked on now is amber. Grey is kept for a zero holding a place open inside a number, labelled Place holder, and for nothing else. Rulers, tapes, jugs, scales, thermometer tubes, chart lines, arrows, operation signs and step labels are near-black ink, and anything dimmed fades to half strength. Chrome never borrows one of the content colours, and each reading survives with the colour taken away, because a part is told by its written label before it is told by its colour.

## Opening (first frame of every mount)
Every mount comes up already furnished for its phase with nothing yet hopped. On the first phase a length in centimetres sits in the row, one digit to a column, with the have pin on centimetres and the want pin lying loose above. On the second a weight's two parts sit in their own columns with one place empty between them. On the third a length in centimetres sits in the row with the Cut handle resting beside the metres column. On the fourth a capacity's decimal is built with a tray of unit tags beside it. One thing moves, once: the want pin, the point, the Cut handle or the tag tray gives one slow pulse while the voice speaks its opening line.

## Phases (what each mount shows and does; the words are in tool.tsx)

### 1 · Count the places
**Screen:** a length in centimetres set in the row, the have pin on cm and the want pin loose
**Does:** drags the want pin to m, counts the places between the pins, and hops the point once for each
**Win:** the point stops after the metres digit, and the two hops glow vermilion beneath
**Feels:** the point sliding left and the number shrinking while the length stays the same
**Goal:** count the places from the unit you have to the unit you want; each place to the left divides the number by 10
**Observe:** Each hop to the left made the number smaller, but the length on the card stayed the same.
**Wrong (each is a traceback on the working area):**
- hops the point to the right instead of the left → the point stays where the child put it and the measure is read back in that form with its unit, far more than the card shows; the pins light amber, and the places between them are counted again one hop at a time in vermilion
- counts the columns the pins stand on as well as the steps between them, and hops once too often → the extra hop reads the measure back in the unit one place further left, and the steps between the two pins are drawn one vermilion arrow each, in steps
**Misconception to break:** Multiplying by 100 instead of dividing, because the two places were counted but not their direction; the hose would come out longer than a whole town.

### 2 · A mixed measure as one decimal
**Screen:** a weight in kilograms and grams, its two parts in their own columns, one place empty between them
**Does:** sets the point after the kilograms digit and fills the empty place
**Win:** a grey zero drops into the empty place, and the decimal in kilograms turns green
**Feels:** a grey zero dropping into a gap and the whole decimal turning green
**Goal:** a mixed measure is one decimal in the larger unit, with zeros holding empty places after the point
**Observe:** The number of hops was the number of places between the two pins.
**Wrong (each is a traceback on the working area):**
- writes the grams straight after the point with no zero in the empty place → each digit is read back from the column it now sits in, showing far more grams than the question gave, and the empty column is lit amber with a grey zero waiting beside it
- sets the point after the last grams digit → the point stays and the measure is read back in grams, while the kilograms pin and its column are lit amber
**Misconception to break:** Leaving out the zero and writing 8.36 kg, which is 8 kg 360 g, a much heavier load.

### 3 · Into two units
**Screen:** a length in centimetres with the Cut handle resting beside the metres column
**Does:** drags the Cut handle to the metres column and reads the two parts
**Win:** the measure falls into two cards, metres and centimetres, both green
**Feels:** one long measure splitting cleanly into a metres card and a centimetres card
**Goal:** a measure in one unit can be split at a unit's column into a larger unit and a smaller one
**Observe:** A grey zero dropped in wherever a place after the point had no digit.
**Wrong (each is a traceback on the working area):**
- drags the Cut handle one gap too far to the right → the two cards are read back in the units the cut gives them, and the gap after the metres column is lit amber
- types only the metres part as the answer → the metres card turns green, and the centimetres card beside it is lit amber and waits to be read
**Misconception to break:** Dividing by 10 instead of by 100, which gives 91 m 5 cm, far longer than the rope.

### 4 · A decimal names its unit
**Screen:** a capacity in litres and millilitres, its decimal built, and a tray of unit tags
**Does:** clips the unit tag the decimal is in, and sees the same digits read in another unit beside it
**Win:** the tag clicks onto the decimal and the whole measure turns green
**Feels:** the tag clicking onto the decimal and the whole measure turning green
**Goal:** every decimal is written with its unit, because the same digits in another unit are another measure
**Observe:** The same digits read with another tag named a very different measure.
**Wrong (each is a traceback on the working area):**
- clips the millilitres tag onto a decimal built in litres → the child's tag stays, and beside it the same digits are read in millilitres, a drop or two, lit amber, next to the capacity the question gave
- types the decimal and leaves the tag tray alone → the decimal waits in the slot uncoloured, and the tag tray is lit amber
**Misconception to break:** Writing 1.65 L, as if 65 mL were 65 hundredths of a litre, which puts 650 mL in the flask.

## Delight
On the third phase, when the Cut handle drops into the right gap, the row splits in two and the metres half and the centimetres half slide apart into two green cards, each with its own unit tag already clipped on.

**General miss line:** Look at the two pins. How many places apart are they?

## Answer key
Count the places from the unit you have to the unit you want. Each place to the left divides the number by 10, so one place divides by 10, two by 100 and three by 1000. A mixed measure is written as one decimal in the larger unit, with a zero holding any empty place after the point. A measure can be split into two units at a unit's column. Every decimal is written with the unit it is in.

## Student controls
- **Digit tiles**: set the given measure one digit to a column
- **Want pin**: is dragged to the unit you want
- **Hop**: moves the point one column left, dividing the number by 10
- **Cut handle**: splits a measure into two units at a unit's column
- **Unit tag**: clips a unit name onto the decimal
- **Number pad**: types a number or a decimal

## State fields (getState, a resume contract)
phase, row, digits, have, want, hops, cut, unit_tag, answer, complete

## Textbook (this topic)
**Pages:** 136, 137, 138
**Key terms:** convert, place, decimal point, mixed measure, thousandths, decimetre
A smaller unit becomes a bigger one by counting the places from the unit you have to the unit you want and dividing the number by 10 for each place to the left. Count the places from the unit you have to the unit you want. From cm to m is two places to the left. Each place to the left divides the number by 10, so divide by 100 in all. So 347 cm is 3.47 m. 1000 g make 1 kg, so 45 g is 45 thousandths of a kilogram. Write it with three places after the point, which gives 0.045 kg. So 6 kg 45 g is 6.045 kg. The zero after the point holds the tenths place open. 10 dm make 1 m. Split the measure: 538 dm is 530 dm and 8 dm. 530 dm is 53 m. So 538 dm is 53 m 8 dm. 40 mL is 40 thousandths of a litre. So 3 L 40 mL is 3.040 L, which is 3.04 L. Always write the unit with the decimal. Read in millilitres, the same digits would be a few drops, not a jugful.
