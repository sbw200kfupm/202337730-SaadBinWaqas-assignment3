export type ProjectCategory = "frontend" | "javascript";
export type ProjectFilter = "all" | ProjectCategory;
export type ProjectSort = "newest" | "oldest" | "title";

export type Project = {
  id: string;
  title: string;
  year: number;
  summary: string;
  meta: string;
  categories: ProjectCategory[];
  tags: string[];
  image: string;
  imageAlt: string;
};

export const githubUsername = "sbw200kfupm";

export const projects: Project[] = [
  {
    id: "study-planner",
    title: "Study Planner",
    year: 2026,
    summary:
      "A simple planner that helps students organize weekly tasks and track deadlines with a clear, minimal layout.",
    meta: "Front-end project",
    categories: ["frontend"],
    tags: ["HTML", "CSS"],
    image: "/assets/images/project-1.svg",
    imageAlt: "Study planner project illustration"
  },
  {
    id: "recipe-finder",
    title: "Recipe Finder",
    year: 2025,
    summary:
      "A responsive concept page that presents recipes with imagery, descriptions, and clear navigation.",
    meta: "Front-end and JavaScript",
    categories: ["frontend", "javascript"],
    tags: ["JavaScript", "Responsive"],
    image: "/assets/images/project-2.svg",
    imageAlt: "Recipe finder project illustration"
  },
  {
    id: "task-progress-tracker",
    title: "Task Progress Tracker",
    year: 2024,
    summary:
      "A small interface concept for tracking completed tasks with simple progress updates and clear visual feedback.",
    meta: "JavaScript project",
    categories: ["javascript"],
    tags: ["JavaScript", "UI Feedback"],
    image: "/assets/images/project-3.svg",
    imageAlt: "Task progress tracker project illustration"
  }
];
