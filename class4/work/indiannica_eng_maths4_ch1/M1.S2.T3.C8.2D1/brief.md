# M1.S2.T3.C8.2D1 · worth_of_a_digit · What a Digit Is Worth
indiannica_eng_maths4_ch1 · indiannica_eng_maths4_ch1_v1 v1 (active) · "Large Numbers" · segment M1.S2 "What Each Digit Is Worth" · topic M1.S2.T3 "What a Digit Is Worth" · printed p.3 to p.6

> Runtime supplies the standard chrome (bands, zones, header, runs box, slot + pad, bubble, phase bar, type scale, content colours, sounds, finished/idle/restart). `scaffold` puts each phase's concept, teach line, hint ladder, closing line and items into tool.tsx; they are not repeated here. Build the working area and the mechanics.

## What it is
**Description:** Tap one digit and see two answers at once: the digit itself, and what it is worth where it sits.
**Why:** Find out why the same digit, written five times in one number, is worth five different amounts.
**Look:** A number sitting in a place value chart, with cards that lift out of it to show what each digit is worth.
**Context:** Grade 4, immediately after the chart has been grown. An adult sees two definitions being given. What the page is actually doing is separating two things a child hears as one word, the digit and what the digit is worth, and it does it by writing the same digit five times so that the difference cannot be explained away.
**For the child:** Tap a digit to see what it is and what it is worth. Tap show all to compare them down the row. Then expand the number into a sum, and collapse it back again to check you have not lost a place.
**Teaching notes:** Open on the number whose digits are all the same and ask what the digits are worth before touching the tool. The expected answer is the digit itself, and it is wrong four times over, which is the whole reason that number is on the page. Say face value and place value in the same breath every time, so the pair is learnt as a pair rather than as two rules. Do a number with a zero in it early; the grey nothing is what settles the argument about what zero is worth. When the expanded form appears, always collapse it again, because rebuilding is the only check the child has.
**Placement:** Explain
**Also mounted in:** M1.S2.T3

## Look
**Chrome:** dim #9AA4AC · ink #2B2B2B · rule #C9BCA6 · panel #F2E4CE · paper #FFFDF7 · accent #5B6770
**Voice:** rate 0.92, pitch 1.06 · figure: None

## Stage (tool-specific layout)
Three bands across 1600 by 900. The header runs 0 to 80 and is one line only: 'What a Digit Is Worth' in ink at the far left, a small dot set clear of the name by measuring it, the phase title beside the dot on the same line, the host's navigation, and again, sound and restart as three round controls at the far right. The canvas runs 92 to 746, one rounded card on the paper colour. At its top left, at 64,108 and 330 by 76, sits the running count: the digits split so far against the digits in the number, two numbers in ink, the first climbing by one each time a digit is tapped and the second fixed at the length of the number; on the third and fourth phases it holds instead the running total of the addends read so far, which arrives at the number itself as the last one is read. It is never a score. The working area is 1086 by 528 at 64,202. A ruled chart 840 by 200 sits across the top of the working area at 187,202: columns 120 wide under headings 44 tall, one digit 64 tall to a column, with the period bands lying behind them, ones deep blue over three places, thousands green over two and lakhs vermilion over two. Under it the card band, 1086 by 200 at 64,426, is where the cards drop, each pair hanging directly under its own column. A tapped digit lifts a little out of its column and lays down two cards: the face value card 118 by 96 holding the digit exactly as it is written, and the place value card 196 by 96 holding what it is worth, with a multiplication sign 28 tall between them and the place named small underneath, so the pair reads as one sentence. Show all lays every pair down at once, so the face value cards read the same digit all the way along the band while the place value cards every one differ. A digit dragged out of its column travels with its face value card stuck to it and leaves its place value card behind; as it lands a fresh place value card is written under it and the old one is left standing hollow in the column it came from, and no column is ever left holding two digits. A zero lays down a face value card reading zero and a grey place value card with nothing on it but a zero, and that card slides out of the row on its own when the number is expanded. Expand lifts the place value cards out of the band into one row 1086 by 84 at 64,646, in place order from the left with plus signs 28 tall between them; collapse drops each addend back under its own column and folds it into the chart as one digit. Down the right of the canvas, in the same rectangle on every phase and never animated in or out, the question sits above the answer slot at 1186,250 (356 by 92) that holds what the child has given, and under it the pad at 1170,368 (388 by 363). The pad is twelve number keys three across wherever a number or a worth is asked for, and on the first phase a word pad of the two names, face value and place value, so that the child answers with the name as well as the number. The footer runs 758 to 900: the voice caption at the far left with its speaking dot beside it, measuring its own wrap and dropping a type size rather than spilling, and the phase bar at the right with the question count under it. There is no sidebar and no score box anywhere, and nothing is ever written over the working area. Content colours are the chapter's own: a digit takes the colour of its period, deep blue in the ones period, green in the thousands and vermilion in the lakhs, and rose in the millions where the international chart reaches; a digit under discussion, or the one that decides a comparison, is amber; a zero holding a place open is grey. Chrome never borrows one of them, and every one of those readings survives with the colour taken away, because a place is told by its column heading and a period by its band before either is told by its colour.

