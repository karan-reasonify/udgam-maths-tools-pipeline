# The unified code base, final run on class 5's settled state (head = frozen r52)

SNAPSHOT TAKEN **Thu Oct 8 21:09:10 IST 2026** (final: the other session confirmed it is done with class 5 code). `class5/lib/check/input.mjs` md5 = **17ec7e8f5ee27629dde3f332ecd8aa09** in the live file and in the snapshot (last write 21:07:46); no class 5 code file is newer than the snapshot (mtime check of 73 files, `drift.mjs 5`: 74 files, 0 differ). History: 19:18:02 (first r52 run), 21:06:33 (superseded by a further input.mjs edit at 21:07:46).

Everything was built and proved in `_unify-work\` (also `U:\`, a `subst` of it). No file of the real `class4\` or `class5\` was written, no `check` ran on a real chapter, nothing was
uploaded, no `voice` / `images make` ran, no secret file was opened, `voice.tsx` and the regression `tool.tsx` files were never read.

## 0. What the results are for

| item | value |
|---|---|
| class 5 code snapshot | **21:09:10 IST**, 74 files, md5 list `class5-code.md5`, time in `snapshot-time.txt`. Class 4's code: 71 files, `class4-code.md5` (class 4 is unchanged since the first snapshot; `drift.mjs 4`: 0 differ) |
| head runtime | frozen **r52** (r45-r51 are drafts, never pinned; they are in the capability tests, never in a scratch class pin). `c5max.txt` = 52 caps every read of class 5's frozen runtimes |
| class 5 slot | `M1.S1.T2.C4.2D1` of the ch5 work folder, re-copied at 21:09 (`slot5-copy`, tool.tsx md5 `1cc667e1...`; it changed since 19:18): it opts into both `nextKey` and `cardAnswer`; pinned r52; live `status` of it: "ported, check passed (86 pass)" |
| class 5 config / agents | `snap5-config.json` (a copy of the snapshot's `pipeline.config.json`), `snap-agents\` (the agent files at the snapshot) |
| class 5 since the snapshot | nothing: the other session's last edit (the card-answer "gated" question and a one-line `judgeCardAnswer` change in `lib/check/input.mjs`, 20:57 and 21:07:46) is in this snapshot. Everything was built from `snap5` and these copies; `classctl.test.mjs` read the live folders, bracketed by `drift.mjs 5` = 0 differ before and after |

## 1. What changed in class 5 since the 17:39 snapshot, and what that did to the unified code

Class 5's changes: head r52 (`nextKey` + `cardAnswer`; markers `const nextKeyOn`, `const cardAnswerOn`), `lib/check/check.mjs` (+ the `card-answer` row, `choice-answer-line` text), `lib/check/input.mjs`
(+225 lines: `cardAnswerInput`, `judgeCardAnswer`, ...), `lib/check/silent.mjs` (a hint of kind `type` stands), `lib/build/preview.mjs` (`hintKind`, the Answer-key probe), docs (BUILD_CARD, CHECKS, LAYOUT, PATTERNS 9d/9e),
agents `udgam5-tool-builder`, `udgam5-play-tester`. (`skeleton.tsx`, `port.mjs`, `hostsim.mjs`, `playkit.mjs`, `useLiveTool.ts` were already in the 17:39 snapshot; no change since.)

* Every edit script anchor held: `rebuild.sh` passed on the first run. The `card-answer` and `next-key` rows are gated by the tool's flag AND the runtime source marker (class 5's own gate), so a voiced r21 chapter never gets them;
  `util\gates.mjs`: 36 distinct runtime-source gates (one more than before: `cardAnswerOn`), none matches r21 except the ones class 4's own code already had.
* New capability `cardAnswer` in `lib/core/caps.mjs` (unit-tested; **not scaffolded**: class 5 does not scaffold it either, the scaffold writes `nextKey: true` only). `nextKey` stays a scaffold block.
* One new line-ending problem, fixed in the rebuild: class 5's `docs/PATTERNS.md` now has two LF lines in a CRLF file; `rebuild.sh` runs `fixeol.mjs` again after the docs merge.
* **Patch change that matters for the real apply (found while writing the recipe):** the earlier `unify-docs.patch` turned class 5's own `docs/BUILD_CARD.md` sections 7-8 (its decisions log, 242 lines) and the class notes at the end of `README.md`
  into the neutral, empty ones. Applied to the real class 5 that would have deleted its history. `mkpatch.mjs` now cuts the patches from `treeflav` = the tree with those two files flavoured for class 5 (neutral sections 1-6 and the README above its last fenced block, class 5's own sections 7-8 and notes kept);
  the proof (snapshot + both patches == treeflav, byte for byte) passes; the docs patch is 58 KB instead of 177 KB. The tree itself (what a new class gets) is still neutral and empty there. classctl keeps these two parts of a TARGET the same way (tails).
* `util\drift.mjs 5|4` now also reports NEW code files, and `snapshot.sh` writes `class4-code.md5` too.

**Delta run (21:09:10 snapshot, after the 19:18:02 full run).** Class 5's only code change in between was `lib/check/input.mjs` (the card-answer "gated" question: `cardReady !== false` in four probes, `found.gated`, new `bad.push` lines; then a one-line `judgeCardAnswer` change). It is class 5's own check code for a `cardAnswer` tool, behind the tool's flag and the runtime marker, so voiced r21 chapters never run it.
Redone on the new snapshot: `rebuild.sh` (every anchor held, EOL clean), both patches (same sizes, snapshot + patches == treeflav), md5 lists, `lists.md`, the classctl scratch flow, `classctl.test.mjs` 92/92, unit tests 30 ok, gates 36 / 0, the proofs below (a) and (b), the hash and status checks, and the non-Chrome part of the rehearsal (`resultsehearse.txt`). The Chrome post-apply run on the rehearsed classes (`postapply-summary.txt`) is from the 19:18:02 snapshot: the delta cannot reach a voiced class (class 4's code is not touched by it) and the class 5 side of it is redone as (b).

## 2. Results

### (a) class 4's two voiced slots (ch1 and ch11, runtime r21): class 4's own code (sc-base4) against the unified code (sc-uni4)

| | ch1 | ch11 |
|---|---|---|
| `check` rows | 64 pass / 0 warn / 0 fail / 1 info, **identical row set, same order, no new row** (no `next-key`, no `card-answer`) | the same |
| ported `.tsx` | byte for byte identical (1,253,190 bytes) | identical (1,645,276 bytes) |
| ported `.json` (sidecar, `hostContract`) | identical apart from `builtAt` / `checks.at` | the same |
| `publish` dry run | identical lines: ship copy 236.8 KB + json 42.1 KB, 126 clip files (0 to upload), `ready` (the DB IP is not whitelisted: the dry run used the saved plan copy, so the `plan` and `lp2_media` lines were not compared; `files`, `voice` and `ready` are identical) | identical: 277.3 KB + 54.2 KB, 177 clip files, `ready` |
| `hashOf(dir)` | `2bb3b157:1256631` in class 4's code, in the unified code, and as `checkedTool` in the original `status.json` | `771b35f1:1645529`, the same three |

`status --ch 1` / `--ch 11` on the original, never re-checked `status.json` prints `check passed (64 pass)`, no "source changed since"; `port` and the `publish` dry run work from it (`util\hashproof.mjs`: `sources()` and `pin.mjs` are byte-identical in `snap4` and the tree).

### (b) class 5's C4 slot (the new copy, nextKey and cardAnswer on), pinned r52: class 5's own code (sc-base5) against the unified code (sc-uni5)

* **86 pass / 0 warn / 0 fail / 1 info in both**, row set, levels and order identical; `next-key` and `card-answer` PASS in both. The only differing message carries a measured time (the party drawn within 52 ms against 29 ms).
* ported `.tsx` identical (310,036 bytes), `.json` identical apart from the timestamps.
* The slot pinned back to r48 (a runtime without the card answer): the full Chrome check of class 5's OWN code (the base side) printed "rendered" and then made no further progress; I stopped it after 44 minutes. Cause not diagnosed and not reproduced (other sessions' Chrome windows were running at high CPU and the DB dropped at about the same time); the unified side of that pin was not run. It is not a pin this tool is meant for.
  The quick check (source and maths, no browser) of that pin is identical in both codes (30 pass / 0 / 0 / 1).

### (c) sc-new (class 3, no work, example config): scaffold and play

* `doctor` green except the DB line (this machine's IP stopped being whitelisted after 19:23, see section 9); `runtime freeze` r1 (the r52 head), `pin`, `scaffold`: `board: true`, `StartArt, START_HOOK` and the real `StartArt` / `START_HOOK`, one stub guide step with a hint per phase, `const TR`, `freePlay: true` and `FREE_LINE`, **`nextKey: true`**; no `cardAnswer`. The same scaffold comes out of `classctl new --class 3` (viewerPort 5187, agentPrefix udgam3, fenceFile inherited).
* **Played with real input** through the class's own `lib/check/playkit.mjs` (`util\playnk.mjs`: typed digits, real Enter, a real mouse click, `nextKey: true`, motion on), four questions of phase 4:
  * BOARD layout (as scaffolded): **21 pass / 0 fail**. The Next key shows 1.1 s after a right answer exactly on the Answer key (1262, 112, 264 x 77), nothing moves for 4.5 s (position: phase, question, stage, key, score), a click takes the lesson on; on the phase's last question the key says "Summary" and a real Enter opens the summary page; no console error.
  * CLASSIC layout (no `board: true`): **25 pass / 0 fail**: the key sits in the answer slot's place (x, y, width equal; the drawn box is 5 px taller at the bottom, the runtime's key edge `EDGE = 5`), the pad rests while it waits, and the same four questions incl. the "Summary" key via Enter. Screenshots: `results\play-nextkey-board-q1.png`, `results\play-nextkey-classic-q1.png`.
  * One finding about the check, not the code: at question 2 the bubble pages a two-sentence instruction while the key waits (the `instruction` text changes, the lesson does not move); the play script compares position, not text.
  * Could not be played: the scaffold as written (its stub steps wait for a control the dashed outline does not have), so the played copies (sc-new chapters 2 and 3) have the four stub `steps` lines deleted and, for classic, the `board: true` line removed; nothing else edited. Not covered: "Next phase" in the classic layout, `toolApi.next()`, touch, hi/gu label fit in classic.

### (d) unit tests (`util\unit.mjs`, no browser): 30 ok, 0 fail

Capability flags of class 4 r1-r21 (all voiced, none has a silent-era feature) and class 5 r1-r52 (r45-r51 drafts included): voiced up to r29, silent from r30, every feature appears once and never disappears (`nextKey` first at r45, `cardAnswer` at r49), r21 of the two classes is the same runtime, r52 has every capability;
`voicePlan`; the skeleton blocks (`//#if`, CRLF) and the REAL skeleton rendered for every silent runtime r30..r52 (board / StartArt / nextKey iff the runtime has them); `skeletonFor` (voiced -> legacy skeleton). `classctl.test.mjs`: **92 / 92** (after the template refresh below).

