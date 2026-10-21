#!/usr/bin/env node
/* Puts the pencil `write` move into a READY pair (or, later, into a runtime source). A DRY RUN unless --apply. Idempotent.
 *
 *   node pencil-writing/apply.mjs                         dry run on the seven tools of the job (class 4 ch 6, 7, 10)
 *   node pencil-writing/apply.mjs --apply                 write them
 *   node pencil-writing/apply.mjs --only 7/M1.S2.T4.C15.2D1[,10/M2.S3.T5.C20.2D1] [--apply]
 *   node pencil-writing/apply.mjs --file <pair.tsx> [--apply]          any other ready pair (class 4 chapter 11, after its own pipeline)
 *   node pencil-writing/apply.mjs --runtime <runtime.tsx> [--apply]    a runtime source: the head, once the owner says freeze (marker mode)
 *
 * A pair is the port's printed file: the helper's comments and markers are gone, so its helper is found as the span from `const ACT_SFX =` to the
 * end of useActionKit and must equal the r29 block printed the way the port prints it (lib/ship/port.mjs line 114); the new block is printed the
 * same way and swapped in. A pair whose helper is neither the old nor the new one is REFUSED, never guessed at. Nothing else in the file changes
 * (the tool's own call sites are edited by hand, per tool, then `node cli.mjs approve`). Never touches work/, runtime/frozen/ or a sidecar. */
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { CLASS4, TOOLS, pairPath, read, blockOf, printed, spanOf, md5, START, END } from "./lib.mjs";
import { buildNewBlock } from "./build-helper.mjs";

const args = process.argv.slice(2);
const flag = (f) => args.includes(f), val = (f) => (args.includes(f) ? args[args.indexOf(f) + 1] : null);
const APPLY = flag("--apply");
const esbuild = createRequire(path.join(CLASS4, "package.json"))("esbuild");

const { oldBlock, newBlock } = buildNewBlock();
const oldPrinted = await printed(oldBlock), newPrinted = await printed(newBlock);

/* names the new code declares at top level; none may be declared elsewhere in a pair, nor be one of the host's mock icon names */
const declared = [...new Set(newBlock.match(/\b(?:PEN_[A-Z0-9]+|pen[A-Z]\w*|PencilText)\b/g))];
const hostIcons = (() => {
  const m = /var HOST_ICON_NAMES = \[([^\]]*)\]/.exec(read(path.join(CLASS4, "lib", "ship", "hostTemplate.mjs")));
  return new Set(m ? [...m[1].matchAll(/"([^"]+)"/g)].map((x) => x[1]) : []);
})();
const iconClash = declared.filter((n) => hostIcons.has(n));
if (iconClash.length) { console.error("the new code declares a name the host declares as an icon: " + iconClash.join(", ")); process.exit(1); }

const targets = [];
if (val("--runtime")) targets.push({ kind: "runtime", file: path.resolve(val("--runtime")), label: "runtime " + path.basename(path.dirname(path.resolve(val("--runtime")))) });
else if (val("--file")) targets.push({ kind: "pair", file: path.resolve(val("--file")), label: path.basename(val("--file")) });
else {
  const only = val("--only") ? new Set(val("--only").split(",")) : null;
  for (const [ch, id] of TOOLS) if (!only || only.has(`${ch}/${id}`)) targets.push({ kind: "pair", file: pairPath(ch, id), label: `ch${ch} ${id}` });
  if (only && targets.length !== only.size) { console.error("--only names a tool that is not one of the seven"); process.exit(1); }
}

let refused = 0, changed = 0, same = 0;
for (const t of targets) {
  const text = read(t.file);
  let out = null, state;
  if (t.kind === "runtime") {
    const blk = blockOf(text);
    if (blk === newBlock) state = "already patched";
    else if (blk.replace(/\r\n/g, "\n") === oldBlock) { out = text.replace(blk, () => newBlock); state = "old r28/r29 helper"; }
    else state = "REFUSED: the helper block is neither the old nor the new one";
  } else if (text.includes(newPrinted)) state = "already patched";
  else if (text.includes("\nfunction penPlan(")) {
    /* patched with an EARLIER version of the new code (while it is being tuned): swap that whole span, from `const ACT_SFX =` to the end of PencilText */
    const a = text.indexOf("\nconst ACT_SFX = ") + 1, m = text.indexOf("data-role=\"pencil-text\"", a);
    const e = m < 0 ? -1 : text.indexOf("\n}\n", m) + 2;
    if (a < 1 || e < 2 || !text.slice(e).startsWith("\nconst CSS = `")) state = "REFUSED: carries an older patch whose end cannot be found";
    else { out = text.slice(0, a) + newPrinted + text.slice(e); state = "older patch, refreshed"; }
  } else {
    const sp = spanOf(text);
    if (!sp) state = "REFUSED: no helper span (`const ACT_SFX =` ... end of useActionKit) found, or more than one";
    else if (text.slice(sp.start, sp.end) !== oldPrinted) {
      const a = text.slice(sp.start, sp.end).split("\n"), b = oldPrinted.split("\n");
      state = `REFUSED: the helper is not the printed r29 block (${a.length} lines vs ${b.length})`;
    } else {
      /* a name of the new code already declared in the tool: a duplicate declaration would be a page error */
      const outside = text.slice(0, sp.start) + text.slice(sp.end);
      const clash = declared.filter((n) => new RegExp(`\\b(?:function|const|let|var|class)\\s+${n.replace(/\$/g, "\\$")}\\b`).test(outside));
      if (clash.length) state = "REFUSED: the tool already declares " + clash.join(", ");
      else { out = text.slice(0, sp.start) + newPrinted + text.slice(sp.end); state = "old r28/r29 helper"; }
    }
  }
  if (out != null) {
    try { await esbuild.transform(out, { loader: "tsx", jsx: "preserve", logLevel: "silent" }); }
    catch (e) { state = "REFUSED: the patched file does not parse: " + String(e.message).split("\n")[0]; out = null; }
  }
  if (state.startsWith("REFUSED")) refused++;
  else if (out == null) same++;
  else changed++;
  const after = out == null ? text : out;
  console.log(`${t.label.padEnd(28)} ${state.padEnd(22)} ${(text.length / 1024).toFixed(1)} KB -> ${(after.length / 1024).toFixed(1)} KB  md5 ${md5(text).slice(0, 8)} -> ${md5(after).slice(0, 8)}`);
  if (APPLY && out != null) fs.writeFileSync(t.file, out);
}
console.log(`\n${APPLY ? "APPLIED" : "DRY RUN (nothing written; add --apply)"}: ${changed} to change, ${same} already patched, ${refused} refused. New top-level names: ${declared.join(" ")}`);
process.exit(refused ? 1 : 0);
