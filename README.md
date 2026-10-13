# maths_pipeline: Udgam maths tools, one pipeline folder per class

**Stage: pipeline v1.** The layout, controls, modes and checks were settled on one reference tool
(class 4, chapter 1, `M1.S1.T2.C4.2D1` Place Value Builder) and every tool is built the same way. Chapters are
made one after another; publishing comes after every chapter is made.

Start at the class's own README, for example [`class4/README.md`](class4/README.md): setup, the order of work for
a chapter, and where everything is. To make a chapter's tools follow [`udgam_maths_claude.md`](udgam_maths_claude.md)
(the same runbook for every class). To carry the code of one class to another, or to make a new class folder,
use [`classctl.mjs`](classctl.mjs) (read [`CLASSCTL.md`](CLASSCTL.md)).

| path | what |
|---|---|
| `class4/`, `class5/`, ... | one pipeline per class: CLI, runtime, docs, tools in progress (`class4/` also hosts the class 5 chapter 9 work) |
| `classctl.mjs`, `classctl.manifest.json`, `CLASSCTL.md` | `status`, `sync` (code between classes, dry run first), `new --class N`, `restore`, `rootdocs`; tests in `classctl.test.mjs` |
| `_templates/agents/` | the agent files every class gets (`.claude/agents/<prefix>-*.md` are generated from them) |
| `_backups/` | what `classctl` saves before it changes a class (made on `--apply`) |
| `.env`, `config.json` | secrets (DB, GCS key); never in git. `.env.example` and `config.example.json` show what to fill in; `Python-backend/.env` (the author's machine only) fills in anything `.env` lacks |
| `textbooks/` | the books (the plan already carries each topic's text; the PDFs are not in git); the mascot is Kiko: `kiko.svg` in this folder (`mascot.png`, the old robot, is kept: runtimes r1 to r52 were made from it) |
| `_archive/icse6_corpus.zip` | the replaced ICSE Class 6 pipeline (not in git) |
| `.gitignore`, `.gitattributes` | what git leaves out (secrets, `node_modules`, caches, `output-preview/`, PNG sheets, preview pages, PDFs, backups) and `* -text`: line endings are never rewritten, because the checks hash each tool's source |

## After a clone

1. **Node 20 or newer, and Chrome** (the checks drive a headless Chrome; set `CHROME_PATH` if it is not found).
2. **`npm install` in each class folder** you will use (`class4/`, `class5/`): `node_modules` is not in git.
3. **Secrets:** copy `.env.example` to `.env` and `config.example.json` to `config.json` (both next to this file) and fill them in. `Python-backend/.env`, named second in each `pipeline.config.json`, only exists on the author's machine: `doctor` shows it as MISSING, which is fine.
4. **`node cli.mjs doctor`** in a class folder: the database must say `ok` (this machine's IP has to be allowed on it) and the Google key must load.
5. **`node cli.mjs status`**: the finished chapters read "check passed". If they read "source changed since", the files were checked out with their line endings rewritten: set `git config core.autocrlf false` and clone again (`.gitattributes` already asks git not to).
6. **Make tools:** "according to @udgam_maths_claude.md make tools for class N udgam chapter n" (a class that does not exist yet is created for you, `CLASSCTL.md`). Review in the viewer: `node cli.mjs view` rebuilds its bundle first; `node viewhub.mjs` (in this folder) shows every class on one page, with a Class and a Chapter dropdown and a tool list (`viewer-hub/README.md`). The finished chapters' ported pairs (`output-preview/`) are not in git: `check` makes them again. What a session or a role costs in tokens, and how to measure it: `node usage.mjs` (`TOKENS.md`).
