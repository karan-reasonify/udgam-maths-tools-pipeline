STATUS: ok
SLOTS: M3.S5.T10.C46.2D1, M3.S5.T11.C51.2D1
FILES: work/indiannica_eng_maths5_ch8/M3.S5.T10.C46.2D1/tool.tsx, work/indiannica_eng_maths5_ch8/M3.S5.T11.C51.2D1/tool.tsx (one guard line each; check ported both pairs)
CHECKS: C46 quick 33/0/0, full 98 pass 1 warn (miss-shows-answer only) 0 fail, ported; C51 quick 33/0/0, full 98 pass 1 warn (miss-shows-answer only) 0 fail, ported
FAILURES: none
DECISIONS: no miss/ladder edits needed (item 4 review below); no upload, no shots --pack
RISKS: C51 P1 Q1 sort proved with toolApi.answer(board) + real Enter, not card drags; reveal seen in a screenshot (deleted)
ESCALATE: no
REPORT: work/indiannica_eng_maths5_ch8/orch/reports/tool-builder-1.85.md
C46 Box Packer: traceback effect guard (line 848) now also returns when !(wrong.tries >= 3), before any put/lock. I read all 17 `wrong` reads: every reveal (answer layers, dial window, equations, edge rows, full box) is keyed to S.tb, which only the traceback sets, so the one guard gates them all. Kept unchanged: Enter-answers, focus rules, the gate, AI, free play.
C46 miss-before-act (P1 Q2, nothing touched): miss 1 is the clue only and the work zone is byte-identical; the first Raise locks the pad, the act unlocks it, 60 wins. A miss no longer counts as the act (tbDone), so the act is still owed, which is the gate's own rule.
C46 numbers, P1-P4 Q1, en+hi reduced motion + a P1 en real-motion run: miss 1 shows `miss`, pad unlocked, slot empty, nothing added outside the bubble, no answer in getState. Miss 2 shows ladder[0], same. Miss 3: lock during the correction (real motion), it ends on P1 "24×7=168"+"168 cu. cm" / P2 "34×6=204"+"6 m" / P3 "5×5×5=125","6×125=750","750 cu. cm" / P4 "3×2×1=6"; then unlock, and typing the answer wins. Miss 4 replays. Wins on try 1/2/3; Q2 starts at tries 0 with no leftover.
C51 Three Measures: traceback effect guard (line 1373) now also returns when !(wrong.tries >= 3), before tracing/corrected/api.lock/actsNow. That effect is the file's only `wrong` read; every drawn reveal reads the demo layer `dm`, which only that effect sets. api.share's answer stays win-only.
C51 miss-before-act (P2 Q2, nothing touched): miss 1 is the clue only, work zone identical; a real Turn, then "The same" wins.
C51 numbers, P1-P4 Q1, en+gu reduced motion + a P4 en real-motion run: misses 1-2 leave the work zone byte-identical (pad-open baseline), show miss then ladder[0], pad unlocked. Miss 3: lock (real motion), the correction ends on P1 the right sort row "Fence m / Grass sq. m / Water cu. m" / P2 "4 different cuboids" / P3 "Greater volume" ring on the stone / P4 "Floating","Fully under","Push it under first"; then unlock and the answer wins. Miss 4 replays (stepped changes seen under motion). Wins on try 1/2/3; the next question starts at try 1.
C51 P1 Q1 (sort, pad enter), user mode, untouched: board set by toolApi.answer(near), then a real Enter x4. Misses 1-2 change nothing; miss 3 draws the right sort (seen in a screenshot, deleted); the right board + Enter wins.
Item 4 (clue lines): no miss or ladder[0] line in en/hi/gu states a final answer or total. C46 P1 Q3 names 45×3 but not 135; P3 Q1 gives only the step 125. C51 P3 Q3 ladder[0] names 3 cm and 20, not 60. Totals appear only in win lines and the dm/tb-gated chips. Nothing edited.
Scratch tb185 deleted; no play-*.png left in either slot; no processes left.
