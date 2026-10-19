# M3.S4.T6.C25.2D1 · per_cent_of · Part Finder
indiannica_eng_maths5_ch6 · indiannica_eng_maths5_ch6_v2 v2 (active) · "Percentage" · segment M3.S4 "Per Cents of Amounts" · topic M3.S4.T6 "Per Cent of a Quantity" · printed p.95 to p.96

> Runtime supplies the standard chrome (bands, zones, header, runs box, slot + pad, bubble, phase bar, type scale, content colours, sounds, finished/idle/restart). `scaffold` puts each phase's concept, teach line, hint ladder, closing line and items into tool.tsx; they are not repeated here. Build the working area and the mechanics.

## What it is
**Description:** Find a per cent of a number or a measure from a benchmark, from lots of 10%, or as the per cent over 100 times the number, and lift the used part away to see what is left.
**Why:** Find a per cent of a number from a benchmark, from lots of 10% or as the per cent over 100 times the number, find a per cent of a measure in the unit asked for, and find what is left after a per cent is used.
**Look:** A whole bar labelled 100% across the working area, with the Fold and Cut into ten buttons over it. The fraction line lies under the bar, and the Unit fact card and the Use button join on the later phases.
**Context:** Grade 5, the pages on a per cent of a quantity. An adult sees multiplying by a fraction. What the pages are doing is taking a part of a whole: fifty per cent means half, ten per cent a tenth, and any per cent is that many hundredths of the quantity. A measure is written in the unit the answer asks for first, and a question about what is left needs the part used taken away.
**For the child:** Fold the bar or find 10% first. Change the measure into the answer's unit. Ask which part the question wants.
**Teaching notes:** Fold paper strips into halves, quarters and tenths before the tool opens, and name each fold as a per cent: fifty per cent means half. Find ten per cent first when a per cent is a count of tens. Change a measure into the unit the answer asks for before finding the per cent, and say the unit fact aloud. Ask which amount a question wants, the part used or the part left, before anything is worked. Use counts and measures only: the exercise's own amounts are the child's to find.
**Placement:** Explore
**Also mounted in:** M3.S4.T6

## Look
**Chrome:** dim #9AA4AC · ink #2B2B2B · rule #C9BCA6 · panel #F2E4CE · paper #FFFDF7 · accent #5B6770
**Voice:** rate 0.92, pitch 1.06 · figure: None

## Stage (tool-specific layout)
Three bands across 1600 by 900. The header runs 0 to 80 and is one line only: 'Part Finder' in ink at the far left, a small dot set clear of the name, the phase title beside the dot on the same line, the host's navigation, and sound and restart as three round controls at the far right. The canvas runs 92 to 746, one rounded card on the paper colour. At its top left, at x 64, y 108 and 330 by 76, sits the running count: the per cent of the bar that is lit. It is never a score. The working area is 1086 by 528 at x 64, y 202. The whole bar lies at x 110, y 300, 900 long and 90 tall, labelled Whole and 100% at its right end, the quantity written on it in deep blue. The Fold buttons, Half, Quarter and Tenth, the Double button and the Cut into ten button sit in a row above it at y 220, each labelled in words. Folds and cuts draw near-black lines across the bar, every part exactly one width, each labelled with its share. Parts lit by dragging turn amber and are counted in lots of ten per cent in the running count. The fraction line lies under the bar at x 110, y 430, working the per cent over one hundred times the quantity step by step; when Double lays a second whole bar of the same length under the first, the fraction line drops to y 520. The Unit fact card stands at x 110, y 560, its fact in violet. On the fourth phase the Use button stands at x 700, y 560, the used part lifts off the bar in rose, labelled Used, down to y 640, and the part that stays is green, labelled Left. Down the right of the canvas, in the same rectangle on every phase and never animated in or out, the question sits above the answer slot at x 1186, y 250 (356 by 92) that holds what the child has given, and under it the pad at x 1170, y 368 (388 by 363). The pad is ten number keys with a point key, a % key and unit keys for g, kg, mL, litres, cm, m and km. The footer runs 758 to 900: the voice caption at the far left with its speaking dot beside it, measuring its own wrap and dropping a type size rather than spilling, and the phase bar at the right with the question count under it. There is no sidebar and no score box anywhere, and nothing is ever written over the working area. Content colours are the chapter's own, and the tools of this chapter share them. The part the question gives, as shaded cells, a fraction, a decimal or an amount, is deep blue, labelled Given. The per cent, fraction or decimal the working reaches, and what is left after a part is used, is green, labelled Answer or Left. Both terms multiplied or divided by one number, and the times one hundred step before the % sign, are vermilion, labelled Both terms or Times 100. A unit fact that puts two amounts in one unit is violet, labelled Unit fact. The part used, taken away or not won is rose, labelled Used or Not won. The step, cell or number being worked on now is amber. A zero holding a place open inside a decimal is grey, labelled Place holder, and nothing else on the stage is ever grey. An unshaded cell of a whole stays warm white inside its near-black outline, the % sign is near-black ink, and anything dimmed fades to half strength rather than turning grey. Chrome never borrows one of them, and each reading survives with the colour taken away, because a part is told by its written label before it is told by its colour.

