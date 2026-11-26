# M1.S1.T2.C8.2D1 · clock_hands · Three Hands Clock
indiannica_eng_maths5_ch10 · indiannica_eng_maths5_ch10_v3 v3 (active) · "Time" · segment M1.S1 "Reading Time" · topic M1.S1.T2 "Hands on the Clock" · printed p.147 to p.150

> Runtime supplies the standard chrome (bands, zones, header, runs box, slot + pad, bubble, phase bar, type scale, content colours, sounds, finished/idle/restart). `scaffold` puts each phase's concept, teach line, hint ladder, closing line and items into tool.tsx; they are not repeated here. Build the working area and the mechanics.

## What it is
**Description:** Turn the three hands of one clock together, sort times into a.m. and p.m. on a day bar, and read the hour, the minute and the thin second hand to the second.
**Why:** Name the units of time and how they fit, sort times into a.m. and p.m. by the half of the day they fall in, read the minute hand and the hour hand together, and read a clock to the second with the thin second hand.
**Look:** One round clock face with three hands, a day bar under it split at noon, and a tally of the turns of the hands.
**Context:** Grade 5, the pages on the units of time and on reading a clock. An adult sees a clock face with three hands. What the pages are doing is making each hand count its own unit, with the minute hand and the second hand both counting in fives, and making the hour hand move on as the minutes pass instead of sitting on a number.
**For the child:** Turn the thin hand and watch the next hand move on. Drop each time on its half of the day bar. Read the minutes, then the hour, then the seconds.
**Teaching notes:** Turn the hands of a real clock or a paper clock first. Say the second is the smallest unit this chapter uses, because races are timed in hundredths of a second. Keep a.m. and p.m. to their halves of the day: a.m. from midnight until just before noon, p.m. from noon until just before midnight, with noon and midnight written in words. Say the minute hand points to a number and each number is 5 min, and show the hour hand moving on as the minutes pass: at a quarter past it has gone a quarter of the way to the next number, so it is never on a number. Name the second hand by its thin line and its speed, never by its colour alone.
**Placement:** Explore
**Also mounted in:** M1.S1.T2

## Look
**Chrome:** dim #9AA4AC · ink #2B2B2B · rule #C9BCA6 · panel #F2E4CE · paper #FFFDF7 · accent #5B6770
**Voice:** rate 0.92, pitch 1.06 · figure: None

## Stage (tool-specific layout)
Three bands across 1600 by 900. The header runs 0 to 80 and is one line only: 'Three Hands Clock' in ink at the far left, a small dot set clear of the name, the phase title beside the dot on the same line, the host's navigation, and sound and restart as three round controls at the far right. The canvas runs 92 to 746, one rounded card on the paper colour. At its top left, at x 64, y 108 and 330 by 76, sits the running count: the number of clock readings made. It is never a score. The working area is 1086 by 528 at x 64, y 202. One round clock face stands at the left of the area at x 90, y 220, 380 by 380, with twelve numbers and sixty small marks in near-black ink. The hour hand is short and thick and the minute hand is long, both near-black ink, and the thin second hand is longer than both, vermilion, labelled Second hand. Every hand's name is written outside the dial at its rim, so no label line crosses the face. The turning handle stands under the dial at x 200, y 650. The tally stands beside the clock at x 520, y 230, three counters for minutes, hours and days, and each full turn of a hand adds one to the counter of the next. The day bar runs along y 320 from x 520 to x 1110 and is 90 tall: its half from midnight until just before noon stays warm white inside its outline, labelled a.m., its half from noon until just before midnight is rose, labelled p.m., and 12 noon is marked where the halves meet. The time cards wait in a tray at x 520, y 450, each deep blue, labelled Given, and a card lands on the half it is dropped on. On the third phase the number under the minute hand lights amber, and a violet tag beside the dial counts 5 min for each number passed. On the fourth phase a vermilion tag counts 5 s for each number the thin second hand passes, and the reading is built up in green, labelled Answer, at x 520, y 650. Down the right of the canvas, in the same rectangle on every phase and never animated in or out, the question sits above the answer slot at x 1186, y 250 (356 by 92) that holds what the child has given, and under it the pad at x 1170, y 368 (388 by 363). The pad is ten number keys with a delete key, and keys for h, min and s. The footer runs 758 to 900: the voice caption at the far left with its speaking dot beside it, measuring its own wrap and dropping a type size rather than spilling, and the phase bar at the right with the question count under it. There is no sidebar and no score box anywhere, and nothing is ever written over the working area. Content colours are the chapter's own, and the nine tools of this chapter share them. What the question gives, as a clock time, a length of time, a start date or a number of days, is deep blue, labelled Given or Start. What the working reaches, as an end time, a length of time, a converted time or a date, is green, labelled Answer, End or How long. The thin second hand and the seconds it counts are vermilion, labelled Second hand. One jump along a time line, and one regrouped unit carried or borrowed, are violet, labelled Jump, Carry or Regroup. On a day bar the half from noon until just before midnight is rose, labelled p.m., and the half from midnight until just before noon stays warm white inside its outline, labelled a.m. The hand, digit, column, jump or date being worked on now is amber. Grey is kept for a zero holding a place open, labelled Place holder, and for nothing else. The hour hand and the minute hand, dials, tick marks, time lines, arrows, operation signs and step labels are near-black ink, and anything dimmed fades to half strength. Chrome never borrows one of the content colours, and each reading survives with the colour taken away, because a part is told by its written label before it is told by its colour.

