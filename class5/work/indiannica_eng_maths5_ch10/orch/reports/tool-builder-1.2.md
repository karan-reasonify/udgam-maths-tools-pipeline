STATUS: ok (full check 98 pass / 0 warn / 0 fail; PORT REFUSED, a plan url problem, see ESCALATE)
SLOTS: M1.S2.T3.C9.2D1 Big to Small Converter (class 5 ch 10, r66 silent; 2 full checks used of 6)
FILES: work/indiannica_eng_maths5_ch10/M1.S2.T3.C9.2D1/tool.tsx (preview: same folder, M1.S2.T3.C9.2D1.preview.html)
CHECKS: quick clean; full #2 = 98/0/0. Before it, full #1 had 4 FAIL (board-fit, no-overlap, summary-thumbs, one-line-bubble), all fixed. sheet-ask and sheet-wrong looked at.
PHASES: the unit ladder (days/hours/minutes/seconds, unit facts in violet) at the left. One key at the bottom centre; its label follows the act.
 P1 days to h: Break down (a knife splits each blue day bar into a row of 24 hour cells), then Add (a hand carries the leftover tray in). Type the hours.
 P2 h to min, and P3 min to s: the same acts with rows of 60. P3 Q2 (6 min) is Break down only. P3 Q3 (1 h 5 min) is a chain: Break down, Add, Break down again (65 rows of 60 s).
 P4 part of an hour: a 60-cell hour bar. Break down (whole hours, when there are any), then Cut (knife into den parts), then Shade (pencil, marks:true). Q3 is a choice: "2 3/4 h" / "150 min".
 Every phase opens on a WARM-UP via 2 guide steps: 2 d 4 h, 2 h 15 min, 3 min 20 s, 1/2 h. None of these is an answer.
GATE: every question is gated; there is no ungated one. Acts: P1 Q1-3, P2 Q1-3 and P3 Q1 are break+add; P3 Q2 is break; P3 Q3 is break+add+break2; P4 Q1 and Q3 are break+cut+shade; P4 Q2 is cut+shade.
 - The lock is applied in user mode only, after a real key press, and re-applied after each act (an act's end restores the lock it found).
 - playkit real clicks on P1 Q1: Answer key off before any act, still off after Break down, on and blinking after Add.
ANSWERS: following the owner's decision, each typed answer is a one-box unit-label parts slot (hours|h, minutes|min, seconds|s). No question in this tool has a mixed answer.
 - Words in the working line: "9 × 24 h + 5 h". The product and the total are left to the child. The total appears in green only at the win and in the traceback.
 - Traceback: the acts replay in steps (650 ms each), the from-rung's unit fact is lit violet, and it ends on "= 221 h" in green. Unmarked, pointerEvents none.
DECISIONS / departures from the brief:
 - An Add key instead of dragging the tray.
 - Cut + Shade keys instead of a free fraction shader.
 - One generic step-by-step traceback, not a picture per misconception.
 - No "Given/Answer/Regroup" word labels; colour plus the written values carry them.
 - Plan ladder "tries" rewritten as real rungs. learned/closing shortened to fit 72 characters / one page.
 - P3 Q3's say keeps the plan's "change the hours to minutes first".
 - No running count (keyOnly has no runs zone). Picture laid out from the 900 open width so nothing jumps when the pad opens.
 - Skin "tray" drawn over the leftover tray. It is the only picture images.json made.
 - Free play: Unit / More / Break down; FREE_LINE matches what is offered.
RISKS:
 - TR is empty; the language pass is still to come. The win lines live in item.win (data), so add them to TR by hand: tr-coverage will not list them.
 - The Thumb hides units in hi/gu until TR has them.
 - P3 Q3 draws 65 thin second-rows (a dense block).
 - guide.answerGate sidecar note: port has no field for it (lib/ship/port.mjs never writes it). It needs a pipeline fix or a hand note after port.
ESCALATE:
 - port failed: the plan's 2d_tool_url for this mount ends .../2dtool/M1.S2.T3.C13.2D1/M1.S2.T3.C13.2D1.tsx, not C9. The url names another mount's id. This needs a remap or plan fix by the main session; nothing in tool.tsx can fix it.
 - QUESTION: P4 Q3's choice keys and the Thumb print a slash fraction "2 3/4 h" (runtime choice text; PATTERNS §3 bars slashes in the picture). Keep it, or label the keys "the hours" / "the minutes"?
