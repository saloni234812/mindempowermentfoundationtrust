"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Theme = "light" | "dark";
type Contrast = "normal" | "high";
type TextSize = "normal" | "large" | "xlarge";

interface AccessibilityContextType {
  theme: Theme;
  contrast: Contrast;
  textSize: TextSize;
  toggleTheme: () => void;
  toggleContrast: () => void;
  setTextSize: (size: TextSize) => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [contrast, setContrast] = useState<Contrast>("normal");
  const [textSize, setTxtSize] = useState<TextSize>("normal");

  // Load preferences from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("a11y-theme") as Theme;
    const savedContrast = localStorage.getItem("a11y-contrast") as Contrast;
    const savedTextSize = localStorage.getItem("a11y-text-size") as TextSize;

    const timer = setTimeout(() => {
      if (savedTheme) setTheme(savedTheme);
      else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        setTheme("dark");
      }

      if (savedContrast) setContrast(savedContrast);
      if (savedTextSize) setTxtSize(savedTextSize);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  // Sync classes to <html> element when state changes
  useEffect(() => {
    const root = document.documentElement;

    // Handle Theme
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    // Handle Contrast
    if (contrast === "high") {
      root.classList.add("high-contrast");
    } else {
      root.classList.remove("high-contrast");
    }

    // Handle Text Size
    root.classList.remove("text-scale-normal", "text-scale-large", "text-scale-xlarge");
    root.classList.add(`text-scale-${textSize}`);

    // Persist
    localStorage.setItem("a11y-theme", theme);
    localStorage.setItem("a11y-contrast", contrast);
    localStorage.setItem("a11y-text-size", textSize);
  }, [theme, contrast, textSize]);

  const toggleTheme = () => setTheme((prev) => (prev === "light" ? "dark" : "light"));
  const toggleContrast = () => setContrast((prev) => (prev === "normal" ? "high" : "normal"));
  const setTextSize = (size: TextSize) => setTxtSize(size);

  return (
    <AccessibilityContext.Provider
      value={{
        theme,
        contrast,
        textSize,
        toggleTheme,
        toggleContrast,
        setTextSize,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error("useAccessibility must be used within an AccessibilityProvider");
  }
  return context;
}
