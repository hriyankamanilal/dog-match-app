import { useState, useMemo } from "react";
import { MapPin, Search, SlidersHorizontal, Dog } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AdoptCard, { AdoptableDog } from "@/components/AdoptCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const MOCK_DOGS: AdoptableDog[] = [
  { id: "1", name: "Biscuit", breed: "Golden Retriever Mix", age: "2 yrs", size: "Large", sex: "Male", description: "Biscuit is a gentle giant who loves cuddles and long walks. Great with kids and other dogs.", shelter: "NYC Animal Care Centers", city: "Manhattan, NY", distance: "2.1 mi", photo: "https://placedog.net/600/400?id=10", adoptUrl: "https://www.petfinder.com" },
  { id: "2", name: "Luna", breed: "Beagle / Lab Mix", age: "1 yr", size: "Medium", sex: "Female", description: "Luna is a curious, playful pup with boundless energy and a love for fetch. Perfect for active families.", shelter: "ASPCA NYC", city: "Upper East Side, NY", distance: "3.4 mi", photo: "https://placedog.net/600/400?id=20", adoptUrl: "https://www.aspca.org" },
  { id: "3", name: "Mochi", breed: "French Bulldog Mix", age: "3 yrs", size: "Small", sex: "Male", description: "Mochi is the ideal apartment dog — calm, low-shedding, and totally obsessed with his humans.", shelter: "Brooklyn Animal Rescue Coalition", city: "Brooklyn, NY", distance: "4.8 mi", photo: "https://placedog.net/600/400?id=30", adoptUrl: "https://www.petfinder.com" },
  { id: "4", name: "Hazel", breed: "Border Collie Mix", age: "4 yrs", size: "Medium", sex: "Female", description: "Hazel is incredibly smart and trained. She needs an active owner who loves outdoor adventures.", shelter: "Second Chance Rescue NYC", city: "Astoria, NY", distance: "5.2 mi", photo: "https://placedog.net/600/400?id=40", adoptUrl: "https://www.petfinder.com" },
  { id: "5", name: "Tank", breed: "Pit Bull Terrier Mix", age: "5 yrs", size: "Large", sex: "Male", description: "Don't let the name fool you — Tank is a 65 lb love bug. House-trained, calm, and kid-friendly.", shelter: "ACC Manhattan", city: "Harlem, NY", distance: "1.8 mi", photo: "https://placedog.net/600/400?id=50", adoptUrl: "https://www.petfinder.com" },
  { id: "6", name: "Peanut", breed: "Chihuahua Mix", age: "6 yrs", size: "Small", sex: "Female", description: "Peanut is a tiny, sassy senior who just wants a warm lap and a quiet home. Low energy, big heart.", shelter: "Badass Brooklyn Animal Rescue", city: "Williamsburg, NY", distance: "3.9 mi", photo: "https://placedog.net/600/400?id=60", adoptUrl: "https://www.petfinder.com" },
];

type SizeFilter = "All" | "Small" | "Medium" | "Large";
type SexFilter = "All" | "Male" | "Female";
type AgeFilter = "All" | "Puppy" | "Young" | "Adult" | "Senior";
type SortOption = "nearest" | "youngest" | "name";

function getAgeCategory(age: string): AgeFilter {
  const lower = age.toLowerCase();
  if (lower.includes("wk") || (lower.includes("mo") && parseInt(lower) < 12)) return "Puppy";
  if (lower.includes("yr") && parseInt(lower) <= 2) return "Young";
  if (lower.includes("yr") && parseInt(lower) <= 7) return "Adult";
  return "Senior";
}

