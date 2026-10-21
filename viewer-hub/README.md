# viewer-hub: one page for the tools of every class

```
node viewhub.mjs              # http://localhost:5170
node viewhub.mjs --port 5555  # another port
node viewhub.mjs --open       # also opens the browser
node viewhub.mjs --list       # prints the classes it finds (JSON) and exits: no server
```

Run it from the pipeline root (next to `classctl.mjs`). The header has a **Class** dropdown, a **Chapter** dropdown, ←/→ for the
previous and next tool, Refresh (after a `check` or `port`), the class's totals and check counts, and a link to that class's own
viewer. On the **left** is the tool list (a panel with a toggle at the top left, the same as the checks panel on the right; open
or closed is remembered): the tools of the chosen chapter, or of every chapter under their headings, each with its check state
(a filled dot = pass / warn / fail, a ring = stale or unchecked). Beside it is that class's own full viewer: Preview, Source and
Sidecar, and on the right the checks, the Pipeline tab with Re-run check, and Live. The page remembers your last class in this
browser, and a link like `http://localhost:5170/#/5/indiannica_eng_maths5_ch5/M1.S1.T2.C4.2D1` opens that tool.

**Look:** the hub is always light, whatever the system theme (the class viewer below has no dark mode, so a dark bar over it
clashed and hid the buttons). The header and both side panels are a slightly darker slate tint than the white content, the
Previous / Tool 2 of 5 / Next group is outlined in the accent colour, and the selected tool is a white card with a blue edge.
Labels, buttons, chapter headings and tool names in the header and the left panel are semi-bold (600, the selected tool 700).
The right panel is the class viewer's own; it takes the tint only when embedded (`.app.embed` in `viewer/src/styles.css`), so the
viewer opened on its own stays plain white.

The Chapter dropdown, the tool list, the arrows, the totals and these links appear for a class whose viewer supports embedding
(the small change in `class<N>/viewer/src/App.tsx`; it reaches a class by `node classctl.mjs sync`, never by hand). For a class
whose viewer is older, the page is just the Class dropdown plus that unchanged viewer (its own tool list is on its left), and it
never claims to know which tool you are on.

## After a clone

1. `npm install` in each `class<N>/` folder you want to look at (the hub says so, in the page, for one that has no `node_modules`).
2. A class with no ported tool yet shows "no tools ported yet"; a tool appears as soon as its `check` passes (it ports on a pass).
3. `node viewhub.mjs`. Nothing else: no config, no port to choose.

## A new class

Nothing to do. `node classctl.mjs new --class <N>` copies the newest class's `viewer/` (which already has the embedding support
the hub drives), and the hub finds `class<N>/` by its `pipeline.config.json` and uses its `viewerPort`: the class appears in the
Class dropdown with its chapters and tools as soon as `fetch` and `check` have made them. `classctl.test.mjs` (f18, f19) proves both.
If a class is ever behind (an older viewer), it still opens in the hub as its own plain viewer until `node classctl.mjs sync`
brings the newer one. Change the viewer in the newest class and carry it with `classctl`, never by copying between class folders.

## What it does and does not do

- **Finds** every `class<N>/` folder with a `pipeline.config.json`. The class's viewer port is the one the class already uses
  (`viewerPort` in its config, else `5175 + 2 x class`: 5183 for class 4, 5185 for class 5).
- **Starts** a class's viewer when you pick that class (`node cli.mjs view --port <port>` inside the class folder; a viewer you
  already started by hand is used as it is) and **stops** the ones it started when you press ctrl+C. The first start builds the
  viewer's bundle: a few seconds. A large class takes a second or two to list its tools (every tool's check freshness is read).
- **Passes through** the class's `/api/meta` and `/api/tools` (a page on one port cannot read another port), and nothing else:
  no check, hostsim, port or publish route goes through the hub; those are the class viewer's own buttons.
  The tool list's green "✓ published <time>" line is the viewer's `published` (a class viewer from before that feature sends only
  `status`, which the hub reads by the same rule: `class<N>/viewer/README.md`, "Published, and when").
