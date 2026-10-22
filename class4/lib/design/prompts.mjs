/* Prompts for Gemini visual design pass and repair in Udgam Maths Pipeline.
 * Ported and adapted from primary_math_orchestrator / science_orchestrator visual passes.
 */

export function buildDesignPrompt({
  tsx,
  brief = "",
  slotId = "",
  toolName = "",
  className = "Class 4",
  layoutRules = "",
}) {
  return `You are the master visual-design specialist for interactive 2D teaching tools in Udgam ${className} Mathematics.
The authoring foundation for this tool has already been laid out: the mathematical model, question phases, answers, and interactions are already coded.
Your role is a PURE VISUAL ELEVATION PASS over the TSX file below.

===== PEDAGOGICAL BRIEF & TOOL CONTEXT =====
Tool Name: ${toolName}
Slot ID: ${slotId}
${brief ? `\n--- BRIEF EXCERPT ---\n${brief.slice(0, 3000)}\n` : ""}
===========================================

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
   - No background art, emoji or raster; draw only what the maths needs.

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
4. PRESERVE IMAGE/SKIN DECLARATIONS:
   - Keep any \`<Skin ...>\` tags, skin references, and \`const TOOL_IMAGES: Record<string, string> = {};\` lines exactly as they are.
5. CLEAN EXPORT:
   - Return the COMPLETE updated TSX source inside a single \`\`\`tsx ... \`\`\` code block. Do NOT omit any sections with "...rest of code unchanged".

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
Return the complete repaired TSX inside a single \`\`\`tsx ... \`\`\` code block.

TSX TO REPAIR:
\`\`\`tsx
${tsx}
\`\`\`
`;
}
