"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Sparkles, ChevronRight, CalendarDays, Building2, CheckCircle2, DollarSign, Info } from "lucide-react";
import heroImage from "@/assets/hero-event.jpg";
import { setStoredValue, useStoredValue } from "@/hooks/use-local-storage";
import { eventTypes } from "@/lib/data";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

type AuthStep = "welcome" | "signup" | "signin";

const HomePage = () => {
  const [authStep, setAuthStep] = useState<AuthStep>("welcome");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [activeTab, setActiveTab] = useState("planning");
  const [authDismissed, setAuthDismissed] = useState(false);

  // `visited` is undefined on the server and during hydration, so neither the dialog nor the
  // content render until the browser's localStorage has been read.
  const visited = useStoredValue("ep_visited");
  const storageReady = visited !== undefined;
  const showAuthDialog = storageReady && !visited && !authDismissed;
  const authenticated = storageReady && Boolean(visited);

  const handleContinueAsGuest = () => {
    setStoredValue("ep_visited", "true");
  };

  const handleSignUp = () => {
    if (!fullName.trim() || !email.trim() || !city) return;
    setStoredValue("ep_user", JSON.stringify({ fullName, email, city }));
    setStoredValue("ep_visited", "true");
  };

  const handleSignIn = () => {
    if (!email.trim()) return;
    setStoredValue("ep_visited", "true");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Auth Dialog */}
      <Dialog open={showAuthDialog} onOpenChange={(open) => setAuthDismissed(!open)}>
        <DialogContent className="max-w-sm">
          {authStep === "welcome" && (
            <>
              <DialogHeader>
                <div className="flex justify-center mb-2">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <DialogTitle className="text-center text-xl">Welcome to EventPlan</DialogTitle>
                <DialogDescription className="text-center">
                  Plan your perfect event or list your venue
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-3 mt-4">
                <Button className="w-full" onClick={() => setAuthStep("signup")}>
                  Sign Up
                </Button>
                <Button variant="outline" className="w-full" onClick={() => setAuthStep("signin")}>
                  Sign In
                </Button>
                <Button variant="ghost" className="w-full text-muted-foreground" onClick={handleContinueAsGuest}>
                  Continue as Guest
                </Button>
              </div>
            </>
          )}

          {authStep === "signup" && (
            <>
              <DialogHeader>
                <DialogTitle className="text-center">Create Account</DialogTitle>
                <DialogDescription className="text-center">
                  Enter your details to get started
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    placeholder="Enter your full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signupEmail">Email Address</Label>
                  <Input
                    id="signupEmail"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <select
                    id="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="flex h-10 w-full items-center rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  >
                    <option value="" disabled>Select your city</option>
                    <option value="Karachi">Karachi</option>
                    <option value="Lahore">Lahore</option>
                    <option value="Islamabad">Islamabad</option>
                    <option value="Rawalpindi">Rawalpindi</option>
                    <option value="Faisalabad">Faisalabad</option>
                    <option value="Multan">Multan</option>
                    <option value="Peshawar">Peshawar</option>
                    <option value="Quetta">Quetta</option>
                    <option value="Sialkot">Sialkot</option>
                    <option value="Hyderabad">Hyderabad</option>
                  </select>
                </div>
                <Button className="w-full" onClick={handleSignUp} disabled={!fullName.trim() || !email.trim() || !city}>
                  Create Account
                </Button>
                <Button variant="ghost" className="w-full" onClick={() => setAuthStep("welcome")}>
                  Back
                </Button>
              </div>
            </>
          )}

          {authStep === "signin" && (
            <>
              <DialogHeader>
                <DialogTitle className="text-center">Welcome Back</DialogTitle>
                <DialogDescription className="text-center">
                  Sign in to your account
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="signinEmail">Email Address</Label>
                  <Input
                    id="signinEmail"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <Button className="w-full" onClick={handleSignIn} disabled={!email.trim()}>
                  Sign In
                </Button>
                <Button variant="ghost" className="w-full" onClick={() => setAuthStep("welcome")}>
                  Back
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Hero Section */}
      <div className="relative h-72 overflow-hidden">
        <Image
          src={heroImage}
          alt="Event planning"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/30 via-black/40 to-background" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <div className="w-12 h-12 rounded-full bg-card/20 backdrop-blur-xs flex items-center justify-center mb-4">
            <Sparkles className="w-6 h-6 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-primary-foreground mb-2">EventPlan</h1>
          <p className="text-primary-foreground/80 text-sm">
            Let&apos;s create something unforgettable together
          </p>
        </div>
      </div>

      {/* Tab Switcher */}
      {authenticated && (
        <div className="px-4 pt-6 max-w-lg mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full grid grid-cols-2">
              <TabsTrigger value="planning" className="gap-2">
                <CalendarDays className="w-4 h-4" />
                I&apos;m Planning an Event
              </TabsTrigger>
              <TabsTrigger value="venue" className="gap-2">
                <Building2 className="w-4 h-4" />
                Manage My Venue
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      )}

      {/* Content based on active tab */}
      {authenticated && activeTab === "planning" && (
        <div className="px-4 py-6 max-w-lg mx-auto">
          <p className="text-xs font-semibold tracking-widest text-muted-foreground mb-4">
            CHOOSE YOUR EVENT
          </p>
          <div className="space-y-3">
            {eventTypes.map((event) => (
              <Link
                key={event.id}
                href={`/services/${event.id}`}
                className="w-full flex items-center gap-4 p-4 bg-card rounded-xl border border-border text-center hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center text-2xl">
                  {event.icon}
                </div>
                <div className="flex-1 text-left">
                  <h3 className="font-semibold text-foreground">{event.name}</h3>
                  <p className="text-sm text-muted-foreground">{event.description}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </Link>
            ))}
          </div>
          <p className="text-center text-xs text-muted-foreground mt-8">
            Crafted with care for your special moments
          </p>
        </div>
      )}

      {authenticated && activeTab === "venue" && (
        <div className="px-4 py-6 max-w-lg mx-auto space-y-6">
          {/* How It Works */}
          <div className="rounded-xl border border-primary/20 bg-primary/5 p-5 space-y-3">
            <h2 className="font-bold text-foreground text-lg">How It Works</h2>
            <ul className="space-y-3">
              {[
                "List your venue with us in just a few simple steps",
                "We promote your space to our network of clients",
                "We manage all bookings, inquiries, and contracts",
                "We take care of post-event cleaning",
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
              The company will communicate with clients and ensure all contracts are properly signed with necessary regulations. However, the company will not be liable for any regulations that the client may not have followed. All contractual obligations between venue owners and clients are clearly outlined in our standard agreement.
            </p>
          </div>

          <Button asChild className="w-full h-12 text-base font-semibold text-center">
            <Link href="/venue-registration">Register My Venue</Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default HomePage;
