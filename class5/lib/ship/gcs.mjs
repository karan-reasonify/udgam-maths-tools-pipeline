/* Google Cloud Storage access with the injected service-account key (config.json).
 * No SDK: a signed JWT is exchanged for an OAuth token with node:crypto + fetch.
 * Stage 0 only needs the token (doctor proves the key works). Upload + md5 verify
 * arrive with publish in Stage 2.
 */
import fs from "node:fs";
import crypto from "node:crypto";

export function loadServiceAccount(file) {
  if (!fs.existsSync(file)) throw new Error(`service-account key not found: ${file}`);
  const sa = JSON.parse(fs.readFileSync(file, "utf8"));
  if (sa.type !== "service_account" || !sa.client_email || !sa.private_key)
    throw new Error("config.json is not a service-account key");
  return sa;
}

const b64url = (buf) => Buffer.from(buf).toString("base64").replace(/=+$/, "").replace(/\+/g, "-").replace(/\//g, "_");

/* fetch that survives this machine's flaky route to Google: a thrown network error, a 429 or a 5xx is retried
   (1.5 s, 3 s, 4.5 s ...); any other answer, including a 4xx, is returned as it is */
export async function fetchRetry(url, opts, tries = 5) {
  let last;
  for (let i = 0; i < tries; i++) {
    try {
      const r = await fetch(url, opts);
      if (r.status !== 429 && r.status < 500) return r;
      last = new Error(`HTTP ${r.status}`);
    } catch (e) { last = e; }
    await new Promise((res) => setTimeout(res, 1500 * (i + 1)));
  }
  throw last;
}

export async function accessToken(sa, scope = "https://www.googleapis.com/auth/devstorage.read_only") {
  const now = Math.floor(Date.now() / 1000);
  const tokenUri = sa.token_uri || "https://oauth2.googleapis.com/token";
  const head = b64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claim = b64url(JSON.stringify({ iss: sa.client_email, scope, aud: tokenUri, iat: now, exp: now + 3600 }));
  const sig = crypto.createSign("RSA-SHA256").update(`${head}.${claim}`).sign(sa.private_key);
  const res = await fetchRetry(tokenUri, {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion: `${head}.${claim}.${b64url(sig)}` }),
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok || !body.access_token) throw new Error(`token exchange failed: HTTP ${res.status} ${body.error || ""} ${body.error_description || ""}`.trim());
  return body.access_token;
}

/* Read-only probe: can this key see the bucket? 403 here does not rule out object writes. */
export async function probeBucket(token, bucket) {
  const res = await fetch(`https://storage.googleapis.com/storage/v1/b/${encodeURIComponent(bucket)}`, {
    headers: { authorization: `Bearer ${token}` },
  });
  return res.status;
}
