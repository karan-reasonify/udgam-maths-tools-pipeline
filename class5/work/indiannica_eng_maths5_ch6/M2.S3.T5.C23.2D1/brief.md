# M2.S3.T5.C23.2D1 · per_cent_back · Per Cent Unpacker
indiannica_eng_maths5_ch6 · indiannica_eng_maths5_ch6_v2 v2 (active) · "Percentage" · segment M2.S3 "Out of Per Cents" · topic M2.S3.T5 "Per Cents as Fractions and Decimals" · printed p.94

> Runtime supplies the standard chrome (bands, zones, header, runs box, slot + pad, bubble, phase bar, type scale, content colours, sounds, finished/idle/restart). `scaffold` puts each phase's concept, teach line, hint ladder, closing line and items into tool.tsx; they are not repeated here. Build the working area and the mechanics.

## What it is
**Description:** Write a per cent over 100 and simplify it, or read it as hundredths, or as thousandths when it has a point, to give a decimal.
**Why:** Write a per cent as a fraction in lowest terms, including per cents above one whole and below one per cent, and as a decimal through hundredths, or thousandths when it has a point.
**Look:** A per cent card, its fraction over 100 and a bar under it at the left, and a hundred grid over a place value chart of ones, tenths, hundredths and thousandths at the right.
**Context:** Grade 5, the page on per cents as fractions and decimals. An adult sees division by a hundred. What the page is doing is running the per cent backwards: a per cent is a number of hundredths, so it is written over 100 and simplified, or written as hundredths in decimal form. A per cent with a point becomes thousandths, and nothing here goes to a fourth place.
**For the child:** Write the per cent over 100 and simplify. Or read it as hundredths to write the decimal.
**Teaching notes:** Write a few per cents over a hundred by hand before the tool opens, and simplify them by the HCF. Say per cent means out of a hundred each time. A per cent above one hundred is more than one whole. Read a whole-number per cent as hundredths to write its decimal, and a per cent with one place after its point as thousandths. Keep to three places after the point: in a matching list, a pair that would need a fourth place is found as the pair left over. Use fresh per cents: the exercise's own are the child's to convert.
**Placement:** Explore
**Also mounted in:** M2.S3.T5

## Look
**Chrome:** dim #9AA4AC · ink #2B2B2B · rule #C9BCA6 · panel #F2E4CE · paper #FFFDF7 · accent #5B6770
**Voice:** rate 0.92, pitch 1.06 · figure: None

## Stage (tool-specific layout)
Three bands across 1600 by 900. The header runs 0 to 80 and is one line only: 'Per Cent Unpacker' in ink at the far left, a small dot set clear of the name, the phase title beside the dot on the same line, the host's navigation, and sound and restart as three round controls at the far right. The canvas runs 92 to 746, one rounded card on the paper colour. At its top left, at x 64, y 108 and 330 by 76, sits the running count: the number of hundredths the per cent names. It is never a score. The working area is 1086 by 528 at x 64, y 202. The per cent card stands at x 110, y 230, 200 by 90, deep blue, and the fraction over one hundred is written beside it at x 340, y 230. The bar under both lies at x 110, y 340, 600 long and 50 tall, keeping its shaded length whatever the terms become. When Divide by HCF is tapped the words Both terms light vermilion, and the fraction reached in lowest terms is green. The hundred grid, 300 by 300, stands at x 800, y 210, and on the second phase a second grid of the same size joins at x 450, y 420, under the bar. The place value chart stands under the first grid at x 800, y 530, 300 by 180, with four columns headed Ones, Tenths, Hundredths and Thousandths; an empty place holds a grey 0, and the decimal read off it is green. The Over 100, Divide by HCF, Hundredths and Split hundredths buttons stand in a column at x 110, y 420, each labelled in words. On the fourth phase each hundredth of the grid is cut into ten thin slices, each one thousandth. Down the right of the canvas, in the same rectangle on every phase and never animated in or out, the question sits above the answer slot at x 1186, y 250 (356 by 92) that holds what the child has given, and under it the pad at x 1170, y 368 (388 by 363). The pad is ten number keys with a point key, a fraction bar key and a % key. The footer runs 758 to 900: the voice caption at the far left with its speaking dot beside it, measuring its own wrap and dropping a type size rather than spilling, and the phase bar at the right with the question count under it. There is no sidebar and no score box anywhere, and nothing is ever written over the working area. Content colours are the chapter's own, and the tools of this chapter share them. The part the question gives, as shaded cells, a fraction, a decimal or an amount, is deep blue, labelled Given. The per cent, fraction or decimal the working reaches, and what is left after a part is used, is green, labelled Answer or Left. Both terms multiplied or divided by one number, and the times one hundred step before the % sign, are vermilion, labelled Both terms or Times 100. A unit fact that puts two amounts in one unit is violet, labelled Unit fact. The part used, taken away or not won is rose, labelled Used or Not won. The step, cell or number being worked on now is amber. A zero holding a place open inside a decimal is grey, labelled Place holder, and nothing else on the stage is ever grey. An unshaded cell of a whole stays warm white inside its near-black outline, the % sign is near-black ink, and anything dimmed fades to half strength rather than turning grey. Chrome never borrows one of them, and each reading survives with the colour taken away, because a part is told by its written label before it is told by its colour.

