# The robot mascot: functions, capabilities and reactions

> **Note (2026-10-13):** this file is about the old robot, drawn in Manim for video. The mascot inside the tools is now **Kiko** (`kiko.svg`, see `CLAUDE.md`); `mascot_robot.py` is not used by the pipeline.

`mascot_robot.py` (next to this file) draws the Singularity robot from scratch in **Manim** and animates it for
video. Nothing is an image: every part is a vector computed from numbers, so it stays sharp at any size, can be
re-posed on every frame, and renders with a transparent background.

Everything below is what the code does. The "Tested" section at the end says what was actually run.

---

## 1. What it is

| | |
|---|---|
| Character | A chibi robot: big glossy white helmet with a dark purple visor, round purple eyes, white brows, open smile with a pink tongue, one orange horn on the upper left, round orange ear-pods with a neon ring, a white egg-shaped torso with the black Singularity emblem (orange and violet ring, diagonal spark), dark joint bands, dark purple gloves, white boots with dark soles. |
| Reference | `textbooks/mascot.png`. The colours were sampled from it (`PALETTE`, the `C` dict). |
| View | The reference's three-quarter front view (head turned a little towards the viewer's right). One view only. |
| Size | About 3.4 Manim units tall at `size=1.0` (feet at y = 0). |
| Parts per frame | About 100 vector shapes, rebuilt every frame from one pose. |
| Dependencies | `manim >= 0.19`, `numpy`, the standard library. No LaTeX, no image files. |

---

## 2. Setup and render recipes

Manim 0.21 needs Python 3.11 or newer. The check on this machine used a venv at `$env:TEMP\mvenv`:

```
# PowerShell
py -3.11 -m venv $env:TEMP\mvenv
& "$env:TEMP\mvenv\Scripts\python.exe" -m pip install "manim>=0.19" numpy pillow
```

(Create the venv on a **short path**. In the long scratchpad path, pip failed with the Windows long-path error.)

Run from this folder. On Windows set `PYTHONIOENCODING=utf-8` first (PowerShell: `$env:PYTHONIOENCODING='utf-8'`). The commands below are plain `manim ...` lines that work in any shell; use `& "$env:TEMP\mvenv\Scripts\python.exe" -m manim ...` if Manim is only in that venv.

```
manim -pqh mascot_robot.py Intro          # greeting reel: pop in, wave, speak, think, idea, celebrate, bow, pop out
manim -pqh mascot_robot.py Showcase       # every reaction in turn, captioned (also the smoke test)
manim -pqh mascot_robot.py WalkDemo       # enter from the left, waddle, stop, wave, leave to the right
manim -pqh mascot_robot.py LipSyncDemo    # lip-sync from text, then from a generated WAV (audio is mixed in)
manim -s -qh mascot_robot.py ContactSheet # one still: all 29 reactions at their peak
manim -s -qh mascot_robot.py VisemeSheet  # one still: the nine mouth shapes
manim -qh -t mascot_robot.py Intro        # transparent video for an editor (see section 11)
python mascot_robot.py --list             # prints the reaction table and every name below
```

Stills of one pose are chosen with environment variables.

PowerShell:

```
$env:MASCOT_POSE='think'; $env:MASCOT_U='0.5'; manim -s -qh mascot_robot.py PoseStill
$env:MASCOT_POSE='rest'; $env:MASCOT_MOOD='sad'; $env:MASCOT_STANCE='hips'; manim -s -qh mascot_robot.py PoseStill
$env:MASCOT_REACTIONS='think,shy,bow'; $env:MASCOT_COLS='3'; manim -s -qh mascot_robot.py ContactSheet
```

Git Bash / macOS / Linux:

```
MASCOT_POSE=think MASCOT_U=0.5 manim -s -qh mascot_robot.py PoseStill
MASCOT_POSE=rest MASCOT_MOOD=sad MASCOT_STANCE=hips manim -s -qh mascot_robot.py PoseStill
MASCOT_REACTIONS=think,shy,bow MASCOT_COLS=3 manim -s -qh mascot_robot.py ContactSheet
```

