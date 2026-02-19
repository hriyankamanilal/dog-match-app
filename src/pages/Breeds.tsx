import { useState, useMemo } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { breeds, Breed } from "@/data/breeds";
import BreedCard from "@/components/BreedCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type SizeFilter = "Small" | "Medium" | "Large" | "Giant";
type EnergyFilter = "Low" | "Medium" | "High";
type SheddingFilter = "Low" | "Medium" | "High";

interface Filters {
  size: SizeFilter[];
  energy: EnergyFilter[];
  shedding: SheddingFilter[];
  allergyFriendly: boolean;
  apartmentFriendly: boolean;
  goodWithKids: boolean;
  goodWithPets: boolean;
}

const defaultFilters: Filters = {
  size: [],
  energy: [],
  shedding: [],
  allergyFriendly: false,
  apartmentFriendly: false,
  goodWithKids: false,
  goodWithPets: false,
};

function getEnergyBucket(val: number): EnergyFilter {
  if (val >= 0.8) return "High";
  if (val >= 0.5) return "Medium";
  return "Low";
}

function getSheddingBucket(val: number): SheddingFilter {
  if (val >= 0.6) return "High";
  if (val >= 0.3) return "Medium";
  return "Low";
}

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`text-sm px-3 py-1.5 rounded-full border font-medium transition-all duration-200 ${
        active
          ? "bg-primary text-primary-foreground border-primary shadow-glow-primary"
          : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
      }`}
    >
      {label}
    </button>
  );
}

function Toggle({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`text-sm px-3 py-1.5 rounded-full border font-medium transition-all duration-200 ${
        active
          ? "bg-accent text-accent-foreground border-accent shadow-glow-accent"
          : "border-border text-muted-foreground hover:border-accent/50 hover:text-foreground"
      }`}
    >
      {label}
    </button>
  );
}

export default function Breeds() {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [showFilters, setShowFilters] = useState(true);

  const toggleSize = (s: SizeFilter) => {
    setFilters((f) => ({
      ...f,
      size: f.size.includes(s) ? f.size.filter((x) => x !== s) : [...f.size, s],
    }));
  };

  const toggleEnergy = (e: EnergyFilter) => {
    setFilters((f) => ({
      ...f,
      energy: f.energy.includes(e) ? f.energy.filter((x) => x !== e) : [...f.energy, e],
    }));
  };

  const toggleShedding = (s: SheddingFilter) => {
    setFilters((f) => ({
      ...f,
      shedding: f.shedding.includes(s) ? f.shedding.filter((x) => x !== s) : [...f.shedding, s],
    }));
  };

  const filteredBreeds = useMemo(() => {
    return breeds.filter((b) => {
      const q = search.toLowerCase();
      if (q && !b.name.toLowerCase().includes(q) && !b.temperament.toLowerCase().includes(q))
        return false;
      if (filters.size.length > 0 && !filters.size.includes(b.sizeCategory)) return false;
      if (filters.energy.length > 0 && !filters.energy.includes(getEnergyBucket(b.energyLevelValue)))
        return false;
      if (filters.shedding.length > 0 && !filters.shedding.includes(getSheddingBucket(b.sheddingValue)))
        return false;
      if (filters.allergyFriendly && !b.isAllergyFriendly) return false;
      if (filters.apartmentFriendly && !b.isApartmentFriendly) return false;
      if (filters.goodWithKids && !b.isGoodWithKids) return false;
      if (filters.goodWithPets && !b.isGoodWithPets) return false;
      return true;
    });
  }, [search, filters]);

  const hasFilters =
    filters.size.length > 0 ||
    filters.energy.length > 0 ||
    filters.shedding.length > 0 ||
    filters.allergyFriendly ||
    filters.apartmentFriendly ||
    filters.goodWithKids ||
    filters.goodWithPets;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20">
        {/* Header */}
        <div className="border-b border-border bg-card/40 py-10">
          <div className="container mx-auto px-4">
            <p className="text-accent font-semibold text-sm uppercase tracking-widest mb-2">Browse</p>
            <h1 className="font-heading font-black text-4xl md:text-5xl text-foreground mb-3">
              Dog Breeds
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl">
              {breeds.length}+ breeds with real data on energy, grooming, shedding, and temperament.
              Breed traits are tendencies, not guarantees.
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Search + filter toggle */}
          <div className="flex gap-3 mb-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search breeds or traits..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 bg-card border-border rounded-xl"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="rounded-xl border-border gap-2"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
              {hasFilters && (
                <span className="w-2 h-2 rounded-full bg-accent" />
              )}
            </Button>
            {hasFilters && (
              <Button
                variant="ghost"
                onClick={() => setFilters(defaultFilters)}
                className="rounded-xl gap-1 text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4" />
                Clear
              </Button>
            )}
          </div>

          {/* Filters panel */}
          {showFilters && (
            <div className="card-soft rounded-2xl p-5 mb-8 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Size</p>
                  <div className="flex flex-wrap gap-2">
                    {(["Small", "Medium", "Large", "Giant"] as SizeFilter[]).map((s) => (
                      <FilterChip key={s} label={s} active={filters.size.includes(s)} onClick={() => toggleSize(s)} />
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Energy</p>
                  <div className="flex flex-wrap gap-2">
                    {(["Low", "Medium", "High"] as EnergyFilter[]).map((e) => (
                      <FilterChip key={e} label={e} active={filters.energy.includes(e)} onClick={() => toggleEnergy(e)} />
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Shedding</p>
                  <div className="flex flex-wrap gap-2">
                    {(["Low", "Medium", "High"] as SheddingFilter[]).map((s) => (
                      <FilterChip key={s} label={s} active={filters.shedding.includes(s)} onClick={() => toggleShedding(s)} />
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Lifestyle</p>
                  <div className="flex flex-wrap gap-2">
                    <Toggle label="🌿 Hypoallergenic" active={filters.allergyFriendly} onClick={() => setFilters(f => ({ ...f, allergyFriendly: !f.allergyFriendly }))} />
                    <Toggle label="🏢 Apartment OK" active={filters.apartmentFriendly} onClick={() => setFilters(f => ({ ...f, apartmentFriendly: !f.apartmentFriendly }))} />
                    <Toggle label="👶 Good w/ Kids" active={filters.goodWithKids} onClick={() => setFilters(f => ({ ...f, goodWithKids: !f.goodWithKids }))} />
                    <Toggle label="🐈 Good w/ Pets" active={filters.goodWithPets} onClick={() => setFilters(f => ({ ...f, goodWithPets: !f.goodWithPets }))} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Results count */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-muted-foreground text-sm">
              <span className="font-semibold text-foreground">{filteredBreeds.length}</span> breeds found
            </p>
          </div>

          {/* Grid */}
          {filteredBreeds.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🐾</div>
              <h3 className="font-heading font-bold text-xl text-foreground mb-2">No breeds found</h3>
              <p className="text-muted-foreground">Try adjusting your filters or search term.</p>
              <Button onClick={() => { setFilters(defaultFilters); setSearch(""); }} className="mt-4 rounded-pill bg-primary text-primary-foreground">
                Clear All Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filteredBreeds.map((breed) => (
                <BreedCard key={breed.name} breed={breed} />
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
