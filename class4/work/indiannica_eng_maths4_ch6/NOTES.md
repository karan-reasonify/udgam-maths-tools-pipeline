# indiannica_eng_maths4_ch6 · Factors and Multiples · remake on r28 (2026-10-19)

## Runtime-gap list (logged, not frozen; runbook non-negotiable 3)

- (shared checks, reported by C10 Pair Pen AND C30 Digit Tester = a pipeline gap) `pad-shape` on keyOnly + board: a tool with typed
  questions fails when no phase's FIRST question is typed (a working-area question's Enter sits in the key corner, so `pad:"enter"`
  is never sampled). Worked round in tool.tsx (C10: P3 Q1 made typed). Fix in lib/check at the step-6 gate, not now (ch7/ch10 share lib).
  ALSO hit by C20 (P2 order swapped) and C10 again (P3 Q1 tap act restored -> reorder). Both reorders were accepted by the maths
  reviewers ("teaches well"). The fix (16:25): `?item=k` on drive=ask in lib/build/preview.mjs + one extra `ask` run in
  lib/check/check.mjs for the first typed item when no phase opens on one. NOT done now: it changes the checker hash and restales
  the in-progress ch7 + ch10 sessions' checks; OFFERED to the owner in the report (then classctl to class 5).
- (shared checks, C10 + C30) the dev `solve()` of a `pad:"enter"` / gated item must submit SYNCHRONOUSLY (`one-line-bubble` reads
  the stage right after); a tool that sets its picture then submits, or gates a typed question on the working area (C30's rail),
  cannot pass. Worked round (C30: P2 typed totals ungated). Step-6 gate.
- (shared checks, C15 Multiple Track) the `?answer=open` frame shows the answer drawer even on a `pad:"enter"` question (PATTERNS
  says such a question never opens it); text-contrast geometry is sampled SHUT but the screenshot is OPEN, so working-area text
  under the drawer's pink Enter key fails contrast. Worked round (C15: chart capped at 66 stones, 11x6 narrow chart when box.open).
- (runtime r28, C5 play test) REDUCED MOTION only: after any act the bubble swaps the question for "Tap the blinking Answer key."
  (en and gu); with motion on the question stays. Logged, not frozen (non-blocker).
- (runtime r28, C10 play test) LAYOUT 1d says a hint replaces the question "until the child's next tap", but on pad:"enter"
  items a Work act (Try, a post tap) never clears it; only typed and choice keys do. The question line never returns.
- (runtime r28, C10 play test) AI `gotoStep` to the question already open keeps the child's marks while tries/typed reset;
  the miss's hint and an open pad survive with tries 0.
- (runtime r28, C15 play test) free play: while a tool lends the pad (`api.capture`) the Close key is drawn "off" because the stage
  is "free", not "ask", so Close cannot leave a free-play typing mode (Escape / a second tap are the tool's exits). Let Close be live
  while the pad is lent.
- (runtime r28, C30 play test, round 2) a TYPED question cannot hold the Answer key's blink until the tool's act is done (only
  `pad:"enter"` has `api.answerReady`; locking the pad fails `keyboard`). With PATTERNS §19 (one invite) the blink then points past
  the act ("bring every card down first"); a guess costs a try and the replay shows the method. Wanted: `api.answerReady` (or
  `api.actPending`) for typed questions too.
- (r28 tempo, C5) each Divide Ladder rung step ~3.3 s (1.5x hand act + card flight); a 5-step climb ~17 s. Owner question, not a gap.

## Owner questions (main session's decision in brackets; the owner may overrule)

- RUNTIME at step 6: the ch7 session is freezing class 4 r29 (17:07) = r28 + a digit-key guard after the drawer opens, the keyOnly
  closing said twice, a Next-phase double tap leaking, one font size per choice-key row, Devanagari summary-row leading, a bubble
  widow guard. Ch6's reviewers hit the summary leading (C10, C30) and one-word last lines (C25, C30). [recommend: pin ch6 to the
  newest head ONCE at step 6, then re-check all six; needs the owner's word]
- AI mode: toolApi.next() during a guide jumps to question 2 (C30 play test) — this is the runtime's documented AI contract
  (check() is the step verb; next() moves on), per the ch7 session: not a defect.

- Counters differ by tool (bead C5/C15/C25, button C10/C20, laddoo C30) [keep: each matches its own brief].
- C5 Divide Ladder: a rung step takes ~3.3 s at the 1.5x act tempo, a 5-step climb ~17 s [keep 1.5x as chosen].
- C25 Overlap Rings: plan practice 6 (common factors of 30, 45, 75: a third ring) dropped for 3 questions a phase [keep dropped:
  the textbook uses two numbers; alternative: drop 20/34, which repeats ML1's skill].
- C25: the factor lists are supplied in every question (Fill only in the warm-up), so the child spots shared cards rather than
  listing factors [keep: listing is C5/C10's job].
- The 40-skins-a-screen cap (`skins` check, lib/check/check.mjs:658; IMAGES.md §2) leaves most QUESTIONS of this chapter with plain
  counters (45, 57, 65, 68, 78, 100, 112, 126 ... all > 40); the real objects show mainly in warm-ups and small numbers. Tools skin
  all-or-nothing per group so a board never mixes. [recommend: allow more (e.g. 120) for ONE small tile key repeated as counters —
  one data URI reused, little size cost; it is a shared check rule, so the owner's word + a step-6 lib edit; built to 40 meanwhile].
- Gujarati "multiple": ગુણિત in C15/C20/C30, અવયવી in C25 and in the old Sep (live) tools; અવયવી is one matra from અવયવ
  (factor) [chapter term ગુણિત; C25 switched; a native speaker confirms the chapter glossary: गुणनखंड/અવયવ, गुणज/ગુણિત,
  विभाज्य/ભાગી શકાય, भागफल/ભાગફળ, शेषफल/શેષ, place-value abbreviations ह स द इ / હ શ દ એ].
- C25 Overlap Rings P4 Q1 labels: RESOLVED 2026-10-20 -> "not a multiple of 9" / "not a factor of 74" (en/hi/gu, fit checked, 95/0/0).
- The word "pen" for a factor list (plan's word, in C5 "factor pen", C10 Pair Pen, C15, C20): a reviewer says a Class 4 child reads
  "pen" as a writing pen [keep chapter-wide: it is the plan's word and the picture draws a fenced pen; rename only chapter-wide].
- C30 Digit Tester: P2 digit totals: a right total wins even with cards still up; a wrong total is a normal miss (counts a try)
  whose replay brings every card down and ends on the right total; the yes/no item stays gated [chosen over a hard gate, which
  blocks the keyboard row; the runtime cannot hold a typed question's Answer blink until the act is done (runtime-gap list)].

## Known small leftovers (no further review round: token policy, 1 round)
- C15 Multiple Track: the P3 learn question "Is there a last multiple of 11, one that nothing comes after?" wraps to 3 bubble lines ending on "after?".
- C20 Fact Both Ways: on a P4 list miss the pen's two rows (child's picks + ghost right list) have touching left walls (read as one tall bar), and the candidate row slides down 44 px.
- C30 Digit Tester: the review pack is older than the last small fixes (no further visual round planned).
- REVIEW COVERAGE (adaptive policy from 2026-10-20; the orch review-done records mean "the round ran", not "every final byte was re-viewed"):
  maths review + a changes-only maths re-look on all 6; visual round 1 on all 6 (round 2 changed-frames only on C15 and C30);
  play tests on C5 C10 C15 C30 (round 2 on C15 C30); C20 and C25 had NO play test (followers, no risky interaction) — their
  fixers applied the chapter's play lessons instead (they found and fixed the same AI-value filter in C20 FbPairs/FbLists).
  Fixes verified only by the builders' own real-input replays + full check (not re-run by the reviewer that found them):
  C5 dead ladder after Enter mid-flight; C10 wrong AI list marked right. Never re-viewed after their fix: C25 hi/gu wraps
  (p1-end, p4-end, p4-win), statement spacing and ghost flags; C20 measured gu sentence rows, bigger counters, pen walls;
  C30's pack predates its last small fixes.
- PLAN ORDER changed only because of the pad-shape check gap: C10 P1 opens on "65 counters in 5 rows" (typed) before the 4 x 17
  choice; C20 P2 opens on the typed 46 before ML2.
- orch.mjs audit's "sidecar n" column is a path bug (it looks for output-preview/<id>.json, not output-preview/<chapter>/<id>/<id>.json);
  the sidecars exist and the publish dry run validated all six.
