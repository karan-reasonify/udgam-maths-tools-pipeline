/* The page-side snapshot of what a Udgam tool draws, in STAGE units (1600 x 900), for the layout checks: every text with its ink
 * band, size and zone, every shape, every live control, what lies off the stage, and (`view`) the real screen it was read on.
 * ONE source for both pages that measure a tool: preview.mjs puts it in the page every `check` run loads (window.__geometry), and
 * approve.mjs injects it into the host page (it is a plain function: `geometry.toString()` is its source). Judged in Node by
 * layoutfit.mjs. Keep it plain JS: it is pasted into a TSX page and into a DevTools evaluate, never imported there. */
export function geometry() {
  const svg = document.querySelector("svg.c4");
  if (!svg) return null;
  const inv = svg.getScreenCTM().inverse();
  const pt = (x, y) => { const p = svg.createSVGPoint(); p.x = x; p.y = y; return p.matrixTransform(inv); };
  const box = (el) => { const r = el.getBoundingClientRect(); const a = pt(r.left, r.top), b = pt(r.right, r.bottom);
    return { x: +a.x.toFixed(1), y: +a.y.toFixed(1), w: +(b.x - a.x).toFixed(1), h: +(b.y - a.y).toFixed(1) }; };
  const zoneOf = (el) => { const z = el.closest("[data-zone]"); return z ? z.getAttribute("data-zone") : null; };
  const shown = (el) => { for (let e = el; e && e !== svg; e = e.parentNode) { const cs = getComputedStyle(e); if (cs.display === "none" || cs.visibility === "hidden" || Number(cs.opacity) < 0.05) return false; } return true; };
  const scaleOf = (el) => { const m = inv.multiply(el.getScreenCTM()); return Math.sqrt(Math.abs(m.a * m.d - m.b * m.c)); };
  /* the ink band of a line of text, from its baseline: what a reader sees, not the line box */
  const ink = (t, b, size) => {
    try { const p = t.getStartPositionOfChar(0), q = svg.createSVGPoint(); q.x = p.x; q.y = p.y;
      const s = q.matrixTransform(inv.multiply(t.getScreenCTM())), desc = /[gjpqy,;()]/.test(t.textContent);
      return { x: b.x, w: b.w, y: +(s.y - 0.74 * size).toFixed(1), h: +((desc ? 0.97 : 0.76) * size).toFixed(1) };
    } catch (e) { return b; }
  };
  const texts = [];
  svg.querySelectorAll("text").forEach((t) => {
    if (!t.textContent.trim() || !shown(t)) return;
    const own = Array.from(t.querySelectorAll("tspan")).filter((s) => s.getAttribute("fill"));
    const size = parseFloat(getComputedStyle(t).fontSize) * scaleOf(t);
    const base = { size: +size.toFixed(1), weight: getComputedStyle(t).fontWeight, zone: zoneOf(t), reading: !!t.closest("[data-role=reading]"),
      control: !!t.closest("[data-control]"), disabled: !!t.closest("[aria-disabled=true]"), stroked: t.getAttribute("stroke") ? true : false };
    if (own.length) own.forEach((s) => { if (!s.textContent.trim()) return; const b = box(s); texts.push({ ...base, text: s.textContent.trim(), box: b, ink: ink(s, b, size), fill: getComputedStyle(s).fill, part: true }); });
    const bt = box(t);
    texts.push({ ...base, text: t.textContent.trim(), box: bt, ink: ink(t, bt, size), fill: getComputedStyle(t).fill, whole: own.length > 0 });
  });
  const controls = Array.from(svg.querySelectorAll("[data-control]")).filter(shown).map((c) => ({ id: c.getAttribute("data-control"),
    role: c.getAttribute("role"), tab: c.getAttribute("tabindex"), label: c.getAttribute("aria-label"), box: box(c), zone: zoneOf(c),
    disabled: c.getAttribute("aria-disabled") === "true" || !!c.closest(".c4-quiet") }));
  const zones = Array.from(svg.querySelectorAll("[data-zone]")).map((z) => ({ zone: z.getAttribute("data-zone"), box: box(z) }));
  /* only pictures that are drawn: the working area stays mounted under the summary page, display none, and its skins read 0 x 0 */
  const images = Array.from(svg.querySelectorAll("image")).filter(shown).map((im) => ({ role: im.getAttribute("data-role"), box: box(im) }));
  const colors = [];
  const stopsOf = (v) => { const m = /url\(["']?#([^"')]+)["']?\)/.exec(v); if (!m) return null; const g = document.getElementById(m[1]);
    return g ? Array.from(g.querySelectorAll("stop")).map((s) => getComputedStyle(s).stopColor) : null; };
  svg.querySelectorAll("rect,circle,ellipse,path,line,polygon,polyline,text,tspan").forEach((el) => {
    if (!shown(el)) return;
    const cs = getComputedStyle(el);
    [["fill", cs.fill, cs.fillOpacity], ["stroke", cs.stroke, cs.strokeOpacity]].forEach(([k, v, o]) => {
      if (!v || v === "none" || Number(o) === 0) return;
      const list = v.startsWith("url") ? stopsOf(v) || [] : [v];
      list.forEach((c) => colors.push({ c, k, zone: zoneOf(el), o: Number(o) }));
    });
  });
  const outside = [], shapes = [];
  svg.querySelectorAll("rect,circle,ellipse,path,line,polygon,image").forEach((el) => {
    if (!shown(el) || el.getAttribute("fill") === "transparent" || el.closest("defs")) return;
    const b = box(el);
    if (b.w <= 0 || b.h <= 0) return;
    const zone = zoneOf(el);
    if (zone) shapes.push({ tag: el.tagName, zone, box: b, cls: el.getAttribute("class") || undefined });
    if (b.x < -1 || b.y < -1 || b.x + b.w > 1601 || b.y + b.h > 901) outside.push({ tag: el.tagName, zone, box: b });
  });
  const bar = svg.querySelector('[data-zone="bar"]');
  const dots = Array.from(svg.querySelectorAll('[data-zone="bar"] [aria-label^="Step "]')).map((d) => ({ role: d.getAttribute("role"),
    tab: d.getAttribute("tabindex"), label: d.getAttribute("aria-label"), current: d.getAttribute("aria-current"), box: box(d),
    state: d.getAttribute("data-state"), fill: Number(d.getAttribute("data-fill")),
    /* the part actually drawn: the fill rect against its track */
    drawn: (() => { const fr = d.querySelector(".c4-fill"), tr = d.querySelector(".c4-body") ? d.querySelector(".c4-body rect") : d.querySelector("rect"); return fr && tr ? +(box(fr).w / box(tr).w).toFixed(3) : 0; })() }));
  const anims = document.getAnimations ? document.getAnimations().filter((a) => a.playState === "running").map((a) => ({
    name: a.animationName || "", infinite: !!(a.effect && a.effect.getComputedTiming && a.effect.getComputedTiming().iterations === Infinity),
    cls: a.effect && a.effect.target && a.effect.target.getAttribute ? a.effect.target.getAttribute("class") : null })) : [];
  const css = Array.from(document.querySelectorAll("style")).map((s) => s.textContent).join("\n");
  return { texts, controls, zones, images, colors, outside, shapes, dots, anims, mode: bar && bar.getAttribute("data-mode"),
    pulses: svg.querySelectorAll(".c4-pulse").length, focusRule: /:focus-visible/.test(css) && /:focus\s*[,{]/.test(css),
    /* the real screen: the window, the scale the stage is drawn at, where the 16:9 frame sits and whether the page scrolls (the phone-frame rows of check and approve) */
    view: { iw: innerWidth, ih: innerHeight, scale: +svg.getScreenCTM().a.toFixed(4), sw: document.documentElement.scrollWidth, sh: document.documentElement.scrollHeight,
      frame: (() => { const r = svg.getBoundingClientRect(); return { x: +r.x.toFixed(1), y: +r.y.toFixed(1), w: +r.width.toFixed(1), h: +r.height.toFixed(1) }; })() } };
}

/* the function as text, for a page that cannot import it */
export const GEOMETRY_SRC = geometry.toString();
