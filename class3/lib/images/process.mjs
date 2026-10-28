/* A raw generated picture -> a SKIN, small, WebP.
 *
 * All pixel work runs in one headless Chrome page (lib/core/chrome.mjs, the way lib/build/mascot.mjs encodes the
 * mascot), so there is no image dependency and any format Gemini answers in (PNG, JPEG, WebP) decodes.
 *   1. background: flood-fill from the border through pixels like the border's own colour, near-white pixels and
 *      grey (shadow-like) pixels, so a soft floor shadow joins the background rather than the object;
 *   2. the cut, by the kind's recipe (rules.mjs KINDS[kind].cut):
 *        cutout    (tile, disc)  the largest blob only (crumbs dropped), alpha 0 outside it, its edge eroded a
 *                  couple of source pixels and softened over one more, so no white antialiased fringe survives the
 *                  downscale (no halo); cropped to the object's box with a one-pixel margin; square for a disc;
 *                  a tile is fitted inside px keeping its own aspect;
 *        interior  (strip)  the largest axis-aligned rectangle inside the object, inset, opaque: a texture band;
 *   3. resized with high-quality smoothing (premultiplied alpha, so transparent pixels never bleed colour in);
 *   4. WebP from q 0.78 down until the data URI is under the budget (then 10 % smaller, up to three times), and
 *      Chrome's embedded ICC profile (456 bytes, sRGB anyway) stripped from the file.
 * The page measures what the review needs on the skin itself (opaque pixels only for a cut-out): near-white share,
 * flatness, cool-colour share, mean colour, transparent share, a white fringe. Failing a hard limit = REJECTED.
 */
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { fromRoot } from "../core/env.mjs";
import { dumpDomAsync } from "../core/chrome.mjs";
import { skinBudget, Q_START, KINDS } from "./rules.mjs";

export const LIMITS = {
  nearWhite: 0.02,        /* interior crop: any white left is background or glare */
  nearWhiteCutout: 0.15,  /* cut-out: a highlight is fine, a white object or a background left inside is not */
  flatStd: 2.0, minObject: 0.03, bgInCrop: 0.01, cool: 0.10, minScale: 0.5, minOpaque: 0.3, halo: 0.15,
};

