# Tokens: what the pipeline costs, how to measure it, what was changed (2026-10-12)

This pipeline has no API call that writes a tool. Tools are made by Claude Code sessions and agents following
`udgam_maths_claude.md`; the only code-level model calls are Gemini (images) and Google TTS (voice, voiced classes
only). So token cost lives in **session context**: every call re-reads everything the session has read so far.
Stages A to E of a generic pipeline already exist here: `fetch` (source) -> `brief.md` (the compact spec) -> the builder
agent (generation) -> `check` (deterministic validation, 60+ rows) -> the reviewers. Nothing was rewritten.

## Measure
```
node usage.mjs session [FILE.jsonl | --all]     provider-reported tokens of a transcript: calls, fresh input, cache read/write,
                                                 output, context re-read per call, tool calls, list-price estimate
node usage.mjs static --class <N> [--ch <n>]    what each role loads before it starts (bytes; tokens ~ bytes / 4, an estimate)
```
Prices are in `usage.pricing.json` (list prices, a lower bound; a subscription is billed differently). A subagent's own
tokens are counted only when its transcript is in the file or in `<session>/subagents/`; the report says when they are not.

## Baseline (measured unless marked)
One session, 2026-10-12 08:51-11:03 UTC (a mixed viewer-hub, class 5 chapter 5 redesign and git session, main model only):
- 426 calls; **451,228 tokens of context re-read per call** (max 1.41 M); cache read 189.0 M, cache write 3.18 M,
  output 0.46 M, fresh input 922. List-price estimate $50.36, of which ~75% is cache reads: context size x calls is the cost.
- Tool results that filled the context: Read 593 KB (**at least 331 KB, 56%, were 11 ranged reads of one generated
  `preview.html`**), Bash 169 KB, Grep 46 KB. Tools: Bash 158, Edit 109, Read 92, SendMessage 48, Grep 42, Agent 12.
- The deny rule for `*.preview.html` in `.claude/settings.json` did not hold in that session: of 27 reads, the first was
  denied (10:28:54), then 20 of the next 26 succeeded, with the same path form. `settings.json` had not changed since 2026-09-22
  and no other deny-listed path (frozen runtime, plan.json, slot.json, mascot.tsx, output-preview) was ever tried. The cause is
  not known (a permission-mode change mid-session is the likely one); the hook is the code-level backstop.
- Static context per role (bytes, class 5): every session 39.8 KB (CLAUDE.md 4.7 + the runbook 35.1, auto-imported by an
  `@` in CLAUDE.md); builder 242.6 KB with a 102 KB `tool.tsx` (agent file 15.9, LAYOUT 43.4, BUILD_CARD 1-6 23.8, PATTERNS
  slices 37.8, brief 13.1, PREFLIGHT 6.5); each reviewer's agent file 3 to 9 KB.
- Verbatim repeated text across the builder's reading set: 0.6 KB of the 16 KB agent file, none in PREFLIGHT. The docs are
  not duplicated; they are reference. Not worth the risk of cutting a rule.
- **Not measured:** per-tool or per-builder cost (earlier build transcripts are not on disk; subagent tokens were not
  in this one). The visual review pack is 111 frames at 1600x900, roughly 200 K image tokens a review (estimate, w x h / 750):
  the biggest single item per tool, left whole on purpose.

## Changed
| change | effect |
|---|---|
| `CLAUDE.md`: the `@udgam_maths_claude.md` mention no longer imports the runbook | expected: every session loads 5.6 KB, not 39.8 KB (-34 KB, about -8.5 K tokens a call). **Not yet observed**: check at the next session start that the runbook is gone from the loaded project instructions. The runbook is still read by `/gen-tools` or by the owner's own `@` |
| `chapter-fence` hook refuses `*.preview.html` and the text files in `.build/` (Read, Grep, shell readers); pictures in `.build/` (hintframe, contrast) stay readable; `fence --off` lifts it | stops the largest measured context leak; `check` and `shots` still read them in node |
| builder template (and the class 4 and 5 agent files): read each file once, then by range | no re-read of a 46-105 KB `tool.tsx` to confirm an edit |
| builder: at most 6 full `check` runs per build and per fix message, then a blocker report (runbook step 5 says what the main session does with it) | bounds the worst case of a build; the quick check is not counted. Raise it in the SendMessage if a tool needs more |
| runbook non-negotiable 6 + CLAUDE.md "Session hygiene" | long reads go to the agent that owns the slot; one task per session |
| `usage.mjs`, `usage.pricing.json`, this file; `rootdocs-proposed/` refreshed so `classctl rootdocs` cannot undo the above | measurement, and no silent revert |

Unchanged on purpose (owner: no compromise in visuals, design passes or checks): every reviewer and its order, the models,
the checks, the runtime and every frozen snapshot, LAYOUT read whole, the review pack.

## Verified
`classctl.test.mjs` 95/95; hook: 16 cases (refuse bundle and `.build` text reads; allow `tool.tsx`, pack and `.build` PNGs, `ls`, `check`,
`fence off`); class 4 agent files byte-identical to their template render; `rootdocs` dry run: nothing to change.

## Remaining opportunities (each needs the owner's word or a measurement first)
1. Run `node usage.mjs session` after the next chapter; it gives the first per-tool numbers. Compare builder sessions before
   tuning anything else.
2. (Done: the 6-round cap. Tune the number after the first per-tool measurements.)
3. Class 5's agent files are an older, leaner generation than the templates (the templates add a voiced-runtime note, ~1.7 KB). Do not
   `sync --only agents` into class 5 unless that note is wanted; a silent/voiced switch in the template would remove the drift.
4. BUILD_CARD sections 2, 3 and 5 (main-session procedure, publish contract) are read by every builder (~6 KB); a builder-only
   split of sections 1 to 6 is possible but changes the "sections 1 to 6" rule.
5. The visual reviewer reads en, hi and gu in one pass (~200 K image tokens in one context). One pass per language would cut
   re-reads about threefold but loses cross-language comparison: a design decision.
