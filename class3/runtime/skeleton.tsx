/* ═══ %%MEDIA_ID%% · %%TOOL_ID%% · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists: header + its three controls, canvas, slot + pad, bubble + mascot,
   phase dots (user / AI mode), window.toolApi, the sound effects, the printed bubble, scoring, the
   events, idle and restart. THE LESSON IS SILENT (runtime r30): nothing is spoken; every line is
   printed on the bubble, which is the guide (it instructs; after a wrong act or answer the hint shows UNDER the
   pinned instruction and stays until the child acts again; r34). The lesson is action-driven: nothing moves
   on unless the child acts (a tap, a key, an answer); after a right answer the next question follows its
   short celebration by itself. The header's Hint key (r35) shows the hint on demand.
   This template is the FULL NEW STYLE and is used for a chapter whose pinned runtime is silent (a voiced runtime, r21
   and before, is scaffolded from lib/build/skeleton.voiced.tsx instead). Blocks that a given runtime has no support for
   are left out when `scaffold` writes this file (board, start page, theme).
   NO imports in this file; only the five host hooks. Follow docs/LAYOUT.md and docs/PATTERNS.md.
   Every English line the tool prints, in its data or drawn by Work (tx("...")), has a Hindi and a
   Gujarati entry in TR once the English is final (check's tr-coverage row lists what is missing).
//#if keyOnly
   THE NEW LOOK (the owner, 2026-10-16; docs/LAYOUT.md §1d-§1e, docs/PATTERNS.md §15-§16): no question bar (only the blinking key at the top
   right), four small clickable phase dots, a big ONE-sentence bubble, digits as written, every act performed on screen (api.act). The question
   lives ONLY in the bubble: each item's `say` is the whole question in one sentence. Opt out (delete `keyOnly: true` / `navDots: true` below)
   only with a reason stated in the report.
//#endif
   Edit, never rewrite. Built by `node cli.mjs scaffold`; concepts are verbatim (check compares them). */

const TOOL_ID = "%%TOOL_ID%%";
const MEDIA_ID = "%%MEDIA_ID%%";
const TOOL_NAME = "%%TOOL_NAME%%";
const CHROME = %%CHROME%%;
/* kept for the tool object's shape (and the sidecar); nothing speaks from r30 */
const VOICE = %%VOICE%%;

/* printed on the bubble before phase 1's teach lines only (the plan's opening line; not shown when phase 1 has steps) */
const OPENING = %%OPENING%%;
/* the whole-tool line: printed on the summary page */
const FINISH_LINE = %%FINISH_LINE%%;
/* printed when the child opens Free play (the plan's free-play line); its LAST piece stays on the bubble */
const FREE_LINE = %%FREE_LINE%%;
//#if startPage

/* THE START PAGE (runtime r28; docs/LAYOUT.md §1c, docs/PATTERNS.md §14): the first thing a child sees in user mode.
   START_HOOK is ONE printed question to wonder at (it needs a TR entry, and never gives an answer away); StartArt is
   the object the lesson is about, drawn in a 1200 x 340 box ({ box, C, lang, tx }; plain shapes in the chrome and content
   colours, a <Skin> over them when the image agent made one). This stub is a dashed outline: draw the real object. */
const START_HOOK = %%START_HOOK%%;
function StartArt({ box, C, lang, tx }: any) {
  return (
    <g>
      <rect x={0} y={0} width={box.w} height={box.h} rx={RAD.panel} fill="none" stroke={C.rule} strokeWidth={2} strokeDasharray="10 12" />
    </g>
  );
}
//#endif

/* Hindi and Gujarati (docs/PATTERNS.md §11): every line above and below stays English, exactly as the checks
   read it; this table is keyed by that English, byte for byte, and the runtime looks each printed or drawn line
   up in it (Work draws its own words through tx("...")). Fill it AFTER the English is final and reviewed:
   `check` (tr-coverage) lists every printed line still missing. Nothing is baked: the lesson is silent.
   Empty = the tool runs in English only. */
const TR: any = { hi: {}, gu: {} };

