# Udgam maths: 2D tool runbook (for Claude Code), for any class

<!-- classctl:runbook-v1 -->

The one file to follow when making the 2D tools of an Udgam (publication indiannica) maths chapter of **any
class** (3, 4, 5, ...) from its lpv2 plan. It says **what runs, in what order, who does it, and when to stop
for the user.** The rules for a tool live in `class<N>/docs/` (BUILD_CARD, LAYOUT, CHECKS, PATTERNS); this
file does not repeat them.

Throughout: `<N>` is the class number in the request, `class<N>/` its folder (its own CLI, lib, runtime,
docs, viewer and tools), `<pfx>` its agent prefix (`agentPrefix` in `class<N>/pipeline.config.json`: class 4
is `udgam`, every other class `udgam<N>`) and its chapter ids read `indiannica_eng_maths<N>_ch<n>`. The
folders are kept in step by `classctl.mjs` (next to this file), never by copying by hand.

## The one line

```
according to @udgam_maths_claude.md make tools for class <N> udgam chapter <n>
```

Variants, same flow:
- `... chapter <n> lean`: **lean mode**, fewer tokens (step 5): the maths reviewer on every tool, the visual
  reviewer and play tester only where a tool brings something new. Without `lean` it is the full mode.
- `make ONE tool for class <N> udgam chapter <n> [M1.S1.T2.C4]`: one slot only (add `lean` the same way).
- `continue chapter <n> of class <N>`: pick up where the chapter stands (`node cli.mjs status --ch <n>`).
- `review round for chapter <n> of class <N>: <answers>`: apply the user's review answers (step 9).
- `upload chapter <n> of class <N>`: step 10, only when the user says it.
- `remake chapter <n> of class <N>`: the REMAKE path below, only when the user says it.

`/gen-tools <N> udgam <n> [SLOT_ID] [lean]` is a shortcut into this same flow.

## Non-negotiables

1. **Secrets.** Never open `.env` or `config.json`; print env values only masked (`doctor` does).
2. **Upload only on the user's word**, after they have reviewed the previews. Dry runs are always fine.
   `--apply` (writing `lp2_media` rows) also needs their word, row by row.
3. **Every chapter builds on its own runtime.** A chapter pins a frozen snapshot
   (`work/<chapter_id>/runtime.json` -> `runtime/frozen/<rN>/`), and `sources()` builds every tool of
   that chapter on it. `runtime/runtime.tsx` is the head: where a new feature is written. Changing the
   head changes nothing anywhere until a chapter is pinned to a new snapshot, so **no other chapter is
   ever restaled, re-checked or even read.** To give YOUR chapter something new:
   `node cli.mjs runtime freeze` -> `runtime pin --ch <n>` -> re-check **this chapter only**; log a row
   in `BUILD_CARD.md` §7. A snapshot is immutable (`runtime-pin` fails a tool whose snapshot was
   edited). A finished chapter moves forward only when the user asks for it.
4. **A general rule goes into the pipeline, not one tool.** When a review answer applies to every tool
   (as "corrections end on the whole answer" did), put it in the docs, the runtime or a check, log it
   in §7, and apply it to all tools of the chapter. When it applies to every class, it goes into the class
   that is being worked on and reaches the others through `classctl sync` (non-negotiable 10).
5. **Ask about real doubts; don't assume.** Batch them into one question with a recommended option. When
   the user answers "do what suits class <N>", choose on pedagogy and state each choice in one line.
6. **Token rules.** Read only what a step names. Never read `slot.json`, `plan.json`, previews,
   `.build/`, `output-preview/`, `runtime/mascot.tsx`, `voice.tsx`, `images.tsx` or PDFs (deny rules enforce most
   of them; a hook also refuses `*.preview.html` and `.build/`). Every byte a session reads stays in its context and is
   paid for again on every later call, so the main session does not read tool sources, sheets or logs itself: the agent
   that owns the slot reads them and its report (at most 40 lines) is what lands here. Measure with `node usage.mjs`
   (`session`: provider-reported tokens of a transcript; `static`: what each role loads before it starts).
7. **Never touch, and never read, another chapter's tools.** The read fence refuses it (one session,
   one chapter) and `class<N>/docs/PATTERNS.md` holds every pattern a builder used to copy out of a
   finished tool. A deliberate cross-chapter look is `node cli.mjs fence --off`, then `--on` again.
   **Never touch another class's folder either:** a session works in `class<N>/` only (the builder agents
   say so), and slot ids repeat across classes.
