import { Link } from "react-router-dom";
import { MapPin, ExternalLink, Heart, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface AdoptableDog {
  id: string;
  name: string;
  breed: string;
  age: string;
  size: string;
  sex: string;
  description: string;
  shelter: string;
  distance?: string;
  photo: string;
  adoptUrl: string;
  city: string;
}

interface AdoptCardProps {
  dog: AdoptableDog;
}

export default function AdoptCard({ dog }: AdoptCardProps) {
  return (
    <div className="card-soft flex flex-col overflow-hidden rounded-2xl border border-border transition-all duration-300 hover:border-accent/50 hover:shadow-glow-accent hover:-translate-y-1">
      {/* Image */}
      <div className="relative h-52 overflow-hidden rounded-t-2xl bg-muted">
        <img
          src={dog.photo}
          alt={dog.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src = `https://placedog.net/600/400?id=${dog.id}`;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
        <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-background/80 flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors">
          <Heart className="w-4 h-4" />
        </button>
        {dog.distance && (
          <div className="absolute bottom-3 left-3 flex items-center gap-1 text-xs font-medium bg-background/80 backdrop-blur-sm px-2 py-1 rounded-full">
            <MapPin className="w-3 h-3 text-accent" />
            <span>{dog.distance}</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-3 flex-1">
        <div>
          <h3 className="font-heading font-bold text-xl text-foreground">{dog.name}</h3>
          <p className="text-primary text-sm font-medium">{dog.breed}</p>
        </div>

        {/* Chips */}
        <div className="flex flex-wrap gap-2">
          <span className="text-xs px-2.5 py-1 rounded-full bg-muted text-muted-foreground border border-border">
            {dog.age}
          </span>
          <span className="text-xs px-2.5 py-1 rounded-full bg-muted text-muted-foreground border border-border">
            {dog.sex}
          </span>
          <span className="text-xs px-2.5 py-1 rounded-full bg-muted text-muted-foreground border border-border">
            {dog.size}
          </span>
        </div>

        <p className="text-muted-foreground text-sm line-clamp-2">{dog.description}</p>

        {/* Shelter */}
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground/70 mt-auto pt-2 border-t border-border">
          <Calendar className="w-3 h-3" />
          <span>{dog.shelter}</span>
          <span className="mx-1">·</span>
          <MapPin className="w-3 h-3" />
          <span>{dog.city}</span>
        </div>

        <a href={dog.adoptUrl} target="_blank" rel="noopener noreferrer" className="block">
          <Button className="w-full rounded-pill bg-accent text-accent-foreground hover:bg-accent/90 font-heading font-semibold gap-2">
            Apply to Adopt
            <ExternalLink className="w-4 h-4" />
          </Button>
        </a>
      </div>
    </div>
  );
}
