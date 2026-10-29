/* `node cli.mjs images ...`: skins for a slot or a chapter (docs/IMAGES.md).
 *
 *   images make  <MEDIA_ID> [--ch N] [--force] [--only key] [--dry] [--model name]
 *   images make  --ch N [--batch] [--force] [--dry] [--model name]
 *   images batch submit|status|apply|cancel --ch N [--model name]
 *   images sheet <MEDIA_ID> [--ch N]            <slot>/images-preview.png
 *   images status [--ch N]
 *   images list
 *
 * The image agent writes <slot>/images.json (which objects, why, the short prompt); this never invents a prompt.
 * Resolution, cheapest first: a skin already in the library (free) -> a raw picture already in the cache, re-cut
 * (free) -> one new generation (billed, ledgered). A chapter run collects the missing pictures of every slot first
 * and makes each unique one once. The library and the cache are this class's own first, then the sibling classes'
 * the config lists (`skinLibraries`), read-only (library.mjs): what another class already paid for is never billed again.
 * The keypad THEME (theme.mjs) is resolved and written only for a slot whose pinned runtime has one (caps.theme).
 */
import fs from "node:fs";
import path from "node:path";
import { parseArgs } from "../core/args.mjs";
import { pool, chromePath } from "../core/chrome.mjs";
import { resolveTarget, workRoot, idOf, chapterOf } from "../core/work.mjs";
import { chapterIdFor } from "../plan/lp.mjs";
import { env, mask, fromRoot } from "../core/env.mjs";
import { BUDGET, slotBudget, skinBudget, CONCURRENCY, MAX_ATTEMPTS, MODELS, modelsFor, KINDS, price, rawKey, skinHash, buildPrompt, validatePlan, kitPrompt } from "./rules.mjs";
import { generateWithFallback, batchSubmit, batchStatus, batchCollect, batchCancel, batchPending, batchSucceeded, GeminiError } from "./gemini.mjs";
import { makeSkin } from "./process.mjs";
import { findRaw, saveRaw, saveRejected, getSkin, putSkin, markUsed, pruneUsed, skinUri, readIndex, ledgerAdd, ledgerTotals, LIB_DIR, writeJsonAtomic, siblings, readSiblingIndex } from "./library.mjs";
import { emitSlot, readEmitted, readTheme } from "./emit.mjs";
import { resolveTheme, validateTheme } from "./theme.mjs";
import { contactSheet } from "./sheet.mjs";
import { capsFor } from "../core/caps.mjs";

const kb = (n) => `${(n / 1024).toFixed(1)} KB`;
const usd = (n) => `$${n.toFixed(3)}`;
const pad = (s, n) => String(s ?? "").padEnd(n);
const BATCH_FILE = "_images_batch.json";
const budgetOf = (img) => skinBudget(img.kind, img.maxKB, img.look);
/* a photo object's reference photograph, inline (rules.mjs validatePlan resolved and keyed it) */
const refsOf = (img) => (img.refFile ? [{ mime: /\.png$/i.test(img.refFile) ? "image/png" : /\.webp$/i.test(img.refFile) ? "image/webp" : "image/jpeg", data: fs.readFileSync(img.refFile).toString("base64") }] : []);

/* the run's own cap: at most MAX_ATTEMPTS billed generations per picture per process */
const attemptsUsed = new Map();

/* a slot: an existing folder that holds images.json is taken as it is (a scratch folder outside work/), anything
   else goes through the usual resolver (<MEDIA_ID> --ch N, <chapter_id>/<MEDIA_ID>, a work folder) */
function slotDir(target, a) {
  const p = target ? path.resolve(String(target)) : "";
  if (p && fs.existsSync(path.join(p, "images.json")) && fs.statSync(p).isDirectory()) return p;
  return resolveTarget(target, a);
}
const fromNote = (x) => (x && x.from ? ` from ${x.from}` : "");

function readPlan(dir) {
  const f = path.join(dir, "images.json");
  if (!fs.existsSync(f)) return null;
  let plan;
  try { plan = JSON.parse(fs.readFileSync(f, "utf8")); }
  catch (e) { throw new Error(`${f} is not valid JSON (${e.message.slice(0, 80)})`); }
  return { ...validatePlan(plan, idOf(dir)), file: f };
}

