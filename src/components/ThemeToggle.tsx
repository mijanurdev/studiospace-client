"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const saved = localStorage.getItem("studiospace-theme") || "light";
    setTheme(saved);
    document.documentElement.setAttribute("data-theme", saved);
  }, []);

  function toggle() {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    localStorage.setItem("studiospace-theme", next);
    document.documentElement.setAttribute("data-theme", next);
  }

  return (
    <button onClick={toggle} className={`btn rounded-xl transition hover:scale-105 ${theme === "light" ? "bg-black text-white" : "bg-white text-black"}`}>
      {theme === "light" ? "Dark" : "Light"}
    </button>
  );
}