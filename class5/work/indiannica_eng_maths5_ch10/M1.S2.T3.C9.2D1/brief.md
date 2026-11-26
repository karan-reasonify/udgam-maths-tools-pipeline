# M1.S2.T3.C9.2D1 · bigger_to_smaller · Big to Small Converter
indiannica_eng_maths5_ch10 · indiannica_eng_maths5_ch10_v3 v3 (active) · "Time" · segment M1.S2 "Changing Units" · topic M1.S2.T3 "Bigger Units to Smaller" · printed p.148 to p.152

> Runtime supplies the standard chrome (bands, zones, header, runs box, slot + pad, bubble, phase bar, type scale, content colours, sounds, finished/idle/restart). `scaffold` puts each phase's concept, teach line, hint ladder, closing line and items into tool.tsx; they are not repeated here. Build the working area and the mechanics.

## What it is
**Description:** Break a bigger unit of time into the next smaller one by multiplying by 24 or 60, add the leftover smaller part, and turn a fraction of an hour into minutes.
**Why:** Change days into hours, hours into minutes and minutes into seconds by multiplying by 24 or 60 and adding the leftover part, and change a fraction of an hour into minutes.
**Look:** A unit ladder of four rungs with deep blue bars on it, a Break down button, a tray for the leftover part and, on the last phase, a bar of one hour cut into sixty cells.
**Context:** Grade 5, the pages on changing a bigger unit of time into a smaller one. An adult sees a multiplication with a sum after it. What the pages are doing is making every conversion a matter of how many of the smaller unit fit into one of the bigger, where the number is 24 or 60 and never 10, and the leftover part is simply added on.
**For the child:** Set the length of time on the ladder. Break each bigger bar into the smaller unit, add the leftover part, and read the answer with its unit.
**Teaching notes:** Say the unit fact aloud before every conversion: 1 day is 24 h, 1 h is 60 min, 1 min is 60 s. Multiply the whole bigger units, then add the leftover smaller part, and say both steps. The answer is a bigger number than the one given, so ask the child to check that it is. A length in hours, minutes and seconds is changed one step at a time. A fraction of an hour is that fraction of 60 min, as the fractions chapter taught. Keep 1 day as 24 h.
**Placement:** Explore
**Also mounted in:** M1.S2.T3

## Look
**Chrome:** dim #9AA4AC · ink #2B2B2B · rule #C9BCA6 · panel #F2E4CE · paper #FFFDF7 · accent #5B6770
**Voice:** rate 0.92, pitch 1.06 · figure: None

## Stage (tool-specific layout)
Three bands across 1600 by 900. The header runs 0 to 80 and is one line only: 'Big to Small Converter' in ink at the far left, a small dot set clear of the name, the phase title beside the dot on the same line, the host's navigation, and sound and restart as three round controls at the far right. The canvas runs 92 to 746, one rounded card on the paper colour. At its top left, at x 64, y 108 and 330 by 76, sits the running count: the number of bars broken down. It is never a score. The working area is 1086 by 528 at x 64, y 202. The unit ladder of four rungs, days, hours, minutes and seconds, stands down the left of the area at x 90 from y 230 to y 690, each rung 115 tall, with the unit fact beside each step in violet, labelled Regroup. The bars the question gives are deep blue, labelled Given, on the rung they use, one for each whole unit, with the leftover smaller part waiting in a small tray at x 520, y 240. The Break down button stands at x 900, y 230, and each press splits every bar of the bigger unit into that many bars of the next rung down, which slide across the working area in rows of the same length. The multiplication is written in ink under the rows along y 620 as the bars are made. The leftover tray is dragged in among the new bars, amber while it is being added, and the total is read in green, labelled Answer, at x 520, y 680 with its unit. On the fourth phase the bar of one hour, 720 wide, lies along y 300 cut into sixty minute cells, and the cells of the fraction the child shades are amber while they are counted. Down the right of the canvas, in the same rectangle on every phase and never animated in or out, the question sits above the answer slot at x 1186, y 250 (356 by 92) that holds what the child has given, and under it the pad at x 1170, y 368 (388 by 363). The pad is ten number keys with a delete key, and keys for days, h, min and s. The footer runs 758 to 900: the voice caption at the far left with its speaking dot beside it, measuring its own wrap and dropping a type size rather than spilling, and the phase bar at the right with the question count under it. There is no sidebar and no score box anywhere, and nothing is ever written over the working area. Content colours are the chapter's own, and the nine tools of this chapter share them. What the question gives, as a clock time, a length of time, a start date or a number of days, is deep blue, labelled Given or Start. What the working reaches, as an end time, a length of time, a converted time or a date, is green, labelled Answer, End or How long. The thin second hand and the seconds it counts are vermilion, labelled Second hand. One jump along a time line, and one regrouped unit carried or borrowed, are violet, labelled Jump, Carry or Regroup. On a day bar the half from noon until just before midnight is rose, labelled p.m., and the half from midnight until just before noon stays warm white inside its outline, labelled a.m. The hand, digit, column, jump or date being worked on now is amber. Grey is kept for a zero holding a place open, labelled Place holder, and for nothing else. The hour hand and the minute hand, dials, tick marks, time lines, arrows, operation signs and step labels are near-black ink, and anything dimmed fades to half strength. Chrome never borrows one of the content colours, and each reading survives with the colour taken away, because a part is told by its written label before it is told by its colour.

