import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";
import { Sparkles } from "lucide-react";

const services = [
  { id: "makeup", name: "Makeup Artist", emoji: "💄" },
  { id: "photographer", name: "Photographer", emoji: "📸" },
  { id: "bridal", name: "Bridal Designer", emoji: "✨" },
];

const BookForMePage = () => {
  return (
    <div className="min-h-screen bg-background pb-24">
      <TopBar title="Book for Me" />

      <div className="px-4 py-4 max-w-4xl mx-auto space-y-5">
        {/* Header */}
        <div>
          <h2 className="text-2xl font-bold text-foreground">Book for Me</h2>
          <p className="text-sm text-muted-foreground">
            Book appointments for your event date
          </p>
        </div>

        {/* How it works banner */}
        <div className="bg-accent/40 rounded-xl p-4 flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" />
          <div>
            <p className="font-semibold text-foreground text-sm">How it works</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Request appointments with makeup artists, photographers, or bridal designers for your event date. We&apos;ll confirm the closest available time within 24 hours via your contact details.
            </p>
          </div>
        </div>

        {/* Select a Service */}
        <div className="space-y-3">
          <h3 className="font-semibold text-foreground">Select a Service</h3>
          <div className="grid grid-cols-3 gap-3">
            {services.map((service) => (
              <button
                key={service.id}
                className="bg-card border border-border rounded-xl p-4 text-left hover:border-primary transition-colors"
              >
                <span className="text-2xl">{service.emoji}</span>
                <p className="text-sm font-medium text-foreground mt-2">
                  {service.name}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default BookForMePage;
