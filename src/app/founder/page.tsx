"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AccessibilityMenu from "@/components/AccessibilityMenu";
import Masonry from "@/components/Masonry";
import { Mail, Phone, BookOpen, Award, GraduationCap, X, Calendar, Play, Camera } from "lucide-react";

interface FounderPhoto {
  id: string;
  img: string;
  url: string;
  title: string;
  date: string;
  height: number;
  type: "photo" | "video";
  category: string;
}

const founderPhotos: FounderPhoto[] = [
  {
    id: "fp1",
    img: "/images/activity_6.jpg",
    url: "/images/activity_6.jpg",
    title: "Mr. Manoj Kumar Pradhan delivering Mind Programming Training to corporate professionals and leaders",
    date: "May 2024",
    height: 380,
    type: "photo",
    category: "Mind Training"
  },
  {
    id: "fp2",
    img: "/images/activity_7.jpg",
    url: "/images/activity_7.jpg",
    title: "Manoj Kumar Pradhan conducting a corporate mind training seminar at Johnson Lifts & Escalators",
    date: "June 2024",
    height: 440,
    type: "photo",
    category: "Corporate Training"
  },
  {
    id: "fp3",
    img: "/images/activity_5.jpg",
    url: "/images/activity_5.jpg",
    title: "Mr. Manoj Kumar Pradhan hosting classes at Ram Krishna Asram, Muniguda",
    date: "February 2024",
    height: 410,
    type: "photo",
    category: "Outreach Seminar"
  },
  {
    id: "fp4",
    img: "/images/activity_12.jpg",
    url: "/images/activity_12.jpg",
    title: "Manoj Kumar Pradhan presenting at the GAINMAX Mind Power Workshop",
    date: "November 2024",
    height: 360,
    type: "photo",
    category: "Mind Power"
  },
  {
    id: "fp5",
    img: "/images/activity_13.jpg",
    url: "/images/activity_13.jpg",
    title: "Manoj Kumar Pradhan at the international Mind Power Course in Lonavala with Dr. Jitendra Adhia",
    date: "December 2024",
    height: 480,
    type: "photo",
    category: "Collaboration"
  },
  {
    id: "fp6",
    img: "/images/activity_14.jpg",
    url: "/images/activity_14.jpg",
    title: "Manoj Kumar Pradhan engaging with learners during his mind power development classes",
    date: "January 2025",
    height: 390,
    type: "photo",
    category: "Classes"
  },
  {
    id: "fp7",
    img: "/images/activity_15.jpg",
    url: "/images/activity_15.jpg",
    title: "Felicitation ceremony with Manoj Kumar Pradhan at Jio Finance Mind Programming Program",
    date: "February 2025",
    height: 430,
    type: "photo",
    category: "Honor"
  },
  {
    id: "fp8",
    img: "/images/activity_16.jpg",
    url: "/images/activity_16.jpg",
    title: "Mr. Manoj Kumar Pradhan speaking at the Subconscious Mind Seminar in Bhubaneswar",
    date: "March 2025",
    height: 450,
    type: "photo",
    category: "Mind Training"
  }
];

