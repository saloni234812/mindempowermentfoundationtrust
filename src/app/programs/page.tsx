import React from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AccessibilityMenu from "@/components/AccessibilityMenu";
import { DatabaseService } from "@/lib/supabase";
import { ArrowRight, BrainCircuit, Flame, GraduationCap, Cpu, Sprout } from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  BrainCircuit: BrainCircuit,
  Flame: Flame,
  GraduationCap: GraduationCap,
  Cpu: Cpu,
  Sprout: Sprout,
};

export const revalidate = 3600;

export default async function ProgramsPage() {
  const programs = await DatabaseService.getPrograms();

  return (
    <>
      <Header />
      
      <main id="main-content" className="flex-grow bg-bg-base py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h1 className="font-heading text-4xl font-bold tracking-tight text-txt-base">
              Intervention Programs
            </h1>
            <p className="text-base text-txt-muted leading-relaxed">
              We design and execute specialized welfare programs targeted at long-term, community-led impact. Click on any program area to view details, active highlights, and metrics.
            </p>
          </div>

          {/* Grid list of programs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {programs.map((program) => {
              const IconComponent = iconMap[program.icon] || BrainCircuit;
              return (
                <div
                  key={program.id}
                  className="flex flex-col md:flex-row bg-bg-muted border border-border-base rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all group"
                >
                  <div className="md:w-2/5 relative h-48 md:h-auto">
                    <img
                      src={program.image}
                      alt={program.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="md:w-3/5 p-6 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <IconComponent className="h-5 w-5" />
                      </div>
                      <h2 className="font-heading text-xl font-bold text-txt-base group-hover:text-primary transition-colors">
                        {program.title}
                      </h2>
                      <p className="text-xs text-txt-muted font-medium italic">
                        {program.tagline}
                      </p>
                    </div>
                    <p className="text-xs text-txt-muted leading-relaxed line-clamp-3">
                      {program.description}
                    </p>
                    <div className="pt-2">
                      <Link
                        href={`/programs/${program.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-primary group-hover:underline focus:outline-none"
                      >
                        Explore Program Details
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      <Footer />
      <AccessibilityMenu />
    </>
  );
}
