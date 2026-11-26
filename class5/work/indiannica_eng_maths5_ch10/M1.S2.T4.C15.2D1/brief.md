# M1.S2.T4.C15.2D1 · smaller_to_bigger · Small to Big Converter
indiannica_eng_maths5_ch10 · indiannica_eng_maths5_ch10_v3 v3 (active) · "Time" · segment M1.S2 "Changing Units" · topic M1.S2.T4 "Smaller Units to Bigger" · printed p.151 to p.152

> Runtime supplies the standard chrome (bands, zones, header, runs box, slot + pad, bubble, phase bar, type scale, content colours, sounds, finished/idle/restart). `scaffold` puts each phase's concept, teach line, hint ladder, closing line and items into tool.tsx; they are not repeated here. Build the working area and the mechanics.

## What it is
**Description:** Group a smaller unit of time into piles of 24 or 60, lift each full pile to the bigger unit, keep the remainder in the smaller unit, and regroup a leftover part that is too big.
**Why:** Change hours into days, minutes into hours and seconds into minutes by dividing by 24 or 60 and keeping the remainder in the smaller unit, and regroup a leftover part that is too big.
**Look:** A unit ladder of four rungs, a tray of deep blue blocks, a Group button that sweeps them into piles, and a bundle for a leftover part that is too big.
**Context:** Grade 5, the pages on changing a smaller unit of time into a bigger one. An adult sees a long division with a remainder. What the pages are doing is making the quotient count the bigger unit and the remainder stay in the smaller unit, so the answer has two parts, and making the part left over always fewer than one of the bigger unit.
**For the child:** Set the blocks in the tray. Group them into piles of 24 or 60, lift each full pile up, and read the bigger unit and the blocks left over.
**Teaching notes:** Say the unit fact aloud before every conversion. Divide by 24 for days and by 60 for hours or minutes, and say which unit the quotient counts. The remainder stays in the smaller unit, so say the word remainder and then read the answer. Write a division as a division with its remainder, and the answer after it, never as if the division were equal to an answer in two units. Check by multiplying back and adding the remainder. The part left over is always fewer than one of the bigger unit.
**Placement:** Explore
**Also mounted in:** M1.S2.T4

## Look
**Chrome:** dim #9AA4AC · ink #2B2B2B · rule #C9BCA6 · panel #F2E4CE · paper #FFFDF7 · accent #5B6770
**Voice:** rate 0.92, pitch 1.06 · figure: None

## Stage (tool-specific layout)
Three bands across 1600 by 900. The header runs 0 to 80 and is one line only: 'Small to Big Converter' in ink at the far left, a small dot set clear of the name, the phase title beside the dot on the same line, the host's navigation, and sound and restart as three round controls at the far right. The canvas runs 92 to 746, one rounded card on the paper colour. At its top left, at x 64, y 108 and 330 by 76, sits the running count: the number of piles made. It is never a score. The working area is 1086 by 528 at x 64, y 202. The unit ladder of four rungs, days, hours, minutes and seconds, stands down the left of the area at x 90 from y 230 to y 690, each rung 115 tall, with the unit fact beside each step in violet, labelled Regroup. The tray stands at x 520, y 240, 500 by 260, and the blocks the question gives lie in it in deep blue, labelled Given, in rows of the same length. The Group button stands at x 900, y 230, and each press sweeps the blocks into piles of twenty-four or sixty, each full pile lifting to the next rung up as one bar of the bigger unit. The blocks that cannot fill a pile stay behind in the tray under the smaller rung, amber while the child counts them. The division is written in ink under the ladder along y 620, with its quotient and its remainder, and the answer is read in green, labelled Answer, at x 520, y 680 as the bigger unit and the smaller unit together. On the fourth phase the Bundle button stands at x 900, y 330 and wraps 60 of the leftover minutes into a violet tile, labelled Carry, that is dragged to the hours column. Down the right of the canvas, in the same rectangle on every phase and never animated in or out, the question sits above the answer slot at x 1186, y 250 (356 by 92) that holds what the child has given, and under it the pad at x 1170, y 368 (388 by 363). The pad is ten number keys with a delete key, and keys for days, h, min and s. The footer runs 758 to 900: the voice caption at the far left with its speaking dot beside it, measuring its own wrap and dropping a type size rather than spilling, and the phase bar at the right with the question count under it. There is no sidebar and no score box anywhere, and nothing is ever written over the working area. Content colours are the chapter's own, and the nine tools of this chapter share them. What the question gives, as a clock time, a length of time, a start date or a number of days, is deep blue, labelled Given or Start. What the working reaches, as an end time, a length of time, a converted time or a date, is green, labelled Answer, End or How long. The thin second hand and the seconds it counts are vermilion, labelled Second hand. One jump along a time line, and one regrouped unit carried or borrowed, are violet, labelled Jump, Carry or Regroup. On a day bar the half from noon until just before midnight is rose, labelled p.m., and the half from midnight until just before noon stays warm white inside its outline, labelled a.m. The hand, digit, column, jump or date being worked on now is amber. Grey is kept for a zero holding a place open, labelled Place holder, and for nothing else. The hour hand and the minute hand, dials, tick marks, time lines, arrows, operation signs and step labels are near-black ink, and anything dimmed fades to half strength. Chrome never borrows one of the content colours, and each reading survives with the colour taken away, because a part is told by its written label before it is told by its colour.

