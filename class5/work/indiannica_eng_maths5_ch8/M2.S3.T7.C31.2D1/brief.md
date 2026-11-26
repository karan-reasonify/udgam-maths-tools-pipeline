# M2.S3.T7.C31.2D1 · part_squares · Part Squares
indiannica_eng_maths5_ch8 · indiannica_eng_maths5_ch8_v3 v3 (active) · "Perimeter, Area, and Volume" · segment M2.S3 "Working With Area" · topic M2.S3.T7 "Squares on the Edge" · printed p.128 to p.129

> Runtime supplies the standard chrome (bands, zones, header, runs box, slot + pad, bubble, phase bar, type scale, content colours, sounds, finished/idle/restart). `scaffold` puts each phase's concept, teach line, hint ladder, closing line and items into tool.tsx; they are not repeated here. Build the working area and the mechanics.

## What it is
**Description:** Number the whole squares inside a traced shape, mark each part square by its kind, pair the half squares, and give the area as an estimate with about.
**Why:** Estimate the area of a curved or irregular shape on squared paper: number the whole squares, count a square more than half covered as one and leave out one less than half covered, pair the half squares, and give the total with about.
**Look:** A traced outline on squared paper with every square it touches waiting to be marked, and a tally card at the right that ends on about.
**Context:** Grade 5, the pages on the area of irregular shapes and Exercise 8.3. An adult sees a counting rule. What the pages are doing is estimating: whole squares are counted, part squares are rounded to one or to nothing by a rule, and the total is an estimate of the area, not the exact area. A figure drawn along the grid lines has no part squares and needs no estimate.
**For the child:** Number the whole squares. Mark each part square by its kind. Pair the halves. Say about.
**Teaching notes:** Trace something real, a leaf or a hand, on squared paper before the tool opens. Number the whole squares as they are counted. Mark each part square by its kind, in words or with a letter; a cross is never used for a square that is counted. Two halves make one whole, and a square cut from corner to corner is cut exactly in half. Say about with every answer from counting part squares: it is an estimate, not the exact area. A figure drawn along the grid lines needs no estimate; count every square, or multiply. The printed figures are the child's to count.
**Placement:** Explore
**Also mounted in:** M2.S3.T7

## Look
**Chrome:** dim #9AA4AC · ink #2B2B2B · rule #C9BCA6 · panel #F2E4CE · paper #FFFDF7 · accent #5B6770
**Voice:** rate 0.92, pitch 1.06 · figure: None

## Stage (tool-specific layout)
Three bands across 1600 by 900. The header runs 0 to 80 and is one line only: 'Part Squares' in ink at the far left, a small dot set clear of the name, the phase title beside the dot on the same line, the host's navigation, and sound and restart as three round controls at the far right. The canvas runs 92 to 746, one rounded card on the paper colour. At its top left, at x 64, y 108 and 330 by 76, sits the running count: the number of squares marked. It is never a score. The working area is 1086 by 528 at x 64, y 202. The squared paper fills a box 640 by 440 at x 120, y 230, each cell 40 across, with the traced outline in near-black ink. A whole square takes its number in violet, labelled Unit square. A square more than half inside turns rose with the words More than half written in it; a square cut in half turns a paler rose with the word Half; a square less than half inside stays warm white with the words Less than half in small ink. No square is ever marked with a cross. The Pair button stands at x 820, y 250, and a pair is drawn as a thin ink bracket joining two Half squares. The tally card stands at x 820, y 330, 280 by 300, with the lines Whole, More than half, Half pairs and Left out, and a total line that begins with the word about. The estimate reached is green. Down the right of the canvas, in the same rectangle on every phase and never animated in or out, the question sits above the answer slot at x 1186, y 250 (356 by 92) that holds what the child has given, and under it the pad at x 1170, y 368 (388 by 363). The pad is ten number keys with an sq. cm key. The footer runs 758 to 900: the voice caption at the far left with its speaking dot beside it, measuring its own wrap and dropping a type size rather than spilling, and the phase bar at the right with the question count under it. There is no sidebar and no score box anywhere, and nothing is ever written over the working area. Content colours are the chapter's own, and the ten tools of this chapter share them. The lengths the question gives, as a side, a length, a breadth, a height, an edge or a base area, are deep blue, labelled Given or by their own name. The perimeter, area, volume or missing side the working reaches is green, labelled Answer. The boundary that a perimeter walks round is vermilion, labelled Boundary. The unit being counted, one unit square, one unit cube, one row or one layer, is violet, labelled Unit square, Unit cube, Row or Layer. The part squares of an estimate and the space left over where no whole cube fits are rose, labelled More than half, Half or Left over. The side, square, cube, layer or step being worked on now is amber. Grey is kept for a zero holding a place open, and nothing on this stage is ever grey. A square or cube that is not being counted stays warm white inside its near-black outline, grid lines, unit words and signs are near-black ink, and anything dimmed fades to half strength. Chrome never borrows one of them, and each reading survives with the colour taken away, because a part is told by its written label before it is told by its colour.

## Opening (first frame of every mount)
Every mount comes up already furnished for its phase with nothing yet marked. On the first phase a traced leaf lies on squared paper with its whole squares blank. On the second the same leaf's edge squares wait unmarked. On the third a shape lies whose outline cuts squares in half, with the Pair button beside it. On the fourth a traced hand lies with its squares already marked and the tally card waiting. One thing moves, once: the first square to be tapped, or the tally card on the fourth phase, gives one slow pulse while the voice speaks its opening line.

