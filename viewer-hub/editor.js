/* The Editor: educator feedback -> a Claude Code fix -> check -> publish, for the Udgam tools.
 *
 * Review queue (every udgam chapter with pending feedback, filtered by board / medium / publication / subject / std /
 * chapter, and by date / teacher in the filter popup) | the tool's feedback and its actions | the diff beside a live
 * Before/After render. It implements none of the pipeline: every button calls the hub (viewer-hub/editor-api.mjs),
 * which runs the class's own CLI. The only writes to production are "Mark solved" (a feedback row's status) and the
 * publish dialog's Publish button (`node cli.mjs publish --upload`), each behind its own confirm step.
 */
"use strict";
(() => {
  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const store = { get(k, d) { try { const v = localStorage.getItem(k); return v === null ? d : JSON.parse(v); } catch { return d; } }, set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* blocked */ } } };
  const ss = { get(k) { try { return JSON.parse(sessionStorage.getItem(k)); } catch { return null; } }, set(k, v) { try { sessionStorage.setItem(k, JSON.stringify(v)); } catch { /* blocked */ } }, del(k) { try { sessionStorage.removeItem(k); } catch { /* blocked */ } } };
  const api = async (url, body) => {
    const r = await fetch(url, body === undefined ? undefined : { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) });
    const d = await r.json().catch(() => ({}));
    if (!r.ok) throw new Error(d.error || `HTTP ${r.status}`);
    return d;
  };
  /* the table keeps feedback times in UTC; the educators and the owner work in IST, so the page shows (and filters by) IST */
  const IST = new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Kolkata", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hourCycle: "h23" });
  const istParts = (iso) => { const t = Date.parse(iso); return Number.isFinite(t) ? Object.fromEntries(IST.formatToParts(t).map((p) => [p.type, p.value])) : null; };
  const istDay = (iso) => { const p = istParts(iso); return p ? `${p.year}-${p.month}-${p.day}` : ""; };
  const istStamp = (iso) => { const p = istParts(iso); return p ? `${p.year}-${p.month}-${p.day} ${p.hour}:${p.minute} IST` : ""; };

  const DEVICES = { mobile: { label: "Mobile", w: 844, h: 390 }, web: { label: "Web", w: 1366, h: 768 }, smartboard: { label: "Smartboard", w: 1920, h: 1080 } };
  const LANGS = [["en", "EN"], ["hi", "हिं"], ["gu", "ગુ"]];
  const FIELDS = [["board", "boards"], ["medium", "mediums"], ["pub", "publications"], ["subject", "subjects"], ["std", "stds"]];
  const LABEL = { indiannica: "Indiannica", cbse: "CBSE", eng: "English", hin: "Hindi", guj: "Gujarati", maths: "Maths", udgam: "Udgam" };
  const PUB_OF = { indiannica: "udgam" };
  const CH = /^([a-z0-9]+)_([a-z]+)_([a-z]+?)(\d+)_ch(\d+)$/i;
  const facet = (c) => { const m = CH.exec(c) || []; return { board: m[1] || "", medium: m[2] || "", pub: PUB_OF[m[1]] || m[1] || "", subject: m[3] || "", std: m[4] || "", n: m[5] ? Number(m[5]) : null }; };
  const label = (k, v) => (k === "std" ? `Std ${v}` : LABEL[v] || v);
  const chapterLabel = (c) => { const f = facet(c); return f.n == null ? c : `Std ${f.std} · Chapter ${f.n}`; };

  const S = {
    view: "preview", data: null, loading: false, offline: "",
    f: Object.assign({ board: "", medium: "", pub: "", subject: "", std: "", chapter: "" }, store.get("ed.filters", {})),
    fb: { from: "", to: "", teacher: "", hideNotInPlan: false }, // a tool with no work folder is still feedback to read (a re-keyed plan files it under ids the disk lacks)
    sel: store.get("ed.sel", null), tool: null, device: store.get("ed.device", "web"), lang: store.get("ed.lang", "en"),
    run: null, term: null, es: null, poll: null, renderKey: "",
  };

  /* ---- the view switch in the hub's header -------------------------------------------------------- */

  function setView(v) {
    S.view = v;
    store.set("ed.view", v);
    document.body.classList.toggle("editor-on", v === "editor");
    for (const b of document.querySelectorAll("[data-view]")) b.setAttribute("aria-pressed", String(b.dataset.view === v));
    if (v === "editor") {
      history.replaceState(null, "", "#editor");
      document.title = "Editor — Udgam tools";
      if (!S.data) load(false); else render();
      startPoll();
    } else {
      stopPoll();
      if (typeof writeHash === "function") writeHash();
    }
  }
  for (const b of document.querySelectorAll("[data-view]")) b.addEventListener("click", () => setView(b.dataset.view));

  /* ---- the queue ------------------------------------------------------------------------------- */

  async function load(fresh) {
    S.loading = true; renderQueue();
    try {
      const d = await api(`/api/feedback/list${fresh ? "?fresh=1" : ""}`);
      S.data = d; S.offline = d.offline || "";
    } catch (e) { S.offline = e.message; }
    S.loading = false;
    const n = items().filter((i) => i.in_plan).length; // tools awaiting review that this machine can fix
    $("edBadge").textContent = String(n || "");
    $("edBadge").hidden = !n;
    if (S.view === "editor") render();
  }

  function items() {
    const out = [];
    for (const [chapter, cd] of Object.entries(S.data?.chapters || {})) for (const [slot, g] of Object.entries(cd.slots || {})) out.push({ ...g, chapter, slot });
    return out.sort((a, b) => (a.chapter + a.slot).localeCompare(b.chapter + b.slot, undefined, { numeric: true }));
  }

  const matches = (c, skip) => FIELDS.every(([k]) => k === skip || !S.f[k] || facet(c)[k] === S.f[k]);
  const scoped = () => items().filter((i) => matches(i.chapter) && (!S.f.chapter || i.chapter === S.f.chapter));
  const filtered = () => {
    let list = scoped();
    if (S.fb.hideNotInPlan) list = list.filter((i) => i.in_plan);
    if (!(S.fb.from || S.fb.to || S.fb.teacher)) return list;
    return list.map((i) => ({ ...i, items: i.items.filter((it) => {
      const day = istDay(it.created_at);
      return !(S.fb.from && day < S.fb.from) && !(S.fb.to && day > S.fb.to) && !(S.fb.teacher && (it.teacher || "unknown") !== S.fb.teacher);
    }) })).filter((i) => i.items.length);
  };
  const fbActive = () => !!(S.fb.from || S.fb.to || S.fb.teacher || S.fb.hideNotInPlan);
  const current = () => { const l = filtered(); return l.find((i) => i.chapter === S.sel?.chapter && i.slot === S.sel?.slot) || l[0] || null; };

  function selectsHtml() {
    const all = items();
    const chs = [...new Set(all.map((i) => i.chapter))];
    const sel = FIELDS.map(([k, plural]) => {
      const counts = new Map();
      for (const c of chs) if (matches(c, k)) counts.set(facet(c)[k], (counts.get(facet(c)[k]) || 0) + 1);
      const opts = [...counts].sort((a, b) => String(a[0]).localeCompare(String(b[0]), undefined, { numeric: true }));
      return `<select class="ed-sel" data-f="${k}" aria-label="${plural}"><option value="">All ${plural}</option>${opts.map(([v, n]) => `<option value="${esc(v)}"${S.f[k] === v ? " selected" : ""}>${esc(label(k, v))} (${n})</option>`).join("")}</select>`;
    }).join("");
    const inScope = chs.filter((c) => matches(c)).sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
    const n = (c) => all.filter((i) => i.chapter === c).length;
    const chSel = `<select class="ed-sel ed-sel-wide" data-f="chapter" aria-label="Chapter"><option value="">All chapters (${inScope.reduce((a, c) => a + n(c), 0)} in queue)</option>${inScope.map((c) => `<option value="${esc(c)}"${S.f.chapter === c ? " selected" : ""} title="${esc(c)}">${esc(c)} · ${n(c)}</option>`).join("")}</select>`;
    const hidden = chs.filter((c) => !(matches(c) && (!S.f.chapter || S.f.chapter === c)));
    const hint = hidden.length ? `<div class="ed-hint"><span>&#9888; New feedback on <strong>${hidden.length === 1 ? esc(hidden[0]) : hidden.length}</strong>${hidden.length === 1 ? " is" : " other chapters is"} not shown.</span><button class="btn sm" id="edShowAll" type="button">Show all chapters</button></div>` : "";
    return `<div class="ed-grid">${sel}</div>${chSel}${hint}`;
  }

  function renderQueue() {
    const q = $("edQueue");
    if (!q) return;
    const list = filtered();
    const cur = current();
    const on = (i) => !!cur && i.chapter === cur.chapter && i.slot === cur.slot;
    const total = scoped().reduce((n, i) => n + i.items.length, 0);
    const count = list.reduce((n, i) => n + i.items.length, 0);
    const groups = new Map();
    for (const i of list) { if (!groups.has(i.chapter)) groups.set(i.chapter, []); groups.get(i.chapter).push(i); }
    q.innerHTML = `<div class="ed-qhead"><span class="ed-title">Review queue</span>
      <button class="icon-btn sm" id="edReload" type="button" title="Reload the feedback queue (new feedback does not appear on its own)">${S.loading ? '<span class="spin"></span>' : "&#8635;"}</button>
      <button class="icon-btn sm" id="edCopy" type="button" title="Copy every filtered feedback item, grouped by chapter and tool, with screenshots"${count ? "" : " disabled"}>&#10697;</button>
      <span class="ed-pop-anchor"><button class="icon-btn sm ed-filter-btn" id="edFilter" type="button" title="Filter feedback by date and teacher">&#9663; <span class="ed-count">${fbActive() ? count : total}</span></button></span></div>
      <div class="ed-pick">${selectsHtml()}</div>
      <div class="ed-qlist" role="listbox" aria-label="Tools with feedback">${!list.length ? `<p class="muted small" style="padding:8px">${S.loading ? "Loading&hellip;" : "No feedback matches this filter."}</p>` : [...groups].map(([ch, rows]) => `
        ${groups.size > 1 ? `<div class="rail-chapter-title" title="${esc(ch)}">${esc(chapterLabel(ch))}</div>` : ""}
        ${rows.map((i) => `<button type="button" class="tool-item ed-item${on(i) ? " selected" : ""}" role="option" aria-selected="${on(i)}" data-ch="${esc(i.chapter)}" data-slot="${esc(i.slot)}">
          <span style="min-width:0;flex:1"><span class="tool-title">${esc(i.title)}</span><span class="tool-id">${esc(i.slot)}</span>
          <span class="ed-tags"><span class="tag warn">&#128172; ${i.items.length}</span>${i.revised ? '<span class="tag info">Revised</span>' : i.prepared ? '<span class="tag muted">In the IDE</span>' : ""}${i.in_plan && !i.ported ? '<span class="tag muted">Not ported</span>' : ""}${i.in_plan && i.in_live_plan === false ? '<span class="tag warn" title="The live plan no longer has a tool with this id: re-key the chapter before publishing">Re-key needed</span>' : ""}${!i.in_plan ? '<span class="tag err">Not on disk</span>' : ""}</span></span></button>`).join("")}`).join("")}</div>`;
  }

  $("editor").addEventListener("change", (e) => {
    const k = e.target.dataset?.f;
    if (!k) return;
    S.f[k] = e.target.value;
    if (k !== "chapter" && S.f.chapter && !matches(S.f.chapter)) S.f.chapter = "";
    store.set("ed.filters", S.f);
    render();
  });
  $("editor").addEventListener("click", (e) => {
    const t = e.target.closest("button, [data-act]");
    if (!t || t.disabled) return;
    if (t.classList.contains("ed-item")) { S.sel = { chapter: t.dataset.ch, slot: t.dataset.slot }; store.set("ed.sel", S.sel); render(); return; }
    const act = t.id || t.dataset.act;
    const fn = ACTIONS[act];
    if (fn) fn(t);
  });

  /* ---- the selected tool ------------------------------------------------------------------------- */

  let lastKey = "";
  async function loadTool(force) {
    const cur = current();
    const key = cur ? `${cur.chapter}/${cur.slot}` : "";
    if (!cur || !cur.in_plan) { S.tool = null; lastKey = key; renderBody(); return; }
    try {
      const t = await api(`/api/feedback/tool?chapter=${encodeURIComponent(cur.chapter)}&slot=${encodeURIComponent(cur.slot)}`);
      if (key !== keyOf()) return;
      const changed = force || !S.tool || S.tool.stamp !== t.stamp || key !== lastKey;
      S.tool = t; lastKey = key;
      if (changed) renderBody();
    } catch { if (key === keyOf()) { S.tool = null; renderBody(); } }
  }
  const keyOf = () => { const c = current(); return c ? `${c.chapter}/${c.slot}` : ""; };

  function startPoll() { stopPoll(); S.poll = setInterval(() => { if (!document.hidden) loadTool(false); }, 3000); }
  function stopPoll() { clearInterval(S.poll); S.poll = null; }

  function render() {
    if (S.view !== "editor") return;
    const ed = $("editor");
    if (S.offline && !items().length) { ed.innerHTML = empty("Feedback could not be read", esc(S.offline) + `<br><br>The Editor reads the <code>toolfeedback</code> table through the class's own <code>.env</code> (or <code>Python-backend/.env</code>); <code>node cli.mjs doctor</code> in a class folder says what is missing.<div style="margin-top:12px"><button class="btn" data-act="edReload" type="button">Check again</button></div>`); return; }
    if (!S.data) { ed.innerHTML = empty('<span class="spin"></span>Loading the review queue&hellip;', "Reading pending educator feedback from the database."); return; }
    if (!items().length) { ed.innerHTML = empty("Nothing to review", `No pending educator feedback on any Udgam chapter. Educators file it from the Content-Validator's tool preview: draw on the tool, screenshot it, say what is wrong.<div style="margin-top:12px"><button class="btn" data-act="edReload" type="button">${S.loading ? '<span class="spin"></span>Checking&hellip;' : "&#8635; Check again"}</button></div>`); return; }
    if (!$("edQueue")) {
      ed.innerHTML = `<aside class="ed-queue rail" id="edQueue" aria-label="Feedback queue"></aside><div class="ed-main" id="edMain"></div>`;
    }
    renderQueue();
    const key = keyOf();
    if (key !== lastKey) { closeStream(); S.term = null; S.run = null; S.tool = null; reattach(); }
    renderBody();
    loadTool(key !== lastKey);
  }
  const empty = (title, body) => `<div class="ed-empty"><div><h3>${title}</h3><p class="muted">${body}</p></div></div>`;

  function renderBody() {
    const m = $("edMain");
    if (!m) return;
    const cur = current();
    if (!cur) { m.innerHTML = empty("Nothing in this filter", "No pending feedback matches these filters. Clear the filters or pick another chapter."); S.renderKey = ""; return; }
    const t = S.tool;
    const busy = !!S.run && !S.run.done;
    const revised = !!t?.before;
    if (!$("edHead") || m.dataset.key !== keyOf()) {
      m.dataset.key = keyOf();
      m.innerHTML = `<div class="ed-top"><header class="ed-head" id="edHead"></header><div id="edNotes"></div><div class="ed-fb" id="edFb"></div><div id="edTerm"></div></div>
        <div class="ed-split"><section class="ed-pane"><div class="ed-pane-head"><span class="ed-title" style="flex:1">Diff</span><span id="edDiffCounts"></span></div><div class="ed-pane-body" id="edDiff"></div></section>
        <section class="ed-pane"><div class="ed-pane-head"><span class="ed-title" style="flex:1">Before / After</span><span class="seg" id="edLangs"></span><span class="seg" id="edDevices"></span></div><div class="ed-pane-body ed-renders" id="edRenders"></div></section></div>`;
      $("edFb").innerHTML = cur.items.map((it, i) => `<div class="fb-item"><div class="fb-n">${i + 1}</div><div style="min-width:0;flex:1">
        <div class="fb-text">${esc(it.text) || '<em class="muted">(no text)</em>'}</div>
        <div class="fb-meta">${esc(it.teacher || "unknown")} · ${esc(istStamp(it.created_at))}${it.filed_as && it.filed_as !== cur.slot ? ` · filed as <code>${esc(it.filed_as)}</code>` : ""}</div>
        ${it.image_url ? `<a class="fb-shot" href="/api/feedback/shot?url=${encodeURIComponent(it.image_url)}" target="_blank" rel="noopener"><img alt="Annotated screenshot ${i + 1}" src="/api/feedback/shot?url=${encodeURIComponent(it.image_url)}" onerror="this.parentNode.outerHTML='<div class=&quot;fb-missing&quot;>&#9888; the screenshot could not be read from GCS: check the class&rsquo;s config.json key</div>'"></a>` : ""}
      </div></div>`).join("");
      S.renderKey = "";
    }
    $("edHead").innerHTML = `<div style="min-width:0;flex:1"><div class="ed-h1">${esc(cur.title)}</div><div class="ed-meta">${esc(cur.chapter)} · ${esc(cur.slot)}${cur.class ? ` · class ${cur.class}` : ""}</div></div>
      <div class="ed-actions">
        <button class="btn" data-act="resolveTool" type="button"${busy ? " disabled" : ""} title="Mark this tool's feedback solved: no publish, just off the queue">&#10003; Mark solved</button>
        <button class="btn" data-act="resolveChapter" type="button"${busy ? " disabled" : ""} title="Mark EVERY pending feedback item in this chapter solved: no publish">&#10003; Mark chapter solved</button>
        <button class="btn primary" data-act="ide" type="button"${busy || !cur.in_plan ? " disabled" : ""} title="Opens this tool and its revise prompt in your IDE: send the line to Claude Code there">&lt;/&gt; ${revised ? "Open in IDE again" : "Apply feedback in the IDE"}</button>
        <button class="btn" data-act="terminal" type="button"${busy || !cur.in_plan ? " disabled" : ""} title="Opens Claude Code in a terminal window: you watch it work">&gt;_ In a terminal</button>
        ${revised ? `<button class="btn" data-act="discard" type="button"${busy ? " disabled" : ""} title="Put tool.tsx back as it was before the fix">&#8634; Discard</button>
        <button class="btn publish" data-act="approve" type="button"${busy ? " disabled" : ""}>&#9729; Approve &amp; publish</button>` : ""}
        <button class="btn" data-act="publishDialog" type="button"${busy || !cur.in_plan ? " disabled" : ""} title="Pick which of this chapter's tools to publish (node cli.mjs publish), dry run first">&#9729; Publish local changes</button>
        ${S.run ? `<button class="btn" data-act="log" type="button">${S.run.done ? "&gt;_" : '<span class="spin"></span>'} Logs <span class="tag ${S.run.done ? (S.run.code === 0 ? "ok" : "err") : "info"}">${S.run.done ? (S.run.code === 0 ? "done" : `exit ${S.run.code}`) : "running"}</span></button>` : ""}
      </div>`;
    $("edNotes").innerHTML = !cur.in_plan
      ? `<div class="issue err">&#9888; This slot has no work folder on this machine (<code>class&lt;N&gt;/work/${esc(cur.chapter)}/${esc(cur.slot)}</code>): fetch the chapter before it can be fixed or published.</div>`
      : [
        cur.aliases?.length ? `<div class="issue info">Some of this feedback was filed under the live plan&rsquo;s id${cur.aliases.length > 1 ? "s" : ""} ${cur.aliases.map((a) => `<code>${esc(a)}</code>`).join(", ")} &mdash; the same tool as this one (matched by ${esc(cur.alias_via[cur.aliases[0]])}), so it is all here.</div>` : "",
        cur.in_live_plan === false ? `<div class="issue err">&#9888; The live plan (v${esc(cur.live_version)}) no longer has a tool with this id: the chapter on this machine is older than the live plan. The fix can be made and checked here, but <strong>publishing is blocked</strong> until the chapter is re-keyed to the live plan (&ldquo;A re-keyed plan&rdquo; in CLAUDE.md). <strong>Mark solved</strong> still works.</div>` : "",
        t && !t.ported ? `<div class="issue info">Not ported yet: the After render appears once <code>node cli.mjs check ${esc(cur.chapter)}/${esc(cur.slot)}</code> passes (it ports on a pass).</div>` : "",
      ].join("");
    renderTerm();
    renderDiff();
    renderRenders();
  }

  function renderTerm() {
    const el = $("edTerm"); if (!el) return;
    const t = S.term;
    if (!t) { el.innerHTML = ""; return; }
    const cmd = t.opened && t.where !== "terminal" ? `Read ${t.prompt_file} and follow it exactly.` : `cd ${t.cwd}\nclaude "${t.bootstrap}"`;
    el.innerHTML = `<div class="ed-run"><div class="ed-run-h">${t.where === "terminal" ? "Terminal session" : "IDE session"} <span class="tag ${t.opened ? "ok" : "warn"}">${t.opened ? "opened" : "open it yourself"}</span><span style="flex:1"></span><button class="btn sm" data-act="dismissTerm" type="button">Dismiss</button></div>
      <p class="fb-note">${t.opened ? (t.where === "terminal" ? "Claude Code is running in a terminal window: watch it there and steer it if it goes wrong. The diff below appears by itself as it writes." : "The tool and its revise prompt are open in your IDE. Send this one line to Claude Code there, watch it work and steer it. The diff below appears by itself as it writes.") : `Everything is prepared, but ${t.where === "terminal" ? "a terminal could not be opened" : "no IDE window could be reached"} (${esc(t.error || "")}). Run this yourself:`}</p>
      <pre class="cmd" data-act="copyCmd" title="Click to copy">${esc(cmd)}</pre>
      <p class="fb-note">Prompt: <code>_feedback/REVISE_PROMPT.md</code>${t.shots?.length ? ` · ${t.shots.length} screenshot${t.shots.length > 1 ? "s" : ""} pulled for it to read` : ""}${t.new_baseline ? " · baseline snapshotted, so Discard can always put the original back" : " · keeping the existing baseline (the diff still shows the whole change)"}</p></div>`;
  }

  function renderDiff() {
    const t = S.tool, el = $("edDiff"), counts = $("edDiffCounts");
    if (!el) return;
    if (!t?.before) {
      counts.innerHTML = "";
      el.innerHTML = empty(t?.prepared ? "Waiting on the IDE" : "No revision yet", t?.prepared
        ? "Claude Code has the prompt and the screenshots. The diff appears here by itself the moment it writes <code>tool.tsx</code>: nothing to approve until then."
        : "<strong>Apply feedback in the IDE</strong> opens this tool and its revise prompt in your IDE and hands you the one line to send to Claude Code there; <strong>In a terminal</strong> launches the same session in a terminal window instead. Watch it work: the diff appears here on its own as it writes, and nothing is uploaded until you approve it.<br><br>Fixed it yourself already? <strong>Publish local changes</strong> runs the publish dry run first, which says what is live and what an upload would change.");
      return;
    }
    const d = diffLines(eol(t.before), eol(t.tsx));
    counts.innerHTML = d.added || d.removed ? `<span class="tag ok">+${d.added}</span> <span class="tag err">&minus;${d.removed}</span>` : "";
    el.innerHTML = !d.added && !d.removed ? '<p class="muted small" style="padding:12px">Claude Code has not changed <code>tool.tsx</code> yet (byte-identical to the baseline).</p>'
      : d.tooBig ? `<p class="muted small" style="padding:12px">Rewritten wholesale: ${d.removed} lines out, ${d.added} in.</p>`
        : `<div class="diff">${d.rows.map((r) => `<div class="diff-row" data-k="${r.k}"><span class="diff-gut">${r.k === " " ? "" : esc(r.k)}</span><span class="diff-txt">${esc(r.text) || " "}</span></div>`).join("")}</div>`;
  }

  function renderRenders() {
    const t = S.tool, el = $("edRenders"), cur = current();
    if (!el || !cur) return;
    $("edDevices").innerHTML = Object.entries(DEVICES).map(([k, d]) => `<button type="button" class="seg-btn" data-act="device" data-v="${k}" aria-pressed="${S.device === k}">${d.label}</button>`).join("");
    $("edLangs").innerHTML = LANGS.map(([k, l]) => `<button type="button" class="seg-btn" data-act="lang" data-v="${k}" aria-pressed="${S.lang === k}" title="lang: '${k}'">${l}</button>`).join("");
    const both = !!(t?.before && t?.portBefore);
    const key = `${keyOf()}|${t?.stamp}|${S.device}|${S.lang}|${both}|${t?.ported}`;
    if (key === S.renderKey) return;
    S.renderKey = key;
    if (!t) { el.innerHTML = empty("No source yet", "This tool has no work folder on this machine."); return; }
    if (!t.ported) { el.innerHTML = empty("Not ported yet", `Nothing to render: the After appears when <code>check</code> passes for this tool.`); return; }
    const frame = (v, lbl, tone) => `<div class="mini"><div class="mini-label"><span class="dot ${tone}"></span>${lbl}<span class="muted small">${DEVICES[S.device].w}&times;${DEVICES[S.device].h}</span></div><div class="mini-box"><div class="mini-fit"><iframe title="${lbl}" data-w="${DEVICES[S.device].w}" data-h="${DEVICES[S.device].h}" src="/api/feedback/render?chapter=${encodeURIComponent(cur.chapter)}&slot=${encodeURIComponent(cur.slot)}&v=${v}&lang=${S.lang}&t=${encodeURIComponent(t.stamp)}"></iframe></div></div></div>`;
    el.innerHTML = both ? frame("before", "Before", "pending") + frame("after", "After (on disk)", "ready") : frame("after", "On disk", "pending");
    fitFrames();
  }

  /* each frame is the device's true pixel size, scaled into its box */
  const ro = new ResizeObserver(() => fitFrames());
  function fitFrames() {
    for (const box of document.querySelectorAll("#edRenders .mini-box")) {
      ro.observe(box);
      const f = box.querySelector("iframe");
      if (!f) continue;
      const w = Number(f.dataset.w), h = Number(f.dataset.h), r = box.getBoundingClientRect();
      const k = Math.max(0.05, Math.min((r.width - 16) / w, (r.height - 16) / h, 1));
      Object.assign(f.style, { width: `${w}px`, height: `${h}px`, transform: `scale(${k})` });
      Object.assign(f.parentNode.style, { width: `${w * k}px`, height: `${h * k}px` });
    }
  }

  /* ---- actions ------------------------------------------------------------------------------------ */

  const ACTIONS = {
    edReload: () => load(true),
    edShowAll: () => { for (const [k] of FIELDS) S.f[k] = ""; S.f.chapter = ""; store.set("ed.filters", S.f); render(); },
    edFilter: () => filterPopup(),
    edCopy: () => copyAll(),
    device: (b) => { S.device = b.dataset.v; store.set("ed.device", S.device); renderRenders(); },
    lang: (b) => { S.lang = b.dataset.v; store.set("ed.lang", S.lang); renderRenders(); },
    dismissTerm: () => { S.term = null; renderTerm(); },
    copyCmd: (el) => { navigator.clipboard?.writeText(el.textContent); toast("Copied", "ok"); },
    log: () => logDialog(),
    ide: () => openWith("ide"),
    terminal: () => openWith("terminal"),
    resolveTool: () => resolveConfirm("tool"),
    resolveChapter: () => resolveConfirm("chapter"),
    discard: () => confirmPop("Discard the revision?", `Puts <code>tool.tsx</code> (and the ported pair) back exactly as they were before the fix began. Run <code>check</code> afterwards to make the tool fresh again.`, "&#8634; Yes, discard", async () => {
      const c = current();
      await api("/api/feedback/discard", { chapter: c.chapter, slot: c.slot });
      toast("Revision discarded: the original tool is back", "ok");
      await load(true); loadTool(true);
    }),
    approve: () => publishDialog(true),
    publishDialog: () => publishDialog(false),
  };

  async function openWith(where) {
    const c = current();
    if (!c) return;
    S.run = { kind: where, done: false, lines: [] }; renderBody();
    try {
      const d = await api("/api/feedback/ide", { chapter: c.chapter, slot: c.slot, where });
      S.term = d; S.run = null;
      toast(d.opened ? (where === "terminal" ? "Claude Code opened in a terminal" : "Opened in your IDE: send the prompt to Claude Code there") : "Prepared: run the command shown", d.opened ? "ok" : "warn");
      await load(true); loadTool(true);
    } catch (e) { S.run = null; renderBody(); toast(`Could not prepare the revision: ${e.message}`, "err"); }
  }

  function resolveConfirm(scope) {
    const c = current();
    const n = scope === "tool" ? c.items.length : items().filter((i) => i.chapter === c.chapter).reduce((a, i) => a + i.items.length, 0);
    const what = scope === "tool" ? c.slot : c.chapter;
    confirmPop(scope === "tool" ? "Mark this tool solved?" : "Mark whole chapter solved?",
      `Marks all <strong>${n}</strong> feedback item${n === 1 ? "" : "s"} on <strong>${esc(what)}</strong> as solved. No publish happens: this only takes ${n === 1 ? "it" : "them"} off the review queue.`,
      "&#10003; Yes, mark solved", async () => {
        const d = await api("/api/feedback/resolve", { chapter: c.chapter, ...(scope === "tool" ? { slot: c.slot } : {}) });
        toast(`Marked solved: ${d.resolved} feedback row(s) for ${what}`, "ok");
        await load(true);
      });
  }

  /* ---- runs (publish), followed over SSE, re-attached after a reload -------------------------------- */

  const closeStream = () => { S.es?.close(); S.es = null; };
  function reattach() {
    const c = current();
    const saved = c && ss.get(`ed.run:${c.chapter}`);
    if (saved) attach(saved.runId, saved.kind, c.chapter);
  }
  function attach(runId, kind, chapter) {
    closeStream();
    S.run = { kind, chapter, lines: [], done: false, code: null };
    const es = new EventSource(`/api/feedback/stream?runId=${encodeURIComponent(runId)}`);
    S.es = es;
    es.onopen = () => { if (S.run) S.run.lines = []; };
    es.onmessage = (e) => {
      const ev = JSON.parse(e.data);
      if (!S.run || S.run.chapter !== chapter) return;
      if (ev.type === "log") { S.run.lines.push(ev); logAppend(ev); return; }
      if (ev.type === "done") {
        es.close(); ss.del(`ed.run:${chapter}`);
        Object.assign(S.run, { done: true, code: ev.code });
        toast(ev.code === 0 ? (kind === "publish" ? "Published: feedback of what shipped is resolved" : "Dry run done: read the log") : `${kind === "publish" ? "Publish" : "Dry run"} failed: see the log`, ev.code === 0 ? "ok" : "err");
        renderBody(); logRefresh();
        if (kind === "publish") load(true);
      }
    };
    es.onerror = () => { es.close(); if (S.run && !S.run.done) { Object.assign(S.run, { done: true, code: -1 }); renderBody(); logRefresh(); } };
    renderBody();
  }

  /* ---- dialogs -------------------------------------------------------------------------------------- */

  function pop(html, cls = "") {
    closePop();
    const wrap = document.createElement("div");
    wrap.id = "edPop";
    wrap.innerHTML = `<div class="ed-scrim" data-close></div><div class="ed-dialog ${cls}" role="dialog">${html}</div>`;
    document.body.appendChild(wrap);
    wrap.addEventListener("click", (e) => { if (e.target.closest("[data-close]")) closePop(); });
    return wrap.querySelector(".ed-dialog");
  }
  function closePop() { $("edPop")?.remove(); }
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && $("edPop") && !$("edPop").dataset.busy) closePop(); });

  function confirmPop(title, body, yes, fn) {
    const d = pop(`<div class="ed-dtitle">${title}</div><p class="fb-note">${body}</p><div class="ed-dact"><button class="btn" data-close type="button">Cancel</button><button class="btn publish" id="edYes" type="button">${yes}</button></div>`);
    d.querySelector("#edYes").addEventListener("click", async (e) => {
      const b = e.currentTarget; b.disabled = true; b.innerHTML = '<span class="spin"></span>' + b.innerHTML; $("edPop").dataset.busy = "1";
      try { await fn(); closePop(); } catch (err) { delete $("edPop").dataset.busy; b.disabled = false; toast(err.message, "err"); }
    });
  }

  function filterPopup() {
    const teachers = [...new Set(scoped().flatMap((i) => i.items.map((it) => it.teacher || "unknown")))].sort();
    const d = pop(`<div class="ed-dtitle">Filter feedback</div>
      <div class="ed-frow"><label>From <input type="date" id="fFrom" value="${esc(S.fb.from)}"></label><label>To <input type="date" id="fTo" value="${esc(S.fb.to)}"></label></div>
      <div class="ed-frow"><label style="flex:1">Teacher <select id="fTeacher"><option value="">Every teacher</option>${teachers.map((t) => `<option${S.fb.teacher === t ? " selected" : ""}>${esc(t)}</option>`).join("")}</select></label></div>
      <label class="ed-switch"><input type="checkbox" id="fHide"${S.fb.hideNotInPlan ? " checked" : ""}> Hide tools that have no work folder on this machine</label>
      <div class="ed-dact"><button class="btn" id="fClear" type="button">Clear</button><button class="btn primary" data-close type="button">Done</button></div>`, "sm");
    const upd = () => { S.fb = { from: d.querySelector("#fFrom").value, to: d.querySelector("#fTo").value, teacher: d.querySelector("#fTeacher").value, hideNotInPlan: d.querySelector("#fHide").checked }; render(); };
    d.addEventListener("change", upd);
    d.querySelector("#fClear").addEventListener("click", () => { d.querySelector("#fFrom").value = d.querySelector("#fTo").value = d.querySelector("#fTeacher").value = ""; upd(); });
  }

  function logDialog() {
    if (!S.run) return;
    pop(`<div class="ed-dhead"><span class="ed-dtitle" style="flex:1" id="logTitle"></span><button class="btn sm" data-close type="button">&times;</button></div><div class="ed-log" id="edLog"></div>`, "wide");
    logRefresh();
  }
  function logRefresh() {
    const body = $("edLog"); if (!body || !S.run) return;
    $("logTitle").innerHTML = `${esc(S.run.kind)} log <span class="tag ${S.run.done ? (S.run.code === 0 ? "ok" : "err") : "info"}">${S.run.done ? (S.run.code === 0 ? "done" : `exit ${S.run.code}`) : "running"}</span>`;
    body.innerHTML = S.run.lines.length ? "" : '<p class="muted small">starting&hellip;</p>';
    for (const l of S.run.lines) logAppend(l);
  }
  function logAppend(l) {
    const body = $("edLog"); if (!body) return;
    body.querySelector("p.muted")?.remove();
    const row = document.createElement("div");
    row.className = "log-row" + (l.stream === "err" ? " err" : "");
    row.textContent = l.text;
    body.appendChild(row);
    if (!S.run?.done) body.scrollTop = body.scrollHeight;
  }

  /* Publish local changes: the chapter's tools on disk, ticked ones published one after another by the class
     CLI. Dry run writes nothing; Publish uploads (and --apply only when its own box is ticked). */
  async function publishDialog(onlyThis) {
    const c = current();
    const d = pop(`<div class="ed-dtitle">Publish local changes</div><p class="fb-note">Tools on disk for <strong>${esc(c.chapter)}</strong>. Each one you tick runs <code>node cli.mjs publish ${esc(c.chapter)}/&lt;id&gt;</code> in its class folder. <strong>Dry run</strong> writes nothing and says what is live and what an upload would change; <strong>Publish</strong> adds <code>--upload</code> (md5-verified) and marks the feedback of each tool that ships resolved.</p><div id="pubBody"><p class="muted small"><span class="spin"></span>Reading the chapter&hellip;</p></div>`, "wide");
    let tools;
    try { tools = (await api(`/api/feedback/local-tools?chapter=${encodeURIComponent(c.chapter)}`)).tools; }
    catch (e) { d.querySelector("#pubBody").innerHTML = `<div class="issue err">${esc(e.message)}</div>`; return; }
    const counts = Object.fromEntries(items().filter((i) => i.chapter === c.chapter).map((i) => [i.slot, i.items.length]));
    const pubOk = (t) => t.ported && t.in_live_plan !== false; // publish runs against the live plan: a tool it no longer has cannot go
    const picked = new Set((onlyThis ? tools.filter((t) => t.slot_id === c.slot) : tools.filter((t) => t.revised || t.slot_id === c.slot)).filter(pubOk).map((t) => t.slot_id));
    const body = d.querySelector("#pubBody");
    body.innerHTML = `<div class="ed-pbar"><input type="search" id="pubQ" placeholder="Search tool id or title&hellip;"><button class="btn sm" data-p="all" type="button">All</button><button class="btn sm" data-p="edited" type="button">Edited</button><button class="btn sm" data-p="none" type="button">None</button></div>
      <div class="ed-plist" id="pubList"></div>
      <label class="ed-switch"><input type="checkbox" id="pubApply"> Also <code>--apply</code>: write <code>lp2_media.url</code> where the dry run says it differs (needs its own approval)</label>
      <div class="ed-dact"><button class="btn" data-close type="button">Cancel</button><button class="btn" id="pubDry" type="button">Dry run</button><button class="btn publish" id="pubGo" type="button"></button></div>`;
    const paint = () => {
      const q = d.querySelector("#pubQ").value.trim().toLowerCase();
      d.querySelector("#pubList").innerHTML = tools.filter((t) => !q || `${t.title} ${t.slot_id}`.toLowerCase().includes(q)).map((t) => `<label class="ed-prow${pubOk(t) ? "" : " off"}"><input type="checkbox" data-id="${esc(t.slot_id)}"${picked.has(t.slot_id) ? " checked" : ""}${pubOk(t) ? "" : " disabled"}>
        <span style="flex:1;min-width:0"><span class="tool-title">${esc(t.title)}</span><span class="tool-id">${esc(t.slot_id)}</span></span>
        <span class="ed-tags">${counts[t.slot_id] ? `<span class="tag warn">&#128172; ${counts[t.slot_id]}</span>` : ""}${t.revised ? '<span class="tag info">Revised</span>' : ""}${t.stage ? `<span class="tag muted">${esc(t.stage)}</span>` : ""}${t.checks ? `<span class="tag ${t.checks.fail ? "err" : t.checks.warn ? "warn" : "ok"}">${t.checks.pass}/${t.checks.warn}/${t.checks.fail}</span>` : ""}${t.ported ? "" : '<span class="tag err">Not ported</span>'}${t.in_live_plan === false ? '<span class="tag err" title="The live plan no longer has a tool with this id: re-key the chapter first">Not in live plan</span>' : ""}</span></label>`).join("") || '<p class="muted small">No tool matches.</p>';
      const n = [...picked].filter((id) => tools.some((t) => t.slot_id === id && pubOk(t))).length;
      d.querySelector("#pubGo").innerHTML = `&#9729; Publish ${n} tool${n === 1 ? "" : "s"}`;
      d.querySelector("#pubGo").disabled = d.querySelector("#pubDry").disabled = !n;
    };
    paint();
    d.querySelector("#pubQ").addEventListener("input", paint);
    d.querySelector("#pubList").addEventListener("change", (e) => { const id = e.target.dataset.id; if (id) { if (e.target.checked) picked.add(id); else picked.delete(id); paint(); } });
    for (const b of d.querySelectorAll("[data-p]")) b.addEventListener("click", () => {
      picked.clear();
      for (const t of tools) if (pubOk(t) && (b.dataset.p === "all" || (b.dataset.p === "edited" && t.revised))) picked.add(t.slot_id);
      paint();
    });
    const go = async (upload) => {
      const slots = [...picked].filter((id) => tools.some((t) => t.slot_id === id && pubOk(t)));
      try {
        const { runId } = await api("/api/feedback/publish-many", { chapter: c.chapter, slots, upload, apply: upload && d.querySelector("#pubApply").checked });
        ss.set(`ed.run:${c.chapter}`, { runId, kind: upload ? "publish" : "dry run" });
        closePop(); attach(runId, upload ? "publish" : "dry run", c.chapter); logDialog();
      } catch (e) { toast(`Could not start: ${e.message}`, "err"); }
    };
    d.querySelector("#pubDry").addEventListener("click", () => go(false));
    d.querySelector("#pubGo").addEventListener("click", () => go(true));
  }

  /* Copy every filtered feedback item: chapter, then "slot -> text" with the screenshot inlined (HTML), and a
     plain-text copy beside it for targets that cannot take HTML */
  async function copyAll() {
    const list = filtered();
    const total = list.reduce((n, i) => n + i.items.length, 0);
    if (!total) return;
    const groups = new Map();
    for (const i of list) { if (!groups.has(i.chapter)) groups.set(i.chapter, []); groups.get(i.chapter).push(i); }
    const text = [...groups].map(([ch, rows]) => `${ch}\n${rows.flatMap((r) => r.items.map((it) => `  ${r.slot} -> ${it.text || "(no text)"}${it.image_url ? `\n  image: ${it.image_url}` : ""}`)).join("\n")}`).join("\n\n");
    try {
      const toData = async (u) => { const r = await fetch(`/api/feedback/shot?url=${encodeURIComponent(u)}`); if (!r.ok) return ""; const b = await r.blob(); return new Promise((res) => { const f = new FileReader(); f.onload = () => res(f.result); f.onerror = () => res(""); f.readAsDataURL(b); }); };
      const html = (await Promise.all([...groups].map(async ([ch, rows]) => `<div style="margin-bottom:14px"><div style="font-weight:600">${esc(ch)}</div>${(await Promise.all(rows.flatMap((r) => r.items.map(async (it) => {
        const img = it.image_url ? await toData(it.image_url) : "";
        return `<div style="margin:4px 0 8px 16px"><code>${esc(r.slot)}</code> &rarr; ${esc(it.text) || "<em>(no text)</em>"}${img ? `<br><img src="${img}" style="max-width:420px;display:block;margin:4px 0 0 16px;border:1px solid #ddd">` : ""}</div>`;
      })))).join("")}</div>`))).join("");
      await navigator.clipboard.write([new ClipboardItem({ "text/html": new Blob([`<div>${html}</div>`], { type: "text/html" }), "text/plain": new Blob([text], { type: "text/plain" }) })]);
      toast(`Copied ${total} feedback item(s) to the clipboard`, "ok");
    } catch {
      try { await navigator.clipboard.writeText(text); toast(`Copied ${total} feedback item(s) as text (images unsupported here)`, "warn"); }
      catch (e) { toast(`Could not copy: ${e.message}`, "err"); }
    }
  }

  function toast(msg, tone) {
    const t = document.createElement("div");
    t.className = `ed-toast ${tone || ""}`;
    t.textContent = msg;
    $("edToasts").appendChild(t);
    setTimeout(() => t.remove(), 4500);
  }

  /* ---- the diff (same LCS + context collapse as Tool_Pipeline's preview Editor) ---------------------- */

  const eol = (s) => String(s || "").replace(/\r\n/g, "\n");
  function diffLines(before, after, cap = 1500) {
    const CTX = 3, A = before.split("\n"), B = after.split("\n");
    let s = 0; while (s < A.length && s < B.length && A[s] === B[s]) s++;
    let e = 0; while (e < A.length - s && e < B.length - s && A[A.length - 1 - e] === B[B.length - 1 - e]) e++;
    if (s === A.length && s === B.length && !e) return { rows: [], added: 0, removed: 0 };
    s = Math.max(0, s - CTX); e = Math.max(0, e - CTX);
    const a = A.slice(s, A.length - e), b = B.slice(s, B.length - e);
    if (!a.length && !b.length) return { rows: [], added: 0, removed: 0 };
    if (a.length > cap || b.length > cap) return { rows: [], added: b.length, removed: a.length, tooBig: true };
    const w = b.length + 1, dp = new Int32Array((a.length + 1) * w);
    for (let i = a.length - 1; i >= 0; i--) for (let j = b.length - 1; j >= 0; j--) dp[i * w + j] = a[i] === b[j] ? dp[(i + 1) * w + j + 1] + 1 : Math.max(dp[(i + 1) * w + j], dp[i * w + j + 1]);
    const raw = []; let added = 0, removed = 0, i = 0, j = 0;
    while (i < a.length && j < b.length) {
      if (a[i] === b[j]) { raw.push({ k: " ", text: a[i] }); i++; j++; }
      else if (dp[(i + 1) * w + j] >= dp[i * w + j + 1]) { raw.push({ k: "-", text: a[i] }); removed++; i++; }
      else { raw.push({ k: "+", text: b[j] }); added++; j++; }
    }
    for (; i < a.length; i++) { raw.push({ k: "-", text: a[i] }); removed++; }
    for (; j < b.length; j++) { raw.push({ k: "+", text: b[j] }); added++; }
    const keep = raw.map(() => false);
    raw.forEach((r, x) => { if (r.k !== " ") for (let y = Math.max(0, x - CTX); y <= Math.min(raw.length - 1, x + CTX); y++) keep[y] = true; });
    const gap = (n) => ({ k: "@", text: `⋯ ${n} unchanged line${n > 1 ? "s" : ""}` });
    const rows = []; if (s > 0) rows.push(gap(s));
    let skipped = 0;
    raw.forEach((r, x) => { if (keep[x]) { if (skipped) { rows.push(gap(skipped)); skipped = 0; } rows.push(r); } else skipped++; });
    if (skipped) rows.push(gap(skipped)); if (e > 0) rows.push(gap(e));
    return { rows, added, removed };
  }

  /* ---- start: the badge always, the Editor itself when the link or the last visit asks for it ------- */
  load(false);
  if (location.hash === "#editor" || (!location.hash && store.get("ed.view", "preview") === "editor")) setView("editor");
})();
