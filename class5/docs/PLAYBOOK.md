# Playbook: how the play tester plays

**START from the check's real-input rows. Do not re-play what `check` already plays.** `node lib/check/playhelpers.mjs rows <slot_id> --ch N`
(in the class folder) prints the rows of the slot's last check by level (`.build/check.json`) and says when it holds only a quick check (`check --no-render` overwrites the file with source and maths rows), or that `node cli.mjs status --ch N` tells whether the full check is fresh; with a quick check only, or after `clean` removed the file, use the list below.
`check` already plays, with REAL mouse, finger and keys, every row its pinned runtime has (`docs/CHECKS.md` has each row): guide steps with a real
wrong act at every step (`guide-steps`, `guide-steps-real-wrong`), the Hint key and the ladder (`hint-key`, `hint-ladder-monotonic`), the Next key
(`next-key`), the phase party and a phase dot during it (`phase-party`), the summary page (`summary-page`, `summary-simple`), the card answer
(`card-answer`), the start page (`start-page`), the board panel (`board-panel`), drags (`pointer-drag`), `click-then-enter`, `parts-input`,
`point-input`, `keyboard`, the classroom (`classroom`, `classroom-pieces`), Free play, Play again, `whole-lesson`, `no-free-between-phases`,
and the ink of the hi/gu bubble (`hint-lines-clear`). A row that passed is not yours to repeat.

**You add only EXPLORATORY probes**, the things a script of fixed cases cannot think of: a double tap and fast taps; Escape, the restart key or a
phase dot during a celebration; keyboard only; finger against mouse; classroom mode; Hindi and Gujarati. Report behaviour (state, stuck, error), not
looks: how it looks is the visual reviewer's, from the review pack. Never kill a Chrome you did not start; never use the shared Playwright browser.

Helpers (`lib/check/playhelpers.mjs`, on top of `playkit.mjs`): `snap`, `gotoQuestion`, `clickControl`, `typeAnswer`, `wrongAnswer`, `solveQuestion`,
`pressNext`, `sampleBubble`, `hintShown`, `partyState`, `tabOrder`, `burstClicks`; the header of that file says what each returns. Set up once:

```js
const LIB = "file:///C:/Users/Karan%20Shah/Desktop/reasonify/udgam-tool-pipeline/maths_pipeline/<class folder>/lib/check/";   // fill in <class folder>
const { play } = await import(LIB + "playkit.mjs");
const h = await import(LIB + "playhelpers.mjs");
const ID = "<slot_id>", CH = <n>;
```

**1. A question, a miss, the hint** (what a child sees after a wrong answer; `t.errors()` stays empty):
```js
await play({ id: ID, ch: CH, phase: 1 }, async (t) => {
  await t.until("['ask','demo'].includes(window.toolApi.getState().stage)", 25000);
  console.log(await h.gotoQuestion(t, 1, 2));              // null = it did not land
  const w = await h.wrongAnswer(t);                        // { ..., missed }  missed false = nothing was sent (see 2)
  console.log(w.missed, await h.hintShown(t), await h.sampleBubble(t, { every: 100, for: 1500 }), t.errors());
});
```
**2. Typing through the keypad.** `await h.typeAnswer(t, "35")` (real clicks; it opens the answer drawer first); `"0|1"` is box 1, Enter, box 2; `{ how: "keys" }` uses the
keyboard; `{ enter: false }` leaves it typed. A card-answer question draws no keys until the act on the picture is done (`cardReady` false in `snap`): click
the control the step names first (`h.clickControl(t, "cut")`), or `h.solveQuestion(t)` (dev driver: not real input). Do not test the digits themselves: `click-then-enter` does.

**3. Double tap and fast taps** on a step's control, the Next key and the Answer key: one act must count once.
```js
const a = await h.snap(t); await h.burstClicks(t, "cut", 2, 45); const b = await h.snap(t);   // a TRUE double tap (t.doubleTap, 45 ms apart): guideStep must rise by one, not two
await h.burstClicks(t, "cut", 4);                                                             // four real clicks about 160 ms apart: a fast child
console.log(a.guideStep, b.guideStep, b.stage, t.errors());
```
(`burstClicks(t, id, 2, gap)` is a true double tap through playkit's `t.doubleTap(id, gap, "mouse" | "touch")`: try both `how` values for a control. More than two clicks are real clicks about 160 ms apart, a fast child but not a double tap.)

**4. During a celebration** (motion ON, `play({ ..., motion: true, nextKey: true })`): win a phase's LAST question (the party starts there), then press things while it and the Next key are up.
```js
await h.gotoQuestion(t, 1, 3); await h.solveQuestion(t);    // the phase's last question, right: the celebration starts
await t.wait(500); console.log(await h.partyState(t));
await h.clickControl(t, "phase-2");                         // or t.key("Escape"), or h.clickControl(t, "restart"), or h.clickControl(t, "again")
await t.wait(400); console.log(await h.partyState(t), await h.snap(t), t.errors());   // party off, one phase, nothing doubled or stuck
```
**5. Keyboard only**: `await h.tabOrder(t, 14)` (every stop reachable, in a sensible order, none lost after an act), then Enter and Space on each stop with
`t.key(...)`, then `h.typeAnswer(t, "7", { how: "keys" })`. Report a control you cannot reach, or one that loses focus after use.

**6. Finger against mouse**: the same act with `h.clickControl(t, id, { how: "touch" })` and `{ how: "mouse" }`; the two `snap`s must agree. Drags: `t.drag(id, dx, dy, "touch")`
then `await t.dragging()` (above 0 after release = a stuck drag).

**7. Classroom and languages**: `play({ ..., classroom: true })`: tap the bubble (`h.clickControl(t, "bubble")`) while a piece is parked, read each win and closing line with
`h.sampleBubble` (every sentence stays up long enough to read), tap during a celebration (the skip). `play({ ..., lang: "hi" })` and `"gu"`: the same walk, then
`sampleBubble`: the instruction and its hint are present and drawn (`hintShown().same`), nothing English left in a line that has a TR entry.

**8. The whole lesson**: `play({ id: ID, ch: CH, phase: "none", nextKey: true })`; per question `h.solveQuestion(t)` then `h.pressNext(t, "click")` (or `"enter"`, `"api"`) to the summary;
`await t.eval("(window.__events || []).length")` is the `finished` count (one, only from the summary). Walk it once by finger and once by keys.

**9. A written pencil act** (a tool with `moves: "write"`, PATTERNS §15): play the act through its own control with motion ON and take a screenshot about 150 ms and about 450 ms after the press. The graphite must grow behind the tip and a character must be partly drawn mid-act; after the act the written text is the SAME drawing, where the printed one would sit (no printed digit swapping in, no jump, no ink flash at the start); a second tap while it plays does nothing; one written act lasts 3 s at most; nothing written is a translated sentence. `pencil-acts` and `action-anim` already prove the rule and the timing: you look at it.

Report as your agent file says: at most 30 lines, `[must-fix | should-fix] phase n, what you did, what happened, what should happen, repro lines`; delete your scratch folder.
