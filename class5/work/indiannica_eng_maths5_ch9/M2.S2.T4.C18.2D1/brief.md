# M2.S2.T4.C18.2D1 · bigger_to_smaller · Right Hop Converter
indiannica_eng_maths5_ch9 · indiannica_eng_maths5_ch9_v2 v2 (active) · "Measurements" · segment M2.S2 "Up and Down the Chart" · topic M2.S2.T4 "Bigger Units to Smaller Units" · printed p.138 to p.140

> Runtime supplies the standard chrome (bands, zones, header, runs box, slot + pad, bubble, phase bar, type scale, content colours, sounds, finished/idle/restart). `scaffold` puts each phase's concept, teach line, hint ladder, closing line and items into tool.tsx; they are not repeated here. Build the working area and the mechanics.

## What it is
**Description:** Pin the unit you have and the unit you want, hop the point right one place at a time, and watch the number multiplied by 10 at each hop, with zeros dropping in to hold places.
**Why:** Change a measure from a bigger unit to a smaller one by counting the places from the unit you have to the unit you want and multiplying the number by 10 for each, change a mixed measure bigger part first, keep the zeros that hold places, and write a long road in metres.
**Look:** One row of the unit chart with digit tiles in its columns, two pins, a point that hops right, and grey zeros dropping into empty columns.
**Context:** Grade 5, the pages on converting bigger units into smaller ones. An adult sees zeros being added. What the pages are doing is the same count of places as before, run the other way: each place to the right multiplies the number by 10, and the zeros that appear are places held open.
**For the child:** Pin the unit you have and the unit you want. Hop right once for each place, and multiply the number by 10 each time. Keep every zero that holds a place.
**Teaching notes:** Count the places from the unit you have to the unit you want, then multiply the number by 10 for each place to the right. Change the bigger part of a mixed measure first, then add the smaller part. Check every zero that holds a place open. The road box prints no question, so say plainly that the road question is our own, and keep the page's word over. Write litres in full before is or equals when a sentence is read aloud.
**Placement:** Explore
**Also mounted in:** M2.S2.T4

## Look
**Chrome:** dim #9AA4AC · ink #2B2B2B · rule #C9BCA6 · panel #F2E4CE · paper #FFFDF7 · accent #5B6770
**Voice:** rate 0.92, pitch 1.06 · figure: None

## Stage (tool-specific layout)
Three bands across 1600 by 900. The header runs 0 to 80 and is one line only: 'Right Hop Converter' in ink at the far left, a small dot set clear of the name, the phase title beside the dot on the same line, the host's navigation, and sound and restart as three round controls at the far right. The canvas runs 92 to 746, one rounded card on the paper colour. At its top left, at x 64, y 108 and 330 by 76, sits the running count: the number of hops the point has made. It is never a score. The working area is 1086 by 528 at x 64, y 202. One row of the chart runs across the middle of the area at y 380: seven columns, each 140 wide, from x 90 to x 1070, headed kilo to milli with the base unit in the middle and the unit names violet, labelled Unit. The given measure stands in deep blue digit tiles, labelled Given, with the point in the gap after its unit. The deep blue have pin stands over the unit you have at y 300, and the green want pin is dragged along the same line. The Hop button stands at x 900, y 230, and each hop moves the point one gap to the right and draws a vermilion arrow under the row along y 470, labelled Move, multiply the number by 10. Each column the point passes that holds no digit gets a grey zero, labelled Place holder. On the second and third phases the smaller part's card waits at x 120, y 560 with the Add part button beside it at x 400, y 560, and the column being filled is amber. On the fourth phase the road sign hangs above the row at x 120, y 220, and a second sign appears beside it once the answer is in. The answer is read in green, labelled Answer, at x 120, y 660, with its unit. Down the right of the canvas, in the same rectangle on every phase and never animated in or out, the question sits above the answer slot at x 1186, y 250 (356 by 92) that holds what the child has given, and under it the pad at x 1170, y 368 (388 by 363). The pad is ten number keys with a comma key for grouping and a delete key. The footer runs 758 to 900: the voice caption at the far left with its speaking dot beside it, measuring its own wrap and dropping a type size rather than spilling, and the phase bar at the right with the question count under it. There is no sidebar and no score box anywhere, and nothing is ever written over the working area. Content colours are the chapter's own, and the nine tools of this chapter share them. The measure the question gives, in the unit it is given in, is deep blue, labelled Given or Measure. The measure the working reaches, and a reading on a scale, is green, labelled Answer, Reading or Same measure. The places moved across the unit chart, and the worth of one small mark on a scale, are vermilion, labelled Move or One mark. A unit fact, the unit names on the chart and the other temperature scale are violet, labelled Unit fact, Unit or Other scale. The part taken away, and a part left over after sharing, are rose, labelled Taken away or Left over. The unit, column, mark or step being worked on now is amber. Grey is kept for a zero holding a place open inside a number, labelled Place holder, and for nothing else. Rulers, tapes, jugs, scales, thermometer tubes, chart lines, arrows, operation signs and step labels are near-black ink, and anything dimmed fades to half strength. Chrome never borrows one of the content colours, and each reading survives with the colour taken away, because a part is told by its written label before it is told by its colour.

