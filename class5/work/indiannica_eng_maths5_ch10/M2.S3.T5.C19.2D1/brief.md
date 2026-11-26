# M2.S3.T5.C19.2D1 · day_bar_clocks · Day Bar Clocks
indiannica_eng_maths5_ch10 · indiannica_eng_maths5_ch10_v3 v3 (active) · "Time" · segment M2.S3 "Two Clocks" · topic M2.S3.T5 "The 24-Hour Clock" · printed p.152 to p.154

> Runtime supplies the standard chrome (bands, zones, header, runs box, slot + pad, bubble, phase bar, type scale, content colours, sounds, finished/idle/restart). `scaffold` puts each phase's concept, teach line, hint ladder, closing line and items into tool.tsx; they are not repeated here. Build the working area and the mechanics.

## What it is
**Description:** Slide a time along one day bar and read it on the 12-hour clock and the 24-hour clock, add 12 to a p.m. hour except in the 12 o'clock hour, and see why that hour is a case of its own.
**Why:** Read a 24-hour time as the hours and minutes after midnight, change 12-hour times into 24-hour times by adding 12 from one o'clock on in the afternoon, treat the 12 o'clock hour on its own, and change 24-hour times back into 12-hour times.
**Look:** One day bar from 12 midnight to 12 midnight with the 24-hour times above and the 12-hour times below, a sliding marker and a violet tile of 12 h.
**Context:** Grade 5, the pages on the 24-hour clock. An adult sees a rule for changing clocks. What the pages are doing is making a 24-hour time the hours and minutes since midnight, and making the 12 o'clock hour the hour where the rule of adding 12 does not hold.
**For the child:** Slide the marker along the day bar. Read the time on the other clock, add or take away the 12 h tile where the rule says, and look at the 12 o'clock hours twice.
**Teaching notes:** Read a 24-hour time as the hours and minutes after midnight, and say it that way: 0925 hours is 9 h 25 min after midnight. Add 12 to a p.m. hour, except in the 12 o'clock hour, and take 12 away only from 1300 hours on, except in the 12 o'clock hour. Teach the 12 o'clock hour on both clocks separately: 12:40 a.m. is 0040 hours and 12:40 p.m. is 1240 hours. Write noon and midnight in words, 12 noon and 12 midnight, never with a.m. or p.m. Write a 24-hour time as four digits and the word hours, with no colon and no dot, and never name an hour by its order.
**Placement:** Explore
**Also mounted in:** M2.S3.T5

## Look
**Chrome:** dim #9AA4AC · ink #2B2B2B · rule #C9BCA6 · panel #F2E4CE · paper #FFFDF7 · accent #5B6770
**Voice:** rate 0.92, pitch 1.06 · figure: None

## Stage (tool-specific layout)
Three bands across 1600 by 900. The header runs 0 to 80 and is one line only: 'Day Bar Clocks' in ink at the far left, a small dot set clear of the name, the phase title beside the dot on the same line, the host's navigation, and sound and restart as three round controls at the far right. The canvas runs 92 to 746, one rounded card on the paper colour. At its top left, at x 64, y 108 and 330 by 76, sits the running count: the number of times converted. It is never a score. The working area is 1086 by 528 at x 64, y 202. The day bar runs across the area along y 420 from x 90 to x 1130, 90 tall, with 12 midnight at the left end and 12 midnight at the right end and 12 noon marked where the halves meet. The 24-hour times stand above it along y 350 and the 12-hour times below it along y 540, all in near-black ink. The half from midnight until just before noon stays warm white inside its outline, labelled a.m., and the half from noon until just before midnight is rose, labelled p.m. The marker slides along the bar, amber while it is being placed. The time the question gives is set in deep blue, labelled Given, on whichever clock it is given on, and the same time is read on the other clock in green, labelled Answer, at x 120, y 650. A 24-hour time is four digits and the word hours, and a zero that holds the front place open is grey, labelled Place holder. The violet tile of 12 h, labelled Jump, waits at x 900, y 230 and is dragged onto the hour of a p.m. time from one o'clock on. On the third phase the two 12 o'clock hours are lit amber on the bar and the tile will not settle in either. Down the right of the canvas, in the same rectangle on every phase and never animated in or out, the question sits above the answer slot at x 1186, y 250 (356 by 92) that holds what the child has given, and under it the pad at x 1170, y 368 (388 by 363). The pad is ten number keys with a delete key, and keys for a.m., p.m. and hours. The footer runs 758 to 900: the voice caption at the far left with its speaking dot beside it, measuring its own wrap and dropping a type size rather than spilling, and the phase bar at the right with the question count under it. There is no sidebar and no score box anywhere, and nothing is ever written over the working area. Content colours are the chapter's own, and the nine tools of this chapter share them. What the question gives, as a clock time, a length of time, a start date or a number of days, is deep blue, labelled Given or Start. What the working reaches, as an end time, a length of time, a converted time or a date, is green, labelled Answer, End or How long. The thin second hand and the seconds it counts are vermilion, labelled Second hand. One jump along a time line, and one regrouped unit carried or borrowed, are violet, labelled Jump, Carry or Regroup. On a day bar the half from noon until just before midnight is rose, labelled p.m., and the half from midnight until just before noon stays warm white inside its outline, labelled a.m. The hand, digit, column, jump or date being worked on now is amber. Grey is kept for a zero holding a place open, labelled Place holder, and for nothing else. The hour hand and the minute hand, dials, tick marks, time lines, arrows, operation signs and step labels are near-black ink, and anything dimmed fades to half strength. Chrome never borrows one of the content colours, and each reading survives with the colour taken away, because a part is told by its written label before it is told by its colour.

