STATUS: ok
SLOTS: M1.S2.T4.C18.2D1
FILES: work/indiannica_eng_maths4_ch12/M1.S2.T4.C18.2D1/tool.tsx (ported pair refreshed by check)
CHECKS: full check 98/0/0 (1 run), quick 32/0/0, real-motion playkit probes
FAILURES: none
DECISIONS: S1 option (a): Go drawn quiet and inert after the lap until the question changes
RISKS: P3 act ends at about 0.9 s, so a typed answer that straddles the unlock is charged a try (not caused by this change)
ESCALATE: none
tool-builder-3.16 · class 4 ch 12 · M1.S2.T4.C18.2D1 (Time Unit Ladder) · fix S1 (a second Go re-locks the Answer)
CHOSEN: (a). After this question's lap has run, Go is drawn quiet (opacity 0.45) and ignores taps until the question changes.
WHY (a), not (b): a replay calls put({sec:0}), so the board would read "Laps: 0" with the second hand sweeping while the child answers 60, and it would still be sweeping at the win (secondsTicked would be read mid-replay). A miss typed during a replay would also start the correction's tl.run while the replay's done callback was still queued. With (a) there is no replay, so none of that can happen. lockWanted and pressKey are untouched, so the first lap's lock is exactly what it was.
CHANGED (work/indiannica_eng_maths4_ch12/M1.S2.T4.C18.2D1/tool.tsx, 3 edits, no text or TR changed):
- new: const goSpent = !demo && !free && it.kind === "lap" && !!S.acted;
  (S resets per question entry; this covers the lap, the correction's lap and the agent's check(), and leaves the guide step and free play alone)
- doGo: if (busy.current || goSpent) return;
- the Go <Key> is wrapped in <g opacity={goSpent ? 0.45 : 1}>. Go stays a live data-control: no aria-disabled or pointerEvents, so a tap is silent and never goes down the runtime's inert-tap hint path.
Kept: the hand removal, the action-anim check, touched-for-the-mount, real Enter on a guide step arming the gate, r31 miss-clears-slot, en/hi/gu, the pencil.
PROOF, real motion (play({motion:true}) through playkit, one headless Chrome, C4_CHROME_POOL=1, nextKey on; times from the Go/act tap to the Enter):
- Exact repro (guide walk by clicking Go, click Go, wait 2.3 s, click Go, type 60 + Enter at +0.67 s): ACCEPTED (stage win, tries 0). After the 2nd Go: "Laps: 1" did not reset, opacity 0.45, bubble unchanged.
- A tap on Go during the win: no replay ("Laps: 1"). Next question (Q2): Go is bright again (opacity 1, "Laps: 0").
- First lap, P1 Q1: refused at 0.76 s and at 1.66 s (stage ask, tries 0), accepted at 2.21 s after the lap.
- First lap, P1 Q2: refused at 0.71 s and at 1.61 s.
- P1 Q2 miss: the correction lap ran with the pad locked. Go was quiet during and after it; a tap did nothing; the answer 1 was then accepted.
- P3 Q1 (Step down + pencil, guide walked by REAL Enter): refused at 0.80 s, accepted at 1.5 s. Note: this act ends about 0.9 s after the tap, so 0.8 s is close to the edge. An earlier probe whose digits straddled the unlock (Enter at 0.94 s) was charged a try, because the first digit was dropped while locked and the rest got in. This happens with any short act and is not caused by this change (play tester 3.3 saw the same in C28).
- P4 Q1: refused after Step down alone (1.63 s, still locked), refused at 0.80 s after Slide, accepted at 1.9 s.
- Console errors: none in any run.
FULL CHECK (1 run): 98 pass · 0 warn · 0 fail · 4 info; ported to output-preview (host emulator: every phase plays and finishes). Quick check 32/0/0.
Not touched: the play tester's low "Info" (a real Go tap + toolApi.check() at 0.3 s leaves the lap timeline running) was not asked for.
Least sure: the question line still reads "Tap Go for a whole lap..." while Go is quiet after the lap. No miss, ladder or hint line asks for Go again, and the correction replays the lap by itself.
Scratch files deleted. Not published.