const PAGE = String.raw`
const RAW = window.__RAW; const OPT = window.__OPT;
document.getElementById("raw").remove();
const out = (o) => { document.getElementById("out").textContent = JSON.stringify(o); };
const img = new Image();
img.onerror = () => out({ error: "the picture did not decode" });
img.onload = () => { try { out(run()); } catch (e) { out({ error: String(e && e.message || e) }); } };
img.src = RAW;

/* 3-4 chamfer distance from every pixel to the nearest background pixel (the frame counts as background) */
function chamfer(bgArr, W, H) {
  const N = W * H, D = new Float32Array(N), BIG = 1e9;
  for (let p = 0; p < N; p++) D[p] = bgArr[p] ? 0 : BIG;
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const p = y * W + x; if (!D[p]) continue;
    let v = D[p];
    v = Math.min(v, x > 0 ? D[p - 1] + 3 : 3, y > 0 ? D[p - W] + 3 : 3);
    v = Math.min(v, x > 0 && y > 0 ? D[p - W - 1] + 4 : 4, x < W - 1 && y > 0 ? D[p - W + 1] + 4 : 4);
    D[p] = v;
  }
  for (let y = H - 1; y >= 0; y--) for (let x = W - 1; x >= 0; x--) {
    const p = y * W + x; if (!D[p]) continue;
    let v = D[p];
    v = Math.min(v, x < W - 1 ? D[p + 1] + 3 : 3, y < H - 1 ? D[p + W] + 3 : 3);
    v = Math.min(v, x < W - 1 && y < H - 1 ? D[p + W + 1] + 4 : 4, x > 0 && y < H - 1 ? D[p + W - 1] + 4 : 4);
    D[p] = v;
  }
  return D;
}

function run() {
  const W = img.naturalWidth, H = img.naturalHeight, N = W * H;
  const c = document.createElement("canvas"); c.width = W; c.height = H;
  const g = c.getContext("2d", { willReadFrequently: true }); g.drawImage(img, 0, 0);
  const id = g.getImageData(0, 0, W, H), d = id.data;

  /* the background's colour: the median of the border */
  const bord = [[], [], []];
  const take = (x, y) => { const i = (y * W + x) * 4; bord[0].push(d[i]); bord[1].push(d[i + 1]); bord[2].push(d[i + 2]); };
  for (let x = 0; x < W; x += 2) { take(x, 0); take(x, H - 1); }
  for (let y = 0; y < H; y += 2) { take(0, y); take(W - 1, y); }
  const med = (a) => { a.sort((p, q) => p - q); return a[a.length >> 1]; };
  const bg = [med(bord[0]), med(bord[1]), med(bord[2])];
  const bgWhite = Math.min(...bg) >= 228 && Math.max(...bg) - Math.min(...bg) <= 20;

  const bgLike = (i) => {
    const r = d[i], gg = d[i + 1], b = d[i + 2];
    const mx = Math.max(r, gg, b), mn = Math.min(r, gg, b), spread = mx - mn;
    const dr = r - bg[0], dg = gg - bg[1], db = b - bg[2];
    /* glass (OPT.glass, class 3 Pour It): a clear jug's rim and edge lines are pale grey (225 to 245), so only the near-border colour is background */
    if (dr * dr + dg * dg + db * db <= (OPT.glass ? 30 : 36) ** 2) return true;     /* like the border */
    if (mn >= (OPT.glass ? 232 : 234) && spread <= 18) return true;                   /* near-white */
    if (spread <= 12 && mx >= (OPT.glass ? 232 : OPT.tool ? 226 : 110)) return true; /* grey: a shadow on the floor (an action-kit tool's steel is darker) */
    /* ponytail: a photo object's cast shadow is a WARM grey (spread up to ~30, its dark contact core under 130 up to ~40; measured on two pizzas and a roti), its
       food edge far more saturated (55+); a grey or steel object would be eaten from its rim: give it a cartoon look until a real matte cut exists */
    if (OPT.photo && mx >= 90 && (spread <= 30 || (spread <= 40 && mx <= 130))) return true;
    return false;
  };

  /* flood the background in from the border (4-connected) */
  const isBg = new Uint8Array(N), q = new Int32Array(N);
  let qh = 0, qt = 0;
  const seed = (p) => { if (!isBg[p] && bgLike(p * 4)) { isBg[p] = 1; q[qt++] = p; } };
  for (let x = 0; x < W; x++) { seed(x); seed((H - 1) * W + x); }
  for (let y = 0; y < H; y++) { seed(y * W); seed(y * W + W - 1); }
  while (qh < qt) {
    const p = q[qh++], x = p % W, y = (p - x) / W;
    if (x > 0) seed(p - 1); if (x < W - 1) seed(p + 1);
    if (y > 0) seed(p - W); if (y < H - 1) seed(p + W);
  }
  /* an action-kit TOOL (OPT.tool, docs/IMAGES.md §11; off for every skin, so a skin cuts exactly as it did): its grey steel or
     graphite is object (above: only a faint grey is a shadow), and a near-white region the border flood cannot reach, at least 0.3 % of the picture, is a hole
     (the scissors' finger loops) and so background too */
  if (OPT.tool) {
    /* glass (OPT.glass): the empty inside of a clear jug is light and neutral but not pure white (refraction), so the hole test is a little wider */
    const nwMin = OPT.glass ? 230 : 234, nwSpread = 18;
    const nw = (i) => Math.min(d[i], d[i + 1], d[i + 2]) >= nwMin && Math.max(d[i], d[i + 1], d[i + 2]) - Math.min(d[i], d[i + 1], d[i + 2]) <= nwSpread;
    const seen = new Uint8Array(N);
    for (let s0 = 0; s0 < N; s0++) {
      if (isBg[s0] || seen[s0] || !nw(s0 * 4)) continue;
      const reg = [s0]; seen[s0] = 1;
      for (let h = 0; h < reg.length; h++) {
        const p = reg[h], x = p % W;
        for (const k of [x > 0 ? p - 1 : -1, x < W - 1 ? p + 1 : -1, p >= W ? p - W : -1, p < N - W ? p + W : -1])
          if (k >= 0 && !isBg[k] && !seen[k] && nw(k * 4)) { seen[k] = 1; reg.push(k); }
      }
      if (reg.length < N * 0.003) continue;
      /* the hole's own soft rim (light, unsaturated) goes with it, up to 5 px, so no white ring is left inside the loop */
      let ring = reg;
      for (const p of reg) isBg[p] = 1;
      for (let k = 0; k < (OPT.glass ? 1 : 5); k++) {   /* glass (class 3 Pour It): one pixel of light haze only, the grey wall is the object */
        const next = [];
        for (const p of ring) {
          const x = p % W;
          for (const n of [x > 0 ? p - 1 : -1, x < W - 1 ? p + 1 : -1, p >= W ? p - W : -1, p < N - W ? p + W : -1]) {
            if (n < 0 || isBg[n]) continue;
            const i = n * 4, mx = Math.max(d[i], d[i + 1], d[i + 2]), mn = Math.min(d[i], d[i + 1], d[i + 2]);
            if (mn >= (OPT.glass ? 225 : 150) && mx - mn <= (OPT.glass ? 20 : 40)) { isBg[n] = 1; next.push(n); }
          }
        }
        ring = next;
      }
    }
  }
  /* a PHOTOGRAPHIC FIGURE (2026-10-24): the studio floor leaves a soft light-neutral haze between the legs, under the arms and round the hair that the
     border flood (tolerant of white and plain grey only) cannot reach or stops at: it shipped as a pale slab between the knees and a halo behind the
     head. So (a) the background grows through light, nearly colourless pixels (no skin, no clothes: a figure wears no white or grey) touching it, and
     (b) any large light-neutral region it still did not reach, enclosed by the figure, is background too. Small ones (eye whites, teeth: under 0.04 % of the picture) stay. */
  if (OPT.kind === "figure") {
    const lite = (i) => { const mx = Math.max(d[i], d[i + 1], d[i + 2]), mn = Math.min(d[i], d[i + 1], d[i + 2]); return mn >= 205 && mx - mn <= 12; };
    const grow = [];
    for (let p = 0; p < N; p++) if (isBg[p]) grow.push(p);
    for (let h = 0; h < grow.length; h++) {
      const p = grow[h], x = p % W;
      for (const k of [x > 0 ? p - 1 : -1, x < W - 1 ? p + 1 : -1, p >= W ? p - W : -1, p < N - W ? p + W : -1])
        if (k >= 0 && !isBg[k] && lite(k * 4)) { isBg[k] = 1; grow.push(k); }
    }
    const seenL = new Uint8Array(N);
    for (let s0 = 0; s0 < N; s0++) {
      if (isBg[s0] || seenL[s0] || !lite(s0 * 4)) continue;
      const reg = [s0]; seenL[s0] = 1;
      for (let h = 0; h < reg.length; h++) {
        const p = reg[h], x = p % W;
        for (const k of [x > 0 ? p - 1 : -1, x < W - 1 ? p + 1 : -1, p >= W ? p - W : -1, p < N - W ? p + W : -1])
          if (k >= 0 && !isBg[k] && !seenL[k] && lite(k * 4)) { seenL[k] = 1; reg.push(k); }
      }
      if (reg.length >= N * 0.0004) for (const p of reg) isBg[p] = 1;
    }
  }
  let objN = 0; for (let p = 0; p < N; p++) if (!isBg[p]) objN++;
  const objFrac = objN / N;
  const reasons = [], warnings = [], extra = {};
  if (!bgWhite) warnings.push("the background is not white (rgb " + bg.join(",") + ")");
  if (OPT.glass && objFrac < OPT.limits.minObject) warnings.push("glass: only " + (objFrac * 100).toFixed(1) + "% of the picture is object (the empty inside is transparent)");
  else if (objFrac < OPT.limits.minObject) return { error: "no object found (" + (objFrac * 100).toFixed(1) + "% of the picture differs from the background)", src: { w: W, h: H }, bg };

  const [TW, TH] = OPT.px;
  let srcCanvas = c, crop, ow, oh;

  if (OPT.cut === "cutout") {
    /* keep the largest blob only */
    const lab = new Int32Array(N); let best = 0, bestN = 0, nextLab = 0, blobs = 0;
    for (let s = 0; s < N; s++) {
      if (isBg[s] || lab[s]) continue;
      nextLab++; blobs++; let n = 0; qh = 0; qt = 0; q[qt++] = s; lab[s] = nextLab;
      while (qh < qt) {
        const p = q[qh++], x = p % W; n++;
        const nb = [x > 0 ? p - 1 : -1, x < W - 1 ? p + 1 : -1, p >= W ? p - W : -1, p < N - W ? p + W : -1];
        for (const k of nb) if (k >= 0 && !isBg[k] && !lab[k]) { lab[k] = nextLab; q[qt++] = k; }
      }
      if (n > bestN) { bestN = n; best = nextLab; }
    }
    const gone = new Uint8Array(N);
    let x0 = W, y0 = H, x1 = -1, y1 = -1, edge = false;
    for (let p = 0; p < N; p++) {
      if (lab[p] !== best) { gone[p] = 1; continue; }
      const x = p % W, y = (p - x) / W;
      if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y;
      if (x === 0 || y === 0 || x === W - 1 || y === H - 1) edge = true;
    }
    if (blobs > 1) extra.droppedBlobs = blobs - 1;
    if (edge) warnings.push("the object touches the picture's edge (cut off?)");
    const obox = { x: x0, y: y0, w: x1 - x0 + 1, h: y1 - y0 + 1 };
    extra.obox = obox;

    /* how many source pixels make one output pixel, then erode the fringe by about half of that (2 to 4 px) */
    const side = Math.max(obox.w, obox.h);
    const s = OPT.kind === "disc" ? side / TW : Math.max(obox.w / TW, obox.h / TH);
    /* a photographic figure has hair and skin edges blended with the white: erode more and feather over two source pixels (no halo) */
    const fig = OPT.kind === "figure";
    const e = OPT.glass ? 0 : fig ? Math.max(3, Math.min(6, Math.round(s * 0.8))) : Math.max(2, Math.min(4, Math.round(s * 0.5)));   /* glass: none, a rim or wall line is 3 to 8 source px */
    extra.erode = e;
    const D = chamfer(gone, W, H);
    for (let p = 0; p < N; p++) {
      const a = gone[p] ? 0 : Math.max(0, Math.min(1, (D[p] - 3 * e) / (fig ? 6 : 3)));
      d[p * 4 + 3] = Math.round(a * 255);
    }
    const ca = document.createElement("canvas"); ca.width = W; ca.height = H;
    ca.getContext("2d").putImageData(id, 0, 0);
    srcCanvas = ca;

    /* the object's box with a one-output-pixel margin; square and centred for a disc */
    const m = Math.ceil(s);
    if (OPT.kind === "disc") {
      const cx = obox.x + obox.w / 2, cy = obox.y + obox.h / 2, S = side + 2 * m;
      crop = { x: Math.round(cx - S / 2), y: Math.round(cy - S / 2), w: Math.round(S), h: Math.round(S) };
      ow = TW; oh = TH;
      const ar = obox.w / obox.h;
      if (ar < 0.9 || ar > 1.11) warnings.push("the object is not round from above (box " + obox.w + "x" + obox.h + "); perspective?");
    } else {
      crop = { x: obox.x - m, y: obox.y - m, w: obox.w + 2 * m, h: obox.h + 2 * m };
      const k = Math.min(TW / crop.w, TH / crop.h);
      ow = Math.max(1, Math.round(crop.w * k)); oh = Math.max(1, Math.round(crop.h * k));
    }
    if (crop.w < ow) warnings.push("upscaled: the object (" + crop.w + "x" + crop.h + ") is smaller than the target " + ow + "x" + oh);
  } else {
    /* interior: the largest rectangle of object pixels (the histogram method, one row at a time), inset */
    const hgt = new Int32Array(W), st = new Int32Array(W + 1);
    let best = { area: 0, x: 0, y: 0, w: 0, h: 0 };
    for (let y = 0; y < H; y++) {
      for (let x = 0; x < W; x++) hgt[x] = isBg[y * W + x] ? 0 : hgt[x] + 1;
      let top = 0;
      for (let x = 0; x <= W; x++) {
        const h = x < W ? hgt[x] : 0;
        while (top > 0 && hgt[st[top - 1]] >= h) {
          const k = st[--top], hh = hgt[k], left = top > 0 ? st[top - 1] + 1 : 0, ww = x - left;
          if (hh * ww > best.area) best = { area: hh * ww, x: left, y: y - hh + 1, w: ww, h: hh };
        }
        st[top++] = x;
      }
    }
    extra.rect = { x: best.x, y: best.y, w: best.w, h: best.h };
    const ix = best.w * OPT.inset, iy = best.h * OPT.inset;
    const inner = { x: best.x + ix, y: best.y + iy, w: best.w - 2 * ix, h: best.h - 2 * iy };
    if (!(inner.w > 4 && inner.h > 4)) return { error: "no usable interior found", src: { w: W, h: H }, bg };
    /* centred cover-crop to the target aspect: never a stretch */
    const ta = TW / TH, ia = inner.w / inner.h;
    crop = ia > ta ? { x: inner.x + (inner.w - inner.h * ta) / 2, y: inner.y, w: inner.h * ta, h: inner.h }
                   : { x: inner.x, y: inner.y + (inner.h - inner.w / ta) / 2, w: inner.w, h: inner.w / ta };
    crop = { x: Math.round(crop.x), y: Math.round(crop.y), w: Math.max(1, Math.round(crop.w)), h: Math.max(1, Math.round(crop.h)) };
    ow = TW; oh = TH;
    const scale = crop.w / TW;
    if (scale < 1) warnings.push("upscaled " + (1 / scale).toFixed(2) + "x: the interior (" + crop.w + "x" + crop.h + ") is smaller than the target " + TW + "x" + TH);
    if (scale < OPT.limits.minScale) reasons.push("the interior is far too small (" + crop.w + "x" + crop.h + " for " + TW + "x" + TH + ")");
    let bgIn = 0;
    for (let y = crop.y; y < crop.y + crop.h; y++) for (let x = crop.x; x < crop.x + crop.w; x++)
      if (x < 0 || y < 0 || x >= W || y >= H || isBg[y * W + x]) bgIn++;
    extra.bgInCrop = +(bgIn / (crop.w * crop.h)).toFixed(4);
    if (extra.bgInCrop > OPT.limits.bgInCrop) reasons.push("the crop reaches the background (" + (extra.bgInCrop * 100).toFixed(1) + "%)");
  }

  /* resize: halve while far bigger, then the last step with high-quality smoothing */
  const sized = (tw, th) => {
    let src = srcCanvas, sx = crop.x, sy = crop.y, sw = crop.w, sh = crop.h;
    while (sw > tw * 2.2 && sh > th * 2.2) {
      const mm = document.createElement("canvas"); mm.width = Math.round(sw / 2); mm.height = Math.round(sh / 2);
      const mg = mm.getContext("2d"); mg.imageSmoothingEnabled = true; mg.imageSmoothingQuality = "high";
      mg.drawImage(src, sx, sy, sw, sh, 0, 0, mm.width, mm.height);
      src = mm; sx = 0; sy = 0; sw = mm.width; sh = mm.height;
    }
    const o = document.createElement("canvas"); o.width = tw; o.height = th;
    const og = o.getContext("2d", { willReadFrequently: true }); og.imageSmoothingEnabled = true; og.imageSmoothingQuality = "high";
    og.drawImage(src, sx, sy, sw, sh, 0, 0, tw, th);
    return o;
  };
  const o = sized(ow, oh);

  /* what the review needs, measured on the skin itself (opaque pixels only) */
  const od = o.getContext("2d").getImageData(0, 0, ow, oh).data, M = ow * oh;
  let n = 0, nw = 0, cool = 0, sl = 0, sl2 = 0, sr = 0, sg = 0, sb = 0, semi = 0, semiWhite = 0;
  for (let i = 0; i < od.length; i += 4) {
    const r = od[i], gg = od[i + 1], b = od[i + 2], a = od[i + 3], mx = Math.max(r, gg, b), mn = Math.min(r, gg, b);
    if (a > 0 && a < 200) { semi++; if (mn >= 215) semiWhite++; }
    if (a < 128) continue;
    n++;
    if (mn >= 232 && mx - mn <= 24) nw++;
    const L = 0.2126 * r + 0.7152 * gg + 0.0722 * b; sl += L; sl2 += L * L; sr += r; sg += gg; sb += b;
    if (mx > 40 && (mx - mn) / mx > 0.2) {
      let h; const dd = mx - mn;
      if (mx === r) h = 60 * (((gg - b) / dd) % 6); else if (mx === gg) h = 60 * ((b - r) / dd + 2); else h = 60 * ((r - gg) / dd + 4);
      if (h < 0) h += 360;
      if (h >= 75 && h <= 285) cool++;
    }
  }
  n = Math.max(1, n);
  const mean = [sr / n, sg / n, sb / n].map(Math.round), lumStd = Math.sqrt(Math.max(0, sl2 / n - (sl / n) ** 2));
  const stats = { nearWhite: +(nw / n).toFixed(4), lumStd: +lumStd.toFixed(2), cool: +(cool / n).toFixed(4), mean,
    opaque: +(n / M).toFixed(3), halo: semi ? +(semiWhite / semi).toFixed(3) : 0, objFrac: +objFrac.toFixed(3) };
  const cutout = OPT.cut === "cutout";
  const warnOr = (list, msg) => (OPT.glass ? warnings : list).push(OPT.glass ? "glass: " + msg : msg);
  const nwMax = cutout ? OPT.limits.nearWhiteCutout : OPT.limits.nearWhite;
  if (stats.nearWhite > nwMax) warnOr(reasons, "near-white " + (stats.nearWhite * 100).toFixed(1) + "% (over " + (nwMax * 100) + "%): " + (cutout ? "a white object, or background left inside it" : "background, glare or frosting left in the skin"));
  else if (cutout && stats.nearWhite > 0.04) warnings.push("near-white " + (stats.nearWhite * 100).toFixed(1) + "% (a strong highlight?)");
  if (stats.lumStd < OPT.limits.flatStd) warnOr(reasons, "flat: almost no variance (luminance sd " + stats.lumStd + ")");
  if (cutout && stats.opaque < OPT.limits.minOpaque) warnOr(reasons, "the cut-out is mostly empty (" + (stats.opaque * 100).toFixed(0) + "% opaque)");
  if (cutout && stats.halo > OPT.limits.halo) warnings.push("a white fringe on the edge (" + (stats.halo * 100).toFixed(0) + "% of edge pixels near-white)");
  if (stats.cool > OPT.limits.cool && OPT.kind !== "figure") warnings.push("cool colours " + (stats.cool * 100).toFixed(0) + "% (blue or green would fight the tool's tint)");

  /* WebP: from q 0.78 down until the data URI fits; then 10 % smaller, up to three times */
  let enc = null, w = ow, h = oh, canvas = o;
  for (let shrink = 0; shrink <= 3 && !enc; shrink++) {
    if (shrink) { w = Math.max(1, Math.round(ow * Math.pow(0.9, shrink))); h = Math.max(1, Math.round(oh * Math.pow(0.9, shrink))); canvas = sized(w, h); }
    for (let qq = OPT.q0; qq >= 0.299; qq = Math.round((qq - 0.06) * 100) / 100) {
      const url = canvas.toDataURL("image/webp", qq);
      if (!/^data:image\/webp/.test(url)) return { error: "this Chrome did not encode WebP" };
      if (url.length <= OPT.budget) { enc = { url, q: qq, w, h }; break; }
      if (shrink === 3 && qq - 0.06 < 0.299) enc = { url, q: qq, w, h, over: true };
    }
  }
  if (enc.over) reasons.push("still over the budget at q 0.30 and 73% size (" + enc.url.length + " bytes)");
  if (enc.w !== ow) warnings.push("shrunk to " + enc.w + "x" + enc.h + " to fit the budget");
  return { ok: !reasons.length, reasons, warnings, cut: OPT.cut, src: { w: W, h: H }, bg, crop, ...extra, stats, url: enc.url, q: enc.q, w: enc.w, h: enc.h };
}
`;

