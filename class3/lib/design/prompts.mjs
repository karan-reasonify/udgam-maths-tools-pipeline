/* Prompts for Gemini visual design pass and repair in Udgam Maths Pipeline.
 * Ported and adapted from primary_math_orchestrator / science_orchestrator visual passes.
 */

/* the held-back blocks (scope.mjs): said once, in every prompt that sends the tool */
const KEEP_RULE = "Each comment /*@@KEEP n@@ ... */ stands for a top-level block held outside this pass (the TR table, PHASES, MODEL, the maths, the printed lines, the component that wires the runtime). Those names exist exactly as the comment says: use them as they are, but never declare, edit or move them, and return every such comment once, unchanged, where it stands.";

/* how a tool's pictures are drawn: the same for every tool, so it sits in the invariant part of the design prompt */
const SKIN_RULES = `   - For EVERY plain shape that stands for one of these objects (a thing the child shares, cuts, counts, pours, weighs or measures), draw \`<Skin name="key" x y w h />\` over it, in the SAME box as the shape. The plain shape stays UNDER it as the fallback: never delete it. Use each key at least once, and the object must look like that object from its first frame.
   - A "tile" is one piece, drawn once per piece and stretched to that piece's rectangle (as the file's existing skins are). A "disc" is a round whole drawn once into its circle's box and clipped by the circle and each sector path. A round thing (roti, pizza, cake) is round, never a strip.
   - A "figure" is ONE person (a photo-style child, tall and narrow: its own aspect is in the pictures list, about 1:3), drawn once per person with \`<Skin name="key" x y w h />\` in a box of that SAME aspect; never stretch, squash, crop or clip it, and keep the whole body (head to feet) inside the working area. Replace any hand-drawn person with it, the plain figure kept under it as the fallback.
   - LAYER ORDER, bottom to top: the plain shape, then the \`<Skin>\`, then everything the tool already draws over that piece: its colour tint (a semi-transparent fill), outline, cuts, marks, labels and counts. NEVER put a \`<Skin>\` above an existing tint, outline or label: a piece whose colour carries meaning (a blue rod and an amber rod) must still read as that colour, so the skin goes UNDER its tint, and two pieces the tool colours differently must never end up looking the same.
   - The picture is only the object's look. Every digit, label, mark, equal cut, count and shading stays in code ON TOP of it (a tint over the skin, not another picture); a label over a picture gets a paper halo; on a dark object an uncounted piece wears a pale cream wash so the counted ones stay clearly different.
   - Design the layout AROUND the pictures: give the objects room (about a third of the working area or more, at most about 70 %), keep them wholly inside the working area, and use at most 40 skins on one screen. A \`<Skin>\` inside a loop or a .map draws one skin PER ITEM, and you cannot count a loop, so gate every looped \`<Skin>\` behind ONE flag computed from the number of pieces the screen draws, the way a finished tool does: \`const skinned = pieces > 0 && pieces <= 40;\` and \`{skinned && <Skin .../>}\` placed right after the plain shape and BEFORE its tint (when it is false the plain shapes show, which is the fallback the checks prove). If the file already has such a flag, reuse it and add no second one.
`;

/* The picture brief: the pictures this tool already has (images.json: key, object, kind), and whether its runtime can draw them. */
/* the per-tool half: which pictures exist (the design prompt's PICTURES block); the skin follow-up sends it with the rules */
function pictureList(images, skinAllowed) {
  const list = images.map((i) => `   - "${i.key}": ${i.object || "an object"} (${i.kind || "tile"}, ${i.aspect || "1:1"})${i.why ? " — " + String(i.why).replace(/\s+/g, " ").slice(0, 160) : ""}`).join("\n");
  if (!skinAllowed) return "   - This chapter's runtime has no \`Skin\`: add no \`<Skin>\`, remove none, and draw every object in code.\n";
  if (!images.length) return "   - This tool has no pictures: add no \`<Skin>\`.\n";
  return `   - REAL-OBJECT PICTURES ALREADY MADE for this tool (use ONLY these keys; never invent one):\n${list}\n`;
}
function skinRule(images, skinAllowed) {
  const list = images.map((i) => `   - "${i.key}": ${i.object || "an object"} (${i.kind || "tile"}, ${i.aspect || "1:1"})${i.why ? " — " + String(i.why).replace(/\s+/g, " ").slice(0, 160) : ""}`).join("\n");
  if (!skinAllowed) return "   - This chapter's runtime has no \`Skin\`: add no \`<Skin>\`, remove none, and draw every object in code.\n";
  if (!images.length) return "   - This tool has no pictures: add no \`<Skin>\`.\n";
  return `   - REAL-OBJECT PICTURES ALREADY MADE for this tool (use ONLY these keys; never invent one):
${list}
${SKIN_RULES}`;
}

