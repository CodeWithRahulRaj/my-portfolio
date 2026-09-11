#!/usr/bin/env bash
# Re-extracts every public/images asset from ../figmaDesign.png.
#
#   ./.claude/skills/figma-assets/scripts/extract_assets.sh   (run from my-portfolio/)
#
# crop.swift   in.png x y w h out.png [scale]   – crops a region of the canvas
# cutout.swift in.png out.png [tol] [scale]     – flood-fills the light studio
#                                                 background to transparency
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/../../../.." && pwd)"
FIGMA="$(cd "$ROOT/.." && pwd)/figmaDesign.png"
OUT="$ROOT/public/images"
SCRIPTS="$(cd "$(dirname "$0")" && pwd)"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

command -v swiftc >/dev/null || { echo "swiftc required (Xcode command line tools)"; exit 1; }
[ -f "$FIGMA" ] || { echo "missing $FIGMA"; exit 1; }

swiftc -O "$SCRIPTS/crop.swift" -o "$TMP/crop"
swiftc -O "$SCRIPTS/cutout.swift" -o "$TMP/cutout"
mkdir -p "$OUT"

# Hero portrait + avatar: cut out of the "Hero Screen" frame photo.
"$TMP/crop" "$FIGMA" 155 305 215 275 "$TMP/portrait_src.png" 1
"$TMP/cutout" "$TMP/portrait_src.png" "$OUT/portrait.png" 16 3
"$TMP/crop" "$FIGMA" 195 310 140 150 "$TMP/avatar_src.png" 1
"$TMP/cutout" "$TMP/avatar_src.png" "$OUT/avatar.png" 16 4

# Project screenshots: dark + light pair per card on the "Projects Screen".
"$TMP/crop" "$FIGMA" 1058  396 150 100 "$OUT/project-alpha-dark.png"  3
"$TMP/crop" "$FIGMA" 1216  396 150 100 "$OUT/project-alpha-light.png" 3
"$TMP/crop" "$FIGMA" 1058  734 150 100 "$OUT/project-beta-dark.png"   3
"$TMP/crop" "$FIGMA" 1216  734 150 100 "$OUT/project-beta-light.png"  3
"$TMP/crop" "$FIGMA" 1057 1091 150 100 "$OUT/project-gamma-dark.png"  3
"$TMP/crop" "$FIGMA" 1219 1091 150 100 "$OUT/project-gamma-light.png" 3

echo "assets written to $OUT"
