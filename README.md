# Assignment 4 - React and Next.js Portfolio

This is a modern portfolio site for Saad Bin Waqas, built with React, Next.js,
and TypeScript. The app presents an AI/ML and full-stack developer profile,
highlights medical imaging research, loads live GitHub projects from two
accounts, and includes small browser-based interactions such as theme and
visitor-name preferences.

The project started from an earlier static portfolio, but the main submission
is now the Next.js application in `app/`, `components/`, and `data/`.

## Features

- Centered hero section for an AI/ML Engineer and Full-Stack Developer profile.
- Dark theme by default, with a saved light/dark toggle.
- Visitor name personalization stored in `localStorage`.
- Research section for Bone Disease Detection / Tumor Classification work.
- Compressed research image served from `public/assets/research/`.
- GitHub Projects section that loads repositories from `sbw200kfupm` and `sbw200`.
- Search and filters for GitHub repositories by text, account, and language.
- Contact form with client-side validation, field errors, and success/error status.
- Optional lazy-loaded Three.js beam background for larger screens.
- GitHub Actions CI and GitHub Pages deployment workflow.

## Technology Stack

- Next.js App Router
- React
- TypeScript
- CSS custom properties for theming and responsive layout
- React Three Fiber and Three.js for the optional hero background
- GitHub REST API for project data
- GitHub Actions for CI/CD

## Project Structure

- `app/` - Next.js routes, layout, and global CSS.
- `components/` - focused client components for theme, visitor state, GitHub data, contact validation, and the optional Beams background.
- `data/portfolio.ts` - GitHub account configuration.
- `public/assets/research/` - optimized research image used by the Research section.
- `docs/` - AI usage report and technical documentation.
- `.github/workflows/` - CI and GitHub Pages deployment workflows.
- `presentation/` - placeholder folder for slides and demo video.
- `index.html`, `css/`, `js/`, and `assets/` - earlier static version kept as reference material.

## Running Locally

Install Node.js 22 or newer, then run:

```bash
npm install
npm run dev
```

Open the local URL printed by Next.js, usually:

```text
http://localhost:3000
```

## Useful Commands

```bash
npm run dev        # start the development server
npm run typecheck  # run TypeScript checks
npm run lint       # run ESLint
npm run build      # create the static production build in out/
npm run preview    # build and locally serve the static export
npm run check      # typecheck, lint, and build
```

Use `npm run preview` when testing Lighthouse. Development mode is slower and
does not represent production performance.

## Configuration

GitHub accounts are configured in:

```text
data/portfolio.ts
```

The optional Three.js hero background is enabled by default for large screens
that allow motion. It can be disabled without removing code:

```bash
NEXT_PUBLIC_ENABLE_BEAMS=false
```

In PowerShell:

```powershell
$env:NEXT_PUBLIC_ENABLE_BEAMS="false"
npm run build
npm run preview
```

## Image Optimization

The research image is stored as:

```text
public/assets/research/bone-disease-detection-research.jpg
```

It was compressed before being added to the app. For future images, compress
them before placing them in `public/`. WebP or AVIF is preferred for larger
photos, but a small compressed JPEG is acceptable when quality is good and file
size remains low.

## Testing and Quality Checks

Before submission, run:

```bash
npm run check
```

Manual checks performed or recommended:

- desktop and mobile responsive layout
- dark/light theme persistence after reload
- visitor name save and clear behavior
- GitHub API loading, partial failure handling, search, and filters
- contact form validation for empty, invalid, and valid inputs
- Lighthouse check in incognito using `npm run preview`
- reduced-motion behavior for animation-sensitive users

## Deployment

The project is configured for static export with:

```text
next.config.mjs
```

CI runs type checking, linting, and build validation. The GitHub Pages workflow
builds the static `out/` folder and deploys it when the repository is pushed to
`main` or `master`.

Live deployment link: not added yet. Add the final GitHub Pages or Vercel URL
here after deployment.

## AI Usage Summary

ChatGPT/Codex was used as a development assistant for planning, refactoring,
debugging, documentation, performance review, and CI/CD setup. Suggestions were
reviewed and modified before being kept. The full AI usage report is in:

```text
docs/ai-usage-report.md
```
