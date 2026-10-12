# M2.S4.T7.C24.2D1 · rounding_line · Rounding Number Line
indiannica_eng_maths4_ch1 · indiannica_eng_maths4_ch1_v1 v1 (active) · "Large Numbers" · segment M2.S4 "Other Ways to Write It, and When Near Enough Will Do" · topic M2.S4.T7 "Near Enough" · printed p.12 to p.13

> Runtime supplies the standard chrome (bands, zones, header, runs box, slot + pad, bubble, phase bar, type scale, content colours, sounds, finished/idle/restart). `scaffold` puts each phase's concept, teach line, hint ladder, closing line and items into tool.tsx; they are not repeated here. Build the working area and the mechanics.

## What it is
**Description:** A number line that zooms until the two nearest round numbers sit either side, and asks which is closer.
**Why:** Swap a number for a rounder one that is near enough, and work out when that is a bad idea.
**Look:** A number line with your number marked on it and the two nearest round numbers waiting at either end.
**Context:** Grade 4, near the end. An adult sees three rounding procedures. What the page is actually doing is asking for a judgement twice over: which multiple is nearer, and then whether swapping the number for it was a sensible thing to do at all.
**For the child:** Pick the place you are rounding to and let the line zoom. Look at which end your number is nearer to, then check the rule strip. Round the same number three ways and compare. Then decide whether a number should be rounded at all.
**Teaching notes:** Draw the line every time for the first few numbers, and ask which end is nearer before anybody reads a digit. Rounding is choosing the nearer of two marks, and the rule is only a quick way of saying that; a child taught the rule first has a procedure with nothing under it. For the nearest hundred, make them cover the hundreds digit and read what is left out loud, because reading two digits as one number is the exact place this goes wrong. Round one number all three ways and line the answers up. Three different answers from one number surprises them, and it should. The judgement bay is the best question on the page and it has no single right answer.
**Placement:** Practise
**Also mounted in:** M2.S4.T7

## Look
**Chrome:** dim #9AA4AC · ink #2B2B2B · rule #C9BCA6 · panel #F2E4CE · paper #FFFDF7 · accent #5B6770
**Voice:** rate 0.92, pitch 1.06 · figure: None

## Stage (tool-specific layout)
Three bands across 1600 by 900. The header runs 0 to 80 and is one line only: 'Rounding Number Line' in ink at the far left, a small dot set clear of the name by measuring it, the phase title beside the dot on the same line, the host's navigation, and again, sound and restart as three round controls at the far right. The canvas runs 92 to 746, one rounded card on the paper colour. At its top left, at 64,108 and 330 by 76, sits the running count: the number being rounded and, under it, the place it is being rounded to, both in ink, with the two candidate multiples beside them; on the third phase it holds the three answers in a column as they are made, and on the fourth it carries the quantity and what the quantity is for, because nothing in the judgement bay is counted. Nothing in it ever reads as a score. The working area is 1086 by 528 at 64,202. A place picker of three keys 200 by 64 runs along the top of the working area at 64,214, 284,214 and 504,214, reading nearest ten, nearest hundred and nearest thousand, the chosen one sitting proud of the other two; stack all three, 180 by 64, sits at 764,214 and snap, 180 by 64, at 970,214. The line itself is a ruled 880 at 156,400 with a tick 4 by 48 at each end and a label plate 180 by 56 centred under each end at 66,420 and 946,420, carrying the two candidate multiples. The halfway tick stands at the midpoint, 4 by 72, with a small diamond at its head and the halfway value printed above it. The marker is a drawn pin 36 by 76 standing on the line at the number's own place with the number printed on its head; it is the one thing on the stage that never moves while the line zooms, because the zoom is drawn as the ends coming in towards it. The two distance bars lie under the line at y 490, 20 tall, running from the foot of the marker out to each end with their lengths printed at their middles, and the shorter of the two fills amber the moment both are drawn. The rule strip is 700 by 96 at 156,530: the number printed across it in ruled place columns, the rounding place shaded amber, and one single box closed round the whole of what stands to its right, however many digits that is, with what that box holds printed under it as one number in words and the threshold, five or more, fifty or more, five hundred or more, printed beside it. The answer plate is 220 by 96 at 886,530. On the third phase the line is drawn three times, 660 long at 136,268, 136,402 and 136,536, each with its own end plates 140 by 48 and its own answer plate 200 by 56 at x 900, and the three markers stand very nearly one above another, because the number has not moved and only the zoom has. On the fourth phase the quantity card is 1086 by 140 at 64,214 and the two argument cards are 520 by 300 at 64,378 and 630,378, headed round it and keep it, each with room for a reason; that bay has no answer key, so neither card is ever marked and the marker never snaps there. Down the right of the canvas, in the same rectangle on every phase and never animated in or out, the question sits above the slot at 1186,250 (356 by 92) that holds what the child has given, and under it the pad at 1170,368 (388 by 363). The pad is twelve number keys three across on the first three phases, with a thirteenth key that writes a run of zeros so a rounded answer can be finished in one press; on the fourth it is a choice pad of two large keys, round it and keep it, with a strip of reason words under them, and nothing pressed on that pad is ever marked right or wrong. The footer runs 758 to 900: the voice caption at the far left with its speaking dot beside it, measuring its own wrap and dropping a type size rather than spilling, and the phase bar at the right with the question count under it. There is no sidebar and no score box anywhere, and nothing is ever written over the working area. Content colours are the chapter's own: the ones period is deep blue, the thousands period green, the lakhs period vermilion and the millions period rose; whatever settles the answer on this stage is amber; a zero that is only holding a place open is grey; and chrome never borrows one of them, so the stage still reads with the colour taken away.

