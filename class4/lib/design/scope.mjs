/* What the visual pass may not change never travels to Gemini. The TR table, PHASES, MODEL, the maths (judge, oracle, solve ...), the
 * printed constants and the component that wires the runtime are top-level declarations of the skeleton (runtime/skeleton.tsx). Each
 * one is swapped for a one-line placeholder before the call and put back byte for byte after it, so it is neither paid for twice (in
 * and out) nor exposed to the corruption a whole-file rewrite brings ("bigger" -> "meger" sat mostly in TR). Declaration ORDER is kept:
 * a placeholder stands where its block stood, and a reply that drops, repeats or reorders one is refused (the mount test still runs).
 * Pure functions: node class4/lib/design/design.test.mjs */
import { createRequire } from "node:module";

const req = createRequire(import.meta.url);
const FROZEN = new Set(["TOOL_ID", "MEDIA_ID", "TOOL_NAME", "VOICE", "OPENING", "FINISH_LINE", "FREE_LINE", "START_HOOK", "TR", "PHASES", "MODEL",
  "judge", "oracle", "nearMiss", "answerForms", "agentKey", "HOOK", "solve", "answer", "check", "TOOL_IMAGES"]);
const MARK = /\/\*@@KEEP (\d+)@@[^*]*\*\//g;

const declName = (s) => (s.declarations ? s.declarations.map((d) => d.id && d.id.name).join(",") : s.id ? s.id.name : "");

/* PHASES and MODEL are the shapes Work reads, so their digest says what is in them: never design around an empty table */
function digest(name, s) {
  const init = s.declarations && s.declarations[0] && s.declarations[0].init;
  const obj = init && (init.type === "TSAsExpression" ? init.expression : init);
  const keys = (o) => (o && o.type === "ObjectExpression" ? o.properties.map((p) => p.key && (p.key.name || p.key.value)).filter(Boolean) : []);
  if (name === "PHASES" && obj && obj.type === "ArrayExpression") {
    const items = obj.elements.map((p) => (p.properties || []).find((q) => q.key && q.key.name === "items")).filter(Boolean).map((q) => q.value.elements || []);
    const fields = [...new Set(items.flat().flatMap(keys))];
    return `${obj.elements.length} phases of ${items.map((i) => i.length).join("/")} items; phase fields ${keys(obj.elements[0]).join(", ")}; item fields ${fields.join(", ")}`;
  }
  if (name === "MODEL" && keys(obj).length) return `fields ${keys(obj).join(", ")}`;
  if (name === "TR") return "the Hindi and Gujarati table keyed by the English";
  return "";
}

const parse = (src) => req("@babel/standalone").transform(src, { ast: true, code: false, babelrc: false, configFile: false,
  plugins: ["syntax-jsx", ["syntax-typescript", { isTSX: true }]] }).ast;

/* the syntax error of a SCOPED reply, in the line numbers Gemini sees ("" = it parses); the spliced whole file is checked again after */
export function parseError(src) {
  try { parse(src); return ""; } catch (e) { return String(e.message || e); }
}

/* every string a tool can print, as written in the source: string literals, template text and JSX text (null: it does not parse) */
export function literalsOf(src) {
  const out = [];
  const grab = () => ({ visitor: {
    StringLiteral(p) { out.push(src.slice(p.node.start + 1, p.node.end - 1)); },
    TemplateElement(p) { out.push(p.node.value.raw); },
    JSXText(p) { const t = p.node.value.trim(); if (t) out.push(t); },
  } });
  try {
    req("@babel/standalone").transform(src, { code: false, babelrc: false, configFile: false, plugins: ["syntax-jsx", ["syntax-typescript", { isTSX: true }], grab] });
  } catch { return null; }
  return out;
}

/* -> { scoped, frozen }: frozen[k] is the exact source the k-th placeholder stands for */
export function scopeTool(src) {
  const body = parse(src).program.body;
  const exported = (body.find((s) => s.type === "ExportDefaultDeclaration" && s.declaration && s.declaration.type === "Identifier") || {}).declaration;
  const frozen = [];
  let out = "", at = 0;
  for (const s of body) {
    const name = declName(s);
    const freeze = name && (name.split(",").some((n) => FROZEN.has(n)) || (exported && name === exported.name));
    if (!freeze) continue;
    const what = digest(name, s);
    out += src.slice(at, s.start) + `/*@@KEEP ${frozen.length}@@ ${name}: held back, put back unchanged${what ? "; " + what : ""} */`;
    frozen.push(src.slice(s.start, s.end));
    at = s.end;
  }
  return { scoped: out + src.slice(at), frozen };
}

/* -> { src } or { error }: every placeholder exactly once and in order, else the reply is refused (never a silent partial splice) */
export function spliceTool(reply, frozen) {
  const seen = [...String(reply).matchAll(MARK)].map((m) => Number(m[1]));
  const want = frozen.map((_, k) => k);
  if (seen.join(",") !== want.join(",")) {
    const missing = want.filter((k) => !seen.includes(k)), extra = seen.length - new Set(seen).size;
    return { error: `held-back blocks came back wrong (${missing.length ? "missing " + missing.join(",") : extra ? "repeated" : "reordered"})` };
  }
  return { src: String(reply).replace(MARK, (_, k) => frozen[Number(k)]) };
}
