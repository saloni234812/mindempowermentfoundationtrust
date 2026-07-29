import React from "react";
import Link from "next/link";
import { ArrowRight, BrainCircuit, Flame, GraduationCap, Cpu, Calendar, MapPin, Heart, Sparkles } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AccessibilityMenu from "@/components/AccessibilityMenu";
import ImpactCounters from "@/components/ImpactCounters";
import SuccessStories from "@/components/SuccessStories";
import { DatabaseService } from "@/lib/supabase";
import Logo from "@/components/Logo";
import ScrollReveal from "@/components/ScrollReveal";
import ThreeDCard from "@/components/ui/ThreeDCard";
import ActivitySlider from "@/components/ActivitySlider";
import HeroSlider from "@/components/HeroSlider";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  BrainCircuit: BrainCircuit,
  Flame: Flame,
  GraduationCap: GraduationCap,
  Cpu: Cpu,
};

export const revalidate = 3600; // Revalidate every hour

export default async function HomePage() {
  const [programs, events] = await Promise.all([
    DatabaseService.getPrograms(),
    DatabaseService.getEvents(),
  ]);

  return (
    <>
      <Header />
      
      <main id="main-content" className="flex-grow">
        {/* FULL-WIDTH PHOTO SLIDER BANNER */}
        <HeroSlider />

        {/* HERO SECTION */}
        <section className="relative bg-bg-base overflow-hidden py-20 lg:py-28">
          <div className="absolute inset-0 bg-radial-at-t from-primary/5 via-transparent to-transparent opacity-70" />
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Hero Text */}
              <ScrollReveal direction="right" className="lg:col-span-7 space-y-6">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                  <Sparkles className="h-3.5 w-3.5" /> Empowering Minds · Building a Better Tomorrow
                </span>
                <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-txt-base leading-tight">
                  Train Your Mind, <br />
                  <span className="text-primary">Grow the World.</span>
                </h1>
                <p className="text-base sm:text-lg text-txt-muted max-w-xl leading-relaxed">
                  Mind Empowerment Foundation Trust offers life-changing <strong>mind programming classes</strong> that unlock human potential — paired with active <strong>plantation drives</strong> to restore our natural environment. Empowering minds. Nurturing nature.
                </p>
                <div className="flex flex-wrap gap-3 pt-1">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-txt-muted">
                    <span className="h-2 w-2 rounded-full bg-primary inline-block" /> Mind Programming Classes
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-txt-muted">
                    <span className="h-2 w-2 rounded-full bg-secondary inline-block" /> Tree Plantation Drives
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-txt-muted">
                    <span className="h-2 w-2 rounded-full bg-accent inline-block" /> Community Transformation
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                  <Link
                    href="/donate"
                    className="flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-white shadow-md hover:bg-primary-hover hover:shadow-lg transition-all hover:-translate-y-0.5"
                  >
                    <Heart className="h-4 w-4 fill-white" />
                    Support Our Mission
                  </Link>
                  <Link
                    href="/volunteer"
                    className="flex items-center justify-center gap-2 rounded-xl border border-border-base bg-bg-base px-6 py-3.5 text-sm font-semibold text-txt-base hover:bg-bg-muted transition-all"
                  >
                    Join as Volunteer
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </ScrollReveal>

              {/* Hero Visual — Official MEFT Logo */}
              <ScrollReveal direction="left" className="lg:col-span-5 flex justify-center items-center">
                <div className="relative flex flex-col items-center justify-center py-4">
                  {/* Soft glow */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/15 via-accent/10 to-secondary/15 blur-3xl opacity-60 pointer-events-none" />
                  {/* Logo — big */}
                  <Logo className="relative z-10 h-96 w-96 sm:h-[28rem] sm:w-[28rem] lg:h-[30rem] lg:w-[30rem]" />
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* IMPACT COUNTERS SECTION */}
        <ImpactCounters />

        {/* ICONIC INITIATIVES SECTION (Matching reference video) */}
        <section className="py-24 bg-bg-base border-t border-border-base">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-primary/70">OUR PRESENCE</span>
              <h2 className="font-heading text-4xl font-bold text-txt-base tracking-tight">
                Iconic Developments
              </h2>
            </div>

            {/* 4-column grid (matching the flats cards in the video) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  img: "/images/activity_3.jpg",
                  title: "Mind Programming Seminar at Blind, Deaf and Dumb Students at Bhubaneswar",
                  subtitle: "Bhubaneswar · March 2023",
                  href: "/gallery"
                },
                {
                  img: "/images/activity_5.jpg",
                  title: "Mind Programming Workshop at Ram Krishna Asram at Hatta Muniguda, Rayagada",
                  subtitle: "Rayagada · February 2024",
                  href: "/gallery"
                },
                {
                  img: "/images/activity_6.jpg",
                  title: "Mind Programming Training to Professionals",
                  subtitle: "Bhubaneswar · May 2024",
                  href: "/gallery"
                },
                {
                  img: "/images/activity_7.jpg",
                  title: "Mind Empowerment Program for Corporate Junction Escalator",
                  subtitle: "Bhubaneswar · June 2024",
                  href: "/gallery"
                }
              ].map((item, idx) => (
                <ScrollReveal key={idx} direction="up" delay={idx * 0.1} className="flex">
                  <Link href={item.href} className="group flex flex-col w-full focus:outline-none">
                    {/* Rounded Image Container with Hover zoom */}
                    <div className="aspect-[4/5] w-full rounded-2xl overflow-hidden bg-bg-muted border border-border-base relative">
                      <img
                        src={item.img}
                        alt={item.title}
                        className={`h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 ${
                          item.img.includes("activity_6.jpg")
                            ? "brightness-[1.18] contrast-[1.08] saturate-[1.03] object-[50%_15%]"
                            : ""
                        } ${
                          item.img.includes("activity_7.jpg")
                            ? "brightness-[1.12] contrast-[1.04] saturate-[1.02]"
                            : ""
                        }`}
                      />
                      {/* Logo watermark overlay for Corporate photo */}
                      {item.img.includes("activity_7.jpg") && (
                        <div className="absolute top-3 right-3 z-20 h-8 w-20 bg-white/95 rounded-lg p-0.5 shadow-md border border-white/20 select-none pointer-events-none">
                          <img src="/logo.png" alt="MEFT Logo" className="h-full w-full object-contain" />
                        </div>
                      )}
                    </div>
                    {/* Text below the card (matching the video layout) */}
                    <div className="mt-4 space-y-1">
                      <h3 className="font-heading text-sm font-bold text-txt-base group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                        {item.title}
                      </h3>
                      <p className="text-xs font-medium text-txt-muted tracking-wide">
                        {item.subtitle}
                      </p>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>

            {/* View All Button (matching the centered thin all-caps button in the video) */}
            <div className="text-center mt-12">
              <Link
                href="/gallery"
                className="inline-flex items-center justify-center border border-border-base px-8 py-3 text-xs font-bold uppercase tracking-widest text-txt-base hover:bg-bg-muted hover:border-txt-base transition-all focus:outline-none rounded-xl"
              >
                VIEW ALL
              </Link>
            </div>
          </div>
        </section>

        {/* SIGNATURE SECTION (Matching the luxurious find your dream home layout in the video) */}
        <section className="py-24 bg-bg-muted border-t border-border-base">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              
              {/* Column 1: Rounded lifestyle/activity photo */}
              <ScrollReveal direction="right" className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-border-base shadow-lg bg-bg-base">
                <img
                  src="/images/activity_4.jpg"
                  alt="MEFT Community distribution and volunteer recognition"
                  className="h-full w-full object-cover"
                />
              </ScrollReveal>

              {/* Column 2: Elegant text content */}
              <ScrollReveal direction="left" className="space-y-6">
                <span className="text-xs font-bold uppercase tracking-widest text-primary/70">OUR SIGNATURE MISSION</span>
                <h2 className="font-heading text-4xl sm:text-5xl font-bold text-txt-base tracking-tight leading-tight">
                  Nurture Your Mind, <br />
                  <span className="text-primary">Protect Our Planet</span>
                </h2>
                <p className="text-sm text-txt-muted leading-relaxed max-w-xl">
                  Join us in discovering the path to mental clarity and ecological balance. Through structured mind training and hands-on tree plantation drives, we help individuals grow stronger and communities bloom greener.
                </p>
                <div className="pt-2">
                  <Link
                    href="/about"
                    className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-white shadow-md hover:bg-primary-hover transition-all focus:outline-none"
                  >
                    Read Our Story
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </ScrollReveal>

            </div>
          </div>
        </section>

        {/* GENERAL DONATION CTA SECTION */}
        <section className="py-20 bg-bg-base border-t border-border-base">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <ScrollReveal direction="up">
              <div className="rounded-3xl border border-border-base bg-bg-muted p-8 md:p-12 shadow-sm">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                  <div className="space-y-6">
                    <span className="inline-flex items-center rounded-full bg-secondary/10 px-3 py-1 text-xs font-semibold text-secondary">
                      Support Our Mission
                    </span>
                    <h2 className="font-heading text-3xl font-bold text-txt-base leading-tight">
                      Help Us Train More Minds & Plant More Trees
                    </h2>
                    <p className="text-sm text-txt-muted leading-relaxed">
                      Your support funds mind programming sessions for students and communities, and helps us plant and nurture thousands of trees. Every rupee goes directly toward empowering minds and healing our environment.
                    </p>
                    <div className="pt-2">
                      <Link
                        href="/donate"
                        className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-white shadow-md hover:bg-primary-hover hover:shadow-lg transition-all focus:outline-none"
                      >
                        <Heart className="h-4 w-4 fill-white" />
                        Support Mind Empowerment Foundation Trust
                      </Link>
                    </div>
                  </div>
                  <div>
                    <img
                      src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800"
                      alt="Tree plantation drive by Mind Empowerment Foundation Trust"
                      className="rounded-2xl shadow-md border border-border-base object-cover w-full aspect-video"
                    />
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* EVENTS SECTION */}
        <section className="py-20 bg-bg-base border-t border-border-base">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-primary">Get Involved</span>
                <h2 className="font-heading text-3xl font-bold text-txt-base mt-2">
                  Upcoming Community Events
                </h2>
              </div>
              <Link
                href="/contact"
                className="text-sm font-bold text-primary hover:underline mt-2 sm:mt-0 flex items-center gap-1.5 focus:outline-none"
              >
                Inquire about events <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {events.map((event, index) => (
                <ScrollReveal
                  key={event.id}
                  direction="up"
                  delay={index * 0.15}
                  className="flex"
                >
                  <div className="flex flex-col sm:flex-row bg-bg-muted border border-border-base rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all w-full">
                    <div className="sm:w-1/3 relative h-48 sm:h-auto">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="sm:w-2/3 p-6 flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        <span className="inline-flex items-center rounded-md bg-primary/10 px-2 py-0.5 text-xxs font-medium text-primary">
                          {event.category}
                        </span>
                        <h3 className="font-heading text-base font-bold text-txt-base leading-snug">
                          {event.title}
                        </h3>
                        <div className="space-y-1 text-xxs text-txt-muted">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="h-3.5 w-3.5 text-primary" />
                            <span>{event.date} • {event.time}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <MapPin className="h-3.5 w-3.5 text-primary" />
                            <span>{event.location}</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-xxs text-txt-muted line-clamp-2">
                        {event.description}
                      </p>
                      <div className="pt-2">
                        <Link
                          href={`/contact?subject=Registration for ${event.title}`}
                          className="inline-flex justify-center rounded-lg border border-primary/20 bg-primary/5 px-3 py-1.5 text-xs font-semibold text-primary hover:bg-primary/10 focus:outline-none"
                        >
                          Register
                        </Link>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* SUCCESS STORIES SECTION */}
        <SuccessStories />

        {/* PARTNER LOGOS */}
        <section className="py-12 bg-bg-base border-b border-border-base">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <span className="text-xxs font-bold uppercase tracking-wider text-txt-muted">
              Supported & Recognized By
            </span>
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 mt-6 opacity-70">
              <span className="font-heading text-sm font-semibold tracking-wider text-txt-muted border border-border-base px-4 py-2 rounded-xl">
                NITI Aayog (Govt. of India)
              </span>
              <span className="font-heading text-sm font-semibold tracking-wider text-txt-muted border border-border-base px-4 py-2 rounded-xl">
                Ministry of Corporate Affairs
              </span>
              <span className="font-heading text-sm font-semibold tracking-wider text-txt-muted border border-border-base px-4 py-2 rounded-xl">
                Income Tax Department
              </span>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <AccessibilityMenu />
    </>
  );
}
