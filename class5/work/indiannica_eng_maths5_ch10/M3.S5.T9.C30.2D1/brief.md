# M3.S5.T9.C30.2D1 · date_counter · Date Counter
indiannica_eng_maths5_ch10 · indiannica_eng_maths5_ch10_v3 v3 (active) · "Time" · segment M3.S5 "The Calendar" · topic M3.S5.T9 "Counting Days" · printed p.158 to p.159

> Runtime supplies the standard chrome (bands, zones, header, runs box, slot + pad, bubble, phase bar, type scale, content colours, sounds, finished/idle/restart). `scaffold` puts each phase's concept, teach line, hint ladder, closing line and items into tool.tsx; they are not repeated here. Build the working area and the mechanics.

## What it is
**Description:** Count the days between two dates on a calendar, both days included, across a month end, find a finish date, and add days or a fortnight to a date.
**Why:** Count the days from one date to another, counting both days, across a month end as well, find a finish date from a start date and a number of days, and find a date some days after or a fortnight later.
**Look:** A month calendar, or two months side by side, with a run of shaded day cells, a counter that says whether both end days are included, and a violet jump of days.
**Context:** Grade 5, the pages on the days between two dates. An adult sees a subtraction of dates with a sum after it. What the pages are doing is making the child say whether both days are counted, so that a course or a fair counts both, and a date some days after or a fortnight later adds the days without counting the first again.
**For the child:** Set the dates on the calendar. Count the cells with both end days, then check by the rule. Drag a jump of days to find a date after.
**Teaching notes:** Say whether both days are counted every time a number of days is given. To count both days, take the start date from the end date, then add 1. Across a month end, count to the last day of the month first, then on into the next month. After and a fortnight later mean add the days to the date, with the first day not counted again. Where two ranges are given as after one date and before another, list the dates that fit each range and keep the ones they share. Where an answer list gives one day fewer, teach the chapter's own rule of counting both days.
**Placement:** Explore
**Also mounted in:** M3.S5.T9

## Look
**Chrome:** dim #9AA4AC · ink #2B2B2B · rule #C9BCA6 · panel #F2E4CE · paper #FFFDF7 · accent #5B6770
**Voice:** rate 0.92, pitch 1.06 · figure: None

## Stage (tool-specific layout)
Three bands across 1600 by 900. The header runs 0 to 80 and is one line only: 'Date Counter' in ink at the far left, a small dot set clear of the name, the phase title beside the dot on the same line, the host's navigation, and sound and restart as three round controls at the far right. The canvas runs 92 to 746, one rounded card on the paper colour. At its top left, at x 64, y 108 and 330 by 76, sits the running count: the number of days counted. It is never a score. The working area is 1086 by 528 at x 64, y 202. The month calendar fills the left of the area at x 90, y 230, 700 wide, in seven columns each 100 wide, with the dates in rows beneath, each row 64 tall. When a run crosses a month end, two months stand side by side, each 340 wide, with the last day of the first month marked in ink. The start date is set on it in deep blue, labelled Start, and the end date, or the number of days, beside it in deep blue, labelled Given. The days between them are shaded as a run of cells and counted one by one. The day counter stands at x 850, y 240 and says whether the first day and the last day are included. The count is green, labelled Answer, at x 850, y 560, and a last day found is green, labelled End. The Cut handle stands at x 850, y 340 and splits a run at the last day of the first month. A violet jump of days, labelled Jump, is dragged along the calendar from a date, and a jump of 14 days stands for a fortnight. The date being counted is amber. Down the right of the canvas, in the same rectangle on every phase and never animated in or out, the question sits above the answer slot at x 1186, y 250 (356 by 92) that holds what the child has given, and under it the pad at x 1170, y 368 (388 by 363). The pad is ten number keys with a delete key, and keys for days and the month names. The footer runs 758 to 900: the voice caption at the far left with its speaking dot beside it, measuring its own wrap and dropping a type size rather than spilling, and the phase bar at the right with the question count under it. There is no sidebar and no score box anywhere, and nothing is ever written over the working area. Content colours are the chapter's own, and the nine tools of this chapter share them. What the question gives, as a clock time, a length of time, a start date or a number of days, is deep blue, labelled Given or Start. What the working reaches, as an end time, a length of time, a converted time or a date, is green, labelled Answer, End or How long. The thin second hand and the seconds it counts are vermilion, labelled Second hand. One jump along a time line, and one regrouped unit carried or borrowed, are violet, labelled Jump, Carry or Regroup. On a day bar the half from noon until just before midnight is rose, labelled p.m., and the half from midnight until just before noon stays warm white inside its outline, labelled a.m. The hand, digit, column, jump or date being worked on now is amber. Grey is kept for a zero holding a place open, labelled Place holder, and for nothing else. The hour hand and the minute hand, dials, tick marks, time lines, arrows, operation signs and step labels are near-black ink, and anything dimmed fades to half strength. Chrome never borrows one of the content colours, and each reading survives with the colour taken away, because a part is told by its written label before it is told by its colour.

