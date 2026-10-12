# classctl: carry code between class folders, and make a new class

`node classctl.mjs` (in this folder, no dependencies, Node 20+; `git` on the PATH for merges and diffs) does two things.

1. **`sync`**: later improvements made in one class's **code** (cli, lib, runtime head, viewer, docs, agents) are
   carried to another class **without touching its tools or its data**.
2. **`new`**: "make tools for class 3 udgam chapter 1" when `class3/` does not exist makes the folder from the
   newest class's code, with its own config, agents and viewer port, and it works the same way.

Everything is **a dry run until `--apply`** (sync) or **until you drop `--dry-run`** (new). A dry run writes
nothing at all: no lock, no log, no backup, no temp file inside the pipeline.

```
node classctl.mjs status
node classctl.mjs sync --from 5 --to 4                       dry run: every file NEW / CHANGED / MERGED / CONFLICT / IDENTICAL / SKIPPED
node classctl.mjs sync --from 5 --to 4 --diff "lib/ship/*"   the same, plus the diff of the changed files that match
node classctl.mjs sync --from 5 --to 4 --apply               backup first, then write, then a self-check
node classctl.mjs new  --class 3 --dry-run                   what class 3 would get, and the defaults it would use
node classctl.mjs new  --class 3                             make it (add --wire to also add its deny rules to .claude/settings.json)
node classctl.mjs restore --class 4 --backup _backups/class4-code-20261008-1530 [--apply]
node classctl.mjs rootdocs [--from <stage dir>] [--apply]    install reviewed root docs (CLAUDE.md, runbook, commands, skills, README);
                                                             default stage: _templates/rootdocs-proposed (files end in .proposed, with *.diff
                                                             against the real files); the originals go to _backups/rootdocs-<stamp>/
```
Every command takes `--root <dir>` (default: the folder `classctl.mjs` is in), which is how the tests run on a
scratch copy. Exit codes: 0 fine, 1 refused or error, 2 a conflict is left or the self-check failed.

## What is copied, merged, kept, never touched (`classctl.manifest.json`)

The manifest is an **allowlist of globs** (first match wins) relative to a class folder. A file no glob names is
never copied. Categories for `--only`: `code`, `docs`, `agents`, `runbook`.

