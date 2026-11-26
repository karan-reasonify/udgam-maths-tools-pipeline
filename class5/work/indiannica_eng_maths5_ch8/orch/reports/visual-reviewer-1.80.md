STATUS: fixes-needed (minor)
SLOTS: M3.S4.T9.C41.2D1
FILES: none (report only; my play-rv180-* shots and scratch deleted)
CHECKS: all 30 changed pack frames of chunk 3 (phase 3, en/hi/gu, full size) + real-input playkit walks (motion ON): item 1 wrong 81 and item 2 wrong 100 in en/hi/gu (10 frames each), DOM probes of animations and stroke widths, pixel sampling of faces
FAILURES: 0 must-fix, 1 should-fix, 2 questions
visual-reviewer-1.80 | C41 Layer Stacker | RE-LOOK chunk 3 | verdict: ISSUES (0 must-fix, 1 should-fix, 2 questions)
fixed (vs 1.33): 
- bead ring FIXED: live probe shows c4pulse iterations 2, gone by +9.5 s; only the Answer key's c4nextblink still runs, no ring left on the bead (shot at +7 s); hidden with the keypad open. (The pack's pale ring is the reduced-motion sample.)
- Cuboid chip FIXED: p3-choice-wrong-en / p3-end-en, word ~207 px in a 248 px chip, clear both sides; hi/gu fine.
- working-line signs FIXED: "9 × 9 = 81", "9 × 9 × 9 = 729 cu. cm", "10 × 10 × 10 = 1,000 cu. m" evenly spaced in en/hi/gu (wrong, win, end, choice-wrong, item 2).
- "Layer" label FIXED: motion-on traceback, amber 32 px label at the right of the solid, level with the lit layer, rises with it, en "Layer" / hi "परत" / gu "થર", item 1 and item 2, clear of the 9 cm / 10 m labels (>= 60 px); gone once the Cube chip lands.
- Hindi line vs bead PARTLY (see should-fix): no longer touches, gap 8 px.
- violet FIXED: sampled top/left/right faces of the confirmed cube and the stacked layers hue 249-250, sat 0.39-0.61 (reads violet, not mauve); lit layer amber, edge lines green.
- bubble breaks FIXED: end-en "side×side×side." on one line; end-hi, end-gu; choice-hi/gu "6 सेमी×6 सेमी×4 सेमी" no hanging sign.
- grid lines FIXED: interior lines measure 2.0 px (48 lines), outer 3.4 px, dark ink.
- gu Yes/No key size: NOT fixed, runtime chrome (KEEP list), not re-raised.
[should-fix] p3-choice-wrong-hi.png, p3-end-hi.png - the Hindi working line "6 सेमी, 6 सेमी, 4 सेमी" is clear of the Edge bead but its headline is only 8 px under the bead's lower edge (x 440-470, bead bottom y 508, ink from y 516; gu 14 px, en 29 px). Rule 1 wants >= 12 px in the longest language: drop the working pair 4-6 px (paper has ~20 px spare under line 2).
[question] "Layer" label size, all languages, p3 traceback: 32 px against the 40 px edge labels, and gu "થર" / hi "परत" are short words that read small; the right half is empty (room to x 960). Raise to 40 (LAYOUT "labels 40+") or accept 32 as set in 1.33?
[question] p3-choice-wrong-*.png, p3-end-*.png: the cuboid (Q3 correction) keeps cream faces while the cube in Q1/Q2 turns violet. Fine if "plain tinted solid" means unconfirmed = cream; say if the cuboid should be tinted violet too (1.33 saw it mauve).
clean: p3-step1, p3-stepwrong (en/hi/gu); p3-ask-shut, p3-ask-open (solid same size and place shut/open, labels clear, Answer key berry per the first-touch gate); p3-wrong, p3-win (whole right answer, slot empty after a miss, Next berry); p3-choice, p3-choice-line, p3-choice-wrong (Yes/No in drawer, Cuboid chip, correction rows fit 290 px column); p3-end (Next phase key). Header buttons, berry keys, Kiko thinking pose, hint bubbles 1-3 lines with no matra on the outline, no English left in hi/gu. Console errors: none in any run.
unchanged since 1.33: nothing skipped; every frame of the chunk was CHANGED and looked at.
