# M2.S3.T5.C16.2D1 · digit_lab · Digit Lab
indiannica_eng_maths4_ch1 · indiannica_eng_maths4_ch1_v1 v1 (active) · "Large Numbers" · segment M2.S3 "Comparing and Building" · topic M2.S3.T5 "Making Numbers, and Stepping by One" · printed p.9 to p.11

> Runtime supplies the standard chrome (bands, zones, header, runs box, slot + pad, bubble, phase bar, type scale, content colours, sounds, finished/idle/restart). `scaffold` puts each phase's concept, teach line, hint ladder, closing line and items into tool.tsx; they are not repeated here. Build the working area and the mechanics.

## What it is
**Description:** A rack of digit cards that will not let a zero stand at the front of a number.
**Why:** Build the biggest and the smallest number you can from a handful of digit cards, and find out where a zero is allowed to go.
**Look:** A rack of digit cards along the bottom and a row of empty slots above it waiting to be filled.
**Context:** Grade 4, after comparing is secure. An adult sees a puzzle about arranging digits. What the page is actually doing is teaching one rule with one exception, and the exception is the whole lesson: zero cannot lead, because a number that starts with zero has quietly lost a place.
**For the child:** Read the target strip, then drag cards from the rack into the slots. Try putting a zero at the front and see what happens. If you are short of cards, repeat one. Then use the stepper to find the numbers one either side.
**Teaching notes:** Give a set with a zero in it on the very first try, not the third. The zero rule is the whole difficulty of this topic and everything else is rearranging. When the leading slot refuses the zero, stop and ask why 0,23,569 is not a six digit number at all; that question teaches more than the rule does. Repeating a digit is a separate move, so ask how many places are wanted before any card is cloned. For the stepper, choose numbers that roll over, such as the greatest five digit number. The easy ones teach nothing at all.
**Placement:** Apply
**Also mounted in:** M2.S3.T5

## Look
**Chrome:** dim #9AA4AC · ink #2B2B2B · rule #C9BCA6 · panel #F2E4CE · paper #FFFDF7 · accent #5B6770
**Voice:** rate 0.92, pitch 1.06 · figure: None

## Stage (tool-specific layout)
Three bands across 1600 by 900. The header runs 0 to 80 and is one line only: 'Digit Lab' in ink at the far left, a small dot set clear of the name by measuring it, the phase title beside the dot on the same line, the host's navigation, and again, sound and restart as three round controls at the far right. The canvas runs 92 to 746, one rounded card on the paper colour. At its top left, at 64,108 and 330 by 76, sits the running count: the card slots filled against the card slots the target asks for, two numbers in ink, the first climbing by one as each card lands and dropping back by one when a card is lifted out again; on the fourth phase it carries the steps taken instead, up and down counted separately, so a step back is never shown as a step undone. The working area is 1086 by 528 at 64,202. The target strip runs across the top of the working area, 1086 by 56 at 64,202, one line in ink saying the greatest or the smallest and how many places the number must have, with the places drawn as that many small empty boxes at its right end so the target can be counted as well as read. Under it the card slots, up to six of them, 120 wide by 150 tall with a gap of 18, laid as one row at 64,274 and each carrying its place name in small ink underneath, so a card dropped in can be read for what it is worth as well as for what it is; the leading slot is drawn with a heavier outline than the rest. The stepper is a strip 1086 by 72 at 64,448: two round controls 72 across at its centre, one up and one down, with the number one less written to their left and the number one more to their right as each is made. The rack runs along the foot, 1086 by 182 at 64,548, holding the digit cards face up at 96 by 126 each, the digit 72 tall in ink on the paper colour, and a card lifted out leaves its outline behind in the rack so the set given stays countable. Sort the rack slides the cards still in it into increasing or decreasing order without lifting any of them. A zero dropped into the leading slot is refused: the outline shakes twice, a note 300 by 64 writes itself in the strip directly beneath saying that a number cannot begin with zero, and the zero then slides sideways along the row into the second slot by itself, any cards already standing to its right stepping one place along to let it in, so the number keeps all of its places. Repeat a card is a control 180 by 56 at the right end of the rack; pressing it and then a card lays an identical card beside it in the rack, drawn with a doubled outline so a clone is never mistaken for a card that was given. A step across a row of nines turns each nine over to a zero in turn, right to left, and the last carry opens one more card slot at the leading end if it has to. Down the right of the canvas, in the same rectangle on every phase and never animated in or out, the question sits above the answer slot at 1186,250 (356 by 92) that holds what the child has given, and under it the pad at 1170,368 (388 by 363). The pad is twelve number keys three across wherever a number is asked for, and on the third phase a choice pad of the rack's own cards as large keys in the same rectangle, so the card to be repeated can be chosen with one press instead of being dragged. The footer runs 758 to 900: the voice caption at the far left with its speaking dot beside it, measuring its own wrap and dropping a type size rather than spilling, and the phase bar at the right with the question count under it. There is no sidebar and no score box anywhere, and nothing is ever written over the working area. Content colours are the chapter's own: a digit takes the colour of its period, deep blue in the ones period, green in the thousands and vermilion in the lakhs, and rose in the millions where the international chart reaches; a digit under discussion, or the one that decides a comparison, is amber; a zero holding a place open is grey. Chrome never borrows one of them, and every one of those readings survives with the colour taken away, because a place is told by its column heading and a period by its band before either is told by its colour.

