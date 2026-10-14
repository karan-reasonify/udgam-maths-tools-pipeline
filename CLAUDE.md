# maths_pipeline: Udgam maths tools, one pipeline folder per class (`class4/`, `class5/`, ...)

- Each class has its own folder `class<N>/` (CLI, lib, runtime, docs, viewer, tools). Read
  `class<N>/docs/BUILD_CARD.md` (procedure) and `class<N>/docs/LAYOUT.md` (the final layout);
  `class<N>/docs/CHECKS.md` says what `check` proves; `class<N>/docs/PATTERNS.md` shows how a tool uses the
  runtime (read it instead of another chapter's tool). The order of work is in `class<N>/README.md`.
- To make a chapter's tools, follow **`udgam_maths_claude.md`** (the runbook, the same for every class). It is read
  on demand, never auto-loaded: the owner types `according to @udgam_maths_claude.md make tools for class <N> udgam chapter <n>`
  (the `@` attaches it to that prompt; add `lean` for fewer tokens), or `/gen-tools <N> udgam <n> [SLOT_ID] [lean]`
  reads it. Do not write the `@` in this file outside a code span: Claude Code would import the whole 35 KB runbook into
  every session, build or not. If `class<N>/` does not exist the runbook makes it
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
- **The mascot is Kiko** (`kiko.svg` in this folder, since 2026-10-13), not `mascot.png`. Every class's `pipeline.config.json` `mascot` is `../kiko.svg`; `node cli.mjs mascot` (in `class<N>/`) renders it to the inline WebP in `runtime/mascot.tsx` (never read it). Frozen runtimes never change: class 5's r1-r52 and all of class 4's keep the old robot, **r53 is the first with Kiko**, and a chapter has Kiko only when it is pinned to r53 or later (a class made by `classctl new` starts from the newest head, so it has it). **From r54 Kiko CHEERS**: a second picture (`MASCOT_CHEER`, made by the same `node cli.mjs mascot` from the SVG's own layers: arms up, happy eyes) shows with the party (three jumps, sparkles) and for 0.9 s after any right answer; `phase-party` asserts it, and a PNG mascot simply has no cheer.
- **Pictures are real objects, not plain blocks (the default for every class and chapter; no prompt has to ask).** Whatever a tool lets
  the child share, cut, count, pour, weigh or measure is a real everyday object that matches the content and the operation (a chocolate
  bar, a roti, buttons, a jug, a kitchen scale), made by the image pass (runbook step 5c, `class<N>/docs/IMAGES.md`), and the builder
  draws `<Skin>` over every such piece. A plain block needs a stated reason: digits and marks, a geometry lesson's shapes, people and
  the mascot, a piece too thin to show a picture or past 40 skins a screen, or a skin that would teach a wrong model.
- **Standard look, in every class (from class 4 r23, class 5 r55 on; the head of 2026-10-13):** the header's three buttons are the owner's
  picture (a cream glossy disc on a tan rim: yellow bulb, blue speaker with orange waves, green refresh arrow; `HeaderControl`, LAYOUT §2);
  every start page and Enter / Answer / Start key wears a theme's berry colours (`DEFAULT_THEME` when a tool has no skins), never the chrome's
  grey (`check`'s `start-page` row proves it); word-choice keys fit a long word. **From class 4 r25 / class 5's next freeze:** the pink Answer key
  (and its "Tap the blinking Answer key." line) shows only while a typed question waits with the keypad shut, and a `pad: "enter"` question's
  berry Enter key blinks only once the tool says `api.answerReady(true)`; Kiko THINKS (a third picture `MASCOT_THINK`, a thought puff) from a
  question's opening until the child's first tap, and a bulb pops on the Hint key; a held or doubled Enter, a double tap and a classroom skip
  are guarded; the summary `Thumb` gets the item as `last.it` (`last.item` is the INDEX); a decimal answer is written on the Decimal card
  where the picture has one. `check` proves it (`answer-blink`, `mascot-think`, `summary-thumbs`). A chapter gets all of this by
  `runtime freeze` + `runtime pin --ch N` on the owner's word; a finished chapter is not restaled. Classes 4 and 5 carry the same code and
  docs (a new class copies class 5).
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
- Session hygiene (measured: `node usage.mjs session`; what a role loads: `node usage.mjs static --class <N>`). A session re-reads
  its whole context on every call, so what a big read leaves in it is paid for on every later call. Never read a generated
  bundle (`*.preview.html`, `.build/`: the `chapter-fence` hook refuses it; `fence --off` is the deliberate look); read the
  source, a `check` row, a docs section or a `Grep -n` hit instead. Read a big file (`tool.tsx`, a log, a diff) by range, and
  hand a long read-and-report job to an agent so only its report lands here. One task per session: a chapter build, a viewer
  change and a git push are three sessions, not one.
- The old ICSE Class 6 pipeline is in `_archive/icse6_corpus.zip`; do not open it.