## Opening (first frame of every mount)
Every mount comes up already furnished for its phase with nothing yet converted. On the first phase the day bar runs from 12 midnight to 12 midnight with the 24-hour times above it and the 12-hour times below, and the marker waits at the left end. On the second the marker sits on a p.m. time and the violet tile of 12 h waits beside the bar. On the third the two 12 o'clock hours stand out on the bar, one just after midnight and one just after noon, with the tile beside them. On the fourth the marker sits on a 24-hour time in deep blue and the 12-hour row waits empty. One thing moves, once: the marker or the tile gives one slow pulse while the voice speaks its opening line.

## Phases (what each mount shows and does; the words are in tool.tsx)

### 1 · Four digits after midnight
**Screen:** the day bar with 24-hour times above and 12-hour times below, and a marker set on a time in deep blue
**Does:** slides the marker along the bar, reads the hours and minutes after midnight, and writes them as four digits with a grey zero holding the front place
**Win:** the four digits and the word hours turn green, and the 12-hour time shows beneath
**Feels:** the marker's distance from midnight turning into four digits and the word hours
**Goal:** a 24-hour time is four digits and the word hours: the first two digits are the hours after midnight and the last two are the minutes
**Observe:** The marker was the same distance from the left end of the bar whichever clock the time was read on.
**Wrong (each is a traceback on the working area):**
- reads the first two digits as the minutes and the last two as the hours → the digits stay where the child put them, the first two are lit amber over the hours after midnight on the bar, and the last two over the minutes
- leaves off the zero in front of an early hour → the time stays as the child wrote it, a grey Place holder is set in the front place, and the four digits are written again beside it
**Misconception to break:** Reading the first two digits as the minutes and the last two as the hours.

### 2 · Adding 12 after one o'clock
**Screen:** the day bar with the marker set on a p.m. time, and a violet tile of 12 h waiting
**Does:** drags the tile onto the hour, adds 12, and writes the minutes beside it
**Win:** the hour and the minutes are written together, four digits and the word hours, in green
**Feels:** the tile fitting onto the hour and the four digits joining
**Goal:** for a p.m. time from one o'clock on, add 12 to the hour, except in the 12 o'clock hour
**Observe:** The tile of 12 h fitted onto the hour of an afternoon time and made it the hour of a 24-hour time.
**Wrong (each is a traceback on the working area):**
- adds 12 to the minutes instead of the hours → the tile stays on the minutes, lit amber, and is lifted to the hour, where it fits
- leaves the tile off an afternoon time and writes it as a morning time → the time stays, the marker is drawn in the rose half, and the missing tile is lit amber beside the hour
- adds 12 to a morning hour as well → the tile stays on the morning hour, the marker is drawn in the warm white half, and the tile waits beside the rose half
**Misconception to break:** Adding 12 to the minutes instead of the hours.

### 3 · The 12 o'clock hour
**Screen:** the two 12 o'clock hours lit amber on the day bar, one just after midnight and one just after noon, and the violet tile beside them
**Does:** tries the tile on a time in each 12 o'clock hour and sees that it will not fit, then slides the marker to write each time
**Win:** the tile stays off, and each 12 o'clock time is written right and turns green
**Feels:** the tile sliding off the two 12 o'clock hours and the times settling right without it
**Goal:** the hour that begins at 12 is a case of its own, so do not add 12 there: 12:40 a.m. is 0040 hours, 12 noon is 1200 hours, 12:40 p.m. is 1240 hours and 12 midnight is 0000 hours
**Observe:** The tile would not settle in either 12 o'clock hour.
**Wrong (each is a traceback on the working area):**
- adds 12 to the hour of a time just after noon and types a time past 2359 hours → the typed time stays, the 12 o'clock hour after noon lights amber on the bar, and the tile is lifted off and set beside it
- gives a time just after midnight the hour 12 in its four digits → the digits stay, the marker sits at the left end of the bar, and the hours after midnight, none yet, are lit amber beside the child's twelve
- gives 12 midnight the same four digits as 12 noon → the two marks are lit amber one after the other, and the hours after midnight are counted for each, none for 12 midnight and twelve for 12 noon
**Misconception to break:** Adding 12 to the 12 o'clock hour after noon, which gives a time past 2359 hours, and that is no time.

