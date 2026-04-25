"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

const themeKey = "portfolio-theme";

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem(themeKey);
      const nextTheme = savedTheme === "light" ? "light" : "dark";
      setTheme(nextTheme);
      document.documentElement.setAttribute("data-theme", nextTheme);
    } catch (error) {
      console.error("Saved theme preference could not be loaded.", error);
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);

    try {
      localStorage.setItem(themeKey, nextTheme);
    } catch (error) {
      console.error("Theme preference could not be saved.", error);
    }
  };

  return (
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
  );
}
