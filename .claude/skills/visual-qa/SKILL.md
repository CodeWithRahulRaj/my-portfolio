---
name: visual-qa
description: Verify the portfolio actually renders and behaves correctly using headless Chrome screenshots and CDP interaction tests. Use after any UI change, before reporting work complete, or when asked for a QA pass, a deficiency list, or proof that a page looks right on desktop and mobile. Covers screenshotting routes, detecting horizontal overflow, exercising the mobile menu and contact form, and collecting browser console errors.
---

# Visual + behavioural QA

`npm run build` passing is not evidence the UI is correct. Everything below runs
locally against `npm run dev` — no cloud service, no Playwright install.

## 1. Start (or find) the dev server

```bash
curl -sf -o /dev/null http://localhost:3000 || (cd . && npm run dev &)
```

Next refuses to start a second instance, so reuse the running one. Never leave a
server running that the user did not start — stop only servers you started.

## 2. Screenshot every route, desktop and small

```bash
.claude/skills/visual-qa/scripts/shoot.sh /tmp/qa http://localhost:3000
```

Then **read the PNGs** — an unread screenshot proves nothing. Compare against the
matching frame in `../figmaDesign.png` (see the `figma-assets` skill for crops).

## 3. Drive the page for behaviour

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless \
  --disable-gpu --remote-debugging-port=9333 --user-data-dir=/tmp/cdp-profile about:blank &
sleep 4
node --experimental-websocket .claude/skills/visual-qa/scripts/drive.mjs \
  http://localhost:3000 /tmp/qa
```

Reports, per route: render check, horizontal overflow at 414px, mobile menu
open/close and its links, contact-form validation (empty submit + invalid email),
and any console error, exception or failed request. Clean up afterwards:

```bash
pkill -f "remote-debugging-port=9333"; rm -rf /tmp/cdp-profile
```

## What to check by hand

- **Font loading.** Tailwind v4 `@theme` tokens resolve at `:root`, so
  `next/font` variables must be on `<html>`. On `<body>` they silently fall back
  and every heading renders in the wrong face — the build stays green.
- **Container widths.** Two competing `max-w-*` classes on one element is a
  coin flip; `Container` takes a `size` prop for this reason.
- **Image regions.** Look for mockup text bleeding into a cropped screenshot.
- **Aspect consistency** across a set of cards.
- **LCP images** above the fold need `priority`.

## Reporting

List deficiencies explicitly — file, what is wrong, what it should be — then fix
and re-verify. Say plainly what was checked and what was not.

## Gotchas

- Chrome clamps small window widths on macOS: a `--window-size=414` capture
  renders ~500 wide and *looks* clipped. Use 500 for screenshots and CDP
  `Emulation.setDeviceMetricsOverride` (as `drive.mjs` does) for true phone widths.
- Node 20 needs `--experimental-websocket` for the global `WebSocket`.
- Never submit the contact form for real — it opens a mail client.
- The dark circle in the bottom-left of dev screenshots is the Next.js dev
  indicator, not a layout bug.
