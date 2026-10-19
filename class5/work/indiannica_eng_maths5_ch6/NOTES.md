# indiannica_eng_maths5_ch6 · Percentage · notes

Plan `indiannica_eng_maths5_ch6_v2` v2, 7 tools. Decisions are in `class5/docs/BUILD_CARD.md` §7 (the 2026-10-17 ch 6 row).

## Runtime pins

r55 (fetch) -> r56 -> r57 -> r58 -> r62 -> r63 (all on the owner's word). **r64 is taken at step 6** (the owner, 2026-10-18),
with every tool re-checked and a real-input probe of a Next double tap on the choice questions (C5, C10, C35).

## Runtime-gap list (logged, not frozen; for the next batched freeze)

- **hi/gu summary rows are tight:** 4 rows of Devanagari need about 92 a row and get 76 (`Summary`, rows 166-470), so a heading's
  descenders touch the "you learned" line under it. Needs the stars and keys moved; touches every class's summary page.
- **Reduced motion: two quick Enters on a guide step perform two steps** (with motion on the act blocks the second).
- **Keyboard focus after a guide step restarts at the top** (pointerBlur): a keyboard child needs 9-10 Tabs to reach the next control.
  C15 works round it by focusing the next control itself.
- **`wrapText` / `pieces` split on `\s`, which matches U+00A0:** a no-break space in a TR value does nothing ("× 100" broke in hi;
  C30 writes "×100"). Use U+2060 or no space until fixed.
- **`useDrag().keys` does not blur after a key drop** (usePress does): a typed-first answer's Enter is swallowed by a focused part (C25).
- **The Hint key and Escape do not end the phase party** (a phase dot, restart and a classroom bubble tap do).
- **Classroom closing lines are timed short:** 14-17 words stay up 3.8-5 s (about 3.3 words a second).
- **An Enter on an unchanged miss gives no nudge** (r60 keeps the hint; nothing pulses or sounds).
- **An empty whole box on a Decimal card moves the caret instead of counting a miss** (SLOT_DECIMAL).
- **Phase 4 of C35 opens on about 5.9 s of teach text with nothing tappable** (Enter does not skip it).
- **AskBar draws a BlinkRing on EVERY choice key** of a cardAnswer choice question, so three rings pulse at once (C35's TN2).
  One invite: one ring round the group, or none.
- **A one-box `parts` slot's aria label stays English in hi/gu** ("per cent box": `SlotPartBox label={p.label + " box"}` skips TR;
  r61 translated only the fraction/decimal boxes).
- **Long digits overflow the slot boxes** (SLOT_DECIMAL / SLOT_FRACTION keep up to 7 a box); C5 and C20 trim with `api.setTyped`.

## For a native speaker (hi, gu)

Gujarati "મિલિ" vs "મિલી" (mL); Hindi "अगला चरण" for Next phase; प्रतिशतता / ટકાવારી for percentage; म॰स॰प॰ / ગુ૰સા૰અ૰ written with the
abbreviation sign; "विषम करो / અશુદ્ધ કરો" for Unmix; "બટ્ટા" for "over"; "इकाई संबंध / એકમ સંબંધ" for Unit fact.
