"""
mascot_robot.py -- the Singularity robot mascot, built from scratch in Manim for video.

One self-contained Manim CE module (manim >= 0.19, numpy, standard library; no LaTeX, no images).
Every part of the character is a vector drawn from numbers, so it stays sharp at any size, can be
re-posed frame by frame, and can be rendered with a transparent background for an editor.

    manim -pqh mascot_robot.py Intro          # the greeting reel
    manim -pqh mascot_robot.py Showcase       # every reaction, captioned
    manim -s   mascot_robot.py ContactSheet   # one still: every reaction at its peak
    manim -s   mascot_robot.py VisemeSheet    # one still: the mouth shapes A-H, X
    manim -pqh mascot_robot.py LipSyncDemo    # lip-sync from text + a generated WAV
    manim -pqh mascot_robot.py WalkDemo       # enter, waddle, stop, wave, exit
    manim -qh -t mascot_robot.py Intro        # transparent .mov for compositing
    python mascot_robot.py --list             # the reaction / mood / stance tables

HOW IT IS BUILT (read top to bottom)
    1. PALETTE        every colour, sampled from the reference art.
    2. GEOMETRY       Xf (2-D affine transforms), smooth/straight Bezier paths, shape helpers.
    3. POSE           one flat dict of numbers describes the whole body (REST has every key).
    4. TRACKS         persistent states (stance, mood, gaze, move, visibility) are event lists;
                      a value is blended from the last event to the next with an easing curve.
    5. REACTIONS      transient gestures: a function of time that returns a partial pose; an
                      envelope blends it in and out so the body always returns to its base.
    6. LIP-SYNC       LipSync turns text, Rhubarb cues or a WAV into mouth parameters.
    7. Mascot         a VGroup. Its updater advances a clock by Manim's dt, evaluates the pose
                      (base -> idle -> reactions -> speech) and rebuilds the vector parts.
    8. SCENES         demo scenes that double as the smoke test.

Coordinates: local units, feet at y = 0, about 3.4 high at size 1.0; x to the viewer's right.
"viewer-left" is called l (the arm that rests on the hip in the reference art), viewer-right r.
Joint angles are degrees measured from "hanging straight down", growing outward then upward.
"""
from __future__ import annotations

import json
import math
import os
import random
import sys
import tempfile
import wave as _wave
from dataclasses import dataclass, field
from typing import Callable

import numpy as np
from manim import DOWN, ORIGIN, UP, VGroup, VMobject, Scene, Wait

try:  # round line caps are nicer on brows and lips; older Manim builds may lack the API
    from manim import CapStyleType
except Exception:  # pragma: no cover
    CapStyleType = None

# ======================================================================================
# 1. PALETTE (sampled from textbooks/mascot.png)
# ======================================================================================
C = dict(
    white="#FCFCF8", lilac="#E9DCEA", lilac2="#D7CBE9", lilac_line="#BDAEE3", shell_rim="#B8A8E8",
    torso="#F7F0F6", torso_shade="#E3D6EC", leg="#F2E9EE", leg_shade="#DCCFE6",
    visor="#171428", visor_hi="#1F2039", visor_lo="#0A0B1C", bezel="#EFE9FB", visor_glow="#6D3BD6",
    iris_top="#2A0668", iris_bot="#7A3FE0", pupil="#050408", eye_white="#FEFCFE",
    orange="#FD7202", orange2="#FD9302", gold="#FFC02E", pink="#F53FEB", coral="#FD6069",
    glove="#3A2D55", glove_hi="#54457A", glove_line="#1B1230",
    dark="#120D25", dark2="#282144", knee="#312949", pod_dark="#1E1738", pod_core="#0F0A1E",
    tongue="#FE7F8E", mouth_in="#4A0A1C", lip="#FFF1F6", blush="#FF5E8A",
    neon="#FFD9F3", neon_glow="#FF4FC8", violet="#8B5CF6", sweat="#7FD3FF", zz="#B7A6F2",
    shadow="#2A1F4A", bulb="#FFD84A",
)
CONFETTI = ["#FD7202", "#FFC02E", "#F53FEB", "#8B5CF6", "#7FD3FF", "#FFFFFF"]

# body measurements (local units)
HIP_Y, HIP_X = 0.98, 0.27
ANKLE_Y, FOOT_X = 0.30, 0.36
THIGH, SHIN = 0.35, 0.35
SH_X, SH_Y = 0.66, 1.66
UARM, FARM = 0.48, 0.46
NECK_Y, HEAD_CY = 1.95, 2.62
NECK_LOCAL = -(HEAD_CY - NECK_Y)          # neck pivot in head-local coordinates


# ======================================================================================
# 2. GEOMETRY
# ======================================================================================
class Xf:
    """A 2-D affine transform (3x3). `a @ b` applies b first, then a."""
    __slots__ = ("m",)

    def __init__(self, m=None):
        self.m = np.eye(3) if m is None else m

    def __matmul__(self, o: "Xf") -> "Xf":
        return Xf(self.m @ o.m)

    @staticmethod
    def T(x, y):
        m = np.eye(3); m[0, 2], m[1, 2] = x, y
        return Xf(m)

    @staticmethod
    def R(deg, cx=0.0, cy=0.0):
        a = math.radians(deg); c, s = math.cos(a), math.sin(a)
        return Xf(np.array([[c, -s, cx - c * cx + s * cy], [s, c, cy - s * cx - c * cy], [0, 0, 1.0]]))

    @staticmethod
    def S(sx, sy=None, cx=0.0, cy=0.0):
        sy = sx if sy is None else sy
        return Xf(np.array([[sx, 0, cx - sx * cx], [0, sy, cy - sy * cy], [0, 0, 1.0]]))

    def pts(self, P):
        return np.asarray(P, float) @ self.m[:2, :2].T + self.m[:2, 2]

    def p(self, x, y):
        return self.pts([[x, y]])[0]


def _bez_closed(P):
    p0, p2, p3 = np.roll(P, 1, 0), np.roll(P, -1, 0), np.roll(P, -2, 0)
    return np.stack([P, P + (p2 - p0) / 6, p2 - (p3 - P) / 6, p2], 1).reshape(-1, 2)


def _bez_open(P):
    n = len(P)
    if n == 2:
        return _bez_poly(P, False)
    a, b = P[:-1], P[1:]
    pm = np.concatenate([P[:1], P[:-2]])
    pp = np.concatenate([P[2:], P[-1:]])
    return np.stack([a, a + (b - pm) / 6, b - (pp - a) / 6, b], 1).reshape(-1, 2)


def _bez_poly(P, closed):
    a = P if closed else P[:-1]
    b = np.roll(P, -1, 0) if closed else P[1:]
    return np.stack([a, a + (b - a) / 3, a + 2 * (b - a) / 3, b], 1).reshape(-1, 2)


def _vm(P, closed=True, sharp=False, fill=None, fo=1.0, line=None, lw=0.0, lo=1.0, sheen=DOWN, cap=False):
    """Build one VMobject from 2-D control points. `fill` may be a colour or a list (a gradient)."""
    P = np.asarray(P, float)
    if sharp:
        b = _bez_poly(P, closed)
    else:
        b = _bez_closed(P) if closed else _bez_open(P)
    vm = VMobject()
    vm.set_points(np.column_stack([b, np.zeros(len(b))]))
    if fill is not None and fo > 0.004:
        vm.set_fill(fill, opacity=fo)
        if isinstance(fill, (list, tuple)):
            vm.set_sheen_direction(sheen)
    else:
        vm.set_fill(opacity=0)
    if line is not None and lw > 0 and lo > 0.004:
        vm.set_stroke(line, width=lw, opacity=lo)
        if cap and CapStyleType is not None:
            try:
                vm.set_cap_style(CapStyleType.ROUND)
            except Exception:
                pass
    else:
        vm.set_stroke(width=0)
    return vm


def ell(cx, cy, rx, ry, rot=0.0, N=22):
    th = np.linspace(0, 2 * np.pi, N, endpoint=False)
    P = np.column_stack([rx * np.cos(th), ry * np.sin(th)])
    if rot:
        a = math.radians(rot); c, s = math.cos(a), math.sin(a)
        P = P @ np.array([[c, s], [-s, c]])
    return P + [cx, cy]


def sup(cx, cy, a, b, n=2.0, N=40, taper=0.0):
    """Superellipse: n=2 ellipse, n=4 rounded square. `taper` narrows the top (positive) or bottom."""
    th = np.linspace(0, 2 * np.pi, N, endpoint=False)
    c, s = np.cos(th), np.sin(th)
    e = 2.0 / n
    x = a * np.sign(c) * np.abs(c) ** e * (1 - taper * s)
    y = b * np.sign(s) * np.abs(s) ** e
    return np.column_stack([x, y]) + [cx, cy]


def limb(A, B, w0, w1, nc=7):
    """Closed outline of a capsule from A (width w0) to B (width w1)."""
    A, B = np.asarray(A, float), np.asarray(B, float)
    d = B - A
    L = float(np.hypot(*d)) or 1e-6
    d = d / L
    n = np.array([-d[1], d[0]])
    a0 = math.atan2(n[1], n[0])
    out = [A + n * w0 / 2, (A + B) / 2 + n * (w0 + w1) / 4, B + n * w1 / 2]
    for k in range(1, nc):                       # cap around B, from +n through d to -n
        t = a0 - math.pi * k / nc
        out.append(B + w1 / 2 * np.array([math.cos(t), math.sin(t)]))
    out += [B - n * w1 / 2, (A + B) / 2 - n * (w0 + w1) / 4, A - n * w0 / 2]
    for k in range(1, nc):                       # cap around A, from -n through -d to +n
        t = a0 + math.pi + math.pi * 0 - math.pi * k / nc
        out.append(A + w0 / 2 * np.array([math.cos(t), math.sin(t)]))
    return np.array(out)


def band(C, d, w, l, n=3.4):
    """A flat rounded strap centred on C, `w` wide across the limb direction d, `l` long along it."""
    d = np.asarray(d, float) / (np.hypot(*d) or 1.0)
    ang = math.degrees(math.atan2(d[1], d[0])) - 90
    return ell_rot(sup(0, 0, w / 2, l / 2, n, N=28), ang) + np.asarray(C, float)


def ell_rot(P, deg):
    a = math.radians(deg); c, s = math.cos(a), math.sin(a)
    return np.asarray(P, float) @ np.array([[c, s], [-s, c]])


def heart_pts(cx, cy, s, N=30):
    t = np.linspace(0, 2 * np.pi, N, endpoint=False)
    x = 16 * np.sin(t) ** 3
    y = 13 * np.cos(t) - 5 * np.cos(2 * t) - 2 * np.cos(3 * t) - np.cos(4 * t)
    return np.column_stack([x, y]) * (s / 17.0) + [cx, cy - s * 0.05]


def star_pts(cx, cy, R, r=None, n=5, rot=90.0):
    r = R * 0.45 if r is None else r
    out = []
    for i in range(2 * n):
        a = math.radians(rot + i * 180.0 / n)
        rr = R if i % 2 == 0 else r
        out.append([cx + rr * math.cos(a), cy + rr * math.sin(a)])
    return np.array(out)


def drop_pts(cx, cy, s):
    """A teardrop: point on top, round belly below."""
    th = np.linspace(math.radians(62), math.radians(-242), 16)
    arc = [[cx + 0.55 * s * math.cos(a), cy - 0.30 * s + 0.55 * s * math.sin(a)] for a in th]
    return np.array([[cx, cy + 0.85 * s]] + arc)


def cog_pts(cx, cy, R, teeth=8, rot=0.0):
    out = []
    for i in range(teeth):
        a0 = rot + i * 360.0 / teeth
        for da, rr in ((0, R * 0.78), (0.18, R), (0.42, R), (0.58, R * 0.78)):
            a = math.radians(a0 + da * 360.0 / teeth)
            out.append([cx + rr * math.cos(a), cy + rr * math.sin(a)])
    return np.array(out)