## Opening (first frame of every mount)
Every mount comes up already furnished for its phase with nothing yet broken down. On the first phase the ladder holds a length in days and hours as deep blue bars, with the Break down button beside it and the leftover hours waiting in a small tray. On the second the ladder holds a length in hours and minutes, and on the third a length in minutes and seconds. On the fourth a bar of one hour lies whole above the ladder beside a mixed number of hours in deep blue. One thing moves, once: the Break down button or the bar of one hour gives one slow pulse while the voice speaks its opening line.

## Phases (what each mount shows and does; the words are in tool.tsx)

### 1 · Days into hours
**Screen:** the ladder with days and hours, and a length of time in days and hours set in deep blue bars
**Does:** presses Break down to split each day bar into twenty-four hour bars, then drops the leftover hours in and adds
**Win:** the hour bars are counted and the total turns green, with its unit
**Feels:** each bar breaking into a row of shorter bars and the row counting up
**Goal:** 1 day is 24 h, so multiply the days by 24 and add the leftover hours
**Observe:** Every day bar broke into the same number of hour bars.
**Wrong (each is a traceback on the working area):**
- adds the number of days to twenty-four instead of multiplying → the answer stays in the slot, the day bars are broken down one at a time, and the rows of hour bars are counted in ink beside it, far more than the child's total
- breaks each day bar into sixty bars → the child's bars stay, the unit fact for a day is lit in violet beside the days rung, labelled Regroup, and the number of bars a day needs is lit amber
**Misconception to break:** Adding 24 to the number of days instead of multiplying by 24, which gives far too few hours.

### 2 · Hours into minutes
**Screen:** the ladder with hours and minutes, and a length of time in hours and minutes set in deep blue bars
**Does:** splits each hour bar into sixty minute bars, then drops the leftover minutes in and adds
**Win:** the minute bars and the leftover minutes are added and the total turns green
**Feels:** the hour bars breaking into rows of minute bars and the leftover minutes dropping in to make the total
**Goal:** 1 h is 60 min, so multiply the hours by 60 and add the leftover minutes
**Observe:** The leftover minutes dropped in beside the new minute bars and were counted once.
**Wrong (each is a traceback on the working area):**
- multiplies the hours by ten, as on the chart of metric units → the child's number stays, the hour bars are broken into minute bars in steps, and sixty bars are counted in ink for each hour
- leaves the leftover minutes out of the total → the total stays, and the leftover tray is lit amber, still full, beside the minute bars
**Misconception to break:** Leaving out the leftover minutes, and giving only the minutes that the whole hours make.