(Clear the variables afterwards, for example `Remove-Item Env:MASCOT_*`, or the next `ContactSheet` run will still use them.)

`Text` is used only for the captions in the demo scenes (it needs Pango, which ships with Manim). The mascot itself uses no text.

---

## 3. Anatomy (what is drawn, back to front)

1. **Ground shadow**: a flat ellipse that shrinks and fades as the mascot hops.
2. **Legs** (both): white thigh and shin capsules, a dark knee strap, a dark ankle patch, a white boot over a dark sole crescent. Two-bone **IK**: the foot goes where the pose says and the knee bends outward.
3. **Torso**: dark waist band, white egg-shaped body with a lilac shade, panel lines, the **chest emblem** (black core, orange ring, violet half-ring, diagonal spark; it glows with `chest_glow`).
4. **Arms** (drawn here when `arms_front` is 0): upper arm, elbow band, forearm, shoulder band, an orange shoulder arc, and the **glove** (see section 8).
5. **Neck**.
6. **Head**, back to front: right ear-pod (only a sliver shows), orange **horn** (gradient pink to orange, turns about its base), glossy **shell** (white with a lilac rim, a violet glow, a top seam and a gloss spot), **visor** (white-lilac bezel, dark glass, violet inner glow), then the **face**: blush, two eyes (white ring, violet iris, black pupil, two highlights), lids, brows, mouth (lips, dark inside, tongue, teeth); then two soft gloss streaks over the glass; then the left **ear-pod** in front (orange-gold rim, dark well, neon ring that pulses with `ear_glow`).
7. **Arms again**, when `arms_front` is 1 (a hand in front of the face or head).
8. **Emotes** (screen and prop icons, section 9), always on top.

The head turns in 2-D the way cartoons do it: `head_yaw` slides the face over the shell and grows the near ear-pod; `head_pitch` shifts the face up or down and squeezes it a little; `head_roll` tilts the whole head about the neck.

---

## 4. How it animates (the model)

* **One clock.** `Mascot` is a Manim `VGroup`. Its updater adds Manim's `dt` to a clock on every frame of every `play()` and `wait()`, evaluates the pose at that time, and rebuilds the shapes. So a scene needs only: register something, then `self.wait(...)`. It is frame-exact and the same at any frame rate.
* **One pose.** The whole body is a flat dict of 73 numbers (`REST` holds every key and its resting value). Section 6 lists them.
* **Layers, evaluated in this order each frame:**

| # | layer | what it does | how you drive it |
|---|---|---|---|
| 1 | stance | body language that holds (arms, feet) | `stance(name)` |
| 2 | mood | the face and glows that hold | `mood(name)` |
| 3 | gaze | where the eyes look (added on top) | `look_at`, `look_at_point` |
| 4 | position, facing, visibility | `x`, `y`, `face`, `pop` | `walk_to`, `slide_to`, `face`, `hide`, `pop_in`, `pop_out` |
| 5 | idle | breathing, sway, blinking, eye drift (section 7) | on by default |
| 6 | walk cycle | waddle while a `walk_to` is in progress | `walk_to` |
| 7 | reactions | transient gestures, blended in and out | `react`, `act` |
| 8 | speech | lip-sync overrides the mouth shape | `speak` |

* **Reactions return to the base.** A reaction is a function of time that returns a partial pose. An envelope (attack then release, in the table below) blends it in and out, so every gesture starts and ends on whatever stance and mood were holding. Several reactions can overlap; later ones win on the keys they touch.
* **State changes are blended.** `mood`, `stance` and the other persistent changes ease from the previous value to the new one (smoothstep) over `blend` seconds, so nothing snaps.
* **Deterministic.** Blinks and eye drift come from a seeded generator (`seed=`), so a render is repeatable.

---

## 5. The API