## Opening (first frame of every mount)
Every mount comes up already furnished for its phase with nothing in front of it. On the first phase six digit cards lie face up in the rack along the foot of the working area and six empty card slots wait above them, with the target strip across the top asking for the greatest and saying how many places. On the second the same six cards are back in the rack, the card slots are empty again, the strip now asks for the smallest, and the zero card sits in the rack looking like any other. On the third only five cards lie in the rack with six card slots waiting, so one slot must go unfilled unless a card is cloned. On the fourth a finished number stands in the card slots with the stepper parked beside it. The running count at the top left holds the slots filled against the slots wanted, and the answer slot and the pad stand empty down the right. One thing moves, once: the largest card in the rack, or the zero card, or the empty sixth slot, or the stepper's up control, gives one slow pulse while the voice says to read the strip first. That pulse is the only invitation, and a finger on it is the whole way in.

## Phases (what each mount shows and does; the words are in tool.tsx)

### 1 · The greatest number you can make from given digits
**Screen:** six cards in the rack and six empty slots above
**Does:** drags the largest card to the leftmost slot and carries on down
**Win:** the slots fill in decreasing order and the target strip clears
**Feels:** one card decides most of the answer, and it is the one at the front
**Goal:** decreasing order puts the largest digit where it is worth the most
**Observe:** Laying the cards in decreasing order gave the greatest number every time.
**Wrong (each is a traceback on the working area):**
- builds from the smallest card upward and fills the leftmost slot last. → the number the child built stays in the card slots and a second row of the same cards is laid under it in decreasing order; the two rows are read out place by place from the left, the place names under the slots lighting as each pair is read. Neither row is taken away.
- puts the largest card in the last slot because it is worth the most. → that same card is carried along the row from the right to the left one slot at a time, and the place name under each slot lights with what the card would be worth standing there, the number growing as it travels.
**Misconception to break:** Starting from the smallest digit and building the number the wrong way round.

### 2 · The smallest number, and where zero has to go
**Screen:** the same cards, with the target strip now asking for the smallest
**Does:** tries the zero in the leading slot, is refused, and moves it along
**Win:** the zero settles into the second slot and the number keeps all its places
**Feels:** the one card you were surest about is the one card that is not allowed there
**Goal:** a zero cannot lead, so it takes the second place
**Observe:** The leading slot would not take the zero, and it said why.
**Wrong (each is a traceback on the working area):**
- puts the zero at the front and reads the result as a six digit number. → the leading slot shakes twice and writes its reason underneath, then the zero slides into the second slot on its own; the places are counted from the right and where the zero had been standing the count comes up one short and the leading place name goes dark. The child's number stays in the answer slot.
- sends the zero all the way to the end of the row to be rid of it. → the number built that way is laid under the number with the zero in the second slot and the two are compared place by place from the left, the first place where they differ lighting amber. Both rows stay on the stage.
**Misconception to break:** Writing 0,23,569, which is really a five digit number wearing a zero.

