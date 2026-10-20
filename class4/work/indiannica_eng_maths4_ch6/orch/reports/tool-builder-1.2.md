STATUS: ok
SLOTS: M2.S4.T7.C30.2D1 (Digit Tester, class 4 ch 6, r28)
FILES: none edited by me. All four items were already in tool.tsx (mtime 2026-10-19 17:38, after the 17:31 pack the reviewers measured; sha c1911028f604f5fe = the checkpoint snapshot). The checkpoint's "not applied" was stale. Proved by a fresh pack of the CURRENT file (scratchpad, deleted) measured against the old pack in work/.../pack/.
CHECKS: 1 full check (C4_CHROME_POOL=1): 95 pass / 0 warn / 0 fail / 3 info (voice-in-words, plan-answers, phone-tap 31 px, as before); tr-coverage pass; ported; host phases 1-4 play on and finish.
FAILURES: none
DECISIONS:
A hi pile label "35 लड्डू": hook-bottom to first row 2 px (old pack) -> 7 px now (pile height and first-row y carry +5 when lang != en, tool.tsx ~1175-1181). en gap 25, gu 21, unchanged. Within the asked +4-6.
B en P2 hint "Tap the card at the far left." (far / left.) -> "Tap the card at the far left end of the row." (far / left end of the row.)
B en P4 hint "Tap the Count key at the bottom." (at the / bottom.) -> "Tap the Count key at the bottom of the picture." (at the / bottom of the picture.)
B gu P3 miss "આ પ્રકરણે કઈ ચકાસણીઓ શીખવી છે?" (શીખવી / છે?) -> "આ પ્રકરણે કઈ ચકાસણી શીખવી?" (one line, no widow). en key "Which tests has this chapter taught you?" unchanged. TR keys for the two en hints match (tr-coverage passes).
C P4 correction: boards y=232 h=196, bottom edge ~7 px higher than in the old pack: boards -> Count key gap 5 px -> ~12 px. Ask stage pile -> key: 18 px en, 12 px hi/gu (hi/gu pile is 5 px taller from A). "N left" / बचे / બાકી line: 2-3 px under the shelf box -> ~5-6 px (3x crop, hi).
D getState `shutter: S.covered ? "ones" : "open"` (tool.tsx ~1060); `covered: true` is set only in coverRun after the push resolves (`if (ok) put({ edge: e1, covered: true })`), so it reads "open" during the push and "ones" when it lands. Verified by code reading, no timed mid-push probe (check does not poll getState mid-push).
RISKS: work/.../pack/ is stale (shows the pre-17:38 look): rebuild with `shots M2.S4.T7.C30.2D1 --ch 6 --pack` before any further visual review. No Edit made, so no new TR keys. Scratch dir deleted.
ESCALATE: no
