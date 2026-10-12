#!/usr/bin/env node
/* The read fence: one session, one chapter.
 *
 * A PreToolUse hook. A session that has opened one chapter's class4/work/ cannot read another
 * chapter's: each chapter builds on its own pinned runtime, and the patterns a builder used to copy
 * out of a finished tool live in class4/docs/PATTERNS.md.
 *
 * It fences class4/work/<chapter_id>/ only. docs/, runtime/, lib/, output-preview/, the CLI and a
 * session's own chapter are untouched. It arms itself on the first chapter a session opens.
 *
 * Exit 0 = allow (and anything unexpected exits 0: a fence must never stop the pipeline).
 * Exit 2 = refuse, with the redirect on stderr.
 *
 *   node cli.mjs fence            what each session is fenced to
 *   node cli.mjs fence --off      lift it (a deliberate cross-chapter look), --on to put it back
 *   C4_FENCE=off                  same, for one command
 */
import fs from "node:fs";

const read = (fd) => { try { return fs.readFileSync(fd, "utf8"); } catch { return ""; } };

try {
  const input = JSON.parse(read(0) || "{}");
  const tool = String(input.tool_name || "");
  if (!/^(Read|Grep|Glob|Bash|Edit|Write|NotebookEdit)$/.test(tool)) process.exit(0);

  /* everything this call names: a path, a glob, a shell command */
  const ti = input.tool_input || {};
  const text = [ti.file_path, ti.path, ti.pattern, ti.notebook_path, ti.command, ti.old_string && "", ti.glob]
    .concat(Array.isArray(ti.file_paths) ? ti.file_paths : [])
    .filter(Boolean).join("\n");
  if (!text) process.exit(0);

  const { fenceRead, readFence } = await import(new URL("../../class4/lib/core/fence.mjs", import.meta.url));

  /* A generated bundle is not source (1-2 MB: the runtime and the tool inlined). A read of it stays in the session's context and
     is paid for again on every later call; one session spent about 320 KB of its context on preview.html alone. settings.json
     denies it too, but a hook does not depend on path syntax. Tools and the CLI make and read these files themselves (node,
     not these tools), so only a model's Read/Grep, or a shell reader, is refused. `fence --off` is the deliberate look. */
  const BUNDLE = /(?:[\\/]\.build(?:[\\/]|$)|(?:[\\/]|\bM\d+\.S\d+\.T\d+\.C\d+\.2D\d+)[^\s"'|;&]*\.preview\.html\b|[\\/][\w.-]+\.preview\.html\b)/i;
  const SHELL_READER = /\b(cat|head|tail|sed|awk|grep|egrep|rg|less|more|cut|strings|od|nl|type|Get-Content|gc|Select-String|sls)\b/i;
  /* a picture in .build/ (hintframe-*.png, contrast-*.png) is what the visual reviewer is told to look at: only text bundles are refused */
  const isPicture = /\.(png|jpe?g)$/i.test(text.trim());
  const bundleHit = tool === "Read" ? BUNDLE.test(text) && !isPicture : tool === "Grep" ? BUNDLE.test(text) : tool === "Bash" ? BUNDLE.test(text) && SHELL_READER.test(text) : false;
  if (bundleHit && !(readFence().off || String(process.env.C4_FENCE || "").toLowerCase() === "off")) {
    process.stderr.write(
      "Bulk file: this is a generated bundle (preview.html or .build/), not source. Reading it fills the context for every later call.\n" +
      "Read instead: the tool's tool.tsx (by range), the rows `node cli.mjs check <slot> --ch <n>` prints, docs/PATTERNS.md and BUILD_CARD.md section 4 for the runtime API, `node cli.mjs shots` for a picture.\n" +
      "A deliberate look: node cli.mjs fence --off (then --on again).\n");
    process.exit(2);
  }

  const r = fenceRead(input.session_id, text);
  if (r.allow) process.exit(0);

  process.stderr.write(`Read fence: ${r.reason}\n`);
  process.exit(2);
} catch {
  process.exit(0); /* fail open, always */
}