# ======================================================================================
# 3. POSE
# ======================================================================================
HANDS = {  # index, middle, ring, pinky extension 0..1 | thumb extension | finger spread | thumb angle (deg)
    "open":    [1, 1, 1, 1, 1.0, 1.0, 62],
    "flat":    [1, 1, 1, 1, 0.6, 0.12, 38],
    "relaxed": [0.45, 0.5, 0.5, 0.4, 0.5, 0.5, 38],
    "fist":    [0, 0, 0, 0, 0.0, 0.0, 12],
    "point":   [1, 0, 0, 0, 0.3, 0.0, 22],
    "thumbs":  [0, 0, 0, 0, 1.0, 0.0, 4],
    "peace":   [1, 1, 0, 0, 0.0, 0.9, 14],
    "one":     [1, 0, 0, 0, 0.0, 0.0, 14],
    "two":     [1, 1, 0, 0, 0.0, 0.7, 14],
    "three":   [1, 1, 1, 0, 0.0, 0.7, 14],
    "four":    [1, 1, 1, 1, 0.0, 0.8, 14],
    "five":    [1, 1, 1, 1, 1.0, 1.0, 62],
}
EMOTES = ["question", "exclaim", "bulb", "hearts", "stars", "sparkle", "zzz", "sweat", "gears", "tick",
          "confetti", "notes"]

REST: dict = dict(
    # whole body
    x=0.0, y=0.0, hop=0.0, squash=1.0, body_y=0.0, torso_y=0.0, torso_lean=0.0, pop=1.0, face=1.0, alpha=1.0,
    # head
    head_roll=5.0, head_pitch=0.0, head_yaw=0.28, head_y=0.0, gaze_yaw=0.0, gaze_pitch=0.0,
    # eyes
    eye_l=1.0, eye_r=1.0, squint_l=0.0, squint_r=0.0, lid_l=0.0, lid_r=0.0, lid_tilt_l=0.0, lid_tilt_r=0.0,
    pupil_x=0.0, pupil_y=0.0, eye_size=1.0, eyes_heart=0.0, eyes_star=0.0, eyes_dizzy=0.0,
    # brows
    brow_l=0.0, brow_r=0.0, brow_tilt_l=0.0, brow_tilt_r=0.0,
    # mouth
    mouth_open=0.0, mouth_wide=1.0, mouth_smile=0.55, mouth_round=0.0, mouth_skew=0.0, tongue=0.0, teeth=0.0,
    # glows and small parts
    blush=0.0, ear_glow=0.35, chest_glow=0.35, visor_glow=0.5, horn=0.0,
    # arms (viewer-left l, viewer-right r)
    sh_l=16.0, el_l=-6.0, wr_l=0.0, hand_l="relaxed", sh_r=16.0, el_r=-6.0, wr_r=0.0, hand_r="relaxed",
    arms_front=0.0,
    # feet (offset from the rest stance; _y lifts the foot)
    fl_x=0.0, fl_y=0.0, fr_x=0.0, fr_y=0.0, foot_rot_l=0.0, foot_rot_r=0.0,
)
for _e in EMOTES:
    REST["e_" + _e] = 0.0


def _hand_vec(v):
    return np.array(HANDS[v], float) if isinstance(v, str) else np.asarray(v, float)


def _norm(d: dict) -> dict:
    """Turn hand names into vectors so they can be blended."""
    return {k: (_hand_vec(v) if k.startswith("hand_") else v) for k, v in d.items()}


for _k in ("hand_l", "hand_r"):
    REST[_k] = _hand_vec(REST[_k])


def _mix(a, b, k):
    if isinstance(a, str) or isinstance(b, str):
        return b if k >= 0.5 else a
    return a + (b - a) * k


def _clamp(x, lo=0.0, hi=1.0):
    return lo if x < lo else hi if x > hi else x


def sm(x):                 # smoothstep
    x = _clamp(x)
    return x * x * (3 - 2 * x)


def back(x, s=1.70158):    # ease-out with overshoot (pop-in)
    x = _clamp(x) - 1
    return 1 + (s + 1) * x ** 3 + s * x ** 2


def S(tau, f, a=1.0, ph=0.0):
    return a * math.sin(2 * math.pi * f * tau + ph)


def win(tau, a, b):        # 0 -> 1 between a and b
    return sm((tau - a) / max(b - a, 1e-6))


def lin(x):
    return _clamp(x)


# ======================================================================================
# 4. TRACKS: persistent states
# ======================================================================================
class Track:
    """Events (t0, duration, target dict, easing). value(t) blends each event in turn onto `init`."""

    def __init__(self, init: dict):
        self.init = _norm(init)
        self.events: list = []

    def add(self, t0, dur, target: dict, ease=sm):
        self.events.append((t0, max(dur, 1e-4), _norm(target), ease))
        self.events.sort(key=lambda e: e[0])

    def value(self, t):
        cur = dict(self.init)
        for t0, dur, tgt, ease in self.events:
            if t < t0:
                break
            a = ease((t - t0) / dur)
            for k, v in tgt.items():
                cur[k] = _mix(cur.get(k, REST.get(k, v)), v, a)
        return cur


STANCES = {   # arms / legs / posture (the body language that holds until changed)
    "relaxed":   dict(),
    "hips":      dict(sh_l=50, el_l=-98, hand_l="fist", sh_r=50, el_r=-98, hand_r="fist", fl_x=-0.10, fr_x=0.10),
    "attention": dict(sh_l=6, el_l=0, hand_l="flat", sh_r=6, el_r=0, hand_r="flat", fl_x=0.08, fr_x=-0.08),
    "present":   dict(sh_r=62, el_r=22, wr_r=-8, hand_r="flat", sh_l=14, el_l=-6, torso_lean=-2),
    "jazz":      dict(sh_l=70, el_l=40, hand_l="open", sh_r=70, el_r=40, hand_r="open"),
}
MOODS = {     # face and glow (persist until changed); each starts from NEUTRAL
    "neutral":    dict(),
    "happy":      dict(mouth_open=0.35, mouth_smile=1.0, mouth_wide=1.1, tongue=0.6, blush=0.2, brow_l=0.1, brow_r=0.1,
                       ear_glow=0.5),
    "excited":    dict(eye_size=1.12, brow_l=0.4, brow_r=0.4, mouth_open=0.7, mouth_smile=1.0, mouth_wide=1.15,
                       tongue=0.8, blush=0.15, ear_glow=0.85, horn=8, chest_glow=0.7),
    "sad":        dict(lid_l=0.3, lid_r=0.3, lid_tilt_l=-12, lid_tilt_r=-12, brow_tilt_l=-18, brow_tilt_r=-18,
                       brow_l=0.2, brow_r=0.2, mouth_smile=-0.6, mouth_wide=0.8, ear_glow=0.12, horn=-22,
                       pupil_y=-0.25, head_pitch=-0.2, chest_glow=0.15, visor_glow=0.25),
    "curious":    dict(head_roll=11, brow_l=0.55, brow_tilt_r=6, mouth_smile=0.3, mouth_open=0.08, mouth_wide=0.75,
                       ear_glow=0.65, horn=10, head_yaw=0.45),
    "sleepy":     dict(eye_l=0.35, eye_r=0.35, lid_l=0.25, lid_r=0.25, mouth_smile=0.1, mouth_open=0.05,
                       ear_glow=0.12, horn=-10, chest_glow=0.15, visor_glow=0.3, head_pitch=-0.15),
    "shy":        dict(blush=0.85, squint_l=0.3, squint_r=0.3, mouth_smile=0.5, mouth_wide=0.7, head_yaw=-0.25,
                       pupil_x=-0.45, pupil_y=-0.2),
    "determined": dict(brow_tilt_l=14, brow_tilt_r=14, lid_l=0.12, lid_r=0.12, lid_tilt_l=8, lid_tilt_r=8,
                       mouth_smile=0.3, chest_glow=0.85, horn=6),
    "worried":    dict(brow_tilt_l=-16, brow_tilt_r=-16, brow_l=0.4, brow_r=0.4, mouth_smile=-0.15, mouth_wide=0.8,
                       mouth_open=0.1, mouth_skew=0.2, ear_glow=0.25),
    "proud":      dict(head_pitch=0.25, mouth_smile=1.0, mouth_open=0.1, chest_glow=0.9, horn=8, squint_l=0.25,
                       squint_r=0.25),
}
GAZE_KEYS = ("pupil_x", "pupil_y", "gaze_yaw", "gaze_pitch")
_STANCE_KEYS = ("sh_l", "el_l", "hand_l", "sh_r", "el_r", "hand_r", "fl_x", "fr_x", "torso_lean", "wr_l", "wr_r")
_MOOD_KEYS = tuple(sorted(set().union(*[m.keys() for m in MOODS.values()])))


# ======================================================================================
# 5. REACTIONS: transient gestures
# ======================================================================================
@dataclass
class Reaction:
    name: str
    dur: float
    fn: Callable
    attack: float = 0.22
    release: float = 0.30
    loop: bool = False
    peak: float = 0.5          # where the contact sheet samples the pose (0..1)
    doc: str = ""


REACTIONS: dict[str, Reaction] = {}


def reaction(name, dur, attack=0.22, release=0.30, loop=False, peak=0.5):
    def deco(fn):
        REACTIONS[name] = Reaction(name, dur, fn, attack, release, loop, peak, (fn.__doc__ or "").strip())
        return fn
    return deco


SMILE = dict(mouth_open=0.5, mouth_smile=1.0, mouth_wide=1.1, tongue=0.7)


@reaction("wave", 2.6, peak=0.45)
def _wave_(tau, u, o):
    """Greet with a raised hand (the reference pose). option side='right'|'left'."""
    k = "r" if o.get("side", "right") == "right" else "l"
    sw = S(tau, 2.5)
    return {f"sh_{k}": 68, f"el_{k}": 98 + 5 * sw, f"wr_{k}": 24 * sw, f"hand_{k}": "open",
            "head_roll": 8, "head_yaw": 0.3, "torso_lean": -2, "brow_l": 0.3, "brow_r": 0.3, "blush": 0.15, **SMILE}


@reaction("explain", 3.2, loop=True)
def _explain(tau, u, o):
    """Narration gestures: open palms move alternately while the head nods. Loops for `dur`."""
    a, b = S(tau, 0.8), S(tau, 0.8, 1, math.pi)
    return {"sh_r": 40 + 10 * a, "el_r": 66 + 24 * a, "hand_r": "flat", "wr_r": -6 * a,
            "sh_l": 30 + 9 * b, "el_l": 62 + 22 * b, "hand_l": "flat", "wr_l": 6 * b,
            "head_pitch": 0.12 * S(tau, 1.1), "head_roll": 5 + 2 * S(tau, 0.8), "torso_lean": 1.5 * a,
            "brow_l": 0.15 + 0.1 * a, "brow_r": 0.15 + 0.1 * b, "mouth_smile": 0.8}


@reaction("think", 3.4, attack=0.35, release=0.4)
def _think(tau, u, o):
    """Fist to the chin, other arm under the elbow, eyes up and aside, gears turning."""
    return {"sh_r": -28, "el_r": -132, "hand_r": "fist", "wr_r": 4 * S(tau, 0.6), "sh_l": -20, "el_l": -80,
            "hand_l": "relaxed", "arms_front": 1.0, "head_roll": -6, "head_yaw": 0.6, "head_pitch": 0.3,
            "pupil_x": -0.5, "pupil_y": 0.7, "brow_l": 0.7, "brow_r": 0.0, "brow_tilt_r": 8,
            "mouth_open": 0.04, "mouth_wide": 0.7, "mouth_smile": -0.05, "mouth_skew": 0.25,
            "e_gears": win(tau, 0.3, 0.7), "ear_glow": 0.7 + 0.25 * S(tau, 1.2)}


@reaction("idea", 2.6, peak=0.55)
def _idea(tau, u, o):
    """The 'aha!': a hop, a raised finger, the light bulb pops."""
    j = _clamp((tau - 0.3) / 0.55)
    hop = 0.26 * math.sin(math.pi * j) if 0 < j < 1 else 0.0
    return {"hop": hop, "squash": 1 + 0.05 * math.sin(math.pi * j), "sh_r": 168, "el_r": 4, "hand_r": "one",
            "wr_r": 4 * S(tau, 3), "arms_front": 1.0, "eye_size": 1.2, "brow_l": 0.6, "brow_r": 0.6,
            "head_pitch": 0.4, "head_roll": 3, "mouth_open": 0.55, "mouth_smile": 1.0, "mouth_wide": 0.9,
            "e_bulb": win(tau, 0.28, 0.55), "e_sparkle": win(tau, 0.5, 0.8), "chest_glow": 0.9, "ear_glow": 0.9,
            "fl_y": hop * 0.5, "fr_y": hop * 0.5}