/* one slot's plan -> what each key needs */
function resolveSlot(dir, { force = false, only = null, recut = null, log }) {
  const p = readPlan(dir);
  if (!p) return null;
  const who = `${chapterOf(dir)}/${idOf(dir)}`;
  for (const w of p.warnings) log(`  warning ${w}`);
  if (p.errors.length) { for (const e of p.errors) log(`  ERROR ${e}`); throw new Error(`${who}: images.json has ${p.errors.length} error(s)`); }
  const items = p.images.filter((img) => !only || only.includes(img.key)).map((img) => {
    const rh = rawKey(p.plan, img);
    const sh = skinHash(rh, img);
    /* `recut`: raw pictures that were just replaced (a batch apply), so their library skins are stale */
    const skin = force || (recut && recut.has(rh)) ? null : getSkin(sh);
    const raw = findRaw(rh);
    const how = skin ? "library" : raw && (!force || (recut && recut.has(rh))) ? "recut" : "generate";
    const from = how === "library" ? skin.from : how === "recut" ? raw.from : undefined;
    return { dir, who, img, rh, sh, how, from, prompt: buildPrompt(p.plan, img), style: p.plan.style };
  });
  return { dir, who, plan: p.plan, images: p.images, items };
}

/* make (or re-make) one raw picture, up to MAX_ATTEMPTS billed generations, accepting it only when every
   size asked of it cuts cleanly. Returns { ok, raw: {file, mime}, cuts: Map(sh -> skin result) } */
async function generateGroup(group, { models, log, lane = "inline" }) {
  const first = group[0];
  models = models || modelsFor(first.img);   /* --model names one; else the look's own order */
  let last = null;
  while ((attemptsUsed.get(first.rh) || 0) < MAX_ATTEMPTS) {
    const attempt = (attemptsUsed.get(first.rh) || 0) + 1;
    attemptsUsed.set(first.rh, attempt);
    log(`  generating ${first.img.key} (${first.img.object}) · attempt ${attempt} of ${MAX_ATTEMPTS} · ${models[0]}${models.length > 1 ? " then " + models.slice(1).join(", ") : ""}`);
    let got;
    try {
      got = await generateWithFallback({ prompt: first.prompt, aspect: first.img.aspect, models, refs: refsOf(first.img), log,
        onBilled: (b) => ledgerAdd({ model: b.model, lane, key: first.who + ":" + first.img.key, object: first.img.object, raw: first.rh,
          bytes: b.bytes || 0, mime: b.mime || null, usd: b.ok ? price(b.model, lane) : 0, tokens: b.usage || null,
          attempt, outcome: b.ok ? "image" : b.kind }) });
    } catch (e) {
      log(`  FAILED ${first.img.key}: ${e.message}`);
      return { ok: false, error: e.message, blocked: e instanceof GeminiError && e.kind === "blocked" };
    }
    const cuts = await cutAll(group, got.buf, got.mime);
    const bad = [...cuts.values()].filter((c) => !c.ok);
    if (!bad.length) {
      const file = saveRaw(first.rh, got.buf, got.mime, { object: first.img.object, kind: first.img.kind, style: first.style, aspect: first.img.aspect,
        model: got.model, lane, prompt: first.prompt, aspectSent: got.aspectSent, look: first.img.look, reference: first.img.reference || null });
      return { ok: true, raw: { file, mime: got.mime }, cuts, model: got.model };
    }
    const rej = saveRejected(first.rh, attempt, got.buf, got.mime);
    log(`  rejected ${first.img.key} (attempt ${attempt}): ${bad.flatMap((b) => b.reasons).join("; ")}  [kept for review: ${path.relative(process.cwd(), rej)}]`);
    last = { ok: false, error: bad.flatMap((b) => b.reasons).join("; "), rejected: rej };
  }
  return last || { ok: false, error: `no attempts left this run (${MAX_ATTEMPTS} per picture)` };
}

const cutOpts = (it) => ({ kind: it.img.kind, px: it.img.px, inset: it.img.inset, maxKB: it.img.maxKB, look: it.img.look, tool: !!it.img.tool || it.img.cut === "glass", glass: it.img.cut === "glass", joined: it.img.cut === "joined", label: `skin ${it.img.key}` });

async function cutAll(group, buf, mime) {
  const cuts = new Map();
  for (const it of group) {
    if (cuts.has(it.sh)) continue;
    cuts.set(it.sh, await makeSkin(buf, mime, cutOpts(it)));
  }
  return cuts;
}

function storeSkin(it, cut, model) {
  putSkin(it.sh, cut.webp, { raw: it.rh, object: it.img.object, kind: it.img.kind, look: it.img.look, style: it.style, aspect: it.img.aspect,
    px: it.img.px, inset: it.img.inset, maxKB: it.img.maxKB || null, cut: cut.cut, w: cut.w, h: cut.h, bytes: cut.bytes, uriBytes: cut.uriBytes,
    q: cut.q, model, prompt: it.prompt, crop: cut.crop, src: cut.src, stats: cut.stats, warnings: cut.warnings });
}

