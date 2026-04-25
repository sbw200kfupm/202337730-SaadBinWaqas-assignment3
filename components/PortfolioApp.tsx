"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import type { FormEvent } from "react";
import { githubUsername, projects } from "@/data/portfolio";
import type { ProjectFilter, ProjectSort } from "@/data/portfolio";

type Theme = "light" | "dark";
type FormFields = {
  name: string;
  email: string;
  message: string;
};
type FieldErrors = Partial<Record<keyof FormFields, string>>;
type FormStatus = {
  type: "success" | "error";
  message: string;
} | null;
type GitHubRepo = {
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
};

const themeKey = "portfolio-theme";
const visitorNameKey = "portfolio-visitor-name";

const filterLabels: Record<ProjectFilter, string> = {
  all: "all projects",
  frontend: "Front-end projects",
  javascript: "JavaScript projects"
};

const sortLabels: Record<ProjectSort, string> = {
  newest: "newest first",
  oldest: "oldest first",
  title: "title A-Z"
};

const getTimeGreeting = () => {
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 12) {
    return "Good morning!";
  }

  if (hour >= 12 && hour < 18) {
    return "Good afternoon!";
  }

  return "Good evening!";
};

const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export function PortfolioApp() {
  const [theme, setTheme] = useState<Theme>("light");
  const [visitorName, setVisitorName] = useState("");
  const [visitorInput, setVisitorInput] = useState("");
  const [visitorFeedback, setVisitorFeedback] = useState("");
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>("all");
  const [sortOrder, setSortOrder] = useState<ProjectSort>("newest");
  const [repositories, setRepositories] = useState<GitHubRepo[]>([]);
  const [githubStatus, setGithubStatus] = useState("Loading public repository data...");
  const [formFields, setFormFields] = useState<FormFields>({
    name: "",
    email: "",
    message: ""
  });
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formStatus, setFormStatus] = useState<FormStatus>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const messageInputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem(themeKey) === "dark" ? "dark" : "light";
      const savedVisitorName = localStorage.getItem(visitorNameKey) || "";

      setTheme(savedTheme);
      setVisitorName(savedVisitorName);
      setVisitorInput(savedVisitorName);
    } catch (error) {
      console.error("Saved preferences could not be loaded.", error);
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    let ignore = false;

    const loadRepositories = async () => {
      setGithubStatus("Loading GitHub repositories...");

      try {
        const response = await fetch(
          `https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=4`,
          {
            headers: {
              Accept: "application/vnd.github+json"
            }
          }
        );

        if (!response.ok) {
          throw new Error("GitHub data could not be loaded at the moment.");
        }

        const data = (await response.json()) as GitHubRepo[];

        if (ignore) {
          return;
        }

        if (!Array.isArray(data) || data.length === 0) {
          setRepositories([]);
          setGithubStatus("No repositories were found for this account.");
          return;
        }

        const visibleRepos = data.slice(0, 4);
        setRepositories(visibleRepos);
        setGithubStatus(`Loaded ${visibleRepos.length} repositories from GitHub.`);
      } catch (error) {
        console.error("GitHub repositories could not be loaded.", error);

        if (!ignore) {
          setRepositories([]);
          setGithubStatus(
            "Sorry, the GitHub section is unavailable right now. Please try again later."
          );
        }
      }
    };

    loadRepositories();

    return () => {
      ignore = true;
    };
  }, []);

  const greeting = useMemo(() => {
    const baseGreeting = getTimeGreeting();
    return visitorName
      ? `${baseGreeting} Welcome back, ${visitorName}.`
      : `${baseGreeting} Thanks for stopping by.`;
  }, [visitorName]);

  const visibleProjects = useMemo(() => {
    const filteredProjects = projects.filter((project) => {
      return activeFilter === "all" || project.categories.includes(activeFilter);
    });

    return [...filteredProjects].sort((firstProject, secondProject) => {
      if (sortOrder === "oldest") {
        return firstProject.year - secondProject.year;
      }

      if (sortOrder === "title") {
        return firstProject.title.localeCompare(secondProject.title);
      }

      return secondProject.year - firstProject.year;
    });
  }, [activeFilter, sortOrder]);

  const filterFeedback =
    activeFilter === "all"
      ? `Showing all ${visibleProjects.length} projects sorted by ${sortLabels[sortOrder]}.`
      : `Showing ${visibleProjects.length} ${filterLabels[activeFilter]} sorted by ${sortLabels[sortOrder]}.`;

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);

    try {
      localStorage.setItem(themeKey, nextTheme);
    } catch (error) {
      console.error("Theme preference could not be saved.", error);
    }
  };

  const saveVisitorName = () => {
    const enteredName = visitorInput.trim();

    if (enteredName.length < 2) {
      setVisitorFeedback("Please enter at least 2 characters before saving.");
      return;
    }

    setVisitorName(enteredName);

    try {
      localStorage.setItem(visitorNameKey, enteredName);
      setVisitorFeedback("Your name was saved for future visits.");
    } catch (error) {
      console.error("Visitor name could not be saved.", error);
      setVisitorFeedback("Your name could not be saved in this browser.");
    }
  };

  const clearVisitorName = () => {
    setVisitorName("");
    setVisitorInput("");
    setVisitorFeedback("Saved name removed.");

    try {
      localStorage.removeItem(visitorNameKey);
    } catch (error) {
      console.error("Visitor name could not be cleared.", error);
    }
  };

  const updateFormField = (field: keyof FormFields, value: string) => {
    setFormFields((currentFields) => ({
      ...currentFields,
      [field]: value
    }));
    setFieldErrors((currentErrors) => ({
      ...currentErrors,
      [field]: undefined
    }));
    setFormStatus(null);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors: FieldErrors = {};
    const trimmedFields = {
      name: formFields.name.trim(),
      email: formFields.email.trim(),
      message: formFields.message.trim()
    };

    if (trimmedFields.name.length < 2) {
      nextErrors.name = "Please enter your name using at least 2 characters.";
    }

    if (!validateEmail(trimmedFields.email)) {
      nextErrors.email = "Please enter a valid email address, for example you@example.com.";
    }

    if (trimmedFields.message.length < 10) {
      nextErrors.message =
        "Please write a short message with at least 10 characters so I know how to respond.";
    }

    setFieldErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setFormStatus({
        type: "error",
        message: "Please correct the highlighted fields and try again."
      });

      if (nextErrors.name) {
        nameInputRef.current?.focus();
      } else if (nextErrors.email) {
        emailInputRef.current?.focus();
      } else {
        messageInputRef.current?.focus();
      }

      return;
    }

    setFormStatus({
      type: "success",
      message:
        "Thanks for your message. Your form was completed correctly and is ready to be submitted."
    });
    setFormFields({
      name: "",
      email: "",
      message: ""
    });
  };

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <header className="site-header">
        <div className="container header-inner">
          <div className="brand">
            <span className="brand-mark">SBW</span>
            <div>
              <p className="brand-name">Saad Bin Waqas</p>
              <p className="brand-tag">Aspiring Software Developer</p>
            </div>
          </div>
          <div className="header-controls">
            <nav className="site-nav" aria-label="Primary">
              <a href="#about">About</a>
              <a href="#projects">Projects</a>
              <a href="#github">GitHub</a>
              <a href="#contact">Contact</a>
            </nav>
            <button
              className="theme-toggle"
              type="button"
              aria-pressed={theme === "dark"}
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              onClick={toggleTheme}
            >
              <span className="theme-toggle-text">Theme</span>
              <span className="theme-status">{theme === "dark" ? "Dark mode" : "Light mode"}</span>
            </button>
          </div>
        </div>
      </header>

      <main id="main">
        <section id="about" className="section hero">
          <div className="container hero-grid">
            <div>
              <h1>Building useful, user-friendly software.</h1>
              <p>
                I&apos;m Saad, a computer science student focused on turning ideas into clean,
                practical web experiences. I enjoy learning by building, especially projects
                that combine thoughtful design with reliable code.
              </p>
              <p className="greeting" aria-live="polite">
                {greeting}
              </p>
              <div className="hero-actions">
                <a className="btn primary" href="#projects">
                  View Projects
                </a>
                <a className="btn ghost" href="#contact">
                  Contact Me
                </a>
              </div>
              <p className="hero-note">
                Start with the navigation or buttons above, use the Theme button in the header
                to switch the page style, and scroll down to test the interactive sections.
              </p>
              <div className="visitor-panel">
                <h2>Personalize your visit</h2>
                <p className="muted compact-text">
                  Save your name in this browser to show a more personal welcome the next time
                  the page is opened.
                </p>
                <label className="sr-only" htmlFor="visitor-name">
                  Your name
                </label>
                <input
                  id="visitor-name"
                  className="visitor-input"
                  type="text"
                  placeholder="Enter your name"
                  value={visitorInput}
                  onChange={(event) => setVisitorInput(event.target.value)}
                />
                <div className="visitor-actions">
                  <button className="btn primary small-btn" type="button" onClick={saveVisitorName}>
                    Save Name
                  </button>
                  <button className="btn ghost small-btn" type="button" onClick={clearVisitorName}>
                    Clear
                  </button>
                </div>
                <p className="visitor-feedback" aria-live="polite">
                  {visitorFeedback}
                </p>
              </div>
            </div>
            <div className="hero-card">
              <Image
                src="/assets/images/profile-placeholder.svg"
                alt="Profile illustration placeholder"
                width={600}
                height={600}
                priority
              />
              <ul className="quick-list">
                <li>
                  <strong>Focus:</strong> Front-end development
                </li>
                <li>
                  <strong>Interests:</strong> UI design, accessibility
                </li>
                <li>
                  <strong>Tools:</strong> React, Next.js, TypeScript
                </li>
              </ul>
              <div className="guide-card">
                <h2>Quick guide</h2>
                <ul className="guide-list">
                  <li>Use the header links to jump to each section.</li>
                  <li>Press the Theme button to switch between light and dark mode.</li>
                  <li>Use the project filters first, then sort the visible cards.</li>
                  <li>The GitHub section loads public repositories automatically.</li>
                  <li>Submit the contact form to see validation and status feedback.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="projects" className="section projects">
          <div className="container">
            <h2>Projects</h2>
            <p className="muted">
              Choose a filter button to focus on one project type. The status message below
              updates with the number of visible cards, and the sort menu lets you change their
              order.
            </p>
            <p className="section-note">
              A simple way to use this section is to choose a category first and then change the
              sort option if you want a different order.
            </p>
            <div className="project-controls">
              <div className="project-filters" role="group" aria-label="Filter portfolio projects">
                {(["all", "frontend", "javascript"] as ProjectFilter[]).map((filter) => (
                  <button
                    className={`filter-btn${activeFilter === filter ? " active" : ""}`}
                    type="button"
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                  >
                    {filter === "all" ? "All Projects" : filterLabels[filter]}
                  </button>
                ))}
              </div>
              <label className="sort-control" htmlFor="sort-projects">
                Sort by
                <select
                  id="sort-projects"
                  className="select-input"
                  value={sortOrder}
                  onChange={(event) => setSortOrder(event.target.value as ProjectSort)}
                >
                  <option value="newest">Newest first</option>
                  <option value="oldest">Oldest first</option>
                  <option value="title">Title A-Z</option>
                </select>
              </label>
            </div>
            <p className="filter-feedback" aria-live="polite">
              {filterFeedback}
            </p>
            <div className="project-grid">
              {visibleProjects.map((project) => (
                <article className="project-card" key={project.id}>
                  <Image
                    src={project.image}
                    alt={project.imageAlt}
                    width={800}
                    height={520}
                  />
                  <div className="project-body">
                    <h3>{project.title}</h3>
                    <p className="project-meta">
                      {project.year} | {project.meta}
                    </p>
                    <p>{project.summary}</p>
                    <div className="tag-list">
                      {project.tags.map((tag) => (
                        <span className="tag" key={tag}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="github" className="section github-section">
          <div className="container">
            <h2>GitHub Activity</h2>
            <p className="muted">
              This section connects to the public GitHub API to load my repository data.
            </p>
            <p className="section-note">Each card includes a direct link to GitHub for more detail.</p>
            <div className="github-toolbar">
              <p className="small-note">
                GitHub username: <span>{githubUsername}</span>
              </p>
            </div>
            <div className="github-status" role="status" aria-live="polite">
              {githubStatus}
            </div>
            <div className="github-grid">
              {repositories.map((repo) => (
                <article className="repo-card" key={repo.html_url}>
                  <h3>{repo.name}</h3>
                  <div className="repo-meta">
                    <span>Language: {repo.language || "Not specified"}</span>
                    <span>Stars: {repo.stargazers_count}</span>
                  </div>
                  <p>{repo.description || "No description provided."}</p>
                  <a className="repo-link" href={repo.html_url} target="_blank" rel="noreferrer">
                    View repository
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="section contact">
          <div className="container contact-grid">
            <div>
              <h2>Contact</h2>
              <p className="muted">Want to collaborate or share feedback? Send me a quick message.</p>
              <p className="section-note">
                Fill in each field, then submit once. If anything needs to be corrected, the page
                will show both field-level and form-level feedback.
              </p>
              <p className="small-note">Current year: {new Date().getFullYear()}</p>
            </div>
            <form className="contact-form" aria-label="Contact form" noValidate onSubmit={handleSubmit}>
              <p className="form-intro">
                All fields are required. If something is missing or incorrect, an error message
                will appear below that field and a form message will explain the next step.
              </p>
              <div
                className={`form-status${formStatus ? ` is-visible is-${formStatus.type}` : ""}`}
                aria-live="polite"
                role="status"
              >
                {formStatus?.message}
              </div>
              <label htmlFor="name">
                Name
                <input
                  id="name"
                  ref={nameInputRef}
                  type="text"
                  name="name"
                  required
                  placeholder="Your name"
                  aria-describedby="name-hint name-error"
                  aria-invalid={Boolean(fieldErrors.name)}
                  value={formFields.name}
                  onChange={(event) => updateFormField("name", event.target.value)}
                />
              </label>
              <p className="field-hint" id="name-hint">
                Enter at least 2 characters.
              </p>
              <p className="field-error" id="name-error">
                {fieldErrors.name}
              </p>
              <label htmlFor="email">
                Email
                <input
                  id="email"
                  ref={emailInputRef}
                  type="email"
                  name="email"
                  required
                  placeholder="you@example.com"
                  aria-describedby="email-hint email-error"
                  aria-invalid={Boolean(fieldErrors.email)}
                  value={formFields.email}
                  onChange={(event) => updateFormField("email", event.target.value)}
                />
              </label>
              <p className="field-hint" id="email-hint">
                Use a valid format such as you@example.com.
              </p>
              <p className="field-error" id="email-error">
                {fieldErrors.email}
              </p>
              <label htmlFor="message">
                Message
                <textarea
                  id="message"
                  ref={messageInputRef}
                  name="message"
                  rows={5}
                  required
                  placeholder="Write your message..."
                  aria-describedby="message-hint message-error"
                  aria-invalid={Boolean(fieldErrors.message)}
                  value={formFields.message}
                  onChange={(event) => updateFormField("message", event.target.value)}
                />
              </label>
              <p className="field-hint" id="message-hint">
                Write at least 10 characters so the message is clear.
              </p>
              <p className="field-error" id="message-error">
                {fieldErrors.message}
              </p>
              <button className="btn primary" type="submit">
                Send Message
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <p>Portfolio assignment 4 | Built with React, Next.js, and TypeScript</p>
          <a href="#about" className="back-to-top">
            Back to top
          </a>
        </div>
      </footer>
    </>
  );
}
