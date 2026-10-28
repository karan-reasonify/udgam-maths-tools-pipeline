# M1.S1.T2.C6.2D1 · read_the_clock · Read the Clock
indiannica_eng_maths3_ch10 · indiannica_eng_maths3_ch10_v2 v2 (active) · "Time" · segment M1.S1 "Telling the Time" · topic M1.S1.T2 "Reading the Clock" · printed p.117 to p.120

> Runtime supplies the standard chrome (bands, zones, header, runs box, slot + pad, bubble, phase bar, type scale, content colours, sounds, finished/idle/restart). `scaffold` puts each phase's concept, teach line, hint ladder, closing line and items into tool.tsx; they are not repeated here. Build the working area and the mechanics.

## What it is
**Description:** Turn the hands of a wall clock, count the minutes in fives, and say each time as minutes past or minutes to the hour.
**Why:** Name the two hands of a clock and what each tells, count the minutes in fives round the face, say a time as minutes past or minutes to the hour, and read and draw half past, quarter past and quarter to.
**Look:** A wall clock with a vermilion hour hand and a deep blue minute hand, a digital clock beside it, a words card under them, the Minutes, Past and to and Plain dial buttons, and the number pad down the right of the canvas.
**Context:** Grade 3, the first working topic of the time chapter. An adult sees a clock being read, which a paper plate clock does well. What is being settled is which hand does which job, that a number on the face can be an hour or a number of five minute steps, and that the side of the clock the long hand is on decides whether we say minutes past or minutes to. A child who reads the number the long hand points to as the hour will say the time wrongly with great confidence, and a child who counts the long hand's number as minutes will say that a hand on the 4 is 4 minutes.
**For the child:** Drag the hands of the clock. Say which hand is the hour hand. Count the minutes in fives. Say each time aloud.
**Teaching notes:** Give each child a paper plate clock with two card hands of different lengths before the tool opens, and ask them to set a few times and say them aloud. Always ask which hand is meant before a number is read, and count the minutes in fives from the 12 with a finger. Wait for a child to say which side of the clock the long hand is on, rather than saying it for them. Say half past, quarter past and quarter to every time the long hand is on the 6, the 3 or the 9. If a child reads the number the long hand points to as the hour, ask which hand tells the hour. Use fresh times: the printed clocks are the child's to read and draw.
**Placement:** Explore
**Also mounted in:** M1.S1.T2

## Look
**Chrome:** dim #9AA4AC · ink #2B2B2B · rule #C9BCA6 · panel #F2E4CE · paper #FFFDF7 · accent #5B6770
**Voice:** rate 0.92, pitch 1.06 · figure: None

## Stage (tool-specific layout)
Three bands across 1600 by 900. The header runs 0 to 80 and is one line only: 'Read the Clock' in ink at the far left, a small dot set clear of the name, the phase title beside the dot on the same line, the host's navigation, and sound and restart as three round controls at the far right. The canvas runs 92 to 746, one rounded card on the paper colour. At its top left, at x 64, y 108 and 330 by 76, sits the running count: how many times have been read. It is never a score. The working area is 1086 by 528 at x 64, y 202. A plain wall fills the working area. The wall clock hangs at x 110, y 214, 400 across, drawn exactly: a cream face with a dark rim, twelve near-black numbers, sixty minute marks with a longer mark at every fifth, a short vermilion hour hand and a long deep blue minute hand with no arrowheads, the hour hand creeping on as the minute hand turns. With the Minutes button on, the numbers 5, 10 and so on to 60 are written round the outer edge in deep blue. With the Past and to switch on, the right half of the face is tinted sky blue and labelled Past and the left half is tinted amber and labelled To. The digital clock hangs at x 560, y 214, 250 by 110, with its hours vermilion, its minutes deep blue and a near-black colon between them. The words card stands at x 560, y 360, 530 by 90, and says the time in writing, such as ten minutes past four. A green Answer tag at x 560, y 470, 260 by 70, holds the time the child has set or typed. In a task the clock sits in a small scene drawn behind it, a school hall, a bus stop, a railway station, a kitchen or a football ground. The Minutes button stands at x 110, y 650, 150 by 60, the Past and to switch at x 280, y 650, 190 by 60 and the Plain dial button at x 490, y 650, 160 by 60, each labelled in words. In the Plain dial view the same clock is drawn as a bare dial with its hands and no scene. Down the right of the canvas, in the same rectangle on every phase and never animated in or out, the question sits above the answer slot at x 1186, y 250 (356 by 92) that holds what the child has given, and under it the pad at x 1170, y 368 (388 by 363). The pad is ten number keys and a clear key, for typing the hours and then the minutes of a time into the answer slot. The footer runs 758 to 900: the voice caption at the far left with its speaking dot beside it, measuring its own wrap and dropping a type size rather than spilling, and the phase bar at the right with the question count under it. There is no sidebar and no score box anywhere, and nothing is ever written over the working area. Real objects keep their own natural colours. The hour hand of a clock is vermilion and the minute hand is deep blue, because a hand is a mark that stands for a number, and the hours are vermilion and the minutes deep blue everywhere else, in a digital time, a label and a tag. The a.m. half of a day, from midnight to noon, is sky blue and the p.m. half, from noon to midnight, is amber. The time reached, a length of time worked out, a converted amount and the answer are green. A clock face, rim and numbers are near-black on cream, anything dimmed fades to half strength rather than turning grey, and chrome never borrows one of the five. Each reading survives with the colour taken away, because a time is told by its written label before it is told by its colour.

