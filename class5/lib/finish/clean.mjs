/* clean: when a tool is made, drop what was only there to review it. Run by the main session at the end of a chapter
 * (runbook step 8: `node cli.mjs clean --ch N` for every slot of the chapter, `node cli.mjs clean <MEDIA_ID>` for one).
 *   removed: review artefacts that every `shots` / `check` / `approve` run makes again: sheet-*.png, phase-*.png, contrast-*.png,
 *            approve-*.png (approve's frames of a hand-edited pair, lib/check/approve.mjs),
 *            any other image (png, jpg, webp, gif: images-preview.png goes here), .build/ (bundles, sheets,
 *            screenshots, check.json, model files), logs and editor leftovers (*.log, *.tmp, *.bak, *.orig), and the review
 *            pack's frames (pack/: every file in it but pack.json and pack.prev.json, which stay, so a review round after the
 *            tidy still re-reviews only what changed: docs/REVIEW_PACK.md);
 *            the preview page <ID>.preview.html only with --html (it is check's own page, rebuilt by every check; it
 *            stays by default because the owner opens it to review a tool)
 *   kept:    tool.tsx, voice.tsx (the generated Hindi/Gujarati clips: never removed), images.tsx + images.json (the
 *            generated object skins and their plan, docs/IMAGES.md), brief.md, slot.json, status.json, the preview page,
 *            pack/pack.json + pack/pack.prev.json, and every other file (tool.legacy.tsx, voice.tsx.off, notes): only what is
 *            named above is ever removed
 * The check summary and the hash of the checked source stay in status.json, so port and publish still know what passed.
 * The standalone pair in output-preview/ is the product and is never touched here. A published slot stays "published".
 * The caller (cli.mjs) only cleans a slot whose last check passed and is still fresh (--force overrides): a failing or
 * stale slot's sheets may be all that shows what is wrong.
 */
import fs from "node:fs";
import path from "node:path";
import { idOf, readStatus, writeStatus } from "../core/work.mjs";

const KEEP = new Set(["tool.tsx", "voice.tsx", "images.tsx", "images.json", "brief.md", "slot.json", "status.json"]);
/* the review pack (lib/build/pack.mjs, docs/REVIEW_PACK.md): its frames go, its two JSON files stay */
const PACK = "pack", KEEP_IN_PACK = new Set(["pack.json", "pack.prev.json"]);
/* images made to look at, and what an editor or a run leaves behind */
const DISPOSABLE = /\.(png|jpe?g|webp|gif|log|tmp|bak|orig)$/i;
const SCRATCH = /^(sheet|phase|contrast|shot|approve)-/i;

function sizeOf(p) {
  const st = fs.statSync(p);
  if (!st.isDirectory()) return st.size;
  return fs.readdirSync(p).reduce((a, x) => a + sizeOf(path.join(p, x)), 0);
}

/* opts.html: also drop <ID>.preview.html; opts.dry: list what would go and delete nothing */
export function cleanSlot(dir, opts = {}) {
  const id = idOf(dir);
  const removed = [];
  let bytes = 0;
  for (const name of fs.readdirSync(dir)) {
    if (KEEP.has(name)) continue;
    const p = path.join(dir, name);
    if (name === PACK && fs.statSync(p).isDirectory()) {
      const gone = fs.readdirSync(p).filter((x) => !KEEP_IN_PACK.has(x));
      for (const x of gone) { bytes += sizeOf(path.join(p, x)); if (!opts.dry) fs.rmSync(path.join(p, x), { recursive: true, force: true }); }
      if (gone.length) removed.push(`${PACK}/ (${gone.length} file${gone.length === 1 ? "" : "s"}; ${[...KEEP_IN_PACK].filter((x) => fs.existsSync(path.join(p, x))).join(" and ") || "no json"} kept)`);
      continue;
    }
    const drop = name === ".build" || DISPOSABLE.test(name) || SCRATCH.test(name) || (!!opts.html && name === `${id}.preview.html`);
    if (!drop) continue;
    bytes += sizeOf(p);
    if (!opts.dry) fs.rmSync(p, { recursive: true, force: true });
    removed.push(name + (name === ".build" ? "/" : ""));
  }
  const kept = fs.readdirSync(dir).filter((n) => KEEP.has(n) || n === `${id}.preview.html`);
  for (const x of KEEP_IN_PACK) if (fs.existsSync(path.join(dir, PACK, x))) kept.push(`${PACK}/${x}`);
  if (!opts.dry) {
    const st = readStatus(dir);
    writeStatus(dir, { stage: st.stage === "published" ? "published" : "final", cleanedAt: new Date().toISOString() });
  }
  return { removed, kept, bytes };
}