```python
from mascot_robot import Mascot, LipSync, REACTIONS

class MyScene(Scene):
    def construct(self):
        bot = Mascot(size=1.15, position=[0, -3.4, 0])    # position = the point between the feet
        self.add(bot)
        bot.mood("happy")
        self.wait(bot.react("wave"))                      # react() returns its duration
        self.wait(bot.speak("Let us count the tens.", gestures=True))
        self.play(bot.act("idea"))                        # act() returns a Manim animation
```

| call | what it does |
|---|---|
| `Mascot(size=1.0, position=ORIGIN, seed=1, idle=True, facing=1)` | make it. `idle=False` freezes the idle layer (used for stills). |
| `react(name, at=None, dur=None, **opts) -> seconds` | schedule a reaction at the clock (or `at=`). `dur` stretches a one-shot reaction (slower or faster) and sets how long a loop runs. |
| `act(name, **opts)` | `react()` that returns a `Wait` animation, to hand to `self.play()`. |
| `mood(name, at=None, blend=0.35)` | change the face that holds. Names: section 9. |
| `stance(name, at=None, blend=0.5)` | change the body language that holds. Names: section 9. |
| `look_at(x, y, at=None, blend=0.25, head=0.5)` | eyes to (x, y) in -1..1 face units; the head follows by `head` (0 to 1). |
| `look_at_point(point)` | the same, aimed at a point of the Manim scene. |
| `speak(source, at=None, wav=None, scene=None, cps=14, gestures=False) -> seconds` | lip-sync a line. `source` is text, a `LipSync`, a `.wav` path, or a Rhubarb `.json` / `.tsv` path. `gestures=True` also runs the `explain` reaction for the line. With `scene=` and a WAV, the audio is mixed into the render (`scene.add_sound`). |
| `walk_to(x, y=None, speed=1.5, at=None) -> seconds` | turn towards the target, then waddle to local `x` (scales with `size`). Faces the way it goes. |
| `slide_to(x, y=None, dur=0.8, at=None)` | glide without the walk cycle. |
| `face(+1 or -1, at=None)` | turn to face as drawn (+1) or mirrored (-1), with a quick paper-turn. |
| `hide(at)`, `pop_in(at, dur=0.55)`, `pop_out(at, dur=0.35)` | invisible; scale up from the feet with an overshoot; scale down. |
| `shift`, `move_to`, `scale` | placement. `position` always means the point between the feet. |
| `seek(t)` | jump the clock and redraw (stills, previews). |
| `now()`, `pose_at(t)`, `reset()` | read the clock; read the whole pose at a time; forget every scheduled event. |

Rules of thumb:

* Register an event, then let time pass (`self.wait(...)`). Events register at the mascot's own clock.
* **Do not** apply Manim's own `FadeIn`, `Transform` or `.animate` to the mascot. Its clock pauses while an animation targets it, and its shapes are rebuilt every frame. Use `pop_in`, `pop_out`, `slide_to` and `walk_to`.

---

## 6. The pose (73 numbers)

Angles are degrees. Arm angles run from 0 (hanging down) outward and up to 180 (straight up). `l` is the viewer's left (the arm on the hip in the reference), `r` the viewer's right.