## Opening (first frame of every mount)
Every mount comes up already furnished for its phase with nothing in front of it. On the first phase a number whose digits are all the same sits in the chart, one digit to a column, the period bands lying behind it and every column headed. On the second the same number is already split, every digit standing above its own pair of cards. On the third the chart holds a number with a zero in it and the expand control is lit beside it. On the fourth a row of addends lies across the foot of the working area with plus signs between them and the chart above is ruled and empty. The running count at the top left is empty and the answer slot and the pad stand empty down the right. One thing moves, once: the digit in the highest place, or the expand control, or the first addend of the row, gives one slow pulse while the voice says that every digit in this number is worth something different. That pulse is the only invitation, and a finger on it is the whole way in.

## Phases (what each mount shows and does; the words are in tool.tsx)

### 1 · The digit you see, and what the digit is worth
**Screen:** a number whose digits are all the same, sitting in the chart
**Does:** taps each digit in turn and reads its face value card
**Win:** all the face value cards read the same digit
**Feels:** the same digit five times over, and the first answer is the same five times over
**Goal:** the face value of a digit is the digit itself, wherever it sits
**Observe:** Every face value card under a number of all the same digit read the same.
**Wrong (each is a traceback on the working area):**
- gives five hundred as the face value of the five standing in the hundreds place. → the two cards under that digit are laid down one at a time with a pause between them, the face value card first with the bare digit on it and the heading above the column covered while it is read, then the place value card with the heading uncovered. The child's answer stays in the answer slot beside the pair.
- taps one digit, reads its card and says the others will be different. → the other four digits are tapped in turn and only their face value cards come down, one after another, until five cards stand in a row across the band all reading the same digit.
**Misconception to break:** Giving five hundred, which is the place value and not the face value.

### 2 · Where a digit sits decides what it is worth
**Screen:** the same number with every digit split into its two cards
**Does:** reads the place value cards down the row and drags one digit to another column
**Win:** the place value cards all differ while the face value cards do not
**Feels:** one digit picked up and put down a column along, and its worth jumps ten times
**Goal:** place value is the face value multiplied by the value of the place
**Observe:** The place value cards under those same digits were all different.
**Wrong (each is a traceback on the working area):**
- answers with the digit itself when the place value is asked for. → that digit lifts out of the chart on its own and is set down again in its column with the heading showing above it and the rest of the number dimmed, and its two cards are laid side by side under it, the same digit on the left and what it is worth on the right, with the multiplication between them read out. Nothing is cleared.
- drags a digit into a new column and keeps its old worth. → the old place value card is left standing hollow in the column it came from while a new one is written under the digit in its new column; both cards stay on the stage together and the two column headings above them light in turn.
**Misconception to break:** Answering four, which is the face value rather than the place value.

