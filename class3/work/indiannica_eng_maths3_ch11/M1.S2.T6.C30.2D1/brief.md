# M1.S2.T6.C30.2D1 · shop_bill · Shop Bill
indiannica_eng_maths3_ch11 · indiannica_eng_maths3_ch11_v1 v1 (active) · "Money" · segment M1.S2 "Changing and Working With Money" · topic M1.S2.T6 "Multiplying and Dividing Money" · printed p.134 to p.138

> Runtime supplies the standard chrome (bands, zones, header, runs box, slot + pad, bubble, phase bar, type scale, content colours, sounds, finished/idle/restart). `scaffold` puts each phase's concept, teach line, hint ladder, closing line and items into tool.tsx; they are not repeated here. Build the working area and the mechanics.

## What it is
**Description:** Price many things from one price tag, share money equally, fill a bill and find its total, and count a purse against a price.
**Why:** Find the cost of many things by multiplying the price of one, share money equally by dividing, write a bill with the cost of each line and the total, and say whether the money in a purse is enough and by how much.
**Look:** A shop counter with a shelf and an amber price tag, a sky blue count box, a tray of money and a row of plates, a bill table with a green total, a purse and a price tag on a balance, a words card under them, the Times, Share, Bill and Purse buttons, and the number pad down the right of the canvas.
**Context:** Grade 3, the last working topic of the money chapter. An adult sees sums on money, which a toy shop and a handful of dummy notes and coins do well. What is being settled is which sum a question is asking for: the cost of many is the price of one taken many times, the cost of one is the whole amount shared out, a bill is the cost of each line and then every line added, and enough is the purse set against the price. A child who divides when the question asks for the cost of many, because the numbers are big, will get an answer that is smaller than the price of one and not notice. A child who adds the price of one to the count in a bill will total the wrong things.
**For the child:** Set how many things. Watch the price repeat. Share the money onto plates. Fill a bill and find the total. Count the purse and compare it with the price.
**Teaching notes:** Play the shop game with dummy notes and coins before the tool opens, and let the children price a few classroom things on paper. Ask each time whether the question wants the cost of many or the cost of one, and wait for the child to say which sum it is rather than saying it for them. Say Rs before every answer. In a bill, ask for the cost of each line before anyone adds anything. For the purse, count it aloud together first and compare it with the price second. If an answer is smaller than the price of one, ask whether many things can cost less than one. Use fresh prices: the printed bills and exercises are the child's to work.
**Placement:** Explore
**Also mounted in:** M1.S2.T6

## Look
**Chrome:** dim #9AA4AC · ink #2B2B2B · rule #C9BCA6 · panel #F2E4CE · paper #FFFDF7 · accent #5B6770
**Voice:** rate 0.92, pitch 1.06 · figure: None

## Stage (tool-specific layout)
Three bands across 1600 by 900. The header runs 0 to 80 and is one line only: 'Shop Bill' in ink at the far left, a small dot set clear of the name, the phase title beside the dot on the same line, the host's navigation, and sound and restart as three round controls at the far right. The canvas runs 92 to 746, one rounded card on the paper colour. At its top left, at x 64, y 108 and 330 by 76, sits the running count: how many things have been priced. It is never a score. The working area is 1086 by 528 at x 64, y 202. A plain shop counter fills the working area. The shelf stands at x 110, y 230, 560 by 230, and holds a row of at most nine of one kind of thing, each drawn large enough to count, such as pencil boxes, with an amber price tag hanging at its left end that reads the price of one. The sky blue count box sits at x 110, y 480, 190 by 70, with a plus and a minus, and a sky blue bracket under the row reads how many. The Times button stands at x 330, y 480, 150 by 70 and lays one copy of the price tag under every thing. The tray of money stands at x 700, y 230, 330 by 110, above a row of at most six plates at x 700, y 360, each drawn large enough to hold a small pile of flat notes and discs, with the Plates box at x 700, y 480, 190 by 70. In the Bill view the bill replaces the shelf, at x 110, y 216, 960 by 300: a table of four columns headed Thing, How many, Price of one and Cost, at most three lines, a rule under the last line and a green Total below it. In the Purse view the balance stands across the working area with the purse of notes and coins on its left pan at x 160, y 300 and the price tag on its right pan at x 700, y 300, and the gap is lit green when the balance has tipped. The words card stands under the shelf at x 110, y 566, 960 by 90, and says the step in writing, such as the price of one times how many. The Times, Share, Bill and Purse buttons stand in a row at x 110, y 666, each 150 by 60, labelled in words. A green Answer tag at x 700, y 480, 330 by 70, holds what the child has typed. Down the right of the canvas, in the same rectangle on every phase and never animated in or out, the question sits above the answer slot at x 1186, y 250 (356 by 92) that holds what the child has given, and under it the pad at x 1170, y 368 (388 by 363). The pad is ten number keys and a clear key, for typing the cost, the share, the total or the difference into the answer slot. The footer runs 758 to 900: the voice caption at the far left with its speaking dot beside it, measuring its own wrap and dropping a type size rather than spilling, and the phase bar at the right with the question count under it. There is no sidebar and no score box anywhere, and nothing is ever written over the working area. Real objects keep their own natural colours. The whole rupees of an amount are deep blue and the paise are vermilion everywhere, in a column heading, a tag and a label. The value written on one note or coin, and the price of one thing, is amber. How many notes, coins or things there are is sky blue. A total, a change, a converted amount and the answer are green. A note is a plain flat rectangle in its own colour and a coin a plain round disc, each with its value in large near-black type, so a value is read from the number and never from the colour. Anything dimmed fades to half strength rather than turning grey, and chrome never borrows one of the five. Each reading survives with the colour taken away, because an amount is told by its written label before it is told by its colour.

