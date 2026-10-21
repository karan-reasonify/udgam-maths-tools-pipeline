/* pencil-writing: shared helpers (the owner's job of 2026-10-21, PENCIL_WRITING_BRIEF.md). Reads and (apply.mjs) writes only what its callers
   name; never reads .env or config.json; never touches work/ or runtime/frozen/ except to read the helper block from one frozen runtime. */
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

export const HERE = path.dirname(fileURLToPath(import.meta.url));
export const ROOT = path.resolve(HERE, "..");
export const CLASS4 = path.join(ROOT, "class4");
const require = createRequire(path.join(CLASS4, "package.json"));
const esbuild = require("esbuild");

export const START = "/* ACTION_KIT_HELPER start */";
export const END = "/* ACTION_KIT_HELPER end */";

/* the seven tools of the job (PENCIL_WRITING_BRIEF.md): chapter number, slot id */
export const TOOLS = [
  ["6", "M1.S2.T4.C15.2D1"],
  ["7", "M1.S2.T3.C10.2D1"], ["7", "M1.S2.T4.C15.2D1"], ["7", "M2.S3.T5.C20.2D1"], ["7", "M2.S4.T7.C30.2D1"],
  ["10", "M1.S2.T4.C15.2D1"], ["10", "M2.S3.T5.C20.2D1"],
];
export const pairPath = (ch, id) => path.join(CLASS4, "output-preview", `indiannica_eng_maths4_ch${ch}`, id, `${id}.tsx`);
export const sidecarPath = (ch, id) => path.join(CLASS4, "output-preview", `indiannica_eng_maths4_ch${ch}`, id, `${id}.json`);

export const md5 = (s) => crypto.createHash("md5").update(s).digest("hex");
export const read = (f) => fs.readFileSync(f, "utf8");

/* the commented helper block of a runtime source (runtime.tsx or runtime/frozen/rN/runtime.tsx), markers included */
export function blockOf(text) {
  const a = text.indexOf(START), b = text.indexOf(END);
  if (a < 0 || b < 0 || text.indexOf(START, a + 1) >= 0) throw new Error("the ACTION_KIT_HELPER markers are not exactly one pair");
  return text.slice(a, b + END.length);
}

/* what lib/ship/port.mjs line 114 does to a source: the printed code the pairs carry (no comments, JSX kept, es2019) */
export async function printed(code) {
  const t = await esbuild.transform(code, { loader: "tsx", jsx: "preserve", target: "es2019", legalComments: "none", charset: "utf8", format: "esm" });
  return t.code.trim();
}

/* the helper's span inside a pair: from `const ACT_SFX =` to the closing brace of useActionKit. Not keyed on the marker word
   (a pair carries it elsewhere, in the kit's header text, and the markers themselves are stripped by the port). */
export function spanOf(text) {
  const a = text.indexOf("\nconst ACT_SFX = ");
  if (a < 0 || text.indexOf("\nconst ACT_SFX = ", a + 1) >= 0) return null;
  const tail = "return { act, play, busy: () => !!cur.current };\n}";
  const e = text.indexOf(tail, a);
  if (e < 0) return null;
  return { start: a + 1, end: e + tail.length };
}
