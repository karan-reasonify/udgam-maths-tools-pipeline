# M1.S1.T3.C10.2D1 · hundred_grid · Hundred Grid Shader
indiannica_eng_maths5_ch5 · indiannica_eng_maths5_ch5_v2 v2 (file) · "Decimals" · segment M1.S1 "Tenths, Hundredths and Thousandths" · topic M1.S1.T3 "Hundredths and Thousandths" · printed p.76 to p.77

> Runtime supplies the standard chrome (bands, zones, header, runs box, slot + pad, bubble, phase bar, type scale, content colours, sounds, finished/idle/restart). `scaffold` puts each phase's concept, teach line, hint ladder, closing line and items into tool.tsx; they are not repeated here. Build the working area and the mechanics.

## What it is
**Description:** Cut a tenth into hundredths and a hundredth into thousandths, shade any squares of the right count, and read a grid by columns and squares.
**Why:** Read and shade hundredths on a hundred grid, writing them as fractions and as decimals, and see thousandths come from cutting a hundredth into ten.
**Look:** A full ten by ten grid at the left, the Columns and squares counter under it, a fraction card and a decimal card at its right, and a zoomed square on the last phase.
**Context:** Grade 5, the pages on hundredths and thousandths. An adult sees two more fractions with bigger denominators. What the pages are doing is cutting each part into ten again: a tenth into hundredths, a hundredth into thousandths. The exercise that says figures means drawn grids, and any squares of the right number are correct.
**For the child:** Count full columns first, then single squares. Shade any squares of the right number. Zoom into one square to see thousandths.
**Teaching notes:** Cut one tenth of a paper square into ten thin strips before the tool opens, and lay one beside the whole square. Count full columns of ten first and single squares after. Any squares of the right count are correct, so accept a scattered shading as readily as a tidy one; the exercise that says figures means a drawn grid. Put six hundredths beside six tenths on two grids so the zero after the point is seen to matter. Draw every grid as a full ten by ten.
**Placement:** Explore
**Also mounted in:** M1.S1.T3

## Look
**Chrome:** dim #9AA4AC · ink #2B2B2B · rule #C9BCA6 · panel #F2E4CE · paper #FFFDF7 · accent #5B6770
**Voice:** rate 0.92, pitch 1.06 · figure: None

## Stage (tool-specific layout)
Three bands across 1600 by 900. The header runs 0 to 80 and is one line only: 'Hundred Grid Shader' in ink at the far left, a small dot set clear of the name, the phase title beside the dot on the same line, the host's navigation, and sound and restart as three round controls at the far right. The canvas runs 92 to 746, one rounded card on the paper colour. At its top left, at x sixty-four, y 108 and 330 by 76, sits the running count: how many squares are shaded, rising as the child drags and falling as it clears. On the last phase it counts thin slices instead. It is never a score. The working area is 1086 by 528 at x sixty-four, y 202. The grid is 480 by 480 at x 110, y 226, ten columns of ten squares, every square 48 across, ruled in near-black and labelled Whole above its top edge. Shaded squares are deep blue; unshaded squares stay warm white. The lifted column stands at x 640, y 226, its ten squares spread with small gaps, labelled 1 tenth above and 1 hundredth on its top square. The Columns and squares counter sits under the grid at y 716 in ink. The fraction card and the decimal card stand at x 900, y 300, one above the other, turning green when the child's answer matches the shading. On the last phase the zoomed square is drawn as a strip 400 long and 60 tall at x 640, y 520, cut into ten thin slices by near-black lines, each labelled 1 thousandth, with a fine line back to the square it came from. The Cut column, Scatter and Zoom buttons sit in a row at x 640, y 440. Down the right of the canvas, in the same rectangle on every phase and never animated in or out, the question sits above the answer slot at x 1186, y 250 (356 by 92) that holds what the child has given, and under it the pad at x 1170, y 368 (388 by 363). The pad is twelve number keys three across with a point key and a fraction bar key, for setting a number of hundredths or thousandths, or for typing a fraction or a decimal into the answer slot. The footer runs 758 to 900: the voice caption at the far left with its speaking dot beside it, measuring its own wrap and dropping a type size rather than spilling, and the phase bar at the right with the question count under it. There is no sidebar and no score box anywhere, and nothing is ever written over the working area. Content colours are the chapter's own, and the tools of this chapter share them. A decimal or fraction the question gives is deep blue, with the shaded parts that show it. The result the working reaches, a decimal, a fraction, a sum, a difference or what is left, is green, with its shaded parts. Ten of one place traded for one of the next, a carry in adding or a trade in taking away, is vermilion. A zero written after the point to line decimals up is violet, and so is the point written after a whole number before those zeros. The part taken away, used or poured out is rose. The digit, place or step being worked on now, and the first place where two decimals differ, are amber. A zero holding a place open inside a number is grey, and nothing else on the stage is ever grey. An unshaded part stays warm white inside its near-black outline, the decimal point is near-black ink, and anything dimmed fades to half strength rather than turning grey. Chrome never borrows one of them, and each of those readings survives with the colour taken away, because a part is told by its written label, Given, Answer, Carry, Trade, Added zero, Taken away, Left or Place holder, before it is told by its colour.

## Opening (first frame of every mount)
Every mount comes up already furnished for its phase with the grid in place. On the first phase the grid is empty with one column outlined in amber and the words one tenth above it. On the second a shading is already on the grid and the Columns and squares counter is hidden. On the third the grid is empty and the question card names a number of hundredths. On the fourth one square is outlined in amber and the Zoom button is lit. One thing moves, once: the outlined column or square, or the grid's first square, gives one slow pulse while the voice speaks its opening line, and a finger on it is the whole way in.

## Phases (what each mount shows and does; the words are in tool.tsx)

