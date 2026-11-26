STATUS: fixes-needed (visual verdict ISSUES: 1 must-fix, 2 should-fix, 1 question)
SLOTS: M3.S4.T8.C36.2D1 chunk 4 (phase 4, summary, free play), en/hi/gu, RE-LOOK
FILES: none edited (report only)
CHECKS: all 27 changed chunk-4 frames at full size en/hi/gu + p4-party en/hi; extra playkit frames Q2/Q3 (rest, lifts, typed, win) en/hi/gu, See-through Q1/Q3 hi; pixel hue samples and edge scans; probe images deleted
FAILURES: summary row 4 text "22 unit cubes" overlaps its thumbnail cube (en), touches it (hi)
DECISIONS: pack ask-shut/free berry Answer + ring = first-touch gate artefact (rule 6, real play flat then berry, confirmed on Q2/Q3)
RISKS: resting stack still small (builder NOT FIXED); step-1 stack place differs from the question's
ESCALATE: no
REPORT: work/indiannica_eng_maths5_ch8/orch/reports/visual-reviewer-1.62.md
fixed (vs visual-reviewer-1.26):
- running-count pill FIXED: "22 unit cubes"/"27 unit cubes" inside the green pill, ~22 px each side (p4-end-en, Q2 win en); hi/gu fit.
- second "11" chip vs legend FIXED: chip top y217, legend card bottom y203 = 14 px clear (not ~20; >=12, no overlap) en/hi/gu. First chip vs count pill ~22 px clear.
- resting stack violet FIXED: sampled p4-step1/ask-shut/free left face #7C5CC2 (hue 259 sat 0.53), right #6C4FA7 (hue 260 sat 0.53), top #9379CF (hue 258-261 sat 0.42); matches the legend icon and Unit-cube label; laid/lifted layers violet until the answer, green after.
- legend icon FIXED: 14-16 px inside the card; hi/gu two-line text clear.
- summary thumbnails PARTLY: each row is a cube in its box plus a word (12 cubes / cu. mm / 36 cu. cm / 22 unit cubes), row-1 cube inside its box, row 2 readable size, hi/gu no English; but row 4 collides (below).
- resting stack size NOT FIXED (builder's choice): ~190x285 at far left (x83-273), centre/right empty, p4-ask-shut/-open/-free.
must-fix:
[must-fix] p4-summary-en row 4 - "22" is drawn ON the thumbnail cube (cube x1303-1347, text starts x1319); hi "22 इकाई घन" starts x1351, touching the cube edge; gu clears (x1373) - shift the text right or shrink type/cube so >=12 px clear in en and hi (rows 1-3 fine).
should-fix:
[should-fix] p4-ask-shut/-ask-open/-free en/hi/gu, Q2, Q3 - resting stack ~10% of the working area at the left edge (LAYOUT s3); row ends x945. Unchanged this round; accept only if the owner agrees four side-by-side layers stay.
[should-fix] p4-step1/-stepwrong vs p4-ask en/hi/gu - guide-step stack at x186-382, question stack at x83-273: it jumps ~100 px left when the question starts (rule 5: the demo is drawn at the question's place).
question:
[question] p4-ask-shut/-free pack frames show a live berry Answer key and a ring on Lift layer before any tap: pack artefact (rule 6 KEEP); real play is flat then berry after the lift.
clean: p4-step1/stepwrong (hint alone, hi/gu fit), ask-open (panel clear at x980, 3-line hi bubble clear of the outline), wrong (24 cu. cm, four green layers clear of keypad and legend), win (Next berry), end (Summary berry, Lift/See-through dimmed), party (Kiko cheering, nothing hidden, nothing past the edge), free en/hi/gu, Q2 win 27 unit cubes + three 9-chips en/hi/gu, Q3 lift/win en/hi/gu, See-through violet in hi Q1/Q3, header buttons, berry keys, no console errors.
