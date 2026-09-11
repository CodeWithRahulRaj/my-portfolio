# Samuel Chen — Portfolio

Static **Next.js 16** (App Router, Turbopack, Tailwind v4) portfolio built to match
the mockup at `../figmaDesign.png`. Exports to plain HTML with
`output: 'export'` — deployable to any static host.

> Run every command from `my-portfolio/`. From the parent directory `npm` walks up
> to an unrelated `package.json` in the home folder and fails with
> `Missing script: "dev"`.

## Screens

Every frame in the Figma canvas maps to a route:

| Figma frame        | Route         | Sections                                             |
| ------------------ | ------------- | ---------------------------------------------------- |
| Hero / Home Screen | `/`           | `Hero` · `AboutMe` · `FeaturedProjects` · `SkillsStrip` |
| Projects Screen    | `/projects`   | `ProjectShowcase`                                    |
| Skills Screen      | `/skills`     | `SkillsGrid`                                         |
| Experience Screen  | `/experience` | `ExperienceTimeline`                                 |
| Contact Screen     | `/contact`    | `ContactForm` · `CollaborateCta`                     |
| Mobile View        | —             | the same routes at mobile breakpoints                |

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
npm run typecheck  # tsc --noEmit
npm run lint       # eslint
npm run build      # static export to ./out
npm run qa         # headless-Chrome screenshots of every route into /tmp/qa
```

## Folder structure

```
my-portfolio/
├── CLAUDE.md                    project brief loaded by Claude Code each session
├── AGENTS.md                    Next.js agent rules (auto-managed by `next dev`)
├── next.config.mjs              static export, unoptimized images, pinned turbopack root
├── docs/
│   └── build-history.md          the commands this project was scaffolded with
├── public/
│   └── images/                   assets extracted from figmaDesign.png
│       ├── portrait.png          hero cutout (transparent background)
│       ├── avatar.png            headshot, also the OG image
│       └── project-{alpha,beta,gamma}-{dark,light}.png
├── src/
│   ├── app/
│   │   ├── layout.tsx            shell: fonts, metadata, Navbar, Footer
│   │   ├── globals.css           Tailwind v4 + design tokens sampled from the mockup
│   │   ├── page.tsx              Home screen
│   │   ├── projects/page.tsx     Featured Works
│   │   ├── skills/page.tsx       Skills
│   │   ├── experience/page.tsx   Experience
│   │   └── contact/page.tsx      Contact form + closing CTA
│   ├── components/
│   │   ├── layout/               Navbar (client, mobile menu) · Footer
│   │   ├── sections/             one component per Figma section
│   │   │   ├── Hero.tsx  AboutMe.tsx  FeaturedProjects.tsx  SkillsStrip.tsx
│   │   │   ├── ProjectShowcase.tsx  SkillsGrid.tsx  ExperienceTimeline.tsx
│   │   │   └── ContactForm.tsx (client) · CollaborateCta.tsx
│   │   └── ui/                   Container · Button · SectionHeading
│   │                             SocialIcons · TechIcon · FigmaMark
│   ├── data/portfolioData.json   all copy, links and lists — the only content source
│   ├── types/portfolio.ts        the shape that JSON must satisfy
│   └── lib/portfolio.ts          typed accessor (`portfolioData`)
└── .claude/                      Claude Code configuration (see below)
    ├── settings.json             permission allowlist for this project
    ├── agents/                   ui-qa · figma-fidelity · content-steward
    ├── commands/                 /qa · /figma-check · /assets
    └── skills/
        ├── figma-assets/         SKILL.md + crop/cutout/sample_color/extract_assets
        ├── visual-qa/            SKILL.md + shoot.sh, drive.mjs
        └── portfolio-section/    SKILL.md — how to add or edit a section
```

## Flow

**Content flows one way.** Nothing is hardcoded in a component:

```
src/data/portfolioData.json          content (copy, links, projects, roles, skills)
        │  validated against
        ▼
src/types/portfolio.ts               interfaces
        │  read through
        ▼
src/lib/portfolio.ts                 export const portfolioData
        │  imported by
        ▼
src/app/<route>/page.tsx             picks the slice this screen needs, sets metadata
        │  props
        ▼
src/components/sections/<Name>.tsx   renders one Figma section
        │  composes
        ▼