| kind | what | on sync |
|---|---|---|
| copied (code) | `cli.mjs`, `lib/**`, `runtime/runtime.tsx` (the head), `runtime/skeleton.tsx`, `runtime/mascot.tsx`, `viewer/**` (source and `public/bundle.*`) | 3-way merge against the last sync (below); generated files (`mascot.tsx`, `bundle.*`) are simply replaced |
| copied (docs) | `docs/**` except per-class files | same; `docs/PORTING_TO_*.md` is SKIPPED (a note for one class) |
| merged by tail | `README.md`: the part above the class notes is synced, the notes after `<!-- classctl:notes -->` (or after the last ``` block) stay the target's. `docs/BUILD_CARD.md`: sections 1-6 are synced, **section 7 (decisions log) and 8 (open questions) are the target's, verbatim** | the target's tail is never overwritten |
| config merge | `pipeline.config.json`: **the target's values stay**; keys the source has and the target lacks are added (so a new key arrives with a sync). The class-identity keys (`defaults.class`, `textbooks`, `viewerPort`, `agentPrefix`, `skinLibraries`) are **never copied**: when the source has the key and the target lacks it, the value is derived for the target (class 4 gets `agentPrefix: "udgam"` and its own `viewerPort`, not class 5's) | keys added only |
| json merge | `package.json`: the target keeps `name`, `description`, `version` and its dependency versions; missing keys are added; a differing dependency version is reported, not changed (`npm install` is yours to run) | keys added only |
| preserved | `package-lock.json` (it belongs to the target's `node_modules`) | SKIPPED |
| agents | `.claude/agents/<prefix>-*.md`, generated from `_templates/agents/*.md.tpl` (placeholders `{{N}}` class, `{{PFX}}` prefix, `{{AGE}}`, `{{AGE_DASH}}`, `{{AGE_LOW}}`, `{{AGE_HIGH}}`, `{{DIR}}` folder). The prefix is `agentPrefix` in the class's config, else `udgam` for class 4, else `udgam<N>` | regenerated; **the old files are in the backup**. Class 4's voiced-flow agents are replaced by the new-style ones, which carry a legacy note for voiced runtimes |
| runbook | the root `udgam_maths_claude.md` and `CLAUDE.md` are shared by every class | only reported (class-parametric or not); installed with `rootdocs` |
| **never touched** | `work/**`, `output-preview/**`, `runtime/frozen/**`, `.fence.json`, `node_modules/**`, `.images-cache/**`, `.voice-cache/**`, `.build/**`, `assets/**` (the skin library), `.classctl/**`, `*.tmp.mjs`, `.env`, `config.json`, and Windows device names (`NUL`, `CON`, `COM1` ...) | **never written**. `.env`, `config.json`, `work/` file contents and device names are never opened; `runtime/frozen/**` and `.fence.json` are hashed, and the rest compared by size and mtime, before and after an apply to prove nothing moved; `status` and the dry run read each class's frozen `runtime.tsx` only to see whether it has `SILENT_VOICE` |

**Text substitutions.** When the source is class S and the target class T, the token `classS` becomes `classT`
(and `mathsS_ch` becomes `mathsT_ch`) in carried text, so paths such as `class5/runtime/frozen/` read
`class4/...`. Prose such as "Class 5 is silent" is **not** rewritten: the dry run's "review before --apply" block
counts what remains. `--no-subst` turns it off; `substitutions` in the manifest holds the rules.

## The sync model: base copies and a 3-way merge

After a successful `--apply`, classctl stores in the **target** `class<M>/.classctl/`:

- `base/<same path>`: the exact synced copy (code files only, never work or output), and
- `sync.json`: `from` class, timestamp, per-file md5 and a history.

On the next sync, for each text file it knows three versions: the target (**ours**), the recorded base, and the
source (**theirs**):

| target vs base | source vs base | result |
|---|---|---|
| same as source | | IDENTICAL |
| unchanged | changed | CHANGED: the source's file is taken |
| edited here | unchanged | KEPT-LOCAL: your edit stays, listed |
| edited here | changed | `git merge-file`: MERGED when clean, otherwise **CONFLICT** and nothing is written for that file |
| (no recorded base: the first sync) | | CHANGED: the file is **replaced**; it is listed in the dry run (with `+added -removed` line counts, and `--diff` shows the lines) so you can look first |

`--on-conflict theirs|ours|markers` settles conflicts: `theirs` takes the source (your edit is in the backup),
`ours` keeps yours and records that choice (the next run says KEPT-LOCAL), `markers` writes git conflict markers
(exit 2: resolve by hand, the next sync merges again). `--keep-target <glob[,glob]>` leaves chosen files alone.

**Line endings.** Comparison ignores line endings. A file the target already has keeps the target's style
(CRLF or LF, whichever it mostly uses); a new file takes the source's majority style (a file with mixed endings, such
as class 5's `check.mjs`, is written uniformly, not byte for byte). A second sync is idempotent: all IDENTICAL,
no backup, nothing written.

**Apply** (in this order): refuse when `--from` equals `--to`, a class is missing, or `class<M>/.classctl/lock`
exists; make the lock; write `_backups/class<M>-code-<yyyymmdd-hhmm>/` (every code and docs file of the target
the manifest names, its agents, its `.classctl`, and a `meta.json`); write the files (each through a temp name
and a rename); record bases and `sync.json`; remove the lock; run the **fast self-check** on the target: every
`.mjs` parses (`node --check`) and its relative imports resolve, `runtime/runtime.tsx` transpiles with esbuild,
the viewer sources, mascot, skeleton and docs exist, and **no never-touch file changed**. It never runs `check`
on a chapter: do that yourself, chapter by chapter, when you want proof. `restore` puts a backup back (and removes
the files that sync created).

**Read the dry run before `--apply`.** Besides the per-file lines it prints:

- *files that LOSE 20+ target lines*: code the target has and the source does not. Class folders drift (class 4's
  `lib/images/library.mjs` looks into class 5's skin library, class 4's `voice.mjs` bakes clips): such a file is a
  regression risk until the source's code is class-neutral. Read `--diff`, or `--keep-target` it.
- *source-class literals*: text that still names the source class after substitution.
- *capability note*: the source's head runtime is silent (`SILENT_VOICE`) but the target has voiced runtimes. Its
  pinned chapters keep their frozen runtimes (a sync never touches `runtime/frozen/` or a pin), but checks and docs
  written for a silent class may not fit them.

## What a new class gets (`new --class <N> [--from <M>]`)

From the newest class (the highest number with a `pipeline.config.json`) unless `--from`:

- the code per the manifest, an empty `work/`, `output-preview/` and `runtime/frozen/` (**no snapshot**: the first
  `node cli.mjs runtime freeze` makes `r1` from the head);
- `pipeline.config.json` from the source's, with the class-identity keys filled: `defaults.class` = N, `textbooks` =
  `C:/Users/Karan Shah/Desktop/reasonify/maths_lp/textbooks/class-<N>-udgam` (**the output says whether that folder
  exists; classctl never creates it**), `viewerPort` = the highest port in use + 2 (or `--port`), `agentPrefix` =
  `udgam<N>`, `skinLibraries` (when the source config has the key) = its own `assets/skins` plus every sibling
  class's, read-only;
- the six agents `.claude/agents/udgam<N>-*.md` (tool-builder, maths-reviewer, visual-reviewer, play-tester,
  upload-auditor, image-agent) from the templates, the children's age band **N+4 to N+6** years;
- `package.json` named `class<N>-tools`, a copy of the lock, a README with a class-notes tail, a BUILD_CARD with a
  fresh section 7 (one row) and the neutral sections 1-6;
- `node_modules` as a **junction** to the source class's (`--no-link` to skip: then `npm install`);
- the `permissions.deny` rules a class needs in `.claude/settings.json` (node_modules, mascot, frozen, output,
  `.build`, plan/slot json ...) are **proposed, not applied**: the DEFAULTS block lists them. `--wire` adds them
  (cloned from the source class's, the original saved under `_backups/class<N>-new-<stamp>/`); that file is
  Claude Code's permission configuration, so the owner decides;
- `.classctl/sync.json` and base copies, so a later `sync` is a real 3-way merge;
- the same fast self-check. It needs no database.

It prints the **DEFAULTS USED** block (age band, plan ids `indiannica_eng_maths<N>_ch<n>`, textbook folder, port,
prefix, skin libraries) for the assistant to tell the owner. It refuses when `class<N>` exists (a half-made folder
from a crashed run: delete it and run again). Not done: `.gitignore` (it lists class 4 only); the read-fence hook
(`.claude/hooks/chapter-fence.mjs`) imports `class4/lib/core/fence.mjs` and `class4/.fence.json`, shared by every
class, so class 4's folder must stay.

## Known gaps

- The config keys that the class-neutral class 5 (the "unifier" work) adds, such as `agentPrefix`, `viewerPort` and
  `skinLibraries`, were taken from the task description, not from its `UNIFY.md`. `skinLibraries` is assumed to be an
  array of relative path strings (own `assets/skins` first, then `../class<k>/assets/skins`); any other shape is copied
  through unchanged on `sync` and `new`. Align `classKeys` in the manifest and `deriveClassKey` in `classctl.mjs` once
  the real key names are final.
- Until class 5's code is class-neutral, a sync from it carries class-5-only code into the target (see "Read the dry
  run": files that lose 20+ lines, source-class literals, the capability note).
- `--link-node-modules` is accepted but does nothing: linking is the default (`--no-link` turns it off).

## How to add a file to the manifest

Edit `classctl.manifest.json`, section `code` (an ordered list; the first matching glob wins):

```json
{ "glob": "lib/**", "category": "code" }                                       copied and merged
{ "glob": "docs/MY_NOTE.md", "category": "docs", "mode": "skip", "why": "..." } listed, never copied
{ "glob": "viewer/public/bundle.*", "category": "code", "generated": true, "subst": false }   replaced, no merge, no substitution
{ "glob": "README.md", "category": "code", "mode": "tail", "tail": "readme" }   head synced, tail kept (tails are defined under "tails")
```
Modes: (none) text or binary copy with 3-way merge, `config-merge`, `json-merge` (`keepTarget` lists keys never
copied), `lock`, `tail`, `skip`. A new never-touch path goes under `neverTouch`; a new class-identity config key under
`classKeys` (and teach `deriveClassKey` in `classctl.mjs` how to derive it). Run `node classctl.test.mjs` afterwards.

## Safety rules (what classctl will not do)

- It never writes into `work/`, `output-preview/`, `runtime/frozen/`, `.fence.json`, `assets/`, the caches, `.env`,
  `config.json`; it never opens `.env` or `config.json`; it never runs `check`, `fetch`, `publish` or `voice`.
- One guarded writer function does every write (it throws in a dry run); only the lock file, made and removed in
  apply mode, bypasses it. A lock file makes two syncs into one class impossible.
- Windows device names (`NUL`) and links/junctions are skipped by every walk (class 4's root has a real file named `NUL`).
- A sync never changes a chapter's pin or a frozen snapshot, so a class's finished chapters keep the runtime they were
  checked on. New code in `lib/` reaches them (it is shared), which is why the dry run is read before `--apply`.

## Examples

**Port the newest code (class 5) to class 4**, keeping class 4's tools, runtimes and decisions:

```
node classctl.mjs status                                  class 4 differs from class 5 by about 40 files
node classctl.mjs sync --from 5 --to 4                    read the list, the LOSE 20+ lines block, the capability note
node classctl.mjs sync --from 5 --to 4 --diff "lib/images/*,lib/build/voice.mjs"
node classctl.mjs sync --from 5 --to 4 --keep-target lib/build/voice.mjs --apply     (only on the owner's word)
```
Then check one chapter of class 4 yourself (`cd class4`, `node cli.mjs check <slot> --ch <n>`). To undo:
`node classctl.mjs restore --class 4 --backup _backups/class4-code-<stamp> --apply`.

**Create class 3 ("make tools for class 3 udgam chapter 1")**:

```
node classctl.mjs new --class 3 --dry-run                 the files and the DEFAULTS USED
node classctl.mjs new --class 3                           make it (class 3's code = class 5's)
cd class3 && node cli.mjs doctor && node cli.mjs fetch --class 3 --pub udgam --ch 1
```
then follow the runbook from step 1. Put the textbook where `textbooks` points (the output says if it is missing).
Later, to give class 3 an improvement made in class 5: `node classctl.mjs sync --from 5 --to 3`.

## The hub (every class on one page)

`node viewhub.mjs` (pipeline root; `viewer-hub/README.md`) is a root tool: classctl does not copy it, there is one. It finds the
`class<N>/` folders by itself (`node viewhub.mjs --list` prints what it finds), so a class made by `new` shows up with its
config's `viewerPort` and nothing to register. What it needs from each class is the **embedding viewer**: `viewer/src/App.tsx`
reads `?embed=1`, `?ch=` and `?tool=` and speaks the `udgam-viewer:*` messages, and `viewer/src/styles.css` has the `.app.embed`
tint. That is ordinary `viewer/**` code, so `new` and `sync` carry it like the rest: a class whose viewer is older still opens
in the hub as its own plain viewer (no Chapter dropdown or tool list) until a sync brings it up. Tests f18 and f19 prove a
new class is found by the hub and carries the embedding viewer.

## Tests

`node classctl.test.mjs [--keep]` builds its own scratch root under the temp folder (copies of class 5's code, a fake
class 4 with canary work/output/frozen/fence files and a real `NUL` file), runs every case above with `--root`, checks
the real class folders were only read, and removes the scratch (junctions first).
