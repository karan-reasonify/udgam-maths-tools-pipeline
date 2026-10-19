/* orchlib/state: the chapter's resumable orchestration state, work/<chapter_id>/orch/state.json.
 *
 * It holds ONLY what a fresh session needs to continue without re-reading the chapter: the phase and round, every
 * agent launched (role, model, tier, slots, status), each slot's checkpoint (stage, failed checks, decisions,
 * required corrections, risks, review hashes), the runtime freezes and pins of this build, the work skipped and
 * why, and counters. Written atomically under a small lock (several agents checkpoint at once). work/ is never
 * touched by classctl, so the state survives syncs. */
import fs from "node:fs";
import path from "node:path";
import { readJson, writeJsonAtomic } from "./config.mjs";

export const orchDir = (chapterDir) => path.join(chapterDir, "orch");
export const stateFile = (chapterDir) => path.join(orchDir(chapterDir), "state.json");

export function emptyState(meta = {}) {
  return {
    version: 1, ...meta, build: 1, phase: "plan", round: 1,
    createdAt: new Date().toISOString(), updatedAt: null,
    agents: [], slots: {}, freezes: [], pins: [], skipped: [], questions: [], gaps: [],
    counters: { fullChecks: 0, quickChecks: 0, cachedChecks: 0, packs: 0, escalations: 0 },
    session: {},
  };
}

export function readState(chapterDir, meta = {}) {
  const f = stateFile(chapterDir);
  return fs.existsSync(f) ? { ...emptyState(meta), ...readJson(f) } : emptyState(meta);
}

const sleep = (ms) => Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
function withLock(chapterDir, fn) {
  const lock = path.join(orchDir(chapterDir), ".lock");
  fs.mkdirSync(orchDir(chapterDir), { recursive: true });
  for (let i = 0; ; i++) {
    try { fs.mkdirSync(lock); break; }
    catch (e) {
      if (e.code !== "EEXIST") throw e;
      try { if (Date.now() - fs.statSync(lock).mtimeMs > 30000) { fs.rmSync(lock, { recursive: true, force: true }); continue; } } catch { /* gone */ }
      if (i > 200) throw new Error(`orch state is locked (${lock}); another orch command is writing`);
      sleep(50);
    }
  }
  try { return fn(); } finally { try { fs.rmSync(lock, { recursive: true, force: true }); } catch { /* ignore */ } }
}

/* read, change, write: fn(state) mutates it (or returns a new one) */
export function updateState(chapterDir, fn, meta = {}) {
  return withLock(chapterDir, () => {
    const st = readState(chapterDir, meta);
    const next = fn(st) || st;
    next.updatedAt = new Date().toISOString();
    writeJsonAtomic(stateFile(chapterDir), next);
    return next;
  });
}

export function slotRec(st, id) {
  return (st.slots[id] ||= { stage: "new", decisions: [], fails: [], fixes: [], risks: [], reviews: {}, retries: {}, escalations: 0, history: [] });
}

/* keep a list short: newest last, at most n */
export const capList = (arr, n) => (arr.length > n ? arr.slice(arr.length - n) : arr);

export function recordSkip(st, what, slot, reason, estTokens = 0) {
  st.skipped.push({ what, slot: slot || null, reason, estTokens: Math.round(estTokens), at: new Date().toISOString(), round: st.round });
  st.skipped = capList(st.skipped, 400);
}

export const running = (st, staleMin = 90) => st.agents.filter((a) => a.status === "running" && Date.now() - Date.parse(a.startedAt) < staleMin * 60000);
export const stale = (st, staleMin = 90) => st.agents.filter((a) => a.status === "running" && Date.now() - Date.parse(a.startedAt) >= staleMin * 60000);
