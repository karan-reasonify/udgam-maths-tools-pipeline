STATUS: ISSUES (1 must-fix, 2 should-fix, 2 questions)
visual-reviewer-1.86 · class 5 ch 10 · M3.S5.T9.C30.2D1 Date Counter · HINDI only · round 4 re-look (pack built 14:21, --changed)
Looked at (full 1600x900, measured from pixels): all 29 changed hi frames: p1 step1, stepwrong, ask-shut, ask-open, wrong, win, hintkey, end;
p2 step1, stepwrong, ask-shut, ask-open, wrong, win, end; p3 the same seven + end; p4 step1, stepwrong, ask-shut, ask-open, wrong, win, end, free;
plus p4-summary-hi, p1-party-hi, p4-party-hi. EXTRA frames (my own walk, not pack frames, nextkey on, hi): p3 q2 ask+win, p4 q2 ask+win, p3/p4 end re-measured.
Not looked at: start-hi unchanged since round 3; p1-again-hi (sameAs p1-step1-hi). Otherwise clean: no red/cross after a miss, no English (digits only), nothing under the
open pad (cards end x 960, pad starts x 980), grids dark and identical shut vs open, bubbles fit (11-13 px under the top outline, 12-23 px between lines), no matra touches a line.
ROUND-4 FIXES (OK / NOT FIXED / PARTLY):
- M3 p1-ask-shut + p1-ask-open "शुरू / 8 सितंबर": NOT FIXED to the 4 px bar. ु hook of शु (x 216-232, lowest ink y 579) vs ि curl of सितंबर (x 201-221, top ink y 580):
  2.8 px apart at >= 60 % ink coverage (2.0-2.2 px counting the faint edge pixels); rows 580-581 clear at x 218-220. They no longer touch, but it is under the owner's 4 px.
  Every other title/value pair in all hi frames is 8-18 px (शुरू over मार्च/अप्रैल/नवंबर/अक्टूबर, तारीख over अप्रैल/अक्टूबर).
- M2 p3-end "दिन 1: 2 जुलाई": OK. Pill outline y 539-617 (76 tall), ink y 556-607: top clear 15, bottom clear 7, left 29, right 24. Other pills: दिसंबर 15 / 18; मई 15 / 17;
  नवंबर 15 / 18; अक्टूबर PARTLY (extra frames only): top 15, bottom 5, see findings. A सितंबर pill is not drawn anywhere in this tool's Hindi flow: not measured.
- Info cards, ू hook to the bottom outline (outline y 626): "2 / 7 अक्टूबर" (p1-hintkey) 6 px; free-play "12 / 23 अक्टूबर" 6; "6 / 10 अक्टूबर" (extra frames) 6; "27 जुलाई" 8; "5 जून" 8.
  Title ink >= 9 px under the top outline (17 for शुरू). FIXED (>= 5 everywhere).
- p4-summary-hi "दोनों: 9, 10": OK, one line; ink y 183-214 in a pill y 168-234: top 14 / bottom 18 / right 40, 10 px from the icon; the other three thumbs 13+ px.
FINDINGS
[must-fix] phase 1, ask-shut + ask-open, hi - info card "शुरू / 8 सितंबर" (bottom-left, x 70-385): ु hook and ि curl 2.8 px apart (2 px at the faint edge), the owner's bar is 4 px and
  this was a must-fix last round; no longer touching, so downgrade to should-fix only if the owner accepts ~3 px - fix: value text 2 px lower (bottom air 17 -> 15) or title 1-2 px
  higher (top air 17 -> 15); the card has room.
[should-fix] EXTRA frames (not in the pack; reproduce with a right answer on question 2): p3 q2 win "दिन 6: 15 अक्टूबर" and p4 q2 win "+10 दिन: 16 अक्टूबर", hi - the अक्टूबर answer
  pill (bottom-left of the working area, y 539-617): the ू hook ends at y 609, the outline starts at y 615: 5 px clear, one under the >= 6 bar (top 15, sides 26-30) -
  fix: the p3-end pill treatment, text 1-2 px higher on ू lines or the pill 2 px taller.
[should-fix] phases 1, 3, 4 (p1-hintkey, p3 q2 win, p4-end, p4-free, p4-party), hi - month-name header pills, not on the round-4 list, first measured now: the ू hook of "अक्टूबर" ends
  at y 177, the pill's bottom outline starts at y 182: 4 px clear; the ई/ै tops of मई, अप्रैल, जुलाई, सितंबर are 5-6 px under the top outline (ink y 119-120, outline edge y 113) -
  fix: month text 2 px up on the ू months.
[question] phases 1-4, ask frames, hi - Kiko is in the thinking pose (hand at chin, eyes up) but no thought puff shows beside his head in any ask frame (reduced-motion frame; a timed puff?).
[question] wrong / win / end frames, hi - violet counting digits in the cells are ~28 px type (cap height 20-21 px); two-digit counts sit 4-5 px from the cell outline ("14" x 925-952,
  cell edge x 957) - LAYOUT asks counting numbers 32+; is 28 accepted for a 58 px cell?
Known-unchanged items (summary spacing, orphan last words, two invites, party cone vs 4th pill, hint-only bubble after a miss) not rated.
Scratch files were in the session scratchpad and are deleted; no pack, source or other chapter was touched.
