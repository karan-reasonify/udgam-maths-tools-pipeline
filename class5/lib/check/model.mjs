/* The tool's data and its maths functions, evaluated in Node without a browser.
 * The combined source (runtime + mascot + tool) is bundled with a stub React and its top-level
 * names are exported, so the checks, port and the sidecar read the SAME PHASES, answers, judge
 * and oracle the child plays against. Nothing here renders. A name a tool does not declare is simply absent. */
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { sources } from "../build/preview.mjs";

/* PHASES travels whole, so a phase's guide steps (`steps: [{ say, on, hint }]`, runtime r30/r34) come with it; TR,
   FREE_LINE and START_HOOK are read by tr-coverage (every printed line has its Hindi and Gujarati entry); speakableIn and
   lineFor by hint-fit (the Hindi and Gujarati of a hint and its instruction, as the bubble prints them); UI_STRINGS and
   readMs by the r41 rows (the built-in choose line of each language; a piece's reading time) */
const NAMES = ["TOOL_ID", "MEDIA_ID", "TOOL_NAME", "OPENING", "FINISH_LINE", "FREE_LINE", "START_HOOK", "TR", "PHASES", "MODEL", "CHROME", "VOICE",
  "judge", "oracle", "nearMiss", "answerForms", "agentKey", "words", "wordsIntl", "indian", "intl", "speakable",
  "leadNumber", "pieces", "speakableIn", "lineFor", "T", "CONTENT", "DEFAULT_CHROME", "Z", "MASCOT_BOX", "MASCOT_SIZE", "HIT", "TOOL_API", "POINTS", "AUDIO",
  "UI_STRINGS", "readMs"];

const STUB_REACT = "const R={createElement:()=>null,Fragment:'f'};export default R;" +
  "export const useState=()=>{throw new Error('model: no rendering here')};export const useEffect=()=>{};" +
  "export const useRef=()=>({current:null});export const useMemo=(f)=>f();export const useCallback=(f)=>f;";

export async function loadModel(dir) {
  const { build } = await import("esbuild");
  const { combined } = sources(dir);
  const has = (n) => new RegExp(`(^|\\n)\\s*(?:const|let|function)\\s+${n}\\b`).test(combined);
  const names = NAMES.filter(has);
  const src = combined.replace(/\n\s*export default [A-Za-z_$][\w$]*;?\s*$/, "\n") + `\nexport { ${names.join(", ")} };\n`;
  const tmp = path.join(dir, ".build");
  fs.mkdirSync(tmp, { recursive: true });
  const entry = path.join(tmp, "model.tsx"), out = path.join(tmp, "model.mjs");
  fs.writeFileSync(entry, src);
  const stubs = {
    name: "stubs",
    setup(b) {
      b.onResolve({ filter: /^(react|@use-gesture\/react)$/ }, (a) => ({ path: a.path, namespace: "stub" }));
      b.onLoad({ filter: /.*/, namespace: "stub" }, (a) => ({ loader: "js", contents: a.path === "react" ? STUB_REACT : "export const useDrag=()=>()=>({});" }));
    },
  };
  await build({ entryPoints: [entry], bundle: true, format: "esm", platform: "node", outfile: out, jsx: "transform",
    jsxFactory: "React.createElement", jsxFragment: "React.Fragment", logLevel: "silent", plugins: [stubs] });
  return await import(pathToFileURL(out).href + "?t=" + Date.now());
}
