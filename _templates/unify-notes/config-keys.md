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