export default function FounderProfilePage() {
  const [activeMedia, setActiveMedia] = useState<string | null>(null);

  return (
    <>
      <Header />
      
      <main id="main-content" className="flex-grow bg-bg-base relative overflow-hidden py-16">
        {/* Ambient background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-radial-at-t from-primary/5 via-transparent to-transparent opacity-60 pointer-events-none z-0" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">
          
          {/* Back to About Link */}
          <div className="text-left">
            <a href="/about" className="text-xs font-bold uppercase tracking-wider text-primary hover:text-primary-hover flex items-center gap-1">
              &larr; Back to About Team
            </a>
          </div>

          {/* Profile Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Image & Contact Info Card */}
            <div className="lg:col-span-5 space-y-6">
              <div className="relative aspect-[3/4] w-full rounded-3xl overflow-hidden border border-border-base bg-bg-muted shadow-md">
                <img
                  src="/founder.png"
                  alt="Mr. Manoj Kumar Pradhan - Founder of MEFT"
                  className="h-full w-full object-cover object-top brightness-[1.08] contrast-[1.05] saturate-[1.02]"
                />
              </div>

              {/* Bio Highlights Card */}
              <div className="rounded-3xl bg-bg-muted border border-border-base p-6 space-y-4">
                <h3 className="font-heading text-lg font-bold text-txt-base">Contact & Connect</h3>
                <div className="space-y-3 text-sm text-txt-muted">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-primary shrink-0" />
                    <span>manoj.pradhan@mindempowerment.org.in</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-primary shrink-0" />
                    <span>+91 94371 45454</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Bio & Achievements */}
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-widest text-primary">Founder & Mind Programmer</span>
                <h1 className="font-heading text-4xl font-bold text-txt-base">Mr. Manoj Kumar Pradhan</h1>
                <p className="text-base text-txt-muted font-medium">MBA (Marketing & HR) & Certified Mind Power Trainer</p>
              </div>

              {/* Biography Details */}
              <div className="space-y-4 text-sm sm:text-base text-txt-muted leading-relaxed">
                <p>
                  Mr. Manoj Kumar Pradhan is a visionary social leader and an expert mind programmer. Possessing an MBA in Marketing & HR, he discovered early in his career that real community development begins with individual mental transformation. This led him to pursue subconscious mind power studies, eventually founding the <strong>Mind Empowerment Foundation Trust (MEFT)</strong>.
                </p>
                <p>
                  For over a decade, Manoj has conducted high-impact subconscious mind programming seminars in schools, administrative institutions, and corporations. By teaching children, youth, and corporate leaders how to manage mental health, recognize stress, and harness internal resilience, his workshops have touched thousands of lives across rural and urban Odisha.
                </p>
                <p>
                  Beyond mind programming, Manoj is a passionate environmental advocate. He spearheads the trust's extensive tree plantation drives, striving to create green, sustainable village communities. Under his guidance, MEFT actively bridges clinical mental wellness outreach with practical ecological conservation.
                </p>
              </div>

              {/* Key Credentials / Timeline */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex gap-4 p-5 rounded-2xl bg-bg-muted border border-border-base">
                  <GraduationCap className="h-6 w-6 text-primary shrink-0" />
                  <div className="space-y-1">
                    <h4 className="font-heading text-sm font-bold text-txt-base">Academic Background</h4>
                    <p className="text-xs text-txt-muted">MBA with Dual Specialization in Marketing & Human Resources.</p>
                  </div>
                </div>
                <div className="flex gap-4 p-5 rounded-2xl bg-bg-muted border border-border-base">
                  <BookOpen className="h-6 w-6 text-primary shrink-0" />
                  <div className="space-y-1">
                    <h4 className="font-heading text-sm font-bold text-txt-base">Mind Programming</h4>
                    <p className="text-xs text-txt-muted">Certified trainer in subconscious mind conditioning and mental hygiene.</p>
                  </div>
                </div>
                <div className="flex gap-4 p-5 rounded-2xl bg-bg-muted border border-border-base">
                  <Award className="h-6 w-6 text-primary shrink-0" />
                  <div className="space-y-1">
                    <h4 className="font-heading text-sm font-bold text-txt-base">Corporate Seminars</h4>
                    <p className="text-xs text-txt-muted">Conducted programs for Jio Finance, LIC, and Johnson Lifts & Escalators.</p>
                  </div>
                </div>
                <div className="flex gap-4 p-5 rounded-2xl bg-bg-muted border border-border-base">
                  <Award className="h-6 w-6 text-primary shrink-0" />
                  <div className="space-y-1">
                    <h4 className="font-heading text-sm font-bold text-txt-base">Social Service</h4>
                    <p className="text-xs text-txt-muted">Founded green villages and school mental health programs in Odisha.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          <hr className="border-border-base" />

          {/* Dedicated Photo Gallery */}
          <div className="space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <h2 className="font-heading text-3xl font-bold text-txt-base">Media & Seminars Gallery</h2>
              <p className="text-sm text-txt-muted">
                Documenting Mr. Manoj Kumar Pradhan's mind programming workshops, corporate training sessions, and outreach events.
              </p>
            </div>

            {/* GSAP Masonry Grid */}
            <div className="relative w-full">
              <Masonry
                items={founderPhotos}
                ease="power3.out"
                duration={0.6}
                stagger={0.04}
                animateFrom="bottom"
                scaleOnHover={true}
                hoverScale={0.96}
                blurToFocus={true}
                colorShiftOnHover={true}
                onItemClick={(item) => setActiveMedia(item.url)}
              />
            </div>
          </div>

        </div>
      </main>

      {/* Lightbox Viewer */}
      {activeMedia && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <button
            onClick={() => setActiveMedia(null)}
            className="absolute top-6 right-6 rounded-full bg-white/10 p-2.5 text-white hover:bg-white/25 focus:outline-none"
            aria-label="Close lightbox"
          >
            <X className="h-6 w-6" />
          </button>
          <div className="relative max-w-4xl max-h-[85vh] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
            <img
              src={activeMedia}
              alt="Manoj Kumar Pradhan seminar photo"
              className={`w-full h-auto object-contain max-h-[85vh] ${
                activeMedia.includes("activity_6.jpg")
                  ? "brightness-[1.18] contrast-[1.08] saturate-[1.03] object-[50%_15%] object-cover aspect-[4/3]"
                  : ""
              }`}
            />
          </div>
        </div>
      )}

      <Footer />
      <AccessibilityMenu />
    </>
  );
}
