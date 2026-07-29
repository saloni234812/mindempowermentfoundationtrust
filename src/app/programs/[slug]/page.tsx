import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AccessibilityMenu from "@/components/AccessibilityMenu";
import { DatabaseService } from "@/lib/supabase";
import { ArrowLeft, CheckCircle2, Heart, ArrowRight } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export const revalidate = 3600;

export default async function ProgramDetailPage({ params }: Props) {
  const { slug } = await params;
  const program = await DatabaseService.getProgramBySlug(slug);

  if (!program) {
    notFound();
  }

  return (
    <>
      <Header />
      
      <main id="main-content" className="flex-grow bg-bg-base py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Breadcrumb / Back button */}
          <Link
            href="/programs"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-txt-muted hover:text-primary transition-colors focus:outline-none"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Programs
          </Link>

          {/* Banner Image */}
          <div className="relative aspect-video rounded-3xl overflow-hidden shadow-md border border-border-base">
            <img
              src={program.image}
              alt={program.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Title & Tagline */}
          <div className="space-y-2">
            <h1 className="font-heading text-3xl sm:text-4xl font-bold text-txt-base">
              {program.title}
            </h1>
            <p className="text-sm font-semibold italic text-primary">
              {program.tagline}
            </p>
          </div>

          {/* Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
              <h2 className="font-heading text-xl font-bold text-txt-base">
                Program Overview
              </h2>
              <p className="text-sm text-txt-muted leading-relaxed whitespace-pre-line">
                {program.longDescription}
              </p>
            </div>

            {/* Highlights Sidebar */}
            <div className="p-6 rounded-3xl bg-bg-muted border border-border-base space-y-4">
              <h3 className="font-heading text-base font-bold text-txt-base">
                Key Highlights
              </h3>
              <ul className="space-y-3">
                {program.keyHighlights.map((highlight: string, index: number) => (
                  <li key={index} className="flex gap-2.5 items-start text-xs text-txt-muted">
                    <CheckCircle2 className="h-4 w-4 text-secondary shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Actions Section */}
          <div className="border-t border-border-base pt-8 flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="text-center sm:text-left space-y-1">
              <h4 className="font-heading text-base font-bold text-txt-base">
                Help Us Support This Program
              </h4>
              <p className="text-xs text-txt-muted">
                Your contributions directly fund clinical support, kits, training materials, and camp setups.
              </p>
            </div>
            <div className="flex gap-3 shrink-0">
              <Link
                href={`/volunteer?interest=${program.slug}`}
                className="rounded-xl border border-border-base bg-bg-base px-5 py-2.5 text-xs font-semibold text-txt-base hover:bg-bg-muted transition-all"
              >
                Volunteer
              </Link>
              <Link
                href={`/donate?program=${program.slug}`}
                className="flex items-center gap-1.5 rounded-xl bg-primary px-5 py-2.5 text-xs font-semibold text-white shadow-md hover:bg-primary-hover hover:shadow-lg transition-all focus:outline-none"
              >
                <Heart className="h-4 w-4 fill-white" />
                Donate Now
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <AccessibilityMenu />
    </>
  );
}

export async function generateStaticParams() {
  const programs = await DatabaseService.getPrograms();
  return programs.map((p) => ({
    slug: p.slug,
  }));
}
