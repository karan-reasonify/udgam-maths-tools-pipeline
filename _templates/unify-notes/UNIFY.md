# UNIFY: one code base for every class

Built from a copy of class 5's code (snapshot Thu Oct  8 21:09:10 IST 2026; md5 of every class 5 file copied: `class5-code.md5`, next to this folder's
`unify.patch`), with class 4's voiced behaviour restored behind capability gates. The runtime head here is class 5's head, identical to its newest frozen snapshot.

## Config keys (`pipeline.config.json`)

Read by `lib/core/env.mjs` (`CONFIG`, the derived helpers) and the modules named in the last column. A key marked "required" is not defaulted
by the code; every other key may be left out and takes its default. `N` is `defaults.class`. `pipeline.config.example.json` is a complete example.
Defaults that cannot be derived (the three rows marked **per class**) must be written into an EXISTING class's config when it adopts this code,
or its behaviour changes: see "Config migration" below.

| key | type | default | used by |
|---|---|---|---|
| `defaults.class` | number | required | `env.mjs` (`CLASS_NUM`, `CLASS_LABEL`, `CLASS_DIR`, `AGENT_PREFIX`, `AGE_BAND`), `plan/lp.mjs` (`chapterIdFor`, the `--class` default), `ship/port.mjs` (sidecar `grade`), `images/gemini.mjs` (batch name `udgam<N>-...`), `viewer/meta.mjs` (header, port), `cli.mjs` (`doctor`, `list`) |
| `defaults.pub` | string | required (`indiannica`) | `plan/lp.mjs` (`resolvePub`, chapter ids), `ship/port.mjs` (sidecar `publication`), `cli.mjs` |
| `defaults.medium`, `defaults.subject` | string | required (`eng`, `maths`) | `plan/lp.mjs` (chapter ids), `cli.mjs`, `viewer/meta.mjs` |
| `defaults.version` | string | required (`active`) | `plan/lp.mjs` (which plan version `fetch` takes) |
| `lpDest` | string | `lpv2` | `env.mjs` (`lpDest()`: only `lpv2` is wired) |
| `lpTables` | object | required | `plan/lp.mjs`, `ship/publish.mjs`, `cli.mjs` (`doctor`) |
| `pubAliases` | object | required | `plan/lp.mjs` (`udgam` -> `indiannica`, `ncert` -> `cbse`) |
| `envFiles` | string[] | required | `env.mjs` (secret env files, by path, highest precedence first; never opened by hand) |
| `gcpKeyFile` | string | required | `ship/gcs.mjs` callers: `ship/publish.mjs`, `build/voice.mjs`, `cli.mjs` (`doctor`) (never opened by hand) |
| `runtime` | string | `runtime/runtime.tsx` | `core/pin.mjs` (the HEAD runtime, where a new feature is written) |
| `skeleton` | string | `runtime/skeleton.tsx` | `build/scaffold.mjs` (the new-style template, for a chapter whose pinned runtime is silent) |
| `legacySkeleton` | string | `lib/build/skeleton.voiced.tsx` | `build/scaffold.mjs` (the old template, for a chapter pinned to a voiced runtime) |
| `workDir` | string | `work` | `core/work.mjs`, `viewer/meta.mjs`, `viewer/server.mjs` |
| `outDir` | string | `output-preview` | `ship/port.mjs`, `ship/publish.mjs`, `viewer/meta.mjs`, `viewer/server.mjs` |
| `bundled` | string[] | `["@use-gesture/react"]` | `build/preview.mjs` (`hostScope`), `check/check.mjs`, `check/model.mjs`, `ship/port.mjs` (libraries `port` inlines) |
| `textbooks` | string | required | not read by `lib/`; the class's textbook folder, filled by `classctl new`, named in the agents' prompts |
| `mascot` | string | required | `build/mascot.mjs` (`node cli.mjs mascot`) |
| `classDir` | string | `class<N>` (leave it out) | `env.mjs` (`CLASS_DIR`): the folder name that messages and the sidecar's `build.runtime` use; an override for a folder not named `class<N>`. Never write it into a class config that `classctl new` may clone |
| `agentPrefix` | string | `udgam<N>` (**per class**: class 4 is `udgam`) | `env.mjs` (`agentName(role)`), `cli.mjs` (`doctor` prints it); `classctl` renders `.claude/agents/<agentPrefix>-*.md` |
| `ageBand` | string | `<N+4>-<N+6>` (leave it out) | `env.mjs` (`AGE_BAND`), `cli.mjs` (`doctor`); an override only: `classctl` computes the agents' age placeholders itself and would clone a written value into a new class |
| `viewerPort` | number | `5175 + 2N` (class 4: 5183, class 5: 5185) | `viewer/meta.mjs`, `viewer/server.mjs`, `cli.mjs` (`view`) |
| `skinLibraries` | string[] | `[]` (**per class**: class 4 needs `["assets/skins", "../class5/assets/skins"]`) | `env.mjs` (`skinLibraries()`), `images/library.mjs`, `images/make.mjs`: skins directories this class may READ, never write, in the form classctl writes (`<folder>/assets/skins`, relative to the class folder; the class's own entry is ignored; a bare class folder is accepted too) |
| `fenceFile` | string | `.fence.json` (**per class**: class 5 and later need `"../class4/.fence.json"`) | `env.mjs` (`fenceFilePath()`), `core/fence.mjs`: the read fence's state file; the hook in `.claude/hooks` reads ONE file (it imports class 4's `fence.mjs`), so every later class points here |

