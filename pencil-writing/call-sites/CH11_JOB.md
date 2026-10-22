# Class 4 chapter 11: pencil writing for the READY pairs (the owner, 2026-10-22: "do that pencil writing for ch 11 tools")

One tool per agent. This is NOT a build: do not run `check`, do not touch `class4/work/` (except that `approve` writes its own `approve-*.png` there), do not UPLOAD, do not edit any `.json` by hand.

## State at the start (2026-10-22, second attempt)
- The seven chapter 11 tools are finished, ported AND PUBLISHED (live) in `class4/output-preview/indiannica_eng_maths4_ch11/<slot>/<slot>.tsx` (+ `.json`). Chapter 11 is pinned to runtime r29. Your pair is byte-identical to what is live and to `_archive/class4_ch11_pre_pencil/<slot>/` (tsx, json, status.json): that is the pre-pencil copy and the rollback. Never edit the archive.
- The helper block is NOT in your pair yet (a first attempt was stopped and its changes were rolled back). **STEP 1 of your job is yours:** `node pencil-writing/apply.mjs --file class4/output-preview/indiannica_eng_maths4_ch11/<slot>/<slot>.tsx` (a dry run: it must say `1 to change, 0 refused`), then the same with `--apply`. From then on your pair is "hand-edited (NOT approved)" until you run `approve`. If the owner stops the job again, a tool whose agent has not started stays byte-identical to what is live.
- `pencil-writing/call-sites/11__M2.S3.T5.C20.2D1.mjs.stale` is an UNFINISHED draft written against a pair that has since been restored: never run it as it is (the weighing_bench agent may read it as a draft and must re-check every anchor against the current file).
- litre_jug (M2.S4.T7.C30.2D1) has no pencil act at all (zero `pencil` in its tool source) and is left as it is, as published.
- Pencil digits are THINNER than the bold Poppins digits beside them (a pencil line is a tenth of the font size, 3.2 px at the least): do not "fix" that in the tool; the owner decides (the knob is `PEN_W` in `pen-core.js`, rebuilt by `build-helper.mjs`).
- Timings inflate when several Chromes run at once: if `capture` shows a number over about 1 s, re-run `capture` ONCE before changing anything.

## Read first (docs only, in this order)
1. `pencil-writing/README.md` (the API of `moves: "write"`, `<PencilText>`, `<PencilLine>`, "Adapting a tool's call sites", "Proving a tool").
2. `pencil-writing/call-sites/NOTES.md` (the wiring recipe and what each finished tool taught; 21 KB: read it all once).
3. ONE model call-site script and its capture script from `pencil-writing/call-sites/` (`10__M1.S2.T4.C15.2D1.mjs` + `.capture.mjs`, or `7__M2.S3.T5.C20.2D1.mjs`): copy their structure (exact-string replacements on the pair, idempotent, `--dry`).
4. `class4/docs/PATTERNS.md` section 15 "PENCIL WRITING" only if the README leaves a doubt.

## The pair is huge (0.5-0.6 MB, ~6,000 lines)
Never read it whole, never `cat` it. Find your pencil call sites with `node pencil-writing/call-sites/11__scan.mjs <slot_id>` (line numbers + short snippets), then `Read` the pair BY LINE RANGE (offset/limit, 40-120 lines) around each site and around the code that draws the digits the pencil writes. Line numbers in the scan are those of the CURRENT file.

## What to do
1. For each pencil act that WRITES A NUMBER, a sign (`+ - × ÷ = / , .`) or a capital letter: make it `moves: "write"` with `text`, `at` (the baseline point(s) where the tool prints that digit today), `size` (the fontSize the tool already prints it with), `align` (the tool's textAnchor), optional `color`; `onPoint(i)` keeps the tool's state change (it fires when the tip FINISHES character `i`); draw the written digits with `<PencilText ... chars={n} />` (same x, baseline `y + size * 0.36`, same size) so the finished digits equal the last animation frame. A digit printed BEFORE the act (not written by the pencil) stays a Poppins `<text>`.
2. Acts that mark, tick, shade, rub, colour or draw a line (e.g. a count tick on a ruler, a strike-through) STAY as they are.
3. Delete the `ms` of a written act and any `api.sfx.tick()` the tool plays after it (the act scratches itself). Several numbers in one guide step = ONE `write` with an array of strings. Keep each written act at 3 s at most; the whole chain must end inside `approve`'s 10 s wait.
4. Never change an English line, a `TR` key, a question id, a colour budget or a layout. If a digit is wider than the printed one, keep it inside its box. Hindi/Gujarati text is never written (only digits, signs, capital letters); the units next to a number stay printed.
5. Write the edit as an IDEMPOTENT script `pencil-writing/call-sites/11__<slot_id>.mjs` (exact replacements on the pair, each asserting it matched exactly once, `--dry` prints what would change, a second run changes nothing) and run it. Also write `11__<slot_id>.capture.mjs` like the models if `capture.mjs` needs per-tool steps to reach your acts.

## Prove it
- `node pencil-writing/capture.mjs 11/<slot_id> --phase N` for every phase that has a written act: it times each act (about 0.8 s for one number; a longer string 0.8 s + 80 ms per character over 4) and saves frames at 200/400/600 ms into `pencil-writing/out/frames/`: LOOK at them: the graphite line grows behind the tip, the digit is partly drawn mid-act, the finished digit is the same drawing after the act (no jump), no page error. Also look at a Hindi or Gujarati frame if your tool writes there.
- Then, in `class4/`: `CHROME_PATH="C:/Users/Karan Shah/AppData/Local/ms-playwright/chromium_headless_shell-1234/chrome-headless-shell-win64/chrome-headless-shell.exe" C4_CHROME_POOL=1 node cli.mjs approve <slot_id> --ch 11 --note "pencil writes the digits stroke by stroke, about 0.8 s a number (owner 2026-10-22)"`. It must pass (it plays every phase in en/hi/gu in the host emulator, fails on a page error or blank render, saves approve-*.png in the slot's work folder, prints the bubble texts). Stop after 5 `approve` runs; if one flakes on timing, re-run it once. `status.handEdit` is recorded by a pass.
- Read the `approve` bubble texts: no English line may have changed.

## Report (at most 12 lines)
The acts converted (where, what they write), the acts left as they were and why, the timing per number you measured, the `approve` result line, the frames you looked at (names), the script paths, and anything you could not do. Do not paste code.