## Opening (first frame of every mount)
Every mount comes up already furnished for its phase with nothing yet turned. On the first phase one clock face stands with all three hands at the top and a tally beside it for minutes, hours and days. On the second the day bar lies under the clock, its a.m. half warm white and its p.m. half rose, with a tray of time cards beside it. On the third the clock shows a time to set, with the hour hand and the minute hand near-black ink. On the fourth the thin second hand, vermilion and longer than both, is on the clock, and a tray of readings waits below it. One thing moves, once: the turning handle, the first time card, the minute hand or the thin second hand gives one slow pulse while the voice speaks its opening line.

## Phases (what each mount shows and does; the words are in tool.tsx)

### 1 · Seconds, minutes, hours and days
**Screen:** one clock face with all three hands at 12, and a tally beside it for minutes, hours and days
**Does:** turns the thin second hand once round, then the minute hand, then the hour hand twice, and watches the next hand move on each time
**Win:** the hour hand has gone twice round and the tally shows 1 day is 24 h
**Feels:** the three hands clicking on together, each turn of one hand moving the next hand one step
**Goal:** 60 s make 1 min, 60 min make 1 h, and 1 day is 24 h
**Observe:** One turn of the thin second hand moved the minute hand on by a small mark, and one turn of the minute hand moved the hour hand on by a number.
**Wrong (each is a traceback on the working area):**
- says the hour hand goes once round the clock in a whole day → the answer stays in the slot, the day bar lights amber under the clock, and the hour hand is turned round a second time so that the two turns are counted against the one day
- writes a hundred for the minutes in an hour → the answer stays in the slot, the minute hand is turned once round again, and the sixty small marks are counted out in a violet tag beside it
**Misconception to break:** Counting one turn of the hour hand as a whole day, when one turn is only half of it.

### 2 · a.m. and p.m.
**Screen:** the day bar under the clock, its a.m. half warm white and its p.m. half rose, with 12 noon marked between them, and a tray of time cards
**Does:** drops each time card on the half of the day bar where the time belongs, and writes a.m. or p.m. after it
**Win:** every card sits in its own half of the day bar with the right label
**Feels:** the cards settling into the two halves of the day bar, warm white and rose
**Goal:** a.m. runs from midnight until just before noon, and p.m. from noon until just before midnight; noon and midnight are written 12 noon and 12 midnight
**Observe:** Every card stayed in the half of the day bar it was dropped on, and 12 noon sat where the two halves met.
**Wrong (each is a traceback on the working area):**
- writes a.m. after a time in the afternoon → the card stays where it was dropped, the rose p.m. half lights amber, and the words from noon until just before midnight are written in ink under it
- gives 12 noon an a.m. or a p.m. label → the card stays, the 12 noon mark lights amber where the two halves meet, and the words 12 noon are written in ink beside it with no a.m. or p.m.
**Misconception to break:** Writing a.m. for the afternoon because the day began at 12 midnight.

