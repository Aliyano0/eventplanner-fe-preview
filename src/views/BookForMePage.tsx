import { Sparkles } from "lucide-react";
import { Container } from "@/components/layout/Container";

const services = [
  { id: "makeup", name: "Makeup Artist", emoji: "💄" },
  { id: "photographer", name: "Photographer", emoji: "📸" },
  { id: "bridal", name: "Bridal Designer", emoji: "✨" },
];

const BookForMePage = () => {
  return (
    <div className="bg-background">
      <Container className="space-y-5 pt-4 pb-10">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground md:text-3xl">Book for Me</h1>
          <p className="text-sm text-muted-foreground">
            Book appointments for your event date
          </p>
        </div>

        {/* How it works banner */}
        <div className="bg-accent/40 rounded-xl p-4 flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" />
          <div>
            <p className="font-semibold text-foreground text-sm">How it works</p>
            <p className="text-xs text-muted-foreground mt-0.5 md:max-w-3xl md:text-sm">
              Request appointments with makeup artists, photographers, or bridal designers for your event date. We&apos;ll confirm the closest available time within 24 hours via your contact details.
            </p>
          </div>
        </div>

        {/* Select a Service */}
        <div className="space-y-3">
          <h2 className="font-semibold text-foreground">Select a Service</h2>
          <div className="grid grid-cols-3 gap-3 md:gap-4 lg:max-w-3xl">
            {services.map((service) => (
              <button
                key={service.id}
                className="bg-card border border-border rounded-xl p-4 text-left hover:border-primary transition-colors md:p-6"
              >
                <span className="text-2xl md:text-4xl">{service.emoji}</span>
                <p className="text-sm font-medium text-foreground mt-2 md:text-base">
                  {service.name}
                </p>
              </button>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default BookForMePage;