/* One entry per phase = one mount.
   says    the teach run, printed on the bubble a piece at a time before anything is asked (numbers are printed as words)
//#if keyOnly
           keyOnly: digits print as written; a bubble line may name its number unless that gives the answer away
//#endif
   steps   GUIDE STEPS (runtime r30; `hint` r34), when the plan's teach lines describe acts:
             steps: [{ say: "Tap Cut to cut the bar into ten equal parts.", on: "cut", hint: "Tap the Cut key first." },
                     { say: "Now tap one part to shade it.", on: "shade", hint: "Tap one piece of the bar." }],
           The phase then opens on steps[0].say with the question and the Answer key waiting (stage "demo"; `says` and
           OPENING are not shown). Work does the act when the CHILD does it and reports it: api.did("cut"). Only then does
           the bubble move to the next step (never on a timer); the last act opens the first question with its say.
           ONE CLICK PER STEP (2026-10-08): a step completes on one click of one control (a button such as Cut, or one
           piece of the picture), never on a count; if the idea needs more clicks, write more steps, each with the next
           instruction (the same `on` may repeat). The keypad's Enter is not a step act. Name a step's button after its
           act (data-control "cut") so the check can click it.
           Report EVERY click Work gets with api.did(name) at the moment of the click, awaited or not: a wrong act shows
           that step's `hint` UNDER the pinned instruction, unchanged until the child acts again (the header's Hint key
           shows it on demand as well). Work must also register api.onEnter so that Enter, the agent's check() and the dev
           solve() perform the CURRENT step (see Work below); props.stepOn names the act waited for: put the one <Invite/>
           on that control. ONE PAGE (r35): each `say`, each `hint`, each question's `say`, each `miss` and ladder rung is
           ONE sentence that fits the bubble (no timer ever pages it); a hint at most about 40 characters when its
           instruction runs to two lines, never over 80, never the answer; each hint unique in the phase.
           The scaffold writes ONE stub step per phase from its teach line: make it real, or delete the `steps` array of a
           phase whose teach describes no act (then `says` is the teach run and the phase opens on its first question).
   ladder  rungs 2 and 3 of the hint ladder (rung 1 is each item's own miss line); never the answer
   closing one closing line for this phase, printed once when it goes idle
//#if keyOnly
           keyOnly: ONE sentence; the bubble shows it in place of the last win line
//#endif
   learned the summary page's row for this phase: "You learned: ..." (at most 72 characters)
   traceback what the working area redraws after a miss, in one line (for the sidecar)
   demo?   { ... } when the phase opens on the child's one physical act (see api.demoDone); steps are the newer way
   items   the authored fallback: three a phase, the third tests whether the phase landed.
           qid   the plan's question id (<conceptId>:ML<n> or <conceptId>:<q_no>); null for an item you author
           kind  your name for the item type (the Work, judge and oracle switch on it)
           say   the question's line on the bubble (one sentence: one page); ask = the short prompt above the slot
                 (<= 3 lines of ~15 chars)
//#if keyOnly
                 keyOnly: there is no question bar, so the bubble is the only place the question shows: `say` is the WHOLE question in ONE
                 sentence (the plan's question cut to one: put its setup back in when the child needs it). `ask` stays, because the checks and
                 the sidecar read it, but it is never drawn. A hint (miss, ladder rung) shows in place of the question: ONE sentence each
//#endif
           answer what the slot or the working area must produce; miss = rung 1, shown at once UNDER the pinned
                  instruction after a miss (one sentence, never the answer; a second miss shows ladder[0], a third
                  ladder[1]), and kept there until the child acts again
           choices? [{ id, label }] for a word answer; pad?: "enter" when it is made on the working area
           parts?  [{ label, unit? }, …] with answer [a, b]: two boxes in the slot (quotient · remainder;
                   label at most 10 characters, e.g. { label: "each bowl", unit: "mL" }); typed reads "16|1".
                   A fraction: parts: SLOT_FRACTION, answer [3, 4] (drawn stacked). A mixed number or a
                   tidied answer: parts: SLOT_MIXED, answer [1, 2, 3] · [5, null, null] · [null, 7, 10]
                   (null = that box stays empty; the slot never says which kind the answer is)
                   A decimal: answer "0.09", a string in its written form (so "0.30" is not "0.3" and ".3"
                   is not "0.3"), with pointKey: true in the tool object below (the pad's point key) */
const PHASES = %%PHASES%%;

/* The numbers, rows, sizes and targets the working area needs (they go into the sidecar too). */
const MODEL = {};

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* judge: is this value right for this item? (numbers compare as numbers) */
const judge = (item: any, v: any) => {
  if (item.parts) return judgeSlotParts(item, v);
  if (typeof item.answer === "number") return leadNumber(v) === item.answer;
  return String(v).trim().toLowerCase() === String(item.answer).trim().toLowerCase();
};
/* oracle: every answer re-derived by a second route that shares no code with judge or Work */
const oracle = () => PHASES.every((p: any) => p.items.every((it: any) => it.answer !== null && it.answer !== undefined));
/* the most likely wrong answer (the misconception); judge must reject it */
const nearMiss = (item: any) => (item.parts ? item.answer.map((x: any, k: number, a: any[]) => (x !== null && a.slice(k + 1).every((y: any) => y === null) ? x + 1 : x ?? "")).join("|")
  : typeof item.answer === "number" ? item.answer + 1 : "~");
