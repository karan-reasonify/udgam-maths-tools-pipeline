# Class 5 chapter 5 "Decimals": chapter notes and decisions (main session, 2026-10-06)

**2026-10-17: plan `indiannica_eng_maths5_ch5_v2` (active since 2026-10-14) and runtime r55.** v2 is v1 with every id renumbered
and nothing else changed (each tool's `tool_config` is identical once ids are set aside; the urls name the NEW ids): Tenths Builder
`M1.S1.T2.C4.2D1` -> `M1.S1.T2.C5.2D1` (phase concepts C4-C7 -> C5-C8), Hundred Grid C8 -> C10, Decimal Reader C12 -> C15, Fraction
Converter C16 -> C20, Place Value Board C20 -> C25, Expanded Form C24 -> C30, Like Maker C28 -> C35, Comparer C32 -> C40, Column Adder
C36 -> C45, Column Subtractor C40 -> C50, Measure Chain C44 -> C55. All 11 work folders were renamed and their ids (media id, concept
ids, `<concept>:<slot>` qids) rewritten in one pass; the old v1 pairs were taken out of `output-preview/` (a re-port writes the new
ones). The chapter is pinned to **r55** (the head of 2026-10-16: the new look of class 4 ch 8). Only Tenths Builder is being made
now (the owner's pilot); the other 10 wait for the owner's word. The history below is kept as it was written.

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

## Runtime-gap list (batched, owner rule 2026-10-18: logged here, fixed at step 6 in ONE freeze; ch 5 is on r64)

Open (each tool works round it for now):
1. A phase's `closing` replaces only a win line the tool says through the runtime; a tool's own win line can still show (5+ reports).
2. No hint channel at a question: Work gets no Hint signal (tools poll `getState().hint`) and cannot raise a hint itself (C20, C35, C40 fake it with `api.say` + restoring the question) -> `api.hint(text)`. After a miss, `api.say` is not drawn while the hint stands (C15 swaps the item's `miss` for its leading-zero hint).
3. Hindi summary row pitch too tight (5 reports).
4. hi/gu bubble lines are fitted by character count: early breaks, one-word last lines; no-break spaces (U+00A0) become plain spaces, so an equation cannot stay on one line (C45).
5. Gujarati reads about 20% smaller: device Noto Gujarati, not in the font kit -> a gu size scale or Gujarati in the font kit.
6. The party is not ended by Esc / Hint / Enter.
7. `Hit enabled={false}` sets no `aria-disabled`, so finger-boxes counts it as live.
8. FREE_LINE comma split keeps only the last piece; a hi/gu line over 80 characters split at commas is not checked in phases 2-4 (check gap).
9. Yes/No choice key text is small (about 30).
10. Choice keys fit their text key by key in hi/gu, so a question's keys have no shared size (C10, C30); choice keys carry no "chosen" state, so a correction cannot outline the child's pick (C10 draws its own "You chose" chip).
11. `useDrag().keys` does not blur after a key drop (`usePress` does): blur unless `keepFocus`, keeping C35's Enter cycling and C40's dcard (C15 fixed tool-side).
12. `gotoStep` to the open question after a miss resets `tries`, so a later win counts as first try (agent-only path; question for the owner).
13. `api.cardReady(false)` does not stop a physical digit (it opens the keypad and types) and the flag carries into later questions (C30 resets it per question and clears the digit with "Place the parts first."). On an Answer-key question it only stops the ring: the key still opens the pad, and the input checks skip a question while it is false, so `point-input` fails if no typed question is live (C55 gates in `onEnter`, chain questions only). Also `api.say` during an open question replaces `getState().instruction`, so a refusal is two lines: the refusal, then the question again (C55; see 2).
14. Check gaps: `action-anim` "acting was not true while the act played" flakes under load (C45, C10); `shots --pack` party frames sometimes miss the party (C15, C35, C55).
15. After a miss the Decimal card's caret goes back to the whole-number box, so Backspace erases the right-hand part first ("|07") (C35).

Fixed in r56-r64 (BUILD_CARD §7): act guards, Close/Next/Hint/choice double taps, lent pad Close, same-question remount (workN), stale Enter keeps its hint, card name and box labels translated, e.repeat on drag keys.

Note (2026-10-18 19:57, from the ch 6 session): the class 5 head is past r64 (r65 frozen by ch 6) and now also slows every api.act 1.5x (ACT_TEMPO, ACT_BEAT, pencil tick). A ch 5 step-6 freeze would carry both: re-check every act timing and the action-anim row then. Their check-lib edits only wait longer (approve guide wait 10 s, action-anim 4 s), so nothing on r64 changes.

## PUBLISHED 2026-10-18 20:05 (owner: "if all good upload")
All 11 uploaded on r64 to learning_plan_assets/V2/cbse/indiannica/english/class_5/mathematics/ch_5/2dtool/<slot>/<slot>.tsx + .json
(plan indiannica_eng_maths5_ch5_v2; dry runs clean, URLs match the plan, 0 lp2_media rows; stored + public md5 ok for all 22 files).
Open for the owner (asked, not answered):
1. Runtime-gap package (list above): one batched freeze after Oct 24 (reviewers back), would also carry ch 6's act tempo.
2. Last looks after the weekly limit were sampled (main session + Haiku play probes) for C25 C30 C50 C55 C15: an own viewer pass in hi/gu, or a full re-review after Oct 24 (rebuild packs first).
3. Unused plan questions: C8:8 (Tenths Builder), C12:5 (Hundred Grid), C50:1 (Column Subtractor); reason not recorded.
4. Decimal Comparer phase 3: all three answers are the shorter decimal (recommend making one the longer).
5. Column Adder phase 4: both predictions "Yes" (as the plan).
6. Tenths Builder Hindi term (पूर्ण संख्या भाग / पूर्ण भाग); native-speaker read of hi/gu (દશાંશ = tenths and decimal; C50 "उधार लो / ઉછીનું લો").
7. Accepted no-room departures: C50 no row labels; C25 no Answer / Place holder labels in a correction with tiles still in the tray.
