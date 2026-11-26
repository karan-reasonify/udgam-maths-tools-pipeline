# M3.S5.T8.C29.2D1 · month_calendar · Month Calendar
indiannica_eng_maths5_ch10 · indiannica_eng_maths5_ch10_v3 v3 (active) · "Time" · segment M3.S5 "The Calendar" · topic M3.S5.T8 "The Calendar" · printed p.158

> Runtime supplies the standard chrome (bands, zones, header, runs box, slot + pad, bubble, phase bar, type scale, content colours, sounds, finished/idle/restart). `scaffold` puts each phase's concept, teach line, hint ladder, closing line and items into tool.tsx; they are not repeated here. Build the working area and the mechanics.

## What it is
**Description:** Build a month calendar of seven columns, count weeks, fortnights and months, tell a leap year by its February, and carry the days of the week on into the next month.
**Why:** Use the days of a week, a fortnight and the months, tell a leap year by its February, read the dates and days of a month's calendar, and carry the days of the week on into the next month.
**Look:** A month calendar of seven columns from Monday to Sunday, a year strip of twelve month cards, a February card that gains a 29th cell, and a violet jump that goes down a column.
**Context:** Grade 5, the pages on the calendar. An adult sees a page of a wall calendar. What the pages are doing is making the columns of a calendar the days of the week, so that dates in one column are 7 apart, and making one month run on into the next with its days of the week carried over.
**For the child:** Drop the date in its column. Drag a jump down the column to see the dates 7 apart, and lay the next month after this one to carry the days on.
**Teaching notes:** Keep a real calendar on the wall and read it before any rule is named. Count the months of 31 days on the knuckles of a fist. Keep leap years to the years between 2000 and 2099, where every fourth year is one, and read whether a year is a leap year from its February. Dates in one column of a calendar are 7 apart, so add or take away 7 to move a week. Answer a question about the day of the week with a day name, and a question about a date with a date, asked as on which date.
**Placement:** Explore
**Also mounted in:** M3.S5.T8

## Look
**Chrome:** dim #9AA4AC · ink #2B2B2B · rule #C9BCA6 · panel #F2E4CE · paper #FFFDF7 · accent #5B6770
**Voice:** rate 0.92, pitch 1.06 · figure: None

## Stage (tool-specific layout)
Three bands across 1600 by 900. The header runs 0 to 80 and is one line only: 'Month Calendar' in ink at the far left, a small dot set clear of the name, the phase title beside the dot on the same line, the host's navigation, and sound and restart as three round controls at the far right. The canvas runs 92 to 746, one rounded card on the paper colour. At its top left, at x 64, y 108 and 330 by 76, sits the running count: the number of dates placed. It is never a score. The working area is 1086 by 528 at x 64, y 202. The month calendar fills the left of the area at x 90, y 230, 700 wide, in seven columns each 100 wide, headed Monday to Sunday in ink, with the dates in rows beneath, each row 64 tall. A date the question gives is dropped into its cell in deep blue, labelled Given, and the column of a date is lit amber. A violet jump, labelled Jump, is dragged down a column from one date to the date 7 days on. On the first phase the year strip of twelve month cards runs along y 650, each card 90 wide, and a card is tapped to show whether its month has 31 days or 30. On the second phase the February card of 28 cells stands at x 850, y 240 and a 29th cell is added to it for a leap year, the strip of the years between 2000 and 2099 runs along y 650, and the century bar stands at x 850, y 460. On the fourth phase the Next month button stands at x 850, y 230 and the calendar of the next month lies after the first, its first row carrying on from the last row above it. A day of the week or a date found is green, labelled Answer, at x 850, y 620. Down the right of the canvas, in the same rectangle on every phase and never animated in or out, the question sits above the answer slot at x 1186, y 250 (356 by 92) that holds what the child has given, and under it the pad at x 1170, y 368 (388 by 363). The pad is ten number keys with a delete key, and a key for each day name. The footer runs 758 to 900: the voice caption at the far left with its speaking dot beside it, measuring its own wrap and dropping a type size rather than spilling, and the phase bar at the right with the question count under it. There is no sidebar and no score box anywhere, and nothing is ever written over the working area. Content colours are the chapter's own, and the nine tools of this chapter share them. What the question gives, as a clock time, a length of time, a start date or a number of days, is deep blue, labelled Given or Start. What the working reaches, as an end time, a length of time, a converted time or a date, is green, labelled Answer, End or How long. The thin second hand and the seconds it counts are vermilion, labelled Second hand. One jump along a time line, and one regrouped unit carried or borrowed, are violet, labelled Jump, Carry or Regroup. On a day bar the half from noon until just before midnight is rose, labelled p.m., and the half from midnight until just before noon stays warm white inside its outline, labelled a.m. The hand, digit, column, jump or date being worked on now is amber. Grey is kept for a zero holding a place open, labelled Place holder, and for nothing else. The hour hand and the minute hand, dials, tick marks, time lines, arrows, operation signs and step labels are near-black ink, and anything dimmed fades to half strength. Chrome never borrows one of the content colours, and each reading survives with the colour taken away, because a part is told by its written label before it is told by its colour.

