import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Breed, getBreedUrl, energyLabel, sheddingLabel } from "@/data/breeds";
import { Zap, Scissors, Ruler, PawPrint } from "lucide-react";
import { useFavorites } from "@/context/FavoritesContext";

interface BreedCardProps {
  breed: Breed;
}

const sizeColors: Record<string, string> = {
  Small: "bg-ocean/20 text-ocean-light border-ocean/30",
  Medium: "bg-primary/20 text-primary border-primary/30",
  Large: "bg-golden/20 text-golden border-golden/30",
  Giant: "bg-destructive/20 text-destructive-foreground border-destructive/30",
};

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

export default function BreedCard({ breed }: BreedCardProps) {
  const [imgSrc, setImgSrc] = useState<string>(breed.imageUrl);
  const [loading, setLoading] = useState(true);
  const { toggleFavorite, isFavorite } = useFavorites();
  const favorited = isFavorite(breed.name);

  useEffect(() => {
    const dogCeoBreed = toDogCeoBreed(breed.name);
    if (!dogCeoBreed) {
      setLoading(false);
      return;
    }
    fetch(`https://dog.ceo/api/breed/${dogCeoBreed}/images/random`)
      .then(r => r.json())
      .then(data => {
        if (data.status === "success" && data.message) {
          setImgSrc(data.message);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [breed.name]);

  return (
    <Link to={getBreedUrl(breed)} className="group block">
      <div className="card-soft h-full flex flex-col overflow-hidden rounded-2xl border border-border transition-all duration-300 hover:border-primary/50 hover:shadow-glow-primary hover:-translate-y-1">
        <div className="relative h-48 overflow-hidden rounded-t-2xl bg-muted">
          {loading ? (
            <div className="w-full h-full flex items-center justify-center bg-muted animate-pulse">
              <span className="text-2xl">🐾</span>
            </div>
          ) : (
            <img
              src={imgSrc}
              alt={breed.name}
              className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
              onError={() => setImgSrc(breed.imageUrl)}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />

          {/* Paw favorite button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleFavorite(breed.name);
            }}
            className={`absolute top-3 left-3 p-2 rounded-full transition-all duration-200 ${
              favorited
                ? "bg-accent text-accent-foreground scale-110"
                : "bg-background/70 text-muted-foreground hover:bg-accent/20 hover:text-accent"
            }`}
            aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
          >
            <PawPrint className="w-4 h-4" fill={favorited ? "currentColor" : "none"} />
          </button>

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

        <div className="p-4 flex flex-col gap-2 flex-1">
          <h3 className="font-heading font-bold text-foreground text-lg leading-tight group-hover:text-primary transition-colors">
            {breed.name}
          </h3>
          <p className="text-muted-foreground text-xs line-clamp-2">{breed.temperament}</p>
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