@reaction("happy", 2.2)
def _happy(tau, u, o):
    """Pleased: squinting smile, blush, little bounces, arms swinging out."""
    b = abs(math.sin(math.pi * tau * 1.6))
    return {"squint_l": 1, "squint_r": 1, "blush": 0.65, "hop": 0.07 * b, "squash": 1 - 0.03 * (1 - b) ** 4,
            "sh_l": 30 + 4 * S(tau, 1.6), "sh_r": 30 - 4 * S(tau, 1.6), "el_l": 18, "el_r": 18, "hand_l": "open",
            "hand_r": "open", "head_roll": 5 + 4 * S(tau, 0.8), "horn": 12 * S(tau, 1.6), "e_sparkle": 0.8,
            "fl_y": 0.05 * b, "fr_y": 0.05 * b, **SMILE}


@reaction("celebrate", 3.8, attack=0.25, peak=0.3)
def _celebrate(tau, u, o):
    """Both arms up, jumps, confetti and stars."""
    ph = (tau * 1.6) % 1.0
    h = math.sin(math.pi * ph) if ph < 1 else 0
    j = abs(h)
    return {"hop": 0.3 * j, "squash": 1 + 0.06 * j - 0.1 * (1 - j) ** 6, "sh_l": 158 + 8 * S(tau, 3.2),
            "sh_r": 158 + 8 * S(tau, 3.2, 1, 1.5), "el_l": 14, "el_r": 14, "hand_l": "open", "hand_r": "open",
            "wr_l": 14 * S(tau, 4), "wr_r": -14 * S(tau, 4), "arms_front": 1.0, "squint_l": 1, "squint_r": 1,
            "head_roll": 5 + 6 * S(tau, 0.8), "mouth_open": 0.9, "mouth_smile": 1.0, "mouth_wide": 1.25, "tongue": 0.9,
            "brow_l": 0.5, "brow_r": 0.5, "blush": 0.4, "horn": 14 * S(tau, 3.2), "ear_glow": 1.0, "chest_glow": 1.0,
            "fl_y": 0.16 * j, "fr_y": 0.16 * j, "e_confetti": 1.0, "e_stars": 0.9}


@reaction("clap", 3.0)
def _clap(tau, u, o):
    """Clapping in front of the chest to a steady beat."""
    c = 0.5 + 0.5 * math.cos(2 * math.pi * 2.4 * tau)         # 1 = hands together
    el = -105 - 30 * c
    return {"sh_l": 30, "el_l": el, "hand_l": "flat", "sh_r": 30, "el_r": el, "hand_r": "flat", "wr_l": 8, "wr_r": -8,
            "squint_l": 0.8, "squint_r": 0.8, "head_pitch": 0.1 * S(tau, 2.4), "torso_y": 0.012 * c,
            "e_sparkle": 0.9 * (c ** 8), "blush": 0.3, **SMILE}


@reaction("thumbs_up", 2.6, peak=0.55)
def _thumbs(tau, u, o):
    """Thumbs up with a wink and a sparkle."""
    return {"sh_r": 62, "el_r": 84, "hand_r": "thumbs", "wr_r": 3 * S(tau, 2), "head_roll": 9, "squint_r": win(tau, .5, .7)
            * (1 - win(tau, 1.5, 1.7)), "brow_r": -0.2, "mouth_skew": 0.3, "e_sparkle": win(tau, 0.6, 0.9),
            "hop": 0.05 * abs(math.sin(math.pi * tau * 1.2)), **SMILE}


@reaction("wink", 1.5, release=0.25)
def _wink(tau, u, o):
    """A quick wink and a smirk. option eye='right'|'left'."""
    k = "r" if o.get("eye", "right") == "right" else "l"
    w = win(tau, 0.2, 0.4) * (1 - win(tau, 0.9, 1.15))
    return {f"squint_{k}": w, f"brow_{k}": -0.3 * w, "head_roll": 10, "mouth_skew": 0.35, "mouth_open": 0.3,
            "mouth_smile": 1.0, "e_sparkle": win(tau, 0.45, 0.7)}


@reaction("surprised", 2.2, attack=0.1, peak=0.3)
def _surprised(tau, u, o):
    """A jolt: jump back, wide eyes, O mouth, exclamation mark."""
    j = _clamp(tau / 0.35)
    hop = 0.2 * math.sin(math.pi * j) if j < 1 else 0.0
    return {"hop": hop, "squash": 1 + 0.07 * math.sin(math.pi * j), "eye_size": 1.35, "brow_l": 0.9, "brow_r": 0.9,
            "mouth_open": 0.85, "mouth_wide": 0.5, "mouth_round": 1.0, "mouth_smile": 0.0, "head_pitch": 0.25,
            "sh_l": 100, "el_l": 25, "hand_l": "open", "sh_r": 100, "el_r": 25, "hand_r": "open", "horn": 28,
            "torso_lean": -4, "e_exclaim": win(tau, 0.05, 0.25), "pupil_x": 0, "pupil_y": 0, "fl_y": hop, "fr_y": hop}


@reaction("confused", 3.2)
def _confused(tau, u, o):
    """Head tilt, a scratch of the head, eyes wander, question mark."""
    return {"head_roll": -9 + 3 * S(tau, 0.5), "head_yaw": 0.1, "brow_l": 0.6, "brow_r": -0.2, "brow_tilt_r": 12,
            "pupil_x": 0.6 * S(tau, 0.6), "pupil_y": 0.3, "mouth_open": 0.1, "mouth_wide": 0.8, "mouth_smile": -0.1,
            "mouth_skew": 0.4, "sh_r": 145, "el_r": 14, "hand_r": "open", "wr_r": 12 * S(tau, 3), "arms_front": 1.0,
            "e_question": win(tau, 0.2, 0.5), "torso_lean": 2}


@reaction("oops", 2.8, attack=0.3, release=0.4)
def _oops(tau, u, o):
    """A gentle 'not quite': sheepish look, sweat drop, hand behind the head. Kind, never harsh."""
    return {"head_roll": 9, "head_pitch": -0.25, "pupil_y": -0.3, "pupil_x": 0.2, "eye_size": 0.95, "lid_l": 0.15,
            "lid_r": 0.15, "lid_tilt_l": -10, "lid_tilt_r": -10, "brow_tilt_l": -15, "brow_tilt_r": -15,
            "brow_l": 0.4, "brow_r": 0.4, "mouth_smile": 0.15, "mouth_open": 0.12, "mouth_wide": 0.9, "mouth_skew": 0.35,
            "blush": 0.45, "sh_r": 140, "el_r": 18, "hand_r": "open", "wr_r": 10 * S(tau, 3), "arms_front": 1.0,
            "e_sweat": win(tau, 0.25, 0.55), "horn": -10}


@reaction("sad", 3.4, attack=0.5, release=0.6)
def _sad(tau, u, o):
    """Droops: slumped shoulders, tilted lids, a frown, the horn and glows dim."""
    return {**{k: v for k, v in MOODS["sad"].items()}, "torso_lean": 5, "body_y": -0.04, "head_pitch": -0.6,
            "head_roll": -4, "sh_l": 6, "el_l": -4, "sh_r": 6, "el_r": -4, "hand_l": "relaxed", "hand_r": "relaxed",
            "eye_size": 1.1, "torso_y": -0.02 + 0.006 * S(tau, 0.35)}


@reaction("encourage", 2.8)
def _encourage(tau, u, o):
    """'You can do it!': a fist pump, determined brows, a nod and a smile."""
    p = S(tau, 1.5)
    return {"sh_r": 100, "el_r": 62 + 22 * p, "hand_r": "fist", "brow_tilt_l": 8, "brow_tilt_r": 8,
            "head_pitch": 0.1 + 0.2 * S(tau, 1.5, 1, 1.0), "squint_l": 0.3, "squint_r": 0.3, "torso_lean": -3 + 2 * p,
            "hop": 0.05 * abs(math.sin(math.pi * tau * 1.5)), "e_sparkle": 0.6, "chest_glow": 0.95, **SMILE}


_POINTS = {"right": ("r", 88), "left": ("l", 88), "up": ("r", 168), "upleft": ("l", 150), "down": ("r", 48)}


@reaction("point", 2.6, attack=0.25)
def _point(tau, u, o):
    """Point at something: option dir='right'|'left'|'up'|'upleft'|'down'. The eyes and head follow."""
    d = o.get("dir", "right")
    k, ang = _POINTS[d]
    yaw = {"right": 0.8, "left": -0.45, "up": 0.5, "upleft": -0.4, "down": 0.5}[d]
    px = {"right": 0.9, "left": -0.9, "up": 0.5, "upleft": -0.6, "down": 0.5}[d]
    py = {"up": 0.8, "upleft": 0.8, "down": -0.7}.get(d, 0.0)
    return {f"sh_{k}": ang, f"el_{k}": -4 + 3 * S(tau, 2), f"hand_{k}": "point", "head_yaw": yaw, "pupil_x": px,
            "pupil_y": py, "head_pitch": 0.2 if py > 0 else -0.1 if py < 0 else 0, "torso_lean": -4 if k == "r" else 4,
            "brow_l": 0.2, "brow_r": 0.2, "mouth_smile": 0.8, "mouth_open": 0.2, "arms_front": 1.0 if ang > 120 else 0.0}


@reaction("count", 4.5, attack=0.35)
def _count(tau, u, o):
    """Count on the fingers of the raised right hand: option to=5 (1..5)."""
    n = int(_clamp(o.get("to", 5), 1, 5))
    names = ["one", "two", "three", "four", "five"][:n]
    t_step = 0.8
    idx = min(int(tau / t_step), n - 1)
    prev = HANDS[names[max(idx - 1, 0)]]
    cur = HANDS[names[idx]]
    h = np.array(prev, float) + (np.array(cur, float) - np.array(prev, float)) * win(tau - idx * t_step, 0.0, 0.22)
    nod = max(0.0, 1 - ((tau - idx * t_step) / 0.3)) if tau >= 0 else 0
    return {"sh_r": 62, "el_r": 100, "hand_r": h, "head_pitch": -0.25 * nod, "head_yaw": 0.35, "head_roll": 6,
            "mouth_open": 0.25 + 0.2 * (S(tau, 3.2) > 0), "mouth_smile": 0.8, "brow_l": 0.2, "brow_r": 0.2,
            "pupil_y": 0.0, "wr_r": 4 * S(tau, 1.2)}


@reaction("sleep", 4.8, attack=0.8, release=0.9)
def _sleep(tau, u, o):
    """Dozes off: eyes close, head nods, zzz; wakes gently at the end."""
    d = win(tau, 0.2, 1.6)
    return {"eye_l": 1 - 0.95 * d, "eye_r": 1 - 0.95 * d, "head_pitch": -0.6 * d + 0.12 * S(tau, 0.45), "head_roll": 5 - 8 * d,
            "body_y": -0.05 * d, "torso_lean": 3 * d, "sh_l": 8, "el_l": -4, "sh_r": 8, "el_r": -4, "horn": -16 * d,
            "ear_glow": 0.1, "chest_glow": 0.12, "visor_glow": 0.25, "mouth_open": 0.1 + 0.08 * S(tau, 0.4),
            "mouth_smile": 0.1, "mouth_wide": 0.7, "e_zzz": d, "pupil_y": -0.2}


@reaction("shy", 3.0, attack=0.4)
def _shy(tau, u, o):
    """Looks away, blushes, both hands to the cheeks."""
    return {**MOODS["shy"], "sh_l": 20, "el_l": 170, "hand_l": "open", "sh_r": 20, "el_r": 170, "hand_r": "open",
            "arms_front": 1.0, "head_roll": 8 + 2 * S(tau, 1.1), "squint_l": 0.5, "squint_r": 0.5, "blush": 1.0,
            "e_sparkle": 0.4, "torso_lean": 2 * S(tau, 0.8)}


@reaction("love", 3.4)
def _love(tau, u, o):
    """Heart eyes, floating hearts, a happy sway."""
    p = 0.5 + 0.5 * S(tau, 1.6)
    return {"eyes_heart": win(tau, 0.1, 0.4), "blush": 0.7, "torso_lean": 5 * S(tau, 0.8), "head_roll": 5 + 6 * S(tau, 0.8),
            "sh_l": 30, "el_l": -112, "hand_l": "flat", "sh_r": 30, "el_r": -112, "hand_r": "flat", "e_hearts": 1.0,
            "chest_glow": 0.6 + 0.4 * p, "ear_glow": 0.6 + 0.4 * p, **SMILE}