## Opening (first frame of every mount)
Every mount comes up already furnished for its phase with nothing yet typed. On the first phase a shelf of one kind of thing stands at the left with an amber price tag on it and a sky blue count box beside it, and the Answer tag is empty. On the second a tray of money stands above a row of empty plates, with a plus and a minus for the plates. On the third a bill lies on the counter with its lines of the thing, how many and the price of one filled in and every cost left empty. On the fourth a purse of notes and coins stands on one pan of a balance and a price tag on the other. One thing moves, once: the price tag gives one slow swing while the voice speaks its opening line, and a finger on a button is the whole way in.

## Phases (what each mount shows and does; the words are in tool.tsx)

### 1 · The cost of many: multiply
**Screen:** a shelf holds a row of one kind of thing with an amber price tag and a sky blue count box beside it
**Does:** sets how many with the count box, watches the price tag repeat once for each thing, and types the cost
**Win:** the price tags line up under the things, the cost counts up, and a green Answer tag settles
**Feels:** the price of one repeating under every thing as the count goes up, and the cost counting up with it
**Goal:** the cost of many is the price of one times how many, and the answer is a number of rupees
**Observe:** As the count went up by one, the price tag was laid out once more and the cost grew by the same step.
**Wrong (each is a traceback on the working area):**
- adds the price and the count, so the cost of many comes out near the price of one → the price tag is laid out once under every thing, each copy lit in turn, and the costs are counted up copy by copy until the child sees the cost grows by the price each time
- divides the price of one by how many because the numbers look big → the shelf is shown again with the price tags laid out under the things, and the words card says the cost of many is more than the price of one
**Misconception to break:** Adding the price and the count, Rs 32 and 5, and getting Rs 37.

### 2 · Sharing money equally: divide
**Screen:** a tray of money stands above a row of empty plates, with a plus and a minus for the plates
**Does:** sets how many plates, watches the money dealt out one at a time, and types what one plate holds
**Win:** every plate holds the same pile, the tray is empty, and a green tag reads what one plate holds
**Feels:** the money going out onto the plates one at a time until every plate holds the same pile
**Goal:** to share money equally, or to find the cost of one, we divide the money by the number of plates
**Observe:** When the money was dealt out, every plate ended with the same pile and the tray was empty.
**Wrong (each is a traceback on the working area):**
- multiplies the money by the plates instead of sharing it out → the tray is shown again and dealt out onto the plates one note or coin at a time, and the words card says that sharing equally makes the pile on each plate smaller
- gives the answer as the number of plates → one plate is lit and its pile counted aloud, and the words card says that the answer is what one plate holds, in rupees
**Misconception to break:** Multiplying Rs 216 by 6 because the numbers are big.

