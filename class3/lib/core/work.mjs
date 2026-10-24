/* Where a slot's files live, and its status.
 *   work/<chapter_id>/<MEDIA_ID>/  brief.md  slot.json  tool.tsx  <ID>.preview.html  sheet-*.png  status.json
 * Media ids repeat across chapters (every chapter has an M1.S1.T2.C4.2D1), so a bare id is
 * accepted only when it is unique in work/; otherwise name the chapter.
 */
import fs from "node:fs";
import path from "node:path";
import { CONFIG, fromRoot } from "./env.mjs";
import { MEDIA_RE, chapterIdFor } from "../plan/lp.mjs";

export const workRoot = () => fromRoot(CONFIG.workDir);

export function resolveTarget(target, a = {}) {
  if (!target) throw new Error("name a slot: <MEDIA_ID> [--ch N], <chapter_id>/<MEDIA_ID>, or a work folder");
  const asPath = path.resolve(String(target));
  if (fs.existsSync(path.join(asPath, "slot.json"))) return asPath;
  const t = String(target).replace(/\\/g, "/");
  if (t.includes("/")) {
    const [chapterId, id] = t.split("/").slice(-2);
    const dir = path.join(workRoot(), chapterId, id);
    if (fs.existsSync(dir)) return dir;
    throw new Error(`no work folder ${chapterId}/${id}; run fetch first`);
  }
  if (!MEDIA_RE.test(t)) throw new Error(`"${t}" is not a media id like M1.S1.T2.C4.2D1`);
  if (a.ch) {
    const chapterId = a["chapter-id"] || chapterIdFor({ klass: a.class, pub: a.pub, medium: a.medium, subject: a.subject, ch: a.ch });
    const dir = path.join(workRoot(), chapterId, t);
    if (fs.existsSync(dir)) return dir;
    throw new Error(`no work folder ${chapterId}/${t}; run fetch first`);
  }
  const hits = fs.existsSync(workRoot())
    ? fs.readdirSync(workRoot()).map((c) => path.join(workRoot(), c, t)).filter((d) => fs.existsSync(d))
    : [];
  if (hits.length === 1) return hits[0];
  if (!hits.length) throw new Error(`no work folder for ${t}; run fetch first`);
  throw new Error(`${t} exists in ${hits.length} chapters (${hits.map((h) => path.basename(path.dirname(h))).join(", ")}); add --ch N`);
}

export function readStatus(dir) {
  const f = path.join(dir, "status.json");
  if (!fs.existsSync(f)) return {};
  try { return JSON.parse(fs.readFileSync(f, "utf8")); }
  catch (e) { throw new Error(`${f} is not valid JSON (${e.message.slice(0, 60)}); a run killed mid-write leaves it NUL-filled. Every field is regenerable: restore stage/chapterId/planId/version, then re-run check`); }
}

/* Written beside, then renamed over: a plain writeFileSync truncates first, so a process killed
   mid-write (a session ending, a timeout) left status.json NUL-filled and broke `status` and
   `runtime status` for the whole chapter (ch 9, 2026-09-23). A rename is atomic on NTFS. */
export function writeStatus(dir, patch) {
  const next = { ...readStatus(dir), ...patch, updatedAt: new Date().toISOString() };
  const f = path.join(dir, "status.json"), tmp = f + ".tmp";
  fs.writeFileSync(tmp, JSON.stringify(next, null, 2) + "\n");
  fs.renameSync(tmp, f);
  return next;
}

export const idOf = (dir) => path.basename(dir);
export const chapterOf = (dir) => path.basename(path.dirname(dir));