## 3. `_templates\agents` (current `udgam5-*.md`)

Added: the **Next key** paragraph (tool-builder: "when the pinned runtime has `const nextKeyOn`"), the **Answering on the card** paragraph (tool-builder, "only if the runtime has `const cardAnswerOn`"; play-tester, placed before the Next key paragraph as in class 5's file), the play tester's "Summary" label for the last phase's key,
plus the earlier simple-summary-page, `FINISH_LINE` optional and r41/r42 rules. Placeholders unchanged. `classctl.test.mjs` section h allows 20 changed lines per template: tool-builder 20 (12 + 8), maths-reviewer 4, visual-reviewer 2, play-tester 2, upload-auditor 9, image-agent 0.
That section reads the LIVE `.claude\agents\udgam5-*.md`: an agent edit made after this run can push tool-builder over 20 again; refresh with `node util\tpl-diff.mjs`.

## 4. classctl: sync against the tree (dry-run comparison)

`util\ctl-setup.mjs` builds the scratch root `U:\ctl`: class 4 = `snap4`, class 5 = `snap5` + `unify.patch` + `unify-docs.patch` + the config edits.

* `classctl sync --from 5 --to 4` (dry, then `--apply`): **73 of 73 tree files identical** afterwards (self-check all `[ok]`: 40 .mjs parse, imports resolve, the head transpiles with esbuild, never-touch unchanged); a second dry run is idempotent (SKIPPED 2, IDENTICAL 80).
* `classctl sync --from 4 --to 5` onto an UNPATCHED class 5 (class 4 = the tree): 73 of 73 identical (class 5 keeps its `docs/PORTING_TO_CLASS4.md`: classctl never deletes).
* `classctl new --class 3` in the scratch root: runs; the scaffold above. (`doctor` in that class 3 now says the DB refuses this machine's IP, see section 9.)

| target | NEW | CHANGED | IDENTICAL | SKIPPED |
|---|---|---|---|---|
| class 4 (`sync --from 5 --to 4`) | 4 | 45 | 31 | 2 |
| class 5 (`sync --from 4 --to 5`, class 5 unpatched) | 2 | 37 | 41 | 1 |

Class 4 NEW: `lib/build/skeleton.voiced.tsx`, `lib/check/silent.mjs`, `lib/core/caps.mjs`, `lib/images/theme.mjs`; SKIPPED: `package-lock.json`, `pipeline.config.example.json` (per class). The exact lists: `results\lists.md`. The dry run prints "files that LOSE 20+ target lines" (`runtime/runtime.tsx` -134, `docs/PATTERNS.md`, `lib/check/check.mjs` -54, `docs/LAYOUT.md`, `README.md`, `lib/build/preview.mjs`,
`runtime/skeleton.tsx`, `lib/ship/port.mjs`): the head runtime is class 5's r52 head (class 4's frozen snapshots and every chapter pin stay), the rest is the unified code whose voiced behaviour the proof in section 2(a) shows unchanged.

## 5. Config edits (classctl config-merge form: add the key, the target's other values stay)

```json
class 4  pipeline.config.json  +  "agentPrefix": "udgam",
                                  "skinLibraries": ["assets/skins", "../class5/assets/skins"]
class 5  pipeline.config.json  +  "fenceFile": "../class4/.fence.json",
                                  "agentPrefix": "udgam5"
```
Done by `node util\cfgedit.mjs` (dry run by default, `--apply` writes; keeps indent and line ending). Class 5's `fenceFile` is **blocking** (without it `fence --off` writes a file the hook never reads); class 4's `skinLibraries` keeps it reading class 5's skin library (otherwise a picture class 5 paid for is billed again); the two `agentPrefix` are cosmetic.
`sync 5->4` also adds `fenceFile` to class 4's config (it resolves to class 4's own file, harmless). Never write `classDir` or `ageBand`. All keys: `config-keys.md`. Optional: give class 5 `"skinLibraries": ["assets/skins", "../class4/assets/skins"]` so `classctl new` derives libraries for new classes.

