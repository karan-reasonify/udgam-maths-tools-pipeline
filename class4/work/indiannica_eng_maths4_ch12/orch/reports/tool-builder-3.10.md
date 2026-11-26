STATUS: ok (S1, S2, Q1 midnight, Find fixed; full check 97/0/0, ported; unpublished)
tool-builder-3.10 · class 4 ch 12 · M1.S2.T3.C13.2D1 Day Dial · round-2 motion fixes (S1, S2, Q1, Find). Hand removal kept: no hand, no api.act.
Source: work/indiannica_eng_maths4_ch12/M1.S2.T3.C13.2D1/tool.tsx (Edit only; ported pair refreshed by check).
CHANGES
- S1 lift: new ddLift() is used by both the green arc and the jumping pole. A normal hop's control height went from 66 to 132, so the marker now peaks at 66 units (was 33). A hop over the noon post went from 132 to 190: peak 95 units (was 66). Still 16 x 75 ms = 1.2 s a hop, landing exactly on the post (f=1, up=0). At its peak the pole top is at y 167, clear of the key corner (y 0-88) and inside the stage. The sun and moons stay on top.
- S2 hour hand: each hop frame carries the clock time (ct), and clockT follows it. The hour hand turns 30 degrees in 16 steps (max 2 degrees a frame) and ends on its landing angle, so nothing jumps after landing. NEW motion for reviewers: the minute hand, geared to the same time, sweeps one full turn per hop.
- Q1 midnight: new ddSegs() splits a hop across midnight into two legs. The marker does the normal 16-frame hop onto the edge post. Both edge posts then glow while the marker cross-fades from that post to the other end's post (2 frames). Then comes a short 5-frame second hop in. The whole move is 1.79 s (1.49x a normal hop; I trimmed it from 2.07 s to keep within 1.5x). Each midnight leg peaks at 66, not 90-100: it lands on or starts from an edge post and never jumps over one. The arcs left behind, the agent's check() and the traceback all draw the same two legs. The grader/agent state (hours, a.m./p.m., hops) still changes only at landing.
- Find: the first pin now drops at once (first DOM change 43 ms after the press), the second at 0.66 s, and the move ends at 0.96 s (was a 0.9 s dead pause). The S.fly flag holds the gate until the end.
- No English line changed, so the TR table is untouched. Kept: the touched flag for the whole mount, a real Enter arming the gate, r31 miss-clears-slot.
PROOF (playkit, play({motion:true}), my own headless Chrome, C4_CHROME_POOL=1, en; times measured from the page's mousedown)
- Lift measured in stage units: P1 normal hop 66, P3 hop over noon 95, P4 midnight legs 66/66; hops 1.25 s. Mid-hop frames viewed (normal, over noon, the midnight cross-fade, the second leg): the marker is always drawn, 0 frames with no marker.
- Hour hand sampled every animation frame: P1 0 to 30 degrees, P3 345 to 15, P4 midnight 340 to 10; 16 steps (24 on the midnight move), max step 2 degrees.
- Right answer refused during the move, accepted after it, tries 0 every time:
  P1Q1 Slide (1.73 s) typed 12 at 0.29/0.69/0.99/1.30 s: refused; after: win.
  P2Q1 card (1.2 s) p.m. at 0.29/0.69/0.99 s: refused; after: win.
  P3Q1 6th hop (1.2 s) p.m. at 0.29/0.69/0.99 s: refused; after: win.
  P4Q1: hop 1 (across midnight) and hop 2 at 0.3/0.7/1.0 s: refused; after hop 2: win.
  P4Q3 hop back across midnight (1.79 s; the probe that tests the move's own lock) a.m.->p.m. at 0.30/0.69/0.99/1.22 (about 60%)/1.49 s: refused; after: win.
  P1Q3 Find (0.96 s, re-timed) No at 0.29/0.69/0.91 s: refused; after: win.
- Console errors: none in any run.
CHECK: run 2 of 6 (final): 97 pass · 0 warn · 0 fail · 3 info; ported to output-preview, and the host emulator plays all 4 phases. Quick checks clean throughout.
OPEN (not changed): S3, the runtime gap: a tap on a dead key during a move shows the step hint, because the r31 actor.busy() guard cannot see the tool's own move. It stays on the NOTES runtime-gap list. getState().acting stays false during the tool's own moves (logged).
Least sure: is a cross-fade between the two midnight posts (the same instant at both ends) clear enough for a child, or would you rather the marker slide back along the strip?
