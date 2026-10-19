# Class 5 ch 9 Measurements — build notes (updated 2026-10-18 20:05 IST)

Plan v2, 9 tools, runtime pinned **r65** (r55 -> r56 -> r57 -> r62 -> r63 -> r65, each on the owner's word; BUILD_CARD §7 rows). r65 = r64 + the wrapText fix, the one step-6 move (2026-10-18 19:15).
Owner answers (2026-10-17): right chapter; all 9 at once (no pilot); class 4 ch 8 input rule (Decimal card where the
picture has one, point key where placing the point is the lesson, unit-symbol two boxes); FULL mode.
Nothing uploaded. Every tool: staged review CLEAN; behaviour on r65 re-probed (miss->next, teacher answer after next, re-entry on all 9: C5/C10/C20/C45 fixed for away-and-back, 20:42 PASS), full check 0 FAIL 0 WARN on r65 (2026-10-18 19:47), r65 changed frames looked at (63, clean), upload-auditor dry run 9/9 ready (0 lp2_media rows), `clean --ch 9` done. **PUBLISHED 2026-10-18 20:57 IST on the owner's word**: all 9 uploaded (md5 stored + public ok) to learning_plan_assets/V2/cbse/indiannica/english/class_5/mathematics/ch_9/2dtool/<slot>/, 0 lp2_media rows. The 6 owner questions below are still open.

## Where each tool stands (staged review, step 5d)
| slot | tool | check | 5d state | next |
|---|---|---|---|---|
| M3.S4.T6.C25 | Unit Column Adder | 94 | **CLEAN** (visual R3 + play R2 clean) | — |
| M3.S5.T9.C40 | Rounded Chart Estimator | 95 | **CLEAN** (visual R3 clean; play strongest-rung PASS 2026-10-18 15:38) | — |
| M1.S1.T2.C5 | Chart Builder | 93 | **CLEAN** (visual R4 + play R3, 2026-10-18 15:50; accepted: hi two-line fact thumbs sit 3 px under the thumb top) | — |
| M2.S2.T4.C15 | Right Hop Converter | 94 | **CLEAN** (visual R4 + play R3 clean, 2026-10-18 15:41) | — |
| M3.S4.T7.C30 | Smallest Unit Multiplier | 94 | **CLEAN** (visual R4 + play R2 clean, 2026-10-18 15:36) | — |
| M2.S2.T3.C10 | Left Hop Converter | 92 | **CLEAN** (visual R3 + play R2 clean, 2026-10-18 18:20; nits left: hi डेकाली 5 px from the cell edge, p3 gap ring crosses digit edges) | — |
| M2.S3.T5.C20 | Same-Unit Comparer | 95 | **CLEAN** (visual R4 + play R2 clean, 2026-10-18 18:50; bar tap guard = same spot within 0.5 s) | — |
| M3.S5.T8.C35 | Thermometer Reader | 95 | **CLEAN** (visual R3 + play R2 clean, 2026-10-18 18:18; accepted: hi/gu word-key size = runtime fit) | — |
| M3.S6.T10.C45 | Three Ways Recorder | 95 | **CLEAN** (visual R3 + play R2 + spot-check clean, 2026-10-18 19:02; refused Enter nudges; teacher answer() does the working first) | — |

Steps 6-8 DONE 2026-10-18. Nits left (r65 look): compound measures break between units in bubbles ("3 kg / 90 g", each number keeps its unit); C30 p1-wrong-hi labels a few px from borders; C10 p3-win-gu a dashed empty-slot edge peeks left of the "5" card; C5 p4-step1-gu one word alone on line 3.

## Owner questions for the report
1. C35 phase 3 (TR3, item 3): the plan's numbers let the misconception's whole part pass (10 ÷ 4 typed as "2" is right). Interim: point key on, near "2.5"/"1.25". Move these items to a gap of 25/30 (changes plan answers 2 and 1)?
2. Unit-fact card ("1 kg = 1,000 g") always on screen as the plan draws it, or only in warm-up / win / after a miss (raised by C25, C30, C45 reviewers)? Kept as plan.
3. Chapter glossary (native speaker): "unit" इकाई (C5, C15, C30) vs मात्रक (C20, C25, C45); decimal point दशमलव / बिंदु / दशमलव बिंदु and gu બિંદુ vs દશાંશ ચિહ્ન; gu દશાંશ = decimal AND tenths; gu terms flagged: મિલિ, કિલિ, સેગ્રા, મૂળ એકમ, પૂર્વગ, જૂથ બનાવો, કાપો, ગાળો, માપક્રમ, વદી, ક્ષમતા vs ગુંજાશ. One sweep once answered.
4. C20 phase 2: both Yes/No answers are Yes (no unused plan item has No); an authored "Is 6 m 5 cm the same as 65 cm?" could replace Q2 (not recommended).
5. C5 milk jug stays a plain drawing (other tray things have pictures).
6. C20: the axis starts at a round base (break mark + label) keeping the shortest bar >= 25% of the tallest, so bar heights run about 3:1 for values about 1.4:1 (p4: 1,410 g vs 1,004 g). No ratio wording anywhere. Accept?
7. Plan departures to list per tool (C10 tag gate restored, C15 pointKey off + ph4 Q3 authored, C25 practice C27:3 dropped + ph4 Q3 authored, C45 child does one conversion by chips + reads the jug via a zoom window, C35 no 'bubbles' Delight from the brief (boiling water shows steam), etc.).

## Runtime / pipeline gaps (for the report; a final runtime ask is planned)
- FIXED in r65 (pinned at step 6): r64's five play fixes + `wrapText`/`pieces` no longer split a number from its unit (NBSP kept, a number keeps the next word).
- The one "teach" frame still shows the previous phase's bubble line and `guideStep` (runtime half).
- No hint possible during the last guide step's hold (demoMiss reads past the last step) (C25).
- A tool cannot re-raise a hint as a hint: `api.say` sets the instruction (C40, C5).
- Answer-box label Devanagari sits on the box top (LAYOUT §4) (C5 "1 डेसीली में").
- hi summary page heading / "तुमने सीखा" pitch too tight (C40, C15).
- `cake` preset word-key ink fails text-contrast (C35 works around with `tqTheme()`).
- Free-play header keeps the last phase's concept (C25). Classroom ph4 closing shown 4.5 s (C15).
- `summary-thumbs` checks hi/gu before any TR exists; `labels-short` splits on NBSP; stale-answer guard vs a working-area tag (C10 used `api.setTyped("")`).
- `images make` bills before the Chrome cut (fixed upstream by `chromePath()` on Linux). $1.68 image spend for the chapter.
- PATTERNS §18: four ch 9 traps added (teach frame -> warm-up at step 0; passive-effect reset; win picture at idle).

- (2026-10-18) Keyboard focus is lost after every act (Key blur / Hit unmount) — runtime-wide (C10, C30).
- (2026-10-18) Enter with the second box of a two-box answer empty says nothing (C10).
- (2026-10-18) No shared script-aware text-width helper: each tool writes its own and most undercounted Devanagari spacing vowel signs (C5, C10, C15, C20) — PATTERNS §18 now gives the zero-advance list.

- (2026-10-18, r65 probe) `gotoStep` to the SAME missed question during its correction: the replay stops and tries is 0, but the miss hint stays in the bubble and the answer panel stays open (C10, C25, C35; still answerable). r63 keeps the board for a gotoStep to the question still in ask, so the runtime half stays.
- (2026-10-18, r65 probe) r64's `enterItem` bumps `workN` only when the target is the CURRENT question, so an away-and-back (Q2 -> Q3 untouched -> Q2) keeps the same Work: a tool whose board reset is not keyed to the question entry redraws the old correction / the child's old marks (C5, C10, C20, C45; fixed in each tool). Runtime fix for a later pin: bump `workN` on any entry to a question already visited.
- (2026-10-18) The summary thumb is a fixed 66 tall: two lines of hi text at the 28 floor fill it to 3 px (C5); a taller thumb, or a runtime fit, would help.

## Env
CHROME_PATH=/root/.cache/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell ·
C4_FONTCONFIG = a fonts.conf pointing at Poppins TTFs (copy class4/assets/fonts/*.ttf to the session scratchpad) · C4_CHROME_POOL=1 ·
Bash sandbox off · udgam5-* agents are not registered from a Tool_Pipeline-rooted session: launch general-purpose agents told to
follow `.claude/agents/udgam5-<role>.md` (builder opus, reviewers sonnet).
