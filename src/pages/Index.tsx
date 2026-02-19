import heroDogsImg from "@/assets/hero-dogs.jpg";
import meAndMaltImg from "@/assets/meandmalt.jpg";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Search, Sparkles, Dog, Home, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const pillars = [
  {
    icon: "🧠",
    title: "You",
    desc: "Your personality, lifestyle, energy, and the kind of dog owner you truly are. We meet you where you're at.",
  },
  {
    icon: "🏠",
    title: "Your Home",
    desc: "Space, noise levels, yard access, and any landlord rules all shape the perfect match. Your home matters too.",
  },
  {
    icon: "⏰",
    title: "Your Reality",
    desc: "Time, grooming budget, shedding tolerance, and allergies. The real-life details that make a match last.",
  },
];

const ctaCards = [
  {
    icon: "🔍",
    title: "Browse Dog Breeds",
    desc: "Explore breeds by size, temperament, shedding, and energy. 100+ breeds with real data.",
    button: "Explore Breeds",
    href: "/breeds",
    color: "border-primary/40 hover:border-primary",
    buttonClass: "bg-primary text-primary-foreground hover:bg-primary/90",
  },
  {
    icon: "✨",
    title: "Take the Quiz",
    desc: "10 questions. A match you can actually live with. We do the science; you do the loving.",
    button: "Start the Quiz",
    href: "/quiz",
    color: "border-accent/60 hover:border-accent",
    buttonClass: "bg-accent text-accent-foreground hover:bg-accent/90",
    featured: true,
  },
  {
    icon: "❤️",
    title: "Adopt Don't Shop",
    desc: "Find real dogs from rescues and shelters near you. They're waiting right now.",
    button: "See Adoptable Dogs",
    href: "/adopt",
    color: "border-secondary/40 hover:border-secondary",
    buttonClass: "bg-secondary text-secondary-foreground hover:bg-secondary/90",
  },
];

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-28 pb-20 overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-32 right-1/4 w-64 h-64 bg-accent/8 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Copy */}
            <div className="space-y-6 animate-fade-up">
              <div className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full border border-accent/30 bg-accent/10 text-accent">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Personality-first dog matching</span>
              </div>

              <h1 className="font-heading font-black text-5xl md:text-6xl leading-[1.05] text-foreground">
                Meet the dog that{" "}
                <span className="gradient-text">actually fits</span>{" "}
                your life.
              </h1>

              <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
                Dog Match pairs your personality and your environment: home size, energy, allergies,
                schedule, and budget to breeds and adoptable dogs near you.
              </p>

              <p className="text-sm text-muted-foreground/70 italic">
                "Perfect humans don't exist but perfect dogs do."
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3 pt-2">
                <Link to="/quiz">
                  <Button
                    size="lg"
                    className="rounded-pill bg-accent text-accent-foreground hover:bg-accent/90 font-heading font-bold text-base px-8 shadow-glow-accent gap-2 animate-pulse-glow"
                  >
                    Take the Quiz
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link to="/breeds">
                  <Button
                    size="lg"
                    variant="outline"
                    className="rounded-pill border-primary/50 text-primary hover:bg-primary/10 font-heading font-semibold text-base px-8 gap-2"
                  >
                    <Search className="w-4 h-4" />
                    Browse Breeds
                  </Button>
                </Link>
                <Link to="/adopt">
                  <Button
                    size="lg"
                    variant="ghost"
                    className="rounded-pill text-muted-foreground hover:text-accent hover:bg-accent/10 font-heading font-semibold text-base px-6 gap-2"
                  >
                    <Heart className="w-4 h-4" />
                    Adopt Don't Shop
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right: Hero Image */}
            <div className="relative flex justify-center lg:justify-end animate-fade-in">
              <div className="relative w-full max-w-lg">
                <div className="absolute inset-0 bg-primary/20 rounded-3xl blur-2xl scale-95" />
                <img
                  src={heroDogsImg}
                  alt="A golden retriever in a cozy apartment"
                  className="relative w-full rounded-3xl border border-border shadow-card animate-float"
                />
                {/* Floating badge */}
                <div className="absolute -bottom-4 -left-4 bg-card border border-border rounded-2xl px-4 py-3 shadow-card flex items-center gap-2">
                  <span className="text-2xl">🐾</span>
                  <div>
                    <p className="font-heading font-bold text-sm text-foreground">100+ Breeds</p>
                    <p className="text-xs text-muted-foreground">Data-driven matching</p>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 bg-accent rounded-2xl px-4 py-3 shadow-glow-accent flex items-center gap-2">
                  <Heart className="w-4 h-4 text-accent-foreground" />
                  <p className="font-heading font-bold text-sm text-accent-foreground">Adopt First</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How We Match Strip */}
      <section className="py-16 border-y border-border bg-card/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <p className="text-accent font-semibold text-sm uppercase tracking-widest mb-2">How it works</p>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground">
              Cute isn't a strategy.{" "}
              <span className="gradient-text">Compatibility is.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pillars.map((pillar) => (
              <div
                key={pillar.title}
                className="card-soft text-center flex flex-col items-center gap-4 rounded-2xl p-8 hover:border-primary/40 transition-colors"
              >
                <div className="text-5xl">{pillar.icon}</div>
                <h3 className="font-heading font-bold text-xl text-foreground">{pillar.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Tiles */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-3">
              Where do you want to start?
            </h2>
            <p className="text-muted-foreground text-lg">No wrong answer — every path leads to a good dog.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {ctaCards.map((card) => (
              <div
                key={card.title}
                className={`card-soft flex flex-col gap-5 rounded-2xl p-7 border-2 transition-all duration-300 hover:-translate-y-1 ${card.color} ${card.featured ? "ring-2 ring-accent/40 shadow-glow-accent" : ""}`}
              >
                <div className="text-4xl">{card.icon}</div>
                <div>
                  <h3 className="font-heading font-bold text-xl text-foreground mb-2">{card.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{card.desc}</p>
                </div>
                <Link to={card.href} className="mt-auto">
                  <Button className={`w-full rounded-pill font-heading font-semibold ${card.buttonClass}`}>
                    {card.button}
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 border-t border-border bg-card/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              {/* Photo placeholder */}
              <div className="relative">
                <div className="aspect-square rounded-3xl bg-muted border border-border overflow-hidden max-w-sm mx-auto">
                  <img
                    src={meAndMaltImg}
                    alt="Hriyanka and Malt"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-center">
                    <p className="font-heading font-bold text-foreground text-sm">Hriyanka & Malt 🐾</p>
                  </div>
                </div>
              </div>

              {/* Copy */}
              <div className="space-y-5">
                <div>
                  <p className="text-accent font-semibold text-sm uppercase tracking-widest mb-2">About Dog Match</p>
                  <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground">
                    Built by a dog person, for dog people.
                  </h2>
                </div>

                <p className="text-muted-foreground leading-relaxed">
                  Hi, I'm <span className="text-foreground font-semibold">Hriyanka</span>. I'm the kind of person who will 
                  cross the street to say hi to a dog and accidentally ignore the human holding the leash. 
                  My dog Malt changed my life and I genuinely believe no house is a home without a 
                  four-legged furry shadow following you around.
                </p>

                <p className="text-muted-foreground leading-relaxed">
                  Dog Match is my attempt to make sure people choose dogs with their whole lifestyle in mind,
                  not just their camera roll.
                </p>

                <div className="card-soft rounded-2xl p-5 border-l-4 border-accent">
                  <p className="text-foreground text-sm italic leading-relaxed">
                    "We're a guide, not a guarantee. Every dog is an individual. But giving a dog the right 
                    home from day one? That's how you save two lives."
                  </p>
                </div>

                <Link to="/quiz">
                  <Button className="rounded-pill bg-accent text-accent-foreground hover:bg-accent/90 font-heading font-semibold gap-2">
                    Find My Match
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