## Opening (first frame of every mount)
Every mount comes up already furnished for its phase with nothing yet grouped. On the first phase a tray of deep blue hour blocks lies in rows of the same length beside the ladder, with its days rung empty. On the second the tray holds minute blocks and the hours rung is empty, and on the third it holds second blocks and the minutes rung is empty. On the fourth a length in hours and minutes stands in deep blue with more than sixty minutes in it. One thing moves, once: the Group button or the full pile among the minutes gives one slow pulse while the voice speaks its opening line.

## Phases (what each mount shows and does; the words are in tool.tsx)

### 1 · Hours into days
**Screen:** a tray of hour blocks in deep blue, and the ladder with its days rung empty
**Does:** presses Group to sweep the hour blocks into piles of twenty-four, lifts each full pile to the days rung, and counts the blocks left over
**Win:** the days and the leftover hours are read together and turn green
**Feels:** the blocks sweeping into piles, the piles lifting, and a few blocks staying behind
**Goal:** 1 day is 24 h, so divide the hours by 24; the quotient counts days and the remainder stays in hours
**Observe:** Every full pile of blocks lifted to the bigger rung as one bar.
**Wrong (each is a traceback on the working area):**
- gives the quotient with no remainder, so the leftover hours vanish → the answer stays in the slot, the blocks left in the tray are lit amber under the hours rung, and they are counted in ink as hours
- divides by ten, as on the chart of metric units → the blocks are swept again with twenty-four in each pile, and the child's piles are laid beside them, far too many
**Misconception to break:** Giving the quotient with no remainder, so the leftover hours vanish and only the days are said.

### 2 · Minutes into hours
**Screen:** a tray of minute blocks in deep blue, and the ladder with its hours rung empty
**Does:** sweeps the minute blocks into piles of sixty, lifts each full pile to the hours rung, and counts the blocks left over
**Win:** the hours and the leftover minutes are read together and turn green
**Feels:** piles of sixty lifting to the hours rung one after another
**Goal:** 1 h is 60 min, so divide the minutes by 60; the quotient counts hours and the remainder stays in minutes
**Observe:** The blocks that could not fill a pile stayed in the tray under the smaller rung.
**Wrong (each is a traceback on the working area):**
- divides by a hundred because the number has three digits → the blocks are swept again with sixty in each pile, and the child's piles are laid beside them, far too few
- says the leftover blocks make the hours and the piles make the minutes → the piles are lit amber under the hours rung and the leftover blocks under the minutes rung, each labelled, beside the child's answer
**Misconception to break:** Dividing by 100 because the number has three digits, when an hour is 60 min and not 100.

