export const eventTypes = [
  { id: "wedding", name: "Wedding", description: "Plan your dream wedding", icon: "💒" },
  { id: "birthday", name: "Birthday Party", description: "Celebrate in style", icon: "🎂" },
  { id: "corporate", name: "Corporate Event", description: "Professional gatherings", icon: "🏢" },
  { id: "other", name: "Other Celebrations", description: "Custom celebration", icon: "🎉" },
];

export const vendorCategories = [
  { id: "photographers", name: "Photographers & Videographers", icon: "Camera" },
  { id: "makeup", name: "Makeup Artists", icon: "Sparkles" },
  { id: "bridal", name: "Bridal Designers", icon: "Scissors" },
  { id: "cards", name: "Wedding Cards", icon: "Mail" },
  { id: "giveaways", name: "Giveaways", icon: "Gift" },
  { id: "contracts", name: "Nikkah Contract Designers", icon: "FileText" },
  { id: "performers", name: "Performers & Musicians", icon: "Music" },
  { id: "cakes", name: "Wedding Cakes", icon: "Cake" },
  { id: "designers", name: "Event Designers", icon: "Sparkles" },
];

export const venues = [
  {
    id: "1",
    name: "Grand Ballroom at Meridian",
    location: "Downtown, City Center",
    capacity: "200-500 guests",
    rating: 4.9,
    price: "$$$",
    type: "Indoor",
    image: "",
  },
  {
    id: "2",
    name: "Rosewood Garden Estate",
    location: "Hillside District",
    capacity: "100-300 guests",
    rating: 4.8,
    price: "$$$$",
    type: "Gardens",
    image: "",
  },
  {
    id: "3",
    name: "Sunset Terrace Hotel",
    location: "Beachfront Avenue",
    capacity: "50-150 guests",
    rating: 4.7,
    price: "$$",
    type: "Hotels",
    image: "",
  },
  {
    id: "4",
    name: "The Lakeside Pavilion",
    location: "Lake District",
    capacity: "100-400 guests",
    rating: 4.6,
    price: "$$$",
    type: "Outdoor",
    image: "",
  },
];

export const sampleGuests = [
  { id: "1", name: "Sarah Johnson", email: "sarah.j@email.com", phone: "+1 (555) 123-4567", status: "confirmed" as const, plusOne: true },
  { id: "2", name: "Michael Chen", email: "michael.chen@email.com", phone: "+1 (555) 234-5678", status: "confirmed" as const, plusOne: false },
  { id: "3", name: "Emily Rodriguez", email: "emily.r@email.com", phone: "+1 (555) 345-6789", status: "pending" as const, plusOne: true },
  { id: "4", name: "David Kim", email: "david.kim@email.com", phone: "+1 (555) 456-7890", status: "confirmed" as const, plusOne: true },
  { id: "5", name: "Lisa Thompson", email: "lisa.t@email.com", phone: "+1 (555) 567-8901", status: "pending" as const, plusOne: false },
  { id: "6", name: "James Wilson", email: "james.w@email.com", phone: "+1 (555) 678-9012", status: "declined" as const, plusOne: false },
];

export const budgetCategories = [
  { name: "Venue", allocated: 100000, spent: 20000 },
  { name: "Catering", allocated: 100000, spent: 200000 },
  { name: "Photography", allocated: 100000, spent: 100000 },
  { name: "Decorations", allocated: 100000, spent: 0 },
  { name: "Entertainment", allocated: 100000, spent: 0 },
  { name: "Attire", allocated: 100000, spent: 0 },
  { name: "Invitations", allocated: 50000, spent: 0 },
  { name: "Miscellaneous", allocated: 50000, spent: 0 },
];

export const sampleTasks = [
  { id: "1", title: "Send save-the-date cards", date: "Apr 25", done: false, urgent: true },
  { id: "2", title: "Finalize menu with caterer", date: "Apr 30", done: false, urgent: false },
  { id: "3", title: "Book transportation", date: "May 1", done: false, urgent: false },
];
