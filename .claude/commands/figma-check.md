---
description: Compare a route against its frame in figmaDesign.png
argument-hint: <route, e.g. /skills>
allowed-tools: Bash, Read, Glob, Grep, Agent
---

Compare `${ARGUMENTS:-/}` with its frame in `../figmaDesign.png`.

Crop the frame with the `figma-assets` skill and read it; screenshot the live
route with the `visual-qa` skill and read that. Compare structure first (section
order, hierarchy, alignment), then detail (type weight and case, colour roles,
spacing, radii, shadows, image treatment, button emphasis).

The frames are ~400–515px wide mobile-scale artboards — judge proportion, not
absolute pixel sizes.

Output a table (element · design · implementation · verdict) followed by the
three highest-impact fixes with file and class names. Treat deviations already
documented in README.md as intentional. Report only — do not edit.
