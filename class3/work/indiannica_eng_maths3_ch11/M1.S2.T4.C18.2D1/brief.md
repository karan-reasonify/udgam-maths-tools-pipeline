# M1.S2.T4.C18.2D1 · rupees_and_paise_converter · Rupees and Paise Converter
indiannica_eng_maths3_ch11 · indiannica_eng_maths3_ch11_v1 v1 (active) · "Money" · segment M1.S2 "Changing and Working With Money" · topic M1.S2.T4 "Changing Rupees and Paise" · printed p.131 to p.132

> Runtime supplies the standard chrome (bands, zones, header, runs box, slot + pad, bubble, phase bar, type scale, content colours, sounds, finished/idle/restart). `scaffold` puts each phase's concept, teach line, hint ladder, closing line and items into tool.tsx; they are not repeated here. Build the working area and the mechanics.

## What it is
**Description:** Break a rupee into a hundred paise, gather a hundred paise into a rupee, and say which of two amounts is more.
**Why:** Change rupees and paise into paise by opening each rupee into a hundred paise, change paise into rupees and paise with the dot two digits from the right, and choose the larger of two amounts after writing both in one unit.
**Look:** A Rupees tray in deep blue and a Paise tray in vermilion, a paise meter below them, a price tag on a small shelf at the right, the Break, Gather, Same unit and Plain figures buttons, and the number pad down the right of the canvas.
**Context:** Grade 3, the changing topic of the money chapter. An adult sees a number multiplied or divided by a hundred, which a worksheet drills well. What is being settled is why: a rupee is a hundred paise, so each rupee is swapped for a hundred, and the dot on a price tag marks where the hundreds stop. A child who drops the zero from a small amount of paise, who puts the dot one digit from the right, or who sets a number of rupees beside a number of paise and picks the bigger number, has not yet seen the dot as a boundary, the paise as two digits and the unit as part of the amount.
**For the child:** Open a rupee into a hundred paise. Gather a hundred paise into a rupee. Put the dot two digits from the right. Change both amounts to one unit before you choose.
**Teaching notes:** Give each pair a paper rupee strip cut into a hundred paise squares before the tool opens, and ask them to make a few amounts with strips and loose squares and count them as paise. Always ask which unit an amount is in before a number is read. Wait for a child to say that one rupee is a hundred paise, rather than saying it for them. Say the dot out loud as the place where the rupees stop and the paise begin, and say 5 paise as zero five whenever it is written. If a child puts the dot one digit from the right, ask how many digits the paise take. Use fresh amounts: the printed amounts are the child's to change.
**Placement:** Explore
**Also mounted in:** M1.S2.T4

## Look
**Chrome:** dim #9AA4AC · ink #2B2B2B · rule #C9BCA6 · panel #F2E4CE · paper #FFFDF7 · accent #5B6770
**Voice:** rate 0.92, pitch 1.06 · figure: None

## Stage (tool-specific layout)
Three bands across 1600 by 900. The header runs 0 to 80 and is one line only: 'Rupees and Paise Converter' in ink at the far left, a small dot set clear of the name, the phase title beside the dot on the same line, the host's navigation, and sound and restart as three round controls at the far right. The canvas runs 92 to 746, one rounded card on the paper colour. At its top left, at x 64, y 108 and 330 by 76, sits the running count: how many amounts have been changed. It is never a score. The working area is 1086 by 528 at x 64, y 202. A plain shop shelf fills the working area. The Rupees tray stands at x 84, y 214, 300 by 330, headed Rupees in deep blue, and holds up to nine flat rupee tiles marked Rs 1 in a grid of three across. The Paise tray stands at x 596, y 214, 300 by 330, headed Paise in vermilion, and holds the paise bars that an opened tile makes, ten flat bars of ten small squares marked 10 paise, and up to nine loose paise squares. Between the trays the Break a rupee button stands at x 400, y 330, 180 by 64, and the Gather a hundred button at x 400, y 410, 180 by 64, each labelled in words. The paise meter runs along the foot at x 84, y 560, 812 by 70, marked in hundreds and climbing by a hundred for each tile opened, in vermilion, and its full count in green. The price tags hang on the shelf at the right, the first at x 920, y 230, 220 by 120 and the second at x 920, y 380, 220 by 120, each an amber price tag with its rupees in deep blue, its dot in near-black and its paise in vermilion. Tapping a tag changes it: a tag in rupees and paise drops its Rs and its dot, and a tag in paise takes its dot back two digits from the right with a 0 filled in where the paise are few. The Same unit switch stands at x 84, y 650, 190 by 60 and the Plain figures button at x 290, y 650, 190 by 60. With the switch on, the trays slide away and the two tags become two bars of one scale, one above the other from the same start line, at x 84 and y 250 and y 400, each ending in its amount, and the longer bar is ringed green. In the Plain figures view the same working is drawn as bare numbers with no trays. Down the right of the canvas, in the same rectangle on every phase and never animated in or out, the question sits above the answer slot at x 1186, y 250 (356 by 92) that holds what the child has given, and under it the pad at x 1170, y 368 (388 by 363). The pad is ten number keys and a clear key, for typing the paise or the rupees of an amount into the answer slot, and a dot key that places the dot in an answer in rupees. The footer runs 758 to 900: the voice caption at the far left with its speaking dot beside it, measuring its own wrap and dropping a type size rather than spilling, and the phase bar at the right with the question count under it. There is no sidebar and no score box anywhere, and nothing is ever written over the working area. Real objects keep their own natural colours. The whole rupees of an amount are deep blue and the paise are vermilion everywhere, in a column heading, a tag and a label. The value written on one note or coin, and the price of one thing, is amber. How many notes, coins or things there are is sky blue. A total, a change, a converted amount and the answer are green. A note is a plain flat rectangle in its own colour and a coin a plain round disc, each with its value in large near-black type, so a value is read from the number and never from the colour. Anything dimmed fades to half strength rather than turning grey, and chrome never borrows one of the five. Each reading survives with the colour taken away, because an amount is told by its written label before it is told by its colour.

