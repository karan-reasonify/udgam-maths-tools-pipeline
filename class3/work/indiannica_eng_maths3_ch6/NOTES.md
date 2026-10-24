## Runtime / docs gaps (M1.S1.T2.C6.2D1 Fraction Maker builder, 2026-10-23)
- No wedge helper in r1 (`WedgeTap`, `tsWedge` etc. of PATTERNS §17 are a finished class 4 tool's own code, not runtime): the tool writes its own `fmWedge`/`fmMid` and puts a 110 x 110 `Hit` at each wedge's centroid (a whole-wedge tap needs a module-scope press component). Docs gap: §17 names helpers a class 3 builder cannot read.
- A closing line over 80 characters is cut by `pieces()` into two pieces and, with `nextKey`, only the first is ever shown (`one-line-bubble` FAILs "closing never reached the bubble"); `one-page` does not flag a long closing. Docs gap: say "closing at most 80 characters" in PREFLIGHT 4 / PATTERNS 16b.
- A win line said from Work's `useEffect` on `stage === "win"` is NOT swapped for the phase's closing (Work's effect runs before the runtime's `live.current` reads "win"); saying it one tick later (`setTimeout(..., 0)`) works. PATTERNS §18 says "said at the win" without this trap.
- (Fraction Maker, maths review answer d) A card answer cannot open on the denominator: the runtime starts the caret on `part-1`, and a tool that calls `api.pickPart(1)` at open would put the numerator `card-answer` types first into the bottom box. Needs a runtime option (e.g. `item.firstPart`) if the owner wants "bottom number first" on the card.

## Runtime / check gaps (M1.S2.T3.C12.2D1 Sort and Compare builder, 2026-10-23)
- `card-answer` FAILs a `cardAnswer: true` tool that has only choice questions ("no question answered on a card was found"), so a tool whose answers are all word choices cannot put its choice keys blinking in the key's corner (one tap); it must drop `cardAnswer` and the choices sit behind the Answer key in the drawer (two taps). The row could accept a choices-only tool.
- (Fraction Maker, visual + play round) Runtime items, not fixable in tool.tsx:
  - Choice keys pick their type size key by key (`AskBar`: prompt size if THAT label fits, else label size) and one width for all (`choiceKeyW`), so "half"/"third" draw bigger than "quarter" (hi: "आधा" vs "एक तिहाई"; gu: "ત્રીજો ભાગ"). Needs one size per row in the runtime.
  - The summary rows' Hindi lines sit tight (matras near the line above): the row pitch is the runtime's.
  - Keyboard focus falls to BODY after Space on a slice or Enter on a key (`pointerBlur` in `usePress`); returning focus to the next awaited control would need a runtime hook.
  - Escape does not end the phase party (runtime).
  - The last question's own win line is never shown under keyOnly (the closing replaces it at once); this tool puts the phase 1 reason ("fewer equal parts make bigger parts") into the closing instead.

## Runtime / docs gaps (M1.S2.T4.C17.2D1 Share Into Groups builder, 2026-10-23)
- `Skin` has only `slice` (crops) and `stretch` (distorts): no letterbox/meet fit. A bar (3.77:1) in a square box crops to a brown square, so the tool computes each bar's own 3.77:1 box itself (tray bars about 94 x 25, holder bars 90-115 wide). A `fit="meet"` would let a tile keep its shape in any box.
- `api.act` caps one act at about 2.25 s (ACT_MAX with the class tempo), so a round-robin deal of 25-30 things by the hand (`carry`, one point a thing) runs about 75 ms a thing: correct and equal, but quick to follow. A "deal" move (or a longer cap for a many-point carry) would let a child watch one thing at a time.
- No wedge helper in r1 (as the Fraction Maker builder logged): this tool writes its own `sgWedge`/`sgParts`/`sgMid`.

## Runtime gap (logged, not frozen): `<Skin>` has no `meet` fit
`Skin` draws with `preserveAspectRatio="xMidYMid slice"` (or `none` with `fit="stretch"`), never `meet`. A figure (kind figure, a standing person) is a tall narrow
cut-out (made size about 72x240); the tool must give `<Skin>` a box of exactly that aspect, or the head/feet are cropped. No runtime change is needed: figures emit as
ordinary skins in `TOOL_IMAGES`. A `fit="meet"` would let a tool pass any box; wait for the next batched freeze.

## Runtime / check gaps, continued (M1.S2.T3.C12.2D1 Sort and Compare builder, 2026-10-23)
- Workaround in use: the word answers are `pad: "enter"` items with the tool's own one-tap `Key`s in a row under the picture (the brief's Like/Unlike buttons), so no `cardAnswer` and no two-tap drawer.
- `text-contrast` on a `pad: "enter"` question's "(panel open)" frame measured the 7/4 digits over the blue pizza: the text boxes and the open screenshot disagreed for a board centred on `box.w`. A board laid out at one fixed width (LAYOUT §3) passes. Lay pad-enter boards out at a fixed width, or the row could take the open frame's own geometry.

## Runtime gaps from the M1.S2.T4.C17.2D1 play test (2026-10-24; logged, not worked round in the tool)
- Under `keyOnly` (one sentence a screen, LAYOUT §1d) a hint REPLACES the question in the bubble, so `drawnInstruction` is empty while a hint shows. The play tester's spec expects the hint under the pinned instruction; `hint-pinned` asserts the keyOnly behaviour, so the tool cannot change it. Owner/runtime decision.
- Keyboard focus drops to BODY when a guide-step key unmounts (the one-key sequence swaps Cut, Check, Share). Runtime: hand the focus to the next live control.
- Free play: the header still shows the last phase's concept (no "Free play" title) and the disabled Answer key stays drawn; neither is the tool's to change.
- During an `api.act` (the deal) the runtime takes no tap, so a dial or picker press in free play is dropped silently; the tool cannot queue a press it never receives.

## Runtime gaps from the visual review + play test (M1.S2.T3.C12.2D1 Sort and Compare, 2026-10-24; logged, not fixed in the tool)
- A `pad: "enter"` question answered entirely by the tool's own one-tap keys still shows the corner Enter key bright (askMode "enter"); only `api.lock` makes it flat and quiet, and a lock also turns the Hint key off and blocks Enter. Needed: an item flag (e.g. `key: "quiet"`) for a working-area question that needs no Enter. The tool gives Enter a job meanwhile ("Tap one of the answer keys.").
- Summary page in hi/gu: the rows' line pitch is tight and the `learned` sub-line's matras brush the concept heading (the runtime's summary layout, not a tool's).
- Keyboard focus drops to BODY after a carry act, a miss and a win (`pointerBlur`), so a Tab-only child starts again from the top.
- Escape and the header's Hint key do not end the phase party.
- A double tap on the Next key lands its second tap on the new screen.
- Tap boxes under 110 are the runtime's standard keys (77 high): no change wanted.
- (Sort and Compare, re-review 2026-10-24) Still open: the corner Enter key on the one-tap answer-key questions cannot be drawn dim or neutral without `api.lock` (askMode "enter" is chosen by the runtime); the hi summary rows' pitch is the runtime's summary page.
