/* The runtime a chapter is built on.
 *
 * The runtime, the mascot and a tool are hashed together (check.mjs hashOf), so an edit to the one
 * shared runtime re-staled every finished tool of every chapter and pulled old chapters into a new
 * chapter's session. A chapter therefore pins a frozen snapshot:
 *
 *   runtime/runtime.tsx            the head: where a new feature is written
 *   runtime/frozen/<v>/            an immutable snapshot (runtime.tsx + mascot.tsx), never edited
 *   runtime/frozen/versions.json   every snapshot: hashes, when, why
 *   work/<chapter_id>/runtime.json the chapter's pin -> the snapshot every slot of it builds on
 *
 * A chapter's tools therefore cannot move because another chapter needed something. Bringing a
 * chapter forward is a deliberate act: freeze a new snapshot, pin that chapter, re-check that
 * chapter. Nothing else in the pipeline changes: same commands, same checks, same output.
 */
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { CONFIG, fromRoot } from "./env.mjs";

export const headRuntime = () => fromRoot(CONFIG.runtime);
export const headMascot = () => fromRoot("runtime/mascot.tsx");
export const frozenRoot = () => fromRoot("runtime/frozen");
export const versionsFile = () => path.join(frozenRoot(), "versions.json");
export const snapshotDir = (v) => path.join(frozenRoot(), String(v));

export const sha = (buf) => crypto.createHash("sha256").update(buf).digest("hex").slice(0, 12);
export const hashFile = (f) => sha(fs.readFileSync(f));

export function readVersions() {
  const f = versionsFile();
  return fs.existsSync(f) ? JSON.parse(fs.readFileSync(f, "utf8")) : { versions: {} };
}

function writeVersions(v) {
  fs.mkdirSync(frozenRoot(), { recursive: true });
  fs.writeFileSync(versionsFile(), JSON.stringify(v, null, 2) + "\n");
}

/* the head's hashes right now */
export function headHashes() {
  return { runtime: hashFile(headRuntime()), mascot: hashFile(headMascot()) };
}

/* the frozen version whose bytes equal the head, or null */
export function headVersion() {
  const h = headHashes(), all = readVersions().versions;
  return Object.keys(all).find((v) => all[v].runtime === h.runtime && all[v].mascot === h.mascot) || null;
}

/* the next free name: r1, r2, ... */
export function nextVersion() {
  const used = Object.keys(readVersions().versions).map((v) => Number(/^r(\d+)$/.exec(v)?.[1] || 0));
  return "r" + (Math.max(0, ...used) + 1);
}

/* copy the head into runtime/frozen/<version>/. A snapshot is immutable: freezing a name that
   exists is a no-op when the bytes match and refused when they do not. */
export function freeze(version, { note = "" } = {}) {
  const v = String(version);
  if (!/^r\d+$/.test(v)) throw new Error(`a snapshot is named r1, r2, ...; got "${v}"`);
  const head = headHashes(), all = readVersions();
  const there = all.versions[v];
  if (there) {
    if (there.runtime === head.runtime && there.mascot === head.mascot) return { version: v, made: false, ...there };
    throw new Error(`${v} is frozen (runtime ${there.runtime}) and the head is ${head.runtime}; freeze a new version instead`);
  }
  const dir = snapshotDir(v);
  fs.mkdirSync(dir, { recursive: true });
  fs.copyFileSync(headRuntime(), path.join(dir, "runtime.tsx"));
  fs.copyFileSync(headMascot(), path.join(dir, "mascot.tsx"));
  const row = { ...head, note, frozenAt: new Date().toISOString(),
    bytes: fs.statSync(path.join(dir, "runtime.tsx")).size + fs.statSync(path.join(dir, "mascot.tsx")).size };
  all.versions[v] = row;
  writeVersions(all);
  return { version: v, made: true, ...row };
}

/* ── a chapter's pin ─────────────────────────────────────────────────────────────── */

export const pinFile = (chapterDir) => path.join(chapterDir, "runtime.json");

export function readPin(chapterDir) {
  const f = pinFile(chapterDir);
  return fs.existsSync(f) ? JSON.parse(fs.readFileSync(f, "utf8")) : null;
}

export function writePin(chapterDir, version, { why = "", sealed = null } = {}) {
  const v = String(version), row = readVersions().versions[v];
  if (!row) throw new Error(`no frozen runtime ${v}; run: node cli.mjs runtime freeze`);
  const was = readPin(chapterDir);
  const pin = { version: v, runtime: row.runtime, mascot: row.mascot, why: why || was?.why || "",
    pinnedAt: new Date().toISOString(), ...(was?.history ? { history: was.history } : {}) };
  if (was && was.version !== v) pin.history = [...(was.history || []), { version: was.version, until: pin.pinnedAt }];
  if (sealed) pin.sealed = sealed;
  else if (was?.sealed) pin.sealed = was.sealed;
  fs.mkdirSync(chapterDir, { recursive: true });
  fs.writeFileSync(pinFile(chapterDir), JSON.stringify(pin, null, 2) + "\n");
  return pin;
}

/* the runtime + mascot a slot builds on: its chapter's pin, else the head */
export function resolveRuntime(slotDir) {
  const chapterDir = path.dirname(path.resolve(slotDir));
  const pin = readPin(chapterDir);
  if (!pin) return { runtimeFile: headRuntime(), mascotFile: headMascot(), version: null, pin: null };
  const dir = snapshotDir(pin.version);
  const runtimeFile = path.join(dir, "runtime.tsx"), mascotFile = path.join(dir, "mascot.tsx");
  if (!fs.existsSync(runtimeFile) || !fs.existsSync(mascotFile))
    throw new Error(`${path.basename(chapterDir)} is pinned to runtime ${pin.version}, which is not in runtime/frozen/; run: node cli.mjs runtime freeze ${pin.version}`);
  return { runtimeFile, mascotFile, version: pin.version, pin };
}

/* what the `runtime-pin` check reports: the chapter names a snapshot and the snapshot is untouched */
export function pinState(slotDir) {
  const chapterDir = path.dirname(path.resolve(slotDir));
  const chapter = path.basename(chapterDir);
  const pin = readPin(chapterDir);
  if (!pin) return { ok: false, msg: `${chapter} pins no runtime, so an edit for another chapter would restale it; run: node cli.mjs runtime pin --ch <n>` };
  let r;
  try { r = resolveRuntime(slotDir); } catch (e) { return { ok: false, msg: e.message }; }
  const now = { runtime: hashFile(r.runtimeFile), mascot: hashFile(r.mascotFile) };
  if (now.runtime !== pin.runtime || now.mascot !== pin.mascot)
    return { ok: false, msg: `runtime/frozen/${pin.version} has been edited (runtime ${now.runtime}, pinned ${pin.runtime}); a snapshot is immutable: restore it or freeze a new version and pin it` };
  return { ok: true, msg: `built on frozen runtime ${pin.version} (${pin.runtime}), the chapter's own`, version: pin.version };
}
