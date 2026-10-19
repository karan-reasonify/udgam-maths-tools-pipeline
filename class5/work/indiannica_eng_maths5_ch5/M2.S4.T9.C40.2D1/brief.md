# M2.S4.T9.C40.2D1 · decimal_comparer · Decimal Comparer
indiannica_eng_maths5_ch5 · indiannica_eng_maths5_ch5_v2 v2 (file) · "Decimals" · segment M2.S4 "Like Decimals and Comparing" · topic M2.S4.T9 "Comparing and Ordering Decimals" · printed p.82 to p.83

> Runtime supplies the standard chrome (bands, zones, header, runs box, slot + pad, bubble, phase bar, type scale, content colours, sounds, finished/idle/restart). `scaffold` puts each phase's concept, teach line, hint ladder, closing line and items into tool.tsx; they are not repeated here. Build the working area and the mechanics.

## What it is
**Description:** Compare decimals place by place from the whole number parts, see the first place that differs decide, and put decimals in ascending or descending order.
**Why:** Compare two decimals by their whole number parts and then place by place, and arrange decimals in ascending or descending order.
**Look:** Two decimal cards with their points in one line over a place strip, bars to scale on a tape under them, and an ordering ladder on the last phase.
**Context:** Grade 5, the pages on comparing and ordering decimals. An adult sees two rules. What the pages are doing is comparing place by place from the left, the whole number parts first, so the first place that differs decides and more digits after the point is not more. Writing zeros to make like decimals is a help for the eye, not a rule.
**For the child:** Compare the whole numbers first. Then compare place by place from the tenths. The first place that differs decides.
**Teaching notes:** Look at the whole number parts first; if they differ, the comparison is over. Then compare place by place from the tenths, and the first place that differs decides. More digits after the point does not mean greater: set nine tenths beside three hundred forty-five thousandths on two grids. Writing zeros to make like decimals helps the eye line the places up, and it is a help, not a rule. When ordering, write the sign between every pair.
**Placement:** Explore
**Also mounted in:** M2.S4.T9

## Look
**Chrome:** dim #9AA4AC · ink #2B2B2B · rule #C9BCA6 · panel #F2E4CE · paper #FFFDF7 · accent #5B6770
**Voice:** rate 0.92, pitch 1.06 · figure: None

## Stage (tool-specific layout)
Three bands across 1600 by 900. The header runs 0 to 80 and is one line only: 'Decimal Comparer' in ink at the far left, a small dot set clear of the name, the phase title beside the dot on the same line, the host's navigation, and sound and restart as three round controls at the far right. The canvas runs 92 to 746, one rounded card on the paper colour. At its top left, at x sixty-four, y 108 and 330 by 76, sits the running count: how many places have been compared so far, counting from the left. It is never a score. The working area is 1086 by 528 at x sixty-four, y 202. The two cards stand at x 110, y 230 and y 320, each 520 wide and 76 tall, their large near-black points on one vertical line at x 330, the digits deep blue, over a place strip at y 410. A pair that matches fades to half strength; the first pair that differs lights amber, labelled Decides, and the sign is written green between the cards at x 680. The tape runs along y 500 from x 110 to x 1030, marked in ones and tenths, with one bar for each card drawn to scale above it. The Make like button sits at x 720, y 230; zeros it writes are violet, labelled Added zero. On the last phase the ordering ladder of four rungs fills the lower half from y 420, each rung 520 wide, with a slot for the sign between every pair and the Ascending and Descending switch at x 720, y 440. Down the right of the canvas, in the same rectangle on every phase and never animated in or out, the question sits above the answer slot at x 1186, y 250 (356 by 92) that holds what the child has given, and under it the pad at x 1170, y 368 (388 by 363). The pad is twelve number keys three across with a point key and the two sign keys, for setting a decimal or typing the greater decimal, a sign or an order into the answer slot. The footer runs 758 to 900: the voice caption at the far left with its speaking dot beside it, measuring its own wrap and dropping a type size rather than spilling, and the phase bar at the right with the question count under it. There is no sidebar and no score box anywhere, and nothing is ever written over the working area. Content colours are the chapter's own, and the tools of this chapter share them. A decimal or fraction the question gives is deep blue, with the shaded parts that show it. The result the working reaches, a decimal, a fraction, a sum, a difference or what is left, is green, with its shaded parts. Ten of one place traded for one of the next, a carry in adding or a trade in taking away, is vermilion. A zero written after the point to line decimals up is violet, and so is the point written after a whole number before those zeros. The part taken away, used or poured out is rose. The digit, place or step being worked on now, and the first place where two decimals differ, are amber. A zero holding a place open inside a number is grey, and nothing else on the stage is ever grey. An unshaded part stays warm white inside its near-black outline, the decimal point is near-black ink, and anything dimmed fades to half strength rather than turning grey. Chrome never borrows one of them, and each of those readings survives with the colour taken away, because a part is told by its written label, Given, Answer, Carry, Trade, Added zero, Taken away, Left or Place holder, before it is told by its colour.

## Opening (first frame of every mount)
Every mount comes up already furnished for its phase with two decimal cards standing one above the other, their points in one line, and the bars drawn to scale on the tape under them. Nothing is lit. On the fourth phase the cards wait in a row above the empty ordering ladder instead. One thing moves, once: the Compare button, or the first card over the ladder, gives one slow pulse while the voice speaks its opening line, and a finger on it is the whole way in.

## Phases (what each mount shows and does; the words are in tool.tsx)

