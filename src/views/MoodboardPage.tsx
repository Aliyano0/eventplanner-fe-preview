"use client";

import { useState } from "react";
import { Heart, Upload, Search, ExternalLink, X } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import TopBar from "@/components/TopBar";

const categories = ["All", "Venue", "Decoration", "Attire", "Cake", "Flowers", "Other"];

const sampleImages = [
  "https://images.unsplash.com/photo-1519741497674-611481863552?w=600",
  "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600",
  "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=600",
];

const MoodboardPage = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  return (
    <div className="min-h-screen bg-background pb-24">
      <TopBar title="Moodboard" />

      <div className="px-4 pt-4 max-w-4xl mx-auto">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Moodboard</h2>
            <p className="text-sm text-muted-foreground">{sampleImages.length} inspiration images</p>
          </div>
          <div className="flex gap-2">
            <button className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center">
              <Upload className="w-4 h-4" />
            </button>
            <button className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
              <Search className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="bg-accent/50 rounded-xl p-4 mb-4">
          <div className="flex items-center gap-2 mb-1">
            <Heart className="w-4 h-4 text-accent-foreground" />
            <span className="text-sm font-semibold text-foreground">Your Inspiration</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Collect photos that inspire your event vision. Upload your own photos or search for venues, decorations, attire, and more.
          </p>
        </div>

        <div className="flex gap-2 flex-wrap mb-4">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActiveFilter(c)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                activeFilter === c
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border border-border text-foreground"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="columns-2 gap-3 space-y-3">
          {sampleImages.map((img, i) => (
            <div key={i} className="relative rounded-xl overflow-hidden break-inside-avoid">
              {/* Masonry layout relies on each image's natural height, which next/image cannot infer for remote URLs. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img}
                alt="Inspiration"
                className="w-full object-cover rounded-xl"
                loading="lazy"
              />
              <div className="absolute bottom-2 right-2 flex gap-1">
                <button className="w-8 h-8 rounded-full bg-card/80 backdrop-blur-xs flex items-center justify-center">
                  <ExternalLink className="w-3 h-3" />
                </button>
                <button className="w-8 h-8 rounded-full bg-destructive/80 backdrop-blur-xs flex items-center justify-center">
                  <X className="w-3 h-3 text-destructive-foreground" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default MoodboardPage;
