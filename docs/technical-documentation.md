# Technical Documentation

## Overview

This portfolio is a statically exported Next.js application with a React and
TypeScript codebase. It is organized around a server-rendered page with focused
client-side components only where browser interaction is needed. The goal is to
keep the site polished and responsive while still satisfying the assignment
requirements for API integration, state management, documentation, and
professional quality.

## Source Structure

- `app/layout.tsx` defines metadata, viewport settings, and the default dark theme.
- `app/page.tsx` renders the main page sections: hero, research, GitHub projects, contact, and footer.
- `app/globals.css` contains the responsive layout, metallic grey theme, component styling, and accessibility states.
- `components/ThemeToggle.tsx` handles theme persistence.
- `components/VisitorGreeting.tsx` handles the time-based greeting and saved visitor name.
- `components/GitHubRepos.tsx` fetches and filters GitHub repository data.
- `components/ContactForm.tsx` validates the contact form.
- `components/HeroBeams.tsx` lazy-loads the optional Three.js background.
- `components/Beams.tsx` contains the WebGL beam effect implementation.
- `data/portfolio.ts` stores GitHub account configuration.
- `public/assets/research/` stores the compressed research image used by the site.

## Application Sections

### Hero

The hero introduces the portfolio as an AI/ML and full-stack developer profile.
It uses a centered layout, short professional copy, visitor personalization,
and a call-to-action linking to GitHub projects. The optional beam background is
decorative and is hidden from assistive technology.

### Research

The Research section presents the 2025 Bone Disease Detection / Tumor
Classification research project. It includes a compressed research image,
publication note, and technology tags for PyTorch, computer vision, and
CAM/Grad-CAM style explainability.

### GitHub Projects

The GitHub section fetches repositories from:

- `sbw200kfupm`
- `sbw200`

Each account is requested independently:

```text
https://api.github.com/users/{username}/repos?sort=updated&per_page=12
```

The component merges successful responses, sorts repositories by latest push
date, and keeps up to 24 repositories. Each card displays the account,
language, star count, description, and repository link.

The section includes:

- text search by name or description
- account filter
- language filter
- live count of filtered versus loaded repositories
- graceful empty state when filters match nothing
- graceful partial failure handling if one account cannot be loaded

### Contact

The contact form is client-side only and does not submit to a backend.
Validation rules are intentionally clear:

- name must be at least 2 characters
- email must match a basic email format
- message must be at least 10 characters

The form shows field-level errors, a form-level status message, and focuses the
first invalid field after submission.

## State Management

State is kept in small client components instead of one large page-level client
component.

- `ThemeToggle` stores `portfolio-theme` in `localStorage`.
- `VisitorGreeting` stores `portfolio-visitor-name` in `localStorage`.
- `GitHubRepos` stores loaded repositories, loading status, search query, and filters.
- `ContactForm` stores controlled form fields, validation errors, and submit status.
- `HeroBeams` stores whether the optional background should load.

This structure keeps static content server-rendered and limits hydration to the
interactive parts of the page.

## Error Handling

The GitHub integration uses `Promise.allSettled` so one failed account does not
break the whole section. If both accounts fail or no repositories are returned,
the interface shows a friendly status message instead of leaving the area
blank.

The contact form prevents invalid submission and gives specific feedback near
each invalid field. Browser storage operations are wrapped in `try/catch` so
private browsing or storage restrictions do not crash the app.

## Accessibility

Accessibility considerations include:

- semantic `section`, heading, form, and navigation structure
- skip link for keyboard users
- visible focus styles
- `aria-live` regions for changing GitHub, greeting, filter, and form messages
- labels connected to form fields and filters
- `aria-invalid` on invalid form controls
- decorative background marked with `aria-hidden`
- reduced-motion support for users who prefer less animation

## Responsive Design

The layout uses CSS Grid and flexible containers. Desktop views use multi-column
sections where useful, while tablet and mobile views collapse to a single
column. Controls such as GitHub filters and contact fields expand to full width
on smaller screens.

## Performance Notes

- Static content is rendered by `app/page.tsx` as a server component.
- Only small client components hydrate.
- The research image is compressed and served from `public/assets/research/`.
- Removed unused public placeholder/project images from the active Next app.
- GitHub requests are bounded to 12 repositories per account.
- The Three.js background is loaded only after desktop/motion checks pass, then after idle time and an additional delay.
- The Beams effect is disabled on small screens and for reduced-motion users.
- `NEXT_PUBLIC_ENABLE_BEAMS=false` disables the effect completely for testing or deployment.
- `next.config.mjs` uses `output: "export"` for static hosting.

## CI/CD

The repository includes two workflows:

- `.github/workflows/ci.yml` runs install, typecheck, lint, and build.
- `.github/workflows/deploy-github-pages.yml` builds and deploys the static `out/` directory to GitHub Pages.

The deployment workflow sets `NEXT_PUBLIC_BASE_PATH` to the repository name so
assets work correctly when hosted under a GitHub Pages project path.

## Testing Checklist

Before submission, run:

```bash
npm run check
```

Manual testing checklist:

- load the site in production preview
- verify desktop and mobile layouts
- toggle theme and reload
- save and clear visitor name
- test GitHub loading, search, account filter, and language filter
- test contact form with empty, invalid, and valid values
- test with `NEXT_PUBLIC_ENABLE_BEAMS=false`
- run Lighthouse in incognito using production preview