### 3 · Minutes into seconds
**Screen:** the ladder with minutes and seconds, and a length of time in minutes and seconds set in deep blue bars
**Does:** splits each minute bar into sixty second bars, adds the leftover seconds, and for a length in hours changes to minutes first
**Win:** the second bars and the leftover seconds are added and the total turns green
**Feels:** a chain of bars breaking down twice, from hours to minutes and from minutes to seconds
**Goal:** 1 min is 60 s, so multiply the minutes by 60 and add the leftover seconds; a length in hours can be changed one step at a time
**Observe:** A length in hours turned into minutes before it turned into seconds.
**Wrong (each is a traceback on the working area):**
- changes a length in hours to seconds by multiplying by sixty only once → the hour bars are broken into minute bars, and the minute bars still waiting to be broken into seconds are lit amber beside the child's answer
- multiplies the leftover seconds by sixty as well → the leftover tray stays where the child put it and is lit amber, and the total waits, showing that the leftover seconds are already seconds
**Misconception to break:** Multiplying the leftover seconds by 60 as well, so they are counted many times over.

### 4 · Part of an hour
**Screen:** a bar of one hour cut into sixty minute cells, and a mixed number of hours set in deep blue
**Does:** shades the fraction of the hour's cells, counts them as minutes, and adds them to the minutes in the whole hours
**Win:** the shaded cells and the whole hours are added, and the minutes turn green
**Feels:** the shaded cells counting up as minutes and joining the minutes of the whole hours
**Goal:** a fraction of an hour is that fraction of 60 min, and to change a bigger unit into a smaller one we multiply
**Observe:** The shaded cells of the hour bar were counted as minutes and joined the minutes of the whole hours.
**Wrong (each is a traceback on the working area):**
- puts the two numbers of the mixed number side by side and reads them as minutes → the bar of one hour is cut into sixty cells, the fraction of them is shaded, and the shaded cells are counted in ink beside the child's answer
- gives the minutes of the fraction and leaves out the whole hours → the whole hours are lit amber beside the shaded cells, waiting to be broken into minutes and added
**Misconception to break:** Putting the two numbers of the fraction side by side and taking 3/4 h for 34 min, instead of taking 3/4 of 60.

## Delight
On the first phase, as the Break down button is pressed, each day bar splits into hour bars that slide apart and settle into rows of the same length, and the total counts up in green as the last bar lands.

**General miss line:** Count the new bars again. Did any bar stay unbroken?

## Answer key
To change a bigger unit into a smaller one, multiply. 1 day is 24 h, 1 h is 60 min and 1 min is 60 s. Multiply the whole bigger units by 24 or by 60, then add the leftover smaller part. A length of time in hours, minutes and seconds is changed one step at a time, from hours to minutes and then to seconds. A fraction of an hour is that fraction of 60 min. The answer is a bigger number than the one given, because more of the smaller unit are needed.

## Student controls
- **Unit ladder**: shows the rungs, with the unit fact beside each step
- **Break down**: splits every bar of the bigger unit into bars of the next unit down
- **Leftover tray**: is dragged in among the new bars to be added
- **Fraction shader**: shades a fraction of the sixty minute cells of an hour
- **Number pad**: types a length of time, a product or an answer

## State fields (getState, a resume contract)
phase, amount, rung, bars, leftover, fraction, answer, complete

## Textbook (this topic)
**Pages:** 148, 149, 150, 151, 152
**Key terms:** convert, bigger unit, smaller unit, multiply, hours, minutes, seconds
A bigger unit of time becomes a smaller one by multiplying by 24 or 60, and the leftover smaller part is added on. 1 day is 24 h, 1 h is 60 min and 1 min is 60 s. To change a bigger unit of time into a smaller one, multiply by 24 or 60. Then add the smaller part that was left over. A part of an hour is that part of 60 min. 1 day is 24 h, so multiply the days by 24. 6 x 24 = 144, so 6 days is 144 h. Then add the 11 h: 144 + 11 = 155. So 6 days 11 h is 155 h. 1 h is 60 min, so multiply the hours by 60. 7 x 60 = 420, so 7 h is 420 min. Then add the 25 min: 420 + 25 = 445. So 7 h 25 min is 445 min. 1 min is 60 s, so multiply the minutes by 60. 14 x 60 = 840, so 14 min is 840 s. Then add the 50 s: 840 + 50 = 890. So 14 min 50 s is 890 s. 1/4 of 60 is 15, so 1/4 h is 15 min. 2 h is 120 min. 120 + 15 = 135, so 2 1/4 h is 135 min. To convert a bigger unit into a smaller one, multiply.
