# indiannica_eng_maths4_ch7 · Understanding Fractions · notes (remake on r28, 2026-10-19)

## Runtime-gap list (non-negotiable 3: logged, not frozen; one freeze before the review packs)

| from | gap | work-round in the tool | fix at the gate? |
|---|---|---|---|
| C10 builder | `api.share({ answered })` overwrites the runtime's own `answered` count; `nav-dots` then fails with a misleading "false answered, stage demo" | the tool does not write `answered` | runtime: ignore/rename a tool's `answered` in share, or document "never share answered" in PATTERNS |
| C10 builder | a phase `closing` of ~100 characters fails `one-line-bubble` ("never reached the bubble") | closings kept to ~85 characters | docs: state the limit in PREFLIGHT/BUILD_CARD |
| C10 builder | the quick check's lists stop at 6 items plus "+N more" | none needed | minor (check output only) |
| C15 builder | r28's pencil act (1.5x ACT_TEMPO + 400 ms beat, from class 5) runs ~2.1-2.5 s by default, over `action-anim`'s 2 s limit | every act passes `ms: 700` (which undoes most of the calmer tempo) | **FIXED 14:05 (lib, no freeze): `actLimit` = 2000 x ACT_TEMPO + ACT_BEAT = 3400 ms on r28** |
| C20 builder | `api.cardReady(false)` is never released when a Work unmounts: the next question inherits "not ready" (card line and blink vanish) | effect cleanup calls `api.cardReady(true)` | runtime: reset cardReady per question (BLOCKER-class? no: worked round) |
| C20 builder | `wrong-is-unmarked` reads a lone "×" text (a key label) as a cross | op signs drawn as paths | check: exempt a lone × on a key/choice label |
| C20 builder | a closing with a comma is split into pieces and `one-line-bubble` never sees the last piece | closings comma-free | runtime/check: same family as C10's closing-length gap |
| C20 builder | four choice keys widen box.key to x ~812, so the picture starts at y 112 | layout around it | note only |
| C5 builder | `summary-thumbs` runs in hi/gu even while TR is empty, so any English word in a Thumb fails before the language pass | thumbnails drawn text-free | check: skip hi/gu thumbs until TR has begun (as one-line-bubble does) |
| C5 builder | default act length grows with the number of points (5 cuts = 2150 ms) and fails `action-anim`'s 2 s | `ms: 1100` everywhere | FIXED with C15's row |
| C25 builder | keys in the key corner clip long labels | labels shortened | runtime: widen/fit choice keys (note) |
| C25 builder | playkit writes play-*.png into the slot folder (root rule: check screenshots belong in the scratchpad) | builder deleted its 52 PNGs | lib: playkit output dir (note; `clean` removes them anyway) |
| C35 builder | `api.cardReady(false)` alone does not gate typed digits; the gate needs `api.cardReady(false, true)` — PATTERNS 9e does not say so | uses the two-arg form | docs: PATTERNS 9e |
| C35 builder | gating every card question makes `parts-input` time out (25 s per gated question) | only the learn question of a tidy phase is gated | check: drive the acts before typing, or document |
| C30 builder | no Work remount on a phase restart (header restart): warm-up state survives | the tool resets its warm-up when `step` falls back | runtime: remount Work on restart (note) |
| C30 builder | `api.act` `draw` leaves a straight trail across cells when shading | pencil `rub` used for shading | PATTERNS §15 already says hatch cell to cell; note |
| C20 builder | `api.lock(true)` hides choice keys but also makes `toolApi.answer()` refuse, so a tool cannot hold choice keys quiet until a condition and still be answerable by the host/teacher agent | C20 draws its own verdict keys (pad "enter") that appear once both products are written | runtime: an `api.choicesReady(false)` (like answerReady) for choice keys |

