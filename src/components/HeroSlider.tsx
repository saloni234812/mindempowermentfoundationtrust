"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    image: "/images/activity_5.jpg",
    title: "Mind Programming Workshop",
    desc: "At Ram Krishna Asram, Rayagada",
    className: "brightness-[1.08] contrast-[1.04]"
  },
  {
    image: "/images/activity_3.jpg",
    title: "Mind Programming Seminar",
    desc: "At Blind, Deaf & Dumb Students School, Bhubaneswar",
    className: "brightness-[1.10] contrast-[1.05]"
  },
  {
    image: "/images/activity_6.jpg",
    title: "Training to Professionals",
    desc: "Mind training for corporate leaders & professionals",
    className: "brightness-[1.18] contrast-[1.08] saturate-[1.03] object-[50%_15%]"
  },
  {
    image: "/images/activity_7.jpg",
    title: "Mind Empowerment Program",
    desc: "Corporate session at Junction Escalator",
    className: "brightness-[1.12] contrast-[1.04] saturate-[1.02]"
  },
  {
    image: "/images/activity_15.jpg",
    title: "Felicitation at Jio Finance",
    desc: "Mind Programming Program, Bhubaneswar",
    className: "brightness-[1.10] contrast-[1.06] saturate-[1.02]"
  }
];

export default function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 4500);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const slideVariants = {
    enter: {
      opacity: 0,
      scale: 1.04
    },
    center: {
      opacity: 1,
      scale: 1,
      transition: {
        opacity: { duration: 0.7, ease: "easeInOut" as const },
        scale: { duration: 0.7, ease: "easeOut" as const }
      }
    },
    exit: {
      opacity: 0,
      scale: 0.96,
      transition: {
        opacity: { duration: 0.7, ease: "easeInOut" as const },
        scale: { duration: 0.7, ease: "easeIn" as const }
      }
    }
  };

  return (
    <section className="relative h-[60vh] sm:h-[65vh] lg:h-[80vh] w-full overflow-hidden bg-[#0d0d0d] text-white">
      {/* Background Images with AnimatePresence */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <AnimatePresence initial={false} mode="popLayout">
          <motion.div
            key={currentIndex}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 w-full h-full flex items-center justify-center bg-[#0d0d0d]"
          >
            {/* Sharp main image - 100% full-cover photo */}
            <img
              src={slides[currentIndex].image}
              alt={slides[currentIndex].title}
              className={`w-full h-full object-cover ${slides[currentIndex].className}`}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Elegant Gradient Overlay at the bottom of the slider */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/85 via-black/40 to-transparent z-20 pointer-events-none" />

      {/* Floating Caption Card */}
      <div className="absolute bottom-10 left-6 sm:left-12 lg:left-20 z-30 max-w-lg text-white pointer-events-none">
        <h3 className="font-heading text-lg sm:text-2xl font-bold text-white tracking-wide drop-shadow-md">
          {slides[currentIndex].title}
        </h3>
        <p className="text-xs sm:text-sm text-white/80 font-medium tracking-normal mt-1.5 drop-shadow-sm">
          {slides[currentIndex].desc}
        </p>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-black/30 hover:bg-black/50 text-white backdrop-blur-md border border-white/10 transition-all focus:outline-none"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handleNext();
        }}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-black/30 hover:bg-black/50 text-white backdrop-blur-md border border-white/10 transition-all focus:outline-none"
        aria-label="Next Slide"
      >
        <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-8 right-6 sm:right-12 lg:right-20 z-30 flex items-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setCurrentIndex(i);
            }}
            className={`h-2 rounded-full transition-all focus:outline-none ${
              i === currentIndex ? "w-6 bg-primary" : "w-2 bg-white/40 hover:bg-white/60"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
