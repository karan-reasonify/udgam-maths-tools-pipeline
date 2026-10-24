/* What the design pass may do with the object pictures (skins; docs/IMAGES.md section 7), as pure functions so a test can run them
   with no Gemini, no browser and no chapter: node class4/lib/design/design.test.mjs
   The pictures themselves (images.tsx, base64) never travel through Gemini: it is told only the KEYS and what each one is. */

const count = (src, re) => (String(src).match(re) || []).length;

/* literal names of the skins a tool draws: <Skin name="counter" ... /> (a computed name={...} cannot be read, so it is not listed) */
export const skinNames = (src) => [...String(src).matchAll(/<Skin\b[^>]*?\bname=(?:"([^"]+)"|\{\s*["'`]([^"'`]+)["'`]\s*\})/g)].map((m) => m[1] || m[2]);
export const skinCount = (src) => count(src, /<Skin\b/g);

/* what a picture can be asked of: a made picture, listed in images.json with a key */
export const madeImages = (imagesJson) => ((imagesJson && imagesJson.images) || []).filter((i) => i && i.key && i.made);

/* Problems with a design pass's output against the tool it started from; [] means keep it.
   keys: the picture keys that exist (images.json, made); allowed: the pinned runtime has Skin (caps.skin). */
export function skinProblems(before, after, { keys = [], allowed = false } = {}) {
  const out = [];
  const nb = skinCount(before), na = skinCount(after);
  if (!allowed && na !== nb) out.push(`this runtime has no Skin: the pass changed the skins from ${nb} to ${na}`);
  if (allowed && na < nb) out.push(`the pass dropped skins (${nb} -> ${na}): a picture a tool wore must stay`);
  if (allowed) {
    const known = new Set([...keys, ...skinNames(before)]);
    const bad = [...new Set(skinNames(after))].filter((n) => !known.has(n));
    if (bad.length) out.push(`a <Skin> names a picture that does not exist: ${bad.join(", ")} (a name with no picture draws nothing, silently)`);
  }
  // a picture only ever arrives through <Skin>: never an <image>, a data URI, a URL or an href of the pass's own
  for (const [what, re] of [["<image>", /<image\b/g], ["data: URI", /data:image\//g], ["URL", /https?:\/\//g], ["href", /\bhref=/g], ["new Image()", /new Image\s*\(/g]]) {
    if (count(after, re) > count(before, re)) out.push(`the pass added a ${what} (pictures come only through <Skin>)`);
  }
  if (count(after, /\bconst TOOL_IMAGES\b/g) !== count(before, /\bconst TOOL_IMAGES\b/g)) out.push("the TOOL_IMAGES declaration changed");
  return out;
}

/* made pictures no <Skin> draws: a picture paid for and never shown (not a failure: the builder is told) */
export const unusedSkinKeys = (src, keys) => { const used = new Set(skinNames(src)); return keys.filter((k) => !used.has(k)); };
