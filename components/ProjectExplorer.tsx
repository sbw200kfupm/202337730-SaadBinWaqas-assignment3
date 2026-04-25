"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { projects } from "@/data/portfolio";
import type { ProjectFilter, ProjectSort } from "@/data/portfolio";

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

export function ProjectExplorer() {
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>("all");
  const [sortOrder, setSortOrder] = useState<ProjectSort>("newest");

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

  return (
    <>
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
            <Image src={project.image} alt={project.imageAlt} width={800} height={520} />
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
    </>
  );
}
