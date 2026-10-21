/* node pencil-writing/standard/test-judge.mjs : action-anim relaxes its 2 s limit ONLY for a written act (data-role pen-writing); every other verdict is as it was, in both classes */
import path from "node:path";
import { ROOT } from "../lib.mjs";
import { pathToFileURL } from "node:url";

let fails = 0;
const ok = (name, cond, extra = "") => { console.log(`${cond ? "PASS" : "FAIL"}  ${name}${extra ? "  " + extra : ""}`); if (!cond) fails++; };

for (const cls of ["class5", "class4"]) {
  const { judgeActionAnim } = await import(pathToFileURL(path.join(ROOT, cls, "lib", "check", "input.mjs")).href);
  /* a well-behaved act: layer within 300 ms, pad locked, quiet, acting; gone at `gone`; reduced motion fine */
  const mk = (gone, pen) => ({
    tries: [{}], motion: { rec: { seen: 120, gone, lockedAll: true, quietAll: true, actingAll: true, ...(pen === undefined ? {} : { pen }) }, before: { stage: "demo", step: 1 }, after: { acting: false, locked: false, stage: "demo", step: 2 } },
    reduced: { reduce: true, rec: { seen: null }, before: { stage: "demo", step: 1 }, after: { acting: false, layer: false, stage: "demo", step: 2 } },
  });
  const c = cls === "class4" ? { actTempo: 1.5, actBeat: 400 } : {};   /* class 4 judges with the runtime's own tempo and beat (3400 ms on r28/r29) */
  const lim = cls === "class4" ? 3400 : 2000;
  const j = (gone, pen) => judgeActionAnim(mk(gone, pen), c);
  ok(`${cls}: an ordinary act inside its old limit passes (${lim - 100} ms)`, j(lim - 100, false).length === 0);
  ok(`${cls}: an ordinary act over its old limit FAILS exactly as before (${lim + 100} ms)`, j(lim + 100, false).some((m) => /ended/.test(m)));
  ok(`${cls}: a recorder that never says pen (an old page) judges as before`, j(lim + 100, undefined).some((m) => /ended/.test(m)));
  ok(`${cls}: a WRITTEN act at 3.0 s passes`, j(3000, true).length === 0, JSON.stringify(j(3000, true)).slice(0, 120));
  ok(`${cls}: a WRITTEN act at 3.5 s FAILS and says it is a written act`, j(3500, true).some((m) => /ended 3500 ms/.test(m) && /written/.test(m)), j(3500, true)[0] || "");
  ok(`${cls}: an act still on screen (gone null) says so, written or not`, j(null, true).some((m) => /still on screen/.test(m)) && j(null, false).some((m) => /still on screen/.test(m)));
}
console.log(fails ? `\n${fails} FAILED` : "\nall passed");
process.exit(fails ? 1 : 0);
