# M2.S4.T8.C28.2D1 · roman_workshop · Roman Numeral Workshop
indiannica_eng_maths4_ch1 · indiannica_eng_maths4_ch1_v1 v1 (active) · "Large Numbers" · segment M2.S4 "Other Ways to Write It, and When Near Enough Will Do" · topic M2.S4.T8 "Letters That Stand for Numbers" · printed p.13 to p.15

> Runtime supplies the standard chrome (bands, zones, header, runs box, slot + pad, bubble, phase bar, type scale, content colours, sounds, finished/idle/restart). `scaffold` puts each phase's concept, teach line, hint ladder, closing line and items into tool.tsx; they are not repeated here. Build the working area and the mechanics.

## What it is
**Description:** Build numerals from lettered tiles, and find out which combinations the rules simply refuse.
**Why:** Write numbers the way a clock face does, using seven letters and three rules.
**Look:** A tray of lettered tiles with their values underneath, and a rail above where the numeral is built.
**Context:** Grade 4, the closing topic. An adult sees a conversion table. What the page is actually doing is teaching a system whose rules exclude far more than they allow, so the useful knowledge is which combinations are not numerals at all.
**For the child:** Drag lettered tiles into the rail to build a numeral and watch the total change. Try four of the same letter, and try a small letter on the left of a big one. Read what the rule card says each time something is refused.
**Teaching notes:** Copy the seven letters and their values onto a card by hand before opening the tool, and leave it out. Nothing in this topic is worked out from anything else; it is looked up, and pretending otherwise wastes the lesson. Teach the three rules as one question about position: is the smaller letter to the left or to the right? Then spend the real time on what is not allowed, because four in a row and a doubled V and an illegal subtractive pair are where the marks go. Send them hunting for real numerals on clock faces, chapter headings and foundation stones. This is the closing topic, so finish on the last page of the chapter, where the whole of it is asked at once.
**Placement:** Apply
**Also mounted in:** M2.S4.T8

## Look
**Chrome:** dim #9AA4AC · ink #2B2B2B · rule #C9BCA6 · panel #F2E4CE · paper #FFFDF7 · accent #5B6770
**Voice:** rate 0.92, pitch 1.06 · figure: None

## Stage (tool-specific layout)
Three bands across 1600 by 900. The header runs 0 to 80 and is one line only: 'Roman Numeral Workshop' in ink at the far left, a small dot set clear of the name by measuring it, the phase title beside the dot on the same line, the host's navigation, and again, sound and restart as three round controls at the far right. The canvas runs 92 to 746, one rounded card on the paper colour. At its top left, at 64,108 and 330 by 76, sits the running count: what the rail is worth so far, in ink, rewritten every time a tile lands or leaves, with the number of tiles on the rail counted beside it; it is the one place the total is written, and it never reads as a score. On the third and fourth phases a second line under it counts the refusals and names the rule of the last one. The working area is 1086 by 528 at 64,202. The build rail is 860 by 150 at 64,232, a ruled rail on the paper colour with a stop drawn at its left hand end; a tile that lands takes its place on the rail at 84 by 108 at a pitch of 92, so nine tiles fit along it and the longest numeral this chapter asks for fits exactly. The ledger is 226 by 150 at 924,232: one line per tile in the order they landed, the letter and the amount it brings, with a bar drawn at the left of each line, and a line that takes away carries its bar drawn back to front, so adding and subtracting are told apart by shape before any colour; a subtractive pair on the rail is ringed amber, because that pair is what settles the reading. The refusal strip is 860 by 64 at 64,398 and stands empty until a tile is refused, when it prints the rule that refused it in words with the refused tile drawn hollow at its left edge; the place on the rail that tile wanted is left as a hollow outline, so what was refused and where it wanted to go are both still on the stage. The reference card is 226 by 330 at 924,398, seven ruled rows, letter at the left and value at the right, in order of value, and it never closes; its back carries the six subtractive pairs and turns over on the fourth phase. The direction switch is 220 by 64 at 64,488, number into numeral at one end and numeral into number at the other, and the target card is 620 by 64 at 304,488, holding whichever of the two the phase has asked for. The tray is 860 by 150 at 64,580 with seven tiles 108 by 108 at a pitch of 120 from x 74, each letter in ink at 72 tall with its value under it; a tile drawn out of the tray leaves its outline behind and the outline refills at once, because the tray never runs out and no letter is ever used up. Down the right of the canvas, in the same rectangle on every phase and never animated in or out, the question sits above the slot at 1186,250 (356 by 92) that holds what the child has given, and under it the pad at 1170,368 (388 by 363). The pad is twelve number keys three across where a numeral has to be read back as a number, on the first, second and third phases; where a number has to be built the numeral is built on the rail itself and the pad carries the seven letter keys instead, in order of value, which drop that tile onto the right hand end of the rail. On the fourth phase the letter keys stay and a strip of the six allowed pairs sits under them, so a pair can be dropped as one press. The footer runs 758 to 900: the voice caption at the far left with its speaking dot beside it, measuring its own wrap and dropping a type size rather than spilling, and the phase bar at the right with the question count under it. There is no sidebar and no score box anywhere, and nothing is ever written over the working area. Content colours are the chapter's own: the ones period is deep blue, the thousands period green, the lakhs period vermilion and the millions period rose; whatever settles the answer on this stage is amber; a zero that is only holding a place open is grey; and chrome never borrows one of them, so the stage still reads with the colour taken away.

