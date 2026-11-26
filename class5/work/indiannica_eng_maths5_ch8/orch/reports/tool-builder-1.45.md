STATUS: done · SLOTS: M3.S4.T9.C41.2D1 · CHECKS: full 99 PASS / 0 WARN / 0 FAIL (4 full runs: zones "2 high" off-left on phone, then wrong-is-unmarked ×-spacing twice), ported
MUST-FIX 1 gate: FIXED. markReal() calls api.lock(true) synchronously when the question still needs its act, so the r66 act keeps the lock; hold() re-locks after each awaited act that did not finish the question. Proved with real input (gotoStep to each question, every act but the last, then digits + Enter or Answer + No): P1 Q3, P2 Q1-Q3, P3 Q1-Q3 (Q3 Yes/No), P4 Q1 (Multiply first), P4 Q2 (lens first), P4 Q3 (Yes/No). Results: mouse with motion ON 10/10 held; mouse with reduced motion 10/10; finger with motion ON P2 Q1, P3 Q3 and P4 Q3 held. The key stays dim, typing is refused and the score stays 0 until the last act; then the key goes live and the right answer wins. Keyboard only (P2, motion on and off): warm-up by Enter, Tab to the handle, Enter; layers 1-3 key off plus the nudge, layer 4 live, 264 wins.
MUST-FIX 2 ring through the labels: FIXED. The count invite is now a blinking outline 7 px outside the base layer's own hexagon, drawn under the label layer; labels at 40 px, moved out. Measured gap from ring to label (en/hi/gu): long 38.7/38.2/38.6, wide 40.8/39.3/40.8, high 19.1/18.1/18.8 units.
MUST-FIX 3 violet: FIXED. LS_VIO #5B47D6 laid UNDER the face light at 0.84-0.88 over the skin (P1 base cubes, start page) and the plain faces, on every layer, P2 layer, P3 confirmed solid and free-play cube. Sampled face centres (HLS): P1 38 faces hue 249-254 sat 0.40-; P2 9 faces 249, 0.40; P3 correction 19 faces 249 (the 168 samples are the green lit edge lines); free play 249, 0.40.
P2: labels 32->40 (all phases; frame x 172 w 438 so hi/gu stay on stage). Units read-out is now a plain 40 px label. Invites in a question pulse twice and rest (no Infinity ring) and are hidden while the keypad is open; guide steps keep the runtime Invite.
P3: Cuboid chip 248 wide. Working lines: the sign rides on the number before it ("7 ×", then "5"), even spacing. Closing "side×side×side" (no break at a sign). hi/gu TR: every " × " -> "×", so no hanging sign. "Layer" label (32, amber, en/hi/gu) on the lit layer in every traceback. Rows 58 apart (1.45 em) clear of the bead. Grid lines 2 px or more.
P4: the 2nd tenths edge keeps its value: the dark lens is smoked glass (see-through, same ring) over that edge's label showing "1.5 cm". The lens sits centred on its edge label. Readings stay at the label's own place ("25 tenths" 40 px clear of the edge). Taught later card 262 wide at y 150, clear of "25 tenths" and the open drawer. "tenths" amber in the correction. Lens word 32 in every language.
Free play: plain violet faces only (no half-skinned stack); the frame follows the base at the full height (bigger: 4x3 is about 14% of the area, was 3%); handle dimmed at its maximum; disabled keys keep a half-strength label (Multiply too).
Summary thumbnails: each question's own solid (violet layers, plain grid or carton) plus the child's answer (264 / cu. cm; No / Cuboid; No / Later).
Play tester:
(a) A hardware digit, Enter, Escape or y/n while gated shows the same nudge; Enter on the handle, bead, lens or a key is still that act.
(b) Only upward drag travel stacks: a drag down or sideways adds 0, up 170 px adds 2 (measured).
(c) gotoStep mid-act: busy is reset on the question change; the handle is back at once (measured).
(d) Two Enters 50 ms apart with reduced motion make one step (measured).
hi "पहले गुणा दबाओ।", gu "પહેલા ગુણો દબાવો." (and the 2-act line). The nudge clears (the question comes back) when an act changes what is waiting. No nudge while an act runs. Only a trusted Enter counts as a touch.
NOT fixed:
- untouched-question gate and the slot emptied after a miss (rule 6: keep).
- free-play dim Answer key, focus to BODY after Enter, gu Yes/No key size, gu header (runtime).
- P2 box not enlarged: height-bound at 4 layers; it is about 45% of the area.
- P1 question: stacked layers are now violet like the base, as decided.
New TR keys: "Layer" परत/થર, "Later" बाद में/પછી; P2 Q1 hi shortened to "11×6×4 सेमी के डिब्बे में कितने घन सेंटीमीटर हैं?". tr-coverage PASS.
