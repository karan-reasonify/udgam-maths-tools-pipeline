# M2.S2.T3.C13.2D1 · fraction_to_per_cent · Fraction to Per Cent
indiannica_eng_maths5_ch6 · indiannica_eng_maths5_ch6_v2 v2 (active) · "Percentage" · segment M2.S2 "Into Per Cents" · topic M2.S2.T3 "Fractions as Per Cents" · printed p.92 to p.93

> Runtime supplies the standard chrome (bands, zones, header, runs box, slot + pad, bubble, phase bar, type scale, content colours, sounds, finished/idle/restart). `scaffold` puts each phase's concept, teach line, hint ladder, closing line and items into tool.tsx; they are not repeated here. Build the working area and the mechanics.

## What it is
**Description:** Grow both terms of a fraction until the denominator is 100, simplify first when it does not go into 100, or multiply by 100 in brackets and write the % sign last.
**Why:** Write a fraction as a per cent through an equivalent fraction over 100 when its denominator goes into 100, simplify first when it does not, and use the bracketed method with the % sign last. A mixed number goes past 100%.
**Look:** A fraction card over a bar of the same whole, the row of Times buttons, the Makes 100 counter, and on the later phases the brackets of the other method and a second whole bar.
**Context:** Grade 5, the pages on fractions as per cents. An adult sees two methods. What the pages are doing is making hundredths: an equivalent fraction over 100 names the per cent by its numerator, which works when the denominator, in lowest terms, goes into 100. The other method multiplies the fraction by 100 and writes the % sign, and the two are kept apart.
**For the child:** Ask what times the bottom number makes 100. Do the same to the top. Or multiply by 100 in brackets, and write the % sign last.
**Teaching notes:** Fold paper strips into halves, quarters, fifths and tenths before the tool opens. Ask what times the denominator makes 100 before anything is multiplied, and multiply both terms by it. When the denominator does not go into 100, simplify first and check again; say plainly that one third never gets there. Keep the two methods apart, and write the brackets whenever the fraction is multiplied by 100, so the % sign comes last. A mixed number becomes an improper fraction first. Use fresh fractions: the exercise's own are the child's to convert.
**Placement:** Explore
**Also mounted in:** M2.S2.T3

## Look
**Chrome:** dim #9AA4AC · ink #2B2B2B · rule #C9BCA6 · panel #F2E4CE · paper #FFFDF7 · accent #5B6770
**Voice:** rate 0.92, pitch 1.06 · figure: None

## Stage (tool-specific layout)
Three bands across 1600 by 900. The header runs 0 to 80 and is one line only: 'Fraction to Per Cent' in ink at the far left, a small dot set clear of the name, the phase title beside the dot on the same line, the host's navigation, and sound and restart as three round controls at the far right. The canvas runs 92 to 746, one rounded card on the paper colour. At its top left, at x 64, y 108 and 330 by 76, sits the running count: the denominator the fraction card has reached. It is never a score. The working area is 1086 by 528 at x 64, y 202. The fraction card stands at x 110, y 230, 200 by 150, its numerator deep blue over the denominator. The bar lies under it at x 110, y 420, 600 long and 70 tall, labelled Whole and 100%, cut into as many equal parts as the denominator says, with the shaded parts deep blue. The Makes 100 counter stands at x 360, y 250 and goes green when the denominator reaches one hundred. The row of Times buttons runs along y 640 from x 110, each labelled in words. When both terms grow, the words Both terms light vermilion over the card, and the bar is recut into more, smaller parts while its shaded length holds still. The Divide by HCF and Times 100 buttons stand at x 760, y 250 and x 760, y 330. The brackets of the other method are written at x 760, y 440, the times one hundred step vermilion and the % sign in ink after the closing bracket. On the fourth phase a second whole bar joins at x 110, y 520, and the Unmix button stands beside the card. The per cent reached is green. Down the right of the canvas, in the same rectangle on every phase and never animated in or out, the question sits above the answer slot at x 1186, y 250 (356 by 92) that holds what the child has given, and under it the pad at x 1170, y 368 (388 by 363). The pad is ten number keys with a fraction bar key, a space key for a mixed number and a % key. The footer runs 758 to 900: the voice caption at the far left with its speaking dot beside it, measuring its own wrap and dropping a type size rather than spilling, and the phase bar at the right with the question count under it. There is no sidebar and no score box anywhere, and nothing is ever written over the working area. Content colours are the chapter's own, and the tools of this chapter share them. The part the question gives, as shaded cells, a fraction, a decimal or an amount, is deep blue, labelled Given. The per cent, fraction or decimal the working reaches, and what is left after a part is used, is green, labelled Answer or Left. Both terms multiplied or divided by one number, and the times one hundred step before the % sign, are vermilion, labelled Both terms or Times 100. A unit fact that puts two amounts in one unit is violet, labelled Unit fact. The part used, taken away or not won is rose, labelled Used or Not won. The step, cell or number being worked on now is amber. A zero holding a place open inside a decimal is grey, labelled Place holder, and nothing else on the stage is ever grey. An unshaded cell of a whole stays warm white inside its near-black outline, the % sign is near-black ink, and anything dimmed fades to half strength rather than turning grey. Chrome never borrows one of them, and each reading survives with the colour taken away, because a part is told by its written label before it is told by its colour.

