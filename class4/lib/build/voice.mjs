/* voice <MEDIA_ID>: bake a tool's Hindi and Gujarati speech into <slot>/voice.tsx.
 *
 * WHETHER THERE IS ANYTHING TO BAKE is decided by the slot's PINNED RUNTIME (lib/core/caps.mjs), not by the class: a tool on
 * a VOICED runtime (no `const SILENT_VOICE = true`: Class 4's r1-r21) is baked; a tool on a SILENT runtime (r30+, the owner's
 * decision of 2026-10-07) has nothing to bake, and the command says so and exits (printed Hindi and Gujarati lines are checked
 * by `check`, tr-coverage). `--force` still bakes a silent tool, for reference only: a silent runtime never plays the clips.
 * `voicePlan` is that decision as a pure function (unit-tested without a slot, a key or a network).
 *
 * Every line the runtime speaks for the tool (opening, teach, demo, questions, misses, ladder, closings,
 * "You learned", finish and free play, and api.say / demoDone literals) is taken in English, translated
 * through the tool's own TR table, turned into words (speakableIn) and cut into bubble pieces (pieces)
 * EXACTLY as runtime.tsx does at speak time, so every clip key is a piece the voice will ask for.
 * Clips come from Google Cloud Text-to-Speech (Chirp3-HD, OGG Opus) with the project's own key, are cached
 * in <class folder>/.voice-cache/ by voice + text (never billed twice), and are written inline as data: URIs, so
 * the local tool (preview, every check, the viewer) is one self-contained file. `publish` makes the SHIP copy
 * from it (lib/ship/voiceship.mjs): each clip becomes a <sha1>.ogg file beside the published tool and the
 * two lines below keep only a text -> file name index and the base URL (the host's 1 MB limit).
 * English is not baked: it keeps the device voice, which the English voice checks judge. */
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import Module from "node:module";
import { execFileSync } from "node:child_process";
import { CONFIG, CLASS_LABEL, fromRoot } from "../core/env.mjs";
import { capsFor } from "../core/caps.mjs";
import { idOf } from "../core/work.mjs";
import { sources } from "./preview.mjs";
import { loadServiceAccount, accessToken } from "../ship/gcs.mjs";

export const VOICES = { hi: "hi-IN-Chirp3-HD-Aoede", gu: "gu-IN-Chirp3-HD-Aoede" };

/* Google's Opus is ~33 kbps; speech re-encoded to 16 kbps mono (voip) halves every clip and still keeps
   Hindi and Gujarati consonants clear. ffmpeg: C4_FFMPEG, else the one imageio_ffmpeg ships in
   reasonify/Python-backend/.venv (nothing to install). */
function ffmpegPath() {
  if (process.env.C4_FFMPEG) return process.env.C4_FFMPEG;
  const dir = fromRoot("../../../Python-backend/.venv/Lib/site-packages/imageio_ffmpeg/binaries");
  const exe = fs.existsSync(dir) && fs.readdirSync(dir).find((n) => /^ffmpeg.*\.exe$/i.test(n));
  if (!exe) throw new Error("no ffmpeg: set C4_FFMPEG to an ffmpeg binary");
  return path.join(dir, exe);
}
function squeeze(raw, out, kbps) {
  execFileSync(ffmpegPath(), ["-hide_banner", "-loglevel", "error", "-y", "-i", raw, "-c:a", "libopus", "-b:a", kbps + "k",
    "-ac", "1", "-ar", "16000", "-application", "voip", out]);
}
const EXPORTS = ["PHASES", "OPENING", "FINISH_LINE", "FREE_LINE", "TR", "UI_STRINGS", "speakableIn", "pieces", "lineFor", "voicePieceLang"];

/* the combined source (runtime + mascot + tool) evaluated in Node: declarations only, nothing mounts */
async function evalTool(dir) {
  const { transformSync } = await import("esbuild");
  const { combined, tool } = sources(dir);
  let body = combined.split(/\r?\n/).filter((l) => !/^\s*import\s/.test(l)).join("\n")
    .replace(/export default [A-Za-z_$][\w$]*;\s*$/, "");
  body = "const useGestureDrag = () => () => ({});\nconst React = { createElement() { return null; } };\n" + body
    + "\nmodule.exports = {" + EXPORTS.map((n) => `${n}: typeof ${n} === "undefined" ? undefined : ${n}`).join(", ") + "};";
  const js = transformSync(body, { loader: "tsx", jsx: "transform", format: "cjs" }).code;
  const m = new Module(path.join(dir, "_voice_eval.js"));
  m.paths = Module._nodeModulePaths(fromRoot("."));
  m._compile(js, path.join(dir, "_voice_eval.js"));
  if (!m.exports.speakableIn || !m.exports.voicePieceLang) throw new Error("this slot's runtime has no Hindi/Gujarati speech (pin the chapter to r15 or later)");
  return { M: m.exports, tool };
}