## 6. Risks and owner decisions

1. The unified skeleton (board layout, start page, `nextKey: true`) replaces class 5's own classic skeleton on apply.
2. Runtime numbers in docs and agent prompts (r48, r52) are class 5's series; a new class freezes its own r1: the source markers decide, never the number.
3. A class 4 voiced chapter is proved row for row on its two published r21 chapters; other voiced chapters rest on the gates and the capability tests.
4. The full Chrome check of the r48 pin (a `cardAnswer` tool on a runtime without it) did not finish (section 2b): undiagnosed, not reproduced, not a supported pin; no conclusion about either code base.
5. `classctl.test.mjs` h1 depends on the live agent files (section 3). The DB whitelist (section 9).

## 7. Re-running this on a later class 5 (r53 ...), mechanical

1. `echo 53 > U:\c5max.txt`; 2. `util\snapshot.sh`, `copy class5\pipeline.config.json U:\snap5-config.json`, copy `.claude\agents\*` to `U:\snap-agents\`, delete `U:\slot5-copy\` and `node util\slotcopy.mjs`; 3. `util\rebuild.sh` (it stops on a moved anchor: `p2-check.txt`, `p3-preview.txt`, `p4-port.txt`, `p5-lib.txt`, `p6-env.txt`, `rb1-core.mjs`, `docmerge.mjs`, `buildcard.mjs`; `adjust2.mjs` / `adjust3.mjs` regenerate the one-page and header hunks);
4. a new runtime feature: add its marker to `lib/core/caps.mjs` (`util\nf\lib\core\caps.mjs`) and `FEATURES` in `unit.mjs`; a scaffold block only if class 5's `skeleton.tsx` scaffolds it (`util\skel-nextkey.mjs` is the example); 5. `util\proof5.sh` (or `proof3.sh`), `util\compare-all.sh`, `node util\cmpout.mjs results\base5-out results\uni5-out`, `util\post.sh`, `node util\gates.mjs`, `util\newclass.sh`, `util\playnk-prep.mjs`, `preview` of chapters 2 and 3, `node util\playnk.mjs 2|3`, `node util\hashproof.mjs`;
6. `node util\mkunify.mjs`, `node util\mkpatch.mjs`, `util\ctl-setup.mjs`, the classctl dry runs and applies (`util\ctl-more.sh`, `util\ctl-new.sh`), `util\ctl-compare.mjs` (and `CTL=U:/ctl2`), `util\lists2.mjs`, `node util\tpl-diff.mjs`, `node classctl.test.mjs`, `bash util\rehearse.sh`.
Anything class 5 writes into `port.mjs` / `publish.mjs` / `hostsim.mjs` for every tool must be gated by `silent` or a marker: the `.json` of the r21 slots differs first (this run's earlier finding: `hostContract.phase`).

## 8. THE APPLY RECIPE for the real folders (rehearsed on a pristine scratch root, `results\rehearse.txt`)

Variables (Git Bash): `ROOT="C:/Users/Karan Shah/Desktop/reasonify/udgam-tool-pipeline/maths_pipeline"; UW="$ROOT/_unify-work"`. The helper scripts use the `U:` drive: `subst U: "C:\Users\Karan Shah\Desktop\reasonify\udgam-tool-pipeline\maths_pipeline\_unify-work"` (cmd or PowerShell) if `U:` is gone.
Every step is read-only unless it says it writes; STOP at the first line that does not read as expected, then go to step 9 (rollback).

**Step 0, before anything.** No session may work in `class4\` or `class5\` (the apply writes under both). `ls "$ROOT/class4/.classctl/lock"` must say "No such file". Optional: whitelist this machine's IP on the DB (the publish dry run in step 7 needs it).
`cd "$ROOT" && node classctl.mjs status` shows how far class 4 is from class 5 (about 40 files).
Record every chapter's status BEFORE (read only; step 7 diffs against it). The sync replaces class 4's head `runtime/runtime.tsx` (and `mascot.tsx`) by class 5's r52: a chapter with NO PIN would move onto it silently and its `hashOf` would change, so look for `NO PIN` first.
```
cd "$ROOT/class4" && node cli.mjs status | cut -c1-200 > "$UW/results/status-class4-before.txt"
cd "$ROOT/class5" && node cli.mjs status | cut -c1-200 > "$UW/results/status-class5-before.txt"
grep -c "NO PIN" "$UW/results/status-class4-before.txt" "$UW/results/status-class5-before.txt"        # expect 0 and 0; a NO PIN chapter: the owner decides (pin it to its present head first, or accept r52) BEFORE applying
```
Baseline at 20:55 (same commands): class 4 lists 15 chapters (ch1-ch14 and the live class 5 chapter ch9 that sits in `class4\work\`), **all pinned r21**, 0 NO PIN, 0 "source changed since", 91 tools "check passed (64 pass)", 9 scaffold/draft tools "not checked"; class 5: its ch5 at r52 (its other slots already say "source changed since", as before).
Proved on scratch beforehand: `status` of ALL those chapters, run by the code of the rehearsed (synced) class 4 and class 5 with `work\` linked read-only to the real work folders, prints exactly what the real folders print now (91 tools passed, 0 stale; `results\status-class4-before.txt` = `status-class4-after.txt`, same for class 5).

**Step 1, backup (writes only `_backups\`).**
```
bash "$UW/util/backup-real.sh" "$ROOT"            # last line = the backup folder, call it BK; expect "files: class4 71, class5 74, root ~37"
```

**Step 2, class 4 and class 5 are the snapshot.**
```
node "$UW/util/drift.mjs" 5      # expect: 0 differ  (a CHANGED viewer/public/bundle.js and .map are build outputs: ignore; any other line: class 5 moved on, STOP, re-run section 7)
node "$UW/util/drift.mjs" 4      # expect: 0 differ
```

**Step 3, the patches onto class 5 (writes `class5\`).**
```
cd "$ROOT/class5"
git -c core.autocrlf=false apply --check --whitespace=nowarn "$UW/unify.patch" "$UW/unify-docs.patch"     # expect no output
git -c core.autocrlf=false apply --whitespace=nowarn "$UW/unify.patch"
git -c core.autocrlf=false apply --whitespace=nowarn "$UW/unify-docs.patch"
node "$UW/util/postgates.mjs" "$ROOT/class5"        # expect: class5: all post-apply gates passed
```
Per-class files and how they are handled: `pipeline.config.json` is NOT in the patch (step 4); `package-lock.json` and `runtime/runtime.tsx` / `runtime/mascot.tsx` are not in the patch (class 5's own head stays as it is); class 5's `docs/BUILD_CARD.md` sections 7-8 and the notes after the last fenced block of its `README.md` stay (the patch only edits above them); `UNIFY.md` is not copied (classctl would list it UNLISTED).
New files the patch creates in class 5: `lib/core/caps.mjs`, `lib/build/skeleton.voiced.tsx`, `pipeline.config.example.json`. A `git apply --check` failure means class 5 is not the snapshot: do not use `--reject`; re-run section 7.

**Step 4, config edits (writes the two `pipeline.config.json`).**
```
node "$UW/util/cfgedit.mjs"            # dry run: expect "class4: add agentPrefix, skinLibraries" and "class5: add fenceFile, agentPrefix", 4 keys
node "$UW/util/cfgedit.mjs" --apply
node "$UW/util/cfgedit.mjs"            # expect: 0 key(s) would be added
```

**Step 5, class 5 to class 4 (writes `class4\`, backs it up itself).**
```
cd "$ROOT"
node classctl.mjs sync --from 5 --to 4 > "$UW/results/real-dryrun-5to4.txt"; sed -n '/--- summary/,$p' "$UW/results/real-dryrun-5to4.txt"
        # expect: NEW 4   CHANGED 45   SKIPPED 2   IDENTICAL 31   (INFO 2: the root runbook files are reported, rootdocs installs them)