## Opening (first frame of every mount)
Every mount comes up already furnished for its phase with nothing yet placed. On the first phase one row of seven day cells lies above a year strip of twelve month cards, all face up and unsorted. On the second a February card of 28 cells stands beside a strip of the years between 2000 and 2099. On the third a month calendar of seven columns holds one date in deep blue under its day of the week. On the fourth the calendar of a month stands with the Next month button beside it and the next month's calendar waiting after it. One thing moves, once: the first row of cells, the February card, the date in deep blue or the Next month button gives one slow pulse while the voice speaks its opening line.

## Phases (what each mount shows and does; the words are in tool.tsx)

### 1 · Weeks, fortnights and months
**Screen:** a row of seven day cells for a week, two rows for a fortnight, and a year strip of twelve month cards
**Does:** counts the days of a week and a fortnight along the rows, and taps each month card to see whether it has 31 days or 30
**Win:** the week and the fortnight are counted and the month cards sort into their two groups
**Feels:** the month cards sorting into two groups and one odd card
**Goal:** 1 week is 7 days, a fortnight is 14 days, and the months have 31 days or 30 days, with February the odd one out
**Observe:** Every row of the calendar held seven dates, and the same day of the week sat in the same column.
**Wrong (each is a traceback on the working area):**
- takes a fortnight for four weeks → two rows of the calendar are outlined amber and their days counted in ink, and the child's answer stays in the slot
- sorts February with the months of thirty days → the February card stays in the group the child chose, its cells are counted in ink, and it is lit amber as the odd one out with a place of its own
**Misconception to break:** Taking a fortnight for 12 days because a month has about four weeks.

### 2 · Leap years
**Screen:** a February card of 28 cells, a strip of the years between 2000 and 2099, and a century bar
**Does:** picks a year on the strip, reads its February, and adds the 29th cell where the year is a leap year
**Win:** the leap year gains its extra cell and turns green, and the others keep twenty-eight
**Feels:** the February card gaining a 29th cell in a leap year and staying as it was in the others
**Goal:** a leap year has 366 days, with 29 February as the extra day; between 2000 and 2099, every fourth year is a leap year, and 100 years make a century
**Observe:** Tapping the month cards sorted them into two groups and one odd card.
**Wrong (each is a traceback on the working area):**
- calls every even year a leap year → the strip stays as the child marked it, the years between the leap years are counted in ink, and the February of one of the even years the child marked is drawn with only twenty-eight cells
- gives a leap year the same number of days as an ordinary year → the February card gains its 29th cell, lit amber, and the two years are counted side by side, one day apart
**Misconception to break:** Forgetting the extra day, so a leap year is counted as an ordinary year.

