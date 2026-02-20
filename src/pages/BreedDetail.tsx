import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ArrowLeft, Heart, Star, CheckCircle2, XCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getBreedById, energyLabel, sheddingLabel, groomingLabel, breeds, getBreedUrl } from "@/data/breeds";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Map our breed names to Dog CEO API format
function toDogCeoBreed(name: string): string | null {
  const map: Record<string, string> = {
    "Affenpinscher": "affenpinscher",
    "Afghan Hound": "hound/afghan",
    "Airedale Terrier": "terrier/airedale",
    "Akita": "akita",
    "Alaskan Malamute": "malamute",
    "Australian Cattle Dog": "cattledog/australian",
    "Australian Shepherd": "australian/shepherd",
    "Australian Terrier": "terrier/australian",
    "Basenji": "basenji",
    "Basset Hound": "hound/basset",
    "Beagle": "beagle",
    "Belgian Malinois": "malinois",
    "Bernese Mountain Dog": "mountain/bernese",
    "Bichon Frise": "bichon",
    "Bloodhound": "hound/blood",
    "Border Collie": "collie/border",
    "Border Terrier": "terrier/border",
    "Boston Terrier": "terrier/boston",
    "Boxer": "boxer",
    "Bull Terrier": "terrier/bull",
    "Cairn Terrier": "terrier/cairn",
    "Cardigan Welsh Corgi": "corgi/cardigan",
    "Cavalier King Charles Spaniel": "spaniel/cocker",
    "Chihuahua": "chihuahua",
    "Chow Chow": "chow",
    "Cocker Spaniel": "spaniel/cocker",
    "Collie": "collie/border",
    "Dachshund": "dachshund",
    "Dalmatian": "dalmatian",
    "Doberman Pinscher": "doberman",
    "English Springer Spaniel": "spaniel/springer",
    "French Bulldog": "bulldog/french",
    "German Shepherd Dog": "germanshepherd",
    "German Shorthaired Pointer": "pointer/germanlonghair",
    "Golden Retriever": "retriever/golden",
    "Great Dane": "dane/great",
    "Greyhound": "greyhound/italian",
    "Havanese": "havanese",
    "Irish Setter": "setter/irish",
    "Irish Wolfhound": "wolfhound/irish",
    "Italian Greyhound": "greyhound/italian",
    "Labrador Retriever": "labrador",
    "Maltese": "maltese",
    "Mastiff": "mastiff",
    "Miniature Pinscher": "pinscher/miniature",
    "Miniature Schnauzer": "schnauzer/miniature",
    "Newfoundland": "newfoundland",
    "Papillon": "papillon",
    "Pembroke Welsh Corgi": "corgi/cardigan",
    "Pomeranian": "pomeranian",
    "Poodle": "poodle/standard",
    "Poodle (Miniature)": "poodle/miniature",
    "Poodle (Standard)": "poodle/standard",
    "Poodle (Toy)": "poodle/toy",
    "Pug": "pug",
    "Rhodesian Ridgeback": "ridgeback/rhodesian",
    "Rottweiler": "rottweiler",
    "Saint Bernard": "stbernard",
    "Samoyed": "samoyed",
    "Scottish Terrier": "terrier/scottish",
    "Shetland Sheepdog": "sheepdog/shetland",
    "Shiba Inu": "shiba",
    "Shih Tzu": "shihtzu",
    "Siberian Husky": "husky",
    "Vizsla": "vizsla",
    "Weimaraner": "weimaraner",
    "West Highland White Terrier": "terrier/westhighland",
    "Whippet": "whippet",
    "Yorkshire Terrier": "terrier/yorkshire",
  };
  return map[name] || null;
}

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

