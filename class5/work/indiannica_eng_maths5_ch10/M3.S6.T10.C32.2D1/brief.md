# M3.S6.T10.C32.2D1 · clock_cards · Clock Card Matcher
indiannica_eng_maths5_ch10 · indiannica_eng_maths5_ch10_v3 v3 (active) · "Time" · segment M3.S6 "Time Everywhere" · topic M3.S6.T10 "Planets and Clock Cards" · printed p.159 to p.161

> Runtime supplies the standard chrome (bands, zones, header, runs box, slot + pad, bubble, phase bar, type scale, content colours, sounds, finished/idle/restart). `scaffold` puts each phase's concept, teach line, hint ladder, closing line and items into tool.tsx; they are not repeated here. Build the working area and the mechanics.

## What it is
**Description:** Set the Earth's turn beside a day, change long lengths of time a step at a time, match clock cards with the time passed after 12 o'clock, and write an end time on the 24-hour clock.
**Why:** Keep 1 day as 24 h beside the Earth's turn, change long lengths of time a step at a time, match a clock card with the time passed after 12 o'clock, and give an end time on the 24-hour clock.
**Look:** A day bar with the Earth's turn beside it, a ladder for long lengths of time, sixteen face down cards, a time line with jumps, and a tray of six word cards.
**Context:** Grade 5, the closing pages, the planets' turning times and the clock-card game. An adult sees a table of times and a card game. What the pages are doing is pulling the chapter together: 1 day is 24 h, long lengths of time are changed by multiplying and dividing, a clock face is read as the time passed after 12 o'clock, and an end time is found and written on the 24-hour clock.
**For the child:** Turn two cards and match a clock card with its time card. Change long lengths of time a step at a time, and write an end time on the 24-hour clock.
**Teaching notes:** Keep 1 day as 24 h. The Earth turns once round in about 23 h 56 min, a little less than a day, so a clock day and the Earth's turn are not the same. Change long lengths of time one step at a time, from days to hours to minutes. Match each clock card with the time passed after 12 o'clock, in minutes or in seconds, and draw every hour hand moved on for the minutes. Give an end time on the 24-hour clock as four digits and the word hours. The self-assessment is the child's own: let each can-do be ticked honestly.
**Placement:** Explore
**Also mounted in:** M3.S6.T10

## Look
**Chrome:** dim #9AA4AC · ink #2B2B2B · rule #C9BCA6 · panel #F2E4CE · paper #FFFDF7 · accent #5B6770
**Voice:** rate 0.92, pitch 1.06 · figure: None

## Stage (tool-specific layout)
Three bands across 1600 by 900. The header runs 0 to 80 and is one line only: 'Clock Card Matcher' in ink at the far left, a small dot set clear of the name, the phase title beside the dot on the same line, the host's navigation, and sound and restart as three round controls at the far right. The canvas runs 92 to 746, one rounded card on the paper colour. At its top left, at x 64, y 108 and 330 by 76, sits the running count: the number of pairs matched. It is never a score. The working area is 1086 by 528 at x 64, y 202. The day bar fills the top of the area along y 230 from x 90 to x 1000, one whole day long, with the Earth's turn drawn beside it along y 320 as a bar a little shorter. The tray of six word cards, second, minute, hour, a.m., p.m. and calendar, stands along y 420, and each turns over to its meaning. On the second phase the ladder of days, hours and minutes stands at x 90, y 250 with the long length of time in deep blue, labelled Given, and the working is written in ink beside it. On the third phase sixteen cards lie face down in two rows of eight along y 260 and y 470, each 110 by 170. A clock card is a round clock face with twelve numbers, its hour hand and minute hand near-black ink and its hour hand moved on from its number for the minutes. A time card is the time passed after 12 o'clock, in minutes alone or in seconds alone. Two cards are turned at a time, and a pair that matches stays face up in green, labelled Answer. On the fourth phase the time line with the start and the length of time in deep blue runs along y 400, the jumps in violet, labelled Jump, and the end time is written on the 24-hour clock in green, labelled Answer, at x 120, y 650. The row of five can-dos stands at x 850, y 660, and each is ticked as it is met. Down the right of the canvas, in the same rectangle on every phase and never animated in or out, the question sits above the answer slot at x 1186, y 250 (356 by 92) that holds what the child has given, and under it the pad at x 1170, y 368 (388 by 363). The pad is ten number keys with a delete key, and keys for days, h, min and s. The footer runs 758 to 900: the voice caption at the far left with its speaking dot beside it, measuring its own wrap and dropping a type size rather than spilling, and the phase bar at the right with the question count under it. There is no sidebar and no score box anywhere, and nothing is ever written over the working area. Content colours are the chapter's own, and the nine tools of this chapter share them. What the question gives, as a clock time, a length of time, a start date or a number of days, is deep blue, labelled Given or Start. What the working reaches, as an end time, a length of time, a converted time or a date, is green, labelled Answer, End or How long. The thin second hand and the seconds it counts are vermilion, labelled Second hand. One jump along a time line, and one regrouped unit carried or borrowed, are violet, labelled Jump, Carry or Regroup. On a day bar the half from noon until just before midnight is rose, labelled p.m., and the half from midnight until just before noon stays warm white inside its outline, labelled a.m. The hand, digit, column, jump or date being worked on now is amber. Grey is kept for a zero holding a place open, labelled Place holder, and for nothing else. The hour hand and the minute hand, dials, tick marks, time lines, arrows, operation signs and step labels are near-black ink, and anything dimmed fades to half strength. Chrome never borrows one of the content colours, and each reading survives with the colour taken away, because a part is told by its written label before it is told by its colour.

