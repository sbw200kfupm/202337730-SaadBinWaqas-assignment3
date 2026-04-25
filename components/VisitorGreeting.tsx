"use client";

import { useEffect, useState } from "react";

const visitorNameKey = "portfolio-visitor-name";

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

export function VisitorGreeting() {
  const [visitorInput, setVisitorInput] = useState("");
  const [visitorFeedback, setVisitorFeedback] = useState("");
  const [greeting, setGreeting] = useState("Welcome to my portfolio!");

  useEffect(() => {
    try {
      const savedVisitorName = localStorage.getItem(visitorNameKey) || "";
      setVisitorInput(savedVisitorName);
      const baseGreeting = getTimeGreeting();
      setGreeting(
        savedVisitorName
          ? `${baseGreeting} Welcome back, ${savedVisitorName}.`
          : `${baseGreeting} Thanks for stopping by.`
      );
    } catch (error) {
      console.error("Saved visitor name could not be loaded.", error);
    }
  }, []);

  const updateGreeting = (name: string) => {
    const baseGreeting = getTimeGreeting();
    setGreeting(
      name
        ? `${baseGreeting} Welcome back, ${name}.`
        : `${baseGreeting} Thanks for stopping by.`
    );
  };

  const saveVisitorName = () => {
    const enteredName = visitorInput.trim();

    if (enteredName.length < 2) {
      setVisitorFeedback("Please enter at least 2 characters before saving.");
      return;
    }

    updateGreeting(enteredName);

    try {
      localStorage.setItem(visitorNameKey, enteredName);
      setVisitorFeedback("Your name was saved for future visits.");
    } catch (error) {
      console.error("Visitor name could not be saved.", error);
      setVisitorFeedback("Your name could not be saved in this browser.");
    }
  };

  const clearVisitorName = () => {
    setVisitorInput("");
    setVisitorFeedback("Saved name removed.");
    updateGreeting("");

    try {
      localStorage.removeItem(visitorNameKey);
    } catch (error) {
      console.error("Visitor name could not be cleared.", error);
    }
  };

  return (
    <>
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
        Start with the navigation or buttons above, use the Theme button in the header to switch the
        page style, and scroll down to test the interactive sections.
      </p>
      <div className="visitor-panel">
        <h2>Personalize your visit</h2>
        <p className="muted compact-text">
          Save your name in this browser to show a more personal welcome the next time the page is
          opened.
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
    </>
  );
}
