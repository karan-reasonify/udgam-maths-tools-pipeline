# M2.S3.T4.C12.2D1 · compare_and_order · Compare and Order
indiannica_eng_maths4_ch1 · indiannica_eng_maths4_ch1_v1 v1 (active) · "Large Numbers" · segment M2.S3 "Comparing and Building" · topic M2.S3.T4 "Which Is More, and Putting Them in Order" · printed p.7 to p.9

> Runtime supplies the standard chrome (bands, zones, header, runs box, slot + pad, bubble, phase bar, type scale, content colours, sounds, finished/idle/restart). `scaffold` puts each phase's concept, teach line, hint ladder, closing line and items into tool.tsx; they are not repeated here. Build the working area and the mechanics.

## What it is
**Description:** Two numbers line up in one chart and the first place where they differ lights up and settles it.
**Why:** Work out which of two numbers is more, and find the one place that decides it.
**Look:** Two numbers stacked in one chart with their columns lined up, and a rail of number cards to sort underneath.
**Context:** Grade 4, after the chart is understood and before numbers are built from digits. An adult sees a comparison rule. What the page is actually doing is putting two rules in a strict order, count the digits first and only then go left to right, because a child who reaches for the digits first will compare a four digit number against a five digit one and get it wrong.
**For the child:** Set two numbers into the chart and count their digits. If the counts match, step across from the left until the digits differ, and write the sign. Then drag the cards in the rail into order, smallest first and then the other way.
**Teaching notes:** Insist on counting the digits before anything else, every single time, until it is automatic. Half of all comparing at this age is finished by counting, and the child who skips it is the child who says 8424 is more than 39,526. Use the step control rather than the walk control for the first few pairs, so the dimming can be watched place by place. The greying out to the right of the deciding place is worth naming out loud: those digits cannot matter any more, whatever they are. In the ordering bay, ask them to find the smallest and the largest first, because what is left in the middle is a shorter job.
**Placement:** Practise
**Also mounted in:** M2.S3.T4

## Look
**Chrome:** dim #9AA4AC · ink #2B2B2B · rule #C9BCA6 · panel #F2E4CE · paper #FFFDF7 · accent #5B6770
**Voice:** rate 0.92, pitch 1.06 · figure: None

## Stage (tool-specific layout)
Three bands across 1600 by 900. The header runs 0 to 80 and is one line only: 'Compare and Order' in ink at the far left, a small dot set clear of the name by measuring it, the phase title beside the dot on the same line, the host's navigation, and again, sound and restart as three round controls at the far right. The canvas runs 92 to 746, one rounded card on the paper colour. At its top left, at 64,108 and 330 by 76, sits the running count: the places compared so far against the places in the numbers, two numbers in ink, the first climbing one column at a time as the walker steps and stopping dead the moment a pair disagrees; on the third and fourth phases it carries the cards settled in the rail against the cards on it. Nothing in it ever reads as a score. The working area is 1086 by 528 at 64,202. The shared chart sits across the top of the working area, 880 by 300 at 190,202: seven columns 120 wide under headings 44 tall, and two rows of cells 96 tall with a gap of 20 between them, the upper number and the lower. Every digit takes its own period colour and the period bands lie behind both rows at once, so the two numbers share their periods as well as their columns. A number with fewer digits leaves its high columns ruled and empty instead of shifting right, which is the whole of the first phase. A digit count badge 92 by 52 sits at the right end of each row, its count written in ink and each digit of that row ringed as it is counted. The walker is an amber band 120 wide and the full height of both rows that stands over one column pair at a time and steps from the leftmost column rightwards; every pair it leaves behind dims to grey, and the pair it halts on holds amber while every column to the right of it greys out together and stays that way. The sign is written 64 tall in a box 96 by 96 at 76,300, level with the gap between the two rows, so it reads between them. Under the chart the rail runs 1086 by 160 at 64,540: an outlined groove with four or five slots 200 wide, and number cards 180 by 84 in ink on the paper colour, each carrying its own digit count badge in the corner and lying loose above the groove until it is dragged in. The order setting is a switch 200 by 56 at the right end of the rail reading smallest first or biggest first, and the rail draws an arrow along its length pointing the way the numbers are to grow. A card dropped into a slot that breaks the order is not sprung back; it settles, and the rail simply will not close. Down the right of the canvas, in the same rectangle on every phase and never animated in or out, the question sits above the answer slot at 1186,250 (356 by 92) that holds what the child has given, and under it the pad at 1170,368 (388 by 363). The pad is twelve number keys three across where the two numbers are set, and elsewhere a choice pad of large keys in the same rectangle: on the first two phases the three signs, greater than, less than and equals, drawn large; on the third and fourth the number cards themselves as keys, in the order they lie on the rail, so a card can be chosen without being dragged. The footer runs 758 to 900: the voice caption at the far left with its speaking dot beside it, measuring its own wrap and dropping a type size rather than spilling, and the phase bar at the right with the question count under it. There is no sidebar and no score box anywhere, and nothing is ever written over the working area. Content colours are the chapter's own: a digit takes the colour of its period, deep blue in the ones period, green in the thousands and vermilion in the lakhs, and rose in the millions where the international chart reaches; a digit under discussion, or the one that decides a comparison, is amber; a zero holding a place open is grey. Chrome never borrows one of them, and every one of those readings survives with the colour taken away, because a place is told by its column heading and a period by its band before either is told by its colour.

