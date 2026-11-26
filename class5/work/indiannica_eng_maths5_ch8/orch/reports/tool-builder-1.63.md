STATUS: done. Last fixes 1-4 applied (5 left as decided), nothing else changed; full check 99 pass, 0 warn, 0 fail; pair ported.
SLOTS: M3.S5.T10.C46.2D1 (Box Packer)
FILES: work/indiannica_eng_maths5_ch8/M3.S5.T10.C46.2D1/tool.tsx
CHECKS: quick 33/0/0; full 99/0/0 (reduced motion). Real motion proved with playkit; the check has no motion switch.
1 FIXED (must): a digit refocuses the act key only while the gate is on (the nudge case), never in P2. The act-end refocus runs only when the act started from the keyboard (an Enter/Space on that key within 400 ms of the press).
Proof: P2 Q1, Higher then Check by mouse, finger and keys-only, real and reduced motion, en/hi/gu (18 sessions). Type 6, Enter: the 6 is submitted and the stage goes to win; checks stay 1->1 (keys-only 0->0 in that run), Check never re-pressed. Focus after a mouse/finger act is BODY, as the runtime leaves it.
Keys-only was re-run with a full wait: focus stays on Check after a keyboard Check, the typed 6 blurs it (runtime), Enter answers -> win, checks 1->1.
2 FIXED: P1 Q2, click/tap Raise, type 60, Enter: layers stay 1, the bubble shows the nudge, at both motions in en/hi/gu.
3 FIXED: a keyboard-started guide act refocuses its key too (press refocuses before act() in the demo stage). P1 guide steps by Space then Enter, en/hi/gu: focus on Raise at +80 ms, after step 1 and after the last step.
4 FIXED: thumb layer lines thin with the layer height (width lp x 0.22, opacity 0.55 when lp < 8), so 9 layers read as planks.
hi/gu P1 Given card 60 wider and free-play card 40 wider; base-area chip up to 290; ruler chip room +3; dial read-out 15 clear each side. The "10 सेमी" read-out still drops to 28: accepted, the pill can't hold 34.
5 left as decided (nits kept).
RISKS: disk 99% (~2.8 GB free).
ESCALATE: none.
