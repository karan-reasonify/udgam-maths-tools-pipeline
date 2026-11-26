STATUS: ok
SLOTS: M1.S2.T4.C18.2D1
CHECKS: full check on r31 98/0/0/4 info, ported
REPORT:
r31 MISS CLEARS proved with real input (motion): typed answers P1 12, P1 180|15 (two-box), P2 60, P3 540, P4 300: slot empty at +0.3 s, +1.5 s and at unlock (part back to box 1), the next digits start fresh, the right answer then wins. Choice (P2 Q3) cleared. Corrections read wrong.value: P3 shows 540 as 22 bars + 12, P4 300 as 5 bars, slot empty. No setTyped anywhere in the tool.
One fix: the phase 2 order cards stayed on the ladder after a miss; now the right ladder shows, then the child's cards return to the pile and the ladder is rebuilt (verified: 4 cards back, rebuilt order wins).
