"use client";

import React, { useState, useTransition, Suspense } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AccessibilityMenu from "@/components/AccessibilityMenu";
import { DatabaseService } from "@/lib/supabase";
import { HeartHandshake, Upload, Send, CheckCircle2, UserCheck } from "lucide-react";
import { useSearchParams } from "next/navigation";

const availableSkills = [
  "Psychological Counseling",
  "Medical & Health Support",
  "Teaching & Tutoring",
  "Tailoring & Sewing Instruction",
  "Digital Literacy & IT Training",
  "Social Media & Content Creation",
  "Event Coordination & Logistics",
  "Graphic Design & Media Production",
];

function VolunteerContent() {
  const searchParams = useSearchParams();
  const defaultInterest = searchParams.get("interest") || "";

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    availability: "weekends",
    skills: [] as string[],
    statement: "",
  });

  const [resumeName, setResumeName] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [isPending, startTransition] = useTransition();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSkillChange = (skill: string) => {
    setForm((prev) => {
      const skills = prev.skills.includes(skill)
        ? prev.skills.filter((s) => s !== skill)
        : [...prev.skills, skill];
      return { ...prev, skills };
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setResumeName(file.name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("idle");

    startTransition(async () => {
      try {
        const res = await DatabaseService.registerVolunteer({
          ...form,
          resumeUrl: resumeName ? `/resumes/${resumeName}` : undefined,
        });

        if (res.success) {
          setStatus("success");
          setForm({
            name: "",
            email: "",
            phone: "",
            location: "",
            availability: "weekends",
            skills: [],
            statement: "",
          });
          setResumeName("");
        } else {
          setStatus("error");
        }
      } catch (err) {
        console.error(err);
        setStatus("error");
      }
    });
  };

  return (
    <>
      <Header />
      
      <main id="main-content" className="flex-grow bg-bg-base py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-sm">
              <HeartHandshake className="h-8 w-8" />
            </div>
            <h1 className="font-heading text-4xl font-bold tracking-tight text-txt-base">
              Become a Volunteer
            </h1>
            <p className="text-sm text-txt-muted leading-relaxed">
              Join our active community of counselors, skills instructors, and organizers. Give your time, build community capacity, and transform lives.
            </p>
          </div>

          {/* Form container */}
          <div className="bg-bg-muted border border-border-base rounded-3xl p-6 md:p-10 shadow-sm">
            {status === "success" ? (
              <div className="text-center py-10 space-y-6 max-w-lg mx-auto">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-secondary/15 text-secondary">
                  <CheckCircle2 className="h-10 w-10" />
                </div>
                <div className="space-y-2">
                  <h2 className="font-heading text-2xl font-bold text-txt-base">Application Received!</h2>
                  <p className="text-sm text-txt-muted leading-relaxed">
                    Thank you for applying. To maintain absolute safety and high clinical standards in our programs, we conduct manual background and credential verifications for all volunteers.
                  </p>
                </div>
                
                <div className="p-4 rounded-2xl bg-bg-base border border-border-base text-left flex gap-3">
                  <UserCheck className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div className="space-y-1 text-xxs text-txt-muted">
                    <h4 className="font-bold text-txt-base">Next Steps:</h4>
                    <p>1. Our operations team reviews your skill alignment and availability.</p>
                    <p>2. We will contact you via email or phone for a brief introductory interview.</p>
                    <p>3. Once verified, you will be invited to our program orientation sessions.</p>
                  </div>
                </div>

                <button
                  onClick={() => setStatus("idle")}
                  className="rounded-xl bg-primary px-6 py-2.5 text-xs font-semibold text-white hover:bg-primary-hover transition-colors focus:outline-none"
                >
                  Apply for another role
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h2 className="font-heading text-xl font-bold text-txt-base border-b border-border-base pb-3">
                  Volunteer Application Form
                </h2>

                {/* Personal Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label htmlFor="name" className="text-xxs font-bold uppercase tracking-wider text-txt-muted">
                      Full Name *
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label htmlFor="phone" className="text-xxs font-bold uppercase tracking-wider text-txt-muted">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      required
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="e.g. +91 98765 43210"
                      className="w-full rounded-xl bg-bg-base border border-border-base px-4 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-primary text-txt-base"
                    />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="location" className="text-xxs font-bold uppercase tracking-wider text-txt-muted">
                      City / Village & District *
                    </label>
                    <input
                      type="text"
                      name="location"
                      id="location"
                      required
                      value={form.location}
                      onChange={handleChange}
                      placeholder="e.g. Cuttack, Odisha"
                      className="w-full rounded-xl bg-bg-base border border-border-base px-4 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-primary text-txt-base"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label htmlFor="availability" className="text-xxs font-bold uppercase tracking-wider text-txt-muted">
                      Availability *
                    </label>
                    <select
                      name="availability"
                      id="availability"
                      value={form.availability}
                      onChange={handleChange}
                      className="w-full rounded-xl bg-bg-base border border-border-base px-4 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-primary text-txt-base"
                    >
                      <option value="weekends">Weekends Only</option>
                      <option value="weekdays">Weekdays Only</option>
                      <option value="flexible">Flexible hours / Remote</option>
                      <option value="full-time">Full-time event support</option>
                    </select>
                  </div>

                  {/* Resume Upload Mock */}
                  <div className="space-y-1">
                    <label className="text-xxs font-bold uppercase tracking-wider text-txt-muted block">
                      Upload Resume / Credentials (PDF)
                    </label>
                    <div className="relative border-2 border-dashed border-border-base rounded-xl p-2 bg-bg-base flex items-center justify-between text-xs hover:border-primary transition-colors cursor-pointer">
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileUpload}
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                        aria-label="Upload resume file"
                      />
                      <div className="flex items-center gap-2 pl-2">
                        <Upload className="h-4 w-4 text-primary" />
                        <span className="text-xxs text-txt-muted truncate max-w-[180px]">
                          {resumeName || "Choose file..."}
                        </span>
                      </div>
                      <span className="bg-bg-muted border border-border-base rounded px-2 py-0.5 text-xxs font-semibold text-txt-base">
                        Browse
                      </span>
                    </div>
                  </div>
                </div>

                {/* Skills Checkboxes */}
                <div className="space-y-2">
                  <span className="text-xxs font-bold uppercase tracking-wider text-txt-muted block">
                    Choose Your Skills & Interests
                  </span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {availableSkills.map((skill) => (
                      <label
                        key={skill}
                        className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                          form.skills.includes(skill)
                            ? "bg-primary/5 border-primary text-primary"
                            : "bg-bg-base border-border-base hover:bg-bg-muted"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={form.skills.includes(skill)}
                          onChange={() => handleSkillChange(skill)}
                          className="rounded text-primary focus:ring-primary border-border-base"
                        />
                        <span className="text-xs font-semibold">{skill}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Statement */}
                <div className="space-y-1">
                  <label htmlFor="statement" className="text-xxs font-bold uppercase tracking-wider text-txt-muted">
                    Why do you want to volunteer with us? *
                  </label>
                  <textarea
                    name="statement"
                    id="statement"
                    rows={4}
                    required
                    value={form.statement}
                    onChange={handleChange}
                    placeholder="Briefly share your experience, motivation, or key certifications..."
                    className="w-full rounded-xl bg-bg-base border border-border-base px-4 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-primary text-txt-base"
                  />
                </div>

                {status === "error" && (
                  <p className="text-xs text-red-500 font-medium">Failed to submit application. Try again.</p>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isPending}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary py-3 text-xs font-semibold text-white shadow-md hover:bg-primary-hover hover:shadow-lg transition-all focus:outline-none disabled:opacity-50"
                >
                  <Send className="h-4 w-4" /> {isPending ? "Submitting..." : "Submit Volunteer Application"}
                </button>
              </form>
            )}
          </div>
        </div>
      </main>

      <Footer />
      <AccessibilityMenu />
    </>
  );
}

export default function VolunteerPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-txt-muted text-xs">Loading volunteer portal...</div>}>
      <VolunteerContent />
    </Suspense>
  );
}
