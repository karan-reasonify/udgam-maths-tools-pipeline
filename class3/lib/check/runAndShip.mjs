/* check, then port automatically the moment every check passes: the standalone pair lands in
 * output-preview/ (and so in the viewer) without a separate step. Never publishes or uploads —
 * that stays a deliberate, later step on the user's word (docs/BUILD_CARD.md §2, CLAUDE.md).
 * Used by `node cli.mjs check` and the viewer's "re-run check" button, so both behave the same.
 * A HAND-EDITED pair (lib/ship/port.mjs pairState) is never ported over: every row still runs and reports, the port is
 * skipped with the reason (portSkipped); `force` (check --force) overwrites it and loses those edits.
 */
import { buildPreview } from "../build/preview.mjs";
import { runChecks } from "./check.mjs";
import { portAndVerify, pairState, handEditLine } from "../ship/port.mjs";

export async function checkAndPort(dir, { render = true, force = false, log = console.log } = {}) {
  if (render) {
    const p = await buildPreview(dir);
    log(`  preview rebuilt (${(p.bytes / 1024).toFixed(1)} KB)`);
  } else {
    /* the quick check needs no page, but the viewer's HTML preview tab shows it while the tool is still being built (viewer/README.md), and the
       builder's inner loop is this check: keep the page current. esbuild only, no browser; it never ports, and a tool that does not build yet
       must not hide the check's own rows, so a failed build is one line, not an error. */
    try {
      const p = await buildPreview(dir);
      log(`  preview page refreshed (${(p.bytes / 1024).toFixed(1)} KB)`);
    } catch (e) { log(`  preview page not refreshed: ${String(e.message).split("\n")[0]}`); }
  }
  const checked = await runChecks(dir, { render, log });
  let ported = null, portError = null, portSkipped = null;
  const he = render && !checked.summary.fail && !force ? pairState(dir) : null;
  if (he && he.edited) { portSkipped = handEditLine(he); log(`  port skipped: ${portSkipped}`); }
  else if (render && !checked.summary.fail) {   /* only a full check ports */
    try { ported = await portAndVerify(dir, { replaceHandEdit: force, log: (m) => log(`  ${m}`) }); }
    catch (e) { portError = e.message; }
  }
  return { checked, ported, portError, portSkipped };
}
