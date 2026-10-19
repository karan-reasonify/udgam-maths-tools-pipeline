---
name: build-tool
description: Build, fix or review a Udgam interactive maths tool of any class (fixed 1600x900 stage, one phase at a time, user and AI mode, HTML preview first, later one standalone TSX + JSON). Use whenever asked to make, redesign, fix or review a tool, game or interactive for a chapter or an LP 2D slot of a Udgam class (class 4, class 5, class 3 ...). Load this before writing any tool code.
---

# Building a Udgam maths tool (any class)

The class is `<N>` (from the request, or the `maths<N>` in the slot's chapter id); work only in `class<N>/`.
Read **`class<N>/docs/BUILD_CARD.md`** (contract, steps, token rules, runtime API, decisions) and
**`class<N>/docs/LAYOUT.md`** (the final layout every tool follows), then the slot's
`class<N>/work/<chapter_id>/<MEDIA_ID>/brief.md` and `tool.tsx`, and nothing else. `class<N>/docs/CHECKS.md`
says what `node cli.mjs check` proves; `class<N>/docs/PATTERNS.md` shows each pattern a tool uses. The
reference tool of class 4 is `class4/work/indiannica_eng_maths4_ch1/M1.S1.T2.C4.2D1/tool.tsx` (read it only
from a class 4 chapter 1 session).

To start or continue a tool: `/gen-tools <N> <publication|school> <chapter> [MEDIA_ID]`.
**A small change to one existing tool** (edit, fix, tweak) is not a build: make it in the tool's ported pair
(`class<N>/output-preview/<chapter_id>/<MEDIA_ID>/<MEDIA_ID>.tsx` + `.json`) and prove it with
`node cli.mjs approve <MEDIA_ID> --ch <n> --note "what changed"`, never `check` (runbook "Small changes to one tool").
The CLI runs in `class<N>/`: `doctor | list | fetch | scaffold | preview | check | shots | clean | status | approve`.
If `class<N>/` does not exist: `node classctl.mjs new --class <N>` (from the maths_pipeline root).

## Standards every tool carries (no prompt has to repeat them; they are in the docs and the checks)

- **Real objects, not plain blocks** (`docs/IMAGES.md`): whatever the child shares, cuts, counts, pours, weighs or measures is a real
  everyday object (a chocolate bar, a roti, buttons, a jug, a kitchen scale); `<Skin>` over every such piece, the plain shape only the
  fallback; a plain block needs a stated reason (digits and marks, geometry shapes, people, a piece too thin, a wrong model).
- **The look is the runtime's, never drawn by a tool:** the header's three buttons (bulb, speaker, refresh), a berry Start / Enter / Answer
  key (never the chrome's grey), Kiko with his cheer and his THINKING pose (r24: from a question's opening until the first tap), the
  Answer key's blink and its "Tap the blinking Answer key." line (only while typing is what is left), the guards on a held or doubled Enter.
- **What a tool does itself** (`docs/PREFLIGHT.md`, `docs/PATTERNS.md` 9e, 9f): `api.answerReady(true | false)` on a `pad: "enter"`
  question; a `Thumb` that reads the item as `it` (or `PHASES[n - 1].items[result.last.item]`: `last.item` is the INDEX) and every word
  through `tx`; a decimal answered ON the Decimal card (`SLOT_DECIMAL`, the zero in front typed) where the picture has one; a neutral
  question bar during guide steps; one sentence a bubble page; Hindi and Gujarati in `TR`, keyed by the English byte for byte.
- **Prove it with the child's real flow:** a shortcut (`gotoStep`, the dev driver) resets marks a child never resets; the checks that
  matter (`mascot-think`, `answer-blink`, `summary-thumbs`) walk the start page, the guide steps and the question as a child does.