## Opening (first frame of every mount)
Every mount comes up already furnished for its phase with nothing yet tapped. On the first phase the fraction card sits over its bar with the Makes 100 counter asking its question. On the second the card shows a fraction whose denominator does not go into one hundred, with the one third card beside it. On the third the card sits with the Times 100 button lit and empty brackets under it. On the fourth the card shows a mixed number over one whole bar and part of a second. One thing moves, once: the Makes 100 counter, or the Unmix button on the fourth phase, gives one slow pulse while the voice speaks its opening line.

## Phases (what each mount shows and does; the words are in tool.tsx)

### 1 · A denominator of 100
**Screen:** the card showing 13/50 over its bar, and the Makes 100 counter asking what times fifty makes a hundred
**Does:** taps the Times button that makes the denominator 100, and types the per cent
**Win:** the card reads 26/100, the bar is recut into a hundred parts, and the per cent card reads 26%
**Feels:** the bar filling with thin new cut lines while the shading stays exactly still
**Goal:** multiply both terms by one number until the denominator is 100, and the numerator is the per cent
**Observe:** The bar was recut into smaller parts, but its shaded length never changed.
**Wrong (each is a traceback on the working area):**
- taps a Times button that takes the denominator past one hundred → the denominator past one hundred is lit amber, and the Makes 100 counter asks its question again with the child's product kept beside it
- types the starting numerator as the per cent → the bar is shown recut into hundredths beside the starting bar, the shaded hundredths are counted along it, and the denominator is lit amber
**Misconception to break:** Adding 50 to both terms to reach a denominator of 100, which gives 63/100, a different amount.

### 2 · Simplify first
**Screen:** the card showing 33/60 with the Makes 100 counter unable to reach a hundred, and a one third card beside it
**Does:** taps Divide by HCF, then the Times button that makes 100, and tries the one third card
**Win:** the card reads 11/20, then 55/100 and 55%, while the one third card climbs past a hundred and never lands on it
**Feels:** a stubborn fraction giving way the moment it is simplified
**Goal:** simplify first by the HCF when the denominator does not go into 100, and see one third never get there
**Observe:** Some denominators reached one hundred with one tap, and some needed Divide by HCF first.
**Wrong (each is a traceback on the working area):**
- divides only the numerator by the HCF → a bar for the child's fraction is drawn under the first at the same length, its shaded length plainly shorter, and the untouched denominator is lit amber
- keeps tapping Times buttons on a denominator that cannot reach one hundred → each product is written in a row under the card, the nearest ones on either side of one hundred lit amber, and the Divide by HCF button pulses once
**Misconception to break:** Dividing only the numerator by 3 and writing 11/60, which is a smaller amount.