src/components/ui/*                  Container · Button · SectionHeading · TechIcon
```

**A request:** `app/layout.tsx` renders `Navbar` + `{children}` + `Footer`; the
route's `page.tsx` pulls its data and renders sections. Everything is prerendered
at build time into `out/` — there is no server at runtime.

**Assets** come out of the mockup, not from a designer hand-off:

```
../figmaDesign.png ──► crop.swift ──► cutout.swift ──► public/images/*.png
   (2816×1536)         CGRect        flood-fill the      referenced from
   7 frames            crop          studio backdrop     portfolioData.json
```

Regenerate with `./.claude/skills/figma-assets/scripts/extract_assets.sh`.

**Verification loop** for any UI change:

```
edit ──► npm run typecheck ──► npm run lint ──► npm run build
                                                     │
                      screenshots (shoot.sh) ◄───────┘
                                │
                      CDP behaviour tests (drive.mjs)
                                │
                      deficiency list ──► fix ──► repeat
```

## Design tokens

Sampled from `figmaDesign.png`, declared once in `src/app/globals.css`. Components
use the token names, never raw hex:

| Token                     | Value                 | Used for                       |
| ------------------------- | --------------------- | ------------------------------ |
| `brand` / `brand-dark`    | `#4B9DA9` / `#3C8794` | buttons, links, timeline rail  |
| `brand-soft` / `mint`     | `#E4F3F6` / `#DEF3F4` | tech strip, skills cards       |
| `nav`                     | `#ECF7FB`             | navbar and footer bands        |
| `band` / `page`           | `#F5FAFD` / `#F8FCFD` | section and page backgrounds   |
| `line`                    | `#DCE9ED`             | hairline borders               |
| `ink` / `muted`           | `#0B1215` / `#5D6E73` | headings / body copy           |
| `hero-from → hero-to`     | `#CEE5F7` → `#CCF0EC` | hero gradient                  |

Type: **Oswald** for the condensed uppercase headings (the `.heading` class) and
**Inter** for body. Both load via `next/font`, with their CSS variables declared on
`<html>` — required for the Tailwind `@theme` tokens to resolve them.

## Editing content

- Change any text, link, project, skill or role in `src/data/portfolioData.json`.
  New fields need a matching interface in `src/types/portfolio.ts`.
- **Add your CV as `public/resume.pdf`** — the navbar `Resume` link points there and
  404s until the file exists. To skip it, repoint `navActions.resume.href` at
  `/experience`.
- Replace `src/components/ui/FigmaMark.tsx` with your own logo mark.
- Re-cut images with `./.claude/skills/figma-assets/scripts/extract_assets.sh`
  (macOS; needs `swiftc` from the Xcode command line tools).

## Claude Code setup

`.claude/` configures the assistants that work on this repo:

| Kind        | Name                | Purpose                                                        |
| ----------- | ------------------- | -------------------------------------------------------------- |
| **Skill**   | `figma-assets`      | Crop, background-cut and colour-sample from the mockup          |
| **Skill**   | `visual-qa`         | Headless-Chrome screenshots + CDP behaviour tests               |
| **Skill**   | `portfolio-section` | How to add or edit a section without breaking the data flow     |
| **Agent**   | `ui-qa`             | Independent QA pass returning a ranked deficiency list          |
| **Agent**   | `figma-fidelity`    | Compare one route against its design frame                      |
| **Agent**   | `content-steward`   | Content edits that respect the JSON-first rule                  |
| **Command** | `/qa`               | Run the whole QA pass and fix what it finds                      |
| **Command** | `/figma-check`      | Design-vs-implementation diff for one route                      |
| **Command** | `/assets`           | Re-extract images from the Figma canvas                          |

`.claude/settings.json` pre-approves the routine commands (build, lint, typecheck,
the asset and QA scripts) and denies `git push` and reading `.env*`.
`CLAUDE.md` carries the project brief and the gotchas worth knowing before editing.

## Notes on fidelity

- The Figma navbar shows `Home · Log in · Sign up`. A static portfolio has nothing
  to authenticate against, so the build keeps the layout and the teal pill but
  points them at real destinations: page links, a `Resume` link and a `Contact`
  pill. Labels and hrefs live in `navLinks` / `navActions`.
- Body copy in the mockup is placeholder text; the real copy lives in the JSON.
- The mockup's frames are ~400–515px wide, so their measurements are proportions
  scaled up for desktop, not absolute pixel values.
- The site is a static export, so a valid contact submission opens the visitor's
  mail client rather than posting to a server.
