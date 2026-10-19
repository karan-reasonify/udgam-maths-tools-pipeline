# viewer: a local React app for output-preview/

Renders every ported `output-preview/<chapter>/<id>/<id>.tsx` the way the host actually runs it
(the same transpile + mount code as `lib/ship/hostsim.mjs`, from `lib/ship/hostTemplate.mjs` —
one source, never a second copy), with a sidebar of checks.

## Run it

From the class folder:

```
node cli.mjs view                # http://localhost:<viewerPort> (default 5175 + 2 x class)
node cli.mjs view --port 5555    # a different port
node cli.mjs view --watch        # rebuild the viewer's own UI as you edit viewer/src
```

The preview toolbar starts with **classroom** ticked (the schools' use: a teacher in the room; from runtime r34 the
lesson is action-driven in every mode, and a classroom only pages a long line piece by piece with the blinking arrow,
a tap on the speech bubble showing the next piece, a tap with nothing waiting skipping ahead; no score; the lesson is
silent and the sound effects stay on). Untick it to see a child alone. A tool ported on a runtime older than r22 ignores the tick box.
The default lives in `viewer/src/lib/useLiveTool.ts` (`classroom: true`).

The **header** carries three switches (`components/DeviceBar.tsx`; in the hub that is the tinted bar above the tabs):
**Teacher | Student** (`navigableDots` false | true: AI mode, where the phase dots only show progress, or user mode, where
they are controls; a whole-lesson mount is always Student), **EN | हिं | ગુ** (`lang`) and **Mobile 844x390 | Web 1366x768 |
Smartboard 1920x1080**. The device frame mounts the tool at that true size and scales the frame down to fit the stage (never up
past 1:1; the size and the scale show under it), so media queries and `100vh` behave as they will on that device.

The default port is `5175 + 2 x class` (for example 5183 for class 4 and 5187 for class 6), so every class has
its own and they can run side by side. `viewerPort` in `pipeline.config.json` overrides it, `--port` beats both.

Stop with ctrl+C. `--watch` only affects the viewer's own front end (`viewer/src/**`); it does not
watch `output-preview/` or `work/` — reload the browser page to pick up a new `port` or `check`.

## The header