## Opening (first frame of every mount)
Every mount comes up already furnished for its phase with nothing in front of it. On the first phase a four digit number and a five digit number sit one above the other in one shared chart, their ones standing under each other, with the shorter number's high column ruled and empty. On the second two six digit numbers are stacked the same way, sharing the digit in their highest place, and the walker is parked to the left of the chart. On the third four number cards lie loose above the rail, two short and two long, and the rail is set to smallest first. On the fourth the same four cards sit in the rail in the order the child has just put them, with the setting switch beside them. The running count at the top left is empty and the answer slot and the pad stand empty down the right. One thing moves, once: the digit count badge beside the upper number, or the walker, or the first loose card, gives one slow pulse while the voice asks how long each number is. That pulse is the only invitation, and a finger on it is the whole way in.

## Phases (what each mount shows and does; the words are in tool.tsx)

### 1 · More digits means a bigger number
**Screen:** a four digit and a five digit number stacked in the chart
**Does:** counts the digits of each and gives the sign without reading them
**Win:** the sign is right and the digits were never compared
**Feels:** you have the answer and you still have not read either number
**Goal:** counting digits can settle a comparison on its own
**Observe:** The comparison was finished before either number had been read.
**Wrong (each is a traceback on the working area):**
- picks the four digit number because its leading digit is the larger one. → the empty high columns of the shorter number rule themselves in grey and both digit count badges fill, ringing each digit as they count it, so the shorter row is seen to stop one whole column short of the other. The child's choice stays in the answer slot.
- counts the digits of one number and reads the digits of the other. → both badges are filled one after the other, the second counting slowly with every digit ringed as it goes, and the two counts are set side by side under the chart with nothing else on the stage lit.
**Misconception to break:** Comparing the leading digits and choosing 8424 because eight beats three.

### 2 · Same digit count, so compare from the left
**Screen:** two six digit numbers stacked, sharing their first digit
**Does:** steps the walker right until a pair disagrees
**Win:** the deciding place lights and everything right of it greys out
**Feels:** column after column agrees and then suddenly one does not, and it is over
**Goal:** the first place where the digits differ decides it
**Observe:** The walker dimmed three pairs before it stopped anywhere.
**Wrong (each is a traceback on the working area):**
- decides on the ones digit, reading the two numbers from the right. → the walker runs from the left instead, one column at a time, each agreeing pair dimming as it passes; it halts at the first pair that differs and everything to the right of it, the ones digit included, greys out together. The child's answer stays in the answer slot.
- stops the walker on the first pair that agrees and gives the sign there. → the walker steps back onto that pair and the two digits lift and lay one exactly over the other; then it carries on rightwards by itself until it reaches a pair that will not lie flat, and holds there.
**Misconception to break:** Reading from the right instead of the left and deciding on the ones digit.