## Opening (first frame of every mount)
Every mount comes up already furnished for its phase with nothing in front of it. On the first two phases the line is already drawn across the working area, zoomed so that the two candidate multiples sit at its ends with their labels under them, the halfway tick standing between them, the marker for the number already on the line where the number belongs, and the two distance bars ruled but unfilled. On the third the line is drawn three times, one under another, and the top two carry the answers made on the earlier phases while the lowest stands empty. On the fourth there is no line at all: the judgement bay is up with its quantity printed on a card, a line under it saying who uses that number, and two argument cards face up and blank. The running count at the top left is empty and the slot and the pad stand empty down the right. One thing moves, once: the marker on the first three phases, or the quantity card on the fourth, gives one slow pulse while the voice asks which end is nearer. That pulse is the only invitation, and a finger on it is the whole way in.

## Phases (what each mount shows and does; the words are in tool.tsx)

### 1 · Rounding to the nearest ten
**Screen:** the line zoomed so that two neighbouring tens sit at its ends
**Does:** reads the ones digit, compares the distances and snaps the marker
**Win:** the marker lands on the nearer ten and the rule strip agrees
**Feels:** you can see which end is nearer before anybody has said a word about digits
**Goal:** the ones digit alone decides rounding to the nearest ten
**Observe:** The marker was plainly nearer one end before a single digit had been read.
**Wrong (each is a traceback on the working area):**
- reads the tens digit instead of the ones digit and rounds the number down. → the rounding place shades amber on the rule strip and the box to its right closes round the ones digit alone, with what it holds printed under it; on the line the two distance bars fill outward from the foot of the marker and the shorter one fills amber. The child's answer stays in the slot beside them.
- writes the rounded answer with the ones digit left exactly as it was. → the child's answer is given its own marker and dropped onto the line: it lands somewhere between the two ends rather than on either of them, and the two end plates light as the only two places an answer can sit. The ones place then rolls down to a grey zero and that marker slides the rest of the way onto the end.
**Misconception to break:** Rounding down to 32,760 by reading the tens digit instead of the ones.

### 2 · Rounding to the nearest hundred
**Screen:** the line zoomed to two neighbouring hundreds
**Does:** covers the hundreds digit, reads what is left and snaps
**Win:** the whole two digit remainder is highlighted, not just one digit
**Feels:** two digits stop being two digits and turn into one number that is either side of halfway
**Goal:** for hundreds you read the two digits to the right as one number
**Observe:** Rounding to the nearest hundred read two digits at once, and to the nearest thousand it read three.
**Wrong (each is a traceback on the working area):**
- reads only the tens digit and rounds the number down. → the box on the rule strip opens wider until it holds both digits to the right of the amber place, and what they make together is printed under it as one number in words with the threshold beside it; on the line the bars fill and the shorter one fills amber. The child's answer stays in the slot.
- reads the two digits to the right as two separate numbers and measures each against five. → the two digits slide together inside one box and are read out as a single number; the halfway tick on the line takes a label saying what it stands for, and the marker is shown standing past that tick or short of it, with nothing said about digits at all.
**Misconception to break:** Looking only at the tens digit six and rounding down to 32,700.

