# M1.S2.T4.C20.2D1 · time_converter · Time Converter
indiannica_eng_maths3_ch10 · indiannica_eng_maths3_ch10_v2 v2 (active) · "Time" · segment M1.S2 "How Long, and What Day" · topic M1.S2.T4 "Hours, Minutes and How Long" · printed p.121 to p.123

> Runtime supplies the standard chrome (bands, zones, header, runs box, slot + pad, bubble, phase bar, type scale, content colours, sounds, finished/idle/restart). `scaffold` puts each phase's concept, teach line, hint ladder, closing line and items into tool.tsx; they are not repeated here. Build the working area and the mechanics.

## What it is
**Description:** Fill an hour with sixty minutes, turn a day through twenty-four hours, lay a length of time along a day strip, and slide it to see when it ends.
**Why:** Change hours into minutes and days into hours with an hour filling and a day turning, find how long something takes by laying a bar along a day strip through noon, and find when something ends by sliding the bar.
**Look:** A wall clock and a stopwatch at the left with a row of twelve five-minute tiles under them, a day strip of twenty-four hour tiles along the foot with a green bar laid on it, a column board, and on the third phase a row of six small clocks.
**Context:** Grade 3, the second half of the time chapter. An adult sees sums with 60 and 24 in them. What is actually being settled is what those two numbers are: sixty small steps in an hour and twenty-four hours in a day, and that a length of time is a stretch laid along a clock, which has to be counted in two pieces when it crosses noon. A child who learned the rule alone will multiply by 60 for days, or subtract 10 from 3 for a match that runs from 10 a.m. to 3 p.m.
**For the child:** Fill the hour with sixty minutes. Turn the day wheel. Lay the green bar along the day. Slide it to find when it ends.
**Teaching notes:** Time one minute with a stopwatch before the tool opens: write the school name, clap, or fill bottles with a mug and a funnel, and count. Say that an hour is sixty of those minutes, and let a paper plate clock turn once to show it. Lay a long paper strip marked in twenty-four hours with noon in the middle, colour the morning half sky blue and the evening half amber, and lay a strip of card along it from a start to an end. When the card crosses noon, cut it there and add the two pieces, and wait for the child to say why before you show the rule. Write noon as 12 noon and midnight as 12 midnight, and never give either of them a.m. or p.m. Use fresh times: the exercise's shifts, films and practice sessions are the child's own to work.
**Placement:** Explore
**Also mounted in:** M1.S2.T4

## Look
**Chrome:** dim #9AA4AC · ink #2B2B2B · rule #C9BCA6 · panel #F2E4CE · paper #FFFDF7 · accent #5B6770
**Voice:** rate 0.92, pitch 1.06 · figure: None

## Stage (tool-specific layout)
Three bands across 1600 by 900. The header runs 0 to 80 and is one line only: 'Time Converter' in ink at the far left, a small dot set clear of the name, the phase title beside the dot on the same line, the host's navigation, and sound and restart as three round controls at the far right. The canvas runs 92 to 746, one rounded card on the paper colour. At its top left, at x 64, y 108 and 330 by 76, sits the running count: the minutes, hours or days now on the stage. It is never a score. The working area is 1086 by 528 at x 64, y 202. The real wall clock is 280 across at x 90, y 230, with its twelve numbers, sixty minute marks and its vermilion hour hand and deep blue minute hand, drawn exactly. The real stopwatch is a round brass face 130 across at x 400, y 240 with a start button on top. The row of twelve five-minute tiles runs at x 400, y 400, each tile 44 by 60 with a 6 gap, empty until the minute hand is dragged round, and labelled 5, 10 and on to 60 as it fills, with the words one hour at its end. The train ticket card or the calendar page card stands at x 690, y 232, 320 by 150, drawn as a real ticket or a real calendar page with its words and numbers. The day strip runs along the foot at x 90, y 610, twenty-four tiles each 40 by 50 with no gap, the first twelve sky blue and labelled a.m. and the next twelve amber and labelled p.m., with a notch and the words 12 noon between them and the words 12 midnight at both ends. The green bar is 40 tall at y 548, laid by dragging its two ends, and it is drawn in two pieces with their two lengths written above when it crosses noon. The column board stands at x 780, y 400, 240 by 150, an hours column and a minutes column with a carry slot above each. On the third phase six small clocks, each 100 across, stand in a row at x 90, y 240 in place of the wall clock, each with a tag that reads minutes after the start. On the fourth phase the flight card or the school bell card stands in the place of the ticket. Down the right of the canvas, in the same rectangle on every phase and never animated in or out, the question sits above the answer slot at x 1186, y 250 (356 by 92) that holds what the child has given, and under it the pad at x 1170, y 368 (388 by 363). The pad is ten number keys, a colon key and two keys labelled a.m. and p.m., for typing a count of minutes, hours or days or a time with a.m. or p.m. into the answer slot. The footer runs 758 to 900: the voice caption at the far left with its speaking dot beside it, measuring its own wrap and dropping a type size rather than spilling, and the phase bar at the right with the question count under it. There is no sidebar and no score box anywhere, and nothing is ever written over the working area. Real objects keep their own natural colours. The hour hand of a clock is vermilion and the minute hand is deep blue, because a hand is a mark that stands for a number, and the hours are vermilion and the minutes deep blue everywhere else, in a digital time, a label and a tag. The a.m. half of a day, from midnight to noon, is sky blue and the p.m. half, from noon to midnight, is amber. The time reached, a length of time worked out, a converted amount and the answer are green. A clock face, rim and numbers are near-black on cream, anything dimmed fades to half strength rather than turning grey, and chrome never borrows one of the five. Each reading survives with the colour taken away, because a time is told by its written label before it is told by its colour.

