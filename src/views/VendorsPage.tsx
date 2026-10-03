import { Search, MapPin, Camera, Sparkles, Scissors, Mail, Gift, FileText, Music, Cake, Plus } from "lucide-react";
import TopBar from "@/components/TopBar";

const categories = [
  { name: "Photographers & Videographers", icon: Camera },
  { name: "Makeup Artists", icon: Sparkles },
  { name: "Bridal Designers", icon: Scissors },
  { name: "Wedding Cards", icon: Mail },
  { name: "Giveaways", icon: Gift },
  { name: "Nikkah Contract Designers", icon: FileText },
  { name: "Performers & Musicians", icon: Music },
  { name: "Wedding Cakes", icon: Cake },
  { name: "Event Designers", icon: Sparkles },
];

const VendorsPage = () => {
  return (
    <div className="min-h-screen bg-background pb-20">
      <TopBar title="Vendors" backTo="/services/wedding" backLabel="Back to Services" />

      <div className="px-4 pt-4 max-w-4xl mx-auto">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Find Vendors</h2>
            <p className="text-sm text-muted-foreground mb-4">Connect with trusted professionals</p>
          </div>
          <button className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
            <Plus className="w-5 h-5" />
          </button>
        </div>

        <div className="flex gap-2 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search vendors..."
              className="w-full pl-10 pr-4 py-2.5 bg-card border border-border rounded-lg text-sm"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-card border border-border rounded-lg text-sm text-muted-foreground">
            <MapPin className="w-4 h-4" /> All Cities
          </button>
        </div>

        <p className="text-xs font-semibold tracking-widest text-muted-foreground mb-3">
          BROWSE BY CATEGORY
        </p>

        <div className="grid grid-cols-2 gap-3">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.name}
                className="flex flex-col items-start gap-3 p-4 bg-card rounded-xl border border-border hover:shadow-md transition-shadow"
              >
                <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
                  <Icon className="w-5 h-5 text-accent-foreground" />
                </div>
                <span className="text-sm font-medium text-foreground">{cat.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default VendorsPage;