### 3 · Rounding to the nearest thousand
**Screen:** the same number rounded three ways, stacked
**Does:** rounds to the nearest thousand and compares all three answers
**Win:** the three answers stand together and none of them is crossed out
**Feels:** three answers out of one number, and being asked to cross one out and finding you cannot
**Goal:** one number can round three different ways and all three are right
**Observe:** One number gave three different answers and not one of them was crossed out.
**Wrong (each is a traceback on the working area):**
- rounds up to the next thousand because the hundreds place is not empty. → the lowest line zooms until the two thousands sit at its ends and the marker is left standing near the left one; the box on the rule strip closes round all three digits to the right of the amber place and prints them as one number, with the halfway value printed at the halfway tick. The bars fill and the left one is plainly the shorter.
- says two of the three answers must be wrong, because they do not agree. → the three lines stack and a line drops from each marker to the one below it and stands very nearly upright, because the number is the same on all three and only the zoom is different, while the three answers stay where they landed; each answer then takes its own label, to the nearest ten, to the nearest hundred, to the nearest thousand, and not one of them is crossed out.
**Misconception to break:** Rounding up to 44,000 because the hundreds place is not empty.

### 4 · When rounding a number would be wrong
**Screen:** the judgement bay holding a real quantity and two arguments
**Does:** decides whether the number should be rounded and gives a reason
**Win:** the reason is given and it is about the use, not about the digits
**Feels:** the rule works perfectly and you still should not use it
**Goal:** whether to round depends on what the number is for
**Observe:** The judgement bay took an answer and gave none back.
**Wrong (each is a traceback on the working area):**
- rounds the school's starting time to the nearest ten minutes because the rule allows it. → the bay does not snap and nothing is marked. The rounded time is printed on a card beside the true one and the morning is drawn along the foot of the bay in three small frames, the gate, the bell and a child arriving at the rounded time; both cards stay side by side and the argument card is left open.
- rounds the count of bones in the body to the nearest hundred and reads the rounded figure back as the fact. → the two figures are printed one under the other and a row of small bones is drawn beside each, counted along in tens, so the gap between the two counts is drawn rather than stated. The child's reason card stays open and neither figure is crossed out.
**Misconception to break:** Applying the rounding rule because a number is there, without asking what it is for.

## Delight
The third phase, the moment the third answer lands. The three lines fold together into one, at the widest of the three zooms, and the three markers slide into a single pin, because they were the same number all along. The three answers then come down onto that one line as three separate ticks, each keeping its own label: two of them in close beside the pin and the third right out at the end of the line. One pin, three ticks, and nothing to choose between them. Nothing else moves and the voice says nothing while it happens.

**General miss line:** Look at the two ends again, and at the mark halfway between them.

## Answer key
To round to a place, find the two nearest multiples of that place and take the nearer one. The rule reads the whole number to the right of the rounding place: five or more for tens, fifty or more for hundreds, five hundred or more for thousands, and then the digit at the rounding place goes up. Everything to the right becomes zero. Whether a number should be rounded depends on what it is for.

## Student controls
- **Place picker**: chooses rounding to the nearest ten, hundred or thousand
- **Zoom**: brings the two candidate multiples to the ends of the line
- **Halfway mark**: shows the midpoint between the two candidates
- **Distance bars**: draws how far the number is from each candidate
- **Snap**: moves the marker to the nearer candidate and writes the answer
- **Rule strip**: highlights the digits that were read to make the decision
- **Stack all three**: rounds one number three ways and lines the answers up
- **Should it be rounded**: opens the judgement bay with a real quantity to argue about

## State fields (getState, a resume contract)
phase, value, place, candidates, halfway, rounded, judgement, complete

## Textbook (this topic)
**Pages:** 12, 13
**Key terms:** rounding, nearest ten, nearest hundred, nearest thousand
A number is swapped for the nearest ten, hundred or thousand, and sometimes it should not be swapped at all. Look at the ones digit. If it is five or more the tens digit goes up by one, and if it is less the tens digit stays. Either way the ones place becomes zero, so 32,768 rounds to 32,770. Look at the number made by the digits to the right of the hundreds digit. If it is fifty or more the hundreds digit goes up, so 32,768 rounds to 32,800. The tens and ones places both become zero. Look at the number to the right of the thousands digit. If it is five hundred or more the thousands digit goes up, so 32,768 rounds to 33,000. One number can round three different ways, and all three are correct. Rounding throws away exactness to make a number easier to hold. That is fine for a crowd in a hall and wrong for a starting time or a count of bones. Ask what the number is for before rounding it.
