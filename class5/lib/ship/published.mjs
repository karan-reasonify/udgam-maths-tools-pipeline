/* "Is this tool published, and when": the one reading the viewer (its tool list, the preview bar, the side panel) and the hub share.
 *
 * `publish --upload` writes status.published = { at, plan, urls, pair: { tsx, json } } on a SUCCESSFUL upload only. A dry run or a failed
 * re-upload replaces status.publish (the last attempt) but never this key, so the time of the live copy is not lost. `pair` is the md5 of
 * the LOCAL output-preview pair at that moment (not of the uploaded bytes: a voiced tool uploads its ship copy and a re-keyed one a
 * rewritten sidecar), so `changed` can say the pair was edited after it went up.
 *
 * Tools published before this key existed: a real upload left status.publish { dry: false, ok: true }; a later dry run may have replaced it
 * (stage still says "published"): then the tool is published but the time is not recorded (at: null). Pure: publish.test.mjs. */
import { md5 } from "./port.mjs";

/* an ISO time as the local "2026-10-21 13:32" (written by hand: toLocaleString differs from one machine and browser to the next) */
export function stamp(iso) {
  const d = new Date(iso);
  if (!iso || Number.isNaN(d.getTime())) return "";
  const p = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}`;
}

/* the record `publish` stores; tsx and json are the LOCAL pair's bytes */
export const publishedRecord = ({ at, plan, urls, tsx, json }) => ({ at, plan, urls, pair: { tsx: md5(tsx), json: md5(json) } });

/* null (not published) or { at, plan, legacy, changed }. `pairMd5` = { tsx, json } of the pair on disk now, or null when it is not read.
   changed: true when the pair is no longer the one that went up (true/false only when it can be told, else null): by md5 for a
   recorded upload, by `approve`'s date for an older one. */
export function publishedOf(st, pairMd5 = null) {
  if (!st) return null;
  const rec = st.published;
  if (rec && rec.at) {
    const changed = rec.pair && pairMd5 ? rec.pair.tsx !== pairMd5.tsx || rec.pair.json !== pairMd5.json : null;
    return { at: rec.at, plan: rec.plan ?? null, legacy: false, changed };
  }
  const p = st.publish;
  if (p && p.dry === false && p.ok) {
    const edited = st.handEdit && st.handEdit.at ? Date.parse(st.handEdit.at) > Date.parse(p.at) : null;
    return { at: p.at, plan: p.plan ?? null, legacy: true, changed: edited === true ? true : null };
  }
  if (st.stage === "published") return { at: null, plan: null, legacy: true, changed: null };
  return null;
}