## Opening (first frame of every mount)
Every mount comes up already furnished for its phase with nothing yet hopped. On the first phase a weight in hectograms sits in the row with the have pin on hectograms and the want pin loose. On the second a capacity's litres part sits in the row and its millilitres part waits on a card beside it. On the third a length's kilometres part sits in the row and its metres part, only two digits long, waits on a card. On the fourth the length row lies under a road sign that reads the road's length in kilometres, with the word over before it. One thing moves, once: the want pin gives one slow pulse while the voice speaks its opening line.

## Phases (what each mount shows and does; the words are in tool.tsx)

### 1 · Places to the right
**Screen:** a weight in hectograms set in the row, the have pin on hg and the want pin loose
**Does:** drags the want pin to g, counts the places, and hops the point right once for each
**Win:** two grey zeros drop in behind the digit, and the grams turn green
**Feels:** the point sliding right and zeros dropping in behind the digit
**Goal:** count the places from the unit you have to the unit you want; each place to the right multiplies the number by 10
**Observe:** Each hop to the right made the number bigger, but the measure on the card stayed the same.
**Wrong (each is a traceback on the working area):**
- hops the point to the left instead of the right → the point stays and the measure is read back in the unit it now sits after, far less than the card shows; the pins light amber and the places between them are counted again one hop at a time
- types the digit and stops, with no zeros after it → the columns the point passed are lit amber inside the answer, one at a time, each waiting for its grey zero
**Misconception to break:** Dividing instead of multiplying, which makes a packet of tea weigh less than a crumb.

### 2 · A mixed measure in the smaller unit
**Screen:** a capacity in litres and millilitres, its litres part set in the row and its millilitres part waiting on a card
**Does:** hops the litres part into millilitres, then slides the millilitres part in with Add part
**Win:** the two parts meet in one row, and the millilitres turn green
**Feels:** two parts in two units meeting in one row as one number
**Goal:** a mixed measure is changed bigger part first, then the smaller part is added
**Observe:** Grey zeros dropped in behind the digits as the point hopped past empty columns.
**Wrong (each is a traceback on the working area):**
- adds the litres number and the millilitres number as they stand → the litres part is lit amber, still in litres, and it hops into millilitres in steps before the millilitres card slides in beside it, while the child's sum stays in the slot
- hops the litres part and types that as the answer → the Add part button is lit amber, with the millilitres card still waiting beside it
**Misconception to break:** Changing only the litres and forgetting to add the 615 mL, which leaves a bucket short.