export default function Adopt() {
  const [location, setLocation] = useState("New York, NY");
  const [radius, setRadius] = useState("25");
  const [sizeFilter, setSizeFilter] = useState<SizeFilter>("All");
  const [sexFilter, setSexFilter] = useState<SexFilter>("All");
  const [ageFilter, setAgeFilter] = useState<AgeFilter>("All");
  const [sortBy, setSortBy] = useState<SortOption>("nearest");

  const filtered = useMemo(() => {
    let dogs = [...MOCK_DOGS];

    if (sizeFilter !== "All") dogs = dogs.filter(d => d.size === sizeFilter);
    if (sexFilter !== "All") dogs = dogs.filter(d => d.sex === sexFilter);
    if (ageFilter !== "All") dogs = dogs.filter(d => getAgeCategory(d.age) === ageFilter);

    if (sortBy === "nearest") dogs.sort((a, b) => parseFloat(a.distance ?? "99") - parseFloat(b.distance ?? "99"));
    if (sortBy === "youngest") dogs.sort((a, b) => parseInt(a.age) - parseInt(b.age));
    if (sortBy === "name") dogs.sort((a, b) => a.name.localeCompare(b.name));

    return dogs;
  }, [sizeFilter, sexFilter, ageFilter, sortBy]);

  const activeFilterCount = [sizeFilter !== "All", sexFilter !== "All", ageFilter !== "All"].filter(Boolean).length;

  function FilterChip<T extends string>({ label, value, active, onClick }: { label: string; value: T; active: boolean; onClick: () => void }) {
    return (
      <button
        onClick={onClick}
        className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 ${
          active
            ? "bg-accent text-accent-foreground border-accent shadow-glow-accent"
            : "bg-background/50 text-muted-foreground border-border hover:border-accent/50 hover:text-foreground"
        }`}
      >
        {label}
      </button>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20">
        {/* Header */}
        <div className="border-b border-border bg-card/40 py-10">
          <div className="container mx-auto px-4">
            <p className="text-accent font-semibold text-sm uppercase tracking-widest mb-2">Adopt Don't Shop</p>
            <h1 className="font-heading font-black text-4xl md:text-5xl text-foreground mb-3">
              Find Your Dog
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl">
              Browse dogs looking for their forever home. Tap a card to apply directly with the rescue.
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Location + Search bar */}
          <div className="card-soft rounded-2xl p-5 mb-6 flex flex-wrap gap-4 items-end">
            <div className="flex-1 min-w-48">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">Location</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input value={location} onChange={e => setLocation(e.target.value)} className="pl-9 bg-background border-border rounded-xl" />
              </div>
            </div>
            <div className="w-36">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">Radius</label>
              <select value={radius} onChange={e => setRadius(e.target.value)} className="w-full h-10 rounded-xl border border-border bg-background px-3 text-sm text-foreground">
                <option value="5">5 miles</option>
                <option value="15">15 miles</option>
                <option value="25">25 miles</option>
                <option value="50">50 miles</option>
              </select>
            </div>
            <Button className="rounded-pill bg-primary text-primary-foreground font-heading font-semibold gap-2">
              <Search className="w-4 h-4" /> Search
            </Button>
            <Button variant="ghost" className="rounded-pill text-muted-foreground gap-2 text-sm">
              <MapPin className="w-4 h-4" /> Use my location
            </Button>
          </div>

          {/* Filters row */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              Filter
              {activeFilterCount > 0 && (
                <span className="ml-1 bg-accent text-accent-foreground rounded-full w-4 h-4 flex items-center justify-center text-[10px] font-bold">
                  {activeFilterCount}
                </span>
              )}
            </div>

            <div className="w-px h-4 bg-border" />

            {/* Size */}
            <div className="flex gap-1.5">
              {(["All", "Small", "Medium", "Large"] as SizeFilter[]).map(s => (
                <FilterChip key={s} label={s} value={s} active={sizeFilter === s} onClick={() => setSizeFilter(s)} />
              ))}
            </div>

            <div className="w-px h-4 bg-border" />

            {/* Sex */}
            <div className="flex gap-1.5">
              {(["All", "Male", "Female"] as SexFilter[]).map(s => (
                <FilterChip key={s} label={s} value={s} active={sexFilter === s} onClick={() => setSexFilter(s)} />
              ))}
            </div>

            <div className="w-px h-4 bg-border" />

            {/* Age */}
            <div className="flex gap-1.5">
              {(["All", "Puppy", "Young", "Adult", "Senior"] as AgeFilter[]).map(a => (
                <FilterChip key={a} label={a} value={a} active={ageFilter === a} onClick={() => setAgeFilter(a)} />
              ))}
            </div>

            {/* Clear */}
            {activeFilterCount > 0 && (
              <>
                <div className="w-px h-4 bg-border" />
                <button
                  onClick={() => { setSizeFilter("All"); setSexFilter("All"); setAgeFilter("All"); }}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors underline underline-offset-2"
                >
                  Clear all
                </button>
              </>
            )}

            {/* Sort — pushed to right */}
            <div className="ml-auto flex items-center gap-2">
              <span className="text-xs text-muted-foreground hidden sm:block">Sort:</span>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value as SortOption)}
                className="h-8 rounded-xl border border-border bg-background px-2.5 text-xs text-foreground"
              >
                <option value="nearest">Nearest</option>
                <option value="youngest">Youngest</option>
                <option value="name">Name A–Z</option>
              </select>
            </div>
          </div>

          {/* Result count */}
          <p className="text-muted-foreground text-sm mb-6">
            Showing <span className="font-semibold text-foreground">{filtered.length} dog{filtered.length !== 1 ? "s" : ""}</span> near {location} within {radius} miles
          </p>

          {/* Grid or empty state */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map(dog => (
                <AdoptCard key={dog.id} dog={dog} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <Dog className="w-16 h-16 text-muted-foreground/40 mb-4" />
              <h3 className="font-heading font-bold text-xl text-foreground mb-2">No dogs match your filters</h3>
              <p className="text-muted-foreground text-sm mb-6 max-w-xs">Try adjusting your size, sex, or age filters to see more results.</p>
              <Button
                variant="outline"
                className="rounded-pill border-border text-muted-foreground hover:text-foreground"
                onClick={() => { setSizeFilter("All"); setSexFilter("All"); setAgeFilter("All"); }}
              >
                Clear filters
              </Button>
            </div>
          )}

          {/* Partner links */}
          <div className="mt-12 card-soft rounded-2xl p-6 border border-border text-center">
            <p className="text-muted-foreground text-sm mb-3">Want more results? Visit our adoption partners directly:</p>
            <div className="flex flex-wrap gap-3 justify-center">
              {[["Petfinder", "https://www.petfinder.com"], ["Adopt-a-Pet", "https://www.adoptapet.com"], ["ASPCA", "https://www.aspca.org/adopt-pet"], ["Rescue Me", "https://rescue-me.org"]].map(([name, url]) => (
                <a key={name} href={url} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="rounded-pill border-border text-muted-foreground hover:text-foreground hover:border-primary/50 text-sm">{name} ↗</Button>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