/* the shared core: resolve every slot, make each missing raw once, cut, store, emit */
async function run(slotDirs, { force, only, dry, models, log, noGenerate = false, recut = null }) {
  const slots = [];
  for (const d of slotDirs) {
    const s = resolveSlot(d, { force, only, recut, log });
    if (s) slots.push(s);
  }
  if (!slots.length) { log("no images.json in the slot(s) named; nothing to do (the image agent writes it)"); return { slots: [], spent: 0 }; }
  const all = slots.flatMap((s) => s.items);
  const groups = new Map();
  for (const it of all) if (it.how === "generate") (groups.get(it.rh) || groups.set(it.rh, []).get(it.rh)).push(it);
  if (noGenerate) groups.clear();
  const firstModel = (g) => (models || modelsFor(g[0].img))[0];
  const est = [...groups.values()].reduce((n, g) => n + price(firstModel(g)), 0);

  if (dry) {
    for (const it of all) log(`  ${pad(it.who.split("/")[1] + ":" + it.img.key, 26)}${pad(it.img.object, 28)}${pad(it.img.kind, 7)}${pad(it.img.px.join("x"), 9)}${it.how === "generate" ? (groups.get(it.rh)[0] === it ? `generate (${usd(price(firstModel(groups.get(it.rh))))} on ${firstModel(groups.get(it.rh))})` : "generate (shared with an earlier key)") : it.how === "library" ? `library hit${fromNote(it)} (free)` : `re-cut the cached raw${fromNote(it)} (free)`}`);
    log(`  dry run: ${groups.size} new picture(s), about ${usd(est)} inline (${usd(est / 2)} by batch); nothing was called`);
    for (const g of groups.values()) log(`\n  prompt for ${g[0].img.key}:\n    ${g[0].prompt}`);
    return { slots, spent: 0, planned: groups.size };
  }
  if (groups.size && !env().has("GEMINI_API_KEY")) throw new Error(`GEMINI_API_KEY is ${mask(env().get("GEMINI_API_KEY"))}; cannot generate`);

  const spentBefore = ledgerTotals().usd;
  const made = new Map();     /* rh -> generateGroup result */
  const jobs = [...groups.values()].map((g) => () => generateGroup(g, { models, log }).then((r) => made.set(g[0].rh, r)));
  await pool(jobs, CONCURRENCY);

  const results = [];
  for (const s of slots) {
    const entries = [];
    for (const it of s.items) {
      let line = { it, ok: false, note: "" };
      try {
        if (it.how === "library") {
          const sk = getSkin(it.sh);
          line = { it, ok: true, note: `library hit${fromNote(sk)}, free`, skin: sk };
        } else if (it.how === "recut" || (noGenerate && findRaw(it.rh))) {
          const raw = findRaw(it.rh);
          if (!raw) { line.note = "no raw picture (batch outstanding?)"; results.push(line); continue; }
          const cut = await makeSkin(fs.readFileSync(raw.file), raw.mime, cutOpts(it));
          if (!cut.ok) { line.note = `REJECTED re-cut: ${cut.reasons.join("; ")} (re-make with --force --only ${it.img.key})`; line.cut = cut; results.push(line); continue; }
          storeSkin(it, cut, raw.meta && raw.meta.model);
          line = { it, ok: true, note: `re-cut from the cache${fromNote(raw)}, free`, skin: getSkin(it.sh) };
        } else if (noGenerate) {
          line.note = "not made yet (batch outstanding)";
        } else {
          const g = made.get(it.rh);
          if (!g || !g.ok) { line.note = `NOT MADE: ${g ? g.error : "no result"}`; results.push(line); continue; }
          const cut = g.cuts.get(it.sh) || await makeSkin(fs.readFileSync(g.raw.file), g.raw.mime, cutOpts(it));
          storeSkin(it, cut, g.model);
          const first = groups.get(it.rh)[0] === it;
          line = { it, ok: true, note: first ? `new, ${usd(price(g.model))} ${g.model}` : "new (shared picture)", skin: getSkin(it.sh) };
        }
      } catch (e) { line.note = `ERROR ${e.message}`; }
      if (line.ok) {
        markUsed(it.sh, `${it.who}:${it.img.key}`);
        entries.push({ key: it.img.key, uri: skinUri(line.skin.file), w: line.skin.w, h: line.skin.h, bytes: line.skin.bytes, uriBytes: line.skin.uriBytes, q: line.skin.q, hash: it.sh });
      }
      results.push(line);
    }
    /* keep keys that were not part of this run (--only) as they are in the library */
    const keep = s.images.filter((img) => !s.items.some((it) => it.img.key === img.key)).map((img) => {
      const rh = rawKey(s.plan, img);
      const sk = getSkin(skinHash(rh, img));
      return sk ? { key: img.key, uri: skinUri(sk.file), w: sk.w, h: sk.h, bytes: sk.bytes, uriBytes: sk.uriBytes, q: sk.q, hash: skinHash(rh, img) } : null;
    }).filter(Boolean);
    const order = s.images.map((img) => img.key);
    const final = [...entries, ...keep].sort((x, y) => order.indexOf(x.key) - order.indexOf(y.key));
    /* the keypad theme follows the picture (theme.mjs): the plan's preset / derive / palette, else derived from the
       first skin. A theme that fails validation stops this slot: images.tsx is not written. */
    let themed = null;
    try {
      /* only for a slot whose pinned runtime reads a THEME (caps.theme); an older runtime would ignore the line */
      if (capsFor(s.dir).theme) {
        /* a person does not set the keypad's colours: only the object skins can be derived from */
        const objs = final.filter((e) => (s.images.find((i) => i.key === e.key) || {}).kind !== "figure");
        const means = Object.fromEntries(objs.map((e) => { const sk = getSkin(e.hash); return [e.key, sk && sk.stats && sk.stats.mean]; }));
        themed = resolveTheme(s.plan, means, order.filter((k) => objs.some((e) => e.key === k)));
      }
    } catch (e) {
      log(`  ${s.who}: NOT WRITTEN: ${e.message}`);
      s.emitted = { keys: [], theme: null, failed: true }; s.total = 0; process.exitCode = 1;
      continue;
    }
    if (themed) log(`  ${s.who}: keypad theme ${themed.from} · ink ${themed.numbers.keyInk}/${themed.numbers.enterInk}/${themed.numbers.softInk}:1 · keys vs panel ${themed.numbers.keyVsPanel}:1`);
    const em = emitSlot(s.dir, s.plan, final, themed);
    pruneUsed(s.who, Object.fromEntries(final.map((e) => [e.key, e.hash])));
    s.emitted = em;
    s.total = final.reduce((n, e) => n + e.uriBytes, 0);
  }

  for (const l of results) {
    const it = l.it, sk = l.skin;
    const size = sk ? `${pad(`${sk.w}x${sk.h}`, 9)}${pad(kb(sk.uriBytes), 9)}` : pad("", 18);
    const over = sk && sk.uriBytes > budgetOf(it.img) ? `  OVER ${kb(budgetOf(it.img))}` : "";
    log(`  ${pad(it.who.split("/")[1] + ":" + it.img.key, 26)}${pad(it.img.object, 28)}${pad(it.img.kind, 7)}${size}(${l.note})${over}`);
    if (sk && sk.warnings && sk.warnings.length) log(`      note: ${sk.warnings.join("; ")}`);
  }
  const spent = ledgerTotals().usd - spentBefore;
  for (const s of slots) {
    if (s.emitted.failed) { log(`  ${s.who}: images.tsx NOT written (the theme failed; fix images.json "theme")`); continue; }
    log(`  ${s.who}: images.tsx ${s.emitted.keys.length} key(s)${s.emitted.theme ? " + TOOL_THEME" : ""} · ${kb(s.total)}${s.total > slotBudget(s.images) ? `  OVER the ${kb(slotBudget(s.images))} slot budget` : ` (budget ${kb(slotBudget(s.images))})`}`);
  }
  log(`  spent this run ${usd(spent)} · ledger total ${usd(ledgerTotals().usd)}`);
  if (results.some((l) => !l.ok)) process.exitCode = 1;
  return { slots, results, spent };
}

