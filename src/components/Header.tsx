"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Sun, Moon, Heart, ChevronDown } from "lucide-react";
import { useAccessibility } from "./AccessibilityContext";
import Logo from "@/components/Logo";

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, toggleTheme } = useAccessibility();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 15) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    // Initialize current state
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Manoj Kumar Pradhan", href: "/founder" },
    {
      name: "Programs",
      href: "/programs",
      subLinks: [
        { name: "Mind Programming Classes", href: "/programs/mind-programming-classes" },
        { name: "Tree Plantation Drives", href: "/programs/plantation-drives" },
        { name: "Mindfulness for Youth", href: "/programs/mindfulness-for-youth" },
        { name: "Green Communities", href: "/programs/green-community-initiative" },
        { name: "Sustainable Agriculture", href: "/programs/sustainable-agriculture" },
      ],
    },
    { name: "Transparency", href: "/transparency" },
    { name: "Gallery", href: "/gallery" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Accessibility Skip Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to main content
      </a>

      <header className={`sticky top-0 z-40 w-full transition-all duration-300 ${isScrolled ? 'pt-2 px-2 sm:px-4' : 'pt-4 px-4 sm:px-6'}`}>
        <div className={`mx-auto flex items-center justify-between transition-all duration-300 border border-border-base bg-bg-base/80 backdrop-blur-md shadow-lg ${
          isScrolled 
            ? "max-w-6xl py-2 px-6 rounded-full bg-bg-base/75 shadow-md border-primary/10" 
            : "max-w-7xl py-3 px-6 sm:px-8 rounded-[2rem] shadow-lg"
        }`}>
          {/* Logo */}
          <Link href="/" className="focus:outline-none flex items-center">
            <Logo className={`transition-all duration-300 ${isScrolled ? 'h-14 w-14 sm:h-16 sm:w-16' : 'h-20 w-20 sm:h-24 sm:w-24'}`} />
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-6" aria-label="Main Navigation">
            {navLinks.map((link) =>
              link.subLinks ? (
                <div key={link.name} className="relative group py-2">
                  <Link
                    href={link.href}
                    className={`flex items-center gap-1 py-1 text-sm font-medium transition-colors hover:text-primary focus:outline-none ${
                      isActive(link.href) ? "text-primary" : "text-txt-muted"
                    }`}
                  >
                    {link.name}
                    <ChevronDown className="h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-180 text-txt-muted/70 group-hover:text-primary" />
                  </Link>
                  <div className="absolute left-1/2 -translate-x-1/2 top-full pt-1.5 z-50 w-52 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-150 transform origin-top scale-95 group-hover:scale-100">
                    <div className="bg-bg-base border border-border-base rounded-2xl shadow-xl py-2 flex flex-col">
                      {link.subLinks.map((sub) => (
                        <Link
                          key={sub.name}
                          href={sub.href}
                          className="px-4 py-2 text-xs font-semibold text-txt-muted hover:text-primary hover:bg-bg-muted transition-colors focus:outline-none first:rounded-t-xl last:rounded-b-xl"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative py-1 text-sm font-medium transition-colors hover:text-primary focus:outline-none ${
                    isActive(link.href) ? "text-primary" : "text-txt-muted"
                  }`}
                >
                  {link.name}
                  {isActive(link.href) && (
                    <span className="absolute bottom-0 left-0 h-0.5 w-full bg-primary rounded-full" />
                  )}
                </Link>
              )
            )}
          </nav>

          {/* Action Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="rounded-lg p-2 text-txt-muted hover:bg-bg-muted hover:text-primary transition-colors focus:outline-none"
              aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
            >
              {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </button>

            {/* Become a Volunteer */}
            <Link
              href="/volunteer"
              className="rounded-xl border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-semibold text-primary transition-all hover:bg-primary/10 hover:border-primary/40 focus:outline-none"
            >
              Volunteer
            </Link>

            {/* Donate Now */}
            <Link
              href="/donate"
              className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2 text-sm font-semibold text-white shadow-md transition-all hover:bg-primary-hover hover:shadow-lg focus:outline-none hover:-translate-y-0.5 active:translate-y-0"
            >
              <Heart className="h-4 w-4 fill-white" />
              Donate
            </Link>
          </div>

          {/* Mobile Actions and Hamburger */}
          <div className="flex lg:hidden items-center gap-3">
            {/* Theme Toggle Mobile */}
            <button
              onClick={toggleTheme}
              className="rounded-lg p-2 text-txt-muted hover:bg-bg-muted transition-colors focus:outline-none"
              aria-label="Toggle theme"
            >
              {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-lg p-2 text-txt-muted hover:bg-bg-muted focus:outline-none"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown (Floats below the rounded navbar card) */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-[calc(100%+0.5rem)] left-4 right-4 z-50 rounded-3xl border border-border-base bg-bg-base/95 backdrop-blur-md p-6 shadow-2xl transition-all duration-200">
            <nav className="flex flex-col gap-3" aria-label="Mobile Navigation">
              {navLinks.map((link) => (
                <div key={link.name} className="flex flex-col gap-1">
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors hover:bg-bg-muted hover:text-primary ${
                      isActive(link.href) ? "bg-primary/10 text-primary" : "text-txt-base"
                    }`}
                  >
                    {link.name}
                  </Link>
                  {link.subLinks && (
                    <div className="pl-6 flex flex-col gap-1 border-l border-border-base ml-4 my-1">
                      {link.subLinks.map((sub) => (
                        <Link
                          key={sub.name}
                          href={sub.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="px-4 py-1.5 text-xs text-txt-muted hover:text-primary hover:bg-bg-muted rounded-md transition-colors font-medium"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <div className="h-px bg-border-base my-2" />

              <Link
                href="/volunteer"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center rounded-xl border border-primary/20 bg-primary/5 py-2.5 text-sm font-semibold text-primary transition-all hover:bg-primary/10"
              >
                Become a Volunteer
              </Link>

              <Link
                href="/donate"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full text-center rounded-xl bg-primary py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-primary-hover"
              >
                <Heart className="h-4 w-4 fill-white" />
                Donate Now
              </Link>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
