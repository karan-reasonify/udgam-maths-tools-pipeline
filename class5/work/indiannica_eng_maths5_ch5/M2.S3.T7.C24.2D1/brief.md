# M2.S3.T7.C24.2D1 · expanded_form · Expanded Form Splitter
indiannica_eng_maths5_ch5 · indiannica_eng_maths5_ch5_v1 v1 (active) · "Decimals" · segment M2.S3 "Place Value and Expanded Form" · topic M2.S3.T7 "Expanded Form" · printed p.81

> Runtime supplies the standard chrome (bands, zones, header, runs box, slot + pad, bubble, phase bar, type scale, content colours, sounds, finished/idle/restart). `scaffold` puts each phase's concept, teach line, hint ladder, closing line and items into tool.tsx; they are not repeated here. Build the working area and the mechanics.

## What it is
**Description:** Split a decimal into its place value, decimal and fractional forms at once, and drag an expanded form back into standard form with zeros in the missing places.
**Why:** Write a decimal in place value, decimal and fractional expanded forms, and write an expanded form back in standard form, putting zeros in missing places.
**Look:** Digit tiles over a place strip at the top, three labelled rows of parts under them, and a tray of parts on the last phase.
**Context:** Grade 5, the page on the expanded form of decimals. An adult sees three ways to write a sum. What the page is doing is showing what each digit is worth, in words, as a decimal and as a fraction, so that the number can be taken apart and put back. The place value form names places, so it is written with is.
**For the child:** Split the decimal into three forms. Add each form back up. To go back, put every part in its place and fill any gap with 0.
**Teaching notes:** Say each digit's place value aloud before any form is written; the three forms say the same thing three ways. Write the place value form with is, since it names places, and the decimal and fractional forms as sums. A zero digit adds nothing, so its place can be left out of an expanded form. Going back to standard form, a missing place gets a zero, or every digit after it slides into the wrong place. Check any expanded form by adding it back up.
**Placement:** Explore
**Also mounted in:** M2.S3.T7

## Look
**Chrome:** dim #9AA4AC · ink #2B2B2B · rule #C9BCA6 · panel #F2E4CE · paper #FFFDF7 · accent #5B6770
**Voice:** rate 0.92, pitch 1.06 · figure: None

## Stage (tool-specific layout)
Three bands across 1600 by 900. The header runs 0 to 80 and is one line only: 'Expanded Form Splitter' in ink at the far left, a small dot set clear of the name, the phase title beside the dot on the same line, the host's navigation, and sound and restart as three round controls at the far right. The canvas runs 92 to 746, one rounded card on the paper colour. At its top left, at x sixty-four, y 108 and 330 by 76, sits the running count: how many parts the decimal splits into, one for each digit that is not 0. It is never a score. The working area is 1086 by 528 at x sixty-four, y 202. The digit tiles run across the top of the working area at y 230, each 90 across, deep blue, with the large near-black point between Ones and Tenths and the place strip under them at y 330. The three rows run below at y 410, y 500 and y 590, each labelled at x 110 with its form: Place value form, Decimal form, Fractional form. Each part slides down from the digit it came from and lands in its row joined by plus signs; the Place value form row opens with the word is. A zero digit's part drops a little way and fades to half strength beside the words adds nothing. The Join button sits at the right end of each row, and the total it gives lands green under the row. On the last phase the tray runs along y 660, and a place left empty between parts lights grey and takes a 0 labelled Place holder. Down the right of the canvas, in the same rectangle on every phase and never animated in or out, the question sits above the answer slot at x 1186, y 250 (356 by 92) that holds what the child has given, and under it the pad at x 1170, y 368 (388 by 363). The pad is twelve number keys three across with a point key, a plus key and a fraction bar key, for setting a decimal or typing a part or a standard form into the answer slot. The footer runs 758 to 900: the voice caption at the far left with its speaking dot beside it, measuring its own wrap and dropping a type size rather than spilling, and the phase bar at the right with the question count under it. There is no sidebar and no score box anywhere, and nothing is ever written over the working area. Content colours are the chapter's own, and the tools of this chapter share them. A decimal or fraction the question gives is deep blue, with the shaded parts that show it. The result the working reaches, a decimal, a fraction, a sum, a difference or what is left, is green, with its shaded parts. Ten of one place traded for one of the next, a carry in adding or a trade in taking away, is vermilion. A zero written after the point to line decimals up is violet, and so is the point written after a whole number before those zeros. The part taken away, used or poured out is rose. The digit, place or step being worked on now, and the first place where two decimals differ, are amber. A zero holding a place open inside a number is grey, and nothing else on the stage is ever grey. An unshaded part stays warm white inside its near-black outline, the decimal point is near-black ink, and anything dimmed fades to half strength rather than turning grey. Chrome never borrows one of them, and each of those readings survives with the colour taken away, because a part is told by its written label, Given, Answer, Carry, Trade, Added zero, Taken away, Left or Place holder, before it is told by its colour.

## Opening (first frame of every mount)
Every mount comes up already furnished for its phase with the tiles in place. On the first three phases a decimal sits on the tiles over the place strip, and the row for that phase's form is empty below it. On the fourth the place strip is empty and the parts of an expanded form wait in the tray. One thing moves, once: the Split button, or the first part in the tray, gives one slow pulse while the voice speaks its opening line, and a finger on it is the whole way in.