const chapterDir = (a) => {
  if (!a.ch) throw new Error("name the chapter: --ch N");
  const d = path.join(workRoot(), a["chapter-id"] || chapterIdFor({ klass: a.class, pub: a.pub, ch: a.ch }));
  if (!fs.existsSync(d)) throw new Error(`no work folder ${path.basename(d)}; run fetch first`);
  return d;
};
const slotsOf = (cdir) => fs.readdirSync(cdir).map((x) => path.join(cdir, x))
  .filter((d) => fs.existsSync(path.join(d, "slot.json"))).sort();

/* ── batch: every missing picture of a chapter in one Gemini batch job (half price, slower) ── */
async function batch(sub, a, { models, log }) {
  const cdir = chapterDir(a);
  const stateFile = path.join(cdir, BATCH_FILE);
  const state = fs.existsSync(stateFile) ? JSON.parse(fs.readFileSync(stateFile, "utf8")) : null;

  if (sub === "submit") {
    if (state && !a.force) {
      const st = await batchStatus(state.name).catch((e) => ({ state: `unknown (${e.message})` }));
      log(`a batch job is already on disk: ${state.name} (${st.state}); run \`images batch apply --ch ${a.ch}\` first, or --force to replace it`);
      return;
    }
    const groups = new Map();
    const only = a.only && a.only !== true ? String(a.only).split(",").map((s) => s.trim()).filter(Boolean) : null;
    for (const d of slotsOf(cdir)) {
      const s = resolveSlot(d, { force: !!a.force, only, log });
      if (!s) continue;
      for (const it of s.items) if (it.how === "generate") (groups.get(it.rh) || groups.set(it.rh, []).get(it.rh)).push(it);
    }
    if (!groups.size) { log("nothing missing: every skin is in the library or its raw picture is cached (run `images make --ch N` to cut and emit)"); return; }
    /* ponytail: one batch job runs on one model, the first group's; split the job by model if photo and cartoon ever need different ones */
    const model = (models || modelsFor([...groups.values()][0][0].img))[0];
    const items = [...groups.values()].map((g, i) => ({ key: `img-${String(i + 1).padStart(4, "0")}`, rh: g[0].rh, prompt: g[0].prompt, aspect: g[0].img.aspect,
      object: g[0].img.object, kind: g[0].img.kind, style: g[0].style, look: g[0].img.look, refFile: g[0].img.refFile || null, wanted: g.map((it) => `${it.who}:${it.img.key}`) }));
    if (a.dry) {
      for (const it of items) log(`  ${it.key}  ${pad(it.object, 28)}${pad(it.kind, 7)}for ${it.wanted.join(", ")}`);
      log(`  dry run: one batch of ${items.length} picture(s) on ${model}, about ${usd(items.length * price(model, "batch"))}; nothing was called`);
      return;
    }
    const job = await batchSubmit({ model, items: items.map((it) => ({ ...it, refs: refsOf(it) })), label: path.basename(cdir) });
    writeJsonAtomic(stateFile, { provider: "gemini", name: job.name, model, submitted: new Date().toISOString(), items });
    log(`submitted ${items.length} picture(s) as one batch on ${model}: ${job.name} (${job.state})`);
    log(`  about ${usd(items.length * price(model, "batch"))} when it completes · state in ${path.relative(process.cwd(), stateFile)}`);
    log(`  next: node cli.mjs images batch status --ch ${a.ch}   then   node cli.mjs images batch apply --ch ${a.ch}`);
    return;
  }
  if (!state) { log(`no batch job on disk for ${path.basename(cdir)} (${BATCH_FILE}); submit one with \`images make --ch ${a.ch} --batch\``); return; }

  if (sub === "status") {
    const st = await batchStatus(state.name);
    log(`${state.name} · ${state.model} · ${state.items.length} picture(s) · submitted ${state.submitted.slice(0, 16).replace("T", " ")}`);
    log(`  state ${st.state}${st.stats ? ` · ${JSON.stringify(st.stats)}` : ""}${st.error ? ` · error ${st.error}` : ""}`);
    return;
  }
  if (sub === "cancel") {
    const st = await batchCancel(state.name);
    log(`cancel asked: ${state.name} is ${st.state}`);
    if (!batchPending(st.state)) fs.rmSync(stateFile, { force: true });
    return;
  }
  if (sub === "apply") {
    const got = await batchCollect(state.name, state.items.map((x) => x.key));
    if (batchPending(got.state)) { log(`${state.name} is still ${got.state}; nothing to apply yet`); return; }
    if (!batchSucceeded(got.state)) {
      log(`${state.name} ended ${got.state}${got.error ? ` (${got.error})` : ""}; no pictures. Remove ${BATCH_FILE} and make inline, or submit again.`);
      return;
    }
    const outstanding = [], delivered = new Set();
    for (const it of state.items) {
      const r = got.results[it.key];
      if (!r || r.error) {
        if (r && r.billed) ledgerAdd({ model: state.model, lane: "batch", key: it.wanted[0], object: it.object, raw: it.rh, bytes: 0, usd: 0, tokens: r.usage || null, outcome: "no-image" });
        outstanding.push(`${it.key} ${it.object}: ${r ? r.error : "no answer"}`);
        continue;
      }
      ledgerAdd({ model: state.model, lane: "batch", key: it.wanted[0], object: it.object, raw: it.rh, bytes: r.buf.length, mime: r.mime,
        usd: price(state.model, "batch"), tokens: r.usage || null, outcome: "image", batch: state.name });
      saveRaw(it.rh, r.buf, r.mime, { object: it.object, kind: it.kind, style: it.style, aspect: it.aspect, model: state.model, lane: "batch", prompt: it.prompt, batch: state.name, look: it.look, reference: it.refFile });
      delivered.add(it.rh);
    }
    log(`${state.name}: ${state.items.length - outstanding.length} of ${state.items.length} picture(s) arrived`);
    for (const o of outstanding) log(`  missing ${o}`);
    const dirs = [...new Set(state.items.flatMap((it) => it.wanted.map((w) => path.join(workRoot(), w.split(":")[0]))))];
    await run(dirs, { force: false, only: null, dry: false, models, log, noGenerate: true, recut: delivered });
    if (!outstanding.length) fs.rmSync(stateFile, { force: true });
    else log(`  ${outstanding.length} outstanding: make them inline with \`images make --ch ${a.ch}\` (the job record stays until then)`);
    return;
  }
  throw new Error("images batch submit|status|apply|cancel --ch N");
}

