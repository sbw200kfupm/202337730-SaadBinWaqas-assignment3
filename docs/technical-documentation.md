# Technical Documentation

## Overview

This portfolio is now a React, Next.js, and TypeScript application. It keeps
the behavior from the earlier static assignment but organizes the logic into a
typed component structure that is easier to maintain and deploy.

The old static files remain in the repository as a reference. The primary
application source is:

- `app/layout.tsx` for the page shell and metadata
- `app/page.tsx` for the home route
- `app/globals.css` for global styling and themes
- `components/PortfolioApp.tsx` for interactive UI behavior
- `data/portfolio.ts` for typed project data and configuration

## Main Features

- Time-based greeting in the hero section.
- Visitor name saving and clearing with `localStorage`.
- Light and dark theme toggle with saved preference.
- Project filtering and sorting using React state.
- GitHub repository loading from the public GitHub REST API.
- Contact form validation with field-level and form-level feedback.
- Responsive layout for desktop, tablet, and mobile screens.
- Static export support for GitHub Pages deployment.

## React State Management

The main component uses React state for the active UI values:

- `theme` stores the current light or dark theme.
- `visitorName` and `visitorInput` manage the saved welcome message.
- `activeFilter` and `sortOrder` control the project list.
- `repositories` and `githubStatus` manage API loading state.
- `formFields`, `fieldErrors`, and `formStatus` manage contact form behavior.

Derived values, such as the visible project list and greeting text, are
computed with `useMemo` so the code stays clear and avoids repeated logic.

## Data Handling

Project data is stored in `data/portfolio.ts` instead of being embedded inside
HTML. This keeps the page component smaller and makes each project object
consistent through TypeScript types.

Browser preferences are saved with `localStorage`:

1. When the component loads, it reads saved theme and visitor name values.
2. When the user changes the theme or saves a name, the new value is stored.
3. On the next visit, the saved values are restored automatically.

## API Integration

The GitHub section requests:

`https://api.github.com/users/{username}/repos?sort=updated&per_page=4`

The app shows a loading message, displays repository cards on success, and
shows a friendly fallback message if the request fails or returns no data.
React automatically escapes repository text, which avoids injecting untrusted
HTML into the page.

## Form Validation

The contact form is controlled by React state and validated on submit.

Validation rules:

- Name must contain at least 2 characters.
- Email must match a basic email pattern.
- Message must contain at least 10 characters.

When a field is invalid, the page sets an error message, marks the field with
`aria-invalid`, and moves focus to the first invalid field. A success message
appears when all inputs pass validation.

## Styling and Accessibility

The design uses CSS variables for theme colors and keeps layout rules in
`app/globals.css`. The page includes:

- a skip link for keyboard users
- semantic sections and headings
- accessible labels and live regions for changing status messages
- visible focus styles
- responsive grid layouts
- a reduced-motion media query

## Performance Notes

- SVG assets are lightweight and served from `public/assets/images/`.
- Project images use native lazy loading.
- The project data is static and typed, avoiding unnecessary runtime parsing.
- The GitHub request is limited to four repositories.
- `next.config.mjs` uses `output: "export"` so the built site can be deployed
  as static files.

## CI/CD

The repository includes two GitHub Actions workflows:

- `.github/workflows/ci.yml` installs dependencies, type checks, lints, and
  builds the app on pushes and pull requests.
- `.github/workflows/deploy-github-pages.yml` builds the static export and
  deploys the `out/` directory to GitHub Pages.

The deployment workflow sets `NEXT_PUBLIC_BASE_PATH` to the repository name so
generated links and assets work correctly under a GitHub Pages project path.

## Testing Notes

Recommended checks before submission:

- run `npm run check`
- verify theme switching and reload persistence
- save and clear a visitor name
- test all project filters and sort options
- confirm GitHub repositories load or show a graceful fallback
- submit invalid and valid contact form values
- check desktop and mobile layouts
