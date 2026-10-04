"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Upload } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const amenitiesList = [
  "Parking",
  "Air Conditioning",
  "Catering Services",
  "Audio/Visual Equipment",
  "Stage",
  "Dance Floor",
  "Bridal Suite",
  "Outdoor Space",
  "Kitchen Facilities",
  "Decorations Included",
];

const VenueRegistrationPage = () => {
  const router = useRouter();
  const [venueName, setVenueName] = useState("");
  const [venueType, setVenueType] = useState("");
  const [city, setCity] = useState("");
  const [capacity, setCapacity] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [desiredRent, setDesiredRent] = useState("");
  const [amenities, setAmenities] = useState<string[]>([]);
  const [contactName, setContactName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [agreedTerms, setAgreedTerms] = useState(false);
  const [photos, setPhotos] = useState<File[]>([]);

  const toggleAmenity = (amenity: string) => {
    setAmenities((prev) =>
      prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]
    );
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPhotos(Array.from(e.target.files));
    }
  };

  const isValid =
    venueName.trim() &&
    venueType &&
    city.trim() &&
    capacity.trim() &&
    address.trim() &&
    description.trim() &&
    desiredRent.trim() &&
    contactName.trim() &&
    phone.trim() &&
    email.trim() &&
    agreedTerms;

  const handleSubmit = () => {
    if (!isValid) return;
    toast.success("Venue registration submitted successfully!");
    router.push("/");
  };

  return (
    <div className="bg-background">
      <Container size="form" className="py-4">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
      </Container>

      <Container size="narrow" className="pb-8 md:max-w-3xl">
        <div className="rounded-xl border border-border bg-card p-6 space-y-6 md:p-8">
          <div>
            <h1 className="text-2xl font-bold text-foreground md:text-3xl">Venue Registration Form</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Please provide detailed information about your venue
            </p>
          </div>

          {/* Venue Information */}
          <div className="grid gap-4 md:grid-cols-2">
            <h2 className="text-lg font-semibold text-foreground md:col-span-2">Venue Information</h2>

            <div className="space-y-2">
              <Label>Venue Name *</Label>
              <Input placeholder="Enter venue name" value={venueName} onChange={(e) => setVenueName(e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label>Venue Type *</Label>
              <Select value={venueType} onValueChange={setVenueType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select venue type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="banquet-hall">Banquet Hall</SelectItem>
                  <SelectItem value="garden">Garden</SelectItem>
                  <SelectItem value="hotel">Hotel</SelectItem>
                  <SelectItem value="outdoor">Outdoor</SelectItem>
                  <SelectItem value="farmhouse">Farmhouse</SelectItem>
                  <SelectItem value="marquee">Marquee</SelectItem>
                  <SelectItem value="rooftop">Rooftop</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4 md:col-span-2">
              <div className="space-y-2">
                <Label>City *</Label>
                <Input placeholder="Enter city" value={city} onChange={(e) => setCity(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Capacity (guests) *</Label>
                <Input placeholder="Enter capacity" value={capacity} onChange={(e) => setCapacity(e.target.value)} />
              </div>
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label>Address *</Label>
              <Input placeholder="Enter complete address" value={address} onChange={(e) => setAddress(e.target.value)} />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label>Description *</Label>
              <Textarea
                placeholder="Describe your venue, its unique features, and what makes it special..."
                className="min-h-[100px]"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Desired Rent Per Event (PKR) *</Label>
              <Input placeholder="Enter amount in PKR" value={desiredRent} onChange={(e) => setDesiredRent(e.target.value)} />
            </div>
          </div>

          {/* Amenities */}
          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">Amenities</h2>
            <div className="flex flex-wrap gap-2">
              {amenitiesList.map((amenity) => (
                <button
                  key={amenity}
                  type="button"
                  onClick={() => toggleAmenity(amenity)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-md border text-sm transition-colors ${
                    amenities.includes(amenity)
                      ? "bg-primary/10 border-primary text-primary"
                      : "bg-background border-border text-foreground"
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-sm border flex items-center justify-center ${
                      amenities.includes(amenity)
                        ? "bg-primary border-primary"
                        : "border-muted-foreground"
                    }`}
                  >
                    {amenities.includes(amenity) && (
                      <svg className="w-3 h-3 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  {amenity}
                </button>
              ))}
            </div>
          </div>

          {/* Venue Photos */}
          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">Venue Photos</h2>
            <label className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-border rounded-xl p-8 cursor-pointer hover:border-primary/50 transition-colors">
              <Upload className="w-8 h-8 text-muted-foreground" />
              <span className="text-sm font-medium text-primary">Click to upload photos</span>
              <span className="text-xs text-muted-foreground">
                Upload at least 5 high-quality photos of your venue
              </span>
              <input type="file" multiple accept="image/*" className="hidden" onChange={handlePhotoUpload} />
            </label>
            {photos.length > 0 && (
              <p className="text-xs text-muted-foreground">{photos.length} photo(s) selected</p>
            )}
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-foreground">Contact Information</h2>

            <div className="space-y-2">
              <Label>Contact Person Name *</Label>
              <Input placeholder="Enter contact person name" value={contactName} onChange={(e) => setContactName(e.target.value)} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Phone Number *</Label>
                <Input placeholder="Enter phone number" value={phone} onChange={(e) => setPhone(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Email Address *</Label>
                <Input type="email" placeholder="Enter email address" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
            </div>
          </div>

          {/* Terms */}
          <div className="flex items-start gap-3">
            <Checkbox
              id="terms"
              checked={agreedTerms}
              onCheckedChange={(checked) => setAgreedTerms(checked === true)}
              className="mt-1"
            />
            <label htmlFor="terms" className="text-sm text-muted-foreground leading-relaxed cursor-pointer">
              I agree to the terms and conditions, including the one-time registration fee of PKR 25,000 and 10% commission on each event. I understand that the company will handle client communications and contracts, but will not be liable for any regulations clients may not have followed.
            </label>
          </div>

          {/* Submit */}
          <Button className="w-full h-12 text-base font-semibold" disabled={!isValid} onClick={handleSubmit}>
            Submit Registration
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default VenueRegistrationPage;
