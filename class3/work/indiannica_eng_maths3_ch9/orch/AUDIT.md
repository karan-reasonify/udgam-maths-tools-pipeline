# Class 3 ch 9: upload audit (dry runs only, 2026-10-29)

Plan: indiannica_eng_maths3_ch9_v2 (the live version). Runtime r3, SILENT (voice: "silent: no clips").
Commands: `node cli.mjs publish <slot> --ch 9` (no --upload, no --apply), C4_CHROME_POOL=1. Nothing uploaded, nothing written to the database, no lp2_media rows applied.

| slot | tool | tsx KB (json KB) | status | dry run | lp2_media | bucket | url folder / file |
|---|---|---|---|---|---|---|---|
| M1.S1.T2.C5.2D1 | measure_it | 715.4 (46.6) | ported, check passed 97 pass / 0 fail | ready, host plays 4 phases | 0 rows | new | .../ch_9/2dtool/M1.S1.T2.C5.2D1/ |
| M1.S1.T3.C11.2D1 | length_converter | 627.6 (50.5) | ported, check passed 97 / 0 | ready, host plays 4 phases | 0 rows | new | .../ch_9/2dtool/M1.S1.T3.C11.2D1/ |
| M1.S2.T4.C16.2D1 | weigh_it | 648.5 (55.8) | ported, check passed 95 / 0 | ready, host plays 4 phases | 0 rows | new | .../ch_9/2dtool/M1.S2.T4.C16.2D1/ |
| M1.S2.T5.C22.2D1 | weight_converter | 610.3 (51.3) | ported, check passed 97 / 0 | ready, host plays 4 phases | 0 rows | new | .../ch_9/2dtool/M1.S2.T5.C22.2D1/ |
| M1.S3.T6.C27.2D1 | pour_it | 664.8 (49.9) | ported, check passed 97 / 0 | ready, host plays 4 phases | 0 rows | new | .../ch_9/2dtool/M1.S3.T6.C27.2D1/ |
| M1.S3.T7.C33.2D1 | capacity_converter | 618.5 (48.9) | ported, check passed 97 / 0 | ready, host plays 4 phases | 0 rows | new | .../ch_9/2dtool/M1.S3.T7.C33.2D1/ |

## Checks per tool
- Both files present and named `<slot>.tsx` / `<slot>.json`; `slotId`, `mediaId`, `component` agree with the slot; `url` ends in `/<slot>/<slot>.tsx` (all six).
- Mount: each 2d_tool_url folder and file name equals the slot id; no re-keyed id (the plan kept the slot ids).
- Phase map: 4 phases, one per plan phase, 3 items each (12 questions a tool), concept ids C5-C8 / C11-C14 / C16-C19 / C22-C25 / C27-C30 / C33-C36 as the plan.
- Standalone TSX: exactly one `react` import, `export default stdin_default;` last (the bundler's default name, an identifier, not a fault), no `__tool`. Two text hits per file: the runtime's clip loader `fetch(voiceBase() + uri)` (silent runtime, no clips, dead path) and the Poppins licence URL in the font kit. Neither is a network call the tool makes.
- Size: every tsx under the host's 1 MB limit (1,048,576 bytes); largest is M1.S3.T6.C27.2D1 at 664.8 KB.

## What blocks an upload
Nothing blocks. All six dry runs say "ready".

## Informational (not blockers)
1. M1.S1.T2.C5.2D1 (Measure It) is 715.4 KB, over the 700 KB target in the runbook (the 1 MB host limit is met). The dry run prints the same note. Owner decides whether to accept it.
2. M1.S2.T4.C16.2D1 shows 95 passing rows, the others 97. The dry run and status report 0 fail; the WARN count is not printed by status or the dry run, so 0 WARN is not separately proven here.
3. Uncommitted in git: the pairs of M1.S2.T5.C22.2D1 and M1.S3.T6.C27.2D1, and the work tool.tsx and status.json of M1.S3.T6.C27.2D1. status shows them ported and fresh (no "source changed since", no "hand-edited"), so the upload would send the bytes checked here.
4. Unused plan questions (listed in each sidecar's unusedQuestionIds, normal for the plan): C5 12, C11 3, C16 3, C22 7, C27 0, C33 11.
5. Silent runtime r3: each sidecar's voice.silent is true.

## md5 of each pair (tsx / json)
- M1.S1.T2.C5.2D1: bd5cbe700b6002e41a9abe7acb7518d6 / 724b3cf40d3e06af026f991ae89dc710
- M1.S1.T3.C11.2D1: aafb4e33f42a4cb325439ab4d2e45a61 / d2b0b9ec8d4bab4f3d7846e9e7a3fdbf
- M1.S2.T4.C16.2D1: aaff2fbfedf0e45d3fb1cea9e3992e0d / 18ee9e221fd1eea0cb636f41ed038c98
- M1.S2.T5.C22.2D1: 363f0197712c57da065d884df712c3b5 / 3c04f1396f0c486e75282d728b8c3c1a
- M1.S3.T6.C27.2D1: 84e1fab9a3134ac81569e09798e1a931 / fda31040b2a97f628c9278a1c62492e1
- M1.S3.T7.C33.2D1: bda9ebf849b87142b80794375ce3e871 / 5ffe59d715ab852617a2ae9d22e0135e

## Upload commands (for the owner to approve; not run)
node cli.mjs publish M1.S1.T2.C5.2D1 --ch 9 --upload
node cli.mjs publish M1.S1.T3.C11.2D1 --ch 9 --upload
node cli.mjs publish M1.S2.T4.C16.2D1 --ch 9 --upload
node cli.mjs publish M1.S2.T5.C22.2D1 --ch 9 --upload
node cli.mjs publish M1.S3.T6.C27.2D1 --ch 9 --upload
node cli.mjs publish M1.S3.T7.C33.2D1 --ch 9 --upload
(No --apply: every lp2_media count is 0.)
