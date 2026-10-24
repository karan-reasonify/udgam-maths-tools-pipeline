# Patterns: how a tool uses the runtime

Every block a builder used to go and copy out of a finished tool of another chapter. It is here so
that no chapter is ever opened from another chapter's session: a chapter builds on its own pinned
runtime (`work/<chapter_id>/runtime.json` -> `runtime/frozen/<rN>/`), and the patterns live here.

- The **API** (every token, helper, piece, prop) is `BUILD_CARD.md` §4. This file is the *use*.
- The **decisions** behind each pattern are `BUILD_CARD.md` §7; the **layout** is `LAYOUT.md`; what
  `check` proves is `CHECKS.md`.
- A pattern here is already proved: it passed `check` with real mouse, finger and keys in the chapter
  that introduced it. Copy the shape, not the maths.

---

## 1. The ordinary answer: a number the 12-key pad types

```tsx
{ qid: "M1.S1.T2.C4:ML1", kind: "build", answer: 4207, winMs: 3000,
  ask: "How many in all?", say: "Four thousand two hundred and seven. Build it.",
  miss: "Count the thousand blocks first." }
```

`answer` is a number; `judge` compares it. Numbers from 1,000 up print with `indian()` everywhere,
bubble lines included (the bubble prints them as words). This is the default: reach for a wider input only when the maths needs it.

## 2. Two answer boxes: `parts`

A quotient and a remainder, a dividend and a divisor, 5 km 250 m, 2 h 30 min, rupees and paise.
The slot splits into one box a part; the pad stays 12 keys.

```tsx
{ qid: "M1.S1.T2.C5:4", kind: "share", heap: 65, plates: 4,
  parts: [{ label: "quotient" }, { label: "remainder" }], answer: [16, 1], winMs: 4200,
  ask: "65 seeds, 4 pots", say: "65 seeds are planted equally in 4 pots. Find the quotient and the remainder.",
  miss: "Deal a seed to every pot each round. How many rounds go?", thumb: ["65 ÷ 4 = 16", "remainder 1"] }
```

- A label is at most 10 characters; `unit` is optional (`{ label: "distance", unit: "km" }`).
- `typed` reads `"16|1"`; `agentKey` gives `[16, 1]`; `toolApi.answer` takes `[16, 1]`, `"16|1"` or
  `"16 remainder 1"`. A perfect division still types remainder 0.
- Enter moves to the next box; the last box answers once all are filled; a tap picks a box; rub out on
  an empty box steps back. After a miss a digit starts only its own box afresh.
- Leave `judge` to the skeleton (`judgeSlotParts`) unless the maths accepts another form.
- An item **without** `parts` runs none of this code.

## 3. A fraction, stacked: `SLOT_FRACTION` / `SLOT_MIXED`

Never write "3/4" in the picture or the ask. The slot draws the numerator over a bar over the
denominator.

```tsx
{ qid: "M1.S1.T2.C4:ML1", kind: "cut", thing: "ribbon", cutN: 7, take: 4,
  parts: SLOT_FRACTION, answer: [4, 7], near: "7|4", winMs: 3000, ... }
```

- `SLOT_MIXED` adds a whole cell on the left and any cell may stay empty, so the slot never gives away
  whether the tidied answer is a whole number, a fraction or a mixed number:
  `answer: [1, 2, 3]` · `[5, null, null]` (a whole number) · `[null, 7, 10]` (a fraction).
  `null` means that box **must** stay empty.
- Enter on a filled cell moves on; on an empty or last cell it answers once the typing is a whole
  answer (`slotComplete`). Half a fraction never answers.
- The bubble prints (a voiced runtime: the voice says) "quarter" for x/4, ordinals past twelve ("fourteen twenty-firsts"), "eight over one"
  for 8/1, "three and two fifths" for 3 2/5. `speakable` checks these exactly.
- A tool that accepts an equivalent fraction writes its own `judge` on `slotPartsOf(v, 2)`.
- **Side by side (r26): `sideBySide: true` in the tool object.** Most numerators and denominators are one or two
  digits, so the thin stacked cells waste the slot: the boxes sit in a row at full height with big digits,
  `[ 3 ] / [ 10 ]`, and a mixed number is `[ 1 ] [ 2 ] / [ 3 ]`. Same `parts: SLOT_FRACTION` / `SLOT_MIXED`, same
  answers, same typing, same `part-N` controls; the slash is drawn (never text), and the stacked box stays the
  default for a tool that does not opt in. The rule above still holds for the PICTURE and the ask: a fraction
  the tool draws on the working area is stacked, and the ask never prints "3/4".
- **Reserved control ids:** the slot's own boxes are `part-1`, `part-2`, `part-3` (and the pad is `key-*`,
  the phase dots `phase-*`). A working-area piece that takes one of those ids steals the slot's finger box
  and its keyboard focus; name yours something else (`tray-1`, `bowl-1`). Found by the ch 7 Cut and Name
  builder, whose trays were `part-*`.

## 4. A decimal: `pointKey`

```tsx
const TOOL = { ..., pointKey: true, ... }

{ qid: "M1.S1.T2.C4:1", answer: "0.3",
  say: "A strip is cut into ten equal pieces and three of them are shaded. Write the shaded part as a decimal.",
  miss: "How many pieces is this strip cut into?" }
```

- `pointKey: true` gives the pad 13 keys **on every question of the tool** (1 2 3 rub out / 4 5 6 /
  7 8 9 beside a tall Enter / a wide 0 and the point; keys 88 wide, still at least 72), so the pad's
  shape never hints that an answer has a point.
- The point key is **flat and off on a `parts` question** (a fraction, two boxes) and "." types nothing
  there. A second point in one answer is refused. After a miss a point starts a fresh answer, as a
  digit does. The keyboard's "." (and the number pad's) types it; a captured pad receives `"point"`.
- A decimal answer is a **string in its written form**, judged exactly: `"0.3"` is not `".3"` and not
  `"0.30"`; `"4.500"` keeps its zeros. The book writes the zero in front every time, and a zero on the
  end changes the written form. A tool that accepts another form says so in its own `judge`.
- No commas inside a decimal or a fraction (2750/1000, 12.563): the chapter's methods count digits.
- The bubble prints 0.65 as "zero point six five" (a voiced runtime: the voice reads it so).
- **A decimal in two boxes, the point drawn: `parts: SLOT_DECIMAL` (r26).** Most decimals are a digit or two on each
  side of the point, so the slot can be `[ 2 ] . [ 9 ]` (always side by side, big digits, the point already there):
  `{ qid: "...", parts: SLOT_DECIMAL, answer: ["2", "9"], near: "2|10" }`. Typed `"2|9"`; Enter in the whole box moves
  to the decimal box and Enter in the decimal box answers; a physical "." steps into the decimal box. The pad's point
  key is flat and off on it, like on any `parts` question, so **a tool whose decimals are all two boxes drops
  `pointKey: true`** (a point key with no single-box question to try it on fails `point-input`). Judge with
  `judgeSlotDecimal(item, v)`: the whole part by value, the decimal part **digit for digit** ("2.05" is not "2.5",
  "0.50" is not "0.5"), so a zero on the end still matters and the ask says how many places are wanted when it could.
  `toolApi.answer()` takes `"2.9"`, `2.9`, `[2, 9]` or `"2|9"` for it: no `answer()` hook of the tool's own is needed
  (the next bullet is for a single-box decimal). `agentKey(it)` is the array; `answerForms(it)` should still list the
  written form ("2.9") so `answer-not-echoed` reads it.
- **The teacher agent needs the tool's own `answer()`** (for a decimal in ONE box). `toolApi.answer()` strips non-digits, so a
  decimal handed to it arrives without its point. A tool whose answer is a decimal gives the agent a
  path of its own (`answer(item, v)` -> `HOOK.type` -> `api.setTyped(String(v))`), or AI mode types
  "0.09" as 9. Found in ch 8; ch 13's ₹12.50 will need it too.

## 5. Lending the pad to the working area: `api.capture`

For a step the child types *into the picture* (a long-division leftover, a cell of a frame).

```tsx
const openCell = (s: any) => { put({ typing: { s: a.s, v: "" }, opened: a.s }); api.capture(onKey); };
// give it back: the question's own answer
if (s.kind === "left") { api.capture(null); put({ typing: null }); api.submit(x); return; }
```

- Take it **only after the child taps the cell**, never when a question opens. Give it back with
  `api.capture(null)`; a new question, a phase change, the summary and Free play give it back too.
- `fn(key)` receives digits, `"back"`, `"enter"`, `"clear"` (Escape) and `"point"`.
- **No keyboard trap:** a cell opened with Tab + Enter must let Enter pass to the window while it holds
  the pad (skip its own press handler when `captured`), or the next Enter re-opens the cell and the
  typed number is never taken.
- From **r3**, `Hit` takes `enabled`, so the rule is written `<Hit ... enabled={!captured} />`: the box keeps
  its `tabIndex` and its label, taps do nothing, and Enter passes to the window. On **r2 and earlier `Hit`
  swallowed Enter unconditionally**, and the workaround was to not render the box at all while it held the
  pad — which also takes it out of the accessibility tree, so a child who tabs away mid-typing cannot tab
  back to the live control. A chapter still pinned to r2 keeps the workaround; one on r3 uses `enabled`.

## 5b. A working-area answer and the keyboard

A tool whose answer is made on the picture (`pad: "enter"`) must let a keyboard child finish. A control
that has completed its part of the answer **lets Enter pass to the window while it holds focus**, exactly
as the runtime's own `SlotPartBox` does:

```tsx
const keys = (e: any) => { if (e.key === "Enter" && done) return; press.keys(e); };
```

