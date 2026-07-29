"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AccessibilityMenu from "@/components/AccessibilityMenu";
import { DatabaseService } from "@/lib/supabase";
import { BlogPost } from "@/lib/mockData";
import { Search, Calendar, User, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    DatabaseService.getBlogPosts()
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const categories = ["all", ...Array.from(new Set(posts.map((p) => p.category)))];

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.summary.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "all" || post.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <Header />
      
      <main id="main-content" className="flex-grow bg-bg-base py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h1 className="font-heading text-4xl font-bold tracking-tight text-txt-base">
              Resources, Insights & News
            </h1>
            <p className="text-sm text-txt-muted leading-relaxed">
              Read articles written by our counselors, project leads, and guests on mental health awareness, livelihood building, and social impact.
            </p>
          </div>

          {/* Search and Category Filter Bar */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-bg-muted border border-border-base rounded-3xl p-4">
            <div className="relative w-full md:w-80">
              <input
                type="text"
                placeholder="Search articles..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl bg-bg-base border border-border-base pl-10 pr-4 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                aria-label="Search articles"
              />
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-txt-muted" />
            </div>

            <div className="flex flex-wrap gap-2 w-full md:w-auto justify-end">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`rounded-lg px-3 py-1.5 text-xxs font-semibold uppercase tracking-wider border transition-all capitalize focus:outline-none ${
                    category === cat
                      ? "bg-primary text-white border-primary"
                      : "bg-bg-base text-txt-muted border-border-base hover:bg-border-base"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Grid list of posts */}
          {loading ? (
            <div className="text-center py-20 text-sm text-txt-muted">Loading articles...</div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-20 text-txt-muted">No articles matching your filters.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredPosts.map((post) => (
                <div
                  key={post.id}
                  className="flex flex-col bg-bg-muted border border-border-base rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all group"
                >
                  <div className="relative aspect-video">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-4 left-4 inline-flex items-center rounded bg-primary px-2.5 py-0.5 text-xxs font-bold text-white uppercase tracking-wider">
                      {post.category}
                    </span>
                  </div>

                  <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <h2 className="font-heading text-lg font-bold text-txt-base group-hover:text-primary transition-colors leading-snug">
                        {post.title}
                      </h2>
                      <p className="text-xxs text-txt-muted leading-relaxed line-clamp-3">
                        {post.summary}
                      </p>
                    </div>

                    {/* Metadata */}
                    <div className="border-t border-border-base pt-4 flex items-center justify-between text-xxs text-txt-muted">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5 text-primary" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5 text-primary" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>

                    <div className="pt-2">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center gap-1 text-xs font-bold text-primary group-hover:underline focus:outline-none"
                      >
                        Read Full Article <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
      <AccessibilityMenu />
    </>
  );
}