### 3 · Reading a month's calendar
**Screen:** a month calendar with one date placed in deep blue under its day of the week
**Does:** fills the month in from that date, drags a jump down a column, and reads the dates and the day of the week
**Win:** the dates of the column turn green, all seven apart
**Feels:** the dates of a column lighting up together, all 7 apart
**Goal:** each column of a calendar is one day of the week, so the dates in a column are 7 apart
**Observe:** The February card gained a 29th cell in some years and not in others.
**Wrong (each is a traceback on the working area):**
- counts the dates along the row and says the next date in the column is one more → the jump is dragged down the column in violet, labelled Jump, 7 days at a time, and the row the child counted along is lit amber
- puts a date under the wrong day of the week → the date stays where it was dropped, and the column it belongs to is lit amber with its day name written above it in ink
**Misconception to break:** Counting the dates along a row instead of down a column, so the next Tuesday comes out as 2.

### 4 · Into the next month
**Screen:** a month calendar with a Next month button, and the calendar of the next month waiting after it
**Does:** counts whole weeks off the month, jumps the days that are left, and places the first date of the next month under its day
**Win:** the first of the next month lands under its day of the week and the day name turns green
**Feels:** the last row running on into the first row of the next month
**Goal:** a month of 31 days is 4 weeks 3 days, so the next month begins 3 days on in the week; a question about the day of the week is answered with a day name
**Observe:** The next month began under a different day of the week from the one before.
**Wrong (each is a traceback on the working area):**
- counts every day of the month round the week one at a time → the whole weeks are cut off the month in ink, four bars of seven, and only the days left over are counted, lit amber
- starts the count on the last date of the month instead of the day after it → the last date is lit amber and the count starts one cell after it, the leftover days counted along the row in violet jumps
- answers a question about the day of the week with a date → the cell is lit amber with its column's day name written above it, and the child's answer stays in the slot
**Misconception to break:** Carrying on all 31 days round the week one at a time, and losing count on the way.

## Delight
On the fourth phase, when the Next month button is pressed, the last row of the month slides left and the first date of the next month drops in under its day, so the calendar seems to run on like a page turning.

**General miss line:** Look down the column again. How far apart are the dates?

## Answer key
1 week is 7 days, and a fortnight is 14 days. January, March, May, July, August, October and December have 31 days each, April, June, September and November have 30 days each, and February has 28 days, or 29 in a leap year. A year has 365 days and a leap year 366. Between 2000 and 2099, every fourth year is a leap year, and a year's February can be read for its 29 days. 100 years make a century. The dates in one column of a calendar are 7 apart. A month of 31 days is 4 weeks 3 days, so the next month begins 3 days on in the week. A question that asks which day of the week is answered with a day name.

## Student controls
- **Date**: is dropped in a cell of the month calendar
- **Jump**: is dragged down a column from one date to the date 7 days on
- **Month card**: is tapped to show how many days the month has
- **Year strip**: marks a year from 2000 to 2099 and reads its February
- **Next month**: lays the calendar of the next month after this one
- **Number pad**: types a date, a number of days or a day name

## State fields (getState, a resume contract)
phase, month, year, dates, jumps, leap, next_month, answer, complete

## Textbook (this topic)
**Pages:** 158
**Key terms:** calendar, week, fortnight, month, year, leap year, century
A year has 365 days and a leap year 366; weeks, fortnights, months and centuries are named, and a month's calendar is read for dates and days of the week. 7 days make a week and 14 days make a fortnight. Some months have 31 days, some have 30, and February has 28 days, or 29 in a leap year. Between 2000 and 2099, every fourth year is a leap year. On a calendar, each column is one day of the week, and the dates in a column are 7 apart. 1 week is 7 days, and a fortnight is 14 days. January, March, May, July, August, October and December have 31 days each. April, June, September and November have 30 days each. A year has 365 days, but a leap year has 366, with 29 February as the extra day. Between 2000 and 2099, every fourth year is a leap year, such as 2024, 2028 and 2032. So 2028 is a leap year, and 2026 is not a leap year. 100 years make a century. Each column of a calendar is one day of the week. Dates in one column are 7 apart. 1 October 2026 is a Thursday, so the first Friday is 2 October. So 2, 9, 16, 23 and 30 October 2026 are Fridays. February 2026 has 28 days, which is 4 weeks. So 28 days after 1 February 2026 is 1 March 2026. It falls on the same day of the week, a Sunday.
