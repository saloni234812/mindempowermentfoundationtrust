"use client";

import React, { useEffect, useState, useRef } from "react";
import { Users, HeartHandshake, Calendar, MapPin, TrendingUp, Briefcase } from "lucide-react";
import { DatabaseService } from "@/lib/supabase";
import { ImpactStat } from "@/lib/mockData";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Users: Users,
  HeartHandshake: HeartHandshake,
  Calendar: Calendar,
  MapPin: MapPin,
  TrendingUp: TrendingUp,
  Briefcase: Briefcase,
};

function CounterItem({ stat }: { stat: ImpactStat }) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!hasStarted) return;

    let start = 0;
    const end = stat.value;
    const duration = 2000; // 2 seconds
    const increment = Math.ceil(end / (duration / 16)); // ~60fps

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [hasStarted, stat.value]);

  const IconComponent = iconMap[stat.icon] || Users;

  // Format currency or large numbers
  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 100000).toFixed(1)} L`; // Lakhs (Indian system)
    return num.toLocaleString("en-IN");
  };

  return (
    <div
      ref={elementRef}
      className="flex flex-col items-center justify-center p-6 bg-bg-base rounded-2xl border border-border-base shadow-sm text-center transition-all hover:shadow-md"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-3">
        <IconComponent className="h-6 w-6" />
      </div>
      <span className="font-heading text-3xl font-bold tracking-tight text-txt-base">
        {formatNumber(count)}
        {stat.suffix}
      </span>
      <span className="text-xs font-semibold uppercase tracking-wider text-txt-muted mt-1">
        {stat.label}
      </span>
    </div>
  );
}

export default function ImpactCounters() {
  const [stats, setStats] = useState<ImpactStat[]>([]);

  useEffect(() => {
    DatabaseService.getImpactStats().then((data) => setStats(data));
  }, []);

  return (
    <section className="bg-bg-muted py-16 border-y border-border-base">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-heading text-3xl font-bold text-txt-base">
            Our Work in Numbers
          </h2>
          <p className="text-sm text-txt-muted mt-2">
            Verifiable, real-time metrics showing our reach and growth across rural empowerment initiatives.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {stats.map((stat) => (
            <CounterItem key={stat.id} stat={stat} />
          ))}
        </div>
      </div>
    </section>
  );
}
