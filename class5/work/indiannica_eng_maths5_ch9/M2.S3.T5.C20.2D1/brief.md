# M2.S3.T5.C20.2D1 · measure_comparer · Same-Unit Comparer
indiannica_eng_maths5_ch9 · indiannica_eng_maths5_ch9_v2 v2 (active) · "Measurements" · segment M2.S3 "Which Is More?" · topic M2.S3.T5 "Comparing and Ordering Measures" · printed p.138 to p.140

> Runtime supplies the standard chrome (bands, zones, header, runs box, slot + pad, bubble, phase bar, type scale, content colours, sounds, finished/idle/restart). `scaffold` puts each phase's concept, teach line, hint ladder, closing line and items into tool.tsx; they are not repeated here. Build the working area and the mechanics.

## What it is
**Description:** Put every measure in the same unit first, then compare two measures, find equal ones, find by how much one is more, and put four in order.
**Why:** Compare measures by writing them in the same unit first, tell when two are equal, find by how much one is more, and put several in ascending or descending order.
**Look:** Measure cards along the top, and below them bars standing against one scale once the cards share a unit.
**Context:** Grade 5, the pages on comparing different measures. An adult sees a comparison of two numbers. What the pages are doing is refusing to compare until both measures are in the same unit, because the bigger number is not always the bigger measure.
**For the child:** Press Same unit first. Then compare the bars, find equal ones, lay one over another to see by how much, or drag them into order.
**Teaching notes:** Nothing is compared until both measures are in the same unit; the smaller unit keeps every number whole. Line the numbers up in one unit and then use the signs. When a question asks by how much, take the smaller from the larger in the same unit and name the unit of the difference. Check the zeros inside a mixed measure: 1 kg 4 g is 1004 g, not 1400 g.
**Placement:** Explore
**Also mounted in:** M2.S3.T5

## Look
**Chrome:** dim #9AA4AC · ink #2B2B2B · rule #C9BCA6 · panel #F2E4CE · paper #FFFDF7 · accent #5B6770
**Voice:** rate 0.92, pitch 1.06 · figure: None

## Stage (tool-specific layout)
Three bands across 1600 by 900. The header runs 0 to 80 and is one line only: 'Same-Unit Comparer' in ink at the far left, a small dot set clear of the name, the phase title beside the dot on the same line, the host's navigation, and sound and restart as three round controls at the far right. The canvas runs 92 to 746, one rounded card on the paper colour. At its top left, at x 64, y 108 and 330 by 76, sits the running count: the number of measures put in the same unit. It is never a score. The working area is 1086 by 528 at x 64, y 202. The measure cards lie in a row across the top of the area at y 230, each 220 by 90, in deep blue, labelled Given, each in the form the question wrote it. The Same unit button stands at x 900, y 230, with a violet Unit fact beside it that names the link between the two units. Pressed, it rewrites each card in the smaller unit of the pair and stands each up as a bar rising from one baseline along y 700, the bars 120 wide and drawn to one scale, the rewritten measures green, labelled Same measure, above each bar. The sign slot sits between two bars at y 450 and takes less than, greater than or equals. On the third phase the Take away button stands at x 900, y 330, and pressed it lays the shorter bar over the longer, the covered part rose, labelled Taken away, and the part that sticks out green, labelled Answer, with its unit. On the fourth phase a shelf runs along y 700 from x 120 to x 1060, and the bar being dragged is amber. Down the right of the canvas, in the same rectangle on every phase and never animated in or out, the question sits above the answer slot at x 1186, y 250 (356 by 92) that holds what the child has given, and under it the pad at x 1170, y 368 (388 by 363). The pad is ten number keys with a point key, a delete key, and a key for each unit of the pair. The footer runs 758 to 900: the voice caption at the far left with its speaking dot beside it, measuring its own wrap and dropping a type size rather than spilling, and the phase bar at the right with the question count under it. There is no sidebar and no score box anywhere, and nothing is ever written over the working area. Content colours are the chapter's own, and the nine tools of this chapter share them. The measure the question gives, in the unit it is given in, is deep blue, labelled Given or Measure. The measure the working reaches, and a reading on a scale, is green, labelled Answer, Reading or Same measure. The places moved across the unit chart, and the worth of one small mark on a scale, are vermilion, labelled Move or One mark. A unit fact, the unit names on the chart and the other temperature scale are violet, labelled Unit fact, Unit or Other scale. The part taken away, and a part left over after sharing, are rose, labelled Taken away or Left over. The unit, column, mark or step being worked on now is amber. Grey is kept for a zero holding a place open inside a number, labelled Place holder, and for nothing else. Rulers, tapes, jugs, scales, thermometer tubes, chart lines, arrows, operation signs and step labels are near-black ink, and anything dimmed fades to half strength. Chrome never borrows one of the content colours, and each reading survives with the colour taken away, because a part is told by its written label before it is told by its colour.

## Opening (first frame of every mount)
Every mount comes up already furnished for its phase with nothing yet compared. On the first phase two cards lie across the top, one a mixed measure and one in grams, with the Same unit button beside them. On the second two cards lie there, a mixed measure and a length in centimetres. On the third two capacity cards lie there with the Take away button waiting. On the fourth four weight cards in mixed forms lie above an empty shelf. One thing moves, once: the Same unit button gives one slow pulse while the voice speaks its opening line.

## Phases (what each mount shows and does; the words are in tool.tsx)

