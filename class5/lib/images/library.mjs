/* The shared skin library, the raw-picture cache and the money ledger.
 *
 *   <class folder>/assets/skins/<skinHash>.webp + index.json     the skins, shared by every slot and chapter
 *   <class folder>/.images-cache/raw/<rawHash>.<png|jpg|webp>    every picture Gemini made (re-cut at any size, never re-billed)
 *   <class folder>/.images-cache/raw/index.json                   what made each raw picture (model, prompt, lane)
 *   <class folder>/.images-cache/ledger.json                      one row per billed call: model, key, bytes, estimated USD, time
 *
 * rawHash  = object + kind + style + aspect   (no pixel size, no prompt: two slots asking for one object share it)
 * skinHash = rawHash + pixel size + inset
 * Every JSON file here is written beside and renamed over, so a killed run never leaves a half file.
 *
 * Shared with the sibling classes the config lists (pipeline.config.json `skinLibraries`, e.g. ["assets/skins", "../class<M>/assets/skins"]; default none),
 * READ-ONLY: a skin or a raw picture missing here is looked up by the same hash in <sibling>/assets/skins and
 * <sibling>/.images-cache/raw before anything is billed, so the same object is never paid for twice across classes.
 * Nothing is written there (no usedBy, no ledger row): a hit is read and inlined into this slot's images.tsx; a re-cut of a
 * sibling's raw is stored here as a new skin of this class.
 */
import fs from "node:fs";
import path from "node:path";
import { fromRoot, skinLibraries } from "../core/env.mjs";

export const LIB_DIR = () => fromRoot("assets/skins");
export const CACHE_DIR = () => fromRoot(".images-cache");
export const RAW_DIR = () => path.join(CACHE_DIR(), "raw");
const LIB_INDEX = () => path.join(LIB_DIR(), "index.json");
const RAW_INDEX = () => path.join(RAW_DIR(), "index.json");
const LEDGER = () => path.join(CACHE_DIR(), "ledger.json");

const EXT = { "image/png": "png", "image/jpeg": "jpg", "image/jpg": "jpg", "image/webp": "webp" };
const MIME = { png: "image/png", jpg: "image/jpeg", webp: "image/webp" };

function readJson(f, dflt) {
  try { return JSON.parse(fs.readFileSync(f, "utf8")); } catch { return dflt; }
}
export function writeJsonAtomic(f, obj) {
  fs.mkdirSync(path.dirname(f), { recursive: true });
  const tmp = `${f}.${process.pid}.tmp`;
  fs.writeFileSync(tmp, JSON.stringify(obj, null, 2) + "\n");
  fs.renameSync(tmp, f);
}

/* the sibling classes, read-only: their skin library and raw cache, by the same hashes */
export const siblings = () => skinLibraries().map((rel) => ({ name: path.basename(rel), lib: fromRoot(path.join(rel, "assets/skins")), raw: fromRoot(path.join(rel, ".images-cache/raw")) }));

/* ── raw pictures (here first, then a sibling's: a re-cut of either is free) ── */
function rawIn(dir, hash) {
  for (const ext of ["png", "jpg", "webp"]) {
    const file = path.join(dir, `${hash}.${ext}`);
    if (fs.existsSync(file)) return { file, mime: MIME[ext], meta: readJson(path.join(dir, "index.json"), {})[hash] || null };
  }
  return null;
}
export function findRaw(hash) {
  const own = rawIn(RAW_DIR(), hash);
  if (own) return own;
  for (const s of siblings()) {
    const r = rawIn(s.raw, hash);
    if (r) return { ...r, from: s.name };
  }
  return null;
}
export function saveRaw(hash, buf, mime, meta) {
  fs.mkdirSync(RAW_DIR(), { recursive: true });
  /* a re-make (--force) never destroys a paid picture: the one it replaces is kept as <hash>.prev.<ext>; copy it
     back over <hash>.<ext> and run `images make` again to return to it (a free re-cut) */
  for (const ext of ["png", "jpg", "webp"]) {
    const was = path.join(RAW_DIR(), `${hash}.${ext}`);
    if (fs.existsSync(was)) fs.renameSync(was, path.join(RAW_DIR(), `${hash}.prev.${ext}`));
  }
  const file = path.join(RAW_DIR(), `${hash}.${EXT[mime] || "png"}`);
  fs.writeFileSync(file, buf);
  const idx = readJson(RAW_INDEX(), {});
  idx[hash] = { ...meta, mime, bytes: buf.length, at: new Date().toISOString() };
  writeJsonAtomic(RAW_INDEX(), idx);
  return file;
}
/* a picture the processing rejected, kept for the review (never used) */
export function saveRejected(hash, attempt, buf, mime) {
  fs.mkdirSync(RAW_DIR(), { recursive: true });
  const file = path.join(RAW_DIR(), `${hash}.rejected${attempt}.${EXT[mime] || "png"}`);
  fs.writeFileSync(file, buf);
  return file;
}