No other class-specific fact is read from anywhere: a class folder's number is `defaults.class`, its folder name is `classDir`, and everything
that differs between a voiced and a silent chapter is decided by the chapter's pinned runtime source (`lib/core/caps.mjs`), not by a key.

### Config migration (keys an existing class must gain when it adopts this code)

| class | add | why it matters |
|---|---|---|
| class 4 | `"skinLibraries": ["assets/skins", "../class5/assets/skins"]` | without it class 4 stops looking in class 5's skin library: only an image-cost change (a picture class 5 already paid for would be billed again) |
| class 4 | `"agentPrefix": "udgam"` | cosmetic: `doctor` would print `udgam4-...`; `classctl` reads the key to name the agents |
| class 5 | `"fenceFile": "../class4/.fence.json"` | blocking: without it class 5's `fence --off` writes `class5/.fence.json`, which the hook never reads |
| class 5 | `"agentPrefix": "udgam5"` | same as the default; written for clarity |
| every other key | (nothing) | `viewerPort`, `classDir`, `ageBand` defaults reproduce class 4 (5183, `class4`, 8-10) and class 5 (5185, `class5`, 9-11) exactly: do not write `classDir` or `ageBand` into a class config |

## Files changed against class 5's snapshot

31 changed, 3 new, 1 removed (viewer/public/bundle.* are class 5's, not rebuilt: the viewer sources did not change).

| file | change | kind | why |
|---|---|---|---|
| `cli.mjs` | changed | class-token + class5 feature | class-token + help text: class-neutral header, `doctor` prints the class/agents/skin libraries, `voice` help says voiced bakes and silent exits, `fence` prints the real state file |
| `docs/BUILD_CARD.md` | changed | per class (§7, §8 emptied) + class4 voiced rules | NEUTRAL SKELETON: sections 1-6 neutral (voiced rules added and labelled), section 7 (decisions log) and 8 (open questions) EMPTY: per class, classctl merges a class's own rows |
| `docs/CHECKS.md` | changed | class4 voice behaviour + class5 feature | neutral superset: "which rows run" section and the voiced-runtime rows table added |
| `docs/IMAGES.md` | changed | class4 behaviour + class5 feature + class-token | neutral superset: class 4's sibling-library, Skin-first and check bullets added; class tokens removed |
| `docs/LAYOUT.md` | changed | class4 voice behaviour + class5 feature + class-token | neutral superset: §8v "Voice and sound" for voiced runtimes added; class tokens removed |
| `docs/PATTERNS.md` | changed | class4 voice behaviour + class5 feature + class-token | neutral superset: §9v "The voice", the voiced bake/ship bullets in §11 and class 4's skin recipes in §14 added, labelled |
| `lib/build/preview.mjs` | changed | class4 voice behaviour (restored, gated) + class5 feature | class4 voice behaviour restored and gated: `FAKEVOICE` (`?fakevoice`), the `mute` and `blocked` drives; class5 drives kept; the `wrong` drive samples the bubble only on a silent runtime; the DOM watchers only where a row reads them; `window.__RT` carries the capabilities to the page |
| `lib/build/scaffold.mjs` | changed | new behaviour (capability-chosen skeleton); was a stale comment difference | rewritten: skeleton chosen by the pinned runtime's capabilities (silent: the new style, voiced: `legacySkeleton`), `//#if <cap>` blocks, one stub guide step with a hint a phase, `START_HOOK` |
| `lib/build/voice.mjs` | changed | class4 voice behaviour + class5 silence, chosen by capability | class4 voice behaviour kept, class5 silence kept: `voicePlan(caps, { force })` decides bake or not from the pinned runtime (unit-tested), not from `--force` |
| `lib/check/check.mjs` | changed | class4 voice behaviour (restored, gated) + class5 feature (gated) | class4 voice behaviour restored and gated by `caps.silent`: `mute`, `voice-pick`, `sound-on-start`, `voice-sync`, `voice-no-repeat`, the `mute`/`blocked` runs, `voice-in-words`/`voice-lines` wording; class5 silent rows (`silent`, `sound-button`, `tr-coverage`, `one-page`, `hint-on-miss`, `bubble-no-repeat`) now only on a silent runtime; every capability test goes through `caps` |
| `lib/check/input.mjs` | changed | class5 feature | class5 feature: `judgeStart`/`startPageInput` take `silent`, so a voiced runtime with a start page is not asked to be silent after Start |
| `lib/check/playkit.mjs` | changed | class-token | class-token: usage comment |
| `lib/check/silent.mjs` | changed | class-token | class-token: one message no longer says "Class 5" |
| `lib/core/env.mjs` | changed | class-token | class-token: `CLASS_NUM/CLASS_LABEL/CLASS_DIR/AGENT_PREFIX/AGE_BAND`, `skinLibraries()`, `fenceFilePath()`, defaults for the keys every class shares |
| `lib/core/fence.mjs` | changed | class-token | class-token: the state file comes from config `fenceFile` (class 5 had `../class4/.fence.json` hard-coded); messages name `CLASS_DIR` |
| `lib/finish/clean.mjs` | changed | stale (comment) | stale: class 5's comment had lost the note that `images.tsx`/`images.json` are kept (the code kept them) |
| `lib/images/emit.mjs` | changed | stale (comment) | comment only |
| `lib/images/gemini.mjs` | changed | class-token | class-token: Gemini batch name `udgam<N>-...` from `defaults.class` |
| `lib/images/library.mjs` | changed | class4 behaviour (siblings, now config) | class4 sibling lookup restored (class 5 had dropped it); the sibling list is config `skinLibraries`, no longer a constant |
| `lib/images/make.mjs` | changed | class4 behaviour + class5 feature (theme, gated) | class4 `slotDir` and sibling notes restored; class5 theme kept, resolved only when the pinned runtime has a THEME |
| `lib/plan/brief.mjs` | changed | class-token | class-token: comment |
| `lib/plan/lp.mjs` | changed |  | see the diff |
| `lib/ship/hostsim.mjs` | changed | class4 voice behaviour (kept) + class5 feature | class4's single `check()` demo path kept for a runtime without guide steps; class5's loop only with steps |
| `lib/ship/port.mjs` | changed | class4 voice behaviour (gated) + class5 feature + class-token | class4 voiced sidecar/header text kept and gated by `caps.silent`; `build.runtime` names `CLASS_DIR` |
| `lib/ship/publish.mjs` | changed | class5 feature (gated) | "silent: no clips" printed only for a silent runtime (a voiced tool without baked clips prints nothing, as before) |
| `lib/ship/voiceship.mjs` | changed | stale (comment) | comment only: the ship copy is for a voiced runtime |
| `package.json` | changed | class-token | class-token: neutral `name` and `description` (package-lock.json stays per class and is not part of the tree) |
| `README.md` | changed | class-token (neutral rewrite) | neutral rewrite: the two kinds of runtime, the order of work, the config keys, the layout |
| `runtime/skeleton.tsx` | changed | class5 feature (new style) | the full new style: `board: true`, `StartArt`/`START_HOOK` as real code, `phase.steps` with hints, `TR`, `freePlay` + `FREE_LINE`, `nextKey: true` (only when the runtime has `const nextKeyOn`), THEME note, silent-lesson conventions; `//#if` blocks drop what the pinned runtime lacks |
| `viewer/meta.mjs` | changed |  | unchanged from class 5's viewer |
| `viewer/README.md` | changed | class-token | class-token: port, header example and package path written for any class |
| `lib/build/skeleton.voiced.tsx` | new | class4 voice behaviour (old skeleton) | NEW: class 4's old skeleton, kept for a chapter pinned to a voiced runtime (one comment line neutralised) |
| `lib/core/caps.mjs` | new | new: capability detection | NEW: the capabilities of a pinned runtime, read off its source (`silent`, `board`, `startPage`, `hint`, `steps`, `classroom`, `party`, `theme`, `nextKey` ...); one place for every gate |
| `pipeline.config.example.json` | new | new | NEW: a complete example config (class 3) |
| `docs/PORTING_TO_CLASS4.md` | removed | per class | a note for one class (class 5's porting memo); classctl skips such files anyway |

## Which docs are neutral and which are per class

- **Neutral (the same text in every class):** `README.md`, `docs/LAYOUT.md`, `docs/PATTERNS.md`, `docs/CHECKS.md`, `docs/IMAGES.md`, `viewer/README.md`, and `docs/BUILD_CARD.md` sections 1-6.
  They name no class: "the class folder", `<agentPrefix>`, `<pub>_<medium>_<subject><class>`, or a config key; a literal `class4`/`class5` token appears nowhere in them,
  so classctl's `classS -> classT` rewrite cannot damage them. The voiced (r<=29, no `SILENT_VOICE`) material is kept in sections labelled "voiced runtimes" (PATTERNS §9v, §11, LAYOUT §8v, CHECKS "Voiced-runtime rows", BUILD_CARD §1-6 bullets).
- **Per class (never merged):** `docs/BUILD_CARD.md` section 7 (decisions log) and section 8 (open questions). This tree ships both EMPTY. Class 4's history (including the 2026-10-06 row about `--class`) and class 5's stay in their own files.

## Re-applying this work when class 5 changes

Prerequisite: `subst U: "<path of _unify-work>"` (every script names this folder as `U:/`; the mapping vanishes at logoff). Then:

1. `bash util/snapshot.sh` takes a fresh snapshot of class 4's and class 5's code (`snap4`, `snap5`, `class5-code.md5`, `snapshot-time.txt`); `node util/drift.mjs` says whether class 5 has moved since.
2. `bash util/rebuild.sh` rebuilds the tree from the snapshots with the exact-string edits in `util/p*.txt` and `util/rb*.mjs` (new files come from `util/nf/`; the head runtime is class 5's current head, checked against its newest frozen snapshot by `util/headcheck.mjs`). An edit that no longer matches exactly once stops the rebuild and names it: a stopped rebuild is a RESULT (class 5 changed that region), not something to patch around.
3. `bash util/proof.sh` is the regression gate: scratch classes made from the tree and from class 4's and class 5's own code, the two finished voiced class 4 slots (`_regression-c4-copy`) and class 5's slot, `check` on each, `publish` dry runs; then `node util/cmp.mjs <base>.check.json <unified>.check.json` (row for row), `node util/cmpout.mjs <base out> <unified out>` (the ported pairs) and a diff of the publish logs. Run it after every sync: a new class 5 row that is not gated by what the pinned runtime's source contains shows up here as an extra row on class 4's r21 chapters.
4. `node util/mkunify.mjs` and `node util/mkpatch.mjs` regenerate this file, `config-keys.md` and the two patches (`unify.patch` for code, `unify-docs.patch` for docs; the head runtime is a copy, not part of either).

## For classctl (interface notes)

- `skinLibraries`: classctl's form (skins directories, `["assets/skins", "../class<M>/assets/skins"]`) is what `lib/core/env.mjs` expects; a bare class folder is accepted too and the class's own entry is ignored.
- `fenceFile` is not a class-identity key: `new` clones it from the source config, so class 5's config must carry `"fenceFile": "../class4/.fence.json"` (see the migration table) for every later class to inherit it. Do not write `classDir` or `ageBand` into a class config.
- The voiced skeleton is `lib/build/skeleton.voiced.tsx` (not under `runtime/`) so the manifest's `lib/**` glob carries it; `runtime/skeleton.tsx` is the new style.
- `README.md` ends with the `<!-- classctl:notes -->` marker; `docs/BUILD_CARD.md` has an empty section 7 and 8. No doc or code comment contains a literal `classN`, `mathsN_ch` or `udgamN` token (placeholders are `class<N>`, `class<M>`, `class<first>`); prose such as "Class 4's frozen r1-r21" names the voiced runtime on purpose and will show in classctl's source-class lint.
- Never copied from this tree: `pipeline.config.json` (per class), `package-lock.json`, `UNIFY.md`, `runtime/frozen/**`, anything under `work/`.
- Three edits were made to `classctl.manifest.json` so that a sync reproduces this tree exactly: `pipeline.config.example.json` is `skip` (an example, not a class file); `viewer/README.md` is listed before `README.md` (a glob without a slash matches the basename at any depth, so the class-README tail rule was catching the viewer README); `runtime/runtime.tsx` has `subst: false` (the head is frozen byte for byte; its comments name `class4/docs` and must not be rewritten per class). With them, `classctl sync --from 5 --to 4` (class 5 = this tree's patches) writes class 4's files identical to the tree, and `sync --from 4 --to 5` the same into an unpatched class 5 (results/ctl-compare*.txt).
