---
name: figma-assets
description: Extract images and sample design tokens from the Figma canvas screenshot (../figmaDesign.png) for this portfolio. Use when an asset in public/images must be re-cut, a new crop is needed from the mockup, a colour/measurement has to be read off the design, or an image shows the wrong region (bleeding text, mismatched aspect). macOS-only — uses swiftc + CoreGraphics because this machine has no ImageMagick and no Python PIL.
---

# Figma asset extraction

The design source of truth is a single screenshot, `../figmaDesign.png` (2816x1536),
holding seven frames: Hero, Home, Projects, Skills, Experience, Contact, Mobile View.
There is no live Figma file, so geometry and colour must be sampled from the PNG.

## Regenerate every asset

```bash
./.claude/skills/figma-assets/scripts/extract_assets.sh
```

Writes `public/images/`: `portrait.png`, `avatar.png` and a dark/light pair per
project. Idempotent — safe to re-run after editing the crop rectangles.

## Tools

| Script | Usage | Purpose |
| --- | --- | --- |
| `crop.swift` | `crop in.png x y w h out.png [scale]` | Crop a `CGRect` from the canvas, optionally upscaled (`scale` 2–4 keeps small frames legible) |
| `cutout.swift` | `cutout in.png out.png [tol] [scale]` | Flood-fill the light studio backdrop to transparency, seeded from the image border, so the portrait sits on the CSS gradient |
| `sample_color.swift` | `sample_color in.png x y w h [topN]` | Print the dominant colours in a rectangle as hex + share — how the palette in `globals.css` was derived |

Each is a standalone file; compile before use:

```bash
swiftc -O .claude/skills/figma-assets/scripts/crop.swift -o /tmp/crop
/tmp/crop ../figmaDesign.png 1058 396 150 100 /tmp/out.png 3
```

## Finding a crop rectangle

1. Crop the whole frame at `scale 2.6` and read it — the frames render small.
2. Map what you see back with: `canvas_x = frame_offset_x + displayed_x / scale`.
   The Read tool reports its own display scale; multiply that in too.
3. Crop tight, then **look at the result before saving it to `public/`**. The
   most common mistake is a rectangle a few pixels too high, which drags the
   card's heading into the screenshot.
4. Keep a set (e.g. all project shots) on one aspect ratio so the UI can rely on it.

## Known frame geometry (canvas pixels)

| Region | Rect `x y w h` |
| --- | --- |
| Hero-screen portrait | `155 305 215 275` (then `cutout`) |
| Headshot / OG image | `195 310 140 150` (then `cutout`) |
| Project alpha dark / light | `1058 396 150 100` / `1216 396 150 100` |
| Project beta dark / light | `1058 734 150 100` / `1216 734 150 100` |
| Project gamma dark / light | `1057 1091 150 100` / `1219 1091 150 100` |

## Caveats

- The frames are only ~400–515 canvas px wide, so every asset is low resolution.
  Upscaling adds no detail — treat the mockup's type and spacing as *proportions*
  to scale up for desktop, never as absolute pixel values.
- `cutout.swift` keys only colours connected to the border, so enclosed light
  areas (a white shirt) survive. Raise `tol` if a halo remains, lower it if the
  subject starts eroding.
- Never point `<Image>` at a file you have not looked at.
