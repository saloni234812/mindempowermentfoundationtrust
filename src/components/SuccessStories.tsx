"use client";

import React, { useState } from "react";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";

interface Story {
  id: string;
  name: string;
  role: string;
  image: string;
  quote: string;
  program: string;
}

const stories: Story[] = [
  {
    id: "s1",
    name: "Meera Das",
    role: "",
    image: "/images/testimonials/meera.png",
    quote: "The Shakti program didn't just teach me how to sew; they taught me how to run a business. Today, I employ three women from my village and help support my family's education.",
    program: "Women Empowerment",
  },
  {
    id: "s2",
    name: "Dr. Alok Mohapatra",
    role: "Community Mental Health Advocate",
    image: "/images/testimonials/alok.png",
    quote: "Breaking the silence around depression in rural villages was extremely difficult. MEFT's Swasth Mann clinics provided the regular psychiatric care that saved lives.",
    program: "Mental Wellness",
  },
  {
    id: "s3",
    name: "Rahul Sahoo",
    role: "Software Support Engineer",
    image: "/images/testimonials/rahul.png",
    quote: "Coming from a farming family, software training seemed like a distant dream. The computer literacy classes under Nirmaan helped me clear the interviews and secure my job.",
    program: "Skill Development",
  },
];

export default function SuccessStories() {
  const [current, setCurrent] = useState(0);

  const handleNext = () => {
    setCurrent((prev) => (prev === stories.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCurrent((prev) => (prev === 0 ? stories.length - 1 : prev - 1));
  };

  const story = stories[current];

  return (
    <section className="bg-bg-muted py-16 border-b border-border-base overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-heading text-3xl font-bold text-txt-base">
            Stories of Transformation
          </h2>
          <p className="text-sm text-txt-muted mt-2">
            Real impacts in the words of those who have overcome hardships through our community programs.
          </p>
        </div>

        {/* Carousel Block */}
        <div className="relative max-w-4xl mx-auto bg-bg-base rounded-3xl border border-border-base p-8 md:p-12 shadow-sm">
          <Quote className="absolute top-6 left-6 h-12 w-12 text-primary/10" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            {/* Image */}
            <div className="flex justify-center">
              <div className="relative h-44 w-44 rounded-2xl overflow-hidden shadow-md border-2 border-primary/20">
                <img
                  src={story.image}
                  alt={story.name}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            {/* Testimony Text */}
            <div className="md:col-span-2 space-y-4">
              <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                {story.program}
              </span>
              <p className="text-base md:text-lg text-txt-base italic leading-relaxed">
                &ldquo;{story.quote}&rdquo;
              </p>
              <div>
                <h4 className="font-heading text-base font-bold text-txt-base">
                  {story.name}
                </h4>
                {story.role && (
                  <p className="text-xs text-txt-muted">
                    {story.role}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-end gap-2 mt-8 md:mt-2">
            <button
              onClick={handlePrev}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border-base bg-bg-base text-txt-muted hover:bg-bg-muted hover:text-primary transition-all focus:outline-none"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={handleNext}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border-base bg-bg-base text-txt-muted hover:bg-bg-muted hover:text-primary transition-all focus:outline-none"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
