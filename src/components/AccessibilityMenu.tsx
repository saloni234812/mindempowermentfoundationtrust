"use client";

import React, { useState } from "react";
import { useAccessibility } from "./AccessibilityContext";
import { Eye, Sun, Moon, Type, X, Settings } from "lucide-react";

export default function AccessibilityMenu() {
  const { theme, contrast, textSize, toggleTheme, toggleContrast, setTextSize } = useAccessibility();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white shadow-lg transition-transform hover:scale-105 hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        aria-label="Open accessibility options"
        aria-expanded={isOpen}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Settings className="h-6 w-6 animate-pulse" />}
      </button>

      {/* Settings Panel */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-72 rounded-xl bg-bg-muted p-4 shadow-xl border border-border-base transition-all duration-200">
          <h2 className="mb-3 font-heading text-lg font-semibold text-txt-base">Accessibility Settings</h2>
          
          <div className="space-y-4">
            {/* Color Mode */}
            <div>
              <span className="block text-sm font-medium text-txt-muted mb-2">Display Theme</span>
              <div className="flex gap-2">
                <button
                  onClick={toggleTheme}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2 text-sm font-medium border border-border-base transition-colors ${
                    theme === "light"
                      ? "bg-primary text-white border-primary"
                      : "bg-bg-base text-txt-base hover:bg-border-base"
                  }`}
                  aria-pressed={theme === "light"}
                >
                  <Sun className="h-4 w-4" /> Light
                </button>
                <button
                  onClick={toggleTheme}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2 text-sm font-medium border border-border-base transition-colors ${
                    theme === "dark"
                      ? "bg-primary text-white border-primary"
                      : "bg-bg-base text-txt-base hover:bg-border-base"
                  }`}
                  aria-pressed={theme === "dark"}
                >
                  <Moon className="h-4 w-4" /> Dark
                </button>
              </div>
            </div>

            {/* Contrast Toggle */}
            <div>
              <span className="block text-sm font-medium text-txt-muted mb-2">Color Contrast</span>
              <button
                onClick={toggleContrast}
                className={`flex w-full items-center justify-center gap-2 rounded-lg py-2 text-sm font-medium border transition-colors ${
                  contrast === "high"
                    ? "bg-primary text-white border-primary"
                    : "bg-bg-base text-txt-base border-border-base hover:bg-border-base"
                }`}
                aria-pressed={contrast === "high"}
              >
                <Eye className="h-4 w-4" />
                {contrast === "high" ? "High Contrast Active" : "Enable High Contrast (WCAG)"}
              </button>
            </div>

            {/* Text Resizing */}
            <div>
              <span className="block text-sm font-medium text-txt-muted mb-2">Text Size Scaling</span>
              <div className="flex gap-2">
                <button
                  onClick={() => setTextSize("normal")}
                  className={`flex flex-1 flex-col items-center justify-center rounded-lg py-1 text-xs border transition-colors ${
                    textSize === "normal"
                      ? "bg-primary text-white border-primary"
                      : "bg-bg-base text-txt-base border-border-base hover:bg-border-base"
                  }`}
                  aria-pressed={textSize === "normal"}
                >
                  <Type className="h-4 w-4 mb-0.5" />
                  <span>Normal (100%)</span>
                </button>
                <button
                  onClick={() => setTextSize("large")}
                  className={`flex flex-1 flex-col items-center justify-center rounded-lg py-1 text-xs border transition-colors ${
                    textSize === "large"
                      ? "bg-primary text-white border-primary"
                      : "bg-bg-base text-txt-base border-border-base hover:bg-border-base"
                  }`}
                  aria-pressed={textSize === "large"}
                >
                  <Type className="h-5 w-5 mb-0.5" />
                  <span>Large (115%)</span>
                </button>
                <button
                  onClick={() => setTextSize("xlarge")}
                  className={`flex flex-1 flex-col items-center justify-center rounded-lg py-1 text-xs border transition-colors ${
                    textSize === "xlarge"
                      ? "bg-primary text-white border-primary"
                      : "bg-bg-base text-txt-base border-border-base hover:bg-border-base"
                  }`}
                  aria-pressed={textSize === "xlarge"}
                >
                  <Type className="h-6 w-6 mb-0.5" />
                  <span>Extra (130%)</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
