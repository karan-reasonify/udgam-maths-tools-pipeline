/* the mascot picture (config `mascot`: ../kiko.svg since 2026-10-13, or a PNG) -> runtime/mascot.tsx: the footer mascot,
 * carried INSIDE every tool.
 *
 * Nothing is fetched at run time, so the local preview, staging and production paint the
 * same bytes (the NCERT Class 4 tools ship their mascot the same way). The art is trimmed to what is drawn,
 * scaled to a height that stays sharp on a 2x smartboard, and encoded as WebP by headless Chrome's own canvas,
 * so there is no image dependency.
 * kiko.svg is vector: in the page its name plate (the group `title`) and its white backdrop (a rect that covers
 * the whole viewBox) are taken out, the rest is drawn straight at the output size. It is never shipped as vector:
 * the file is 1.18 MB (the chest emblem alone 1.04 MB) and the host takes 1 MB a tool. A PNG source is used as it
 * is, as before (runtimes r1 to r52 were made from mascot.png).
 * From an SVG a second picture is made from the same layers: Kiko CHEERING (MASCOT_CHEER, shown while the party
 * plays): both arms swing up and out about the shoulders and are drawn over the hood, and the eyes become two happy
 * arcs. Both pictures are cut to the SAME box (the union of the two), so swapping one for the other never moves Kiko.
 * A third picture is made the same way: Kiko THINKING (MASCOT_THINK, r24: shown while a question waits for the child): the viewer's left
 * hand comes up to the chin (the forearm folds at the elbow over the hood, a round elbow patch over the join), the head tilts a little, and
 * the eyes glance up and aside (iris, ring, pupil and both highlights of each eye move together, clipped to that eye's white). It is cut to
 * the box of the first two (their union; the thinking picture lies inside it), so the three swap without moving Kiko. The thought puff is
 * NOT in the picture: the runtime draws it as plain vector beside the head.
 * A PNG source has no pose: MASCOT_CHEER and MASCOT_THINK are "" and the runtime keeps the standing picture.
 * The output is a data URI of a few tens of KB each. Never read runtime/mascot.tsx; regenerate it.
 */
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { CONFIG, fromRoot } from "../core/env.mjs";
import { dumpDom } from "../core/chrome.mjs";

export function mascotSource() {
  return fromRoot(CONFIG.mascot || "../kiko.svg");
}

/* ids taken out of an SVG mascot: the "KIKO" name plate drawn above the character */
const SVG_DROP = ["title"];

/* the cheering pose, from the layer ids of kiko.svg: the arm layers (L and R) turn about the shoulder (`angle` degrees,
   clockwise for L, mirrored about x = mirror/2 for R) and move to the top of the drawing; the eye layers go and two
   arcs take their place */
const CHEER = {
  angle: 105, pivot: { x: 440, y: 862 }, mirror: 1080,
  arm: ["sleeve_back_", "sleeve_", "sleeve_shade_", "cuff_shade_", "cuff_", "glove_", "glove_hi_", "glove_groove_"],
  eyes: ["eye_shade_", "eye_white_", "eye_iris_", "eye_ring_", "eye_pupil_", "eye_hl1_", "eye_hl2_"],
  arcs: { cx: [456, 630], y: 728, half: 52, top: 650, width: 22, colour: "#FFF6EB" },
};

/* the thinking pose (made in the 2026-10-14 prototype, kiko-think): the head (hood_shade to the last layer) tilts `tilt` degrees about the chin tip, each
   eye's iris group slides (dx, dy) clipped to its white, and the viewer's left arm: the upper arm swings `swing` degrees about the shoulder and is clipped
   at the elbow, the forearm (lower sleeve, cuff, glove) folds `fold` degrees about the elbow and is drawn over the hood with a round patch (r, rim) over
   the join */
const THINK = {"tilt":-4,"tiltPivot":{"x":544,"y":857},"eye":{"L":{"dx":8,"dy":-24},"R":{"dx":30,"dy":-24}},"arm":{"shoulder":{"x":445,"y":850},"swing":18,"elbow":{"x":401.92825112107624,"y":930},"axis":{"x":-0.452,"y":0.892},"fold":-141.475706642697,"overlap":0,"cap":{"r":33,"rim":4}}};

