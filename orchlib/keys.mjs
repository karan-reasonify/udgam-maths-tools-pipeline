/* orchlib/keys: the cache key of a check result. A cached result is reused only when EVERY part matches:
 *   tool    the class's own hashOf(slot): tool.tsx + the pinned runtime snapshot + mascot + kits + voice + images
 *   runtime the chapter's pin (version) and that snapshot's recorded hash
 *   checker a hash of the checker's code (policy checks.checkerFiles: lib/check/*.mjs, preview, pack, caps, pin, port, hostsim)
 *   config  a hash of the config keys that change what a check sees (policy checks.configKeys)
 *   langs   the language set the checks drive (policy checks.languages)
 *   render  quick (--no-render) and full results never stand in for each other
 * The key is recorded in status.json (`checkCache` / `quickCache`) by the cli.mjs hook after every check, by whoever runs it. */
import fs from "node:fs";
import path from "node:path";
import { sha, readJson, globFiles } from "./config.mjs";

const memo = new Map();
export function checkerHash(classDir, pol) {
  const files = (pol.checks.checkerFiles || []).flatMap((g) => globFiles(classDir, g));
  const sig = files.map((f) => { const s = fs.statSync(f); return `${f}:${s.size}:${s.mtimeMs}`; }).join("|");
  const k = classDir + "|" + sig;
  if (!memo.has(k)) memo.set(k, sha(files.map((f) => path.relative(classDir, f).replace(/\\/g, "/") + "\n" + fs.readFileSync(f, "utf8").replace(/\r\n/g, "\n")).join("\n\u0000\n")));
  return memo.get(k);
}

export function configHash(classDir, pol) {
  const cfg = readJson(path.join(classDir, "pipeline.config.json"), {});
  const pick = {};
  for (const k of pol.checks.configKeys || []) if (k in cfg) pick[k] = cfg[k];
  return sha(JSON.stringify(pick));
}

export function runtimePart(slotDir, classDir) {
  const pin = readJson(path.join(path.dirname(slotDir), "runtime.json"), {});
  const v = pin.version || null;
  const versions = readJson(path.join(classDir, "runtime", "frozen", "versions.json"), { versions: {} });
  const row = v && versions.versions ? versions.versions[v] : null;
  return { version: v, snapshot: row ? row.runtime || null : null };
}

export function cacheKey({ classDir, slotDir, pol, toolHash, render }) {
  const parts = {
    tool: toolHash,
    runtime: runtimePart(slotDir, classDir),
    checker: checkerHash(classDir, pol),
    config: configHash(classDir, pol),
    langs: (pol.checks.languages || []).join(","),
    render: render ? "full" : "quick",
    v: pol.checks.cacheVersion || 1,
  };
  return { key: sha(JSON.stringify(parts)), parts };
}

/* which parts differ between two recorded caches (for the "why re-run" line) */
export function keyDiff(a, b) {
  if (!a || !a.parts) return ["no cached result"];
  if (!b || !b.parts) return ["no current key"];
  const out = [];
  for (const k of ["tool", "runtime", "checker", "config", "langs", "render", "v"]) if (JSON.stringify(a.parts[k]) !== JSON.stringify(b.parts[k])) out.push(k);
  return out;
}
