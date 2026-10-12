# M1.S2.T4.C12.2D1 · decimal_reader · Decimal Reader
indiannica_eng_maths5_ch5 · indiannica_eng_maths5_ch5_v1 v1 (active) · "Decimals" · segment M1.S2 "Reading and Converting" · topic M1.S2.T4 "Reading and Writing Decimals" · printed p.77

> Runtime supplies the standard chrome (bands, zones, header, runs box, slot + pad, bubble, phase bar, type scale, content colours, sounds, finished/idle/restart). `scaffold` puts each phase's concept, teach line, hint ladder, closing line and items into tool.tsx; they are not repeated here. Build the working area and the mechanics.

## What it is
**Description:** Read a decimal with and or with point, chip by chip under its digits, and build a decimal from its words with zeros in the empty places.
**Why:** Read a decimal in words both ways, with and and with point, and write a decimal from its words, with zeros in the empty places after the point.
**Look:** Digit tiles over a place strip, two rows of reading chips under them, and a Words tray on the last phase.
**Context:** Grade 5, the page on reading and writing decimals. An adult sees two rules for saying a number. What the page is doing is tying each word to the digits it comes from, so that a decimal said aloud tells how big it is. Both readings are right, and a zero whole part may be read with zero and or without it.
**For the child:** Read the decimal with and, then with point. Both ways are right. To write one from words, fill every empty place with 0.
**Teaching notes:** Say every decimal both ways and accept either from the child: with and, the last digit's place names the decimal part; with point, each digit is said on its own. When the whole number part is 0, zero and may be left out; do not correct a child who says it or one who does not. Writing from words, the last word decides how many places come after the point, and every empty place gets a 0. The headlines are the child's own collection; read a few of their decimals aloud both ways in class.
**Placement:** Explore
**Also mounted in:** M1.S2.T4

## Look
**Chrome:** dim #9AA4AC · ink #2B2B2B · rule #C9BCA6 · panel #F2E4CE · paper #FFFDF7 · accent #5B6770
**Voice:** rate 0.92, pitch 1.06 · figure: None

## Stage (tool-specific layout)
Three bands across 1600 by 900. The header runs 0 to 80 and is one line only: 'Decimal Reader' in ink at the far left, a small dot set clear of the name, the phase title beside the dot on the same line, the host's navigation, and sound and restart as three round controls at the far right. The canvas runs 92 to 746, one rounded card on the paper colour. At its top left, at x sixty-four, y 108 and 330 by 76, sits the running count: how many chips the reading has so far, one for each word laid under the tiles. It is never a score. The working area is 1086 by 528 at x sixty-four, y 202. The digit tiles run across the working area at y 240, each 96 across with 12 between them, the large near-black point in its own narrow slot between the Ones and the Tenths. The place strip sits under the tiles at y 350, one name under each tile: Hundreds, Tens, Ones, the point, Tenths, Hundredths, Thousandths. The first reading's chips land in a row at y 430, the whole number part deep blue, the word and on the point, and the name of the last digit's place in amber under the last tile. The second reading's chips land in a row at y 520, the word point on the point and one word under each digit after it. Each row has a small speaker at its right end. The Zero and switch sits at x 110, y 620. On the last phase the Words tray runs along the bottom at y 640, its chips dragged up onto the place strip, and an empty place fills with a grey 0 labelled Place holder. Down the right of the canvas, in the same rectangle on every phase and never animated in or out, the question sits above the answer slot at x 1186, y 250 (356 by 92) that holds what the child has given, and under it the pad at x 1170, y 368 (388 by 363). The pad is a number pad of twelve keys with a point key, and a word pad of number words and place names, for setting a decimal or typing a reading into the answer slot. The footer runs 758 to 900: the voice caption at the far left with its speaking dot beside it, measuring its own wrap and dropping a type size rather than spilling, and the phase bar at the right with the question count under it. There is no sidebar and no score box anywhere, and nothing is ever written over the working area. Content colours are the chapter's own, and the tools of this chapter share them. A decimal or fraction the question gives is deep blue, with the shaded parts that show it. The result the working reaches, a decimal, a fraction, a sum, a difference or what is left, is green, with its shaded parts. Ten of one place traded for one of the next, a carry in adding or a trade in taking away, is vermilion. A zero written after the point to line decimals up is violet, and so is the point written after a whole number before those zeros. The part taken away, used or poured out is rose. The digit, place or step being worked on now, and the first place where two decimals differ, are amber. A zero holding a place open inside a number is grey, and nothing else on the stage is ever grey. An unshaded part stays warm white inside its near-black outline, the decimal point is near-black ink, and anything dimmed fades to half strength rather than turning grey. Chrome never borrows one of them, and each of those readings survives with the colour taken away, because a part is told by its written label, Given, Answer, Carry, Trade, Added zero, Taken away, Left or Place holder, before it is told by its colour.

## Opening (first frame of every mount)
Every mount comes up already furnished for its phase with the tiles in place and no chips yet. On the first phase a decimal sits on the tiles over the place strip with the Read with and button lit. On the second the first reading is already built above an empty second row. On the third a decimal with a zero whole part sits on the tiles with the Zero and switch off. On the fourth the Words tray holds word chips and the place strip is empty. One thing moves, once: the lit button, or the first word chip, gives one slow pulse while the voice speaks its opening line, and a finger on it is the whole way in.