// Fun facts per breed group
function getGroupFacts(group: string): string[] {
  const facts: Record<string, string[]> = {
    "Herding Group": [
      "Herding breeds were developed to move livestock by stalking, chasing, or barking.",
      "Many herding dogs will instinctively try to 'herd' children or other pets.",
      "These dogs tend to be highly intelligent and need mental stimulation daily.",
    ],
    "Sporting Group": [
      "Sporting dogs were bred to assist hunters in finding and retrieving game.",
      "They typically have excellent noses and love water.",
      "Most sporting breeds are naturally active and require regular vigorous exercise.",
    ],
    "Working Group": [
      "Working dogs were bred to perform tasks like guarding, pulling sleds, and water rescue.",
      "They tend to be large, intelligent, and loyal — but need experienced owners.",
      "Many working breeds have a strong protective instinct toward their families.",
    ],
    "Hound Group": [
      "Hounds were bred to hunt by sight or scent — sometimes both.",
      "Scent hounds have an extraordinary sense of smell, up to 100,000× better than humans.",
      "Many hounds are known for their distinctive baying or howling.",
    ],
    "Terrier Group": [
      "Terriers were bred to hunt and kill vermin like rats and foxes.",
      "The word 'terrier' comes from the Latin 'terra' meaning earth — they'd dig into burrows.",
      "Terriers are known for their feisty, tenacious personalities.",
    ],
    "Toy Group": [
      "Toy breeds were developed primarily as companions and lap dogs.",
      "Despite their small size, many toy breeds have big, bold personalities.",
      "They often live longer than larger breeds — some reaching 16+ years.",
    ],
    "Non-Sporting Group": [
      "Non-sporting breeds are a diverse group that don't fit neatly into other categories.",
      "This group includes everything from Dalmatians to Poodles to Bulldogs.",
      "Their purposes historically ranged widely from circus dogs to water retrievers.",
    ],
  };
  return facts[group] || [
    "This breed has a rich history spanning hundreds of years.",
    "Every dog is an individual — breed traits are tendencies, not guarantees.",
    "Early socialization is key for any breed.",
  ];
}

// Care guide based on traits
function getCareGuide(breed: ReturnType<typeof getBreedById>) {
  if (!breed) return [];
  const guide = [];
  
  if (breed.energyLevelValue >= 0.8) {
    guide.push({ icon: "🏃", title: "Exercise", tip: "Needs 60–90 min of vigorous activity daily. Running, hiking, fetch, or dog sports are ideal." });
  } else if (breed.energyLevelValue >= 0.6) {
    guide.push({ icon: "🚶", title: "Exercise", tip: "2 solid walks per day plus some playtime. A tired dog is a happy dog." });
  } else {
    guide.push({ icon: "🛋️", title: "Exercise", tip: "Moderate exercise — a couple of daily walks is usually enough. Great for homebody owners." });
  }

  if (breed.groomingFrequencyValue >= 0.8) {
    guide.push({ icon: "✂️", title: "Grooming", tip: "Daily brushing required to prevent mats. Professional grooming every 6–8 weeks is recommended." });
  } else if (breed.groomingFrequencyValue >= 0.6) {
    guide.push({ icon: "🪮", title: "Grooming", tip: "Brush 2–3 times per week. Professional grooming every 2–3 months keeps them looking sharp." });
  } else {
    guide.push({ icon: "🛁", title: "Grooming", tip: "Low maintenance — a quick brush weekly and a bath when needed. One of the easier breeds to groom." });
  }

  if (breed.trainabilityValue >= 0.8) {
    guide.push({ icon: "🎓", title: "Training", tip: "Highly trainable and eager to please. Positive reinforcement works great — they pick up commands fast." });
  } else if (breed.trainabilityValue >= 0.6) {
    guide.push({ icon: "📚", title: "Training", tip: "Generally trainable with consistency. Keep sessions short, fun, and reward-based." });
  } else {
    guide.push({ icon: "🧩", title: "Training", tip: "Independent thinkers — patience is key. They're smart but may choose when to listen. Professional classes can help." });
  }

  if (breed.isGoodWithKids) {
    guide.push({ icon: "👶", title: "Kids & Family", tip: "Generally great with children. Still supervise interactions with very young kids — any dog can have an off day." });
  } else {
    guide.push({ icon: "⚠️", title: "Kids & Family", tip: "Better suited for homes with older kids or adults. Early socialization with children is important." });
  }

  return guide;
}

