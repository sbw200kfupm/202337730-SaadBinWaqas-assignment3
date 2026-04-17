const greetingEl = document.querySelector("#greeting");
const yearEl = document.querySelector("#year");
const themeToggle = document.querySelector("#theme-toggle");
const themeStatus = document.querySelector("#theme-status");
const filterButtons = document.querySelectorAll(".filter-btn");
const sortProjectsSelect = document.querySelector("#sort-projects");
const projectGrid = document.querySelector(".project-grid");
const projectCards = document.querySelectorAll(".project-card");
const filterFeedback = document.querySelector("#filter-feedback");
const visitorNameInput = document.querySelector("#visitor-name");
const saveNameButton = document.querySelector("#save-name");
const clearNameButton = document.querySelector("#clear-name");
const visitorFeedback = document.querySelector("#visitor-feedback");
const githubStatus = document.querySelector("#github-status");
const githubRepoList = document.querySelector("#github-repo-list");
const githubUsernameEl = document.querySelector("#github-username");
const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const messageInput = document.querySelector("#message");

const appState = {
  activeFilter: "all",
  sortOrder: "newest",
  visitorName: "",
};

const GITHUB_USERNAME = "sbw200kfupm";

const getTimeGreeting = () => {
  const hour = new Date().getHours();
  let greeting = "Welcome!";

  if (hour >= 5 && hour < 12) {
    greeting = "Good morning!";
  } else if (hour >= 12 && hour < 18) {
    greeting = "Good afternoon!";
  } else {
    greeting = "Good evening!";
  }

  return greeting;
};

const updateGreeting = () => {
  if (!greetingEl) {
    return;
  }

  const baseGreeting = getTimeGreeting();

  if (appState.visitorName) {
    greetingEl.textContent = `${baseGreeting} Welcome back, ${appState.visitorName}.`;
    return;
  }

  greetingEl.textContent = `${baseGreeting} Thanks for stopping by.`;
};

if (greetingEl) {
  updateGreeting();
}

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// Keep the button text and state in sync with the active theme.
const updateThemeUI = (theme) => {
  if (!themeToggle || !themeStatus) {
    return;
  }

  const isDarkMode = theme === "dark";
  themeToggle.setAttribute("aria-pressed", String(isDarkMode));
  themeStatus.textContent = isDarkMode ? "Dark mode" : "Light mode";
  themeToggle.setAttribute(
    "aria-label",
    isDarkMode ? "Switch to light mode" : "Switch to dark mode"
  );
};

const applyTheme = (theme) => {
  const safeTheme = theme === "dark" ? "dark" : "light";

  document.documentElement.setAttribute("data-theme", safeTheme);
  updateThemeUI(safeTheme);
};

if (themeToggle) {
  let savedTheme = "light";

  // Read the saved theme if the browser allows localStorage access.
  try {
    savedTheme = localStorage.getItem("portfolio-theme") || "light";
    appState.visitorName = localStorage.getItem("portfolio-visitor-name") || "";
  } catch (error) {
    console.error("Saved preferences could not be loaded.", error);
  }

  applyTheme(savedTheme);
  updateGreeting();

  if (visitorNameInput && appState.visitorName) {
    visitorNameInput.value = appState.visitorName;
  }

  themeToggle.addEventListener("click", () => {
    const currentTheme =
      document.documentElement.getAttribute("data-theme") === "dark"
        ? "dark"
        : "light";
    const nextTheme = currentTheme === "dark" ? "light" : "dark";

    applyTheme(nextTheme);

    try {
      localStorage.setItem("portfolio-theme", nextTheme);
    } catch (error) {
      console.error("Theme preference could not be saved.", error);
    }
  });
}

const setVisitorFeedback = (message) => {
  if (visitorFeedback) {
    visitorFeedback.textContent = message;
  }
};

if (saveNameButton && clearNameButton && visitorNameInput) {
  saveNameButton.addEventListener("click", () => {
    const enteredName = visitorNameInput.value.trim();

    if (enteredName.length < 2) {
      setVisitorFeedback("Please enter at least 2 characters before saving.");
      return;
    }

    appState.visitorName = enteredName;
    updateGreeting();

    try {
      localStorage.setItem("portfolio-visitor-name", enteredName);
      setVisitorFeedback("Your name was saved for future visits.");
    } catch (error) {
      console.error("Visitor name could not be saved.", error);
      setVisitorFeedback("Your name could not be saved in this browser.");
    }
  });

  clearNameButton.addEventListener("click", () => {
    appState.visitorName = "";
    visitorNameInput.value = "";
    updateGreeting();

    try {
      localStorage.removeItem("portfolio-visitor-name");
    } catch (error) {
      console.error("Visitor name could not be cleared.", error);
    }

    setVisitorFeedback("Saved name removed.");
  });
}