## Opening (first frame of every mount)
Every mount comes up already furnished for its phase with nothing yet counted. On the first phase one month calendar stands with a start date and an end date set on it in deep blue and no cell shaded. On the second two months stand side by side with a start date in the first and an end date in the second. On the third a month calendar holds a start date and a number of days in deep blue. On the fourth a date is set on the calendar with a violet jump of some days waiting beside it. One thing moves, once: the start date, the first cell of the run or the jump gives one slow pulse while the voice speaks its opening line.

## Phases (what each mount shows and does; the words are in tool.tsx)

### 1 · Counting both days
**Screen:** one month calendar with a start date and an end date set on it, and the days between them shaded
**Does:** counts the shaded cells with both end cells included, then takes the start date from the end date and adds 1, and shades a range that leaves both end dates out
**Win:** the count by cells and the count by the rule agree, and turn green
**Feels:** the count by cells and the count by the rule landing on the same number
**Goal:** counting both days, the number of days from one date to another is the end date minus the start date, then add 1
**Observe:** The cells counted one by one and the sum taken from the end date agreed once 1 was added.
**Wrong (each is a traceback on the working area):**
- takes the start date from the end date and stops → the count stays, the first cell of the run is lit amber, and the cells are counted again with it included
- counts only the days between the two dates, leaving both end days out, when the question says to count both → the two end cells are lit amber and the count is made again with them in
**Misconception to break:** Taking the start date from the end date and stopping there, so the first day is left out.

### 2 · Across a month end
**Screen:** two months side by side with a run of days crossing from the first into the second
**Does:** cuts the run at the last day of the first month, counts each part with both end days, and adds the two
**Win:** the two parts are added and the whole run turns green
**Feels:** a run of days breaking at the month end and the two parts joining into one count
**Goal:** across a month end, count to the last day of the month first, then on into the next month, and add the two parts
**Observe:** A run across a month end split into two parts at the last day of the first month.
**Wrong (each is a traceback on the working area):**
- takes the start date from the end date across the two months as if they were one month → the run is cut at the last day of the first month and each part is counted in ink, while the child's number stays in the slot
- counts the first month one day short → the last cell of the first month is lit amber, and that part is counted again with it in
- uses thirty days for every month end, whatever the month → the month's own number of days is counted in ink along the strip, and its last day is marked, lit amber, before the run is cut
**Misconception to break:** Taking 8 from 27 across the two months as if they were one, which gives a negative count.

