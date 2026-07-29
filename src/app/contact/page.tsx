"use client";

import React, { useState, useTransition, Suspense } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AccessibilityMenu from "@/components/AccessibilityMenu";
import { DatabaseService } from "@/lib/supabase";
import { Phone, Mail, MapPin, MessageSquare, Send, CheckCircle2 } from "lucide-react";
import { useSearchParams } from "next/navigation";

function ContactContent() {
  const searchParams = useSearchParams();
  const defaultSubject = searchParams.get("subject") || "";

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: defaultSubject,
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [isPending, startTransition] = useTransition();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("idle");
    
    startTransition(async () => {
      try {
        const res = await DatabaseService.submitContact(form);
        if (res.success) {
          setStatus("success");
          setForm({ name: "", email: "", phone: "", subject: "", message: "" });
        } else {
          setStatus("error");
        }
      } catch (err) {
        console.error(err);
        setStatus("error");
      }
    });
  };

  const whatsappLink = `https://wa.me/919853087665?text=${encodeURIComponent(
    "Hello Mind Empowerment Foundation Trust, I would like to support your outreach programs."
  )}`;

  return (
    <>
      <Header />
      
      <main id="main-content" className="flex-grow bg-bg-base py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h1 className="font-heading text-4xl font-bold tracking-tight text-txt-base">
              Get in Touch
            </h1>
            <p className="text-sm text-txt-muted leading-relaxed">
              Have questions about our transparency audits, need counseling services, or want to partner on a CSR initiative? Reach out to us directly.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Form Column */}
            <div className="lg:col-span-7 bg-bg-muted border border-border-base rounded-3xl p-6 md:p-8 shadow-sm">
              <h2 className="font-heading text-xl font-bold text-txt-base mb-6">
                Send Us a Message
              </h2>

              {status === "success" ? (
                <div className="rounded-2xl bg-secondary/10 border border-secondary/20 p-6 flex flex-col items-center text-center space-y-3">
                  <CheckCircle2 className="h-10 w-10 text-secondary" />
                  <h3 className="font-heading text-base font-bold text-txt-base">Message Received!</h3>
                  <p className="text-xs text-txt-muted">
                    Thank you for reaching out. A trust representative will review your message and get back to you shortly.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-white hover:bg-primary-hover transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label htmlFor="name" className="text-xxs font-bold uppercase tracking-wider text-txt-muted">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        required
                        value={form.name}
                        onChange={handleChange}
                        className="w-full rounded-xl bg-bg-base border border-border-base px-4 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-primary text-txt-base"
                      />
                    </div>
                    <div className="space-y-1">
                      <label htmlFor="email" className="text-xxs font-bold uppercase tracking-wider text-txt-muted">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        className="w-full rounded-xl bg-bg-base border border-border-base px-4 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-primary text-txt-base"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label htmlFor="phone" className="text-xxs font-bold uppercase tracking-wider text-txt-muted">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        id="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="e.g. +91 98765 43210"
                        className="w-full rounded-xl bg-bg-base border border-border-base px-4 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-primary text-txt-base"
                      />
                    </div>
                    <div className="space-y-1">
                      <label htmlFor="subject" className="text-xxs font-bold uppercase tracking-wider text-txt-muted">
                        Subject *
                      </label>
                      <input
                        type="text"
                        name="subject"
                        id="subject"
                        required
                        value={form.subject}
                        onChange={handleChange}
                        className="w-full rounded-xl bg-bg-base border border-border-base px-4 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-primary text-txt-base"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="message" className="text-xxs font-bold uppercase tracking-wider text-txt-muted">
                      Your Message *
                    </label>
                    <textarea
                      name="message"
                      id="message"
                      rows={5}
                      required
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Detail your inquiry..."
                      className="w-full rounded-xl bg-bg-base border border-border-base px-4 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-primary text-txt-base"
                    />
                  </div>

                  {status === "error" && (
                    <p className="text-xs text-red-500 font-medium">Failed to submit message. Please check connection.</p>
                  )}

                  <button
                    type="submit"
                    disabled={isPending}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary py-3 text-xs font-semibold text-white shadow-md hover:bg-primary-hover transition-all focus:outline-none disabled:opacity-50"
                  >
                    <Send className="h-4 w-4" /> {isPending ? "Submitting..." : "Send Message"}
                  </button>
                </form>
              )}
            </div>

            {/* Coordinates Column */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-bg-muted border border-border-base rounded-3xl p-6 md:p-8 space-y-6 shadow-sm">
                <h2 className="font-heading text-xl font-bold text-txt-base">
                  Contact Coordinates
                </h2>

                <ul className="space-y-4">
                  <li className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary shrink-0">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-txt-base">Registered Office Address</h4>
                      <p className="text-xs text-txt-muted leading-relaxed mt-1">
                        Andharua, <br />
                        Bhubaneswar, Odisha, 751029
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary shrink-0">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-txt-base">Phone Call Support</h4>
                      <p className="text-xs text-txt-muted leading-relaxed mt-0.5">
                        <a href="tel:+919853087665" className="hover:underline">+91 98530 87665</a> <br />
                        <span className="text-xxs opacity-80">(Mon - Sat, 09:00 AM - 06:00 PM)</span>
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary shrink-0">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-txt-base">Email Inquiry</h4>
                      <p className="text-xs text-txt-muted leading-relaxed mt-0.5">
                        <a href="mailto:mindempowermentfoundationtrust@gmail.com" className="hover:underline">mindempowermentfoundationtrust@gmail.com</a>
                      </p>
                    </div>
                  </li>
                </ul>

                {/* Instant WhatsApp link */}
                <div className="pt-4 border-t border-border-base">
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-xl bg-[#25D366] hover:bg-[#20BA5A] py-3 text-xs font-semibold text-white shadow-md transition-all focus:outline-none hover:-translate-y-0.5"
                  >
                    <MessageSquare className="h-4 w-4 fill-white" />
                    Chat instantly on WhatsApp
                  </a>
                </div>
              </div>

              {/* Styled Mock Map Container */}
              <div className="rounded-3xl border border-border-base overflow-hidden aspect-video bg-bg-muted relative shadow-sm">
                {/* Styled Vector Map background */}
                <div className="absolute inset-0 bg-radial-at-c from-primary/10 to-transparent flex flex-col items-center justify-center text-center p-4">
                  <MapPin className="h-8 w-8 text-primary animate-bounce mb-2" />
                  <h4 className="font-heading text-xs font-bold text-txt-base">MEFT Headquarters Map</h4>
                  <p className="text-xxs text-txt-muted mt-1 max-w-xs">
                    Andharua, Bhubaneswar, Odisha, 751029
                  </p>
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg bg-bg-base border border-border-base px-3 py-1.5 text-xxs font-semibold text-txt-base mt-4 hover:bg-border-base transition-colors"
                  >
                    Open in Google Maps
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <AccessibilityMenu />
    </>
  );
}

export default function ContactPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-txt-muted text-xs">Loading contact information...</div>}>
      <ContactContent />
    </Suspense>
  );
}
