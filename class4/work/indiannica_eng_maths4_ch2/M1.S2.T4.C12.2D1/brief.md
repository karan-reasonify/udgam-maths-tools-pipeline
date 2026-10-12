# M1.S2.T4.C12.2D1 · missing_digit_detective · Missing Digit Detective
indiannica_eng_maths4_ch2 · indiannica_eng_maths4_ch2_v1 v1 (active) · "Addition" · segment M1.S2 "Carrying, and Carrying Backwards" · topic M1.S2.T4 "Working Back to a Missing Digit" · printed p.19 to p.20

> Runtime supplies the standard chrome (bands, zones, header, runs box, slot + pad, bubble, phase bar, type scale, content colours, sounds, finished/idle/restart). `scaffold` puts each phase's concept, teach line, hint ladder, closing line and items into tool.tsx; they are not repeated here. Build the working area and the mechanics.

## What it is
**Description:** A finished sum with digits hidden under cards, and the only way in is the column on the far right.
**Why:** Find the digits somebody has hidden in a finished sum, using nothing but the column each one sits in.
**Look:** A completed column sum with small cards over some of its digits, and a reasoning strip that opens under whichever column is tapped.
**Context:** Grade 4, and the one place in this chapter where a child has to reason rather than follow a procedure. An adult sees a puzzle. What the page is actually doing is testing whether the carrying of the previous topic was understood or only copied, because a missing digit cannot be found by anybody who does not know where the carried one came from and where it went.
**For the child:** Tap the ones column first, because nothing can carry into it. Work out the hidden digit from what is showing, then move one column to the left and take any carry with you. When every card is lifted, add the whole sum forwards and see whether it comes to the answer that was printed.
**Teaching notes:** This is the reasoning of the chapter and it deserves the slowest pace. Before anything is tapped, ask what is known in a column rather than what is missing, because a child who lists the known digits has already nearly finished. Keep the ones first lock on: being told which column comes first, without being told the answer, is what teaches the order, and the order is the lesson. When the too small light comes on, stop and get it said in words: the answer digit is smaller than the digits above it, so the column passed nine and a carry left. That sentence is the whole topic. Always finish with the forward check, even when everybody is sure. A digit found without allowing for its carry can look right in its own column and be caught nowhere else. The build your own bay is worth the last five minutes: a child who covers digits for a partner has to know which ones can still be found.
**Placement:** Practise
**Also mounted in:** M1.S2.T4

## Look
**Chrome:** dim #9AA4AC · ink #2B2B2B · rule #C9BCA6 · panel #F2E4CE · paper #FFFDF7 · accent #5B6770
**Voice:** rate 0.92, pitch 1.06 · figure: None

## Stage (tool-specific layout)
Three bands across 1600 by 900. The header runs 0 to 80 and is one line only: 'Missing Digit Detective' in ink at the far left, a small dot set clear of the name by measuring it, the phase title beside the dot on the same line, the host's navigation, and again, sound and restart as three round controls at the far right. The canvas runs 92 to 746, one rounded card on the paper colour. At its top left, at 64,108 and 330 by 76, sits the running count: the cards lifted against the cards lying on the sum, two numbers in ink, the first climbing by one as each hidden digit is found; on the fourth phase it carries instead the columns checked forwards against the columns in the sum. Nothing in it ever counts down and nothing in it ever reads as a score. The working area is 1086 by 528 at 64,202. The mat sits across the top of the working area, 800 by 320 at 207,202: a circle band 56 tall along its top with one circle 48 across over every column but the ones, then headings 40 tall, then two addend rows of cells 68 tall, then a rule 6 tall, then the answer row 68 tall beneath it, with the columns 120 wide. A cover card is 96 by 76 and lies on top of an addend digit with a lift tab drawn at its corner, so it reads as something laid down rather than as an empty square; no cover card is ever laid on the answer row, and the answer digits stay in green all the way through. Tapping a column opens the reasoning strip beneath the mat, 1086 by 128 at 64,538: the known digits of that column drawn again in deep blue and set apart from each other, the gap drawn as an amber square, the answer digit in green under a short rule of its own, and any digit standing in the circle above brought down into the strip in vermilion beside the rest. A column tapped before the column to its right is settled is refused: the strip does not open, the column that has to come first is lit with its heading named, and not one digit of the refused column is shown. Settling a column whose total passes nine sends its carry up into the circle above the next column by itself, where it stays in sight for the rest of the sum. The too small light rings an answer digit in amber wherever it is smaller than a digit standing above it, and writes that reading out in words underneath. The forward check band runs 1086 by 56 at 64,674: the completed sum is added again from the ones, one column at a time, its total laid under the answer that was printed with the two rules aligned, each agreeing column ticked in green as it is passed and the first column that parts them, if there is one, lit amber and left lit. The build your own bay takes the reasoning strip's rectangle and holds a blank mat, a pad and a stack of cover cards. Down the right of the canvas, in the same rectangle on every phase and never animated in or out, the question sits above the answer slot at 1186,250 (356 by 92) that holds what the child has given, and under it the pad at 1170,368 (388 by 363). The pad is twelve number keys three across wherever a hidden digit is asked for, and on the third and fourth phases a choice pad of large keys in the same rectangle, reading carried and not carried on the third and agrees and does not agree on the fourth, so that a reading can be given as well as a digit. The footer runs 758 to 900: the voice caption at the far left with its speaking dot beside it, measuring its own wrap and dropping a type size rather than spilling, and the phase bar at the right with the question count under it. There is no sidebar and no score box anywhere, and nothing is ever written over the working area. Content colours are the chapter's own: a number being added is deep blue, the answer standing under the rule is green, a digit carried into the next column is vermilion, a rounded number is rose, the digit under discussion or the one that is missing is amber, and a zero that is only holding a place open is grey. Chrome never borrows one of them, and every one of those readings survives with the colour taken away, because a column is told by the heading written above it before it is ever told by a colour, and a carried digit by being small and by sitting above the column it is going into.

