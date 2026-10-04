"use client";

import { useState } from "react";
import { MapPin, Users, Star, ChevronRight, ImageOff, SlidersHorizontal } from "lucide-react";
import { BackLink } from "@/components/layout/BackLink";
import { Container } from "@/components/layout/Container";
import { venues } from "@/lib/data";

const filters = ["All Venues", "Indoor", "Outdoor", "Hotels", "Gardens"];

const VenuesPage = () => {
  const [activeFilter, setActiveFilter] = useState("All Venues");

  const filtered = activeFilter === "All Venues"
    ? venues
    : venues.filter((v) => v.type === activeFilter);

  return (
    <div className="bg-background">
      <Container className="pt-4 pb-10">
        <BackLink href="/services/wedding" className="mb-4">Back to Services</BackLink>
        <h1 className="text-2xl font-bold text-foreground md:text-3xl">Discover Venues</h1>
        <p className="text-sm text-muted-foreground mb-4">Find the perfect location for your celebration</p>

        <div className="flex gap-2 flex-wrap mb-3">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                activeFilter === f
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border border-border text-foreground hover:bg-muted"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <button className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <SlidersHorizontal className="w-4 h-4" /> More Filters
        </button>

        <p className="text-xs text-muted-foreground mb-4">{filtered.length} venues found</p>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((venue) => (
            <div key={venue.id} className="bg-card rounded-xl border border-border overflow-hidden">
              <div className="relative h-48 bg-muted flex items-center justify-center">
                {venue.image ? (
                  // eslint-disable-next-line @next/next/no-img-element -- venue images are remote URLs of unknown dimensions
                  <img src={venue.image} alt={venue.name} className="w-full h-full object-cover" loading="lazy" />
                ) : (
                  <ImageOff className="w-12 h-12 text-muted-foreground/40" />
                )}
                <span className="absolute top-3 right-3 bg-card/90 backdrop-blur-xs px-2 py-1 rounded-full text-xs font-semibold">
                  {venue.price}
                </span>
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between">
                  <h3 className="font-semibold text-foreground">{venue.name}</h3>
                  <div className="flex items-center gap-1 text-sm">
                    <Star className="w-4 h-4 fill-warning text-warning" />
                    {venue.rating}
                  </div>
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                  <MapPin className="w-3 h-3" /> {venue.location}
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Users className="w-3 h-3" /> {venue.capacity}
                </div>
                <button className="w-full mt-3 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium flex items-center justify-center gap-1 hover:opacity-90 transition-opacity">
                  View Details <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default VenuesPage;
