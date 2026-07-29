"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Download, FileText, Calendar, MapPin, ExternalLink } from "lucide-react";

interface ActivityImage {
  url: string;
  title: string;
  category: string;
  description: string;
  date: string;
  location: string;
}

const activities: ActivityImage[] = [
  {
    url: "/images/activity_1.jpg",
    title: "Interactive Mind Programming Classes",
    category: "Mind Training",
    description: "Daily interactive classes conducted at local schools to teach concentration, memory enrichment, and mental empowerment techniques to young students.",
    date: "November 2022",
    location: "Bhubaneswar Schools, Odisha"
  },
  {
    url: "/images/activity_2.jpg",
    title: "Mind Programming Stage Workshop",
    category: "Mind Training",
    description: "Engaging interactive demonstrations teaching mental exercise, brain health, and cognitive empowerment to the community.",
    date: "January 2023",
    location: "MEFT Activity Center, Bhubaneswar"
  },
  {
    url: "/images/activity_3.jpg",
    title: "Odissi Dance & Cultural Program",
    category: "Culture & Youth",
    description: "Encouraging and highlighting traditional Odia Odissi dancers to build cultural connection and youth expression.",
    date: "March 2023",
    location: "Rabindra Mandap, Bhubaneswar"
  },
  {
    url: "/images/activity_4.jpg",
    title: "Community Outreach & Felicitation",
    category: "Social Support",
    description: "Awarding scholarship certificates, study materials, and recognizing active volunteers during MEFT community events.",
    date: "December 2023",
    location: "Andharua Center, Bhubaneswar"
  },
  {
    url: "/images/activity_5.jpg",
    title: "Mass Youth Counseling Seminar",
    category: "Empowerment",
    description: "Guiding thousands of youth in large auditiorium seminars on building career resilience, emotional intelligence, and brain potential.",
    date: "February 2024",
    location: "University Auditorium, Bhubaneswar"
  }
];

export default function ActivitySlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activities.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handlePrev = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev === 0 ? activities.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % activities.length);
  };

  return (
    <section id="activities" className="py-20 bg-bg-muted border-t border-border-base scroll-mt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Text Info (Left/Top) */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">Trust Activities</span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-txt-base leading-tight">
              Action on the Ground
            </h2>
            <p className="text-sm text-txt-muted leading-relaxed">
              We translate our vision into measurable results. From conducting daily mind programming classes to organizing active plantation drives, our volunteers are on the ground empowering people and restoring nature.
            </p>

            {/* Premium Download PDF Card */}
            <div className="relative group overflow-hidden rounded-3xl border border-border-base bg-bg-base p-6 shadow-sm hover:shadow-md transition-all">
              <div className="absolute inset-0 bg-radial-at-t from-primary/5 via-transparent to-transparent opacity-60" />
              <div className="relative z-10 flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <FileText className="h-6 w-6" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="font-heading text-base font-bold text-txt-base">
                    Activity Report & Brochure
                  </h3>
                  <p className="text-xs text-txt-muted leading-relaxed">
                    Download our full document containing extensive activity summaries, volunteer details, and environmental impact audits.
                  </p>
                  <div className="pt-2 flex gap-3">
                    <a
                      href="/documents/activities_report.pdf"
                      download="MEFT_Activities_Report.pdf"
                      className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-primary-hover transition-all focus:outline-none"
                    >
                      <Download className="h-3.5 w-3.5" />
                      Download PDF
                    </a>
                    <a
                      href="/documents/activities_report.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-xl border border-border-base bg-bg-base px-3 py-2 text-xs font-semibold text-txt-base hover:bg-bg-muted transition-all focus:outline-none"
                    >
                      View
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Slider (Right/Bottom) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-3xl overflow-hidden border border-border-base bg-bg-base shadow-lg">
              
              {/* Image Carousel */}
              <div className="relative w-full h-full">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, scale: 1.02 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.5 }}
                    className="relative w-full h-full"
                  >
                    <img
                      src={activities[currentIndex].url}
                      alt={activities[currentIndex].title}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Shadow overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    
                    {/* Caption content */}
                    <div className="absolute bottom-0 inset-x-0 p-6 sm:p-8 space-y-2 text-white">
                      <span className="inline-flex items-center rounded-full bg-primary/80 backdrop-blur-md px-2.5 py-0.5 text-xxs font-semibold uppercase tracking-wider">
                        {activities[currentIndex].category}
                      </span>
                      <h3 className="font-heading text-lg sm:text-xl font-bold">
                        {activities[currentIndex].title}
                      </h3>
                      <p className="text-xs text-white/80 line-clamp-2 leading-relaxed">
                        {activities[currentIndex].description}
                      </p>
                      <div className="flex flex-wrap gap-4 pt-1 text-xxs text-white/70">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5 text-primary" />
                          <span>{activities[currentIndex].date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5 text-primary" />
                          <span>{activities[currentIndex].location}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Slider Controls */}
              <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm hover:bg-black/60 transition-all focus:outline-none"
                aria-label="Previous Slide"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm hover:bg-black/60 transition-all focus:outline-none"
                aria-label="Next Slide"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>

            {/* Slider Dots */}
            <div className="flex justify-center items-center gap-2">
              {activities.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setIsAutoPlaying(false);
                    setCurrentIndex(i);
                  }}
                  className={`h-2 rounded-full transition-all focus:outline-none ${
                    i === currentIndex ? "w-8 bg-primary" : "w-2 bg-border-base hover:bg-txt-muted/50"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
