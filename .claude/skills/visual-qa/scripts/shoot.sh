#!/usr/bin/env bash
# Screenshot routes of the running dev server with headless Chrome.
#
#   .claude/skills/visual-qa/scripts/shoot.sh <out-dir> [base-url] [route...]
#
# Defaults: base-url http://localhost:3000, all five portfolio routes.
# Each route is captured at desktop (1440) and small (500) width.
#
# NOTE: Chrome clamps very small window widths on macOS, so a 414-wide capture
# renders ~500 wide and looks clipped. Use 500 for the small breakpoint here and
# drive.mjs (which uses Emulation.setDeviceMetricsOverride) for true phone widths.
set -euo pipefail

CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
OUT="${1:?usage: shoot.sh <out-dir> [base-url] [route...]}"
BASE="${2:-http://localhost:3000}"
shift || true; shift || true
ROUTES=("$@")
[ ${#ROUTES[@]} -eq 0 ] && ROUTES=(/ /projects /skills /experience /contact)

[ -x "$CHROME" ] || { echo "Chrome not found at $CHROME"; exit 1; }
curl -sf -o /dev/null "$BASE" || { echo "no dev server at $BASE (npm run dev)"; exit 1; }
mkdir -p "$OUT"

for route in "${ROUTES[@]}"; do
  slug="$(echo "${route#/}" | tr '/' '-')"; slug="${slug:-home}"
  for size in "1440,3400" "500,3400"; do
    width="${size%%,*}"
    "$CHROME" --headless --disable-gpu --hide-scrollbars \
      --force-device-scale-factor=1 --window-size="$size" \
      --virtual-time-budget=9000 \
      --screenshot="$OUT/${slug}-${width}.png" "$BASE$route" 2>/dev/null
    echo "$OUT/${slug}-${width}.png"
  done
done
