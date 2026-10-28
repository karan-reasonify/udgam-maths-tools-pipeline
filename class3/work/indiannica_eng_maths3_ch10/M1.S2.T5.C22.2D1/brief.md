# M1.S2.T5.C22.2D1 · write_the_date · Write the Date
indiannica_eng_maths3_ch10 · indiannica_eng_maths3_ch10_v2 v2 (active) · "Time" · segment M1.S2 "How Long, and What Day" · topic M1.S2.T5 "Writing Dates" · printed p.123

> Runtime supplies the standard chrome (bands, zones, header, runs box, slot + pad, bubble, phase bar, type scale, content colours, sounds, finished/idle/restart). `scaffold` puts each phase's concept, teach line, hint ladder, closing line and items into tool.tsx; they are not repeated here. Build the working area and the mechanics.

## What it is
**Description:** Fill the day, month and year boxes on a real card, spell the month in words or write it in numbers, and turn a date from one way into the other.
**Why:** Say the day, the month and the year of a date, write a date with the month in words or in numbers as DD-MM-YYYY, and turn a date from one way into the other.
**Look:** A real card with three rounded boxes for the day, the month and the year, a month ladder of twelve tiles with their numbers, a toggle between the month in words and in numbers, and a pad.
**Context:** Grade 3, the date page of the time chapter. An adult sees a date being copied from words into numbers. What is actually being settled is that a date has three parts, that the month can be written as a word or as a number, and that the two ways name the same date. A child who learned only one way will read 12-04 as the twelfth of December, or write the month as 4 when the box wants 04.
**For the child:** Fill the day, the month and the year. Turn the toggle. Check that both ways say the same date.
**Teaching notes:** Before the tool opens, ask each child to write their own birthday on a card with the month in words, and on a second card in numbers, using a list of the twelve months with their numbers beside them, and to read both aloud to a partner. Wait for the child to say which part is the day, which the month and which the year before you name the two ways. The month number is its place in the year: January is the first month and December the twelfth, and the ladder is there to be looked at, not memorised. Say that both ways are correct and name the same date. A date that does not exist is not a mistake of writing but of the calendar, so ask how many days the month has. Use fresh dates: the exercise's dates and years are the child's own to write.
**Placement:** Explore
**Also mounted in:** M1.S2.T5

## Look
**Chrome:** dim #9AA4AC · ink #2B2B2B · rule #C9BCA6 · panel #F2E4CE · paper #FFFDF7 · accent #5B6770
**Voice:** rate 0.92, pitch 1.06 · figure: None

## Stage (tool-specific layout)
Three bands across 1600 by 900. The header runs 0 to 80 and is one line only: 'Write the Date' in ink at the far left, a small dot set clear of the name, the phase title beside the dot on the same line, the host's navigation, and sound and restart as three round controls at the far right. The canvas runs 92 to 746, one rounded card on the paper colour. At its top left, at x 64, y 108 and 330 by 76, sits the running count: how many of the three boxes are filled. It is never a score. The working area is 1086 by 528 at x 64, y 202. The real card is a rounded card 560 by 300 at x 90, y 230, drawn as a birthday card, an invitation or a school notice in its natural colours with a line of words on it that names the event. The three rounded boxes stand in a row under the words at y 440: the day box 120 wide at x 130, the month box 220 wide at x 270 and the year box 160 wide at x 510, each 70 tall, with its label beneath in words, Day, Month and Year, so a part is told by its label before anything else. When the toggle is set to numbers, short dashes are drawn between the boxes. The month ladder is twelve tiles in two columns of six at x 740, y 232, each 150 by 54 with a 10 gap, each tile holding a month name and its number, January 01 down to December 12, and a tapped tile lights once. The month toggle is a button 300 by 64 at x 740, y 560 labelled Month in words and Month in numbers. A Check button stands under the card at x 90, y 580 (200 by 64), and a line in words under it says when a date is not a real one and why. Down the right of the canvas, in the same rectangle on every phase and never animated in or out, the question sits above the answer slot at x 1186, y 250 (356 by 92) that holds what the child has given, and under it the pad at x 1170, y 368 (388 by 363). The pad is ten number keys and a clear key, for typing the day, the month number and the year into the answer slot. The footer runs 758 to 900: the voice caption at the far left with its speaking dot beside it, measuring its own wrap and dropping a type size rather than spilling, and the phase bar at the right with the question count under it. There is no sidebar and no score box anywhere, and nothing is ever written over the working area. Real objects keep their own natural colours. The hour hand of a clock is vermilion and the minute hand is deep blue, because a hand is a mark that stands for a number, and the hours are vermilion and the minutes deep blue everywhere else, in a digital time, a label and a tag. The a.m. half of a day, from midnight to noon, is sky blue and the p.m. half, from noon to midnight, is amber. The time reached, a length of time worked out, a converted amount and the answer are green. A clock face, rim and numbers are near-black on cream, anything dimmed fades to half strength rather than turning grey, and chrome never borrows one of the five. Each reading survives with the colour taken away, because a time is told by its written label before it is told by its colour.

## Opening (first frame of every mount)
Every mount comes up already furnished for its phase with nothing yet typed. On the first phase a real birthday card stands with its date written on it and three empty boxes under it, labelled Day, Month and Year. On the second a real invitation shows its three boxes filled in numbers, with the toggle set to the month in words. On the third a real school notice shows three empty boxes, the month ladder lit with its numbers, and the toggle set to the month in numbers. On the fourth a real diary page shows a date written in words at the left and an empty row of boxes at the right. One thing moves, once: the first box, or the toggle on the second and fourth phases, gives one slow pulse while the voice speaks its opening line, and a finger on it is the whole way in.