## Opening (first frame of every mount)
Every mount comes up already furnished for its phase with nothing lit. On the first phase the whole bar holds a number and the Fold buttons wait over it. On the second the bar holds a number with the Cut into ten button lit. On the third it holds a measure in one unit, and the question card asks for another unit. On the fourth it holds a measure of something to be used, with the Use button waiting. One thing moves, once: the first button the phase needs gives one slow pulse while the voice speaks its opening line.

## Phases (what each mount shows and does; the words are in tool.tsx)

### 1 · Benchmark per cents
**Screen:** the bar holding 60, and the question card asking for 25% of it
**Does:** taps Quarter, reads one of the four equal parts, and types it
**Win:** one quarter lit amber, and the answer card reads 25% of 60 is 15
**Feels:** the bar falling into equal parts, each with its share written on it
**Goal:** 50% is half, 25% is a quarter, 10% is a tenth and 200% is double
**Observe:** Half of the bar was always one of two equal parts, whatever the quantity.
**Wrong (each is a traceback on the working area):**
- folds into halves when a quarter is asked for → the half fold is kept, and a second fold line in amber cuts each half again, with the four parts numbered
- reads the number of parts instead of one part's share → one part lights amber and its share is written on it, beside the count of parts
**Misconception to break:** Halving 44 only once and giving 22, which is half, not a quarter.

### 2 · Per cent of a number
**Screen:** the bar holding 80, and the question card asking for 40% of it
**Does:** taps Cut into ten, lights four parts, and checks with the fraction line
**Win:** four parts of eight lit, and both routes read 40% of 80 is 32
**Feels:** lots of ten per cent stacking up to the per cent asked for
**Goal:** a per cent of a number is found from lots of 10%, or as the per cent over 100 times the number
**Observe:** Each part of the bar cut into ten was ten per cent of it.
**Wrong (each is a traceback on the working area):**
- stops at ten per cent → the lit part is counted as one lot, and the parts still needed are outlined in amber, one after another
- counts the lit parts, not their shares → each lit part's share is written on it, and the shares are added along the fraction line
**Misconception to break:** Finding 10% of 40 and stopping at 4, which is only one tenth of the number.

### 3 · Per cent of a measure
**Screen:** the bar holding 2 km, and the question card asking how many metres 20% of it is
**Does:** picks the Unit fact card, watches the bar relabel, then finds the per cent
**Win:** the bar reads 2000 m in violet, and the answer card reads 20% of 2 km is 400 m
**Feels:** the measure changing its unit before anything is worked
**Goal:** write the measure in the unit the answer asks for, then find the per cent
**Observe:** The Unit fact card had to be used before the fraction line would work.
**Wrong (each is a traceback on the working area):**
- finds the per cent in the old unit and writes the new unit after it → the Unit fact card pulses, the bar is relabelled in violet in the unit asked for, and the child's number is written against the new bar, far too small
- picks a unit fact that does not join the two units → the chosen fact is written in violet beside the bar with its two unit words lit amber, and the fact that joins the question's units is lit on the list
**Misconception to break:** Writing 0.9 g, which keeps the number found for kilograms but names it in grams.