### 3 · A zero that holds a place
**Screen:** a length in kilometres and metres whose metres part has only two digits
**Does:** changes the kilometres part, adds the metres part, and fills the empty column
**Win:** a grey zero drops into the empty hundreds column, and the answer turns green
**Feels:** a grey zero dropping into the one empty column and the answer settling
**Goal:** a zero holds a place open inside the answer, and without it the measure would be far smaller
**Observe:** The litres part hopped first, and only then did the millilitres slide in beside it.
**Wrong (each is a traceback on the working area):**
- writes the kilometres digit and the two metres digits side by side → each digit is read back in the column it sits in, showing far fewer metres than the card, and the empty hundreds column is lit amber
- puts the zero after the metres digits instead of in front of them → each digit is read back from its column, the metres part is shown as far more than the card, and the hundreds column is lit amber
**Misconception to break:** Writing the digits side by side and leaving out the zero, which reads as eight hundred seventy metres, far too short.

### 4 · A long road in metres
**Screen:** the length row with a road sign reading over 4112 km, the have pin on km
**Does:** drags the want pin to m and hops the point three places right
**Win:** three grey zeros drop in, and a second sign reads the length in metres, still with the word over, in green
**Feels:** a long road turning into an even longer number that still says over
**Goal:** a length of over 4112 km is over 41,12,000 m, found by three places to the right; the road box prints no question, so this is our own question
**Observe:** The second road sign still read over.
**Wrong (each is a traceback on the working area):**
- hops the point only two places right → the point stays and the length is read back in decametres, while the metres column and the one hop still to make are lit amber
- types the length in metres with one zero too few → the columns the point passed light one at a time, and the one left empty is lit amber inside the child's answer
**Misconception to break:** Dropping the word over and saying the road is exactly that long.

## Delight
On the fourth phase, as the third hop lands, three grey zeros drop in one after another like counters, and the second road sign swings down beside the first with the length in metres.

**General miss line:** Count the places between the pins again. Is any column empty?

## Answer key
Count the places from the unit you have to the unit you want. Each place to the right multiplies the number by 10, so one place multiplies by 10, two by 100 and three by 1000. For a mixed measure, change the bigger part into the smaller unit first, then add the smaller part. A zero holds any place inside the answer that has no digit. The road box prints no question, so the road question here is our own: NH44 is over 4112 km long, which is over 41,12,000 m.

## Student controls
- **Digit tiles**: set the given measure one digit to a column
- **Want pin**: is dragged to the unit you want
- **Hop**: moves the point one column right, multiplying the number by 10
- **Add part**: slides the smaller part of a mixed measure into its own columns
- **Number pad**: types the answer

## State fields (getState, a resume contract)
phase, row, digits, have, want, hops, part_added, answer, complete

## Textbook (this topic)
**Pages:** 138, 139, 140
**Key terms:** convert, multiply, place holder, mixed measure, millilitre, centimetre
A bigger unit becomes a smaller one by counting the places from the unit you have to the unit you want and multiplying the number by 10 for each place to the right. Count the places from the unit you have to the unit you want. Each place to the right multiplies the number by ten. Change the bigger part first and then add the smaller part, with a zero holding any empty place. Count the places from kg to g: three places to the right. Each place to the right multiplies the number by 10, so multiply by 1000. 4 x 1000 = 4000, so 4 kg is 4000 g. 1000 mL make 1 litre, so 11 litres is 11 x 1000 = 11,000 mL. Add the 305 mL: 11,000 + 305 = 11,305. So 11 L 305 mL is 11,305 mL. 6 m is 600 cm. Add the 8 cm: 600 + 8 = 608. So 6 m 8 cm is 608 cm. The zero holds the tens place open, and without it the length would be far too short. This is our own question, because the road box prints no question. Kilometres to metres is three places to the right, so multiply by 1000. 4112 x 1000 = 41,12,000. So NH44 is over 41,12,000 m long.
