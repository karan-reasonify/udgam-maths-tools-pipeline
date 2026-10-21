# Pencil writing: a task brief for ONE fresh session (the owner, 2026-10-21)

Read on demand (the owner attaches it to the first prompt). Not auto-loaded. Not part of the pipeline docs; it is a one-off job.

## The job
Class 4 tools that already use the **pencil** (`api.act({tool: "pencil", ...})`) must show **genuine pencil writing**, and fast. Edit the READY pair
`class4/output-preview/<chapter_id>/<slot_id>/<slot_id>.tsx` (+ `.json`) DIRECTLY so the owner sees it in the preview, then prove each with
`node cli.mjs approve <slot_id> --ch <N> --note "..."` (CLAUDE.md "Small changes to one tool"; runbook section of the same name). Do NOT edit `work/.../tool.tsx`, do NOT run `check` on these slots
(a hand-edited pair is protected from `check`/`port`; `--force` would lose the edit), do NOT upload (upload only on the owner's separate word; these tools show an upload stamp, so the viewer will say "edited since upload").

## The owner's decisions (final; do not re-ask)
- **Scope: chapters 6, 7 and 10 of class 4: 7 tools.** Chapter 8 is skipped (no pencil acts: its hand-edited pairs use hand/knife/scissors/ruler/eraser). Chapter 11 is a SEPARATE session (it is mid-build; it will reuse YOUR patch after its own pipeline ends).
- **Look: REAL STROKES.** A digit is written stroke by stroke: the pencil tip follows the digit's own path, the graphite line grows behind it, the pencil tilts as it moves, a scratch sound plays,
  and the written digit STAYS as a neat handwritten pencil digit (it does not swap to the printed Poppins digit).
- **Speed: about 0.8 s per written number** (digits and comma) INCLUDING the pencil coming in and leaving, with NO extra 400 ms hold.
- **Where: the ready pairs now; the head runtime later on the owner's word** (one freeze, then pin + re-check), so write the animation as ONE reusable piece (a patch file + script), not 7 hand edits.

## The 7 tools (found by a numbers-only scan of `work/<chapter>/<slot>/tool.tsx`: literal `api.act(` calls only, so a pencil act built through a helper may be missed: Grep each pair/tool for `pencil`)
| chapter (runtime pin) | slot | pencil acts | moves | `ms` |
|---|---|---|---|---|
| ch 6 (r28) | M1.S2.T4.C15.2D1 | 1 | draw | default |
| ch 7 (r29) | M1.S2.T3.C10.2D1 | 1 | push | 900 |
| ch 7 (r29) | M1.S2.T4.C15.2D1 | 9 | push, draw | 700 |
| ch 7 (r29) | M2.S3.T5.C20.2D1 | 3 | draw, push | 1000 |
| ch 7 (r29) | M2.S4.T7.C30.2D1 | 2 | rub | default |
| ch 10 (r28) | M1.S2.T4.C15.2D1 | 4 | push | 700, 800, 1300 |
| ch 10 (r28) | M2.S3.T5.C20.2D1 | 1 | push | 700 |
(`handEdit` is "no" for all seven today; every one is ported and shows a publish stamp. Re-check before editing: `node cli.mjs status --ch N`.)

## How the pencil works today (class4/runtime/runtime.tsx, block `/* ACTION_KIT_HELPER start */`, about lines 1480-1675; r28 and r29 carry the same pencil code, r27 is older)
- `api.act({tool, moves, at:[{x,y}...], from?, to?, ms?, onPoint?, hold?})` -> Promise<boolean>. `actPlan` (about line 1511): `total = min(ACT_MAX 2250, max(700*1.5, 1.5*(ms || 1100 + 100*(points-2))))`, `ACT_IN` 360 ms, `ACT_OUT` 330 ms,
  `ACT_TEMPO = 1.5`, `ACT_BEAT = 400` (a pencil holds a beat after writing: `setTimeout(end, total + 400)`). So a pencil act lasts about 1.45 s (ms 700), 1.75 s (900), 1.9 s (1000), 2.35 s (1300), 2.0-2.65 s with no `ms`.
- The pencil move `draw` only drags the kit's pencil PICTURE along straight points and paints a grey polyline trail (`stroke #4A4A4A`, width 5) behind it; `onPoint(i)` runs as the tip reaches `at[i]` and the TOOL pops its digit in. That is why it does not look like writing.
- While an act plays the runtime locks pad/keys and blocks every tap on the working area; a second `act()` resolves false; reduced motion resolves true at once after running every `onPoint`.
- The ready pair is a standalone ~1.6 MB `.tsx` that INLINES the runtime and the kits (the `/* ACTION_KIT_HELPER start */ ... end */` markers survive). NEVER read a pair whole (and `Read`/`Grep` on `output-preview/` may be denied by the project's deny rules: use `node` scripts that print numbers/short matches, or `Grep -n` with `-o`). Edit with exact-string `Edit` after a ranged `Read`, or with a script.

## The design (write it ONCE)
1. A `write` move for `api.act` (name it `moves: "write"`; keep `draw`/`push`/`rub` untouched for other uses): `text` (digits 0-9 and `,` `.` `=` `-` `+` `x`, a few letters only if a tool writes them), `at: [{x, y}]` = the baseline start, `size` (px), optional `onPoint(i)` per character.
2. A built-in SINGLE-STROKE path table for those characters (SVG path data in a 0..1 box, with stroke order and direction like a child writes them). Reveal each stroke by `stroke-dashoffset` against its length; the pencil tip follows `getPointAtLength`; tilt -20 degrees with a small wobble; graphite `#3F3F3F`, round caps, width about `size * 0.09`.
3. Export a `PencilText` component (same path table, `progress` 0..1) so the TOOL draws the finished handwritten digits after the act ends (the act layer is removed when the promise resolves). At `progress = 1` it must equal the last animation frame (no jump).
4. Timing: about 0.8 s per written number in total: `in` 150 ms, strokes about 500 ms (shared by the number's strokes, never below 40 ms a stroke), `out` 150 ms, NO `ACT_BEAT`; several numbers in one act = sequential tokens at the same pace. Ignore the 1.05 s minimum from `ACT_TEMPO` for `write` only.
5. Sound: the runtime's `tick` at each stroke start (the existing `sfx.tick`), at most one every 150 ms. Reduced motion: no motion, `onPoint` for every character, resolves true at once, the digits appear at once.
6. Per tool, change the pencil call sites in the PAIR: pass `moves: "write"`, `text`, `at`, `size`, and replace the tool's own printed `<text>` for that digit with `<PencilText .../>` (keep the tool's colours; digits written by the pencil are graphite, a pencil carry/zero stays as the tool already shows it). Keep `onPoint` semantics so the tool's state still changes when the tip finishes the character.
7. Prove it: `approve` (it plays every phase in the host emulator in en/hi/gu, fails on a page error or a blank render, prints the bubble texts, saves `approve-*.png` in the slot's `work/` folder) PLUS a mid-act capture: with the playkit take 3 screenshots of the act at about 25 / 50 / 75 % and LOOK at them: the line must visibly grow behind the tip and the digit must be partly drawn. Also assert the act's duration (about 0.8 s per number, measured with `performance.now()` around `api.act`).
8. Patch mechanics: a node script `pencil-writing/apply.mjs` (put it in `maths_pipeline/pencil-writing/`, NOT inside a chapter) that (a) finds the `/* ACTION_KIT_HELPER start */ ... /* ACTION_KIT_HELPER end */` text in a pair, (b) verifies it equals the r28 or r29 helper (hash both; r28 and r29 may differ only slightly: print the diff size), (c) inserts the new `write` code + stroke table + `PencilText`, (d) is idempotent (second run changes nothing), (e) writes a dry-run summary first. Save the patch + table + a README so chapter 11 (and the head runtime, later) reuse it.

## Procedure (token policy: root `token-policy.json`: contexts below 100k, at most 2 Opus agents at once, reports at most 40 lines; main session does not read tool sources)
1. Start: `node classctl.mjs status`, `node cli.mjs status --ch 6` (and 7, 10) in `class4/`. The session reads `CLAUDE.md`, the runbook "Small changes to one tool", `class4/docs/PATTERNS.md` section 15 and the ACTION_KIT_HELPER block ONLY.
2. **The fence:** one session = one chapter; this job crosses chapters ON PURPOSE (the owner's word, 2026-10-21): `node cli.mjs fence --off` before touching the other chapters, `node cli.mjs fence --on` right after, and say so in the report. Other sessions may be live on this machine: run `ListAgents`/ask the owner that none works on ch 6, 7 or 10 before editing their pairs. Never touch ch 8 or ch 11 or class 5.
3. Build the `write` piece on ONE tool first (suggest ch 7 `M1.S2.T4.C15.2D1`, the busiest: 9 pencil acts), view the mid-act frames, show the owner the preview, THEN apply to the other 6 (one builder agent per tool, 2 at a time; they edit only their pair and run `approve`).
4. Each `approve --note` says what changed ("pencil writes digits stroke by stroke, ~0.8 s a number, 2026-10-21 owner").
5. Report: a table (tool, pencil acts changed, new duration per number, approve result), the frames you looked at, anything you could not do, the runtime-gap list (the pencil is a runtime feature: say what the head runtime change would be and that it needs one freeze + pins on the owner's word). **No upload.**

## What NOT to do
No `check` on these slots, no remake, no `work/.../tool.tsx` edit, no head-runtime edit or freeze, no upload, no hand edit of chapter 8 or 11, no reading of `.env`/`config.json`, no commit unless asked.

## Start prompt for the owner to paste (attach this file)
`Do the pencil-writing job in PENCIL_WRITING_BRIEF.md for class 4 chapters 6, 7 and 10 (the 7 tools it lists). Ask if any doubt.`
