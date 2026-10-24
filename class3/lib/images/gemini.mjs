/* Gemini image generation over REST (no SDK, no new dependency): the interactive lane and the batch lane.
 *
 * The key is read only through lib/core/env.mjs and travels only in the x-goog-api-key header: never in a
 * URL, never in a log line, and every error message is scrubbed of it before it is thrown.
 *
 *   generateImage({ prompt, aspect, model })            one picture, one model -> { buf, mime, model, usage }
 *   generateWithFallback({ prompt, aspect, models })    cheapest model first, the next only on an error
 *   batchSubmit / batchStatus / batchCollect / batchCancel   Gemini batch mode (half price, slower)
 *
 * Error kinds (GeminiError.kind): auth · quota · server · network · not-found · bad-request · blocked · no-image.
 * A blocked prompt is never retried on another model: the prompt has to change.
 */
import { env, CLASS_NUM } from "../core/env.mjs";

const BASE = "https://generativelanguage.googleapis.com/v1beta";

export class GeminiError extends Error {
  constructor(kind, message, extra = {}) { super(message); this.kind = kind; Object.assign(this, extra); }
}

function apiKey() {
  const k = env().get("GEMINI_API_KEY");
  if (!k) throw new GeminiError("auth", "GEMINI_API_KEY is not set (maths_pipeline/.env, Python-backend/.env or the process env)");
  return k;
}