### 3 · Hour hand and minute hand
**Screen:** the clock face with the hour hand and the minute hand near-black, and a time to set
**Does:** sets the minute hand on a number, counts 5 min for each number, and checks that the hour hand has moved on from its number
**Win:** the minutes and the hour are read together and turn green, as 35 min past 4
**Feels:** the hour hand creeping on as the minute hand goes round
**Goal:** the minute hand moves 5 min from one number to the next, and the hour hand moves on as the minutes pass, so it has passed its number
**Observe:** The hour hand had moved on from its number whenever the minute hand was on a number.
**Wrong (each is a traceback on the working area):**
- reads the hour from the number the hour hand is nearest to, so a time past the hour is called the next hour → the hour hand is drawn again at the hour it has just passed, the small step it has still to take is lit amber, and the reading stays in the slot
- reads the number the minute hand points at as the minutes → the minute hand is walked round from the top in fives, a violet tag counting 5 min for each number, while the reading stays in the slot
- moves the minute hand and leaves the hour hand where it was → the hour hand is drawn moving on a little with each number the minute hand passes, and the step it has taken is lit amber
**Misconception to break:** Taking the hour from the number the hour hand looks nearest to, so the time is called past 5 when the hour hand has only moved on from the 4.

### 4 · The second hand
**Screen:** the clock face with all three hands, the thin second hand longer than both and vermilion, and a tray of readings
**Does:** counts aloud while the thin second hand goes once round, counts 5 s for each number, then reads the whole clock, and drags a missing second hand to its number
**Win:** the reading turns green, as 20 min 35 s past 9
**Feels:** the reading turning green with its minutes and its seconds together
**Goal:** the thin second hand moves 5 s from one number to the next, and a clock is read to the second as minutes and seconds past the hour
**Observe:** The thin second hand counted in fives too, and its name was written outside the dial.
**Wrong (each is a traceback on the working area):**
- reads the number the thin second hand points at as minutes → the thin hand is drawn again in vermilion with the label Second hand written outside the dial, and a vermilion tag counts 5 s for each number while the reading stays in the slot
- reads the hour and the minutes and leaves the seconds off → the thin hand is lit amber and its number is counted in fives in vermilion, waiting to be added to the reading
**Misconception to break:** Taking the thin second hand for a second minute hand because both are long, and reading its number as minutes.

## Delight
On the first phase, as the thin second hand finishes its first turn, the minute hand steps on by one small mark, and when the minute hand finishes its turn the hour hand steps on by one number, so the three hands click on together like the wheels of a music box.

**General miss line:** Look at all three hands again. What does each one count?

## Answer key
60 s make 1 min, 60 min make 1 h, and 1 day is 24 h. a.m. runs from midnight until just before noon, and p.m. from noon until just before midnight. Noon and midnight are written 12 noon and 12 midnight, never with a.m. or p.m. The minute hand moves 5 min from one number to the next, so a minute hand on 7 shows 35 min. The hour hand moves on as the minutes pass, so at 35 min past 4 it is between 4 and 5, past the 4. The thin second hand moves 5 s from one number to the next, so on 9 it shows 45 s. A clock is read as minutes and seconds past the hour, such as 20 min 35 s past 9.

## Student controls
- **Turning handle**: turns the thin second hand, and the minute hand and hour hand follow it
- **Minute hand**: is dragged onto a number, and the hour hand moves on for the minutes
- **Second hand**: is dragged onto a number on the last phase
- **Time card**: is dropped on the a.m. half or the p.m. half of the day bar
- **Number pad**: types minutes, seconds or a time

## State fields (getState, a resume contract)
phase, hands, tally, cards, reading, answer, complete

## Textbook (this topic)
**Pages:** 147, 148, 149, 150
**Key terms:** second, minute, hour, day, a.m., p.m., hour hand, minute hand, second hand
Time is measured in seconds, minutes, hours and days; a.m. runs from midnight to noon and p.m. from noon to midnight; a clock is read to the second. 60 s make 1 min, 60 min make 1 h and 24 h make 1 day. From midnight until just before noon, times are a.m., and from noon until just before midnight they are p.m. The short hand is the hour hand, the long hand is the minute hand, and the thin, longest hand is the second hand. Each numbered mark is 5 min for the minute hand and 5 s for the second hand. 60 s make 1 min, and 60 min make 1 h. 1 day is 24 h. So 1 h is 3600 s. A blink takes less than 1 s, and a short song takes about 3 min. From midnight until just before noon, times are a.m. From noon until just before midnight, times are p.m. So 40 min past 7 in the evening is 7:40 p.m. Noon itself is written 12 noon, and midnight 12 midnight. The short hand is the hour hand, and the long hand is the minute hand. From one number to the next, the minute hand moves 5 min. It points to 11, and 11 x 5 = 55, so 55 min have passed. The hour hand has not yet reached 3, so it is 55 min past 2, not past 3. It is the second hand, and it counts seconds. From one number to the next, it moves 5 s. When it points to 7, it shows 7 x 5 = 35 s. With the minute hand on 4 and the hour hand just past 9, the clock shows 20 min 35 s past 9.
