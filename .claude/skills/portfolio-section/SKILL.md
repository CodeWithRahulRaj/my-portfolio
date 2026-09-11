---
name: portfolio-section
description: Add or change a section, page, project, skill or role in this portfolio without breaking its data-driven architecture. Use when asked to add a page or section, edit portfolio copy, add a project or job, change the navbar, or adjust colours and type. Explains the JSON-first content flow, the design tokens sampled from the Figma mockup, and the conventions every component follows.
---

# Working on a portfolio section

## The one rule

**No copy, URL or list lives in a component.** Everything comes from
`src/data/portfolioData.json`, typed by `src/types/portfolio.ts`, read through
`src/lib/portfolio.ts`. Components are typed presentational functions that take
props. If you are about to type a sentence of prose into JSX, put it in the JSON
instead and pass it down.

## Flow

```
src/data/portfolioData.json   content
  └─ src/types/portfolio.ts   shape it must satisfy
      └─ src/lib/portfolio.ts typed accessor (portfolioData)
          └─ src/app/*/page.tsx        picks the slice a screen needs
              └─ components/sections/* renders one Figma section
                  └─ components/ui/*   Container · Button · SectionHeading · TechIcon
```

`src/app/layout.tsx` owns the shell: fonts, metadata, `Navbar`, `Footer`.

## Adding a page

1. Add the content block to `portfolioData.json` and its interface to `types/portfolio.ts`.
2. Build `src/components/sections/<Name>.tsx` — a typed function component, props only.
3. Add `src/app/<route>/page.tsx` exporting `metadata` and rendering the section.
4. Add the link to `navLinks` in the JSON (the navbar renders whatever is there).
5. `npm run typecheck && npm run lint && npm run build`, then run the `visual-qa` skill.

## Conventions

- **Widths:** `<Container size="default|narrow|form">` (1180 / 920 / 760px). Never
  pass a competing `max-w-*` class — same specificity, unpredictable winner.
- **Headings:** the `.heading` class (Oswald, uppercase, tight) or `<SectionHeading>`.
  One `h1` per page; sections use `h2`.
- **Buttons:** `<Button variant="solid|outline" size="sm|md|lg|block">`. It picks
  `Link` for internal hrefs and a new-tab anchor for `http`/`mailto`.
- **Colours:** only the tokens below — no raw hex in components.
- **Icons:** brand logos via `<TechIcon icon="react" />` (registry in
  `components/ui/TechIcon.tsx`, add new keys there); UI glyphs from `lucide-react`.
- **Images:** `next/image` with explicit `width`/`height`; the export is
  `unoptimized`, so `priority` on anything above the fold.
- **Client components:** only where state is needed (`Navbar`, `ContactForm`).
  The site is `output: 'export'` — no server actions, no API routes.

## Tokens (sampled from the mockup, declared in `src/app/globals.css`)

`brand #4B9DA9` · `brand-dark #3C8794` · `brand-soft #E4F3F6` · `mint #DEF3F4` ·
`nav #ECF7FB` · `band #F5FAFD` · `page #F8FCFD` · `line #DCE9ED` ·
`ink #0B1215` · `muted #5D6E73` · hero gradient `hero-from #CEE5F7` →
`hero-mid #D6EFF3` → `hero-to #CCF0EC`. Type: `font-display` (Oswald),
`font-sans` (Inter) — both declared on `<html>`, which the `@theme` tokens require.

## Fidelity to the mockup

The Figma frames are ~400–515px wide, so their pixel sizes are proportions, not
absolutes; scale them up for desktop. Where the template shows something a static
portfolio cannot do (it had Log in / Sign up buttons), keep the visual treatment
and repoint it at something real — and record the deviation in README.md.
