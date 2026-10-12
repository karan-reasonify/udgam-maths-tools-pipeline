/* One 2D mount -> brief.md: only what the builder needs, as plain Markdown.
 *
 * Dropped on purpose, because the runtime already implements them identically for every
 * Udgam tool: tool_config.style (bands, zones, type, motion), audio (the three standard
 * cues), modes (none), parameters.hostProps and phase_mount prose (the host contract),
 * agent_control (disabled), voice.rules, generation_prompt boilerplate, source_tool
 * (a duplicate), and the teacher-only fields (hands, check, finish, freePlay).
 * Also dropped: everything `scaffold` copies into tool.tsx (each phase's teach line,
 * hint-ladder prose, closing line and items; the opening and finish voice lines;
 * concept ids and objectives), so the builder never reads the same words twice.
 * The raw mount is kept beside it as slot.json for the sidecar; builders read the brief.
 */

const txt = (v) => (v === undefined || v === null ? "" : String(v).trim());
const one = (label, v) => (txt(v) ? `**${label}:** ${txt(v)}` : null);

/* learn items carry a worked solution and a named misconception: the raw material of a
   traceback. Only those two fields are kept here; the items themselves live in tool.tsx. */
function misconceptions(tc, n) {
  const learn = ((tc.tool_questions || {}).learn || {}).items || [];
  return learn.filter((it) => Number(it.phase) === Number(n) && txt(it.misconception)).map((it) => txt(it.misconception));
}

export function buildBrief(m, ctx) {
  const s = m.slot;
  const tc = s.tool_config || {};
  const w = s.writeup || {};
  const topic = m.trail.topic || {};
  const segment = m.trail.segment || {};
  const phases = Array.isArray(w.phases) ? w.phases : [];
  const obs = Array.isArray(w.observations) ? w.observations : [];
  const chrome = (tc.style && tc.style.chrome) || {};
  const voice = tc.voice || {};
  const vl = Array.isArray(w.voiceLines) ? w.voiceLines : [];
  const L = [];
  const push = (...xs) => { for (const x of xs) if (x !== null && x !== undefined) L.push(x); };

  push(`# ${s.id} · ${txt(s.tool_id || tc.toolName)} · ${txt(s.title || s.tool_name)}`);
  push(`${ctx.chapterId} · ${ctx.planId} v${ctx.version} (${ctx.how}) · "${txt(ctx.chapterName)}" · segment ${txt(segment.segment_id)} "${txt(segment.segment_name)}" · topic ${txt(topic.topic_id)} "${txt(topic.topic_name)}" · printed ${txt(topic.source_page) || "?"}`);
  push("", "> Runtime supplies the standard chrome (bands, zones, header, runs box, slot + pad, bubble, phase bar, type scale, content colours, sounds, finished/idle/restart). `scaffold` puts each phase's concept, teach line, hint ladder, closing line and items into tool.tsx; they are not repeated here. Build the working area and the mechanics.", "");

  push("## What it is");
  push(one("Description", s.description), one("Why", w.why), one("Look", w.look), one("Context", s.context),
    one("For the child", s.instructions_for_student), one("Teaching notes", s.teaching_notes));
  if (tc.placement) push(one("Placement", txt(tc.placement.beat)));
  if (Array.isArray(s.reused_in_topics) && s.reused_in_topics.length) push(one("Also mounted in", s.reused_in_topics.join(", ")));
  push("");

  push("## Look");
  push(one("Chrome", Object.entries(chrome).map(([k, v]) => `${k} ${v}`).join(" · ")),
    one("Voice", `rate ${txt(voice.rate)}, pitch ${txt(voice.pitch)} · figure: ${txt(voice.figure).split(".")[0] || "?"}`));
  push("");

  push("## Stage (tool-specific layout)", txt(w.stage), "");
  push("## Opening (first frame of every mount)", txt(w.opening), "");

  push("## Phases (what each mount shows and does; the words are in tool.tsx)");
  phases.forEach((p, i) => {
    push("", `### ${p.n} · ${txt(p.concept)}`);
    push(one("Screen", p.screen), one("Does", p.does), one("Win", p.win), one("Feels", p.feels), one("Goal", p.goal));
    const o = obs[i];
    if (o && typeof o === "object" && txt(o.observe)) push(one("Observe", o.observe));
    if (Array.isArray(p.wrong) && p.wrong.length) {
      push("**Wrong (each is a traceback on the working area):**");
      for (const x of p.wrong) push(`- ${txt(x.move)} → ${txt(x.screen)}`);
    }
    const mis = misconceptions(tc, p.n);
    if (mis.length) push(one("Misconception to break", mis.join(" / ")));
  });
  push("");

  push("## Delight", txt(w.delight), "");
  if (vl.length > 2) push(one("General miss line", vl[vl.length - 2]), "");
  if (tc.answer_key && txt(tc.answer_key.rule)) push("## Answer key", txt(tc.answer_key.rule), "");
  if (Array.isArray(tc.student_controls) && tc.student_controls.length) {
    push("## Student controls");
    for (const c of tc.student_controls) push(`- **${txt(c.control)}**: ${txt(c.effect)}`);
    push("");
  }
  const fields = tc.shared_state && tc.shared_state.fields;
  if (Array.isArray(fields) && fields.length) push("## State fields (getState, a resume contract)", fields.join(", "), "");

  const chunk = txt(topic.publication_chunk || topic.original_chunk);
  if (chunk || (topic.key_terms || []).length) {
    push("## Textbook (this topic)");
    push(one("Pages", Array.isArray(topic.source_pages) ? topic.source_pages.join(", ") : topic.source_page));
    push(one("Key terms", (topic.key_terms || []).join(", ")));
    if (chunk) push(chunk);
    push("");
  }
  return L.join("\n").replace(/\n{3,}/g, "\n\n").trim() + "\n";
}
