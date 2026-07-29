import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AccessibilityMenu from "@/components/AccessibilityMenu";
import { DatabaseService } from "@/lib/supabase";
import { ArrowLeft, User, Calendar, Clock, Share2, Link2 } from "lucide-react";
import { Facebook, Twitter } from "@/components/ui/BrandIcons";

interface Props {
  params: Promise<{ slug: string }>;
}

export const revalidate = 3600;

export default async function BlogPostDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = await DatabaseService.getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <Header />
      
      <main id="main-content" className="flex-grow bg-bg-base py-12">
        <article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Back to Blog */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-txt-muted hover:text-primary transition-colors focus:outline-none"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Blog & Insights
          </Link>

          {/* Banner Image */}
          <div className="relative aspect-video rounded-3xl overflow-hidden shadow-md border border-border-base">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Meta and Category */}
          <div className="space-y-4">
            <span className="inline-flex items-center rounded-md bg-primary/10 px-2.5 py-0.5 text-xxs font-bold text-primary uppercase tracking-wider">
              {post.category}
            </span>
            <h1 className="font-heading text-3xl sm:text-4xl font-bold text-txt-base leading-tight">
              {post.title}
            </h1>

            {/* Author info & Metadata */}
            <div className="flex flex-wrap items-center gap-6 text-xxs text-txt-muted border-y border-border-base py-3">
              <div className="flex items-center gap-1.5">
                <User className="h-4 w-4 text-primary" />
                <span>By {post.author}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-primary" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-primary" />
                <span>{post.readTime}</span>
              </div>
            </div>
          </div>

          {/* Post Content */}
          <div 
            className="prose prose-sm max-w-none text-txt-muted leading-relaxed space-y-4"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Share Block */}
          <div className="border-t border-border-base pt-6 flex items-center justify-between gap-4">
            <span className="text-xs font-bold text-txt-muted flex items-center gap-1.5">
              <Share2 className="h-4 w-4 text-primary" /> Share this article
            </span>
            <div className="flex gap-2">
              <button
                className="rounded-lg border border-border-base bg-bg-muted p-2 text-txt-muted hover:bg-primary hover:text-white transition-all focus:outline-none"
                aria-label="Share on Facebook"
              >
                <Facebook className="h-4 w-4" />
              </button>
              <button
                className="rounded-lg border border-border-base bg-bg-muted p-2 text-txt-muted hover:bg-primary hover:text-white transition-all focus:outline-none"
                aria-label="Share on Twitter"
              >
                <Twitter className="h-4 w-4" />
              </button>
              <button
                className="rounded-lg border border-border-base bg-bg-muted p-2 text-txt-muted hover:bg-primary hover:text-white transition-all focus:outline-none"
                aria-label="Copy link"
              >
                <Link2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        </article>
      </main>

      <Footer />
      <AccessibilityMenu />
    </>
  );
}

export async function generateStaticParams() {
  const posts = await DatabaseService.getBlogPosts();
  return posts.map((p) => ({
    slug: p.slug,
  }));
}
