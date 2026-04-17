# AI Usage Report

## Tools Used & Use Cases

- ChatGPT (Codex)
  - Reviewed the Assignment 2 portfolio before changes were made.
  - Suggested a simple Assignment 3 feature set that stayed within plain HTML,
    CSS, and JavaScript and matched the expected level of the course.
  - Helped refine the JavaScript logic for project filtering and sorting,
    visitor state saving, GitHub API loading, and form validation.
  - Assisted with updating the README, technical documentation, and this report
    so the written explanation matched the actual implementation.

The tool was mainly used for three kinds of work: planning what features would
best satisfy the rubric, reviewing or refining JavaScript logic, and improving
written explanations so they were more complete and easier to follow.

## Use Cases

AI support was used in a limited and supervised way for the following tasks:

- identifying how to extend the previous portfolio without changing the basic
  structure too much
- selecting an API feature that fit naturally into a portfolio website
- planning project controls that combine filtering and sorting
- improving user feedback in the GitHub section, project controls, and contact
  form
- checking that the documentation clearly explains the implemented features and
  AI use

In practice, AI was mainly used as a planning and revision assistant. It helped
break the assignment into manageable parts, suggest wording for feedback
messages, and point out areas where the site could communicate more clearly
with users while still staying simple.

The most useful part of that support was not automatic code generation by
itself, but the ability to compare multiple possible approaches quickly. For
example, AI was useful when deciding whether the GitHub feature should use a
manual load action or a simpler automatic request, and when deciding how much
written guidance should appear directly on the page without making the design
feel crowded.

## How AI Was Used During Development

The use of AI followed a simple pattern:

1. I first built or reviewed the feature manually so I understood what the page
   needed to do.
2. I then used AI to suggest ways to improve the structure, wording, or logic.
3. After that, I selected only the ideas that matched the assignment scope and
   rewrote or simplified them where needed.
4. Finally, I tested the result in the browser and adjusted the code manually.

This process was important because the first suggestion is not always the best
fit for a beginner project. Some ideas were useful only after they were reduced
to a simpler version.

## Concrete Examples

- For the project section, AI helped suggest a clearer way to combine category
  filtering with sorting options and update the feedback text for the user.
- For the GitHub section, AI helped outline a simple `fetch` based request
  using the public API and basic error handling for failed API calls.
- For state management, AI helped plan a small visitor name feature that stores
  a value in `localStorage` and updates the greeting on later visits.
- For the contact form, AI helped improve both the validation rules and the
  wording of error messages so they sounded more helpful and specific.
- For documentation, AI helped expand short notes into full explanations of how
  each feature works and why it was included.

These examples were still adjusted manually. In several cases, the first AI
suggestion was shortened, renamed, or simplified so it matched the style of the
existing portfolio and remained easy to explain.

## How Suggestions Were Evaluated

AI suggestions were not accepted one by one without review. I compared them
against three checks before keeping them:

1. The feature had to match a clear Assignment 3 requirement.
2. The code had to stay understandable enough that I could explain it myself.
3. The wording had to sound natural for a student portfolio rather than overly
   formal or generic.

This filtering step was important because some suggestions were technically
correct but still not a good fit for the assignment scope or tone.

## Benefits & Challenges

### Benefits

Using AI tools helped speed up development while keeping the project within the
scope of a university assignment.

Some specific benefits included:

- **Faster planning:** AI helped turn the rubric into a small list of features
  that could be implemented cleanly in a static website.
- **JavaScript guidance:** AI suggested a practical structure for event
  listeners, `fetch` logic, state storage, and validation logic, which reduced
  trial and error.
- **Improved wording:** AI helped rewrite user-facing instructions and
  documentation so they were clearer and easier to follow.
- **Documentation support:** AI helped expand the written explanations so the
  documentation better matches the implemented code and assignment rubric.
- **Consistency checks:** AI assistance helped keep the code, behavior, and
  written documentation aligned.
- **Decision support:** AI made it easier to compare simple alternatives, such
  as automatic GitHub loading versus a manual button, before choosing the
  version that fit the assignment better.

Overall, AI acted as a support tool for planning, drafting, and reviewing
implementation ideas.

### Challenges

Although AI was helpful, some challenges occurred during the process:

- **Overly advanced ideas:** AI can suggest features that are unnecessary for a
  beginner course project. These suggestions had to be simplified.
- **Need for review:** Generated code still required manual inspection to
  confirm that it matched the rubric and remained understandable.
- **Context awareness:** AI suggestions had to be adapted to fit the existing
  portfolio instead of replacing it with a new design.
- **Tone and realism:** Some wording initially sounded too formal or too
  generic, so it had to be rewritten to sound more natural for a student
  assignment.
- **API details:** AI suggestions for API integration still had to be checked
  so the request structure and error handling made sense for a small static
  project.
- **Learning responsibility:** It was important to understand why each change
  was made instead of accepting code without review.

These challenges reinforced the importance of treating AI as a support tool
rather than a replacement for learning.

## Learning Outcomes

- Improved understanding of how dynamic content can be added with simple DOM
  manipulation.
- Reinforced how browser storage such as `localStorage` can be used for data
  handling in a static website.
- Gained more practice using `fetch` to request and display external API data.
- Improved confidence in writing client-side form validation and feedback
  messages.
- Strengthened the ability to compare AI suggestions against assignment
  requirements and simplify them when needed.
- Practiced documenting both technical decisions and responsible AI use.

These outcomes were useful because they connected the code itself with the
reasoning behind the implementation choices, which made the final project
easier to explain and defend.

## Responsible Use & Modifications

- AI suggestions were reviewed before use rather than copied directly into the
  project.
- The final implementation was simplified to remain appropriate for a simple assignment.
- Suggested code and wording were modified to match the existing project
  structure and naming style.
- Several explanations and interface messages were rewritten manually so they
  would sound clearer and fit the assignment naturally.
- API related suggestions were kept basic, using public repository data and
  simple error handling instead of a more complex setup.
- The final result was checked to ensure the student can explain the HTML, CSS,
  and JavaScript used.
- AI was used to support learning, planning, and editing, not to avoid
  understanding the work.

In other words, AI was most useful when treated like a drafting and review
assistant. The final choices about layout, copy, interaction flow, and feature
scope still required manual judgment.

Overall, AI tools were used as a productivity and learning aid rather than a
replacement for understanding the code. The final portfolio still depended on
manual decisions about scope, wording, layout, and testing.