Without it, Tab to the piece, Enter to choose it, Enter to answer stalls on the second Enter: the control
re-fires its own press and the answer never goes, with no cue that the child must Tab on to the pad's
Enter key. `parts-input` never sees this (it skips a tool with no live digit keys) and no other check walks
a tool's own answer path: the play tester found it on ch 7's Which Is More Rail, on every phase.

## 6. Dragging a piece

Always the runtime's `useDrag`; never a hand-rolled pointer handler.

```tsx
const drag = useDrag((payload, at) => { /* where it landed, in working-area units */ });
<g {...control(id, label)} {...drag.bind(piece)} {...drag.keys(piece)}> ... </g>
```

A move under 8 units is a tap; Enter or Space is a tap; `touch-action: none` comes from the runtime, so
a finger drag never pans the page. Drags listen on the window, so a piece the tool unmounts mid-drag
still lands.

## 7. The correction (traceback)

After a miss the traceback **redraws the maths and ends on the whole right answer**, unmarked: no red,
no cross, no "wrong". The child's answer stays in the slot; the pad re-opens.

**A correction must end in a state the child's next act confirms, never one it undoes** (found on three
ch 6 tools). When the traceback fills the child's own pieces (a toggle, a tap-to-pick list, a pen of
cards, two posts), draw its answer on a **demo-only layer that clears on the child's next act**, or hold
the pieces still while it stands. Never write into the state the child's taps toggle: the one tap your
own line asks for would switch a corrected piece back off, and the next Enter sends a second wrong
answer, costing a try. `check` does not catch this; the play tester does.

## 8. The summary page and Free play

**The summary page is simple (r44):** "Well done!", one row per phase (its concept, its `learned` line, the `Thumb`),
the stars, Free play and Play again; the bubble says one line, the runtime's `UI.summaryLine` ("Here is the summary of
what you have learned."), and nothing is read out row by row or ringed. Nothing to write for it. The `learned` lines
still print in the rows, so each keeps its Hindi and Gujarati entry and its 72-character limit. **`FINISH_LINE` is no
longer shown** (nor the last phase's closing line): a tool may drop it, and one that keeps it breaks nothing (no check
asks for its TR any more).

`Thumb({ result, it, C, w, h, lang, tx })` draws the child's last right answer of a phase (`result.last = { item, it, value,
answer, kind, shared }`). **The trap (hit by five of ch 8's six tools):** `last.item` is the question's INDEX in its phase
(`L.i`), a number, not the item object. From runtime r24 `last.it` IS the item object (`PHASES[n - 1].items[item]`) and the
runtime passes it as the `it` prop; before r24 find it with `PHASES[n - 1].items[last.item]`. `last.value` is the answer as the
child gave it: a typed two-box answer is the string `"a|b"`, a card answer an array, a number a number: read it with
`slotPartsOf(last.value, n)`, never `String(last.value)` ("0,8" for `[0, 8]`), and write every word through `tx()` so Hindi
and Gujarati carry no English. The `summary-thumbs` check (r24) fails a thumbnail that draws fewer than two things and, in hi and gu,
one with a Latin letter. Free play is `stage === "free"`: the tool's own mode from the plan's
`writeup.freePlay`, nothing to get right, the plain pad.

```tsx
function Thumb({ n, result, it, C, w, h, tx = (v: any) => v }: any) {
  const item = it || (result.last && PHASES[n - 1].items[result.last.item]) || {};   // r24: `it`; before: the index
  const [whole, tenths] = slotPartsOf(result.last.value, 2);                       // "2|9" or [2, 9]
  return <g>{/* a frame AND what the child made: at least two things */}</g>;
}
```

**Free play offers exactly what `FREE_LINE` says, no more.** The line is printed (a voiced runtime: spoken) when free play opens,
so every control it names must be reachable in the `stage === "free"` branch. A control that lives
only in a graded phase's return path is not in free play, however near it looks in the file: the
child reads the promise, goes looking and finds nothing. Either wire the control into the free
branch or shorten the line to what is genuinely open. Check the two against each other by reading
the branch, not by reading the line (ch 10: two tools of six promised a tray, a slate and a hide
control that free play never rendered; each was found by a reviewer, not by a check).

## 9. The bubble's lines

The lesson is silent (runtime r30, every tool on a silent runtime) and action-driven (r34): the bubble is the guide, and nothing
moves on unless the child acts (a tap, a key, an answer). Every line is printed there, numbers as words. It does
three jobs:

- **Instruct.** The teach lines, or a phase's guide steps (§9b), then each question's `say`.
- **Hint.** (With the new look, `keyOnly`, §16b, the hint REPLACES the question in the bubble: one sentence a screen.) After a miss the instruction stays PINNED on top and the hint shows at once UNDER it, in a tinted band
  (r34): the item's own `miss`, a second miss in a row `ladder[0]`, a third `ladder[1]`. It stays unchanged until
  the child acts again; a right answer clears it (`hint-pinned`). The header's **Hint** key (r35) shows the same
  rungs on demand, one press each, and a guide step's `hint` during a step (`hint-key`). A hint is never the
  question's own line and never the answer.
  **The hint never gets weaker (r41):** after the Hint key showed the stronger rung, a wrong answer keeps it (or goes
  on to `ladder[1]`), never back to the `miss` (`hint-ladder-monotonic`). Write the ladder so each rung says more
  than the one before: the `miss`, then `ladder[0]`, then `ladder[1]`, all different.
- **The built-in lines (r41).** On a typed question the Answer key (or the first digit) brings "Type your answer, then
  press Enter." (`UI.typeIt`); on a choice question (`choices: [...]`) it brings "Choose your answer."
  (`UI.pickIt`): the child picks, nothing is typed. Both are drawn in a NEUTRAL band (grey bar, no accent), so they
  never look like a hint (`choice-answer-line`). Nothing to write: they are the runtime's, in all three languages.
- **Win.** A right answer gets the tool's own short line (`api.say("...")`) and the correct sound; the mascot cheers (r54: Kiko's cheering picture and one jump for about 0.9 s; before r54 a hop);
  the next question follows the celebration (`winMs`) by itself.
  **A win line is read, never cut (r41):** a win line, a closing line and a summary row never park, so in a classroom
  each of their pieces stays on the bubble for its reading time (`readMs`: 2.4 s, or 68 ms a character when longer).
  From r42 the next question waits for the win line to be read to its end (at most 6 s past `winMs`; a teacher's
  skip in a classroom still goes at once), so a two-sentence win line is no longer cut, but it holds the child longer
  than the celebration. Keep a win line to ONE sentence that fits three lines (best). `check` plays phase 1 and the last phase in
  a classroom and times every piece (`classroom-pieces`: each at least min(1.5 s, 0.6 x its reading time)).

**One page (r35, `one-page`, a FAIL):** every instruction (a step's `say`, a question's `say`) and every hint (a
step's `hint`, a `miss`, a ladder rung) is ONE bubble page: one sentence that fits three lines (the runtime cuts a
line into one piece a sentence), so nothing ever pages by a timer. Win lines and closing lines may take two (`learned`
is printed in the summary rows, and `FINISH_LINE` is no longer shown, r44). And it must fit WITH its hint (`hint-fit`): about 35 characters a line at 32, 40 at 28;
an instruction of two lines leaves room for a hint of one line (about 40 characters), never over 80.

The rules for every line:

- **It never repeats itself** (`bubble-no-repeat`, a FAIL). One run is a phase: the opening, the teach (or the
  steps), every question's `say`, every `miss`, the ladder. A near copy counts. Each question gets its **own**
  `miss`; the teach stops before the first question's words; of three questions ending on the same instruction
  only the first says it in full.
- At most 20 words and 110 characters a line; no en or em dash. An instruction or hint is one sentence (above); a
  win or closing line that needs two splits into two sentences so the bubble never pages inside a number.
- Digits and symbols are fine (`speakable` rewrites ₹, 8:25, 5 km, ×, ÷, =, 3rd, 45° into words on the bubble).

## 9b. Guide steps: the bubble moves when the child acts (runtime r30; hints r34)

When the plan's teach lines describe acts ("cut the bar", "shade one part", "trade ten tenths"), write them as
`steps` on the phase instead of `says`. The phase opens on the first instruction with the question and the Answer key
waiting (stage `"demo"`); each instruction stays until the child does what it names; the last act opens the first
question with its `say` on the bubble. Nothing moves on a timer. **Every step has a `hint`** (r34): what the child
sees UNDER the pinned instruction after a wrong act (an act the step is not waiting for), unchanged until the right
act, and what the header's Hint key shows during the step (r35).

```tsx
{ n: 1, concept: "...", conceptId: "M1.S1.T2.C4", objectiveIds: ["..."],
  steps: [
    { say: "Tap Cut to cut the bar into ten equal parts.", on: "cut", hint: "Tap the Cut key first." },
    { say: "Now tap one part to shade it.", on: "shade", hint: "Tap one piece of the bar." },
  ],
  ladder: [...], closing: "...", learned: "You learned: ...", items: [...] }
