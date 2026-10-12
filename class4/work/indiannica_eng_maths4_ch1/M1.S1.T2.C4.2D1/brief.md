# M1.S1.T2.C4.2D1 · place_value_builder · Place Value Builder
indiannica_eng_maths4_ch1 · indiannica_eng_maths4_ch1_v1 v1 (active) · "Large Numbers" · segment M1.S1 "A New Place Opens" · topic M1.S1.T2 "Beyond Nine Thousand Nine Hundred Ninety Nine" · printed p.2 to p.5

> Runtime supplies the standard chrome (bands, zones, header, runs box, slot + pad, bubble, phase bar, type scale, content colours, sounds, finished/idle/restart). `scaffold` puts each phase's concept, teach line, hint ladder, closing line and items into tool.tsx; they are not repeated here. Build the working area and the mechanics.

## What it is
**Description:** Drop tokens onto a mat until ten of them bundle, and watch a new place open on the chart.
**Why:** Build numbers bigger than any you have written before, and watch a new place open when there is nowhere left to put the extra one.
**Look:** A chart of place value columns with a tray of numbered tokens below it, and the number you have built written out above.
**Context:** Grade 4, the opening topic of the large numbers chapter. An adult sees a place value chart being filled in. What the page is actually doing is growing the chart: a child who has only ever met four columns has to watch a fifth one open, and then a sixth and a seventh, before any of the reading and writing that follows will mean anything.
**For the child:** Drag tokens onto the chart to build a number. When ten gather in one column they bundle and move left. Add one more token to a full chart and watch a new place open. Then switch the commas on and read your number aloud.
**Teaching notes:** Write the greatest four digit number on paper first and add one to it by hand, and let them get it wrong. The tool is what lets the rollover be watched rather than reasoned about, and it is the whole of this topic. Use the bundle slowly control every time for the first few numbers; at full speed the carry is invisible and the child learns a rule instead of a reason. When the commas go in, insist on reading the number out loud in chunks. A number read digit by digit has not been read at all.
**Placement:** Explore
**Also mounted in:** M1.S1.T2

## Look
**Chrome:** dim #9AA4AC · ink #2B2B2B · rule #C9BCA6 · panel #F2E4CE · paper #FFFDF7 · accent #5B6770
**Voice:** rate 0.92, pitch 1.06 · figure: None

## Stage (tool-specific layout)
Three bands across 1600 by 900. The header runs 0 to 80 and is one line only: 'Place Value Builder' in ink at the far left, a small dot set clear of the name by measuring it, the phase title beside the dot on the same line, the host's navigation, and again, sound and restart as three round controls at the far right. The canvas runs 92 to 746, one rounded card on the paper colour. At its top left, at 64,108 and 330 by 76, sits the running count: the number as it stands, its digits in their period colours, redrawn every time a token lands or a bundle carries left, with the number of columns the chart now has written small beside it in ink. Nothing in it ever counts down and nothing in it ever reads as a score. The working area is 1086 by 528 at 64,202. The chart sits across the top of the working area, 1086 by 300 at 64,202: ruled columns 120 wide under headings 44 tall, the ones column pinned at the far right so that every new column opens to the left and no digit already written ever moves, four columns at the first sight of it and as many as seven by the end. Each column carries its place name in its heading, ones, tens, hundreds, thousands, ten thousands, lakhs and ten lakhs, and holds its tokens stacked from the floor of the column upwards, never more than nine of them standing. Under the chart a tray 1086 by 132 at 64,516 holds four stacks of token tiles: a one is a square 36 by 36, a ten a strip of ten of those squares standing on end at 36 by 72, a hundred a block ruled ten by ten at 72 by 72, and a thousand that same block drawn as a cube, each with its number printed on its face so a tile can be read as well as counted. A tenth token dropped into a column ties itself with a drawn band, turns into one tile of the next size and travels left along a carry lane 12 tall that runs under the column headings; at walking pace that takes one slow breath per column, so a cascade across four full columns is four of them in a row. The period bands lie behind the columns, ones deep blue over three places, thousands green over two and lakhs vermilion over two, each named above the headings, and a comma is written 40 tall in the gap between two columns, never inside one. A reading strip 1086 by 66 at the foot of the working area spells the number out in words one period at a time, each period in its own band colour. The number line, when it is opened, takes the tray's rectangle: a ruled strip with labelled ticks at the hundreds either side of the built number and the number itself dropped on it as an amber pin. Down the right of the canvas, in the same rectangle on every phase and never animated in or out, the question sits above the answer slot at 1186,250 (356 by 92) that holds what the child has given, and under it the pad at 1170,368 (388 by 363). The pad is twelve number keys three across wherever a number is asked for, and on the third and fourth phases a word pad of place and period names, ones, tens, hundreds, thousands, ten thousands, lakhs and ten lakhs, with thousands and lakhs doubling as the period names, so a new column can be named with one press. The footer runs 758 to 900: the voice caption at the far left with its speaking dot beside it, measuring its own wrap and dropping a type size rather than spilling, and the phase bar at the right with the question count under it. There is no sidebar and no score box anywhere, and nothing is ever written over the working area. Content colours are the chapter's own: a digit takes the colour of its period, deep blue in the ones period, green in the thousands and vermilion in the lakhs, and rose in the millions where the international chart reaches; a digit under discussion, or the one that decides a comparison, is amber; a zero holding a place open is grey. Chrome never borrows one of them, and every one of those readings survives with the colour taken away, because a place is told by its column heading and a period by its band before either is told by its colour.