## Phases (what each mount shows and does; the words are in tool.tsx)

### 1 · Place value form
**Screen:** 6.83 on the tiles and the Place value form row empty
**Does:** taps Split and names each part as it slides down: ones, tenths, hundredths
**Win:** the row reads 6.83 is 6 ones + 8 tenths + 3 hundredths
**Feels:** each digit carrying its place name down with it
**Goal:** a decimal is written by its places: so many ones, tenths and hundredths
**Observe:** Every part slid down from exactly one digit.
**Wrong (each is a traceback on the working area):**
- names a digit by the place of its neighbour → the part slides back up to its tile, and the place strip's name under it lights amber
- writes the place value form with an equals sign and numbers only → the Place value form row's opening word is lights, and each part shows its place name beside its digit
**Misconception to break:** Naming the 7 as 7 tenths, which gives it the name of the place straight after the point, where the 4 sits.

### 2 · Decimal form
**Screen:** the same tiles and the Decimal form row empty
**Does:** writes what each part is worth, then taps Join to add the row back up
**Win:** the row reads 6.83 = 6 + 0.8 + 0.03, and the total lands green under it
**Feels:** the parts adding back up to exactly the number they came from
**Goal:** a decimal is the sum of what each of its digits is worth, written as decimals
**Observe:** The three rows looked different and joined back up to the same number.
**Wrong (each is a traceback on the working area):**
- writes each digit as its face value → each part is redrawn with its place's zeros or point, sliding down from its tile, and the child's row stays beside it
- puts the point in the wrong place in a part after the point → the part's place name lights under its tile, and the digits of the part are counted after its point
**Misconception to break:** Writing 5 + 2 + 3 + 8, which gives every digit its own face value and adds up to 18.

### 3 · Fractional form
**Screen:** 5.08 on the tiles, its zero tile outlined in amber
**Does:** splits it, watches the zero fall out, and writes the hundredths as a fraction
**Win:** the zero fades out, and the row reads 5.08 = 5 + 8/100
**Feels:** a zero fading away while the digits after it keep their places
**Goal:** each place after the point is a fraction over 10, 100 or 1000, and a zero digit adds nothing
**Observe:** A zero digit dropped out of every row.
**Wrong (each is a traceback on the working area):**
- gives a digit after a zero the wrong denominator → the zero tile stays in its place, faded, and the next digit's place name lights amber with its own denominator
- writes every part over 10 → each part slides down from its tile with its place name, and the denominator for that place is written under it
**Misconception to break:** Writing 3/100 for the last digit, which skips the empty hundredths place and gives 3 hundredths instead of 3 thousandths.

### 4 · Back to standard form
**Screen:** the parts 300, 7, 9/10 and 2/1000 in the tray, and an empty place strip
**Does:** drags each part into its place and watches the empty places fill
**Win:** the tens and the hundredths light grey and take a 0, and 307.902 is read in green
**Feels:** a grey zero filling a place so the rest can sit right
**Goal:** an expanded form goes back to standard form with a 0 in every missing place
**Observe:** Going back, an empty place lit grey before the number could be read.
**Wrong (each is a traceback on the working area):**
- writes the digits side by side with no zero in the missing place → the empty place between two parts lights grey and a 0 drops into it, and the digits after it slide back to their own places
- puts a thousandths part in the hundredths place → the part slides to the place its denominator names, and the place it skipped lights grey
**Misconception to break:** Writing 406.14, which leaves out the 0 in the hundredths place and moves the 4 thousandths up into the hundredths.

## Delight
On the second phase, when the child taps Join, the parts of the row slide back up into their tiles one after another with a soft click each, and the decimal lights green as the last one lands.

**General miss line:** Look at which digit each part came from.

## Answer key
A decimal expands three ways. Place value form names each digit's place, and is written with is: a number is so many ones + so many tenths + so many hundredths. Decimal form writes what each digit is worth as a decimal and adds them. Fractional form writes each place after the point as a fraction over 10, 100 or 1000. A zero digit adds nothing, so its place can be left out. Going back to standard form, a missing place gets a 0.

## Student controls
- **Split button**: pulls the tiles apart into the three expanded forms at once
- **Join button**: adds a row back up and shows the total under it
- **Tray of parts**: holds the parts of an expanded form, which snap into their places on the strip
- **Number pad**: sets any decimal with up to three places, or types a part or a standard form

## State fields (getState, a resume contract)
phase, decimal, rows, zeros, tray, placed, answer, complete

## Textbook (this topic)
**Pages:** 81
**Key terms:** expanded form, place value, standard form, fraction
A decimal can be expanded three ways, by places, as a sum of decimals and as a sum of fractions, and put back together in standard form. 6.83 has 6 ones, 8 tenths and 3 hundredths. Written by places, 6.83 is 6 ones + 8 tenths + 3 hundredths. This is the place value form. Write what each digit is worth and add them: 6.83 = 6 + 0.8 + 0.03. This is the decimal form. Adding the parts gives the number back. Each place after the point is a fraction: 6.83 = 6 + 8/10 + 3/100. This is the fractional form. A zero digit adds nothing, so 5.08 = 5 + 8/100. There are no tens and no hundredths, so write 0 in those places. So 300 + 7 + 9/10 + 2/1000 = 307.902. This is the standard form.
