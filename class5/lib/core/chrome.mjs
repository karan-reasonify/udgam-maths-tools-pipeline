/* Where Chrome is, and how to run it headless without the three failures the old
 * pipeline paid for:
 *   - parallel runs sharing one profile lock and dying with status 4294967295
 *     -> every run gets its own throwaway --user-data-dir, and a bounded, LOUD retry;
 *   - no timeout, leaving orphaned chrome.exe for hours -> every run is bounded;
 *   - --screenshot failing silently with exit 0 -> the file is checked on disk.
 * Under --virtual-time-budget Chrome advances TIMERS, not the animation clock, so any
 * page-side waiting must use setTimeout, never requestAnimationFrame.
 */
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFile, execFileSync } from "node:child_process";

export function chromePath() {
  const candidates = [
    process.env.CHROME_PATH,
    "C:/Program Files/Google/Chrome/Application/chrome.exe",
    "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
    path.join(os.homedir(), "AppData/Local/Google/Chrome/Application/chrome.exe"),
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/usr/bin/google-chrome",
  ].filter(Boolean);
  return candidates.find((p) => fs.existsSync(p)) || null;
}

export const HEADLESS = [
  "--headless=new", "--disable-gpu", "--no-sandbox", "--hide-scrollbars", "--mute-audio",
  "--no-first-run", "--no-default-browser-check", "--allow-file-access-from-files",
  "--force-prefers-reduced-motion",
];

const CONTENTION = /Abnormal renderer termination|DevToolsActivePort|ProcessSingleton|profile.*in use/i;

/* A SIGKILLed Chrome (below, and cdpSession's own timeout) gets no chance to clean its own temp
   scratch, and a killed node process skips the try/finally that removes our --user-data-dir too.
   Run across several parallel sessions for three days this filled a 276 GB drive with leftover
   profile dirs (found 2026-09-23, BUILD_CARD.md §6). Swept once per process, before the first
   launch: only our own uniquely-named dirs, idle 2+ hours (a live parallel run's profile is never
   touched, however old the run). Chrome's own "scoped_dir*" scratch is not ours to delete
   unattended — it names no run of ours and nothing here can tell it apart from another app's; a
   doctor warning surfaces it instead, for a human to clear the way it was cleared this time.
   No byte size here, and a small budget: `rmSync` on a stale profile still walks its own
   cache/IndexedDB files under the hood, and against a few thousand of them a first, uncapped
   sweep ran past two minutes — unacceptable stacked onto every check's start. The hot path (every
   launch below) takes a few dirs and a ~1.5 s budget, leaving the rest for the next launch or two;
   `doctor`, run deliberately and far less often, asks for the thorough one. */
let swept = false;
export function sweepChromeTemp({ cap = 6, budgetMs = 1500 } = {}) {
  if (swept) return { removed: 0 };
  swept = true;
  const tmp = os.tmpdir(), cutoff = Date.now() - 2 * 60 * 60 * 1000, t0 = Date.now();
  let entries;
  try { entries = fs.readdirSync(tmp); } catch { return { removed: 0 }; }
  let removed = 0;
  for (const name of entries) {
    if (removed >= cap || Date.now() - t0 > budgetMs) break;
    if (!/^c4(chrome|cdp)-/.test(name)) continue;
    const p = path.join(tmp, name);
    try {
      const st = fs.statSync(p);
      if (!st.isDirectory() || st.mtimeMs > cutoff) continue;
      fs.rmSync(p, { recursive: true, force: true });
      removed++;
    } catch {}
  }
  return { removed };
}
/* doctor's own call: thorough, since a human is deliberately waiting on it. Re-arms `swept` first,
   so it is never skipped by an earlier, capped sweep from this same process. */
export function sweepChromeTempThorough() {
  swept = false;
  return sweepChromeTemp({ cap: 5000, budgetMs: 60000 });
}
/* Read-only, for `doctor`: ours (already swept above) vs. Chrome's own scoped_dir* scratch, which
   this file does not touch. A count only — sizing thousands of them is slow and doctor just warns. */
export function chromeTempReport() {
  const tmp = os.tmpdir();
  let entries;
  try { entries = fs.readdirSync(tmp); } catch { return null; }
  let scoped = 0;
  for (const name of entries) if (name.startsWith("scoped_dir")) scoped++;
  return { tmp, scoped };
}

export function runChrome(args, { attempts = 3, label = "chrome", timeout = 180000 } = {}) {
  const chrome = chromePath();
  if (!chrome) throw new Error("Chrome not found; set CHROME_PATH");
  sweepChromeTemp();
  let lastErr;
  for (let i = 1; i <= attempts; i++) {
    const profile = fs.mkdtempSync(path.join(os.tmpdir(), "c4chrome-"));
    try {
      return execFileSync(chrome, ["--user-data-dir=" + profile, ...args], {
        encoding: "utf8", maxBuffer: 1 << 28, timeout, killSignal: "SIGKILL",
        stdio: ["ignore", "pipe", "pipe"],
      });
    } catch (e) {
      lastErr = e;
      const said = String(e?.stderr || "") + String(e?.message || "");
      const timedOut = e?.signal === "SIGKILL" || e?.code === "ETIMEDOUT";
      const contended = CONTENTION.test(said) || e?.status === 4294967295 || timedOut;
      if (!contended || i === attempts) {
        if (timedOut) console.log(`    ${label}: chrome did not exit within ${timeout} ms and was killed (a hang, not a slow machine)`);
        throw e;
      }
      console.log(`    ${label}: chrome died (status ${e?.status}${timedOut ? ", timed out" : ""}), attempt ${i} of ${attempts}, retrying`);
      Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 400 * i);
    } finally {
      try { fs.rmSync(profile, { recursive: true, force: true }); } catch {}
    }
  }
  throw lastErr;
}