/* Chrome writes an sRGB ICC profile into every WebP (456 bytes): drop the ICCP chunk and its VP8X flag */
export function stripIcc(buf) {
  if (buf.toString("ascii", 0, 4) !== "RIFF" || buf.toString("ascii", 8, 12) !== "WEBP") return buf;
  const chunks = [];
  let p = 12, had = false;
  while (p + 8 <= buf.length) {
    const tag = buf.toString("ascii", p, p + 4), n = buf.readUInt32LE(p + 4), end = p + 8 + n + (n & 1);
    if (tag === "ICCP") had = true; else chunks.push(Buffer.from(buf.subarray(p, Math.min(end, buf.length))));
    p = end;
  }
  if (!had) return buf;
  const vp8x = chunks.find((c) => c.toString("ascii", 0, 4) === "VP8X");
  if (vp8x) vp8x[8] &= ~0x20;
  const body = Buffer.concat(chunks);
  const head = Buffer.alloc(12);
  head.write("RIFF", 0, "ascii"); head.writeUInt32LE(4 + body.length, 4); head.write("WEBP", 8, "ascii");
  return Buffer.concat([head, body]);
}

/* raw bytes -> { ok, reasons, warnings, webp (Buffer), uri, w, h, q, bytes, uriBytes, crop, stats, ... } */
export async function makeSkin(raw, mime, { kind, px, inset, maxKB, look, tool = false, glass = false, label = "skin" }) {
  const tmp = fromRoot(".build");
  fs.mkdirSync(tmp, { recursive: true });
  const page = path.join(tmp, `skin-${process.pid}-${Math.random().toString(36).slice(2, 8)}.html`);
  const budget = skinBudget(kind, maxKB, look);
  const opt = { kind, cut: (KINDS[kind] || {}).cut || "interior", px, inset, budget, q0: Q_START, limits: LIMITS, tool: !!tool || !!glass, glass: !!glass, photo: look === "photo" && kind !== "figure" && !glass };
  fs.writeFileSync(page, `<!doctype html><meta charset="utf-8"><body><pre id="out">pending</pre>`
    + `<script id="raw">window.__RAW = "data:${mime || "image/png"};base64,${raw.toString("base64")}"; window.__OPT = ${JSON.stringify(opt)};</script>`
    + `<script>${PAGE}</script></body>`);
  let dom;
  try { dom = await dumpDomAsync(pathToFileURL(page).href, { budget: 8000, label }); }
  finally { fs.rmSync(page, { force: true }); }
  const m = /<pre id="out">([\s\S]*?)<\/pre>/.exec(dom);
  if (!m || m[1] === "pending") throw new Error(`${label}: the processing page produced nothing`);
  const r = JSON.parse(m[1].replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&"));
  if (r.error) return { ok: false, reasons: [r.error], warnings: [], src: r.src, bg: r.bg };
  const webp = stripIcc(Buffer.from(r.url.slice(r.url.indexOf(",") + 1), "base64"));
  const uri = `data:image/webp;base64,${webp.toString("base64")}`;
  return { ...r, url: undefined, uri, webp, bytes: webp.length, uriBytes: uri.length };
}