## Opening (first frame of every mount)
Every mount comes up already furnished for its phase with nothing yet typed. On the first phase the wall clock stands with both hands at twelve, the row of twelve five-minute tiles is empty, and a train ticket card names a journey of some hours and minutes. On the second the day wheel stands with its sky blue half and its amber half and a calendar page card names a holiday of some days. On the third the day strip carries a start and an end across noon, a green bar waits beside it, and a row of six small clocks stands ready. On the fourth the green bar of the time taken waits at the start of the strip and a flight or a school bell card names the start. One thing moves, once: the minute hand, the wheel or the bar gives one slow pulse while the voice speaks its opening line, and a finger on it is the whole way in.

## Phases (what each mount shows and does; the words are in tool.tsx)

### 1 · Sixty minutes make an hour
**Screen:** the wall clock with its hands at twelve, an empty row of twelve five-minute tiles, and a train ticket card that shows a journey of hours and minutes
**Does:** drags the minute hand once round, watches the tiles fill to sixty, then types the minutes in the journey
**Win:** the twelfth tile fills, the row reads one hour, and the answer tag turns green
**Feels:** the minute hand sweeping round and the twelve tiles ticking full one after another
**Goal:** one hour is sixty minutes, so hours change into minutes by multiplying by sixty
**Observe:** One round of the minute hand filled twelve five-minute tiles and the row read sixty.
**Wrong (each is a traceback on the working area):**
- joins the hours and the minutes as one number → the hours are changed on the clock first and the tiles fill that many hours, then the minutes are added in an amber tag after them
- forgets to change the hours at all and gives the minutes alone → the row of sixty tiles fills again once for each hour, and the count under it grows by sixty each time
**Misconception to break:** Writing 910 by joining the 9 and the 10, or forgetting to change the hours at all.

### 2 · Twenty-four hours make a day
**Screen:** the day wheel with its a.m. half sky blue and its p.m. half amber, noon notched, and a calendar page card that shows a holiday of some days
**Does:** turns the day wheel once to count the tiles, then turns it again for each day of the holiday and types the hours
**Win:** the last day's wheel settles, the count of tiles reads the hours, and the answer tag turns green
**Feels:** the day wheel turning once, each turn dropping twenty-four hour tiles into the count
**Goal:** one day is twenty-four hours, so days change into hours by multiplying by twenty-four
**Observe:** The day wheel turned once and counted twenty-four hour tiles, twelve sky blue and twelve amber.
**Wrong (each is a traceback on the working area):**
- multiplies the days by sixty → the wheel turns for one day and the tiles are counted aloud, one number for each, stopping at twenty-four
- multiplies the days by twelve → the sky blue half and the amber half are both counted, and the two twelves are added on the wheel
**Misconception to break:** Multiplying by 60, the minutes in an hour, because the last answer was done with 60.