/* One PNG, verified on disk: missing, empty or unchanged is an error, never a quiet pass. */
export function screenshot(url, png, { width = 1600, height = 900, budget = 8000, label = "shot" } = {}) {
  const before = fs.existsSync(png) ? fs.statSync(png).mtimeMs : null;
  runChrome([...HEADLESS, `--window-size=${width},${height}`, `--virtual-time-budget=${budget}`,
    `--screenshot=${png}`, url], { label });
  const st = fs.existsSync(png) ? fs.statSync(png) : null;
  if (!st || st.size === 0 || st.mtimeMs === before)
    throw new Error(`NOT CAPTURED: ${png} (${!st ? "no file" : st.size === 0 ? "0 bytes" : "unchanged"})`);
  return st.size;
}

/* The page's DOM after its scripts ran under virtual time (used to read results a page writes). */
export function dumpDom(url, { width = 1600, height = 900, budget = 8000, label = "dom" } = {}) {
  return runChrome([...HEADLESS, `--window-size=${width},${height}`, `--virtual-time-budget=${budget}`,
    "--dump-dom", url], { label });
}

/* The same, without blocking, so the checks can run several pages at once. */
export function runChromeAsync(args, { label = "chrome", timeout = 240000 } = {}) {
  const chrome = chromePath();
  if (!chrome) return Promise.reject(new Error("Chrome not found; set CHROME_PATH"));
  sweepChromeTemp();
  return new Promise((resolve, reject) => {
    const profile = fs.mkdtempSync(path.join(os.tmpdir(), "c4chrome-"));
    execFile(chrome, ["--user-data-dir=" + profile, ...args], { encoding: "utf8", maxBuffer: 1 << 28, timeout, killSignal: "SIGKILL" },
      (err, stdout) => {
        try { fs.rmSync(profile, { recursive: true, force: true }); } catch {}
        if (err) reject(new Error(`${label}: ${err.signal === "SIGKILL" ? "chrome hung and was killed" : err.message.split("\n")[0]}`));
        else resolve(stdout);
      });
  });
}
export const dumpDomAsync = (url, { width = 1600, height = 900, budget = 8000, label = "dom" } = {}) =>
  runChromeAsync([...HEADLESS, `--window-size=${width},${height}`, `--virtual-time-budget=${budget}`, "--dump-dom", url], { label });
export async function screenshotAsync(url, png, { width = 1600, height = 900, budget = 8000, label = "shot" } = {}) {
  await runChromeAsync([...HEADLESS, `--window-size=${width},${height}`, `--virtual-time-budget=${budget}`, `--screenshot=${png}`, url], { label });
  const st = fs.existsSync(png) ? fs.statSync(png) : null;
  if (!st || st.size === 0) throw new Error(`NOT CAPTURED: ${png}`);
  return st.size;
}

/* run jobs with at most `n` at a time, keeping their order */
export async function pool(jobs, n = 4) {
  const out = new Array(jobs.length);
  let next = 0;
  await Promise.all(Array.from({ length: Math.min(n, jobs.length) }, async () => {
    while (next < jobs.length) { const k = next++; try { out[k] = { ok: true, value: await jobs[k]() }; } catch (e) { out[k] = { ok: false, error: e }; } }
  }));
  return out;
}

/* A live page driven through the DevTools protocol, for what --dump-dom cannot do: real mouse,
 * touch and key input (a drag that the tool unmounts mid-way, focus left on a key). Chrome picks
 * its own port (written to the throwaway profile), so parallel sessions never clash. Real time,
 * not virtual: keep what `fn` waits for short. */
