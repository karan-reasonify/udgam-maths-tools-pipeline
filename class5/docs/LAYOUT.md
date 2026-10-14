# The tool layout (final)

Every Udgam tool, in every class, looks and behaves like this. It was settled on the pilot tool,
`M1.S1.T2.C4.2D1` Place Value Builder (chapter 1), and it lives in `runtime/runtime.tsx`, so a tool
never draws any of it again. A tool draws **only the working area**. This page is the picture; the
build card (`BUILD_CARD.md`) is the procedure; `CHECKS.md` lists what `node cli.mjs check` proves.

## 1. The stage

One SVG, `viewBox 0 0 1600 900`, scaled to fit the screen. It never scrolls and nothing is drawn in the gutters.

```
   0 ┌────────────────────────────────────────────────────────────────────────────────────────┐
     │ Tool name • phase concept                                 (again) (sound) (restart)    │ header  0-80
  80 ├────────────────────────────────────────────────────────────────────────────────────────┤ gutter
  92 │ ┌ canvas ──────────────────────────────────────────────────────────────────────────────┐ │
     │ │ [ running count ]                                                What will it          │ │
 202 │ │ ┌ WORKING AREA  64,202  1086 x 528 ─────────────────────┐    read?                    │ │
     │ │ │                                                         │   [      slot       ]      │ │
     │ │ │   the maths itself: pieces the child drags and taps     │   ┌──────────────────┐     │ │
     │ │ │   (the ONLY thing a tool draws)                         │   │  1    2    3     │     │ │
     │ │ │                                                         │   │  4    5    6     │ pad │ │
     │ │ │                                                         │   │  7    8    9     │     │ │
 730 │ │ └─────────────────────────────────────────────────────────┘   │  ⌫    0    ↵     │     │ │
 746 │ └──(mascot)─────────────────────────────────────────────────────────────────────────────┘ │ gutter
 758 │  (mascot) ┌ bubble ─────────────────────────────┐   ▬▬▬▬   ▬▬▬▬   ▬▬▬▬   ▬▬▬▬           │ footer
     │   on its ◄│ the guide: every line, printed      │   Phase 1 of 4          Question 1 of 3 │ 758-900
 900 └───ground──┴─────────────────────────────────────┴───────────────────────────────────────┘
```

