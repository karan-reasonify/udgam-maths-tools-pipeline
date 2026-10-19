# M1.S2.T5.C20.2D1 · fraction_converter · Fraction Converter
indiannica_eng_maths5_ch5 · indiannica_eng_maths5_ch5_v2 v2 (file) · "Decimals" · segment M1.S2 "Reading and Converting" · topic M1.S2.T5 "Fractions to Decimals and Back" · printed p.78 to p.80

> Runtime supplies the standard chrome (bands, zones, header, runs box, slot + pad, bubble, phase bar, type scale, content colours, sounds, finished/idle/restart). `scaffold` puts each phase's concept, teach line, hint ladder, closing line and items into tool.tsx; they are not repeated here. Build the working area and the mechanics.

## What it is
**Description:** Count the zeros of the denominator and slide the point into place, write zeros in front of a short numerator, and turn a decimal back into a fraction in lowest terms.
**Why:** Convert a fraction with a denominator of 10, 100 or 1000, or one that can be brought to it, into a decimal, and convert a decimal into a fraction in lowest terms.
**Look:** A fraction card and a row of digit cards, a Zeros counter and a Count button under them, a Times both slider on the third phase and a Factors row on the last.
**Context:** Grade 5, the pages on converting between fractions and decimals. An adult sees a rule about counting zeros. What the pages are doing is linking tenths, hundredths and thousandths to the places after the point, so the denominator has to be 10, 100 or 1000 itself before the zeros are counted. Some fractions reach one of those by an equivalent fraction and some never do; one third never does.
**For the child:** Count the zeros at the bottom. That many digits go after the point. Fill any gap with zeros in front.
**Teaching notes:** Count the zeros of the denominator aloud before any digit is moved. Only 10, 100 or 1000 itself will do: a denominator that merely ends in a zero, such as 20, is first changed by an equivalent fraction. When the numerator is too short, write zeros in front of it, and a 0 in the ones place if nothing is left. Some fractions, such as one third, never reach 10, 100 or 1000; say so and leave them there. Going back, the number of digits after the point gives the number of zeros in the denominator, and the HCF gives lowest terms.
**Placement:** Explore
**Also mounted in:** M1.S2.T5

## Look
**Chrome:** dim #9AA4AC · ink #2B2B2B · rule #C9BCA6 · panel #F2E4CE · paper #FFFDF7 · accent #5B6770
**Voice:** rate 0.92, pitch 1.06 · figure: None

## Stage (tool-specific layout)
Three bands across 1600 by 900. The header runs 0 to 80 and is one line only: 'Fraction Converter' in ink at the far left, a small dot set clear of the name, the phase title beside the dot on the same line, the host's navigation, and sound and restart as three round controls at the far right. The canvas runs 92 to 746, one rounded card on the paper colour. At its top left, at x sixty-four, y 108 and 330 by 76, sits the running count: how many digits have been counted from the right, one for each digit lit. It is never a score. The working area is 1086 by 528 at x sixty-four, y 202. The fraction card stands at x 110, y 240, 180 by 200, its numerator deep blue above the bar and its denominator in ink below. The digit cards run to its right from x 360 at y 280, each 80 across, one digit to a card, with room for grey zero cards to slide in at the front. The Zeros counter sits under the fraction card at y 470 and the Count button beside it at x 360. When the point drops it sits large and near-black between two cards, and the decimal is written green at y 400 under the row. The Times both slider runs along y 560 from x 110 to x 700, its handle showing the number both terms are multiplied by. On the last phase the Factors row runs along y 640, one chip for each common factor, the HCF lit amber. Down the right of the canvas, in the same rectangle on every phase and never animated in or out, the question sits above the answer slot at x 1186, y 250 (356 by 92) that holds what the child has given, and under it the pad at x 1170, y 368 (388 by 363). The pad is twelve number keys three across with a point key and a fraction bar key, for setting a fraction with a denominator up to 1000 or a decimal with up to three places, or for typing an answer into the slot. The footer runs 758 to 900: the voice caption at the far left with its speaking dot beside it, measuring its own wrap and dropping a type size rather than spilling, and the phase bar at the right with the question count under it. There is no sidebar and no score box anywhere, and nothing is ever written over the working area. Content colours are the chapter's own, and the tools of this chapter share them. A decimal or fraction the question gives is deep blue, with the shaded parts that show it. The result the working reaches, a decimal, a fraction, a sum, a difference or what is left, is green, with its shaded parts. Ten of one place traded for one of the next, a carry in adding or a trade in taking away, is vermilion. A zero written after the point to line decimals up is violet, and so is the point written after a whole number before those zeros. The part taken away, used or poured out is rose. The digit, place or step being worked on now, and the first place where two decimals differ, are amber. A zero holding a place open inside a number is grey, and nothing else on the stage is ever grey. An unshaded part stays warm white inside its near-black outline, the decimal point is near-black ink, and anything dimmed fades to half strength rather than turning grey. Chrome never borrows one of them, and each of those readings survives with the colour taken away, because a part is told by its written label, Given, Answer, Carry, Trade, Added zero, Taken away, Left or Place holder, before it is told by its colour.