## Opening (first frame of every mount)
Every mount comes up already furnished for its phase with nothing in front of it. The tray of seven lettered tiles stands along the foot of the working area with each letter's value printed under it, the build rail waits above with its left hand stop drawn, the ledger beside the rail is ruled and empty, and the reference card of the seven letters is open down the right of the working area on every phase, because nothing here is worked out and it is all looked up. On the first phase the rail is empty; on the second one bigger tile already sits at the left of it with clear rail to its right; on the third three of one letter sit on it side by side; on the fourth one bigger tile sits with clear rail to its left. The running count at the top left reads nothing yet, and the slot and the pad stand empty down the right. One thing moves, once: the tile in the tray that this phase is about gives one small lift while the voice asks for a tile to be lifted and read. That lift is the only invitation, and a finger on it is the whole way in.

## Phases (what each mount shows and does; the words are in tool.tsx)

### 1 · Seven letters do all the work
**Screen:** the tray of seven tiles with the reference card open beside it
**Does:** matches each letter to its value and drops single tiles into the rail
**Win:** every tile has been matched to its value at least once
**Feels:** there is nothing here to work out, only something to know
**Goal:** every Roman numeral is built from seven letters and no others
**Observe:** Every numeral built on the rail came out of the same seven tiles.
**Wrong (each is a traceback on the working area):**
- hunts the tray for a letter worth twenty and finds nothing to pick up. → the seven tiles lift a little together and set themselves down in order of value, and the steps between the values light one after another, one, then five, then ten, then fifty, so the gaps are shown to be part of the system. The rail keeps whatever is already on it.
- works out what a letter is worth from the letter before it rather than reading it off the card. → the reference card draws itself open row by row down the right of the working area, letter and value, and the row for the letter in hand lights and stays lit while the tile is held. Nothing on the rail is touched and nothing is marked.
**Misconception to break:** Inventing a single letter for a value that has none, such as one for twenty.

### 2 · A smaller letter on the right is added
**Screen:** the rail holding a bigger tile with space to its right
**Does:** drops smaller tiles to the right and watches the total climb
**Win:** the numeral reads correctly and the running total matches
**Feels:** the order the tiles sit in turns out to be the whole of the reading
**Goal:** a smaller letter to the right of a bigger one is added
**Observe:** The total climbed when the smaller tile sat to the right and dropped when it sat to the left.
**Wrong (each is a traceback on the working area):**
- takes the smaller letter away wherever it is standing, because it is the smaller one. → the pair on the rail is ringed amber and the ring is drawn round the smaller tile's place rather than round the tile itself, so it is the side it stands on that lights; the ledger line for that tile is rewritten with its bar the right way round and the total climbs to what it should be. The child's answer stays in the slot.
- builds the numeral with the small letters first, writing it up from its smallest part. → the tiles slide along the rail into order of value, the biggest at the left, without one of them leaving the rail; the ledger rewrites itself in the new order with the same total standing at its foot, and the rule prints under the rail that a numeral is written from the biggest letter down.
**Misconception to break:** Subtracting the V because it is smaller, whichever side of the X it sits.

