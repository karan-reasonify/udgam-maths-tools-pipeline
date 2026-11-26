STATUS: fixes-needed
SLOTS: M2.S2.T4.C16.2D1
FILES: none (report-only; my play-vr171-* PNGs and scratch scripts deleted)
CHECKS: all 30 changed-chunk-1 pack frames opened at 1600x900 (start x3, then p1 step1/stepwrong/ask-shut/ask-open/wrong/win/choice-wrong/hintkey/end in en, hi, gu) + real-flow playkit frames en/hi/gu (string laid, covered, typed 15 win, Q2 hint and wrong choice, Q3 win/end) with pixel measures
FAILURES: 0 must-fix, 2 should-fix, 1 question, 1 nit
REPORT:
RE-LOOK C16 Square Cover, chunk 1 (start + phase 1), visual-reviewer-1.71. Verdict: ISSUES (0 must-fix, 2 should-fix).
FIXED (frame + proof):
- Rope over the tiles: FIXED. Real flow en/hi/gu (q-string-laid, covered, win) the rope lies outside the 5x3 card and the 15 tiles measure 100-104 px each along the whole row (edge ring whole); same on the 3x2 warm-up and the 6x2 Q3 card.
- Bullseye coil: FIXED. Now a hank of three braided rope pieces left of the card (p1-ask-*/step-*), gone once the string is laid; reads as rope. (nit: it sits at the card's top-left, not mid-height; fine.)
- Warm-up card small: FIXED. p1-step1/stepwrong now 464x310 in the question's place (question card 514x309); the right half is empty with the pad shut by design (KEEP rule 6).
- Traceback lilac/no skin + 30px numbers: FIXED. p1-wrong-en/hi/gu: tile-skin squares sampled rgb(133,105,199) hue 258 sat 0.47, identical to the covered tiles and warm-up tiles; counting numbers 32 px ink height (about 44 px type), dark, paper halo.
- Violet unit colour: FIXED on start-en/hi/gu squares, warm-up, 15 and 12 tile grids, traceback (all hue 258).
- Boundary label placement: FIXED in position (p1-choice-wrong/hintkey en/hi/gu: now outside the fence, left of the posts, off the lawn, 21 px clear of the posts); see NEW below.
NOT FIXED / PARTLY:
[should-fix] p1 win (Q1) and Q3 win/end, hi (real flow; pack p1-wrong-hi/win-hi/end-hi the same idea) - the green "क्षेत्रफल 15 वर्ग सेमी" label's matras/shirorekha start only about 2-5 px under the rope's lower edge (measured 5 by threshold; pack p1-wrong-hi 8 px under the vermilion ring); the builder's +8 was eaten because the rope now sits 5 px lower than the old card outline. en has 17, gu 11. Rule 1 asks 12 px in the longest language - fix: move the Area label down about 10 px in hi (3-4 px in gu) or set hi's label top from the rope's outer edge.
NEW:
[should-fix] p1-choice-wrong / hintkey / (real Q2 after a wrong tap) en - the "Boundary" label ink starts at x=46, the panel border is at x=40: 5-6 px clear of the paper edge (rule 1: 12 px). hi सीमा (x131) and gu સીમા (x145) are fine. Fix: shift the garden picture and its labels about 16 px right (the open pad has room: fence ends x800, pad starts x980) or set the label right-aligned to the posts.
[question] p1 pack route still skips the acts: p1-ask-shut/open show an empty card with a live Answer key AND a ringed String key, p1-win/end show an empty card under "Area 15/12 sq. cm". Known/KEEP (first-touch gate); real flow is right (Q1 opens with Answer dimmed after the warm-up, Hint on Q2 gives no label, win shows the covered grid; with timers on the lesson walks to phase 2 itself, the Next phase key only exists on the pack's nextKey route).
[nit] p1-choice-wrong-gu: "છે." alone on line 2 (builder left it as cosmetic, per rule 2).
clean (judged fine): start-en/hi/gu (berry Start key, violet unit squares, Unit square/Boundary labels clear, no clip, no English in hi/gu); p1-step1/stepwrong en/hi/gu (one invite, String ringed, Answer dimmed, Kiko standing, hint alone in the bubble by design, no matra touches the outline); p1-ask-shut/ask-open en/hi/gu (Kiko thinking, bubble 2-3 lines, pad and Close/Enter berry or yellow as designed, nothing under the key corner); "16 cm / 16 सेमी / 16 સેમી" labels 12 px above the rope; Length/Surface labels 15 px clear of the ring in en, hi, gu; Area/Perimeter keys fit in hi/gu; header buttons in all frames; no giveaway before an answer; nothing red after a miss; no English left in hi/gu; console errors none.
unchanged-since-round: none (all 30 frames of this chunk were CHANGED and were opened); party frames are not in this chunk.