## Opening (first frame of every mount)
Every mount comes up already furnished for its phase with the fraction card and its digit cards in place and no point yet. On the first phase the Zeros counter stands at nothing. On the second the numerator has fewer digits than the denominator has zeros. On the third the Count button is switched off and the Times both slider rests at one. On the fourth a decimal sits on the digit cards with the Back button lit. One thing moves, once: the Zeros counter, the slider handle or the Back button gives one slow pulse while the voice speaks its opening line, and a finger on it is the whole way in.

## Phases (what each mount shows and does; the words are in tool.tsx)

### 1 · Counting the zeros
**Screen:** 43/100 on the fraction card, its digits 4 and 3 on cards, and the Zeros counter at nothing
**Does:** counts the two zeros, taps Count, and watches two digits light and the point drop before them
**Win:** the point drops in front of the four, a grey 0 fills the ones place, and 0.43 is written in green
**Feels:** the point dropping into place after the count
**Goal:** the zeros of 10, 100 or 1000 say how many digits come after the point
**Observe:** The number of zeros at the bottom always matched the number of digits after the point.
**Wrong (each is a traceback on the working area):**
- puts the point after the counted digits instead of before them → the counted digits light amber and the point slides to their left edge, with the child's own row kept above
- counts the digits of the denominator instead of its zeros → the one in front of the zeros fades to half strength and the zeros light one by one, the counter ticking with each
**Misconception to break:** Writing 6.7, which puts only one digit after the point though 100 has two zeros.

### 2 · Zeros in front
**Screen:** 4/1000 on the card and a single digit card, the Zeros counter at nothing
**Does:** counts three zeros, taps Count, and watches two grey zero cards slide in front of the four
**Win:** the row reads 004 with the point before it and a 0 in the ones place, and 0.004 is written in green
**Feels:** zeros sliding in to fill a gap nobody saw
**Goal:** a short numerator gets zeros in front of it, and a 0 in the ones place
**Observe:** Grey zero cards slid in when the numerator ran out of digits.
**Wrong (each is a traceback on the working area):**
- puts the point straight before the one digit, with no zeros in front → the count runs on past the digit, each missing place lighting amber and filling with a grey zero card
- leaves the ones place empty before the point → the ones place outlines itself and a grey 0 drops into it, the point staying where it was
**Misconception to break:** Writing 9.7, which leaves out the two zeros in front and turns seven thousandths into seven tenths.

### 3 · Make the denominator 10, 100 or 1000
**Screen:** 3/20 on the card, the Count button off, and the Times both slider at one
**Does:** drags the slider until the denominator lands on 100, then taps Count
**Win:** the slider settles at five, the card reads 15/100, and 0.15 is written in green
**Feels:** the slider clicking into place on a denominator of a hundred
**Goal:** a denominator that goes exactly into 10, 100 or 1000 is multiplied up to it first, and 1/3 never gets there
**Observe:** The slider settled for some denominators and ran to its end for others.
**Wrong (each is a traceback on the working area):**
- counts the one zero of a denominator that only ends in zero → the Count button stays off and pulses once, and the slider handle lights amber to show where to start
- multiplies only the denominator up to 100 → the card built that way is set beside the first one with both shaded on a strip, and the two shaded runs end in different places
**Misconception to break:** Counting the one zero of 20 and writing 0.7, which is seven tenths and twice as much as 7/20.