## Opening (first frame of every mount)
Every mount comes up already furnished for its phase with nothing yet typed. On the first phase the Rupees tray holds a few whole rupee tiles, the Paise tray is empty and the paise meter stands at nothing. On the second a price tag in rupees and paise hangs on the shelf, with a few rupee tiles and a few loose paise squares in the trays. On the third a tag in paise hangs on the shelf with the meter full and the Paise tray holding bars and loose paise. On the fourth two tags hang on the shelf, one in rupees and one in paise, with the Same unit switch off and the trays slid to the side. One thing moves, once: the first tile gives one slow pulse while the voice speaks its opening line, and a finger on it is the whole way in.

## Phases (what each mount shows and does; the words are in tool.tsx)

### 1 · Rupees into paise: multiply by a hundred
**Screen:** the Rupees tray with whole rupee tiles, an empty Paise tray and the paise meter at nothing
**Does:** taps the rupee tiles open one at a time, watches the meter climb by a hundred, and types the paise
**Win:** the meter stops, a green tag joins the rupees to the paise, and the answer slot fills
**Feels:** each rupee tile opening into a hundred paise and the meter climbing by a hundred
**Goal:** one rupee is a hundred paise, so any number of rupees is that many hundreds of paise
**Observe:** Each rupee tile that opened made the paise meter climb by one hundred, and the meter stopped at a number of hundreds equal to the number of rupees.
**Wrong (each is a traceback on the working area):**
- says the number of rupees as the number of paise → the tile opens into ten bars of ten paise, the meter climbs by a hundred, and the tag reads the paise as the meter's count
- counts the ten bars as ten paise in all → each bar is lit and labelled ten paise as it is counted, so ten bars add up by tens to a hundred, and the meter agrees
**Misconception to break:** Writing 7 paise, because the number of rupees is copied as the number of paise.

### 2 · Rupees and paise into paise: the shortcut
**Screen:** a price tag in rupees and paise on the shelf, the Rupees tray with a few tiles and a few loose paise
**Does:** opens the rupees, adds the loose paise to the meter, then taps the tag to let Rs and the dot fall away
**Win:** the tag becomes a tag in paise and its figures match the meter exactly
**Feels:** the loose paise squares joining the hundreds on the meter, and the Rs and the dot falling away
**Goal:** break the rupees into paise first, add the loose paise, and see that the shortcut drops Rs and the dot
**Observe:** A tag in rupees and paise lost its Rs and its dot and the figures that were left were exactly the meter's count.
**Wrong (each is a traceback on the working area):**
- adds the rupees to the paise without changing the rupees first → the rupees are opened into hundreds first and the meter shows them, and only then do the loose paise squares join the count
- drops the zero from a small paise part and writes too few digits → the tag shows the paise as two boxes, and a 0 stays in the first box when the paise are fewer than ten, so the paise number keeps its two digits
**Misconception to break:** Adding the rupees to the paise without changing the rupees first, and saying 24 paise.