### 3 · Seconds into minutes
**Screen:** a tray of second blocks in deep blue, and the ladder with its minutes rung empty
**Does:** sweeps the second blocks into piles of sixty, lifts each full pile to the minutes rung, and counts the blocks left over
**Win:** the minutes and the leftover seconds are read together and turn green
**Feels:** piles of sixty lifting to the minutes rung and a few seconds left in the tray
**Goal:** 1 min is 60 s, so divide the seconds by 60; the quotient counts minutes and the remainder stays in seconds
**Observe:** The division was written with its remainder, and the answer was read after it.
**Wrong (each is a traceback on the working area):**
- writes the remainder as a decimal part of a minute → the leftover blocks are counted in ink one at a time as whole seconds in the tray, lit amber under the seconds rung, beside the child's answer
- counts the last short heap as another pile → the last heap is shown short of a full pile, with a gap lit amber at its end, and it stays in the tray
**Misconception to break:** Writing the remainder as a decimal part of a minute, when it is a whole number of seconds.

### 4 · A leftover part too big
**Screen:** a length in hours and minutes whose minutes are 60 or more, in deep blue, with a full pile showing among the minutes
**Does:** bundles 60 of the minutes into a pile, carries it to the hours as a violet tile, and reads the length again
**Win:** the minutes are fewer than sixty and the whole length turns green
**Feels:** sixty small blocks folding into one violet tile and the minutes left settling below sixty
**Goal:** a leftover part of 60 or more is regrouped as one of the bigger unit, so the part left over is always fewer than 60
**Observe:** A leftover part of more than sixty minutes was bundled and carried to the hours.
**Wrong (each is a traceback on the working area):**
- leaves a leftover part of more than sixty minutes as it stands → the full pile hiding among the minutes is outlined amber, and a violet bundle waits beside it, labelled Regroup, ready to be carried
- carries the bundle but forgets to add it to the hours → the carry tile is lit amber where it landed, and the hours column is drawn again with the tile added, beside the child's answer
**Misconception to break:** Leaving 70 min as it stands, because the numbers are right, when the minutes should be fewer than 60.

## Delight
On the fourth phase, as the last bundle is wrapped, sixty small blocks fold into one violet tile that slides across to the hours column, and the minutes left over shrink to fewer than sixty.

**General miss line:** Count the blocks left in the tray again. Do they fill a pile?

## Answer key
To change a smaller unit into a bigger one, divide. 1 day is 24 h, 1 h is 60 min and 1 min is 60 s. The quotient counts the bigger unit and the remainder stays in the smaller unit: 77 divided by 24 is 3, remainder 5, so 77 h is 3 days 5 h. The check is to multiply back and add the remainder. A leftover part of 60 or more is regrouped: 75 min is 1 h 15 min, so 5 h 75 min is 6 h 15 min. The part left over is always fewer than one of the bigger unit.

## Student controls
- **Group**: sweeps the blocks in the tray into piles of 24 or 60
- **Pile drag**: lifts a full pile to the next rung of the ladder
- **Bundle**: wraps 60 of a leftover part into a carry tile
- **Carry tile**: is dragged to the bigger unit's column
- **Number pad**: types a quotient, a remainder or an answer

## State fields (getState, a resume contract)
phase, amount, piles, remainder, carry, answer, complete

## Textbook (this topic)
**Pages:** 151, 152
**Key terms:** convert, divide, remainder, days, hours, minutes
A smaller unit of time becomes a bigger one by dividing by 24 or 60, and the remainder stays in the smaller unit. To change a smaller unit of time into a bigger one, divide by 24 or 60. The whole number counts the bigger unit, and the remainder stays in the smaller unit. If the minutes left over reach 60, carry 1 h. 1 day is 24 h, so divide the hours by 24. 77 divided by 24 is 3, remainder 5. The 3 counts whole days, and the remainder 5 counts hours. So 77 h is 3 days 5 h. 1 h is 60 min, so divide the minutes by 60. 435 divided by 60 is 7, remainder 15. So 435 min is 7 h 15 min. Check it: 7 x 60 + 15 = 435. Divide the seconds by 60. 500 divided by 60 is 8, remainder 20. So 500 s is 8 min 20 s. To convert a smaller unit into a bigger one, divide. No, because 75 min is more than 1 h. 75 min is 1 h 15 min. So 5 h 75 min is 6 h 15 min. Check it: 6 x 60 + 15 = 375. The minutes left over must be fewer than 60.
