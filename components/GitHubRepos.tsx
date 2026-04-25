"use client";

import { useEffect, useMemo, useState } from "react";
import { githubUsernames } from "@/data/portfolio";

type GitHubRepo = {
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  pushed_at: string | null;
  owner: {
    login: string;
  };
};

export function GitHubRepos() {
  const [repositories, setRepositories] = useState<GitHubRepo[]>([]);
  const [githubStatus, setGithubStatus] = useState("Loading public repository data...");
  const [searchQuery, setSearchQuery] = useState("");
  const [accountFilter, setAccountFilter] = useState("all");
  const [languageFilter, setLanguageFilter] = useState("all");

  const languages = useMemo(() => {
    return repositories
      .map((repo) => repo.language || "Not specified")
      .filter((language, index, allLanguages) => allLanguages.indexOf(language) === index)
      .sort((firstLanguage, secondLanguage) => firstLanguage.localeCompare(secondLanguage));
  }, [repositories]);

  const filteredRepositories = useMemo(() => {
    const normalizedSearch = searchQuery.trim().toLowerCase();

    return repositories.filter((repo) => {
      const repoLanguage = repo.language || "Not specified";
      const matchesAccount = accountFilter === "all" || repo.owner.login === accountFilter;
      const matchesLanguage = languageFilter === "all" || repoLanguage === languageFilter;
      const matchesSearch =
        normalizedSearch.length === 0 ||
        repo.name.toLowerCase().includes(normalizedSearch) ||
        (repo.description || "").toLowerCase().includes(normalizedSearch);

      return matchesAccount && matchesLanguage && matchesSearch;
    });
  }, [accountFilter, languageFilter, repositories, searchQuery]);

  useEffect(() => {
    let ignore = false;

    const loadRepositories = async () => {
      setGithubStatus("Loading GitHub repositories...");

      try {
        // Keep each account independent so one failed GitHub request does not hide all projects.
        const results = await Promise.allSettled(
          githubUsernames.map(async (username) => {
            const response = await fetch(
              `https://api.github.com/users/${username}/repos?sort=updated&per_page=12`,
              {
                headers: {
                  Accept: "application/vnd.github+json"
                }
              }
            );

            if (!response.ok) {
              throw new Error(`GitHub data for ${username} could not be loaded.`);
            }

            return (await response.json()) as GitHubRepo[];
          })
        );

        if (ignore) {
          return;
        }

        const loadedRepos = results.flatMap((result) =>
          result.status === "fulfilled" && Array.isArray(result.value) ? result.value : []
        );
        const failedAccountCount = results.filter((result) => result.status === "rejected").length;

        if (loadedRepos.length === 0) {
          setRepositories([]);
          setGithubStatus("No repositories were found for these accounts.");
          return;
        }

        const visibleRepos = loadedRepos
          .sort((firstRepo, secondRepo) => {
            const firstDate = firstRepo.pushed_at ? Date.parse(firstRepo.pushed_at) : 0;
            const secondDate = secondRepo.pushed_at ? Date.parse(secondRepo.pushed_at) : 0;
            return secondDate - firstDate;
          })
          .slice(0, 24);
        setRepositories(visibleRepos);

        if (failedAccountCount > 0) {
          setGithubStatus(`Loaded ${visibleRepos.length} repositories. Some accounts are unavailable.`);
          return;
        }

        setGithubStatus(
          `Loaded ${visibleRepos.length} repositories from ${githubUsernames.length} GitHub accounts.`
        );
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
      <div className="github-controls">
        <label className="github-search" htmlFor="github-search">
          Search repositories
          <input
            id="github-search"
            className="search-input"
            type="search"
            placeholder="Search by name or description"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
          />
        </label>
        <label className="github-filter" htmlFor="github-account-filter">
          Account
          <select
            id="github-account-filter"
            className="select-input"
            value={accountFilter}
            onChange={(event) => setAccountFilter(event.target.value)}
          >
            <option value="all">All accounts</option>
            {githubUsernames.map((username) => (
              <option value={username} key={username}>
                {username}
              </option>
            ))}
          </select>
        </label>
        <label className="github-filter" htmlFor="github-language-filter">
          Language
          <select
            id="github-language-filter"
            className="select-input"
            value={languageFilter}
            onChange={(event) => setLanguageFilter(event.target.value)}
          >
            <option value="all">All languages</option>
            {languages.map((language) => (
              <option value={language} key={language}>
                {language}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="github-status" role="status" aria-live="polite">
        {githubStatus}
      </div>
      <p className="filter-feedback" aria-live="polite">
        Showing {filteredRepositories.length} of {repositories.length} loaded repositories.
      </p>
      {repositories.length > 0 && filteredRepositories.length === 0 ? (
        <p className="filter-empty" role="status">
          No repositories match the current search and filters.
        </p>
      ) : null}
      <div className="github-grid">
        {filteredRepositories.map((repo) => (
          <article className="repo-card" key={repo.html_url}>
            <h3>{repo.name}</h3>
            <div className="repo-meta">
              <span>Account: {repo.owner.login}</span>
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