```

```tsx
function Work({ stage, step, stepOn, api, ... }: any) {
  /* the act of a step: done when the child does it, reported the moment it is done */
  const act = (on: any) => {
    if (on === "cut") { api.sfx.cut(); tl.run([[600, () => setCut(true)]], () => { api.sfx.settle(); api.did("cut"); }); }
    if (on === "shade") { setShaded(1); api.did("shade"); }
  };
  /* Enter, the agent's toolApi.check() and the dev __tool.solve() perform the CURRENT step */
  api.onEnter(stage === "demo" && stepOn ? () => act(stepOn) : null);
  /* the one invite goes on the control the step waits for */
  ... <Invite/> on the Cut key when stepOn === "cut", on the parts when stepOn === "shade" ...
  /* the child's own tap calls the same act: onPress={() => act("cut")} */
}
```

- `api.did(on)` moves the bubble only when `on` is the act the current step waits for. **Report EVERY act Work can
  do with `api.did(name)`**, the wrong ones too (a tap on a piece while Cut is awaited: `api.did("shade")`): did()
  returns false, moves nothing and shows the awaited step's `hint` under the instruction (r34). An act Work never
  reports shows no hint.
- **One click per step** (the owner, 2026-10-08: "when the visual says shade one part and I click and shade it, it
  moves forward to the next instruction at once"). A step completes on ONE click of ONE control: a button (Cut,
  Shape, Lots, Trade) or one piece of the picture, never on a count. If the idea needs more clicks, write more
  steps, each with the next instruction (the same `on` may repeat: `shade`, `shade`, `shade`; steps run in order and
  `did(name)` matches the CURRENT step). Work calls `api.did(name)` at the moment of the click, for every click on a
  button or a piece, awaited or not. The keypad's Enter is not a step act. Name a step's button after its act
  (`data-control="cut"`), so `check` can click it with a real mouse.
- **A tap that does nothing is a wrong act too (r41; the empty board from r42).** During a step, a tap on a plain
  shape Work draws (a strip, a card, a label, a disabled key), a tap on the empty board around the drawing and a typed
  digit show the step's `hint` at once, under the pinned instruction, with nothing for Work to write: the runtime
  listens on the working area (`data-zone="work"`, whose first child is a transparent floor, `data-role="work-floor"`,
  the size of the working box, r42) and on the keys. The runtime trusts a LIVE control to report its own act, so the
  convention is strict:
  - every element Work makes clickable carries `data-control` (a step's button: the step's `on`, `data-control="cut"`;
    a piece: its own name, `data-control="part-3"`), and it calls `api.did(name)` on every click during a step,
    awaited or not (a live control that reports nothing shows no hint);
  - everything else in the working area is plain: no `onClick` without a `data-control`, so a tap on it reaches the
    runtime; a control that cannot act now is `aria-disabled="true"` (a tap on it is inert, so it hints);
  - nothing is shown within 400 ms of a reported act, so the click that did the act is never also a miss;
  - never draw a full-box rect with an `onClick` of your own over the floor: it would swallow the empty-board taps.
  `check` proves it with a real mouse and keyboard at every step of every steps phase, each kind of act in its own
  session: a click on an inert point of Work's drawing, a click on the empty board (a point of the floor rect) and a
  digit key must each show that step's hint within 300 ms with the instruction and the step unchanged, and a real
  click on the step's control must still move it on (`guide-steps-real-wrong`). A drawing that is all live controls
  has no inert point (a note); a working area with no floor fails.
- The hint: one sentence, never the answer, different from its step's `say` and from the phase's other hints, at
  most about 40 characters when the instruction runs to two lines (never over 80); `hint-fit` and `one-page` check it.
- `props.step` is the index, `props.stepOn` the act waited for (null outside a steps phase); `getState()` carries
  `guideStep`, `guideSteps` and `guideOn` for the agent.
- `toolApi.check()` does ONE step per call (`onEnter` performs one click), so N steps take N checks; `__tool.solve()`
  does every remaining step, 260 ms apart. So an act must
  be safe to start twice while it animates (ignore a second start), and the tool's own `check` (HOOK.check) must
  return undefined in the demo stage, or the agent never reaches `onEnter`.
- **The last act's result stays on show (r33):** after the last step the stage stays `"demo"` for `phase.stepHold` ms
  (default 1600, none under reduced motion; `stepOn` is null and Enter does nothing) and only then does the question
  open. Set a longer `stepHold` when the act's animation is long (a trade closing ten tenths: 2300), so the child sees
  what the step showed before the picture resets to the question's opening. If the picture should not carry the
  warm-up into the question (a shaded strip, a tally), reset it when the stage goes `"demo"` to `"ask"`.
  **The steps work a WARM-UP, never question 1's own item** (class 5 ch 6, 2026-10-17): pick a number whose result is
  none of the phase's answers, and open question 1 exactly as questions 2 and 3 open. Steps that convert question 1's
  own fraction leave its answer on the card during the hold and, carried over, at the question (PATTERNS §10).
- A miss at a question shows its rung at once, under the pinned instruction. In a classroom the steps wait for the
  child's act at the board, not the tap.
- Each `say` is one sentence (one page), at most 20 words and 110 characters, no dash; every `say` and `hint` has
  its Hindi and Gujarati entry in TR. `check` plays it: the `guide-steps` row (a wrong act through `__tool.did`, then
  one `toolApi.check()` per step, each moving exactly one step; and one real mouse click on the first step's control).
- Sounds where the picture moves: `api.sfx.cut()` (a knife), `settle()` (pieces come to rest), `trade()` (pieces
  close into one), `tick()` (a snap). correct, wrong, win (a phase end) and cheer (the last) are the runtime's.

## 9c. The phase party (runtime r39; at the right answer from r40)

Nothing to write: AT the right answer of a phase's last question (r40; not at the phase end, so a long `winMs` never
delays it), the runtime plays a pop and the win chime, the mascot cheers (r54: Kiko swaps to its cheering picture, arms up and happy eyes, and jumps three times while gold and orange sparkles twinkle round it; before r54 it hops) and the party bursts from the mascot
(`data-zone="party"`, `getState().party`) for 2.3 s, in the tool's pink and butter with a mint and an orange (no browns,
no white); the last phase's party is bigger, from both sides, over the win picture, and the summary opens `winMs`
later. The next phase starts by itself once the party has had its time (1.4 s after the closing line, at least 2.45 s
from the party's start); under reduced motion there is no party and the walk is 1.4 s.

- **There is no free play between phases** (built as r38 with a Next phase key, dropped on the owner's word): free
  play opens only from the summary page, after the last phase. `check` guards it (`no-free-between-phases`).
- The party covers nothing for long and takes no pointer events, but keep the closing line short: it is read while
  the confetti is in the air.
- **A phase dot, a restart or a skip ends it at once (r41):** the confetti never runs on into another phase. The
  popper cones stand beside the bubble, never on it: one at the mascot's side (about x 186, y 772), and for the last
  phase a second at the right, above the phase pills (about x 1500, y 734); neither covers the bubble (x 254 to 910,
  y 748 to 892) or the pills (x 930 to 1560, y 782 to 800). `phase-party` presses the phase-2 dot while the party is
  on (gone within 300 ms, `getState().party` false) and measures the poppers.
- See it with `node cli.mjs shots <slot> --ch N --state party` (motion on: phase 1 and the last phase, 0.9 s after the
  right answer of their last question; every other shot is reduced motion, which skips it). `check` proves it:
  `phase-party`.

## 9d. The Next key: nothing moves on by itself (runtime r48, opt-in: `nextKey: true`)

One flag in the `ToolFrame` tool object, nothing else to write: `nextKey: true`. Without it the lesson walks on by timers as
before (a right answer's next question after `winMs`, a phase's closing line, the last phase's summary).

- **Question to question:** after a right answer the win plays out (the win animation, `winMs`; a long win line is read to its
  end, 6 s at most), then a **Next** key appears where the Answer key was (the question bar's right end; classic layout: the
  answer slot's place) and waits. A tap, Enter, or the host's `toolApi.next()` takes the child to the next question.
  The key **blinks** (a ring round it switching on and off, and the face brightening, 0.9 s) so the child sees the lesson is
  waiting for a tap; under reduced motion the ring stays on, still.
- **Phase to phase:** after a phase's last question the party goes off at the right answer (as before), the closing line is
  read on the bubble, and once the party is over the key says **Next phase**. In the last phase the key says **Summary** and opens
  the summary (its `finished` still goes 5 s after the summary opens). A press cuts what is left of the closing line.
- **Not affected:** the guide steps (the result of the last act still holds `phase.stepHold` ms before question 1 opens), wrong
  answers and hints, free play (the summary page's), the phase dots (a dot still jumps to its phase and drops the key), and
  AI mode / any host mount that is not navigable (they keep the timers). `props.autoNext: true` keeps the timers on a child's
  mount too (the preview page sets it on every drive/probe/shot run; `?nextkey=1` turns the key on for one).
- **Write for it:** the win picture (what `Work` draws in the `win` stage) stays on the board until the child presses Next, so
  it can be longer than `winMs` and must not need a timer to reset: the question after it opens a fresh picture, as always.
  Nothing in `Work` should wait for the next question by a timer of its own.
- `getState().nextKey` is the label on show ("Next" / "Next phase") or null; `data-control="next-key"` is the key. A classroom's
  tap on the bubble (the teacher's skip) still takes whatever is held, the key included.
- See it with `playkit` `nextKey: true` (a screenshot of `win` shows the key), or open the preview page with no parameters.
  `check` proves it: `next-key`.

## 9e. Answering on the card (runtime r52, opt-in: `cardAnswer: true`, board layout)

One flag in the `ToolFrame` tool object, beside `board: true`: `cardAnswer: true`. The question is answered ON the card of
the picture that holds the form it asks for, not through the Answer key, the keypad panel's slot or a box in the panel.

- **Which questions:** an item whose `parts` carry `at` (SLOT_FRACTION, SLOT_DECIMAL, SLOT_MIXED) is answered on a card
  (`cardKind` "fraction" or "decimal"); an item with `choices` (Yes / No) puts its keys in the question bar; any other
  item (the whole-part / tenths split with its own labels, a working-area answer) keeps the Answer key, which BLINKS until
  it is tapped. `getState().answerOn` says which: "card", "choices", "key" or null.
- **What the runtime does:** no Answer key for a card question; the drawer holds only the keypad, with a **Close** key where
  the slot was (id `answer-open`, label Close, so it is the only `answer-open` while the keypad is open); the choice keys
  (`choice-<id>`, 150 x 72) stand in the Answer key's place, each ringed and blinking until one is tapped (they are gone
  at the win and while the pad is locked); and under the instruction a built-in "type" line (never a hint: `hintKind`
  "type") says where to tap when the question opens: `UI.tapCard(card name)` ("Tap the blinking Fraction card."),
  `UI.pickIt` ("Choose your answer.") or `UI.tapAnswer`, changed to "Type your answer, then press Enter." by the tap.
- **What `Work` draws** (props `answerOn`, `cardKind`, `typed`, `part`, `box.open`; api `openAnswer`, `pickPart`,
  `cardReady`; runtime pieces `BlinkRing`, `SlotPartBox`, `slotPartsOf`): the asked card, while the keypad is shut and the
  picture is ready, gets one tap target over the whole card (`<SlotPartBox id="answer-open" ... onPick={api.openAnswer}/>`,
  at least 72 x 72) and `<BlinkRing .../>` round it; with the keypad open it gets two finger boxes `part-1`, `part-2`
  (`onPick={() => api.pickPart(j)}`, the card's halves) and shows the typed digits (`slotPartsOf(typed, 2)`) IN its own
  boxes, the active box solid with the caret. Call `api.cardReady(false)` while an act on the picture still waits (Cut,
  Lots of, Trade) or the picture is animating: the card then neither blinks nor takes a tap, the bubble says nothing about it
  and a digit typed on the keyboard is ignored, so the picture comes first. After a miss show the correction's own answer on the card until the child types something new, then clear the correction's cards (keep its strips) so the typed digits show. Set the typed digits at ONE size in both boxes, the size the finished answer is drawn at, stepping down together only for a long number.
- **The pieces' props** (2026-10-17; three ch 5 builders had to probe them): `<SlotPartBox id label x y w h on enabled onPick />`
  (a labelled finger box; `on` = the active box, solid with the caret), `<BlinkRing x y w h rx C sw={4} m={2} />` (the blinking
  ring round a box; `m` its margin), `<Invite x y r={56} C />` (a pulsing CIRCLE round a centre, not a box: ring a rect with
  `BlinkRing`). `api.pickPart(j)` counts from **0** (`part-1` is `pickPart(0)`). A control drawn from spaced pieces (slices, chips
  with gaps) needs one transparent backing rect, or a tap in a gap falls through to the floor and reads as a wrong act.
- **The other card at the win** fills too, in its own form, unless that gives away the next question (the next question
  asks for that card, of the same amount): then it stays covered until it is asked.
- See it with `playkit` (`nextKey: true` for the Next key too) and a screenshot at the open of a card question, with the
  keypad open and typed; `check` proves it: `card-answer`.

## 9f. The Answer key's blink, Kiko's thinking pose and the guards (runtime r24)

Nothing here is written by a tool except `api.answerReady`; each part is the runtime's and is proved by `check`.

- **The Answer key blinks, with its line (every board tool).** While a typed (or keypad-chosen) question waits with the keypad shut,
  the pink Answer key has the Next key's ring round it and "Tap the blinking Answer key." shows under the instruction
  (`getState().hintKind` is "type", never a hint). It does not blink in a warm-up or a guide step, with the keypad open, while the
  pad is locked, after the win, on a card question or a Yes / No question in the bar. `check`: `answer-blink` (a board tool
  without `cardAnswer`). `getState().hintKind` is there for every tool now (a check that reads `hint` at an open question asks
  `hintKind !== "type"` first).
- **`api.answerReady(true | false)`** (a `pad: "enter"` question, answered on the working area): call it when the answer is
  complete or picked, so the Enter key in the bar BLINKS; `false` (or a new question, or a miss) puts it back to steady. A tool
  that never calls it keeps a steady key, as before.
- **Kiko thinks while a question waits** (`data-pose="think"`, with a thought puff beside his head; the first tap, key, Hint key or
  typed digit puts the standing picture back; a miss brings it again) and the **Hint key pops a bulb** for about a second. Nothing to
  write. `check`: `mascot-think`.
- **A question's own ladder.** `item.ladder = [rung2, rung3]` is read in place of the phase's `ladder` for that question (the
  runtime's `rungOf`, and every static check: `hint-ladder`, `hint-fit`, `one-page`, `bubble-no-repeat`, `answer-not-echoed`,
  `tr-coverage`). Setting the rungs from `Work` still works; the item field is the native way (and gets TR checked).
- **Guards a tool gets for free:** a held Enter (auto-repeat) is one press; the physical Enter is not taken as a guide-step act
  within 400 ms of a stage or phase change (a double Enter at Start, or at the Next phase key, never does the next phase's first
  step); a double tap (second press within 300 ms) on the Answer key does not shut the keypad it opened; a repeat of the act that
  just moved a guide step on (same `api.did` name within 500 ms: a double tap on a guide control) is not a wrong act, so the next
  step's hint never flashes; a tap on a disabled key or the question bar in a guide step shows the step's hint; the party, the
  cheer and its jumps end at once on a teacher's skip or a phase change; a `pad: "enter"` question never gets the keypad panel,
  before or after a miss; a tool that locks the pad in the commit a question opens never shows the tap line.

## 9g. A wide keypad (runtime r26: `bigPad: true`, with `board: true`; the DEFAULT of every new tool)

One more flag in the `ToolFrame` tool object, beside `board: true`: `bigPad: true`. While the answer panel is open it is 556 wide (the standard one is 372) and the working area 900 wide (the standard one 1086); the keys, the answer slot and the Close key take their size from the panel, so nothing else is written. `scaffold` writes it into every new tool on a runtime that has it (the skeleton's `//#if bigPad` block): keep it when the picture fits x 64 to 964 (a bar of digit cards, a number with a point, word cards, a row of pieces); set `bigPad: false` for a picture that needs the full width (a strip of ten, a chart of seven columns) and say so in the report. A tool already built without it keeps the standard panel until someone adds the line. `Work` reads its width from the `w` it is given, as always: draw the picture inside x 64 to 964 and `check` (`board-fit`) judges it.

