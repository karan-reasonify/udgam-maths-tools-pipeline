# M1.S1.T2.C8.2D1 · count_the_money · Count the Money
indiannica_eng_maths3_ch11 · indiannica_eng_maths3_ch11_v1 v1 (active) · "Money" · segment M1.S1 "Notes, Coins and Writing Money" · topic M1.S1.T2 "Notes and Coins" · printed p.129 to p.130

> Runtime supplies the standard chrome (bands, zones, header, runs box, slot + pad, bubble, phase bar, type scale, content colours, sounds, finished/idle/restart). `scaffold` puts each phase's concept, teach line, hint ladder, closing line and items into tool.tsx; they are not repeated here. Build the working area and the mechanics.

## What it is
**Description:** Tap notes and coins into a tray, count each kind in jumps of its value, count a mixed handful biggest first, and pay one price in more than one way.
**Why:** Read the value on each note and coin, count notes or coins of one kind in jumps of their value, count a mixed handful from the biggest, and pay one price in more than one way.
**Look:** A shop counter with a purse, the six notes and five coins as plain flat shapes, a flat tray that sorts them into tagged rows, a price tag, the Pay again and Plain list buttons, and the number pad down the right of the canvas.
**Context:** Grade 3, the first working topic of the money chapter. An adult sees notes and coins being counted, which dummy money does well. What is being settled is that the number on a note or a coin is its value whatever it looks like, that notes of one kind are counted in jumps of that value, that a mixed handful is counted one kind at a time starting from the biggest, and that one price can be paid in many ways. A child who counts the pieces instead of the values will say that four notes make four rupees, and a child who finds one way to pay will think it is the only way.
**For the child:** Tap the notes and coins into the tray. Count each kind in jumps of its value. Count the biggest kind first. Pay the price on the tag, then pay it another way.
**Teaching notes:** Give each group a purse of dummy notes and coins before the tool opens, and ask them to tip it out, count it aloud and say the total. Always ask what the number on a note or a coin is called before any count starts, and wait for a child to say value rather than saying it for them. When a group has notes of one kind, have them count in jumps of the value with a finger on each note. For a mixed handful, ask which kind to count first and wait for the biggest. Once one way to pay a price is found, ask for another and ask whether it gives the same amount. Go back to the question at the start of the chapter once a handful can be counted. Use fresh amounts: the printed groups are the child's to match and pay.
**Placement:** Explore
**Also mounted in:** M1.S1.T2

## Look
**Chrome:** dim #9AA4AC · ink #2B2B2B · rule #C9BCA6 · panel #F2E4CE · paper #FFFDF7 · accent #5B6770
**Voice:** rate 0.92, pitch 1.06 · figure: None

## Stage (tool-specific layout)
Three bands across 1600 by 900. The header runs 0 to 80 and is one line only: 'Count the Money' in ink at the far left, a small dot set clear of the name, the phase title beside the dot on the same line, the host's navigation, and sound and restart as three round controls at the far right. The canvas runs 92 to 746, one rounded card on the paper colour. At its top left, at x 64, y 108 and 330 by 76, sits the running count: how many groups of money have been counted. It is never a score. The working area is 1086 by 528 at x 64, y 202. A plain shop counter fills the working area. The open leather purse stands at x 100, y 214, 260 by 230. The six notes lie in a row at x 100, y 470, each a rectangle 150 by 70 in its own colour with its value in large near-black type, and the five coins lie in a row beneath them at y 560, each a disc 66 across with its value in large near-black type. Nothing else is written on a note or a coin: no portrait, no emblem, no serial number. The flat tray stands at x 400, y 214, 620 by 300. Money that lands in it is sorted into rows, one for each kind, and each row carries an amber value tag at its left, a sky blue count tag beside it and a green running total at its right. A green Total tag under the tray at x 400, y 530, 300 by 70, holds the sum of every row. The price tag hangs at x 740, y 530, 280 by 90, and holds an amount in amber. When the money in the tray is worth exactly the price, the Total turns green and a green ring runs round the tray. The Pay again button stands at x 400, y 650, 190 by 60, and the Plain list button at x 610, y 650, 190 by 60, each labelled in words. In the Plain list view the same money is a written list of rows. Down the right of the canvas, in the same rectangle on every phase and never animated in or out, the question sits above the answer slot at x 1186, y 250 (356 by 92) that holds what the child has given, and under it the pad at x 1170, y 368 (388 by 363). The pad is ten number keys and a clear key, for typing the total of the money in the tray into the answer slot. The footer runs 758 to 900: the voice caption at the far left with its speaking dot beside it, measuring its own wrap and dropping a type size rather than spilling, and the phase bar at the right with the question count under it. There is no sidebar and no score box anywhere, and nothing is ever written over the working area. Real objects keep their own natural colours. The whole rupees of an amount are deep blue and the paise are vermilion everywhere, in a column heading, a tag and a label. The value written on one note or coin, and the price of one thing, is amber. How many notes, coins or things there are is sky blue. A total, a change, a converted amount and the answer are green. A note is a plain flat rectangle in its own colour and a coin a plain round disc, each with its value in large near-black type, so a value is read from the number and never from the colour. Anything dimmed fades to half strength rather than turning grey, and chrome never borrows one of the five. Each reading survives with the colour taken away, because an amount is told by its written label before it is told by its colour.