function status(a, log) {
  const idx = readIndex();
  const skins = Object.entries(idx.skins);
  const libBytes = skins.reduce((n, [, e]) => n + (e.bytes || 0), 0);
  log(`library ${path.relative(process.cwd(), LIB_DIR())}: ${skins.length} skin(s) · ${kb(libBytes)} of WebP`);
  for (const s of siblings()) log(`  shared, read-only: ${s.name} ${path.relative(process.cwd(), s.lib)}: ${Object.keys(readSiblingIndex(s).skins || {}).length} skin(s) (a hit there is free; nothing is written there)`);
  const t = ledgerTotals();
  log(`ledger: ${t.calls} billed call(s), ${t.images} picture(s), about ${usd(t.usd)} spent`);
  for (const [k, v] of Object.entries(t.by)) log(`  ${pad(k, 40)}${v.calls} call(s) · ${usd(v.usd)}`);
  const cdirs = a.ch ? [chapterDir(a)] : fs.readdirSync(workRoot()).map((c) => path.join(workRoot(), c)).filter((d) => fs.statSync(d).isDirectory());
  for (const cdir of cdirs) {
    const rows = slotsOf(cdir).filter((d) => fs.existsSync(path.join(d, "images.json")));
    if (fs.existsSync(path.join(cdir, BATCH_FILE))) log(`${path.basename(cdir)}: a batch job is on disk (${BATCH_FILE}); images batch status --ch N`);
    if (!rows.length) continue;
    log(path.basename(cdir));
    for (const d of rows) {
      const p = readPlan(d);
      const em = readEmitted(d) || {};
      const total = Object.values(em).reduce((n, v) => n + v, 0);
      const keys = (p.images || []).map((img) => `${img.key}${em[img.key] ? ` ${kb(em[img.key])}${em[img.key] > budgetOf(img) ? ` OVER ${kb(budgetOf(img))}` : ""}` : " (not made)"}`);
      log(`  ${pad(idOf(d), 20)}${keys.length ? keys.join(" · ") : "no skins (the agent decided none)"}  ·  ${kb(total)} of ${kb(slotBudget(p.images))}${total > slotBudget(p.images) ? " OVER" : ""}${readTheme(d) ? `  ·  theme: ${(p.plan.themeMade && p.plan.themeMade.from) || "yes"}` : ""}`);
    }
  }
}

