import Link from "next/link";
import { Sparkles, Building2, Users, ClipboardList, ChevronRight } from "lucide-react";
import { BackLink } from "@/components/layout/BackLink";
import { Container } from "@/components/layout/Container";

const serviceItems = [
  { id: "venues", name: "Venues", description: "Discover the perfect location for your event", icon: Building2 },
  { id: "vendors", name: "Vendors", description: "Find trusted professionals and services", icon: Users },
  { id: "planner", name: "My Planner", description: "Organize your budget, tasks, and timeline", icon: ClipboardList },
];

const eventLabels: Record<string, string> = {
  wedding: "Wedding",
  birthday: "Birthday Party",
  corporate: "Corporate Event",
  other: "Other Celebrations",
};

interface ServicesPageProps {
  eventType: string;
}

const ServicesPage = ({ eventType }: ServicesPageProps) => {
  const label = eventLabels[eventType] || "Event";

  return (
    <div className="bg-background">
      <Container className="pt-4">
        <BackLink href="/">Change Event Type</BackLink>
      </Container>

      <div className="flex flex-col items-center pt-10 pb-6 px-4 md:pt-14 md:pb-10">
        <div className="w-14 h-14 rounded-full bg-accent flex items-center justify-center mb-3">
          <Sparkles className="w-7 h-7 text-accent-foreground" />
        </div>
        <p className="text-xs font-semibold tracking-widest text-muted-foreground mb-1">
          PLANNING YOUR
        </p>
        <h1 className="text-2xl font-bold text-foreground mb-1 md:text-4xl">{label}</h1>
        <p className="text-sm text-muted-foreground md:text-base">What would you like to explore first?</p>
      </div>

      <Container size="narrow" className="space-y-4 pb-10 md:grid md:max-w-5xl md:grid-cols-3 md:gap-4 md:space-y-0">
        {serviceItems.map((item) => {
          const Icon = item.icon;
          const href = item.id === "planner" ? `/planner-setup/${eventType}` : `/${item.id}`;
          return (
            <Link
              key={item.id}
              href={href}
              className="w-full flex items-center gap-4 p-5 bg-card rounded-xl border border-border text-center hover:shadow-md transition-shadow md:flex-col md:items-start md:gap-3 md:p-6"
            >
              <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center">
                <Icon className="w-5 h-5 text-accent-foreground" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="font-semibold text-foreground">{item.name}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground md:hidden" />
            </Link>
          );
        })}
      </Container>

      <p className="text-center text-xs text-muted-foreground pb-6">
        You can always switch between these sections
      </p>
    </div>
  );
};

export default ServicesPage;
