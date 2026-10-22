# The Udgam maths tool pipeline (one code base for every class)

Every tool is one phase-mounted React component on a 1600 x 900 stage, built from the lpv2 learning plan,
checked, and (once every chapter is made) published as one standalone `.tsx` + one `.json`.

This folder's **class** is `pipeline.config.json` -> `defaults.class`; nothing else in the code names a class. The same code runs in
every class folder (`class<N>/`); what differs between them is the config, the frozen runtimes, the chapters in
`work/` and each class's own decisions log (`docs/BUILD_CARD.md` §7).

## Two kinds of runtime, one code base

A chapter builds on its own frozen runtime (`work/<chapter_id>/runtime.json` -> `runtime/frozen/<rN>/`). `check`, `preview`, `port`,
`publish`, `voice`, `scaffold` and `images` decide what to do **by what that runtime's source contains** (`lib/core/caps.mjs`), never by a
runtime number and never by the class:

| the pinned runtime | lesson | rows `check` runs | `voice` | `publish` | `scaffold` writes |
|---|---|---|---|---|---|
| **voiced** (no `const SILENT_VOICE = true`: Class 4's frozen r1-r21) | spoken (device speech + baked Hindi/Gujarati clips in `voice.tsx`), "Tap to start" cover | the voice rows: `mute`, `voice-pick`, `sound-on-start`, `voice-sync`, `voice-no-repeat` | bakes the clips | ship copy: clips as `<sha1>.ogg` files | `lib/build/skeleton.voiced.tsx` |
| **silent** (`const SILENT_VOICE = true`: r30+, the head) | printed on the bubble, sound effects only, action-driven guide steps, hint under the pinned instruction, Hint key, start page, board layout, phase party | the silent rows: `silent`, `sound-button`, `tr-coverage`, `one-page`, `bubble-no-repeat`, `hint-*`, `guide-steps`, `classroom`, `phase-party` ... (a feature row only if the runtime has the feature) | says there is nothing to bake | no clips (`silent: no clips`) | `runtime/skeleton.tsx` in the full new style |

A chapter already built and published on a voiced runtime keeps checking, porting and publishing exactly as it did; a chapter pinned to a new
frozen runtime (freeze the head, `runtime pin --ch N`) gets the new style. Nothing moves until a chapter is pinned forward on the owner's word.

## Setup (once)

```
cd <class folder>          # class<N>
npm install
node cli.mjs doctor        # class, env keys (masked), lpv2 DB, GCS key + bucket, Chrome
```

## The order of work for a new chapter

In Claude Code: "according to @udgam_maths_claude.md make tools for class N udgam chapter M" (or `/gen-tools N udgam M [SLOT_ID]`) runs the whole
chapter with builder and reviewer agents (the runbook is `../udgam_maths_claude.md`). By hand, inside the class folder:

| step | command | what happens |
|---|---|---|
| 1 plan | `node cli.mjs fetch --ch N` | lpv2 -> `work/<chapter_id>/<id>/` for every 2D mount: `brief.md`, `slot.json`, `status.json` |
| 2 scaffold | `node cli.mjs scaffold <id> --ch N` | `tool.tsx` from the skeleton the pinned runtime asks for, pre-filled from the plan (the new style: `board: true`, a start page, a guide step with a hint a phase, `TR`, free play), and `readlist.md`: the builder's reading list (pointers into the docs by their real headings; `node lib/build/readlist.mjs <id> --ch N` makes it again) |
| 3 build | edit `tool.tsx` | the working area and the maths only (`docs/LAYOUT.md` §11); read `docs/PREFLIGHT.md` first (what tools are failed on); inner loop `node cli.mjs check <id> --ch N --no-render` |
| 3b visual pass | `node cli.mjs design <id> --ch N` | ONCE, when the quick check is clean (runbook step 4b): Gemini restyles `tool.tsx` for looks only (logic, `TR`, `PHASES`, `<Skin>`, `api.*` and every printed sentence kept; syntax and printed text are checked, else it reverts to `tool.tsx.pre-design`); then `check --no-render`, `shots` and `shots --state start`; the full check is its gate. Needs `GEMINI_API_KEY`; the CLI refuses a tool already ported or published (`--force`) |
| 4 preview | `node cli.mjs preview <id> --ch N` | `<id>.preview.html`: open it in a browser (user mode; `?mode=ai` for AI mode) |
| 5 check | `node cli.mjs check <id> --ch N` | ONE full check once the quick one is clean; every check in `docs/CHECKS.md`; fix every FAIL. A pass ports straight away (`output-preview/`, proved in the host emulator): the tool is in `node cli.mjs view` the same run |
| 6 look | `node cli.mjs shots <id> --ch N` | one contact sheet of every phase (`--state wrong` for the traceback; `--state party`, `--panel open` on a runtime that has them); `shots <id> --ch N --pack [--changed]` makes the review pack (every frame at full size in en, hi, gu: `docs/REVIEW_PACK.md`) |
| 7 review | staged, then with the user | the maths reviewer first on the final English, then the image pass (EVERY tool: real objects, not plain blocks, `docs/IMAGES.md`) and languages (7b), then the visual reviewer (from the pack) and the play tester once on the near-final tool (`docs/PLAYBOOK.md`, `lib/check/playhelpers.mjs`); small edits, then 4-6 again |
| 7b languages | `shots <id> --ch N --lang hi` / `--lang gu`, then `check` | the tool's `TR` table (Hindi, Gujarati) is filled once the English is final (`docs/PATTERNS.md` §11). Voiced runtime: `node cli.mjs voice <id> --ch N` then bakes the clips. Silent runtime: nothing is baked, `check` (`tr-coverage`) lists any printed line still missing |
| 8 finish | `node cli.mjs clean --ch N` | the end-of-chapter tidy (`<id> --ch N` for one slot; `--dry` lists, `--html` drops the preview page too): review artefacts (PNG sheets, `.build/`, logs) of every slot whose check passed and is fresh are removed; a failing or stale slot is left as it is |
|  | then the next slot, then the next chapter | `node cli.mjs status --ch N` shows every slot's stage and last check |
| 9 ship (later) | `node cli.mjs publish <id>` | only after every chapter is made; a dry run until `--upload`, which needs the user's word |
| small change | edit the pair in `output-preview/`, then `node cli.mjs approve <id> --ch N --note "what changed"` | a small change to one finished tool is made in its ported pair, never in `tool.tsx`, and proved on the pair's own bytes instead of `check` (the host emulator; every phase driven in en, hi, gu at 1600 x 900 and in a phone window 844 x 390 with the layout judges of `check`; the key's corner clear; `approve-*.png` in the slot); `publish` uploads only the approved bytes. `check` and `port` never overwrite a hand-edited pair without `--force`; a remake drops the edits (runbook "Small changes to one tool") |