## Opening (first frame of every mount)
Every mount comes up already furnished for its phase with nothing in front of it. On the first phase a single finished ones column stands on the mat with one digit showing, one cover card lying over the digit beside it, and the answer digit in place under the rule. On the second a whole sum stands with cards in three of its columns, every column able to be tapped and none of them settled. On the third a tens column is showing whose answer digit is smaller than both of the digits above it. On the fourth every card has been lifted, the completed sum stands whole, and the forward check waits beside it. The running count at the top left holds the cards lifted against the cards lying on the sum, and the answer slot and the pad stand empty down the right. One thing moves, once: the cover card in the ones column, or the answer digit that looks too small, or the forward check control, gives one slow pulse while the voice says that the ones column is the way in. That pulse is the only invitation, and a finger on it is the whole way in.

## Phases (what each mount shows and does; the words are in tool.tsx)

### 1 · A column can be read backwards
**Screen:** a ones column showing one digit, a covered card and the answer digit
**Does:** works out the only digit that makes the column come out right
**Win:** the card lifts and the column reads correctly in both directions
**Feels:** the answer is showing all along, so the hidden digit has nowhere to hide
**Goal:** a column with one digit missing has only one digit that fits
**Observe:** The ones column could be read with nothing else on the mat settled.
**Wrong (each is a traceback on the working area):**
- writes the answer digit into the covered square. → the reasoning strip opens under the column with its three squares drawn well apart, the two above the rule and the answer under it, the known digit in deep blue and the gap in amber; the column is then read out as one sentence, this and the gap make the answer, with the child's digit still standing where it was put.
- tries digits one after another until one of them is accepted. → the strip stands the tokens of the known digit in the column beside the tokens the answer calls for, both stacks countable at a glance, so the space between the two stacks is the digit that is missing. Nothing is cleared and no digit is refused.
**Misconception to break:** Writing 9, by reading the answer digit as the hidden digit.

### 2 · Start at the ones here too
**Screen:** a sum with cards in three columns and every column tappable
**Does:** taps a middle column, is told which column comes first, and starts at the ones
**Win:** the ones column settles and a carry appears above the column to its left
**Feels:** one column can be read straight away and every other one has to wait its turn
**Goal:** the ones column is the only one nothing can carry into
**Observe:** A middle column tapped first was told which column came before it and nothing else.
**Wrong (each is a traceback on the working area):**
- taps the leftmost covered column first, because its gap looks the easiest to fill. → the column is refused, the strip does not open, and the column that has to be settled first is lit with its heading named; the covered digit stays covered and nothing whatever about the refused column is given away.
- settles the ones column and moves left without taking anything with it. → the tokens of the settled ones column are counted out and ten of them tie and walk left into the circle above the tens, where the carried digit stays in vermilion while the tens column is read again with it standing in place; the digit the child gave stays in the answer slot beside the reading.
**Misconception to break:** Deciding the column is impossible, because no digit added to 8 gives 5 without a carry.