Says which class this is, read from `pipeline.config.json` (`defaults`): publication, class, subject and
medium, e.g. "Udgam · Class <N> · Maths · English" (also the browser tab's title). Beside it: how many chapters
the pipeline knows, how many of their tools are ported, and the check totals of the whole class. Nothing is
typed per class or per chapter, so a copied class folder labels itself (see "A new class").

The check totals read like `node cli.mjs status`: a check counts as **pass / warn / fail** only while it is
fresh (the tool, its runtime and the mascot are still the ones it certified) or sealed. A check whose source
has changed since is **stale** (re-run `check`); a slot never checked is **unchecked**. The rail's dots use
the same reading (a ring is stale), so the header and the rail never disagree.

## The left rail

Every chapter the pipeline knows (`work/` or `output-preview/`), in chapter order. Each is headed
"Chapter 5 · Decimals" (the number from the chapter id, the title from line 1 of `work/<chapter>/mounts.md`,
written by `fetch`; the raw id is the hover text), then "5 of 11 ported" with that chapter's check totals,
then its ported tools. A chapter that is fetched but has nothing ported yet shows up too ("no tools ported
yet"). A chapter whose id names another class is prefixed with that class ("Class <N> · Chapter 9"), the sign
of a chapter fetched into the wrong class folder.

Once there is more than one chapter, a "chapter" dropdown appears above the list: pick one to narrow it, or
"all chapters" to see everything. It only filters what's listed; it never triggers a check.

## What the sidebar shows

- **Sidecar checks** — structural validation of the `.json` sidecar, done in the browser the moment
  it loads: required fields and types, ids matching the folder, phaseMap/toolQuestions/scoring
  agreeing with each other, the eleven `window.toolApi` verbs, `doneId`, the url's `/id/id.tsx`
  suffix, and the `.tsx` on disk matching the sidecar's own `build.tsxMd5`. Instant; no Chrome.
- **Pipeline** — the last real `node cli.mjs check` result and hostsim/publish status, read from
  `work/<chapter>/<id>/status.json`. Two buttons re-run the pipeline's own `check` (~90 s, headless
  Chrome, updates `status.json` exactly as the CLI does) and `hostsim` (a few seconds, against the
  current `output-preview/` pair, does not write anything).
- **Live** — diagnostics off the tool actually mounted in the Preview tab: `toolApi` verbs and
  alias found, `getState()`, the `finished` / `question_done` / `answer_checked` event log, console
  errors, and any network or storage call (the host contract forbids both). "Auto-play" drives the
  tool through the sidecar's own answer keys, the same way `hostsim` does headless.

## How the live preview works

The Preview tab mounts the raw `.tsx` inside a same-origin `srcdoc` iframe: three UMD scripts
(React, ReactDOM, Babel standalone, read straight from `node_modules` and served at `/vendor/*`),
then the exact `hostTranspile`/`hostBody` functions from `lib/ship/hostTemplate.mjs` (served at
`/api/host-template`), then a small probe that watches console/network/storage and the runtime's
own events without changing how the tool runs. No `sandbox` attribute, so the parent page can read
`window.toolApi` and the probe's logs directly — no postMessage protocol.

## Routes (server.mjs)

| route | what |
|---|---|
| `GET /api/meta` | the class (publication, class, subject, medium from `pipeline.config.json`), every chapter (number, title, slots, ported, check totals) and the class totals; `viewer/meta.mjs` |
| `GET /api/tools` | every tool in `output-preview/`, joined with its `work/.../status.json`, plus its `checkState` (pass / warn / fail / stale / unchecked) |
| `GET /api/tools/:chapterId/:id/tsx` | the raw `.tsx` (headers `x-md5`, `x-bytes`) |
| `GET /api/tools/:chapterId/:id/json` | the sidecar |
| `GET /api/tools/:chapterId/:id/status` | `status.json`, or `{}` |
| `POST /api/tools/:chapterId/:id/hostsim` | runs `lib/ship/hostsim.mjs` against the current pair |
| `POST /api/tools/:chapterId/:id/check` | runs `lib/build/preview.mjs` + `lib/check/check.mjs` against `work/<chapter>/<id>/tool.tsx`, exactly as `node cli.mjs check` does |
| `GET /vendor/{react,react-dom,babel}.js` | the UMD libraries, for the live preview iframe |
| `GET /api/host-template` | `HOST` from `lib/ship/hostTemplate.mjs`, for the live preview iframe |

No new dependencies: `react`, `react-dom`, `esbuild` and `@babel/standalone` are already in
the class folder's `package.json`; the client is bundled by `esbuild` (`jsx: "automatic"`), not by a separate
build tool.

## One page for every class (the hub)

`node viewhub.mjs` in the pipeline root (`viewer-hub/README.md`) shows every class from one URL: a Class, Chapter and Tool
dropdown in its header, and this viewer embedded below. Two small things in this viewer serve it, and both work on their own too:

- `?ch=<chapterId>&tool=<id>` opens that tool (`http://localhost:<viewerPort>/?ch=<chapterId>&tool=<slotId>`, the chapter and slot ids as the left list shows them).
- `?embed=1` (only inside an iframe) hides this page's title, totals and left list, which the hub's dropdowns replace, and talks to
  the hub by `postMessage`: it says `udgam-viewer:ready` once mounted, takes `udgam-viewer:select` `{ chapterId, id }` from its parent
  and reports `udgam-viewer:selected` when a tool is picked in here. Only the type and the two ids travel; ids are checked against
  `[A-Za-z0-9_.-]+` and only messages from the parent window are taken.

## A new class

The viewer is the same code in every class folder (`viewer/meta.mjs`, `server.mjs`, `src/`), so a new class
inherits it by being copied: copy the last class's folder **without** `work/`, `output-preview/`,
`.voice-cache/` and `node_modules/` (then `npm install`), and set `defaults.class` (and `textbooks`) in
`pipeline.config.json`. The header ("Udgam · Class 6 · Maths · English"), the port (5187) and each chapter's
number, title and counts then come from that config, the chapter ids and the folders, with nothing to edit
in `viewer/`; a chapter shows up in the rail as soon as `fetch` has made it. A publication or medium the
viewer has not met (a label map in `meta.mjs`) shows its id with a capital letter until a label is added
there.
