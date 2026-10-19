# M2.S3.T6.C25.2D1 · place_value_chart · Place Value Board
indiannica_eng_maths5_ch5 · indiannica_eng_maths5_ch5_v2 v2 (file) · "Decimals" · segment M2.S3 "Place Value and Expanded Form" · topic M2.S3.T6 "Place Value of Decimals" · printed p.79 to p.81

> Runtime supplies the standard chrome (bands, zones, header, runs box, slot + pad, bubble, phase bar, type scale, content colours, sounds, finished/idle/restart). `scaffold` puts each phase's concept, teach line, hint ladder, closing line and items into tool.tsx; they are not repeated here. Build the working area and the mechanics.

## What it is
**Description:** Lay a decimal on the place value chart, ask which place a digit is in and what it is worth, weigh one digit in two places, and change one place at a time.
**Why:** Place a decimal on a place value chart, give each digit's place value as an amount, compare the values of one digit in two places, and change a decimal by an amount in one place.
**Look:** A place value chart of six columns with the point fixed after the Ones, a tray of digit tiles under it, and the Which place and Worth cards beside it.
**Context:** Grade 5, the pages on place value in decimals. An adult sees the familiar chart with three columns added. What the pages are doing is carrying the chart on past the ones, so each place after the point is worth a tenth of the place before it. The key names a place where a place value is asked; here a place value is always an amount, and which place is asked separately.
**For the child:** Drag each digit to its column. Tap a digit. Say which place it is in, then how much it is worth.
**Teaching notes:** Extend the chart the class already knows: the ones stay where they are and the point is drawn after them. Ask which place a digit is in, then ask what it is worth; those are two different questions with two different answers. Give a place value as an amount, such as 4 thousandths, 4/1000 or 0.004, and accept any of the three. The same digit is worth ten times as much one place to the left. When one place changes, only its digit changes, unless it runs past nine.
**Placement:** Explore
**Also mounted in:** M2.S3.T6

## Look
**Chrome:** dim #9AA4AC · ink #2B2B2B · rule #C9BCA6 · panel #F2E4CE · paper #FFFDF7 · accent #5B6770
**Voice:** rate 0.92, pitch 1.06 · figure: None

## Stage (tool-specific layout)
Three bands across 1600 by 900. The header runs 0 to 80 and is one line only: 'Place Value Board' in ink at the far left, a small dot set clear of the name, the phase title beside the dot on the same line, the host's navigation, and sound and restart as three round controls at the far right. The canvas runs 92 to 746, one rounded card on the paper colour. At its top left, at x sixty-four, y 108 and 330 by 76, sits the running count: how many tiles are on the chart. It is never a score. The working area is 1086 by 528 at x sixty-four, y 202. The chart spans the working area from x 110 to x 1030 at y 230, six columns of one width, 140 across, headed Hundreds, Tens, Ones, Tenths, Hundredths and Thousandths, with a narrow column 40 across for the large near-black point between Ones and Tenths. Tiles are 110 across and snap to the middle of their column at y 330, deep blue. An empty place inside the number holds a grey 0 labelled Place holder. The tray of tiles runs along y 640. The Which place card sits at x 110, y 470 and the Worth card beside it at x 420, the worth written three ways, a count, a fraction and a decimal. On the third phase the Two places panel sits at x 760, y 470, its two worths one above the other with their points in one line and the difference in green under a ruled line. On the last phase each nudge arrow stands above its column head at y 200. Down the right of the canvas, in the same rectangle on every phase and never animated in or out, the question sits above the answer slot at x 1186, y 250 (356 by 92) that holds what the child has given, and under it the pad at x 1170, y 368 (388 by 363). The pad is twelve number keys three across with a point key, a fraction bar key and a word pad of place names, for setting a decimal, or for typing a place or a place value into the answer slot. The footer runs 758 to 900: the voice caption at the far left with its speaking dot beside it, measuring its own wrap and dropping a type size rather than spilling, and the phase bar at the right with the question count under it. There is no sidebar and no score box anywhere, and nothing is ever written over the working area. Content colours are the chapter's own, and the tools of this chapter share them. A decimal or fraction the question gives is deep blue, with the shaded parts that show it. The result the working reaches, a decimal, a fraction, a sum, a difference or what is left, is green, with its shaded parts. Ten of one place traded for one of the next, a carry in adding or a trade in taking away, is vermilion. A zero written after the point to line decimals up is violet, and so is the point written after a whole number before those zeros. The part taken away, used or poured out is rose. The digit, place or step being worked on now, and the first place where two decimals differ, are amber. A zero holding a place open inside a number is grey, and nothing else on the stage is ever grey. An unshaded part stays warm white inside its near-black outline, the decimal point is near-black ink, and anything dimmed fades to half strength rather than turning grey. Chrome never borrows one of them, and each of those readings survives with the colour taken away, because a part is told by its written label, Given, Answer, Carry, Trade, Added zero, Taken away, Left or Place holder, before it is told by its colour.

## Opening (first frame of every mount)
Every mount comes up already furnished for its phase with the chart drawn and the point fixed after the Ones. On the first phase the chart is empty and the tiles of a decimal wait in the tray. On the second a decimal is on the chart with the Which place and Worth cards blank. On the third two of its tiles are outlined in amber and the Two places panel is empty. On the fourth a nudge arrow stands over every column. One thing moves, once: the first tile, an outlined tile or a nudge arrow gives one slow pulse while the voice speaks its opening line, and a finger on it is the whole way in.

## Phases (what each mount shows and does; the words are in tool.tsx)