8. **Real input only through `class<N>/lib/check/playkit.mjs`** (one headless Chrome per agent). The
   shared Playwright browser is off limits in parallel work; builders step on each other there.
9. **Know whether the chapter's runtime is VOICED (legacy) or SILENT.** `node cli.mjs runtime status` names
   each chapter's pin; a runtime is silent when its source has `SILENT_VOICE`
   (`grep -c SILENT_VOICE class<N>/runtime/frozen/<rN>/runtime.tsx`: a count, never read the file). Class 4's
   chapters 1-14 are pinned to r21, a voiced runtime; class 5 is silent from r30; a class made by
   `classctl new` has the silent or voiced head of its source class. Every tool speaks **three languages on
   screen: English, Hindi, Gujarati**: its English stays exactly as the checks read it and a `TR` table, keyed
   by the English, carries the translation (`docs/PATTERNS.md` §11). What differs:
   - **Voiced runtime (legacy; class 4):** the lesson is spoken. The English uses the device voice; the
     Hindi and Gujarati speech is **baked**: `node cli.mjs voice <slot> --ch <n>` writes the generated
     `voice.tsx` (Google TTS, about $0.15 a tool). The chapter needs runtime **r21 or later** (r21 can load
     clip files); **never pin r11** (an older, unguarded clip loader that fails `port`). `voice.tsx` is about
     1 MB of base64: never read it, never edit it. **Publishing:** the host's hard limit is 1 MB a tool and the
     clips alone are 1-2 MB, so `publish` writes a **ship copy** (the way NCERT ships): each clip becomes a
     `<sha1>.ogg` file in `<chapter>/2dtool/_voice/`, the tool keeps a text -> file index and
     `TOOL_VOICE_BASE` (about 240 KB), and the local tool stays inline. `publish --upload` puts the clips
     up first and verifies them over the public URL.
   - **Silent runtime (class 5, and classes made from it):** nothing is spoken; sound effects only. The
     bubble prints every line and is the guide: guide `steps` with a hint each, `api.did(...)` at every
     click, the Hint key, one sentence a bubble page; the lesson moves on when the child acts (PATTERNS §9b).
     Nothing is baked: `voice` only says so, `check`'s `tr-coverage` proves the printed Hindi and Gujarati,
     and `publish` reads "silent: no clips". A voiced tool's builder agent reads the legacy voiced section
     of PATTERNS and the voice steps below; a silent one follows the new style. Never mix the two in one
     chapter.
10. **Code moves between classes with `classctl`, never by hand, and only on the user's word.**
    `node classctl.mjs status` shows each class, its runtime head, how many code files differ from the
    newest class and the last sync. `node classctl.mjs sync --from <M> --to <N>` is a **dry run** (it lists
    every file NEW / CHANGED / MERGED / CONFLICT / IDENTICAL / SKIPPED and writes nothing); `--apply` first
    backs up the target's code and needs the user's word. A sync never touches `work/`, `output-preview/`,
    `runtime/frozen/`, a chapter's pin, `.fence.json`, `assets/`, the caches, `.env` or `config.json`, and keeps
    the target's own `BUILD_CARD.md` §7. Read `CLASSCTL.md` before a sync. A sync can carry code that does
    not fit a class's pinned chapters (a silent class's checks into a voiced class): read the dry run's
    "review before --apply" and "capability" notes and ask.

## Agents (`.claude/agents/`, named `<pfx>-<role>`)

| agent | when | does | edits |
|---|---|---|---|
| `<pfx>-tool-builder` | step 4, one per slot, in parallel (after the pilot, if the owner chose one); step 5b (language pass) and every fix by SendMessage | reads `docs/PREFLIGHT.md` and its `readlist.md` first, builds `tool.tsx` on the quick check (`check --no-render`) and ONE full `check`, reports; then adds the Hindi/Gujarati `TR` table (and, on a voiced runtime, bakes the voice) | its slot's `tool.tsx` (and the generated `voice.tsx`) only |
| `<pfx>-maths-reviewer` | step 5, per tool, FIRST, on the final English tool | maths, textbook method, giveaways, corrections, plan fidelity | nothing |
| `<pfx>-visual-reviewer` | step 5d, per tool, ONCE, on the near-final tool (after the language pass) | English, Hindi and Gujarati in one pass, from the review pack (`shots --pack`: every frame at full size; `--pack --changed` on a re-review), vs LAYOUT | nothing (makes PNGs) |
| `<pfx>-play-tester` | step 5d, per tool, ONCE, on the near-final tool | starts from the rows `check` already played (`lib/check/playhelpers.mjs`, `docs/PLAYBOOK.md`) and adds exploratory probes with a real mouse, finger and keys | nothing (makes PNGs) |
| `<pfx>-upload-auditor` | step 7, per chapter | output files vs the live plan, host emulator, dry run | nothing |
| `<pfx>-image-agent` | step 5c (after the maths reviewer is clean, before the language pass), optional, per tool: only when the brief's Description/For the child/Look/Student controls name a concrete everyday object that is shared, cut, counted or measured | writes `images.json`, runs `node cli.mjs images make`, views the pictures | nothing in `tool.tsx` (writes `images.json`; the CLI writes `images.tsx`) |