function list(log) {
  const row = (h, e) => `${pad(h.slice(0, 8), 10)}${pad(e.object, 30)}${pad(e.kind, 7)}${pad(`${e.w}x${e.h}`, 9)}${pad(kb(e.uriBytes), 10)}${pad(e.q, 6)}${pad(e.model || "", 26)}${(e.usedBy || []).join(", ")}`;
  const head = `${pad("skin", 10)}${pad("object", 30)}${pad("kind", 7)}${pad("size", 9)}${pad("data URI", 10)}${pad("q", 6)}${pad("model", 26)}used by`;
  const skins = Object.entries(readIndex().skins);
  if (!skins.length) log("the skin library is empty");
  else { log(head); for (const [h, e] of skins) log(row(h, e)); }
  /* the sibling libraries (config skinLibraries): a plan asking for the same object, kind, style, aspect and size gets these free */
  for (const s of siblings()) {
    const sk = Object.entries(readSiblingIndex(s).skins || {});
    log(`\nshared, read-only (${s.name}, ${path.relative(process.cwd(), s.lib)}): ${sk.length} skin(s)`);
    if (sk.length) { log(head); for (const [h, e] of sk) log(row(h, e)); }
  }
}

async function sheet(dir, log) {
  const p = readPlan(dir);
  if (!p) throw new Error("no images.json in this slot");
  const rows = [];
  for (const img of p.images) {
    const rh = rawKey(p.plan, img);
    const sk = getSkin(skinHash(rh, img));
    if (!sk) { log(`  ${img.key}: not made yet (skipped)`); continue; }
    const raw = findRaw(rh);
    rows.push({ key: img.key, object: img.object, kind: img.kind, look: img.look, uri: skinUri(sk.file), w: sk.w, h: sk.h, q: sk.q, uriBytes: sk.uriBytes, model: sk.model,
      rawFile: raw && raw.file, rawMime: raw && raw.mime, crop: sk.crop, src: sk.src, stats: sk.stats });
  }
  if (!rows.length) { log("no skins to show"); return; }
  /* the theme exactly as images.tsx carries it (what the runtime will read), with the validator's numbers */
  const theme = readTheme(dir);
  const v = theme ? validateTheme(theme) : null;
  const r = contactSheet(dir, rows, { title: idOf(dir), theme, themeFrom: (p.plan.themeMade && p.plan.themeMade.from) || "", themeNumbers: v && v.numbers });
  log(`sheet ${path.relative(process.cwd(), r.png)}  ${rows.length} skin(s)${theme ? " + keypad theme" : ""} · ${r.width}x${r.height} · ${kb(r.bytes)}`);
  if (v && !v.ok) log(`  the emitted theme fails: ${v.problems.join("; ")}`);
}