### 1 · The chart goes past the point
**Screen:** the empty chart with its column heads, and the tiles of 47.216 in the tray
**Does:** drags each tile into its column, from the tens to the thousandths
**Win:** the chart holds 47.216 and the three new column heads glow one after another
**Feels:** the chart stretching past the point into three new columns
**Goal:** after the point come tenths, then hundredths, then thousandths
**Observe:** The columns after the point came in the order tenths, hundredths, thousandths.
**Wrong (each is a traceback on the working area):**
- drops the first digit after the point into the Ones column → the tile slides back to the point and the Tenths column head lights amber, the other tiles staying where they were
- leaves out a zero digit and closes the gap → the empty column lights amber and a grey 0 labelled Place holder waits in it, and the tiles after it slide back to their own columns
**Misconception to break:** Putting the 8 in the hundredths column and leaving out the 0, which turns eight thousandths into eight hundredths.

### 2 · The place value of a digit
**Screen:** 47.216 on the chart with the Which place and Worth cards blank
**Does:** taps the one, names its place, then gives what it is worth
**Win:** the Which place card says the hundredths place, and the Worth card says 1 hundredth, 1/100 and 0.01
**Feels:** one question splitting into two, a name and an amount
**Goal:** a digit's place is where it sits, and its place value is the amount it is worth
**Observe:** The Which place card and the Worth card never said the same thing.
**Wrong (each is a traceback on the working area):**
- gives the name of the place when asked what the digit is worth → the Which place card fills with the child's words, and the Worth card beside it lights amber and waits for an amount
- gives the digit alone as its worth → the Worth card writes the digit with its place under it, and a strip in that place's parts is drawn to show the amount
**Misconception to break:** Answering hundredths alone, which names the place but not the amount the 8 is worth.

### 3 · One digit in two places
**Screen:** 58.85 on the chart with both eights outlined in amber
**Does:** taps each eight, reads its worth, and drags both worths into the Two places panel
**Win:** eight and eight tenths stand one above the other, and the panel shows 8 - 0.8 = 7.2 in green
**Feels:** twin digits turning out to be worth very different amounts
**Goal:** one digit is worth different amounts in two places, and the difference of the worths is a subtraction
**Observe:** The same digit was worth much more in a column further left.
**Wrong (each is a traceback on the working area):**
- says the difference is nothing, because the two digits match → both tiles light and their worths drop into the Two places panel, one clearly longer than the other
- subtracts the two digits instead of their worths → the Worth card under each tile fills first, and only the worths slide into the panel
**Misconception to break:** Answering 0, because the two digits are both 5, though they sit in different places.

### 4 · Changing one place
**Screen:** 0.415 on the chart and a nudge arrow over every column
**Does:** taps the tenths arrow three times and reads the new decimal
**Win:** only the tenths tile changes, from four to seven, and 0.715 is written in green
**Feels:** one tile ticking up while every other tile stays still
**Goal:** adding an amount in one place changes only that place's digit
**Observe:** A nudge changed one tile and left all the others still.
**Wrong (each is a traceback on the working area):**
- changes the digit in the wrong column → the nudged column lights and its tile ticks back, and the column named in the question lights amber
- adds to the last digit, whatever the place asked for → the question's place name lights on its column head, and the arrow over that column pulses once
**Misconception to break:** Adding 4 to the thousandths digit and writing 2.355, which is 4 thousandths greater, not 4 hundredths.

## Delight
On the third phase, as both worths land in the Two places panel, the digit further left grows taller beside its twin, one step for each column between them, before the subtraction is written under them.

**General miss line:** First say which place. Then say what it is worth.

## Answer key
The places to the right of the point are tenths, hundredths and thousandths. Which place a digit is in is a name, such as the hundredths place. Its place value is what it is worth, an amount, such as 4 hundredths, 4/100 or 0.04. The same digit is worth ten times as much one place to the left. The difference of the place values of one digit in two places is found by subtracting the smaller worth from the greater. Adding an amount in one place changes that place's digit, unless it runs past nine.

## Student controls
- **Digit tiles**: drag into a column and snap to it
- **Tile tap**: lights the column head and names the place, then shows the worth three ways
- **Two places panel**: sets the worths of one digit in two columns one above the other and subtracts them
- **Nudge arrows**: add or take away one of a column's place, changing only that tile
- **Number pad**: sets any decimal with up to three places, or types a place value

## State fields (getState, a resume contract)
phase, decimal, tiles, picked, worths, nudges, answer, complete

## Textbook (this topic)
**Pages:** 79, 80, 81
**Key terms:** place value chart, place, place value, tenths, hundredths, thousandths
The place value chart goes on past the ones place into tenths, hundredths and thousandths, and each digit's place value is the amount it is worth. The place value chart carries on past the ones, with tenths, hundredths and thousandths after the point. A digit's place tells where it sits, and its place value tells how much it is worth. The same digit is worth different amounts in different places. The place value chart carries on past the ones. After the point come tenths, then hundredths, then thousandths. So 47.216 has 4 tens, 7 ones, 2 tenths, 1 hundredth and 6 thousandths. The 1 is in the hundredths place. Its place value is 1 hundredth, which is 1/100 or 0.01. The place tells where the digit sits, and the place value tells how much it is worth. The first 8 is in the ones place and is worth 8. The second 8 is in the tenths place and is worth 0.8. The difference of their place values is 8 - 0.8 = 7.2. Only the tenths digit changes: 4 tenths and 3 tenths make 7 tenths. So the number is 0.715, and 0.415 + 0.3 = 0.715. It lies between 0.7 and 0.8.