| group | keys |
|---|---|
| body | `x`, `y`, `hop` (feet off the ground), `squash` (1 = normal), `body_y` (crouch), `torso_y`, `torso_lean`, `pop` (scale), `face` (+1 or -1), `alpha` |
| head | `head_roll`, `head_pitch`, `head_yaw`, `head_y`, `gaze_yaw`, `gaze_pitch` |
| eyes | `eye_l`, `eye_r` (open 0..1), `squint_l`, `squint_r` (0 = round, 1 = happy arc), `lid_l`, `lid_r` and `lid_tilt_l`, `lid_tilt_r`, `pupil_x`, `pupil_y`, `eye_size`, `eyes_heart`, `eyes_star`, `eyes_dizzy` |
| brows | `brow_l`, `brow_r` (raise), `brow_tilt_l`, `brow_tilt_r` (positive: inner end down, angry; negative: worried) |
| mouth | `mouth_open`, `mouth_wide`, `mouth_smile` (-1 frown to 1 smile), `mouth_round`, `mouth_skew`, `tongue`, `teeth` |
| glows and parts | `blush`, `ear_glow`, `chest_glow`, `visor_glow`, `horn` (degrees) |
| arms | `sh_l`, `el_l`, `wr_l`, `hand_l`, `sh_r`, `el_r`, `wr_r`, `hand_r` (shoulder, elbow, wrist, hand shape), `arms_front` |
| feet | `fl_x`, `fl_y`, `fr_x`, `fr_y` (offset and lift), `foot_rot_l`, `foot_rot_r` |
| emotes | `e_question`, `e_exclaim`, `e_bulb`, `e_hearts`, `e_stars`, `e_sparkle`, `e_zzz`, `e_sweat`, `e_gears`, `e_tick`, `e_confetti`, `e_notes` (0 to 1 each) |

`alpha` is a pose key but has no helper method yet; set it from a custom reaction if you want a fade.

---

## 7. Idle behaviour (on by default)

Always running underneath everything else, so the character never freezes:

| what | amount | period |
|---|---|---|
| breathing (body squash, chest rise, head bob) | 0.7 % squash, 0.008 chest | 3.4 s |
| sway (torso lean) | 1 degree | 6.1 s |
| head roll | 1.4 degrees | 4.7 s |
| head yaw drift | 0.04 | 7.3 s |
| horn wobble | 2.5 degrees | 2.2 s |
| ear-pod glow pulse | 0.10 | 2.4 s |
| chest glow pulse | 0.08 | 3.1 s |
| arm drift | 1.3 degrees | 3.4 s |
| **blink** | one blink about every 3.4 s, 0.17 s long, 1 in 5 is a double blink | randomised, seeded |
| **eye drift** | a small glance (up to 0.35 across, 0.2 up) about every 1.7 s | randomised, seeded |

`bot.idle = False` turns it all off. `bot.idle_level = 0.5` halves the motion, glow pulses and eye drift; blinks are not scaled by it. A reaction that sets `eye_l` / `eye_r` (sleep, wink, squint) overrides the blink while it runs.

---

## 8. Hands

Twelve glove shapes. A hand is a vector (four finger extensions, thumb extension, finger spread, thumb angle), so changing shapes blends smoothly.

`open` · `flat` (palm out, fingers together) · `relaxed` (default) · `fist` · `point` · `thumbs` · `peace` · `one` · `two` · `three` · `four` · `five`

The thumb always faces the body, whichever way the hand points. Counting (`count` reaction) walks through `one` to `five`.

---

## 9. Reactions, moods, stances, emotes

### 9.1 The 29 reactions

`react(name, **opts)`. "Loop" reactions keep going for as long as `dur` says; the others play once (and `dur` slows or speeds them). Times are the default length in seconds.

