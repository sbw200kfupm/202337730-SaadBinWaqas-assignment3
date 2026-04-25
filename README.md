# Assignment 4 - React and Next.js Portfolio

This project modernizes the previous static portfolio into a React, Next.js,
and TypeScript application. The original `index.html`, `css/`, and `js/` files
are kept as a simple legacy reference, while the primary app now lives in the
Next.js `app/`, `components/`, and `data/` folders.

## Project Description

The portfolio includes:

- an About section with a time-based greeting
- project filtering and sorting powered by React state
- a GitHub section that loads public repository data from the GitHub API
- a Contact section with client-side validation and feedback
- a dark mode and light mode toggle saved with `localStorage`
- a visitor name feature saved with `localStorage`
- an optional lazy-loaded Three.js hero background for larger screens
- CI/CD workflows for validation and GitHub Pages deployment

## Modern Stack

- Next.js App Router for the application shell and static export
- React for focused client components and state management
- TypeScript for typed project data, form state, and API response handling
- CSS custom properties for responsive light and dark themes
- Three.js through React Three Fiber for the optional hero background effect
- GitHub Actions for CI and static deployment

## Project Structure

- `app/` - Next.js pages, layout, and global styles
- `components/` - small client components for theme, visitor name, projects,
  GitHub data, contact validation, and the optional Beams background
- `data/portfolio.ts` - typed project data and GitHub username
- `public/assets/images/` - image assets served by Next.js
- `index.html`, `css/`, `js/` - original static version kept for reference
- `docs/` - AI usage report and technical documentation
- `.github/workflows/` - CI and GitHub Pages deployment workflows
- `presentation/` - place final slides and demo video here

## Setup Instructions

1. Install Node.js 22 or newer.
2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open the local URL shown by Next.js, usually `http://localhost:3000`.

## Useful Commands

```bash
npm run dev        # start the local development server
npm run typecheck  # run TypeScript checks
npm run lint       # run Next.js linting
npm run build      # create the static production build in out/
npm run preview    # build and locally serve the static export
npm run check      # typecheck, lint, and build
```

## GitHub API Setup

The GitHub section uses the public GitHub API and does not require a token for
basic public repository data.

To change the displayed account, update `githubUsername` in
`data/portfolio.ts`.

## Hero Background Toggle

The Three.js hero background is lazy-loaded and only runs on larger screens
that allow motion. To disable it without removing code, set:

```bash
NEXT_PUBLIC_ENABLE_BEAMS=false
```

## CI/CD

Two GitHub Actions workflows are included:

- `CI` runs on pushes and pull requests to `main` or `master`. It installs
  dependencies, type checks, lints, and builds the app.
- `Deploy GitHub Pages` builds the static Next.js export and publishes the
  `out/` folder to GitHub Pages.

For GitHub Pages, enable Pages in the repository settings and choose GitHub
Actions as the source.

## AI Usage Summary

AI was used as a support tool for planning the modernization, converting the
static portfolio behavior into React state, and updating documentation. The
suggestions were reviewed and adjusted manually so the final project remains
understandable and aligned with the assignment requirements. Full details are
in `docs/ai-usage-report.md`.
