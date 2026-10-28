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
/* the KITS (2026-10-16): the ACTION KIT (`node cli.mjs actionkit`) and the FONT KIT (`node cli.mjs fontkit`), generated like the
   mascot and frozen with it, but optional: a head or a snapshot without one builds exactly as before, and a kit's hash is recorded
   (versions.json, the pin) only where the kit exists */
export const KITS = ["actionkit", "fontkit"];
const kitHashes = (dir) => Object.fromEntries(KITS.map((k) => [k, path.join(dir, `${k}.tsx`)]).filter(([, f]) => fs.existsSync(f)).map(([k, f]) => [k, hashFile(f)]));
const sameKits = (a, b) => KITS.every((k) => a[k] === b[k]);
export const frozenRoot = () => fromRoot("runtime/frozen");
export const versionsFile = () => path.join(frozenRoot(), "versions.json");
export const snapshotDir = (v) => path.join(frozenRoot(), String(v));

export const sha = (buf) => crypto.createHash("sha256").update(buf).digest("hex").slice(0, 12);
export const hashFile = (f) => sha(fs.readFileSync(f));

export function readVersions() {
  const f = versionsFile();
  return fs.existsSync(f) ? JSON.parse(fs.readFileSync(f, "utf8")) : { versions: {} };
}

/* tmp + rename: a session reading versions.json while another writes it never sees half a file */
function writeVersions(v) {
  fs.mkdirSync(frozenRoot(), { recursive: true });
  const tmp = `${versionsFile()}.${process.pid}.tmp`;
  fs.writeFileSync(tmp, JSON.stringify(v, null, 2) + "\n");
  fs.renameSync(tmp, versionsFile());
}

/* ONE freezer at a time (2026-10-18). Three chapter sessions share one head and one versions.json; the name was picked
   (nextVersion) and written (freeze) in two unlocked steps, so two sessions could pick the same rN, the second one's
   snapshot dir overwrote the first's, and `runtime-pin` then failed "snapshot has been edited". mkdir is atomic; a lock
   older than 60 s belongs to a dead process and is taken over. */
const sleep = (ms) => Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
function withFreezeLock(fn) {
  const lock = path.join(frozenRoot(), ".lock"), until = Date.now() + 30000;
  fs.mkdirSync(frozenRoot(), { recursive: true });
  for (;;) {
    try { fs.mkdirSync(lock); break; } catch (e) {
      if (e.code !== "EEXIST") throw e;
      try { if (Date.now() - fs.statSync(lock).mtimeMs > 60000) { fs.rmSync(lock, { recursive: true, force: true }); continue; } } catch { /* it just went */ }
      if (Date.now() > until) throw new Error("another session is freezing a runtime (runtime/frozen/.lock); wait a few seconds and run it again");
      sleep(150);
    }
  }
  try { return fn(); } finally { fs.rmSync(lock, { recursive: true, force: true }); }
}

/* the head's hashes right now */
export function headHashes() {
  return { runtime: hashFile(headRuntime()), mascot: hashFile(headMascot()), ...kitHashes(fromRoot("runtime")) };
}

/* the frozen version whose bytes equal the head, or null */
export function headVersion() {
  const h = headHashes(), all = readVersions().versions;
  return Object.keys(all).find((v) => all[v].runtime === h.runtime && all[v].mascot === h.mascot && sameKits(all[v], h)) || null;
}

/* the next free name: r1, r2, ... */
export function nextVersion() {
  const used = Object.keys(readVersions().versions).map((v) => Number(/^r(\d+)$/.exec(v)?.[1] || 0));
  return "r" + (Math.max(0, ...used) + 1);
}

/* copy the head into runtime/frozen/<version>/. A snapshot is immutable: freezing a name that
   exists is a no-op when the bytes match and refused when they do not. No `version` = the snapshot that already holds the
   head, else the next free name, decided INSIDE the lock (never pick a name outside it). */
