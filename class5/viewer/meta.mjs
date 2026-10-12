/* What the viewer says about itself: the class, the publication and, per chapter, its number, title,
 * tool count and check totals. Everything is read from pipeline.config.json, the chapter ids and the
 * folders on disk, never typed per class or per chapter, so a copied class folder labels itself.
 * Display only; nothing here writes anything.
 *
 * The check totals follow `node cli.mjs status`: a check counts only while it is fresh (the tool, the
 * runtime and the mascot are still the ones it certified) or sealed; otherwise it is "stale".
 */
import fs from "node:fs";
import path from "node:path";

import { CONFIG, fromRoot } from "../lib/core/env.mjs";
import { workRoot, readStatus } from "../lib/core/work.mjs";
import { hashOf } from "../lib/check/check.mjs";
import { sha } from "../lib/core/pin.mjs";

const OUT_ROOT = fromRoot(CONFIG.outDir); // output-preview/

const PUB_LABELS = { indiannica: "Udgam", cbse: "NCERT" };
const MEDIUM_LABELS = { eng: "English", hin: "Hindi", guj: "Gujarati" };
const SUBJECT_LABELS = { maths: "Maths", science: "Science" };
const label = (map, key) => map[key] ?? (key ? key[0].toUpperCase() + key.slice(1) : key);

/* <pub>_<medium>_<subject><class>_ch<N>, as lib/plan/lp.mjs chapterIdFor writes it */
const CHAPTER_ID = /^([a-z0-9]+)_([a-z]+)_([a-z]+?)(\d+)_ch(\d+)$/i;

/* The class a chapter id names (5 for indiannica_eng_maths5_ch9), or null when the id does not follow the pattern. */
export function chapterClass(chapterId) {
  const m = CHAPTER_ID.exec(String(chapterId));
  return m ? Number(m[4]) : null;
}

/* A viewer lists ONLY its own class's chapters. A folder of another class's chapter that sits in this class's work/
   (class 5 chapter 9 was begun in class4/work/) belongs to that class, so it is not offered here: Class 4 shows its 14
   chapters and Class 5 shows Class 5's. An id that does not follow the pattern stays listed, as before. */
export function isOwnChapter(chapterId) {
  const k = chapterClass(chapterId);
  return k === null || k === Number(CONFIG.defaults.class);
}

const zero = () => ({ pass: 0, warn: 0, fail: 0, stale: 0, unchecked: 0 });
const subdirs = (base) => (fs.existsSync(base)
  ? fs.readdirSync(base, { withFileTypes: true }).filter((e) => e.isDirectory()).map((e) => e.name)
  : []);

/* each class gets its own port without anyone choosing one: 5183 for class 4, 5185 for class 5, 5187 for
   class 6 ...; "viewerPort" in pipeline.config.json overrides it */
export function viewerPort() {
  return Number(CONFIG.viewerPort ?? 5175 + 2 * Number(CONFIG.defaults.class));
}

/* pass | warn | fail | stale | unchecked for one slot's work dir, the way `node cli.mjs status` reads it */
export function checkState(dir) {
  let st;
  try { st = readStatus(dir); } catch { return "unchecked"; } // a NUL-filled status.json must not break the viewer
  const toolFile = path.join(dir, "tool.tsx");
  if (!st.checks || !fs.existsSync(toolFile)) return "unchecked";
  let fresh = false;
  try { fresh = st.checkedTool === hashOf(dir); } catch { /* no pin or no runtime snapshot: not fresh */ }
  const sealed = !!st.sealed && st.sealed.tool === sha(fs.readFileSync(toolFile));
  if (!fresh && !sealed) return "stale";
  return st.checks.fail ? "fail" : st.checks.warn ? "warn" : "pass";
}

/* "# indiannica_eng_maths<N>_ch<n> · Decimals" is line 1 of work/<chapter>/mounts.md, written by `fetch` */
function chapterTitle(workDir) {
  try {
    const first = fs.readFileSync(path.join(workDir, "mounts.md"), "utf8").replace(/^﻿/, "").split(/\r?\n/, 1)[0];
    const m = /^#\s*\S+\s+·\s+(.+?)\s*$/.exec(first);
    return m ? m[1] : null;
  } catch { return null; }
}

function chapterMeta(chapterId) {
  const workDir = path.join(workRoot(), chapterId);
  const outDir = path.join(OUT_ROOT, chapterId);
  const slotIds = subdirs(workDir).filter((x) => fs.existsSync(path.join(workDir, x, "slot.json")));
  const portedIds = subdirs(outDir).filter((x) => fs.existsSync(path.join(outDir, x, `${x}.tsx`)) && fs.existsSync(path.join(outDir, x, `${x}.json`)));
  const checks = zero();
  for (const id of new Set([...slotIds, ...portedIds])) checks[slotIds.includes(id) ? checkState(path.join(workDir, id)) : "unchecked"]++;
  const m = CHAPTER_ID.exec(chapterId);
  return {
    chapterId,
    number: m ? Number(m[5]) : null,
    class: m ? Number(m[4]) : null,
    title: chapterTitle(workDir),
    slots: new Set([...slotIds, ...portedIds]).size,
    ported: portedIds.length,
    checks,
  };
}

export function viewerMeta() {
  const d = CONFIG.defaults;
  const ids = new Set([...subdirs(workRoot()), ...subdirs(OUT_ROOT)].filter(isOwnChapter));
  const chapters = [...ids].map(chapterMeta).sort((a, b) => (a.number ?? 1e9) - (b.number ?? 1e9) || a.chapterId.localeCompare(b.chapterId));
  const totals = { chapters: chapters.length, slots: 0, ported: 0, checks: zero() };
  for (const c of chapters) {
    totals.slots += c.slots;
    totals.ported += c.ported;
    for (const k of Object.keys(totals.checks)) totals.checks[k] += c.checks[k];
  }
  return {
    class: Number(d.class),
    pub: d.pub, pubLabel: label(PUB_LABELS, d.pub),
    medium: d.medium, mediumLabel: label(MEDIUM_LABELS, d.medium),
    subject: d.subject, subjectLabel: label(SUBJECT_LABELS, d.subject),
    chapters,
    totals,
  };
}