| C10 play | a double tap on the "Next phase" key: the 2nd tap lands on the new phase's guide step and shows its hint (the post-next guard covers question hops, not enterPhase) | none | runtime (step 6): extend the post-next guard to enterPhase |
| C10 play | keyOnly last question: the win line gives way to the closing, then phaseEnd says the closing AGAIN (Next key: pages 1,2,1,2; classroom/AI: the whole closing twice, ~13 s) — every tool, every language (class 5's head too) | none | runtime (step 6): say the closing once |
| C10 play | getState().hint carries "Tap the blinking Answer key." / "Type your answer, then press Enter." that the keyOnly bubble never draws (a teacher agent may say an unseen line) | none | runtime: blank them under keyOnly, or note |
| C10 play | classroom win lines stay a fixed ~3.9 s (winMs 4000) even for ~45-char hi/gu lines | none | runtime: winMs from line length (question) |
| C25 visual | choice keys in one row are drawn at different font sizes (the runtime sizes each key on its own label) | none | runtime (step 6): one size per row = the smallest any key needs |
| C20 visual | summary page (hi): row titles' descenders (ु ँ) touch the "तुमने सीखा" line below; the row pitch needs Devanagari leading | none | runtime (step 6): summary row leading for hi/gu |
| C10 visual | the bubble leaves a one-word last line ("12.", "left."; hi "है?", gu "છે.") — runtime paging has no widow guard | none | runtime (step 6): balance the last two lines |
| C5 play | **BLOCKER-class**: a 2nd tap on the blinking Fraction card (45-450 ms) lands on key-6 of the opening pad and types a digit ("4" -> "64"); r28's 300 ms `openedAt` guard covers `pickPart` only (runtime.tsx ~3494), not the digit keys — every cardAnswer tool (C5, C15, C25, C35, C20?) | none | runtime (step 6): guard the digit keys for ~500 ms after the drawer opens |

## Chapter terms (hi / gu) — lead decision 16:25
- "upper number" / "lower number" -> ऊपर की संख्या / नीचे की संख्या · ઉપરની સંખ્યા / નીચેની સંખ્યા (literal: C5 teaches "the upper number is the numerator")
- "numerator" / "denominator" -> अंश / हर · અંશ / છેદ (only where the English says so)
- fraction भिन्न / અપૂર્ણાંક; proper उचित / યોગ્ય; improper विषम / અયોગ્ય; mixed number मिश्र भिन्न / મિશ્ર અપૂર્ણાંક; lowest terms सरलतम रूप / સૌથી સાદું રૂપ; factor गुणनखंड / અવયવ
- C10 used अंश/हर for upper/lower number -> to fix with its visual round.
- Native-speaker questions: improper = विषम (tools) vs अनुचित (NCERT usage)? Gujarati યોગ્ય/અયોગ્ય; quarter ચોથો ભાગ (legacy) vs પા. A native speaker must read the first translations (Gujarati especially).

## Tool state
- C10: DONE (maths x2, visual x2 clean, play clean) 17:02, 94/0/0, awaiting step 6.

## Owner questions (batched for the report)
- One object across the chapter (C5 chocolate bar) vs a golden ribbon for the length tools (C15, C20, C30)?
- C30 whole-number reader: green-washed cake circles (>=28 px) or plain green circles?
- C10 P1 Q1 "one sixth of 36": the answer 6 equals the printed lower number (the plan's item; kept). Swap the item?
- C20: the plan's "build three" questions (ML2, Q4) take ONE typed multiple (any a·k/b·k, k≥2) and the win writes the plan's three — maths reviewer: acceptable. ML3's second half (36/60 -> 3/5) dropped: it needs factor 12 and the keys stop at 9. (Lead decisions: phase 4 back to the plan's Yes/Yes/No; extra divide-with-bottom guide beat; start art without the dashed guide.)
- C5 ML3: the plan key says like = 5/9 and 1/9 only, but 11/8 and 8/8 also share a denominator (book p.73-74); the tool takes all four (plan key incomplete — tell the owner; alternative 11/8 -> 11/7).
- C5: numerator/denominator now named once in phase 1 (the brief: "its two parts are named"); upper/lower everywhere else.
- C10: bowls ~62 units wide (~48 at 9-12 bowls with the pad open): big enough for the last bench? (visual reviewer to judge first)
