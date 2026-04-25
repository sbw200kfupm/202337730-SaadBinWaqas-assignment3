# AI Usage Report

## Tools Used & Use Cases

I used ChatGPT/Codex as the main AI assistant during this assignment. I did not
use GitHub Copilot, Cursor, Replit AI, Claude, or AWS CodeWhisperer for the
final code in this repository.

ChatGPT/Codex was used for:

- planning how to modernize the earlier portfolio into React, Next.js, and TypeScript
- converting broad assignment requirements into a practical feature list
- splitting the application into server-rendered sections and smaller client components
- reviewing GitHub API logic and error handling
- improving contact form validation and feedback
- setting up CI/CD workflow files
- discussing Lighthouse results and performance tradeoffs
- adding and later optimizing the optional Three.js beam background
- drafting and revising README and technical documentation

## Recommended AI Tools

The assignment listed several possible AI tools. I only used ChatGPT/Codex for
the final submitted work, but these are the tools considered:

- GitHub Copilot: useful for inline code completion, but not used in this final workflow.
- ChatGPT/Codex: used for planning, debugging, refactoring, and documentation support.
- Claude: useful for long-form explanation and review, but not used here.
- Cursor: useful as an AI-powered editor, but not used here.
- Replit AI: useful for browser-based development, but not used here.
- AWS CodeWhisperer: useful for code suggestions in AWS-centered workflows, but not used here.

## How AI Fit Into My Workflow

I treated AI as a planning and review assistant rather than a replacement for
understanding the project. The workflow was usually:

1. Decide what the feature needed to do.
2. Ask for help comparing approaches or identifying possible problems.
3. Implement or revise the code.
4. Run checks such as `npm run typecheck`, `npm run lint`, and production preview testing.
5. Keep, simplify, or remove the change based on whether it actually improved the project.

This was especially useful for the performance work. For example, the Three.js
background looked good visually, but it could hurt Lighthouse scores. AI helped
identify safer loading strategies such as desktop-only rendering, reduced
motion checks, delayed loading, and an environment variable to disable the
effect.

## Concrete Examples

- **React/Next modernization:** AI helped organize the project into `app/`,
  `components/`, `data/`, and `public/` instead of keeping everything in one
  static HTML file.
- **Client component refactor:** After Lighthouse testing, AI helped split the
  original large client component into smaller components for theme, greeting,
  GitHub data, contact form, and the optional background.
- **GitHub API section:** AI helped structure the repository fetch so both
  GitHub accounts are loaded independently and partial failures are handled
  gracefully.
- **Search and filters:** AI helped add client-side search, account filtering,
  language filtering, and an empty state for the GitHub project list.
- **Image optimization:** AI helped move the research image into `public/`,
  compress it, and update the Research section to use the optimized file.
- **Documentation:** AI helped expand short notes into fuller explanations that
  match the final implementation.

## Benefits

Using AI made the assignment easier to manage because it helped break a large
set of requirements into smaller tasks. It was also useful for spotting stale
documentation after features changed. The biggest benefits were:

- faster planning and comparison of implementation options
- clearer separation between static content and interactive React components
- help debugging TypeScript and Next.js issues
- better wording for user-facing validation and status messages
- stronger documentation of setup, testing, AI use, and technical decisions
- performance-focused review after Lighthouse testing

## Challenges

AI suggestions still needed review. Some ideas were too complex for the
assignment scope, especially around visual effects and advanced abstractions.
There were also cases where a suggestion worked technically but did not fit the
desired design or performance target, so it had to be simplified or removed.

The Three.js background was the clearest example. It added visual polish, but
it also affected Lighthouse scores. I tested it, compared results with the
effect disabled, and adjusted the implementation so it loads later and only on
appropriate devices.

Another challenge was documentation tone. AI-generated text can sound too
general, so I edited the report and README to describe the actual project
decisions instead of using generic claims.

## Learning Outcomes

This assignment helped me learn:

- how to structure a Next.js App Router project
- how server components can reduce unnecessary hydration
- how to use focused client components for browser-only state
- how to fetch and merge data from a public API
- how to handle partial API failures with `Promise.allSettled`
- how to validate forms accessibly
- how to use `localStorage` for simple state persistence
- how image size and JavaScript loading affect Lighthouse scores
- how CI/CD workflows can enforce typecheck, lint, and build quality

## Responsible Use & Modifications

I did not copy AI suggestions blindly. I reviewed the code, adjusted names and
structure to match the project, removed features that did not fit, and tested
the result. Examples of responsible modification include:

- removing the local Projects section when GitHub projects became the main project list
- replacing a CSS-only background after deciding it did not look right
- optimizing the Three.js background after performance testing
- compressing the research image before using it in the app
- updating documentation whenever the implementation changed
- keeping the final code small enough to explain and maintain

AI was used as a support tool for learning, planning, debugging, and writing.
The final decisions about scope, design, performance, and documentation were
reviewed and adjusted manually.
