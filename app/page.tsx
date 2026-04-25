import Image from "next/image";
import { ContactForm } from "@/components/ContactForm";
import { GitHubRepos } from "@/components/GitHubRepos";
import { HeroBeams } from "@/components/HeroBeams";
import { ProjectExplorer } from "@/components/ProjectExplorer";
import { ThemeToggle } from "@/components/ThemeToggle";
import { VisitorGreeting } from "@/components/VisitorGreeting";
import { githubUsername } from "@/data/portfolio";

export default function Home() {
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
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main id="main">
        <section id="about" className="section hero">
          <HeroBeams />
          <div className="container hero-grid">
            <div>
              <h1>Building useful, user-friendly software.</h1>
              <p>
                I&apos;m Saad, a computer science student focused on turning ideas into clean,
                practical web experiences. I enjoy learning by building, especially projects that
                combine thoughtful design with reliable code.
              </p>
              <VisitorGreeting />
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
              Choose a filter button to focus on one project type. The status message below updates
              with the number of visible cards, and the sort menu lets you change their order.
            </p>
            <p className="section-note">
              A simple way to use this section is to choose a category first and then change the
              sort option if you want a different order.
            </p>
            <ProjectExplorer />
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
            <GitHubRepos />
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
            <ContactForm />
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