## Opening (first frame of every mount)
Every mount comes up already furnished for its phase with nothing yet typed. On the first phase a wall clock hangs in a school hall with both hands at the twelve and a digital clock beside it, and the words card is blank. On the second the minutes are written round the edge and the minute hand stands on the twelve, with a green tag waiting empty. On the third the clock hangs at a bus stop with its right half tinted sky blue and its left half amber, and the minute hand is already on a number. On the fourth a kitchen clock has three marks lit on its face, the three, the six and the nine, and a time card waits beside it. One thing moves, once: the minute hand gives one slow pulse while the voice speaks its opening line, and a finger on it is the whole way in.

## Phases (what each mount shows and does; the words are in tool.tsx)

### 1 · Two hands: the hour hand and the minute hand
**Screen:** a wall clock in a school hall, a digital clock beside it, and the two hands waiting at the twelve
**Does:** drags each hand round, says which is which and what each tells, and watches the digital clock follow
**Win:** the digital clock changes as each hand turns, and the hour and minute boxes light in their own colours
**Feels:** the two hands turning together and the digital clock following each one in its own colour
**Goal:** the short hand is the hour hand and tells the hour, and the long hand is the minute hand and tells the minutes
**Observe:** The digital clock changed when each hand was dragged, the hours when the short hand moved and the minutes when the long hand moved.
**Wrong (each is a traceback on the working area):**
- calls the long hand the hour hand because it looks bigger → the digital clock changes its hours only when the short hand is moved, and the hours box lights vermilion while the long hand is moved and only the minutes box lights deep blue
- reads the number the long hand points to as the hour → the hour box of the digital clock stays lit vermilion beside the short hand, and the words card says which hand each number belongs to
**Misconception to break:** Calling the long hand the hour hand because it looks like the bigger hand.

### 2 · Five minutes from one number to the next
**Screen:** the wall clock with the minutes switched on round the edge and the minute hand standing on the twelve
**Does:** steps the minute hand from number to number counting in fives, then sends it once round the face
**Win:** the hand closes a round, the hour hand has crept on a little, and a green tag reads one hour
**Feels:** the minute hand stepping five minutes at a time until twelve fives close the round
**Goal:** the minute hand takes five minutes from one number to the next, and twelve fives make a round of sixty minutes
**Observe:** After the minute hand had gone once round, the hour hand stood one number further on.
**Wrong (each is a traceback on the working area):**
- says one minute for each number the hand passes → the minutes are written round the edge in deep blue, so the 3 carries 15, and the hand is walked again from the 12 with each step lit and counted in fives
- counts to the 11 and stops, so the round seems to end at the 11 → the hand is walked once more all the way round to the 12, which is written 60 as well as 0, and the round closes with a green tag that reads one hour
**Misconception to break:** Saying 3 minutes, because the hand moved past 3 numbers.

