STATUS: ok (double-tap must-fix done; full 98/0/0, ported; NOT uploaded)
Cause: two things swallowed the 2nd tap. The 600 ms same-square guard, and the hand-tap act after each mark, which takes the board (pointer-events none) for about 1 s at real motion.
Fix: the same-square guard is now 150 ms (bounce only), and Pair keeps its 600 ms. The M/L cycle (P2 guide, leaf, cup) and the free-play M/H/L cycle now mark at once with a tick sound and NO hand act. P1 pencil numbers, the P3 H taps and the Pair bracket keep their acts. Gate, nudges, Pair guards and chip placement are untouched.
Real double taps on one square, mouse and touch, reduced and real motion, en/hi/gu: 45 ms = M only; 150 / 250 / 400 / 600 / 800 ms = M then L (all 12 cases each run). A third tap cycles as before. Guide: the sliver tapped twice 250 ms apart completes steps 2 and 3.
Free play, taps 250 ms apart: M, H, L (en real; hi/gu reduced).
Q1, 12 taps 300 ms apart then 12: Answer key on after all are marked; 0% of any wrong letter under a chip, gaps 19 / 17 / 16 px.
Departure to judge: marking a square no longer shows the hand tap. That is the only way a 150-400 ms double tap can count, because the runtime blocks the board while any act plays.