/* ── skins ── */
export function readIndex() { return readJson(LIB_INDEX(), { version: 1, skins: {} }); }
function skinIn(dir, hash) {
  const e = (readJson(path.join(dir, "index.json"), { skins: {} }).skins || {})[hash];
  if (!e) return null;
  const file = path.join(dir, `${hash}.webp`);
  return fs.existsSync(file) ? { ...e, file } : null;
}
/* here first, then a sibling's library (read-only; `from` names it). markUsed and pruneUsed touch this class's
   index only, so a sibling's hit records nothing anywhere: its picture is simply inlined into images.tsx */
export function getSkin(hash) {
  const own = skinIn(LIB_DIR(), hash);
  if (own) return own;
  for (const s of siblings()) {
    const e = skinIn(s.lib, hash);
    if (e) return { ...e, from: s.name };
  }
  return null;
}
/* a sibling's library index, for `images status` and `images list` (read-only) */
export function readSiblingIndex(s) { return readJson(path.join(s.lib, "index.json"), { version: 1, skins: {} }); }
export function putSkin(hash, webp, entry) {
  fs.mkdirSync(LIB_DIR(), { recursive: true });
  const file = path.join(LIB_DIR(), `${hash}.webp`);
  fs.writeFileSync(file, webp);
  const idx = readIndex();
  const was = idx.skins[hash] || {};
  idx.skins[hash] = { ...entry, usedBy: was.usedBy || [], made: new Date().toISOString() };
  writeJsonAtomic(LIB_INDEX(), idx);
  return file;
}
export function markUsed(hash, who) {
  const idx = readIndex();
  const e = idx.skins[hash];
  if (!e) return;
  e.usedBy = [...new Set([...(e.usedBy || []), who])].sort();
  writeJsonAtomic(LIB_INDEX(), idx);
}
/* after a slot is emitted: `who:key` stays only on the skin that key now uses (a retired key or a re-cut drops off) */
export function pruneUsed(who, keyToHash) {
  const idx = readIndex();
  let changed = false;
  for (const [h, e] of Object.entries(idx.skins)) {
    const before = (e.usedBy || []).length;
    e.usedBy = (e.usedBy || []).filter((u) => {
      if (!u.startsWith(who + ":")) return true;
      return keyToHash[u.slice(who.length + 1)] === h;
    });
    if (e.usedBy.length !== before) changed = true;
  }
  if (changed) writeJsonAtomic(LIB_INDEX(), idx);
}
export const skinUri = (file) => `data:image/webp;base64,${fs.readFileSync(file).toString("base64")}`;

/* ── the ledger: every billed call, so the money is always known ── */
export function readLedger() { return readJson(LEDGER(), { calls: [] }); }
export function ledgerAdd(row) {
  const l = readLedger();
  l.calls.push({ at: new Date().toISOString(), ...row });
  writeJsonAtomic(LEDGER(), l);
}
export function ledgerTotals() {
  const calls = readLedger().calls;
  const by = {};
  let usd = 0, images = 0;
  for (const c of calls) {
    usd += c.usd || 0;
    if (c.outcome !== "no-image" && c.outcome !== "blocked") images++;
    const k = `${c.model} · ${c.lane || "inline"}`;
    by[k] = by[k] || { calls: 0, usd: 0 };
    by[k].calls++; by[k].usd += c.usd || 0;
  }
  return { calls: calls.length, images, usd, by };
}
