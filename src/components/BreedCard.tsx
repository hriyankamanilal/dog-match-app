import { Link } from "react-router-dom";
import { Breed, getBreedUrl, energyLabel, sheddingLabel } from "@/data/breeds";
import { Badge } from "@/components/ui/badge";
import { Zap, Scissors, Ruler } from "lucide-react";

interface BreedCardProps {
  breed: Breed;
}

const sizeColors: Record<string, string> = {
  Small: "bg-ocean/20 text-ocean-light border-ocean/30",
  Medium: "bg-primary/20 text-primary border-primary/30",
  Large: "bg-golden/20 text-golden border-golden/30",
  Giant: "bg-destructive/20 text-destructive-foreground border-destructive/30",
};

export default function BreedCard({ breed }: BreedCardProps) {
  return (
    <Link to={getBreedUrl(breed)} className="group block">
      <div className="card-soft h-full flex flex-col overflow-hidden rounded-2xl border border-border transition-all duration-300 hover:border-primary/50 hover:shadow-glow-primary hover:-translate-y-1">
        {/* Image */}
        <div className="relative h-48 overflow-hidden rounded-t-2xl bg-muted">
          <img
            src={breed.imageUrl}
            alt={breed.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              if (!target.dataset.fallback) {
                target.dataset.fallback = "1";
                const hash = breed.name.split("").reduce((acc, c, i) => acc + c.charCodeAt(0) * (i + 1), 0);
                target.src = `https://placedog.net/600/400?id=${(hash % 80) + 1}`;
              }
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
          <div className="absolute bottom-3 left-3">
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${sizeColors[breed.sizeCategory]}`}>
              {breed.sizeCategory}
            </span>
          </div>
          {breed.isAllergyFriendly && (
            <div className="absolute top-3 right-3">
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-accent/90 text-accent-foreground">
                🌿 Hypo
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col gap-2 flex-1">
          <h3 className="font-heading font-bold text-foreground text-lg leading-tight group-hover:text-primary transition-colors">
            {breed.name}
          </h3>
          <p className="text-muted-foreground text-xs line-clamp-2">{breed.temperament}</p>

          {/* Stats row */}
          <div className="flex flex-wrap gap-2 mt-auto pt-3 border-t border-border">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Zap className="w-3 h-3 text-accent" />
              <span>{energyLabel(breed.energyLevelValue)}</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Scissors className="w-3 h-3 text-primary" />
              <span>{sheddingLabel(breed.sheddingValue)} shed</span>
            </div>
            {breed.group && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground ml-auto">
                <Ruler className="w-3 h-3" />
                <span className="truncate max-w-[80px]">{breed.group.replace(" Group", "")}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