## Phases (what each mount shows and does; the words are in tool.tsx)

### 1 · Reading with and
**Screen:** 46.29 on the tiles, the place strip under it, and no chips yet
**Does:** taps Read with and and says each chip as it lands, then names the last digit's place
**Win:** forty-six and twenty-nine hundredths is built, the word hundredths hung under the nine in amber
**Feels:** each word dropping onto the digits it comes from
**Goal:** a decimal is read with its whole number part, and for the point, and the digits after the point with the last one's place named
**Observe:** The name at the end of the first reading always came from the last digit.
**Wrong (each is a traceback on the working area):**
- names the place of the first digit after the point instead of the last → the digits after the point light together in amber, and the name under the last tile pulses while the child's chips stay in the row
- reads the digits after the point as separate words in the and way → the digits after the point are drawn joined by one bracket, and the chip row makes room for one number there
**Misconception to break:** Saying three hundred twelve and forty-six tenths, which names the place of the first digit after the point instead of the last.

### 2 · Reading with point
**Screen:** the same tiles, the first reading kept above, and an empty second row
**Does:** taps Read with point and says one word for each digit after the point
**Win:** forty-six point two nine sits under the first reading, both green
**Feels:** two readings side by side that say one number
**Goal:** a decimal is also read with point, each digit after the point said on its own
**Observe:** The second reading had one word for every digit after the point.
**Wrong (each is a traceback on the working area):**
- reads the digits after the point as one number in the point way → one word slot opens under each digit after the point, and the chip that joined them splits into one word per slot
- drops a zero digit from the point reading → the zero tile lights amber and its empty word slot waits under it, and the rest of the child's row stays in place
**Misconception to break:** Saying nine point three hundred five, which reads the digits after the point as one number in the point way.

### 3 · When the whole number part is zero
**Screen:** 0.803 on the tiles and the Zero and switch off
**Does:** reads it with and, flips the Zero and switch, and reads it with point
**Win:** eight hundred three thousandths and zero and eight hundred three thousandths both stay green, and zero point eight zero three sits below
**Feels:** the Zero and switch flipping and both readings staying green
**Goal:** a zero whole part may be read with zero and or without it, and both ways are right
**Observe:** The Zero and switch changed the words but never the number.
**Wrong (each is a traceback on the working area):**
- says the zero whole part as nothing and runs the reading into the next number → the zero tile and the word point light in turn, and the second row waits for the word zero before its first slot
- reads the digits after the point as a whole number with no place name → the place strip's name under the last digit lights amber, and a slot for it opens at the end of the child's row
**Misconception to break:** Reading 0.26 as twenty-six, which leaves out the name of the place and turns it into a whole number.

### 4 · From words to a decimal
**Screen:** the words fifteen and four hundredths in the Words tray, and an empty place strip
**Does:** drags each word chip onto its place and watches the empty tenths place fill
**Win:** a grey 0 fills the tenths place, and the tiles read 15.04
**Feels:** a grey zero sliding into the one place nobody filled
**Goal:** a decimal is written from its words with a 0 in every empty place after the point
**Observe:** A grey 0 appeared in a place no word had filled.
**Wrong (each is a traceback on the working area):**
- puts the digits of the last word straight after the point, leaving no room for an empty place → the place named by the last word lights amber, and the places before it after the point light one by one, the empty one filling with a grey 0
- writes the place name as extra digits → the place name chip slides onto the place strip's own label and stays there, and only digits land on the tiles
**Misconception to break:** Writing 8.19, which is eight and nineteen hundredths, because the empty tenths place was not filled with 0.

## Delight
On the first phase, as the last chip lands, the place strip's name under the last digit floats down and hooks itself onto the end of the reading in amber, and the voice reads the whole thing aloud.

**General miss line:** Say the whole number part first. Then look at the point.

## Answer key
With and: read the whole number part as usual, say and for the point, then read the digits after the point as one number and name the place of the last digit. With point: read the whole number part, say point, then say each digit after the point on its own. Both ways are right. When the whole number part is 0, the words zero and may be left out. To write a decimal from words, the last word names how many places come after the point, and every empty place gets a 0.

## Student controls
- **Read with and button**: builds the first reading chip by chip under the digits
- **Read with point button**: builds the second reading, one word under each digit after the point
- **Zero and switch**: shows a zero whole part read with zero and or without it
- **Words tray**: holds word chips that drop onto the place strip and fill their places
- **Number pad and word pad**: set any decimal with up to three digits after the point, or type a reading

## State fields (getState, a resume contract)
phase, decimal, readingAnd, readingPoint, zeroAnd, chips, answer, complete

## Textbook (this topic)
**Pages:** 77
**Key terms:** decimal, decimal point, tenths, hundredths, thousandths
A decimal is read with and for the point and the last digit's place named, or with point and each digit said on its own. Read the whole number part as usual: forty-six. Say and for the point. Read the digits after the point as one number, then name the place of the last digit. So 46.29 is forty-six and twenty-nine hundredths. Say the whole number part, then point, then each digit after the point on its own. So 46.29 is also said as forty-six point two nine. Both ways are right. The first way gives zero and eight hundred three thousandths. The words zero and may be left out when the whole number part is 0. The second way gives zero point eight zero three. Write 15 for the whole number part and put the point after it. Hundredths need two places after the point: 0 tenths, then 4 hundredths. So it is 15.04, or 15 4/100 as a mixed number.
