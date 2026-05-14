# Home Hero — Orbital Hub-and-Spoke Sketch (Delta)

**Date:** 2026-05-13
**Status:** Approved
**Type:** Delta on [2026-05-13-home-hero-redesign-design.md](./2026-05-13-home-hero-redesign-design.md)
**Scope:** `frontend/src/components/home/SystemArchitectureSketch.tsx` + its test only.
**Out of scope:** `HomeHero.tsx` (left column already tightened and approved), the page register (stays cream `.home2`), any other section.

## Why this delta

The 3-node L-shape inside a wrapping white card read as institutional and "cheap" — the white box around the diagram, the spareness, and the soft monochrome together didn't carry enough weight. The user pointed at a radial hub-and-spoke reference (central engine tile + ~10 colored satellites, the Linear/Lovable AI-architect register) and asked for the same composition on the cream background. This delta replaces only the sketch.

## Design

### Layout — radial composition on cream

- **No outer card.** The composition floats directly on the cream page background. The previous `rounded-2xl bg-white ghair soft-shadow-sm` wrapper is removed.
- **Central engine tile** — large (~168×168), `rounded-2xl`, plum gradient (`var(--plum-deep)` → `var(--plum)`), white `Cpu` icon (28px), white title "Wheelchair Tracking Engine" + smaller white-with-alpha caption "Orchestration core". The tile carries a soft glow (`box-shadow` with plum alpha) so it reads as the focal point.
- **8 satellites** on an invisible elliptical orbit around the center. Each satellite is a small `~108×64` `rounded-xl bg-white ghair soft-shadow-sm` tile holding one colored icon (16px, left), a 2-line stack on the right (title 11.5px ink semibold + caption 9px ink-muted uppercase tracked).
- **Connectors:** 8 thin lines from the center of each satellite to the center of the engine tile, `var(--plum)` at `0.22` opacity, `1px` stroke. No edge labels.
- **One orbit pulse:** a single 3.5px plum dot traveling clockwise around the elliptical orbit path on a `12s` loop using `offsetPath` and the existing `anim-heartbeat` keyframe (which animates `offset-distance 0 → 100%`).

### Satellites — actual healthcare-ops content

Eight nodes, evenly spaced at 45° intervals starting from the top.

| Angle | Title | Caption | Icon | Color |
|---|---|---|---|---|
| 0° (top) | QR Scan | Clinical input | `ScanLine` | `var(--plum)` |
| 45° (upper-right) | Event Stream | Audit log | `Radio` | `var(--amber)` |
| 90° (right) | State Engine | Asset lifecycle | `Database` | `var(--blue)` |
| 135° (lower-right) | Decision Layer | Routing rules | `GitFork` | `var(--green)` |
| 180° (bottom) | Mobile Sync | Offline-tolerant | `Smartphone` | `var(--pink)` |
| 225° (lower-left) | Multi-Site | 4 hospitals | `Network` | `#6366f1` (indigo) |
| 270° (left) | Alerts Bus | Escalation paths | `Bell` | `var(--amber)` |
| 315° (upper-left) | Operations Surface | Dashboard · alerts | `Gauge` | `var(--plum)` |

Indigo `#6366f1` is the one new color — added inline only (no token change) for the Multi-Site satellite. All other colors are existing `.home2` tokens, each carrying a real signal (amber appears twice because event-driven things share that color).

### Idle motion

- `anim-float` on each satellite tile with staggered delays (`i * 0.3s`) and `6 + (i % 2)s` durations. Reuses the same idle rhythm as the systems-page `EngineeringLoop`.
- Central tile has its own slower `anim-float` (8s) so the whole composition breathes together.

### Proof row

A free-floating horizontal row directly under the diagram on cream — no enclosing card:

```
●  Live    ·    4 sites    ·    800+ assets    ·    Microsoft Lists + QR    ·    React    ·    TypeScript
```

- `●` is `var(--green)` 8px.
- Same typographic treatment as before (`text-[11px] uppercase tracking-[0.14em] text-ink-muted`, "Live" group is `text-ink-soft`).
- No `border-t` / no card boundary — it sits as a separator-less metadata row.

## What changes vs. the previous delta

| Aspect | 3-node L-shape (previous) | Orbital hub-and-spoke (this) |
|---|---|---|
| Outer wrapper | `rounded-2xl bg-white ghair soft-shadow-sm` card | None — floats on cream |
| Nodes | 3 small tiles | 1 large engine tile + 8 satellite tiles |
| Layout | Asymmetric L | Radial (elliptical orbit) |
| Color | Monochrome plum + green dot | Plum gradient core + 6 satellite icon colors (each semantic) |
| Animation | One travel pulse along the path | One orbit pulse + per-tile float |
| Proof row | Inside the wrapping card with `border-t` | Free on cream, no border |

## Acceptance criteria

1. The diagram has exactly one center "engine" tile and exactly eight satellite tiles.
2. No outer white card wraps the composition.
3. Each satellite tile shows its icon, title, and caption from the table above.
4. Connectors are thin plum lines at low opacity from each satellite to the engine center.
5. There is exactly one travelling pulse element (`anim-heartbeat`), and zero of: `anim-sonar`, `anim-ack`, `anim-seg-wash`.
6. Proof row contains `Live`, `4 sites`, `800+ assets`, `Microsoft Lists + QR`, `React`, `TypeScript` and is not inside a `border-t` card.
7. All existing `HomeHero.test.tsx` assertions still pass (left column untouched).
8. `npm run lint` and `npm run type-check` pass.

## Files touched

- `frontend/src/components/home/SystemArchitectureSketch.tsx` — rebuilt.
- `frontend/src/components/home/SystemArchitectureSketch.test.tsx` — rewritten.

## Related

- [[homepage-paper-register]] — confirms cream is the chosen register; this honours it.
- Previous spec: [home-hero-redesign-design](./2026-05-13-home-hero-redesign-design.md) — left-column work from that spec stays.
