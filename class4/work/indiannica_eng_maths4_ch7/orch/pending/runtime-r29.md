# Runtime r29 package (class 4 head) — step-6 gate. Prior agent killed 2026-10-19 17:43 mid-edit; head = r28 + 88 diff lines (`diff runtime/frozen/r28/runtime.tsx runtime/runtime.tsx`).
Already in the head (verify each, do not redo): 9 useDrag threshold 10 screen px (xy0); 4 one size per choice-key row (rowSize); 6 keyOnly widow guard (lines0 -> lines); 5 summary rows leading for hi/gu (KD); 3 next-phase double-tap guard (nextAt, 500 ms); 2 closingSaid (closing not said twice) — PARTIAL; 10 caretAt (double Enter on a mixed card) — check; 1 viaPtr / padPress pointer guard — check.
Still to do / finish:
1. [BLOCKER] digit keys ignore POINTER presses ~500 ms after the answer drawer opens (keyboard stays immediate). Repro M1.S1.T2.C5.2D1 P1 after the guide steps: click answer-open twice -> typed must stay "".
2. Last question of a phase: its OWN win line shows first (normal win time, or until Next / a classroom bubble tap), THEN the closing ONCE; phaseEnd never repeats it. Keep one-line-bubble + classroom timings passing.
7. api.cardReady(false) reset to default on each question change.
8. api.share({answered}) never overwrites the runtime's own `answered` (runtime fields win, as `complete` already does).
10. pressPart: an Enter that would submit from an EMPTY box within ~300 ms of a caret-moving Enter is ignored (keep the deliberate whole-only submit). Repro M2.S3.T6.C25.2D1 P2 Q1: type 3, double-tap key-enter.
11. Enter never moves the caret while a SLOT_MIXED card is SHUT (r28 ~l.3466-3477). Repro M2.S4.T8.C35.2D1 P3 after the acts: Enter, open, type 1 -> "1||".
Proof: real-input probes before/after for every item; full check of M1.S1.T2.C5.2D1 and M2.S3.T5.C20.2D1 on the HEAD in a scratch COPY of class4 (never re-pin ch7, never freeze) = 0 FAIL 0 WARN.
