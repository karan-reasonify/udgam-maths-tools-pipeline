STATUS: ok
SLOTS: M1.S2.T3.C13.2D1 (day_dial)
FILES: work/indiannica_eng_maths4_ch12/M1.S2.T3.C13.2D1/tool.tsx (ported by check to output-preview/.../M1.S2.T3.C13.2D1.tsx + .json)
CHECKS: quick 32/0/0; ONE full check 97 pass / 0 warn / 0 fail / 3 info, ported; host plays phases 1-4
CHANGES: all 4 api.act({tool:"hand"}) removed (Hop/Hop back, Slide, Find, phase-2 half tap carrying the card); 0 api.act left. Pieces move by themselves via a private useTimeline `mv` (the traceback's `tl` untouched): marker JUMPS along its green arc (16 x 75 ms = 1.2 s, live arc drawn, tag hidden in flight); Slide steps the marker hour by hour (~1.7 s total); Find drops pin 1 then pin 2 (1.2 s); the card travels tray -> tapped half shrinking (1.2 s). sfx.settle + api.did at landing as before. Reduced motion: reducedMotion() -> lands synchronously. Clock hands kept.
LOCK: S.fly (in flight, reset by fresh()) added to the gate: lock(touched && (needAct || S.fly)); mv.stop() on the [ek] cleanup (old api.act resolved false on a new question); HOOK.check stops a flight first. touched/everTouched, Enter-on-guide-step arming, wrong.value traceback, keyOnly layout unchanged. No English line changed, so no TR edits.
PROOF (playkit play({motion:true})): P3 Q1 (6 hops): Hop 1 then answer at 0.8/1.7/2.5 s -> Answer key aria-disabled, stage ask (refused). Hops 2-5 by Enter: focus back on "hop" after each landing. 6th hop: answer at 0.4 s refused; at 1.6 s accepted (choice-lab-pm -> win). P1 Q1 Slide: locked at 0.3/0.9/1.5 s, open at 2.6 s. P2 Q1 card to p.m.: locked at 0.4/0.9 s, open at 2.0 s. 0 console errors. Mid-flight screenshots looked right (marker on its arc; card en route).
FAILURES: none (action-anim did not fail: the tool no longer calls api.act).
RISKS: hop lift is the arc's own height (33 px, 66 over a post): a short jump, as asked.
ESCALATE: no. Not published.