export default function BreedDetail() {
  const { id } = useParams<{ id: string }>();
  const breed = getBreedById(id || "");
  const [photos, setPhotos] = useState<string[]>([]);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [photosLoading, setPhotosLoading] = useState(true);

  useEffect(() => {
    if (!breed) return;
    const dogCeoBreed = toDogCeoBreed(breed.name);
    if (!dogCeoBreed) {
      setPhotos([breed.imageUrl]);
      setPhotosLoading(false);
      return;
    }
    fetch(`https://dog.ceo/api/breed/${dogCeoBreed}/images/random/4`)
      .then(r => r.json())
      .then(data => {
        if (data.status === "success" && data.message?.length) {
          setPhotos(data.message);
        } else {
          setPhotos([breed.imageUrl]);
        }
      })
      .catch(() => setPhotos([breed.imageUrl]))
      .finally(() => setPhotosLoading(false));
  }, [breed]);

  if (!breed) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Navbar />
        <div className="text-center">
          <div className="text-6xl mb-4">🐾</div>
          <h2 className="font-heading font-bold text-2xl text-foreground mb-2">Breed not found</h2>
          <Link to="/breeds">
            <Button className="rounded-pill bg-primary text-primary-foreground mt-4">Back to Breeds</Button>
          </Link>
        </div>
      </div>
    );
  }

  const avgHeight = ((breed.minHeight + breed.maxHeight) / 2 / 2.54).toFixed(0);
  const minWeightLbs = (breed.minWeight * 2.205).toFixed(0);
  const maxWeightLbs = (breed.maxWeight * 2.205).toFixed(0);
  const careGuide = getCareGuide(breed);
  const groupFacts = getGroupFacts(breed.group);

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

  // Similar breeds — same group, similar size
  const similarBreeds = breeds
    .filter(b => b.name !== breed.name && b.group === breed.group && b.sizeCategory === breed.sizeCategory)
    .slice(0, 3);

  const currentPhoto = photos[photoIndex] || breed.imageUrl;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20">
        {/* Breadcrumb */}
        <div className="container mx-auto px-4 py-4">
          <Link to="/breeds" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Breeds
          </Link>
        </div>

        {/* Hero */}
        <div className="container mx-auto px-4 pb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            {/* Photo gallery */}
            <div className="space-y-3">
              <div className="relative rounded-3xl overflow-hidden aspect-[4/3] bg-muted border border-border">
                {photosLoading ? (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-4xl animate-pulse">🐾</div>
                  </div>
                ) : (
                  <img src={currentPhoto} alt={breed.name} className="w-full h-full object-cover" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
                {photos.length > 1 && (
                  <>
                    <button
                      onClick={() => setPhotoIndex(i => (i - 1 + photos.length) % photos.length)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background rounded-full p-2 transition-all"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setPhotoIndex(i => (i + 1) % photos.length)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background rounded-full p-2 transition-all"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                      {photos.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setPhotoIndex(i)}
                          className={`w-2 h-2 rounded-full transition-all ${i === photoIndex ? "bg-white scale-125" : "bg-white/50"}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
              {/* Thumbnail strip */}
              {photos.length > 1 && (
                <div className="flex gap-2">
                  {photos.map((p, i) => (
                    <button
                      key={i}
                      onClick={() => setPhotoIndex(i)}
                      className={`flex-1 rounded-xl overflow-hidden aspect-square border-2 transition-all ${i === photoIndex ? "border-accent" : "border-transparent opacity-60 hover:opacity-100"}`}
                    >
                      <img src={p} alt={`${breed.name} ${i + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Info */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-3 mb-2 flex-wrap">
                  <span className="text-sm px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary font-medium">{breed.group}</span>
                  <span className="text-sm px-3 py-1 rounded-full border border-border bg-muted text-muted-foreground">{breed.sizeCategory}</span>
                  {breed.isAllergyFriendly && (
                    <span className="text-sm px-3 py-1 rounded-full border border-accent/30 bg-accent/10 text-accent">🌿 Hypoallergenic</span>
                  )}
                </div>
                <h1 className="font-heading font-black text-4xl md:text-5xl text-foreground">{breed.name}</h1>
                <p className="text-muted-foreground mt-2 text-lg">{breed.temperament}</p>
              </div>

              <div className="flex flex-wrap gap-2">
                <Chip>📏 ~{avgHeight}" tall</Chip>
                <Chip>⚖️ {minWeightLbs}–{maxWeightLbs} lbs</Chip>
                <Chip>🎂 {breed.minExpectancy}–{breed.maxExpectancy} yrs</Chip>
                <Chip>⚡ {energyLabel(breed.energyLevelValue)} energy</Chip>
                <Chip>✂️ {groomingLabel(breed.groomingFrequencyValue)} grooming</Chip>
                <Chip>🌪️ {sheddingLabel(breed.sheddingValue)} shedding</Chip>
              </div>

              <div className="card-soft rounded-2xl p-5 space-y-3">
                <h3 className="font-heading font-semibold text-foreground mb-4">Trait Overview</h3>
                <StatBar value={breed.energyLevelValue} label="Energy Level" />
                <StatBar value={breed.trainabilityValue} label="Trainability" />
                <StatBar value={breed.groomingFrequencyValue} label="Grooming Needs" />
                <StatBar value={breed.sheddingValue} label="Shedding" />
                <StatBar value={breed.demeanorValue} label="Friendliness" />
              </div>

              <div className="flex gap-3 flex-wrap">
                <Link to="/quiz">
                  <Button className="rounded-pill bg-accent text-accent-foreground hover:bg-accent/90 font-heading font-semibold gap-2">
                    <Star className="w-4 h-4" /> Take the Quiz
                  </Button>
                </Link>
                <Link to="/adopt">
                  <Button variant="outline" className="rounded-pill border-primary/50 text-primary hover:bg-primary/10 font-heading font-semibold gap-2">
                    <Heart className="w-4 h-4" /> Find Adoptable Dogs
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
                <CheckCircle2 className="w-5 h-5 text-primary" /> Best For
              </h3>
              <ul className="space-y-2">
                {bestFor.map(item => (
                  <li key={item} className="flex items-start gap-2 text-muted-foreground text-sm">
                    <span className="text-primary mt-0.5">✓</span>{item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="card-soft rounded-2xl p-6 border-l-4 border-destructive/60">
              <h3 className="font-heading font-bold text-lg text-foreground mb-4 flex items-center gap-2">
                <XCircle className="w-5 h-5 text-destructive" /> Not Ideal If...
              </h3>
              <ul className="space-y-2">
                {notIdeal.map(item => (
                  <li key={item} className="flex items-start gap-2 text-muted-foreground text-sm">
                    <span className="text-destructive mt-0.5">✗</span>{item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Care Guide */}
        <div className="container mx-auto px-4 py-8">
          <h2 className="font-heading font-bold text-2xl text-foreground mb-6">Care Guide</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {careGuide.map(item => (
              <div key={item.title} className="card-soft rounded-2xl p-5 flex gap-4 items-start">
                <div className="text-3xl">{item.icon}</div>
                <div>
                  <h4 className="font-heading font-bold text-foreground mb-1">{item.title}</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.tip}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Fun Facts */}
        <div className="container mx-auto px-4 py-8">
          <h2 className="font-heading font-bold text-2xl text-foreground mb-6">Did You Know?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {groupFacts.map((fact, i) => (
              <div key={i} className="card-soft rounded-2xl p-5 border border-border">
                <div className="text-2xl mb-3">{["🐕", "🧠", "🌍"][i]}</div>
                <p className="text-muted-foreground text-sm leading-relaxed">{fact}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Similar Breeds */}
        {similarBreeds.length > 0 && (
          <div className="container mx-auto px-4 py-8">
            <h2 className="font-heading font-bold text-2xl text-foreground mb-6">Similar Breeds</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {similarBreeds.map(b => (
                <Link key={b.name} to={getBreedUrl(b)} className="group">
                  <div className="card-soft rounded-2xl overflow-hidden border border-border hover:border-primary/50 transition-all hover:-translate-y-1">
                    <div className="aspect-[4/3] overflow-hidden bg-muted">
                      <img src={b.imageUrl} alt={b.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    </div>
                    <div className="p-4">
                      <h4 className="font-heading font-bold text-foreground group-hover:text-primary transition-colors">{b.name}</h4>
                      <p className="text-muted-foreground text-xs mt-1">{b.temperament.split(",")[0]}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="container mx-auto px-4 pb-12">
          <p className="text-center text-muted-foreground/60 text-xs italic">
            Breed traits are tendencies, not guarantees — every dog is an individual. Photos sourced from Dog CEO's open-source dog image API.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
