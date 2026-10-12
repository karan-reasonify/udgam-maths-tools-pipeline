# maths_pipeline: Udgam maths tools, one pipeline folder per class (`class4/`, `class5/`, ...)

- Each class has its own folder `class<N>/` (CLI, lib, runtime, docs, viewer, tools). Read
  `class<N>/docs/BUILD_CARD.md` (procedure) and `class<N>/docs/LAYOUT.md` (the final layout);
  `class<N>/docs/CHECKS.md` says what `check` proves; `class<N>/docs/PATTERNS.md` shows how a tool uses the
  runtime (read it instead of another chapter's tool). The order of work is in `class<N>/README.md`.
- To make a chapter's tools, follow **`udgam_maths_claude.md`** (the runbook, the same for every class):
  "according to @udgam_maths_claude.md make tools for class <N> udgam chapter <n>" (add `lean` for fewer
  tokens), or `/gen-tools <N> udgam <n> [SLOT_ID] [lean]`. If `class<N>/` does not exist the runbook makes it
  (`node classctl.mjs new --class <N>`) and tells the owner the defaults used. It uses the agents in
  `.claude/agents/`, named by the class's `agentPrefix` (`udgam` for class 4, `udgam<N>` for the rest):
  `<pfx>-tool-builder` (one per slot) and five that only report: `-maths-reviewer`, `-visual-reviewer`,
  `-play-tester`, `-upload-auditor`, `-image-agent` (generated from `_templates/agents/`).
- CLI (run in `class<N>/`): `doctor | list | fetch | scaffold | preview | check | shots | clean | status | port |
  publish | runtime | fence | view | voice | images` (`check` ports on a pass; `publish` is a dry run unless
  `--upload`; `runtime freeze|pin|seal|status` is the per-chapter runtime).
- **Every class on one page: `node viewhub.mjs`** (this folder, http://localhost:5170; `viewer-hub/README.md`): Class and Chapter
  dropdowns and a tool list, each class's own viewer embedded; it starts the viewers and finds a new `class<N>/` itself. Change a
  viewer (its `?embed=1` support too) in the newest class and carry it with `classctl sync`/`new`, never by copying between class
  folders; the hub is a root tool that classctl does not copy.
- **Carrying code between classes: `node classctl.mjs`** (in this folder; read `CLASSCTL.md`). `status` shows each
  class; `sync --from <M> --to <N>` is a dry run until `--apply` (then it backs up the target first) and never
  touches `work/`, `output-preview/`, `runtime/frozen/`, pins, `.fence.json`, `assets/` or the target's own
  BUILD_CARD §7; `new --class <N>` makes a class folder from the newest class's code. Never copy code between
  class folders by hand, and run a `sync --apply` only on the owner's word.
- **Voiced or silent runtime.** A chapter's pinned runtime either speaks (voiced, legacy: class 4, pinned r21,
  Hindi and Gujarati baked into the generated `voice.tsx`) or is silent (the runtime has `SILENT_VOICE`: class
  5 from r30; the bubble is the guide, a `TR` table carries the printed Hindi and Gujarati). The runbook's
  non-negotiable 9 says what each means; never read or edit `voice.tsx` (generated base64); never pin class
  4's r11.
- Stage now: **pipeline v1**, set from the reference tool `M1.S1.T2.C4.2D1` (class 4, chapter 1). Chapters are made
  one after another; **publish only after every chapter of a class is made, and only on the user's word**.
- **Each chapter builds on its own runtime.** `work/<chapter_id>/runtime.json` pins a frozen snapshot in
  `class<N>/runtime/frozen/<rN>/`; `class<N>/runtime/runtime.tsx` is the head, where a new feature is written.
  A head edit reaches a chapter only through `node cli.mjs runtime freeze` + `runtime pin --ch N` + a
  re-check of that chapter, with a decision logged in the build card. No other chapter is ever restaled.
- **One session, one chapter, one class.** A read fence refuses another chapter's `work/`; every pattern a
  builder needs is in `class<N>/docs/PATTERNS.md`. A deliberate look: `node cli.mjs fence --off`, then `--on`.
  Slot ids repeat across classes: work only in your class's folder.
- The LP comes from lpv2 (`lp2_*` tables). Env precedence: process > `.env` > `Python-backend/.env`. The
  GCS key is `config.json`. Never open `.env` or `config.json`; they hold secrets.
- Token rules (full mode, no look removed): a builder reads `class<N>/docs/PREFLIGHT.md`, the slot's `readlist.md` (pointers
  into the build card §1-6, all of LAYOUT, the PATTERNS sections the tool needs), its `brief.md` and `tool.tsx`; it edits, never
  rewrites; its inner loop is `check --no-render`, then one full `check`. Reviewers run in a staged order (maths, then the language
  pass, then visual + play once) and the visual reviewer works from the review pack (`node cli.mjs shots <slot> --pack`: every
  frame at full 1600x900 in en, hi, gu; `--changed` on a re-review looks only at what changed). `clean --ch N` tidies at the end.
- The old ICSE Class 6 pipeline is in `_archive/icse6_corpus.zip`; do not open it.
