/* orchlib/chunks: the visual review pack in pieces, so no reviewer holds 111 frames (~200k image tokens) in one context.
 *
 *   full     every distinct frame (a frame with `sameAs` repeats another's pixels and is skipped), split by phase into
 *            chunks of at most review.visualChunkFrames; a phase bigger than a chunk is split. Pattern representatives.
 *   light    a repeat of an already fully-reviewed pattern: the English frames named in review.lightFrames.en, the other
 *            languages' review.lightFrames.other (the fit frames), and every frame pack.json marks changed.
 *   changed  a re-review after a fix: only frames pack.json marks changed (new, or pixels differ from the pack before).
 * Frames are listed by path; the reviewer opens each with Read, one at a time, and never reads pack.json whole. */
import fs from "node:fs";
import path from "node:path";
import { readJson } from "./config.mjs";

export const packFile = (slotDir) => path.join(slotDir, "pack", "pack.json");

export function packFrames(slotDir) {
  const j = readJson(packFile(slotDir), null);
  return j && Array.isArray(j.frames) ? { frames: j.frames, toolHash: j.toolHash || null, runtimePin: j.runtimePin || null, builtAt: j.builtAt || null } : null;
}

export function selectFrames(frames, mode, pol) {
  const L = (pol.review && pol.review.lightFrames) || { en: [], other: [] };
  const distinct = frames.filter((f) => !f.sameAs);
  if (mode === "changed") return distinct.filter((f) => f.changed);
  if (mode === "light") return distinct.filter((f) => f.changed || (f.lang === "en" ? L.en.includes(f.state) : (L.other || []).includes(f.state)));
  return distinct;
}

/* split by phase (start frames ride with phase 1), chunks of at most cap */
export function chunkFrames(frames, cap = 40) {
  const byPhase = new Map();
  for (const f of frames) { const k = f.phase == null ? 0 : f.phase; if (!byPhase.has(k)) byPhase.set(k, []); byPhase.get(k).push(f); }
  const chunks = [];
  let cur = [];
  for (const k of [...byPhase.keys()].sort((a, b) => a - b)) {
    const group = byPhase.get(k);
    if (cur.length && cur.length + group.length > cap && k !== 0 && !(cur.every((f) => f.phase == null))) { chunks.push(cur); cur = []; }
    for (const f of group) { if (cur.length >= cap) { chunks.push(cur); cur = []; } cur.push(f); }
  }
  if (cur.length) chunks.push(cur);
  return chunks;
}

export function chunkPlan(slotDir, mode, pol) {
  const P = packFrames(slotDir);
  if (!P) return null;
  const picked = selectFrames(P.frames, mode, pol);
  const chunks = chunkFrames(picked, (pol.review && pol.review.visualChunkFrames) || 40);
  return { ...P, mode, total: P.frames.length, picked: picked.length, skippedSame: P.frames.filter((f) => f.sameAs).length, chunks };
}

export const frameLine = (slotRel, f) => `${slotRel}/pack/${f.file}  p${f.phase ?? "-"} ${f.state} ${f.lang}${f.changed ? " CHANGED" : ""}${f.note ? "  " + String(f.note).slice(0, 60) : ""}`;

export const packExists = (slotDir) => fs.existsSync(packFile(slotDir));
