"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AccessibilityMenu from "@/components/AccessibilityMenu";
import { Camera, Calendar, Play, X } from "lucide-react";

interface GalleryItem {
  id: string;
  title: string;
  category: "mind-training" | "culture" | "outreach";
  type: "photo" | "video";
  url: string;
  thumbnail: string;
  date: string;
}

const galleryItems: GalleryItem[] = [
  {
    id: "g1",
    title: "Interactive Mind Programming Class in local schools",
    category: "mind-training",
    type: "photo",
    url: "/images/activity_1.jpg",
    thumbnail: "/images/activity_1.jpg",
    date: "November 2022",
  },
  {
    id: "g2",
    title: "Cognitive Health & Mind Programming Workshop",
    category: "mind-training",
    type: "photo",
    url: "/images/activity_2.jpg",
    thumbnail: "/images/activity_2.jpg",
    date: "January 2023",
  },
  {
    id: "g3",
    title: "Mind Programming Seminar at Blind, Deaf and Dumb Students at Bhubaneswar",
    category: "mind-training",
    type: "photo",
    url: "/images/activity_3.jpg",
    thumbnail: "/images/activity_3.jpg",
    date: "March 2023",
  },
  {
    id: "g4",
    title: "Community Distribution and Volunteer Felicitation",
    category: "outreach",
    type: "photo",
    url: "/images/activity_4.jpg",
    thumbnail: "/images/activity_4.jpg",
    date: "December 2023",
  },
  {
    id: "g5",
    title: "Mind Programming Workshop at Ram Krishna Asram at Hatta Muniguda, Rayagada",
    category: "mind-training",
    type: "photo",
    url: "/images/activity_5.jpg",
    thumbnail: "/images/activity_5.jpg",
    date: "February 2024",
  },
  {
    id: "g6",
    title: "Mind Programming Training to Professionals",
    category: "mind-training",
    type: "photo",
    url: "/images/activity_6.jpg",
    thumbnail: "/images/activity_6.jpg",
    date: "May 2024",
  },
  {
    id: "g7",
    title: "Mind Empowerment Program for Johnson Lifts & Escalators",
    category: "mind-training",
    type: "photo",
    url: "/images/activity_7.jpg",
    thumbnail: "/images/activity_7.jpg",
    date: "June 2024",
  },
  {
    id: "g8",
    title: "LIC Program with Punjab Singh Bhubaneswar",
    category: "mind-training",
    type: "photo",
    url: "/images/activity_8.jpg",
    thumbnail: "/images/activity_8.jpg",
    date: "July 2024",
  },
  {
    id: "g9",
    title: "Felicitation before opening Mind Power class",
    category: "mind-training",
    type: "photo",
    url: "/images/activity_9.jpg",
    thumbnail: "/images/activity_9.jpg",
    date: "August 2024",
  },
  {
    id: "g10",
    title: "A glimpse from mind programming class",
    category: "mind-training",
    type: "photo",
    url: "/images/activity_10.jpg",
    thumbnail: "/images/activity_10.jpg",
    date: "September 2024",
  },
  {
    id: "g11",
    title: "Economical empowerment at village",
    category: "outreach",
    type: "photo",
    url: "/images/activity_11.jpg",
    thumbnail: "/images/activity_11.jpg",
    date: "October 2024",
  },
  {
    id: "g12",
    title: "Mind Power Workshop",
    category: "mind-training",
    type: "photo",
    url: "/images/activity_12.jpg",
    thumbnail: "/images/activity_12.jpg",
    date: "November 2024",
  },
  {
    id: "g13",
    title: "Mind Power Course at Lonavala with Dr. Jitendra Adhia, International Trainer",
    category: "mind-training",
    type: "photo",
    url: "/images/activity_13.jpg",
    thumbnail: "/images/activity_13.jpg",
    date: "December 2024",
  },
  {
    id: "g14",
    title: "During the mind power classes",
    category: "mind-training",
    type: "photo",
    url: "/images/activity_14.jpg",
    thumbnail: "/images/activity_14.jpg",
    date: "January 2025",
  },
  {
    id: "g15",
    title: "Felicitation at Jio Finance Mind Programming Program Bhubaneswar",
    category: "mind-training",
    type: "photo",
    url: "/images/activity_15.jpg",
    thumbnail: "/images/activity_15.jpg",
    date: "February 2025",
  },
  {
    id: "g16",
    title: "Workshop",
    category: "mind-training",
    type: "photo",
    url: "/images/activity_16.jpg",
    thumbnail: "/images/activity_16.jpg",
    date: "March 2025",
  },
  {
    id: "g17",
    title: "Mind Programming Class at Naraharipur High School, Remuna, Balasore",
    category: "mind-training",
    type: "photo",
    url: "/images/activity_17.jpg",
    thumbnail: "/images/activity_17.jpg",
    date: "April 2025",
  },
  {
    id: "g18",
    title: "Today, Shantanu Shantiswaroop secured the first position in the district level art competition organised by the daily newspaper The Samaja at the Khordha DIET Premises, bringing pride to the state.",
    category: "culture",
    type: "photo",
    url: "/images/activity_18.jpg",
    thumbnail: "/images/activity_18.jpg",
    date: "July 2026",
  },
  {
    id: "g19",
    title: "On the occasion of the 77th vana Mahotsav celebration, little artist Shantanu Shantiswaroop is presenting a painting on world Peace to Ekamra MLA Babu Singh.",
    category: "culture",
    type: "photo",
    url: "/images/activity_19.jpg",
    thumbnail: "/images/activity_19.jpg",
    date: "July 2026",
  },
  {
    id: "g20",
    title: "On the occasion of the 77th state level celebration, a special program was organised at the local kapileswar Government High school in old Bhubaneswar. On this occasion, young artist Shantanu Shantiswaroop from the pokhariput area of Bhuvaneswar brought laurels to the state by securing the third position in the state level painting competition. Shantanu, a seventh grade student of Bhimatangi Saraswati shishu vidyamandir was honored with a certificate and trophy by the Honorable Chief Minister, Mohan Charan Majhi.",
    category: "culture",
    type: "photo",
    url: "/images/activity_20.jpg",
    thumbnail: "/images/activity_20.jpg",
    date: "July 2026",
  },
];

