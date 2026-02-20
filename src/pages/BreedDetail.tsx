import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Heart, Zap, Scissors, Star, Dog, Clock, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getBreedById, energyLabel, sheddingLabel, groomingLabel } from "@/data/breeds";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

function StatBar({ value, label }: { value: number; label: string }) {
  const pct = Math.round(value * 100);
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>{label}</span>
        <span>{pct}%</span>
      </div>
      <div className="h-2 rounded-full bg-muted overflow-hidden">
        <div
          className="h-full rounded-full bg-primary transition-all duration-700"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-sm px-3 py-1.5 rounded-full bg-muted border border-border text-muted-foreground font-medium">
      {children}
    </span>
  );
}

export default function BreedDetail() {
  const { id } = useParams<{ id: string }>();
  const breed = getBreedById(id || "");

  if (!breed) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Navbar />
        <div className="text-center">
          <div className="text-6xl mb-4">🐾</div>
          <h2 className="font-heading font-bold text-2xl text-foreground mb-2">Breed not found</h2>
          <Link to="/breeds">
            <Button className="rounded-pill bg-primary text-primary-foreground mt-4">
              Back to Breeds
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const avgHeight = ((breed.minHeight + breed.maxHeight) / 2 / 2.54).toFixed(0);
  const minWeightLbs = (breed.minWeight * 2.205).toFixed(0);
  const maxWeightLbs = (breed.maxWeight * 2.205).toFixed(0);

  const imgSrc = breed.imageUrl;

  // Build "Best for" and "Not ideal if" from traits
  const bestFor: string[] = [];
  const notIdeal: string[] = [];

  if (breed.isApartmentFriendly) bestFor.push("Apartment living");
  else notIdeal.push("Small apartments");

  if (breed.isAllergyFriendly) bestFor.push("Allergy sufferers");
  else notIdeal.push("Households with dog allergies");

  if (breed.isGoodWithKids) bestFor.push("Families with kids");
  else notIdeal.push("Homes with very young children");

  if (breed.trainabilityValue >= 0.8) bestFor.push("First-time owners");
  if (breed.energyLevelValue >= 0.8) {
    bestFor.push("Active, outdoorsy lifestyles");
    notIdeal.push("Sedentary households");
  } else if (breed.energyLevelValue <= 0.4) {
    bestFor.push("Laid-back, homebody owners");
    notIdeal.push("Runners/hikers wanting a workout partner");
  }

  if (breed.sheddingValue <= 0.2) bestFor.push("Neat freaks / clean houses");
  else if (breed.sheddingValue >= 0.6) notIdeal.push("Anyone with a fur-phobia");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20">
        {/* Breadcrumb */}
        <div className="container mx-auto px-4 py-4">
          <Link
            to="/breeds"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Breeds
          </Link>
        </div>

        {/* Hero */}
        <div className="container mx-auto px-4 pb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            {/* Image */}
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3] bg-muted border border-border">
              <img
                src={imgSrc}
                alt={breed.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
            </div>

            {/* Info */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-sm px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary font-medium">
                    {breed.group}
                  </span>
                  <span className="text-sm px-3 py-1 rounded-full border border-border bg-muted text-muted-foreground">
                    {breed.sizeCategory}
                  </span>
                  {breed.isAllergyFriendly && (
                    <span className="text-sm px-3 py-1 rounded-full border border-accent/30 bg-accent/10 text-accent">
                      🌿 Hypoallergenic
                    </span>
                  )}
                </div>
                <h1 className="font-heading font-black text-4xl md:text-5xl text-foreground">{breed.name}</h1>
                <p className="text-muted-foreground mt-2 text-lg">{breed.temperament}</p>
              </div>

              {/* Quick stats chips */}
              <div className="flex flex-wrap gap-2">
                <Chip>📏 ~{avgHeight}" tall</Chip>
                <Chip>⚖️ {minWeightLbs}–{maxWeightLbs} lbs</Chip>
                <Chip>🎂 {breed.minExpectancy}–{breed.maxExpectancy} yrs</Chip>
                <Chip>⚡ {energyLabel(breed.energyLevelValue)} energy</Chip>
                <Chip>✂️ {groomingLabel(breed.groomingFrequencyValue)} grooming</Chip>
                <Chip>🌪️ {sheddingLabel(breed.sheddingValue)} shedding</Chip>
              </div>

              {/* Stat bars */}
              <div className="card-soft rounded-2xl p-5 space-y-3">
                <h3 className="font-heading font-semibold text-foreground mb-4">Trait Overview</h3>
                <StatBar value={breed.energyLevelValue} label="Energy Level" />
                <StatBar value={breed.trainabilityValue} label="Trainability" />
                <StatBar value={breed.groomingFrequencyValue} label="Grooming Needs" />
                <StatBar value={breed.sheddingValue} label="Shedding" />
                <StatBar value={breed.demeanorValue} label="Friendliness" />
              </div>

              {/* CTAs */}
              <div className="flex gap-3 flex-wrap">
                <Link to="/quiz">
                  <Button className="rounded-pill bg-accent text-accent-foreground hover:bg-accent/90 font-heading font-semibold gap-2">
                    <Star className="w-4 h-4" />
                    Take the Quiz
                  </Button>
                </Link>
                <Link to="/adopt">
                  <Button variant="outline" className="rounded-pill border-primary/50 text-primary hover:bg-primary/10 font-heading font-semibold gap-2">
                    <Heart className="w-4 h-4" />
                    Find Adoptable Dogs
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Best for / Not ideal */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card-soft rounded-2xl p-6 border-l-4 border-primary">
              <h3 className="font-heading font-bold text-lg text-foreground mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                Best For
              </h3>
              <ul className="space-y-2">
                {bestFor.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-muted-foreground text-sm">
                    <span className="text-primary mt-0.5">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="card-soft rounded-2xl p-6 border-l-4 border-destructive/60">
              <h3 className="font-heading font-bold text-lg text-foreground mb-4 flex items-center gap-2">
                <XCircle className="w-5 h-5 text-destructive" />
                Not Ideal If...
              </h3>
              <ul className="space-y-2">
                {notIdeal.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-muted-foreground text-sm">
                    <span className="text-destructive mt-0.5">✗</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="container mx-auto px-4 pb-12">
          <p className="text-center text-muted-foreground/60 text-xs italic">
            Breed traits are tendencies, not guarantees — every dog is an individual.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