### 4 · What is left
**Screen:** the bar holding 800 g of flour, and the question card asking how much is left after 30% is used
**Does:** lights the part used, taps Use, and reads the green part that stays
**Win:** 240 g lifted off in rose, and 560 g left in green, labelled Left
**Feels:** the used part lifting off and the part left glowing green
**Goal:** what is left is the whole take away the part used, and the question says which one it asks for
**Observe:** The rose part and the green part always filled the whole bar together.
**Wrong (each is a traceback on the working area):**
- gives the part used when the question asks what is left → the rose part labelled Used and the green part labelled Left are both written with their amounts, and the question's last words are lit amber
- takes the per cent away from the quantity as if it were an amount → the per cent is written over one hundred on the fraction line, and its share of the bar is lit before anything is taken away
**Misconception to break:** Giving 600 mL, the part poured out, when the question asks what is left.

## Delight
On the fourth phase, when Use is tapped, the rose part lifts gently off the bar and floats down, and the green part left behind glows once with its label Left.

**General miss line:** Fold the bar again, or find ten per cent first.

## Answer key
A per cent of a number is that many hundredths of it. 50% is half, 25% is a quarter, 10% is a tenth and 200% is double. A per cent that is a count of tens is found from 10% first: 30% is three lots of 10%. Any per cent can also be found as the fraction over 100 times the number. A measure is written in the unit the answer asks for first, and the unit fact is said: 1 kg = 1000 g, 1 litre = 1000 mL, 1 m = 100 cm, 1 km = 1000 m. What is left is the whole take away the part used, or the per cent left of the whole. Say which amount the question asks for.

## Student controls
- **Fold buttons**: fold the whole bar into halves, quarters or tenths, or lay a second whole for double
- **Cut into ten button**: splits the bar into ten equal parts, each 10% of the whole
- **Drag to light**: lights parts amber and counts them in lots of 10%
- **Unit fact card**: rewrites a measure in the unit the answer asks for, and shows the fact
- **Use button**: lifts the chosen part off in rose and leaves the rest in green
- **Number pad**: types a quantity, a per cent or an answer

## State fields (getState, a resume contract)
phase, quantity, unit, per_cent, folds, lit, used, left, answer, complete

## Textbook (this topic)
**Pages:** 95, 96
**Key terms:** per cent of a number, half, quarter, tenth, unit, left
A per cent of a number or a measure is found from a benchmark or from the fraction over 100, in the unit asked for, and what is left follows by taking the part away. Fifty per cent is half, twenty-five per cent is a quarter, ten per cent is a tenth and two hundred per cent is double. For other per cents, find that many hundredths of the amount, or find ten per cent first and take lots of it. Write a measure in the unit the answer asks for, and say whether the question wants the part used or the part left. 50% is 50/100, which is 1/2. So 50% of a number is half of it, and 50% of 48 is 24. In the same way, 25% is a quarter, 10% is a tenth, and 200% is double. 30% of 60 is 30/100 of 60. Multiply: 30/100 x 60 = 1800/100 = 18. Or find 10% first: 10% of 60 is 6, so 30% of 60 is 3 x 6 = 18. First write the measure in the unit asked for. 1 m = 100 cm, so 3 m = 300 cm. 45/100 x 300 = 135, so 45% of 300 cm is 135 cm. That is 1.35 m. First find the part used: 30/100 x 40 = 12, so 12 L is used. Then take it away: 40 - 12 = 28, so 28 L is left. Or say 70% is left, and 70% of 40 litres is 28 litres.
