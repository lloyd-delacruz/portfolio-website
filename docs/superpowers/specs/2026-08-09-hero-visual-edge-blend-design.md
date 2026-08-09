# Hero Desk Visual — Edge Blend

**Date:** 2026-08-09
**Owner:** Lloyd Dela Cruz
**Scope:** Fix the "pasted sticker" look of the homepage hero's right-side desk photo (`frontend/public/images/hero-desk-visual.png`), introduced in the earlier `hero.png`-replication pass.

## Problem

`HomeHero.tsx` renders `hero-desk-visual.png` as a flat rectangle over the section's `.home2 .hero-wash` background (three low-opacity radial gradients — purple/pink/blue — over `--cream`). The PNG's own background is a flat near-white, sampled at ~2 RGB units from `--cream` — nearly identical in color. Despite that near-exact color match, the image still reads as visibly pasted, because the crisp rectangular silhouette is what the eye catches, not the subtle color.

## Approach

Feather the PNG's four edges to full transparency (smoothstep falloff, ~80px on the 992×941 source) so the section's live `hero-wash` gradient shows through directly at the border — mathematically exact at any viewport width, since it's the same pixels, not an approximation. No color/tint adjustment to the interior: a test candidate that soft-light-blended a purple/pink tint onto the image introduced a visible magenta cast on the laptop keyboard, which is a regression, not an improvement. The color match was never the actual problem.

Object silhouettes that sit close to the crop edge (plant, mug) will fade slightly at their outermost ~80px — this reads as an intentional soft vignette, consistent with the rest of the page's soft-pastel treatment, not a mistake.

## Implementation

- Regenerate `hero-desk-visual.png` from the same source crop, adding an alpha channel via a per-edge smoothstep feather (left/right/top/bottom independently, not a radial/elliptical mask, so corner content like the plant and mug isn't cut more aggressively than the flat edges).
- No change to `HomeHero.tsx` beyond what's already there (`next/image`, `object-contain`, transparent background) — the container has no background/shadow of its own already, so a transparent PNG is sufficient.
- Verify visually against the live dev server at desktop width, and re-run the existing `HomeHero.test.tsx` suite (no behavioral/DOM change expected, image is swapped in place at the same path).

## Out of scope

- Baking the exact `hero-wash` CSS gradient into the image's interior gaps (between the floating UI cards) — would require true photo segmentation (the interior also contains two white UI cards that a naive near-white color-key would partially and incorrectly re-tint) and would only be pixel-accurate at one specific viewport width. Not pursued given the edge silhouette was the actual problem.
