/* node pencil-writing/standard/test-hook.mjs <class> <chapter_id> <slot_id>   e.g. class5 indiannica_eng_maths5_ch6 M1.S1.T2.C5.2D1
   Proves the pencil-acts HOOK in check.mjs really runs (it is wrapped in try/catch, so a "no row" result alone would prove nothing):
   a scratch copy of a real slot under a temporary chapter folder, run through the class's own runChecks, with and without a write act. */
import fs from "node:fs";
import path from "node:path";
import { ROOT } from "../lib.mjs";
import { pathToFileURL } from "node:url";

const [cls, srcCh, slot] = process.argv.slice(2);          // e.g. class5 indiannica_eng_maths5_ch6 M1.S1.T2.C5.2D1
const tmpCh = srcCh.replace(/ch\d+$/, "ch98");
const work = path.join(ROOT, cls, "work");
const srcSlot = path.join(work, srcCh, slot), dstCh = path.join(work, tmpCh), dstSlot = path.join(dstCh, slot);
if (fs.existsSync(dstCh)) { console.error("the scratch chapter folder already exists: " + dstCh); process.exit(1); }

const cleanup = () => fs.rmSync(dstCh, { recursive: true, force: true });
try {
  fs.mkdirSync(dstSlot, { recursive: true });
  fs.copyFileSync(path.join(work, srcCh, "runtime.json"), path.join(dstCh, "runtime.json"));
  for (const e of fs.readdirSync(srcSlot, { withFileTypes: true })) {
    if (!e.isFile() || /\.(png|html|ogg)$/i.test(e.name) || e.name.startsWith(".")) continue;
    fs.copyFileSync(path.join(srcSlot, e.name), path.join(dstSlot, e.name));
  }
  const mod = await import(pathToFileURL(path.join(ROOT, cls, "lib", "check", "check.mjs")).href);
  const run = async (label) => {
    const r = await mod.runChecks(dstSlot, { render: false, log: () => {} });
    const rows = (r.results || r.rows || []).filter((x) => x.id === "pencil-acts");
    console.log(`${cls} ${label}: ${rows.length ? rows.map((x) => `${x.level.toUpperCase()} ${x.msg.slice(0, 120)}`).join(" | ") : "no pencil-acts row"}   (summary ${JSON.stringify(r.summary && { pass: r.summary.pass, warn: r.summary.warn, fail: r.summary.fail })})`);
    return rows;
  };
  const a = await run("unchanged tool, runtime without the move");
  const tf = path.join(dstSlot, "tool.tsx");
  const src = fs.readFileSync(tf, "utf8"), eol = src.includes("\r\n") ? "\r\n" : "\n";
  const lines = src.split(/\r?\n/);
  let last = lines.length - 1; while (last > 0 && !lines[last].trim()) last--;
  lines.splice(last, 0, `function __penTest(api) { return api.act({ tool: "pencil", moves: "write", text: "5", at: [{ x: 1, y: 2 }], size: 40 }); }`);
  fs.writeFileSync(tf, lines.join(eol));
  const b = await run("tool that WRITES, runtime without the move");
  console.log(a.length === 0 && b.length === 1 && b[0].level === "fail" ? "HOOK PROVEN: no row for the old tool, a FAIL row for a write on an old runtime" : "UNEXPECTED: see above");
  process.exitCode = a.length === 0 && b.length === 1 && b[0].level === "fail" ? 0 : 1;
} finally { cleanup(); console.log("scratch chapter folder removed: " + !fs.existsSync(dstCh)); }
