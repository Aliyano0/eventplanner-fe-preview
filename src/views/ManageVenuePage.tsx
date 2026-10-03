import Link from "next/link";
import { CheckCircle2, DollarSign, Info, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const ManageVenuePage = () => {
  return (
    <div className="min-h-screen bg-background px-4 py-8 max-w-lg mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center">
          <Building2 className="w-7 h-7 text-muted-foreground" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Manage My Venue</h1>
          <p className="text-sm text-muted-foreground">
            Let us market your venue and connect you with clients
          </p>
        </div>
      </div>

      {/* How It Works */}
      <div className="rounded-xl border border-primary/20 bg-primary/5 p-5 space-y-3">
        <h2 className="font-bold text-foreground text-lg">How It Works</h2>
        <ul className="space-y-3">
          {[
            "List your venue with us in just a few simple steps",
            "We promote your space to our network of clients",
            "We manage all bookings, inquiries, and contracts",
            "We take care of post-event cleaning and upkeep",
            "You earn rental income—completely hassle-free",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-warning mt-0.5 shrink-0" />
              <span className="text-foreground">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Pricing Structure */}
      <div className="rounded-xl border border-warning/30 bg-warning/5 p-5 space-y-4">
        <div className="flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-warning" />
          <h2 className="font-bold text-foreground text-lg">Pricing Structure</h2>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-foreground">One-time Registration Fee</span>
          <span className="font-bold text-foreground text-lg"><span className="font-bold text-foreground text-lg">PKR 25,000</span></span>
        </div>
        <Separator className="bg-warning/20" />
        <div className="flex justify-between items-center">
          <span className="text-foreground">Commission per Event</span>
          <span className="font-bold text-foreground text-lg">15%</span>
        </div>
      </div>

      {/* Terms & Conditions */}
      <div className="rounded-xl border border-border bg-card p-5 space-y-3">
        <div className="flex items-center gap-2">
          <Info className="w-5 h-5 text-muted-foreground" />
          <h2 className="font-bold text-foreground">Terms & Conditions</h2>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          The company will communicate with clients and ensure all contracts are
          properly signed with necessary regulations. However, the company will
          not be liable for any regulations that the client may not have
          followed. All contractual obligations between venue owners and clients
          are clearly outlined in our standard agreement.
        </p>
      </div>

      {/* Register Button */}
      <Button asChild className="w-full h-12 text-base font-semibold text-center">
        <Link href="/venue-registration">Register My Venue</Link>
      </Button>
    </div>
  );
};

export default ManageVenuePage;