## 9v. The voice (voiced runtimes: no `const SILENT_VOICE = true`, Class 4's frozen r1-r21)

_A chapter whose pinned runtime still speaks follows this section; a silent runtime (r30+) follows §9 and §9b. `check` runs `voice-no-repeat` (voiced) or `bubble-no-repeat` (silent) by what the pinned runtime's source contains._

- **It never repeats itself** (`voice-no-repeat`, a FAIL). One run of speech is a phase: the opening,
  the teach, every question's `say`, every `miss`, the ladder. A near copy counts. Each question gets
  its **own** `miss`; the teach stops before the first question's words; of three questions ending on
  the same instruction only the first says it in full.
- At most 20 words and 110 characters a line; no en or em dash; split a long line into two sentences so
  the bubble never pages inside a number.
- Digits and symbols are fine (`speakable` rewrites ₹, 8:25, 5 km, ×, ÷, =, 3rd, 45°).

## 10. What gives the answer away

Looked for first by every reviewer:

- a value printed under a tile, a running total, a reference card that answers the question;
- a bubble line (a teach line, a guide step, a hint, a win line printed too early) that prints the answer, in
  digits, comma form or words (a voiced runtime: a spoken number that reads the commas or the answer out);
- a pad whose shape only appears when the answer needs it (hence `pointKey` on every question);
- a slot that shows how many boxes a tidied answer needs (hence the empty cells of `SLOT_MIXED`).

**Before the first answer, nothing on screen prints the answer.**

## 11. The three languages: a `TR` table (runtime r13+)

The host sets `props.lang` (`"en"` | `"hi"` | `"gu"`). The tool keeps every line in **English, exactly
as the checks read it**, and adds one table keyed by that English:

```tsx
const TR: any = {
  hi: { "What will it read?": "यह क्या दिखाएगा?", "ones": "इकाई", ... },
  gu: { "What will it read?": "તે શું બતાવશે?", "ones": "એકમ", ... },
};
// and TR in the tool object:  tool={{ TOOL_ID, ..., FREE_LINE, TR, freePlay: true, ... }}
```

- The runtime translates everything it prints for the tool: `TOOL_NAME`, each phase's `concept`, `says`,
  `steps[].say`, `ladder`, `closing`, `learned`, `demoDone` lines, items' `say` / `ask` / `miss`,
  `OPENING` / `FREE_LINE` / `START_HOOK` (`FINISH_LINE` and the last phase's `closing` are not shown from r44, so not
  asked), and `choices` labels. A line missing from the table
  stays English, so a half-translated tool never breaks.
- **Digits stay digits**, as in the English (`"चार्ट में फिर से 9999 है।"`): the runtime prints them as
  words in the language in use (`speakableIn`, `wordsIn`: "नौ हज़ार नौ सौ निन्यानवे",
  "નવ હજાર નવસો નવ્વાણું"), and turns × ÷ − + = into words too. Money, clock times and units are
  English-only so far.
- **The working area translates its own words.** `Work` receives `lang` and `tx` (the same lookup):
  `{tx(PLACES[k])}`, `{tx("target")}`, and `wordsIn(n, lang)` for a number spelled out on the picture.
  Give them defaults so the tool still builds on an older runtime:
  `function Work({ ..., lang = "en", tx = (v: any) => v }: any)`.
