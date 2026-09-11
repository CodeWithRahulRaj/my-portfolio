@AGENTS.md

# my-portfolio

Static Next.js 16 (App Router, Turbopack, Tailwind v4, `output: 'export'`) portfolio
built to match the mockup at `../figmaDesign.png`. Run everything from
`my-portfolio/` — `npm` from the parent directory picks up an unrelated
`package.json` in the home folder and fails with `Missing script: "dev"`.

## Architecture in one line

`portfolioData.json` → `types/portfolio.ts` → `lib/portfolio.ts` → `app/*/page.tsx`
→ `components/sections/*` → `components/ui/*`, with `app/layout.tsx` owning the
shell (fonts, metadata, `Navbar`, `Footer`).

**No copy, URL or list belongs in a component.** Content goes in
`src/data/portfolioData.json` with its interface in `src/types/portfolio.ts`.

## Screens

`/` Hero + About + Featured Projects + tech strip · `/projects` Featured Works ·
`/skills` · `/experience` · `/contact` form + closing CTA. Each maps to a frame in
`figmaDesign.png`; see README.md for the table and for deliberate deviations.

## Gotchas that have already bitten

- **`next/font` variables must be on `<html>`.** Tailwind v4 `@theme` tokens
  resolve at `:root`; on `<body>` the fonts silently fall back and the build stays green.
- **`<Container size="default|narrow|form">`** — never add a competing `max-w-*`
  class, same specificity means an unpredictable winner.
- **No server code.** Static export: no server actions, no API routes. The contact
  form validates client-side and hands off to `mailto:`.
- **`turbopack.root` is pinned** in `next.config.mjs` because of that stray parent
  lockfile. Leave it.
- **Only design tokens, no raw hex** in components (palette in `globals.css`).
- The design is a screenshot, not a Figma file, and its frames are ~400–515px
  wide: treat their sizes as proportions to scale up, not absolute pixels.

## Before saying work is done

```bash
npm run typecheck && npm run lint && npm run build
```

Then verify in a browser, not just in the terminal — load the `visual-qa` skill,
or run `/qa`. A green build is not evidence the UI is right.

## What is set up for you

| Kind | Name | Use |
| --- | --- | --- |
| Skill | `figma-assets` | crop/cutout/colour-sample from the mockup |
| Skill | `visual-qa` | headless-Chrome screenshots + CDP behaviour tests |
| Skill | `portfolio-section` | add or edit a section, page or content block |
| Agent | `ui-qa` | independent QA pass returning a deficiency list |
| Agent | `figma-fidelity` | compare one route to its design frame |
| Agent | `content-steward` | content edits that respect the JSON-first rule |
| Command | `/qa` `/figma-check` `/assets` | the above, on demand |