The agent files are generated from `_templates/agents/*.md.tpl` by `classctl` (`new` and `sync`), so they are
the same for every class except the class number, the prefix and the age band. Models (the `model:` line of
each agent file, to keep tokens down): the builder runs on Opus; the three reviewers on Sonnet; the auditor
on Haiku. Which reviewers run depends on the mode (step 5: full or lean); in both the order is the same (maths
reviewer first, then the image and language passes, then the visual reviewer and play tester once), and a
reviewer is re-run only after a real change, looking only at what changed.

The reviewers report `must-fix`, `should-fix` or `question`. The main session decides: it sends
must-fix and should-fix items to the tool's builder (SendMessage to that builder; it knows its code) or
makes a one-line fix itself, and it batches the questions for the user. Reviewers never fix.

## The flow for a chapter (main session, in `class<N>/`)

**0. Pre-flight.**
- *The class folder.* From the maths_pipeline root: `node classctl.mjs status`. If `class<N>/` does **not
  exist**, run `node classctl.mjs new --class <N>` (add `--from <M>` to copy a class other than the newest;
  `--dry-run` first if in doubt) and **tell the user the defaults it prints**: the children's age (class + 4
  to + 6 years), the plan ids (`indiannica_eng_maths<N>_ch<n>`), the textbook folder (and whether it exists:
  classctl never creates it), the viewer port (`node viewhub.mjs` lists the new class by itself), the agent prefix, the skin libraries, and that
  `node_modules` is linked to the source class's. It also lists the `permissions.deny` rules the new class
  needs in `.claude/settings.json`: it only **proposes** them (`--wire` adds them), so tell the user and let
  them decide. The new folder has its own config, agents, runtime head
  (no frozen snapshot until `runtime freeze`), docs with a fresh §7, and no work. If `class<N>/` exists but
  is behind the newest class (`status` shows how many files differ), say so and offer a `classctl sync`
  (non-negotiable 10); do not sync unasked.
- *The database.* In `class<N>/`: `node cli.mjs doctor`. The DB must say `ok`. If it refuses, the error names
  this machine's IP: tell the user that IP must be whitelisted and stop; build from a saved plan only if
  they say so (`fetch --plan-file`).

**1. Fetch.** `node cli.mjs fetch --class <N> --pub udgam --ch <n>`. Show the mount table (slot id, tool,
phases). Confirm it is the right chapter. Say which plan version is live, and which runtime the chapter
was pinned to (fetch pins a new chapter to the head of that day; it never re-pins an existing one).

**2. Read the chapter once.** Skim each slot's `brief.md` headings (not whole briefs). Using the chapter
notes below (or, for a class without notes, the plan and the textbook pages the briefs name), list what
this chapter needs that the runtime does not have yet (for example a decimal point or a second answer box
on the pad). **A missing input or a new screen element is the user's decision:** ask once, with a
recommended option, before any builder starts; log the answer in §7, build it into the head runtime,
then `node cli.mjs runtime freeze` and `runtime pin --ch <n>` so it is **this chapter's** runtime. Only
this chapter is re-checked; no other chapter moves, and no other chapter's tools are read. A new runtime
name is scanned against this chapter's tools and any chapter sharing the pin (`node cli.mjs runtime status`),
not against every chapter that ever existed. Small drawing needs (a clock face, coins, fraction bars) are
the tool's own: builders draw them in the working area. Settle whether the chapter is on a voiced or a
silent runtime (non-negotiable 9) now. **Ask one more question in that same batch (ask it even when step 2 has
nothing else to ask), with the recommended option: PILOT the first tool of the chapter** through the whole staged
review (steps 4 to 5d) before the other builders start (recommended: yes when the chapter has several tools, since a
finding about the runtime or the shared look then lands once, before tools 2 to N exist; with one tool there is nothing to
pilot). Log the answer in the report.

