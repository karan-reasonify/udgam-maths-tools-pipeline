# The review pack: every frame a reviewer needs, at full size, made once

```
node cli.mjs shots <slot_id> --ch N --pack [--changed] [--langs en,hi,gu]
```

One command makes **every frame a visual review needs, at the full 1600 x 900** (the contact sheets of `shots` are half scale
and only an overview: never the frame to judge a pixel on). They go to `<slot>/pack/` as `p<phase>-<state>-<lang>.png`
(the start page: `start-<lang>.png`), with `pack/pack.json` describing them. About 2.5 minutes for a four-phase tool in
English, Hindi and Gujarati (111 frames, 160 s measured on a busy machine; Chrome two at a time, `C4_CHROME_POOL`); about 80 s
for one language (`--langs en`).

The pack is built once per round by the main session; the reviewers (visual, maths, play tester) read the same frames
instead of each making their own. It is a **floor**: everything the visual reviewer looked at for the Tenths Builder
(`sheet-ask`, `-ask-open`, `-wrong`, `-idle`, mount, start, solve, free, the party, the wrong-step frames, in en, hi and gu)
is in it, at full size. A reviewer may still make extra frames with `lib/check/playkit.mjs` (a real drag, a state the pack
does not have) or the other `shots` options, which work exactly as before.

## The frames

Which frames exist is read at run time from what the page reports and from the pinned runtime's capabilities
(`lib/core/caps.mjs`), never from a version number. A tool with no guide steps, no choice question, no card answer or no start page
simply has no such frame; a voiced runtime has the frames that exist for it (no Hint key, no wrong-step frame before r34 ...).

| state | what it shows | when it exists |
|---|---|---|
| `start` | the start page | the tool has one (runtime r28+) |
| `step1` | each phase's first guide step: the pinned instruction on the bubble, the question and keys waiting | the phase has guide steps |
| `open` | the first screen of a phase with no guide steps | the phase has no steps |
| `stepwrong` | a wrong act on that step: the step's hint under the pinned instruction | steps phase, runtime with the hint (r34+) |
| `ask-shut` | the phase's first question as it first appears (a board tool: the answer panel shut) | always; `kind` in pack.json says `key`, `card` or `choices` |
| `ask-open` | the same question with the answer panel open | a board tool |
| `wrong` | a wrong answer on the first question once the tool has traced the right one: the hint under the instruction, the child's answer still in the slot | always |
| `win` | the right answer on the first question (with the Next key on show, when the tool has one) | always |
| `hintkey` | the header's Hint key pressed on the second question of the first phase | runtime with the Hint key (r35+) |
| `choice`, `choice-line`, `choice-wrong` | the first Yes/No question of the tool, its "Choose your answer." line (neutral band, only a tool whose Answer key brings it) and a wrong choice with its hint | the tool has a choice question that is not already a phase's first question |
| `card`, `card-open` | the first card-answer question, then with the keypad open | `cardAnswer` tool, a card question that is not already a phase's first |
| `end` | the phase end: the closing line and the Next phase key (the last phase: the Summary key). A tool without the Next key walks on by itself: the frame is its closing line | every phase (the last phase of a tool without the Next key goes straight to the summary) |
| `summary` | the summary page, every phase played (rows, thumbnails, Free play, Play again) | always |
| `again` | right after Play again (a clean slate, phase 1); usually the same pixels as `step1`: then it carries `sameAs` | the summary has Play again |
| `free` | Free play, from the summary page | the tool has free play |
| `party` | phase 1 and the last phase, 0.9 s after the right answer of the phase's last question, motion ON (confetti in the air) | runtime with the party (r39/r40+) |

