STATUS: ok
SLOTS: M2.S4.T7.C33.2D1
FILES: work/indiannica_eng_maths4_ch12/M2.S4.T7.C33.2D1/tool.tsx, output-preview pair (ported by check)
CHECKS: quick 32/0/0; full 96/0/0/4 info, ported (action-anim no longer asked: no api.act)
FAILURES: none
DECISIONS: rung pair 55+18=73 (owner 40+35 collides with P5/P7); rung replaces ladder[1] in phases 2 and 3
RISKS: hi/gu rung need native read; phase 2 questions never pass 60 minutes (only the warm-up)
ESCALATE: none
REPORT:
C33 duration_track (M2.S4.T7.C33.2D1), educator round 2026-11-16, decisions 1 + 4. EDIT only, work/tool.tsx; check ported the pair. NOT published (the viewer will show "edited since").
1 NO HAND: all 4 `api.act({tool:"hand"})` calls removed (grep api.act / tool:"hand" = 0 in tool.tsx and in the pair). The frog JUMPS by itself along the hop arc (rAF, 300-520 ms per landing, about 1.3 s per group). Landings, settle sound and chips are unchanged. Reduced motion: instant. Add, Change, a.m. and p.m. act at once with the same sounds.
  Lock: a hop in the ask stage calls api.lock(true) (mine) and holds it until busy drops, then the gate effect sets lock(want). Cancel: the [key] cleanup stops the rAF and resets playing, busy and fly. Focus: focusNext() after each act.
2 60-MIN RUNG: ladder[1] in phase 2 (replaces "...carry 60 minutes.") and phase 3 (replaces "...which half the end flag is in."): "60 minutes make 1 hour, so 55 + 18 = 73 minutes: write 13, add 1 to the hours." (78 chars). Old TR keys removed; new hi and gu added (native read needed). Half-only misses still get DT_HALF_LADDER.
  Not the owner's 40+35: P5 hops 35+40 and P7 25+50 = 75 = 1 h 15 (answers 5:15, 2:15), and the Hint key shows rungs before an answer. 55/18/73/13 appear in no phase 2/3 item.
  For the owner: no phase 2 QUESTION's minutes pass 60 (10+25, 15+30, 40+5); only the warm-up does (20+50). So in phase 2 the rung is general advice.
CHECK: quick 32/0/0. ONE full: 96 pass, 0 warn, 0 fail, 4 info; ported; host plays phases 1-4.
  96, not 97: action-anim is no longer asked (it applies only when the source calls api.act). It was not a fail.
LOCK PROOF (playkit, play({motion:true}), real clicks after the warm-up's guide steps):
  - Phase 1 q1 and phase 3 q1: Answer disabled, typed "", 0 tries at 0.8 / 1.7 / 2.5 s after the first hop.
  - Disabled with a hop in flight (phase 1 hop 2 at 2/4).
  - Phase 3: still locked after all hops ("Now tap one of the two half keys..."); it opens only once the half is picked.
  - Phase 1 last hop: the first digit was refused in flight, the rest accepted after landing. This is an inference from typed "17|", not a direct read.
  - Keyboard only: focus stays on Hop between hops, then goes to a.m., then to Answer.
  - Wrong half (a.m.) + right digits: miss, slot empty, "The digits are right...". p.m. tap: "Now type the time again." with no judging; retype + Enter: win.
  - A question change in mid-hop: Hop works on the next question. No console errors.
Temp files: scratchpad probes and backup deleted.