@reaction("dizzy", 3.2)
def _dizzy(tau, u, o):
    """Spiral eyes, swaying, stars orbiting the head."""
    return {"eyes_dizzy": win(tau, 0.1, 0.4), "torso_lean": 8 * S(tau, 0.9), "head_roll": 5 + 12 * S(tau, 0.9, 1, 1.0),
            "x": 0.07 * S(tau, 0.9), "mouth_open": 0.35, "mouth_smile": -0.2 + 0.7 * S(tau, 0.9), "mouth_wide": 0.9,
            "e_stars": 1.0, "sh_l": 55, "el_l": 10, "sh_r": 55, "el_r": 10, "fl_y": max(0, S(tau, 0.9)) * 0.05,
            "fr_y": max(0, -S(tau, 0.9)) * 0.05}


@reaction("dance", 4.0, loop=True)
def _dance(tau, u, o):
    """Dance: hip sway, alternating foot taps, arms pumping, music notes."""
    s = S(tau, 1.8)
    return {"fl_y": max(0.0, s) * 0.13, "fr_y": max(0.0, -s) * 0.13, "torso_lean": 7 * s, "head_roll": 5 - 6 * s,
            "hop": 0.04 * abs(math.sin(math.pi * tau * 1.8)), "sh_l": 105 + 50 * s, "el_l": 18, "hand_l": "open",
            "sh_r": 105 - 50 * s, "el_r": 18, "hand_r": "open", "wr_l": 12 * s, "wr_r": -12 * s,
            "squint_l": 0.6, "squint_r": 0.6, "e_notes": 1.0, "horn": 10 * s, "ear_glow": 0.8 + 0.2 * s, **SMILE}


@reaction("laugh", 2.6)
def _laugh(tau, u, o):
    """Belly laugh: shaking shoulders, squinting eyes, wide mouth."""
    sh = S(tau, 7)
    return {"squint_l": 1, "squint_r": 1, "mouth_open": 0.9, "mouth_wide": 1.3, "mouth_smile": 1.0, "tongue": 1.0,
            "head_pitch": 0.25 + 0.12 * sh, "squash": 1 + 0.018 * sh, "torso_y": 0.012 * sh, "sh_l": 18, "el_l": -98,
            "hand_l": "fist", "sh_r": 18, "el_r": -98, "hand_r": "fist", "blush": 0.4, "head_roll": 5 + 3 * S(tau, 3.5)}


@reaction("shrug", 2.4)
def _shrug(tau, u, o):
    """'Who knows?': palms up, shoulders raised, a lopsided mouth."""
    return {"sh_l": 42, "el_l": 98, "hand_l": "flat", "wr_l": -10, "sh_r": 42, "el_r": 98, "hand_r": "flat", "wr_r": 10,
            "torso_y": 0.025, "head_roll": 9, "brow_l": 0.6, "brow_r": 0.6, "brow_tilt_l": -8, "brow_tilt_r": -8,
            "mouth_smile": -0.25, "mouth_wide": 0.9, "mouth_skew": 0.35, "mouth_open": 0.05, "pupil_x": 0.0}


@reaction("bow", 2.4, attack=0.5, release=0.6)
def _bow(tau, u, o):
    """A polite bow: lean forward, eyes closed in a smile, a hand across the chest."""
    return {"torso_lean": 20, "head_pitch": -0.5, "head_roll": 0, "squint_l": 1, "squint_r": 1, "sh_r": -18,
            "el_r": -125, "hand_r": "flat", "arms_front": 1.0, "sh_l": 12, "el_l": -4, "body_y": -0.04, "mouth_open": 0.2,
            "mouth_smile": 1.0, "blush": 0.3}


@reaction("nod", 1.3, attack=0.12, release=0.2)
def _nod(tau, u, o):
    """Yes: two nods and a smile."""
    return {"head_pitch": -0.55 * math.sin(2 * math.pi * 1.7 * tau) ** 2 * (1 if tau < 1.0 else 0), "squint_l": 0.3,
            "squint_r": 0.3, "mouth_smile": 1.0, "mouth_open": 0.2}


@reaction("no", 1.6, attack=0.12, release=0.2)
def _no(tau, u, o):
    """No: head shake and a wagging finger."""
    return {"head_yaw": 0.28 + 0.65 * S(tau, 2.4), "pupil_x": 0.5 * S(tau, 2.4), "sh_r": 70, "el_r": 95, "hand_r": "one",
            "wr_r": 20 * S(tau, 3.0), "mouth_smile": -0.1, "mouth_wide": 0.9, "brow_tilt_l": 6, "brow_tilt_r": 6}


@reaction("listen", 3.0, loop=True)
def _listen(tau, u, o):
    """Attentive: head tilt, ears glowing, horn perked. Hold it while someone else speaks."""
    return {"head_roll": 11, "head_yaw": 0.45, "head_pitch": 0.08, "ear_glow": 0.75 + 0.25 * S(tau, 1.0), "horn": 10 + 3 * S(tau, 1.4),
            "brow_l": 0.35, "brow_r": 0.2, "eye_size": 1.06, "mouth_smile": 0.45, "pupil_x": 0.3}


@reaction("jump", 1.2, attack=0.08, release=0.15, peak=0.4)
def _jump(tau, u, o):
    """Crouch, spring up with arms thrown out, land with a squash."""
    if tau < 0.22:
        c = sm(tau / 0.22)
        return {"body_y": -0.2 * c, "squash": 1 - 0.1 * c, "sh_l": 18 * c, "sh_r": 18 * c}
    if tau < 0.85:
        j = (tau - 0.22) / 0.63
        h = math.sin(math.pi * j)
        return {"hop": 0.6 * h, "squash": 1 + 0.07 * h, "sh_l": 130 * h, "sh_r": 130 * h, "el_l": 12, "el_r": 12,
                "fl_y": 0.18 * h, "fr_y": 0.18 * h, "hand_l": "open", "hand_r": "open", "mouth_open": 0.7,
                "mouth_smile": 1.0, "eye_size": 1.1}
    c = sm((1.2 - tau) / 0.35)
    return {"body_y": -0.14 * c, "squash": 1 - 0.08 * c}


@reaction("proud", 2.8)
def _proud(tau, u, o):
    """Hands on hips, chest out, chin up."""
    return {**STANCES["hips"], **MOODS["proud"], "chest_glow": 0.9 + 0.1 * S(tau, 1.2), "torso_y": 0.012 * S(tau, 0.6)}


# ======================================================================================
# 6. LIP-SYNC
# ======================================================================================
VISEMES = {   # Rhubarb Lip Sync mouth shapes A-H and X (rest)
    "A": dict(mouth_open=0.00, mouth_wide=1.00, mouth_round=0.0, teeth=0.0, tongue=0.0),   # M B P: lips closed
    "B": dict(mouth_open=0.14, mouth_wide=1.18, mouth_round=0.0, teeth=1.0, tongue=0.0),   # K S T EE: teeth together
    "C": dict(mouth_open=0.55, mouth_wide=1.08, mouth_round=0.0, teeth=0.5, tongue=0.2),   # EH AE: open
    "D": dict(mouth_open=0.95, mouth_wide=1.02, mouth_round=0.0, teeth=0.3, tongue=0.5),   # AA: wide open
    "E": dict(mouth_open=0.55, mouth_wide=0.72, mouth_round=0.55, teeth=0.0, tongue=0.3),  # AO ER: rounded
    "F": dict(mouth_open=0.30, mouth_wide=0.48, mouth_round=1.0, teeth=0.0, tongue=0.0),   # UW OW W: puckered
    "G": dict(mouth_open=0.16, mouth_wide=1.05, mouth_round=0.0, teeth=1.0, tongue=0.0),   # F V: teeth on lip
    "H": dict(mouth_open=0.50, mouth_wide=1.00, mouth_round=0.0, teeth=0.4, tongue=1.0),   # L: tongue up
    "X": None,                                                                              # rest
}
_MOUTH_KEYS = ("mouth_open", "mouth_wide", "mouth_round", "teeth", "tongue")


def _viseme_for(ch: str) -> str:
    c = ch.lower()
    if c in "mbp":
        return "A"
    if c in "fv":
        return "G"
    if c in "l":
        return "H"
    if c in "wuq":
        return "F"
    if c in "o":
        return "E"
    if c in "a":
        return "D"
    if c in "e":
        return "C"
    if c in "i":
        return "B"
    return "B" if c.isalpha() else "X"


class LipSync:
    """Mouth parameters over time. Build it from text, Rhubarb cues or a WAV; query it with at(tau)."""

    def __init__(self, cues=None, amp=None, rate=60.0):
        self.cues = sorted(cues or [], key=lambda c: c[0])          # (start, end, letter)
        self.amp, self.rate = amp, rate                             # amplitude envelope (0..1), samples per second
        self.duration = (self.cues[-1][1] if self.cues else (len(amp) / rate if amp is not None else 0.0))

    # -- builders --------------------------------------------------------------------
    @classmethod
    def from_text(cls, text: str, cps: float = 14.0):
        """Approximate: letters -> shapes at `cps` characters per second, rests between words."""
        cues, t, step = [], 0.05, 1.0 / cps
        for word in text.split():
            letters = [ch for ch in word if ch.isalpha()]
            for ch in letters:
                cues.append((t, t + step, _viseme_for(ch)))
                t += step
            if word[-1:] in ",;:":
                t += step * 2
            elif word[-1:] in ".!?":
                t += step * 4
            cues.append((t, t + step * 0.6, "X"))
            t += step * 0.6
        return cls(cues)

    @classmethod
    def from_rhubarb(cls, src: str):
        """Rhubarb Lip Sync output: a JSON file/string ({"mouthCues": [...]}) or its TSV ('0.31\\tB' per line)."""
        raw = open(src, encoding="utf-8").read() if os.path.exists(src) else src
        raw = raw.strip()
        if raw.startswith("{"):
            data = json.loads(raw)["mouthCues"]
            return cls([(c["start"], c["end"], c["value"]) for c in data])
        rows = [ln.split() for ln in raw.splitlines() if ln.strip()]
        cues = []
        for (a, v), nxt in zip(rows, rows[1:] + [[rows[-1][0], "X"]]):
            cues.append((float(a), float(nxt[0]), v))
        return cls(cues)

    @classmethod
    def from_wav(cls, path: str, rate: float = 60.0):
        """Amplitude-driven (no phonemes): the RMS level of a 16-bit PCM WAV opens the jaw."""
        with _wave.open(path, "rb") as w:
            if w.getsampwidth() != 2:
                raise ValueError("from_wav reads 16-bit PCM WAV; convert other files first")
            ch, fr, n = w.getnchannels(), w.getframerate(), w.getnframes()
            x = np.frombuffer(w.readframes(n), dtype="<i2").astype(float)
        if ch > 1:
            x = x.reshape(-1, ch).mean(1)
        hop = max(int(fr / rate), 1)
        k = len(x) // hop
        env = np.sqrt((x[: k * hop].reshape(k, hop) ** 2).mean(1)) if k else np.zeros(1)
        ref = np.percentile(env, 95) or 1.0
        env = np.clip(env / ref, 0, 1)
        env = np.convolve(env, np.ones(3) / 3, mode="same")
        return cls(amp=env, rate=fr / hop)

    # -- query -------------------------------------------------------------------------
    def _shape(self, letter):
        return VISEMES.get(letter) or None

    def at(self, tau: float):
        """Mouth params at tau seconds, or None when idle (the mood's own mouth then shows)."""
        if self.amp is not None:
            i = int(tau * self.rate)
            if not (0 <= i < len(self.amp)):
                return None
            lv = float(self.amp[i])
            if lv < 0.06:
                return dict(mouth_open=0.0, mouth_wide=1.0, mouth_round=0.0, teeth=0.0, tongue=0.0)
            rnd = 0.45 * (0.5 + 0.5 * math.sin(2 * math.pi * 3.1 * tau)) * lv
            return dict(mouth_open=min(1.0, lv ** 0.8), mouth_wide=1.12 - 0.35 * lv - 0.45 * rnd, mouth_round=rnd,
                        teeth=0.7 if lv < 0.25 else 0.2, tongue=0.5 * lv)
        cur, prev = None, None
        for i, (a, b, v) in enumerate(self.cues):
            if a <= tau < b:
                cur = (a, v)
                prev = self.cues[i - 1][2] if i else "X"
                break
        if cur is None:
            return None
        rest = dict(mouth_open=0.0, mouth_wide=1.0, mouth_round=0.0, teeth=0.0, tongue=0.0)
        tgt = self._shape(cur[1]) or rest
        src = self._shape(prev) or rest
        k = sm((tau - cur[0]) / 0.06)
        return {key: src[key] + (tgt[key] - src[key]) * k for key in _MOUTH_KEYS}


