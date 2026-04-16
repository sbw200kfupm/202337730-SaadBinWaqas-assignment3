# Assignment 3 - Advanced Portfolio Functionality

This project is a beginner friendly personal portfolio website built with plain
HTML, CSS, and JavaScript. It builds on the earlier portfolio work and adds a
small GitHub API integration, more advanced project controls, and extra state
management while keeping the project simple and easy to understand.

## Project Description

The portfolio includes:

- an About section with a time based greeting
- a Projects section with project filtering and sorting
- a GitHub section that loads repository data from the GitHub API
- a Contact section with client side validation and feedback
- a dark mode and light mode toggle that remembers the user's preference with local storage
- a visitor name feature that saves a custom welcome in the browser

## Interactive Features

- Live project filtering and sorting in the Projects section
- GitHub repository loading using the GitHub API
- Dark mode and light mode toggle with saved preference using `localStorage`
- Visitor name saving with `localStorage`
- Smooth scrolling navigation for internal page links
- Hover and theme transitions for a smoother interface
- JavaScript form validation with friendly error messages and a success message
- Short on-page guidance so users know how to use the toggle, filters, and form

## Project Structure

- `README.md` - project overview and setup steps
- `index.html` - main page structure and semantic content
- `css/styles.css` - styling, responsive layout, and transitions
- `js/script.js` - JavaScript interactions and validation logic
- `assets/images/` - portfolio placeholder images
- `docs/ai-usage-report.md` - detailed AI usage reflection
- `docs/technical-documentation.md` - technical explanation of the project

## Setup Instructions

1. Clone or download this repository.
2. Open `index.html` in any modern browser.
3. Test the site by:
   - switching between dark mode and light mode
   - filtering and sorting projects
   - loading GitHub repositories
   - saving and clearing a visitor name
   - resizing the browser window
   - submitting the contact form with valid and invalid input

The page includes small guidance notes to help first-time users understand how
to interact with the main controls without needing external instructions.

No build tools, package managers, or external dependencies are required.

## GitHub API Setup

The GitHub section is prepared with a placeholder configuration in
`js/script.js`.

1. Open `js/script.js`.
2. Find the `GITHUB_CONFIG` object.
3. Replace the placeholder username and token with your own values when ready.

The current version includes error handling so the page shows a friendly
message if the API request fails.

## AI Usage Summary

AI was used as a support tool for planning the Assignment 3 additions,
refining JavaScript logic, and improving documentation. The suggestions were
reviewed, simplified, and adjusted manually so the final result stayed
appropriate for the assignment scope. Full details are in
`docs/ai-usage-report.md`.

## Deployment

If needed later, this project can be hosted on a static hosting platform such as GitHub Pages or on Vercel. 