## Opening (first frame of every mount)
Every mount comes up already furnished for its phase with nothing yet written. On the first phase the per cent card sits at the top left with the Over 100 button lit. On the second two cards wait, one above one hundred per cent over two grids and one below one per cent. On the third the per cent card sits over one grid and the chart is empty. On the fourth the card shows a per cent with a point, with some cells and part of one more shaded. One thing moves, once: the Over 100 button, or the Split hundredths button on the fourth phase, gives one slow pulse while the voice speaks its opening line.

## Phases (what each mount shows and does; the words are in tool.tsx)

### 1 · Back to a fraction
**Screen:** the card showing 32% and the Over 100 button lit
**Does:** taps Over 100, then Divide by HCF, and types the fraction in lowest terms
**Win:** 32/100 shrinks to 8/25 in green, and the bar's shaded length has not moved
**Feels:** both terms shrinking together while the shaded bar stays exactly still
**Goal:** a per cent is written over 100 and simplified by the HCF to lowest terms
**Observe:** The bar's shaded length stayed still while both terms shrank.
**Wrong (each is a traceback on the working area):**
- stops at a simpler fraction that is not yet in lowest terms → Divide by HCF runs again from the child's fraction, the factor both terms still share lit amber, while the bar's shaded length holds still
- writes the per cent with no denominator, as a whole number → the Over 100 button writes one hundred under the child's number, and the grid beside it shades the same count of cells
**Misconception to break:** Stopping at 18/50, which is simpler but not yet in lowest terms.

### 2 · Very large and very small per cents
**Screen:** the card showing 180% over two grids, and a second card showing 1/2%
**Does:** simplifies the first to an improper fraction, then writes the second as a part of one hundredth
**Win:** the first reads 9/5 in green past the whole, and the second 1/200, half of one cell
**Feels:** a tiny half cell sitting alone in a whole grid
**Goal:** a per cent above 100 gives an improper fraction, and a fraction of one per cent is that fraction of one hundredth
**Observe:** A per cent above one hundred filled one grid and ran on into the next.
**Wrong (each is a traceback on the working area):**
- writes a per cent above one hundred over one → the two grids light, the first full and the second part filled, labelled Whole and Part, and one hundred is written under the child's number in amber
- reads half of one per cent as half of the whole → one cell of the grid is lit and cut in half, and the half is shaded beside the whole grid, so the tiny part is seen at its true size
**Misconception to break:** Writing 240/1, which forgets that per cent means out of a hundred.