## Opening (first frame of every mount)
Every mount comes up already furnished for its phase with nothing in front of it. On the first phase the chart stands four columns wide with nine tokens in every one of them, the greatest four digit number already built, and a single loose one token waits on the tray below. On the second the chart is ruled and empty and the tray is full, four stacks of tiles marked one, ten, one hundred and one thousand. On the third the chart stands five columns wide and full of nines. On the fourth a six digit number is already in the chart with the three period bands lying behind it and not one comma written yet. The running count at the top left holds the number as it stands, and the answer slot and the pad wait empty down the right. One thing moves, once: the loose one token on the tray, or the first empty column, or the gap where the first comma will go, gives one slow pulse while the voice says there is one more to drop in. That pulse is the only invitation, and a finger on it is the whole way in.

## Phases (what each mount shows and does; the words are in tool.tsx)

### 1 · One more than the biggest four digit number
**Screen:** the chart holding the greatest four digit number in four full columns
**Does:** adds a single one token and watches every column turn over
**Win:** a new column opens on the left and catches the carry
**Feels:** four columns all turn over together, and the chart itself has to get wider
**Goal:** the four nines roll over together and a fifth place opens
**Observe:** Nine ones and one more left the ones column with nothing standing in it.
**Wrong (each is a traceback on the working area):**
- turns over the ones column only and leaves the other three nines standing. → the ten ones in the ones column bundle and the bundled token travels left, and the tens column is shown already holding nine; the running count holds still while that column is counted out to ten, one token at a time, and then bundles too. The child's number stays in the answer slot beside the chart.
- says the answer must still be a four digit number. → the last carry token is left sitting hard against the left edge of the chart with no column under it, and it stays there, not moving and not fading, while the four headings are read out from the right and run out. Nothing is cleared.
**Misconception to break:** Turning over only the ones column and writing 99,910.

### 2 · Showing a big number with tokens
**Screen:** an empty chart with the token tray full beneath it
**Does:** drags tokens until the counter reads the target number
**Win:** the counter reaches the target and the thousands column holds ten bundled tokens
**Feels:** ten tiles of the biggest kind you have, and they turn into one thing with a new name
**Goal:** a big number is still built from ones, tens, hundreds and thousands
**Observe:** Every column turned over at once and the chart came out one column wider.
**Wrong (each is a traceback on the working area):**
- hunts the tray for a ten thousand tile. → the four stacks lift in turn and name themselves, one, ten, one hundred, one thousand, and no fifth stack appears; then ten thousand tiles gather in the thousands column, bundle, and carry left into the ten thousands, where they land as one token. The child's answer stays in the answer slot.
- drops thousand tiles past the target and keeps going. → the chart counts its own thousands column out loud, one token lifting at a time, and the built number and the target number are laid one under the other in the same chart with their columns aligned, so the column holding too much shows itself. No token is taken out for the child.
**Misconception to break:** Looking for a ten thousand token, when the tray holds no such tile.