| reaction | s | what it does | emotes it uses |
|---|---|---|---|
| `wave` | 2.6 | Greets with a raised hand (the reference pose); the wrist waves, a happy mouth. Option `side='right'` or `'left'`. | |
| `explain` | 3.2 (loop) | Narration gestures: open palms move alternately while the head nods gently. | |
| `think` | 3.4 | Fist to the chin, the other arm under the elbow, eyes up and aside, one brow raised. | gears |
| `idea` | 2.6 | The "aha": a hop, a raised finger, wide eyes, the light bulb pops. | bulb, sparkle |
| `happy` | 2.2 | Squinting smile, blush, little bounces, arms swinging out, horn wiggle. | sparkle |
| `celebrate` | 3.8 | Both arms up, jazz hands, repeated jumps with squash on landing, wide laugh. | confetti, stars |
| `clap` | 3.0 | Clapping in front of the chest to a steady beat. | sparkle on each clap |
| `thumbs_up` | 2.6 | Thumbs up, a wink, a smirk, a sparkle. | sparkle |
| `wink` | 1.5 | A quick wink and a smirk. Option `eye='right'` or `'left'`. | sparkle |
| `surprised` | 2.2 | A jolt: jump back, wide eyes, an O mouth, hands up, horn spikes. | exclaim |
| `confused` | 3.2 | Head tilt, eyes wander, a scratch of the back of the head, a lopsided mouth. | question |
| `oops` | 2.8 | A gentle "not quite": sheepish look, blush, a hand behind the head. Kind, never harsh (for wrong answers). | sweat |
| `sad` | 3.4 | Slumped shoulders, tilted lids, a frown, the horn droops, glows dim. | |
| `encourage` | 2.8 | "You can do it": a fist pump, determined brows, a nod, a smile. | sparkle |
| `point` | 2.6 | Points at something; the eyes and head follow. Option `dir='right'`, `'left'`, `'up'`, `'upleft'`, `'down'`. | |
| `count` | 4.5 | Counts on the fingers of the raised hand, a nod on each number. Option `to=1..5`. | |
| `sleep` | 4.8 | Dozes off: eyes close, head nods, slumps; wakes gently at the end. | zzz |
| `shy` | 3.0 | Looks away, blushes, both hands to the cheeks. | sparkle |
| `love` | 3.4 | Heart eyes, hands to the chest, a happy sway, glows pulse. | hearts, heart eyes |
| `dizzy` | 3.2 | Spiral eyes, swaying, wavy mouth. | stars (orbiting), spiral eyes |
| `dance` | 4.0 (loop) | Hip sway, alternating foot taps, arms pumping. | notes |
| `laugh` | 2.6 | Belly laugh: shaking shoulders, squinting eyes, wide mouth, hands on the belly. | |
| `shrug` | 2.4 | "Who knows?": palms up, shoulders raised, a lopsided mouth. | |
| `bow` | 2.4 | A polite bow: lean forward, eyes closed in a smile, a hand across the chest. | |
| `nod` | 1.3 | Yes: two nods and a smile. | |
| `no` | 1.6 | No: head shake and a wagging finger. | |
| `listen` | 3.0 (loop) | Attentive: head tilt, ears glow brighter, horn perked. Hold it while someone else speaks. | |
| `jump` | 1.2 | Crouch, spring up with arms thrown out, land with a squash. | |
| `proud` | 2.8 | Hands on hips, chest out, chin up, the chest glows. | |

Not tied to a built-in reaction but available as pose keys: the `tick` emote and the `eyes_star` eyes.

### 9.2 Moods (`mood(name)`): the face that holds

`neutral` · `happy` · `excited` · `sad` · `curious` · `sleepy` · `shy` · `determined` · `worried` · `proud`

Each sets a bundle of face and glow keys (eyes, lids, brows, mouth, blush, horn, ear and chest glow, visor glow, head tilt). A mood blends in over `blend` seconds and stays until the next `mood` call. Reactions play on top of it.

### 9.3 Stances (`stance(name)`): the body language that holds

