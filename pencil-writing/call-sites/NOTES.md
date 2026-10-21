# Call-site notes (from class 4 chapter 7, M1.S2.T4.C15.2D1; the first tool adapted)

Each tool gets one script here, `<ch>__<slot>.mjs`: exact-string replacements on its pair (each old text must match once, a new text already
present is skipped, `--dry` first, nothing is written unless all apply and the result parses). It is the record of the change. Ch 7 C15's is
the model: `7__M1.S2.T4.C15.2D1.mjs`; its capture script (`.capture.mjs`) reaches the acts the stock `capture.mjs` cannot. When the helper moves on
(this tool's did once: the `dab` token), keep the script re-runnable on the current pair: put a patch-up (`rep(name, currentText, finalText, true)`,
optional, listed BEFORE the replacement it corrects) that turns the previous final text into the new one; the base replacement then finds its
final text and skips. It runs clean twice on the pair as it is.

## How a written fraction / label is wired (what the other tools can copy)
- Put the geometry in ONE top-level function used by the act AND by the drawing (here `ltPenFrac(g, n, d, cx, y0)` and `ltStepLbl/ltPairLbl`), so
  the act's last frame and the finished digits are the same numbers: no jump. A write's `at` is the BASELINE (centre of the old box + `size * 0.36`
  for a digit the tool printed with `textAnchor="middle"`), `align: "middle"`, `size` = the fontSize the tool printed with.
