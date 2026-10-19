/* Unit tests of the hand-edit gate (no browser, no bucket, no database): node class5/lib/ship/publish.test.mjs
   publish's pair refusals (pairProblems), where a (re-keyed) mount is uploaded (mountTarget, rekeySidecar), port's and check's guard
   (handEditOf, handEditLine) and approve's wrong answer. */
import assert from "node:assert/strict";
import { pairProblems, mountTarget, rekeySidecar } from "./publish.mjs";
import { handEditOf, handEditLine, md5 } from "./port.mjs";
import { wrongOf } from "../check/approve.mjs";

const id = "M1.S1.T2.C4.2D1", hash = "ec8ee32d:417752";
const ported = Buffer.from(`/* ${id} */ export default Tool;`), edited = Buffer.from(`/* ${id} hand edit */ export default Tool;`);
const json = Buffer.from('{"mediaId":"x"}'), json2 = Buffer.from('{"mediaId":"x","edited":true}');
const side = (over = {}) => ({ mediaId: id, component: `${id}.tsx`, build: { source: hash, tsxMd5: md5(ported) }, ...over });
const status = (over = {}) => ({ checks: { pass: 91, fail: 0 }, checkedTool: hash, ported: { source: hash, tsxMd5: md5(ported) }, ...over });
const approved = (tsx, js) => ({ handEdit: { tsxMd5: md5(tsx), jsonMd5: md5(js), at: "2026-10-16T12:00:00.000Z", notes: [{ at: "2026-10-16T12:00:00.000Z", note: "one-sentence bubble" }] } });
const run = (st, tsx, js = json, sd = side()) => pairProblems({ id, st, side: sd, hash, tsx, json: js });
const NOT_APPROVED = "hand-edited but not approved: run approve";
let n = 0;
const t = (name, fn) => { fn(); n++; console.log(`PASS  ${name}`); };

t("a pair as port wrote it, from the checked source, is published", () => {
  const r = run(status(), ported);
  assert.deepEqual(r.problems, []);
  assert.equal(r.handEdit, null);
});
t("without a hand edit every old refusal stays (a stale source, a failed check)", () => {
  assert.deepEqual(run(status({ checkedTool: "other:1" }), ported).problems, ["the source changed since the last check"]);
  assert.deepEqual(run(status({ checks: { pass: 80, fail: 2 } }), ported).problems, ["the last check did not pass"]);
});
t("a hand-edited pair nobody approved is refused with the one line that says what to do", () => {
  assert.deepEqual(run(status(), edited).problems, [NOT_APPROVED]);
});
t("an approved hand edit is published even though the check is stale and the sidecar's build names the old .tsx", () => {
  const r = run(status({ checkedTool: "newer:9", checks: { pass: 3, fail: 1 }, ...approved(edited, json2) }), edited, json2);
  assert.deepEqual(r.problems, []);
  assert.equal(r.handEdit.approved, true);
});
t("approved, then the .json edited again: refused", () => {
  assert.deepEqual(run(status(approved(edited, json)), edited, json2).problems, [NOT_APPROVED]);
});
t("approved, then the .tsx edited again: refused", () => {
  const again = Buffer.from(`/* ${id} second edit */ export default Tool;`);
  assert.deepEqual(run(status(approved(edited, json)), again).problems, [NOT_APPROVED]);
});
t("approval never waives the other refusals: a sidecar naming another tool, a .tsx without its id", () => {
  assert.deepEqual(run(status(approved(edited, json)), edited, json, side({ mediaId: "M9.S9.T9.C9.2D1" })).problems, [`the sidecar names M9.S9.T9.C9.2D1 / ${id}.tsx`]);
  const noId = Buffer.from("export default Tool;");
  assert.deepEqual(run(status(approved(noId, json)), noId).problems, ["the .tsx does not carry its media id"]);
});

/* port's guard and check's skip (lib/ship/port.mjs, lib/check/runAndShip.mjs): this is the port refusal, proved without a slot */
t("port and check see a pair whose .tsx is not the ported one as hand-edited, and say whether it is approved", () => {
  const h = handEditOf(status(), md5(edited), md5(json));
  assert.deepEqual([h.edited, h.approved], [true, false]);
  assert.equal(handEditLine(h), "hand-edited pair (not approved); `port --force` overwrites it and loses those edits: (no note recorded)");
  const ok = handEditOf(status(approved(edited, json)), md5(edited), md5(json));
  assert.deepEqual([ok.edited, ok.approved], [true, true]);
  assert.equal(handEditLine(ok), "hand-edited pair (approved); `port --force` overwrites it and loses those edits: one-sentence bubble");
});
t("the pair port wrote, or a slot never ported, is not hand-edited (port goes ahead)", () => {
  assert.equal(handEditOf(status(), md5(ported), md5(json)).edited, false);
  assert.equal(handEditOf({}, md5(edited), md5(json)).edited, false);
});