export function makeMascot({ src = mascotSource(), height = 420, quality } = {}) {
  if (!fs.existsSync(src)) throw new Error(`mascot image not found: ${src}`);
  const file = fs.readFileSync(src);
  const isSvg = /\.svg$/i.test(src);
  if (isSvg ? !/<svg[\s>]/.test(file.toString("utf8", 0, 4096)) : file.readUInt32BE(0) !== 0x89504e47)
    throw new Error(`${src} is not a ${isSvg ? "SVG" : "PNG"}`);
  const q = quality ?? (isSvg ? 0.92 : 0.86);
  /* how the page gets its pictures: a PNG as it is; an SVG parsed, cleaned, given an explicit size and serialised, once
     as it stands and once posed */
  const load = isSvg
    ? `const doc = new DOMParser().parseFromString(${JSON.stringify(file.toString("utf8")).replace(/</g, "\\u003c")}, "image/svg+xml");
const root = doc.documentElement;
if (doc.querySelector("parsererror")) { document.getElementById("out").textContent = JSON.stringify({ error: "svg did not parse" }); throw new Error("svg"); }
const vb = (root.getAttribute("viewBox") || "").trim().split(/[ ,]+/).map(Number);
const W0 = vb.length === 4 ? vb[2] : parseFloat(root.getAttribute("width")), H0 = vb.length === 4 ? vb[3] : parseFloat(root.getAttribute("height"));
const dropped = [];
for (const id of ${JSON.stringify(SVG_DROP)}) { const n = doc.querySelector('[id="' + id + '"]'); if (n) { n.remove(); dropped.push(id); } }
for (const r of Array.from(root.children)) {
  if (r.localName === "rect" && !+r.getAttribute("x") && !+r.getAttribute("y") && parseFloat(r.getAttribute("width")) >= W0 && parseFloat(r.getAttribute("height")) >= H0) { r.remove(); dropped.push("backdrop"); }
}
root.setAttribute("width", W0); root.setAttribute("height", H0);
const ser = (r) => "data:image/svg+xml;charset=utf-8," + encodeURIComponent(new XMLSerializer().serializeToString(r));
const CH = ${JSON.stringify(CHEER)}, TK = ${JSON.stringify(THINK)};
const NS = "http://www.w3.org/2000/svg";
function pose(r) {
  const D = r.ownerDocument, NS = "http://www.w3.org/2000/svg", k = r.querySelector('[id="kiko"]') || r;
  const by = (id) => r.querySelector('[id="' + id + '"]');
  for (const side of ["L", "R"]) {
    const arm = D.createElementNS(NS, "g");
    const px = side === "L" ? CH.pivot.x : CH.mirror - CH.pivot.x;
    arm.setAttribute("transform", "rotate(" + ((side === "L" ? 1 : -1) * CH.angle) + " " + px + " " + CH.pivot.y + ")");
    for (const p of CH.arm) { const n = by(p + side); if (n) arm.appendChild(n); }
    k.appendChild(arm);
  }
  for (const p of CH.eyes) for (const side of ["L", "R"]) { const n = by(p + side); if (n) n.remove(); }
  for (const cx of CH.arcs.cx) {
    const a = D.createElementNS(NS, "path");
    a.setAttribute("d", "M " + (cx - CH.arcs.half) + " " + CH.arcs.y + " Q " + cx + " " + CH.arcs.top + " " + (cx + CH.arcs.half) + " " + CH.arcs.y);
    a.setAttribute("fill", "none"); a.setAttribute("stroke", CH.arcs.colour); a.setAttribute("stroke-width", CH.arcs.width); a.setAttribute("stroke-linecap", "round");
    k.appendChild(a);
  }
}
/* ---- THE THINKING POSE (the viewer's left arm raised; everything else is the standing picture) ---- */
function think(r, T) {
  const D = r.ownerDocument, k = r.querySelector('[id="kiko"]') || r;
  const by = (id) => r.querySelector('[id="' + id + '"]');
  const el = (name, attrs) => { const e = D.createElementNS(NS, name); for (const a in attrs) e.setAttribute(a, attrs[a]); return e; };
  const clone = (n) => { const c = n.cloneNode(true); c.removeAttribute("id"); return c; };
  let defs = r.querySelector("defs"); if (!defs) { defs = el("defs", {}); r.insertBefore(defs, r.firstChild); }
  /* 1. the head: hood_shade to the last layer (hood, opening, lining, void, eyes) in ONE group, tilted about the chin tip */
  const head = el("g", { id: "head" });
  const hs = by("hood_shade");
  k.insertBefore(head, hs);
  { let n = hs; while (n) { const nx = n.nextSibling; if (n !== head) head.appendChild(n); n = nx; } }
  if (T.tilt) head.setAttribute("transform", "rotate(" + T.tilt + " " + T.tiltPivot.x + " " + T.tiltPivot.y + ")");
  /* 2. the glance: iris, ring, pupil and both highlights of each eye move together, clipped to that eye's white (an upper lid) */
  for (const side of ["L", "R"]) {
    const white = by("eye_white_" + side), iris = by("eye_iris_" + side);
    const cp = el("clipPath", { id: "cpEye" + side });
    cp.appendChild(clone(white.querySelector("path")));
    defs.appendChild(cp);
    const wrap = el("g", { "clip-path": "url(#cpEye" + side + ")" });
    const mv = el("g", { transform: "translate(" + T.eye[side].dx + " " + T.eye[side].dy + ")" });
    wrap.appendChild(mv);
    iris.parentNode.insertBefore(wrap, iris);
    for (const p of ["eye_iris_", "eye_ring_", "eye_pupil_", "eye_hl1_", "eye_hl2_"]) mv.appendChild(by(p + side));
  }
  /* 3. the arm: the upper arm stays in place (its layers are only clipped at the elbow line); the forearm (the lower sleeve, cuff and glove)
        folds about the elbow and is drawn over the hood, with a round elbow patch over the join */
  const side = "L", A = T.arm;
  const E = A.elbow, dir = A.axis, nrm = { x: -dir.y, y: dir.x }, BIG = 700, ov = A.overlap || 0;
  const P = (a, b) => (E.x + dir.x * a + nrm.x * b).toFixed(1) + "," + (E.y + dir.y * a + nrm.y * b).toFixed(1);
  const cpU = el("clipPath", { id: "cpUp" }); cpU.appendChild(el("polygon", { points: [P(-BIG, -BIG), P(ov, -BIG), P(ov, BIG), P(-BIG, BIG)].join(" ") })); defs.appendChild(cpU);
  const cpF = el("clipPath", { id: "cpFore" }); cpF.appendChild(el("polygon", { points: [P(-ov, -BIG), P(BIG, -BIG), P(BIG, BIG), P(-ov, BIG)].join(" ") })); defs.appendChild(cpF);
  const sleeveSet = ["sleeve_back_", "sleeve_", "sleeve_shade_"];
  const arm = el("g", { id: "arm_think" });
  const fore = el("g", { transform: "rotate(" + A.fold + " " + E.x + " " + E.y + ")" });
  const forePart = el("g", { "clip-path": "url(#cpFore)" });
  for (const p of sleeveSet) { const c = clone(by(p + side)); forePart.appendChild(c); }
  fore.appendChild(forePart);
  if (A.cap) {
    const c = A.cap, cx = E.x + (c.dx || 0), cy = E.y + (c.dy || 0);
    fore.appendChild(el("circle", { cx, cy, r: c.r, fill: "#E6D5C6" }));
    fore.appendChild(el("circle", { cx, cy, r: c.r - (c.rim || 5), fill: "#FFF6EB" }));
  }
  for (const p of ["cuff_shade_", "cuff_", "glove_", "glove_hi_", "glove_groove_"]) fore.appendChild(by(p + side));
  const swingT = A.swing ? "rotate(" + A.swing + " " + A.shoulder.x + " " + A.shoulder.y + ")" : "";
  for (const p of sleeveSet) { const n = by(p + side); n.setAttribute("clip-path", "url(#cpUp)"); if (swingT) n.setAttribute("transform", swingT); }
  if (swingT) arm.setAttribute("transform", swingT);
  arm.appendChild(fore);
  k.appendChild(arm);
}
const standHref = ser(root);
const posed = root.cloneNode(true); pose(posed);
const cheerHref = ser(posed);
const thought = root.cloneNode(true); think(thought, TK);
const thinkHref = ser(thought);`
    : `const dropped = [];
const standHref = "data:image/png;base64,${file.toString("base64")}";
const cheerHref = null, thinkHref = null;`;
  const tmp = fromRoot(".build");
  fs.mkdirSync(tmp, { recursive: true });
  const page = path.join(tmp, "mascot.html");
  fs.writeFileSync(page, `<!doctype html><meta charset="utf-8"><body><pre id="out">pending</pre><script>
${load}
const fail = (m) => { document.getElementById("out").textContent = JSON.stringify({ error: m }); };
const loadImg = (h) => new Promise((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = () => rej(new Error("decode failed")); i.src = h; });
const trim = (img) => {
  const c = document.createElement("canvas"); c.width = img.naturalWidth; c.height = img.naturalHeight;
  const g = c.getContext("2d"); g.drawImage(img, 0, 0);
  const d = g.getImageData(0, 0, c.width, c.height).data;
  let x0 = c.width, y0 = c.height, x1 = -1, y1 = -1, clear = 0;
  for (let y = 0; y < c.height; y++) for (let x = 0; x < c.width; x++) {
    const a = d[(y * c.width + x) * 4 + 3];
    if (a < 250) clear++;
    if (a > 16) { if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; }
  }
  return { x0, y0, x1, y1, clear, W: c.width, H: c.height };
};
(async () => {
  try {
    const a = await loadImg(standHref), b = cheerHref ? await loadImg(cheerHref) : null, c = thinkHref ? await loadImg(thinkHref) : null;
    const ta = trim(a), tb = b ? trim(b) : ta, tc = c ? trim(c) : null;
    const x0 = Math.min(ta.x0, tb.x0), y0 = Math.min(ta.y0, tb.y0), x1 = Math.max(ta.x1, tb.x1), y1 = Math.max(ta.y1, tb.y1);
    /* the box is the union of the standing and the cheering picture ONLY (so those two never change); the thinking picture must lie inside it
       (how far it overshoots each side, in source units: positive is cut off) */
    const over = tc ? { left: x0 - tc.x0, right: tc.x1 - x1, top: y0 - tc.y0, bottom: tc.y1 - y1 } : null;
    const w = x1 - x0 + 1, h = y1 - y0 + 1, H = ${Number(height)}, Wd = Math.round((w * H) / h);
    const enc = (img) => {
      const o = document.createElement("canvas"); o.width = Wd; o.height = H;
      const og = o.getContext("2d"); og.imageSmoothingEnabled = true; og.imageSmoothingQuality = "high";
      og.drawImage(img, x0, y0, w, h, 0, 0, Wd, H);
      return o.toDataURL("image/webp", ${Number(q)});
    };
    document.getElementById("out").textContent = JSON.stringify({
      src: { w: ta.W, h: ta.H }, box: { x0, y0, w, h }, stand: { w: ta.x1 - ta.x0 + 1, h: ta.y1 - ta.y0 + 1 }, out: { w: Wd, h: H }, dropped,
      transparent: ta.clear / (ta.W * ta.H), webp: enc(a), cheer: b ? enc(b) : "", think: c ? enc(c) : "", over });
  } catch (e) { fail(String((e && e.message) || e)); }
})();
</script>`);
  const dom = dumpDom(pathToFileURL(page).href, { budget: isSvg ? 30000 : 5000, label: "mascot" });
  fs.rmSync(page, { force: true });
  const m = /<pre id="out">([\s\S]*?)<\/pre>/.exec(dom);
  if (!m) throw new Error("mascot page produced nothing");
  const r = JSON.parse(m[1].replace(/&quot;/g, '"').replace(/&amp;/g, "&"));
  if (r.error) throw new Error(`mascot: ${r.error}`);
  if (!/^data:image\/webp;base64,/.test(r.webp)) throw new Error("this Chrome did not encode WebP");
  if (r.cheer && !/^data:image\/webp;base64,/.test(r.cheer)) throw new Error("this Chrome did not encode the cheer pose as WebP");
  if (r.think && !/^data:image\/webp;base64,/.test(r.think)) throw new Error("this Chrome did not encode the thinking pose as WebP");
  /* the thinking picture is drawn into the box of the other two: more than 4 source units cut off on a side (about 1.5 px of the 420) is a defect of the pose */
  if (r.over && Math.max(r.over.left, r.over.right, r.over.top, r.over.bottom) > 4) throw new Error(`the thinking pose does not lie inside the box of the standing and cheering pictures (cut off: ${JSON.stringify(r.over)})`);
  if (r.transparent < 0.2) console.log("  warning: the mascot picture has little transparency; it will paint its own background");
  const rel = path.relative(fromRoot("."), src).replace(/\\/g, "/");
  const out = fromRoot("runtime/mascot.tsx");
  fs.writeFileSync(out, `/* GENERATED by \`node cli.mjs mascot\` from ${rel} (${r.src.w}x${r.src.h}${isSvg ? " svg" : ""}, art ${r.stand.w}x${r.stand.h}, all pictures cut to ${r.box.w}x${r.box.h})
   -> ${r.out.w}x${r.out.h} WebP q${q}${r.cheer ? ", plus the cheering pose (MASCOT_CHEER, the party's)" : ", no cheering pose"}${r.think ? ", plus the thinking pose (MASCOT_THINK, r24: while a question waits)" : ", no thinking pose"}. The mascot travels inside the tool; nothing is fetched,
   so the preview, staging and production paint these exact bytes. Do not edit or read; regenerate. */
const MASCOT_IMAGE: string = "${r.webp}";
const MASCOT_CHEER: string = "${r.cheer || ""}";
const MASCOT_THINK: string = "${r.think || ""}";
const MASCOT_SIZE = { w: ${r.out.w}, h: ${r.out.h} };
`);
  return { out, source: src, src: r.src, art: r.box, stand: r.stand, size: r.out, bytes: Buffer.byteLength(r.webp), cheerBytes: Buffer.byteLength(r.cheer || ""), thinkBytes: Buffer.byteLength(r.think || ""), over: r.over || null, dropped: r.dropped || [] };
}
