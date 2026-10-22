// Class 4 ch 11: where each READY pair calls api.act with the pencil (line number + a trimmed snippet). Prints short matches only, never a file.
// usage: node pencil-writing/call-sites/11__scan.mjs [slot_id]
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "../../class4/output-preview/indiannica_eng_maths4_ch11");
const only = process.argv[2];
const slots = ["M1.S1.T2.C5.2D1", "M1.S2.T3.C10.2D1", "M1.S2.T4.C15.2D1", "M2.S3.T5.C20.2D1", "M2.S3.T6.C25.2D1", "M2.S4.T7.C30.2D1", "M2.S4.T8.C35.2D1"].filter((s) => !only || s === only);
for (const s of slots) {
  const lines = fs.readFileSync(`${root}/${s}/${s}.tsx`, "utf8").split("\n");
  const hits = [];
  lines.forEach((l, i) => { if (/tool:\s*["']pencil["']/.test(l) && !/^\s*(\/\/|\*)/.test(l)) hits.push(i); });
  const writes = lines.filter((l) => /moves:\s*["']write["']/.test(l)).length;
  console.log(`== ${s}  lines ${lines.length}  pencil act sites ${hits.length}  already moves:"write" ${writes}`);
  for (const i of hits.slice(0, 40)) {
    const ctx = lines.slice(Math.max(0, i - 1), i + 4).map((x) => x.trim()).join(" ").replace(/\s+/g, " ").slice(0, 260);
    console.log(`  L${i + 1}: ${ctx}`);
  }
}