### 4 · Decimals back to fractions
**Screen:** 2.75 on the digit cards and the Back button lit
**Does:** taps Back, reads the fraction, fills the Factors row and divides both terms by the HCF
**Win:** 275/100 appears, the HCF twenty-five lights amber, and the card settles on 11/4
**Feels:** a long fraction shrinking to its smallest form in one step
**Goal:** a decimal goes over 1 with a zero for each digit after the point, then is divided by the HCF
**Observe:** Dividing by the lit factor left a fraction nothing more would divide.
**Wrong (each is a traceback on the working area):**
- writes one zero too few in the denominator → the digits after the point light amber one by one, and a zero appears on the denominator for each
- stops before lowest terms → the Factors row lights the factor the two terms still share, and the card waits beside the child's fraction
**Misconception to break:** Stopping at 435/100, which is equal but not in lowest terms, since 435 and 100 still share the factor 5.

## Delight
On the second phase, when the count runs past the numerator's last digit, grey zero cards slide in from the left one after another with a soft tick each, and the point drops into place in front of them.

**General miss line:** Count the zeros at the bottom again, then count that many digits.

## Answer key
A fraction whose denominator is 10, 100 or 1000 itself becomes a decimal by counting: the number of zeros in the denominator is the number of digits after the point. Count that many digits from the right of the numerator and put the point before them. If the numerator is too short, write zeros in front of it, and write 0 in the ones place if nothing is left before the point. Any other denominator is first changed by an equivalent fraction, multiplying both terms by the same number, and that works only when the denominator goes exactly into 10, 100 or 1000. Not every fraction can be written this way: 1/3 has no such form. To go back, write the digits without the point over 1 followed by as many zeros as there are digits after the point, then divide both terms by their HCF.

## Student controls
- **Zeros counter**: counts the zeros of the denominator one tap at a time
- **Count button**: sweeps that many digits from the right and drops the point before them, and stays off unless the denominator is 10, 100 or 1000
- **Times both slider**: multiplies both terms by the same number, settling only on a denominator of 10, 100 or 1000
- **Back button**: writes a decimal's digits over 10, 100 or 1000, one zero for each digit after the point
- **Factors row**: lists the common factors of the two terms and lights the HCF
- **Number pad**: sets a fraction with a denominator up to 1000, or a decimal with up to three places

## State fields (getState, a resume contract)
phase, fraction, zeros, counted, times, decimal, factors, answer, complete

## Textbook (this topic)
**Pages:** 78, 79, 80
**Key terms:** decimal fraction, denominator, numerator, equivalent fraction, lowest terms, HCF
A fraction with denominator 10, 100 or 1000 becomes a decimal by counting zeros, other fractions get there through an equivalent fraction when they can, and a decimal goes back over 10, 100 or 1000. When the denominator is 10, 100 or 1000, its zeros say how many digits go after the point, with zeros written in front of a short numerator. Some other fractions can first be changed to an equivalent fraction with such a denominator. A decimal goes back over 10, 100 or 1000, then into lowest terms. The denominator 100 has two zeros, so two digits must come after the point. Count two digits from the right of 43 and put the point before them. Nothing is left, so write 0 in the ones place: 43/100 = 0.43. 1000 has three zeros, so three digits must follow the point. 4 has only one digit, so write two zeros in front of it: 004. Put the point before them and 0 in the ones place: 4/1000 = 0.004. A mixed number keeps its whole number: 5 3/100 = 5.03. Counting zeros works only when the denominator is a 1 followed by zeros: 10, 100 or 1000 itself. 20 is not, but 20 x 5 = 100, so multiply both terms by 5: 3/20 = 15/100 = 0.15. This works when the denominator goes exactly into 10, 100 or 1000. 1/3 has no such form, because 3 does not. Write the digits without the point: 275. There are two digits after the point, so the denominator is 100: 2.75 = 275/100. The HCF of 275 and 100 is 25, so 275/100 = 11/4 in lowest terms.