- `at` and `size` arrays are indexed by TOKEN (a `{ line }` or `{ dab }` token has a slot too; its own point is unused: give `at` null there).
- A fraction is ONE act: `text: [String(n), { line: [x1, y, x2, y], size }, String(d)]`. Bar ends inset by `size * 0.05` (the round caps), at
  `y0 + lay.barY + 3` (the old rect's middle); width comes out as `size * PEN_W` = 0.1 size (never under 3.2 px), about the 6 px the old rect had.
- `onPoint(j)` counts characters across all strings (the bar and a dab count one each): keep a `pc` (characters finished) in the tool's state, derive
  the old `sh` from it (`ltPenAt(n, d, c)`: `{ pc: c, sh: 3 when done, 2 after the bar, 1 after the numerator }`), and after the `await` set the final
  value (reduced motion, and a write that resolves false, run no/other hits). A rung/box with `pc` draws `<PencilText chars>` / `<PencilLine>`; one
  WITHOUT `pc` (on screen before any act, `quickStep`, the intro picture, `ltFresh`) stays the printed Poppins `<text>`. Set `pc: 0` (not
  undefined) when the act starts.
- `api.sfx.tick()` after a write is deleted (the act scratches itself); `api.sfx.settle()` stays.

## The dab recipe: marks and numbers in ONE act (helper with the `dab` token)
A mark the TOOL draws (an arrow, an elbow line) and the numbers beside it used to be a `push` (1.45 s: 1.05 s minimum x 1.5 tempo + 400 ms beat)
THEN a `write`. Now: `{ dab: [x, y], size }` is a token in `text`; the tip touches that point for 110 ms, leaves no ink, `onPoint` runs at its end,
and it counts as ONE character. So the divide is
`text: [{ dab: arrow1 }, { dab: arrow2 }, "÷3", n, { line }, d]`, `at: [null, null, labelPt, pn, pn, pd]`, `size: [lblSz, lblSz, lblSz, s, s, s]`:
`onPoint(j)`: `mk = min(j + 1, 2)` (the tool's arrow appears as it is touched), `lc = min(max(0, j - 1), "÷3".length)` (label chars),
`pc = max(0, j + 1 - 2 - labelLength)` (the fraction). The last step that lands on the card is `[dab, dab, "÷f"]` (no fraction). The u-route's elbow is
`[dab c1, dab c2, dab c3, "÷f"]`, `mk = min(j + 1, 3)`: the tool's purple segments and arrowhead appear as each corner is touched (kept the step
arrows' colour; the other choice was three `{ line }` tokens, graphite lines drawn by the pencil). Between two tokens the tip zips in 40 ms.
A marks `push` NOT followed by a write (`doLists`, `doColour`, `doLine`) stays a `push`/`draw`. Measured: a one-digit divide 2.4 s (was 3.55 s), the label
+ dabs alone 1.1 s, a fraction 1.56 s, the u-route + label 1.25 s. The acts next to a `nap` of the tool's own need nothing between them; the old
one-frame ink flash at the start of a second act was a helper bug (ActLayer's clock), FIXED in the helper: no `nap(40)` workaround is needed now.
- Not numbers, left alone: acts over cells / bars / lines and `work` (a clip reveals a TRANSLATED sentence of words and numbers: the digit table cannot
  write letters, so it would print them in Poppins, mixed). That one is the owner's call.

## Proving
- `node pencil-writing/capture.mjs 7/<slot> --phase N` times the guide steps, but takes its frames from the start of a whole chain and reaches no
  child-triggered act. The call-site capture script finds each write by its ink (`data-role="pen-ink"` exists from the first stroke to the act's end)
  and reports "last ink ends N ms after the act started" (= the act's length, dabs included: ink alone starts at ~460 ms for a divide). `--pre 170,340`
  takes frames from the act's START, before any ink (the dabs: the tip must be on each arrow point, the arrow appears as it is touched);
  `--offsets` are from the first ink. Flows: `guide`, `tap` (real click on a tile), `wrong` (wrong answer: the trace), `tapwrong`, `free` (to the
  summary, Free play, New fraction). Earlier questions are passed with `toolApi.answer(right)` then `check()` (`check()` alone does nothing in the ask
  stage). A screenshot takes 150-300 ms.
- A wrong answer on a question that lands on the card is now about 3.1 s of acts (dabs + label 1.1 + the tool's nap 0.4 + scratch 1.56), plus the tool's
  own 0.3 s before and 1.4 s after; `approve` waits 5 s after the wrong answer and passed.

## ch 10 C15 (M1.S2.T4.C15.2D1, the number towers; script `10__M1.S2.T4.C15.2D1.mjs`, capture `10__M1.S2.T4.C15.2D1.capture.mjs`)
- **The slot id is shared with ch 7 (and ch 6) C15.** The stock `capture.mjs` names its page and frames by slot id alone (`out/pages/<id>.html`,
  `out/frames/<id>-p1-act1-...`), so two tools' runs overwrite each other. The ch 10 capture prefixes everything `ch10-`; do the same for ch 6 / 11.
- **What a box digit is.** The tool prints a tower box's number as `<text>` inside a brick skin. Pencil-written numbers stay pencil: keep a map of the
  boxes the pencil wrote (`pw`) and draw those with `<PencilText>` forever (never swap to the printed one when the act ends). The act and the box
  share ONE geometry function (`twrPenBox(B, x, y, v)`: string, size, baseline point) and one colour (the act's `color` = the drawing's `color`,
  here INK_MADE; a colour change at the end of the act is the "swap"). A box in progress carries the FULL value and the character count
  (`part: { k, s, v, pc }`); `valueAt` keeps returning the partial string, so face colour, skin, ledger and `api.share` see "has a digit" only once
  the first character is finished (the brick appears under the first digit).
- **A mark that makes a PRINTED number appear is not a mark.** `pencilBox`'s first point (`fix.w`) made the printed "= N" appear in the working column
  under a tip that leaves no ink; and `writeWork`'s single point made the printed "= N" appear. Both are now written: `pencilBox` is ONE act of
  `["= N" in the working column, the number in the box]`, `writeWork` one act of `"= N"`. A written result keeps a `wp` entry (characters so far, kept
  after the act) so `lineAt` draws it with `<PencilText>` (the same string as the printed one, "= N" WITH the space; a space glyph exists).
- **One align per act.** A `write` has ONE `align`; a start-aligned ledger string and a centred box number in the same act: use `align: "start"` and
  give the centred string its start x, `cx - penLayout(text, 0, 0, size, "start").w / 2` (`penLayout` is the helper's global; `twrPenStart`).
- **A space (or any stroke-less character) hits late.** Its `onPoint` fires at the END of its whole string (no stroke ends it), so in "= 15" the
  space's onPoint comes after the digits'. Keep a local `lc = Math.max(lc, j + 1)` (never `j + 1` straight into state) or the written characters
  vanish and return. Digits, comma, `=` and signs have strokes and are in order.
- **Free play's `rebuild` was a push over the boxes that change and the box swaps its number as it is touched**: that is a number on screen, so it
  is ONE act of `[{ dab: box }, "new number", { dab: box }, "new number", ...]` (the dab erases the old number: `rb[k] = 0`; characters follow:
  `rb[k] = n`; after the act `pw[k]` keeps them pencil). `rebuild` needs the NEW grid (its closure still holds the old rows): callers pass it.
  The script's `--no-rebuild` leaves this group out of a FRESH pair; on a pair that has it, `--drop-rebuild` applies the group the other way round (then
  `approve` again). Measured: one number 0.8 s, `pencilBox` ("= 15" + "15") 1.35 s, a base change (2 boxes) 1.64 s, Switch sign (3 boxes) 2.32 s.
- **Left alone (not pencil acts, say so in the report):** the build ledger's printed whole line ("a + b = N") that appears with the box's first digit
  (and in free play when a box is touched), phase 4's `flipSign` (instant printed `worked[o:0]`, no pencil), the win fill and the wrong-answer trace
  (timelines of printed digits), digits the child types.
- Capture flows (all real input except `toolApi.check()` for guide steps): `guide --phase N` (phases 1-2 write a box, 3-4 write a result),
  `misses --phase 1 --q 1` (click the box, three wrong entries on the keys: the third makes the pencil write it), `free --phase 4` (to the summary, Free
  play, a bottom number changed with `--base 7`, then Switch sign). Single numbers measured 794-796 ms.
- **Time a click-triggered act from the act's own start.** `watch()` filters the 8 ms log from `window.__a0` (the logger's first "acting" sample), not from
  the moment it was called: after a real click the act is already running, and a filter from "now" cuts the first 100-150 ms (the first run of this
  script printed 1213 / 1520 / 2219 ms for what are 1346 / 1641 / 2324 ms). First ink comes 150 ms after the start, 300+ ms after it when a dab leads.
- `approve` plays only the guide-step acts (4 here: the box in phases 1-2, the result in phases 3-4). `pencilBox` and `rebuild` are proven by this capture only.

## ch 7 C20 (M2.S3.T5.C20.2D1, same-amount bench; script `7__M2.S3.T5.C20.2D1.mjs`, capture `7__M2.S3.T5.C20.2D1.capture.mjs`)
- Only ONE of the three pencil acts writes a number: SabCross's cross product (`push`, ms 700 / 500 fast, one point per digit, 1.45 s with the beat). It is
  now ONE `write` of the product text. The other two stay: the SabSame guide-line drop (`draw`, a vertical line) and SabCross's crossing lines (`draw`, the
  tool's own coloured line that grows with the tip and has a `strong` dashed twin later). Left per the brief (a line `draw` is not a number). A line `draw` then a number `write` is two acts here
  (1 s draw + 0.4 s beat, the pencil leaves and comes back, then 0.8 s). A `{ line }` token would turn the line into a fast graphite stroke (a look change), but a merge
  by DABS would keep the tool's own SAB_LINE line: `text: [dab x6 along the existing `at` points, product]` with `onPoint` setting `grow[key]` for the dabs (the C15 u-route
  did that), about 1.7 s a step instead of about 2.7 s. Not done; an option if the owner wants the crossing faster.
- Wiring (4 edits, 0 state changes): a top-level `sabProdBase(bx)` (the box's middle, baseline = box y + 14, where the printed text sat) used by the act AND by
  `productBox`; `S.prod[k]` stays "the string so far" (`txt.slice(0, j + 1)`), and `productBox` draws `<PencilText text={full product} chars={S.prod[k].length}>`.
  The SAME box in its `strong` state (the win page, `S.right`) draws the full number with the same PencilText, so nothing swaps from pencil to Poppins when the
  verdict lands (checked on the win page frame). Colour: graphite (the helper's default), no longer the tool's SAB_LINE.
- The scene is in `translate(off, 0)` and the phase in `translate(0, DY4)`, while the act layer is in stage coordinates: the act's `at` is `off + x, DY4 + y`
  and the drawing's is `x, y`. The capture proves "no jump" by comparing the layer's last strokes with PencilText's strokes up to exactly that shift (270, 36),
  point for point (0 difference). Other tools with a translated scene: check `off` / the group's translate, never assume the same frame.
- Not changed, and why: the trace's two light rows (`lightRow`, a wrong No) show their straight products printed (84, 189) by the tool's TIMELINE (`tl.run`
  popping `sprod` plus `api.sfx.tick()`), not by a pencil act, so they stay Poppins next to the pencil 126s. If the owner wants them pencil-written too, they need
  an act (they are timeline steps today). Thumb's `x1 = x2` text and the verdict "=" / "≠" are printed, not pencil acts.
- Measured (capture, 8 ms log; the layer's first frame to its end): 1, 2 and 3 character products all 799-809 ms, first ink 145-168 ms in, no ink in the first
  100 ms (no flash), the tip is on the box before the strokes. Chains: guide step 1 and 2 were 3351 ms each (1 s line + beat + 1.45 s product) and are now
  line (1 s + 0.4 s beat) + 0.8 s. Product text is digits only (6, 60, 84, 126, 189, 196): nothing outside the table.
- Other acts of this pair, checked in the source and left: scissors snip (SabSame), knife / eraser through `sabSplitAct` (SabBuild, SabTarget, SabFree), a hand tap (SabFree's row).
- Capture flows: `guide` (phase 4's two guide steps), `tap` (REAL clicks on num-a and num-c, then the verdict key and Enter, win frames before / after), `agent`
  (`toolApi.answer` + `check()`: the fast two-line path; `--wrong no` for the trace). The write's marker is `data-role="pen-writing"` (the layer exists for the
  whole act, ink or not), more reliable than counting ink when a `draw` act comes first.

## ch 10 C20 (M2.S3.T5.C20.2D1, the letter-code wheel; script `10__M2.S3.T5.C20.2D1.mjs`, capture `10__M2.S3.T5.C20.2D1.capture.mjs`)
- First read as "left: it writes letters" (the glyph table had none); converted once the table got capital letters A-Z and the `step` option. ONE pencil act, `doTry`
  (the Try key): a `push` over the cards (ms 700, 1.46 s measured in the phase 4 guide step) is now ONE `write` of the whole row: `text: cards.join("")`, `step: 64`,
  `align: "start"`, `at` = the left edge of card 0's cell (`RX + 170`, baseline `ry + 43` = where the printed card sat), `size: T.label`. Four edits, no state change
  (`tryAt { row, n: j + 1 }` as before; a letter is one character). The other act, `doCount`, is a `hand` tap (left).
- ONE geometry for the act and the drawing: top-level `cwRowPen(RX, ry)` -> `{ x, y, size, step }`; `trialRows()` draws EVERY row (the one being written, finished rows, `demo`
  rows, the solved page's extra rows) with `<PencilText text={cards.join("")} x y size step align="start" chars={upTo}>` in graphite, so nothing swaps to Poppins. The row's
  key label ("3 back", "A is 26") stays a printed `<text>` (it appears with the row, before the act). Cards are always one capital letter (`cwLetter` = `CW_ALPHA[...]`),
  so nothing outside A-Z is written in en, hi or gu (capture: no printed `<text>` among the pencil text).
- A row is ONE token: with `step`, cell j's centre is `at.x + 64 * j + 32` whatever the number of cards (`align: "start"` keeps it independent of the row's length; with
  `align: "middle"` the row would be centred on at.x instead).
- Measured (capture `--flow guide|ask --q 1|2`, en and hi): 3-letter rows 791-816 ms, first ink 147-163 ms in, no ink in the first 100 ms, the layer's last strokes are the
  finished PencilText's strokes point for point (shift 0,0: this scene has no translate). Old guide step 2: 1459 ms.
- Real-click flows: Q1 (bandlock: Try, Flip band, Try -> D O G, W L T), Q2 (ring KDW: Back x3, Try, Back x6, Try, Back, Try -> H A T, B U N, A T M, then "Three tries are
  enough."), then the answer (the win page: no swap). `approve` plays only guide step 2 here; the child-triggered rows are proven by this capture only.
- Letters seen and fine: A B D G H I L M N O P T U W (I has top and bottom bars; O is a narrow oval).

## ch 7 C10 (M1.S2.T3.C10.2D1, Share Out Bench; script `7__M1.S2.T3.C10.2D1.mjs` (`--file <copy>` tests it on a copy), capture `7__M1.S2.T3.C10.2D1.capture.mjs`)
- **The slot id is shared with other chapters' C10**; the stock `capture.mjs` frames are `ch7-<id>-...`, the call-site capture's `ch7-<id>-<flow>-...`.
- **The one pencil act** is Work's `writeAct` (`both-ways`, `leftover`): a `push` of 900 ms with one point per TERM of the working lines (`"24 ÷ 8 = 3 | 3 × 3 = 9"`, `"multiply first"`,
  `taken`/`left`/`together`), revealing `S.w[i]` = how many terms of line i. Phase 1 has NO pencil act (its three acts are hand taps and pushes; the 1196/1345/1198 ms quoted for it
  were those). The writes are in phase 2 (guide: one `both-ways` step; ask: the 4th real key), phases 3 and 4 (`leftover`, guide only), and free play (`both-ways`, then `leftover` for line 3).
  Before: 1759 / 1748 / 1758 ms (p2 / p3 / p4, with the 400 ms beat). After: phase 2 both-ways 4.4 s (two lines, 20 characters of numbers, 40 strokes), phases 3 and 4 leftover 3.2-3.3 s
  (three lines of 9 characters), free play both-ways 4.3 s and leftover (line 3 alone) 1.25 s. Every measure is well under approve's 10 s act limit.
- **Pace decision: write RUNS, not a token per term.** A string costs 500 ms (+80 ms per character past 4) wherever it is, so one token per term (a lone `=` too) would be 7.5 s
  for phase 2's two lines (close to approve's 10 s and past its 6 s step wait). Neighbouring terms are joined by a space and written as ONE string ("64 ÷ 8 = 8"); a `|`
  or a hidden answer ends a run. `sobPenPieces(terms, lay, size, ay, hi)` returns the pieces `{ s, x, y, size, c0, len, rings }` (and `{ hole, cx, cy, ... }`); the act builds
  `text/at/size` from them and the drawing (`SobPenLine`) draws the SAME pieces from state (`pw[i]`), so nothing moves when the act ends. Start-aligned at the old layout's term x
  (sobLay), baseline = the printed text's, `size` = the printed fontSize. A pencil run is a little narrower than the old per-term layout, so the next run (placed by sobLay) never collides.
- **A hidden answer (the ask stage's empty dashed box) is a DAB** (`{ dab: [cx, cy] }`, the tip touches the box, it appears, no ink). Only the ask stage has them (the guide
  runs in warm/loose mode: every value shown, ring on), so no guide capture exercises a dab: use `--flow ask --phase 2 --q 1` (REAL clicks on Open bowls, Deal out, Lift to tray, Both ways).
- **A ring around a number that is in the middle of a run.** The ring (the tool's accent ellipse) is placed from `penLayout(run).chars` (the digits' advance box + 11 px) and shown when
  the number's last digit is down. One space before a ringed number put the ring on the `=`; the run gets TWO spaces before it (the ring then clears the `=` by about 7 px).
- **Card vs content.** `w[i]` still gates the line's CARD (white rectangle + printed label); `pc[i]` (characters finished) gates the content. The act shows line 1's card when it starts and the
  next line's card when the last character of the line before it is down (so a card never appears long before the tip arrives). `finish`'s reset (`put({ w: [0,0,0], pw: [null,null,null],
  pc: [0,0,0], ... })`) and `sobFresh` clear the pencil state, so a `told` reveal prints the old way.
- **Late-hit spaces**: a space has no stroke, its `onPoint` fires at the end of its whole string. `onPoint` keeps `max(pc, c0 + offset + 1)`, never a lower count.
- **A write refused before any hit** (a second act while one plays) puts `pw/pc/w` back as they were; an act cut short keeps what was written.
- **Left alone, and why (the owner's call):** the hand acts (open, deal, lift, count-tray, count-bench); `finish` (the tool's own timeline: on a RIGHT answer the pencil lines of the ask stage
  vanish at 60 ms and are re-printed in Poppins bold with the hidden answers filled in, over about 1.5 s; the wrong-answer trace does the same; a win after phase 2's `both-ways` shows
  this too: pencil first, then printed): not a pencil act, it is a timeline of printed terms; the card labels (`tx(ln.label)` words), the per-bowl numbers, the big fraction and pile.
- **Measures** (capture, 8 ms log): act = layer's first frame to its end; no ink in the layer's first samples (0 ink for 150-170 ms in a `check()` flow); in a REAL-click flow the layer's first
  frame comes about 90 ms after the act's own t0 (React's commit), so ink starts about 50-60 ms into the layer and the pencil's fly-in is shortened; the ink count goes 0 -> 1 (no stale ink).
  The tip stays within p95 20 px of the newest ink end (a dab far from the last ink, and the 40 ms zip from the end of one line to the start of the next, are the only larger distances); every
  ink stroke of the layer's last frames equals a finished PencilText stroke at EXACTLY shift (0, 0) (this scene has no translate: the act layer and Work are both `translate(W.x, W.y)`).
  A 2-point stroke (an `=` bar) matches ANY other bar of the same length at some shift, so a "constant shift" test proves nothing: test for the expected shift (the capture does).
- **A screenshot stalls the page's animation** (rAF): a frame taken mid-act can show the tip behind the text the hit timers have already drawn (seen once at 2 s). Use `--offsets ""`
  (no shots) for timing and tip-sync numbers.
- Capture flows: `guide --phase N`, `ask --phase 2 --q 1 [--then win|wrong]`, `free --phase 4` (to the summary, Free play, the five keys); `--lang hi|gu`; `--offsets "a,b"` or `""`.