- A heading drawn on two lines in English may fit on one in Hindi/Gujarati (`const two = lang === "en" && ...`).
  Check every language in the viewer's EN | हिं | ગુ switch: the fit rules bind in the longest one.
  An agent does it with `node cli.mjs shots <slot> --ch N --state ask|wrong --lang hi|gu`
  (`sheet-<state>-<lang>.png`) and real input with `play({ ..., lang: "gu" })` (playkit).
- Hindi sentences end in `।`: the bubble pages on it as on `.`.
- **Nothing is baked (r30).** The lesson is silent in every language: the TR table is all there is. Once it has a
  Hindi or Gujarati entry, `check` asks for both in every printed line (`tr-coverage`: "N lines have no hi
  entry: ..."), which replaces the list `node cli.mjs voice` used to print (that command now says there is nothing
  to bake). `TR` is keyed by the English **byte for byte**: change an English line and add its new key.
- **What the runtime translates without help (r17-r20):** `api.say` lines from `Work`; the answer slot's
  text (a chosen word, a Yes/No: `TR` on whatever the slot shows); `format(value, index, { lang, tx })`
  gets the language as a last argument for composite strings; two-box `parts` labels and units;
  `Thumb` (the summary page's drawing) gets `lang` and `tx` props like `Work`. Aria-only labels
  (`Hit`, `control()`) stay English.
- **What tr-coverage cannot list:** a line built at run time (`` api.say(`Tick the ${n} in.`) ``,
  `api.say(a + " times " + b)`, a `say()` wrapper, a nested ternary). It reads PHASES and literal
  `api.say("...")` / `api.demoDone(...)` calls only. Write one literal per case when the cases are few
  (`api.say(cond ? "A." : "B.")` becomes two literal calls), each with its TR entry, or it shows English in
  Hindi and Gujarati; a `{ en, hi, gu }` object carries its own translation. List the rest in the builder's report.
- **Voiced runtimes only (no `SILENT_VOICE`, r12-r29): baked Hindi and Gujarati speech.** The three bullets below apply to a chapter pinned to a voiced runtime and to nothing else; on a silent runtime `voice` says there is nothing to bake.
  - A spoken line built from a template (`` api.say(`Tick the ${n} in.`) ``) is never baked: the voice
    command reads PHASES and literal `api.say(...)` / `api.demoDone(...)` calls only. Make it one literal
    call per case, each with its TR entry, or it is silent in Hindi and Gujarati.
  - **Voice (r15+):** after the TR table is final, run `node cli.mjs voice <slot> --ch N`. It writes the slot's
    `voice.tsx` (generated, never edited or read), and Hindi and Gujarati then speak from those clips.
    Re-run it whenever a spoken line or its translation changes: a piece with no clip is silent in that
    language. The command lists any spoken line that has no TR entry. English is never baked.
    Clips are cached in `<class folder>/.voice-cache/` (keyed by voice + text), so a re-run bills only new text;
    Google TTS answers 429 when several tools bake at once: re-run after a minute.
    **Shipping (r21+):** locally the clips are inline (one self-contained file); `publish` writes the ship
    copy, with the clips as `<sha1>.ogg` files in `<chapter>/2dtool/_voice/` and only an index plus
    `TOOL_VOICE_BASE` left in the tool (~240 KB, under the host's 1 MB limit). A tool with a `voice.tsx` needs
    the `const TOOL_VOICE_BASE: string = "";` line, which `voice` writes: re-run `voice` after pinning a
    chapter to r21 or later.
  - **What the voice cannot bake:** a line built at run time (`api.say(a + " times " + b)`, a `say()`
    wrapper, a nested ternary). Write one `api.say("...")` literal per case when the cases are few
    (`api.say(cond ? "A." : "B.")` becomes two literal calls); a `{ en, hi, gu }` object still shows
    translated but is silent. `voice` lists none of these: read the builder's report.
- **Fit:** `node cli.mjs shots <slot> --ch N --lang hi` (and `gu`) makes `sheet-<state>-hi.png`; Hindi
  and Gujarati run longer, so shorten a translation rather than shrink a font. **`shots` reads the last
  BUILT preview**, so run `node cli.mjs preview <slot> --ch N` first after any edit, or the sheet shows the
  old text (or English). Rules of thumb from ch 1-10: a bubble piece over about 64 characters drops to a
  small font (split it into two sentences); **in Hindi and Gujarati the threshold is nearer 45 characters**
  (ch 14: the piece drops from 44 px to 32 px there, so trim or split to about 45); a `learned` line is at
  most 72 characters (Hindi runs long);
  the LAST piece of a FREE_LINE stays on screen as the bubble, so it must carry the whole instruction;
  fractions are written as words ("सात में से दो भाग"), never "3/4" (the bubble would print "/" between two number words);
  two numbers side by side in Hindi need a word between them.
- Terms follow the NCERT class 4 books: इकाई दहाई सैकड़ा हज़ार / એકમ દશક શતક હજાર, हासिल / વદી
  (carry), आवर्त / આવર્ત (period). The runtime's own chrome (header buttons, pad key names, summary
  page, counters) is in `UI_STRINGS`; a tool never translates it.
- The pilot is ch 1's Place Value Builder (`M1.S1.T2.C4.2D1`, r14). Translations are a first draft
  and want a native speaker's read. `docs/LAYOUT.md` §13 is the picture; `BUILD_CARD.md` §7 the decisions.

## 12. Money, typed decimals and live pieces (from ch 13's play tests)

Every item here was found by a play tester with real input in three or more of ch 13's six tools, each
costing a fix round. Build them in from the start.

- **Cap the decimal places yourself.** `pointKey` caps only at 9 characters. For a two-place amount clip
  in `format` too (`s.replace(/^(\d*\.\d\d)\d+$/, "$1")`) as well as trimming in Work with
  `api.setTyped`, or a third digit paints for a frame ("Rs 138.30", "Rs 138.300", "Rs 138.30"). Prove it
  with a rAF loop and a MutationObserver on `[data-zone=slot]`.
- **After a miss the answer is stale and the next digit REPLACES it** (Backspace edits it, §7
  2026-09-22). So show no `_` placeholders while it stands untouched, or the placeholder invites typing
  the one missing digit and the child gets "Rs 0".
- **Which forms are right.** A whole-rupee money answer (no paise) accepts "141" and "141.00"; an answer
  with paise stays exact and two-place ("130.5" and "130.05" miss); a count or a paise total accepts
  digits only ("3600.00" and "0009" miss); any other form with a point ("9.", "9.0", ".") is an ordinary
  miss (a lone "." costs a try: a runtime gap). Except a question whose whole point is writing the two
  zeros of column working: strict there, and the ask or correction teaches the two places in words.
- **"Rs" in English, words in Hindi and Gujarati.** The plan and every brief write "Rs 87"; `speakable`
  prints "Rs 12.50" and "₹12.50" as words in English. In hi/gu the bubble prints (a voiced runtime: the voice reads) "Rs 53.40" as "point four
  zero": write money in bubble lines as words in TR ("53 रुपये 40 पैसे") and draw "₹" with the digits.
- **A pulsing invite must be a working control.** Three tools rang a control that only existed at
  `stage === "ask"`, so a finger on the one invitation did nothing for the whole teach (LAYOUT §3:
  pieces are playable before they are answerable). Make it live from "teach"; the pad stays unanswerable.
- **Never put a refusal on the bubble (a voiced runtime: never speak one) during the teach.** "Start with the paise" replaced the teach line, so the
  rest of the teach and the question were never shown and the bubble stayed on the refusal. Draw the shut cell
  only, or show the refusal after the teach.
- **A box that holds the pad gives it back** on a tap on the answer slot, the bill or the blank canvas,
  keeping what was typed (`api.capture`, §5). While it holds the pad the point key stays live (runtime),
  so answer a point in it with one bubble line.
- **Toggles report their state.** The runtime's `Hit` passes no extra attributes: a small module-level
  toggle on `usePress` gives a switch, a flap or a dot `aria-pressed` (ch 13 Rupee and Paise Board's
  `RpToggle`).
- **Tab order is the DOM order.** Put the control the child needs first before the ones that are refused
  or drawn earlier (the paise box after the shelf cost 22 Tabs), and do not render a Hit that has nothing
  left to do (it stays a tab stop with a pointer cursor).
- **Same-value pieces.** A coin dropped on the same-value note slot goes to its own kind's slot; only a
  wrong value bounces lit. A wrong drop needs a cue that is visible at 1x on an invited piece too.
- **Several dealing orders.** When a control can be tapped in any order (a till whose rows change to the
  row below), enumerate every order and prove none spills a pile or a row (Shop Divider: a row changes to
  the one below only when every row above is empty).
- **A one-box `parts` slot is legal** (a counted answer with a unit label); `parts-input` skips it, so
  play it with real input. A two-box answer's boxes compare as numbers ("64|08" wins), a leading zero on
  the first is a miss.
- **`format` is not told which question is up.** Set a module-level value from Work (Work renders before
  the Slot in the same pass): `RP_NOW`, `SD_NOW`. Keep `getState()` in step with the picture once the
  stage is win or idle, or the teacher agent cannot read it.
- **Runtime gaps, no per-tool fix (for the user):** Escape wipes the child's wrong answer during a locked
  traceback; (fixed by r35: the header key is now Hint, and at an open question it shows the next rung); a word key cannot be lit after a
  miss; the caret leaves the slot on a 9-digit or a long word answer; focus drops to the body after
  Enter or Space on a Hit; locked pad keys stay `aria-disabled` false.

## 13. Classroom mode: nothing to write, three things to watch (runtime r22+; action-driven r34)

A tool does nothing for `props.classroom` (`docs/LAYOUT.md` §13b). From r34 a classroom holds nothing for a "next"
tap: a right answer, a miss's hint and a closing line go on by themselves, and the summary page says its one line
(r44), as in every mode. Only
a LONG line (several pieces) pages, each piece after the first waiting for the teacher's tap with the arrow on; a
tap when nothing is parked is the teacher's skip. Watch these:

- **Keep your own lines to one page.** A line `Work` says (`api.say`) that runs to two sentences is two pieces, and
  in a classroom its first piece waits for a tap with the arrow on. A win line of two sentences therefore makes the
  teacher's skip take three taps (page, end, skip): keep win lines to one sentence where you can. `api.say(..., done)`
  calls `done` when the last piece has been read, so never put a step the child needs (unlocking the pad, opening a
  cell) behind a long line.
- **The picture must make sense while a long teach run pages.** A teacher may stay on its first piece a minute: put
  what the first sentence points at on the screen from the start.
- **In free play `item` is the LAST question of the last phase, not a neutral one** (free play opens only from the
  summary page). A `Work` that reads `item.kind` (or any per-question
  flag) for what is tappable, which labels show or which picture is drawn must ignore it when `stage === "free"`:
  write `const k = stage === "free" ? "free" : item.kind` at the top and use `k` everywhere (found in a decimals chapter's tenths
  Builder, where the free play's part taps and Shape did nothing).

Try it in the viewer (`node cli.mjs view`, the "classroom" tick box) or in the preview with `?classroom=1`: nothing
waits for you but a long line's pieces (the arrow; tap the bubble). `check` proves the runtime's part (the `classroom`
row); only a person can tell whether the tool reads well in front of a class.

## 14. The board layout and object skins (runtime r27+, opt-in)

`board: true` in the object passed to `ToolFrame` (`docs/LAYOUT.md` §1b). The runtime draws the question bar, the
Answer key and the sliding panel; the tool changes only how its `Work` is laid out and may add a skin.

- **Lay out from `box`, not from constants.** `Work` receives `box = { w, h, open }`: `w` is 1472 with the panel shut,
  1086 with it open, and eases between over 280 ms (a new `Work` render a frame). Compute positions from `box.w`
  (`const avail = box.w - 2 * margin`), never from `api.W` (it is the widest box) and never from 1086. A strip is
  `Math.min(maxLen, avail - cardsWidth)` long; the cards beside it move with it; the foot buttons spread over `box.w`.
  Do it with plain arithmetic in render so every frame is consistent; do not keep the width in state.
- **Both states are the child's screen.** The question opens with the panel shut, so the picture is first seen wide;
  typing happens with it open and narrow; a miss shuts it, so the traceback plays wide, and it returns after. Draw
  each phase's first frame, its traceback and its win at both widths (`shots` shows the shut state; the open one is
  the `?answer=open` page). `board-fit` fails anything of the working area under the panel.
- **Do not move pieces under the child's finger when the width changes** more than the arithmetic does. A dragged
  piece lives in the working area's own coordinates, so a drag that starts shut and ends open (it cannot: dragging
  does not open the panel) is not a case; a tap on a cell that captures the pad (`api.capture`) opens the panel by
  itself and the picture narrows around the cell, so keep the tapped cell in view at both widths.
