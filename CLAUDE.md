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
  approve | publish | runtime | fence | view | voice | images` (`check` ports on a pass, never over a hand-edited pair;
  `publish` is a dry run unless `--upload`; `runtime freeze|pin|seal|status` is the per-chapter runtime).
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
  where the picture has one; a small picture is scaled up (it fills about a third of the working area, digits 64+, cards 110+, labels 40+; LAYOUT section 3, `picture-scale`); the wide keypad (`bigPad: true`, r26) is written into every new tool by `scaffold` (set it to false only when the picture needs the full width). `check` proves it (`answer-blink`, `mascot-think`, `summary-thumbs`, `board-fit`). A chapter gets all of this by
  `runtime freeze` + `runtime pin --ch N` on the owner's word; a finished chapter is not restaled. Classes 4 and 5 carry the same code and
  docs (a new class copies class 5).
- Stage now: **pipeline v1**, set from the reference tool `M1.S1.T2.C4.2D1` (class 4, chapter 1). Chapters are made
  one after another; **publish only after every chapter of a class is made, and only on the user's word**.
- **Each chapter builds on its own runtime.** `work/<chapter_id>/runtime.json` pins a frozen snapshot in
  `class<N>/runtime/frozen/<rN>/`; `class<N>/runtime/runtime.tsx` is the head, where a new feature is written.
  A head edit reaches a chapter only through `node cli.mjs runtime freeze` + `runtime pin --ch N` + a
  re-check of that chapter, with a decision logged in the build card. No other chapter is ever restaled.
  **Batch runtime moves** (2026-10-18; runbook non-negotiable 3): log a gap, freeze once per chapter before the review packs and
  once at step 6 (a third only for a blocker), and another chapter pins the newest head once at its own step 6, never mid-build.
- **A published tool says so, with the time (the owner, 2026-10-21; every class, new classes get it from `classctl new`).** `publish --upload`
  records `status.published` only after a verified upload (a dry run never does); the viewer (tool list, a pill in the preview bar, a step above the
  side panel's tabs), the hub's tool list and `node cli.mjs status` show "Published <local time>", amber "edited since" when the pair changed after
  the upload. Lib and viewer only: no runtime change, no re-pin. The sidecar .json is never stamped (publish and approve check its bytes).
  `class<N>/viewer/README.md` "Published, and when"; `lib/ship/published.mjs`.
- **Small changes to one tool: edit the pair, then `approve`** (the owner, 2026-10-16). An edit, fix or tweak of one existing tool
  is made straight away in its ported pair (`class<N>/output-preview/<chapter_id>/<slot_id>/<slot_id>.tsx` + `.json`), never in
  `work/.../tool.tsx`, and proved with `node cli.mjs approve <slot_id> --ch N --note "what changed"` instead of `check`; `publish`
  uploads only the approved bytes, and `check`/`port` never overwrite a hand-edited pair without `--force`. Making, generating or
  remaking a tool stays on the `work/` flow, and a remake drops the hand edits (the notes in `status.handEdit` say what they were).
  Runbook section "Small changes to one tool".
- **Every act is performed on screen (the owner, 2026-10-16).** When the child taps an action (cut, split, measure, count, carry,
  tidy ...) a real tool does it through `api.act`: a knife, scissors, a ruler, a pencil or an eraser (the ACTION KIT: five pictures made
  once for every tool by `node cli.mjs actionkit` into the generated `runtime/actionkit.tsx`, never read, carried like the mascot) or a
  hand drawn in code; about 1 to 1.5 s, the keys waiting, the pieces reacting (`class<N>/docs/PATTERNS.md` §15, `check`'s `action-anim`).
  A chapter gets it by `runtime freeze` + `runtime pin --ch N` on the owner's word.
- **Poppins travels inside every tool (the FONT KIT, the owner 2026-10-16).** `node cli.mjs fontkit` subsets Poppins 500/600/700 (Latin and
  Devanagari; `class<N>/assets/fonts/`, SIL OFL) into the generated `runtime/fontkit.tsx` (never read, carried like the mascot), so a page or
  device without Poppins shows the type `check` renders (`font-kit` row). A chapter gets it by `runtime freeze` + `runtime pin --ch N`.
- **Round things are round; grids are dark, big and fixed (the owner, 2026-10-17).** A chapati, roti, pizza or cake is a disc cut in wedges
  by the knife, a ribbon or bar stays a strip (`class<N>/docs/PATTERNS.md` §17); a grid of unit boxes has a dark outline on every box, a deeper
  fill on a counted one, is the biggest square beside the OPEN keypad at one fixed size, and its labels are 32+ and dark (LAYOUT §3, PREFLIGHT
  23-25). No key that only undoes the last act (Cut, Measure: no "Lay flat"). Docs and agent templates only: no runtime change, no re-pin.
- **A re-keyed plan: remap the ids, upload where the plan's url says** (the owner, 2026-10-16, class 4 ch 8 v3). When a new plan version
  renumbers a tool's id and its concept ids but keeps its url, rename the slot, its four concept ids and every question id
  (`<concept id>:<slot>`) in the pair and the work folder in ONE pass that never touches a url, `fetch` the new version, and `approve`
  again; `publish` then uploads to the folder and file name the mount's OWN `2d_tool_url` names (a stem that is another mount's id, or not a
  media id, is refused) and writes the .json with `component` set to that file name.
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
  change and a git push are three sessions, not one. The root `token-policy.json` is mandatory: adaptive mode targets
  less than 100k-token contexts, treats 150k as a hard escalation threshold, caps builders at 3, reviewers at 2, and
  Opus agents at 2. Maths review remains per tool; visual/play review is pattern- and risk-based. Batch language,
  status, checks, image reuse and upload auditing. Checkpoint before a session limit and resume from state.
- The old ICSE Class 6 pipeline is in `_archive/icse6_corpus.zip`; do not open it.
