STATUS: ok
SLOTS: M1.S1.T2.C6.2D1
FILES: none kept (no screenshots this round; my earlier play-p127-*.png are gone; scratch deleted); no tool edited
CHECKS: playkit real input, current build (tool.tsx 23:54, preview 00:00), 201 question runs (en/hi/gu, reduced + real motion), 0 console errors, 0 session errors
FAILURES: 0 (the earlier must-fix and should-fix are FIXED)
DECISIONS: none needed from the owner
RISKS: none seen; keepFocus now only focuses an act key (walk/cm/lots/shape), else blurs the board
ESCALATE: no
REPORT:
play-tester-1.27 re-run | C6 Edge Walker | VERDICT: CLEAN. The P3 keyboard focus bug (must-fix P3 Q2, should-fix P3 Q1/Q3) is fixed; the merged result replaces my first report.
1 P3 Q2 keyboard (Tab to `length`, Enter, then Enter), en/hi/gu x reduced + motion = 6/6, Space as the act key 4/4: tag stays "s1", ONE act, focus = body at +60/+400/+760, the Enter submits: win, tries 0, firstTry (no TAG-CHANGED, no second act, Enter keydown target body).
2 Q2 after a mouse or finger tag with stale Tab focus (focus on side-1 first): 12/12 (en/hi/gu x M/R x mouse/finger), same result.
3 P3 Q1 and Q3 keyboard, 6/6 + Space 4/4: after Tab+Enter on the long side focus is body at +60 and `walk` at +400 (was side-1); the next Enter walks with ZERO Tabs (tabs0), then digits + Enter win (34, 48); focus body after the walk.
4 Regression, all submit (typed digits kept, right answer wins, tries 0, Enter target body, 0 console errors): P1, P2, P4 keyboard (en motion; en/hi/gu reduced; focus walks cm -> walk / lots), mouse, finger (en reduced, gu motion mouse), P3 mouse/finger plain 24/24, typing 30 ms after the act (stale mouse and keyboard) 21/21, nudge 15/15 (nudge line shows, stray digit dropped), pad opened after the act then digits by pad or keys 9/9, pad open before the act (gotoStep) 3/3. Mouse/finger acts never left an act key focused.