### 4 · Back to the 12-hour clock
**Screen:** the day bar with the marker set on a 24-hour time in deep blue, and the 12-hour row waiting
**Does:** reads the four digits, takes away 12 from the hours from 1300 hours on, and writes a.m. or p.m. after the time
**Win:** the 12-hour time turns green with a.m. or p.m. after it
**Feels:** the tile lifting off the hours and the a.m. or p.m. tag clipping on
**Goal:** from 1300 hours on, take away 12 from the hours, except in the 12 o'clock hour, and write a.m. before 1200 hours
**Observe:** Going back, the tile came off only from 1300 hours on, and a time before 1200 hours was called a.m.
**Wrong (each is a traceback on the working area):**
- takes away 12 but leaves off a.m. or p.m. → the time stays, the half of the bar the marker sits in is lit amber, warm white or rose, and the words a.m. and p.m. wait beside it
- takes away 12 from a time before 1200 hours → the tile stays where it was dropped, the marker is drawn in the warm white half, and the tile is lit amber with the words from 1300 hours on written in ink beside it
- gives a time just after midnight the hour 0 on the 12-hour clock → the digits are read against the day bar, the mark for 12 midnight is lit amber, and the hour just after it is drawn as 12 on the 12-hour row
**Misconception to break:** Taking away 12 but leaving off p.m., so the time could be morning or evening.

## Delight
On the third phase, when the tile is tried on a time in a 12 o'clock hour, it shivers and slides off, the two 12 o'clock hours on the bar glow amber once, and the time is written right without it.

**General miss line:** Look at the bar again. Which half of the day is the marker in?

## Answer key
A 24-hour time is four digits and the word hours: the first two digits are the hours after midnight and the last two are the minutes. For a p.m. time from one o'clock on, add 12 to the hour, except in the 12 o'clock hour. 12:40 a.m. is 0040 hours, 12 noon is 1200 hours and 12:40 p.m. is 1240 hours, and 12 midnight is 0000 hours. Going back, from 1300 hours on take away 12 from the hours, except in the 12 o'clock hour. A time before 1200 hours is a.m., and 0020 hours is 12:20 a.m. Noon and midnight are written 12 noon and 12 midnight, never with a.m. or p.m.

## Student controls
- **Marker**: slides along the day bar to a time
- **Clock switch**: chooses which of the two clocks the time is given on
- **12 h tile**: is dragged onto a p.m. hour to add 12, except in the 12 o'clock hour, or taken off to go back
- **a.m. p.m. tags**: are clipped onto a 12-hour time
- **Number pad**: types four digits or a 12-hour time

## State fields (getState, a resume contract)
phase, marker, given_clock, tile, digits, half, answer, complete

## Textbook (this topic)
**Pages:** 152, 153, 154
**Key terms:** 24-hour clock, 12-hour clock, after midnight, 12 noon, 12 midnight
A 24-hour time is four digits counting the hours and minutes after midnight; 12 is added from one o'clock on in the afternoon, but never in the 12 o'clock hour. A 24-hour time is four digits and the word hours. The digits count the hours and minutes after midnight. From one o'clock in the afternoon on, add 12 to the hour, except in the 12 o'clock hour. From midnight until just before noon, times are a.m., and from noon until just before midnight they are p.m. A 24-hour time has four digits and the word hours, with no a.m. or p.m. The first two digits count the hours after midnight, and the last two count the minutes. So 0715 hours is 7 h 15 min after midnight, which is 7:15 a.m. For a p.m. time from one o'clock on, add 12 to the hour, but not for the 12 o'clock hour. 3 + 12 = 15, so 3:40 p.m. is 1540 hours. For an a.m. time from one o'clock on, write the hour with two digits. So 8:05 a.m. is 0805 hours. 12:40 a.m. is 40 min after midnight, so 12:40 a.m. is 0040 hours. 12 noon is 1200 hours, and 12:40 p.m. is 1240 hours. 12 midnight is 0000 hours. In the 12 o'clock hour, do not add 12. From 1300 hours on, take away 12 from the hours, except in the 12 o'clock hour. 21 - 12 = 9, so 2110 hours is 9:10 p.m. Before 1200 hours, write a.m.: 0935 hours is 9:35 a.m. And 0020 hours is 12:20 a.m., in the hour just after midnight.