export const freeze = (version, opts = {}) => withFreezeLock(() => freezeLocked(version, opts));
function freezeLocked(version, { note = "" } = {}) {
  const head = headHashes(), all = readVersions();
  const v = version == null ? headVersion() || nextVersion() : String(version);
  if (!/^r\d+$/.test(v)) throw new Error(`a snapshot is named r1, r2, ...; got "${v}"`);
  const there = all.versions[v];
  if (there) {
    if (there.runtime === head.runtime && there.mascot === head.mascot && sameKits(there, head)) return { version: v, made: false, ...there };
    throw new Error(`${v} is frozen (runtime ${there.runtime}) and the head is ${head.runtime}; freeze a new version instead`);
  }
  const dir = snapshotDir(v);
  fs.mkdirSync(dir, { recursive: true });
  fs.copyFileSync(headRuntime(), path.join(dir, "runtime.tsx"));
  fs.copyFileSync(headMascot(), path.join(dir, "mascot.tsx"));
  for (const k of KITS) if (head[k]) fs.copyFileSync(fromRoot(`runtime/${k}.tsx`), path.join(dir, `${k}.tsx`));
  const row = { ...head, note, frozenAt: new Date().toISOString(),
    bytes: ["runtime.tsx", "mascot.tsx", ...KITS.map((k) => `${k}.tsx`)].reduce((n, f) => n + (fs.existsSync(path.join(dir, f)) ? fs.statSync(path.join(dir, f)).size : 0), 0) };
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

export function writePin(chapterDir, version, { why = "", sealed = null, rules = null } = {}) {
  const v = String(version), row = readVersions().versions[v];
  if (!row) throw new Error(`no frozen runtime ${v}; run: node cli.mjs runtime freeze`);
  const was = readPin(chapterDir);
  const pin = { version: v, runtime: row.runtime, mascot: row.mascot, ...Object.fromEntries(KITS.filter((k) => row[k]).map((k) => [k, row[k]])), why: why || was?.why || "",
    pinnedAt: new Date().toISOString(), ...(was?.history ? { history: was.history } : {}) };
  if (was && was.version !== v) pin.history = [...(was.history || []), { version: was.version, until: pin.pinnedAt }];
  if (sealed) pin.sealed = sealed;
  else if (was?.sealed) pin.sealed = was.sealed;
  if (rules) pin.rules = { ...(was?.rules || {}), ...rules };   /* what the chapter is held to (fetchRules): never added by a later re-pin */
  else if (was?.rules) pin.rules = was.rules;
  fs.mkdirSync(chapterDir, { recursive: true });
  fs.writeFileSync(pinFile(chapterDir), JSON.stringify(pin, null, 2) + "\n");
  return pin;
}

/* The rules a chapter is held to FROM the runtime it is fetched on (2026-10-22). A chapter fetched onto a runtime with the pencil write move is "strict":
   every pencil act is a write or says marks: true (docs/PATTERNS.md 15, check pencil-acts). A chapter fetched earlier, or re-pinned later onto a newer
   runtime, is not: writePin keeps the rules it had and never adds one. null = no rules.
   2026-10-28 (MISS HIDES THE ANSWER, the owner; docs/PATTERNS.md 7, check miss-hides-answer): every chapter fetched from this day on is
   "strict" for it too: after a wrong answer the correction stops one step before the answer. It is a convention and a check, not a runtime
   feature, so it needs no marker in the snapshot; a chapter fetched earlier has no key (one INFO row) unless the owner sets it by hand.
   cli.mjs writes these rules only when the chapter has no pin yet, so a re-fetch never makes an older chapter strict. */
export function fetchRules(version) {
  let pen = false;
  try { pen = /function penPlan\(/.test(fs.readFileSync(path.join(snapshotDir(version), "runtime.tsx"), "utf8")); } catch { pen = false; }
  return { ...(pen ? { pencilActs: "strict" } : {}), missHidesAnswer: "strict" };
}

/* the runtime + mascot a slot builds on: its chapter's pin, else the head */
export function resolveRuntime(slotDir) {
  const chapterDir = path.dirname(path.resolve(slotDir));
  const pin = readPin(chapterDir);
  if (!pin) return { runtimeFile: headRuntime(), mascotFile: headMascot(), kitDir: fromRoot("runtime"), version: null, pin: null };
  const dir = snapshotDir(pin.version);
  const runtimeFile = path.join(dir, "runtime.tsx"), mascotFile = path.join(dir, "mascot.tsx");
  if (!fs.existsSync(runtimeFile) || !fs.existsSync(mascotFile))
    throw new Error(`${path.basename(chapterDir)} is pinned to runtime ${pin.version}, which is not in runtime/frozen/; run: node cli.mjs runtime freeze ${pin.version}`);
  return { runtimeFile, mascotFile, kitDir: dir, version: pin.version, pin };
}

/* what the `runtime-pin` check reports: the chapter names a snapshot and the snapshot is untouched */
export function pinState(slotDir) {
  const chapterDir = path.dirname(path.resolve(slotDir));
  const chapter = path.basename(chapterDir);
  const pin = readPin(chapterDir);
  if (!pin) return { ok: false, msg: `${chapter} pins no runtime, so an edit for another chapter would restale it; run: node cli.mjs runtime pin --ch <n>` };
  let r;
  try { r = resolveRuntime(slotDir); } catch (e) { return { ok: false, msg: e.message }; }
  const now = { runtime: hashFile(r.runtimeFile), mascot: hashFile(r.mascotFile), ...kitHashes(r.kitDir) };
  if (now.runtime !== pin.runtime || now.mascot !== pin.mascot || !sameKits(now, pin))
    return { ok: false, msg: `runtime/frozen/${pin.version} has been edited (runtime ${now.runtime}, pinned ${pin.runtime}); a snapshot is immutable: restore it or freeze a new version and pin it` };
  return { ok: true, msg: `built on frozen runtime ${pin.version} (${pin.runtime}), the chapter's own`, version: pin.version };
}
