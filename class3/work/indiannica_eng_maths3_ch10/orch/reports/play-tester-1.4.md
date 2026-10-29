STATUS: ok (re-play of my findings done: 1 should-fix, 3 questions, the rest CLEAN). Shots in class3/work/indiannica_eng_maths3_ch10/M1.S1.T2.C6.2D1/play-ph3b-*.png; scratch deleted.
SLOTS: M1.S1.T2.C6.2D1 Read the Clock phase 3 (en, hi, gu, classroom, AI mode, keyboard), real mouse/finger/keys via playkit
FILES: none edited
CHECKS: preview is the rebuilt one (status: check passed 95); no console error in ~12 runs (misses, drags, classroom, hi, gu, AI).
FAILURES:
1. [should-fix] phase 3 Q3.3 (and Q3.2/3.1 Minutes tap): the new nudges "Move a hand first." and "For this question, count the fives yourself." are NOT DRAWN when a miss hint is already up. Steps: Q3.3, drag minute to the 3 (3:15), Enter (miss, hint "Look at the hour hand: at quarter to 8...", ~4 s), then Enter or tap the berry Enter key with no hand moved. toolApi state.instruction becomes "Move a hand first." but the bubble still draws the miss hint (drawnInstruction empty, drawnHint unchanged, same 3 s later): the child sees nothing. Same on Q3.2: miss with 40, then tap the dimmed Minutes key: bubble keeps the miss hint. Before any miss both nudges show correctly (and stay up until the next press, the question text is not re-shown until then). Fix: draw the nudge in place of the hint (or clear the hint) for that press. Shots: play-ph3b-q33-enter-after-miss.png, play-ph3b-q32-minutes-with-hint.png.
DECISIONS (questions):
2. [question] closing of the last question, en: two pieces: "Yes, 7:45 is quarter to 8," 2.3 s (the party) then "because on the left we count minutes to the next hour." 3.7 s (11 words, about 3 words/s, quicker than the 5.3 s of the Q3.1/Q3.2 win lines) then the summary at ~6.0 s. In classroom the pieces also advance by themselves, and a teacher tap during the first piece skips to the summary so the "because..." sentence is never seen. hi/gu show the whole sentence as one line (no split).
3. [question] gesture path still decides 7:45 vs 8:45 (unchanged, Q3.3 now starts 3:00): minute first then hour on the 8 = 7:45; hour on 8 then minute 12 to 9 straight = 7:45, via 3-6-9 legs = 8:45; hour dropped on the 7 at :45 = 6:45.
4. [question] Enter on a warm-up step is limited to one per 400 ms silently (Enter every 200 ms x6 gave guideStep 1,1,1,1,2,2): fine, only a note.
VERIFIED CLEAN:
(1) before any touch, Enter and a tap on the key say "Move a hand first." and nothing changes (tries 0); moving a hand brings the question back; Minutes tap on 3.1 (3.1 via warm-up) and 3.2 says "For this question, count the fives yourself.", view and tries unchanged.
(2) keyboard: Space/Right/Up turn forward and Left/Down back (real keys; Shift+Space tested synthetic, playkit has no modifier) hour 1 h, minute 5 min; Tab leaves every stop (never caught); 3:00 to 7:45 in 8 presses (hour Right x5, minute Left x3, was 16) then Enter wins; Q1.3 pick first Enter picks, second answers.
(3) win lines Q3.1 5.3 s, Q3.2 5.3 s (4.9 s classroom), 11 words, readable; Q3.3's win content is in the closing.
(4) gu 3.3 rung 1 now "...પોણા 8 વાગ્યે શું તે 8 સુધી પહોંચ્યો છે?"; hi 3.2 "...अगला घंटा पूरा होने में कितने मिनट बाकी हैं?".
(5) whole phase in hi and gu, classroom: 4|10, 20, 7:45 right, 4|2, 40, 3:15 miss, same judging, no English drawn; teacher skip during the party goes to the summary; AI mode answer+check works on 3.1, 3.2, 3.3.
(6) negative rect: not seen. (7) Q3.3 starts 3:00; grips apart at 3:15 and each hand drags alone; double tap (touch) on Enter = one try; nothing else broke.
ESCALATE: none
