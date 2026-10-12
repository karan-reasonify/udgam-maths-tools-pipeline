/* The SHIP COPY of a tool that carries baked Hindi/Gujarati voice (the way the NCERT pipeline ships it).
 *
 * A SILENT RUNTIME (r30+) declares no TOOL_VOICE: voiceMap() returns null, shipVoice() hands the file back unchanged
 * with no files, and publish prints "silent: no clips". What follows is for a tool on a VOICED runtime (no SILENT_VOICE:
 * Class 4's r1-r21), which publishes exactly as it always did.
 *
 * WHY. The host refuses a tool over 1 MB (700 KB is the target); the clips alone are 1-2.3 MB. So the clips
 * leave the file: each becomes its own small `.ogg` in a shared `_voice/` folder beside the chapter's tools,
 * and the tool keeps only a text -> file name index and the base URL. Clip files are separate objects and do
 * not count against the tool's size.
 *
 * THE LOCAL TOOL DOES NOT CHANGE. voice.tsx (made by `node cli.mjs voice`) keeps inline `data:` clips, so
 * preview, every check, port and the viewer behave exactly as before. Only publish writes this copy, and it
 * is a mechanical transform of exactly two lines:
 *
 *   const TOOL_VOICE: Record<string, string> = { "<line>": "data:audio/ogg;base64,...", ... };
 *   const TOOL_VOICE_BASE: string = "";
 *  ->
 *   const TOOL_VOICE: Record<string, string> = { "<line>": "3f9c...a1.ogg", ... };
 *   const TOOL_VOICE_BASE: string = "https://media.../<chapter>/2dtool/_voice/";
 *
 * Clips are named by content hash (sha1, 20 hex), so the same line in two tools is one object and an object
 * never changes once uploaded (cached as immutable). `checkShip` proves nothing else differs.
 */
import crypto from "node:crypto";

export const CLIP_DIR = "_voice";
export const CLIP_TYPE = "audio/ogg";
export const CLIP_CACHE = "public,max-age=31536000,immutable";
const NAME_HEX = 20;

/* the local voice.tsx literal spans lines (`{` ... `\n}`); the ship copy's is one line (`{...}`) */
/* group 1 indent, group 2 the type annotation when there is one (the local source has them; the ported file,
   whose types port strips, does not), group 3 the object */
const MAP_RE = /^([ \t]*)const TOOL_VOICE(\s*:\s*Record<string,\s*string>)?\s*=\s*(\{(?:[^\n]*\}|[\s\S]*?\n\}))\s*;/m;
const BASE_RE = /^([ \t]*)const TOOL_VOICE_BASE(\s*:\s*string)?\s*=\s*"[^"\n]*"\s*;/m;
const DATA_RE = /^data:audio\/ogg;base64,([A-Za-z0-9+/=]+)$/;

export const clipName = (buf) => crypto.createHash("sha1").update(buf).digest("hex").slice(0, NAME_HEX) + ".ogg";

/** The tool's TOOL_VOICE index ({ line: data URI or file name }), or null when it declares none. */
export function voiceMap(tsx) {
  const m = MAP_RE.exec(tsx);
  if (!m) return null;
  return JSON.parse(m[3].replace(/,\s*\}$/, "}"));
}

/** { tsx, files: Map(name -> Buffer), index: { line: name } }. Entries already in file form are kept as they are. */
export function shipVoice(tsx, voiceBase) {
  const vm = voiceMap(tsx);
  if (!vm) return { tsx, files: new Map(), index: {} };
  if (!BASE_RE.test(tsx)) throw new Error('voice ship: no `const TOOL_VOICE_BASE = "";` line (run: node cli.mjs voice <slot>)');
  const files = new Map(), index = {};
  for (const [line, uri] of Object.entries(vm)) {
    const m = DATA_RE.exec(uri || "");
    if (!m) { index[line] = uri; continue; }
    const audio = Buffer.from(m[1], "base64");
    const name = clipName(audio);
    files.set(name, audio);
    index[line] = name;
  }
  let out = tsx.replace(MAP_RE, (_m, indent, ann) => indent + "const TOOL_VOICE" + (ann ? ": Record<string, string>" : "") + " = " + JSON.stringify(index) + ";");
  out = out.replace(BASE_RE, (_m, indent, ann) => indent + "const TOOL_VOICE_BASE" + (ann ? ": string" : "") + " = " + JSON.stringify(voiceBase) + ";");
  return { tsx: out, files, index };
}

/** Every reason this ship copy must NOT be uploaded. Empty = safe. */
export function checkShip(src, shipped, files, index, voiceBase, maxKb = 1024) {
  const probs = [];
  const kb = Buffer.byteLength(shipped) / 1024;
  if (kb > maxKb) probs.push(`SIZE: ${kb.toFixed(0)} KB is over the ${maxKb} KB limit even with the voice moved out`);
  if (!/^https:\/\/.+\/_voice\/$/.test(voiceBase)) probs.push(`the clip base is not an https .../${CLIP_DIR}/ url: ${voiceBase}`);
  const strip = (t) => t.replace(MAP_RE, "").replace(BASE_RE, "");
  if (strip(src) !== strip(shipped)) probs.push("anything other than the two voice lines differs between the local tool and the ship copy");
  const vm = voiceMap(src) || {}, sm = voiceMap(shipped) || {};
  const a = Object.keys(vm).sort().join("\u0001"), b = Object.keys(sm).sort().join("\u0001");
  if (a !== b) probs.push("the ship copy's key set differs from the local tool's");
  for (const [line, uri] of Object.entries(vm)) {
    const m = DATA_RE.exec(uri || "");
    if (!m) { probs.push(`clip for "${line.slice(0, 30)}" is not an inline ogg data: URI`); continue; }
    const name = sm[line];
    const bytes = files.get(name);
    if (!name || !bytes || !Buffer.from(m[1], "base64").equals(bytes) || clipName(bytes) !== name) probs.push(`clip for "${line.slice(0, 30)}" does not match its file`);
  }
  if (!/fetch\(voiceBase\(\) \+ uri\)/.test(shipped)) probs.push("the tool carries no clip-file loader (its runtime is older than r21: pin the chapter to r21 or later)");
  if (/data:audio\/ogg;base64/.test(shipped)) probs.push("an inline clip is still in the ship copy");
  return probs;
}
