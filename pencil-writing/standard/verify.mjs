/* Verifies a standardised class without touching any chapter: node pencil-writing/standard/verify.mjs --class 5
 * - every changed module loads (imports resolve, syntax ok)
 * - the capability is true for the head runtime, false for every frozen snapshot
 * - fetchRules: null for every frozen snapshot (a chapter fetched on one is not strict); the rule text matches the head
 * - writePin in a SCRATCH dir: rules are set when given, kept by a re-pin, never added by a re-pin
 * - the head runtime transpiles; the new row appears for a tool that writes and not for one that does not */
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { createRequire } from "node:module";
import { ROOT } from "../lib.mjs";

const N = Number(process.argv[process.argv.indexOf("--class") + 1]);
const C = path.join(ROOT, `class${N}`);
const imp = (f) => import(pathToFileURL(path.join(C, f)).href);
let fails = 0;
const ok = (name, cond, extra = "") => { console.log(`${cond ? "PASS" : "FAIL"}  ${name}${extra ? "  " + extra : ""}`); if (!cond) fails++; };

const caps = await imp("lib/core/caps.mjs"), pin = await imp("lib/core/pin.mjs"), pen = await imp("lib/check/pencil.mjs");
ok("caps.mjs, pin.mjs and pencil.mjs load", typeof caps.capsOf === "function" && typeof pin.fetchRules === "function" && typeof pen.pencilRows === "function");
for (const f of ["lib/check/check.mjs", "lib/check/input.mjs"]) {
  try { await imp(f); ok(`${f} loads (imports resolve)`, true); } catch (e) { ok(`${f} loads`, false, String(e.message).split("\n")[0]); }
}
const head = fs.readFileSync(path.join(C, "runtime/runtime.tsx"), "utf8");
ok("the head runtime has the write move (caps.pencilWrite)", caps.capsOf(head).pencilWrite === true);
const frozen = Object.keys(pin.readVersions().versions);
const withMove = frozen.filter((v) => caps.capsOf(fs.readFileSync(path.join(C, "runtime/frozen", v, "runtime.tsx"), "utf8")).pencilWrite);
ok(`no frozen snapshot has it yet (${frozen.length} snapshots)`, withMove.length === 0, withMove.length ? "snapshots with it: " + withMove.join(", ") : "");
ok("fetchRules is null for the newest frozen snapshot", pin.fetchRules(frozen[frozen.length - 1]) === null);
ok("fetchRules is null for a snapshot that does not exist (never throws)", pin.fetchRules("r99999") === null);
ok("the rule's own test is true for the head text", /function penPlan\(/.test(head));
/* the case that makes a NEW chapter strict: a snapshot that HAS the move. A throwaway folder (not in versions.json, removed at once) stands in for the freeze `fetch` will do. */
{
  const tmpSnap = path.join(C, "runtime", "frozen", "rZZ-pencil-verify");
  fs.mkdirSync(tmpSnap, { recursive: true });
  try {
    fs.writeFileSync(path.join(tmpSnap, "runtime.tsx"), head);
    const r = pin.fetchRules("rZZ-pencil-verify");
    ok("fetchRules is STRICT for a snapshot that has the move (what a new chapter gets at fetch)", r && r.pencilActs === "strict", JSON.stringify(r));
  } finally { fs.rmSync(tmpSnap, { recursive: true, force: true }); }
  ok("the throwaway snapshot folder is gone", !fs.existsSync(tmpSnap));
}

/* writePin in a scratch chapter dir, on a real snapshot name */
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "pw-pin-"));
const v = frozen[frozen.length - 1];
const a = pin.writePin(tmp, v, { why: "t", rules: { pencilActs: "strict" } });
ok("writePin sets rules when given", a.rules && a.rules.pencilActs === "strict");
const b = pin.writePin(tmp, frozen[0], { why: "re-pin" });
ok("a re-pin to another snapshot KEEPS the rules", b.rules && b.rules.pencilActs === "strict" && b.version === frozen[0]);
fs.rmSync(path.join(tmp, "runtime.json"));
const c1 = pin.writePin(tmp, v, { why: "fetched earlier" });
const c2 = pin.writePin(tmp, frozen[0], { why: "re-pin" });
ok("a chapter fetched without rules is never made strict by a re-pin", c1.rules === undefined && c2.rules === undefined);
ok("readPin reads the rules back", (() => { pin.writePin(tmp, v, { rules: { pencilActs: "strict" } }); return pin.readPin(tmp).rules.pencilActs === "strict"; })());
fs.rmSync(tmp, { recursive: true, force: true });

/* the row, end to end through pencilRows with the real capability function */
const strictCaps = caps.capsOf(head);
const writes = `api.act({ tool: "pencil", moves: "write", text: "5", at: [p], size: 40 });`;
const old = `api.act({ tool: "pencil", moves: "push", at: pts });`;
ok("strict chapter on the head: a write passes", pen.pencilRows(writes, { caps: strictCaps, strict: true })[0].level === "pass");
ok("strict chapter on the head: an unmarked push fails", pen.pencilRows(old, { caps: strictCaps, strict: true })[0].level === "fail");
ok("a finished chapter (old caps, no rules): no row for the old pencil", pen.pencilRows(old, { caps: caps.capsOf(fs.readFileSync(path.join(C, "runtime/frozen", frozen[frozen.length - 1], "runtime.tsx"), "utf8")), strict: false }).length === 0);

/* the head still transpiles as the build does */
const esbuild = createRequire(path.join(C, "package.json"))("esbuild");
try { await esbuild.transform(head, { loader: "tsx", jsx: "preserve", logLevel: "silent" }); ok("the head runtime transpiles with esbuild", true); } catch (e) { ok("the head runtime transpiles", false, String(e.message).split("\n")[0]); }

console.log(fails ? `\n${fails} FAILED` : `\nclass${N}: all passed`);
process.exit(fails ? 1 : 0);