### 3 · Smallest first is ascending order
**Screen:** four cards in the rail, two short numbers and two long ones
**Does:** splits them by length, then orders each group smallest first
**Win:** the rail closes with the numbers running smallest to greatest
**Feels:** two piles by length, and each pile is a far easier job than the four were
**Goal:** sorting by digit count first turns one long job into two short ones
**Observe:** Everything to the right of the deciding place greyed out and stayed grey.
**Wrong (each is a traceback on the working area):**
- orders all four cards on their leading digits alone, mixing the long ones in with the short. → each card's digit count badge fills in the groove, and the cards separate into two groups along the rail, the short ones together and the long ones together, without the order inside either group being touched. Nothing is lifted off the rail.
- puts the largest card first and calls it smallest first. → the arrow along the rail draws itself again from the low end to the high end while the words smallest first stay lit on the switch, and the cards already in the groove are read out along the arrow in the order they are lying.
**Misconception to break:** Mixing the five and six digit numbers and ordering on the leading digit alone.

### 4 · Biggest first is descending order
**Screen:** the rail holding the set the child has just put in ascending order
**Does:** switches the setting and rebuilds the rail the other way round
**Win:** the rail closes with the numbers running greatest to smallest
**Feels:** the same four cards, read from the other end, and the job is already done
**Goal:** descending is the same order read the other way
**Observe:** Sorting the cards by length first left only two short jobs to do.
**Wrong (each is a traceback on the working area):**
- sorts the whole set again from scratch and produces the ascending order twice over. → the rail keeps the cards the child has laid and lifts the ascending order it already held into a second row above them, then walks a pointer along that old order from its far end, card by card, dropping each into the next free slot below. Both rows stay on the rail together.
- switches the setting and expects the rail to be right without a card being moved. → the arrow along the rail turns round while every card stays exactly where it is, so the cards now run against the arrow; the card at each end is ringed and the rail stays open.
**Misconception to break:** Producing the ascending order and labelling it descending.

## Delight
The second phase, the step where the walker stops. It has been dimming pairs to grey one column at a time, and on the column where the digits differ it stops dead and holds amber; then every column to its right, all four of them, goes grey together in one movement and the sign writes itself in the box between the two rows. Every greyed digit is still perfectly readable and not one of them matters any more. Nothing else moves and the voice says nothing while it happens.

**General miss line:** The walker goes again, from the left. Say stop when they differ.

## Answer key
Count the digits first. The number with more digits is greater and nothing else needs checking. If the counts match, compare from the highest place rightwards and stop at the first place where the digits differ; that place decides it and nothing to its right matters. Ascending order runs from smallest to greatest and descending is the same list turned round.

## Student controls
- **Number pads**: sets the two numbers being compared into the shared chart
- **Count digits**: shows a digit count badge beside each number
- **Walk it**: moves left to right, dimming the pairs that agree
- **Step**: advances the walker one place at a time
- **Sign**: writes the greater than, less than or equals sign between the two
- **Card rail**: holds four or five number cards that can be dragged into order
- **Order setting**: switches the rail between ascending and descending

## State fields (getState, a resume contract)
phase, upper, lower, digitCounts, walkerAt, decidedAt, sign, cards, railOrder, complete

## Textbook (this topic)
**Pages:** 7, 8, 9
**Key terms:** compare, greater than, less than, ascending order, descending order
Count the digits first, and only if they match do you go left to right looking for the first difference. Counting the digits settles it on its own. Five digits beat four every time, however the digits themselves look. So count the digits before comparing anything else. Start at the highest place and move right. The first place where the digits differ decides it, and nothing to the right of that matters. Here the ten thousands place holds three against one, so the first number is greater. Sorting the five digit numbers apart from the six digit ones does most of the work. Ascending order runs from smallest to greatest, so it opens with 23,651 and closes with 5,23,691. Descending order runs from greatest to smallest, so it is the same list turned round. Ordering a set once gives both answers, as long as you say which way you are reading it.
