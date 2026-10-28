/* Unit tests of the id remap (no database, no browser): node class4/lib/plan/remap.test.mjs */
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { planRemap, rewriteText, remapChapter } from "./remap.mjs";

let n = 0;
const t = (name, fn) => { fn(); n++; console.log(`PASS  ${name}`); };
const L = (id, tool, concepts, title = tool, description = "") => ({ id, tool_id: tool, title, description, concepts });

t("a tool whose id changed is matched by tool_id, and its concept ids follow by position", () => {
  const r = planRemap([L("M1.S2.T3.C10.2D1", "step_track", ["M1.S2.T3.C10", "M1.S2.T3.C11"])], [L("M1.S2.T3.C9.2D1", "step_track", ["M1.S2.T3.C9", "M1.S2.T3.C11"])]);
  assert.deepEqual(r.rename, [{ from: "M1.S2.T3.C10.2D1", to: "M1.S2.T3.C9.2D1", tool: "step_track" }]);
  assert.deepEqual(r.conceptMap, { "M1.S2.T3.C10": "M1.S2.T3.C9" });
  assert.deepEqual(r.problems, []);
});
t("an unchanged id is kept; a new live mount and a gone local one are reported, never guessed", () => {
  const r = planRemap([L("A.2D1", "x", []), L("Z.2D1", "gone", [])].map((s) => ({ ...s, id: s.id.replace("A", "M1.S1.T1.C1").replace("Z", "M9.S9.T9.C9") })),
    [L("M1.S1.T1.C1.2D1", "x", []), L("M2.S2.T2.C2.2D1", "fresh", [])]);
  assert.deepEqual(r.keep, ["M1.S1.T1.C1.2D1"]);
  assert.deepEqual(r.orphans, ["M9.S9.T9.C9.2D1"]);
  assert.deepEqual(r.fresh, ["M2.S2.T2.C2.2D1"]);
  assert.equal(r.rename.length, 0);
});
t("a swap (A->B, B->A) is a clean pair of renames", () => {
  const r = planRemap([L("M1.S1.T1.C1.2D1", "one", []), L("M1.S1.T1.C2.2D1", "two", [])], [L("M1.S1.T1.C1.2D1", "two", []), L("M1.S1.T1.C2.2D1", "one", [])]);
  assert.deepEqual(r.rename.map((x) => `${x.from}>${x.to}`).sort(), ["M1.S1.T1.C1.2D1>M1.S1.T1.C2.2D1", "M1.S1.T1.C2.2D1>M1.S1.T1.C1.2D1"]);
});
t("two live mounts of one tool_id are told apart by title, then description; else it is a PROBLEM", () => {
  const live = [L("M1.S1.T1.C5.2D1", "bar", [], "Bar A"), L("M1.S1.T1.C6.2D1", "bar", [], "Bar B")];
  assert.equal(planRemap([L("M1.S1.T1.C1.2D1", "bar", [], "Bar B")], live).rename[0].to, "M1.S1.T1.C6.2D1");
  assert.equal(planRemap([L("M1.S1.T1.C1.2D1", "bar", [], "Bar C")], live).problems.length, 1);
});
t("a different number of concept ids is a PROBLEM, never a partial map", () => {
  assert.equal(planRemap([L("M1.S1.T1.C1.2D1", "x", ["M1.S1.T1.C1", "M1.S1.T1.C2"])], [L("M1.S1.T1.C9.2D1", "x", ["M1.S1.T1.C9"])]).problems.length, 1);
});
t("rewriteText: one pass (C10->C9 and C9->C8 never chain), C1 is not C10, a url is never touched, plan id and version refresh", () => {
  const ids = { "M1.S2.T3.C10.2D1": "M1.S2.T3.C9.2D1", "M1.S2.T3.C9.2D1": "M1.S2.T3.C8.2D1" };
  const cm = { "M1.S2.T3.C10": "M1.S2.T3.C9", "M1.S2.T3.C9": "M1.S2.T3.C8" };
  const src = `{"mediaId":"M1.S2.T3.C10.2D1","other":"M1.S2.T3.C9.2D1","q":"M1.S2.T3.C10:ML1","keep":"M1.S2.T3.C1","url":"https://x.test/2dtool/M1.S2.T3.C10.2D1/M1.S2.T3.C10.2D1.tsx","planId":"c_v3","planVersion": 3}`;
  const out = rewriteText(src, ids, cm, "c", "c_v8", 8);
  assert.match(out, /"mediaId":"M1\.S2\.T3\.C9\.2D1"/);
  assert.match(out, /"other":"M1\.S2\.T3\.C8\.2D1"/);
  assert.match(out, /"q":"M1\.S2\.T3\.C9:ML1"/);
  assert.match(out, /"keep":"M1\.S2\.T3\.C1"/);
  assert.match(out, /https:\/\/x\.test\/2dtool\/M1\.S2\.T3\.C10\.2D1\/M1\.S2\.T3\.C10\.2D1\.tsx/);
  assert.match(out, /"planId":"c_v8","planVersion": 8/);
});
t("remapChapter renames the folders and the pair, backs up first, refreshes the plan id, and a dry run touches nothing", () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "remap-test-"));
  try {
    const w = path.join(root, "work", "c"), o = path.join(root, "out", "c"), old = "M1.S1.T1.C4.2D1", neu = "M1.S1.T1.C3.2D1";
    fs.mkdirSync(path.join(w, old), { recursive: true }); fs.mkdirSync(path.join(o, old), { recursive: true });
    fs.writeFileSync(path.join(w, old, "slot.json"), JSON.stringify({ id: old, tool_id: "x", title: "X", concept_id: "M1.S1.T1.C4", tool_config: { phase_map: [{ concept_id: "M1.S1.T1.C5" }] } }));
    fs.writeFileSync(path.join(w, old, "tool.tsx"), `const MEDIA_ID = "${old}"; // c_v3 M1.S1.T1.C4 M1.S1.T1.C5`);
    fs.writeFileSync(path.join(o, old, `${old}.tsx`), `/* ${old} */`);
    fs.writeFileSync(path.join(o, old, `${old}.json`), `{"mediaId":"${old}","planVersion":3,"planId":"c_v3"}`);
    const live = [{ id: neu, tool_id: "x", title: "X", concept_id: "M1.S1.T1.C3", tool_config: { phase_map: [{ concept_id: "M1.S1.T1.C4" }] } }];
    const opts = { workChapterDir: w, outChapterDir: o, chapterId: "c", planId: "c_v8", version: 8, liveMounts: live, backupDir: path.join(root, "bk") };
    remapChapter({ ...opts, dry: true });
    assert.ok(fs.existsSync(path.join(w, old)) && !fs.existsSync(path.join(root, "bk")));
    const r = remapChapter({ ...opts, dry: false });
    assert.equal(r.changed, true);
    assert.ok(!fs.existsSync(path.join(w, old)) && fs.existsSync(path.join(w, neu, "tool.tsx")));
    assert.ok(fs.existsSync(path.join(o, neu, `${neu}.tsx`)) && fs.existsSync(path.join(o, neu, `${neu}.json`)));
    assert.equal(fs.readFileSync(path.join(w, neu, "tool.tsx"), "utf8"), `const MEDIA_ID = "${neu}"; // c_v8 M1.S1.T1.C3 M1.S1.T1.C4`);
    assert.equal(fs.readFileSync(path.join(o, neu, `${neu}.json`), "utf8"), `{"mediaId":"${neu}","planVersion":8,"planId":"c_v8"}`);
    assert.ok(fs.existsSync(path.join(root, "bk", "work", old, "tool.tsx")), "the backup holds the old file");
  } finally { fs.rmSync(root, { recursive: true, force: true }); }
});
console.log(`${n} passed`);