/* nothing that came back from the network may carry the key into a log */
function scrub(s) {
  let t = String(s ?? "");
  const k = env().get("GEMINI_API_KEY");
  if (k) t = t.split(k).join("[key]");
  return t.replace(/([?&]key=)[^&\s"]+/g, "$1[key]").slice(0, 400);
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function call(method, pathname, body, { timeout = 180000, raw = false } = {}) {
  let r;
  try {
    r = await fetch(`${BASE}/${pathname}`, {
      method,
      headers: { "x-goog-api-key": apiKey(), ...(body ? { "content-type": "application/json" } : {}) },
      body: body ? JSON.stringify(body) : undefined,
      signal: AbortSignal.timeout(timeout),
    });
  } catch (e) {
    if (e instanceof GeminiError) throw e;
    throw new GeminiError("network", `network: ${scrub(e && (e.cause && e.cause.message || e.message))}`);
  }
  if (raw && r.ok) return r;
  const text = await r.text();
  let j = null;
  try { j = JSON.parse(text); } catch {}
  if (!r.ok) {
    const msg = scrub((j && j.error && j.error.message) || text.slice(0, 300));
    const kind = r.status === 429 ? "quota" : r.status === 401 || r.status === 403 ? "auth"
      : r.status === 404 ? "not-found" : r.status >= 500 ? "server" : "bad-request";
    let retryAfterMs = Number(r.headers.get("retry-after")) * 1000 || 0;
    for (const d of (j && j.error && j.error.details) || []) {
      const m = /^(\d+(?:\.\d+)?)s$/.exec(String(d.retryDelay || ""));
      if (m) retryAfterMs = Math.max(retryAfterMs, Number(m[1]) * 1000);
    }
    throw new GeminiError(kind, `HTTP ${r.status} ${kind}: ${msg}`, { status: r.status, retryAfterMs });
  }
  return j;
}

export function requestBody(prompt, aspect, modalities = ["IMAGE"]) {
  return {
    contents: [{ role: "user", parts: [{ text: prompt }] }],
    generationConfig: { responseModalities: modalities, ...(aspect ? { imageConfig: { aspectRatio: aspect } } : {}) },
  };
}

const BLOCKED = /SAFETY|PROHIBITED|BLOCKLIST|SPII|RECITATION/i;
const usageOf = (resp) => {
  const u = (resp && resp.usageMetadata) || {};
  return { prompt: u.promptTokenCount || 0, output: u.candidatesTokenCount || 0, total: u.totalTokenCount || 0 };
};

/* one GenerateContentResponse -> the first inline image; a refusal or a text-only answer is a typed error.
   `billed` on the error says a 200 came back (an answer without a picture still costs its input tokens). */
export function imageFrom(resp) {
  const usage = usageOf(resp);
  const block = resp && resp.promptFeedback && resp.promptFeedback.blockReason;
  if (block) throw new GeminiError("blocked", `prompt blocked (${block}); reword the object prompt`, { billed: true, usage });
  const cands = (resp && resp.candidates) || [];
  for (const c of cands) {
    for (const p of (c.content && c.content.parts) || []) {
      const inl = p.inlineData || p.inline_data;
      if (inl && inl.data) return { buf: Buffer.from(inl.data, "base64"), mime: inl.mimeType || inl.mime_type || "image/png", usage, finish: c.finishReason || "" };
    }
  }
  const finish = cands.map((c) => c.finishReason).filter(Boolean).join(",") || "none";
  const said = cands.flatMap((c) => ((c.content && c.content.parts) || []).map((p) => p.text).filter(Boolean)).join(" ").slice(0, 160);
  if (BLOCKED.test(finish)) throw new GeminiError("blocked", `no picture: refused (${finish}); reword the object prompt`, { billed: true, usage });
  throw new GeminiError("no-image", `no picture in the answer (finish ${finish})${said ? `; it said: "${scrub(said)}"` : ""}`, { billed: true, usage });
}

/* one picture from one model. A 400 about the request shape (an image-only answer, the aspect field) is retried
   once in the plainer shape; 400s are not billed. */
export async function generateImage({ prompt, aspect, model }) {
  const shapes = [{ mod: ["IMAGE"], aspect }, { mod: ["TEXT", "IMAGE"], aspect }, { mod: ["TEXT", "IMAGE"], aspect: null }];
  let last;
  for (let i = 0; i < shapes.length; i++) {
    const s = shapes[i];
    if (i === 2 && !aspect) break;
    try {
      const resp = await call("POST", `models/${encodeURIComponent(model)}:generateContent`, requestBody(prompt, s.aspect, s.mod));
      const got = imageFrom(resp);
      return { ...got, model, aspectSent: s.aspect || null };
    } catch (e) {
      last = e;
      if (!(e instanceof GeminiError) || e.kind !== "bad-request") throw e;
      if (!/modalit|aspect|imageConfig|image_config|response/i.test(e.message)) throw e;
    }
  }
  throw last;
}

/* the cheapest model first; a quota or server error waits once and retries the same model, then moves on.
   `onBilled(info)` is called for every 200 (so the ledger sees a refused or text-only answer too). */
export async function generateWithFallback({ prompt, aspect, models, log = () => {}, onBilled = () => {} }) {
  const errors = [];
  for (const model of models) {
    for (let tryNo = 1; tryNo <= 2; tryNo++) {
      try {
        const got = await generateImage({ prompt, aspect, model });
        onBilled({ model, ok: true, usage: got.usage, bytes: got.buf.length, mime: got.mime });
        return { ...got, errors };
      } catch (e) {
        if (!(e instanceof GeminiError)) throw e;
        if (e.billed) onBilled({ model, ok: false, usage: e.usage, kind: e.kind });
        errors.push(`${model}: ${e.message}`);
        if (e.kind === "auth" || e.kind === "blocked") throw e;
        if ((e.kind === "quota" || e.kind === "server" || e.kind === "network") && tryNo === 1) {
          const wait = Math.min(Math.max(e.retryAfterMs || 0, 4000), 60000);
          log(`    ${model}: ${e.kind}, waiting ${Math.round(wait / 1000)} s and trying once more`);
          await sleep(wait);
          continue;
        }
        if (e.kind === "no-image" && tryNo === 1) continue;
        break;
      }
    }
    if (models.length > 1 && model !== models[models.length - 1]) log(`    ${model} failed; falling back to the next model`);
  }
  throw new GeminiError("failed", `every model failed: ${errors.join(" | ")}`, { errors });
}

/* ── batch mode ─────────────────────────────────────────────────────────────────────────────
   One job, inline requests, each tagged with metadata.key so results map back by key (and by order
   when a response carries no metadata). States come back as BATCH_STATE_* over REST (JOB_STATE_* in
   the SDKs): both are accepted. */
const PENDING = /PENDING|QUEUED|RUNNING|UNSPECIFIED|UPDATING|PAUSED/;
export const batchPending = (state) => PENDING.test(String(state || ""));
export const batchSucceeded = (state) => /SUCCEEDED/.test(String(state || ""));

export async function batchSubmit({ model, items, label = "images" }) {
  if (!items.length) throw new Error("batchSubmit: nothing to submit");
  const body = {
    batch: {
      display_name: `udgam${CLASS_NUM}-${label}`.slice(0, 60),
      input_config: { requests: { requests: items.map((it) => ({ request: requestBody(it.prompt, it.aspect, ["IMAGE"]), metadata: { key: it.key } })) } },
    },
  };
  const op = await call("POST", `models/${encodeURIComponent(model)}:batchGenerateContent`, body, { timeout: 120000 });
  const name = op.name || (op.metadata && op.metadata.name);
  if (!name) throw new GeminiError("bad-request", `batch submit returned no job name: ${scrub(JSON.stringify(op).slice(0, 200))}`);
  return { name, model, state: (op.metadata && op.metadata.state) || "BATCH_STATE_PENDING" };
}

export async function batchStatus(name) {
  const op = await call("GET", name, null, { timeout: 120000 });
  const md = op.metadata || {};
  const state = md.state || (op.done ? (op.error ? "BATCH_STATE_FAILED" : "BATCH_STATE_SUCCEEDED") : "BATCH_STATE_PENDING");
  return { name, state, done: !!op.done, stats: md.batchStats || null, error: op.error ? scrub(op.error.message) : null, op };
}

/* -> { state, results: { key: { buf, mime, usage } | { error } }, order: [keys in response order] } */
export async function batchCollect(name, keysInOrder = []) {
  const st = await batchStatus(name);
  const out = { state: st.state, done: st.done, stats: st.stats, error: st.error, results: {} };
  if (!batchSucceeded(st.state)) return out;
  const res = st.op.response || (st.op.metadata && st.op.metadata.output) || {};
  let list = (res.inlinedResponses && (res.inlinedResponses.inlinedResponses || res.inlinedResponses)) || null;
  if (!Array.isArray(list) && res.responsesFile) {
    /* large jobs answer in a JSONL file instead of inline */
    const r = await call("GET", `../download/v1beta/${res.responsesFile}:download?alt=media`, null, { timeout: 300000, raw: true });
    list = (await r.text()).split(/\r?\n/).filter((l) => l.trim()).map((l) => { try { return JSON.parse(l); } catch { return {}; } });
  }
  (Array.isArray(list) ? list : []).forEach((row, i) => {
    const key = (row.metadata && row.metadata.key) || row.key || keysInOrder[i] || `#${i}`;
    if (row.error) { out.results[key] = { error: scrub(row.error.message || JSON.stringify(row.error)) }; return; }
    try { out.results[key] = imageFrom(row.response || row); }
    catch (e) { out.results[key] = { error: e.message, billed: !!e.billed, usage: e.usage }; }
  });
  return out;
}

export async function batchCancel(name) {
  await call("POST", `${name}:cancel`, {}, { timeout: 60000 });
  return batchStatus(name);
}
