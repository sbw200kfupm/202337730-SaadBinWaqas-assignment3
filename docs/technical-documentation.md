# Technical Documentation

## Overview

This project is a responsive personal portfolio built with plain HTML, CSS, and
JavaScript. It builds on the previous assignment by adding a small external API
integration, more complex project interaction, and additional browser-based
state management while keeping the code beginner friendly.

## User Experience

The site is designed to be easy to understand on first use. Visitors can move
through the main sections with navigation links, view different project groups,
switch visual theme, load GitHub data, and interact with the contact form
without leaving the page. Small guidance notes are included directly in the
interface so users know what each interactive area does before they start
clicking.

### Navigation

The header contains links to the About, Projects, and Contact sections. When a
user selects one of these links, the page scrolls smoothly to that section.
This helps the experience feel more polished without adding complexity.

The hero section also includes a short note, a quick guide card, and a small
visitor name panel. These give new visitors simple instructions about where to
start, how to switch theme, how to use the project controls, and how to save a
personal welcome for later visits.

### Dark Mode Toggle

A visible theme toggle is placed in the header so users can quickly switch
between light mode and dark mode. The interface also displays the current mode
in the toggle itself, making the feature easy to understand. This reduces
guesswork because the control communicates both its current state and its
purpose.

### Project Interaction

The Projects section includes both filter buttons and a sort menu. Users can
choose:

- All Projects
- Front-end
- JavaScript

Selecting a filter changes which project cards are displayed. A live status
message tells the user how many projects are currently visible. The sort menu
can then reorder the visible cards by newest first, oldest first, or title
order. This creates a slightly more advanced interaction because the interface
responds to more than one user control at the same time. A short note above the
controls explains the recommended order of interaction so the section feels
easier to understand on first use.

### GitHub API Section

The GitHub section loads repository information from the GitHub API
automatically when the page opens. The page displays a short status message
while the request is loading and then shows repository cards when data is
returned successfully.

If the request fails, the page shows a friendly message instead of leaving the
section empty. A short note in the section also tells users that the cards are
loaded automatically and that each card links to the full repository page. This
helps the feature feel more complete and user friendly.

### Contact Form

The contact form provides immediate guidance. If a field is missing or invalid,
the user sees a clear error message near the related field and an overall form
message explaining that corrections are needed. Each field also includes a
small hint before submission so users know the expected format in advance. If
the form is completed correctly, a success message appears on the page. This
reduces trial and error because users are told both what to enter and what to
fix.

## Project Structure

- `index.html` contains the semantic structure, project controls, GitHub
  section, visitor name controls, theme toggle, and contact form feedback
  areas.
- `css/styles.css` contains the layout, theme variables, responsive rules,
  project control styling, GitHub cards, form states, and transitions.
- `js/script.js` contains the greeting logic, GitHub API request, project
  filtering and sorting, visitor state persistence, theme persistence, and form
  validation.
- `assets/images/` stores lightweight SVG images used by the project cards.
- `docs/` contains the supporting assignment documentation.

## Responsive Design Notes

- Desktop layouts use multiple columns for the hero, projects, and contact
  areas.
- Tablet screens switch the hero, project grid, and contact layout into a more
  stacked format at `900px`.
- Mobile screens further simplify the layout at `600px`, stacking action
  buttons and making controls such as the theme toggle and filter buttons full
  width where useful.
- The design uses flexible widths, grid layouts, and scalable typography so the
  page remains readable on smaller screens.

## Features

The main JavaScript features are:

- Time-based greeting in the hero section.
- Automatic year update in the Contact section.
- Smooth scrolling for internal navigation links.
- Project filtering and sorting based on user selections.
- Automatic GitHub repository loading with `fetch`.
- Visitor name saving and clearing.
- Theme toggling with saved preference.
- Contact form validation and feedback messages.

## Technologies Used

- HTML for structure
- CSS for styling, layout, and transitions
- JavaScript for interactivity and dynamic behavior
- Browser localStorage for saving theme preference and visitor name
- GitHub REST API for repository data

### Dynamic Content Feature

