STATUS: partial
SLOTS: runtime head (class4 ch7 step-6 package r29); probed on M1.S1.T2.C5.2D1, M2.S3.T5.C20.2D1, M2.S3.T6.C25.2D1, M2.S4.T8.C35.2D1, M1.S2.T3.C10.2D1
FILES: class4/runtime/runtime.tsx only. No freeze, no pin, no top-level names added.
CHECKS: full check on head in scratch (frozen+pinned there only): C5 95 pass/0 warn/0 fail; C20 95/0/0. diff r28..head | grep -c '^[<>]' = 93
FAILURES: none. Item 2 "win line first" is not the default (see DECISIONS).
DECISIONS: item 2 default stays: closing replaces the win line, said ONCE. Win-line-first is opt-in `tool.lastWinFirst`, because one-line-bubble (CHECKS l.173, silent.mjs:976) FAILs any win line at the last win. The lead must amend that row before it can be the default. Items 8 and 11 narrowed from the inherited head (below).
RISKS: C20 real tool.tsx changed 14:48 mid-session; its check ran on that copy. A stray class4/node_modules/node_modules symlink I made by mistake was removed. Scratch copy deleted.
ESCALATE: no
REPORT:
Before = scratch r28 pin, after = head pin, one Chrome, playkit real input. Items 7/8/2-optin on a scratch-only C5 variant.
1 DONE (l.3033, 3917, 3962-3964; gate: card question + pointer press within 500ms of open). C5 P1 true double tap on answer-open: mouse 45ms "6|"->"", touch 400ms "6|"->"". Keyboard still immediate ("4|" at 60ms). The literal repro (two t.click ~160ms apart) was already clean on r28. C10 drawer double tap types nothing; C30 not meaningfully probed.
2 PARTIAL (l.2625, 3035, 3323-3342, 3409, 3880-3882). Default: C5 P1 next phase timer 12.0s->6.8s, classroom 12.0s->6.8s. 2-page closing: pages 1,2,1,2 -> 1,2. nextKey page 2 at 3.85s->2.75s. Opt-in (variant): win line, then closing once, next phase at 10.0s. Under nextKey the opt-in shows the win line winMs-0.5s, then the closing; no wait for a Next tap.
3 DONE (l.2958, 3034, 3207). Double tap on "Next phase": P2 step-1 hint "Tap the Cut key under the bar." -> null.
4 DONE (l.2095-2096, 2113). C20 P1Q1 choice key sizes [40,32,32,40] -> [32,32,32,32]; P1Q2 [40,32,40] -> [32,32,32].
5 DONE (l.2558-2602; keyOnly && dev). C5 hi summary title->learned bbox gaps -4..-6 -> -1..0 (boxes, not ink); keys y544 h85 -> y552 h77 px.
6 DONE (l.2454-2463; keyOnly). 63 multi-line say() layouts: ending on one word 8 -> 0.
7 DONE (l.3372, 3554, 3585). Variant cardReady(false) never released: Q2 cardReady false -> true. C20/C25/C35 re-call cardReady on each question.
8 DONE, narrowed (l.3751-3755). Inherited head put ...shared first (ALL runtime fields win). Restored the r28 order; only `answered` sits after it, like `complete`. Ten tools share `phase` (some "free") and behave as in r28. Variant share answered:77: getState().answered 77/77 -> 0/1.
9 DONE (l.1143, 1159, 1168-1170). 844x390, C5 P3 card-0, mouse 6px / touch 7px slide: nothing -> tap.
10 DONE (l.3036, 3501-3504). C25 P2Q1, type 3, double tap key-enter: tries 1 -> 0, caret to box 2.
11 DONE, narrowed (l.3500-3506). The inherited guard ate EVERY Enter with the card shut. Now only caret moves are skipped; a complete answer still goes. C35 P3, Enter x2 shut, open, type 1: "|1|" -> "1||".
Note: C5 head baseline before my edits was already 95/0/0. The old 3 FAILs (hint-pinned/hint-key/guide-steps) were tool-side, fixed by C5's builder.