export async function imagesCommand(argv, { log = console.log } = {}) {
  const a = parseArgs(argv, ["force", "dry", "batch", "json", "help"]);
  const sub = String(a._[0] || "status");
  const only = a.only && a.only !== true ? String(a.only).split(",").map((s) => s.trim()).filter(Boolean) : null;
  const models = a.model && a.model !== true ? [String(a.model)] : null;   /* null: each picture's look picks its order (modelsFor) */
  if (sub === "make") {
    if (a._[1]) {
      const dir = slotDir(a._[1], a);
      log(`images ${idOf(dir)}${a.dry ? " (dry run)" : ""}`);
      return run([dir], { force: !!a.force, only, dry: !!a.dry, models, log });
    }
    if (a.batch) return batch("submit", a, { models, log });
    const cdir = chapterDir(a);
    log(`images ${path.basename(cdir)} (every slot with an images.json)${a.dry ? " (dry run)" : ""}`);
    return run(slotsOf(cdir), { force: !!a.force, only, dry: !!a.dry, models, log });
  }
  if (sub === "batch") return batch(String(a._[1] || "status"), a, { models, log });
  if (sub === "sheet") return sheet(slotDir(a._[1], a), log);
  if (sub === "status") return status(a, log);
  if (sub === "list") return list(log);
  throw new Error("images make <MEDIA_ID> [--ch N] [--force] [--only key] [--dry] [--model m] | make --ch N [--batch] | batch submit|status|apply|cancel --ch N | sheet <MEDIA_ID> | status [--ch N] | list");
}

/* ── the ACTION KIT (docs/IMAGES.md §11): the tools that perform an act (knife, scissors, ruler, pencil, eraser), made ONCE for
   every tool, like the mascot. runtime/actionkit.json is the plan; each picture goes through the same library, raw cache, ledger,
   two-attempt generation and cut as a skin (a library or sibling hit is free); runtime/actionkit.tsx is GENERATED (ACTION_KIT: the
   data URIs, ACTION_KIT_FIT: each picture's size and the point that acts) and travels inside every tool built on a runtime that
   has it (sources()). Not a slot's skin: it is outside the 3-a-slot cap, and its prompt is kitPrompt (a knife is allowed). ── */