## Phases (what each mount shows and does; the words are in tool.tsx)

### 1 · Trace and count
**Screen:** a traced leaf with rows of 2, 7, 5 and 4 whole squares inside it, none numbered
**Does:** taps each whole square in turn, row by row, and types the last number written
**Win:** the last whole square reads 18, and the tally's Whole line reads 18
**Feels:** the numbers marching across the leaf row by row
**Goal:** count the whole squares inside an outline first, numbering each one so none is counted twice
**Observe:** Numbering each whole square as it was tapped meant none was tapped twice.
**Wrong (each is a traceback on the working area):**
- taps a whole square that already has a number → the square keeps its first number, and that number is lit amber for a moment while the running count stays as it was
- taps an edge square as whole → the edge square is shaded to show how much of it lies inside, the uncovered sliver is lit amber, and the child's mark stays
**Misconception to break:** Counting a square again at the start of the next row, because it was not numbered.

### 2 · More than half or less than half
**Screen:** the leaf's edge squares, ten of them, none marked
**Does:** taps each edge square to mark it More than half or Less than half, in words
**Win:** seven squares read More than half and count as seven, and three read Less than half and stay out of the tally
**Feels:** each edge square being weighed by eye and sorted
**Goal:** a square more than half covered counts as one whole square, and one less than half covered is left out
**Observe:** Some edge squares were mostly inside the line and some were mostly outside.
**Wrong (each is a traceback on the working area):**
- marks every square the outline touches as More than half → the square in question is shaded to show how much of it lies inside, and the part outside the line is lit amber while the child's mark stays
- marks a square that is mostly inside as Less than half → the part of the square inside the line is shaded and measured against a half line drawn across the square in ink
**Misconception to break:** Counting every square the outline touches, which makes the area too big.

### 3 · Two halves make one
**Screen:** a shape whose outline cuts ten squares exactly in half, two of them from corner to corner
**Does:** marks each one Half, then taps Pair until every half has a partner
**Win:** five pairs are bracketed, and the tally's Half pairs line reads five
**Feels:** two halves clicking together into one whole
**Goal:** two half squares count as one whole square. A square cut from corner to corner is cut exactly in half
**Observe:** Two Half squares joined by a bracket made one whole on the tally.
**Wrong (each is a traceback on the working area):**
- adds each Half square to the tally as one whole → two Half squares are bracketed in steps and the tally's Half pairs line counts them as one, while the child's number stays in the slot
- marks a square cut from corner to corner as More than half → the square is folded along the cut in steps, and the two halves are shown lying one on the other, the same size
**Misconception to break:** Counting each half square as a whole one, which counts the halves twice over.

### 4 · An estimate, not exact
**Screen:** a traced hand with its squares all marked: 21 whole, 9 more than half and 6 half
**Does:** checks the tally, pairs the halves, and types the total
**Win:** the total line reads about 33 sq. cm in green, with the word estimate under it
**Feels:** the tally adding up and the word about landing in front of it
**Goal:** add the kinds by the rules, and say the total with about, because it is an estimate
**Observe:** The total line always started with about.
**Wrong (each is a traceback on the working area):**
- adds the Left out squares into the total → the Left out line dims to half strength, and the total is rebuilt in steps from the other three lines beside the child's number
- types the total without saying about → the child's number stays in the slot, and the word about is lit amber at the front of the total line
**Misconception to break:** Calling the count the exact area, though the part squares were only rounded, so it is not exact.

## Delight
On the fourth phase, when the total lands, the word about gives a small bow before it, and the traced hand gives a little wave.

**General miss line:** Look at that square again. How much of it is inside the line?

## Answer key
Count the whole squares inside the outline first, numbering each one, so none is counted twice. A square more than half covered counts as 1 whole square. A square less than half covered is left out. Two half squares count as 1 whole square. A square cut from corner to corner is cut exactly in half. Add the whole squares, the more-than-half squares and the half squares paired. The total is an estimate, not the exact area, so say about. A figure drawn along the grid lines has no part squares, so its count is its area.

## Student controls
- **Square tap**: marks a square as Whole, More than half, Half or Less than half, in words
- **Pair button**: joins two Half squares and counts them as one whole
- **Tally card**: keeps the count of each kind and a total that begins with about
- **Outline picker**: chooses a traced leaf, hand, stone or cup, or a figure along the grid lines
- **Number pad**: types a count or an area in sq. cm

## State fields (getState, a resume contract)
phase, outline, marks, whole, more_than_half, half, left_out, pairs, answer, complete

## Textbook (this topic)
**Pages:** 128, 129
**Key terms:** whole squares, more than half, less than half, half squares, estimate, about
The area of a curved or irregular shape is estimated on squared paper: whole squares, more-than-half squares as one, two halves as one, and less than half left out. The area of a curved shape is found on squared paper by counting squares. A whole square counts as 1, a square that is more than half covered counts as 1, and a square that is less than half covered is left out. Two half squares make 1 whole square. The answer is an estimate, not the exact area, so it is said as about. The whole squares inside the outline are easy. Count them first, and number each one as you go. Then no square is counted twice. A square that is more than half covered counts as 1 whole square. A square that is less than half covered is left out. Mark each kind in words, so the count stays clear. Two half squares count as 1 whole square. So 6 half squares make 3 whole squares. A square cut from corner to corner is also cut exactly in half. The 6 more-than-half squares count as 6. The 4 half squares make 2 whole squares. 17 + 6 + 2 = 25, so the leaf is about 25 sq. cm. Counting squares this way gives an estimate, not the exact area.