export async function cdpSession(url, fn, { width = 1600, height = 900, label = "cdp", timeout = 90000, reducedMotion = true } = {}) {
  const chrome = chromePath();
  if (!chrome) throw new Error("Chrome not found; set CHROME_PATH");
  sweepChromeTemp();
  const profile = fs.mkdtempSync(path.join(os.tmpdir(), "c4cdp-"));
  const proc = execFile(chrome, ["--user-data-dir=" + profile, ...HEADLESS.filter((x) => reducedMotion || x !== "--force-prefers-reduced-motion"), "--remote-debugging-port=0", `--window-size=${width},${height}`, "about:blank"], { timeout: timeout + 10000, killSignal: "SIGKILL" }, () => {});
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  let ws = null, id = 0, timer = null;
  const pend = new Map();
  try {
    return await Promise.race([
      new Promise((_, rej) => { timer = setTimeout(() => rej(new Error(`${label}: timed out`)), timeout); }),
      (async () => {
        let port = null;
        for (let k = 0; k < 120 && !port; k++) { try { port = fs.readFileSync(path.join(profile, "DevToolsActivePort"), "utf8").split("\n")[0].trim(); } catch { await wait(100); } }
        if (!port) throw new Error(`${label}: Chrome did not open its debugging port`);
        let pages = null;
        for (let k = 0; k < 50 && !pages; k++) { try { pages = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json(); } catch { await wait(100); } }
        ws = new WebSocket(pages.find((t) => t.type === "page").webSocketDebuggerUrl);
        await new Promise((res, rej) => { ws.onopen = res; ws.onerror = () => rej(new Error(`${label}: no DevTools socket`)); });
        const logs = [];
        ws.onmessage = (m) => {
          const d = JSON.parse(m.data);
          if (d.id && pend.has(d.id)) { pend.get(d.id)(d.result || { error: d.error }); pend.delete(d.id); return; }
          if (d.method === "Runtime.consoleAPICalled" && /error|warn/.test(d.params.type)) logs.push(`${d.params.type}: ${(d.params.args || []).map((x) => x.value ?? x.description ?? "").join(" ").slice(0, 300)}`);
          if (d.method === "Runtime.exceptionThrown") logs.push(`exception: ${(d.params.exceptionDetails.exception && d.params.exceptionDetails.exception.description || d.params.exceptionDetails.text || "").slice(0, 300)}`);
          if (d.method === "Log.entryAdded" && /error|warning/.test(d.params.entry.level)) logs.push(`${d.params.entry.level}: ${String(d.params.entry.text).slice(0, 300)}`);
        };
        const send = (method, params = {}) => new Promise((r) => { const i = ++id; pend.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
        const ev = async (expr) => { const r = await send("Runtime.evaluate", { expression: expr, returnByValue: true, awaitPromise: true }); return r.result ? r.result.value : undefined; };
        const until = async (expr, ms = 20000) => { const t0 = Date.now(); while (Date.now() - t0 < ms) { if (await ev(expr)) return true; await wait(100); } return false; };
        const centre = (sel) => ev(`(() => { const e = document.querySelector(${JSON.stringify(sel)}); if (!e) return null; const r = e.getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + r.height / 2 }; })()`);
        const mouse = (type, x, y) => send("Input.dispatchMouseEvent", { type, x, y, button: "left", buttons: type === "mousePressed" || type === "mouseMoved" ? 1 : 0, clickCount: 1 });
        const touch = (type, x, y) => send("Input.dispatchTouchEvent", { type, touchPoints: type === "touchEnd" ? [] : [{ x, y, id: 1 }] });
        const click = async (sel) => { const b = await centre(sel); if (!b) return false; await send("Input.dispatchMouseEvent", { type: "mouseMoved", x: b.x, y: b.y, button: "none", buttons: 0 }); await mouse("mousePressed", b.x, b.y); await wait(40); await mouse("mouseReleased", b.x, b.y); await wait(120); return true; };
        const drag = async (sel, dx, dy, how = "mouse") => {
          const b = await centre(sel); if (!b) return false;
          const at = (i) => [b.x + (dx * i) / 15, b.y + (dy * i) / 15];
          if (how === "touch") { await touch("touchStart", b.x, b.y); for (let i = 1; i <= 15; i++) { await touch("touchMove", ...at(i)); await wait(16); } await touch("touchEnd", ...at(15)); }
          else { await send("Input.dispatchMouseEvent", { type: "mouseMoved", x: b.x, y: b.y, button: "none", buttons: 0 }); await mouse("mousePressed", b.x, b.y); for (let i = 1; i <= 15; i++) { await mouse("mouseMoved", ...at(i)); await wait(16); } await mouse("mouseReleased", ...at(15)); }
          return true;
        };
        const key = async (k, code = k, vk = 0, text) => { await send("Input.dispatchKeyEvent", { type: "keyDown", key: k, code, windowsVirtualKeyCode: vk, ...(text ? { text } : {}) }); await send("Input.dispatchKeyEvent", { type: "keyUp", key: k, code, windowsVirtualKeyCode: vk }); };
        const shot = async (file) => { const r = await send("Page.captureScreenshot", { format: "png" }); fs.writeFileSync(file, Buffer.from(r.data, "base64")); return file; };
        await send("Runtime.enable"); await send("Log.enable");
        await send("Emulation.setDeviceMetricsOverride", { width, height, deviceScaleFactor: 1, mobile: false });
        await send("Emulation.setTouchEmulationEnabled", { enabled: true, maxTouchPoints: 1 });
        await send("Page.navigate", { url });
        return await fn({ send, ev, until, wait, centre, click, drag, key, touch, shot, logs });
      })(),
    ]);
  } finally {
    clearTimeout(timer);
    try { ws && ws.close(); } catch {}
    try { proc.kill("SIGKILL"); } catch {}
    await wait(300);
    try { fs.rmSync(profile, { recursive: true, force: true }); } catch {}
  }
}