The dynamic content requirement is satisfied in two ways. First, JavaScript
updates the project section based on the selected filter and sort order.
Second, the GitHub section fetches external data and creates repository cards
dynamically after the page loads.

## Data Handling: Dark Mode with localStorage

The dark mode feature uses `localStorage` to save the user's selected theme.

Process:

1. When the page loads, JavaScript checks whether a saved theme value exists.
2. If a value is found, that theme is applied immediately.
3. When the user presses the theme toggle button, the interface updates and the
   new preference is stored in `localStorage`.
4. When the page is opened again later, the stored theme is loaded
   automatically.

This is a simple example of client-side data handling because the website saves
and reuses user data inside the browser.

## Additional State Management: Visitor Name

The hero section includes a small visitor name feature. The user can enter a
name, save it in the browser, and see the greeting change to a more personal
message.

Process:

1. The page checks `localStorage` for a saved visitor name on load.
2. If a name is found, the greeting is updated automatically.
3. When the user saves a new name, the value is stored and the greeting updates
   immediately.
4. When the user clears the name, the saved value is removed and the default
   greeting returns.

This shows a second example of application state beyond theme switching.

## API Integration Explanation

The GitHub integration requests repository data directly from:

`https://api.github.com/users/{username}/repos`

Implementation details:

- A small JavaScript constant stores the GitHub username.
- The frontend uses `fetch` to request public repository data directly from the
  GitHub API.
- The request starts automatically when the page loads, so the section shows
  live portfolio-related data without requiring an extra button click.
- A status message is updated before loading, after success, and after failure.
- If the API returns an error or the request is limited, the interface shows a
  clear fallback message.
- The returned JSON data is converted into simple repository cards showing the
  repository name, language, star count, description, and link.

## Form Validation and User Feedback Explanation

The contact form uses JavaScript validation instead of a backend.

Validation rules:

- Name must contain at least 2 characters.
- Email must match a basic email format.
- Message must contain at least 10 characters.

Feedback behavior:

- Short hints under each input explain the expected content before submission.
- Invalid fields receive a clear message below the input.
- Invalid fields also receive an `aria-invalid` state for accessibility.
- A form-level error message explains when the user needs to fix something.
- A success message appears when all fields are valid.
- Focus moves to the first invalid field so the next step is clear.

## Animation and Transition Explanation

Animations and transitions are intentionally subtle:

- Smooth scrolling is used for navigation links.
- Buttons, project cards, and the theme toggle include light hover transitions.
- The page colors transition smoothly when switching between light mode and dark
  mode.
- A reduced motion media query is included so transitions are minimized for
  users who prefer less motion.

## Performance Notes

- Project images are lightweight SVG files.
- Project card images use `loading="lazy"` so they do not all load at once.
- The JavaScript reuses selected DOM elements instead of querying the page
  repeatedly.
- The page avoids large libraries or build tools, which keeps file size small.
- The GitHub request is limited to a small set of repositories so the section
  stays lightweight and loads faster.

## Compatibility Notes

- The project is intended for modern desktop and mobile browsers.
- Core features such as layout, filtering, sorting, theme switching, and form
  validation rely on standard HTML, CSS, and JavaScript features supported by
  current browsers.
- The GitHub section requires internet access because it uses a live external
  API request.
- If the API request is blocked or unavailable, the rest of the portfolio still
  works and the page shows a fallback message in that section.

## Accessibility Notes

- A skip link is available for keyboard users.
- The theme toggle uses `aria-pressed` and an accessible label.
- The filter status and form status use live regions to announce updates.
- Form fields include associated labels and descriptive error message links via
  `aria-describedby`.
- Focus styles are visible on links, buttons, and form controls.
- Images include descriptive `alt` text.

## Testing Notes

Manual testing was carried out by checking:

- navigation links and smooth scrolling
- theme switching and stored preference after reloading the page
- project filter buttons, sort menu, and visible card count
- guidance notes in the hero, projects, GitHub, and contact sections
- visitor name saving and clearing
- GitHub API loading automatically with success and failure handling
- contact form behavior with empty, invalid, and correct input
- responsive layout changes on desktop, tablet, and mobile widths
- general behavior in a modern browser after a fresh page load
- general visual consistency and absence of broken interactions