/* the forms of an answer that no question, hint or ladder line may print */
const answerForms = (item: any) => (item.parts ? item.answer.filter((x: number) => x >= 10).flatMap((x: number) => [String(x), indian(x), words(x)])
  : typeof item.answer === "number" ? [String(item.answer), indian(item.answer), words(item.answer)]
  : /^\d*\.\d+$/.test(String(item.answer)) ? [String(item.answer), speakable(item.answer)] : [String(item.answer)]);
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => item.answer;

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => (T.state().stage === "demo" ? HOOK.demo && HOOK.demo() : T.submit(item.answer));
/* the agent's answer() for an item made on the working area: set it as a child would; undefined = type it */
const answer = (item: any, v: any) => (item.pad === "enter" && HOOK.set ? HOOK.set(v) : undefined);
/* the agent's check() before Enter: e.g. drop a token that waits; undefined = press Enter. In a guide-steps phase
   (stage "demo") it must return undefined, so the agent's check() reaches api.onEnter and performs the current step:
   set HOOK.check only while a question is open */
const check = () => (HOOK.check ? HOOK.check() : undefined);

/* ── the working area ────────────────────────────────────────────────────────────────────────
   Its size is `box` ({ w, h, open }): the whole card (1472 x 528) with the answer panel shut and 1086 x 528 with it
   open, easing between (the board layout, docs/LAYOUT.md §1b, docs/PATTERNS.md §14): lay everything out from box.w
   with plain arithmetic in render, never from constants or api.W. Origin at the area's top-left.
//#if keyOnly
   keyOnly (LAYOUT.md §1d): the question bar is gone, so the working area is 64,108, 1472 x 520 (NOT 64,202 x 528) with the panel shut, 1086 (900
   with bigPad) x 520 open. box.key = { x, y, w, h } is the key's corner in THIS area's coordinates (about x 1190, y 0, 282 x 88; wider on a
   Yes/No question): keep every element out of it, e.g. const kx = box.key ? box.key.x - 12 : box.w; (board-fit). There is no runs zone.
//#if act
   Every act (cut, measure, count, tidy ...) is performed on screen: await api.act({ tool, moves, at, onPoint }) from the child's tap and
   react only when it resolves true (PATTERNS.md §15).
//#endif
//#endif
   Countable things use CONTENT colours (url(#gHundred|gTen|gOne|gBead|gPointer)); coloured numerals
   and words use a deeper ink, shade(colour, 0.25), so they read at 4.5:1. Type uses T.* only.
   Pieces: drag = useDrag(onDrop) then {...control(id, label), ...drag.bind(pay), ...drag.keys(pay)};
   taps = <Hit id x y w h onPress label />. One <Invite/> marks the one thing to touch.
   Nothing is written here that the bubble already says. `wrong` = { value, tries } after a miss:
   lock, redraw the mathematics in steps (the traceback), unlock; never mark it, never reset it.
   MISS HIDES THE ANSWER (a chapter whose runtime.json has rules.missHidesAnswer "strict", PATTERNS.md 7): the traceback replays the
   working and stops ONE step before the answer; whatever shows the answer carries data-reveals="answer" and is drawn only at
   stage "win"; an always-printed scale (a ruler's 0 to 16) carries data-scale (check miss-hides-answer).
   The slot is the runtime's: a miss empties it (MISS CLEARS THE SLOT), so `typed` is "" from the miss on and
   wrong.value is what the child sent; never write the slot (api.setTyped) during the traceback.
   stage === "free" is Free play (the plan's writeup.freePlay): no target, every control unlocked.
   Sound effects where the picture moves: api.sfx.cut() (a knife), settle() (pieces come to rest),
   trade() (pieces close into one), tick() (a snap); correct, wrong, win and cheer are the runtime's.
   step / stepOn: the guide step the child is on and the act it waits for (null outside a steps phase).
//#if nextKey
   nextKey: true (the ToolFrame below, runtime r48+): nothing moves on by itself. After a right answer the win picture
   stays on the board until the child presses the blinking Next key, so never reset it on a timer (PATTERNS.md 9d).
//#endif
//#if skin
   A SKIN (docs/IMAGES.md, docs/PATTERNS.md §14): when the slot has an images.tsx, draw <Skin name x y w h clip /> over
   the plain shape the tool already draws for the object (the plain shape stays the fallback); never a raster tag of your own here (no-raster-in-tool).
//#endif
   */