### 3 · Adding up the worths gives the expanded form
**Screen:** the chart with the expand control lit
**Does:** expands the number and reads the row of addends aloud
**Win:** the addends add back to the number still shown above them
**Feels:** a number that was one thing turns into a row of things that add back to it
**Goal:** the expanded form is the place values written out and added
**Observe:** A digit dragged one column to the left came back worth ten times as much.
**Wrong (each is a traceback on the working area):**
- writes the face values in the row, so the sum is a handful of small numbers. → the row the child wrote stays where it is and under it the same digits each drop their place value card into a second row; the two rows sit one above the other with the number still in the chart above both, and the column headings light along the second row.
- leaves the zero out of the number as well as out of the row. → the row is collapsed back into the chart with the zero's column left empty and the digits to its right slide along into the gap, so the number comes out one place shorter; then the grey zero is put back and the digits move out again to their own columns.
**Misconception to break:** Writing the face values instead, so 8 + 4 + 5 + 3 + 6.

### 4 · Rolling the expanded form back into one number
**Screen:** a row of addends with the chart beneath it empty
**Does:** drops each addend into its own column and reads the number that forms
**Win:** the chart fills and the number matches the row above it
**Feels:** the row folds back up and the number that comes out is the one you began with
**Goal:** rebuilding the standard form is how an expanded form is checked
**Observe:** The zero's card was grey and empty and fell out of the row of addends.
**Wrong (each is a traceback on the working area):**
- adds the addends as loose numbers in their head and loses a place on the way. → each addend travels to the column it names and sets its digit down there, one at a time from the left, the heading lighting as it lands; where no addend names a column, a grey zero drops into it. The child's number stays in the answer slot beside the one the chart built.
- writes the digits side by side in the order of the row and skips the empty places. → the columns are ruled empty and each addend is asked for its place before its digit, so a column that no addend names is left visibly open; a grey zero then falls into every open column while the digits already placed stay exactly where they are.
**Misconception to break:** Adding the addends as loose numbers and losing a place along the way.

## Delight
The first phase, the moment show all is pressed on the number whose digits are all the same. Five identical digits stay exactly where they are while ten cards drop under them in one movement: the upper row reads the same digit five times over, and the row beneath it reads five completely different amounts, each one ten times the one to its right. Nothing else moves and the voice says nothing while it happens.

**General miss line:** Put the digit back in its column and read the heading first.

## Answer key
The face value of a digit is the digit exactly as it is written, whatever place it sits in. The place value is the face value multiplied by the value of that place. The place value of zero is zero everywhere. Writing every place value out and adding them gives the expanded form, and putting the digits back at their own places gives the standard form.

## Student controls
- **Tap a digit**: splits it into its face value card and its place value card
- **Show all**: splits every digit at once so the worths can be compared down the row
- **Drag to a column**: moves a digit to another place and updates what it is worth
- **Expand**: lifts the place values out into a row of addends with plus signs
- **Collapse**: drops the addends back into the chart as one number
- **Number pad**: sets any number of up to six digits into the chart

## State fields (getState, a resume contract)
phase, value, tappedDigit, showAll, expanded, addends, complete

## Textbook (this topic)
**Pages:** 3, 4, 5, 6
**Key terms:** face value, place value, expanded form, standard form
One digit written five times is worth five different amounts, and adding those amounts up is the expanded form. The face value of a digit is the digit just as it appears, so every five here has a face value of five. What each one is worth is a different matter, and that is called its place value. A digit is worth its face value multiplied by the value of its place. The 4 in 74,057 sits in the thousands place, so it is worth 4000. The place value of 0 is 0 wherever it sits. The number you started with comes back. Writing a number as the sum of the place values of its digits is called the expanded form. A zero is left out, because it is worth nothing in any place. Putting the digits back at their own places gives the standard form, which here is 4,56,923. If a place is missing from the sum, a zero holds it open. Rebuilding is how an expanded form is checked.