### 3 · A carry explains an answer that looks too small
**Screen:** a tens column whose answer digit is smaller than both digits above it
**Does:** works out what the column really came to and where the rest went
**Win:** the too small light comes on and the carry is drawn into the next circle
**Feels:** the answer digit is smaller than the numbers that made it, and that is the clue rather than the trouble
**Goal:** an answer digit smaller than the digits above it means a carry left
**Observe:** An answer digit smaller than a digit above it meant a carry had left the column.
**Wrong (each is a traceback on the working area):**
- says the sum has been printed wrong, because the answer digit is smaller than both digits above it. → the column is filled with its tokens and counted: they pass nine, ten of them tie and walk left into the circle above the next column, and what is left standing in the column is exactly the answer digit that was printed. The child's verdict stays in the answer slot beside it.
- finds a digit that makes the column come out without allowing for the carry coming into it. → the circle above the column is lit and its digit is drawn down into the reasoning strip with the rest, and the column is counted again with everything that is standing in it; the two readings stand one under the other and what lies between them is the carried digit itself.
**Misconception to break:** Deciding the answer digit must be wrong because it is smaller than 9.

### 4 · Adding it forwards is the check
**Screen:** every card lifted and the forward check waiting
**Does:** adds the whole sum forwards against the answer that was printed
**Win:** the two answers stand together and agree, column by column
**Feels:** the hunt is over and the sum still has to be added the ordinary way
**Goal:** a finished hunt is only finished once it has been added forwards
**Observe:** Every digit that was found made the column to its left readable.
**Wrong (each is a traceback on the working area):**
- lifts the last card and calls the hunt finished without adding anything forwards. → the mat works the completed sum forwards from the ones, one column at a time, and lays its total under the answer that was printed with the two rules aligned; every column that agrees is ticked in green as it is passed, and the first column that parts them, if there is one, is lit amber and stays lit.
- checks by reading the columns backwards a second time, the same way the digits were found. → the same digit comes out a second time and is set beside the first, then the sum is added forwards and the column where the total parts from the printed answer is lit; the two backward readings and the one forward reading are all left standing on the stage together.
**Misconception to break:** Finding a digit without allowing for the carry coming in, and never adding the sum forwards to catch it.

## Delight
The third phase, the moment the answer digit is read against the digits above it. The two digits above the rule light deep blue and the answer digit under it stays green, and the too small light draws an amber ring around that answer digit and holds it. Then a single vermilion token lifts out of the column and settles in the circle above the column to its left, and the column reads its true total for a beat before closing back to the one digit that was printed. The digit that looked wrong is the digit that proves the carry. Nothing else moves and the voice says nothing while it happens.

**General miss line:** Read the column again, and say what is known before you say what is missing.

## Answer key
Work from the ones column leftwards, because nothing can carry into the ones and every other column may have a carry coming in. In each column, the digit that is missing is the one that makes the column come out to the answer digit, allowing for anything carried in and anything carried out. An answer digit smaller than a digit above it means the column passed nine and a carry left it. When every card is lifted, add the whole sum forwards and it must come to the answer that was printed.

## Student controls
- **Cover cards**: hides or lifts a digit of either addend
- **Reasoning strip**: shows what is known in the tapped column and what is missing
- **Ones first lock**: names the column that has to be settled before this one
- **Carry watch**: drops the carry into the circle above once a column is settled
- **Too small light**: marks an answer digit smaller than a digit above it
- **Add it forwards**: works the completed sum forwards against the printed answer
- **Build your own**: lets the child write a correct sum and then cover digits in it

## State fields (getState, a resume contract)
phase, columns, covered, found, carries, columnSettled, checked, complete

## Textbook (this topic)
**Pages:** 19, 20
**Key terms:** missing digit, carry, column, sum
A sum is printed with digits blanked out, and each one is found by reading its own column. If you know the answer in a column and all but one of the digits above it, the one that is missing is fixed. There is only one digit that makes the column come out right. The ones column is the only one that nothing can carry into, so it can always be read on its own. Every column after it may have a carry coming in, and you only know about that carry once the column to its right is settled. When a column comes to more than nine, only the right hand digit is written, so the answer digit can look smaller than the numbers that made it. Finding that is how you know a carry left the column. Write the finished sum out and add it the ordinary way. If it comes to the answer that was printed, the digits you found are right. If it does not, one of them is wrong.