export function buildDesignPrompt({
  tsx,
  brief = "",
  slotId = "",
  toolName = "",
  className = "Class 5",
  layoutRules = "",
  images = [],
  skinAllowed = false,
}) {
  return `You are the master visual-design specialist for interactive 2D teaching tools in Udgam ${className} Mathematics.
The authoring foundation for this tool has already been laid out: the mathematical model, question phases, answers, and interactions are already coded.
Your role is a PURE VISUAL ELEVATION PASS over the TSX file at the end of this prompt (its brief and pictures are in the THIS TOOL block).

${layoutRules ? `===== UDGAM LAYOUT & WORKING AREA RULES (where a polish instruction below conflicts with these, these win) =====\n${layoutRules}\n============================================\n` : ""}

===== VISUAL EXECUTION & QUALITY MANDATES =====
Udgam's layout rules above are the law. Inside them, make the tool look crafted, never like a prototype.
1. CRAFTED, RECOGNISABLE OBJECTS (LAYOUT section 9):
   - Whatever the tool draws (cards, bars, discs, tiles, jugs, scales, rulers, coins, shapes, grids) must read at first glance and look like a toy-like rounded piece: a top-light gradient (linearGradient or radialGradient, unique ids), ONE consistent soft shadow, a slightly darker rim and a small highlight. Never crooked, flat or amateur.
   - FIX BROKEN OR AWKWARD SVGs: check every path, ellipse, polygon and viewBox; strokes at least 2.4 units with round caps and joins; no clipping, cut-off edges or misaligned boxes.
   - A grid of unit boxes keeps a DARK outline on every box and a deeper fill on a counted one (LAYOUT section 3).

2. SCALE SMALL OBJECTS UP (LAYOUT section 3):
   - Small, timid pictures are the commonest defect on a smartboard: scale the key objects up until they fill about a third of the working area or more (at most about 70 %).
   - NEVER make an existing piece, counter, chip, card, digit, label or hit area smaller (no smaller radius, size, width, height or font). A shadow, rim or padding grows OUTWARD from the shape; it never shrinks the shape to make room.
   - On a sparse screen (8 words or fewer on the working area) digits are 64+ and cards 110+, bold and prominent; otherwise numerals are 56 (T.xl) to 72 (T.display).
   - Every label that carries meaning is 40+ on a sparse screen and never under 28 (28 is for a minor caption only); high contrast, one line, never shortened.

3. COLOUR (LAYOUT section 9):
   - Keep every colour that carries meaning exactly as it is: a place, counter or role keeps its hue. Shade it (lighter top, darker rim) but never change its hue and never invent a new palette. Chrome never borrows a content colour.
   - Text contrast at least 4.5:1; opacity never carries hierarchy.
   - No background art, emoji or raster (the object pictures of rule 4 are the one exception); draw only what the maths needs.

4. TEXT SITS INSIDE ITS SHAPE:
   - A label in a pill, card or chip is centred both ways (textAnchor="middle" plus dominantBaseline="central", or an equivalent measured baseline), and the shape is sized to the text with padding on all four sides: Hindi and Gujarati run longer than English.
   - One line, never clipped, never shrunk under its floor. A label over a line or a colour gets a paper halo.

5. MOTION (LAYOUT section 10):
   - Only motion with meaning (a carry travelling, a piece snapping, a column opening), made with what the file already uses (useTimeline, CSS transitions). Add no import statement.
   - Nothing loops forever, nothing wobbles, shakes or turns red on a miss: a miss redraws the maths in steps and nothing is marked.

6. WORKING AREA ONLY:
   - Change only what Work and Thumb draw. Never touch the header, footer, bubble, keypad, Enter or Answer key, Kiko, or any data-role, data-control or data-zone attribute, id, key, size or hit area of a control.
   - Never add, remove, reword or prefix any text a child can read: labels, chips, captions, units. Do not turn "+3" into "Check: +3". This includes strings built with + or a template literal.

===== STRICT PRESERVATION RULES (NON-NEGOTIABLE) =====
Do NOT break or rewrite the logic. You are elevating execution, NOT changing behaviour:
1. PRESERVE ALL LOGIC & STATE:
   - Keep every \`useState\`, \`useRef\`, \`useCallback\`, and \`useMemo\` intact.
   - Do NOT alter \`MODEL\`, \`judge\`, \`oracle\`, \`nearMiss\`, \`answerForms\`, \`agentKey\`, \`solve\`, or \`PHASES\`.
   - Do NOT change answer evaluation logic, correct values, question text, or step counters.
2. PRESERVE THE RUNTIME API:
   - Calls to \`api.act(...)\`, \`api.answerReady(...)\`, \`api.did(...)\`, \`api.speak(...)\`, and \`onAnswer(...)\` must remain functional and called with the exact same arguments.
3. PRESERVE TRANSLATION KEYS & TR TABLE:
   - The \`TR\` dictionary carries translations for Hindi and Gujarati. Every single English key in \`TR\` must remain 100% BYTE-FOR-BYTE identical. Do NOT edit, delete, or rephrase keys in \`TR\`.
4. OBJECT PICTURES (SKINS) AND BROKEN ART:
   - Which pictures exist is in the THIS TOOL block (PICTURES). Where it lists none, or says the runtime has no \`Skin\`, the next rules do not apply: add no \`<Skin>\`.
${SKIN_RULES}   - Never leave a broken picture: no \`<image>\`, no data: URI, no URL or href, no placeholder box, no emoji. A picture arrives ONLY through \`<Skin>\`. Never add, remove or change a \`TOOL_IMAGES\` declaration (most tools have none), and keep every existing \`<Skin>\` exactly as it is.
   - Everything drawn in code must be whole and crisp: closed paths, a viewBox that holds the drawing, no shape cut off by its own box.
5. HELD-BACK BLOCKS:
   - ${KEEP_RULE}
6. CLEAN EXPORT:
   - Return the COMPLETE updated TSX source inside a single \`\`\`tsx ... \`\`\` code block. Do NOT omit any sections with "...rest of code unchanged".

===== THIS TOOL =====
Tool Name: ${toolName}
Slot ID: ${slotId}
${brief ? `\n--- BRIEF EXCERPT ---\n${brief.slice(0, 3000)}\n` : ""}
PICTURES:
${pictureList(images, skinAllowed)}
===== CURRENT TOOL SOURCE (tool.tsx) =====
\`\`\`tsx
${tsx}
\`\`\`
`;
}

