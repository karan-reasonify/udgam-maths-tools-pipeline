# weighing_bench (M2.S3.T5.C20.2D1) PLAY TEST round 1 (udgam-play-tester, 2026-10-21; en/hi/gu; headless shell)
Verdict: no must-fix. Nothing unplayable, no right answer marked wrong, zero console errors, incl. a 220-action random-input run (mouse, finger, keys, double taps; motion on) that still finished the lesson.
Clean: doubles/holds count once everywhere; Phase 1 Enter blinks only when every thing is in a tray and stays dead after a miss until the child's own move; eraser correction OK; hint ladder monotonic; pad lock 2.2-4.9 s;
phase 2/3/4 typing, corrections and Backspace OK; free play cap line prints every time, counter regroups; party/Next/dots/Escape OK; classroom OK; summary + finished fire once; hi/gu show no English; AI mode OK.

## SHOULD-FIX (tool)
1. Dropped taps with no queue and no sign: the `playing` guard ignores any tap during a carry (~1.7 s). Repros: free play, 10 taps on pile-g 700 ms apart add 5 weights (100 ms apart: 1-2); phase 1 Q2 (motion on) click `onions` then `tray-kg` 120 ms later: the tray tap is lost and the onions stay on the pan;
   phase 1 after the last guide step (keys into tray-g) taps on `cement` are lost for ~1.6 s until the question opens and the old line 'tap the grams tray' stays up; phase 4 a `zero-t` tap during the `zero-h` pencil is lost; the Hint key mid-carry shows 'Tap the keys on the shelf.' while the keys already move.
   Fix: queue the tap (or accept it as soon as the carry ends) or show a visible 'busy' cue; make the stale guide line clear when the step is done.
2. Phase 1 Q1/Q2: Enter (tap or key) does nothing visible unless every thing is in a tray (open Q2, tap Enter with nothing in trays, then with only the letter in grams: hint stays null, bubble unchanged). Tapping a tray with nothing lifted onto the pan also shows nothing. Give a hint line for both.
3. Phase 4 place board vs long typing: the single box takes >= 7 digits but the board has 5 boxes. Q1 type 7900001: the board shows 0 0 0 0 1 (leading digits vanish). Q2 (gotoQuestion(4,2)) type 300008 + Enter: the child's own upper board is empty (label '3,00,008 g' only) so the traceback drops the child's number. Cap typing at 5 digits, or draw the whole number.
4. Phase 3 correction heap overflows when both boxes are large: Q1 type 9999 | 9999: the green g heap stacks on the blue kg heap and 'and more' overlaps the header title; Q3 type 1234567 | 9999999: the column leaves the canvas and the screen top and the label '12,34,567 kg 99,99,999 g' is clipped at the left edge. Single-box cases (63, 254, 6385 kg) are fine. Phase 2 Q3 with 9999999 is tight ('and more' touches the canvas top, heap covers the beam's right arm). Cap the typed length per box and/or clamp the heaps inside the canvas.
5. (visual note) phase 1 eraser correction: the child's faint eraser in the kilograms tray sits behind a lighter rectangle that overlaps the cement bag (same as visual item 8).

## RUNTIME GAPS (logged in NOTES.md by the main session; NOT frozen)
6. Keyboard: focus falls to BODY after every Enter/Space act incl. the Answer key, so each next control needs Tab from the top (~10 stops to reach `tray-g`); Tab order and Enter/Space on every control otherwise work.
7. `pressPart` ignores Enter on an EMPTY last box (nothing drawn, no 'Type your answer' hint, only the caret): the brief's phase 3 wrong #2 ('5 kg and stops') can never fire; the tool's traceback would handle it.
8. AI mode only: `toolApi.gotoStep` to the already-open question mid-replay resets tries to 0 and typed to '' but the old miss's hint stays.

## QUESTIONS
9. Leading zeros count as right (02|750, 2|0750, 05000, 030008, 0030008 for 30,008): a judge rule shared by the runtime (compares numbers); owner-level.
10. Phase 4 Q3 ('a child wrote 4,070 g as 4 kg 700 g') opens with the place board already showing 4 | 0 7 0: the given number, not the answer, but it makes '70 g' easy to read; the maths reviewer accepted the picture in look 2.
