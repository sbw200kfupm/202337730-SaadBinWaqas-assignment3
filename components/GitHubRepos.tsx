"use client";

import { useEffect, useState } from "react";
import { githubUsername } from "@/data/portfolio";

type GitHubRepo = {
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
};

export function GitHubRepos() {
  const [repositories, setRepositories] = useState<GitHubRepo[]>([]);
  const [githubStatus, setGithubStatus] = useState("Loading public repository data...");

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

  return (
    <>
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
    </>
  );
}
