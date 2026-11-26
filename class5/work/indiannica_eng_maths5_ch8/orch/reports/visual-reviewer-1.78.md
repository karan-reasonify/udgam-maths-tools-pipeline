STATUS: fixes-needed
SLOTS: M3.S4.T9.C41.2D1 (re-look, changed chunk 1: start + phase 1)
FILES: none (report only; own play-vr178 PNGs and scratch files deleted)
CHECKS: 27 changed frames + 3 party frames at full size en/hi/gu; 5 timed step-1 frames; P1 Q3 ask at 0.3/1.6/5 s en+gu; no console errors
FAILURES: 0 must-fix; 2 should-fix (1 partly open, 1 new); 2 low questions
DECISIONS: none
RISKS: none
ESCALATE: no
REPORT: work/indiannica_eng_maths5_ch8/orch/reports/visual-reviewer-1.78.md
C41 Layer Stacker RE-LOOK chunk 1 (start + P1) vs visual-reviewer-1.31 and tool-builder-1.45. Unchanged since round 1: p1-again x3 (sameAs step1).
fixed: ring through labels; base cubes not violet; bold x spacing; edge labels 40 px; stacked layers violet like the base.
[FIXED] must-fix p1 step1/stepwrong, en/hi/gu - the ring is a blinking outline hugging the base layer (~7 px out), under the labels; over 5 samples it blinks in opacity only, never changes size; nearest label gap "2 high / 2 ऊँचा / 2 ઊંચો" to ring tip ~18 px, "4 long" and "3 wide" ~45 px; no label crossed.
[FIXED] must-fix start + every P1 frame, en/hi/gu - sampled pixels: skinned base faces hue 249-255 sat 0.40-0.49, plain upper faces hue 249 sat 0.61, start-page cube hue 254-255 sat 0.40-0.49: all violet, no rose, matches the "violet cubes" bubble.
[FIXED] should-fix p1 wrong/win/end/party, en/hi/gu - "7 × 5 = 35", "2 × 35 = 70 cubes", "9 × 2 = 18", "3 × 18 = 54" evenly spaced; hi/gu unit words clear, nothing touches the area border.
[PARTLY] should-fix p1 ask-shut/ask-open/win/end, en/hi/gu - labels now 40 px (was ~32), but the picture is unchanged (7x5 base ~440 px wide, ~28% of the working area) and the result lines "2 × 35 = 70 cubes" / "9 × 2 = 18" are still ~40 px, not 64 (LAYOUT 3); with the pad shut the right ~45% stays empty - scale picture/result line up, or state it is height-bound.
[should-fix, NEW] p1-end-en.png + p1-party-en.png - bubble "One layer has length ×" ends line 1 on the sign (break after a sign, fix-rules rule 2) - tie with no-break spaces so the sign never ends a line; hi/gu use the tight "लंबाई×चौड़ाई" / "લંબાઈ×પહોળાઈ" and do not break.
[question, NEW low] p1 step1/stepwrong, en/hi/gu - the ring's right vertex (x 657) is ~10 px from the Height handle disc (x 667): nearly touching, no overlap. Move the handle ~15 px right, or accept?
[question, NEW low] p1 wrong/win/end/party, en/hi/gu - the skinned base layer shows diagonal triangle lines on its side faces, the plain upper layers show square cells: two textures, both violet. Intended by the skin rule? Judged acceptable.
[cosmetic] gu p1-wrong: "7 હાર." alone on bubble line 2 - fix only if a shorter TR line does it for free.
Not re-raised (rule 6/runtime): empty slot after a miss; berry Answer key at an untouched gated question (Q3 played: handle invite pulses twice then rests, Answer stays berry); gu header size; Next key from nextKey.
Clean: start pages x3 (berry Start, Kiko, no English in hi/gu); step bubbles hi/gu matras clear; ask-shut vs ask-open at one fixed size and place; Kiko thinking at untouched asks, standing at win; Answer/Close/Next/Next phase keys fit hi/gu; party frames (Kiko cheering, cone beside bubble, sparkles clear); no red or cross after the miss, correction shows the whole answer. Chunks 2-4 (P2-P4) not looked at here.