## Opening (first frame of every mount)
Every mount comes up already furnished for its phase with nothing yet counted. On the first phase the six notes and five coins lie in two rows beside an empty tray, each with its value in large type. On the second a row of one kind of note waits beside the tray, with an empty sky blue count tag and an empty green total tag. On the third a purse has been tipped out so its notes and coins lie apart on the counter, and the tray is empty with a green total at nought. On the fourth a price tag hangs at the right of the counter, the tray is empty and the purse is full. One thing moves, once: the first piece of money gives one slow pulse while the voice speaks its opening line, and a finger on it is the whole way in.

## Phases (what each mount shows and does; the words are in tool.tsx)

### 1 · Every note and coin has a value
**Screen:** a shop counter with the six notes and five coins in two rows beside an empty tray
**Does:** taps a note or a coin to read its value, then sets the notes and coins in order from least to greatest
**Win:** a tapped note or coin lights its value in amber, and the sorted row reads from the least to the greatest
**Feels:** each piece lighting its value in amber as a finger touches it
**Goal:** the number on a note or a coin is its value, and a note and a coin with the same number are worth the same
**Observe:** A Rs 10 note and a Rs 10 coin gave the same amber value tag when they were tapped, and the same step in the sorted row.
**Wrong (each is a traceback on the working area):**
- says the paper note is worth more than the coin with the same number → both pieces light the same amber value in the sorted row, and the words card says that the number on it is its value
- reads the colour of a note as its value → the colours fade to half strength and only the large numbers stay, and the sorted row is made again from the numbers
**Misconception to break:** Thinking the paper note is worth more than the metal coin, or the other way round, because they look different.

### 2 · Counting notes or coins of one kind
**Screen:** the tray with one kind of note waiting in a row beside it, a sky blue count tag and a green total tag both empty
**Does:** taps the pieces into the tray one at a time and counts along in jumps of the value, then types the total
**Win:** the sky blue count rises with each tap, the green total rises by one jump, and the tray settles on the full amount
**Feels:** the total stepping up by the same jump each time a piece lands
**Goal:** notes or coins of one kind are counted in jumps of their value, and the total is the value counted once for each piece
**Observe:** Pieces of one kind went into the tray one at a time and the green total rose by the same jump each time.
**Wrong (each is a traceback on the working area):**
- adds the number of pieces to the value → the pieces go into the tray one at a time and the green total rises by one whole jump of the value for each, so the jumps are counted again from nought
- counts the pieces and says that number as the amount → the sky blue count tag is lit beside the amber value tag, the two are kept apart, and the green total is shown as the value counted that many times
**Misconception to break:** Adding the number of notes to the value, 4 and 50, instead of counting four jumps of 50.

### 3 · Counting a mixed handful
**Screen:** a purse tipped out so its notes and coins lie apart on the counter, and the tray empty with a green total at nought
**Does:** drags the kinds into the tray from the biggest value down, says the total after each kind, then types the last total
**Win:** each kind slides into its own row and the green total steps up kind by kind to the amount in the purse
**Feels:** the total growing one kind at a time from the biggest value down
**Goal:** a mixed handful is counted one kind at a time, starting with the biggest value, and each kind is added to the total so far
**Observe:** A handful counted from the biggest kind down reached the same total as one counted in any other order, but with fewer slips.
**Wrong (each is a traceback on the working area):**
- starts with the smallest coins and loses count → the kinds slide into rows from the biggest value down, and the green total steps up one kind at a time so no total is lost
- leaves one kind of money out of the total → the kinds not yet counted stay lit on the counter, and the Total tag will not take an answer until every kind has gone into the tray
**Misconception to break:** Leaving out one kind of money, or adding the values without counting how many of each there are.