### 3 · How long did it take?
**Screen:** the day strip with a start and an end marked, a green bar waiting to be laid along it, a card that names a start and an end across noon, and the six small clocks of a race; the day strip with a green bar of the time taken waiting at the start, a flight or a bell card that names a start and a length of time, and the column board
**Does:** drags the ends of the bar to the start and the end, watches it split at noon, adds the two pieces, and taps the longest and the shortest of the six clocks; slides the bar along the strip from the start, adds the hours and then the minutes on the board, and types the end time with a.m. or p.m.
**Win:** the bar splits at noon, its two pieces are added above it, and the total turns green; the bar's end lands on a tile, the end time reads on the strip, and the answer tag turns green
**Feels:** a green bar laid along the day and splitting at the noon notch into two pieces that join into one total; a green bar sliding along the day, over the noon notch, and stopping where the thing ends
**Goal:** the length of time between two times is found by counting to noon and from noon, and adding the two parts; the end time is the start time plus the time taken, hours first and then minutes, written with a.m. or p.m.
**Observe:** A bar that crossed noon split into two pieces and the two lengths added up to the whole.
**Wrong (each is a traceback on the working area):**
- takes the start time from the end time without passing noon → the bar is laid along the strip from the start and is cut at the noon notch into two pieces, and the two pieces are counted aloud
- counts only the part before noon → the second piece lights amber and its length is written above it, and the two lengths are added in a green tag
- adds the minutes first and loses the hours → the bar slides along by the hours first and settles, then slides on by the minutes, so the two steps can be seen in turn
- keeps a.m. after the end has passed noon → the bar's end lands on an amber tile and the word p.m. is written there, with the noon notch lit as the bar crosses it
**Misconception to break:** Taking 10 from 3, or counting 3 minus 10 as if the clock never passed noon. / Writing 12:65 for the minutes, or keeping a.m. after the time has passed noon.

## Delight
Two small surprises. On the first phase, as the minute hand sweeps round, each five-minute tile fills with a small tick of the stopwatch and the last tile closes the row with the stopwatch button popping up. On the third and fourth phases, the green bar crosses noon and splits into two pieces that slide together into one total, and slid backwards they split again.

**General miss line:** Count again, one step at a time. Which side of noon are you on?

## Answer key
There are 60 minutes in an hour, so hours change into minutes by multiplying by 60, and an hour and some minutes is changed by changing the hours and adding the minutes. There are 24 hours in a day, so days change into hours by multiplying by 24. To find how long something takes, count from the start to noon and from noon to the end, and add the two parts; if it does not cross noon, count straight across. To find when something ends, add the time taken to the start time, hours first and then minutes, and write a.m. or p.m. by which side of noon the end falls on. Noon and midnight take neither a.m. nor p.m.

## Student controls
- **Minute hand**: drags once round the wall clock, and the five-minute tiles fill one at a time
- **Day wheel**: turns once through the twenty-four hour tiles, the a.m. half sky blue and the p.m. half amber
- **Bar ends**: drag to lay a green bar along the day strip from a start to an end
- **Slide the bar**: moves the whole bar along the strip so its end shows when something ends
- **Column board**: takes a sum of hours and minutes with the carry shown above the column
- **Race row**: shows six small clocks as minutes after a start, and the child taps the longest and the shortest
- **Number pad**: types any count of hours, minutes or days and any answer

## State fields (getState, a resume contract)
phase, hours, minutes, days, start, end, answer, complete

## Textbook (this topic)
**Pages:** 121, 122, 123
**Key terms:** hour, minute, day, convert, elapsed time, duration
Hours change into minutes by multiplying by 60 and days into hours by multiplying by 24, and the length of time between two times and the end time are worked out. One hour is 60 minutes, so we multiply the hours by 60 to find the minutes. One day is 24 hours, so we multiply the days by 24 to find the hours. To find how long something took, count the hours up to noon, then on from noon, and add the two. To find when something ends, add the hours to the start time first, and then add the minutes. One hour is 60 minutes. Two hours is two sixties. So 2 hours is 120 minutes. One day is 24 hours. Six days is six twenty-fours. So 6 days is 144 hours. Count from 8 a.m. to noon: 4 hours. Then from noon to 2 p.m.: 2 hours. 4 plus 2 is 6 hours. Add the hours to the start time. 5:15 p.m. plus 3 hours is 8:15 p.m.