## Opening (first frame of every mount)
Every mount comes up already furnished for its phase with nothing yet matched. On the first phase a day bar for 1 day lies across the top with a slightly shorter bar for the Earth's turn beside it, and the tray of six word cards below. On the second the ladder of days, hours and minutes holds a long length of time in deep blue. On the third sixteen cards lie face down in two rows of eight. On the fourth a time line holds a start and a length of time in deep blue with the 24-hour clock waiting beside it. One thing moves, once: the shorter bar, the first card or the time line gives one slow pulse while the voice speaks its opening line.

## Phases (what each mount shows and does; the words are in tool.tsx)

### 1 · The Earth's turn
**Screen:** a day bar for 1 day, which is 24 h, with a slightly shorter bar for the Earth's turn beside it
**Does:** drags the Earth's turn bar beside the day bar and sees the small gap between them
**Win:** the gap is seen and the words a little less than a day light up
**Feels:** the two bars side by side with a small gap between them
**Goal:** the Earth turns once round in about 23 h 56 min, a little less than a day. 1 day is still 24 h
**Observe:** The bar for the Earth's turn was a little shorter than the day bar.
**Wrong (each is a traceback on the working area):**
- says the Earth's turn is exactly one day → the two bars stay side by side, the gap between their ends lights amber, and the words a little less than a day are written in ink under the shorter bar
- makes a clock day shorter than 24 h to match the Earth's turn → the day bar stays at its full length, marked 1 day, which is 24 h, and the Earth's turn bar is drawn beside it, shorter and lit amber
**Misconception to break:** Making a clock day shorter than 24 h, to match the Earth's turn.

### 2 · Long lengths of time
**Screen:** a ladder of days, hours and minutes with a long length of time set in deep blue
**Does:** breaks the days into hours and then the hours into minutes, adding the leftover part at each step, and adds or takes apart two long lengths
**Win:** the minutes turn green with the working written beneath
**Feels:** two steps down the ladder, the second bigger than the first
**Goal:** long lengths of time are changed a step at a time, days to hours by multiplying by 24 and then hours to minutes by multiplying by 60
**Observe:** The days were changed to hours before the hours were changed to minutes.
**Wrong (each is a traceback on the working area):**
- multiplies the days by sixty straight away → the hours rung is lit amber between them, and the days are broken into hour bars first, while the child's number stays in the slot
- changes the days to hours but stops there when the question asks for minutes → the hour bars stay, the minutes rung is lit amber below them, and each hour bar waits to be broken into sixty minute bars
**Misconception to break:** Multiplying the days by 60 straight away, and missing the step through the hours.