### 4 · One amount, many ways to pay
**Screen:** a price tag with an amount at the right of the counter, an empty tray, and the purse full of notes and coins
**Does:** fills the tray until the money is worth the price, presses Pay again, and pays the same price another way
**Win:** the tray rings green when the money is worth exactly the price, and the two ways stand side by side with the same total
**Feels:** the tray ringing green as soon as the money in it is worth the price
**Goal:** one price can be paid with different notes and coins, and every way that adds up to the price pays it
**Observe:** The tray rang green for two different sets of money that were worth the same as the price on the tag.
**Wrong (each is a traceback on the working area):**
- stops at one way and says it is the only way → the Pay again button empties the tray and the price tag stays lit, and a second set pays it while the first set waits beside it with the same total
- puts in too much or too little money and does not look at the tag → the Total tag stays amber against the price tag until the two are equal, and then the green ring runs round the tray
**Misconception to break:** Thinking there is only one right set of notes and coins for an amount.

## Delight
On the second phase, as each piece lands in the tray the green total steps up by one jump of the value with a soft chime, and the last piece makes the whole row glow for a moment. On the fourth phase, when the money in the tray is worth exactly the price, the green ring runs once round the tray and the price tag tips its amount down onto the Total.

**General miss line:** Look at the number on each piece again. Count the jumps one at a time.

## Answer key
The number on a note or a coin is its value. Notes or coins of one kind are counted in jumps of their value, so the total is the value counted as many times as there are pieces. A mixed handful is counted one kind at a time, starting with the biggest value, and each kind is added to the total before it. One price can be paid with different notes and coins, and every way that makes the same total pays it.

## Student controls
- **Notes and coins**: tap or drag one into the tray, where it joins the row of its own kind
- **Tray**: sorts money into rows, one for each kind, and tags each row
- **Price tag**: holds an amount to pay and turns the tray green when it is paid exactly
- **Pay again button**: empties the tray so the same price can be paid another way
- **Plain list button**: shows the same money as a written list
- **Number pad**: types the total of the money in the tray

## State fields (getState, a resume contract)
phase, tray, rows, total, price, ways, plainList, answer, complete

## Textbook (this topic)
**Pages:** 129, 130
**Key terms:** note, coin, value, Indian rupee, currency, ATM, total
Every note and coin of India carries a value, notes or coins of one kind are counted in jumps of that value, a mixed handful is counted biggest first, and one amount can be paid in many ways. The number on a note or a coin is its value. Coins or notes of one kind are counted in jumps of their value. A mixed handful is counted with the biggest value first. One price can be paid in more than one way. The number on a note or a coin is its value. A Rs 10 note and a Rs 10 coin are worth the same. The notes are Rs 500, Rs 200, Rs 100, Rs 50, Rs 20 and Rs 10. The coins are Rs 20, Rs 10, Rs 5, Rs 2 and Rs 1. Notes and coins are the currency of India. The money of India is the Indian rupee. An ATM is a machine that gives out notes. All the notes have the same value, so count in jumps of that value. Rs 20, Rs 40, Rs 60, Rs 80. 4 notes of Rs 20 make Rs 80. 3 coins of Rs 10 are counted the same way and make Rs 30. Count the biggest first, then add the next kind, and the next. 1 note of Rs 100 is Rs 100. 2 notes of Rs 20 make Rs 40, and Rs 100 plus Rs 40 is Rs 140. Rs 140 plus Rs 10 is Rs 150 for 1 coin of Rs 10. 3 coins of Rs 2 make Rs 6, and Rs 150 plus Rs 6 is Rs 156. The same amount can be paid in different ways. 1 note of Rs 50 and 1 coin of Rs 10 together are worth Rs 60. 3 notes of Rs 20 make Rs 60. 6 coins of Rs 10 make Rs 60. Each way gives the same total.