**3. Scaffold** every slot: `node cli.mjs scaffold <slot_id> --ch <n>` (an existing `tool.tsx` is work in
progress: keep it). It also writes `<slot>/readlist.md`, the builder's reading list: pointers into the docs by their
real headings (PREFLIGHT and LAYOUT whole, BUILD_CARD sections 1 to 6, the PATTERNS sections this tool needs by its
brief and its pinned runtime). For a slot whose `tool.tsx` already exists: `node lib/build/readlist.mjs <slot_id> --ch <n>`.

**4. Build.** Launch one `<pfx>-tool-builder` per slot, all in one message, in the background. The prompt:
the class and chapter number, the slot id, the tool's name, the chapter's notes row, any §7 decision from
step 2, and "report as your agent file says" (its file sends it to `docs/PREFLIGHT.md` and the slot's `readlist.md`
first, and builds on the quick check, then one full `check`). **If the owner chose the pilot,** launch only the
first slot's builder, take that tool through step 5 to 5d, settle any finding about the runtime or the shared
look (step 2's route), then launch the other builders in one message. Don't wait idle: while they build, nothing
else runs in Chrome.

**5. As each builder reports: the STAGED review.** Full mode keeps all three reviewers on every tool. Only the
order and the timing change, so each look happens ONCE, on the tool as it will ship, and no look is dropped. The
order for a tool: **5** maths reviewer on the final English, the builder fixes -> **5c** image pass (if any) -> **5b**
language pass -> **5d** visual reviewer and play tester, once.
- read its report; `node cli.mjs status --ch <n>` shows the check is fresh. A builder stops after 6 full `check` runs
  (per build, and per fix message) and reports a blocker with the failing rows: decide whether to send it on (SendMessage),
  raise its limit in the message, or fix the cause yourself (often a runtime gap, which is step 2's route);
- **the maths reviewer first**, alone, on the final English tool (no check reads giveaways in words, the
  misconception or the textbook's method). Sort its findings: must-fix and should-fix go back to the builder in
  one message, questions go to the user's list; repeat until it is clean. Re-run it only if a finding needed a
  real change. Nothing visual is judged yet, because a maths fix can change the picture;
- **then 5c and 5b**, below. Once the English is final and translated, the tool is near-final;
- **5d. The visual reviewer and the play tester, ONCE, in parallel, on the near-final tool:**
  - **the main session builds the review pack once per round**: `node cli.mjs shots <slot_id> --ch <n> --pack` makes every
    frame at the full 1600 x 900 in English, Hindi and Gujarati into `<slot>/pack/` (`docs/REVIEW_PACK.md` lists them;
    `pack.json` holds each frame's pixel hash). The visual reviewer reviews all three languages in ONE pass from those frames
    (it reads `pack/pack.json` and does not rebuild the pack: a second run in a round moves the baseline `--changed`
    compares with). The full-size frames are the review frames; a contact sheet is only an overview; the reviewer may still
    make extra frames when it suspects something the pack does not show;
  - the play tester starts from the rows `check` already played (`node lib/check/playhelpers.mjs rows <slot_id> --ch
    <n>`), uses `lib/check/playhelpers.mjs` and `docs/PLAYBOOK.md`, and adds only exploratory probes (a double tap, a
    key during a celebration, keyboard only, finger against mouse, classroom, Hindi and Gujarati);
  - sort their findings: must-fix and should-fix go to the builder in one message, questions to the user's list.
    **A fix that changes an English line changes that line's `TR` key in the same edit** (a stale key matches
    nothing, and no check finds it); then a full `check`;
  - **a re-review looks only at what changed.** After the fixes the main session runs `shots <slot_id> --ch <n> --pack
    --changed` ONCE, in all three languages (a `--langs` run leaves the other languages' frames `carried`, not rebuilt),
    and hands the visual reviewer the frames it lists as changed; the reviewer looks ONLY at those (plus the party frames
    when the phase end changed: they are never compared), listing the rest as "unchanged since round k"; the play
    tester re-plays only the probes its findings named;
- **lean mode** keeps the same order for the reviewers that run: the maths reviewer always. Add the **visual
  reviewer** only when the tool draws a kind of picture no finished tool has (a clock face, coins, a bar graph,
  fraction bars, a net). Add the **play tester** only when it has a kind of control no finished tool has (a new pad
  input from step 2, a hand to turn, a bar height to drag, a new drag mechanic). `check` already drags, taps and
  types for real on every tool. When unsure, run it. The report says which reviewers ran for each tool and why.

**5b. Language pass (Hindi and Gujarati).** When a tool's English is final (the maths reviewer is clean and any image
pass is done), SendMessage its builder "language pass": its agent file says how. In both flows the tool gets its `TR` table,
`tx` in `Work` and `Thumb`, the `shots --lang hi|gu` fit sheets, and `check` on 0 FAIL 0 WARN.
- *Voiced runtime:* the chapter must be pinned to **r21 or later** (`runtime pin --ch <n> --version <latest>`,
  then this step covers every tool of it); the builder also runs `node cli.mjs voice <slot> --ch <n>`.
  Run the builders of a chapter in parallel; Google TTS answers 429 when they all bake at once: the `voice`
  re-run picks up from its cache, nothing is billed twice. Ready means: every tool has a TR table, `voice`
  reports no line without an entry, both fit sheets are clean, `check` is 63/0/0. Lines built at run time stay
  silent in hi/gu: the builder lists them and the main session tells the user.
- *Silent runtime:* nothing is baked; `check`'s `tr-coverage` row lists any printed line still missing and
  must pass. Lines built at run time show English in hi/gu unless TR has that exact line: the builder lists
  them and the main session tells the user.
A native speaker should read the first translations (terms, Gujarati especially). A later fix that changes an English
line changes its `TR` key in the same edit (step 5d).

**5c. Image pass (optional; before 5b, once the maths reviewer is clean).** Only for a tool whose brief names a concrete everyday object the child shares, cuts,
counts or measures (`docs/IMAGES.md` §2; often the answer is no skin). Launch `<pfx>-image-agent` with the class and
chapter number and the slot id. The pictures go in `<slot>/images.tsx` (generated by `node cli.mjs images make`, never read or
edited; the skin libraries named in the class's config are reused free, read-only). Then SendMessage the builder to draw `<Skin>` over its plain
shapes (`docs/PATTERNS.md`, the skins section); `check` proves `skin-keys` and `skins-fallback`. `Skin` is in the head runtime from
2026-10-07: a chapter pinned before that first needs `runtime freeze` + `runtime pin --ch <n>` on the user's word
(non-negotiable 3); a chapter fetched later has it from its first pin.

**6. Chapter-wide pass.** When every tool is in: `node cli.mjs check` for each (fresh, on the final
runtime and checker; it ports on a pass), one after another with `C4_CHROME_POOL=4`.

**7. Audit.** Launch `<pfx>-upload-auditor` for the chapter (live dry run for every tool).

**8. Clean and report.** The pipeline tidies itself when the chapter is done: `node cli.mjs clean --ch <n>` ONCE
for the whole chapter (add `--dry` first to see the list). It removes the least important files, the review
artefacts every `shots` / `check` run makes again: PNG sheets and other images, `.build/`, logs and editor
leftovers. It tidies only a slot whose last check passed and is still fresh (a failing, stale or unchecked slot keeps
its sheets: they may be all that shows what is wrong; `--force` overrides). It keeps the source, `voice.tsx`,
`images.tsx` and `images.json`, `brief.md`, `slot.json`, `status.json`, the ported pair in `output-preview/` and the
preview page (`<slot>.preview.html`, check's own page, which the owner opens to review; `--html` drops it too).
`clean <slot_id> --ch <n>` does one slot. Run it after the reviewers and the audit, never before: they look at the
sheets. The user reviews the TSX + JSON pair in the viewer. Start it in the background
(`node cli.mjs view`; the port is `viewerPort` in the class's config, class 4 http://localhost:5183; or `node viewhub.mjs` from the
pipeline root for every class on one page, http://localhost:5170: Class and Chapter dropdowns, a tool list) and report to the user:
- a table: tool (linked to its `output-preview/<chapter_id>/<slot_id>/<slot_id>.tsx`) · what the child does,
  in one line;
- what changed from the plan and why, per tool (short);
- the questions, numbered, each with what you would do;
- the audit line (all ready, or what blocks);
- "Say upload when you are happy with them."

**9. Review round.** Apply the user's answers. General ones follow non-negotiable 4. Per-tool ones go to
that tool's builder. Then steps 6 to 8 again.

**10. Upload (only on the user's word).** For each tool: `node cli.mjs publish <slot_id> --ch <n>
--upload` (md5-verified). If the dry run listed `lp2_media` rows to update, ask, then `--apply`. Report
the live URLs.

## Remake: a chapter that is already built, made again on a newer pipeline (only on the user's word)

Remaking is a re-pin plus new tools. It is never done by a sync and never started unasked. Example: class 4
chapter 3, built voiced on r21, made again in the silent, board-layout style of class 5. One chapter per
session; no other chapter moves (non-negotiables 3 and 7).
1. The user names the chapter ("remake class 4 chapter 3"). Ask whether the old tools stay live until the
   new ones are published (the default: yes).
2. The class needs the newer code and runtime. `node classctl.mjs status`; if class `<N>` is behind, a `sync`
   first (dry run, the user's word, non-negotiable 10). Then `node cli.mjs runtime freeze` and
   `node cli.mjs runtime pin --ch <n>` (the user's word; log the row in BUILD_CARD §7). A chapter marked
   sealed (`runtime status`) is unsealed only on the user's word.
3. **Set each slot's old source aside for reference**, inside the slot's own folder: `tool.tsx` ->
   `tool.legacy.tsx`. A voiced chapter's `voice.tsx` -> `voice.tsx.off` (a silent runtime fails a stale
   voice; never read or edit it). The checks, `scaffold`, `port` and `clean` never read `*.legacy.tsx`;
   the slot's builder may read its own `tool.legacy.tsx` (the maths, the numbers, the translations) and
   nothing of another chapter.
4. `node cli.mjs scaffold <slot_id> --ch <n>` makes a fresh `tool.tsx`; then steps 3 to 9 as for any chapter.
5. The live copies stay in the bucket until step 10 (`publish` keeps a backup of each live copy). The first
   `check` of a slot re-ports over its local `output-preview` pair; copy the pair aside first if the old
   one should stay in the viewer.

## Chapter notes

For a class with no notes of its own, the plan and the textbook pages the briefs name are the notes: read
the briefs' headings once (step 2), list what the runtime lacks, ask once. Class 4's notes follow as the
model of what to write down.

### Class 4 (Udgam Class 4: what each chapter's tools will need)

| ch | chapter | the picture and the method | answers and input | watch for |
|---|---|---|---|---|
| 1 | Large Numbers | done: place-value chart, periods, commas, compare, rounding, Roman | numbers, words, signs | the reference chapter |
| 2 | Addition | column addition with regrouping: ten ones bundle into a ten and the carry sits above the column (same bundling as ch 1); estimation by rounding; story sums | numbers | the carry is the picture, not a written 1; commas on 5-6 digit sums |
| 3 | Subtraction | column subtraction with regrouping, across zeros (5,000 − 2,367): a ten opens into ten ones; check by adding back | numbers | show borrowing as unbundling; any strike-through in ink, never red |
| 4 | Multiplication | × 10, 100, 1,000 as a place shift; arrays and the area model; the book's column method with partial products and carries | numbers | long rows: plan the working area; the voice says "times" |
| 5 | Division | sharing and grouping; the book's long-division layout; remainder; check: quotient × divisor + remainder | quotient AND remainder: two boxes in the slot (`parts`, BUILD_CARD §7) | a perfect division still types remainder 0; label boxes at most 10 characters |
| 6 | Factors and Multiples | rectangles of counters for factor pairs; multiples on a hundred chart; primes; divisibility tests | numbers, lists, yes/no | list answers in any order (`answerForms`); choice items |
| 7 | Understanding Fractions | equal parts of a whole and of a set; fraction bars and circles; equivalent and like fractions; fraction of a number | a fraction: `parts: SLOT_FRACTION` (stacked in the slot); a mixed number or tidied answer: `SLOT_MIXED` (BUILD_CARD §7) | draw fractions stacked (numerator over denominator), never "3/4" in the picture or the ask; the voice says "quarter" |
| 8 | Decimals | tenths and hundredths on grids of 10 and 100; the decimal point in the place-value chart; money and length | a decimal: `pointKey: true` (the pad's point key, BUILD_CARD §7); the answer a string in its written form ("0.09") | the zero in front is always written; no commas inside a fraction or a decimal (2750/1000); the voice says "zero point six five" |
| 9 | Geometry | lines, rays, angles, circles (centre, radius, diameter), shapes, nets | words, choices, drawn | `miss-shows-answer` cannot read word or drawn answers: the visual reviewer judges corrections |
| 10 | Patterns | number and shape patterns, the rule, growing patterns | numbers, next shape | the rule is the picture; choices for shapes |
| 11 | Metric Measures | km/m/cm/mm, kg/g, L/mL on scales and rulers; conversions (× 1,000, × 100) | two units (5 km 250 m) or one converted | two-part answers: step 2; the voice reads units in words |
| 12 | Time | a clock face with moving hands; past/to; a.m./p.m.; 24-hour; elapsed time; calendar | hours and minutes | say "twenty-five past eight" where the book does; hours/minutes input: step 2 |
| 13 | Money | notes and coins drawn (no photos); ₹1 = 100 paise; bills; adding and subtracting money | rupees and paise | decimal point or two boxes: step 2; the voice reads ₹12.50 as "twelve rupees fifty paise" |
| 14 | Data Handling | tally marks, pictographs with a key, bar graphs to read and draw | numbers | the colour budget; labels short; bars as draggable heights |

Chapters 5, 7, 8, 11, 12 and 13 all ask for an answer the 12-key pad cannot type. Settle the input
(a decimal point key, a fraction key, or two answer boxes) with the user **before** the first of them.
The runtime already has all three, and `class<N>/docs/PATTERNS.md` shows each one in use: two answer
boxes (`parts: [{ label, unit? }, ...]` with `answer: [a, b]`), stacked fraction boxes (`SLOT_FRACTION`,
`SLOT_MIXED`) and the point key (`pointKey: true`). Read PATTERNS.md, never the chapter that introduced
them. A two-part answer in 11, 12 or 13 uses the boxes; money in 13 uses the point key.

A new runtime feature goes into the head, is frozen, and is pinned to **your** chapter
(non-negotiable 3). Its new top-level names must not collide with a tool of your chapter or of any
chapter sharing your pin (`node cli.mjs runtime status` lists them): scan those tools for top-level
declarations, item fields (`parts` was a ch 1 tool's own item field) and Work props before the edit.
Announce a runtime or lib edit to the other chapter sessions of the class before and after ("settled"):
`lib/` and the checks are still shared by every chapter of the class, and only the runtime is pinned.

## Lessons from chapter 1 (so no builder repeats them)

- Real drags of a piece the tool unmounts never landed; Enter re-pressed the last clicked key; drag pieces
  lacked `touch-action`. All fixed in the runtime and now checked with real input.
- Giveaways hide in plain sight: a value printed under a tile, a reference card, a voice that reads the
  number with its commas. Reviewers look for these first.
- Before the first answer nothing answers the question; after a miss the correction ends on the whole
  right answer.
- The keyboard check takes the first question typed on the digit keys, in any phase: never bend a design
  to it.
- Bubble lines page at three lines: split a long spoken line into two sentences.
- Exactly three questions a phase: moving a plan question to another phase means another one leaves.
- Commas from 1,000 everywhere; "×" beside a number is multiplication (not a cross) for the checks.
- The host declares 169 lucide icon names with `var` in the tool's scope; `Image`, `File`, `Lock` and
  `Infinity` hide browser globals. The mascot's `new Image()` built an icon on staging and fell back to its
  dot. The host emulator now declares them too, and `host-names` fails a tool that uses one bare.
- Every mount walks phase to phase as NCERT; `finished` comes only from the summary page, 5 s after it
  opens. A tool's shared field never overrides the runtime's `complete` (true only once `finished` went).
- (ch 2, voiced) The voice never repeats itself. The user heard it: one hint for every question of a phase, and a
  teach that restated question 1 before question 1 said it again. Each question gets its own `miss`, and
  the teach stops before the first question's words (`voice-no-repeat`). A played probe then heard the
  three questions of a phase end on one instruction: only the first says it in full, the others in their
  own words. Win lines and answer sentences are the tool's own; the maths reviewer reads them for repeats.
  (On a silent runtime the same rule is `bubble-no-repeat`: the bubble never shows a line twice in a phase.)

## Lessons from the language work (so no builder repeats them)

- `TR` is keyed by the English **byte for byte**; change an English line and its key is stale (the
  `voice` command lists lines with no entry, and on a silent runtime `tr-coverage` does, but neither
  finds a key that matches nothing).
- *(voiced)* The voice bakes only what it can enumerate: `api.say("...")` **literals**, the plan's lines and
  the items' `say`/`ask`/`miss`. A template or a `say()` wrapper is silent in hi/gu: write a literal per
  case. *(silent)* A line built at run time shows English in hi/gu unless TR has that exact line.
- *(voiced)* Baked voice is inline `data:` clips in the LOCAL `voice.tsx` (preview, checks and the viewer read one
  self-contained file; `port` allows 4 MB for it) and separate `<sha1>.ogg` files when PUBLISHED (the
  ship copy: the runtime's one `fetch(voiceBase() + uri)` reads them; `port` allows exactly that call).
  Baked-or-silent is decided **per language**: hi/gu speak only from clips, English keeps the device
  voice (so the English voice checks stay valid).
- *(voiced)* A voiced tool's dry run (`publish <slot> --ch N`) shows the ship copy: the `files` line reads "N KB
  (ship copy; M KB with the clips inline)" and the `voice` line "N clip files: k to upload, j already in
  the bucket". `REFUSED ... over the 1024 KB hard limit` means the ship copy is still too big. The
  first upload of a chapter's clips also proves the CDN serves them (same CORS headers as the tool).
- Anything `Work` draws in English (`tx`), the summary `Thumb` (`lang`, `tx`), the answer slot
  (`format(v, i, { lang, tx })`, and TR on what the slot shows) and two-box labels all need their words in
  TR; check them on `shots --lang hi|gu`. Headings that wrap on two lines in English often fit on one.
- `sed -i` in Git Bash strips CRLF from a tool file: use Edit, keep each file's endings.
- A `pointer-drag` or `click-then-enter` timeout when several checks run together is machine load:
  re-run with `C4_CHROME_POOL=1` before debugging. A tool over 500 KB makes the host's Babel print a
  size note; the host emulator keeps it as a note, not an error.
- Disk: our own `c4chrome-*` temp profiles are now swept before each Chrome launch; `doctor` warns
  when headless Chrome's `scoped_dir*` folders pile up (clear them by hand, they are not ours to delete).

## Where things are

| what | where |
|---|---|
| rules for a tool, procedure, runtime API, decisions | `class<N>/docs/BUILD_CARD.md` |
| every pattern a tool uses (read this, never another chapter) | `class<N>/docs/PATTERNS.md` |
| the final layout | `class<N>/docs/LAYOUT.md` |
| what tools are failed on (the builder reads it first) | `class<N>/docs/PREFLIGHT.md` |
| a slot's reading list, made by `scaffold` | `<slot>/readlist.md` (`node lib/build/readlist.mjs <slot_id> --ch <n>` makes it again) |
| the review pack: every frame for the visual reviewer | `class<N>/docs/REVIEW_PACK.md` · `shots <slot_id> --ch <n> --pack [--changed]` -> `<slot>/pack/` |
| how the play tester plays (check's rows first, then probes) | `class<N>/docs/PLAYBOOK.md` · `class<N>/lib/check/playhelpers.mjs` |
| what `check` proves | `class<N>/docs/CHECKS.md` |
| the runtime a chapter is built on | `class<N>/work/<chapter_id>/runtime.json` -> `class<N>/runtime/frozen/<rN>/` |
| the head runtime (where a new feature is written) | `class<N>/runtime/runtime.tsx` |
| the reference tool (class 4 ch 1 only, and only from a class 4 ch 1 session) | `class4/work/indiannica_eng_maths4_ch1/M1.S1.T2.C4.2D1/tool.tsx` |
| a slot's work | `class<N>/work/<chapter_id>/<slot_id>/` (brief.md, tool.tsx, status.json, preview) |
| the upload pair | `class<N>/output-preview/<chapter_id>/<slot_id>/<slot_id>.tsx` + `.json` |
| every class's tools on one page (Class, Chapter, tool list) | `node viewhub.mjs` (pipeline root) · `viewer-hub/README.md` |
| real input for testing | `class<N>/lib/check/playkit.mjs` |
| Hindi and Gujarati (TR table; baked voice on a voiced runtime) | `class<N>/docs/PATTERNS.md` §11 · `node cli.mjs voice` (voiced only) · `<slot>/voice.tsx` (generated, never read) |
| the class folders and their config | `class<N>/pipeline.config.json` (class, textbooks, viewerPort, agentPrefix, skinLibraries) |
| carrying code between classes, a new class | `node classctl.mjs status \| sync \| new \| restore \| rootdocs` · `classctl.manifest.json` · `CLASSCTL.md` |
| the agent templates | `_templates/agents/*.md.tpl` (the files in `.claude/agents/` are generated from them) |
| tokens: what a session or a role costs | `node usage.mjs session [FILE.jsonl]` · `node usage.mjs static --class <N> [--ch <n>]` (pipeline root; prices in `usage.pricing.json`) |
| CLI (in `class<N>/`) | `doctor` · `list` · `fetch` · `scaffold` · `preview` · `check` · `shots` · `clean` · `status` · `port` · `publish` · `runtime` · `fence` · `view` · `voice` · `images` |