Not in the pack, by design: every other guide step (each ends in the next step's frame or the question), the classroom
mode, the `?answer=open` classic layout, mid-animation frames (every frame but the party is reduced motion, so it is a settled
frame). Make those with `playkit` when a tool's brief makes them matter.

The lesson is walked as a child meets it (`?phase=none`: every phase in a row, then the summary), muted, with the Next key
when the tool opts into it (`nextKey: true`; `check` and `shots` scripted runs hide that key, the pack does not), so the phase
dots are filled as they would be and the summary has every row. A tool without the Next key is walked on its timers: its `win`
and `end` frames are shot once, at once (they are on screen for 1.4 s or more), and its last phase has no `end` frame (it goes
straight to the summary). `C4_PACK_NEXTKEY=0` walks a Next-key tool that way, to test that path.

## pack.json

```
{ "slot", "toolHash" (hashOf: the exact source, as check's), "runtimePin" ("r52"), "builtAt", "seconds", "langs", "nextKey",
  "frames": [ { "file", "state", "phase", "lang", "w": 1600, "h": 900, "hash", "changed", "kind"?, "item"?, "note",
                "sameAs"?, "volatile"?, "carried"? } ],
  "errors": [ { "lang", "where", "message" } ] }
```

`hash` is the sha1 of the PNG. `sameAs` names an earlier frame of the pack with the same pixels: nothing new to look at.
`volatile` marks the party frames. `carried` marks a frame of a language not rebuilt this time (`--langs en` keeps the old
hi/gu frames and their entries). `errors` lists any frame that could not be made (also printed as `FAILED ...`, exit code 1). **A run with a failure changes
nothing of the record**: `pack.json` (the baseline), `pack.prev.json` and the frames it could not make are left as they were,
and that run's own listing goes to `pack.failed.json`; fix the cause and run again (a machine under load: `C4_CHROME_POOL=1`).
`unstable` marks a frame that never gave two equal shots (counted as changed, not a failure).

## --changed

Each run moves the old `pack.json` to `pack.prev.json` (only once the new build worked) and marks every frame `changed` when its
hash differs from the one before **or the frame is new**. A frame the pack before did not have always counts as changed.

```
node cli.mjs shots <slot_id> --ch N --pack --changed
pack <id>: 111 frame(s) at 1600x900 in ...\pack · en, hi, gu · 127 s · pack.json (the one before is pack.prev.json)
  changed: 1 · unchanged: 104 · party (not compared): 6
    p2-win-hi.png  pixels differ
    p3-card-en.png  NEW                       (a frame the pack before did not have: always counted as changed)
    p1-choice-en.png  REMOVED (in the pack before, not in this one)
  party (motion on, never compared by --changed): p1-party-en.png ...  -> look again if the phase end changed
```

It still rebuilds the whole pack: unchanged frames stay in it (a reviewer may compare a changed frame with its unchanged
neighbours in the same phase). Without `--changed` the command prints the frame count and the list of states.

- **Party frames are never compared**: their confetti is in the air, a clock this harness cannot stop. They are always listed as
  "look again if the phase end changed", so they are looked at when the phase end or the win changed, and not otherwise.
- **One `--pack` run per review round.** The baseline is "the pack before this run": a second run in the same round
  (nothing changed) reports 0 and moves the baseline, so a change nobody has reviewed yet would no longer show as changed. The
  main session runs `--pack --changed` once after the fixes and hands the list to the reviewers.
- `clean` removes the frames (`pack/*.png`) and keeps `pack.json` and `pack.prev.json`, so a round after the end-of-chapter
  tidy still knows what changed: the next `--pack --changed` rebuilds the frames and flags the differences against the kept
  pack.json.

## How a reviewer uses it

1. Read `pack/pack.json` (frames in order: per language the lesson, then the party), not the folder.
2. First round: look at every English frame at its own size; Hindi and Gujarati frames for **fit and leftover English only**
   (a clipped label, key, heading or bubble, a matra touching the line above, a word still in English). Skip a frame that
   carries `sameAs`.
3. Later rounds: look only at the frames the main session lists as `changed` (and their unchanged neighbours if the change
   looks like a layout shift), and at the party frames when the phase end changed. Say in the report which frames were
   looked at; "no frame changed" is a finding.
4. Report as the agent file says (`phase n, <state>, <lang> - what you see - the fix`): the file name is the position.

## Why the pack is stable (what was measured)

A pack built twice with nothing changed has to report 0 changed frames, or `--changed` is noise. What leaked in, and what the
harness does (the harness only: nothing here changes what the runtime renders for a child):

- **A repaint that depended on history.** Chrome repaints only what changed, and a soft edge (a round button's outline, a card's
  shadow) painted over old pixels came out a shade different from one painted afresh, depending on how the page's updates were
  batched: 1-2 levels on a few dozen pixels, in about a third of the frames. Before every shot the page is hidden and shown
  again (a full repaint), after fonts, skins and two animation frames, with no focus left on a control.
- **A page still arriving.** A line paging in, a skin decoding, the tap line under the instruction: a frame taken a moment early
  was a different picture. Each frame waits until the stage's DOM has not changed for 250 ms, and is shot until two shots in a
  row are the same bytes (a frame that never gives two alike is kept and marked `unstable`, counted as changed). A frame with a
  short window (the win and the phase end of a tool that walks on by itself) is shot once, at once.
- **A wrong answer is a moving picture.** The tool locks and traces the right answer, then opens again with the hint up; a
  frame taken at the first moment of the hint is mid-trace. The `wrong` frames wait for the lock and the unlock first.
- Reduced motion (the runtime's own CSS then switches every pulse, caret and blink off) and the Next key held (the frame
  is a held state, not a timer's) do the rest.

Measured on the Class 5 Tenths Builder (4 phases, Next key, cardAnswer): 111 frames (37 a language) in 160 s; the second run:
**0 changed of 111** (the 6 party frames are not compared); four English runs side by side on a loaded machine, into scratch
folders: every frame byte-identical except the party frames; the timer path (`C4_PACK_NEXTKEY=0`, 36 frames) twice: the same; a copy of the preview with a 36 px square drawn in one language
and one state: exactly that one frame flagged (the other languages carried over from the pack, not rebuilt).
