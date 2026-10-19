/* freeze() under contention, on a throwaway class folder (no browser, no DB): node class5/lib/core/pin.test.mjs
   Before the lock, six sessions freezing one head all picked r1 and each reported made:true. */
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "pin-test-"));
try {
  fs.mkdirSync(path.join(tmp, "lib/core"), { recursive: true });
  fs.mkdirSync(path.join(tmp, "runtime"), { recursive: true });
  for (const f of ["env.mjs", "pin.mjs"]) fs.copyFileSync(path.join(here, f), path.join(tmp, "lib/core", f));
  fs.writeFileSync(path.join(tmp, "pipeline.config.json"), JSON.stringify({ runtime: "runtime/runtime.tsx", envFiles: [], defaults: { class: 5 } }));
  fs.writeFileSync(path.join(tmp, "runtime/runtime.tsx"), "// head A\n");
  fs.writeFileSync(path.join(tmp, "runtime/mascot.tsx"), "// mascot\n");
  const pin = path.join(tmp, "lib/core/pin.mjs");
  const run = (js) => `import(${JSON.stringify(pin)}).then(({freeze})=>console.log(JSON.stringify(freeze(null,{note:"t"}))))` + js;
  const once = () => new Promise((res, rej) => {
    const p = spawn(process.execPath, ["-e", run("")], { stdio: ["ignore", "pipe", "inherit"] });
    let out = ""; p.stdout.on("data", (d) => (out += d));
    p.on("close", (c) => (c ? rej(new Error("freeze exited " + c)) : res(JSON.parse(out))));
  });

  /* 1. six sessions, one head: ONE snapshot, ONE name, one made:true */
  const rows = await Promise.all(Array.from({ length: 6 }, once));
  assert.equal(new Set(rows.map((r) => r.version)).size, 1, "six sessions picked different names for one head");
  assert.equal(rows.filter((r) => r.made).length, 1, "more than one session made the snapshot");
  const versions = () => JSON.parse(fs.readFileSync(path.join(tmp, "runtime/frozen/versions.json"), "utf8")).versions;
  assert.deepEqual(Object.keys(versions()), ["r1"]);

  /* 2. a changed head is the NEXT name, never r1 again; the old snapshot is untouched */
  fs.writeFileSync(path.join(tmp, "runtime/runtime.tsx"), "// head B\n");
  const b = await once();
  assert.equal(b.version, "r2");
  assert.equal(fs.readFileSync(path.join(tmp, "runtime/frozen/r1/runtime.tsx"), "utf8"), "// head A\n");

  /* 3. a lock left by a dead process (older than 60 s) is taken over, not waited on */
  fs.writeFileSync(path.join(tmp, "runtime/runtime.tsx"), "// head C\n");
  const lock = path.join(tmp, "runtime/frozen/.lock");
  fs.mkdirSync(lock);
  const old = new Date(Date.now() - 120000);
  fs.utimesSync(lock, old, old);
  assert.equal((await once()).version, "r3");
  assert.ok(!fs.existsSync(lock), "the lock was not released");

  console.log("pin.test.mjs: ok");
} finally {
  fs.rmSync(tmp, { recursive: true, force: true });
}
