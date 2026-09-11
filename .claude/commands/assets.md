---
description: Re-extract public/images from the Figma canvas screenshot
argument-hint: [asset name to re-crop]
allowed-tools: Bash, Read, Glob, Grep
---

Regenerate ${ARGUMENTS:-every asset in public/images} from `../figmaDesign.png`.

Load the `figma-assets` skill. For a full refresh run
`./.claude/skills/figma-assets/scripts/extract_assets.sh`. For a single asset,
compile `crop.swift` (and `cutout.swift` for the portrait), find the rectangle
using the frame-geometry table and the mapping method in the skill, and write it.

Before saving anything into `public/`, read the generated PNG and confirm the
region is right — no heading text bleeding in, aspect consistent with its set.
Then verify the pages that use it still look correct.
