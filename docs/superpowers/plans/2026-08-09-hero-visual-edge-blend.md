# Hero Desk Visual Edge Blend Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Stop `frontend/public/images/hero-desk-visual.png` from reading as a pasted rectangle on the homepage hero by feathering its four edges to transparent, so the section's live `hero-wash` gradient shows through at the border.

**Architecture:** Regenerate the PNG from the existing source crop with a per-edge (not radial) smoothstep alpha feather added via Pillow/numpy. No component code changes — `HomeHero.tsx` already renders this file as a plain transparent-background `next/image`.

**Tech Stack:** Python 3 + Pillow (already available in this environment), no new dependencies.

## Global Constraints

- Source crop is `992×941` px, taken from `frontend/assests/hero.png` (already committed as the reference asset).
- Feather must be per-edge (independent left/right/top/bottom falloff), not elliptical/radial — an elliptical mask would cut the plant (near top-right) and mug (near bottom-right) more aggressively than intended, per the approved design (`docs/superpowers/specs/2026-08-09-hero-visual-edge-blend-design.md`).
- No color/tint adjustment to the image interior — a tested tint candidate produced a visible magenta cast on the laptop keyboard and was rejected.
- Output file path stays `frontend/public/images/hero-desk-visual.png` (same path `HomeHero.tsx` already references) — no import/JSX changes needed.

---

### Task 1: Regenerate the hero visual with feathered edges

**Files:**
- Modify (binary, regenerated): `frontend/public/images/hero-desk-visual.png`
- Reference-only (read, not modified): `frontend/assests/hero.png`

**Interfaces:**
- Consumes: nothing from other tasks (first and only task).
- Produces: `frontend/public/images/hero-desk-visual.png` — same 992×941 dimensions, now RGBA with a feathered alpha border. `frontend/src/components/home/HomeHero.tsx` already points `<Image src="/images/hero-desk-visual.png" .../>` at this path, so no code changes are required for the app to pick it up.

- [ ] **Step 1: Regenerate the image with a feathered alpha border**

Run this from the repo root (adjust the scratch path if regenerating outside this session):

```python
from PIL import Image
import numpy as np

SRC = "frontend/assests/hero.png"       # full reference comp, 1672x941
OUT = "frontend/public/images/hero-desk-visual.png"
CROP_LEFT = 680                          # right-side visual starts here
FEATHER = 80                             # px, per edge

src_full = Image.open(SRC).convert("RGB")
w_full, h_full = src_full.size
crop = src_full.crop((CROP_LEFT, 0, w_full, h_full))
w, h = crop.size

def smoothstep(t):
    t = np.clip(t, 0, 1)
    return t * t * (3 - 2 * t)

xs, ys = np.arange(w), np.arange(h)
left = smoothstep(xs / FEATHER)
right = smoothstep((w - 1 - xs) / FEATHER)
top = smoothstep(ys / FEATHER)
bottom = smoothstep((h - 1 - ys) / FEATHER)
alpha_x = np.minimum(left, right)
alpha_y = np.minimum(top, bottom)
alpha = np.minimum(alpha_x[None, :], alpha_y[:, None])
alpha_channel = (alpha * 255).astype(np.uint8)

out = crop.copy()
out.putalpha(Image.fromarray(alpha_channel))
out.save(OUT)
print("saved", out.size, out.mode)
```

Expected output: `saved (992, 941) RGBA`.

- [ ] **Step 2: Confirm the file is RGBA with a transparent border (not just resaved RGB)**

```python
from PIL import Image
im = Image.open("frontend/public/images/hero-desk-visual.png")
assert im.mode == "RGBA", im.mode
r, g, b, a = im.split()
assert a.getpixel((0, 0)) == 0, "top-left corner should be fully transparent"
assert a.getpixel((im.width // 2, im.height // 2)) == 255, "center should be fully opaque"
print("ok")
```

Expected: prints `ok` with no assertion errors.

- [ ] **Step 3: Visually verify against the live dev server**

With the Next.js dev server running (`npm run dev` from `frontend/`, port 3001), load `http://localhost:3001/` in a browser at desktop width (≥1024px so the `lg:` two-column grid is active) and screenshot the hero section. Confirm:
- No visible rectangular edge around the desk photo.
- Plant and mug fade softly rather than being cut off hard.
- The laptop screen, sticky notes, and cards keep their original colors (no tint/cast).

- [ ] **Step 4: Run the existing HomeHero test suite (no code changed, but confirm nothing broke)**

Run: `cd frontend && npx vitest run src/components/home/HomeHero.test.tsx`
Expected: all existing tests still pass (the test suite only asserts on text content, links, and the image's `alt` text/role — none of which change in this task).

- [ ] **Step 5: Commit**

```bash
git add frontend/public/images/hero-desk-visual.png
git commit -m "fix(home): feather hero desk visual edges into hero-wash background

The pasted rectangle look was the hard silhouette, not a color
mismatch (the PNG's flat background was already ~2 RGB units from
--cream). Feathering the four edges to transparent lets the live
hero-wash gradient show through at the border instead.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```