export default function GalleryPage() {
  const [filter, setFilter] = useState<"all" | "mind-training" | "culture" | "outreach">("all");
  const [activeMedia, setActiveMedia] = useState<string | null>(null);

  const filteredItems = galleryItems.filter(
    (item) => filter === "all" || item.category === filter
  );

  return (
    <>
      <Header />
      
      <main id="main-content" className="flex-grow bg-bg-base relative overflow-hidden py-16">
        {/* Sleek ambient glow backdrop */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[450px] bg-radial-at-t from-primary/5 via-transparent to-transparent opacity-60 pointer-events-none z-0" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h1 className="font-heading text-4xl font-bold tracking-tight text-txt-base">
              Outreach Media Gallery
            </h1>
            <p className="text-sm text-txt-muted leading-relaxed">
              Snapshots of our dynamic ground operations, community counseling seminars, and student kits distribution drives.
            </p>
          </div>

          {/* Filter Navigation */}
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { id: "all" as const, name: "All Media" },
              { id: "mind-training" as const, name: "Mind Programming" },
              { id: "culture" as const, name: "Culture & Events" },
              { id: "outreach" as const, name: "Outreach & Support" },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold border transition-all focus:outline-none ${
                  filter === cat.id
                    ? "bg-primary text-white border-primary"
                    : "bg-bg-muted text-txt-muted border-border-base hover:bg-border-base"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setActiveMedia(item.url)}
                className="group flex flex-col w-full cursor-pointer focus:outline-none"
              >
                {/* Rounded Image Container with custom floating lift shadow */}
                <div className="aspect-video w-full rounded-2xl overflow-hidden bg-bg-muted border border-border-base relative shadow-sm group-hover:shadow-lg transition-all duration-300">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className={`w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300 ${
                      item.url.includes("activity_6.jpg")
                        ? "brightness-[1.18] contrast-[1.08] saturate-[1.03] object-[50%_15%]"
                        : ""
                    } ${
                      item.url.includes("activity_7.jpg")
                        ? "brightness-[1.12] contrast-[1.04] saturate-[1.02]"
                        : ""
                    } ${
                      item.url.includes("activity_8.jpg")
                        ? "scale-[1.08] brightness-[1.06] contrast-[1.08] saturate-[1.02]"
                        : ""
                    } ${
                      item.url.includes("activity_9.jpg")
                        ? "brightness-[1.14] contrast-[1.06] saturate-[1.04]"
                        : ""
                    } ${
                      item.url.includes("activity_10.jpg")
                        ? "scale-[1.18] object-[85%_35%] brightness-[1.14] contrast-[1.08] saturate-[1.03]"
                        : ""
                    } ${
                      item.url.includes("activity_11.jpg")
                        ? "brightness-[1.10] contrast-[1.04] saturate-[1.02]"
                        : ""
                    } ${
                      item.url.includes("activity_12.jpg")
                        ? "brightness-[1.12] contrast-[1.06] saturate-[1.02]"
                        : ""
                    } ${
                      item.url.includes("activity_13.jpg")
                        ? "brightness-[1.05] contrast-[1.06] saturate-[1.02]"
                        : ""
                    } ${
                      item.url.includes("activity_14.jpg")
                        ? "brightness-[1.10] contrast-[1.05] saturate-[1.02]"
                        : ""
                    } ${
                      item.url.includes("activity_15.jpg")
                        ? "brightness-[1.10] contrast-[1.06] saturate-[1.02]"
                        : ""
                    } ${
                      item.url.includes("activity_16.jpg")
                        ? "brightness-[1.08] contrast-[1.05] saturate-[1.02]"
                        : ""
                    } ${
                      item.url.includes("activity_17.jpg")
                        ? "brightness-[1.10] contrast-[1.05] saturate-[1.02]"
                        : ""
                    } ${
                      item.url.includes("activity_18.jpg")
                        ? "brightness-[1.10] contrast-[1.05] saturate-[1.02]"
                        : ""
                    } ${
                      item.url.includes("activity_19.jpg")
                        ? "brightness-[1.10] contrast-[1.05] saturate-[1.02]"
                        : ""
                    } ${
                      item.url.includes("activity_20.jpg")
                        ? "brightness-[1.10] contrast-[1.05] saturate-[1.02]"
                        : ""
                    }`}
                  />
                  {/* Logo overlay badge on the photo itself (watermark style) */}
                  {(item.url.includes("activity_7.jpg") || item.url.includes("activity_12.jpg") || item.url.includes("activity_16.jpg")) && (
                    <div className="absolute top-3 right-3 z-20 h-10 w-10 bg-white/95 rounded-full overflow-hidden p-1.5 shadow-md border border-white/20 select-none pointer-events-none flex items-center justify-center">
                      <img src="/logo.png" alt="MEFT Logo" className="h-full w-full object-cover scale-[1.75] origin-top" />
                    </div>
                  )}
                  {/* Subtle camera icon indicator on hover */}
                  <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="rounded-full bg-white/20 p-3 backdrop-blur-md text-white">
                      {item.type === "video" ? <Play className="h-5 w-5 fill-white" /> : <Camera className="h-5 w-5" />}
                    </span>
                  </div>
                </div>

                {/* Text details below the image */}
                <div className="mt-4 space-y-1 px-1">
                  <h3 className="font-heading text-sm font-bold text-txt-base leading-snug group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-1 text-xxs text-txt-muted">
                    <Calendar className="h-3.5 w-3.5 text-primary" />
                    <span>{item.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Full resolution light box Modal */}
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
                alt="Selected gallery image"
                className={`w-full h-auto object-contain max-h-[85vh] ${
                  activeMedia.includes("activity_6.jpg")
                    ? "brightness-[1.18] contrast-[1.08] saturate-[1.03] object-[50%_15%] object-cover aspect-[4/3]"
                    : ""
                } ${
                  activeMedia.includes("activity_7.jpg")
                    ? "brightness-[1.12] contrast-[1.04] saturate-[1.02]"
                    : ""
                } ${
                  activeMedia.includes("activity_8.jpg")
                    ? "scale-[1.08] brightness-[1.06] contrast-[1.08] saturate-[1.02] object-cover aspect-[4/3]"
                    : ""
                } ${
                  activeMedia.includes("activity_9.jpg")
                    ? "brightness-[1.14] contrast-[1.06] saturate-[1.04]"
                    : ""
                } ${
                  activeMedia.includes("activity_10.jpg")
                    ? "scale-[1.18] object-[85%_35%] brightness-[1.14] contrast-[1.08] saturate-[1.03] object-cover aspect-[4/3]"
                    : ""
                } ${
                  activeMedia.includes("activity_11.jpg")
                    ? "brightness-[1.10] contrast-[1.04] saturate-[1.02]"
                    : ""
                } ${
                  activeMedia.includes("activity_12.jpg")
                    ? "brightness-[1.12] contrast-[1.06] saturate-[1.02]"
                    : ""
                } ${
                  activeMedia.includes("activity_13.jpg")
                    ? "brightness-[1.05] contrast-[1.06] saturate-[1.02]"
                    : ""
                } ${
                  activeMedia.includes("activity_14.jpg")
                    ? "brightness-[1.10] contrast-[1.05] saturate-[1.02]"
                    : ""
                } ${
                  activeMedia.includes("activity_15.jpg")
                    ? "brightness-[1.10] contrast-[1.06] saturate-[1.02]"
                    : ""
                } ${
                  activeMedia.includes("activity_16.jpg")
                    ? "brightness-[1.08] contrast-[1.05] saturate-[1.02]"
                    : ""
                } ${
                  activeMedia.includes("activity_17.jpg")
                    ? "brightness-[1.10] contrast-[1.05] saturate-[1.02]"
                    : ""
                } ${
                  activeMedia.includes("activity_18.jpg")
                    ? "brightness-[1.10] contrast-[1.05] saturate-[1.02]"
                    : ""
                } ${
                  activeMedia.includes("activity_19.jpg")
                    ? "brightness-[1.10] contrast-[1.05] saturate-[1.02]"
                    : ""
                } ${
                  activeMedia.includes("activity_20.jpg")
                    ? "brightness-[1.10] contrast-[1.05] saturate-[1.02]"
                    : ""
                }`}
              />
              {(activeMedia.includes("activity_7.jpg") || activeMedia.includes("activity_12.jpg") || activeMedia.includes("activity_16.jpg")) && (
                <div className="absolute top-4 right-4 z-20 h-12 w-12 bg-white/95 rounded-full overflow-hidden p-2 shadow-lg border border-white/10 select-none pointer-events-none flex items-center justify-center">
                  <img src="/logo.png" alt="MEFT Logo" className="h-full w-full object-cover scale-[1.75] origin-top" />
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      <Footer />
      <AccessibilityMenu />
    </>
  );
}
