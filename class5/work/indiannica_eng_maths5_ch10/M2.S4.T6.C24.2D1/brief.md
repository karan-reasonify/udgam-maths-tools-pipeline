# M2.S4.T6.C24.2D1 · time_columns · Time Column Adder
indiannica_eng_maths5_ch10 · indiannica_eng_maths5_ch10_v3 v3 (active) · "Time" · segment M2.S4 "Working With Time" · topic M2.S4.T6 "Adding and Taking Away Time" · printed p.154 to p.157

> Runtime supplies the standard chrome (bands, zones, header, runs box, slot + pad, bubble, phase bar, type scale, content colours, sounds, finished/idle/restart). `scaffold` puts each phase's concept, teach line, hint ladder, closing line and items into tool.tsx; they are not repeated here. Build the working area and the mechanics.

## What it is
**Description:** Add and take away lengths of time in columns of hours, minutes and seconds, carry and borrow sixty and never ten, and line up seconds with their hundredths.
**Why:** Add lengths of time in columns and carry at sixty, take one length from another and borrow at sixty, and line up seconds with their hundredths, so that any two lengths of time can be added, taken away, compared or shared.
**Look:** A frame of hours, minutes and seconds columns with lengths of time stacked in it, carry and borrow tiles that are dragged across, and on the last phase seconds with two places for hundredths.
**Context:** Grade 5, the pages on adding and taking away lengths of time. An adult sees column sums. What the pages are doing is making the carry and the borrow happen at sixty, between hours and minutes and between minutes and seconds, where it is never ten, and making a team's time a time for the whole team that is shared only if each runner takes the same time.
**For the child:** Work the right-hand column first. Wrap 60 into a carry or break 1 into 60 for a borrow, and drag it across. Line up the points when there are hundredths.
**Teaching notes:** Line up hours under hours, minutes under minutes and seconds under seconds before adding or taking away, and work the right-hand column first. Say how many make one of the next unit each time: it is 60, never 10. When there is too little on top, regroup 1 h as 60 min, or 1 min as 60 s, and say so. Two race times are lined up by their points, like decimals, and they are compared before they are taken apart. A relay time belongs to the whole team, so it is shared equally only if each runner takes the same time, which real runners do not. The two questions about the relay teams at the start of the chapter stay the child's to answer, so answer neither of them for the child.
**Placement:** Explore
**Also mounted in:** M2.S4.T6

## Look
**Chrome:** dim #9AA4AC · ink #2B2B2B · rule #C9BCA6 · panel #F2E4CE · paper #FFFDF7 · accent #5B6770
**Voice:** rate 0.92, pitch 1.06 · figure: None

## Stage (tool-specific layout)
Three bands across 1600 by 900. The header runs 0 to 80 and is one line only: 'Time Column Adder' in ink at the far left, a small dot set clear of the name, the phase title beside the dot on the same line, the host's navigation, and sound and restart as three round controls at the far right. The canvas runs 92 to 746, one rounded card on the paper colour. At its top left, at x 64, y 108 and 330 by 76, sits the running count: the number of columns worked. It is never a score. The working area is 1086 by 528 at x 64, y 202. The frame of three columns, hours, minutes and seconds, stands at x 90, y 240, each column 200 wide and 340 tall, headed by its unit name in ink, with the column of the smaller unit at the right. The lengths of time the question gives are stacked in it in deep blue, labelled Given, one under another, and the right-hand column is lit amber until it is worked. The Regroup button stands at x 780, y 240 and the Break button under it at x 780, y 330. When a column reaches sixty, Regroup wraps the sixty into one of the next unit, 60 min into 1 h and 60 s into 1 min, as a violet tile, labelled Carry, and the child drags it into the next column to the left along y 215. Break turns 1 h into 60 min, or 1 min into 60 s, as a violet tile, labelled Regroup, and the part taken away is crossed out as it goes. On the fourth phase the seconds column grows a point and two places for hundredths, a thin ink rule locks the points of the two times in one line, and a grey zero, labelled Place holder, holds any empty place. Every answer is green, labelled Answer, with its units, along y 640. Down the right of the canvas, in the same rectangle on every phase and never animated in or out, the question sits above the answer slot at x 1186, y 250 (356 by 92) that holds what the child has given, and under it the pad at x 1170, y 368 (388 by 363). The pad is ten number keys with a point key, a delete key, and keys for h, min and s. The footer runs 758 to 900: the voice caption at the far left with its speaking dot beside it, measuring its own wrap and dropping a type size rather than spilling, and the phase bar at the right with the question count under it. There is no sidebar and no score box anywhere, and nothing is ever written over the working area. Content colours are the chapter's own, and the nine tools of this chapter share them. What the question gives, as a clock time, a length of time, a start date or a number of days, is deep blue, labelled Given or Start. What the working reaches, as an end time, a length of time, a converted time or a date, is green, labelled Answer, End or How long. The thin second hand and the seconds it counts are vermilion, labelled Second hand. One jump along a time line, and one regrouped unit carried or borrowed, are violet, labelled Jump, Carry or Regroup. On a day bar the half from noon until just before midnight is rose, labelled p.m., and the half from midnight until just before noon stays warm white inside its outline, labelled a.m. The hand, digit, column, jump or date being worked on now is amber. Grey is kept for a zero holding a place open, labelled Place holder, and for nothing else. The hour hand and the minute hand, dials, tick marks, time lines, arrows, operation signs and step labels are near-black ink, and anything dimmed fades to half strength. Chrome never borrows one of the content colours, and each reading survives with the colour taken away, because a part is told by its written label before it is told by its colour.