export function buildRepairPrompt({ tsx, error }) {
  return `You are fixing a SYNTAX ERROR in an interactive TypeScript React component (tool.tsx).
A visual styling pass introduced a syntax slip (e.g. unclosed JSX tag, missing closing brace, bracket mismatch, or duplicate declaration).

The compiler reported the following syntax error:
----------------------------------------
${error}
----------------------------------------

YOUR TASK:
Fix ONLY the syntax error reported above.
Do NOT change any styles, colors, logic, names, or structure.
Make the minimal surgical change required to make the TSX valid and parseable.
${KEEP_RULE}
Return the complete repaired TSX inside a single \`\`\`tsx ... \`\`\` code block.

TSX TO REPAIR:
\`\`\`tsx
${tsx}
\`\`\`
`;
}

/* The follow-up when the design pass left made pictures undrawn: ONLY add the skins, change nothing else. */
export function buildSkinPrompt({ tsx, images = [] }) {
  return `You are adding real-object pictures to an interactive teaching tool (tool.tsx) whose visual design is already finished.
Your ONLY job: draw \`<Skin>\` over the plain shapes that stand for the objects below. Change NOTHING else: not a colour, size, position, text, logic, \`TR\` key, import or any other line.

4. OBJECT PICTURES (SKINS):
${skinRule(images, true)}
${KEEP_RULE}
Return the COMPLETE updated TSX inside a single \`\`\`tsx ... \`\`\` code block. Do NOT omit any section with "...rest of code unchanged".

===== CURRENT TOOL SOURCE (tool.tsx) =====
\`\`\`tsx
${tsx}
\`\`\`
`;
}

/* The pass made the tool throw on mount (a blank screen): ONE narrow repair before the pass is given up. */
export function buildMountRepairPrompt({ tsx, error }) {
  return `You are fixing a RUNTIME ERROR in an interactive TypeScript React component (tool.tsx).
A visual styling pass changed it, and now it throws when it mounts, so the screen is blank. The page reported:
----------------------------------------
${String(error).slice(0, 600)}
----------------------------------------
The usual cause is a \`const\` or \`let\` (or an arrow-function helper) used before the line that declares it, a variable used in a scope that does not have it, or a parameter added to a helper but not passed by its callers.
Fix ONLY this error, with the smallest change (move the declaration above its first use, or restore the reference).
Do NOT change any style, colour, text, logic, \`TR\` key or picture.
${KEEP_RULE}
Return the complete repaired TSX inside a single \`\`\`tsx ... \`\`\` code block.

TSX TO REPAIR:
\`\`\`tsx
${tsx}
\`\`\`
`;
}