`node cli.mjs view` opens a local React app (`viewer/`, `viewer/README.md`) that renders every `output-preview/` pair the way the host runs it,
with a sidebar: sidecar JSON checks, the pipeline's own status (with re-run buttons for `check` and `hostsim`), and live diagnostics off the
running tool. Its header, the chapter titles and counts in its rail, and its port all come from `pipeline.config.json` and the folders.

## Config keys (`pipeline.config.json`; `pipeline.config.example.json` is a complete example)

A key may be left out: the default is derived from `defaults.class` (written N below), so a new class needs only its own file.

| key | default | what it does |
|---|---|---|
| `defaults.class` | (required) | the class of this folder: chapter ids (`<pub>_<medium>_<subject><N>_ch<n>`), the viewer port, the age band, the Gemini batch name |
| `defaults.pub` / `medium` / `subject` / `version` | (required) | `indiannica` (`udgam` is its alias), `eng`, `maths`, `active` |
| `lpDest`, `lpTables`, `pubAliases` | (required) | the lpv2 tables and publication aliases |
| `envFiles`, `gcpKeyFile` | (required) | secrets files, by path (never opened by hand; `doctor` masks them) |
| `runtime` | `runtime/runtime.tsx` | the head runtime, where a new feature is written |
| `skeleton` | `runtime/skeleton.tsx` | the new-style skeleton, used when the chapter's pinned runtime is silent |
| `legacySkeleton` | `lib/build/skeleton.voiced.tsx` | the old skeleton, used when the pinned runtime is voiced |
| `workDir`, `outDir`, `textbooks`, `mascot`, `bundled` | (required) | folders, the textbook folder, the mascot picture (`../kiko.svg`, or a PNG), libraries `port` inlines |
| `classDir` | `class<N>` | how messages, the sidecar's `build.runtime` and the docs name this folder |
| `agentPrefix` | `udgam<N>` | the agents of this class are `.claude/agents/<agentPrefix>-tool-builder.md` ... (`doctor` prints the name) |
| `ageBand` | `<N+4>-<N+6>` | the children's age the prompts name (class 4: 8-10, class 5: 9-11) |
| `viewerPort` | `5175 + 2N` | the port of `node cli.mjs view` (class 4: 5183, class 5: 5185) |
| `skinLibraries` | `[]` | skins directories this class may READ (never write), relative to the class folder, as classctl writes them: `["assets/skins", "../class<M>/assets/skins"]` (the entry for the class's own `assets/skins` is ignored; a bare class folder `"../class<M>"` is accepted too): a skin or raw picture found in another class is free (`docs/IMAGES.md`) |
| `fontconfig` | (none) | a fontconfig file that adds Poppins (the platform's font) for the Chrome `approve` runs; the env `C4_FONTCONFIG` wins. A machine's own path: keep it in the env |
| `fenceFile` | `.fence.json` | the read fence's state file. The hook in `.claude/hooks` reads ONE file (it imports the first class's `fence.mjs`), so every class after the first sets `"../class<first>/.fence.json"` |

A class-specific word in a doc is written neutrally ("the class folder", `<agentPrefix>`, `<pub>_<medium>_<subject><class>`) or is one of
these keys; there is no per-class doc. Only `docs/BUILD_CARD.md` §7 and §8 are per class (each class's own decisions history): the unified
tree ships them empty and `classctl` merges a class's own rows in.

## Where things are

```
<class folder>/
  README.md              this page: the order of work, the two kinds of runtime, the config keys
  docs/
    LAYOUT.md            the final layout every tool follows (stage, board, start page, zones, controls, modes, sound, voiced sections, look)
    BUILD_CARD.md        how a tool is made: contract, steps, token rules, runtime API (§1-6 neutral); §7 decisions log and §8 open questions: PER CLASS
    CHECKS.md            what `check` proves, which rows a voiced and a silent runtime run, and what is still judged by eye
    PATTERNS.md          every pattern a tool uses (read this, never another chapter's tool)
    PREFLIGHT.md         one page: what tools are failed on (the builder reads it first)
    PLAYBOOK.md          how the play tester plays: check's rows first, then exploratory probes
    IMAGES.md            object skins and the keypad theme
  runtime/               shared by every tool of the chapters that pin it
    runtime.tsx          the HEAD: the chrome and the machinery; a new feature is written here, then frozen
    frozen/<rN>/         immutable snapshots, named by each chapter's work/<chapter_id>/runtime.json (a class keeps its own)
    mascot.tsx           GENERATED from kiko.svg (node cli.mjs mascot); never edit or read
    actionkit.json       the ACTION KIT plan: the five tools api.act draws (knife, scissors, ruler, pencil, eraser; docs/IMAGES.md §11)
    actionkit.tsx        GENERATED by node cli.mjs actionkit (made once for every tool, carried like the mascot); never edit or read
    fontkit.json         the FONT KIT plan: Poppins 500/600/700 (assets/fonts/, SIL OFL 1.1), the unicode ranges (docs/LAYOUT.md §9)
    fontkit.tsx          GENERATED by node cli.mjs fontkit (woff2 data URIs, carried inside every tool like the mascot); never edit or read
    skeleton.tsx         the template `scaffold` fills for a silent runtime (full new style)
  lib/                   the CLI's modules, by step
    core/                env (config + secrets + the class helpers), caps (what a pinned runtime can do), args, work, pin, fence, chrome, png
    plan/                lp (lpv2 fetch, plan choice, mounts), brief (the slot's brief.md)
    build/               scaffold, readlist (a slot's reading list), skeleton.voiced.tsx (the template for a voiced runtime), preview (the offline HTML + drives), mascot, shots (contact sheets), pack (the review pack, `shots --pack`), voice
    check/               check (all checks), model, input (real mouse/finger/keys), silent (the silent-lesson judges), playkit, playhelpers, padshape, approve (a hand-edited pair, proved)
    finish/              clean
    images/              the skin and theme pipeline (`images make`, `sheet`, `status`, `list`) and the ACTION KIT (`actionkit`)
    design/              the Gemini visual pass (`design`): prompts, the Gemini call, the syntax check, the printed-text guard and its test
    ship/                port (standalone pair), hostsim (the app's loader, copied), publish, voiceship, gcs, hostTemplate
  cli.mjs                one CLI for every step
  pipeline.config.json   this class's config (see the table above)
  viewer/                `node cli.mjs view`: a local React app for output-preview/, see viewer/README.md
  work/<chapter_id>/<id>/   brief.md · slot.json · tool.tsx · status.json · <id>.preview.html
  output-preview/<chapter_id>/<id>/    <slot_id>.tsx + <slot_id>.json (made by port; slot id = the plan's mount id)
```

This folder is a copy of `class4/` (docs, lib, runtime with its frozen snapshots, viewer) made on 2026-10-06 for Udgam
Class 5; it has no finished tool to copy from. Every pattern a tool uses is in `docs/PATTERNS.md`. Chapter ids here
read `indiannica_eng_maths5_ch<n>`. The viewer runs on port 5185 (Class 4's is 5183); the read-fence state file is
shared with `class4/` (`../class4/.fence.json`), because the hook reads that one. The textbook folder is
`C:/Users/Karan Shah/Desktop/reasonify/maths_lp/textbooks/class-5-udgam` (PDFs: only specific pages, never whole).