### 3 · A bill: the cost of each thing and the total
**Screen:** a bill on the counter, a table of the thing, how many, the price of one and the cost, with a rule under it
**Does:** fills the cost of each line from its price and its count, then adds the lines and types the total
**Win:** each cost drops into its line, the lines slide down to the rule, and the green Total lights
**Feels:** each cost dropping into its own line and the lines sliding down to the rule to make the total
**Goal:** a bill has a line for each thing, the cost of a line is the price of one times how many, and the total is the lines added
**Observe:** Each line of the bill got its own cost first, and only then were the costs added into the total.
**Wrong (each is a traceback on the working area):**
- adds the prices of one in a bill and leaves out how many of each → each line is lit in turn and its cost made by laying the price of one out as many times as the count says, so the cost of the line is seen before any adding
- types the cost of the last line as the total → the lines slide down to the rule one at a time and the running total is shown after each, so the total is seen to be every line added
**Misconception to break:** Adding the prices of one, Rs 9 and Rs 44 and Rs 33, and forgetting how many of each.

### 4 · Is there enough money?
**Screen:** a purse of notes and coins on one pan of a balance and a price tag on the other pan
**Does:** counts the purse, compares it with the price, says enough or not, and types what is left or still needed
**Win:** the balance tips to the larger side, the gap lights green, and the words card says how much
**Feels:** the balance tipping to the larger side and the gap between the purse and the price lighting up
**Goal:** the money in a purse is counted together, then set against the price to see which is more and by how much
**Observe:** The balance tipped to the purse when it held more than the price, and to the price when it held less.
**Wrong (each is a traceback on the working area):**
- compares the biggest note with the price and ignores the rest of the purse → the whole purse is counted note by note and coin by coin on the pan, and the running amount is shown, so the money is seen to be all of it together
- says enough because the purse looks heavy → the balance tips only when the two amounts are compared, and the gap is lit and counted in rupees, so the child sees which side is more and by how much
**Misconception to break:** Saying the money is not enough because the note of Rs 200 is less than the price.

## Delight
On the first phase, as the count goes up, the price tag is copied once under every new thing and the cost under the row counts up one price at a time. On the fourth phase, when the child has typed the difference, the balance settles level with a soft click as the gap is made up by the missing money, or the extra money lifts out of the purse and rests beside it.

**General miss line:** Look at the price of one again. Ask what the question wants, and try once more.

## Answer key
To find the cost of many things, multiply the price of one by how many. To share money equally, or to find the cost of one from the cost of many, divide the money by the number of things. A bill has one line for each thing, the cost of a line is the price of one times how many, and the total is every line added. The money in a purse is the notes and coins counted together. It is enough when it is the price or more. When it is more, the difference is left over, and when it is less, the difference is still needed. The answer is a number of rupees and Rs goes before it.

## Student controls
- **Count box**: sets how many things stand in the row, with a plus and a minus
- **Times button**: lays the price tag out once for every thing in the row
- **Share button**: opens a tray of money above a row of plates and deals it out equally
- **Plates box**: sets how many plates the money is shared between
- **Bill button**: swaps the shelf for a bill with a line for each thing and a total
- **Purse button**: stands a purse and a price tag on the two pans of a balance
- **Number pad**: types the cost, the share, the total and the difference

## State fields (getState, a resume contract)
phase, count, price, plates, lines, purse, answer, complete

## Textbook (this topic)
**Pages:** 134, 135, 136, 137, 138
**Key terms:** cost, price, multiply, divide, bill, total, enough
The cost of many things is found by multiplying the price of one, money is shared equally by dividing, a bill adds the cost of each line into a total, and the money in a purse is weighed against a price. To find the cost of many things, multiply the price of one by how many. 3 bottles of paint at Rs 39 each cost Rs 117 in all. To share money equally, divide the money by the number of children. Rs 236 shared by 4 children is Rs 59 for each child. A bill has a line for each thing. Find the cost of each line, then add the lines for the total. 2 puzzles at Rs 61 each and 1 bag at Rs 67 make a bill of Rs 189. To see if money is enough, count it and compare it with the price. We multiply the price of one by how many. Rs 13 times 7 is Rs 91 in all. Write Rs before the answer. We divide the money by the number of friends. Rs 132 divided by 6 is Rs 22 for each friend. First find the cost of each line. Rs 29 times 2 is Rs 58 for the notebooks. Rs 6 times 3 is Rs 18 for the erasers. Then add the lines. Rs 58 plus Rs 18 is Rs 76 so far. Rs 76 plus Rs 38 is Rs 114 in all. Count the purse first. 2 notes of Rs 20 make Rs 40 together. Rs 100 plus Rs 40 is Rs 140 so far. Rs 140 plus Rs 5 is Rs 145 in all. Then compare it with the price. Rs 172 minus Rs 145 is Rs 27 more. So Rs 27 more is needed. If the purse holds more than the price, the rest is left over.
