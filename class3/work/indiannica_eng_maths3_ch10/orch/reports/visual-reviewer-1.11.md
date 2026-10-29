STATUS: fixes-needed
SLOTS: M1.S2.T6.C28.2D1 (Hindi only)
FILES: none (made play-vrhi-*.png extras in the slot folder; nothing edited)
CHECKS: visual review of all 37 hi pack frames at full size (p1-again skipped, sameAs p1-step1) + 17 extra hi frames play-vrhi-{p1q3-ask,p1q3-open,count-p1q3,grid-p1q3,p2q2-ask,p2q2-open,p2q3-ask,p2q3-open,wrong-p2q3,p3q3-ask,p3q3-open,p4q2-ask,p4q2-open,wrong-p4q2,p4q3-ask,p4q3-open,grid-p4q3}.png
FAILURES: 4 must-fix, 11 should-fix, 4 questions (below)
DECISIONS: none
RISKS: ring, heading and summary-chip faults are language-independent or Hindi-visible on every phase; wording items need a native speaker
ESCALATE: no
MUST-FIX
[must-fix] every frame with a calendar (p1-step1, p3-step1 at 4x: touching; mini calendars p2-ask-shut/p2-win/p2-end: cut) - the ु hooks of the headings बु गु शु are touched or cut by the grid rule under the heading row; शु then reads like श (Fri vs Sat) - give the heading row ~8 px more height / raise the baseline.
[must-fix] p4-summary-hi - thumbnail chip 2 "1 दिन ज़्यादा" overflows under its calendar icon, the "1" is hidden - shorter TR ("+1 दिन"), smaller size or fit the chip.
[must-fix] p4-step1, p4-stepwrong, p4-ask-shut, p4-ask-open, extras p4q2/p4q3 - the invite ring is ~1.5 cells tall: it covers the heading above (श, बु) and half of the digit below (10, 9, 13, 8 cut); on p4q3/p4q2 only one heading shows (सो / र) and the ring hides it - fit the ring inside its cell.
[must-fix] p3-choice-wrong-hi - ghost labels "2042" and "2046" overlap each other and the 2044 pointer ("20422046") on the ruler - stagger them like the 2028..2044 labels or drop them.
SHOULD-FIX
[should-fix] p2-ask-shut/p2-win/p2-end vs p2-ask-open vs p2-wrong - the month calendar has no fixed place: right column pad shut, gone pad open, and after a miss it lands ON a fist (right fist in p2-wrong, left fist in extra wrong-p2q3) hiding photo, marks and leader lines - one place clear of both fists.
[should-fix] p2-win-hi, p2-wrong-hi - a white ring stays on June's dip mark after July's card landed on its knuckle (stale say-along pointer) - clear it or move it to July.
[should-fix] 3-line bubbles / orphan last word: p3-choice, p3-choice-line, p3-choice-wrong ("होगी?"), extras p2q2-ask, p4q2-ask ("है?"), wrong-p2q3; start-hi hook leaves "हैं?" alone on line 2; p2-stepwrong leaves "है।" alone - shorten these TR lines to two lines (about 35 chars a line).
[should-fix] p4-free-hi bubble says "खुला खेल", the summary key says "मुक्त खेल" (p4-summary-hi) - use one term (runtime key = मुक्त खेल).
[should-fix] p2-ask-shut, p2-end placed cards: reph of मार्च and ै of अप्रै touch the colour bar; p2-end mini title "अक्टूबर 2026": ू touches the heading row; p3-ask-shut/p3-end: top matra of "लीप वर्ष" touches its pill edge - add 3-4 px top room.
[should-fix] p4-summary-hi - title/description rows tight (ूँ of ढूँढना, ट्ठ of मुट्ठी touch the next line; room below), thumbnails are one generic icon, the "2045" chip has no label.
[should-fix] p4-wrong-hi, p4-win-hi - thin hop arcs run through the digits 10, 17, 24 - route them along the cell edge.
[should-fix] p1-win-hi, p4-win-hi - week counter shows 3 rows (7, 14, 21) beside "28 दिन" / "4 सप्ताह": the 4th row is never drawn even on the right answer - confirm, else complete the rows on a win.
[should-fix] sizes: mini-calendar weekday letters ~22 px (p2-*), week-counter row labels (7/14/21, "7 दिन") ~26-28 px (p1-wrong, p4-wrong): under the 32 counting-number floor; the panel has room.
[should-fix] start-hi and every p2 frame - fist cut-outs have a jagged thumb edge and a hard tan wrist strip at the foot (photo crop, not the fallback) - feather the edge or fade the wrist.
[should-fix] p1-hintkey-hi, extras p1q3-ask, p3q3-ask - Answer key berry/live while the act key (वर्ष पलटो, सप्ताह गिनो, पीछे 4) is ringed: two invites; rule 13 wants the corner key quiet until the act, the gate locks only after a first touch (CE_TOUCH) - confirm intent.
QUESTIONS
[question] terms for the native speaker: उभार/गड्ढा for knuckle/dip (पोर?); स्तंभ; पट्टी used for the strip AND the dark bar; "दबाते जाओ/दबाओ" (p3-wrong, p3-choice-wrong) vs "टैप करो"; सादी तालिका; आगे = Next key and "आगे 4"; p1-ask-shut "तो वह कितने दिन हुए?" stiff (तो यह कितने दिन की हुई?); "लौटानी" colloquial; headings र सो मं बु गु शु श vs keys रवि..शनि (extra p4q2-open): single letters are weak clues but longer forms will not fit a 64 px cell.
[question] p3-step1: strip is four year tabs (फ़र 2026..2029), not four mini Februaries with a ringed 29 as owner.md says; green 29 ring only on the big page (p3-win) - plan fidelity.
[question] p3-end: unlabeled green "2045" chip beside a ruler marker at 2048; p4-step1/p4-stepwrong: dashed circle in an empty cell after 30 on the September page - what is it?
FINE: keys, month cards and bubble fit (two lines at 44), Start key berry, header buttons, Kiko thinking at asks and cheering in p1-party/p4-party (sparkles clear, poppers placed right), weekday keys fit, Sunday-first, no card prints an asked answer, nothing under the Answer key corner.
REPORT: work/indiannica_eng_maths3_ch10/orch/reports/visual-reviewer-1.11.md