// Show or hide project cards and then reorder the visible cards.
const updateProjectView = () => {
  if (!projectCards.length || !filterFeedback || !projectGrid) {
    return;
  }

  const filterLabels = {
    all: "all projects",
    frontend: "Front-end projects",
    javascript: "JavaScript projects",
  };
  const sortLabels = {
    newest: "newest first",
    oldest: "oldest first",
    title: "title A-Z",
  };

  const visibleCards = Array.from(projectCards).filter((card) => {
    const categories = (card.dataset.category || "").split(" ");
    const shouldShow =
      appState.activeFilter === "all" ||
      categories.includes(appState.activeFilter);

    card.hidden = !shouldShow;
    return shouldShow;
  });

  visibleCards.sort((firstCard, secondCard) => {
    if (appState.sortOrder === "oldest") {
      return Number(firstCard.dataset.year) - Number(secondCard.dataset.year);
    }

    if (appState.sortOrder === "title") {
      return (firstCard.dataset.title || "").localeCompare(
        secondCard.dataset.title || ""
      );
    }

    return Number(secondCard.dataset.year) - Number(firstCard.dataset.year);
  });

  visibleCards.forEach((card) => {
    projectGrid.appendChild(card);
  });

  const filterLabel = filterLabels[appState.activeFilter] || "projects";
  const sortLabel = sortLabels[appState.sortOrder] || "newest first";
  const filterText =
    appState.activeFilter === "all"
      ? `Showing all ${visibleCards.length} projects`
      : `Showing ${visibleCards.length} ${filterLabel}`;

  filterFeedback.textContent = `${filterText} sorted by ${sortLabel}.`;
};

if (filterButtons.length) {
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((filterButton) => {
        filterButton.classList.remove("active");
      });

      button.classList.add("active");
      appState.activeFilter = button.dataset.filter || "all";
      updateProjectView();
    });
  });
}

if (sortProjectsSelect) {
  sortProjectsSelect.addEventListener("change", () => {
    appState.sortOrder = sortProjectsSelect.value;
    updateProjectView();
  });
}

const setGitHubStatus = (message) => {
  if (githubStatus) {
    githubStatus.textContent = message;
  }
};

const loadGitHubProfile = async () => {
  if (!githubUsernameEl) {
    return;
  }

  githubUsernameEl.textContent = GITHUB_USERNAME;
};

const createRepoCard = (repo) => {
  const language = repo.language || "Not specified";
  const description = repo.description || "No description provided.";

  return `
    <article class="repo-card">
      <h3>${repo.name}</h3>
      <div class="repo-meta">
        <span>Language: ${language}</span>
        <span>Stars: ${repo.stargazers_count}</span>
      </div>
      <p>${description}</p>
      <a class="repo-link" href="${repo.html_url}" target="_blank" rel="noreferrer">
        View repository
      </a>
    </article>
  `;
};

const loadGitHubRepositories = async () => {
  if (!githubRepoList) {
    return;
  }

  setGitHubStatus("Loading GitHub repositories...");
  githubRepoList.innerHTML = "";

  try {
    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=4`,
      {
        headers: {
          Accept: "application/vnd.github+json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("GitHub data could not be loaded at the moment.");
    }

    const repositories = await response.json();

    if (!Array.isArray(repositories) || repositories.length === 0) {
      setGitHubStatus("No repositories were found for this account.");
      return;
    }

    githubRepoList.innerHTML = repositories
      .slice(0, 4)
      .map((repo) => createRepoCard(repo))
      .join("");

    setGitHubStatus(
      `Loaded ${Math.min(repositories.length, 4)} repositories from GitHub.`
    );
  } catch (error) {
    console.error("GitHub repositories could not be loaded.", error);
    setGitHubStatus(
      "Sorry, the GitHub section is unavailable right now. Please try again later."
    );
  }
};

loadGitHubProfile();
loadGitHubRepositories();

// Reuse one message area for both success and error feedback.
const showFormMessage = (message, type) => {
  if (!formStatus) {
    return;
  }

  formStatus.textContent = message;
  formStatus.className = `form-status is-visible is-${type}`;
};

const setFieldError = (input, message) => {
  const errorElement = document.querySelector(`#${input.id}-error`);

  input.setAttribute("aria-invalid", String(Boolean(message)));

  if (errorElement) {
    errorElement.textContent = message;
  }
};

const clearFieldError = (input) => {
  setFieldError(input, "");
};

const clearFormStatus = () => {
  if (!formStatus) {
    return;
  }

  formStatus.className = "form-status";
  formStatus.textContent = "";
};

const validateEmail = (email) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
};

if (contactForm && nameInput && emailInput && messageInput) {
  // Clear feedback while the user is fixing their input.
  [nameInput, emailInput, messageInput].forEach((input) => {
    input.addEventListener("input", () => {
      clearFieldError(input);
      clearFormStatus();
    });
  });

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const nameValue = nameInput.value.trim();
    const emailValue = emailInput.value.trim();
    const messageValue = messageInput.value.trim();
    let isValid = true;

    clearFieldError(nameInput);
    clearFieldError(emailInput);
    clearFieldError(messageInput);

    // Keep the rules simple and clear for a simple form.
    if (nameValue.length < 2) {
      setFieldError(
        nameInput,
        "Please enter your name using at least 2 characters."
      );
      isValid = false;
    }

    if (!validateEmail(emailValue)) {
      setFieldError(
        emailInput,
        "Please enter a valid email address, for example you@example.com."
      );
      isValid = false;
    }

    if (messageValue.length < 10) {
      setFieldError(
        messageInput,
        "Please write a short message with at least 10 characters so I know how to respond."
      );
      isValid = false;
    }

    if (!isValid) {
      showFormMessage(
        "Please correct the highlighted fields and try again.",
        "error"
      );

      // Move focus to the first problem so the next step is obvious.
      const firstInvalidField = contactForm.querySelector('[aria-invalid="true"]');

      if (firstInvalidField) {
        firstInvalidField.focus();
      }

      return;
    }

    showFormMessage(
      "Thanks for your message. Your form was completed correctly and is ready to be submitted.",
      "success"
    );
    contactForm.reset();
  });
}

updateProjectView();

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");
    const targetEl = document.querySelector(targetId);

    if (targetEl) {
      event.preventDefault();
      targetEl.scrollIntoView({ behavior: "smooth" });
    }
  });
});
