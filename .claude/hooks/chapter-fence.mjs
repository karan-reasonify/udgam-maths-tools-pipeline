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

  const { fenceRead } = await import(new URL("../../class4/lib/core/fence.mjs", import.meta.url));
  const r = fenceRead(input.session_id, text);
  if (r.allow) process.exit(0);

  process.stderr.write(`Read fence: ${r.reason}\n`);
  process.exit(2);
} catch {
  process.exit(0); /* fail open, always */
}