### 3 · Paise into rupees: two digits after the dot
**Screen:** a tag in paise on the shelf, a full meter and the Paise tray holding bars and loose paise
**Does:** gathers ten bars at a time into rupee tiles, reads what is left, then taps the tag to place the dot
**Win:** the dot drops into place, two digits from the right, and the tag reads in rupees and paise
**Feels:** ten bars closing into a rupee tile, and the dot dropping into its place two digits from the right
**Goal:** gather every hundred paise into a rupee, keep the rest as loose paise, and put the dot two digits from the right
**Observe:** When ten bars were gathered into a rupee tile, the dot on the tag landed two digits from the right, and a small number of paise took a zero before the dot.
**Wrong (each is a traceback on the working area):**
- puts the dot one digit from the right → the tag marks the last two digits in vermilion as the paise, so the dot has to sit in front of both of them
- writes a small amount of paise with no zero before the dot → the rupees box stays on the tag with a 0 in it, so the amount reads zero rupees and so many paise, and the paise keep their two digits
**Misconception to break:** Putting the dot one digit from the right instead of two, so the paise look like a tenth.

### 4 · Which amount is more?
**Screen:** two tags on the shelf, one in rupees and one in paise, and the Same unit switch off
**Does:** switches to one unit, watches both tags become bars of one scale, and picks the longer bar
**Win:** the two bars line up from the same start and the longer one is ringed green
**Feels:** two tags becoming two bars of one scale, and the longer bar being plain at once
**Goal:** two amounts in different units are changed to one unit before the larger is chosen
**Observe:** A tag in rupees and a tag in paise could not be told apart by their numbers, but as two bars of one scale the longer bar was plain.
**Wrong (each is a traceback on the working area):**
- picks the larger number although one amount is in rupees and one is in paise → the Same unit switch turns both tags into bars of one scale, and the shorter bar is the one with the smaller amount, whatever its number
- changes one amount but not the other before comparing → the switch stays off until both tags are in the same unit, and a note says which tag is still in a different unit
**Misconception to break:** Saying 410 paise is more, because 410 is a bigger number than 4.20.

## Delight
On the first phase, each rupee tile that opens makes the paise meter tick up by exactly a hundred, and when the last tile has opened the meter glows green. On the third phase, when the last hundred paise gather into a rupee, the dot drops into its place on the tag with a small bounce and the two paise digits turn vermilion.

**General miss line:** Look again at the two trays. Which part is the rupees, and which part is the paise?

## Answer key
Rs 1 is 100 paise. To change rupees into paise, multiply the rupees by 100, and add any loose paise. The shortcut takes away Rs and the dot. To change paise into rupees, gather every 100 paise into a rupee, count two digits from the right and put the dot there, and write Rs in front. When there are fewer than 100 paise, a 0 stands before the dot. To say which of two amounts is more, change both to the same unit first, then compare.

## Student controls
- **Rupee tile**: opens into ten bars of ten paise, which is a hundred paise, when tapped
- **Break a rupee button**: opens the next whole rupee tile in the Rupees tray
- **Gather a hundred button**: closes ten bars of paise into one rupee tile
- **Paise meter**: climbs by a hundred for each rupee opened and falls by a hundred for each gathered
- **Price tag**: turns from rupees and paise into paise, or from paise into rupees, when tapped
- **Same unit switch**: lays two tags along one scale in paise or in rupees
- **Plain figures button**: redraws the working as bare numbers
- **Number pad**: types the digits of an amount

## State fields (getState, a resume contract)
phase, rupeeTiles, paiseBars, loosePaise, paiseMeter, unit, answer, complete

## Textbook (this topic)
**Pages:** 131, 132
**Key terms:** rupee, paise, convert, dot, unit
A rupee is 100 paise, so rupees change into paise by multiplying by 100 and paise change into rupees by putting a dot two digits from the right. Rs 1 is 100 paise, so rupees change into paise by multiplying by 100. A tag in rupees and paise changes into paise when Rs and the dot are taken away. Paise change into rupees by putting the dot two digits from the right. Two amounts are compared after both are changed to the same unit. Rs 1 is 100 paise. Four rupees are four hundreds, so Rs 4 is 400 paise. To change rupees into paise, multiply the rupees by 100. Break the rupees into paise, then add the loose paise. 6 times 100 paise is 600 paise. 600 paise plus 35 paise is 635 paise. The shortcut takes away Rs and the dot. Rs 6.35 is 635 paise. Gather every 100 paise into a rupee. Count two digits from the right and put the dot there. Write Rs in front. 720 paise is Rs 7.20. Under 100 paise, write a 0 before the dot. 45 paise is Rs 0.45. 5 paise is Rs 0.05. Change both amounts to paise, or both to rupees. Rs 8 is 800 paise, and 800 is more than 650. Rs 8 is more than 650 paise. Compare only amounts in the same unit.