### 3 · Per cents as decimals
**Screen:** the card showing 73% over one grid, and the chart empty
**Does:** taps Hundredths, reads the chart, and types the decimal
**Win:** the chart reads 0.73 in green, with seven in the tenths and three in the hundredths
**Feels:** the chart filling column by column from the grid
**Goal:** a whole-number per cent is a number of hundredths, written in decimal form
**Observe:** The chart's digits after the point matched the shaded columns and cells.
**Wrong (each is a traceback on the working area):**
- writes the per cent's digits as tenths, one place too far to the left → a row of grids beside the first fills to what the child's decimal names, well past one whole, while the per cent's own shading fills less than one grid
- leaves out the zero in the tenths place for a per cent under ten → the chart's Tenths column shows a grey 0 labelled Place holder, ringed in amber, with the grid's full columns counted as none
**Misconception to break:** Writing 8.3, which counts 83 tenths instead of 83 hundredths.

### 4 · Per cents with a point
**Screen:** the card showing 2.4% with two cells and part of a third shaded
**Does:** taps Split hundredths, counts the thin slices, and types the decimal
**Win:** twenty-four slices counted, and the chart reads 0.024, with a grey 0 in the tenths place
**Feels:** a hundredth splitting into ten thin slices
**Goal:** a per cent with one place after its point is read as thousandths, three places after the point
**Observe:** Splitting the hundredths put a digit in the Thousandths column for the first time.
**Wrong (each is a traceback on the working area):**
- writes the per cent's digits as hundredths, ten times too much → Split hundredths cuts each hundredth into ten slices, and the slices are counted into the Thousandths column one by one in amber
- writes one more digit than the chart has columns for → the chart keeps its four columns, the extra digit is held outside it lit amber, and the slices are counted again
**Misconception to break:** Writing 0.65, which is 65 hundredths, ten times too much.

## Delight
On the fourth phase, each hundredth splits into ten thin slices with a soft ripple along the row, and the Thousandths column of the chart lights up for the first time.

**General miss line:** Write it over a hundred again, then look for the HCF.

## Answer key
A per cent is a number of hundredths. Write it over 100, then divide both terms by the HCF to reach lowest terms. A per cent above 100 is more than one whole, and its fraction is improper. A fraction of one per cent is that fraction of one hundredth: 1/2% is 1/2 x 1/100. A whole-number per cent is written as that many hundredths in decimal form. A per cent with one place after its point is read as thousandths, with three places after the point, and nothing here needs a fourth place. In a matching list, a pair that would need a fourth place after the point is found as the pair left over.

## Student controls
- **Over 100 button**: writes the per cent as a fraction over 100
- **Divide by HCF button**: divides both terms by their HCF
- **Hundredths button**: pours the per cent into the place value chart as hundredths
- **Split hundredths button**: cuts each hundredth into ten slices, each one thousandth
- **Number pad**: types a per cent, a fraction or a decimal

## State fields (getState, a resume contract)
phase, per_cent, numerator, denominator, hcf, chart, split, answer, complete

## Textbook (this topic)
**Pages:** 94
**Key terms:** lowest terms, HCF, improper fraction, decimal, hundredths, thousandths
A per cent goes back to a fraction by writing it over 100 and simplifying, and to a decimal by reading it as hundredths, or as thousandths when it has a point. Write the per cent over a hundred and divide both terms by their HCF to get a fraction in lowest terms. For a decimal, read the per cent as hundredths, or as thousandths when it has a point. A per cent above a hundred is more than one whole. 45% means 45 out of 100, so 45% = 45/100. The HCF of 45 and 100 is 5. So 45/100 = 9/20 in lowest terms. 160% = 160/100 = 8/5, which is 1 3/5, more than one whole. A per cent can also be a fraction: 1/2% means 1/2 out of 100. So 1/2% = 1/2 x 1/100 = 1/200, which is half of one hundredth. 37% = 37/100, which is 37 hundredths. 37 hundredths is written 0.37. In the same way, 140% = 140/100 = 1.4. 4.5% means 4.5 hundredths. Each hundredth is 10 thousandths, so 4.5 hundredths is 45 thousandths. So 4.5% = 45/1000 = 0.045, with three places after the point.