t("approve's wrong answer has the key's shape and is never the key", () => {
  assert.equal(wrongOf({ answer: "no", choices: ["yes", "no"] }), "yes");
  assert.deepEqual(wrongOf({ answer: [6, 10] }), [6, 11]);
  assert.deepEqual(wrongOf({ answer: ["0", "9"] }), ["0", "8"]);
  assert.equal(wrongOf({ answer: "45" }), "46");
  assert.equal(wrongOf({ answer: 7 }), 8);
});
/* where a mount is uploaded: its OWN url names the folder and the stem; a re-keyed plan (ch 8 v3, 2026-10-16) kept the old ones */
const PRE = "https://media.singularity-learn.com/learning_plan_assets/", BASE = "V2/cbse/indiannica/english/class_4/mathematics/ch_8/2dtool/";
const urlOf = (stem) => `${PRE}${BASE}${stem}/${stem}.tsx`;
const V3 = [["M1.S1.T2.C5.2D1", "M1.S1.T2.C4.2D1"], ["M1.S1.T3.C10.2D1", "M1.S1.T3.C8.2D1"], ["M1.S2.T4.C15.2D1", "M1.S2.T4.C12.2D1"],
  ["M1.S2.T5.C20.2D1", "M1.S2.T5.C16.2D1"], ["M2.S3.T6.C25.2D1", "M2.S3.T6.C20.2D1"], ["M2.S4.T7.C30.2D1", "M2.S4.T7.C24.2D1"]];
t("a normal mount: the url names the id's own folder and file", () => {
  assert.deepEqual(mountTarget(urlOf(id), id, PRE, []), { folder: `${BASE}${id}`, stem: id, rekeyed: false });
});
t("a re-keyed mount (new id, old url): the tool goes to the folder and stem the url names", () => {
  assert.deepEqual(mountTarget(urlOf("M1.S1.T2.C4.2D1"), "M1.S1.T2.C5.2D1", PRE, []), { folder: `${BASE}M1.S1.T2.C4.2D1`, stem: "M1.S1.T2.C4.2D1", rekeyed: true });
});
t("all six mounts of class 4 ch 8 v3 map to their old objects, none onto another tool's", () => {
  const ids = V3.map(([a]) => a);
  for (const [nw, old] of V3) {
    const r = mountTarget(urlOf(old), nw, PRE, ids.filter((x) => x !== nw));
    assert.equal(r.stem, old); assert.equal(r.rekeyed, true); assert.equal(r.folder, `${BASE}${old}`);
  }
});
t("a mount url that is outside the bucket, not <stem>/<stem>.tsx, not a media id, or another tool's object is refused", () => {
  assert.throws(() => mountTarget("https://example.com/x/y/y.tsx", id, PRE, []), /not under/);
  assert.throws(() => mountTarget(`${PRE}${BASE}${id}/other.tsx`, id, PRE, []), /not <folder>\/<stem>\/<stem>\.tsx/);
  assert.throws(() => mountTarget(`${PRE}${BASE}${id}/${id}.json`, id, PRE, []), /not <folder>\/<stem>\/<stem>\.tsx/);
  assert.throws(() => mountTarget(urlOf("tenth_strip"), id, PRE, []), /neither .* nor a media id/);
  assert.throws(() => mountTarget(urlOf("M1.S1.T3.C10.2D1"), "M1.S1.T2.C5.2D1", PRE, ["M1.S1.T3.C10.2D1"]), /another mount of this plan/);
});
t("the sidecar of a re-keyed upload names the object that is there, and nothing else changes", () => {
  const src = Buffer.from(JSON.stringify({ mediaId: "M1.S1.T2.C5.2D1", component: "M1.S1.T2.C5.2D1.tsx", conceptIds: ["M1.S1.T2.C5"], nested: { a: [1, { b: "é" }] } }, null, 2) + "\n");
  const out = rekeySidecar(src, "M1.S1.T2.C4.2D1"), a = JSON.parse(src), b = JSON.parse(out);
  assert.equal(b.component, "M1.S1.T2.C4.2D1.tsx");
  assert.deepEqual({ ...b, component: a.component }, a);
  assert.ok(out.toString("utf8").endsWith("}\n"));
  assert.equal(rekeySidecar(src, "M1.S1.T2.C5.2D1").equals(src), true);   /* the same stem rewrites the same bytes: the format is port's */
});
console.log(`\n${n} passed`);