/* every English line the runtime speaks for this tool */
function spokenLines(M, tool) {
  const en = [];
  const add = (x) => { for (const v of [].concat(x ?? [])) if (typeof v === "string" && v.trim()) en.push(v); };
  add(M.OPENING); add(M.FINISH_LINE); add(M.FREE_LINE);
  for (const p of M.PHASES || []) {
    add(p.says); add(p.demoLines); add(p.ladder); add(p.closing); add(p.learned);
    for (const it of p.items || []) { add(it.say || it.ask); add(it.miss); }
  }
  for (const m of tool.matchAll(/api\.(?:say|demoDone)\(\s*(\[[^\]]*\]|"(?:[^"\\]|\\.)*")/g)) { try { add(JSON.parse(m[1])); } catch { /* not a literal */ } }
  return [...new Set(en)];
}

async function synth(token, lang, text) {
  const r = await fetch("https://texttospeech.googleapis.com/v1/text:synthesize", {
    method: "POST", headers: { Authorization: "Bearer " + token, "Content-Type": "application/json" },
    body: JSON.stringify({ input: { text }, voice: { languageCode: lang + "-IN", name: VOICES[lang] }, audioConfig: { audioEncoding: "OGG_OPUS" } }),
  });
  const j = await r.json().catch(() => ({}));
  if (!r.ok || !j.audioContent) throw new Error(`TTS ${r.status}: ${(j.error && j.error.message) || "no audio"} ("${text.slice(0, 40)}")`);
  return Buffer.from(j.audioContent, "base64");
}

export const SILENT_NOTE = `${CLASS_LABEL} tools on a silent runtime (r30+) have nothing to bake. Printed Hindi and Gujarati lines are checked by \`check\` (tr-coverage).`;

/* bake or not: from the pinned runtime's capabilities (caps = capsOf(runtime source)), never from the class or a number.
   A voiced runtime always bakes; a silent one only with --force. */
export function voicePlan(caps, { force = false } = {}) {
  if (!caps || !caps.silent) return { bake: true, why: "voiced runtime: the lesson is spoken, Hindi and Gujarati come from baked clips" };
  if (force) return { bake: true, why: "silent runtime, --force: baked for reference only, never played" };
  return { bake: false, why: "silent runtime: nothing is spoken, nothing to bake" };
}

export async function bakeVoice(dir, { langs = ["hi", "gu"], kbps = 16, log = () => {}, force = false } = {}) {
  const plan = voicePlan(capsFor(dir), { force });
  if (!plan.bake) { log(SILENT_NOTE); return { silent: true, file: null, clips: 0, billed: 0, bytes: 0, untranslated: {} }; }
  const { M, tool } = await evalTool(dir);
  const en = spokenLines(M, tool);
  const want = new Map(), untranslated = {};
  for (const lang of langs) {
    if (!VOICES[lang]) throw new Error(`no voice for "${lang}" (hi, gu)`);
    untranslated[lang] = [];
    const push = (t) => { for (const p of M.pieces(M.speakableIn(t, lang))) if (M.voicePieceLang(p) === lang) want.set(p, lang); };
    for (const e of en) { const t = M.lineFor(e, lang, M.TR); if (t === e) untranslated[lang].push(e); else push(t); }
    if (!M.FREE_LINE && M.UI_STRINGS) push(M.UI_STRINGS[lang].freePlayLine);
  }
  const cacheDir = fromRoot(".voice-cache");
  fs.mkdirSync(cacheDir, { recursive: true });
  const jobs = [...want].map(([text, lang]) => ({ text, lang, file: path.join(cacheDir, crypto.createHash("sha1").update(VOICES[lang] + "\n" + text).digest("hex") + ".ogg") }));
  const todo = jobs.filter((j) => !fs.existsSync(j.file));
  let billed = 0;
  if (todo.length) {
    const token = await accessToken(loadServiceAccount(fromRoot(CONFIG.gcpKeyFile)), "https://www.googleapis.com/auth/cloud-platform");
    let next = 0;
    const worker = async () => { while (next < todo.length) { const j = todo[next++]; fs.writeFileSync(j.file, await synth(token, j.lang, j.text)); billed += j.text.length; } };
    await Promise.all(Array.from({ length: 4 }, worker));
  }
  for (const j of jobs) {
    const small = j.file.replace(/\.ogg$/, `.${kbps}k.ogg`);
    if (!fs.existsSync(small)) squeeze(j.file, small, kbps);
    j.clip = small;
  }
  const map = jobs.map((j) => `  ${JSON.stringify(j.text)}: "data:audio/ogg;base64,${fs.readFileSync(j.clip).toString("base64")}",`);
  const out = `/* GENERATED by \`node cli.mjs voice ${idOf(dir)}\` — ${langs.join(" + ")} speech, ${VOICES[langs[0]].replace(/^\w+-\w+-/, "")} (Google Cloud TTS), Opus ${kbps} kbps mono,
   one clip per bubble piece, keyed by the piece's exact text (runtime r15: baked or silent per language).
   Never edit or read by hand; re-run the command after changing the tool's lines or its TR table. */
const TOOL_VOICE: Record<string, string> = {
${map.join("\n")}
};
const TOOL_VOICE_BASE: string = "";
`;
  const file = path.join(dir, "voice.tsx");
  fs.writeFileSync(file, out);
  const per = Object.fromEntries(langs.map((l) => [l, jobs.filter((j) => j.lang === l).length]));
  log(`voice ${idOf(dir)}: ${jobs.length} clips (${langs.map((l) => `${l} ${per[l]}`).join(", ")}) · ${todo.length} new, ${billed} characters billed · voice.tsx ${(Buffer.byteLength(out) / 1024).toFixed(0)} KB`);
  for (const l of langs) if (untranslated[l].length) log(`  ${l}: ${untranslated[l].length} spoken line(s) have no TR entry (they stay silent in ${l}): ${untranslated[l].slice(0, 3).map((s) => JSON.stringify(s.slice(0, 40))).join(", ")}${untranslated[l].length > 3 ? " …" : ""}`);
  return { file, clips: jobs.length, billed, bytes: Buffer.byteLength(out), untranslated };
}
