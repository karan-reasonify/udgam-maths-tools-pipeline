/* What a chapter's pinned runtime CAN DO, read off its SOURCE, never off its number.
 *
 * Two kinds of runtime meet in this code base:
 *   - a VOICED runtime (no `const SILENT_VOICE = true`: every runtime before the silent switch, e.g. Class 4's frozen r1-r21): the lesson is
 *     spoken (device speech, and baked Hindi/Gujarati clips from `voice.tsx`), with a "Tap to start" cover when the
 *     browser refuses speech; `check` runs the voice rows (mute, voice-pick, voice-sync, sound-on-start,
 *     voice-no-repeat) and `voice` bakes; `publish` writes a ship copy;
 *   - a SILENT runtime (`const SILENT_VOICE = true`: from the silent switch (r30) on, the head of every class): the
 *     lesson is printed on the bubble, sound effects only; `check` runs the silent rows instead (silent,
 *     sound-button, tr-coverage, bubble-no-repeat ...) and `voice` has nothing to bake.
 * Everything a row, a drive, the sidecar, the scaffold or `voice` does differently is decided by one of these flags, so a
 * chapter pinned to an old frozen runtime checks, ports and publishes EXACTLY as it did, and a chapter pinned to a new
 * one gets the new rows. No code anywhere compares a runtime number (pin.mjs only allocates the next rN).
 *
 * A marker is a string the runtime source contains only when it has the feature; it is the same marker the
 * check rows have always used. Add a feature = add its marker here, once.
 */
import fs from "node:fs";
import { resolveRuntime } from "./pin.mjs";

const strip = (s) => String(s || "");

export function capsOf(runtimeSrc) {
  const r = strip(runtimeSrc);
  const silent = /const SILENT_VOICE = true/.test(r);
  return {
    silent,                                              /* the lesson is printed, never spoken */
    voiced: !silent,
    board: /const ZBOARD/.test(r),                       /* r27: board layout (opt in with `board: true`) */
    startPage: /function StartPage/.test(r),             /* r28: StartArt / START_HOOK */
    backToStart: /const backToStart\b/.test(r),          /* r32: the reset key goes back to the start page */
    classroom: /P\.classroom/.test(r),                   /* r22: props.classroom */
    hint: /setHintText/.test(r),                         /* r34: pinned instruction + hint band */
    hintKey: /const askHint\b/.test(r),                  /* r35: the header's Hint key */
    party: /const PARTY_MS\b/.test(r),                   /* r39/r40: the phase party */
    cheer: /MASCOT_CHEER/.test(r),                       /* r54: the mascot cheers (its cheering picture MASCOT_CHEER) at the party and a little at every right answer */
    freeGuard: /function Party\b/.test(r),               /* r38+: the guard that free play is the summary page's only */
    steps: /guideSteps/.test(r),                         /* r30: phase.steps (guide steps) */
    theme: /TOOL_THEME/.test(r),                         /* r31: the keypad THEME (images.tsx TOOL_THEME) */
    bigPad: /const ZBOARD_BIG\b/.test(r),               /* r26: `bigPad: true`, a wider keypad panel for a tool whose picture is small */
    defaultTheme: /const DEFAULT_THEME\b/.test(r),       /* class 4 r23 / class 5 r55: a tool with no theme wears the standard one, so no Start key is grey */
    skin: /function Skin\b/.test(r),                     /* r29: object skins */
    cueBig: /c4-cue-big/.test(r),
    explore: /exploreOf|keepFocus/.test(r),
    sideBySide: /SLOT_DECIMAL/.test(r),                  /* r26: side-by-side answer boxes */
    nextKey: /const nextKeyOn\b/.test(r),                /* r45/r48: the opt-in Next key (`nextKey: true` in the ToolFrame tool) */
    cardAnswer: /const cardAnswerOn\b/.test(r),            /* r49+: the opt-in card answer (`cardAnswer: true`, board layout); no scaffold block: a tool opts in by hand */
    think: /MASCOT_THINK/.test(r),                        /* r24: the mascot THINKS while a question waits (MASCOT_THINK, the thought puff, the hint bulb) */
    answerBlink: /const keyAskOn\b/.test(r),              /* r24: the Answer key blinks, with its tap line, in EVERY board tool while it is what to press (and the Enter key once api.answerReady) */
    itemLadder: /Array\.isArray\(it\.ladder\)/.test(r),      /* r24: rungOf reads a question's own `it.ladder` (the maths and TR rows then read it too; an older pin ignores the field) */
    lastIt: /last: \{ item: L\.i, it:/.test(r),           /* r24: result.last.it is the item object (last.item stays the index); the Thumb gets `it` */
    keyOnly: /const ZKEY\b/.test(r),                     /* class 4 r27: `keyOnly: true` (board tools): no question bar, only its key; the working area up, a tall bubble */
    navDots: /function NavDot\b/.test(r),                /* class 4 r27: `navDots: true`: one small dot per phase, a control in user and AI mode */
    oneSentence: /ONE SENTENCE A SCREEN/.test(r),         /* 2026-10-16: keyOnly shows ONE sentence of Kiko's speech a screen (a hint replaces the question, no type line, closing at a phase's last win, digits as written, no puff or bulb): the marker comment in Footer */
    act: /ACTION_KIT_HELPER/.test(r),                    /* 2026-10-16: api.act, a real tool (the ACTION KIT) or the drawn hand performs the act on screen */
    fontKit: /function useFontKit\b/.test(r),             /* 2026-10-16: the FONT KIT (runtime/fontkit.tsx, FONT_KIT): Poppins inside the tool */
  };
}

/* the flags of a slot's pinned runtime (its chapter's pin, else the head) */
export function capsFor(slotDir) {
  const { runtimeFile } = resolveRuntime(slotDir);
  return capsOf(fs.readFileSync(runtimeFile, "utf8"));
}

/* does the in-page instrument that watches every DOM change (the silent rows, the classroom arrow, the party) need to run? */
export const wantsWatch = (c) => c.silent || c.classroom || c.party || c.freeGuard;

/* the small object preview.mjs puts on the page (window.__RT) for the scripted drives */
export const rtFlags = (c) => ({ silent: c.silent, watch: wantsWatch(c), board: c.board, hint: c.hint });