### 3 · Clock cards and time cards
**Screen:** sixteen cards face down in two rows of eight, eight clock cards and eight time cards
**Does:** turns two cards at a time, reads a clock card as hours and minutes after 12 o'clock, changes that to minutes or seconds, and keeps a pair that matches
**Win:** the matched pair stays face up and turns green
**Feels:** a matched pair staying face up and turning green
**Goal:** a clock card is matched with the time passed after 12 o'clock, written in minutes or in seconds, and every hour hand has moved on for the minutes
**Observe:** Every hour hand on a clock card had moved on from its number.
**Wrong (each is a traceback on the working area):**
- matches a clock card with a time card by its hour alone → the two cards turn face down again, the minute hand on the clock card is lit amber, and the minutes it counts are added in ink to the hours
- reads the hour hand as if it were still on its number → the hour hand is drawn again at its true place, moved on for the minutes, with the small step it has taken lit amber
- matches a card in minutes with a card in seconds → the two cards stay face up, the unit word on the time card is lit amber, and the clock card is read again in that unit
**Misconception to break:** Reading only the hour and forgetting the minutes, so the card is matched with a whole number of hours.

### 4 · An end time on the 24-hour clock
**Screen:** a time line with a start and a length of time set in deep blue, and the 24-hour clock waiting
**Does:** jumps the whole hours and then the minutes, reads the 12-hour end time, and writes it on the 24-hour clock
**Win:** the end time turns green in four digits and the word hours
**Feels:** the end time turning green in four digits and the word hours
**Goal:** an end time is found by jumping from the start and is written on the 24-hour clock as four digits and the word hours
**Observe:** The end time turned into four digits and the word hours.
**Wrong (each is a traceback on the working area):**
- gives the end time on the 12-hour clock when the question asks for the 24-hour clock → the end time stays, and the four-digit form is lit amber beside it, waiting for its digits
- writes an afternoon end time with the hour of the 12-hour clock and no 12 added → the marker is drawn in the rose half, the tile of 12 h is lit amber, and the digits are written again with the tile on
**Misconception to break:** Stopping at 1:15 p.m. and giving the 12-hour time, when the question asks for the 24-hour clock.

## Delight
On the third phase, when the last pair is matched, all sixteen cards flip face up together and the eight clock faces tick round to their times one after another.

**General miss line:** Look at the cards again. Do the hands and the time agree?

## Answer key
The Earth turns once round in about 23 h 56 min, a little less than a day. 1 day is still 24 h. To change days into hours multiply by 24, and hours into minutes by 60: 2 days 3 h is 51 h, and 51 h is 3060 min. A clock card shows a time of day, and its time card is the time passed after 12 o'clock, in minutes or in seconds: 25 min past 6 is 385 min. Every hour hand moves on for the minutes. An end time is jumped from the start and written on the 24-hour clock: 7 h 40 min after 5:35 a.m. is 1:15 p.m., which is 1315 hours.

## Student controls
- **Card**: is turned over, two at a time, to match a clock card with a time card
- **Day bar**: sets the Earth's turn beside one whole day
- **Unit ladder**: changes a long length of time a step at a time
- **Jump**: is dragged along the time line by whole hours, then by minutes
- **Word card**: is turned to show what a word of the chapter means
- **Number pad**: types a length of time, minutes, seconds or a 24-hour time

## State fields (getState, a resume contract)
phase, day_bar, ladder, cards, pairs, jumps, answer, cando, complete

## Textbook (this topic)
**Pages:** 159, 160, 161
**Key terms:** second, minute, hour, a.m., p.m., calendar, clock card, time card
Long lengths of time are added, subtracted and converted, keeping 1 day as 24 h, and clock faces are matched with the time passed after 12 o'clock. The Earth turns once round in about 23 h 56 min, a little less than a day. Our clocks still count 1 day as 24 h. To change days into hours, multiply by 24, and to change hours into minutes, multiply by 60. A clock card is matched with a time card by finding the minutes passed after 12 o'clock. An end time is found by jumps, and can then be written on the 24-hour clock. Not quite. The Earth turns once round in about 23 h 56 min, a little less than a day. Our clocks still count 1 day as 24 h. 30 x 24 = 720, so 30 days is 720 h. Then 720 x 60 = 43,200, so 720 h is 43,200 min. Multiply by 24 for hours, then by 60 for minutes. From 12 o'clock to 3 o'clock is 3 h, which is 180 min. Add the 20 min: 180 + 20 = 200. So the card matches a time card of 200 min, the time passed after 12 o'clock. Jump 6 h from 7:25 a.m. to 1:25 p.m., then 50 min to 2:15 p.m. So 6 h 50 min after 7:25 a.m. is 2:15 p.m. And 2:15 p.m. is 1415 hours.
