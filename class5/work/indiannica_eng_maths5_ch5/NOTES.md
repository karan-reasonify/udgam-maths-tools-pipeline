# Class 5 chapter 5 "Decimals": chapter notes and decisions (main session, 2026-10-06)

Chapter id `indiannica_eng_maths5_ch5`, plan `indiannica_eng_maths5_ch5_v1` (active), runtime **r22** pinned
(2026-10-07; r21 until then). The point key, stacked fractions, two boxes, the lent pad and the TR table are in
r21; **r22 adds classroom mode** (`props.classroom`, BUILD_CARD §7 2026-10-07, LAYOUT §13b, PATTERNS §13): a tool
writes nothing for it, but `Work` pictures must make sense while the bubble waits (PATTERNS §13). The pin moved
every slot's source hash: only M1.S1.T2.C4.2D1 was re-checked on r22 so far; re-check each of the others when
its builder resumes (tell it the runtime moved). The agreed keypad inset is still NOT applied.
Work only in `class5/`; never open or touch `class4/` (slot ids repeat across classes).
The children are 9 to 11.

## Chapter notes (what Decimals tools need)

- Tenths, hundredths and thousandths on strips and grids; the decimal point in the place-value chart; reading
  and writing decimals; expanded form; like and unlike decimals; comparing and ordering; adding and
  subtracting in columns; measures written as decimals (kg, m, L).
- **A decimal answer is `pointKey: true` and a STRING in its written form** ("0.09", PATTERNS.md §4), judged
  exactly: "0.5" is not "0.50", "4.500" keeps its zeros. When a zero can end the answer, the ask says how
  many places are wanted. The zero in front is always written. The AI-mode agent needs the tool's own
  `answer()` for decimals (§4, last bullet).
- A fraction answer is `parts: SLOT_FRACTION` (mixed: `SLOT_MIXED`, §3); the point key is flat and off on
  those items. Draw fractions **stacked** (numerator over denominator), never "3/10" in a picture or an ask.
- No commas inside a fraction or a decimal (2750/1000, 12.563); commas from 1,000 on whole numbers.
- The voice says "zero point six five" for 0.65, "quarter" for x/4, and reads units in words.
- Borrowing is unbundling (a block of the next place breaks into ten); the carry is the picture, not a
  written 1. Any strike-through is ink, never red.
- Long rows: plan the working area (1086 x 528). A step typed INTO the picture lends the pad (`api.capture`,
  §5). Money, measures and live pieces: §12.

## Decisions (step 2 of the runbook)

1. "Number pad" in a brief is the runtime's 12/13-key pad (13 with the point key). No new input, no new
   runtime feature.
2. Anything a brief calls a **word pad** or "type a reading" is NOT a typed-text input: readings are built
   from word chips (drag or tap, keyboard reach with `drag.keys`) and choices in the working area; the only
   thing typed is a number on the pad.
3. Drag mechanics (cards, trays, ladders, chips, pieces) use the runtime's `useDrag`; real input is checked
   with `class5/lib/check/playkit.mjs`, never the shared Playwright browser.
4. Textbook PDFs are off limits to builders: the brief's own "Textbook (this topic)" section is the source.
5. Run your own checks with `C4_CHROME_POOL=2`; if a pointer-drag or click-then-enter times out, re-run with
   `C4_CHROME_POOL=1` before debugging (machine load, eleven builders share one machine).