| zone | box (x, y, w, h) | owner | holds |
|---|---|---|---|
| header | 0, 0, 1600, 80 | runtime | tool name · a measured dot · the phase concept (truncated with an ellipsis before x 1336) · three round controls |
| canvas | 40, 92, 1520, 654 | runtime | one white card with a highlight along its top edge |
| runs | 64, 108, 330, 76 | tool | the running count, if the tool counts something (drawn by the tool's `Work` at y −94, inside `data-zone="runs"`) |
| **working area** | **64, 202, 1086, 528** | **tool** | **the maths**. Nothing above 202; the bottom row ends by 730 |
| slot | 1186, 250, 356, 92 | runtime | the question above it (at most 3 lines of about 15 characters), what the child typed, a caret |
| pad | 1170, 368, 388, 363 | runtime | 12 keys (1-9, rub out, 0, Enter) or the item's word choices, two across; a decimal tool (`pointKey`) has 13 on every question, as a number pad: 1 2 3 rub out / 4 5 6 / 7 8 9 beside a tall Enter / a wide 0 and the point. An item made on the working area (`pad: "enter"`) draws none of the digit or rub-out keys, only Enter, in its usual spot (a `pointKey` tool still draws its point key there too, flat and quiet, same as a `parts` question) |
| voice | 28, 704, 204, 194 | runtime | the mascot, standing at 28, 738, 204 x 160 on a ground line (below the working-area floor, so it never covers a card) |
| bubble | 254, 748, 656, 144 | runtime | the guide: every line of the lesson, printed (the lesson is silent, §8): two lines at 44, or three at 32; after a wrong act or answer the instruction stays pinned on top and the hint sits under it in a tinted band (r34, §5); the tail points at the mascot's face |
| bar | 930, 782, 630, 58 | runtime | one phase dot per phase (the current one filled a part per question), "Phase n of N" and "Question i of total" |

**Layers, bottom to top:** paper, header, the canvas card, runs, the working area, the slot and pad (or the board's
question bar and answer panel), the summary page, the footer (mascot, bubble, phase dots), **the party** (r39,
`data-zone="party"`, drawn for about 2.3 s when a phase completes, no pointer events, so nothing under it stops
working), then the your-turn ring. The start page (§1c) stands alone, before any of them.

The slot and pad are furniture: the same rectangle on every phase, from the first frame. There is no
sidebar and no score box. The last phase ends on the summary page (§5b), where Free play lives. There is
no Tap to start cover: the lesson is silent (§8).

## 1b. The board layout (runtime r27, opt-in: `board: true`)

**A wide keypad (runtime r26, written by `scaffold` beside `board: true` in every new tool: `bigPad: true`, `false` when the picture needs the width; the owner, 2026-10-14: "there is empty space left of the keypad, increase its size").** A tool whose picture is small (a bar of cards, a row of digits) leaves room beside the panel: with `bigPad: true` the drawer, its answer slot and its keypad are wider (drawer x 980 to 1536, 556 wide; slot and pad x 996, 524 wide; the keys grow with the pad box) and the working area, while the panel is open, is 900 wide instead of 1086 (so the picture must fit in x 64 to 964). Use it only when the picture fits there: `check`'s `board-fit` judges the narrower area for a tool that asks for it. Every other board tool keeps the standard 340-wide panel.

A tool opts in the way it opts in to `sideBySide`; every other tool keeps §1 exactly. The stage, header, canvas,
footer (mascot, bubble, phase bar) and summary page are the same. What changes is the card:

```
 92 ┌ canvas ───────────────────────────────────────────────────────────────────────────────┐
    │ [ runs  ]  ┌ question ───────────────────────────────────────────  [ Answer ] ┐        │ ask bar 104-192
    │ 64,110     └───────────────────────────────────────────────────────────────────┘        │
202 │ ┌ WORKING AREA 64,202  1472 x 528 (the whole card) ────────────────────────────────┐   │
    │ │  the picture at its widest; Cut / Shape / Trade / Lots of along its foot            │   │
730 │ └────────────────────────────────────────────────────────────────────────────────────┘   │
    └───────────────────────────────────────────────────────────────────────────────────────┘
    tap Answer: the area narrows to 1086 and the panel slides in from the right
 202 ┌ WORKING AREA 1086 x 528 ───────────────────────┐ ┌ panel 1164,202  372 x 528 ─────────┐
     │  the same picture, rearranged into the room    │ │  slot  1180,218  340 x 92           │
     │  that is left                                  │ │  pad   1180,324  340 x 390          │
 730 └────────────────────────────────────────────────┘ └─────────────────────────────────────┘
```

| zone | box (x, y, w, h) | holds |
|---|---|---|
| ask | 64, 104, 1472, 88 | the question (the bar starts at x 410 when the tool has a runs box) and the Answer key (264 x 72, at the bar's right end) |
| runs | 64, 110, 330, 76 | the running count, as in §1, level with the bar |
| work | 64, 202, 1472, 528 shut; 64, 202, 1086, 528 open | the maths. A board tool reads its room from `props.box` ({ w, h, open }), never from `api.W`; `box.w` eases between the two over 280 ms, so the picture rearranges as the panel arrives |
| drawer | 1164, 202, 372, 528 | the panel: a warm card with the slot (1180, 218, 340 x 92) and the pad (1180, 324, 340 x 390) in it, 28 from the card's right edge. It is not drawn at all while shut |
| bubble, bar, voice | as §1 | the bubble's line is drawn as the **hint pill** (same box, an accent edge); the phase dots and counters are untouched |

- **The question** is one line at prompt size, else up to two lines at label size, else up to two at micro; the type
  floor holds and Hindi and Gujarati fit the same box. During a teach line the bar is empty and the key quiet; in free
  play it reads "Free play".
- **The Answer key** is a toy key like the pad's. Shut: accent, "Answer". Open: quiet, "Close". Not asking (a teach
  line, a win, a traceback): flat and quiet, never faded. A question answered on the working area (`pad: "enter"`) has
  no panel: the key reads Enter and commits it, and it has no panel after a miss either (r24).
- **It blinks, and a line says so (r24, in EVERY board tool, not only `cardAnswer` ones).** The ring of the Next key (4 wide,
  hugging the key, `.c4-nextblink`; steady under reduced motion) rides the Answer key, and the built-in line "Tap the blinking
  Answer key." (UI.tapAnswer; a "type" line: neutral band, `getState().hintKind` "type") shows under the instruction, **only while
  the key is what the child must press**: a question is open (`stage` "ask"), its answer is typed on the keypad (or a choice is made
  in it), the keypad is shut, the pad is not locked and the picture is ready (`api.cardReady`). **Never** in a warm-up or a guide
  step (the key is flat and quiet there), with the keypad open (the line becomes "Type your answer, then press Enter." and comes
  back on Close), while the pad is locked, after the win, on a card question (the card blinks) or a choice question whose keys
  stand in the bar (they blink). A question answered on the working area (`pad: "enter"`): the Enter key in the bar stays steady
  until the tool says its answer is ready (`api.answerReady(true)`), then blinks; steady again after a miss or on the next
  question; a tool that never says so keeps a steady key. A tap on the disabled Answer key or on the bar itself during a guide step
  is a wrong act: the step's hint shows. A second press of the key within 300 ms of the one that opened the keypad (a double tap)
  is ignored; Close later closes it.
- **The panel opens** on a tap or Enter on the key, on any digit, point or rub-out typed on the keyboard (the digit
  lands in the box), when the pad is lent to the working area (`api.capture`), and for an agent's `answer()`. **It
  shuts** on a right answer, the next question, a phase change, the summary, the end of a capture, and on a miss: the
  traceback locks the pad, so the panel leaves for it (the correction gets the whole area) and **returns by itself
  with the child's answer still in the box** when the pad unlocks. `props.answerOpen: true` (the host's or a
  teacher's choice; `?answer=open` in the preview) keeps it open on every question.
- **What a board tool must do.** Draw from `box.w`, so that with the panel open nothing of the working area runs
  under it (`board-fit`) and with it shut the picture uses the room (a strip as long as the card allows, the cards
  beside it); keep every control 72 x 72 or more in both states; keep a traceback legible at the wider size, since
  that is the size it is played at.
- **Answering on the card (r52, opt-in: `cardAnswer: true`).** The question bar's right end holds no Answer key on a card question: the card the question asks for (Fraction or Decimal) BLINKS (a ring 4 to 5 wide round it), a tap on it opens the keypad panel, which holds the keys and a Close key at its top (no answer box of its own), and the digits fill the card's own boxes. Yes / No questions put two blinking keys (150 x 72) in the bar's right end, in the Answer key's place; any other question keeps a blinking Answer key. A line under the instruction says where to tap. See `PATTERNS.md` section 9e.
- **The Next key (r48, opt-in: `nextKey: true`).** Nothing moves on by itself: once a right answer's celebration is over a **Next** key (**Next phase** after a phase's last question; the last phase's says **Summary** and opens the summary page) takes the Answer key's place at the right end of the question bar (the classic layout: the answer slot's place), in the tool's Enter colour, 264 x 72, and BLINKS (a ring round it, 4 wide, hugging the key; steady under reduced motion) until it is pressed. See `PATTERNS.md` section 9d.
- **Object skins.** A tool may show a generated picture of the object it shares out (a chocolate bar, a cake) through
  the runtime's `<Skin name .../>` (docs/IMAGES.md). The picture is only the object's look: the cuts, the counts, the
  shading and every label are drawn by the tool in code, so the maths never depends on pixels; shaded pieces keep
  the blue or green tint over the skin; a cutting board or other furniture is drawn in code, not generated.
  Nothing else raster is allowed in the working area (`no-raster`); `<image>` is never written in tool.tsx.

## 1c. The start page (runtime r28, opt-in: `StartArt` and/or `START_HOOK`)

The first thing a child sees in user mode, drawn over the whole stage before anything else (the header, the card and
the footer are not drawn until Start). No lesson runs until Start, and Start brings the first line onto the bubble at
once (the lesson is silent, §8). AI mode skips it (the teacher agent's first acting verb starts the
lesson); `props.start: false` skips it for a host that does not want it. Play again never shows it again; the header's
reset key does (r32): in a mount that shows the start page it reads "Back to the start" and brings the page back with a
clean slate (the mount's first phase, nothing played, `finished` re-armed), and the lesson waits for Start again. A tool
without a start page, AI mode and the agent's `toolApi.reset()` keep the phase restart.

```
  ┌ card 40,40  1520 x 820 ─────────────────────────────────────────────────────────────────┐
  │                        Tool Name             (display 72, bold, deep accent)             │ title  y 150
  │                              ▬▬▬▬            (accent bar 120 x 8)                          │
  │   ┌ StartArt  200,205  1200 x 340: the tool draws the object the lesson is about ─┐       │
  │   └────────────────────────────────────────────────────────────────────────────────┘       │
  │              one question to wonder at (START_HOOK, speech 44, two lines)                   │ hook   y 636
  │  [mascot]               [ ▶  Start ]   (420 x 112, the accent key)                          │ y 724
  └──────────────────────────────────────────────────────────────────────────────────────────┘
```

- **StartArt** is a component `StartArt({ box, C, lang, tx })` drawn in the 1200 x 340 box (origin top-left): the object
  the whole tool is about (a chocolate bar, a clock), furnished, still, at most one entrance animation; no digit that
  is a question's answer, no sentence (labels of at most 4 words), nothing under the 28 type floor, no emoji.
- **START_HOOK** is one question or invitation to wonder at (at most about 70 characters, two lines at speech size; three
  at label size if a translation needs them), a Spoken value with a `TR` entry in Hindi and Gujarati. It is printed, not
  spoken, and never states an answer.
- The page is the tool's face: the same card, rule and shadow as the canvas, the mascot on its ground line at the left,
  the same toy Start key as the pad's Enter, in the tool's THEME Enter colours: a tool with skins wears the theme its image agent chose from the object, a tool with none the runtime's standard `DEFAULT_THEME` (berry, never the chrome's grey), so every start page looks alike. `check` proves it (`start-page`: the Start key wears the theme's Enter gradient, saturated and not red).

## 2. Header

Tool name (label size, weight 600), then a dot measured from the name, then the phase concept in the
accent colour. On the right, three round controls, **the same in every tool and in both modes**:

| control | centre | does |
|---|---|---|
| Hint (lightbulb; `data-control="again"`) | 1388, 40 | "Hint" (r35), fully manual: while a guide step waits it shows that step's hint; at an open question the first press shows the first rung (the item's miss), each further press the stronger one (ladder[0], then ladder[1], never beyond); with nothing to hint (a win, a closing line, the summary, free play, the pad locked) it shows the lines again |
| sound (a blue speaker with orange waves; muted, a grey cross where the waves were) | 1460, 40 | switches the sound effects off and on (§8); there is no voice |
| restart (a green refresh arrow) | 1532, 40 | starts this phase again and re-arms `finished` ("Start this phase again"); in a mount that shows a start page (§1c, r32) it is "Back to the start": the start page again, a clean slate, the lesson waiting for Start. `toolApi.reset()` is always the phase restart |

Each is 56 across with a 72-unit finger box; 72 apart, so the boxes tile and never overlap.

**The look (head of 2026-10-13, the owner's picture):** each is a cream glossy disc on a tan bevelled rim with a soft underside and a highlight, carrying its own coloured icon: a **yellow lightbulb** (brown outline, grey screw base, five rays), a **blue speaker with orange sound waves**, a **green circular refresh arrow**. Pure SVG drawn by the runtime's `HeaderControl` (the colours are fixed art, never the tool's; `RoundControl` is unchanged for a tool that spreads it). Muted shows a grey cross, never red (the header is on screen after a miss). The data-control ids, the aria labels, the 56-unit face, the 72-unit finger box and the press-down are the same as before. A chapter has this look only when its pinned runtime is r55 or later of class 5, r23 or later of class 4 (`grep -c HeaderControl runtime/frozen/<rN>/runtime.tsx`).

## 3. The working area (what a tool draws)

- **The maths is the picture.** Countable things in the content colours, big numerals (`T.xl` 56 or
  `T.display` 72). One idea per screen: this phase's object and nothing else. No decoration, background
  art, emoji or raster (the one exception: a board tool's object skin, §1b). Objects fill at most about 70 % of the area.
- **Labels, not sentences.** At most 4 words per text on the area; instructions are printed in the
  bubble, never written here.
- **Pieces the child moves.** The child drags, taps or slides the object itself, never picks from a shelf.
  A piece follows the finger, lifts while dragged, snaps with `api.sfx.tick()`, and is playable before it
  is answerable. A tap on a piece means "put it where it belongs".
- **One invite.** `<Invite/>` pulses on the one thing to touch; everything else is still.
- **Winning is the maths moving; a miss is the traceback.** On a miss the tool locks the pad, redraws the
  mathematics in steps **ending on the whole right answer**, then unlocks. Nothing is marked (no red, no cross, no "wrong"), nothing resets,
  and the child's answer stays in the slot.
- **Colour.** A place or a counter keeps one colour across the book. Coloured numerals and words use a
  deeper ink, `shade(colour, 0.25)`, so they read at 4.5:1 on white and on the panel; the counters keep
  the true colour. Zero digits holding a place are grey `#767676`.
- **A pile of tiles shows one label** (the top tile), so no value peeks out from underneath.
- **The floor (r42).** The runtime puts a transparent rect, `data-role="work-floor"`, under Work as the first child of
  `data-zone="work"`, the size of the working box: a tap on the empty board around the drawing lands in the zone, so in a
  guide step it is a wrong act and shows the step's hint. Nothing to write; never draw a full-box rect with an
  `onClick` of your own over it (it would swallow those taps).

## 4. The answer column

- **Slot:** the item's `ask` above it (prompt size), the typed value inside (it drops a size before it
  would spill), a blinking caret while it waits.
- **Two-part answer** (`parts`, from ch 5: quotient and remainder; later km and m, h and min, ₹ and
  paise): the slot splits into one white box a part, side by side (16 apart, same height), each named at
  its top-left in quiet ink at 28 (at most 10 characters: "quotient", "remainder", "each bowl") and
  carrying its unit after the number at 28 ("mL"). The caret's box has the accent edge. Digits go to that
  box; Enter moves on, and on the last box answers once every box is filled; a tap on a box moves the
  caret; rub out on an empty box steps back. After a miss both numbers stay, the caret goes to the first
  box, and a digit starts only the box it is typed into afresh. The pad is unchanged.
- **Fraction answer** (from ch 7): `parts: SLOT_FRACTION` draws the fraction stacked in the slot's one
  white box, the numerator cell (132 x 38) over an ink bar over the denominator cell, digits at 32;
  `parts: SLOT_MIXED` adds a whole-number cell (110 x 84, digits at 44) on the left. Each cell's finger box
  is 72 tall and they tile at the bar (the top one reaches up beside the question, the lower one down to
  the pad). In a mixed number any cell may stay empty (a whole number alone, a fraction alone, or both),
  so the slot never tells the child which kind the answer is: Enter on a filled cell moves on, Enter on
  an empty cell (or the last) answers once the typing is a whole answer, a fraction missing one of its
  numbers never answers (the caret goes to the missing one). The ask above the slot never prints a
  slash fraction ("3/4"): the fraction in play is drawn stacked on the working area.
- **Side by side (r26).** A tool with `sideBySide: true` draws the fraction answer in a row instead of stacked:
  one white slot box, the cells at full height (76 tall, rx 10, digits at 44, dropping to 32 and 28 for a long
  number) with a drawn slash between the numerator and the denominator: `[ 3 ] / [ 10 ]`; a mixed number puts the
  whole cell first with a 12 gap: `[ 1 ] [ 2 ] / [ 3 ]`. A decimal answer (`parts: SLOT_DECIMAL`) is always a row,
  `[ 2 ] . [ 9 ]`, with the point drawn at the baseline (a filled dot, r 6.5) so no language touches it. The cells
  tile the slot's width with 40 for each slash or point and 12 for a plain gap; each cell's finger box is the slot's
  full height (92, over 72) and the boxes split halfway through each gap, so they never overlap. Same `part-N` ids,
  caret and typing as the stack. The default stays stacked: a tool opts in. The ask above never prints "3/4".
- **Pad:** keys are toy keys: a solid edge behind, a gradient face with a white gloss that sinks while
  held. Enter is the accent key. A key that cannot be used **this question but could another** (locked
  during a traceback, the point key off on a `parts` question) is drawn **flat and quiet** (no edge, no
  gloss, dim ink), never faded with opacity — it stays in place so the pad's shape never changes mid-tool.
  Items with `choices` show word keys, two across, in place of the digit pad — not disabled, replaced.
  Items made on the working area (`pad: "enter"`) draw **no digit or rub-out keys at all**, quiet or
  otherwise: only Enter, in its usual spot, since the child never types a number for this item (the keypad
  is drawn only where a number is actually typed; the `pad-shape` check proves it on every tool). While a tool holds the pad (`api.capture`, a cell
  the child tapped on the working area), the digits go to that cell, the slot's caret is off, and the
  tool draws the typed number and its own caret in the cell.
- The tool moves itself to the next phase after a phase's closing line (§5b), so the host's `onNext`
  "Next" key is not drawn.

## 5. The footer

- **Mascot** (**Kiko**: `kiko.svg` at the pipeline root, its name plate and white backdrop taken out, rendered to a 229 x 420 WebP of about 25 KB and carried inside the tool, so the
  preview, staging and production paint the same bytes; nothing is fetched). It stands on a ground line (tall and narrow: about 87 x 160 in its 204 x 160 box)
  and **does not talk** (the lesson is silent): it **cheers** when an answer is right (r54: its cheering picture and one jump for 0.9 s; a hop before r54), for the party's 2.3 s (r54: three jumps, sparkles round it) and
  **nods** once after a miss (`c4-cheer1`, `c4-cheer`, `c4-nod`, and `c4-hop` before r54; all still under reduced motion), and is still otherwise. If its
  picture ever fails to decode, a drawn dot stands in. It is drawn straight from the inline WebP, as the
  NCERT tools do; only the `<image>`'s error or a probe through `window.Image` drops it (never the bare
  name `Image`: the host declares a lucide icon of that name in the tool's scope).
  **The cheering pose (r54):** a second picture, `MASCOT_CHEER` (about 21 KB), made from the same SVG with the arms raised and the eyes
  two happy arcs, cut to the same box as the standing picture so the swap never moves Kiko. It takes the place of the standing picture on the
  same `<image data-role="mascot" data-pose="cheer">` while the party plays and for 0.9 s after any other right answer; if it fails to decode
  the standing picture stays. A PNG mascot has none (`MASCOT_CHEER` is empty and nothing changes).
  **The thinking pose (r24, the owner: "small change in kiko svg mascot whenever a que comes to solve ... expression of thinking"):**
  a third picture, `MASCOT_THINK` (about 24 KB), made from the same SVG layers by `node cli.mjs mascot` and cut to the same box
  (the three swap without moving Kiko): the viewer's left hand comes up to the chin, the head tilts a little and the eyes glance up and
  aside. While a question waits (`stage` "ask") and the child has not yet acted on it (no tap, no key, no Hint key, nothing typed) the
  same `<image data-role="mascot">` shows it, with `data-pose="think"`, and a **thought puff** stands beside the head
  (`data-role="think-puff"`, plain vector: two small circles rising to a cloud, fill #FFF4E0, outline #C9BCA6, with three dots that
  light one after another; stage x 178 to 225, y 743 to 790, inside the mascot's 204 x 160 box, 29 units short of the bubble). The first
  act puts the standing picture and the puff away; a miss brings the thinking pose back (after the nod, and the traceback when
  the pad was locked); the cheer overrides it; under reduced motion it is shown still (the dots steady). A thinking picture that does
  not decode leaves the standing one. **The Hint key** pops a small yellow bulb (`data-role="hint-bulb"`, the header's bulb, drawn
  small) where the puff stands for about 1 s. Nothing is cut off or overlapped: both stay inside the voice zone.
- **Bubble: the guide.** The line of the moment, printed, numbers as words. Every instruction and every hint is
  ONE page (one sentence that fits; r35), so nothing pages by a timer. After a wrong act or answer the instruction
  stays **pinned** on top (`data-role="instruction"`) and the **hint** sits under it in a tinted band with an accent
  bar (`data-role="hint"`, r34), in the biggest layout that fits the 144-tall bubble: instruction 32 + hint 32 (1 + 2
  lines or 2 + 1), then the same at 28, then a tight 28 (2 + 2, no band); about 35 characters a line at 32, 40 at 28.
  When none fits, the hint is not drawn at all (`hint-fit` fails it). The hint stays unchanged until the child acts
  again; the right act, a right answer, the next question or phase clears it.
  The layouts, in order: 32 + 32 (1 + 2, 2 + 1, 1 + 1 lines), then the same at 28, then a tight 28 (2 + 2, no band).
  **Hindi and Gujarati (r43; r41 and r42 began it):** their matras rise about 8 units above the first line's top and
  their tails hang below the line, so their lines take a taller pitch, **1.45 em** (46 at 32, 41 at 28), where English
  keeps size + 6; the gap between the instruction and the band is 4 (English 6), the band's padding 4 (English 8), the
  hint's baseline sits 3 lower in its band, and the block's top is **y0 = max(centred, bubble top + 12)** (`topOf` 12;
  English 0, so English is unchanged). A layout counts only when its block plus those 12 fits the bubble with 6 to
  spare (`need = H + topOf <= 138`), and there is **no tight layout in Hindi or Gujarati**. In practice only a pair of
  **one instruction line and one hint line** fits (112 at 32, 102 at 28; one line and two need 158 at 32 and 143 at 28):
  any longer pair draws the hint alone (no band; the question stays in the question bar), and that pair is the tool's
  to shorten in TR, so each of its lines takes one bubble line (about 35 characters at 32).
  `hint-lines-clear` reads the INK on a screenshot of every phase's wrong answer and wrong step, in every language:
  two lines never touch (2 clear units at least), no line touches the bubble's outline (2 units), 6 units to spare in
  all. A Hindi or Gujarati pair that runs to three lines is the usual failure: shorten the TR line so it takes two.
  **The built-in line** (r41: "Type your answer, then press Enter." on a typed question, "Choose your answer." on a
  choice question, `UI.typeIt` / `UI.pickIt`) is a note, not a correction: it sits in the same place in a NEUTRAL
  band (the panel colour lifted toward white) with a grey bar and ink text, never the accent band and bar a hint
  wears (`choice-answer-line`).
- **Phase dots:** one pill per phase in the 630-unit bar. The current one **fills a part per question as
  each question starts**: question 1 of 3 a third (its teach lines count as question 1), question 2 two
  thirds, the last question full accent; the fill slides 480 ms (none under reduced motion). Earlier
  phases are full accent (finished), also when a later phase is mounted on its own, so the bar reads
  as one fill from left to right; later
  phases are the panel colour. Under them: "Phase n of N" (left) and "Question i of total" (right), in one weight (r24: in Hindi
  and Gujarati the first was bold and the second regular).

## 5b. The summary page (as the NCERT Class 4 tools)

Every mount walks phase to phase, as the NCERT tools do (a phase 2 mount plays 2, 3, 4). **At the right answer of a
phase's last question** (r40; r39 waited for the phase end, which a long `winMs` delayed by seconds) the runtime
celebrates: a pop (+220 ms) and the chime (+420 ms), the mascot cheers (r54; a hop before), and **the party** (`data-zone="party"`,
`getState().party`: confetti, streamers and a party popper from the mascot, in the tool's pink and butter with a mint
and an orange, 2.3 s, with gold and orange sparkles twinkling round the cheering mascot (r54), no text, no pointer events, never past the stage's edge, none under reduced motion); the last
phase's party is bigger, from both sides, over the win picture, and the summary opens `winMs` later. After the
celebration the bubble shows the closing line and the next phase starts by itself: **1.4 s after the line, and never
before the party has had its time** (at least 2.45 s from its start). There is **no free play between phases** (built as r38, dropped on the owner's word): free play
is the summary page's only.

**The poppers (r41).** The party bursts from a popper cone at the mascot's side (origin about x 186, y 772, aimed up
and to the right); the last phase adds a second at the right, above the phase pills (about x 1500, y 734, aimed up and
to the left). Neither cone stands on the bubble (x 254 to 910, y 748 to 892) or the phase pills (x 930 to 1560, y 782
to 800); the confetti flies over everything for its 2.3 s, with no pointer events. A phase dot, a restart or a skip
ends the party at once (`phase-party`: the phase-2 dot pressed while it is on, gone within 300 ms). From r24 that includes the
cheering picture and its jumps (a classroom teacher's tap, the skip, ends the party, the cheer and the jumps at once, and a phase dot
pressed during the 0.9 s cheer after an ordinary right answer clears it: Kiko is standing in the next phase).

Phases before the last send no `finished`. The last phase ends on the summary page. The page covers the canvas (the
working area, slot and pad are hidden under it, not unmounted):

- "Well done!" (speech size), then **one row per phase**: a dot (filled if the phase was played in
  this mount), the concept name (label, bold) and the phase's `learned` line ("You learned: ...", micro,
  at most 72 characters), and at the right a **small drawing of the child's own last right answer**
  (the tool's `Thumb`, 236 wide) where that phase was played here.
- Three stars on first-try accuracy and "Right first time n / m" (hidden when `showScore` is false).
- **Free play** (accent key, if the tool has one) and **Play again** (quiet key), 300 x 96 each.
- **The bubble says ONE line (r44, the owner: "make it simple"):** `UI.summaryLine`, "Here is the summary of what you
  have learned." (hi "यह रहा सारांश: तुमने क्या सीखा।", gu "આ રહ્યો સારાંશ: તમે શું શીખ્યા."), two bubble lines, and it does not
  change by itself. No row is read out and **no row is ringed or blinks** (`getState().summaryRow` stays -1): the rows'
  "You learned" lines are on the page to read. The last phase's closing line is not read before the page and the
  tool's `FINISH_LINE` is not shown. **`finished` is sent once, 5 s after the page opens**, and never if Free play or
  Play again is tapped first. Its score covers every phase played in this mount. Play again restarts the mount's first
  phase and re-arms it. (Before r44 the bubble read the closing line, `FINISH_LINE` and each row's line with that row
  ringed.)
- **Free play** is the tool's own no-target mode (the plan's `writeup.freePlay`): every control
  unlocked, nothing to get right; restart leaves it. It opens from the summary page only.
- A whole lesson (no `phase`) is the same walk from phase 1.

## 6. User mode and AI mode (the NCERT Class 4 contract)

| | user mode | AI mode |
|---|---|---|
| when | the host sends `navigableDots: true`, or sends no `phase` at all | the host sends `phase` without `navigableDots` |
| phase dots | real controls: tap (or Enter) jumps to that phase; finger box = the dot's full pitch x 72, so boxes tile; `aria-label "Step k of N"`, `aria-current="step"` | a picture of progress: `role="img"`, not focusable |
| who drives | the child | the teacher agent, through `window.toolApi` (also `window[TOOL_ID]`) |
| header, pad, working area | the same | the same |
| after a phase (r39) | the party, the closing line, then the next phase by itself (once the party has had its time) | the same |
| sound | a silent lesson (printed bubble), sound effects on | the same; the host or agent switches the effects off (`muted` prop, `setParam("muted", true)`) |

`window.toolApi` has the eleven NCERT verbs: `getState, gotoStep, say, answer, check, reset, next, prev,
highlight, setParam, playDemo`. `getState()` never shows an answer before the child has given it. In AI
mode `gotoStep`, `next` and `prev` stay inside the phase being shown (the host's phase, then each phase
the tool walks on to); `next()` after a phase's last right answer does nothing, since the tool moves on. `highlight(zone)` rings `header | runs | work |
slot | pad | voice | bubble | bar` for about 2.4 s. Events leave three ways (window `CustomEvent`,
`parent.postMessage` when framed, and the callbacks): `answer_checked`, `question_done`, and `finished`
exactly once per mount, from the summary page (restart or Play again re-arms it).

## 7. Controls: how they feel

- Every press and drag goes through **@use-gesture/react** (bundled into the tool at port, because the
  host strips imports). A control sinks while held and fires once on release; a finger that slides more
  than 12 px cancels the press. A drag that moves under 8 units counts as a tap.
- The pressed look is state, not CSS `:active`, so it shows on tablets. Hover highlights appear only on
  devices that hover.
- **Keyboard:** digits, Enter, Backspace (rub out) and Escape (clear) work anywhere; Enter or Space on a
  focused control presses it; pieces and tap targets are focusable too. The focus ring shows only for
  the keyboard (`:focus-visible`).
- **Finger boxes:** every live control is at least 72 x 72 stage units (about 46 px on a 1024-wide tablet)
  and no two overlap.

## 8. Sound

- **The lesson is silent** (runtime r30, every tool on a silent runtime; a voiced runtime keeps its voice). Nothing is spoken, no
  recorded clip plays, and there is no "Tap to start" cover. Every line is printed on the bubble, numbers as words,
  and paced by its reading time: max(2.4 s, 68 ms per character). A line has no dash and at most 20 words and 110
  characters a piece.
- **The bubble is the guide; the lesson is action-driven** (r34). Nothing moves on unless the child acts (a tap, a
  key, an answer). A phase with guide steps (`steps`, `PATTERNS.md` §9b) shows one instruction at a time and moves on
  only when the child does the act it names (a tap on Cut, a shaded part), never on a timer; the last act opens the
  question. A wrong act shows the step's hint under the pinned instruction, a wrong answer its ladder's next rung;
  the hint stays until the child acts again. A right answer's next question, a phase's next phase and the summary's
  rows follow by themselves after a short celebration, in every mode. The header's **Hint** key (r35) shows the
  hint on demand (§2).
- **Sound effects** are Web Audio, no files, on in every mode, a classroom included: correct, wrong (soft, never
  harsh), win at a phase end, cheer at the end of the last phase, a tick when a piece snaps, and cut, settle and
  trade where the tool's picture moves (`api.sfx`).
- **The sound button** (§2) switches the effects off and on (the `muted` prop, `setParam("muted")`); off means no
  sound at all. There is no voice, so there is no place to keep.

## 8v. Voice and sound (voiced runtimes: no `const SILENT_VOICE = true`, Class 4's frozen r1-r21)

_A chapter whose pinned runtime still speaks has this instead of §8's silent lesson. Its header's first key is `again` (a speech bubble: says the current line again from its start; no Hint key, no start page, no board). After a phase's last question the voice says its closing line and 1.4 s later the next phase starts; the summary page speaks the closing line, the whole-tool line and each row's "You learned" line with that row ringed._

- The device's own speech engine, **synced the NCERT way**: a line advances only when it has been said.
  **Muting stops the audio at once but keeps the child's place**: the line stays in the bubble for the
  time it had left and nothing skips. **Unmuting speaks the rest of that same line from the start of the
  word it had reached.**
- Indian English first, then UK, then any English; never a voice of another language than the one in
  use (§13: English is the default and, up to now, the only one any tool has shipped in). Voices that
  load late are waited for, and speech the browser blocks until the first tap starts on that tap.
- **Sound is always on** unless the child or the host mutes it. A browser that refuses speech until
  the first tap in the page (Chrome's autoplay rule, for example right after a reload) gets a one-tap
  **"Tap to start"** cover: the lesson waits on its first line, and the tap speaks that line from its
  start. Where speech is allowed, the cover never appears.
- With no voice (muted, no English voice, headless) the bubble paces itself at max(2.4 s, 68 ms per
  character). Spoken lines have no dashes and at most 20 words and 110 characters per piece.
- Sounds are Web Audio, no files: correct, wrong (soft, never harsh), win, and a tick when a piece snaps.
  Muted means silent: no speech and no sound at all.

## 9. Type, colour, depth

- Type scale `T`: display 72 · xl 56 · speech 44 · prompt 40 · label 32 · micro 28 (the floor). Weight
  600-700 for quantities and labels, 500 for prompts. Poppins, then the system sans.
- Content colours (Okabe-Ito, countable things only): hundred `#0072B2`, ten `#E69F00`, one `#009E73`,
  bead `#CC79A7`, pointer `#D55E00`, line `#2B2B2B`. Chrome comes from the plan: paper, panel, ink, rule,
  dim, accent. Chrome never borrows a content colour.
- Text contrast at least 4.5:1 (3:1 for large text), measured on the real pixels. Opacity never carries
  hierarchy. One consistent soft shadow; toy-like rounded pieces with a top-light gradient.

## 10. Motion

Motion only with meaning: a carry travelling, a column opening, a piece snapping. Timelines use
`useTimeline()` and become near-instant under reduced motion. Nothing loops forever except the one
invite and the caret, and neither runs under reduced motion.

## 11. What `tool.tsx` writes, and what it never writes

| a tool writes | the runtime already has (never re-draw it) |
|---|---|
| `PHASES` (scaffolded from the plan: concepts verbatim, teach lines, ladders, closings, `learned`, `traceback`, items with the plan's `qid`; `steps` where a teach describes acts) | header and its three controls, canvas, slot, pad, bubble, mascot, phase dots |
| `FREE_LINE`, the free-play mode (`stage === "free"`), `Thumb` (the summary drawing) | the summary page, Free play and Play again |
| `MODEL`, `Work` (the working area, plus the running count in `data-zone="runs"`; `api.did` for each guide step, `api.sfx.cut/settle/trade` where the picture moves) | user / AI mode, `window.toolApi`, the events, `finished` |
| `judge`, `oracle` (a second route to every answer), `nearMiss`, `answerForms` | the printed, paced bubble, guide steps, sound effects, scoring and stars |
| `agentKey`, `answer` / `check` (how the agent acts on the working area), `solve` (dev driver) | keyboard path, focus ring, pressed states, finger boxes |
| the traceback for a miss | reduced motion, the dev driver, restart |

## 12. The reference tool

The pilot tool is Class 4 chapter 1's `M1.S1.T2.C4.2D1` Place Value Builder (it lives in Class 4's work folder, and a session reads it only on that chapter: every pattern a builder needs from it is in `PATTERNS.md`): a place-value chart where the child drops one
more onto 9999 and watches every column carry (phase 1), builds big numbers from tiles (phase 2), names
the place that opens (phase 3), and taps the Indian commas into a number (phase 4). Look there for how a
piece is dragged (`useDrag` + `control` + `drag.bind` + `drag.keys`), how a tap target is made (`Hit`),
how a traceback runs, how the agent drops a waiting token (`HOOK.check`), and how numerals take a
deeper ink.

## 13. The three languages (en / hi / gu)

The host sets `props.lang` exactly like `operatorMode`; a tool renders no language switcher of its
own. English is the default (`lang` unset or unrecognised). The viewer (`node cli.mjs view`) has
an EN | हिं | ગુ control in its preview toolbar; on a tool whose runtime has no `lang` contract (before
r10) or no `TR` table, it is a harmless no-op and the tool stays English.

- **The runtime's own chrome** (header control labels, pad key names, the summary page's headings and
  buttons, the phase/question counters, "Hint") comes from `UI_STRINGS[lang]` — a tool never
  writes any of it, same as every other chrome piece in this page.
- **A tool's own text** stays English (what the checks read) and gets a `TR = { hi: {...}, gu: {...} }`
  table keyed by the English line (r13+); the runtime looks up the header, bubble, slot question and
  word keys through it, and `Work` gets `lang` and `tx` for the words it draws (`PATTERNS.md` §11).
- **Numbers are words** in the bubble, in every language: a translation keeps its digits and the
  runtime spells them in Hindi or Gujarati (Indian system: हज़ार / લાખ …).
- **No voice in any language** (r30): a Hindi or Gujarati line is printed from `TR`, never spoken and
  never baked. Once a tool's `TR` has begun, `check` (`tr-coverage`) asks for an entry in both languages
  for every line the tool prints.
- **Fit the longest language.** Hindi and Gujarati routinely run longer than the English they replace;
  a tool that ships in more than English checks its own text against the same slot/pad/bubble budgets
  this page sets for English (§1's box sizes do not change).
- This first pass of `UI_STRINGS` is a working draft translated for the runtime chrome only; it wants a
  native-speaker pass before any chapter actually ships in Hindi or Gujarati, the same way a maths
  reviewer reads English wording today (`docs/PATTERNS.md` §11, `docs/BUILD_CARD.md` §7 2026-09-23).

## 13b. Classroom mode (runtime r22+; action-driven from r34)

The host sets `props.classroom: true`, exactly like `lang`; a tool draws and writes nothing for it. A teacher
is in the room; a child performs the tool at the board while the class helps. From r34 the lesson is
action-driven in every mode, so a classroom **holds nothing for a "next" tap** any more.

- **The bubble is a control.** Nothing is added to the header, the working area, the slot or the pad. The bubble
  (§1, 254,748,656x144) becomes one control, `data-control="bubble"`: a tap, Enter or Space on it, or ArrowRight or
  PageDown anywhere on the page (a presentation clicker); Enter on the bubble keeps the focus there. With no
  classroom neither the control nor the cue exists.
- **What it is for: long lines and the teacher's skip.** A LONG line (several bubble pieces, such as a teach run)
  pages piece by piece: each piece after the first waits for a tap, with the cue on; the last piece is read for
  its reading time and a line's END never waits. A tap when nothing is parked is the teacher's SKIP: during a
  celebration it brings the next question at once, during a closing line the next phase; no cue is drawn for it.
- **The cue** is a big near-black arrow (44 wide, 60 tall, white edge, centred 30 from the bubble's right edge,
  right of the longest line) that blinks hard (0.8 s), seen from the last bench. It shows only while a piece is
  parked (`getState().held`); the bubble and its words stay steady; it stands still under reduced motion.
- **What does not wait** (as in every mode): a guide step waits for the child's act at the board; a wrong act or
  answer shows its hint at once under the pinned instruction; a right answer's next question follows its short
  celebration; a phase's closing line is followed by the next phase; the summary page says its one line (r44; a tap on
  the bubble there changes nothing); `finished` goes once, 5 s after the summary opens. When a question opens, a ring (the `highlight` ring) shows the
  working area for 2.4 s, "your turn". The pad and the working area are never held. Gone with r34: the holds on a
  right answer, on a miss's hint, on a closing line and on the summary's rows, and the "exploring" free play between
  two phases (free play is the summary page's only; the phase party, r39, plays in a classroom too).
- **Sound.** The sound effects are on, as in every mode; the header's sound button switches them. The summary does
  not show the stars or "Right first time" (`finished` still carries them).
- **AI mode.** `toolApi.next()` takes a parked piece first, then the teacher's skip.
- **Fit.** The arrow starts 582 from the bubble's left edge; an English 24-character line at size 44 ends
  about 30 + 480 from it (`check` samples every tap and fails an arrow that touches a line). Hindi and Gujarati
  lines wrap by the same character count but may be wider: look at the arrow on the `--lang hi` and `--lang gu`
  classroom screens (`play({ classroom: true, lang })`).