# ======================================================================================
# 7. THE MASCOT
# ======================================================================================
class Mascot(VGroup):
    """The robot. Add it to a Scene, then call react / mood / stance / speak / look_at / walk_to ...
    The calls register events at the mascot's own clock (`now()`); the clock advances by Manim's dt
    during every play() and wait(), so `bot.react("wave"); self.wait(2.6)` is all a scene needs.
    Do not apply Manim's own FadeIn / Transform / .animate to the mascot: its clock pauses while
    an animation targets it. Use pop_in / pop_out / slide_to / walk_to instead."""

    def __init__(self, size=1.0, position=ORIGIN, seed=1, idle=True, facing=1, **kw):
        super().__init__(**kw)
        self.size, self.origin = float(size), np.array(position, float)
        self.seed, self.idle, self.idle_level = seed, idle, 1.0
        self.t = 0.0
        self._stance = Track({k: REST[k] for k in _STANCE_KEYS})
        self._mood = Track({k: REST[k] for k in _MOOD_KEYS})
        self._look = Track({k: 0.0 for k in GAZE_KEYS})
        self._move = Track({"x": 0.0, "y": 0.0, "face": float(facing)})
        self._vis = Track({"pop": 1.0})
        self._reactions: list = []
        self._speech: list = []
        self._walks: list = []
        self._blinks: dict = {}
        self.add_updater(self._tick)
        self._render()

    # -- clock -------------------------------------------------------------------------
    def _tick(self, mob, dt):
        self.t += dt
        self._render()

    def now(self) -> float:
        return self.t

    def seek(self, t: float):
        """Jump the clock (for stills and previews) and redraw."""
        self.t = float(t)
        self._render()
        return self

    # -- placement (position = the point between the feet) ----------------------------------
    def shift(self, *vectors):
        self.origin = self.origin + sum(np.asarray(v, float) for v in vectors)
        self._render()
        return self

    def move_to(self, point, *a, **k):
        self.origin = np.array(point, float)
        self._render()
        return self

    def scale(self, factor, *a, **k):
        self.size *= factor
        self._render()
        return self

    # -- the public API ------------------------------------------------------------------
    def react(self, name: str, at=None, dur=None, **opts) -> float:
        """Schedule a reaction; returns its duration in seconds (handy for self.wait)."""
        rx = REACTIONS[name]
        t0 = self.t if at is None else at
        d = float(dur) if dur else rx.dur
        self._reactions.append((t0, d, rx, opts))
        return d

    def act(self, name: str, **opts):
        """react() that returns a Manim animation to hand to self.play()."""
        return Wait(self.react(name, **opts))

    def mood(self, name: str, at=None, blend=0.35):
        self._mood.add(self.t if at is None else at, blend, {**{k: REST[k] for k in _MOOD_KEYS}, **MOODS[name]})

    def stance(self, name: str, at=None, blend=0.5):
        self._stance.add(self.t if at is None else at, blend, {**{k: REST[k] for k in _STANCE_KEYS}, **STANCES[name]})

    def look_at(self, x=0.0, y=0.0, at=None, blend=0.25, head=0.5):
        """Gaze at a point in face units (x, y in -1..1). The head follows by `head` (0..1)."""
        self._look.add(self.t if at is None else at, blend,
                       {"pupil_x": x, "pupil_y": y, "gaze_yaw": 0.55 * x * head, "gaze_pitch": 0.5 * y * head})

    def look_at_point(self, point, **kw):
        """Gaze at a point of the Manim scene."""
        head = self.origin + np.array([0.0, 2.6 * self.size, 0.0])
        d = (np.asarray(point, float) - head) / (3.0 * self.size)
        self.look_at(float(np.clip(d[0], -1, 1)), float(np.clip(d[1], -1, 1)), **kw)

    def speak(self, source, at=None, wav=None, scene=None, cps=14.0, gestures=False) -> float:
        """Lip-sync a line. source: text | LipSync | Rhubarb file | WAV path. Returns its duration.
        Pass scene= and wav= (or a .wav source) to also mix the audio into the render."""
        t0 = self.t if at is None else at
        if isinstance(source, LipSync):
            lip = source
        elif isinstance(source, str) and source.lower().endswith(".wav") and os.path.exists(source):
            lip, wav = LipSync.from_wav(source), wav or source
        elif isinstance(source, str) and (source.lower().endswith((".json", ".tsv", ".txt")) and os.path.exists(source)):
            lip = LipSync.from_rhubarb(source)
        else:
            lip = LipSync.from_text(str(source), cps)
        self._speech.append((t0, lip))
        if wav and scene is not None:
            scene.add_sound(wav, time_offset=t0 - self.t)
        if gestures:
            self.react("explain", at=t0, dur=lip.duration + 0.3)
        return lip.duration

    def walk_to(self, x, y=None, speed=1.5, at=None) -> float:
        """Waddle to local x (in units of the mascot, from its placed position). Faces the way it goes."""
        t0 = self.t if at is None else at
        cur = self._move.value(t0)
        dx = x - cur["x"]
        dur = max(abs(dx) / speed, 0.01)
        if dx * cur["face"] < 0:
            self._move.add(t0, 0.2, {"face": 1.0 if dx > 0 else -1.0})
            t0 += 0.2
        self._move.add(t0, dur, {"x": x, "y": cur["y"] if y is None else y}, ease=lin)
        self._walks.append((t0, t0 + dur))
        return dur + 0.2

    def slide_to(self, x, y=None, dur=0.8, at=None) -> float:
        t0 = self.t if at is None else at
        cur = self._move.value(t0)
        self._move.add(t0, dur, {"x": x, "y": cur["y"] if y is None else y})
        return dur

    def face(self, direction: int, at=None):
        """Turn to face +1 (as drawn) or -1 (mirrored) with a quick paper-turn."""
        self._move.add(self.t if at is None else at, 0.2, {"face": float(direction)})

    def hide(self, at=None):
        self._vis.add((self.t if at is None else at) - 0.02, 0.01, {"pop": 0.0})

    def pop_in(self, at=None, dur=0.55):
        self._vis.add(self.t if at is None else at, dur, {"pop": 1.0}, ease=back)
        return dur

    def pop_out(self, at=None, dur=0.35):
        self._vis.add(self.t if at is None else at, dur, {"pop": 0.0})
        return dur

    def reset(self):
        """Forget every scheduled event (keeps the clock and the placement)."""
        for tr in (self._stance, self._mood, self._look, self._move, self._vis):
            tr.events.clear()
        self._reactions.clear(); self._speech.clear(); self._walks.clear()

    # -- pose ----------------------------------------------------------------------------
    def _blink(self, t):
        f = 1.0
        for kk in (int(t // 3.4) - 1, int(t // 3.4)):
            if kk not in self._blinks:
                r = random.Random(self.seed * 7919 + kk)
                self._blinks[kk] = (kk * 3.4 + r.uniform(0.3, 3.0), r.random() < 0.2)
            st, dbl = self._blinks[kk]
            for s0 in ((st, st + 0.32) if dbl else (st,)):
                if s0 <= t < s0 + 0.17:
                    f = min(f, 1 - math.sin(math.pi * (t - s0) / 0.17) ** 1.5)
        return f

    def _saccade(self, t):
        out = []
        for kk in (int(t // 1.7) - 1, int(t // 1.7)):
            r = random.Random(self.seed * 104729 + kk)
            on = r.random() < 0.6
            out.append((kk * 1.7, (r.uniform(-0.35, 0.35) * on, r.uniform(-0.2, 0.2) * on)))
        (_, a), (t1, b) = out
        k = sm((t - t1) / 0.12)
        return a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k

    def pose_at(self, t) -> dict:
        P = dict(REST)
        P.update(self._stance.value(t))
        P.update(self._mood.value(t))
        for k, v in self._look.value(t).items():
            P[k] += v
        P.update(self._move.value(t))
        P.update(self._vis.value(t))
        if self.idle:
            s = self.idle_level
            br = math.sin(2 * math.pi * t / 3.4)
            P["squash"] += 0.007 * br * s
            P["torso_y"] += 0.008 * br * s
            P["head_y"] += 0.006 * br * s
            P["torso_lean"] += 1.0 * math.sin(2 * math.pi * t / 6.1) * s
            P["head_roll"] += 1.4 * math.sin(2 * math.pi * t / 4.7 + 1) * s
            P["head_yaw"] += 0.04 * math.sin(2 * math.pi * t / 7.3) * s
            P["horn"] += 2.5 * math.sin(2 * math.pi * t / 2.2) * s
            P["ear_glow"] += 0.10 * math.sin(2 * math.pi * t / 2.4) * s
            P["chest_glow"] += 0.08 * math.sin(2 * math.pi * t / 3.1 + 1) * s
            P["sh_l"] += 1.3 * math.sin(2 * math.pi * t / 3.4 + 0.5) * s
            P["sh_r"] += 1.3 * math.sin(2 * math.pi * t / 3.4 + 0.5) * s
            bl = self._blink(t)
            P["eye_l"] *= bl
            P["eye_r"] *= bl
            sx, sy = self._saccade(t)
            P["pupil_x"] += sx * s
            P["pupil_y"] += sy * s
        for t0, t1 in self._walks:                       # waddle while a walk is in progress
            if t0 - 0.0 <= t <= t1 + 0.12:
                w = min(sm((t - t0) / 0.15), sm((t1 + 0.12 - t) / 0.15))
                s = math.sin(2 * math.pi * 2.0 * (t - t0))
                P["fl_y"] += max(0.0, s) * 0.15 * w
                P["fr_y"] += max(0.0, -s) * 0.15 * w
                P["fl_x"] += 0.06 * s * w
                P["fr_x"] += -0.06 * s * w
                P["torso_lean"] += 6 * s * w
                P["head_roll"] += -3 * s * w
                P["sh_l"] += 20 * s * w
                P["sh_r"] += -20 * s * w
                P["hop"] += 0.025 * abs(math.sin(2 * math.pi * 2.0 * (t - t0))) * w
        for t0, d, rx, opts in self._reactions:
            if not (t0 <= t <= t0 + d):
                continue
            tau, speed = t - t0, rx.dur / d
            at_, rl = min(rx.attack, d * 0.4), min(rx.release, d * 0.4)
            w = sm(tau / at_) * sm((d - tau) / rl)
            if w <= 0:
                continue
            for k, v in _norm(rx.fn(tau * (1.0 if rx.loop else speed), tau / d, opts)).items():
                if k in P:
                    P[k] = _mix(P[k], v, w)
        for t0, lip in self._speech:                     # lip-sync overrides the mouth shape (not the mood's smile)
            tau = t - t0
            if -0.05 <= tau <= lip.duration + 0.25:
                m = lip.at(max(tau, 0.0))
                if m:
                    k = sm((tau + 0.05) / 0.1) * sm((lip.duration + 0.25 - tau) / 0.2)
                    for key in _MOUTH_KEYS:
                        P[key] = _mix(P[key], m[key], k)
                    P["mouth_smile"] = _mix(P["mouth_smile"], P["mouth_smile"] * 0.6, k)
                    P["ear_glow"] += 0.25 * k * m["mouth_open"]
                    P["chest_glow"] += 0.2 * k * m["mouth_open"]
                    P["head_pitch"] += 0.05 * k * (m["mouth_open"] - 0.3)
        P["head_yaw"] += P["gaze_yaw"]
        P["head_pitch"] += P["gaze_pitch"]
        return P

    # -- drawing -------------------------------------------------------------------------
    def _render(self):
        P = self.pose_at(self.t)
        self.submobjects = self._build(P, self.t) if P["pop"] > 0.01 else []

    def _build(self, P, t):
        sz = self.size * P["pop"]
        self._k = 100.0 * sz                              # stroke units -> Manim width
        self._a = _clamp(P["alpha"])
        self._parts: list = []
        sq = max(P["squash"], 0.3)
        base = Xf.T(self.origin[0], self.origin[1]) @ Xf.S(sz * P["face"], sz)
        G = base @ Xf.T(P["x"], P["y"] + P["hop"]) @ Xf.S(1 / math.sqrt(sq), sq)
        ground = base @ Xf.T(P["x"], 0.0)
        U = G @ Xf.T(0, P["body_y"] + P["torso_y"]) @ Xf.R(P["torso_lean"], 0, HIP_Y)
        Hx = U @ Xf.T(0, HEAD_CY - 0.0 + P["head_y"]) @ Xf.R(P["head_roll"], 0, NECK_LOCAL)
        # draw order, back to front
        self._shadow(P, ground)
        self._legs(P, G)
        self._torso(P, U, t)
        if P["arms_front"] < 0.5:
            self._arms(P, U)
        self._neck(U)
        self._head(P, U, Hx, t)
        if P["arms_front"] >= 0.5:
            self._arms(P, U)
        self._emotes(P, U, t)
        return self._parts

    def _add(self, P2, X, **style):
        fo, lo = style.pop("fo", 1.0), style.pop("lo", 1.0)
        lw = style.pop("lw", 0.0) * self._k
        self._parts.append(_vm(X.pts(P2), fo=fo * self._a, lo=lo * self._a, lw=lw, **style))

    def _glow(self, P2, X, color, w, a, layers=3, closed=True):
        for i in range(layers):
            self._add(P2, X, closed=closed, line=color, lw=w * (1 + 0.9 * i), lo=a / (1 + 0.55 * i), cap=True)

    # ---- ground shadow
    def _shadow(self, P, ground):
        lift = _clamp(P["hop"] / 1.2)
        self._add(ell(0, 0, 0.82 * (1 - 0.3 * lift), 0.13 * (1 - 0.3 * lift)), ground, fill=C["shadow"], fo=0.2 * (1 - 0.5 * lift))

    # ---- legs (two-bone IK; knees bend outward)
    def _legs(self, P, G):
        for side, nm in ((-1, "l"), (1, "r")):
            hip = np.array([side * HIP_X, HIP_Y + P["body_y"]])
            foot = np.array([side * FOOT_X + P[f"f{nm}_x"], ANKLE_Y + P[f"f{nm}_y"]])
            d = foot - hip
            dist = min(float(np.hypot(*d)), THIGH + SHIN - 1e-3)
            u = d / (np.hypot(*d) or 1e-6)
            foot = hip + u * dist
            h = math.sqrt(max(THIGH ** 2 - (dist / 2) ** 2, 0.0))
            nrm = np.array([-u[1], u[0]])
            if nrm[0] * side < 0:
                nrm = -nrm
            knee = hip + u * dist / 2 + nrm * h
            self._add(limb(hip, knee, 0.44, 0.38), G, fill=[C["leg"], C["leg_shade"]], line=C["lilac_line"], lw=0.016)
            self._add(limb(knee, foot, 0.37, 0.31), G, fill=[C["leg"], C["leg_shade"]], line=C["lilac_line"], lw=0.016)
            kd = (foot - hip)
            self._add(band(knee, kd, 0.40, 0.17), G, fill=C["knee"], line=C["dark"], lw=0.008)
            # boot: dark sole crescent under a white shoe, a dark ankle patch on top
            R = Xf.R(P[f"foot_rot_{nm}"], foot[0], foot[1])
            cx, top = foot[0] + side * 0.09, foot[1]
            self._add(ell(cx, top - 0.175, 0.39, 0.155), G @ R, fill=C["dark2"], line=C["dark"], lw=0.012)
            self._add(ell(cx, top - 0.15, 0.375, 0.15), G @ R, fill=["#FFFFFF", C["lilac2"]], line=C["lilac_line"], lw=0.014)
            self._add(ell(foot[0], top - 0.02, 0.135, 0.085), G @ R, fill=C["dark2"])

    # ---- torso
    def _torso(self, P, U, t):
        # waist band + pelvis
        self._add(sup(0, HIP_Y + 0.03, 0.46, 0.12, 3.0), U, fill=C["dark2"], line=C["dark"], lw=0.01)
        self._add(sup(0, 1.43, 0.70, 0.55, 2.4, taper=0.10), U, fill=[C["torso"], C["torso_shade"]], line=C["lilac_line"], lw=0.018)
        self._add(sup(-0.05, 1.47, 0.63, 0.50, 2.4, taper=0.10), U, fill="#FFFFFF", fo=0.85)
        self._add([[-0.50, 1.02], [-0.25, 0.92], [0.0, 0.90], [0.25, 0.92], [0.50, 1.02]], U, closed=False, line=C["dark2"], lw=0.07, cap=True)
        # panel lines
        self._add([[-0.38, 1.84], [-0.46, 1.50], [-0.42, 1.12]], U, closed=False, line=C["lilac_line"], lw=0.011, lo=0.8, cap=True)
        self._add([[0.40, 1.84], [0.48, 1.50], [0.44, 1.12]], U, closed=False, line=C["lilac_line"], lw=0.011, lo=0.8, cap=True)
        self._add([[-0.42, 1.84], [0.0, 1.77], [0.42, 1.84]], U, closed=False, line=C["lilac_line"], lw=0.011, lo=0.8, cap=True)
        # chest emblem: black core, orange/violet ring, diagonal spark
        cg = _clamp(P["chest_glow"], 0, 1.5)
        e = Xf.T(0.07, 1.40)
        self._glow(ell(0, 0, 0.18, 0.18), U @ e, C["violet"], 0.03, 0.22 * cg, layers=3)
        self._add(ell(0, 0, 0.165, 0.165), U @ e, fill="#050507", line=C["orange"], lw=0.03, lo=0.95)
        th = np.linspace(math.radians(200), math.radians(340), 14)
        self._add(np.column_stack([0.165 * np.cos(th), 0.165 * np.sin(th)]), U @ e, closed=False, line=C["violet"], lw=0.03, cap=True)
        self._add([[-0.22, -0.27], [0.0, -0.02], [0.26, 0.25]], U @ e, closed=False, sharp=True, line=C["orange"], lw=0.014, lo=0.95, cap=True)
        self._add([[-0.22, -0.27], [-0.08, -0.12]], U @ e, closed=False, sharp=True, line=C["violet"], lw=0.016, lo=0.95, cap=True)
        self._add(ell(-0.05, 0.06, 0.035, 0.022, 30), U @ e, fill="#FFFFFF", fo=0.35)

    def _neck(self, U):
        self._add(sup(0, 1.93, 0.20, 0.13, 3.0), U, fill=C["dark"])

    # ---- arms
    def _arms(self, P, U):
        for side, nm in ((-1, "l"), (1, "r")):
            a1 = math.radians(P[f"sh_{nm}"])
            a2 = a1 + math.radians(P[f"el_{nm}"])
            S0 = np.array([side * SH_X, SH_Y])
            d1 = np.array([side * math.sin(a1), -math.cos(a1)])
            d2 = np.array([side * math.sin(a2), -math.cos(a2)])
            E = S0 + UARM * d1
            W = E + FARM * d2
            self._add(limb(S0, E, 0.47, 0.41), U, fill=[C["torso"], C["leg_shade"]], line=C["lilac_line"], lw=0.016)
            self._add(limb(E, W, 0.40, 0.35), U, fill=[C["torso"], C["leg_shade"]], line=C["lilac_line"], lw=0.016)
            self._add(band(S0 + 0.05 * d1, d1, 0.50, 0.17), U, fill=C["dark"], line=C["dark"], lw=0.008)      # shoulder band
            self._add(band(E, (d1 + d2), 0.44, 0.17), U, fill=C["dark2"], line=C["dark"], lw=0.008)           # elbow band
            a0, a1 = (96, 172) if side < 0 else (84, 8)
            th = np.radians(np.linspace(a0, a1, 10))
            self._add(np.column_stack([S0[0] + 0.30 * np.cos(th), S0[1] + 0.30 * np.sin(th)]), U, closed=False,
                      line=C["orange"], lw=0.035, lo=0.9, cap=True)                                    # orange shoulder trim
            ang = math.degrees(math.atan2(d2[1], d2[0])) - 90 + P[f"wr_{nm}"]
            ra = math.radians(ang)       # mirror so the thumb faces the body (and up) whichever way the hand points
            mir = 1 if side * math.cos(ra) - 0.6 * math.sin(ra) >= 0 else -1
            self._hand(P[f"hand_{nm}"], U @ Xf.T(*(W - 0.03 * d2)) @ Xf.R(ang) @ Xf.S(1.5 * mir, 1.5))

    def _hand(self, v, X):
        e = np.clip(np.asarray(v, float), 0, 1.0)
        thumb_ext, spread, tang = e[4], e[5], float(v[6])
        glove = dict(fill=[C["glove_hi"], C["glove"]], line=C["glove_line"], lw=0.011)
        bx = [-0.098, -0.034, 0.032, 0.095]            # index, middle, ring, pinky (thumb on the -x side)
        ln = [0.15, 0.17, 0.155, 0.12]
        fan = [-15, -5, 6, 17]
        for i in (3, 2, 1, 0):
            L = 0.04 + e[i] * ln[i]
            a = math.radians(fan[i] * spread)
            A = np.array([bx[i], 0.17])
            B = A + L * np.array([math.sin(a), math.cos(a)])
            self._add(limb(A, B, 0.092, 0.085, nc=4), X, **glove)
        self._add(ell(0, 0.09, 0.145, 0.125), X, **glove)
        ta = math.radians(tang)
        T0 = np.array([-0.125, 0.07])
        TL = 0.05 + 0.15 * thumb_ext
        self._add(limb(T0, T0 + TL * np.array([-math.sin(ta), math.cos(ta)]), 0.10, 0.09, nc=4), X, **glove)
        self._add(ell(-0.03, 0.115, 0.07, 0.04, 20), X, fill="#FFFFFF", fo=0.12)

    # ---- head
    def _head(self, P, U, Hx, t):
        yaw, pitch = _clamp(P["head_yaw"], -1.2, 1.2), _clamp(P["head_pitch"], -1.2, 1.2)
        # right ear pod (behind the shell: only a sliver shows)
        rs = _clamp(1 - 0.5 * yaw, 0.3, 1.5)
        self._add(ell(1.03 - 0.07 * yaw, 0.04, 0.2 * rs, 0.40 * rs), Hx, fill=[C["orange2"], C["orange"]], line=C["orange"], lw=0.01)
        # horn
        hb = np.array([-0.95, 0.36])
        HR = Hx @ Xf.R(P["horn"], hb[0], hb[1])
        top = np.array([-0.84, 0.60]); tip = np.array([-1.74, 0.92]); bot = np.array([-1.02, 0.12])
        c1, c2 = np.array([-1.28, 0.70]), np.array([-1.40, 0.46])
        tq = np.linspace(0, 1, 9)[:, None]
        up = (1 - tq) ** 2 * top + 2 * (1 - tq) * tq * c1 + tq ** 2 * tip
        dn = (1 - tq) ** 2 * tip + 2 * (1 - tq) * tq * c2 + tq ** 2 * bot
        horn = np.vstack([up, dn[1:]])
        self._glow(horn, HR, C["pink"], 0.03, 0.14, layers=2)
        self._add(horn, HR, sharp=True, fill=[C["pink"], C["coral"], C["orange"]], sheen=np.array([-1.0, 0.25, 0.0]))
        self._add([[-1.0, 0.56], [-1.30, 0.68], [-1.62, 0.86]], HR, closed=False, line="#FFFFFF", lw=0.012, lo=0.5, cap=True)
        # shell
        shell = sup(0, 0, 1.12, 0.82, 2.8, N=44, taper=0.08)
        self._glow(shell, Hx, C["violet"], 0.05, 0.16, layers=3)
        self._add(shell, Hx, fill=[C["white"], C["lilac2"]], line=C["shell_rim"], lw=0.02, sheen=np.array([0.5, -1.0, 0.0]))
        self._add(sup(-0.03, 0.04, 1.06, 0.76, 2.8, N=44, taper=0.08), Hx, fill="#FFFFFF", fo=0.9)
        self._add([[-0.62, 0.66], [-0.15, 0.74], [0.45, 0.70]], Hx, closed=False, line=C["lilac_line"], lw=0.012, lo=0.7, cap=True)
        self._add(ell(-0.55, 0.57, 0.22, 0.045, 12), Hx, fill="#FFFFFF", fo=0.9)
        # visor
        vx, vy = yaw * 0.08, -0.10 + pitch * 0.05
        self._add(sup(vx, vy, 0.97, 0.63, 4.0, N=40), Hx, fill=C["bezel"], line=C["lilac_line"], lw=0.012)
        visor = sup(vx, vy, 0.93, 0.59, 4.0, N=40)
        self._add(visor, Hx, fill=[C["visor_hi"], C["visor"], C["visor_lo"]], sheen=DOWN)
        vg = _clamp(P["visor_glow"], 0, 1.5)
        self._glow(sup(vx, vy, 0.90, 0.56, 4.0, N=40), Hx, C["visor_glow"], 0.024, 0.34 * vg, layers=3)
        # features
        F = Hx @ Xf.T(yaw * 0.20, pitch * 0.13) @ Xf.S(1.0, 1 - 0.06 * abs(pitch))
        self._face(P, F, t)
        # visor gloss
        self._add([[vx - 0.82, vy + 0.34], [vx - 0.36, vy + 0.52], [vx - 0.58, vy + 0.52], [vx - 0.88, vy + 0.22]], Hx, sharp=True, fill="#FFFFFF", fo=0.07)
        self._add([[vx + 0.40, vy + 0.53], [vx + 0.70, vy + 0.46], [vx + 0.34, vy - 0.46], [vx + 0.14, vy - 0.50]], Hx, sharp=True, fill="#FFFFFF", fo=0.045)
        # left ear pod (in front: the near ear)
        ls = _clamp(1 + 0.45 * yaw, 0.55, 1.5)
        pc = Xf.T(-1.07 + 0.02 * yaw, -0.10)
        pod = ell(0, 0, 0.29 * ls, 0.47)
        eg = _clamp(P["ear_glow"], 0, 1.5)
        self._glow(pod, Hx @ pc, C["violet"], 0.05, 0.16, layers=3)
        self._add(pod, Hx @ pc, fill=[C["orange2"], C["gold"]], line=C["orange"], lw=0.018, sheen=np.array([1.0, -0.4, 0.0]))
        self._add(ell(0.02, 0, 0.205 * ls, 0.37), Hx @ pc, fill=C["pod_dark"], line=C["dark"], lw=0.01)
        self._glow(ell(0.02, 0, 0.12 * ls, 0.205), Hx @ pc, C["neon_glow"], 0.04, 0.3 * eg, layers=4)
        self._add(ell(0.02, 0, 0.12 * ls, 0.205), Hx @ pc, fill=C["pod_core"], line=C["neon"], lw=0.026 + 0.012 * eg, lo=0.9)

    # ---- face (feature frame F)
    def _face(self, P, F, t):
        bl = P["blush"]
        if bl > 0.02:
            for cx in (-0.62, 0.62):
                self._add(ell(cx, -0.34, 0.15, 0.075), F, fill=C["blush"], fo=0.34 * _clamp(bl))
        for nm, cx, cy, r in (("l", -0.43, -0.13, 0.25), ("r", 0.41, -0.01, 0.23)):
            self._eye(P, F, nm, cx, cy, r)
        self._mouth(P, F)

    def _eye(self, P, F, nm, cx, cy, r):
        r = r * P["eye_size"]
        sq = _clamp(P[f"squint_{nm}"])
        o = max(P[f"eye_{nm}"] * (1 - 0.45 * min(sq / 0.6, 1.0)), 0.07)
        mode = _clamp(max(P["eyes_heart"], P["eyes_star"], P["eyes_dizzy"]))
        op = (1 - sm((sq - 0.55) / 0.35)) * (1 - mode)
        if op > 0.02:
            E = F @ Xf.T(cx, cy) @ Xf.S(r, r * o)
            self._glow(ell(0, 0, 1.0, 1.0), E, C["violet"], 0.02, 0.28 * op, layers=2)
            self._add(ell(0, 0, 1.0, 1.0, N=26), E, fill=C["eye_white"], fo=op)
            ox, oy = P["pupil_x"] * 0.22, P["pupil_y"] * 0.20
            self._add(ell(ox, oy, 0.80, 0.80, N=26), E, fill=[C["iris_top"], C["iris_bot"]], fo=op)
            self._add(ell(ox * 1.15, oy * 1.15, 0.47, 0.47, N=22), E, fill=C["pupil"], fo=op)
            self._add(ell(ox * 1.15 - 0.17, oy * 1.15 + 0.19, 0.17, 0.17), E, fill="#FFFFFF", fo=op)
            self._add(ell(ox * 1.15 + 0.2, oy * 1.15 - 0.21, 0.075, 0.075), E, fill="#FFFFFF", fo=0.9 * op)
            lid, tilt = _clamp(P[f"lid_{nm}"]), P[f"lid_tilt_{nm}"] * (-1 if nm == "l" else 1)
            if lid > 0.01 or abs(tilt) > 0.5:
                cut = r * (1 - 2 * lid) * o if lid > 0.01 else r * o * 1.05
                Lx = F @ Xf.T(cx, cy) @ Xf.R(tilt)
                self._add([[-r * 1.2, cut], [r * 1.2, cut], [r * 1.2, r * 1.12], [-r * 1.2, r * 1.12]], Lx, sharp=True, fill=C["visor_hi"], fo=op)
        sq = sm((sq - 0.45) / 0.4)
        if sq > 0.02:       # happy arc  ^ ^
            th = np.linspace(math.radians(20), math.radians(160), 12)
            arc = np.column_stack([r * 0.95 * np.cos(th), r * 0.55 * np.sin(th) - r * 0.2]) + [cx, cy]
            self._add(arc, F, closed=False, line="#FFFFFF", lw=0.052, lo=sq, cap=True)
        if P["eyes_heart"] > 0.02:
            s = r * 2.2 * (1 + 0.10 * math.sin(self.t * 9)) * _clamp(P["eyes_heart"])
            self._add(heart_pts(cx, cy, s * 0.5), F, fill=C["blush"], line="#FFFFFF", lw=0.012)
            self._add(ell(cx - 0.05, cy + 0.06, 0.03, 0.02, 30), F, fill="#FFFFFF", fo=0.9)
        if P["eyes_star"] > 0.02:
            self._add(star_pts(cx, cy, r * 1.15 * _clamp(P["eyes_star"])), F, sharp=True, fill=C["gold"], line="#FFFFFF", lw=0.01)
        if P["eyes_dizzy"] > 0.02:
            tt = np.linspace(0, 4.2 * math.pi, 40)
            ph = self.t * 6 * (1 if nm == "l" else -1)
            sp = np.column_stack([(0.05 + 0.85 * r * tt / (4.2 * math.pi)) * np.cos(tt + ph),
                                  (0.05 + 0.85 * r * tt / (4.2 * math.pi)) * np.sin(tt + ph)]) + [cx, cy]
            self._add(sp, F, closed=False, line="#FFFFFF", lw=0.03, lo=_clamp(P["eyes_dizzy"]), cap=True)
        # brow
        br, tl = P[f"brow_{nm}"], P[f"brow_tilt_{nm}"] * (-1 if nm == "l" else 1)
        Bx = F @ Xf.T(cx + (0.02 if nm == "r" else 0.0), cy + r + 0.13 + 0.13 * br) @ Xf.R(tl)
        w = 0.16 * (1 if nm == "l" else 0.9)
        self._add([[-w, -0.012], [0, 0.048], [w, -0.012]], Bx, closed=False, line="#FFFFFF", lw=0.036, cap=True)

    def _mouth(self, P, F):
        op, wd, sm_, rd = _clamp(P["mouth_open"]), P["mouth_wide"], P["mouth_smile"], _clamp(P["mouth_round"])
        w = 0.26 * wd * (1 - 0.35 * rd)
        cy, my = -0.34, 0.0
        a = np.linspace(-1, 1, 21)
        e = 1.0 - 0.5 * rd
        prof = np.maximum(1 - a ** 2, 0) ** e
        corner = 0.12 * sm_ + 0.0
        mid = -0.14 * sm_ * (1 - 0.6 * op)       # a big open mouth sags less, so it stays inside the glass
        skew = P["mouth_skew"] * 0.07 * a
        y0 = cy + corner + mid * (1 - a ** 2) + skew
        H = op * (0.34 if rd < 0.5 else 0.38)
        top = y0 + 0.012 * prof
        bot = y0 - H * prof ** 0.8
        M = Xf.T(0.0, 0.0)
        xs = a * w
        if op < 0.06:
            line = np.column_stack([xs, y0])
            self._add(line, F @ M, closed=False, line=C["lip"], lw=0.036, cap=True)
            if P["teeth"] > 0.3:
                self._add(np.column_stack([xs, y0 - 0.025 * np.ones_like(xs)]), F @ M, closed=False, line="#FFFFFF", lw=0.03, lo=0.8, cap=True)
            return
        outline = np.vstack([np.column_stack([xs, top]), np.column_stack([xs[::-1][1:-1], bot[::-1][1:-1]])])
        self._add(outline, F @ M, fill=C["mouth_in"], line=C["lip"], lw=0.02, cap=True)
        if P["tongue"] > 0.05:
            tg = _clamp(P["tongue"])
            m = (np.abs(a) < 0.62)
            tx, tb = xs[m], bot[m]
            tt_ = tb + (top[m] - tb) * 0.55 * tg * (1 - (a[m] / 0.65) ** 2)
            ring = np.vstack([np.column_stack([tx, tb]), np.column_stack([tx[::-1][1:-1], tt_[::-1][1:-1]])])
            self._add(ring, F @ M, fill=C["tongue"], fo=0.95)
        if P["teeth"] > 0.05:
            tg = _clamp(P["teeth"])
            m = (np.abs(a) < 0.82)
            tx, tp = xs[m], top[m]
            band = np.vstack([np.column_stack([tx, tp]), np.column_stack([tx[::-1][1:-1], (tp - 0.06 * tg * prof[m])[::-1][1:-1]])])
            self._add(band, F @ M, fill="#FFFFFF", fo=0.95)

    # ---- screen and prop emotes (drawn in the head frame without roll)
    def _emotes(self, P, U, t):
        H = U @ Xf.T(0, HEAD_CY + P["head_y"])
        ek = lambda n: _clamp(P["e_" + n], 0, 1.0)
        if ek("question") > 0.02:
            e = ek("question"); k = back(e)
            th = np.linspace(math.radians(165), math.radians(-85), 14)
            arc = np.column_stack([0.21 * np.cos(th), 0.21 * np.sin(th) + 0.26]) * k
            X = H @ Xf.T(1.15, 1.1 + 0.03 * math.sin(t * 4))
            self._add(np.vstack([arc, [[0.0, 0.0]], [[0.0, -0.09 * k]]]), X, closed=False, line=C["orange"], lw=0.075, lo=e, cap=True)
            self._add(ell(0.0, -0.27 * k, 0.055 * k, 0.055 * k), X, fill=C["orange"], fo=e)
        if ek("exclaim") > 0.02:
            e = ek("exclaim"); k = back(e)
            X = H @ Xf.T(1.15, 1.1)
            self._add([[0.0, 0.40 * k], [0.0, 0.06 * k]], X, closed=False, sharp=True, line=C["orange"], lw=0.10, lo=e, cap=True)
            self._add(ell(0.0, -0.12 * k, 0.06 * k, 0.06 * k), X, fill=C["orange"], fo=e)
        if ek("bulb") > 0.02:
            e = ek("bulb"); s = back(e)
            X = H @ Xf.T(0.15, 1.45) @ Xf.S(s)
            self._glow(ell(0, 0, 0.34, 0.34), X, C["gold"], 0.04, 0.3 * e, layers=3)
            self._add(ell(0, 0, 0.30, 0.30), X, fill=[C["bulb"], "#FFF3B0"], line=C["orange2"], lw=0.02, lo=e, fo=e)
            self._add(sup(0, -0.36, 0.13, 0.07, 3.0), X, fill=C["lilac2"], line=C["lilac_line"], lw=0.01, fo=e, lo=e)
            for i in range(8):
                a = math.radians(i * 45 + 22)
                self._add([[0.46 * math.cos(a), 0.46 * math.sin(a)], [0.62 * math.cos(a), 0.62 * math.sin(a)]], X, closed=False, sharp=True,
                          line=C["gold"], lw=0.03, lo=e * (0.55 + 0.45 * math.sin(t * 8 + i)), cap=True)
        if ek("gears") > 0.02:
            e = ek("gears")
            for (gx, gy, R, rot, col) in ((-0.05, 1.42, 0.26, t * 90, C["orange2"]), (0.38, 1.18, 0.2, -t * 120 + 11, C["lilac2"])):
                X = H @ Xf.T(gx, gy) @ Xf.S(back(e))
                self._add(cog_pts(0, 0, R, 8, rot), X, sharp=True, fill=col, line=C["orange"], lw=0.015, fo=e, lo=e)
                self._add(ell(0, 0, R * 0.32, R * 0.32), X, fill=C["visor"], fo=e)
        if ek("hearts") > 0.02:
            e = ek("hearts")
            for i, (hx, ph, s) in enumerate(((-0.55, 0.0, 0.2), (0.1, 0.35, 0.27), (0.65, 0.7, 0.22))):
                k = (t * 0.5 + ph) % 1.0
                self._add(heart_pts(hx + 0.08 * math.sin(t * 3 + i), 0.95 + 1.2 * k, s * (0.6 + 0.6 * k)), H, fill=[C["blush"], "#FF8FB1"],
                          fo=e * math.sin(math.pi * k), lo=0)
        if ek("stars") > 0.02:
            e = ek("stars")
            for i in range(5):
                a = 2 * math.pi * i / 5 + t * 1.9
                self._add(star_pts(1.45 * math.cos(a), 0.95 + 0.4 * math.sin(a), 0.17 + 0.03 * math.sin(t * 7 + i)), H, sharp=True,
                          fill=C["gold"], line="#FFFFFF", lw=0.008, fo=e, lo=e)
        if ek("sparkle") > 0.02:
            e = ek("sparkle")
            for i, (sx, sy) in enumerate(((-1.35, 0.9), (1.4, 1.1), (0.75, 1.6))):
                p = 0.5 + 0.5 * math.sin(t * 7 + i * 2.1)
                self._add(star_pts(sx, sy, 0.2 * (0.45 + 0.55 * p), 0.2 * 0.12, n=4), H, sharp=True, fill="#FFFFFF", line=C["gold"], lw=0.008, fo=e, lo=e)
        if ek("zzz") > 0.02:
            e = ek("zzz")
            for i in range(3):
                k = (t * 0.35 + i / 3) % 1.0
                s = 0.10 + 0.20 * k
                X = H @ Xf.T(0.85 + 0.45 * k, 0.85 + 0.95 * k)
                self._add([[-s, s], [s, s], [-s, -s], [s, -s]], X, closed=False, sharp=True, line=C["zz"], lw=0.05, lo=e * math.sin(math.pi * k), cap=True)
        if ek("sweat") > 0.02:
            e = ek("sweat")
            k = (t * 0.7) % 1.0
            self._add(drop_pts(0.80, 1.0 - 0.32 * k, 0.17 * back(e)), H, fill=C["sweat"], line="#FFFFFF", lw=0.01, fo=e * (1 - 0.6 * k), lo=e)
        if ek("tick") > 0.02:
            e = ek("tick")
            self._add([[0.85, 1.05], [1.02, 0.88], [1.35, 1.32]], H @ Xf.S(back(e), back(e), 1.05, 1.05), closed=False, sharp=True, line=C["gold"], lw=0.12, lo=e, cap=True)
        if ek("notes") > 0.02:
            e = ek("notes")
            for i, nx in enumerate((-1.45, 1.55)):
                k = (t * 0.45 + i * 0.5) % 1.0
                X = H @ Xf.T(nx + 0.1 * math.sin(t * 3 + i), 0.5 + 1.2 * k)
                a = e * math.sin(math.pi * k)
                self._add(ell(0, 0, 0.09, 0.065, 20), X, fill=C["violet"], fo=a, lo=0)
                self._add([[0.08, 0.0], [0.08, 0.34], [0.2, 0.22]], X, closed=False, sharp=True, line=C["violet"], lw=0.035, lo=a, cap=True)
        if ek("confetti") > 0.02:
            e = ek("confetti")
            rr = random.Random(5)
            for i in range(34):
                x0, sp, ph, rs = rr.uniform(-1.9, 1.9), rr.uniform(0.35, 0.8), rr.random(), rr.uniform(-300, 300)
                k = (t * sp + ph) % 1.0
                X = H @ Xf.T(x0 + 0.1 * math.sin(t * 2 + i), 2.0 - 3.4 * k) @ Xf.R(rs * t)
                self._add([[-0.06, -0.035], [0.06, -0.035], [0.06, 0.035], [-0.06, 0.035]], X, sharp=True, fill=CONFETTI[i % 6], fo=e * min(1.0, 4 * k, 4 * (1 - k)), lo=0)


# ======================================================================================
# 8. SCENES (demos and smoke tests)
# ======================================================================================
BG = "#FDFBF4"


def _caption(text, scene, y=-3.5):
    from manim import Text
    t = Text(text, font_size=28, color="#3A2D55").move_to([0, y, 0])
    return t


class Intro(Scene):
    """Pop in, wave, speak, think, have an idea, celebrate, bow, pop out."""
    def construct(self):
        self.camera.background_color = BG
        bot = Mascot(size=1.15, position=[0, -3.4, 0])
        bot.hide()
        self.add(bot)
        self.wait(0.2)
        self.wait(bot.pop_in())
        self.wait(bot.react("wave"))
        bot.mood("happy")
        self.wait(bot.speak("Hello! I am here to help you with maths.", gestures=True) + 0.4)
        bot.mood("neutral")
        self.wait(bot.react("think"))
        self.wait(bot.react("idea"))
        self.wait(bot.react("celebrate"))
        self.wait(bot.react("bow"))
        self.wait(bot.pop_out() + 0.3)


class Showcase(Scene):
    """Every reaction, captioned. Also the smoke test: it must run without an error."""
    def construct(self):
        from manim import Text
        self.camera.background_color = BG
        bot = Mascot(size=1.1, position=[0, -3.5, 0])
        self.add(bot)
        for name, rx in REACTIONS.items():
            cap = Text(name, font_size=30, color="#3A2D55").to_edge(UP)
            self.add(cap)
            opts = {"count": {"to": 3}}.get(name, {})
            self.wait(bot.react(name, **opts) + 0.25)
            self.remove(cap)


class ContactSheet(Scene):
    """One still: every reaction at its peak. Render with  manim -s  (add -qh for detail).
    Env: MASCOT_REACTIONS=think,shy,bow  picks some;  MASCOT_COLS=3  sets the columns."""
    def construct(self):
        from manim import Text
        self.camera.background_color = BG
        picked = [n for n in os.environ.get("MASCOT_REACTIONS", "").split(",") if n]
        names = picked or list(REACTIONS)
        cols = int(os.environ.get("MASCOT_COLS", 8 if len(names) > 12 else 6 if len(names) > 8 else len(names)))
        rows = math.ceil(len(names) / cols)
        cw, ch = 14.2 / cols, 7.6 / rows
        size = min(ch / 6.0, cw / 3.0)
        for i, n in enumerate(names):
            r, c = divmod(i, cols)
            x = -7.1 + cw * (c + 0.5)
            y = 3.8 - ch * (r + 1) + 0.45
            bot = Mascot(size=size, position=[x, y, 0], idle=False)
            rx = REACTIONS[n]
            opts = {"count": {"to": 3}}.get(n, {})
            bot.react(n, at=0.0, **opts)
            bot.seek(rx.dur * rx.peak)
            self.add(bot)
            self.add(Text(n, font_size=18, color="#3A2D55").move_to([x, y - 0.22, 0]))


class VisemeSheet(Scene):
    """One still: the nine mouth shapes (Rhubarb A-H and X) on a big face."""
    def construct(self):
        from manim import Text
        self.camera.background_color = BG
        keys = list(VISEMES)
        for i, k in enumerate(keys):
            r, c = divmod(i, 5)
            x, y = -5.6 + 2.8 * c, 2.1 - 3.6 * r
            bot = Mascot(size=0.85, position=[x, y - 2.62 * 0.85, 0], idle=False)
            bot.speak(LipSync([(0, 9, k)]), at=0.0)
            bot.seek(1.0)
            self.add(bot)
            self.add(Text(k + (" (rest)" if k == "X" else ""), font_size=30, color="#3A2D55").move_to([x + 0.95, y + 1.0, 0]))


class LipSyncDemo(Scene):
    """Lip-sync from text, then from a generated WAV (audio mixed into the render)."""
    def construct(self):
        self.camera.background_color = BG
        bot = Mascot(size=1.15, position=[0, -3.4, 0])
        self.add(bot)
        bot.mood("happy")
        self.wait(bot.speak("Let us count the tens and the ones. Ten, twenty, thirty!", gestures=True) + 0.5)
        wav = os.path.join(tempfile.gettempdir(), "_mascot_demo_voice.wav")
        _make_demo_wav(wav)
        bot.mood("excited")
        self.wait(bot.speak(wav, scene=self) + 0.5)


class WalkDemo(Scene):
    """Enter from the left, waddle to the middle, stop, wave, then leave to the right."""
    def construct(self):
        self.camera.background_color = BG
        bot = Mascot(size=1.0, position=[0, -3.4, 0])
        self.add(bot)
        bot.slide_to(-8.0, dur=0.01)
        self.wait(0.1)
        self.wait(bot.walk_to(-1.0, speed=1.9))
        self.wait(bot.react("wave"))
        self.wait(bot.walk_to(8.0, speed=2.2))


class PoseStill(Scene):
    """One big still. Env: MASCOT_POSE=<reaction|rest>  MASCOT_U=0..1  MASCOT_MOOD=<mood>  MASCOT_STANCE=<stance>."""
    def construct(self):
        self.camera.background_color = BG
        bot = Mascot(size=2.0, position=[0, -3.9, 0], idle=False)
        nm = os.environ.get("MASCOT_POSE", "rest")
        mood, stance = os.environ.get("MASCOT_MOOD"), os.environ.get("MASCOT_STANCE")
        if mood:
            bot.mood(mood, at=0.0, blend=0.01)
        if stance:
            bot.stance(stance, at=0.0, blend=0.01)
        t = 0.05
        if nm != "rest":
            bot.react(nm, at=0.0)
            t = REACTIONS[nm].dur * float(os.environ.get("MASCOT_U", REACTIONS[nm].peak))
        bot.seek(t)
        self.add(bot)


def _make_demo_wav(path, seconds=3.0, rate=22050):
    """A speech-like test tone (syllable bursts), so the amplitude lip-sync can be shown offline."""
    t = np.arange(int(seconds * rate)) / rate
    syl = np.clip(np.sin(2 * np.pi * 3.6 * t) ** 2 * (0.6 + 0.4 * np.sin(2 * np.pi * 0.7 * t)), 0, 1)
    gate = (np.sin(2 * np.pi * 0.45 * t + 1.0) > -0.8).astype(float)
    x = syl * gate * (np.sin(2 * np.pi * 180 * t) + 0.5 * np.sin(2 * np.pi * 360 * t)) * 0.35
    with _wave.open(path, "wb") as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(rate)
        w.writeframes((x * 32767).astype("<i2").tobytes())


# ======================================================================================
# CLI: python mascot_robot.py --list
# ======================================================================================
def _table():
    rows = ["| reaction | seconds | what it does |", "|---|---|---|"]
    for r in REACTIONS.values():
        rows.append(f"| `{r.name}` | {r.dur:g} | {r.doc} |")
    return "\n".join(rows)


if __name__ == "__main__":
    if "--list" in sys.argv:
        print(f"{len(REACTIONS)} reactions\n{_table()}\n\nmoods:    {', '.join(MOODS)}\nstances:  {', '.join(STANCES)}"
              f"\nhands:    {', '.join(HANDS)}\nvisemes:  {', '.join(VISEMES)}\nemotes:   {', '.join(EMOTES)}")
    else:
        print(__doc__)