- **Never** uploads, publishes, edits a class, or reads `.env` / `config.json` on the Preview page; the Editor (below) writes only
  on a click. It listens on `127.0.0.1` only, answers only a `localhost` Host header, and a POST only from its own page.
- **Each class is shown by its own viewer**, so a tool is always rendered with that class's own host template and the runtime
  it is pinned to, and the hub never needs to know how a class differs from another.

## The Editor (educator feedback -> fix -> publish)

The header's **Preview | Editor** switch (`#editor` links straight to it; the badge counts the tools waiting) opens the same
feedback loop as Tool_Pipeline's preview Editor, run on THIS pipeline:

- **Review queue**: the pending rows of the `toolfeedback` table (what educators file from the Content-Validator) for every chapter
  that has a `class<N>/work/<chapter_id>/` folder, filtered by board, medium, publication, subject, std and chapter, and in the
  filter popup by date and teacher. Copy puts every filtered item (with its screenshot) on the clipboard.
- **Mark solved / Mark chapter solved**: sets those rows' `status` to `resolved`, no publish (a confirm first).
- **Apply feedback in the IDE / In a terminal**: writes `work/<ch>/<id>/_feedback/REVISE_PROMPT.md` (the feedback, the downloaded
  screenshots, the udgam steps: edit `tool.tsx` -> `check`, which ports on a pass; never publish), snapshots the baseline
  (`_feedback/tool.before.tsx` + `port.before.tsx`, write-once) and hands a Claude Code session to you, started at the pipeline root.
- **Diff + Before / After**: `tool.tsx` against the baseline, and the ported tool before and after, rendered with the class
  viewer's own libraries and host template, at Mobile / Web / Smartboard and in EN / हिं / ગુ. Both follow the disk every 3 s.
- **Discard** puts `tool.tsx` (and the ported pair) back from the baseline. **Approve & publish** and **Publish local changes**
  open one dialog: tick tools, **Dry run** (`node cli.mjs publish <chapter_id>/<id>`, writes nothing) or **Publish**
  (`--upload`; `--apply` only when its own box is ticked). Each tool that ships has its feedback resolved and its baseline cleared.
  The log streams into the Logs dialog and survives a reload.

The database and the GCS key are read by `viewer-hub/feedback.mjs`, a child process that uses the class's own lib (so the class's
`.env` / `Python-backend/.env` and `config.json`, exactly as `node cli.mjs doctor` reports them); the hub process never reads them.
`UDGAM_FEEDBACK_FIXTURE=<rows.json> node viewhub.mjs` reads (and resolves into) a JSON file of rows instead of the database, for
trying the page without production data.

## How the page drives the class viewer

Plain `postMessage`, no shared code:

| direction | message |
|---|---|
| hub → viewer | `{ type: "udgam-viewer:select", chapterId, id }` (the page also opens the viewer as `/?embed=1&ch=<chapterId>&tool=<id>`) |
| viewer → hub | `{ type: "udgam-viewer:ready" }` once mounted; `{ type: "udgam-viewer:selected", chapterId, id }` when the child picks a tool inside the viewer |

A class viewer that never says `ready` is shown as it is, and the hub's Chapter dropdown, tool list, ←/→ and totals stay hidden:
use that viewer's own list. Once a class has the embedding viewer they appear by themselves, with nothing to switch on.
When embedded (`?embed=1`) the viewer hides its own header title, totals and left list, which the hub's header and tool panel replace.

## Files

| file | what |
|---|---|
| `viewhub.mjs` (pipeline root) | the server: discovers classes, starts their viewers, passes meta and tools through |
| `viewer-hub/index.html` | the page (plain HTML + JS, no build step) |
| `viewer-hub/editor.js` | the Editor page (plain JS, served at `/editor.js`) |
| `viewer-hub/editor-api.mjs` | the Editor's routes, `/api/feedback/*` (queue, screenshot, tool, render, prepare, discard, resolve, publish) |
| `viewer-hub/feedback.mjs` | the child that reads and resolves `toolfeedback` rows and fetches screenshots through the class lib |
