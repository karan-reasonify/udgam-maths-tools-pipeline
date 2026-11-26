STATUS: done. C36 final small round: items 1-9 applied, nothing else changed. Quick check clean; full check 98/0/0 (1 of 6, reduced-motion renders plus motion-on real input); ported.
SLOTS: M3.S4.T8.C36.2D1 · FILES: work/indiannica_eng_maths5_ch8/M3.S4.T8.C36.2D1/tool.tsx
1 MUST (summary thumbnails): FIXED. The thumbnail cube is now 24 wide, and the words, right-aligned, read "22 cubes" (not "22 unit cubes"). Measured on every row in en and hi, text-left minus cube-right:
- en: 12 cubes 61, cu. mm 71, 36 cu. cm 44, 22 cubes 56.
- hi: 12 घन 106, घन मिमी 64, 36 घन सेमी 34, 22 घन 101.
- gu (phase-4 mount): 22 ઘન 110.
- Every text sits 14 inside its box.
2 P1 frame and apex: FIXED. Headings are 10 higher (baseline 40), the solids start 14 lower (top 84), and the amber frame is drawn 14 above each apex. hi/gu matras gain about 10.
3 Start page front row: FIXED. The open boxes' front-wall wash is now 0.05 (was 0.1), so the cubes behind it keep their violet.
4 P2: FIXED.
- The unit chip moved up and in by 14.
- The grain group is about 2x: ring r 130, grain 48, the 1 mm cube shown at 32 beside the ring. The correction's big cube sits right of the ring.
- The unit-cube choice picture is 1.27x (a 150 -> 190) at the same centre.
- The "1 cu. m" chip moved 42 right and stays left of the drawer (ends at work x 896).
- The hi caption has extra word spacing after the chandrabindu.
5 P4: FIXED, partly.
- The warm-up stack now uses question 1's cube size and slots, so it no longer jumps about 100 px when Q4.1 opens.
- NOT scaled up: four layers side by side at the fixed 900 open width leave no room (the owner's call is still open).
6 Nudge invisible after a miss: FIXED with a pulse.
- The pinned hint has no tool API, so the nudge now rings the targets: both solids for "Tap the box that takes up more space.", the whole shelf for "Tap a unit cube to put it on the card."
- The ring clears on the next real tap.
- Proved en/hi/gu: P1 after a miss, Enter 0 -> 2 rings, a box tap 2 -> 0; P2 after a miss, Enter 0 -> 1 ring.
- No TR change.
7 Two Enters on a guide step: FIXED. A real Enter within 300 ms of the previous one (or a held, repeating Enter) is dropped in a capture-phase window listener while a guide step waits. toolApi, solve() and HOOK.check send no key event and are unaffected. Proved with reduced motion in en/hi/gu: two real Enters 50 ms apart on P3 and P4 move guideStep 0 -> 1 only (stage still demo).
8: FIXED.
- The amber selection frame clears at the win.
- Enter while the focused key is Fill, Count row or Lift layer no longer fires the nudge (that Enter does the act).
- The Pencil/School bag ghost outlines are kept, as decided.
9: The tool has no keepFocus pattern. Dim, disabled and mid-act key labels now use shade(dim, 0.4) (about #5F6670, readable) instead of C.dim.
KEEP held: the violet overlay method, answer green, the "1 cu. m" chip clear of the drawer, the "1 m" label outside the cube, the synchronous gate lock, all nudges, the 300 ms tap guard, the running-count pill and the legend are unchanged.
No other agent's play-*.png was touched; only my own named shots were removed.