| stance | what it is |
|---|---|
| `relaxed` | arms a little out, hands relaxed (default) |
| `hips` | hands on hips, feet apart (the pose of the reference's left arm) |
| `attention` | arms straight, hands flat, feet together |
| `present` | right arm out with an open palm, as if showing the board |
| `jazz` | both arms out and up, open hands |

### 9.4 Emotes

Vector icons drawn over and around the head; no fonts. Each fades and pops in by its `e_...` value.

`question` · `exclaim` · `bulb` (light bulb with pulsing rays) · `hearts` (three rising hearts) · `stars` (five orbiting) · `sparkle` (three twinkling) · `zzz` (three rising Z's) · `sweat` (a drop that slides down) · `gears` (two turning cogs) · `tick` · `confetti` (34 falling pieces in six colours) · `notes` (two floating music notes)

Eye replacements: `eyes_heart`, `eyes_star`, `eyes_dizzy` (spirals that turn).

---

## 10. Lip-sync and speech

`speak(source)` drives the mouth. It overrides the mouth shape, keeps the mood's smile (scaled to 60 %), and adds a small glow pulse in the ear-pods and chest and a slight head bob while the mouth is open. It fades in over 0.1 s and out over 0.2 s after the line.

### 10.1 The nine mouth shapes

The set is the one used by **Rhubarb Lip Sync** (A to H and X), so a real phoneme tool plugs straight in. Changing from one shape to the next takes 0.06 s.

| shape | mouth | typical sounds |
|---|---|---|
| A | closed lips | M, B, P |
| B | slightly open, teeth together | K, S, T, EE |
| C | open | EH, AE |
| D | wide open, tongue | AA |
| E | rounded | AO, ER |
| F | puckered | UW, OW, W |
| G | teeth on lower lip | F, V |
| H | tongue up | L |
| X | rest: the mood's own mouth | silence |

`manim -s -qh mascot_robot.py VisemeSheet` draws all nine on the face.

### 10.2 Four ways to feed it

| source | how | accuracy |
|---|---|---|
| **Text** | `speak("Hello there")` or `LipSync.from_text(text, cps=14)` | Approximate. Letters map to shapes at 14 characters a second, with short rests between words and longer ones after `,` and `.`. English letters only. Good for placeholders, not for tight sync. |
| **Rhubarb output** | `speak("line.json")` or `LipSync.from_rhubarb(path_or_string)` | Exact to the cues. Reads Rhubarb's JSON (`{"mouthCues": [...]}`) and its TSV (`0.31<TAB>B` per line). |
| **A WAV file** | `speak("line.wav")` or `LipSync.from_wav(path)` | Amplitude only (no phonemes): the loudness opens the jaw, with a gentle varying round. Needs 16-bit PCM WAV; convert other formats first. |
| **Your own cues** | `LipSync([(start, end, "D"), ...])` | Whatever you give it. |

### 10.3 Audio in the render

`speak(wav_path, scene=self)` (or `speak(text, wav="line.wav", scene=self)`) calls Manim's `scene.add_sound`, so the audio is mixed into the video at the right moment. The mascot never needs the audio to move; the mouth is driven from the cues or the file.

---

## 11. Export

* **Resolution and rate:** whatever Manim is given: `-ql` 480p15, `-qm` 720p30, `-qh` 1080p60, `-qk` 4k60. The animation is time-based, so every rate plays the same.
* **Transparent video:** add `-t` (for example `manim -qh -t mascot_robot.py Intro`). Manim writes a QuickTime Animation `.mov` (`qtrle`, `argb`) with a real alpha channel. Checked on a frame of `WalkDemo`: the background pixels have alpha 0 even though the demo scenes set a cream background colour, and the character pixels are fully opaque. The glow and shadow edges are semi-transparent, as intended.
* **Audio:** only when the scene calls `speak(..., scene=self)` with a WAV (or `scene.add_sound`).
* **Facing:** `Mascot(facing=-1)` or `face(-1)` mirrors it (the shading flips with it).

---

## 12. Adding a reaction

A reaction is a function of time that returns a partial pose. The envelope blends it in and out for you.

```python
from mascot_robot import reaction, S, win

@reaction("cheer_left", 2.0)                       # name, default seconds
def cheer_left(tau, u, o):                         # seconds in, 0..1 progress, options dict
    """Left fist in the air."""                    # the docstring appears in --list
    return {"sh_l": 150 + 6 * S(tau, 3), "el_l": 10, "hand_l": "fist",
            "mouth_open": 0.6, "mouth_smile": 1.0, "e_sparkle": win(tau, 0.2, 0.5)}
```

Then `bot.react("cheer_left")`. Optional arguments to `@reaction`: `attack`, `release` (blend seconds), `loop=True`, `peak` (where the contact sheet samples it). Helpers: `S(tau, hz, amp, phase)` is a sine, `win(tau, a, b)` is a 0 to 1 smooth ramp.

---

## 13. Limits (what it does not do)

* **One view.** The reference's three-quarter front view. There is no side or back view and no turnaround; `face(-1)` mirrors it and passes through a flat sliver while turning.
* **No blur.** Glows are stacked translucent strokes, not a blur. Gradients are Cairo's linear gradients.
* **Text lip-sync is approximate** (letters, not phonemes). For tight sync use Rhubarb output.
* **Hands are 2-D glove drawings** from twelve presets; there is no per-finger animation beyond the preset blend.
* **Only Manim's default Cairo renderer was checked.** The OpenGL renderer was not tried.
* **Arms in front of the head** (hand to the face) switch layer at the halfway point of the blend (`arms_front`), so there is a one-frame change of draw order.
* The `tick` emote and the `eyes_star` eyes exist but no built-in reaction uses them.

---

## 14. Tested

Run on Windows 11 with Python 3.11 and Manim Community 0.21.0 (Cairo renderer), by the person who wrote the file.

**Rendered and looked at**

* `PoseStill` (wave) at 720p, compared with `textbooks/mascot.png` over four rounds of fixes (proportions, horn, visor size, limb thickness, hands, ear-pods, joint bands).
* `ContactSheet` at 1080p, 8 columns by 4 rows: all 29 reactions at their peak pose, nothing cropped, every label readable. Zoomed sheets of 4 or 8 reactions each cover all 29, read pose by pose. A few were rendered before the last mouth-size change; the full sheet, the viseme sheet and a mouth zoom (laugh, celebrate, surprised, love) were re-rendered after it and show the open mouth staying inside the visor glass.
* `VisemeSheet` at 1080p: the nine mouth shapes are visibly different from one another.
* `Intro` (20 s, 480p15, 43 s to render): hidden at the start, pop-in, wave, speech with gestures, think with gears, idea with bulb. Frames pulled from the video.
* `WalkDemo`: enters from off-screen left, waddles to its mark, stops and waves. Frames pulled from the video. A transparent `.mov` of it was made and its alpha checked (section 11).
* `LipSyncDemo`: the mouth moves for text, then for a generated WAV; the finished video has an audio track (so `scene.add_sound` works here).
* `Showcase`: **all 29 reactions played one after another without an error** (29 animations, 1317 frames at 480p15; 3 min 15 s to render, and again 2 min 47 s on the final code after the last mouth edit). A frame from the middle of every reaction was pulled from the video and each shows its expected pose and emotes.

**Checked by a script (no rendering)**: 29 checks, all passing. A separate run of the section 12 template printed the expected values (no assertions).

* Mood and stance reach their targets and return to neutral (the mid-blend curve itself was not asserted).
* A reaction starts and ends exactly on the base pose; `dur` stretches it; `side=`, `dir=` and `to=` options work.
* All 29 reactions give finite numbers at nine points in time and use only real pose keys.
* `look_at` and `look_at_point` move the pupils; `walk_to` turns, moves, lifts the feet, then puts them down; `hide` then `pop_in` works and a hidden mascot draws nothing.
* Idle blinks (the eyes close fully at least once in 12 s; fewer than 8 % of frames are mid-blink).
* `LipSync.from_text`, `from_rhubarb` (a JSON string and a TSV string), `from_wav` and `speak` open the mouth and then let it rest.
* Placement helpers (`shift`, `move_to`, `scale`).
* Frame cost: about 51 ms to build a frame (about 100 shapes), measured while another render was running.

**Not tested**

* Full-length videos at 1080p or 4k (only stills at that size, and videos at 480p).
* Manim's OpenGL renderer; macOS and Linux.
* Real Rhubarb output (the parser was run on small hand-written samples in Rhubarb's documented JSON and TSV forms).
* Audio other than the generated WAV; whether sound and mouth line up by ear (only that the audio track is present and the mouth follows the file).
* A review of the likeness by anyone but its author. Known differences from the reference: the horn is a plain curved blade, the glow is stacked strokes (not a blur), there is no ground line, and the hands are simplified gloves.