node classctl.mjs sync --from 5 --to 4 --apply        # backup _backups\class4-code-<stamp> first; expect 7 lines "[ok]" (config, mjs-parse, imports, transpile runtime, files, folders, never-touch), exit 0
node classctl.mjs sync --from 5 --to 4                # expect: everything IDENTICAL or SKIPPED (idempotent), nothing to write
```
It also regenerates class 4's agents (`.claude\agents\udgam-*.md`) from the templates; class 5's `udgam5-*` are not touched.

**Step 6, the root docs.**
```
node "$UW/util/rootdocs-check.mjs"         # expect "all 6 staged root docs match the real files they were diffed against" (rootdocs installs WHOLE files: a real CLAUDE.md, runbook or skill edited since staging would be overwritten; a STALE line = re-stage that file first)
node classctl.mjs rootdocs                 # dry run: expect 6 CHANGED: CLAUDE.md, udgam_maths_claude.md, README.md, .claude/commands/gen-tools.md, .claude/skills/gen-tools/SKILL.md, .claude/skills/build-tool/SKILL.md
node classctl.mjs rootdocs --apply         # originals saved in _backups\rootdocs-<stamp>
```

**Step 7, post-apply gates.**
```
node "$UW/util/postgates.mjs" "$ROOT/class4"       # node --check of every .mjs, relative imports, esbuild of runtime/runtime.tsx, files exist; expect "class4: all post-apply gates passed"
node "$UW/util/postgates.mjs" "$ROOT/class5"
bash "$UW/util/postapply.sh"                       # ~12 min, Chrome; builds scratch classes from the REAL class4/class5 code (the folders are only read)
```
`postapply.sh` is the proof of section 2 on the applied code: hashOf of both voiced slots equals the original `checkedTool` and `status` prints "check passed (64 pass)"; `check` + `port` + `publish` dry run of ch1 and ch11 against `results\base4-*` (class 4's own code before the sync): rows `differences=0`, ported `.tsx` IDENTICAL, `.json` identical, publish lines identical;
class 5's C4 slot r52 against `results\base5-ch5-r52.check.json`: rows `differences=0` (86 / 0 / 0 / 1). The summary is `results\postapply-summary.txt`; any "DIFFERS", "differences=" not 0, or a `MISMATCH` is a stop. (The publish step needs the DB; without it the script says NOT RUN.)
Then read-only on the REAL folders (the hash check on the real status files):
```
cd "$ROOT/class4" && node cli.mjs status | cut -c1-200 > "$UW/results/status-class4-after.txt"; diff "$UW/results/status-class4-before.txt" "$UW/results/status-class4-after.txt"    # expect NO output (any changed line is a stop)
cd "$ROOT/class5" && node cli.mjs status | cut -c1-200 > "$UW/results/status-class5-after.txt"; diff "$UW/results/status-class5-before.txt" "$UW/results/status-class5-after.txt"    # expect NO output
cd "$ROOT/class4" && node cli.mjs status --ch 1 && node cli.mjs status --ch 11      # expect "check passed (64 pass)" and no "source changed since"; the same for any other finished chapter: node cli.mjs status
cd "$ROOT/class4" && node cli.mjs doctor ; cd "$ROOT/class5" && node cli.mjs doctor  # read only; db line needs the whitelisted IP
```
Optional viewer smoke: `cd "$ROOT/class4" && node cli.mjs view --port 5599` (rebuilds the bundle from the synced sources), open http://localhost:5599, stop it.

**Step 8, what the rehearsal showed** (`results\rehearse.txt`, a pristine root built from the snapshots): backup 71 + 74 + 37 files; drift 0 and `md5sum -c` clean; both patches apply; class 5's BUILD_CARD sections 7-8 and README notes identical to its original after the patch; 4 config keys added then 0; classctl dry run NEW 4 / CHANGED 45 / SKIPPED 2 / IDENTICAL 31, apply exit 0 with all self-checks `[ok]`, second dry run all IDENTICAL; rootdocs 6 CHANGED then apply exit 0;
postgates pass on both; class 4 and class 5 each equal the tree on 73 of 73 files; class 4's own BUILD_CARD sections 7-8 and README notes unchanged; only `udgam-*` agents regenerated (`udgam5-*` untouched); no frozen runtime, fence file or data folder created. The Chrome post-apply proof (`postapply.sh`) on the rehearsed, synced classes (`results\postapply-summary.txt`): both gates pass; `hashOf` of ch1 and ch11 = the original `checkedTool`; `status` prints "check passed (64 pass)"; `port` from the original status runs and its `.tsx` / `.json` are identical to class 4's own;
`check` of both voiced slots 64 / 0 / 0 / 1 with `differences=0` against class 4's own rows, ported bytes IDENTICAL; the `publish` dry run said `ready` with the same `files` and `voice` lines (the DB was not reachable then, so the plan and `lp2_media` lines were not compared); class 5's C4 slot on r52: 86 / 0 / 0 / 1, `differences=0` against class 5's own code.
`node cli.mjs view --port 5599` in the rehearsed class 4 serves `index.html` and `bundle.js` (HTTP 200) and reports class 4.

## 9. Rollback and the DB note

```
cd "$ROOT" && node classctl.mjs restore --class 4 --backup _backups/class4-code-<stamp> --apply          # class 4 (classctl's own backup)
node "$UW/util/restore-real.mjs" "$BK"            # dry run: lists what it would restore and delete
node "$UW/util/restore-real.mjs" "$BK" --apply    # class 5, class 4 and the root files from step 1's backup; files the apply created (e.g. lib/core/caps.mjs) are deleted
```
Notes: `restore-real.mjs` does not restore `viewer/public/` (a build output, rebuilt by `node cli.mjs view`); it deletes the `pipeline.config.example.json` the patch creates. `postapply.sh` builds its scratch classes from each code folder's OWN `pipeline.config.json` (so the real edited configs are exercised); its frozen runtimes and the slot copy come from `_unify-work`.
Database: from about 19:40 on `doctor` reported "no pg_hba.conf entry for host 152.58.34.255": this machine's IP is not whitelisted on the DB VM now (it was at 19:23, when the publish dry runs of section 2 ran). While it is blocked a `publish` dry run falls back to the saved plan copy and says so ("lpv2 unreachable ... NOT checked"); `postapply.sh` then compares only the `files` and `voice` lines and the `ready` line. The `check`, `port`, `status` and hash steps do not need the DB; the `publish` dry run and `doctor` do.

## 10. Deliverables

`_unify-work\tree\` (the unified code base, `UNIFY.md` in it), `unify.patch` (code, 26 files, 151,470 bytes), `unify-docs.patch` (docs, 9 files, 57,974 bytes; cut from `treeflav`: class 5's own BUILD_CARD sections 7-8 and README notes kept), `class5-code.md5`, `class4-code.md5`, `snapshot-time.txt`, `config-keys.md`, `results\lists.md`, `results\compare-all.txt`, `results\gates.txt`, `results\post-*.txt`,
`results\play-*.txt` and the two PNGs, `results\classctl-test.txt`, `results\ctl-*.txt`, `results\rehearse.txt`, `results\postapply-summary.txt`. Scripts in `util\`: `rebuild.sh`, `proof5.sh`, `compare-all.sh`, `post.sh`, `rehearse.sh`, `postapply.sh`, `postgates.mjs`, `cfgedit.mjs`, `backup-real.sh`, `restore-real.mjs`, `drift.mjs`, `hashproof.mjs`, `unit.mjs`, `gates.mjs`, `playnk*.mjs`, `mkpatch.mjs`, `mkunify.mjs`, `ctl-*.{mjs,sh}`, `lists2.mjs`, `tpl-diff.mjs`.
