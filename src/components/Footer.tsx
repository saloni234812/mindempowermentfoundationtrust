"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Phone, Mail, MapPin, Send, Heart, MessageCircle } from "lucide-react";
import { Facebook, Instagram } from "@/components/ui/BrandIcons";
import { DatabaseService } from "@/lib/supabase";
import Logo from "@/components/Logo";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    try {
      await DatabaseService.submitNewsletter(email);
      setStatus("success");
      setEmail("");
      setTimeout(() => setStatus("idle"), 5000);
    } catch (err) {
      console.error(err);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <footer className="mt-auto border-t border-border-base bg-bg-muted text-txt-base">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Column */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="focus:outline-none flex items-center">
              <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-full bg-white flex items-center justify-center p-3 shadow-md border border-border-base transition-all hover:shadow-lg hover:scale-105">
                <Logo className="h-full w-full" />
              </div>
            </Link>
            <p className="text-sm text-txt-muted leading-relaxed">
              We empower individuals and communities through structured <strong>mind programming classes</strong> and active <strong>tree plantation drives</strong> — building stronger minds and a greener world together.
            </p>
            {/* Certifications Badges */}
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xxs font-medium text-primary border border-primary/20">
                80G & 12A Exempt
              </span>
              <span className="inline-flex items-center rounded-md bg-secondary/10 px-2 py-1 text-xxs font-medium text-secondary border border-secondary/20">
                NITI Aayog Registered
              </span>
              <span className="inline-flex items-center rounded-md bg-accent/10 px-2 py-1 text-xxs font-medium text-accent-hover border border-accent/20">
                CSR-1 Approved
              </span>
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-txt-base mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {[
                { name: "About Us", href: "/about" },
                { name: "Our Programs", href: "/programs" },

                { name: "Transparency Docs", href: "/transparency" },
                { name: "Photo Gallery", href: "/gallery" },
                { name: "Blog & News", href: "/blog" },
                { name: "Contact & Location", href: "/contact" },
                { name: "Become a Volunteer", href: "/volunteer" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-txt-muted hover:text-primary transition-colors focus:outline-none"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details Column */}
          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-txt-base mb-4">
              Contact & Support
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span className="text-sm text-txt-muted">
                  Andharua,
                  Bhubaneswar, Odisha, 751029
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary shrink-0" />
                <a
                  href="tel:+919853087665"
                  className="text-sm text-txt-muted hover:text-primary transition-colors focus:outline-none"
                >
                  +91 98530 87665
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary shrink-0" />
                <a
                  href="mailto:mindempowermentfoundationtrust@gmail.com"
                  className="text-sm text-txt-muted hover:text-primary transition-colors focus:outline-none"
                >
                  mindempowermentfoundationtrust@gmail.com
                </a>
              </li>
            </ul>

            {/* Socials */}
            <div className="flex gap-4 mt-6">
              {[
                { icon: Facebook, href: "https://www.facebook.com/profile.php?id=61590830093894", label: "Facebook" },
                { icon: Instagram, href: "https://www.instagram.com/mindempowermentfoundationtrust/?hl=en", label: "Instagram" },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="rounded-lg bg-bg-base p-2 text-txt-muted hover:bg-primary hover:text-white transition-all shadow-sm focus:outline-none"
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
              {/* WhatsApp Chat Button */}
              <a
                href="https://wa.me/919853087665?text=Hello%20Mind%20Empowerment%20Foundation%20Trust%2C%20I%20would%20like%20to%20know%20more."
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat on WhatsApp"
                className="rounded-lg bg-[#25D366] p-2 text-white hover:bg-[#20BA5A] transition-all shadow-sm focus:outline-none"
              >
                <MessageCircle className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Newsletter Column */}
          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-txt-base mb-4">
              Join Our Newsletter
            </h3>
            <p className="text-sm text-txt-muted mb-4 leading-relaxed">
              Stay updated on our mind training events, plantation drives, and community impact stories.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full rounded-xl bg-bg-base border border-border-base px-4 py-2.5 pr-10 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                  aria-label="Newsletter email address"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-txt-muted hover:text-primary transition-colors focus:outline-none"
                  aria-label="Submit newsletter subscription"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
              {status === "loading" && <p className="text-xs text-txt-muted">Subscribing...</p>}
              {status === "success" && <p className="text-xs text-secondary font-medium">Successfully subscribed!</p>}
              {status === "error" && <p className="text-xs text-red-500">Failed to subscribe. Try again.</p>}
            </form>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-border-base mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-txt-muted">
          <p>© 2026 Mind Empowerment Foundation Trust. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/transparency" className="hover:text-primary focus:outline-none">
              Privacy Policy
            </Link>
            <Link href="/transparency" className="hover:text-primary focus:outline-none">
              Refund Policy
            </Link>
            <Link href="/transparency" className="hover:text-primary focus:outline-none">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
