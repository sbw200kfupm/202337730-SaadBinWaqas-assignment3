import { ContactForm } from "@/components/ContactForm";
import { GitHubRepos } from "@/components/GitHubRepos";
import { HeroBeams } from "@/components/HeroBeams";
import { ThemeToggle } from "@/components/ThemeToggle";
import { VisitorGreeting } from "@/components/VisitorGreeting";
import { githubUsernames } from "@/data/portfolio";

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
              <p className="brand-tag">Aspiring Full-Stack Developer</p>
            </div>
          </div>
          <div className="header-controls">
            <nav className="site-nav" aria-label="Primary">
              <a href="#about">About</a>
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
            <div className="hero-content">
              <h1>AI/ML Engineer &amp; Full-Stack Developer</h1>
              <p>
                I build AI systems, from computer vision models to RAG applications, with a focus
                on measurable results and clean engineering.
              </p>
              <VisitorGreeting />
            </div>
          </div>
        </section>

        <section id="github" className="section github-section">
          <div className="container">
            <h2>GitHub Projects</h2>
            <p className="muted">
              This section connects to the public GitHub API to load repository data from both of
              my GitHub accounts.
            </p>
            <p className="section-note">Each card includes a direct link to GitHub for more detail.</p>
            <div className="github-toolbar">
              <p className="small-note">
                GitHub accounts: <span>{githubUsernames.join(", ")}</span>
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
          <p>Built with React, Next.js, and TypeScript</p>
          <a href="#about" className="back-to-top">
            Back to top
          </a>
        </div>
      </footer>
    </>
  );
}
