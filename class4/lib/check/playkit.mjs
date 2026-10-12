/* playkit: real mouse, finger and keyboard on a tool's preview (the play tester's hands; `check`
 * covers the fixed cases, this is for exploring). Headless Chrome through the DevTools protocol:
 *
 *   import { play } from "file:///<...>/<class folder>/lib/check/playkit.mjs";
 *   await play({ id: "M2.S3.T5.C16.2D1", ch: 1, phase: 2 }, async (t) => {
 *     await t.until("window.toolApi.getState().stage === 'ask'");
 *     await t.drag("card-3", 0, -180);          // a real mouse drag
 *     console.log(t.state().typed, t.errors());
 *   });
 *
 *   options   id, ch, phase (1..N, or "none" for a whole lesson), mode ("user" | "ai"), muted (true: the sound
 *             effects off; the lesson itself is silent from runtime r30, nothing is ever spoken),
 *             motion (false: Chrome runs with reduced motion, so animations finish at once; true = real speed),
 *             lang ("hi" | "gu": the host's language prop; unset = English)
 *             nextKey (true: runtime r48+, a tool with nextKey: the Next key waits for a tap or Enter between questions and
 *                      phases; by default a probe run keeps the timers, so the lesson walks by itself)
 *             classroom (true: runtime r22+, a teacher paces: tap the "bubble" control (or ArrowRight) to go on
 *                        while the arrow shows; the pad and the working area are live all the time, so act on a
 *                        question as usual; a guide step waits for the child's act, not the tap)
 *   t.eval(js)          any expression in the page (awaited, by value): toolApi verbs, events, focus
 *   t.state()            window.toolApi.getState()          t.dev()   window.__tool.state()
 *   t.controls()         live controls: { id, label, x, y, w, h, disabled, drag } in screen px
 *   t.click(id) / t.tap(id)            a real mouse click / finger tap on data-control=id
 *   t.doubleTap(id, gap, how)          a TRUE double tap (two taps `gap` ms apart, default 45; how "mouse" | "touch")
 *   t.drag(id, dx, dy, how)            drag from the control's centre by dx, dy ("mouse" | "touch")
 *   t.dragTo(id, sx, sy, how)          drag to a point in stage units (1600 x 900)
 *   t.key("Enter" | "Tab" | "Backspace" | " " | "7") / t.type("32770")   real key presses
 *   t.goto(step)                       toolApi.gotoStep(step): straight to a question
 *   t.until(js, ms) / t.wait(ms)       wait for an expression / for time (real time)
 *   t.shot(name)                       PNG saved as <slot>/play-<name>.png (clean removes it); returns the path
 *   t.errors()                         console errors, warnings and page exceptions so far
 *   t.dragging()                       drags still open (above 0 after a release = a stuck drag)
 * All state reads are awaited: `await t.state()`.
 */
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { cdpSession } from "../core/chrome.mjs";
import { resolveTarget, idOf } from "../core/work.mjs";

export async function play({ id, ch, phase = 1, mode = "user", muted = true, motion = false, lang = "", classroom = false, nextKey = false, timeout = 180000 } = {}, fn) {
  const dir = resolveTarget(id, { ch });
  const html = path.join(dir, `${idOf(dir)}.preview.html`);
  if (!fs.existsSync(html)) throw new Error(`no preview for ${id}; run: node cli.mjs preview ${id} --ch ${ch}`);
  const q = [`phase=${phase}`, "probe=1", muted ? "muted=1" : "", mode === "ai" ? "mode=ai" : "", lang ? `lang=${lang}` : "", classroom ? "classroom=1" : "", nextKey ? "nextkey=1" : ""].filter(Boolean).join("&");
  return cdpSession(`${pathToFileURL(html).href}?${q}`, async (s) => {
    if (!(await s.until("!!(window.toolApi && window.__tool)", 20000))) throw new Error("the tool did not mount");
    const sel = (c) => `[data-control=${JSON.stringify(c)}]`;
    const t = {
      eval: (js) => s.ev(js),
      state: () => s.ev("window.toolApi.getState()"),
      dev: () => s.ev("window.__tool.state()"),
      controls: () => s.ev(`Array.from(document.querySelectorAll("[data-control]")).map((e) => { const r = e.getBoundingClientRect();
        return { id: e.getAttribute("data-control"), label: e.getAttribute("aria-label"), x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height),
          disabled: e.getAttribute("aria-disabled") === "true", drag: e.hasAttribute("data-drag") }; }).filter((c) => c.w > 4 && c.h > 4)`),
      click: (c) => s.click(sel(c)),
      tap: async (c) => { const b = await s.centre(sel(c)); if (!b) return false; await s.touch("touchStart", b.x, b.y); await s.wait(60); await s.touch("touchEnd", b.x, b.y); await s.wait(120); return true; },
      /* a TRUE double tap: two press/release pairs `gap` ms apart (clickCount 1, 2) with nothing in between; t.click twice is about 160 ms apart */
      doubleTap: async (c, gap = 45, how = "mouse") => {
        const b = await s.centre(sel(c)); if (!b) return false;
        for (let k = 1; k <= 2; k++) {
          if (how === "touch") { await s.touch("touchStart", b.x, b.y); await s.wait(30); await s.touch("touchEnd", b.x, b.y); }
          else {
            await s.send("Input.dispatchMouseEvent", { type: "mousePressed", x: b.x, y: b.y, button: "left", buttons: 1, clickCount: k });
            await s.wait(30);
            await s.send("Input.dispatchMouseEvent", { type: "mouseReleased", x: b.x, y: b.y, button: "left", buttons: 0, clickCount: k });
          }
          if (k === 1) await s.wait(gap);
        }
        await s.wait(120); return true;
      },
      drag: (c, dx, dy, how = "mouse") => s.drag(sel(c), dx, dy, how),
      dragTo: async (c, sx, sy, how = "mouse") => {
        const b = await s.centre(sel(c)); if (!b) return false;
        const p = await s.ev(`(() => { const svg = document.querySelector("svg"); const pt = svg.createSVGPoint(); pt.x = ${sx}; pt.y = ${sy}; const q = pt.matrixTransform(svg.getScreenCTM()); return { x: q.x, y: q.y }; })()`);
        return s.drag(sel(c), p.x - b.x, p.y - b.y, how);
      },
      key: (k) => (k === "Enter" ? s.key("Enter", "Enter", 13, String.fromCharCode(13)) : k === "Tab" ? s.key("Tab", "Tab", 9) : k === "Backspace" ? s.key("Backspace", "Backspace", 8) : k === " " || k === "Space" ? s.key(" ", "Space", 32, " ")
        : s.key(k, /^\d$/.test(k) ? "Digit" + k : k, /^\d$/.test(k) ? 48 + Number(k) : 0, k.length === 1 ? k : undefined)),
      type: async (str) => { for (const ch1 of String(str)) { await t.key(ch1); await s.wait(40); } },
      goto: (step) => s.ev(`window.toolApi.gotoStep(${Number(step)})`),
      until: (js, ms = 20000) => s.until(js, ms),
      wait: (ms) => s.wait(ms),
      shot: (name) => s.shot(path.join(dir, `play-${String(name).replace(/[^\w.-]+/g, "_")}.png`)),
      errors: () => s.logs.slice(),
      dragging: () => s.ev("window.__tool.dragging ? window.__tool.dragging() : 0"),
    };
    return fn(t);
  }, { label: `play ${id} phase ${phase}`, timeout, reducedMotion: !motion });
}
