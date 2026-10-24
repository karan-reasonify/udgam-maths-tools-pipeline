/* Gemini API connector for the tool visual design pass and syntax repair.
 * Uses native fetch with exponential backoff on transient errors.
 */
import { env } from "../core/env.mjs";

const BASE = "https://generativelanguage.googleapis.com/v1beta";
const DEFAULT_MODEL = "gemini-3.5-flash";
const THINKING_BUDGET = 8192;

export class GeminiDesignError extends Error {
  constructor(kind, message, extra = {}) {
    super(message);
    this.kind = kind;
    Object.assign(this, extra);
  }
}

function apiKey() {
  const k = env().get("GEMINI_API_KEY");
  if (!k) throw new GeminiDesignError("auth", "GEMINI_API_KEY is not set (maths_pipeline/.env, Python-backend/.env or process env)");
  return k;
}

function scrub(s) {
  let t = String(s ?? "");
  const k = env().get("GEMINI_API_KEY");
  if (k) t = t.split(k).join("[key]");
  return t.replace(/([?&]key=)[^&\s"]+/g, "$1[key]").slice(0, 400);
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export function extractCodeBlock(text) {
  if (!text) return "";
  const m = /```(?:tsx|typescript|jsx|javascript)?\s*\n([\s\S]*?)\n```/i.exec(text);
  if (m && m[1]) return m[1].trim();

  // If the fence was cut off or not closed properly
  const openFence = /```(?:tsx|typescript|jsx|javascript)?\s*\n([\s\S]*)$/i.exec(text);
  if (openFence && openFence[1]) return openFence[1].trim();

  return text.trim();
}

export async function callGeminiGenerate({
  prompt,
  model = null,
  temperature = 0.4,
  thinkingBudget = THINKING_BUDGET,
  maxOutputTokens = 65536,
  timeout = 300000,
  maxRetries = 3,
  log = console.log,
} = {}) {
  const resolvedModel = model || env().get("ORCH_GEMINI_MODEL") || DEFAULT_MODEL;
  const key = apiKey();
  const url = `${BASE}/models/${resolvedModel}:generateContent`;

  const body = {
    contents: [
      {
        role: "user",
        parts: [{ text: prompt }],
      },
    ],
    generationConfig: {
      temperature,
      maxOutputTokens,
      thinkingConfig: {
        thinkingBudget,
      },
    },
  };

  let lastError = null;
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "x-goog-api-key": key,
          "content-type": "application/json",
        },
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(timeout),
      });

      if (!res.ok) {
        const text = await res.text();
        let j = null;
        try { j = JSON.parse(text); } catch {}
        const msg = scrub((j && j.error && j.error.message) || text.slice(0, 300));
        const kind = res.status === 429 ? "quota" : res.status >= 500 ? "server" : "bad-request";

        if ((res.status === 429 || res.status >= 500) && attempt < maxRetries) {
          const delay = attempt * 4000;
          if (log) log(`  [gemini] ${kind} (${res.status}) on attempt ${attempt}, retrying in ${delay / 1000}s...`);
          await sleep(delay);
          continue;
        }
        throw new GeminiDesignError(kind, `HTTP ${res.status}: ${msg}`, { status: res.status });
      }

      const data = await res.json();
      const candidate = (data.candidates && data.candidates[0]) || null;
      if (!candidate || !candidate.content || !candidate.content.parts) {
        throw new GeminiDesignError("empty", "Gemini returned empty candidate or parts");
      }

      const text = candidate.content.parts.map((p) => p.text || "").join("");
      const finishReason = candidate.finishReason;
      const usage = data.usageMetadata || {};

      return {
        text,
        code: extractCodeBlock(text),
        model: resolvedModel,
        finishReason,
        usage: {
          promptTokens: usage.promptTokenCount || 0,
          candidatesTokens: usage.candidatesTokenCount || 0,
          totalTokens: usage.totalTokenCount || 0,
          thoughtsTokens: usage.thoughtsTokenCount || 0,
          cachedTokens: usage.cachedContentTokenCount || 0,
        },
      };
    } catch (e) {
      lastError = e;
      if (e instanceof GeminiDesignError && (e.kind === "auth" || e.kind === "bad-request")) {
        throw e;
      }
      if (attempt < maxRetries) {
        const delay = attempt * 3000;
        if (log) log(`  [gemini] error attempt ${attempt}: ${scrub(e.message)}, retrying in ${delay / 1000}s...`);
        await sleep(delay);
      }
    }
  }

  throw lastError || new GeminiDesignError("unknown", "All retry attempts failed");
}