## Opening (first frame of every mount)
Every mount comes up already furnished for its phase with nothing yet worked. On the first phase the frame holds two lengths of time in hours and minutes, stacked in deep blue, with the minutes column lit amber. On the second the minutes of the two lengths add to more than sixty and the Regroup button waits beside the frame. On the third a length of time and a smaller one to take away are stacked with fewer minutes on top than below, and the Break button waits. On the fourth two race times in minutes and seconds with hundredths stand side by side, points not yet locked. One thing moves, once: the minutes column, the Break button or the seconds column gives one slow pulse while the voice speaks its opening line.

## Phases (what each mount shows and does; the words are in tool.tsx)

### 1 · Hours with hours, minutes with minutes
**Screen:** a frame of hours and minutes columns with two lengths of time stacked in deep blue
**Does:** adds the minutes column, then the hours column, and reads the total
**Win:** the total turns green with its units
**Feels:** the columns adding one after another and the total turning green
**Goal:** add hours to hours, minutes to minutes and seconds to seconds, right-hand column first
**Observe:** The minutes column was added first, and the hours column after it.
**Wrong (each is a traceback on the working area):**
- adds the hours to the minutes → the columns stay, each unit is lit amber in turn, and the child's total is drawn again in two parts, hours and minutes, beside it
- leaves out a column that holds nothing in one of the lengths → the empty column is lit amber and its place is drawn as a zero, and the sum is worked again with it in place
**Misconception to break:** Adding the hours to the minutes, so the two columns are mixed into one number.

### 2 · Carrying an hour
**Screen:** two lengths of time whose minutes total more than sixty, stacked in the frame, with a Regroup button
**Does:** presses Regroup on the full minutes column, wraps 60 min as 1 h, and drags the tile to the hours column as a carry
**Win:** the carry lands in the hours column, the minutes are fewer than sixty, and the sum turns green
**Feels:** sixty small cells folding into one tile that slides across into the hours column
**Goal:** 60 min make 1 h and 60 s make 1 min, so carry at sixty and never at ten
**Observe:** The tile that was carried held sixty, never ten.
**Wrong (each is a traceback on the working area):**
- carries at ten and leaves a minutes total of sixty or more in the minutes column → the minutes total stays, lit amber, and sixty small cells inside it are outlined as one bundle, ready to become 1 h
- adds the carried hour to the minutes instead of the hours → the carry tile is lit amber in the minutes column, and it is dragged on to the hours column, where the hours are added again
**Misconception to break:** Carrying at ten, as in a sum of ordinary numbers, and leaving 85 min in the minutes column.