### 3 · Times 100 in brackets
**Screen:** the card showing 21/35 and the Times 100 button lit
**Does:** taps Times 100, watches the product worked out inside the brackets, and places the % sign
**Win:** the line reads (21/35 x 100)% = 60%, with the % sign written after the closing bracket
**Feels:** the brackets closing and the % sign clicking into place after them
**Goal:** multiply the fraction by 100 inside brackets and write the % sign after them, the other method
**Observe:** The one third card climbed past one hundred and never landed on it.
**Wrong (each is a traceback on the working area):**
- places the % sign before the product is worked out → the sign tile goes back to its tray, and the product inside the brackets is lit amber until it is worked out
- types the product without the % sign → the answer slot keeps the number, and the place after the closing bracket is lit amber with the words Per cent sign under it
**Misconception to break:** Writing 60 with no % sign, which would mean sixty wholes, not a part of one whole.

### 4 · More than one whole
**Screen:** the card showing 1 9/20 over one whole bar and part of a second
**Does:** taps Unmix, then the Times button that makes 100, and types the per cent
**Win:** the card reads 145/100 and the per cent card 145%, past the 100% mark on the bars
**Feels:** the per cent running past the whole into the second bar
**Goal:** a mixed number becomes an improper fraction first. More than one whole is more than 100%
**Observe:** The % sign appeared only after the closing bracket.
**Wrong (each is a traceback on the working area):**
- turns only the fraction part into a per cent and leaves out the whole → the whole bar lights deep blue and its hundred hundredths are counted into the per cent card before the part bar is counted
- types a per cent below one hundred for a mixed number → the one hundred per cent mark at the end of the first bar is lit amber, and the child's per cent is drawn as a length along the bars, stopping short of the shading
**Misconception to break:** Turning only the fraction part into a per cent and giving 45%, which leaves out the whole.

## Delight
On the second phase the one third card keeps growing its terms, and the moment its denominator jumps past one hundred, the Makes 100 counter gives a small sideways wobble and the card settles back to one third.

**General miss line:** Look at the bottom number. What times it makes a hundred?

## Answer key
Multiply both terms by the same number until the denominator is 100, and the numerator is the per cent. This works when the denominator, in lowest terms, goes into 100. When it does not, simplify first by dividing both terms by the HCF, then check again. It never works for 1/3, because 3 does not go into 100. The other method multiplies the fraction by 100 inside brackets and writes the % sign last. Use one method or the other, not both at once. A mixed number becomes an improper fraction first. More than one whole is more than 100%.

## Student controls
- **Times buttons**: multiply both terms by two, four, five, ten, twenty, twenty-five or fifty
- **Makes 100 counter**: asks what times the denominator makes 100, and goes green at 100
- **Divide by HCF button**: divides both terms by their HCF
- **Times 100 button**: writes the fraction in brackets with times 100, and the % sign after them
- **Unmix button**: turns a mixed number into an improper fraction
- **Number pad**: types a fraction, a mixed number or a per cent

## State fields (getState, a resume contract)
phase, numerator, denominator, factor, hcf, bracket, unmixed, answer, complete

## Textbook (this topic)
**Pages:** 92, 93
**Key terms:** equivalent fraction, denominator, lowest terms, HCF, % sign, mixed number
A fraction becomes a per cent through an equivalent fraction over 100 when its denominator goes into 100, or by multiplying it by 100 and writing the % sign. Multiply both terms by the same number until the denominator is a hundred, and the numerator is the per cent. If the denominator does not go into a hundred, simplify first, or multiply the fraction by a hundred in brackets and write the % sign last. One whole is a hundred per cent. 20 x 5 = 100, so multiply both terms by 5. That gives 9/20 = 45/100. The numerator of a fraction over 100 is the per cent, so 9/20 is 45%. Simplify first. The HCF of 12 and 40 is 4, so 12/40 = 3/10. 10 goes into 100, so 3/10 = 30/100, which is 30%. This works when the denominator, in lowest terms, goes into 100. It never works for 1/3, because 3 does not go into 100. Multiply the fraction by 100, then write the % sign after the answer. For 12/15: 12/15 x 100 = 1200/15 = 80. So 12/15 is 80%. Brackets keep the steps in order: (12/15 x 100)% = 80%. Use one way or the other, not both at once. Write it as an improper fraction first: 2 1/4 = 9/4. 4 x 25 = 100, so 9/4 = 225/100, which is 225%. One whole is 100%, so any amount more than one whole is more than 100%.