### 3 · Finding the last day
**Screen:** a month calendar with a start date and a number of days set in deep blue
**Does:** counts the days out along the calendar, the start date being day 1, and marks the last day
**Win:** the last day is marked in green, labelled End, and the count back from it agrees
**Feels:** the count reaching its last day and the count back from it agreeing
**Goal:** a finish date is found by adding to the start date one day fewer than the number of days, because the start date is day 1 and both days are counted
**Observe:** The last day of a course came one day fewer than its number of days after the first day.
**Wrong (each is a traceback on the working area):**
- counts the number of days on from the start date, so the last day comes a day too late → the count is made again with the start date as day 1, the child's date is lit amber one cell past the last day, and the last day is drawn one cell before it
- gives a finish date larger than the number of days in the month → the last day of the month is marked, the extra days run on into the next month in violet jumps, and the child's number stays
**Misconception to break:** Counting 16 days on from 22 November, so the course ends a day too late.

### 4 · Days after and a fortnight later
**Screen:** a month calendar with a date set on it and a violet jump of some days waiting
**Does:** drags the jump along the calendar from the date, without counting the first day again, and reads the date it lands on
**Win:** the jump lands on a date that turns green
**Feels:** the jump landing on a date that turns green
**Goal:** after and a fortnight later add the days to the date, and the first day is not counted again; a fortnight is 14 days
**Observe:** The jump of days never counted the date it started from.
**Wrong (each is a traceback on the working area):**
- counts the start date as the first of the days after, so the date is a day too early → the jump is dragged again from the cell after the start date, the first cell is lit amber, and the child's date stays
- takes a fortnight for a week → the jump of a fortnight is drawn as two rows of seven cells and counted in ink, and the child's date stays
- counts both days for a date after, as for a run of days → the two questions are set side by side on the calendar, one shaded as a run and one dragged as a jump, with the words after and counting both days lit amber above them
**Misconception to break:** Counting 12 April as the first of the 25 days, which gives a date one day too early.

## Delight
On the first phase, when the count by cells and the count by the rule land on the same number, the two counters flip over together and turn green at once.

**General miss line:** Count the cells again. Did you count the first day and the last day?

## Answer key
The days from one date to another, counting both days, are the end date minus the start date, then add 1: from 8 September to 16 September, counting both days, is 9 days. Across a month end, count to the last day of the month first, then on into the next month. A finish date is found by adding to the start date one day fewer than the number of days, because the first day is day 1: a 16-day course that begins on 22 November ends 15 days after it, on 7 December. After and a fortnight later add the days to the date without counting the first day again: 25 days after 12 April is 7 May, and a fortnight is 14 days.

## Student controls
- **Start date**: is set on the calendar in deep blue
- **End date**: is set on the calendar, or the number of days is set beside it
- **Day counter**: counts the shaded cells and says whether both end days are included
- **Cut**: splits a run at the last day of the first month
- **Jump**: is dragged along the calendar by some days, or by a fortnight
- **Number pad**: types a number of days or a date

## State fields (getState, a resume contract)
phase, start, end, days, shaded, cut, jump, answer, complete

## Textbook (this topic)
**Pages:** 158, 159
**Key terms:** counting both days, start date, end date, fortnight, days after
The days from one date to another, counting both days, are the end date minus the start date, then add 1; a date some days or a fortnight later is found by adding. To count the days from one date to another, counting both days, take the start date from the end date, then add 1. Across a month end, count the days in each month and add the parts. To find the last day of an event, go forward from the first day by one day fewer than the length of the event. For days after, or a fortnight later, add the days to the date without counting the first day again. Count both the first and the last day. Take the start date from the end date, then add 1. 17 - 11 + 1 = 7, so from 11 August to 17 August, counting both days, is 7 days. May has 31 days. From 24 May to 31 May there are 31 - 24 + 1 = 8 days. From 1 June to 6 June there are 6 days. 8 + 6 = 14, so from 24 May to 6 June, counting both days, is 14 days. The first day is day 1, so the last day comes 19 days after it. 19 days after 17 October is 5 November. So the course ends on 5 November, counting both days. After and later mean add the days to the date, without counting the first day again. A fortnight is 14 days. 14 days after 26 September is 10 October.