### 3 · Repeating a digit to fill more places
**Screen:** five cards in the rack but six slots waiting above
**Does:** clones one card and arranges all six
**Win:** the repeated digit is the largest one and the number is the greatest possible
**Feels:** there are not enough cards, and you are allowed to make another one
**Goal:** the digit you repeat decides whether you get the greatest or the smallest
**Observe:** The zero moved along one slot and the number still had all its places.
**Wrong (each is a traceback on the working area):**
- repeats the first card in the rack rather than the largest one. → the clone is laid beside its card with its doubled outline, the row is built, and the number it makes is set under the number the largest card would have made; the two are compared place by place from the left with the first place that differs lighting amber. Neither number is removed.
- leaves the sixth card slot empty and reads the number as finished. → the small boxes at the end of the target strip are counted out against the card slots holding a card, and the one empty slot is left ringed with its place name lit beneath it; the repeat control lights and nothing else on the stage moves.
**Misconception to break:** Repeating the first card in the rack rather than the largest one.

### 4 · One more and one less
**Screen:** a finished number with a stepper beside it
**Does:** steps up once and down once and reads both neighbours
**Win:** both neighbours are read out and a row of nines rolls over correctly
**Feels:** one step up and a whole row of nines turns over under your hand
**Goal:** the successor is one more and the predecessor is one less
**Observe:** One card short of the places wanted, repeating the largest card beat every rearrangement.
**Wrong (each is a traceback on the working area):**
- gives the predecessor when the successor was asked for. → the number is laid on a short ruled strip with its two neighbours drawn either side of it, the one less at its left and the one more at its right, and the step the child took is walked out along the strip so its direction can be seen. The child's number stays in the answer slot.
- steps up from a row of nines and changes only the last digit. → the step is taken again slowly: each nine turns over to a zero in turn from the right, handing one on to the place at its left, and when the run of nines is used up a new card slot opens at the leading end to catch the last carry.
**Misconception to break:** Swapping the two words and giving the predecessor when the successor was asked for.

## Delight
The second phase, the moment the zero is dropped into the leading slot. The slot refuses it: the outline shakes twice and the reason writes itself out underneath in words. Then the zero slides sideways along the row into the second slot on its own, and the leading slot is left standing open with its heavier outline, waiting for a card that is not a zero. Nothing is taken off the stage, nothing is marked, and the row still holds as many places as it did before. The voice says nothing while it happens.

**General miss line:** Lay the cards back in the rack and sort them before you build again.

## Answer key
Writing the digits in decreasing order gives the greatest number and increasing order gives the smallest, except that a zero cannot stand at the front, so it takes the second place after the smallest digit that is not zero. If more places are wanted than there are digits, repeat the largest digit for the greatest number and the smallest for the smallest. The successor is one more and the predecessor is one less.

## Student controls
- **Card rack**: holds the digits given, each one draggable into a slot
- **Target strip**: says whether the greatest or smallest is wanted and how many places
- **Sort the rack**: lays the remaining cards in increasing or decreasing order
- **Leading slot**: refuses a zero and writes out the reason before moving it
- **Repeat a card**: clones one digit when more places are asked for than there are cards
- **Stepper**: adds or takes away one and shows the successor and predecessor

## State fields (getState, a resume contract)
phase, rack, slots, target, placesWanted, repeated, stepped, complete

## Textbook (this topic)
**Pages:** 9, 10, 11
**Key terms:** greatest, smallest, successor, predecessor, repeating a digit
Given a handful of digits, arranging them one way gives the greatest number and another way the smallest, and zero will not lead. Writing the digits in decreasing order gives the greatest number, because the largest digit is then worth the most. Those digits give 9,65,320. The biggest digit always takes the leftmost place. Increasing order would put zero at the front, and a number cannot begin with zero. So the zero moves to the second place, just after the smallest digit, and the answer is 2,03,569. Repeat the largest digit to build the greatest number and the smallest digit to build the smallest. From 5, 0, 7, 8 and 3 the greatest six digit number is 8,87,530 and the smallest is 3,00,578. The successor of a number is one more than it and the predecessor is one less. So 14,917 has 14,918 as its successor and 14,916 as its predecessor. At a number like 99,999 the step opens a whole new place.