- **A question answered on the working area** (`pad: "enter"`) has no panel; the key in the bar reads Enter.
- **A skin** (`docs/IMAGES.md`): the slot's `images.tsx` defines `TOOL_IMAGES`; draw it with `<Skin name="bar" x y w h
  clip="url(#id)" />`, after the plain shape the tool already draws for that piece (the plain shape is the fallback if
  the picture is missing) and before the shading and the labels. One picture, clipped once a piece (a `clipPath` of that
  piece's rect, the skin's box the whole bar), serves ten pieces and every state. Never write `<image>` or a data URI
  in tool.tsx (`no-raster-in-tool`); never put a digit or word in a generated picture.
- **A tile** (one piece, `kind: "tile"`): draw it once per piece, each stretched to that piece's rectangle, so the
  equal widths come from the model, never from the picture:
  `{cells.map((c, i) => <Skin key={i} name="piece" x={c.x} y={c.y} w={c.w} h={c.h} fit="stretch" />)}`.
  `fit="stretch"` keeps the piece's own rim and bevel (the default `slice` would crop them).
- **A figure** (`kind: "figure"`, a person; a photo-style child by default): draw people with `<Skin name="child_a" x y w h />` from the figure skins, never as SVG; one `<Skin>` per person, in a box
  of the made picture's own aspect (`made.w` x `made.h` in images.json, e.g. 72 x 240: a standing person is about 1:3.3, not 3:4), no `clip`, no `fit="stretch"` (`Skin` slices, so a wrong box crops the head or the feet).
- **A disc** (`kind: "disc"`): one `<clipPath>` per sector (the tool's own sector path), and the skin drawn into the
  circle's box once per sector, clipped: `<Skin name="cake" x={cx - r} y={cy - r} w={2 * r} h={2 * r} clip={"url(#sec" + i + ")"} />`.
  The crust then shows on every sector's outer arc; the equal sector lines are drawn over it in ink.
- **Shaded pieces keep the colour code:** draw the deep blue (given) or green (answer) over the skin at about 0.7
  opacity, so the texture shows faintly through, and keep the written label; unshaded pieces are the plain skin.
  Text on a piece sits on a light chip, so its 4.5:1 does not depend on the picture.
- **The cut is the maths and is drawn in code:** equal widths come from the model (`cell = len / 10`), never from the
  picture. A knife sweep, the pieces settling apart by a small gap and the cut lines are SVG; the cutting board
  behind is SVG in the chrome colours.

## 15. An action performed on screen: `api.act` (the owner, 2026-10-16; a runtime with `ACTION_KIT_HELPER`)

Every action key or act (cut, split, measure, count, carry, tidy ...) is DONE by a real tool on screen (LAYOUT.md §1e): a kit
picture (`knife`, `scissors`, `ruler`, `pencil`, `eraser`; IMAGES.md §11) or the drawn `hand`. Call it from the act, await it,
and react only on `true`:

```tsx
const cut = async () => {
  if (cutDone) { api.did("cut"); return; }
  const ok = await api.act({
    tool: "knife", moves: "slice",                      /* knife|scissors|ruler|pencil|eraser|hand · slice|snip|slide|draw|rub|tap|push|carry|sweep */
    at: cuts.map((x) => ({ x, y: barY + barH / 2 })),   /* WORK coordinates, in order: where it acts */
    onPoint: (i) => setSplit(i + 1),                    /* the moment the knife passes cut i: that piece splits */
  });
  if (!ok) return;                                      /* a second tap while it played, or the phase moved on: do nothing */
  setCutDone(true); api.sfx.settle(); api.did("cut");   /* the pieces part a little and settle; the step moves on */
};
api.onEnter(stage === "demo" && stepOn ? () => cut() : null);
```

- `at`: the points it acts at; `slide`, `draw`, `push`, `carry` and `sweep` travel along `from` -> `at`... -> `to` (`from`/`to`
  optional), `onPoint(i)` firing as they pass `at[i]`. A ruler (`slide`) lies along `from` -> `to` with its top edge on that line
  and pops a tick at each `at`. `hold`: an svg node drawn round 0,0 that travels with a push, carry or sweep (the carried piece:
  hide your own copy while it travels). `ms`: another length inside 0.7 to 1.5 s.
- It resolves `true` when it ends (at once under reduced motion, after every `onPoint`), `false` when another act is playing or a
  phase change, restart or new question ended it. While it plays the pad, the keys and the working area wait, so start it from the
  child's act with the answer panel shut (a guide step, or before Answer). Your own `api.lock(true)` held before it stays.
- Never draw the tool yourself and never put a knife or a hand in `images.json`; the helper prints no text, so nothing goes in `TR`.
- **On a runtime WITHOUT the write move (no `caps.pencilWrite`: every chapter fetched before 2026-10-22; below for the newer one), a pencil WRITES AS IT GOES (the owner, 2026-10-18, class 5 ch 6).** Nothing it writes pops in at the end. Text (digits, signs,
  words): the tip travels left to right with a small writing wiggle (a short loop or zigzag inside each character's box) and each
  character appears the moment the tip passes it (`onPoint`); use `moves: "push"` for text, because `draw` leaves a straight grey
  trail that vanishes, which is not a pencil mark. A line that stays (a fraction bar, a bracket, a cut, a strike-through): `draw`
  along exactly that line with dense `at` points, and grow the tool's own line with the tip, so the trail lies on the mark that stays.
  Shading: the tip moves cell to cell with a small hatch and each cell fills as the tip reaches it, with no trail across cells. A
  tick or cut mark: the tip goes to each mark and makes its stroke there, with no line joining the marks. 1.5 s is the most one act
  lasts: split long writing into acts played one after another.
- **Pace (class 5 default from the head after r65, the owner 2026-10-18):** the runtime plays every act 1.5x calmer
  (`ACT_TEMPO`), so keep giving `ms` in 0.7 to 1.5 s and never slow an act yourself. A pencil act plays the writing "tick" at
  its points and holds a 400 ms beat (`ACT_BEAT`) before it resolves. A chain of acts in one guide step must end within
  `approve`'s 10 s wait.
- **PENCIL WRITING (the owner, 2026-10-22): on a runtime WITH the write move (`function penPlan(` in it, `caps.pencilWrite`: every chapter fetched from 2026-10-22 on), a pencil that writes digits, signs or capital letters WRITES them.**
  The tip follows each character's own single-line path, the graphite grows behind it, the pencil tilts, a scratch sounds at each stroke, and the written text STAYS as neat pencil digits (`<PencilText>`):
  about 0.8 s a number, no 400 ms beat. **The rule (`pencil-acts`, PREFLIGHT 26):** every `api.act({ tool: "pencil", ... })` is `moves: "write"` or says `marks: true` (it marks, shades, colours
  or draws a line, and writes nothing). A pencil `push` that reveals a printed `<text>` is the old way: on this runtime it fails.

```tsx
await api.act({
  tool: "pencil", moves: "write",
  text: [String(n), { line: [x1, y, x2, y], size }, { dab: [mx, my] }, String(d)],   /* a string, or an array of: a string, a bar, a touch */
  at: [pn, null, null, pd], size: [s, s, s, s], align: "middle",                      /* one value, or one per token (null for a bar or a touch) */
  onPoint: (j) => put({ pc: j + 1 }),                                                 /* the tip FINISHED character j (a bar and a touch count one) */
});
/* what the tool draws, from the SAME geometry function the act used, so nothing jumps when the act ends */
<PencilText text={String(n)} x={cx} y={y + size * 0.36} size={size} align="middle" chars={pc} />
<PencilLine x1={x1} y1={y} x2={x2} y2={y} size={size} />
```

  - **Options.** `text` is a string or an array. `{ line: [x1, y1, x2, y2], size }` is a bar the pencil writes (180 ms); `{ dab: [x, y], size }` is a touch (110 ms, no ink: the tool's own arrow or tick appears
    when `onPoint` runs), so the marks and the numbers of ONE step are ONE act (the pencil comes in and leaves once). `align` (start | middle | end: what `x` of `at` is), `size`, `color` and `step` (px: every
    character of a string in its own cell that wide, so a row of cards is ONE token) are one value or an array with one per token. `size` is the fontSize the tool printed that text with: a pencil digit is
    0.72 of it tall, so `y` is the baseline (box centre + `size * 0.36`) and it is a drop-in for the printed `<text textAnchor="middle">`. `ms` is ignored: a write has its own pace.
  - **Wiring.** ONE geometry function used by the act AND by the drawing (a scene translate included), so the act's last frame and the finished text are the same drawing. Keep `pc` (characters finished) in state
    and derive what the tool shows from it; what was on screen BEFORE the act stays a printed `<text>`, only what the pencil writes is `PencilText`. Delete the `api.sfx.tick()` after a write (the act scratches
    itself); no `nap` is needed between two acts. A character with no stroke (a space) reports its `onPoint` when the one before it finishes.
  - **Pace and limits.** A string of 1-4 characters is about 0.5 s of ink (150 ms in, 150 out); each character past 4 adds 80 ms. A lone `=` costs a whole 0.5 s, so join neighbouring terms into runs
    ("64 ÷ 8 = 8"). **One written act lasts 3 s at most** (`action-anim` allows 3.4 s), and a guide step's chain of acts ends inside `approve`'s 10 s wait: a working line that takes 4 s is too slow, write fewer
    terms. A stroke is never thinner than 3.2 px. Reduced motion: no motion, every `onPoint` runs, it resolves `true` at once.
  - **What is written.** `0-9`, `+ - × ÷ = / , .` and the capital letters `A-Z`. Never lowercase, Hindi or Gujarati letters, so a translated sentence is NEVER revealed by a pencil: reveal it with the tool's own
    clip and no pencil act. Shading, colouring, rubbing and drawing a line stay `moves: "draw" | "push" | "rub"` with `marks: true`.
  - **Proving it.** `pencil-acts` (a source row, also in the quick check) and `action-anim` (a written act is recognised by `data-role="pen-writing"` on the layer); the visual reviewer looks at a frame
    mid-act and after it (the graphite grows behind the tip; the finished digits are the same drawing).
  - **A chapter fetched earlier.** It keeps its runtime and its old pencil: with the write move in its runtime `pencil-acts` is an INFO row, never a fail (`fetch` writes `rules.pencilActs: "strict"` into
    `runtime.json` for a NEW chapter only; a re-pin keeps what it had). To give a READY pair the new pencil: `pencil-writing/README.md` (a retrofit, only on the owner's word).
- `check`: `action-anim` clicks the act's control for real (name a step's button after its act: `data-control="cut"`).

## 16. Authoring under keyOnly (the new look; the owner, 2026-10-16; a runtime with `keyOnly`, LAYOUT.md §1d and §1e)

A new tool starts with `keyOnly: true` and `navDots: true` in its `ToolFrame` object (`scaffold` writes both beside `board: true`): no question
bar (only the blinking key at the top right), four small clickable phase dots, a big one-sentence bubble, digits as written and every act
performed on screen (§15). The working area is 64,108, 1472 x 520 (900 wide with the panel open and `bigPad`), not 64,202 x 528. A tool opts out
(delete the line) only with a reason stated in its report. The examples are the finished ch 8 Tenth Strip.

### 16a. Keep every element out of the key's corner: `box.key`
`Work` gets `box.key` = { x, y, w, h } in its own coordinates (about x 1190, y 0, 282 x 88; wider on a Yes/No question; absent when no key
stands there). Nothing sits under it: no picture, label, card or key of yours (`board-fit`). Take the room left of it or below it.

```tsx
const kx = box.key ? box.key.x - 12 : box.w;               /* the right edge anything on the top row may use */
const L = Math.min(1200, box.w - 40);
/* a strip whose knife must stand at its end moves left until the knife is out of the corner */
const x0 = Math.round(Math.max(20, Math.min((box.w - L) / 2, kx - 34 - 0.9 * L)));
const nameRow = { x: Math.max(0, Math.min(x0, kx - rowW)), y: 0, w: rowW, h: 76 };   /* the row of name keys ends before the corner */
```

### 16b. The question lives only in the bubble
- Each item's `say` is the WHOLE question in ONE sentence; `ask` stays (the checks and the sidecar read it) but is never drawn:
  ```tsx
  { qid: "M1.S1.T2.C4:ML1", kind: "strip", parts: SLOT_FRACTION, answer: [6, 10],
    say: "Write the coloured part of the strip as a fraction.",   /* the whole question, one sentence */
    ask: "Coloured part as a fraction?",                          /* short prompt; not drawn */
    miss: "The bottom counts every piece." },                     /* a hint: one sentence */
  ```
- A guide step's `say` and `hint`, every `miss` and ladder rung, and a phase's `closing` are ONE sentence each. The bubble shows a hint
  INSTEAD of the question, and the phase's `closing` instead of the last win line (`one-line-bubble`, `one-page`).
- Numbers print as written ("In 0.7, what does the 7 count?"), so a question may name its number unless that gives the answer away.
- The scaffold cuts a plan question of several sentences to its first question sentence and keeps the whole plan text in the item's comment:
  put the setup back into ONE sentence when the child needs it.

### 16c. One key for a sequence
Buttons used one after another, where the second makes the first unnecessary (Cut, then Measure), are ONE key at the bottom
centre whose label follows the act. Its `data-control` follows the current act (`Key id`), so a guide step (`on: "cut"`, then `"measure"`) still
advances and `check` can click it; key it by position so the label changes without a remount. In free play the two starting choices (Cut and
By eye) stand side by side until one is tapped. A key that only UNDOES the last act (a "Lay flat" that puts the pieces back) is a dead end: the guide
has no step for it, so leave it out; the sequence ends on its last real act, and in free play a new Cut or By eye starts over.

```tsx
const TS_KEY = { cut: "Cut", uneven: "By eye", measure: "Measure", count: "Count" };
const lastKey = useRef(0);
const pressKey = (on) => {                                                /* 400 ms: one tap never also presses the next label */
  const t = Date.now();
  if (t - lastKey.current < 400) return;
  lastKey.current = t;
  act(on);
};
const actionKeys = () => {
  let ids = [];
  if (free) ids = s.cut === "none" || s.stand ? ["cut", "uneven"] : ["measure"];   /* two choices until one is tapped, then the one key; after Measure they start over */
  else if (n === 1 && isDemo) ids = s.cut === "none" ? ["cut"] : s.stand ? [] : ["measure"];   /* the sequence: ONE key, its label follows the act, none after the last */
  const bs = G.keys(ids.length, showCards);                               /* bottom centre: one key 240 wide, or two side by side */
  return ids.map((id, j) => ({ id, j, label: TS_KEY[id], ...bs[j] }));
};
{actionKeys().map((b) => <Key key={"act" + b.j} id={b.id} label={tx(b.label)} x={b.x} y={b.y} w={b.w} h={b.h} C={C} tone="key" onClick={() => pressKey(b.id)}>
  <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={toneInk("key", C.ink)}>{tx(b.label)}</text>
</Key>)}
```

### 16d. An object looks like the object from the first frame
Before its first action a chocolate bar is already chocolate: draw the `<Skin>` the moment the object is named (or from the start), as the
WHOLE, under the cuts and the shading (a tile stretched to each piece; a ribbon picture over the whole box, clipped per piece; a ROUND thing is a disc, §17).
The plain shape stays under it as the fallback. A key that NAMES an object carries that object's small picture.

```tsx
const sk = s.name === "chocolate bar" ? "piece" : s.name === "ribbon" ? "ribbon" : s.name === "chapati" ? "chapati" : "";
<rect x={S.x} y={S.y} width={S.w} height={S.h} rx={18} fill={TS_SHEET} stroke={TS_LINE} strokeWidth={3} />   /* uncut: the plain fallback */
{choc && <Skin name="piece" x={S.x} y={S.y} w={S.w} h={S.h} fit="stretch" clip="url(#ts-whole)" />}          /* the whole, already the bar */
{tex && <Skin name={sk} x={S.x} y={S.y} w={S.w} h={S.h} clip="url(#ts-whole)" />}
/* after the cut, each piece: its skin, then the colour code over it at 0.72, then the outline */
{choc && <Skin name="piece" x={S.x + c.a} y={S.y} w={c.w} h={S.h} fit="stretch" clip={"url(#ts-pc" + i + ")"} />}
{s.shaded[i] && <path d={d} fill="url(#gTen)" fillOpacity={0.72} />}
```

### 16e. Every act through `api.act`
Pick the tool by the object (a knife for a bar or a chapati, scissors for a ribbon, a pencil for a line on paper, a ruler to measure, the
hand to count) and play it from the child's act; the act is done only when it resolves `true` (§15):

```tsx
const tool = sk === "ribbon" ? "scissors" : sk ? "knife" : "pencil";
const viaTool = (on, done) => {
  const o = actFor(on);                          /* { tool, moves, at, onPoint }, or null when nothing needs performing */
  if (!o) { done(); return; }
  if (playing.current) return;                   /* a second tap while it plays */
  playing.current = true; setBusy(true);
  api.act(o).then((ok) => { playing.current = false; setBusy(false); if (ok) done(); });   /* the state, the sound and api.did(on), once */
};
```
Enter, the agent's `check()` and the dev `solve()` call the same `act(stepOn)` (`api.onEnter`), so a step is done the one way.

## 17. A round whole is a disc cut in wedges (the owner, 2026-10-17; class 4 ch 8 C5 Tenth Strip; keyOnly runtime)
A thing that is round in life is drawn ROUND and cut the way it is cut in life: a chapati, roti, pizza, cake, pie or clock face is a DISC cut
from the centre into equal WEDGES (never a strip); a ribbon, a chocolate bar, paper or a tape stays a strip. Both can sit in one tool: the whole the
child names (`s.name`) picks the drawing.
- **The shape.** Pieces are wedges from the centre, angles clockwise from the top: `a` = start, `w` = width in degrees (ten equal wedges are 36 each; a
  cut by eye keeps its ratios, angle = u / sum of u x 360). The tool's own helpers (nothing in the runtime; copy them from the finished C5, one
  small block): `tsPol(cx,cy,r,deg)` (a point on the rim), `tsWedge(cx,cy,r,a,w)` (the path), `tsWedgeIn(...,d)` (the same wedge drawn d inside, the dark
  inset outline of a coloured piece), `tsCrust(...)` (an arc just inside the rim), `tsRowAt(cuts, r, W)` (the Measure row's layout).
- **The picture.** The object's `<Skin>` goes over the WHOLE disc and is clipped per wedge (a `clipPath` of the wedge path), the plain brown disc under
  it is the fallback; thin dark cut lines (stroke about 3) so ten parts read from the last bench; a crust arc. The disc is as big as the room allows
  (about 420 across, `picture-scale`) and shrinks to fit when the keypad opens; nothing under `box.key`.
- **The act.** `api.act({ tool: "knife", ... })` comes down on each cut line in turn (radial lines through the centre); the state changes at the end (§15).
- **Coloured pieces stay in place**: the colour code at 0.72 over the skin plus the dark inset outline; never removed and no gap (a taken-away wedge is a
  different lesson).
- **Measure** hangs the wedges tip down from a ruler line in ONE row (each wedge's rim chord sits on the line; a width mark at both ends of every
  wedge: equal for the even cut, visibly different for the uneven one) and they STAY there. No key puts them back (§16c); in free play a new Cut starts
  over. The row's wedge radius: about 200 alone, 168 above cards, 150 with two rows.
- **Taps.** Every wedge has a labelled 72 x 72 button at its centroid (the `data-control` the checks and the keyboard see) and a transparent wedge-shaped
  `<WedgeTap>` behind it so the whole wedge answers (`usePress`); on a cut by eye alternate the buttons' radii so none overlap (`no-crowding`).

## 18. Traps the ch 5 builders hit (2026-10-17; class 5 ch 5 Decimals, runtime r56)

- **Ids the runtime owns.** Never give a tool control one of these `data-control` ids: `again` (the header's Hint key), `answer-open`,
  `part-1`/`part-2`, `key-0`..`key-9`, `key-point`, `choice-<id>`, `phase-dot`. A tool control with one is shadowed: a check clicks the
  runtime's control instead (`guide-steps-real-wrong` clicked the header).
- **A late keyed reset wipes an act.** `useEffect(() => { if (S0.key !== sk) setS(fresh()) }, [sk])` can run AFTER an act has resolved,
  so the act's result vanishes (the `--virtual-time-budget` runs then show "no result" for idle, agent, free ... and about ten FAILs).
  Reset inside the setter: `setS((p) => (p.key === sk ? p : fresh()))`.
- **A phase's closing replaces only a win line the tool says.** With no `api.say` at the last win, the bubble keeps the question and
  `one-line-bubble` fails. Give every item a one-sentence `win` line, said at the win; data-borne lines are not listed by
  `tr-coverage`, so add each to `TR` by hand.
- **Is a hint showing?** `Work` gets no hint prop: read `toolApi.getState().hint` with `hintKind` other than `"type"` (the built-in
  where-to-tap line) and latch it for the question. Use it to show a helper key whose act reveals part of the answer (lit digits, a
  count, a result) only after the first miss or the Hint key; keep the key in the guide steps, free play and the correction.
- **A nudge said with `api.say` stays until something replaces it.** "Shade some squares first." or "Fill every step first." said at a
  refused Enter is still on the bubble after the child has done it (C10, C40 play tests): the runtime does not bring the question back.
  On the child's next act that answers the nudge (a square shaded, a card placed, a pick), say the question again (`api.say(item.say)`).
  Key that effect to the act's CONTENT (`[rows.join(" ")]`), never to an array's identity: an untouched question that builds fresh
  rows each render fires it at once and wipes its own nudge (C15). A restore-the-question effect stands down while the nudge still holds (C30).
- **A hi or gu bubble line over about 80 characters is split at its commas** and only the last piece may stay (a long Hindi closing was
  cut after two lines; no check replays phases 2 to 4 in hi/gu). Keep every hi/gu bubble line one sentence of at most 80 characters.
- **(ch 9) A phase opens on stage "teach" for one frame before "demo".** A `Work` that picks the warm-up only when `stage === "demo"`
  draws question 1's own board for that frame (play testers caught "4 L 615 mL" before the warm-up's "3 m 45 cm"). Treat `teach` like
  `demo` whenever the phase has a warm-up: `const it = (demo || stage === "teach") && P.warm ? P.warm : item`.
  The step count in that frame is still the PREVIOUS phase's: a warm-up drawn from the step shows its finished state, so use step 0
  while `stage === "teach"`.
- **(ch 9) A reset in a passive effect draws the OLD board for one frame,** and `getState()` can sample it (a solved warm-up showed
  "14,100 g" on question 1). Derive the board from the question key during render (`const S = raw.qk === qk ? raw : fresh()`).
- **(ch 9) At a phase's last question the stage goes to "idle" about 0.7 s after the win.** A win picture drawn only for
  `stage === "win"` vanishes while the closing line still describes it: draw it for `win || idle` after the phase's last right answer.
- **(ch 9) A home-made Devanagari/Gujarati width estimate undercounts.** Five ch 9 tools wrote their own and most skipped the SPACING
  vowel signs (ा ि ी ो ौ ः / ા િ ી ો ૌ), which take real width, so labels fitted at 40 ran 2-6 px past their cells in hi. Count every
  letter and spacing sign; skip only zero-advance marks: U+0900-0902, 093C, 0941-0948, 094D, 0951-0957, 0962-0963 (and the Gujarati
  twins U+0A81-0A82, 0ABC, 0AC1-0AC8, 0ACD, 0AE2-0AE3). Keep 6 units clear of the cell, and check a hi frame with the pad OPEN.
- **(ch 9) A correction replay outlives its question.** `useTimeline` survives a question change inside a phase, so when the teacher
  agent calls `toolApi.next()` / `gotoStep` mid-replay, the old timeline keeps drawing (it painted the NEXT question's whole answer in
  C35) and its done-callback runs `api.setTyped("")` / `api.lock(false)` on the new question (C10). Stop the timeline and release the
  lock wherever the question key changes (`useEffect(() => () => tl.stop(), [qk])`), and ignore board taps while a correction plays.
- **(ch 9) A question entered again opens on a fresh board, even after an away-and-back.** The runtime remounts Work (`workN`, r64+)
  only for a `gotoStep` to the CURRENT question, so Q2 -> Q3 (left untouched) -> Q2 keeps the same Work. A board tagged with the
  question key and rebuilt only when the tag differs finds Q2's old state still tagged Q2 and redraws the old correction, the
  child's old marks, or (C10) a stale wrong tag that makes a right answer miss (C5, C10, C20, C45). Key the board to the ENTRY, not
  the question: bump an entry count during render whenever the question key changes and rebuild on it. A keypad open/shut is not an
  entry and keeps the board. Probe: miss Q2, `gotoStep` Q3, `gotoStep` Q2; and with no miss, mark Q2, `next()`, come back.
- **An Invite on a key, a chip or a card always hugs its outline** (`<Invite x y w h rx C />`, r57+; x, y its CENTRE). The default circle
  (r 56) centred on a label cuts through its letters, worst in Hindi and Gujarati where it hides the matras; five ch 5 tools shipped it
  before a visual review. Pass the piece's own box: the runtime draws the ring 6 units outside it, so a ring round a box that already
  has a margin can leave the working area (`zones`).
- **No-break spaces do not hold a line together in the bubble:** it turns every space-like character into a plain space before it
  wraps. To keep an equation on one line in hi/gu write it without spaces ("5.23+1.6=6.83"); the English stays as written.
