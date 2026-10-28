STATUS: ok
bundle REMOVED from images.json: one re-make done (prompt: exactly ten sticks, level, one flat row, tied at middle; $0.039, ledger now $1.833).
Raw shows level sticks tied at the middle, but only about 6-7 sticks can be told apart (they overlap in a stack); not a countable ten. Not kept.
The tool must draw its ten sticks itself in code (plain shapes, no skin). The old bundle skin file stays in the library, unused.
images.tsx rebuilt: only `counter` (golden-tan wooden button, tile 96x96, 3.6 KB, library hit $0) + TOOL_THEME (derived from counter). Slot 3.6 KB of 60 KB.
Do not draw <Skin name="bundle">: the key no longer exists (skin-keys check would fail).
Ones (buttons) stay skinned; tens are code-drawn sticks, drawn like the ones, so each ten reads as ten.