export async function makeActionKit({ force = false, only = null, dry = false, models = MODELS, log = console.log } = {}) {
  const planFile = fromRoot("runtime/actionkit.json");
  const plan = JSON.parse(fs.readFileSync(planFile, "utf8"));
  const items = (plan.images || []).map((raw) => {
    /* each picture validated as a one-picture plan: every skin rule but the per-slot cap */
    const v = validatePlan({ look: "cartoon", images: [raw] });   /* the kit stays cartoon (its keys and pictures unchanged) */
    if (v.errors.length) throw new Error(`actionkit.json: ${v.errors.join("; ")}`);
    for (const w of v.warnings) log(`  warning ${w}`);
    const img = { ...v.images[0], tool: true };   /* cut as a tool: steel and graphite are object, finger loops are holes */
    const rh = rawKey(plan, img), sh = skinHash(rh, img);
    const skin = force ? null : getSkin(sh), rawPic = findRaw(rh);
    const how = skin ? "library" : rawPic && !force ? "recut" : "generate";
    return { who: "actionkit", img, rh, sh, how, from: (skin || rawPic || {}).from, prompt: kitPrompt(plan.style, img), style: plan.style };
  }).filter((it) => !only || only.includes(it.img.key));
  const gen = items.filter((it) => it.how === "generate");
  if (dry) {
    for (const it of items) log(`  ${pad(it.img.key, 10)}${pad(it.img.object, 34)}${pad(it.img.px.join("x"), 9)}${it.how === "generate" ? `generate (${usd(price(models[0]))} on ${models[0]})` : it.how === "library" ? `library hit${fromNote(it)} (free)` : `re-cut the cached raw${fromNote(it)} (free)`}`);
    log(`  dry run: ${gen.length} new picture(s), about ${usd(gen.length * price(models[0]))}; nothing was called`);
    for (const it of gen) log(`\n  prompt for ${it.img.key}:\n    ${it.prompt}`);
    return { items };
  }
  if (gen.length && !env().has("GEMINI_API_KEY")) throw new Error(`GEMINI_API_KEY is ${mask(env().get("GEMINI_API_KEY"))}; cannot generate`);
  /* the cut runs in Chrome after the picture is paid for: no Chrome = a bought picture thrown away, so refuse first */
  if (items.some((it) => it.how !== "library") && !chromePath()) throw new Error("Chrome not found; set CHROME_PATH before anything is billed");
  const spentBefore = ledgerTotals().usd;
  for (const it of items) {
    try {
      if (it.how === "recut") {
        const r = findRaw(it.rh), cut = await makeSkin(fs.readFileSync(r.file), r.mime, cutOpts(it));
        if (!cut.ok) { it.note = `REJECTED re-cut: ${cut.reasons.join("; ")} (re-make with --force --only ${it.img.key})`; continue; }
        storeSkin(it, cut, r.meta && r.meta.model);
      } else if (it.how === "generate") {
        const g = await generateGroup([it], { models, log });
        if (!g.ok) { it.note = `NOT MADE: ${g.error}`; continue; }
        storeSkin(it, g.cuts.get(it.sh), g.model);
      }
      it.skin = getSkin(it.sh);
      markUsed(it.sh, `actionkit:${it.img.key}`);
      it.note = it.how === "library" ? `library hit${fromNote(it)}, free` : it.how === "recut" ? "re-cut from the cache, free" : "new";
    } catch (e) { it.note = `ERROR ${e.message}`; }
  }
  /* --only re-makes some keys: the others keep their library picture */
  const all = (plan.images || []).map((raw) => {
    const mine = items.find((it) => it.img.key === raw.key);
    if (mine) return mine;
    const img = { ...validatePlan({ look: "cartoon", images: [raw] }).images[0], tool: true }, rh = rawKey(plan, img);
    return { img, skin: getSkin(skinHash(rh, img)), note: "kept" };
  });
  const made = all.filter((it) => it.skin);
  pruneUsed("actionkit", Object.fromEntries(made.map((it) => [it.img.key, skinHash(rawKey(plan, it.img), it.img)])));
  const fit = (it) => ({ w: it.skin.w, h: it.skin.h, len: it.img.len || 160, ax: it.img.ax ?? 0.5, ay: it.img.ay ?? 0.5, rot: it.img.rot || 0 });
  const uris = made.map((it) => [it.img.key, skinUri(it.skin.file)]);
  const bytes = uris.reduce((n, [, u]) => n + u.length, 0);
  const out = fromRoot("runtime/actionkit.tsx");
  fs.writeFileSync(out, `/* GENERATED by \`node cli.mjs actionkit\` from runtime/actionkit.json: the ACTION KIT (docs/IMAGES.md §11), ${made.length} picture(s), ${kb(bytes)} inline.
   The tools that perform an act (api.act); it travels inside every tool built on a runtime that has it, like the mascot. A missing key
   draws the runtime's drawn hand instead. Do not edit or read; regenerate. */
const ACTION_KIT: Record<string, string> = {
${uris.map(([k, u]) => `  ${JSON.stringify(k)}: "${u}",`).join("\n")}
};
const ACTION_KIT_FIT: Record<string, any> = ${JSON.stringify(Object.fromEntries(made.map((it) => [it.img.key, fit(it)])))};
`);
  for (const it of all) log(`  ${pad(it.img.key, 10)}${pad(it.img.object, 34)}${it.skin ? pad(`${it.skin.w}x${it.skin.h}`, 9) + pad(kb(it.skin.uriBytes), 9) : pad("", 18)}(${it.note})`);
  log(`  ${path.relative(process.cwd(), out)}: ${made.length} of ${all.length} pictures, ${kb(bytes)} in every tool built on it · spent this run ${usd(ledgerTotals().usd - spentBefore)}`);
  if (made.length < all.length) process.exitCode = 1;
  return { out, made: made.length, bytes };
}

export { KINDS };