### 3 · Minutes past and minutes to the hour
**Screen:** the wall clock at a bus stop with the right half tinted sky blue for past and the left half amber for to
**Does:** sets the minute hand on a number, reads which side it is on, and says the time as minutes past or minutes to
**Win:** the side lights up, the words card says the time, and the digital clock agrees
**Feels:** the side of the clock choosing the word, past on the blue side and to on the amber side
**Goal:** on the right of the clock we say minutes past the hour, and on the left we count the minutes to the next hour
**Observe:** A long hand on the right half gave the words minutes past, and on the left half gave minutes to the next hour.
**Wrong (each is a traceback on the working area):**
- says minutes past for a long hand on the left side → the left half is tinted amber and labelled To, the minutes to the next hour are counted back from the 12 in deep blue, and the words card changes to minutes to
- reads the minutes to the next hour as the number the long hand points to → the minutes are counted in fives from the long hand round to the 12, each step lit amber in turn, and only that count is written on the words card
**Misconception to break:** Saying 2 minutes past 4, because the long hand is on the 2.

### 4 · Half past, quarter past and quarter to
**Screen:** a kitchen clock with three marks lit on the face and a time card waiting beside it
**Does:** reads a time with the long hand on the six, the three or the nine, then drags the minute hand to draw a time
**Win:** the minute hand settles on its number, the words card says the time and the digital clock shows the same time
**Feels:** the long hand landing on the six, the three or the nine and the right words arriving with it
**Goal:** the minute hand on the six is half past, on the three it is quarter past and on the nine it is quarter to the next hour
**Observe:** The long hand on the six, the three and the nine gave half past, quarter past and quarter to.
**Wrong (each is a traceback on the working area):**
- says half past for a long hand on the 3 → the face lights the part of the circle the long hand has gone round, a half for the 6 and a quarter for the 3, and the words card changes to quarter past
- says quarter past for a long hand on the 9 → the left half of the face is lit amber, only a quarter of the circle is left to go, and the words card says quarter to the next hour
**Misconception to break:** Saying half past 3, because the short hand is near the 3.

## Delight
On the second phase, as the minute hand goes round a full circle, the hour hand creeps on so slowly that it seems to stand still, and when the round closes it has moved exactly one number, while a green tag lights up with one hour. On the fourth phase, the minute hand settles on the six and the whole right half of the face glows for a moment as the words card says half past.

**General miss line:** Look at the long hand again. Count the minutes in fives from the twelve.

## Answer key
A clock has two hands. The short hand is the hour hand and tells the hour. The long hand is the minute hand and tells the minutes. The minute hand takes 5 minutes to move from one number to the next, so counting in fives from the 12 gives the minutes past the hour. One round of the minute hand is 60 minutes, which is one hour. On the right side of the clock we say minutes past the hour. On the left side we count the minutes to the next hour. The minute hand on the 6 is half past, on the 3 it is quarter past, and on the 9 it is quarter to the next hour.

## Student controls
- **Hour hand**: turns round the face, and the digital clock follows it
- **Minute hand**: turns round the face, and the hour hand creeps on a little as it goes
- **Minutes button**: writes 5, 10 and so on round the outer edge of the face
- **Past and to switch**: tints the right half of the face for past and the left half for to
- **Words card**: says the time aloud and in writing
- **Plain dial button**: redraws the clock as a bare dial
- **Number pad**: types the hours and the minutes of a time

## State fields (getState, a resume contract)
phase, hour, minute, minutesShown, tint, plainDial, answer, complete

## Textbook (this topic)
**Pages:** 117, 118, 119, 120
**Key terms:** hour hand, minute hand, minutes past, minutes to, half past, quarter past, quarter to
The short hand shows the hour and the long hand shows the minutes, five minutes from one number to the next, and a time is read as minutes past or to the hour. The short hand is the hour hand and it tells the hours. The long hand is the minute hand and it tells the minutes. From one number to the next, the minute hand moves 5 minutes. Twelve of these steps bring it all the way round, which takes 1 hour. On the right side of the clock we say minutes past the hour. On the left side we say minutes to the next hour. The minute hand at the 6 is half past, at the 3 it is quarter past, and at the 9 it is quarter to. The short hand is the hour hand. It tells the hours. The long hand is the minute hand. It tells the minutes. A digital clock shows both in digits with a colon. Five minutes pass. There are 12 numbers. Twelve fives make 60. One round of the minute hand is 60 minutes, which is one hour. Twenty minutes past. On the right side we say minutes past the hour. On the left side we count the minutes to the next hour. The minute hand at the 10 is ten minutes to the next hour. Half past. At the 3 we say quarter past. At the 9 we say quarter to the next hour. So 6:30 is half past 6, 6:15 is quarter past 6 and 6:45 is quarter to 7.