### 3 · Borrowing an hour
**Screen:** a length of time and a smaller one to take away, with fewer minutes on top than below
**Does:** breaks 1 h into 60 min, drags them across to the minutes column, then takes away column by column
**Win:** the part taken away is crossed out, and what is left turns green
**Feels:** an hour breaking into minutes and dropping across so the column can be taken from
**Goal:** when the column above is too small to take from, regroup 1 h as 60 min first, then take away
**Observe:** An hour was broken into minutes and dragged across before anything was taken away.
**Wrong (each is a traceback on the working area):**
- takes the smaller number of minutes from the larger, whichever is on top → the answer stays in the slot, the top column is shown too short beside the part to be taken away, both lit amber, and the tile of 1 h waits to be broken
- borrows an hour but adds only ten minutes to the minutes column → the borrow tile is broken again, slowly, into sixty small cells, and all of them are counted while the child's total stays beside it
- adds the borrowed minutes but forgets to take the hour from the hours column → the hours column is lit amber with a crossed-out place waiting for the 1 h that was taken
**Misconception to break:** Taking the smaller number of minutes from the larger in the minutes column, whichever is on top, which gives too many minutes.

### 4 · Seconds and hundredths
**Screen:** two race times in minutes and seconds with hundredths of a second, the points locked in a line, and a grey zero holding any empty place
**Does:** works the hundredths, then the seconds, then the minutes, with the points in a line, and shares a team time only after saying whether every runner took the same time
**Win:** the answer turns green with its points still in line
**Feels:** the two points staying in one line as the hundredths, the seconds and the minutes are worked
**Goal:** seconds with hundredths are lined up by their points and added or taken away like any decimals; a team's time is shared equally only if each runner takes the same time
**Observe:** The points of two times stayed in one line, and a shared time asked a question first.
**Wrong (each is a traceback on the working area):**
- lines the digits up from the right and not by the points → the two points are lit amber and locked in a line, and the child's digits are drawn again against them, hundredths under hundredths
- shares a team's time equally without asking about the runners → the question whether every runner would take the same time is lit amber beside the child's share, and the share is marked as true only if each took the same time
- writes five hundredths of a second as five tenths → a grey zero, labelled Place holder, is set in the tenths place and the time is written again beside the child's
**Misconception to break:** Lining up the digits from the right and not by the points, so the hundredths meet the seconds.

## Delight
On the second phase, as the minutes column fills to sixty, the sixty small cells fold into one violet tile that slides across into the hours column, and the minutes column starts again with what was left.

**General miss line:** Look at the columns again. Has any column got to sixty?

## Answer key
Line up hours under hours, minutes under minutes and seconds under seconds, and work the right-hand column first. 60 s make 1 min and 60 min make 1 h, so carry at sixty and never at ten: 75 min is 1 h 15 min. When there is too little in a column to take from, regroup 1 h as 60 min, or 1 min as 60 s, first: 6 h 15 min is 5 h 75 min. Seconds with hundredths are lined up by their points, like any decimals. A time is shared equally among runners only if each takes the same time.

## Student controls
- **Regroup**: wraps 60 of a smaller unit into one of the next unit as a carry tile
- **Break**: turns one of a unit into 60 of the smaller unit for a borrow
- **Tile drag**: moves a carry or a borrow between the columns
- **Points lock**: lines up the points of two times with hundredths
- **Number pad**: types a column total, a length of time or an answer

## State fields (getState, a resume contract)
phase, stack, columns, carry, borrow, points, answer, complete

## Textbook (this topic)
**Pages:** 154, 155, 156, 157
**Key terms:** add, subtract, regroup, carry, borrow, hundredths of a second
Lengths of time are added and subtracted unit by unit, regrouping 60 min as 1 h and 60 s as 1 min. Lengths of time are added and taken away one unit at a time, starting from the right-hand column. 60 min make 1 h and 60 s make 1 min, so a column that reaches 60 is regrouped. To take away from a column that is too small, break 1 h into 60 min. Seconds with hundredths are lined up by their points, like any decimals. Add the hours and the minutes separately. 3 + 4 = 7 and 20 + 25 = 45. So 3 h 20 min + 4 h 25 min is 7 h 45 min. 40 + 35 = 75, and 75 min is 1 h 15 min. Regroup: carry the 1 h to the hours column. 2 + 1 + 1 = 4, so 2 h 40 min + 1 h 35 min is 4 h 15 min. Seconds regroup the same way, since 60 s make 1 min. 15 min is less than 40 min, so regroup 1 h as 60 min. 6 h 15 min is 5 h 75 min. 75 - 40 = 35 and 5 - 2 = 3. So 6 h 15 min - 2 h 40 min is 3 h 35 min. The minutes are the same, so take away the seconds. 52.75 - 49.30 = 3.45. So 1 min 52.75 s - 1 min 49.30 s is 3.45 s. Line up the points, as with any decimals.