### 3 · A letter may be repeated three times at most
**Screen:** the rail holding three of one letter with the tray still open
**Does:** tries to add a fourth of the same letter and reads the refusal
**Win:** the fourth tile is refused and the rule is named on screen
**Feels:** the arithmetic works perfectly and the numeral is still not allowed
**Goal:** repetition means addition, and three is the limit
**Observe:** The rail refused far more tiles than it took.
**Wrong (each is a traceback on the working area):**
- drops a fourth tile of the same letter onto the rail. → the tile stops a tile's height above the place it wanted and hangs there while the refusal strip prints the rule, that a letter may be repeated three times at most; the three tiles already down are left exactly as they are, and the fourth lifts back to the tray leaving its outline hollow in the gap.
- drops a second of one of the three letters that are never repeated. → the refusal strip prints the second rule, that this letter is never repeated at all, and the reference card draws a small bar under each of the three letters it covers; the rail keeps the first tile and the pair the child wanted is drawn hollow beside it.
**Misconception to break:** Writing forty as four Xs in a row instead of XL.

### 4 · A smaller letter on the left is subtracted
**Screen:** the rail with a smaller tile hovering to the left of a bigger one
**Does:** builds a legal subtractive pair, then tries an illegal one
**Win:** the legal pair builds and the illegal one is refused with its reason
**Feels:** a lawful pair and an unlawful one look exactly alike until the rail answers
**Goal:** only six subtractive pairs exist and the rest are not numerals
**Observe:** Not one refusal ever cleared the rail.
**Wrong (each is a traceback on the working area):**
- builds forty-nine by standing the one letter to the left of the fifty letter. → the tile hangs where it was dropped while the refusal strip prints that the one letter may be taken only from the five letter or the ten letter; the reference card turns over to its list of six pairs and the two that begin with that letter light. The rail keeps what was built and the total does not change.
- puts the smaller letter on the left and waits for the total to climb. → the pair is ringed amber and the ledger line for the left hand tile is rewritten with its bar turned back to front; the total drops by that tile's value and the two figures, what it was and what it is now, are printed one under the other beside the ring.
**Misconception to break:** Writing forty-nine as IL by taking one away from fifty.

## Delight
The third phase, the moment a fourth tile of the same letter is dropped. It comes down to the rail, reaches the place it wants and stops dead a tile's height above it, and hangs there. The three tiles already down slide apart to open exactly the gap it was aiming for, the rule prints itself under the rail one word at a time, and then the gap closes, the hanging tile lifts back to the tray, and the numeral on the rail is precisely what it was before. Nothing else moves and the voice says nothing while it happens.

**General miss line:** Read the rule card again, and then look at what is already on the rail.

## Answer key
Seven letters carry fixed values: I one, V five, X ten, L fifty, C one hundred, D five hundred and M one thousand. A smaller letter to the right of a bigger one is added. The letters I, X, C and M may be repeated up to three times and repetition means addition. A smaller letter to the left of a bigger one is subtracted, but only I from V or X, X from L or C, and C from D or M. V, L and D are never repeated and never subtracted.

## Student controls
- **Letter tray**: holds the seven tiles with their values printed under them
- **Build rail**: assembles the numeral from the tiles dropped into it
- **Running total**: shows each tile being added or subtracted as it lands
- **Rule card**: names the rule whenever a tile is refused
- **Direction switch**: turns a number into a numeral, or a numeral into a number
- **Reference card**: keeps the seven letters and their values open at the side

## State fields (getState, a resume contract)
phase, rail, total, direction, target, lastRefusal, complete

## Textbook (this topic)
**Pages:** 13, 14, 15
**Key terms:** Roman numeral, symbol, repetition, subtraction
Seven letters and three rules write any number the chapter needs, and the rules refuse more combinations than they allow. Only seven letters are used. I is one, V is five, X is ten, L is fifty, C is one hundred, D is five hundred and M is one thousand. Every Roman numeral is built from those seven and nothing else. When a smaller letter stands to the right of a bigger one, the values are added. So XI is ten and one, which is eleven, and LX is fifty and ten, which is sixty. Reading runs from left to right. The letters I, X, C and M may be repeated, and repeating one means adding it again, so XXXIII is thirty-three. But three is the limit, which is why four is not written as four ones. V, L and D are never repeated. A smaller letter to the left of a bigger one is subtracted, so IV is four and IX is nine. Only some pairs are allowed: I from V and X, X from L and C, and C from D and M. That is why IL is not a numeral.