function Work({ phase, n, item, index, stage, wrong, typed, api, MODEL, step, stepOn, box, lang = "en", tx = (v: any) => v }: any) {
  /* every English word the picture draws goes through tx("...") (its key is added to TR); a number in words
     is wordsIn(n, lang) */
  const C = api.C;
  const tl = useTimeline();

  /* GUIDE STEPS: the act of a step, done when the child does it (a tap on Cut, a shaded part) and reported with
     api.did(on) the moment it is done. Report the other acts too (a tap on a piece while Cut is awaited: api.did("shade")):
     did() returns false for them, moves nothing and shows the awaited step's hint under the instruction.
     e.g. if (on === "cut") { api.sfx.cut(); tl.run([[600, () => {}]], () => api.did("cut")); } */
  const act = (on: any) => { void on; };
  /* Enter goes here first while the working area owns the answer; in a steps phase (stage "demo") Enter, the agent's
     check() and the dev solve() perform the CURRENT step's act */
  api.onEnter(stage === "demo" && stepOn ? () => act(stepOn) : null);

  /* the traceback */
  useEffect(() => {
    if (!wrong || stage !== "ask") return;
    api.lock(true);
    tl.run([[600, () => {}]], () => api.lock(false));
  }, [wrong]);

  /* what the host and the agent read back (toolApi.getState) */
  api.share({ complete: stage === "idle" });

  return (
    <g>
      {/* the running count sits in the runs zone (64,108), 94 above the working area:
          <g data-zone="runs"><rect x={0} y={-94} width={330} height={76} .../>...</g> */}
//#if keyOnly
      {/* keyOnly: no runs zone (the key-only row fails a runs box); nothing under box.key; the question is in the bubble only */}
//#endif
      <rect x={0} y={0} width={box ? box.w : W.w} height={W.h} rx={RAD.panel} fill="none" stroke={C.rule} strokeWidth={2} strokeDasharray="10 12" />
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase:
   result.last = { value, answer, kind, item, shared } (shared = what api.share held at that moment) */
function Thumb({ result, C, w, h, lang = "en", tx = (v: any) => v }: any) {
  const v = result && result.last ? result.last.value : null;
  if (v === null || v === undefined) return null;
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      <text x={w - 16} y={h / 2 + 12} textAnchor="end" fontSize={T.label} fontWeight={700} fill={C.ink}>{String(v)}</text>
    </g>
  );
}

function %%COMPONENT%%(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, fitHost: () => null,
//#if board
      /* the board layout (LAYOUT.md §1b): the question and an Answer key on a bar across the top, the working area the
         whole card until the child taps Answer, the answer box and keypad in a panel that slides in from the right */
      board: true,
//#if keyOnly
      /* KEY ONLY (the new look; LAYOUT.md §1d, PATTERNS.md §16; needs board: true): no question bar, only its blinking key at the top right;
         the working area is 64,108, 1472 x 520 and the key's corner is props.box.key (keep every element out of it); the question lives
         only in the bubble. Opt out (a picture that needs the bar's room) by deleting this line, with the reason in the report. */
      keyOnly: true,
//#endif
//#endif
//#if bigPad
      /* the wide keypad (LAYOUT.md §1b, PATTERNS.md 9g; the owner: "empty space left of the keypad, increase its size"): the answer
         panel is 556 wide and the picture has x 64 to 964 while it is open. Keep it when the picture fits there; set it to false (or
         delete it) when the picture needs the full 1086 width: `check`'s board-fit names what runs under the panel. */
      bigPad: true,
//#endif
//#if nextKey
      /* the Next key (PATTERNS.md 9d): nothing moves on by itself; after a right answer the win picture waits for the child's tap on
         the blinking Next key (the question bar's right end; the classic layout: the answer slot's place). Delete to keep the timers. */
      nextKey: true,
//#endif
//#if navDots
      /* NAV DOTS (the new look; LAYOUT.md §1d; stands alone): the phase bar becomes one small clickable dot per phase, no text; a tap starts
         THAT phase, in user and AI mode. Delete this line to keep the bar. */
      navDots: true,
//#endif
//#if startPage
      /* the start page: the tool's name, StartArt, START_HOOK, a Start key (above) */
      StartArt, START_HOOK,
//#endif
//#if theme
      /* the keypad colours: leave THEME unset and the image agent's TOOL_THEME (the slot's images.tsx) is picked up by the
         runtime by itself; set THEME here only to override it (docs/IMAGES.md) */
//#endif
      }} />
  );
}

export default %%COMPONENT%%;