## Phases (what each mount shows and does; the words are in tool.tsx)

### 1 · A date has a day, a month and a year
**Screen:** a real card with a date written on it and three empty rounded boxes labelled Day, Month and Year beneath it
**Does:** reads the date on the card and drops its day, its month and its year into the three boxes
**Win:** all three boxes fill, each with its label, and the card reads the date whole
**Feels:** a date on a card splitting into three parts that drop into three labelled boxes
**Goal:** a date has three parts, a day, a month and a year, and all three are needed
**Observe:** The day, the month and the year each had a box with a label under it.
**Wrong (each is a traceback on the working area):**
- puts the year in the day box → the year box shows its label Year and four boxes of digits, and the day box shows its label Day with room for two digits only
- leaves the month out → the month box lights and the ladder shows the month beside the card, so the missing part is seen
**Misconception to break:** Calling 2017 the day because it is the biggest number.

### 2 · Day-Month-Year: the month in words
**Screen:** a real invitation with its three boxes filled in numbers and the month toggle set to the month in words
**Does:** taps the month on the ladder, watches its name drop into the month box, and reads the date aloud
**Win:** the month name settles in its box and the date reads in words, day then month then year
**Feels:** a month name lifting off the ladder and sliding into its box, and the date reading aloud in order
**Goal:** the Day-Month-Year way writes the day, then the month in words, then the year
**Observe:** The month name dropped into the middle box when it was tapped on the ladder.
**Wrong (each is a traceback on the working area):**
- writes the month as a number in a date that asks for words → the toggle is shown set to the month in words and the ladder lights the month's name, so the word to write is in view
- writes the year before the day → the three boxes show their labels in order, Day, Month and Year, and the date is read aloud in that order
**Misconception to break:** Writing 2013 first, or leaving the month out and writing only 9 2013.

### 3 · DD-MM-YYYY: the month in numbers
**Screen:** a real school notice with its three boxes empty, the month ladder showing each month beside its number, and the toggle set to the month in numbers
**Does:** finds the month on the ladder, reads its number, and types the day, the month and the year with dashes between them
**Win:** the three boxes fill with dashes between them and the date reads in numbers
**Feels:** a month's number lifting off the ladder and sliding into the month box between two dashes
**Goal:** the numerical way writes two digits for the day, two for the month and four for the year, with the month's place in the year
**Observe:** The ladder showed a number beside every month, and the month box took two digits.
**Wrong (each is a traceback on the working area):**
- writes the month as one digit → the month box shows two empty digit places and a note in words that the day and the month take two digits each, with a nought in the first place
- puts the month before the day → the three boxes show their labels in order and the date is read aloud, day then month then year, as the dashes are filled
**Misconception to break:** Writing the month as 10 but the day as 4, or putting 14-2019-10 in the wrong order.

### 4 · From words to numbers and back
**Screen:** a real diary page with a date in words on one side and an empty row of boxes on the other, and the toggle ready to turn it
**Does:** writes the date the other way, taps the toggle to check that the two ways say the same date, and fixes anything that does not match
**Win:** the toggle turns the date and the two ways match, with the month lit once on the ladder
**Feels:** the toggle flipping a date over like a page while the day and the year stay where they are
**Goal:** a date written in words and the same date written in numbers say one date, and either can be turned into the other
**Observe:** The toggle turned the date from words to numbers and the same day stayed on the card.
**Wrong (each is a traceback on the working area):**
- reads the first number of a numbered date as the month → the toggle turns the date and the boxes keep their labels, so the first box is seen to be Day and the second to be Month
- says the two ways name different dates → the month lights once on the ladder for both ways, and the day and the year stay unchanged when the toggle turns
**Misconception to break:** Reading 05-12-2021 as 12 May, because the first number looks like the month.

## Delight
Two small surprises. On the second and third phases, the month name or number lifts off its tile on the ladder and slides across into the month box. On the fourth phase, the toggle flips the whole date over like a page, and the three boxes keep the same day, month and year on the other side.

**General miss line:** Look at the labels under the boxes. Which part goes where?

## Answer key
A date has a day, a month and a year. Day-Month-Year writes the month in words, as in 7 November 2019. DD-MM-YYYY writes the month in numbers, as in 07-11-2019, with two digits for the day, two for the month and four for the year, and the month number is its place in the year, January 01 to December 12. The two ways name the same date, so both are correct. A date must be a real one: no month has more days than it has.

## Student controls
- **Day, month and year boxes**: take the three parts of a date from the pad
- **Month ladder**: lists January to December with the numbers 01 to 12, and lights a month when tapped
- **Month toggle**: turns the same date between the month in words and the month in numbers
- **Number pad**: types the day, the month number and the year
- **Check button**: reads the boxes back against the card and says in words if a date is not real

## State fields (getState, a resume contract)
phase, day, month, year, form, answer, complete

## Textbook (this topic)
**Pages:** 123
**Key terms:** date, day, month, year, Day-Month-Year, DD-MM-YYYY
A date is written with the month in words as Day-Month-Year, or with the month in numbers as DD-MM-YYYY, and the two ways name the same date. A date has a day, a month and a year. In the Day-Month-Year way we write the month in words. In the DD-MM-YYYY way we write the day and the month with two digits each, and the year with four. 7 is the day. November is the month. 2019 is the year. A date always has all three. 7 November 2019 is the Day-Month-Year way. We write the day first, then the month in words, then the year. 07-11-2019. DD is the day, MM is the month and YYYY is the year. The day and the month take two digits each. 15 August 2010 is 15-08-2010. 03-09-2015 is 3 September 2015. Both ways say the same date.
