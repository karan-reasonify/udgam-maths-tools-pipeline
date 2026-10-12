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
The CLI runs in `class<N>/`: `doctor | list | fetch | scaffold | preview | check | shots | clean | status`.
If `class<N>/` does not exist: `node classctl.mjs new --class <N>` (from the maths_pipeline root).
