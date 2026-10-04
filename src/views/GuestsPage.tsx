"use client";

import { useState } from "react";
import { Search, Filter, CheckCircle, Clock, XCircle, Mail, Phone, Plus, MoreVertical, Pencil, Trash2, Copy } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { sampleGuests } from "@/lib/data";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";

type Guest = {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: "confirmed" | "pending" | "declined";
  plusOne: boolean;
};

const filters = ["All", "Confirmed", "Pending", "Declined"];

const GuestsPage = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [guests, setGuests] = useState<Guest[]>(sampleGuests);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingGuest, setEditingGuest] = useState<Guest | null>(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", plusOne: false });
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const rsvpLink = "https://your-event.app/rsvp?eventId=12345";

  const confirmed = guests.filter((g) => g.status === "confirmed").length;
  const pending = guests.filter((g) => g.status === "pending").length;
  const declined = guests.filter((g) => g.status === "declined").length;

  const filtered = guests.filter((g) => {
    const matchesFilter = activeFilter === "All" || g.status === activeFilter.toLowerCase();
    const matchesSearch = g.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const openAdd = () => {
    setEditingGuest(null);
    setForm({ name: "", email: "", phone: "", plusOne: false });
    setDialogOpen(true);
  };

  const openEdit = (guest: Guest) => {
    setEditingGuest(guest);
    setForm({ name: guest.name, email: guest.email, phone: guest.phone, plusOne: guest.plusOne });
    setDialogOpen(true);
  };

  const handleSave = () => {
    if (!form.name.trim() || !form.phone.trim()) return;
    if (editingGuest) {
      setGuests((prev) => prev.map((g) => g.id === editingGuest.id ? { ...g, ...form } : g));
    } else {
      const newGuest: Guest = {
        id: Date.now().toString(),
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        status: "pending",
        plusOne: form.plusOne,
      };
      setGuests((prev) => [...prev, newGuest]);
    }
    setDialogOpen(false);
  };

  const deleteGuest = (id: string) => {
    setGuests((prev) => prev.filter((g) => g.id !== id));
  };

  const statusIcon = (status: string) => {
    switch (status) {
      case "confirmed": return <span className="flex items-center gap-1 text-xs text-success"><CheckCircle className="w-3 h-3" /> Confirmed</span>;
      case "pending": return <span className="flex items-center gap-1 text-xs text-warning"><Clock className="w-3 h-3" /> Pending</span>;
      case "declined": return <span className="flex items-center gap-1 text-xs text-destructive"><XCircle className="w-3 h-3" /> Declined</span>;
    }
  };

  return (
    <div className="bg-background">
      <Container className="pt-4 pb-10">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground md:text-3xl">Guest List</h1>
            <p className="text-sm text-muted-foreground">{guests.length} total attendees</p>
          </div>
          <button onClick={openAdd} className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
            <Plus className="w-5 h-5" />
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-4 md:gap-4">
          <div className="bg-card rounded-xl border border-border p-3 text-center">
            <CheckCircle className="w-6 h-6 text-success mx-auto mb-1" />
            <p className="text-xl font-bold text-foreground">{confirmed}</p>
            <p className="text-xs text-muted-foreground">Confirmed</p>
          </div>
          <div className="bg-card rounded-xl border border-border p-3 text-center">
            <Clock className="w-6 h-6 text-warning mx-auto mb-1" />
            <p className="text-xl font-bold text-foreground">{pending}</p>
            <p className="text-xs text-muted-foreground">Pending</p>
          </div>
          <div className="bg-card rounded-xl border border-border p-3 text-center">
            <XCircle className="w-6 h-6 text-destructive mx-auto mb-1" />
            <p className="text-xl font-bold text-foreground">{declined}</p>
            <p className="text-xs text-muted-foreground">Declined</p>
          </div>
        </div>

        {/* Search */}
        <div className="flex gap-2 mb-3 md:max-w-md">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search guests..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-card border border-border rounded-lg text-sm"
            />
          </div>
          <button className="p-2.5 bg-card border border-border rounded-lg">
            <Filter className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-4">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                activeFilter === f
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border border-border text-foreground"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-foreground">All Guests ({filtered.length})</h2>
          <button onClick={() => { setInviteDialogOpen(true); setCopied(false); }} className="flex items-center gap-1 text-sm text-primary">
            <Mail className="w-4 h-4" /> Send Invites
          </button>
        </div>

        <div className="grid gap-3 md:grid-cols-2 md:gap-4 lg:grid-cols-3">
          {filtered.map((guest) => (
            <div key={guest.id} className="bg-card rounded-xl border border-border p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-semibold text-foreground">{guest.name}</h4>
                  {guest.plusOne && (
                    <span className="inline-block text-[10px] bg-accent text-accent-foreground px-2 py-0.5 rounded-full mt-1">
                      +1 Guest
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {statusIcon(guest.status)}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="p-1 rounded-md hover:bg-accent">
                        <MoreVertical className="w-4 h-4 text-muted-foreground" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => openEdit(guest)}>
                        <Pencil className="w-4 h-4 mr-2" /> Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive" onClick={() => deleteGuest(guest.id)}>
                        <Trash2 className="w-4 h-4 mr-2" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              <div className="mt-2 space-y-1">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Mail className="w-3 h-3" /> {guest.email}
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Phone className="w-3 h-3" /> {guest.phone}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{editingGuest ? "Edit Guest" : "Add Guest"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Guest Name *</label>
              <input
                type="text"
                placeholder="Enter full name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full mt-1 px-4 py-3 bg-muted/50 border border-border rounded-xl text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Email Address</label>
              <input
                type="email"
                placeholder="guest@email.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full mt-1 px-4 py-3 bg-muted/50 border border-border rounded-xl text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Phone Number *</label>
              <input
                type="tel"
                placeholder="+1 (555) 000-0000"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full mt-1 px-4 py-3 bg-muted/50 border border-border rounded-xl text-sm"
              />
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                checked={form.plusOne}
                onCheckedChange={(checked) => setForm({ ...form, plusOne: !!checked })}
              />
              <label className="text-sm text-foreground">Allow +1 Guest</label>
            </div>
            <div className="flex gap-3 pt-2">
              <Button variant="outline" className="flex-1 rounded-xl" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button className="flex-1 rounded-xl" onClick={handleSave}>
                {editingGuest ? "Save Changes" : "Add Guest"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Send Invitations Dialog */}
      <Dialog open={inviteDialogOpen} onOpenChange={setInviteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Send Invitations</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="bg-muted/50 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">RSVP Link</p>
                  <p className="text-xs text-muted-foreground">Share this link with your guests</p>
                </div>
              </div>
              <div className="bg-card border border-border rounded-xl px-4 py-3 text-sm text-muted-foreground break-all">
                {rsvpLink}
              </div>
              <Button
                variant="outline"
                className="w-full mt-3 rounded-xl"
                onClick={() => {
                  navigator.clipboard.writeText(rsvpLink);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
              >
                <Copy className="w-4 h-4 mr-2" />
                {copied ? "Copied!" : "Copy Link"}
              </Button>
            </div>

            <p className="text-sm text-muted-foreground">
              Invitations will be sent to all pending guests via SMS and email with the RSVP link.
            </p>

            <div className="flex items-center justify-between bg-card border border-border rounded-xl px-4 py-3">
              <span className="text-sm font-medium text-foreground">Pending Guests</span>
              <span className="text-sm font-bold text-primary">{pending}</span>
            </div>

            <div className="flex gap-3 pt-2">
              <Button variant="outline" className="flex-1 rounded-xl" onClick={() => setInviteDialogOpen(false)}>
                Cancel
              </Button>
              <Button className="flex-1 rounded-xl" onClick={() => setInviteDialogOpen(false)}>
                <Mail className="w-4 h-4 mr-2" /> Send Now
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GuestsPage;