### 1 · Whole number parts first
**Screen:** 12.3 above 9.87, their points in one line, and nothing lit
**Does:** taps Compare, watches the whole number parts light, and taps the greater card
**Win:** twelve and nine light amber at once, the sign reads 12.3 > 9.87, and the digits after the point are never lit
**Feels:** the comparison settling before the point is even reached
**Goal:** when the whole number parts differ, the greater whole number part decides
**Observe:** When the whole numbers differed, nothing after the point was ever lit.
**Wrong (each is a traceback on the working area):**
- picks the decimal with more digits after the point → the whole number parts light amber and the bars on the tape are redrawn to scale, the child's choice lit beside the longer bar
- compares the last digits first → the Compare button lights the leftmost pair first, and the child's pair stays outlined further along
**Misconception to break:** Choosing 8.96 because it has more digits and bigger digits after the point, though its whole number part is smaller.

### 2 · Then tenths, then hundredths
**Screen:** 4.72 above 4.8, their points in one line, and the Make like button unlit
**Does:** taps Compare, watches the ones match and fade, and reads the tenths
**Win:** the tenths seven and eight light amber, the sign reads 4.8 > 4.72, and the Make like button was never needed
**Feels:** the matching ones fading and the tenths deciding
**Goal:** when the whole number parts are equal, the first place after the point that differs decides
**Observe:** Matching places faded, and the comparison stopped at the first pair that differed.
**Wrong (each is a traceback on the working area):**
- reads the digits after the point as whole numbers and picks the bigger one → the tenths pair lights amber and the bars are redrawn to scale, and the Make like button pulses once to offer its zeros as a help
- thinks the comparison cannot be made until zeros are written → the Compare button walks the places without any zeros, and the sign is written all the same
**Misconception to break:** Choosing 6.38 because 38 is more than 4, which compares the digits after the point as whole numbers.

### 3 · More digits is not more
**Screen:** 0.9 above 0.345, and the two bars on the tape drawn to scale
**Does:** compares the tenths and checks the bars
**Win:** nine tenths beats three tenths, the sign reads 0.9 > 0.345, and the bar for 0.9 is the longer
**Feels:** the long decimal's bar coming up short
**Goal:** a decimal with more digits after the point is not greater for that
**Observe:** The longer decimal sometimes had the shorter bar.
**Wrong (each is a traceback on the working area):**
- picks the longer decimal because it has more digits → the two bars on the tape redraw to scale, and the longer decimal's bar is seen to stop first
- writes zeros on the shorter decimal and then compares the digits as whole numbers → the tenths pair lights amber and Decides is written over it, the rest of the digits fading
**Misconception to break:** Choosing 0.625 because it is longer, which counts digits instead of comparing places.

### 4 · Putting decimals in order
**Screen:** 2.07, 2.7 and 2.075 in a row, and the ordering ladder empty
**Does:** compares pairs, drags each card onto a rung, then flips the switch
**Win:** the ladder reads 2.07 < 2.075 < 2.7, and flipped it reads 2.7 > 2.075 > 2.07
**Feels:** the cards clicking into order with a sign between every pair
**Goal:** decimals are put in ascending or descending order by comparing them place by place
**Observe:** The comparison came out the same with or without the Make like zeros.
**Wrong (each is a traceback on the working area):**
- orders by the number of digits → each pair's first differing place lights amber on the ladder, and the sign slot between them waits
- puts the greatest first when ascending order is asked → the Ascending and Descending switch lights its word, and the smallest card's rung is outlined
**Misconception to break:** Putting 3.009 first because it has the most digits, which is the ascending end, not the descending one.

## Delight
On the third phase, when the tenths decide, the bar of the longer decimal shrinks back beside the other with a soft slide, as if it had been caught standing on its toes.

**General miss line:** Start from the left. Which place is the first to differ?

## Answer key
Compare the whole number parts first; the greater whole number part is the greater decimal. If they are the same, compare the tenths, then the hundredths, then the thousandths: the first place that differs decides. More digits after the point does not make a decimal greater. Writing zeros to make like decimals can help line the places up; it is a help, not a rule. Ascending order runs from the smallest to the greatest, and descending order from the greatest to the smallest.

## Student controls
- **Compare button**: lights the digits of one place at a time from the left and stops at the first pair that differs
- **Bars on a tape**: draw the two decimals to scale under their cards
- **Make like button**: writes zeros after the point on the shorter decimal, as a help
- **Ordering ladder**: takes cards by drag and writes a sign between every pair
- **Ascending and Descending switch**: sets which way the ladder runs
- **Number pad**: sets any decimal with up to three places

## State fields (getState, a resume contract)
phase, cards, compared, decides, like, ladder, direction, answer, complete

## Textbook (this topic)
**Pages:** 82, 83
**Key terms:** compare, whole number part, tenths, hundredths, ascending order, descending order
Decimals are compared by their whole number parts first, then tenths, then hundredths, and put in ascending or descending order. Compare the whole number parts first, then the tenths, then the hundredths. The first place that differs decides, and more digits do not make a decimal greater. Ascending order puts the smallest first, and descending order puts the greatest first. Compare the whole number parts first. 12 > 9, so 12.3 > 9.87. When the whole number parts differ, the digits after the point do not matter. The whole number parts are equal, so compare the tenths. 8 tenths is more than 7 tenths, so 4.8 > 4.72. Writing 4.8 as 4.80 can help, but it is not needed. The zeros are a help, not a rule. 0.345 has more digits, but that does not make it greater. Compare the tenths: 9 tenths is more than 3 tenths. So 0.9 > 0.345. As like decimals they are 2.070, 2.700 and 2.075. Compare them place by place. Ascending order, smallest first, is 2.07 < 2.075 < 2.7. Descending order is the other way round.