### 1 · One hundredth
**Screen:** the full grid with one column outlined in amber, and the column's words 1 tenth
**Does:** taps Cut column, counts the squares in the lifted column, and shades one square
**Win:** the card shows 1/100 and 0.01, and the column reads ten hundredths make one tenth
**Feels:** a column falling apart into ten little squares
**Goal:** a tenth cut into ten equal parts gives hundredths, and 10 hundredths make 1 tenth
**Observe:** One lifted column split into exactly ten squares.
**Wrong (each is a traceback on the working area):**
- calls one square a tenth → the lifted column's ten squares are numbered one to ten, and the words 1 tenth stay over the whole column while one square is lit amber
- says a hundredth is bigger than a tenth, because a hundred is bigger than ten → one square and one column are drawn side by side at the same scale, and the column is seen to hold ten of the squares
**Misconception to break:** Saying one column is one hundredth, which counts the column as a single square.

### 2 · Reading a hundred grid
**Screen:** a grid with 3 full columns and 8 more squares shaded, and the counter hidden
**Does:** counts the full columns, then the single squares, and types the decimal
**Win:** the counter shows three columns and eight squares, and the card reads 38/100 and 0.38
**Feels:** whole columns counting ten at a time
**Goal:** a shaded grid is read as full columns of ten and single squares, over 100
**Observe:** Counting by full columns first was faster than counting every square.
**Wrong (each is a traceback on the working area):**
- reads the full columns as ones and the single squares as tenths → each full column is labelled ten squares, and the counter adds the columns in tens before the single squares join them
- counts every square one by one and loses count → the counter lights one full column at a time and writes its ten, so the child's count so far is kept and carried on from there
**Misconception to break:** Writing 5.3 because 5 columns and 3 squares were counted, which reads the columns as wholes.

### 3 · Shading hundredths
**Screen:** an empty grid and the question card asking for 0.06
**Does:** shades squares until the count matches, then taps Scatter and watches the card
**Win:** six squares shaded, scattered to new places, and the card still reads 0.06
**Feels:** the squares drifting about while the number stays still
**Goal:** any squares of the right count show a number of hundredths
**Observe:** After Scatter the squares were in new places, and the cards did not change.
**Wrong (each is a traceback on the working area):**
- shades full columns for a number of hundredths, one column for each unit → the counter reads the shading in hundredths, and a second grid beside it shades the asked number of single squares, so the two amounts are seen
- drags past the count and shades one square too many → the counter reads one more than the question card, the last square shaded is lit amber, and nothing is cleared
**Misconception to break:** Shading 4 full columns, 40 squares, which shows 0.4, ten times as much.

### 4 · Thousandths
**Screen:** the grid with one square outlined in amber and the Zoom button lit
**Does:** taps Zoom, counts the ten thin slices, and shades some of them
**Win:** four slices shaded, and the card reads 4/1000 and 0.004
**Feels:** one tiny square opening up into ten thinner slices
**Goal:** a hundredth cut into ten equal parts gives thousandths, and 10 thousandths make 1 hundredth
**Observe:** One zoomed square split into ten thin slices.
**Wrong (each is a traceback on the working area):**
- writes a number of thousandths with only two places after the point → the zoomed strip's slices are counted, and the decimal card lights a third place after the point in amber, filling the empty place with a grey 0
- thinks a thousandth is a thousand squares → the fine line from the zoomed strip back to its one square pulses, and the slice is seen to be a tenth of that square
**Misconception to break:** Writing 0.03 for three thousandths, which is 3 hundredths, ten times as much.

## Delight
On the third phase, when the child taps Scatter, the shaded squares lift off the grid, drift about like leaves and settle in new places, and the decimal card stays exactly as it was.

**General miss line:** Count the full columns first, then the single squares.

## Answer key
A tenth cut into ten equal parts gives hundredths, so 10 hundredths make 1 tenth and a hundred grid holds 100 hundredths. Count full columns of ten first, then single squares, and write the count over 100, or with two digits after the point. To show a number of hundredths, shade any squares of that count: which squares does not matter, only how many. A hundredth cut into ten equal parts gives thousandths, so 10 thousandths make 1 hundredth.

## Student controls
- **Cut column button**: lifts one column out and splits it into its ten squares
- **Drag to shade**: shades squares deep blue, or clears them when dragged back
- **Columns and squares counter**: reads the shading as full columns of ten and single squares
- **Scatter button**: moves the shaded squares to other places without changing their number
- **Zoom button**: lifts one square to strip size and cuts it into ten thin slices
- **Number pad**: sets a number of hundredths or thousandths, or types a fraction or a decimal

## State fields (getState, a resume contract)
phase, shaded, columns, squares, zoom, slices, answer, complete

## Textbook (this topic)
**Pages:** 76, 77
**Key terms:** hundredth, thousandth, hundred grid, hundredths
A tenth cut into ten equal parts gives hundredths, and a hundredth cut into ten gives thousandths, shown and read on hundred grids. One tenth cut into ten equal parts gives hundredths, and a hundred grid holds a hundred of them. Read a grid by its full columns first, then the single squares, and shade any squares of the right count. One hundredth cut into ten gives thousandths. The whole square now holds 100 such parts. One of them is one hundredth, written 1/100 or 0.01. 10 hundredths make 1 tenth. Each full column is 10 squares, so 3 columns are 30 squares. With 8 more, 38 of the 100 squares are shaded. That is 38/100, written 0.38. 0.06 means 6 hundredths, so shade any 6 squares of the 100. Which 6 does not matter, only how many. 0.6 would need 60 squares, a very different amount. Each part is one thousandth, written 1/1000 or 0.001. 10 thousandths make 1 hundredth. So 0.004 means 4 thousandths, and 0.035 means 35 thousandths.