### 1 · Same unit first
**Screen:** two cards, one a mixed measure and one in grams, and the Same unit button
**Does:** presses Same unit, reads both bars, and sets the sign between them
**Win:** the sign clicks between the two bars, and the taller bar's card turns green
**Feels:** two bars rising from one baseline and one plainly standing taller
**Goal:** write both measures in the same unit, then compare the numbers
**Observe:** A card with a bigger number stood as the shorter bar.
**Wrong (each is a traceback on the working area):**
- sets the greater than sign before pressing Same unit, choosing the card with the bigger-looking number → the sign stays where the child set it, and the bars stand up beside it so the child sees which is taller, with the Same unit button lit amber
- compares only the kilograms part of the mixed measure with the other card → the grams part of the mixed card is lit amber, and its bar grows by that part in steps while the child's sign stays
**Misconception to break:** Choosing 3 kg 90 g because it has kilograms in it, without writing both in grams first.

### 2 · Equal measures
**Screen:** two cards, a mixed measure and the same length in centimetres
**Does:** presses Same unit and sees the two bars stand level, then sets the equals sign
**Win:** the two bars stand exactly level, and the equals sign turns green
**Feels:** two different-looking cards standing exactly level
**Goal:** two measures in different forms are equal when they are the same in the same unit
**Observe:** Two cards that looked quite different stood exactly level.
**Wrong (each is a traceback on the working area):**
- sets less than because the two cards look different → the sign stays, and the two bars stand up beside it exactly level, with the equals sign lit amber in the tray
- picks the option whose digits follow the mixed measure's digits in order → the chosen card stands up as a bar beside the mixed measure's bar, the two tops seen apart, and the chosen card is lit amber
**Misconception to break:** Reading 6 m 5 cm as sixty-five centimetres by leaving out the zero, and so calling the two lengths different.

### 3 · By how much
**Screen:** two capacity cards and the Take away button
**Does:** puts both in the same unit, presses Take away, and types the difference with its unit
**Win:** the rose part is covered, and the part that sticks out turns green with its unit
**Feels:** the shorter bar sliding over the longer and the leftover part lighting up
**Goal:** to find by how much, take the smaller from the larger in the same unit
**Observe:** Only the part that stuck out past the shorter bar was the difference.
**Wrong (each is a traceback on the working area):**
- presses Take away while the two cards are still in different units → the two bars cannot be laid over each other and stand apart, each with its own unit lit amber, until Same unit is pressed
- types the difference without its unit → the difference waits in the slot uncoloured, and the unit keys on the pad are lit amber
**Misconception to break:** Taking 475 from 640 and ignoring the litres, which answers a different question.

### 4 · Putting measures in order
**Screen:** four weight cards in mixed forms and an empty shelf
**Does:** presses Same unit, then drags the four bars along the shelf into order
**Win:** the four bars rise like steps along the shelf, and the order turns green
**Feels:** four bars rising like steps along the shelf
**Goal:** put every measure in the same unit, then order them from smallest to largest or the other way
**Observe:** Once the bars were up, putting them in order was just reading their heights.
**Wrong (each is a traceback on the working area):**
- drags the bars into order by the first number printed on each card → the order stays on the shelf, and each card's same measure in grams is shown above its bar so the two out of step are seen, lit amber
- builds descending order when ascending is asked → the bars stay as the child set them, falling like steps, and the word Ascending is written in ink above the shelf with an arrow rising to the right
**Misconception to break:** Ordering by the digits as they look and placing 1 kg 4 g last, because 4 g was read as the most grams.

## Delight
On the fourth phase, when the last bar drops into place, the four bars rise along the shelf like steps, and a small ball rolls up them from the shortest to the tallest.

**General miss line:** Are they in the same unit yet? Press Same unit and look again.

## Answer key
Write every measure in the same unit before comparing. Then compare the numbers: the larger number in the same unit is the larger measure. Two measures are equal when they are the same in the same unit. To find by how much, take the smaller from the larger in the same unit. Ascending order goes from smallest to largest, and descending order from largest to smallest.

## Student controls
- **Same unit**: rewrites every card in the smaller unit and stands it up as a bar
- **Sign slot**: takes less than, greater than or equals between two bars
- **Take away**: lays the shorter bar over the longer to show the difference
- **Bar drag**: moves a bar along the shelf into order
- **Number pad**: types a measure or a difference

## State fields (getState, a resume contract)
phase, cards, same_unit, sign, difference, order, answer, complete

## Textbook (this topic)
**Pages:** 138, 139, 140
**Key terms:** compare, same unit, ascending order, descending order, difference
Two measures are compared by writing both in the same unit first, then comparing the numbers, putting them in order and finding by how much one is more. Write both measures in the same unit first, then compare the numbers. To find by how much one is more, take the smaller from the larger. Smallest to largest is ascending order, and largest to smallest is descending order. First write both in the same unit. 4 m 35 cm is 435 cm. 435 < 438, so 438 cm is longer. 4 kg is 4000 g, so 4 kg 300 g is 4300 g. Both are 4300 g in the same unit. So they weigh the same. 1 L 380 mL is 1380 mL. 1450 > 1380, so the bottle holds more. 1450 - 1380 = 70, so the bottle holds 70 mL more. Write all four in grams: 3080 g, 3250 g, 3800 g and 3008 g. Then compare: 3008 < 3080 < 3250 < 3800. In ascending order they are 3008 g, 3 kg 80 g, 3250 g and 3 kg 800 g.