### 3 · The chart grows a new place each time
**Screen:** the chart at the greatest five digit number, then the greatest six
**Does:** adds one more token at each ceiling and names the place that opens
**Win:** the lakhs and then the ten lakhs columns appear and are named
**Feels:** the chart keeps opening one more room on the left, and the room always has a name
**Goal:** every rollover opens exactly one more place to the left
**Observe:** The thousands column took ten tokens before anything was worth ten thousand.
**Wrong (each is a traceback on the working area):**
- calls one lakh ten thousand, counting the zeros instead of the places. → the columns are read from the right, one heading lighting at a time, ones, tens, hundreds, thousands, ten thousands, lakhs, and the one token stops in the column whose heading is lit last. The child's name for it stays in the answer slot beside the chart's.
- expects two new columns to open at once. → the cascade runs again slowly and the single carry token coming out of the leftmost column is followed by a thin ink line to the one new column that opens to catch it; then the headings are counted along and come out one more than before.
**Misconception to break:** Calling 1,00,000 ten thousand, by counting its zeros instead of its places.

### 4 · Commas split a number into periods
**Screen:** a six digit number in the chart with the period bands behind it
**Does:** places the commas and then reads the number one period at a time
**Win:** the number is spelled out in words and matches what the child said
**Feels:** six digits that were a mouthful turn into three short chunks you can say
**Goal:** commas mark the periods, and the periods are how a number is read
**Observe:** The commas turned six digits into three short chunks to say.
**Wrong (each is a traceback on the working area):**
- groups the digits in threes all the way along. → the comma the child wrote stays exactly where it was put, and the period bands slide in behind the columns, three places, then two, then two, so the bands and the commas sit on the stage disagreeing with each other; then the band edges are counted out from the right. Nothing is erased.
- reads the number digit by digit, naming each symbol in turn. → the digits of one period lift together as a single piece and the reading strip writes that period and its name, then the next; each period stays lit until its name has been said, and the strip ends with three chunks where the child read six symbols.
**Misconception to break:** Grouping in threes all the way along and writing 738,000.

## Delight
The first phase, the moment the extra one token lands. All four nines turn over to zeros in turn, right to left, each one sending a bundled token left along the carry lane, and the last carry arrives at the edge of the chart with nowhere to go. It waits there a beat. Then the chart draws itself one column wider, the heading writes itself as ten thousands, and the token settles into the new column. Nothing else moves and the voice says nothing while it happens.

**General miss line:** Lay them in again, slowly. Watch what leaves the column.

## Answer key
Ten in any column bundle into one of the next column to the left. When the leftmost column is full, a new place opens for the carry, which is how 9999 becomes 10,000 and 99,999 becomes 1,00,000. The places are grouped into periods of three, then two, then two, and a comma is written at each boundary. A number is read one period at a time, each followed by its name except the ones.

## Student controls
- **Token tray**: drops a one, ten, hundred or thousand token into the chart
- **Add one more**: adds a single one token, which is what forces a rollover
- **Bundle slowly**: ties ten tokens into one of the next size at walking pace
- **Show periods**: slides the ones, thousands and lakhs bands in behind the columns
- **Commas**: writes a comma at each period boundary and takes them away again
- **Read it out**: spells the built number in words along the bottom of the stage
- **Number line**: opens a strip and marks where the built number sits between its neighbours

## State fields (getState, a resume contract)
phase, columns, tokens, value, periodsShown, commasShown, lineOpen, complete

## Textbook (this topic)
**Pages:** 2, 3, 4, 5
**Key terms:** ten thousand, lakh, period, comma, place value chart, token
One is added to the greatest four digit number, a new place opens, and the chart keeps growing as far as lakhs. Each nine turns over to zero and passes one along to its left. The last one has nowhere to go, so a new place opens for it. That number is 10,000 and it is read as ten thousand. Ten thousand takes ten of the thousand tokens. Five hundreds, one ten and two ones finish it. Laying it out shows that a big number is still made of the same small pieces. Adding one to the greatest five digit number gives 1,00,000, read as one lakh. Adding one to the greatest six digit number gives 10,00,000, read as ten lakh. Every rollover opens one more place to the left. The places are grouped into three periods named ones, thousands and lakhs. A comma is written at each boundary. The commas are what let you read 7,38,000 as seven lakh thirty-eight thousand instead of guessing.
