/* check, then port automatically the moment every check passes: the standalone pair lands in
 * output-preview/ (and so in the viewer) without a separate step. Never publishes or uploads —
 * that stays a deliberate, later step on the user's word (docs/BUILD_CARD.md §2, CLAUDE.md).
 * Used by `node cli.mjs check` and the viewer's "re-run check" button, so both behave the same.
 */
import { buildPreview } from "../build/preview.mjs";
import { runChecks } from "./check.mjs";
import { portAndVerify } from "../ship/port.mjs";

export async function checkAndPort(dir, { render = true, log = console.log } = {}) {
  if (render) {
    const p = await buildPreview(dir);
    log(`  preview rebuilt (${(p.bytes / 1024).toFixed(1)} KB)`);
  }
  const checked = await runChecks(dir, { render, log });
  let ported = null, portError = null;
  if (render && !checked.summary.fail) {   /* only a full check ports */
    try { ported = await portAndVerify(dir, { log: (m) => log(`  ${m}`) }); }
    catch (e) { portError = e.message; }
  }
  return { checked, ported, portError };
}
